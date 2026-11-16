# palace-voice — worker report + handover (branch review/palace-voice)

START_CTX ~6 % of 1M window (get_session read 0; own estimate). Rollover at ~31 %, hard ceiling 60 %.

## Phase A — DONE
- Expert brief (dramas: Chân Hoàn truyện, Như Ý truyện, Diên Hy công lược; Qing harem rule: chủ vị = Tần+ → "bổn cung"/"nương nương") written into dev/kit/VANPHONG.md §2 (overwritten in place): 2.1 narration, 2.2 who-calls-whom table (speaker × listener × mood), 2.3 ritual phrases, 2.4 court speech style (indirect, sweet-barbed, idioms, objects-for-people, mood/relation), 2.5 literary gain/loss wording, 2.6 before/after.
- Note: VANPHONG on the handover branch is older than main; this branch edits main's copy (coordinator syncs).

## Phase B — in progress
Plan: dev/build/jvoice.js = ONE core kAddr(speaker, listener, {mood, rel}) → {goi, xung}; kSay fills {goi}/{Goi}/{xung}/{Xung}; kLine(key, pool, ctx) = varied pool, no repeat within BAL.voice.noRepeat days. j84 addr() post-fix routed through the core.
Scope scan (before): quoted lines “…” in assembled modules = 414 (j72 111, j71 52, j67 40, jreign 36, j97 28, j96 26, jtoil 25, jstaff 12 …).
