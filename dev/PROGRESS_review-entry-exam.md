# PROGRESS review/entry-exam — entry selection exam + origin intro + entry scene (Foreman D worker, opus)

Base: review/kc-roads-cn-nc (4e4cd846, home roads + the `kcEntryExam` hook) + review/mg-balance (96736fff, `mgTier`) merged; site rebuilt.
Report: dev/handover/reports/entry-exam.md (+ entry-intro.md) — also on the handover branch.

## Already-built check (LUẬT ƯU TIÊN SỐ 1)
- review/kc-roads-cn-nc: selection on every road already exists as ONE round of playArt + numbers (kc2Sel direct, kc2Exam home, kd "cho"
  co-op wait), cut [40,55] → ceiling / −1 / −2, with the hook `window.kcEntryExam` for this task. Reused, not rebuilt.
- jkc (main): the tiểu thư road's Sơ tuyển → Phúc tuyển (playArt occ tuyen) → Điện tuyển (own score + roll). Kept; only its game round
  now goes through the same exam frame and the no-word rule.
- review/mg-balance: `mgTier(kind,{occ:"tuyen"})` / `mgSet` / `mgDiffTxt` — used as is (no private difficulty).
- jexam (main): the promotion exam frame pattern (rows + "Bắt đầu thi" / "Để tài nghệ quyết định" = kg82NpcMean) — copied as a pattern
  with the same kit pieces (kg82Open, kitRows, kg82Btn).
- No entry animation existed (kc-roads question 3). KIT §65.2 kitPersonReveal is the existing "a person is presented" scene.

## What changed
- `dev/build/jentry.js` (new, after jkc2.js): entExam (the round), entScore/entTier/entOdds (ONE score rule), entFx (gain/loss of
  the result), Tiền truyện intro cards (ENT_INTRO, origin painting), entry scene (entReveal → kitPersonReveal, ENT_LINE), wrappers on
  kc2SelDo / kc2Enter (fx + no demotion scene at entry), nlAccept (intro), showModal ("Nhập cung" card → button → entry scene);
  kcBestArt / kcPhucPlay replaced (non-word art, same frame).
- `dev/build/jbal2.js`: `BAL.entry` (word list, noise, cut, stepSung, per-road weights, fx per tier).
- `dev/build/jkc2.js` (kc-roads file, small edits): kc2Play passes {art,title,note} to the hook; the "lễ nghi" quiz options (word game)
  replaced by a second non-word art (cnv Thêu, nc Đàn, bd Bắn cung, cn Pha trà = Điều hương); kc2Score / kc2SelDo / cho score call
  entScore; KC2CUT = BAL.entry.cut; stepSung from BAL; kc2SelOn: every origin meets the selection (ceiling Đáp ứng → gain/loss only).
- Tests: dev/test/entry-exam/direct.js. Measure: dev/measure/entry-bots.js (+ dev/measure/mg-bots.js marks).

## Resume notes
- New lives only (S.entV); old saves untouched.
- bd (Bắc Địch) data is in jkc2/jentry and wakes when review/origins-r1 merges.
- Open questions / requests: see the report (mg-balance "tuyen" tier word at art level 0; OD:L1288 vs the kc-roads co-op gate; KIT REQUEST entry animation).
