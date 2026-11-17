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
## W3 session 2 (successor; START_CTX ~8%). Finished files accumulate in container /home/user/cung-tuong-mong/out/img (NOT committed); upload via cdn_sync every ~100.
c02-t3-a18	6Aq0rnuiJO	OK
c02-t4-a18	CqzxT1sEEy	OK
c02-t5-a18	0eStyILTfW	OK
c02-t6-a18	Xm4uRqTBfo	OK
c02-t7-a18	p8Of6EQehw	OK
c02-t8-a18	YMso7twWeC	OK
c02-tcold-a18	Xm4uRuYBfo	OK
c02-tm0-a18	ovNF2kC829	OK
c02-tm1-a18	JNfAKNsOq4	OK
c02-tm2-a18	tC3bcukmZJ	OK
c02-tm3-a18	WDl84dCcXe	OK
c02-tm4-a18	IfiqWQ0tvE	OK
c03-kc-a18	w4vZb3s7EI	OK
c03-ngheo-a18	EbnjejyuuO	OK
c03-t1-a18	Xm4uGQGBfo	OK
c03-t2-a18	3z5VgpXREY	OK
c03-t3-a18	eIyCGMSdqL	OK
c03-t4-a18	iGbTSNw3uK	OK
c03-t5-a18	YMso9YfWeC	OK
c03-t6-a18	mER5DKEhJQ	OK(retry; first gen failed 520)
c03-t7-a18	eIyCzBOdqL	OK
c03-t8-a18	rgdyEsrxtc	OK
c03-tcold-a18	aFA1eFEfSh	OK
c03-tm0-a18	O6CGxiaynm	OK
c03-tm1-a18	p8OfnJsehw	OK
c03-tm2-a18	aFA1XAifSh	OK
c03-tm3-a18	kspJEdg16B	OK
c03-tm4-a18	ovNFT3x829	OK
c04-kc-a18	rgdyQ8pxtc	OK
c04-ngheo-a18	rgdyQIextc	OK
c04-t1-a18	N2HcU1S6D9	OK
c04-t2-a18	yiEzgYzPW9	OK
c04-t3-a18	lJI6kR8gv9	OK
c04-t4-a18	TdUmGf2VNR	OK
c04-t5-a18	vQ2kBg5a47	OK
c04-t6-a18	YMsoRCsWeC	OK
c04-t7-a18	9ZFWwBvNYZ	OK
c04-t8-a18	vQ2kBJxa47	OK
c04-tcold-a18	5jMwEAHKxe	OK
c04-tm0-a18	gOtixaWSXO	OK
c04-tm1-a18	gOtixfCSXO	OK
c04-tm2-a18	Xm4uMZvBfo	OK
c04-tm3-a18	79a2lqdJAL	OK
c04-tm4-a18	lJI6rQ7gv9	OK
c05-kc-a18	dtPEVGHXSL	OK
c05-ngheo-a18	Sym3jbgUb8	OK
c05-t1-a18	DoJacGhpcl	OK
c05-t2-a18	iGbT9kI3uK	OK
c05-t3-a18	jUB41tzLD0	OK
c05-t4-a18	Sym3sCKUb8	OK
c05-t5-a18	dtPEDRfXSL	OK
c05-t6-a18	dtPEDZCXSL	OK
c05-t7-a18	3z5VNlKREY	OK
c05-t8-a18	rgdyKfNxtc	OK
c05-tcold-a18	WDl8zN6cXe	OK
## HANDOVER (W3 session 2, START_CTX ~8%, stopped ~30%) 17/11 ~02:20Z
Done this session: 56 files (c02-t3 .. c05-tcold, all a18, all looked OK on dark+light; 1 gen retry c03-t6 after a 520). Total done+uploaded: 76 a18 (c01 all, c02 all, c03 all, c04 all, c05 kc/ngheo/t1..t8/tcold). UPLOADED via cdn_sync 176 twins (fig + hd + tn + por where CDN has them), 17/11 ~02:15Z (--check run).
NEXT: c05-tm0-a18 then c05-tm1..tm4, c06 .. c16 (a18), then a26, a36, a51 (new a18 as identity ref) from lists/shards/consort-rest-A.txt.
Workflow (works, ~25k tokens/8 files): 8 creations_upload_image of old fig (https://ctm-img.victoria-tntt.workers.dev/img/fig-consort-<key>.webp) -> 8 images_generate gpt-2-6 1024x2048 2k extraSettings transparentBackground refs [old, N2HYqYa6D9, bxVgMSX5Y2, dtPf4EDXSL, eIyaPEVdqL] (prompt <=110 words, per-file gesture; t8 = "empress gown, hem ends at the feet, NO long trailing train") -> one creations_wait -> batch.py (curl, alpha check, finish_fig, qa_fig, dark+light sheet + forehead strip; run with nohup in background, ~2 min) -> look at sheet once. All masters had real alpha. Script lived in scratch (rewrite: ~40 lines). cdn_sync.py from main (git show FETCH_HEAD:dev/site/cdn_sync.py); copy out/img/* into repo img/ then cdn_sync <files>.
Credits this session: 57 x 65 = 3705 (incl. 1 failed gen not charged?) ; session total ~5200.
Ids TSV above (gen id per key). Render URLs expire ~2026-11-17+.
## W3c (successor, START_CTX ~5%) 17/11
HD retro-fit done: 10 kc/ngheo a18 (c01-c05) hd twins uploaded; fragment hd-entries/W3c-0.json (10). Other 65 live files already had hd on CDN. NEXT: c05-tm0-a18.
## W3c uploads 17/11: 32 a18 (c05-tm0..c07-tcold) UPLOADED (106 twins incl hd), fragment hd-entries/W3c-1.json. Gen ids:
c05-tm0-a18 gOt3PMLSXO; c05-tm1 9ZFcAhXNYZ; c05-tm2 jUB97VKLD0; c05-tm3 N2H0GC86D9; c05-tm4 eIyEmwGdqL; c06-kc eIyEmJndqL; c06-ngheo 1leySe3r4r; c06-t1 Xm4Qv9WBfo; c06-t2 WDlIBGycXe; c06-t3 O6Cz276ynm; c06-t4 WDlIo9LcXe; c06-t5 CqzjrQWEEy; c06-t6 6AqTc4JiJO; c06-t7 8a6qF0kIrU; c06-t8 dtPuCmKXSL; c06-tcold LwoN4JeswO (note: hem covers shoes, no huadian)
c06-tm0 VXwvo1KMMU; c06-tm1 eIyEms3dqL; c06-tm2 iGbVnC23uK; c06-tm3 xSX4wVmjfW; c06-tm4 mERKQNFhJQ; c07-kc P3uYZfJ42C; c07-ngheo 9ZFcAQhNYZ; c07-t1 JNfGiC9Oq4; c07-t2 eIyEauLdqL; c07-t3 aFArKjBfSh; c07-t4 u5YsxUJQLD; c07-t5 MB7amQJDCm; c07-t6 u5YsxJPQLD; c07-t7 JNfGZV5Oq4; c07-t8 JNfGZp1Oq4; c07-tcold dtPufjNXSL
Next: todo_02 (c08..) running, todo_03; keys in /tmp/w lists = a18 order of lists/shards/consort-rest-A.txt after c05-tcold.
## W3c uploads (2) 17/11: chunk02 (c07-tm0..c08-tcold, minus c08-t1) and chunk03 (c08-tm0..c09-tcold, minus c09-t1) uploaded; fragments W3c-2.json, W3c-3.json. t1 HOLD (Foreman C): c08-t1 (gen jUB9NTELD0) and c09-t1 (tC35kALmZJ) generated but NOT uploaded.
Gen ids chunk02: c07-tm0 cpgtmEm0eP; tm1 nVLo8fCYQD; tm2 79aAGV5JAL; tm3 xSX49zljfW; tm4 SymRZVWUb8; c08-kc mERKk7BhJQ; ngheo 6AqTVvBiJO; t2 xSX4i4NjfW; t3 JNfGWztOq4; t4 LwoNRiXswO; t5 3z5MdewREY; t6 bxVwyPU5Y2; t7 JNfGW0fOq4; t8 Bh9F5jCoQR; tcold eIyEHrgdqL
chunk03: c08-tm0 79aAzoLJAL; tm1 6AqTMEIiJO; tm2 vQ21x3Ca47; tm3 P3uYcCs42C; tm4 79aAzvwJAL; c09-kc IfibxfqtvE; ngheo s786AJDl8e; t2 u5YswmBQLD; t3 iGbVdPd3uK; t4 lJIiAxKgv9; t5 WDlIanScXe; t6 aFArla9fSh; t7 1leyixXr4r; t8 YMs8a0RWeC; tcold nVLov0nYQD
REDO LIST (maid-like by old prompt, rank rule): c08-kc, c08-ngheo, c08-tcold(plain), c08-t2(plain), c07-tm0..tm4 / c07-kc / c07-ngheo lightly plain; c06-tcold (hem covers shoes, no huadian); t1 files live: c01..c07-t1.
## W3c uploads (3) 17/11: chunk04 (c09-tm0..c10-tcold) + chunk05 (c10-tm0..c11-tcold), t1 skipped (c10-t1, c11-t1 NOT generated, Foreman C hold); fragment W3c-4.json. Gen ids:
c09-tm0 eIyE1mmdqL; tm1 yiEneZuPW9; tm2 dtPuxEuXSL; tm3 iGbVtVE3uK; tm4 79aADqwJAL; c10-kc IfibgW0tvE; ngheo IfibSjLtvE; t2 fHGxywaCDY; t3 Bh9FsXNoQR; t4 MB7a1pBDCm; t5 5jM720WKxe; t6 KLDJAVIkqp; t7 eIyELChdqL; t8 jUB9c9ZLD0; tcold EbnLNC3uuO
c10-tm0 P3uYXA042C; tm1 P3uYXGT42C; tm2 Xm4QjZ6Bfo; tm3 rgdPGhfxtc; tm4 TdUh5CFVNR; c11-kc KLDJ29nkqp; ngheo fHGxyo6CDY; t2 s786ck9l8e; t3 lJIiM1vgv9; t4 5jM7GQfKxe; t5 SymReX9Ub8; t6 5jM7zWAKxe; t7 xSX4TtVjfW; t8 JNfG8HkOq4; tcold P3uYhYY42C (plain, no huadian visible)
Skipped t1 keys to do after owner OK: c10-t1, c11-t1 (+ held generated: c08-t1 jUB9NTELD0, c09-t1 tC35kALmZJ).
NOTE (lead 17/11): 'richer than maid' wording was used for chunks 04-06 (c09-tm0 .. c12-tcold, incl. c09-kc/ngheo redo; chunk02/03 c07-tm..c09-tcold partly pre-rule). Live, not pulled back pending Foreman C decision from rank-sample/consort-rest-A-t2t3-compare.jpg (pairs: c06-t2, c07-t3, c09-t2, c10-t3, c12-t2 new | c01 live). Since 03:40Z new generations use 'same rank and richness as image 1'.
## W3c uploads (4) 17/11: chunk06 (c11-tm0..c12-tcold, no c12-t1) + c13-tm0..c14-t2 (8) uploaded, fragment W3c-5.json (22). Gen ids:
c11-tm0 8a6q4MBIrU; tm1 w4v2tLx7EI; tm2 yiEnfoKPW9; tm3 DoJfwLhpcl; tm4 vQ21ZHja47; c12-kc 6AqTHnkiJO; ngheo lJIi8aygv9; t2 p8OCJ6Yehw; t3 Xm4Q6FMBfo; t4 P3uYH0Z42C; t5 s786hnWl8e; t6 5jM7dRsKxe; t7 KLDBGikqp (KLDJBGikqp); t8 EbnLT6DuuO; tcold 9ZFckCSNYZ
c13-tm0 0eSm9KNTfW; tm1 iGbVsfm3uK; tm2 aFArM49fSh; tm3 tC35cORmZJ; tm4 nVLoPE6YQD; c14-kc P3uYxB242C; ngheo ovNHYM3829; t2 gOt3HxJSXO
PAUSED by owner priority (rank standard sheet pushed in rank-standard/). t1 UNHELD by Foreman C GO but not generated yet: todo t1 keys c08,c10,c11,c12,c13,c14 (+ c09-t1 gen tC35kALmZJ generated, NOT uploaded). Remaining queue: /tmp/w/todo_08 rest (c14-t1,t3..tcold) and todo_09.. (a18 order of consort-rest-A.txt after c14-t2), then a26/a36/a51.
