
## REVIEW (RV-KK39)

PRIORITY #1 CHECK: OD 26/11 ~08:05Z («Tiến bộ» = progress inside the current bậc only) + 25/11 unit «phần» | main KIT §21.2, §6.7 | review/* review/kit-bac-progress, review/kit-empty-rows | claims KK39.

Branch review/kit-bac-progress cb221604 (on LIVE 6b5d3d05 + tainghe r5 88bd567f). Reviewed by RV-KK39 (SMALL reviewer), 26/11.

**RESULT: PASS**

Checks (Fold 755x1000 + iPad 1180x820):
- `node dev/test/bac-progress.js index.html`: PASS, 206 ok lines, 0 FAIL (LIVE 3af7896e: 72 FAIL + crash on the missing `crsAfterW`).
- Law 11 family scan: every skill card with a bar (Tứ đức, Cầm kỳ thi họa, Vũ Y Nữ công, Tác phẩm, at bậc 0–4 with mid-bậc progress) reads «<tên bậc> · Tiến bộ c/n» with no `.ksteps` and no repeating kicker; c/n = `crsProg` (phần inside the bậc), never a 0–100 total. Lễ nghi «Vòng», chapters «Hồi», pets, mood cards have no bar and keep their steps (KIT §21.2). The «Năm bậc» panel lists `crsNeedP` per bậc.
- Law 4: all numbers come from `BAL.art.tier` / `BAL.art.gain` through `crsProg` / `crsNeedP` / `crsAfterW` (one function each, jbalcore); no typed number.
- Law 9: only `kitSkillCard` / `kitBar` are used (kit parts, no private markup).
- `crsAfterW` dry run: state untouched; +1 on bậc 4 → «1/38», +99 → «Tông sư», top → «Tông sư».
- Old save made by LIVE loads in this build: bars read «Chưa thạo · Tiến bộ 1/5 | Nhập môn · Tiến bộ 2/10 | Thuần thục · Tiến bộ 3/19». 0 page errors new vs LIVE (0/0) on both devices.
- Merge onto LIVE 3af7896e: sources merge cleanly; only built files conflict (index.html, sw.js, dev/site/CHANGE.txt) = rebuild at the LAND slot as usual. Merge with review/kit-empty-rows: only index.html + sw.js (built).

Numbered notes (none blocks PASS):
1. At Tông sư (bậc 5/5) the card has no bar and no «đã tinh thông» line: it shows the name «Tông sư» + «Bậc 5/5» steps. That is KIT §21.2 («a finished course keeps its steps»), one reading, no bar to clash with. If MAIN wants a full bar or «đã tinh thông» there, that is a new owner-visible change (not in the OD).
2. `jtd.js` tdFinish logs use `crsAfterW(S.vir,S.virp,k,0)` AFTER `addVir`, so the Tứ đức log line shows «+g · c/n» of the new state and never «lên <bậc> · 0/n»; the level-up is logged by the separate «lên bậc» line of `addVir`. The lesson logs of j23 (dry run BEFORE `addArt`) do read «lên …». Cosmetic; KIT text says jtd too.
3. Dead legacy markup («Bậc l/5» + «Tiến bộ prog/(l+2)» raw points) still sits in `j23.js artTabHTML` and `j85.js` card(); both are overridden by `ktArtHTML` (jtabs.js:68) and never rendered. Remove at the next canon pass (law 14).
