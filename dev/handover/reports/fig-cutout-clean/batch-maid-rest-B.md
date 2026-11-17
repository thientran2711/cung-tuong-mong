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
