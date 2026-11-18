PRIORITY #1 CHECK ('pqOdds poison-road'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 (feature itself = D8 poison road, D's own branch review/poison-road-rv; this is its FAIL fix round)

# D #1 brief — POISON-ROAD FIX ROUND (opus; rules/numbers = BIG)
Coordinator: Foreman D #1 session_01964izGKDEJJjzBBQAqWeWg. Report there (send_message) + in dev/handover/reports/poison-road-fix.md (handover branch) + one line in dev/handover/FOREMAN_D_STATUS.md.
READ FIRST in full: dev/rules/START_CORE.md, dev/rules/START_WORKER.md; then dev/rules/topic/* only for what you touch (one-core / BAL). Owner rules are verbatim there — do not rely on this summary.
ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217; repeated by the owner 16/11 09:20Z — she is tired of reminding)
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

## Start
Branch review/poison-road-rv @118436cc08ea83c7d46da37089155b93f03bf1e4 (= worker 4ce4cbfa + main a2ad2401 + reviewer kgt portrait fix). Work on a new branch review/poison-road-fix from that sha. First merge newest origin/main (≥ 33e98993), rebuild index.html/sw.js (assemble.py + build_site.sh).
Review report with the FAIL list: dev/handover/reports/review-poison-road.md (handover branch) — read it in full.

## Fix (reviewer FAIL 2 + 3; FAIL 1 is NOT yours)
1. ONE CORE (OD:L1267): jpq.js pqOdds types its own divisors (`(a.tamco||0)/4`, trust `/4`, ~L57). Whole family (fix-the-group, OD:L474): jpoison.js pgOdds has the same `/4` ×2 and `spend(2)` (~L48, L74). Move them into ONE BAL key set used by both files (BAL.pg, or BAL.pq reading BAL.pg — one source). Values unchanged (behaviour identical) unless a test shows a bug. Scan jpq/jpoison for any other typed number shown to the player or used by a rule. one-core-guard must stay 0 and should catch these divisors if it can cheaply.
2. Two vacuous topic tests (pass when persW(v,"pgift") ≤ 0, `pdA<=0||…`): force a positive weight so they really test the NPC road; they must FAIL on a deliberately broken build (prove once).
NOT yours — FAIL 1 (picker intro text hidden under the option list on Fold+iPad, kit jk4 `.kpb{flex:0 1 auto!important;min-height:0}`, also on live): KIT REQUEST already in dev/kit/KIT_REQUESTS.md for the main kit keeper. KIT FIRST: do NOT change kit CSS, do NOT add a private fix. Just mention in your report whether the kit fix has landed on main by the time you finish.

## Gates
Topic tests for jpq/jpoison (35/35 + the fixed 2), one-core-guard 0, coop-e2e (live = 63/63), quickcheck PASS; Fold 755x1000@2 + iPad 1180x820@2 shots of the poison picker LOOKED (scratch only). Memory tight: tests one at a time, ≤2 browsers.
Done → push review/poison-road-fix, write "SẴN SÀNG KIỂM <full sha>" in your report + STATUS line, send_message D #1. No PR, never push main. Model: opus.
