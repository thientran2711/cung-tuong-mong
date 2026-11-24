/* scenario definitions run inside the game page (string-evaluated) */
window.SCEN=(function(){
const CDN='https://ctm-img.victoria-tntt.workers.dev/img/';
const F=n=>CDN+'fig-'+n+'.webp',cs=(c,t,a)=>F('consort-'+c+'-'+t+'-'+a),P=KRR.P;
const PL=F('player-look1-t1-a18');
const ACT_M=['Chào hỏi','Trò chuyện','Tặng lễ'],ACT_F=['Hỏi chuyện','Hỏi lén','Nhờ chuyển lời'],ACT_N=['Chào hỏi','Trò chuyện'];
function G9(){return [
 {id:'ta',short:'Ta',cap:'Ta',m:[P(PL,'Ta',{acts:[]})]},
 {id:'dan',short:'Gảy đàn',cap:'Đang gảy đàn',m:[P(cs('c13','t4','a36'),'Cảnh Mai',{acts:ACT_N})]},
 {id:'ca',short:'Cho cá ăn',cap:'Đang cho cá ăn',m:[P(cs('c15','t5','a36'),'Liễu Thanh',{acts:ACT_N})]},
 {id:'cai',short:'Cãi nhau',cap:'Hai người đang cãi nhau',quarrel:1,m:[P(cs('c17','t3','a26'),'Tô Nhược Lan',{dx:-.62,z:1,acts:ACT_N}),P(cs('c18','t2','a26'),'Mạc Tịnh Nghi',{dx:.62,flip:1,acts:ACT_N})]},
 {id:'chat',short:'Trò chuyện',cap:'Đang chuyện trò',m:[P(cs('c14','t4','a36'),'Thẩm Dao',{dx:-1.45,acts:ACT_N}),P(cs('c16','t3','a26'),'Ngọc Hân',{dx:-.5,z:1,acts:ACT_N}),P('', 'Người lạ',{stage:0,dx:.5,z:1,sex:'f',acts:ACT_N}),P(cs('c19','t4','a26'),'Vương Lệ',{dx:1.45,flip:1,acts:ACT_N})]},
 {id:'chu',short:'Dạo vườn',cap:'Đang dạo vườn',m:[P(F('maid-m01-a18'),'Tiểu Mai',{dx:-.9,dy:.055,s:.84,acts:ACT_F,role:'f',kind:'maid'}),P(F('maid-m02-a18'),'Lục Châu',{dx:.9,dy:.055,s:.84,acts:ACT_F,role:'f',kind:'maid'}),P(cs('c20','t5','a26'),'Hạ Vân Thư',{z:2,acts:ACT_M,role:'m'})]},
 {id:'co',short:'Đánh cờ',cap:'Đang đánh cờ',m:[P(cs('c06','t3','a26'),'Bạch Lan',{dx:-.85,acts:ACT_N}),P(cs('c07','t4','a26'),'Chu Dao',{dx:.85,flip:1,acts:ACT_N}),P(cs('c08','t3','a26'),'Lý Tuyết',{dx:2.0,flip:1,s:.96,acts:ACT_N})]},
 {id:'tham',short:'Thì thầm',cap:'Đang thì thầm',m:[P(cs('c09','t2','a26'),'Đường Chỉ Nhu',{dx:-.46,acts:ACT_N}),P(cs('c10','t4','a26'),'Vân Kiều',{dx:.46,flip:1,z:1,acts:ACT_N})]},
 {id:'la',short:'Người lạ',cap:'Đứng một mình',m:[P('','Người lạ',{stage:0,sex:'m',acts:ACT_N})]}]}
function R12(){const ids=['c01','c02','c03','c04','c05','c06','c07','c08','c09','c10','c11'],nm=['Lâm Uyển Nhi',null,'Tô Nhược Lan',null,'Hạ Vân Thư',null,null,'Mạc Tịnh Nghi','Đường Chỉ Nhu',null,null];
 return [{id:'ta',short:'',cap:'',m:[P(PL,'Ta',{acts:[]})]}].concat(ids.map((c,i)=>({id:c,short:'',cap:'',m:[P(F('consort-'+c+'-t1-a18'),nm[i]||'Một tú nữ',{stage:nm[i]?2:1,acts:ACT_N})]})))}
function room(n){const ppl=[['Tố Nguyệt','maid-m05-a18','maid'],['Tiểu Đào','maid-m35-a18','maid'],['Thúy Lũ','maid-m12-a18','npc'],['Hạ Hà','maid-m20-a18','npc'],['Tiểu Điệp','maid-m22-a18','npc'],['Tống ma ma','mama-k01-a51','elder']].slice(0,n);
 return ppl.map(([nm,f,k])=>({id:nm,short:'',cap:'',m:[P(F(f),nm,{kind:k,acts:ACT_N})]}))}
return {G9,R12,room}})();
/* ---- §95 scene through the kit (kitScene + Sc.fig + Sc.box + kitBareOpts) ---- */
window.SCEN.scene=async function(o){
 const Sc=kitScene.open({bg:o.bg,intro:0}),L=Sc.L,g=L.g,ip=document.documentElement.classList.contains('kv2');
 const K=ip?KIT_SCN.ipad:KIT_SCN.fold;const dim=(im,lit)=>{im.style.filter=lit?'drop-shadow(0 0 12px rgba(255,236,170,.9))':'brightness(.62) saturate(.8)'};
 const W=g.w,H=g.H;let figs=[];
 if(o.many){const n=o.many.length,fh=ip?H*.78:H*.5,span=ip?W*.40:W-24,x0=ip?W*.04:12;for(let i=0;i<n;i++){const cx=x0+span*(i+.5)/n;const im=await Sc.fig(o.many[i].src,{cx,top:ip?H-fh-8:H*.04,fh,z:i===o.lit?4:2});dim(im,i===o.lit);figs.push(im)}}
 else{const fh=ip?H*K.fh:H*.60,top=ip?H-fh-4:H*.02;const a=await Sc.fig(o.left.src,{cx:W*(ip?.16:.27),top,fh,z:3});dim(a,1);figs.push(a);
  if(o.right){const b=await Sc.fig(o.right.src,{cx:W*(ip?.36:.70),top:top+(o.right.low?10:0),fh:fh*(o.right.k||1),z:2});if(o.right.flip)b.style.transform='scaleX(-1)';dim(b,0);figs.push(b)}}
 const opts=kitBareOpts(o.opts.map(n=>({n})),()=>{});
 const line=`<div class="kpmain"><p>${o.line}</p></div>`;
 const pos=ip?{x:Math.round(W*K.boxX),y:8,w:Math.round(W*K.boxW),h:H-16}:{x:8,y:Math.round(H*.64),w:W-16,h:Math.round(H*.35)};
 const b=Sc.box(o.title,[line,opts],pos,ip?{y:Math.round(H*.2)}:null);Sc.show();return Sc};
/* ---- scripted sequences for the videos (touch dot = screen-recording marker, not game chrome) ---- */
window.SEQ=(function(){const K=KRR,S=K.S,w=K.wait,gi=K.gi;let fg=null;
 const fing=(x,y,tap)=>{if(!fg){fg=document.createElement('div');fg.style.cssText='position:fixed;z-index:99999;width:44px;height:44px;margin:-22px 0 0 -22px;border-radius:50%;background:rgba(255,255,255,.42);border:3px solid rgba(255,255,255,.9);pointer-events:none;box-shadow:0 0 12px #0008';document.body.appendChild(fg)}fg.style.display=x==null?'none':'block';if(x!=null){const r=document.getElementById('stage').getBoundingClientRect();fg.style.left=(r.left+x)+'px';fg.style.top=(r.top+y)+'px';fg.style.background=tap?'rgba(255,225,130,.7)':'rgba(255,255,255,.42)'}};
 const tap=async(x,y)=>{fing(x,y,0);await w(220);fing(x,y,1);await w(150);fing(null)};
 const reset=()=>{Object.assign(S,{glow:0,pill:0,sel:-1,selm:null,seld:0,appr:0,apprG:-1,apprM:0,sheet:0,push:0});document.querySelectorAll('.kscn').forEach(e=>e.remove());document.body.classList.remove('kscn-on');K.render()};
 const bg=m=>'https://ctm-img.victoria-tntt.workers.dev/img/'+(m==='R'?'kc-sanh':'ngu-hoa-vien')+'.webp';
 const at=async(m,i,ms)=>{if(m==='S')await K.tw('camX',K.camFor(i),ms);else await K.tw('cur',i,ms)};
 const swipe=async(m,y,i,ms)=>{const D=K.D;fing(D.x1-30,y);await w(100);const t0=performance.now();const a=m==='S'?S.camX:S.cur,b=m==='S'?K.camFor(i):i;await new Promise(res=>{(function f(n){const t=Math.min(1,(n-t0)/ms),e=K.ease(t);fing(D.x1-30-(D.x1-D.x0-80)*e,y,1);if(m==='S')S.camX=a+(b-a)*e;else S.cur=a+(b-a)*e;K.render();t<1?requestAnimationFrame(f):res()})(t0)});fing(null)};
 const G=n=>K.GROUPS[gi(n)].m;
 async function g1(m){reset();const D=K.D;await at(m,gi('dan'),1);await w(1300);await swipe(m,D.H*.55,gi('chu'),1100);await w(800);
  S.glow=1;await K.tw('pill',1,350,0);S.pill=1;await w(2200);const pr=m==='S'?{x:D.x0+60,y:56}:{x:D.x0+60,y:26};await tap(pr.x,pr.y);S.pill=0;S.glow=1;
  await at(m,gi('cai'),1000);await w(900);const l=K.LAST[gi('cai')];await tap(m==='S'?(K.PANO.tx+K.PANO.ze*l.cx):l.cx,l.top+(l.y-l.top)*.5);
  if(m==='S'){S.pushG=gi('cai');await K.tw('push',1,600,0)}
  const Sc=await SCEN.scene({bg:bg(m),left:{src:G('cai')[0].src},right:{src:G('cai')[1].src,flip:1},title:'Tô Nhược Lan',line:'Muội dám giẫm lên xiêm y của ta?',opts:['Bước vào can ngăn','Đứng nghe thêm','Lui ra']});await w(2600);Sc.close();await w(400)}
 async function g2(m){reset();const D=K.D;await at(m,gi('co'),1);await w(1000);await swipe(m,D.H*.55,gi('chu'),1000);await w(700);
  const l=()=>K.LAST[gi('chu')],px=()=>m==='S'?(K.PANO.tx+K.PANO.ze*l().cx):l().cx;
  await tap(px()+(l().right-l().left)*.3,l().top+(l().y-l().top)*.5);S.sel=gi('chu');S.selm=1;await Promise.all([K.tw('seld',1,350,0),K.tw('sheet',1,450,0)]);await w(2300);
  await Promise.all([K.tw('seld',0,250),K.tw('sheet',0,250)]);S.sel=-1;S.sheet=0;K.render();await w(500);
  await tap(px(),l().top+(l().y-l().top)*.5);S.sel=gi('chu');S.selm=2;await Promise.all([K.tw('seld',1,350,0),K.tw('sheet',1,450,0)]);await w(2300);
  await Promise.all([K.tw('seld',0,250),K.tw('sheet',0,250)]);S.sel=-1;S.sheet=0;K.render();await w(500);
  S.apprG=gi('tham');S.apprM=0;await at(m,gi('tham'),900);await w(120);await K.tw('appr',1,520);await w(150);
  const Sc=await SCEN.scene({bg:bg(m),left:{src:G('tham')[0].src},right:{src:K.GROUPS[0].m[0].src,k:.96},title:'Đường Chỉ Nhu',line:'Muội muội, ta có đôi lời muốn nói riêng.',opts:['Nghe nàng nói','Hẹn lúc khác']});await w(2600);Sc.close();await w(400)}
 async function r(){reset();const D=K.D;S.cur=1;K.render();await w(1200);await swipe('R',D.H*.55,-3,1000);await w(800);S.apprG=8;S.apprM=0;await K.tw('cur',8,900);await w(120);await K.tw('appr',1,520);await w(150);
  const Sc=await SCEN.scene({bg:bg('R'),left:{src:K.GROUPS[8].m[0].src},right:{src:K.GROUPS[0].m[0].src,k:.96},title:K.GROUPS[8].m[0].name,line:'Muội muội, cho ta nói đôi lời được chăng?',opts:['Nghe nàng nói','Hẹn lúc khác']});await w(2600);Sc.close();await w(400)}
 return {g1,g2,r}})();
window.SCEN.roomReal=n=>liveRivals(true).slice(0,n).map(v=>{let src='';try{src=figFor(v)}catch(e){}return {id:v.name,short:'',cap:'',m:[KRR.P(src,v.name,{kind:'hh',ref:v,stage:2,acts:['Chào hỏi','Trò chuyện']})]}});
