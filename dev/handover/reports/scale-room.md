# scale-room — "Phòng co giãn" (W17, Foreman C ROOT-15)

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 0 | main 0 | review/* 0. Reused: dev/build/jkit.js (KIT_FIG, kitFigTop), img/fig-ht.json (head top, 1/4000 of picture height), dev/art/headtop/headtop.py rule, W14 hairpin try-on pattern (images shipped as files beside the page).
START_CTX: low (~10 % of the window at start, own estimate; get_session not read). No rollover needed.

Link (private Artifact, `db` + `user` capabilities): https://claude.ai/artifact/D4NP5oJbtHfSPUBMTLHNe4
Owner must open it from her account (private; share via the page's Share menu if needed).

## Cách dùng (cho sếp)
1. Chọn bộ tranh ở ô trên cùng; vuốt ngang hàng hình nếu không vừa màn hình.
2. Hai vạch đỏ cố định: ĐỈNH ĐẦU và GÓT; mũ phượng, trâm được nhô lên trên vạch.
3. Chạm một người: bấm + / − hoặc kéo thanh để cao thêm, thấp bớt; ↑ ↓ hoặc kéo thẳng hình để nâng hạ.
4. Chấm vàng là đỉnh đầu thật: kéo cho đúng đỉnh tóc, thả tay thì hình tự co giãn theo; "Về mặc định" để làm lại.
5. Bấm "Lưu" (hoặc "Lưu cả hàng"); người nào đã lưu hiện dấu "Đã kiểm".

## Data
db collection `figs`, doc id = file name with non [A-Za-z0-9_-] → `_`; doc = `{file, headTop, scale, dy, by, at}`.
headTop = 1/4000 of picture height (fig-ht.json unit); scale = extra size on top of the head-top normalisation (1 = game way); dy = lift in body heights (+ = lower); by = viewer id; at = ISO time.
Read: ArtifactData list on `figs`. Convert: `python3 -I dev/art/scale-room/rows_to_ht.py rows.json outdir` → `fig-ht-rows.json` (file → headTop) + `scale-note.md`.

## Default head top
Live consort c12 t1..t8 a18: fig-ht.json row (176/226/220/232/291/234/330/399). Sample set (no rows): OpenCV Haar face box, skull top ≈ face top − 0.45 × face height (7 of 8); t8 fell back to painted top + 0.046 × body (edge rule). Estimates sit at the hair/bun top; she fine-tunes.

## Adding sets
Edit `dev/art/scale-room/sets_input.json` (swap file names, add sets), then run `python3 -I dev/art/scale-room/build_sets.py <outdir>` (list = `[{"id","name","items":[{"file","url","label"}]}]`) downloads each figure, writes display-size WebP (h 900, ≤150 KB; current 46–103 KB) + `sets.json`. Republish the artifact (same URL) with the new `sets.json` + `img/*.webp` via the Artifact `files` map. Saved rows survive republish. Sets now: (1) c12 a18 sample t1 r5 … t7 r5 (c12_a18_r5_t7_fresh) … t8 v2 r4, (2) live c12 t1..t8 a18.

## Checked
Playwright Chromium touch at 755x1000 and 1180x820: no page errors, no horizontal overflow, pick + enlarge works. Not exercised: the db write (needs her signed-in click); `figs` read returned empty as expected.

## Files
dev/art/scale-room/index.html, sets_input.json, build_sets.py, rows_to_ht.py. Images are not in git (they live in the artifact).
Page source: dev/art/scale-room/index.html (publish with sets.json + img/ beside it).
