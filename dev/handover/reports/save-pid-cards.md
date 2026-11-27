# save-pid-cards — FIXER report (Foreman B ROOT 2, opus, session_01N1tNP3tHDZmhEaxQ1fmrKZ, depth 3, START_CTX ≈ 4 %)
PRIORITY #1 CHECK ('deserQ' / 'EVLAST' / 'Việc khó xử' / 'pid x'): OD 1 (wording only) | ledger 0 | claims: this session only | main: j3 serM/deserQ, j68 evGate/EVHOLD | review/*: save-fix-stack-rv5 0cb4e389 / -rv6 40e3ac5d (base; reused, not rebuilt), save-unseen-lists-rv5 deb9859d (test files reused) | the reviewer's pid4.js was not in this container → rewritten as dev/test/save-pid-cards.js.

## Result
Branch **review/save-pid-cards `5e0e0d1e39f4b85adb608504aa20172cd8ec14ba`** = review/save-fix-stack-rv15 273c64c3 (FF on LIVE 03a8c17c; merged in turn rv6 → rv7 → rv10 → rv11 → rv12 fa4c0945/25d67e01 → rv15) + this fix. `git diff origin/review/save-fix-stack-rv15 --stat` (8 files, +135/-15): dev/build/j3.js, j68.js, jroute.js, jtsb.js (24 lines of game code), dev/test/save-pid-cards.js (new), dev/test/lib/device.js (CTM_ROOT), index.html / sw.js / rebuilt. No kit file, no wording, no BAL number.

## Root cause (follow-up A of reports/save-unseen-lists.md «## REVIEW r4»)
The pid cards WERE written and WERE rebuilt by deserQ (in-page deserQ(serQ()) round trip = identical). The loss is in the **event pacing gate j68 evGate**:
- `EVLAST` (the optional card the gate already let onto her screen) is page memory only; `e68().sch` (sc.bk = «an optional card was shown this buổi») IS saved.
- Load path j6: `deser(d)` → `showModal()` → evGate. With EVLAST = null, the card she was looking at (Q[0]) is treated as a NEW optional card in a buổi that already showed one (its own showing) → `block` → pushed into EVHOLD, or — hold full / sc.dn ≥ day+1 — **dropped by evDropInfo, silently** (a choice card has no notice text).
- That is exactly «4 written, 1 rebuilt at load, 0 left after Tiếp tục»: the rest of the written cards were held (or dropped) by the same gate.
Every optional pid kind is hit (j7 ev «Việc khó xử» except the 6 festival ones, OPTPID, every e68*/e68c*), not only the 7 named ones.

Family B (same root: a pid card is written as {pid,pp,t} only, so anything put on it AFTER mkP was lost):
- q72o: j72 q72Offer pushes chips `qtags` [«Tra xét», «Hạn 4 tuần»] → gone after reload (title itself was kept).
- tsb: tsbCard's caller title («Bị dọa nạt», «Bị uy hiếp đòi …») was overwritten on reload by the jtsb deserQ wrapper with the maker's d.title («Bị ép nộp của») — reproduced.
- pushDil's event picture `art`, the pacing flag `opt`, evidence flag `ev`: not rebuilt by deserQ.
- jtsb / j68h approachOne wrappers (r4 risk 3): those cards have NO pid (AP_MK), they are $full data or held code cards in jqsave → written as they are; not this family.

## Fix — ONE rule each, for every card kind
1. **j68 (evl)**: ser writes `evl` = the sổ entry of the card on screen (Q[0] === EVLAST, optional); deser never gates while it rebuilds (E68LD) and gives the gate back that same card as already shown (EVLAST = Q[0], __seen). The cards behind it are gated exactly as in play (held → evh). A card answered before the save is not in Q → never back. Works for pid, generator rk, data and notice cards alike.
2. **j3 (pid x)**: serM writes a pid card's own plain-data fields as `x` (no code, no people, ≤ 1500 chars each; never h / opts / who — those are rebuilt by mkP against the loaded world); deserQ puts them back where the rebuilt card has no such field, copies d.art as pushDil does, and with x keeps the title she saw (`__ts`: jtsb / jroute deserQ wrappers no longer retitle). Old saves (no x) load as before.

## Family table (dev/test/save-pid-cards.js, every key of PEND; head 5e0e0d1e on rv15)
| | Fold 755x1000 | iPad 1180x820 |
|---|---|---|
| kinds built and tested (single card, shown, true reload ×2 + look) | **281 PASS / 0 FAIL** | **281 PASS / 0 FAIL** |
| SKIP: no card in this life (needs a person / state: q72o, j70*, j71*, cnv*, h54*, most e68c …) | 371 | 371 |
| SKIP: season (e68Fits false this month: never drawn now, dropped on load BY DESIGN flight-e68-season) | 99 | 99 |
| SKIP: maker throws without its state (jealousprince, princefever, cn2, giftto, rtAn) / pp null (foreignwed) | 6 | 6 |
| MULTI (5 «Việc khó xử» at once: 1 shown, 4 held → evh) | PASS | PASS |
| ANSWERED before reload → never back | PASS | PASS |
| DECO every 8th kind (caller title + qtags + ev) | PASS | PASS |
| PROD real makers q72o (chips), tsbBul / tsbOmen (caller title) | PASS | PASS |
The fix is kind-agnostic (gate + serM/deserQ), so the SKIP kinds take the same path when the game makes them.

Before / after (the 7 named kinds + vase, ghost, e68strayCat, pact, fire; base = stack-rv5 0cb4e389 built root):
| build | Fold | iPad |
|---|---|---|
| base (stack-rv5) | **FAIL 15/17** (every single card lost at load; MULTI lost; DECO lost; q72o chips null; tsbBul retitled «Bị dọa nạt»→«Bị ép nộp của») | **FAIL 15/17** |
| MUTATE 1 (j68 EVLAST restore removed) | FAIL 13/17 (all A rows) | FAIL 13/17 |
| MUTATE 2 (j3 x restore removed) | FAIL (DECO ×2, PROD q72o chips, PROD tsbBul title) — A rows PASS | (run cut, Fold enough) |
| fixed | PASS 17/17 | PASS 17/17 |

## Save gates (head 5e0e0d1e)
Head 5e0e0d1e (rv15 base), run 11/26–11/27:
| gate | result |
|---|---|
| save-pid-cards.js fold,ipadAir | PASS 281/0 + 281/0 (SKIP 476 each, as the table) |
| save-residue-probe Fold seed 1 (40) | SAVE-RESIDUE PASS (0 cards lost at a write) |
| save-death-rebirth | PASS 6/6 |
| save-unseen-lists fold,ipadAir 1 | PASS 32/32 |
| save-boundary-reload fold,ipadAir 1,2,3 | PASS 24/24 |
| knsell-remake.js (rv12 25d67e01) | PASS |
| inv-stack-scan.py | RAW sites 0 |
| inv-stack.js | FAIL 2/27 — the 2 DOM-node rows (Biếu quà làm lành 2225 nodes > 2,000); plain rv12 fa4c0945 built root gives the same 2 rows (2225/2225) → pre-existing, not this diff (no inventory code touched) |
| quickcheck ALONE | running at SSK time (started 11/27 after every other gate); result appended below as «## quickcheck» |
Every new `.inv.push` → invAdd: none in this diff. Old ACT-MERGE action names: none in this diff.

Flaky, pre-existing: save-boundary-reload «fold day seed 1» SCREEN NOT FREE. On rv12 head: mine 1/4 PASS, plain rv12 3/4 in alternate runs; earlier rv6 3/5. Scratch probe (why() at the end, not committed): the screen is held by `#modal` visible with Q EMPTY, the j-card «VIỆC Hội phối đồ: báo đề» (Hoàng hậu announces the matching contest) — the SAME modal on plain rv12. The sổ matches the screen in every failing run (0 moments sổ ≠ screen). On 5e0e0d1e it passed 24/24. Not a save fault; a modal shown outside Q (hội phối đồ notice) — flagged for its owner.

## Test-harness notes (TEST SETUP only, no game change)
- save-unseen-lists drift read the slot raw (`localStorage` JSON) — save-growth encodes it (slotPut) → «sổ ≠ screen 20» on the base too; nl-4s ended the life inside 4 s through the LIVE selection days. stack-rv6 40e3ac5d already carries the same two fixes (I took its file in the merge).
- dev/test/lib/device.js serveRoot honours CTM_ROOT (serve another built root): the built page reloads itself to the root index.html, so a before/after must use its own root dir, never a second html file in the same root.

## Open (not made worse)
- j68 evGate still drops an optional CHOICE card silently when the hold is full (evDropInfo writes a line only for notices) — in-play pacing by design (FLIGHT-DAYQ), not a save fault; flagged for the owner's pacing rules, not changed.
- selection days (S.selx2) save/reload: own selx-* tests (as r4 C).
