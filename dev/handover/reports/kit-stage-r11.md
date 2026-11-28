# kit-stage-r11 (successor of R10; owner OD 27/11 ~06:10Z, ~06:33Z, ~06:42Z)

PRIORITY #1 CHECK: OD 25/11 MAIN 125 item (1) «one tile per môn» + 27/11 ~06:33Z / ~06:42Z | main none (jtabs ktArtHTML long cards) | review/kit-tntile a31d69bc (KK24 §21e, never landed; idea + jksize rule ported, base 24/11 too old to merge) | claims R10 → R11.
KIT CHECK: reuses kitSkillCard, kitSceneArt, kitSteps, kitModal (info), pbtn act cards (kaRows Tốn/Được, Thành/Bại), kitOddsBadge (KK56 §93.8), kitHand (event hands only); new kit part §21e kitSkillCell registered in KIT.md; checklist: dev/kit/KIT_CHECKLIST.md.
START_CTX ≈ 3 % of the window (depth 4).

Branch review/kit-stage-r11, from 352a5310 (R10 MAIN LOOK PASS; 77807710 pane-hand commit NOT taken).

## 1. kitHandRows dropped (owner 06:42Z canon overwrite)
jkhrows.js, its assemble.py entry, dev/test/kit-hand-rows.js and KIT §101.14 deleted (KIT §101.10 «one source» sentence rewritten in place). Tabs (Hành sự, Khuê các, Việc groups, empty-tab acts) are the old LIVE act-card grid again: full info on every card, one tap. kitHand.mount (§101.13, KK51) stays a kit part (kit page/test only).

## 2. Tài nghệ cells (owner 06:33Z) — KIT §21e kitSkillCell
- Every sub-tab = ONLY square cells (môn painting + name + bậc word + kitSteps), 2 columns, one cell side (--ktnc, ktTnFit) = largest square letting the tallest of Tứ đức / Cầm kỳ thi họa / Vũ · Y · Nữ công fit without scroll (today 4 môn each → 2×2; Fold 317 px, iPad 243 px). Tác phẩm: same cells, 8, scrolls.
- Tap → ktTnPop = ONE kitModal: full skill card (bậc, Tiến bộ, «Bậc n mở …») + every way as its own act card with Tốn / Được: Tự học · Học với thầy (ma ma) · Học với Thái hậu · Các lối, sách phổ · Phát bạc. iPad: XL list frame, 2 act columns, no scroll (jksize kszListWantsWide3).
- Act tap inside the frame: the frame closes first, then the act replays (every lesson gates on Q.length — before, a tap did nothing).
- «Bảng tài nghệ hậu cung» (jpma) → «ⓘ Bảng tài nghệ» link in the sub-tab head (was a loose row).
- Root fix, whole family (law 11): kitSkillArt read only img/INFO.json, which never lists art-*/vir-*, so every skill card in the game showed the generic «học tập» book; now uses assets.json (kitAssetHas) / CDN index (KIT_CDNHAVE). Lookup key built in parts (build cdn() rewrites literal image paths).
- Calls made (told MAIN, veto-able): Tứ đức has 4 môn in the game → 2×2 (5 would be 3+2 automatically); inside the frame the ways are NOT folded into the 26/11 jactj4 «Học» door (ktArtSkills.raw), since the 06:33Z words name them in the frame and a door = a second tap.

## 3. Event hand + odds badge
KK56 review/kk56-std2 d3e2fd71 merged (kitOddsBadge). Enlarged card: Tốn-row odds markup removed (jkhand kitHandBigBuild + CSS); the small card's .kodb is copied onto the big picture (.khbp position:relative). Thành/Bại · Được/Mất rows (352a5310) unchanged.
Open for KK56: the badge word is cut on the small hand cards («Có c…», «Khó lư…») — reported with stills.

## 4. Media (CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-stage-r11/, real taps, Fold 755x1000 touch + iPad 1180x820 mouse, all looked at)
tainghe-{fold,ipad}.mp4 + -01 Tứ đức cells, -02 Hạnh frame, -03 Cầm kỳ thi họa cells, -04 Cầm frame;
banbai-{fold,ipad}.mp4 + -02/-03 (enlarged card with badge on picture, Thành/Bại rows);
hanhsu-{fold,ipad}.mp4 + -01 (old grid, 13 cards, badge on pictures) -04 (tap «Nghỉ ngơi» → the 3-tier door frame, now a hand: DOOR-ONETAP's area).
Script: dev/test/kit-stage-r11-video.js (flows banbai, hanhsu, tainghe, pcard, theo).

## 4b. LOOK 1 → 2 fixes (MAIN 173 / owner 07:03Z, 07:10Z, 07:12Z)
- Cells: no rank word; «Bậc n/5» dots + «Tiến độ» bar with points. Frame: title = the group, the môn name once (card's «ⓘ name»), no rank subtitle, bar label «Tiến độ». Cell sub-tabs carry no count (was doable/total acts: «Tứ đức 5/5» over 4 cells).
- Odds badge ONLY on event lá-bài cards: interim first line of kitOddsBadge `if(!b.closest(".khand"))return null` (jopic) until KK56's opt-in sha; every other card (Hành sự grid, môn frame «Phát bạc») shows the LIVE odds row. KK56 40193130 (#modal/.khand/.kmov) NOT merged (too wide).
- Tab doors are not events: DOOR.card marks its Q item `tabdoor`; kitHandWants refuses a frame whose Q[0] is `tabdoor` or a person door (`pid "door"`) → «Nghỉ ngơi» from Hành sự opens the LIVE frame again (side by side LIVE 98c77517 vs R11: hanhsu-04-live-vs-r11-{fold,ipad}.png, identical layout). Other tab frames that call pushDil directly were not enumerated (143 call sites) — any found that turns into a hand = same one-line flag.
- kit-hand-split scan: a hand card's odds may live in the badge (.kodb).

## 5. Tests (index.html at the final sha)
kit-hand PASS · kit-stage PASS · kit-hand-mount PASS (Fold+iPad) · kit-hand-split 0/33 · kit_dupes OK · tainghe-info ALL PASS (cell → frame → ⓘ name rule popup, Fold+iPad, every môn) · kit-pick 755x1000 + 1180x820 ALL PASS.
kit-std-scan: not completed this round (stopped to rebuild; REPORT_ONLY, not blocking).

## 4c. Round 3 (MAIN 173 ~07:21Z owner 07:20Z; KK56 ~07:26Z)
- Môn frame act cards: ONE width and ONE height (the tallest) in every row (`.ktn-pop .kskacts` grid-auto-rows 1fr, card stretches), Fold 1 column + iPad 2 columns. KK56 will put the same rule in the kit grid part for the whole game; merge it when it comes and drop this frame rule if it duplicates.
- Odds badge = KK56 OPT-IN (review/kk56-badge 1e34cbd4): its jopic §93.8 block taken by hand (the sha sits on the LIVE bundle lc28-b1 → 10 conflicts on a full merge); the d3e2fd71 observer + kitOptFinal call removed; my interim .khand line removed; jkhand kitHand() calls kitOddsBadgeHand(g) on every dealt EVENT hand; the enlarged card copies the small card's .kodb. dev/test/badge-scope.js added (KK56). KIT.md §93.8 text: KK56 registers it on landing.

## HANDOVER (R11, context ≈ 33 %, START_CTX ≈ 3 %, depth 4; MAIN CHÍNH 174 session_01Rc5AsLqin2smJhu7cyswBu opens R12)
State: review/kit-stage-r11 pushed (see last commit); clean tree. MAIN LOOK PASS on Tài nghệ cells + frame (LOOK 1/2); LOOK 3 (hanhsu-04 LIVE vs R11, tab door = LIVE frame) and the equal-card frame fix sent to MAIN 174, waiting for its LOOK. Then the brief to RV-168 session_01Rc5AsMxwdYsrc1aLWggfJw (all R10 shas void; start with «KIT CHECK: reuses …» + link dev/kit/KIT_CHECKLIST.md).
Open: (1) KK56 kit-grid equal-card part → merge. (2) kit-std-scan not run to the end this round (REPORT_ONLY). (3) other tab frames that call pushDil directly (143 sites) not enumerated for the hand gate (jkhand kitHandWants: tabdoor / pid door). (4) KK56 registers §21e + §93.8 in KIT.md when landing.
Tools: dev/test/kit-stage-r11-video.js (ONLY=tainghe,banbai,hanhsu; works on LIVE html too), tainghe-info.js (cell → frame), kit-hand-split.js, badge-scope.js. Build: bash dev/site/build_site.sh then `git checkout assets.json`. CDN: python3 dev/site/cdn_sync.py img/_review/kit-stage-r11.
