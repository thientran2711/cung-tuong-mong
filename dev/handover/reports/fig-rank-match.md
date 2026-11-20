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
Visible effect with the LIVE (shrunk) manifests, i.e. until the rebuilt manifests are uploaded: ranks 5–8 (Quý phi, Hoàng quý phi… **Hoàng hậu**) and promoted maids show the placeholder/old face instead of a wrong dress. Per the brief ("zero lower-tier fallbacks"). If the owner prefers the t4 dress back temporarily, it is a one-line revert in figBestRank — NOT done.

## MANIFEST REBUILD (ships first, alone; s29 uploads after review) — owner: "tôi nhớ là đã vẽ đủ hình hết rồi"
FACT (CDN, read-only): the art EXISTS. Bucket listing img/_index.json (28 354 objects) holds 8 891 fig-* files; all 1 152 consort files fig-consort-cNN-t{1..8,cold}-aAA exist, and so do the 52 maids × t1..t8 (1 664) + maid cold (208). The live manifests list only 980 of them (t1–t4 consort; maids only the plain dress). **My earlier "missing art / ART REQUEST" was wrong and is deleted: nothing to ask C for t5–t8/cold, and maid t1–t8 exist too.**
Rebuilt by `python3 dev/site/manifest_rebuild.py --out DIR` (keeps every live entry unchanged, ADDS entries for art in the bucket that is not listed; look/palette copied from the identity's first record):
| manifest | live | new | added |
|---|---|---|---|
| img/FIGURES.json (consort) | 656 | **1 296** | +640 = consort t5,t6,t7,t8 (512) + cold (128) |
| img/FIGURES-servants.json | 240 | **2 112** | +1 872 = maid t1..t8 (1 664) + maid cold (208) |
Files are in the worker's scratchpad only (not git; images/manifests never go in git). To produce them again: run the script (needs only the CDN). NOT added on purpose (other consumers / C's repaint still running): consort/maid tmN rank dress (1 472 files), tyN, kc, ngheo, eunuch rank (360), kids extra (144) — they are also orphans (art without manifest entry): C's W-batch should list them when finished.
Audit with the rebuilt manifests (same script, FIGDIR=new): 84 identities × cold,t1..t8 × 4 ages × (NPC + her) = **5 676 cells, ALL exact** (0 above, 0 none, 0 lower, 0 maid art, 0 missing tiers). With the live (shrunk) manifests + my picker: 0 wrong, 4 544 placeholders (so the picker alone is safe too, but the rebuilt manifest is what makes Hoàng hậu appear).
Also patched jkc.js kcPor: maid faces now list consort-dress records, a khuê-các/maid pick must never take one (filters them out).

## WHICH WRITER SHRANK IT (root)
Not provable from git (img/ and its manifests are not in git; the CDN keeps no history). Evidence: the live FIGURES.json is exactly the t1–t4 + eunuch + player + emperor state (656); PROGRESS_book_release.md (main 1ebb0bb6) records a main that had "consort-art t5–t8 … FIGURES.json y nguyên main", so the entries once existed. Writers in the repo that REPLACE the whole file: `dev/figwork/pub2.sh` (`cp $M/img/FIGURES.json img/` = a worker's copy over the shared one), `proc.py` / `sheetproc.py` (write their own full list from a local base), and `cdn_sync.py` push (only HELD-check by md5 of the last pull; `--force` or a stale pull overwrote, and NOTHING compared entry counts). Any of them pushing a worker's older/narrower copy drops everything the worker did not have. Root fix = the guard below on the single upload path; the old scripts (pub2.sh etc.) all end in cdn_sync, so they are covered too.

## GUARD (never shrink)
- `dev/site/manifest_guard.py`: FAIL when a new manifest drops a file listed live, a (role,tier) count shrinks, total/(role,tier) is below the committed floor `dev/site/manifest-floor.json` (= the rebuilt state), or a listed file is not on the CDN. `--live-check` checks the live CDN manifests against the floor (for quickcheck/nightly: `python3 dev/site/manifest_guard.py --live-check`; exit 1 until the rebuilt manifests are uploaded, then PASS); `--write-floor` only ever raises the floor.
- Wired into `dev/site/cdn_sync.py` (the only writer): a push of img/FIGURES*.json (not -hd) that shrinks is REFUSED ("SHRINK … REFUSED"); `--allow-shrink` for an intended removal. Tested: manifest cut by 5 entries → refused (exit 1); rebuilt manifest → accepted (dry-run).
- Quickcheck gate: quickcheck.sh lives on review/go-live-kit (not on main) — add one line there: `python3 dev/site/manifest_guard.py --live-check`. Not done here (other branch).
UPLOAD ORDER for s29 (do NOT upload before review): regenerate with manifest_rebuild.py → `python3 dev/site/manifest_guard.py DIR/FIGURES.json` (passes) → `python3 dev/site/cdn_sync.py --pull` (state) → copy DIR/*.json to img/ → `python3 dev/site/cdn_sync.py img/FIGURES.json img/FIGURES-servants.json` → `manifest_guard.py --live-check` PASS. Game re-reads manifests within 5 min.

## CLAIMS row (for dev/handover/CLAIMS.md)
| fig-rank-match: dress tier = rank tier exactly (f88Pick strict, audit) + MANIFEST REBUILD (656→1296, 240→2112) + never-shrink guard | review/fig-rank-match | worker (sonnet) | READY FOR REVIEW (quickcheck PASS 100 s; audit 4544 → 0 wrong cells) | 17/11 |

## Tests
- `bash dev/tools/quickcheck.sh HEAD` (from review/go-live-kit tools): **QUICKCHECK PASS · 100 s · open 859 ms · old save ok (loads, plays a buổi, 0 errors) · perf new/live: render 199/199, tab 237/213, buổi 607/546**.
- Audit before/after above (0 page errors).
- Shots (not in git, scratchpad): Fold 755x1000 + iPad 1180x820, queen rival (t8): `figFor` returns "" and the sidebar frame shows her old face portrait (no wrong dress); iPad stage shot shows "Hoàng hậu" with the small old-face portrait. LIMIT: the VIỆC "Hội phối đồ: báo đề" panel could not be captured cleanly (the intro "Nhập cung" modal covers it in my driver); the same picture function (`pv(H)` → figFor/porOf) is what the audit checks. Reviewer: please look at that panel once on a real run.
- No co-op test run (no co-op code touched).

## Not done / notes
- No new art can be made here (C paints). Until t5–t8 land, the Hoàng hậu has no dress picture at all.
- Same-day change on promotion: verified by construction (tier recomputed in every figFor) and audit loops over ranks on the same person; no stored per-rank picture.
