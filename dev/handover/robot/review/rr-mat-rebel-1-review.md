# rr-mat-rebel-1 — player review (R4 seat, cnv_mat rerun)
Scope note: log/stuck/dead-button data + shots; not every buổi was read. Scores limited to what the data shows.

## Summary
persona rebel (bot=bold) · cnv / cnv_mat · seed 1490434925 · age 18→25 (6 years, 811 buổi) · rank 0 · ending DEATH «Hồng nhan bạc mệnh — Bị ban rượu độc vì mưu hại Cao Thanh Diên» (valid real end) · 3416 taps · harness 4523381f, resumed on newer shas · dead buttons 3 · stuck 7 · bugs 16.

## Moments
- «Nhờ thái giám tìm thú nuôi» dialog · FRUSTRATED · 3 DEAD BUTTONS: «Xem Mèo tuyết» covered by span.kitb in #mb; «Xem Đôi uyên ương» and «Xem Vẹt ngũ sắc» covered by b.kidn in #mb (option cards overlapped by their own thumbnails/labels) · shots-rr-mat-rebel-1/dead-fold-*.png (F's newer harness ignores option thumbnails for probes, so re-check on 93812531+).
- «Tin báo» dialog queue · BORED/FRUSTRATED · queue held 10, 7, 6, 2 copies of the same dialog; each ✕ pops one, looks like a dead ✕ (game bug: no dedupe, already known to F #6).
- Palace pages «Trường Môn viện» (×9) and «Vĩnh Thọ cung · Tuyên Hòa hiên» · CONFUSED · 150 taps without a clock step: robot kept tapping a page with no way forward.
- Dialogs «Bị châm chọc», «Đập đồ», «Cầm», «Danh hiệu», «Quan hệ với» · CONFUSED · stuck rounds, harness could not find the step forward.
- age 25 · death · ODD/OK · rebel persona died of poisoned wine for scheming against Cao Thanh Diên at rank 0: consequence follows the choice, fair for the persona.

## Scores (low confidence)
c. Buttons & UI 3/10 — dead option cards, duplicated «Tin báo» queue, stuck pages.
d. Story: death by scheme is coherent. Others not rated.

## Bugs
1 dead option cards in «Nhờ thái giám tìm thú nuôi» (repro: shots above)
2 «Tin báo» duplicate queue (10 copies)
3 pages with no visible forward action (Trường Môn viện)
4 #kmrew chest (known harness gap)
## Suggestions
Dedupe the dialog queue; keep option thumbnails from covering the card's own button.
