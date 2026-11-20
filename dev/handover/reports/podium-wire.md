# podium-wire — report (GAP OR09, ORDER MAIN ROOT-78 13:02Z, worker of Foreman B)

PRIORITY #1 CHECK: OD 0 | ledger 0 | claims kit-podium-gate (kit side only, KIT §20.1) | main kitPodium j90 + kcPhucPlay jentry.js:71 / jkc.js:513, rivals scored silently in kcEnter jkc.js:547 | review/* review/kit-podium-gate (kit only, now LIVE) | GAP_LIST OR09.
START_CTX ~6 % (estimate). Branch `review/podium-wire` @ **02db04af** (merged origin/main 43fd334f).

## What
- **Design source** OUTSIDE_PLAN §9: "Phúc tuyển: … Thứ muội and friends compete under the same rule, and the podium screen is used."
- `jentry.js kcPhucPlay` `fin`: after her mark is set, `kcFoulBack()` (two-way) + `kcPhucPod()` store the ONE result `S.kc.tt.pod` [{id, raw, place}] + `S.kc.tt.place`; Điện tuyển is queued first (reload-safe), then `kcPhucShow` = `kitPodiumShow` (KIT §20.1) with her + thứ muội + 2 khuê hữu; «Tiếp» → `showModal()` (Điện tuyển). Bots (`__bot`) store the result, no overlay.
- Entries (KIT §20.1 fields only, no private part): `fig` = `kitFigOf(m)` (her real full-body home figure `fig-<fid>-kc-a18`, the same set as hers), `face` = `kitFaceH(kcFace(m),"lg")` fallback, `nameH` = `kitName(m)` (role title), `score` "n phần", hers `sub` "dâng <môn>" / "bị thứ muội ngáng chân".
- **Law 6b / 4**: `jkc.js kcPhucMark(m)`: her art level from her OWN Tài (`BAL.entry.phuc.lv`), mark = `kg82NpcMean(lv)` (the same NPC curve as HER "Để tài nghệ quyết định") ± `sp`, clamp `max`; Đức / house power drawn once (`duc`, `pow`; the sister uses her own house `kcPow()`). Kept on the record (`praw/pduc/ppow`), never re-rolled.
- **Law 11 (whole group)**: `kcEnter` (Điện tuyển of the sister/friends, + the «Nhập cung» card list) now reads the SAME stored marks instead of typed `raw 3+R(6)`, `duc 30+R(30)`, `pow 40+R(30)`. Places that show Tuyển tú results: podium · Nhập cung card (who also entered) · joi why-rows (hers, unchanged) — all from S.kc.tt / the records.
- **Law 1 two-way**: she can "Ngáng chân thứ muội" (jkc cards). A thứ muội with oan ≥ `foul.oan` does the same to her once in the Phúc tuyển week (odds `foul.od + oan/oanDiv`): her Sắc −`foul.sac`, Danh −`foul.danh`, log line + podium sub. Her own two cards now read the same BAL sizes (were typed `-3`; ONE CORE fix, `kcFoulOn`). Friends: she has no card against them → none against her.
- **Law 5**: n/a beyond the board — Phúc tuyển happens once before any rank; the board tier is `BAL.mgTier` occ "tuyen" (unchanged).
- Old saves: a record without marks gets them once (lazy, in kcEnter or the podium); an old S.kc.tt with no `pod` works.
- New BAL: `BAL.entry.phuc={lv:[20,12,5],sp:4,max:10,duc:[30,30],pow:[40,30],foul:{oan:20,od:40,oanDiv:3,sac:3,danh:3}}` (jbal2, commented).

## Tests (all on this branch)
| test | result |
|---|---|
| `node dev/test/podium-wire.js` (new; Fold + iPad: win · lose 4th · tie by Sắc / equal → her · two-way foul / no grudge · kcEnter reads podium marks · old record · bots no overlay · «Tiếp» → Điện tuyển · fits, no %) | PASS 34/34 |
| `node dev/test/kit-podium-tt.js` | PASS |
| `bash dev/tools/quickcheck.sh` @02db04af (build, core gates incl. one-core-guard, old save, perf vs live) | PASS 400 s |
| `node dev/test/undef-scan.js` | PASS |
| co-op: `dev/test/outside/coop-home.js` (home road in a co-op room → kcEnter) | 51/51 |
| co-op: `dev/test/coop-e2e.js` | 68/68 |
| `dev/test/outside/route.js` Fold + iPad (home → Sơ/Phúc/Điện tuyển → palace → reload) | no fail, no page errors |

## Bots (numbers moved) — `node dev/measure/podium-wire-bots.js dev/index.html 60` (≥150 girls / origin)
Girls' Điện tuyển (% out / Đáp ứng), old typed draw → new own marks: tt 47/53→44/56 · dtq 46/54→51/49 · muoi 40/60→44/56 · thd 47/53→50/50 · ch 40/60→39/61 · td 41/59→47/53 (within noise). Mean mark 5.6→5.2. First knob try `lv:[30,12,4]` dropped entry by 7–11 pts → set `[20,12,5]`. Her place when she skips the game (NPC mean): mostly 2nd–3rd, 4th ~20 % — she can really lose; playing well wins.

## Shots (looked 3×; Fold 755x1000@2 + iPad 1180x820@2)
CDN `img/_review/podium-wire/` : fold-win.webp, fold-lose.webp, ipad-win.webp, ipad-lose.webp. First shots showed (a) family faces as big pframes cut at the Fold edge → switched to KIT §20.1 `kitFaceH` + real `kitFigOf` figures; (b) role twice («Khuê hữu» + «khuê hữu») → sub dropped when the name title already says it. Now four equal full-body figures, all columns inside the screen.

## Notes for the reviewer
- No new kit part, no CSS. Files: jbal2.js, jkc.js, jentry.js (+ build), dev/test/podium-wire.js, dev/measure/podium-wire-bots.js.
- Co-op: the podium is a local overlay on the seat's own client (state only, no sync change); coop suites green, but no co-op test drives the Phúc tuyển mini-game itself.
