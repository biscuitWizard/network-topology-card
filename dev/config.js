// Dev-harness topology config. Mirrors src/config/topology.example.yaml so the
// standalone harness renders exactly what Home Assistant would.

function accessRange(start, end, vlan) {
  const out = {};
  for (let i = start; i <= end; i++) out[String(i)] = vlan;
  return out;
}

// Maps Cisco template port ids "1".."16" to realistic ifNames.
function teMap(n) {
  const m = {};
  for (let i = 1; i <= n; i++) m[String(i)] = `TenGigabitEthernet1/${i}`;
  return m;
}

export const testConfig = {
  type: "custom:network-topology-card",
  title: "Core Network Topology",
  layout: { padding: 90, link_curvature: 0.45 },

  vlans: [
    { id: 1, name: "Management", color: "#3b82f6" },
    { id: 10, name: "Servers", color: "#22c55e" },
    { id: 20, name: "Devices", color: "#f59e0b" },
    { id: 30, name: "Computers", color: "#a855f7" },
  ],
  legend: { show: true, position: "top-right", title: "VLANs" },

  groups: [{ id: "servers", name: "Servers", vlan: 10, devices: ["dsn", "dev", "swarm"] }],

  devices: [
    {
      id: "slzb",
      template: "generic-small-1eth",
      name: "SLZB-06U",
      mgmt_ip: "10.20.5.5",
      x: -660,
      y: 250,
      vlans: { ETH0: 20 },
    },
    {
      id: "eap",
      template: "generic-small-1eth",
      name: "EAP610",
      mgmt_ip: "10.20.1.10",
      x: -660,
      y: 520,
      vlans: { ETH0: [20, 30] },
    },
    {
      id: "nuc",
      template: "nuc-n150",
      name: "pfSense (NUC N150)",
      mgmt_ip: "10.0.0.2",
      x: 60,
      y: -470,
      vlans: { ETH0: 1, SFP0: "trunk", SFP1: "trunk" },
    },
    {
      id: "cisco",
      template: "cisco-4500x",
      name: "Core Switch",
      mgmt_ip: "10.0.0.10",
      x: 0,
      y: 0,
      telemetry_entity: "sensor.core_switch_ports",
      port_map: teMap(16),
      vlans: {
        1: "trunk",
        2: "trunk",
        3: "trunk",
        4: "trunk",
        5: "trunk",
        6: "trunk",
        13: "trunk",
        14: "trunk",
        15: "trunk",
        16: "trunk",
      },
    },
    {
      id: "hp",
      template: "hp-5700",
      name: "Distribution Switch",
      mgmt_ip: "10.0.0.11",
      x: 0,
      y: 440,
      telemetry_entity: "sensor.dist_switch_ports",
      port_map: {
        20: "GigabitEthernet1/0/20",
        21: "GigabitEthernet1/0/21",
        33: "GigabitEthernet1/0/33",
        34: "GigabitEthernet1/0/34",
        35: "GigabitEthernet1/0/35",
        41: "GigabitEthernet1/0/41",
        42: "GigabitEthernet1/0/42",
        43: "GigabitEthernet1/0/43",
        54: "Ten-GigabitEthernet1/0/54",
      },
      vlans: {
        ...accessRange(1, 16, 10),
        ...accessRange(17, 32, 20),
        21: [20, 30],
        33: 1,
        34: 1,
        35: 1,
        ...accessRange(36, 48, 30),
        49: 99,
        50: 99,
        51: "trunk",
        52: "trunk",
        53: "trunk",
        54: "trunk",
      },
    },
    {
      id: "dsn",
      template: "generic-4u-2sfp-1qsfp-mgmt",
      name: "DSN",
      mgmt_ip: "10.10.20.1",
      x: 1340,
      y: -330,
      vlans: { SFP0: "trunk", SFP1: "trunk", QSFP0: "trunk", MGMT: 1 },
    },
    {
      id: "dev",
      template: "generic-2u-2sfp-1qsfp-mgmt",
      name: "DEV",
      mgmt_ip: "10.10.50.1",
      x: 1340,
      y: 300,
      vlans: { SFP0: "trunk", SFP1: "trunk", QSFP0: "trunk", MGMT: 1 },
    },
    {
      id: "swarm",
      template: "generic-2u-4eth-mgmt",
      name: "Swarm",
      mgmt_ip: "10.10.10.1",
      x: 1340,
      y: 660,
      vlans: { ETH2: 30, ETH3: 30, ETH4: 30, MGMT: 1 },
    },
  ],

  links: [
    {
      id: "lagg0",
      name: "LAGG0",
      type: "lagg",
      state: "up",
      endpoints: [
        { device: "nuc", ports: ["SFP0", "SFP1"] },
        { device: "cisco", ports: ["1", "2"] },
      ],
    },
    {
      id: "trunk-core",
      name: "Core Trunk",
      type: "trunk",
      fanout: "qsfp40g-to-4x10g",
      state: "up",
      endpoints: [
        { device: "cisco", ports: ["13", "14", "15", "16"] },
        { device: "hp", ports: ["54"] },
      ],
    },
    {
      id: "dsn-lagg",
      name: "DSN LAGG",
      type: "lagg",
      state: "up",
      endpoints: [
        { device: "dsn", ports: ["SFP0", "SFP1"] },
        { device: "cisco", ports: ["3", "4"] },
      ],
    },
    {
      id: "dev-lagg",
      name: "DEV LAGG",
      type: "lagg",
      state: "up",
      endpoints: [
        { device: "dev", ports: ["SFP0", "SFP1"] },
        { device: "cisco", ports: ["5", "6"] },
      ],
    },
    {
      id: "dsn-dev",
      name: "DSN-DEV 40G",
      type: "link",
      state: "up",
      endpoints: [
        { device: "dsn", ports: ["QSFP0"] },
        { device: "dev", ports: ["QSFP0"] },
      ],
    },
    {
      id: "swarm-agg",
      name: "Swarm AGG",
      type: "lagg",
      state: "up",
      endpoints: [
        { device: "swarm", ports: ["ETH2", "ETH3", "ETH4"] },
        { device: "hp", ports: ["41", "42", "43"] },
      ],
    },
    {
      id: "swarm-mgmt",
      name: "Swarm Mgmt",
      type: "link",
      state: "up",
      endpoints: [
        { device: "swarm", ports: ["MGMT"] },
        { device: "hp", ports: ["33"] },
      ],
    },
    {
      id: "dsn-mgmt",
      name: "DSN Mgmt",
      type: "link",
      state: "up",
      endpoints: [
        { device: "dsn", ports: ["MGMT"] },
        { device: "hp", ports: ["34"] },
      ],
    },
    {
      id: "dev-mgmt",
      name: "DEV Mgmt",
      type: "link",
      state: "up",
      endpoints: [
        { device: "dev", ports: ["MGMT"] },
        { device: "hp", ports: ["35"] },
      ],
    },
    {
      id: "eap-link",
      name: "EAP610",
      type: "link",
      state: "up",
      endpoints: [
        { device: "eap", ports: ["ETH0"] },
        { device: "hp", ports: ["21"] },
      ],
    },
    {
      id: "slzb-link",
      name: "SLZB-06U",
      type: "link",
      state: "up",
      endpoints: [
        { device: "slzb", ports: ["ETH0"] },
        { device: "hp", ports: ["20"] },
      ],
    },
  ],
};

// Build a telemetry `ports` attribute (ifName -> status payload).
function ports(statuses) {
  const out = {};
  for (const [ifName, status] of Object.entries(statuses)) {
    out[ifName] = {
      status,
      oper: status === "connected" || status === "flapping" ? "up" : "down",
      admin: status === "disabled" ? "down" : "up",
      speed: 10000,
      flaps: status === "flapping" ? 5 : 0,
    };
  }
  return out;
}

// Mocked Home Assistant object with SNMP telemetry sensors. Demonstrates a
// flapping LAGG0 member (Te1/2), a down DEV-LAGG member (Te1/5), and a flapping
// Swarm AGG member (GE1/0/42).
const corePorts = ports({
  "TenGigabitEthernet1/1": "connected",
  "TenGigabitEthernet1/2": "flapping",
  "TenGigabitEthernet1/3": "connected",
  "TenGigabitEthernet1/4": "connected",
  "TenGigabitEthernet1/5": "disconnected",
  "TenGigabitEthernet1/6": "connected",
  "TenGigabitEthernet1/13": "connected",
  "TenGigabitEthernet1/14": "connected",
  "TenGigabitEthernet1/15": "connected",
  "TenGigabitEthernet1/16": "connected",
});

const distPorts = ports({
  "GigabitEthernet1/0/20": "connected",
  "GigabitEthernet1/0/21": "connected",
  "GigabitEthernet1/0/33": "connected",
  "GigabitEthernet1/0/34": "connected",
  "GigabitEthernet1/0/35": "connected",
  "GigabitEthernet1/0/41": "connected",
  "GigabitEthernet1/0/42": "flapping",
  "GigabitEthernet1/0/43": "connected",
  "Ten-GigabitEthernet1/0/54": "connected",
});

export const mockHass = {
  language: "en",
  states: {
    "sensor.core_switch_ports": {
      entity_id: "sensor.core_switch_ports",
      state: "9/10 up",
      attributes: { ports: corePorts, polled: "2026-06-06T21:10:00-07:00" },
    },
    "sensor.dist_switch_ports": {
      entity_id: "sensor.dist_switch_ports",
      state: "8/9 up",
      attributes: { ports: distPorts, polled: "2026-06-06T21:10:00-07:00" },
    },
  },
};
