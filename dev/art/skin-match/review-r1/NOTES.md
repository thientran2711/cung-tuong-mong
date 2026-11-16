# review/skin-audit-r1 — independent art review of review/skin-audit @ 704b8f669 (D52)
Scripts here (read-only checks, no image written to the CDN by the reviewer): meas.py (worker measure.py/seg.py on a dir of files), zoom1.py (face + hands crop tiles), sheet1.py (upper-body contact sheet), facechk.py (stress-applies fix.apply with a +6/+6 shift; face band must stay unchanged), ingame.js (755x1000@2 stage shot of a given fig).
Results: see dev/handover/reports/review-skin-audit-r1.md on the docs branch.
Method note: the pre-fix pixels no longer exist anywhere (images are CDN-only, overwritten in place), so "before" = worker's logged Lab stats (log/fix_audit2.jsonl); "after" = LIVE CDN files re-measured by the reviewer.
