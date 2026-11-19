# nude-fix F4 — Nữ đế stiff-tube robe fix (child of Foreman C ROOT-39), 19/11 ~03:20Z
PRIORITY #1 CHECK: nude-mass-N6c.md + N6b | START_CORE/WORKER/ART | FIGURE_GATE A0 + REFERENCES + OWNER VERDICT 19/11 ~03:05Z item (5) | build.py --state nude.
Order: FIGURE_GATE verdict (5) "nữ đế ... bộ trang phục nó lại thuần luộc, đi xuống dưới chân" → find the wording that makes the robe stiff, replace it with approved HH prompt B / Nữ đế A wording (copied), test c17 a18 + a51 (max 4 gens), no mass.

## (a) STORED PROMPTS DIFF
Sources: Nữ đế A approved = c06 A gOmJm9zSXO (creations_get, stored prompt); c17 a18 N6c = u5WKRCGQLD (creations_get, = ledger); approved HH prompt B = dev/art/t8-prompt-B/golden_v0/t8_v0_c06.txt (the frozen file of the prompt actually run; current `build.py c06 v0` = the same + 3d2 frontal words).
- OUTFIT + FABRIC: word-for-word the SAME in all three, except the parts that make her Nữ đế: dragon vs phoenix, the "STIFF, SHORT, structured shoulder piece" (approved), the crown text (r11 crown, approved), and the colour slot. The fabric sentence is the same in all three: "The silk has real weight: the wide sleeves and robe hang and fold naturally under their own weight, with natural creases, never stiff, flat or board-like."
- POSE is the ONLY real difference:
  - HH B: `Pose: calm standing pose; she holds <item> ..., the item held below the chin, the hand really gripping it, the whole face fully visible. Her hands and body: the item upright in one hand at chest height below the chin, the other hand resting over her sash, body turned slightly three-quarters to the right.`
  - Nữ đế A: `Pose: standing as a breeze lifts her long silk stole, one hand catching the stole, a gold dragon-framed round fan in the other hand, with stately grace.` (flying cloth — not allowed any more, canon (e))
  - c17 N6c (N5b sentence): `Pose: a calm, composed, dignified standing pose, body and face frontal, standing squarely facing the viewer, no turn, standing still and upright; she holds <item> at chest height in one or both hands, the item held below the chin and clear of the face, elbows close to her body, a small restrained gesture only; the sleeves, mantle, sashes, ribbons and tassels all hang straight down, still, under their own weight: no flying, floating or windblown cloth, no movement`
- CULPRIT: "standing still and upright", "elbows close to her body", "the sleeves, mantle, sashes, ribbons and tassels all hang straight down, still", "no movement" — and "in one or both hands" (both hands centred → a symmetric column).

## BUILDER PATCH (build.py spec5pose(), `--state nude` only; every other output byte-identical: c06 v0, c06 v0 --spec5pose, c25 --t7 --spec5pose, c06 --low 5 --spec5pose, thaihau a51, c13 kc, trieu 8, bd6 = SAME)
fix1 (tested, superseded):
`calm standing pose; she holds {prop} at chest height below the chin, in one or both hands, body and face frontal, standing squarely facing the viewer, no turn, with stately grace; no flying, floating or windblown cloth`
fix2 (NOW in build.py) = HH B pose + HH B "Her hands and body" clause copied; only HH's "body turned slightly three-quarters" replaced by the 3d2 frontal words; "with stately grace" from Nữ đế A; the canon (e) clause "no flying, floating or windblown cloth" kept:
`calm standing pose; she holds {prop}, the item held below the chin, the hand really gripping it. Her hands and body: the item upright in one hand at chest height below the chin, the other hand resting over her sash, body and face frontal, standing squarely facing the viewer, no turn, with stately grace; no flying, floating or windblown cloth`
Removed: "a calm, composed, dignified", "standing still and upright", "elbows close to her body, a small restrained gesture only", "the sleeves, mantle, sashes, ribbons and tassels all hang straight down, still, under their own weight:", ", no movement".
Note: `build.py c06 v0 --golden | cmp golden/pB_c06.txt` already differed BEFORE my edit (char 510 = the 3d2 frontal words); not caused by this patch.

## (b) TEST — 4 gens (cap), gpt-2-6 1024x2304 2k transparentBackground, folder ba4aecfe; refs: style 6AbGv6EiJO, face c17 a18 gOmONWgSXO / a51 rgXgJzFxtc, swatch TdwDfOyVNR. Prompt = builder stdout pasted unchanged. Alpha clean on all 4 (no cut).
- fix1: a18 EbY5I5quuO, a51 gOmykYGSXO (ledger lines 03:10:34/35; --verify now FAILs on them only because the builder moved on to fix2 — superseded tests, not for use).
- fix2: a18 lJtOkHqgv9, a51 Xm9hTWfBfo (ledger 03:13:13/14, --verify PASS).
SHEET: https://ctm-img.victoria-tntt.workers.dev/img/_review/nude-mass/fix1/sheet_fix1.jpg = approved HH t8 | Nữ đế A | c17 a18 OLD | a18 fix1 | a51 fix1 | a18 fix2 | a51 fix2. PNGs …/fix1/c17_a{18,51}_nude_fix{1,2}.png.

## LOOK — honest
- fix1: hardly better than OLD. Symmetric, both hands centred, the robe is a wide straight trapezoid column. FAIL vs HH.
- fix2: BETTER. Item in one hand, the other on the sash, the sleeves now break into curved folds, a18 especially; a51 censer held at the shoulder (fine, below the chin). Closed lips, frontal, crown OK, no flowers seen at sheet size (crown-side native crop NOT done yet).
- But fix2 is STILL NOT as soft as the HH: the robe still reads as a heavy, wide brocade trapezoid with a broad straight hem; the HH and Nữ đế A are slimmer, lighter, with sheer/flowing layers. I do not call it a pass.
- Likely remaining causes (NOT changed — outside my order / owner decisions):
  1. STYLE IMAGE: HH B and Nữ đế A were drawn with m09 / style3_girls (full-body fabric in the reference); now image 1 = 6AbGv6EiJO = two square FACE portraits (owner's final, 02:55Z) → the model has no full-body drape example. Biggest suspect.
  2. 3d2 frontal-only ("standing squarely facing the viewer"): HH was three-quarter; frontal + mantle + stiff shoulder pieces = a symmetric block.
  3. Nữ đế colour slot: "DOMINANT yellow ... wide borders" gives more brocade than the HH's coral silk.
  Suggest the foreman ask the owner: test 1 gen of fix2 with style3_girls Xm9tPkMBfo (or m09) as image 1, to isolate (1).
Credits: 4 × 135 = 540. No mass. Nữ đế painters stay STOPPED until the owner/foreman judges this sheet.

## DIAGNOSTIC (ROOT-39 GO 03:17Z, 2 TEST gens, internal only — never a style proposal to the owner)
Sheet BIG one row: https://ctm-img.victoria-tntt.workers.dev/img/_review/nude-mass/fix1/sheet_fix2.jpg = Nữ đế A | c17 a18 fix2 | (a) | (b) (each cell 1024x2304).
- (a) 5jDLFgnKxe: fix2 exact stdout, image 1 = style3_girls Xm9tPkMBfo → STILL heavy brocade trapezoid, almost the same as fix2. Style image is NOT the variable.
- (b) bxMjQS45Y2: fix2 stdout with the pose = Nữ đế A stored pose ("standing as a breeze lifts her long silk stole, one hand catching the stole, <item> in the other hand") + frontal words, style 6AbGv6EiJO → CLEARLY SOFTER: a sheer gauze stole layer appears, held in one hand, draping in curved folds over the robe; reads close to Nữ đế A. Frontal, lips closed, face clear, fan at chest. Silhouette still a little wider than Nữ đế A.
- VERDICT: the POSE is the variable — the "catching the stole" pose makes the model add a light sheer outer layer, and that is what reads soft. The calm "hang straight / hands on sash" poses give no sheer layer.
- Both logged in gen_ledger.jsonl as TEST lines (cmd starts "TEST F4 diag", argv ["TEST"]).
- Proposal for the foreman (builder change NOT made, needs GO): for --state nude use the spec5 pose list again (varied per person/age, as the owner asked 03:15Z "ai cũng đứng ở một cái kiểu"), frontal, item held, with the Nữ đế A stole action kept as in her stored prompt ("one hand catching the stole") for at least the young ages; canon (e) "no flying cloth" conflicts with the word "breeze" — owner/foreman to decide whether "her sheer silk stole held in one hand" (no breeze) is allowed.
Credits this round 2 × 135 = 270 (F4 total 810).
