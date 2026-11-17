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

## The design in brief
1. **Counts per branch**: 4 grand endings (1 secretly destined per life) · 2 kỳ ngộ rare (already exist) · 3 normal (already exist). 40 branches → 160 grand endings, each with its own name = its title (≤ 4 chữ), all listed in the doc.
2. **10 theme groups** (Quyền lực, Chính trị, Tình yêu, Tình bạn, Báo thù, Con cái, Gia tộc, Tự do, Tài nghệ, Thiên hạ), each with a good and an evil reading — e.g. 4 nữ đế (2 hiền, 2 bạo), 3 Thái hậu (2 revered, 1 hated); 47 of 160 endings are evil roads.
3. **Hidden destiny**: drawn at birth from the branch's 4, never shown to her or any NPC, no hints. Her road choices quietly build or break it (reusing the j97 "hidden chain" pattern); one real condition per ending (a stat, a person alive, a son, a free seat). No dice.
4. **The last two choices**: one hồi after the final chapter, the same for every life: *Đi hay ở* (stay humbly / stay and take power / leave the palace / follow someone) and *Đối đãi thế nào* (mercy / force / let go). Match + conditions → **Đại kết cục**: big event, own painted scene, very large reward (rank, stats, everyone's attitude, a "Kim sách Thiên mệnh" treasure), unique title. No match → «Cuộc đời ngươi vẫn tiếp tục như thế.» Nothing forced: choosing "leave" when it is not her destiny does not throw her out.
5. **Title = the only carry-over**, worn above the name with the existing title plate. **Bảng Thiên mệnh** per life reuses the «Bảng vàng» podium. **NPCs** get the same: own hidden destiny, own choices, title on their name, news to everyone; helping one is a side quest with a big reward (none on failure); sabotage is possible.
6. **Variety guard** checked by script: per branch ≥3 groups, ≥1 evil, ≥1 stay + ≥1 leave, 4 different choice pairs; across all 160 no repeated name or shape → 0 errors.
7. **Fully worked samples**: Con gái Tể tướng · Quân cờ trong tay cha; Bắc Địch · Sói đầu đàn (new road); Cung nữ · Ánh mắt nơi hành lang — each with real choice names, condition, scene, Vietnamese event text, reward, title.
8. The 8 shared + 3 mid-life lines own no grand ending: they stay fillers / chapters 12–14 and act as conditions (power, children, Hoàng hậu seat).
9. Numbers only as BAL key names (BAL.ge.*), set later by measurement. Art: 160 scenes + 1 special title plate + 1 item icon, for Foreman C later (nothing ordered). Build after the freeze: engine + 3 pilot branches first.

## Decisions for HER (options; recommendation first)
- **D1 Counts**: 4 grand · 2 rare · 3 normal per branch (**recommended**, her own "4 đại kết cục, 2 cực hiếm") — or 2 grand (half the writing, 80 paintings).
- **D2 Bắc Địch**: its own 4 roads inside the hòa thân identity, making 40 branches (**recommended**, her 17/11 "10 × 4 = 40") — or keep sharing Nam Chiếu's roads with its own grand endings only (her 16/11 rule "one identity, country branches, no new structure", OD:L1213/L1215). These two owner lines pull apart; she should pick.
- **D3 Where the last two choices sit**: right after chapter 14 (**recommended**) — or at the road finale (chapter 11).
- **D4 After unlocking**: stay-endings continue the life with the reward; leaving / throne / foreign-crown endings close the life with an epilogue (**recommended**) — or all close — or all continue.
- **D5 Carried title**: only the last life's grand title, looks only (**recommended**) — or any grand title ever earned — or a small bonus while worn.
- **D6 After death**: Sổ luân hồi reveals what that life's destiny was (**recommended**) — or never.
- **D7 "Wrong" choices**: lower the destiny's pull (**recommended**) — or one wrong choice breaks it for that life.

Gates: design only — no code, no BAL, no game file touched; one-core / quickcheck / shots not applicable. Conflict markers on this branch: 0.

DESIGN READY 6580bfaeaec06ff2f64e7ff0003970daec2c177d
SẴN SÀNG KIỂM 6580bfaeaec06ff2f64e7ff0003970daec2c177d
