# Player review — nc-nc_vuong-skilled-2
Persona: skilled (sens); road nc_vuong (origin nc, fold 755x1000, real taps). Game build: live site at time of play (see report for sha). Harness sha in life json: 4523381f.
Ending: Hồng nhan bạc mệnh — Tuổi trời đã tận, trọng bệnh không qua khỏi, thọ 18 tuổi (age 18, năm 1), buổi 119, taps 32872 steps. No bot-chosen exit.
Scores (1–10) are derived from automated observation only (bug/dead-button/stuck counts, ending reached); a robot cannot judge feel, so treat as friction scores:
- a flow/progress: 7  - b clarity of buttons: 6  - c dialogs closable: 3 (✕/Lui no effect, queue not deduped)  - d crashes/JS: 9  - e pacing: 6
Dead buttons 5, stuck 8, bugs 6. Top bug families:
- 1× stuck|no progress N min on .dlg «Kính sự phòng báo tin»
- 1× dead|close button has no effect: .dlg «Tâm trạng · Ta» «Lui»
- 1× stuck|no progress N min on .dlg «Tin báo»
- 1× stuck|no-clock loop: N taps without a clock step on page «Trường Xuân cung · Hàm Thu trai 
- 1× stuck|no-clock loop: N taps without a clock step on .dlg «Hoàng thượng»
- 1× stuck|no-clock loop: N taps without a clock step on .dlg «Nhờ thái giám tìm thú nuôi»
Top hated: person-dialog ✕/Lui doing nothing; no-clock loops in room pages (150 taps, no clock step); Tin báo / Tâm trạng queue duplicates.
Top loved: life runs to a real ending without a bot exit; ending text is clear.
Suggestions: dedupe the person-dialog queue; make ✕/Lui close ALL copies of one person's dialog; give the room page a visible way to advance when only passive actions remain.
