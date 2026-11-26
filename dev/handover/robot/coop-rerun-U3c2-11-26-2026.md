# Co-op rerun U3c-2 (session_01N1tNP5oqP6qYRiEcv5KUcm, depth 2, START_CTX ~4%) — 11/26/2026
PRIORITY #1 CHECK ('U3c|coop-rerun'): continues U3c table (dev/handover/robot/coop-rerun-U3c-11-25-2026.md); stack u4 7959f1b5 BUILD OK b0cf6e61f03b; harness 5edf09f6 + patch (#22 -> #23 -> #25).

| Seg | Room | Seed | Seats | Verdict |
|---|---|---|---|---|
| S19 | YRTC | 64 | Fold host / iPad guest, patch #22, RELOAD_AT=20 | INVALID: HOST FREEZE at buổi 61 (~40 min), SEATHANG, renderer RSS 1.4 -> 4.2 GB. Saves u3r2/YRTC |
| S20 | R57X | 65 | iPad host / Fold guest, #22, MITIGATED reloads 8,15,28,40,52,64,76,88,100,112 | INVALID: clean to buổi 105 (~80 min, RSS flat 1.1-1.5 GB), then guest harness «unstick ✕» left the room at buổi 106, no rejoin (#title idle 890 s). Saves u3r2/R57X |
| S21 | XCWQ | 66 | Fold host / iPad guest, #23, MITIGATED | INVALID: HOST FREEZE again at buổi 61 (reload at 52 did not help), RSS 3.7 GB; last dialogs Tết Trung thu / Lễ tấn phong / Kỳ nguyệt sự. Saves u3r2/XCWQ. Pre-#25 harness leaked one subtree per tap, so freeze may be harness-assisted |
| S22 | 6FEV | 67 | iPad host / Fold guest, #25, MITIGATED reloads (10) | **VALID SEGMENT (MITIGATED)**: reached buổi 123 (~75 min), stuck 0 both seats, 0 SEATHANG, 0 page freeze, jsClicks 0, all 10 scheduled reloads done both seats, passed buổi 61 clean. Guest left room 6x via harness unstick and rejoined each time; dead buttons guest 19 (kit hit-area noFreePoint: .dlg «Ghi chú», chips «Danh hiệu 0/35»), host 0. Saves u3r2/6FEV |

Totals (U3c-2): 4 runs, valid 1 (MITIGATED). Combined with U3c S18 RRRG: B valid segments 2.
Note: local Worker/static die ~90-110 min; restarted at 04:03Z, 05:28Z (between rooms).
| S23 | F3XF | 66 | Fold host / iPad guest, build u5b = u4 7959f1b5 + jksize/jinv from c20aaa6e (BUILD OK ce85641680bc), #25, UNMITIGATED (RELOAD_AT=20) | **VALID SEGMENT / B FREEZE-FIX VERIFY PASS**: year 2 (host buổi 123, guest 122, ~85 min), stuck 0, 0 SEATHANG, passed buổi 61 + 73 (XCWQ seed froze there before), RSS ~1.2-1.8 GB. Saves u3r2/F3XF @f1251c0a |
| S24 | 54AS | 68 | aborted by Foreman order at buổi ~2 (switched to verification) | not counted |
