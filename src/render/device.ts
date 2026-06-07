import { svg, nothing, type TemplateResult } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

import type { PortState } from "../types/config";
import type { ResolvedDevice } from "../topology/geometry";
import type { ResolvedVlan } from "../topology/vlans";
import { stateClass } from "../topology/status";
import { getChassis } from "./chassis";
import { renderPort } from "./ports";

const CAPTION_GAP = 14;
const CAPTION_SIZE = 22;
const VLAN_BAND_H = 6;
const VLAN_BAND_GAP = 2;
const PORT_LABEL_GAP = 4;
const PORT_LABEL_BASELINE = 13;

/** True when a port sits in the upper half of its chassis (top row of a switch). */
function isTopRow(cy: number, deviceHeight: number): boolean {
  return cy < deviceHeight / 2;
}

/** Y of the VLAN band's top edge for a given port (above the port for top-row ports). */
function bandY(cy: number, h: number, above: boolean): number {
  return above
    ? cy - h / 2 - VLAN_BAND_GAP - VLAN_BAND_H
    : cy + h / 2 + VLAN_BAND_GAP;
}

/** A VLAN color band drawn beside a port (solid for access, striped for trunk). */
function vlanBand(
  cx: number,
  cy: number,
  w: number,
  h: number,
  vlan: ResolvedVlan,
  above: boolean,
): TemplateResult {
  const bx = cx - w / 2;
  const by = bandY(cy, h, above);
  if (vlan.kind === "access" && vlan.color) {
    return svg`<rect class="vlan-band access" x=${bx} y=${by} width=${w} height=${VLAN_BAND_H} rx="1.5" fill=${vlan.color} />`;
  }
  // Trunk: vertical stripes of the carried VLAN colors.
  const colors = vlan.colors.length ? vlan.colors : ["#7a828c"];
  const sw = w / colors.length;
  return svg`<g class="vlan-band trunk">
    <clipPath id=${`clip-${bx.toFixed(1)}-${by.toFixed(1)}`}>
      <rect x=${bx} y=${by} width=${w} height=${VLAN_BAND_H} rx="1.5" />
    </clipPath>
    <g clip-path=${`url(#clip-${bx.toFixed(1)}-${by.toFixed(1)})`}>
      ${colors.map(
        (c, i) => svg`<rect x=${bx + i * sw} y=${by} width=${sw + 0.5} height=${VLAN_BAND_H} fill=${c} />`,
      )}
    </g>
    <rect x=${bx} y=${by} width=${w} height=${VLAN_BAND_H} rx="1.5" fill="none" class="vlan-band-outline" />
  </g>`;
}

/**
 * Composite a single device: the chassis faceplate art with port-status
 * symbols stamped on top, plus a caption with the device name and mgmt IP.
 */
export function renderDevice(
  device: ResolvedDevice,
  portStates: Map<string, PortState>,
  vlanStates: Map<string, ResolvedVlan>,
): TemplateResult {
  const { instance, template, width, height, scale } = device;
  const chassis = getChassis(template.chassis ?? template.id);

  const chassisArt = chassis
    ? svg`<svg
        class="chassis-art"
        x="0"
        y="0"
        width=${width}
        height=${height}
        viewBox=${chassis.viewBox}
        preserveAspectRatio="xMidYMid meet"
      >${unsafeSVG(chassis.inner)}</svg>`
    : svg`<rect class="chassis-fallback" x="0" y="0" width=${width} height=${height} rx="8" />`;

  const ports = template.ports.map((p) => {
    const state = portStates.get(`${instance.id}:${p.id}`) ?? "unknown";
    const cx = p.x * scale;
    const cy = p.y * scale;
    const w = p.w * scale;
    const h = p.h * scale;
    const linked = portStates.has(`${instance.id}:${p.id}`);
    const vlan = vlanStates.get(`${instance.id}:${p.id}`);
    const above = isTopRow(cy, height);
    return svg`<g class="port-group ${linked ? "linked" : "idle"}">
      ${linked
        ? svg`<rect
            class="port-highlight ${stateClass(state)}"
            x=${cx - w / 2 - 3}
            y=${cy - h / 2 - 3}
            width=${w + 6}
            height=${h + 6}
            rx="4"
          />`
        : nothing}
      ${renderPort({ type: p.type, cx, cy, w, h, state })}
      ${vlan && vlan.kind !== "none" ? vlanBand(cx, cy, w, h, vlan, above) : nothing}
    </g>`;
  });

  return svg`<g
    class="device device-${template.id}"
    transform="translate(${device.x} ${device.y})"
    data-device=${instance.id}
  >
    ${chassisArt}
    ${ports}
  </g>`;
}

/**
 * Render a device's text (port labels + caption) as a separate overlay so it
 * can be drawn *after* the cables — keeping labels legible above the wires.
 * Top-row ports place their label above the port; bottom-row/single-row ports
 * place it below.
 */
export function renderDeviceText(
  device: ResolvedDevice,
  portStates: Map<string, PortState>,
): TemplateResult {
  const { instance, template, width, height, scale } = device;

  // Estimated half-width of a label (chars * approx glyph advance at 13px).
  const halfWidth = (label: string) => (label.length * 7.6) / 2;
  const TIER_GAP = 15;

  interface LabelItem {
    label: string;
    cx: number;
    half: number;
    baseY: number;
    above: boolean;
    y: number;
  }

  const items: LabelItem[] = [];
  for (const p of template.ports) {
    if (!portStates.has(`${instance.id}:${p.id}`) || !p.label) continue;
    const cx = p.x * scale;
    const cy = p.y * scale;
    const h = p.h * scale;
    const above = isTopRow(cy, height);
    const baseY = above
      ? bandY(cy, h, true) - PORT_LABEL_GAP
      : bandY(cy, h, false) + VLAN_BAND_H + PORT_LABEL_BASELINE;
    items.push({ label: p.label, cx, half: halfWidth(p.label), baseY, above, y: baseY });
  }

  // Greedy tiered placement: labels in the same row that would overlap are
  // pushed to an outer tier (further from the device) so text never collides.
  for (const above of [true, false]) {
    const row = items.filter((it) => it.above === above).sort((a, b) => a.cx - b.cx);
    const tierRight: number[] = [];
    for (const it of row) {
      let t = 0;
      // Find the lowest tier whose last label clears this one's left edge.
      while ((tierRight[t] ?? -Infinity) > it.cx - it.half - 6) t++;
      it.y = it.baseY + (above ? -1 : 1) * t * TIER_GAP;
      tierRight[t] = it.cx + it.half;
    }
  }

  const labels = items.map(
    (it) => svg`<text
      class="port-label ${it.above ? "above" : "below"}"
      x=${it.cx}
      y=${it.y}
      text-anchor="middle"
    >${it.label}</text>`,
  );

  const name = instance.name ?? template.label;
  const caption = svg`<text
      class="device-caption"
      x=${width / 2}
      y=${height + CAPTION_GAP + CAPTION_SIZE}
      text-anchor="middle"
      font-size=${CAPTION_SIZE}
    >${name}${instance.mgmt_ip ? svg`<tspan class="device-ip" dx="10">${instance.mgmt_ip}</tspan>` : nothing}</text>`;

  return svg`<g
    class="device-text device-text-${template.id}"
    transform="translate(${device.x} ${device.y})"
    data-device-text=${instance.id}
  >
    ${labels}
    ${caption}
  </g>`;
}
