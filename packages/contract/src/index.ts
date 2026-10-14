// SPDX-License-Identifier: Apache-2.0
/**
 * Entry point for the DCCMCP tool contract.
 *
 * Types are generated from ../schema and re-exported here:
 *   npm run gen   →    packages/contract/generated/ts
 */
export type Risk = "read" | "write" | "execute";

export type ToolContract = {
  /** Stable, semantic tool name — never a raw host API name. */
  name: string;
  risk: Risk;
  /** Host versions this capability is valid for, e.g. [">=4.2", "<6"]. */
  applicableVersions: string[];
  /** Explicit write target is mandatory for write/execute tools. */
  requiresScope: boolean;
  /** Replacement tool to suggest when this one is unavailable. */
  supersededBy?: string;
};
