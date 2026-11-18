# review/luxury-r1 (D17 xa xỉ) — independent reviewer (rules/numbers/economy)
**PASS a84d31c2d348cda8290b4b89b959f94714dd25dd** (branch review/luxury-r1; descends from origin/main bad941b4; jlux.js after jtoil; site rebuilt with build_site.sh)

Base: review/luxury 86bca64e2 merged onto origin/main a942395b, then origin/main bad941b4 merged in (only assemble.py/generated-file conflicts).

## Reviewer fixes (on review/luxury-r1)
1. **Co-op desync (real bug):** the guest also ran luxEdictTry on her own month (it was not muted like rivalsMonth), so she could see an "Ý chỉ tiết kiệm" card the world never had, and never got a card for the host's real edict. Now only the host rolls it. The guest reads S.luxEdict from the world and gets the card once (S.luxEdictSeen is her own key). New test 5d.
2. **Theme tags missed items loaded after jts** (main's jkc pieces ngocboikc and vongbackc had no theme, so test 4b failed after the merge). jts re-tags whenever the item list grows (kidThemes wrapper + contest entry points), so every module is covered.
3. **Theme tagger matched parts of words:** "thạch" matched hạc, "song" matched son, "thoa" matched hoa. It now matches whole words only (Unicode letter boundaries). Tag changes: tram_hong loses Cổ phong; thoa_diep loses Hương sắc; kimthoa_phuong keeps only Phú quý. All 53 wearables still have ≥1 tag.
4. **luxury.js was flaky:** a random servant start gave no dress verdict (jtoil is off for servants), so 4–5 checks failed about 1 run in 4. The test now restarts until it gets a consort life. 5/5 clean runs on the merge and on the personality trial-merge.

## Checks (numbers)
- (1) **No silent behaviour change:** sweep of r = 0..1 at F 0/1/2 with no host/context gives the same verdict as main's toilDress (BAL.toil.dress); above the allowance, luxOf lv2/3 gives phô trương on both. Morning Điểm trang (no host) is unchanged.
- (2) **Host shifts (thỉnh an, % of allowance):** normal: giản dị <20, hợp dịp 38–100. Frugal: hợp dịp 32–80, phô trương >84. Strict: giản dị <25. Emperor "lộng lẫy": giản dị <24, hợp dịp ≥44 (yến ≥64). Thường day: frugal phô trương >76 (normal >90).
  **D7 soft hook:** without personality, trongOf is undefined and shifts come from nết only. Trial-merged with review/personality-r1 (adds jtrong.js after jaudit; conflicts only in assemble.py and generated files): trọng Kiệm/Khiêm gives frugal, Lễ gives strict, real NPCs e.g. Hiểm độc[Cần,Trí] → strict (nết), Hiền lành[Nhân,Kiệm] → frugal. luxury.js 16/16 on the trial build. The trial branch was not pushed.
- **Mourning/edict:** thiếu lễ is suppressed under quốc tang and under the edict (plain greeting: false, normal day: true). Ranges are capped.
- **Extras once per host per day:** two aaThieuLeApply("th") calls the same day: Đức 30→29→29.
- **Tiếng xa hoa:** rep ≥6 gives Danh −1, Thái hậu −2 (14/4 → 13/2) and the log line. Back inside the allowance it fades by 1 a month ("đã lắng").
- **Edict frequency (sensible bot, branch):** 4 edicts in 25.5 bot-years (1 per ~6 years). endTurn-only 10-year sims: 1 edict per 10 years in each of 2 runs. In line with "~1 per 5 years".
- **NPC Đức:** endTurn-only 10-year sim, 2 runs each — main 48.5→61.7 and 51.3→53.0; branch 46.3→59.4 and 57.6→59.9. No long-run drain; the worker's 48-month dip (52–55 → 42–47) recovers. Under the sensible bot (life end, 3–9 yr) NPC mean Đức is main 20/28.7/31.8 vs branch 15.8/19.3/21.7/23.2. Low on both builds (bot pressure, pre-existing); D17 takes off a further ~6–8. **Acceptable** (lavish NPCs pay, per "NPCs same rules"); owner question 5 below.
- **Dress contest:** 5 themes with ranges. The old price term is gone (tsDressPts now scores theme hits + range). Empty-slot fix: P.hair/P.ao are filled from what she wears. Score function (tsDressTotal) is identical for her and NPCs; NPC smart pick ≈ her loyal-maid pick (same tsDressBest). In-range beats phô trương, which beats vượt phẩm; too plain loses to in-range (test 4a).
  **Theme tags, sample of 30 wearables:** ~27/30 sensible after fix 3. Leftovers are harmless: Vòng ngọc Hòa Điền → Cổ phong (place name), Áo vải xanh cung nhân → Thanh nhã (colour).
- **Bạc flow:** jlux never touches bạc (grep). Bot bạc/month is in the same band on both builds (branch 58–90, main 35–118; noise).
- **Deck Kèm 0/6 → 6/6:** the cardH wrapper only appends " · kèm: <risk>" to a display copy of a.x and reuses the card's existing Kèm row. Data fix, no new kit part.
- **Old saves:** test 6 (keys removed, a month plays); coop-e2e "solo: old save loads".
- **Tests:** luxury.js 16/16 (incl. new 5d), thieu-le.js ok, coop-e2e 59/59 twice (after each main merge), no page errors.
  **Shots** (luxury-shots 755x1000 + 1180x820; I looked at all 8): the card Kèm names Xa xỉ; the báo đề row Xa xỉ 70–150 is kitRows; the board is kitItem + kitItemDetail with a Hợp đề row; the edict card is kitRows.
  Two shot-script artifacts: the 1180 edict shot is covered by main's "Rương đồ" chest overlay; the announce picture frame is empty (CDN art in the shot run).
- **Kit/VANPHONG:** no new kit part or per-place CSS; no %, no "chắc chắn". The K15 board line (running Xa xỉ N invisible while dressing) is already filed.

## Not D17 (pre-existing on main, noted)
- A servant start wears Đáp ứng-grade issued clothes (tram_hoalua/y_hoanho P1 at P0), so wdStatus reads "over"/vượt phẩm. jtoil is off for servants, so there is no penalty today. It would start to matter if dress rules ever cover servants (j92 cap for servants).

## Gain-and-loss rule (owner 16/11 07:15Z)
D17's own small rewards have no explicit loss attached:
- hợp dịp at yến/lễ: Danh +1
- in range under an edict: 1 in 3 Đức +1

The cost is the choice itself: owning and wearing the right pieces, and lavish dress risking Đức/host/ghen at the same moments. The contest prize (Sủng +3, Danh +3, gift) is pre-existing and costs Sức −5 plus over-dress risks. Owner question 6.

## Owner questions (worker's 1–5 stand; reviewer view)
1. Show the theme range on báo đề (allowance stays hidden). Reviewer: yes.
2. Above her allowance in a contest = vượt phẩm even inside the theme range. Reviewer: yes, it matches 23:05Z ("greedy players … punished").
3. Đức −1 per formal meeting when too lavish (once per host per day; NPCs once a month). Reviewer: keep. She can avoid it by dressing in range.
4. Edict ~1 per 5–6 years, 3 months. Reviewer: fine.
5. NPCs really dress now, so the contest is harder for her, and lavish NPCs lose a few Đức. Reviewer: accept.
6. Should the small dress rewards (Danh +1 hợp dịp lễ lớn, Đức +1 under edict) carry an explicit loss, e.g. rivals' ghen +1 when she is praised? Today the cost is the outfit choice itself.
