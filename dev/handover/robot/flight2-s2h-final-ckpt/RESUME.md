# flight2-s2h FINAL ckpt (written before the QuotaExceeded line, F ROOT 7 c3 rule: save >= 5.1 MB)

- life flight2-s2h, persona cautious, dev fold, seed 2026112560, started 2026-11-27T16:17Z.
- ckpt taken 2026-11-28T01:49:20Z (runner pid 4284, alive, still playing): global buổi ~2560, year 18, age 35, rank 0 (lãnh cung since year 2), Sức 96, illness S.ill = {k:'tambenh', st:1, known:true} (tâm bệnh, stage 1; cure not taken yet), save 5130741 chars.
- GAME BUILD (pinned, served locally): {"s":"d9ca7892+","b":"86170222adab","t":"2026-11-27T12:32Z"} — resume ONLY on this build: `dev/test/rt-serve-build.sh --b 86170222adab <port>` (pin=1 does it).
- Harness: review/robot-realtap f65d019b (pin=1). Resume: copy flight2-s2h.ckpt.json to <out>/flight2-s2h.ckpt.json, keep <out>/profile-flight2-s2h, run `node dev/test/robot-rt.js <LIVE url> <out> dev=fold bot=cautious seed=2026112560 life=flight2-s2h resume=1` (guard5.sh in this dir). NEVER resume after LIFE DONE.
- Known: this build predates bd47c753 (QuotaExceeded save loss fixed on LIVE); the stored save stops following the live game at ~5.2 MB. If the save is lost at that line: stop the life as «QUOTA STOP (known, cured on LIVE)» and send LIFE DONE for robot-audit.
- STATUS at the time: bugs 5, stuck 0, dead 0 (runner STATUS line); log in flight2-s2h.log (this dir). Shots stay on the VM.
