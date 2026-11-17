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

### Per-pose cost (for the hold; poses made from the NEW repainted consort figures after pilot approval)
~43 cr per figure (40 gen + 3 bg removal). One instrument: 12 faces x current tier = 12 files ~520 cr (pilot); 12 faces x 8 tiers (1 age) = 96 files ~4,100 cr; full 12 x 8 x 4 ages = 384 files ~16,500 cr (+ hd twins by upscale). Eight arts (dan, co, tho, ve, mua, huong, theu, banh) multiply those. KIT REQUEST draft for the column width is in dev/kit/KIT_REQUESTS.md.

## ORIGIN INTRO ART (Foreman C s9 item 3, main s26 decided VẼ) — plan + 3 new samples (NO batch before Foreman C says)
Panel list = ART LIST of review/origin-intros (dev/handover/reports/review-origin-intros.md): 51 panels + G1–G7 (G1 + 6 panels already painted: tt-1..4, tt-h3, G1 = style anchor, live at img/intro/). Remaining to paint: 46 panels + G2–G7 (6) = 52 images (3 of them are the new samples below). Format 1280x720 WebP <=250 KB, 16:9, subject in the centre band (3:1 banner crop).
Order (owner OD 22:00Z story ch1–4 first): wave 1 = keys -1..-4 of every other origin (dtq, muoi, cn, nc, bd, td, ch, thd, cnv = 9 origins x 4 = 36, minus none) ; wave 2 = home-road h1/h2/h3 (dtq-h3, muoi-h3, nc-h3, bd-h3, td-h1/h2/h3, ch-h3, thd-h3, cnv-h3 = 10; cn has none); wave 3 = G2–G7 (6). Total 52; cost ~65 cr per 2k gpt-2-6 generation => ~3,400 cr (52 x 65) + ~50% retries ≈ 5,000 cr.
New samples (gpt-2-6, 2k 16:9, resized 1280x720; looked at each myself; no faces in cn-2 per the ◆ rule, men no pink/purple, no blood):
- cn-2 ◆ rain night, two clothed silhouettes behind a paper screen: https://ctm-img.victoria-tntt.workers.dev/img/_review/origin-intros/cn-2.webp  (native 2688x1520: cn-2-full.webp; 3:1 banner crop: cn-2-banner3x1.jpg)
- dtq-4 dawn: she (back) in brocade to a red sedan, riding boots by the door, groom + horse: .../dtq-4.webp (+ -full, -banner3x1)
- nc-1 Nhĩ Hải lake, three pagodas, camellias, no people: .../nc-1.webp (+ -full, -banner3x1)
All in img/_review/origin-intros/ (NOT on the live img/intro/ keys; upload after approval).

## ART WORKER s11 (17/11 ~03:00Z) — origin intros + night-choice sample (all in img/_review, NOT live)
START_CTX ≈ 8 %. Magnific gpt-2-6 only, 2k 16:9 → 1280x720 WebP ≤250 KB; each looked at by me; redone: muoi-4 (car on sedan), dtq-3 (envelope → bamboo-slip dispatch), muoi-2 (big central man), bd-3 (bare shoulder).
Base: https://ctm-img.victoria-tntt.workers.dev/img/_review/origin-intros/<key>.webp ; contact sheets sheet-01..05.jpg beside them.
- Wave 1 (ch1–4): dtq-1,2,3, muoi-1..4, cn-1,3,4, nc-2,3,4, bd-1..4, td-1..4, ch-1..4, thd-1..4, cnv-1..4 (+ samples cn-2, dtq-4, nc-1 from before). Sheets 01–03.
- Wave 2 (home): dtq-h3, muoi-h3, nc-h3, bd-h3, td-h1/h2/h3, ch-h3, thd-h3, cnv-h3. Sheet 04.
- G2–G7 entry pictures: sheet-05. (G1 + tt-1..4 + tt-h3 already live.)
Live key when C OKs: img/intro/<key>.webp (copy of the review file). Known soft spots: ch-3 wax-style seal on the note, nc-4 small Emperor-like figure.
Night choice "Giữ chân Hoàng thượng" sample (3:4, 768x1024): .../img/_review/art-requests-c/opt-giu-chan-hoang-thuong.webp — her room at night, candle rim light, she gently holds his sleeve, bodies not overlapping, fully clothed. Awaiting C → main.
por-vacant-hh: still NOT live; upload img/_review/art-requests-c/por-vacant-hh.webp → img/por-vacant-hh.webp on C's OK.
