# batch w1-hero-misc (hero + misc, 1063 files, 4k) — worker log
START_CTX ~5% of 1M (get_session reads 0; own estimate). Roll over at ~30%, never above 60%.
## Pipeline notes (17/11)
- 4k master from images_generate gpt-2-6 2048x4096 comes back OPAQUE (white bg) now (pilot had alpha). Fix: images_remove_background (3 cr, output 2000x4000 RGBA, good edges) -> curl -> finish_fig.py -> qa_fig -> sheet look. ~83 cr/file.
- Identity ref for a26/a36/a51 = NEW a18 of the look (upload local webp via creations_request_upload + curl PUT + finalize) + old figure of that age + faces 01/05/12/18.
- cdn_sync.py is NOT on the handover branch: take it from origin/main (git show origin/main:dev/site/cdn_sync.py) and run from a dir with dev/site/cdn_sync.py + img/.
- finished files live only in the container scratch (not git-able: image allowlist) -> upload to CDN before rollover.
## Reused pilot a18 (4k, looked at, no train, calm): player-look1..4-t1-a18, emperor-a18-1, emperor-a18-2, physician-p1-a18, official-o1-a18 (pilot-hero/finished/img; hd twin = hd2 folder 2700 -> need fit to 1800 if CDN has hd)
## Done (4k, looked, QA ok) — master Magnific ids (bg-removed)
player-look1-t1-a26 MB7vgfmDCm | look2-t1-a26 O6CGvkIynm | look3-t1-a26 1leOMaLr4r (4 pinholes, accepted like c28) | look4-t1-a26 kspJVvB16B
## Refs (Magnific creations): new a18 look1 3z5VQDQREY look2 9ZFWCyoNYZ look3 bxVUWF05Y2 look4 DoJaSTPpcl; old a26 look1 p8OfSIqehw look2 lJI6XHZgv9 look3 79a2tkLJAL look4 P3unaLr42C
player-look1-t1-a36 8a6HNjlIrU | look2-t1-a36 rgdyeY6xtc | look3-t1-a36 u5YLnOCQLD | look4-t1-a36 4RQYudE9Aa (halo FAIL 3.7-5.4k is the sheer-gauze rim, clean on dark; pinholes 4-5 accepted)
## UPLOADED to CDN (cdn_sync + img/hd + img/hd2 for hero): 16 figures = pilot a18 x8 (player look1-4 a18, emperor a18-1/-2, physician-p1, official-o1) + player look1-4 a26 + a36. hd2 = 2700 tall (hero extra; CDN had none before).
## Refs for a36 old: look1 JNfAvMVOq4 look2 JNfAvDMOq4 look3 dtPEOxuXSL look4 YMsojQzWeC
## Credits so far: 8 x 83 = 664
## TODO (order): player-look*-t1-a51 (4), player-look*-t3-a18 (4, +a26? check list), emperor a26/a36/a51 -1/-2 (6), physician, official, tutor, steward, fallen (remaining), then man, mama, eunuch, kid. Remaining list = shard minus the done above.
## Gesture rotation used: a18 look1 branch, look2 handkerchief, look3 fan, look4 hairpin; a26 teacup/fan/scroll/jade; a36 branch/handkerchief/fan/lantern. Age lines: a26 'about 28', a36 'about 38 poised mature, subtle maturity', a51 'about 53, dignified, silver touches in hair' (not yet used).

## SUCCESSOR S2 (17/11 ~01:40Z) — 2k, START_CTX ~3% (roll at ~28%). transparentBackground:true works (real alpha) -> no bg-removal step. Driver: scratch drv.py (download+alpha+finish_fig+qa+sheet).
TSV key	creation	status (2k, uploaded to CDN fig+por, no hd: CDN has none)
player-look1-t3-a18	N2Hcbb96D9	ok
player-look2-t3-a18	VXwhJyBMMU	ok
player-look3-t3-a18	rgdyBmTxtc	ok
player-look4-t3-a18	6Aq05LTiJO	ok
physician-p2-a18	CqzxYpmEEy	ok
physician-p3-a18	VXwhJRaMMU	ok
tutor-ttp1-a18	eIyC4zwdqL	ok
steward-tgk1-a18	4RQYHl49Aa	ok
fallen-ly1-a18	u5YLV10QLD	ok
official-o2-a18	DoJa9m6pcl	ok
official-o3-a18	MB7v4mTDCm	ok
official-o4-a18	tC3bGbUmZJ	ok
official-o5-a18	gOtifR9SXO	ok
official-o6-a18	4RQY50d9Aa	ok
man-bacdich-1-a18	8a6H2KqIrU	ok
man-congtu-1-a18	ovNFZKC829	ok
## NOTE: all hero a18 now done (pilot 8 + these). Credits S2: 16x65=1040. Next: man a18 (rest), mama k02-k08 a18, eunuch a18 (120), kid.
man-congtu-10-a18	KLD7IAPkqp	ok
man-congtu-2-a18	Lwo9f0ZswO	ok
man-congtu-3-a18	cpgIPKR0eP	ok
man-congtu-4-a18	Lwo9fM7swO	ok
man-congtu-5-a18	jUB4aMRLD0	ok
man-congtu-6-a18	DoJaigdpcl	ok
man-congtu-8-a18	3z5VsHkREY	ok (uploaded)
man-congtu-7-a18	5jMw8cUKxe	FAILED service 520 -> resubmit (ref old-congtu-7 id 79a2qiOJAL)
## reused pilot 2k masters (looked, ok, uploaded): man-huynh-1 3z5T87dREY | man-quytu-3 DoJvbzipcl | man-suthan-1 WDloEZKcXe | man-thaiy-1 Lwo4GkOswO | mama-k01 bxVSNT35Y2 | mama-k05 TdUtFUPVNR | eunuch-u01 TdUtFCqVNR | eunuch-u05-r2 0eSIQC0TfW   (still to reuse: eunuch-u09-r3 s789zGil8e; kids are a14/a9 pilot ids in pilot-misc.md)
man-congtu-7-a18	DoJa27dpcl	ok
man-congtu-9-a18	Ifiq035tvE	ok
man-hoasu-1-a18	kspJad916B	ok
man-huynh-2-a18	lJI6HvJgv9	ok
man-nhacsu-1-a18	MB7vZ4bDCm	ok
man-quytu-1-a18	iGbTSxH3uK	ok
man-quytu-2-a18	fHGreThCDY	ok
man-quytu-4-a18	Lwo9QCeswO	ok (all uploaded; S2 total so far 39 files uploaded, 31 new gens x65 = 2015 cr)
## man a18 still to do: quytu-5..9, suthan-2, thive-1..4, vuonggia-1..2 (12); then mama k02-k04,k06-k08; eunuch u09-r3 reuse s789zGil8e + rest
man-quytu-5-a18	gOtiKYySXO	ok
man-quytu-6-a18	tC3bDlUmZJ	ok
man-quytu-7-a18	Lwo9qn5swO	ok
man-quytu-8-a18	4RQYgod9Aa	ok
man-quytu-9-a18	s78Nb0bl8e	ok
man-suthan-2-a18	gOtiKD3SXO	ok
man-thive-1-a18	vQ2kd4Sa47	ok
man-thive-2-a18	MB7vGsIDCm	ok (uploaded). Men left: thive-3, thive-4, vuonggia-1, vuonggia-2
man-thive-3-a18	Bh9QMx7oQR	ok
man-thive-4-a18	eIyC01YdqL	ok
man-vuonggia-1-a18	yiEzSdDPW9	ok
man-vuonggia-2-a18	Sym3xVfUb8	ok
mama-k02-a18	ovNFDSv829	ok
mama-k03-a18	WDl825rcXe	ok
mama-k04-a18	bxVUEG85Y2	ok (7 pinholes accepted)
mama-k06-a18	ovNFDJE829	ok (4 pinholes accepted)
## ALL man a18 (33) DONE + uploaded. mama a18 left: k07, k08. Then eunuch a18 (u01 done; u05-r2 done; u09-r3 reuse s789zGil8e; rest ~117), kid a18-equivalent (a14/a9 in list; pilot ids in pilot-misc.md: kid-f01-a14 yiEGDDLPW9, f05 aFAkU3mfSh, p03-a9 Cqzr72fEEy).
mama-k07-a18	iGbT9CV3uK	ok
mama-k08-a18	EbnjaRRuuO	ok
eunuch-u02-a18	lJI6jd8gv9	ok
eunuch-u02-r0-a18	yiEz7voPW9	ok
eunuch-u02-r2-a18	P3unJCZ42C	ok
eunuch-u02-r3-a18	s78NxoGl8e	ok
eunuch-u03-a18	fHGrhnTCDY	ok
eunuch-u03-r0-a18	P3unJqY42C	ok (all uploaded)
## HANDOVER S2 -> S3 (17/11 ~02:25Z, S2 context ~30%): 8 generation batches done, 71 new files + pilot reuse, all uploaded (fig+por; CDN has no hd for these). Done keys (fig-<key>.webp) in lists/shards/w1-done-2k.txt (+ pilot reused masters listed above: huynh-1, quytu-3, suthan-1, thaiy-1, mama-k01, mama-k05, eunuch-u01, eunuch-u05-r2 are DONE+uploaded too).
## DONE: all hero a18, all man a18 (33), all mama a18 (8), eunuch a18: u01, u01(base only), u02 x4, u03-a18, u03-r0, u05-r2.
## TODO order: eunuch a18 remaining (u01-r0/r2/r3, u03-r2/r3, u04..u30 x4 = ~108; eunuch-u09-r3 = reuse pilot master s789zGil8e (creations_wait for url; no new gen)); then kid (a14/a9 files; pilot masters yiEGDDLPW9 f01-a14, aFAkU3mfSh f05-a14, Cqzr72fEEy p03-a9; kid prompt: 'a child of about N years, round soft cheeks'), then other ages (a26/a36/a51) of man/mama/eunuch/kid and hero (player t1 a51, t3 a26.., emperor/physician/official/tutor/steward/fallen other ages; ref identity = new a18 + old age file).
## RECIPE per batch (works, ~35k tokens/batch of 8): (1) 8x creations_upload_image url=https://ctm-img.victoria-tntt.workers.dev/img/fig-<key>.webp -> id; (2) 8x images_generate mode gpt-2-6 width 1024 height 2048 resolution 2k extraSettings {"transparentBackground":true} references=[old id, N2HYqYa6D9, bxVgMSX5Y2, dtPf4EDXSL, eIyaPEVdqL] prompt (<110 words): 'Semi-realistic painterly guofeng style, near-3D soft light, fine detail, matching refs 2-5 (face beauty, porcelain skin, soft warm eyes, serene). Redraw image 1 as the same full-body handsome slim young palace eunuch about 18, same robe, hat, colours, embroidery. Gesture: <ONE: tray/fly-whisk/scroll/lantern>. No huadian, no beard. NOT pink or purple. Calm frontal. FULLY TRANSPARENT BACKGROUND (real alpha, cut-out PNG, no checkerboard, no shadow). Hem ends at the feet, both shoes visible, inside the canvas with margin.' (women add: tiny flower/leaf/butterfly huadian 1/12 face width, no teardrop, NO long trailing train); (3) one creations_wait on all 8 (re-wait the stragglers); (4) write tsv key<TAB>id<TAB>render url, run tools/w1_drv.py <tsv> <sheet.jpg> from a scratch dir that has m/ and out/ (needs pip scipy opencv-python-headless; edit T path to the repo tools dir) -> Read sheet once; (5) cp out/img -> repo img/, python3 dev/site/cdn_sync.py <files> (cdn_sync.py: git show origin/main:dev/site/cdn_sync.py > dev/site/cdn_sync.py, do not commit); (6) append TSV lines here, commit + push (recipe in task prompt). Failed gen (service 520) -> just resubmit.
## NOTE: lead session_011xDdVRBW26agruDT2Bm65K was inactive when S2 tried to report (send_message refused); report went to Foreman C instead.
## RULE UPDATES received after S2 handover (new lead = session_011xDdVS87fDNLJMJGzeiVWL; report to it, not #5):
- HD for EVERY fig (also eunuch/kid/man/mama): make the hd twin (1800 tall), upload img/hd/fig-* with the fig. Do NOT touch img/FIGURES-hd.json; per upload batch push a fragment dev/handover/reports/fig-cutout-clean/hd-entries/w1-<batch>.json = {"fig-x.webp":[w_fig,w_hd],...} (lead merges). See BATCH_BRIEF.md 'HD FOR EVERY FIGURE'. finish_fig only writes hd where the CDN has one: use FORCE_HD=1 (see tools/maid_proc.py).
- RETRO-FIT: all S2 files already live (keys in lists/shards/w1-done-2k.txt, except the 16 old 4k ones which already have hd/hd2) have fig+por only -> need hd twins made from the same masters (masters = creation ids in this file; re-download via creations_wait url) and uploaded + hd-entries fragment.
eunuch-u01-r0-a18	SymRBpPUb8	https://pikaso.cdnpk.net/private/production/6060867325/render.png?token=exp=1795219200~hmac=0f623043352c8c4533b8fbf9377b3c50248701896379465dce293151a38b3b82	ok 2k+hd (W4c-E1)
eunuch-u01-r2-a18	w4v28XX7EI	https://pikaso.cdnpk.net/private/production/6060867632/render.png?token=exp=1795219200~hmac=938983e50b9b8581ed7988d1a28c00043033890d4b806f52cb7df54cc34a2cee	ok 2k+hd (W4c-E1)
eunuch-u01-r3-a18	WDlIrkzcXe	https://pikaso.cdnpk.net/private/production/6060867614/render.png?token=exp=1795219200~hmac=622b9cfb111a93ecd8e800bc134dfbd0c9b13651a8bc63cd80a2df75d3a5e6f3	ok 2k+hd (W4c-E1)
eunuch-u03-r2-a18	Xm4Q77kBfo	https://pikaso.cdnpk.net/private/production/6060867864/render.png?token=exp=1795219200~hmac=373499b3f40498e1b95badd8ef424c614c8e1a5af2bf8b8a364fdf778d8a989f	ok 2k+hd (W4c-E1)
eunuch-u03-r3-a18	yiEnhvgPW9	https://pikaso.cdnpk.net/private/production/6060868040/render.png?token=exp=1795219200~hmac=8dfd630b5aac8cd627f908c3cae043be87390f91a36c09a48a4f4ec3fa4af65b	ok 2k+hd (W4c-E1)
eunuch-u04-a18	s786d2Sl8e	https://pikaso.cdnpk.net/private/production/6060873977/render.png?token=exp=1795219200~hmac=af14327777b7d723e58945ae179cc910fe2a3575b5a14cddb338c9646b8918ce	ok 2k+hd (W4c-E1)
eunuch-u04-r0-a18	jUB9pZcLD0	https://pikaso.cdnpk.net/private/production/6060874174/render.png?token=exp=1795219200~hmac=2a8c352daf33f6d773bdaea52f96c9b0e743855aab1bbc29611988b45cfe44a8	ok 2k+hd (W4c-E1)
eunuch-u04-r2-a18	0eSmLu2TfW	https://pikaso.cdnpk.net/private/production/6060874473/render.png?token=exp=1795219200~hmac=29908d01b0dd574e403c8b77f2b5123bbcb1f5fdc50ae9d6643fe121e88d35a4	ok 2k+hd (W4c-E1)
eunuch-u04-r3-a18	jUB9pGGLD0	https://pikaso.cdnpk.net/private/production/6060874619/render.png?token=exp=1795219200~hmac=16ec16823c96e7ef36b2d39341514c8ffa124bc0bbfd1411168746015ad2b52e	ok 2k+hd (W4c-E1)
eunuch-u05-a18	TdUhsbQVNR	https://pikaso.cdnpk.net/private/production/6060874749/render.png?token=exp=1795219200~hmac=c2d0991ddb92ace8a2f94330202b6c6ceb498301f30e87dac62bea93a3d9b7f5	ok 2k+hd (W4c-E1)
## W4c HANDOVER (17/11 ~03:20Z) — rolled at START_CTX 5% + 25%, successor W4d opened by the lead
- Done by W4c: eunuch a18 batch E1 (10 files: u01-r0/r2/r3, u03-r2/r3, u04, u04-r0/r2/r3, u05; fig+hd+por on CDN, fragment W4c-E1.json, TSV rows above with gen ids + render urls). HD RETRO-FIT of the 63 live S2 files (ids in lists + this file): sub-agent run, fragment hd-entries/W4c-hero-retro.json (see state below).
- NEXT (order): (1) confirm retro-fit result (W4c-hero-retro.json exists? entries count; SKIPPED keys); (2) eunuch a18 remaining = list in lists/ (eunuch-*-a18 from lists/shards/misc.txt minus rows in this file), ~102 left; then kid a18, then other ages. Rank rule: eunuchs plain-but-fine silk, no consort headdress, no forehead mark, never pink/purple.
- Pipeline that works: sub-agents with 10 keys each, 5 images_generate at a time (lead: max 5 in flight in total), brief = /tmp/claude-0/w/EUBRIEF.md (lost with the container; recipe: upload old fig as ref -> images_generate gpt-2-6 1024x2048 2k transparentBackground true refs [old, N2HYqYa6D9, bxVgMSX5Y2, dtPf4EDXSL, eIyaPEVdqL], prompt ~110 words with the plain eunuch wording + prop rotation + FULLY TRANSPARENT line -> creations_wait -> curl + alpha check + FORCE_HD=1 finish_fig + qa_fig + sheet -> upload fig/hd/por + fragment W4c-<batch>.json).
- Needs each new container: pip install scipy opencv-python-headless; git fetch origin main --depth=1 && git show FETCH_HEAD:dev/site/cdn_sync.py > dev/site/cdn_sync.py (uncommitted; also .cdn-state.json uncommitted).
- RETRO RESULT: 63/63 hd twins uploaded (0 skipped), fragment hd-entries/W4c-hero-retro.json (63 entries). Retro step (1) is DONE.
eunuch-u05-r0-a18	WDlI7dqcXe	https://pikaso.cdnpk.net/private/production/6060947154/render.png	ok 2k+hd (W4d-E2)
eunuch-u05-r3-a18	0eSmOoLTfW	https://pikaso.cdnpk.net/private/production/6060947497/render.png	ok 2k+hd (W4d-E2)
eunuch-u06-a18	bxVwdge5Y2	https://pikaso.cdnpk.net/private/production/6060947047/render.png	ok 2k+hd (W4d-E2)
eunuch-u06-r0-a18	TdUhyt0VNR	https://pikaso.cdnpk.net/private/production/6060947776/render.png	ok 2k+hd (W4d-E2)
eunuch-u06-r2-a18	dtPuiEMXSL	https://pikaso.cdnpk.net/private/production/6060947877/render.png	ok 2k+hd (W4d-E2)
eunuch-u06-r3-a18	aFArWp8fSh	https://pikaso.cdnpk.net/private/production/6060953168/render.png	ok 2k+hd (W4d-E2)
eunuch-u07-a18	6AqT1UDiJO	https://pikaso.cdnpk.net/private/production/6060953144/render.png	ok 2k+hd (W4d-E2)
eunuch-u07-r0-a18	IfibADitvE	https://pikaso.cdnpk.net/private/production/6060953594/render.png	ok 2k+hd (W4d-E2)
eunuch-u07-r2-a18	1ley8HLr4r	https://pikaso.cdnpk.net/private/production/6060953681/render.png	ok 2k+hd (W4d-E2)
eunuch-u07-r3-a18	p8OCN0Dehw	https://pikaso.cdnpk.net/private/production/6060954013/render.png	ok 2k+hd (W4d-E2)
## W4d: E2 done (10 eunuch a18 u05-r0/r3,u06x4,u07x4; 650 cr). Remaining eunuch a18 = 92 (batches /tmp list eu_todo minus these); maid-ty a18 resumed first per lead.
