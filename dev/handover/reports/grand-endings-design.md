PRIORITY #1 CHECK ('đại kết cục|grand ending|GRAND_ENDINGS|kết hiếm|RARE_ENDINGS'): OD 2 (L1601, L1613) + related L644/L1072/L1243/L1252/L1306–L1324/L1327/L1386/L1402/L1403 | ledger 0 | claims 2 (D STATUS L360/L361 order lines only) | main 15 (j97 + RARE_ENDINGS.md, j67 ARC67, jroad/jrd_*, jend14, jdh/jtitle, j90 Bảng vàng, j32 Sổ luân hồi, jagent) — reused, nothing rebuilt | review/* 0

# GRAND ENDINGS — design report (for main s32 to show the owner)
Worker: opus design worker session_01964izFDJ18FWz2tTcPJvcK · brief dev/handover/briefs/D9-grand-endings-design.md · START_CTX ≈ 4 %, now ≈ 16 % (no rollover).
Files: expert research `dev/handover/reports/grand-endings-expert.md` (step 1, pushed first, 8f20a457) · design `dev/design/GRAND_ENDINGS.md` on branch **review/grand-endings-design** (from live main 25bfd7cf…, design data + catalogue checker in dev/design/ge_guard/, no game code) and a copy on this docs branch at dev/design/GRAND_ENDINGS.md.

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

## Decisions for HER (options; recommendation first)
- **D1 Counts**: 4 grand (+ fail twins) · 2 rare · 3 normal, all open at start (**recommended**) — or 2 grand per branch.
- **D2 Bắc Địch**: its own 4 roads inside hòa thân → 40 branches (**recommended**, her "10 × 4 = 40") — or share Nam Chiếu's roads (her 16/11 rule OD:L1213/L1215). These two lines pull apart; she should pick.
- **D3 Last two choices**: right after chapter 14 (**recommended**) — or at chapter 11.
- **D4 After a grand ending**: stay-endings continue the life; leaving / throne / foreign-crown endings close it with an epilogue (**recommended**) — or all close — or all continue.
- **D5 Carried title**: only the last life's, looks only (**recommended**) — or any ever earned — or a small bonus.
- **D6 Show the funnel?** a quiet count «Còn hai ngả lớn chưa khép» without names (**recommended**) — or nothing — or names of endings already reached in earlier lives.
- **D7 Odds on the last two choices**: hidden (**recommended**) — or show the odds word (would reveal which pairs are live).

Gates: design only — no code, no BAL, no game file touched; one-core / quickcheck / shots not applicable. Conflict markers on this branch: 0.

(r1 was 6580bfae, superseded)
DESIGN READY 96b6f18b0b5309b61be11959ad206bf3f6ce3dde
SẴN SÀNG KIỂM 96b6f18b0b5309b61be11959ad206bf3f6ce3dde
