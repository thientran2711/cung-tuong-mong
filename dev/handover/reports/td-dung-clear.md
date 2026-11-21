# td-dung-clear — Đội bát đi đứng (td_dung) made readable at a glance (worker, MAIN CHÍNH 83)

PRIORITY #1 CHECK: OD 2009/2011/2014/2033/2066 + words rule row 1998 (21/11 ~00:50Z: guiding words stay) | main jtd.js kgTdWalk, jnwb.js NWB_DEMO.tdwalk (mg-noword-b already landed: bowl + floor arrow demo; owner still "không hiểu") | review/huong-cue (touches j91/jmgcal/KIT only; no overlap with jtd.js/jnwb.js: checked by diff) | claims none.

Branch: review/td-dung-clear @ 03ba85c3b (base origin/main b1033eb0). Files: dev/build/jtd.js, dev/build/jnwb.js, dev/test/mg-noword-b.js.

## Why she did not understand (looked at the old screens, 755x1000)
Old rules picture = one empty bowl + one red arrow; old play = a big clay stew pot (banh-pot), a thin meter on top and ◀▶ glyphs. No person, no "walking", nothing said what the meter or the halves meant. Title "Đi đứng giữ bát" did not match the picture.

## What changed (visual + words only; physics, BAL.mgTier.lev.td_dung, kicks, BAND/KICK/SPILL untouched → the grading curve is identical, no re-measure needed)
1. Scene: HER own kit figure (kitFigOf(S), one figure everywhere) stands on the hall floor with a porcelain bowl of water on her head. The bowl tilts with the lean and she sways a little; green glow when inside the safe band, red glow when out / spilled.
2. Balance bar (top): green band labelled «Vững», red ends labelled «Đổ», needle = lean (green/red).
3. One guiding line under the bar (OD 21/11 ~00:50Z): first 2.3 s «Mỗi bước chân làm bát nghiêng. Giữ nửa khung bên kia để đỡ.»; then «◀ Bát nghiêng phải · giữ bên trái» / «Bát nghiêng trái · giữ bên phải ▶» (leaning now or about to), else «Bát đang thẳng · giữ vững».
4. Floor step marks leave her feet and come down to a landing line, arrow = the way that step leans the bowl.
5. Two labelled pads «◀ Đỡ bên trái» / «Đỡ bên phải ▶» (the held one lights, the one to hold gets a green frame). Nothing covers the scene (the ~06:30Z yellow-box bug stays fixed: glow/ring on the bowl only).
6. Rules screen: title «Đội bát đi đứng», 3 short steps, demo = HER figure + bowl + gauge: floor mark ◀, bowl and needle tip left, a hand HOLDS the right half, bowl and needle return, ✓ (loops; still under Cảnh động off). Same demo shows in Thử tay (mgCalRun) and in the study act.
7. Result: new row «Vì sao: Bát vững 14/20 giây · đổ 3 lần» (KG82.tdwalkStat set by the engine) under «Màn chơi»; goal line «Bát vững trên đầu suốt buổi đi».
8. Guided round («Hướng dẫn») unchanged mechanism (ghost hand on the half to hold) and now sits on the new scene.
Test updated: dev/test/mg-noword-b.js whitelists exactly these td_dung guiding strings (old test enforced the pre-1998 "no word in play").

## Tests (755x1000 + 1180x820, file build of assemble.py)
- mg-noword-b: td_dung play ok (only the whitelisted guiding words). mg-ui-rest: 39 ok, 0 FAIL. quickcheck: see line at the end. No page errors in all shot runs.
- NOT run: mgcal-redo.js / ag-mgcal / coop-e2e (mgcal-redo.js is on review/mgcal-redo, not on this base; physics unchanged so cal numbers cannot move; the scene change is canvas-only and not synced in co-op). Main/reviewer please run them on the merge.
- Shots (scratch, not in git): /home/user/wt/tdc-shots/{b,a}-dung-*-755x1000.png and *-1180x820.png; looked.

## WHOLE GROUP (law 11): every Thử tay kind's first hồi cold, goal obvious in 5 s? (31 kinds, 755x1000 stills, rules screen + 2.6 s into play)
YES (goal readable from picture/scene): co (stones on board), dan (blossoms fall on strings), hat (ribbon path to follow), mua (lit arrow discs), doden (sample lantern + lanterns), td_cong (sample colour + threads), theu / kim (frame cells / strings), tho / ve / may / kinh (ghost stroke + green start dot), le / tc / xa / thq (items + slots), td_hanh (people + pips + ± ), td_dung (NOW: her + bowl + bar).
NO / WEAK:
| kind | why not obvious in 5 s | suggested same-way fix |
|---|---|---|
| ban | only a thin marker bar at the top; the target is not the thing she moves | cue line «Chạm khi tâm ngắm ở giữa hồng tâm» + mark the moving aim on the target |
| tat / ne / chai | a bare bar and a needle, no object (what is being slapped / dodged / combed?) | put the object (hand/face/comb, thrown item) beside the bar + one guiding word |
| banh | cooking board: many pictures + fire meter, no clear target | order strip pictures + fire zone word |
| dauho | empty court, a pot far right, a tiny arrow at left; drag direction not shown | aim-line preview + wind word (huong-cue restores) |
| den | river + lanterns, nothing says "keep it in the light" | light-band word + lantern/target ring |
| duho | boat scene, sens drifting; the yellow zone is faint | brighter zone + «Chạm khi sen vào vàng» |
| hoa / doi / hoadien / huong | stage props only (vase+dashed circles / strokes / mirror face / shelf+strings) with no first-seconds cue | one guiding word + a ghost hand for the first move (huong-cue + mg-visual own the cue; list for main) |
| td_ngon | an empty speech bubble + voice bar; who/why not drawn | speaker figure + green ring first (wordless demo exists on the rules screen) |
These are separate engines owned by huong-cue / mg-visual; not rebuilt here (large). Main to decide whether to give them to a worker after huong-cue lands.

## Not done / notes for main
- The bowl is vector-drawn (prop). A painted bowl sprite («td-bowl») would be better: ART request for Foreman C (kit art), same size, transparent.
- "Teach by doing" = the first-2.3 s line + the guided round's ghost hand; I did NOT soften the first kicks (would change the measured grade). If she still wants a slower first step, change kicks[0..1].t / .m under BAL in jbal2 and re-run the cal tools.
- Header chip above the canvas still shows «?» for the unscored values in tutorial/play (kit chip, not touched).
- OD note for main: the no-word test now allows guiding words (21/11 ~00:50Z); huong-cue should widen the same GUIDE table for Đầu hồ / Điều hương.

~100% xong (td_dung) / ~85% chơi được (needs her re-test; rest of the kinds listed above).
