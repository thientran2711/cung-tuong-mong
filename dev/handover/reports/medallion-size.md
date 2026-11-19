# medallion-size — STOP at COLLISION CHECK (no code written, nothing pushed on review/medallion-size)
Worker session_01Rc5AsMVX8FxdFVTmmDezsu for C-AG #22 / MAIN. START_CTX ~3 %.
PRIORITY #1 CHECK ('medallion|speaker face|seal-lean-3'): OD 0 | ledger 0 | main: dev/build/jfigseal.js (kitFigSeal, KIT_FIGSEAL) + jemoseal.js (kitEmoSeal lean) | review/* = review/seal-lean-3 bb59cda9 | claims: this row.

## Finding: the "medallion" IS the element seal-lean-3 changes
- The round face in the event dialog (pgin / rcpacc, see Fold + iPad) is `img.kemo.kfseal` = the figure-head mood seal (KIT 28.8d / 38.4). The kit part that draws it: jfigseal.js (still size) + jemoseal.js (lean-in).
- Its STILL size is small: `KIT_FIGSEAL {k:.105,min:22,max:50}` → measured 30 px and 50-51 px on 1366x1024 pgin (main edb2e724). A 50 px chip cannot cover the title/figure.
- The "very large over figure/title" can only be the LEAN-IN clone (main: `KIT_EMOSEAL.lean.scale 2.2-2.4`, `minFrac .2` of the short screen side, scope `lean.panel` includes `.dlg`) → >=200 px on iPad.
- review/seal-lean-3 (bb59cda9) rewrites exactly that: big size = the person's HEAD on the stage (`kesHead`, never bigger), pops out in .5 s, in an event dialog (`lean.open .ksz3`) leans ONCE per dialog open; KIT 38.4 text rewritten (owner 19/11 ~06:55Z + ~07:25Z).
- So a medallion-size fix in the kit would edit the SAME lines (jemoseal lean size / jfigseal) as seal-lean-3 → per brief: STOP, no parallel fix, no conflict.

## Not verified (honest)
My probe on main did not catch the big clone in 35 s (the clone is not a `.kemo` img; random lean 4-8 s) — conclusion rests on the code (lean.scale/minFrac) + the 50 px cap on the still seal, not on a shot of the big clone. The before shots of the still state (Fold/iPad) are in scratch only (/home/user/wt/medallion-size-shots), not uploaded.

## Proposal (for C-AG / MAIN to decide)
1. Ship/land review/seal-lean-3 (waiting owner OK); it should close the report.
2. After it is on main, re-run the whole-group scan (every PEND dialog showing the seal, Fold 755x1000 / iPad 1180x820 / 1366x1024: seal px at lean peak, overlaps figure y/n, overlaps title y/n) on that build; if any overlap remains I fix it in jemoseal `kesHead` frame on top of seal-lean-3. I need the owner's OK / a go from C-AG before I touch it.
Nothing was committed to review/medallion-size (branch exists only locally at edb2e724).

~0% xong / chờ quyết định.
