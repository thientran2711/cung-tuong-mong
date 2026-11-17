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
- W5b #2 HANDOVER (context): 64 new a18 done at 2k + uploaded fig/por/tn/hd (m02-t6 .. m06-t5), plus hd retro for 40 + 17 older masters (fragments hd-entries/W5b-*.json). 8 older W5#1 files (m01-t2..t8, m01-tm0) have NO recorded master id -> no hd possible, list for lead/redo. NEXT: maid-m06-t6-a18 (then m06-t7,t8,tm0,tm2-4, m07...). Lead #6 = session_011xDdVS87fDNLJMJGzeiVWL. NEW RULE (lead #6): maids = ONE plainer uniform look (small trâm, plainer cut/hair); put look-alike-consort cases in a redo list here. Recipe: upload old fig as ref (folder ba4aecfe-efce-47e2-b53f-30d292091886), images_generate gpt-2-6 1024x2048 2k transparentBackground, send <=5 at once (shared account hits 48 slots/rate limit), one creations_wait, scratch drv.py (curl, alpha check, finish_fig FORCE_HD=1, qa_fig, one sheet) + up.sh/hd.sh (cdn_sync + fragment); recreate if container lost. Don't commit dev/site/cdn_sync.py.

## W5c (START_CTX ~6 %; roll over at ~31 %, ceiling 60 %). Method: sub-agents A1.. each 8 files (5+3 images_generate, plain-maid prompt per RANK RULE), they upload + write hd-entries/W5c-<agent>.json; I push. Queue = scratch queue.txt (a18 m06-t6 onward, then 8 older m01 files at the end).
maid-m06-t6-a18	xSX4RyyjfW	ok U
maid-m06-t7-a18	5jM79wPKxe	ok U
maid-m06-t8-a18	xSX4R4EjfW	ok U
maid-m06-tm0-a18	p8OCqE9ehw	ok U
maid-m06-tm2-a18	P3uYMc842C	ok U
maid-m06-tm3-a18	LwoN232swO	ok U LOOKALIKE (layered outer robe) redo after anchor
maid-m06-tm4-a18	TdUhuCkVNR	ok U
maid-m07-a18	LwoN2ZGswO	ok U
maid-m07-cold-a18	YMs8uCpWeC	ok U
maid-m07-kc-a18	SymR0cNUb8	ok U
maid-m07-ngheo-a18	SymR00PUb8	ok U
maid-m07-t1-a18	nVLoEutYQD	ok U
maid-m07-t2-a18	LwoNnWYswO	ok U
maid-m07-t3-a18	SymR0MNUb8	ok U
maid-m07-t4-a18	fHGxJ4qCDY	ok U
maid-m07-t5-a18	cpgtFKt0eP	ok U
maid-m07-t6-a18	0eSm1pJTfW	ok U
maid-m07-t7-a18	79aABNnJAL	ok U
maid-m07-t8-a18	vQ214q7a47	ok U
maid-m07-tm0-a18	bxVwGlf5Y2	ok U
maid-m07-tm2-a18	WDlIKo7cXe	ok U
maid-m07-tm3-a18	gOt3pcXSXO	ok U
maid-m07-tm4-a18	ovNHwl7829	ok U
maid-m08-a18	vQ214OYa47	ok U
- W5c: 24 done (m06-t6..m08-a18). NEXT maid-m08-cold-a18 (queue line 25).
maid-m08-cold-a18	gOt3XLwSXO	ok U
maid-m08-kc-a18	IfibPBMtvE	ok U
maid-m08-ngheo-a18	s786ejfl8e	ok U
maid-m08-t1-a18	cpgtxWl0eP	ok U
maid-m08-t2-a18	EbnLZE9uuO	ok U
maid-m08-t3-a18	EbnL2QNuuO	ok U LOOKALIKE (wide layered sleeves, rich peony) redo after anchor
maid-m08-t4-a18	p8OCUXuehw	ok U LOOKALIKE (tiered skirt, rich embroidery) redo after anchor
maid-m08-t5-a18	SymRoJhUb8	ok U
- W5c: 32 done. NEXT maid-m08-t6-a18 (queue line 33).
maid-m08-t6-a18	aFArAS6fSh	ok U
maid-m08-t7-a18	1leyeRpr4r	ok U
maid-m08-t8-a18	0eSmSFRTfW	ok U
maid-m08-tm0-a18	1leye2Ir4r	ok U
maid-m08-tm2-a18	1leyeAXr4r	ok U
maid-m08-tm3-a18	jUB9BYTLD0	ok U
maid-m08-tm4-a18	vQ212O3a47	ok U
maid-m09-a18	IfibiwktvE	ok U
- W5c: 40 done. NEXT maid-m09-cold-a18 (queue line 41).
maid-m09-cold-a18	EbnL06puuO	ok U
maid-m09-kc-a18	1leyo0vr4r	ok U
maid-m09-ngheo-a18	EbnL0ZBuuO	ok U
maid-m09-t1-a18	N2H0KEw6D9	ok U
maid-m09-t2-a18	LwoNmX3swO	ok U
maid-m09-t3-a18	Bh9F2tLoQR	ok U
maid-m09-t4-a18	s786huFl8e	ok U
maid-m09-t5-a18	nVLoS4EYQD	ok U
- W5c: 48 done. NEXT maid-m09-t6-a18 (queue line 49).
- OWNER VERDICT (lead 17/11 ~03:45Z): original maid look approved; NO maid redo; look-alike list and rank-sample/maid-rest-A-at-risk.tsv are IGNORED. From A8 on: original rich-silk prompt (brief2).
- PLAIN-PROMPT BATCH (painted with the 'plain maid' prompt, lead asks Foreman C whether they stay; do not repaint): maid-m06-t6..m06-tm4, m07-a18, m07-cold..m07-t5, m07-t6..m07-tm4, m08-a18, m08-cold..m08-t5, m08-t6..m08-tm4, m09-a18, m09-cold..m09-t5 (all -a18) = 48 files, + A7 (m09-t6..m10-a18, 8) in progress.
maid-m09-t6-a18	LwoNCGxswO	plain U (repaint pending)
maid-m09-t7-a18	P3uY1d242C	plain U
maid-m09-t8-a18	YMs8yQ9WeC	plain U
maid-m09-tm0-a18	jUB9fW9LD0	plain U
maid-m09-tm2-a18	IfibY7utvE	plain U
maid-m09-tm3-a18	p8OCROOehw	plain U
maid-m09-tm4-a18	Xm4QANQBfo	plain U
maid-m10-a18	CqzjDWTEEy	plain U
- W5c: 56 plain-prompt files (m06-t6 .. m10-a18) being REPAINTED to own original look (agents R1..R7, redo.txt in scratch). NEW MAIDS PAUSED (owner rank standard pending). RESUME POINT for new maids: maid-m10-cold-a18 (a18 queue then a26/a36/a51; 8 old m01 files at end). Redo TSV = lines tagged 'redo'.
maid-m06-t6-a18	lJIiqFlgv9	redo ok U
maid-m06-t7-a18	nVLo948YQD	redo ok U
maid-m06-t8-a18	kspOfaz16B	redo ok U
maid-m06-tm0-a18	iGbVUS13uK	redo ok U
maid-m06-tm2-a18	3z5MwUwREY	redo ok U
maid-m06-tm3-a18	lJIiqqSgv9	redo ok U
maid-m06-tm4-a18	SymR556Ub8	redo ok U
maid-m07-a18	s786HHZl8e	redo ok U
maid-m07-cold-a18	UPhZxvvwny	redo ok U
maid-m07-kc-a18	VXwvz72MMU	redo ok U
maid-m07-ngheo-a18	huZkX2IvqL	redo ok U
maid-m07-t1-a18	O6Czlu9ynm	redo ok U
maid-m07-t2-a18	dtPu09fXSL	redo ok U
maid-m07-t3-a18	8a6qD3gIrU	redo ok U
maid-m07-t4-a18	3z5MykbREY	redo ok U
maid-m07-t5-a18	N2H07bj6D9	redo ok U
maid-m07-t6-a18	s786xRgl8e	redo ok U
maid-m07-t7-a18	1ley597r4r	redo ok U
maid-m07-t8-a18	EbnLagSuuO	redo ok U
maid-m07-tm0-a18	SymRsAMUb8	redo ok U
maid-m07-tm2-a18	DoJfTu7pcl	redo ok U
maid-m07-tm3-a18	5jM7HyoKxe	redo ok U
maid-m07-tm4-a18	jUB91iqLD0	redo ok U
maid-m08-a18	mERK8xfhJQ	redo ok U
maid-m08-cold-a18	5jM75EPKxe	redo ok U
maid-m08-kc-a18	8a6q8DPIrU	redo ok U
maid-m08-ngheo-a18	3z5M3yLREY	redo ok U
maid-m08-t1-a18	Bh9FBVeoQR	redo ok U
maid-m08-t2-a18	lJIil1Pgv9	redo ok U
maid-m08-t3-a18	JNfGJloOq4	redo ok U
maid-m08-t4-a18	rgdPrq8xtc	redo ok U
maid-m08-t5-a18	EbnLEmIuuO	redo ok U
maid-m08-t6-a18	Xm4Ft4TBfo	redo ok U
maid-m08-t7-a18	MB7fXJdDCm	redo ok U DRIFT (peach-gold + phoenix crown like t6; original figures already alike) - lead to confirm, no redo
maid-m08-t8-a18	79aG4f2JAL	redo ok U DRIFT (same as t7)
maid-m08-tm0-a18	4RQc3FX9Aa	redo ok U
maid-m08-tm2-a18	UPh2yvpwny	redo ok U
maid-m08-tm3-a18	9ZF0RHuNYZ	redo ok U
maid-m08-tm4-a18	cpgmDSO0eP	redo ok U
maid-m09-a18	s78iwIbl8e	redo ok U
maid-m09-cold-a18	vQ2rqiba47	redo ok U
maid-m09-kc-a18	fHGj5R9CDY	redo ok U
maid-m09-ngheo-a18	O6CnRhbynm	redo ok U
maid-m09-t1-a18	rgd4wMFxtc	redo ok U
maid-m09-t2-a18	Lwo6OdgswO	redo ok U
maid-m09-t3-a18	rgd4wDyxtc	redo ok U
maid-m09-t4-a18	UPh2NIYwny	redo ok U
maid-m09-t5-a18	fHGj5ZNCDY	redo ok U
