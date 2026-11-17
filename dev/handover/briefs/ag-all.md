PRIORITY #1 CHECK ('AG-ALL|mindPick|adHapRoll|agent act list'): OD 1 | ledger 0 | claims 4 | main 15 | review/* 0  (+ OD:L1386/L1403, 04:05Z, 13:15Z L1587, 13:20Z L1588; reports/npc-agent.md §1/§5; AG1–AG3 + AG-MEET LIVE: jagent.js, jagemp.js, jagmaid.js, jgreet.js; jmind.js mindPick on main 6ca04148)

# AG-ALL — every NPC group plays the player's FULL act list (opus, design lead + implementer)
Coordinator: Foreman C ROOT-7 session_01UV1Szh1sUAVP6FUuqZgkYs (report also to MAIN s31 session_01UV1SzhZw2hHEAf6bi644Jn).
Branch: review/ag-all (from origin/main). No PR. Never push main.

## Read first (in full)
- dev/rules/START_CORE.md + START_WORKER.md (handover branch claude/cung-tuong-mong-handover-hj0h8w, detached sparse worktree under /home/user/wt, fetch --depth=30 under flock /home/user/wt/fetch.lock).
- dev/OWNER_DECISIONS.md lines 1587 and 1588 (owner VERBATIM, 17/11 ~13:15Z AG-HAP and ~13:20Z AG-ALL) + grep 'OD:L1386|L1403|04:05Z' for the npc-agent law. These words are binding as written.
- dev/handover/reports/npc-agent.md (§1 flat rolls list, §5 AG train), dev/handover/FOREMAN_C_STATUS.md order lines 13:16Z + 13:21Z (main s31).

## Owner law (verbatim, OD 17/11 ~13:20Z)
"Cái vụ mà cung nữ tự tìm đường đến hoàng thượng á, tại sao bạn phải làm những cái việc lắt nhắt lặt vặt như vậy? Có mỗi một cái việc dâng trà hay là tìm đường đến hoàng thượng là sao? Trong khi tôi đã nói rồi, NPC sống tức là họ có thể có những cái option, có những cái nút chọn y chang tôi luôn mà. Tại sao mình không làm đầy đủ cho một nhóm người đó luôn mà chỉ làm có một hành động?"
## Owner law (verbatim, OD 17/11 ~13:15Z, AG-HAP)
"Tức là cái dấu chấm than lấy từ chính hành động của nhân vật đi. Tức là vậy nè, sẽ có những ngày rất là êm đềm, chẳng có gì xảy ra, không sao cả. Đó, còn sẽ có những cái ngày ha là sẽ có rất là nhiều việc xảy ra chẳng hạn. Rồi cái việc mà tôi chọn tới nơi nào đó là chuyện của tôi. ... Cái vấn đề mà cái việc đi qua buổi khác người ta còn ở đó hay không cũng phụ thuộc vào chính cái nhân vật NPC đó, chứ không phải là phụ thuộc vào máy tung xúc xắc hay là bóc thăm. Tôi nghĩ là lâu lâu mình vẫn có thể cho những cái sự kiện bốc thăm vào, Nhưng mà những cái sự kiện này phải là những sự kiện có thật ở trong game, và khi nó xảy ra là nó thực sự tác động tới tất cả mọi người ở trong game." (full text OD L1587)

## STEP 1 — deliverable within ~1 h: dev/handover/reports/ag-all.md (handover branch)
Gap table, one section per group: consort (player-as-consort), maid, servant/eunuch, Emperor, Thái hậu, Hoàng hậu.
Columns: player act (button label as shown, Vietnamese) | code (file:function on main) | cost/odds source (BAL key) | NPC of this group can do it today? (YES via <file:fn> / PARTIAL (what is missing / flat roll) / NO) | notes.
Source the PLAYER list from the REAL button lists (SOC/ACT/deck acts, Tứ đức + tài nghệ practice jlevel, shop/gifts, schemes/harm, thỉnh an, greet jgreet, toilette jtoil, rest, maid duties, Dư đồ moves, contests/mini-games, study…) — grep the code, do not guess. For groups the player cannot be (Emperor, Thái hậu, Hoàng hậu if not reachable), list the acts the game gives them in events/UI + the player-equivalent acts they should mirror.
End with: counts per group (YES/PARTIAL/NO), every flat roll still deciding an NPC act (file:line), and the AG-HAP part: adHapRoll jact.js:119-146 sources → which agent deed replaces each.
Commit + push to the handover branch (pull --rebase, retry), then send_message to Foreman C ROOT-7 AND main s31: "AG-ALL TABLE READY <sha>" + the counts line. Then continue at once.

## STEP 2 — design (same report, next section) then build
One design: an NPC of group G each buổi/khắc builds the SAME option list the player of G sees (call the same list builders where possible; one core), scores options by needs × traits (3-trait pool) × tâm cơ × goals via jmind mindPick, executes the SAME act function with the same formulas/costs/odds, host-only, perf counter (budget as AG1 §4), every act lands in the people ledger and drives the Dư đồ '!' (AG-HAP: no dice floor/cap, quiet/busy days arise, the agent decides to stay or leave next buổi). Rare WORLD events: reuse existing contents (sứ thần, tuyển tú, thọ yến, hỏa hoạn, thiên tai, điềm …) — history/drama expert check per OD:L1327 is ordered by the foreman separately (dev/research/world-events.md); leave a hook.
Remove the flat rolls that the agent choices replace (list before/after). Old saves load.
If one worker would take too long, write in the report a split into 2–3 parts on the SAME branch (e.g. consort acts / maid+servant acts / schemes+AG-HAP) and tell Foreman C; C opens the helpers.

## Laws
LUẬT KIT TRƯỚC (no new UI in this job; any player-visible line from VANPHONG; '!' uses existing kit). ONE CORE: every number from BAL. LUẬT SỬA CẢ NHÓM. Tests in dev/test (add an ag-all test: per group, act histogram over N days; no NPC-only hidden act). QUICKCHECK before SẴN SÀNG KIỂM. BIG reviewer (opus) after.
ROLLOVER (verbatim): Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
Report English in files; never message the owner.
