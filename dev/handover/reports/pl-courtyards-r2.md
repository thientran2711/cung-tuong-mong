# pl-courtyards-r2 (review of review/pl-courtyards-r1 8b4a2160f + review/single-hall ff05f03d, merged on origin/main cde8029d)

RESULT: FAIL (branch review/pl-courtyards-r2 @ 9e1e99f4 = merge + site rebuilt; index.html/sw.js conflicts resolved by taking main and re-running dev/site/build_site.sh). No dev/tools/quickcheck.sh on main, not run.

## FAIL list
1. Missing festival states still fall back to an ordinary season picture (owner 18:40Z OD:L1415: never). kpmArt() in dev/build/jpm.js: festival-buổi -> noon file -> season x buổi -> xuan-sang. Matrix (pl-courtyards.js, home / nhat-cac) shows fallback for: nguyentieu s/t/c, thanhminh all 4, doanngo toi, phoenix all 4, thattich s/t/c, vulan all 4, vantho all 4, trungcuu all 4, thanhtho all 4, dongchi all 4, lapbat all 4, giaothua s/t/c. Live sample: vulan evening shows nhat-cac-thu-toi.webp (plain autumn evening). Same for can-ninh, phi-cung, quy-cung, vinh-hoa (28 files each); spare-cung (17 files) is worse (no festival art at all except newyear-trua).
2. Mourning (quốc tang) has no painted tang-<buổi> file for any dir, so every mourning day shows the ordinary season picture. Same rule, same fail.
3. Doanngo sáng/chiều reuse the noon picture (different buổi stand-in). Already flagged by r1 as map parity; acceptable only if the owner agrees, otherwise paint.
   -> Fix options for coordinator: (a) Foreman C paints the 299-row MISSING table (r1 report) then run python3 dev/tools/pl2_sync.py; (b) until then kpmArt must not return a season picture for a festival/mourning day (owner decides what shows: e.g. block the courtyard step for that state or show nothing-yet), but it must not be a stand-in. I did not change this (policy, not a small fix).
4. iPad 1180x820 courtyard: the "‹ Dư đồ" back button overlaps the "Tây phối điện" hotspot label (top-left, text unreadable). Fold 755x1000 is clean. Back button and the left label need a clear gap (kit position), small fix for the worker.

## PASS items
- Single-hall (thu nvp vuon dtd tn lc ksp): Dư đồ tap goes straight, no courtyard, no courtyard dir in KPM_DATA, back button = plain "‹ Dư đồ"; kn (Càn Ninh) also straight (kpmParts length 1). thu and dtd stay gated by the normal summon rule (card shows), same as before the change. single-hall.js on Fold + iPad: 0 fails, 0 page errors.
- Multi-hall: all 13 palaces (incl. Thái Cực điện) open the courtyard with 3 hotspots (Chính điện / Đông / Tây phối điện); home (Ngọc Thanh các) 2 hotspots (hall + Dãy nhà cung nhân); hall cards show "vắng người" / "Người ở: …"; home hotspots show N bóng (e.g. "3 bóng người", "2 cung nhân"). Hall back button returns to the courtyard.
- Pictures: only nhat-* from the CDN img/pl2/ (28 distinct URLs all 200, naturalWidth 1792); no nhi/tam.
- Old save: save made on origin/main build loads in this build (same character), 0 page errors.
- Fold 755x1000@2 and iPad 1180x820@2 screenshots viewed (palace courtyard, single-hall tn, home).

## Càn Ninh (flag only)
Data/history: OD housing line 41 + j27.js l.19: Hoàng hậu lives ALONE in Càn Ninh, no side halls, so single-hall is consistent. BUT j27.js l.37 "palaceOf: a lower consort living under the queen is in Càn Ninh" and the thỉnh an morning gathers everyone there, and PL has a full can-ninh courtyard (chính + phối). Owner may want it multi-hall (Chính điện + 2 phối điện for the morning audience). Not changed; owner/main decision. Side effect: dir nhat-can-ninh stays used only if a Hoàng hậu palace slot opens a courtyard; kn itself never does.

## Handover
Reviewer used ~25% of context, no rollover needed.
