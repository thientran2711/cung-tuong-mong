# kit-opt-text — report (kit-mark, KP14; MAIN decision: the text gets the width, the picture shrinks)

Branch `review/kit-opt-text` @ 39faf7c0 (from LIVE 7a35db20). `bash dev/tools/quickcheck.sh 39faf7c0`: everything PASS except G4 50-coop-one-world seed 3 «guest week changes the world» = the known seed-3 flake; rerun SEED=7,3,3 on this build: PASS ×3. `golive.sh` not run (classifier refuses).

## Finding
On Fold 755x1000 the options sit in a 304 px column beside the figure (class k3rows); the picture card left 188 px for the text. Main already lays them in ONE column (KP14's old «143 px columns» is gone).

## Fix (KIT §13.13)
jk3 option layout adds `.k3tight` to a single-column group narrower than 340 px; its `button.ka.kart` pictures shrink to 62x84 (inline important — a CSS rule lost to older high-specificity rules) and the gap to 7 px, removed again on relayout. Text column 188 → 213 px. Test `dev/test/kit-opt-text.js` 5/5 (picture ≤64, text ≥205, one column).

## Not shown
No before/after screenshot: the loader card covered my shots; measured in the page instead (84x112 picture + 188 px text → 62x84 + 213 px).
