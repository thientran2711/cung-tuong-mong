# pl-courtyards-r1 (review of review/pl-courtyards @ d98df6602)

VERDICT: FAIL (rule update from MAIN s21, owner: a courtyard step only for places with >=2 sub-places). The technical review is a PASS (all checks below), branch review/pl-courtyards-r1 is merged on origin/main c19b25ebf and has the reviewer fixes.

## FAIL list
1. Single-hall places still go Dư đồ -> courtyard picture -> place. Each has exactly ONE hotspot in KPM_DATA.spots / places, so they must go STRAIGHT to the place (no courtyard step): thu (Cần Chính điện, new), nvp (Nội vụ phủ, new), dtd (Dưỡng Hòa điện), tn (Đức Thọ cung), lc (Trường Môn viện), vuon (Ngự hoa viên), ksp (Kính sự phòng). Thái y viện already has no courtyard (OK).
2. Keep the courtyard only for the multi-hall places: palaces by chủ vị rank (cac / phi-cung / quy-cung / vinh-hoa / can-ninh / spare-cung; 3-4 hotspots) and home (Ngọc Thanh các: hall + dãy nhà cung nhân).
3. The 17+24+27+28+28+17+17 courtyard pictures of the 7 places above (and their 41 new CDN files) become unused; do not spend more paint on them. MISSING table below is already cut to the 6 multi-hall dirs.
(The reviewer did not change the open-place flow itself: it is a behaviour change, not a small fix.)

## Checks
- All 186 distinct pl2 URLs used by the matrix (14 places x 12 months x 3 tuần x 4 buổi) return 200/206; 0 bad picks, 0 missing-state picks; only "nhat" files are used.
- PL dir per place verified in the matrix: thu=can-chinh, nvp=noi-vu, vuon=garden, dtd=duong-hoa, tn=duc-tho, lc=truong-mon, ksp=noi-thi, home=cac. Tap area: one hall hotspot sits on the main hall roof (Fold + iPad shots looked at); no horizontal overflow.
- Festival mapping: kpmArt takes festival-buổi, else the map's own festival file (Đoan ngọ / Trùng cửu noon picture serves sáng + chiều, same as the Dư đồ map), else season x buổi. Verified for all 14 game festival keys x 4 buổi x every place.
- Fold 755x1000@2 and iPad 1180x820@2: 14 sample states all naturalWidth 1792, 0 page errors. Old save (main build -> this build, same origin): loads, Dư đồ -> palace detail opens, 0 errors.

## Defects found and fixed by the reviewer (small)
1. pl2_sync.py `have` regex did not know vulan|vantho|lapbat|thanhtho or mourning, so a painted file for them would never be picked. Added (dev/tools/pl2_sync.py).
2. kpmArt ignored mourning (quốc tang, wdTang()). It now tries `tang-<buổi>` first, then festival, then season (jpm.js).
3. New test dev/test/pl-courtyards-autopick.js: adds painted states to `have` and proves kpmArt picks them (vulan-toi, thanhminh-trua, tang-sang, mourning beats newyear). All 9 checks as expected.
The fallback (season x buổi) therefore stays only until Foreman C's files land; run `python3 dev/tools/pl2_sync.py` after uploading to refresh `have` — no code change needed.

## MISSING (Foreman C paint order, OD:L1415)
Format: TSV, 4 columns: place dir <TAB> state key <TAB> target file in img/pl2 <TAB> note. State key = <festival>-<buổi>; festival keys: newyear nguyentieu thanhminh doanngo phoenix thattich trungthu trungcuu dongchi giaothua vulan vantho lapbat thanhtho; mourning = tang-<buổi> (quốc tang, 3 months, every place); buổi = sang trua chieu toi. Season x buổi (16 per place) is complete everywhere. Rows with note `served_by_noon_file_map_parity` are covered today by the noon file (same as the Dư đồ map); C may skip them or paint for fidelity. Multi-hall places only: 299 rows (cac, can-ninh, phi-cung, quy-cung, vinh-hoa, spare-cung).

```tsv
nhat-cac	nguyentieu-sang	nhat-cac-nguyentieu-sang.webp	
nhat-cac	nguyentieu-trua	nhat-cac-nguyentieu-trua.webp	
nhat-cac	nguyentieu-chieu	nhat-cac-nguyentieu-chieu.webp	
nhat-cac	thanhminh-sang	nhat-cac-thanhminh-sang.webp	
nhat-cac	thanhminh-trua	nhat-cac-thanhminh-trua.webp	
nhat-cac	thanhminh-chieu	nhat-cac-thanhminh-chieu.webp	
nhat-cac	thanhminh-toi	nhat-cac-thanhminh-toi.webp	
nhat-cac	doanngo-sang	nhat-cac-doanngo-sang.webp	served_by_noon_file_map_parity
nhat-cac	doanngo-chieu	nhat-cac-doanngo-chieu.webp	served_by_noon_file_map_parity
nhat-cac	doanngo-toi	nhat-cac-doanngo-toi.webp	
nhat-cac	phoenix-sang	nhat-cac-phoenix-sang.webp	
nhat-cac	phoenix-trua	nhat-cac-phoenix-trua.webp	
nhat-cac	phoenix-chieu	nhat-cac-phoenix-chieu.webp	
nhat-cac	phoenix-toi	nhat-cac-phoenix-toi.webp	
nhat-cac	thattich-sang	nhat-cac-thattich-sang.webp	
nhat-cac	thattich-trua	nhat-cac-thattich-trua.webp	
nhat-cac	thattich-chieu	nhat-cac-thattich-chieu.webp	
nhat-cac	trungcuu-sang	nhat-cac-trungcuu-sang.webp	
nhat-cac	trungcuu-trua	nhat-cac-trungcuu-trua.webp	
nhat-cac	trungcuu-chieu	nhat-cac-trungcuu-chieu.webp	
nhat-cac	trungcuu-toi	nhat-cac-trungcuu-toi.webp	
nhat-cac	dongchi-sang	nhat-cac-dongchi-sang.webp	
nhat-cac	dongchi-trua	nhat-cac-dongchi-trua.webp	
nhat-cac	dongchi-chieu	nhat-cac-dongchi-chieu.webp	
nhat-cac	dongchi-toi	nhat-cac-dongchi-toi.webp	
nhat-cac	giaothua-sang	nhat-cac-giaothua-sang.webp	
nhat-cac	giaothua-trua	nhat-cac-giaothua-trua.webp	
nhat-cac	giaothua-chieu	nhat-cac-giaothua-chieu.webp	
nhat-cac	vulan-sang	nhat-cac-vulan-sang.webp	
nhat-cac	vulan-trua	nhat-cac-vulan-trua.webp	
nhat-cac	vulan-chieu	nhat-cac-vulan-chieu.webp	
nhat-cac	vulan-toi	nhat-cac-vulan-toi.webp	
nhat-cac	vantho-sang	nhat-cac-vantho-sang.webp	
nhat-cac	vantho-trua	nhat-cac-vantho-trua.webp	
nhat-cac	vantho-chieu	nhat-cac-vantho-chieu.webp	
nhat-cac	vantho-toi	nhat-cac-vantho-toi.webp	
nhat-cac	lapbat-sang	nhat-cac-lapbat-sang.webp	
nhat-cac	lapbat-trua	nhat-cac-lapbat-trua.webp	
nhat-cac	lapbat-chieu	nhat-cac-lapbat-chieu.webp	
nhat-cac	lapbat-toi	nhat-cac-lapbat-toi.webp	
nhat-cac	thanhtho-sang	nhat-cac-thanhtho-sang.webp	
nhat-cac	thanhtho-trua	nhat-cac-thanhtho-trua.webp	
nhat-cac	thanhtho-chieu	nhat-cac-thanhtho-chieu.webp	
nhat-cac	thanhtho-toi	nhat-cac-thanhtho-toi.webp	
nhat-cac	tang-sang	nhat-cac-tang-sang.webp	
nhat-cac	tang-trua	nhat-cac-tang-trua.webp	
nhat-cac	tang-chieu	nhat-cac-tang-chieu.webp	
nhat-cac	tang-toi	nhat-cac-tang-toi.webp	
nhat-can-ninh	nguyentieu-sang	nhat-can-ninh-nguyentieu-sang.webp	
nhat-can-ninh	nguyentieu-trua	nhat-can-ninh-nguyentieu-trua.webp	
nhat-can-ninh	nguyentieu-chieu	nhat-can-ninh-nguyentieu-chieu.webp	
nhat-can-ninh	thanhminh-sang	nhat-can-ninh-thanhminh-sang.webp	
nhat-can-ninh	thanhminh-trua	nhat-can-ninh-thanhminh-trua.webp	
nhat-can-ninh	thanhminh-chieu	nhat-can-ninh-thanhminh-chieu.webp	
nhat-can-ninh	thanhminh-toi	nhat-can-ninh-thanhminh-toi.webp	
nhat-can-ninh	doanngo-sang	nhat-can-ninh-doanngo-sang.webp	served_by_noon_file_map_parity
nhat-can-ninh	doanngo-chieu	nhat-can-ninh-doanngo-chieu.webp	served_by_noon_file_map_parity
nhat-can-ninh	doanngo-toi	nhat-can-ninh-doanngo-toi.webp	
nhat-can-ninh	phoenix-sang	nhat-can-ninh-phoenix-sang.webp	
nhat-can-ninh	phoenix-trua	nhat-can-ninh-phoenix-trua.webp	
nhat-can-ninh	phoenix-chieu	nhat-can-ninh-phoenix-chieu.webp	
nhat-can-ninh	phoenix-toi	nhat-can-ninh-phoenix-toi.webp	
nhat-can-ninh	thattich-sang	nhat-can-ninh-thattich-sang.webp	
nhat-can-ninh	thattich-trua	nhat-can-ninh-thattich-trua.webp	
nhat-can-ninh	thattich-chieu	nhat-can-ninh-thattich-chieu.webp	
nhat-can-ninh	trungcuu-sang	nhat-can-ninh-trungcuu-sang.webp	
nhat-can-ninh	trungcuu-trua	nhat-can-ninh-trungcuu-trua.webp	
nhat-can-ninh	trungcuu-chieu	nhat-can-ninh-trungcuu-chieu.webp	
nhat-can-ninh	trungcuu-toi	nhat-can-ninh-trungcuu-toi.webp	
nhat-can-ninh	dongchi-sang	nhat-can-ninh-dongchi-sang.webp	
nhat-can-ninh	dongchi-trua	nhat-can-ninh-dongchi-trua.webp	
nhat-can-ninh	dongchi-chieu	nhat-can-ninh-dongchi-chieu.webp	
nhat-can-ninh	dongchi-toi	nhat-can-ninh-dongchi-toi.webp	
nhat-can-ninh	giaothua-sang	nhat-can-ninh-giaothua-sang.webp	
nhat-can-ninh	giaothua-trua	nhat-can-ninh-giaothua-trua.webp	
nhat-can-ninh	giaothua-chieu	nhat-can-ninh-giaothua-chieu.webp	
nhat-can-ninh	vulan-sang	nhat-can-ninh-vulan-sang.webp	
nhat-can-ninh	vulan-trua	nhat-can-ninh-vulan-trua.webp	
nhat-can-ninh	vulan-chieu	nhat-can-ninh-vulan-chieu.webp	
nhat-can-ninh	vulan-toi	nhat-can-ninh-vulan-toi.webp	
nhat-can-ninh	vantho-sang	nhat-can-ninh-vantho-sang.webp	
nhat-can-ninh	vantho-trua	nhat-can-ninh-vantho-trua.webp	
nhat-can-ninh	vantho-chieu	nhat-can-ninh-vantho-chieu.webp	
nhat-can-ninh	vantho-toi	nhat-can-ninh-vantho-toi.webp	
nhat-can-ninh	lapbat-sang	nhat-can-ninh-lapbat-sang.webp	
nhat-can-ninh	lapbat-trua	nhat-can-ninh-lapbat-trua.webp	
nhat-can-ninh	lapbat-chieu	nhat-can-ninh-lapbat-chieu.webp	
nhat-can-ninh	lapbat-toi	nhat-can-ninh-lapbat-toi.webp	
nhat-can-ninh	thanhtho-sang	nhat-can-ninh-thanhtho-sang.webp	
nhat-can-ninh	thanhtho-trua	nhat-can-ninh-thanhtho-trua.webp	
nhat-can-ninh	thanhtho-chieu	nhat-can-ninh-thanhtho-chieu.webp	
nhat-can-ninh	thanhtho-toi	nhat-can-ninh-thanhtho-toi.webp	
nhat-can-ninh	tang-sang	nhat-can-ninh-tang-sang.webp	
nhat-can-ninh	tang-trua	nhat-can-ninh-tang-trua.webp	
nhat-can-ninh	tang-chieu	nhat-can-ninh-tang-chieu.webp	
nhat-can-ninh	tang-toi	nhat-can-ninh-tang-toi.webp	
nhat-phi-cung	nguyentieu-sang	nhat-phi-cung-nguyentieu-sang.webp	
nhat-phi-cung	nguyentieu-trua	nhat-phi-cung-nguyentieu-trua.webp	
nhat-phi-cung	nguyentieu-chieu	nhat-phi-cung-nguyentieu-chieu.webp	
nhat-phi-cung	thanhminh-sang	nhat-phi-cung-thanhminh-sang.webp	
nhat-phi-cung	thanhminh-trua	nhat-phi-cung-thanhminh-trua.webp	
nhat-phi-cung	thanhminh-chieu	nhat-phi-cung-thanhminh-chieu.webp	
nhat-phi-cung	thanhminh-toi	nhat-phi-cung-thanhminh-toi.webp	
nhat-phi-cung	doanngo-sang	nhat-phi-cung-doanngo-sang.webp	served_by_noon_file_map_parity
nhat-phi-cung	doanngo-chieu	nhat-phi-cung-doanngo-chieu.webp	served_by_noon_file_map_parity
nhat-phi-cung	doanngo-toi	nhat-phi-cung-doanngo-toi.webp	
nhat-phi-cung	phoenix-sang	nhat-phi-cung-phoenix-sang.webp	
nhat-phi-cung	phoenix-trua	nhat-phi-cung-phoenix-trua.webp	
nhat-phi-cung	phoenix-chieu	nhat-phi-cung-phoenix-chieu.webp	
nhat-phi-cung	phoenix-toi	nhat-phi-cung-phoenix-toi.webp	
nhat-phi-cung	thattich-sang	nhat-phi-cung-thattich-sang.webp	
nhat-phi-cung	thattich-trua	nhat-phi-cung-thattich-trua.webp	
nhat-phi-cung	thattich-chieu	nhat-phi-cung-thattich-chieu.webp	
nhat-phi-cung	trungcuu-sang	nhat-phi-cung-trungcuu-sang.webp	
nhat-phi-cung	trungcuu-trua	nhat-phi-cung-trungcuu-trua.webp	
nhat-phi-cung	trungcuu-chieu	nhat-phi-cung-trungcuu-chieu.webp	
nhat-phi-cung	trungcuu-toi	nhat-phi-cung-trungcuu-toi.webp	
nhat-phi-cung	dongchi-sang	nhat-phi-cung-dongchi-sang.webp	
nhat-phi-cung	dongchi-trua	nhat-phi-cung-dongchi-trua.webp	
nhat-phi-cung	dongchi-chieu	nhat-phi-cung-dongchi-chieu.webp	
nhat-phi-cung	dongchi-toi	nhat-phi-cung-dongchi-toi.webp	
nhat-phi-cung	giaothua-sang	nhat-phi-cung-giaothua-sang.webp	
nhat-phi-cung	giaothua-trua	nhat-phi-cung-giaothua-trua.webp	
nhat-phi-cung	giaothua-chieu	nhat-phi-cung-giaothua-chieu.webp	
nhat-phi-cung	vulan-sang	nhat-phi-cung-vulan-sang.webp	
nhat-phi-cung	vulan-trua	nhat-phi-cung-vulan-trua.webp	
nhat-phi-cung	vulan-chieu	nhat-phi-cung-vulan-chieu.webp	
nhat-phi-cung	vulan-toi	nhat-phi-cung-vulan-toi.webp	
nhat-phi-cung	vantho-sang	nhat-phi-cung-vantho-sang.webp	
nhat-phi-cung	vantho-trua	nhat-phi-cung-vantho-trua.webp	
nhat-phi-cung	vantho-chieu	nhat-phi-cung-vantho-chieu.webp	
nhat-phi-cung	vantho-toi	nhat-phi-cung-vantho-toi.webp	
nhat-phi-cung	lapbat-sang	nhat-phi-cung-lapbat-sang.webp	
nhat-phi-cung	lapbat-trua	nhat-phi-cung-lapbat-trua.webp	
nhat-phi-cung	lapbat-chieu	nhat-phi-cung-lapbat-chieu.webp	
nhat-phi-cung	lapbat-toi	nhat-phi-cung-lapbat-toi.webp	
nhat-phi-cung	thanhtho-sang	nhat-phi-cung-thanhtho-sang.webp	
nhat-phi-cung	thanhtho-trua	nhat-phi-cung-thanhtho-trua.webp	
nhat-phi-cung	thanhtho-chieu	nhat-phi-cung-thanhtho-chieu.webp	
nhat-phi-cung	thanhtho-toi	nhat-phi-cung-thanhtho-toi.webp	
nhat-phi-cung	tang-sang	nhat-phi-cung-tang-sang.webp	
nhat-phi-cung	tang-trua	nhat-phi-cung-tang-trua.webp	
nhat-phi-cung	tang-chieu	nhat-phi-cung-tang-chieu.webp	
nhat-phi-cung	tang-toi	nhat-phi-cung-tang-toi.webp	
nhat-quy-cung	nguyentieu-sang	nhat-quy-cung-nguyentieu-sang.webp	
nhat-quy-cung	nguyentieu-trua	nhat-quy-cung-nguyentieu-trua.webp	
nhat-quy-cung	nguyentieu-chieu	nhat-quy-cung-nguyentieu-chieu.webp	
nhat-quy-cung	thanhminh-sang	nhat-quy-cung-thanhminh-sang.webp	
nhat-quy-cung	thanhminh-trua	nhat-quy-cung-thanhminh-trua.webp	
nhat-quy-cung	thanhminh-chieu	nhat-quy-cung-thanhminh-chieu.webp	
nhat-quy-cung	thanhminh-toi	nhat-quy-cung-thanhminh-toi.webp	
nhat-quy-cung	doanngo-sang	nhat-quy-cung-doanngo-sang.webp	served_by_noon_file_map_parity
nhat-quy-cung	doanngo-chieu	nhat-quy-cung-doanngo-chieu.webp	served_by_noon_file_map_parity
nhat-quy-cung	doanngo-toi	nhat-quy-cung-doanngo-toi.webp	
nhat-quy-cung	phoenix-sang	nhat-quy-cung-phoenix-sang.webp	
nhat-quy-cung	phoenix-trua	nhat-quy-cung-phoenix-trua.webp	
nhat-quy-cung	phoenix-chieu	nhat-quy-cung-phoenix-chieu.webp	
nhat-quy-cung	phoenix-toi	nhat-quy-cung-phoenix-toi.webp	
nhat-quy-cung	thattich-sang	nhat-quy-cung-thattich-sang.webp	
nhat-quy-cung	thattich-trua	nhat-quy-cung-thattich-trua.webp	
nhat-quy-cung	thattich-chieu	nhat-quy-cung-thattich-chieu.webp	
nhat-quy-cung	trungcuu-sang	nhat-quy-cung-trungcuu-sang.webp	
nhat-quy-cung	trungcuu-trua	nhat-quy-cung-trungcuu-trua.webp	
nhat-quy-cung	trungcuu-chieu	nhat-quy-cung-trungcuu-chieu.webp	
nhat-quy-cung	trungcuu-toi	nhat-quy-cung-trungcuu-toi.webp	
nhat-quy-cung	dongchi-sang	nhat-quy-cung-dongchi-sang.webp	
nhat-quy-cung	dongchi-trua	nhat-quy-cung-dongchi-trua.webp	
nhat-quy-cung	dongchi-chieu	nhat-quy-cung-dongchi-chieu.webp	
nhat-quy-cung	dongchi-toi	nhat-quy-cung-dongchi-toi.webp	
nhat-quy-cung	giaothua-sang	nhat-quy-cung-giaothua-sang.webp	
nhat-quy-cung	giaothua-trua	nhat-quy-cung-giaothua-trua.webp	
nhat-quy-cung	giaothua-chieu	nhat-quy-cung-giaothua-chieu.webp	
nhat-quy-cung	vulan-sang	nhat-quy-cung-vulan-sang.webp	
nhat-quy-cung	vulan-trua	nhat-quy-cung-vulan-trua.webp	
nhat-quy-cung	vulan-chieu	nhat-quy-cung-vulan-chieu.webp	
nhat-quy-cung	vulan-toi	nhat-quy-cung-vulan-toi.webp	
nhat-quy-cung	vantho-sang	nhat-quy-cung-vantho-sang.webp	
nhat-quy-cung	vantho-trua	nhat-quy-cung-vantho-trua.webp	
nhat-quy-cung	vantho-chieu	nhat-quy-cung-vantho-chieu.webp	
nhat-quy-cung	vantho-toi	nhat-quy-cung-vantho-toi.webp	
nhat-quy-cung	lapbat-sang	nhat-quy-cung-lapbat-sang.webp	
nhat-quy-cung	lapbat-trua	nhat-quy-cung-lapbat-trua.webp	
nhat-quy-cung	lapbat-chieu	nhat-quy-cung-lapbat-chieu.webp	
nhat-quy-cung	lapbat-toi	nhat-quy-cung-lapbat-toi.webp	
nhat-quy-cung	thanhtho-sang	nhat-quy-cung-thanhtho-sang.webp	
nhat-quy-cung	thanhtho-trua	nhat-quy-cung-thanhtho-trua.webp	
nhat-quy-cung	thanhtho-chieu	nhat-quy-cung-thanhtho-chieu.webp	
nhat-quy-cung	thanhtho-toi	nhat-quy-cung-thanhtho-toi.webp	
nhat-quy-cung	tang-sang	nhat-quy-cung-tang-sang.webp	
nhat-quy-cung	tang-trua	nhat-quy-cung-tang-trua.webp	
nhat-quy-cung	tang-chieu	nhat-quy-cung-tang-chieu.webp	
nhat-quy-cung	tang-toi	nhat-quy-cung-tang-toi.webp	
nhat-vinh-hoa	nguyentieu-sang	nhat-vinh-hoa-nguyentieu-sang.webp	
nhat-vinh-hoa	nguyentieu-trua	nhat-vinh-hoa-nguyentieu-trua.webp	
nhat-vinh-hoa	nguyentieu-chieu	nhat-vinh-hoa-nguyentieu-chieu.webp	
nhat-vinh-hoa	thanhminh-sang	nhat-vinh-hoa-thanhminh-sang.webp	
nhat-vinh-hoa	thanhminh-trua	nhat-vinh-hoa-thanhminh-trua.webp	
nhat-vinh-hoa	thanhminh-chieu	nhat-vinh-hoa-thanhminh-chieu.webp	
nhat-vinh-hoa	thanhminh-toi	nhat-vinh-hoa-thanhminh-toi.webp	
nhat-vinh-hoa	doanngo-sang	nhat-vinh-hoa-doanngo-sang.webp	served_by_noon_file_map_parity
nhat-vinh-hoa	doanngo-chieu	nhat-vinh-hoa-doanngo-chieu.webp	served_by_noon_file_map_parity
nhat-vinh-hoa	doanngo-toi	nhat-vinh-hoa-doanngo-toi.webp	
nhat-vinh-hoa	phoenix-sang	nhat-vinh-hoa-phoenix-sang.webp	
nhat-vinh-hoa	phoenix-trua	nhat-vinh-hoa-phoenix-trua.webp	
nhat-vinh-hoa	phoenix-chieu	nhat-vinh-hoa-phoenix-chieu.webp	
nhat-vinh-hoa	phoenix-toi	nhat-vinh-hoa-phoenix-toi.webp	
nhat-vinh-hoa	thattich-sang	nhat-vinh-hoa-thattich-sang.webp	
nhat-vinh-hoa	thattich-trua	nhat-vinh-hoa-thattich-trua.webp	
nhat-vinh-hoa	thattich-chieu	nhat-vinh-hoa-thattich-chieu.webp	
nhat-vinh-hoa	trungcuu-sang	nhat-vinh-hoa-trungcuu-sang.webp	
nhat-vinh-hoa	trungcuu-trua	nhat-vinh-hoa-trungcuu-trua.webp	
nhat-vinh-hoa	trungcuu-chieu	nhat-vinh-hoa-trungcuu-chieu.webp	
nhat-vinh-hoa	trungcuu-toi	nhat-vinh-hoa-trungcuu-toi.webp	
nhat-vinh-hoa	dongchi-sang	nhat-vinh-hoa-dongchi-sang.webp	
nhat-vinh-hoa	dongchi-trua	nhat-vinh-hoa-dongchi-trua.webp	
nhat-vinh-hoa	dongchi-chieu	nhat-vinh-hoa-dongchi-chieu.webp	
nhat-vinh-hoa	dongchi-toi	nhat-vinh-hoa-dongchi-toi.webp	
nhat-vinh-hoa	giaothua-sang	nhat-vinh-hoa-giaothua-sang.webp	
nhat-vinh-hoa	giaothua-trua	nhat-vinh-hoa-giaothua-trua.webp	
nhat-vinh-hoa	giaothua-chieu	nhat-vinh-hoa-giaothua-chieu.webp	
nhat-vinh-hoa	vulan-sang	nhat-vinh-hoa-vulan-sang.webp	
nhat-vinh-hoa	vulan-trua	nhat-vinh-hoa-vulan-trua.webp	
nhat-vinh-hoa	vulan-chieu	nhat-vinh-hoa-vulan-chieu.webp	
nhat-vinh-hoa	vulan-toi	nhat-vinh-hoa-vulan-toi.webp	
nhat-vinh-hoa	vantho-sang	nhat-vinh-hoa-vantho-sang.webp	
nhat-vinh-hoa	vantho-trua	nhat-vinh-hoa-vantho-trua.webp	
nhat-vinh-hoa	vantho-chieu	nhat-vinh-hoa-vantho-chieu.webp	
nhat-vinh-hoa	vantho-toi	nhat-vinh-hoa-vantho-toi.webp	
nhat-vinh-hoa	lapbat-sang	nhat-vinh-hoa-lapbat-sang.webp	
nhat-vinh-hoa	lapbat-trua	nhat-vinh-hoa-lapbat-trua.webp	
nhat-vinh-hoa	lapbat-chieu	nhat-vinh-hoa-lapbat-chieu.webp	
nhat-vinh-hoa	lapbat-toi	nhat-vinh-hoa-lapbat-toi.webp	
nhat-vinh-hoa	thanhtho-sang	nhat-vinh-hoa-thanhtho-sang.webp	
nhat-vinh-hoa	thanhtho-trua	nhat-vinh-hoa-thanhtho-trua.webp	
nhat-vinh-hoa	thanhtho-chieu	nhat-vinh-hoa-thanhtho-chieu.webp	
nhat-vinh-hoa	thanhtho-toi	nhat-vinh-hoa-thanhtho-toi.webp	
nhat-vinh-hoa	tang-sang	nhat-vinh-hoa-tang-sang.webp	
nhat-vinh-hoa	tang-trua	nhat-vinh-hoa-tang-trua.webp	
nhat-vinh-hoa	tang-chieu	nhat-vinh-hoa-tang-chieu.webp	
nhat-vinh-hoa	tang-toi	nhat-vinh-hoa-tang-toi.webp	
nhat-spare-cung	newyear-sang	nhat-spare-cung-newyear-sang.webp	
nhat-spare-cung	newyear-chieu	nhat-spare-cung-newyear-chieu.webp	
nhat-spare-cung	newyear-toi	nhat-spare-cung-newyear-toi.webp	
nhat-spare-cung	nguyentieu-sang	nhat-spare-cung-nguyentieu-sang.webp	
nhat-spare-cung	nguyentieu-trua	nhat-spare-cung-nguyentieu-trua.webp	
nhat-spare-cung	nguyentieu-chieu	nhat-spare-cung-nguyentieu-chieu.webp	
nhat-spare-cung	nguyentieu-toi	nhat-spare-cung-nguyentieu-toi.webp	
nhat-spare-cung	thanhminh-sang	nhat-spare-cung-thanhminh-sang.webp	
nhat-spare-cung	thanhminh-trua	nhat-spare-cung-thanhminh-trua.webp	
nhat-spare-cung	thanhminh-chieu	nhat-spare-cung-thanhminh-chieu.webp	
nhat-spare-cung	thanhminh-toi	nhat-spare-cung-thanhminh-toi.webp	
nhat-spare-cung	doanngo-sang	nhat-spare-cung-doanngo-sang.webp	
nhat-spare-cung	doanngo-trua	nhat-spare-cung-doanngo-trua.webp	
nhat-spare-cung	doanngo-chieu	nhat-spare-cung-doanngo-chieu.webp	
nhat-spare-cung	doanngo-toi	nhat-spare-cung-doanngo-toi.webp	
nhat-spare-cung	phoenix-sang	nhat-spare-cung-phoenix-sang.webp	
nhat-spare-cung	phoenix-trua	nhat-spare-cung-phoenix-trua.webp	
nhat-spare-cung	phoenix-chieu	nhat-spare-cung-phoenix-chieu.webp	
nhat-spare-cung	phoenix-toi	nhat-spare-cung-phoenix-toi.webp	
nhat-spare-cung	thattich-sang	nhat-spare-cung-thattich-sang.webp	
nhat-spare-cung	thattich-trua	nhat-spare-cung-thattich-trua.webp	
nhat-spare-cung	thattich-chieu	nhat-spare-cung-thattich-chieu.webp	
nhat-spare-cung	thattich-toi	nhat-spare-cung-thattich-toi.webp	
nhat-spare-cung	trungthu-sang	nhat-spare-cung-trungthu-sang.webp	
nhat-spare-cung	trungthu-trua	nhat-spare-cung-trungthu-trua.webp	
nhat-spare-cung	trungthu-chieu	nhat-spare-cung-trungthu-chieu.webp	
nhat-spare-cung	trungthu-toi	nhat-spare-cung-trungthu-toi.webp	
nhat-spare-cung	trungcuu-sang	nhat-spare-cung-trungcuu-sang.webp	
nhat-spare-cung	trungcuu-trua	nhat-spare-cung-trungcuu-trua.webp	
nhat-spare-cung	trungcuu-chieu	nhat-spare-cung-trungcuu-chieu.webp	
nhat-spare-cung	trungcuu-toi	nhat-spare-cung-trungcuu-toi.webp	
nhat-spare-cung	dongchi-sang	nhat-spare-cung-dongchi-sang.webp	
nhat-spare-cung	dongchi-trua	nhat-spare-cung-dongchi-trua.webp	
nhat-spare-cung	dongchi-chieu	nhat-spare-cung-dongchi-chieu.webp	
nhat-spare-cung	dongchi-toi	nhat-spare-cung-dongchi-toi.webp	
nhat-spare-cung	giaothua-sang	nhat-spare-cung-giaothua-sang.webp	
nhat-spare-cung	giaothua-trua	nhat-spare-cung-giaothua-trua.webp	
nhat-spare-cung	giaothua-chieu	nhat-spare-cung-giaothua-chieu.webp	
nhat-spare-cung	giaothua-toi	nhat-spare-cung-giaothua-toi.webp	
nhat-spare-cung	vulan-sang	nhat-spare-cung-vulan-sang.webp	
nhat-spare-cung	vulan-trua	nhat-spare-cung-vulan-trua.webp	
nhat-spare-cung	vulan-chieu	nhat-spare-cung-vulan-chieu.webp	
nhat-spare-cung	vulan-toi	nhat-spare-cung-vulan-toi.webp	
nhat-spare-cung	vantho-sang	nhat-spare-cung-vantho-sang.webp	
nhat-spare-cung	vantho-trua	nhat-spare-cung-vantho-trua.webp	
nhat-spare-cung	vantho-chieu	nhat-spare-cung-vantho-chieu.webp	
nhat-spare-cung	vantho-toi	nhat-spare-cung-vantho-toi.webp	
nhat-spare-cung	lapbat-sang	nhat-spare-cung-lapbat-sang.webp	
nhat-spare-cung	lapbat-trua	nhat-spare-cung-lapbat-trua.webp	
nhat-spare-cung	lapbat-chieu	nhat-spare-cung-lapbat-chieu.webp	
nhat-spare-cung	lapbat-toi	nhat-spare-cung-lapbat-toi.webp	
nhat-spare-cung	thanhtho-sang	nhat-spare-cung-thanhtho-sang.webp	
nhat-spare-cung	thanhtho-trua	nhat-spare-cung-thanhtho-trua.webp	
nhat-spare-cung	thanhtho-chieu	nhat-spare-cung-thanhtho-chieu.webp	
nhat-spare-cung	thanhtho-toi	nhat-spare-cung-thanhtho-toi.webp	
nhat-spare-cung	tang-sang	nhat-spare-cung-tang-sang.webp	
nhat-spare-cung	tang-trua	nhat-spare-cung-tang-trua.webp	
nhat-spare-cung	tang-chieu	nhat-spare-cung-tang-chieu.webp	
nhat-spare-cung	tang-toi	nhat-spare-cung-tang-toi.webp	
```
