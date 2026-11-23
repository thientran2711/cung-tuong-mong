PRIORITY #1 CHECK: OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 (sh dev/tools/prio1.sh "coop-famops-t1 review"; row N12)

# E52r review — coop-famops-t1 (N12, BIG co-op) — PASS

depth 1 · reviewer-lander E52r · foreman E ROOT session_01DgYSWn3UrQT4ne326ZguM3

- Under review: review/coop-famops-t1 b4050ca3479fa5ddf124ec7bb02698833d3914d8 (E44h). Fixes: T1 festival stale diff (r2: f7Snap / fxFin7 / b4Wrap deferred branch), T5 market buyer never v.coop + ilTake → npcToFriend, T6 NPC gift outside a diffed call → COOPW.npcToFriend, Kỳ ngộ «ret» lead (famSweep skips the __rt mark), T8 npwAsk actor guard.
- Landed head: **review/coop-famops-t1-r e74b0808c526e279075818831e62ce00ec4dbc88**, base **LIVE 78324353** (clean FF: LIVE is ancestor).
- Merges: 76b5533f (t1 + LIVE 5db0422e), then e74b0808 (+ LIVE 78324353). Both times only index.html/sw.js conflicted → rebuilt (assemble.py + build_site.sh); assets.json = LIVE byte for byte. Code-file overlap checked file by file: the LIVE deltas (art: j3/j8/j89/j93/jclose/jdisp/jend/jfx/jfxkit/jge; outing: jevban/jkitpage/jpres/KIT.md/outing-art.js) touch none of the t1 files → no hunk overlap.
- vs-LIVE files (8, +312/−24): dev/build/jcoopworld.js, dev/build/jil.js, dev/build/jagwhy.js, dev/build/jagwhyg2c.js, dev/test/coop-famops-unit.js, dev/test/coop-lost-scan-traced.js (new), index.html, sw.js.

## Gates (run ALONE on e74b0808 unless marked)
| gate | result |
|---|---|
| coop-famops-unit | PASS 46/46 (on LIVE 5db0422e with the t1 test file: exactly 7 FAIL = 21, 21b, 22, 23, 23b, 24, 25 — each fix proven) |
| coop-e2e Fold host | 141/141 |
| coop-e2e COOP_SWAP (iPad host) | 141/141 |
| coop-b1 | 42/44, 42/44, 44/44 over 3 runs. The only FAIL rows are step 8 «B gained it / A lost it» when B's laydo is refused «Người cùng cung…» (j9.js:108 sameHouse: random residence placement puts both seats in one house). Run 3 (different houses) 44/44. LIVE control 78324353: 44/44 (different houses) — same coin flip, not a t1 fault |
| quickcheck + old save | PASS (old save ok; perf new/live render 257/220, tab 406/454, buổi 1248/1386 ms; core gates PASS) |
| role-parity ×2 | ALL PASS, ALL PASS |

## 76-week traced scans (LOST_DBG=1, dev/test/coop-lost-scan-traced.js, on 76b5533f = same code as e74b0808)
| run | dup / vanish | other FAIL rows | friend traffic |
|---|---|---|---|
| SEED 9001 | 0 / 0 | stall only (#next / week / buổi advanced) | A.npc 45, A.steal 11, A.plant 9, B.steal 6 … |
| COOP_SWAP | 0 / 0 | stall only | A.npc 32, A.steal 23, A.plant 15, B.steal 8 … |
| default 4242 | 0 / 0 | stall «Chờ hảo hữu…» ×2; friend-traffic row FAIL: A.nofriend 76 (host had no living friend entry this room; B side traffic ran) | B only |
| 4242 rerun | 0 / 0 through w39 (cut by the 50-min timeout) | stall rows = the LIVE control's | — |
| LIVE 5db0422e 4242 CONTROL | 0 / 0 | 15 stall rows + merged weeks 71/76 | full |

The A.nofriend run: a 4-week probe of the same script on t1-r showed the friend entry present and alive from w0, with traffic; t1 touches no code that builds her entry → a pairing hiccup of that room, not a t1 fault. Stalls are LIVE twins (the control has more). Each run logged famMiss «add: already hers» ×11, all absorbed on her seat (finding a).

## Laws
- Law 6c / law 1 (real objects, two-way): no dup, no vanish in any scan; every piece keeps its iu; both seats gated; old save PASS; rooms safe (e2e both seats).
- Law 4: no new number. Law 7: no new player word (npcToFriend reuses the existing line «Được ban X»).
- Law 11 sibling roads: judged below.

## Findings (none blocking)
- (a) TICKET — double «add»: ilGuard wraps rivalsMonth OUTSIDE b4Wrap (jil assembled after jcoopworld), so after b4in drops, npcToFriend sends a second «add» for a piece b4Ops already sent (probe: adds 2 for 1 piece). Her seat drops it by iu (jcoopworld famApply «add: already hers»); debug noise only. Fix: gate npcToFriend by IL_SENT / iu already sent this turn.
- (b) TICKET — T8 makes ilConf/ilBack never pick her entry, so her pieces confiscated into the host box have no road back to her (stranded on LIVE too). Traceable, but law 1 wants a road.
- (c) TICKET (successor row, T9 family) — actor picks outside npwAsk can still make her entry the actor: j8.js:424-425 maidMonthP buyer (pool=others(p) includes v.coop → maidTheft/ap on her entry), and mindPickBy pools at j13.js:39, j20.js:17, j28.js:56, j8.js:469 (liveRivals(true)/consorts/others). All LIVE twins.
- (d) NOTE — the __rt mark could be set only when a «ret» was really routed; theoretical edge (loWeek temporary done marks), covered by her own expiry.
- (e) NIT — npcToFriend always sends why:"" so ilTake reasons («sửa xong», «xin lại») show as plain «Được ban X».
- (f) NOTE/possible ticket — a deferred festival plus a host reload loses CW.f7, so that prize is not sent (pre-existing).

Verdict: PASS → LAND READY review/coop-famops-t1-r e74b0808c526e279075818831e62ce00ec4dbc88 on LIVE 78324353.
