# PROGRESS — review/nw-poem (no-word-games, family A: Thơ + Câu đối)

Owner rule (OD:L1265/L1266, 11/16): no minigames built on words. Thơ (verse fill-in) and Câu đối (word pairing) are replaced by NON-word games for the same art/occasion.
Tests: `dev/test/nwpoem-play.js` (oracle play, sizes), `dev/test/nwpoem-bot.js` (skilled/random calibration), `dev/test/nwpoem-scan.js` (entry-point scan).

## State
- [x] inventory of entry points (see report dev/handover/reports/nw-poem.md on the docs branch)
- [x] new file `dev/build/jnwp.js` (assembled right after j91): engines `calli` (Thơ → thư pháp, numbered stroke tracing in order) and `doiline` (Câu đối → mirror the brush marks of the left scroll onto the right scroll), `BAL.nw` numbers, `nwTier(kind, env)` (uses `mgTier(art, occasion)` when mg-balance ships it, else the old level tiers), registry override (kinds tho/doi, KG82_MGL.thi, KG82_SPR), old engines `verse`/`pair` unregistered
- [x] one line in `dev/build/assemble.py` (jnwp.js after j91.js); no edit to j82/j91/j83/j71 (old verse/pair/quiz-doi code stays in j91/j82/j5 as dead code, unreachable — remove in a later cleanup once nw-lantern/nw-quiz have merged to avoid conflicts)
- [x] first-time demo cards (S.mgSeen keys `nwcalli`, `nwdoi`), Gợi ý button, quiet auto-hint at tiers 0/1, wrong drop bounces back
- [x] calibration (see report)

## Resume notes
- Game kinds keep the keys `tho` / `doi` so j71 SC7, j83 WK, jrcp, jkc, jveil need no change; only the engine behind the key changed.
- If mg-balance's `mgTier` returns something other than a number 0–2 or `{tier}` adapt `nwTier` only.
- Numbers to tune live in `BAL.nw.calli` / `BAL.nw.doi` (top of jnwp.js).
- KIT REQUEST: none (canvas games inside kitGameFrame; marks/slots drawn with the existing j91 tile helpers `k91Tile`, `k91DemoCard`, `k91Btns`).
