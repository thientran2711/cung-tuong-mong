# flight2-s20d bugs

Life: iPad 1180x820, bot=greedy, seed 2026112566, pick="Tĩnh dưỡng|Truyền thái y", build pinned 5fb13d60 (b 0b372aa14258), harness 795f87ec. Ending: Hồng nhan bạc mệnh, "Tuổi trời đã tận, trọng bệnh không qua khỏi", age 30, buổi 1727 (year 12), taps 845.

- [dead] x1 .mapsc «Phật đường1 bóng» covered by span.k3l in #kshR (year 11, age 29)
- [game] x3 SAVE STALE: stored save stopped following the live game (no setItem error seen; first at buổi ~1122)
- [game] x1 softlock: «Sang ngày mới» tapped 3x, buổi does not turn (dialog queue Q=1: Một ánh mắt)
- [game] x2 softlock: same, Q=1: Nghe đồn
- [game] x6 softlock: same, Q=1: Có người đến
- [game] x1 item pick grid: the confirm «kipgo» stays off-screen after 8 real scrolls (.kscn)
- [console] 404 /img/kit/emo-m-khochiu.webp (new vs s20c notes)

## Illness scan (post-life; bệnh / ốm / thái y / Tĩnh dưỡng)
- The life ENDED by illness at age 30 (year 12 turn 149): «trọng bệnh không qua khỏi». In the moments log there is NO illness dialog for her own health before the ending (no «Tâm bệnh», no sick/critical warning screen, 0 hits for «Tĩnh dưỡng» / «Truyền thái y» in run.log); she died with no cure road ever offered or seen -> possible BUG: fatal illness arrives without a warning/cure dialog (foreman to confirm against the illness rules).
- The pick "Tĩnh dưỡng|Truyền thái y" never fired (exitPick none). Only «Tĩnh dưỡng» hit: a Phụ tuyến dialog «Đóng cửa cung tĩnh dưỡng» (not her illness).
- Other illness hits: «Nổi mẩn» (year 4 turn 38) has «Mời thái y kê thuốc» (cure road present, ok). «Cáo bệnh, không dự» on «Hội phối đồ» invitations (years 3, 5) are event exits, not cures. Map actions «Giả bệnh», «Bắt mạch, chữa bệnh» (Y dược) exist and were available on the map.
- Not verified: her Sức/ill state in the last saves (ckpt format at end differs); foreman can read the end save if needed.
