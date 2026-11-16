# PROGRESS review/tuduc-mg (C41) — Tứ đức mini-games

Owner: "Mini game học tứ đức đâu? Không thấy." Spec: OWNER_DECISIONS 15/11 (session 8) "Tứ đức has no minigames".

## Done
- `dev/build/jtd.js` (new, loaded after j85): four engines in the shared j82 frame (KIT 13.2): Công Thêu theo nét, Dung Đi đứng giữ bát, Ngôn Ứng đối, Hạnh Làm phúc. j82/j91 untouched (no conflict with review/mg-easy).
- `lessonVir` (j85) replaced by `tdPlay`: intro with 3 numbered rules -> game -> result -> progress. Cost (2 khắc, Sức / bạc) is paid only when the result is accepted; "Thôi, để lúc khác" costs nothing. Bots (`window.__bot`) skip the game (raw 5).
- Progress: self +1 (+2 if raw >= 9), teacher +2 (+3 if raw >= 7); "Để trời định" = 5/10 = same as before on average. Công raw feeds handmade quality (+0..2).
- Act card text in `jtabs.js`: "chơi một trò nhỏ · tiến bộ +1..2 / +2..3".
- Test: `dev/test/tuduc-mg.js`.

## Choices / deviations
- Hạnh: only the "Làm phúc" (share alms) variant; "Chép kinh" brush-stroke variant not built (spec said "or").
- Công "steady speed" dropped (easy rules); accuracy + colour only.

## PENDING (art / other branches)
- Boards reuse existing study-room paintings (theu/mua/tho/ve -bg-hoc) and sprites (kim-needle, mua-mat, banh-pot). Dedicated Magnific gpt-2-6 backgrounds mg-td{cong,dung,ngon,hanh}-bg-hoc not generated (none in this branch; no CDN upload needed).
- Owner rule "LEFT picture of what she does, RIGHT info" for the mini-game frame (intro/play/result) is a frame-level change (C34 contest-ui, kitGameFrame). Not done here to avoid a private layout; needs a kit part.
- "Tự rèn" button label still pending the act-text branch ("Tự học").


## Engine table
See header comment of dev/build/jtd.js (course / game / control / score / level effect for Công, Dung, Ngôn, Hạnh). Test: `node dev/test/tuduc-mg.js <root> <WxH@dpr> <outdir> [cong,dung,ngon,hanh] [quick|none]`.

## Easy-rules layer (added, same pattern as review/mg-easy)
`tdWrap` in jtd.js around every engine: "Gợi ý" button (kit `kg82Btn`), shows the kit `.ksel` outline on the right target (peek) + a kit row line; quiet auto-hint after 6.5 s (level 0-1) / 10.5 s (2-3) idle, none at 4+ (button only); each hint costs 0.7 (auto 0.3) of the 10 points, max 2. First-time example card (`S.mgSeen["td_"+k]`, `KG82.noDemo` skips), later intros show the one-line rule.
## KIT REQUEST
- Hint marker for canvas games: currently a `.ksel` ring div (kit outline) positioned over the target; a kit-owned "hint ring" part would be cleaner.
- Owner rule "LEFT picture / RIGHT info" for the mini-game frame: frame-level, not done.

## Tests (16/11, shared box load avg ~35-40, timings unreliable)
`node dev/test/tuduc-mg.js . 1000x755@1 <out> <kind> quick`: cong, dung, ngon, hanh all PASS (result reached, progress applied, no overflow/ellipsis/"%", no page errors). Also ran dung 1180x820, hanh 844x390, ngon 755x1000: result reached. The result button `#kg82ok` is hidden by the kit (kitOvSync -> kit ✕); the test now waits for `.kit-x[data-kitx=ov]` and clicks the button via script.
Dung raw 0 (fixed 16/11): not load alone. (1) the shared j82 guard `setTimeout(end(0),97500)` fired because the Dung clock was dt-clamped to 0.05 s/frame, so at ~4 fps a 20 s game needed >97 s real time; now the clock is real-time (frame up to 0.6 s run as substeps <=34 ms). (2) a tap shorter than one frame was lost; a press now counts for at least one frame. (3) the test bot had a closure bug (pointerup used a later pointerId, stale pointers); test also reset `used` (khắc) and KG82.over per case. (4) HUD score could show 11/10 on perfect play: capped. Sim: human with 0.3 s reaction scores 8-9/10 on level 0 (easy). Dung rule 3 now says "mũi tên xanh" (was "cây kim chỉ", read like the sewing needle). Test fails if bot raw < 3.
Viewports (quick, self mode, bot): 755x1000@2, 1180x820@2, 1366x1024, 844x390, 390x844@2 (rotate prompt is a non-blocking tip, games play): all four games PASS, no overflow/ellipsis/%, no page errors.
Contest frame picture: origin/main has no kitGameFrame({pic}); it exists only in review/contest-ui(-r1/-r2), not main. Not wired here; once it lands: pass TD_BG painting as `pic` in kg82 frame call (j82 line 120).

## C41b review/tuduc-pic
tdPlay kg82Open now passes pic:kg82Pic(kind) (kind's TD_BG study-room painting via kg82BgName override); frame reused for play/result. Call-site only. Tested 755x1000@2, 1180x820@2, 844x390, 390x844: 8/8 pass, no page errors; picture left (wide) / top band (phone).
