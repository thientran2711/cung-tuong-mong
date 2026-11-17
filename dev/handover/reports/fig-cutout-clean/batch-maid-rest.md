# batch-maid-rest (W5 worker, shard lists/shards/maid-rest.txt, 3172 files) — resume file
START_CTX (worker #1, est.) ~10 %; roll over at ~35 %, never above 60 %. Lead = session_011xDdVRBW26agruDT2Bm65K (opens successors).
## Method that WORKS (per file, 83 credits)
1. creations_upload_image old CDN fig (https://ctm-img.victoria-tntt.workers.dev/img/<file>) into folder ba4aecfe-efce-47e2-b53f-30d292091886 -> id.
2. images_generate gpt-2-6 2048x4096 4k, refs [old id, face-consort 01 N2HYqYa6D9, 05 bxVgMSX5Y2, 12 dtPf4EDXSL, 18 eIyaPEVdqL]; prompt = pilot recipe (STYLE_ANCHOR prefix + identity line + "Embroidered fine silk with hairpins and small jewellery; she is a rich palace maid, nothing looks poor." + HANDS (prop rotates: fan, lantern, teacup, scroll, flower branch, jade pendant, handkerchief, book, hairpin fingertip) + HUADIAN + NO-TRAIN line + transparent/margins). 80 cr.
3. !! The 4k render has a FAKE baked checkerboard (alpha 255). Run images_remove_background on the creation (3 cr, same 2000x4000 output, true alpha) -> THAT url is the master.
4. scratch tool (not in repo; recreate if lost): post.py KEY URL... = curl master; tools/finish_fig.py MASTER KEY OUT (fig 900 + tn + por; writes _old); tools/fit_fig.py ... --H 1800 -> img/hd/ (CDN has no maid hd; made anyway, upload decision = lead); tools/qa_fig.py; sheet (new fig dark|light + face crop). Needs pip scipy opencv-python-headless.
5. LOOK at sheet. halo FAIL 2500-3300 on bg-removed edges = hair strands, looks clean (same as pilot m52); pinholes <400 ignore. Huadian auto = WARN only.
Outputs live in scratch /tmp/claude-0/w/out/img (NOT in git); upload to CDN (cdn_sync.py) after ~100 passed files.
## DONE (name -> gen id / bg-removed id), all looked OK
fig-maid-m01-a18 xSXPMlnjfW/1leOTEUr4r | m01-cold-a18 3z5VF9VREY/jUB4eovLD0 | m01-kc-a18 Ifiq4BTtvE/mER562ThJQ | m01-ngheo-a18 KLD70bKkqp/w4vZtCv7EI | m01-t1-a18 3z5VF3eREY/kspJVbC16B| m01-tm2 fHGrY5iCDY/3z5V1U6REY | m01-tm3 s78NmPul8e/4RQYqsy9Aa | m01-tm4 w4vZCZy7EI/w4vZC1u7EI | m02-a18 8a6HRqHIrU/YMsoSifWeC| m02-cold Bh9QRhgoQR/aFA1WDBfSh | m02-kc JNfAF67Oq4/s78NvFFl8e | m02-ngheo VXwhP8sMMU/MB7v427DCm | m02-t1 u5YLVrTQLD/xSXPtQWjfW| m02-t2 vQ2k0kKa47/bxVUoay5Y2 | m02-t3 P3unkYy42C/kspJtun16B | m02-t4 gOtiuZMSXO/0eSt4AtTfW | m02-t5 kspJt4u16B/huZKcBgvqL
## HARD: none
## CREDITS: 5 files x 83 + 0 retries = 415 (+ the first test bg-removal included)
## NEXT: m01-t2-a18 onward in shard order (a18 first, then a26/a36/a51 with the NEW a18 as identity ref + old file)

## HANDOVER NOTES (successor)
- Throughput: one batch of 4 = 4 uploads + 4 generates (parallel) + wait + 4 remove_bg + wait + post.py + one combined sheet view = ~14 calls, ~15k tokens. Keep sheets small (combo of 4 dark halves).
- Scratch /tmp/claude-0/w (post.py, combo.py, out/img) is per-container: a successor in a new container must recreate post.py (see Method 4) and RE-DOWNLOAD done masters from Magnific ids above if outputs are needed for upload (finished webps are NOT in git). UPLOADED to CDN: all done files up to m02-t5-a18 (25 figs; fig+por, plus tn where the CDN has it; --check same). hd twins NOT uploaded. Upload recipe: dev/site/cdn_sync.py is NOT on this branch; get it with `git fetch origin main --depth=1; git show FETCH_HEAD:dev/site/cdn_sync.py`, put it in <worktree>/dev/site/, copy files to <worktree>/img/(tn/), run `python3 dev/site/cdn_sync.py <files>` then `--check <files>` (proxy supplies the token; img/ must never be committed). Upload each batch of ~20 right after it passes (scratch is lost on container end).
- Prop rotation used: fan, lantern, teacup, scroll, flower branch, jade pendant, handkerchief+hairpin, book. t8/t7 high-rank files came out with hem at the feet, no train.
- The commit trailer in my first commit has a typo'd session id; ignore.

- STATUS 17/11 ~02:20Z: W5 #1 stopping here (context), 25/3172 done+uploaded, 0 hard. Lead: open the successor.

## W5 #2 (START_CTX ~8 %, 2k transparentBackground works: real alpha; no bg-removal needed). TSV key<TAB>gen id<TAB>status (uploaded=U)
maid-m02-t6-a18	jUB4EoGLD0	ok
maid-m02-t7-a18	Sym3qvsUb8	ok
maid-m02-t8-a18	1leOaotr4r	ok
maid-m02-tm0-a18	CqzxeTTEEy	ok
maid-m02-tm2-a18	bxVUtoL5Y2	ok
maid-m02-tm3-a18	gOtiHQ8SXO	ok
maid-m02-tm4-a18	O6CG11cynm	ok
maid-m03-a18	iGbTgSr3uK	ok
maid-m03-cold-a18	1leOEPPr4r	ok
maid-m03-kc-a18	s78Nq3vl8e	ok
maid-m03-ngheo-a18	TdUmZfzVNR	ok
maid-m03-t1-a18	4RQYlMT9Aa	ok
maid-m03-t2-a18	VXwh2QgMMU	ok
maid-m03-t3-a18	lJI6bndgv9	ok
maid-m03-t4-a18	9ZFWgBCNYZ	ok
maid-m03-t5-a18	KLD7f2Skqp	ok
maid-m03-t6-a18	9ZFWwpINYZ	ok
maid-m03-t7-a18	cpgI2Es0eP	ok
maid-m03-t8-a18	Bh9QVxJoQR	ok
maid-m03-tm0-a18	s78NKWNl8e	ok
maid-m03-tm2-a18	nVLB3QyYQD	ok
maid-m03-tm3-a18	rgdyHY3xtc	ok
maid-m03-tm4-a18	Sym3rpfUb8	ok
maid-m04-a18	IfiqpOmtvE	ok
- W5 #2 STATUS: 24 a18 files (m02-t6 .. m04-a18) done, ALL UPLOADED (fig+por+tn where exists; no hd). NEXT: maid-m04-cold-a18 (then shard order, line 'grep a18 maid-rest-A.txt'). Method now: upload old fig as ref (creations_upload_image, folder ba4aecfe...), images_generate gpt-2-6 1024x2048 2k + extraSettings transparentBackground (real alpha), 8 in one message, one creations_wait, driver drv.py (scratch, recreate: curl master, alpha check, finish_fig, qa_fig, contact sheet) -- hd NOT made. Prop rotation: fan, lantern, jade pendant, teacup, scroll, flower branch, handkerchief, book+hairpin.
maid-m04-cold-a18	MB7v04aDCm	ok U
maid-m04-kc-a18	s78NxaTl8e	ok U
maid-m04-ngheo-a18	aFA1m03fSh	ok U
maid-m04-t1-a18	YMsoGOAWeC	ok U
maid-m04-t2-a18	VXwhcinMMU	ok U
maid-m04-t3-a18	w4vZgKT7EI	ok U
maid-m04-t4-a18	rgdyKEXxtc	ok U
maid-m04-t5-a18	vQ2kte2a47	ok U
maid-m04-t6-a18	CqzxCLuEEy	ok U
maid-m04-t7-a18	DoJaDElpcl	ok U
maid-m04-t8-a18	Bh9QB51oQR	ok U
maid-m04-tm0-a18	79a27WgJAL	ok U
maid-m04-tm2-a18	iGbTiXi3uK	ok U
maid-m04-tm3-a18	xSXPx28jfW	ok U
maid-m04-tm4-a18	MB7vMbGDCm	ok U
maid-m05-a18	Bh9QBsSoQR	ok U
- W5 #2 STATUS: 40 a18 files done+uploaded (m02-t6..m05-a18). NEXT: maid-m05-cold-a18. Scratch driver (drv.py/up.sh) in session scratchpad, recreate if lost.
maid-m05-cold-a18	LwoNS3FswO	ok U
maid-m05-kc-a18	lJIiwGpgv9	ok U
maid-m05-ngheo-a18	kspOjit16B	ok U
maid-m05-t1-a18	0eSmDFHTfW	ok U
maid-m05-t2-a18	UPhZOVZwny	ok U
maid-m05-t3-a18	u5Ysq9zQLD	ok U
maid-m05-t4-a18	vQ21EyHa47	ok U
maid-m05-t5-a18	eIyEogzdqL	ok U
maid-m05-t6-a18	UPhZ4gFwny	ok U
maid-m05-t7-a18	kspOlky16B	ok U
maid-m05-t8-a18	EbnLKQIuuO	ok U
maid-m05-tm0-a18	rgdPUstxtc	ok U
maid-m05-tm2-a18	YMs8edXWeC	ok U (retry, 1st xSX4wSijfW failed 520)
maid-m05-tm3-a18	aFArqHMfSh	ok U
maid-m05-tm4-a18	lJIiyPUgv9	ok U
maid-m06-a18	ovNHfE9829	ok U
maid-m06-cold-a18	IfibH3DtvE	ok U
maid-m06-kc-a18	9ZFcY5vNYZ	ok U
maid-m06-ngheo-a18	s7869a6l8e	ok U
maid-m06-t1-a18	UPhZi1Iwny	ok U
maid-m06-t2-a18	lJIi9Kxgv9	ok U
maid-m06-t3-a18	TdUht9MVNR	ok U
maid-m06-t4-a18	79aARlMJAL	ok U
maid-m06-t5-a18	3z5MTghREY	ok U
