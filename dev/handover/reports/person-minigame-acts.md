# person-minigame-acts — «Cùng chơi» + «Thách đấu» with any real person (E22, lead opus)

STATUS: PLAN (step 1) — waiting for FOREMAN E #13 law check before build.
depth 4 · START_CTX ~4 % of 1M window (rollover at ~29 %, ceiling 60 %) · session_01DgYSWpAKRbAKG2EVDQLKeL
PRIORITY #1 CHECK ('thách đấu|cùng chơi|person-minigame|startContest'): OD 2 | ledger 0 | claims 1 (this row) | main 15 | review/* 0 | archive 0.
Main hits re-read by me: j82 startContest/playArt (1-vs-many contest + result kit), jmgt mgTier/mgSet/mgNpcRaw (occasion × rank × art level → board gap d; law 5 already lives here), jmgcal (owner's calibrated NPC hand band, BAL.ag.mg2), jts tsSummonGo/tsSummonMe (Emperor summons: receiver choice jrcv rcvPick + her Vâng chỉ / Cáo bệnh card), j2 talkOpts (person popup on Dư đồ), j15 rvCard «Gặp mặt» group (Hậu cung tab), j21 goSee/seeBtn/visitBtn/inviteBtn (walk to a person), jstagehere actMove/__actPend (act = place, pending after the result card), jagacts3 agReg/agRunReg/P3T (one card builder for her and NPC↔NPC), jrcv rcvPick/rcvWord (receiver choice), jcoopworld ASK/PEND.thInv/invHer (co-op ask card between the two players), jmem memAdd (remembered deeds). Nothing person-to-person exists → build, reusing all of the above.

## §EXPERT (step 0, law 8) — how court ladies invite / challenge each other

Sources: Ming/Qing palace life (cung quy, cung từ), Song tea/incense contests, palace dramas (Chân Hoàn truyện, Diên Hi công lược, Như Ý truyện), palace sim games.
1. PASTIMES that were real: cờ vây (and tượng kỳ), cổ cầm / tỳ bà duets, liên cú (linking verse), đối câu, vẽ / thư pháp, cắm hoa, thêu, đầu hồ (pitch-pot, a classic ladies' game with a forfeit cup), đấu trà / đấu hương (Song: judged side by side), đá cầu, đánh đu. All already exist as KG82_KIND boards except đá cầu/đánh đu (not needed).
2. «CÙNG CHƠI» is the polite form: «mời tỷ tỷ cùng thưởng cầm», «cùng muội đánh một ván cờ giải khuây». It builds closeness; the guest who plays well is praised, the host who invites shows grace. No stake. The person's OWN gift decides the pastime (you invite a cầm player to play cầm). A higher lady may simply «truyền» a lower one to keep her company — refusing a superior is a slight (cost: her liking), refusing a peer or a lower one costs little.
3. «THÁCH ĐẤU» is a duel of face: «so tài», «đánh cược». Stakes seen in history/drama: a hairpin / jade bracelet / painting / bolt of silk (real objects change hands), a cup of forfeit wine (đầu hồ), a small sum of silver (frowned upon — palace rule bans gambling; small «tiền cược» only), or pure face (the loser bows / concedes before witnesses). The challenger names the game; the challenged may decline.
4. RANK ETIQUETTE: a lower lady openly challenging a higher one is bold — if she wins, the superior LOSES FACE and resents her (oán); if she loses, she is mocked as «không biết lượng sức». A higher lady challenging a lower one who declines = the lower «không nể mặt» (liking drops). Wise lower ladies often «nhường» (lose on purpose) to win a patron — a known drama move.
5. WITNESSES make shame: a duel at a public place (Ngự hoa viên, a banquet) spreads; a duel in a private palace stays between the two. Losing a duel in front of others = Danh loss; winning = Danh gain.
6. LADIES CHALLENGE EACH OTHER without the player: rivals duel over a coveted item, friends play together; results are gossip («nghe nói Lệ tần thua Trinh quý nhân một cây trâm ngọc»).
→ Design rules taken from this: own-art pick; rank gap changes who may refuse freely and how much face is lost; stake = a real object OR silver OR face, all of equal value; «Nhường» exists as a real choice; public place = Danh effect, private = none; NPCs do all of it to her and to each other.

## §PLAN (step 1)

### A. The two acts (one core, file jpm.js NEW? → no: jpm.js exists; new file **jpma.js**, numbers **BAL.pm**)

| act | who can start | place | cost (BAL.pm) | gain / loss | odds source | receiver choice |
|---|---|---|---|---|---|---|
| «Cùng chơi» (art k) | her → any living consort / Hoàng hậu / co-op friend she is WITH; NPC → her / NPC | where both stand (Dư đồ meeting), or her palace if she invited the person («Mời đến cung ta», existing) | khắc `pm.play.kc` (1) for both | gain-only (law 3): Thiện cảm both ways `pm.play.aff[tier by raw]` (receiver quý asker, asker quý receiver), small art practice `pm.play.xp` (the existing addArt fraction); repeats in one month give less (the P3T chat-factor idiom, `p3ChatF`) | no win/lose; the minigame result (her playArt board, occ `pm`) sets the size of the gain; NPC side = `mgNpcRaw(k,v,{occ:"pm"})` | PROP: receiver answers Nhận lời / Từ chối (rcvPick kind `pm`, jrcv weights); refusing a SUPERIOR's invite: receiver's liking of the refuser −`pm.refuse.up`; refusing a peer/lower: −`pm.refuse.peer` (small) — both answers have a gain and a loss (accept = khắc + gain; refuse = keep khắc, lose liking) |
| «Thách đấu» (art k, stake s) | same | same; public places (vuon, thu, festival places: `pm.pub` list) add witnesses | khắc `pm.duel.kc` (1) + the stake put up by BOTH | winner takes the other's stake (real transfer); Danh ±`pm.duel.danh` only at a public place; rank shame: a higher-rank loser loses extra Danh `pm.duel.shame·gap` and gains oán toward the winner `pm.duel.oan`; a lower-rank loser loses nothing extra (law 3: both sides gain-or-lose) | 1-vs-1 contest: startContest({rivals:[v], occ:"pm"}) → same talent+prep+skill formula as Hội thi; her board = mgSet(k,{occ:"pm"}), NPC = mgNpcRaw (owner-calibrated mg2 hand) ; the card shows her chance as the ladder word (j71 contest odds idiom, no %) | PROP with stake: Nhận lời / Từ chối (as above) / for a superior opponent the extra answer «Nhường» (see C) |

Art pick (both acts): the list = arts the RECEIVER knows (lv ≥ 1, mapped by KG82_PLAIN cam→dan, ky→co, thi→tho, hoa→ve, vu→mua, y→huong, nau→banh, theu→theu) ∪ «đầu hồ» (anyone can play). The asker picks; each row shows both levels and the ladder word. Kit: the existing KIT §13 option rows (kitOpt / pbtn) inside the person popup's sub-step — no new part expected (if the picker needs a «two-portrait vs» row, STOP → KIT_REQUESTS).

### B. Stakes (law 2 equal value) — the asker picks ONE kind; the value is the same for all three

| stake kind | what changes hands | value rule |
|---|---|---|
| Bạc | `pm.stake.bac[rankTier]` from loser to winner (both must hold it) | the base unit V(tier) |
| Món đồ | one item each side puts up, price band `IT.pr` within V(tier)·[1−`pm.stake.band`, 1+band]; the loser's item moves into the winner's chest (law 6c: owned, traceable, `from` ledger as gifts) | same V(tier) by price |
| Thể diện (Danh) | loser Danh −d, winner Danh +d, d = V(tier) / `pm.val.danhBac` (one exchange rate in BAL, measured) | same V(tier) via the rate |
The equal-value measure (new dev/measure/pm-equal.js) checks expected value of the three kinds within `pm.eqTol` and of the three answers (Nhận / Từ chối / Nhường).
Rank tier = the HIGHER rank of the two (stakes rise with rank — law 5 side). Old saves: no stake kept between days.

### C. «Nhường» (drama move, inside the same act — not a new feature)
When the opponent outranks her (or for an NPC, outranks the NPC): the challenged side may answer «Nhường»: she plays no game, loses the stake, the superior's liking +`pm.yield.aff` and the superior's oán toward her −`pm.yield.oan`. Equal value with Nhận/Từ chối checked by the measure. (If foreman says this is a new feature under law 18 → I drop it to PARKING_LOT.)

### D. Where the buttons are (go-in-person rule OD 18/11 ~19:55Z, law-binding)

| entry | behaviour |
|---|---|
| Dư đồ person popup (j2 talkOpts rival + Hoàng hậu branch; co-op friend = rival entry coop:true) | two rows «Cùng chơi» / «Thách đấu» (lock rows with the reason: same palace? no — same palace IS allowed for pastimes, it is not «lấy lòng/ra tay» … see Q1) → art pick → stake pick → receiver answer → game → result kit |
| Hậu cung tab, rvCard «Gặp mặt» group | two pbtn rows. Together → opens the same popup step. Not together + location known → goSee(v) walk (existing travel khắc, walkBlock/walkLate reasons), then on arrival the popup opens on that step (pending after arrival, the jstagehere __actPend idiom). Location unknown → disabled with «chưa rõ nàng ở đâu» (scoutBtn / visitBtn already sit in the same group). Never remote. |
| Her invite («Mời đến cung ta», existing) | when the guest arrives at her palace, the two acts are in the guest's popup at home (place = where she is — the invite exception in OD 18/11 ~19:55Z). |
| Emperor | NOT added: his summons (jts Ý 3) stays his own act; one-core guard: tsSummonGo keeps working untouched. Q2: fold tsSummonKind/Odds into BAL.pm later? I propose NO for this branch (do not break it). |

### E. NPCs (law 1 + 6b) — agent day plan, host only

| direction | how | schedule / frequency |
|---|---|---|
| NPC → NPC | new agReg("consort","pmplay"/"pmduel") providers (jagacts3 pattern): Cùng chơi under need `ally` (target picked by liking, mindPickBy), Thách đấu under need `spite`/`face` (target = a rival she resents or envies, item she covets); agAt(t,kh) puts both at one place in that khắc; the receiver answers by rcvPick (same 3 answers); game = mgNpcRaw both sides with each one's own rank/level (occ pm); stake moves; memAdd (deed pmWin/pmLose/pmPlay) so it is remembered; log line only if she knows them (knows(v) / eyes) | per NPC at most one pm act per `pm.npc.gapW` weeks; weight `pm.npc.g` inside the day plan (never always-best) |
| NPC → her | same providers with t === S: the NPC walks to where she is (agAt), she gets a PEND card «<tên> mời ngươi cùng chơi <môn>» / «… thách ngươi <môn>, cược <s>»: Nhận lời (she plays the board) / Từ chối (cost per C) / Nhường (if superior); when she is not reachable that khắc the invite waits for the next buổi like p3InvQ | the same gap; at most `pm.me.perW` per week aimed at her |
| her → NPC | the acts above; the receiver NPC picks via rcvPick | her own khắc |

### F. Co-op (role parity, OD:L397 same rules with hảo hữu)
The friend is a rival entry (coop:true): she sees the same rows. Route both acts through the co-op ASK path (jcoopworld ASK list + part-D PEND.thInv card in the reader's context): the asker plays her board when she sends (raw rides in pp), the friend gets the card Nhận lời / Từ chối / Nhường, on Nhận she plays HER board on her own device; the host computes the 1-vs-1 result with both raws and applies the stake to both S (resApply path). Host and guest can both start and receive (two directions tested). If the friend is offline past the buổi, the ask expires (no stake moves). The friend serving as cung nữ: acts hidden (servants do not duel consorts) — Q3.

### G. Law 5 (harder as she climbs)
New occasion `BAL.mgTier.occ.pm = [base, perRank]` (proposal [1, .5] = like Hội thi) → her board gap d rises with HER rank; NPC opponents of higher rank carry higher art levels and the mg2 hand; stakes rise with the higher rank (B). Measure dev/measure/pm-rank.js: her expected win chance vs a same-level peer at rank 0..7 must fall; stake value must rise.

### H. Old saves
New fields optional: `S.pm = {m:{<id>:count this month}, q:[pending NPC invites]}`, `v.pmW` (last week used). Absent → defaults; no migration. Loading a pre-branch save = test.

### I. Tests before SẴN SÀNG KIỂM
unit both acts solo (her→NPC: accept/refuse/yield; stake moves; item ledger) + co-op host→guest and guest→host · NPC→her + NPC→NPC sim ≥ 10 game days (counts, stakes conserved, memory written) · law-5 measure (rank 0..7) · law-2 equal-value measure (3 stakes, 3 answers) · one-core guard (no number outside BAL.pm; tsSummon untouched) · role-parity test (new keys pmplay/pmduel appear on both sides, OPEN list does not grow) · receiver-choice scan (PROP, SAME) · quickcheck · old-save load · shots Fold 755x1000@2 + iPad 1180x820@2 (popup steps + Hậu cung buttons + result), looked 3×.

### Questions for foreman (only where the owner's words do not decide)
Q1. Same-palace pair: the talk system blocks «lấy lòng / ra tay» inside one palace. I propose pastimes ARE allowed in the same palace (sisters of one palace play together all the time) but Thách đấu stakes still apply. OK?
Q2. Emperor summons stays as is (not folded) — OK?
Q3. Co-op friend serving as cung nữ: no pm acts with consorts (rank etiquette) — OK, or parity says yes?
Q4. «Nhường» answer inside Thách đấu — in scope, or parking lot?
