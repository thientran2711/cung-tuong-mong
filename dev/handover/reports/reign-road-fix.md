SẴN SÀNG KIỂM 9f4e8bf9b263adcbadb5f72c8751bbb8a43f52e8
# reign-road-fix (orphan #33) — branch review/reign-road-fix (base origin/main 399483e3, no PR, main untouched)

## Fault 1 — "Quý phi ???" in Triều cục: still present on main, FIXED
- New kit helper `kitNameList(list, fmt, none)` in j61.js beside kitKnownName: known names + "thêm N vị chưa quen biết".
- jreign.js: faction rows use it; foe-evidence line ("X nắm Chứng cứ về ngươi") says "Một vị phi tần chưa quen biết" for an unmet name.
- Family (LUẬT SỬA CẢ NHÓM): scan of every tab × sub-tab (unmet-names-scan.js) found no other pane printing "???"; but 9 more code sites join several consort names in one line (they print "Quý phi ???, Tần ???" through the j61 DOM mask). All moved to kitNameList. Table (one mid-game state, 8 of 10 consorts unmet):
    j61/jreign Triều cục: Phe Hoàng thượng
      BEFORE: Hoàng hậu Lý Phương Hoa, Tần Mộ Dung Bích Dao, Thường tại Đoan Mộc Uyển Nhi, Đáp ứng Thẩm Khinh Vũ
      AFTER : Hoàng hậu Lý Phương Hoa, thêm 3 vị chưa quen biết
    
    Triều cục: Phe quyền thần
      BEFORE: Tần Nhan Vân Khanh
      AFTER : 1 vị chưa quen biết
    
    j2/j10 Sổ thị tẩm
      BEFORE: Lý Phương Hoa 0 lần, Vân Tuyết Dao 0 lần, Mạnh Như Ý 0 lần, Nhan Vân Khanh 0 lần, Mộ Dung Bích Dao 0 lần, Phùng Mi Trang 0 lần, Diệp Linh Lung 0 lần, Đoan Mộc Uyển Nhi 0 
      AFTER : Lý Phương Hoa 0 lần, Mạnh Như Ý 0 lần, thêm 8 vị chưa quen biết
    
    j27 thiên điện (palace line)
      BEFORE: Lý Phương Hoa, Vân Tuyết Dao, Mạnh Như Ý
      AFTER : Lý Phương Hoa, Mạnh Như Ý, thêm 1 vị chưa quen biết
    
    j34 Ứng viên ghế phi
      BEFORE: Lý Phương Hoa, Vân Tuyết Dao, Mạnh Như Ý, Nhan Vân Khanh
      AFTER : Lý Phương Hoa, Mạnh Như Ý, thêm 2 vị chưa quen biết
    
    jgift dạo ngự hoa viên: thấy cả
      BEFORE: Lý Phương Hoa, Vân Tuyết Dao, Mạnh Như Ý
      AFTER : Lý Phương Hoa, Mạnh Như Ý, thêm 1 vị chưa quen biết
    
    jht kèm: cũng nhắm mối
      BEFORE: Lý Phương Hoa, Vân Tuyết Dao
      AFTER : Lý Phương Hoa, thêm 1 vị chưa quen biết
    
    jts Biếu quà làm lành
      BEFORE: Lý Phương Hoa, Vân Tuyết Dao
      AFTER : Lý Phương Hoa, thêm 1 vị chưa quen biết
    
    j42 Biết tư tình của
      BEFORE: Lý Phương Hoa, Vân Tuyết Dao
      AFTER : Lý Phương Hoa, thêm 1 vị chưa quen biết
    
    page errors 0

- Left as is (intended kit mask, one line per person): the join-result popup "Quý phi ???: có thiện cảm với ta hơn (…)" (per-person rows) and j67 goal text that names the arc's people (D47).

## Fault 2 — option hints overflow k3rows card: NOT present on main (no text change, no KIT REQUEST)
- Main's option card is min-height 128px and grows with content. opt-overflow-scan.js opens all 80 reign dialogs × sides (204 cards): 0 overflow at 755x1000@2, 1180x820@2, 1366x1024@2, 390x844@2. Negative control (cards forced to 70px) is caught, so the scan works. Other k3rows users: panel-size.js opens every PEND dialog, no content leaves frame.

## Tests (one at a time, built with assemble.py + build_site.sh)
reign.js PASS at 755x1000, 1180x820, 1366x1024, 390x844. panel-size.js 755x1000@2, 1180x820@2, 1366x1024@2, 390x844@2: 59 cases each, 0 page errors, no frame fault; only PEND:plantpick btnOut at 390x844, which is identical on main 399483e3 (pre-existing, not touched). Pane screenshot 755x1000 looked at.
Scans in repo: dev/test/unmet-names-scan.js, unmet-list-family.js, opt-overflow-scan.js.
Rollover: no handover needed, context low.
