# fig-rank-match — report (worker, 17/11, coordinator: main s28 session_01UV1SzkNSYyuEkCJ3Bv1Evj)

PRIORITY #1 CHECK ('hoàng hậu.*(phục|ảnh)|hh.*(dress|tier|fig)'): OD 7 | ledger 1 | main j66.js figTierOf (queen→t8, rivals rank+1, her S.pid) + figDist + figPick/figUsed/pidEnforce; j88.js f88Pick (the picker that actually decides) | review/* 0 | claims: C whole-figure repaint W1–W7 (art only). Reused all of it; changed only the picker.

START_CTX ≈ 8% (own estimate; get_session reads 0); finished far below the +25 % rollover point, no handover needed.

## Root cause (measured on the LIVE manifests, https://ctm-img.victoria-tntt.workers.dev/img/FIGURES*.json)
1. The live consort art only has dress tiers **t1–t4** (all 32 identities × 4 ages). **t5–t8 (incl. Hoàng hậu t8) do not exist for any identity.** No "cold" art either.
2. `f88Pick` (j88) took "the nearest consort tier, **either direction**" → a Hoàng hậu (t8) or a Quý phi (t7) wore the **t4** dress (a lower rank's dress). That is the owner's screenshot.
3. The 52 maid identities have **no consort-tier records at all**; `f88Pick` then fell through to the plain maid art → a maid raised to consort (or her, with a maid face as S.pid) wore **maid clothes at any consort rank** ("Đáp ứng looks like a maid", OD 03:02Z).
4. Not the cause: figTierOf (queen→8, rival rank+1, S.rank+1 are correct), figDist (only used inside one identity), pid/fid fixed too early (fid is identity only; tier is recomputed on every figFor call, so a promotion changes the picture the same day).

## Fix (one place, whole family)
`dev/build/j88.js` f88Pick consort mode now calls new `figBestRank(T,tier,age)`: **exact tier; else the nearest tier ABOVE (listed below); else null — never a lower tier, never maid art on a consort, never another face.** null → `figFor` returns "" → every caller shows its own placeholder (initials / grey silhouette / the old face), exactly as for a person without art.
`dev/build/j86.js` fpPor (foreign-princess preview) uses the same strict pick. Cold (lãnh cung) = exact "cold", else t1 (nearest above), as j66 already documented.
All other tier-aware callers go through figFor → f88Best → f88Pick (stage, dialogs, Tuần lục, lists, portraits, toil dressing-room previews, kit face chooser), so one rule covers all screens.

## Whole-family audit (script: `node dev/test/fig-rank-audit.js [out.json]`; manifests from the CDN; real game logic in Chromium)
Cells = 84 identities × {cold,t1..t8} × 4 age bands, for an NPC consort and for her (S.pid):
| | exact | above (art missing) | none (no art → placeholder) | **LOWER tier** | **maid art on consort** |
|---|---|---|---|---|---|
| BEFORE (main f53bdade) | 1008 | 124 | 0 | **1008** | **3536** |
| AFTER (69b5df20) | 1008 | 124 (all = cold→t1) | 4544 | **0** | **0** |
Mismatches → 0 except the listed missing art. Per tier after: t1–t4 exact (consort ids only); t5–t8 = none for all 84; maid ids = none for every tier; cold = t1 (nearest above).
Visible effect until art lands: ranks 5–8 (Quý phi, Hoàng quý phi… **Hoàng hậu**) and promoted maids show the placeholder/old face instead of a wrong dress. Per the brief ("zero lower-tier fallbacks"). If the owner prefers the t4 dress back temporarily, it is a one-line revert in figBestRank — NOT done.

## ART REQUEST (for Foreman C — to be copied into FOREMAN_C_STATUS.md by the coordinator; workers do not write that file)
ART REQUEST (fig-rank-match): missing consort dress tiers, same face per identity, all 4 age bands (a18/a26/a36/a51), full figure + por (+hd/tn as the others):
- **32 consort identities c01–c32: tiers t5, t6, t7, t8 (t8 = Hoàng hậu, phoenix crown + empress robes)** → 32×4×4 = 512 figures (+por).
- **52 maid identities m01–m52** (they can be raised to consort / become her face): **tiers t1–t8** as role "maid" records with tier "t1".."t8" in FIGURES-servants.json (their own faces; j88 reads them already) → 52×8×4 = 1664 figures. Until then no maid face is drawn for an NPC consort (F88_NEED_C) and a raised maid shows a placeholder.
- Optional: tier "cold" (lãnh cung) for all 84 (today = t1).
- Priority order: t8 for the 32 consorts first (the owner's bug), then t5–t7, then maid t1–t4.
Machine list of missing tiers: `node dev/test/fig-rank-audit.js` prints the "IDENTITIES WITH MISSING CONSORT TIERS" groups.

## CLAIMS row (for dev/handover/CLAIMS.md)
| fig-rank-match: dress tier = rank tier exactly (f88Pick strict, audit) | review/fig-rank-match @ 69b5df20 | worker (sonnet) | READY FOR REVIEW (quickcheck PASS 100 s; audit 4544 → 0 wrong cells) | 17/11 |

## Tests
- `bash dev/tools/quickcheck.sh HEAD` (from review/go-live-kit tools): **QUICKCHECK PASS · 100 s · open 859 ms · old save ok (loads, plays a buổi, 0 errors) · perf new/live: render 199/199, tab 237/213, buổi 607/546**.
- Audit before/after above (0 page errors).
- Shots (not in git, scratchpad): Fold 755x1000 + iPad 1180x820, queen rival (t8): `figFor` returns "" and the sidebar frame shows her old face portrait (no wrong dress); iPad stage shot shows "Hoàng hậu" with the small old-face portrait. LIMIT: the VIỆC "Hội phối đồ: báo đề" panel could not be captured cleanly (the intro "Nhập cung" modal covers it in my driver); the same picture function (`pv(H)` → figFor/porOf) is what the audit checks. Reviewer: please look at that panel once on a real run.
- No co-op test run (no co-op code touched).

## Not done / notes
- No new art can be made here (C paints). Until t5–t8 land, the Hoàng hậu has no dress picture at all.
- Same-day change on promotion: verified by construction (tier recomputed in every figFor) and audit loops over ranks on the same person; no stored per-rank picture.
