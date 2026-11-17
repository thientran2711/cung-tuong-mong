PRIORITY #1 CHECK ('SHOW-WHY|show why a number|showWhy'): OD 1 | ledger 0 | claims 5 (C STATUS only) | main 2 (jnet.js netTip + header comment, hooks left by trait-pool) | review/* 0.

# show-why — HANDOVER (job NOT started; worker rolled over before starting)
Worker session_011xDdVQM2jyGVY8RsCxbtvX (trait-pool, PASSED, live on main 9fdc1199) received this order at 07:37Z with context at 37.5 % (START_CTX ~4 % + 25 % = 29 % limit, owner rollover rule OD:L1217 / 16/11 08:22Z) → no code written, no branch created. The COORDINATOR opens the successor.

## Order (Foreman C ROOT-3, 07:37Z)
- Branch review/show-why from main 9fdc1199. Result box + Sổ ghi show the factors behind every changed number (nết, trọng, mood, repetition), named if known, generic if not; WHOLE family (every result box + Sổ ghi line that shows a changed number). Owner words: OD tail 05:45Z line "OWNER RULE — SHOW WHY A NUMBER"; full order: FOREMAN_C_STATUS line '(17/11 ~06:12Z) ORDER from MAIN s30' item (2).
- Fold in the reviewer follow-ups (review-trait-pool-r1.md): the 44 inline nết numbers → BAL.net columns (ONE CORE OD:L1267); the gain/cost tooltip must be tappable on touch (no native title).
- KIT FIRST: reuse kit rows/chips (KIT.md); a new display part → STOP, KIT REQUEST in dev/kit/KIT_REQUESTS.md + tell Foreman C. VANPHONG wording (no %, cổ trang). Tests + Fold 755x1000 & iPad 1180x820 shots + old-save load. Report in this file with 'SẴN SÀNG KIỂM <sha>' → send_message Foreman C.

## Starting points the successor can reuse (from trait-pool)
- Engine dev/build/jnet.js: traitsOf/netOf (3 nết [tt,ld,ch]); BAL.net.T[t] rows (w, dang, mal, slight, forgive, trust, gift, ghen, harmGate, lavish, riseGift, fade, q, v, ban, tend, gain, cost); netTip(t) = "Được … Mất …"; hasT / netQ / nq / qv / tv. Known nết: trKnown(v) (j28, wrapped in jnet); known trọng: trongKnown(p) (jtrong).
- Multipliers to explain: giftVal / affAdd / oanAdd wrappers in j28 (persF gift / trust / slight), trongMul(judge,tags) in jtrong (BAL.trong up/off), trGreet (Thái hậu greeting: archetype × trọng × rank × mood × repetition × saturation; already returns a 'why' shown on act cards), mood (jcmood / jmood), repetition fades in jtrong.
- Existing 'why' outputs to unify first (PRIORITY #1): act-card "Vì sao" via `why` (jtrong trGreet), nightWhy (nights, ~15 hits on main), jwhy.js (factor list F.push([label,n])). One shared factor-list format is the likely core.
- Inline nết numbers left after trait-pool: e.g. nq(s,"greed",25), (hasT(m,"Xảo quyệt")||hasT(m,"Kiêu ngạo")?8:4) in j42 / j29 / j70 / j10 / jsgame / jtin / jstip — grep 'nq(\|hasT(' in dev/build/j*.js; move each number into a BAL.net column.
- Tooltip: j28 trLine uses <b title="${netTip(t)}"> → needs a tap path (check KIT.md for a tip/popover part; if none → KIT REQUEST).
