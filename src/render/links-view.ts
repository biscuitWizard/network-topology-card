import { svg, type TemplateResult } from "lit";

import type { LinkRender } from "../topology/links";
import { stateClass } from "../topology/status";

const LABEL_SIZE = 18;

function linkTypeLabel(r: LinkRender): string {
  if (r.fanout) return "QSFP+ 40G \u2192 4\u00d710G";
  if (r.type === "lagg") return "LAGG";
  if (r.type === "trunk") return "TRUNK";
  return "";
}

/** Dash segment length (canvas units) for one color of a trunk candy-stripe. */
const STRIPE_SEG = 16;

/** Render all cables first (so they sit beneath device captions/labels). */
export function renderCables(renders: LinkRender[]): TemplateResult[] {
  const out: TemplateResult[] = [];
  for (const r of renders) {
    const striped = r.stripes && r.stripes.length > 1;
    for (const c of r.cables) {
      const kind = c.fanoutLane ? "lane" : "bundle";
      out.push(svg`<path class="cable-casing ${kind}" d=${c.d} fill="none" />`);

      if (c.state === "up" && striped) {
        // Trunk / multi-VLAN: neutral base + interleaved stripe of VLAN colors.
        out.push(svg`<path class="cable ${kind}" style=${`stroke:${r.color}`} d=${c.d} fill="none" />`);
        const n = r.stripes!.length;
        const dash = `${STRIPE_SEG} ${STRIPE_SEG * (n - 1)}`;
        r.stripes!.forEach((col, i) => {
          out.push(svg`<path
            class="cable ${kind}"
            style=${`stroke:${col};stroke-dasharray:${dash};stroke-dashoffset:${-i * STRIPE_SEG};stroke-linecap:butt`}
            d=${c.d}
            fill="none"
          />`);
        });
      } else {
        // Access link uses its VLAN color when up; down/disabled fall back to
        // the status color provided by CSS.
        const style = c.state === "up" ? `stroke:${r.color}` : "";
        out.push(svg`<path
          class="cable ${stateClass(c.state)} ${kind}"
          style=${style}
          d=${c.d}
          fill="none"
        />`);
      }
    }
  }
  return out;
}

/** Does this link carry an aggregation worth labelling? */
function hasBadge(r: LinkRender): boolean {
  return r.fanout || r.type === "lagg" || r.type === "trunk";
}

interface PlacedLabel {
  r: LinkRender;
  sub: string;
  w: number;
  h: number;
  x: number;
  y: number;
}

/** Render the labels/badges that name each aggregation (skip simple links). */
export function renderLinkLabels(renders: LinkRender[]): TemplateResult[] {
  const labels: PlacedLabel[] = renders.filter(hasBadge).map((r) => {
    const sub = linkTypeLabel(r);
    const w = Math.max(r.name.length, sub.length) * LABEL_SIZE * 0.62 + 28;
    const h = sub ? LABEL_SIZE * 2.6 : LABEL_SIZE * 1.8;
    return { r, sub, w, h, x: r.labelPos.x - w / 2, y: r.labelPos.y - h / 2 };
  });

  // Greedy vertical de-collision: nudge overlapping badges apart.
  const placed: PlacedLabel[] = [];
  for (const cur of [...labels].sort((a, b) => a.y - b.y)) {
    let moved = true;
    let guard = 0;
    while (moved && guard++ < 200) {
      moved = false;
      for (const p of placed) {
        const xOverlap = cur.x < p.x + p.w + 6 && p.x < cur.x + cur.w + 6;
        const yOverlap = cur.y < p.y + p.h + 4 && p.y < cur.y + cur.h + 4;
        if (xOverlap && yOverlap) {
          cur.y = p.y + p.h + 6;
          moved = true;
        }
      }
    }
    placed.push(cur);
  }

  return placed.map(({ r, sub, w, h, x, y }) => {
    return svg`<g class="link-label ${stateClass(r.state)}" transform="translate(${x} ${y})">
      <rect class="link-label-bg" x="0" y="0" width=${w} height=${h} rx="7" />
      <rect class="link-label-accent" x="0" y="0" width="6" height=${h} rx="3" style=${r.state === "up" ? `fill:${r.color}` : ""} />
      <text class="link-label-name" x=${w / 2} y=${sub ? h * 0.42 : h * 0.62} text-anchor="middle" font-size=${LABEL_SIZE}>${r.name}</text>
      ${sub
        ? svg`<text class="link-label-sub" x=${w / 2} y=${h * 0.78} text-anchor="middle" font-size=${LABEL_SIZE * 0.72}>${sub}</text>`
        : svg``}
    </g>`;
  });
}
