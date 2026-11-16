# ROAD MAP — every chapter of a life (Cung Tường Mộng)

Owner of this map: Foreman B (story roads plan owner, main s19 15:45Z "STORY ROADS SPLIT"). This file GROWS dev/STORY_ROADS_PLAN.md
(docs branch); it is not a second plan. Where they differ, the plan's owner words (its appendix + dev/rules/topic/story-roads.md) win and
this map is corrected in place (canon overwrite, OD:L1232).
Live copy: docs branch `claude/cung-tuong-mong-handover-hj0h8w` dev/story/ROAD_MAP.md (build copy: branch `review/road-map`).
Every foreman (B, C, D) follows this map for chapter ids, order, cast and the canon rules in §5. A change to a chapter's id, order or cast
goes through Foreman B (one line in §7 CHANGE LOG), never edited silently by another foreman.

## 0. Totals
| Block | What | Chapters (units) | Foreman | Status 16/11 |
|---|---|---|---|---|
| P0 Pre-palace | origin intro (narrated + 3–4 painted panels + entry animation + tuyển tú minigame) | 9 origins + 1 branch (bd) = 10 | C | to build (0 done) |
| P0 Pre-palace | home roads «Ở nhà chờ tuyển tú» | 6 (jkc) + 2 kinds (cnv «dan», nc/bd «nc») | D | 6 on main (jkc.js); cnv+nc on review/kc-roads-cn-nc-fix-r1 |
| Part 1 · ch 1–3 | Nhập cung học việc (tutorial chapters, DO-the-feature quests) | 3 chapters × 2 variants (consort / cnv servant) + len14 | C | frame + milestone checks on review/story14-p1-r2; P2 quests to build |
| Part 2 · ch 4–11 | Truyện xuất thân: 9 origins × 4 roads × 8 chapters | **288** | B | ch4 of every road exists (j67 premise arc, main); ch5–11 to build (252) |
| Part 3 · ch 12–14 | Ngôi Trung cung (endgame) | ch12 × 3 variants + ch13 + ch14 = 5 | B | st_con, st_dong, hau, ke exist (j67, main); childless ch12 + hồi form of 13/14 to build |
| Fillers | shared arcs (only when a road chapter cannot run) | 8 shared + st_the | — | exist (j67, main) |
| Side threads | Thanh mai trúc mã (j96 tm96a/b/c), rare endings (j97), Việc nhờ (j72), reign lines (jreign) | 3 + — | B keeps | exist (main) |
| NPC roads | women (consorts, maids): one of the 36 roads of their rolled origin; men: ~20 templates | 1 unit = 1 NPC | D | 0 done |

Grand total of numbered player chapters: 3 + 288 + 5 = 296 written chapters (+10 intros, +8 home roads); one life plays 14 of them.

## 1. Origin keys (code is the source; the plan text had cn/cnv swapped)
| key | Origin (j1/j42 ORIGINS.n) | Entry ceiling | Home road | Origin finale title (MS67) |
|---|---|---|---|---|
| tt | Con gái Tể tướng | Quý nhân | jkc (main) | Ván cờ phủ Tể tướng |
| dtq | Con gái Đại tướng quân | Thường tại | jkc (main) | Vinh nhục nhà tướng |
| muoi | Con gái nhà buôn muối | Đáp ứng | jkc (main) | Từ muối lên tước |
| cn | Cung nữ được sủng hạnh (a former maid already raised) | Thường tại | none | Rửa sạch thân phận |
| nc | Công chúa hòa thân — branch Nam Chiếu (nc) / Bắc Địch (bd) (OD:L1213/L1215: ONE origin, country branches) | Tần | jkc2 «nc» (review) | Công chúa hai nước |
| td | Con gái tội thần | Đáp ứng | jkc (main, fall card at entry) | Báo thù cho nhà |
| ch | Cháu gái Thái hậu | Quý nhân | jkc (main) | Cháu gái Đức Thọ cung |
| thd | Con gái thầy đồ nghèo | Đáp ứng | jkc (main) | Danh tiếng nhà nho |
| cnv | Cung nữ tuyển vào cung (servant start, j42) | maid post | jkc2 «dan» (review) | Từ cung nữ đi lên |
NOTE: STORY_ROADS_PLAN §2/OD:L1251 wording calls the servant-start origin "cn" and the raised maid "cnv"; in code it is the reverse
(cnv = «Cung nữ tuyển vào cung», cn = «Cung nữ được sủng hạnh»). Every foreman uses the CODE keys above. kc-roads-cn-nc already did.
Entry rank = ceiling only (OD:L1250): the selection minigame (C, P0) decides the real rank.
nc roads are written ONCE with country slots ({land}, {dad}=Phụ vương/Phụ hãn, {court}) from KC2LAND (jkc2); bd plays the same 4 roads
in its own land words. No 5th–8th nc road (OD:L1215: no new structure).

## 2. One life, in order (frame = jst14 on review/story14-p1-r2, numbers in BAL.st14)
```
P0  intro (C) → [home road (D) if chosen «Ở nhà chờ tuyển tú»] → selection minigame → entry rank
1   nhap14  Nhập cung, đứng vững        | cnv: Kẻ hầu mới vào cung          (C)
2   sung14  Lần đầu được sủng            | cnv: Lọt vào mắt Hoàng thượng      (C)
3   tap14   Học quy củ trong cung        | cnv: Đồng liêu / chủ tin (P2)      (C)
4–11 ROAD <origin>_<road> chapters .4 … .11 (rolled at đầu thai, avoiding ctm-arcs history)   (B)
     cnv only: ms:len14 «Từ kẻ hầu thành tiểu chủ» is inserted where she is raised; it does not take a road number (road chapters
     read whether she is still a maid, see §4.9)
12  ch12: st_dong Ngôi Đông cung (has a son) | st_con Con đường của con (child, no son) | noi14 Người nối dõi (childless) |
         cnv still a maid: len14 Từ kẻ hầu thành tiểu chủ — chosen when ch12 opens (jend14.js eg12)   (B, BUILT review/road-b3)
13  hau14 Tranh ngôi Trung cung (hồi form, jend14.js; win = one real step: ân thi / lập hậu weight / seat held)   (B, BUILT)
14  ke14  Mẫu nghi thiên hạ (hồi form, jend14.js; win may set her dear son as Thái tử when none exists)          (B, BUILT)
side: tm96a/b/c Thanh mai trúc mã run as a SIDE story (phụ tuyến, S.st.X thread kind "tm") in a full-road life, opened at chapters
      BAL.road.tm (built, jroad.js); lives without a full road keep j96's phase-1 splice;
      j72 Việc nhờ, jreign lines, NPC road requests (D) = side quests; each says MAIN STORY / SIDE STORY + name + step (OD:L499).
```
A road chapter that cannot run (its cast is dead/out and no recast fits, already Hoàng hậu, son already Thái tử) is replaced by a shared
arc, so numbers stay 1..14 (plan §1). A lost chapter never closes the Hoàng hậu / Hoàng thái hậu road (j67 header rule).

## 3. Chapter ids and data shape (all foremen)
- Chapter id: `<road>.<n>` (e.g. `tt_co.6`). `.4` IS the existing j67 premise arc `ARC67[road]` (main) — reused, not rewritten.
- `.5`–`.11` are registered with `rdDef(road,n,def)` (jroad.js) as j67 arcs `ARC67["<road>_<n>"]` with `o:"rd"` (outside every pool), one data
  file per origin `dev/build/jrd_<origin>.js` (listed after jroad.js in assemble.py), same shape as today's arcs
  (t, w, sj, g, cast, hồi seq 3–5, ≥3 endings at .11 + 1 rare ending per road via j97 RARE97), so the j67 engine, kitGoalDetail (§72)
  and Sổ ghi work unchanged. Data file: `dev/build/jroad.js` (after jst14.js); numbers in `BAL.road` (jbal2.js) — ONE CORE.
- f14Plan reads `ROAD14[road]`: if the road has all 8 chapters it queues `st:<road>_5 … st:<road>_11`; if not, it keeps the phase-1
  mapping (other premises + fin + shared + st_the). So roads ship one at a time and old saves never change (only new lives get them).
- Chapter-end result card names the next chapter's hook (same as j67 chNext67): the ending of `.n` sets flags that pick the opening hồi
  of `.n+1` (2–3 openings per chapter), so the same road does not read the same twice (OD:L1253).

## 4. Part 2 — the 288 chapters (B)
Cast slots (j67 `w` / cast keys; every slot is a REAL person of this life, OD:L1247): dad = her father (jkc family record, same name as
the home road), bro = her elder brother (same record), hh = Hoàng hậu, th = Thái hậu, emp = Hoàng thượng, v = a live rival consort (castRv67),
foe/foed = the enemy consort and her father (td), mis = the maid's mistress (cnv), maid = her own servant, eun = a eunuch (Tổng quản /
Kính sự phòng / her own), doc = thái y, man = a man of S.men, kid = her child, off = a court official (tdHead posts), gd = a guard (thị vệ).
Story-only NPC (OD:L1234) only where listed in §5.4. Status of every `.4` = **exists (main, j67)**; every `.5`–`.11` = **to build (B)**.
Each line: chapter · title (player text) — what happens [cast].

Lines for 4.2–4.9 are DRAFTS: each helper first reads the `.4` arc (its endings) in j67.js and rewrites its road's `.5`–`.11` lines here so
`.5` opens on the aftermath of `.4` (pilot rule in 4.1), then builds. Pattern: dev/build/jrd_tt.js (rdDef, rdCast, RDW openings, RD97L rare).

### 4.1 tt — Con gái Tể tướng — BUILT (review/road-map, dev/build/jrd_tt.js; all .5–.11 + one rare finale per road)
Rule learnt from the pilot: `.4` already closes its own first conflict (its 3–4 endings), so `.5` opens on the AFTERMATH of how `.4` ended
(2–3 openings filtered by rdK()/rdPrev()) and the road grows to a bigger conflict; never retell `.4`.
**tt_co · Quân cờ trong tay cha**
- .4 Quân cờ trong tay cha — father's letters are orders; win/mid/lose [dad, emp]
- .5 Môn sinh của cha — dad's protégés court her or ignore her; who is hers, who is dad's; Lại bộ seat [dad, v, emp]
- .6 Kẻ đọc trộm thư — a maid copies the home letters, paid with silver from the rival's palace; the payer is a court house [maid, v]
- .7 Lời đàn hặc — censors impeach dad with her letters as evidence; the Emperor asks her [emp, dad, v]
- .8 Ái phi hay con gái Tể tướng — the Emperor tests whether bedside words reach dad (a sealed memorial to keep 3 days) [emp, dad, v]
- .9 Tự cầm quân cờ — her own people at court (a young Hàn lâm, a Thượng thư's house, the seal eunuch) [dad, v]
- .10 Đêm trước triều hội — the Emperor splits the Tể tướng's power; she sits behind the screen [emp, dad, th]
- .11 Kết ván cờ — dad retires; who gets the house's seat. Endings: Người cầm quân cờ / Cha về quê, nhà yên / Phủ Tể tướng sa sút; rare: Cha truyền ấn, vua trao lòng tin [dad, emp]
**tt_oan · Phủ Tể tướng mắc oan**
- .4 Phủ Tể tướng mắc oan — forged ledger; first round of the case [dad, off]
- .5 Sau cơn oan — the forger is still free; find the clerk who wrote it [dad, v]
- .6 Nhân chứng ngân khố — keep treasury keeper Triệu alive and unbought (deadline: the ministry closes its books) [maid, v]
- .7 Ai được lợi — the rival's house gained dad's salt depot; the hatred turns real [v, hh, emp]
- .8 Cha vào ngục — a second charge (seized land), dad in the Hình bộ prison; silver for the jail, the land seller as witness [dad, v]
- .9 Tam ty hội thẩm — the joint trial; evidence only through outside hands (HISTORY CHECK) [emp, v]
- .10 Ngày phán án — the verdict; a late proof names a prince above the rival house [emp, dad, v]
- .11 Rửa sạch tiếng nhà — the house's name. Endings: Tiếng nhà trong sạch / Nhà yên, quyền mất / Nhà tan; rare: Ngự bút đề biển Thanh liêm [dad, emp]
**tt_tranh · Phủ Tể tướng chia đôi**
- .4 Phủ Tể tướng chia đôi — brother backs the rival; she judges [bro, dad, v]
- .5 Người huynh trưởng chọn — the debt of the sister-in-law's family that binds brother to the rival [dad, v]
- .6 Phủ chia hai — steward, servants, retainers choose sides; ancestor rite decides who stands first [dad, v]
- .7 Lời đồn trúng độc — the rival falls ill after a dish from the house; it was self-poisoning to frame her [v, doc, hh]
- .8 Cha ngã bệnh — dad's illness and the house seal [dad, doc, v]
- .9 Ấn phủ Tể tướng — the seal question reaches the Emperor [emp, v, dad]
- .10 Gia yến đoàn viên — the family banquet in the palace [dad, v]
- .11 Một nhà một lòng — dad retires; the genealogy line. Endings: Một nhà một lòng / Mỗi người một ngả / Phủ đứng sau {v}; rare: Huynh muội đồng lòng [dad, v, emp]
**tt_mat · Mật ước với Hoàng hậu**
- .4 Mật ước với Hoàng hậu — dad's secret pact; endings win / win2 / mid / lose [dad, hh]
- .5 Ân nợ Trung cung — three openings (Hoàng hậu owes her / Trung cung shaken / pact sunk); find the pact's text [hh, dad, v]
- .6 Cái giá là ngươi — the clause holds her under rank RANKS[BAL.road.cap.tt_mat]; keep, bend or break [hh, emp, v]
- .7 Hoàng hậu thử lòng — she runs the silkworm rite for the Hoàng hậu; do well without outshining [hh, th, v]
- .8 Mật ước mới — the rival wants into the pact and her house out [v, hh, dad]
- .9 Ba mặt một lời — she, dad and the Hoàng hậu at the Thái hậu's birthday; each tells half the truth [hh, dad, th]
- .10 Giữ hay phá — the Hoàng hậu is impeached; the pact can save or bury her [hh, emp, dad, v]
- .11 Kết mật ước — what she and the Hoàng hậu are to each other. Endings: Trung cung là chỗ dựa / Mật ước khép lại / Trung cung thành đối thủ; rare: Hoàng hậu tiến cử ngươi [hh, dad]

### 4.2 dtq — Con gái Đại tướng quân
**dtq_bien · Khói lửa Nhạn Môn**
- .4 Khói lửa Nhạn Môn — the northern enemy breaks through; supplies, reinforcements and the Emperor's heart are in the palace [emp, dad]
- .5 Lương thảo chậm — a Hộ bộ official stalls the grain; she pushes from inside (deadline) [off, emp]
- .6 Thư từ tiền tuyến — brother's letter: a traitor in the camp [bro, gd]
- .7 Viện binh — win reinforcements against the faction that wants dad to fail [emp, v, off]
- .8 Mất một thành — a fort falls; the blame lands on dad [emp, off]
- .9 Lời can gián — the Emperor weighs riding out himself; her counsel is heard or resented [emp, th]
- .10 Trận quyết chiến — the decisive battle; her earlier choices count as Lợi thế [dad, bro]
- .11 Khải hoàn hay bại trận — endings: great victory (dad raised, the Emperor wary) / costly peace / defeat (dad demoted, her road open); rare: she unmasks the enemy's spy inside the palace [dad, emp]
**dtq_vu · Bức thư mưu phản**
- .4 Bức thư mưu phản — a forged letter in dad's hand; find the forger before he is recalled [emp, dad]
- .5 Nét chữ giả — who can copy dad's hand; the scribes of the camp and the court [off, eun]
- .6 Kẻ đưa thư — the courier who carried the letter; alive, hidden, or dead [gd, eun]
- .7 Cha bị triệu về — dad comes back under guard; the house is watched [dad, emp]
- .8 Bàn tay trong cung — a consort's eunuch delivered the letter; the rival is real [v, eun]
- .9 Đối chất — confrontation at Đại Lý tự; her evidence must reach it through a proper hand [off, emp] (HISTORY CHECK)
- .10 Chứng cứ cuối cùng — the last proof: the seal, the paper, the ink [eun, gd]
- .11 Oan khuất sáng tỏ — endings: dad cleared and the forger punished / cleared but sent to a quiet post / condemned but spared (she keeps rank); rare: the forger names who paid him [dad, v]
**dtq_binh · Binh phù và long ngai**
- .4 Binh phù và long ngai — the Emperor wants dad's command back without seeming ungrateful [emp, dad]
- .5 Hổ phù — the tiger tally: who keeps it, who wants it [emp, dad]
- .6 Bộ tướng của cha — dad's officers petition to keep him; loyalty or rebellion in the Emperor's eyes [off, emp]
- .7 Chén rượu thu binh quyền — a feast where command is asked back gently (HISTORY CHECK: Tống Thái Tổ 杯酒釋兵權 parallel) [emp, dad]
- .8 Lời gièm pha — rivals say dad hoards troops; she answers or stays silent [v, off]
- .9 Vua hay cha — she must pick whose message to carry [emp, dad]
- .10 Ngày giao binh phù — the handover day; it goes smoothly, or not [dad, emp, gd]
- .11 Công thần về hưu — endings: dad retires with honour (house safe, power gone) / dad keeps command (she is suspected) / dad stripped; rare: the Emperor gives the command to her brother through her [dad, bro, emp]
**dtq_huynh · Người anh nơi đất giặc**
- .4 Người anh nơi đất giặc — brother captured; the enemy wants ransom, the court wants face [bro, emp]
- .5 Tiền chuộc — the ransom silver (deadline; gain and loss) [dad, eun]
- .6 Sứ giả bên giặc — the enemy envoy's private terms [off, man]
- .7 Thể diện triều đình — ministers oppose any deal [off, emp]
- .8 Đường cứu lén — a secret rescue through a guard who owes her [gd, man]
- .9 Anh trở về, bị nghi — brother returns; was he turned? [bro, emp]
- .10 Xét hỏi — the questioning; her word weighs on it [emp, off]
- .11 Huynh muội — endings: brother cleared and promoted / cleared but kept from the army / disgraced (she survives it); rare: brother brings back the enemy's battle plan [bro, emp]

### 4.3 muoi — Con gái nhà buôn muối
**muoi_tuoc · Mua tước cho cha**
- .4 Mua tước cho cha — rich but despised; dad wants a title; the missing piece is someone to speak for him [th, dad]
- .5 Người chịu nói giúp — find an official sponsor; each wants a different price [off, dad]
- .6 Bạc mở cửa — gifts or bribes; the line is thin [off, eun]
- .7 Con nhà buôn — a rival mocks her birth at a feast; prove worth, not wealth [v]
- .8 Công với triều đình — dad funds a levee or relief; real merit or bought merit [dad, emp]
- .9 Tố mua quan bán tước — a censor accuses the house of buying office [off, v]
- .10 Chiếu phong tước — the decree: given, delayed, or refused [emp, th]
- .11 Tước vị nhà họ — endings: title granted / title for merit only (smaller) / refused, house shamed; rare: the Emperor names dad Hoàng thương (purveyor) [dad, emp]
**muoi_lau · Thuyền muối đêm**
- .4 Thuyền muối đêm — the family boat seized with contraband salt; framed or caught [dad, off]
- .5 Sổ thuyền — the boat's logs and who wrote them [off, maid]
- .6 Kẻ hãm hại — a rival salt house and its official friend [off, v]
- .7 Muối quan, muối lậu — the salt office's own smuggling (HISTORY CHECK: salt monopoly) [off, eun]
- .8 Cha bị giam — dad jailed at Giang Khẩu; silver and favours keep him alive [dad, off]
- .9 Người lái thuyền — the boatman witness, hiding [man]
- .10 Xử án Giang Khẩu — the trial [off, emp]
- .11 Trắng án — endings: cleared, the rival house falls / cleared, licence lost / fined and shamed; rare: she brings the salt office's own ledger to the Emperor [dad, off, emp]
**muoi_doi · Năm đói ở Giang Nam**
- .4 Năm đói ở Giang Nam — famine, prices triple; dad wants to sell high [dad, emp]
- .5 Giá gạo — persuade dad, or let him profit [dad]
- .6 Dân đói về kinh — refugees reach the capital; the court looks for someone to blame [off, emp]
- .7 Tiếng tích trữ — the house is accused of hoarding [v, off]
- .8 Phát chẩn — relief in her name, the Emperor's or the house's; cost in silver [emp, th]
- .9 Kẻ ăn bớt thóc chẩn — a local official steals relief grain [off]
- .10 Mùa sau — the next harvest decides who is remembered [dad, emp]
- .11 Ơn hay oán — endings: the house praised / profit kept, name lost / both lost; rare: the Emperor gives her a title of virtue (đức hạnh) [emp, dad]
**muoi_no · Món nợ trong cung**
- .4 Món nợ trong cung — a rival borrowed from the family shop to bribe and cannot pay [v]
- .5 Giấy nợ — the debt note: where it is, who has seen it [v, maid]
- .6 Đòi hay tha — collect, forgive, or hold it over her [v]
- .7 Kẻ thứ ba — a third consort learns of the debt [v2, eun]
- .8 Nợ chồng nợ — the debtor borrows again to pay [v]
- .9 Món nợ lộ ra — the debt becomes palace gossip [v, hh]
- .10 Ân hay oán — the debtor's fate is in her hand [v]
- .11 Sợi chỉ đỏ — endings: debtor becomes a true ally / an enemy for life / ruined and gone; rare: the debt hides a bigger secret she can use [v]

### 4.4 cn — Cung nữ được sủng hạnh
**cn_chu · Chủ cũ**
- .4 Chủ cũ — her old mistress cannot bear her former maid sitting as an equal [v]
- .5 Chén trà năm xưa — the mistress reminds the palace of who poured whose tea [v]
- .6 Đồng liêu cũ — her fellow maids of old: allies, envy, or tools [maid, v]
- .7 Bẫy trong yến tiệc — a trap at a banquet [v, hh]
- .8 Ngang hàng — she reaches the mistress's rank (rank check from RANKS) [v, emp]
- .9 Vượt bậc — one step above; revenge or grace [v]
- .10 Đối diện — the two women alone [v]
- .11 Chủ tớ năm xưa — endings: reconciled / the mistress ruined / both scarred; rare: the mistress asks her pardon before the Hoàng hậu [v, hh]
**cn_tinh · Mối tình thuở hầu trà**
- .4 Mối tình thuở hầu trà — the guard she once promised now guards her gate; old letters exist [gd]
- .5 Thư cũ — find the letters before someone else does [gd, maid]
- .6 Kẻ cầm thư — who holds them, and what they want [v, eun]
- .7 Thị vệ bị điều đi — the guard is posted far away; by whose hand [gd, off]
- .8 Lời đồn tư tình — rumours of an affair [v, hh]
- .9 Kính sự phòng tra xét — the inquiry [eun, emp]
- .10 Hắn chọn — the guard decides to protect her or himself [gd]
- .11 Chôn quá khứ — endings: buried cleanly / he takes the blame / exposed (punished, not killed; the Hoàng hậu road open); rare: he becomes her sworn protector [gd, emp]
**cn_ban · Tri kỷ ở Tân Giả khố**
- .4 Tri kỷ ở Tân Giả khố — Tố Nga sent to Tân Giả khố for a crime she did not do; she knows a secret of Càn Ninh cung [Tố Nga]
- .5 Tân Giả khố — reach Tố Nga; bribe, order, or sneak [eun, Tố Nga]
- .6 Bí mật Càn Ninh cung — what Tố Nga knows and who fears it [Tố Nga, v]
- .7 Kẻ vu Tố Nga — find who framed her [v, maid]
- .8 Tố Nga lâm bệnh — she falls ill in the laundry; medicine costs (deadline) [doc, Tố Nga]
- .9 Lời khai — Tố Nga's testimony; safe for whom [Tố Nga, eun]
- .10 Rửa oan — the case reopened [hh, emp]
- .11 Tình chị em — endings: Tố Nga freed and serves her / freed and leaves the palace / dies (grief, not blame); rare: the secret brings down the framer [Tố Nga, v]
**cn_than · Thân thế thật**
- .4 Thân thế thật — a dying mama says she is the daughter of a demoted official [mama]
- .5 Di vật — the dead mama's keepsake [maid]
- .6 Hồ sơ năm xưa — the old case file in the Hình bộ archive [off, eun]
- .7 Người thân còn sống — a relative alive outside the palace [man]
- .8 Kẻ không muốn án lật — the one who ruined her real father still holds power [off, v]
- .9 Nhận hay không — claim her name (risk) or stay a commoner (safe) [emp]
- .10 Minh oan cho cha ruột — petition [emp, off]
- .11 Họ thật — endings: name restored, family title back / name restored quietly / the claim fails; rare: her real father's old friend at court becomes her ally [off, emp]

### 4.5 nc — Công chúa hòa thân ({land} = Nam Chiếu / Bắc Địch)
**nc_gian · Mật lệnh cố quốc**
- .4 Mật lệnh cố quốc — {dad} orders her to spy on Đại Hy's border defences [emp, envoy]
- .5 Bản đồ biên ải — where the map is, who guards it [off, gd]
- .6 Người liên lạc — the go-between: a merchant or eunuch of {land} [man, eun]
- .7 Đại Hy nghi ngờ — the Emperor's men watch her [emp, gd]
- .8 Hai lòng — she sends true, false or nothing [emp, envoy]
- .9 Gián điệp bị bắt — the go-between is caught [off, man]
- .10 Đường cùng — confess, deny, or turn the plot [emp]
- .11 Trung với ai — endings: loyal to Đại Hy (home angry) / loyal to {land} (exposed risk) / both kept in balance; rare: she brokers a lasting treaty [emp, {dad}]
**nc_su · Sứ đoàn cố quốc**
- .4 Sứ đoàn cố quốc — her royal brother leads the tribute mission; every banquet a game [emp, bro]
- .5 Lễ nghi hai nước — a rite clash at the welcome [off, th]
- .6 Quà cống — a tribute gift goes missing [eun, v]
- .7 Hoàng huynh phạm cấm — her brother breaks a palace rule [bro, gd]
- .8 Yến tiệc ngoại giao — the great banquet [emp, th, bro]
- .9 Điều ước thương mại — a trade treaty she can shape [off, emp]
- .10 Sứ đoàn lên đường — departure; what goes home with them [bro]
- .11 Chiếc cầu hai nước — endings: bridge between two lands (both honour her) / mission shamed / mission recalled in anger; rare: her brother makes her the guarantor of the treaty [bro, emp]
**nc_tuc · Người ngoại tộc**
- .4 Người ngoại tộc — the Thái hậu dislikes foreigners; her dress, food and dances are watched [th]
- .5 Áo váy cố hương — wear home dress or palace dress (costume rules) [th, v]
- .6 Món ăn lạ — a dish of {land} makes someone ill [doc, v]
- .7 Điệu múa — a dance at the Thái hậu's birthday [th]
- .8 Kẻ châm chọc — a rival leads the mockery [v]
- .9 Học lễ Đại Hy — she learns, and keeps something of her own [th, mama]
- .10 Đức Thọ cung chấp nhận — the Thái hậu's judgement [th]
- .11 Hai nửa một người — endings: accepted as she is / accepted by giving up her ways / never accepted; rare: the Thái hậu adopts a {land} custom [th]
**nc_vuong · Ngai vàng cố quốc**
- .4 Ngai vàng cố quốc — {dad} dies; brother and uncle fight for the throne, both seek Đại Hy and her [emp, bro]
- .5 Thư hai phe — letters from both claimants [bro, envoy]
- .6 Triều đình Đại Hy chia phe — ministers back different claimants [off, emp]
- .7 Mẫu hậu cầu cứu — her mother writes from {land} [mom]
- .8 Binh Đại Hy xuất ải — Đại Hy sends troops, or not [emp, off]
- .9 Tin bại trận — her side loses a battle [bro]
- .10 Lời quyết — she speaks to the Emperor for one side [emp]
- .11 Ngôi vua cố quốc — endings: her side wins (her standing rises) / the other side wins (she is a hostage of sorts) / {land} splits; rare: she brings both to a peace and is honoured in both lands [emp, bro]

### 4.6 td — Con gái tội thần
**td_an · Lật lại án cũ**
- .4 Lật lại án cũ — the family accused of treason by {foed}; his daughter {foe} is in the palace [foe, foed]
- .5 Chứng cứ thứ nhất — the forged memorial's copy [eun, off]
- .6 Nhân chứng — the old steward (story-only) and a clerk; keep them alive [steward, off]
- .7 {foe} ra tay — the enemy daughter acts against her (real oán) [foe]
- .8 Đủ chứng cứ — the third proof; now the rank she needs to petition (BAL) [emp]
- .9 Dâng sớ — the petition [emp, off]
- .10 Tam ty xét lại — the retrial (HISTORY CHECK) [off, foed]
- .11 Án cũ sáng tỏ — endings: family cleared, {foed} punished / cleared, {foed} untouched / retrial fails (she lives on); rare: the Emperor restores her family title [foed, foe, emp]
**td_ke · Kẻ đứng sau màn**
- .4 Kẻ đứng sau màn — {foed} was only the knife; the hand is higher [foed]
- .5 Lần theo bạc — the money trail [off, eun]
- .6 Kẻ cầm dao — a powerful prince or minister appears in the trail (cast from real officials/vương gia) [off]
- .7 Bị phát hiện — the hand learns she is looking [eun, gd]
- .8 Đồng minh bất ngờ — someone else he wronged [v, off]
- .9 Bẫy ngược — she sets a trap [off, emp]
- .10 Lộ mặt — the mastermind exposed or not [emp]
- .11 Trả thù kẻ nào — endings: the mastermind falls / only the knife falls / she lets both go for safety; rare: she turns the mastermind into her tool [off, foed]
**td_song · Người em còn sống**
- .4 Người em còn sống — her youngest brother lives as a border conscript under a false name [bro2]
- .5 Chiếc vòng bạc — who sent the bracelet [eun, man]
- .6 Thư qua biên ải — send word without exposing him [gd]
- .7 Kẻ nghi ngờ — someone recognizes the family face [off, foe]
- .8 Em bị thương — he is hurt in a skirmish; medicine and silver (deadline) [doc]
- .9 Đổi tên — a new identity paper [off, eun]
- .10 Đưa em về — bring him nearer, or keep him far and safe [gd, emp]
- .11 Máu mủ — endings: brother safe under a new name / brother joins the army openly / lost again; rare: he earns rank on merit and clears the name later [bro2, emp]
**td_tha · Thù hay tha**
- .4 Thù hay tha — {foe} is the enemy's daughter but did nothing; now she is in trouble [foe]
- .5 Nạn của {foe} — the trouble: a false charge by a third consort [foe, v]
- .6 Đứng nhìn hay ra tay — watching costs conscience; helping costs face [foe]
- .7 Lời thú nhận — {foe} learns who she is [foe]
- .8 Cha nàng — {foed} offers a deal [foed]
- .9 Hai người con gái — the two daughters meet alone [foe]
- .10 Lựa chọn — revenge on the father through the daughter or another way [foe, foed]
- .11 Cởi nút thắt — endings: sworn sisters / revenge taken (real oán for life) / parted without peace; rare: {foe} testifies against her own father [foe, foed]

### 4.7 ch — Cháu gái Thái hậu
**ch_co · Quân cờ của cô mẫu**
- .4 Quân cờ của cô mẫu — the Thái hậu placed her to balance the Hoàng hậu; orders grow heavier [th, hh]
- .5 Nhiệm vụ đầu — spy on the Hoàng hậu's palace [th, hh]
- .6 Hoàng hậu biết — the Hoàng hậu suspects [hh]
- .7 Hai chủ — the Thái hậu and the Emperor want different things [th, emp]
- .8 Lệnh khó — an order she finds wrong [th, v]
- .9 Từ chối — refuse and lose the shelter, or obey and lose herself [th]
- .10 Người đánh cờ — she plays her own move [th, hh]
- .11 Cô cháu — endings: partner of the Thái hậu / obedient piece / break with the Thái hậu; rare: the Thái hậu names her heir of the Đức Thọ cung faction [th]
**ch_benh · Thái hậu lâm bệnh**
- .4 Thái hậu lâm bệnh — the Thái hậu falls ill; the harem stirs [th, doc]
- .5 Thuốc thang — the physicians disagree; who doctors her [doc, th]
- .6 Kẻ rục rịch — consorts court other patrons [v, hh]
- .7 Đầu độc? — a poisoned medicine suspicion [doc, eun]
- .8 Hầu bệnh — nights at the sickbed (cost: favour with the Emperor) [th, emp]
- .9 Bệnh trở nặng — the crisis [th, doc]
- .10 Hồi phục hay băng hà — the outcome (context-driven, OD:L1253) [th]
- .11 Chỗ dựa mới — endings: the Thái hậu recovers and rewards her / dies and she inherits her people / dies and the faction scatters; rare: she exposes the poisoner [th, doc, v]
**ch_ho · Hai người cháu**
- .4 Hai người cháu — another of the Thái hậu's kin came first; one chair beside the Thái hậu [v]
- .5 Ai được gọi trước — the morning audience [th, v]
- .6 Quà mừng thọ — the birthday gift contest [th, v]
- .7 Lời gièm — the cousin whispers [v]
- .8 Nhà ngoại — the clan elders pick a favourite [off, th]
- .9 Đồng minh hay đối thủ — a common enemy appears [v, hh]
- .10 Chiếc ghế — the Thái hậu decides [th]
- .11 Họ ngoại — endings: she wins the chair / they share / the cousin wins; rare: both cousins rise together as one faction [v, th]
**ch_bi · Bí mật năm xưa**
- .4 Bí mật năm xưa — an old letter: the Thái hậu once destroyed a consort to keep the throne [th]
- .5 Người cầm thư — who holds it [v, eun]
- .6 Phi tần năm ấy — who the victim was, and her kin alive now [off, man]
- .7 Cô mẫu hỏi — the Thái hậu asks what she knows [th]
- .8 Thư bị đánh cắp — the letter changes hands [eun, v]
- .9 Bảo vệ hay dùng — protect the Thái hậu or use the letter [th, emp]
- .10 Ngọn lửa — the letter burns or reaches the Emperor [emp]
- .11 Bí mật được chôn — endings: secret buried, the Thái hậu in her debt / secret out, the Thái hậu falls, she survives / secret used as her own power; rare: the victim's kin is rewarded quietly and peace is made [th, emp]

### 4.8 thd — Con gái thầy đồ nghèo — BUILT (review/road-b3, dev/build/jrd_thd.js; all .5–.11 + one rare finale per road)
{dad} prints «phụ thân» for thd (dad67 covers tt/dtq only); text says "cha". {n1}/{n2} = the .4 arc's story names, carried in S.st.f14
(engine request to the jroad owner to carry A.n1/A.n2 generally; thd_tro carries its own until then).
**thd_tho · Danh hiệu Tài nữ**
- .4 Danh hiệu Tài nữ — the Hàn lâm viện opens a Tài nữ contest; someone waits to accuse her of plagiarism [emp, v]
- .5 Lời thơ vượt tường cung — the Xuân thí for the Ngự tuyển anthology; {v}'s uncle (a Thị độc) holds the entry list; the theme leaked to {v}; dad's village school roof leaks [emp, v, n1]
- .6 Tập nháp bị trộm — her village draft book stolen; a paid copyist re-dates the poems; search {v}'s palace, buy them back, or rewrite from memory [maid, v, n1]
- .7 Vòng thi Ngự hoa viên — the contest round; {v} may recite her stolen lines; the inkstone tampered with; village voice or court style [emp, v, th, n1]
- .8 Lời vu đạo thơ — {v}'s uncle accuses her with forged old pages; a rumour says dad wrote her poems [v, emp, n1]
- .9 Chứng minh — the village paper's watermark ledger, dad's old letters, {v}'s deal; four more lines written live before the Emperor [emp, v, n1]
- .10 Ngày yết bảng — the score book scraped and altered; {v} asks for mercy; dad walks to the capital; how the slanderer is judged [emp, v, n1]
- .11 Tài nữ — Endings: Tài nữ của Đại Hy / Thơ có tên, danh hiệu không / Gác bút; rare: Ngươi biên tập Ngự tuyển thi tập [emp, v]
**thd_sach · Bản thảo của cha** ({v} = the daughter of {n1}, the Thượng thư the book names)
- .4 Bản thảo của cha — dad's book names a powerful house's corruption [dad, off]
- .5 In hay giấu — volume two lists the dyke-bribe takers; print before the flood season; a Giang Nam printer; one page names a Hoàng hậu relative [maid, v]
- .6 Kẻ bị chỉ mặt — {n1}'s protégé censors attack the book; {v} cuts her palace supplies; the old Hoài Bắc dyke clerk brings the true ledger [v, emp]
- .7 Cha bị đe dọa — the village school burned, the arsonists return next market day; the magistrate is {n1}'s man; bring dad to the capital or guard him [maid, v]
- .8 Dâng sách — the fair copy before the autumn court lecture; {v} bribes the copyist; ledger attached or kept back; whose hands carry the book [emp, v]
- .9 Văn tự ngục — a half-quoted sentence makes the book "phỉ báng triều đình"; dad jailed by Đại Lý tự; {v} testifies (HISTORY CHECK) [emp, v]
- .10 Bảo vệ cha — the Emperor judges; the ledger produced; dad says choose the book over him [emp, v]
- .11 Chữ nghĩa — Endings: Sách cha thành sách triều đình / Sách cấm, cha bình an về quê / Cha bị giam, ngươi giữ được ngôi; rare: Sách mở đường cải cách, cha vào Hàn lâm viện [emp, v]
**thd_tro · Học trò của cha** ({n1} = dad's student from .4, {n2} = {v}'s elder cousin, a bought Tiến sĩ)
- .4 Học trò của cha — dad's poor student topped the exam and was failed by a bought paper [man]
- .5 Đề thi bị bán — 3 openings by .4's end; the engraving clerk; the Lễ bộ seal of the Thị lang (dad's old classmate); confession before the clerk is sent to Vân Nam [maid, v, dad]
- .6 Bảng vàng — {n2} a bought Tiến sĩ now Tri huyện; ink scripts before Lễ bộ burns old papers; poem test at Hàn lâm viện [v, dad, emp]
- .7 Học trò bị truy — {v}'s maternal house frames {n1}; ten-day warrant of phủ Thuận Thiên; the night search [maid, v]
- .8 Đơn kêu oan — scholars' petition (dad signs first on the lost branch); Đăng Văn drum; {v} weeps to the Thái hậu [emp, dad, v, th]
- .9 Triều đình chấn động — a scapegoat clerk "hangs himself"; the list of bought Tiến sĩ; {v} kneels for her house; how far to punish [emp, v, th]
- .10 Thi lại — palace re-exam at Bảo Hòa điện; a planted crib note; {v} begs for {n2} [emp, v]
- .11 Công bằng khoa cử — Endings: Khoa trường trong sạch / Học trò được trả tên / Khoa án bị chôn vùi; rare: Học trò thành Ngự sử, một lòng với ngươi [emp, v, dad]
**thd_hoc · Thầy giáo trong cung** (needs a live royal child: {v} = a consort with a live child, {n1} = that child, {n2} = another real royal child; a chapter whose child is gone is replaced by a shared arc)
- .4 Thầy giáo trong cung — the Emperor sets her to teach the young princes and princesses [emp, kid*]
- .5 Học trò nhỏ — 3 openings by .4's end; hidden brushes; {v}'s snacks; cane marks on {n1}'s palm; monthly recitation [emp, v]
- .6 Mẹ của học trò — {v} sits in / sends a spy maid; complaint at the Hoàng hậu's greeting [v, hh]
- .7 Kỳ khảo hạch — the princes before the Six Ministers; a eunuch sells the questions; {v} drives {n1} into fever [emp, eun, v]
- .8 Đứa trẻ bị phạt — {n1} tears {n2}'s book; the ruler rule; {v} storms in; who takes the blame [v, doc, emp]
- .9 Bài học đạo lý — Mạnh Tử "dân vi quý" before the Emperor; a Thị giảng impeaches her with {v} [emp, v]
- .10 Kết khóa — the term's book; {v} asks her to name {n1}; which child can carry great things [emp, v]
- .11 Người thầy — Endings: Người thầy được tôn kính / Được tôn mà một mẹ còn hận / Thôi dạy Thượng thư phòng; rare: Học trò bái ngươi làm thầy trọn đời [emp, v, dad]

### 4.9 cnv — Cung nữ tuyển vào cung — BUILT (review/road-b3, dev/build/jrd_cnv.js; all .5–.11 + one rare finale per road)
§8.4 DECIDED (B3): 8-chapter road like every origin; the rise happens INSIDE the roads; every chapter reads right as a maid or as a
raised consort (texts switch on S.srv.risen, options need:["srv"] / need:["nsrv"]); {mis} = the same mistress in both states (srvM keeps her);
still a maid at the end of the road → chapter 12 = len14 (jend14.js).
**cnv_chu · Bí mật của chủ nhân**
- .4 Bí mật của chủ nhân — she sees {mis} burn a letter and hide medicine [mis]
- .5 Gói thuốc — the musk left Thái y viện under {v}'s palace name, signed for by Ôn thái y; 3 openings from .4 [doc, mis, v]
- .6 Kẻ dò hỏi — {v}'s maid in blue pumps her, a Nội vụ phủ eunuch as the channel; catch her or feed false news [maid, v, eun]
- .7 Chủ thử lòng — {mis} lost a child to musk last year; the risky orders were tests; the packet left on the table [mis, v]
- .8 Bí mật lộ một nửa — rumour «xạ hương ở cung {mis}»; Nội vụ phủ searches before dawn [eun, hh, v]
- .9 Giữ hay nói — Trung cung (or Thái hậu) demands a statement; Ôn thái y wants to leave before rằm; {mis} stole the musk to save a pregnant consort's child [hh, mis, doc, v]
- .10 Đêm tra hỏi — the questioning; the maid in blue testifies; {eun} offers to close the case [eun, doc, v]
- .11 Dao hai lưỡi — Endings: Tâm phúc trọn đời của {mis} / {mis} ngã, ngươi đứng lên / Chủ tớ cùng lùi một bước; rare: Việc thiện trong bóng tối [mis, emp, v]
**cnv_ban · Chị em đồng hương**
- .4 Chị em đồng hương — Xuân Đào accused of stealing a jade bracelet [Xuân Đào, mis]
- .5 Chiếc vòng ngọc — the bracelet found was a fake; the real one went out through Phúc An to a pawnshop (redeem before rằm) [maid, eun]
- .6 Kẻ vu — Thu Cúc's gambling debt paid by {v}'s palace for goods and a scapegoat [maid, v]
- .7 Xuân Đào bị phạt — a second frame; beaten and sent to Tân Giả khố; medicine before dawn [doc, maid, emp]
- .8 Lời làm chứng — Nội vụ phủ reopens the case; Phúc An retracts; {mis} pleads for Thu Cúc [mis, maid, emp]
- .9 Chủ phân xử — {mis} judges Thu Cúc; {v} sends a warning [mis, v]
- .10 Trả lại sự thật — Phúc An's ledger reaches {eun}; a deal; Xuân Đào wants to go home [eun, maid, v]
- .11 Đồng hương — Endings: Xuân Đào rửa oan, một lòng theo ngươi / Rửa oan, về quê / Mất Xuân Đào; rare: Thu Cúc tự thú, hai chị em cùng lên [maid, mis, eun, v]
**cnv_mat · Ánh mắt nơi hành lang** (the rise road)
- .4 Ánh mắt nơi hành lang — the Emperor stops under the eaves; {mis} notices [emp, mis]
- .5 Chủ nhân ghen — {mis} sends the maid to hard work, or as a consort demands she still bow; {v} offers shelter [mis, v, emp]
- .6 Tránh hay gặp — he looks for her; meet him or hide; {mis} watches the gates [emp, mis, v]
- .7 Kính sự phòng ghi tên — her name in the register (or her tag kept at the bottom); {v} bribes a eunuch [eun, v, mis]
- .8 Đêm đầu — the first night: raises her (srvRise) when Hoàng thượng để ý ≥ BAL.ntRise.at, else the summons is turned back [emp, v, mis]
- .9 Từ tớ thành chủ — seating at the banquet, old roommates, {mis}'s old punishment record [mis, v, hh]
- .10 Lời đồn quyến rũ — {v} plants a love charm; the Hoàng hậu's inquiry; the Thái hậu asks her [v, hh, th, mis]
- .11 Ánh mắt ấy — Endings: Ánh mắt thành ân tình / Được nhìn mà bị ghét / Ánh mắt khép lại (a maid keeps her road); rare: Chủ cũ thành tỷ muội [emp, mis, v]
**cnv_ma · Ma ma dạy việc**
- .4 Ma ma dạy việc — Lưu ma ma picks her to train [Lưu ma ma]
- .5 Bài học thứ nhất — winter clothes to six palaces before the first frost (maid) / her palace's coal ration cut (consort); silk missing [Lưu ma ma, Phùng cô cô, v]
- .6 Sổ sách Nội vụ phủ — a missing sum over three years; Phùng cô cô's seal; goods to {v}'s mother's family shop; before the year-end books [eun, v, Phùng cô cô]
- .7 Ma ma bị tố — Phùng cô cô accuses Lưu ma ma; Thận hình ty holds her [eun, v, Phùng cô cô]
- .8 Bảo vệ thầy — a witness, the original ledger, or a word from the Hoàng hậu before the hearing [eun, hh, v]
- .9 Kỳ sát hạch — the maid's chưởng sự exam, or the consort's year-end maid selection [eun, emp, v]
- .10 Ma ma lâm bệnh — medicine before the full moon; her box listing every pupil (the network) [doc, v, Phùng cô cô]
- .11 Chưởng sự — Endings: Người nối nghiệp Lưu ma ma (maid: SRK.maid[BAL.road.cnvMaRk]) / Ghế về tay người khác / Nội vụ phủ về tay Phùng cô cô; rare: Lưu ma ma trao lại cả Nội vụ phủ [Lưu ma ma, Phùng cô cô, v, eun]

## 5. Canon and continuity — every foreman's chapters (B, C, D)
### 5.1 Owner rules that every chapter obeys (read the source lines in full; never this summary instead)
OD:L1247 real people (hostile roles real both ways, j9 relAdd) · OD:L1253 + OD:L478 context outcomes (jst14 f14Ctx; no fixed best
answer) · OD:L1234 story-only NPCs allowed (registered in §5.4) · OD:L499 MAIN/SIDE story label + resource demands have a deadline ·
OD:L39 one rare ending per road · gain-AND-loss on every reward (16/11 07:15Z) · BALANCE 15/11 20:30Z equivalent cost roads ·
OD:L1267 ONE CORE (BAL) · KIT FIRST (OD:L491, OD:L1090–L1103) · VANPHONG wording (odds ladder, no %) · OD:L1259 tutorial is story ·
OD:L1250 entry rank earned · OD:L1288 co-op «Vào cung ngay / Chờ 3 năm» same time point · OD:L1066 accession start, few children ·
OD:L1327 history/drama questions → expert check (marked "HISTORY CHECK" in §4).
### 5.2 Names, places, family
- Dynasty: Đại Hy. Emperor = «Hoàng thượng» (no personal name in story text). Palaces: Đức Thọ cung (Thái hậu), Càn Ninh cung,
  Tân Giả khố, Nội vụ phủ, Kính sự phòng, Thái y viện, Hàn lâm viện, Đại Lý tự. New place names: register here first.
- Her father/brother/clan = the ONE family record of this life (jkc fam + KCDAD, kc-lore rule: one father/brother/dress/clan across the
  home roads and the palace road). A road chapter reads that record; it never invents a second father or brother. td's family is
  fallen (fall card at entry); td_song's brother is the same family record's youngest son.
- nc/bd: land words only from KC2LAND (jkc2): Phụ vương/Phụ hãn, Mẫu hậu/Khả đôn, Nam Chiếu/Bắc Địch.
- Rivals/foe/mis are cast once per road (castRv67) and stay the SAME person for the whole road; recast only if dead/out, and the recast
  is told in text («… nay đã khuất, kẻ nối tay là …»).
### 5.3 Ranks, ages, time
- Ranks print `RANKS[i].n` (8 ranks Đáp ứng → Hoàng hậu); maid/eunuch ranks from their lists; never a typed rank name in a condition.
- She enters at 18 (home road ends at the tuyển tú of year KC.ty). Chapters never state her age as a number unless read from S;
  four age bands a18/a26/a36/a51 for any new art (C).
- A road spans ch4–11 ≈ the middle of her life; each chapter's month limit in BAL.road.lim (B sets, P5 measures).
- Children: few at start; a chapter needing a child checks S.kids / kid* and has a replacement.
- Deadlines: every silver/item/proof demand has a countdown from BAL; fails only when it expires (OD:L499).
### 5.4 Story-only NPC registry (face = an existing figure; add a row BEFORE using a new one)
| Name | Road | Role | Face source |
|---|---|---|---|
| Tố Nga | cn_ban | her friend in Tân Giả khố | maid pool (j67 today) |
| Xuân Đào | cnv_ban | maid from her village | maid pool (j67 today) |
| Lưu ma ma | cnv_ma | Nội vụ phủ teacher | mama pool (j67 today) |
| old steward | td_an (+ P2 td tutorial) | her ruined house's steward | elder servant pool |
| envoy of {land} | nc_* | {dad}'s envoy | S.men envoy role |
| mama (dying) | cn_than .4 | knows her birth | mama pool |
| Ôn thái y | cnv_chu | thái y who signed for the musk | doc pool |
| Phúc An | cnv_ban | Nội vụ phủ eunuch selling stolen goods | eunuch pool |
| Thu Cúc | cnv_ban | {mis}'s maid of eight years, the accuser (already in j67 .4) | maid pool |
| Phùng cô cô | cnv_ma | Nội vụ phủ chưởng sự, Lưu ma ma's ex-pupil, rival | mama pool |
| uncle of {v} (Thị độc) / Chưởng viện Hàn lâm | thd_tho | accuser / examiner (unnamed) | official pool |
| {n1} (dad's student) / {n2} ({v}'s cousin, bought Tiến sĩ) / Thị lang bộ Lễ | thd_tro | .4 student carried; cheat; leak (unnamed) | official pool |
| old dyke clerk of Hoài Bắc | thd_sach | witness with the true ledger | elder servant pool |
### 5.5 Rewards and UI
- Each chapter end: gain AND loss rows (kit result card), reward item by outcome (j67 rw), Danh/Sủng/oán from BAL.road.
- Road endings (.11) never kill her, never send her to lãnh cung, never close the Hoàng hậu road.
- UI only from the kit: j67 Mệnh truyện card + kit event frame (PEND, KIT §28.6), kit act cards, kitGoalDetail (§72) chapter detail,
  kit result card. Missing part → KIT REQUEST in the report, stop that part.

## 6. Build plan, owners, order
| Order | Item | Foreman | Depends on |
|---|---|---|---|
| 1 | this map (docs + review/road-map) | B | — |
| 2 | jroad.js engine: ROAD14 registry, f14Plan hook, BAL.road, chapter → j67 arc adapter, tests (bot walks a road 4..11) | B (lead) | review/story14-p1-r2 (frame) |
| 3 | pilot origin tt (4 roads × .5–.11 = 28 chapters) | B (lead) | 2 |
| 4 | other 8 origins (224 chapters) | B helpers (proposed split below) | 2, pattern from 3 |
| 5 | endgame ch12x (childless) + hồi form of hau/ke | B | 2 |
| — | intros ×10, tutorial ch1–3 quests (P2) | C | frame (has it) |
| — | home roads cnv/nc (review), NPC roads women (reuse §4 roads as data) + men templates | D | NPC roads need 2 (ROAD14 data shape) |
Proposed B split (OD:L1237, same item): helper B1 = dtq + muoi + cn; helper B2 = nc(+bd) + td + ch; helper B3 = thd + cnv + endgame (item 5).
Each helper builds on the engine branch, one origin per review branch `review/road-<origin>`.

## 7. Change log
- 11/16/2026 created (opus lead of Foreman B): 288-chapter catalogue, code-key fix (cn/cnv), data shape, canon rules, split.
- 11/16/2026 tt built (28 chapters); §4.1 rewritten to the built chapters (the .4 arcs already close their first conflict); tm96 = side story.
- 11/16/2026 B3: thd + cnv built (56 chapters, §4.8/§4.9 rewritten to the built chapters); endgame noi14/hau14/ke14 (jend14.js); §8.4 decided; §5.4 rows added.

## 8. Open questions for Foreman B / main (not for the owner unless main decides so)
1. DONE: Thanh mai trúc mã is a side story in full-road lives (jroad.js; BAL.road.tm).
4. DONE (B3): cnv keeps the 8-chapter road; the rise happens inside the roads (cnv_mat .8 can raise her; the other roads raise
   «Hoàng thượng để ý»); a cnv still a maid when the road ends plays len14 as chapter 12 (jend14.js). See §4.9 and reports/road-b3.md.
2. tt_mat .6 rank cap value goes in BAL.road (not typed); reversible.
3. HISTORY CHECK items (tt_oan .9, dtq_vu .9, dtq_binh .7, muoi_lau .7, td_an .10, thd_sach .9) → one history/drama expert pass (OD:L1327)
   before those chapters' text is final; structure can be built first.
