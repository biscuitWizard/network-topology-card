import { svg, type TemplateResult } from "lit";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";

import type { PortState, PortType } from "../types/config";
import { stateClass } from "../topology/status";

import rj45Svg from "../assets/ports/rj45.svg";
import sfpPlusSvg from "../assets/ports/sfp-plus.svg";
import qsfpPlusSvg from "../assets/ports/qsfp-plus.svg";

interface ParsedSymbol {
  viewBox: string;
  inner: string;
}

/** Strip the outer <svg> wrapper, keeping the viewBox and inner markup. */
function parseSymbol(raw: string, fallbackViewBox: string): ParsedSymbol {
  const viewBoxMatch = raw.match(/viewBox\s*=\s*["']([^"']+)["']/i);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : fallbackViewBox;
  // Drop the opening <svg ...> and trailing </svg> so the content can be
  // re-hosted inside a positioned nested <svg> viewport.
  const inner = raw
    .replace(/^[\s\S]*?<svg\b[^>]*>/i, "")
    .replace(/<\/svg\s*>\s*$/i, "")
    .trim();
  return { viewBox, inner };
}

const SYMBOLS: Record<PortType, ParsedSymbol> = {
  rj45: parseSymbol(rj45Svg, "0 0 48 42"),
  "sfp+": parseSymbol(sfpPlusSvg, "0 0 56 30"),
  "qsfp+": parseSymbol(qsfpPlusSvg, "0 0 64 36"),
};

export interface PortStamp {
  type: PortType;
  /** Center X in canvas units. */
  cx: number;
  /** Center Y in canvas units. */
  cy: number;
  w: number;
  h: number;
  state: PortState;
}

/**
 * Render a single port symbol as a positioned nested <svg> viewport.
 * The symbol is centered on (cx, cy) and scaled into a w x h box. A
 * state-derived class is applied so the host stylesheet can light the LEDs.
 */
export function renderPort(stamp: PortStamp): TemplateResult {
  const sym = SYMBOLS[stamp.type];
  const x = stamp.cx - stamp.w / 2;
  const y = stamp.cy - stamp.h / 2;
  return svg`<svg
    class="port-instance port-${stamp.type.replace("+", "p")} ${stateClass(stamp.state)}"
    x=${x}
    y=${y}
    width=${stamp.w}
    height=${stamp.h}
    viewBox=${sym.viewBox}
    preserveAspectRatio="xMidYMid meet"
    overflow="visible"
  >${unsafeSVG(sym.inner)}</svg>`;
}

/** Aspect ratio (w/h) of a port type's source artwork, for sane defaults. */
export function portAspect(type: PortType): number {
  const [, , w, h] = SYMBOLS[type].viewBox.split(/\s+/).map(Number);
  return w && h ? w / h : 1;
}
