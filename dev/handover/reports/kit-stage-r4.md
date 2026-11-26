# KIT-STAGE-R4 report (MAIN 162 → 163) — Bàn bài kitHand + thẻ gỗ kitPick, part of the ONE new animation kit set (NOT for landing alone)

depth 2 · START_CTX ~5 % · branch `review/kit-stage-r4` a72290a9 (on review/kit-stage-r3 ea4547f9). Set lands only as ONE with ring / motion under the kit keeper (OD 26/11 ~19:00Z).

PRIORITY #1 CHECK ('popw|pcard|kmslot|Theo|krail|kitHand outside'): kit-stage-r3 report + kk44.md §1/§2 old-left rows | review/kit-stage-r3 ea4547f9 (base) | jfocus fillPick = the kitPick wiring pattern reused | jdf dfIsAct = the one «is an act» rule reused | claims: KK44→KK45 kit, RING-BUILD-3 ring, MOTION-BUILD-2 vòng bảo vật. No new kit part: kitPick + kitFocus.btn plaque reused.

## What changed (review/kit-stage-r4)
1. **KIT §98.20 person-card acts = thẻ gỗ** (`dev/build/jkpcard.js`, new, in assemble after jkpick). Every person card `.pc` with act buttons hangs them as kitPick plaques on a signpost right of the portrait, in a host block where the rows were (scrolls with the card; jk2b caps cards with `--kpcmax`). Card tabs stay its tabs (a tab swaps the plaques; info panes like «Điều ngài thích» stay readable). The hidden card buttons are the act path (✓ = real click). Covers KK44 §2 rows: j6 `#popw` popCard (stage pop-up person card, incl. home servants jhouse talkOpts serv), j15 pcard acts of the Hậu cung tab cards (empCard/thCard/rvCard/kidCard/manCard/staff cards — one card per pane). Robots (`__bot`) keep rows like dfViewOn; `__kpcard=1` forces plaques.
2. **KIT §98.21 entry-line buttons = thẻ gỗ on the stage** (`jkpcard.js entry`). FOUND: the `#sc-t` buttons (j21 goSee «… vừa rời đi [Theo đến]», visit line / place text buttons) were hidden with `#sc-t` (jplst makes the line a toast) → the follow choice was NEVER on screen (LIVE bug, Fold + iPad). Now a plaque under the place name; ✓ = real click → the follow path runs («Chọn người theo hầu» opens).
3. KIT.md §98.20 / §98.21 written; KIT_REQUESTS.md «kitHand outside #modal» (8 rows) filed to the kit keeper.
4. `dev/test/kit-stage-r4-video.js` — videos start AFTER full load with every boot notice closed (watch ~7 s, close what opens, wait for images), recording cut there (ffmpeg -ss), real taps, ≤ 30 s.

## old left (KK44 table) after r4 — honest
Thẻ gỗ (§2, 9): DONE 8 = talk answers, place card, Dư đồ focus acts, NPC choices (r2/r3) + popCard #popw, jhouse servants, Hậu cung pcard acts, «Theo» entry line (r4). jrail `#krail` chips: NOT the kind (navigation shortcuts: head count, lists — no choice is made) → stays rail; MAIN to confirm. **Thẻ gỗ old left = 0** (jrail closed as not-related) — pending MAIN ok on jrail.
Card hand (§1, 11 open after r3): ruling (c) info panels stay kit info panels → closed (1). Ruling (a) >10 → ≤7 per hand + ‹ › paging: NOT BUILT (next). Ruling (b) long names → people ring / places+things thẻ gỗ list: NOT BUILT (next). 8 outside-#modal rows: KIT REQUEST to the kit keeper (part needed first, law 9). **Card hand old left = 10** (2 to build here + 8 waiting on the kit part).

## Videos (looked at every frame myself: first frame = loaded game, no boot notice; Fold + iPad)
https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-stage-r4/fold-banbai.mp4 · ipad-banbai.mp4 — rg c1b Bàn bài: deal, lift, ✕, lift another, ✓ → chosen.
https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-stage-r4/fold-pcard.mp4 · ipad-pcard.mp4 — stage person card (Mộc Cận) acts as plaques: lift, ✕, lift «Trò chuyện», ✓ → talk runs («đã nói chuyện»); then Hậu cung › Hoàng thượng card plaques (locked ones grey with «!»), lift, ✕, lift «Dâng quà».
https://ctm-img.victoria-tntt.workers.dev/img/_review/kit-stage-r4/fold-theo.mp4 · ipad-theo.mp4 — «Lữ Mạn Nhu vừa rời đi» → «Theo đến · 2 khắc» plaque, lift, ✓ → «Chọn người theo hầu».
Stills: fold-pcard-still.png, ipad-theo-still.png (same folder). 0 page errors in all 6 runs.
Known look notes: the Theo plaque has an empty picture slot (no act art for «Theo đến»); on a crowded stage it laps her body below the shoulders (kitPick lap rule, never the face).

## Tests
kit-stage-r4-video.js all steps true on both devices, 0 page errors (boot «closed», chose / done / follow true). Not re-run this session: kit-kind-scan, kit-stage.js, kit-hand.js (r3 results stand; jkpcard touches no #modal frame).

## HANDOVER (rollover at START_CTX+25 %; successor continues on review/kit-stage-r4)
Next, in order: (1) ruling (a): jkhand.js — `kitHandOn` refuses > KIT_HAND.max (10); add pages: > max → show ≤7 cards (`KIT_HAND.page=7`), hide the rest (class), ‹ › buttons + «1/3» in the kit tab style beside the hand, same card size (layout fn ~line 36–51 lays out only the shown cards), ✓ path unchanged; (2) ruling (b): `kitHandLongOff` (jkhand.js:60) keeps a list today → set the frame kind: every option a person → kind "ring" (RING-BUILD-3 hooks kitKind==="ring"), else → thẻ gỗ list (reuse jkstage kstgPickPlace pattern: plaques on a signpost, ✓ = the card's own button); (3) wire the 8 outside-#modal rows when the kit keeper says KIT READY «kitHand.mount»; (4) re-run kit-kind-scan + kit-stage + kit-hand + this video script (ONLY=…), send sha to the kit keeper and MAIN.
Worktree: repo root /home/user/cung-tuong-mong on review/kit-stage-r4 (fresh container: re-clone sparse); scratch probes not kept.
