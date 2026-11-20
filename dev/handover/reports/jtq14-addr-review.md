# REVIEW jtq14-addr (E34r) — PASS 685b71fb719b1cef3809557362f997ee20bb72e8
PRIORITY #1 CHECK ('jtq14|kAddr|address form'): OD 1 | main 15 (jvoice kAddr) | review/* review/jtq14-addr only | claims E34.
Base: origin/main 548dcd0d unchanged; branch is a fast-forward of it (FF holds). No fixes made by the reviewer.

## Findings
- X()/ME() (jtq14), j29 plea, jnroad fallback all take words from jvoice kAddr; no number or behaviour change (diff = 3 build lines + test + generated index/sw).
- VANPHONG §2: maid → "ngươi"/"ta" (narrator voice); rank 0–2 tiểu chủ, 3–6 nương nương, Hoàng hậu → «Hoàng hậu nương nương» (kAddr wins, matches §2 rank rule). Rank 0–8 table in dev/test/jtq14-addr.js is byte-equal to kAddr.
- Whole-family rescan (own grep of dev/build/j*.js, ternary/fallback forms): only the four fixed sites build an address word by code. Other hits = `p===S?"ngươi":name` log placeholders (not an address form) and static authored lines.
- Non-blocking misses (follow-up, not FAIL): j29.js:10 first branch `quỳ xin nương nương` (static; j84.js:90 rewrites nương nương→tiểu chủ on screen for low rank), jrcv.js:228/236, j67/j83/jrd_* static "xin nương nương" lines — same j84 rewrite covers them; a per-speaker audit of ~400 authored lines remains a possible follow-up.

## Tests (reviewer's own runs)
- jtq14-addr PASS; voice-core PASS; tut-quests 35/35 ×1 (file:// build; flake seen by worker is also on main per worker report); quickcheck PASS 245 s (open 1982 ms, old save ok, core gates PASS, time-spill PASS, perf ≤ live except render 286/193 ms median, same noise class); coop-e2e 68/68 PASS (live Worker).
- Co-op two-seat: narration (tq14Say/X/ME) reads only the local S via kAddr, nothing shared → each seat, guest included, gets its own words; per-rank test covers both a low and a high rank. No solo-only path.
- 18 laws touched: 4 one-core (address from one source) OK; 7 cổ trang wording OK; 11 whole group (scan) OK with the noted static remainder; 13 brief has PRIORITY #1 CHECK OK.
