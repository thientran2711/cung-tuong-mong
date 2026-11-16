# art-requests-c (art worker, Foreman C) — 16/11 ~23:30Z — SAMPLES ONLY, no batch before owner OK

## 1) por-vacant-hh (kit-size #7)
Sample: https://ctm-img.victoria-tntt.workers.dev/img/_review/art-requests-c/por-vacant-hh.webp (384x506 = same size as por-*; HD 768x1012 `-hd.webp` beside it).
Magnific gpt-2-6 3:4, empty red-lacquer + gold Empress throne, phoenix screen, incense burner, no person, style = the approved palace interiors (red/gold, no green roofs). Opaque painted picture (por-* are cut-outs of people; an object scene has no outline to cut). NOT uploaded to the live key yet.

## 2) minigame-frame: hands-on-đàn pose (ONE sample)
Spec read: review/minigame-frame @bd223466 (kitGameFig, j79.js): left column shows kitStageFig(S) = kitFigOf(S) = img/fig-player-look<1-4>-t<tier>-a<18|26|36|51>.webp (old size 389x900 RGBA).
Sample figure (look1 t1 a18): `img/_review/art-requests-c/fig-player-look1-t1-a18-dan.webp`, 511x900 RGBA (same HEIGHT 900 as the old figure; wider because the guzheng stand is part of the figure), same face/hair/lilac hanfu/skin; she stands BEHIND a stand-mounted đàn tranh so the full body incl. shoes stays visible at the old height; both hands on the strings (right plucking, left pressing), anatomy checked, front/3/4 view, no back turn. Background removed with Magnific; checked on dark + light (clean edges, no halo): dan_both.jpg. In-layout mock (composited with the kit kgfig column CSS at 1180x820, NOT a real browser shot): ingame_mock.png (figure fits the column at 328x578, a bit smaller than a bare figure because it is wider; consider a column max-width tweak).
Files: https://ctm-img.victoria-tntt.workers.dev/img/_review/art-requests-c/{dan_both.jpg,ingame_mock.png,fig-player-look1-t1-a18-dan.webp}
Estimate: CDN has 20 player figures today (4 looks x t1 x 4 ages + t3 a18). One pose per instrument x 20 = 20 images, ~43 credits each (40 gen + 3 bg removal) = ~860 cr; if outfits of all 8 tiers are needed: 4x8x4 = 128 per instrument = ~5,500 cr. Each further instrument/prop (brush, fan, chess...) multiplies by the same count. Not fitted with tools/fit_fig.py (not in my sparse checkout): height normalised to 900 by crop-to-bbox.

## HANDOVER (art worker, context ceiling reached ~23:15Z; foreman opens the successor)
Done + pushed (review/toil-room-art): Task A live; 13 rank dressing-room plates live (img/toil-room-<key>.webp) + KIT REQUEST in dev/kit/KIT_REQUESTS.md; por-vacant-hh sample OK'd (owner sent; NOT yet on the live key: upload img/_review/art-requests-c/por-vacant-hh.webp as img/por-vacant-hh.webp after her OK); Task B courtyards STOPPED by owner.
OPEN (foreman s9 ask 23:13Z): đàn sample must be shown with a REAL game screenshot, not a mock.
 1. Fetch tools/fit_fig.py from origin/review/fig-cutout-clean (sparse, --depth=30, under flock /home/user/wt/fetch.lock); fit img/_review/art-requests-c/fig-player-look1-t1-a18-dan.webp (511x900 RGBA; source png in my scratch is gone, download from the CDN review path) so the PERSON (not the đàn stand) is the old figure's height (old file img/fig-player-look1-t1-a18.webp is 389x900, person fills it); report scale numbers if the column would shrink her.
 2. Real build of review/minigame-frame @bd223466 (assemble.py + dev/site/build_site.sh), swap the figure in locally, Playwright (pre-installed Chromium, --no-sandbox) iPad 1180x820 deviceScaleFactor 2, open the đàn mini-game, screenshot + a large native crop. Send both paths to foreman s9.
 3. Tools: Magnific MCP (gpt-2-6, images_remove_background); R2 uploads via PUT https://api.cloudflare.com/client/v4/accounts/7fc1b88a522c6a91b40051536fa02cae/r2/buckets/ctm-img/objects/<urlencoded key> (proxy injects the token); review files under img/_review/.

## UPDATE 17/11 (art worker successor): REAL game shot of the đàn pose
Base: review/minigame-frame @bd223466 built with assemble.py + build_site.sh, served locally, Playwright Chromium iPad 1180x820 @2, the đàn mini-game opened via kg82Open (fig:true) + play phase; the CDN figure URL of the left column (kgfig) routed to the new file. Real browser, not a mock.
Links (CDN):
- https://ctm-img.victoria-tntt.workers.dev/img/_review/art-requests-c/dan-real-ipad-1180x820@2.png (full 2360x1640)
- https://ctm-img.victoria-tntt.workers.dev/img/_review/art-requests-c/dan-real-column-crop-native.png (left column, native 2x)
- https://ctm-img.victoria-tntt.workers.dev/img/_review/art-requests-c/dan-real-old-vs-new-column.png (same game, old bare figure | new đàn figure)
Findings:
1. tools/fit_fig.py and branch review/fig-cutout-clean do NOT exist on origin (only fig-cutout-code*). Measured instead: in both files the person spans the full 900 px (head ~0, shoes ~885), so fit scale = 1.00, no refit needed.
2. The left column (kgfig) is ~259 x 534 CSS px. The sample is 511x900 (aspect 0.57; old 0.43) so it is width-limited: displayed 249x438 vs old 231x526 => the PERSON shrinks to ~0.83 of her old on-screen height (measured 845 vs ~1020 device px). Fix options: widen kgfig to ~300 CSS px (then scale 1.0) or accept 0.83. Needs a kit decision (KIT_REQUESTS).
3. BIG: the current build draws the player from fig-consort-c<NN>-t<tier>-a<age> (12 faces x 8 tiers x 4 ages = 384 files, plus hd/ twins), NOT fig-player-look*. The sample was made on the obsolete fig-player-look1 base (the shot swaps it in whatever face she has). A real set must be made per consort face.
Full-set estimate (per instrument/pose): 384 files x ~43 cr = ~16,500 cr; 1 age x 12 faces x 8 tiers = 96 files = ~4,100 cr (age bands can reuse a pose with fewer files); minimum sensible = 12 faces x current tier = 12 files ~520 cr. With 8 art types (dan, co, tho, ve, mua, huong, theu, banh) multiply accordingly; recommend asking the owner to pick the subset (e.g. dan only, 96 files).
