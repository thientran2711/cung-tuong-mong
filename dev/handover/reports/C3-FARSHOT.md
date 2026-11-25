# C3-FARSHOT report (worker, child of Foreman C ROOT 3)
START_CTX: ~1% of window (get_session used_tokens=0; own estimate ~1%). Rollover at ~26%, ceiling 60%.
PRIORITY #1 CHECK ('far shot|far-shot|chụp xa'): OD 4 (24/11 ~07:35Z option B, ~08:00Z GO) | ledger 0 | claims 6 | main 0 (list source = origin/main dev/art/manifests/ACTS.json + EVENTS.json) | review/* kp23-redraw has D1-KP23SWEEP (old 79 judged OK; its FAR 15 are NEW redraws, DROPPED) | archive 0.

## Step 1 — 0-credit LIST (done)
Scope: every LIVE act/event picture = 184 act keys (ACTS.json) + 9 act-cat fallbacks + 90 event files (EVENTS.json) = 283 pictures, all downloaded from CDN, 12 contact sheets, all looked at by me.
Result: the 184 act pictures are overwhelmingly hand/object close shots (OK). Far/tiny-people problems sit mostly in event pictures; original prompts said "People only tiny in the distance" (dev/figwork/events/prompt.py TAIL) — that is the cause.

### Tier 1 — FAR, people are the subject but small/distant → REDRAW (14)
| key | why |
|---|---|
| ev-canh-phong | wide night courtyard, man+maid small, from far |
| ev-cung-nhan | small servant back figure in wide yard |
| ev-cung-nu-2 | washing yard, only tiny people far in background |
| ev-fest-dongchi | wide landscape, small cook figure far |
| ev-fest-lapbat | wide landscape, small cook figure far |
| ev-fest-nguyentieu | wide, small lone woman far |
| ev-fest-vulan | wide, three small kneeling women far |
| ev-fest-phoenix | archery field, tiny people |
| ev-fest-vantho | huge hall, rows of tiny figures |
| ev-hoang-de-vui | Emperor + attendant small on bridge, far |
| ev-thang-tran | general + army tiny, wide gate |
| ev-trieu-chinh | rows of tiny officials in vast hall |
| ev-yen-tiec | banquet hall, tiny figures in background |
| act-thi-tai-nu | many tiny maidens in distant hall (foreground back figure ok) |

### Tier 2 — scenic wide shots, only incidental tiny people (11) — recommend KEEP unless Foreman C says redraw
ev-bien-ai, ev-di-san, ev-dich-benh, ev-hoa-hoan, ev-hoa-than, ev-su-than, ev-fest-thanhminh, ev-fest-thanhtho, ev-fest-trungcuu, ev-chuyen-la, ev-duoc-mua.

### Judged OK (people medium/large from behind, or no people): all other 258.
Borderline-OK (medium, backs): ev-hao-huu, ev-vi-hanh, ev-han-han, ev-thinh-an, ev-tuyen-tu, ev-hh-viec-2, ev-mat-bao, act-sang-duc-tho-thinh-an, act-hoi-han-ai-can-giup.

### Side finding (NOT far shots, outside this brief): VISIBLE FACES in close/medium acts: act-nhin-loi-mia, act-tha-loi, act-xi-xao-xa-xi, act-xem-so-nguyet-su, act-lam-tho-v2, act-thi-tham. Old-style rule is no visible faces → Foreman C decides if these join (would need back/close redraw).

## Step 2 — pilot (pending): ev-thang-tran, ev-trieu-chinh, ev-fest-vantho; old prompt with TAIL replaced by close-shot tail; same gpt-2-6 3:4 1k, style ref cplQijT0eP, folder ba4aecfe.
Cost basis (PROGRESS_event): 40 credits/picture 1k → tier 1 = 14 × 40 = 560 credits (+ retries ~30% ≈ 730); tier 2 adds 440.

## Step 2 — PILOT RESULT (3 pictures, looked at old-vs-new sheet, no faces, no hands visible, people large)
Prompt = old ev_data scene rewritten as CLOSE shot + HEAD/BR from prompt.py + new tail: "People are LARGE and close in the frame, seen from behind or turned away, no visible faces, any visible hands correct with five fingers or hidden in sleeves, only the Emperor wears yellow." gpt-2-6, 3:4, 1k, style ref cplQijT0eP, folder ba4aecfe.
| key | Magnific creation | credits | verdict |
|---|---|---|---|
| ev-thang-tran | LwtVBN0swO | 80 | PASS (general large from behind, no face) |
| ev-trieu-chinh | 1lBWp4tr4r | 80 | PASS (3 kneeling officials large, backs) |
| ev-yen-tiec | xS80diEjfW | 80 | PASS (two ladies from behind; tiny Emperor in yellow at the back, correct) |
Spent 240 credits. NOTE: simulate_cost says 80 credits per 1k picture NOW (PROGRESS_event said 40) → batch estimate: 11 remaining tier-1 × 80 = 880 (+~30% retries ≈ 1,150). Tier 2 (11) would add 880.
Review: https://ctm-img.victoria-tntt.workers.dev/img/_review/c3-farshot/ev-thang-tran.webp?v=1 (also ev-trieu-chinh, ev-yen-tiec). Files ~250–290 KB at q82 → final upload recompressed ≤250 KB. Live swap NOT done (waits Foreman C GO).

## Step 3 — BATCH (Foreman C GO 25/11 ~22:23Z: 11 tier-1 + 6 face acts; tier 2 KEEP)
All 17 + pilot 3 = 20 pictures drawn, each looked at on old|new sheets (and hands cropped for tha-loi, thi-tham): no visible faces, people large, hands hidden or plausible, no dragon motif except the Emperor (hoang-de-vui), only the Emperor in yellow. gpt-2-6 3:4 1k, ref cplQijT0eP, folder ba4aecfe, 80 cr each, no rejects/retries.
| key | creation | verdict |
|---|---|---|
| ev-cung-nu-2 | ov3wiaq829 | PASS |
| ev-cung-nhan | mEAy2F7hJQ | PASS |
| ev-fest-dongchi | huGPAq8vqL | PASS |
| ev-fest-lapbat | TdJr7tvVNR | PASS |
| ev-fest-nguyentieu | u503cLuQLD | PASS |
| ev-fest-vulan | Syaev2SUb8 | PASS |
| ev-fest-phoenix | ov3wiJi829 | PASS |
| ev-fest-vantho | bxpGDc45Y2 | PASS (Emperor tiny yellow on throne, ok) |
| ev-hoang-de-vui | 1lBWXD1r4r | PASS |
| ev-canh-phong | ksXYdeT16B | PASS |
| act-thi-tai-nu | LwtVItBswO | PASS |
| act-nhin-loi-mia | 9ZbhbEANYZ | PASS (backs, fan) |
| act-tha-loi | p84s47Wehw | PASS (clasped hands, fingers plausible; weakest, re-roll if Foreman C dislikes) |
| act-xi-xao-xa-xi | VXOxO7CMMU | PASS |
| act-xem-so-nguyet-su | BhiUiiboQR | PASS |
| act-lam-tho-v2 | N25v5kT6D9 | PASS |
| act-thi-tham | nVgbg7kYQD | PASS (fans hide faces) |
Pilot: ev-thang-tran LwtVBN0swO, ev-trieu-chinh 1lBWp4tr4r, ev-yen-tiec xS80diEjfW.
Credits: 20 × 80 = 1,600 total (pilot 240 + batch 1,360).
Review folder (all 20, ≤250 KB webp, same names as live keys): https://ctm-img.victoria-tntt.workers.dev/img/_review/c3-farshot/<key>.webp?v=2
NOTE: act-lam-tho-v2 etc. keep live key names → swap = overwrite img/<key>.webp after backing old to img/_backup/ (waiting Foreman C GO).

## Step 4 — LIVE SWAP + checks (Foreman C GO 25/11 ~22:28Z)
- Backup of the 20 OLD live pictures (verified byte-equal to live before overwrite): CDN img/_backup/c3-farshot/<key>.webp.
- Overwrote the 20 live img/<key>.webp on the CDN via cdn_sync (md5 verified live == new); img/_index.json rebuilt by cdn_sync (hash list for SW precache updates by itself). No ACTS.json/EVENTS.json change needed (same keys).
- CODE CHANGE needed: KIT_PIC_SUBJ subject boxes (dev/build/jksize.js, + built index.html) were drawn for the old tiny figures → updated 13 ev-* boxes (acts have no box) to the new large subjects. Test kit-size7-focus.js: 331 pictures, 329 boxes, bad 0 (2 missing act-cat-bong-de-dang / act-cat-giu-con-tin are PRE-EXISTING, not mine).
- In-game check on the built game (real kit frame kszFrame3, notice kind, S + XL) at Fold 755x1000 and iPad 1180x820 for ev-hoang-de-vui, ev-fest-phoenix, ev-cung-nu-2: subject fills the crop, no faces, no cut-off figure. PASS.
LAND READY review/c3-farshot 49d7de45 (2 files: dev/build/jksize.js, index.html; CDN pictures already live)
Rollback: copy img/_backup/c3-farshot/<key>.webp back over img/<key>.webp via cdn_sync + revert the commit.
Total credits 1,600.

## VIDEOS (C3-VIDEO worker, 25/11 ~23:05Z; MAIN 147 order, Fold + iPad FULL videos for the landing pack)
PRIORITY #1 CHECK ('far shot|far-shot|chụp xa'): OD 4 | ledger 0 | claims 6 | main 0 | review/* 0 | archive 0.
Built review/c3-farshot @ 49d7de45 (bash dev/site/build_site.sh, file:// index.html), real new game, real kit frame kszFrame3 (kitFrameApply3, same harness as the reviewer's kit-size7-pics.js) on a plain paper stage; pictures loaded from the live CDN. 7 pictures: ev-hoang-de-vui, ev-fest-phoenix, ev-cung-nu-2, ev-trieu-chinh, ev-yen-tiec, act-thi-tham, act-lam-tho-v2; each shown in notice S, notice XL, news S, news XL (28 frames, ~1.8 s each, caption above the frame). Page errors 0 on both devices.
LOOKED (contact sheets of all stills, both devices): every picture fills its frame (cover, no pad), subject large and inside the crop, no visible faces, people from behind/turned, only the Emperor in yellow (hoang-de-vui). Nothing cut off in news XL tall crops. PASS.
Caveat: frames are opened through the kit frame harness, not through a played-out event modal; mp4 "2x" = lanczos upscale of the 1x recording (recording is 1x CSS px).
URLs (base https://ctm-img.victoria-tntt.workers.dev/img/_review/c3-farshot-video/ , all HTTP 200):
- c3-farshot-fold-755x1000.mp4 (2.1 MB) · c3-farshot-fold-755x1000-2x.mp4 (6.0 MB)
- c3-farshot-ipad-1180x820.mp4 (3.3 MB) · c3-farshot-ipad-1180x820-2x.mp4 (9.2 MB)
- stills (webp): still-<fold-755x1000|ipad-1180x820>-<ev-hoang-de-vui-noticeXL|ev-fest-phoenix-noticeXL|ev-cung-nu-2-noticeXL|ev-trieu-chinh-newsXL|act-thi-tham-newsXL|act-lam-tho-v2-noticeXL>.webp
Wipe when the landing pack is done: python3 dev/site/cdn_sync.py --wipe-review c3-farshot-video
