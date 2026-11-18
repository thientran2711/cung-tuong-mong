# root30-W91b (painter W91b, successor of W91, Foreman C ROOT-30) - JOB A elder (a51 + a65) c04-c08, then c01-c03
PRIORITY #1 CHECK: OD 0 | main 0 | review/* 0 | claims: brief dev/handover/briefs/root30-mass.md (UPDATE 21:12Z) + report root30-W91.md | method = frozen builder dev/art/t8-prompt-B (build.py, copied verbatim; golden c06 OK, test_low_all OK 2304 builds).
Rules read: FIGURE_GATE key parts (D face/pose, 3d/3e/3c items, 4b mouth, AGE 51/65, colours), README+refs, brief, W91 report.

## State (c04 only; context full after ONE person - ~100k tokens per person because verbatim prompts are 5.4 KB x 12)
Prompt assembly tip: a65 differs from a51 by exactly 3 chunks (age sentence 'about 65...', robe-colour sentence 'Her robe keeps exactly the same colours...', and 'elegant, luxurious elder colours...' inserted in COLOUR RULE after 'darken them as described above; '). v1/v2 differ from v0 only in the Outfit colour words + COLOUR RULE (see `build.py cNN vK --age aXX`).
Magnific (c04, ref own a51 t1 = JNCPs5nOq4, style eIyOFEidqL):
| cell | raw gen | bg-removed | verdict |
|---|---|---|---|
| a51 t8 v0 | JNCPUZfOq4 | Xm98e17Bfo | PASS |
| a51 t8 v1 | MBJe0SWDCm | TdwDcHyVNR | PASS |
| a51 t8 v2 | s7ISxI9l8e | p8yXMkDehw | PASS |
| a51 t7 v0 | gOmwLkYSXO | 4RF6Pe49Aa | PASS (silver streaks faint) |
| a51 t7 v1 | 1ldjKuVr4r had FOREHEAD DOT = FAIL; retry p8yXpKTehw | yiuN9VJPW9 (queued, not yet looked at final) | retry PASS raw |
| a51 t7 v2 | ksexKw316B | mEZatMghJQ | PASS |
| a65 t8 v0 | hu2fhmhvqL | UPvOJWUwny (queued) | PASS raw |
| a65 t8 v1 | nVs0WcVYQD FAIL (forehead dot); retry vQAECspa47 (queued) | - | to look |
| a65 t8 v2 | BhNt8tDoQR (queued) | - | to look |
| a65 t7 v0-2 | NOT STARTED | | |
Gens used so far: 12 + 2 retries. NOT yet uploaded to CDN, NO sheet built, NO READY sent for c04 (scratch /tmp is not durable: re-download from the Magnific creations above with creations_get).
NOTE: watch for a small red forehead dot (hoa dien) on v1/v2 gens - 2 of 14 had it; regen with same prompt.

## NEXT (successor): finish c04 (look at vQAECspa47, BhNt8tDoQR, remove bg; a65 t7 v0-2), sheet c04_elder_sheet.jpg (row a51: live a51 t8 | t7 v0-2 | t8 v0-2; row a65 same), names img/_review/t8-reprompt/c04_a51d_t{7,8}_v<k>.png + c04_a65_t{7,8}_v<k>.png, cdn_sync, READY. Then c05 (a51d2 files exist for v0 -> copy; ref If3hxHCtvE), c06-c08 (upload refs first), then c01-c03 a51 + a65 v1/v2 redo.
~X% xong: JOB A elder W91b = 0/8 sheets done (c04 ~70% generated) (~5%) / ~5% chơi được (nothing live).
