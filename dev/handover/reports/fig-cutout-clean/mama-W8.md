# W8 MAMA a36/a51 t1-t5 maid repaint (lead #7 / ROOT-5 GO 17/11 10:29Z). START_CTX ~1% of 1M; roll over at ~26%, ceiling 60%.
PRIORITY #1 CHECK: OD none new | main none | review/* none | claims W8 (CLAIMS f6f7683); audit = mama-audit.md
## Method
Ref image1 = OLD live fig-maid-mNN-tX-aYY (outfit/identity) + 4 face refs; colour+motif+prop from rank-sample/maid-consort-tier-design-table.md; NO huadian (maid/mama rule), real age (a36 ~38, a51 ~55 + silver strands); t1 pale one layer -> t3 gauze layer -> t5 deep + ornate hairpiece. gpt-2-6 1024x2048 2k, extraSettings {"transparentBackground":true} (else RGB!). finish_fig -> qa_fig -> LOOK. Scratch /home/user/wt/w8 (sheet.py).
## PILOT (8), all looked OK, nothing uploaded
m01-t1-a36 huZlh1ivqL | m01-t3-a51 yiEMyT0PW9 | m02-t2-a36 JNfVPZxOq4 | m02-t5-a51 huZgfr6vqL | m03-t1-a51 Bh9rhtCoQR | m03-t4-a36 w4v04Nu7EI | m04-t3-a36 4RQeZ4l9Aa | m04-t5-a51 ksp3gsV16B  (m01/m02 got bg-removal 3cr each, rest native alpha)
Credits: 8x65 + 4x3 = 532. qa_fig: only pinholes (<10) + huadian WARN (none drawn).
Note: OLD files had a forehead huadian dot on maids; new ones have none (rule: huadian only consorts).

## PILOT v2 (after ROOT-5 colour check 10:37Z) 
COLOUR RULE: new mN-tK-aXX must match the LIVE a18 mN-tK (= OLD colour), NOT the consort-tier table. m01/m02/m03 pilot v1 (table gold/saffron/peach) FAILED the check -> redone in a18 colour (sage/sage/dusty blue-grey); m04 v1 too orange -> redone peach-apricot; m04-t3 v2 had a faint forehead dot copied from the old ref -> redone with 'ERASE the dot' line. Prompt now: "SAME outfit colours (<describe from image 1>) ... keep colours exactly, do not recolour; FOREHEAD bare, erase any mark".
Final gen ids: m01-t1-a36 s78zNUvl8e | m01-t3-a51 SymW396Ub8 | m02-t2-a36 mERlKV7hJQ | m02-t5-a51 5jM67Q7Kxe | m03-t1-a51 p8O5FvZehw | m03-t4-a36 P3upTcu42C | m04-t3-a36 5jM6RvHKxe | m04-t5-a51 cpguEkq0eP. Credits so far 532 + 8x65 = 1052 (+3 bg removal x4 earlier).
Sheet = pilot-mama/pilot-sheet.jpg (a18 | OLD | NEW per file). Scratch /home/user/wt/w8 (proc.sh, sheet3.py, fore.py).

## OWED / DENIED (do not retry; ROOT-5 raising with main)
- m05-t1-a36: creations_upload_image of the OLD ref denied by classifier ('Unsanctioned Communication') 10:5xZ. Skipped. Not routed around.

## BATCH m05-m07 (29 files + owed m05-t1-a36), sheets pilot-mama/sheet-m05|m06|m07.jpg (a18|OLD|NEW), all looked OK, forehead crops bare, NOT uploaded (hold for ROOT-5 OK)
Gen ids: m05-t1-a51 LwoGpiNswO | t2-a36 aFAUzAofSh | t2-a51 MB7qO3iDCm | t3-a36 4RQebhx9Aa | t3-a51 Xm41iyrBfo | t4-a36 DoJb6gapcl | t4-a51 3z58Lb7REY | t5-a36 u5YOeZKQLD | t5-a51 SymWK8lUb8
m06 t1-a36 jUBAKD3LD0 | t1-a51 bxVNuTb5Y2 | t2-a36 gOtYgxgSXO | t2-a51 TdUFTTUVNR | t3-a36 bxV6xXF5Y2 | t3-a51 nVLCVPVYQD | t4-a36 UPh0ivdwny | t4-a51 WDluBJUcXe | t5-a36 P3ueWYF42C | t5-a51 u5YylO3QLD
m07 t1-a36 u5Yy7LgQLD | t1-a51 u5Yy7UJQLD | t2-a36 mERggVjhJQ | t2-a51 xSXAAH1jfW | t3-a36 KLD3ANpkqp | t3-a51 w4vTpVa7EI | t4-a36 3z5ICytREY | t4-a51 0eSF1WyTfW | t5-a36 YMsExUFWeC | t5-a51 mERg6cfhJQ
Credits batch: ~130 (wasted m05 retries) + 585 + 1300 = ~2,000; total ~3,200. Method now delegated to sub-agents (brief = scratch AGENT_BRIEF.md, prompt in mama-W8 pilot v2 notes).

## LIVE: pilot 8 (W8-1) + m05-m07 29 files (W8-2), 24+87 objects --check clean. 
## BATCH m08-m10 (29 files) sheets pilot-mama/sheet-m08|m09|m10.jpg, looked OK, NOT uploaded (hold for ROOT-5 OK). Gen ids: m08 t1-a36 w4vTETT7EI t2-a36 79aVuHrJAL t2-a51 yiEp16VPW9 t3-a36 N2HBLcQ6D9 t3-a51 IfisTYytvE t4-a36 lJIYqbNgv9 t4-a51 xSXAqAMjfW t5-a36 s78nKpUl8e t5-a51 cpgQYzh0eP | m09 t1-a36 DoJKiyqpcl t1-a51 s78YSTRl8e t2-a36 eIy1BwBdqL t2-a51 aFA7FvdfSh t3-a36 Lwon7wCswO t3-a51 cpgFonD0eP t4-a36 EbnyxQfuuO t4-a51 8a6s5S8IrU t5-a36 6Aq8MfEiJO t5-a51 Sym0nP4Ub8 | m10 t1-a36 mERSLbchJQ t1-a51 iGbIIKz3uK t2-a36 JNfDD56Oq4 t2-a51 ovNLUAB829 t3-a36 5jM3GaFKxe t3-a51 dtPr7sgXSL t4-a36 VXwblsaMMU t4-a51 gOtcIkcSXO t5-a36 lJIW8jugv9 t5-a51 tC3gAg0mZJ
## OWED / DENIED #2: m08-t1-a51 (ref upload denied by classifier, not retried).
