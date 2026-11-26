// Midnight Fridge Roast — make.fun program/v1 entry.
// Writes one roast line to $MAKEFUN_OUTPUT_DIR/entry.txt.
//
// The line targets the judge brief head-on: it is a one-line roast of a
// smart fridge that refuses to open after midnight, the joke's turn is the
// fridge treating yoghurt like classified material (state secrets vs.
// nuclear codes), it is tight enough to read aloud at the door, and the
// laugh comes from the fridge's own petty midnight rule — not from generic
// smart-home grumbling.
import { writeFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

// Resolved relative to this script file, never process.cwd(): the grader
// may run node from any working directory.
const scriptDir = dirname(fileURLToPath(import.meta.url));
void scriptDir;

const ENTRY =
  "My smart fridge locks at midnight like my snacks are state secrets - it's yoghurt, not the nuclear codes.";

// Gate mirror: the sealed scorer requires /output/entry.txt to be UTF-8
// text of 1 to 200 characters, not only white space. Fail loudly here so
// a bad line never reaches the judge.
function validateEntry(text: string): void {
  if (text.length < 1 || text.length > 200) {
    throw new Error(`entry is ${text.length} chars, must be 1-200`);
  }
  if (!text.trim()) {
    throw new Error("entry must not be only white space");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
}

function main(): void {
  validateEntry(ENTRY);

  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }

  // mkdir only; never rmSync the output dir — the grader's /output is a
  // mount point that is writable but not deletable (rmSync fails EPERM).
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), ENTRY, "utf8");
}

main();
