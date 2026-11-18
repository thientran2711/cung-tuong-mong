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

## R2 (MAIN verdict: ink = moustache, fix 3 problems) 11/18
Re-shot all 10 (same CDN names). ink: now ink-wash grey-black with dry-brush gaps, ONE cheek, swipe from cheekbone toward jaw, never lips/nose, 0.42/0.55/0.68 face width, opacity .6-.85, lv3 adds a small second stroke on the same cheek. Tóc xổ: strands thickened (alpha dilate) and darkened, at both temples + forehead. Móc chỉ: decal darkened + dilated, 1.2-1.7x bigger. Đậu mùa: the W15 approved face-square files are NO LONGER on the CDN (img/_review/looks-2/final-candidates/* 404; _index.json is stale), so I could not use them. Fallback: small soft rose bumps cut from the decal (desaturated, 8/16/28 bumps, mouth kept clear). MAIN: point me to the approved file if it still exists (Magnific library) and I redo it.

## R3 (MAIN s43 order: STOP decal face samples; list what is NOT approved + code missing)
Face marks use C's approved 384x384 face-square finals (looks-2-art.md FINAL TABLE; the earlier 404 was a CDN worker flake, final-candidates now 200). My decal face panels (ink, daumua, scar, muoi, bui) are SUPERSEDED, delete them with the verdict (wipe-review look-fx).
APPROVED by owner (via C): thuy dau, dau mua, seo ro v9, muc 1-3 (+ mirrored -m), bui v10, muoi, mo hoi v14. DROPPED by owner, main does in code: lem phan (fx-smu), lanh (fx-lanh).
NOT approved yet (my decal panels are the only thing shown, MAIN/owner verdict pending): toc xo (fx-hair-xo, R2 thickened), vuong hoa dao/la/tuyet, moc chi (fx-stain-moc, R2 bigger). No sample at all: tram lech, toc am/bet, mat do khi khoc, khoi ao grey tint (needs code first).
CODE MISSING to draw the approved face set in game:
1. Upload the 24 finals to img/fx-*.png (command in looks-2-art.md) after C says go.
2. Add every key to window.LOOKS_ART in jlooks.js (empty today, lkArt() gates all). Names must match lkFaceImg: fx-<id>-<lv>.png with ids muc/bui/muoi/moho (+ fx-muc-N-m mirrored: no code picks the -m variant yet) and fx-pox-<k>-<n>.png; scar via kitScarOf wrapper jlooks.js:165.
3. Re-measure veil-fit.json fig rows (offset about -0.30W, +0.18H on live fig files; por rows OK; FOREMAN_C_STATUS line 8). I also saw the face has to be hand-placed on figs for the same reason.
4. Hair slots (lkhair html:"") and cloth slots (lkcloth html:"") draw nothing: hair needs a hair-fit box (body-fit KIT REQUEST); cloth waits for review/cloth-xoc drawDecalOnCloth.
5. No code at all: tram lech, toc am/bet, mat do khi khoc, ma do/moi tai (lanh dropped, so main codes it on the makeup layer), lem phan.

## HANDOVER (worker LOOK FX SAMPLES, context high ~55 % of window, start ~8 %: over START_CTX+25 %, rolling over; MAIN opens successor)
Done: samples R1-R3 (10 panels on CDN img/_review/look-fx/, KEEP ink-free hair/cloth ones: hair-xo, vuong-*, moc, until owner verdict; wipe the rest with python3 dev/site/cdn_sync.py). Preview script dev/handover/tools/look-fx-comp.py (needs figs + decals downloaded into its dir).
NEXT JOB (from MAIN s43, NOT started): dev/handover/briefs/look-fx-wire.md on branch review/look-fx-wire from live main f8276cdb: upload 24 finals to img/fx-*.png by md5 table in reports/looks-2-art.md, fill LOOKS_ART + mirrored fx-muc-N-m pick, re-measure ALL fig- fit rows in veil-fit.json/scar-fit.json (live c01 t1 a18 row needs about -0.30W, +0.18H; my hand-measured face boxes: c01 t2 a26 face centre (167,86), c30 t2 a26 (163,106) in 299x900 px, face w 80 h 105), full-body shots LOOKED.
Worktrees: /home/user/wt/lfx (review/look-fx, = old main 62a6846f, delete), /home/user/wt/lookfx (handover), /home/user/wt/lfx-work (scratch).
