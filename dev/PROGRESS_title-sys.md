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
- BONUSES (owner OD 16/11 13:55Z + 14:10Z s17; FOREMAN_C 14:15Z/14:35Z/14:45Z): ONE title worn, it gives ONE bonus, the PLAYER picks it from the title's list (BAL.dh.T[id].ch; catalogue BAL.dh.B with values per step; pick stored per title in p.dh[key].pick; NPCs pick by need). The old flat fx model is gone (old saves: p.dhOn is still given back exactly). Types and their ONE hook: flat Sắc (wearBonus) / Danh, Sủng, Đức, Tài, Tâm cơ (dhApplyFx, reversible); gSung (sg her, ap NPC); gDanh, gBac, gTren (Thái hậu+Hoàng hậu), gTrung (cung nữ) (apply her, ap NPC); gHau (affAdd: consorts' liking of the wearer); phuc LUCK "Phúc khí" (lotB: +v on the odds of every rolled act, never conception; the Quẻ tag stays quẻ-only); thai (conceiveCh, +1/+2 at most, only Trăng soi rèm ngọc and Phúc ấm đầy nhà steps 2–3); nghe (addArt/addArtP chance of +1); thi (SC7[kind].f talent, so shown odds = real score); suc (j76sleep); don (oRumor inside ACT.rumor against the wearer). Gains add +1/d (fractions rolled, so the expected value is exact). Picker = kit info panel + option cards (dhPick). Table per title: dev/handover/reports/review-title-sys.md.
- Steps: BAL.dh.n0 = 1/5/10 (some titles own counts, e.g. Thỉnh an 5/20/50, children 1/3/5, art bậc 3/4/5) → SAME name, tier = b + i*step (max 8). All numbers in `BAL.dh` (jbal2.js); text prints them.
- (superseded by BONUSES above) Stat only while worn (old BAL.dh.T[id].fx): Sắc through the ONE wearBonus (effSac), Danh/Sủng/Đức added on wear and the exact amount taken back on removal (`p.dhOn`). About half the titles give nothing ("chỉ để làm đẹp").
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

## PHASE 2 — BUILT (review/title-sys2, on ced2edc6 = phase 1 PASS; origin/main 5682ce6f already inside)
Owner: OD 16/11 13:00Z, 13:20Z (2)(4)(5), 13:30Z (3), 13:40Z. Code: `dev/build/jdh2.js` (assembled right after jdh.js). Numbers: `BAL.dh.hieu / .conf / .it` (jbal2.js).
1. HIỆU (Emperor-granted, joins the rank via kitHieuJoin): ONE check `dhHieuOK(p)` = rank ≥ Tần (minRank 3), Sủng ≥ RANKS[r].s + 10, Danh ≥ RANKS[r].d + 8,
   2 months at the rank, not lãnh cung / cấm túc, nothing confiscated, not Hoàng hậu, a free name. ONE grant `dhHieuGrant(p)`: hiệu + Sắc phong + Ngọc ấn, Danh +5.
   Monthly: eligible → 25 %. j8 bestow (son/promo/contest): the old `roll(30)` is gone → grants at once when eligible. jexam full seat → the same grant
   (now with its book/seal and Danh +5; still no threshold: the owner-approved seat compensation; bạc instead when her hiệu is confiscated).
   Player view: Nhiệm vụ › Danh hiệu › "Hiệu Hoàng thượng ban" (has / how to get + what is missing / where the book + seal are).
2. ITEMS: IT `sacphong` "Sắc phong", `ngocan` "Ngọc ấn" (j8, kd Kỷ vật, keep:1 → econ "kỷ vật: không bán", nt:1). Entries {k, from:"emp", own, hieu, dhid}.
   Never sold (sellItem refuses keep), never given (giveTo / giftBagFor refuse). Old saves: anyone with a hiệu gets the two pieces once, quietly.
3. CONFISCATION: ONE weekly state check per person (p.dhSn = [rank, out, confined]) catches every punishment route (punish, fall, demote, cold, deathSentence
   mercy, inline rank drops in j4/j67/jreign); the reason is stamped by wrappers on the punishers. Odds BAL.dh.conf.p: lãnh cung [hiệu 100, title 100],
   giáng phẩm [50, 35], cấm túc [0, 40]. Hiệu → p.dhConf.hieu (reserved), pieces → Nội vụ phủ store (S.il.box, the item ledger's record shape,
   rel never), worn title → p.dh[key].conf (not wearable, not in earned()). Danh −5, Sủng −3. Her: kit notice panel "Bị thu hiệu ban".
4. ATONEMENT: opens 3 months after (out of lãnh cung, no cấm túc): road A Chép kinh sám hối = 3 copies made after opening (counted by jdh m_kinh),
   road B lập công = Danh +12 over the value at opening. Done → her: PEND dialog "Dâng biểu sám hối" (or later); NPC: at once. Everything comes back.
5. LOSS / THEFT: 2 % a month per piece held → a jlost case for THAT piece (loLose with the piece forced; cause from loCause: rival only when her motive
   allows; rival may keep it, LO.keepP). jlost's own random loss and the laydo theft never pick these pieces (loOk). Her: investigation dialog
   "Ấn tín thất lạc" (Báo Cung Chính ti tra xét / Lặng lẽ hỏi cung nhân = jlost loDo, real evidence; Để sau). Case closed, piece not back → Danh −8 once.
6. CONSERVATION (census, weekly): one book + one seal per hiệu (held or confiscated) somewhere (chest, store, case, dialog); none → recreated in the store
   ("Nội vụ phủ nhặt được", back home after 4–10 weeks); duplicates dropped. Works with or without Foreman D's jil.js (review/item-ledger, not on main):
   uses ilLog when present, writes the same S.il.box records itself otherwise; store records carry rel 1e9 + dh:1 so jil's own ilconf never returns them.
Family fixes on the way: jinv showed "Sủng không dưới 15" on every keep / ngự tứ item (it is ngocboi's own rule) → ngocboi only; j8 giftVal / NPC monthly gift
threw on items without a tg list (jeitem home pieces) → tolerant.
Tests: `dev/test/title-sys2.js <url> <out> [WxH@dpr]` (logic her + NPC + UI panels). Serve with a UTF-8 server (dev/test/lib/device.js serveRoot), not python http.server.
