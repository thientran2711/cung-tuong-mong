# opt-card-short #8 (worker #4, ROOT-56 order) sha **4af2b824**, quickcheck PASS incl. core gates
PRIORITY #1 CHECK: OD 18/11 ~21:35Z | KIT 56.12/56.13 | main 0 | review/opt-card-short reused | claims this row.
Merged review/fullbody-frame-s4 @ 62730a26 (12px edge) + main. Per ROOT-55: the private sizing `kszFigFill` is REMOVED; the left column figure = the standard class body (KIT_SIZE.fig M3/L3/XL3 on the crowned Hoàng hậu, crown inside, tag on top). Kept: title band (--kat-h/--kbtop, centred), tier L 140, real-text samples, Law 10 strip/drop, scan lines FIG/TITLE/SCROLLBIG + `HH=1` (every subject = crowned Hoàng hậu).
Scan HH=1 (Fold 755x1000 / iPad 1180x820): band-centre -2 every card; TIERCHK bad 0; SCROLLBIG 0; tag top 0 px. FIG gap under the figure: iPad 0 px in 10/11 cases (dress 21); FOLD tall L/XL frames 248-266 px (mat, mat2, dress, choice, many, visit, short, thtrieu, fest) because the standard XL3 body (393) is shorter than the Fold tall frame (796 high) -> empty band under the figure. Fold M frames (two, night) 0.
DECISION FOR ROOT-56/owner: the standard body leaves ~250 px empty under the figure in the Fold tall frame. Options: (a) keep (standard first, frame stays screen-ratio by 16:05Z); (b) the Fold tall option frame uses a taller class / the frame height follows the standard figure (not screen ratio) — conflicts with 16:05Z; (c) variant f153b8da (private fill, rejected by ROOT-55). I did not choose.
Shots (looked mat2 Fold): CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/opt-card-short/{fold,ipad}-{mat2,dress,many,night,choice,short,thtrieu,fest}.jpg

# opt-card-short #7 (worker #4, ROOT-55 correction: OD ~21:35Z, standard = crowned Hoàng hậu) sha **f153b8da**, quickcheck PASS incl. core gates
PRIORITY #1 CHECK: OD 18/11 ~21:35Z | KIT 56.12 | main 0 | review/opt-card-short reused | claims this row.
Built strictly on the standard figure frame: merged review/fullbody-frame-s4 579fac03 (KIT_SIZE.fig XL3 393 measured on the crowned Hoàng hậu, BAL.bookFrame.cRef) + main. `kszFigFill` scales by the FRAME (body0 = KIT_SIZE.fig[lay].h, crown room 1+cRef), never by the person: every rank gets the same scale; the box may spread to 1.7 x the column (was 1.45; with the crowned Hoàng hậu 1.45 left 25 px on Fold).
Scan new switch `HH=1` (every subject = the crowned Hoàng hậu): 13 cases x Fold 755x1000 + iPad 1180x820: FIG tag top 0 px everywhere; gap under the figure -1..5 px in all Fold cases with Hoàng hậu (man = a eunuch figure 17 px, fest iPad 45 px = narrow event frame: not Hoàng hậu cases); band-centre -2 every card; TIERCHK bad 0/n; SCROLLBIG 0.
Shots (looked, crowned Hoàng hậu in every case): dev/handover/shots/opt-card-short/{fold,ipad}-{mat2,dress,many,night,choice,short,thtrieu,fest}.jpg (CDN write 403).

# opt-card-short #6 (worker #4, ROOT-55 order: owner OD 18/11 ~21:20Z) sha **93db9adb**, quickcheck PASS incl. core gates
PRIORITY #1 CHECK: OD 18/11 ~21:20Z (tail) | START_CORE law 10 | main 0 | review/opt-card-short reused | claims this row.
Kit (KIT.md §6.2e), whole group, every tier, Fold 755x1000 + iPad 1180x820:
1. Figure FILLS the left column: `kszFigFill` (jksize, after feet-fit) grows the body to the frame body height (tall Fold frames; wide iPad frames already fill). Column width unchanged so the option cards keep their width (widening the column to 50% squeezed the cards to 256 px and pushed 3-line titles = tier M lost; rejected). The figure box may spread to 1.45 x the column. Scan `FIG top/gap`: tag top 0 px everywhere; unfilled gap <= 1 px in 11 of 12 Fold cases; Fold dress 16 px (width cap), child exempt (age scale). iPad gap <= 6.
2. Tag at the TOP (`align-self:flex-start`), figure right under it.
3. Option cards: ONE title band per frame (`--kat-h` = tallest title+chip band), title centred in it, one text-block offset (`--kbtop`); done inside every tier fit (`band()` in kitOptTier). Scan `band-centre` = -2 in every card of every case (spread 0). Cost: tier L 128 -> 140 (equal bands make the longest card 138).
4. Samples use REAL event text (a real approach event's description + title) in the scan: choice/many/short/night/two/man/child.
5. Law 10 re-checked after the tier pick and 350 ms after the frame settles.
Shots (looked): dev/handover/shots/opt-card-short/{fold,ipad}-{mat2,dress,many,night,choice,short,thtrieu,child,fest}.jpg (CDN write 403).
Open: Fold figure cannot be taller than its box allows without a wider left column (geometry: 562 px frame); if the owner wants it bigger, a wider left column costs the card width.

# opt-card-short #5 (worker #4 continued, MAIN ROOT-54 FAIL fix) sha **ad86bcc0**, quickcheck PASS incl. core gates
PRIORITY #1 CHECK: START_CORE LAW 10 | main 0 | review/opt-card-short reused | claims this row.
1. LAW 10 (big scene picture only when content fits without scrolling): kit rule `kszEvLaw10` (jksize, after kszPicStep3): options list scrolls -> picture shrinks to the short strip (evMin 56); still scrolls -> picture dropped (`data-evfit` s / x). Whole group = every live option frame, every tier, Fold + iPad. Scan line SCROLLBIG (opt-card-scan.js): `scroll with big picture` = 0 in all 12 cases x Fold/iPad (iPad mat/mat2/visit/fest now fit=s, ev 56, all 3 options visible; before: ipad-mat2 280 px picture + «Kéo xuống»).
2. Strict tier height (was +1 px slack): dress Fold 105 vs 104 -> now tier L (128); TIERCHK bad 0/n everywhere.
3. Merged review/fullbody-frame-s4 af700c81 (new KIT_SIZE.fig crown sizes) and main; fold-mat2/dress empty band under options = XL tall frame by rule (16:05Z), kept.
Shots (re-shot, looked) dev/handover/shots/opt-card-short/{fold,ipad}-{mat2,dress,night,many,choice,short,thtrieu,info}.jpg (CDN write refused 403).

# opt-card-short #4 (worker #4, env with CDN read OK; CDN WRITE refused 403 -> shots in dev/handover/shots/opt-card-short/ on this branch)
PRIORITY #1 CHECK: OD 18/11 16:05Z/16:15Z/09:30Z(4) | main 0 | review/opt-card-short reused (ce8706b7 -> b800648e) | claims this row.
Branch **review/opt-card-short @ b800648e** (origin/main merged, real build with CDN index, quickcheck PASS incl. core gates; first G1 FAIL = 4 inline numbers in my kit sample page -> now BAL.kitpage.demo; one G4 FAIL was a transient CDN IncompleteRead, re-run PASS).
LOOKED (Fold 755x1000@2 + iPad 1180x820@2, real pictures): mat2, dress, night, many, choice, short, thtrieu (+ info/visit/mat in scan). Shots: dev/handover/shots/opt-card-short/{fold,ipad}-<case>.jpg
## Fault found by looking, fixed (kit, jksize kitFrameApplyLive3)
Tall phone frame (XL, Fold): the info column was capped to the FIGURE height measured before the frame grew (553 px) -> mat2 3rd card cut off with 300 px empty below. Now max-height = max(figure, grown k3body) -> all 3 cards visible (opts 396/396 px, no scroll). Same fix for dress.
## Scan (node dev/test/opt-card-scan.js, 12 cases x Fold/iPad)
TIERCHK bad 0/n everywhere; BANG: knbang x == kobang x in every dialog (Fold 639, iPad 1000/850/805). Tiers: Fold mostly 1M (104), 1L (128) for mat2/choice/dress-4/visit; iPad 1M, many+child = 2S (88, two columns). OVERFLOW 0.
## For the owner to judge (same open points) (a) tier L picture bigger than M; (b) Fold tall frames leave empty space under options on short dialogs (short, mat2) = literal reading of 16:05Z; (c) M needs 109 on choice -> L.
~90% xong / ~80% chơi được (awaiting owner look).

# HANDOVER #3 (worker opt-card-short #3, session on env Default = image CDN BLOCKED 403; code done, NOT looked with real pictures)
Branch **review/opt-card-short @ ce8706b7** (pushed; origin/main d3ea24e8 merged; index.html built by build_site.sh but assets.py could not read the CDN index -> assets.json untouched).
PRIORITY #1 CHECK: OD 18/11 16:05Z / 16:15Z / 09:30Z(4) | main 0 | review/opt-card-short r3 reused | claims this row.
## What changed (kit only; KIT.md §6.2b tweaks, §6.2c rewritten, new §6.2d; kit page samples §6.2c fixed, §6.2d added)
1. PHONE frame (owner 16:05Z): the aspect-ratio / tall cap / #mb fill rules now apply ONLY to `.dlg.kszlive[data-ksz=L|XL]` (jksize). S/M frames + plain modals natural again. Scan Fold 755x1000: dress/mat/mat2/many/visit/fest = 562x796 (XL), night/choice/two/man/child = 470x4xx (M), info/result = 380x3xx (plain).
2. TWO option layouts + ONE size per tier (16:05Z + 16:15Z): `KIT_OPT`/`kitOptTier(g)` in jopic (`KIT_SIZE.opt`), called from kszBtnGridLive3 and kitOptEqual (jk4). Picks per dialog the first fitting of [2 columns tier S] [1 column tier M] [1 column tier L] (fit = every card <= tier height and nothing cut sideways; ResizeObserver re-picks after late layout). Tiers: S 54x72/88, M 66x88/104, L 84x112/128 (CSS generated from KIT_OPT.tiers; one place to edit). Tallest-card height (kitOptEqual min-height) removed. Picture-less hide-out cards (Thái hậu triệu) now also take the tier height and show only Tốn/Được (hint/why rows folded).
3. "!" (09:30Z point 4): ONE colour (kobred removed); dialog "!" (`.knbang`) absolute top-right of the info at the same x as the card "!" (scan BANG col: knbang and kobang right edges equal, e.g. Fold 639/639, iPad 1000/1000); never its own row. The card "!" is always the card's own corner child.
## Scan (node dev/test/opt-card-scan.js, new columns TIERCHK = `<layout><tier> bad <cards whose rendered pic/height != tier>/<n>` and BANG)
Before (r3 6e5777ad): heights per dialog = tallest card (104..114/124 varied), thtrieu hide-out cards 96/113 with red/ink "!" in the title, dlgBox 562x796 for EVERY dialog on Fold.
After: all 12 cases + short on Fold and iPad TIERCHK bad 0/n (mat,mat2,dress,choice,many,visit,two,thtrieu,night,fest,man,child,short); tiers seen: Fold 1M (most), 1L (mat2, choice: a card needs 109-119 at M), iPad 1M, many = 2S (2 columns, 5 cards, 88 px each). Layout 2 never fits on Fold (cell ~146 px), fits on iPad for short text.
## NOT done / for the successor (needs the CDN env)
- Real build + LOOK: in this env CDN images 404/403, so shots show empty picture boxes (layout fine, pictures NOT seen). Run `bash dev/tools/quickcheck.sh` (FAILED here only because assets.py could not read the CDN index: "build failed", not a code failure; note quickcheck.sh needs bash, not sh), re-shoot Fold 755x1000@2 + iPad 1180x820@2 (dress, mat2, night, many, choice, short, thtrieu, info) with real pictures, LOOK 3x, upload to CDN img/_review/opt-card-short/ (wipe old set), then SẴN SÀNG to MAIN.
- Open points for the owner to judge on the real shots: (a) tier L (84x112) has a bigger picture than M, an assumption of mine (her S/M/L = KIT_SIZE.btn classes are squares, rejected by the 07:25Z "never square"); (b) in layout 2 the card "!" sit in two columns by construction; (c) M needs 109 on `choice`, so that dialog goes L (128): consider M=112.
- Scan quirk (old, not new): `fix MOVED[body]` on iPad dress/mat2/visit = page body scrolls in the scan, not the dialog.
- Worktree /home/user/wt/oc3 (sparse), server `python3 -m http.server 8817`, build helper: assemble.py + `_t.html` (see older STATE).

# HANDOVER (worker session_01UV1Szke4R4h6YSy7KRfqhR, account move 18/11 ~16:15Z; STOPPED on MAIN's order, nothing uncommitted)
Branch **review/opt-card-short @ 6e5777ad** (origin, main a2ce736a merged, quickcheck PASS). Worktree /home/user/wt/oc2 (sparse), server `python3 -m http.server 8817` at its root, build `python3 dev/build/assemble.py` + `_t.html` (see "STATE" in the older HANDOVER below); scan `node dev/test/opt-card-scan.js <url> <out> <tag> 755x1000,1180x820 none <cases>` (prints cols / cardW / OVERFLOW / dlgBox / vis labels / fixed-top).
## Owner orders received and status
1. 07:25Z verdict (one card size, Tốn+Được, "!" for the rest, dialog number lines behind "!", top fixed / only options scroll): DONE (r1/r2, KIT §6.2b).
2. MAIN r2 fixes (Được label, content centring, dress info behind "!"): DONE.
3. 09:20Z: (a) phone tall frame for EVERY centre dialog: DONE in r3 but now SUPERSEDED by 16:05Z; (b) iPad 2-column try: DONE (container query >= 560 px, no overflow) but SUPERSEDED by the 16:05Z two-layout rule; (c) choice-value rule audit: not this branch (Foreman D).
4. 09:30Z "!" kit (refs owner-1811-0930-bang-good-ipad.jpg / bang-bad-fold.jpg, OD line 1879): NOT DONE. Rule: "!" inline at the END of the line/header like the approved iPad mat2 shot, NEVER on its own row (Fold dress shot = the fault: `.knbang` float on its own line after kitNumBox); ONE colour (remove `.kobred`); all "!" in a dialog in one vertical column (card "!" and dialog "!"). Kit part, every "!" in the game; scan table before/after; include in shots.
5. 16:05Z owner correction (OD tail "18/11 ~16:05Z"): (1) phone: ONLY tall centre frames (KIT_SIZE L/XL) grow to the screen-ratio rectangle; S/M stay. Current r3 rule in jksize (`html.kv1 body #modal .dlg.dlg{aspect-ratio…;--kph…}`) hits ALL dialogs -> must be restricted to data-ksz L/XL (and plain non-live modals decided by size class). NOT DONE. (2) BUTTONS phone+iPad: the kit has TWO option layouts (long one-per-row = now, and a 2-column grid); each dialog picks the one that fits its buttons' text by RULE; order: frame size S/M/L/XL -> layout -> button size from the layout as a standard (her S/M/L = KIT_SIZE button classes), never per-frame sizes. The r3 iPad 2-col container-query rule (jopic) must become that rule (also on phone). NOT DONE. Deliver a table of every dialog: frame class / layout / button class.
6. 16:15Z button size rule: lay out every frame layout phone -> iPad, take the LARGEST button each tier needs, fix it as the ONE size of the tier (no 3 S / 3 M variants); add a scan: every button's rendered size == its tier size on BOTH Fold 755x1000 and iPad 1180x820; before/after table. NOT DONE (card min-height 104 + 66x88 picture is the current single size; tiers S/M/L not yet mapped to KIT_SIZE.v3.btn classes).
## Next steps (for the successor)
- Read OD tail 16:05Z / 16:15Z verbatim + OD line 1879 first. Revert the all-dialog aspect rule to L/XL only; implement the 2-layout rule (layout chosen from text length of the longest option: single column vs 2-column, container-query min 560 px or phone equivalent) keyed to KIT_SIZE button classes; unify "!" (inline end-of-line, one colour, aligned column; `kitNumBox` float -> inline at end of the first line; card `.kobang` stays top-right but same colour and same x); scan + tables; Fold + iPad shots together, LOOK 3x, CDN img/_review/opt-card-short/ (currently holds the r3 set fold-/ipad-{mat2,dress,night,visit,many}.jpg: wipe it with `python3 dev/site/cdn_sync.py --wipe-review opt-card-short` when replaced / after the verdict).
- Files: dev/build/jopic.js (kitOptFinal, kitOptInfo, kitNumBox, style "kit-opt-final"/"kit-num-bang", 2-col), jksize.js (frame rule, tall rule near ".k3right"), jk4.js (kitOptEqual), jwkr/jtds/j83/jts (kitNumBox users), KIT.md §6.2b/§6.2c, dev/test/opt-card-scan.js + opt-card-bang.js.

# opt-card-short #2 — ROUND 3 (owner OD L1877: tall phone dialog + iPad 2 columns) sha **6e5777ad** (main a2ce736a merged, quickcheck PASS)
PRIORITY #1 CHECK: OD L1877 | main none | review/* this branch | claims this row. (refs images owner-1811-0920-*.jpg are not on the handover branch; worked from the verbatim text.)
1. PHONE (kv1): ONE kit rule for the whole `#modal .dlg` group (jksize, KIT §6.2c): aspect-ratio = KIT_FRAME.page (590/852 = the screen shape) + tall cap `--kph = 100*kvh - 24px`; #mb / .k3body fill the grown height. Scan, Fold 755x1000: all 12 dialog cases + plain info/result modals = 562x796 (before 562x574 / 427 / 389). Risk for owner: a dialog with little content (info, night) is now a tall frame with empty space under the options/figure (literal reading of her drawing).
2. iPAD (kv2): when the right column is >= 560 px (container query) and a dialog has 2+ option cards -> TWO columns (card 298 px, text column ~190 px). Worst case checked at 1180x820 + 1366x1024: 12 cases incl. `many` (5 long titles) and dress (longest Được text): OVERFLOW 0 (no element leaves its card), titles/Được chips wrap, nothing cut; heights equal per dialog (104-114 px). Narrow frames (fest at 4 em title case, person columns) keep ONE column automatically.
3. NOT done here (other owner point of the same line): CHOICE VALUE RULE audit (night "Từ chối khéo": Tốn Bạc -10, Được không) = Foreman D balance task, not this branch.
Shots (Fold 755x1000 + iPad 1180x820 together, LOOKED): CDN img/_review/opt-card-short/{fold,ipad}-{mat2,dress,night,visit,many}.jpg (old set wiped).

# opt-card-short #2 — ROUND 2 (MAIN ROOT-49 fixes) sha **173f5888** (quickcheck PASS)
1. Row labels: the Được slot is ALWAYS labelled "Được" (rolled Thành row included); Cần/Bại/Kèm/Ghi chú never show as rows (disabled card: its "!" is RED). Scan of visible row labels per card, BEFORE (origin/main) vs NOW, 12 cases x Fold/iPad:
| case | BEFORE visible labels | NOW |
|---|---|---|
| mat / mat2 | Ghi chú · Tốn/Được/Ghi chú | Tốn/Được |
| dress | Cần/Thành(/Bại/Kèm) · Được | Tốn/Được |
| choice, visit, thtrieu, fest | Gợi ý · Tốn/Gợi ý | Tốn/Được |
| two, night, man, child | Được · Tốn/Mất | Tốn/Được |
| many | Tốn only | Tốn/Được |
All 24 case-sizes now show exactly Tốn + Được on every card (scan column `vis`).
2. Empty band: cards are content-centred (picture + text vertically centred), min 104 px, tighter title; one height = tallest card of that dialog (mat2 Fold 124 -> 114; most dialogs 104). A band remains only where a sibling card has a 3-line title (equal height rule).
3. Dress dialog: Xa xỉ range + Lưu ý + Son phấn hint all behind the dialog "!" (key rows Bốn chỗ / Ta có stay) -> both cards fully visible on Fold (shot fold-dress).
Shots re-shot + LOOKED (Fold + iPad x mat2/dress/night/visit), CDN img/_review/opt-card-short/{fold,ipad}-<case>.jpg (old set wiped).

# opt-card-short #2 — FINAL BUILD of the owner's 18/11 ~07:25Z verdict (worker session_01UV1Szke4R4h6YSy7KRfqhR, depth n/a)
PRIORITY #1 CHECK: OD 3 (07:25Z verdict) | main none (old tall/square rule jk4 kitOptFit0 replaced) | review/* opt-card-short only | claims this row.
Branch review/opt-card-short sha **5a21d8ef** on origin (main merged: 9c581406). quickcheck PASS on a4cf19e7 (core gates, time-spill, open, old save, perf); the last commit only touches jts.js + rebuilt site.
## What changed (KIT §6.2b rewritten in KIT.md, canon overwrite)
1. Dialog option card = ONE form everywhere: picture 66x88 (3:4 rectangle), min 106 px, all cards of a dialog the SAME height (`kitOptEqual`, jk4); no picture-less card (§59 placeholder via `kitOptUnify`); odds chip under the title.
2. Rows = Tốn + Được only. No cost / gain -> grey "Tốn: không" / "Được: không". Mất folds into Tốn, extra Được rows into Được (copies .kdup); Thành row = Được slot on rolled cards. Cần/Bại/Kèm/Ghi chú/lead -> "!" on the card (`kitOptInfo`, overlay #kpinfo, tap never chooses). Disabled card keeps its red Cần row (decision, say if you disagree).
3. Dialog number lines behind a "!" in the info corner: `kitNumBox` (jopic) used by the 3 material dialogs (jwkr, jtds, j83) + the dress dialog "Xa xỉ" range (jts). Key sentences stay.
4. Frame rule (jksize): `.k3right` clip, `.opts` is the only scroller; narrow stack: #mb clip, `.k3body` fixed, `.opts` scrolls. Wide + narrow tested.
5. Removed: KIT_OPT_VAR / kitOptVarSet / kitOptShortTier / kitOptFit0 early-exit; rules `min-height:calc(--kah+18)`; dev/test/kit-fit.js (asserted the old square/tall rule). Person-card act rows `.pc>.pcr` untouched (still kitOptFill) — decision for MAIN: follow later if the owner wants.
6. Tests: `dev/test/opt-card-scan.js` (heights/pic/title em/visible rows/fixed-top scroll test), `dev/test/opt-card-bang.js` ("!" card + dialog open the overlay, nothing chosen). Sample page KIT_SAMPLES §6.2 / §6.2b updated.
## Scan table (12 dialog cases, Fold 755x1000 / iPad 1180x820; before = BASE in the previous report)
| | BASE | NOW |
|---|---|---|
| cards of one dialog same height | no (mat2 Fold 205 strip, dress 162/72, night 55/90) | YES all 12 cases both sizes (106 px; 107-128 when a card has 3 title lines, equal inside the dialog) |
| picture | 54x72 .. 66x187 / NONE | 66x88 on every card |
| title width | down to 8.1 em | >= 12.8 em |
| top fixed while options scroll | no (whole right column scrolled) | yes, 24/24 cases (412x1058, 390x844 narrow also fixed on many/visit/fest). Note: fest/child at 755 report a ~px kpmain shift that is the frame's own late re-fit after image load (no scroll involved) |
## Shots (LOOKED at each): CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/opt-card-short/ fold-<mat2|dress|night|visit>.jpg (755x1000@2) and ipad-<...>.jpg (1180x820@2). Old v0/vA/vB/vC wiped.
Known/limits: card height differs between dialogs only when a title wraps to 3 lines (equal inside each dialog); dress dialog on Fold leaves ~1.5 cards visible because its info block is tall (options scroll).
~85% xong / ~70% chơi được (awaiting owner look).

---
(previous options report kept below)
# opt-card-short — OPTIONS report (worker session_01UV1Szk6j15PHjAL8gMSR9z, for MAIN s42)
PRIORITY #1 CHECK: OD 30 (18/11 ~08:55Z + ~09:02Z) | main jopic.js kpOptArt / jk4 kitOptFill+kitCompactCSS | review/* none | claims none besides this row.
Branch review/opt-card-short sha 68d460fd (review switch only; NO final rule yet — waiting for the owner's pick). START_CTX ≈ 12 % (estimate).

## Root causes (STEP 0)
1. Person dialogs (kdper/figure column): `kitOptFill` makes the picture fill the card height (width 54..84, height = text height) ⇒ a card with long text gives a 66x170..187 STRIP (owner shot: 1:3). Other dialogs use 54x72.
2. Rows: Tốn / Được / Ghi chú each wrap; the Ghi chú tier note is a 3–5 line sentence.
3. Mixed forms: an option with no own picture (confirm/"Đã hiểu…", night "Thôi"-like) gets NO picture slot (kpanel-compact rule "no placeholder on a menu/confirm option") ⇒ different frame next to picture cards (dress: 162 px picture card + 72 px picture-less card; night: 55 vs 90).
4. Title squeezed: the odds chip sits in the title row (`.kat` flex nowrap, chip flex:none) ⇒ title 8 em wide, one word per line (dress option 1, 590 px design = Fold host).

## Scan table (card height px, "design" widths: Fold host = 590x820 portrait page, iPad 1180x820) — BASE
| dialog | Fold 590 cards | pic | iPad 1180 cards | pic | mixed form? |
|---|---|---|---|---|---|
| mat2 (VIỆC material) | 205/205/205 | 66x187 STRIP | 92 | 56x74 | no |
| dress (Hội phối đồ: báo đề) | 162/72 | 66x144 / NONE | 111/111/55 | 70x93 / NONE | YES (both) |
| night | 55/90 | NONE / 54x72 | 55/90 | NONE / 54x72 | YES |
| visit | 90 | 54x72 | 92 | 56x74 | no |
| many (5 opts) | 90 | 54x72 | 90 | 54x72 | no |
| fest | 91 | 55x73 | 91 | 55x73 | no |
| choice/two/man/child/thtrieu | 90–91 | 54x72 | 90–91 | 54x72 | no |
Tallest 205 (Fold), avg of all cards ≈ 100. Mixed-form dialogs: 2 of 12 scanned (dress, night), each is a card without picture. Narrow titles (< 8 em): dress opt 1 = 8.1 em.
Scan script: `node dev/test/opt-card-scan.js <url> <outdir> <tag> 590x820,1180x820 <none|A|B|C> <shot cases>` (measures card height, picture, title width in em, row line counts).

## Options (all three: ONE form for every option of a dialog; picture-less options get the §59 placeholder; odds chip under the title, title full width)
- A = picture fixed 54x72 (3:4, never stretched, top-left), rows unchanged. The text does NOT run under the picture: the kit rows are one grid (§51), so run-under would need per-row hacks; card height = max(picture, text).
- B = A + Tốn and "trả khi làm xong" on one line; Được chips run inline joined by "·"; the tier note → "5 phần: Khá · 8 phần: Tinh xảo" (full sentence kept as tooltip title; the "Tuyệt phẩm cần vật liệu quý" tail is dropped, it is already in the dialog text).
- C = B + picture a 40x40 square at title height, rows run full width under it (smallest card).
Card heights, Fold 590 / iPad 1180 (cards of one dialog):
| dialog | BASE Fold | A | B | C | BASE iPad | A | B | C |
|---|---|---|---|---|---|---|---|---|
| mat2 | 205/205/205 | 101/157/157 | 90/138/138 | 73/108/124 | 92x3 | 157x3 | 138x3 | 108x3 |
| dress | 162/72 | 148/90 | 127/90 | 126/90 | 111/111/55 | 148/148 | 127/127 | 161/161/90 |
| night | 55/90 | 90/90 | 90/90 | 73/91 | 55/90 | 90/90 | 90/90 | 73/91 |
| visit | 90x3 | 101/99/115 | 115/99/99 | 115/132/115 | 92x2 | 167/167/99 | 166/166/115 | 115/82 |
| many x5 | 90 | 90 | 90 | 73 | 90 | 90 | 90 | 73 |
| fest | 91x3 | 101/101/99 | 100/100/90 | 99/99/82 | 91x3 | 101/101/99 | 100/100/99 | 99/99/82 |
Honest read: A mostly does NOT shorten on iPad (the 2-column iPad cards had a 74 px picture already; A's 54 px picture is not the limit, the text is). A/B fix the Fold strip (205 → 101..157 / 90..138) and the mixed forms. C is the shortest everywhere (mat2 Fold 205 → 73..124) but its picture is only 40 px. Cards inside one dialog are NOT equal height in A/B/C (rows differ); the old person-dialog "all cards one size" rule (OD 17/11 ~05:00Z) is dropped under these options — owner to confirm.
Note: my material test dialog (wkrMat) has a shorter text than the owner's Tứ đức one (jtds, "trả khi làm xong" inside Tốn); B's merge of that note is coded (kitOptCompactRows) but visible in the shots only for the tier line.

## Shots (LOOKED at: mat2/dress A,B,C Fold + dress C iPad; others by measurement) — CDN img/_review/opt-card-short/
Naming `<v0-base|vA|vB|vC>-<mat2|dress|night>-<590x820|1180x820>.jpg`, e.g. https://ctm-img.victoria-tntt.workers.dev/img/_review/opt-card-short/vC-mat2-590x820.jpg · .../vB-dress-590x820.jpg · .../v0-base-dress-590x820.jpg
(590x820 = the Fold host's design page, shot at DSF 2; the game inside the host is scaled ×1.28 to the 755 screen.)

## Not done (waiting for the owner's pick): final single rule in KIT §6.2, removing the review switch (kitOptVarSet / KIT_OPT_VAR, kitOptFit0 early-exit), person-card act rows (.pc>.pcr) which use the same kitCompactCSS but are not dialog options, tests, whole-group scan after/before.
~35% xong / ~0% chơi được (review switch only, not in main).

---
# HANDOVER (worker session_01UV1Szk6j15PHjAL8gMSR9z → successor; written 18/11 07:20Z; context 31 % of 1M at this point = rollover trigger; coordinator opens the successor)
## OWNER VERDICT (OD 18/11 ~07:25Z, line ~1866 of dev/OWNER_DECISIONS.md; READ IT VERBATIM) — build exactly this
1. EVERY dialog layout: portrait/figure at top + info frame stay FIXED; only the option list scrolls (kit part, whole group; today the right column text scrolls with the options, see shots).
2. ALL option cards of ALL dialogs = ONE identical height: B form (3:4 rectangle picture) with ONLY Tốn + Được rows. An option without cost/gain shows "Tốn: không" / "Được: không" in GREY (wording per VANPHONG) so every card matches. The option's Ghi chú (and Cần/Thành/Bại/Kèm info) moves behind a "!" button on the card (tap → note / full info; the tap must NOT choose the option — see existing capture handler for `.kaart[data-kzoom]` in jopic.js and kitActInfoMark/kitActZoom in jk4.js for the pattern).
3. Dialog top info: number lines (Phẩm = phần chơi 0–10…, chips Thường dưới 6 / Khá 6 / Tinh xảo 10 / Tuyệt phẩm 15) go behind a "!" in the corner; KEEP the key sentences ("Chỉ vật liệu quý mới thành Tuyệt phẩm", "Vật liệu tốt, quý còn làm quà giá trị hơn…"). The owner's line continues after that (vết trà … = a different task, ignore here unless MAIN says otherwise).
4. KIT FIRST: KIT.md §6.2 final rule + kit page (jopic.js KIT_SAMPLES §6.2); delete the KIT_OPT_VAR / kitOptVarSet / kov review switch and the kitOptFit0 early-exit in jk4.js; whole-group scan before/after (dev/test/opt-card-scan.js already measures card height/pic/title em; extend: assert equal heights per dialog, no picture-less card, title ≥ 8 em, only Tốn+Được visible); tests; person-card act rows (.pc>.pcr) use the same kitCompactCSS — decide with MAIN whether they follow.
5. SHOTS for the owner: ALWAYS both sizes in ONE set: Fold 755x1000@2 AND iPad 1180x820@2 (cases mat2, dress, night, visit), LOOK at them 3× zoom, upload img/_review/opt-card-short/ (wipe the old v0/vA/vB/vC shots first: `python3 dev/site/cdn_sync.py --wipe-review opt-card-short`), then message ROOT-48 (session_01UV1SzkTtEb7xpekDEbE6UH, or whoever MAIN is then) "SẴN SÀNG XEM opt-card-short <sha>".
## STATE
- Branch review/opt-card-short @68d460fd on origin (base origin/main 62a6846f): jk4.js (kitOptFit0 early-exit under window.KIT_OPT_VAR) + jopic.js (end of the style block before the "kit sample page" comment: kitOptShortTier, kitOptCompactRows, kitOptUnify, kitOptVarSet, kpOptArt placeholder via b.__koph) + dev/test/opt-card-scan.js. The unify idea (picture-less option gets the §59 placeholder when a sibling has a picture, title `.kat` wraps so the odds chip goes under the title) WORKS and is part of the final rule; make it unconditional, not behind KIT_OPT_VAR.
- Worktree /home/user/wt/oc (sparse), static server `python3 -m http.server 8817` at its root, build: `python3 dev/build/assemble.py && { printf '<!doctype html><meta charset=utf-8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover">'; cat dev/index.html; } > _t.html`; scan: `NODE_PATH=$(npm root -g) node dev/test/opt-card-scan.js http://localhost:8817/_t.html <out> <tag> 755x1000,1180x820 none <shotcases>` (direct mode; use 755x1000 for Fold as MAIN requires; a full 12-case run is ~4 min per variant: use ONLY=mat2,dress,night,visit). The scan hides the chest overlay (kitReward stub) and scrolls `.opts` into view before the shot.
- Pitfalls found: html-class variant switches get wiped by the game, use a <style> element; final CSS must beat `html body button.ka.kart.kopt{min-height:calc(var(--kah)+18px)}` (jopic) and jk4 kitOptFill (person dialogs; remove/neutralise it: card height must be fixed, not text-driven); kb rows are one grid (§51), Ghi chú row is `.kr-note`, Tốn `.kr-ton`, Được `.kr-duoc` (kaBody in j63.js builds them; cards of rolled acts use Thành/Bại rows — map them to Được/Tốn for the compact card or keep them behind "!"; decide + document); wkrMat dialogs are in jwkr.js:94 and jtds.js (Tứ đức, has "trả khi làm xong" inside Tốn); dress dialog = jts.js tsDressAnnounce (call it directly in the scan).
- The dialog top-info "!" (item 3) lives in the dialog body (`h:` HTML of wkrMat/jtds, wkThTxt() chips): do it in the kit part that renders the chips (grep kitWkBanner / wkThTxt / "Thường dưới") not per dialog.
- Handover branch gets force-updated by MAIN: always `git fetch` then `git reset --hard origin/...` before adding the report; never rebase my commits over it.
