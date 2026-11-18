# act-pic-match (worker, owner bug 18/11 05:20Z) — report
PRIORITY #1 CHECK: OD L838/L844/L967/L969 (+18/11 05:20Z) | main dev/build/j79.js kitActKey0, jph.js, jopic.js, tools pic-dupes.js, pic-fallback-scan.js | review/* act-pics2(-r6/-r7), pic-dupes(-r1/-r2), ev-art-fit(-r1) (patch scripts in dev/figwork/acts, reused) | claims none other.

## ROOT CAUSE (found, not a code bug)
The live CDN manifests were overwritten at **17/11 02:41:15–17Z** by ONE stale-checkout `cdn_sync` push (R2 LastModified: ACTS.json 02:41:15.666, EVENTS.json 02:41:16.019,
FIGURES-others 02:41:16.5, FIGURES.json 02:41:16.65, FIGURES-kids + INFO 02:41:17.5). The handover branch git-TRACKS img/ACTS.json, EVENTS.json, INFO.json, FIGURES*.json (stale copies);
any checkout + `cdn_sync` with no args pushes them. Same incident Foreman C s11 diagnosed for FIGURES.json (FOREMAN_C_STATUS "EVIDENCE for main … 03:50Z").
Effect on ACTS.json: 209 acts / 91 keys / NO "log" rules / NO "-h" keys (live before) vs 332 acts / 836 log rules / 144 "-h" redraws (intended). 709 act-*-h pictures sat unused on the CDN.
So most act cards fell back to the kit placeholder (ph-p-light-pl = the dressing-table picture the owner circled) or to a neighbour's picture. NOT Foreman C deleting files: 0 manifest keys point to a missing file.
**EVENTS.json regressed too** (52 categories; the 9 ev-art-fit categories mat-bao, am-muu, bac-tien, canh-phong, hao-huu, nguy-gia, tham-hoi, qua-tang, tin-cung and the act-pics2 festival categories are gone):
event/BÁO/VIỆC pictures wrong = same incident. No EVENTS patch script is in git (only PROGRESS_ev-art-fit.md) → NOT rebuilt here; needs its own task.

## What is on review/act-pic-match (sha 243e6de97)
- dev/art/manifests/ACTS.json = manifest source in git (+ README: edit here, push with cdn_sync; never commit img/*.json). dev/figwork/acts/rebuild_acts.py replays actpics_manifest → picdupes/patch → personcard/tuhoc acts → hpatch → mergepatch (meanings.py) → syspatch → ACTS_actpicmatch_patch.json
  (11 acts: Tát, Mời thái y bắt mạch, Sang Thái y viện xin bắt mạch, Xem (lén) sổ nguyệt sự, Bỏ phấn lạ, Tố xa xỉ, Sai người lấy trộm đồ, Sai cung nữ thân tín lấy đồ, Các lối sách phổ → their own existing -h pictures; "Trò chuyện với cung nữ" → "-").
- j79 kitActKey0: manifest value "-" = this act has NO picture: stop (no prefix/longer-name/log borrow); kit placeholder shows (jph). "Trò chuyện với cung nữ" used to borrow the Emperor tea-chat picture by name prefix.
- GUARD: manifest_guard.py DICT_GUARDED (ACTS.json: acts/prefix/log; EVENTS.json: categories/events/stories) never-shrink vs live + floor, wired into cdn_sync (top-level img/ only); floor for ACTS written (332/10/836);
  quickcheck hook dev/tools/quickcheck.d/70-manifest-guard.sh runs `manifest_guard.py --live-check` (live ACTS must have log + -h keys). **It FAILS until the candidate is pushed live — that is correct.**
- Tools: dev/test/act-pic-audit.py (shared / near-dup dHash / placeholder / loose-match + eyeball sheets + verdicts file), pic-dupes.js (+ "mode"), pic-fallback-scan.js (+ACTS_FILE), act-pic-shots.js (Hành sự shots).
- CANDIDATE manifest (NOT live): https://ctm-img.victoria-tntt.workers.dev/img/_review/act-pic-match/ACTS.json (delete after verdict: `python3 dev/site/cdn_sync.py --wipe-review act-pic-match`).
  To go live: `cp dev/art/manifests/ACTS.json img/ACTS.json && python3 dev/site/cdn_sync.py img/ACTS.json` (main does it).

## Before / after (dev/test/pic-dupes.js, same game states, live manifest vs candidate via ACTS_FILE)
| | before (live) | after (candidate) |
|---|---|---|
| act names resolved | 161 | 161 |
| distinct pictures shown | 53 | 128 |
| act cards on the kit placeholder (no own picture) | 75 | 5 |
| picture files shared by ≥2 act names | 23 (131 names) | 15 (48 names, all same-meaning groups, eyeballed) |
| loose-matched (prefix/log/longer borrow) | – | 13, eyeballed ok (1 unclear) |
| judged mismatched by eye | many (all placeholders/shared) | 1 (Trò chuyện với cung nữ → set to "-") + 1 unclear (Hối lộ Kính sự phòng on the tablets picture) |
Tuần lục (pic-fallback-scan, bot run, not comparable in length): lines with an own act picture 17 % → 42 %. Dialog pictures (EVENTS) unchanged — EVENTS.json regression above.
Owner cases (iPad 1180x820@2 Hành sự list, looked): Điểm trang = mirror/hairpin picture, Nghỉ ngơi một lát = lotus bowl + bolster picture (own pictures), Trò chuyện với cung nữ = kit placeholder.
Shots: Fold 755x1000@2 + iPad 1180x820@2, all tabs, local (workdir) — see SẴN SÀNG KIỂM message; 0 page errors, 0 horizontal overflow.
Remaining shared groups (all same-meaning, ok): Cài tai mắt/Mua chuộc…, Tụng/Chép kinh, Thưởng/Ban thưởng, Xuất gia, Sai đi dò la, Đến thăm/Mời đến, Tặng quà/Biếu, Phạt quỳ/Phạt vô cớ, Thêm/Xem/Đổi người, Học với thầy/Dạy chữ…, Nhờ Thái hậu nói giúp/Xin ban hôn, Xử tội/Chưởng sự tra xét, Đến <9 places> (one "go there" picture), Rút thẻ bài/Tranh sủng/Hối lộ Kính sự phòng.

## FOR FOREMAN C: draw (gpt-2-6, hands/objects only, no faces, 3:4, soft warm pastel; keys = act-<key>.webp)
| key | act text (card title) | the picture must show |
|---|---|---|
| tro-chuyen-cung-nu | Trò chuyện với cung nữ | seated consort's hands round a tea cup, a maid's hands (plain servant sleeves) beside her telling a story: lean-in gesture, small fan/embroidery on the table, garden window |
| hat-nuoc | Hắt nước | hand tipping a small basin: water arcing onto a pink silk hem / slipper on a stone path (night, dark tone) |
| hat-tra | Hắt trà | a hand flicking a tea cup: tea splashing over a folded brocade sleeve / table runner |
| quat-muc | Quạt mực | hand with a fan flicking ink: ink drops spattering across a pale silk robe laid on a table, inkstone + brush (dark tone) |
| nho-thai-giam-tim-thu-nuoi | Nhờ thái giám tìm thú nuôi | a eunuch's hands (dark-blue sleeves) holding an empty bamboo pet cage and a silk leash, a consort's hand passing a small silver purse; garden path |
| hoi-lo-kinh-su-phong | Hối lộ Kính sự phòng | a consort's hand passing a silver purse to a eunuch's hand behind a rack of jade tablets (dark tone) — currently borrows the plain tablets picture (lat-the) |
| (optional) to-xa-xi | Tố xa xỉ | an accusing hand holding a ledger page beside an over-ornate gold hairpin set; currently shows the luxury-court picture xi-xao-xa-xi (unclear fit) |
| (optional) den-<place> x9 | Đến tẩm cung ngươi / Ngự hoa viên / Cần Chính điện / Dưỡng Hòa điện / Đức Thọ cung / Càn Ninh cung / Thái y viện / Kính sự phòng / Lãnh cung | one approach picture per destination (door/threshold of that place); today all 9 share den-noi-lam-viec (same meaning, allowed) |
After each picture lands: add the name → key to dev/art/manifests/ACTS.json in git and push the manifest (guarded). Also note: the kit act placeholder ph-p-light-pl IS a dressing-table picture — fine as a neutral state, but it is what the owner saw twice; Foreman C may want a plainer neutral plate (KIT_REQUESTS).

## Left / for main
1. Push the candidate live (cdn_sync) → the 70-manifest-guard quickcheck hook then passes. 2. EVENTS.json rebuild (own task, see above). 3. `git rm` img/*.json on the handover branch + .gitignore it (stale copies = the cause). 4. FIGURES* were already handled by fig-rank-match.
