# Palace residence in the Ming/Qing inner court — and how «Ban cung» maps it (history expert, law 8)

Order: MAIN CHÍNH 86, 21/11 03:45Z, owner mark #53 (verbatim in dev/handover/FOREMAN_D_STATUS.md, owner line 21/11 ~04:12Z:
"không phải cái cung nào cũng xin được đâu … phải có lý do nào đó mà hoàng hậu mới ở cái cung đó, thái hậu mới ở cái cung đó …
Vị trí hướng nè … nó gần hay nó xa với cái cung của hoàng thượng … xác suất mà xin được cái cung đó hay không á, nó còn phải có cái xác suất nữa").
Written by worker BAN CUNG (D #14), 21/11. English (repo rule); player words stay Vietnamese (VANPHONG).

## 1. What history says

### 1.1 The axis: Emperor, Empress, Empress Dowager each have a fixed place
- **The Empress lives on the central axis, directly behind the Emperor.** The Inner Court's axis runs Càn Thanh (Qianqing, the
  Emperor's palace) → Giao Thái → Khôn Ninh (Kunning, "Earthly Tranquility"). Every Ming empress lived in Kunning; the name pairs
  with Qianqing as Earth with Heaven, wife with husband (yin/yang on one axis). In the Qing it stayed the "main harem" in name, used
  for the wedding night and shamanic rites, while the empress actually lived in one of the Six Palaces [S3][S4]. The point the owner
  asks about: the Empress's place is **not chosen**, it is the office itself — the palace on the axis, nearest the Emperor and
  above all others.
- **The Empress Dowager lives apart, to the WEST, outside the Six Palaces.** Ming: Nhân Thọ (Renshou) → rebuilt 1536 as Từ Ninh
  (Cining); Qing: Cining for the early/middle dowagers, Thọ Khang (Shoukang, built for Qianlong's mother) "exclusively for empress
  dowagers" [S5][S6]. West = the senior side; apart = the widow of the former reign does not share the new Emperor's harem. Again a
  fixed office, never asked for.
- **Disgraced women go to a remote corner** (Lãnh cung — any far, closed hall; popularly Diên Hy/Yanxi, the far south-east palace,
  "a cold palace" for overlooked low consorts, burnt repeatedly, the 1845 fire killed a concubine) [S2].

### 1.2 The Six Eastern + Six Western Palaces (Đông lục cung / Tây lục cung)
- Twelve walled courtyards, six on each side of the axis, for the consorts [S1][S7]. Each has a main hall (chính điện) for the
  **chủ vị** (palace head) and side halls (phối điện / thiên điện) for lower women placed under her [S8] — the game already models
  this (jpal: Tần+ = chủ vị, Quý nhân and below in side halls, BAL.res).
- **Prestige = nearness to where the Emperor sleeps.** In the Ming and early Qing the Emperor slept in Càn Thanh on the axis, so the
  palaces nearest the axis ranked higher; Ming high consorts favoured the Eastern group [S7]. From Yongzheng (1722/23) the Emperor
  lived in Dưỡng Tâm điện (Yangxin, Hall of Mental Cultivation), just south of the Western Six; from then **Vĩnh Thọ (Yongshou) and
  Dực Khôn (Yikun), the nearest two, housed the favourites** — "its location near the emperor's resting palace made it a home for many
  of his favorites" [S1][S2]. Distance = how easily the Emperor visits, how fast news reaches her, how often she is seen.
- **Some palaces carry a name** beyond distance: Chung Túy (Zhongcui) was the Ming crown prince's residence (1571) and later an
  empress's [S8]; Trường Xuân (Changchun) was Empress Xiaoxian's and then Cixi's [S7]; Thừa Càn (Chengqian) was the Shunzhi
  Emperor's beloved Donggo's. A lower woman asking for such a palace is asking for the standing of the woman who lived there.
- Yikun was "not reserved exclusively for top-ranked consorts" [S2]: there was **no written law per palace**; the rule was custom +
  the Emperor's decree. Residence was assigned by decree (thánh chỉ / khẩu dụ) on promotion; the Empress, as head of the harem,
  arranged lodging and could object.

### 1.3 What a lower consort could ask for, and how it went
- No consort chose her palace. She could **petition** (tâu xin) — through the Empress, through the Emperor in a night of favour, or
  through the Thái hậu's goodwill. The decision rested on: (a) her **rank** (a Tần asking for the palace by the Emperor's door is
  "vượt phận", overstepping); (b) her **favour** now; (c) the palace's **standing** (near the Emperor / famous former owner);
  (d) **who else wants it** — a higher consort's claim or the Empress's plan comes first.
- A humble request (a quieter, farther palace) was easily granted and praised as modesty (khiêm cung) — reputation and virtue.
- An overreaching request, refused, cost her: the Emperor's displeasure, the Empress's notice ("không biết phận"), gossip in the
  six palaces, and the grudge of the consort whose claim she crossed. Accepting the decree as given was always safe.

## 2. Mapping onto this game (the Đại Hy plan, dev/build/j26 MAPH + jpal PAL_WEST)
Fixed offices — never in the «Ban cung» list (unchanged): **Càn Ninh cung** = Hoàng hậu (on the axis, north of the Emperor's
Dưỡng Hòa điện — the Kunning analogue); **Đức Thọ cung** = Thái hậu (far west, apart — the Cining/Shoukang analogue);
**Trường Môn viện** = lãnh cung (the north-east corner).

The ten askable palaces (PALN). "Distance" is measured on the plan from the palace anchor to Dưỡng Hòa điện (dtd) — never typed;
"standing" (danh) is the history weight above, one table BAL.banCung.danh:

| palace | where on the plan | history analogue | standing | who may ask (BAL.banCung.need) |
|---|---|---|---|---|
| Vĩnh Thọ cung | west, beside Càn Ninh (the queen) — mid-distance to the Emperor's hall on this plan; standing from its history | Yongshou — nearest Yangxin, favourites | 3 | Quý phi and above |
| Dực Khôn cung | west, beside Càn Ninh (the queen) — mid-distance to the Emperor's hall on this plan; standing from its history | Yikun — favourites, Cixi's birthday palace | 3 | Quý phi and above |
| Thừa Minh cung | inner east row, second from the Emperor | Chengqian — Donggo, the beloved | 2 | Phi and above |
| Diên Huy cung | inner east row, beside the Emperor's hall | (nearest door on this plan) | 2 | Phi and above |
| Trường Xuân cung | inner east row, far north | Changchun — Empress Xiaoxian, Cixi | 2 | Phi and above |
| Chung Tú cung | outer east row | Zhongcui — Ming crown prince, later empresses | 1 | Tần and above |
| Cảnh Phúc cung | outer east row, south | — | 1 | Tần and above |
| Khải Tường cung | outer east row | Qixiang (Taiji) | 1 | Tần and above |
| Vĩnh Hòa cung | inner east row, north | Yonghe | 1 | Tần and above |
| Hàm An cung | outer east row, far north, beside lãnh cung | a remote corner (the Yanxi "cold" role) | 0 | Tần and above |

Rules that follow (built in dev/build/jbancung.js, numbers in BAL.banCung):
1. **Locks** — a palace whose standing needs a higher rank is shown but cannot be asked; the card says why in cổ trang words
   («Cung bậc nhất lục cung, lệ chỉ dành cho bậc Quý phi trở lên; tâu xin là vượt phận.»).
2. **Odds** (ladder word, never %) = base + favour + rank above the palace's need − standing − nearness to the Emperor's hall −
   rivals who want it (living chủ vị-rank consorts, the Empress's side, of a rank ≥ the palace's need who hold a palace of lower standing).
3. **Refusal** (law 3 gain-and-loss, law 2 equal value): a higher palace = harder odds and a heavier refusal (Sủng, Danh down;
   the strongest rival who wanted it remembers — her ghét rises). A humbler palace (lower standing than the one granted) = easy,
   with Đức up for modesty. Same standing: nearer the Emperor's hall = Danh + (BAL.banCung.ok.danhNear; nearness is prestige),
   not nearer = the humble gain (Đức). «Nhận» (accept the decree) = sure, small Đức (gratitude), no loss. Success moves her to the palace.
4. **Grant** (law 1 one rule for all): the decree itself now follows the same locks — the Emperor grants the best free palace her
   rank allows (NPC heads too; palFix). NPCs who rise to chủ vị petition with the same odds function and pay the same refusal.
5. **Co-op**: odds are a pure function of the shared world (no dice in the odds), so both seats see the same word for the same ask.

## Sources
- [S1] Palace of Eternal Longevity (Yongshou) — https://en.wikipedia.org/wiki/Palace_of_Eternal_Longevity ; travelchinaguide https://www.travelchinaguide.com/attraction/beijing/forbidden-city/palace-of-eternal-longevity.htm
- [S2] Yikun / Yanxi — https://en.wikipedia.org/wiki/Palace_of_Earthly_Honour ; https://en.wikipedia.org/wiki/Palace_of_Prolonging_Happiness ; https://www.travelchinaguide.com/attraction/beijing/forbidden-city/palace-of-prolonging-happiness.htm
- [S3] Kunning — https://www.travelchinaguide.com/attraction/beijing/forbidden/tranquility.htm ; Google Arts & Culture "The Wedding Chamber…" https://artsandculture.google.com/story/3wVRRdnkrZz5qA
- [S4] Smithsonian, Empresses of China's Forbidden City 1644–1912 — https://asia.si.edu/exhibition/empresses-of-chinas-forbidden-city-1644-1912
- [S5] Cining — https://www.chinaservicesinfo.com/s/202105/24/WS60ab675e498e7a02c6f6bfd3/palace-of-compassion-and-tranquility-cining-gong.html
- [S6] Shoukang — https://www.travelchinaguide.com/attraction/beijing/forbidden/palace-longevity-health.htm
- [S7] Six Eastern / Six Western Palaces — https://www.travelchinaguide.com/attraction/beijing/forbidden/six_eastern.htm ; https://travelchinaguide.com/attraction/beijing/forbidden/six_western.htm ; https://www.wikiwand.com/en/articles/Palace_of_Eternal_Spring
- [S8] Zhongcui / side halls — https://www.ancient-history-sites.com/?p=133240 ; Imperial Chinese harem system https://en.wikipedia.org/wiki/Imperial_Chinese_harem_system
Caveat: no primary Qing regulation fixes "palace X for rank Y" (searched; the Qing Huidian would be the place to look). The locks above
are this game's codification of the custom (nearness + former owner + decree), as the owner asked.
