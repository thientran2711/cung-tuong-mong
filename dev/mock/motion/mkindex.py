import glob,os,html
OUT='pub'
P=[
 ('r1','Mẫu 1 · Bàn bài','Việc đến như một lá bài rút từ bộ bài; các lựa chọn xòe ra như bài trên tay; chọn xong lá bài lật ra kết quả.',
  'Mọi hộp chọn việc/kỳ ngộ/đêm/thi (cả nhóm hộp lựa chọn, luật 11); thẻ lựa chọn là thẻ lựa chọn thật của game, vỏ thẻ và lưng thẻ đỏ là YÊU CẦU KIT (kitHand); dùng lại nghệ thuật thẻ bài lưng đỏ và cách lật/xóc/chia của Luân hồi (kitRoulette) và thị tẩm (kitCardFlip).',
  'Lựa chọn thành vật cầm trên tay: thẻ nhấc lên khi chạm, các thẻ khác nghiêng đi, thẻ chọn bay vào giữa rồi lật — giống game bài hơn danh sách chữ.',
  'L','Rất giống game; dùng sẵn tranh thẻ bài; giữ nguyên Tốn/Được/Mất và chữ đo độ chắc (luật 2, 3, 7).','Chữ trên thẻ nhỏ hơn; trên 4 lựa chọn phải xòe nhiều hàng; phải có bản danh sách dự phòng khi giảm chuyển động.'),
 ('r2','Mẫu 2 · Vòng bảo vật','Chọn quà/ban thưởng/trang phục: các món xếp thành vòng, vuốt thì vòng xoay, món ở chính giữa sáng và to, bấm Tặng thì món bay sang người nhận.',
  'Mọi chỗ chọn MỘT trong tối đa vài chục món: tặng quà, dâng, cài vào rương, thay trang phục, chọn thưởng (nhóm chọn món, luật 11). Kho Tư trang vẫn là lưới. Dùng chung MỘT bộ phận vòng với «Vòng người» của RING-DESIGN.',
  'Tất cả món thấy trên một màn, không phải cuộn; tên, phẩm và lời chú hiện ngay; món bay đi có đích rõ (luật 6c: đồ vật có nơi đến).',
  'M','Giải đúng nỗi «vuốt qua vuốt lại bị lạc»; một bộ phận dùng cho cả người và đồ; không cần tranh mới.','Trên mười hai món vòng chật: cần tab loại hoặc hai vòng; phải có nút mũi tên và chạm-chọn cho người không vuốt.'),
 ('r3','Mẫu 3 · Tin đến','Mỗi loại tin có cách đến riêng: Tin = dải lụa đỏ trượt xuống rồi mở; Chiếu chỉ = cuộn chiếu rơi, mở, đóng dấu; Khách = bóng người ở cửa rồi hiện mặt; Việc = ảnh đẩy gần, dấu «VIỆC» đóng xuống, chữ hiện dần.',
  'Đầu mọi bảng (Luật, Điều, Tin, Báo, Việc, Kết quả, Đêm, Kiếp, mục 24 và 25 của kit): hôm nay tất cả chỉ «trồi lên 0,28 giây» như nhau.',
  'Việc xuất hiện là một khoảnh khắc, không phải hộp thoại bật ra; mỗi loại nhìn là biết loại gì ngay trước khi đọc.',
  'M','Rẻ nhất, không đổi bố cục, không cần tranh mới (dùng cuộn chiếu, ấn, tranh việc đã có); làm trước được.','Thêm vài giây mỗi việc: phải chạm-bỏ-qua, việc nhỏ chỉ 1 giây, việc lớn mới đủ bộ.'),
 ('r4','Mẫu 4 · Lật kết quả và bay về túi','Thẻ kết quả úp rồi lật; dấu THÀNH/BẠI đóng xuống; số được–mất bay đúng tới ô trên thanh trên; món nhận được bay vào tab Tư trang và tab nảy lên.',
  'Mọi thẻ kết quả hành động, ban thưởng, quà nhận, được–mất chỉ số (nhóm kết quả, luật 11). Hôm nay dấu đóng rồi, nhưng số chỉ nổi lên tại chỗ.',
  'Phần thưởng có chỗ đến: nàng thấy tiền và món đi đâu. Là «khoái cảm» chính của game gacha/idle, hợp luật đồ vật có nơi ở.',
  'S','Rẻ (đã có dấu, đã có bay số); rõ ràng nhất cho người mới.','Nhiều thay đổi cùng lúc phải xếp hàng bay, không chồng chéo.'),
 ('r5','Mẫu 5 · Chia bài đầu buổi','Việc trong buổi được chia ra từ bộ bài (lật từng lá); làm xong, thẻ lật úp bay vào chồng «đã làm», các thẻ còn lại dồn lại.',
  'Tab Hành sự (thẻ việc mỗi buổi), cùng nhóm danh sách việc ở Hậu cung/Giao tình. Ở mẫu này dùng lưới để thấy rõ; bản thật có thể giữ hàng dài và chỉ có hiệu ứng chia.',
  'Mỗi buổi bắt đầu bằng một nhịp «chia bài», việc làm xong có chỗ biến mất rõ ràng.',
  'M','Vui mắt, nhịp buổi rõ.','Dễ chạm luật bố cục (khung → bố cục → cỡ nút, luật 10) nếu đổi hàng thành lưới; nên để sau.'),
]
def vid(k,tag):
    return f'<figure><video controls muted loop playsinline preload="metadata" src="{k}-{tag}-1x.mp4"></video><figcaption>{"Fold 755×1000" if tag=="fold" else "iPad 1180×820"} · <a href="{k}-{tag}-1x.mp4">1×</a> · <a href="{k}-{tag}-2x.mp4">2×</a></figcaption></figure>'
cards=[]
for k,t,what,where,why,cost,pro,con in P:
    stills=sorted(glob.glob(f'{OUT}/{k}-fold-still-*.jpg'))
    st=''.join(f'<a href="{os.path.basename(s)}"><img loading="lazy" src="{os.path.basename(s)}"></a>' for s in stills)
    sti=sorted(glob.glob(f'{OUT}/{k}-ipad-still-*.jpg'))
    st2=''.join(f'<a href="{os.path.basename(s)}"><img loading="lazy" src="{os.path.basename(s)}"></a>' for s in sti)
    cards.append(f'''<section id="{k}"><h2>{t} <span class="sz">chi phí {cost}</span></h2><p class="what">{what}</p>
<div class="vids">{vid(k,'fold')}{vid(k,'ipad')}</div>
<dl><dt>Ở đâu (cả nhóm)</dt><dd>{where}</dd><dt>Vì sao giống game</dt><dd>{why}</dd><dt>Ưu</dt><dd>{pro}</dd><dt>Nhược</dt><dd>{con}</dd></dl>
<details><summary>Khung hình chính (Fold · iPad)</summary><div class="stills">{st}</div><div class="stills wide">{st2}</div></details></section>''')
page=f'''<!doctype html><html lang="vi"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Cung Tường Mộng — nghiên cứu chuyển động</title>
<style>:root{{--red:#9a2c1c;--paper:#fffaf0;--ink:#3b2a1e;--hair:#e6d3ac;--lab:#8a7350;--bg:#f6e6df}}
*{{box-sizing:border-box}}body{{margin:0;background:var(--bg);color:var(--ink);font:16px/1.5 "Noto Serif","Times New Roman",serif}}
@media(prefers-color-scheme:dark){{:root{{--paper:#2a1d1a;--ink:#f1e3d6;--hair:#5a4036;--lab:#c9ab8f;--bg:#1d1412;--red:#e58a78}}}}
main{{max-width:1100px;margin:0 auto;padding:16px}}h1{{font-size:24px;margin:8px 0}}h2{{font-size:20px;color:var(--red);margin:0 0 6px}}
.sec,section{{background:var(--paper);border:1px solid var(--hair);border-radius:12px;padding:14px 16px;margin:14px 0}}
.sz{{font-size:12px;border:1px solid var(--hair);border-radius:999px;padding:1px 9px;color:var(--lab);vertical-align:middle;margin-left:6px}}
.vids{{display:flex;flex-wrap:wrap;gap:14px;align-items:flex-start;margin:10px 0}}figure{{margin:0;flex:1 1 280px}}figure:first-child{{flex:0 1 330px}}video{{width:100%;border-radius:10px;border:1px solid var(--hair);background:#000}}figcaption{{font-size:13px;color:var(--lab);margin-top:4px}}
dl{{display:grid;grid-template-columns:150px 1fr;gap:6px 12px;font-size:14.5px}}dt{{color:var(--lab);font-weight:700}}dd{{margin:0}}
@media(max-width:640px){{dl{{grid-template-columns:1fr}}dd{{margin-bottom:6px}}}}
.stills{{display:flex;gap:6px;overflow-x:auto;padding:6px 0}}.stills img{{height:220px;border-radius:6px;border:1px solid var(--hair)}}.stills.wide img{{height:150px}}
ol li{{margin:4px 0}}table{{border-collapse:collapse;width:100%;font-size:14px}}td,th{{border:1px solid var(--hair);padding:5px 8px;text-align:left;vertical-align:top}}
</style></head><body><main>
<h1>Chuyển động cho cảm giác game — bản nghiên cứu và mẫu</h1>
<p>Thợ MOTION-DESIGN, 24/11. Các mẫu chạy trên CHÍNH game thật (khung, thẻ việc, thẻ kết quả, ô chỉ số, tab, ô vật phẩm đều là bộ phận kit sẵn có; nền giữ nguyên độ sáng, không phủ tối cả màn); chỉ phần chuyển động và vài vỏ thẻ là mới (ghi là YÊU CẦU KIT). Không vẽ hình mới. Mỗi mẫu có video ở cả hai máy: Fold dọc và iPad ngang.</p>
<div class="sec"><h2>Em đề xuất làm theo thứ tự</h2><ol>
<li><b>Mẫu 3 · Tin đến</b> (chi phí M) — làm trước: rẻ, không đổi bố cục, đổi cảm giác của MỌI việc.</li>
<li><b>Mẫu 4 · Lật kết quả và bay về túi</b> (S) — làm cùng đợt: nhỏ, thấy ngay.</li>
<li><b>Mẫu 2 · Vòng bảo vật</b> (M) — làm cùng lúc với Vòng người: MỘT bộ phận kit cho người và đồ.</li>
<li><b>Mẫu 1 · Bàn bài</b> (L) — thí điểm ở một nhóm việc (Ngự Hoa Viên) rồi mới mở rộng.</li>
<li><b>Mẫu 5 · Chia bài</b> (M) — để sau; chỉ nên làm hiệu ứng chia, giữ hàng dài.</li></ol>
<p>Game đã có sẵn một khoảnh khắc «thẻ bài»: màn <b>Luân hồi</b> đầu mỗi kiếp (chín thẻ úp, xóc bài, chọn một lá, lá lật ra). Mẫu 1 và 5 dùng lại đúng cách đó cho cả ngày chơi.</p>
<p>Đây là ý mới nên theo luật 18 (đóng băng tính năng) chúng nằm ở bãi đỗ cho tới khi sếp duyệt; khi làm thật sẽ qua thợ kit duy nhất (luật 9).</p></div>
{''.join(cards)}
</main></body></html>'''
open(f'{OUT}/index.html','w').write(page)
print('ok',len(page))
