import "dotenv/config";
import { exec } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";

const session = process.env.AOC_SESSION;
const year = 2025;

const day = Number(process.argv[2]);
if (!day) {
    console.error("Usage: bun run gen <day>");
    process.exit(1);
}

if (!session) {
    console.error("Missing AOC_SESSION in .env");
    process.exit(1);
}

const d = String(day).padStart(2, "0");

if (!existsSync("src/days")) mkdirSync("src/days");
if (!existsSync("inputs")) mkdirSync("inputs");

const tsFile = `src/days/day${d}.ts`;
if (!existsSync(tsFile)) {
    writeFileSync(
        tsFile,
        `export function part1(input: string) {
  const lines = input.trim().split("\\n");
  // TODO
  return 0;
}

export function part2(input: string) {
  const lines = input.trim().split("\\n");
  // TODO
  return 0;
}

export default function(input: string) {
  return {
    part1: part1(input),
    part2: part2(input),
  };
}
`,
    );
    console.log("✓ created", tsFile);
}

const url = `https://adventofcode.com/${year}/day/${day}/input`;

console.log("↓ downloading input...");

const res = await fetch(url, {
    headers: {
        Cookie: `session=${session}`,
        "User-Agent": "AoC Bun Script",
    },
});

if (!res.ok) {
    console.error("FAILED:", res.status);
    process.exit(1);
}

const text = await res.text();

const inputFile = `inputs/day${d}.txt`;
writeFileSync(inputFile, text);

console.log("✓ saved", inputFile);

const enigmUrl = `https://adventofcode.com/${year}/day/${day}`;
let command: string;

if (process.platform === "win32") {
    command = `start ${enigmUrl}`;
} else if (process.platform === "darwin") {
    command = `open ${enigmUrl}`;
} else {
    command = `xdg-open ${enigmUrl}`;
}

exec(command, (err) => {
    if (err) console.error("Impossible d'ouvrir le navigateur :", err);
    else console.log("Lien Advent of Code ouvert :", enigmUrl);
});
