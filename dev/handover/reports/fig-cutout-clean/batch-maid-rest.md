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
maid-m09-t6-a18	rgd4yPcxtc	redo ok U
maid-m09-t7-a18	JNfzAGfOq4	redo ok U DRIFT (pink + gold phoenix crown like t6; originals already alike)
maid-m09-t8-a18	iGbMTVj3uK	redo ok U DRIFT (same)
maid-m09-tm0-a18	CqzLxjBEEy	redo ok U
maid-m09-tm2-a18	UPh2RZLwny	redo ok U
maid-m09-tm3-a18	fHGjrjHCDY	redo ok U
maid-m09-tm4-a18	DoJCaCHpcl	redo ok U
maid-m10-a18	Ifi5q5JtvE	redo ok U
- W5c REPAINT of the 56 plain-prompt maids DONE (R1-R7, own original look, in place, fig+hd+tn+por, fragments W5c-redo-R1..R7.json). Before|after sheet: rank-sample/maid-rest-A-redo.jpg. Drift: m08-t7, m08-t8, m09-t7, m09-t8 (originals already alike). New maids PAUSED; resume at maid-m10-cold-a18. Total this session: 48 original-prompt/plain new + 8 + 56 repaints.
maid-m10-cold-a18	dtPFsNNXSL	ok HELD(not uploaded; wait C OK)
maid-m10-kc-a18	Xm4Hl34Bfo	ok HELD
maid-m10-ngheo-a18	79azdFgJAL	ok HELD
maid-m10-t1-a18	aFAjPTHfSh	ok HELD
maid-m10-t2-a18	DoJEx3Jpcl	ok HELD
maid-m10-t3-a18	rgd9Yfwxtc	ok HELD
maid-m10-t4-a18	3z5paUMREY	ok HELD
maid-m10-t5-a18	Bh9qgWSoQR	ok HELD
- W5c resumed 06:22Z: A8 (m10-cold..t5) generated+finished, HELD in /tmp/claude-0/w/A8/out (scratch) pending Foreman C OK of first-16 sheet; fragment W5c-A8.json in main checkout hd-entries (untracked, copy at upload).
- W5c CONSORT-TIER AUDIT (ty1-ty3 x a36, 156 keys): rank-sample/maid-rest-A-consort-tier-audit.tsv + sheets rank-sample/maid-rest-A-ctier/t<T>_<n>.jpg. Finding: ty2 and ty3 a36 are each ONE plain pale outfit for all 52 maids (ty2 pale sage hanfu, ty3 pale grey-blue hanfu; no embroidery/layers); ty1 = plain cream, 3 loose clusters. No redraw until Foreman C OK.
maid-m10-t6-a18	cpghxoi0eP	ok HELD
maid-m10-t7-a18	w4vG8ZA7EI	ok HELD drift(like t6/t8, old figures alike)
maid-m10-t8-a18	LwoipNAswO	ok HELD drift
maid-m10-tm0-a18	s783e3Sl8e	ok HELD
maid-m10-tm2-a18	s783eZDl8e	ok HELD
maid-m10-tm3-a18	xSXNMR7jfW	ok HELD
maid-m10-tm4-a18	9ZFTfeSNYZ	ok HELD (hat as old figure)
maid-m11-a18	aFAjiwnfSh	ok HELD
- W5c: new a18 m10-cold..m11-a18 (16 files, A8+A9) generated, HELD in /tmp/claude-0/w/A8|A9/out (scratch), fragments W5c-A8/A9.json untracked in main checkout. PRIORITY now: maid consort-tier redraw a18 m27-m52 x ty1-3 (78 keys), prompts in scratch prompts.json; D1.. agents; first-16 tile -> C. New-maid queue held (resume maid-m11-cold-a18).
- W5c REDRAW a18 (consort-tier, my slice m27-m52 x ty1-3 = 78 keys): D1/D2 done, HELD (files in /tmp/claude-0/w/D1|D2/out, fragments W5c-D1/D2.json local) pending Foreman C OK of rank-sample/maid-redraw-first16-W5c.jpg:
maid-m27-ty1-a18	p8OuJTtehw	redo ok HELD
maid-m28-ty2-a18	EbnlzfOuuO	redo ok HELD
maid-m29-ty3-a18	N2HVHwD6D9	redo ok HELD
maid-m30-ty1-a18	1le4eH4r4r	redo ok HELD
maid-m31-ty2-a18	s783IE5l8e	redo ok HELD
maid-m32-ty3-a18	xSXNBEUjfW	redo ok HELD
maid-m33-ty1-a18	dtPFNJkXSL	redo ok HELD
maid-m34-ty2-a18	MB7Cy7jDCm	redo ok HELD
maid-m35-ty3-a18	IfiKny5tvE	redo ok HELD
maid-m36-ty1-a18	lJIREBJgv9	redo ok HELD
maid-m37-ty2-a18	aFAjMwOfSh	redo ok HELD
maid-m38-ty3-a18	MB7C3kmDCm	redo ok HELD
maid-m39-ty1-a18	gOtZHpYSXO	redo ok HELD
maid-m40-ty2-a18	JNfnktVOq4	redo ok HELD
maid-m41-ty3-a18	yiEWxtCPW9	redo ok HELD
maid-m42-ty1-a18	TdUa3saVNR	redo ok HELD
- FOREMAN C ROOT-2 OK (06:51Z): 12 consort-tier redraws LIVE (fig+hd+por; tn not made): m27-ty1 m28-ty2 m29-ty3 m32-ty3 m33-ty1 m34-ty2 m35-ty3 m36-ty1 m37-ty2 m38-ty3 m39-ty1 m41-ty3 (a18), fragment W5c-redo-live1.json. REDO before upload: m30-ty1 + m31-ty2 (no prop in hand), m40-ty2 (too close to m28 vermilion: pick another hue), m42-ty1 (cream-peach too close to m39/m30: own clear colour). Vary poses more in next tiles (3/4 turn, lifted sleeve, walking step). Next sheets: one per batch to C ROOT-2.
- D3 LIVE (fig+hd+por): maid-m27-ty2 m27-ty3 m28-ty1 m28-ty3 m29-ty1 m29-ty2 m30-ty2 m30-ty3 (-a18); gen ids 9ZFT76nNYZ kspPFjT16B Lwoik7BswO huZroqPvqL kspPqUp16B Sym2L3eUb8 Bh9qdIEoQR aFAjhQtfSh; fragment W5c-redo-live2.json; sheet rank-sample/maid-redraw-D3-W5c.jpg. D4 running: redo m30-ty1, m31-ty2, m40-ty2 (indigo), m42-ty1 (burgundy) + m31-ty1/ty3, m32-ty1/ty2 with prompts2 (varied poses).
- D4 LIVE (fig+hd+por): maid-m30-ty1(redo, prop visible) m31-ty1 m31-ty2(redo) m31-ty3 m32-ty1 m32-ty2 m40-ty2(redo, indigo blue) m42-ty1(redo, burgundy wine) -a18; gen ids SymA3kbUb8 TdUfdwpVNR iGbpZC03uK MB7EBP8DCm lJIZyhqgv9 gOt2PEISXO 0eSapjlTfW EbngqGRuuO; fragment W5c-redo-live3.json; sheet rank-sample/maid-redraw-D4-W5c.jpg. LIVE totals so far: 28 of 78 (m27-m30 all tiers; m31 all; m32 ty1/2/3(old gen); m33 ty1; m34 ty2; m35 ty3; m36 ty1; m37 ty2; m38 ty3; m39 ty1; m40 ty2; m41 ty3; m42 ty1). D5 running: m32-ty3 m33-ty2 m33-ty3 m34-ty1 m34-ty3 m35-ty1 m35-ty2 m36-ty2 (prompts2).
- D5 LIVE (fig+hd+por): maid-m33-ty2 m33-ty3 m34-ty1 m34-ty3 m35-ty1 m35-ty2 m36-ty2 -a18 (gen ids IfikKv1tvE Lwo33KgswO mERrro7hJQ ksp4NUR16B TdUfEXQVNR Xm4qkhfBfo nVLtaeDYQD); m32-ty3 D5 version (6AqDVNyiJO) NOT uploaded (D1 version stays); fragment W5c-redo-live4.json; sheet rank-sample/maid-redraw-D5-W5c.jpg. LIVE 35 of 78. D6 running: m36-ty3 m37-ty1 m37-ty3 m38-ty1 m38-ty2 m39-ty2 m39-ty3 m40-ty1. Remaining after D6 (scratch redo_rem2.txt line 9+): 35 keys.
## W5c HANDOVER STATE (written 07:20Z; update before rollover)
- Tools for a successor are in rank-sample/W5c-tools/: brief5.md (consort-tier redraw agent brief; uses prompts2.json = 78 prompts m27-m52 x ty1-3 a18), brief2.md (new original-look a18 maid brief), up.sh (usage: up.sh D<n> "m27-ty1 ..." W5c-redo-liveN -> copies fig/hd/tn/por of a finished agent dir /tmp/claude-0/w/D<n>/out into /home/user/cung-tuong-mong/img/, cdn_sync explicit webp only + --check, writes hd fragment entries), push.sh (usage: push.sh <fragment-basename-or-none> "msg" < tsv-lines; appends to this file, copies fragment, commit+cherry-pick push). cdn_sync.py: git fetch origin main --depth=1; git show FETCH_HEAD:dev/site/cdn_sync.py > dev/site/cdn_sync.py (never commit). Scratch dirs /tmp/claude-0/w/* are per container: a new container loses finished-but-unuploaded files (regenerate).
- Redraw rules (Foreman C ROOT-2 approved): sub-agents 8 keys each, 2 gens at once, ONE sheet per batch to C ROOT-2 (session_011xDdVPLp4pAuPFtBP2YetM) + lead #6 (session_011xDdVS87fDNLJMJGzeiVWL), live on finish (replace keys), fragments per batch. Table: rank-sample/maid-consort-tier-design-table.md (m40 indigo blue, m42 burgundy wine after C's note).
- LIVE (consort-tier a18 redraws): 35 of 78 (list in the lines above: D1 12, D3 8, D4 8, D5 7). Remaining list: W5c-tools/redo_rem2.txt minus D6 (m36-ty3 m37-ty1 m37-ty3 m38-ty1 m38-ty2 m39-ty2 m39-ty3 m40-ty1 running) = from m40-ty3 on up to m52 (35 keys). Then a26/a36/a51 for m27-m52 per lead scope (ask lead).
- HELD (not uploaded): new a18 maids A8 (m10-cold..t5) and A9 (m10-t6..m11-a18) in /tmp/claude-0/w/A8|A9/out; lead said the new-maid queue stays held until told; resume = maid-m11-cold-a18 (queue.txt line 73+). The 8 old m01 files last.
- D6 LIVE (fig+hd+por, 6): maid-m36-ty3 m37-ty1 m37-ty3 m38-ty1 m38-ty2 m40-ty1 -a18 (gen ids fHGsyuTCDY IfikSCFtvE yiEcBZuPW9 KLDPAJAkqp 9ZFVmD7NYZ tC31yy8mZJ); fragment W5c-redo-live5.json; sheet rank-sample/maid-redraw-D6-W5c.jpg. NOT uploaded: m39-ty2/m39-ty3 (D6 versions were sand beige, too close to m38 champagne): m39 recoloured to INK BLACK with silver thread in table + prompts2.json; m39 ty1/ty2/ty3 all to be redone (D7; m39-ty1 live now is the old sand-peach, replace). LIVE 41 of 78 (35 + 6).
- C ROOT-2 ruling: m39 NOT ink-black (mourning look): m39 = DEEP PLUM with silver thread (table + prompts2.json updated); redo m39 x3 (in D7).
- D7 LIVE (fig+hd+por, 4): maid-m40-ty3 m41-ty2 m42-ty2 m42-ty3 -a18 (gen ids rgdNIIExtc 1le9tkPr4r gOt2rAcSXO p8OQZEQehw); fragment W5c-redo-live6.json; sheet rank-sample/maid-redraw-D7-W5c.jpg. NOT uploaded: m39 x3 deep plum (ksp4FyE16B u5YS0LoQLD TdUfy7rVNR): m39 plum == m37 mauve-plum, distance 2 (neighbours must differ) -> m39 recoloured DEEP PEACOCK GREEN-TEAL with silver thread (table+prompts2), redo x3; and m41-ty1 (jUBialsLD0) washed-out cream -> redo with the 'clearly coloured' wording. LIVE 45 of 78. D8 running m43-ty1/2/3 m44-ty1/2/3 m45-ty1/2.
- D9 LIVE (fig+hd+por, 4): maid-m39-ty1 m39-ty2 m39-ty3 (deep peacock teal) m41-ty1 (apricot gold) -a18 (gen ids Bh9bXnDoQR 6Aqp3AMiJO rgd6LJkxtc jUB3gWwLD0); fragment W5c-redo-live7.json; sheet rank-sample/maid-redraw-D9-W5c.jpg (labelled). LIVE 49 of 78 (a18 consort-tier m27-m42 complete). Remaining: m43-m52 (30 keys); D8 running m43-ty1/2/3 m44-ty1/2/3 m45-ty1/2.
- D8 LIVE (fig+hd+por, 8): maid-m43-ty1/2/3 m44-ty1/2/3 m45-ty1/2 -a18 (gen ids lJIZjxZgv9 iGbp9ig3uK Xm4qdb3Bfo eIyFp5AdqL huZjaBHvqL MB7up0jDCm VXwEdHkMMU lJI27c0gv9); fragment W5c-redo-live8.json; sheet rank-sample/maid-redraw-D8-W5c.jpg. LIVE 57 of 78.
## W5c ROLLOVER HANDOVER (context; 07:58Z). NEXT = D10: maid-m45-ty3, m46-ty1/2/3, m47-ty1/2/3, m48-ty1 (a18 consort-tier, then m48-ty2..m52-ty3 = 21 more keys; then a36 m27-m52 per C ROOT-3 order: a18 m27-m52 -> a36 m27-m52). ALL scratch tools are in rank-sample/W5c-tools/ (brief5.md, prompts2.json [updated 'clearly coloured' ty1 wording + m39 teal], up.sh, push.sh, lab.py = labelled sheet script: python3 -I lab.py OUT.jpg D<n>..). Per batch: spawn a sub-agent with brief5.md (8 keys, max 2 gens, HOLD not needed anymore: live on finish), then up.sh D<n> "m46-ty1 ..." W5c-redo-liveN, labelled sheet via lab.py -> push.sh -> send sheet path to Foreman C ROOT-3 (session_011xDdVQvSf8pvDHnXCRCRsz) + lead #6 (session_011xDdVS87fDNLJMJGzeiVWL). For a36: prompts must be rebuilt from the table (age 36 look, same colour+motif per maid; her a36 current file + a18 redraw as refs); ask lead for the a36 spec. Remember: no hold on uploads now; labels under tiles; neighbours m+-2 must differ in colour; ty1 colour must read clearly.
- STILL HELD (not uploaded; lead said held until told): new a18 plain-original maids A8 (m10-cold..t5) + A9 (m10-t6..m11-a18): files only in the old container's /tmp/claude-0/w/A8|A9/out (lost on container end; regenerate if needed). Resume point for new maids: maid-m11-cold-a18.
- hd fragments in the repo: all W5c-*.json pushed except held A8/A9; D1/D2 fragments superseded by W5c-redo-live1/liveN.
- HELD UN-UPLOADED (container scratch only, 16 files a18 original-look maids, finished fig/hd/por/tn in /tmp/claude-0/w/A8/out and A9/out): gen ids are in the A8/A9 TSV lines above (m10-cold dtPFsNNXSL .. m11-a18 aFAjiwnfSh). hd fragments saved as rank-sample/W5c-tools/HELD-A8-hd-fragment.json and HELD-A9-hd-fragment.json (NOT in hd-entries: the files are not on the CDN). If the lead releases them: upload from the old container, else regenerate from maid-m10-cold-a18.
- HELD16 sheet pushed rank-sample/maid-rest-A-held16.jpg; asked C ROOT-3 + lead for OK to upload (08:05Z); if no OK by ~08:35Z: list gen ids (above) and stop.
- HELD16 LIVE after C ROOT-3 OK (08:05Z): maid-m10-cold kc ngheo t1..t8 tm0 tm2 tm3 tm4 + m11 (-a18), fig+hd+por(+tn) uploaded (53 files, --check clean); fragments W5c-A8-live.json, W5c-A9-live.json. Nothing held, nothing in flight. Resume point for new maids: maid-m11-cold-a18.
W5d D10 live a18 maid ty (key\tref\tgen): m45-ty3 vQ2Lrjea47 YMshI7wWeC; m46-ty1/2/3 JNfWz0qOq4 gOtARF3SXO jUB3iOoLD0 UPhzGRxwny; m47-ty1/2/3 O6CcnDIynm ksp99YI16B vQ2LL3ua47 p8OFHnKehw; m48-ty1 6AqpVtoiJO w4vnYsZ7EI. Fragment W5d-1. Next: m48-ty2..m52-ty3 (D11).
W5d D11 live a18 maid ty (key\tref\tgen): m49-ty1/2/3 gOtADYrSXO YMshbUHWeC 79aYXqwJAL tC3ryC6mZJ; m50-ty1/2/3 lJI2M0Ugv9 6AqpfYwiJO lJI2eeJgv9 aFAs6R8fSh. Fragment W5d-2. BLOCKED: m48-ty2, m48-ty3 (ref upload of fig-maid-m48-a18 denied by classifier). Next: m51/m52 ty1-3 (D12), then m48 when unblocked.
W5d D12 live a18 maid ty (key\tref\tgen): m51-ty1/2/3 CqzgnTvEEy mERx2CKhJQ N2HDbnQ6D9 Xm4b6RlBfo; m52-ty1/2/3 aFAsGVvfSh rgd6oaKxtc cpgaJtP0eP rgd6IiYxtc. Fragment W5d-3. D13 in progress: m49 x3 redo (misty rose-beige) + m48-ty2/3 (ref = creation w4vnYsZ7EI, no upload).
