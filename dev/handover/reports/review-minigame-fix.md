# review/minigame-fix — report (worker MINIGAME-FIX, 24/11)
PRIORITY #1 CHECK: read OD 24/11 ~22:02Z items 2+6; reused existing kit rules block (j82 kgReady «Luật chơi», kg82Rows, kg82Btn) and kitFocus play layer; no new kit part (KIT OK not needed).
Branch review/minigame-fix = 7d21d04fff6b387dbdae6e6ce3c500aa78009489 (base origin/main 502c48c9). Files: dev/build/jdfv.js, j82.js, jbal2.js, tests, rebuilt index.html/sw.js.

## (6) Mystery mini-game
- Cause: the ✗/✓ field is the real «Lời hay» engine (jdfg words; hỏi thăm / nương tựa …) started instantly with no rules; skip button read «Làm luôn · không chơi: như thường».
- Fix (jdfv.js dfIntro + DF_RULE): ALL 7 on-figure engines (swipe tug bow drag ear words stare) first show a kit card «Luật chơi · <move>» with rows Việc / Chạm / Được and kit button «Sẵn sàng»; nothing runs, no clock until Sẵn sàng. Skip = «Bỏ qua · kết quả thường, không tính phần» (shown on the intro too). ◂ = cancel, no act.
- ✗/✓ confirmed real pieces (✓ green = good words +2, ✗ red = wrong −2); rule row says so.
- Not changed: the NPC dodge (slapGame) — a hand is already coming at her, rules would be wrong there; its skip button gets the new wording.
## (2) Mirror
- Cause: kg82Open drew the frame at once; board painting + her figure loaded async → empty mirror seconds.
- Fix (j82.js kg82Veil, BAL.mgVeilMs=1500): every kg82Open frame (whole family of kg82 mini-games: Điểm trang/chải chuốt, lessons, contests…) stays visibility:hidden until all its <img> + the kind's board picture are decoded, capped at 1.5 s so a slow picture never traps her.
## Tests
- dev/test/minigame-fix.js (new): each engine's rule text exists (no %), intro shows before game & Sẵn sàng starts it, veil hidden→shown→never trapped; Fold 755x1000 + iPad 1180x820: ALL OK. duodo-focus-view.js (updated 2a) ALL pass; duodo-focus-games.js ALL OK; build_site ok.
- Shots LOOKED at: Fold + iPad intro card (legible paper card centered, Sẵn sàng + Bỏ qua visible) and play field. Pictures were blocked in the sandbox (CDN), so figure/mirror art not visible in shots; veil verified by test.
## Not done / for MAIN
- No old-save/quickcheck run beyond the two duodo tests (no save-format change). Items 1,3,4,5 of the same OD row are other workers'.
~70% xong / ~70% chơi được (items 2+6 only).

## ROUND 2 (MAIN 128 asks) 
Shots (real CDN art via proxy, Fold + iPad) at https://ctm-img.victoria-tntt.workers.dev/img/_review/minigame-fix/ : {fold,ipadAir}-diemtrang-intro, -mirror-40ms / -300ms / -1500ms (her face already in the mirror at 40 ms), -loihay-intro, -loihay-play (✓/✗ real pieces over the person).
Điểm trang real fix (jtoil.js): toilOpen warms her portrait (decode) while rules/dress pick; toilMakeup veils the board until her face is decoded (cap BAL.mgVeilMs). j82 kg82Veil still covers every kg82Open frame (seen: frame absent at 40 ms, whole board at 300 ms).
### Family table (dev/test/minigame-family-scan.js, dynamic: playArt per KG82_KIND)
| game family | Luật chơi intro | Sẵn sàng | skip wording | decode-first |
|---|---|---|---|---|
| 39 kg82 kinds (Đàn Hát Cờ Đầu hồ Bắn cung Thơ Câu đối Thắp đèn Vẽ Cắm hoa Thêu Khéo tay Múa(Lục yêu…) Nấu ăn Điều hương Công Dung Ngôn Hạnh Chải chuốt Lễ nghi Trị cung Xử án Thái hậu hỏi Dán hoa điền Du hồ Hoa đăng Tát Né Chép kinh May áo Nghe ngóng Truyền lời Mặc cả Thời cơ Chải lông/Chơi thú Tưới cây Cờ năm quân) | yes (scan ALL OK 39/39) | yes | «Để trời định / Học nhanh …» + sub «tính 5/10»/odds (kitQuick, plain) | yes (kg82Veil) |
| contests / Thử tay / khảo hạch / tuyển tú (jexam jentry jmgcal startContest) | yes (kgReady) | yes | «Để tài nghệ quyết định · màn thi tính N/10» | yes |
| Điểm trang mirror (jtoil) | yes | yes | kit quick | yes, face decode added (was the empty mirror) |
| scheme games jsgame, pet/shelf care, Nghiệm thân jroute, jtd, jts | yes (kgReady) | yes | kit quick | yes (kg82Open) |
| Dư đồ on-figure 7 engines (jdfv) | ADDED this branch | ADDED | «Bỏ qua · kết quả thường, không tính phần» | n/a (kitFocus layer) |
| NPC dodge (slapGame in focus) | no — a hand is already coming | no | new wording only | n/a |
| Phối đồ picker (jts tsDressGame), Giọt máu (jroute rtNgScene) | no intro: a picker / a no-input animation | n/a | n/a | veiled (kg82Open) |
