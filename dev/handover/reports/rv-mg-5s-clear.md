# rv-mg-5s-clear — reviewer (MAIN CHÍNH 85)

PRIORITY #1 CHECK: OD td_dung bug row 21/11 ~00:50Z + guiding-words rule | main 32c0e33b (huong-cue, dauho-lv5, thancan, coop-name-clash live) | review/mg-5s-clear bd64e791 (worker merge of 64d2e094) | claims: worker session_01Rc5AsLTqtdSYJsC6Gxn7cc.

Result: **PASS review/mg-5s-clear-rv 56a9257c** (descends from origin/main 32c0e33b).
Base: worker bd64e791 (merged as -s ours, reviewer content kept) + final merge of a88b14f0 and 32c0e33b (only index.html/sw.js conflicts; rebuilt with assemble.py + build_site.sh).

Reviewer fixes on top of bd64e791 (tiny): ban «near» = zone(x)===0 (the PAINTED gold ring, same oracle as the grading), dashed line ends above the painted outer ring; tat/ne keep huong-cue's idle text («… đang sáng: chạm khi …») in the one guide pill; duho: guide pill hidden while the «Lau sậy bên bờ khẽ động» alarm text shows (no overlap).

Tests (Fold 755x1000 + iPad 1180x820 where a size applies): mg-noword-a both sizes ok, mg-noword-b ALL OK (60-char rule + GUIDE), mg-noword-kit PASS 31 kinds, mg-allkinds 7/7, mgcal-redo 12/12, kit-guide PASS 11, mg-ui-rest 39/39, ag-mgcal ok, dauho-hole 54/54 (ban still scores the painted rings), coop-e2e 92/92 (COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc), quickcheck PASS (final sha: render 298/257, buổi 1433/1222, gates PASS; one run failed buổi only while another job ran in parallel, re-run alone PASS).
Diff check vs main: jbal/jbal2 0 lines changed; grading (zone/q/pts/mgTol) lines unchanged; only drawing, words, buttons, «Vì sao» row.

Shots (looked, 8 kinds × rules/play/result × 2 devices; scratch /tmp/claude-0/rvshots/out): understandable in 5 s, kit parts only (kg82Guide, kit rows, kit buttons), cổ trang words, no %. Law check: 5 (no difficulty change), 7 ok, 9 kit ok, 11 whole group (8 kinds + td_dung/duho/ban), 12 both devices.
Notes (non-blocking): duho rules text says «khoảng vàng sát mạn thuyền», guide says «vùng sáng» — wording drift; doi/td_ngon show a bare «?» button/top bar (pre-existing sign, not from this branch); banh result screen not reached in the shot run (idle play), banh play + rules looked fine.

~100% xong / ~90% chơi được (owner re-test needed).
