# live-today — LIVE-1 (Foreman C ROOT-34 brief live-today), 18/11 ~23:55Z real
START_CTX ~3 % (own estimate, window 1M) → roll over at ~28 %, ceiling 60 %.
PRIORITY #1 CHECK: brief live-today (Foreman C checked live c06-t8-a18 = OLD) | FIGURE_GATE A0 APPROVED FORMS read | live procedure = reports/c03-v1-t678.md § LIVE (finish_fig.py, headtop face_rows, mkfit/verify.py --fix, fixtoil.py, manifest_guard --live-check, cdn_sync) — reused, no new tool | review/live-today-1118: none yet | claims: none on live push.

## 1. INVENTORY — owner-approved today, NOT live yet (CDN img/_index.json listing 39,837 keys, 18/11 ~23:55Z)
Live slot rule found: the game has ONE live figure per person × rank × age (`fig-consort-cNN-tN-aNN.webp` + hd/ + por- [+ tn/]). There is NO live slot for v1/v2 (outfit colours), a65, or a consort's Thái hậu figure → those stay on _review until MAIN wires slots. v0 (her own colour) goes into the slot.

| # | group | approved by | source (img/_review/…) | count to push | live target | slot? |
|---|---|---|---|---|---|---|
| G1 | t7 Hoàng quý phi + t8 Hoàng hậu prompt-B **a18** v0 | A0 row 1–2 ("hoàng hậu và hoàng quý phi tao đã duyệt ok hết rồi") | t8-reprompt/cNN_a18_t{7,8}_v0.png | 64 (c01–c32) | fig-consort-cNN-t{7,8}-a18 | yes, all 64 |
| G2 | same, **a26** v0 | A0 row 1 (a18/a26/a36) | t8-reprompt/cNN_a26_t{7,8}_v0.png | 62 (c12 has none) | fig-consort-cNN-t{7,8}-a26 | yes, all 62 |
| G3 | same, **a36** v0 | A0 row 1 | t8-reprompt/cNN_a36_t{7,8}_v0.png | 62 (c12 has none) | …-a36 | yes, all 62 |
| G4 | a51 DARK t7/t8 v0 (new a51 text) | A0 row 3 (c04 elder sheet Lượt 41) + root30-mass UPDATE 21:12Z "OWNER APPROVED" | t8-reprompt/cNN_a51d_t{7,8}_v0.png | 6 (c04, c05, c13 only — the a51 mass was never run) | …-a51 | yes |
| G5 | khuê các 2K re-make (K1/K2/K2b) + new (K4 c13/c16, K5 c09/c11 two-item fix) | kc-ngheo-2k GO 22:25Z; K4 "4 hình vẽ mới ở luật 95 duyệt đẹp"; K5 GO ~23:50Z | kc2k/cNN_a18_kc_new.png if present, else cNN_a18_kc_2k.png | 32 | fig-consort-cNN-kc-a18 | yes (hd twin on 29) |
| G6 | nhà nghèo 2K re-make + K4 new (c13/c16) + K5 poor-fix (c05 c08 c09 c10 c11 c12 c23 c29 c30 c31 c32) | same | kc2k/cNN_a18_ngheo_new.png if present, else _2k | 32 | fig-consort-cNN-ngheo-a18 | yes (hd twin on 29) |
| — | t7/t8 v1, v2 (all ages) | approved | t8-reprompt | 0 | none | NO slot (outfit-change feature = MAIN) |
| — | t7/t8 a65 v0–v2 (21 people) | approved | t8-reprompt/cNN_a65_* | 0 | none | NO a65 age in the game |
| — | old a51 (muted) t7/t8 `cNN_a51_*` | SUPERSEDED (owner: dark a51; redo ordered, never run) | — | 0 | — | not pushed |
| — | Thái hậu 32 × a36/a51/a65 (DONE) | owner "Hình Thái Hậu là ok rồi" | thaihau/cNN_aXX_thaihau(_v0).png | 0 | none | NO slot: live Thái hậu = separate NPC figs (fig-thaihau-h1..); a consort-as-Thái-hậu figure needs MAIN wiring |
| — | t1–t6 sets | NOT approved as images (t1/t2/t3/Phi redesign open; items mass not run) | — | 0 | — | — |
| — | held open (brief): triều phục, Nữ đế crown, BD Quý phi colour, 49 maids | not approved | — | 0 | — | — |

TOTAL to push: 258 figures (G1 64 + G2 62 + G3 62 + G4 6 + G5 32 + G6 32), each fig + hd + por (+ tn where it exists).
Flag for Foreman C: c03 a18 t7/t8 live today = the owner-approved original-design v1 recolour (W54, 16:16Z). The brief says push all t7/t8 prompt-B, so c03 a18 t7/t8 get prompt-B v0 too (old twins backed up, revert = copy back). Say STOP c03 if wrong.
Backup path (CDN): img/_backup/1118-live/<same path as the live file> (fig, hd, por, tn) before every overwrite.
Order: G1 → G2 → G3 → G4 → G5 → G6.

## 2. LIVE — DONE (all 6 groups, 258 figures), 19/11 ~00:45Z real
| group | figures | files pushed (fig/hd/por) | backup |
|---|---|---|---|
| G1+G2+G3 t7/t8 prompt-B v0 a18/a26/a36 | 188 | 561 | 561 |
| G4 a51 dark v0 c04/c05/c13 t7/t8 | 6 | 18 | 18 |
| G5 kc a18 (c09 c11 c13 c16 = _new) | 32 | 93 (no hd on 3) | 93 |
| G6 ngheo a18 (13 = _new) | 32 | 93 (no hd on 3) | 93 |
No tn twins exist for these names (t7/t8/kc/ngheo). FIGURES*.json unchanged (same names).
- BACKUP: every overwritten live file first copied to CDN img/_backup/1118-live/<same path> (765 files, cdn_sync --check same 561 + 204). Revert = copy back.
- METHOD (c03 procedure): finish_fig.py (fig 900 = old figure height, hd 1800, same names). Bust: finish_fig's template crop was off on the new tall crowns, so every por is re-seated by face mesh (scratch porface.py: lm10/152 + cheeks) to the old por's face size and position; face height kept within ~±8 %.
- LOOKED: all 258 on 11 contact sheets (full figure + new|old bust): whole body inside, nothing cut, faces in place. Notes: c13 kc/ngheo, c16 ngheo, c30 ngheo have a faint floor shadow under the feet (as painted in the approved files); c09 kc holds flute + a small songbird on the hand (K5 kept her spec5 songbird pose).
- ANCHORS: mk-fit verify.py --fix re-seated 296 (G1) + 76 (G2) sets; second pass 376/376 + 140/140 ok. fixtoil re-seated 188 + 34 mouths (only ours), after: 0 off > .10. fig-ht.json 258 rows re-measured (8893 rows, none lost). mk-fit md5.json 516 rows.
- GUARD: manifest_guard --live-check PASS (after each group); cdn_sync held 0.
- SPOT-CHECK (live md5 = ours, looked): fig c06-t8-a18, hd c19-t7-a26, por c29-t8-a36, fig c13-t8-a51, hd c09-kc-a18, por c31-ngheo-a18.
- NOT done: in-game stage shots (fullbody-frame-scan) — only file checks; heights equal the old live figures, so frames are unchanged.
- REPO COPIES: review/live-today-1118 a8f0d55 (= origin/main 9a1d692 + 2 commits: dev/art/headtop/fig-ht.json, dev/art/mkfit/consort-*.json + md5.json, dev/art/toil-fit2.json). Main untouched.
- c03 a18 t7/t8: the W54 original-design files were replaced by prompt-B v0 per the brief (old files in the backup).

FOR MAIN (LIVE-1 via Foreman C ROOT-34, 19/11 ~00:45Z): today's owner-approved figures are LIVE on the CDN — t7 Hoàng quý phi + t8 Hoàng hậu prompt-B v0 for a18/a26/a36 (188), a51 dark c04/c05/c13 (6), khuê các + nhà nghèo a18 2K re-makes/new/poor-fix for all 32 (64). Land review/live-today-1118 a8f0d55 (fig-ht, mk-fit, md5, toil-fit2 repo copies). Still NO live slot (needs MAIN wiring): t7/t8 v1/v2 outfit colours, a65 ages, Thái hậu 32 × a36/a51/a65 (img/_review/thaihau/), a51 dark for the other 29 people (never painted).

## HANDOVER: none needed — job complete. Context ~25 % (START_CTX ~3 %).
~100% xong / ~100% chơi được (258 figures live; repo rows wait MAIN landing).

## 3. NEW ORDER (ROOT-34/35, 19/11 ~00:00Z; owner verbatim: "Hình Thái Hậu cũng vậy. Nói chung là hình nào mà hôm nay vẽ mà tao duyệt ok rồi thì đẩy hết lên live đi.")
c03: owner said prompt B everywhere → c03 a18 t7/t8 prompt-B push (already done in G1) is CORRECT.
TODO (not started by LIVE-1): Thái hậu 32 × a36/a51/a65, t7/t8 a65 (21 people with files), t7/t8 v1/v2 (all ages with files) → live. Where a slot exists replace with backup; where none, upload in the live naming scheme the game would use + write "FOR MAIN WIRING" (exact JS table/manifest rows) here.

## HANDOVER LIVE-1 → successor (rollover at context ~28 %, START_CTX ~3 %)
Tools (copy to a scratch dir /home/user/wt/lt; scripts assume that path): dev/handover/reports/live-today-tools/ = one.sh (download master + finish_fig + porface), porface.py (bust by face mesh), sheet.py (contact sheets: new fig + new|old bust), fight.py (fig-ht rows; edit paths). Also copy dev/handover/reports/fig-cutout-clean/tools/{finish_fig.py,fit_fig.py,qa_fig.py} there, and dev/site/{cdn_sync.py,manifest_guard.py,manifest-floor.json} from origin/main into lt/out/dev/site and lt/bk/dev/site.
Setup: pip install opencv-python-headless mediapipe; apt-get install -y libegl1 libgles2; model: curl https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task -o /home/user/wt/face_landmarker.task. Worktree of origin/main sparse WITHOUT img/ (/home/user/wt/live1) for verify.py/fixtoil.py/headtop and manifests; branch review/live-today-1118 (a8f0d55) continues there.
Recipe per group: list "SRC(rel. to img/_review/) KEY" → xargs -P 6 -L 1 ./one.sh → retry any FAIL (transient CDN read) → sheet.py, LOOK at every sheet → copy out/_old to bk/img/_backup/1118-live/<path> (hd-/tn- prefixes → hd/ tn/ folders) and push bk FIRST, --check → push out/img, --check → in live1: cdn_sync --pull 'img/mk-fit/*' img/toil-fit2.json img/fig-ht.json → verify.py --names <fig+por names> --fit-dir img/mk-fit --fix (run twice; first run may crash at exit AFTER writing, second must be all ok) → fixtoil.py --fit img/toil-fit2.json --mk img/mk-fit --out img/toil-fit2.json (check only our keys changed) → fight.py → cdn_sync img/mk-fit img/toil-fit2.json img/fig-ht.json → manifest_guard --live-check → spot-check 3 live md5 → repo copies + md5.json on review/live-today-1118.
NEW-NAME NOTE: finish_fig needs an OLD live twin for geometry (height/bust). For names with no slot, use the nearest existing twin as geometry ref (e.g. a65 → same person t7/t8 a51; v1/v2 → the v0 slot; consort Thái hậu → that person's t8 of the same age), i.e. adapt one.sh to fetch the ref under the old name and save under the new name. Naming + wiring: read dev/build j28.js figRole / j39.js figRoles / kitFigOf and img/FIGURES*.json patterns before choosing names; Thái hậu NPC slots fig-thaihau-h1..hN-aXX are separate NPC people — do NOT overwrite them with consort images without Foreman C's word (flag it).

## 4. LIVE-2 (successor of LIVE-1, Foreman C ROOT-35), 19/11 ~00:30Z real — the rest of the order under NEW names
START_CTX ~4 % (own estimate; get_session reads 0; window 1M) → roll over at ~29 %, ceiling 60 %.
PRIORITY #1 CHECK: brief live-today + §3 + HANDOVER above (LIVE-1 tools reused: one.sh → one_ref.sh, finish_fig.py → finish_ref.py = same code + a REF key for geometry; porface.py, sheet.py) | naming checked in dev/build: kitFigOf (j90) / figTierOf + figDist (j66) pick consort art ONLY through img/FIGURES.json rows (FIGIX; tiers 1–8 + cold, ages a18/a26/a36/a51), so a file with no FIGURES row is never shown → the new names below change nothing in the game until MAIN adds rows | fig-thaihau-h1..h3-aXX (separate Thái hậu NPCs) NOT touched | name-clash check vs CDN _index: 0 for all 592 names.
New-name scheme (same pattern as kc / ngheo / tcold tiers):
- consort Thái hậu: `fig-consort-cNN-th-aXX` (aXX = a36 / a51 / a65), geometry ref = `consort-cNN-t8-aXX` (a65 → t8-a51)
- a65 age: `fig-consort-cNN-t{7,8}-a65` (v0) and `…-a65-v1` / `…-a65-v2`, ref = `consort-cNN-t{7,8}-a51`
- outfit colours: `fig-consort-cNN-t{7,8}-aXX-v1` / `-v2` (aXX = a18 / a26 / a36; a51 = the dark a51 c04 only), ref = the v0 slot `consort-cNN-t{7,8}-aXX`
Each name has fig (900 tall) + hd/ (1800, where the ref has hd) + por- (bust seated by face mesh on the ref's por). No tn/. No backup needed: no live file is overwritten.

| group | source (img/_review/) | figures | files | looked | live check |
|---|---|---|---|---|---|
| TH Thái hậu 32 × a36/a51/a65 | thaihau/cNN_aXX_thaihau(_v0).png | 96 | 282 (hd 90) | 4 sheets, all ok | cdn_sync --check same 282; md5 3/3 |
| A65 t7/t8 a65 v0/v1/v2, 21 people (c01–c05 c09–c13 c17–c19 c25–c32; c05/c13 v0 only) | t8-reprompt/cNN_a65_t{7,8}_v{0,1,2}.png | 118 | 348 (hd 112) | 5 sheets, all ok | --check same 348; md5 3/3 |

### 4b. FLOOR-SHADOW FIX (ROOT-35/36 order, owner: "a fault is a fault"), 19/11 ~01:30Z
Scan (tools/shadow.py: soft halo = alpha<200 pixels in the bottom 14 % of the figure, >3 px from the solid figure, scored by count × alpha) over ALL 258 live figures from today (G1–G6) + all 591 new-name figures (TH, a65, v1/v2 local) = 849. Every candidate was looked at (feet crops, dark bg, removal in red): hem edges of sheer skirts (c09 kc, c16 kc, small 1-px edge specks on t7/t8) are fabric, not stains → not touched.
HITS (7 figures, 11 files):
| figure | files | method | stain |
|---|---|---|---|
| c13 kc a18 | fig (no hd) | fix2 (MediaPipe selfie-multiclass segmenter, feet band, alpha × person-prob) | big ground glow under hem + feet |
| c12 ngheo a18 | fig + hd | fix3 (colour flood from the halo through smooth stain-coloured pixels) | brown floor shadow both sides of feet |
| c13 ngheo a18 | fig | fix3 | shadow under/behind the walking foot |
| c16 ngheo a18 | fig | fix3 | faint ring (alpha 1–10) right of the shoe |
| c30 ngheo a18 | fig + hd | fix2 | ground glow around feet |
| c31 ngheo a18 | fig + hd | fix3 | shadow under the left foot |
| c04 th a36 (LIVE-2 new) | fig + hd | fix3 | grey haze round the hem |
Fix = alpha only (colour pixels unchanged), feet band only; por busts untouched (no feet). First try (alpha-only halo removal) left the opaque core with a hard edge → rejected after looking; fix2/fix3 chosen per figure by looking.
BACKUP: img/_backup/1119-shadow/<same path> (11 files; NOT 1118-live, which keeps the pre-today originals). --check same 11 before and after. Live md5 = local (spot c13 kc fig, c30 hd, c12 fig, c04-th hd).
SHEET: https://ctm-img.victoria-tntt.workers.dev/img/_review/live-fix/shadow_before_after.jpg (each row: BEFORE dark|light bg → AFTER dark|light bg; hd where it exists).
