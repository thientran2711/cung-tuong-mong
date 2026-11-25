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
Nothing left for this worker. Lander: FF review/sansang-music-fix c70cfd17 onto LIVE 49f17d4d. Drop KK25 (review/kit-mg-intro-r2).
