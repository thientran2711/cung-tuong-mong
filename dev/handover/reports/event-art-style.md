# event-art-style report (art worker, Foreman C s12, 17/11)

PRIORITY #1 CHECK: OD L541-545 (no visible face; dark bg = scheming, light = normal), START_ART/STYLE_ANCHOR, dev/figwork/events (old prompt.py already said "no faces" but e68/j71f/q72/toil/wk families ignored it), PROGRESS_act_audit (not about art). git grep main + review/*: no earlier audit of event-art faces/colour found. No claims.

## State: STEP 2 audit of event/opt/intro DONE; acts = SAMPLE only; STEP 3 samples DONE, waiting for Foreman C GO. Nothing live changed.

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

## Acts (act-*, 1360 files) -- SAMPLE ONLY so far
96 random acts viewed: older non "-h" variants often show faces (e.g. act-bai-thuoc-thu-thai, be-con-chua-chuan, gia-nhap-phe, giat-do, chai-chuot-vua-van, hoang-thuong-khong-chac...); "-h" (hands/back) variants and dark spying ones are fine. Estimate ~12-15 % of acts show a face (~160-200 files). Full act audit not done yet: proposed as the next task after GO (needs ~25 contact sheets). Colour of acts is mostly the same pastel as the anchor.
Not audited: st-* (433 story pictures), map/place/title etc. (not event art).

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
