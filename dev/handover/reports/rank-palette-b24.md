# rank-palette-b24 — report (kit keeper, sonnet) — branch review/rank-palette-b24 @ 6702ccc (from main 3584ea42)

PRIORITY #1 CHECK: OD 2 | ledger 0 | claims 2 (rank-palette-b24 ORDERED) | main 8 (j1 RCOL = the ONE table, read by j59/jk4/jmark/jkitpage) | review/* 0 | archive 0
Law 4: the token table already existed = `RCOL` in dev/build/j1.js (halo, ring, chips, `--c`, `.rk-c0..c7` ground, title plate `--dh`, text tone all read it). No second table made; values replaced in place.

## Change
- j1.js RCOL: t1 #eae3d0, t2 #7fb394, t3 #7e9ccb, t4 #e3a3b8, t5 #a88bcb, t6 Quý phi #e3a25b (cam), t7 Hoàng quý phi #d46a64 (đỏ), t8 #efbd69.
- jk4.js kitToneOf: the derived paper-text tone used to push every vivid base to saturation ≥ .9, which turned the soft B24 colours back into hot pink/red. Rank bases (RCOL members) now keep their own saturation; only lightness is lowered for contrast. Servants/roles unchanged.
- jmark.js: fallback gold = new t8. KIT.md §1.3 table + note. Kit page §1.3 (8 swatches with rank names, reads RCOL live) needed no code change.
- dev/tools/rank-colour-scan.py (committed): lists rank-colour reads (86 lines) and stray OLD hexes; before = 18 hits (j1, jmark, KIT.md table/§glow) , after = 0 stray (historical reports excluded by being under dev/handover).

## Scan before/after (file:line | element | old | new token)
| place | element | old | new |
|---|---|---|---|
| j1.js:13 RCOL | the table | 8 old hex | B24 8 hex |
| j59.js haloColor / j59col (RCOL[k]) | halo, outline, name tags | read RCOL | same, new values |
| jk4.js KIT_RT / kitRankCol / .rk-c0..c7 | text tone, portrait ground | read RCOL | same |
| jtitle.js `--dh` (title plate) | rank plate | read RCOL | same |
| jmark.js:19 KMM_GOLD | memark glow fallback | #ffc400 | #efbd69 |
| KIT.md §1.3 + glow line | doc | old hex | new hex |
No other rank hex table exists (scanned dev/build, kit, site, test, rank, coop). Art (title-plate-N, frame/gem/bg painted pictures) is Foreman C's, not touched.

## Tests / shots
build_site.sh OK (media-check, img-allowlist, assemble). Kit sample probe: no page errors at 755x1000 and 1180x820. Shots (outside git) in /home/user/wt/rankpal-shots/: before-/after2- × 755x1000/1180x820 × s1.3 (swatches) / s48.1 (rank titles on paper, painting, night panel). Looked 3×: 8 distinct readable colours; text on paper is darkened (derived) so Đáp ứng cream reads as ivory-bronze and Quý phi orange as amber — still distinct from Hoàng quý phi red and Hoàng hậu gold.

## Open points
1. B21 Quý phi "small royal-yellow touch": no existing kit accent slot supports it → NOT built; if wanted, file a KIT_REQUEST (plate corner accent).
2. Painted art that carries rank colour (kit frame/gem/bg/title-plate images) still has old painted colours until Foreman C repaints.
3. I did not play-through full game screens (only kit sample page); stage halo/badges read the same table.

## REVIEW (SMALL rv) — FAIL — reviewed origin/review/rank-palette-b24 @ 6702ccc2 (base 3584ea42)
PRIORITY #1 CHECK: OD 2 | ledger 0 | claims rank-palette-b24 | main j1 RCOL / j59 / jk4 | review/* this branch | archive 0
Laws touched: 4, 7(no), 9, 11, 12. 
1. PASS — RCOL = #eae3d0 #7fb394 #7e9ccb #e3a3b8 #a88bcb #e3a25b #d46a64 #efbd69, exact B24 order (t6 cam, t7 đỏ).
2. PASS — scan tool: 0 stray; own grep of the 8 old hexes: only built index.html/_aa.html (stale until rebuilt) + the scan tool itself. NOTE: branch did not commit the rebuilt index.html/sw.js/assets.json (build_site.sh makes them); coordinator must rebuild at land.
3. FAIL (readability / "reads as named colour"): jk4 kitToneOf now keeps the soft saturation of RCOL bases but still darkens lightness to contrast 3.6 vs PAPER. The stage name tag (kitNameRank "Quý nhân / Phi / Quý phi / Hoàng quý phi / Hoàng hậu" over the painted room, a dark/mid ground) uses that paper tone, so on the stage the after-colours look dull: Quý phi = brown-amber (not cam), Hoàng quý phi = dark brick red, Hoàng hậu = dark olive-bronze (not vàng), Đáp ứng = dark brown, Quý nhân = muddy blue on the blue carpet (low contrast). Before (vivid) all read clearly. Phi (purple) and Tần (pink) are OK. Non-rank tones (servants "Cung nữ", green) unchanged and fine.
4. DONE — in-game shots (host mode, ipadAir 1180x820 + fold 755x1000, before 3584ea42 vs after 6702ccc2, ranks 0,2,4,5,6,7 act tab + Hậu cung/Phi tần tab), scratch /home/user/wt/rv-shots (not in git); looked 3x. HUD pill (title plate with painted gem) is one fixed brown for every rank both before and after (not RCOL; painted gem = Foreman C art, e.g. Quý nhân gem pink, Phi gem green) — pre-existing, no regression; flag to MAIN. No page errors on either build.
5. PASS — build_site.sh OK (media-check, img-allowlist, assemble); build line published.
6. Open point B21 (Quý phi yellow touch): no kit slot → not built, acceptable.
EXACT FIXES: (a) rank text drawn over painted/dark grounds (stage name tag, any rank text not on cream paper) must use the RCOL colour itself (light, soft) with the existing dark text-shadow/outline, not the paper-darkened tone; keep kitToneOf only for text on cream paper. Do it in the ONE accessor (kitNameRank / kitRankCol path), not per place. (b) After fix re-shoot stage tags t1..t8 on a dark room AND cream paper; each must read its named colour (Quý phi orange, Hoàng quý phi red, Hoàng hậu gold, Đáp ứng cream) with readable edges. (c) Commit rebuilt index.html/sw.js/assets.json or tell coordinator.

## FIX r1 (worker) — branch review/rank-palette-b24 @ 2dd36ab
PRIORITY #1 CHECK: OD 2 | main j1 RCOL / jk4 kitRankTone | review/* this branch | claims rank-palette-b24 | reused the existing --rt pipeline, no new table.
1. ONE accessor `kitRankTone(title,col,ground)` (jk4): ground "paper" = derived tone (kitToneOf, cream paper only); "stage" = RCOL base itself. Default call (no ground) returns paper tone + `;--rb:<RCOL base>` for the 8 harem ranks, so every builder (`style="--rt:${kitRankTone(..)}"`) carries both without per-place edits. CSS: paper → `--rt`; stage tags / `.kesov` captions / `.krs` / `.modal.night` → `var(--rb)` + dark ink edge (`0 0 1px/2px #1c100a, 0 1px 2px #000c`); non-harem roles (servants, emperor...) have no `--rb` and keep their previous look.
2. Rebuilt index.html / sw.js / assets.json committed.
3. Call sites of rank text and ground (all go through kitRankTone → --rt/--rb):
| call site | element | ground | colour used |
|---|---|---|---|
| j59.js:45 j59tagHTML `.j59t` | stage name tag | painting (stage) | --rb (RCOL) |
| jk4 kitNameRank `.knr-r/.krt` (+ .krs row) | rank over name | paper OR painting (.krs) | paper --rt / painting --rb |
| j79 kitName/kitRankNameH `.kname .kti` (lines 18-20,128,613,1263-1269) | inline title in prose, lists, logs | paper (cream) ; night panel → --rb | --rt / --rb |
| j79 `.kesov>.kpsn .kname .kti` (event captions over art) | caption on picture | painting | --rb |
| j15.js:13 `.pcrk` / `.pcname.krt` | person card | paper | --rt |
| jk4 kbk-pname / kpod-plq / kpstrip | Tuần lục heading, podium, strip | paper / night | --rt / --rb |
| jinv.js:401, jkc2.js:72 kitName wrappers | via kitName | as kitName | as kitName |
| jkitpage §1.3 swatches / §48.1 rows | kit page | paper / painting / night | all three shown |
4. Shots (Fold 755x1000 + iPad 1180x820, looked 3×): img/_review/rank-palette-b24/sheet-755x1000.jpg, sheet-1180x820.jpg on this handover branch (top = t1..t8 stage-style tags with real `.j59t/.j59n` CSS on a dark painted room, below = cream paper; sheet bottom/right = kit §48.1 rows incl. painting + night). Pixel check on the painting row: Đáp ứng #eae3d0, Quý phi #e3a25b, Hoàng quý phi #d56f5f, Hoàng hậu #efbd69, Phi #a88bcb, Quý nhân #7e9ccb. Honest limit: the stage tags are a real-CSS reproduction in the kit page (the full game start() hung in this sandbox: CDN host blocked), not a live room screenshot; reviewer should re-check the live stage in host mode.
5. B21 not built (OK).

## REVIEW r2 (SMALL rv) — PASS — reviewed origin/review/rank-palette-b24 @ 2dd36ab
PRIORITY #1 CHECK: OD 2 | main j1 RCOL / jk4 kitRankTone | review/* this branch | claims rank-palette-b24.
1. ONE accessor: jk4 kitRankTone(title,col,ground) — paper = kitToneOf, stage = RCOL base, default adds ;--rb for the 8 harem ranks; CSS picks --rb + dark ink edge on painted stage tags / night modal; no per-place colour; servants/emperor unchanged (green "Cung nữ" tags identical). Scan: 0 stray old hexes.
2. Rebuilt files: fresh build_site.sh output == committed index.html except the one build-stamp line (CTM_BI sha/time) → OK.
3. LIVE game stage, host mode, ipadAir 1180x820 + fold 755x1000, real rooms, looked 3x: t2 Thường tại green, t3 Quý nhân blue, t4 Tần pink, t5 Phi purple, t6 Quý phi orange-gold, t7 Hoàng quý phi red all read as their name and are readable with the dark edge; iPad also t1 Đáp ứng cream and t8 Hoàng hậu gold readable on painting. (Fold t1/t8 shots stayed under a harness dim layer; the same CSS path is proven on iPad.) Paper: HUD pill/Hậu cung heading "Hoàng hậu" etc. still darkened and readable on cream. 0 page errors.
4. Earlier checks re-run: 8 hex exact, build OK. Minor note (not a fail): Hoàng quý phi red on a very pale stage ground is lightest-contrast case but edged and legible. HUD pill is one brown for all ranks + painted gems (Foreman C art) = pre-existing, flagged to MAIN. B21 not built = acceptable.

## FINAL-MERGE (rv) — LIVE 71e7b382 merged into review/rank-palette-b24 → 7bc73251
Only index.html/sw.js conflicted (generated) → took theirs, rebuilt by build_site.sh (index/sw/assets). build OK, scan 0 stray, RCOL = B24 8 hex, stage tag Quý phi re-looked on iPad (orange-gold, readable) and Fold (same dim-harness layer as before, 0 page errors both). RV PASS.
