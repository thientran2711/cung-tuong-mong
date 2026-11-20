# RANK8-A2 report (successor of RANK8-A) · depth 4 · START_CTX ≈3.5 % (estimate; used_tokens read 0) · roll line 28.5 %

## JOB 1 — TEST s62 t5 Phi + t6 Quý phi, cổ vuông y chang Đáp ứng — 2 gens, 270 cr, builder untouched
Base = `build_all.py s62 5|6` (identical to RANK8-A base_t5/6). Test files dev/art/rank8-s62/test-square56b/s62_t{5,6}_sq2.txt.
Diff vs builder (A17):
- t5: "…two or three visible layers," → "+ with an OPEN SQUARE NECKLINE (style 1, simple): a low, simple straight-edged square opening that shows her neck and collarbones, its edge a richer DOUBLE border (Phi): a thin mint mist piping inside and a band of gold brocade with small embroidered peonies outside; never a round collar, never a V, NO crossed wrap collar; the cloud collar sits on the shoulders only and never covers the neckline,"
- t6: "…SATURATED ice blue silk," → "+ with [same t1 G17 words] its edge the RICHEST border (Quý phi): a thin mint mist piping, a wider gold brocade band densely embroidered with peonies, and a fine line of tiny seed pearls; never a round collar, never a V, NO crossed wrap collar; the cape sits on the shoulders only and never covers the neckline,"; and "a pearl-edged collar and cape trim" → "a pearl-edged cape trim" (removes the collar word).
- No kín/covered/high-collar/standing/closed-collar words (checked by grep; only "closed-lip", "high bun", "standing figure" remain).
Gate: check_store --scope tp5/tp6 --age a18 STORE CHECK PASS; lengths 9 027 / 9 687 (< 10 000).
Gens: t5 MBJwQZqDCm, t6 SyhtzkOUb8 (gpt-2-6, 1024x2304, 2k, seed 7172; refs t5 [nVsrRMPYQD], t6 [nVsrRMPYQD, TdwDfOyVNR]).
Sheet: dev/handover/review-sheets/rank8-s62/s62_THU_covuong3_t1-t5-t6.webp (.jpg too) — t1 ĐÃ DUYỆT | t5 THỬ | t6 THỬ.
Looked full size (honest): both = open square neckline, neck + collarbones visible, no stand collar, cape/cloud collar on the shoulders, not covering. t5 edge = pink-gold floral brocade band; t6 edge = gold peony brocade band, plus pearl strands across the chest + necklace (from the original t6 outfit, kept). The square on t5/t6 sits a bit higher/narrower than t1's (t1 is a deeper cut). Faces fine: eyes aligned, lips closed, no earrings. No redraw.

## JOB 2 — skins + rejected + standing rule (0 cr)
- Rule G24 added (rule.py add, both owner verbatims): every GOOD non-final picture (tests, superseded/alternate) → skin archive automatically, never deleted, no need to ask; owner-REJECTED-for-defect pictures → rejected-<MMDD>/ + ledger REJECTED, not skins; a test approved as final leaves the skin list.
- Skins (SKINS.md new "20/11 t4/t5/t6" section + 5 ledger rows SKIN-1120, copies in skins-1120/): s62 t4/t5/t6 first square tests (eIPOIm2dqL, UPvmPCKwny, 79fvNG6JAL) + my t5/t6 tests (MBJwQZqDCm, SyhtzkOUb8 — remove from skins if the owner approves them as final).
- Rejected: m29 t7 old (kseMqUH16B, cut gOm8LDpSXO, cross-eyed) → dev/handover/review-sheets/rejected-1120/m29_t7_a18_OLD_le_cut.webp + README + ledger kind REJECTED. It was never in SKINS.md.
- Nothing deleted.

## OPEN
- Owner verdict on t5/t6 covuong3 sheet. If OK → builder t5/t6 neckline change (not done; builder untouched).
- Context at end ≈ 9 % (well under roll line). No handover needed.
