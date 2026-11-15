# PROGRESS — review/outside-r2 (pre-palace road "Tiểu thư ngoài cung", re-port onto current main)

Owner 15/11 ~21:00Z: the home road (jkc.js, owner-approved plan dev/OUTSIDE_PLAN.md) was built on review/outside @ 0062c04d (+ dress wiring
review/khuecac @ 963d38be) on a months-old main and never merged. This branch re-ports it onto origin/main 64e91f1a WITHOUT merging the old
branch (that would revert ~9.7k lines): only the files the road needs were taken, the UI was rebuilt on today's kit.

## Port table (old file → what happened)
| Old file (review/khuecac 963d38be) | Here |
|---|---|
| dev/build/jkc.js (518 lines) | TAKEN as the base, then rewritten in place: the whole UI block (tabs, top bar, panels, map, story, self card) rebuilt on the kit; events got hint/risk + art; bugs fixed (below). Appended LAST in assemble.py (after jwkr). |
| dev/build/assemble.py | one line: `'jkc.js'` appended to the module list. Nothing else from the old order (main's order kept). |
| dev/build/j27.js (34597308, tuyển tú girls 18–20) | TAKEN (one line, owner 18+ rule 14/11 22:05Z; main still had 15–18). |
| img/FIGURES-kc.json + 168 kc/ngheo webp | NOT in git (main keeps art on the CDN). The CDN copy is newer (198 records: + kc a26/a36/a51 for 10 faces); jkc now keeps every age band and picks the band of the wearer's age. |
| dev/test/outside/tour.js, shot.js, dress.js, oldsave.js | REWRITTEN as dev/test/outside/route.js (start → home tabs → play → tuyển tú → palace → reload) and dev/test/outside/oldsave.js (main-build save loads here; a home save reloads at home). Old ones used zz-test.html + old flow (no roulette / loading screen). |
| dev/measure/inkc.js, kcbot.js, kchh.js | TAKEN, GAME url → built index.html (env GF). Not re-measured in this pass (shared 4-CPU box). |
| dev/OUTSIDE_PLAN.md | TAKEN (doc, unchanged). |
| dev/PROGRESS_outside.md | not copied (history is on review/outside); this file replaces it. |
| everything else on review/outside (fold-layout, page-curl, difficulty, balance … merges, old index.html/sw.js) | DROPPED (already on main in newer form, or superseded). |
| dev/build/jk3.js (main) | one guard: `k3AsRows` also returns [] while `isKc()` (Ân sủng plaque is palace-only; jk3 is closure-scoped so it cannot be wrapped from jkc). |

## What the r2 rewrite changed in jkc.js
- Tabs: kgOn() off while at home (own 8 tabs like the servant road; Sổ ghi dropped from the bar so the 8-column bar fits); tabsFit after the home tabs are shown/hidden (was 18 columns → tiny labels).
- Kit UI: Gia tộc = kitSubTabs (Người nhà · Khuê hữu · Gia thế) + Hậu cung pattern pager strip + ONE pcard per person, relations as kitRelRow (both ways + oán), acts in the card; Gia thế = kitRows. Dư đồ = kitSubTabs (Trong phủ · Kinh thành) + pbtn place cards. Mệnh truyện = kitSkillCard per thread (origin chapter "Hồi n/3", Tuyển tú "Vòng n/3", Thanh mai) + kitRows. Thư từ = kitPersonLine rows / kitEmpty. Giao du head = kitRows + kitInfo gloss. Tài nghệ home teachers = one kitSkillCard with act cells. Intro "Khuê các" + "Nhập cung" tables = kitRows. Top bar: k3row chips "Tuyển tú còn N tháng" / "Áp lực hôn sự" (jtoil "Chưa điểm trang" off at home).
- Family are kit people: personRoleRank / kitTitle / kitFace / figFor / kitKnown / k61St wrappers → full-body figure + name above in kitEventDp (§50), real faces on plaques and cards (never "Người lạ"). "Bạn khuê phòng" → "Khuê hữu" (VANPHONG: no "bạn").
- Events (PEND kcE) in cost mode: every option has a true hand-written hint + risk word (KCH) — the closures hid the outcome, so kitHint called the poisoned soup "an toàn" and the kit source reader showed "Tốn Sức -40"; go is wrapped so the reader no longer guesses. Banners only from existing pictures that mean the event (KCART: tuyển tú, dịch, độc, thư nhà, Thượng nguyên/Thất tịch/Trùng dương, vi hành, mật ước …); else no picture (never the room).
- Bạc-alternative rule (owner 20:30Z): table below.
- Bugs fixed: Phúc tuyển → Điện tuyển never came when Sơ tuyển was answered late (round now starts on any week from the tuyển tú month) or when the minigame was left without a result (falls back to the middle mark); stranger "???" contact (own clan's consort is known); `kcCards` name clash avoided; palace result card no longer shows home numbers (Áp lực hôn sự) as deltas; "Không có ai ở đây" stage line overlapping the scene title removed at home.

## Bạc choices and their non-bạc road (home income ≈ 5 + Gia tư/6 ≈ 9–20 bạc a month; Sức refills ≈ 14 a week)
| Bạc choice | Non-bạc road (same gain) |
|---|---|
| Mời danh sư (Bạc -60) | Xin tổ mẫu mời danh sư (Sức -10, tổ mẫu thiện cảm -15, odds by her thiện cảm) |
| Học lễ nghi cung đình (Bạc -12, 3 khắc) | Tự học lễ nghi theo sách (Sức -25, 4 khắc, no palace gossip) |
| Mua tin của thái giám (Bạc -25) | Nhờ huynh trưởng dò tin trong cung (Sức -10, huynh trưởng -10; same monthly slot) |
| Gửi quà vào cung (Bạc -30, 1 khắc) | Gửi bức thêu tự tay làm (Sức -30, 3 khắc, Năm ăn năm thua) |
| Xin cha dâng sớ tiến cử (Bạc -50) | Nhờ tổ mẫu khuyên cha dâng sớ (Sức -15, tổ mẫu -15) |
| Sơ tuyển: Dúi bạc ma ma (Bạc -60) | Nhờ tổ mẫu viết thư gửi ma ma (Sức -5, tổ mẫu -15; needs her thiện cảm ≥ 10) |
| Chiếu: Xin cha lo miễn tuyển (Bạc -40) | Xin tổ mẫu nói với cha (Sức -10, tổ mẫu -15) |
| Hộp phấn: Nhờ đại phu (Bạc -10) | Thử một chút lên cổ tay (Sức -10, risk Sắc -2) |
| Huynh thua bạc: Đưa bạc (Bạc -50) | Xin tổ mẫu đứng ra trả nợ (Sức -10, tổ mẫu -15) |
| Di nương có thai: thuốc bổ (Bạc -10) | Thêu yếm cho đứa bé (Sức -15) |
| Thư trong cung: hồi âm kèm quà (Bạc -15) | Hồi âm kèm bức thêu (Sức -20) |
| Người ấy đỗ đạt: chúc mừng (Bạc -5) | Gửi một bài thơ (Sức -10) |
| Dịch: uống thuốc phòng (Bạc -20) / phát thuốc (Sức -15 Bạc -30) | Ở yên xông ngải cứu (Sức -20, a bit riskier) / Đi chùa sắc thuốc (Sức -35, riskier) |
| Thọ tổ mẫu: Mua bức thêu (Bạc -25) | Thức đêm thêu (was Sức -15 = obvious pick → now Sức -30) |
| Gia nhân: Nghe hắn kể (Bạc -5) / Cho bạc tiễn (Bạc -10) | Nhờ tỳ nữ dò hỏi (Sức -5, tỳ nữ Lòng -6) / Tiễn ra tận cổng (Sức -10) |
| Small incidental place-act prices (chùa -3, chợ -10, trà lâu -5, thư phường -5, thăm khuê hữu -5, làm vừa lòng mẹ -10, kết thân -5, ngáng chân -5, dò la -5, giả bệnh -5, thư -2/-3) | r1 reviewer (coordinator decision): each now has a twin card with the same gain: Hầu mẹ trọn buổi (Sức -20, +1 khắc) · Giúp huynh/muội một việc (Sức -10, +1 khắc) · Sai tỳ nữ ngáng chân / nghe ngóng (tỳ nữ thiện cảm -5; no maid → Rình cả đêm Sức -15 +1 khắc) · Lên chùa chép kinh (Sức -20, +1 khắc) · Đi xem chợ, không mua (Sức -20, +1 khắc) · Nghe lỏm ngoài hiên trà lâu (Sức -15, riskier) · Đứng đọc ở thư phường (Sức -15, +1 khắc) · Mang bánh nhà làm thăm khuê hữu (Sức -15, +1 khắc) · Nhịn ăn tránh xem mặt (Sức -15) · Tự tay đưa thư (Sức -5, +1 khắc, riskier) · Gửi thư theo người đi chợ (Sức -5, +1 khắc, riskier). |

## Tests
- `node dev/test/outside/route.js <url> <outdir> [sizes] [--origin=tt] [--shots=few|all|none]` — start → enter palace, exits 1 on any fail.
- `node dev/test/outside/oldsave.js <main build url> <this build url>` — same origin (e.g. serve the worktree, `git show origin/main:index.html > x/main.html`).
- Screens need `localStorage ctm-bgpause=1` (tests set it) or the background download starves portrait loads in headless runs.

## Open / for the coordinator
- KIT REQUEST: none (only existing kit parts used). Dư đồ at home is a list of kit place buttons (there is no house/city map painting; the leather map §34.1b needs one).
- Art: house/city scenes still reuse palace rooms (old placeholders: khuê phòng = phi-tan-cung …); family faces reuse official / mama / thị vệ pools (Huynh trưởng in guard armour). New art not drawn in this pass.
- Balance (OUTSIDE_PLAN §12, HH parity) not re-measured; dev/measure/kcbot.js ported.

## Results (cb76f51d + site build)
- route.js 755x1000@2, 1000x755@2, 1180x820@2, 1366x1024@2, 844x390@2: all PASS (origins tt/cn→eligible re-roll/dtq/nc→re-roll/cn→re-roll; entry ranks 0–1), 0 page errors, no overflow / clipped text / "???", no palace dialog at home, palace tabs back after entry, palace dress (t1) after entry, save+reload OK.
- oldsave.js 755x1000@2: a save made on origin/main's published index.html loads here (palace life, no S.kc), plays 6 buổi; a home save reloads at home. PASS.
- opt-scan.py --fail: 3 unclassified = jty.js on main (not this branch); kcE is a PEND event (cost mode).

## Reviewer r1 (review/outside-r2-r1)
- Merged onto origin/main d51a393e (jkc stays last, after jartc). Identity card with "Ở nhà chờ tuyển tú" picked now shows "Tiểu thư <nhà>", 18 tuổi and the home Danh/Bạc caps (was palace rank + origin age). Bạc twins for the small place acts (table above).
