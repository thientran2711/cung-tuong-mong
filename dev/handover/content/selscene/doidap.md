# SELSCENE — ĐỐI ĐÁP tests (SELW-TESTS; owner OD 23/11 ~22:36Z / ~22:40Z; brief M112 ADDENDUM 8/10)
PRIORITY #1 CHECK ('đối đáp hành xử tuyển tú'): OD 2 (23/11 ~22:36Z/~22:40Z) | main 0 | review/* 0 | claims SELW-TESTS row (this session).
Status: DRAFT-1, 44 entries. Format = **PROVISIONAL §8 format** (HIST-TUYENTU §8 was not pushed when this was written; MAIN/SELSCENE: tell me the §8 field names and I convert with `dev/handover/content/selscene/tools/` script in one pass — the data is regular, so it is a mechanical rewrite). Vietnamese player lines = cổ trang (VANPHONG: thần thiếp / trẫm / ai gia / bổn cung / nô tỳ; no %, no modern words, no trivia).

## FORMAT (machine-readable, one block per entry)
```
### DD-nn [K|D] royal=<hoangthuong|thaihau|hoanghau|noivu> V=<1|2|3> rank=<min origin rank 0..3>
ask: "royal's spoken question (cổ trang)"
rise: law-5 note — what changes as origin rank climbs (English)
- <id> | <stance label> | "her spoken answer" | G=<fx> L=<fx> | like=<nết,..> | dislike=<nết,..>
```
- `[K]` = grounded in real palace custom/records (plausible, not a quoted case); `[D]` = drama staging (Chân Hoàn / Diên Hy style). Nothing here is a fact question; every way is a **stance/tone**, never right-vs-wrong.
- `royal` picks WHO asks. `like` / `dislike` are keys of THAT royal's nết, so "which way pleases" changes per life with the royal's nết: Hoàng thượng = ETRAITS keys (danghi, mesac, trongtai, hieuthao, nongnay, nhantu, chamchinh, datinh, lanhlung; j1.js:58); Thái hậu = TH_ARCH keys (tuai, nghiem, danghi, quyen, phat; jtrong.js:32); Hoàng hậu and Nội vụ phủ ma ma = BAL.net.F nết names (Tính tình / Lòng dạ / Chí hướng; jbal2.js:923). A way whose `like` hits one of the royal's nết = **pleased**; hits `dislike` = **displeased**; neither = **neutral**.
- **Scoring rule (all numbers BAL, law 4; nothing typed here):** pleased → entScore raw `BAL.sel.sc.up` and thiện cảm with that royal `BAL.sel.tc.up`; neutral → `BAL.sel.sc.mid` / `BAL.sel.tc.mid`; displeased → `BAL.sel.sc.dn` / `BAL.sel.tc.dn`. (Proposed BAL keys, SELSCENE to create in jbal2.js; the three levels average out so no pick is a sure win.)
- **Gain AND loss (laws 2/3):** every way also carries a fixed `G` (gain) and `L` (loss) from the currency list below, magnitude `BAL.sel.v[V]` for BOTH, same V for all ways of the entry ⇒ equal value; no way is cost-only. `G` ≠ `L` always.
- Currencies = BAL keys `BAL.sel.fx.<name>`: `danh` (Danh) · `duc` (Đức) · `bac` (bạc) · `tamco` (Tâm cơ) · `sung` (Sủng, small) · `quen` (a bond mark with a real round-mate NPC, law 6b) · `oan` (a grudge mark from a real NPC) · `mama` (the narrator ma ma's regard) · `tin` (trust of the Nội vụ phủ chief ma ma) · `phuc` (Thái hậu's "phúc tướng" regard).
- `rank` = lowest origin rank (0 = thấp: tội thần/nhà buôn/thầy đồ; 1 = cung nữ sủng/tướng quân; 2 = Tể tướng/cháu Thái hậu; 3 = hòa thân) at which the entry may appear; `rise` says how it hardens (law 5, via BAL.entry.w ease).

---
## HOÀNG THƯỢNG (14)

### DD-01 [D] royal=hoangthuong V=1 rank=0
ask: "Ngẩng đầu lên. Vì cớ gì ngươi muốn vào cung?"
rise: rank≥2 the Emperor adds "cha ngươi có dặn gì không?" (second ask, BAL.entry.w ease).
- a | Thật lòng thưa | "Thần thiếp không dám giấu, vào cung vì phụ mẫu và vì ngưỡng mộ thiên nhan." | G=duc L=sung | like=hieuthao,nhantu | dislike=datinh
- b | Khiêm tốn nhún mình | "Thần thiếp tài mọn, chỉ mong được hầu hạ dưới tay Hoàng thượng, an phận làm bổn phận." | G=mama L=danh | like=lanhlung,danghi | dislike=trongtai
- c | Nói chí lớn | "Thần thiếp muốn làm người có ích cho Hoàng thượng, bàn việc nặng nhẹ, không chỉ để ngắm hoa." | G=danh L=oan | like=chamchinh,trongtai | dislike=hieuthao
- d | Cười duyên đáp lại | "Hoàng thượng hỏi thế, thần thiếp biết nói thế nào? Có lẽ vì muốn được thấy người." | G=sung L=duc | like=mesac,datinh | dislike=chamchinh,lanhlung

### DD-02 [D] royal=hoangthuong V=1 rank=0
ask: "Trẫm thấy ngươi đứng đây lâu, chân có mỏi không?"
rise: rank≥2 followed by "nếu mỏi, ngươi có dám nói?" (tests spine, BAL.entry.w).
- a | Chịu đựng | "Thần thiếp đứng quen rồi, không dám kêu mỏi trước mặt Hoàng thượng." | G=duc L=tamco | like=nongnay,lanhlung | dislike=nhantu
- b | Thưa thật | "Có hơi mỏi, nhưng nhìn thấy thiên nhan thì quên đi cả." | G=sung L=mama | like=datinh,mesac | dislike=danghi
- c | Chuyển đề tài | "Thần thiếp mải ngắm mẫu đơn ngoài hiên, quên cả mỏi, xin Hoàng thượng thứ tội." | G=tamco L=duc | like=trongtai,danghi | dislike=nhantu
- d | Hỏi lại ngài | "Hoàng thượng đã ngồi từ sáng, e long thể mới là điều đáng lo, thần thiếp chỉ là kẻ nhỏ mọn." | G=danh L=bac | like=nhantu,hieuthao | dislike=nongnay

### DD-03 [D] royal=hoangthuong V=1 rank=0
ask: "Nếu trẫm cho ngươi chọn một thứ ở trên bàn này, ngươi lấy gì?"
rise: rank≥1 the table holds objects of bigger value; rank 3 the Emperor presses "vì sao không lấy thứ đắt hơn?".
- a | Lấy thứ nhỏ nhất | "Thần thiếp xin cây bút lông nhỏ này, đủ để viết thư về cho phụ mẫu." | G=duc L=bac | like=nhantu,hieuthao | dislike=mesac
- b | Lấy thứ đắt nhất | "Thần thiếp xin ngọc như ý này, vì đẹp thì ai chẳng muốn." | G=bac L=danh | like=mesac,datinh | dislike=lanhlung,chamchinh
- c | Không lấy | "Thần thiếp chỉ xin được ngắm, đồ của Hoàng thượng đâu phải thứ thần thiếp dám nhận." | G=danh L=sung | like=danghi,lanhlung | dislike=datinh
- d | Hỏi lại ý ngài | "Hoàng thượng đã sẵn ý, thần thiếp xin theo ý ngài ban cho." | G=mama L=tamco | like=hieuthao,nongnay | dislike=trongtai

### DD-04 [K] royal=hoangthuong V=2 rank=1
ask: "Nghe nói nhà ngươi nhiều người làm quan. Ngươi nghĩ quan lại nên trọng điều gì?"
rise: rank≥2 the question names her own father's office; rank 3 asks about the tributary state.
- a | Trọng chữ trung | "Làm quan trước hết phải trung với Hoàng thượng, mọi điều khác đều sau." | G=danh L=tamco | like=danghi,hieuthao | dislike=trongtai
- b | Trọng dân | "Quan lại nên nhớ mình ăn lộc từ dân, dân no thì nước mới yên." | G=duc L=oan | like=nhantu,chamchinh | dislike=nongnay
- c | Trọng tài | "Quan trước hết phải có tài, người vô năng ngồi chỗ cao chỉ hại thêm cho nước." | G=tamco L=danh | like=trongtai,chamchinh | dislike=hieuthao
- d | Từ chối bàn việc nước | "Việc triều chính, nữ nhi như thần thiếp không dám bàn, chỉ xin nghe Hoàng thượng dạy." | G=mama L=sung | like=lanhlung,nongnay | dislike=chamchinh

### DD-05 [D] royal=hoangthuong V=1 rank=0
ask: "Người ta nói ngươi có dung mạo hơn người. Ngươi tự thấy thế nào?"
rise: rank≥2 the Emperor adds "nếu có người đẹp hơn ngươi đứng cạnh?".
- a | Nhún nhường | "Dung mạo là của trời cho, thần thiếp không dám nhận lời khen quá sức." | G=duc L=sung | like=nhantu,lanhlung | dislike=mesac
- b | Thẳng thắn | "Thần thiếp tự biết mình không xấu, nhưng sắc đẹp nhất thời, chỉ có đức mới ở lâu." | G=danh L=oan | like=trongtai,hieuthao | dislike=datinh
- c | Cười chịu khen | "Được Hoàng thượng khen, thần thiếp mừng, ngày nào cũng soi gương cho xứng." | G=sung L=duc | like=mesac,datinh | dislike=lanhlung,hieuthao
- d | Đưa đẩy khéo | "Thần thiếp thấy mình bình thường, còn lòng người mới đáng soi." | G=tamco L=bac | like=danghi,chamchinh | dislike=nongnay

### DD-06 [D] royal=hoangthuong V=2 rank=1
ask: "Trẫm hỏi ngươi: giữa nhà và cung, ngươi bỏ bên nào?"
rise: rank≥2 the Emperor says "cha ngươi nghe lời ấy sẽ nói gì?".
- a | Chọn cung | "Đã vào cung thì thần thiếp là người của Hoàng thượng, nhà chỉ còn trong lòng." | G=sung L=duc | like=mesac,datinh | dislike=hieuthao
- b | Chọn nhà | "Nhà là gốc, thần thiếp không dám quên, nhưng có phận ở cung thì sẽ giữ tròn bổn phận." | G=duc L=sung | like=hieuthao,nhantu | dislike=datinh
- c | Không bỏ bên nào | "Thần thiếp mong giữ cả hai, nhà yên thì cung mới yên, xin Hoàng thượng chỉ giáo." | G=tamco L=danh | like=danghi,chamchinh | dislike=nongnay
- d | Xin không đáp | "Câu này thần thiếp xin để lòng đáp, nói ra thành đắc tội." | G=mama L=bac | like=lanhlung,danghi | dislike=trongtai

### DD-07 [D] royal=hoangthuong V=1 rank=0
ask: "Có người nói ngươi hay khóc. Có thật chăng?"
rise: rank≥2 asks "nếu bị phạt oan, ngươi có khóc?".
- a | Nhận thật | "Thần thiếp vốn mềm lòng, nghe chuyện thương tâm thì không cầm được nước mắt." | G=duc L=tamco | like=nhantu,datinh | dislike=nongnay,lanhlung
- b | Chối khéo | "Không phải thế, thần thiếp chỉ khóc khi có việc đáng khóc." | G=tamco L=duc | like=danghi,lanhlung | dislike=nhantu
- c | Cười xòa | "Lời đồn thôi, Hoàng thượng đừng để ý, nay thần thiếp đang cười đây ạ." | G=sung L=danh | like=mesac,datinh | dislike=chamchinh
- d | Hỏi nguồn tin | "Là ai nói với Hoàng thượng vậy ạ? Thần thiếp muốn tạ ơn người đã để mắt tới mình." | G=danh L=oan | like=danghi,nongnay | dislike=nhantu

### DD-08 [K] royal=hoangthuong V=2 rank=1
ask: "Ngươi thích đọc sách gì?"
rise: rank≥2 the Emperor asks her to name one thing she learned from it (no quiz, only taste).
- a | Kinh sử | "Thần thiếp thích sách sử, xem người xưa thành bại để biết lòng người." | G=tamco L=sung | like=trongtai,chamchinh | dislike=mesac
- b | Thơ từ | "Thơ từ làm lòng nhẹ đi, thần thiếp thích những câu về trăng và nước." | G=sung L=danh | like=datinh,mesac | dislike=chamchinh
- c | Sách đức hạnh | "Thần thiếp chỉ đọc Nữ giới và những sách dạy làm người, cho an lòng phụ mẫu." | G=duc L=tamco | like=hieuthao,nhantu | dislike=trongtai
- d | Không đọc nhiều | "Thần thiếp học chữ không nhiều, thích nghe người khác kể chuyện hơn." | G=quen L=danh | like=nongnay,datinh | dislike=trongtai

### DD-09 [D] royal=hoangthuong V=2 rank=1
ask: "Nếu trẫm sai ngươi làm một việc mà ngươi cho là không phải, ngươi sẽ làm sao?"
rise: rank≥2 adds "nếu việc ấy hại một người vô tội?".
- a | Vâng mệnh | "Thần thiếp sẽ làm theo, vì Hoàng thượng đã quyết thì tất có lý." | G=sung L=duc | like=nongnay,hieuthao | dislike=nhantu
- b | Can ngay | "Thần thiếp sẽ quỳ xuống can ngăn dù chịu tội." | G=duc L=sung | like=nhantu,trongtai | dislike=nongnay,datinh
- c | Xin một khắc nghĩ | "Thần thiếp xin một khắc suy nghĩ rồi mới thưa, để khỏi lỡ lời." | G=tamco L=mama | like=danghi,chamchinh | dislike=nongnay
- d | Nói riêng sau | "Thần thiếp sẽ làm, rồi tìm lúc không có ai tâu lại lẽ phải trái." | G=mama L=danh | like=lanhlung,danghi | dislike=hieuthao

### DD-10 [D] royal=hoangthuong V=1 rank=0
ask: "Ngoài kia mưa. Ngươi nghĩ gì khi nghe tiếng mưa?"
rise: rank≥2 the Emperor says "nói một câu thôi, đừng nhiều lời".
- a | Nhớ nhà | "Thần thiếp nhớ nhà, mưa rơi trên mái nhà tranh ngày xưa." | G=duc L=sung | like=hieuthao,nhantu | dislike=chamchinh
- b | Nghĩ tới ruộng đồng | "Thần thiếp nghĩ ruộng lúa có no nước, mùa này dân được nhờ." | G=danh L=sung | like=chamchinh,nhantu | dislike=mesac
- c | Làm câu thơ | "Mưa rơi lả tả bên thềm, lòng ai chẳng động giữa đêm vắng người." | G=sung L=tamco | like=trongtai,datinh | dislike=chamchinh
- d | Nói thật ngắn | "Thần thiếp nghĩ đến chiếc ô để Hoàng thượng đỡ ướt." | G=mama L=danh | like=lanhlung,nongnay | dislike=trongtai

### DD-11 [K] royal=hoangthuong V=2 rank=2
ask: "Trong hậu cung, người nào được trẫm thương nhiều thì tất có người ghen. Ngươi nghĩ sao?"
rise: rank 3 the Emperor adds "ngươi sẽ làm gì nếu bị ghen?".
- a | Biết là khó tránh | "Thần thiếp hiểu ghen tuông là lẽ thường, chỉ mong giữ lòng ngay thẳng." | G=duc L=sung | like=nhantu,hieuthao | dislike=datinh
- b | Chia ân huệ | "Thần thiếp sẽ nhường nhịn tỷ muội, có phần thì chia, để không ai oán." | G=quen L=danh | like=nhantu,lanhlung | dislike=nongnay
- c | Giữ mình | "Thần thiếp không cầu thương nhiều, chỉ mong yên ổn qua ngày." | G=mama L=sung | like=lanhlung,danghi | dislike=mesac
- d | Dám đối đầu | "Thần thiếp không sợ bị ghen, ai có bản lĩnh thì giữ được lòng Hoàng thượng." | G=danh L=oan | like=nongnay,trongtai | dislike=nhantu

### DD-12 [D] royal=hoangthuong V=1 rank=0
ask: "Trẫm thấy ngươi cười mà lại có chút buồn. Vì sao vậy?"
rise: rank≥2 the Emperor waits in silence for the answer (no prompt).
- a | Nhớ phụ mẫu | "Thần thiếp nhớ cha mẹ, đêm nay không biết ai thắp đèn cho cha mẹ." | G=duc L=sung | like=hieuthao,nhantu | dislike=datinh
- b | Chối là không | "Thần thiếp không buồn, chỉ là mặt thần thiếp vốn như vậy." | G=tamco L=duc | like=danghi,lanhlung | dislike=nhantu
- c | Nói tâm sự | "Thần thiếp sợ mình làm không tốt, phụ lòng ngài đã nhìn đến." | G=sung L=tamco | like=nhantu,mesac | dislike=lanhlung
- d | Nói đùa | "Là nụ cười thần thiếp tập mãi chưa ra dáng, mong Hoàng thượng đừng cười." | G=danh L=duc | like=datinh,mesac | dislike=hieuthao

### DD-13 [K] royal=hoangthuong V=3 rank=2
ask: "Ngươi thấy người thứ nhất đứng cạnh ngươi thế nào?"
rise: rank 3 the Emperor asks about the very girl she befriended in the yard (real person, law 6b).
- a | Khen thật | "Nàng ấy đoan trang, lại có tài, thần thiếp tự thấy kém." | G=quen L=sung | like=nhantu,hieuthao | dislike=nongnay
- b | Nói điều tốt lẫn điều dở | "Nàng ấy đẹp nhưng hơi ngạo, thần thiếp thấy cần học thêm sự khiêm nhường." | G=duc L=quen | like=danghi,trongtai | dislike=nhantu
- c | Không bình phẩm | "Thần thiếp không dám bàn người khác sau lưng." | G=danh L=sung | like=lanhlung,hieuthao | dislike=datinh
- d | Chê khéo | "Nàng ấy dung mạo hơn thần thiếp, chỉ mong Hoàng thượng đừng để tâm đến lời thần thiếp." | G=sung L=oan | like=mesac,datinh | dislike=nhantu

### DD-14 [D] royal=hoangthuong V=2 rank=1
ask: "Nếu trẫm bảo ngươi múa một điệu ngay trong điện này, ngươi có dám không?"
rise: rank≥2 "trước mặt cả Hoàng hậu và Thái hậu?" (the stakes are named).
- a | Dám múa | "Thần thiếp xin múa một điệu nhỏ, mong Hoàng thượng đừng chê vụng." | G=sung L=danh | like=mesac,datinh | dislike=hieuthao,lanhlung
- b | Xin được từ chối | "Thần thiếp tay chân vụng, sợ làm ô uế mắt rồng." | G=duc L=sung | like=lanhlung,danghi | dislike=mesac
- c | Xin đổi sang việc khác | "Thần thiếp xin hát một khúc thay cho múa, chân thần thiếp hôm nay chưa vững." | G=tamco L=danh | like=trongtai,chamchinh | dislike=nongnay
- d | Hỏi lễ | "Thần thiếp hỏi lễ trước: múa ở chốn này có hợp phép không?" | G=mama L=sung | like=danghi,hieuthao | dislike=datinh

---
## HOÀNG THÁI HẬU (12) — likes/dislikes use TH_ARCH keys: tuai · nghiem · danghi · quyen · phat

### DD-15 [D] royal=thaihau V=1 rank=0
ask: "Lại đây cho ai gia nhìn kỹ. Con thích ăn gì, thích ngủ lúc nào?"
rise: rank≥2 Thái hậu adds "ở nhà con dậy lúc mấy giờ?" (habits, no number shown; BAL.entry.w).
- a | Thưa thật như ở nhà | "Thần thiếp thích món canh thanh đạm, ngủ sớm dậy sớm, quen nếp nhà." | G=phuc L=sung | like=tuai,nghiem | dislike=quyen
- b | Nói theo ý bà | "Bẩm Thái hậu, thần thiếp ăn ngủ thế nào cũng xin theo lệ cung." | G=mama L=duc | like=quyen,danghi | dislike=tuai
- c | Khen món ăn trong điện | "Mùi trà ở đây thơm lạ, thần thiếp chưa từng ngửi thấy." | G=sung L=tamco | like=tuai,phat | dislike=nghiem
- d | Hỏi thăm bà trước | "Thần thiếp đâu dám nói chuyện mình, trước hết xin hỏi Thái hậu hôm nay dùng bữa có ngon không?" | G=danh L=bac | like=tuai,phat | dislike=danghi

### DD-16 [K] royal=thaihau V=2 rank=1
ask: "Nữ nhi trong nhà quan nên học điều gì trước?"
rise: rank≥2 Thái hậu asks "nếu chỉ chọn một thứ?".
- a | Lễ nghi | "Trước hết là lễ nghi, đi đứng nói năng phải đúng phép." | G=danh L=sung | like=nghiem,quyen | dislike=tuai
- b | Đức hạnh | "Là đức hạnh, có đức thì mới giữ được phúc." | G=phuc L=tamco | like=tuai,phat | dislike=danghi
- c | Việc nội trợ | "Là việc bếp núc, kim chỉ, biết làm thì mới lo cho cả nhà." | G=mama L=danh | like=nghiem,tuai | dislike=quyen
- d | Chữ nghĩa | "Là chữ nghĩa, biết đọc thì mới hiểu lẽ phải trái." | G=tamco L=duc | like=danghi,quyen | dislike=phat

### DD-17 [D] royal=thaihau V=1 rank=0
ask: "Con có tin phúc phận của người là do trời định chăng?"
rise: rank≥2 Thái hậu adds "vậy con ra sao khi gặp họa?".
- a | Tin | "Thần thiếp tin, phúc phận là do trời, mình chỉ biết tích đức chờ ngày." | G=phuc L=tamco | like=phat,tuai | dislike=danghi
- b | Chỉ tin một phần | "Thần thiếp tin một nửa, nửa còn lại là do mình làm nên." | G=tamco L=phuc | like=quyen,danghi | dislike=phat
- c | Không dám nói | "Thần thiếp ít học, không dám nói chuyện trời, chỉ dám làm điều thiện." | G=duc L=danh | like=tuai,nghiem | dislike=quyen
- d | Hỏi bà | "Thái hậu từng trải, xin bà dạy cho thần thiếp." | G=mama L=sung | like=quyen,phat | dislike=danghi

### DD-18 [K] royal=thaihau V=2 rank=1
ask: "Nếu con được vào cung, con sẽ đối xử với kẻ dưới ra sao?"
rise: rank≥2 asks how she would treat a servant who made a mistake.
- a | Nghiêm nhưng công bằng | "Thần thiếp sẽ nghiêm với lỗi, nhưng không phạt oan ai." | G=duc L=quen | like=nghiem,danghi | dislike=tuai
- b | Hiền hòa | "Thần thiếp sẽ coi họ như người trong nhà, thương họ thì họ trung thành." | G=quen L=mama | like=tuai,phat | dislike=quyen
- c | Cho họ biết phận | "Thần thiếp sẽ để họ biết phận mình, kẻ dưới phải theo phép." | G=danh L=oan | like=quyen,nghiem | dislike=tuai
- d | Hỏi lệ trong cung | "Thần thiếp xin được học theo lệ của Thái hậu, không dám tự ý." | G=phuc L=tamco | like=quyen,danghi | dislike=nghiem

### DD-19 [D] royal=thaihau V=1 rank=0
ask: "Con thấy ai gia già rồi, có phải không?"
rise: rank≥2 Thái hậu sets a trap line: "ai nói gì sau lưng ta, con nghe chưa?".
- a | Nói thật lòng khen | "Thái hậu da hồng tóc nhuận, thần thiếp thấy như bậc tiên." | G=sung L=duc | like=quyen,tuai | dislike=nghiem
- b | Khéo léo | "Tuổi tác là phúc dày, Thái hậu càng lâu càng được kính." | G=phuc L=tamco | like=phat,tuai | dislike=danghi
- c | Không dám đáp | "Thần thiếp không dám bàn tuổi của bề trên." | G=duc L=danh | like=nghiem,danghi | dislike=tuai
- d | Nói chân thành | "Thái hậu có nếp nhăn nơi khóe mắt, nhưng thần thiếp thấy đó là nụ cười của người từng trải." | G=danh L=oan | like=tuai,phat | dislike=quyen

### DD-20 [K] royal=thaihau V=2 rank=1
ask: "Cô nương nhà ngoài hay có người tìm đến xin xỏ. Nếu có người đến xin con giúp, con làm gì?"
rise: rank≥2 Thái hậu names a real kind of request: "một kẻ nhờ con nói tốt với Hoàng thượng".
- a | Giúp hết sức | "Thần thiếp sẽ giúp trong khả năng, ai khó thì mình đỡ." | G=quen L=bac | like=tuai,phat | dislike=quyen
- b | Hỏi rõ rồi tính | "Thần thiếp sẽ hỏi kỹ lý do, việc đúng phép thì giúp, việc trái thì từ chối." | G=duc L=quen | like=nghiem,danghi | dislike=tuai
- c | Từ chối ngay | "Thần thiếp xin không nhận lời, vì sợ mình không giữ được lòng ngay." | G=danh L=oan | like=nghiem,quyen | dislike=phat
- d | Nhờ bề trên quyết | "Thần thiếp sẽ bẩm lên Thái hậu xin ý, không dám tự quyết." | G=phuc L=tamco | like=quyen,danghi | dislike=tuai

### DD-21 [D] royal=thaihau V=1 rank=0
ask: "Đưa tay ra cho ai gia xem. Tay con làm được việc gì?"
rise: rank≥2 Thái hậu asks to see the hand's callus, "đã từng làm việc nặng chưa?".
- a | Tay khéo | "Tay thần thiếp biết thêu, biết nấu vài món, xin Thái hậu xem." | G=mama L=sung | like=nghiem,tuai | dislike=quyen
- b | Tay vụng nhưng chịu học | "Tay thần thiếp còn vụng, nhưng chịu học, xin Thái hậu chỉ dạy." | G=phuc L=danh | like=tuai,phat | dislike=danghi
- c | Tay chưa từng làm | "Thần thiếp lớn lên được nâng niu, chưa quen việc nặng." | G=sung L=duc | like=quyen | dislike=nghiem,tuai
- d | Nói về nghề nhà | "Nhà thần thiếp giỏi nghề nuôi tằm, thần thiếp theo mẹ làm từ nhỏ." | G=duc L=sung | like=nghiem,phat | dislike=quyen

### DD-22 [K] royal=thaihau V=2 rank=1
ask: "Con có đi chùa không? Con cầu điều gì?"
rise: rank≥2 asks which vow she would not break.
- a | Cầu bình an cho nhà | "Thần thiếp cầu cho phụ mẫu bình an, thế là đủ." | G=duc L=sung | like=tuai,phat | dislike=quyen
- b | Cầu việc lớn | "Thần thiếp cầu cho Hoàng thượng và Thái hậu trường thọ, hậu cung yên ổn." | G=phuc L=tamco | like=quyen,phat | dislike=danghi
- c | Không hay đi | "Thần thiếp ít đi chùa, nhưng mỗi ngày đều thắp hương trước bài vị tổ tiên." | G=danh L=phuc | like=nghiem,danghi | dislike=phat
- d | Cầu nhưng giữ kín | "Thần thiếp cầu điều gì, xin để trời biết, nói ra sợ mất linh." | G=tamco L=mama | like=danghi,phat | dislike=tuai

### DD-23 [D] royal=thaihau V=2 rank=1
ask: "Hoàng thượng còn trẻ, hay nghe lời xu nịnh. Nếu con thấy có người nịnh hót, con làm gì?"
rise: rank≥2 Thái hậu adds "nếu kẻ ấy là người ai gia tin dùng?".
- a | Tâu ngay | "Thần thiếp sẽ tâu thẳng với Thái hậu, để người định liệu." | G=phuc L=oan | like=quyen,danghi | dislike=tuai
- b | Lặng lẽ để ý | "Thần thiếp sẽ lặng lẽ để ý, đợi có bằng chứng mới nói." | G=tamco L=mama | like=danghi,nghiem | dislike=phat
- c | Khuyên can kẻ ấy | "Thần thiếp sẽ nhắc nhở kẻ ấy, ai cũng có lúc lầm lỡ." | G=duc L=danh | like=tuai,phat | dislike=quyen
- d | Tránh xa | "Thần thiếp sẽ tránh xa, không để mình bị cuốn vào." | G=mama L=quen | like=nghiem,phat | dislike=quyen

### DD-24 [K] royal=thaihau V=1 rank=0
ask: "Con có anh chị em không? Con thương ai nhất?"
rise: rank≥2 Thái hậu asks "nếu nhà gặp nạn, con giúp ai trước?".
- a | Nói thật | "Thần thiếp thương người em út nhất, vì nó còn nhỏ." | G=duc L=sung | like=tuai,phat | dislike=quyen
- b | Thương đều | "Thần thiếp thương đều anh chị em, không thiên vị ai." | G=mama L=duc | like=nghiem,danghi | dislike=tuai
- c | Nói về cha mẹ | "Thần thiếp thương cha mẹ nhất, vì công ơn dưỡng dục." | G=phuc L=danh | like=nghiem,quyen | dislike=danghi
- d | Hỏi lại Thái hậu | "Thần thiếp xin hỏi Thái hậu có thương ai nhất không, để thần thiếp học." | G=sung L=tamco | like=tuai,quyen | dislike=danghi

### DD-25 [D] royal=thaihau V=2 rank=2
ask: "Con sinh ngày nào? Ai gia nghe nói người sinh giờ ấy có số hay."
rise: rank 3 (hòa thân) Thái hậu asks about her country's custom of birth and omens.
- a | Nói thật, không tin số | "Thần thiếp sinh ngày ấy, nhưng thần thiếp tin vào việc mình làm hơn là số." | G=tamco L=phuc | like=quyen,danghi | dislike=phat
- b | Tin số | "Thần thiếp tin có thiên mệnh, được Thái hậu coi trọng là phúc của thần thiếp." | G=phuc L=danh | like=phat,tuai | dislike=danghi
- c | Khiêm tốn | "Số hay hay dở đều do phúc nhà, thần thiếp không dám nhận." | G=duc L=sung | like=tuai,nghiem | dislike=quyen
- d | Nhờ Thái hậu xem | "Thần thiếp xin Thái hậu xem giúp, thần thiếp tin lời bà." | G=sung L=tamco | like=phat,quyen | dislike=danghi

### DD-26 [D] royal=thaihau V=2 rank=1
ask: "Nếu con thấy một người trong cung phạm lỗi nhỏ, con nói hay giấu?"
rise: rank≥2 Thái hậu adds "người đó là chị em của con?".
- a | Nói | "Thần thiếp sẽ nói, vì lỗi nhỏ để lâu thành lỗi lớn." | G=phuc L=oan | like=nghiem,quyen | dislike=tuai
- b | Giấu | "Thần thiếp sẽ khuyên riêng, không muốn làm nàng mất mặt." | G=quen L=phuc | like=tuai,phat | dislike=nghiem
- c | Tùy việc | "Thần thiếp sẽ cân nhắc, lỗi gây hại cho người thì nói, lỗi chỉ hại mình thì nhắc." | G=tamco L=duc | like=danghi,nghiem | dislike=phat
- d | Xin lệ cung | "Thần thiếp xin theo lệ cung, việc gì phải báo thì báo." | G=mama L=quen | like=quyen,nghiem | dislike=tuai

---
## HOÀNG HẬU (12) — likes/dislikes use BAL.net.F nết names

### DD-27 [D] royal=hoanghau V=1 rank=0
ask: "Ngươi thấy cung này thế nào, lần đầu tiên bước vào?"
rise: rank≥2 Hoàng hậu adds "ngươi đã thấy chỗ nào đáng sợ chưa?".
- a | Khen cung | "Thần thiếp thấy cung điện nguy nga, thần thiếp không dám ngẩng nhìn." | G=mama L=tamco | like=Kiêu ngạo,Ham vui | dislike=Xảo quyệt
- b | Thưa lo lắng | "Thần thiếp hơi lo, chỉ sợ làm sai phép tắc." | G=duc L=sung | like=Ân cần,Điềm tĩnh | dislike=Kiêu ngạo
- c | Nói thẳng | "Thần thiếp thấy chốn này đẹp mà lạnh, cần người chỉ bảo mới quen được." | G=tamco L=oan | like=Thật thà,Thanh liêm | dislike=Kín đáo
- d | Hỏi lại Hoàng hậu | "Bẩm Hoàng hậu, ở trong cung bao năm, người thấy điều gì khó nhất?" | G=sung L=danh | like=Tham vọng,Nhiều chuyện | dislike=Lạnh lùng

### DD-28 [D] royal=hoanghau V=2 rank=1
ask: "Nghe nói ngươi có nhiều người ngưỡng mộ ở nhà. Ngươi định dùng điều ấy ra sao?"
rise: rank≥2 Hoàng hậu is the "most dangerous" judge: she asks whether her family may be used (BAL.entry.w).
- a | Không dùng | "Thần thiếp vào cung thì là người cung, những điều ấy thần thiếp quên cả." | G=duc L=sung | like=Thanh liêm,Khiêm nhường | dislike=Tham vọng
- b | Dùng để giúp người | "Thần thiếp sẽ dùng cho việc tốt, ai khó thì giúp." | G=quen L=bac | like=Rộng lượng,Ân cần | dislike=Thực dụng
- c | Dùng giữ cung | "Thần thiếp sẽ dùng để giữ thể diện cho hậu cung, không để người ngoài coi thường." | G=danh L=oan | like=Vì gia tộc,Kiêu ngạo | dislike=An phận
- d | Hỏi ý Hoàng hậu | "Thần thiếp xin Hoàng hậu chỉ cho, thần thiếp không dám tự ý." | G=mama L=tamco | like=Tham vọng,Kín đáo | dislike=Thật thà

### DD-29 [D] royal=hoanghau V=1 rank=0
ask: "Bổn cung muốn nghe lời thật: ngươi có sợ bổn cung không?"
rise: rank≥2 Hoàng hậu adds "ngươi sợ hơn hay kính hơn?".
- a | Nói thật là sợ | "Thần thiếp có sợ, vì Hoàng hậu uy nghi, nhưng cũng kính." | G=duc L=danh | like=Thật thà,Khiêm nhường | dislike=Kiêu ngạo
- b | Nói là kính | "Thần thiếp không sợ, thần thiếp kính Hoàng hậu như kính mẹ cả." | G=sung L=tamco | like=Kiêu ngạo,Thực dụng | dislike=Thanh liêm
- c | Nói không sợ | "Thần thiếp không sợ, vì nghĩ Hoàng hậu công minh." | G=danh L=oan | like=Trọng nghĩa,Điềm tĩnh | dislike=Nóng nảy
- d | Xin không trả lời | "Thần thiếp xin được không nói, lời thật dễ làm mích lòng." | G=mama L=sung | like=Kín đáo,Xảo quyệt | dislike=Thật thà

### DD-30 [K] royal=hoanghau V=2 rank=1
ask: "Trong hậu cung, chị em tranh sủng là chuyện thường. Ngươi tính thế nào?"
rise: rank≥2 Hoàng hậu adds "nếu bổn cung và ngươi cùng muốn một thứ?".
- a | Nhường nhịn | "Thần thiếp không tranh, cái gì của Hoàng hậu thần thiếp không dám đụng tới." | G=mama L=sung | like=Khiêm nhường,An phận | dislike=Tham vọng
- b | Cạnh tranh công bằng | "Thần thiếp sẽ cố gắng làm tốt phận mình, ai hơn thì thần thiếp phục." | G=danh L=oan | like=Thanh liêm,Thực tế | dislike=Thù dai
- c | Kết thân | "Thần thiếp sẽ kết thân với tỷ muội, hòa thuận thì ai cũng yên." | G=quen L=tamco | like=Ân cần,Rộng lượng | dislike=Xảo quyệt
- d | Học theo Hoàng hậu | "Thần thiếp nguyện học tập Hoàng hậu, giữ đạo hòa trong cung." | G=sung L=danh | like=Kiêu ngạo,Tham vọng | dislike=Thật thà

### DD-31 [D] royal=hoanghau V=1 rank=0
ask: "Ngươi thấy cô nương đứng bên trái ngươi có đẹp không?"
rise: rank≥2 Hoàng hậu asks you to compare, "ngươi hơn hay kém?".
- a | Khen thật | "Nàng ấy đẹp, thần thiếp không bằng." | G=quen L=sung | like=Rộng lượng,Khiêm nhường | dislike=Kiêu ngạo
- b | Khen cả hai | "Mỗi người một vẻ, đều xứng đáng được Hoàng hậu xem xét." | G=mama L=danh | like=Điềm tĩnh,Thực dụng | dislike=Thật thà
- c | Nói không biết | "Thần thiếp mải cúi đầu, không dám nhìn kỹ." | G=duc L=tamco | like=Kín đáo,Khiêm nhường | dislike=Nhiều chuyện
- d | Nói thẳng thua mình | "Thần thiếp thấy nàng ấy chưa đẹp bằng thần thiếp, xin Hoàng hậu lượng thứ." | G=danh L=oan | like=Kiêu ngạo,Tham vọng | dislike=Rộng lượng

### DD-32 [D] royal=hoanghau V=2 rank=1
ask: "Nếu ngươi biết một bí mật có thể làm hại một người, ngươi dùng hay giữ?"
rise: rank≥2 Hoàng hậu adds "nếu người ấy là kẻ đã hại ngươi?".
- a | Giữ kín | "Thần thiếp xin giữ kín, không muốn hại ai." | G=duc L=tamco | like=Thanh liêm,Rộng lượng | dislike=Thực dụng
- b | Dùng khi cần | "Thần thiếp sẽ giữ đến lúc cần mới dùng, cốt tự vệ." | G=tamco L=duc | like=Xảo quyệt,Thực dụng | dislike=Thanh liêm
- c | Báo lên | "Thần thiếp sẽ báo với Hoàng hậu để người định đoạt." | G=mama L=oan | like=Trọng nghĩa,Thật thà | dislike=Kín đáo
- d | Nói cho người ấy biết | "Thần thiếp sẽ nói cho người ấy biết, để nàng tự sửa mình." | G=quen L=danh | like=Ân cần,Trọng nghĩa | dislike=Thù dai

### DD-33 [K] royal=hoanghau V=2 rank=1
ask: "Hoàng hậu quản sổ sách hậu cung. Nếu giao cho ngươi giữ một quyển, ngươi giữ thế nào?"
rise: rank≥2 Hoàng hậu adds "nếu thiếu hụt một khoản?".
- a | Ghi cẩn thận | "Thần thiếp sẽ ghi từng khoản rõ ràng, để ai hỏi cũng đáp được." | G=tamco L=sung | like=Thanh liêm,Thực tế | dislike=Ham lợi
- b | Nhờ người giúp | "Thần thiếp sẽ nhờ người có kinh nghiệm xem lại, tránh sai sót." | G=quen L=danh | like=Khiêm nhường,Rộng lượng | dislike=Kiêu ngạo
- c | Nhận trách nhiệm | "Có sai sót thì thần thiếp tự gánh, không để người khác chịu." | G=duc L=bac | like=Trọng nghĩa,Thật thà | dislike=Xảo quyệt
- d | Hỏi quy củ | "Thần thiếp xin Hoàng hậu cho biết quy củ trước, để làm đúng." | G=mama L=tamco | like=Thực dụng,Kín đáo | dislike=Nóng nảy

### DD-34 [D] royal=hoanghau V=1 rank=0
ask: "Ngươi có nhớ nhà không? Ở đây ngươi cần gì?"
rise: rank≥2 Hoàng hậu adds "ngươi định xin bổn cung điều gì?".
- a | Không xin gì | "Thần thiếp không cần gì, chỉ mong được bình yên." | G=duc L=sung | like=An phận,Khiêm nhường | dislike=Tham vọng
- b | Xin nhẹ | "Thần thiếp xin một cái đèn đọc sách và vài tờ giấy." | G=tamco L=bac | like=Ham học,Thực tế | dislike=Ham vui
- c | Xin lớn | "Thần thiếp xin được thường xuyên vấn an Hoàng hậu, để học hỏi." | G=sung L=oan | like=Tham vọng,Kiêu ngạo | dislike=Thanh liêm
- d | Thưa nhớ nhà | "Thần thiếp nhớ nhà nhiều, cần chút thư từ gửi về." | G=quen L=danh | like=Ân cần,Vì gia tộc | dislike=Lạnh lùng

### DD-35 [D] royal=hoanghau V=2 rank=2
ask: "Nếu Hoàng thượng thương ngươi hơn bổn cung, ngươi sẽ làm thế nào?"
rise: rank 3 Hoàng hậu says it flat, no softening (hardest ask).
- a | Nhường | "Thần thiếp sẽ nhắc Hoàng thượng đến thăm Hoàng hậu trước." | G=mama L=sung | like=Khiêm nhường,Rộng lượng | dislike=Tham vọng
- b | Khiêm nhường | "Thần thiếp biết thân phận, Hoàng hậu mãi là chính cung." | G=duc L=danh | like=Thanh liêm,Thực tế | dislike=Kiêu ngạo
- c | Thẳng thắn | "Thần thiếp không dám hứa, tình ý do trời, Hoàng hậu cũng biết." | G=danh L=oan | like=Thật thà,Trọng nghĩa | dislike=Thù dai
- d | Lảng đi | "Chuyện ấy còn xa, thần thiếp chỉ mong hầu hạ tốt đã." | G=tamco L=duc | like=Kín đáo,Xảo quyệt | dislike=Thật thà

### DD-36 [K] royal=hoanghau V=1 rank=0
ask: "Ngươi biết thêu thùa, đánh đàn, hay chỉ biết đọc sách?"
rise: rank≥2 Hoàng hậu asks "cái nào ngươi thua kém nhất?".
- a | Nói rõ tài của mình | "Thần thiếp biết thêu và biết đàn một chút, đọc sách là việc thường ngày." | G=danh L=oan | like=Thực tế,Tham vọng | dislike=Khiêm nhường
- b | Nói mình chẳng giỏi | "Thần thiếp ba thứ đều vụng, chỉ mong học thêm." | G=duc L=sung | like=Khiêm nhường,Ham học | dislike=Kiêu ngạo
- c | Chỉ nhận một thứ | "Thần thiếp chỉ dám nói mình biết thêu." | G=mama L=danh | like=Kín đáo,Thực dụng | dislike=Nhiều chuyện
- d | Hỏi Hoàng hậu thích thứ nào | "Hoàng hậu thích thứ nào, thần thiếp xin dốc sức học theo." | G=sung L=tamco | like=Tham vọng,Kiêu ngạo | dislike=Thanh liêm

### DD-37 [D] royal=hoanghau V=2 rank=1
ask: "Nếu bổn cung trách phạt oan ngươi, ngươi sẽ làm sao?"
rise: rank≥2 Hoàng hậu adds "trước mặt mọi người?".
- a | Chịu | "Thần thiếp xin chịu, bề trên đã phạt thì tất có lý." | G=mama L=duc | like=Khiêm nhường,An phận | dislike=Trọng nghĩa
- b | Biện bạch nhẹ | "Thần thiếp xin nói rõ sự thật, mong Hoàng hậu xem xét." | G=duc L=sung | like=Thật thà,Thanh liêm | dislike=Kín đáo
- c | Tìm người làm chứng | "Thần thiếp sẽ cố tìm người làm chứng, chỉ để Hoàng hậu xét cho công." | G=tamco L=oan | like=Xảo quyệt,Thực dụng | dislike=Thật thà
- d | Ghi lòng | "Thần thiếp ghi nhớ trong lòng, ngày sau sẽ chứng minh bằng việc làm." | G=danh L=sung | like=Thù dai,Tham vọng | dislike=Rộng lượng

### DD-38 [D] royal=hoanghau V=2 rank=1
ask: "Bổn cung cho ngươi một chén trà nóng. Ngươi mời ai uống trước?"
rise: rank≥2 Hoàng hậu adds "vì sao không là bổn cung?".
- a | Mời Hoàng hậu | "Thần thiếp xin mời Hoàng hậu trước, đó là phép." | G=mama L=quen | like=Thực dụng,Kiêu ngạo | dislike=Thanh liêm
- b | Mời Thái hậu | "Thần thiếp xin mời Thái hậu trước, người là bậc cao nhất." | G=duc L=sung | like=Thanh liêm,Trọng nghĩa | dislike=Tham vọng
- c | Mời người bên cạnh | "Thần thiếp xin mời cô nương bên cạnh, nàng đứng lâu mệt rồi." | G=quen L=danh | like=Ân cần,Rộng lượng | dislike=Kiêu ngạo
- d | Uống trước thử | "Thần thiếp xin thử nhiệt độ cho vừa rồi mới dâng." | G=tamco L=duc | like=Xảo quyệt,Kín đáo | dislike=Thật thà

---
## NỘI VỤ PHỦ MA MA (6) — cung nữ origin; likes/dislikes use BAL.net.F nết names

### DD-39 [K] royal=noivu V=1 rank=0
ask: "Ngươi tên gì, quê ở đâu, vì sao vào làm cung nữ?"
rise: rank≥1 ma ma asks "ngươi có người thân trong cung chưa?".
- a | Thưa rành mạch | "Nô tỳ tên ấy, quê ở ấy, vì nhà nghèo nên vào cung làm việc." | G=tin L=bac | like=Thật thà,Thanh liêm | dislike=Kín đáo
- b | Nói ngắn | "Bẩm ma ma, nô tỳ đến hầu việc, mong ma ma chỉ bảo." | G=mama L=danh | like=Kín đáo,Điềm tĩnh | dislike=Nhiều chuyện
- c | Nói tình cảnh nhà | "Nhà nô tỳ có mẹ già em dại, nô tỳ cần có phận làm để nuôi." | G=duc L=tamco | like=Ân cần,Vì gia tộc | dislike=Lạnh lùng
- d | Hỏi lại | "Ma ma xem nô tỳ hợp làm việc ở đâu?" | G=sung L=duc | like=Thực dụng,Tham vọng | dislike=Thanh liêm

### DD-40 [K] royal=noivu V=2 rank=0
ask: "Trong cung có bốn điều cấm, ngươi nhớ điều nào quan trọng nhất?"
rise: rank≥1 adds "ngươi từng thấy ai phạm chưa?" (no quiz — only stance).
- a | Nghe lời trên | "Điều quan trọng nhất là nghe lời bề trên, không tự ý làm." | G=tin L=duc | like=Khiêm nhường,An phận | dislike=Tham vọng
- b | Giữ miệng | "Giữ miệng kín, không nói chuyện không đâu." | G=mama L=quen | like=Kín đáo,Điềm tĩnh | dislike=Nhiều chuyện
- c | Chăm chỉ | "Chăm chỉ làm việc thì chẳng phạm điều gì." | G=duc L=sung | like=Thực tế,Ham học | dislike=Ham vui
- d | Chỉ dám nhận ngu | "Nô tỳ ngu muội, xin ma ma cứ dạy từng điều, nô tỳ nhớ dần." | G=sung L=danh | like=Ân cần,Rộng lượng | dislike=Xảo quyệt

### DD-41 [D] royal=noivu V=1 rank=0
ask: "Nếu ngươi thấy một cung nữ cùng đợt ăn trộm bánh, ngươi làm gì?"
rise: rank≥1 the stolen thing is something of value (still a stance, no right answer).
- a | Báo ma ma | "Nô tỳ sẽ báo ngay với ma ma." | G=tin L=oan | like=Thanh liêm,Thật thà | dislike=Rộng lượng
- b | Khuyên bạn | "Nô tỳ sẽ khuyên nàng trả lại, đừng làm hại mình." | G=quen L=mama | like=Ân cần,Trọng nghĩa | dislike=Kiêu ngạo
- c | Làm ngơ | "Nô tỳ không thấy gì, không dám xen vào." | G=mama L=duc | like=Kín đáo,An phận | dislike=Thanh liêm
- d | Nhận hộ | "Nô tỳ xin nhận phần, vì nàng chắc chắn đói." | G=duc L=danh | like=Rộng lượng,Trọng nghĩa | dislike=Thực dụng

### DD-42 [K] royal=noivu V=2 rank=1
ask: "Ma ma phát việc, ngươi muốn việc nhẹ hay việc nặng?"
rise: rank≥1 ma ma notes "việc nhẹ ít người nhìn thấy" (visibility vs ease).
- a | Việc nhẹ | "Nô tỳ xin việc nhẹ, vì sức nô tỳ yếu." | G=mama L=danh | like=An phận,Khiêm nhường | dislike=Tham vọng
- b | Việc nặng | "Nô tỳ xin việc nặng, nô tỳ chịu được." | G=tin L=tamco | like=Thực tế,Trọng nghĩa | dislike=Ham vui
- c | Việc nào cũng được | "Nô tỳ nghe lời ma ma phân." | G=sung L=duc | like=Điềm tĩnh,Khiêm nhường | dislike=Tham vọng
- d | Việc gần người | "Nô tỳ xin việc gần chủ tử, để học cách hầu hạ." | G=danh L=oan | like=Tham vọng,Thực dụng | dislike=An phận

### DD-43 [D] royal=noivu V=1 rank=0
ask: "Ngươi thấy cô cung nữ bên cạnh ngươi lười biếng. Ngươi nói thế nào với ma ma?"
rise: rank≥1 ma ma adds "ta hỏi thẳng, ngươi có chơi thân với nàng không?".
- a | Nói thẳng | "Nàng ấy làm việc chậm, nô tỳ thấy cần nhắc." | G=tin L=oan | like=Thật thà,Thanh liêm | dislike=Rộng lượng
- b | Bênh bạn | "Nàng ấy không lười, chỉ là việc chưa quen, nô tỳ xin giúp nàng." | G=quen L=mama | like=Ân cần,Trọng nghĩa | dislike=Thực dụng
- c | Nói chung chung | "Ai cũng có lúc mệt, nô tỳ không dám bình phẩm." | G=mama L=duc | like=Kín đáo,Điềm tĩnh | dislike=Thật thà
- d | Nhận bớt việc | "Nô tỳ xin làm thêm, để nàng ấy học dần." | G=duc L=tamco | like=Rộng lượng,Ân cần | dislike=Xảo quyệt

### DD-44 [K] royal=noivu V=2 rank=1
ask: "Ngươi muốn sau này làm gì: hầu chủ tử, giữ kho, hay làm bếp?"
rise: rank≥1 ma ma adds "ta chỉ cho một lần, chọn đi" (no take-back; BAL.entry.w).
- a | Hầu chủ tử | "Nô tỳ muốn hầu chủ tử, để học cách ở chốn cao." | G=danh L=oan | like=Tham vọng,Thực dụng | dislike=An phận
- b | Giữ kho | "Nô tỳ muốn giữ kho, vì nô tỳ cẩn thận." | G=tin L=sung | like=Thanh liêm,Thực tế | dislike=Ham lợi
- c | Làm bếp | "Nô tỳ muốn làm bếp, ai cũng cần ăn, việc ấy bền." | G=duc L=danh | like=An phận,Ân cần | dislike=Tham vọng
- d | Xin ma ma chọn | "Ma ma thấy nô tỳ hợp chỗ nào thì nô tỳ làm chỗ ấy." | G=mama L=tamco | like=Khiêm nhường,Kín đáo | dislike=Thật thà
