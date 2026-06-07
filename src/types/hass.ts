// Minimal Home Assistant typings used by the card (avoids a custom-card-helpers dep).

export interface HassEntity {
  entity_id: string;
  state: string;
  attributes: Record<string, unknown>;
  last_changed?: string;
  last_updated?: string;
}

export interface HomeAssistant {
  states: Record<string, HassEntity>;
  themes?: unknown;
  language?: string;
  callService?: (domain: string, service: string, data?: unknown) => Promise<unknown>;
}

export interface LovelaceCard extends HTMLElement {
  hass?: HomeAssistant;
  setConfig(config: unknown): void;
  getCardSize?(): number | Promise<number>;
}
