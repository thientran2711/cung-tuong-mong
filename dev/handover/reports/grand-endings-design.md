PRIORITY #1 CHECK ('grand-endings|GRAND_ENDINGS|đại kết cục'): OD 4 | ledger 0 | claims 8 | main 0 | review/* 1 (review/grand-endings-design r2 96b6f18b = the base revised; reused, not restarted)

# GRAND ENDINGS — design report r3 (for MAIN s33 to show the owner)
Worker: opus design worker session_01964izFEk4tjfDFmF5Rz6mu for Foreman D #10 · brief dev/handover/briefs/D10-grand-endings-r3.md · START_CTX ≈ 4 %, now ≈ 13 % (no rollover).
Owner words folded in (read verbatim in OD): ~14:30Z grand endings (L1613, rule (1) overwritten), ~14:55Z correction (L1618), ~15:25Z batch point (1) ENDINGS (L1623–L1624).
Files: `dev/design/GRAND_ENDINGS.md` on **review/grand-endings-design** (r3 commit below; design data + checker in dev/design/ge_guard/, KIT REQUEST in dev/kit/KIT_REQUESTS.md, no game code) + a copy on this docs branch at dev/design/GRAND_ENDINGS.md.

## REVISION 3 — what changed (owner batch 17/11 ~15:25Z (1))
1. **Per branch: 4 grand endings + 2 kỳ ngộ. No normal endings.** Each grand ending has ONE fail outcome (kết cục thua) — that IS the "normal" ending now (the reverse of the grand ending); missing a grand ending = its fail outcome. The 3 normal endings are removed everywhere (counts, catalogue, guard, worked samples, BAL `ge.n` = {grand:4, rare:2}, NPC parity). The road finale .11 win/mid/lose (already on main) becomes a chapter result like .5–.10; its «Kết cục xuất thân» label gets a chapter word so «Kết cục» means only grand / fail / kỳ ngộ.
2. **Every life lands on one of 8 outcome nodes** (4 grand, 4 fail): last two choices → an open ending → odds → grand (in a shading) or its fail with a loss; a closed / fail-only ending → its fail with a loss; a pair that points to no ending → the fail outcome of the ending she pulled hardest toward, quiet form, no loss, «Cuộc đời ngươi vẫn tiếp tục như thế.»
3. **Option C — thiện / ác shadings inside each grand ending.** Same destination, same pair, same reward size; different title, narration, scene light and world attitude. Picked by a hidden lean = her tagged story choices (+ kind / − cruel) + the change of Đức over the life (existing stat, ONE CORE) + Ngã rẽ 2 (ân + / uy −). Strong lean → that shading; middle → the ending's natural shading. **320 unique titles** (2 × 160), each unlocked the first time it is earned and kept in the Sổ luân hồi collection («n/320», per branch «n/8»). Example: «Nữ đế hiền minh» vs «Ngai vàng họ ngoại»; «Tỳ nữ mẫu nghi» vs «Tỳ nữ lên phượng».
4. **Sơ đồ nhánh in Sổ luân hồi only**: per branch a node chart — chapters (.4 … .11, ch12–14, Hồi kết nhánh), 2 kỳ ngộ, 4 grand endings × 2 title slots, 4 fail outcomes. Found nodes show their name, unfound show «?». This life: her face chip on the chapter she is in, and each grand ending marked còn mở / chỉ còn đường thua / đã khép (with the chapter that closed it) = "đang chơi tới đâu". "Cần phải làm gì": tapping an ending she has found before shows its two last choices and its condition in words (so she can aim for the other shading); «?» shows nothing more. KIT REQUEST filed: `kitBranchMap` + a 2-tone "Thiên mệnh" title plate (kit keeper first).
5. **Kept from r2**: no destined ending; all open at start; funnel closes; last two choices; title = only carry-over (now the shading title); Bảng Thiên mệnh; NPC parity (same set, funnel, shadings, titles; no chart for NPCs); variety guard. **ge_guard re-run: 0 errors** — 40 branches · 160 grand · 320 titles · 160 fail outcomes · 80 kỳ ngộ · 0 normal.
6. **3 worked branches updated** (tt_co, bd_soi, cnv_mat): 8 outcome nodes each, both shading titles + the other shading's narration, fail outcomes, lean-tag examples.
7. Art (later, Foreman C): 160 scene compositions × 2 shadings (the ác shading is an edit of the same painting); fail outcomes reuse the .11 chapter picture; plate + Kim sách icon.

## Owner summary (points ready to put in Vietnamese)
- Each story branch now has exactly 4 grand endings and 2 rare (kỳ ngộ) endings. No extra "normal" endings: if you miss a grand ending, you get its losing side.
- Every grand ending has a kind side and a cruel side. Which one you get depends on how you lived the whole life (your choices and your Đức), not only the last choice. Each side has its own title — 320 titles to collect in all.
- A title is unlocked the first time you earn it and stays in your Sổ luân hồi forever; only last life's title can be worn in the next life.
- Sổ luân hồi has a branch chart: what you have found shows its name, what you have not shows «?»; it marks where you are in this life and which big endings are still open or already closed, and for endings you found before it shows how to reach them again.
- Nothing is forced: kind and cruel roads are equal, same size of reward.

## Decisions still open (recommendation first)
- **D2 Bắc Địch**: its own 4 roads inside hòa thân → 40 branches (**recommended**, her "10 × 4 = 40") — or share Nam Chiếu's roads (her 16/11 rule OD:L1213/L1215). These two pull apart; she should pick.
- **D3 Last two choices**: right after chapter 14 (**recommended**) — or at chapter 11.
- **D4 After a grand ending**: stay-endings continue the life; leaving / throne / foreign-crown endings close it with an epilogue (**recommended**) — or all close — or all continue.
- **D5 Carried title**: only the last life's, looks only (**recommended**) — or any title ever unlocked — or a small bonus.
- **D7 Odds on the last two choices**: hidden (**recommended**) — or show the odds word.
- **D8 (new, small)**: a last-two-choices pair that points at no ending → the fail outcome of her strongest ending with NO loss (**recommended**) — or with its loss.
- Answered and dropped: D1 counts (4 + 2, no normal), D6 showing the funnel (chart in Sổ luân hồi only).

Gates: design only — no code, no BAL, no game file touched; one-core / quickcheck / coop-e2e / shots not applicable. ge_guard 0 errors. Conflict markers on both branches: 0.

---
## r2 report (history, superseded by r3 above)
## What exists today (audit)
- Every one of the 36 roads already has **3 normal finale endings** (.11 win/mid/lose) and **2 rare endings** (j97 at .4 + RD97L at .11). The 8 shared + 3 mid-life lines have 1 rare each. **There is no grand-ending layer at all.**
- Rare endings give a per-life title as **text only** (not wearable, not on the name tag). Wearable titles exist only in jdh (achievements, KIT §82, NPCs too).
- **Nothing carries between lives** (Sổ luân hồi / ctm-rare97 are memory only).
- **Bắc Địch has no roads of its own**: it plays the 4 Nam Chiếu roads with its own land words.
- NPC roads are not built yet → NPC grand endings must ship with them.

## REVISION 2 (owner correction 17/11 ~14:55Z, OD:L1613 rule (1) overwritten + L1618) — supersedes the first version below it
Reported to Foreman D #10 (session_01964izDpDf5BCzpbaaQ1Sxq).

## The design in brief
1. **No destined ending.** Each branch has a **fixed set**: 4 grand endings (each with its own FAIL ending) · 2 kỳ ngộ rare (already exist) · 3 normal (already exist). 40 branches → 160 grand endings, each with its own name = its title (≤ 4 chữ), all listed.
2. **All open at the start, narrowing as she plays**: her choices **pull** toward some grand endings and **close** others for good (each road chapter has a fork that closes at least one); typically 1–2 remain by the end. A choice — or losing the person/seat an ending needs — can leave only that ending's **FAIL** ending.
3. **The last two choices** (one hồi after chapter 14, same every life): *Đi hay ở* (stay humbly / take power / leave the palace / follow someone) and *Đối đãi thế nào* (mercy / force / let go). Each grand ending owns one pair. Pair → open ending: odds from her pull + one real condition decide **the grand ending** (big event, own scene, very large reward, title) or **its FAIL ending** (real loss). Pair → closed or no ending: «Cuộc đời ngươi vẫn tiếp tục như thế.», nothing forced.
4. **Three kinds defined** (doc §2.0): *normal* = the ordinary close of the road, always one; *kỳ ngộ* = a hidden chain of choices + luck, an unexpected door, title for this life; *grand* = the branch's destination, steered across the whole life, with a failure twin and the only title that carries to the next life.
5. **How other games do it** (doc §2.0b + expert report §3b): otome routes (good/normal/bad), Fire Emblem Three Houses (one fork closes routes), Witcher 3 (hidden tally of scattered choices), Detroit (chapter flowchart of closed paths), Mass Effect 2 (preparation + final orders), Princess Maker / Orange Light palace VNs (named endings, evil allowed).
6. **10 theme groups**, good and evil readings (4 nữ đế: 2 hiền, 2 bạo; 3 Thái hậu; 47 of 160 evil). Variety guard by script: 0 errors.
7. **Title = only carry-over**; **Bảng Thiên mệnh** per life (reuses Bảng vàng); **NPCs** get the same set and funnel with their own choices; her help/sabotage pulls or closes their endings.
8. **3 fully worked branches** (Tể tướng · Quân cờ; Bắc Địch · Sói đầu đàn, new road; Cung nữ · Ánh mắt) now show the funnel step by step and each ending's FAIL twin.
9. Numbers as BAL key names only (BAL.ge.*); art (160 scenes + plate + icon) for Foreman C later; build after the freeze.

## r2 decision list (superseded — the open list is in r3 above)
- **D1 Counts**: 4 grand (+ fail twins) · 2 rare · 3 normal, all open at start (**recommended**) — or 2 grand per branch.
- **D2 Bắc Địch**: its own 4 roads inside hòa thân → 40 branches (**recommended**, her "10 × 4 = 40") — or share Nam Chiếu's roads (her 16/11 rule OD:L1213/L1215). These two lines pull apart; she should pick.
- **D3 Last two choices**: right after chapter 14 (**recommended**) — or at chapter 11.
- **D4 After a grand ending**: stay-endings continue the life; leaving / throne / foreign-crown endings close it with an epilogue (**recommended**) — or all close — or all continue.
- **D5 Carried title**: only the last life's, looks only (**recommended**) — or any ever earned — or a small bonus.
- **D6 Show the funnel?** a quiet count «Còn hai ngả lớn chưa khép» without names (**recommended**) — or nothing — or names of endings already reached in earlier lives.
- **D7 Odds on the last two choices**: hidden (**recommended**) — or show the odds word (would reveal which pairs are live).

Gates: design only — no code, no BAL, no game file touched; one-core / quickcheck / shots not applicable. Conflict markers on this branch: 0.

(r1 was 6580bfae, superseded)
(r2 = 96b6f18b, superseded by r3 above)

DESIGN READY r3 52cdc078366075af6577519a3d5781a14a346964
