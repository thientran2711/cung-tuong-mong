# batch-maid-rest-B (W6, shard lists/shards/maid-rest-B.txt, 1586 files) — resume file
START_CTX ~12 %; roll over at ~37 %, never above 60 %. Lead = session_011xDdVRBW26agruDT2Bm65K.
Method: upload old CDN fig (folder ba4aecfe-efce-47e2-b53f-30d292091886) -> 8 x images_generate gpt-2-6 1024x2048 2k transparentBackground:true refs [old, faces N2HYqYa6D9 bxVgMSX5Y2 dtPf4EDXSL eIyaPEVdqL] -> one creations_wait -> scratch drv.py (curl, alpha check, finish_fig, qa_fig, sheet). Prompt ~100 words, prop rotates (fan,lantern,teacup,scroll,flower branch,handkerchief,jade pendant,hairpin). Alpha OK at 2k with the param; no bg-removal needed. Pinhole FAILs ignored (<400px).
Order: a18 list = all a18 lines of maid-rest-B.txt (416), then a26/a36/a51.
## TSV: key<TAB>old-ref id<TAB>gen id<TAB>status
maid-m27-a18	0eStSrYTfW	DoJaJT7pcl	ok
maid-m27-cold-a18	nVLBLkeYQD	p8OfODIehw	ok
maid-m27-kc-a18	1leOeThr4r	fHGrGfyCDY	ok
maid-m27-ngheo-a18	kspJpT416B	p8OfyXhehw	ok
maid-m27-t1-a18	O6CGCvnynm	cpgISML0eP	ok
maid-m27-t2-a18	huZKZ3qvqL	xSXPBS2jfW	ok
maid-m27-t3-a18	bxVUVTl5Y2	nVLBsM7YQD	ok
maid-m27-t4-a18	UPhRhm1wny	KLD7pgLkqp	ok
maid-m27-t5-a18	N2Hc5u76D9	jUB4I11LD0	ok
maid-m27-t6-a18	tC3b26VmZJ	kspJXKh16B	ok
maid-m27-t7-a18	4RQYqu19Aa	u5YLTFGQLD	ok
maid-m27-t8-a18	gOtivtoSXO	Lwo9mSfswO	ok
maid-m27-tm0-a18	JNfAuCtOq4	p8Of98hehw	ok
maid-m27-tm2-a18	nVLBgloYQD	xSXPIURjfW	ok
maid-m27-tm3-a18	kspJXXi16B	bxVUeLM5Y2	ok
maid-m27-tm4-a18	3z5V11wREY	gOtia9OSXO	ok
maid-m28-a18	Xm4u3cSBfo	nVLBwm9YQD	ok
maid-m28-cold-a18	O6CGHsoynm	Lwo9vAjswO	ok
maid-m28-kc-a18	dtPEi0yXSL	9ZFWkXbNYZ	ok
maid-m28-ngheo-a18	Xm4u3V7Bfo	gOtiCctSXO	ok
maid-m28-t1-a18	VXwhPYuMMU	KLD7o24kqp	ok
maid-m28-t2-a18	lJI6axRgv9	kspJ8zL16B	ok
maid-m28-t3-a18	3z5VxNGREY	iGbTxah3uK	ok
maid-m28-t4-a18	iGbTr943uK	1leOIW8r4r	ok
maid-m28-t5-a18	N2HcxCL6D9	rgdyhKBxtc	ok
maid-m28-t6-a18	fHGrVRXCDY	CqzxMfuEEy	ok
maid-m28-t7-a18	gOtiuoQSXO	DoJaiDlpcl	ok
maid-m28-t8-a18	WDl8yLNcXe	jUB4fsuLD0	ok
maid-m28-tm0-a18	iGbTLqu3uK	4RQYriZ9Aa	ok
maid-m28-tm2-a18	TdUm9UQVNR	5jMwIxBKxe	ok
maid-m28-tm3-a18	cpgIPgc0eP	WDl8PeCcXe	ok
maid-m28-tm4-a18	tC3bYR0mZJ	JNfA53UOq4	ok
maid-m29-a18	JNfAk0NOq4	UPhRbHkwny	ok
maid-m29-cold-a18	xSXPCRQjfW	nVLBP4IYQD	ok
maid-m29-kc-a18	s78NQGHl8e	p8Of2z2ehw	ok
maid-m29-ngheo-a18	YMso4C7WeC	MB7vRzSDCm	ok
maid-m29-t1-a18	0eSt6FwTfW	fHGrpI5CDY	ok
maid-m29-t2-a18	fHGrpJzCDY	gOtiHxuSXO	ok
maid-m29-t3-a18	xSXPCz5jfW	IfiqcBNtvE	ok
maid-m29-t4-a18	N2HcsIH6D9	UPhRbSOwny	ok
UPLOADED to CDN + --check OK: m27,m28,m29 a18 (40 files; fig+tn+por, no hd). Local uploader copy at dev/site/cdn_sync.py (not committed); files staged under img/ (not committed).
maid-m29-t5-a18	WDl83gycXe	s78N5gbl8e	ok
maid-m29-t6-a18	ovNFTir829	ovNFVmG829	ok
maid-m29-t7-a18	xSXPF8UjfW	nVLBiVqYQD	ok
maid-m29-t8-a18	DoJaz4Bpcl	iGbTJzP3uK	ok
maid-m29-tm0-a18	Sym3kfjUb8	VXwhG8HMMU	ok
maid-m29-tm2-a18	tC3bDGYmZJ	Lwo9b4mswO	ok
maid-m29-tm3-a18	vQ2kdWRa47	Sym31RDUb8	ok
maid-m29-tm4-a18	w4vZrFV7EI	vQ2kXxFa47	ok
UPLOADED+--check OK through maid-m29-tm4-a18 (48 files done, 0 hard). NEXT: maid-m30-a18 (line 49 of a18 list = 'grep a18 maid-rest-B.txt').
maid-m30-a18	gOtixXBSXO	MB7vWMSDCm	ok
maid-m30-cold-a18	jUB4Kp3LD0	tC3bBhtmZJ	ok
maid-m30-kc-a18	rgdybDGxtc	Bh9QphQoQR	ok
maid-m30-ngheo-a18	CqzxmA9EEy	Lwo917pswO	ok
maid-m30-t1-a18	8a6HeNrIrU	KLD7Hlmkqp	ok
maid-m30-t2-a18	iGbTPb83uK	gOtij99SXO	ok
maid-m30-t3-a18	DoJacPDpcl	YMsoAXuWeC	ok
maid-m30-t4-a18	xSXP5IojfW	gOtiji1SXO	ok
## HANDOVER (W6 #1, 17/11 ~02:15Z): 56/416 a18 done (m27..m30-t4), 0 hard/retries, all CDN-uploaded + --check same (fig+tn+por, no hd), through maid-m30-t4-a18. Lead session_011xDdVRBW26agruDT2Bm65K was inactive when I tried to report -> lead/Foreman C please open the successor. NEXT = maid-m30-t5-a18 (entry 57 of: grep a18 lists/shards/maid-rest-B.txt). Then a26/a36/a51 with NEW a18 as identity ref (ids above in TSV col 3 = generation id usable as reference identifier).
Recipe for successor: refs folder ba4aecfe-efce-47e2-b53f-30d292091886; upload old CDN fig via creations_upload_image; 8x images_generate gpt-2-6 1024x2048 resolution 2k extraSettings {"transparentBackground":true} refs [old, N2HYqYa6D9, bxVgMSX5Y2, dtPf4EDXSL, eIyaPEVdqL]; prompt ~100 words (redraw as same palace maid, age N, face/skin match images 2-5, calm frontal, ONE prop rotating fan/lantern/teacup/scroll/flower branch/handkerchief/jade pendant/hairpin, tiny huadian, NO train/hem at feet, FULLY TRANSPARENT BACKGROUND real alpha); creations_wait all 8; scratch driver (curl, alpha extrema check, tools/finish_fig.py, tools/qa_fig.py, contact sheet dark+light) - recreate from tools/maid_proc.py; pip install scipy opencv-python-headless first. Upload: get dev/site/cdn_sync.py from origin main, cp to img/, cdn_sync img then --check img. Pinhole FAILs and halo 1.5-2.4k = ignore.
## W6b #1: hd retro-fit of 56 a18 (m27..m30-t4) uploaded, fragment hd-entries/W6b-0.json. Agents gA/gB/gC: TSV below (fig+hd+por, no tn: finish_fig makes none).
maid-m30-t5-a18	P3uY9ck42C	mERKvnUhJQ	ok
maid-m30-t6-a18	jUB9siELD0	cpgtTy30eP	ok
maid-m30-t7-a18	w4v2Jn57EI	dtPuB2vXSL	ok
maid-m30-t8-a18	O6CzP0aynm	rgdPjfyxtc	ok
maid-m30-tm0-a18	LwoNl2tswO	KLDJ1v3kqp	ok
maid-m30-tm2-a18	s786gGol8e	9ZFc6lsNYZ	ok
maid-m30-tm3-a18	IfibmLYtvE	5jM7kf7Kxe	ok
maid-m30-tm4-a18	IfibmsWtvE	1leyxQvr4r	ok
maid-m31-t5-a18	LwoNliBswO	huZkandvqL	ok
maid-m31-t6-a18	Ifibmk2tvE	p8OCdijehw	ok
maid-m31-t7-a18	Ifibm1AtvE	9ZFc6r1NYZ	ok
maid-m31-t8-a18	nVLoWhkYQD	JNfGyK0Oq4	ok
maid-m31-tm0-a18	O6CzPTfynm	nVLoW4WYQD	ok
maid-m31-tm2-a18	6AqT3XmiJO	gOt3UbuSXO	ok
maid-m31-tm3-a18	s786gz8l8e	s786gbel8e	ok
maid-m31-tm4-a18	huZkaS6vqL	O6CzPlZynm	ok
maid-m31-a18	nVLoWt5YQD	iGbVRLt3uK	ok
maid-m31-cold-a18	LwoNlR8swO	xSX4LfljfW	ok
maid-m31-kc-a18	lJIiSAegv9	6AqT3lJiJO	ok
maid-m31-ngheo-a18	xSX4LRXjfW	LwoNlFyswO	ok
maid-m31-t1-a18	YMs8cfbWeC	1leyxEmr4r	ok
maid-m31-t2-a18	kspOr3B16B	rgdPjF6xtc	ok
maid-m31-t3-a18	s786gnIl8e	WDlI0ZicXe	ok
maid-m31-t4-a18	u5YsFPzQLD	aFArCIYfSh	ok
## 80 a18 done through maid-m31-tm4-a18. NEXT = line 81 of grep a18 lists/shards/maid-rest-B.txt (maid-m32-a18).
maid-m32-a18	dtPumkNXSL	SymRPKxUb8	ok
maid-m32-cold-a18	kspOlRp16B	Cqzjb82EEy	ok
maid-m32-kc-a18	JNfG6DjOq4	WDlIpZPcXe	ok
maid-m32-ngheo-a18	79aANDgJAL	MB7aoWQDCm	ok
maid-m32-t1-a18	P3uYRBL42C	cpgtezY0eP	ok
maid-m32-t2-a18	JNfG6dlOq4	EbnL5fBuuO	ok
maid-m32-t3-a18	P3uYR8l42C	jUB9wjeLD0	ok
maid-m32-t4-a18	LwoN7TxswO	nVLoDcdYQD	ok
maid-m32-t5-a18	O6CziMhynm	rgdPSCwxtc	ok
maid-m32-t6-a18	s786Jndl8e	LwoN7HwswO	ok
maid-m32-t7-a18	kspOlZt16B	1leyguor4r	ok
maid-m32-t8-a18	rgdPSGhxtc	79aANLpJAL	ok
maid-m32-tm0-a18	IfibCSntvE	0eSmdG2TfW	ok
maid-m32-tm2-a18	Xm4Qhs6Bfo	P3uYR7D42C	ok
maid-m32-tm3-a18	s786JVUl8e	dtPumpHXSL	ok
maid-m32-tm4-a18	3z5MnCVREY	fHGxqatCDY	ok
maid-m33-a18	jUB9wAELD0	LwoN7F2swO	ok
maid-m33-cold-a18	JNfG6MxOq4	lJIiObugv9	ok
maid-m33-kc-a18	LwoN7n5swO	UPhZ4rawny	ok
maid-m33-ngheo-a18	3z5MnhWREY	LwoN7KyswO	ok
maid-m33-t1-a18	iGbVzmi3uK	1leygqmr4r	ok
maid-m33-t2-a18	UPhZ4pZwny	79aANSBJAL	ok
maid-m33-t3-a18	iGbVzaZ3uK	lJIiOsOgv9	ok
maid-m33-t4-a18	UPhZ4dAwny	s786Og9l8e	ok
## 104 a18 done through maid-m33-t4-a18. NEXT = line 105 (maid-m33-t5-a18).
maid-m34-a18	jUB9yWkLD0	mERKqBOhJQ	ok
maid-m34-cold-a18	tC35HJbmZJ	SymR6lxUb8	ok
maid-m34-kc-a18	xSX4O0PjfW	P3uYGPD42C	ok
maid-m34-ngheo-a18	5jM7SzBKxe	jUB9PlnLD0	ok
maid-m34-t1-a18	O6Cz2IEynm	SymRivhUb8	ok
maid-m34-t2-a18	u5YsxZGQLD	8a6qFZEIrU	ok
maid-m34-t3-a18	eIyEaURdqL	jUB9Pw0LD0	ok
maid-m34-t4-a18	kspOwTI16B	9ZFcYAyNYZ	ok
maid-m34-t5-a18	s78640dl8e	9ZFcn7rNYZ	ok
maid-m34-t6-a18	kspOwze16B	eIyEaVhdqL	ok
maid-m34-t7-a18	DoJfhjUpcl	eIyEfPzdqL	ok
maid-m34-t8-a18	6AqTWamiJO	lJIi9sUgv9	ok
maid-m34-tm0-a18	EbnLr3SuuO	gOt3NgMSXO	ok
maid-m34-tm2-a18	xSX4OV9jfW	s7869Syl8e	ok
maid-m34-tm3-a18	0eSm8j5TfW	VXwvmySMMU	ok
maid-m34-tm4-a18	N2H0YEB6D9	4RQWnKp9Aa	REDO (live but a big paddle-shaped object behind the head; regenerate, prop = hairpin fingertip is the cause: use a different prop)
maid-m33-t5-a18	TdUhIK9VNR	LwoNP52swO	ok
maid-m33-t6-a18	P3uYG8x42C	Bh9FuiJoQR	ok
maid-m33-t7-a18	eIyEasNdqL	DoJfh0epcl	ok
maid-m33-t8-a18	bxVwgGz5Y2	nVLodGcYQD	ok
maid-m33-tm0-a18	1ley7c4r4r	s7869vNl8e	ok
maid-m33-tm2-a18	4RQWzvG9Aa	jUB9Pv4LD0	ok
maid-m33-tm3-a18	lJIi9dWgv9	s7869SXl8e	ok
maid-m33-tm4-a18	lJIi9Xcgv9	huZk50TvqL	ok
## 120 a18 done (m27..m34, m34-tm4 REDO pending in gJ). NEXT after gJ/gK = m35-tm4 + m36 (line 144+).
## (CANCELLED by owner 17/11 ~03:45Z: no maid repainted) LOOKALIKE redo list (lead #6 rule): m32-t5..t8, m33-t5..t8 kept ornate crowns (a18 live) - review after owner anchor.
maid-m34-tm4-a18	iGbVDDr3uK	8a6q5GCIrU	ok (REDO done, supersedes earlier tm4 line)
maid-m35-a18	KLDJyPDkqp	u5YsgpMQLD	ok
maid-m35-cold-a18	gOt3ZAvSXO	79aAz53JAL	ok
maid-m35-kc-a18	P3uYcVf42C	O6CzY1jynm	ok
maid-m35-ngheo-a18	eIyEQbLdqL	N2H0VSQ6D9	ok
maid-m35-t1-a18	YMs8tfIWeC	4RQW0S89Aa	ok
maid-m35-t2-a18	WDlImEMcXe	O6CzYlUynm	ok
maid-m35-t3-a18	Xm4QHrlBfo	LwoNi1gswO	ok
maid-m35-t4-a18	5jM7OORKxe	eIyEQindqL	ok
maid-m35-t5-a18	MB7aCEsDCm	SymR2QtUb8	ok
maid-m35-t6-a18	dtPuFqsXSL	vQ21xVxa47	ok
maid-m35-t7-a18	s78632Gl8e	jUB96uULD0	ok
maid-m35-t8-a18	kspOP6A16B	Xm4QHWMBfo	ok
maid-m35-tm0-a18	SymR2Y2Ub8	EbnLlIGuuO	ok
maid-m35-tm2-a18	SymR2WAUb8	kspOPFl16B	ok
maid-m35-tm3-a18	eIyEQkgdqL	6AqTMyliJO	ok
## 136 a18 done through maid-m35-tm3-a18. NEXT = maid-m35-tm4-a18, then m36 (a18 list line 137+). LOOKALIKE check pending for several t5-t8 files that kept ornate headdresses.
maid-m35-tm4-a18	rgdP3tuxtc	SymRYJxUb8	ok
maid-m36-a18	Xm4QKZ2Bfo	JNfGTNTOq4	ok
maid-m36-cold-a18	u5Ys7pcQLD	0eSmudZTfW	ok
maid-m36-kc-a18	O6CzTK5ynm	LwoNAOPswO	ok
maid-m36-ngheo-a18	lJIiGQagv9	WDlICXNcXe	ok
maid-m36-t1-a18	O6CzT1kynm	LwoNAvjswO	ok
maid-m36-t2-a18	SymRnbtUb8	u5YsJecQLD	ok
maid-m36-t3-a18	gOt3zbMSXO	vQ21gMKa47	ok
## HANDOVER (W6b #1, superseded by the 159 line below) (+56 hd retro-fit). NEXT = maid-m36-t4-a18 (a18 list line 152: grep a18 lists/shards/maid-rest-B.txt). Method: sub-agents per tools/AGENT_GEN_BRIEF.md (8 keys each, ONE agent at a time because of rate limit 5 gens in flight), I record TSV + push fragments hd-entries/W6b-g*.json. Push recipe: commit, flock fetch --depth=1, checkout -B x FETCH_HEAD, cherry-pick, push (retry). Never commit dev/site/cdn_sync.py, __pycache__. Lookalike redo list above.
maid-m36-t4-a18	s786W6Jl8e	kspO2TW16B	ok (borderline rich)
maid-m36-t5-a18	lJIici5gv9	yiEndf9PW9	ok
maid-m36-t6-a18	yiEndYbPW9	SymRTtzUb8	ok
maid-m36-t7-a18	rgdPG9Xxtc	kspO2pB16B	ok LOOKALIKE (gold phoenix embroidery)
maid-m36-t8-a18	rgdPGN3xtc	nVLoul5YQD	ok LOOKALIKE (gold phoenix embroidery)
maid-m36-tm0-a18	p8OC1FPehw	aFArOr2fSh	ok
maid-m36-tm2-a18	4RQWBMk9Aa	aFArOxAfSh	ok
maid-m36-tm3-a18	KLDJZNWkqp	SymRVAwUb8	ok
## 159 a18 done (list lines 1-159) through maid-m36-tm3-a18. NEXT = maid-m36-tm4-a18 (line 160). Lookalike list: m32-t5..t8, m33-t5..t8, m36-t7, m36-t8 (+ m36-t4 borderline).
maid-m36-tm4-a18	tC35OrnmZJ	8a6q76WIrU	ok
maid-m37-a18	yiEnITqPW9	6AqTa5piJO	ok
maid-m37-cold-a18	mERKyL6hJQ	gOt3pa4SXO	ok
maid-m37-kc-a18	w4v2XcV7EI	yiEnIbiPW9	ok
maid-m37-ngheo-a18	ovNHwxg829	Bh9FUAkoQR	ok
maid-m37-t1-a18	TdUhrHHVNR	EbnL3gDuuO	ok
maid-m37-t2-a18	xSX40G4jfW	vQ219sia47	ok
maid-m37-t3-a18	YMs85QVWeC	nVLo5aVYQD	ok
## 167 a18 done (list lines 1-167) through maid-m37-t3-a18. NEXT = maid-m37-t4-a18 (line 168). START_CTX 15%->now ~20% (196k/1M).
maid-m37-t4-a18	w4v2IsL7EI	rgdPDiOxtc	ok
maid-m37-t5-a18	TdUhsYAVNR	SymR8n1Ub8	ok
maid-m37-t6-a18	eIyEwMAdqL	3z5MH8KREY	ok
maid-m37-t7-a18	79aAtw4JAL	Bh9FyxToQR	ok
maid-m37-t8-a18	ovNHyBo829	tC35NSWmZJ	ok
maid-m37-tm0-a18	rgdPMrqxtc	kspOMPS16B	ok
maid-m37-tm2-a18	kspOVrq16B	O6CzaWOynm	ok
maid-m37-tm3-a18	kspOVxC16B	mERKijJhJQ	ok
## 175 a18 done (list lines 1-175) through maid-m37-tm3-a18. NEXT = maid-m37-tm4-a18 (line 176).
maid-m37-tm4-a18	P3uYQte42C	xSX4BFDjfW	ok
maid-m38-a18	LwoN8MVswO	YMs8lRFWeC	ok
maid-m38-cold-a18	p8OCygPehw	LwoN8K5swO	ok (cold: small hairpin+earrings, rule says no jewellery: check all *-cold-a18)
maid-m38-kc-a18	eIyEPUHdqL	EbnLYvguuO	ok
maid-m38-ngheo-a18	0eSmUjcTfW	huZk2INvqL	ok
maid-m38-t1-a18	3z5MKFlREY	huZkA3HvqL	ok
maid-m38-t2-a18	aFArGZTfSh	IfibR6ltvE	ok
maid-m38-t3-a18	aFArG2VfSh	fHGxnzECDY	ok
## 183 a18 done (list lines 1-183) through maid-m38-t3-a18. NEXT = maid-m38-t4-a18 (line 184). TODO: audit all *-cold-a18 for jewellery (owner: cold palace = plain clothes, no jewellery).
## PLAIN-PROMPT batches (lead note active, painted since ~02:51Z; Foreman C decides if they stay; owner later said she likes the ORIGINAL look): gL = m35-tm4, m36-a/cold/kc/ngheo/t1/t2/t3; gM = m36-t4..t8, tm0, tm2, tm3; gN = m36-tm4, m37-a/cold/kc/ngheo/t1/t2/t3; gO = m37-t4..t8, tm0, tm2, tm3; gP = m37-tm4, m38-a/cold/kc/ngheo/t1/t2/t3; gQ (running, started with plain note) = m38-t4..t8, tm0, tm2, tm3. Earlier batches (m27-m35-tm3) used the original-look prompt (except none had the note). From gR on: ORIGINAL look.
maid-m38-t4-a18	N2H0kbP6D9	eIyEiXidqL	ok (plain-note)
maid-m38-t5-a18	KLDJBdTkqp	s786aUtl8e	ok (plain-note)
maid-m38-t6-a18	DoJf94Epcl	3z5MjzMREY	ok (plain-note)
maid-m38-t7-a18	9ZFcK59NYZ	u5YsMKWQLD	ok (plain-note)
maid-m38-t8-a18	4RQW55s9Aa	KLDJog1kqp	ok (plain-note)
maid-m38-tm0-a18	mERKznWhJQ	VXwv44XMMU	ok (plain-note)
maid-m38-tm2-a18	P3uYbKa42C	p8OC6iZehw	ok (plain-note)
maid-m38-tm3-a18	w4v2uHm7EI	O6CzqKMynm	ok (plain-note)
## 191 a18 done (lines 1-191). REPAINT ORDER (Foreman C s12): repaint the plain-note keys with ORIGINAL look BEFORE continuing; redo TSV in batch-maid-rest-B-redo.tsv; after that NEXT new = maid-m39-a18 (line 192).
## COLD AUDIT (W6b, 17/11): live cold-a18 m27,m28,m29,m30 are jewelled (flower hairpins, tassels, earrings, forehead huadian) = WRONG (cold: plain clothes, no jewellery; maids no huadian). m31..m35 cold: one plain wooden stick hairpin, no earrings = acceptable. m36/m37/m38 cold are in the redo batches (no jewellery enforced). m27..m30 cold added to batch-maid-rest-B-redo.tsv (last 4 lines) for repaint with 'no jewellery at all'.
## PAUSE (owner 17/11 ~03:55Z via lead): NO new maid-rank files until owner approves the rank standard. Running: repaint redo batches (batch-maid-rest-B-redo.tsv, 52 keys). RESUME POINT after approval = maid-m39-a18 (list line 192).
## REDO COMPLETE (17/11): 54 keys repainted in place with each maid's own original look (cold no jewellery), uploaded, fragments W6b-redo-rA..rG.json, sheets rank-sample/redo-r*.jpg. IDLE at resume point maid-m39-a18 (list line 192) until owner approves rank standard. Drift list in batch-maid-rest-B-redo.done.
## RESUME (lead GO 17/11 ~05:40Z, rank standard DROPPED: each maid keeps her OWN original look; no plain prompt). CORRECTION: list line 192 = maid-m38-tm4-a18 was NEVER painted (my line count missed it). NEXT = maid-m38-tm4-a18, then maid-m39-a18 (line 193) ... Refs = that maid's OLD CDN figure uploaded 1 per file AFTER daily upload reset ~06:19Z (2,500/day shared); before that only creation ids already held; img/FIGURES-servants.json has 'bg' ids only for m13,m26,m39,m52 base identity (m39 bg = Sytp7xRUb8, sheet xSdWxTojfW). FIRST 16 resumed files: contact sheet <=1100px dark to C s13 (session_011xDdVRGgKNzubDW5gNXGyG) + lead.
maid-m38-tm4-a18	TdUakXIVNR	IfiKw3RtvE	ok (resumed, original look)
maid-m39-a18	Sym2D4rUb8	gOtZMfrSXO	ok
maid-m39-cold-a18	gOtZM9WSXO	s783TCgl8e	ok
maid-m39-kc-a18	P3uc8zT42C	mER1JTEhJQ	ok
maid-m39-ngheo-a18	4RQ0IYQ9Aa	6AqMhSEiJO	ok
maid-m39-t1-a18	huZrOrfvqL	Bh9qSNqoQR	ok
maid-m39-t2-a18	bxVJ2y15Y2	3z5pfjnREY	ok
maid-m39-t3-a18	kspPzN316B	LwoiTChswO	ok
## 199 a18 done (list lines 1-199 incl. m38-tm4). NEXT = maid-m39-t4-a18 (line 200).
maid-m39-t4-a18	bxVJcro5Y2	gOtZomESXO	ok
maid-m39-t5-a18	iGbDFzp3uK	yiEWaFyPW9	ok
maid-m39-t6-a18	rgd9Dwsxtc	O6CYvq8ynm	ok
maid-m39-t7-a18	u5YgGrIQLD	ovNbPGn829	ok
maid-m39-t8-a18	1le4MJpr4r	IfiK9cAtvE	ok
maid-m39-tm0-a18	JNfnhGYOq4	Ebnlz5RuuO	ok
maid-m39-tm2-a18	Sym28Z5Ub8	KLDyMSwkqp	ok
maid-m39-tm3-a18	UPhAIGvwny	xSXNdykjfW	ok
## 207 a18 done (list lines 1-207). NEXT = maid-m39-tm4-a18 (line 208), then m40.
## HANDOVER (W6b #1 -> W6c, 17/11 ~06:40Z, lead order: stop new maid generation, maid consort-tier redraw has priority)
- START_CTX ~15%; ended ~30%. a18 of maid-rest-B: list lines 1-207 done (m27..m39-tm3) + in-flight gT = m39-tm4, m40 a,cold,kc,ngheo,t1,t2,t3 (see TSV lines below once gT reports; if the TSV has no gT lines the batch did not finish: check img/ on the CDN, upload ids in rank-sample/ not kept). 54 redo repaints done (batch-maid-rest-B-redo.done).
- RESUME KEY (if gT not recorded): maid-m39-tm4-a18; otherwise maid-m40-t4-a18 (a18 list line 216 = grep a18 lists/shards/maid-rest-B.txt | sed -n 216p). Then a26/a36/a51 (identity ref = new a18 of that look + old file).
- LEDGER: col 2 (old-ref creation id of the ORIGINAL CDN fig, uploaded) and col 3 (master gen id) in the TSV above for every key; the 54 redo keys' old-ref ids are in batch-maid-rest-B-redo.tsv; face refs N2HYqYa6D9 bxVgMSX5Y2 dtPf4EDXSL eIyEPUHdqL? -> use the ids in tools/AGENT_GEN_BRIEF.md step 2 (never re-upload them).
- a51 ty1-ty3 audit: NOT STARTED by W6b.
- Method: tools/AGENT_GEN_BRIEF.md (new files) and tools/AGENT_REDO_BRIEF.md (repaint); 1 agent at a time, 8 keys, max 5 gens in flight, 1 upload per file, explicit webp paths only, fragment hd-entries/W6b-g<X>.json per batch; push recipe: commit, flock fetch --depth=1, checkout -B x FETCH_HEAD, cherry-pick, push (retry). Never commit dev/site/cdn_sync.py, .cdn-state.json, __pycache__.
- Drift left unredone (owner praised live files; keep): m37-t3, m37-t8, m38-t1..t3, m38-t5..t8.
## W6c #1 (START_CTX ~2%, 17/11 ~06:55Z). AUDIT maid ty1-ty3 x a51 (156 keys; hd absent on CDN, used fig): rank-sample/maid-rest-B-consort-tier-audit.tsv + sheets rank-sample/maid-rest-B-ctier/t<T>_<n>.jpg (owner refs first). Result 0 OK / 156 MAID-LIKE / 153 DUP: ty1 = one plain cream hanfu, ty2 = pale sage, ty3 = pale grey-blue, identical to a36 (narrow-ish sleeves, no embroidery/layers/pins); only tint noise between maids. Redraw a26 ty1-3 x m01-m26 next.
## W6c: first 16 (m01-m16, ty1/2/3 cycling) generated+finished, HELD in /tmp/w6c/r1/out (scratch), awaiting ROOT-2 OK. Sheet rank-sample/maid-a26-ctier-redraw-first16-before-after.jpg
## HANDOVER (W6c #1 -> W6c #2, 17/11 ~08:20Z; START_CTX ~2%, rolled at ~28%). Foreman now = C ROOT-3 session_011xDdVQvSf8pvDHnXCRCRsz; lead session_011xDdVS87fDNLJMJGzeiVWL.
- DONE: (1) a51 maid ty1-3 audit pushed (156 MAID-LIKE). (2) a26 maid ctier redraw m01-m26: LIVE m01-m13, m15-m18, m20, m23, m24 (fig+hd+por, fragments hd-entries/W6c-1..5.json, sheets rank-sample/maid-a26-ctier-*before-after.jpg, ledger batch-maid-ctier-a26-ledger.tsv = a18 face-ref creation ids per maid m01-m26 + gen ids). Table: rank-sample/maid-consort-tier-design-table.md (m09 copper-bronze, m15 indigo; ROOT-3 folded other overrides).
- IN FLIGHT at handover (scratch /tmp/w6c, maybe lost): processing+upload of redo m14-ty1/ty3 (bright yellow-green) and m19-ty1/2/3 (cornflower blue) [gen ids in ledger below if I recorded them; else regenerate] and new m25/m26 ty1-3 (6 files). If these are NOT on the CDN (check curl img/hd/fig-maid-m25-ty1-a26.webp 200), re-run: generate per prompts pattern below.
- TODO REDO (hue vs table, ROOT-3 rule 'same colour family as table'): m21 ty1/2/3 must be clear TURQUOISE-CYAN (mine came pale grey-teal / teal-green / cobalt); m22 ty1/2/3 must be blue-violet PERIWINKLE (mine came lavender-purple, clashes with m11 lilac). m24-ty3 came peach-coral with koi (table: ivory white) - judge. Currently LIVE m21/m22 are the OLD cream/sage/grey-blue (held, never uploaded). After redo: upload, sheet to ROOT-3.
- THEN (ROOT-3 order): a26 m27-m52 (78 keys), then a51 m27-m52 per table. Face refs for m27+: upload live a18 fig per maid once (ledger style). 
- METHOD (tools/W6c/): prompt pattern (<=110 words): 'Semi-realistic painterly guofeng portrait style, near-3D realistic rendering, soft natural light, fine detail. Image 1 is this woman: keep her exact face and identity, age about 26. Image 2 shows the wanted silhouette[ and richness]: a consort's wide flowing sleeves, layered, graceful. A newly promoted lady, full body, ONE|TWO|THREE layers: <tier text with colour+motif> ..., hair <accent>, tiny <motif> leaf mark on the forehead (1/12 face width). <prop + hand>, five fingers each. Hem ends at the feet, shoes visible, no train. Fully transparent background, real alpha, full body inside the canvas with margin.' images_generate gpt-2-6 1024x2048 2k folder ba4aecfe-efce-47e2-b53f-30d292091886 extraSettings {"transparentBackground":true} refs [maid a18 id, kspPIKm16B (owner look4 robe), N2HYqYa6D9 (face01)]. Max 2 gens at once; creations_wait both; record key/id/url in a TSV; w1_drv.py (FORCE_HD=1, needs scipy+opencv: pip install; run in a dir with m/ and old/; it caches m/<key>.png so use a new dir for redos) -> out/img/{fig,hd/fig,por}; ba.py = before|after sheet (a.tsv); up.sh <tsv> <fragment> (DIR=rN env; copies to img/, cdn_sync explicit paths + --check, writes hd fragment); push.sh msg files (cherry-pick + VERIFIED check; ALWAYS verify push landed). cdn_sync.py + manifest_guard.py come from origin main dev/site (untracked, in .git/info/exclude). Pinhole FAILs ignored. 65 cr/gen.
- Uploaded face refs (never re-upload): owner robes kspPIKm16B (look4-t3-a18), 79azqOUJAL (look2-t3-a18); face N2HYqYa6D9 bxVgMSX5Y2.

## HANDOVER (W6d #1 -> W6d #2, 17/11 ~09:05Z; START_CTX ~0%, rolling at ~25%). Lead session_011xDdVS87fDNLJMJGzeiVWL, Foreman C ROOT-3 session_011xDdVQvSf8pvDHnXCRCRsz.
- DONE + LIVE (fig/hd/por, fragments hd-entries/W6d-1..4.json, sheets rank-sample/maid-a26-ctier-m21m22 / m27m30 / m31m36 / m37m39-before-after.jpg): a26 m21,m22 ty1-3 (new azure-turquoise / periwinkle) and a26 m27..m39 ty1-3 (39 files). Ledger of gen ids+urls: batch-maid-ctier-a26-W6d-ledger.tsv (cols key, creation id, render url; m27-m39). Uploaded Magnific ref ids per maid (a18 ty1,ty2,ty3, a26 ty1): tools/W6d/refs.txt (m27-m39 present; m40+ must be uploaded: creations_upload_image of https://ctm-img.victoria-tntt.workers.dev/img/fig-maid-mNN-ty{1,2,3}-a18.webp and ...-ty1-a26.webp, folder ba4aecfe-efce-47e2-b53f-30d292091886).
- NEXT: a26 m40-m52 ty1-3 (39), then a51 m27-m52 ty1-3 (78; image2 = her fig-maid-mNN-ty1-a51.webp; image1 = same a18 tier master ids already in refs.txt for m27-m39).
- METHOD (works, no rejects): images_generate gpt-2-6 1024x2048 2k folder above extraSettings {"transparentBackground":true} references [image1 = a18 tier redraw id, image2 = her current a26 ty1 id]; prompt: 'Semi-realistic painterly guofeng portrait style, near-3D realistic rendering, soft natural light, fine detail. The same woman as image 2, at age about 26 (keep her exact face and identity), wearing exactly the outfit of image 1: same colours, embroidery, layered wide flowing sleeves, hairpieces, flower mark and the same prop held in lively graceful hands, five fingers each. Hair up with pins. Full body, hem ends at the feet, shoes visible, no train. Fully transparent background, real alpha, full body inside the canvas with margin.' (a51: 'age about 51 ... mature and elegant'). 2 gens at once, creations_wait both, curl url -> TSV (key, id, url) -> tools/W6c/w1_drv.py (FORCE_HD=1, needs pip scipy opencv-python-headless, run in a dir with m/ and old/, in background, ~25 s per key) -> look at sheet -> tools/W6d/up.sh (DIR=<dir>, /tmp/w6d paths; needs img/hd dir, cdn_sync.py from origin main) -> push.sh. Process in chunks of 9-18 keys.
- Notes: pinhole FAILs ignored; m22 periwinkle still leans lavender-blue (judge). a18 pale ty1 tints (m27 mint, m30 ivory) are as in W5d masters.
- UPDATE W6d #1 (17/11 ~09:05Z, read from queued notifications AFTER the handover above): (a) foreman is now ROOT-4 = session_011xDdVSQC3Gf8WhM6WW38QF: all OLD|NEW sheets (<=1500 px) go to it + lead. (b) OWED REDOS FIRST (W6d #2): m22 a26 x3 with PINNED hexes ty1 pale #B9C1F0, ty2 mid #7C88DC, ty3 deep #4C58B8 ('periwinkle blue #7C88DC', blue first, hint of violet; refresh table copy; use at every age); m24-ty2 + m24-ty3 a26 -> IVORY WHITE with koi in pale gold (live ones are peach-coral); m26 x3 a26 -> WARM dove grey/taupe grey (clearly warmer than m25 cool silver). m21 + m27-m30 OK. (c) HOLD ALL UPLOADS until ROOT-4 has looked at the sheets. W6d #1 uploaded m31-m39 (27 files, fragments W6d-3/W6d-4) at ~08:55-09:05Z, after the 08:47Z hold was sent but before I read it; they are live, sheets are rank-sample/maid-a26-ctier-m31m36 and m37m39. Do not upload more until ROOT-4 answers.
