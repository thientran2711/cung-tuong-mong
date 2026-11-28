# save-rewind-2 — B FIXER SAVE-REWIND-2 (opus) session_01N1tNP6K6GumrbBF8d7DJtm → FOREMAN B ROOT 3 child 1 session_01N1tNP4nhQ82RVmZCb5akZg
PRIORITY #1 CHECK ('save rewind|SAVE REWIND|saveRewind'): OD 0 | ledger 0 | claims 8 | main 0 | review/* 0 | archive 0 → reused reports/save-rewind.md + dev/test/save-rewind.js (on LIVE) + harness review/robot-realtap f65d019b (detector read, robot-rt.js:367-370).
depth 2 · START_CTX ≈ 5 % (used_tokens reads 0; own estimate).

## VERDICT: **LIVE CURES IT (rewinds were pre-rv26)** — no game code changed, no branch pushed
(rv6 does not change it either way: rv6 + LIVE 18003079 also PASS.)

## (1) Sort of E's rewinds by build
| life | rewinds | build at the rewind | evidence | counts? |
|---|---|---|---|---|
| ES8 bd_tuyet random5-h 902785299 iPad | b162→160/161, b408→406, b755→753, b1049→1048 | pre-rv26: the stored sổ is the OLD unpacked form (571k → 2.86M chars) at every CP up to b1200 | rerun-E-E-S3-20261127-bd.json lives[1].saves | no |
| same | b1221→1220 (1 buổi) | the build switch itself: the re-force reload from the local recorded build (127.0.0.1:8770, old) onto github.io LIVE; the sổ it loaded was written by the old build | first packed (rv26) sổ at CP b1222 (2.86M → 275k chars) | no |
| same | — in b1222–1667 (445 buổi on LIVE ca4a1689, rv26) | post-rv26 | json: no rewind line after b1222 | **0 post-rv26** |
| E-S5 skilled-3 618859327 iPad | ×6 (first at y11) | pre-rv26 (repack only at b3339, 5.23M → 0.42M) | review/E-S5-R5-skilled-3-review.md | no |
| E-S5 greedy-5 / speed-1 / speed-3 Fold (ui3 kipgo loop) | ×1–2 per life, «1 buổi lost each» | logs on the runner disk only; all three lives were RESUMED from an older ckpt onto ui3 and stuck in the gift-picker loop (unstick reloads) | stuck/E-S5-kipgo-ui3/README.md | not a save bug (see harness note) |

## (2) Reproduce on LIVE 18003079 and rv6 (+ LIVE merged locally, 0da037dd, not pushed)
| test | LIVE 18003079 | rv6 9483e103 + LIVE |
|---|---|---|
| save-rewind.js Fold 755x1000 reload / close | PASS 0/293 · PASS 0/295 | PASS 0/302 · PASS 0/294 |
| save-rewind.js iPad 1180x820 reload / close | PASS 0/292 · PASS 0/291 | PASS 0/286 · PASS 0/290 |
| ANY-MOMENT probe (sổ clock vs live clock every 100 ms, busy AND free, 10 taps), F ckpt s18d, Fold (month + year flip 1.12.2.2→2.1.0.0) | 0 mismatch / 1066 polls | — |
| ANY-MOMENT probe, E's own post-rv26 ckpt E-S1-greedy-kipgo-24beb1a4 (b780, gift-picker life), Fold | 0 mismatch / 876 polls (month flip) | 0 mismatch / 877 polls |
| same, iPad | 0 mismatch / 799 polls | — |
Writes per buổi (save-rewind): LIVE 13.5–16.8 / tap, rv6 same range — no storm, no change.
The ANY-MOMENT probe is stronger than the harness: at no 100 ms moment (cards, scenes, nights, month / year flips open) did the sổ hold an older buổi than the live clock, so a reload at any moment lands on the current buổi.

## (3) Harness note (for Foreman F, not game)
robot-rt.js:369 compares the live clock with the highest clock ever seen in the life (R._maxClk). A RESUME from an older ckpt and a build re-force onto another origin (local 127.0.0.1 ↔ github.io: separate localStorage) both bring an older clock back and are logged as «SAVE REWIND» although no game save was lost. Suggest: reset R._maxClk (or tag «resume rewind») on resume=1 and on a re-force / origin change; only a rewind after a plain page.reload on the same origin is a game bug.

## LAW 11 family
Unchanged from reports/save-rewind.md (every writer / reload path; all «keep» or «stack cures» on LIVE). Nothing new found: no writer drops a step, no load path picks an older copy, on LIVE or on rv6.

## Gates
No code changed → no new gates needed; save-rewind.js (the save gate) run above on both sides. Probe script stays outside git (scratch).
