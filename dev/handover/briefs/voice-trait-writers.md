PRIORITY #1 CHECK: same as briefs/voice-trait.md (OD 11 | main jvoice.js | review/voice-trait 4ed80a06 part 1 = engine + 5 situations | claims: voice-trait worker RM5y)

# VOICE BY TÍNH TÌNH — line writers (split by situation, ONE job, ONE branch review/voice-trait)
Read first, in full: dev/handover/briefs/voice-trait.md (the job + owner words) and dev/handover/reports/voice-trait.md (part 1: engine kTone/kLine, file dev/build/jtone.js, test dev/test/voice-trait.js, the split table W-A/W-B/W-C).
Split (from the part-1 report):
- W-A (the part-1 worker session_011xDdVRM5yu7W5UoCp4jMmC): kOutcome th/hh/emp + the 6 gmOpts greet lines. Also the FINAL build + report.
- W-B: toil (TOIL_SAY / TRAIT / GEST / SLIP) + wd + staff + cycle + ts + HABIT.
- W-C: events/quests that use kSay + voice-rep audit run ≥10 steps.
Rules for all three (to avoid conflicts on one branch):
- Write your pools in YOUR OWN file: W-A dev/build/jtone.js (owner of it), W-B dev/build/jtone_b.js, W-C dev/build/jtone_c.js; register the new files in dev/build/assemble.py in one line each (W-B/W-C tell W-A the line; W-A adds them).
- Do NOT commit built files (index.html, assets.json, sw.js) — only W-A builds at the end.
- Commit small, `git pull --rebase` before every push to review/voice-trait; never force-push.
- ≥10 lines per trait (8 Tính tình traits) per situation, cổ trang per dev/kit/VANPHONG.md, address via kAddr, no numbers/%; run dev/test/voice-trait.js on your pools.
- When done: send_message W-A (session_011xDdVRM5yu7W5UoCp4jMmC) "W-x DONE <sha> + counts", and the foreman (session_011xDdVSQvhH4vp7H6B7arST). W-A then builds, runs QUICKCHECK + voice-rep, writes the report, last line "SẴN SÀNG KIỂM <sha>".
Never push to main. No pull requests. Disk: sparse worktree, fetch --depth=30 under flock /home/user/wt/fetch.lock.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
(Worker: you do NOT open your successor; tell the foreman.)
