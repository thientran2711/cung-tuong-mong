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

## JOB 3 — G1 t6 Quý phi TWO-layer short shoulder capes (ROOT-69, owner) — builder, 0 cr
- build.py low_outfit: for t==6, "an embroidered {main} pearl-edged cape/stole over the shoulders" → "TWO layered embroidered {main} SHORT shoulder capes, one over the other (the upper cape shorter, the lower cape a little longer, both resting on the shoulders, pearl-edged), never covering the neckline". Applies to every t6 built through low_outfit that carries that phrase (s/m/p/maids, and c rows such as c06).
- Gate STORE CHECK PASS s62/m29 t6 (dev/art/rank8-s62/g1cape/). Lengths a18 s62 9 499, m29 9 050; a26/a36 < 10 000 (c06 a36 9 944). a51/a65 t6 FAIL LEN ~11 259 — PRE-EXISTING (was ~11 120 before), not caused by this change.
- G1 owner verbatim NOT yet written into ART_RULES.md (edit errored) — to do.
- s64 t6 test A prompt dev/art/rank8-s62/g1cape/s64_t6_test.txt (gate tp6 PASS, 9 867 chars); gen 1ldpG7Kr4r STARTED (135 cr), NOT yet looked at / no sheet. Version B (lower neckline) NOT started.
- PAUSED: the user declined the wait call and said stop; waiting for instructions.

## JOB 4 — t6 Quý phi 2-layer cape tests on 2 different people (owner GO via ROOT-69) — 2 gens, 270 cr
- A s64 (1ldpG7Kr4r): fixed builder t6 + t1 square neckline (G17 words) + richest edge (smoke lilac piping, peony brocade, seed pearls); "pearl-edged collar and cape trim"→"pearl-edged cape trim". 9 867 chars, gate tp6 PASS.
- B s65 (cpSl1dd0eP): same, neckline "set a little LOWER … a subtle, tasteful hint of the upper chest, elegant and refined, a noble court lady, never revealing". 9 921 chars, gate tp6 PASS (no banned word).
- Sheet dev/handover/review-sheets/rank8-s62/s64A_s65B_THU_t6_2lop.webp (.jpg).
- Looked full size: A — two tiered pearl-edged short capes clearly visible on the near shoulder (3/4 view, far shoulder hidden), open square neckline, pearl strands on chest; face ok. B — two tiered pearl-edged capes on both shoulders, square slightly lower with a faint, modest chest line; large royal-yellow front panel (from the builder yellow rule). Faces ok, lips closed, eyes aligned. No redraw.
- G1 owner verbatim now written in ART_RULES.md.
- Old s64 t6 B: never drawn (nothing to skin). A/B are tests → skins per G24 unless approved final (not added yet: waiting verdict).
