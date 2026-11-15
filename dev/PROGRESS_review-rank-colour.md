# PROGRESS review/rank-colour (worker, session 8)

Owner 15/11: "Phẩm bậc trong mấy ô chọn này chưa theo màu phẩm, màu phẩm xuất hiện mới nơi có tên và phẩm của người."
(ref dev/handover/refs/owner-rank-colour-picker.jpg on the docs branch: "Sai Ngọc Lan đi dò la" target rows had the rank in plain ink.)

## Done
- KIT 48.3 `kitRankPaint` (j79): one MutationObserver pass (same model as kitRelPaint §11.2) wraps every visible "title name" pair of a known
  person (`kpPeople()`) into the kitName block (`.kname > .kti` with `--rt` = kitRankTone). Covers picker rows of every act, cards, dialogs,
  lists, logs, toasts, popups, co-op — all builders that write plain words. Words unchanged (textContent equal). `kitRankNameH(p,title,name)`
  for new code. Opt-out `[data-norank]`. Cost measured: ~12 ms of painting per 6 s of idle play (377 calls).
- `kpPeopleIn` (Tuần lục / news rows): a title the text itself writes before the name now goes inside the name block in its tone.
- CSS (jk4 `#kit-rt`): `.kname .kti` = `var(--rt)` (plain, no glow); `.modal.night` lightened 55 %. j87 no longer forces the Tuần lục title
  to the name colour.
- KIT.md §48.3 (+ the 48.1 note on inline titles); kit page sample §48.3 (jkitpage).
- Scans: `dev/test/rank-colour-sites.py` (source sites: KIT / TEXT / SPLIT), `dev/test/rank-colour.js` (runtime: spy picker, every place ×
  person × picker act, every tab, synthetic log lines, 4 tuần of bot play; each visible pair OK/PLAIN), `dev/test/rank-colour.py` (before/after
  table). Results: dev/review/rank-colour.md.

## Notes / open
- Stranger rows in the spy picker ("Quý phi ở <cung> (chưa quen)") have a rank but no name: not painted (rule = rank WITH name).
- Found while scanning (not fixed here, other family): two global `function kitNames` (j59 court-officer naming, j65 log names); the later
  j65 one wins, so j59's `kitNames()` call in renderStage no longer names court officers.
