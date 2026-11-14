# PROGRESS — Tiểu thư ngoài cung (review/outside)

Plan: dev/OUTSIDE_PLAN.md (owner APPROVED). Code: dev/build/jkc.js (appended LAST in assemble.py, after j84).

## Branch base and merges
- Base origin/main (e9e2248f). Tiny separate commit 34597308: tuyenTu() new girls 18–20 (was 15–18, owner 18+ rule).
- Merged origin/review/difficulty (contains review/balance, review/story-rare, review/story-love: j67/j68*/j69/j96/j97/jkiep/jdiff …).
  assemble.py conflict: took difficulty's order, kept main's jbd.js (after jkitctl), dropped j80.js (difficulty dropped it on purpose: j76 declares SUC_FLOOR too).
  index.html / sw.js conflicts: kept ours (generated files; rebuild before publishing).
- Merged origin/review/fold-layout (phone shell, slim top bar, person card, cat tabs, kitSceneArt): its new module jk3.js added before j84.

## Built (jkc.js)
- Identity card (and rebirth card): "Con đường" = two kit option cards, "Vào cung ngay" / "Ở nhà chờ tuyển tú", each with Được / Mất / Kèm (kit labels thành/hỏng/kèm). Only eligible origins (tt dtq muoi thd ch td). Choice locked after "Nhận thân phận".
- Home life: S.kc state; isKc(); world runs in kcW() (S.out=1, like srvW); kcEndTurn/kcWeek/kcMonth; same calendar, tuyển tú year 3 month 2.
- Tabs relabelled (act Khuê phòng · go Dư đồ · rv Gia tộc · staff Giao du · art Tài nghệ (base lessons = real minigames) · kid Thư từ · inv Tư trang · story Mệnh truyện); rv sub-nav (Phi tần/Giao tình/Phe phái) removed in this mode.
- 13 places (8 house, 5 city) with one per-buổi ledger S.kc.at; acts that need a person/place are locked with the reason; city needs her maid, no city at night.
- Family: Phụ thân, Mẫu thân (60%) or Kế mẫu, Di nương, Tổ mẫu, Huynh trưởng, Thứ muội (18, consort face, competes in tuyển tú), 2 Bạn khuê phòng (consort faces), tỳ nữ = S.maid; faces from existing pools via fid (reserved in figUsed); af/me/Oán.
- ~30 deck acts (full price/gain/loss/odds), 30+ events (PEND kcE; options show only costs; result card numbers), origin chapter 3 beats × 6 origins, Thanh mai (j96 man, meet/token/rise/forbid/elope), suitors + forced match, festivals (Thượng nguyên, Thất tịch, Trùng dương, hội thơ, ngắm hoa), dịch.
- Tuyển tú: Sơ tuyển (gates; bribe; cáo bệnh) → Phúc tuyển (playArt minigame of her best art) → Điện tuyển (score rule kcScore, same for sister/friends) → entry rank Đáp ứng/Thường tại/Quý nhân with carry-over (Danh×0.6 ≤30, Bạc+hồi môn ≤400, maid Lòng +15, intel via j61 k61Know, sister/friends who pass become rival consorts with their faces). Early road: "Xin cha dâng sớ tiến cử" (Điện tuyển next month).
- Endings outside: Chính thất hầu phủ, Vợ quan thanh liêm, Làm thiếp nhà quyền quý, Gả xa, Xuất gia, Nữ phu tử, deaths (dịch, lao lực, tự vẫn, chết đuối khi bỏ trốn); 6 rare (kcR1–R6, j97 RARE97 book, glowing "✦ … Cơ duyên hiếm" option). PD_END values added. Phúc duyên +5 qua Sơ tuyển, +5/+10 on entry.
- Kiếp dở dang: S.turn counts months at home (12 = trọn), passing Sơ tuyển = trọn; kpWhy text for home.
- Co-op hook stub kcHook(kind,payload) (calls window.coopSend if present).

## Tests
- dev/test/outside/shot.js, tour.js (route-served http, PIXI ticker stopped before screenshots — headless PIXI is ~2–5 fps).
- tour 686x880@2.2 + 1180x820@2: no page errors, no horizontal overflow, all tabs render, 3 months of random play OK.

## Balance (bots)
- dev/measure/inkc.js (policy), kcbot.js (outside outcomes), kchh.js (HH both paths via inpage6 palace bot).
- Results: see "Measurements" below (filled as runs finish).

## Measurements
(pending)

## Art needed (placeholders now; gpt-2-6 later, edit-from-existing method)
- Scenes (16 + kinh thành map), see OUTSIDE_PLAN §14. Placeholders: khuê phòng/viện di nương = phi-tan-cung, chính sảnh = tu-ninh-cung, thư phòng = ngu-thu-phong, viện mẫu thân = khon-ninh-cung, hoa viên = ngu-hoa-vien, từ đường/chùa = duong-tam-dien, phòng học = kinh-su-phong, city = origin-wide-*.
- Her outside dress: she wears her consort identity tier 1 (has the t1 huadian) — needs a "khuê các" dress tier without huadian (owner rule: huadian only on consorts).
- Family portraits: mothers/stepmothers/grandmother use mama faces, father official faces, brother thị vệ faces (placeholders); new: mẫu thân ×2, kế mẫu/di nương ×3, tổ mẫu ×2, bà mối, 4 female teachers, đại thương muối, thầy đồ.
- Act/event pictures for the new acts/events (now fall back to the kit category art).

## Remaining
- See bottom of this file after the last run.
