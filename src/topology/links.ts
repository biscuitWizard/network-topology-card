import type { HomeAssistant } from "../types/hass";
import type { LinkDef, PortState } from "../types/config";
import {
  portCenter,
  portSize,
  type Point,
  type ResolvedDevice,
} from "./geometry";
import { aggregateState, resolveLinkState, resolveMemberState } from "./status";

/** Resolves a port's live state (from telemetry); undefined when unavailable. */
export type PortStateResolver = (
  deviceId: string,
  portId: string,
) => PortState | undefined;

export interface Cable {
  linkId: string;
  memberIndex: number;
  d: string;
  state: PortState;
  /** True for the 4x10G breakout strands of a QSFP+ fan-out. */
  fanoutLane: boolean;
}

export interface LinkRender {
  id: string;
  name: string;
  type: LinkDef["type"];
  state: PortState;
  fanout: boolean;
  cables: Cable[];
  labelPos: Point;
  /** Base cable color: the carried VLAN's color, or neutral for trunks. */
  color: string;
  /**
   * For trunks/multi-VLAN links: the carried VLAN colors, drawn as an
   * interleaved candy-stripe over the neutral base. Undefined for access links.
   */
  stripes?: string[];
}

/** Resolved appearance of a link's cable, derived from the VLAN(s) it carries. */
export interface LinkColor {
  color: string;
  stripes?: string[];
}

/** Neutral "patch cable" color used when a link carries no single VLAN. */
export const NEUTRAL_CABLE = "#9aa3ad";

export interface RouteResult {
  renders: LinkRender[];
  /** Keyed by `${deviceId}:${portId}` -> resolved port state. */
  portStates: Map<string, PortState>;
}

const portKey = (deviceId: string, portId: string) => `${deviceId}:${portId}`;

interface Box {
  x0: number;
  y0: number;
  x1: number;
  y1: number;
}

// --- Routing tunables (canvas units) -------------------------------------
/** Minimum clear vertical gap needed to run a channel between two devices. */
const MIN_GAP = 64;
/** How far above/below a device a channel sits when routing around it. */
const OUT = 90;
/** Vertical separation between distinct links sharing a channel band. */
const LANE_GAP = 26;
/** Separation between the parallel strands of one aggregate (LAGG/fan-out). */
const MEMBER_GAP = 13;
/** Corner rounding radius for the orthogonal cable bends. */
const CORNER_R = 20;

function deviceBoxes(resolved: ResolvedDevice[]): Box[] {
  return resolved.map((d) => ({
    x0: d.x,
    y0: d.y,
    x1: d.x + d.width,
    y1: d.y + d.height,
  }));
}

// --- Rounded orthogonal path ---------------------------------------------

function roundedPath(pts: Point[], radius: number): string {
  const p = pts.filter(
    (pt, i) => i === 0 || Math.hypot(pt.x - pts[i - 1].x, pt.y - pts[i - 1].y) > 0.5,
  );
  if (p.length < 2) return "";
  if (p.length === 2) return `M ${p[0].x} ${p[0].y} L ${p[1].x} ${p[1].y}`;

  let d = `M ${p[0].x} ${p[0].y}`;
  for (let i = 1; i < p.length - 1; i++) {
    const p0 = p[i - 1];
    const p1 = p[i];
    const p2 = p[i + 1];
    const d1 = Math.hypot(p0.x - p1.x, p0.y - p1.y);
    const d2 = Math.hypot(p2.x - p1.x, p2.y - p1.y);
    const r = Math.min(radius, d1 / 2, d2 / 2);
    const a = { x: p1.x + ((p0.x - p1.x) / d1) * r, y: p1.y + ((p0.y - p1.y) / d1) * r };
    const b = { x: p1.x + ((p2.x - p1.x) / d2) * r, y: p1.y + ((p2.y - p1.y) / d2) * r };
    d += ` L ${a.x} ${a.y} Q ${p1.x} ${p1.y} ${b.x} ${b.y}`;
  }
  const last = p[p.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
}

// --- Channel (horizontal bus) selection ----------------------------------

interface Member {
  a: Point;
  b: Point;
  state: PortState;
  fanoutLane: boolean;
}

interface Planned {
  link: LinkDef;
  state: PortState;
  fanout: boolean;
  members: Member[];
  devA: Box;
  devB: Box;
  /** X extent of the run (covers all member endpoints). */
  minX: number;
  maxX: number;
  channelY: number;
}

/** Does the horizontal segment [minX,maxX] at y cross device box b? */
function runCrosses(minX: number, maxX: number, y: number, b: Box): boolean {
  return y >= b.y0 && y <= b.y1 && b.x0 < maxX && b.x1 > minX;
}

/**
 * Choose the Y of the horizontal channel for a link: a clear lane in the gap
 * between (or above/below) the two endpoint devices, preferring one that does
 * not cross any other device and sits closest to the ports.
 */
function pickChannelY(
  devA: Box,
  devB: Box,
  minX: number,
  maxX: number,
  avgPortY: number,
  boxes: Box[],
): number {
  const others = boxes.filter((b) => b !== devA && b !== devB);
  const candidates: number[] = [];

  const upper = devA.y1 <= devB.y1 ? devA : devB;
  const lower = upper === devA ? devB : devA;
  if (lower.y0 - upper.y1 >= MIN_GAP) {
    candidates.push((upper.y1 + lower.y0) / 2);
  }
  candidates.push(Math.min(devA.y0, devB.y0) - OUT);
  candidates.push(Math.max(devA.y1, devB.y1) + OUT);
  // Routes that hug just outside any device sitting within the run's X-span.
  for (const b of others) {
    if (b.x1 > minX && b.x0 < maxX) {
      candidates.push(b.y0 - OUT);
      candidates.push(b.y1 + OUT);
    }
  }

  let best = candidates[0];
  let bestScore = Infinity;
  for (const y of candidates) {
    let crossings = 0;
    for (const b of others) if (runCrosses(minX, maxX, y, b)) crossings++;
    // Penalize crossings heavily, then prefer channels nearest the ports.
    const score = crossings * 100000 + Math.abs(y - avgPortY);
    if (score < bestScore) {
      bestScore = score;
      best = y;
    }
  }
  return best;
}

/** Spread links that share a channel band + horizontal extent into lanes. */
function separateLanes(planned: Planned[]): void {
  const order = [...planned].sort((p, q) => p.channelY - q.channelY);
  const placed: Planned[] = [];
  for (const cur of order) {
    let y = cur.channelY;
    let moved = true;
    let guard = 0;
    while (moved && guard++ < 200) {
      moved = false;
      for (const prev of placed) {
        const xOverlap = cur.minX < prev.maxX && prev.minX < cur.maxX;
        if (xOverlap && Math.abs(y - prev.channelY) < LANE_GAP) {
          y = prev.channelY + LANE_GAP;
          moved = true;
        }
      }
    }
    cur.channelY = y;
    placed.push(cur);
  }
}

/** Build the rounded orthogonal cable path for one member at channel `cy`. */
function memberPath(m: Member, cy: number): string {
  return roundedPath(
    [m.a, { x: m.a.x, y: cy }, { x: m.b.x, y: cy }, m.b],
    CORNER_R,
  );
}

/** Identify which endpoint index carries the single QSFP+ head of a fan-out. */
function fanoutHeadIndex(
  link: LinkDef,
  devices: Map<string, ResolvedDevice>,
): 0 | 1 {
  for (let i = 0 as 0 | 1; i <= 1; i = (i + 1) as 0 | 1) {
    const ep = link.endpoints[i];
    const dev = devices.get(ep.device);
    if (!dev) continue;
    const allQsfp =
      ep.ports.length >= 1 &&
      ep.ports.every((pid) => dev.ports.get(String(pid))?.type === "qsfp+");
    if (ep.ports.length === 1 && allQsfp) return i;
  }
  return link.endpoints[0].ports.length <= link.endpoints[1].ports.length ? 0 : 1;
}

export function routeLinks(
  links: LinkDef[],
  resolved: ResolvedDevice[],
  _curvature = 0.45,
  hass?: HomeAssistant,
  colorForLink?: (link: LinkDef) => LinkColor,
  portState?: PortStateResolver,
): RouteResult {
  const devices = new Map(resolved.map((d) => [d.instance.id, d]));
  const boxes = deviceBoxes(resolved);
  const boxOf = new Map<string, Box>(
    resolved.map((d, i) => [d.instance.id, boxes[i]]),
  );
  const portStates = new Map<string, PortState>();
  const markPort = (deviceId: string, portId: string, state: PortState) => {
    portStates.set(portKey(deviceId, portId), state);
  };

  // --- Pass 1: resolve every link into a Planned routing entity. ----------
  const planned: Planned[] = [];

  for (const link of links) {
    const linkState = resolveLinkState(link, hass);
    const isFanout = link.fanout === "qsfp40g-to-4x10g";
    const members: Member[] = [];

    if (isFanout) {
      const headIdx = fanoutHeadIndex(link, devices);
      const tailIdx = (headIdx === 0 ? 1 : 0) as 0 | 1;
      const headEp = link.endpoints[headIdx];
      const tailEp = link.endpoints[tailIdx];
      const headDev = devices.get(headEp.device);
      const tailDev = devices.get(tailEp.device);
      const headPortId = headEp.ports[0];
      const headCenter = headDev && portCenter(headDev, headPortId);
      const headSize = headDev && portSize(headDev, headPortId);
      if (!headDev || !tailDev || !headCenter || !headSize) {
        console.warn(`[network-topology-card] cannot route fan-out link "${link.id}"`);
        continue;
      }
      const headLive = portState?.(headEp.device, headPortId);
      markPort(headEp.device, headPortId, headLive ?? linkState);
      const lanes = tailEp.ports.slice(0, 4);
      const spacing = (headSize.x * 0.72) / Math.max(lanes.length - 1, 1);
      const startX0 = headCenter.x - (spacing * (lanes.length - 1)) / 2;
      lanes.forEach((tailPortId, i) => {
        const tailC = portCenter(tailDev, tailPortId);
        if (!tailC) return;
        const tailLive = portState?.(tailEp.device, tailPortId);
        const lives = [headLive, tailLive].filter(
          (s): s is PortState => s !== undefined,
        );
        const memberState = lives.length
          ? aggregateState(lives)
          : resolveMemberState(link, i, linkState, hass);
        markPort(tailEp.device, tailPortId, tailLive ?? memberState);
        members.push({
          a: {
            x: lanes.length === 1 ? headCenter.x : startX0 + spacing * i,
            y: headCenter.y,
          },
          b: tailC,
          state: memberState,
          fanoutLane: true,
        });
      });
      if (members.length === 0) continue;
      const aggState = aggregateState(members.map((m) => m.state));
      planned.push(
        buildPlanned(link, aggState, true, members, boxOf.get(headEp.device)!, boxOf.get(tailEp.device)!),
      );
    } else {
      const [epA, epB] = link.endpoints;
      const devA = devices.get(epA.device);
      const devB = devices.get(epB.device);
      if (!devA || !devB) {
        console.warn(`[network-topology-card] unknown device in link "${link.id}"`);
        continue;
      }
      const count = Math.min(epA.ports.length, epB.ports.length);
      for (let i = 0; i < count; i++) {
        const a = portCenter(devA, epA.ports[i]);
        const b = portCenter(devB, epB.ports[i]);
        if (!a || !b) {
          console.warn(
            `[network-topology-card] link "${link.id}" member ${i} references a missing port`,
          );
          continue;
        }
        const liveA = portState?.(epA.device, epA.ports[i]);
        const liveB = portState?.(epB.device, epB.ports[i]);
        const lives = [liveA, liveB].filter(
          (s): s is PortState => s !== undefined,
        );
        const memberState = lives.length
          ? aggregateState(lives)
          : resolveMemberState(link, i, linkState, hass);
        markPort(epA.device, epA.ports[i], liveA ?? memberState);
        markPort(epB.device, epB.ports[i], liveB ?? memberState);
        members.push({ a, b, state: memberState, fanoutLane: false });
      }
      if (members.length === 0) continue;
      const aggState = aggregateState(members.map((m) => m.state));
      planned.push(
        buildPlanned(link, aggState, false, members, boxOf.get(epA.device)!, boxOf.get(epB.device)!),
      );
    }
  }

  // --- Pass 2: choose channels, then separate them into lanes. ------------
  for (const p of planned) {
    const ys: number[] = [];
    for (const m of p.members) ys.push(m.a.y, m.b.y);
    const avgPortY = ys.reduce((s, v) => s + v, 0) / ys.length;
    p.channelY = pickChannelY(p.devA, p.devB, p.minX, p.maxX, avgPortY, boxes);
  }
  separateLanes(planned);

  // --- Pass 3: build cable geometry + labels. -----------------------------
  const renders: LinkRender[] = planned.map((p) => {
    const lc = colorForLink ? colorForLink(p.link) : { color: NEUTRAL_CABLE };
    const color = lc.color;
    const stripes = lc.stripes;
    const n = p.members.length;
    const cables: Cable[] = p.members.map((m, i) => {
      const cy = p.channelY + (i - (n - 1) / 2) * MEMBER_GAP;
      return {
        linkId: p.link.id,
        memberIndex: i,
        d: memberPath(m, cy),
        state: m.state,
        fanoutLane: m.fanoutLane,
      };
    });
    return {
      id: p.link.id,
      name: p.link.name ?? p.link.id,
      type: p.link.type,
      state: p.state,
      fanout: p.fanout,
      cables,
      labelPos: { x: (p.minX + p.maxX) / 2, y: p.channelY },
      color,
      stripes,
    };
  });

  return { renders, portStates };
}

function buildPlanned(
  link: LinkDef,
  state: PortState,
  fanout: boolean,
  members: Member[],
  devA: Box,
  devB: Box,
): Planned {
  let minX = Infinity;
  let maxX = -Infinity;
  for (const m of members) {
    minX = Math.min(minX, m.a.x, m.b.x);
    maxX = Math.max(maxX, m.a.x, m.b.x);
  }
  return { link, state, fanout, members, devA, devB, minX, maxX, channelY: 0 };
}
