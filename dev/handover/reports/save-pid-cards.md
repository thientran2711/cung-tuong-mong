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
| quickcheck ALONE | FAIL on the same 3 rows as plain rv15 273c64c3 (see «## quickcheck») — none from this diff |
Every new `.inv.push` → invAdd: none in this diff. Old ACT-MERGE action names: none in this diff.

Flaky, pre-existing: save-boundary-reload «fold day seed 1» SCREEN NOT FREE. On rv12 head: mine 1/4 PASS, plain rv12 3/4 in alternate runs; earlier rv6 3/5. Scratch probe (why() at the end, not committed): the screen is held by `#modal` visible with Q EMPTY, the j-card «VIỆC Hội phối đồ: báo đề» (Hoàng hậu announces the matching contest) — the SAME modal on plain rv12. The sổ matches the screen in every failing run (0 moments sổ ≠ screen). On 5e0e0d1e it passed 24/24. Not a save fault; a modal shown outside Q (hội phối đồ notice) — flagged for its owner.

## Test-harness notes (TEST SETUP only, no game change)
- save-unseen-lists drift read the slot raw (`localStorage` JSON) — save-growth encodes it (slotPut) → «sổ ≠ screen 20» on the base too; nl-4s ended the life inside 4 s through the LIVE selection days. stack-rv6 40e3ac5d already carries the same two fixes (I took its file in the merge).
- dev/test/lib/device.js serveRoot honours CTM_ROOT (serve another built root): the built page reloads itself to the root index.html, so a before/after must use its own root dir, never a second html file in the same root.

## Open (not made worse)
- j68 evGate still drops an optional CHOICE card silently when the hold is full (evDropInfo writes a line only for notices) — in-play pacing by design (FLIGHT-DAYQ), not a save fault; flagged for the owner's pacing rules, not changed.
- selection days (S.selx2) save/reload: own selx-* tests (as r4 C).

## quickcheck (ALONE, 11/27, vs live b881686f)
| row | 5e0e0d1e (this) | plain rv15 273c64c3 |
|---|---|---|
| build / time-spill / open / old save | PASS | PASS |
| G4 80-dialog-fixed (kit-dialog-2 a «no empty Tốn / Được cell», Fold + iPad) | FAIL 2 | FAIL 2 (same) |
| G4 90-button-crawl (Fold · Ô lưu · «Lui» did not close its layer) | FAIL 1 | FAIL 1 (same) |
| G4 92-look-dedupe | FAIL 6 | FAIL 6 (same) |
| perf median new/live: render · tab · buổi · tasks>200 | 290/220 · 637/571 · 1368/1249 · 33/29 | 268/228 · 550/511 · 1351/1634 · 31/30 |
All 3 failing rows are identical on the plain stack → pre-existing, for their owners. Perf: tab 637 ms is under the 681 limit; the gap to plain (637 vs 550) is within this box's run-to-run spread (live itself 571 vs 511 between the two runs); this diff adds no per-render work (only ser/deser of the queue and one deser flag).

## Done
FIXER save-pid-cards done 11/27. SSK posted for 5e0e0d1e; the BIG rv (session_01N1tNP5p71UEmkesbLLD9jC) merges the final save stack. No handover needed.

## REVIEW (BIG opus rv session_01N1tNP5p71UEmkesbLLD9jC, depth 5, START_CTX ≈ 3 %; 11/27/2026)
PRIORITY #1 CHECK ('save-pid-cards' / 'evcN' / 'EVCW' / 'evn'): OD 0 | ledger 0 | main: jevc.js evcPaint / EVCW (LIVE pace-all), no evn | review/*: save-fix-stack-rv15…rv23, save-pid-cards 5e0e0d1e | claims: this session + rv22/rv23 fixer 2WGctyD7 (told 03:55Z) — reused everything, nothing rebuilt.
**Head: review/save-pid-cards-rv5 `4e27a5887e75251c46a8a485c95c7b13e98b9434`** = save-fix-stack-rv23 15bd0e29 (LAND READY) + fixer 5e0e0d1e + reviewer fix b385df9b. Merges on the way: rv18 → -rv 04609c3d, rv20 → -rv2 6a202157, rv21 → -rv3 6bb373ba / -rv4 b385df9b, rv23 → -rv5. Every merge: only built index.html / sw.js conflicted (rebuilt); no save stack step between rv15 and rv23 touches j3 serM/deserQ, j68 evGate/EVLAST, jroute/jtsb deserQ wrappers.
Diff vs rv23 (source): j3.js +12/-2, j68.js +13/-1, jroute.js 1, jtsb.js 1 (fixer) · **jevc.js +10/-1 (REVIEWER CODE)** · dev/test/save-pid-cards.js (fixer; reviewer: test setup for the jevc cap + SPC_P progress), dev/test/save-evc-onscreen.js (new, reviewer), dev/test/lib/device.js CTM_ROOT.

### Fixer diff — checked
- LAW 6c (no card lost / duplicated): pidX writes only plain fields (≤ 1500 chars each, no code, no person objects — /"alive|rel|sid"/ skipped, never h/opts/who/pp/pid); deserQ puts them back only where the rebuilt card has no such field → nothing on the card is made twice, options are rebuilt by mkP against the loaded world (no stale closure). evl: written only when Q[0] === EVLAST and optional; given back only to the same pid / rk / title → a card answered before the save never comes back (ANSWERED row). Old saves (no x, no evl) load as before.
- LAW 4 one core: no number, no BAL key. LAW 7 wording: none. Kit: none.
- LAW 11 field family scan (every Q.push/unshift of a pid card in dev/build/j*.js): 20 top-level fields (t pid h opts pp who cls headArt optLayout stage showOut onClose kit must entp qtags art evId ky ev) — all go through the one pidX rule (onClose = function → skipped, rebuilt by its maker where it has one). deserQ wrapper family (rt, tsb, tsbPet, menEnc, HTFULL, kc3, jqsave $full, j68 e68Fits): only rt / tsb retitled → both honour __ts now; the others never touch t.
- ser/deser wrap order: j68's E68LD / evl wrap is inside every later deser wrapper; the evl give-back runs before deser returns, so the j6 showModal → evGate after load sees EVLAST. jevc d.W uses serM → held pid cards carry x too.

### NEW, same family (pre-existing on plain rv21 / rv23; fixed here, LAW 11)
jevc daily big-event cap (LIVE pace-all, not on rv15 when the fixer started) counts the card ON SCREEN by `m.evcN` = page memory. A generator card (knSell «Có người bán tin» {rk,ra}) comes back from the sổ without it → after a TRUE reload evcPaint saw a NEW big card of a full day (visit 1) and moved the card she was looking at OFF screen into EVCW (later day; dropped after BAL.evc.wait = 3 days with no room). Plain rv21: `Q [] · EVCW [«Có người bán tin»]`. (pid cards were already covered: j3 x carries evcN.) Likelihood có thể (every reload with a visit / Kỳ ngộ / opt generator card on screen on a full day), weight vừa (card leaves her screen, can be lost), seen by save-evc-onscreen.js.
**Reviewer jevc.js hunks (for Foreman B's independent check):**
1. `let EVCLD=0;` + `evcPaint(){if(!evcOn()||EVCLD)return;…` — the paint gate never runs while a sổ is being rebuilt.
2. ser wrap: `delete d.evn; if(Q[0] && evcToday(Q[0])) d.evn={t,k:evcKind,n:evcN}` — the on-screen card's day mark goes into the sổ.
3. deser wrap: `EVCLD=1` around the inner deser; then `if(d.evn && Q[0] && !Q[0].evcN && same t && same kind) Q[0].evcN=d.evn.n` — the same card gets its mark back, so the j6 showModal after load leaves it on screen. Old saves (no evn) as before; the cards behind Q[0] are capped exactly as in play. No number, no wording, no draw.
Test setup fix (TEST ONLY): save-pid-cards.js clear() also resets EVCW + S.evc (a fresh day), where()/saved() count EVCW / sổ W as «held». Without it the new base SKIPped 721 kinds («not open after push» = the cap held them).

### Gates
| gate | result |
|---|---|
| save-pid-cards.js base / fix / MUTATE (Fold, 10 named kinds; base = plain rv18) | base FAIL 3 (pact reload2 lost, DECO lost, PROD tsbBul retitled) · MUT1 (no EVLAST give-back) FAIL 2 · MUT2 (no x give-back) FAIL 3 · fix PASS |
| save-pid-cards.js full family, rv5 4e27a588 | Fold **281 PASS / 0 FAIL** (SKIP 476) · iPad **281 / 0** (SKIP 476) — same as the fixer's table; also rv4: Fold 281/0, iPad 281/0 |
| save-evc-onscreen.js (new) | plain rv21 FAIL (card in EVCW) · MUTATE (hunk 3 removed) FAIL · rv4 PASS 2/2 · rv5 PASS 2/2 (Fold + iPad) |
| save-residue-probe Fold s1 / iPad s1 (rv2) | SAVE-RESIDUE PASS / PASS (0 cards lost) |
| save-death-rebirth | rv18 6/6 · rv2 6/6 |
| save-unseen-lists fold,ipadAir 1 | rv3 32/32 · rv5 32/32 (rv18 31/32: flip-year-0s-s2 iPad lost «Y phục dự Tết», a dc rk card; re-run 3/3 PASS on plain rv18 and on rv2 → flake) |
| save-boundary-reload fold,ipadAir 1,2,3 (rv3) | 22/24 — the 2 = «day seed 1 SCREEN NOT FREE», 0 moments sổ ≠ screen (known test harness, rv r8) |
| knsell-remake | rv3 PASS (7 cards) · plain rv18 PASS (21) · rv2 «0 cards» (this life had no seller: the test's world draw, not a card fault) |
| inv-stack-scan.py | RAW 0 (rv2, rv5) |
| look-dedupe | rv3 = plain rv21 (6 rows, rv21 flips the «Tâm trạng P 1» row 5/6/8) · **rv5 PASS ×2** |
| quickcheck ALONE rv5 | CORE GATES PASS (13 hooks incl. 90 button-crawl, 92 look-dedupe), open 2177 ms, old save ok. Perf run 1: tab 673/480 FAIL; run 2 (--runs 5): tab 554/579 ok, buổi 3596/1197 FAIL. Plain rv23 --runs 5: QUICKCHECK PASS, buổi new 4170/1483/4188/1323/1128, LIVE 1378/1229/4257/4459/1217 → the ~4 s buổi comes and goes on LIVE and plain rv23 alike (life-dependent), not this diff |
| coop-e2e SWAP0 (local Worker, rv5) | **143/143 PASS** (0 timeouts) |
Note: two save-pid-cards runs in parallel were OOM-killed (cgroup; one page 5 GB). The sổ stays ~130 KB through the run (SPC_P=1 prints it); the page heap rises and falls over ~600 true reloads in one browser (177 → 1280 → 553 MB) — test-harness memory, not a save growth. Run one device per process.

### Verdict
**PASS → LAND READY review/save-pid-cards-rv5 4e27a5887e75251c46a8a485c95c7b13e98b9434** (BIG; save; lands right AFTER save-fix-stack-rv23 15bd0e29; FF onto 15bd0e29; Worker deploy: no). **Reviewer wrote game code: jevc.js 3 hunks above (evn / EVCLD) → Foreman B independent check before relay.** If the save stack moves again (rv24…), re-merge = built files only (rebuild) + save-pid-cards + save-evc-onscreen + SUL + look-dedupe + quickcheck alone.
Open (not made worse): j68 evGate / jevc evcRelease still let a held optional CHOICE card go silently when the hold is full / too old (evDropInfo logs notices only) — pacing by design, owner's pacing rules. Scratch shots: none kept; worktrees in /home/user/wt (pid*, base*, mut*, ho) are scratch.
