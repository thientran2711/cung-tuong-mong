# kc-roads-cn-nc report (branch review/kc-roads-cn-nc)

Task (main s11, opus): a PRE-PALACE home road for "Cung nữ tuyển vào cung" and "Công chúa hòa thân" (every country branch), the td pattern
(review/kc-lore): home life → sending event as a kit event card → selection (rank = ceiling only, earned) → today's palace road unchanged.
Owner rules applied: OD:L1244, L1250, L1251, L1252, L1253, L478; co-op OD:L1263 (16/11 07:25Z, s11). Base: review/kc-lore + origin/main.

## KEY NAME NOTE (please check)
The brief says `cn "Cung nữ tuyển vào cung"`. In the code the keys are the other way round: **cnv** = "Cung nữ tuyển vào cung" (j42, servant
start, commoner, Nội vụ phủ draft) and **cn** = "Cung nữ được sủng hạnh" (j1, starts as a consort, used to serve tea at Càn Thanh, so she has
lived in the palace for years). The road was built for the origin the OWNER named ("Cung nữ tuyển vào cung" = key cnv: poor family, the maid
order reaches the village), which is exactly the content the brief describes. cn (được sủng hạnh) keeps no home road, as OD:L1251 says for the
already-in-palace maid. If main meant otherwise, the data moves by changing one line (KC2K).

## What was built (dev/build/jkc2.js, assembled right after jkc.js; site rebuilt)
Data on the jkc machinery (tabs, map, deck cards, PEND kcE dialogs, Gia tộc pager + pcard, Mệnh truyện skill cards, hud, top-bar chip,
goal strip): new games only (S.kc.v 3, S.kc.kd "dan" | "nc"); every older save is untouched (no S.kc.kd).
- **cnv (dan, "Ở quê chờ lệnh tuyển")**: a village, ~10 months. People: Phụ thân, Mẫu thân, Huynh trưởng, **Xuân Đào** (the same girl j67
  cnv_ban names), Lý trưởng (creditor, writes the draft list), Bà Tư (old palace maid, teaches lễ nghi, tells of Lưu ma ma / Tân Giả khố).
  Numbers: Tiếng trong xóm (kgt), Nợ nhà (kap, grows monthly; 100 → creditor), Khéo tay 0–5, Lễ nghi 0–5. Places: Nhà tranh, Ruộng nhà,
  Bến sông | Đình làng, Chợ huyện, Chùa làng, Nhà bà Tư. 16 cards, 8 weekly events (mother ill, flood, tax, lý trưởng's son, merchant, brother
  gambling, rich man's concubine offer, creditor), 3 hồi "Lệnh tuyển cung nữ" (name on the list / bribe it off; the an gia money; the night
  before with Xuân Đào). Sending card "Ngày tuyển cung nữ" (origin painting) → choose Khéo tay (j91 kim) / Vấn lễ (le quiz) / wait → result.
  Placement = the cung nữ "rank": good → maid of a palace head (Tần+), fair → maid of a low consort, poor → Tân Giả khố 4 weeks first
  (j42 srvInit, unchanged servant road after). Xuân Đào enters in the same draft as ONE real maid of another palace, known to her (OD:L1247).
  If her name was bribed off the list: "Ở lại quê nhà" (life ends) or go anyway (−3 at the selection).
- **nc / bd (nc, "Ở cố quốc chờ hòa ước")**: her home court, ~10 months. People: Phụ vương / Phụ hãn, Mẫu hậu / Khả đôn, Hoàng huynh (nc) or
  Trưởng huynh + Nhị huynh (bd, as jorigins bd_hoang), Hoàng thúc (nc, as j67 nc_vuong), Vương muội / Muội muội, Sứ thần Đại Hy (from hồi 1).
  Numbers: Hòa ước (kgt), Phe chủ chiến (kap), Hồi môn (khm), Lễ nghi Đại Hy 0–5. Places per country (Tẩm điện, Chính điện, Vương uyển,
  Chùa Sùng Thánh, Dịch quán, Chợ, Bờ hồ Nhĩ Hải | Trướng, Kim trướng, Bãi ngựa, Miếu thần núi, Doanh trại sứ, Chợ phiên, Thảo nguyên).
  17 cards, 7 events (festival, sister's bid, father ill, treaty clause, assassin, uncle's banquet, war faction), 3 hồi "Hòa ước" (meeting the
  envoy; who goes — she may push the sister and stay home = life ends; the secret order (nc, j4/j67 nc_gian) / the 300 horses + oath (bd)).
  Sending card "Hòa ước ký xong" (origin procession painting) → "Lễ ra mắt": dance (j82 mua) / Vấn lễ / let the envoy speak → rank.
- **Selection (OD:L1250)**: a real mini-game round of the existing engine (playArt, the same as Phúc tuyển) + home numbers (Sắc, Đức/Tài,
  Khéo tay or Lễ nghi learned at home, Tiếng/Hòa ước, Lý trưởng's or the envoy's favour, Thái hậu dislike, rumour). Score ≥55 → the ceiling
  (nc Tần, bd Quý nhân, cnv a palace head's maid); ≥40 → one step lower; else two steps lower. Hook for a dedicated selection mini-game:
  `window.kcEntryExam(kind, done)` (TODO comment in kc2Play). "Vào cung ngay" still gives the origin rank directly (today's rule, not in scope:
  see question 2).
- **No fixed best answer (OD:L1253, L478)**: odds read this life's random natures (lý trưởng Tham lam/Cương trực/Ba phải/Đa nghi takes a gift
  differently; father Nóng nảy turns a complaint into debt; sister Tham vọng/Kiêu ngạo vs Nhu mì; Phụ vương Cương trực/Tham vọng/Cẩn trọng),
  how they feel about her (af), her numbers and earlier choices (kim, le, meOk, sx favour). Every bạc card has a twin of equal weight
  (Sức + khắc or a favour; BALANCE rule 15/11 20:30Z).
- **kitName fix (whole group)**: at home the caption over HER figure in every dialog said "Đáp ứng" (RANKS[S.rank]) on all home roads
  (tiểu thư too). Now her home word (Tiểu thư / Thôn nữ / Công chúa), one wrapper on kitName.
- **CO-OP (OD:L1263)**, every home road incl. the six tiểu thư roads: (1) identity card follows the friend: friend at home → "Vào cung ngay"
  closed with the reason, home road preselected; friend already in the palace → home road closed. (2) a kd road's sending month moves to the
  friend's selection month (tiểu thư: Sơ tuyển month). (3) entry barrier: passing the selection in co-op sets S.kc.gate ("Chờ hảo hữu" card,
  life at home goes on); both enter when the MERGED week shows both gates → the same week for both.

## Tests (all on this branch's build; shots looked at)
| test | sizes | result |
|---|---|---|
| dev/test/kc-roads/route.js --origin=cnv: card → home → 8 tabs → ~3 months random play → sending → selection (Vấn lễ / skip) → palace maid → 4 buổi → save/reload | 755x1000@2, 1180x820@2 | PASS, 0 page errors, no overflow / cut text / ??? |
| same, --origin=nc | 755x1000@2, 1180x820@2 | PASS (ranks seen Thường tại … Tần) |
| same, --origin=bd (scratch merge with review/origins-r1, NOT pushed) | 755x1000@2, 1180x820@2 | PASS |
| dev/test/kc-roads/coop-together.js cnv + nc (live Worker) | Fold 755x1000 + iPad 1180x820 | 37/37 (card lock, same due, A waits at gate, both enter week 4) |
| same, tt (tiểu thư) + cnv | same | 37/37 (cnv due moved 10 → 23 = tt Sơ tuyển month; both enter week 4) |
| dev/test/kc-lore/route-td.js --origin=tt (regression) | 755x1000@2 | PASS |
| dev/test/outside/oldsave.js (main save → this build; home save reload) | 755x1000 | PASS, 0 errors |

## Lore scan (dev/test/kc-roads/scan.js) — before / after
Before = main: these origins had no home road, so nothing at home could contradict the palace. After:
| origin | palace fact (source) | home road | ok |
|---|---|---|---|
| cnv | Xuân Đào, same village, same draft (j67 cnv_ban) | Xuân Đào in the village; exactly 1 palace maid named Xuân Đào, known to her (a palace maid who drew that name is renamed at start) | yes |
| cnv | commoner, Nội vụ phủ draft (j42 line, ORIGIN_LORE) | Thôn nữ, draft at huyện đường → Cung nữ / Tân Giả khố | yes |
| cnv | Lưu ma ma of Nội vụ phủ (j67 cnv_ma) | Bà Tư names her | yes |
| cnv | age (j42 srvInit 18–20) | 18 at home → same age kept at entry (srvInit's random age undone) | yes |
| nc | father alive, sends secret orders, dies later (j4 goal, nc_gian, nc_vuong) | Phụ vương alive at entry; illness at home always recovers; she may refuse the spy role, he still wants it | yes |
| nc | Hoàng huynh leads envoys; Hoàng huynh vs Hoàng thúc (nc_su, nc_vuong) | both exist, both alive | yes |
| bd | two elder brothers fight (bd_hoang) | Trưởng huynh + Nhị huynh | yes |
| bd | 300 horses dowry (bd_ngua s1); 10-year treaty (origin line) | hồi 3 always says 300 horses; treaty clause says 10 years | yes |
| nc, bd | rank = ceiling only (OD:L1250) | middle result → one step under the ceiling | yes |

## ART LIST (SAMPLE requests for main — nothing generated here; placeholders in use)
Places (16:9 scenes, morning/evening if the set has them):
1. cnv: Nhà tranh (three-room thatched hut, loom, hearth) · Ruộng nhà (rice field behind bamboo) · Bến sông (village landing, girls washing) ·
   Đình làng · Chợ huyện · Chùa làng (small village pagoda) · Nhà bà Tư (old woman's hut). Now: origin-wide-thd / muoi, ngu-hoa-vien, duong-tam-dien.
2. nc: Tẩm điện (Nam Chiếu princess chamber) · Chính điện Nam Chiếu · Vương uyển (camellia garden) · Chùa Sùng Thánh (three white pagodas by
   the lake) · Dịch quán sứ Đại Hy · Chợ kinh đô · Bờ hồ Nhĩ Hải. Now: Đại Hy palace scenes + origin-wide-nc.
3. bd: Trướng (felt tent interior) · Kim trướng · Bãi ngựa · Miếu thần núi (stone cairn, cloth strips) · Doanh trại sứ Đại Hy · Chợ phiên ·
   Thảo nguyên. Now: Đại Hy scenes + origin-wide-bd.
People (ART COMPLETENESS: all 4 age bands each):
4. cnv: peasant father, peasant mother, peasant elder brother, Lý trưởng (village head), Bà Tư (old ex-palace maid), Xuân Đào (village dress;
   in the palace she uses her servant figure). Now: official/mama/man/consort pool faces (the father wears a court robe: wrong, placeholder).
5. nc: Phụ vương, Mẫu hậu, Hoàng huynh, Hoàng thúc, Vương muội in Nam Chiếu dress; bd: Khả hãn, Khả đôn, two brothers, sister in steppe
   dress; Sứ thần Đại Hy (Đại Hy official is fine).
6. Her own home dress: tier "ngheo" exists for some faces (cnv uses it); a Nam Chiếu dress tier and a Bắc Địch dress tier for her (today the
   khuê các "kc" tier). Sample first, then the per-face set (Foreman C mass production).
Event pictures (KIT §50.1: only a picture that means the event; these show none today):
7. Xuân Đào crying at the river · cloth merchant · brother gambling · selection at huyện đường (today: origin-wide-cnv palace gate) ·
   Lễ hội đuốc (nc) / Hội đua ngựa (bd) · the sister's bid to the envoy · the uncle's banquet · hồi 2/3 talks with the father.
8. Entry animation per origin (OD:L1244) — not built here (no kit part for it yet; see question 3).

## Questions / limits for main
1. cn vs cnv key naming (top of this report).
2. "Vào cung ngay" still enters at the origin rank directly; OD:L1250 says every origin earns its rank at a selection. Should the direct
   road get a selection too (out of this task's scope)?
3. KIT REQUEST (not blocking): an entry animation part (OD:L1244) for every origin; none exists in KIT.md that I could reuse.
4. Co-op edge: if the friend is at home and my rolled origin has NO home road (cn "Cung nữ được sủng hạnh"), I still enter at once (the rule
   cannot hold without a home road for cn). Same if both press "Nhận thân phận" in the same instant with different roads.
5. bd lives on review/origins-r1 (not on main): jkc2 carries its data; it was tested in a local scratch merge only.
