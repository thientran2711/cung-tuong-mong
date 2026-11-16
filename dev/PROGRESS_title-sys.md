# PROGRESS — review/title-sys (Foreman C worker, TITLE SYSTEM phase 1, game logic)

Owner rules: OWNER_DECISIONS 16/11 13:00Z, 13:15Z, 13:20Z (+ RULE FOR EVERY SESSION), 13:25Z (D), 13:30Z, 13:55Z (docs branch). Brief: FOREMAN_C.md 13:20Z s16 / 13:30Z / 13:35Z / 13:50Z s17.
Base: review/title-tag @ 8b21c97d (KIT §82 jtitle.js, on review/rank-bright). Merge those first.

## Done (phase 1)
- `dev/build/jdh.js` (assembled after jcui.js). Uses ONLY kit parts: kitTitlePlate / kitTitleOpen / 3-line tag (§82), kitPanel + kitRows + option cards (§8/§6), kitTabRowHTML in `.pctabs.kcattabs` (same tab row as jgift/jinv).
- Catalogue `DH_CAT`: 35 titles, each its own name (2–4 words, mixed lengths; none "<place> · <festival>"):
  - Hội thi (17): one per contest kind won (Tuệ nhãn, Thi tiên, Vế đối vàng, Tiếng tơ đồng, Nghê thường vũ y, Oanh vàng, Đường kim như gấm, Chức Nữ (xâu kim, Thất tịch), Người giữ xuân, Thần bút, Quốc thủ, Hương vị ngự thiện, Bách phát bách trúng, Tay ném như thần, Hương lưu tay áo) + Tài hoa vô song (wins in N kinds) + Bảng vàng đề tên (top 3).
  - Tài nghệ (13): art bậc 3/4/5 (Cao sơn lưu thủy, Tâm như bàn cờ, Nhả ngọc phun châu, Bút sinh hoa, Gót sen lăng ba, Diệu thủ hồi xuân, Kim vàng chỉ bạc, Ngự trù) + works made (Tay nêm ngự thiện = Nấu món, Tâm như gương sáng = Chép kinh, Tay tiên, Sơn thủy trong tay, Khúc nhạc tri âm).
  - Ngày thường (her only, acts that succeed): Sớm viếng chiều thăm (Thỉnh an), Thư hương (Đọc sách), Dung nhan như ngọc (Điểm trang / Dưỡng nhan).
  - Ân sủng: Trăng soi rèm ngọc (thị tẩm), Phúc ấm đầy nhà (children).
- Steps: BAL.dh.n0 = 1/5/10 (some titles own counts, e.g. Thỉnh an 5/20/50, children 1/3/5, art bậc 3/4/5) → SAME name, tier = b + i*step (max 8). All numbers in `BAL.dh` (jbal2.js); text prints them.
- Stat only while worn (BAL.dh.T[id].fx): Sắc through the ONE wearBonus (effSac), Danh/Sủng/Đức added on wear and the exact amount taken back on removal (`p.dhOn`). About half the titles give nothing ("chỉ để làm đẹp").
- Her: new title / new step → kit reward panel "Danh hiệu mới / lên bậc" (Đeo ngay / Để sau) + log line. NPC consorts: same counting (contests, works, nights, children, art bậc); they wear their highest title themselves.
- NHIỆM VỤ = the stage rail goal icon (OD L1186): its panel now has the kit tab row "Mục tiêu | Danh hiệu n/35"; the Danh hiệu tab = worn title, earned (plates, how, gives while worn) and still-to-earn (progress) per group, options Đeo «…» / Tháo danh hiệu. Tap a plate → the kit info card (Đạt được = date, Cách có = "Đạt được khi …" + next step, Khi đeo, Đang). The last tab is remembered.
- Shown in the 3-line tag (stage under feet, pop-up left figure above head) through the kit hooks: S.titleWorn / p.titleWorn = "dh-<key>"; kit ids "dh-<key>@<pid>" (kitTitleWorn / kitTitleDef wrapped to resolve them; data only, no look changed).
- Old saves: every field optional; first sync is quiet and seeds her past contest places from S.honors (Sổ ân thưởng). Co-op: S.dh / S.titleWorn are personal keys (per player); NPC counting only on the host (same rule as rivalsMonth/festival); jcoopworld LOOK += hieu, titleWorn, dh so the friend shows her hiệu ("Thục phi", was missing — family fix) and her worn title.
- Wording NOT changed here (PRIORITY RULE #1): Foreman B's review/owner-answers-b (Q15) moved the contest places into `kcuHonorRows()` (jcui.js, heading "Danh hiệu thi tài", used in Sổ ân thưởng + her profile card). Those rows are PLACES ("Quán quân · Hội thi…"), the very "<place> · <festival>" style the owner rejected for titles (13:15Z). After both branches are on main: rename that heading to "Thứ hạng thi tài" (and the contest result row "Danh hiệu" → "Thứ hạng", jcui cuAward) in ONE place, so "Danh hiệu" means only the worn titles. Also on that branch: collect-ms `BAL.col.ms` names (Tích bảo / Tàng bảo / Bách bảo / Vạn bảo các chủ, cross-life ledger) — can join DH_CAT as a "Sưu tầm" group with one line each when it lands (count = items collected).
- Test `dev/test/title-sys.js <url> <out> [WxH@dpr]`; shots in dev/test/title-sys-shots/.

## Notes for main / kit keeper (not changed here)
- KIT_TIER_NAME index: kitTitleOpen prints KIT_TIER_NAME[tier] (tier 1 → "Nhất", tiers 7 and 8 both "Thất"); jdh follows the kit card so the words match. If the kit keeper fixes it to [tier-1], change the two uses in jdh.js.
- The kit info panel without a subject shows the generic fallback picture (tea set) on the Danh hiệu panel and the info card. KIT REQUEST (optional): a panel picture for "Danh hiệu" (e.g. a sắc phong scroll) — art by review/title-plate-art.
- Flaky in this environment (also in the kit's own dev/test/title-tag.js on the base): the person pop-up sometimes does not open right after a new life (opening cards); title-sys.js retries 3×.
- wearBonus().danh is display-only in the game (jewellery "Danh +1" never reaches any rule) — pre-existing; titles therefore apply Danh/Sủng/Đức as real reversible deltas instead.

## PHASE 2 PLAN (not built; owner 13:20Z (2)(4)(5), 13:30Z (3), FOREMAN_C 13:50Z)
1. Emperor-granted HIỆU (Thục, Hiền, Đức…; j8 TITLES, kitHieuJoin already joins it to the rank everywhere): today j8 bestow() rolls it 30 % on son/promo/contest. Phase 2: grant by thresholds in BAL (`BAL.dh.hieu = {sung:X, danh:Y, minRank:Tần, gap:months}`), checked monthly for her and NPCs (same rule), decree event + kit reward. The roll in bestow() becomes the threshold check (one core).
2. SẮC PHONG BOOK + SEAL: two chest items created with the grant (IT keys `sacphong`, `ngocan`; `nosell:1`; `owner` = pid; `dh:{hieu}`), shown in Tư trang, worn in an equip slot only if the kit keeper adds the slot (KIT REQUEST then). Cannot be sold (sell list filters `nosell`).
3. CONFISCATION: punishment events (cấm túc, giáng phẩm, lãnh cung, phạt bổng) may strip the hiệu and/or the worn achievement title: `p.dhConf = {hieu, title:key, at:turn, why}`; the hiệu leaves the rank, the book + seal move to Nội vụ phủ's store (an item location, never deleted); Danh −BAL, Sủng −BAL.
4. ATONEMENT: a dedicated quest (chép kinh sám hối / lập công) opens after `BAL.dh.conf.wait` months; finishing it returns the hiệu + items (`dhConf` cleared). NPCs follow the same rule.
5. LOSS / THEFT: book or seal lost/stolen → an investigation event (evidence from real game evidence: maids, ledger); whatever the outcome the item STAYS somewhere in the game (OD 13:30Z (3) item conservation) — use Foreman D's shared item-location rule from review/item-ledger when it lands (not on origin yet at 16/11 14:20Z); lost for good → Danh −BAL.
6. Achievement titles themselves are never sold/stolen (they are not items); only confiscated (3).
Data hooks already in phase 1: title objects carry `src:"play"` (phase 2 adds `src:"emp"`); `p.dh[key]` entries can take a `conf` flag; dhApplyFx / dhWear already take a worn title off cleanly.
