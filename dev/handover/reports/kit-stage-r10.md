# kit-stage-r10 (successor of R9; MAIN LOOK FAIL on 203c178e, one item)

KIT CHECK: reuses kitOptFinal (jopic) rows, kaRows/kaBody (j63 §224), kitHand big card (jkhand §101.10), kitHandRows, KIT_HAND.big; no new kit part, no private chip/row.
START_CTX ≈ 12 % of the window; this report written at ≈ 40 % (no rollover needed).
PRIORITY #1 CHECK: OD 27/11 ~04:33Z/~04:39Z, ~04:36Z | main 4cd3f974 | review/kit-stage-r9 203c178e + review/kk54-rv166b f04b1201 (merged) | claims R9 → R10.

## Fault and root
Enlarged Bàn bài card, Được row read «Thái hậu: thiện cảm +, Sủng +; hỏng thì Thái hậu: thiện cảm −−, …» (loss in green).
Root = `kitOptFinal` (jopic.js ~l.316): an option with only a hint (`hint` = «gain; ODDS; hỏng thì loss») builds Được from the hint and split only at «nhưng», so the whole «hỏng thì …» clause stayed in the green Được chip.
Fix at the root: split the hint at «; hỏng thì …» too — gain part = green Được, «hỏng thì …» = red chip in its OWN Mất row (same as the act cards). Second root found while looking: the copied Mất row (`kr-mat2 kdup`) got `display:inline` from the `.kdup` rule on the enlarged card and broke the one-value-column grid (values invisible); now a grid row (`display:contents`), chips inline (jkhand.js).

## Whole family (law 11) — scan `dev/test/kit-hand-split.js` (every RGBT beat × every option card, seeded)
| | gain rows with «hỏng thì» | cards scanned |
|---|---|---|
| before (R9 203c178e) | 8 (c1a, c1b ×2, c3b ×3, c4a ×2) | 33 |
| after (R10) | 0 | 33 |
Other hands (Hành sự / Khuê các / Tài nghệ / empty acts) take their rows from kaRows, where Được/Mất are already split (verified by kit-hand-rows); the act cards unchanged.

## Merge
review/kk54-rv166b f04b1201 merged into R10 (j74.js conflict: both the KK42 `__kpMenuS` and the kptitle `__kmOver` lines kept; index.html / sw.js rebuilt).

## Tests (index.html at HEAD)
kit-hand PASS · kit-hand-mount PASS · kit-hand-rows PASS · kit-stage PASS · kit-pick 755x1000 + 1180x820 ALL PASS · kit_dupes OK · kit-hand-split 0/33.
kit-std-scan: NOT RUN — dev/test/kit-std-scan.js is not on any fetchable branch (origin/review/kit-std-audit does not exist); REPORT_ONLY so not blocking.

## LOOK media (CDN, https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-stage-r10/)
{fold,ipad}-banbai.mp4 (Fold 755x1000 touch, iPad 1180x820 mouse, real taps, cut after full load) + {fold,ipad}-banbai-0{2,3,4}.png. Shot -03 on both = the card «Thưa rằng thần thiếp…»: Được green «Thái hậu: thiện cảm +, Sủng +», Mất red «hỏng thì Thái hậu: thiện cảm −−, Thái hậu nghe ra ý khác». Both looked at.

## Left
RV-166 session_01Rc5AsHmVSRQfKM9T3eHcAb after MAIN LOOK. Kit keeper KK56 session_01Rc5AsJ6UhcqbDDXVR7k7Bq: Mất chip of a hint-only card keeps the words «hỏng thì …» (hint text); if the owner wants the label «Bại» on rolled cards instead, that is a kit-keeper wording call.
~100% xong (this item) / ~ playable: Bàn bài card reads right.

## UPDATE 05:5xZ (OD 27/11 ~05:27Z, owner approved 05:29Z «Ok làm vậy đi»; MAIN 171/172)
- Labels: a card WITH odds reads «Thành:» (green) then its own line «Bại:» (red); a SURE card «Được:» / «Mất:» (kaRows words, as the act cards). The «hỏng thì …» words are cut from the value (the label says it): never inside a row. jopic kitOptFinal (gain slot kr-thanh + «Thành», loss row kr-bai + «Bại» when the card has .kodds); jkhand: hint row hide, label colour, empty-row cleanup know kr-thanh / kr-bai.
- Scan kit-hand-split.js now also fails an odds card labelled Được/Mất and a sure card labelled Thành/Bại: 0 / 33 cards.
- KIT-STD-AUDIT §3 items (kit-std-scan review/kit-std-audit a2934493, SUBS=0 REPORT_ONLY=1): scene hand 5 → 0 findings; tabs: X08 «Tốn … line-clamp cut / Bạc 10 outside card» (Hành sự fold+iPad, Tài nghệ iPad) gone. Cause: kitHandTonL guessed the Tốn lines from text length, capped at 2, while every stat item is one unbreakable unit; now simulated (units wrap whole) with a measured +1 line (max 4) when still cut. The enlarged-card Được squeezed to 25 px = the display:inline on `.kdup` rows (fixed above, display:contents).
- Not mine, still open in the same scan (tabs): court X08 ellipsis «Trong cung: Chương 1…», X09/X12 on div.pcb (Hậu cung person cards) — KK56 / MAIN.
- Media re-recorded with the new labels: same CDN folder (…/kit-stage-r10/), both devices looked at (-03 = Thành green / Bại red own lines).

## UPDATE 06:3xZ (MAIN 172 REC APPLIED, owner 06:12Z Hành sự videos)
- PANE hands (.khost: Hành sự / Khuê các / Tài nghệ): the hand NEVER shrinks while a card is enlarged (was → 40 % on iPad); the enlarged card (wide tier) sits over the LOWER part of the pane, every tile stays in place. EVENT hands (modal) keep the old rule (card above the row; a hand filling its frame shrinks) — kit-hand test unchanged.
- Fold (law 10 frame → layout → size): a mounted hand uses its pane: more rows, tiles up to 1.5 × the frame-hand width, the largest that fits the cap (13 tiles now 3 rows × ~5 big tiles, no empty half panel). Code: jkhand kitHandLay + kitHandBigPlace.
- Media: …/kit-stage-r10/hanhsu-{fold,ipad}.mp4 + hanhsu-{fold,ipad}-{tiles,enlarged}.png (looked at). iPad shows 12 of 13 tiles without scrolling (panel scrolls for the 13th) — unchanged behaviour.
- Tests PASS after: kit-hand, kit-hand-mount, kit-hand-rows, kit-stage, kit-pick, kit_dupes, kit-hand-split.
- STILL OPEN: odds badge on the picture (owner 06:10Z) — waiting for KK56's kit part.

## HANDOVER (R10 rolling over at ~25 % context; START_CTX ≈ 2 %; MAIN CHÍNH 173 opens the successor)
State: review/kit-stage-r10 77807710 pushed (clean tree). 352a5310 (Thành/Bại + Tốn fix) got MAIN LOOK PASS, held from RV-166 (a new sha follows). 77807710 = pane hands never shrink / Fold pane hand fills its room — OWNER REJECTED THAT DIRECTION at 06:30Z (see below), so jkhand kitHandBigPlace / kitHandLay pane-hand changes are to be REPLACED by the straight-rows design, not extended.
QUEUE, in the owner's order (read the OD rows verbatim on the handover branch: 27/11 ~06:10Z, ~06:30Z, ~06:33Z + refs dev/handover/refs/owner-2711-0610-odds-on-picture.jpg, owner-2711-0630-hanhsu-*.jpg, owner-2711-0633-tainghe-cells.png):
1. FIRST (~06:33Z, owner angry): Tài nghệ tabs = ONE square kit cell per subject only (picture + name + bậc), law-10 columns (Tứ đức 5 → 2 cols 3+2; Cầm kỳ thi họa 4 → 2×2; Vũ·Y·Nữ công 4 → 2×2); no long cards with Học / Các lỗi rows; tap a cell → ONE kit frame for that subject (bậc/progress, what it gives, Tự học / Học với thầy / Các lỗi / sách phổ with Tốn/Được rows). Files: Tài nghệ is jkhrows.js row «skill-cells» (.kskacts / .kpanec button.ka) + the skill panel code (grep kskacts, kpanec).
2. Hành sự / Khuê các decks / Việc groups / empty-tab acts (~06:30Z): STRAIGHT card-size rectangular buttons in aligned rows (no tilt / fan / deal-in; card motion is for events only); tap = select + highlight, its INFO card in a fixed area BELOW the rows (Tốn · odds · Thành/Bại or Được/Mất · Cần), tiles never shrink or move; ✓ on the info card = act AT ONCE, no second «VIỆC» scene; same-act variants merge; real Nhẹ·Vừa·Nặng tiers = ≤3 tier buttons inside the info card; iPad = same layout as phone (law 10 picks columns). Bàn bài hand stays for EVENTS. This replaces kitHandRows' use of kitHand.mount (jkhrows.js).
   Coordinate: DOOR-ONETAP session_01Rc5AsMW6M9P8GqgmY6EbSe — review/door-onetap e408ab1d (in RV-163F: every Hành sự deck door → ONE or TIER) + review/door-onetap-hs 54259828: `ONE.deckTiers(button[data-ddoor])` → [{t:"nhẹ|vừa|nặng", n, x, off:{why}|null, go()}] or null (ONE/KEEP door: tap runs). They draw nothing; the tier buttons inside the info card are MY (kit) part.
3. Odds badge (~06:10Z): KK56 part is ON ORIGIN: review/kk56-std2 d3e2fd71 (jopic §93.8, KIT.md §93.8): `kitOddsBadge(card)` / `kitOddsBadgeOn(pictureEl, word)` / `kitOddsBadgeHTML(word)`; a MutationObserver already badges every button.ka with .kaart + .kodds. Merge it; delete the Tốn-row odds markup in the enlarged card (jkhand kitHandBigBuild moves .kodds into the Tốn row: remove that); don't style .kodb (tell KK56 if the corner/size is wrong on the hand). Both for the event Bàn bài cards (big + small) and the new Hành sự cards.
4. Then new mp4 Fold 755x1000 + iPad 1180x820 (REAL taps; kit-stage-r10-video.js has the flows banbai + hanhsu; add tainghe) → CDN img/_review/kit-stage-r10/ → MAIN LOOK 173 → RV-166 session_01Rc5AsHmVSRQfKM9T3eHcAb (a NEW sha; tell RV-166 the earlier ones are void).
Tools in the tree: dev/test/kit-hand-split.js (family scan: «hỏng thì» / labels), dev/test/kit-stage-r10-video.js, kit-std-scan (git show origin/review/kit-std-audit:dev/test/kit-std-scan.js; ONLY=hand|tabs SUBS=0 REPORT_ONLY=1). Open scan findings not mine: court X08 «Trong cung: Chương 1…», pcb X09/X12 (Hậu cung person cards).
Pitfalls found: (a) the copied Mất row (.kdup) must stay display:contents on the enlarged card; (b) kitOptFinal (jopic) labels: odds card → Thành/Bại, sure → Được/Mất; (c) build = bash dev/site/build_site.sh (rebuilds index.html + sw.js; merge conflicts there: resolve source, rebuild); (d) CDN upload: python3 dev/site/cdn_sync.py img/_review/kit-stage-r10/<files> (~75 s).

## HANDOVER AMENDMENT (owner 06:42Z CANON OVERWRITE, via MAIN 172) — SUPERSEDES the queue above
Card hand + card animation ONLY in EVENT pop-up frames. The big TABS (Hành sự, Khuê các, Việc groups, Tài nghệ, empty-tab acts) go BACK to the old LIVE act-card grid (full info visible, ONE tap chooses). DROP kitHandRows from the branch entirely (jkhrows.js, its assemble.py entry, kit-hand-rows test, jkhand's pane-hand code = 77807710 + the kitHandRows parts from R8) — it never lands. The 06:30Z straight-rows rework order is VOID (no ONE.deckTiers wiring needed from R10).
KEEP: Bàn bài / event hand with ✓ tick, Thành/Bại · Được/Mất rows (352a5310), odds badge on the card picture (KK56 kitOddsBadge, review/kk56-std2 d3e2fd71).
STILL DO (06:33Z): Tài nghệ = one square cell per subject (Tứ đức 5 → 2 cols 3+2; 4 → 2×2), tap → ONE subject frame with the study ways — now on the OLD grid base, not kitHand.
Then mp4/stills Fold+iPad (event hand + Tài nghệ cells + Hành sự tab = old grid) → MAIN 173.
Start point suggestion: branch from 352a5310 (before 77807710) and re-apply only the handover commit; the Tốn-clamp part of kitHandTonL (352a5310) stays for the event hand.
