# PROGRESS icon-art (Foreman C art worker)
Branch review/icon-art (from origin/main; no code changes, pictures live on the CDN). Owner approved sample v2 ("Biểu tượng ok").
## Done (all Magnific gpt-2-6, folder ba4aecfe…, every image looked at)
Icons (256x256 alpha webp, img/kit/): NEW keys ico-cal (hoàng lịch 皇曆), ico-goal (compact edict), ico-download, ico-update; REPLACED in place ico-chat (lacquer letter box), mo-calendar (hoàng lịch padded to 290x420 for the kmcal page-flip, kmcal-b ratio 290/420), desk-cal (hoàng lịch on lacquer stand 233x256), desk-cal-plain (plain paper almanac on wooden stand).
Placeholders (img/, light+dark): ph-p-{light,dark}-{ps 168x224, pm 240x320, pl 324x432}; ph-l-*-{ls 384x192, lm 600x280, ll 1120x520}; ph-w-*-ll 1720x400 (XL strip); ph-s-*-{s56 112, s64 128, s72 144}. 20 files, ≤140 KB each.
Magnific ids: see dev/handover/reports/review-icon-art.md (docs branch).
## Not done / KIT REQUESTS
- Rail (jrail.js) still points at img/kit/mo-calendar.webp + mo-edict-closed.webp: switch to ico-cal.webp + ico-goal.webp (square). mo-edict-closed stays wide for its other uses.
- jph/KIT §59 still uses ph-act-*/ph-event-*: wire the 8 new masters by orientation/size (kit-size rule kitBtnSize/kitFrameSize).
- kitStatusIcon (status-icons worker): use img/kit/ico-download.webp, img/kit/ico-update.webp.
## Resume
Files are rebuildable from the Magnific creation ids; CDN is the source of truth (dev/site/cdn_sync.py --pull 'img/ph-*').
