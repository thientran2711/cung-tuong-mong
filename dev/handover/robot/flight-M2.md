# flight-M2 — one SOLO life, LIVE origin/main, Fold 755x1000, SEED 102, thd_tho (real taps)
Harness: dev/handover/robot/m2/harness (robot.js engine + policy.js, node, Playwright persistent context, touchscreen taps after elementFromPoint hit-check).
Save to resume: logs/save_dump_latest.json (localStorage hclh-save-v2-*, slot 2 = this life).

## Hourly progress
- 08:55Z Y3 T1 age 22 (life real-time 3h45m). 2 true reloads (Y2, Y3) ok; bugs: SOFTLOCK Tin báo clipped options (4 reload escapes), LAYOUT Phụ tuyến clipped, UX odds-chip swallows centre tap. See logs/bugs.jsonl, logs/moments.md
- 11:25Z Y4 T11 age 23 (≈6h15m real). Throughput fixed (opt safe points, early news, mid-year reload). Bugs so far: 4 softlock/clip, save rollback at year rollover (handed to FOREMAN B), UX odds-chip tap. Resume: harness/RESUME.md
- 15:18Z TAKEOVER READY (ctx ~52%): life ALIVE at Y8 T4 age 27 (≈9h40m real, rank Thuần quý phi/..., build f10d269d since Y5 T8, 3 mid-year true reloads ok after Y4 save-rollback bug). Container VM rebooted at 14:42Z (runner died, life intact in ./prof) — restarted 15:17Z. TO RESUME in a fresh container: follow harness/RESUME.md (git checkout origin/review/kit-opts-pack-3 f10d269d for the served build; SAVEFILE=logs/save_dump_latest.json). Open bugs list: logs/bugs.jsonl (SOFTLOCK-TINBAO clip x94 escapes on 0756a05b, LAYOUT Phụ tuyến, SAVE-ROLLBACK-AT-YEAR-ROLLOVER, UX odds-chip tap).
