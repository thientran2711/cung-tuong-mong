LC19 = session_01V1ZZH43BkihGgNG4SX5MwU; START_CTX ~3 % of 1M (get_session reads 0; estimate); depth 4/8 (can open LC20 myself)
# LAND CHAIN 19 (successor of LC18 session_01V1ZZH4fCwydG8UT9j6GXGb; coordinator MAIN CHÍNH 149 session_01V1ZZH2zAQCCznbuVpXJEf9)
Roll at ctx >= ~28 %, ceiling 60 %. Main push only on MAIN 149 GO per item + gates/QC PASS + sếp's «cho phép đưa lên live» in LC19's own chat.

## Log
- 26/11 ~00:22Z took over. LIVE = 5e013076 · ROLLBACK 3762da08. Told MAIN 149 + LC18 my id. Go-live words in LC19 chat: NOT YET.
- a8 CHANGE line from MAIN 149 written into dev/site/CHANGE.txt, site rebuilt → a8 = 56f547c9 (review/lc18-a8-placerules, on d218392b).
- Gate chain on a8 56f547c9 started (sequential, QC alone last; also tainghe-info to see a5 state). Worktree /home/user/wt/st.
- ~00:40Z a8 gates so far: news-runner-lines ok · tinbao scan PASS · mg-color PASS · place-rules exit 1 + stage-stay exit 1 on pageerror (faults [] otherwise).
- BLOCKING found (a6 tinbao-words, since r3 89192f68): new global `function kitSay(x)` text cleaner in jnotice.js:56 overrides the kit bubble `kitSay(st,fig,text,opts)` jmark.js:165 (assemble order jmark → jnotice) → jchat.js:108 show() crashes «reading 'isConnected'» → NPC stage chat bubbles broken. Not on LIVE. Duplicate-global scan (top-level `function` names in assemble list): LIVE vs a8 differ ONLY by kitSay. Told MAIN 149: tinbao worker renames + rescan; or land q1→a5 without a6. a6→a8 HELD.
- 00:29Z MAIN 149: keep whole chain; TINBAO-WORDS to fix. Added gate dup-globals (every stack). a8 56f547c9 run stopped (void).
- 00:32Z TINBAO-WORDS r6 89af4d63 (kitSay → kitSayLine + dev/test/global-names/scan.js); MAIN 149 GO a6 = 89af4d63. Small rv PASS (pure rename).
- RE-STACKED: a6 50f8a13b (review/lc18-a6-tinbao, on a5 e4314b74) → a7 3f3fdfbd (review/lc18-a7-mgcolor) → a8 9812646a (review/lc18-a8-placerules; KIT_REQUESTS/jstagehere/stage-stay = d218392b resolution; tree = old a8 + exactly the r6 delta). a5 fallback run stopped (a5 head: audio-ipad, art-slots, kit-entry-gate, makeup-set+scan, dup-globals PASS).
- Gate chain on a8 9812646a ($SP/gates8.sh): dup-globals PASS · global-names 0 CLASH · news-runner-lines ok · tinbao scan PASS · …
- 00:36Z MAIN is now MAIN CHÍNH 150 session_01V1ZZH2YckQXrmUKJjntcTS (GOs from 150).
- 00:36Z TAINGHE r3b d4a3b38e (≥44 px ::after hit area); small rv PASS + FLAG overlap. RE-STACKED: a5 fe30bfb2 → a6 bc16dee8 → a7 b1eac2f5 → a8 bd2bb548 (tree = 9812646a + r3b delta). 00:41Z MAIN 150 LOOK PASS + GO, asked an overlap gate.
- hit-overlap gate (lc19-tools/hit-overlap.js) FAIL: new ::after boxes steal taps from button.card/.ka/.k3r/.me corners (vs old a5 e4314b74 baseline). Told MAIN 150 (options: wait TAINGHE r4 / back to e4314b74 stack 9812646a) + TAINGHE. a8 HELD.
- a8 bd2bb548 gates PASS so far: dup-globals, global-names 0 CLASH, news-runner-lines, tinbao scan, place-rules, stage-stay, mg-color, mg-craft kim/ve, art-slots, makeup-set + scan.
- MISTAKE: 09d81e31 on handover branch reverted others' files (stale soft reset when adding lc19-tools); restored in e5e743a9 (diff vs 37f1bff4 = only lc19-tools). holog.sh (fetch + reset --hard + cp one file) is the only safe way to write there.
- 00:47Z MAIN 150 option 2: back to old a5 → branches restored a5 e4314b74 · a6 50f8a13b · a7 3f3fdfbd · a8 9812646a. r3b 44 px hit areas = own item later (after TAINGHE r4 passes hit-overlap).
- a8 9812646a FULL CHAIN: all PASS (mg-craft run1 1/25 kim law-5 flake → rerun alone 25/25) · tainghe-info (r3b hardened test, untracked dev/test/_lc19_tainghe-info.js) PASS · hit-overlap: no new class vs LIVE baseline · QC alone PASS 204 s. → LAND READY q1→a8 sent to MAIN 150. Pre-existing FYI: person-popup dotted words over «Xin …» buttons (on LIVE).
- 01:10Z MAIN 150: a9 promo-root 8169d9da → stacked 93754609 (review/lc19-a9-promoroot), push HELD for sếp's Q5. a9 gates: dup-globals PASS · global-names 0 CLASH · promo-root.js PASS · QC alone PASS 211 s. Nit commit (forgetAt on pardon fallback) pending from PROMO-ROOT.
- Waiting: sếp's «cho phép đưa lên live» in LC19 chat + MAIN 150 GO.
- 01:21Z MAIN is now MAIN CHÍNH 151 session_01V1ZZH32xLDu8LN72LfSaVu. GO to stage after a9: a10 thin-p8-r2-rv 51cc7791 → a11 c3-rankroom 9bbebc9f → a12 c3-farshot 49d7de45 → a13 selection-scene-r19 10a0f82b. HELD: E e-pack-c ff373f76; srvmerit-guard 034b451e rv FAIL.
- STAGED: a10 76460e94 (review/lc19-a10-thinp8; assemble.py module-list union) → a11 99291cb0 (review/lc19-a11-rankroom; 64 RANK_ROOM bases all on CDN; NOTE C already swapped 240 LIVE CDN keys before landing) → a12 3637e37a (review/lc19-a12-farshot) → a13 a0ceaec7 (review/lc19-a13-selscene; assemble union jselx*). CHANGE lines for a10–a13 PENDING from MAIN (placeholder = a9 line). FLAG: a13 = full SELSCENE-19 game feature, not driver-only.
- F s3e-display-fix-rv 7e0cb6c4 dry merge on a12: 1 conflict dev/build/j79.js kitBar (union kitNeed + kitSkillName).
- Local co-op worker: /home/user/wt/wr (copy of coop/worker) wrangler dev :8791. Gate chain $SP/gates13.sh on a13 a0ceaec7 running (untracked dev/test/_lc19_tainghe-info.js in /home/user/wt/a9 — DELETE before any stack2 there).
