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
