# CLEAN1 — dọn kho (owner Lượt 810, via Foreman C ROOT-58). No gens, no credits.

| what | before | after |
|---|---|---|
| dev/handover/FOREMAN_C_STATUS.md | 34,497 B | 34,497 B (already trimmed by ROOT-57; untouched) |
| dev/art/ART_RULES.md | 62,474 B | 59,115 B (66 'over:' tails → ART_RULES_HISTORY.md) |
| dev/art/ART_RULES_HISTORY.md | 39,162 B | 43,070 B (appended, nothing lost) |
| dev/handover/reports/ | 715 files · 17,547,063 B | 699 files · 17,393,147 B |
| dev/handover/briefs/ | 529 files · 2,078,556 B | 525 files · 2,064,067 B |
| dev/handover/TAKEOVER_*.md | 99 files · 641,175 B | 25 files · 109,005 B (Foreman C: only ROOT58 left) |
| dev/handover/ total | 172,946,439 B | 172,423,081 B |
| NEW dev/handover/START_FOREMAN_C.md | — | 8,812 B |
| NEW dev/art/START_ART_WORKER.md | — | 4,951 B |

Start read for a new Foreman C: was takeover 8 KB + STATUS 34 KB + ART_RULES 62 KB ≈ 104 KB → now START_FOREMAN_C 9 KB + latest takeover 8 KB (rules via `rule.py find`). Art worker: START_ART_WORKER 5 KB + brief.

## Moved (git mv, history kept)
- dev/archive/reports/: AP1-approved-registry, BW1–BW6, CP1-report, F1-newfaces, MG1-m04-sample, NF1-handover, NF2-report, NF3-report, NF4, SEAL1, SL1.
- dev/archive/briefs/: newfaces-lanhlung-L761 (F1), sleeve-floor-L773 (SL1), thaihau-2ref (TH1), mama-mass (MMX).
- dev/archive/takeovers/: TAKEOVER_FOREMAN_C_ROOT, ROOT7–ROOT57, AG2–AG25 (74 files). ROOT58 kept.
## Kept on purpose (a script or a live successor points at them)
MG1-ledger-audit.md (mg1_ledger_audit.py writes it), NDX5.md (face_page/build_page.py), briefs palette86-L763 (palettes3/palette86.py) + P1-palette86 (P2 live), MG1-master-gate + master-gate-L745 (MG2 live), PR13-rooms + rooms-rest-L793 (PR14 live). Scripts that read reports/mama-specs, reports/quy-nhan, briefs/emo-anim-mass.md: untouched. Other foremen's files (D*, E*, root*/s*-common, FOREMAN_A/B/D/E, MAIN takeovers) and dev/OWNER_DECISIONS.md: untouched. RULES_CLEANUP_L766.md: left (not a worker file).
## ART_RULES check
`rule.py find gate` before = after: A9 A16 A19 B20 B24 B25 C5 C6 D15 F14 K15. `rule.py check`: 187 rules, 0 duplicates. No rule row was fully retired (the 5 'retired/superseded' mentions are inside live rules), so only 'over:' tails moved. rule.py `set` still works (it builds a new 'over:' from the replaced line).
