PRIORITY #1 CHECK: srvMerit|stale hand|deal after fromCanon — OD 0 | ledger 0 | main: j2:115 act, j2:68 deal, jcoopthinb:165 show / :176 accept (no deal), jcoopthine:90 hand() (deals only on an empty deck or a moved buổi), jcoopworld:889 begin (deals only on an empty deck) | review/*: review/srvmerit-guard only | claims PROMO-ROOT.

# RV-SRVMERIT-GUARD — review of review/srvmerit-guard 034b451e (code 45daa0a9), base LIVE 5e013076

## VERDICT: FAIL 034b451e

The crash itself is gone and the gate is clean code, but the ROOT is not fixed, only one direction of it is hidden (law 11: fix the whole group).

## What was checked (all re-run here)
| check | result |
|---|---|
| dev/test/srvmerit-guard.js on branch | PASS 9/9 |
| same test on LIVE 5e013076 | 4 BAD («reading 'mp'», hand not dealt again, paid, 17 of 23 acts throw) — worker's claim confirmed |
| assemble.py on branch | no diff — built files match source |
| global-names scan (copied from review/lc18-a8-placerules, not committed) | 0 CLASH (jsrvguard only wraps; window.srvGuardTag defined once) |
| merge onto LIVE | branch already sits on 5e013076 (fast-forward) |
| merge-tree onto review/lc18-a8-placerules 9812646a | conflicts only in built files (assets.json, index.html, sw.js) → regenerate; source clean |
| reverse-family probe (scratch, below) | FAILS — see 1–2 |
| coop-e2e / maid tests / s8 replay / quickcheck | not re-run (FAIL found first); re-run on r2 |

## FAIL list
1. **Reverse direction unguarded (same root, law 11).** The root the report names — a life swap without deal() keeps the previous life's hand — applies to EVERY life-specific hand, not only cung nữ cards. Probe (deser of another life's sổ with no deal, exactly as the worker's own test 1, then act() on each stale card), branch 034b451e:
   - consort hand kept in a **cung nữ** life: 22 stale consort cards; «Điểm trang», «Nghỉ ngơi một lát», «Trò chuyện với cung nữ», «Đọc sách giải khuây» **run and are paid** in a cung nữ life (the rest only stop because khắc ran out); «Thỉnh an Thái hậu / Hoàng hậu», «Hối lộ Kính sự phòng», «Cầu tự…» stay on her hand as a cung nữ.
   - kc «ở nhà» hand kept in a **palace** life: 59 stale home cards («Thỉnh an phụ thân», «Xin cha tiền riêng», «Dạo phố chợ»…); «Đọc sách, chép kinh» runs and is paid in the palace.
   - cung nữ hand kept in a consort life: gated (redeal) — the only direction fixed.
   The game path is real: co-op thin guest new face `lifeRes` accept → `show()` (jcoopthinb:165/176) swaps S through CW.fromCanon and never deals; `hand(false)` (jcoopthine:90) deals only when the deck is EMPTY, so the old hand stays until her buổi moves. A cung nữ → consort guest is fixed by the gate; consort → cung nữ, kc → palace, palace → kc are not (law 6: she acts in a life she does not live; law 3 risk when a wrong-life card pays and its effect has no meaning).
2. **Fix at the source, not per card set.** Required: one rule where the life changes — after every life-changing S swap that skips deal() (thin guest `show()` on accept and on the roll preview if its hand is ever shown; any fromCanon that changes origin / isSrv / isKc; deser paths without the j6 «Tiếp tục» deal) the hand is dealt again for the life she lives now. The report's own "optional follow-up" (deal() after life-changing fromCanon) is the fix, not optional. jsrvguard may stay as the defence-in-depth gate and srvMerit's `!S.srv` guard is fine, but generalise the stale test: a hand is stale when it was dealt for another life (e.g. stamp the deck with a life key — origin.k + isSrv + isKc + CW.life — at deal(), and act/runOpt redeal when the key differs), so every direction is covered by ONE gate.
3. **Silent tap (minor, law 3 / feedback).** In a stale hand ANY tap — even on a valid card of her current life — is swallowed: act() redeals and returns, nothing happens and nothing tells her why. With item 2 (deal at the swap) this path becomes unreachable; if the gate stays, deal when the stale hand is detected on render/boot rather than on her tap, or let a valid card of her current life run.
4. **Test must cover the family.** Extend dev/test/srvmerit-guard.js (or a new life-swap-hand test) to the 4 directions: cung nữ↔consort, kc↔palace — stale hand after a swap without deal: 0 wrong-life cards left before she can tap, nothing paid, no throw; plus one co-op thin-guest new-face case (coop-e2e harness) showing the hand is dealt for the new life on accept.
5. On r2 re-run: coop-e2e (alone), coop-guest-maid / maid-8tabs (= LIVE rows), s8 robot-save replay, quickcheck alone (G4 «Ô lưu · Lui» pre-existing), and the merge-tree onto the lander stack.

## Laws touched
- 3 gain–loss: cung nữ direction OK (nothing paid on a refused stale act); reverse directions pay for wrong-life cards → item 1.
- 4 one core: no numbers added — OK.
- 6 real world: acts of a life she does not live run → item 1.
- 9/10 kit/UI: no UI change — n/a. 7 wording: no player text — n/a.
- 11 whole group: FAIL (one of four directions).
- 13 Priority #1: report has the line — OK.

Probe script: scratch only (rev.js: life A hand kept in life B by deser without deal, act each stale card), not committed.

## r2
PRIORITY #1 CHECK ('srvmerit|lifeKey|jsrvguard|stale hand'): OD 0 | ledger 0 | claims: this fixer only (STATUS 02:50Z) | main: j2:68 deal, j6:68 deser (no deal), jcoopthinb:165 show → CW.fromCanon (no deal), jcoopthin:46 TH.reg("deck") (host swaps deck + S per seat) | review/*: review/srvmerit-guard 034b451e only; review/coop-thin-g-land already has the same coop-thin-b round-trip diagnostic line (reused verbatim). Reused: jsrvguard (generalised), kitNotice §42.2, srvmerit-guard.js harness, coop-thin-b new-face flow.

**SSK review/srvmerit-guard-r2 917465a3640c6cd4552a385b3ede4de43db6aafc** (base 034b451e = LIVE 5e013076 + r1; origin/main = 5e013076, nothing newer to merge). Fixer B session_01N1tNP638LmnJhHkppg5naw.

### Fix (ONE rule, law 11) — dev/build/jsrvguard.js (same outermost slot in assemble.py)
- `lifeKey()` = origin.k · cung nữ (isSrv) · kc at home (isKc) · her name (a new life of the same kind is another life). No new S field, no number (law 4).
- `deal()` (outermost) stamps EVERY card of the hand with `lifeK = lifeKey()` — on the card, not in a variable, because the co-op host swaps `deck` + `S` per seat (TH.withSeat, jcoopthin:46); the stamp travels with the seat's hand.
- `stale()` = a card of the hand carries another lifeK (unstamped legacy hand: the r1 srvOnly test).
- GATE in `render()` (outermost): stale → `deck=[];deal()` BEFORE the hand is drawn. Every life swap that skips deal() (thin guest `show()` on roll AND accept, any fromCanon / rebirth, deser without the j6 «Tiếp tục» deal, kc «ở nhà» ↔ palace, cung nữ risen) is followed by a render, so no wrong-life card is ever on screen (FAIL 1, 2).
- DEFENCE in `act()` / `runOpt()`: a stale card is never run or paid; the hand is dealt again + drawn + ONE kit notice `kitNotice({id:"life-redeal", line:"Thân phận đã đổi: việc trong buổi đã bày lại theo kiếp này."})` — never a silent swallowed tap (FAIL 3). Inside TH.withSeat (host running the other seat) no render / notice. A card of her current life runs as before.
- Not in the key (law 16, working rules untouched): lãnh cung (deal() already gives the cold hand), cấm túc. srvOnly tagging of srvCards / srvTalk + j42 srvMerit guard kept.

### Tests (FAIL 4) — before (034b451e) / after (917465a3)
| check | 034b451e (MUTATE = r1 jsrvguard) | r2 |
|---|---|---|
| dev/test/srvmerit-guard.js (r1 9 rows + r2: 4 directions × gate/tap + current-life card runs) | **13 BAD** (consort→cung nữ: 22 wrong cards left, 1 paid; kc→palace: 62 left, 1 paid; palace→kc: paid; cung nữ→consort: gate 12 left; every refused tap silent) | **PASS 47/47** (0 wrong-life cards left, 0 paid, 0 throw, notice on each refused tap, a current-life card runs at once) |
| co-op thin guest new face (dev/test/coop-thin-b.js, new row per life: 0 cards of the old life after the game's own accept → render), origins tt, cnv, tt/nha, level 2 | **3 FAIL** (21/21, 21/21, 21 of 27 old cards kept) | **3/3 ok** (22, 9, 68 cards, 0 old) · run 54/54 (one earlier run 53/54: «withSeat round trip after the merged week» — not my rows; 2nd run 54/54; the lander stack added the same diagnostic for that row) |
| s8-style robot replay (scratch, not committed: a sổ deser'd over another life with no deal, then bot play 12 turns; cnv→tt ×6 seeds, tt→cnv ×6) | — | **12/12 clean**, 0 page errors (the s8 sổ itself is not in git, SAVES_NOT_IN_GIT.md) |
| coop-e2e SWAP0 (alone) | 143/143 (r1 report) | **143/143** |
| coop-e2e SWAP1 (alone) | — | **143/143** |
| coop-guest-maid | 36/40 = LIVE | **36/40**, the same 4 rows (3a/3b week advanced, 3 refused → maid back, log line) = LIVE |
| maid-8tabs | 62/66 = LIVE | **62/66**, the same rows (maid-acts-a ×2 devices) = LIVE |
| quickcheck (alone, 917465a3) | — | build ok · core G1–G3 ok · time-spill PASS · open 1998 ms · old save ok · **perf PASS** render 206/230, tab 585/553, buổi 4193/4307, tasks>200 29/25 · G4 90-button-crawl FAIL «Ô lưu · Lui» (pre-existing) · G4 93 press-keep + 95 next-dead FAIL in the loaded full run only → re-run alone: press-keep PASS, next-dead PASS (and PASS on 034b451e) = load flake |
| merge-tree onto review/coop-thin-g-land ec88b0e2 (lander stack tip) | — | conflicts ONLY in built files (assets.json, index.html, sw.js) → regenerate; source clean |

### Shots (looked 3×; CDN img/_review/srvmerit-guard-r2/)
fold-notice.png / ipad-notice.png (consort hand kept in a cung nữ sổ, one tap → hand dealt again = cung nữ cards «Quét sân, lau điện», «Theo hầu chủ»…; kit chip «!» at the top + lit box), fold-panel.png / ipad-panel.png (kit «Tin báo» panel). Fold 755x1000 + iPad 1180x820, 0 page errors. The verdict giver wipes the folder.

### Laws
2/3 gain–loss: a wrong-life card can no longer pay (0 paid in 4 directions) · 4 one core: no number · 6 real world: she only acts in the life she lives · 7 wording: one cổ trang notice line, no % · 9 kit: kitNotice §42.2 only, no new part · 11 whole group: 4 directions + co-op new face + same-kind new life by one key · 12 two devices: Fold + iPad shots · 13: this line · 16: lãnh cung / cấm túc rules untouched.

~97% xong / ~92% chơi được
