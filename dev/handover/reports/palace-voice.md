# palace-voice — worker report + handover (branch review/palace-voice)

START_CTX ~6 % of 1M window (get_session read 0; own estimate). Rollover at ~31 %, hard ceiling 60 %.

## Phase A — DONE
- Expert brief (dramas: Chân Hoàn truyện, Như Ý truyện, Diên Hy công lược; Qing harem rule: chủ vị = Tần+ → "bổn cung"/"nương nương") written into dev/kit/VANPHONG.md §2 (overwritten in place): 2.1 narration, 2.2 who-calls-whom table (speaker × listener × mood), 2.3 ritual phrases, 2.4 court speech style (indirect, sweet-barbed, idioms, objects-for-people, mood/relation), 2.5 literary gain/loss wording, 2.6 before/after.
- Note: VANPHONG on the handover branch is older than main; this branch edits main's copy (coordinator syncs).

## Phase B — DONE (e259e5db + follow-ups)
- dev/build/jvoice.js (assembled right after j8): kAddr(speaker, listener, {m, own, close, full}) → {goi, xung, m, ten}; kSay fills {goi}{Goi}{xung}{Xung}{ten}{Ten}; kSpk maps j68/j72 actors; kLine pools with no repeat within BAL.voice.noRepeat tuần (memory S.vl, old saves start empty); kOutcome(kind, ok) court-voice sentence for talk results. Numbers: BAL.voice in jbal2.js.
- Routed through the core: j84 lowRank, j67 TOK67 ({N}/{Nc} servant address, was {xung}) + fill67(s,A,w) speaker tokens, j72 q72Txt (requester A → her), jreign rgTok (beat speaker w), jts tsGoi, jcycle, jinv, jrcp, jtut X, j2/j21/j24/j41/j7/j8/j95/jpet/jveil/jstaff/j4/j96/jne lines.
- Scan dev/test/voice-scan.py (before = --git origin/main):
  | | main | branch |
  |---|---|---|
  | private rank→address helpers outside jvoice | 8 | 0 |
  | quoted lines on jvoice tokens | 6 | 115 |
  | listener-dependent words typed by hand (ngươi, nương nương, ái phi, tỷ tỷ, muội muội, chủ tử, tiểu chủ) | 89 | 32 |
  Remaining 32 are deliberate: cung-nữ road (player is a maid → "ngươi"), interrogations/anger ("Có chuyện gì ngươi giấu ai gia?"), the fixed phrase "chủ tử nhà nô tỳ", letters quoted inside text, Hoàng hậu's fixed "bổn cung". Fixed self words of fixed speakers (trẫm, ai gia, nô tỳ, nô tài) stay typed.
- Test: node dev/test/voice-core.js → PASS (speaker × listener × rank × mood table, kLine window, th-praise 6 tuần distinct).

## Phase C — DONE (ready for review)
- Pools (jvoice kLine; no repeat within BAL.voice.noRepeat = 5 tuần; a dialog rebuilt in the same buổi keeps its line):
  jtoil TOIL_SAY (Thái hậu / Hoàng hậu / Hoàng thượng / phi tần / cả hậu cung reactions to her look — the owner's example — 6+ lines per look and mood),
  toilLit gain/loss line (TOIL_GEST gesture + the unchanged why/numbers), jcycle CY_ASK, j92 WD_SAY dress remarks (NPC → NPC, speaker self word from the core),
  jstaff STAFF_SAY + Giáo tập ma ma, jts TS_WARN maid warning, talk / visit results jvoice kOutcome (court-voice sentence before the plain numbers, j2 talk()).
- Literary gain/loss: numbers, odds words and Tốn/Thành/Hỏng rows unchanged (VANPHONG §4); a court-voice sentence is added in front (VANPHONG §2.5).
- Address detail: bare one-word ranks are called surname + rank ("Từ phi"), VANPHONG §2.2 updated.
- Repetition measured:
  | measure | origin/main | branch |
  |---|---|---|
  | per-situation sim, 59 situations × 30 tuần (dev/test/voice-pool-sim.js): lines identical to one said in the same situation within 5 tuần | 96.7 % (45 situations; toilette lines were one fixed line per look) | 0 % |
  | bot play, quotes repeated in the same dialog within the window (dev/test/voice-rep.js, sensible bot; noisy, sample depends on the life) | 22.7 % (40 steps, 36 tuần) · 35.7 % (60 steps, 8 tuần) | 13.3 % (40 steps) · final build 6.7 % (60 steps, 11 tuần, 15 quotes) |
- Old save: main save → branch deser OK, S.vl created lazily and survives ser/deser; no page errors (dev/test/voice-core.js PASS).
- Shots (scratch, uploaded to CDN review folder img/_review/palace-voice/, 32 webp: before|after × 755|1180 × th-praise, hh-scold, emp-like, rival-jealous, cycle, shop, minister, th-ch1). Looked at each: text fits the kit event frame at both sizes. ("Undefined"/empty picture in shop/minister/ch1/cycle shots is the shot harness pushing a raw PEND object; same on main.) Verdict giver wipes the folder.

## Not done / follow-ups (honest)
- Event-result sentences of j67/j72/jreign quests (rt/rf lines) are one-shot story lines, not recurring; left as written. Emperor/Thái hậu "ngươi" kept where the scene is an interrogation or anger.
- The talk result flavour (kOutcome) is by person kind, not yet by the specific act (thỉnh an vs tặng quà); a later pass could key pools by act.
- No UI/kit change in this branch (text only).

## Phase D — successor session_01UV1Szkk4oz7w3HZvDnHJf1 (owner rules 16/11 ~21:05Z, OD "OWNER on the palace-voice samples")
START_CTX ~5 % of 1M (get_session read 0; own estimate). Rollover at ~30 %, ceiling 60 %. Finished at ~22 %.
Merged origin/main 1aa0edb2 first (assemble.py conflict: kept main's list + jvoice after j8).

1. RANK BAND (rule 1): jvoice `kBand(listener)` → lo (Đáp ứng…Quý nhân) / mid (Tần, Phi) / hi (Quý phi, HQP) / hq (Hoàng hậu), from
   BAL.voice.nuong / hi / hq (jbal2, one core). A pooled line may start with "[lo]", "[mid,hi]"…; kLine says it only to that band
   (untagged = every band; the tag is stripped). Whole group = every kLine pool: toilette reactions (TOIL_BAND: 2–3 lines per band
   per reaction, merged into every look-pool; wrong-band lines tagged, e.g. "nhớ thời mình mới vào cung" → [lo] only, "ai mới là chủ
   lục cung" → never to the Empress), talk outcomes OUT (th/hh/emp per band), Giáo tập ma ma (newcomer lessons → [lo]; mid/hi/hq
   lines added), Hoàng hậu news (staff knHi), dress remarks WD_SAY (band of the listener). She as Hoàng hậu is addressed as the
   Empress by all (Hoàng hậu nương nương / thần thiếp).
2. HOÀNG THƯỢNG (rule 2): kAddr emp → consort = "ái phi" if Sủng >= BAL.voice.aiPhi (40) else "nàng"; never a title, never "ngươi"
   (also when she is Hoàng hậu; an NPC Hoàng hậu stays "Hoàng hậu"). Emperor reaction lines cut to <= 10 words (21 lines shortened).
   Typed emperor quotes in events with w:"emp" (j67 ×2, j96 ×1) now use {goi}. Left: 9 emperor quotes in j67/j97 rt/rf/story lines
   still type "nàng" (allowed word; their renderer has no emperor speaker for tokens).
3. TWO FORMS, ONE FUNCTION (rule 3): jvoice `kGL(short, lit)` / `kLitLog(seq0, lit)` wrap the literary part in span.klit; `kShort`
   drops it. Result card #rtoast (j63 kaSentence), kitLine pill, popWhy use the short form; Sổ ghi, TIN, Tuần lục, event panels the
   long one. Wired: talk results (j2 talk: kOutcome now also in the Sổ ghi line), toilette reactions (gesture drawn once: panel + Sổ ghi).
   VANPHONG §2.2 / §2.5 overwritten in place.
4. CO-OP: kLine `o.shared` = seed-rotation by week+buổi (no random, no personal memory) → both seats show the same line for a shared
   line; used for remarks on NPCs (WD_SAY). Personal reactions stay personal.
5. NEXT STEP done (part): personality voice TOIL_TRAIT (rival reactions per trait, 6 traits) + `kHabit(v)` signature habit per
   consort (fixed from her id, co-op identical, shown in long form every other tuần).

Tests (all on b0ba1553 / build 39a4549e):
- node dev/test/voice-band.js → PASS (static: no band-only words in untagged lines, emperor lines <= 10 words; runtime 2736 lines
  over 4 bands × 12 tuần × 6 looks: no wrong-band line, no tag leak, emperor never "ngươi"; two forms check).
- node dev/test/voice-core.js → PASS (updated: emperor nàng/ái phi; window test fixed: the old "6 distinct in 6 tuần" was flaky,
  gap = window lets the 6th equal the 1st).
- node dev/test/voice-pool-sim.js <url> 30 → 59 situations, 1770 lines, repeats within 5 tuần 0 %.
- quickcheck / coop-e2e: see below.

### 10 sample lines per rank band (for the owner)
--- lo (720 lines checked)
1. Thái hậu khen: “Phận còn nhỏ mà biết giữ mình, ai gia ghi nhớ.”
2. Thái hậu chê dung nhan: “Phấn dày như tường vôi. Ngươi vào cung để hầu hạ, đâu phải để lên sân khấu.”
3. Hoàng thượng ưng ý: “Trẫm sao giờ mới thấy nàng?”
4. Hoàng thượng không vừa mắt: “Trông nàng mệt quá.”
5. Hoàng hậu khen: “Giản dị mà thanh nhã, bổn cung rất thích.”
6. Hoàng hậu chê dung nhan: “Thường tại phẩm vị còn thấp, càng phải cẩn thận từng chút.”
7. Phi tần ghen: “Muội muội đẹp quá, bổn cung đứng cạnh mà ngượng.”
8. Phi tần khen giản dị: “Giữa một sân son phấn, chỉ muội muội là thanh tao.” Nàng ta đỏ mặt, nép sau người hầu.
9. Cả hậu cung để ý: Ta vừa bước vào, tiếng trò chuyện chợt ngưng; mấy đôi mắt dán lên trâm ngọc trên tóc ta.
10. Thái hậu khen: “Mới vào cung mà đã hiểu lễ như vậy, Thường tại có tiền đồ.”
--- mid (720 lines checked)
1. Thái hậu khen: “Đoan trang mà không phô trương, mới ra dáng người của hoàng gia.”
2. Thái hậu chê dung nhan: “Phấn dày như tường vôi. Ôn tần vào cung để hầu hạ, đâu phải để lên sân khấu.”
3. Hoàng thượng ưng ý: “Đẹp như hoa đầu xuân.”
4. Hoàng thượng không vừa mắt: “Như vừa ốm dậy vậy.”
5. Hoàng hậu khen: “Không cần châu ngọc mà vẫn sáng sủa, bổn cung khen thật lòng.”
6. Hoàng hậu chê dung nhan: “Chủ vị mà sơ suất, người ngoài sẽ cười cả cung của Ôn tần.”
7. Phi tần ghen: “Muội muội rực rỡ thế, đứng cạnh muội muội ai cũng thành lá xanh mất.”
8. Phi tần khen giản dị: “Nhã nhặn thế này, bổn cung cũng muốn học theo.” Nàng ta đỏ mặt, nép sau người hầu.
9. Cả hậu cung để ý: Mấy vị nương nương cùng phẩm liếc nhau, cười mà chẳng nói.
10. Thái hậu khen: “Mộc mạc mà đoan chính, đúng là người hiểu phép tiết kiệm của tổ tông.”
--- hi (720 lines checked)
1. Thái hậu khen: “Phẩm phục chỉn chu, cử chỉ khoan thai. Tốt, tốt lắm.”
2. Thái hậu chê dung nhan: “Ở vị trí Quý phi, chỉ đứng sau Hoàng hậu, mà để ai gia phải nhắc chuyện này sao?”
3. Hoàng thượng ưng ý: “Hoa trong ngự uyển cũng chẳng bằng.”
4. Hoàng thượng không vừa mắt: “Sao chẳng điểm chút son? Ái phi không vui sao?”
5. Hoàng hậu khen: “Giản dị mà thanh nhã, bổn cung rất thích.”
6. Hoàng hậu chê dung nhan: “Quý phi hôm nay rực rỡ quá, hoa nở rộ thì e chẳng bền đâu.”
7. Phi tần ghen: “Muội muội rực rỡ thế, đứng cạnh muội muội ai cũng thành lá xanh mất.”
8. Phi tần khen giản dị: “Thanh đạm mà dễ nhìn, muội muội khéo chọn quá.” Nàng ta đỏ mặt, nép sau người hầu.
9. Cả hậu cung để ý: Lúc thỉnh an, mấy chiếc quạt cùng che miệng; tiếng xì xào theo ta ra tận cửa.
10. Thái hậu khen: “Mộc mạc mà đoan chính, đúng là người hiểu phép tiết kiệm của tổ tông.”
--- hq (576 lines checked)
1. Thái hậu khen: “Hôm nay ăn vận đoan trang, thật vừa mắt ai gia.”
2. Thái hậu chê dung nhan: “Mẫu nghi thiên hạ mà thế này, lục cung lấy ai làm gương?”
3. Hoàng thượng ưng ý: “Hôm nay trẫm chỉ thấy ái phi.”
4. Hoàng thượng không vừa mắt: “Sao chẳng điểm chút son? Ái phi không vui sao?”
5. Hoàng thượng (talk result): Hoàng thượng nắm tay ta, chẳng vội buông
6. Hoàng thượng (talk result): Hoàng thượng sai người mang trà ngon nhất ra mời
7. Phi tần ghen: “Hoàng hậu nương nương đẹp quá, thần thiếp đứng cạnh mà ngượng.”
8. Phi tần khen giản dị: “Nhã nhặn thế này, thần thiếp cũng muốn học theo.” Nàng ta đỏ mặt, nép sau người hầu.
9. Cả hậu cung để ý: Lúc thỉnh an, mấy phi tần cứ liếc nhìn y phục của ta rồi thì thầm với nhau.
10. Thái hậu khen: “Biết tiết kiệm là biết giữ phúc. Hoàng hậu cứ thế mà làm.”
