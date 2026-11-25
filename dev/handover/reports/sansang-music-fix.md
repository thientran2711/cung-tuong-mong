# SANSANG-MUSIC-FIX — report (worker for MAIN 132, 25/11)

PRIORITY #1 CHECK ('kfoc-intro|sẵn sàng|mg-intro|Sẵn sàng'): OD 12 | ledger 1 | claims 8 | main 15 | review/* 7 — reused: KK25 review/kit-mg-intro-r2 25ca281d (its single-declaration idea; its chosen value 3 is wrong, see below), kit test dev/test/kit-mg-intro.js (boot + OPEN prelude reused in the new test). Music: no open branch touches j11 music recovery (git grep 'auWatch|mFail|AU.cur.dead' origin/main + review/*: 0).

Branch: `review/sansang-music-fix` c70cfd17 (one commit on LIVE 49f17d4d, fast-forward). Tier: SMALL (2 source lines-blocks in j11 + one CSS value in the kit; + test).

## STEP 0 — reproduce / regression?
| build | «Sẵn sàng» real tap (Fold 755x1000 / iPad 1180x820) | music after track error / missed hand-off / stall |
|---|---|---|
| 4232709a | covered (same CSS: z 5 then 3, play z 4) | same code (no recovery) |
| 7dbfe98a | covered (same CSS) | same code |
| 49f17d4d LIVE | **FAIL / FAIL** — top element at button centre = `.kfoc-play` | **FAIL** all 7 cases |
| c70cfd17 | **ok / ok** | **ok** all 7 cases |

NOT a day-queue-2 (49f17d4d) regression: the cover exists since e716092a (kit-mg-intro, F.intro). No rollback asked.

## BUG 1 — «Sẵn sàng / bắt đầu chơi» does not respond (OD 25/11 ~04:06Z)
Root cause: `.kfoc-intro` declared `z-index:5` and later `z-index:3` in the same rule (3 wins). The rules card is a sibling of the
transparent play layer `.kfoc-play` (`z-index:4`) in the same kitFocus host, so the play layer lay over the whole card: the owner
saw the card, but every tap went to `.kfoc-play`. Earlier tests passed because they called `go.click()` from JS (no hit-testing).
Fix (kit part, jfocus.js only): `z-index:5` declared once — above the play layer (4), under the skip button (6) and the back/x (8).
KK25 25ca281d removed the 5 and KEPT the 3 → still covered: do NOT land KK25; this branch supersedes it (its source scan
"z-index once" still passes on this branch).
Whole family: `F.intro` has exactly ONE caller, jdfv `dfTap`, which runs every on-figure game (swipe/tug/bow/drag/ear/words/stare)
from every host (stage person, visitor scene, NPC encounter) — one kit fix covers all. The test also hit-scans every visible
`.kgr-go` («Sẵn sàng») on screen.

## BUG 2 — music stops and never comes back (OD 25/11 ~04:10Z)
Root cause (j11 audio): tracks are non-looping and hand off on `timeupdate` in the last 1.6 s. (a) A track that errors (network drop,
cache miss mid-stream — she was on the way to a flight) got `a.dead=1` but stayed `AU.cur`, and `setMusic(n)` returned early for the same
name forever → silence until reload. (b) A track that ran out without the hand-off (timeupdate missed while a mini-game held the main
thread) waited for the next `render()` → `auTick()`; the focus view / mini-games render nothing for minutes. (c) A stalled stream or a
suspended AudioContext (music is routed through it) had no recovery outside a render.
Fix (j11 only): `ended` / `error` listeners on each track replace it; `setMusic` replaces a dead current track; `auWatch()` every 2.5 s
(only when sound is on and the page visible): restarts a dead/ended track, plays a paused one, replaces a track whose clock stood still
for 3 checks, resumes a suspended/interrupted context. Repeated failures back off 2 s → 4 s → … 30 s (offline with no cached music never
spins). Hidden tab still pauses (unchanged) and comes back on visible.
Family of pause/resume paths checked: setMusic fade-out, hand-off, heartLoop, sfx ducking (jsfx/j36 restore duck=1 by timer — fine),
visibilitychange, pageshow, gesture unlock. No code outside j11 pauses AU.cur.

## Tests
- NEW dev/test/sansang-music-fix.js `<url> <out> [WxH,..]` — A: elementFromPoint at «Sẵn sàng» centre is the button + a real
  touchscreen tap starts the game + scan of every visible .kgr-go; B: music plays at start, after a track error, after a missed hand-off,
  after an outside pause, after a stalled stream, paused when hidden, back when visible, after a track ran out inside a mini-game.
  LIVE 49f17d4d: FAIL Fold + iPad. Branch: ok Fold + iPad.
- kit-mg-intro.js: ok 755x1000 + 1180x820 (its z-index-once source scan passes).
- quickcheck / coop-e2e / dayq-hold: see "Results" below.

## Shots (CDN, looked at)
img/_review/sansang-fix/before-755x1000.webp, before-1180x820.webp (LIVE: card visible, tap dead) · after-755x1000.webp,
after-1180x820.webp (card on top, tap starts the game). Wipe after verdict: `python3 dev/site/cdn_sync.py --wipe-review sansang-fix`.

## Notes
- Test noise only (not game bugs): the test boot can leave the new-game origin roulette (#kroul) or a «Tin trong cung» card / night-end
  pictures (#dawn) up; the test hides those before measuring.
- Rules-card wording shows «mất phần» while DF_RULE says «mất điểm» — a VANPHONG filter rewrites it; untouched.

## Results
All on c70cfd17 (built tree; utf-8 static server):
- sansang-music-fix.js: ok 755x1000 + 1180x820 (LIVE 49f17d4d: FAIL both — `.kfoc-play` on top; music not back in all 7 cases)
- kit-mg-intro.js: ok both sizes
- quickcheck: PASS (238 s, old save ok, core gates PASS; perf new/live render 291/290 ms, buổi 1655/2678 ms)
- coop-e2e: 142/142 (Fold hosts) + 142/142 (COOP_SWAP=1, iPad hosts)
- dayq-hold: PASS 46 cases (Fold + iPad)
Tester note: dev/index.html has no <meta charset>; a plain `python3 -m http.server` serves it without charset → "Invalid or unexpected token"
and dayq-hold times out at boot. Serve with `text/html; charset=utf-8` (or the root index.html).

## Handover
c70cfd17 was GO to LC13 (MAIN 132, 04:50Z). Drop KK25 (review/kit-mg-intro-r2). Second branch below.

# Branch 2 — review/sansang-music-fix-2 (owner OD 25/11 ~04:14Z / ~04:15Z, shot refs/owner-2511-makeup/l1-loidan-dahieu-chet.jpg)
Base: LIVE 4da55ce8 + merge of c70cfd17 (e61317a7, index/sw rebuilt) + 310bad2e + 63858d80 + e00c6a8f.

## (A) LỜI DẶN «Đã hiểu» and ✕ dead → no way to close the frame
Root cause: kit kitPersonDlg (jpdlg.js). The text column `.kpdlg .kpdr` is `position:relative;z-index:1` and reaches down to the
dialog bottom (padding-bottom = button-row height), while the button row `.kpdlg>.kpopts` is absolutely placed at the bottom with
z auto → the text column lies over every button. Real-tap elementFromPoint at «Đã hiểu» = `.kpdr` on LIVE 49f17d4d (Fold + iPad);
the same CSS is in every LIVE back to 502c48c9 (not a recent regression; she meets the frames now because day-queue shows them).
kitPersonDlg has two callers = the whole family: kitTip («Đã hiểu») and kitCoach («Bỏ qua lời dặn», «Tiếp», «Nghe ma ma dặn»…).
Her ✕ (top right of the stage) is the kitFocus ✕: it closed the focus and left the tip up.
Fix: `.kpdlg>.kpopts{z-index:2}` (kit); kitFocus `close()` also calls `kitTipOff()` (a frame is always closable).

## Whole-family scan (law 11) — dev/test/frame-tap-scan.js, Fold 755x1000 + iPad 1180x820
Opens every kit frame kind, hit-tests every visible button (elementFromPoint at its centre is inside it), closes with a REAL touch tap.
| frame | LIVE 49f17d4d (before) | e00c6a8f (after) |
|---|---|---|
| kitTip «Đã hiểu» | covered by .kpdr, STUCK | ok, closes |
| kitCoach buttons | covered by .kpdr, STUCK | ok, closes |
| kitFocus (acts, group tabs, ✕) real dfOpen | ok | ok |
| kitFocus rules card of a real act («Sẵn sàng», «Bỏ qua», ◂) | «Sẵn sàng» covered by .kfoc-play, STUCK | ok, starts |
| kitTip over kitFocus + focus ✕ | tip covered; ✕ leaves the tip up | ok; ✕ closes both |
| j82 kgReady rules screen (openMG ky) | ok | ok, «Sẵn sàng» starts |
| kitPodium «Tiếp» | iPad: covered by the 1st-place medal IMG, STUCK | ok, closes (j90 `.kpod-ft` z 6) |
| kitGain scene / #modal event card | harness cannot always raise them (day queue); their real render is in dayq-hold A3/S4 | same |
(Before column: kitPersonDlg rows + rules card from person-frame-tap.js / sansang-music-fix.js on 49f17d4d; full old scan log below.)

## (B) «tiếng tèo» on every button
Root cause: `audio/sfx-tap.mp3` (every button: j11 document click → feedback("tap"); kitTip/kitCoach) was a FALLING two-tone blip
(dominant 1281 Hz → 769 Hz in 78 ms = the falling contour of a failure sound; sfx-fail falls 985 → 298 Hz). The file is unchanged since
502c48c9; since sfx-instant 345eb929 the tap is pre-decoded and plays on EVERY tap without drops, so she now hears it every time.
Fix: replaced in place (all callers keep working) by a soft single-pitch wood tick: 1065 Hz steady, 75 ms, peak 0.81 (= old), rms .146
(old .185). Family check: UI layer files — sfx-page (noise sweep), sfx-open (low thump), sfx-notice (steady 4.1 kHz), sfx-item-pop (steady
830 Hz) are not falling; sfx-close falls slightly (1519 → 1374 Hz, then noise) — left (plays on close only). Miss / fail sounds play
only on real misses (jsfx kg82Pluck miss, kg82Pop red / miss words, result-once) — no default-fail wiring found.

## Music watchdog follow-up
e00c6a8f: a stall is counted only once the track has data (readyState ≥ 2); a track that never gets data is replaced after ~20 s
(under load a fresh track was being restarted every 7.5 s — seen once in sansang-music-fix at Fold).

## hoa-dien
dev/test/hoa-dien.js (real drags, Điểm trang) on 310bad2e at 755x1000@1: ALL OK (served with charset utf-8). The >17 min hang LC13 saw is
most likely the charset-less static server (dev/index.html has no <meta charset>), not the dead-tap family.

## Shots (CDN, looked at)
img/_review/sansang-fix/loidan-before-755x1000.webp, loidan-after-755x1000.webp, loidan-after-1180x820.webp (tip over the focus,
«Đã hiểu» takes the tap).

## Results (e00c6a8f)
Gates on e00c6a8f (game code; a6b4d573 adds test-only changes): quickcheck PASS (268 s, old save ok, core gates PASS) · coop-e2e 142/142
Fold-hosts + 142/142 COOP_SWAP=1 · dayq-hold PASS 46 · sansang-music-fix ok Fold+iPad · person-frame-tap ok Fold+iPad ·
frame-tap-scan ok 3/3 runs on a6b4d573 · hoa-dien ALL OK (310bad2e). LAND tier SMALL (CSS z-index ×2 in kit, one JS line in kitFocus
close, j11 watchdog guard, one sfx file); on top of LIVE 4da55ce8 (merge e61317a7 carries c70cfd17 if LC13 has not landed it yet).

## Full real-tap scan table (dev/test/frame-tap-scan.js on a6b4d573) — for Foreman F's whole-game button crawler to reuse
Every row = REAL touch tap (CDP touchscreen) + the expected effect checked; "a/b" rows = elementFromPoint hit test of every visible button.
Before (LIVE 49f17d4d, same harness minus effect rows): kitCoach / kitTip covered by .kpdr → STUCK, and the stuck coach then covered
EVERY later frame (focus acts 0/9, rules card 0/3, podium) — exactly her "không có cách nào tắt" + every button dead.
| size | frame | buttons hit ok / closed | covered by |
| 755x1000 | kitTip | 2/2 |  |
| 755x1000 | kitTip real-tap close | closed | #ktip[data-scan] [data-ktut=tip] |
| 755x1000 | kitCoach | 3/3 |  |
| 755x1000 | kitCoach «Bỏ qua lời dặn» → skip | right effect | .ktut-card [data-ktut=skip] |
| 755x1000 | kitCoach real-tap close | closed | .ktut-card [data-ktut=next] |
| 755x1000 | kitFocus (acts, tabs, ✕) | 9/9 |  |
| 755x1000 | kitFocus group tab → that group | right effect | .kfoc-tabs .pct[data-k="g1"] |
| 755x1000 | kitFocus group tab back | right effect | .kfoc-tabs .pct[data-k="g0"] |
| 755x1000 | act | intro Trò chuyện với cung  |  |
| 755x1000 | kitFocus rules card («Sẵn sàng», «Bỏ qua», ◂) | 3/3 |  |
| 755x1000 | rules card ◂ → back to the acts, nothing played | right effect | .kfoc-back |
| 755x1000 | rules card «Sẵn sàng» → the game starts | right effect | .kfoc-introgo |
| 755x1000 | «Bỏ qua · kết quả thường» during the game → quick result, game closed | right effect | .kfoc-skipw .kfoc-skip |
| 755x1000 | kitTip over kitFocus | 2/2 |  |
| 755x1000 | kitFocus ✕ (with a tip on top) real-tap close | closed | .kfoc-x |
| 755x1000 | kgReady rules screen (openMG ky) | 3/3 |  |
| 755x1000 | kgReady «Sẵn sàng» starts real-tap close | closed | .kgame .kgr-go, .kgame #kg82go, .kgame [class*=kgr] button |
| 755x1000 | kitGain scene (.kmov) | absent |  |
| 755x1000 | kitPodium | 1/1 |  |
| 755x1000 | kitPodium real-tap close | closed | #kpodov .kpod-next |
| 755x1000 | #modal event card | none queued |  |
| 1180x820 | kitTip | 2/2 |  |
| 1180x820 | kitTip real-tap close | closed | #ktip[data-scan] [data-ktut=tip] |
| 1180x820 | kitCoach | 3/3 |  |
| 1180x820 | kitCoach «Bỏ qua lời dặn» → skip | right effect | .ktut-card [data-ktut=skip] |
| 1180x820 | kitCoach real-tap close | closed | .ktut-card [data-ktut=next] |
| 1180x820 | kitFocus (acts, tabs, ✕) | 9/9 |  |
| 1180x820 | kitFocus group tab → that group | right effect | .kfoc-tabs .pct[data-k="g1"] |
| 1180x820 | kitFocus group tab back | right effect | .kfoc-tabs .pct[data-k="g0"] |
| 1180x820 | act | intro Trò chuyện với cung  |  |
| 1180x820 | kitFocus rules card («Sẵn sàng», «Bỏ qua», ◂) | 3/3 |  |
| 1180x820 | rules card ◂ → back to the acts, nothing played | right effect | .kfoc-back |
| 1180x820 | rules card «Sẵn sàng» → the game starts | right effect | .kfoc-introgo |
| 1180x820 | «Bỏ qua · kết quả thường» during the game → quick result, game closed | right effect | .kfoc-skipw .kfoc-skip |
| 1180x820 | kitTip over kitFocus | 2/2 |  |
| 1180x820 | kitFocus ✕ (with a tip on top) real-tap close | closed | .kfoc-x |
| 1180x820 | kgReady rules screen (openMG ky) | 3/3 |  |
| 1180x820 | kgReady «Sẵn sàng» starts real-tap close | closed | .kgame .kgr-go, .kgame #kg82go, .kgame [class*=kgr] button |
| 1180x820 | kitGain scene (.kmov) | absent |  |
| 1180x820 | kitPodium | 1/1 |  |
| 1180x820 | kitPodium real-tap close | closed | #kpodov .kpod-next |
| 1180x820 | #modal event card | none queued |  |

## Handover
Nothing left. Lander: review/sansang-music-fix-2 a6b4d573 onto LIVE (rebuild index.html/sw.js on merge). Drop KK25.
Reusable for F: dev/test/frame-tap-scan.js (tapDo/tapClose/scan helpers: real tap + effect + hit test), person-frame-tap.js,
sansang-music-fix.js. Serve dev/index.html with charset utf-8.
