import { html, nothing, type TemplateResult } from "lit";

import type { LegendOptions } from "../types/config";
import type { VlanContext } from "../topology/vlans";

/**
 * Render the VLAN legend as an HTML overlay pinned to a corner of the canvas
 * (so it is unaffected by pan/zoom of the SVG content).
 */
export function renderLegend(
  ctx: VlanContext,
  options?: LegendOptions,
): TemplateResult | typeof nothing {
  if (options?.show === false) return nothing;
  if (!ctx.vlans.length) return nothing;

  const position = options?.position ?? "top-right";
  const title = options?.title ?? "VLANs";
  const trunkColors = ctx.vlans.map((v) => v.color);
  const trunkGradient = `repeating-linear-gradient(90deg, ${trunkColors
    .map((c, i) => `${c} ${i * (100 / trunkColors.length)}%, ${c} ${(i + 1) * (100 / trunkColors.length)}%`)
    .join(", ")})`;

  return html`
    <div class="ntc-legend ntc-legend-${position}">
      <div class="ntc-legend-title">${title}</div>
      ${ctx.vlans.map(
        (v) => html`<div class="ntc-legend-row">
          <span class="ntc-legend-swatch" style=${`background:${v.color}`}></span>
          <span class="ntc-legend-id">VLAN ${v.id}</span>
          ${v.name ? html`<span class="ntc-legend-name">${v.name}</span>` : nothing}
        </div>`,
      )}
      <div class="ntc-legend-row">
        <span class="ntc-legend-swatch" style=${`background:${trunkGradient}`}></span>
        <span class="ntc-legend-id">Trunk</span>
        <span class="ntc-legend-name">all / tagged</span>
      </div>
    </div>
  `;
}
