# face-reveal-anim — report (worker session_01UV1SzhsSz6PFC4gMQLuobw)
PRIORITY #1 CHECK ('reveal' / 'lộ mặt'): OD 28 hits (none for an in-place face reveal MOTION; L1788 = the learning logic, already in main j61 `k61Shown`) | main j61.js:186 (logic), j21.js:63, jgreet.js; no motion | review/* `face-reveal`, `face-reveal-r1` = the logic (merged), nothing animated | claims none.

**SHA: 8f5ea90 on origin/review/face-reveal-anim** (from main a95e8d4; site rebuilt: index.html + sw.js).

## What
KIT §79 `kitReveal` (`dev/build/jreveal.js`, last module; `BAL.faceReveal` in jbal2.js: ms = 1000 x BAL.pace, lite 350, win 8000). When she first sees a face, the real picture appears IN PLACE: the grey silhouette stays on top and a soft hole opens from the face outward (mask radial clear + fade), ease-out; never an instant swap, never blocks taps. Gọn / reduced motion / Cảnh động off = 350 ms fade of the grey.
- ONE part for every place a person's picture is drawn: tall frame (pcPort), small avatar (mdH), room-stage figure (#tokens .tok.fig), event-stage figure (kitStageFig, also week book). The four outer wrappers only MARK (`data-krv/krvs/krvk/krvsil`); nothing else edited.
- Triggers: `k61Know` / `k61Meet` (greet, arrival, scouting, servants' reports, event dialogs: every way a face is learned) and "a place drawn grey is now drawn with the face". Once per kind per flip, in whichever place draws it first (window 8 s). Save load, known people, own household: nothing plays. Co-op: local only, nothing sent.
- Robust: ghost waits for the real picture to load, follows its box each frame (stage figures are sized on load), removed on animationend/timer, `animation !important` (jk2b has `animation:none!important` on small avatars).

## Tests
- `node dev/test/face-reveal.js <url>` PASS (grey before; each of frame/2 avatars/event figure plays one veil; removed; second look plays nothing; Gọn = krvlite; known person nothing; 0 page errors).
- `node dev/test/face-reveal-stage.js <url> W H scale [dir]` real dialog "Có người đến" + real stage greeting at Cần Ninh cung: veils on stage tokens + dialog frame, removed, 0 errors.
- Existing: greet-stranger.js PASS, face-reveal-look.js unchanged, media-check OK, img-allowlist OK.
- Tools: `face-reveal-rec.js` (webm + burst screenshots; `slow` = ms 3600 to sample), `face-reveal-burst.py` (contact sheet).

## Shots (LOOK done; CDN https://ctm-img.victoria-tntt.workers.dev/img/_review/face-reveal-anim/ — wipe after verdict)
fold-real.webm, ipad-real.webm (real speed, 755x1000@2 / 1180x820@2); fold|ipad-stage-slow.png, fold|ipad-dialog-slow.png (slowed x2 contact sheets, timestamps in ms), fold|ipad-stage-real.png, fold|ipad-dialog-real.png.
Seen: stage = grey silhouette → real figure clears from the head downward in place; dialog "Có người đến" = grey bust in the frame clears to the real portrait.

## Notes for reviewer
- A one-frame EMPTY stage appears when the greeting re-renders the tokens (before my veil; the pictures are re-drawn by the game's own render): pre-existing, not part of this job; worth a separate item if she minds.
- The CDN is slow inside the sandbox: recordings were made after warming the figures; on a cold cache the ghost simply waits for the picture (paused), never the reverse.
- Not covered by a place hook: `kitGameFig` (her own figure, never a reveal) and eunuch/official shared figure art (marked per person key, fine).

~100% xong / ~90% chơi được (needs her eyes on the Fold + iPad webm).
