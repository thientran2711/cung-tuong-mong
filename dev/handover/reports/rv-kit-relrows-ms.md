# rv: kit-relrows-ms (d80b9d2b, keeper #3)
PRIORITY #1 CHECK: KIT_REQUESTS 20/11 rel-men-servants row (REVIEW r1 F1); KIT §52 kitRelRows; reused j9 aff/oan model; grep OD on relation wording.
- Change is jkrel.js-only (+KIT.md note, test): men/servants/maid/officials read aff/oan (never p.loyal as «Thiện cảm»); own servants add «Lòng» + «Ta tin cậy»; not met → «chưa rõ». Fully guarded on relMS/relMSAll: no-op on LIVE (old branch runs).
- Merged LIVE fc7f98f6 into review/kit-relrows-ms-rv (1641927e). On LIVE-based build test SKIPs by design; quickcheck PASS; coop-e2e 94/94.
- Functional check: temp build rel-men-servants 494ea79b + the jkrel.js patch: kit-relrows-ms.js Fold PASS (47 people, 42 strangers) / iPad PASS (48/43), values equal j9 aff/oan (maid: Thiện cảm 10 · Oán 3 · Lòng 75 · Ta tin cậy 49; man: Thiện cảm 10 · Oán 0 · Ta→hắn 3). Fold shot of the maid card looked at: rows one kit unit each, no «%», wording cổ trang.
- Note: rel-men-servants is not on LIVE yet; this branch only becomes visible after it lands (land order irrelevant, either is safe).
- VERDICT: PASS.

## Round 2 — review/kit-relrows-ms1word 36032ad2 (keeper #5): PASS
PRIORITY #1 CHECK: OD:L352 («only ONE word Thiện cảm; drop Lòng»); my round 1 PASS; read jkrel.js diff; merged LIVE into review/kit-relrows-ms1word-rv (c37b7713b68bc26cfb19dedb9820eec1d9b9911d).
- Diff: jkrel.js only (+KIT.md §52, test): own servant's «lòng» (p.loyal) row removed, KR2_W has no «Lòng» word → Thiện cảm + Oán + Ta tin cậy. Matches OD:L352.
- Test needs relMSAll: on LIVE alone SKIP by design; on a throw-away merge with origin/review/rel-men-servants-r1 kit-relrows-ms.js Fold PASS (46 people) + iPad PASS (49); maid card rows = Thiện cảm 9 · Oán 4 · Ta tin cậy 52, no Lòng, man = Thiện cảm + Oán + «Ta → hắn».
- Whole-group (law 11): other «Lòng» strings remain OUTSIDE the kit rows (j15 sinfo/pcard fallback when bondBars missing, j19 HXN «Lòng cung nữ», j1 NAMES) — pre-existing, not touched here; keeper listed them in kit-keeper-5.md §4 for MAIN to route (Foreman); not blocking this kit-rows change.
- quickcheck PASS; coop-e2e 124/124.
- VERDICT: PASS.
