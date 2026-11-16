# PROGRESS review/art-complete

Task: owner ART COMPLETENESS rule (15/11 19:50Z). Audit every character set for 4 age bands x every reachable rank, then draw.
Coordinator decisions (15/11 ~19:30Z): GO group A (272) + spouse-aging picker; mamas by CODE (older maids take a maid face);
then GO eunuch ranks (360 + rank-aware picker) and grown-children adult bands (144 + picker), batches of ~60;
HOLD (owner): old-save player looks (128), promoted old-love men (56).

## Done
- Audit: dev/figwork/artcomplete/audit.py -> dev/art/ART_COMPLETENESS.md (1088 missing at start).
- Batch 1 (commit 9882bca50): công tử congtu-1..10 a36+a51 = 20 figs + 20 por on CDN, FIGURES-congtu.json updated.
- Batch 2: quý nữ khuê các consort c01-c10 a26/a36/a51 = 30 figs + 30 por on CDN, FIGURES-kc.json updated.
- Batch 3: KC consort c11-c21 a26/a36/a51 = 33 figs + 33 por on CDN (kc_bg2.txt), props varied per identity (kc_props.py, 6 prop sets).
- Batch 4: KC consort c22-c32 = 33 figs + 33 por on CDN (kc_bg3.txt). KC consorts COMPLETE (c01-c32 x a26/a36/a51).
- Batch 5: KC maid faces m01-m13 = 39 figs + 39 por (kc_bg4.txt). Same noblewoman prompt (kc maids are bride-pool ladies too), prop set = (n-1)%6 of kc_props.py SETS.
- Batch 6: KC maid faces m14-m26 = 39 figs + 39 por (kc_bg5.txt).
- Batch 7: KC maid faces m27-m39 = 39 figs + 39 por (kc_bg6.txt).
- Batch 8: KC maid faces m40-m52 = 39 figs + 39 por (kc_bg7.txt), new no-mole prompt; demole_por.py still found faint dots on
  m41/m46/m49/m51 -> inpainted (por + fig) after zoomed look. KC MAIDS COMPLETE (m01-m52 x a26/a36/a51).
- Forehead-mark sweep (coordinator 15/11, after reviewer found moles on c05/c08): kc_prompt.txt now says "no mole, no forehead mark,
  no bead between brows ... clean bare forehead and brow area". New tool dev/figwork/artcomplete/demole_por.py (haar face box ->
  central forehead strip down to the brow line -> small dark spot -> cv2 inpaint, in place; figs: head area x4; -n = dry run).
  Every por c11-c32 + m01-m39 (a26/a36/a51) viewed zoomed at the brows (browsheet), before/after. Fixed + re-uploaded:
  por (38): consort-c11-kc-a26 consort-c11-kc-a51 consort-c17-kc-a26 consort-c17-kc-a36 consort-c17-kc-a51 consort-c19-kc-a36 consort-c19-kc-a51 consort-c21-kc-a26 consort-c21-kc-a36 consort-c21-kc-a51 consort-c23-kc-a26 consort-c23-kc-a36 consort-c23-kc-a51 consort-c25-kc-a36 consort-c26-kc-a26 consort-c26-kc-a36 consort-c26-kc-a51 consort-c29-kc-a26 consort-c29-kc-a36 consort-c29-kc-a51 consort-c32-kc-a26 consort-c32-kc-a36 consort-c32-kc-a51 maid-m06-kc-a26 maid-m06-kc-a36 maid-m06-kc-a51 maid-m10-kc-a26 maid-m10-kc-a36 maid-m10-kc-a51 maid-m11-kc-a36 maid-m14-kc-a36 maid-m19-kc-a36 maid-m19-kc-a51 maid-m20-kc-a26 maid-m20-kc-a36 maid-m20-kc-a51 maid-m29-kc-a51 maid-m36-kc-a36
  fig (35): consort-c11-kc-a26 consort-c11-kc-a36 consort-c11-kc-a51 consort-c17-kc-a26 consort-c17-kc-a36 consort-c17-kc-a51 consort-c19-kc-a36 consort-c19-kc-a51 consort-c21-kc-a26 consort-c21-kc-a36 consort-c21-kc-a51 consort-c23-kc-a26 consort-c23-kc-a36 consort-c23-kc-a51 consort-c25-kc-a36 consort-c26-kc-a26 consort-c26-kc-a36 consort-c26-kc-a51 consort-c29-kc-a26 consort-c29-kc-a36 consort-c29-kc-a51 consort-c32-kc-a26 consort-c32-kc-a36 consort-c32-kc-a51 maid-m06-kc-a36 maid-m06-kc-a51 maid-m10-kc-a26 maid-m10-kc-a36 maid-m10-kc-a51 maid-m14-kc-a26 maid-m14-kc-a36 maid-m19-kc-a36 maid-m20-kc-a26 maid-m20-kc-a36 maid-m20-kc-a51
  (2 por spots done by hand: m29-a51 dot, m36-a36 light bead.)
  Sweep part 2 (coordinator): kc a18 (c01-c32 + m01-m52, por+fig) and c01-c10 a26/a36/a51 (por+fig): dry run + --sheet + brow
  sheet looked at. Fixed + re-uploaded: por consort c02-a36, c04-a51, c06-a26, c06-a36 (spot=), c08-a36, c16-a18;
  fig consort c07-a18, c02-a51, c03-a36, c04-a51, c06-a26, c06-a36, c08-a36, fig maid m41-a18. False hits left alone:
  por maid m16-a18 (clothing), fig c18-a26 / m04-a51 / m42-a36 / m44-a51 (hairline).
  TOOLS for the whole-game audit: demole_por.py (docstring = usage; files or quoted globs; -n, --sheet OUT.jpg, spot=x,y)
  and browsheet.py (plain brow crops of every face, to catch faint dots the detector misses). Both in dev/figwork/artcomplete/.
  NEW FACES: run demole_por.py -n on new por/fig and look at the brow crops before upload.
- Code (dev/build/jartc.js, appended to assemble.py; site rebuilt with dev/site/build_site.sh):
  1. married spouses (k.hW.s phò mã, k.pW.chinh / trac) age +1 each new year (wrap of ageYear);
  2. staff maids whose first face comes at 36+ take a free maid identity (full rank x age), mama pool = fallback.
- Audit now: 816 missing (KC complete; left: eunuch ranks 360, kids adult 144, HELD player looks 128 + tm96 56, + others in the table).

## Pipeline (how to continue)
0. NEW CONTAINER NOTE: porcrop needs opencv 4.x haar files; system has 5.x. `pip install --target dev/figwork/artcomplete/.cache/pylib "opencv-python-headless==4.10.0.84"`
   (proc.py now runs porcrop with -I + that lib on sys.path; dev/figwork/cv2.py shadows cv2 if the script dir is on sys.path).
   Prompts for kc consorts c11+: `python3 kc_props.py kc-c22 ...` prints the full prompt per identity (template + palette + prop set).
1. Jobs: kc_jobs.json (84 kc identities: ref = kc a18 sheet, ref2 = same identity's t1 age sheet, palette). ct_* = công tử (done).
2. Generate: Magnific images_generate mode gpt-2-6, folderReference ba4aecfe-efce-47e2-b53f-30d292091886, resolution 4k,
   extraSettings {"quality":"high"}, aspectRatio 21:9 (3 figures) / 2:1 (2 figures), references [ref, ref2] (type image).
   KC prompt = the one used for kc-c01..c10 (see kc_gens.txt ids; text in this file's history / PROGRESS below), only the palette changes.
   NEXT TIME: vary the props per identity (fan / handkerchief / prayer beads were used for c01-c10).
3. images_remove_background on each sheet; write lines "jid genId bgId url" to a kc_bgN.txt.
4. `python3 dev/site/cdn_sync.py --pull img/FIGURES-kc.json` then
   `cd dev/figwork/artcomplete && python3 -I proc.py kc_jobs.json FIGURES-kc.json kc_bgN.txt` (cuts, 900px webp, porcrop, manifest).
5. Look: rvsheet.py (por a18 + new por + figs per identity), cutcheck.py on new files (fig >=8 / por >=20 = re-cut).
6. `python3 dev/site/cdn_sync.py <new files> img/FIGURES-kc.json`; commit the bg/gens txt files; rerun the audit
   (delete dev/figwork/artcomplete/.cache/_index.json + FIGURES*.json first: audit.py caches them).

KC prompt template: "The SAME woman as in the reference images (exactly the same face and features as the young lady in the first
reference; the second reference shows how this same woman looks at older ages), now a married noblewoman of a great house. [style +
rules] A character lineup of THREE full-body standing figures ... Signature colour family: <palette>. Left: about 30 ... Middle: about 43
... Right: about 57 ... NO forehead mark, NO huadian ..." (full text: kc_prompt.txt).

## Group (b) eunuch ranks - IN PROGRESS (resume here)
- Spec: dev/figwork/artcomplete/ue_spec.py -> ue_jobs.json (90 jobs ue-uNN-r0/r2/r3, 4 ages each, files fig-eunuch-uNN-rK-aXX,
  role eunuch, identity uNN, tier "r0"/"r2"/"r3"; the existing tier-null art in FIGURES.json = r1). Ref = that eunuch's own sheet
  (magnificUrl of FIGURES.json, needs .cache/FIGURES.json: `python3 dev/site/cdn_sync.py --pull img/FIGURES.json` then copy, or
  run audit.py which caches it). `python3 ue_spec.py ue-u01-r0` prints ref + prompt. Gen: gpt-2-6, 4k, 21:9, quality high, refs [ref].
- Manifest: FIGURES-servants.json (j39 merges it; holds maid/mama/eunuch). Pull it fresh before proc:
  `python3 dev/site/cdn_sync.py --pull img/FIGURES-servants.json` then `python3 -I proc.py ue_jobs.json FIGURES-servants.json ue_bgN.txt`.
- DONE: u01 r0/r2/r3 (12 figs + 12 por) cut (ue_bg1.txt), looked at (rvsheet: face kept, 3 ranks clearly different), cutcheck max 1.9,
  demole 0 hits, on CDN with FIGURES-servants.json (2956 records).
- DONE 15/11 night (worker resume): u02-u10 r0/r2/r3 (ue_bg2..4.txt), all on CDN + FIGURES-servants.json. Helpers: look.py (contact sheet of raw gens),
  chk.sh OUT stem... (cutcheck top-3 + demole dry run + rvsheet). CDN upload works again (coordinator 15/11).
- DONE u11-u30 (ue_bg5-8.txt). EUNUCH RANKS COMPLETE: 360/360 (audit). u30 r0 a36/a51 faint forehead dots inpainted. u24: gpt-2-6 added a left-cheek mole on the new ranks (r1 has none) -> inpainted with demole_por.py spot= (new option zone=cheek finds them; noisy on older faces, look before fixing). NEXT: u26..u30 x r0/r2/r3 (15 sheets; u30 r2 = ochre-gold): `python3 ue_spec.py ue-u02-r0 ue-u02-r2 ue-u02-r3` -> generate (refs [ref]) -> append ids to
  ue_gens.txt -> LOOK -> remove_background -> ue_bgN.txt -> pull FIGURES-servants.json -> proc.py ue_jobs.json FIGURES-servants.json
  ue_bgN.txt -> rvsheet + cutcheck + demole_por.py -n --sheet -> cdn_sync -> commit. Batches of ~5 eunuchs (15 sheets, 4050 credits).
- Picker DONE (jartc.js part 3): f88Best wrapped; staff eunuchs (role eunuch/eun, not S) -> f88Pick base mode with rank who.rk
  (null = 1), nearest drawn rank wins, so it is safe before all art lands. vt.js checks it: ranks 0,1,2,3,undefined -> r0,r1,r2,r3,r1.
- Pilot look: r0 (plain faded robe, cloth cap) good; r3 (gold python robe) good; r2 first try = same as the r1 reference -> spec now
  makes r2 a deep crimson robe with gold crane badge + "NEW CLOTHES: change the clothing completely" (redo id in ue_gens.txt).
  TODO: u10/u20/u30 already wear deep crimson at r1 (ECOL idx 7) -> give their r2 another colour (e.g. deep ochre gold).

## Remaining (in order) - audit 15/11 night: 456 missing
- Eunuch ranks: DONE (360/360, picker done).
- Kids adult bands a26/a36/a51 x 48 (144) + picker: kidBandOf beyond 20.
- Player looks look1-4 t2-t8+cold x 4 ages (128; owner 23:05Z: no longer on hold) + add look1-4 as selectable/NPC faces on all roads.
- tm96 promoted old-love men 'up' dress (56; owner 23:05Z: no longer on hold).
- (Not in this task) Mamas k01-k08 maid rank dress 128 - coordinator ruled mamas by CODE.
- Test note: vt.js sometimes fails to start the new game at one viewport (st=0, "reading 'emp'" in the harness, different viewport each run); 0 page errors everywhere.

## PENDING CDN UPLOAD
- none (every file above is on the CDN; Cloudflare upload works again 15/11 night).

## Tests (head 822de7c79 + this commit), `node dev/figwork/artcomplete/vt.js <worktree>` (in-process server, one browser)
755x1000, 1000x755, 1180x820, 1366x1024, 844x390, 390x844: new game started, 0 page errors, no horizontal overflow;
spouse ageing 22/20/19 -> 23/21/20 after ageYear (phò mã, chính phi, trắc phi); figRoles(staff maid age 40) = ["maid","mama"].
