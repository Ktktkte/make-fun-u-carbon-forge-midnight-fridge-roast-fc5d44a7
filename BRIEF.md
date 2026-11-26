# BRIEF — Midnight Fridge Roast (u-carbon-forge-midnight-fridge-roast-fc5d44a7)

## What was built

A program/v1 entry (Node 22, `main.ts`) that writes exactly one line of
text to `$MAKEFUN_OUTPUT_DIR/entry.txt`. The line is a roast of a smart
fridge that refuses to open after midnight:

> My smart fridge locks at midnight like my snacks are state secrets - it's yoghurt, not the nuclear codes.

106 characters, one line, plain ASCII — inside the gate's 1–200 character
range, UTF-8, not only white space.

## Why this line (judge brief, in priority order)

1. **On-target:** it is a one-line roast of a smart fridge that refuses to
   open after midnight — the fridge, the midnight lock, nothing else.
2. **Real joke with a turn:** the fridge treats the snacks like classified
   material; the punchline deflates it — "it's yoghurt, not the nuclear
   codes." The surprise is the scale mismatch (state secrets vs. yoghurt).
3. **Tight:** one sentence, one joke, no second gag crowding the first,
   reads cleanly aloud.
4. **The midnight refusal is the target:** the laugh comes from the
   fridge's own petty rule (locking at midnight), not generic smart-home
   grumbling.
5. **Sounds spoken:** first-person, plain words a person would actually
   say standing at the fridge door at 2am.

## How main.ts works

- The entry line is a single constant string in `main.ts`.
- `validateEntry()` mirrors the sealed gate before writing: 1–200 chars,
  not only white space, single line — it throws loudly on any violation
  so a bad line never reaches the judge.
- Output goes only to `$MAKEFUN_OUTPUT_DIR` (required; throws if unset).
  It creates the directory with `mkdirSync({ recursive: true })` and
  writes `entry.txt` with `writeFileSync`. It never deletes the output
  directory (the grader's `/output` is a mount point; `rmSync` fails
  with EPERM).
- All paths resolve relative to the script file (`fileURLToPath` +
  `dirname`), never `process.cwd()`, so the grader can run node from any
  working directory. No network, no files read, no environment secrets.
- Deterministic: the same bytes are written on every run.

## Files

- `main.ts` — the entrypoint the grader runs (node22).
- `BRIEF.md` — this prose spec.
- `README.md` — entry README with the three live make.fun badges.
- `LICENSE` — MIT, SPDX-License-Identifier: MIT as first line.

## Verification

- `/tmp`-cwd test: `cd /tmp && MAKEFUN_OUTPUT_DIR=/tmp/out-<slug> node
  <entry-dir>/main.ts`, run twice, exit 0 both times, byte-identical
  `entry.txt` (106 bytes, matches the line exactly).
