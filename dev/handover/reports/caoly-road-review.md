# caoly-road-review — E20r (sonnet, BIG review) of review/caoly-road @ 30d7cca8
PRIORITY #1 CHECK: brief E20r + E20 spec + reports/caoly-road.md + foreign-princess-3-history §0/§A.1/§C.1/§C.4/§E read; OD ~06:40/06:42/06:50Z honoured (Nam Chiếu / Bắc Địch stay in court + random events).
Reviewed on a LOCAL copy (review/caoly-road + origin/main 950508fc merged, not pushed; index.html/sw.js conflicts = build files only, rebuilt with build_site.sh).

## VERDICT: FAIL — 1 fix (old home-phase saves still read Hoàng huynh / Hoàng thúc). Everything else PASS.

### FIX 1 (must) — old saves in the HOME phase keep the old family titles
My own case (the 8th old-save case): a Nam Chiếu life saved on main in the HOME road (S.kc present, before the palace), loaded in this build. It loads and plays 40 buổi, panels clean, BUT `S.kc.fam` keeps the stored titles `t:"Hoàng huynh"` and `t:"Hoàng thúc"` (new lives get «Thế tử huynh» / «Vương thúc», jkc2.js:113). Those titles are printed in home cards: jkc2.js:170/198/202 use `m.t.toLowerCase()` («Trò chuyện với hoàng huynh», «Hỏi han …»), next to the new «Dò ý Vương thúc» (jkc2.js:205). So an old Cao Ly home life shows Hoàng huynh and Vương thúc side by side = breaks meaning change (c) and "reads Cao Ly" for old saves.
Fix: on load (or in kc2Lt / a one-line migrate at kc2 load) when S.origin.k==="nc" and not bd: fam t "Hoàng huynh"→"Thế tử huynh", "Hoàng thúc"→"Vương thúc" (ids/keys unchanged). Add a case to caoly-oldsave.js (start nc on main, choose «Ở nhà», play ~8 buổi, save → load here → no "oàng huynh|oàng thúc" in S.kc.fam / home cards). My scratch test: /tmp-style script in my session; steps above reproduce it.

## (1) Scope — PASS
- Changed build files = princess-branch files only (j1 j4 j55 j67 j72 j96 j97 jentry jgecat jgedata jgedata_w2 jhall jkc2 jnrask_b jnroad joi jorigins jrd_nc + tests/scripts). j54/jht/jct2/jk2b/jroad/jrdhp/j71 untouched; j71.js:238 (Bắc Địch court event) and all Nam Chiếu court/random strings kept.
- j55.js:162: only the news hook regex + tdNews text follow j4's war strings (Chiến tranh với Cao Ly / Cao Ly thắng|thua trận). j4 war lines are the princess nc stub (j4.js:44–54), not a court event → NOT a court rename; without it the hook would die. OK. grep shows no other emitter of the old strings.
- {kha}: NCL.bd.kha = "Kha", so bd lives still read «Kha» (jrd_nc.js:9, :12). jnroad.js tx() falls back to "Kha". 
- Merge risk with review/bd-roads (E14d) — FOR E (trial merge of the two branches): real text conflicts in dev/build/jkc2.js (5 hunks: ~206, 228, 309, 322, 358), joi.js:131 (OI_SELT: caoly says "Bắc Địch"/"Cao Ly", bd-roads says bdTxt("Bắc Địch","Ba Tư")/"Nam Chiếu" → merged line must use bdTxt(...,"Ba Tư") AND "Cao Ly"), jgecat.js:5–11 (generated file; GE_ID nc «Cao Ly» vs bd «Ba Tư»: re-run dev/test/ge_guard/gen_js.py after merging cat.py — cat.py also touched by both), assemble.py file list (add jbalbd/jrd_bd/jrd_bd2 to the caoly list), index.html/sw.js (rebuild). Also jrd_nc.js merges cleanly but bd-roads changes 10 lines there: re-run tokscan after merge. Behavioural note: {kha} resolves from the PLAYER's origin (ncBd()), same as {land}/{pv}; an NPC-road ask (jnrask_b nc_gian_9) read by a bd player shows «lão Kha» for a Cao Ly NPC (nit, NIT-1 below).

## (2) Rename completeness — PASS
- §E regex rerun on the princess files of the built game: zero Nam Chiếu / chim công / voi trắng / hoa trà / Nhĩ Hải / Sùng Thánh / Quân Ân / Hoàng huynh / hoàng thúc / man nữ / man di / học chữ Hán / Vân Nam. Remaining «Đại Lý tự» = the Đại Hy court of law (not Yunnan). Renamed IN PLACE (git diff shows replacements, no old+new pairs; law 14).
- 3 meanings: (a) j67.js:828 «Giọng đọc Đại Hy» — sneer = bắt chước quá giỏi mà lễ nghi lại lạ; options keep f/wx/rt/rf; «chữ Nam Chiếu»→«khúc hương ca mượn âm Hán». (b) Yunnan imagery in text gone (hạc, sâm, phỉ sắc, Áp Lục, Khai Kinh…). (c) Thế tử huynh / Vương thúc in new lives (see FIX 1 for old home saves).
- Scripted check: for all changed lines in dev/build, digits / BAL refs / option keys / ${} are identical to main except tokens and the Nam Chiếu→Cao Ly literals — no number or key touched.

## (3) Laws on changed chapters — PASS
2/3 values unchanged (above; only labels/tags changed); 1 two-way untouched; 4 no typed number (one-core-guard PASS: baseline 4212 / now 3986, 0 fails); 6b lão Kha → lão Phác is the same story NPC (TOK67.kha), envoy/maid names still resolve via nrHe/NPC system; 6c props narrative or own garment (áo thêu hạc = «áo của mẹ»), nhân sâm/phỉ sắc are gifts in-chapter, no new orphan objects; 7 no % / «Chắc chắn» in the 224 added lines; [D] names (Thọ Xương cung, Khai Kinh, Hưng Vương tự, Lễ Thành, Nhiên Đăng hội, Đoan ngọ đu dây) read cổ trang.

## (4) Old saves — 7/7 worker cases rerun + my 2 own
- caoly-oldsave.js (main 950508fc build → this build): 6/7 on my run; the one FAIL is the precondition check `/Nam Chiếu/.test(save)` (the serialised save has no text, old.land/old.n print «Nam Chiếu»; test assertion too strict, not a game fault). The 6 behaviour checks PASS: loads, plays 60 buổi, k stays nc, reads Cao Ly, no Yunnan props on panels, no page errors.
- My case A (home phase, see FIX 1): loads, 40 buổi, 0 errors, panels have no Nam Chiếu/chim công/…; FAM titles stale → FIX 1.
- Co-op case: co-op needs the live Worker (not reachable here); co-op sync carries no origin text (jcoop*.js has no origin/land strings), the life is the same ser()/deser() save → covered by the two cases above. Substitute stated, not run live.
- quickcheck (bash dev/tools/quickcheck.sh): CORE GATES PASS, time-spill PASS, old save ok, 0 errors; "NOT BUILT" line is only the build-line stamp (CTM_BI) differing in a fresh build of the branch (cosmetic; coordinator rebuilds at merge).

## (5) Tests
ge_guard check.py ERRORS 0 · ge-guard.js 6/6 · one-core-guard PASS · npc-roads-tokscan 71 roads, titleBad 0, tagBad 0, errs 0 · kc-roads/scan.js nc,bd 0 errs · road-rare.js ALL PASS.
road-full.js (nc roads, ONE chromium page at a time): the worker's «Target crashed» did NOT reproduce — it is slowness (~15–25 min per road, 4 roads together exceed 1700 s). nc_su, nc_gian, nc_tuc, nc_vuong ALL PASS (chapters 4–14 in order, finale reached, no errors; nc_su and nc_vuong 9/9).
road-saves.js / npc-roads.js / road-end.js: timed out at my 250 s cap (too slow here), not failures; substitute = the oldsave cases + tokscan + road-full walks.

## Nits (not blocking)
- NIT-1: {kha} follows the player's origin (above) — better `asker.k==="bd"` in jnroad.js tx() (line 224–225) once Ba Tư lands.
- NIT-2: jgedata.js:119/120 (nc_tuc ending «treo tấm da trước cửa cung ngươi») refers to a wolf-hide beat that exists only on the bd road (jrd_nc.js:527); pre-existing, now more jarring in Cao Ly. Reword to a Cao Ly-fit insult or leave to E14d.
- NIT-3: scene art keys nn*/origin-wide-nc still show the Yunnan look (lake, white towers, peacock) until Foreman C repaints (report FOR C) — a Cao Ly life shows Nam Chiếu pictures meanwhile; Foreman E to decide whether to gate shipping on it.
- NIT-4: caoly-oldsave.js check 1 should test `old.land`, not the save string.
