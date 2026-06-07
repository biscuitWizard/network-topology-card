import type { PortVlan, VlanDef } from "../types/config";

export type VlanKind = "access" | "trunk" | "none";

export interface ResolvedVlan {
  kind: VlanKind;
  /** Access color (single VLAN). */
  color?: string;
  /** Trunk stripe colors (one per carried VLAN). */
  colors: string[];
  /** Carried VLAN ids (one for access, many for trunk). */
  ids: Array<number | string>;
}

const FALLBACK_COLOR = "#7a828c";

export class VlanContext {
  private byId = new Map<string, VlanDef>();
  readonly vlans: VlanDef[];

  constructor(vlans: VlanDef[] = []) {
    this.vlans = vlans;
    for (const v of vlans) this.byId.set(String(v.id), v);
  }

  color(id: number | string): string {
    return this.byId.get(String(id))?.color ?? FALLBACK_COLOR;
  }

  /** Resolve a per-port VLAN assignment into render colors. */
  resolve(assignment: PortVlan | undefined | null): ResolvedVlan {
    if (assignment === undefined || assignment === null) {
      return { kind: "none", colors: [], ids: [] };
    }
    if (assignment === "trunk") {
      // Trunk carrying every defined VLAN.
      return {
        kind: "trunk",
        colors: this.vlans.map((v) => v.color),
        ids: this.vlans.map((v) => v.id),
      };
    }
    if (Array.isArray(assignment)) {
      return {
        kind: "trunk",
        colors: assignment.map((id) => this.color(id)),
        ids: assignment.slice(),
      };
    }
    // Single id -> access port.
    return {
      kind: "access",
      color: this.color(assignment),
      colors: [this.color(assignment)],
      ids: [assignment],
    };
  }
}
