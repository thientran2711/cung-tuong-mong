# REVIEW cal-p2c (BIG, opus) — REVIEW cal-p2c session_01964izEVPc7dDPaXGpVx4pK, for FOREMAN D (#9 → #10 session_01964izDrx83qqXTF9t1BYy7)
PRIORITY #1 CHECK ('cal-p2 identity offset rolling b'): OD L2045 + L2046 + L2047 (read verbatim) | main: BAL.orig.art (mg-fair-ratio 90d57324), cal.k jbal2, mgTier jmgt; no rolling b / identity offset on main | review/cal-p2c d91d3c0a (CAL-P2C #1 SẴN SÀNG KIỂM) | claims: D #9 cal-p2c (worker idle for fixes); KIT REQUEST row on the handover branch dev/kit/KIT_REQUESTS.md L69.

## VERDICT
**PASS 217f8d3fe68988fa69c98013cbb8cf1c5d6748ef** (review/cal-p2c-rv, pushed) = FF of LIVE origin/main dd248d5d. Diff vs LIVE = cal-p2c only (14 files, 308+/31−, same as the worker's).
LIVE moved again to 8730f431 while this report was written (main lands every ~15–20 min; I final-merged 7 times). Its source merges cleanly (merge-tree: only
index.html / sw.js) → whoever lands it: merge origin/main, take theirs for index.html/sw.js, `bash dev/site/build_site.sh`, run dev/test/cal-p2c.js + quickcheck.

Reviewed review/cal-p2c @ d91d3c0ad232265a9190148daa7e244510617faf. origin/main moved twice during the review (66bd36cd → fd682a8d mg-back → 315950c2 mg-noword-kit + mg-allkinds),
so I final-merged it on review/cal-p2c-rv (the gate list below was re-run after every merge that touched mini-game code):
- 1da86708: merge fd682a8d. ONE real conflict, dev/build/j82.js (mg-back rewrote kg82Open / kg82ShowRes / kg82Play). mg-back's versions kept, the cal-p2c hooks re-applied:
  KG82.idNote reset in kg82Open, the identity row on top of kg82ShowRes, kg82Play(kind,onEnd,po), mgIdRes on the graded mark. Reviewer rule on the new path: a
  give-up (KIT §13.9, «Quay lại» before or during play) stays 0/10 with NO identity offset and her hand b learns nothing (else a sở trường with a low b could quit and
  still collect the offset). Checked live: give-up → 0, S.mgB unchanged, no row.
- d57698c7: merge 315950c2 (only index.html / sw.js conflicted → rebuilt). mg-noword-kit's kg82Signs skips result screens, so the identity row on the result is untouched.
- 03de3e32: merge 90b7e797 (kit-ge; generated files only).
- d5736241: merge f43efc71 (cal-p2b). jbal2 conflict: LIVE's BAL.ag.mg2.cal line (huong / mua / banh dropped as broken-board first tries) + the BAL.orig.id block.
  Those three kinds now seed from the prior only (no cal.k entry) — consistent with the worker's noSeed rule.
- a5cec69c: merge 8cf6b7d7 (mg-noword-b). assemble.py list conflict: LIVE's list (jnwb.js) + jmgid.js after jmgcal.js.
- e82842f6: merge 0aaf8152 (kit-mark). j82 kg82Play: cal-p2c line kept with kit-mark's `env=KG82.cur=`.
- d2a602e4 / f3271993 / f10c227a / 02e2d634 / 217f8d3f: merges of 99bdba82 (ge-map, kit-modal-spin), 15bf9c77 (kit-signs-odds), 8d385f2f (mg-ui-rest),
  26f3bfa9 (invite-host-away + tooling), dd248d5d (kit-podium-gate et al.) — generated files only.

## GATES (full set on d57698c7 / d5736241 / a5cec69c; then per merge: cal-p2c.js + the merged branch's own test + quickcheck, coop-e2e after co-op landings)
- cal-p2c.js ALL PASS (12) — old save from LIVE 315950c2 loads/plays/gets a store; co-op own b; Thử tay raw.
- ag-mgcal ok · ag-mgh ok · mg-fair-hands ok · origin-arts ok · mg-back 12/12 · mg-noword-kit 31 kinds / 0 words · mg-allkinds 7/7 · cal-p2b PASS · mg-noword-b ALL OK ·
  kit-ge PASS · kit-mark 280/280 (1/280 once under 4-way parallel load; 2/2 clean alone on branch and LIVE) · ge-map PASS · kit-modal-spin PASS · mg-ui-rest 39/39 ·
  invite-host-away 9/9. On 217f8d3f: cal-p2c ALL PASS (12, old save from LIVE dd248d5d).
- quickcheck on 217f8d3f: PASS (core gates PASS incl. one-core, old save ok, perf ≈ live). Flakes seen and checked against plain LIVE: G4 coop-one-world seed 3
  (R.evm 1 path) failed in 2 of 12 branch runs AND in 1 of 2 runs on plain LIVE 26f3bfa9 with the identical path — pre-existing; alone it passes 6/6 on both.
  One perf outlier (buổi 4478 ms) on the branch, next run 1233 ms while live read 6377 ms — box noise.
- coop-e2e (live Worker): 68/68 on every co-op-touching merge, last on 02e2d634 (after invite-host-away landed): 68/68.
- Pre-existing, confirmed on plain main: role-parity 2 FAIL (new gaps cx3:tell / harm accuse·banphe·uyhiep + promoted-maid act set) — identical on main 66bd36cd and on
  this branch (d91d3c0a, 1da86708, d57698c7). ag-mg2: the summons ×2 + exam «an NPC can fail» checks fail on plain main too and vary run to run (16-sample draws; main runs: 2, 2, 3 FAIL;
  branch: 3, 3, 1) — flaky, pre-existing, not from cal-p2c (the test switches BAL.orig.id.npc off).
- Shots (scratch only, not in git): Fold 755x1000 + iPad 1180x820 of a Cờ result, identity tt / tt_co (Cờ = sở trường), b 5: kit row «SỞ TRƯỜNG · thân phận này vốn giỏi
  môn ấy · tay quen Khá · 1/10 → 5/10» above «MÀN CHƠI 5/10 · Khá», same kitRows look as «CÁCH CHƠI», no overflow, no page errors, no %. Looked at both.

## THE 18 LAWS (touched ones)
1 two-way: NPC plays (mgNpcRaw) carry the same identity class shift (+1.5 / 0 / −1.5 = tgt[class] − tgt[""]) on their bell hand; her skip / odds roll = median + her
  shift = her expected play (mgMedD(0) = 7.5 = tgt[""]). Co-op: S.mgB is personal (not in W_KEYS) → each seat by its own b and identity (cal-p2c test 9, coop-e2e). PASS.
2/3 equal value / gain-loss: j82 contest skip and jexam skip (mgSkipRaw) = her identity level, so a sở đoản never gains by skipping. Give-up gives nothing (reviewer merge). PASS (note N1).
4 one core: every number in BAL.orig.id (tgt 9/7.5/6, trAt, prior 7.5, pw 3, a .2, age, seedW, noSeed, gap 0, npc, lo/hi) + BAL.orig.doan; jmgid only reads them. PASS.
5 harder as she climbs: the offset is added to the graded mark on the real (rank) board; b learns the play brought BACK to a matching board (g − (mgMedD(d) − mgMedD(0))),
  so a harder board still lowers her result; mgTier board ease untouched. PASS.
6/7: no %, odds in words; the row prints n/10 marks and a mgWord. PASS. 9 kit: kitRows only (KIT §51); the seal is a non-blocking KIT REQUEST (KIT_REQUESTS.md L69, handover branch). PASS.
11 whole group: every mini-game result path goes through kg82Play end or kg82Lesson (the only two mgGrade callers; jentry / jexam / jts / jtd / jslap / j82 / jmgcal all call kg82Play). PASS.
14/16/17/18: boards NOT retuned; no broken-game fix / mg-score-same / mg-fair-ratio code touched; gap knob = 0 and only wired as the knob; no new feature. PASS.

## OWNER'S WORDS vs THE BUILD
- ~07:35Z: offset = target(identity) − her b, on the RESULT, clamp 0–10, her play still moves it ✔ (examples b 9 → 0/−1.5/−3, b 5 → +4/+2.5/+1 tested).
- ~07:55Z: every real play feeds b, per player per kind, in the save; never played = 7.5; Thử tay optional and seeds her b on her device only (mgCalOwner flag) ✔.
- ~08:00Z: each player by her own hand ✔. Gap share OPEN → knob 0 ✔.

## WORKER DESIGN CALLS — judged
1. age 1 (prior + seed age like the oldest plays): AGREE. The literal (3·7.5 + Σw·x)/(3 + Σw) with α .2 caps Σw at 5, so the prior keeps 3/8 of b for ever and a weak hand 5
   played as sở trường would sit ≈ 8, against her own example (b 5 → +4 → 9) and her "chơi càng lâu" words. age 0 restores the literal formula (one knob).
2. seed = cal.k b worth 5 plays, noSeed for the 5 broken-board kinds: AGREE ("first tries count as several plays"; broken boards NOT COUNTED per OD).
3. sở đoản list = cal-p2 §A2 analyst list in BAL.orig.doan: ACCEPT as data (no other list exists; test checks it never hits the road's own arts). MAIN may show it to her.
4. live board chip vs result: the board now ends on the identity-adjusted mark (mg-score-same's rule "board ends on the mark given" kept); the row explains it. AGREE.
5. NPC side = class shift on the bell hand, not a normalisation to the target: AGREE — OD ~07:35Z keeps the NPC bell curve unchanged; their bell draw is their "hand".

## NOTES (non-blocking, for the foreman / MAIN)
N1 jentry (entry exam) skip = round(kg82NpcMean(lv)), the old pre-mg2 formula, not mgSkipRaw — so it carries no identity shift. Pre-existing (it never matched her play),
   outside this brief; a one-line follow-up (use mgSkipRaw(t) like j82 / jexam) would make the whole skip group equal-value.
N2 gap knob formula uses (b − prior); the OPEN owner question speaks of "the gap between a player's b and the median" — revisit the reference when she answers.
N3 Worker report said the KIT REQUEST is "on this branch"; it is on the handover branch KIT_REQUESTS.md L69 (fine, just where to look).
