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
