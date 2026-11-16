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
