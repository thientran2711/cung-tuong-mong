PRIORITY #1 CHECK ('cloud-del|Xóa sổ trên mây'): OD 0 | ledger 0 | claims 8 | main 4 (KIT §83.9 danger button + kitConfirm LIVE, j79.js:289) | review/* 0 → kit part exists, Worker route exists (POST /api/vault/drop).
# cloud-del (C44 "Xóa sổ trên mây") — worker, 17/11 — done
Branch review/cloud-del @ e12ef99aaef745a776271879ae03a5e6e5a2327e (from live main 7abaf07a). Files: dev/build/jcloud.js, dev/test/cloud-save.js. Worker untouched.
- Ám hiệu sổ mây page: new section "Xóa sổ trên mây" = kitRows (Sổ trên máy: vẫn giữ nguyên · Sổ trên mây: xóa hẳn, không lấy lại được (red = loss) · Máy khác: mất mối nối bằng ám hiệu này) + `.kbtn.kdanger` → kitConfirm ("Xóa hẳn sổ trên mây?", Xóa hẳn / Thôi) → api("drop",{k}) → 200 or 404: C={} (like Thôi nối), back to title + notice "Đã xóa sổ trên mây · Sổ trên máy này vẫn còn". Error: ERR text shown, link kept. No CSS of my own.
- Found: kitConfirm opened from a title sub-panel sat UNDER #title (unclickable). Fixed in jcloud only (confirm gets the kptitle layer class, z 55). KIT KEEPER NOTE: kitConfirm itself should do this when T is up (title) — kit gap, not patched in the kit.
- Tests: dev/test/cloud-save.js case 9 (button + confirm one line, no word break; real mock Worker: list → 404 after delete; local Sổ 1 hash equal; link cleared). 54/54 OK, no page errors on phone 755x1000@2, iPad 1180x820@2, 1366x1024@2, 844x390. one-core-guard PASS (fails 0).
- Shots LOOKED at (Fold + iPad, scratch dev/shots/cloud-save, not in git): button row, confirm, no overlap/cut. 390x844 not separately shot (game shows rotate prompt there; button measured one line at all four test sizes).
- NOT run: quickcheck.sh (live compare / time +5 %) — needs live URL; coordinator please run. Co-op code untouched.
- Side note (pre-existing, not mine): small-caps row label "Sổ trên mây" looks like "SỔ TRÊN MÁY" in the kit label font (â→Á look) — kit keeper may check.
SẴN SÀNG KIỂM e12ef99aaef745a776271879ae03a5e6e5a2327e
