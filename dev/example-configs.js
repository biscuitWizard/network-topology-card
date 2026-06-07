import { testConfig, mockHass } from "./config.js";

const telemetry = {
  core: "sensor.core_switch_ports",
  dist: "sensor.dist_switch_ports",
};

function teMap(count) {
  const map = {};
  for (let i = 1; i <= count; i += 1) {
    map[String(i)] = `TenGigabitEthernet1/${i}`;
  }
  return map;
}

function rangeVlans(start, end, vlan) {
  const out = {};
  for (let i = start; i <= end; i += 1) out[String(i)] = vlan;
  return out;
}

export const examples = {
  "01-minimal": {
    label: "Minimal Network Topology",
    config: {
      type: "custom:network-topology-card",
      title: "Minimal Network Topology",
      layout: { padding: 64, device_scale: 1, link_curvature: 0.25 },
      devices: [
        { id: "router", template: "nuc-n150", name: "Firewall", mgmt_ip: "10.0.0.1", x: 0, y: -360 },
        { id: "core", template: "cisco-4500x", name: "Core Switch", mgmt_ip: "10.0.0.10", x: 0, y: 0, scale: 0.9 },
      ],
      links: [
        {
          id: "router-core",
          name: "WAN/LAN",
          type: "link",
          state: "up",
          endpoints: [
            { device: "router", ports: ["SFP0"] },
            { device: "core", ports: ["1"] },
          ],
        },
      ],
    },
  },
  "02-vlans-legend": {
    label: "VLANs and Legend",
    config: {
      type: "custom:network-topology-card",
      title: "VLANs and Legend",
      layout: { padding: 80, device_scale: 0.95, link_curvature: 0.35 },
      legend: { show: true, title: "VLAN Membership", position: "bottom-right" },
      vlans: [
        { id: 10, name: "Servers", color: "#22c55e" },
        { id: 20, name: "IoT", color: "#f59e0b" },
        { id: 30, name: "Wi-Fi Clients", color: "#a855f7" },
        { id: 99, name: "Transit", color: "#ef4444" },
      ],
      devices: [
        { id: "core", template: "cisco-4500x", name: "Core Switch", mgmt_ip: "10.0.0.10", x: 0, y: 0, vlans: { "1": "trunk", "2": "trunk", "3": 10 } },
        { id: "dist", template: "hp-5700", name: "Distribution Switch", mgmt_ip: "10.0.0.11", x: 0, y: 420, vlans: { "20": 20, "21": [20, 30], "51": "trunk", "52": "trunk" } },
        { id: "ap", template: "generic-small-1eth", name: "Access Point", mgmt_ip: "10.20.1.10", x: -620, y: 420, vlans: { ETH0: [20, 30] } },
        { id: "server", template: "generic-2u-2sfp-1qsfp-mgmt", name: "App Server", mgmt_ip: "10.10.20.20", x: 720, y: 20, vlans: { SFP0: 10, MGMT: 99 } },
      ],
      links: [
        { id: "core-dist-trunk", name: "Core Trunk", type: "trunk", state: "up", endpoints: [{ device: "core", ports: ["1", "2"] }, { device: "dist", ports: ["51", "52"] }] },
        { id: "ap-access", name: "AP Trunk", type: "trunk", state: "up", endpoints: [{ device: "ap", ports: ["ETH0"] }, { device: "dist", ports: ["21"] }] },
        { id: "server-access", name: "Server Access", type: "link", state: "up", endpoints: [{ device: "server", ports: ["SFP0"] }, { device: "core", ports: ["3"] }] },
      ],
    },
  },
  "03-groups": {
    label: "Groups and Zones",
    config: {
      type: "custom:network-topology-card",
      title: "Rack and Zone Groups",
      layout: { padding: 90, device_scale: 0.92, link_curvature: 0.4 },
      legend: { show: true, title: "Zones", position: "top-right" },
      vlans: [
        { id: 1, name: "Management", color: "#3b82f6" },
        { id: 10, name: "Servers", color: "#22c55e" },
        { id: 30, name: "Clients", color: "#a855f7" },
      ],
      groups: [
        { id: "core-zone", name: "Core", vlan: 1, devices: ["router", "core"] },
        { id: "server-rack", name: "Server Rack", vlan: 10, devices: ["app", "db"] },
        { id: "edge", name: "Edge", color: "#f59e0b", devices: ["ap"] },
      ],
      devices: [
        { id: "router", template: "nuc-n150", name: "Firewall", mgmt_ip: "10.0.0.1", x: -520, y: -340, vlans: { SFP0: "trunk" } },
        { id: "core", template: "cisco-4500x", name: "Core Switch", mgmt_ip: "10.0.0.10", x: -360, y: 0, vlans: { "1": "trunk", "3": "trunk", "4": "trunk" } },
        { id: "app", template: "generic-2u-4eth-mgmt", name: "App Node", mgmt_ip: "10.10.10.11", x: 820, y: -180, vlans: { ETH1: 10, MGMT: 1 } },
        { id: "db", template: "generic-4u-4eth-2sfp-mgmt", name: "Storage", mgmt_ip: "10.10.10.12", x: 820, y: 220, vlans: { SFP0: "trunk", MGMT: 1 } },
        { id: "ap", template: "generic-small-1eth", name: "AP", mgmt_ip: "10.20.1.10", x: -680, y: 420, vlans: { ETH0: [1, 30] } },
      ],
      links: [
        { id: "router-core", name: "Transit", type: "link", state: "up", endpoints: [{ device: "router", ports: ["SFP0"] }, { device: "core", ports: ["1"] }] },
        { id: "app-core", name: "App", type: "link", state: "up", endpoints: [{ device: "app", ports: ["ETH1"] }, { device: "core", ports: ["3"] }] },
        { id: "db-core", name: "Storage Trunk", type: "trunk", state: "up", endpoints: [{ device: "db", ports: ["SFP0"] }, { device: "core", ports: ["4"] }] },
        { id: "ap-core", name: "Wireless", type: "trunk", state: "up", endpoints: [{ device: "ap", ports: ["ETH0"] }, { device: "core", ports: ["5"] }] },
      ],
    },
  },
  "04-lagg-trunk-fanout": {
    label: "LAGG, Trunk, and QSFP Fanout",
    config: {
      type: "custom:network-topology-card",
      title: "LAGG, Trunk, and QSFP Fanout",
      layout: { padding: 96, device_scale: 0.95, link_curvature: 0.5 },
      devices: [
        { id: "firewall", template: "nuc-n150", name: "Firewall", mgmt_ip: "10.0.0.1", x: -620, y: -360, vlans: { SFP0: "trunk", SFP1: "trunk" } },
        { id: "core", template: "cisco-4500x", name: "Core Switch", mgmt_ip: "10.0.0.10", x: 0, y: 0, vlans: { "1": "trunk", "2": "trunk", "3": "trunk", "4": "trunk", "13": "trunk", "14": "trunk", "15": "trunk", "16": "trunk" } },
        { id: "dist", template: "hp-5700", name: "Distribution Switch", mgmt_ip: "10.0.0.11", x: 0, y: 520, vlans: { "20": 20, "33": 20, "54": "trunk" } },
        { id: "storage", template: "generic-4u-2sfp-1qsfp-mgmt", name: "Storage Server", mgmt_ip: "10.10.20.10", x: 820, y: -60, vlans: { SFP0: "trunk", SFP1: "trunk", MGMT: 20 } },
        { id: "ap", template: "generic-small-1eth", name: "AP", mgmt_ip: "10.20.1.10", x: -620, y: 520, vlans: { ETH0: [20, 30] } },
      ],
      links: [
        { id: "firewall-lagg", name: "Firewall LAGG", type: "lagg", state: "up", endpoints: [{ device: "firewall", ports: ["SFP0", "SFP1"] }, { device: "core", ports: ["1", "2"] }] },
        { id: "server-lagg", name: "Server LAGG", type: "lagg", state: "up", endpoints: [{ device: "storage", ports: ["SFP0", "SFP1"] }, { device: "core", ports: ["3", "4"] }] },
        { id: "core-dist-fanout", name: "Core QSFP Fanout", type: "trunk", fanout: "qsfp40g-to-4x10g", state: "up", endpoints: [{ device: "core", ports: ["13", "14", "15", "16"] }, { device: "dist", ports: ["54"] }] },
        { id: "ap-uplink", name: "AP Trunk", type: "trunk", state: "up", endpoints: [{ device: "ap", ports: ["ETH0"] }, { device: "dist", ports: ["20"] }] },
        { id: "mgmt-link", name: "Server Mgmt", type: "link", state: "up", endpoints: [{ device: "storage", ports: ["MGMT"] }, { device: "dist", ports: ["33"] }] },
      ],
    },
  },
  "05-custom-template": {
    label: "Inline Custom Template",
    config: {
      type: "custom:network-topology-card",
      title: "Inline Custom Template",
      layout: { padding: 72, device_scale: 1, link_curvature: 0.35 },
      templates: [
        {
          id: "custom-edge-router",
          label: "Custom Edge Router",
          width: 520,
          height: 180,
          chassis: "generic-small",
          ports: [
            { id: "WAN", label: "WAN", type: "rj45", speed: "1G", x: 210, y: 118, w: 46, h: 40 },
            { id: "LAN1", label: "LAN1", type: "rj45", speed: "1G", x: 290, y: 118, w: 46, h: 40 },
            { id: "SFP0", label: "SFP0", type: "sfp+", speed: "10G", x: 380, y: 118, w: 50, h: 27 },
          ],
        },
      ],
      devices: [
        { id: "edge", template: "custom-edge-router", name: "Custom Router", mgmt_ip: "10.0.0.1", x: -320, y: -260, vlans: { WAN: 99, SFP0: "trunk" } },
        { id: "core", template: "cisco-4500x", name: "Core Switch", mgmt_ip: "10.0.0.10", x: 0, y: 0, vlans: { "1": "trunk", "2": 99 } },
      ],
      links: [
        { id: "edge-core", name: "10G Uplink", type: "trunk", state: "up", endpoints: [{ device: "edge", ports: ["SFP0"] }, { device: "core", ports: ["1"] }] },
        { id: "wan", name: "WAN", type: "link", state: "down", endpoints: [{ device: "edge", ports: ["WAN"] }, { device: "core", ports: ["2"] }] },
      ],
    },
  },
  "06-live-status": {
    label: "Live SNMP Status",
    hass: mockHass,
    config: {
      type: "custom:network-topology-card",
      title: "Live SNMP Status",
      layout: { padding: 90, device_scale: 0.95, link_curvature: 0.45 },
      legend: { show: true, title: "VLANs", position: "top-right" },
      vlans: [
        { id: 1, name: "Management", color: "#3b82f6" },
        { id: 10, name: "Servers", color: "#22c55e" },
        { id: 20, name: "Devices", color: "#f59e0b" },
      ],
      devices: [
        { id: "core", template: "cisco-4500x", name: "Core Switch", mgmt_ip: "10.0.0.10", x: 0, y: 0, telemetry_entity: telemetry.core, port_map: teMap(16), vlans: { "1": "trunk", "2": "trunk", "5": "trunk", "6": "trunk" } },
        { id: "dist", template: "hp-5700", name: "Distribution Switch", mgmt_ip: "10.0.0.11", x: 0, y: 440, telemetry_entity: telemetry.dist, port_map: { "20": "GigabitEthernet1/0/20", "21": "GigabitEthernet1/0/21", "41": "GigabitEthernet1/0/41", "42": "GigabitEthernet1/0/42", "43": "GigabitEthernet1/0/43" }, vlans: { ...rangeVlans(17, 24, 20), "41": "trunk", "42": "trunk", "43": "trunk" } },
        { id: "firewall", template: "nuc-n150", name: "Firewall", mgmt_ip: "10.0.0.1", x: -620, y: -340, vlans: { SFP0: "trunk", SFP1: "trunk" } },
        { id: "server", template: "generic-2u-4eth-mgmt", name: "Swarm Node", mgmt_ip: "10.10.10.1", x: 720, y: 440, vlans: { ETH2: 20, ETH3: 20, ETH4: 20 } },
      ],
      links: [
        { id: "lagg0", name: "LAGG0", type: "lagg", state: "up", endpoints: [{ device: "firewall", ports: ["SFP0", "SFP1"] }, { device: "core", ports: ["1", "2"] }] },
        { id: "server-agg", name: "Telemetry AGG", type: "lagg", state: "up", endpoints: [{ device: "server", ports: ["ETH2", "ETH3", "ETH4"] }, { device: "dist", ports: ["41", "42", "43"] }] },
        { id: "core-dist", name: "Core Dist", type: "trunk", state: "up", endpoints: [{ device: "core", ports: ["5", "6"] }, { device: "dist", ports: ["20", "21"] }] },
      ],
    },
  },
  "99-full-home-network": {
    label: "Full Home Network",
    config: testConfig,
    hass: mockHass,
  },
};

export const exampleOrder = Object.keys(examples);
