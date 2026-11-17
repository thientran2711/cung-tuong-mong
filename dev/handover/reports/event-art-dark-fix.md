# event-art-dark-fix report (art worker, 17/11)
PRIORITY #1 CHECK ('too dark|tối quá|event-art-style|brighter'): OD 8 | ledger 0 | claims 8 | main 10 | review/* 0 — reuses event-art-style prompts/keys; refs = act-ha-doc-dan (cpghCxF0eP) + act-bat-dau-bay-muu (Bh9LHJJoQR, uploaded to Magnific folder). Found CDN img/_review/event-art-style2/dark-fix/ (11 FIX files by an earlier session, not in any report) — NOT used/judged here; ask C.

Target look: act-bat-dau-bay-muu lum 79.9, act-ha-doc-dan lum 63.8 (0-255).
## STEP 1 measurement (mean luminance 0-255, OLD = left panel of the OLD|NEW review sheet, LIVE = img/<key>.webp)
Rule applied: FAIL if LIVE < 65 or LIVE < 0.9*OLD while the key is dark by meaning. NOTE: OLD pictures that were pastel/light (poisonedfish, rumours, toil scolds, hhsummons, spoiledfood) were redrawn dark by meaning; for them 'OLD -10%' cannot apply, so target = act-card look (>=65, ~70-90). cal/* OLD crops are approximate (3-panel sheets).
| key | OLD | LIVE | ratio | verdict |
|---|---|---|---|---|
| ev-e68-poisonedfish | 181 | 24 | 0.13 | FAIL |
| ev-e68-rumoremplove | 179 | 28 | 0.16 | FAIL |
| ev-e68-rumorth | 162 | 28 | 0.17 | FAIL |
| ev-e68-hhsummons | 167 | 31 | 0.18 | FAIL |
| ev-e68-spoiledfood | 158 | 30 | 0.19 | FAIL |
| ev-toil-rival-tease | 181 | 41 | 0.22 | FAIL |
| ev-toil-hh-scold | 149 | 36 | 0.24 | FAIL |
| ev-toil-rival-jealous | 175 | 42 | 0.24 | FAIL |
| ev-e68-rumorpreg | 171 | 42 | 0.25 | FAIL |
| ev-toil-th-scold | 146 | 43 | 0.29 | FAIL |
| ev-e68-bordernews | 90 | 28 | 0.31 | FAIL |
| ev-e68-stormnight | 133 | 42 | 0.32 | FAIL |
| ev-e68-rumorfavor | 101 | 33 | 0.33 | FAIL |
| ev-taintpick | 104 | 36 | 0.35 | FAIL |
| ev-plantpick | 85 | 34 | 0.40 | FAIL |
| ev-e68-leakroof | 88 | 35 | 0.40 | FAIL |
| ev-tt3 | 90 | 37 | 0.41 | FAIL |
| opt-giu-chan-hoang-thuong | 89 | 47 | 0.53 | FAIL |
| ev-am-muu | 49 | 28 | 0.57 | FAIL |
| ev-td1 | 64 | 37 | 0.57 | FAIL |
| ev-news-tin-trong-cung | 71 | 43 | 0.60 | FAIL |
| ev-toil-crowd-jealous | 154 | 99 | 0.65 | FAIL |
| intro/td-2 | 79 | 60 | 0.76 | FAIL |
| ev-nc1 | 46 | 45 | 0.99 | FAIL |

24 FAIL keys. Every other dark-ish key (OLD or LIVE <115, 90 keys) is LIVE >= 1.25x OLD => pass. ev-nc1 OLD 46 / LIVE 46 equal to OLD but below 65 -> still on list. Not measured (no review sheet, never redrawn): q72/act pictures not touched by event-art-style, b13 intro skipped ones.

## STEP 2 samples (NOT uploaded): sheet OLD | LIVE | NEW with lum on tiles
dev/handover/reports/event-art-dark-fix/sample1-OLD-LIVE-NEW.jpg
| key | creation | LIVE lum | NEW lum |
|---|---|---|---|
| ev-am-muu | u5Y4lE1QLD | 28 | 74 |
| ev-e68-stormnight | huZwrFrvqL | 42 | 81 |
| ev-e68-poisonedfish | nVLuIBEYQD | 24 | 73 |
| ev-toil-hh-scold | mERU1rBhJQ | 36 | 85 |
gpt-2-6, 4:3 1k, refs act-bat-dau-bay-muu + act-ha-doc-dan. Self-check: warm rose/red interior, moon + lanterns/candles, room fully readable, no faces (all backs), no text. Waiting for Foreman C OK; then remaining ~20 fails in sheets of ~12.
