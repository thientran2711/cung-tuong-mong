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

## Phase C — in progress
- Pools (kLine, no repeat): jtoil reactions (TOIL_SAY, 10 situations × look; ≥3–6 lines each) + gain/loss gesture line toilLit (TOIL_GEST); jcycle monthly ask (CY_ASK); j92 dress remarks (WD_SAY, NPC→NPC with speaker self word); jstaff talkLine (STAFF_SAY by Thái hậu / Hoàng hậu standing); talk results (jvoice kOutcome).
- Audit tool dev/test/voice-rep.js <url> [steps] [out.json]: bot plays, records every quote, counts repeats per situation within 6 tuần.
