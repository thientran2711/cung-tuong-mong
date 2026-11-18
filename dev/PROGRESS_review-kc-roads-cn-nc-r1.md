# PROGRESS review/kc-roads-cn-nc-r1 (reviewer, round 3 of review/kc-roads-cn-nc @ 793cd37)
FAIL — full report: dev/handover/reports/review-kc-roads-cn-nc-r1.md (handover branch). This branch = 793cd37 + origin/main 18fb8252 merged + reviewer fixes:
- merge: assemble.py keeps jkc2.js after jkc.js, before main's new jhouse.js; built files taken from main then rebuilt.
- kc2Lt: home people whose title is a name (Xuân Đào, Bà Tư) keep capitals in the map "người ở đây" line and the relation row (was "xuân đào").
- entry cards: "phong Quý nhân" no longer doubled before her own name (j61 name decorator): jkc2 nc card + jkc tiểu thư card.
- merge regression: main's j2 "Nhập cung" card now shows the rank in a kitRows "Phong" row; the direct-entry selection still wrote into the old sentence, so the card said the ceiling, not the real rank (direct.js 4/9 FAIL). kc2SelDo now rewrites the row (direct.js 9/9 PASS).
- "Vào cung ngay" road cards (jkc + jkc2 nc) promised "phong <ceiling>"; now "thân phận cho tới <ceiling>, phẩm vị định ở kỳ tuyển chọn" (OD:L1250).
- exam hook: window.kcEntryExam(kind, done, info{art,origin,title,note}); contract written at the hook.
Open for the worker: the numbered FAIL list in the report.
