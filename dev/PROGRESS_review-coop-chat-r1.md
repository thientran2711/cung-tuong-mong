# PROGRESS review/coop-chat-r1 (reviewer, 16/11)
- Base: review/coop-chat bdd2b6b5 (predated the rail: own floating button #kchat + fallback) merged onto origin/main c4e89f89 (conflicts: assemble.py list, KIT.md, KIT_NUMBERS.md — resolved).
- Port onto kitStageRail (§77), done in -r1: jcoopchat.js now only calls kitStageRail.add({id:"chat",order:20,icon:"img/kit/ico-chat.webp",title:"Thư từ",when,badge,onTap}); own button kitChatBtn + .kchatb CSS + fallback removed; arrival = rail dot + shake/glowburst on the rail button (still dot only in Gọn/reduced motion/bots); co-op only (unmount on stop / solo).
- KIT number: chat is §80 (§76 on main = palace map); KIT.md / KIT_NUMBERS / sample id / comments renumbered.
- dev/test/coop-chat.js re-pointed at the rail button.
