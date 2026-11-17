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
