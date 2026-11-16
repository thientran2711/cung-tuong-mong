# facefit: face-fit rows for img/veil-fit.json + img/scar-fit.json (review/facefx-all-r1)
Method: OpenCV Haar frontal-face cascade (alt2, then default) on the picture (por-* whole; fig-* top 22 percent, 2.5x), then the box is derived from the
face rectangle with ratios calibrated on the 1574 existing women's rows (por: cx -0.031, band 0.465, w 0.892, bottom 1.113; fig: 0.043, 0.456, 0.832, 1.102,
as fractions of the face rect). Rotation 0 (eye-line tilt from Haar eyes was worse than 0 against the existing rows). Scar box from the veil box with the
medians measured on women's rows: l-0.003w, t-0.014h, 0.714w, 0.817h. No detection => no row (never a guessed position).
Run: python3 run.py K N out.jsonl (shard K of N over targets.txt), merge.py (pull CDN json, add rows, write img/*.json), then python3 dev/site/cdn_sync.py img/veil-fit.json img/scar-fit.json.
Needs cv2 (opencv-python-headless). Check: overlay_check.py out.jpg <eunuch|kid|..> <por|fig> seed n (red = veil box, blue = band, green = scar box).
