// SPDX-License-Identifier: Apache-2.0
// Placeholder data for M0. Replaced by the gateway IPC stream in M1 (doc 41).

export type ConnectionState = "connected" | "degraded" | "disconnected";

export interface ConnectionCard {
  id: string;
  host: string;
  hostVersion: string;
  pluginVersion: string;
  pluginMatch: boolean;
  tier: "readonly" | "write" | "degraded";
  transport: string;
  port: number;
  session: string | null;
  approvals: number;
  lastCheckpoint: string | null;
  disconnects: string[];
  state: ConnectionState;
}

export const fakeConnections: ConnectionCard[] = [
  {
    id: "blender-1",
    host: "Blender",
    hostVersion: "4.5 LTS",
    pluginVersion: "0.1.0",
    pluginMatch: true,
    tier: "readonly",
    transport: "WebSocket",
    port: 8765,
    session: null,
    approvals: 0,
    lastCheckpoint: null,
    disconnects: [],
    state: "connected",
  },
];

export function buildDiagnostics(cards: ConnectionCard[]): string {
  return [
    "DCCMCP Desktop diagnostics",
    "shell: 0.1.0 (M0, fake data)",
    `hosts: ${cards.length}`,
    ...cards.flatMap((card) => [
      `- ${card.host} ${card.hostVersion}`,
      `  plugin: ${card.pluginVersion} (match: ${card.pluginMatch})`,
      `  tier: ${card.tier} | transport: ${card.transport}:${card.port}`,
      `  state: ${card.state} | disconnects: ${card.disconnects.length}`,
    ]),
  ].join("\n");
}
