# wording-marks — HANDOVER from WORDING-GAIN worker (context ~50 %, rolled over before starting code)
Branch review/wording-marks = review/lc25-wg 539603bf (no code changed yet; only this file). Task = MAIN 164 order + owner OD 26/11 ~21:55Z (read the OD row verbatim): every CHOICE surface shows a stat change ONLY as marks «Danh +/++/+++» (loss «Bạc −/− −/− − −»); exact numbers ONLY in the result card + Sổ ghi; odds stay words; khắc time stays as is; no extra mechanics.

## What already exists (reuse, law 13 / Priority #1)
- BAL.mk (jbal.js): {lo:.25, hi:1.5, big:{hon,hoi,rel,uu,sung,dan,bac,suc,cc}, word:{nhe,vua,nang}} = marks bands of the hint row. Owner now wants ONE table named **BAL.mark.cut** («size of the change relative to each stat's scale», one formatter): fold/rename BAL.mk into it (canon overwrite, don't keep two), keep `big` per stat as the scale.
- `kitMk(sgn,p,lv)` + `KIT_HINT_MAG` (jk2b.js): mark count from an amount; `kMk(s)` (j19.js): reads «Danh −−» as «Danh −2» for colour/row rules (kcls j19, kaSent j63) — still needed.
- `wgDrop(text,w,l,c)` (j19.js, used in j67 / jkc3 / jreign): drops a static mark when the option's typed fx already names the stat — becomes redundant once typed fx prints as marks too (then a typed amount IS the mark; static marks of wx/lx can stay as the only source for untyped stats, but ONE size table).
- Scan + rules: `node dev/test/wording-gain-scan.js` (dev/test/wording-gain-rules.js) — extend with a NUMBER scan of choice surfaces (before/after table, law 11).

## Where numbers are printed on choices (my findings, verify with a live scan)
1. **`fmt(o)` — dev/build/j1.js:169** prints `{danh:8}` as «Danh +8» from every fx object (w / l / c); it is called by the option-line builders: j67.js (gain/lose lines ~132-139), jkc3.js (~110-112), jreign.js (rgLine ~199-201), j19/j25 kit rows (`kitParse`, `eff`), jroute/jstory/jtoil/jne etc. Plan: new `fmtMk(o)` (marks from BAL.mark.cut) used by CHOICE builders; `fmt` stays for result cards / Sổ ghi. Cleanest: a flag/ctx (choice vs result) read by one formatter so no builder is missed.
2. **Kit row model**: `kaRows(kaModelStr(line))` (j63.js) renders Được/Mất/Kèm/Tốn cells of act cards and option cards (`kitOptFinal`, jopic) — numbers arrive as text «Danh +8». Mark conversion can be applied once at the model (kaModelStr) for choice cards, with the result card (`kaResultRows`, `kaNT`) left numeric.
3. Surfaces named by MAIN: kitHand flip back, kit plaques (kitPick tags), act cards, dialog options, G4 dialog Tốn/Được/Mất cells, first card, mini-game entry, gifts. Coordinate kit-rendered parts with KK47 = session_01Rc5AsHmtzuWMnb27oL1LC5 (no private chips).
4. Tốn: Bạc / Sức costs also marks on choices («Bạc −», «Sức − −»); khắc stays «N khắc». Odds words unchanged (BAL.odds.cut ladder; I already made the Gợi ý chance word = the ladder word).
5. Exact numbers must still appear in the result card + Sổ ghi (kaResultRows, kaNT, resultShow) — check nothing there goes through the new choice formatter.

## Tests / checks to run (from my branch)
kit-e-rows 26, kit-cost-rows-home 15 PASS (they assert hint words; update to the new cut), kit-ton-row has 6 old LIVE fails, dialog-fixed «empty Tốn/Được cell» is LIVE-pre-existing, kit-gain-list-scan, wording-gain-scan (0 vague / 0 «,,» / không floor / chance 0). Look: Fold 755x1000 + iPad 1180x820 stills (before/after pair of the same option; I use /tmp scripts: boot like dev/test/opt-render.js, pushModal({showOut:true,opts:[{n,x:"Khá chắc · tốn: Bạc -10 · thành: Danh +8"}]}) for static rows, mkP("giu") for the hint card; upload with `python3 dev/site/cdn_sync.py img/_review/<topic>`).
## Gotchas learnt
- Container restarts wipe /home/user/wt and /tmp; re-create worktrees (fetch --depth=30 under flock). quickcheck.sh rewrites root index.html/sw.js/_aa.html in the worktree — `git checkout -- index.html sw.js; rm _aa.html` before committing. A test (hint-dedup) overwrites dev/review/hint-dedup.md — restore it.
- Force-push is blocked by the permission classifier; branch from the needed base instead of rewriting.
- Never rewrite the owner's «không» rows (scan asserts the không-text count ≥ LIVE).
