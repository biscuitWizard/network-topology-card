# Templates

Templates describe reusable device faceplates: chassis dimensions, the chassis SVG key, and every port's type, label, speed, size, and center position. Device instances place those templates on the topology canvas.

Rendering is composited from:

```text
chassis SVG + port SVG symbols + LED/status overlays + labels + routed cables
```

The card bundles the built-in chassis and port SVG assets into `dist/network-topology-card.js`; Home Assistant does not fetch separate SVG files at runtime.

## Built-In Templates

- `cisco-4500x`: Cisco Catalyst 4500-X with 16 SFP+ ports.
- `hp-5700`: HP FlexFabric 5700 with 48 RJ45, 4 SFP+, and 2 QSFP+ ports.
- `nuc-n150`: Intel NUC N150 with 3 RJ45 and 2 SFP+ ports.
- `generic-small-1eth`: small appliance with 1 RJ45 port.
- `generic-1u-2sfp-1eth-mgmt`: 1U server with 2 SFP+, 1 RJ45, and 1 MGMT port.
- `generic-1u-4eth-mgmt`: 1U server with 4 RJ45 and 1 MGMT port.
- `generic-2u-2sfp-1qsfp-mgmt`: 2U server with 2 SFP+, 1 QSFP+, and 1 MGMT port.
- `generic-2u-4eth-mgmt`: 2U server with 4 RJ45 and 1 MGMT port.
- `generic-4u-4eth-2sfp-mgmt`: 4U server with 4 RJ45, 2 SFP+, and 1 MGMT port.
- `generic-4u-2sfp-1qsfp-mgmt`: 4U server with 2 SFP+, 1 QSFP+, and 1 MGMT port.

The generic templates use vendor-neutral chassis art with reusable port symbols, which makes them good starting points for lab devices, servers, appliances, and access points.

## Inline Custom Templates

Add templates under the card's top-level `templates:` key:

```yaml
type: custom:network-topology-card
templates:
  - id: my-switch
    label: My Switch
    width: 1000
    height: 130
    chassis: generic-1u
    ports:
      - id: "1"
        label: Gi1/0/1
        type: rj45
        speed: 1G
        x: 220
        y: 78
        w: 46
        h: 40
      - id: "49"
        label: SFP49
        type: sfp+
        speed: 10G
        x: 790
        y: 74
        w: 50
        h: 27
devices:
  - id: access
    template: my-switch
    x: 0
    y: 0
```

Inline templates override built-ins with the same `id`. This is useful when experimenting or when a dashboard needs to stay compatible with an older cached bundle.

## Template Fields

- `id`: stable template id referenced by `devices[].template`.
- `label`: default device caption.
- `width`, `height`: chassis viewBox dimensions. Port coordinates use the same coordinate system.
- `chassis`: optional built-in chassis key. If omitted, the template id is used as the chassis key.
- `ports`: list of port definitions.

Each port has:

- `id`: stable port id referenced by links, VLANs, and `port_map`.
- `label`: optional visible label.
- `type`: `rj45`, `sfp+`, or `qsfp+`.
- `speed`: optional display metadata such as `1G`, `10G`, or `40G`.
- `x`, `y`: center point of the port in chassis coordinates.
- `w`, `h`: rendered width and height of the port symbol.

## Port Rendering

The card draws reusable RJ45, SFP+, and QSFP+ port symbols on top of the chassis SVG. Port LEDs and highlights reflect resolved state:

- `up`: green link LED with activity color.
- `down`: red.
- `disabled`: grey.
- `flapping`: pulsing yellow.
- `unknown`: idle/dim.

VLAN assignments draw colored bands below ports. Access ports use a solid VLAN color; trunks use stripes.

## Chassis Choice

For dashboard-only customization, prefer the built-in chassis keys used by generic templates:

- `generic-small`
- `generic-1u`
- `generic-2u`
- `generic-4u`

The built-in vendor chassis keys include:

- `cisco-4500x`
- `hp-5700`
- `nuc-n150`

New bundled chassis art requires a source change and rebuild, but most custom layouts can be handled with inline templates that reuse existing chassis art and port symbols.
