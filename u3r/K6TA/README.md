# U3 rerun room K6TA (room 7) — game review/robot-coop-fix-6 c4163a93, local Worker, harness robot-realtap 4523381f + U3b dump + no-Esc + unstick-escalation patches
Reached buổi ~20 (room week 4, year 1) with real taps, no Escape. Then:
- HOST (Fold) page sat on #title (cover art, 0 tappable buttons) from ~t=1220s; its loop did not print/dump for 10+ min (no stuck dump possible); only host-ckpt.json (harness checkpoint) kept.
- GUEST (iPad): «Hảo hữu đang vắng», COOPW.tr tail = repeated «night 3 / pull» (night loop), COOP.state week 4, COOPW.on true, titleVisible false, PG {court:0,kvo:0}; harness stuck-1 dump = guest-stuck-dump.json (15 min no clock progress on #ktut «Lời dặn · Thỉnh an Thái hậu hoặc Hoàng hậu»). Guest then rejoined by taps (Cùng hảo hữu → Trở lại phòng).
Shots local only.

UPDATE: host-stuck-dump.json added (harness stuck at 15 min on #title): COOP.state status 'off', room '', COOPW.on false, titleVisible true, S.buoi 3, COOPW.tr tail = «bend 4.1» repeated (week 4 buổi 1 end loop) — i.e. the host seat LEFT the room (state off) and the page shows the bare title art with no buttons.
