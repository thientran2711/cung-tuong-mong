# D-face90-page report (worker FACE90, Foreman D ROOT)
PRIORITY #1 CHECK: no 90-face page existed (NDX5 page = 84 old 460px crops); reused its look/CSS.
**URL: https://claude.ai/artifact/XubGcDyanMfWZoX92reHMo** (private; owner opens with her account)
Counts (FACE_MAP_L703, hidden=false, minus the 2 Công chúa groups) = 90: Sắc sảo 15 · Quyến rũ 18 · Lạnh lùng 15 · Kiêu kỳ 15 · Đoan trang 13 · Dịu dàng 14. Matches the brief.
Images: each person's FACE_MAP "cut" (Magnific remove-background PNG), original file uploaded unmodified as artifact asset (no recompress). All 90 are 1024x2304 (min = max); file sizes 1.4–2.4 MB. No person below 1024 px wide. Card shows the head/upper body (CSS crop of the full image), tap opens the full 1024x2304 picture.
Not checked: Magnific lineage for an upscaled child of each cut (checked only BhNCmskoQR: chain eIyOFEidqL -> gen 752x1344 -> cut 1024x2304, no upscale child); the cut is the largest in the chain for that one.
Checked: Playwright Fold 755x1000 and iPad 1180x820, no JS errors, no sideways scroll, 90 cards; looked at the shots (first group + Quyến rũ visible at Fold, first group at iPad); did not individually eyeball all 90 faces.
Source: dev/art/face-common/face_page/face90/ (page.src.html, build.py, assets.json cut->/_blob, ids90.json). 0 credits, no generation.
~100% xong / ~100% chơi được

## Lineage check (all 90) — FACE90 lineage done: 0 swapped
Per-cut creations_lineage x90 was too heavy, so I used a set-based check: creations_search full=true for every image since 19/11 (all cuts date 19-20/11) excluding tool slugs background/text-to-image/upload/video-generator = 35 images (20 retouch, 7 expand, 7 enhance, 1 change-camera; no upscale tool at all). Scanned each payload for any of the 90 cut ids: 0 references. So no upscale / larger child of any cut exists; a child could only be background/text-to-image/upload/video, none of which is a larger version of the same picture. Plus the earlier full lineage of BhNCmskoQR (no children). All 90 stay 1024x2304; page unchanged, nothing republished.
