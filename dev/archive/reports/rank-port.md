# rank-port report (D36 leaderboard + Bảng vàng) — branch review/rank-port

## Changes
- Merged origin/main cdad7109 and review/kit-keeper-1 05bce551 (not yet on main) into the branch; assemble.py conflict resolved (score.js + jrank.js after jnight.js); site rebuilt.
- Podium (kpodCol entry fields) and option-less end card already come from the new kit parts; no private podium CSS added. Shots looked at: figures fill the stage, plaque = step, medal corner, "Ta" tag.
- Recovery code (owner Q20 answer): client-only, Worker UNCHANGED (nothing deployed to Cloudflare). Code = guest id as 6 groups of 4; server keeps only the hash. Shown once on first Bảng vàng open (copy button + "Ta đã ghi lại"), re-readable later via "Mã khôi phục" button; "Lấy lại bằng mã" restores via GET /me?gid= (404 -> "Không tìm thấy mã này trên bảng"). Uses kit input/buttons/rows only.
- Interpretation to confirm: "shown once" = shown automatically once; it can still be re-read from the button (safer for players, server cannot show it again).

## Tests (dev/test/rank-e2e.js, local Worker stand-in + built site)
ALL OK at 755x1000@2, 1000x755@1, 1180x820@2, 1366x1024@2, 844x390@2 (new recovery section: show once, copy, bad/unknown code, restore on a second device, layout). Old save (published build) ALL OK. 390x844: rotate prompt by design, e2e cannot play there (not run).
coop-e2e: 58/60; the 2 FAILs ("B reborn as a new person in the same world", "A sees the reborn friend") are IDENTICAL on origin/main's build -> pre-existing, not from this branch (suspect main's j99succ succession flow).
Test edits: S.succ bypass for Thái hậu scenario (j99succ intercepts emperorDies), longer wait for first-life roulette, podium ratio fig>plq*1.5 (kit rule), rcSeen preset for non-recovery guests.

## Notes
- Screenshot 3 (board) in rank-e2e can be covered by a night roulette (#kroulw) — test artifact only.
- jrank.js still has private .krk-* rules (header, list rows) — reviewer to check vs kit (kit-keeper note).

## KIT REQUESTs
none.

## Owner questions
- Confirm "shown once" wording (see above).

SẴN SÀNG KIỂM 71c6cb41643b1f0dfced3067c8855f5b48a68ff0
