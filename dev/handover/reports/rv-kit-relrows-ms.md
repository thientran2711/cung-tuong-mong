# rv: kit-relrows-ms (d80b9d2b, keeper #3)
PRIORITY #1 CHECK: KIT_REQUESTS 20/11 rel-men-servants row (REVIEW r1 F1); KIT §52 kitRelRows; reused j9 aff/oan model; grep OD on relation wording.
- Change is jkrel.js-only (+KIT.md note, test): men/servants/maid/officials read aff/oan (never p.loyal as «Thiện cảm»); own servants add «Lòng» + «Ta tin cậy»; not met → «chưa rõ». Fully guarded on relMS/relMSAll: no-op on LIVE (old branch runs).
- Merged LIVE fc7f98f6 into review/kit-relrows-ms-rv (1641927e). On LIVE-based build test SKIPs by design; quickcheck PASS; coop-e2e 94/94.
- Functional check: temp build rel-men-servants 494ea79b + the jkrel.js patch: kit-relrows-ms.js Fold PASS (47 people, 42 strangers) / iPad PASS (48/43), values equal j9 aff/oan (maid: Thiện cảm 10 · Oán 3 · Lòng 75 · Ta tin cậy 49; man: Thiện cảm 10 · Oán 0 · Ta→hắn 3). Fold shot of the maid card looked at: rows one kit unit each, no «%», wording cổ trang.
- Note: rel-men-servants is not on LIVE yet; this branch only becomes visible after it lands (land order irrelevant, either is safe).
- VERDICT: PASS.
