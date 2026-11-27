# SIL-EUNUCH — report (worker sonnet, Foreman C ROOT 3-1-1-1-1-1-1, order MAIN 172 / report to MAIN 173)

PRIORITY #1 CHECK ('silhou|unknown-fig|người lạ|bóng người'): OD 6 | ledger 0 | claims 0 | main 15 | review/* 0 | archive 0 — plus main j59/j60/j90 read, review/kids-art + kid-age + CDN checked (below).

Branch **review/sil-eunuch** (base origin/main 4cd3f974). Commit sha in the status line. Not pushed to main.

## 1. Root cause
`personRoleRank` only maps stage *description records* when they have NO name (`p.kind&&!p.name`). The records j95 puts on a place stage
(`{kind:"ksp"|"peddler"|"npc"|"elder"|"serv", ini:"Hoạn", info:"Thái giám…", sid, lid:"c:…"}`) carry a name and no `.role`, so a stranger
eunuch fell to role `other` = sex `f` and every silhouette picker gave `unknown-fig-f`. Live proof on the OLD build (Fold, stage with
`npc` eunuch «Tiểu Mậu Tử», `npc` c: «Tiểu Lộ Tử»): both stood as `unknown-fig-f.webp`. The same rule was copied by hand in 8 places, each
slightly different (j59 slot fill had its own kind list, j59unk a src regex, j60 hook, j87, j90 ×2, jreveal, kitPhFigG).

## 2. Fix (law 11, whole group, law 9 one helper)
ONE helper `kitSilG(p)` (dev/build/j60.js, next to personRoleRank) = letter by ROLE: `k` kid · `e` eunuch / Thái giám / Tổng quản (new) · `m` other men
(Emperor, official, physician, guard, prince, man) · `f` women. Reads personRoleRank (also of `p.ref`), then the record shape
(kind ksp/peddler/ty/min/man, ini Hoạn/Y/Quan, rk eu*/off, lid c:*, sid → staff role, info text), then sex/age. Wired into: j59 slot fill, j59unk,
j60 stage hook, j87 week book, j90 kitFigOf + kitSilFig, jreveal krvSex (stone-frame unknown-<g>); kitPhFigG (loading stand-in) says `e` for fig-eun*/ksp/thaigiam.
Preload / measure / CSS lists extended for `e`: jload KIT_SILBB (measured with the game's own kitFigBody), j61 K61U, jimg, jph kwait CSS, jkit KIT_FIG.fac (men ×1.07 for e too), first-hour.txt, headtop (fig-ht 175 on CDN + git copy + headtop.py SILS).

### Before / after table (letter shown; test dev/test/sil-role.js, Fold; iPad identical)
| role / record | j59 slot (stage) OLD→NEW | kitSilFig (dialog, book) OLD→NEW | krvSex (stone frame) OLD→NEW |
|---|---|---|---|
| eunuch · staff npc (sid) | f → **e** | f → e | f → e |
| eunuch · ledger court npc (c:) | f → e | f → e | f → e |
| eunuch · servant (kind serv + ref) | m → e | f → e | m → e |
| eunuch · maid-kind + ref | m → e | f → e | f → e |
| Tổng quản (ksp) | m → e | f → e | f → e |
| thái giám Nội vụ phủ (peddler) | m → e | f → e | f → e |
| thái y (ty) | m → m | f → m | f → m |
| quan (min) | — → m | f → m | f → m |
| Hoàng thượng (emp) | m → m | f → m | f → m |
| man (ref) | — → m | f → m | m → m |
| maid npc (sid / mm:), ma ma, thái hậu | f → f | f → f | f → f |
(OLD kitSilFig/krvSex columns measured on origin/main index.html with the same records: 10 of 14 wrong; NEW 14/14.)

## 3. Art — the man silhouette DID read wrong for a eunuch
Looked at unknown-fig-f/m/k side by side: `unknown-fig-m` is a mandarin with the wide-winged official hat (ô sa), so a Thái giám would stand as an official.
Painted ONE new one with Magnific gpt-2-6 (folder ba4aecfe…, reference = unknown-fig-m for pose/grey/mist; 2 variants × 80 credits = 160 credits, picked the one with ground mist),
cut/tightened alpha, resized to 1350 px tall (549x1350), grey matched to 150: **img/kit/unknown-fig-e.webp** (stage) and **img/kit/unknown-e.webp** (768x1012 bust for the stone frame,
cut from the figure, same row gradient as unknown-m). Both uploaded to the CDN (200 OK); img/fig-ht.json on the CDN +1 key (9329→9330, grows only). Looked at every image: side-by-side sheet, bust sheet, 4 game shots.
Note: the new silhouette is slimmer than the official (soft cap, belted round-collar robe) — that is the point.

## 4. Shots / tests (looked at all)
- Fold 755x1000@2 and iPad 1180x820@2, stranger eunuch «Tiểu Mậu Tử» (unknown-fig-e) and stranger maid «Tiểu Hạnh» (unknown-fig-f) for contrast: scratch only (/tmp, not in git, not CDN). Eunuch reads as a man with a cap, maid as a lady, same size/grey/mist, no overlap, name tags fine.
- `node dev/test/sil-role.js index.html 755x1000|1180x820 shot.png` PASS (14 records × 3 pickers + stage tokens); added `e` to dev/test/entry-blank.js silhouette-box check.
- `bash dev/tools/quickcheck.sh`: see status line (build is committed, old-save load included).

## 5. KID (plan only — no painting)
Checked CDN + branches: **full-body kid art already exists on the CDN**: `img/fig-kid-f##` (24 identities fNN) and `fig-kid-p##` (pNN) × 7 age bands (a4…a51) = 168 fig + 168 por each, list in `img/FIGURES-kids.json` (200 OK). Branches review/kids-art (c7cc2f52, 24 princes + 24 princesses, 4 ages) and review/kid-age (b60e2e74, card age text) are **NOT in main** (merge-base check) — only j73's `kidFig` wiring is on main (reads FIGURES-kids, draws `.figimg.kidfig` on a stage token of kind "kid" with a ref, height by age band KIDH).
So the grey kid on the iPad stage is NOT a missing-art problem. Two candidate causes, not yet reproduced (out of this order's scope): (a) the child is still a «stranger» (face not yet seen → intended grey unknown-fig-k, same rule as adults); (b) kidFig(k) returns null for kids without an assigned identity (assignment runs in render via KIDSIG; old saves) or the stage token is the description-record kind (no `.ref`) so j73's loop skips it (`p.kind!=="kid"||!p.ref`).
Plan for a worker KID-STAGE (small, ~1 worker, 0 art credits): 1. reproduce on iPad 1180x820 with a real kid (born + met + not met); 2. if (a) intended → nothing; if (b) wire `kitSilG` kid rule + kidFigSrc into the same `.tok:not(.fig)` loop and the j59 slot fill; 3. check review/kids-art is landed (ask coordinator) because the 4-age/48-kid set is only complete there; 4. Fold + iPad shots of a prince at 4/9/14/20. If more kid art were ever wanted: 7 age bands × 2 sexes already exist per identity — no new painting planned.

## Handover
Done in one context (~45 %). Nothing pending except the coordinator's review of review/sil-eunuch and the KID-STAGE worker.

## 6. quickcheck — PRE-EXISTING on main (re-run per FOREMAN C, quiet box, back to back)
Rebased review/sil-eunuch onto origin/main 98c77517 (index.html/sw.js conflicts = rebuild) → local **a366a2b8** (the force-push of the rebased branch was DENIED by the permission classifier, so origin/review/sil-eunuch is still the old 452dda71; coordinator: allow it or tell me a new branch name).
- branch a366a2b8: `QUICKCHECK FAIL · CORE GATES FAIL · G4 80-dialog-fixed · 850 s` — «FAIL 1180x820/755x1000 frame size XL: left figure same size + position in 5 dialogs» (figure heights 770 vs 767 on 3-dai-ket-cuc). open OK, **old save ok**, perf NOT a failure (tabMs runs 574/567/452, no perf FAIL).
- origin/main 98c77517: `QUICKCHECK FAIL · CORE GATES FAIL · G4 80-dialog-fixed · 874 s` with the SAME FAIL line and the SAME numbers (770/767 px, same x/y/w/h) → **PRE-EXISTING on main, not caused by this branch** (dialog figures, not stage silhouettes; the gate that failed on my first run, 95-next-dead, passed this time → that one and the perf tabMs blip were load noise/flaky).
- sil-role.js PASS on a366a2b8 (Fold).
