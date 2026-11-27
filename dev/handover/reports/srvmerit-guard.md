PRIORITY #1 CHECK ('srvMerit|S\.srv\.mp|srv guard'): OD 0 | ledger 0 | claims 0 | main 15 | review/* 0 | archive 2 — nothing existing on this crash; reused j2 act / deal, j42 srvCards / srvTalk.

# SRVMERIT-GUARD — «Cannot read properties of undefined (reading 'mp') @ srvMerit»

Branch `review/srvmerit-guard` off LIVE 5e013076. Worker: PROMO-ROOT session_01V1ZZGzXMYdRFgHB23g5qvC, for MAIN CHÍNH 148.

## 1. ROOT
- Stack (LIVE, repro 3/3): `srvMerit` (j42:29 `S.srv.mp=…`) ← card `go` «Học lễ nghi với cô cô» (j42 srvCards) ← runOpt ← **act(i)** (j2:115) — a **cung nữ card played in a consort life** (S.srv absent).
- Why the card was there: the hand of acts (`deck`) is built ONLY by `deal()`. `deser()` (j6:68) does not deal; the title «Tiếp tục» path deals after it (j6:84), the co-op rejoin deals (jcoopworld:1471), the kc «Ở nhà» start deals. A life swap that skips deal() keeps the previous life's hand:
  - **game path:** co-op rebirth / new face through `fromCanon` (jcoopworld:253 + jcoopthinb show:168) — no deal(); a guest who was a cung nữ and comes back as a consort (or the reverse) keeps the old hand until the next buổi;
  - **harness path (where I hit it):** my promo-root replay loaded a robot sổ with deser() and no deal() while the fresh random first life was a cung nữ (≈1/9 of runs → 2/12 replays crashed).
- Not only `mp`: with S.srv gone, the cung nữ acts also throw on `intel`, `watch`, `lvCd`, `af`, `sec`, `lau` (family scan below).

## 2. FIX (one gate, law 11) — commit 45daa0a9
- `dev/build/jsrvguard.js` (new, appended in assemble.py after every module that adds a cung nữ act, before jnolock): every option `srvCards()` / `srvTalk()` return is marked `srvOnly`, its go / run / fail do nothing unless `isSrv()`; `act(i)` and `runOpt(a)` meeting a stale cung nữ hand **deal the hand again for the life she lives now before anything is paid** (act spends khắc before runOpt, so the gate sits on act).
- `j42 srvMerit`: `if(!S||!S.srv)return` (the crash site itself).
- No player-visible text, no number, no UI.

## 3. BEFORE / AFTER
| check | LIVE 5e013076 | review/srvmerit-guard |
|---|---|---|
| dev/test/srvmerit-guard.js (stale hand + family + live acts) | **4 BAD** | **PASS 9/9** |
| stale hand: act() on a cung nữ card in a consort life | throws «reading 'mp'» | no throw; hand dealt again (0 cung nữ cards left, 29 cards); nothing paid |
| family: every cung nữ act (hand + talk to chủ / Hoàng thượng / phi tần / đồng liêu) run with S.srv gone | 18 of 24 throw (runtime scan earlier: 26/33, 27/38 — random world) | 0 of 20 (0/31, 0/32) |
| the same acts in her own cung nữ life | work (Công lao +0.25) | work (Công lao +0.25) |
| replay of the s8 robot sổ over a fresh cung nữ life, 12 seeds × 3 months | **12/12 CRASH** | **12/12 clean**, srvMerit never called without S.srv |
| static S.srv.<x> reads (dev/tools/srv-reader-scan.py) | 468 · 169 guarded on the line · 88 in the act builders (unguarded) · 211 other | 468 · 171 guarded · 88 now behind the one gate · 209 other |
The 209 «other» reads sit in cung nữ-only flows (HUD / Thân phận rows / month ticks / event options) reached through isSrv branches or built per tap; their stored form (Q cards) is rebuilt on every life swap (deserQ / start); `--list` prints them for any later audit.

## 4. GATES
Run one at a time on this box; head 45daa0a9 vs LIVE 5e013076.
| gate | review/srvmerit-guard | LIVE 5e013076 | verdict |
|---|---|---|---|
| dev/test/srvmerit-guard.js (new) | PASS 9/9 | 4 BAD | fixed |
| coop-e2e (alone) | **143/143** | — | PASS |
| coop-guest-maid | 36/40 | 36/40, the same 4 FAIL rows (3a/3b «week advanced for both», 3 «refused (no seat) → her maid is back», «a log line tells her») | = LIVE |
| maid-8tabs | 62/66 | 62/66, same FAIL rows (maid-acts-a consort acts / table switch, both devices) | = LIVE |
| maid-ladder-6 | 11/11 | 11/11 | PASS |
| cnv-age-stay | 16/16 | 16/16 | PASS |
| promote-servants | 19/22 | 18/22 (branch FAIL set ⊂ LIVE's; the extra LIVE row is a random NPC «proud servant leaves») | = LIVE |
| quickcheck core gates G1–G3, time-spill guard, open, old save | PASS | — | PASS |
| quickcheck G4 90-button-crawl | FAIL «Ô lưu → Lui» (fold) | same FAIL on LIVE (checked 25/11 23:02Z, promo-root report) | pre-existing |
| **quickcheck perf, median of 11** | **PASS** · render 252/248, tab 638/616, buổi 2002/1872 ms, tasks>200 26/25 | — | PASS |

## 5. Notes
- Optional follow-up for the co-op owner (not done, behaviour change in co-op): deal() after a life-changing fromCanon (rebirth paths) would remove the stale hand at the source; the gate already makes it harmless.

LAND READY: review/srvmerit-guard (code 45daa0a9 + this report). Independent of review/promo-root (different files: j42/jsrvguard/assemble vs j3/j14/jbal2); built files regenerate on merge.

~96% xong / ~90% chơi được
