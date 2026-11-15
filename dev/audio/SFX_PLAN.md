# Âm thanh sự kiện — kiểm kê và kế hoạch (review/sfx, 15/11)

Sếp: "Đã có âm thanh lúc mua bán, được tặng, được thưởng, được ban chưa? Tất cả âm thanh các sự kiện cần có của game — chắc còn sót."
Trước nhánh này (main cfd321e9): 14 tệp sfx (thiếu `sfx-thunder` mà j11 vẫn gọi → 404), chỉ ~12 chỗ gọi; mua, bán, quà, rương, quẻ, lật thẻ,
dấu son, qua buổi/tuần, bệnh, cấm túc, trò nhỏ, thú nuôi, thời tiết, lễ tết… đều im. Không nhánh review/* nào có âm mới (đã `git grep` cả
123 nhánh: không có kitGain/kitLose; review/game-feel có kitFx nhưng chỉ rung/hình, âm vẫn qua SFXN; review/gift-chest chưa có trên origin).

## Mã
- `dev/build/jsfx.js` (sau jplace, trước j84). MỘT bảng: **`SFXN`** (khoảnh khắc → tệp; j11 có 15 khóa, nay đủ mọi khoảnh khắc dưới đây),
  `SFXL` (tầng ui/sự kiện + chỉnh âm lượng từng tệp). `kitSfx(khoảnh khắc, {rate, g, at})`. `sfx()` cũ được thay bằng bộ trộn chung:
  - tôn trọng công tắc **Tiếng** (OPT.snd / OPT.mute) và thanh **Tiếng động** (OPT.sfx); tab ẩn thì im; bot / `quiet` thì im;
  - âm UI (chạm, tab, mở/đóng bảng, nút khóa, thao tác trò nhỏ) = ×0,5 thanh trượt; âm sự kiện ×1;
  - **tối đa 3 âm cùng lúc** (tính cả giọng j36): âm UI thứ 4 bị bỏ; âm sự kiện thứ 4 đẩy âm UI cũ nhất ra, không có thì bỏ;
  - cùng một tệp trong 90 ms chỉ kêu một lần (hai móc gặp nhau không kêu đôi); nhạc nền chỉ nén xuống dưới âm sự kiện.
- Tệp ở `audio/` trong git (dev/art/CDN.md: audio vẫn ở git, không lên Cloudflare → không cần cdn_sync). `audio/MANIFEST.json` có link Magnific.
- Chuẩn hóa: `dev/audio/norm.py` — cắt im lặng đầu/cuối, fade 3 ms / 80 ms, lọc >14 kHz (âm chuông/bạc sáng: thêm hạ treble −6 dB),
  cùng độ to **max momentary −16 LUFS** (BS.1770, cửa sổ 400 ms; khớp ffmpeg ebur128 ±0,2 dB), đỉnh ≤ −1,5 dBFS (limiter tối đa 12 dB
  cho tiếng gõ ngắn), mono 64 kbps. 14 tệp cũ chỉ chỉnh độ lợi (không cắt, heartbeat vẫn lặp được). Tệp lớn nhất 20 KB (≤ 40 KB).
- Kiểm: `node dev/test/sfx.js <url> 755x1000@2 out.json` (và 1180x820@2) — gọi từng khoảnh khắc trong game thật, ghi lệnh sfx (`KSFX.log`).

## Bảng: khoảnh khắc → âm (✓ có sẵn · ＋ mới) → chỗ gắn

| Nhóm | Khoảnh khắc | Âm | Gắn ở |
|---|---|---|---|
| Giao diện | chạm nút | ✓ sfx-tap (UI) | j11 click |
| | chuyển tab, lật trang sổ | ✓ sfx-page (UI) | j11 click #tabs, j79 nhóm tab, jbook `kitSheetTurn` |
| | mở thẻ / bảng | ✓ sfx-open (UI) | j11 showModal; `.kpanel/#kpop` thêm vào body |
| | đóng thẻ / bảng | ＋ sfx-close (UI) — vải lụa khép | `closeModal` khi không còn thẻ sau; `.kpanel` gỡ |
| | nút bị khóa | ＋ sfx-lock (UI) — gõ gỗ trầm | pointerdown trên nút disabled/.kdis (jfx lắc + lý do) |
| | tin ngắn (thẻ người khác được lật, quà tới) | ＋ sfx-notice (UI) — chuông tay nhỏ | `kitFlipNote`, hộp gấm/mâm hiện |
| Mua bán | mua đồ | ＋ sfx-buy — bạc rơi vào túi lụa | `buy(S,…)` |
| | đồ bay vào Tư trang | ＋ sfx-item-fly — vải lụa vút | `kitFlyItem` |
| | bán đồ, bán tác phẩm | ＋ sfx-sell — bàn tính + bạc trượt quầy | `sellItem`, `wkSell` |
| | được bạc | ✓ sfx-coin | j11 `apply` (bạc tăng) |
| | tặng đồ cho người | ＋ sfx-item-fly | `giveTo(S,…)` |
| | bị thu hồi / mất đồ / bị soát | ＋ sfx-item-lose — lụa sột soạt + dây tranh trầm | `takeItem(S,…)`; chữ trên thẻ (tịch thu, thu hồi, lấy mất, bị trộm, soát quà) |
| Ban thưởng | thánh ân (mọi `bestow`) | ✓ sfx-decree | j11 |
| | mâm sơn son: rung · mở khăn | ＋ sfx-chest-rattle (nhẹ) · sfx-tray-open | kmStage km-reward: lớp km-shake → km-open |
| | rương gỗ: rung · bật nắp | ＋ sfx-chest-rattle · sfx-chest-open | như trên |
| | rương rồng phượng (ngự tứ): bật nắp | ＋ sfx-chest-royal — then đồng + chuông lấp lánh | như trên |
| | hộp gấm (người tặng) | ＋ sfx-notice · sfx-chest-rattle · sfx-gift-open | như trên |
| | từng món bay ra | ＋ sfx-item-pop (khánh ngọc, cao dần theo món) | mỗi 180 ms một món |
| | món hiếm (Tuyệt phẩm, Ngự tứ) | ＋ sfx-item-rare | món t3/t4 |
| | đồng bạc nảy | ＋ sfx-coin-bounce | khi có bạc |
| | bấm Nhận | ＋ sfx-reward-take — hai nốt tranh | `.kmtake` |
| | kitGain / kitLose (review/gift-chest) | ＋ sfx-item-pop / sfx-item-lose | móc sẵn (bọc nếu hàm có), cần nối lại tên nếu nhánh đó đổi API |
| Phẩm vị | thăng phẩm, tấn phong | ✓ sfx-promote + ＋ sfx-edict-unroll + sfx-item-pop (chip mới) | j11 promoteP; kmStage km-edict |
| | giáng phẩm | ＋ sfx-gloom — cồng trầm + gió lạnh | kmStage km-gloom |
| | vào lãnh cung | ＋ sfx-gloom (+ sfx-door-shut khi chữ có "lãnh cung") | km-gloom; j11 goTo lc vẫn rắc tro |
| | ra lãnh cung, phục vị | ✓ sfx-decree | j14 |
| | cấm túc | ＋ sfx-door-shut — cửa gỗ khép, then cài | diff `S.confined` tăng; chữ "cấm túc" |
| | quỳ phạt | ＋ sfx-kneel — vạt áo + gối chạm đá | chữ trên thẻ/kết quả (phạt quỳ, quỳ ngoài sân…) |
| | đánh trượng, tát | ＋ sfx-cane — gậy gỗ hai tiếng trầm | chữ (trượng, đánh đòn, vả, tát); j11 punish vẫn rung |
| | bị phát giác, định tội, ban chết | ✓ sfx-expose · sfx-decree (verdict) | j11 |
| Đêm | lật thẻ thị tẩm (thẻ của nàng) | ＋ sfx-tablet-shuffle · sfx-tablet-flip (0,85 s, lúc thẻ lật) | kmStage km-tablet |
| | đêm thị tẩm | ✓ sfx-night | j11 nightFx |
| Quẻ | lắc ống xăm · que rơi | ＋ sfx-xam-shake · sfx-xam-drop (theo `--kd` của CSS: sau tờ lịch 1,3 s) | `kitXamPlay`; thẻ Gieo lại/Phật đường |
| | quẻ tốt · quẻ xấu | ＋ sfx-lot-good (chuông chùa nhỏ) · sfx-lot-bad (mõ) | theo LVB |
| Kết quả | dấu son THÀNH / BẠI | ＋ sfx-seal-stamp (lúc dấu chạm, 0,28 s) rồi sfx-win / sfx-fail | `kitResultFx` |
| | chữ trong thẻ kết quả | quỳ, trượng, cấm túc, mất đồ, bệnh, yến… (bảng SFXTXT) | như trên, 0,9 s |
| Thời gian | qua buổi (Sáng/Trưa/Chiều) | ✓ sfx-page (j11 curtain) + ＋ sfx-buoi-bell — khánh đồng | `kitDayShift` |
| | sang buổi Tối | ＋ sfx-night-watch — mõ canh + thanh la xa | `kitDayShift` khi buổi = B4L |
| | qua tuần | ＋ sfx-week-drum — trống cung + chuông, rồi sfx-page (lật lịch) | `kitCalendar` (dawn) |
| Nguy hiểm | việc nguy hiểm tìm đến | ＋ sfx-alarm — hai tiếng trống trầm; ✓ tim đập lặp | `kitAlarm`; j11 heartLoop |
| | trúng độc | ✓ sfx-poison | j11 |
| Thân thể | có thai | ＋ sfx-bloom — chuông gió | kmStage km-bloom |
| | sinh con | ✓ sfx-birth + ＋ sfx-bloom; ✓ vo-baby-cry | j11 birthP; km-bloom; j36 |
| | sảy thai, mất con | ＋ sfx-wither — chuông rơi trầm vào gió | diff `S.preg` mất mà không thêm con; chữ |
| | lâm bệnh · khỏi bệnh | ＋ sfx-sick (bát thuốc đặt xuống) · sfx-heal (rót trà + chuông) | diff `S.ill`/`S.sick`; chữ |
| | chết | ＋ sfx-death-bell — chuông chùa lớn | kmStage km-inkov |
| Trò nhỏ | đàn / mọi trò dùng nốt (kg82Pluck) | ＋ sfx-mg-pluck (đàn tranh; 5 cung = đổi tốc độ phát, không cần 5 tệp) · sfx-mg-miss | `kg82Pluck` (rơi về tiếng tổng hợp cũ nếu tệp lỗi) |
| | lời chấm trên bàn (Tuyệt!, Trúng, Trượt, Hết giờ…) | ＋ sfx-item-pop / sfx-mg-pluck / sfx-mg-miss | `kg82Pop` |
| | thao tác: cờ · thêu · khéo tay · vẽ · đầu hồ · bắn cung · nấu | ＋ sfx-mg-stone · sfx-mg-needle · sfx-mg-needle · sfx-mg-brush · sfx-mg-throw · sfx-mg-arrow · sfx-mg-fire | pointerdown/up trong `.kgbox` theo `kg82Play(kind)` (bảng SFXMG) |
| | học xong: giỏi / vụng | ✓ sfx-learn-good / sfx-learn-bad | j11 openMG |
| | bục vinh danh · nàng vào ba hạng đầu (bảng vàng hạng mới) | ＋ sfx-podium (cồng + chũm chọe nhẹ) · sfx-rank-new (trống lệnh + thanh la) | `kitPodiumShow` |
| Lễ, yến, khách | Tết Nguyên đán, Nguyên tiêu | ＋ sfx-firecracker (pháo xa) | diff `festToday()`; jfx kitFx("lantern") |
| | yến tiệc | ＋ sfx-banquet — chén sứ chạm + rì rầm | chữ trên thẻ (yến tiệc, dự yến, gia yến…) |
| | có người đến thăm | ＋ sfx-visitor — bước chân + gõ cửa | chữ (đến thăm, ghé thăm, có người đến) |
| | hảo hữu vào phòng (chơi hai người) | ＋ sfx-join — chuông gió cửa | COOP.state.seats[người kia].online false → true |
| Thời tiết | đổi sang mưa · gió/lá · tuyết/sương giá · giông | ＋ sfx-rain · sfx-wind · sfx-snow · sfx-thunder (tệp này trước 404) | diff `S.wx.n`; chạm chip `.kmwx` |
| Thú nuôi (review/pets) | mèo · chó · họa mi · sáo · vẹt · thỏ · cá · uyên ương · rùa · ngựa · công · hạc · cáo · chồn tuyết · hươu | ＋ sfx-pet-cat, -dog, -bird, -myna, -parrot, -rabbit, -fish, -duck, -turtle, -horse, -peacock, -crane, -fox, -weasel, -deer | bảng SFXPET (22 con jpet → 15 tiếng); `petAdd(S,…)` và chạm ảnh `pet-*.webp` / `[data-pet]` — móc sẵn, kêu khi jpet gộp |

## Giọng người theo NGHĨA của thẻ (sếp 15/11: "VIỆC · Có người đến", Đáp ứng Khương Lạc Anh trả lại quà "không dám nhận" mà phát tiếng CƯỜI)
Lỗi: j36 `voKind` chọn giọng theo từ rời — dòng `/tặng|nhận lời|tươi cười|vui lòng|cảm tạ|kết làm chị em/ → f-laugh` bắt chữ "tặng" trong
"trả lại quà ngươi tặng" (j68g, sự kiện nghi kỵ) → tiếng cười. Cùng kiểu lỗi đã rà và sửa:
| Lỗi cũ | Ví dụ | Cũ | Mới |
|---|---|---|---|
| "tặng" = vui | trả lại quà ngươi tặng, nhắn 'không dám nhận' | f-laugh | không giọng (tone cold) |
| "nhận lời / cảm tạ / vui lòng" = cười to | nàng nhận lời, cảm tạ | f-laugh | f-softlaugh (tone warm) |
| Hoàng thượng "vui/cười" không xét phủ định | Hoàng thượng **không vui** vì ngươi đến muộn | m-chuckle | m-grunt (phủ định → hostile) |
| Hoàng thượng "cười" gồm cả cười nhạt / cười khẩy | | m-chuckle | m-grunt (mocking) |
| mỉa mai, khiêu khích = giận | Hiền phi mỉa mai | f-angry | f-laugh (cười mỉa: chỉ đúng chỗ này) · khiêu khích, hạ nhục vẫn mocking |
| buộc tội, sầm sập kéo đến, chất vấn = không giọng hoặc cười | {A} sầm sập kéo đến, buộc tội ngươi | (không/cười nếu có "tặng") | f-angry |
| Thái hậu lạnh lùng / không nhận | | old-hmph | old-hmph (giữ) |
| "đánh" = khóc (bắt cả "đánh cờ", "đánh đàn") | | f-cry | chỉ "bị đánh / đánh đòn / trượng" |
| con cái "vui" cả khi thẻ buồn | | child-giggle | chỉ khi tone vui/ấm/trung tính |
Cách mới (j36): `voTone(chữ thẻ)` → shock · gossip · hostile · mocking · sadStrong · cold · sad · joy · warm · neutral (thứ tự ưu tiên; phủ định
"không vui/chẳng mừng…" = hostile), rồi bảng `VOMAP` theo người nói (Hoàng thượng / Thái hậu / nữ). Cười to chỉ cho joy (vui mừng, hớn hở,
tươi cười, kết làm chị em…) và mocking của phi tần; warm = cười khẽ; cold, neutral = không giọng (thẻ vẫn có tiếng mở nhẹ sfx-open).
Âm sự kiện theo chữ (jsfx `SFXTXT`) không bao giờ là giọng; đã sửa hai chỗ bắt nhầm: "tát" (Bồ tát), "trượng" (trượng phu), bỏ "thu lại".
Kiểm: bước "giọng người theo nghĩa thẻ" trong dev/test/sfx.js (11 thẻ thật/mẫu, gồm đúng câu sếp gặp).
Giọng tính vào giới hạn 3 âm.

## Rà từng tệp giọng: nghe có đúng nghĩa không (sếp 15/11: tiếng KHÓC ở "Có người đến" nghe như CƯỜI)
Không có loa: ghép 27 tệp vo-* thành một video có số thứ tự, cho mô hình nghe (Magnific video_analyze, Gemini) mô tả từng đoạn "là tiếng gì,
có dễ nghe nhầm thành cười không"; mỗi tệp thay mới chỉ nhận khi được chấm khóc 5/5 / nhầm cười 1/5 (hoặc giận / hừ 5/5). Lỗi gốc:
`vo-f-cry-2` bị nghe là "stifled giggling" (khóc 1/5) — đúng tiếng sếp nghe thấy (thẻ có chữ "khóc"/"bị phạt" → f-cry → ngẫu nhiên tệp 2).
| Tệp | Nghĩa | Nghe thấy (trước) | Kết quả |
|---|---|---|---|
| vo-baby-cry-1, -2 | trẻ sơ sinh khóc | trẻ khóc | OK |
| vo-child-laugh-1, -2 | trẻ cười khúc khích | trẻ cười | OK |
| vo-crowd-gasp-1 | cả đám kinh hãi | tiếng gầm/rên trầm (nhầm) | THAY (đám đông hít sững "ah!", 4/5) |
| vo-crowd-gossip-1, -2 | xì xào | thì thầm | OK |
| vo-f-angry-1, -2 | nữ giận, hừ | tiếng hít / thở dài (không ra giận) | THAY cả hai (cười khẩy hừ giận, 5/5) |
| vo-f-cry-1 | nữ khóc | khóc 4/5 | THAY (thút thít nghẹn, 5/5, nhầm cười 1/5) |
| vo-f-cry-2 | nữ khóc | **cười khúc khích** (khóc 1/5) | THAY (nấc nghẹn rồi khóc than, 5/5, nhầm cười 1/5) |
| vo-f-gasp-1, -2 | nữ hốt hoảng | hít sững | OK |
| vo-f-laugh-1, -2 | nữ cười | cười | OK |
| vo-f-laugh-soft-1, -2 | nữ cười khẽ | cười khẽ | OK |
| vo-f-sigh-1, -2 | nữ thở dài | thở dài | OK |
| vo-m-angry-1, -2 | Hoàng thượng phật ý | gằn giọng / "hừm" | OK |
| vo-m-laugh-1, -2 | Hoàng thượng cười trầm | cười trầm | OK |
| vo-m-sigh-1, -2 | nam thở dài | thở dài | OK |
| vo-old-f-hmph-1, -2 | Thái hậu hừ không vui | "ừm" lửng lơ (dễ nhầm đồng ý) | THAY cả hai (hừ mũi nghiêm, 5/5) |
Tệp mới: Magnific ElevenLabs, mono 64 kbps, loudnorm −20 LUFS như bộ cũ; id ở dev/audio/gens.tsv. Tên tệp giữ nguyên (VOICES.json không đổi).

## Sau khi gộp
- review/game-feel (jfx): thứ tự `… jplace, jfx, jsfx, j84`. jfx bọc `feedback` và tự gọi `sfx(SFXN[k])` → vẫn đi qua bộ trộn này. kitFx
  không phát âm (đúng: âm đã gắn ở kmStage/feedback); chỉ `kitFx("lantern")` thêm pháo nhỏ. Nút khóa: jfx lắc + rung, jsfx gõ.
- review/gift-chest: nếu API là `kitGain`/`kitLose` thì đã có tiếng (móc bọc lúc render đầu); tên khác → thêm một dòng `W("tên",…)` trong jsfx.
- review/pets: không phải làm gì (petAdd + ảnh pet-*.webp).

## Tạo âm (Magnific audio_sfx_generate, ElevenLabs) — 72 tệp, 490 tín dụng
Phong cách: cung đình cổ trang nhẹ (đàn tranh, chuông đồng nhỏ, khánh, mõ, vải lụa, gỗ), 1–2 s gốc, cắt còn 0,24–2,0 s.
Link từng tệp: `audio/MANIFEST.json` (`magnificUrl`). Kết quả đo (sau chuẩn hóa) và kiểm Playwright: `dev/audio/RESULT.md`.
