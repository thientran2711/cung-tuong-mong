# REVIEW menu-panel (rv) — PASS 878eba18 (FF of origin/main 9c1dd605 (also took worker 0f2dc4fa CSS; kph cap 860 so Thiết lập fits on cover; quickcheck PASS 212s, coop-e2e 92/92))
# REVIEW menu-panel (rv) — PASS d26dbd7b (FF of origin/main 56ff0db0)
# REVIEW menu-panel (rv) — PASS 878eba18 (FF of origin/main 9c1dd605 (also took worker 0f2dc4fa CSS; kph cap 860 so Thiết lập fits on cover; quickcheck PASS 212s, coop-e2e 92/92))
PRIORITY #1 CHECK: OD 21/11 ~03:28Z + ~03:30Z (#37) | main 56ff0db0 | review/menu-panel db5a6bfa (base b1033eb0) | claims worker session_01Rc5AsMQiepfa9AQYno5iem
Merged main 56ff0db0 (index/sw = main's, rebuilt). Worker fix OK: wide kit frame (560 / 384 on cover) for home, Chọn sổ solo+coop, Sổ luân hồi, Thiết lập on Fold 755x1000, iPad 1180x820, cover 412x1058; --kpw leak cleared only in kpBuild for non-identity panels, CSS locked only on .modal.kptitle.kpscene (other modals untouched, laws 9/11).
Found 2 faults the worker missed, fixed on rv (jkpc.js):
1. «Xem lại lời dặnGame này chơi gì» still ran together (small inline) → .modal.kptitle .kbtn>small{display:block}.
2. Thiết lập still scrolled («Kéo xuống», Chép sổ/Nạp sổ cut) at --kph 574 → menu panel height up to min(100dvh-32px,860px), content-fit; Thiết lập now no scroll on Fold/iPad/cover. Sổ luân hồi (1800 px list) legitimately scrolls in the same wide frame.
Gates: quickcheck PASS (217 s, old save ok); coop-e2e 92/92; page errors none; no horizontal overflow. Shots looked (fold/ipad opt + past; scratch only).
~100% xong menu-panel / ~85% chơi được toàn game (phần menu: 100%).
