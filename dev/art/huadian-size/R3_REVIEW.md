# R3 review of huadian-size-r2 (reviewer session, 16/11) — verdict FAIL (see docs branch dev/handover/reports/review-huadian-size-r3.md)
Scripts (all read the live-CDN por files downloaded to a scratch dir; r3_names.txt = the 3060 names tried):
- r3_sheets.py AGE PER  -> forehead contact sheets, 9 cols (t1..t8,tcold) x PER styles for one age (tolerates the damaged lines of log_por.jsonl)
- r3_zoom.py OUT names...  -> 5x forehead zoom montage of the named por files
- r3_measure.py  -> mark width / face width on all live por (uses shrink2.analyze; needs opencv-python-headless)
- r3_twins.py   -> por | fig | hd | tn forehead montage for tw_names.txt (cv2 5.x has no haar: stubbed, uses runfig.match only)
- dev/test/hd-swapped-style-browser.js URL OUTDIR consort:cNN RANK -> 755x1000@2: gives a rival the swapped style, shots of Hậu cung person panel + stage dialog.
Note: dev/art/huadian-size/log_por.jsonl has ~300 lines where two JSON objects were written on one line (json.loads per line fails); load with raw_decode.
