# act-pics-d14 report (W52, art worker, 18/11)

PRIORITY #1 CHECK: OD 0 for the 6 act keys / neutral plate; OD:L712 + L659 for D14 | ledger D14 NOT DONE | main: kit KIT_PH (jph.js), ACTS.json had no keys for the 6 acts | review/* 0. Reused: existing act style (act-lat-the, act-dang-canh viewed first), KIT_PH names and sizes, cdn_sync.

## MAIN orders (verbatim)

- (18/11 act-pic-match worker, via MAIN ROOT-46) ORDER to Foreman C: ACT PICTURES TO DRAW (gpt-2-6, hands/objects only, no faces, 3:4, soft warm pastel). Full table: dev/handover/reports/act-pic-match.md "FOR FOREMAN C: draw". Keys act-<key>.webp: tro-chuyen-cung-nu (Trò chuyện với cung nữ: seated consort's hands round a tea cup, a maid's plain-sleeve hands beside her, lean-in, garden window) · hat-nuoc (Hắt nước, dark: basin tipped, water arcing onto a pink silk hem) · hat-tra (Hắt trà: tea splashing over a brocade sleeve) · quat-muc (Quạt mực, dark: fan flicking ink onto a pale silk robe, inkstone + brush) · nho-thai-giam-tim-thu-nuoi (eunuch's hands with an empty bamboo pet cage + silk leash, consort's hand passing a small purse) · hoi-lo-kinh-su-phong (Hối lộ Kính sự phòng, dark: purse passed to a eunuch's hand behind a rack of jade tablets) · optional: to-xa-xi (Tố xa xỉ) and 9 den-<place> pictures (today all 9 "Đến <place>" share one). PLUS a plainer NEUTRAL PLACEHOLDER plate for the kit: ph-p-light-pl is a dressing-table picture and it is what the owner saw on two different acts (18/11 05:20Z bug); a neutral plate (soft empty paper/brocade, no furniture) for light + dark, all 9 sizes of KIT_PH (dev/build/jph.js) → file as KIT REQUEST. After each lands: add name → key in dev/art/manifests/ACTS.json (git source) and push it with cdn_sync (guarded). Do NOT push img/*.json in bulk (cdn_sync now holds a bulk manifest push; name the file).

- (18/11 07:41Z) ORDER FROM MAIN ROOT-49 (load check; C-AG #11 has 8 free; art side): D14 PAINTED 'HỌC THÀNH TÀI' SCENE (art + small wiring). PRIORITY #1 CHECK ('học thành tài'): OD:L712 verbatim "Art level-up (every art / Công Dung Ngôn Hạnh level): a short "học thành tài" celebration scene (painted, Magnific) that also shows what she gained: items appear (fly to Tư trang), new effects/abilities/recipes shown as info lines." | ledger D14 NOT DONE | main 4 hits (level-up path; reuse) | claims 0. Magnific gpt-2-6, STYLE_ANCHOR, LOOK 3x, _review first → owner picks via C → wire into the existing level-up result (kit result frame), Fold+iPad shots.

## PART 1 — 6 act pictures — READY act-pics-d14 part 1
384x506 webp, gpt-2-6 3:4 (768x1024 source), hands/objects only, no faces; every image looked at, all kept first try (no redo).
| key | URL | gens | credits |
|---|---|---|---|
| act-tro-chuyen-cung-nu | https://ctm-img.victoria-tntt.workers.dev/img/_review/act-pics-d14/act-tro-chuyen-cung-nu.webp | 1 | 80 |
| act-hat-nuoc | https://ctm-img.victoria-tntt.workers.dev/img/_review/act-pics-d14/act-hat-nuoc.webp | 1 | 80 |
| act-hat-tra | https://ctm-img.victoria-tntt.workers.dev/img/_review/act-pics-d14/act-hat-tra.webp | 1 | 80 |
| act-quat-muc | https://ctm-img.victoria-tntt.workers.dev/img/_review/act-pics-d14/act-quat-muc.webp | 1 | 80 |
| act-nho-thai-giam-tim-thu-nuoi | https://ctm-img.victoria-tntt.workers.dev/img/_review/act-pics-d14/act-nho-thai-giam-tim-thu-nuoi.webp | 1 | 80 |
| act-hoi-lo-kinh-su-phong | https://ctm-img.victoria-tntt.workers.dev/img/_review/act-pics-d14/act-hoi-lo-kinh-su-phong.webp | 1 | 80 |

Contact sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/act-pics-d14/sheet-part1.webp
Notes: hoi-lo shows hanzi on the jade tablets (names, decorative); hat-nuoc/quat-muc/hoi-lo are dark tone as ordered. Not drawn (optional): to-xa-xi, 9x den-<place>.
ACTS.json: branch review/act-pics-d14 (commit pushed) maps the 6 card titles to the keys (replaces '-' for Trò chuyện với cung nữ). NOT live: waiting Foreman C look + GO, then guarded cdn_sync of img/ACTS.json only + move the 6 files from _review to img/act-<key>.webp.

## PART 2 — neutral placeholder plate — READY act-pics-d14 part 2
Plain empty cream paper (light) / deep indigo-grey paper (dark), faint texture, no furniture. 3 base gens per shape x light/dark = 6 gens, centre-cropped to each live size, same file names as live: ph-{p,l,s}-{light,dark}-{ps pm pl | ls lm ll | s56 s64 s72} = 18 files at https://ctm-img.victoria-tntt.workers.dev/img/_review/act-pics-d14/ph-*.webp
Contact sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/act-pics-d14/sheet-part2.webp | gens 6 | credits 480. Not made: ph-w-*-ll (1720x400, 10th size).
KIT REQUEST filed in dev/kit/KIT_REQUESTS.md on branch review/act-pics-d14 (kit keeper wires; no kit code touched). Honest note: the faint brocade cloud pattern did not show; plates are near-plain paper - fine for neutral, say if a visible pattern is wanted.

## PART 3 — D14 'học thành tài' SAMPLE backdrops — READY act-pics-d14 part 3 (STOP, owner picks)
768x1024 webp, painted, no people, open centre space for items/info lines. 3 gens, 240 credits.
| sample | scene | URL |
|---|---|---|
| a | study table at golden dawn: calligraphy scroll, guqin, petals | https://ctm-img.victoria-tntt.workers.dev/img/_review/act-pics-d14/d14/hoc-thanh-tai-a-study-dawn.webp |
| b | red-ribboned pavilion terrace at dusk, jade scroll with gold seal, big empty floor centre | https://ctm-img.victoria-tntt.workers.dev/img/_review/act-pics-d14/d14/hoc-thanh-tai-b-pavilion-dusk.webp |
| c | moonlit moon-gate courtyard, tea + poem book, golden light burst | https://ctm-img.victoria-tntt.workers.dev/img/_review/act-pics-d14/d14/hoc-thanh-tai-c-moongate-night.webp |
Contact sheet: https://ctm-img.victoria-tntt.workers.dev/img/_review/act-pics-d14/d14/sheet-part3.webp
Notes: b has a banner 'KIM BẢNG ĐỀ DANH' in hanzi (exam-list theme, fits Học/Ngôn levels only); c has a hanzi plaque + book title. Wiring NOT started; waiting owner pick via Foreman C.

## Totals: 15 gens, 1200 credits. Nothing pushed to main. img/*.json untouched on CDN. ~100% art delivered for this brief / ~0% wired (by design).
