# PROGRESS review/coop-chat-r1 (reviewer, 16/11)
- Base: review/coop-chat bdd2b6b5 (predated the rail: own floating button #kchat + fallback) merged onto origin/main c4e89f89 (conflicts: assemble.py list, KIT.md, KIT_NUMBERS.md — resolved).
- Port onto kitStageRail (§77), done in -r1: jcoopchat.js now only calls kitStageRail.add({id:"chat",order:20,icon:"img/kit/ico-chat.webp",title:"Thư từ",when,badge,onTap}); own button kitChatBtn + .kchatb CSS + fallback removed; arrival = rail dot + shake/glowburst on the rail button (still dot only in Gọn/reduced motion/bots); co-op only (unmount on stop / solo).
- KIT number: chat is §80 (§76 on main = palace map); KIT.md / KIT_NUMBERS / sample id / comments renumbered.
- dev/test/coop-chat.js re-pointed at the rail button.
- Extra fixes in -r1: `.kcm.me` bubble class collided with the global `.me b / .me` header CSS (j79) and broke the own-message bubble → renamed `.kcm.mine`; arrival glow made smaller (it hid the rail icons); test updated (rail button, identity card / roulette steps, local Worker flag).
- RESULT (see dev/handover/reports/review-coop-chat-r1.md): coop-e2e 59/59; coop-chat 47/47 at 755x1000@2+1000x755, 686x880@2.2+1180x820; stage-rail PASS 4/4 sizes; panel-size no new FAIL; Worker chat.test.mjs ALL OK (local wrangler dev — the LIVE Worker does not have chat yet: deploy needed).
