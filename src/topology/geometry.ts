import type { DeviceInstance, DeviceTemplate, PortDef } from "../types/config";

export interface ResolvedDevice {
  instance: DeviceInstance;
  template: DeviceTemplate;
  x: number;
  y: number;
  scale: number;
  /** Rendered width/height on the canvas. */
  width: number;
  height: number;
  ports: Map<string, PortDef>;
}

export interface Point {
  x: number;
  y: number;
}

export interface BBox {
  minX: number;
  minY: number;
  maxX: number;
  maxY: number;
}

/** Resolve device instances against the template registry. */
export function resolveDevices(
  devices: DeviceInstance[],
  registry: Map<string, DeviceTemplate>,
  defaultScale = 1,
): ResolvedDevice[] {
  const resolved: ResolvedDevice[] = [];
  for (const instance of devices) {
    const template = registry.get(instance.template);
    if (!template) {
      throw new Error(
        `Unknown device template "${instance.template}" for device "${instance.id}". ` +
          `Known templates: ${[...registry.keys()].join(", ")}`,
      );
    }
    const scale = instance.scale ?? defaultScale;
    const ports = new Map<string, PortDef>();
    for (const p of template.ports) ports.set(String(p.id), p);
    resolved.push({
      instance,
      template,
      x: instance.x,
      y: instance.y,
      scale,
      width: template.width * scale,
      height: template.height * scale,
      ports,
    });
  }
  return resolved;
}

/** World-space center of a port on a resolved device. */
export function portCenter(device: ResolvedDevice, portId: string): Point | undefined {
  const port = device.ports.get(String(portId));
  if (!port) return undefined;
  return {
    x: device.x + port.x * device.scale,
    y: device.y + port.y * device.scale,
  };
}

/** World-space rendered size of a port. */
export function portSize(device: ResolvedDevice, portId: string): Point | undefined {
  const port = device.ports.get(String(portId));
  if (!port) return undefined;
  return { x: port.w * device.scale, y: port.h * device.scale };
}

export function deviceBounds(devices: ResolvedDevice[]): BBox {
  const box: BBox = {
    minX: Infinity,
    minY: Infinity,
    maxX: -Infinity,
    maxY: -Infinity,
  };
  for (const d of devices) {
    box.minX = Math.min(box.minX, d.x);
    box.minY = Math.min(box.minY, d.y);
    box.maxX = Math.max(box.maxX, d.x + d.width);
    box.maxY = Math.max(box.maxY, d.y + d.height);
  }
  if (!isFinite(box.minX)) {
    return { minX: 0, minY: 0, maxX: 1000, maxY: 600 };
  }
  return box;
}
