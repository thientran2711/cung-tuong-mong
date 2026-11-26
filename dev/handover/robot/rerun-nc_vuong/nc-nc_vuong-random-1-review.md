# Player review — nc-nc_vuong-random-1
Persona: random (rand); road nc_vuong (origin nc, fold 755x1000, real taps). Game build: live site at time of play (see report for sha). Harness sha in life json: 4523381f.
Ending: Xuất gia — Xuất gia làm ni cô (age 28, năm 11), buổi 1718, taps 105214 steps. No bot-chosen exit.
Scores (1–10) are derived from automated observation only (bug/dead-button/stuck counts, ending reached); a robot cannot judge feel, so treat as friction scores:
- a flow/progress: 5  - b clarity of buttons: 5  - c dialogs closable: 3 (✕/Lui no effect, queue not deduped)  - d crashes/JS: 6  - e pacing: 6
Dead buttons 19, stuck 22, bugs 46. Top bug families:
- 4× game|dialog queue holds N copies of «Tin báo» (each close pops one; looks like a dead ✕)
- 3× stuck|no-clock loop: N taps without a clock step on page «Thừa Minh cung · Thanh Dật trai 
- 3× stuck|no-clock loop: N taps without a clock step on page «Ngọc Thanh các · Ở đây còn N ngư
- 2× stuck|no-clock loop: N taps without a clock step on page «Vĩnh Hòa cung · Tư Tĩnh trai · Ở
- 2× stuck|no-clock loop: N taps without a clock step on page «Trường Xuân cung · Vĩnh Xuân hiê
- 2× stuck|no-clock loop: N taps without a clock step on page «Hàm An cung · Tuy Phúc hiên · Ở 
Top hated: person-dialog ✕/Lui doing nothing; no-clock loops in room pages (150 taps, no clock step); Tin báo / Tâm trạng queue duplicates.
Top loved: life runs to a real ending without a bot exit; ending text is clear.
Suggestions: dedupe the person-dialog queue; make ✕/Lui close ALL copies of one person's dialog; give the room page a visible way to advance when only passive actions remain.
