# Player review — nc-nc_vuong-skilled-1
Persona: skilled (sens); road nc_vuong (origin nc, fold 755x1000, real taps). Game build: live site at time of play (see report for sha). Harness sha in life json: 4523381f.
Ending: Hồng nhan bạc mệnh — Lao phổi nguy kịch, không qua khỏi (age 31, năm 13), buổi 1941, taps 120591 steps. No bot-chosen exit.
Scores (1–10) are derived from automated observation only (bug/dead-button/stuck counts, ending reached); a robot cannot judge feel, so treat as friction scores:
- a flow/progress: 5  - b clarity of buttons: 5  - c dialogs closable: 3 (✕/Lui no effect, queue not deduped)  - d crashes/JS: 6  - e pacing: 6
Dead buttons 35, stuck 23, bugs 50. Top bug families:
- 3× stuck|no-clock loop: N taps without a clock step on page «Vĩnh Hòa cung · Tư Tĩnh trai · Ở
- 3× stuck|no-clock loop: N taps without a clock step on page «Ngọc Thanh các · Ở đây còn N ngư
- 3× stuck|no-clock loop: N taps without a clock step on page «Khải Tường cung · Nhã Vận hiên ·
- 2× game|dialog queue holds N copies of «Tâm trạng · Thường tại Hạ Thanh Đại» (each close pops
- 2× stuck|no-clock loop: N taps without a clock step on page «Cảnh Phúc cung · Dưỡng Xuân hiên
- 2× stuck|no-clock loop: N taps without a clock step on page «Dực Khôn cung · Hòa Sướng hiên ·
Top hated: person-dialog ✕/Lui doing nothing; no-clock loops in room pages (150 taps, no clock step); Tin báo / Tâm trạng queue duplicates.
Top loved: life runs to a real ending without a bot exit; ending text is clear.
Suggestions: dedupe the person-dialog queue; make ✕/Lui close ALL copies of one person's dialog; give the room page a visible way to advance when only passive actions remain.
