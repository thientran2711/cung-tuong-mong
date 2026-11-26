# Player review — nc-nc_vuong-lover-1
Persona: lover (sens); road nc_vuong (origin nc, fold 755x1000, real taps). Game build: live site at time of play (see report for sha). Harness sha in life json: 1a29f470.
Ending: Hồng nhan bạc mệnh — Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 27 tuổi (age 27, năm 9), buổi 1312, taps 78579 steps. No bot-chosen exit.
Scores (1–10) are derived from automated observation only (bug/dead-button/stuck counts, ending reached); a robot cannot judge feel, so treat as friction scores:
- a flow/progress: 5  - b clarity of buttons: 5  - c dialogs closable: 3 (✕/Lui no effect, queue not deduped)  - d crashes/JS: 6  - e pacing: 6
Dead buttons 25, stuck 16, bugs 35. Top bug families:
- 3× freeze
- 2× stuck|no-clock loop: N taps without a clock step on page «Trường Xuân cung · Hàm Thu trai 
- 2× stuck|no-clock loop: N taps without a clock step on page «Cảnh Phúc cung · Dưỡng Xuân hiên
- 2× stuck|no-clock loop: N taps without a clock step on page «Diên Huy cung · Chiêu Nhân hiên 
- 1× js|page error: f.rk.split is not a function
- 1× stuck|no progress N min on .dlg «Tâm trạng · Cung nữ thân tín tam đẳng Ỷ Thúy»
Top hated: person-dialog ✕/Lui doing nothing; no-clock loops in room pages (150 taps, no clock step); Tin báo / Tâm trạng queue duplicates.
Top loved: life runs to a real ending without a bot exit; ending text is clear.
Suggestions: dedupe the person-dialog queue; make ✕/Lui close ALL copies of one person's dialog; give the room page a visible way to advance when only passive actions remain.
