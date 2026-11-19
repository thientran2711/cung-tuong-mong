# item-age — painter-tooling worker N5c, coordinator Foreman C ROOT-36 (session_01PEhRbvtnpg83sBEqSUgFS2)
PRIORITY #1 CHECK: prio1.sh "item age rank pick_item frontal": OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0. Reused N5b item_age.py (b6b8233) + build.py; no new rule file. Read START_CORE/START_WORKER, FIGURE_GATE A0/3d2/3e/3f/H, report nude-mass-N5b.md.
No image generation in this job.

## 1. Item table (dev/art/t8-prompt-B/item_age.py → dev/art/item-rank-age.md, generated, EN + VN names)
- Fault fixed (one rank held the same 10 items at every age): each AGE now has its OWN pool of item KINDS per group; only 3 kinds per group are shared by all ages (lady: round fan, folding fan, hand mirror; maid: lantern, folded robe, feather duster; poor: bamboo-leaf fan, wooden comb, cloth bundle). New check: a cell has at most 3 items that also appear in that rank's other ages (all cells = exactly 3).
- KIND = what the item is (suited to the age: a18 tú cầu/lantern/flute/butterfly pin…, a26 vase/poetry book/painted scroll/go box…, a36 incense box/jewel casket/powder box/ruyi…, a51 sutra/hand warmer/brush/incense ball/censer…, a65 walking staff/longevity peach/almanac/pine-crane scroll/health balls…). RANK = material (MAT ladder), so luxury rises rank by rank inside every age.
- Reserved: ruyi + coral stand t6+ (not princesses), hand censer t7+ (+Thái hậu), phoenix + seal box t8 only, dragon/sceptre/edict/hốt/ngọc tỷ Nữ đế only; t6+ never basket/sachet/pouch/loose flowers/rosary (Thái hậu may hold beads). No cup/bowl/teapot. Nữ đế / Thái hậu item cloth = deep crimson / deep indigo so it contrasts with the yellow robe (D3c).
- New rows: Lãnh cung (all 5 ages), cung nữ tm0 thô sử / tm1 Cung nữ / tm2 Đại cung nữ / tm3 Chưởng sự cô cô / tm4 Nữ quan, Ma ma (all 5 ages). kc/ngheo a18/a26, Thái hậu a36–a65. Trung y: no item. Nam Chiêu / Bắc Địch rows kept.
- `python3 item_age.py check` = 0 faults: short cells, duplicates, overlap>3, cup, phoenix outside t8, dragon outside Nữ đế, luxury words at poor/kc, reserved kinds, neighbouring ranks sharing an identical item, a person repeating a kind across her ages (c01–c52, every status), Nữ đế kind = her t8 kind (pick offset 5).
- Table file stays at dev/art/item-rank-age.md (ROOT asked dev/handover/reports/…; one file only, canon rule: link it from there if wanted).

## 2. Builder frontal (FIGURE_GATE 3d2) — build.py, ngheo_old.py, emperor-B/build.py
F = "body and face frontal, standing squarely facing the viewer, no turn"
| Before | After | Where |
|---|---|---|
| face clearly visible, 3/4 or frontal view. | face clearly visible, F. | shared PRE (build.py, ngheo_old.py, emperor-B) — also reaches --trieu outputs (header only) |
| body turned slightly three-quarters to the {d} (17×) | F | hand(), hand7(), HAND_LOW |
| a slight turn of the body[, head tilted gently toward the viewer] (7×) | F[, head tilted…] | hand(), hand7(), HAND_LOW book/flute/vase/ruyi/stand |
| …lifting her sleeve slightly, body turned slightly three-quarters to the right | …, F | low_hand scroll fallback |
| frontal or a slight three-quarter turn, standing still and upright | F, standing still and upright | Nữ đế calm pose (spec5pose) |
| calm still standing pose, slightly turned at an angle, | calm still standing pose, F, | ngheo_old.py |
| body turned slightly three-quarters (4×) / a slight turn of the body (2×) | F | emperor-B/build.py (men) |
| spec5 POSES: "turning mid-step while adjusting" / "gazing sideways at" / "swaying in a light turn," / "turning mid-step with" / "turning lightly with {prop} in both hands" / "body in three-quarter view, " | "mid-step while adjusting" / "gazing at" / "swaying gently," / "mid-step with" / "lightly holding {prop} in both hands" / "" | SPEC5_FRONTAL, applied AFTER the pose choice (same pose per person as before) |
| every spec5 pose sentence | + ", body and face frontal, facing the viewer squarely, no turn" (word "standing" left out because many spec5 poses are mid-step) | spec5pose |
--bdq (N3b) output byte-identical (its sw() targets follow the new base text); --trieu pose (W104i) untouched.

## 3. pick_item wired (default ON; `--olditem` = the old per-rank picks)
age_item(c, status, …) → item_age.pick_kind(c, AGE, status) for t8, --t7, --low 1–6, --state nude / thaihau / kc / ngheo / nc1 / nc6 / bd1 / bd6 (status not drawn at that age → nearest age of that status). Hand sentence follows the kind (_HK → HAND_LOW key). Not wired: --bdq (keeps its --bditem BD list), --nude2 (old r10 sample path), ngheo_old.py (re-make of liked images), --trieu (no item). Maids / cold palace / mama: NO builder state exists in build.py → rows ready in item_age.py, wiring when a builder exists.
GUARD (12,806 builds = c01–c32 × 5 ages × every command, ± --spec5pose, snapshot diffs):
- parent 4a0d065 vs new with --olditem: only the frontal sentences above differ; --bdq 0 diffs; no new exceptions (pre-existing: --trieu --spec5pose assert, --bdq arg errors).
- --olditem vs default: changes ONLY inside the Pose paragraph (item + hand) for every item builder (t8, t7, low t1–t6, nude, thaihau, kc, ngheo, nc1/6, bd1/6); 0 changes elsewhere.
- test_low_all.py: golden_low regenerated (all 192 differed, by frontal + item only) → OK 2304 builds. NOTE: `--golden` (A/B test prompts) is no longer byte-identical (frontal + item); use `--olditem` for the item, the frontal words changed by rule 3d2.
- Branch note: Tần↔Phi swap commits fcba546/e7522ad (another worker) landed during my run; merged cleanly, their t4/t5 outfit text untouched.

## Redo list / next (no gens until ROOT GO)
Everything drawn with three-quarter poses or same-item-across-ages stays per 3d2 ("hình nào đã lỡ vẽ rồi thì thôi") unless ROOT orders a redo; Nữ đế c09–c11 (+c01, c02, c17) redo list per N5b handover.

## Fix after W107 report
- `--nude2` crashed ('t8 item not in pose') since pick_item: nude2() now looks for the age-table t8 item (age_item); `c06 v0 --head --nude2 A` OK with and without --olditem.

## HANDOVER N5c → successor (rollover: past START_CTX + 25 %) — foreman now ROOT-37 session_01PEhRbvmuaY9UKYHVCvKcM9
DONE (pushed): 793227c table + frontal + pick_item; 83de0af report + golden_low; ea3bd45 golden t4; this commit nude2 fix.
NOT DONE — builder-gate orders from ROOT-36 (00:56–01:31Z, verbatim in its messages; split with W107/W107b in dev/handover/reports/builder-coverage.md § HANDOVER). Successor owns:
1. K3 no-background sentence in build.py output for every figure state, default ON, as a module constant (W107b session_01PEhRbv2Jj3dTLMsN1f9GGg wants to import it; tell them the name, e.g. K3_BG). Exact text in ROOT-36 msg: " The second reference image is style only: IGNORE its background completely; the background is completely transparent with NOTHING behind or around her: no backdrop, no parchment, no painted flowers/branches, no smoke, no haze, no glow, no stain."
2. --log (append {ts, cmd, prompt, refs, gen_id, magnific_prompt} to dev/art/gen_ledger.jsonl) and --verify dev/art/gen_ledger.jsonl [--since ts]: re-run cmd, compare with magnific_prompt (painter fetches with creations_get after the gen), PASS/FAIL per line, exit 1 on any FAIL. Write exact painter steps + usage lines for briefs; share API with W107b.
3. spec5pose AGE offset (5 ages of one person = different poses, keep facing/calm skips); W107 will NOT touch spec5pose.
4. --state ty N (ty1–ty8) and --state cold for consorts cNN AND maids mNN, all 5 ages incl. a65: re-make mode (image 1 = her live tier+age picture, image 2 = style3_girls), trung y design from reports/fig-cutout-clean/PROMPT_TEMPLATE.txt, C8 colours (maid-ty-m09.md l.13 / jty.js TY_COL), AGE_TXT verbatim; a51/a65 = deeper clause + "deeper shade of the same <C8 colour>, same hue family" (owner d0f31d3, no switch); spec5pose + pick_item (ty tier = rank cell: add ty rows to item_age or map ty N → tN; cold → "lanh").
5. Maid mode tm0–tm4 + ma ma, all 5 ages: COPY old maid prompts (dev/handover/reports/maids-M1.md, main dev/figwork/jobs.json / maid*), owner ladder FIGURE_GATE "CUNG NỮ LADDER + MA MA" (59a21c8) + THÔ SỬ design (842754fa: plain coarse cotton/hemp, one faded colour, short crossed-collar jacket + plain ankle skirt, same-colour sash, sleeve ≈1 span, simple bun + wooden pin, no apron, work items). m01–m52 DATA/ORIG1/LOWNAME rows (ORIG1 measured from live fig-maid-mNN-t1-a18, PAL/MOT from main dev/figwork/maidC/mjobs.py:22,:31). Maid personality → SPEC5 list mapping by index, documented. pick_item rows tm0–tm4/mama already in item_age.py.
6. After each block: `python3 dev/art/coverage.py` (BUILDER_COVERAGE.md) — a65 must be green for every women group.
Owner 3d2 addendum (ROOT-36 01:28Z): frontal rewrite changes ONLY body/face direction words; never add stiff wording except where a CALM rule already says so. My spec5 addition is direction words only (", body and face frontal, facing the viewer squarely, no turn"); the nude "standing still" sentence is the pre-existing approved calm rule.
emperor-B/build.py: I am NOT editing it any more — W107b may take it.
Guard method: scratch snapshot of every command (c01–c32 × 5 ages × all modes ± --spec5pose), diff before/after, report changed groups; run with PYTHONDONTWRITEBYTECODE=1 (a tracked .pyc in __pycache__ breaks rebases).
