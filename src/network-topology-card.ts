import { LitElement, html, svg, css, nothing, type PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";

import type { HomeAssistant } from "./types/hass";
import type {
  DeviceInstance,
  LinkDef,
  PortState,
  TopologyCardConfig,
} from "./types/config";
import { buildTemplateRegistry } from "./config/templates";
import {
  resolveDevices,
  deviceBounds,
  type ResolvedDevice,
} from "./topology/geometry";
import {
  routeLinks,
  NEUTRAL_CABLE,
  type RouteResult,
  type LinkColor,
} from "./topology/links";
import { VlanContext, type ResolvedVlan } from "./topology/vlans";
import { telemetryPortState } from "./topology/status";
import { renderDevice, renderDeviceText } from "./render/device";
import { renderCables, renderLinkLabels } from "./render/links-view";
import { renderLegend } from "./render/legend";
import { renderGroups } from "./render/groups";

interface ViewTransform {
  scale: number;
  tx: number;
  ty: number;
}

const CARD_VERSION = "0.1.3";

@customElement("network-topology-card")
export class NetworkTopologyCard extends LitElement {
  @property({ attribute: false }) hass?: HomeAssistant;

  @state() private _config?: TopologyCardConfig;
  @state() private _error?: string;
  @state() private _view: ViewTransform = { scale: 1, tx: 0, ty: 0 };

  private _devices: ResolvedDevice[] = [];
  private _route: RouteResult = { renders: [], portStates: new Map() };
  private _vlanCtx = new VlanContext([]);
  private _vlanStates = new Map<string, ResolvedVlan>();
  private _viewBox = "0 0 1000 600";

  private _dragging = false;
  private _lastPointer: { x: number; y: number } | null = null;

  static override styles = css`
    :host {
      --ntc-up: #36d17a;
      --ntc-down: #f0464a;
      --ntc-disabled: #7a828c;
      --ntc-flap: #facc15;
      --ntc-idle: #3a3f44;
      --ntc-act: #f2b53a;
      --ntc-cable-casing: rgba(0, 0, 0, 0.6);
      --ntc-label-bg: rgba(28, 32, 38, 0.92);
      --ntc-label-fg: #f4f6f8;
      --ntc-caption: var(--primary-text-color, #e7eaee);
      --ntc-ip: var(--secondary-text-color, #9aa3ad);
      --ntc-text-halo: var(--ha-card-background, var(--card-background-color, #1c2026));
      display: block;
    }
    ha-card,
    .ntc-card {
      display: block;
      height: 100%;
      overflow: hidden;
      background: var(--ha-card-background, var(--card-background-color, #1c2026));
      border-radius: var(--ha-card-border-radius, 12px);
      box-shadow: var(--ha-card-box-shadow, none);
    }
    .ntc-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px 4px;
      font-size: 1.1rem;
      font-weight: 600;
      color: var(--ntc-caption);
    }
    .ntc-tools {
      display: flex;
      gap: 6px;
    }
    .ntc-tools button {
      cursor: pointer;
      border: none;
      border-radius: 6px;
      width: 26px;
      height: 26px;
      font-size: 15px;
      line-height: 1;
      background: rgba(255, 255, 255, 0.08);
      color: var(--ntc-caption);
    }
    .ntc-tools button:hover {
      background: rgba(255, 255, 255, 0.18);
    }
    .ntc-stage {
      position: relative;
    }
    .ntc-canvas {
      width: 100%;
      display: block;
      touch-action: none;
      cursor: grab;
      background:
        radial-gradient(circle at 50% 0%, rgba(255, 255, 255, 0.04), transparent 70%),
        var(--ha-card-background, var(--card-background-color, #1c2026));
    }
    .ntc-canvas.dragging {
      cursor: grabbing;
    }
    .ntc-error {
      padding: 16px;
      color: var(--error-color, #f0464a);
      font-family: monospace;
      white-space: pre-wrap;
    }

    .chassis-fallback {
      fill: #2a2f36;
      stroke: #444b54;
      stroke-width: 2;
    }

    /* Port status LEDs (overridden by class on the nested port <svg>). */
    .port-instance .led-link,
    .port-instance .led-act,
    .port-instance .lane {
      transition: fill 0.2s ease;
    }
    .port-instance.state-up .led-link,
    .port-instance.state-up .lane {
      fill: var(--ntc-up);
    }
    .port-instance.state-down .led-link {
      fill: var(--ntc-down);
    }
    .port-instance.state-disabled .led-link {
      fill: var(--ntc-disabled);
    }
    .port-instance.state-flapping .led-link {
      fill: var(--ntc-flap);
      animation: ntc-flap-pulse 1s ease-in-out infinite;
    }
    .port-instance.state-unknown .led-link,
    .port-instance .lane {
      fill: var(--ntc-idle);
    }
    .port-instance.state-up .led-act {
      fill: var(--ntc-act);
    }
    .port-instance .led-act {
      fill: var(--ntc-idle);
    }

    .port-highlight {
      fill: none;
      stroke-width: 2;
      opacity: 0.85;
    }
    .port-highlight.state-up {
      stroke: var(--ntc-up);
    }
    .port-highlight.state-down {
      stroke: var(--ntc-down);
    }
    .port-highlight.state-disabled {
      stroke: var(--ntc-disabled);
    }
    .port-highlight.state-flapping {
      stroke: var(--ntc-flap);
      animation: ntc-flap-pulse 1s ease-in-out infinite;
    }
    .port-highlight.state-unknown {
      stroke: var(--ntc-idle);
    }
    @keyframes ntc-flap-pulse {
      0%,
      100% {
        opacity: 1;
      }
      50% {
        opacity: 0.3;
      }
    }
    .port-label {
      fill: var(--ntc-caption);
      font-size: 13px;
      font-weight: 600;
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
      paint-order: stroke fill;
      stroke: var(--ntc-text-halo);
      stroke-width: 3.5px;
      stroke-linejoin: round;
      stroke-linecap: round;
    }

    .device-caption {
      fill: var(--ntc-caption);
      font-weight: 600;
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
      paint-order: stroke fill;
      stroke: var(--ntc-text-halo);
      stroke-width: 4px;
      stroke-linejoin: round;
    }
    .device-ip {
      fill: var(--ntc-ip);
      font-weight: 400;
      stroke: none;
    }

    .cable {
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .cable.bundle {
      stroke-width: 7;
    }
    .cable.lane {
      stroke-width: 4;
    }
    .cable.state-up {
      stroke: var(--ntc-up);
    }
    .cable.state-down {
      stroke: var(--ntc-down);
    }
    .cable.state-disabled {
      stroke: var(--ntc-disabled);
    }
    .cable.state-flapping {
      stroke: var(--ntc-flap);
      animation: ntc-flap-pulse 1.1s ease-in-out infinite;
    }
    .cable.state-unknown {
      stroke: var(--ntc-idle);
    }
    .cable-casing {
      stroke: var(--ntc-cable-casing);
      stroke-linecap: round;
      stroke-linejoin: round;
    }
    .cable-casing.bundle {
      stroke-width: 11;
    }
    .cable-casing.lane {
      stroke-width: 7;
    }

    .link-label-bg {
      fill: var(--ntc-label-bg);
      stroke: rgba(255, 255, 255, 0.12);
      stroke-width: 1;
    }
    .link-label-name {
      fill: var(--ntc-label-fg);
      font-weight: 700;
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
    }
    .link-label-sub {
      fill: var(--ntc-ip);
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
    }
    .link-label.state-up .link-label-accent {
      fill: var(--ntc-up);
    }
    .link-label.state-down .link-label-accent {
      fill: var(--ntc-down);
    }
    .link-label.state-disabled .link-label-accent {
      fill: var(--ntc-disabled);
    }
    .link-label.state-flapping .link-label-accent {
      fill: var(--ntc-flap);
    }
    .link-label.state-unknown .link-label-accent {
      fill: var(--ntc-idle);
    }

    .vlan-band-outline {
      stroke: rgba(0, 0, 0, 0.55);
      stroke-width: 0.6;
    }

    /* Group/zone boxes drawn behind the devices. */
    .ntc-group-box {
      stroke-width: 3;
      stroke-dasharray: 14 10;
      stroke-linejoin: round;
    }
    .ntc-group-title {
      font-weight: 700;
      letter-spacing: 0.6px;
      text-transform: uppercase;
      opacity: 0.95;
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
    }

    /* VLAN legend overlay (pinned to a canvas corner, ignores pan/zoom). */
    .ntc-legend {
      position: absolute;
      z-index: 2;
      min-width: 132px;
      padding: 8px 10px;
      border-radius: 9px;
      background: var(--ntc-label-bg);
      border: 1px solid rgba(255, 255, 255, 0.12);
      color: var(--ntc-label-fg);
      font-family: var(--paper-font-body1_-_font-family, sans-serif);
      font-size: 12px;
      box-shadow: 0 4px 14px rgba(0, 0, 0, 0.35);
      backdrop-filter: blur(2px);
    }
    .ntc-legend-top-right {
      top: 12px;
      right: 12px;
    }
    .ntc-legend-top-left {
      top: 12px;
      left: 12px;
    }
    .ntc-legend-bottom-right {
      bottom: 12px;
      right: 12px;
    }
    .ntc-legend-bottom-left {
      bottom: 12px;
      left: 12px;
    }
    .ntc-legend-title {
      font-weight: 700;
      font-size: 12px;
      margin-bottom: 6px;
      opacity: 0.85;
      letter-spacing: 0.4px;
      text-transform: uppercase;
    }
    .ntc-legend-row {
      display: flex;
      align-items: center;
      gap: 7px;
      padding: 2px 0;
      line-height: 1.3;
    }
    .ntc-legend-swatch {
      flex: 0 0 auto;
      width: 16px;
      height: 10px;
      border-radius: 2px;
      border: 1px solid rgba(0, 0, 0, 0.5);
    }
    .ntc-legend-id {
      font-weight: 600;
      white-space: nowrap;
    }
    .ntc-legend-name {
      color: var(--ntc-ip);
      white-space: nowrap;
    }
  `;

  setConfig(config: TopologyCardConfig): void {
    if (!config || !Array.isArray(config.devices) || config.devices.length === 0) {
      throw new Error("network-topology-card: `devices` must be a non-empty list");
    }
    for (const d of config.devices as DeviceInstance[]) {
      if (!d.id || !d.template) {
        throw new Error("network-topology-card: each device needs an `id` and a `template`");
      }
    }
    this._config = config;
    this._error = undefined;
    this._compute();
  }

  private _compute(): void {
    if (!this._config) return;
    try {
      const registry = buildTemplateRegistry(this._config.templates ?? []);
      const layout = this._config.layout ?? {};
      this._devices = resolveDevices(
        this._config.devices,
        registry,
        layout.device_scale ?? 1,
      );
      // Resolve per-port VLAN membership first so cables can be colored by it.
      this._vlanCtx = new VlanContext(this._config.vlans ?? []);
      this._vlanStates = new Map();
      for (const d of this._config.devices) {
        if (!d.vlans) continue;
        for (const [portId, assignment] of Object.entries(d.vlans)) {
          this._vlanStates.set(`${d.id}:${portId}`, this._vlanCtx.resolve(assignment));
        }
      }

      this._computeRoute();

      const bounds = deviceBounds(this._devices);
      const pad = layout.padding ?? 90;
      const captionExtra = 70;
      const minX = bounds.minX - pad;
      const minY = bounds.minY - pad;
      const w = bounds.maxX - bounds.minX + pad * 2;
      const h = bounds.maxY - bounds.minY + pad * 2 + captionExtra;
      this._viewBox = `${minX} ${minY} ${w} ${h}`;
      this._error = undefined;
    } catch (err) {
      this._error = err instanceof Error ? err.message : String(err);
    }
  }

  protected override willUpdate(changed: PropertyValues): void {
    // Re-route before rendering whenever live data (hass) changes, so the
    // frame reflects current telemetry instead of a stale route.
    if (changed.has("hass") && this._config) {
      this._computeRoute();
    }
  }

  /** Route the links using the current devices, VLAN colors, and telemetry. */
  private _computeRoute(): void {
    if (!this._config) return;
    this._route = routeLinks(
      this._config.links ?? [],
      this._devices,
      this._config.layout?.link_curvature ?? 0.45,
      this.hass,
      (l) => this._linkColor(l),
      (d, p) => this._portState(d, p),
    );
  }

  /** Resolve a port's live state from its device's SNMP telemetry entity. */
  private _portState(deviceId: string, portId: string): PortState | undefined {
    const device = this._config?.devices.find((d) => d.id === deviceId);
    if (!device) return undefined;
    return telemetryPortState(device, portId, this.hass);
  }

  /**
   * Color a cable by the VLAN(s) it carries: a solid VLAN color for an access
   * link (all endpoint ports on one VLAN), or a neutral base with a stripe of
   * the carried VLAN colors for a trunk / multi-VLAN link.
   */
  private _linkColor(link: LinkDef): LinkColor {
    const resolved: ResolvedVlan[] = [];
    for (const ep of link.endpoints) {
      for (const portId of ep.ports) {
        const rv = this._vlanStates.get(`${ep.device}:${String(portId)}`);
        if (rv && rv.kind !== "none") resolved.push(rv);
      }
    }
    if (resolved.length === 0) return { color: NEUTRAL_CABLE };

    const allAccess = resolved.every((r) => r.kind === "access");
    const ids = new Set<string>();
    for (const r of resolved) for (const id of r.ids) ids.add(String(id));

    if (allAccess && ids.size === 1) {
      return { color: this._vlanCtx.color([...ids][0]) };
    }

    // Trunk / multi-VLAN: neutral base + candy-stripe of the carried colors.
    const stripes = [...ids].map((id) => this._vlanCtx.color(id));
    return { color: NEUTRAL_CABLE, stripes };
  }

  private _resetView = (): void => {
    this._view = { scale: 1, tx: 0, ty: 0 };
  };

  private _onWheel = (ev: WheelEvent): void => {
    ev.preventDefault();
    const factor = ev.deltaY < 0 ? 1.12 : 1 / 1.12;
    const next = Math.min(6, Math.max(0.3, this._view.scale * factor));
    const svgEl = ev.currentTarget as SVGSVGElement;
    const rect = svgEl.getBoundingClientRect();
    // Pointer position in the current transformed space.
    const px = ev.clientX - rect.left;
    const py = ev.clientY - rect.top;
    const k = next / this._view.scale;
    this._view = {
      scale: next,
      tx: px - (px - this._view.tx) * k,
      ty: py - (py - this._view.ty) * k,
    };
  };

  private _onPointerDown = (ev: PointerEvent): void => {
    this._dragging = true;
    this._lastPointer = { x: ev.clientX, y: ev.clientY };
    (ev.currentTarget as Element).setPointerCapture?.(ev.pointerId);
    this.requestUpdate();
  };

  private _onPointerMove = (ev: PointerEvent): void => {
    if (!this._dragging || !this._lastPointer) return;
    const dx = ev.clientX - this._lastPointer.x;
    const dy = ev.clientY - this._lastPointer.y;
    this._lastPointer = { x: ev.clientX, y: ev.clientY };
    this._view = {
      ...this._view,
      tx: this._view.tx + dx,
      ty: this._view.ty + dy,
    };
  };

  private _onPointerUp = (ev: PointerEvent): void => {
    this._dragging = false;
    this._lastPointer = null;
    (ev.currentTarget as Element).releasePointerCapture?.(ev.pointerId);
    this.requestUpdate();
  };

  override render() {
    if (this._error) {
      return html`<ha-card class="ntc-card"><div class="ntc-error">network-topology-card error:\n${this._error}</div></ha-card>`;
    }
    if (!this._config) return nothing;

    const groups = renderGroups(
      this._config.groups ?? [],
      this._devices,
      this._vlanCtx,
    );
    const cables = renderCables(this._route.renders);
    const devices = this._devices.map((d) =>
      renderDevice(d, this._route.portStates, this._vlanStates),
    );
    const deviceText = this._devices.map((d) =>
      renderDeviceText(d, this._route.portStates),
    );
    const labels = renderLinkLabels(this._route.renders);
    const { scale, tx, ty } = this._view;

    return html`
      <ha-card class="ntc-card">
        ${this._config.title
          ? html`<div class="ntc-header">
              <span>${this._config.title}</span>
              <span class="ntc-tools">
                <button title="Reset view" @click=${this._resetView}>\u2302</button>
              </span>
            </div>`
          : nothing}
        <div class="ntc-stage">
          <svg
            class="ntc-canvas ${this._dragging ? "dragging" : ""}"
            viewBox=${this._viewBox}
            @wheel=${this._onWheel}
            @pointerdown=${this._onPointerDown}
            @pointermove=${this._onPointerMove}
            @pointerup=${this._onPointerUp}
            @pointercancel=${this._onPointerUp}
          >
            <g transform="translate(${tx} ${ty}) scale(${scale})">
              ${svg`${groups}`} ${svg`${devices}`} ${svg`${cables}`}
              ${svg`${deviceText}`} ${svg`${labels}`}
            </g>
          </svg>
          ${renderLegend(this._vlanCtx, this._config.legend)}
        </div>
      </ha-card>
    `;
  }

  getCardSize(): number {
    return 8;
  }

  getGridOptions() {
    return { rows: 8, columns: 12, min_rows: 4 };
  }
}

declare global {
  interface Window {
    customCards?: Array<Record<string, unknown>>;
  }
  interface HTMLElementTagNameMap {
    "network-topology-card": NetworkTopologyCard;
  }
}

window.customCards = window.customCards || [];
window.customCards.push({
  type: "network-topology-card",
  name: "Network Topology Card",
  preview: false,
  description:
    "Renders a network topology with composited SVG device chassis, per-port status, and auto-drawn LAGG/trunk/QSFP+ fan-out links.",
  documentationURL: "https://github.com/biscuitWizard/network-topology-card",
});

// eslint-disable-next-line no-console
console.info(
  `%c network-topology-card %c v${CARD_VERSION} `,
  "color:#fff;background:#2b6cb0;border-radius:3px 0 0 3px;padding:2px 4px",
  "color:#2b6cb0;background:#e2e8f0;border-radius:0 3px 3px 0;padding:2px 4px",
);
