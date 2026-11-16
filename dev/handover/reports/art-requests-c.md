# art-requests-c (art worker, Foreman C) — 16/11 ~23:30Z — SAMPLES ONLY, no batch before owner OK

## 1) por-vacant-hh (kit-size #7)
Sample: https://ctm-img.victoria-tntt.workers.dev/img/_review/art-requests-c/por-vacant-hh.webp (384x506 = same size as por-*; HD 768x1012 `-hd.webp` beside it).
Magnific gpt-2-6 3:4, empty red-lacquer + gold Empress throne, phoenix screen, incense burner, no person, style = the approved palace interiors (red/gold, no green roofs). Opaque painted picture (por-* are cut-outs of people; an object scene has no outline to cut). NOT uploaded to the live key yet.

## 2) minigame-frame: hands-on-đàn pose (ONE sample)
Spec read: review/minigame-frame @bd223466 (kitGameFig, j79.js): left column shows kitStageFig(S) = kitFigOf(S) = img/fig-player-look<1-4>-t<tier>-a<18|26|36|51>.webp (old size 389x900 RGBA).
Sample figure (look1 t1 a18): `img/_review/art-requests-c/fig-player-look1-t1-a18-dan.webp`, 511x900 RGBA (same HEIGHT 900 as the old figure; wider because the guzheng stand is part of the figure), same face/hair/lilac hanfu/skin; she stands BEHIND a stand-mounted đàn tranh so the full body incl. shoes stays visible at the old height; both hands on the strings (right plucking, left pressing), anatomy checked, front/3/4 view, no back turn. Background removed with Magnific; checked on dark + light (clean edges, no halo): dan_both.jpg. In-layout mock (composited with the kit kgfig column CSS at 1180x820, NOT a real browser shot): ingame_mock.png (figure fits the column at 328x578, a bit smaller than a bare figure because it is wider; consider a column max-width tweak).
Files: https://ctm-img.victoria-tntt.workers.dev/img/_review/art-requests-c/{dan_both.jpg,ingame_mock.png,fig-player-look1-t1-a18-dan.webp}
Estimate: CDN has 20 player figures today (4 looks x t1 x 4 ages + t3 a18). One pose per instrument x 20 = 20 images, ~43 credits each (40 gen + 3 bg removal) = ~860 cr; if outfits of all 8 tiers are needed: 4x8x4 = 128 per instrument = ~5,500 cr. Each further instrument/prop (brush, fan, chess...) multiplies by the same count. Not fitted with tools/fit_fig.py (not in my sparse checkout): height normalised to 900 by crop-to-bbox.
