# PROGRESS review/goal-strip-fix (stage rail + goal icon) — KIT §77 kitStageRail
Owner 16/11 (shots b73759e6, c882ff3f, 1b571e3a): the goal strip "nhảy tùm lum", "không tắt được". Owner decision: one left rail of round icons.
| Kind | Before | After |
|---|---|---|
| Goal strip on the room stage (#kgoalst) | overlay band over the people's heads | removed; the stage is clean |
| Goal strip on top of Hành sự (j67 .obj67) | strip above the act cards, moves with tabs | removed (rail present) |
| Goal access | strip only, no close | rail icon "Mục tiêu chương" (scroll), red dot when the goal/step changed (S.goalSeen) |
| Desk calendar (kitDeskCal, corner of her room) | floating painted calendar in a room corner | rail icon "Lịch tháng" on every stage |
| Chat (co-op) | — | slot reserved: review/coop-chat adds it with kitStageRail.add({id:"chat",order:20,icon:"img/kit/ico-chat.webp",…}) |
| Chapter detail (kitGoalDetail) | loose full-body figure column + picture band, no ✕ | event frame (§8.2 one picture left + kit rows right, kitOnePic in jk4), "Đóng" close option → kit ✕ + Esc + tap outside |
| "Mệnh truyện kiếp này" card (kitGoalCard) | same loose figure | same event frame |
| Tutorial step "muctieu" | spotlighted the strip | spotlights the rail goal icon |
Files: dev/build/jrail.js (new, after jgoal), jgoal.js, j67.js, jtut.js, jk4.js (kitOnePic, same code as review/kit-sweep), assemble.py, KIT.md §77, KIT_NUMBERS.md (§77; §76 reserved for kit-sweep).
Test: `node dev/test/stage-rail.js <url> <outdir>` → PASS at 1180x820, 755x1000, 844x390 (rail inside stage, 0 over a face box, 0 strips, no desk calendar, detail ✕/Esc/outside close, calendar opens LỊCH, 0 page errors).
Note: CDN pictures did not load in this container during the run (all portraits blank too); icons checked by downloading them (mo-calendar, mo-edict-closed, ico-chat).
