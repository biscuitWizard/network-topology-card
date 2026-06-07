# Configuration

A card starts with `type: custom:network-topology-card`, at least one device, and optional links, VLANs, groups, and templates.

```yaml
type: custom:network-topology-card
title: Core Network
layout:
  padding: 90
  link_curvature: 0.45
  device_scale: 1

vlans:
  - id: 10
    name: Servers
    color: "#22c55e"
legend:
  show: true
  position: top-right

devices:
  - id: core
    template: cisco-4500x
    name: Core Switch
    mgmt_ip: 10.0.0.10
    x: 0
    y: 0
    telemetry_entity: sensor.core_switch_ports
    port_map:
      "1": Te1/1
      "2": Te1/2
    vlans:
      "1": trunk
      "2": [10, 20]

links:
  - id: uplink
    name: Uplink
    type: lagg
    state: up
    endpoints:
      - { device: router, ports: [SFP0, SFP1] }
      - { device: core, ports: ["1", "2"] }
```

For full working examples, see [`examples/`](../examples/).

## Top-Level Fields

- `type`: must be `custom:network-topology-card`.
- `title`: optional card header. When present, the header includes a reset-view button.
- `layout`: optional canvas settings.
- `templates`: optional inline device templates. These are merged over the built-in registry, so an inline template with the same `id` overrides a built-in template.
- `devices`: required list of placed device instances.
- `vlans`: optional VLAN definitions used for port bands, link coloring, group tinting, and the legend.
- `legend`: optional VLAN legend controls.
- `groups`: optional tinted zone boxes behind related devices.
- `links`: optional list of routed links between device ports.

## Layout

```yaml
layout:
  padding: 90
  device_scale: 1
  link_curvature: 0.45
```

- `padding`: canvas padding around the device bounds.
- `device_scale`: global scale multiplier applied to all devices unless a device has its own `scale`.
- `link_curvature`: accepted for compatibility with the card config shape. The current router draws rounded orthogonal cable paths.

The rendered topology supports mouse/touch drag to pan, wheel scroll to zoom, and the header reset button to return to the default view.

## Devices

Each device is an instance of a template:

```yaml
devices:
  - id: hp
    template: hp-5700
    name: Distribution Switch
    mgmt_ip: 10.0.0.11
    x: 0
    y: 440
    scale: 1
    telemetry_entity: sensor.dist_switch_ports
    port_map:
      "54":
        - Ten-GigabitEthernet1/0/54:1
        - Ten-GigabitEthernet1/0/54:2
        - Ten-GigabitEthernet1/0/54:3
        - Ten-GigabitEthernet1/0/54:4
    vlans:
      "54": trunk
```

- `id`: unique device id referenced by links and groups.
- `template`: built-in or custom template id.
- `name`: display caption. Defaults to the template label.
- `mgmt_ip`: optional caption line under the name.
- `x`, `y`: top-left canvas position.
- `scale`: optional per-device scale multiplier.
- `vlans`: per-port VLAN membership keyed by template port id.
- `telemetry_entity`: optional Home Assistant entity that exposes SNMP telemetry for this switch.
- `port_map`: maps template port ids to real interface names in the telemetry entity. A value may be a string or an array of strings; arrays are useful for QSFP breakout lanes and resolve to the worst status across the mapped interfaces.

## VLANs And Legend

Define VLANs once:

```yaml
vlans:
  - id: 1
    name: Management
    color: "#3b82f6"
  - id: 10
    name: Servers
    color: "#22c55e"

legend:
  show: true
  position: top-right
  title: VLANs
```

Port VLAN assignments live on each device:

```yaml
devices:
  - id: switch
    template: hp-5700
    x: 0
    y: 0
    vlans:
      "1": 1
      "2": trunk
      "3": [1, 10]
```

- A single VLAN id marks an access port and draws a solid band.
- `trunk` marks a trunk carrying all defined VLANs and draws stripes.
- A list such as `[1, 10]` marks a trunk carrying that subset and draws those stripes.

Links inherit cable color from the endpoint port VLAN assignments. A single access VLAN uses that VLAN color; trunks and multi-VLAN links use a neutral cable with VLAN stripes. State colors override cable coloring when a member is down, disabled, or flapping.

## Groups

Groups draw tinted, dashed boxes behind related devices:

```yaml
groups:
  - id: servers
    name: Servers
    vlan: 10
    devices: [nas, hypervisor, swarm]
```

- `devices` is the list of device ids to enclose.
- `vlan` tints the group from a VLAN definition.
- `color` can be used instead of `vlan` for an explicit color.

The box auto-sizes to the selected devices and leaves room for captions.

## Links

Regular links, LAGG links, and trunk links use the same endpoint shape:

```yaml
links:
  - id: lagg0
    name: LAGG0
    type: lagg
    state: up
    speed: 20G
    endpoints:
      - { device: router, ports: [SFP0, SFP1] }
      - { device: core, ports: ["1", "2"] }
```

- `type`: `link`, `lagg`, or `trunk`.
- `state`: optional static state, one of `up`, `down`, `disabled`, `flapping`, or `unknown`.
- `entity`: optional Home Assistant entity for the whole link.
- `members`: optional per-member state/entity overrides by index.
- `vlan`: optional link VLAN metadata. Endpoint port VLANs are the primary source for cable coloring.
- `endpoints`: exactly two endpoint objects.

For `link`, `lagg`, and `trunk`, member ports are zipped by index: `endpoints[0].ports[0]` connects to `endpoints[1].ports[0]`, `ports[1]` connects to `ports[1]`, and so on.

## QSFP Fanout

Use `fanout: qsfp40g-to-4x10g` for a 40G QSFP port broken out into four 10G lanes:

```yaml
links:
  - id: core-distribution
    name: Core Trunk
    type: trunk
    fanout: qsfp40g-to-4x10g
    state: up
    endpoints:
      - { device: core, ports: ["13", "14", "15", "16"] }
      - { device: distribution, ports: ["54"] }
```

One endpoint should contain the single QSFP port and the other should contain up to four lane ports. The card detects the QSFP side from the template port type when possible and draws four breakout strands from the QSFP cage.

## Status Precedence

For every routed member, effective status is resolved in this order:

1. Device telemetry from `telemetry_entity` plus `port_map`.
2. Per-member or per-link Home Assistant `entity`.
3. Static per-member or per-link `state`.
4. Default `up`.

The label/badge state for an aggregate is the worst state of its members: `down` takes priority over `flapping`, then `disabled`, then `up`, then `unknown`.
