import { svg, nothing, type TemplateResult } from "lit";

import type { GroupDef } from "../types/config";
import type { ResolvedDevice } from "../topology/geometry";
import type { VlanContext } from "../topology/vlans";

// Padding (canvas units) added around the member devices' bounding box.
const PAD_X = 60;
const PAD_TOP = 70; // room for the title
const PAD_BOTTOM = 80; // room for device captions
const TITLE_SIZE = 28;
const FALLBACK_COLOR = "#22c55e";

/** Convert "#rgb"/"#rrggbb" to an rgba() string at the given alpha. */
function withAlpha(color: string, alpha: number): string {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(color.trim());
  if (!m) return color;
  let hex = m[1];
  if (hex.length === 3) hex = hex.split("").map((c) => c + c).join("");
  const n = parseInt(hex, 16);
  const r = (n >> 16) & 255;
  const g = (n >> 8) & 255;
  const b = n & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

/**
 * Render the group boxes. Each box encloses its member devices with a
 * semi-transparent VLAN-colored fill and a dashed border, drawn beneath the
 * devices and cables.
 */
export function renderGroups(
  groups: GroupDef[],
  devices: ResolvedDevice[],
  vlans: VlanContext,
): TemplateResult[] {
  const byId = new Map(devices.map((d) => [d.instance.id, d]));
  const out: TemplateResult[] = [];

  for (const g of groups) {
    const members = g.devices
      .map((id) => byId.get(id))
      .filter((d): d is ResolvedDevice => !!d);
    if (members.length === 0) continue;

    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (const m of members) {
      minX = Math.min(minX, m.x);
      minY = Math.min(minY, m.y);
      maxX = Math.max(maxX, m.x + m.width);
      maxY = Math.max(maxY, m.y + m.height);
    }

    const color =
      g.color ?? (g.vlan != null ? vlans.color(g.vlan) : FALLBACK_COLOR);
    const x = minX - PAD_X;
    const y = minY - PAD_TOP;
    const w = maxX - minX + PAD_X * 2;
    const h = maxY - minY + PAD_TOP + PAD_BOTTOM;

    out.push(svg`<g class="ntc-group" data-group=${g.id}>
      <rect
        class="ntc-group-box"
        x=${x}
        y=${y}
        width=${w}
        height=${h}
        rx="20"
        fill=${withAlpha(color, 0.1)}
        stroke=${color}
      />
      ${g.name
        ? svg`<text
            class="ntc-group-title"
            x=${x + 26}
            y=${y + TITLE_SIZE + 8}
            font-size=${TITLE_SIZE}
            fill=${color}
          >${g.name}</text>`
        : nothing}
    </g>`);
  }

  return out;
}
