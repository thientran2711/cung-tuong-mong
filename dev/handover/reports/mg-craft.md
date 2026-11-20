# mg-craft LEAD report (session_01N1tNP6sTSG3yuHdpDD59P6, branch review/mg-craft)
START_CTX ~6 % (get_session reads 0; own estimate, 1M window) → rollover at ~31 %, ceiling 60 %. depth 1.
PRIORITY #1 CHECK ('mg-craft|Thêu lướt|Cắm hoa|Khéo tay|craft'): OD 20/11 ~08:15Z (craft kinds → own mechanic), ~05:10Z (no text in play) | main jmgt.js mgLev/mgMore/mgTol/mgPace, j91.js re-wire block, jbal2 BAL.mgTier.lev | review/mg-craft-design 54ad4544 (MG_CRAFTS.md) | claims: this job (CLAIMS row mg-craft lead).

## SCAFFOLD READY 01114e27
Base origin/main 70bea3d3. What VE + HOA merge (`git merge origin/review/mg-craft`):
- `dev/build/j91.js` — **KG82_CRAFT** table (end of the re-wire block) = THE one place mapping kind → engine + rules text: theu→`stitch`, kim→`papercut`, ve→`inkwash`, hoa→`ikebana`; t / how (kgReady text, refine your own kind's line there), demo (KG82_DEMO move picture), mgl (lesson label).
- `dev/build/jcraft.js` — shared parts: `crReg(kind, eng, fn)` registers your engine and switches the kind (until then the kind keeps its old engine, so main never breaks); `crOn(kind)`; `crLev(env,kind,name)` (= mgLev, throws if the BAL knob is missing: ONE CORE); `crArt(g,name,x,y,w,h,o,stand)` painted sprite when delivered (CR_HAVE) else your canvas stand-in + the name listed in CTM_MISSING_PICS (kitPhNote "mg") — this is the «tạm» marker (a word «tạm» on the board would break OD ~05:10Z no text in play); `crLoop(fn)` frame loop on `crNow()` (tests run boards faster with CRAFT.speed); `crLater(f,ms)`; `crHud(env,pts,r,NR,left)`; `crMix`, `crRGB`, `crTmp`.
- `dev/build/jcraft_ve.js`, `jcraft_hoa.js` — placeholder files already in `assemble.py` order (after jmgt.js): put your engine there, end with `crReg("ve","inkwash",fn)` / `crReg("hoa","ikebana",fn)`.
- `dev/build/jbal2.js` — `BAL.mgTier.lev.theu|ve|hoa` + kim knobs (design §1–4 shapes, [ease 0, ease 5]); add/tune ONLY inside your own kind's block. peek "∞" = a finite ms longer than the round.
- `dev/test/mg-craft.js` — per kind on its craft engine: every caller (playArt / startContest / mgCalRun / exRun / kcEntryExam / lesson / works) opens the new engine, no text in play + in «Hướng dẫn», ghost hand, S untouched, bot raw float 0..10, skilled bot ≥ 9 at ease 5 and lower at ease 0, random bot well below, ✕ stops, old save. Add your kind's own checks in `KIND_CASES`. Run: `python3 dev/build/assemble.py && node dev/test/mg-craft.js dev/index.html 755x1000 --kinds=ve`.
- Engine contract: `KG82.peek()` must return the NEXT right move (tap {x,y} only while tapping now is right / {drag:[[x,y],…]} / {sel}) — it is the bot oracle and the guided round's hand.

## STEP 1–3 DONE for Thêu + Khéo tay — review/mg-craft 993b8929 (base origin/main 70bea3d3; VE / HOA not merged yet)
- **Thêu** `theu` → engine `stitch` (dev/build/jcraft_theu.js), design §1: hoop + shade bands (dark rim → light heart), corner sample (cloth after lev.peek), spool row (right shades + lev.alike half-step decoys); per band tap the right spool, then lev.st stitches on the needle's beat (±win = 1, ±near·win = 0.6, else loose 0 + re-stitch). 3 pieces mai 3 / mẫu đơn 4 / phượng 5 bands (+mgMore). Score 10/3·(wC·colour + wS·stitch)·mgPace. KG82.peek (spool / timed dip, `at` = ms until, jslap convention) + KG82.hint (guided hand on the beat).
- **Khéo tay** `kim` → engine `papercut` (dev/build/jcraft_kim.js), design §4: unfolded sample (gold outline = the wedge's panel; cloth after lev.peek) + folded red wedge; drag cutters (moon/tri/drop + lev.alike half-moon/diamond) onto the wedge, drag a cut off to take it back, ✓ sign unfolds with mirrored panels; matched holes glow, missed holes dashed. Sheets 2 · folds/2 · folds. Score 10/3·max(0,(matched − lev.extra·extra)/needed)·mgPace.
- No words in play (signs ★ ✗ ✓ only). Kit parts only (kitGameFrame/.kgbox canvas, k91Btns sign, kg82Pop/FxRing/FxPop + BAL.mgFx, kgReady + KG82_DEMO tap/drag, kgTut, kitQuick). KIT REQUEST: none. Two-way: NPC rivals unchanged (mgNpcRaw, same kind/board ease).
- Stand-in art = canvas + dashed hairline; names listed in CTM_MISSING_PICS (kitPhNote "mg") = the «tạm» marker (a word on the board breaks OD ~05:10Z). **ART REQUEST (Foreman C via MAIN):** theu-hoop, theu-spool (neutral, thread tinted at runtime, or 8 shades × 3 hues), theu-needle, theu motifs mai / mẫu đơn / phượng (outline + band layers); kim-wedge (red paper texture), kim-cut-moon / tri / drop / half / dia (cutter icons), scissors. Delivered names go into jcraft.js CR_HAVE.

STEP 2 caller scan (git grep KG82_ENG / engine names in dev/build, dev/test, dev/measure):
| engine | callers before | after |
|---|---|---|
| pattern kg82Pattern (j82) | KG82_KIND base rows ve/hoa/theu/kim (ve/hoa/kim already re-wired by j91; theu live) | theu → stitch; no caller → REMOVED (base rows name the live engines) |
| untangle k91Untangle (j91) | kim only | kim → papercut; no caller → REMOVED |
| trace k91Trace (j91) | ve (until VE lands), jwkg kinh + may | KEPT (Chép kinh, May áo) |
| arrange k91Arrange (j91) | hoa (until HOA lands), jwkr.js:75 bhoa works wrapper | KEPT — HOA decides |
Test refs updated: dev/test/mgeasy-scan.py.

STEP 3 measure (dev/measure/mg-bots.js skilled n=30/cell, graded mg-grade.py; Dễ hoc/0/2 · Vừa hoc/4/2 · Khó hoc/6/1; random hoc/4/2 n=15):
| kind | board | Dễ XS / Giỏi+ / mean | Vừa XS / Giỏi+ / mean | Khó XS / Giỏi+ / mean | random mean |
|---|---|---|---|---|---|
| theu | BEFORE pattern | 27% / 57% / 7.2 | 23% / 60% / 7.2 | 27% / 43% / 6.7 | – |
| theu | AFTER stitch | 63% / 100% / 8.6 | 20% / 93% / 7.7 | 0% / 63% / 6.8 | 0.0 |
| kim | BEFORE untangle | 97% / 100% / 9.0 | 57% / 100% / 8.6 | 7% / 100% / 7.7 | – |
| kim | AFTER papercut | 90% / 93% / 8.7 | 83% / 90% / 8.5 | 30% / 60% / 6.8 | 0.0 |
Tuned in BAL only (lev.theu win/lim/fast, lev.kim holes/place/extra); kG/kAdj/cal.k unchanged; law 5 holds. mg-bots.js family fix: the timed-tap branch freed the bot only once (jslap = 1 tap); now after every tap.

TESTS (993b8929 build, Fold 755x1000): dev/test/mg-craft.js PASS 24/24 · mg-ready-guide PASS 9/9 (31 kinds × callers) · mg-noword-a all ok · one-core-guard PASS.
SHOTS (Fold 755x1000@2 + iPad 1180x820@2; rules · guided · play · result; looked at): https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-craft/m-theu-fold.webp · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-craft/m-theu-ipad.webp · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-craft/m-kim-fold.webp · https://ctm-img.victoria-tntt.workers.dev/img/_review/mg-craft/m-kim-ipad.webp (+16 singles <kind>-<fold|ipad>-<1rules|2guide|3play|4result>.webp). Wipe after verdict: python3 dev/site/cdn_sync.py --wipe-review mg-craft.

## HANDOVER — lead rolls over on context (START_CTX ~6 % → ~31 %); Foreman B opens the successor lead
Remaining = STEP 4 INTEGRATE only:
1. Worktree /home/user/wt/craft (review/mg-craft, sparse) or fresh from origin/review/mg-craft; merge newest origin/main first.
2. VE (session_01N1tNP2gpsC12ARDUqUciDw, review/mg-craft-ve fe07f2e4) has NOT merged the scaffold: engine `k91Ve` registered its own way → must move to jcraft_ve.js + crReg("ve","inkwash",fn) + KG82_CRAFT.ve text. HOA (session_01N1tNP5RwFKrATahSHTu5r6, review/mg-craft-hoa 25bab229) merged the scaffold, wired via crReg.
3. On both SẴN SÀNG: merge into review/mg-craft; python3 dev/build/assemble.py; node dev/test/mg-craft.js dev/index.html 755x1000 --runs=2 (4 kinds) + mg-ready-guide + mg-noword-a + mg-visual + one-core-guard + co-op lane (coop-thin f6b suite); mg-bots ve + hoa before (main build ready in /home/user/wt/craft-main) / after, same table; shots: node dev/test/mg-craft-shots.js <dir outside repo> → webp → img/_review/mg-craft/ → cdn_sync.
4. Report SẴN SÀNG KIỂM <sha> here + CLAIMS row + send_message Foreman B.
Lesson: on the shallow handover worktree never `git rebase` onto a new fetch (add/add conflicts everywhere) — `git fetch --depth=5` + `reset --hard FETCH_HEAD` and re-apply the small edit.
