# questline-q1b — help hồi asks for the nc · td · ch · thd · cnv roads (E7b, Foreman E)
PRIORITY #1 CHECK: OD L644/L1072/L1243/L1252/L1601 (brief) | main dev/build/jnroad.js nrOffer/nrKind + 8 stock nr_* cards (reused, untouched) | review/* none for NRASK (prio1.sh "NRASK nrOffer": OD 0 · ledger 0 · claims 0 · main 0 · review/* 0) | claims E7a/E7c siblings only. START_CTX ≈ 3 % (get_session read 0; own estimate), depth 1.

## What
- Branch `review/questline-q1b` @ **344e1e92** (from main a95e8d4): `dev/build/jnrask_b.js` (data only) + one assemble.py line + generated site.
- `NRASK[<chapter id>] = {k, h, o}` for **120 chapters** = every help chapter (.5–.10, BAL.nroad.helpN) of the 20 roads of nc (gian/su/tuc/vuong), td (an/ke/song/tha), ch (co/benh/ho/bi), thd (tho/sach/tro/hoc), cnv (chu/ban/mat/ma).
  - `k` = a stock kind (emp 19 · th 13 · hh 12 · thu 23 · do 27 · y 7 · che 19; **never «bac»**) chosen for THAT chapter's ask (not only from the cast key): it reuses the stock costs/odds/sk (BAL.nroad.op/.bac/.suc/.dl), no number in the file.
  - `h` = the ask in the asker's voice about the chapter's own conflict, from the H1 writer kit (B2 shapes K1–K7 + origin rows: nc custom/letters/envoy, td old case/witness/brother, ch the reverse ask against Cô mẫu's orders, thd poems/books/exam/teaching, cnv nô tỳ asks).
  - `o` = two [label, loss line] pairs **in the stock card's option order** (emp/th/hh/che: Sức road, bạc road; thu/do/y: bạc road, Sức road); betray option stays stock. Money only as a cost.
- Slots only, no typed pronoun: `{me}` `{Me}` `{call}` `{he}` `{B}`. `{call}` should be lowercase mid-sentence and capitalised at a sentence start (my local hook does this). Chapter cast tokens ({land} {pa} {n1} {foed}) never used. cnv lines never name the maid's mistress (she may be the player).
- assemble.py: `jnrask_b.js` sits right after `jnroadm.js` now; when q1a lands with `jnrask.js` it must be **after jnrask.js** (rebase fix: one word).

## FOR E7a / engine (format sent to E7a by send_message 05:2xZ; no reply yet)
The engine must: look up `NRASK[ROAD14[x.p.nr][x.p.nn]]`; use `e.k` in nrKind/nrOffer (else stock kind); fill `h` and `o[i][0]` / `o[i][1]` into the stock card's `h`, `s[0].ch[i].n`, `s[0].ch[i].lx`; slots as above. My stand-in is `dev/handover/shots/questline-q1b/hook-local.js` (NOT pushed to the game branch). If q1a's shape differs, I convert the file (mechanical).

## Tests
- `quickcheck.sh` **PASS** (316 s; core gates PASS: one-core-guard, rules-one-source, kit-conform, coop one-world, hooks; old save ok; perf new/live render 170/139, tab 376/293, buổi 854/864 ms — within noise of a data-only change).
- `test-b.js` (with the local hook): 120 entries · 336 cards rendered through PEND.q72o + q72Card · askers lower consort / higher consort / Hoàng hậu / trusted maid / other maid · **faults 0 · page errors 0**. Checks: chapter exists, kind used, self-word right per asker (muội/tỷ/bổn cung/nô tỳ), no raw token, no %, no lowercase start / after a full stop, both option labels on the card.
- Variety scan (node, all of jnrask_b.js): 0 shared sentence between any two asks; 0 duplicated option label (8 repeats found and rewritten); 0 unknown token; 0 digit/%.

## Shots (CDN upload refused: cdn_sync HTTP 401; git refuses images) — PNGs in worker scratch /home/user/wt/q1b-shots/ (shared container); else rerun dev/handover/shots/questline-q1b/shots-b.js <build url> <dir> (needs hook-local.js until q1a lands)
Files: `td_song_8-755x1000.png`, `td_song_8-1180x820.png` (Quý phi asks: «Em trai tỷ trúng tên…», kit j72 card), `cnv_ban_7-755x1000.png`, `cnv_ban_7-1180x820.png` (trusted maid: «… Nô tỳ không có đường đến Thái y viện. Tiểu chủ cứu nàng ta một lần.»). Looked at all four: kit card, no overflow, no cut text. (Portraits show «Đang thỉnh tranh» only in the file:// build.)

## Notes
- nc and the cnv askers: NPC consorts never draw nc today (BAL.nroad.org has no nc); the nc rows are ready if that changes. cnv askers are only maids (nrMInit).
- The step title (s[0].n, e.g. «Mời thái y xem kín») stays stock — the brief's spec has no step field.
