import type { DeviceTemplate } from "../types/config";

import cisco4500x from "./templates/cisco-4500x.json";
import hp5700 from "./templates/hp-5700.json";
import nucN150 from "./templates/nuc-n150.json";
import genericSmall1eth from "./templates/generic-small-1eth.json";
import generic1u2sfp1eth1mgmt from "./templates/generic-1u-2sfp-1eth-mgmt.json";
import generic1u4ethMgmt from "./templates/generic-1u-4eth-mgmt.json";
import generic2u2sfp1qsfpMgmt from "./templates/generic-2u-2sfp-1qsfp-mgmt.json";
import generic2u4ethMgmt from "./templates/generic-2u-4eth-mgmt.json";
import generic4u4eth2sfpMgmt from "./templates/generic-4u-4eth-2sfp-mgmt.json";
import generic4u2sfp1qsfpMgmt from "./templates/generic-4u-2sfp-1qsfp-mgmt.json";

const BUILTIN: DeviceTemplate[] = [
  cisco4500x as DeviceTemplate,
  hp5700 as DeviceTemplate,
  nucN150 as DeviceTemplate,
  genericSmall1eth as DeviceTemplate,
  generic1u2sfp1eth1mgmt as DeviceTemplate,
  generic1u4ethMgmt as DeviceTemplate,
  generic2u2sfp1qsfpMgmt as DeviceTemplate,
  generic2u4ethMgmt as DeviceTemplate,
  generic4u4eth2sfpMgmt as DeviceTemplate,
  generic4u2sfp1qsfpMgmt as DeviceTemplate,
];

/**
 * Build a template registry from the built-in templates plus any
 * user-supplied templates (which override built-ins with the same id).
 */
export function buildTemplateRegistry(
  userTemplates: DeviceTemplate[] = [],
): Map<string, DeviceTemplate> {
  const registry = new Map<string, DeviceTemplate>();
  for (const t of BUILTIN) registry.set(t.id, t);
  for (const t of userTemplates) registry.set(t.id, t);
  return registry;
}

export const BUILTIN_TEMPLATE_IDS = BUILTIN.map((t) => t.id);
