# look-fx samples (worker LOOK FX SAMPLES, session_01UV1SzhzDHZiWyYW2YZdA9A) 11/18/2026
PRIORITY #1 CHECK: OD 21 (11/17 22:58Z, 23:45Z, 00:00Z, 11/18 00:18Z, s42 full-body rule 09:00Z) | main: jlooks.js (only code path for these effects) | review/*: cloth-xoc (jcloth.js, cloth decals only), smudge-code (makeup), looks-2-art (W15 face-square finals) | claims: cloth-xoc r6, smudge r16, W15. Branch review/look-fx = origin/main 62a6846f, NO code change (no tiny fix possible; see root cause).

## ROOT CAUSE (read first)
1. main draws NONE of these effects today: window.LOOKS_ART={} (jlooks.js:42) is empty, lkArt() gates every face picture; hair + cloth slots return html:"" (jlooks.js:177-178). The face slot expects face-SQUARE files img/fx-<id>-<lv>.png (ids smu/bui/muoi/moho/lanh/muc, plus fx-pox-<k>-<n>.png). None of those names exist on the CDN.
2. The CDN holds the TRANSPARENT DECALS (fx-ink-1, fx-muoi-1 ... .webp), a different art line (OD 11/17 23:45Z decals-as-filter). No code on main places a decal on a face or hair (cloth placement exists only on review/cloth-xoc: jcloth.js drawDecalOnCloth).
3. Two art lines clash for faces: W15 face-square finals (img/_review/looks-2/final-candidates; thuy dau + dau mua already approved by owner via Foreman C) vs decals. Owner decides the line per effect.
4. Known: veil-fit "fig" rows flagged by Foreman C as wrong (FOREMAN_C_STATUS "FOR MAIN"). I measured face boxes by hand for the panels.

## STEP 0 TABLE
| Effect | Decal on CDN | Code path on main | Game cause | Drawn in game today | Shown to owner |
|---|---|---|---|---|---|
| Vet muc (ink) | fx-ink-1..2 | slot muc via lkface, file fx-muc-N.png (missing) | Quat muc (lkInk) | NO | no (this panel) |
| Dau mua | fx-pox-daumua-1..2 | kpox slot, fx-pox-daumua-N.png (missing) | illness daumua | NO | YES, W15 face-square v9 sent 11/18 02:45Z |
| Seo ro | fx-pox-scar-1..2 | kitScarOf wrapper jlooks.js:165, fx-pox-scar-N.png (missing) | after daumua | NO | W15 version pending |
| Thuy dau | fx-pox-thuydau-1..2 | kpox slot | illness | NO | APPROVED (Foreman C), reference only, not in panels |
| Muoi khoi face | fx-muoi-1..2 | slot muoi, fx-muoi-N.png (missing) | khoi bep (lkAfterAct) | NO | no |
| Muoi khoi clothes (grey tint) | reuse fx-muoi | slot khoi html:"" | khoi bep | NO | no, needs cloth mask (review/cloth-xoc) |
| Bui lam mat | fx-bui-1 | slot bui, fx-bui-N.png (missing) | gio heo may | NO | no |
| Toc roi / soi toc xo | fx-hair-xo-1..3 | slot toc, lkhair html:"" | gio, nga, canh | NO | no |
| Tram lech | none (code tilt) | none | gio | NO | no, NEEDS CODE |
| Vuong hoa dao / la / tuyet | fx-vuong-*-1 | slot vuong, lkhair html:"" | thoi tiet | NO | no |
| Moc chi vat ao | fx-stain-moc-1..2 | slot moc, lkcloth html:"" (drawDecalOnCloth only on review/cloth-xoc) | canh cay quet | NO | no |
| Toc am / bet | none (code) | slot tocam, no drawing | mua, suong | NO | no, NEEDS CODE |
| Ma do / moi tai vi lanh | none (code, makeup layer) | slot lanh, no drawing | tuyet, suong gia | NO | no, NEEDS CODE |
| Mat do khi khoc | none (code) | none (lkCry only smudges makeup) | khoc | NO | no, NEEDS CODE |

## PANELS (full body head to feet, 2 costumes: c01 red/orange t2 a26, c30 light cream-blue t2 a26; plain | nhe | vua | nang; face crop strip 3x under each)
PREVIEW ONLY: composed by script dev/handover/tools/look-fx-comp.py (decal placed by hand-measured face boxes, face-ellipse clip for face decals, figure-alpha clip for cloth). The game does not draw these yet; this shows the decal art on the figures, not game code. CDN folder img/_review/look-fx/ (wipe after verdict: python3 dev/site/cdn_sync.py --wipe-review look-fx):
https://ctm-img.victoria-tntt.workers.dev/img/_review/look-fx/{ink,pox-daumua,pox-scar,muoi,bui,hair-xo,vuong-hoadao,vuong-la,vuong-tuyet,moc}.png
Levels in the mock = count/size/opacity (LOOK_DECALS rule): ink 1/1/2 smears; muoi 1/2/4 smudges; bui 1/2/3 layers; dau mua + seo 3/6/9 patches cut from the decal; toc xo 1/2/3 strands; vuong 1/2/3 sprites (nang adds one on the shoulder); moc chi 1/2/3 snags.

## LOOK AT 3x (my own verdicts, guidance for MAIN)
- ink: brush smear on the cheek, OK (stiff/clean, lv1 small).
- muoi: soft grey-black smudges, natural, OK on both costumes.
- bui: fine speckle, lv1 almost invisible, lv3 OK.
- seo ro: pale grey pits, subtle, OK.
- dau mua: PROBLEM. Decal is saturated orange-red beads; as patches it reads like red berries on the face, not pox. Do not ship it on the face; owner already approved W15's face-square line.
- toc xo: PROBLEM. Strands are hair-thin, nearly invisible at game size (one thin line on the forehead). Needs thicker/more strands or a code warp.
- vuong hoa/la/tuyet: sprites sit on the hair clearly, size .3 of face width fine; nang shoulder sprite reads as a petal on the robe, OK.
- moc chi: PROBLEM. Thin brown thread pull, almost invisible at full body on both robes. Needs a bigger/darker decal or larger scale.
No mark on skin where it should be cloth (cloth marks clipped to the figure alpha, placed on the skirt away from hands). No grey blotches seen.

## NEEDS CODE (no new systems built, FEATURE FREEZE OD:L1402)
1. Wire LOOKS_ART + a decal placement path for face (ellipse clip + per-effect anchors) and hair (strands from hairline/temples, petals on top): none on main.
2. Cloth marks (moc, muoi tint): reuse review/cloth-xoc drawDecalOnCloth once that branch lands.
3. Tram lech, toc am/bet, ma do/moi tai, mat do: no code path.
4. Decide the face art line per effect: W15 face-square vs decals (dau mua decal rejected above).
5. Fix the veil-fit fig rows (known by Foreman C) before face placement reads them.

## STATE
review/look-fx = origin/main 62a6846f (unchanged, no code). Tests: none (no code). START_CTX ~8 % of window, now ~45 %: no rollover needed.
