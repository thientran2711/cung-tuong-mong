SẴN SÀNG KIỂM e464c0f0a7979bf1e4e7cc52f2264276591c190e
# review/title-sys — TITLE SYSTEM (danh hiệu) PHASE 1, game logic (Foreman C worker)
Branch review/title-sys @ e464c0f0, based on review/title-tag 8b21c97d (on review/rank-bright) — merge those first. Details + PHASE 2 PLAN: dev/PROGRESS_title-sys.md on the branch.
START_CTX ~4 % of 1M; finished ~25 % (under the +25 % limit).

Done (only KIT §82 parts + kitPanel/kitRows/option cards/kitTabRowHTML; no private look):
- dev/build/jdh.js (after jcui): 35 achievement titles, each its own name, 2–4 words mixed (Chức Nữ, Tuệ nhãn, Tiếng tơ đồng, Bách phát bách trúng, Trăng soi rèm ngọc …); steps 1/5/10 (some own counts) = same name, higher tier. All numbers in BAL.dh (jbal2.js).
- Stat ONLY while worn (about half the titles): Sắc via the one wearBonus; Danh/Sủng/Đức added on wear and the exact amount taken back on removal.
- Counting: contests (cFin7 hook: top 3 + win per kind, her + NPCs), works made (wkMake: Nấu món, Chép kinh, Thêu, Vẽ, Phổ khúc), her acts (Thỉnh an, Đọc sách, Điểm trang/Dưỡng nhan), derived nights / children / art bậc 3-4-5. NPC consorts by the same rules, they wear their best title.
- Her new title/step: kit reward panel (Đeo ngay / Để sau) + log. NHIỆM VỤ (rail goal icon, OD L1186): kit tab row "Mục tiêu | Danh hiệu n/35"; Danh hiệu tab = worn, earned (plates), still-to-earn (progress), options Đeo / Tháo; plate tap = kit info card (date, "Đạt được khi …" + next step, gives while worn).
- Shows in the 3-line tag (stage + pop-up left figure) via S.titleWorn / p.titleWorn = "dh-<key>" (kitTitleWorn/kitTitleDef wrapped to resolve ids; data only).
- Old saves load (fields optional; quiet first sync seeds past contest wins from S.honors). Co-op: titles are personal keys per player; NPC counting host-only; jcoopworld LOOK += hieu, titleWorn, dh (friend's hiệu was missing — family fix).
Tests: node dev/test/title-sys.js <url> <out> 755x1000@2 → 0 errs 0 fails; 1180x820@2 → 0 errs 0 fails (catalogue, steps, notice, wear/unwear exact, NPC, cFin7, old save, JSON round trip, stage tag, pop-up plate, Nhiệm vụ tabs + wear, info card, no overflow). Shots looked at: dev/test/title-sys-shots/. Kit test title-tag.js still passes (it flakes at @2 the same way on the base: the queued pop-up is dropped right after a new life; my test checks the pop-up on an own page at @1).
For main / kit keeper (NOT changed, see PROGRESS "Notes"):
- KIT note: kitTitleOpen prints KIT_TIER_NAME[tier] (tier 1 "Nhất", tiers 7 and 8 both "Thất") — off by one? jdh matches the kit card.
- KIT REQUEST (optional): a picture for the Danh hiệu panel / title info card (today the generic tea-set fallback).
- Foreman B review/owner-answers-b (Q15) kcuHonorRows heading "Danh hiệu thi tài" lists contest PLACES ("Quán quân · Hội thi…" = the style the owner rejected for titles): after both merge, rename it "Thứ hạng thi tài" (+ contest result row "Danh hiệu" → "Thứ hạng") in one place. collect-ms BAL.col.ms names can join DH_CAT as a "Sưu tầm" group.
- wearBonus().danh is display-only in the game today (jewellery Danh +1 reaches no rule) — pre-existing.
Phase 2 (emperor hiệu by Sủng/Danh thresholds, sắc phong book + seal items, confiscation + atonement quest + wait, theft → investigation with Foreman D's item-location rule — review/item-ledger not on origin yet) = planned only.
