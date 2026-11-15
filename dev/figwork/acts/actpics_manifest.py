# review/act-pics (owner 11/15): ACTS.json entries for the new act pictures + the "log" rules (week book / result lines that are not act names).
# usage: python3 dev/figwork/acts/actpics_manifest.py <ACTS.json pulled from the CDN> > img/ACTS.json   (then push it with cdn_sync)
import json,sys
d=json.load(open(sys.argv[1],encoding='utf-8'))
A=d['acts']
A.update({
 "Thỉnh an":"thinh-an-hh","Thỉnh an Hoàng hậu":"thinh-an-hh",
 "Thỉnh an Thái hậu":"thinh-an-th","Thỉnh an, chép kinh":"thinh-an-th",
 "Xin bái kiến":"bai-kien","Xin yết kiến":"bai-kien","Chào hỏi đúng lễ":"bai-kien","Hành lễ thỉnh an":"bai-kien",
 "Làm thơ dâng lên":"lam-tho-v2","Gửi bài thơ cũ":"lam-tho-v2","Làm thơ Trùng cửu":"lam-tho-v2",
 "Tha lỗi":"tha-loi","Nhận lời xin lỗi":"tha-loi",
 "Ngủ sớm":"ngu-dem","Ngủ đêm hồi sức":"ngu-dem",
 "Cho mượn":"cho-muon","Từ chối":"tu-choi","Khéo từ chối":"tu-choi","Từ chối khéo":"tu-choi","Tiếp đãi lạnh nhạt":"tu-choi",
 "Nhịn":"nhin-loi-mia","Nhẫn nhịn":"nhin-loi-mia","Đáp trả sắc sảo":"khieu-khich"})
d['log']=[
 ["^(Nhịn|Nhẫn nhịn)( lời mỉa|\\.|$)","nhin-loi-mia"],
 ["^Đáp trả lời mỉa","khieu-khich"],
 ["^Cho .+ mượn bạc|^Cho \\d+ lượng|^Cho mượn","cho-muon"],
 ["trả lại \\d+ lượng đã mượn","cho-muon"],
 ["^(Từ chối|Khéo từ chối|Từ chối khéo)|^Đuổi (đi|về)|^Tiếp đãi lạnh nhạt|^Lạnh lùng trước","tu-choi"],
 ["^(Nhận lời xin lỗi|Tha lỗi)","tha-loi"],
 ["^(Ngủ đêm hồi sức|Ngủ sớm)","ngu-dem"],
 ["thẻ bài của .+ được lật","lat-the"],
 ["^Thỉnh an Thái hậu|^Thỉnh an, chép kinh|thấy mặt Thái hậu|trước mặt Thái hậu","thinh-an-th"],
 ["^Thỉnh an Hoàng hậu|^Thỉnh an\\.|thỉnh an ở Càn Ninh","thinh-an-hh"],
 ["^Xin (bái|yết) kiến|^Xin vào .+: bị từ chối|^Chào hỏi đúng lễ|^Bái kiến|^Hành lễ thỉnh an","bai-kien"],
 ["không chào chủ vị|^Vào thẳng","scene:rv"],
 ["^(Bàn thơ văn|Giữ bài thơ|Làm thơ)","lam-tho-v2"],
 ["^(Điểm trang|Để mộc)","duong-nhan"],
 ["^Tập trước","luyen-cam-ky"],
 ["^Xin ân cho","xin-an-dien"],
 ["^(Hội Phượng|Đặt cược tay thiện xạ|Xin thử một mũi tên)","vo-nghe"],
 ["^Thưởng vì","thuong"],
 ["^(Im lặng, tựa vai|Lặng lẽ xoa vai|Rót rượu, nũng nịu|Khen một câu|Thị tẩm)","ev:hoang-de-dem"]]
DOC=' log: [[regex, key]] for week-book / result lines that are not act names (choices, game sentences); key = act key, "ev:<EVENTS category>" or "scene:<place sc>" (j87 kbkCands).'
if DOC not in d['_doc']:d['_doc']+=DOC
sys.stdout.write(json.dumps(d,ensure_ascii=False,indent=1)+"\n")
