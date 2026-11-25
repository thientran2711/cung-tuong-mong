# Co-op RERUN U2 — runner (sonnet) — 11/25/2026 (06:15Z–15:10Z)

Valid lives / segments: 0. Every room ended invalid (game co-op bugs below). Foreman B child 3 = session_01N1tNP5G9e73inPtyBReKnD.

## Rooms / segments (game sha · harness · device order · result)
| id | game | harness (+patches) | order | result |
|---|---|---|---|---|
| r1 QB46 | LIVE ca5af050 | c29a6b5b + unstick | Fold host/iPad guest | STUCK 06:44Z host endless empty «Tâm trạng · Ninh Thọ» card (known dup bug). No dump. |
| r2 CPZW | LIVE | c29a6b5b | same | runner died, no result |
| r3 TG9Y | fix-6 d16c5300 + local Worker | 4523381f | same | killed after 37 min: ~20 buổi, host stuck «Kính sự phòng ghi sổ», later #title |
| r4 XKG7 | fix-6 c4163a93 + local Worker | 1a29f470 | same | both seats bare #title after 2 stucks (#coopfz); dumps review/robot10-coop-saves 49874d22 u2r/XKG7 |
| r5 4SB8 | c4163a93 | 1ffae8bb | same | stuck ×2 (#coopfz, guest #ktut «Thỉnh an» hidden target); Worker bg-task died once |
| s1 EX26 | c4163a93 | 1ffae8bb + ktut | iPad host/Fold guest | host stuck 15 min #ktut «Thỉnh an Thái hậu» card over «Việc của kẻ hầu» (target hidden) |
| s2 E44M | c4163a93 | 1ffae8bb + ktut + 8-loop «Đã hiểu» | iPad/Fold | stuck 1 (Tâm trạng «Lui» no effect), buổi 31 |
| s3 KHRN | stack 512cfee6 | 5edf09f6 + B patch 3f4ceacd | Fold/iPad | host stuck 15 min on «Tin báo» (24 lines, no ✕ visible) ~buổi 31; dumps a71ca310 u2r/KHRN |
| s4 BPK3 | stack 512cfee6 | + B patch | iPad/Fold | both seats dead 70 min: host «room 2.3 sent 2 in 2», guest «wantB 2:3» ×100s; dumps fb5ac712 u2r/BPK3 |
| s5 UTX8 | stack 512cfee6 | + B patch #4 581c7635 (RELOAD_AT=20,45; reload at buổi 20 done) | Fold/iPad | both seats «night 2 / pull» loop ~15:00Z (cause 3 signature ON the stack incl. fix-5-r1); dumps bbea018a u2r/UTX8 |

## Bugs (NEW unless marked)
- Tâm trạng/«Hoàng thượng để ý» dialogs: «Lui» no effect (known; fix review/button-crawl-fix-2).
- f.rk.split is not a function (known, FIXER PCPORT-RK).
- «Tin báo» dialog with 24 lines, no visible ✕ (s3 KHRN) — NEW.
- Week-2 buổi-3 deadlock host «room 2.3 sent 2 in 2» vs guest «wantB 2:3» (s4 BPK3) + guest stage empty / icon column over header chips / overlapping name labels — NEW (sent to fix-6 r2 as probe).
- «night 2 / pull» loop on stack 512cfee6 (s5 UTX8) — fix-5-r1 does NOT clear it for this seed/order.
- Thẻ «Lời dặn · Thỉnh an Thái hậu hoặc Hoàng hậu» returns after months of play and hides its own target behind dialogs (harness: use «Đã hiểu»).
- Moments: dev/handover/robot/review/coop-rt-U2-r5-{host,guest}-k1-moments.md (partial, no life reached an end → no end-of-life review).

## Pace
~1.5–8 min real per buổi in co-op (two seats wait each other); a life = hours. 41 lives not reachable.

## HANDOVER (runner stops here; state at 15:10Z)
- Harness: review/robot-realtap 5edf09f6 + shared patch realtap-B-5edf-patch.diff (use newest: #5 328e973d sha256 2815021b or later) ; local patches NOT merged: 8-loop «Đã hiểu» fallback (R._kn counter, tap ktut «Đã hiểu» when the same card/target repeats 8 loops).
- Game: review/robot-coop-stack-u3 512cfee6 worktree /home/user/wt/f7 (assemble.py + build_site.sh built), own Worker: cd coop/worker && npx wrangler dev --local --port 8787; static: node /home/user/wt/static.js /home/user/wt/f7 8080 (python http.server and bg tasks die after 2 h — restart both every <2 h, bg timeout 7200000).
- Run: SEG_MIN=120 SEG_YEAR=2 RELOAD_AT=20,45 COOP_URL=http://127.0.0.1:8787 node dev/test/robot-rt-coop.js http://127.0.0.1:8080/index.html <out> host=<fold|ipad> guest=<ipad|fold> kiep=1 seed=<n> tag=<s6…>. Next order: host iPad / guest Fold (alternate), seed ≥ 211.
- Pause rule (MAIN 139): rooms stuck twice on same signature → pause; s4+s5 both stuck at week 2 on the stack ⇒ wait for the fix before more rooms.
- Dumps: review/robot10-coop-saves bbea018a (u2r/XKG7, KHRN, BPK3, UTX8).
- Shots stay on the runner container only (never in git).
