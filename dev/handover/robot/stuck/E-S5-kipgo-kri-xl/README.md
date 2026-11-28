# E-S5 — gift picker on Pages 166bd0a3 (kit-kri-xl, ancestor of 786f65ad per C10), speed-1 first dump (28/11 ~09:10Z)
PRIORITY #1 CHECK: C10 order (item-grid dump + elementFromPoint + who requests /cung-tuong-mong/%23n); probe = robot-rt-probe.diff (dump hook at every chooser open + page 'request' logger for «%23n»).
Life: speed-1 (pf/pt_su, Fold, bold, seed 2289644890), resume=1, ckpt pin cleared, LIVE 166bd0a3 (page build ab73feec1114), buổi 111, picker «Biếu quà làm lành» opened by «Đồ trong rương · TỐN món đồ 1 (rẻ nhất bán được …)».
## Grid dump (speed-1-kipdump.jsonl)
- 3 items, NONE locked: «Áo gấm thêu hải đường» (Thường, Y phục · Mặc: Sắc +4, Danh +1) — already selected (class kipc on), «Vòng vàng xoắn xâu ngọc» (Trân phẩm, Đeo tay: Sắc +3, Danh +2), «Ngọc bội hồ điệp» (Tinh phẩm, Đeo eo: Danh +2). No lock text, aria-disabled null, all visible.
- Confirm button.kbtn.kipgo «Biếu»: ENABLED (dis=false), ON SCREEN (rect 342,935,304,40 in a 755×1000 viewport), elementFromPoint at its centre = the button itself → reachable.
- elementFromPoint(378,538) (the harness area-tap point) = div.kri-t.kri-front → div.kri-ring → div.kscn.kri → body.kdlg-on.kring-on. kri-t.kri-front is the CENTRED, SELECTED item card of the new ring carousel (rect 316,414,124,134, pointer-events auto, visibility visible, opacity 1, text «Thường»): a REAL, VISIBLE card — not an invisible layer. The other two ring cards are the side items (opacity 0.74). See speed-1-kipdump-111.png: carousel with ‹ › arrows, the centred «Áo gấm thêu hải đường» card, hint «Vuốt để xoay · chạm món sáng để xem», «Kéo xuống», big «Biếu» button at the bottom.
- So the harness' AREA BLOCKED lines («hit=button.opt.ka.kodw … top0=div.kri-t.kri-front») are the harness's blind area-tap landing on the visible ring card — a harness false positive on the new carousel, not a game dead-zone.
## Did a gift GET given?
harness counters on this life after the probe restart: kipGo=1 (the confirm «Biếu» was really tapped once), the picker did not re-open in a loop (buổi 111 → 127+ in ~10 min). The result toast «đã biếu …» itself was not captured by the harness (no hook) — the relation/item change should be checked on the next hit (speed-3 in progress).
## %23n (speed-1-req23n.jsonl)
GET https://thientran2711.github.io/cung-tuong-mong/%23n · resourceType image · initiator frame = main page · NO element with src/href/srcset/style containing «#n» in the DOM at that moment (init: []) → created transiently (new Image() / CSS url set then removed), or a template with an unresolved «#n» placeholder; found at buổi 110. The element is still unidentified.

## UPDATE 28/11 ~10:10Z — greedy-5 (Fold bold 1250053385, b2330–2346, Pages 166bd0a3, probe harness): the confirm IS sometimes COVERED
6 chooser openings (all opened by «Đồ trong rương», dialog «Biếu quà làm lành», viewport 755×1000). greedy-5-kipdump.jsonl:
| buoi | items | confirm «Biếu» | element on top at the confirm's centre | at (378,538) | gift? |
|---|---|---|---|---|---|
| 2330 | 10 | enabled, rect 35,845,685,40 (on screen) | **DIV.kscn-veil** (covers it) | div.kri-t.kri-front (ring) | none — same 10 items next time |
| 2333 | 10 | same | **DIV.kscn-veil** | same | none |
| 2334 | 10 | same | **DIV.kscn-veil** | same | none |
| 2342 | 10 | same | **BUTTON.kbtn.alt.kri-back** (a «back» button of the ring detail pane covers it) | div.kidet.kidet-inline | none |
| 2345 | 8 (Áo gấm hoa mai gone) | enabled, 35,845,685,40 | BUTTON.kbtn.kipgo (hit) | span.kshn in div.kshc.kshpick.kipc (grid tile) | GIVEN |
| 2346 | 6 (Hoa điền hoa đào gone) | enabled, 342,935,304,40 | BUTTON.kbtn.kipgo (hit) | div.kshg.kipg (grid) | GIVEN |
Reading: the picker has two layouts: RING mode (wide confirm 685 px at y=845; the front card kri-t.kri-front at the screen centre) where the confirm's centre is covered by DIV.kscn-veil (b2330/33/34) or by the ring-detail «kri-back» button (b2342) → a real tap on «Biếu» would hit the veil/back button, not the confirm; and GRID mode (kipg) where the confirm is topmost and works (items vanish at b2345/2346 = gifts really given). The 3 «no gift» visits are exactly the ring-mode ones. speed-1 (viewport 755×1000 too) was grid-mode with the confirm topmost, which is why its gifts worked. PNGs: greedy-5-kipdump-2330-veil.png (blocked), greedy-5-kipdump-2346-ok.png (works).
%23n: logged at b2328, same shape (image, main frame, no DOM element with «#n»).
