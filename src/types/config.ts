// Configuration and domain types for the network topology card.

export type PortType = "rj45" | "sfp+" | "qsfp+";

export type PortState = "up" | "down" | "disabled" | "flapping" | "unknown";

export type LinkType = "link" | "lagg" | "trunk";

export type FanoutKind = "qsfp40g-to-4x10g";

/**
 * A port's VLAN membership:
 *  - a single id (number/string) -> access port on that VLAN
 *  - the literal "trunk"          -> trunk carrying all defined VLANs
 *  - an array of ids              -> trunk carrying that specific set
 */
export type PortVlan = number | string | "trunk" | Array<number | string>;

/** A VLAN definition used to build the legend and color-code ports. */
export interface VlanDef {
  id: number | string;
  name?: string;
  color: string;
}

export interface LegendOptions {
  show?: boolean;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  title?: string;
}

/** A single port as defined on a reusable device template. */
export interface PortDef {
  /** Stable port identifier, referenced by topology links (e.g. "1", "SFP0", "54"). */
  id: string;
  /** Optional human label drawn near the port (e.g. "Te1/1"). */
  label?: string;
  type: PortType;
  /** Nominal speed string, e.g. "1G", "10G", "40G". */
  speed?: string;
  /** Center X of the port, in chassis viewBox units. */
  x: number;
  /** Center Y of the port, in chassis viewBox units. */
  y: number;
  /** Render width of the port symbol, in chassis viewBox units. */
  w: number;
  /** Render height of the port symbol, in chassis viewBox units. */
  h: number;
}

/** A reusable per-model device template. */
export interface DeviceTemplate {
  /** Template id, also the chassis SVG filename stem when `chassis` is omitted. */
  id: string;
  label: string;
  /** Chassis viewBox width (port x/y are expressed in these units). */
  width: number;
  /** Chassis viewBox height. */
  height: number;
  /** Chassis SVG key (filename stem). Defaults to `id`. */
  chassis?: string;
  ports: PortDef[];
}

/** A device placed on the topology canvas. */
export interface DeviceInstance {
  /** Unique instance id, referenced by links. */
  id: string;
  /** Template id to render this device from. */
  template: string;
  /** Display name (defaults to the template label). */
  name?: string;
  /** Management IP, shown in the device caption. */
  mgmt_ip?: string;
  /** Top-left X of the device on the canvas, in canvas units. */
  x: number;
  /** Top-left Y of the device on the canvas, in canvas units. */
  y: number;
  /** Per-device render scale multiplier (default 1). */
  scale?: number;
  /** Per-port VLAN membership, keyed by port id. */
  vlans?: Record<string, PortVlan>;
  /**
   * HA entity (one per switch) whose `attributes.ports` dict carries live
   * per-interface telemetry from the Network Topology SNMP integration.
   */
  telemetry_entity?: string;
  /**
   * Maps template port ids to the switch's real interface name(s) (ifName), e.g.
   * `{ "1": "Te1/1" }`. A value may be an array when one physical port maps to
   * several interfaces (e.g. a QSFP+ broken out into 4x10G lanes), in which case
   * the port's live status is the worst-of across those interfaces. Used to look
   * up a port's status in the telemetry entity's `ports` attribute.
   */
  port_map?: Record<string, string | string[]>;
}

export interface LinkEndpoint {
  /** Device instance id. */
  device: string;
  /** Ordered list of port ids participating on this side of the link. */
  ports: string[];
}

/** Optional per-member status override (index matches paired members). */
export interface LinkMemberStatus {
  state?: PortState;
  speed?: string;
  /** HA entity whose state drives this member (future live data). */
  entity?: string;
}

export interface LinkDef {
  id: string;
  name?: string;
  type: LinkType;
  /** Breakout behavior, e.g. a single 40G QSFP+ fanning into 4x10G. */
  fanout?: FanoutKind;
  /** Aggregate link state (default "up"). */
  state?: PortState;
  speed?: string;
  endpoints: [LinkEndpoint, LinkEndpoint];
  /** Optional per-member overrides, indexed by member order. */
  members?: LinkMemberStatus[];
  /** HA entity whose state drives the whole link (future live data). */
  entity?: string;
  /** Optional VLAN membership of this link (colors an access cable). */
  vlan?: PortVlan;
}

/**
 * A visual grouping drawn as a tinted, dashed-border box behind a set of
 * devices (e.g. a VLAN / rack / zone). The box auto-sizes to enclose its
 * member devices.
 */
export interface GroupDef {
  id: string;
  /** Title drawn at the top-left of the box. */
  name?: string;
  /** Member device instance ids the box must enclose. */
  devices: string[];
  /** VLAN id whose color tints the box (semi-transparent fill + dashed border). */
  vlan?: number | string;
  /** Explicit color override (otherwise taken from `vlan`). */
  color?: string;
}

export interface LayoutOptions {
  /** Padding around the topology bounding box, in canvas units. */
  padding?: number;
  /** Global default device scale. */
  device_scale?: number;
  /** How far link cables bow away from their endpoints (0..1 of span). */
  link_curvature?: number;
}

/** Full card configuration (the dashboard YAML). */
export interface TopologyCardConfig {
  type: string;
  title?: string;
  /** Extra or override device templates (merged over built-ins). */
  templates?: DeviceTemplate[];
  devices: DeviceInstance[];
  links?: LinkDef[];
  /** Visual groupings (VLAN/rack/zone boxes) drawn behind the devices. */
  groups?: GroupDef[];
  layout?: LayoutOptions;
  /** VLAN definitions for color-coding ports and building the legend. */
  vlans?: VlanDef[];
  /** Legend display options. */
  legend?: LegendOptions;
}
