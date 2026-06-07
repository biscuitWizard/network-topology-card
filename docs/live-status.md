# Live Status

The card can render static topology alone, or it can consume live per-port status from Home Assistant. The recommended live source is the companion [Network Topology SNMP integration](https://github.com/biscuitWizard/network-topology-snmp), which publishes one telemetry entity per switch.

This repository contains the dashboard card only. Install the companion integration separately when you want SNMP polling.

## Status Values

The card understands these normalized port/link states:

- `up`: connected and healthy.
- `down`: disconnected or link down.
- `disabled`: administratively disabled, unavailable, or shut down.
- `flapping`: changing state repeatedly.
- `unknown`: no recognized state.

SNMP telemetry statuses are mapped as:

- `connected` or `up` -> `up`
- `disconnected` or `down` -> `down`
- `disabled` -> `disabled`
- `flapping` -> `flapping`

Generic Home Assistant entity states are also mapped. For example, `on`, `up`, `connected`, `active`, `linked`, `online`, and `home` map to `up`; `off`, `down`, `disconnected`, `inactive`, `offline`, and `not_connected` map to `down`.

## Status Precedence

For each routed link member, the card resolves status in this order:

1. Device telemetry from `devices[].telemetry_entity` plus `devices[].port_map`.
2. A per-member `entity` or whole-link `entity`.
3. A static per-member `state` or whole-link `state`.
4. Default `up`.

When a link has multiple members, its label uses the worst member state: `down` > `flapping` > `disabled` > `up` > `unknown`.

## Telemetry Entity Shape

The companion integration should expose a Home Assistant entity whose attributes include a `ports` object keyed by interface name:

```yaml
sensor.core_switch_ports:
  state: "27/28 up"
  attributes:
    ports:
      Te1/1:
        status: connected
        oper: up
        admin: up
        speed: 10000
        alias: "pfSense LAGG0 member 1"
        in_bps: 1200000
        out_bps: 820000
        flaps: 0
      Te1/2:
        status: flapping
        oper: up
        admin: up
        speed: 10000
```

Only `status` is required by the card. The other fields are useful diagnostics from the companion integration.

## Mapping Template Ports To Interfaces

Templates use stable port ids such as `"1"`, `"54"`, `SFP0`, or `ETH0`. SNMP telemetry uses real interface names such as `Te1/1` or `Ten-GigabitEthernet1/0/54:1`. `port_map` connects those two worlds:

```yaml
devices:
  - id: core
    template: cisco-4500x
    telemetry_entity: sensor.core_switch_ports
    port_map:
      "1": Te1/1
      "2": Te1/2
```

For a physical port that maps to multiple telemetry interfaces, use a list. The card resolves the port state as the worst state across the listed interfaces:

```yaml
devices:
  - id: distribution
    template: hp-5700
    telemetry_entity: sensor.dist_switch_ports
    port_map:
      "54":
        - Ten-GigabitEthernet1/0/54:1
        - Ten-GigabitEthernet1/0/54:2
        - Ten-GigabitEthernet1/0/54:3
        - Ten-GigabitEthernet1/0/54:4
```

This is commonly used for QSFP breakout ports.

## Entity Overrides

If you do not use the SNMP integration, or if only a specific link has a sensor, bind a Home Assistant entity directly to the link or member:

```yaml
links:
  - id: wan
    name: WAN
    type: link
    entity: binary_sensor.wan_link
    endpoints:
      - { device: router, ports: [WAN] }
      - { device: switch, ports: ["1"] }

  - id: lagg0
    name: LAGG0
    type: lagg
    state: up
    members:
      - entity: binary_sensor.lagg0_member_1
      - entity: binary_sensor.lagg0_member_2
    endpoints:
      - { device: router, ports: [SFP0, SFP1] }
      - { device: switch, ports: ["1", "2"] }
```

Telemetry has higher precedence than these entity overrides for ports that can be resolved through `telemetry_entity` and `port_map`.

## Visual Behavior

- Port LEDs and port highlights reflect resolved member state.
- Cables stay VLAN-colored when `up`.
- `down` cables render red.
- `disabled` cables render grey.
- `flapping` cables and LEDs pulse yellow.
- Aggregate labels show the worst member state, so a single failed member is visible even when other members are up.

## Finding Interface Names

After configuring the companion integration, open Home Assistant **Developer Tools -> States**, inspect the switch telemetry entity, and copy the exact keys from `attributes.ports` into `port_map`.
