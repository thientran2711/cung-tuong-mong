# BATCH consort-rest (W3) — progress (English)
START_CTX ~6% of window (1M); rollover at ~31%, never above 60%.
Method per file: upload old fig (creations_upload_image) -> images_generate gpt-2-6 2048x4096 4k refs [old fig, faces 01/05/12/18] (80 cr) -> FINDING: master is OPAQUE with a baked checkerboard (no real alpha) -> images_remove_background (3 cr) -> curl render.png -> tools/finish_fig.py -> qa_fig.py -> LOOK dark+light. ~83 cr/file. Halo metric flags FAIL (>3000) on pink gowns that look clean on dark+light: accepted by eye. Pinholes <400 ignored.
Prompt = FAMILY_BRIEF recipe + natural proportions + per-file gesture + "No haze or glow around the head" + NO-TRAIN line (hem ends at the feet, both shoes visible).
## Done (by eye OK; finished webps in scratch only, NOT uploaded yet) — key: gen id / cutout id
c01-kc-a18 KLD7c1jkqp / gOtiXvuSXO
c01-ngheo-a18 rgdyMNcxtc / ovNFy00829
c01-t1-a18 fHGrRlDCDY / nVLB161YQD
c01-t2-a18 6Aq0ue7iJO / UPhR8r3wny
c01-t3-a18 u5YLGDyQLD / dtPEO1CXSL
c01-t4-a18 eIyC7RwdqL / u5YLzyuQLD
c01-t5-a18 jUB4efvLD0 / 8a6H9UOIrU
c01-t6-a18 iGbTFlO3uK / N2HcQos6D9
c01-t7-a18 N2HcFkZ6D9 / Lwo9oAUswO (halo 5366 FAIL metric, clean by eye)
c01-t8-a18 cpgIlOm0eP / bxVUV9E5Y2 (empress gown, hem at feet, no train)
c01-tcold-a18 TdUmS4SVNR / mER5RgOhJQ
c01-tm0-a18 3z5Vbs6REY / eIyCy1hdqL
## Hard: none yet
Credits so far: 12 x 83 = 996.
## UPDATE 17/11 ~01:55Z — SHARD NOW consort-rest-A.txt ONLY (976). 2K ONLY from here (1024x2048, 65 cr, extraSettings {"transparentBackground": true} gives REAL alpha: verified on 8 files, no remove_background needed). a18 first.
First 12 above = 4k (+remove_background), kept. TSV from here (key / gen id / status OK):
c01-tm1-a18	YMsoliEWeC	OK
c01-tm2-a18	fHGrz8lCDY	OK
c01-tm3-a18	Ifiq3eAtvE	OK
c01-tm4-a18	UPhRvsiwny	OK
c02-kc-a18	O6CGEwCynm	OK
c02-ngheo-a18	vQ2kAhua47	OK
c02-t1-a18	lJI6tlWgv9	OK
c02-t2-a18	fHGrnEyCDY	OK
## HANDOVER (W3 session 1, START_CTX ~6%, stopped ~30%)
Done: 20 files (all c01 a18 + c02 kc/ngheo/t1/t2). NEXT: c02-t3-a18 onward through consort-rest-A.txt (a18 first). Finished webps are SCRATCH ONLY (not uploaded, not committed): to upload they must be regenerated from the gen ids (curl the render URL from creations_get, then tools/finish_fig.py) or re-run. NOTE: render URLs expire; if a successor needs the files, re-run finish from creation ids via creations_get urls (token exp ~2026-11-17+). Nothing uploaded to CDN yet.
Workflow that worked: 8 creations_upload_image of old figs in one message -> 8 images_generate in one message (short prompt <=110 words, per-file gesture) -> one creations_wait with all ids -> one batch.py bash (download, alpha check, finish_fig, qa_fig, dark+light sheet + forehead strip) -> look at 2 images. Run the bash with run_in_background or timeout 300000 (it takes ~2 min per 8).
Credits: ~996 (12 at 4k incl. cutout) + 8 x 65 = 520 -> ~1516.
UPLOADED 17/11 ~02:00Z: all 20 files (63 twins incl. por/tn/hd where the CDN has them) via cdn_sync, --check same 63. Successor: continue at c02-t3-a18; upload ~every 100.
