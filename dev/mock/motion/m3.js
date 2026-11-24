/* MẪU 3 — arrival grammar per kind, on the REAL kit dialog (.dlg .kph .kpseal .k3main .kszfig .kseal). Only the motion is new. */
window.MOCK=async()=>{const {A,at,E,ctr,wait}=TL;const CDN='https://ctm-img.victoria-tntt.workers.dev/img/';
 const M=document.getElementById('modal');M.style.background='transparent';M.style.backdropFilter='none';   // OD 24/11 ~09:05Z: no whole-screen dark overlay
 const cap=E('div','','',document.body);cap.style.cssText='position:fixed;left:50%;top:172px;transform:translateX(-50%);z-index:100000;background:rgba(40,16,12,.78);color:#fff;border-radius:999px;padding:5px 16px;font:600 12.5px/1.2 sans-serif;white-space:nowrap;pointer-events:none;opacity:0';
 const setCap=t=>{cap.textContent=t;cap.animate([{opacity:0},{opacity:1,offset:.1},{opacity:1,offset:.9},{opacity:0}],{duration:3000})};
 const dyn=(el,kf,o={})=>A(el,kf,Object.assign({},o,{at:TL.now()+(o.dt||0)}));
 const dlg=()=>{const d=M.querySelector('.dlg');if(d)d.style.animation='none';return d};
 const v=rivals.find(r=>r.alive&&!r.out);
 const show=(m)=>{pushModal(m);showModal();return dlg()};
 // 3a TIN
 at(300,()=>{setCap('Mẫu 3a · Tin trong cung — mở từ trên xuống như cuộn giấy, chuông nhỏ lóe');const d=show({t:'Tin trong cung',h:'<p>Hoàng thượng ban hoa lụa cho Bành quý nhân. Trong cung người người đều hay.</p>',btn:'Đã rõ'});
  dyn(d,[{opacity:1,clipPath:'inset(0 0 100% 0)',transform:'translateY(-26px)'},{opacity:1,clipPath:'inset(0 0 0 0)',transform:'translateY(0)'}],{dur:700,ease:'cubic-bezier(.3,.8,.3,1)'});
  const r=d.getBoundingClientRect();const g=E('div','',null,document.body);g.style.cssText=`position:fixed;left:${r.left+22}px;top:${r.top-10}px;width:18px;height:18px;border-radius:50%;background:#ffd36b;box-shadow:0 0 14px 5px rgba(255,211,107,.9);z-index:99990;opacity:0;pointer-events:none`;dyn(g,[{opacity:0,transform:'scale(.4)'},{opacity:1,transform:'scale(1.3)',offset:.3},{opacity:0,transform:'scale(2.6)'}],{dur:900,dt:300});
  dyn(d,[{transform:'rotate(0)'},{transform:'rotate(-1deg)',offset:.25},{transform:'rotate(.8deg)',offset:.55},{transform:'rotate(0)'}],{dur:480,dt:760});});
 at(3300,()=>closeModal());
 // 3b CHIẾU
 at(3700,()=>{setCap('Mẫu 3b · Chiếu chỉ — cuộn chiếu rơi xuống, mở ra, dấu đóng xuống');const d=show({t:'Chiếu chỉ',h:'<p>Đêm nay, Hoàng thượng triệu nàng đến Cần Chính điện hầu cận. Ngự giá đã sai người đến đón.</p>',btn:'Tuân chỉ'});
  const r=d.getBoundingClientRect();const w=Math.min(r.width*.9,520);const s=E('img','',null,document.body);s.src=CDN+'kit/mo-edict-closed.webp';s.style.cssText=`position:fixed;width:${w}px;left:${r.left+r.width/2-w/2}px;top:${r.top+r.height/2-w*244/700/2}px;z-index:99990;opacity:0;pointer-events:none;filter:drop-shadow(0 12px 14px rgba(40,10,5,.5))`;
  dyn(d,[{opacity:0},{opacity:0}],{dur:700});
  dyn(s,[{opacity:1,transform:'translateY(-240px) rotate(-12deg)'},{opacity:1,transform:'translateY(8px) rotate(2deg)',offset:.7},{opacity:1,transform:'translateY(0) rotate(0)'}],{dur:650});
  dyn(s,[{opacity:1,transform:'scale(1)'},{opacity:0,transform:'scale(1.12)'}],{dur:420,dt:900});
  dyn(d,[{opacity:1,clipPath:'inset(0 50% 0 50%)'},{opacity:1,clipPath:'inset(0 0 0 0)'}],{dur:720,dt:1000,ease:'cubic-bezier(.3,.8,.3,1)'});
  const st=d.querySelector('.kseal');if(st)dyn(st,[{opacity:0,transform:'scale(2.6) rotate(-14deg)'},{opacity:1,transform:'scale(1) rotate(0)'}],{dur:240,dt:1900,ease:'cubic-bezier(.6,0,.9,.5)'});});
 at(7000,()=>closeModal());
 // 3c KHÁCH
 at(7400,()=>{setCap('Mẫu 3c · Khách tới — bóng người hiện ở cửa rồi mới rõ mặt');const d=show({t:'Người đến thăm',who:pv(v),h:'<p>Có người đứng chờ ngoài cửa viện, xin gặp.</p>',opts:[{n:'Mời vào.',fx:{}},{n:'Nói đang bận.',fx:{}}]});
  dyn(d,[{opacity:0,transform:'translateX(60px)'},{opacity:1,transform:'translateX(0)'}],{dur:520});
  const f=d.querySelector('.kszfig');if(f){dyn(f,[{filter:'brightness(0)'},{filter:'brightness(0)',offset:.45},{filter:'brightness(1.25) saturate(.6)',offset:.8},{filter:'brightness(1) saturate(1)'}],{dur:1500,dt:300,ease:'ease-out'});dyn(f,[{transform:'translateX(80px)'},{transform:'translateX(0)'}],{dur:800,dt:200});}});
 at(10200,()=>closeModal());
 // 3d VIỆC
 at(10600,()=>{setCap('Mẫu 3d · Việc — ảnh đẩy gần, dấu việc đóng xuống, chữ hiện dần');const d=show({t:'Quý nhân mời nàng thưởng trà',h:'<p>Bành quý nhân dừng bên lối hoa, mỉm cười hỏi thăm. Nàng đáp thế nào cho phải đạo?</p>',opts:[{n:'Nhận lời.',fx:{sung:3,suc:-3}},{n:'Từ chối khéo.',fx:{danh:2,bac:-10}},{n:'Dò hỏi chuyện trong cung.',fx:{tamco:1}}]});
  dyn(d,[{opacity:0,transform:'translateY(18px) scale(.97)'},{opacity:1,transform:'none'}],{dur:420});
  const im=d.querySelector('.k3main img');if(im)dyn(im,[{transform:'scale(1)'},{transform:'scale(1.16)'}],{dur:3200,ease:'ease-out'});
  const sl=d.querySelector('.kpseal');if(sl)dyn(sl,[{opacity:0,transform:'scale(2.6) rotate(-12deg)'},{opacity:1,transform:'scale(1) rotate(0)'}],{dur:240,dt:500,ease:'cubic-bezier(.6,0,.9,.5)'});
  const tx=d.querySelector('.k3right');if(tx)dyn(tx,[{clipPath:'inset(0 0 100% 0)'},{clipPath:'inset(0 0 0 0)'}],{dur:900,dt:700,ease:'steps(14,end)',back:true});});
 at(13900,()=>closeModal());
 return 14600};
