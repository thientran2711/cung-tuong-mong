# PROGRESS review/kc-roads-cn-nc (worker, opus)

Task (main s11 → s12): pre-palace home road for cnv "Cung nữ tuyển vào cung" and nc "Công chúa hòa thân" (+ the Bắc Địch branch bd),
same pattern as td (review/kc-lore); OD:L1244, L1250, L1251, L1252, L1253; co-op rule OD:L1263 (16/11 07:25Z, s11).
Base: review/kc-lore merged with origin/main (ce54872).

## Done
- dev/build/jkc2.js (assembled right after jkc.js): kinds S.kc.kd = "dan" (cnv) / "nc" (nc, bd). Data only on the jkc machinery.
- Home places (KCPL dn_*, nn_*, nb_*), people, deck cards (every bạc card has a Sức/khắc twin), weekly events, 3 chapters (months 2/5/8),
  sending event at month 10 (S.kc.due), selection = playArt round (kim / le / mua) + home numbers → placement / rank (ceiling only).
- cnv entry: j42 srvInit with the placement (tier 2: a palace head's maid, tier 1: a low consort's maid, tier 0: Tân Giả khố 4 weeks first);
  Xuân Đào (j67 cnv_ban) is one real palace maid of another palace, known to her.
- nc/bd entry: rank = ceiling (j1/jorigins r) − 0/1/2 by the Lễ ra mắt score; dowry, maid, intel carried.
- Endings at home: Ở lại quê nhà, Làm thiếp nhà phú hộ, Làm người ở nhà lý trưởng, Công chúa ở lại cố quốc.
- kitName caption at home (all home roads): her home word, never "Đáp ứng".
- Round 2: "Vào cung ngay" through the selection (every origin). Round 3 (OD:L1288): co-op free choice (forced joint entry removed), all home
  roads end at the tiểu thư tuyển tú month, BAL.kcv home-years carry measured with dev/measure/kc2val.js.
- Tests: dev/test/kc-roads/route.js (cnv, nc, bd at 755x1000 + 1180x820), scan.js (lore), coop-together.js (cnv+nc, tt+cnv, live Worker).

## Not done / notes
- bd lives only on review/origins-r1 (not merged): tested in a scratch merge (never pushed). jkc2 has the bd data; it wakes when jorigins ships.
- Art: placeholders only; list in dev/handover/reports/kc-roads-cn-nc.md.
