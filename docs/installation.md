# Installation

`network-topology-card` is a Home Assistant dashboard plugin. It renders the card only; optional live SNMP polling lives in the companion integration at [biscuitWizard/network-topology-snmp](https://github.com/biscuitWizard/network-topology-snmp).

The built artifact is `dist/network-topology-card.js`. It is a self-contained ES module with Lit and the SVG chassis/port assets bundled, so Home Assistant does not need to fetch any runtime files from this repository.

## Install With HACS

1. In Home Assistant, open HACS and add this repository as a custom plugin repository:
   `https://github.com/biscuitWizard/network-topology-card`
2. Install **Network Topology Card**.
3. Refresh the browser after HACS adds or updates the dashboard resource.
4. Add a manual card using:

```yaml
type: custom:network-topology-card
title: Core Network
devices:
  - id: switch
    template: hp-5700
    name: Switch
    x: 0
    y: 0
links: []
```

If the card editor does not show the latest version after an update, clear the frontend cache or reload the dashboard resource with a changed URL query string.

## Manual Install

1. Download or build `dist/network-topology-card.js`.
2. Copy it to your Home Assistant config directory as:

```text
<config>/www/network-topology-card.js
```

3. Add it as a dashboard resource:

```yaml
resources:
  - url: /local/network-topology-card.js?v=20260606-1
    type: module
```

4. Restart Home Assistant if this is the first file you have placed under `www/`.
5. Reload the browser or clear the dashboard cache.

The query string is intentional. Home Assistant and browsers cache JavaScript modules by URL, so bump `?v=` whenever you replace the file.

## Updating

With HACS, update from the HACS UI and refresh the frontend. With a manual install, replace `www/network-topology-card.js` and bump the resource URL query string.

## Optional Live SNMP Status

The card can consume live per-port status when a device has `telemetry_entity` and `port_map` configured. Install and configure the companion [Network Topology SNMP integration](https://github.com/biscuitWizard/network-topology-snmp) to create those telemetry entities. See [Live Status](live-status.md) for the expected entity shape and status precedence.
