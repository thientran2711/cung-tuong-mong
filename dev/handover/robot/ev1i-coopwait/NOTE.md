# coop1i P89H #coopwait [game] — mutual end-of-buổi wait, released only by reload+rejoin (A-COOP #2, 18:42Z, b4b181f8)
- host buổi 86 «Đợi hảo hữu xong tuần» (same frame since 17:06Z); guest buổi 79 «Hết buổi · Chờ hảo hữu…» (Sẵn sàng pressed, button disabled). 29 min zero progress in run-resume9.
- Guest advanced exactly +1 buổi per pair restart/rejoin: 76→77 (17:17), 77→78 (18:09), 78→79 (18:13); nothing in between.
- Repro files: guest-1842.png, host-1842.png (+1807 frames), *-ckpt.json at 18:42 (restart the pair with resume=1 room=P89H on 247c7132+patch / 7ca6b369 / b4b181f8). run-b4b181f8-1813-1842.log = tap log.
- Workaround (a person would): supervisor sup1i.sh restarts both seats (resume=1 → «Cùng hảo hữu → Trở lại phòng») after 12 min with no buổi progress; each rejoin logged in sup.log.
