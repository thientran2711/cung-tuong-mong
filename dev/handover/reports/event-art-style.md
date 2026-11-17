# event-art-style report (art worker, Foreman C s12, 17/11)

PRIORITY #1 CHECK: OD L541-545 (no visible face; dark bg = scheming, light = normal), START_ART/STYLE_ANCHOR, dev/figwork/events (old prompt.py already said "no faces" but e68/j71f/q72/toil/wk families ignored it), PROGRESS_act_audit (not about art). git grep main + review/*: no earlier audit of event-art faces/colour found. No claims.

## State: STEP 2 audit DONE for event/opt/intro and (17/11 later, per C) all acts; STEP 3 samples DONE, waiting for Foreman C GO. Nothing live changed.

## Anchor set
ev-cung-nhan (= owner's "Kẻ hầu xin", maid from behind at the well), ev-cung-nu, ev-cung-nu-2 (back views, pastel, soft painterly). Ref in owner screenshot dev/handover/refs/owner-event-style-ref-1117.jpg. EVENTS.json maps j24:ke-hau-xin -> cung-nhan.

## Method
All 281 ev-*/opt-* + 49 intro/* downloaded from CDN and looked at on contact sheets (me, by eye). Per-file face flag is by eye; families that are uniform (all of e68, j71f, q72, toil, wk) were checked file by file on sheets. Colour: ok pastel / dark-by-design (negative/scheming event, allowed by OD L544) / FAIL dark (dark or night image for a neutral/positive event). Rendering: ok painterly / heavy-3D cinematic.

## Totals (ev + opt, 281 files)
- FAIL face: 117
- PASS: 113
- FAIL colour+render: 31
- FAIL face+colour+render: 17
- ANCHOR: 3

Family findings (ev/opt):
- ev-e68-* (60): pastel and painterly (colour OK) but EVERY one has 2-6 visible faces except flowerbloom, heatstroke. Mass FAIL face.
- ev-j71f-* (25 festival group scenes): faces everywhere; the dark ones also dark/cinematic.
- ev-q72-* (~37): faces except hands-only dong-tam, dt-hen, dt-thu, fam-thd.
- ev-toil-* (10), ev-wk-* (12 minigame scenes: woman's face while sewing/writing), ev-tt1-3, ev-vlcraft/vlnvp/vlout, ev-giftpick, ev-taintpick, ev-ch1/ch2, ev-cyrep: faces.
- Fine already: object / empty-room / back-view pictures (fest-*, mood-*, lanh-cung*, hoang-de-*, thoi-tiet*, le-*, khach-den*, etc.). Several dark mood-* are heavy cinematic but they are negative moods -> acceptable by OD L544.
- Dark/cinematic for NON-scheming events (colour FAIL): night1/night2*, nhap-cung*, morning-after-b, news-tin-trong-cung, fest night ones (nguyentieu, thattich, trungthu, vulan, giaothua, dongchi, lapbat), j71f night ones.
- opt-giu-chan-hoang-thuong: faces + dark cinematic -> FAIL (confirmed Foreman C's guess).

## Intro panels (49) -- all FAIL rendering + colour (saturated cinematic, near photo-real)
Faces visible (y): ch-2, ch-h3, cn-1, cn-3?(group), cnv-1, cnv-2, cnv-3, cnv-h3, cn-4(back, no), dtq-h3, muoi-4(crowd), muoi-h3, td-3, td-h1, td-h3(no), thd-2, thd-3, thd-h3, tt-3, tt-h3?, bd-*(riders small, n), G-series (architecture, n).
No faces but still saturated cinematic: G1-G7, bd-1/2/4, ch-1(hands/backs), ch-3, ch-4, cn-4, cnv-4, dtq-1/2/3, muoi-1/2/3, td-1/2/4, td-h2/h3, thd-1/4, tt-1/2/4.
Verdict: all 49 need a redo in the anchor style (soft pastel painterly, back views/hands); the 7 G panels and the faceless ones only need colour+rendering.

## Acts (act-*, 1360 files) -- FULL audit by eye (23 contact sheets, thumbnail level)
Result: ~419 of 1360 (31 %) show a visible face -> FAIL face. Earlier 96-file sample estimate (12-15 %) was too low. Flagged list at the end of this file (section "Act files with a visible face").
- 709 files are '-h' (hands/back) variants: ~46 of them still show a face (probably the older '-h' + group scenes) -> recheck at redo time.
- 651 non '-h' files: the majority of the faces (group scenes, couples with the Emperor, minigame/study acts with the girl's face, bed/child scenes).
- Colour: acts are mostly the same pastel as the anchor (OK). Dark scenes are scheming/negative (spy, poison, night walks) = dark-by-design, allowed; rendering is a little heavier/cinematic than the anchor but acceptable. A few '-h' hands pictures are washed-out pale; one (about index 37 on the A14 sheet) has fake text on a sign (check at redo).
- Reliability: thumbnails ~108 px, faces judged by eye; expect ~+-10 % misses either way. The redo pass must re-look at each file before regenerating (faces at 108 px are easy to miss when tiny).
Redo cost for acts: ~419 x 65 cr = ~27k credits (not 11k as I said in the first message).

## Per-file table (ev + opt)
| file | face | colour | rendering | verdict |
|---|---|---|---|---|
| ev-am-muu.webp | y | dark-by-design(neg) | heavy (acceptable dark) | FAIL face |
| ev-bac-tien.webp | n | ok pastel | ok painterly | PASS |
| ev-benh-tat.webp | n | ok pastel | ok painterly | PASS |
| ev-bien-ai-2.webp | n | ok pastel | ok painterly | PASS |
| ev-bien-ai.webp | n | ok pastel | ok painterly | PASS |
| ev-canh-phong.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-ch1.webp | y | ok pastel | ok painterly | FAIL face |
| ev-ch2.webp | y | ok pastel | ok painterly | FAIL face |
| ev-chuyen-la.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-con-tre-2.webp | n | ok pastel | ok painterly | PASS |
| ev-con-tre.webp | y | ok pastel | ok painterly | FAIL face |
| ev-cung-nhan.webp | n | anchor | ok painterly | ANCHOR |
| ev-cung-nu-2.webp | n | anchor | ok painterly | ANCHOR |
| ev-cung-nu.webp | n | anchor | ok painterly | ANCHOR |
| ev-cyrep.webp | y | ok pastel | ok painterly | FAIL face |
| ev-dai-xa.webp | n | ok pastel | ok painterly | PASS |
| ev-dau-doc.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-di-san.webp | n | ok pastel | ok painterly | PASS |
| ev-dich-benh.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-dieu-lanh.webp | n | ok pastel | ok painterly | PASS |
| ev-dieu-troi.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-duoc-mua.webp | n | ok pastel | ok painterly | PASS |
| ev-e68-allyoffer.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-autumnmoon.webp | y | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL face+colour+render |
| ev-e68-bordernews.webp | y | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL face+colour+render |
| ev-e68-borrowdress.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-clanfather.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-doccheck.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-doubtvisit.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-droughtprayer.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-embroidery.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-envoygift.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-eunrequest.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-faminedonate.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-flowerbloom.webp | n | ok pastel | ok painterly | PASS |
| ev-e68-fortunenun.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-giftarrive.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-heatstroke.webp | n | ok pastel | ok painterly | PASS |
| ev-e68-hhsummons.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-kindvisit.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-leakroof.webp | y | dark-by-design(neg) | heavy (acceptable dark) | FAIL face |
| ev-e68-letterhome.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-lotusseason.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-musician.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-newgirladvice.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-officialwife.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-painter.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-poisonedfish.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-proudvisit.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-rumoremplove.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-rumorfavor.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-rumorpreg.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-rumorth.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-servhero.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-servleave.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-sickservant.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-silkallot.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-snowday.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-spoiledfood.webp | y | dark-by-design(neg) | heavy (acceptable dark) | FAIL face |
| ev-e68-springallergy.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-stormnight.webp | y | dark-by-design(neg) | heavy (acceptable dark) | FAIL face |
| ev-e68-straycat.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-templerite.webp | y | ok pastel | ok painterly | FAIL face |
| ev-e68-thmama.webp | y | ok pastel | ok painterly | FAIL face |
| ev-evpick.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-fest-doanngo-b.webp | n | ok pastel | ok painterly | PASS |
| ev-fest-doanngo.webp | n | ok pastel | ok painterly | PASS |
| ev-fest-dongchi-b.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-fest-dongchi.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-fest-giaothua-b.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-fest-giaothua.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-fest-lapbat-b.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-fest-lapbat.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-fest-newyear-b.webp | n | ok pastel | ok painterly | PASS |
| ev-fest-newyear.webp | y | ok pastel | ok painterly | FAIL face |
| ev-fest-nguyentieu-b.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-fest-nguyentieu.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-fest-phoenix-b.webp | n | ok pastel | ok painterly | PASS |
| ev-fest-phoenix.webp | n | ok pastel | ok painterly | PASS |
| ev-fest-thanhminh-b.webp | n | ok pastel | ok painterly | PASS |
| ev-fest-thanhminh.webp | n | ok pastel | ok painterly | PASS |
| ev-fest-thanhtho-b.webp | n | ok pastel | ok painterly | PASS |
| ev-fest-thanhtho.webp | n | ok pastel | ok painterly | PASS |
| ev-fest-thattich-b.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-fest-thattich.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-fest-trungcuu-b.webp | n | ok pastel | ok painterly | PASS |
| ev-fest-trungcuu.webp | n | ok pastel | ok painterly | PASS |
| ev-fest-trungthu-b.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-fest-trungthu.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-fest-vantho-b.webp | n | ok pastel | ok painterly | PASS |
| ev-fest-vantho.webp | n | ok pastel | ok painterly | PASS |
| ev-fest-vulan-b.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-fest-vulan.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-giftpick.webp | y | ok pastel | ok painterly | FAIL face |
| ev-hai-thai.webp | n | ok pastel | ok painterly | PASS |
| ev-han-han.webp | n | ok pastel | ok painterly | PASS |
| ev-hao-huu.webp | n | ok pastel | ok painterly | PASS |
| ev-hh-viec-2.webp | n | ok pastel | ok painterly | PASS |
| ev-hh-viec.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-hinh-phat.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-hoa-hoan.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-hoa-than.webp | n | ok pastel | ok painterly | PASS |
| ev-hoang-de-dem.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-hoang-de-gian.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-hoang-de-vui-2.webp | n | ok pastel | ok painterly | PASS |
| ev-hoang-de-vui.webp | n | ok pastel | ok painterly | PASS |
| ev-hoi-lo.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-j70thr.webp | y | ok pastel | ok painterly | FAIL face |
| ev-j71f-doanngo.webp | y | ok pastel | ok painterly | FAIL face |
| ev-j71f-dongchi.webp | y | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL face+colour+render |
| ev-j71f-giaothua.webp | y | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL face+colour+render |
| ev-j71f-lapbat-1.webp | y | ok pastel | ok painterly | FAIL face |
| ev-j71f-lapbat-2.webp | y | ok pastel | ok painterly | FAIL face |
| ev-j71f-lapbat-3.webp | y | ok pastel | ok painterly | FAIL face |
| ev-j71f-newyear.webp | y | ok pastel | ok painterly | FAIL face |
| ev-j71f-nguyentieu.webp | y | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL face+colour+render |
| ev-j71f-phoenix.webp | y | ok pastel | ok painterly | FAIL face |
| ev-j71f-thanhminh.webp | y | ok pastel | ok painterly | FAIL face |
| ev-j71f-thanhtho-1.webp | y | ok pastel | ok painterly | FAIL face |
| ev-j71f-thanhtho-2.webp | y | ok pastel | ok painterly | FAIL face |
| ev-j71f-thanhtho-3.webp | y | ok pastel | ok painterly | FAIL face |
| ev-j71f-thanhtho-4.webp | y | ok pastel | ok painterly | FAIL face |
| ev-j71f-thanhtho-5.webp | y | ok pastel | ok painterly | FAIL face |
| ev-j71f-thanhtho-6.webp | y | ok pastel | ok painterly | FAIL face |
| ev-j71f-thattich.webp | y | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL face+colour+render |
| ev-j71f-trungcuu.webp | y | ok pastel | ok painterly | FAIL face |
| ev-j71f-trungthu.webp | y | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL face+colour+render |
| ev-j71f-vantho-1.webp | y | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL face+colour+render |
| ev-j71f-vantho-2.webp | y | ok pastel | ok painterly | FAIL face |
| ev-j71f-vantho-3.webp | y | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL face+colour+render |
| ev-j71f-vantho-4.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-j71f-vulan.webp | y | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL face+colour+render |
| ev-j71x-sac.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-j71x-tai.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-khach-den-2.webp | n | ok pastel | ok painterly | PASS |
| ev-khach-den.webp | n | ok pastel | ok painterly | PASS |
| ev-ksp.webp | n | ok pastel | ok painterly | PASS |
| ev-lanh-cung-2.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-lanh-cung-3.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-lanh-cung.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-le-dong-2.webp | n | ok pastel | ok painterly | PASS |
| ev-le-dong.webp | n | ok pastel | ok painterly | PASS |
| ev-le-ha.webp | n | ok pastel | ok painterly | PASS |
| ev-le-thu-2.webp | n | ok pastel | ok painterly | PASS |
| ev-le-thu-3.webp | n | ok pastel | ok painterly | PASS |
| ev-le-thu.webp | n | ok pastel | ok painterly | PASS |
| ev-le-xuan-2.webp | n | ok pastel | ok painterly | PASS |
| ev-le-xuan.webp | n | ok pastel | ok painterly | PASS |
| ev-lu-lut.webp | n | ok pastel | ok painterly | PASS |
| ev-mat-bao.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-mat-uoc.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-mood-an-2.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-mood-an.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-mood-binh-2.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-mood-binh.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-mood-buon-2.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-mood-buon.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-mood-dau-2.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-mood-dau.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-mood-ghen-2.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-mood-ghen.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-mood-gian-2.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-mood-gian.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-mood-lo-2.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-mood-lo.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-mood-muu-2.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-mood-muu.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-mood-so-2.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-mood-so.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-mood-vui-2.webp | n | ok pastel | ok painterly | PASS |
| ev-mood-vui.webp | n | ok pastel | ok painterly | PASS |
| ev-morning-after-b.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-nc1.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-news-tin-trong-cung.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-nguy-gia.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-nhap-cung-cn.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-nhap-cung.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-night1-v2.webp | y | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL face+colour+render |
| ev-night1.webp | y | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL face+colour+render |
| ev-night2-normal.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-night2-tender.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-night2-warm.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-night2.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-plantpick.webp | n | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL colour+render |
| ev-plantsv.webp | n | ok pastel | ok painterly | PASS |
| ev-prep.webp | n | ok pastel | ok painterly | PASS |
| ev-q72-dich-thu.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-doi-thuoc.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-don-ta.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-dong-tam.webp | n | ok pastel | ok painterly | PASS |
| ev-q72-dt-hen.webp | n | ok pastel | ok painterly | PASS |
| ev-q72-dt-thu.webp | n | ok pastel | ok painterly | PASS |
| ev-q72-emp-co.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-fam-thd.webp | n | ok pastel | ok painterly | PASS |
| ev-q72-hh-doanngo.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-hh-trungcuu.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-hh-trungthu.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-kho-tet.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-loi-thoi.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-maid-tet.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-mama-nghi.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-mat-tram.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-mat-tram2.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-ns-doi.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-off-con.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-off-hoa.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-qua-tet.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-quat-rv.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-su-tet.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-th-aodong.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-th-kinh2.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-th-mai.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-th-thanhminh.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-th-trungcuu.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-tho-te.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-tin-doi.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-tu-nu.webp | y | ok pastel | ok painterly | FAIL face |
| ev-q72-tv-mua.webp | y | ok pastel | ok painterly | FAIL face |
| ev-quoc-tang.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-runner.webp | y | ok pastel | ok painterly | FAIL face |
| ev-shop.webp | y | ok pastel | ok painterly | FAIL face |
| ev-sinh-no.webp | n | ok pastel | ok painterly | PASS |
| ev-su-than-2.webp | n | ok pastel | ok painterly | PASS |
| ev-su-than.webp | n | ok pastel | ok painterly | PASS |
| ev-tai-mat.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-tai-nghe.webp | n | ok pastel | ok painterly | PASS |
| ev-taintpick.webp | y | ok pastel | ok painterly | FAIL face |
| ev-tan-phong.webp | n | ok pastel | ok painterly | PASS |
| ev-tang-le.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-td1.webp | y | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL face+colour+render |
| ev-te-le.webp | n | ok pastel | ok painterly | PASS |
| ev-tham-quan.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-thang-tran.webp | n | ok pastel | ok painterly | PASS |
| ev-thd1.webp | y | ok pastel | ok painterly | FAIL face |
| ev-thinh-an.webp | n | ok pastel | ok painterly | PASS |
| ev-thoi-tiet-2.webp | n | ok pastel | ok painterly | PASS |
| ev-thoi-tiet-3.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-thoi-tiet.webp | n | ok pastel | ok painterly | PASS |
| ev-thu-nha.webp | n | ok pastel | ok painterly | PASS |
| ev-tien-de-bang-ha.webp | n | ok pastel | ok painterly | PASS |
| ev-tin-don.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-toil-crowd-jealous.webp | y | ok pastel | ok painterly | FAIL face |
| ev-toil-emp-dislike.webp | y | ok pastel | ok painterly | FAIL face |
| ev-toil-emp-like.webp | y | ok pastel | ok painterly | FAIL face |
| ev-toil-hh-praise.webp | y | ok pastel | ok painterly | FAIL face |
| ev-toil-hh-scold.webp | y | ok pastel | ok painterly | FAIL face |
| ev-toil-rival-jealous.webp | y | ok pastel | ok painterly | FAIL face |
| ev-toil-rival-praise.webp | y | ok pastel | ok painterly | FAIL face |
| ev-toil-rival-tease.webp | y | ok pastel | ok painterly | FAIL face |
| ev-toil-th-praise.webp | y | ok pastel | ok painterly | FAIL face |
| ev-toil-th-scold.webp | y | dark-by-design(neg) | heavy (acceptable dark) | FAIL face |
| ev-tranh-sung.webp | n | ok pastel | ok painterly | PASS |
| ev-trieu-chinh-2.webp | n | ok pastel | ok painterly | PASS |
| ev-trieu-chinh.webp | n | ok pastel | ok painterly | PASS |
| ev-tt1.webp | y | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL face+colour+render |
| ev-tt2.webp | y | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL face+colour+render |
| ev-tt3.webp | y | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL face+colour+render |
| ev-tu-tinh.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-tuyen-tu.webp | n | ok pastel | ok painterly | PASS |
| ev-vi-hanh-2.webp | n | ok pastel | ok painterly | PASS |
| ev-vi-hanh.webp | n | ok pastel | ok painterly | PASS |
| ev-vlcraft.webp | y | ok pastel | ok painterly | FAIL face |
| ev-vlget.webp | n | ok pastel | ok painterly | PASS |
| ev-vlnvp.webp | y | ok pastel | ok painterly | FAIL face |
| ev-vlout.webp | y | ok pastel | ok painterly | FAIL face |
| ev-vu-oan.webp | n | dark-by-design(neg) | heavy (acceptable dark) | PASS |
| ev-vulan.webp | y | ok pastel | ok painterly | FAIL face |
| ev-wk-cam.webp | y | ok pastel | ok painterly | FAIL face |
| ev-wk-hoa.webp | y | ok pastel | ok painterly | FAIL face |
| ev-wk-kimchi.webp | n | ok pastel | ok painterly | PASS |
| ev-wk-ky.webp | y | ok pastel | ok painterly | FAIL face |
| ev-wk-nau.webp | y | ok pastel | ok painterly | FAIL face |
| ev-wk-phanson.webp | y | ok pastel | ok painterly | FAIL face |
| ev-wk-phucthien.webp | y | ok pastel | ok painterly | FAIL face |
| ev-wk-theu.webp | y | ok pastel | ok painterly | FAIL face |
| ev-wk-thi.webp | y | ok pastel | ok painterly | FAIL face |
| ev-wk-thuchuc.webp | y | ok pastel | ok painterly | FAIL face |
| ev-wk-vu.webp | n | ok pastel | ok painterly | PASS |
| ev-wk-y.webp | y | ok pastel | ok painterly | FAIL face |
| ev-yen-tiec.webp | n | ok pastel | ok painterly | PASS |
| opt-giu-chan-hoang-thuong.webp | y | FAIL dark/cinematic (event not scheming) | heavy/3D-ish cinematic | FAIL face+colour+render |

Contact sheets of failures (CDN, review folder): img/_review/event-art-style/fail-ev-1..4.jpg, fail-intro.jpg (https://ctm-img.victoria-tntt.workers.dev/img/_review/event-art-style/<name>).

## STEP 3 samples (Magnific gpt-2-6, folder ba4aecfe, anchors ev-cung-nhan/cung-nu/cung-nu-2 as image refs, 2k, 65 credits each)
Sheet OLD | NEW | ANCHOR: img/_review/event-art-style/samples-OLD-NEW-ANCHOR.jpg
1 light event: ev-e68-letterhome (4:3) -> lady from behind reading the letter
2 light intro: intro/ch-h3 (16:9) -> two figures from behind, only the letter passing hands
3 dark opt: opt-giu-chan-hoang-thuong (3:4) -> kneeling from behind holding the robe hem, Emperor a silhouette
4 dark intro: intro/td-h1 (16:9) -> family dinner, all backs/shadow, muted teal-plum night
Files: img/_review/event-art-style/{ev-e68-letterhome,intro-ch-h3,opt-giu-chan-hoang-thuong,intro-td-h1}.webp
Self-check: all four have no visible face, pastel/muted palette, soft painterly. Sample 4 is a little dim/low-detail; sample 3 is darker than the anchor (intended: scheming tone).
Credits per redo ~65. Redo scope after GO: ~165 ev/opt + 49 intro (+ ~170 acts if approved) ~ 14k-28k credits.

## Handover (if rollover)
Scratch lives in session scratchpad only; to resume: re-download CDN files, classification code is rebuilt from this table. Anchor creations uploaded to Magnific folder ba4aecfe (names anchor-ev-cung-*).

## Act files with a visible face (419; filenames on CDN img/)
act-an-mac-gian-di.webp
act-ba-do-bi-bat.webp
act-bai-kien.webp
act-bai-thuoc-thu-thai.webp
act-ban-chung-cu.webp
act-ban-dung-hh.webp
act-ban-dung-ta.webp
act-ban-dung.webp
act-ban-ga.webp
act-ban-hon-su.webp
act-ban-tan.webp
act-ban-thien-ha.webp
act-ban-tho-van.webp
act-ban-tin-phat-oan.webp
act-bao-cung-chinh-ti.webp
act-bat-con-doc-sach.webp
act-bat-dau-bay-muu.webp
act-bat-gap-mot-minh.webp
act-bat-gap-sat-ben.webp
act-be-con-chua-chuan.webp
act-bi-bat-gap-luc-ruong.webp
act-bi-bat-gap.webp
act-bi-danh-truong.webp
act-bi-duoi-ve-noi-vu.webp
act-bi-tuoc-tai-nu.webp
act-biet-bi-do-nha.webp
act-biet-co-thai.webp
act-biet-danh-tinh-h.webp
act-biet-danh-tinh.webp
act-biet-so-thich-ht.webp
act-bieu-bac.webp
act-bieu-qua.webp
act-boc-tu-tinh.webp
act-cai-do-ruong.webp
act-cai-nguoi-vao-cung.webp
act-cam-con-gap.webp
act-can-gian.webp
act-canh-bao.webp
act-cao-benh-cho-con.webp
act-cao-benh-dem.webp
act-cau-xin-hoang-thuong.webp
act-cha-thang-tran.webp
act-chai-chuot-gian-di.webp
act-chai-chuot-long-lay.webp
act-chai-chuot-vua-van.webp
act-cham-soc-con.webp
act-chan-ngu-gia-thanh.webp
act-chao-hoi-dung-le.webp
act-che-cho-than-hinh.webp
act-chi-cuoi.webp
act-chia-se-bi-mat.webp
act-cho-bac.webp
act-cho-muon.webp
act-chu-cang-buc.webp
act-chu-nho-on.webp
act-chu-sa-sam.webp
act-chua-ban-hon.webp
act-chua-nhan-vao-phe.webp
act-chuong-su-tra-xet.webp
act-co-ke-thay-liec-mat.webp
act-co-nguoi-thay-voi.webp
act-con-biet-me-xin.webp
act-con-chi-hoi-han.webp
act-con-co-net.webp
act-con-di-tuan-bien.webp
act-con-noi-tot-h.webp
act-con-quy-xin-cho-me.webp
act-con-tron-tuoi.webp
act-con-ve-du-yen-h.webp
act-con-ve-du-yen.webp
act-cui-chao-bai-kien.webp
act-cui-dau-tuan-lenh.webp
act-cung-khong-biet-la-ai.webp
act-cung-nu-bi-mua-khai.webp
act-cung-nu-lot-mat-xanh.webp
act-cung-nu-trom-bac.webp
act-da-quen-biet.webp
act-dan-di-thinh-an.webp
act-dan-mat.webp
act-dang-chao.webp
act-dang-hoa.webp
act-dang-len-hoang-thuong.webp
act-dang-len-thai-hau-h.webp
act-dang-len-thai-hau.webp
act-dang-nghe-cong-chua.webp
act-dang-vat.webp
act-dap-tra-mia.webp
act-day-do-con.webp
act-day-ho.webp
act-day-toi-cung-nu-h.webp
act-de-con-thu-tu.webp
act-de-moc.webp
act-de-ong-tu-lo-h.webp
act-de-y-bay-muu.webp
act-den-can-chinh-bi-duoi.webp
act-den-cho-han.webp
act-den-ngay.webp
act-deo-mang-che.webp
act-deo-trang-suc.webp
act-diem-trang.webp
act-do-duoc-net-h.webp
act-do-hong-bo.webp
act-do-la.webp
act-doa-to-doi-thuc.webp
act-doan-thai-hau-trong.webp
act-doat-giai.webp
act-doc-thuc-quet-don.webp
act-doi-nguoi.webp
act-doi-thay.webp
act-duoc-be-con.webp
act-duoc-thang-cung-nu.webp
act-duoc-thay-mat-h.webp
act-duoc-thay-mat.webp
act-duoi-di.webp
act-dut-bac-xin-giu.webp
act-dut-lot-lat-the.webp
act-ga-quyen-than.webp
act-ghi-ten-du-thi.webp
act-gia-hoa-trom-do.webp
act-gia-nhap-phe.webp
act-gia-say-thai.webp
act-gia-thai-bi-lat.webp
act-gian-la-loi.webp
act-giat-do.webp
act-giau-bi-thay.webp
act-giu-bai-tho.webp
act-giu-kin-co-thai.webp
act-giu-ngoi-thai-tu.webp
act-giup-do-nang.webp
act-gui-bai-tho-cu.webp
act-gui-thu-qua-con.webp
act-ha-doc-con.webp
act-ha-doc-dan.webp
act-hac-sai-pham.webp
act-han-mang-on.webp
act-hang-nhi-ba.webp
act-hau-tra-ngu-gia.webp
act-he-lo-so-thich.webp
act-het-han-tra-xet.webp
act-hh-tra-thu.webp
act-hien-khuc-trang.webp
act-hoang-de-lo-quoc-su.webp
act-hoang-de-nhiu-may.webp
act-hoang-thuong-bo-qua.webp
act-hoang-thuong-cam-kich.webp
act-hoang-thuong-chi-hon-h.webp
act-hoang-thuong-chi-hon.webp
act-hoang-thuong-dang-nghe.webp
act-hoang-thuong-dong-long-tong-nu.webp
act-hoang-thuong-khong-cho.webp
act-hoang-thuong-khong-nghe-hoa-than.webp
act-hoang-thuong-khong-vui-phat-h.webp
act-hoang-thuong-thu-gia.webp
act-hoc-tai-nghe.webp
act-hoc-voi-thay-con-h.webp
act-hoc-voi-thay-con.webp
act-hoc-voi-thay.webp
act-hoi-chuyen.webp
act-hoi-nguoi-hau.webp
act-hoi-so-thich.webp
act-hop-muu-lo-h.webp
act-ht-de-mat-y-phuc.webp
act-ke-chuyen-cua-h.webp
act-ke-chuyen-cua.webp
act-ke-chuyen-nghe-tu-h.webp
act-ke-chuyen-nghe-tu.webp
act-ke-chuyen-xau.webp
act-ke-nho-chuyen-cung-h.webp
act-ke-nho-chuyen-cung.webp
act-ket-minh.webp
act-kham-cung.webp
act-khat-bong-loc.webp
act-khen-mot-cau.webp
act-khen-tai-nghe.webp
act-kho-chiu-sau-qua-h.webp
act-kho-chiu-sau-qua.webp
act-kho-ho-so-chay.webp
act-khoc-xin-tha-h.webp
act-khoi-benh-seo.webp
act-khoi-benh.webp
act-khong-ban-chinh-su.webp
act-khong-biet-gi-moi.webp
act-khong-chuan-lay.webp
act-khong-tin-danh-don.webp
act-khuyen-con-nhan-nhin.webp
act-khuyen-giu-long-the.webp
act-kinh-hong-vu.webp
act-lam-nhu-khong-thay-h.webp
act-lam-nhu-khong-thay.webp
act-lam-tho-trung-cuu.webp
act-lanh-lung.webp
act-lap-thai-tu-h.webp
act-lap-thai-tu.webp
act-len-bac.webp
act-len-vao-bi-bat.webp
act-linh-luong.webp
act-lo-mieng-ke.webp
act-loi-don-ac-y.webp
act-long-the-bat-an.webp
act-long-the-da-an.webp
act-luc-duoc-thu.webp
act-ly-gian.webp
act-mama-cong-h.webp
act-mama-cong.webp
act-mama-dung.webp
act-mama-hanh.webp
act-mama-ngon.webp
act-mang-chan-thuoc.webp
act-mang-tin-ve.webp
act-mat-thu-bi-chan.webp
act-moi-den-cung.webp
act-moi-nang-sang-cung.webp
act-moi-sang-cung-nang.webp
act-moi-thay-day-nghe.webp
act-mua-chuoc.webp
act-mua-ve-cung.webp
act-nam-chieu-thang-h.webp
act-nam-chieu-thang.webp
act-nang-thay-nghe-len.webp
act-nau-che-mung-h.webp
act-nghe-len-khong-duoc.webp
act-nghe-loi-tai-mat.webp
act-nghe-lom-gia-son.webp
act-nguoi-khac-doat-giai.webp
act-nguoi-quen-che-cho.webp
act-nha-the-luc.webp
act-nhan-bac-tai-mat.webp
act-nhan-lam-tai-mat-h.webp
act-nhan-loi-nho-h.webp
act-nhan-loi-vao-phe.webp
act-nhan-qua-co-van-de.webp
act-nhan-ra-dieu-la.webp
act-nhan-toi-thay-chu.webp
act-nhan-tong-nu-h.webp
act-nhan-tong-nu.webp
act-nhin-loi-mia.webp
act-nho-con-noi-giup.webp
act-nho-giup-do.webp
act-nho-thai-giam-dan.webp
act-nhun-nhuong.webp
act-noi-do-vien-quan.webp
act-noi-that-long.webp
act-noi-trong-yeu-vat.webp
act-noi-vu-chua-co-nguoi.webp
act-noi-vu-dua-y-phuc.webp
act-noi-vu-thay-la.webp
act-o-lai-lam-ma-ma.webp
act-opt-bao-ky-dung.webp
act-opt-bao-ky-lui.webp
act-opt-bao-ky-som.webp
act-pha-thi.webp
act-pho-tai-dem.webp
act-pho-tai.webp
act-phuong-cau-hoang.webp
act-quen-o-noi-vu.webp
act-quy-xin-giu-con-h.webp
act-quy-xin-giu-con.webp
act-quy-xin-tha-cung-nu-h.webp
act-quy-xin-tha-cung-nu.webp
act-ra-tay-bi-bat.webp
act-ren-cong.webp
act-ren-hanh.webp
act-ren-ngon.webp
act-roi-phe.webp
act-rot-ho-nhiem-lanh.webp
act-rot-ruou-ngu-toa.webp
act-rot-ruou-nung-niu.webp
act-rua-tieng-oan-tho.webp
act-sai-khat-bong.webp
act-sai-nguoi-tang.webp
act-sai-tai-mat-do-noi-o.webp
act-say-thai.webp
act-sinh-doi.webp
act-sinh-ha.webp
act-su-than-trieu-cong.webp
act-ta-on-xuat-gia.webp
act-tai-mat-bao-nam-nhan-h.webp
act-tai-mat-bao-nam-nhan.webp
act-tai-mat-bao-noi-o.webp
act-tai-mat-khong-do-ra.webp
act-tai-mat-nghe-duoc.webp
act-tam-cho-gia.webp
act-tam-su.webp
act-tan-phong-hh-h.webp
act-tan-phong-hh.webp
act-tan-phong.webp
act-tang-boc.webp
act-tang-cho.webp
act-tang-tram-ket-than-h.webp
act-tang-tram-ket-than.webp
act-tap-truoc.webp
act-tha-loi-cung-nhan-h.webp
act-tha-loi.webp
act-thai-da-lo.webp
act-thai-giam-ke-ngoai-trieu.webp
act-thai-hau-che-pho-truong.webp
act-thai-tu-trung-doc.webp
act-thai-y-bat-mach-co-thai.webp
act-thai-y-khac-bat-mach.webp
act-thai-y-tam-phuc.webp
act-thanh-minh-duoc.webp
act-thanh-thong-gia.webp
act-thao-trang-suc.webp
act-thap-den-hau-ruou.webp
act-thay-buot-mieng.webp
act-thay-dong-tinh-h.webp
act-thay-mat-chua-biet-ten-h.webp
act-thay-mat-chua-biet-ten.webp
act-thay-mat-thai-hau-h.webp
act-thay-mat-thai-hau.webp
act-thay-noi-chuyen-rieu-rao.webp
act-thay-y-phuc.webp
act-them-thai-giam.webp
act-theo-ve-vuong-phu.webp
act-thi-tai-nu-h.webp
act-thi-tai-nu.webp
act-thi-tham-noi-xau.webp
act-thi-tham.webp
act-thieu-le-y-phuc.webp
act-thinh-an-ban-khong-gap-h.webp
act-thinh-an-ban-khong-gap.webp
act-thinh-an-hh.webp
act-thinh-an-th.webp
act-tho-truyen-ra-ngoai-h.webp
act-tho-truyen-ra-ngoai.webp
act-thoi-moi-thay.webp
act-thu-cu-lot.webp
act-thuan-dai-cuc.webp
act-thuan-y-hoang-thuong.webp
act-thuong-bac-cung-nu.webp
act-thuong-vi.webp
act-thuong-vo-co.webp
act-tien-cu-hau-thay.webp
act-tien-cu-tong-nu.webp
act-tien-cu.webp
act-tiep-dai-lanh-nhat.webp
act-tieu-duc-tu-ban-chuyen.webp
act-to-giac-khong-thanh-h.webp
act-to-giac-truoc-h.webp
act-to-toi-that.webp
act-to-vuot-pham.webp
act-tong-quan-ksp-dem-chuyen.webp
act-tra-chung-cu.webp
act-tra-hai-nhi.webp
act-tra-lai-qua.webp
act-tra-no.webp
act-tra-ra-muu-dong-cung.webp
act-tranh-ghe-xong.webp
act-tranh-sung.webp
act-trieu-than-nghi.webp
act-trinh-chung-cu-hh.webp
act-trinh-chung-cu-th.webp
act-trinh-khong-du-chung.webp
act-tro-chuyen-voi.webp
act-trong-rau.webp
act-trut-gian.webp
act-tu-bao-che-an-thai-h.webp
act-tu-choi-bac-mach-chu.webp
act-tu-choi-bam-chu.webp
act-tu-choi-im-lang.webp
act-tu-choi-ket-chi-em.webp
act-tu-choi-loi-moi.webp
act-tu-choi-tu-gay-the.webp
act-tu-choi.webp
act-tu-day-tai-nghe.webp
act-tu-hoc-ao.webp
act-tu-hoc-bhoa-h.webp
act-tu-hoc-bhoa.webp
act-tu-hoc-huong.webp
act-tu-hoc-khuc.webp
act-tu-hoc-kinh.webp
act-tu-hoc-mon.webp
act-tu-hoc-mua.webp
act-tu-hoc-the.webp
act-tu-hoc-theu.webp
act-tu-hoc-tho.webp
act-tu-hoc-tranh.webp
act-tu-hoc.webp
act-tu-tay-day.webp
act-tu-tay-ket-h.webp
act-tu-theu-chu-tho.webp
act-tu-tinh-cung-nu-lo.webp
act-tua-vai.webp
act-uy-hiep-doi-bac-h.webp
act-uy-hiep-doi-bac.webp
act-uy-hiep-khong-thanh.webp
act-uy-hiep-thanh.webp
act-vao-cung-cung-nu.webp
act-ve-hau.webp
act-ve-tranh.webp
act-viec-chu-sai.webp
act-vong-the-luc.webp
act-vu-oan-h.webp
act-vu-oan.webp
act-xem-so-nguyet-su.webp
act-xem-so-thi-tam-h.webp
act-xem-so-thi-tam.webp
act-xet-toi.webp
act-xi-xao-che-mat.webp
act-xi-xao-xa-xi.webp
act-xin-an-dien-h.webp
act-xin-an-gia-dinh.webp
act-xin-an-xa.webp
act-xin-cho-nguoi.webp
act-xin-chuyen-hau.webp
act-xin-dai-hoc-si.webp
act-xin-giu-lai.webp
act-xin-hh-giang.webp
act-xin-lay-nguoi-thuong.webp
act-xin-o-lai-hau-chu.webp
act-xin-tha-cung-nu.webp
act-xin-thai-hau-hoc-cung.webp
act-xin-thuoc-cho.webp
act-xin-vao-bi-tu-choi.webp
act-xoa-vai.webp
act-xu-toi.webp
act-xuat-cung-thanh-than.webp
act-xuat-cung-ve-que.webp
act-xui-cha-dang-so.webp

## REDO PROGRESS (17/11, after owner GO via Foreman C s13)
Method per image: gpt-2-6, 4:3 (or the old aspect), 1k (40 cr), 3 style refs that already exist in the Magnific account (anchors DoJfAENpcl, IfibTkptvE, s786HZEl8e + samples yiEnj8mPW9 light / UPhZKBtwny, VXwvZlZMMU dark), prompt = "Soft painterly guofeng illustration in the style of the references: light warm pastel, gentle daylight, low contrast, delicate ink-and-wash, not photo-real. Scene: <scene, everyone seen from behind>. NO visible face of anyone. No text, no border." (dark/negative scenes: "muted night tone with plum shadow and one warm lantern", refs UPhZKBtwny+VXwvZlZMMU). Results come back as pikaso render.png URLs; download, look at a NEW-only grid, crop-check any figure that might face the viewer, resize to 1024 (4:3) / 768 (3:4) webp q84.
Staged results (NOT live): CDN img/_review/event-art-style/ready/<key>.webp, same key as the live file. Sheets OLD|NEW: batch-01.jpg (25), batch-02.jpg (16).
DONE keys (41): ev-am-muu ev-ch1 ev-ch2 ev-con-tre ev-cyrep ev-e68-{allyoffer autumnmoon bordernews borrowdress clanfather doccheck doubtvisit droughtprayer embroidery envoygift eunrequest faminedonate fortunenun giftarrive hhsummons kindvisit leakroof letterhome lotusseason musician newgirladvice officialwife painter poisonedfish proudvisit rumoremplove rumorfavor rumorpreg rumorth servhero servleave sickservant silkallot snowday spoiledfood springallergy}
NEXT in table order: e68-stormnight straycat templerite thmama, evpick, fest-* (night ones stay night but muted), giftpick, hh-viec, j70thr, j71f-*, j71x-*, mood-binh*, morning-after-b, nc1, news-tin-trong-cung, nhap-cung*, night1*, night2*, plantpick, q72-*, runner, shop, taintpick, td1, thd1, toil-*, tt1-3, vlcraft, vlnvp, vlout, vulan, wk-*, opt-giu-chan-hoang-thuong (sample file in review/), then intro (49; samples intro-ch-h3 / intro-td-h1 in review/), then acts with faces (list at end).
Going live (only after Foreman C confirms a sheet): cdn_sync the staged webp onto img/<key>.webp (same key, no manifest).

## HANDOVER (art worker -> Foreman C ROOT, 17/11 ~06:10Z) — STOPPED, nothing live
STATUS: 103 ev redo images staged at CDN img/_review/event-art-style/ready/<key>.webp (sheets batch-01..04.jpg in the same folder). ALL 103 ARE MARKED REJECTED-METHOD by the owner/ROOT (see below). Nothing was uploaded live. No render running.
OWNER/ROOT RULES TO APPLY (canon: dev/rules/topic/art-events-effects.md [OD:L545]):
1. Faces hidden NATURALLY only (back view, turned away, distance, cropped, shadow). NEVER a fan/sleeve/hand/object/flower in front of a face. (Owner on the first sample: "lấy cái quạt che mặt làm chi".) My sample intro/ch-h3 had such a fan -> redo; check every staged image for it.
2. LIGHT = normal acts, soft pastel day scenes. DARK = scheming/sinister/dangerous: deep blue-black night, rich shadow, small warm candle/lantern pools, like the OLD night pictures and the Hành sự card buttons (act-*/opt-* night ones on the CDN). NEVER hazy/muted-purple: my "dark but muted" prompts were exactly what she hates ("mờ quá", "cái cũ nhìn đậm đà, nó đẹp"). Keep the OLD dark pictures' depth; just remove faces. Moon only where the story has a moon.
3. Each event tells ITS OWN story: vary place, season, light, framing, robe colours (not pink lead every time). ~10 staged scenes share one composition (pink lady from behind at a red chair on a blossom veranda): ch1, cyrep, con-tre, embroidery, giftarrive, kindvisit, letterhome, lotusseason, musician, borrowdress, painter, springallergy... Seasons follow the event: no blossoms in autumn/winter/famine/drought. Keep the OLD picture's composition idea when it told the story, only remove faces + soften colour.
STAGED/REJECTED KEYS (103): batch-01..04 contain: ev-am-muu ch1 ch2 con-tre cyrep; all ev-e68-* fails (60 incl. letterhome); ev-evpick; ev-fest-{dongchi,giaothua,lapbat,newyear,nguyentieu,thattich,trungthu,vulan}(+ -b); ev-giftpick ev-hh-viec ev-j70thr; ev-j71f-* (25); ev-j71x-sac/tai; ev-mood-binh(-2); ev-morning-after-b ev-nc1 ev-news-tin-trong-cung ev-nhap-cung(-cn) ev-night1(-v2) ev-night2(-normal,-tender,-warm). Judge-by-ROOT of batch-01: faces/pastel OK; night too light; sameness. Batch-02..04 not judged separately (same method -> same verdict expected). Re-do ALL dark ones (night/rain/poison/storm/leak/scheming) and all repeated veranda scenes.
NOT STARTED: ev-plantpick, ev-q72-* (28), runner, shop, taintpick, td1, thd1, toil-* (10), tt1-3, vlcraft, vlnvp, vlout, vulan, wk-* (10), opt-giu-chan-hoang-thuong, intro (49), acts (419).
Correct scene notes read from the OLD pictures (q72 sheet): dich-thu = lady reclining + 2 at desk with letters/official; doi-thuoc = physician in navy with open medicine box + lady; don-ta = two ladies sitting with fan; emp-co = Emperor (yellow) at round table with cards + 2 ladies; hh-doanngo = mother in red giving zongzi to two children; hh-trungcuu = tea with chrysanthemum cakes; hh-trungthu = ladies with lanterns/moon table; kho-tet = storeroom of boxed gifts; loi-thoi = two ladies at a gate; maid-tet = maid offering plate; mama-nghi = grey ma ma bowing before a lady; mat-tram/mat-tram2 = jewellery box / hairpin scenes; ns-doi = zither with old nurse; off-con/off-hoa = official in green greeting ladies; qua-tet = Emperor at blue table with tea; quat-rv = lady with round fan + friend; su-tet = envoy in turban gifting; th-aodong = ladies with winter robes in snow; th-kinh2 = lady in gold robe at desk with book; th-mai = plum-branch vase; th-thanhminh = lady writing at low table + Buddha; th-trungcuu = chrysanthemum tea; tho-te = Emperor writing at desk; tin-doi = two ladies on a stone bench; tu-nu = three ladies; tv-mua = lady + soldier-guards at horses; plantpick = lady kneeling at a lacquer chest, night.
METHOD THAT WORKED (technical): Magnific gpt-2-6, folder ba4aecfe..., 4:3 / 3:4 / 16:9 by old aspect (most old ev are 640x480 = 4:3; nhap-cung* 16:9), 1k (40 cr each). Refs = existing creation ids (no uploads): light DoJfAENpcl, IfibTkptvE, s786HZEl8e (the 3 anchors), samples yiEnj8mPW9 (light); dark UPhZKBtwny, VXwvZlZMMU (my dark samples are TOO PALE: for dark use the OLD dark pictures as refs instead - upload needed, or pick act-* night art already in the account). "from behind" in the prompt is obeyed reliably (checked ~40 crops): no frontal faces appeared; add a different place/season per event. Pipeline: images_generate -> creations_wait (3 returns pikaso render.png?token URLs) -> curl -> look at NEW grid -> crop-check -> webp q84 1024w (768w for 3:4) -> stage to img/_review/event-art-style/ready/. ~8 images per 8 minutes. Context cost ~3k tokens/image incl. checks.
AUDIT TABLE AND ACT LIST above stay valid.

# #2 — event/option/intro/act redo with LIGHT/DARK (art worker, session_011xDdVNmzMMfEUCuWxVBTUi successor, 17/11)
PRIORITY #1 CHECK: OD 0 new (rule = [OD:L545]/[OD:L638] + C-ROOT 17/11 line in art-events-effects.md) | ledger 0 | claims 8 (this line) | main 0 | review/* 0. Reused: predecessor key lists + scene notes; ref creations = existing anchors DoJfAENpcl, IfibTkptvE, s786HZEl8e + 3 uploads (old dark ev-am-muu gOtZze5SXO, act-ha-doc-dan cpghCxF0eP, old stormnight EbnlwAsuuO).
## Calibration sheet (6 keys), gpt-2-6, 4:3, 1k, 40 cr each. Sheets: https://ctm-img.victoria-tntt.workers.dev/img/_review/event-art-style2/cal/<key>.jpg (OLD | NEW | Hành sự ref), NEW alone <key>-NEW.webp
| key | class | creation | note |
|---|---|---|---|
| ev-am-muu | DARK | MB7CFVhDCm | night chamber, candle, pouch to bowing servant (old composition kept) |
| ev-e68-stormnight | DARK | kspPir716B | rain, lanterns, trellis collapse, backs only |
| ev-e68-poisonedfish | DARK | gOtZn7CSXO | black silver pin on fish, lady from behind, maid far (old was pastel; poison = dark by meaning) |
| ev-e68-letterhome | LIGHT | iGbDBBj3uK | spring window desk letter, back view |
| ev-e68-snowday | LIGHT | fHGLUJbCDY | snow, no blossoms, 4 ladies far/back |
| ev-q72-hh-trungcuu | LIGHT | tC3kLUhmZJ | autumn Double Ninth terrace, maples, backs |
Self-check: all 6 looked at at 1024: no visible face, no fan/hand cover. Note: gpt-2-6 allows max 1 `style` ref → use `image` refs (2 per call). Waiting for Foreman C OK. Nothing live.
LIVE (Foreman C OK 17/11 06:16Z): img/ev-am-muu, ev-e68-stormnight, ev-e68-poisonedfish, ev-e68-letterhome, ev-e68-snowday uploaded in place (cdn_sync explicit paths, 1024x768 webp). ev-q72-hh-trungcuu redone (no text on banner, nurse strictly from behind): creation gOtZco9SXO, live. Rules from C for all batches: NO written characters/text in any picture; faces fully hidden (back/turned, no near-profile).

## Batch 1 (20 keys, staged, NOT live): sheets img/_review/event-art-style2/b1/<key>.jpg (OLD|NEW), NEW <key>-NEW.webp
| key | class | creation |
|---|---|---|
| ev-ch1 | LIGHT | JNfndC1Oq4 |
| ev-ch2 | LIGHT | 6AqMmkIiJO |
| ev-con-tre | LIGHT | O6CYXqCynm |
| ev-cyrep | LIGHT | lJIRTEogv9 |
| ev-e68-allyoffer | LIGHT | rgd9csAxtc |
| ev-e68-autumnmoon | LIGHT | rgd9nCQxtc |
| ev-e68-bordernews | DARK | 5jMO2aaKxe |
| ev-e68-borrowdress | LIGHT | UPhADjTwny |
| ev-e68-clanfather | LIGHT | JNfndUiOq4 |
| ev-e68-doccheck | LIGHT | WDlmb0scXe |
| ev-e68-doubtvisit | LIGHT | xSXNWgrjfW |
| ev-e68-droughtprayer | LIGHT | MB7CrtfDCm |
| ev-e68-embroidery | LIGHT | O6CYBG6ynm |
| ev-e68-envoygift | LIGHT | jUB6c6zLD0 |
| ev-e68-eunrequest | LIGHT | dtPFsbbXSL |
| ev-e68-faminedonate | LIGHT | huZrOlFvqL |
| ev-e68-fortunenun | LIGHT | cpghkpN0eP |
| ev-e68-giftarrive | LIGHT | vQ2xyJ0a47 |
| ev-e68-hhsummons | DARK | eIyQLgsdqL |
| ev-e68-kindvisit | LIGHT | dtPFs77XSL |
Redos inside the batch: allyoffer (maid cheek visible), fortunenun (priest profile). Self-check: all 20 looked at 1024px, no text, no face; each own place/season (summer lotus, wisteria, winter sickroom, drought, famine autumn, temple, etc).

LIVE batch 1 (Foreman C OK 06:27Z): all 20 uploaded in place.
## Batch 2 (20 keys, staged, NOT live): img/_review/event-art-style2/b2/ev-e68-<key>.jpg (OLD|NEW)
| key | class | creation |
|---|---|---|
| ev-e68-leakroof | DARK | rgd9DWAxtc |
| ev-e68-lotusseason | LIGHT | lJIRBplgv9 |
| ev-e68-musician | LIGHT | 0eSvssdTfW |
| ev-e68-newgirladvice | LIGHT | 3z5pHbPREY |
| ev-e68-officialwife | LIGHT | nVLIrlCYQD |
| ev-e68-painter | LIGHT | eIyQ7i7dqL |
| ev-e68-proudvisit | LIGHT | s783XC1l8e |
| ev-e68-rumoremplove | DARK | xSXNpCejfW |
| ev-e68-rumorfavor | DARK | tC3kNpkmZJ |
| ev-e68-rumorpreg | DARK | tC3kNdrmZJ |
| ev-e68-rumorth | DARK | xSXNpr2jfW |
| ev-e68-servhero | LIGHT | O6CYaP1ynm |
| ev-e68-servleave | LIGHT | 9ZFTuRCNYZ |
| ev-e68-sickservant | LIGHT | KLDyVlUkqp |
| ev-e68-silkallot | LIGHT | Sym2Ii5Ub8 |
| ev-e68-spoiledfood | DARK | 3z5pqDQREY |
| ev-e68-springallergy | LIGHT | lJIRoZLgv9 |
| ev-e68-straycat | LIGHT | IfiKNxqtvE |
| ev-e68-templerite | LIGHT | kspPMR916B |
| ev-e68-thmama | LIGHT | rgd9pGixtc |
Self-check: all 20 looked at 1024px, no text/faces; lead robe colours varied (teal, lilac, peacock-blue, navy, cream…).

## HANDOVER #2 (art worker session_011xDdVNmzMMfEUCuWxVBTUi -> Foreman C ROOT-2, 17/11 ~06:37Z). START_CTX ~3%, stopped at ~29% of the 1M window.
STATE: LIVE = 6 calibration keys + batch 1 (20). STAGED, waiting Foreman C OK: batch 2 (20 ev-e68-*) at CDN img/_review/event-art-style2/b2/ (sheets <key>.jpg OLD|NEW, <key>-NEW.webp). Upload = copy -NEW.webp to img/<key>.webp in /home/user/cung-tuong-mong then `python3 dev/site/cdn_sync.py img/<key>.webp ...` (explicit paths, never manifests).
CLASSIFY: LIGHT = normal acts (soft warm painterly, colour depth, seasons/places differ); DARK = scheming/sinister/dangerous (deep crimson/blue-black, warm candle/lantern pools, rich "đậm đà", never hazy). Rumours (tin đồn), poison, storm/leak, border danger, Empress summons = DARK.
RULES FROM FOREMAN C: no written characters anywhere (blank banners/scrolls, loose brush marks only); faces fully hidden (back view, bowed, far; no cheek/near-profile; never fan/hand over face); vary lead robe colour (not pink every time); each event its own place + season.
METHOD: images_generate mode gpt-2-6, folderReference ba4aecfe-efce-47e2-b53f-30d292091886, 4:3 (3:4 for tall olds, e.g. ev-con-tre), 1k = 40 cr. gpt-2-6 allows max 1 `style` ref -> use type "image" refs (2 per call). LIGHT refs: DoJfAENpcl + IfibTkptvE (also s786HZEl8e). DARK refs: gOtZze5SXO (old ev-am-muu) + cpghCxF0eP (act-ha-doc-dan) + EbnlwAsuuO (old stormnight). Pipeline: curl OLD from CDN, contact sheet, write prompts per old story, fire 20 calls, creations_wait (<=8 ids each), curl render.png?token URLs, look at 4-up grids at 1024, redo faces/text, make OLD|NEW per-key jpg + NEW webp q84, cdn_sync into img/_review/event-art-style2/bN/, report.
REMAINING KEYS (from the REJECTED list): ev-evpick, ev-fest-{dongchi,giaothua,lapbat,newyear,nguyentieu,thattich,trungthu,vulan}, ev-giftpick, ev-hh-viec, ev-j70thr, ev-j71f-* (25), ev-j71x-sac/tai, ev-mood-binh(-2), ev-morning-after-b, ev-nc1, ev-news-tin-trong-cung, ev-nhap-cung(-cn), ev-night1(-v2), ev-night2(-normal,-tender,-warm), ev-plantpick, ev-q72-* (28), ev-runner, ev-shop, ev-taintpick, ev-td1, ev-thd1, ev-toil-* (10), ev-tt1-3, ev-vlcraft, ev-vlnvp, ev-vlout, ev-vulan, ev-wk-* (10), opt-giu-chan-hoang-thuong, intro/* (49, 16:9 mostly), acts (419, list above in this file). Check each OLD for a face first; skip ones that already pass.
DONE e68 keys: letterhome snowday stormnight poisonedfish + batch1+batch2 sets (all e68 FAIL keys now covered). Remaining e68 none.
Creation ids per picture: tables above in this section '#2'.
LIVE batch 2 (Foreman C ROOT-2 OK 06:36Z): all 20 ev-e68-* (b2) uploaded in place via cdn_sync explicit paths.

# #3b — art worker session_011xDdVRvYPfrJjKVSj7JpuR (17/11)
PRIORITY #1 CHECK: OD 0 new | ledger 0 | claims ART event-art-style row (continued, not restarted) | main 0 | review/* 0.
LIVE batch 3 (Foreman C OK 06:45Z): 16 keys uploaded in place: ev-fest-{dongchi,dongchi-b,giaothua,giaothua-b,lapbat,lapbat-b,newyear,nguyentieu,nguyentieu-b,thattich-b,trungthu,trungthu-b}, ev-evpick, ev-giftpick, ev-j71x-sac, ev-j71x-tai. (C asked redo of vulan, vulan-b, thattich = summer; done in b4.)

## Batch 3 creations (all LIGHT)
fest-dongchi w4vGHM27EI; dongchi-b cpghPbZ0eP; giaothua yiEWKIQPW9; giaothua-b iGbDLuE3uK; lapbat yiEWKa5PW9; lapbat-b 0eSv4gWTfW; newyear jUB6a8TLD0; nguyentieu w4vGHEB7EI; nguyentieu-b p8Ou36Rehw; thattich MB7C6igDCm; thattich-b UPhAF5Swny; trungthu 5jMOIPqKxe; trungthu-b aFAjVSJfSh; vulan dtPF2rIXSL; vulan-b gOtZQTzSXO; evpick u5Yge6fQLD; j71x-sac 5jMOInSKxe; j71x-tai 1le4hTBr4r; giftpick EbnlpAXuuO.

## Batch 4 (20, staged b4, NOT live): img/_review/event-art-style2/b4/
ev-j71f-doanngo YMstiYfWeC; ev-j71f-dongchi 4RQ0Si69Aa; ev-j71f-giaothua 79azj9sJAL; ev-j71f-lapbat-1 tC3kpQ5mZJ; ev-j71f-lapbat-2 MB7CzmADCm; ev-j71f-lapbat-3 Lwoib9jswO; ev-j71f-newyear gOtZk27SXO; ev-j71f-nguyentieu cpghZfg0eP; ev-j71f-phoenix P3ucgp942C; ev-j71f-thanhminh lJIRKWFgv9; ev-j71f-thanhtho-1 1le4QzTr4r; ev-j71f-thanhtho-2 cpghZ160eP; ev-j71f-thanhtho-3 huZrd6ovqL; ev-j71f-thanhtho-4 6AqM7F7iJO; ev-j71f-thanhtho-5 lJIRKtSgv9; ev-j71f-thanhtho-6 Cqzs80WEEy; ev-j71f-thattich eIyQWRHdqL; ev-fest-vulan Sym2KJcUb8; ev-fest-vulan-b VXwf28kMMU; ev-fest-thattich aFAjd1kfSh

## Batch 5 (10, staged b5, NOT live): ev-j71f-{trungcuu,trungthu,vantho-1..4,vulan}, ev-j70thr (LIGHT), ev-news-tin-trong-cung + ev-nc1 (DARK, redone 5jMOqj0Kxe / VXwf08uMMU after first try had cheek/hand at mouth). Others: trungcuu VXwfYW8MMU, trungthu w4vGsUa7EI, vantho-1 dtPFM8OXSL, vantho-2 huZr8Q7vqL, vantho-3 KLDyHgfkqp, vantho-4 DoJE0vUpcl, vulan N2HVyTd6D9, j70thr s783r8sl8e.

## Batch 6 (14, staged b6, NOT live): ev-q72-dich-thu cpghcnd0eP; ev-q72-doi-thuoc 3z5p3iJREY; ev-q72-don-ta xSX6Ls1jfW; ev-q72-emp-co rgdNjgDxtc; ev-q72-hh-doanngo WDlh0ddcXe; ev-q72-hh-trungthu JNfYyZKOq4; ev-q72-kho-tet 6AqD3V8iJO; ev-q72-loi-thoi O6CWPcCynm; ev-q72-maid-tet 9ZFV6eXNYZ; ev-q72-mama-nghi aFALC7kfSh; ev-q72-mat-tram UPhG7DWwny; ev-q72-mat-tram2 3z5eZCoREY; ev-q72-ns-doi MB7EpleDCm; ev-q72-off-con 8a6Kt95IrU

## Batch 7 (13, staged b7, NOT live): ev-q72-off-hoa JNfYN9fOq4; qua-tet Xm4qmvLBfo; quat-rv cpgvpov0eP; su-tet s78R7N5l8e; th-aodong yiEciVZPW9; th-kinh2 mERrEgahJQ; th-mai lJIZJ0Igv9; th-thanhminh w4vz4el7EI; th-trungcuu u5YS5RTQLD; tho-te N2HM2Ea6D9; tin-doi 79an9vZJAL; tu-nu p8OQ8ybehw; tv-mua p8OQ89kehw.

## HANDOVER #3 (art worker #3b -> Foreman C ROOT-2, 17/11 ~07:10Z). START_CTX ~3%, stopped at ~26% of the 1M window.
STATE: LIVE = cal 6 + b1 20 + b2 20 + b3 16 + b4 18 + b5 10 + b6 12 (07:08Z, C OK). STAGED waiting Foreman C OK: b7 (13; 10 redone non-pink, sheets replaced in place) and b8 (4 redo: j71f-thanhtho-2 peach buns/noodles, j71f-thanhtho-4 pure summer, q72-kho-tet, q72-maid-tet). Ask C for the verdict, then cp -NEW.webp -> img/<key>.webp + cdn_sync explicit paths. Each sheet at https://ctm-img.victoria-tntt.workers.dev/img/_review/event-art-style2/bN/<key>.jpg (OLD|NEW), NEW <key>-NEW.webp (1024x768 q84). Upload when C says OK: in /home/user/cung-tuong-mong `cp img/_review/event-art-style2/bN/<key>-NEW.webp img/<key>.webp` (first `python3 dev/site/cdn_sync.py --pull 'img/_review/event-art-style2/bN/*'` if the review files are not on disk) then `python3 dev/site/cdn_sync.py img/<key>.webp ...` explicit paths, never manifests. Log a LIVE line here.
C RULES ADDED THIS ROUND: festivals/seasons must match the event month (7th-month Vu Lan/Qixi = summer lotus + willow + fireflies, NO spring blossom); fewer pink-blossom corner branches overall, use plants of the event's own month; blossoms in snow read as plum (winter ok).
DECISION SKIPPED (told C, no answer yet): ev-night1(-v2), night2(-normal,-tender,-warm), nhap-cung(-cn), mood-binh(-2), morning-after-b have NO visible face (silhouettes/empty rooms/far backs) and are the rich night look the owner praised; also ev-hh-viec and fest doanngo/phoenix/thanhminh/thanhtho/trungcuu/vantho, newyear-b already pass. Redraw them only if C says so.
REMAINING (not started): ev-toil-* (10: crowd-jealous emp-dislike emp-like hh-praise hh-scold rival-jealous rival-praise rival-tease th-praise th-scold; scolds/jealous/tease = DARK-ish), ev-wk-* (10 minigame scenes: cam hoa ky nau phanson phucthien theu thi thuchuc y: show hands/tools/back view only), ev-tt1/2/3, ev-vlcraft/vlnvp/vlout, ev-vulan (summer!), ev-runner, ev-shop, ev-taintpick, ev-td1, ev-thd1, ev-plantpick, ev-ch1/ch2 done, opt-giu-chan-hoang-thuong, intro (49), acts (419).
TIPS THAT WORKED: refs LIGHT DoJfAENpcl + IfibTkptvE; DARK gOtZze5SXO + cpghCxF0eP (typo risk: cpghCxF0eP exactly). Prompt: 'Soft painterly guofeng illustration in the style of the references, warm rich colour depth, delicate ink-and-wash, not photo-real. Scene: ... seen from behind ... Nobody's face visible. No text, no written characters, no border.' DARK: 'Deep, rich painterly ..., dark but vivid blue-black night with warm lantern pools, strong colour, not hazy'. For hand-at-mouth/whisper or near-profile faces say 'STRICTLY SEEN FROM DIRECTLY BEHIND, no cheek or profile, no hands near the face'. 4:3 1k = 40 cr. Batch of 14 fires in one turn, creations_wait 8+6, download with curl render.png?token=exp=...~hmac=... (URLs only in the wait result), make 3x2 grids at 800x600 to look.

C VERDICTS (messages): b4 18 OK/redo thanhtho-2 (western CAKE with candles -> use peach longevity buns, noodles) + thanhtho-4 (spring blossom over summer lotus); b6 12 OK/redo kho-tet + maid-tet (modern ribbon-bow gift boxes -> lacquer boxes, cloth bundles, silk bolts, baskets, red paper only); LEAD ROBE must not be pink more than ~1 in 5 (teal, indigo, ochre, lilac, celadon, wine, ivory); no out-of-era objects (cakes, ribbon bows, modern things). SKIP decision on night1/night2/nhap-cung/mood-binh/morning-after-b CONFIRMED by C.
b8/b7-redo creations: thanhtho-2 SymA6O4Ub8; thanhtho-4 0eSa8XpTfW; kho-tet KLDPUSpkqp; maid-tet w4vz3Zv7EI; b7 final: off-hoa eIyFExPdqL; qua-tet u5YSgb5QLD; quat-rv Xm4qQwiBfo; su-tet Lwo3NefswO; th-aodong yiEciVZPW9 (orig); th-kinh2 6AqDTHuiJO; th-mai rgdNPo9xtc; th-thanhminh 1le9y8nr4r; th-trungcuu Ifikbz8tvE; tho-te N2HM2Ea6D9 (orig); tin-doi WDlhI6gcXe; tu-nu p8OQ8ybehw (orig); tv-mua gOt231nSXO.
LIVE (C OK 07:10Z, uploaded 07:16Z): b8 j71f-thanhtho-2, j71f-thanhtho-4, q72-kho-tet, q72-maid-tet + b7 q72-th-aodong, q72-tu-nu. STILL STAGED (C to re-look, b7 folder): q72-{off-hoa,qua-tet,su-tet,quat-rv,th-kinh2,th-mai,th-thanhminh,th-trungcuu,tho-te,tin-doi,tv-mua} (all non-pink leads, no bows). Next worker: upload those on C's OK, then ev-toil-*/ev-wk-* etc.
