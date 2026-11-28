# E-TITLES3-LRM4 — titles2 line re-merged onto LIVE 5fb13d60 → review/titles-daycard-lrm4 (Foreman E child7 worker, session_01DgYSWnXgG7GYCMJK51pn8B)

PRIORITY #1 CHECK ('titles-daycard-lrm3|titles2-unit-harden|TITLES2|kgrow|dialog-fixed'): OD 17 (23/11 titles2 BUILD NOW) | ledger 0 | main 5fb13d60: no TITLES2 / jdh3 / 4 titles tests (E-T2FLAKE-L5 finding confirmed); dialog-fixed.js + jksize.js kgrow on main | review/titles-daycard-lrm3 14a3a4c2, review/titles2-unit-harden 6cc8a0c4 (both merged here) | claims: E-TITLES3-LRM4 (this), KK62 for kit.
KIT CHECK: reuses kitPanel (reward / info) + rows, kitTitlePlate, kit option cards, kitEmpty (j3), kszLivePick3 / kszHandFit3 (jksize). No kit part added or changed by me. kit-std-scan (Fold + iPad): head 28 = LIVE 28 {X02 20 · X06 4 · X08 4}.
depth 8 · START_CTX ≈ 5 % (get_session read 0; estimate).

**HEAD = 472960ba** (review/titles-daycard-lrm4). Never pushed main, no PR.

## 1. Merge (fetch --depth=30, merge-base 00dca386 in range)
| commit | what |
|---|---|
| 4a22ab95 | merge titles-daycard-lrm3 14a3a4c2 onto LIVE 5fb13d60 |
| 6b715388 | merge titles2-unit-harden 6cc8a0c4 (test-only, clean) |
| 472960ba | rebuild (build_site.sh; assets.json = LIVE 5fb13d60) |

Conflicts and how resolved (LIVE wins; titles feature kept):
- dev/build/assemble.py: LIVE's list (476 files, incl. jmgskin / jplink / jstack / jglink the lrm3 base lacked) + `jdh3n.js, jdh3.js` after `jge.js` (same rule as every earlier titles re-merge). Checked: new list = LIVE + exactly those 2.
- dev/build/jdh.js dhNotice: LIVE body kept (`return kitPanel(...)`, `!RCPRE` log guard, `dhNotice=rcpReg("dhNotice",dhNotice)` save-unseen-lists remake) + lrm3's «Đeo ngay» `setTimeout(()=>{dhPick(key);if(Q.length&&$("modal").hidden)showModal()},0)`. lrm3's dhNoteShow / DH_NOTE gate auto-merged above it; it calls the rcpReg-wrapped dhNotice (title panel still remade on load).
- index.html / sw.js: LIVE side, then rebuilt. Auto-merged clean: j71, jbal2, jdh2, jgoal, jkhand, KIT.md.

## 2. dialog-fixed.js — run FIRST, before any code change (Fold 755x1000 + iPad 1180x820 @2)
| build | result |
|---|---|
| head 472960ba | 72 ok · **1 FAIL** iPad «frame size XL: left figure same size + position»: 3-dai-ket-cuc 860x754 fig h621 y188 vs 7-ket-cuc-thua / 8-quiet 860x548 fig h415 y291 (= the MAIN 178 lrm3 FAIL). Fold all ok. |
| LIVE 5fb13d60 (same box, same run) | 85 ok · 0 FAIL (all three XL 860x754) |
| LIVE + `delete dlg.dataset.kgrow` before dialog 7 (probe) | **same FAIL** as head (548 / 415) |

ROOT CAUSE = KIT (jksize.js), not titles. iPad (kv2) XL frames grow to the full height (`data-kgrow="1"` → `--kph:min(100vh-24px,780px)`, §56.25) only when their text / ≥4 options still scroll; a short XL frame stays at the 70 % cap (574 px). The grand ending «Đại kết cục» scrolls → grows (754, fig 621); «Kết cục» / quiet ending are short → 548, fig 415. LIVE passes only because the dialog before them, «Danh hiệu mới», is a Bàn bài hand on LIVE: kszHandFit3 sets `data-kgrow="1"` on the reused `#modal .dlg` and the next pick (kszLivePick3_0 grow step) keeps it. Probe trace (iPad, after kszLivePick3_0 for dialog 7): LIVE kgrow "1", head null; content identical (kpmain 114/114, no scroll). The titles line makes every `spec.dh` panel a plain kit card list (KIT §101 WHERE «NOT a hand: … Danh hiệu», law 11, fixes LIVE dead «Để sau»), so the stale flag is gone and the kit's real behaviour shows.
→ STOPPED that part (law 9/10 kit fault). **KIT REQUEST K-XL-GROW-SAME** in dev/kit/KIT_REQUESTS.md (handover c50bb741) for KK62: (1) one XL frame height / figure size per device (OD #47), (2) every pick starts from a clean `data-kgrow` (no carry-over). No code change on the branch for this. dialog-fixed «after» = unchanged until KK62 lands the kit fix (then rerun; expected PASS — the 3 XL dialogs differ only by kgrow).

## 3. Gates on head 472960ba
| gate | result | LIVE 5fb13d60 (same box) |
|---|---|---|
| titles2-unit ×3 | PASS 84/0 · 84/0 · 84/0 | — (absent on LIVE) |
| titles2-ui | PASS · 0 issues | — |
| chapter-title-hook | PASS 41/0 | — |
| title-notice-tap (real taps Fold + iPad) | PASS 10/0 | — |
| titles2-scan | rows 1185 · lc 48 · missing 0 · clashes 0 · dups 0 · long 0 · bad how 0 | — |
| dialog-fixed | FAIL 1 (§2, kit) | PASS |
| quickcheck.sh (full, 472960ba vs live 5fb13d60) | core gates FAIL only G4 80-dialog-fixed (listed: 94-q-softlock, 95-next-dead, 96-kit-std-scan — see A/B rows); time-spill PASS; open 1660 ms 0 err; old save ok; perf step cut by my 20-min cap (box loaded by role-parity) | — |
| quickcheck.js alone (open / old save / perf) | **QUICKCHECK PASS** · open 1714 ms · old save from LIVE loads + plays a buổi, 0 errors · perf median of 3 new/live: render 275/229, tab 363/397, buổi 1115/1483 ms, tasks>200 21/22 | — |
| q-softlock (A/B, alone) | FAIL 1 «fold: view parked by a tab change → the card shows on «court»» | **identical FAIL 1** (LIVE-own; matches RV-173 14:47Z) |
| next-dead (A/B, alone) | FIX-6 PASS | PASS |
| kit-std-scan Fold + iPad | 28 {X02 20 · X06 4 · X08 4} | 28, same counts |
| kit-hand | 122 ok / 0 FAIL | 122 / 0 |
| role-parity ×1 | 8 ok · 2 FAIL (cx2 gaps maid:P-ONLY:bribeSrv, t1–t7/hh:N-ONLY:flat; riseCore Danh/Bạc/ghen) | **identical 2 FAIL** (diff of FAIL lines empty) → LIVE-own |
| coop-e2e (Fold host / iPad guest, live Worker) | see §3b | — |

Harness note (kit-std-scan + kit-hand, NOT a game fault): both route EVERY http://ctm.test request (28 sfx / vendor files) to the whole dev/index.html; at head's size (20.65 MB, +115 KB of titles code) the 28 × ~27.5 MB base64 replies cut the Playwright pipe ~2 s after the first tap («Target page … closed», browser log «Connection terminated while reading from pipe»). Proof: LIVE dev/index.html padded to the same size dies the same way. Counts above are from a scratch copy that answers non-page requests 404 (deleted, not committed). FOR KK62 / test owners: these two tests break for ANY build ≥ ~20.6 MB → route only index.html (one-line test fix).

## 3b. coop-e2e
- head 472960ba (Fold host 686x880 / iPad guest, live Worker ctm-coop): **142/143** · 1 FAIL «A cannot advance while frozen» (B left → A frozen OK, but A's advance was not blocked). The titles line touches no co-op file (jcoop*, jcoopone untouched; diff = jdh/jdh2/jdh3/jdh3n/j71/j72sd/jbal2/jgoal/jkhand + tests).
- LIVE 5fb13d60 A/B: running at report time (log /home/user/wt/lrm4-gates/coop-e2e-LIVE.log); result is appended below as «COOP LIVE» by this session if it finishes, else the reviewer runs `node dev/test/coop-e2e.js` on LIVE to classify the FAIL (titles-own vs LIVE-own / Worker flake).

## 4. UI check (law 12) — title notice + plates, Fold 755x1000 + iPad 1180x820 @2, looked at 3×
Shots (outside git): /home/user/wt/lrm4-shots/t2ui/t2-notice-*.png, t2-notice-cp-*.png, df-head/*-4-danh-hieu-moi.png.
- «Danh hiệu mới» (Fold + iPad): kit reward panel, title plate on the picture (#54 ok in dialog-fixed), two plain kit option cards «Đeo ngay» (Tốn / Được) + «Để sau» — not a hand any more (LIVE dead «Để sau» fixed); nothing clipped, no overflow-x.
- «Tiếng thơm» (rp notice, Bậc row «cao · trên «Khiêm cung»»): kit panel, rows Vì sao / Bậc / Được / Mất / Mất khi / Xem lại, no numbers, no %. **Fault (kit family, pre-existing on the titles line, noted in lrm2 §7):** its only option «Đã hiểu» is taken by the j3 empty-modal guard as the close (kitCancelIx) → kitModalLive false → the panel shows the kitEmpty block «Lúc này không còn việc để chọn · Đóng thẻ này; khi đủ điều kiện, việc sẽ mở lại.» on both devices (wrong words for a notice; ✕ still closes). Same code path on LIVE: jdh.js dhNotice worn branch has the same lone «Đã hiểu» (not shot on LIVE). → KIT REQUEST K-NOTICE-ACK (KIT_REQUESTS.md): a notice whose only option is the acknowledgement must not get the «không còn việc» empty state (fix in j3 kitModalLive / kitEmpty, the whole family). Not changed by me (kit file, law 9).

## 5. Verdict / next
HANDOVER (worker rollover, START_CTX ≈5 % +25 %): only the LIVE coop A/B append + the later re-merge on LIVE 18003079 + kit-kri-xl remain; coordinator opens a successor if needed. Worktrees: /home/user/wt/lrm4 (branch), /home/user/wt/lrm4-live (LIVE 5fb13d60), gates logs /home/user/wt/lrm4-gates.
- RV READY BIG review/titles-daycard-lrm4 472960ba with open items: (a) G4 dialog-fixed FAIL = KIT fault K-XL-GROW-SAME → blocked on KIT-KRI-XL review/kit-kri-xl 9e037402 (MAIN 183 00:34Z: passes in the E lrm4 trial merge; at RV-178); re-merge LIVE (now 18003079) once it lands; (b) coop-e2e 1 FAIL pending LIVE A/B (§3b). The titles line itself is green on every titles gate; every other FAIL seen is identical on LIVE.
- Order for landing: KK62 kit fix first (or together), rerun dialog-fixed on the combo, then E reviewer → LC33.
- Shots never in git; worktrees /home/user/wt/lrm4, /home/user/wt/lrm4-live (to delete after review).

## HANDOVER E-TITLES3-RV → re-merge worker (28/11 ~11:00Z; reviewer session_01DgYSWosMiUvqyAgcU6zyjW rolled: context 40 % ≥ START ≈5 % + 25 %)
State: LAND READY was **review/titles-daycard-lrm5-rv ed000505** (code 5b386917 = titles line on LIVE a96564ad; review dev/handover/reviews/titles-daycard-lrm5-review.md on that branch). LIVE moved to **aecbc267** (lr-rules-r3, 182 commits after a96564ad). `git merge-tree aecbc267 ed000505`: CONFLICT only in **dev/build/assemble.py** (+ built index.html / sw.js); j71 / jbal2 / jdh2 / KIT.md auto-merge.
NOT a design choice: the one-line module list. LIVE added modules; LIVE has no jdh3*. Resolution = LIVE's list unchanged + `'jdh3n.js', 'jdh3.js'` right after `'jge.js'` (same rule as every titles re-merge).
Recipe (branch **review/titles-daycard-lrm6-rv**):
1. worktree from origin/main aecbc267 (sparse, no shots), `git merge --no-edit ed000505`.
2. assemble.py: take the LIVE side of the conflict and insert jdh3n/jdh3 after jge. Check with Python: list − those two == LIVE list.
3. `git checkout --theirs index.html sw.js`; `bash dev/site/build_site.sh`; then restore assets.json to LIVE (`git show origin/main:assets.json > assets.json`) and RECOMPUTE sw.js against it (sw.js hashes assets.json: rerun build_site.sh lines «IMG_BASE … node --check sw.js», i.e. the V / PRE / sed on sw.tpl.js).
4. Honesty: (head − aecbc267) ± lines without index/sw == (ed000505 − a96564ad) ± lines except the assemble line (expect only that 2-line diff, + the review doc). assets.json = LIVE. Check the auto-merged j71 / jbal2 / jdh2: their titles ± lines are unchanged.
5. Gates on the head: titles2-unit ×2 (84/0) · titles2-ui · chapter-title-hook (41/0) · title-notice-tap (10/0; it taps the kit ✕ = LIVE «Thôi») · titles2-scan (1185 · 0) · **dialog-fixed (must be all pass)** · time-spill · `node dev/tools/quickcheck.js <wt> <aecbc267 index.html> --out <dir>` (old save from aecbc267). Each command ≤10 min.
6. Push review/titles-daycard-lrm6-rv → «LAND READY BIG review/titles-daycard-lrm6-rv <sha>» to Foreman E C11 session_01DgYSWnTLKESBZ9JC7oK5Xh.
Known, not branch-born: q-softlock «view parked» (seeded A/B 3/6 vs 3/6), K-NOTICE-ACK (LIVE), K-DH-CAPFIT WARN.
