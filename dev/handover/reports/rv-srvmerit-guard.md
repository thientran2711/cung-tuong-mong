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
