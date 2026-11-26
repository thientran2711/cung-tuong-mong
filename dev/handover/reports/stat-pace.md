PRIORITY #1 CHECK ('kỳ ngộ|thiện cảm|oán|danh|sủng|event cap|người tìm'): OD 254 | ledger 16 | claims 8 | main 15 | review/* 9 | archive 805 — reused: review/balance-pace pace.js harness pattern (it covers lesson/course pace, NOT these five stats; not landed), jspread / j68 evGate / evBusy (existing pacing layers, wrapped, not rebuilt). No other worker on stat pace / daily cap.

# review/stat-pace — WORKER D2 (Foreman D) — STATUS: OPTIONS SENT, WAITING FOR THE PICK · ROLLOVER HANDOVER below
depth 2 · START_CTX ~3 % (estimate; tool read 0) · rolled over at ~33 % (rule: START_CTX + 25 %).
Branch review/stat-pace from LIVE origin/main f009e1a6. Pushed commits: a4da17b3 (+ the handover commit carrying this file).

## Owner words (verbatim rows OD 26/11 ~01:25Z … ~04:20Z on the handover branch; not repeated here — read them there)

## LIVE measured (dev/measure/statpace.js, inpage6 «sens» bot, 8 lives × 24 months, file live.html = origin/main f009e1a6)
1 game year = 12 months = 36 game days (tuần). Median of 8 lives (max in brackets); at100 = stat cells ≥ 99 over the 8 lives (7 stats each).

| month | rank | Sủng | Danh | Đức | Thái hậu→ta | Hoàng hậu→ta | best consort thiện cảm | worst oán toward her | at100 |
|---|---|---|---|---|---|---|---|---|---|
| 3 | 1.5 | 71 (99) | 52 (82) | 55 (66) | 24 (74) | −2 (45) | 38 (92) | 42 (78) | 1 |
| 6 | 2 | 96 (100) | 66 (91) | 79 (87) | 53 (89) | −5 (55) | 33 (68) | 84 (100) | 3 |
| 12 | 2 | 98 (99) | 71 (100) | 100 (100) | 72 (100) | 20 (60) | 32 (60) | 98 (100) | 19 |
| 24 | 2 | 98 (100) | 79 (100) | 100 (100) | 81 (99) | 0 (24) | 4 (45) | 99 (100) | 20 |

= her report exactly: by the end of year 1 Sủng / Đức / Danh / Thái hậu / oán sit at 100 while she is still rank ~2.
Root (gain tally by source, statpace.js `src`): single rises far too big (Kỳ ngộ thiện cảm +30…+56 ×V band, Thái hậu +30 from relTo / runOpt, thị tẩm Sủng +12, j95b ledger seed oán up to +48 a hit), no slowdown near the top, no rank link; plus Kỳ ngộ p0 85 % with a 1-tuần wait ≈ one encounter EVERY day, visitors up to 2/day + stage visitors up to 3/buổi.
Events per day (dev/test/stat-pace.js on LIVE, 47 days): mean 3.3 big events a day, worst 7, 18 of 47 days above 3.

## What the branch does (all numbers BAL, law 4; same rule for her and every NPC, law 1)
- BAL.sp (dev/build/jbalsp.js) + jstatpace.js `spG` = ONE rise rule in the funnels apply (j1) / ap (j8) / affAdd / oanAdd (j9):
  size bands per change [small, normal, big] = Sủng/Danh/Đức [2,5,8], thiện cảm/oán [4,8,12] (above «normal» counts 30 %, never past «big» → Kỳ ngộ +34 ⇒ +12);
  rank ceiling (of the one who RECEIVES; her rank for regard toward her) ceil = [45,55,65,75,85,92,97,100] — each above what the next rank needs (test checks RANKS[r+1].s/.d);
  diminishing returns × max(.15, 1 − (now/ceil)^3); fractions carry per person (p.spc), no random draw. A fall of Danh/Đức/Sủng/oán is untouched;
  thiện cảm (th/hh/rel −100..100) is paced on BOTH sides (dislike growing below 0 the same way — without it Hoàng hậu sank to −100 in the first run).
- LAW 11 family scan dev/measure/statpace-scan.py: LIVE 130 raw rise writes → branch 0 (111 routed through `spAdd`, 2 by hand jlux/jkc); left on purpose: fx-object builders jlux/jpoison/jrcp (they feed apply later), co-op mirror jcoopworld friendEntry.
  Funnel sites now under the rule: apply 344 · ap 284 · affAdd 148 · relAdd 258 · oanAdd 208 · hhSet 1 · spAdd 115.
- Real number on screen (law 4): fmt() option previews and Kỳ ngộ buttons + result lines show the REAL rise (`spSee`). KNOWN LEFT: typed literal previews like j7 «thiện cảm +25» (pre-existing typed numbers) still print the raw size → follow-up (one scan, same family as E-d «+8 (42)» rows).
- Daily big-event cap jevc.js + BAL.evc {cap 3, q fest 2 / harm 1 / visit 1 / ky 1 / opt 1, pri fest>harm>visit>ky>opt, wait 3}: counts cards shown today + cards waiting (Q, SP13.L, EVHOLD, EVCW); gates kyArrive, approachOne, gmCard, agScene (deed still lands), show70 (non-urgent waits), evBusy, makeDil; at paint a big card of a full day waits in EVCW for a later day (harm never held). Kỳ ngộ wait BAL.kyngo.cd [1,1,1,1] → [2,2,3,3] tuần (canon overwrite in jbalky.js).

## Branch measured
Events (test, 47 days): mean 2.2 a day (LIVE 3.3), worst 4 (LIVE 7), days above 3: 3 (LIVE 18). Still FAIL by 3 days: leftover cards that bypass the hold (likely must/forced e68 visit-type cards — the test now prints MUST/FORCED flags per card; NEXT: run it, then either exempt such cards in the test or gate their source).

| option (6 lives × 24 mo, partial) | m6 rank · Sủng · Danh · Đức · th · hh | m12 | m24 | at100 in 2 years |
|---|---|---|---|---|
| LIVE | 2 · 96 · 66 · 79 · 53 · −5 | 2 · 98 · 71 · 100 · 72 · 20 | 2 · 98 · 79 · 100 · 81 · 0 | 20 |
| **A recommended** (pow 3, ceil 45…100, cap 3) — 2 lives so far | 2.5 · 47 · 40 · 55 · 27 · −15 | 3 · 63 · 44 · 69 · 38 · −11 | **4.5** · 77 · 56 · 76 · 24 · −16 | 0 |
| B stricter (pow 2, ceil 40…100, cap 2) — 4 lives | 2.5 · 40 · 25 · 50 · 24 · −22 | 1.5 · 50 · 29 · 54 · 12 · −41 | 0.5 · 46 · 32 · 52 · 3 · −40 | 0 |
(pow-2 / ceil-45 first run, 3 lives: no 100 either, rank 1–3, Danh ~30.) Worst oán toward her at 2 y: LIVE 99 → A 46 → B 26.
Reading: A keeps every stat under 100 for 2 years and values rise WITH rank (median rank 4.5 = Phi road at 2 y vs LIVE stuck at 2); B is so tight that Danh/Thái hậu stay too low to promote.

## For sếp (Vietnamese, short)
- **Cách A (em khuyên):** mỗi lần tăng Danh/Đức/Sủng tối đa +8, thiện cảm/oán tối đa +12 (kỳ ngộ +34 → +12); càng gần trần càng tăng chậm; trần theo bậc (Đáp ứng 45 … Hoàng hậu 100). Một ngày tối đa 3 việc lớn (lễ hội, bị hại, người tìm, kỳ ngộ, việc khác — mỗi loại 1), phần dư dời qua ngày sau; kỳ ngộ 2–3 ngày mới có một lần. Thử máy 2 năm: không chỉ số nào chạm 100, bậc lên được tới Phi.
- **Cách B (chặt hơn):** trần thấp hơn (Đáp ứng 40), chậm mạnh hơn, mỗi ngày tối đa 2 việc lớn. Không chạm 100, nhưng Danh và lòng Thái hậu thấp quá, máy gần như không lên bậc.

## Tests so far
dev/test/stat-pace.js (unit 31 checks all ok: bands, ceilings above next-rank needs, carry, NPC same rule, old save above ceiling kept, cap ledger, tags; simulated days still FAIL 3 days — see above). Regression runner over the 97 tests that touch the changed functions: /home/user/wt/sp-out/regress.sh (tests list tests.txt) — NOT RUN YET (LIVE vs branch). No videos yet.

## HANDOVER (for the successor — the COORDINATOR opens it)
1. Wait for Foreman D's pick (A/B). Worktree /home/user/wt/sp (sparse), outputs /home/user/wt/sp-out (live.html = LIVE copy, *.jsonl lives, sum.py summary, show.py per-source tally). If the container is gone: fetch review/stat-pace and rebuild (bash dev/site/build_site.sh).
2. Finish the cap: run `node dev/test/stat-pace.js index.html 45`, read the MUST/FORCED flags of over-cap days, fix (gate source or exempt never-waitable cards in BOTH jevc and test).
3. Re-run optA to 6 lives (`BALO` not needed now: A is the branch default pow 3): `CAP=2600 PAR=3 node dev/measure/statpace.js index.html 6 24 0`.
4. Run regress.sh on live.html and on the branch build; only regressions vs LIVE matter; fix them (likely: tests asserting exact gains / Kỳ ngộ cd 1 / kyngo-unit cooldown).
5. Typed preview numbers follow-up (j7 etc.) or list it as KIT/E-d follow-up.
6. Fold 755x1000 + iPad 1180x820 FULL videos (a Kỳ ngộ button showing the real +, a result line, a day with a waiting visitor) → img/_review/stat-pace/; then SSK → open ONE opus BIG reviewer as child (create_session, source_url https://github.com/thientran2711/cung-tuong-mong, clone_depth 30) → «LAND READY review/stat-pace <sha> (FF from LIVE)» here → message Foreman D (session_01D3E3NX3vWTRXcmN8Wi8Yxw).
ROLLOVER (verbatim canon): "Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop." "Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker)."
