# mg-allkinds — report (worker, ROOT-74 lane) — branch review/mg-allkinds @ 5b07ad6e
PRIORITY #1 CHECK: OD 20/11 ~08:40Z (L2035) AND ~08:45Z (L2036, OVERWRITES it) | main jmkt.js:164, jtoil toilMakeup | review/* none | claims row mg-allkinds.
START_CTX ~5 % (small session); no rollover needed.

## What changed vs the brief
Brief part (1) (add Điểm trang «Trước gương đồng» to Thử tay) was CANCELLED by the owner OD 20/11 ~08:45Z (L2036, verbatim): wait for the character faces, she tests it later.
So NOT added. Part (2) (scan) done. Only code change: new guard test `dev/test/mg-allkinds.js` (no game code, no numbers, no UI, no shots needed — nothing visible changed).

## Scan table (game | file | in KG82_KIND before? | added? | why not)
| Game | File | In KG82_KIND? | Added? | Why not / note |
|---|---|---|---|---|
| 31 kinds (dan hat co dauho ban tho doi doden ve hoa theu kim mua banh huong td_cong td_dung td_ngon td_hanh chai le tc xa thq hoadien duho den tat ne kinh may) | j82/j91/j92/jhd/jlant/jnwp/jnwq/jslap/jtd/jts/jwkg | yes | – | all 31 listed by Thử tay, all open the kit rules screen + «Hướng dẫn» |
| Dán hoa điền / Chải chuốt (Điểm trang pieces) | jhd / j92 | yes (hoadien, chai) | – | already calibratable |
| Điểm trang «Trước gương đồng» — HELD BY OWNER (morning mirror, hội phối đồ sit) | jtoil toilMakeup, jmkt tsMkSit | no | NO | owner OD 20/11 08:45Z: waits for faces; flip `ARTS["Điểm trang"]` in the test when she says |
| Cờ real board `gKy` + gCam gHoa gVu | j5 | no (old lesson fallbacks) | – | DEAD: `KG82_MGL` (j82:556) overwrites MG[cam/ky/hoa/vu] with kinds dan/co/ve/mua at every open; verified at runtime (test 3). Live Cờ = kind `co`, already in Thử tay. Dead code can be deleted later (not done: out of scope) |
| Nghe ngóng / Truyền lời / Mặc cả / Thời cơ (sgNghe sgTruyen sgMac sgThoiCo) | jsgame | no | no | intrigue acts: score shifts one act's odds step vs a target, no NPC rival plays them → no hand to calibrate; already have kgReady rules + guided round |
| Nghiệm thân (Lén…, Giọt máu) | jroute | no | no | one-off gate vs the Emperor, no NPC hand; own kgReady rules + guide |
| Phối đồ (dress contest board) | jts | no | no | item picking, no skill hand; its skill games duho / den are kinds |
| Khảo hạch / Thử tay / tuyển chọn frames | jexam, jmgcal, jentry | wrappers | – | they run the kinds above |

## Tests (main 2ec6062e merged into branch, run on assembled index.html)
- `node dev/test/mg-allkinds.js index.html` → PASS 7/7 (31 kinds = 31 in Thử tay, no orphan engine, every kind rules + Hướng dẫn, j5 shadowed, art-label guard, makeup deliberately outside, no errors)
- `node dev/test/ag-mgcal.js index.html` → all ok incl. 5b (every kind starts its board) and 5c
- mg-ready-guide: running at report time; result sent to main if it differs.
- ✕ per kind: NOT asserted — the ✕ is mg-back's (review/mg-back not on main yet); merge main again once it lands.
- No Fold/iPad shots: no visible change.

## ~100 % scan done / Điểm trang waits for the owner.
