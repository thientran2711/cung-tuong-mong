# bang-words (E39) — every foreign land reads its own words (ORDER MAIN CHÍNH 88 04:46Z, law 6b real world, law 11 whole group)
PRIORITY #1 CHECK ('Cao Ly|thảo nguyên|trà sữa|foreign-bang|jrd_nc'): OD 3 | ledger 0 | claims 8 | main 15 | review/* 0 | archive 28 — REUSED: jrd_nc NCL land table + TOK67 land tokens, jrd_bd bdTxt/bdCountry switch (Ba Tư), jkc2 KC2LAND. Branch review/bang-words from main 8b2e344d.

## EXPERT NOTE (law 8) — real markers per land in this game
- Cao Ly (Goryeo, 918–1392): a settled Buddhist kingdom by the sea. Quốc vương, Vương hậu, Thế tử; capital Khai Kinh (Kaesong); Yeondeunghoe = «hội đèn Nhiên Đăng»; seaweed soup (canh rong biển), ginseng (nhân sâm), perilla (tía tô), Cao Ly paper and celadon; family names Phác / Kim / Vương. NOT Cao Ly: steppe words (thảo nguyên, lều nỉ, kim trướng / trướng vàng, Khả hãn, sữa ngựa / sữa dê / trà sữa, đèn bơ), desert words (sa mạc, lạc đà, lửa thánh).
- Bắc Địch (northern steppe; LEGACY lives only, BD_OLD premises): nomad khanate. Khả hãn, Khả đôn, Phụ hãn; felt tents, the golden tent (kim trướng), mare's milk, horse races, shamanic hill cairns; trades horses / hides for Chinese iron, salt, tea. NOT Bắc Địch: sea / seaweed / ginseng / Nhiên Đăng, Persian fire temples.
- Ba Tư (Sasanian Persia; every NEW bd life, owner OD 19/11 ~06:40Z): Vương trung vương (Shahanshah), capital Tô Lận (Ctesiphon), Zoroastrian sacred fire in fire temples, Nowruz («Tết Nô Nhụ»), carpets, wine, pomegranates, caravans on the Silk Road. NOT Ba Tư: Phụ hãn / Khả hãn / steppe tents, seaweed / Nhiên Đăng.
- Rule used: shared chapters (written once for two lands) name a land thing only through a land token; a word true for every land (ngựa, chợ biên, sứ đoàn) stays.

## SCAN dev/test/bang-words/scan.js (page builds a life per land, walks every chapter that land can play: premise + .5–.11, every hồi whose opening filter can be true for it, options / results / hints, the road's grand endings GE_DATA + GE_CAT, and the land's home phase KC2LAND + places; text through fill67; flags another land's words + any raw {token})
| land | arcs | hồi | strings | before (main 8b2e344d) | after |
|---|---|---|---|---|---|
| Cao Ly (nc) | 32 | 198 | 3112 | 8 (4 «trướng vàng» + 2 raw «{kha}» in grand endings, «bản thảo nguyên niêm», «sa mạc») | 0 |
| Bắc Địch legacy (bd) | 32 | 192 | 2848 | 0 | 0 |
| Ba Tư (bt) | 32 | 193 | 3056 | 1 («Xin phụ hãn giữ người ấy») | 0 |

## FIXES (before → after)
| where | before | after |
|---|---|---|
| jgedata_w2 nc_vuong ending 1 (text + hint) | …phe thua bị xử ngay trước trướng vàng… không ai ở phương đông… | …trước {dien}… không ai ở {huong}… (Cao Ly: vương điện / phương đông · Bắc Địch: kim trướng / phương bắc · Ba Tư: vương điện / phương tây) |
| jgedata_w2 nc_vuong ending 3 (text + hint) | Bản đồ phương đông… trướng vàng thành dinh quan trấn thủ… / hạ cờ cũ và xóa trướng vàng | Bản đồ {huong}… {dien} thành dinh quan trấn thủ… / hạ cờ cũ, biến {dien} thành dinh quan |
| jgedata_w2 nc_gian ending 3 | …ở một thành buôn bên kia sa mạc | …ở một thành buôn xa tận phía tây |
| jge.js (whole group: every grand-ending text) | ending texts shown RAW: «Lão {kha} không về…», «cả lão {kha}…» | geF: ending / fail / hint texts go through the one filler fill67 (Lão Phác / lão Kha) |
| jrd_nc nc_su .9 result | Ngươi trả bản thảo nguyên niêm. (reads «thảo nguyên» = steppe) | Ngươi trả lại bản thảo, niêm phong như cũ. |
| jrd_bd2 bd_hen .11 (Ba Tư) | “…Xin phụ hãn giữ người ấy.” | “…Xin {pv} giữ người ấy.” (Phụ vương; Phụ hãn only on a legacy life) |
| jrd_nc / jrd_bd NCL | — | new land tokens dien, huong for nc / bd / bt (TOK67, the one land table) |
Checked and correct (no change): the Cao Ly beats with «trà sữa», «trướng», «thảo nguyên» in jrd_nc (L523 / L793 / L798) are BDW-only (Bắc Địch lives); no «Thường tại» in any land text; jkc2 home phase is per land already (Cao Ly Khai Kinh / Nhiên Đăng hội; Ba Tư Tô Lận / Nô Nhụ / đền lửa thánh).
