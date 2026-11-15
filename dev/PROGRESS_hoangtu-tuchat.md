# PROGRESS review/hoangtu-tuchat (owner 11/15: Hoàng tự tab bugs)
1. TƯ CHẤT vs HIỀN TÀI — j53 (+ BAL.tc): k.tc innate at birth (mother Tài/Đức/Tâm cơ/arts + Emperor's hidden gifts + luck), hidden;
   Văn/Võ/Đức start 0–2, grow monthly (tcGrowCore: age-band natural growth, mother at hand, Emperor's thương, teacher from 6, mother's
   Dạy chữ / Dạy lễ nghi from 3) × tcMul(tc), same for NPC mothers. Tư chất shown only as a word (nhũ mẫu at 1, thầy dạy at 6; others "lời đồn"
   from 6). Hiền tài shown from 6 (own: number; others: word vs age norm). Bars from 3 (own only). Kế vị < 6: đích/trưởng/thương only.
   Exam norm ktExp from BAL.tc.exp. Old saves: ktInit converts (k.tcv=1). Mother-education acts already existed (Dạy chữ, Dạy lễ nghi,
   tutors, võ): none added.
2. Hoàng tự trong cung — jht kinCard: right pane "Cả cung đều biết" (mother via kitPersonLine with stranger rule, kitRows Tuổi · Thứ bậc ·
   Tước vị · Nuôi dạy · Sức khỏe · Học · Khảo hạch · Hôn sự); no private numbers.
3. Child stranger rule — j61 k61Pub/k61IsKid (names public), jht kidMeet hooks (own birth, goTo palace, same palace monthly, festival,
   khảo hạch, takeaway), old-save migration S.kmet. Fixed: her OWN newborn used to be a stranger ("??? chào đời").
Tests: dev/test/hoangtu-tuchat/ (README). KIT §37.6, §37.7.

## Status (wrap-up)
- DONE: all 3 owner bugs; code sha dbcdfdc22 + 5e4efdab4, shots/tests 46917d3db. 22/22 checks pass at 755x1000, 1000x755, 1180x820, 1366x1024, 844x390; 0 page errors.
- LEFT: (1) kit review of review/hoangtu-tuchat; (2) after merge, rebuild the site (bash dev/site/build_site.sh); (3) optional: rerun balance bots (growth curve set by simulation only); (4) optional: shots at @2 (current shots at scale 1).
- Known bugs: none open. Pre-existing, not mine: the Kế vị card shows an empty "Vì sao đứng thứ N 0/0" tab beside "Việc".
- Tests: see dev/test/hoangtu-tuchat/README.txt (make old save with main build -> oldsave.js; then CTM_IMG_BASE= python3 dev/build/assemble.py; OLDSAVE=... node dev/test/hoangtu-tuchat/test.js <WxH> <outdir>).
- Base: origin/main at 6e6c2ae6d (branch review/hoangtu-tuchat).
