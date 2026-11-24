import os,sys
os.makedirs('up3',exist_ok=True)
GS=[('idle','1 · vòng đứng yên'),('turned','2 · xoay tới nhóm chủ tử + người theo hầu'),('alert','3 · có chuyện ở nhóm khuất'),('open','4 · chạm nhóm: cảnh kit §95, hai người cãi nhau'),('open4','5 · nhóm bốn người trò chuyện'),('person','6 · chạm người theo hầu'),('person2','7 · chạm chủ tử'),('approach','8 · NPC tìm ta: vòng tự xoay, người ấy phóng lên'),('appr95','9 · cảnh §95: người đó bên trái')]
RS=[('idle','1 · đứng yên'),('turned','2 · đã xoay'),('approach','3 · nàng tìm ta'),('appr95','4 · §95')]
def gal(m,states):return '<div class="st">'+''.join(f'<div><small>{n}</small><br><a href="r2/both-{m}-{s}.jpg"><img loading="lazy" src="r2/both-{m}-{s}.jpg"></a></div>' for s,n in states)+'</div>'
def at2(m,states):return '<p><small>Ảnh @2: '+' · '.join(f'<a href="r2/{m}-{d}-{s}.webp">{d} {s}</a>' for d in ['fold','ipad'] for s,_ in states)+'</small></p>'
def vid(m,seq,label):return f'<p><b>{label}</b><br><video controls playsinline src="r2v/{m}-{seq}-fold.mp4"></video> <video controls playsinline src="r2v/{m}-{seq}-ipad.mp4"></video><br><small>2×: <a href="r2v/{m}-{seq}-fold-2x.mp4">Fold</a> · <a href="r2v/{m}-{seq}-ipad-2x.mp4">iPad</a></small></p>'
H=open('page3_head.html').read()
b=H
RM=[('today','hôm nay: Fold hai người một lần, iPad bốn ô, còn lại sang trang bằng chip «+n» (khung thật; đời chơi này chỉ có ít người nên chip nhỏ)'),('row','đề xuất 1: một hàng, mọi người cùng một màn'),('ring','đề xuất 2: vòng nhỏ, người trước to')]
b+='<h2>Phòng riêng · một màn thấy hết mọi người (4 và 6)</h2>'+open('page3_room.html').read()
for n in (4,6):
    b+=f'<h3>{n} người</h3>'+gal(f'ROOM{n}',RM)+at2(f'ROOM{n}',RM)
b+='<h2>G · Vòng nhóm — Ngự Hoa Viên, mười tám người trong chín nhóm</h2>'+open('page3_g.html').read()+gal('G',GS)+at2('G',GS)+vid('G','g1','Video 1 · xoay, có chuyện ở nhóm khuất, chạm báo, §95')+vid('G','g2','Video 2 · chạm người theo hầu / chủ tử, NPC tìm ta')
b+='<h2>S · Cảnh rộng (kéo ngang, không vòng)</h2>'+open('page3_s.html').read()+gal('S',GS)+at2('S',GS)+vid('S','g1','Video 1 · kéo, báo chuyện, đẩy máy vào, §95')+vid('S','g2','Video 2 · chạm người, NPC tìm ta')
b+='<h2>R · Vòng người cho màn CHỌN</h2>'+open('page3_r.html').read()+gal('R',RS)+at2('R',RS)+vid('R','r','Video · xoay, nàng tìm ta')
b+=open('page3_tail.html').read()+'</body></html>'
open('up3/ring-r2.html','w').write(b)
