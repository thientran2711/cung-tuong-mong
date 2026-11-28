# E-TITLES3-RV — BIG review of review/titles-daycard-lrm4 472960ba (Foreman E; reviewer session_01DgYSWosMiUvqyAgcU6zyjW, 28/11)

PRIORITY #1 CHECK ('titles-daycard-lrm4|titles2|K-XL-GROW-SAME|K-NOTICE-ACK'): OD 17 (23/11 titles2 BUILD NOW) | main 18003079 (LIVE moved from 5fb13d60; no TITLES2 / jdh3 on it) | review/* titles-daycard-lrm4 472960ba, kit-kri-xl 9e037402 (K-XL-GROW-SAME 4263a65d + 42644772), kk63 29cbe6a4 (bigpage) | claims E-TITLES3-LRM4 (worker, archived), KK58 ACK of the jkhand +1 condition (MAIN_STATUS 27/11 ~11:42Z), Foreman E now C9 session_01DgYSWpbt5N1iEnhQhZBXkb.
KIT CHECK: reuses kitPanel (reward / info) + kit rows, kitTitlePlate (§82 / §82.1), kit option cards (§6.2b), kitModal info card, j3 kitEmpty; kit parts touched by the line: jkhand kitHandWants +1 condition (spec.dh → not a hand, KIT §101 WHERE line; KK58 ACK). Checklist dev/kit/KIT_CHECKLIST.md. kit-std-scan (REPORT_ONLY, Fold 755x1000 + iPad 1180x820): head 38 {X02 20 · X06 12 · X08 6} = LIVE 5fb13d60 38, the FAIL lists IDENTICAL line for line (the court-tab rows depend on the random life; worker saw 28 on both).
depth 8 · START_CTX ≈ 5 % (get_session reads 0; estimate). Reviewer does not open sessions.

## VERDICT: **PASS db036137** (review/titles-daycard-lrm4-rv = 472960ba + one law 4 fix by the reviewer) — **«dialog-fixed blocked on kit-kri-xl»**
- dialog-fixed iPad XL FAIL is the KIT fault K-XL-GROW-SAME, not a titles fault; it PASSES once kit-kri-xl 9e037402 is merged. Land titles only together with / after kit-kri-xl.
- db036137 is NOT a descendant of the current origin/main 18003079 (LIVE moved after the worker's merge). `git merge-tree 18003079 472960ba`: only index.html + sw.js conflict (built files; jbal2.js auto-merges) → the lander re-merges LIVE + rebuilds (assets.json = LIVE), then reruns titles2-unit + dialog-fixed on the combo.

## (1) Merge honesty — OK
- Titles line's own delta = 00dca386 → 6cc8a0c4 (merge-base of lrm3 with LIVE = 00dca386). Branch delta = 5fb13d60 → 472960ba. Excluding index.html / sw.js: the SAME 20 files, the same +1547/−545, and the +/− line lists are identical except one line: the dev/build/assemble.py list.
- assemble list: 478 = LIVE's 476 in the same order + `jdh3n.js, jdh3.js` right after `jge.js` (checked with Python: list minus those two == LIVE list). LIVE's jmgskin / jglink / jplink / jstack all kept.
- Every other file is byte-identical to LIVE 5fb13d60 → 0 lost LIVE hunks. assets.json identical to LIVE (git diff empty).
- jdh.js dhNotice: LIVE body (`!RCPRE` log guard, `rcpReg("dhNotice",…)` remake) kept + the lrm3 «Đeo ngay» setTimeout; dhNoteShow / DH_NOTE above it.

## (2) Gates (rerun by me; head 472960ba unless said; route-fulfill tests on scratch copies = head / LIVE + cherry-pick 29cbe6a4, never pushed)
| gate | head | LIVE A/B | note |
|---|---|---|---|
| titles2-unit ×3 | PASS 84/0 · 84/0 · 84/0 | absent on LIVE | + 84/0 on db036137 |
| titles2-ui | PASS · 0 issues (2 WARN iPad: caption plate wider than the picture → KIT REQUEST K-DH-CAPFIT already filed) | — | |
| chapter-title-hook | PASS 41/0 | — | |
| title-notice-tap (real taps, Fold + iPad) | PASS 10/0 | — | |
| titles2-scan | rows 1185 · lc 48 · missing 0 · clashes 0 · dups 0 · long 0 · bad how 0 | — | same on db036137 |
| dialog-fixed | 83 ok · **1 FAIL** iPad XL (see (3)) | 5fb13d60: 85 ok · 0 FAIL | head + kit-kri-xl: 84 ok · 0 FAIL |
| quickcheck.sh (core gates) | killed by my 10-min cap inside G4 button-crawl. Finished gates: G1 bind / guard / text / textrule / c6cancel PASS · G4 odds-cap PASS · coop-one-world PASS · mk-layer-scan 0 bad · manifest-guard 16/0 · npc-purpose PASS · dead-card PASS · **dialog-fixed 1 FAIL (= (3))** | — | |
| time-spill-guard | **PASS** · static + runtime | — | |
| quickcheck.js (open / old save / perf) | **QUICKCHECK PASS** · open 1942 ms · **old save from LIVE 18003079 (the newest LIVE) loads + plays a buổi** · perf median new/live render 242/247, tab 427/437, buổi 2525/1350 (in limit), tasks>200 25/24 | — | |
| q-softlock | default run: 14 PASS · 4 FAIL iPad (×3 runs, the stage-figure tap is covered by `div.kring-band`) | default: PASS (2 runs) | **life-dependent, LIVE-shared** — see below |
| q-softlock, origin forced (scratch copy of the test) | `cn` 18/0 · `dtq` 17/**1** «view parked by a tab change → the card shows on «court»» | `cn` 18/0 · `dtq` 17/**1** same row (Fold) | same row the worker + RV-173 saw on LIVE |
| coop-e2e (Fold host / iPad guest, live Worker) | 135 ok · **0 FAIL** before my 10-min cap; **«A cannot advance while frozen» ok**, «A frozen when B left» ok | LIVE: 51 ok · 0 FAIL before the cap (box loaded) | worker's single FAIL on that row = flake (passes here); titles diff touches no co-op file |
| role-parity ×1 | not finished in 10 min (killed in role-parity-scan) | not finished in 10 min (same) | worker's A/B: identical 2 FAIL on both → LIVE-own; no co-op / role file in the titles diff |
| kit-std-scan | 38 {X02 20 · X06 12 · X08 6} | 38, identical list | |
| button-crawl --fast (file://) | crawler start timeout | same crash on LIVE | harness (not in this brief's list) |
| page errors | 0 in every probe | 0 | |
q-softlock reasoning: FRESH() takes a random life; the build's code changes the RNG stream, so head and LIVE get different lives. With the SAME origin forced, both builds give the same result (cn 0 FAIL, dtq 1 FAIL on the same row). The iPad cover `div.kring-band` is the LIVE people ring (jkring.js, KIT §104), which opens over the stage on some places. jdayq / jdfv / jkring / realtap are not in the titles diff. → FOR MAIN / KK: q-softlock is life-dependent (a fresh life with 5 stage figures on iPad opens the people ring over the figure, and «view parked» fails for some lives); pin the life in the test (`__forceOrigin` + seed) so it can't flip.

## (3) dialog-fixed iPad XL — root confirmed: KIT K-XL-GROW-SAME → **blocked on kit-kri-xl**
- head: iPad 1180x820 «frame size XL: left figure same size + position in 3 dialogs» FAIL — 3-dai-ket-cuc 754 px, fig 220x621 y188 vs 7-ket-cuc-thua / 8-quiet 548 px, fig 220x415 y291 (same numbers as the worker and MAIN 178). Fold all ok.
- LIVE 5fb13d60: pass. The ONLY other row difference LIVE vs trial: dialog 4 «Danh hiệu mới» is a Bàn bài hand on LIVE («hand of cards (KIT §101)» rows) and plain kit cards on the branch — exactly the titles change (KIT §101 WHERE: Danh hiệu NOT a hand). On LIVE that hand's kszHandFit3 leaves `data-kgrow="1"` on the reused `#modal .dlg` and the next XL pick keeps it, so LIVE passed only by that stale flag.
- kit-kri-xl 4263a65d: `kszLivePick3_0` now starts with `delete dlg.dataset.kgrow` and the iPad XL is always the tall frame (CSS `[data-kgrow="1"][data-ksz="XL"]`); 42644772 holds the iPad frame height per size in kszLiveLay3. This is exactly the worker's root.
- TRIAL: 472960ba + merge 9e037402 (only index.html / sw.js conflicted → rebuilt, assets.json kept): **dialog-fixed all pass (84 ok, 0 FAIL)** on Fold + iPad. Not pushed.

## (4) Law scan of the titles content
- Law 2 / 3: all 28 «Danh tiếng» titles (RP in jdh3.js, BAL.dh.rp.T) carry a cause (Vì sao) AND a lose rule (Mất khi), and while held exactly ONE gain g and ONE loss l (checked: 28 RP rows = 28 BAL.T rows, each with g and l). No cost-only title. Same-matter titles are ONE ladder NHẸ · VỪA · NẶNG (only the highest rung held; titles2-unit G7). Chapter / side / việc nhờ / mưu hại / lập công titles: good + bad pair by real deed (cp). «Danh hiệu mới»: «Đeo ngay» / «Để sau»; wearing a title has no cost (Tốn không). OK.
- Law 1 / 6: the same RULE table runs for her and every NPC consort (rpSync); reputation titles are «gán by public opinion», cannot be worn (wearOK, dhAutoWear, dhAutoWear0 all skip rep). OK.
- **Law 4: 1 fault found and FIXED by me (db036137):** the «Cần kiệm» keep rule typed `(p.duc||0)>=t.duc-10`. Now `BAL.dh.rp.T.cankiem.offDuc:45` and the rule reads `t.offDuc` (same value 55−10, no behaviour change). Every other threshold / effect / tier in jdh3 / jdh3n reads BAL.dh.rp / BAL.dh.cp (the remaining literals are word tables nW 0–10, chapter index 4, calendar ×12). After the fix: titles2-unit 84/0, titles2-scan 1185/0.
- Law 7: no %, no machine tags in player text. Effect words come in words: «một phần mười / một phần tám», «hơn một chút / hơn / hơn hẳn» (BAL.dh.rp.deg), rungs «thấp / giữa / cao». Note (pre-existing LIVE TITLE-BAL, not this line): «Cách có: đọc sách 50 lần · đủ 120 lần» prints counts — allowed by VANPHONG («con số đứng sau tên»).
- Law 9 / 10: the panels are the kit reward / info panel + kit rows + kitTitlePlate (§82) + kit option cards. The «Danh tiếng» group in Nhiệm vụ › Danh hiệu uses the SAME kit «t» row as LIVE's earned titles (plate + text; compared with LIVE shots). jkhand +1 condition (spec.dh → not a hand, §101) ACKed by KK58. No private CSS in the diff.
- Law 11: one gate for every title panel (dhNoteGate, DH_NOTE rp / hieu), and every spec.dh panel is not a hand (whole family; title-notice-tap 10/0).
- Law 12 — shots Fold 755x1000@2 + iPad 1180x820@2, looked at 3× (scratch /home/user/wt/g/ack, not in git, CDN not used):
  - «Tiếng thơm» (Phong hoa tuyệt đại, Bậc «giữa · trên «Quốc sắc thiên hương»»): kit reward panel, plate on the picture, rows Vì sao / Bậc / Được / Mất / Mất khi / Xem lại, nothing cut, no overflow-x — BUT the K-NOTICE-ACK empty block shows (see (5)).
  - Danh hiệu panel: tabs Mục tiêu · Danh hiệu 2/38 · Thiên mệnh, «Danh tiếng · 1/28» group, kit plate + text row, «Đeo «Thư hương»» kit card; inside the frame on both devices, no overflow-x, 0 errors.

## (5) K-NOTICE-ACK — **LIVE-born, kit/j3 fault for KK64, not a blocker**
Probe (scratch): «Danh hiệu lên bậc» for the title she is WEARING (jdh.js dhNotice worn branch → lone «Đã hiểu») on **LIVE 5fb13d60**: Fold + iPad both show «Lúc này không còn việc để chọn · Đóng thẻ này; khi đủ điều kiện, việc sẽ mở lại.» and only ✕ — identical on the head. The branch's «Tiếng thơm» (rpNotice, lone «Đã hiểu») shows the same block on both devices. Same j3 empty-modal guard → KIT REQUEST K-NOTICE-ACK (KIT_REQUESTS 28/11 ~01:05Z) stands for KK64: a notice whose only option is the acknowledgement must show it as the close, not the «không còn việc» empty state (whole family).

## Small fix made by the reviewer (review/titles-daycard-lrm4-rv)
- db036137 (on 472960ba): jbal2 `cankiem.offDuc:45` + jdh3 cankiem keep rule `t.offDuc` (law 4); index.html / sw.js rebuilt, assets.json = LIVE. Tests on it: titles2-unit 84/0, titles2-scan 1185 · 0.

## FOR FOREMAN E (C9) / LANDER
1. Land order: kit-kri-xl 9e037402 (K-XL-GROW-SAME) first or together → re-merge db036137 onto LIVE 18003079 (only index.html / sw.js conflict → rebuild, assets.json = LIVE) → rerun dialog-fixed + titles2-unit on the combo → LAND.
2. KK64: K-NOTICE-ACK (LIVE-born, above). K-DH-CAPFIT (titles2-ui WARN iPad) already filed.
3. Test owners: q-softlock life-dependent (pin origin + seed); role-parity and coop-e2e need > 10 min on this box (both cut on head AND LIVE at my cap); button-crawl --fast with a file:// game times out at start on head and LIVE alike.
Shots: scratch only (deleted with the worktrees); none in git; no CDN folder used.
