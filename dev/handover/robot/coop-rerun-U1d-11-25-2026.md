# U1d co-op rerun (patch editor + runner) — 11/25-26/2026

Runner: session_01N1tNP4mKJ9CMs3b6NsHeqP (depth 1). Coordinator: Foreman B ROOT 2 child 1 (session_01N1tNP3L4UTSEdfxqf2oV4h; ROOT 2 3oeufPEZ rolled over 02:52Z).
Game = stack review/robot-coop-stack-u4 7959f1b5 (LIVE 5e013076 + B co-op lands), build b0cf6e61f03b (PROVISIONAL). Harness = 5edf09f6 + shared patch realtap-B-5edf-patch.diff.

## Result: 0 valid segments (B still 0)

| room | seed | seats | harness | result | cause |
|---|---|---|---|---|---|
| CNBE | 127 | Fold host / iPad guest | #15 | INVALID infra | my background worker + static (default 30 min tool limit) died at ~30 min |
| 9FVJ | 128 | iPad host / Fold guest | #17 | INVALID | Fold GUEST renderer wedged at buổi 73 (native spin, anon 2.3→8 GB); evidence saves 0529b8046 u1d/s128-9FVJ-guest-freeze |
| 643U | 129 | iPad host / Fold guest | #20 | INVALID infra | background servers killed ~90-110 min after start despite timeout 7200000 (buổi ~70) |
| DUMQ | 130 | iPad host / Fold guest | #21 | INVALID | same wedge, buổi 73 right after .dlg «Chương 1 khép lại» «Lui» (taplog); saves 416858c70 |
| DXT7 | 131 | iPad host / Fold guest | #22 | INVALID | same wedge, 3rd of 3, DOM nodes ~360k before it; saves 4131d134b |
| (see end) | 132 | iPad host / Fold guest | #22 | MITIGATED run, see below | extra save+reloads RELOAD_AT=8,15,28,…,112 |

## Patch history (all pushed; each cumulative on clean 5edf09f6, round-trip verified)
- #16 hang-grabber on SEATHANG (CDP pause stack + heap + RSS, hangcap-<seat>.txt) — from freeze investigator.
- #17 + seat localStorage ctm-coop-* in hangcap.
- #18 + stuck dump key buildStamp {CTM_BUILD, kszBodyFit3, dlgKszbs, dlgCls, k3right{oy,sh,ch,st}}. Verified live (3FH8 dump).
- #19 unstick: never taps leave-type buttons in co-op; after a lvl<3 unstick tap, if #title is visible → auto-rejoin (Cùng hảo hữu → Trở lại phòng).
- #20 unstick never taps anything on layer #coopfz in co-op (its ✕ = LEAVE ROOM). Real cause of U3c 9QRN + 3FH8 (host landed on bare #title). Not a game bug.
- #21 taplog-<life>.txt: every tap appended at once (exact last tap before a wedge).
- #22 per-seat 60 s HeapProfiler.collectGarbage + Memory.getDOMCounters in hangcap.

## Findings
1. «Tin báo» options unreachable (AFBX dump u3r/AFBX, #14): .dlg lacks .kszbs; .k3right computed overflow:clip (all.js:80097 `.dlg.kszlive .k3right{overflow:clip!important}`) sh 1274 / ch 714; option row y 1333/1443 in vp 1000, hit = #modal → a finger cannot reach it = KIT BUG #3 signature. Fix f6e81ca8 (.kszbs via kszBodyFit3) is in LIVE 5e013076 and u4 (buildStamp kszBodyFit3='function'). If a clipped «Tin báo» repeats on a build WITH f6e81ca8 and dlgKszbs=false → write «FOR MAIN: Tin báo kszBodyFit3 not re-run when the list grows live» (popup grew 8→20 tin while open). Not yet seen on u4. The seed-126 stuck (U1c) was a different case (#mb real wheel scroller) = harness, fixed by #15.
2. 9QRN / 3FH8 (U3c): harness unstick left the co-op room (✕ of #coopfz). Fixed #19/#20. Not «Gửi».
3. PAGE FREEZE (3 of 3 u4 rooms, Fold GUEST, buổi 73, right after closing «Chương 1 khép lại»): retained Blink nodes leak (guest 4k @60 s → 25k @360 s → 145k @661 s → 340k @2762 s → 360k @3061 s, listeners to 18k), then renderer main thread spins in native code (CPU 100 %, anon RSS +0.3 GB/min, CDP pause/evaluate/heap time out, reload/close never return). Freeze fixer 2Ppg85FwQYT2eP9Re matches its J2SH/rr1 repro. Until fixed, no u4 room passes ~55-60 min.
4. Kit hit-area (known family, not new): .dlg «Ghi chú» noFreePoint (chip span.khap.kgl.kfx covers it); .kmov «?» under img.kfr; «Nghỉ ngơi» cover zero size; «dead close» «Tin trong cung buổi này» «Lui».
5. INFRA: background Bash servers (worker, static) are killed by the tool ~90-110 min after start even with timeout 7200000 (30 min with the default). Restart worker + static at least hourly; a ~3 s bounce is invisible to the seats (WS reconnect).

## Setup / recipe
Worktree /home/user/wt/u4 of review/robot-coop-stack-u4; copy 5edf09f6 dev/test/{realtap,robot-rt,robot-rt-coop}.js then `patch -p1 < realtap-B-5edf-patch.diff` (never commit it); `bash dev/site/build_site.sh`; `cd coop/worker && npm install && npx wrangler dev --local --port 8787 --ip 127.0.0.1` (run_in_background timeout 7200000); static server (node, any) on :8080 serving the worktree; run `COOP_URL=http://127.0.0.1:8787 RELOAD_AT=8,15 SEG_MIN=120 SEG_YEAR=2 node dev/test/robot-rt-coop.js http://127.0.0.1:8080/index.html <out> host=ipad guest=fold kiep=1 seed=<n> tag=u4s<n>`. Seeds used 101-132 (+900-902) → next 133+.
Rule recap (copy to the takeover prompt): ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217); trigger START_CTX % + 25 % of the window, never above 60 %. LINEAGE: coordinator opens the successor; depth limit 8.
