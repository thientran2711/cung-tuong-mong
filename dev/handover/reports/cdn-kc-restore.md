# cdn-kc-restore (worker for C-AG #23 / ROOT-71), 19/11 ~22:40Z
PRIORITY #1 CHECK: OD 0 hits for FIGURES-kc | main dev/site/manifest-floor.json:30 (floor 420), manifest_guard.py, cdn_sync.py (guard exists) | review/* none | claims CLAIMS L309/310 (this job) | reports lv1-kc-swap.md = the cause (LV1, ROOT-50/51), FOREMAN_C_STATUS L1444/L1453 (FOR MAIN floor line never landed), FOREMAN_E_STATUS L571 (alarm).
depth 2 (lineage limit 8) · START_CTX ~4 % (own estimate, get_session read 0, window 1M) · ending ~11 %.
Branch review/cdn-kc-guard from LIVE main 2bda29a1: **baf63a2d** (floor only, can be cherry-picked) + **e0e0e5ae** (guard hardening). → SẴN SÀNG KIỂM cdn-kc-guard e0e0e5ae.

## 1. CAUSE (evidence)
- Nothing is broken on the CDN. The live FIGURES-kc.json (264 rows) is the owner-ordered state. The REPO FLOOR is stale.
- Owner Lượt 557 (verbatim in lv1-kc-swap.md): "Hình quê cát cũ trong game cũng bỏ luôn, cái gì mà cũ trong game là cũng tháo ra hết luôn, không có để lại, mất công lộn." LV1 (Foreman C ROOT-50/51) on 19/11 ~19:40Z: FIGURES-kc 420 → 136, pushed with `--allow-shrink` (intended). Old files were copied to img/_rejected/live-old/ (never reuse) and deleted from live paths.
- Owner Lượt 562 (via ROOT-50/51): consort kc must not be removed yet. LV1 restored consort kc: 136 → 264. Maid kc a26/a36/a51 (156 rows) stay removed. Maid kc a18 = the new thiếu nữ v3 pictures.
- LV1 wrote "FOR MAIN: lower the FIGURES-kc floor to 264" (lv1-kc-swap.md CORRECTION; FOREMAN_C_STATUS L1444/L1453). It never landed on main. main's dev/site/manifest-floor.json still said maid|kc 208 / n 420, so every branch's quickcheck 70-manifest-guard (G4) has failed since ~19:40Z.
- The hole: `--allow-shrink` let an intended shrink through but left the floor alone. The floor only lives in the repo, and `--write-floor` can only raise it. So an intended shrink ALWAYS left every branch failing until someone edited the floor by hand on main.
- NOT restored on purpose: putting back the 156 maid kc a26+ rows would undo the owner's order (Law 16) and point at _rejected art.

## 2. Counts: old-good vs rebuilt vs live
| key | floor on main (old) | LV1 after Lượt 557 | live now = after Lượt 562 | new floor (baf63a2d) |
|---|---|---|---|---|
| consort/kc | 128 | 0 | 128 | 128 |
| consort/ngheo | 32 | 32 | 32 | 32 |
| maid/kc | 208 | 52 | 52 (a18 v3) | 52 |
| maid/ngheo | 52 | 52 | 52 | 52 |
| total | 420 | 136 | 264 | 264 |
- Rebuild from the bucket listing = identical to live: every live-path kc/ngheo object (fig/por) is listed, and none is unlisted. 528/528 URLs (264 fig + 264 por) HEAD 200. Nothing to upload. FIGURES-kc.json was NOT re-pushed.
- `python3 dev/site/manifest_guard.py --live-check` with the new floor: **MANIFEST GUARD PASS** (re-run after the shot upload: still PASS).

## 3. LOOK (Fold 755x1000@2 + iPad 1180x820@2, real game served from main's index.html; 0 page errors, 0 broken img, 0 kc/ngheo 4xx)
CDN img/_review/cdn-kc-guard/: tt-755x1000-1-home, tt-1180x820-1-home (Tể tướng daughter, consort kc dress c11/c07), tt-755x1000-2-rv (Gia tộc), thd-755x1000-1-home, thd-1180x820-1-home (thầy đồ nghèo, ngheo c28/c06), thd-*-3-sister (Thứ muội portrait = ngheo por), maidv3.jpg (fig-maid-m01/m27/m52-kc-a18, the Quý nữ pool art). Looked at each 3×: whole figure in, nothing cut, portraits framed.
- The Quý nữ list (qtTab/qtList) is not reachable from the page scope in a test, so the maid v3 art was checked as files (HEAD + look), not in that list.
- Shot script: kcshots.js (route steps from dev/test/kc-roads/route.js). Kept in scratch, not committed. Wipe the folder with the verdict: `python3 dev/site/cdn_sync.py --wipe-review cdn-kc-guard`.

## 4. Upload
None needed. The CDN was already correct. "CDN CLEAN FIGURES-kc 264 (floor 264)" was sent to ROOT-71 + C-AG #23 at ~22:05Z.

## 5. PUSH PATHS for any img/FIGURES*.json / ACTS / EVENTS (Law 11, whole family), before → after
| # | path | before | after (e0e0e5ae) |
|---|---|---|---|
| 1 | `cdn_sync.py <file>` / bulk / `--git REF` | guarded (fixed GUARDED list) | guarded by `is_guarded()` = every FIGURES*.json (incl. -hd, any new one) + ACTS/EVENTS |
| 2 | `cdn_sync.py --allow-shrink` | shrink allowed, floor left stale → **today's cause** | needs `--reason`; records `{from, repo, to, reason, at}` in CDN img/_floor-sanctioned.json + lowers dev/site/manifest-floor.json in that checkout (commit it); `effective_floor()` in live-check / single check / `--write-floor` applies the CDN record while the repo entry is still the one it replaced |
| 3 | scripts that `import cdn_sync` and call `C.put()` (lv1-tools mv_old.py / restore.py pattern) | NO guard | guard inside `put()`: an unchecked guarded manifest is refused before any network write |
| 4 | `C.req("DELETE", …/objects/img/FIGURES*.json)` | NO guard | refused unless shrink allowed |
| 5 | `cdn_sync.py --prune` | could delete a top-level manifest | never selects top-level img/*.json |
| 6 | `--wipe-review` | only img/_review/<topic>/ | unchanged (safe) |
| 7 | manual curl / dashboard / wrangler | no recipe in main/handover (git grep of r2/buckets, curl -X PUT, --upload-file: none) | doc line in cdn_sync header: never write a manifest any other way |
| 8 | art tools (t8-prompt-B/tools/push.sh, build_sets.py, MOVE_HOUSE) | all call cdn_sync | covered by 1–3 |
| 9 | cdn/worker | read-only (no PUT) | n/a |
| 10 | live-check coverage | fixed list (FIGURES-hd unchecked) | walks every FIGURES*.json on the CDN (`names_live()`) |
Tests: dev/test/manifest-guard-selftest.py = **12 pass, 0 fail** (fake CDN writes, real CDN reads); wired into dev/tools/quickcheck.d/70-manifest-guard.sh (rc 0). Real CLI dry runs: unchanged FIGURES-kc → "same 1"; 4 rows cut → SHRINK … REFUSED; `--allow-shrink --reason test` → SHRINK ALLOWED (dry run, nothing recorded).

## FOR MAIN / C-AG
1. Land baf63a2d first (floor only) to unblock G4 for npc-purpose 126dadaa / choice-value 02e151e3 / palace-chatter (they need to merge main after it). e0e0e5ae (tooling) after review.
2. The OD log has no line for Lượt 557 / 562 (old kc out / consort kc kept). MAIN should record it (OD is MAIN's file).
HANDOVER: none needed. Job done; only the review is left.
