# E-S4 iPad «Phụ tuyến · Đổi ơn … · Lời nhờ» option-card tap gap (R5-cautious-4 ipad, seed 3966232191, game buổi 125)
- stuck-6-save.json / stuck-6-dump.json = the game's localStorage at the stuck moment (key hclh-save-v2-1 in dump.ls).
- probe.js = Playwright hand probe (iPad 1180x820 @2, touch): loads the dump's localStorage into a fresh context, «Một mình → Tiếp tục kiếp này», finds the dialog, logs elementFromPoint at each card centre, then touchscreen.tap at the «Nhận lời» card centre. Result 26/11: tap at the card centre advances the game (opens «BÁO · Đại án vu cổ»); nothing overlays the cards.
- Harness (b4b181f8 / 8dc395ba) tap markers landed on the left figure column (≈224,377 / 90,567), not on the cards (≈550,550 / 860,550). Screenshot (not in git): /home/user/wt/e-s4-out/shots-E-S4-R5-cautious-4-ipad/now.png.
- Run: node probe.js <dump.json>  (requires playwright).
