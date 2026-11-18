PRIORITY #1 CHECK ('voice|giọng|tính tình|lời thoại theo|speech style|xưng hô'): OD 11 (OD tail 17/11 ~06:05Z VOICE BY TÍNH TÌNH + 06:20Z balance law; L1435/L1436/L1458 palace voice) | ledger 2 | claims 0 workers on it (order FOREMAN_C_STATUS line "- (17/11 ~06:06Z) ORDER from MAIN s30 — OWNER RULE VOICE BY TÍNH TÌNH") | main 15 (dev/build/jvoice.js kAddr/kSay/kLine, pools keyed warm/cool/cold; j67.js:53/56; j2.js:172) | review/* 2 (review/palace-voice + review/palace-voice-r1 PASS 16/11 — jvoice already on main; check that nothing from palace-voice-r1 is missing on main before you start, report it if so)

# VOICE BY TÍNH TÌNH — one job (engine key + line pools)
Foreman: Foreman C ROOT-5 session_011xDdVSQvhH4vp7H6B7arST (send_message, short). Model: sonnet (wording). Branch: review/voice-trait from origin/main (65dcf52f). Never push to main. No pull requests.
Report: dev/handover/reports/voice-trait.md on the handover branch claude/cung-tuong-mong-handover-hj0h8w.

## Read first (in full)
- dev/rules/START_CORE.md + START_WORKER.md (handover branch); dev/kit/VANPHONG.md (cổ trang, no %, odds ladder words, no typed numbers).
- Owner words: dev/OWNER_DECISIONS.md lines starting "- (17/11 ~06:05Z real" and "- (17/11 ~06:20Z real" (whole lines), plus the palace-voice lines L1435, L1436, L1458.
- The order: FOREMAN_C_STATUS.md line starting "- (17/11 ~06:06Z) ORDER from MAIN s30 — OWNER RULE VOICE BY TÍNH TÌNH".
- Code on main: dev/build/jvoice.js (kAddr/kSay/kLine, BAL.voice.noRepeat, voice-rep audit); the live 3-group trait pool (trait-pool on main; Tính tình group: Ân cần, Lạnh lùng, Nóng nảy, Điềm tĩnh, Nhiều chuyện, Kín đáo, Kiêu ngạo, Khiêm nhường + the male pool as live); greeting/AG-MEET just landed (jgreet, BAL.greet, BAL.talk) — its spoken lines must use the same voice.

## Do
1. Engine: kLine pools keyed by SITUATION × TÍNH TÌNH trait of the speaker (mood warm/cool/cold still shades inside each trait). Every narration line ABOUT a person takes that person's tone too. Lòng dạ / Chí hướng steer what the story makes them do (where a choice exists), not the words. One function, no second system; old saves fine.
2. Lines: ≥10 lines per trait per situation (owner: "10 câu của ân cần, 10 câu của lạnh lùng, 10 câu của nóng nảy…"), cổ trang per VANPHONG, address from kAddr, no repeats (BAL.voice.noRepeat; run the voice-rep audit). Situations = every place jvoice pools are used today + the new greet/AG-MEET lines. List the situations in the report with counts per trait.
3. Fix the whole family: every spoken line and every narration line about a person goes through the trait key (scan script + before/after table).
4. If the line writing is too big for one session, STOP at the engine + first situations, say so to the foreman with a split proposal by situation (foreman opens 1–2 more sonnet writers on the same branch).

## Tests
Unit test: same situation, 8 traits → 8 distinct tones; noRepeat; old save; voice-rep audit clean; QUICKCHECK. Fold 755x1000 + iPad 1180x820 shots of a few lines from 3 different traits.
Finish: report with PRIORITY line first, before/after table, counts, tests, sha; last line "SẴN SÀNG KIỂM <sha>"; send_message the foreman.

ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
(Worker: you do NOT open your successor; write the handover in your report and tell the foreman.)
Disk: sparse worktrees, fetch --depth=30 under flock /home/user/wt/fetch.lock, never full-clone.
