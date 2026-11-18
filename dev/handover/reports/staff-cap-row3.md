PRIORITY #1 CHECK ('staff-cap-apply|staff-cap-row3|data-new=|data-tgo'): OD 0 | ledger 0 | claims 7 | main 15 | review/* 2 | archive 3
# staff-cap-row3 — report (worker, sonnet) — branch review/staff-cap-row3 @ 456010f80370081106b9f99580834d4024cf44bf (1 commit on origin/main 94a93759)

Tier (dev/tools/tier.js): **SMALL** — 6 files, all `tests only`, no game code, no BAL, no rules change.

## 1. staff-cap-apply row 3 — the TEST was wrong, the CODE and BAL are right
- Row 3 failed `favOk===0` with `fav:25, favOk:25`. Probe on live: the 25 FAV keys at 1 are all `@W0..@W24` = consort avatars from `AV.women`.
- `dev/build/j17.js:43` sets `FAV["@W<i>"]=1` when `AV.women[i]` exists. They are in-code and not `face-*.webp` files. Blocking every image therefore cannot clear them, and the test's "no old face file loaded" meant only the real `img/face-*.webp` keys.
- Fix (test only): `favOk` counts only keys not starting with `@`. Result on live: `fav:25, favOk:0, maid:52, mama:8, eun:30, rm:true, re:true`.
- Table check against the owner's staff table (OD 18/11 ~02:15Z + FINAL ~02:50Z: ĐƯ 1+0, TT 2+0, QN 2+0, Tần 2+1, Phi 3+1, QP 3+2, HQP 4+2, HH 5+2, Thái hậu 5+2, Nữ đế 5+3):

| row of staff-cap-apply.js | what it checks | before | after |
|---|---|---|---|
| 1 | BAL.promo.cap / capTh / capNd = table | PASS | PASS (`[[1,0],[2,0],[2,0],[2,1],[3,1],[3,2],[4,2],[5,2]]`, th `[5,2]`, nd `[5,3]`; matches OD verbatim) |
| 1b | capLaw per rank prints the table, no % | PASS | PASS |
| 1c | staff tab Quý nhân 2/2 cung nữ · 0/0 thái giám | PASS | PASS |
| 2a / 2b | old save QN + untrusted / trusted eunuch: leaves + told | PASS | PASS |
| **3** | identity pool 52/30/8, old face files blocked, hiring still has room | **FAIL** | **PASS** |
| 3 ×4 | worst palace 12/16/20/24 consorts, every household = its table row | PASS | PASS |
| 5 | 30-year life, servant faces freed, no dup | PASS | PASS |
| 4 | Nữ đế reads capNd | PASS | PASS |
| — | no page errors | PASS | PASS |
Whole family: staff-cap-apply ALL PASS (13/13), staff-cap.js ALL PASS, staff-root.js PASS 16/16. BAL/rules did NOT change → not a BIG job.

## 2. dev/test/outside/route.js and the stale-selector scan of dev/test/**
- `#slots button[data-new="1"]` is NOT stale on live main: with a plain HTTP server route.js finds the button (drawSlots in j74.js still emits `button.kbtn[data-new]` inside `#slots`) and enters the life. The brief's "stale selector" did not reproduce here; the real route.js failure on live was a different one:
  `Danh carry-over 31..37` (every run). Cause: the test assumed `Danh ≤ 30`, but after the entry cap (`min(30, …)`, jkc.js:539) `kc2Carry` (jkc2.js:526) adds the origin's `BAL.kcv` row (`dn` ×.8/1/1.2). Fix: the bound is now computed in-page from `S.kc.carry` + `BAL.kcv` (ONE CORE — no typed number except the code's own entry caps 30 / 400). Bạc bound likewise (+200 slack kept). route.js: 3 consecutive runs `fail: []`, exit 0 (td, tt, cnv origins rolled).
- Real stale selector found and fixed: `data-tgo="cont"` — the title's "Tiếp tục" is now `<button data-tgo="slots" data-cstab="solo">`; a saved life is opened from the sổ list by `[data-load]`.

| file:line | stale selector | now |
|---|---|---|
| dev/test/life-preload.js:26 (CONT=1) | `[data-tgo="cont"]` | `#modal .kpmenu [data-tgo="slots"]` → wait `#modal [data-load]` → click |
| dev/test/sw-update.js:133 | `#modal.kpthome [data-tgo="cont"]` | slots → `#modal [data-load]` |
| dev/test/tutorial.js:70 | `#modal [data-tgo="cont"]` (silent fallback) | slots → `#modal [data-load]` (fallback kept) |
| dev/test/warm-continue.js:21 | `[data-tgo="cont"]` + text fallback that hit the slots opener only | the "Tiếp tục" slots button → wait `[data-load]` → click |
| dev/test/outside/route.js:73 | `Danh ≤ 30`, `Bạc ≤ 600` typed | BAL.kcv carry bound |
Checked and still valid (no change): every `#slots button[data-new="1"]` / `[data-load]` use (≈25 files: entry-exam, origin-intros, love96, her-allergy, roster_audit, kc-lore, kc-roads, outside/*, two-way-*, indep, luxury …), `data-tgo` = slots / past / opt / home / notes, `data-kcs` solo/coop, `[data-tgo=coop]` in kit-conform.js (has `.kco,[data-coop]` alternates; `data-coop` exists in jcooplobby.js). No test uses the old `#slots .slot` markup.
Verification: route.js ×3 pass; tutorial.js `old` now loads the old sổ through the new path (`loaded:true`; before: `null.click` crash). life-preload / sw-update / warm-continue need the built-site harness (HOST mode + SW) — only `node --check` + the identical click sequence proven in tutorial.js; not run end-to-end (say so honestly).
**Game-code finding (not patched, out of scope):** `dev/build/jtut.js:398` `addReplay()` looks for `[data-tgo="cont"]` in the title menu to add "Xem lại lời dặn"; the title no longer renders it, so the replay button never appears (tutorial.js `old` mode still reports `asked:false` for the same reason / a related one). Foreman D: send to a tutorial/title worker (SMALL, one selector → the Tiếp tục slots button, or `data-load` presence).

## 3. thin co-op figGC guard note — NOT included
The reviewer's note (review-staff-cap-apply.md note 1: skip `figGC` while `COOPW.ctx` is set, walk the TH seat states too) is a code change in `dev/build/j39.js` / co-op state, not a test or guard-script fix → excluded per the brief (owner 17/11 02:05Z: no co-op patching). Belongs to the thin-guest rebuild (Foreman B). coop-e2e not touched; this branch changes no game code.

## Gates (on 456010f8)
- one-core-guard: 0 fails (`PASS: one core`, inlineNow 3839 ≤ baseline 3842).
- quickcheck.sh: **PASS** · 150 s · open 1271 ms · old save loads + plays a buổi · perf (new/live median) render 166/183, tab 379/364, buổi 792/882 ms, tasks>200ms 14/14 · core gates PASS (one-core-guard, rules-one-source, kit-conform, coop-one-world, hooks 3) · time-spill guard PASS.
- Fold + iPad shots: not taken — the diff holds no UI/CSS/game-code line (tier script: tests only), so there is nothing on screen to look at. `grep -rn "^<<<<<<< " dev` empty.
- Worktree /home/user/wt/scr (sparse not needed: test-only), local http server killed after use.

SẴN SÀNG KIỂM 456010f80370081106b9f99580834d4024cf44bf — SMALL
