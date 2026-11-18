# BRIEF LIVE-1: push today's owner-approved figures into the game (Foreman C ROOT-34, 18/11 ~23:50Z real)
PRIORITY #1 CHECK: owner (verbatim ~23:48Z): "Tức là hình hoàng quý phi, hình quý phi hay là những cái hình mà ngày hôm nay vẽ ra là mày vứt hết hả? ... Đã đẩy lên game chưa? Tại sao không đẩy lên game đi, còn để những hình cũ là làm sao?" | Foreman C checked: live img/hd/fig-consort-c06-t8-a18.webp = OLD image; approved prompt-B img/_review/t8-reprompt/c06_a18_t8_v0.png NOT live | live procedure = reports/c03-v1-t678.md + FOREMAN_C_STATUS FOR MAIN lines ROOT-22/24/25/27 (fig/hd/por/tn, fig-ht.json rows, mk-fit/toil-fit anchors, manifest_guard --live-check, repo copies on a review/* branch → MAIN lands).

JOB:
1. INVENTORY (write it first, in reports/live-today.md): every figure the OWNER APPROVED today that is NOT live yet. Sources: FIGURE_GATE A0 APPROVED FORMS + the owner lines + the reports. Expected, at least:
   - t7 Hoàng quý phi + t8 Hoàng hậu prompt-B, all faces/ages done (img/_review/t8-reprompt/ and the t8-mass-B-W7x reports; a26/a36/a51/a65 masses in the b10-* reports).
   - Thái hậu (32, DONE).
   - khuê các / nhà nghèo 2K re-makes (K1/K2/K2b), K4 c13/c16 new, K5 poor-fix 13 (reports kc2k-*, ngheo-poor-fix).
   - any t1–t6 approved sets.
   Per group, give: count, review folder, live target name, and whether a live slot exists. Do NOT push samples that are still open: triều phục, Nữ đế crown, BD Quý phi colour, t1/t2/t3/Phi redesign, 49 maids.
2. BACKUP: before overwriting any live file, copy it to img/_backup/1118-live/<same path> on the CDN.
3. LIVE: push each approved group exactly as the c03 procedure does (hd/por/tn webp, fig-ht.json rows, mk-fit/toil-fit anchors where needed, manifest_guard --live-check PASS). Repo copies on review/live-today-1118 (never main). Biggest group first: t7/t8 prompt-B.
4. SPOT-CHECK: after each group, fetch 3 live files and look that they are the new images.
5. Report reports/live-today.md (counts per group, backup path, guard output, FOR MAIN line). Push the handover branch. Send READY to Foreman C ROOT-34 (session_01PEhRbxEqMo11RRz1YMMxN4) after the inventory (step 1) AND after each finished group.
Roll over at START_CTX+25 % (ceiling 60 %): write the handover in the report and tell me; I open the successor.
