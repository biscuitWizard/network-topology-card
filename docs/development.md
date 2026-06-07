# Development

This repository builds the Home Assistant dashboard card. The companion live SNMP integration is maintained separately at [biscuitWizard/network-topology-snmp](https://github.com/biscuitWizard/network-topology-snmp).

## Setup

Use Node 18 or newer:

```bash
npm install
```

## Common Commands

```bash
npm run dev
npm run screenshot
npm run typecheck
npm run build
```

- `npm run dev`: builds the card and serves the standalone development harness at `http://127.0.0.1:8123/`.
- `npm run screenshot`: runs the headless screenshot harness and writes the generated image under the development output.
- `npm run typecheck`: runs TypeScript without emitting files.
- `npm run build`: bundles the production card to `dist/network-topology-card.js`.

The production bundle is self-contained: Lit, chassis SVGs, and port SVGs are bundled into `dist/network-topology-card.js`.

## Development Harness

`npm run dev` uses the same card code outside of Home Assistant so you can iterate on rendering, layout, cable routing, VLAN coloring, group boxes, and pan/zoom behavior quickly.

Open `http://127.0.0.1:8123/`, then:

- Drag the topology to pan.
- Use the mouse wheel or trackpad scroll to zoom.
- Use the reset button in the card header to return to the default view.

The harness mirrors the example topology from the source configuration and exercises:

- Composite SVG chassis and port rendering.
- Per-port LEDs and status highlights.
- Built-in and inline custom templates.
- LAGG and trunk links with zipped member pairing.
- QSFP 40G to 4x10G fanout routing.
- VLAN-colored access ports, striped trunks, and the legend.
- Group boxes behind related devices.
- Optional telemetry-backed port status when Home Assistant data is supplied.

## Building For Home Assistant

Run:

```bash
npm run build
```

Then install `dist/network-topology-card.js` with HACS or copy it manually to Home Assistant's `www` directory. See [Installation](installation.md).

## Screenshots

Run:

```bash
npm run screenshot
```

If Playwright has not installed Chromium yet, install it first:

```bash
npx playwright install chromium
```

Use screenshots as a rendering smoke test after changes that affect SVG assets, routing, layout, labels, state colors, VLAN bands, or groups.

## Type Checking

Run:

```bash
npm run typecheck
```

This validates the TypeScript code and config types, including the schema used by the documentation: `type`, `title`, `layout`, `templates`, `devices`, `vlans`, `legend`, `groups`, and `links`.
