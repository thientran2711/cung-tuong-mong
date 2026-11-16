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
12  ch12: st_dong Ngôi Đông cung (has a son) | st_con Con đường của con (child, no son) | ch12x Người nối dõi (childless, to build)   (B)
13  hau  Tranh ngôi Trung cung (hồi form to build)   (B)
14  ke   Mẫu nghi thiên hạ (hồi form to build)       (B)
side: tm96a/b/c Thanh mai trúc mã run as a SIDE thread (phụ tuyến, S.st.X) once full roads exist (they replaced shared fillers in phase 1);
      j72 Việc nhờ, jreign lines, NPC road requests (D) = side quests; each says MAIN STORY / SIDE STORY + name + step (OD:L499).
```
A road chapter that cannot run (its cast is dead/out and no recast fits, already Hoàng hậu, son already Thái tử) is replaced by a shared
arc, so numbers stay 1..14 (plan §1). A lost chapter never closes the Hoàng hậu / Hoàng thái hậu road (j67 header rule).

## 3. Chapter ids and data shape (all foremen)
- Chapter id: `<road>.<n>` (e.g. `tt_co.6`). `.4` IS the existing j67 premise arc `ARC67[road]` (main) — reused, not rewritten.
- `.5`–`.11` are registered as j67 arcs `ARC67["<road>_<n>"]` with `o:"rd"` (outside every pool), same shape as today's arcs
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

### 4.1 tt — Con gái Tể tướng
**tt_co · Quân cờ trong tay cha**
- .4 Quân cờ trong tay cha — father's letters are orders: spy on the bedchamber or keep her own counsel [dad, emp]
- .5 Thư nhà mật lệnh — dad orders her to report what the Emperor said at night; she chooses what to pass on [dad, emp]
- .6 Kẻ đọc trộm thư — one of her maids copies the letters for a rival; root out the leak without losing face [maid, v]
- .7 Quân cờ thứ hai — dad sends a niece into the selection as a spare piece; she learns she is replaceable [dad, v]
- .8 Lời đàn hặc — censors impeach dad for meddling in the harem; her own letters are the evidence [off, emp, dad]
- .9 Tự cầm quân cờ — she builds her own people at court, outside dad's network (cost: dad's trust) [off, eun]
- .10 Đêm trước triều hội — dad and the Emperor clash over a ministry post; she decides whose side the harem sees her on [emp, dad]
- .11 Kết ván cờ — endings: dad serves her line / she cuts the house off (free, alone) / dad wins and drops her (loss, rank kept); rare: dad retires and hands her his network [dad, emp]
**tt_oan · Phủ Tể tướng mắc oan**
- .4 Phủ Tể tướng mắc oan — forged ledger, dad under house arrest; save him or save herself [dad, off]
- .5 Sổ sách giả — find who wrote the ledger in the Hộ bộ (deadline before the audit) [off, eun]
- .6 Nhân chứng ngân khố — a treasury clerk can clear dad; keep him alive and unbought (silver + deadline) [off, gd]
- .7 Ai được lợi — the house that gains from dad's fall is a rival consort's family; the hatred turns real [v, off]
- .8 Cha vào ngục — dad moved to prison; she keeps the family fed and safe with silver or favours [dad, eun]
- .9 Tam ty hội thẩm — the joint trial; she can feed evidence only through proper hands [off, emp] (HISTORY CHECK)
- .10 Ngày phán án — the verdict day: the witness, the ledger and the Emperor's mood decide [emp, off, v]
- .11 Rửa oan — endings: cleared and restored / cleared but stripped of office / exiled (she keeps her rank); rare: she exposes the real embezzler above the rival house [dad, v, emp]
**tt_tranh · Phủ Tể tướng chia đôi**
- .4 Phủ Tể tướng chia đôi — brother backs another consort and her child; dad backs her; she is the judge [bro, dad, v]
- .5 Người huynh trưởng chọn — why brother chose the rival: a debt, a promise, a marriage deal [bro, v]
- .6 Phủ chia hai — household stewards and retainers pick sides; she wins people or silver [dad, bro]
- .7 Đứa trẻ ốm — the rival's child falls ill; suspicion points at her house [v, doc, kid of v]
- .8 Cha ngã bệnh — dad is ill; who holds the house seal while he lies abed [dad, bro, doc]
- .9 Ấn phủ Tể tướng — the seal struggle reaches the court; the Emperor watches which way the house leans [bro, emp]
- .10 Gia yến đoàn viên — the family feast where the split ends one way or another [dad, bro, v]
- .11 Một nhà một lòng — endings: house united behind her / brother sent to a far post / house split for good; rare: brother turns and brings his faction to her [bro, dad]
**tt_mat · Mật ước với Hoàng hậu**
- .4 Mật ước với Hoàng hậu — dad's secret pact with the Hoàng hậu; the price may be her [dad, hh]
- .5 Mật ước viết gì — find the pact's terms through the Hoàng hậu's servant [hh, maid of hh]
- .6 Cái giá là ngươi — the term: she must never rise above a set rank (BAL); accept, bend or fight it [hh, dad]
- .7 Hoàng hậu thử lòng — the Hoàng hậu gives her a task to prove she keeps the pact [hh, v]
- .8 Mật ước rạn — someone leaks a hint of the pact toward the Emperor [v, eun, emp]
- .9 Ba mặt một lời — she, dad and the Hoàng hậu meet; each lies a little [dad, hh]
- .10 Giữ hay phá — the last chance to keep, rewrite or break the pact [hh, emp]
- .11 Kết mật ước — endings: pact kept (safe, capped) / pact broken and exposed (risk, the road open) / pact rewritten as equals; rare: she tells the Emperor first and is trusted [hh, dad, emp]

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

### 4.8 thd — Con gái thầy đồ nghèo
**thd_tho · Danh hiệu Tài nữ**
- .4 Danh hiệu Tài nữ — the Hàn lâm viện opens a Tài nữ contest; someone waits to accuse her of plagiarism [emp, v]
- .5 Đề thi — the theme leaks [off, v]
- .6 Bài thơ bị trộm — her draft goes missing [maid, v]
- .7 Vòng thi — the contest (real art minigame via playArt) [emp]
- .8 Lời vu đạo thơ — the accusation [v, off]
- .9 Chứng minh — prove authorship [off, emp]
- .10 Ngày yết bảng — results [emp]
- .11 Tài nữ — endings: named Tài nữ / honourable mention / shamed; rare: the Emperor asks her to edit a court anthology [emp]
**thd_sach · Bản thảo của cha**
- .4 Bản thảo của cha — dad's book names a powerful house's corruption [dad, off]
- .5 In hay giấu — publish now or wait [dad]
- .6 Kẻ bị chỉ mặt — the house strikes back [off, v]
- .7 Cha bị đe dọa — dad threatened at home [dad, man]
- .8 Dâng sách — present the book to the Emperor [emp]
- .9 Văn tự ngục — the book is called seditious (HISTORY CHECK: văn tự ngục) [off, emp]
- .10 Bảo vệ cha — she defends dad [emp]
- .11 Chữ nghĩa — endings: dad honoured, book adopted / book banned, dad safe / dad jailed (she keeps rank); rare: the book starts a reform and dad joins the Hàn lâm viện [dad, emp]
**thd_tro · Học trò của cha**
- .4 Học trò của cha — dad's poor student topped the exam and was failed by a bought paper [man]
- .5 Đề thi bị bán — who sold the questions [off]
- .6 Bảng vàng — the false top candidate's family [off, v]
- .7 Học trò bị truy — the student is hunted [man, gd]
- .8 Đơn kêu oan — a petition through her [emp]
- .9 Triều đình chấn động — the scandal hits the ministry [off, emp]
- .10 Thi lại — a re-examination [man, emp]
- .11 Công bằng khoa cử — endings: the student restored, cheaters fall / student restored quietly / the case buried; rare: the student becomes a censor loyal to her [man, emp]
**thd_hoc · Thầy giáo trong cung** (needs ≥1 royal child alive; else replaced by a shared arc — few children at start, OD 16/11)
- .4 Thầy giáo trong cung — the Emperor sets her to teach the young princes and princesses [emp, kid*]
- .5 Học trò nhỏ — a lazy prince, a clever princess [kid*]
- .6 Mẹ của học trò — a mother thinks she favours another child [v]
- .7 Kỳ khảo hạch — the Emperor tests the children [emp]
- .8 Đứa trẻ bị phạt — a child punished under her care [v, kid*]
- .9 Bài học đạo lý — a lesson that reaches the Emperor's ear [emp]
- .10 Kết khóa — the term ends [emp, v]
- .11 Người thầy — endings: honoured teacher, mothers grateful / honoured but hated by one mother / dismissed; rare: a prince calls her his teacher for life (later Đông cung weight) [kid*, emp]

### 4.9 cnv — Cung nữ tuyển vào cung (servant start; chapters read S.srv.risen: maid wording before, consort wording after)
**cnv_chu · Bí mật của chủ nhân**
- .4 Bí mật của chủ nhân — she sees {mis} burn a letter and hide medicine [mis]
- .5 Gói thuốc — what the medicine is [doc, mis]
- .6 Kẻ dò hỏi — another maid asks what she saw [maid, v]
- .7 Chủ thử lòng — {mis} tests her silence [mis]
- .8 Bí mật lộ một nửa — half the secret leaks [hh, eun]
- .9 Giữ hay nói — protect {mis} or tell the Hoàng hậu [mis, hh]
- .10 Đêm tra hỏi — the questioning [eun, hh]
- .11 Dao hai lưỡi — endings: {mis} trusts her for life / {mis} falls, she rises / both fall a step; rare: the secret was a good deed and she shares the credit [mis]
**cnv_ban · Chị em đồng hương**
- .4 Chị em đồng hương — Xuân Đào accused of stealing a jade bracelet [Xuân Đào, mis]
- .5 Chiếc vòng ngọc — where the bracelet really went [maid, eun]
- .6 Kẻ vu — the accuser [maid, v]
- .7 Xuân Đào bị phạt — beaten and sent down; medicine (deadline) [doc]
- .8 Lời làm chứng — testify (risk to her post) [mis]
- .9 Chủ phân xử — the mistress decides [mis]
- .10 Trả lại sự thật — the truth out or buried [eun]
- .11 Đồng hương — endings: Xuân Đào cleared and loyal / cleared but sent home / lost; rare: the accuser confesses and Xuân Đào rises with her [Xuân Đào]
**cnv_mat · Ánh mắt nơi hành lang**
- .4 Ánh mắt nơi hành lang — the Emperor stops under the eaves; his eyes seek her; {mis} notices [emp, mis]
- .5 Chủ nhân ghen — {mis} sends her to hard work [mis]
- .6 Tránh hay gặp — avoid him or be found [emp]
- .7 Kính sự phòng ghi tên — her name in the register (rise rules: BAL.ntRise) [eun, emp]
- .8 Đêm đầu — the first night (if raised) or a refused summons (if not) [emp]
- .9 Từ tớ thành chủ — she must face {mis} as a near equal [mis]
- .10 Lời đồn quyến rũ — rumours she seduced the Emperor [v, hh]
- .11 Ánh mắt ấy — endings: raised and loved / raised and resented / kept as a maid (her road continues); rare: {mis} becomes her ally [emp, mis]
**cnv_ma · Ma ma dạy việc**
- .4 Ma ma dạy việc — Lưu ma ma picks her to train: pass and be chưởng sự, fail and wash clothes [Lưu ma ma]
- .5 Bài học thứ nhất — palace rules (real task) [Lưu ma ma]
- .6 Sổ sách Nội vụ phủ — accounts; a missing sum [eun]
- .7 Ma ma bị tố — someone accuses Lưu ma ma [maid, eun]
- .8 Bảo vệ thầy — defend her teacher [Lưu ma ma]
- .9 Kỳ sát hạch — the test (real task) [eun]
- .10 Ma ma lâm bệnh — her teacher falls ill [doc]
- .11 Chưởng sự — endings: chưởng sự post / passed, post given to another / failed back to laundry (road continues); rare: Lưu ma ma leaves her the Nội vụ phủ network [Lưu ma ma]

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

## 8. Open questions for Foreman B / main (not for the owner unless main decides so)
1. Thanh mai trúc mã (tm96a/b/c) become a SIDE thread once full roads exist (they no longer replace numbered chapters). Map assumes yes.
2. tt_mat .6 rank cap value goes in BAL.road (not typed); reversible.
3. HISTORY CHECK items (tt_oan .9, dtq_vu .9, dtq_binh .7, muoi_lau .7, td_an .10, thd_sach .9) → one history/drama expert pass (OD:L1327)
   before those chapters' text is final; structure can be built first.
