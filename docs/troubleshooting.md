# Troubleshooting

## Card Does Not Load

Check the dashboard resource first.

For HACS installs, confirm HACS added `network-topology-card.js` as a JavaScript module resource. For manual installs, confirm the resource points at the copied file:

```yaml
resources:
  - url: /local/network-topology-card.js?v=20260606-1
    type: module
```

If Home Assistant says the custom element does not exist, reload the dashboard, hard-refresh the browser, and bump the `?v=` query string after replacing the file.

## Manual Install Shows An Old Version

Home Assistant and browsers cache JavaScript modules by URL. Replace the file under `www/`, then change the dashboard resource URL query string:

```yaml
url: /local/network-topology-card.js?v=20260606-2
```

Restart Home Assistant if you created `www/` for the first time.

## Card Reports A Config Error

The card requires:

- `devices` to be a non-empty list.
- Every device to have `id` and `template`.
- Every link endpoint to reference existing device ids and port ids.

Start from [`examples/01-minimal.yaml`](../examples/01-minimal.yaml), then add VLANs, groups, templates, links, and live status one section at a time.

## Links Are Missing

For regular `link`, `lagg`, and `trunk` links, endpoints are paired by index. If one side has fewer ports than the other, only the zipped pairs are routed.

```yaml
endpoints:
  - { device: a, ports: [SFP0, SFP1] }
  - { device: b, ports: ["1", "2"] }
```

For QSFP fanout, set `fanout: qsfp40g-to-4x10g`, put the single QSFP port on one endpoint, and put up to four 10G ports on the other endpoint.

## VLAN Colors Are Missing

Confirm that:

- `vlans` defines each VLAN id with a `color`.
- `devices[].vlans` keys match template port ids exactly.
- Access ports use one VLAN id.
- Trunks use `trunk` or a list such as `[10, 20]`.

Links derive their cable color from endpoint port VLAN assignments. If neither endpoint has VLAN metadata, the cable uses the neutral color.

## Legend Is Missing

The legend only has useful content when `vlans` are defined. Enable it explicitly if needed:

```yaml
legend:
  show: true
  position: top-right
```

Valid positions are `top-left`, `top-right`, `bottom-left`, and `bottom-right`.

## Live Status Does Not Update

Check the Home Assistant entity first:

1. Open **Developer Tools -> States**.
2. Find the entity configured as `devices[].telemetry_entity`.
3. Confirm it has an `attributes.ports` object.
4. Confirm `port_map` values exactly match keys in `attributes.ports`.

Example:

```yaml
devices:
  - id: core
    template: cisco-4500x
    telemetry_entity: sensor.core_switch_ports
    port_map:
      "1": Te1/1
```

If the card cannot resolve telemetry for a port, it falls back to member/link entity, then static state, then `up`.

## Status Looks Unexpected

Remember the precedence order:

1. Telemetry from `telemetry_entity` and `port_map`.
2. Member or link `entity`.
3. Static member or link `state`.
4. Default `up`.

For aggregates, the label shows the worst member state: `down` > `flapping` > `disabled` > `up` > `unknown`.

## Panning Or Zooming Feels Lost

Drag the card to pan and scroll to zoom. If a `title` is configured, use the reset button in the card header to return to the default view.

## Development Harness Fails

Run the standard checks:

```bash
npm install
npm run typecheck
npm run build
npm run dev
```

If `npm run screenshot` fails because Chromium is missing, run:

```bash
npx playwright install chromium
```
