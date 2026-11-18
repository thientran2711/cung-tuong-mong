PRIORITY #1 CHECK ('kit-ico-rank|rkCoop|Bảng vàng'): OD 2 | ledger 3 | claims 8 (row 774 worker READY d0840f4e, row 780 this review) | main 15 | review/* 4 (kit-ico-rank, -r1, -r2, -r2-r1). Reviewer; built nothing new. Prior verdict reused: reports/review-kit-ico-rank-r1.md (PASS a1c7a37c, Worker safety + rollback steps).

# Review kit-ico-rank r2 — review/kit-ico-rank-r2 @ d0840f4e

VERDICT: **PASS aaa1bec1** (review/kit-ico-rank-r2-r1; ancestor = current origin/main 25bfd7cf → fast-forward possible).
aaa1bec1 = d0840f4e + merge of origin/main 25bfd7cf (main moved 10 commits: voice-trait-r1, makeup-theme-r1). Conflicts: assemble.py module list → main's list (incl. jtone*.js, jmkt.js) + `../../rank/worker/src/score.js`, `jkrank.js`, `jrank.js` after `jnight.js` (same rule as r1/r2); index.html + sw.js rebuilt by build_site.sh. No reviewer code fixes needed.
START_CTX ~10 % (est.); finished well under the ceiling, no handover needed.

## The fix (d0840f4e, dev/build/jrank.js only) — read every line
- `rkCoop()` = `window.COOPW.on` (jcoopworld `const CW=window.COOPW={...on:false...}`); the old bare `CW` in jrank's scope resolves to j25's face helper `n=>"@W"+n`, so `CW.on` was always undefined → every co-op life went up as "solo". Confirmed by reading both definitions.
- Co-op end card: kit section header + kit rows (KIT 9 `kitRows`, same as the rows above) kept; «Xem Bảng vàng» button NOT drawn → «Chuyển kiếp» is the only button; board reachable later from ☰. Solo unchanged.
- rkEndPaint regex anchored on `<!--krk-e-->` (emitted by rkEndInner in both modes) — works with and without the button.
- Root cause and scan in the worker's report hold: only the end-card button opened the board at death; nothing else auto-opens.
- Non-blocking note: rkCoop() is read at paint time; if the room ends (COOPW.on → false) while the dead player's card is still up and the card is re-painted by a late rank answer, the button would reappear. Harmless (solo behaviour), no action needed.

## ctm-rank Worker (rank/worker/**)
- r2 changes NOTHING under rank/worker/ vs r1 (diff d0840f4e vs a1c7a37c on rank/: empty). vs origin/main the whole tree is new (11 files, +345: .github/workflows/rank-worker.yml, wrangler.toml, package.json, src/index.js, board.js, score.js, 5 test files). I read index.js, board.js, score.js, wrangler.toml, workflow in full.
- Mode: board.js clean() already maps `mode==="coop"?"coop":"solo"`; score() does not read mode → coop lives score the same, nothing else depends on it.
- FF to main WILL run rank-worker.yml (score + board tests, then `wrangler@4 deploy`). Same DO class `Board`, same migration tag v1 → no storage migration; RULES.ver = 1 unchanged → no re-score. Only change vs the live script: the unused `RULES.sample` field (also returned by GET /rules — harmless) and the `BAL.rank=` line (no-op in the Worker, BAL undefined).
- **Safe for old clients: YES.** Live main has no jrank → old clients never call ctm-rank. New clients use the same API that is live now (checked: https://ctm-rank.victoria-tntt.workers.dev/health → {"ok":true,"ver":1}; /rules ver 1).
- Worker tests on aaa1bec1: score.test.mjs ALL OK, board.test.mjs ALL OK. Rollback steps: reports/review-kit-ico-rank-r1.md.

## Tests (aaa1bec1 build, all run by me)
- coop-e2e vs LIVE ctm-coop: run 1 **58/63** (run in parallel with rank-e2e on the same box: week-3 merge stalled — host had a queued «Điềm báo» modal not shown, then rejoin/rebirth checks cascaded; nothing in jrank's path), run 2 alone **63/63** (incl. B dies → rebirth → new person in the same world, A sees her, week after rebirth advances, solo + old save load).
- rank-e2e (fresh local stand-in, old save = origin/main index.html): 755x1000@2 **ALL OK (55)**, 1180x820@2 **ALL OK (55)** — incl. co-op case: rows kept, buttons = ["Chuyển kiếp"], no #krkov / recovery card, mode "coop", «Chuyển kiếp» goes on to the next life.
- quickcheck HEAD vs live 25bfd7cf: **PASS** ×2 · core gates PASS (one-core-guard, rules-one-source, kit-conform, co-op one world) · old save ok · perf new/live render 213/174 + 198/237 ms, tab 321/298 + 354/312, buổi 1085/767 + 1327/1106 (live itself varied 767→1106 between runs: box noise, not a trend).
- oldsave-r1 (old = origin/main index.html): **16/16**.
- ico-ph (kit icon family): 755x1000@2 + 1180x820@2 PASS — placeholders = kitPhPick of their slot, rail ico-cal/ico-goal + status ico-download/ico-update painted (no glyphs), no page errors, no overflow.

## LOOK (looked at every shot; scratch only, nothing uploaded)
- Co-op end card Fold 755x1000 + iPad 1180x820 (scrolled to the bottom): v3 frame (figure column + picture + kit rows), "BẢNG VÀNG" kit header, rows "Công danh kiếp này" / "Thứ hạng", only «Chuyển kiếp». Same chip/row style as the "Kiếp này" rows above → kit consistent.
- Solo end card Fold + iPad: same rows + «Xem Bảng vàng» + «Chuyển kiếp» (unchanged).
- Board (Kiếp tab) Fold + iPad: podium with the lives' own figures, Nhất/Nhì/Tam medals, list rows with faces, own-life footer with Ta chip, Đổi tên hiệu / Mã khôi phục / Cách tính. No cut text, no overflow.
- Co-op reborn guest iPad (coop-e2e 12): new person, Hảo hữu chip, same world.
- Observation, NOT this branch: in rank-e2e shots (no reducedMotion) a large grey smoke wisp from main's death FX sits over the end card and even the board right after death; none of the 15 changed dev/build files has it (it comes from main). Main may want to check that FX layer's lifetime separately.

## Kit / wording
- No new CSS, no private part: the change only removes a kit button in co-op. VANPHONG: no new words.

## Housekeeping
- `python3 dev/site/cdn_sync.py --wipe-review kit-ico-rank-r2` (worker's 13 shots) FAILED: R2 listing HTTP 403 (code 10042 "Please enable R2"). Folder img/_review/kit-ico-rank-r2/ still holds 13 objects — main to wipe when the token allows.
- Test lives: coop-e2e run 1 + run 2 each sent one guest-B test life (mode coop) to the LIVE ctm-rank board (default rank URL in coop-e2e). Adds to the r1 note: wipe test lives before the owner sees the board.
