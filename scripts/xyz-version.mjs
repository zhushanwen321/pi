#!/usr/bin/env node
/**
 * Bump the xyz version suffix while keeping the upstream base version.
 *
 * Usage:
 *   node scripts/xyz-version.mjs              # read current version
 *   node scripts/xyz-version.mjs 0.2          # set xyz suffix to 0.2
 *   node scripts/xyz-version.mjs --sync       # sync base from upstream, keep xyz suffix
 *
 * Version format: <upstream-version>-xyz-<xyz-version>
 * Example: 0.75.5-xyz-0.1
 *
 * The upstream base is read from packages/ai/package.json (same as release.mjs).
 * Only packages/coding-agent/package.json is modified (the only published package).
 */
import { readFileSync, writeFileSync } from "fs";

const codingAgentPkg = "packages/coding-agent/package.json";
const aiPkg = "packages/ai/package.json";

function readPkg(path) {
	return JSON.parse(readFileSync(path, "utf-8"));
}

function writePkg(path, data) {
	writeFileSync(path, JSON.stringify(data, null, "\t") + "\n");
}

function parseXyzVersion(version) {
	const match = version.match(/^(\d+\.\d+\.\d+)-xyz-(\d+\.\d+)$/);
	if (!match) return null;
	return { base: match[1], xyz: match[2] };
}

// Read current state
const codingAgent = readPkg(codingAgentPkg);
const currentVersion = codingAgent.version;
const parsed = parseXyzVersion(currentVersion);

if (process.argv.length === 2) {
	// Just print current version
	console.log(`Current version: ${currentVersion}`);
	if (parsed) {
		console.log(`  base: ${parsed.base}, xyz: ${parsed.xyz}`);
	}
	process.exit(0);
}

const arg = process.argv[2];

if (arg === "--sync") {
	// Sync base version from upstream, keep current xyz suffix
	const ai = readPkg(aiPkg);
	const baseVersion = ai.version;
	const xyzSuffix = parsed ? parsed.xyz : "0.1";
	const newVersion = `${baseVersion}-xyz-${xyzSuffix}`;

	codingAgent.version = newVersion;
	writePkg(codingAgentPkg, codingAgent);
	console.log(`Synced: ${currentVersion} → ${newVersion}`);
} else {
	// Set xyz suffix
	const xyzSuffix = arg;
	const baseVersion = parsed ? parsed.base : readPkg(aiPkg).version;
	const newVersion = `${baseVersion}-xyz-${xyzSuffix}`;

	codingAgent.version = newVersion;
	writePkg(codingAgentPkg, codingAgent);
	console.log(`Version: ${currentVersion} → ${newVersion}`);
}
