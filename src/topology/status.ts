import type { HomeAssistant } from "../types/hass";
import type { DeviceInstance, LinkDef, PortState } from "../types/config";

/**
 * Maps a Home Assistant entity state string onto a {@link PortState}.
 * Live data is deferred, but the mapping is wired so that adding an `entity`
 * to a link/member begins driving status immediately.
 */
export function entityStateToPortState(raw: string | undefined): PortState {
  if (raw == null) return "unknown";
  const v = raw.toLowerCase();
  if (["on", "up", "connected", "active", "linked", "online", "home"].includes(v)) {
    return "up";
  }
  if (["off", "down", "disconnected", "inactive", "offline", "not_connected"].includes(v)) {
    return "down";
  }
  if (["disabled", "unavailable", "admin_down", "shutdown"].includes(v)) {
    return "disabled";
  }
  if (["flapping", "flap", "bouncing"].includes(v)) {
    return "flapping";
  }
  return "unknown";
}

/** Map a switch telemetry `status` string onto a {@link PortState}. */
export function portStatusToState(status: string | undefined): PortState {
  switch ((status ?? "").toLowerCase()) {
    case "connected":
    case "up":
      return "up";
    case "disconnected":
    case "down":
      return "down";
    case "disabled":
      return "disabled";
    case "flapping":
      return "flapping";
    default:
      return "unknown";
  }
}

interface TelemetryPort {
  status?: string;
}

/**
 * Resolve a port's live state from its switch telemetry entity, mapping the
 * template port id to a real interface via the device's `port_map`. Returns
 * undefined when no telemetry is configured/available for the port.
 */
export function telemetryPortState(
  device: DeviceInstance,
  portId: string,
  hass?: HomeAssistant,
): PortState | undefined {
  const entityId = device.telemetry_entity;
  if (!entityId || !hass?.states?.[entityId]) return undefined;
  const mapped = device.port_map?.[portId];
  if (!mapped) return undefined;
  const ports = hass.states[entityId].attributes?.ports as
    | Record<string, TelemetryPort>
    | undefined;
  if (!ports) return undefined;
  const ifNames = Array.isArray(mapped) ? mapped : [mapped];
  const states: PortState[] = [];
  for (const ifName of ifNames) {
    const entry = ports[ifName];
    if (entry) states.push(portStatusToState(entry.status));
  }
  if (states.length === 0) return undefined;
  return aggregateState(states);
}

/**
 * Combine member/endpoint states into a single link state for the badge.
 * Worst-of ordering: down > flapping > disabled > up, with unknown last.
 */
export function aggregateState(states: PortState[]): PortState {
  const order: PortState[] = ["down", "flapping", "disabled", "up", "unknown"];
  for (const s of order) if (states.includes(s)) return s;
  return "unknown";
}

/** Resolve the effective state for a link, preferring a bound HA entity. */
export function resolveLinkState(link: LinkDef, hass?: HomeAssistant): PortState {
  if (link.entity && hass?.states?.[link.entity]) {
    return entityStateToPortState(hass.states[link.entity].state);
  }
  return link.state ?? "up";
}

/** Resolve the effective state for one member of a link. */
export function resolveMemberState(
  link: LinkDef,
  memberIndex: number,
  fallback: PortState,
  hass?: HomeAssistant,
): PortState {
  const m = link.members?.[memberIndex];
  if (m?.entity && hass?.states?.[m.entity]) {
    return entityStateToPortState(hass.states[m.entity].state);
  }
  if (m?.state) return m.state;
  return fallback;
}

/** CSS class suffix used to color ports and cables by state. */
export function stateClass(state: PortState): string {
  return `state-${state}`;
}
