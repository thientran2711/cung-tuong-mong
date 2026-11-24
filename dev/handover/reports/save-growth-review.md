# save-growth REVIEW — PASS e573b9b8 (E reviewer session_01DgYSWo2KgYDGKUVNxK99cu, opus BIG)
PRIORITY #1 CHECK ('save-growth review' / 'slotEnc CTMZ' / 'ration npc use'): OD 0 | ledger 0 | claims own row (worker 01DgYSWn2jD6dN6G4v5qkFaf DONE) | main 0 | review/* review/save-growth e573b9b8 only | decision FOREMAN_E_STATUS «ORDER FROM MAIN 125 (17:35Z 24/11)» (d)+(b).
START_CTX ≈ 3 % (own estimate).
Branch review/save-growth e573b9b87ae77720601d690077aa145e9bd9fc02; base review/robot10-e-fix-3-r2 6ac29a2c (ancestor ✔), LIVE origin/main 502c48c9 is an ancestor ✔ (FF-able once fix-3-r2 lands first or together).

## VERDICT: PASS e573b9b8 — no fix needed on the branch. Merge only on «RE-MERGE save-growth ON <sha>» from Foreman E / LC12.

## 1. Codec + every reader/writer (law 6c, sync-safe)
- j6 slotEnc/slotDec read line by line: header 30-bit length; literal runs ≤128 (ASCII 8 bit, other 17 bit, decoded exactly); matches len 4..259, dist 1..65535 (i-p<W guard; stale ring entries rejected by q>=p and by the compare); decoder bounds-checks every run/ref and throws on short input. Fully sync → save()/loadSlot stay sync.
- My own fuzz (scratch, not committed; 331 cases): empty, 1..11 chars, runs 32767/32768/32769/65535/65536/65537/200000, all 65 536 code units (×2, incl. lone surrogates, U+FFFE/FFFF), distance 65534..65537, match length 258/259/260/518/519, 300 random strings over 3 alphabets, 20 000-record JSON → **0 fails**, every packed char in U+0020..U+801F. Every prefix of a packed sổ: 0 silent successes (all throw → slotGet null). 2 000 random 1-char corruptions: no hang, never a non-string.
- git grep of every localStorage use in dev/build: all big life stores go through slotGet/slotPut — j6 save/loadSlot, j16 xuất/Ghi vào ô, jcloud rawSlot (plain JSON out) / writeSlot (packs), jcoopworld «ctm-coop-wk» snapSave/snapLoad, jcoopthine «ctm-thin-e:<room>». jload hasSave only tests presence (ok packed). Cloud bundle / hash / sumOf and the export code stay plain JSON ✔. Built index.html = source (rebuild differs only in CTM_BI line).
- Corrupt / cut sổ → slotGet null → «Trống», nothing written or deleted by the load path (same as a broken JSON sổ before) ✔. Nothing capped/dropped (same JSON text, packed) ✔.

## 2. Tests re-run by me (this sha)
| test | result |
|---|---|
| node dev/test/savegrow-codec.js (4 robot saves y1/5/10/14) | ALL OK (6.5–8.9× smaller; y14 4 339 284 → 486 820) |
| node dev/test/savegrow-slot.js y1 y5 y10 y14 (old plain-JSON load, pack, round trip after reload, export, import) | ALL OK, 0 page errors |
| bash dev/tools/quickcheck.sh | QUICKCHECK PASS · open 1446 ms · old save ok · core gates PASS · time-spill PASS |
| node dev/test/cloud-save.js — base 6ac29a2c | 53/55 (FAIL «iPad: its own Sổ 2 kept», «phone pulls the iPad Sổ 2 on the title») |
| node dev/test/cloud-save.js — e573b9b8 | 53/55, the SAME 2 FAIL (pre-existing). Note: 2 of 3 runs stopped earlier at the step-5 conflict wait (see N4: the race reproduces on base) |
| coop-e2e Fold host | 142/142 |
| coop-e2e COOP_SWAP=1 | 142/142 |
| savegrow-rouge y5 save, 12 months (npc.use 4) | 16.9 → 12.9 records / NPC, with lượt 8.3 → 4.4, lượt left 44.1 → 20.6, page errors 0 (= worker's AFTER row) |

## 3. BAL.ration.npc.use 3 → 4
- One core ✔: the only reader is jration lxNpcSpend via BAL.ration.npc (git grep: no typed 3/4 anywhere else, no design doc holds the number). rules-one-source / one-core-guard gates PASS.
- Law 2/3 ✔: a spend rate only; NPCs still buy at their own price when out (buy 54 / borrow 6 in 12 months), no option made cost-only; two-way untouched (same day-plan roads).
- Stock believable ✔: settles at ≈4–5 boxes with lượt per NPC instead of growing; nobody stays empty (buy road refills).

## 4. OPEN items stay OPEN ✔ (report lists them): (a) NPC dresses / promotion sets, (c) NPC food / dead NPCs' goods, the 0-lượt husk migration — not built (law 18), for MAIN / owner.

## NOTES (non-blocking, for Foreman E / MAIN)
- N1 perf: at year 10 a save() costs ≈ +37 ms (1022 → 1688 ms for 18 saves over 6 buổi; ≈3 saves per buổi ⇒ ≈ +110 ms per buổi; new life: no cost). Quickcheck passes; a later save debounce (one save per buổi) would win it back.
- N2 stale old-build tab in the SAME browser with Sổ mây on: it reads a packed sổ as empty, so its sync can put an empty head for that sổ; another linked device not playing that sổ then removes its local copy (writeSlot null) until the new-build tab syncs again (it re-puts its real copy). Recoverable (cloud keeps 10 versions; the packed sổ stays on the first device); same path as any unreadable sổ today. Low risk (PWA = one window). Optional follow-up guard.
- N3 jcoopworld:305 writes the full co-op C plain to «ctm-coop-last» at week end; write-only (never read) and overwritten small by the next co-op save → not a bypassing reader; could be packed or trimmed later.
- N4 PRE-EXISTING (not this branch): jcloud conflict panel sometimes does not open on the title — C.pend set, #modal stays hidden for 8 s+ (reproduced on base 6ac29a2c with a timing change). Worth a small fix item.
- N5 comment nit: the j6 codec comment says «no control chars»; the range U+0020..U+801F includes U+007F..U+009F — harmless for localStorage.
Scratch shots: none (no UI change). Worktrees /home/user/wt/sgrv, sgbase, sgho are local only.
