# ending-screens — report (OPUS worker session_01Rc5AsKeKeU4YfrthgxjKW7 for MAIN CHÍNH 86; owner marks #48 #50 #51)
PRIORITY #1 CHECK: OD 21/11 ~03:56Z / ~04:03Z / ~04:06Z (3 rows, in the brief) | main 56ff0db0: endings = j32 over() end card (cls end, t «Kiếp này»), jge PEND.geR (Đại kết cục / Kết cục), jge geBoardPanel (Bảng Thiên mệnh), j97 r97Take + PEND.j97x (Kỳ ngộ = kết hiếm); no full-screen ending part existed (kitDisplayRoom §89 = another full-screen view, not reusable for dialogs); painted fx reused from jfxkit; approved ev-* pictures reused as fallback backgrounds | review/* none for endings | claims: #48/#50 moved here from dialog-stack; art requests #48/#50 already in FOREMAN_C_STATUS (names reused).

START_CTX ≈ 3 % of a 1M window; finished at ≈ 25 %. No rollover needed.

## Result: SẴN SÀNG KIỂM review/ending-screens bffc0a56 (base main 56ff0db0), TIER BIG
ONE new kit part **kitEndScreen (KIT §91, dev/build/jend.js, last module)**: every ending dialog is shown as a FULL-SCREEN ceremonial screen —
whole-screen background per ending type (img/end-bg-<type>.webp; until Foreman C delivers: the already-approved event picture of that ending, blurred + dimmed), top bar / bottom bar hidden,
the kit dialog = one big frame (kit v3 layout XL, figure XL, centred, flower room on top), tone ring, overlay set (mourn: img/kit/death-flower/-drape-l/-r; fest: img/kit/fest-*; missing → no piece),
entrance: fest = rise + painted glow/sparks/petals, mourn = slow fade (+ ash/incense for exile/fail; death keeps j93's ink + silk). Reduced motion / Gọn = still. Flows, buttons, saves, numbers unchanged.
Types: death · exile · fail = mourn; leave · throne · grand · fate · rare = fest. Classifier kesLife(h, fate, alive) + kitEndType(m) (derived from the card → old saves + co-op guest need nothing stored).
Also fixed in the same group: j93 played the DEATH ink + white silk on every life ending, also happy ones (xuất cung, lên ngôi, Đại kết cục) → now only on mourning endings.

## Files
dev/build/jend.js (new) · assemble.py (+jend.js last) · jge.js (geBoardPanel cls kes-t-fate; grand exit kitEndNext) · j97.js (rare exit kitEndNext) · j93.js (death ink only on mourn) · dev/kit/KIT.md §91 · kit page sample §91 ·
dev/test/ending-screens.js · dev/test/ending-scan.js · dev/test/coop-ending-screens.js · index.html + sw.js rebuilt.

## Law 11 scan (node dev/test/ending-scan.js): 40 ending callers, untyped 0
BEFORE (main): every one = small dialog (life end card / VIỆC dialog / ĐIỀU panel / KẾT QUẢ panel). AFTER:
| where | ending | fate line | BEFORE (main 56ff0db0) | AFTER: ending screen type (tone) | how |
|---|---|---|---|---|---|
| j14.js:20 | Xuất gia | Xuất gia | small «Kiếp này» end card | leave (fest) | kesLife · alive |
| j14.js:24 | Lãnh cung | Phát điên trong lãnh cung | small «Kiếp này» end card | exile (mourn) | kesLife · alive |
| j24.js:54 | Được Vương gia che chở | Vương gia che chở | small «Kiếp này» end card | leave (fest) | kesLife · alive |
| j3.js:124 | Lãnh cung | Tuổi xuân qua đi | small «Kiếp này» end card | exile (mourn) | kesLife · alive |
| j3.js:135 | Thái phi | Thành Thái phi | small «Kiếp này» end card | throne (fest) | kesLife · alive |
| j3.js:136 | Hoàng thái hậu | Lên ngôi Thái hậu | small «Kiếp này» end card | throne (fest) | kesLife · alive |
| j3.js:138 | Mẫu hậu Hoàng thái hậu | cùng ngươi chia đôi hậu cung`:""}.` | small «Kiếp này» end card | (runtime) | kesLife(h, fate, alive) at the call |
| j3.js:139 | Thái phi | Thành Thái phi | small «Kiếp này» end card | throne (fest) | kesLife · alive |
| j3.js:141 | Thái phi | Thành Thái phi | small «Kiếp này» end card | throne (fest) | kesLife · alive |
| j3.js:145 | Hồng nhan bạc mệnh | why | small «Kiếp này» end card | (runtime) | kesLife(h, fate, alive) at the call |
| j30.js:25 | Tư thông bị phát giác | Ban chết: tư thông bại lộ | small «Kiếp này» end card | death (mourn) | kesLife · died |
| j42.js:297 | Ma ma | Làm ma ma đến già | small «Kiếp này» end card | leave (fest) | kesLife · alive |
| j42.js:298 | Xuất cung | "Xuất cung tuổi "+BAL.srvAge.out | small «Kiếp này» end card | (runtime) | kesLife(h, fate, alive) at the call |
| j42.js:430 | Xuất giá | Được ban gả cho … | small «Kiếp này» end card | leave (fest) | kesLife · alive |
| j42.js:433 | Xuất cung | fate | small «Kiếp này» end card | (runtime) | kesLife(h, fate, alive) at the call |
| j42.js:545 | Bị đuổi khỏi cung | Bị đuổi khỏi cung vì mang thai | small «Kiếp này» end card | exile (mourn) | kesLife · alive |
| j42.js:547 | Bị đuổi khỏi cung | Bị đuổi khỏi cung vì tư tình | small «Kiếp này» end card | exile (mourn) | kesLife · alive |
| j42.js:596 | Được ban hôn | Được … ban hôn cho … | small «Kiếp này» end card | leave (fest) | kesLife · alive |
| j42.js:600 | Vào vương phủ | Làm thiếp của … | small «Kiếp này» end card | leave (fest) | kesLife · alive |
| j42.js:603 | Thành thân | Xuất cung thành thân với … | small «Kiếp này» end card | leave (fest) | kesLife · alive |
| j96.js:98 | Cao chạy xa bay | Giả chết, rời cung cùng … | small «Kiếp này» end card | leave (fest) | kesLife · alive |
| j97.js:279 | d.exit[2] | d.exit[4] | small «Kiếp này» end card | rare (fest) | kitEndNext("rare") |
| j99succ.js:174 | e.h | fate | small «Kiếp này» end card | (runtime) | kesLife(h, fate, alive) at the call |
| jge.js:138 | Đại kết cục · … | Đại kết cục: … | small «Kiếp này» end card | grand (fest) | kitEndNext("grand") |
| jkc.js:485 | h | fate | small «Kiếp này» end card | (runtime) | kesLife(h, fate, alive) at the call |
| jkc2.js:420 | h | h | small «Kiếp này» end card | (runtime) | kesLife(h, fate, alive) at the call |
| jpq.js:72 | Ban chết | Ban chết vì mưu hại … | small «Kiếp này» end card | death (mourn) | kesLife · died |
| jpq.js:107 | Tân đế đăng cơ | Vương gia đăng cơ, phong Quý phi | small «Kiếp này» end card | throne (fest) | kesLife · alive |
| jroute.js:172 | withM?"Cao chạy xa bay":"Trốn khỏi cung" | withM?`Trốn khỏi cung cùng ${m.name}`:"T | small «Kiếp này» end card | (runtime) | kesLife(h, fate, alive) at the call |
| jroute.js:182 | Dâng biểu xuất gia | Xuất gia | small «Kiếp này» end card | leave (fest) | kesLife · alive |
| jroute.js:190 | Được ban hôn | Được ban hôn cho … | small «Kiếp này» end card | leave (fest) | kesLife · alive |
| jroute.js:194 | Xuất cung về quê | Xuất cung về quê | small «Kiếp này» end card | leave (fest) | kesLife · alive |
| jroute.js:197 | Phế làm thứ dân | Phế làm thứ dân, xuất cung | small «Kiếp này» end card | exile (mourn) | kesLife · alive |
| jroute.js:254 | Một đời an nhiên | Một đời an nhiên trong cung | small «Kiếp này» end card | leave (fest) | kesLife · alive |
| jge.js PEND.geR | Hồi kết nhánh → Đại kết cục |  | small VIỆC dialog | grand (fest) | kitEndType: pid geR + S.ge.res.ok |
| jge.js PEND.geR | Hồi kết nhánh → Kết cục (thất bại) |  | small VIỆC dialog | fail (mourn) | kitEndType: pid geR + !ok |
| jge.js geBoardPanel | Bảng Thiên mệnh |  | small ĐIỀU panel | fate (fest) | cls kes-t-fate |
| j97.js r97Take | Kỳ ngộ (kết hiếm) result card |  | small KẾT QUẢ panel | rare (fest) | r97Take wrapper → kesMark |
| j97.js PEND.j97x | Kỳ ngộ exit (rời cung, e.g. Nữ vương Cao Ly) |  | small «Kiếp này» end card | rare (fest) | kitEndNext("rare") |
| j3.js die() | every death (die → over "Hồng nhan bạc mệnh") | dynamic | small «Kiếp này» end card | death (mourn) | kesLife · died |

ending-scan: 40 ending callers · leave 12 · exile 5 · throne 5 · (runtime) 8 · death 3 · rare 3 · grand 2 · fail 1 · fate 1 · untyped/missing 0

## Tests (all on bffc0a56)
- node dev/test/ending-screens.js (Fold 755x1000 + iPad 1180x820, 10 ending cases + live-build old save OLD=git show origin/main:index.html): 246/246 PASS; --noart @2: 226/226 PASS
- node dev/test/coop-ending-screens.js (live Worker; both seats die → each sees her own kes-t-death screen with her own name → Chuyển kiếp on both → new persons → week advances): 8/8 PASS
- COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc node dev/test/coop-e2e.js: 92/92 PASS
- bash dev/tools/quickcheck.sh bffc0a56: QUICKCHECK PASS (core gates PASS, old save ok, perf new/live render 221/255 ms, buổi 1404/1312 ms)
- Shots (looked at 3×, no art yet = what ships today): CDN img/_review/ending-screens/{755x1000,1180x820}-{death,exile,fail,fate,grand,grand-exit,leave,rare,rare-exit,throne}.jpg (verdict giver wipes).

## Notes for MAIN / reviewer
- ART REQUEST posted in FOREMAN_C_STATUS (8 backgrounds + the 6 overlay pieces, exact file names). No code change needed when art lands. Geometry was verified with stand-in overlay pictures served by route (test only).
- Kit keeper session_01Rc5AsMtjP4KTgBZVjENGLs: kit diff = KIT.md §91 + jend.js (overrides the §84 frame size only under #modal.kes, forces layout XL there; narrow screens keep the stacked ladder). §91 number: please renumber if another branch took it.
- Pre-existing, NOT changed: on death, jfx "death" white silk sheet still drifts over the end card for several seconds (also on main) — it covers text briefly; a candidate for the dialog-stack / fx owner.
- The «Danh hiệu mới · Thiên mệnh» title notice after an Đại kết cục stays a normal notice (it follows the full-screen Đại kết cục; two full screens in a row felt wrong). Ask the owner only if she wants it too.
