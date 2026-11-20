SẴN SÀNG KIỂM home-chapters 03c2cade (review/home-chapters, from main 377d5ce3) — BIG review
PRIORITY #1 CHECK ('kc_ke|kc_hon|tm96z|nhũ mẫu|Thái hậu triệu|home chapter|vi hành|kc_tt3'): OD 1 | ledger 1 | claims 2 | main 15 | review/* 0 | archive 1
LAW 13: kc-lore(-r1), kc-roads-cn-nc(-fix,-fix2,-r1,-fix-r1), kc2val-home(-r1), outside(-r2,-r2-r1,-r2-r2), chapter-detail-r1 checked: kc-lore + outside-r2 already on main (archive reports), kc-roads landed as jkc2; none holds kc_ke/kc_hon/tm96z/endZ/di vật/nhũ mẫu/Thái hậu triệu → built new on main.

## What (GAP OR03 OR04 OR05 OR07 OR10; OUTSIDE_PLAN §5 §6 §8 §9)
New files dev/build/jkc3.js (engine, roster, events, kc_tt), jkc3a.js (kc_dtq kc_muoi kc_thd kc_ch kc_td), jkc3b.js (kc_ke kc_hon tm96z); BAL.kc3 in jbal2.js (+ BAL.kc3.fx per arc, BAL.arc.fx format, filled by j67 arcBeats/arcOpt); assemble.py after jkc2.js. Only new home lives of the six khuê các origins (S.kc.c3); jkc2 roads (S.kc.kd) and old saves untouched.
- OR03: origin chapter = j67-format arc (s1 → 1–2 of 3 complications → turn (65 %) → climax; endings win/mid/lose), old KCOB texts reused as beats; old 3 fixed beats only for old saves. Every ending seeds a palace arc (S.kc.seed3): at entry it is the life's palace road (jst14 f14.road / pool head) and starts with Lợi thế +sc. Seeds: tt tt_tranh|tt_mat/tt_co/tt_oan · dtq dtq_bien|dtq_huynh/dtq_binh/dtq_huynh · muoi muoi_tuoc/muoi_lau|muoi_no/muoi_doi · thd thd_tho/thd_sach/thd_tro|thd_hoc · ch ch_co/ch_bi|ch_benh/ch_ho · td td_an/td_song|td_ke/td_tha. Rare options kcR4 (dtq) / kcR6 (muoi) kept on the climax. Lore kept (dtq brother lost from s1; td house falls in kcEnter).
- OR04: kc_ke «Kế mẫu» (two-way schemes; exposing needs real proof S.kc.proof; she can frame you and win) or kc_hon «Hôn sự» (bà mối + suitor people; climax can end the life by marriage) + tm96z «Thuở thanh mai» (replaces the weekly tm events; every ending writes S.tm96.endZ {tok,promise,force}; tm96a reads force via TOK67.lvforce and tok at thread start) + kc_tt3 «Tuyển tú» = the existing Sơ/Phúc/Điện round shown as the last chapter (endings kept / trả thẻ / early).
- OR05: E9 mother ill → «Lời trăng trối»: real item IT.divat «Trâm bạc của mẫu thân» (Kỷ vật, keep, giver = her name) into S.inv on both options; mother dead, di nương raised to Kế mẫu, kc_hon → kc_ke if not started. E15 «Nhà trai thử dung mạo» after «Xin cha cho xem mặt trước» (was a dead end). E28 «Cha bị hặc tội» (tt/dtq/thd): clan power moves via tdPowAdd; 3 options incl. hitting back (law 1).
- OR07: nhũ mẫu (Người nhà; acts: kể chuyện xưa, dò la viện di nương — proof only if she really acted, ru ngủ), 5 teachers as people (Tài nghệ pager; favour → tiers học trò / được quý / truyền nhân; tier speeds that art's lessons ×1/1.25/1.5; acts Hầu (Sức) vs Biếu (Bạc) equal roads; truyền nghề at tier 2), bà mối a person (her face on «Bà mối đến nhà», acts biếu / nói khéo; gift lifts the next house), every suitor house = a man with face/age/nature (Giao du pager).
- OR10: kc_ch win → «Thái hậu triệu» (enter now as Thường tại beside Thái hậu, or wait: Đức + TH favour); vi hành success → next month «Thánh chỉ» (enter now as Thường tại, or wait: Đức, vh kept for Điện tuyển). Nhập cung card text fixed for these entries.
- New event cards print true lines (odds word + tốn + thành + hỏng) — the old kcO pattern showed «Nắm chắc» on rolled options.

## Tests (all on 03c2cade build)
| test | result |
|---|---|
| node dev/test/one-core-guard.js | PASS (0 new inline numbers) |
| dev/test/home-chapters/laws.js (9 arcs: law 3 gain+loss every option, law 2 proxy, 3 endings, seeds real, BAL fx per beat) | PASS |
| dev/test/home-chapters/smoke.js 6 origins × 4 lives | errs [], fails [], every planned chapter ended; road = seed in all 9 palace entries |
| smoke --off vs on (tt,thd,ch × 6) | same outcome mix: 11/18 enter palace both ways (no balance shift) |
| dev/test/outside/oldsave.js main→this, 755x1000 | PASS |
| bash dev/tools/quickcheck.sh | QUICKCHECK PASS (core gates, old save ok, perf ≈ live) |
| dev/test/home-chapters/shots.js Fold 755x1000@2 + iPad 1180x820@2, 9 screens each | 0 overflow / clip / ??? / % ; looked at |
SHOTS: CDN upload refused (cdn_sync HTTP 401 Authentication error, same account issue as E24) → no images committed; rerun `node dev/test/home-chapters/shots.js <url> <dir>` to see them.
KIT REQUEST filed (dev/kit/KIT_REQUESTS.md on the branch): option cost rows show «Tốn: không» for home stats khm/kgt/kap/kld (example E28 hồi môn). Not a gate.
DOUBTS for the reviewer: IT.divat borrows the jade hairpin icon (ITIMG.tramngoc) — FOR C art list: one painting «Trâm bạc của mẫu thân». Teacher / bà mối / suitor faces come from the existing pools (mama/man/maid/official). A few arc options give a loss only in words (law-3 scan accepts lx text).
