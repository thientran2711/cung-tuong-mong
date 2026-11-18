# nw-poem — no-word-games, family A (Thơ + Câu đối)
Worker for Foreman B. Branch `review/nw-poem` (contains origin/main 802fe821). Owner rules: OD:L1265 (no word games), OD:L1266 (MEDIUM, Tuyệt phẩm 20–30 % skilled at matching level), OD:L1267 (ONE CORE).

## What was replaced by what
| Kind (key kept) | Old (word game) | New (non-word) | Engine |
|---|---|---|---|
| `tho` Thơ / Thi | k91Verse: drag words into a lục bát line, rhyme by ending | **Thư pháp đồ nét**: 3 glyphs (2–5 strokes, e.g. Chữ Thập/Nhân/Đại/Vương/Hòa), strokes numbered, traced IN ORDER; score = progress along the stroke × accuracy^1.6 inside the lane | `calli` (jnwp.js) |
| `doi` Câu đối | k91Pair: thread a word to its counterpart word | **Đối nét bút**: left scroll shows brush marks (chấm/ngang/sổ/phẩy/hất); right scroll must get the MIRROR image of the mark on the same row (tray tiles, drag or tap-tap; decoys = other marks or the un-mirrored copy). 3 rounds of 3–5 pairs | `doiline` (jnwp.js) |

Both keep the kind keys, so j71 SC7 contests, j82 `startContest`/`playArt`, j83 works, jrcp teacher lessons, jkc Phúc tuyển, jveil, `openMG("thi")` (KG82_MGL.thi) need no change. Same 0–10 `env.end` scale → j83 work tiers / j71 skill scale untouched.
Same easy rules as mg-easy / Tứ đức: first-time demo card (S.mgSeen keys `nwcalli`, `nwdoi`; old saves start unseen), **Gợi ý** button (costs `BAL.nw.*.hintCost`, never blocks), quiet auto-hint when she stalls (Dễ/Vừa), wrong drop bounces back with a soft line, ghost aids on the board at Dễ only, no word has to be read or known (only the Vietnamese rules text).
Difficulty: ONE hook `nwTier(kind, env)` → `KG82.tier` when mg-balance's `mgSet` ships (and `mgFull(env,b)` for the capped score, float `env.end`), else `kg82Tier(env.lv)`. Every number is in `BAL.nw.calli` / `BAL.nw.doi` (top of jnwp.js, assigned onto the one BAL object; mg-balance may move them to jbal2 with the rest of `BAL.mgTier`).
Visuals: kit game frame + existing painted boards (`mg-tho-bg(-hoc)`, `mg-doi-bg`, `tho-slip`, `ve-brush`, `ve-inkstone`) — NO new art, no Magnific, no new CSS; helpers `k91Tile/k91DemoCard/k91Btns/k91Say/k91Glow`. Marks are drawn on the canvas as variable-width brush shapes (like the existing ink strokes of Vẽ).

## Entry-point scan (dev/test/nwpoem-scan.js, before → after)
| Entry | Before | After |
|---|---|---|
| contest `tho` (j71 SC7 → startContest; fest "Thi thơ", Thanh minh, Trung thu, Trùng cửu, Giao thừa…) | verse | calli |
| contest `doi` (Tết, Giao thừa; Tranh ghế thi tài) | pair | doiline |
| plain art `thi` (playArt: j83 works "Viết thơ, thư pháp", jrcp teacher, jkc Phúc tuyển, jveil) | verse | calli |
| lesson `thi` (KG82_MGL → openMG, Tài nghệ tab) | verse | calli |
| engine registry `verse`, `pair` | registered | **unregistered** (`delete KG82_ENG.verse/pair`) |
| j82 quiz bank `doi` (`KG82_KIND` with e:"quiz", b:"doi") | tho, doi | none |
| j5 `MG.thi` quiz (DOI) | unreachable (shadowed by KG82_MGL) | unchanged, still unreachable |
Scan exit 0 (no word engine reachable for tho/doi, 0 page errors). Dead code left in place on purpose (j91 k91Verse/k91Pair/K91_LB, j82 bank, j5 MG.thi, DOI in j5): deleting it touches lines next to nw-lantern/nw-quiz edits → merge conflicts. Delete after A/B/C have landed (mg-balance report lists it as UNASSIGNED dead banks). `exam` (jexam) was not touched: its `thi`-art round goes through `playArt`/`kg82Play(kind)` with the same keys, so it now plays the new games automatically; its quiz rounds (le/tc/xa/thq) are family C.

## Tests (headless Chromium, oracle bot via `KG82.peek`)
Open → play → finish with perfect play, no page error, no horizontal overflow (`dev/test/nwpoem-play.js`, LV=2, clocks stretched because the sandbox renders ~7 fps even for the existing games — measured: tho 6.7, doi 8.3, ve 7.3, dan 8.0 fps at 1366x1024@2):
| Size | tho | doi |
|---|---|---|
| 755x1000@2 | 10 | 10 |
| 1000x755@1 | 10 | 10 |
| 1180x820@2 | 10 | 10 |
| 1366x1024@2 | 10 | 10 |
| 844x390@1 (board scrolled into view as the existing `ve` needs) | 10 | 10 |
| 390x844@2 | shows the standard "Xoay ngang điện thoại để chơi" prompt; 10 / 10 behind it | |
A few single runs under heavy parallel load returned 0 / 6 / 8 (guard 97 s or a stalled drag of the harness); each passed on re-run, and 16/16 error-free bot runs at 1180x820@2 gave 10 (`PERR=0`), so I count them as harness flake, not engine stalls. Demo cards, hint, lesson (`openMG("thi")` → "Thi: thư pháp đồ nét"), `playArt({art:"thi"})` and `startContest` all open the new games. Old save: no save-schema change (only new lazily-created `S.mgSeen` keys).
Screenshots were viewed (demo cards, play boards, 755 / 844 / 390) and deleted.

### Calibration (dev/test/nwpoem-bot.js, real-time bots, n=12 each, 755x1000@2)
Skilled bot model: tho = finger path jitter σ 8 px (AR 0.85) + 10 % slip burst per stroke; doi = ~1 s think + wrong-tile chance 4 / 12 / 20 % by tier. Random bot = random strokes / random tile→slot drops.
| Game · tier | skilled mean raw | ≥9 | =10 | random |
|---|---|---|---|---|
| tho Dễ | 9.75 | 100 % | 75 % | ~0 (0.13) |
| tho Vừa | 9.17 | 83 % | 33 % | |
| tho Khó | 8.25 | 25 % | 0 % | 0.0 |
| doi Dễ | 9.42 | 75 % | 67 % | |
| doi Vừa | 9.08 | 83 % | 42 % | |
| doi Khó | 7.5 | 33 % | 0 % | 0.0 |
Reading: random ≈ 0 everywhere (owner target met); skilled at Khó lands in the 25–33 % "Xuất sắc/Tuyệt phẩm" band, Dễ/Vừa are intentionally easy (aids on the board). Caveats: (1) bot error rates are my own model and the sandbox is slow, so treat this as a relative table; (2) after this run the tho lane was tightened once more (`tol` .044/.036/.028 → .04/.032/.026) without a full re-run, so tho will be a little harder than shown; (3) the final calibration belongs to mg-balance's virtual-clock bot (`dev/measure/mg-bots.js`) and `BAL.mgTier.kAdj` — both games expose `KG82.peek()` ({drag:…}) for it. The timer of each game keeps the whole run under the j82 guard (97.5 s).

## KIT REQUEST
None. (Board paintings, slips, buttons, frame all existing kit/j91 parts. If the reviewer wants the scroll strips and mirror axis as a kit part, say so: they are plain canvas rectangles + dashed line today.)

## Questions for the coordinator / owner
1. The festival names/blurbs in j71 still say "Thi thơ…", "Hoàng thượng ra vế đối…" while the minigame is now brush work. The owner's rule says same art/occasion, so I left the text; a separate pass could reword them (not mine: j71 text is shared with the Family C/B workers).
2. mg-balance proposed picture motifs (núi↔sông…) for Câu đối; I used mirrored brush marks (calligraphy-native: phẩy↔mác) because it needs no new paintings while art is paused. Easy to swap the mark set later.

Files: `dev/build/jnwp.js` (new), `dev/build/assemble.py` (+jnwp.js after j91.js), `dev/MINIGAMES.md` (two rows), `dev/PROGRESS_nw-poem.md`, `dev/test/nwpoem-{play,bot,scan}.js`, rebuilt root `index.html`/`sw.js`/`assets.json`.

SẴN SÀNG KIỂM eb5f223953b90ffd941dff109bd51fb93a0d8302
