# REVIEW kit-ge — PASS 5bbdf1ea
PRIORITY #1 CHECK: KIT_REQUESTS K-GE-1/2/3 (:85-87) | main geMap() jge.js:187, BAL.ge.mapOn false | review/kit-ge 5bbdf1ea | claims kit-ge
Branch review/kit-ge-rv = 5bbdf1ea (origin/main 66bd36cd is its ancestor; main had no newer commit, so no extra merge needed → FF-able).
- K-GE-1 kitBranchMap/Mount/Open (j79.js, KIT §21.2): matches GRAND_ENDINGS §2.10 — vertical spine, her face chip on current chapter, past solid / ahead dotted, 2 kỳ ngộ, 4 end cards (Còn mở / Chỉ còn đường thua / Đã khép · chương n), 2 title slots, fail node, tap = kitModal card, «?» card text per spec. Input = geMap() return unchanged (checked fields vs jge.js:187). Page still OFF (mapOn false); no other player-visible change.
- K-GE-2 kitTitlePlate tone thiện gold-white / ác gold-crimson, same tier-8 mould, tone from data (o.sh / t.sh / key suffix ge_<b>_<n>t|a), no per-place variant.
- K-GE-3 plate-label kitRows stack at every width. Scan of plate-as-label callers: jdh:180, jdh:183, jge:173 — all go through kitRows, all covered by the one CSS rule; jdh:161/171 use plate in html section (not rows).
- KIT FIRST: KIT.md §21.2/§82.1 + kit page samples + KIT_REQUESTS KIT READY. Kit tokens only. VANPHONG: no %, words per spec.
- Shots LOOKED (Fold, iPad, phone 390; cover via test): no overflow, plate row full width, chart legible. Scratch only.
- Tests: kit-ge.js 64/64 (4 sizes); quickcheck.sh PASS 211 s (old save ok, core gates PASS incl. kit-conform, perf new/live render 238/259, tab 453/484, buổi 1223/1189).
- Non-blocking notes: ch12/13/14 `seen` undefined → shown by name (as data says); CDN review folder img/_review/kit-ge/ belongs to the worker — wipe with `python3 dev/site/cdn_sync.py --wipe-review kit-ge`.
