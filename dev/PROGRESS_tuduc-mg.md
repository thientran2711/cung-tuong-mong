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
