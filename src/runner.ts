import { readFileSync } from "node:fs";

const day = process.argv[2];
if (!day) {
    console.error("Usage: bun run day <day>");
    process.exit(1);
}

const d = day.padStart(2, "0");

const module = await import(`./days/day${d}.ts`);
const input = readFileSync(`inputs/day${d}.txt`, "utf8");

const t0 = performance.now();
const result = await module.default(input);
const t1 = performance.now();

console.log(`Day ${d}`);
console.log(result);
console.log(`Time: ${(t1 - t0).toFixed(2)}ms`);
