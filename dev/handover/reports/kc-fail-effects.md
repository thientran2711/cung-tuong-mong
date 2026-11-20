# kc-fail-effects — GAP J3c (home-road cards hide fail effects) — worker opus, session_01N1tNP6BY715rYe4KHs14ko, 20/11
PRIORITY #1 CHECK ('fail:|không mất gì|kcLf|lx'): OD 1 | ledger 2 | claims 8 | main 15 | review/* 0 | archive 81 — source: REVIEW outside-coop r1 FOR B (3); reused the existing deck-card field `lx` (jroute route steps) instead of a new one; no other branch on this.
START_CTX ~5 % (1M window). Depth: worker (no children).

**Branch review/kc-fail-effects @ 43d8d0cb** = review/outside-coop-r1 da0c7397 + fix 7ceebed4 + merge LIVE origin/main 90b7e797 (index.html/sw.js rebuilt). Lands AFTER outside-gaps-r1 / outside-coop-r1. **SSK → SMALL review** (text/derivation only; effects and numbers unchanged).

## What
- ONE source (law 4 + 3 + 7): a home card's non-stat failure is data `lf:[[kind,…]]` (jkc.js `kcLfRun` / `kcLfTxt`); `kcCard` runs it on a failure (before the card's own fail(), now flavour log only) and prints it via `a.lx`. Kinds: af (liking; kcAf's hidden Oán is printed too), oan, ld (Lời đồn — FOG rule OUTSIDE_PLAN:46: «có lời ra tiếng vào» until she has seen Lời đồn, then «Lời đồn +N»), pow (only when the house exists), proof, cd (6-month wait), caught (kcE dialog).
- Kit (whole group): `failTxt(a)` (j2) = fmt(l) + lx, used by the act card j19 and both option-line builders j17 / j25; jroute's private string-replace of the BẠI row is removed (route cards now go through the same path, same output).
- One core: typed Lời đồn amounts (8, 2, 5, 12, 12, 15, 5 / 2, 6, 8) and the typed 6-month sớ wait → BAL.eff.jkc.kld* / g7Wait, BAL.eff.jkc2.kld* (same values). «Bán vải ở chợ huyện» fail bạc moved from apply() in fail to `l` (shown «Bạc +2»).
- jkcco home «Thư từ» cards (same family): letter failure Lời đồn and sớ failure «Phụ thân với ngươi −X» were hidden → `failLf(k)` feeds kcCard lf; the palace-pane path (failOf full) runs the same list.
- No balance change: every effect value and roll is identical (kc-fail.js compares the real state diff before/after).

## Scan (dev/test/outside/kc-fail.js — every jkc/jkc2 card, every home origin, every place, with/without maid; state diff vs shown BẠI)
BEFORE (outside-coop-r1): **320 / 480 card rows wrong**. AFTER: **0 / 480** (Lời đồn unseen) and **0 / 474** (seen). Unique cards:

| card | shown before | real effect of a failure | shown after (Lời đồn unseen / seen) |
|---|---|---|---|
| Viết nhật ký giấu kín | không mất gì | ld 8 | có lời ra tiếng vào / Lời đồn +8 |
| Chải chuốt, thử y phục | không mất gì | ld 2 | có lời ra tiếng vào / Lời đồn +2 |
| Hầu cha ở thư phòng | không mất gì | af Phụ thân -6, oan Phụ thân 3 | Phụ thân với ngươi -6·Phụ thân oán +3 |
| Khuyên cha chọn phe | không mất gì | af Phụ thân -10, oan Phụ thân 5 | Phụ thân với ngươi -10·Phụ thân oán +5 |
| Xin cha dâng sớ tiến cử | không mất gì | af Phụ thân -5, oan Phụ thân 3, pow, cd | Phụ thân với ngươi -5·Phụ thân oán +3·6 tháng sau mới xin lại được·Thế lực nhà -2 |
| Xin cha tiền riêng | không mất gì | af Phụ thân -3, oan Phụ thân 2 | Phụ thân với ngươi -3·Phụ thân oán +2 |
| Kết thân huynh trưởng | không mất gì | af Huynh trưởng -2, oan Huynh trưởng 1 | Huynh trưởng với ngươi -2·Huynh trưởng oán +1 |
| Giúp huynh trưởng một việc | không mất gì | af Huynh trưởng -2, oan Huynh trưởng 1 | Huynh trưởng với ngươi -2·Huynh trưởng oán +1 |
| Kết thân thứ muội | không mất gì | af Thứ muội -2, oan Thứ muội 1 | Thứ muội với ngươi -2·Thứ muội oán +1 |
| Giúp thứ muội một việc | không mất gì | af Thứ muội -2, oan Thứ muội 1 | Thứ muội với ngươi -2·Thứ muội oán +1 |
| Ngáng chân thứ muội | Đức -5·Gia thanh -3 | st duc -5, st kgt -3, af Tổ mẫu -10, oan Tổ mẫu 5, af Thứ muội -15, oan Thứ muội 28 | Đức -5·Gia thanh -3·Thứ muội với ngươi -15·Thứ muội oán +28·Tổ mẫu với ngươi -10·Tổ mẫu oán +5 |
| Sai tỳ nữ ngáng chân thứ muội | Đức -5·Gia thanh -3 | st duc -5, st kgt -3, af Tổ mẫu -10, oan Tổ mẫu 5, af Thứ muội -15, oan Thứ muội 28, mz -5 | Đức -5·Gia thanh -3·Thứ muội với ngươi -15·Thứ muội oán +28·Tổ mẫu với ngươi -10·Tổ mẫu oán +5 |
| Dò la viện di nương | không mất gì | ld 5, af Di nương -8, oan Di nương 4 | Di nương với ngươi -8·Di nương oán +4·có lời ra tiếng vào / Di nương với ngươi -8·Di nương oán +4·Lời đồn +5 |
| Sai tỳ nữ nghe ngóng viện di nương | không mất gì | ld 5, af Di nương -8, oan Di nương 4, mz -5 | Di nương với ngươi -8·Di nương oán +4·có lời ra tiếng vào / Di nương với ngươi -8·Di nương oán +4·Lời đồn +5 |
| Tố di nương trước tổ mẫu | Đức -3 | st duc -3, oan Di nương 15, proof | Đức -3·Di nương oán +15·mất chứng cứ đã có |
| Quản việc nhà | Gia thanh -2 | st kgt -2 | Gia thanh -2 |
| Nghe chuyện ở trà lâu | Gia thanh -4 | st kgt -4, ld 12 | Gia thanh -4·có lời ra tiếng vào / Gia thanh -4·Lời đồn +12 |
| Nghe lỏm ngoài hiên trà lâu | Gia thanh -4 | st kgt -4, ld 12 | Gia thanh -4·có lời ra tiếng vào / Gia thanh -4·Lời đồn +12 |
| Gặp riêng <chàng> | không mất gì | ld 12, dil | có lời ra tiếng vào·bị gia nhân bắt gặp / Lời đồn +12·bị gia nhân bắt gặp |
| Gửi thư cho người ấy | không mất gì | ld 15 | có lời ra tiếng vào / Lời đồn +15 |
| Tự tay đưa thư cho người ấy | không mất gì | ld 15 | có lời ra tiếng vào / Lời đồn +15 |
| Viết thư vào cung | không mất gì | ld 5 | có lời ra tiếng vào / Lời đồn +5 |
| Gửi thư theo người đi chợ | không mất gì | ld 5 | có lời ra tiếng vào / Lời đồn +5 |
| Xin tổ mẫu mời danh sư | không mất gì | af Tổ mẫu -5, oan Tổ mẫu 3 | Tổ mẫu với ngươi -5·Tổ mẫu oán +3 |
| Nhờ huynh trưởng dò tin trong cung | không mất gì | af Huynh trưởng -4, oan Huynh trưởng 2 | Huynh trưởng với ngươi -4·Huynh trưởng oán +2 |
| Nhờ tổ mẫu khuyên cha dâng sớ | không mất gì | af Tổ mẫu -5, oan Tổ mẫu 3, cd | Tổ mẫu với ngươi -5·Tổ mẫu oán +3·6 tháng sau mới xin lại được |
| Rình viện di nương cả đêm | không mất gì | ld 5, af Di nương -8, oan Di nương 4 | Di nương với ngươi -8·Di nương oán +4·có lời ra tiếng vào / Di nương với ngươi -8·Di nương oán +4·Lời đồn +5 |
| Soi bóng nước, chải tóc | không mất gì | ld 2 | có lời ra tiếng vào / Lời đồn +2 |
| Hái lá thuốc cho mẹ | không mất gì | af Mẫu thân -2, oan Mẫu thân 1 | Mẫu thân với ngươi -2·Mẫu thân oán +1 |
| Làm không công cho nhà lý trưởng | Tiếng trong xóm -3 | st kgt -3, ld 6 | Tiếng trong xóm -3·có lời ra tiếng vào / Tiếng trong xóm -3·Lời đồn +6 |
| Biếu quà lý trưởng | Tiếng trong xóm -2 | st kgt -2, af Lý trưởng -3, oan Lý trưởng 2 | Tiếng trong xóm -2·Lý trưởng với ngươi -3·Lý trưởng oán +2 |
| Thêu khăn biếu bà lý trưởng | không mất gì | af Lý trưởng -2, oan Lý trưởng 1 | Lý trưởng với ngươi -2·Lý trưởng oán +1 |
| Giặt áo cùng Xuân Đào | không mất gì | af Xuân Đào -2, oan Xuân Đào 1 | Xuân Đào với ngươi -2·Xuân Đào oán +1 |
| Học lễ nghi với bà Tư | không mất gì | af Bà Tư -3, oan Bà Tư 2 | Bà Tư với ngươi -3·Bà Tư oán +2 |
| Gánh nước, quét nhà cho bà Tư | không mất gì | af Bà Tư -2, oan Bà Tư 1 | Bà Tư với ngươi -2·Bà Tư oán +1 |
| Bán vải ở chợ huyện | không mất gì | st bac 2 | Bạc +2 |
| Hầu phụ vương nghe chính sự | không mất gì | af Phụ vương -5, oan Phụ vương 3 | Phụ vương với ngươi -5·Phụ vương oán +3 |
| Xin thêm hồi môn | không mất gì | af Phụ vương -6, oan Phụ vương 3 | Phụ vương với ngươi -6·Phụ vương oán +3 |
| Trò chuyện với thế tử huynh | không mất gì | af Thế tử huynh -2, oan Thế tử huynh 1 | Thế tử huynh với ngươi -2·Thế tử huynh oán +1 |
| Kết thân vương muội | không mất gì | af Vương muội -2, oan Vương muội 3 | Vương muội với ngươi -2·Vương muội oán +3 |
| Dạy vương muội một điệu múa | không mất gì | af Vương muội -2, oan Vương muội 1 | Vương muội với ngươi -2·Vương muội oán +1 |
| Dò ý Vương thúc | không mất gì | af Vương thúc -6, oan Vương thúc 9 | Vương thúc với ngươi -6·Vương thúc oán +9 |
| Tiếp sứ thần Đại Hy | Hòa ước -2 | st kgt -2, af Sứ thần Đại Hy -4, oan Sứ thần Đại Hy 2 | Hòa ước -2·Sứ thần Đại Hy với ngươi -4·Sứ thần Đại Hy oán +2 |
| Đánh cờ với sứ thần | không mất gì | af Sứ thần Đại Hy 2 | Sứ thần Đại Hy với ngươi +2 |
| Ra chợ nghe dân nói | Hòa ước -3 | st kgt -3, ld 8 | Hòa ước -3·có lời ra tiếng vào / Hòa ước -3·Lời đồn +8 |

(«Sai tỳ nữ …» cards: the maid's liking −5 is paid either way and was already shown in KÈM; checked by the test.)

## Tests (final 43d8d0cb)
| test | result |
|---|---|
| outside/kc-fail.js ld=0 / ld=1 | 0 fails (480 / 474 rows) |
| outside/coop-kcco.js THIN=9 | 68/68 |
| outside/coop-kcco-ui.js THIN=9 | 32/32 (pre-merge build) |
| coop-e2e.js | 68/68 |
| outside/coop-home.js | 51/51 (pre-merge build) |
| outside/gaps.js Fold + iPad | exit 0 |
| outside/route.js Fold + iPad | exit 0 (pre-merge build) |
| one-core-guard / one-core-text / undef-scan | 0 fails / PASS / PASS |

Shots (looked at): CDN img/_review/kc-fail-effects/ — after-755x1000.jpg + after-1180x820.jpg (Khuê phòng, «Viết nhật ký giấu kín» BẠI «có lời ra tiếng vào»), after-soc-* / before-soc-* (Giao du, «Nghe chuyện ở trà lâu»: before «Gia thanh −4», after «Gia thanh −4 · có lời ra tiếng vào»). Verdict giver wipes the folder.

## FOR B (not this job, same family on the THÀNH side)
- «Gặp riêng <chàng>» success also adds Lời đồn +3 (go: S.kld+=3) that THÀNH/KÈM does not print. A success-side twin of this fix (lf for go) if wanted.
