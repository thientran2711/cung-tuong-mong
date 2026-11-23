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
| NPC roads | women (consorts, maids): one of the 36 roads of their rolled origin; men: 20 templates (§4.10) | 1 unit = 1 NPC | D | **LIVE on main** (jnroad.js women + jnroadm.js men) |

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

### 4.2 dtq — Con gái Đại tướng quân — BUILT (review/road-b1, dev/build/jrd_dtq.js; all .5–.11 + one rare finale per road)
**dtq_bien · Khói lửa Nhạn Môn**
- .4 Khói lửa Nhạn Môn — the northern enemy breaks through; supplies, reinforcements and the Emperor's heart are in the palace [emp, dad]
- .5 Lương thảo mùa sau — Hộ bộ cuts or holds the Nhạn Môn grain before the spring book-closing (deadline); {v}'s house (thông gia of Binh bộ) is behind it [emp, v, th, maid]
- .6 Thư huynh trưởng — brother's letter: someone in the camp sells news to the enemy; arrest him or feed him false news [maid, v, emp]
- .7 Viện binh — the reinforcements: under dad's flag, an old general, or Binh bộ's man; a eunuch giám quân [emp, v, th]
- .8 Mất một thành — Ứng Châu falls (the gate opened from inside); blame lands on dad; a gate-guard witness [emp, v, maid, th]
- .9 Lời can gián — the Emperor wants to ride out himself; her counsel through Thái hậu, Tổng quản, Hoàng hậu or a memorial (rank-gated) [emp, th, v, eun, hh]
- .10 Trận quyết chiến — the decisive battle; earlier wins count; brother's raid; a spy in the palace [dad, emp, v, maid]
- .11 Khải hoàn hay bại trận — endings: Khải hoàn, vua trọng mà dè / Biên ải yên, cha lui về / Cha bị giáng, đường ngươi còn mở; rare: Bắt gián điệp giặc trong cung [dad, emp, v]
**dtq_vu · Bức thư mưu phản**
- .4 Bức thư mưu phản — a forged letter in dad's hand; find the forger before he is recalled [emp, dad, v]
- .5 Nét chữ giả — whose hand: dad's dismissed old ký thất, Hàn lâm viện, {v}'s house calligrapher [emp, v, maid]
- .6 Kẻ đưa thư — the post-soldier who carried it hides in a ruined temple; both sides hunt him [maid, eun, v]
- .7 Cha bị triệu về — dad brought to Đại Lý tự under guard; his old officers stir [dad, emp, v]
- .8 Bàn tay trong cung — a eunuch carrying {v}'s palace tally brought the letter in [v, eun, maid]
- .9 Đối chất — Tam ty hearing; she is not present; evidence via a Ngự sử, the Emperor's chỉ or her mother's petition; hồi tị (HISTORY CHECK) [emp, v, eun, th]
- .10 Chứng cứ cuối cùng — the paper, the musk ink, the seal mould at {v}'s relatives' villa [maid, v, emp]
- .11 Oan khuất sáng tỏ — endings: Cha sạch án, kẻ làm giả bị trị / Sạch án, về nhàn chức / Cha mang tội, được tha chết (the Emperor's grace); rare: Kẻ làm giả khai người trả bạc [emp, dad, v]
**dtq_binh · Binh phù và long ngai** (rival {v} = consort, cousin of phó soái họ Lục, the young general raised in .4)
- .4 Binh phù và long ngai — the Emperor wants dad's command back without seeming ungrateful [emp, dad]
- .5 Hổ phù — the camp half of the tiger tally must reach the capital before the autumn review (deadline); {v} asks it for the Lục house; whose hand joins the two halves [emp, dad, v, eun]
- .6 Bộ tướng của cha — the officers send a blood petition to keep dad; loyalty or faction in the Emperor's eyes; burn it, honour it, or stay silent [emp, dad, v, maid]
- .7 Chén rượu thu binh quyền — the feast where the Emperor sighs he cannot sleep and asks the old generals to trade command for land and marriage ties (HISTORY CHECK) [emp, dad, v]
- .8 Lời gièm pha — {v} and the Lục house say dad keeps private troops on his granted fields; the truth is veterans and war widows [v, emp, th]
- .9 Vua hay cha — king and father speak only through her (sealed letters, the Thái phó offer, a night talk); she carries the words whole or softened [emp, dad, v]
- .10 Ngày giao binh phù — handover at the city gate; old soldiers gather, Lục provokes, dad falls ill, a shout at the gate [dad, emp, v, maid]
- .11 Công thần về hưu — endings: dad retires with honour / dad keeps a title or command, she is suspected / dad struck from the merit roll; rare: the Emperor hands the tiger tally to her brother through her hand [dad, emp, v]
**dtq_huynh · Người anh nơi đất giặc** (rival {v} = consort whose father leads the war faction)
- .4 Người anh nơi đất giặc — brother captured; the enemy wants ransom, the court wants face [emp, maid, v]
- .5 Tiền chuộc — ransom for the brother's guards (and the brother after .4 lose) before the Hắc Thủy freezes (deadline) [dad, eun, v, emp]
- .6 Sứ giả bên giặc — the envoy holds a surrender paper with the brother's seal, signed under the knife; private terms through {man} [man, maid, v, emp]
- .7 Thể diện triều đình — peace talks; the war faction calls ransom a national shame; "trao trả" not "chuộc" [emp, v, dad, th]
- .8 Đường cứu lén — secret rescue across the freezing river with a guard who owes the brother his life [maid, man, v]
- .9 Anh trở về, bị nghi — the surrender paper reaches court through {v}'s father; the brother admits he signed to save his men [emp, dad, v]
- .10 Xét hỏi — Đại Lý tự hearing; bought witness, threatened guards, a forged enemy letter; her own testimony [emp, v, maid]
- .11 Huynh muội — endings: brother cleared and promoted / cleared but given a desk post / disgraced to commoner (she keeps her place); rare: the brother draws the enemy camp from memory and the cavalry takes it [dad, emp, v]
### 4.3 muoi — Con gái nhà buôn muối — BUILT (review/road-b1, dev/build/jrd_muoi.js; all .5–.11 + one rare finale per road)
**muoi_tuoc · Mua tước cho cha**
- .4 Mua tước cho cha — rich but despised; dad wants a title; the missing piece is someone to speak for him [th, v]
- .5 Người chịu nói giúp — a title needs a minister to sign as sponsor; each sponsor has a price; {v} warns officials off [v, eun, th, emp]
- .6 Bạc mở cửa — the petition must pass Nội vụ phủ before the year-end seal (deadline); gifts or bribes; the gift ledger [eun, v, hh, th, emp]
- .7 Con nhà buôn — Trung thu feast; {v} mocks her merchant birth; she proves worth by poems, lanterns and music, not silver [v, th, emp]
- .8 Công với triều đình — dad funds the broken river dike; a county official skims; a censor inspects: real or bought merit [emp, v, hh]
- .9 Tố mua quan bán tước — a censor ({v}'s house behind him) accuses the house of buying a title; her brother questioned [emp, eun, v, th]
- .10 Chiếu phong tước — the last court debate (she is not present): granted, delayed or refused; dad falls ill; {v} weeps to the Thái hậu [emp, th, v]
- .11 Tước vị của nhà — endings: title made hereditary / title for merit, one lifetime / refused, plaque taken down; rare: Hoàng thương ngự phong [emp, v, maid]
**muoi_lau · Thuyền muối đêm**
- .4 Thuyền muối đêm — the family boat seized with contraband salt; framed or caught [maid, v, emp]
- .5 Sổ thuyền — boat logs at the Diêm vận ty, missing pages, a clerk's hand, the year-end ledger burning (deadline) [maid, v, emp]
- .6 Kẻ hãm hại — the framing house = {v}'s in-laws, backed by the Diêm vận sứ of Giang Khẩu; a second night boat [v, eun, hh, emp]
- .7 Muối quan, muối lậu — salt monopoly: double-issued diêm dẫn, over-quota salt, two sets of books; a bribe through {v} (HISTORY CHECK) [eun, v, hh, emp]
- .8 Cha bị giam — dad jailed at Giang Khẩu; jailer's fees; {v} wants to change sides; the winter decides [maid, v, th, emp]
- .9 Người lái thuyền — the boatman witness hiding; his daughter held; a night escape; his testimony [maid, v, emp]
- .10 Xử án Giang Khẩu — the trial at Đại Lý tự (she acts only through others); the Hộ bộ Thị lang; a threat packet of salt [emp, eun, v, hh]
- .11 Trắng án — endings: cleared, the framing house falls / cleared, licence lost / fined and shamed; rare: Sổ muối dâng ngự án [emp, v, eun, maid]
**muoi_doi · Năm đói ở Giang Nam**
- .4 Năm đói ở Giang Nam — famine, prices triple; dad wants to sell high [emp, maid]
- .5 Ruộng của dân đói — dad buys starving farmers' land for a đấu of rice a mẫu; a village petition; {v} mocks her [maid, v, emp]
- .6 Dân đói về kinh — landless refugees at the capital gate; a censor blames the salt house; {v} pays people to cry injustice [emp, v]
- .7 Tiếng tích trữ — rumour of a hidden granary at bến Giang Khẩu; {v} forges a ledger with the house's seal [v, maid, emp]
- .8 Phát chẩn — whose name goes on the relief sacks; mouldy grain; deadline = Hộ bộ closing its books [emp, th, v]
- .9 Kẻ ăn bớt thóc chẩn — a county magistrate (kin of {v}'s mother's house) steals half the relief grain [maid, v, emp]
- .10 Mùa sau — drought again; a price-stabilising granary or the merchants' cartel; late rain [emp, maid, v]
- .11 Ơn hay oán — endings: house praised / wealth kept, name faded / both lost; rare: the Emperor writes «Thục đức» for her on the stele [emp, maid, v]
**muoi_no · Món nợ trong cung**
- .4 Món nợ trong cung — a rival borrowed from the family shop to bribe and cannot pay [v]
- .5 Bản sao giấy nợ — a copy of the debt note sold by a dismissed clerk; a night race for it [maid, v, eun]
- .6 Đòi hay tha — the shop needs silver before the salt boats arrive; {v}'s mother falls ill; dad comes to collect [v, maid]
- .7 Kẻ thứ ba — {v2} gets a copy and demands her banquet seat [v2, v, eun]
- .8 Nợ chồng nợ — {v} borrows from a moneylending eunuch, pawns an imperial hairpin; buy up the debt or break the ring [v, eun]
- .9 Món nợ lộ ra — the Hoàng hậu investigates lending in the palace; {v} questioned [hh, v, emp]
- .10 Ân hay oán — the Emperor means to punish {v}; the old Kính sự phòng bribe receipt; her one word decides [v, v2, emp]
- .11 Sợi chỉ đỏ — endings: sworn sisters / {v} withdraws to pray, demoted / enemy for life; rare: the receipt exposes Kính sự phòng's paid-slot ledger [v, maid, eun, emp]
### 4.4 cn — Cung nữ được sủng hạnh — BUILT (review/road-b1, dev/build/jrd_cn.js; all .5–.11 + one rare finale per road)
**cn_chu · Chủ cũ**
- .4 Chủ cũ — her old mistress cannot bear her former maid sitting as an equal [v]
- .5 Chén trà năm xưa — the mistress keeps reminding the palace who poured whose tea; the Emperor's tea party, where {v} asks her to brew [v, eun, emp]
- .6 Đồng liêu cũ — three maids who served {v} with her (envious / asking protection / {v}'s spy); one framed for theft (deadline: Nội vụ phủ rằm list) [maid, v, eun]
- .7 Bẫy trong yến tiệc — the Hoàng hậu's birthday feast; {v} plants a cracked jade cup in her offering [v, hh, eun]
- .8 Ngang hàng — talk of raising her to the mistress's rank (ranks read from S.rank / v.rank); who bows first; the decree day [v, emp, hh, th]
- .9 Vượt bậc — {v} falls on hard times; revenge or grace; the Hoàng hậu makes her judge {v}'s fault [v, hh, eun]
- .10 Đối diện — a rainy night alone in {v}'s tea room: the jade cup truth, the old beating [v]
- .11 Chủ tớ năm xưa — endings: Chủ tớ thành tỷ muội / Chủ cũ sa cơ / Mỗi người một vết sẹo / Mang tiếng vong ân; rare: Chủ cũ tạ lỗi trước Hoàng hậu [v, hh]
**cn_tinh · Mối tình thuở hầu trà**
- .4 Mối tình thuở hầu trà — the guard she once promised now guards her gate; old letters exist [gd]
- .5 Thư cũ — find the remaining letters before {v}'s people do; the night of burning [gd, maid, v]
- .6 Kẻ cầm thư — {v} holds a letter and names her price by rằm; a meeting at the lotus pond [v, eun, maid]
- .7 Thị vệ bị điều đi — Binh bộ posts the guard to the frontier at {v}'s word; the farewell at the fifth watch [gd, eun, v]
- .8 Lời đồn tư tình — rumours traced to {v}'s maid; the Emperor goes cold; a false witness before the Hoàng hậu [v, hh, emp]
- .9 Kính sự phòng tra xét — gate logs, her maid questioned, the Emperor's silent visit [eun, emp, maid]
- .10 Hắn chọn — the guard brought back in chains; {v} promises him freedom if he accuses her [gd, emp, v]
- .11 Chôn quá khứ — endings: Chôn sạch quá khứ / Hắn gánh tội thay / Lộ chuyện cũ, bị phạt (not killed, not lãnh cung); rare: Hộ vệ thề trọn đời [gd, emp, v]
**cn_ban · Tri kỷ ở Tân Giả khố**
- .4 Tri kỷ ở Tân Giả khố — Tố Nga sent to Tân Giả khố for a crime she did not do; she knows the secret of the poisoned well [Tố Nga, hh]
- .5 Kẻ muốn Tố Nga câm lặng — poisoned gruel / still on the convict roll; {v} probes; the night someone comes to kill Tố Nga [maid, eun, v]
- .6 Bí mật Càn Ninh cung — Tố Nga saw the poisoner's shoes; order book + drug register show {v} borrowed Càn Ninh's name; tell the Hoàng hậu, bargain, or burn it [maid, v, hh, doc]
- .7 Kẻ vu Tố Nga — the planted gold hairpin: case file, a witness now serving {v}, the goldsmith [v, eun, maid]
- .8 Tố Nga lâm bệnh — she coughs blood; ginseng within the deadline; {v}'s people swap her medicine [doc, maid, v]
- .9 Lời khai — Tố Nga's sworn testimony: where she waits; {v} offers to strike her name for silence [maid, eun, v, hh]
- .10 Rửa oan — retrial at Càn Ninh cung: false witnesses, the Emperor drops in, Tố Nga speaks [hh, emp, v]
- .11 Tình chị em — endings: Tố Nga ở lại bên ngươi / Tố Nga về quê / Tố Nga không qua khỏi (grief, no blame); rare: Bí mật cái giếng hạ bệ kẻ vu [maid, v, doc]
**cn_than · Thân thế thật**
- .4 Thân thế thật — a dying mama says she is the daughter of Thẩm Thị lang, a demoted official [mama]
- .5 Di vật của ma ma — her mother's letter + half a page of the old flood-relief ledger sealed by {v}'s grandfather; {v}'s house tries to buy or burn it [maid, eun, v]
- .6 Nhà {v} trong án cũ — {v}'s house cuts her stipend; {v} herself may become an ally; an offer for the ledger [v, eun, doc]
- .7 Người thân còn sống — the old Thẩm steward hides in a temple with the other half page, ill (deadline) [maid, eun, doc, v]
- .8 Kẻ không muốn án lật — a censor of {v}'s house impeaches her for reopening the late emperor's case; the Thái hậu; an old censor speaks up [emp, th, v, eun]
- .9 Nhận hay không — the page is genuine; claim the Thẩm name or only the rites [emp, maid, v]
- .10 Minh oan cho cha ruột — Đại Lý tự trial; the Thái phó faces the steward [emp, v, eun, hh]
- .11 Họ thật — endings: Họ Thẩm trở lại / Lặng lẽ mang họ Thẩm / Họ Thẩm không được nhận; rare: Cố nhân của cha thành chỗ dựa [emp, maid, v, th]

### 4.5 nc — Công chúa hòa thân ({land} = Nam Chiếu / Bắc Địch) — BUILT (review/road-b2, dev/build/jrd_nc.js; all .5–.11 + one rare finale per road)
- Bắc Địch branch plays the same chapters under bd_hoa→nc_su, bd_ngua→nc_gian, bd_tuc→nc_tuc, bd_hoang→nc_vuong (land tokens {land} {pv} {mh} {quan} {pa} {pb}; .5 has NCW/BDW openings). Note: bd lives do not run the 14-chapter frame yet (STORY.bd is defined after the j67 wrapper; engine request sent).
**nc_gian · Mật lệnh cố quốc**
- .4 Mật lệnh cố quốc — {dad} orders her to spy on Đại Hy's border defences [emp, envoy]
- .5 Đường thư qua Hội Đồng quán — lão Kha, a {land} merchant at Hội Đồng quán, becomes her go-between; who holds the channel [maid, v, emp]
- .6 Tấm lộ dẫn — Kha's caravan is held at Chính Dương gate without a Lễ bộ pass, a letter of {pv} in one chest; deadline the full moon [maid, v, emp]
- .7 Mắt của Hoàng thượng — {v} reports letters to {land}; guards at her door and the Emperor tests her himself [emp, maid, v, hh]
- .8 Hai lòng — {land} raids the border and {pv} wants Đại Hy's route; she sends true, false or nothing [emp, maid, v]
- .9 Lão Kha bị bắt — Binh bộ traces the caravan and Kha sits in the Đại Lý tự jail; the hearing is in ten days [maid, emp, v]
- .10 Đường cùng — all the evidence on the Emperor's desk; confess, deny or turn the channel to Đại Hy [emp, v]
- .11 Trung với ai — the {land} envoy asks whose she is. Endings: Một lòng, hai nước / Người của Đại Hy / Cái bóng gián điệp; rare: Trung hiếu lưỡng toàn [emp, maid, v]
**nc_su · Sứ đoàn cố quốc**
- .4 Sứ đoàn cố quốc — her royal brother leads the tribute mission; every banquet a game [emp, bro]
- .5 Lễ bái trước điện — {pa} leads the mission again and refuses the full kowtow before the audience [emp, v]
- .6 Bức gấm Bách thọ — {mh}'s woven birthday gift is ink-stained at Hội Đồng quán; deadline Vạn thọ tiết in ten days [maid, v, emp]
- .7 Huynh trưởng phạm cấm — drunk {pa} hunts in the forbidden Thượng Lâm park; plead, prove or let the law act [emp, v]
- .8 Đại yến các nước — the banquet for all envoys: seating, toasts and where she sits [emp, v]
- .9 Điều ước chợ biên — the border-market treaty (salt, tea, iron for horses, hides) before Sương giáng closes the passes [emp, v]
- .10 Sứ đoàn lên đường — gifts for {mh} and a charge of forbidden goods in the envoy carts at the gate [emp, maid, v]
- .11 Chiếc cầu hai nước — {quan}'s state letter has a line about her. Endings: Cầu nối hai triều / Hai nước yên, ngươi đứng giữa / Sứ tiết thưa dần; rare: Hai triều cùng sắc phong [emp, maid, v]
**nc_tuc · Người ngoại tộc**
- .4 Người ngoại tộc — the Thái hậu dislikes foreigners; her dress, food and dances are watched [th]
- .5 Áo váy cố hương — New Year audience in Đại Hy court dress; home dress, palace dress or her mother's kerchief in the sleeve [th, v, maid]
- .6 Món ăn lạ — {v} falls ill after a sour {land} soup at her palace; "bùa ngải" rumour, Thận hình ty gives ten days [doc, v, th]
- .7 Bàn thờ cố hương — the Emperor's bad dreams are blamed on her home altar; a palace search is coming [emp, v, th, maid]
- .8 Tờ sớ người ngoại tộc — a censor of {v}'s kin memorialises that foreign consorts should not hold high rank or raise heirs [emp, v, th]
- .9 Học lễ Đại Hy — she runs the hậu cung's Phật đản rite, to the letter, with or without her land's lanterns [th, maid, v]
- .10 Nghĩa nữ nhà ai — Đức Thọ cung offers to enter her as adopted daughter of a Đại Hy house, erasing her {land} name [th, maid, v]
- .11 Hai nửa một người — the Vạn thọ banquet with the {land} mission. Endings: Được chấp nhận như chính mình / Thành người Đại Hy / Mãi là người ngoài; rare: Lễ cố hương vào lịch cung [th, emp, v]
**nc_vuong · Ngai vàng cố quốc**
- .4 Ngai vàng cố quốc — {dad} dies; brother and uncle fight for the throne, both seek Đại Hy and her [emp, bro]
- .5 Ấn sách phong — the new ruler needs Đại Hy's investiture seal; Lễ bộ stalls and the losing side sends gold [emp, maid, v]
- .6 Triều đình chia phe — Binh bộ (backed by {v}'s house) wants two border towns, Lễ bộ wants peace; she is caught between [emp, v]
- .7 Thư cầu cứu của mẹ — rebels trap {mh} in an old city; help must pass before the pass closes at month's end [maid, emp, v]
- .8 Binh Đại Hy xuất ải — the rebels take three border towns; send troops or not, and under whom [emp, v]
- .9 Tin bại trận — a column is ambushed in a gorge and the court blames the {land} woman in the palace [emp, v, maid]
- .10 Lời quyết — the losing side asks to split {land}; the Emperor will follow her one word [emp, v, maid]
- .11 Ngai vàng sau cùng — both missions meet at Hồng Lô tự. Endings: Cố quốc một lòng / Cố quốc chia đôi / Cố quốc thành nước thù; rare: Hai nhà thề hòa bằng rượu của ngươi [emp, v]

### 4.5b bd — Công chúa hòa thân · Bắc Địch — OWN 4 ROADS (owner OD 18/11 ~22:05Z, GE D2 = (a); PLAN review/bd-roads, E14)
- bd stays a COUNTRY BRANCH of hòa thân (no 10th origin, same jkc2 / KC2LAND frame, same land tokens {land} {pv} {mh} {quan} {pa} {pb} of jrd_nc NCL.bd), but
  new bd lives roll one of 4 roads of their own: `bd_san`, `bd_soi`, `bd_tuyet`, `bd_hen` (.4 premise arc + .5–.11 + j97 rare at .4 + RD97L rare at .11).
- Files: `dev/build/jrd_bd.js` (lead E14: shared bd helpers, legacy block, bd_san + bd_soi), `dev/build/jrd_bd2.js` (writer 2: bd_tuyet + bd_hen),
  both right after jrd_nc.js in assemble.py. Numbers: `dev/build/jbalbd.js` right after jbalroad.js (ONE CORE): `BAL.arc.fx.<road>` (.4),
  `BAL.arc.rare.<road>` (.4 rare), `BAL.road.fx.<road>_<n>` (.5–.11), `BAL.road.rare.<road>_11`, `BAL.road.bd` (chapter constants); one block per writer.
- LEGACY (law 6c, old saves): the old premises bd_hoa / bd_ngua / bd_tuc / bd_hoang (jorigins.js) and their alias chapters (= nc_su / nc_gian /
  nc_tuc / nc_vuong under bd ids; the loop moves VERBATIM from the end of jrd_nc.js into jrd_bd.js) stay registered, so a saved life that already rolled
  one keeps playing to its .11. They are marked `old:1` and are no longer dealt to NEW lives (arcIds67 wrapper in jrd_bd.js drops old:1 premises).
- People (law 6b): the steppe people are real people of the branch, kept in one book `BDP` (jrd_bd.js): id, name, role, where (steppe / border /
  capital), alive, met; chapter go: closures move them (S.st.f14.fb "bd.p.<id>.*"), text reads them by token. Rows in §5.4.
- Objects (law 6c): every object a bd chapter hands over is a real item or a fb-tracked thing with an owner (the border map copy, the cut girth,
  the uncle's letters, her mare Tuyết Câu in the Thượng tứ viện stable, the oath stone …): given / burnt / kept / seized, never vanished.
**bd_san · Mùa thu săn** (Tài nghệ · Tình yêu; GE ge1 Thống lĩnh ngự mã · ge2 Tri kỷ lưng ngựa · ge3 Mũi tên trường săn · ge4 Về với thảo nguyên)
- .4 Mùa thu săn — the autumn hunt at the Bắc Uyển hunting ground; she rides her mare Tuyết Câu among Đại Hy men; one arrow decides who notices her [emp, v]. Ends: win (the Emperor calls her to ride beside him) / win2 (Thượng tứ viện asks her about the steppe horses) / mid / lose ({v} says she shot near the Emperor's horse). j97 rare «Một tên hai nhạn».
- .5 Chuồng ngựa Thượng tứ viện — the new Bắc Địch horses arrive; Ba Đồ the groom and the Thượng tứ viện chief both want the stable's say; who holds it [emp, maid, v]
- .6 Đai yên bị cắt — before the ride with the Emperor her saddle girth is found cut; the girth, the groom who saw, {v}'s eunuch [v, maid, emp]
- .7 Cưỡi ngựa cùng vua — the Emperor rides out of the city with her; a censor memorialises "a consort on horseback" [emp, v]
- .8 Dịch ngựa — sickness in the Thượng tứ viện stable, the border warhorses fall; steppe cure or the horse doctor; Binh bộ waits [emp, maid]
- .9 Hội bắn mùa xuân — spring archery for princes and guards; teach, compete, or let {v}'s kinsman win [emp, v]
- .10 Tiếng gọi thảo nguyên — a Bắc Địch herd at the border market; Ba Đồ keeps a saddled horse at the west gate for her [maid, emp]
- .11 Vi trường năm sau — the next autumn hunt; an arrow flies at the royal party. Chapter results: Nữ kỵ bên ngự giá / Ngựa về chuồng, người về cung / Mũi tên lạc; rare RD97L «Hoàng thượng trao cương ngựa ngự» [emp, v, maid]
**bd_soi · Sói đầu đàn** (Quyền lực · Gia tộc; GE ge1 Nữ Khả hãn · ge2 Lập em làm hãn · ge3 Sói già phải chết · ge4 Con trai hai cõi; design GRAND_ENDINGS §4.2)
- .4 Sói đầu đàn — {pv} falls from his horse; thúc phụ Hô Diên Liệt's envoy asks Đại Hy to recognise him; em trai Ô Lặc writes for help; the Emperor asks her [emp]. Ends win / win2 / mid / lose. j97 rare «Phụ hãn tỉnh lại».
- .5 Hai phong thư — uncle and brother both write; the uncle asks for the border map (a real copy in the Binh bộ archive) [emp, maid]
- .6 Sứ giả mang dao — Thát Mộc, a guard of the uncle's embassy, carries a knife for Ô Lặc's envoy (or for her) [emp, maid, v]
- .7 Chợ ngựa đóng cửa — the uncle shuts the horse market; Binh bộ hawks (backed by {v}'s house) want war [emp, v]
- .8 Khả đôn vào kinh — {mh} flees to the capital; sheltering her risks war; {v} calls her a spy [emp, v, maid]
- .9 Hội đua ngựa mùa hạ — the succession race on the steppe; a champion, the brother, or her own name [emp, maid]
- .10 Đêm tuyết Âm Sơn — Đại Hy troops at the border: send, hold, or bargain for the tribes' oath [emp, v]
- .11 Chủ nhân kim trướng — who sits in the golden tent. Chapter results: Em trai lên ngôi hãn / Thảo nguyên chia đôi / Thúc phụ thắng, mối hòa lung lay; rare RD97L «Kim trướng gọi ngươi là Khả đôn» [emp, v]
**bd_tuyet · Năm tuyết trắng** (Thiên hạ; GE ge1 Mẹ của thảo nguyên · ge2 Lương thảo đổi hòa · ge3 Mở cửa ải bắc · ge4 Khúc ca tuyết trắng) — writer 2, outline (writer may refine, keep the people and objects)
- .4 Năm tuyết trắng — a white winter kills the herds; A Sử Na Cát, old chief of the border tribe, begs grain at the pass [emp]. j97 rare «Tuyết tan giữa đông».
- .5 Kho Thường Bình — Hộ bộ's ever-normal granary: ask, buy, or pledge her dowry [emp, v]
- .6 Chợ lương đổi ngựa — grain for horses at the pass market; the price and who sets it [emp, maid]
- .7 Cướp biên — a starving band raids a Đại Hy village; Binh bộ wants punishment [emp, v]
- .8 Người lánh nạn ở Nhạn Môn — refugees at the gate; the old border general asks the court [emp, maid]
- .9 Sốt trong trại — fever in the refugee camp; thái y, steppe healers or quarantine [emp, maid, v]
- .10 Mở cửa ải — the gate: open for people, open for the tribe, or hold [emp, v]
- .11 Khúc ca mùa xuân — the thaw; who is remembered. Chapter results (writer names); rare RD97L (writer names) — her winter song (ge4) must be written in a chapter option.
**bd_hen · Lời thề bên đống đá** (Tình yêu · Tự do; GE ge1 Lời thề trọn vẹn · ge2 Chôn lời thề cũ · ge3 Nghĩa huynh biên ải · ge4 Đòi máu cho chàng) — writer 2, outline
- .4 Lời thề bên đống đá — her betrothed Thác Bạt Phong rides in with the embassy guard; the oath they swore at the ovoo stone [emp, v]. j97 rare «Hòn đá thề trở về».
- .5 Hòn đá trong tay áo — he sends her the oath stone through Hội Đồng quán; keep, return, or show the Emperor [maid, emp]
- .6 Kết nghĩa — a sworn brotherhood before the court turns the old oath into something speakable [emp, v]
- .7 Trận đấu vật — {v}'s house sets a trap at the wrestling before the Emperor; a man dies [emp, v]
- .8 Lá thư bị chặn — a letter in steppe script is seized at the gate [emp, v, maid]
- .9 Ngục Đại Lý tự — Phong is jailed; the hearing day [emp, maid, v]
- .10 Đêm trước phiên xử — plead, prove, or open the cell [emp, v]
- .11 Lời thề sau cùng — the embassy leaves; with him, without him, or for him. Chapter results + rare RD97L (writer names).
- Grand-ending reach (both writers): each road's options must carry ge1–ge4 Chuỗi (pull) and Khóa (close) intents from GRAND_ENDINGS §3/§4.2 by RAW
  option name, with enough thiện- AND ác-leaning options on every Chuỗi so both shadings are reachable (the GE data wave lists them by name later).

### 4.5c pf — Công chúa hòa thân · Phù Tang — NEW 4 ROADS (owner OD 19/11 ~06:40Z/~06:42Z/~06:50Z + FIGURE_GATE «OWNER LƯỢT 283»; PLAN review/phutang-road, E21)
- pf = the THIRD country branch of the one hòa thân origin nc (no 10th origin; j1 ORIGIN_BR.pf, par "nc"; rolled with the origin by BAL.orig.br.nc.pf),
  same jkc2 / KC2LAND home frame (.1–.3 in Phù Tang: KC2LAND.pf, place keys np_*), land-token row NCL.pf ({land} {pv} {mh} {quan} {pa} {pb} {canh} {laq} {nden}),
  own STORY.pf / QUEST67.pf, own family letter (j72 fam_pf rows). New pf lives roll one of 4 roads: `pt_hai`, `pt_su` (lead), `pt_tang`, `pt_dang` (writer 2)
  (.4 premise arc ARC67.<id> o:"pf" + .5–.11 rdDef + j97 rare at .4 (PF97 → R97L) + RD97L rare at .11). No legacy: pf is new (no old saves to migrate).
- Era words (Foreman E rulings): Tang-like world; NO Wokou word → «hải tặc / giặc biển Đông Hải»; sea traders = «thương nhân Tân La»; dress = Tang-style
  jacket + pleated skirt (never «thập nhị đơn», which is later); «Thiên hoàng» only inside Phù Tang scenes, Đại Hy calls him «Quốc chủ Phù Tang».
- Files: `dev/build/jkc2_pf.js` (after jkc2.js: ORIGIN_BR.pf, STORY.pf, QUEST67.pf, KC2LAND.pf + KCPL np_*), `dev/build/jrd_pt.js` (lead: NCL.pf + TOK67 wrap,
  PFP people book + pfMan, PFO object book, pt_hai, pt_su), `dev/build/jrd_pt2.js` (writer 2: pt_tang, pt_dang), numbers `dev/build/jbalpt.js` after jbalbd.js.
- People (law 6b): one book PFP in jrd_pt.js (id, name, role, where hb «trên biển» / tn «Phù Tang» / cang «Minh Châu» / kinh / nguc, alive, met);
  every man who is in the capital stands in S.men on the jmen schedule (pfMan, the bd pattern) and leaves it when he sails, is jailed or dies.
  A moved / dead person never acts again: every later line reads pfP/pfAlive (scan dev/measure/pt-scan.py, 0 unguarded).
- Objects (law 6c): one book PFO (fb "pt.o.<thing>" = holder): quốc thư, rương cống, gương đồng của mẫu hậu, thanh đao Phù Tang, hộp kinh, nhật ký hải trình,
  danh sách sứ đoàn, hải đồ, giấy thông hành Thị bạc, hạt giống trà, ngọc trai chuộc người … set on every give/buy/receive/lose/burn/hide (scan: 0 unbooked).
**pt_hai · Vượt bể** (Sinh tồn · Trung nghĩa; GE hooks: ge1 Người đếm tên kẻ chết đuối · ge2 Chủ thuyền Đông Hải · ge3 Đổ tội cho biển · ge4 Thuyền về Nan Ba)
- .4 Thuyền thứ tư chưa tới — four ships sailed; hers reached Minh Châu, the fourth (her nurse-maid Tiểu Ngọc, the tribute chest, the ship log) is missing;
  the court asks if Phù Tang sent half its tribute; who she blames / trusts [emp, v]. j97 rare «Lửa hiệu trên Ngũ Đảo».
- .5 Thư từ Phúc Châu — a survivor's letter: the fourth ship drifted south; the ration and the water; who pays for the search [emp, maid]
- .6 Người giữ kiêng — the ship's kiêng-keeper (Thân Lão, the Wei-shu «trì suy» custom) is blamed for the storm; he is held at Minh Châu [emp, v]
- .7 Thương thuyền Tân La — Kim Hựu Thành's traders found the wreck; they ask a price; their ledger is the proof of who lived [maid, emp]
- .8 Giặc biển Đông Hải — pirates (Ô Cửu) hold the survivors and the chest; ransom vs the Tân La ship's tax vs the navy [emp]
- .9 Bến Minh Châu — survivors land; Tiểu Ngọc lives or not; the chest's seals [emp, v]
- .10 Kiểm cống — Hồng Lư tự checks the tribute against the list; half is sea-spoilt; {v} says she swapped it [emp, v, th]
- .11 Danh sách sứ đoàn — the roll of the living and the dead; who sails home on the next monsoon; finale rare «Đèn trên mặt bể» (RD97L).
**pt_su · Khiển Đường sứ** (Quyền mưu · Trung nghĩa; GE hooks: ge1 Sứ giả của hai trời · ge2 Người dịch quốc thư · ge3 Bẻ gãy sứ đoàn · ge4 Hồi thư bằng máu)
- .4 Quốc thư hai mặt trời — the envoy chief Tá Bá Kim Thành brings a letter in which the Phù Tang ruler writes as an equal Thiên tử; the Emperor is angry;
  she is asked to read it aloud [emp, th]. j97 rare «Một chữ đổi một chiến thuyền».
- .5 Hồi thư — the wording of the Đại Hy answer; she, the Hồng Lư tự khanh and {v}'s father each want a word changed [emp, v]
- .6 Chỗ ngồi đêm Nguyên đán — the Phù Tang envoy seated below Tân La (the real 753 seat dispute); he asks to swap [emp, v]
- .7 Lạy hay vái — the audience rite; the envoy refuses the full kowtow; she can teach, shame or shield him [emp, th]
- .8 Hồi tứ — the gift quota and the trade list (silk, books, medicine vs pearls, silver, swords); Hộ bộ's count [emp]
- .9 Lưu học sinh — scholar Cát Thành Trọng Lữ wants to sit the Đại Hy exam and stay; the envoy wants him home [emp, maid]
- .10 Thuyền về — which ship sails when; a forged sailing order; the monsoon [emp, v]
- .11 Ai về cố quốc — the embassy leaves; who goes (envoy, scholar, her letter, her son's name?) and who stays; finale rare «Bài thơ trăng Tam Lạp» (RD97L).
**pt_tang · Tăng sư vượt biển** (writer 2; Tín ngưỡng · Nhân từ) — two Phù Tang monks (Tịnh Viên + Phổ Chiếu-like [D]) come to invite a Đại Hy master
  (Pháp sư Trí Viễn [D], the Ganjin shape, attempts blocked, loses his sight) to cross; .5 kinh hay hạt giống, .6 chuyến vượt biển bị chặn, .7 mắt thầy,
  .8 phe Phật – phe Đạo trong triều, .9 xá lợi, .10 thanh đao dâng chùa, .11 thầy đi hay ở. 2 rares.
**pt_dang · Hải tặc và thương nhân** (writer 2; Mưu sinh · Quyền mưu) — the Tân La merchant Kim Hựu Thành and the pirate chief Ô Cửu at Minh Châu / Dương Châu:
  .5 hàng đao và bạc, .6 thuyền giặc, .7 tiền chuộc, .8 Thị bạc ty (customs) đút lót, .9 thanh đao chém sắt, .10 bến cảng, .11 luật biển. 2 rares.
- Shared people: Kim Hựu Thành and Ô Cửu appear in pt_hai .7/.8 and pt_dang (one book, one life = one road, so never two states at once).

### 4.6 td — Con gái tội thần — BUILT (review/road-b2, dev/build/jrd_td.js; all .5–.11 + one rare finale per road)
**td_an · Lật lại án cũ**
- .4 Lật lại án cũ — the family accused of treason by {foed}; his daughter {foe} is in the palace [foe, foed]
- .5 Bản sớ gốc — get {foed}'s original memorial with the forged Binh bộ seal out of the Nội các archive [eun, v, maid, foe]
- .6 Nhân chứng — keep the old steward and the old Hình bộ clerk alive and take their words before the clerk leaves in three months [maid, v, foe]
- .7 Nhà kẻ thù ra tay — {foed}'s house strikes first through {v} and {foe} [v, foe, emp, th]
- .8 Đủ chứng cứ — the third proof (the Binh bộ seal register, burned at year end) and a petitioner from rank RANKS[BAL.road.td_an.rank] [emp, v, th]
- .9 Dâng sớ — the petition for a chỉ sending the case to the Tam ty, against the filial-piety objection [emp, th, v, foe]
- .10 Tam ty xét lại — the retrial; she acts only through witnesses and petitions (HISTORY CHECK) [emp, v, foed]
- .11 Án cũ sáng tỏ — the Emperor's final ruling. Endings: Nhà ngươi rạng danh / Rửa oan, không trị tội / Án không lật được; rare: Ngự bút phục tước, biển Trung hiếu [emp, foe, v]
**td_ke · Kẻ đứng sau màn**
- .4 Kẻ đứng sau màn — {foed} was only the knife; the hand is higher [foed]
- .5 Lần theo bạc — follow {foed}'s bribe money to {n1} before the ledgers burn [maid, eun, v]
- .6 Con dao còn sống — keep {foed} alive as the only witness against {n1} [maid, foe, v]
- .7 Bị phát hiện — {n1} plants a eunuch and a guard in her palace and waits for one slip [eun, maid, v, emp]
- .8 Đồng minh bất ngờ — others {n1} wronged (Trịnh phu nhân, a censor, even {foe}) join or use her [foe, v, maid]
- .9 Bẫy ngược — bait a trap that closes before the New Year audience [emp, v, foe, eun]
- .10 Lộ mặt — the spring audience; her proof reaches the throne only through the censor and witnesses [emp, v, foe]
- .11 Trả thù kẻ nào — the Emperor rules on both. Endings: Kẻ chủ mưu đền tội / Chỉ con dao ngã / Buông cả hai để giữ mình; rare: Nắm thóp kẻ chủ mưu [emp, foed, foe, v]
**td_song · Người em còn sống**
- .4 Người em còn sống — her youngest brother lives as a border conscript under a false name [bro2]
- .5 Tin lan về kinh — word that he lives reaches the capital; learn who knows and find him a protector [maid, foe, emp]
- .6 Thư qua biên ải — keep the letter line safe while {v} hunts her letters to sell [maid, v]
- .7 Kẻ nghi ngờ — an old Lễ bộ official knows his face and a revenge rumour heads for the throne [foe, v, emp]
- .8 Em bị thương — his unit is pushed to the front; medicine within one month, and who signed the order [doc, maid, foe]
- .9 Đổi tên — a new household paper before the Hộ bộ census in two months, or his true surname [eun, v, emp]
- .10 Đưa em về — the palace guard in the capital or the far border [emp, foe, maid]
- .11 Máu mủ — {foed}'s last memorial calls him a seed of revolt. Endings: Chị em đoàn tụ / Em theo quân phương xa / Lạc mất em lần nữa; rare: Em lập công, rửa tên cha [emp, foe, v]
**td_tha · Thù hay tha**
- .4 Thù hay tha — {foe} is the enemy's daughter but did nothing; now she is in trouble [foe]
- .5 Búp bê trù ếm — {v} frames {foe} with a curse doll; speak for her, against her, or stay silent [foe, v, emp]
- .6 Đứng nhìn hay ra tay — {v}'s house impeaches {foed} and asks her to join [v, foe, emp]
- .7 Lời thú nhận — {foe} once saw the forged memorial's draft; turn it into a signed statement [foe, v]
- .8 Cha nàng — {foed} offers land, graves and silver for the statement before the autumn assizes [maid, foe, v]
- .9 Hai người con gái — on her parents' death anniversary {foe} asks to light incense [foe, v]
- .10 Nước cờ cuối của nhà kia — {foed} accuses her of khi quân for entering the palace under a changed name [emp, foe, v, th]
- .11 Cởi nút thắt — the Emperor's chỉ opens a Tam ty review of {foed}. Endings: Kết nghĩa tỷ muội / Thù trả, nghĩa tuyệt / Đường ai nấy đi; rare: Con gái làm chứng cho cha [foe, emp, v]

### 4.7 ch — Cháu gái Thái hậu — BUILT (review/road-b2, dev/build/jrd_ch.js; all .5–.11 + one rare finale per road)
Every chapter has an S.thDead branch (openings, turning beat, climax) for a Thái hậu who died by the j13 roll; ch_benh .10/.11 can kill her itself.
**ch_co · Quân cờ của cô mẫu**
- .4 Quân cờ của cô mẫu — the Thái hậu placed her to balance the Hoàng hậu; orders grow heavier [th, hh]
- .5 Tai mắt Đức Thọ cung — the Thái hậu's spies (a mama, a ledger eunuch) must learn to obey her [th, hh, v, eun]
- .6 Hoàng hậu sinh nghi — the Hoàng hậu (or Nội vụ phủ, if no queen) catches a Đức Thọ cung spy and asks her [hh, v, emp]
- .7 Hai chủ — the Thái hậu wants her cousin as Cửu môn đề đốc, the Emperor wants his own man [th, emp, v]
- .8 Lệnh khó — an order to bury a cloth doll in {v}'s palace [th, v, maid, hh]
- .9 Từ chối — an oath to obey for life, or lose the shelter [th, v, emp]
- .10 Người đánh cờ — at the Thái hậu's birthday Càn Ninh cung asks her to "rest"; she plays her own move [th, hh, v, emp]
- .11 Cô cháu — who takes over the Thái hậu's game. Endings: Người nối ván cờ Đức Thọ cung / Cháu ngoan giữ lễ / Đức Thọ cung quay lưng; rare: Cô mẫu trao ấn Đức Thọ cung [th, v, emp]
**ch_benh · Thái hậu lâm bệnh**
- .4 Thái hậu lâm bệnh — the Thái hậu falls ill; the harem stirs [th, doc]
- .5 Thuốc thang — the Viện phán and lương y họ Tôn give opposite diagnoses; she picks who treats her [doc, th, emp, v, hh]
- .6 Kẻ rục rịch — consorts drift to Càn Ninh cung and someone must stand in at the ancestor rite [v, hh, emp]
- .7 Đầu độc? — a decoction eunuch adds a herb to her medicine; get the dregs before they are thrown out [doc, eun, v]
- .8 Hầu bệnh — nights at the sickbed cost nights with the Emperor [th, emp, v, maid]
- .9 Bệnh trở nặng — tuyết liên within ten days from Ngự dược khố or a merchant [th, doc, v, eun]
- .10 Hồi phục hay băng hà — the night that decides, read from her earlier choices (context-driven, OD:L1253) [th, doc, v, emp]
- .11 Chỗ dựa mới — who she becomes once the crisis is over. Endings: Cô mẫu khỏe lại, trọng thưởng ngươi / Nối người của cô mẫu / Đức Thọ cung tan đàn; rare: Vạch mặt kẻ dâng thuốc độc [th, doc, v, hh]
**ch_ho · Hai người cháu**
- .4 Hai người cháu — another of the Thái hậu's kin came first; one chair beside the Thái hậu [v]
- .5 Ai được gọi trước — whose name the Thái hậu calls first each morning [th, v, maid]
- .6 Quà mừng thọ — the birthday gift contest, one month away [th, v, maid]
- .7 Lời gièm — a rumour that she speaks ill of the Thái hậu; trace it to {v}'s palace [v, th, maid]
- .8 Nhà ngoại — the clan elders meet at the phủ Quốc cữu; she can reach them only by letter [th, maid, emp, v]
- .9 Kẻ thù chung — the censors impeach the Thái hậu's kin; stand with {v} or let her house take it [emp, v, hh]
- .10 Chiếc ghế — the Thái hậu will give her private seal to one niece after Phật đản [th, v]
- .11 Họ ngoại — who heads the clan in the palace. Endings: Người đứng đầu họ ngoại / Hai người cháu chia ghế / {v} đứng đầu họ ngoại; rare: Hai người cháu cùng cầm họ ngoại [th, v, maid]
**ch_bi · Bí mật năm xưa**
- .4 Bí mật năm xưa — an old letter: the Thái hậu once destroyed a consort to keep the throne [th]
- .5 Người trình thư — find who brought the copy of the letter into the palace [eun, v, th, emp]
- .6 Người nhà họ Lâm — Lâm Khải, nephew of the dead consort, wants her name back before Thanh minh or goes to the Ngự sử đài [maid, v, th]
- .7 Cô mẫu hỏi — the Thái hậu tells her own story of that night and wants every copy [th, v, eun]
- .8 Thư bị đánh cắp — the brocade box with the copy and Đàm ma ma's testimony is stolen [maid, eun, v, hh]
- .9 Bảo vệ hay dùng — protect the Thái hậu, use the secret, or give the Lâm house justice [emp, th, v]
- .10 Đêm Thanh minh — the deadline night; the letter burns or reaches the Emperor [emp, th, v, maid, eun]
- .11 Bí mật được chôn — the old story gets its end. Endings: Bí mật được chôn, cô mẫu mang ơn / Bí mật thành quyền của ngươi / Bí mật ra ánh sáng; rare: Họ Lâm phục danh, hai nhà giải oán [th, emp, v]

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

### 4.10 NPC men roads — LIVE (main, dev/build/jnroadm.js on the jnroad.js engine; owner OD:L1243/L1252/L1264/L1386)
Status: BUILT, written here as it is on main (18/11, Q0 docs fix; canon check of these 20 templates by Foreman B pending — see FOREMAN_E_STATUS FOR MAIN). Code is the source; if this list and `NRM` in jnroadm.js differ, the code wins and this section is corrected in place.
Shape: 20 templates × 8 chapters (.4–.11, `BAL.road.first`..`last`). Row = [title, cast key, win tag, lose tag]; .11 row adds a middle tag. Chapter tags are story words only: they never claim a rank, death, dismissal or heir (real state stays with its own systems).
Who gets a road (real people only, `nrMenL`): S.men Thị vệ / Thái y / Vương gia / Nhạc sư / Sứ thần / Họa sư (Thanh mai trúc mã m96 excluded — his story owns him); court men tq, ksp, ty, ped; every staff eunuch; the five house heads (not the player's own father); sons of NPC consorts old enough (`BAL.nroad.men.kidAge`; the player's own children are her story, ch12). The Emperor is not here (jreign).
Engine: same as the women (jnroad.js): due chapter → his odds (BAL.nroad base + his stat / div + Lợi thế after a won chapter + help hồi); gain AND loss on his real fields via `BAL.nroad.men.fx` (S.men loyal, court men af, house pow + j55 relations, princes fond/tal/hp, staff eunuch mp/loyal). A real rival is kept for the whole road and recast and told when gone. Help hồi = the 8 nr_* j72 follow-ups. Test stat per template: `sk` (loyal / sk / tal); court men use `BAL.nroad.men.st`. `off_thong` is the one allied road (a win binds the two houses, a loss splits them). Numbers: BAL.nroad.men only (ONE CORE).
Cast keys: gd guard, eun eunuch, bac silver, man a real man, off an official/house, emp the Emperor, th Thái hậu, hh Hoàng hậu, v a consort, envoy an envoy, mis his master, mom the mother consort.


**Thị vệ (S.men role Thị vệ)**
- `gd_tl` «Đường lên Thống lĩnh» (test stat loyal): .4 Ca trực đêm mưa · .5 Kẻ đứng trên · .6 Đồng liêu ghen · .7 Bạc lót tay · .8 Hộ giá đi săn · .9 Kỳ khảo võ · .10 Lời tiến cử · .11 Đường lên Thống lĩnh
- `gd_tinh` «Mối tình bên cổng cung» (test stat loyal): .4 Chiếc khăn rơi · .5 Lời hẹn dưới cây hòe · .6 Kẻ dòm ngó · .7 Thư tay · .8 Lệnh đổi ca · .9 Tin đồn trong cung · .10 Chọn giữa tình và chức · .11 Mối tình bên cổng cung
- `gd_kho` «Án mất trộm ngự khố» (test stat loyal): .4 Đêm ngự khố mất đồ · .5 Dấu chân bên tường · .6 Kẻ tình nghi · .7 Thận Hình ti tra hỏi · .8 Món đồ trở lại · .9 Kẻ đứng sau · .10 Trình án · .11 Án mất trộm ngự khố

**Thái y (S.men + court Thái y)**
- `ty_thu` «Y thư thất truyền» (test stat loyal): .4 Cuốn sách nát · .5 Phương thuốc lạ · .6 Thử thuốc · .7 Đồng liêu dị nghị · .8 Bệnh dịch ngoài thành · .9 Tranh công · .10 Dâng sách · .11 Y thư thất truyền
- `ty_tra` «Đơn thuốc bị tráo» (test stat loyal): .4 Thang thuốc khác màu · .5 Ai chạm vào thuốc · .6 Lời đe dọa · .7 Bệnh nhân trở nặng · .8 Thái y viện xét việc · .9 Chứng cứ · .10 Trước mặt Hoàng hậu · .11 Đơn thuốc bị tráo

**Vương gia (S.men)**
- `vg_dat` «Đất phong» (test stat loyal): .4 Chiếu ban đất · .5 Mùa màng · .6 Quan địa phương · .7 Lời gièm vào kinh · .8 Thuế đất · .9 Thái hậu hỏi han · .10 Dâng biểu · .11 Đất phong
- `vg_bien` «Lòng người ngoài biên» (test stat loyal): .4 Tin biên ải · .5 Quân lương · .6 Tướng dưới quyền · .7 Sứ giặc đến · .8 Trận đầu · .9 Lời đồn mưu phản · .10 Về kinh · .11 Lòng người ngoài biên

**Nhạc sư (S.men)**
- `ns_tho` «Khúc nhạc mừng thọ» (test stat loyal): .4 Lệnh soạn khúc · .5 Bản phổ cũ · .6 Đàn bị hỏng · .7 Nhạc công bỏ đi · .8 Tập trước Thái hậu · .9 Kẻ chép trộm · .10 Đêm trước tiệc thọ · .11 Khúc nhạc mừng thọ

**Sứ thần (S.men)**
- `st_uoc` «Điều ước hai nước» (test stat loyal): .4 Quốc thư · .5 Lễ bộ tiếp sứ · .6 Điều khoản đầu · .7 Quà dâng Thái hậu · .8 Tai mắt quanh sứ quán · .9 Hội đàm · .10 Đóng ấn · .11 Điều ước hai nước

**Họa sư (S.men)**
- `hs_hoa` «Bức họa mỹ nhân» (test stat loyal): .4 Lệnh vẽ chân dung · .5 Phi tần ngồi họa · .6 Bạc lót tay · .7 Bức họa bị đổi · .8 Hoàng thượng xem tranh · .9 Lời vu · .10 Bức họa cuối · .11 Bức họa mỹ nhân

**Tổng quản (court tq)**
- `tq_an` «Ấn Tổng quản» (test stat loyal): .4 Ấn bị dời chỗ · .5 Kẻ nhòm ngó ghế · .6 Sổ chi tiêu · .7 Phe phi tần · .8 Hoàng thượng hỏi tội · .9 Thái hậu ra mặt · .10 Người nối tay · .11 Ấn Tổng quản
- `tq_que` «Đường về quê» (test stat loyal): .4 Thư từ quê · .5 Xin phép về thăm · .6 Gửi bạc về quê · .7 Họ hàng tìm đến · .8 Người cũ trong làng · .9 Lời đồn ăn bớt · .10 Ngôi mộ tổ · .11 Đường về quê

**Kính sự phòng (court ksp)**
- `ksp_so` «Sổ ghi Kính sự phòng» (test stat loyal): .4 Một dòng bị tẩy · .5 Thẻ bài lật sai · .6 Phi tần đút lót · .7 Hoàng hậu xem sổ · .8 Kẻ chép sổ · .9 Tin có thai · .10 Sổ được trình · .11 Sổ ghi Kính sự phòng

**Tiểu thái giám (staff eunuchs; court Nội vụ phủ ped uses this kind too)**
- `eun_len` «Từ tiểu thái giám đi lên» (test stat loyal): .4 Việc nặng đầu tiên · .5 Sư phụ · .6 Đồng liêu chèn ép · .7 Việc kín của chủ · .8 Bạc đầu tiên · .9 Được giao việc lớn · .10 Lời tiến cử · .11 Từ tiểu thái giám đi lên

**The five house heads (j55; the player's own father excluded)**
- `off_ghe` «Giữ ghế trong triều» (test stat sk): .4 Tờ biểu đầu năm · .5 Kẻ dòm ghế · .6 Việc trong bộ · .7 Ngự sử xét sổ · .8 Lòng Hoàng thượng · .9 Môn sinh · .10 Buổi chầu lớn · .11 Giữ ghế trong triều
- `off_dan` «Lời đàn hặc» (test stat sk): .4 Tấu đàn hặc · .5 Ngự sử tra xét · .6 Đồng minh trong triều · .7 Chứng cứ · .8 Lời trong hậu cung · .9 Đại Lý tự xét · .10 Hoàng thượng định đoạt · .11 Lời đàn hặc
- `off_thong` «Thông gia với phủ khác» (test stat sk, allied road): .4 Lời ngỏ · .5 Xem tuổi · .6 Sính lễ · .7 Kẻ chen ngang · .8 Hoàng thượng hỏi đến · .9 Lời đồn trong kinh · .10 Ngày cưới · .11 Thông gia với phủ khác

**Sons of NPC consorts, age >= BAL.nroad.men.kidAge**
- `hz_hoc` «Thái phó và học vấn» (test stat tal): .4 Ngày đầu ở Thượng thư phòng · .5 Kinh sử · .6 Đồng môn · .7 Phụ hoàng khảo bài · .8 Cưỡi ngựa bắn cung · .9 Bài văn đầu tay · .10 Kỳ khảo cuối · .11 Thái phó và học vấn
- `hz_le` «Lễ trưởng thành» (test stat tal): .4 Lễ đội mũ · .5 Phủ đệ đầu tiên · .6 Người hầu cận · .7 Ra mắt tông thân · .8 Việc triều đầu tiên · .9 Lời khuyên của mẫu phi · .10 Phụ hoàng ban thưởng · .11 Lễ trưởng thành
- `hz_tran` «Ra trận lập công» (test stat tal): .4 Xin ra trận · .5 Tướng già dạy việc · .6 Quân lương · .7 Trận đầu · .8 Thư mẫu phi · .9 Công và tội · .10 Khải hoàn · .11 Ra trận lập công

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
- B2 places (jrd_nc/td/ch): Hội Đồng quán (foreign envoys' and merchants' lodging), cửa Chính Dương, cửa Tây Hoa, cửa Đông Hoa, vườn Thượng Lâm,
  hồ Thái Dịch, Hồng Lô tự (office for foreign envoys), Thượng tứ viện (imperial stables), Thượng y cục, Ngự thiện phòng, Ngự dược phòng,
  Ngự dược khố, Phụng Tiên điện (ancestor rite, also j97), Thọ Khang cung, kho Nội các (archive), Thận hình ty, Ngự sử đài, phủ Quốc cữu
  (ch: her father's house), chùa Hộ Quốc (also j67); outside: Giang Nam, Lĩnh Nam (exile).
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
| lão Kha | nc_gian (+bd_ngua) | {land} merchant at Hội Đồng quán, her go-between | merchant |
| {land} groom of Thượng tứ viện | nc_gian .5 (Bắc Địch opening) | carries the first silk order | eunuch |
| Hội Đồng quán interpreter | nc_su .6 | Đại Hy interpreter paid by {v}'s house | official |
| ma ma giáo tập of Đức Thọ cung | nc_tuc .5, .9 | teaches her palace rites (unnamed) | mama |
| {v}'s cousin (Thị lang Lễ bộ, later Phó tướng) | nc_vuong .5–.9 | rival's relative, never named | official |
| old border general | nc_vuong .8 | the other choice of commander (unnamed) | S.men |
| Ba Đồ | bd_san .4–.11 (the {land} groom of Thượng tứ viện, now named) | Bắc Địch groom, keeps her mare | eunuch |
| Tổng quản Thượng tứ viện | bd_san .5–.11 | chief of the imperial stables (unnamed) | eunuch |
| Tuyết Câu (mare) | bd_san .4–.11 | her white mare, lives in the Thượng tứ viện stable (an animal, law 6c) | none |
| Hô Diên Liệt (thúc phụ) | bd_soi .4–.11 | {pv}'s brother, claims the golden tent; steppe → border | S.men envoy face |
| Ô Lặc (em trai) | bd_soi .4–.11 | her young brother, heir; steppe | S.men |
| Thát Mộc | bd_soi .6–.11 | guard of the uncle's embassy, the knife | S.men |
| A Sử Na Cát | bd_tuyet .4–.11 | old chief of the border tribe | elder servant |
| Hộ bộ Lang trung | bd_tuyet .5–.6 | keeps the Thường Bình granary (unnamed) | official |
| Thác Bạt Phong | bd_hen .4–.11 | her betrothed from the steppe, captain of the embassy guard | S.men |
| Tá Bá Kim Thành | pt_su .4–.11, pt_hai .4/.11 | Khiển Đường đại sứ (envoy chief) of Phù Tang [D]; sea → capital (S.men, haunt thu) → home | S.men envoy face |
| Cát Thành Trọng Lữ | pt_su .9–.11 | lưu học sinh (student-scholar, the Nakamaro shape) [D]; capital | S.men |
| Tiểu Ngọc | pt_hai .4–.11 | her nurse-maid from Phù Tang, on the 4th ship (sea → Minh Châu → capital, or dead) | maid pool |
| Thân Lão | pt_hai .6–.11 | the ship's kiêng-keeper («trì suy» custom) [D]; Minh Châu jail / freed / sent home | elder servant |
| Nham Lão | pt_hai .5–.9 | old helmsman of the 4th ship [D] | elder servant |
| Kim Hựu Thành | pt_hai .7–.11, pt_dang .4–.11 | Tân La sea merchant [D]; Minh Châu / capital | merchant |
| Ô Cửu | pt_hai .8–.11, pt_dang .4–.11 | chief of the giặc biển Đông Hải [D]; sea / ngục / dead | S.men |
| Tịnh Viên | pt_tang .4–.11 | Phù Tang monk inviting a master [D] (writer 2) | S.men monk |
| Pháp sư Trí Viễn | pt_tang .4–.11 | Đại Hy master monk, the Ganjin shape [D] (writer 2) | elder servant |
| Hồng Lư tự khanh | pt_su .5–.8, pt_hai .10 | chief of the court office for envoys (unnamed) | official |
| Minh Châu thứ sử | pt_hai .6–.9, pt_dang | prefect of the port (unnamed) | official |
| Giang Nam abbot (sư trụ trì) | td_an .6 | keeps lão thái giám Vương's written deposition | elder servant |
| seal carver Lý | td_an .10 | carved the forged Binh bộ seal | merchant |
| Nội các archive eunuch | td_an .5 | keeper of the archive | eunuch |
| Trịnh phu nhân | td_ke .8 | widow of a Thị lang {n1} ruined | mama |
| money-house owner (tiền trang) | td_ke .5 | holds the bribe trail outside the west gate | merchant |
| censor, her father's old student | td_ke, td_tha .11 | carries her memorials at court (from j67) | official |
| her youngest brother «Tiểu Thạch» | td_song | the family record's youngest son, never given a real name | S.men |
| bracelet merchant | td_song | dad's old acquaintance, carries letters | merchant |
| deputy general (later Tổng binh) | td_song | the officer the brother saved, his protector | official |
| old Lễ bộ official | td_song .7, .11 | dad's colleague, knows the face | official |
| Binh bộ Lang trung | td_song .8 | {foed}'s client who signs the order | official |
| Nội vụ phủ census clerk | td_song .9 | writes the new household paper | eunuch |
| {foe}'s mother (phu nhân nhà {foed}) | td_tha .5–.11 | bargains; stands in when {foe} is gone | mama |
| Thượng y cục seamstress | td_tha .5 | sewed the curse doll | maid |
| family friend (người thế giao) | td_tha .10 | changed her name in the selection roll | elder servant |
| biểu ca (Thái hậu's nephew) | ch_co .7 | Cửu môn đề đốc candidate, offstage | none |
| Càn Ninh cung spy mama / old Đức Thọ cung mama | ch_co, ch_benh, ch_ho | the Thái hậu's people | mama |
| Nội vụ phủ ledger eunuch | ch_co .5–.6 | the Thái hậu's man in Nội vụ phủ | eunuch |
| lương y họ Tôn | ch_benh .4–.11 | outside physician (from j67) | official (thái y face) |
| Viện phán of Thái y viện | ch_benh .5–.10 | head physician | official (thái y face) |
| decoction eunuch of Ngự dược phòng | ch_benh .7 | adds the herb | eunuch |
| {v}'s uncle, East-gate herb shop owner | ch_benh .7–.11 | poison supplier, named only | none |
| Lâm Khải | ch_bi | nephew of the dead consort, Biên tu Hàn lâm viện | official |
| Lâm thị | ch_bi | the late emperor's consort who died (named only) | none |
| Đàm ma ma | ch_bi | old cung nữ of Thọ Khang cung (from .4) | mama |
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
- 11/18/2026 Q0 docs fix: §0 NPC roads row → LIVE; §4.10 written (the 20 men templates as on main, jnroadm.js).
- 11/16/2026 created (opus lead of Foreman B): 288-chapter catalogue, code-key fix (cn/cnv), data shape, canon rules, split.
- 11/16/2026 tt built (28 chapters); §4.1 rewritten to the built chapters (the .4 arcs already close their first conflict); tm96 = side story.
- 11/16/2026 B2 built nc (+bd aliases), td, ch (84 chapters); §4.5–4.7 rewritten to the built chapters.
- 11/16/2026 B3: thd + cnv built (56 chapters, §4.8/§4.9 rewritten to the built chapters); endgame noi14/hau14/ke14 (jend14.js); §8.4 decided; §5.4 rows added.

- 11/16/2026 B1 built dtq / muoi / cn (84 chapters + 12 rare finales, review/road-b1); §4.2–4.4 rewritten to the built chapters.

- 11/18/2026 E14 PLAN: §4.5b bd's own 4 roads (bd_san, bd_soi, bd_tuyet, bd_hen), legacy bd aliases kept for old saves, §5.4 rows.

## 8. Open questions for Foreman B / main (not for the owner unless main decides so)
1. DONE: Thanh mai trúc mã is a side story in full-road lives (jroad.js; BAL.road.tm).
4. DONE (B3): cnv keeps the 8-chapter road; the rise happens inside the roads (cnv_mat .8 can raise her; the other roads raise
   «Hoàng thượng để ý»); a cnv still a maid when the road ends plays len14 as chapter 12 (jend14.js). See §4.9 and reports/road-b3.md.
2. tt_mat .6 rank cap value goes in BAL.road (not typed); reversible.
3. HISTORY CHECK items (tt_oan .9, dtq_vu .9, dtq_binh .7, muoi_lau .7, td_an .10, thd_sach .9) → one history/drama expert pass (OD:L1327)
   before those chapters' text is final; structure can be built first.
   B2 adds: nc_gian (Hội Đồng quán lodging, Lễ bộ lộ dẫn, Đại Lý tự spy case, night search of a consort's palace); nc_su (kowtow of a prince-envoy,
   Thượng Lâm offence, iron ban, envoy seating); nc_tuc (.8 consort behind a screen at court, .10 nghĩa nữ into a noble genealogy, .7 altar search);
   nc_vuong (consort behind a screen with envoys, Thân vương title for the loser); td_an .10 Tam ty retrial of the late emperor's case, .8 petition
   rank rule; td_ke .9–.10 forged search order, censor's memorial; td_song (restoring a convict's son's surname, pardoned son in the guard, census);
   td_tha (phản tọa vs tự thú, autumn assizes, witness from lãnh cung, khi quân, vu cổ inquiry); ch_co (Cửu môn đề đốc, yếm thắng doll, private seal);
   ch_benh (outside physician, stand-in at the ancestor rite, mourning rules, seal after death); ch_ho (clan meeting, ngoại thích impeachment);
   ch_bi (a late emperor's consort ban chết, Hàn lâm cart in the inner palace, censors petitioned against the Thái hậu).
