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
