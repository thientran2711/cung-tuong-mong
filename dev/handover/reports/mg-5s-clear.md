# mg-5s-clear — 8 mini-games made understandable in the first 5 s (worker, MAIN CHÍNH 83)

PRIORITY #1 CHECK: OD td_dung bug row (21/11 ~00:50Z) + words rule row 1998 (guiding words stay, reading-heavy text out) | main LIVE 4f34f461: jtd.js kgTdWalk pill (private), no shared guide line | review/td-dung-clear 03ba85c3 (merged as base; its pill() is private = law-9 FAIL being fixed on review/td-dung-clear-rv, NOT touched here to avoid a conflict) | claims: huong-cue, den-look, chai-ramp, dauho-lv5, Foreman B mg-craft (hoa): none of the 8 kinds touched. dauho shares kg82Aim with ban: every ban change is behind `if(!pot)`.

Branch review/mg-5s-clear = origin/main 4f34f461 + review/td-dung-clear 03ba85c3 + 2 commits. Physics, BAL, grading UNCHANGED (only drawing, words, buttons, the result row).

## What is new (all KIT, law 9)
1. `kg82Guide(g,text,cx,cy,col,sz,maxW)` in j82.js = ONE shared pill for the single short state-driven guiding line (brown wait / green tap now / red danger). KIT.md §13.7.2.
2. `KG82.why` → kit row «Vì sao» above the button in `kg82ShowRes` (cleared at kg82Play). Every kind below sets it at its end.
3. Buttons that keep a short word in play: `data-kgkeep="1"` skips the «no text in play» sign pass (j82 kg82Signs) → «Quạt lửa», «Thưa», «✓ Dán».
4. Rules-screen demos (jnwb.js `NWB_DEMO.aim/slapbar(kind)/cook/tspluck/doiline/hoadien`; kgReady now passes the spec): object + a hand doing the move + ✓, loops, still under Cảnh động off. td_ngon already had one.

## Per kind (guiding line states · other changes · «Vì sao» example)
| kind | guiding line | other | Vì sao |
|---|---|---|---|
| ban | «Chờ mũi ngắm vào giữa hồng tâm, rồi chạm» → «Chạm ngay!» (aim near centre, green) | dashed aim line from the marker down onto the target | Trúng giữa hồng tâm 0/6 phát · sượt 4 · trượt 2 |
| tat | «Tay đang lướt qua thước · chạm khi kim vào vùng đỏ» → «Chạm ngay!» | zone labels Nặng / Vừa; the needle is now a drawn palm | Kim dừng giữa vùng đỏ · tay nặng … |
| ne | «Đòn đang lướt qua thước · chạm khi kim vào vùng xanh» → «Chạm ngay để né!» | zone label Né; the needle is a drawn fist | Kim dừng trong vùng xanh · né kịp / Không chạm đúng lúc … |
| banh | fire/step driven: «Giữ nút quạt cho lửa lên vùng xanh (lửa lớn)» / «Lửa đủ · kéo «gạo» vào nồi» / «Lửa mạnh · buông quạt» / «Giữ lửa trong vùng xanh cho chín» | fan button labelled «Quạt lửa»; gauge moved down a little to make room | Nấu xong 5/5 bước · 3 bước đúng lửa · nhầm 1 lần |
| duho | «Sen trôi từ phải sang · chạm khi vào vùng sáng» → «Chạm đóa sen trong vùng sáng!» | tag «Vùng hái» on the lit lane | Hái được 7/12 đóa sen · để trôi mất 3 · chạm ngoài vùng 1 lần |
| doi | «Kéo nét lật gương của bên trái sang ô bên phải» → «Thả vào ô trống…» / «Chạm ô trống…» | scrolls labelled Nét mẫu / Nét đối (rows moved 20 px down) | Nét lật gương đặt đúng 8/10 · đặt sai 2 lần |
| hoadien | «Kéo hoa điền vào giữa hai đầu mày» → «Thả vào giữa hai đầu mày, rồi bấm ✓ Dán» | button «✓ Dán»; board/grading untouched (owner: plays fine); hdBoard also used by the makeup step: NOT touched, all changes in kgHoaDien | Hoa điền đặt lệch sang phải so với giữa hai đầu mày |
| td_ngon | «Thái hậu đang nói · chờ nói xong» / «Người còn buồn · chờ nguôi» / «Tới lượt ngươi · giữ nút Thưa» / «Buông khi tiếng vào dải xanh (nhỏ nhẹ)» | speaker drawn (head + shoulders under the bubble tail, named + class); button «Thưa» | Vừa tiếng 3/5 lượt · cắt lời 1 lần |
Not done: no ghost hand at the first move in play (demo on the rules screen + the «Hướng dẫn» round already show it); duho: zone is the kit lit lane (word «vùng sáng», not «vàng»); no painted hand sprite (tat-hand is missing → drawn palm/fist, ART request for Foreman C if she wants paint).

## Tests (Fold 755x1000 + iPad 1180x820, file build)
- mg-noword-a ALL ok (ban/tat/ne GUIDE whitelist), mg-noword-b ALL OK (GUIDE table widened for hoadien duho doi banh td_ngon), mg-noword-kit PASS 31 kinds 0 words (kgkeep buttons whitelisted), mg-allkinds 7/7, mg-ui-rest 39/39, mgcal-redo 12/12, ag-mgcal ok, quickcheck CORE GATES PASS (+ site rebuilt and committed).
- «Vì sao» checked for real: tat, ne, ban plays print their row. No page errors in any run.
- coop-e2e NOT run (canvas / result-row only, nothing synced) — main/reviewer please run on the merge.
- Shots (scratch, not in git): /home/user/wt/mg5s-shots/{kind}-{1rules,2play,3res}-{755x1000,1180x820}.png — looked: ban, tat, ne, banh, duho, doi, hoadien, td_ngon (rules + play), iPad banh/td_ngon.

## Notes for main
- td_dung: its private `pill()` and the two private pad buttons are still in jtd.js (law-9 FAIL already known) — the rv branch should call `kg82Guide`; the pads need a kit part.
- Owner-visible rule change: a play button may now keep a short word (data-kgkeep) — consistent with OD 21/11 ~00:50Z; other buttons still show signs.
- dauho / huong / hoa / den / chai untouched (claims).

~100% xong (8 kinds) / ~88% chơi được (needs her re-test).

## ROLLOVER HANDOVER (worker hit its context ceiling, 21/11 ~03:25Z) — for MAIN's successor
- Branch review/mg-5s-clear @ 8caa9dcd = 8 kinds + td_dung on kg82Guide + figure-column backdrop slot (KG82_MGBG, KIT §13.7.3) + main 32c0e33b merged. coop-e2e 92/92. Worktree /home/user/wt/mg5s (sparse), shots/scripts in /home/user/wt/mg5s-shots (shot.js, why.js, bg.js; run with NODE_PATH=$(npm root -g)).
- NOT started: owner mark #55 (MAIN 86 addendum, branch review/mg-intro-2 from LIVE 56ff0db0): contest / mini-game INTRO = event picture on top, REMOVE the rules-demo picture (NWB_DEMO / kgReadyDemo in j82 kgReady, the «Hướng dẫn» button teaches), long rules + «Phần của ta» rows behind the kit «!» / kitTapWord (keeper branch review/kit-tap-word), compact opponents list, whole-group scan + before/after table, Fold + iPad. Intro code: j82.js kgReady (rules screen), contest intro at j82 ~line 466 (`Phần của ngươi` rows), jsmg / steal-minigame intros.
- Note for that work: my rules-screen demos (NWB_DEMO.aim/slapbar/cook/tspluck/doiline/hoadien) are the pictures #55 asks to remove from intros; delete them with the same change (or keep only for «Hướng dẫn»).
