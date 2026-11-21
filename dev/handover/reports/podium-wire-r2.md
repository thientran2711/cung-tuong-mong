PRIORITY #1 CHECK ('podium-wire'): OD 0 | ledger 0 | claims 8 (B podium-wire 02db04af → rv PASS d6868a02 20/11) | main 0 | review/* review/podium-wire, review/podium-wire-r1 d6868a02 (reused as base) | archive 19. START_CTX ~4 % (get_session reads 0; estimate).

# podium-wire r2 — re-lander M99 (session_01Rc5AsJzz5VENRwKX6fKout)

LAND READY podium-wire-r2 34ddce9aade3ea481479c0ee84a6e3ef76c582ba
(re-merge of a PASS branch, both-sides resolution only; no behaviour change beyond r1 + LIVE.)

Branch `review/podium-wire-r2` = review/podium-wire-r1 d6868a02 + merge origin/main 70375dbf (eb4242d0) + rebuild (34ddce9a).

## Conflicts (merge base eb11e2ad)
| file / spot | LIVE side (70375dbf) | branch side (r1) | resolved |
|---|---|---|---|
| jentry.js kcPhucPlay fin | bot raw `cl(3+R(6),0,10)` → `entBotRaw()`; catch `fin(5)` → `fin(entSkipRaw())` | fin calls kcFoulBack + kcPhucPod, shows podium (kcPhucShow) before Điện tuyển; new kcPhucPod2List / kcPhucShow | branch body + both LIVE substitutions (entBotRaw, entSkipRaw) |
| jkc.js home cards «Kết thân / Ngáng chân / Dò la / Tố» | fail effects moved from `fail:()=>…` into `lf:[…]` lists (Dò la `S.kld+=5` → `["ld",BAL.eff.jkc.kldDl]`) | «Ngáng chân» text reads BAL.entry.phuc.foul, effect = kcFoulOn(mu) | LIVE lines (lf form) + branch's BAL text + `kcFoulOn(mu)` in go |
| jkc.js twin cards «Giúp / Sai tỳ nữ ngáng chân / Sai tỳ nữ nghe ngóng / Rình viện» | same lf move | same BAL text + kcFoulOn | same rule as above |
| jkc.js kcPhucPlay (jkc copy) playArt line | `5` → `entSkipRaw()` (3 places, incl. quick sub text) | unchanged line + new block kcRivalsTT/kcFoulOn/kcPhucLv/kcPhucMark/kcFoulBack/kcPhucPod | LIVE line + whole branch block |
| jkc.js kcEnter rivals | `raw:entBotRaw()` (was `cl(3+R(6),...)`) | real podium marks `kcPhucMark(m)`, `m.pduc`, `m.ppow ?? kcPow()` (BAL.entry.phuc) | branch line (it already reads BAL; LIVE's intent — no typed bot number — holds) |
| index.html / sw.js | — | — | rebuilt (assemble.py + build_site.sh), build line on 70375dbf merge |

## Reviewer flags from r1 — still hold
- BAL.entry.phuc.lv[0] = 11 (jbal2.js:596).
- sister (muoi) ppow = null → kcEnter uses her house kcPow() (jkc.js kcPhucMark).
- grudge foul on her: kcFoulBack called in jentry fin before kcPhucPod.

## Gates on 34ddce9a
| gate | result |
|---|---|
| `bash dev/tools/quickcheck.sh` (core gates incl. one-core-guard, rules-one-source, kit-conform, coop-one-world; time-spill; old save; perf vs live 70375dbf) | QUICKCHECK PASS 703 s · old save ok · perf median new/live render 233/241, tab 554/488, buổi 1135/1603 |
| `node dev/test/law4-typed.js` | 0 typed |
| `node dev/test/podium-wire.js` (Fold + iPad) | PODIUM-WIRE PASS |
| `node dev/test/kit-podium-tt.js` | PASS |
| `node dev/test/undef-scan.js` | PASS |
| co-op `node dev/test/coop-e2e.js` | 124/124 |
| co-op `dev/test/outside/coop-home.js` | 50/51 (best of 3); the one FAIL «A has the home tabs» is PRE-EXISTING on LIVE 70375dbf (same FAIL on LIVE in 2/2 runs); «A sees B» flakes on both LIVE (46/51) and branch (42/51) — worker timing, not this merge |
| Shots Fold 755x1000@2 + iPad 1180x820@2 (win + lose), looked 3× | four full-body figures, medals Nhất/Nhì/Tam, 4th-place strip «Ta đứng thứ 4 trong 4 người · 3 phần», «Tiếp» visible, nothing cut, no % (scratch only, not uploaded) |

Note for MAIN: coop-home «home tabs» fail exists on LIVE — worth a separate fix ticket (not in this scope).
