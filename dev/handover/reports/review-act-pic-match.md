# review-act-pic-match (small reviewer) — verdict PASS 48d7a30
PRIORITY #1 CHECK: brief briefs/review-act-pic-match.md + root46-common + START_REVIEWER read; worker report reports/act-pic-match.md; reused worker tools (act-pic-audit.py, pic-dupes.js, act-pic-shots.js, manifest_guard.py).
## FF
Worker sha b84199652 (merged main 9bbd78b) was no longer FF: main moved to 550dd1b (face-zoom). Reviewer merged origin/main + b841996 on review/act-pic-match-r6 (conflicts only index.html/sw.js: took main, rebuilt with build_site.sh). Result **48d7a30**, ancestor check origin/main 550dd1b = FF_OK. Pushed origin/review/act-pic-match-r6. If main moves again, re-merge (index.html/sw.js/assets.json only).
## Checks
- quickcheck (bash dev/tools/quickcheck.sh; note: sh fails on pipefail): PASS. core gates PASS, time-spill PASS, open 1041 ms, old save ok (load ok, buoi ok, 0 errors), perf new/live render 156/162, tab 295/318, buoi 701/769 ms.
- 70-manifest-guard hook (QC_OUT=/tmp bash dev/tools/quickcheck.d/70-manifest-guard.sh): MANIFEST GUARD PASS. Live ACTS/EVENTS/FIGURES-kids are byte-identical to dev/art/manifests/*.json (cmp).
- cdn_sync guard (dry-run, stale ACTS.json on disk): bulk run and `img/` folder run -> "HELD img/ACTS.json (bulk run: name the manifest file, or pass --manifest)"; naming the file runs the never-shrink guard (SHRINK lines for acts 332->1, prefix 10->0, log 836->0, below floor); the correct manifest named or bulk: same 1, nothing held. Works. Small note: a stale file is blocked twice (hold + shrink), fine.
- manifest_guard floors: ACTS acts 332 / log 836 / prefix 10, EVENTS 75/236/47, FIGURES-kids 336 — equal to the live copies, sane; dcheck handles dict sections.
- j79 kitActKey0: "-" = no picture, stops before prefix/longer/log borrow; kit placeholder shows. One-line change, other paths unchanged.
- Scan (pic-dupes.js on 48d7a30, live manifests): 166 act names, 128 distinct pictures, 0 page errors, near-identical file pairs 0, placeholder 5, shared files 17 (55 names), loose 15.
- LOOKED at contact sheets flag01/02 (25 pictures): shared groups are same-meaning (Tụng/Chép kinh, Thưởng/Ban thưởng, Xuất gia, Tặng quà/Biếu, Phạt quỳ/Phạt vô cớ, Đến <9 places>, thư kêu oan x3, Để ý nam nhân x3, Xin ban hôn). Loose matches all subject-correct. Weak fits (not blockers): Hối lộ Kính sự phòng and Tranh sủng on the jade tablets picture (lat-the); Xử tội on the paddle picture ok.
- Shots Fold 755x1000@2 + iPad 1180x820@2, 18 tabs each: 0 page errors, 0 horizontal overflow. iPad Hành sự: Điểm trang = mirror/hairpin, Nghỉ ngơi một lát = lotus bowl + bolster (own pictures, owner bug fixed); Trò chuyện với cung nữ card shows the kit placeholder. At Fold the act tab shot shows the room scene (list not in view in the script's shot); coverage of act pictures at Fold comes from the scan, not a visible list — worker's shots script could scroll the list.
## Non-blocking findings (for main)
1. 5 acts (Trò chuyện với cung nữ, Hắt nước, Hắt trà, Quạt mực, Nhờ thái giám tìm thú nuôi) still show the SAME placeholder ph-p-light-pl, which is a dressing-table picture — the same look the owner circled. Allowed by the brief (neutral state, listed under FOR FOREMAN C), but the owner will see it again until the 5 pictures are drawn or a plainer neutral plate is made (KIT_REQUESTS).
2. EVENTS.json / FIGURES-kids.json candidates were rebuilt by script, not game-scanned for event pictures; owner should look at event cards.
3. Handover branch still tracks stale img/*.json (worker's "NOT DONE" item) — needs main.
## Cleanup
wipe review shots: python3 dev/site/cdn_sync.py --wipe-review act-pic-match (run by reviewer after PASS).
