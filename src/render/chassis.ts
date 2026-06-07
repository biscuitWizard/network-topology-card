import ciscoChassis from "../assets/chassis/cisco-4500x.svg";
import hpChassis from "../assets/chassis/hp-5700.svg";
import nucChassis from "../assets/chassis/nuc-n150.svg";
import genericSmall from "../assets/chassis/generic-small.svg";
import generic1u from "../assets/chassis/generic-1u.svg";
import generic2u from "../assets/chassis/generic-2u.svg";
import generic4u from "../assets/chassis/generic-4u.svg";

export interface ParsedChassis {
  viewBox: string;
  inner: string;
}

function parseChassis(raw: string): ParsedChassis {
  const viewBoxMatch = raw.match(/viewBox\s*=\s*["']([^"']+)["']/i);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 1000 130";
  const inner = raw
    .replace(/^[\s\S]*?<svg\b[^>]*>/i, "")
    .replace(/<\/svg\s*>\s*$/i, "")
    .trim();
  return { viewBox, inner };
}

const CHASSIS: Record<string, ParsedChassis> = {
  "cisco-4500x": parseChassis(ciscoChassis),
  "hp-5700": parseChassis(hpChassis),
  "nuc-n150": parseChassis(nucChassis),
  "generic-small": parseChassis(genericSmall),
  "generic-1u": parseChassis(generic1u),
  "generic-2u": parseChassis(generic2u),
  "generic-4u": parseChassis(generic4u),
};

export function getChassis(key: string): ParsedChassis | undefined {
  return CHASSIS[key];
}
