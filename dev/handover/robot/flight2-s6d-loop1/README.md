# flight2-s6d loop-1 / loop-2 evidence (slot 6, harness 93812531, iPad 1180x820)
Life: Diêu Hải Lan, thd_tho, bot sens, seed 795064746. State at loop-1: year 3, turn 29 (tháng ba thượng tuần), buổi 3 (tối, 0 khắc), rank 0 (Phế phi · lãnh cung), place lc, dialog queue Q=11.

## What happened
- loop-1 10:54Z: «no-clock loop: 150 taps without a clock step» on Hậu cung person focus (Liêu Ngọc Thù). All act cards greyed «hết khắc buổi này», «Sang ngày mới» is the only way forward. Before it, the log shows «game dialog queue holds 8 copies of «Tâm trạng · Quý nhân Đường Hân Duyệt»» then 5 copies (each ✕ pops one, looks like a dead ✕).
- loop-2 10:55Z: second no-clock loop (150 taps) on .dlg «Danh hiệu»; queue also held 3 copies of «Tin chờ người sai đi».
- Earlier stuck-1 10:12Z (harness 6d3a128f): «Tin báo — 70 tin mới» dialog with no ✕ at the top.

## Where the heavy files are (NOT in git, SAVES_NOT_IN_GIT.md)
Box /home/user/out6d/shots-flight2-s6d/ : loop-1.png, loop-1-save.json (1.1 MB game save), loop-1-dump.json (1.3 MB, contains the save in `ls`), loop-2.*, stuck-1.*, stuck-2.*. Ask runner s6 (session_01UV1SzkDs88ozjFkVLK5VG8) for any single file. loop-1-state.json here = the dump without `ls`.
