# rv-kit-info-tap — PASS

PRIORITY #1 CHECK: grepped OWNER_DECISIONS (#86 option A 21/11 ~05:15Z: fixed info block, one line per row, «!» opens the full text), my rv-kit-info-fixed notes (kit-info-tap skipped Hoàng tự/Kế vị/Hôn sự/Quý tộc), KIT.md §6.3h; extends kitInfoOneLine + its CSS to the kit-rows info block of a person card body (law 11); no new part.

Branch: review/kit-info-tap-rv = keeper#2 5466b126 + LIVE 75ad237d (index/sw rebuilt; LIVE has since moved to a4ee93d7 kit-opt-kem — you self-merge), sha c5bbde7e0ca52072299d361c2676ad73676282c0.

Change (jk4.js, 14 lines): selector .pc .pcf .kr>.krv → also .pc .pcb>.kb.kpkb>.kr>.krv in kitInfoOneLine and the §6.3h CSS (nowrap/…/«!» spot, dialog ✕ lane .pcpop). Whole group scan (Fold + iPad, natural content): the new selector matches ONLY the Hoàng tự child-card rows (Tuổi · Thứ bậc · Tước vị · Nuôi dạy · Sức khỏe); nothing else in person cards (rv/court/staff/men/kid, pop-maid/elder, Kế vị/Hôn sự/Quý tộc) changes; .kpkb outside person cards untouched.
Checks: kit-info-tap.js real-tap test PASS Fold + iPad on pop-maid, pop-elder, tab-rv/court/staff and tab-kin (was SKIP): elementFromPoint = the «!», popup «Hôn sự» (row label as title) opens with the whole text, card stays; kvo/hon/qt SKIP is legitimate (Hôn sự card = «Việc hôn sự» paragraph, no info rows — looked at the shot). Looked at the Fold tab-kin shot: rows one line, «!» right, popup readable. coop-e2e 94/94. QUICKCHECK PASS 261 s (render 273/295, tab 555/577, buổi 1424/2086, core gates PASS, old save ok). No stray images.
