# jtq14-addr (E34) — narrator address words from jvoice kAddr
PRIORITY #1 CHECK: OD 1 | ledger 0 | claims 6 | main: jtq14.js X(), jtut.js X() (already kAddr), j84 lowRank (kAddr) | review/* none | reused kAddr/kSay, no new core.

## Changes (no numbers touched)
| file | before | after |
|---|---|---|
| jtq14.js X() | maid "ngươi"; else `lowRank()` → "nương nương"/"tiểu chủ" (hand-typed) | `kAddr(null,{srv:"f"},{name:"ngươi"}).goi` (maid) / `kAddr({srv:"f"},S,{m:"cool"}).goi` |
| jtq14.js ME() | "ta" / "nô tỳ" typed | `.xung` of the same kAddr calls |
| j29.js:11 servant plea | `a===S?"nương nương":…` | `kSay({srv:"f"},S,"{goi}",{m:"cool"})` |
| jnroad.js:304 catch fallback | `S.rank>=3?"nương nương":"tiểu chủ"` (wrong threshold) | kAddr fallback |
Side effect (kAddr wins, VANPHONG §2): a Hoàng hậu player is now «Hoàng hậu nương nương» in tutorial narration (was «nương nương»); rank 0–2 tiểu chủ, 3–6 nương nương unchanged.

## Family scan (law 11)
Scanned dev/build/j*.js for hand-typed forms in code paths (ternaries / fallbacks): only the four above were address logic. Other hits: (a) `p===S?"ngươi":name` narrator placeholders = log convention rewritten on screen by j84 (not an address form); (b) jnroad 191/193, jnroade 64 are kAddr-first with a defensive catch fallback, left; (c) ~400 static quoted lines in data files (jtone*/jrd_*/jgedata*) are authored dialogue with fixed speaker, not built by code — out of scope (would need per-line speaker audit; suggest follow-up if sếp wants).

## Tests
- dev/test/jtq14-addr.js: ranks 0–8 + maid → kAddr word byte-equal; PASS, no page errors.
- tut-quests.js: 35/35 (1 flaky fail in 4 runs, also flaky on main 548dcd0d: different cases).
- voice-core.js PASS; quickcheck PASS (236 s, old save ok, core gates PASS). Role-parity/acts untouched. Co-op: narration uses each player's own S; nothing shared → both seats get own words.
Branch review/jtq14-addr @ SHA below. ~100% xong / ~0% chơi được thêm (wording only).
