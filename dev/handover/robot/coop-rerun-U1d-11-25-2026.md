# U1d co-op rerun (patch editor + runner) — 11/25-26/2026

Runner: session_01N1tNP4mKJ9CMs3b6NsHeqP (depth 1). Coordinator: Foreman B ROOT 2 child 1 (session_01N1tNP3L4UTSEdfxqf2oV4h; ROOT 2 3oeufPEZ rolled over 02:52Z).
Game = stack review/robot-coop-stack-u4 7959f1b5 (LIVE 5e013076 + B co-op lands), build b0cf6e61f03b (PROVISIONAL). Harness = 5edf09f6 + shared patch realtap-B-5edf-patch.diff.

## Result: 1 candidate-valid segment (s134, Fold host / iPad guest); Fold GUEST rooms wedge at buổi 73 (see Findings 3)

| room | seed | seats | harness | result | cause |
|---|---|---|---|---|---|
| CNBE | 127 | Fold host / iPad guest | #15 | INVALID infra | my background worker + static (default 30 min tool limit) died at ~30 min |
| 9FVJ | 128 | iPad host / Fold guest | #17 | INVALID | Fold GUEST renderer wedged at buổi 73 (native spin, anon 2.3→8 GB); evidence saves 0529b8046 u1d/s128-9FVJ-guest-freeze |
| 643U | 129 | iPad host / Fold guest | #20 | INVALID infra | background servers killed ~90-110 min after start despite timeout 7200000 (buổi ~70) |
| DUMQ | 130 | iPad host / Fold guest | #21 | INVALID | same wedge, buổi 73 right after .dlg «Chương 1 khép lại» «Lui» (taplog); saves 416858c70 |
| DXT7 | 131 | iPad host / Fold guest | #22 | INVALID | same wedge, 3rd of 3, DOM nodes ~360k before it; saves 4131d134b |
| MVGW | 132 | iPad host / Fold guest | #22 | ABORTED at ~3 min | switched to the u5 test below (MITIGATED schedule RELOAD_AT=8,15,28,…,112 approved by child 1, never completed) |
| RZZJ | 133 | iPad host / Fold guest | #22 | INVALID | game = UNREVIEWED variant u5 = u4 + ee0824f4 jinv observer fix (build 2dbe808addd5): Fold guest STILL wedged at buổi 73 after «Chương 1 khép lại» Lui (85k nodes, 2.7 GB); saves 493dbca79 |
| Y59K | 134 | **Fold host / iPad guest** | #22 | **SEGMENT, 0 stuck — CANDIDATE VALID** (u4 b0cf6e61f03b PROVISIONAL) | both seats «segment closed why:year» at 83 min, host buổi 122 / guest 121 (year 2), taps 3037 / 2623, stuck 0, SEATHANG 0, jsClicks 0, 2 save+reloads (buổi 8, 15) each, passed buổi 73 + «Chương 1 khép lại». Flags: infra bounces worker 05:22:50Z (~10 s) + static 06:06:07Z (~3 s); host 10× «light unstick ✕ on #modal «Lui» left the room → auto-rejoin» at buổi 50-60 (all healthy rejoins, cause: host waiting «Chờ hảo hữu…», fixed by #23); dead buttons 15 / 37, bugs 28 / 21 (Ghi chú chip family). Saves d1a158de5 u1d/s134-Y59K-SEGMENT/ |
| F33E | 135 | Fold host / Fold guest (isolation) | #24 + #25 | INVALID | Fold HOST wedged at buổi 61 with a FLAT DOM (17.7k nodes, JS heap 103 MB) → renderer RSS 1.3 → 4.2 GB runaway; not role, not leak size; saves 86f849c02 u1d/s135-F33E-fold-host-freeze |
| FT47 | 135b | Fold host / iPad guest, seed 135 | #27 (trace) | KILLED 08:11Z, no wedge | passed buổi 61, 73, reached buổi ~75 (80k nodes, 1.7 GB), V8 cpu_profiler + memory-infra trace was running; killed by child 2's order (root already named by the fixer: MutationObserver loop jksize.js:760 → kitScrollCues) |
| — | 136, 137 (coop) | Fold host / iPad guest | #26 | REPLACED within ~3 min | restarted with a better capture (#27) |
| solo | 135-137 | SOLO Fold 755x1000, bare LIVE fa8da73cecdc vs LIVE + c20aaa6e (jinv/jksize) 8dde70d62141 | #27 | **1 wedge in 5 base rooms, 0 in 3 fix rooms** | first base seed-135 run WEDGED at buổi 63 (last tap «Sang buổi», saves e6cd2e040); base 135 rerun buổi 90, base 136 / 137 buổi 100 clean; fix 135 / 136 / 137 buổi 100 clean (fix 137: one PRE-START «stuck» = title art slow boot under 4-room load, life ran on). Details saves a47b99a95 u1d/solo-fold-live-vs-fix/. Base 138/139 started and killed after ~1 min (child 2: proof enough) |

## Patch history (all pushed; each cumulative on clean 5edf09f6, round-trip verified)
- NEWEST #27 (handover 79bd2ad5b, sha f40a56ff): #26 V8 cpu_profiler trace per seat from buổi 57 read out at the first stall (hangcap-<seat>-trace.txt) · #27 + memory-infra + blink.user_timing (20 s dumps), 60 s wait then Tracing.end, raw hangcap-<seat>-trace.json, rolling ring-<seat>-N.png screenshots from buổi 59. Solo tweak (local only, NOT in the patch): robot-rt.js launch arg `--remote-debugging-port=$RT_CDP_PORT` + scratchpad detector soloWatch.js (silence >90 s & CPU >50 % or >240 s → proc info + CDP trace read-out; a Tracing.start issued AFTER a wedge never delivers, start it before).
- #25 (handover 660d283ae, sha 85909494). #23 «Chờ hảo hữu…» waiting does not count as same-screen (no light unstick that leaves the room) · #24 host=fold guest=fold works (per-role profile dir) · #25 every harness JSHandle disposed at the top of each loop turn (freeze fixer: undisposed handles kept detached DOM alive as DevTools remote objects = fake leak).
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
3. PAGE FREEZE (4 of 4 rooms with the Fold as GUEST — s128/s130/s131 on u4, s133 on u5; Fold HOST rooms RRRG, 75TG (U3c) and s134 pass; root named by the freeze fixer: jinv kitInvFit per-grid ResizeObserver on #panel, fix review/coop-freeze-kmrew ee0824f4, + harness handle leak (#25); the Fold-guest spin at «Chương 1 khép lại» is still open: Fold guest, buổi 73, right after closing «Chương 1 khép lại»): retained Blink nodes leak (guest 4k @60 s → 25k @360 s → 145k @661 s → 340k @2762 s → 360k @3061 s, listeners to 18k), then renderer main thread spins in native code (CPU 100 %, anon RSS +0.3 GB/min, CDP pause/evaluate/heap time out, reload/close never return). Freeze fixer 2Ppg85FwQYT2eP9Re matches its J2SH/rr1 repro. Until fixed, no u4 room passes ~55-60 min.
4. Kit hit-area (known family, not new): .dlg «Ghi chú» noFreePoint (chip span.khap.kgl.kfx covers it); .kmov «?» under img.kfr; «Nghỉ ngơi» cover zero size; «dead close» «Tin trong cung buổi này» «Lui».
5. INFRA: background Bash servers (worker, static) are killed by the tool ~90-110 min after start even with timeout 7200000 (30 min with the default). Restart worker + static at least hourly; a ~3 s bounce is invisible to the seats (WS reconnect).

## Setup / recipe
Worktree /home/user/wt/u4 of review/robot-coop-stack-u4; copy 5edf09f6 dev/test/{realtap,robot-rt,robot-rt-coop}.js then `patch -p1 < realtap-B-5edf-patch.diff` (never commit it); `bash dev/site/build_site.sh`; `cd coop/worker && npm install && npx wrangler dev --local --port 8787 --ip 127.0.0.1` (run_in_background timeout 7200000); static server (node, any) on :8080 serving the worktree; run `COOP_URL=http://127.0.0.1:8787 RELOAD_AT=8,15 SEG_MIN=120 SEG_YEAR=2 node dev/test/robot-rt-coop.js http://127.0.0.1:8080/index.html <out> host=ipad guest=fold kiep=1 seed=<n> tag=u4s<n>`. Seeds used 101-132 (+900-902) → next 133+.
Rule recap (copy to the takeover prompt): ROLLOVER = CONTEXT, NEVER 30 TURNS (owner OD:L1217); trigger START_CTX % + 25 % of the window, never above 60 %. LINEAGE: coordinator opens the successor; depth limit 8.

## FINAL (U1d, 26/11 ~10:10Z; depth 1; coordinator FOREMAN B ROOT 2 child 2 = session_01N1tNP3uEmVZq9qfYDmWJUZ; MAIN CHÍNH 155 session_01V1ZZH2xEpGEfFdnaf8bfYc)
- VALID segment candidate: s134 (Y59K) only (u4 b0cf6e61f03b, Fold host / iPad guest, year 2, 0 stuck; flags above). Freeze: Fold-only page wedge, root named by the freeze fixer (kitScrollCues MutationObserver loop at the Fold viewport, fix review/coop-freeze-kmrew c20aaa6e = scroll-cue own-cue rule + coalesced pass; + ee0824f4 observer leak). Harness fake leak (#25, undisposed JSHandles) fixed.
- All evidence in saves: u1d/s128-9FVJ-guest-freeze, s130-DUMQ, s131-DXT7, s133-RZZJ-u5, s134-Y59K-SEGMENT, s135-F33E-fold-host-freeze, solo-fold-live135-wedge, solo-fold-live-vs-fix (review/robot10-coop-saves).
- Open for the successor / MAIN: (1) u4 coop rooms still need a re-run on a stack that contains c20aaa6e (Fold seats) for further VALID segments; (2) the «Tin báo» clipped-options case (kszbs) did not repeat on u4 (buildStamp kszBodyFit3='function' verified); (3) #23 waiting-on-«Chờ hảo hữu…» fix and #19/#20 leave-room rules are in the patch; (4) ops: background servers die ~90-110 min after start — restart worker + static hourly.
- Machine state at the end: no room running except none (all killed); servers up until their tool limit.
