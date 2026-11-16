# PROGRESS · review/face-84 (j88: kho 84 mặt nữ)

Nhánh dựng từ origin/main (KHÔNG dựa trên review/face-pick). j88.js là module cuối trong assemble.py. Chỉ có logic và dữ liệu:
không CSS, không HTML. Giao diện "chọn chân dung" là thành phần kit của chủ kit #2 (review/kit-2), gọi API dưới đây.

## Kho mặt
- 84 = 32 phi tần `consort:c01..c32` (FIGIX.consort) + 52 cung nữ `maid:m01..m52` (FIGIX.maid). Mã = `figKey` của j39 (`role:identity`).
- Đọc từ mọi FIGURES*.json qua j39 (đọc lại mỗi 5 phút). Tranh Part C (role `"maid"`, tier `"t1".."t8"` / `"cold"`, cùng identity `mNN`)
  tự nhập vào đúng mặt khi xuất hiện trong img/FIGURES-servants.json, không cần sửa mã.
- Bậc áo phi tần của bản ghi: tier số (tranh phi tần) hoặc `t1..t8`/`cold`. Bậc áo cung nữ `m0..m4` (Part A/B) và tier rỗng là áo cung nữ.

## Chọn ảnh theo bậc (không bao giờ ô trống)
- Người mặc áo phi tần (nàng khi là phi tần, mọi phi tần NPC): bậc = j66 `figTierOf` (Đáp ứng t1 … Hoàng hậu t8, lãnh cung `cold`).
  Lấy bậc phi tần gần nhất có tranh, rồi tuổi gần nhất; mặt cung nữ chưa có Part C thì về ảnh cung nữ gốc.
- Cung nữ (và nàng khi còn là cung nữ): chỉ áo cung nữ (tier rỗng; có `m0..m4` thì gần bậc cung nữ `srk`), không bao giờ áo phi tần.
- `figFor` của j39 được thay bằng bản chọn theo bậc này, nên mọi chỗ đang gọi `figFor/porOf/pv/pMe` tự theo.

## Gán mặt NPC
- Phi tần NPC (đầu game, tuyển tú, mọi `newRival`) rút từ phần còn trống của kho: mỗi người một mặt suốt đời, không trùng trong ván
  (`S.fidUsed`, có cả mặt của nàng qua j66). Phần mặt phi tần đi qua bộ chấm điểm cũ (dáng theo nết), mặt cung nữ rút đều.
- `F88_NEED_C = true`: mặt cung nữ chỉ vào lượt rút của phi tần NPC khi mặt đó đã có tranh áo phi tần (Part C), để không có phi tần
  mặc áo cung nữ ở phẩm của mình (luật 8 bậc áo = 8 phẩm). Part C về tới đâu kho NPC tự lớn tới đó, đủ 84 khi xong. Đặt `false` = dùng cả 84 ngay.
- Giữ lại một phần mặt cung nữ cho kẻ hầu chưa có mặt (`f88Reserve`: số cung nữ trẻ chưa có mặt + 4).
- Cung nữ thăng phi (`servRanks` j14 "lọt mắt xanh", `sendMaid` j8 "hầu thay"): phi tần mới nhận đúng mặt cung nữ cũ (`n.fid`, ghi thêm
  `n.fromMaid`), giữ tuổi, đổi sang tranh bậc phi tần (hoặc ảnh gốc khi chưa có Part C). Cung nữ chưa từng hiện mặt thì được gán ngay lúc thăng;
  thị nữ của NPC (không có mặt) nhận một mặt cung nữ còn trống.

## API cho thành phần kit
```js
facePool(filter, who)   // filter "all" | "consort" | "maid"; who = người mặc (mặc định nàng)
  // → [{id:"maid:m05", src:"maid"|"consort", n:5, por:"img/…", fig:"img/…", mine:bool, tiers:[1,2,…]}]
  //   thứ tự c01..c32 rồi m01..m52; por/fig đã theo bậc áo + tuổi hiện tại của `who`, đã lùi về ảnh có sẵn.
faceImg(id, who, kind)  // một ảnh: kind "por" (mặc định) | "fig"; "" chỉ khi mặt không có tranh nào
faceOn()                // true khi được chọn: thẻ "Thân phận kiếp này" đang mở (NLP), chưa Nhận thân phận
faceChoose(id)          // nàng lấy mặt id. Phi tần NPC đang giữ id nhận mặt cũ của nàng (đổi chỗ, vẫn không trùng);
                        // kẻ hầu đang giữ id bị xoá mặt, tự rút mặt cung nữ khác; ghi lại bản cuộn ctm-nextlife (d.pid, d.faces)
                        // để tải lại vẫn đúng. Chỉ để nhìn, không đổi chỉ số. Trả true nếu đổi; bên gọi tự vẽ lại (render() + bảng của mình).
F88_NEED_C              // xem trên
```
Đếm cho tab lọc: `facePool("consort").length`, `facePool("maid").length`. Mặt đang chọn: `S.pid` (hoặc `mine`).
Ghi chú cho người nối j86 vào kit-2: `fpOn/fpKeys/fpPor/fpSet` của j86 chỉ biết `FIGIX.consort`; thay bằng `faceOn/facePool/faceImg/faceChoose`.

## Save cũ
Không ghi đè gì. Save cũ (mặt `consort:*`, kể cả trước j66) mở bình thường; `S.pid` dạng `maid:*` được j88 nhận ở `figPick`.

## Đã thử (Playwright, máy chủ http, wrapper meta charset)
- 755x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2, 390x844@3, 1024x768@2: không lỗi trang, không tràn ngang, không chữ bị cắt
  (ellipsis/line-clamp) ở thẻ Thân phận, màn chơi, tab Phi tần, thẻ phi tần thăng từ cung nữ.
- facePool: 84/32/52, không mục nào thiếu ảnh. faceChoose('maid:m07'): S.pid đổi, ảnh nàng đổi, nằm trong fidUsed.
- Vào game: 12 phi tần + 19 kẻ hầu, không trùng mặt, không ai thiếu ảnh.
- Part C giả lập (chèn bản ghi t1/t2 + cold vào FIGURES-servants.json khi thử, không commit): t1→t1, t2→t2, muốn t5→t2 (gần nhất),
  lãnh cung→cold, kẻ hầu→ảnh cung nữ gốc; phi tần NPC rút cả mặt cung nữ (7/12 trong một lần thử).
- Thăng phi: servRanks và sendMaid ép thăng: phi tần mới giữ đúng mặt cung nữ cũ, không trùng.
- Save cũ: tạo save bằng bản main hiện tại, mở bằng bản này: đúng tên, đúng mặt nàng và 12 phi tần, không lỗi.

Ảnh chụp: dev/shots/face84/ (mỗi tệp một ảnh).
