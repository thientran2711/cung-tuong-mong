# review-stage-here — BIG review of review/stage-here r4 (ONE NOTICE SYSTEM) — MAIN ROOT-60
PRIORITY #1 CHECK ('kitNotice stage-here'): OD 0 | ledger 0 | claims 0 | main 0 | review/* stage-here 8e29c099 | claims MAIN ROOT-60 worker session_01Rc5AsL5rJqVVXyTRsQXXPL (as pasted by ROOT-60). Reviewer session_01Rc5AsLiu1sZg8YMpZm9pwC, START_CTX ~5 %.
Reviewed: origin/review/stage-here @ 8e29c099 → reviewer branch **review/stage-here-r4rev**, head **73790cb7** (main bb8e8ec9 is an ancestor → FF from current main).

## Verdict: PASS (with 2 reviewer fixes) — LAND READY 73790cb7

## Commits on review/stage-here-r4rev
- a6079368 merge origin/main 9a1d6922 (assemble.py list: + jagacts4, keeps jstagehere + jnotice); rebuilt.
- b24e7c79 FIX 1 (jnotice): a «Tin báo» panel that holds an action (Tai mắt «Để ta xem») had NO way to close — kit panels with options carry no ✕ (jksize), Esc/backdrop do nothing → the only exit sent her to Dư đồ. Added the kit secondary option «Để sau» (KIT 32.9 KIT_BACK word, already used in jdh/jil/jpet/j70): closes, marks read. Verified Fold + iPad (panel closes, tab unchanged, unread 0).
- f9d2ce47 FIX 2 (j9 nextBuoi visit refresh, pre-existing main bug, in scope of OD 18/11 ~19:45Z «stage = where she is; room only at a new day or when she walks home»): the refresh sets S.place="home" then goTo(k), and core goTo (j2:123) returns when ANY card is queued → whenever the buổi turn queues a card (rivalsBuoi: e.g. «Có người bán tin»), she silently lands at home, from an OPEN place too. Repro (card injected at buổi turn, Ngự hoa viên open): main → place home; fixed → stays Ngự hoa viên, card kept. The refresh now holds Q aside for that one goTo and puts it back first. This is what turned stage-stay «free» red after the main merge (main's new role-parity events fire under the test's forced Math.random=0).
- 2dd9cb23 merge origin/main d2da651b (assemble.py: + jnroadhp.js); rebuilt.
- 73790cb7 merge origin/main bb8e8ec9 (fullbody-frame-s4, jksize/jkit kit edits); rebuilt; stage-here Fold/iPad 0/114, stage-stay 0 faults, panel shots re-looked.

## Checks (brief items)
1. ONE NOTICE SYSTEM — notice-scan.py on the final tree: 0 bottom pill / 0 #ktbtoast / 0 rail «!» / 0 floating flip note; kitLine 9, kitLineToast 1, srvToast 4, Tai mắt 1, closing 1 → all kitNotice; exempt only #rtoast act card (jksize 17:25Z), kitTip, co-op clock. Own grep for other toasts/auto-removed status lines: only kflockwhy (tap-on-locked-button reason next to the button, 1.9 s — a tap tooltip, not a game notice) and stat fly-ups/fx (not notices). New main files jagacts4/jnroadhp: no toasts. stage-here.js Fold 0/114, iPad 0/114 (box in top bar, chip top only, float-toast 0). Own shots: chip in the top bar both devices (iPad empty middle, Fold over the mood track), box lit; chip tap → small «Tin báo» panel = place painting + full text + ✕; box tap → list of unread.
2. KIT FIRST: box = §77 krailb + §78 .khap, chip = .ktbt, panel = kitPanel kind notice + kitArtFrame slot; KIT §42.2 rewritten in place, kit page sample present. Only a small `#kntbox/#kntchip` placement block (size/position/blink of kit parts) — no new look. PASS.
3. Stage = current place on every tab (stage-here imgOk all rows; iPad shots show Ngự hoa viên / Đức Thọ cung on Hành sự and Giao tình). Plus FIX 2 above.
4. Main's decisions respected: #rtoast act card kept; Fold chip over the mood track inside the bar (5 s, abuts «Bình thản», hides no word); tinbao-ui-r7r not ported (box/chip replace it); closing picture = place painting.
5. VANPHONG: closing text «… Ở lại = như lẻn vào: Khá chắc.» (odds word, no %); «Để sau» existing word. PASS.
6. Regressions: stage-rightcol bad 0 (Fold + iPad); stage-stay Fold/iPad 0 faults (after FIX 2); relpick-group 755x1000 + 1180x820 errs 0, cardFits; ag-taimat 25/25, ag-know 25/25; old save ok (stage-here, quickcheck). errand-scene tests live on unlanded review/errand-scene → not applicable to this tree.
QUICKCHECK on 73790cb7: PASS (core gates PASS, old save ok). Perf on 73790cb7 (median of 3, new/live): render 250/230 ms, tab 426/412 ms, buổi 1307/1384 ms; an earlier 5-run median on 2dd9cb23: render 213/198, tab 334/368, buổi 990/1009 → ≈ live.

## Laws touched
4 ONE CORE (BAL.entryToastMs, BAL.noticeMax) ok · 7 wording ok · 9 KIT FIRST ok · 11 whole group (scan table) ok · 12 two devices ok · 16 #rtoast untouched ok · 6(b)/(c) n/a.

## FOR MAIN (notes, not blocking)
- The box list panel («Tin báo», several notices) shows the kit narrator figure (Quản sự ma ma, jksize narrator.notice="kn") and the big layout when a row has an action; a single notice is the small picture+text panel the owner described. Kit behaviour, not this branch.
- «Để sau» draws as the kit's tall option card with an auto picture next to the plain «Để ta xem» row (kit option-row look inside kitPanel v3; KIT 32.9 says compact). Kit keeper item if the owner dislikes it.
- In the box list, «Để ta xem» belongs to the Tai mắt row only but sits under the whole list.
Shots: scratch only (not uploaded); worker's CDN shots img/_review/stage-here/ r3-*/r4-* → wipe on landing: `python3 dev/site/cdn_sync.py --wipe-review stage-here`.
