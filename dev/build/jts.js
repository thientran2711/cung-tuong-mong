/* ================= jts: TOP 15 — LÔ A (sếp duyệt 15/11 02:00Z; dev/research/TRUNGSINH_COMPARE.md "Đào sâu" → Top 15)
   Ý 2 Hội phối đồ theo đề · ý 3 Hoàng thượng triệu riêng (đàn, cờ, du hồ; thích khách có điềm báo) · ý 4 Lễ tấn phong (khách chúc, lì xì)
   · ý 5 Ngưỡng xét phẩm hiện trước · ý 6 Nguy hiểm chung · ý 12 Ân thưởng sau sinh · ý 14 Thả đèn hoa đăng.
   Luật chung: mọi thẻ lựa chọn đủ Cần / Tốn / Được / Mất + chữ cơ may (kit j63); thẻ kết quả sau mỗi việc (resultShow);
   mọi chuyện có nguyên nhân thật trong thế giới (sủng, tâm trạng Hoàng thượng, biên cương, tài nghệ, ghen / oán) và điềm báo trước;
   phi tần khác theo cùng luật (hai chiều). Trò nhỏ dùng khung j82 (kg82Open / kg82Play), luôn có "Bỏ qua" tính cơ may thường.
   Tranh: chỉ tranh có sẵn (img/kit/mg-*, img/ev-*, img/kit/mo-*). Không CSS riêng ngoài vài dòng xếp ô theo kit (ts-css). KIT.md mục 39. ================= */
const TSA={};
function tsS(){S.ts=S.ts||{};return S.ts}
function tsOn(){return !!(typeof S!=="undefined"&&S&&!S.dead&&!(typeof isSrv==="function"&&isSrv()))}
/* owner 21/11 ~03:25Z mark #36 (verbatim in OD): «cột ở bên phải của cái màn hình nền sân khấu đó còn có cái thông tin như là nguy hiểm … bên cung nữ cũng phải có những cái
   cột thông tin đó». The two right-column boxes (Nguy hiểm chung, Xét phẩm) stand on the cung nữ road too, same kit rows, same panels; only what they read is hers:
   Nguy hiểm chung = the same sum over the consorts (tsDangerOf, every person the same rule), Xét phẩm = the conditions of HER next rung (j42 srvMonth, one gate). */
function tsBoxOn(){return !!(typeof S!=="undefined"&&S&&!S.dead&&!S.out)}
function tsSrv(){return typeof isSrv==="function"&&isSrv()}
/* her next rung: the srvMonth gate, row by row (Công lao · bậc cung chủ cho phép · Chủ tin; then the Nội vụ phủ exam, jexam exSrv*) */
function tsSrvNext(){try{const r=S.srv.rk|0;if(S.srv.mama||r>=SRK.maid.length-1)return null;return SRK.maid[r+1]}catch(e){return null}}
function tsSrvRows(){const r=S.srv.rk|0,need=srvMpNeed(r),mx=srvMax(),nx=SRK.maid[r+1];const L=[];
 L.push([Math.floor(S.srv.mp)>=need,`Công lao ${kitNeed(S.srv.mp,need)}`]);
 L.push([r<mx,r<mx?`Cung chủ cho lên tới ${SRK.maid[mx]}`:`Cung chủ phẩm này chỉ cho tới ${SRK.maid[mx]||SRK.maid[r]}`]);
 L.push([(S.tin|0)>=BAL.srvx.tinUp,`Chủ tin ${kitNeed(S.tin,BAL.srvx.tinUp)}`]);
 if(S.srv.lau>0)L.push([false,`Đang ở Tân Giả khố (còn ${S.srv.lau} tuần)`]);
 /* cnv-exit-promo (robots s5d / M1: «Xét phẩm: đủ» for years, never promoted): the Nội vụ phủ exam is the LAST gate of the rung (j42 srvMonth → jexam
    exSrvGate); it is a row of its own, so the box never says «đủ» while the exam card waits in Hành sự, lapsed, or is on its wait */
 try{if(typeof exOn==="function"&&exOn()&&typeof exSrvS==="function"){const e=exSrvS(),me=e.to===r+1;
  L.push([false,me&&e.pend?"Khảo hạch Nội vụ phủ đang dở":me&&e.w1!=null?`Khảo hạch Nội vụ phủ: thẻ ở Hành sự, hạn đến hết ${exDateW(e.w1)}`:me&&e.cd>S.turn?`Khảo hạch Nội vụ phủ: lỡ hoặc trượt, chờ đến ${exDateT(e.cd)} mới được thi`:"Đỗ khảo hạch Nội vụ phủ (mở khi đủ các điều trên)"])}}catch(x){}
 return L}
/* palace voice: the maid's warning is a pool (jvoice kLine, no repeat within BAL.voice.noRepeat tuần); {V} = who asks around */
const TS_WARN=["“Dạo này người các cung nhìn {goi} không thiện ý. Nô tỳ nghe bên {V} hỏi giờ giấc cung ta.”","“{Goi}, người bên {V} cứ lảng vảng quanh cửa cung mình. Nô tỳ thấy không yên.”",
 "“Tai vách mạch rừng, {goi} ạ. Bên {V} vừa dò hỏi chuyện ăn uống của cung ta.”","“Nô tỳ nghe phong thanh, {V} đang để mắt đến {goi}. Mấy hôm nay {goi} nên cẩn trọng.”",
 "“Cung nữ bên {V} hỏi han nô tỳ đủ điều, nô tỳ chẳng dám hé răng. {Goi} phải đề phòng.”","“Cây cao thì đón gió, {goi} ạ. Bên {V} xì xào về cung mình đã mấy hôm.”"];
function tsGoi(p){/* one address core (jvoice kAddr, VANPHONG §2) */return kSay({srv:"f"},p||S,"{goi}")}
function tsNm(p){try{if(p===S)return"ngươi";return (p.queen?"Hoàng hậu":RANKS[cl(p.rank||0,0,7)].n)+" "+p.name}catch(e){return p&&p.name||""}}
function tsBot(){return typeof window.__bot!=="undefined"}
function tsLast(){return BUOI.length-1}
/* ---------- one option card: odds word + Được / Mất / Kèm (+ costs in fx → Tốn) + Cần (need) ---------- */
function tsOpt(o){const sure=o.odds==null||o.odds>=100;const L=[sure?"":word(oddsCl(Math.round(o.odds)))];
 if(o.ton&&o.ton.length)L.push("tốn: "+o.ton.join(", "));/* a cost that is not a number of BAL keys (a piece given away: "<món> −1") */
 if(o.duoc&&o.duoc.length)L.push("thành: "+o.duoc.join(" · "));if(o.mat&&o.mat.length)L.push("hỏng: "+o.mat.join(" · "));else if(!sure)L.push("hỏng: không mất gì");
 if(o.kem&&o.kem.length)L.push("kèm: "+o.kem.join(" · "));if(o.note)L.push(`(${o.note})`);
 const need=(o.need||[]).filter(Boolean);return{n:o.n,fx:o.fx||{},x:L.join(" · "),go:o.go,need,tsDis:need.some(x=>!x.ok),tsLater:!!o.later}}
function tsNeedBac(n){return{t:`Bạc ${n} (có ${S.bac})`,ok:S.bac>=n}}
function tsNeedSuc(n){return{t:`Sức ≥${n} (có ${S.suc})`,ok:S.suc>=n}}
/* the Cần row of a dialog option: set before the kit frame reads the button (j63 kaNorm1) */
(function(){if(typeof kaNorm1!=="function")return;const k0=kaNorm1;kaNorm1=function(b){try{if(b&&b.dataset&&b.dataset.ka!=="1"&&b.matches("#modal .opt[data-m]")&&Q[0]&&Q[0].opts){const c=Q[0].opts[+b.dataset.m];
   if(c&&c.need&&c.need.length){b.dataset.kneed=encodeURIComponent(JSON.stringify(c.need));if(c.tsDis)b.disabled=true}}}catch(e){}return k0.apply(this,arguments)}})();
(function(){const c0=chooseM;chooseM=function(i){const m=Q[0];const c=m&&m.opts&&m.opts[i];if(c&&c.tsDis){if(tsBot()){const j=m.opts.findIndex(x=>!x.tsDis);if(j>=0&&j!==i)return chooseM(j);Q.shift();showModal();return}return}if(c&&c.tsLater){TSA.pre=rsnap();window.__tsNoRes=1;try{return c0.apply(this,arguments)}finally{window.__tsNoRes=0}}return c0.apply(this,arguments)}})();
(function(){const r0=resultShow;resultShow=function(){if(window.__tsNoRes)return;return r0.apply(this,arguments)}})();
try{lifeStore("TSA.pre",()=>{TSA.pre=null})}catch(e){}
function tsPre(){const b=TSA.pre||rsnap();TSA.pre=null;return b}
/* a kit panel (event choice that shows outcomes: showOut) with its event picture and the people standing on it */
function tsPanel(o,front){const m={t:o.t,h:o.h,opts:o.opts,who:o.who||null,art:o.art||"",stage:o.stage,showOut:true,btn:o.btn,onClose:o.onClose,tsk:o.tsk||""};if(front)Q.unshift(m);else Q.push(m);return m}
function tsFacts(L){return typeof kitFacts==="function"?kitFacts(L,{group:false}):L.map(x=>`<p>${typeof x==="string"?x:x.text}</p>`).join("")}
function tsRows(R){return typeof kitRows==="function"?kitRows(R):""}
function tsChip(l,n,c){return typeof kitChip==="function"?kitChip(l,n,c):`${l} ${n}`}
function tsRes(title,b,ok){try{if(b)resultShow(title,b,ok)}catch(e){}}
function tsAff(v,n){try{relAdd(S,v,n)}catch(e){}}

/* =============== TRÒ NHỎ: khung j82 + "Bỏ qua" (cơ may thường) =============== */
/* du hồ (hái sen trên thuyền) và thả đèn (dẫn đèn trôi): hai cơ chế mới, chưa môn nào dùng; nền hồ sen đêm trăng (mg-hat-bg), mảnh hat-lotus, doden-lantern */
Object.assign(KG82_KIND,{
 duho:{e:"tspluck",n:"Du hồ",t:"Hái sen dâng Hoàng thượng",how:"Thuyền trôi giữa hồ sen. Chạm vào đóa sen khi nó trôi vào khoảng vàng sát mạn thuyền; sen nở to được nhiều phần hơn búp nhỏ."},
 den:{e:"tssteer",n:"Hoa đăng",t:"Thả đèn trôi xa",how:"Đèn trôi theo dòng, gió đẩy sang ngang. Kéo ngón tay qua lại để đèn đi giữa dòng sáng, tránh hoa sen."}});
KG82_SPR.duho=["hat-lotus"];KG82_SPR.den=["doden-lantern","hat-lotus"];
/* boards: existing event paintings of the palace lake (img/ev-le-ha: hồ ngày hè · img/ev-le-thu-2: đèn trôi trên hồ đêm), cover-fit like every board */
const TS_IMG={"tsduho-bg":"img/ev-le-ha.webp","tsden-bg":"img/ev-le-thu-2.webp"};
(function(){const b0=kg82BgName;kg82BgName=function(kind){if(kind==="duho")return"tsduho-bg";if(kind==="den")return"tsden-bg";return b0.apply(this,arguments)}})();
/* KIT MG-SKIN: the lake boards ask the kit resolver first (kg82SkinSrc: tsduho-bg / tsden-bg -> img/mg/tsduho-<id>.webp / tsden-<id>.webp); no skin, or the file not on the CDN index / failing to load = the event painting above */
(function(){const i0=kg82Img;kg82Img=function(n){if(TS_IMG[n]){const id=KG82.skin&&KG82.skin.id||"",k=id?n+"@"+id:n;let i=KG82_IMG[k];if(!i){i=new Image();i.decoding="async";const d=TS_IMG[n],s=id?kg82SkinSrc(n,id):d,sk=s.indexOf("img/mg/")===0;if(sk)i.onerror=()=>{i.onerror=null;i.src=d};i.src=sk?s:d;KG82_IMG[k]=i}return i}return i0.apply(this,arguments)}})();
function tsEngPluck(box,env){const C=kg82Canvas(box,1,460),{g,W,H}=C;const N=12,lv=env.lv||0,dur=24000,spd=W/(5200+lv*350);const t0=performance.now();
 const L=[];let next=600,made=0,credit=0,got=0,lost=0,wrong=0,stop=false,raf=0;const pops=[];const zx0=W*.28,zx1=W*.72,zy=H*.4,zy1=H*.74;
 const risk=KG82.tsRisk||null;let alarm=null;KG82.tsGuard=null;
 function spawn(tt){const big=Math.random()<.55;L.push({x:W+40,y:zy+(zy1-zy)*(.2+Math.random()*.65),r:big?26+Math.random()*7:16+Math.random()*5,big,born:tt,st:0});made++}
 function draw(now){const tt=now-t0;kg82Bg(g,W,H,"duho",.05,.5);
  kg82FxLane(g,zx0,zx1,zy,zy1,W);/* mg-play2 (law 11, faint guide): the reach zone = the kit lit lane (was a .16 fill + thin dashed line) */
  for(const s of L){if(s.st)continue;if(!kg82Spr(g,"hat-lotus",s.x,s.y,s.r*2.2,null,{alpha:s.big?1:.88}))kg82Blossom(g,s.x,s.y,s.r*.8,"#e48aa4",false)}
  if(alarm&&!alarm.done){g.font=`700 26px ${kg82Col("--display","serif")}`;g.textAlign="left";g.fillStyle="#d9482b";kg82Lbl(g,"!",14,28,40,true);g.font=`700 15px ${kg82Col("--display","serif")}`;kg82Lbl(g,"Lau sậy bên bờ khẽ động",34,24,W-50,true)}
  {/* owner 21/11 ~00:50Z (mg-5s-clear): the reach zone is named, one state-driven guiding line */const inz=L.some(s=>!s.st&&s.x>=zx0&&s.x<=zx1);g.font=`700 13px ${kg82Col("--body","sans-serif")}`;g.textAlign="center";g.fillStyle="#6b4a1c";kg82Lbl(g,"Vùng hái",(zx0+zx1)/2,zy-8,120);
   if(!(alarm&&!alarm.done))kg82Guide(g,inz?"Chạm đóa sen trong vùng sáng!":tt<4500?"Sen trôi từ phải sang · chạm khi vào vùng sáng":"Chờ sen trôi vào vùng sáng rồi chạm",W/2,H*.09,inz?"go":"wait",14,W-16)}
  kg82DrawPops(g,pops,now)}
 function frame(now){if(stop)return;const tt=now-t0;
  if(!alarm||alarm.done){if(tt>next&&made<N){spawn(tt);next=tt+1500+Math.random()*700}}
  for(const s of L){if(s.st)continue;s.x-=spd*16;if(s.x<-40){s.st=2;lost++}}
  if(risk&&!alarm&&tt>dur*.5){alarm={a:tt,done:false};const b=document.createElement("button");b.className="kgbtn ts-guard";b.type="button";b.innerHTML=NWB.ic("shield");b.setAttribute("aria-label","Hộ giá");b.title="Hộ giá";b.onclick=()=>{if(alarm.done)return;alarm.done=true;KG82.tsGuard=1;b.remove();kg82Pop(pops,W/2,H*.3,NWB.POP.ok,"#2d7a52")};box.appendChild(b);alarm.btn=b}
  if(alarm&&!alarm.done&&tt-alarm.a>3500){alarm.done=true;KG82.tsGuard=0;if(alarm.btn)alarm.btn.remove();kg82Pop(pops,W/2,H*.3,NWB.POP.bad,"#8a7350")}
  const left=L.filter(s=>!s.st).length;const done=made>=N&&!left;env.hud({score:mgLive(env,10*Math.min(1,Math.max(0,credit+L.reduce((a,s)=>a+(s.st?0:s.big?1:.45),0)+(N-made)*(.55+.45*.45))/(N*mgFull(env,.62)))),/* review/mg-score-same: the mark in hand (lotuses still coming counted at their mean worth) */round:`Hồi ${Math.min(N,made)}/${N}`,time:`${Math.max(0,Math.ceil((dur-tt)/1000))} giây`});
  draw(now);if(done||tt>dur+4000){stop=true;if(risk&&KG82.tsGuard==null)KG82.tsGuard=0;KG82.why=`Hái được ${got}/${N} đóa sen · để trôi mất ${lost} · chạm ngoài vùng ${wrong} lần`;return env.end(10*Math.min(1,credit/(N*mgFull(env,.62))))}raf=requestAnimationFrame(frame)}
 C.cv.addEventListener("pointerdown",e=>{e.preventDefault();if(stop)return;const [x,y]=C.at(e);let best=null,bd=1e9;for(const s of L){if(s.st)continue;const d=Math.hypot(s.x-x,s.y-y);if(d<s.r*1.25&&d<bd){bd=d;best=s}}
  if(!best)return;if(best.x>=zx0&&best.x<=zx1){best.st=1;got++;credit+=best.big?1:.45;kg82Pop(pops,best.x,best.y-best.r,best.big?NWB.POP.s2:NWB.POP.s1,best.big?"#2d7a52":"#8f5f0c")}else{wrong++;credit-=.15;kg82Pop(pops,best.x,best.y-best.r,NWB.POP.bad,"#c23b22")}});
 KG82.peek=()=>{const s=L.find(s=>!s.st&&s.x>zx0+10&&s.x<zx1-10);return s?C.client(s.x,s.y):null};
 raf=requestAnimationFrame(frame);return()=>{stop=true;cancelAnimationFrame(raf);const b=box.querySelector(".ts-guard");if(b)b.remove()}}
function tsEngSteer(box,env){const C=kg82Canvas(box,1.05,470),{g,W,H}=C;const lv=env.lv||0,dur=20000;const t0=performance.now();let stop=false,raf=0,lx=W/2,tx=W/2,wind=0,good=0,tot=0,hit=0,hitP=0;const pops=[];KG82.denHit=0;
 const pads=[];let nextPad=900;const ly=H*.72;
 /* review/mg-snap: the channel swings wider than the scoring band (BAL.mgTier.lev.den), so a lantern left in the middle drifts out of the light; was a typed swing .22·W
    against a band .8·(.2+.012·lv)·W that covered it (idle play scored 5.5–8.8) */
 const SW=mgLev(env,"den","swing"),BD=mgLev(env,"den","band");
 function chan(tt){return W/2+Math.sin(tt/2100)*W*SW}
 /* mg-play2 (owner OD 20/11 ~08:05Z): the path = the kit lit lane (kg82FxLane, BAL.mgFx: board outside darkened, bright core + glowing edges), the lotus pads wear
    the kit danger ring ✕ (kg82FxBad: things to AVOID, never to catch), a hit = red burst + the pad sinks + the lantern shakes; no words on the board */
 function draw(now){const tt=now-t0;kg82Bg(g,W,H,"den",.04,.55);const cx=chan(tt),cw=W*BD/.8;
  kg82FxLane(g,cx-cw*.8,cx+cw*.8,0,H,W);
  for(const p of pads){const sh=kg82FxBad(g,p.x,p.y,p.r*1.02,now,p.hitAt||0);/* den-look: plain painted lotus, no ring/✕ (the hit burst only) */kg82Spr(g,"hat-lotus",p.x+sh,p.y,p.r*2.1,null,{alpha:p.hit?.4:.95})}
  const lh=hitP?kg82FxBad.shake(now,hitP):0;
  if(!kg82Spr(g,"doden-lantern",lx+lh,ly,48,null,{glow:hit>now?0:1}))kg82Blossom(g,lx+lh,ly,16,"#e06030",true);
  g.font=`700 13px ${kg82Col("--display","serif")}`;g.textAlign="center";kg82Lbl(g,wind>.15?"Gió đẩy sang phải":wind<-.15?"Gió đẩy sang trái":"Lặng gió",W/2,18);/* huong-cue: the wind line is back */
  kg82DrawPops(g,pops,now)}
 function frame(now){if(stop)return;const tt=now-t0;wind=Math.sin(tt/1700)*.6+Math.sin(tt/530)*.25;
  lx+=(tx-lx)*.12+wind*1.6;lx=cl(lx,20,W-20);
  if(tt>nextPad){pads.push({x:20+Math.random()*(W-40),y:-30,r:22+Math.random()*10});nextPad=tt+900+Math.random()*700}
  for(const p of pads)p.y+=H/(5200+lv*300)*16;for(let i=pads.length-1;i>=0;i--)if(pads[i].y>H+40)pads.splice(i,1);
  const cx=chan(tt),cw=W*BD/.8;tot++;if(Math.abs(lx-cx)<cw*.8)good++;
  for(const p of pads){if(!p.hit&&Math.hypot(p.x-lx,p.y-ly)<p.r+14){p.hit=1;p.hitAt=now;hitP=now;KG82.denHit=(KG82.denHit||0)+1;good=Math.max(0,good-40);hit=now+500;kg82Pop(pops,lx,ly-30,"✕",kg82Col("--bad","#c23b22"));try{kg82Pluck(0,false)}catch(e){}}}
  const all=Math.max(tot,tot*dur/Math.max(1,tt));env.hud({score:mgLive(env,10*cl((good+all-tot)/Math.max(1,all),0,1)),round:`Hồi 1/1`,time:`${Math.max(0,Math.ceil((dur-tt)/1000))} giây`});
  draw(now);if(tt>dur){stop=true;return env.end(10*good/Math.max(1,tot))}raf=requestAnimationFrame(frame)}
 const mv=e=>{const [x]=C.at(e);tx=x};C.cv.addEventListener("pointerdown",e=>{e.preventDefault();mv(e)});C.cv.addEventListener("pointermove",e=>{if(e.buttons||e.pointerType==="touch")mv(e)});
 /* guided round (KIT §13.7): the hand DRAGS the lantern to the lit path, and steps aside from a lotus pad about to reach it (shows dodging) */
 const safeX=()=>{const tt=performance.now()-t0,cx=chan(tt),cw=W*BD/.8;let x=cx;for(const p of pads){if(p.hit||p.y>ly+p.r||p.y<ly-H*.32)continue;if(Math.abs(p.x-x)<p.r+22){const l=p.x-(p.r+30),r=p.x+(p.r+30);x=Math.abs(l-cx)<Math.abs(r-cx)&&l>20?l:r<W-20?r:l}}return cl(x,20,W-20)};
 KG82.peek=()=>{if(stop)return null;const x=safeX();if(Math.abs(x-lx)<8)return C.client(x,ly);const a=C.client(lx,ly),b=C.client(x,ly);return{drag:[[a.x,a.y],[b.x,b.y]]}};
 KG82.denPeek=()=>({lx,ly,pads,chan:chan(performance.now()-t0),cw:W*BD/.8,W,H,good,tot});
 raf=requestAnimationFrame(frame);return()=>{stop=true;cancelAnimationFrame(raf)}}
Object.assign(KG82_ENG,{tspluck:tsEngPluck,tssteer:tsEngSteer});
/* tsGame({kind, art, title, odds (cơ may thường 0–100), risk, ctx, intro:[rows], onDone(res)}): res {raw 0–10, skipped, guard} */
function tsGame(o){const odds=oddsCl(Math.round(o.odds||50));const skipRes=()=>{const ok=roll(odds);return{raw:ok?kitSkipCap(BAL.skip.raw):3,skipped:true,ok,/* m-fix-1: a won skip = the capped mark (was 7 = Giỏi, beat a Khá own play) */guard:o.risk?(roll(odds)?1:0):null}};
 if(tsBot()||typeof kg82Open!=="function"){const r=skipRes();setTimeout(()=>o.onDone(r),0);return}
 const K=KG82_KIND[o.kind];KG82.ctx=o.ctx||"hoc";KG82.tsRisk=o.risk||null;KG82.tsGuard=null;try{mgSet(o.kind,{occ:o.occ||"trieu"})}catch(e){KG82.lv=0}kg82Preload(o.kind);
 const d=kg82Open({art:o.art||K.n,title:o.title||K.t,how:K.how,pic:typeof kg82Pic==="function"?kg82Pic(o.kind):""});if(!d){o.onDone(skipRes());return}const box=kg82Box();
 const fin=(r)=>{KG82.phase="result";KG82.tsRisk=null;const rows=[["Màn chơi",r.skipped?`Bỏ qua: tính theo cơ may (${word(odds)}) → ${r.ok?"thuận":"không thuận"}`:`${r.raw}/10 · ${kg82Word(r.raw)}`,"t"]];
  if(o.risk)rows.push(["Hộ giá",r.guard?"kịp lúc":"không kịp, cấm quân lo liệu",r.guard?"g":"n"]);if(o.note)rows.push(["Ghi chú",o.note,"n"]);
  kg82ShowRes(tsRows(rows)+`<div class="kg82act"><button class="kbtn" id="kg82ok">Đã hiểu</button></div>`,r.skipped?!!r.ok:r.raw>=5);kg82Set("score",`${r.raw}/10`);kg82Set("time","đã hết");
  $("kg82ok").onclick=()=>{kg82Close();try{o.onDone(r)}catch(e){console.error(e)}}};
 KG82.phase="intro";box.innerHTML=(o.intro?tsRows(o.intro):"")+`<div class="kg82act"><button class="kbtn" id="kg82go">Bắt đầu</button>${kitQuick({id:"kg82skip",n:"Bỏ qua",sub:`tính theo cơ may thường: ${word(odds)}`})}</div>`;
 kgReady(box,{kind:o.kind});/* KIT §13.7 */
 $("kg82go").onclick=()=>kg82Play(o.kind,raw=>fin({raw,skipped:false,guard:o.risk?(KG82.tsGuard?1:0):null}));$("kg82skip").onclick=()=>fin(skipRes())}
window.tsGame=tsGame;

/* =============== Ý 6 · NGUY HIỂM CHUNG: mọi ghen / oán / ghét nhắm vào một người, gộp làm một thanh (cùng công thức rivalsBuoi, j24) =============== */
/* q(v→t) = cơ một tháng v ra tay với t: cơ mỗi buổi theo mức (BANDS) × phần v nhắm t (pickTarget) qua 9 buổi */
function tsQ(v,t){try{const d=danger(v,t),b=bandCut(v,d);if(!b)return 0;const lo=BANDS[b][0],hi=b<3?BANDS[b+1][0]:100;let c=[0,.03,.04,.05][b]*(1+cl((d-lo)/(hi-lo),0,1));if(t===S)c*=BAL.hz;
  const L=others(v);const w=L.map(x=>1+hostility(v,x));const sh=(1+hostility(v,t))/w.reduce((a,b)=>a+b,0);return 1-Math.pow(1-c*sh,9)}catch(e){return 0}}
function tsNamed(v){try{return typeof k61Named!=="function"||k61Named(v)}catch(e){return true}}
/* "quý" words (VANPHONG §1) */
function tsQuy(a){return quyW(a)}/* ONE CORE: VANPHONG "quý" word (BAL.quyLv) */
function tsDangerOf(t,known){const L=(t===S?liveRivals(true):others(t).filter(x=>x!==S)).filter(v=>v.alive&&!v.out&&v!==t);let p=1;const top=[];let unk=0;
 for(const v of L){const isK=!known||((knows(v)||(S.dKnown&&S.dKnown[v.id]))&&tsNamed(v));if(!isK){unk++;continue}const q=tsQ(v,t);if(q<=0)continue;p*=1-q;top.push({v,q,b:bandVT(v,t)})}
 top.sort((a,b)=>b.q-a.q);return{n:Math.round(100*(1-p)),top,unk}}
const TS_DW=[[0,"yên"],[10,"có kẻ dòm ngó"],[30,"nhiều kẻ muốn hại"],[60,"rất nguy"]];
function tsDWord(n){let w=TS_DW[0][1];for(const [a,b] of TS_DW)if(n>=a)w=b;return w}
function tsDangerPanel(){if(!S||S.dead)return;const D=tsDangerOf(S,true);
 /* OB-OAN (owner 26/11 ~08:25Z «làm cách nào để giảm bớt oán ... giảm cái độ nguy hiểm»): each person = name · mức · oán in words · ghen · WHY (her own memory of
    what she did, jmem memTop, else the stat that drives the danger, j28 danger) — kit facts; then one «Làm lành với …» kit option card per person (the real acts) */
 const facts=D.top.slice(0,6).map(x=>({who:x.v,text:`${kitName?kitName(x.v):x.v.name}: mức ${BANDS[x.b][1]} · ${tsOanTxt(x.v)} · ghen ${x.v.ghen||0} · ${tsWhy(x.v)}`}));
 const sec=`<div class="kpsec"><h4 class="kpst">Thanh chung</h4>${tsRows([["Nguy hiểm chung",`${D.n} · ${tsDWord(D.n)}`,D.n>=BAL.tsDanger.hot?"r":"t"],["Gộp từ",`${D.top.length} người ngươi đã rõ lòng`,"n"],D.unk?["Chưa rõ",`${D.unk} người ngươi chưa rõ lòng (dò la, tai mắt để biết)`,"n"]:null,["Cách giảm",tsLowerTxt("danger"),"n"]].filter(Boolean))}</div>`+
  `<div class="kpsec"><h4 class="kpst">Cách tính</h4>${tsRows([["Mỗi người","Ghen, Oán hoặc ghét (lấy cao nhất) + tính nết → mức hại (thang nguy hiểm)","n"],["Gộp","cơ một tháng có ít nhất một người ra tay với ngươi, từ 0 đến 100","n"],["Áp cho",tsSrv()?"mọi người trong cung, phi tần hay cung nữ, cùng một cách tính":"mọi phi tần, cùng một cách tính","n"]])}</div>`+
  (facts.length?`<div class="kpsec"><h4 class="kpst">Người nặng lòng nhất</h4>${tsFacts(facts)}</div>`:"");
 const opts=[...D.top.slice(0,3).map(x=>tsOptMend(x.v)),tsOptGuard(),tsOptGifts(D),tsOptHelp(),tsOptDef(),{n:"Thôi",fx:{}}].filter(Boolean);/* "Thôi" = the kit ✕ (KIT 32.10), never a button */
 /* its own info picture as before (KIT_INFO «nguy hiểm» → info-nguy-hiem): jk4 kitEvArt guesses an event picture from the words when m.art is empty, and a WHY «tung tin đồn» pulled «cat:tin-don» */
 let art="";try{art=kitInfoArt("Nguy hiểm chung").src||""}catch(e){}
 Q.unshift({t:"Nguy hiểm chung",h:sec,opts,showOut:true,tsk:"danger",art,tabdoor:1/* R14 (owner OD 27/11 ~06:42Z): opened by her tap on the Dư đồ chip, NOT an event — stays the LIVE frame, never a Bàn bài hand (tab-hand-crawl found it) */});showModal()}
/* a dialog she opened from a panel: always the centre modal. dfSeen = the jdfv encounter path is skipped — with the person in her room but her
   figure folded into «+N» (token display:none) that path hid the modal and opened no scene: a dead tap (ob-oan-enc, Fold + iPad) */
function tsDil(d,title){if(!d)return"";const m={t:title||"Việc khó xử",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,dfSeen:1};if(d.art)m.art=d.art;pushModal(m);return""}
/* an opener card (later: no empty result card «không được gì»): the dialog it queues is shown at once, its act shows its own result */
function tsOpener(){TSA.pre=null;setTimeout(()=>{try{const M=$("modal");if(Q.length)showModal()}catch(e){}},0)}
/* ---------- OB-OAN: «Cách giảm» — ONE table of the real ways each rising bad stat comes down (names of the existing acts only; no new rule, no number).
   Read by the Nguy hiểm chung panel (kit row «Cách giảm») and offered to the kit glossary popup (KIT_REQUESTS: KK39 renders kitLowerText(term) as a row). ---------- */
const TS_LOWER={
 danger:"làm lành từng người (Tạ lỗi, Nhún nhường, Biếu quà làm lành) · Đóng cửa giữ mình · Xin Hoàng hậu che chở · Xin Thái hậu đỡ lời · Phòng bị (giao việc cho kẻ hầu)",
 oan:"Tạ lỗi hoặc Nhún nhường khi trò chuyện với người ấy (oán quá sâu thì bị gạt đi) · Biếu quà làm lành · Giúp đỡ nàng · oán tự nguôi dần mỗi tháng nếu ngươi không gây thêm",
 ghen:"Biếu quà làm lành · Thỉnh an Hoàng hậu (Hoàng hậu bớt ghen) · Nhận lời kết giao · Phát lì xì hậu hay vừa phải trong lễ tấn phong · Nhún nhường đáp lễ hay Khéo lời hóa giải khi bị ghen ra mặt",
 ghet:"Hỏi han sức khỏe, Khen tài nghệ nàng, Tặng quà, Giúp đỡ nàng khi trò chuyện · Kết giao",
 sung:"hầu chuyện Hoàng thượng (Tâng bốc, Nói thật lòng, Phô tài, Cắm hoa dâng Hoàng thượng) · Đút lót lật thẻ ở Kính sự phòng · được thị tẩm · Ân tình cao thì sủng giữ lâu",
 benh:"Xin chữa bệnh ở Thái y viện · Nghỉ ngơi dưỡng sức · Nghỉ ngơi một lát",
 danh:"Thỉnh an Thái hậu, Thỉnh an Hoàng hậu (Danh +) · tránh bị bắt quả tang · Xin Thái hậu đỡ lời"};
/* the glossary terms whose number rising is bad for her → the TS_LOWER key (KIT_REQUESTS: the kit glossary popup shows «Cách giảm: …» from kitLowerText) */
const TS_LOWER_TERM={"Oán":"oan","Thù":"oan","Ghen":"ghen","Nguy hiểm":"danger","Nguy hiểm chung":"danger","Thiện cảm":"ghet","Quý":"ghet","Sủng":"sung","Sức khỏe":"benh","Danh":"danh"};
function kitLowerText(term){const k=TS_LOWER_TERM[term];return k?TS_LOWER[k]:""}
window.TS_LOWER_TERM=TS_LOWER_TERM;window.kitLowerText=kitLowerText;
function tsLowerTxt(k){return TS_LOWER[k]||""}
window.TS_LOWER=TS_LOWER;window.tsLowerTxt=tsLowerTxt;
/* oán toward her in words (VANPHONG ladder oanW, BAL.oanLv) + the number */
function tsOanTxt(v){const o=Math.round(oan(v,S)||0);try{return `${oanW(o)} ${o}`}catch(e){return `oán ${o}`}}
/* WHY: the strongest bad memory this person keeps of her (jmem, the real deed she did), else the driver of the danger (j28 danger: ghen / oán / ghét) */
function tsWhy(v){try{const m=typeof memTop==="function"?memTop(v,S,-1):null;if(m)return `vì ngươi đã ${memPhrase(m,"nàng")} (${memAgo(m.w)})`}catch(e){}
 const H=BAL.net.heat,g=(v.ghen||0)*H.ghenK,o=oan(v,S)||0,h=Math.max(0,-aff(v,S))*H.affK;
 return g>=o&&g>=h?"vì ghen ngươi được sủng":o>=h?"vì còn oán ngươi (chưa rõ vì việc gì, dò la để biết)":"vì không ưa ngươi"}
/* a talk option of the place (talkOpts / topicOpts: the SAME option object, odds, cost and run) as a kit option card; khắc = talkK (one rule) */
function tsTalkOpt(a,n,need0){if(!a)return null;const k=talkK(a),run=!!a.run,sure=run||a.o==null||a.o>=100;
 const need=[{t:`còn ${k} khắc`,ok:can(k)}].concat(need0||[]);if(a.lock)need.push({t:a.t||"chưa đủ điều kiện",ok:false});else if(!canPay(a))need.push(tsNeedBac(-(a.c&&a.c.bac||0)+payWinBac(a)));
 const duoc=run?[String(a.x||"").replace(/^thành:\s*/,"")].filter(Boolean):[fmt(a.w||{}),a.x||""].filter(Boolean);
 return tsOpt({n:n||a.n,fx:a.c||{},odds:sure?null:a.o,ton:[`${k} khắc`],duoc,mat:sure?[]:[failTxt(a)||"không mất gì"],need,
  go:()=>{spend(k);/* fx (a.c) is paid by the card; the act runs without paying it again */const b=Object.assign({},a,{c:null});
   if(run){const r=oddsCapped(b)&&!roll(BAL.odds.hi)?oddsSoft(b.n,a.c):b.run();if(r)log(`${a.n}: ${r}`)}else runOpt(b)}})}
/* one person: «Làm lành với <phẩm tên>» → her real ways with that person (Tạ lỗi, Nhún nhường, Thỉnh an for the Hoàng hậu, Biếu quà làm lành for her alone) */
/* the raw talk options of a person (J1 ACT-MERGE jdoor: talkOpts returns the «Trò chuyện» door list; doorRaw = the same option objects as before) */
function tsTalkL(p){return typeof doorRaw==="function"?doorRaw(p):talkOpts(p)}
function tsMendL(v){const p=v&&v.queen&&rivals[0]===v?{kind:"hh",ref:v}:{kind:"rival",ref:v};let A=[];try{A=tsTalkL(p)}catch(e){}
 return ["Tạ lỗi","Nhún nhường","Thỉnh an"].map(n=>A.find(a=>a.n===n)).filter(Boolean)}
function tsOptMend(v){if(!v)return null;const L=tsMendL(v),G=BAL.tsGift;const can0=L.length>0||S.bac>=G.bac;
 return tsOpt({n:`Làm lành với ${tsNm(v)}`,need:can0?[]:[{t:`Bạc ${G.bac} để biếu quà (có ${S.bac})`,ok:false}],duoc:[L.map(a=>a.n).concat(["Biếu quà làm lành"]).join(", ")],kem:[`${tsOanTxt(v)} · ghen ${v.ghen||0}`],
  later:1,go:()=>{tsOpener();/* an opener: the act it opens shows its own result */tsDil(mkP("tsmend",{v:v.id}),`Làm lành với ${tsNm(v)}`)}})}
PEND.tsmend=p=>{const v=RV(p.v);if(!v||v.alive===false||v.out)return null;const G=BAL.tsGift;
 /* Tạ lỗi / Nhún nhường are gạt đi while her oán is at or above her own forgiving line (jnet netForgive, the same check the act runs): said on the card */
 const fg=netForgive(v,S),th=netTh(v,"nguoi");
 const o=tsMendL(v).map(a=>tsTalkOpt(a,null,/^(Tạ lỗi|Nhún nhường)$/.test(a.n)?[{t:`nàng còn chịu nghe: oán dưới ${th} (đang ${Math.round(oan(v,S))})`,ok:fg}]:[]));
 o.push(tsOpt({n:"Biếu quà làm lành",need:[{t:`Bạc ${G.bac} (có ${S.bac}), hoặc một tác phẩm hay món đồ đủ lễ`,ok:S.bac>=G.bac||tsGiftPieces(S,v,null).some(x=>x.w.ok)}],duoc:[tsGiftEaseTxt(S,v)],
  kem:[`lễ bạc ${G.bac}, hoặc một tác phẩm tự tay làm hay một món trong rương`],later:1,go:()=>{tsOpener();/* an opener: the act it opens shows its own result */tsDil(mkP("tsgift",{L:[v.id]}),"Biếu quà làm lành")}}));
 o.push({n:"Thôi",fx:{}});
 return{who:pv(v),t:`<p>${tsNm(v)}: ${tsOanTxt(v)} · ghen ${v.ghen||0} · ${tsWhy(v)}.</p>${tsRows([["Cách giảm",tsLowerTxt("oan"),"n"]].concat(fg?[]:[["Lưu ý",`oán còn quá sâu (từ ${th} trở lên), lời tạ lỗi bị gạt đi: biếu quà làm lành cho nguôi bớt trước`,"r"]]))}`,o}};
/* the patrons (Xin Hoàng hậu che chở / Xin Thái hậu đỡ lời: the same talkOpts options, odds and gates) */
function tsHelpL(){const A=[];try{if(typeof qOn==="function"&&qOn()&&rivals[0]&&rivals[0]!==S){const h=tsTalkL({kind:"hh",ref:rivals[0]}).find(a=>a.n==="Xin Hoàng hậu che chở");if(h)A.push(h)}}catch(e){}
 try{if(!S.thDead){const t=tsTalkL({kind:"th"}).find(a=>a.n==="Xin Thái hậu đỡ lời");if(t)A.push(t)}}catch(e){}return A}
function tsOptHelp(){if(tsSrv())return null;const L=tsHelpL();if(!L.length)return null;
 return tsOpt({n:"Nhờ bề trên che chở",need:[{t:L.filter(a=>!a.lock).length?"có người để nhờ":L.map(a=>a.t).join("; "),ok:L.some(a=>!a.lock)}],duoc:[L.map(a=>a.n).join(", ")],later:1,go:()=>{tsOpener();/* an opener: the act it opens shows its own result */tsDil(mkP("tshelp",{}),"Nhờ bề trên che chở")}})}
PEND.tshelp=()=>{const L=tsHelpL();if(!L.length)return null;return{t:`<p>Nhờ bề trên đứng ra che chở, kẻ muốn hại ngươi phải dè chừng.</p>`,o:L.map(a=>tsTalkOpt(a)).concat([{n:"Thôi",fx:{}}])}};
/* Phòng bị: the servants' standing orders (j70, the same dialog as the Kẻ hầu tab) */
function tsOptDef(){if(typeof def70m!=="function"||typeof j70On!=="function"||!j70On())return null;
 return tsOpt({n:"Phòng bị",duoc:["giao kẻ hầu canh cung, thử độc, theo dõi kẻ muốn hại"],kem:["kẻ hầu bận việc, có lệnh tốn bạc mỗi tháng"],later:1,go:()=>{tsOpener();/* an opener: the act it opens shows its own result */Q.unshift(def70m({s:1}))}})}
try{KIT_ACT_PIDS.add("tsmend");KIT_ACT_PIDS.add("tshelp")}catch(e){}
/* ONE act, two roads (rv maid-8tabs FAIL 1, laws 2/3/4/6): a consort shuts her palace door (cost Sủng, sees the Emperor less); a cung nữ has no palace
   door, no servants and no Sủng — she keeps to the hạ nhân room and her chủ's side (cost Chủ tin, her Sủng bar: the chủ gets less of her). Same gain
   (s.guard: jts npcAct wrapper + jagharm haGuardW read it for S on every road), same weeks; numbers from BAL.tsGuard. */
function tsGuardW(){const G=BAL.tsGuard,srv=tsSrv();return srv?{n:"Nép mình theo hầu chủ",fx:{tin:-G.tin},need:{t:"không ở Tân Giả khố",ok:!(S.srv.lau>0)},kem:"chủ ít thấy mặt ngươi",
  log:`Ngươi ở yên trong phòng hạ nhân, chỉ theo sát bên chủ, ${G.wk} tuần không đi đâu một mình.`}
 :{n:"Đóng cửa giữ mình",fx:{sung:-G.sung},need:{t:"không cấm túc",ok:!S.confined},kem:"ít gặp Hoàng thượng",log:`Ngươi đóng cửa cung, dặn kẻ hầu canh giữ nghiêm, ${G.wk} tuần không ra ngoài nhiều.`}}
function tsOptGuard(){const s=tsS(),A=tsGuardW(),G=BAL.tsGuard;if(s.guard>wk())return tsOpt({n:A.n,need:[{t:`chưa giữ mình (còn ${s.guard-wk()} tuần)`,ok:false}],duoc:["kẻ muốn hại khó ra tay"]});
 return tsOpt({n:A.n,fx:A.fx,need:[A.need],duoc:[`${G.wk} tuần: mưu hại nhắm vào ngươi thành ít đi một nửa`],kem:[A.kem],go:()=>{s.guard=wk()+G.wk;log(A.log)}})}
/* =============== D19 (owner OD:L752) · BIẾU QUÀ LÀM LÀNH — ONE act, three roads (review/d19-gift-work) ===============
   The act "Biếu quà làm lành" (Nguy hiểm chung panel + the maid's warning) opens ONE choice of three kit option cards:
   · Lễ bạc — as before: every person who bears her ill will (≤ 4) gets BAL.tsGift.bac bạc of gifts;
   · Tác phẩm tự tay làm / Đồ trong rương — ONE piece for the person who bears the most ill will, instead of her share of bạc.
   Equivalent value (OD:L582): a piece stands in for the bạc share when it is worth at least BAL.tsGift.bac bạc TO THE RECEIVER: its sale
   price (econPrice, the ONE sale API) × her taste on the ONE gift scale — a work by wkEval (her tastes, fatigue, chân tình, Tham vọng /
   Kiêu ngạo, material), an item by giftVal (her tastes). So a liked piece costs her what the bạc does; a piece she does not care for costs
   more (taste matters); jlux.luxGift's word (mọn / vừa / hợp / quá hậu) is shown as a note. The
   card says what she gives up ("mất: <món> · bán được N bạc") and what she gets (thiện cảm by the piece: the ONE gift preview giftEval).
   The piece goes through giveTo (ONE gift rule for her and every consort). The same functions serve every NPC (tsNpcGift): a consort whom
   many want to harm sends the cheapest road that is enough. Ghen is only ever aimed at her (j28 danger), so a consort's gift eases oán. */
function tsGiftL(D){return D.top.filter(x=>x.b>=1).slice(0,4)}
function tsGiftNo(e){if(!e||e.h)return true;try{if(typeof wdIsNt==="function"&&wdIsNt(e))return true;if(typeof isDh==="function"&&isDh(e))return true}catch(x){}return e.k==="mcnt"}
/* worth of a piece TO THE RECEIVER, in bạc: what it sells for (econPrice) × her taste (the ONE gift scale: wkEval v / WVAL of its grade for a
   work — chân tình, her art, Tham vọng, fatigue; giftVal / its value to someone who likes it for an item). Enough = at least the bạc share. */
function tsGiftWorth(e,v,a){a=a||S;if(tsGiftNo(e))return{ok:false,why:"",q:-1,bac:0,wb:0};const G=BAL.tsGift;let bac=0;try{bac=econPrice(a,e)}catch(x){}
 const fin=(f,why0,note)=>{const wb=Math.round(bac*f),ok=wb>=G.bac;return{ok,why:ok?"":why0,q:Math.round(f*100)/100,bac,wb,note}};
 if(e.wk){const ev=wkEval(a,e.wk,v);if(!ev.ok)return{ok:false,why:ev.why||"nàng không nhận đồ này",q:-1,bac,wb:0};const b0=WVAL[Math.max(0,Math.min(3,e.wk.ti|0))]||1;
  return fin(ev.v/b0,"tác phẩm còn mỏng, chưa đủ lễ",ev.notes.join("; "))}
 const it=IT[e.k];if(!it)return{ok:false,why:"",q:-1,bac,wb:0};if(e.t)return{ok:false,why:"đồ đã tẩm, không thể biếu",q:-1,bac,wb:0};
 const q=giftVal(Object.assign({k:e.k},it),v),full=giftVal(Object.assign({k:e.k},it,{tg:["rv","hh"]}),v)||1;let lg=null;try{lg=luxGift(e.k,a,v)}catch(x){}
 return fin(q/full,q<full?"nàng không ưa món này, chưa đủ lễ":"món còn nhẹ, chưa đủ lễ",lg?lg.word:"")}
/* the pieces of a kind ("wk" works, "it" items, null both) that could go to v: [{e,i,w}], enough first, then the cheapest to give up */
function tsGiftPieces(a,v,kind){return (a.inv||[]).map((e,i)=>({e,i})).filter(({e})=>!tsGiftNo(e)&&(kind==null||(kind==="wk")===!!e.wk)).map(o=>Object.assign(o,{w:tsGiftWorth(o.e,v,a)}))
 .sort((x,y)=>(y.w.ok-x.w.ok)||(x.w.bac-y.w.bac))}
/* what the gift eases: ghen (aimed only at her) and oán toward the giver */
/* d19-gift-npc (OPEN «bớt oán 5 has no effect», law 4 + 3): the line names what REALLY eases — at most BAL.tsGift.ghen / .oan, never more
   than she still holds (a grudge already at 0 cannot ease 5). tsGiftEase returns the real amounts; the card's preview reads the same cap. */
function tsGiftEaseN(a,v){const G=BAL.tsGift;return{gh:a===S?Math.min(G.ghen,Math.max(0,v.ghen||0)):0,oa:Math.min(G.oan,Math.max(0,oan(v,a)))}}
function tsGiftEase(a,v){const g0=v.ghen||0,o0=oan(v,a);const N=tsGiftEaseN(a,v);if(a===S)v.ghen=cl(g0-N.gh,0,100);if(N.oa)oanAdd(v,a,-N.oa);return{gh:g0-(v.ghen||0),oa:o0-oan(v,a)}}
function tsGiftEaseTxt(a,v,N){N=N||tsGiftEaseN(a,v);const P=[];if(a===S&&N.gh>0)P.push(`bớt ghen ${N.gh}`);if(N.oa>0)P.push(`bớt oán ${N.oa}`);
 return P.length?`${v.name} ${P.join(", ")}`:`${v.name} vốn đã nguôi lòng, chỉ thêm thiện cảm`}
/* road 1: bạc (her or any consort; her bạc is taken by the option's fx) */
function tsGiftBac(a,L){const G=BAL.tsGift;if(a!==S)ap(a,{bac:-L.length*G.bac});return L.map(v=>{const N=tsGiftEase(a,v);relAdd(a,v,G.aff);return N})}
/* roads 2 and 3: one piece (her or any consort) */
function tsGiftPiece(a,v,i){const e=a.inv[i];const w=tsGiftWorth(e,v,a);if(!w.ok)return"";const nm=giftName(e);const same=()=>(a.inv||[]).filter(x=>x&&x.k===e.k&&!x.h&&(e.wk?x.wk&&x.wk.n===e.wk.n:!x.wk)).length,c0=same();giveTo.out=null;const r=giveTo(a,v,i);
 const home=(a.inv||[]).includes(e)||same()>=c0;if(!r)return"";
 /* review r1: she may refuse it (jdis: a piece she does not like stays in the chest) → nothing eased, nothing lost (no free peace).
    K-GIFT-OUT (KK64, KIT-KRI-XL leftover 3): «kept» reads giveTo.out — jrcv «back» hands the giver a COPY of the piece (never the same object, so the old
    «a.inv.includes(e)» test never saw it and the peace came free); jdis «refused» keeps the very piece. «found» / «caught» (the taint was seen): the piece is gone, nothing eased (lost).
    d19-gift-npc: a work goes through the same receiver choice (j83 wkGive sets giveTo.out «back» / «found»); «home» = the piece, or a piece of the same kind
    (same item key / same work), is back in her chest — a second guard beside giveTo.out. */
 const o=giveTo.out;if(o==="back"||o==="refused"||home)return{r,nm,bac:w.bac,kept:true};if(o==="found"||o==="caught")return{r,nm,bac:w.bac,lost:true};const N=tsGiftEase(a,v);return{r,nm,bac:w.bac,N}}
/* the act card (one card, in the panel and in the warning) */
function tsOptGifts(D){const L=tsGiftL(D);if(!L.length)return null;const G=BAL.tsGift,c=L.length*G.bac,x=L[0];
 const nW=tsGiftPieces(S,x.v,"wk").filter(o=>o.w.ok).length,nI=tsGiftPieces(S,x.v,"it").filter(o=>o.w.ok).length;
 return tsOpt({n:"Biếu quà làm lành",need:[{t:`Bạc ${c} (có ${S.bac}), hoặc một tác phẩm hay món đồ đủ lễ`,ok:S.bac>=c||nW+nI>0}],duoc:L.map(y=>tsGiftEaseTxt(S,y.v)),
  kem:[`trả bằng lễ bạc (${G.bac} bạc mỗi người), hoặc một tác phẩm tự tay làm hay một món trong rương cho ${x.v.name}`],later:1,go:()=>{tsOpener();/* an opener: the act it opens shows its own result */tsDil(mkP("tsgift",{L:L.map(y=>y.v.id)}),"Biếu quà làm lành")}})}
PEND.tsgift=p=>{const L=(p.L||[]).map(RV).filter(v=>v&&v.alive!==false&&!v.out);if(!L.length)return null;const G=BAL.tsGift,c=L.length*G.bac,v=L[0];
 const P=k=>tsGiftPieces(S,v,k).filter(o=>o.w.ok),W=P("wk"),I=P("it");const cheap=A=>A.length?Math.min(...A.map(o=>o.w.bac)):0;
 const piece=(k,n,A,what)=>tsOpt({n,need:[{t:`${what} đủ lễ với ${v.name} (có ${A.length})`,ok:A.length>0}],duoc:[tsGiftEaseTxt(S,v),"thiện cảm theo món quà, nàng ưa thì thêm"],
  ton:A.length?[`${what} −1 (rẻ nhất bán được ${cheap(A)} bạc)`]:[],kem:[`thay cho ${G.bac} bạc lễ của ${v.name}`],later:1,go:()=>{tsOpener();/* KIT-KRI-XL (E-S5 kipgo-ui3, law 3): an opener like every other D19 / mend road — the piece picker shows at once and the GIFT shows its own result; before, an empty card «ta không được gì, cũng không mất gì» came first under the picker */tsDil(mkP("tsgiftpick",{v:v.id,k}),"Biếu quà làm lành")}});
 return{who:pv(v),t:`<p>Biếu quà làm lành: một phần lễ là ${G.bac} bạc mỗi người. Thay bạc, có thể biếu ${v.name} (người nặng lòng nhất) một tác phẩm tự tay làm hay một món trong rương, miễn nàng thấy đủ lễ.</p>`,
  o:[tsOpt({n:"Lễ bạc",fx:{bac:-c},need:[tsNeedBac(c)],duoc:L.map(y=>tsGiftEaseTxt(S,y)),kem:[`${L.length} người, ${G.bac} bạc mỗi người`],
     go:()=>tsGiftBacGo(L)}),
   piece("wk","Tác phẩm tự tay làm",W,"tác phẩm"),piece("it","Đồ trong rương",I,"món đồ"),{n:"Thôi",fx:{}}]}};
/* the piece picker (k: "wk" / "it"; an old save's pending picker has no k = both) */
/* live-bugs-2711 (F s16c 27/11: 326 tiles, every confirm disabled; s2f 686 / s14 794): only the pieces that ARE enough are offered (law 6c: what
   she owns and can give); the rest is one line in the text (how many, why), never hundreds of dead tiles (gift-dead-scan) */
PEND.tsgiftpick=p=>{const v=RV(p.v);if(!v)return null;const G=BAL.tsGift;const A0=tsGiftPieces(S,v,p.k||null),A=A0.filter(o=>o.w.ok);
 return{who:pv(v),t:`<p>Chọn ${p.k==="wk"?"tác phẩm":p.k==="it"?"món đồ":"món"} biếu ${v.name} để làm lành. Món phải đáng một phần lễ bạc (${G.bac} bạc) trong mắt nàng: nàng ưa món nào thì món ấy nặng hơn.</p>`+giftRestNote(A0.length-A.length,`chưa đủ lễ với ${v.name} (chưa đáng ${G.bac} bạc trong mắt nàng)`),o:A.map(({e,i,w})=>{
  let gain="";try{const ge=giftEval(e,v);const m=ge&&ge.ok&&/thành: (.*?)(?: · kèm: |$)/.exec(ge.x||"");gain=m?m[1]:""}catch(x){}
  return{cap:0,n:giftName(e),ik:i,fx:{},x:w.ok?`${capW()} · tốn: ${G.khac} khắc, ${giftName(e)} −1 (bán được ${w.bac} bạc; nàng coi như ${w.wb} bạc) · thành: ${tsGiftEaseTxt(S,v)}${gain?", "+gain:""}${w.note?" · kèm: "+w.note:""}`:"",need:w.ok?[]:[{t:(w.why||"không biếu được")+(w.q>=0?` (nàng coi như ${w.wb} bạc, cần ${G.bac})`:""),ok:false}],tsDis:!w.ok,
   go:()=>{if(!w.ok)return;tsGiftPieceGo(v,i)}}}).concat([{n:"Thôi",fx:{}}])}};
/* her two roads as ONE function each (the card's choice ends here; coop-thin F3: a co-op guest's choice becomes an intent here) */
function tsGiftBacGo(L){const c=L.length*BAL.tsGift.bac;const N=tsGiftBac(S,L);log(`Ngươi sai người mang quà sang ${kitNameList(L)}, lời lẽ mềm mỏng. Được: ${L.map((y,i)=>tsGiftEaseTxt(S,y,N[i])).join("; ")}. Mất: ${c} bạc.`)}
function tsGiftPieceGo(v,i){const G=BAL.tsGift;const R=tsGiftPiece(S,v,i);if(!R)return;spend(G.khac);/* khắc only when the piece really went (review r1) */if(R.kept){log(`${R.r}Lễ làm lành không thành, lòng nàng chưa dịu.`);return}if(R.lost){log(`${R.r}Lễ làm lành không thành, lòng nàng chưa dịu. Mất: ${R.nm}.`);return}log(`${R.r}Lời lẽ mềm mỏng, lòng nàng dịu đi. Được: ${tsGiftEaseTxt(S,v,R.N)}. Mất: ${R.nm} (bán được ${R.bac} bạc).`)}
/* both are pickers she opened herself: full act cards (Được / Mất), not hidden event outcomes (jk2b KIT_ACT_PIDS, as jpoison) */
try{KIT_ACT_PIDS.add("tsgift");KIT_ACT_PIDS.add("tsgiftpick")}catch(e){}
/* NPC side, the same rule: the cheapest road that is enough (a piece worth less bạc than her bạc share, else bạc, else nothing) */
function tsNpcGift(a,D){const L=tsGiftL(D);if(!L.length)return"";const G=BAL.tsGift,v=L[0].v;const A=tsGiftPieces(a,v,null).filter(o=>o.w.ok&&o.w.bac<=G.bac*L.length);
 /* d19-gift-npc: a piece sent back (or refused) stays hers and eases nothing; she then tries the bạc road as before, and the news keeps the refusal */
 let pre="";if(A.length){const R=tsGiftPiece(a,v,A[0].i);if(R&&!R.kept)return R.r;if(R&&R.kept)pre=R.r}
 if((a.bac||0)>=L.length*G.bac){tsGiftBac(a,L.map(x=>x.v));return `${pre}${rkName(a)} ${a.name} sai người mang quà sang ${kitNameList(L.map(x=>x.v))}.`}return pre.trim()}
/* the guard: same rule for everyone (a target who keeps to herself is harder to reach) */
(function(){if(typeof npcAct!=="function")return;const n0=npcAct;npcAct=function(v,t){try{const g=t===S?tsS().guard:t&&t.tsGuard;if(g>wk()&&roll(50))return""}catch(e){}return n0.apply(this,arguments)}})();
/* NPC side: a consort whom many want to harm closes her doors / sends gifts, by her own nature (same costs) */
function tsNpcDanger(){for(const v of liveRivals(true)){if(!v.alive||v.out||v.tsGuard>wk())continue;if(!npcWhy("tsGuard",{v}))continue;v.tsGuard=wk()+BAL.tsGuard.wk;v.sung=cl((v.sung||0)-BAL.tsGuard.sung,0,100);/* the same act and cost as hers (law 1, BAL.tsGuard) */
  /* D19: and she sends a peace gift by the same rule as the player (tsNpcGift) */try{const t=tsNpcGift(v,tsDangerOf(v,false));if(t&&typeof newsAdd==="function")newsAdd(v,"gift",t)}catch(e){console.error("tsNpcGift",e)}}}
/* the HUD chip (Tình trạng row) + điềm báo when her own known bar climbs a step */
/* review ts-a FAIL 2: the chip sits in the stage's right column (K3_RIGHT), never on the top bar's buổi line (it broke the date line on Fold) */
if(window.K3_RIGHT)window.K3_RIGHT.push("tsnh");
(function(){if(typeof renderHud2!=="function")return;const r0=renderHud2;renderHud2=function(){const r=r0.apply(this,arguments);try{const el=$("hud2");if(el&&tsBoxOn()){const D=tsDangerOf(S,true);
  el.insertAdjacentHTML("beforeend",`<button class="hc ${D.n>=BAL.tsDanger.hot?"hot":D.n<BAL.tsDanger.calm?"ok":""}" data-hx="tsnh">Nguy hiểm chung: ${D.n}</button>`)}}catch(e){}return r}})();
document.addEventListener("click",e=>{const b=e.target.closest('[data-hx="tsnh"],[data-k3="tsnh"]');if(!b||!tsBoxOn())return;e.stopPropagation();e.preventDefault();if(Q.length)return;tsDangerPanel()},true);
function tsDangerOmen(){const s=tsS();const D=tsDangerOf(S,true);const st=TS_DW.filter(x=>D.n>=x[0]).length-1;const was=s.dStep||0;s.dStep=st;if(st<=was||st<2||!D.top.length)return;
 tsWarnCard(D.top[0].v)}
/* save-unseen-lists r4 (LAW 11 / 6c): the card is BUILT by a registered generator (j3 rcpReg) from the warned-of rival only — the step mark (s.dStep)
   is set before it — so it is written into the sổ as {rk,ra} and made again on load (before: a code card a step write left out = lost on reload) */
const tsWarnCard=rcpReg("tsWarn",xv=>{if(!xv||!S.maid)return null;const D=tsDangerOf(S,true);return tsPanel({t:"Lời cảnh báo",who:pMaid(),h:`<p>${S.maid.name} khẽ thưa: ${kLine("ts:warn",kTP("ts:warn")||TS_WARN,{sp:{srv:"f"},ls:S,t:kToneSt(S.maid,S.maid&&S.maid.name)}).replace(/\{V\}/g,xv.name)}</p>${tsRows([["Nguy hiểm chung",`${D.n} · ${tsDWord(D.n)}`,"r"]])}`,
  opts:[tsOptMend(xv),tsOptGuard(),tsOptGifts(D),tsOpt({n:"Ghi nhớ, cứ như thường",duoc:[`Sức +${BAL.cv.rest}`],kem:["kẻ muốn hại vẫn rình"],go:()=>apply({suc:BAL.cv.rest})})].filter(Boolean)})});

/* =============== Ý 5 · NGƯỠNG XÉT PHẨM HIỆN TRƯỚC (promoReqP j8: cùng điều kiện cho mọi phi tần) =============== */
function tsPromoRows(){const L=promoReqP(S);return L.map(([ok,t])=>[ok?"Đủ":"Thiếu",t,ok?"g":"r"])}
function tsPromoPanel(pre){if(tsSrv()){if(!pre)tsSrvPromoPanel();return}if(!tsOn()||S.out||S.rank>=7)return;const L=promoReqP(S);if(!L.length)return;const miss=L.filter(x=>!x[0]).length;const nx=RANKS[S.rank+1].n;
 const m={t:`Xét phẩm cuối tháng · ${nx}`,h:`${pre?`<p>Cuối tháng này Nội vụ phủ dâng danh sách lên Hoàng thượng xét tấn phong. Còn ${3-S.tuan} tuần.</p>`:""}<div class="kpsec"><h4 class="kpst">Điều kiện lên ${nx}</h4>${tsRows(tsPromoRows())}</div>${tsRows([["Ghi chú",miss?`thiếu ${miss} điều: đủ hết thì cuối tháng được sắc phong`:"đủ cả: cuối tháng được sắc phong nếu không gì đổi","n"]])}`,btn:"Đã hiểu",tsk:"promo"};
 if(pre)Q.push(m);else{Q.unshift(m);showModal()}}
/* cung nữ: the same panel (title, kit rows «Đủ / Thiếu», note) on her next rung */
function tsSrvPromoPanel(){if(!tsBoxOn()||!tsSrv())return;const nx=tsSrvNext();if(!nx)return;const L=tsSrvRows();const miss=L.filter(x=>!x[0]).length;
 const ex=typeof exOn==="function"&&exOn();
 Q.unshift({t:`Xét phẩm cuối tháng · ${nx}`,h:`<div class="kpsec"><h4 class="kpst">Điều kiện lên ${nx}</h4>${tsRows(L.map(([ok,t])=>[ok?"Đủ":"Thiếu",t,ok?"g":"r"]))}</div>${tsRows([["Ghi chú",ex&&miss===1&&!L.find(x=>!x[0]&&!/khảo hạch/i.test(x[1]))?"đủ công: dự khảo hạch Nội vụ phủ (thẻ ở Hành sự khi mở); đỗ thì được thăng":(miss?`thiếu ${miss} điều: đủ hết thì cuối tháng Nội vụ phủ ghi công`:"đủ cả: cuối tháng Nội vụ phủ ghi công")+(ex?", rồi ngươi dự khảo hạch Nội vụ phủ (Hành sự); đỗ thì được thăng":", được thăng"),"n"]])}`,btn:"Đã hiểu",tsk:"promo"});showModal()}
if(window.K3_RIGHT)window.K3_RIGHT.push("tsxp");
(function(){if(typeof renderHud2!=="function")return;const r0=renderHud2;renderHud2=function(){const r=r0.apply(this,arguments);try{const el=$("hud2");if(el&&tsBoxOn()&&tsSrv()&&tsSrvNext()){const miss=tsSrvRows().filter(x=>!x[0]).length;
  el.insertAdjacentHTML("beforeend",`<button class="hc ${miss?"":"ok"}" data-hx="tsxp">Xét phẩm: ${miss?`thiếu ${miss}`:"đủ"}</button>`)}else if(el&&tsOn()&&!S.out&&S.rank<7){const L=promoReqP(S);if(L.length){const miss=L.filter(x=>!x[0]).length;
  el.insertAdjacentHTML("beforeend",`<button class="hc ${miss?"":"ok"}" data-hx="tsxp">Xét phẩm: ${miss?`thiếu ${miss}`:"đủ"}</button>`)}}}catch(e){}return r}})();
document.addEventListener("click",e=>{const b=e.target.closest('[data-hx="tsxp"],[data-k3="tsxp"]');if(!b||!tsBoxOn())return;e.stopPropagation();e.preventDefault();const md=document.getElementById("modal");if(md&&!md.hidden)return;/* KIT §56.26: a card QUEUED but not shown no longer swallows the tap: the panel opens in front, the queued card follows */tsPromoPanel(false)},true);
/* festivals (j3/j8 festival): the two judged banquets say beforehand what is judged and where she stands */
const TS_FEST={1:["Yến tiệc đầu xuân","sac","Sắc và điệu múa"],7:["Thi tài ngày Thất tịch","tai","Tiếng đàn, lời thơ"]};
function tsFestScore(p,k){return k==="sac"?effSac(p)+artOE(p,"vu"):p.tai+(artOE(p,"cam")+artOE(p,"thi"))/2}
function tsFestPre(){const m=S.month%12+1;const F=TS_FEST[m];if(!F)return;const s=tsS();const [n,k,lbl]=F;const me=tsFestScore(S,k);const top=s.festTop&&s.festTop[k];
 Q.push({t:`Sắp tới: ${n}`,h:`<p>Đầu tháng sau có ${n}. Hoàng thượng chấm ${lbl.toLowerCase()}; người đứng đầu được ban thưởng.</p><div class="kpsec"><h4 class="kpst">Phần của ngươi lúc này</h4>${tsRows([
  [k==="sac"?"Sắc":"Tài",`${k==="sac"?effSac(S):S.tai}`,"t"],[k==="sac"?"Vũ (theo bậc)":"Cầm + Thi (theo bậc, chia đôi)",`${k==="sac"?artOE(S,"vu"):Math.round((artOE(S,"cam")+artOE(S,"thi"))/2)}`,"t"],["Tổng",`${me} (thêm vận may hôm ấy 0–30)`,"t"],
  top?["Năm trước",`phần gốc cao nhất là ${top.sc} (${top.nm}), chưa kể vận may`,"n"]:["Năm trước","chưa có ghi chép","n"]])}</div>`,btn:"Đã hiểu",tsk:"fest"})}
(function(){const f0=festival;festival=function(title,k){const C=consorts();const r=f0.apply(this,arguments);try{if(S&&(k==="sac"||k==="tai")){const best=C.map(p=>[p,tsFestScore(p,k)]).sort((a,b)=>b[1]-a[1])[0];if(best){tsS().festTop=tsS().festTop||{};tsS().festTop[k]={sc:Math.round(best[1]),nm:best[0]===S?"ngươi":best[0].name}}}}catch(e){}return r}})();

/* =============== Ý 4 · LỄ TẤN PHONG: khách đến chúc, nàng phát lì xì (ân thưởng); phi tần khác tấn phong thì mời ngươi =============== */
function tsGuests(host){return consorts().filter(p=>p!==host&&p.alive!==false&&!p.out&&!p.confined&&(p!==S||!S.out))}
function tsWish(p,host){const a=aff(p,host),g=p===S?0:(host===S?(p.ghen||0):Math.max(0,((host.sung||0)-(p.sung||0))/2));
 if(a>=25)return["thân","chúc tỷ muội phúc lộc dồi dào, mãi được thánh ân"];if(g>=50||a<=-25)return["gượng","nói đôi câu chúc lấy lệ, ánh mắt không vui"];return["lễ","chúc theo lễ, lời lẽ chừng mực"]}
function tsLeHost(p,to){const me=p===S;if(me){const G=tsGuests(S).filter(x=>x!==S);if(!G.length)return;
  /* review ts-a FAIL 3: the guests come into her palace — she sees each face (k61Meet), so a named guest is never a grey "Người lạ" */
  G.forEach(v=>{try{if(typeof k61Meet==="function")k61Meet(v,"Nhân lễ tấn phong, ngươi được thấy người.")}catch(e){}});
  const W=G.map(v=>[v,tsWish(v,S)]);const warm=W.filter(x=>x[1][0]==="thân"),cold=W.filter(x=>x[1][0]==="gượng"),pol=W.filter(x=>x[1][0]==="lễ");
  const lines=warm.slice(0,2).map(([v,w])=>({who:v,text:`${kitName(v)} ${w[1]}.`})).concat(cold.slice(0,2).map(([v,w])=>({who:v,text:`${kitName(v)} ${w[1]}.`})));
  if(pol.length)lines.push(`${pol.length} vị khác chúc theo lễ, lời lẽ chừng mực.`);if(warm.length+cold.length>4)lines.push(`Còn ${warm.length+cold.length-4} vị nữa, xem trong Sổ ghi.`);
  const gl=tsLeGifts(G,S);
  const s=tsS();s.leN=(s.leN||0)+1;tsLeMeCard(to,G,lines,gl);return}
 /* an NPC host: the same rite, she is a guest */
 if(!tsOn()||S.out||S.confined)return;const s=tsS();if(s.leWk===wk())return;s.leWk=wk();const [k]=tsWish(S,p);
 /* the invitation names the host: she is known from now on (name + face) */
 try{if(typeof k61Meet==="function")k61Meet(p,"Nhân lễ tấn phong, ngươi được thấy người.")}catch(e){}tsLeNpcCard(p,to,k,(p.bac||0)>=40)}
/* save-unseen-lists r4: the two rite cards are BUILT by registered generators (guests / lines / gifts / host as data, people as ids); every effect
   (k61Meet, the gifts into her chest, s.leN / s.leWk) happens before, once — a remake on load builds only */
const tsLeMeCard=rcpReg("tsLeMe",(to,G,lines,gl)=>{const n=G.length,hi=8*n,lo=4*n;
  return tsPanel({t:`Lễ tấn phong · ${RANKS[to].n}`,who:pMe(),h:`<p>Thánh chỉ vừa tuyên, ${n} vị phi tần sang cung ngươi dự lễ chúc mừng.</p>${tsFacts(lines)}${gl.length?tsRows([["Quà mừng",gl.join(" · "),"g"]]):""}<p class="past">Theo lệ, chủ lễ phát lì xì cho khách. Phát hậu thì lòng người êm; không phát dễ mang tiếng keo kiệt.</p>`,
   opts:[tsOpt({n:"Phát lì xì hậu",fx:{bac:-hi},need:[tsNeedBac(hi)],duoc:[`${n} vị khách bớt ghen 6`,`khách: ${pvQuy(null,4,"thiện cảm")}`,`Danh ${balSg(BAL.eff.jts.danhGo)}`],go:()=>{G.forEach(v=>{v.ghen=cl((v.ghen||0)-6,0,100);tsAff(v,4)});apply({danh:BAL.eff.jts.danhGo});log(`Lễ tấn phong: ngươi phát lì xì hậu cho ${n} vị khách.`)}}),
    tsOpt({n:"Phát lì xì vừa phải",fx:{bac:-lo},need:[tsNeedBac(lo)],duoc:[`${n} vị khách bớt ghen 3`,`khách: ${pvQuy(null,BAL.eff.jts.liXiAff,"thiện cảm")}`],go:()=>{G.forEach(v=>{v.ghen=cl((v.ghen||0)-3,0,100);tsAff(v,BAL.eff.jts.liXiAff)});log(`Lễ tấn phong: ngươi phát lì xì cho ${n} vị khách.`)}}),
    tsOpt({n:"Không phát",mat:[`Danh ${balSg(BAL.eff.jts.danhGo_2)}`,"người đang ghen: ghen +3 (chê keo kiệt)"],go:()=>{apply({danh:BAL.eff.jts.danhGo_2});G.forEach(v=>{if((v.ghen||0)>=40)ghenUp(v,3,"chê ngươi keo kiệt ngày tấn phong",S)});log("Lễ tấn phong: ngươi không phát lì xì; có người xì xào chê keo kiệt.")}})]})});
const tsLeNpcCard=rcpReg("tsLeNpc",(p,to,k,rich)=>{if(!p||p.alive===false)return null;
 return tsPanel({t:`Lễ tấn phong ${p.name}`,who:pv(p),h:`<p>${p.name} vừa được tấn phong ${RANKS[cl(to,0,7)].n}. Cung nàng mở tiệc, mời lục cung sang chúc.</p>${tsRows([[kitRel("them",KIT_REL.affThem),knows(p)?`${tsQuy(aff(p,S))} · ${aff(p,S)}`:KIT_REL.unknown,aff(p,S)>netTh(p,"quen")?"g":aff(p,S)<netTh(p,"ky")?"r":"n"],["Lì xì",rich?"nhà nàng có của, hẳn phát cho khách":"nàng không dư dả, chưa chắc có lì xì","n"]])}`,
  opts:[tsOpt({n:"Đến chúc mừng",fx:{suc:-5},need:[tsNeedSuc(5)],duoc:[pvQuy(p,5,"thiện cảm"),rich?`lì xì Bạc ${balSg(BAL.eff.jts.bacGo)}`:"nàng nhớ ngươi đến"],kem:k==="gượng"?["ngươi đang ghen với nàng, khó giấu nét mặt"]:[],go:()=>{tsAff(p,5);if(rich){apply({bac:BAL.eff.jts.bacGo});p.bac=(p.bac||0)-6}log(`Ngươi sang dự lễ tấn phong của ${p.name}.`)}}),
   tsOpt({n:"Gửi lễ mừng",fx:{bac:-15},need:[tsNeedBac(15)],duoc:[pvQuy(p,6,"thiện cảm")],go:()=>{tsAff(p,6);
p.bac=(p.bac||0)+15;log(`Ngươi gửi lễ mừng ${p.name}.`)}}),
   ...(S.inv.some(e=>e&&!e.h&&!tsGiftNo(e))?[tsOpt({n:"Gửi quà mừng",need:[{t:"một món trong rương",ok:true}],duoc:["thiện cảm theo món quà, nàng ưa thì thêm"],ton:["món quà −1"],go:()=>{pushDil(mkP("giftpick",{v:p.id}),"Quà mừng")}})]:[]),
   tsOpt({n:"Không đến",duoc:[`Sức +${BAL.cv.rest}`],kem:[`thiện cảm -${BAL.cv.skipAff}`,`${pvOan(p,BAL.eff.jts.go,"oán ta")}`],go:()=>{apply({suc:BAL.cv.rest});tsAff(p,-BAL.cv.skipAff);oanAdd(p,S,BAL.eff.jts.go);log(`Ngươi không sang dự lễ tấn phong của ${p.name}.`)}})]})});
/* other NPC guests at an NPC rite follow the same rule silently: lì xì from a rich host lowers their envy a little */
/* LAW 1 + 6c (review/law1-gifts): a rite gift is a REAL piece from the guest's own chest (was: a piece made from nothing), given through giveTo — the ONE
   gift rule (her choice card PEND.giftin when she is the host; the NPC host's own answer rcvGiftIn; tastes both ways, jmind / jdis). The same for an
   NPC host (her guests are the other consorts) and, as a guest, she may send a piece too ("Gửi quà mừng", the gift picker PEND.giftpick). */
function tsLeGifts(G,host){const gl=[];for(const v of G.filter(v=>v!==host&&aff(v,host)>=netTh(v,"than")&&v.inv&&v.inv.length)){if(gl.length>=2)break;
  const i=typeof giftPickIx==="function"?giftPickIx(v,host,e=>!!IT[e.k]&&!e.t&&!tsGiftNo(e)):-1;if(i<0)continue;const nm=giftName(v.inv[i]);const r=giveTo(v,host,i);if(r)gl.push(`${v.name}: ${nm}`)}return gl}
function tsLeNpc(p){const G=tsGuests(p).filter(x=>x!==S);try{tsLeGifts(G,p)}catch(e){console.error("tsLe gifts",e)}if((p.bac||0)<4*G.length)return;p.bac-=4*G.length;for(const v of G){if(v.rl)affAdd(v,p,BAL.eff.jts.liXiAff)}}/* stat-pace: the one rise rule (affAdd); the same lì xì gain as hers (law 1) */
(function(){const p0=promoteP;promoteP=function(p){const r0=rkOf(p),al=p===S||p.alive;const r=p0.apply(this,arguments);try{if(al&&rkOf(p)>r0&&!quiet&&!(typeof NLP!=="undefined"&&NLP)){if(p===S){if(tsOn()&&!S.out)tsLeHost(S,S.rank)}else{tsLeNpc(p);tsLeHost(p,rkOf(p))}}}catch(e){console.error("tsLe",e)}return r}})();

/* =============== Ý 12 · ÂN THƯỞNG SAU SINH: thưởng theo nguyên nhân thật (con trai / gái, Sủng của mẹ, Thái hậu), không còn hên xui =============== */
let tsBirthOn=0;
(function(){const b0=bestow;bestow=function(p,why){if(tsBirthOn&&(why==="son"||why==="dau"))return;return b0.apply(this,arguments)}})();
(function(){const b0=birthP;birthP=function(p,fake){const n0=(p.kids||[]).length;tsBirthOn++;let r;try{r=b0.apply(this,arguments)}finally{tsBirthOn--}
 try{const born=(p.kids||[]).slice(n0);if(born.length&&(p===S?!S.dead:p.alive))r=(r||"")+tsBirthReward(p,born)}catch(e){console.error("tsBirth",e)}return r}})();
function tsBirthReward(p,born){const me=p===S;const son=born.some(k=>k.sex==="m");const first=(p.kids||[]).length===born.length;const L=[];
 /* Hoàng thượng: always for a prince; for a princess when she is in favour (Sủng ≥ 30) or it is her first child */
 const emp=son||(p.sung||0)>=BAL.tsx.empSung||first;if(emp){const q0=Q.length,n0=(p.inv||[]).length;bestow(p,son?"son":"dau");for(let i=Q.length-1;i>=q0;i--)if(Q[i]&&Q[i].t==="Thánh thượng ban thưởng")Q.splice(i,1);
  const it=(p.inv||[]).length>n0?IT[p.inv[p.inv.length-1].k]:null;L.push(["Hoàng thượng",`${son?"mừng hoàng tử":"mừng công chúa"}: ${it?it.n:"một món ngự ban"}, Bạc +${son?30:15}`,"g"])}
 /* Thái hậu: when she favours the mother (Thái hậu ≥ 20) */
 const thOk=!S.thDead&&((me?S.th:p.th)||0)>=20;if(thOk){const k=pick(["nhansam","yensao","demgam"]);invAdd(p,{k,from:"th"});ap(p,{bac:BAL.eff.jts.bacTsBirthReward});L.push(["Thái hậu",`${itm(k).n}, Bạc ${balSg(BAL.eff.jts.bacTsBirthReward)}`,"g"])}
 if(first){ap(p,{danh:BAL.eff.jts.danhTsBirthReward});L.push(["Lần đầu làm mẹ",`Danh ${balSg(BAL.eff.jts.danhTsBirthReward)}`,"g"])}
 if(!me){if(L.length)return `${p.name} được ân thưởng sau sinh. `;return""}
 if(!emp&&!thOk)L.push(["Ghi chú",`Hoàng thượng chưa ban gì: Sủng của ngươi dưới ${BAL.tsx.empSung} và đây không phải con đầu`,"n"]);
 Q.push({t:"Ân thưởng sau sinh",art:"img/ev-sinh-no.webp",h:`<p>Tin ngươi mẹ tròn con vuông truyền khắp lục cung.</p>${tsRows(L)}`,btn:"Tạ ơn",tsk:"birth"});return""}

/* =============== Ý 3 · HOÀNG THƯỢNG TRIỆU RIÊNG: đàn theo nhịp, chơi cờ, du hồ (một luật cho mọi phi tần) =============== */
function tsMoodW(){const m=S.emp.mood||0;return [1.25,1,.55,.25][cl(m,0,3)]}
function tsRebel(){try{const T=typeof trS==="function"?trS():null;return T&&T.bien<50?T.bien:0}catch(e){return 0}}
function tsSummonW(p){return Math.pow(Math.max(1,(p.sung||0)),1.4)*(1+((p===S?S.an:p.an)||0)/80)}
/* what he asks for: by her gifts and the season (du hồ only in the warm months) */
function tsSummonKind(p){const a=p.arts||{};const warm=S.month>=4&&S.month<=9;const L=[["dan",1+(a.cam||0)*2],["co",1+(a.ky||0)*2]];if(warm)L.push(["duho",2.5]);let t=L.reduce((s,x)=>s+x[1],0)*Math.random();for(const x of L){t-=x[1];if(t<=0)return x[0]}return L[0][0]}
function tsSummonOdds(p,k){const a=p.arts||{};return k==="dan"?40+(a.cam||0)*9+(p.tai||0)/6:k==="co"?40+(a.ky||0)*9+(p.tamco||0)/5:45+effSac(p)/5+(p.tai||0)/8}
function tsSummonGain(raw){const C=BAL.cut,i=raw>=C.summon[2]?3:raw>=C.summon[1]?2:raw>=C.summon[0]?1:0;const g=C.summonGain[i];return{sung:g.sung,an:g.an}}
function tsSummonWeek(){if(!S||S.dead||S.out||(typeof isSrv==="function"&&isSrv()))return;if(window.agDOn&&agDOn())return;/* AG-ALL: his day plan decides (jagacts emp:summon) */
 const C=consorts().filter(p=>p.alive!==false&&!p.out&&!p.confined&&!(p.preg>=8));if(!C.length)return;const o=npcWhy("empSummon",{C});if(o&&o.tgt)tsSummonGo(o.tgt)}
/* his summons of one person (the weekly roll above, or his day plan's choice: jagacts emp:summon) */
function tsSummonGo(p){const k=tsSummonKind(p);
 /* RECEIVER CHOICE (jrcv, OD 18/11 ~21:15Z law 1): the summoned NPC answers with HER two answers (tsSummonMe): Vâng chỉ (Sức − BAL.rcv.sumSuc · her game) or Cáo bệnh (Sủng sungGo_2) */
 if(p!==S&&typeof rcvPick==="function"&&!p.coop){const c=rcvPick(p,"emp",[{i:[0,1],id:"go",lk:()=>(p.suc||0)<BAL.rcv.sumSuc},{i:[2,3],id:"ill"}],"emp");
  if(c&&c.id==="ill"){/* her «Cáo bệnh» numbers: Sủng sungGo_2 + Sức BAL.cv.decl.suc (choice-value-audit, one key) */ap(p,{sung:BAL.eff.jts.sungGo_2,suc:(BAL.cv&&BAL.cv.decl||{suc:0}).suc});if(knows(p)||eyes(S)>=2)log(`${p.name} cáo bệnh, không sang hầu Hoàng thượng.`);return}if(c)ap(p,{suc:-BAL.rcv.sumSuc})}
 if(p!==S){const raw=typeof kg82NpcRaw==="function"?(typeof mg2On==="function"&&mg2On()?kg82NpcRaw(p,k,{occ:"trieu"}):kg82NpcRaw(p,k==="duho"?"dan":k)):5;/* mg2: her own game kind on the summons board (occ trieu, as tsGame) */const g=tsSummonGain(raw);ap(p,{sung:g.sung});p.an=cl((p.an||0)+g.an,0,100);
  if(k==="duho"&&tsRebel()&&roll(40)){if(roll(tsSummonOdds(p,k)))ap(p,{sung:4,danh:3})}if(knows(p)||eyes(S)>=2)log(`${p.name} được Hoàng thượng triệu ${k==="dan"?"đánh đàn":k==="co"?"đánh cờ":"du hồ"}.`);return}
 tsSummonMe(k)}
function tsSummonMe(k){const E=S.emp;/* a private summons: she is face to face with him (never a grey "Người lạ" emperor) */try{if(typeof k61Meet==="function"&&E&&!tsNamed(E))k61Meet(E,"Ngài triệu riêng, ngươi được diện kiến.")}catch(e){}const odds=tsSummonOdds(S,k);const nm={dan:"đánh đàn",co:"đánh cờ",duho:"du hồ"}[k];const reb=k==="duho"?tsRebel():0;
 const likes=k==="dan"&&E.known&&E.known.music?` Ngài thích khúc ${E.likes.music}.`:"";
 const kem=reb?[`biên cương bất ổn (${reb}), cấm quân đang lùng loạn đảng quanh kinh thành`]:[];
 const go=()=>{const b=tsPre();tsGame({kind:k,art:k==="dan"?"Cầm":k==="co"?"Kỳ":"Du hồ",title:k==="dan"?"Đàn cho Hoàng thượng nghe":k==="co"?"Đánh cờ cùng Hoàng thượng":"Du hồ cùng Hoàng thượng",odds,risk:reb&&roll(40)?1:0,
  intro:[["Hoàng thượng",k==="dan"?"nghe đàn trong thư phòng":k==="co"?"bày cờ trong thư phòng":"ngồi thuyền giữa hồ sen","n"]].concat(reb?[["Điềm báo","cấm quân canh hai bờ, có tin loạn đảng trà trộn","r"]]:[]),
  onDone:res=>{const g=tsSummonGain(res.raw);const L=[];apply({sung:g.sung});S.an=cl((S.an||0)+g.an,0,100);
   L.push(res.raw>=5?`Hoàng thượng vui lòng (${nm}).`:`Hoàng thượng lơ đãng, ngồi được một lúc thì về (${nm}).`);
   if(res.guard!=null){if(res.guard){apply({sung:BAL.eff.jts.sungOnDone,danh:BAL.eff.jts.danhOnDone});S.an=cl((S.an||0)+BAL.eff.jts.anOnDone,0,100);L.push(`Lau sậy động, ngươi kêu hộ giá kịp lúc; cấm quân bắt được kẻ lạ. Ngài nhớ ơn ngươi (${sgStat(BAL.eff.jts.sungOnDone)}, Danh ${balSg(BAL.eff.jts.danhOnDone)}, Ân tình ${balSg(BAL.eff.jts.anOnDone)}).`)}else{apply({suc:-8});L.push("Lau sậy động, cấm quân xông tới trước; kẻ lạ bị bắt. Ngươi kinh hãi.")}}
   log(L.join(" "));tsRes(`Hoàng thượng triệu ${nm}`,b,res.raw>=5||res.guard===1);render()}})};
 const g7=tsSummonGain(8),g3=tsSummonGain(3);
 return tsPanel({t:`Hoàng thượng triệu ${nm}`,who:pEmp(),art:k==="duho"?"img/ev-le-ha.webp":k==="co"?"img/ev-hoang-de-vui-2.webp":"img/ev-tai-nghe.webp",
  h:`<p>Thái giám Càn Thanh cung đến truyền: “Hoàng thượng rảnh việc triều chính, cho mời ${tsGoi()} sang ${nm}.”${likes}</p>`,
  opts:[tsOpt({n:`Vâng chỉ, sang ${nm}`,fx:{suc:-BAL.rcv.sumSuc},need:[tsNeedSuc(BAL.rcv.sumSuc)],odds,duoc:[sgRange(g3.sung,g7.sung),`Ân tình +${g3.an} đến +${g7.an}`]/* r2 sg-card: both ends as applied (onDone apply → sg); «..» is code wording → «đến» (VANPHONG) */,mat:[`ngài lơ đãng: chỉ ${sgStat(tsSummonGain(0).sung)}`],kem:kem,note:"thành bại theo trò nhỏ hoặc theo cơ may khi bỏ qua",later:1,go}),
   reb?tsOpt({n:"Xin ngài đổi sang ngắm hoa trong vườn",fx:{suc:-3},duoc:[`Sủng ${balSg(BAL.eff.jts.sungGo)}`],note:"tránh hồ khi có tin loạn đảng",go:()=>{apply({sung:BAL.eff.jts.sungGo});log("Ngươi khéo xin Hoàng thượng đổi sang ngắm hoa trong ngự hoa viên.")}}):null,
   tsOpt({n:"Cáo bệnh",fx:{sung:BAL.eff.jts.sungGo_2}/* a sure loss = Tốn (applied with the option) */,duoc:[`Sức +${BAL.cv.decl.suc}`],go:()=>{apply({suc:BAL.cv.decl.suc});log(`Ngươi cáo bệnh, không sang ${nm}, ở lại nghỉ cho lại sức.`)}})].filter(Boolean)})}
/* save-unseen-lists r4: «Hoàng thượng triệu» (a weekly summons, made at the step) is a registered generator (k = dan / co / duho); its only effect
   before the card (k61Meet with the Emperor) runs once — on a remake he is already named */
tsSummonMe=rcpReg("tsSummon",tsSummonMe);

/* =============== Ý 14 · THẢ ĐÈN HOA ĐĂNG (Nguyên tiêu, Thất tịch, Trung thu): điều cầu gắn với nguyên nhân thật =============== */
const TS_DEN=["nguyentieu","thattich","trungthu"];
function tsDenFest(){try{const f=festToday();return f&&TS_DEN.includes(f.k)?f:null}catch(e){return null}}
function tsDenCard(){const f=tsDenFest();if(!f||!tsOn()||S.out)return null;const s=tsS();const key=`${S.year}-${f.k}`;
 return{n:"Thả đèn hoa đăng",t:`Đêm ${f.name}, cung nhân thả đèn trên hồ Thái Dịch. Viết điều cầu vào đèn rồi thả trôi.`,c:{bac:-10},o:100,w:{},k:2,b:tsLast(),fix:1,dom:"Giao thiệp",done:s.den===key?1:0,x:"chọn điều cầu ở bước sau",go:()=>{s.den=key;tsDenWish(f)}}}
(function(){const d0=deal;deal=function(){const r=d0.apply(this,arguments);try{if(Array.isArray(deck)&&tsOn()){const c=tsDenCard();if(c)deck.unshift(c)}}catch(e){}return r}})();
function tsDenSeen(){const E=S.emp;return (E.mood||0)<=1&&(S.sung||0)>=BAL.tsx.denSung}
/* ONE rule for every lantern (hers and the NPCs', mg2): the odds of being seen / heard without a far lantern, and "far" from the play (raw ≥ 6) */
function tsDenOdds(p){return agOdd(45+(p.tai||0)/4+artOE(p,"hoa"))}/* one cap BAL.odds (review ag-all-2 r2 C4) */
function tsDenFar(raw){return raw>=6}
function tsDenWish(f){const s=tsS();const pdLeft=Math.max(0,6-(s.denPD||0));const hos=liveRivals(true).filter(v=>bandVT(v,S)>=1&&!(S.dKnown&&S.dKnown[v.id])&&!knows(v));
 const odds=tsDenOdds(S);const seen=tsDenSeen();
 const play=(kind,after)=>{const b=tsPre();tsGame({kind:"den",art:"Hoa đăng",title:`Thả đèn đêm ${f.name}`,odds,intro:[["Điều cầu",kind,"t"],["Ghi chú","đèn trôi xa và sáng thì người bên hồ trông thấy","n"]],onDone:res=>{const far=tsDenFar(res.raw);after(far);tsRes("Thả đèn hoa đăng",b,true);render()}})};
 tsPanel({t:`Đêm ${f.name}: thả đèn`,art:f.k==="nguyentieu"?"img/ev-le-xuan-2.webp":"img/ev-le-thu-2.webp",who:pMaid(),h:`<p>${S.maid.name} đã dán sẵn chiếc đèn hoa sen. Ngươi cầm bút, nghĩ xem nên cầu điều gì.</p>`,opts:[
  tsOpt({n:"Cầu tin tức người nhà",odds:hos.length?oddsCl(odds):null,duoc:hos.length?["người hầu ngoài bờ nghe được chuyện: biết lòng một người đang muốn hại ngươi"]:["người nhà cũng thả đèn, nhờ người gửi thư vào: Thư nhà"],note:"đèn trôi xa thì nghe rõ hơn",later:1,
   go:()=>play("tin tức",far=>{if(hos.length&&(far||roll(odds))){const v=hos.sort((a,b)=>danger(b,S)-danger(a,S))[0];kn();S.dKnown=S.dKnown||{};S.dKnown[v.id]=wk();noteAdd(v.id,`nghe được bên hồ đêm ${f.name}: nàng có ý hại ngươi (mức ${BANDS[bandVT(v,S)][1]})`);log(`Đêm ${f.name}, người hầu nghe được bên hồ: ${v.name} có ý hại ngươi (mức ${BANDS[bandVT(v,S)][1]}).`)}
    else if(!hos.length&&s.thuY!==S.year){s.thuY=S.year;invAdd(S,{k:"thunha",from:"home"});log("Người nhà gửi thư vào cung nhân đêm hoa đăng. Được Thư nhà.")}else log("Đèn trôi chưa xa, chưa nghe được tin gì.")})}),
  tsOpt({n:"Cầu bình an",duoc:pdLeft?[`Phúc duyên +2 (kiếp này còn được ${pdLeft})`,`Đức ${balSg(BAL.eff.jts.ducGo)}`]:[`Đức ${balSg(BAL.eff.jts.ducGo)}`],note:"Phúc duyên từ đèn có giới hạn: 6 mỗi kiếp",later:1,go:()=>play("bình an",far=>{apply({duc:BAL.eff.jts.ducGo});if(pdLeft&&typeof pdAdd==="function"){s.denPD=(s.denPD||0)+2;pdAdd(2,`thả đèn cầu bình an đêm ${f.name}`)}else log("Ngươi thả đèn cầu bình an.")})}),
  tsOpt({n:"Cầu thánh ân",odds:seen?oddsCl(odds):null,duoc:seen?[`Hoàng thượng dạo bên hồ, trông thấy đèn: ${sgStat(BAL.eff.jts.denSung)}, Ân tình +${BAL.eff.jts.denAn}`]:[`Đức ${balSg(BAL.eff.jts.ducDenMiss)}`],kem:seen?[]:[`đêm nay Hoàng thượng không ra hồ (ngài đang phiền, hoặc Sủng của ngươi dưới ${BAL.tsx.denSung})`],later:1,
   go:()=>play("thánh ân",far=>{if(seen&&(far||roll(odds))){apply({sung:BAL.eff.jts.denSung});S.an=cl((S.an||0)+BAL.eff.jts.denAn,0,100);log(`Đêm ${f.name}, Hoàng thượng dạo bên hồ, trông thấy đèn của ngươi trôi xa, dừng lại hỏi han.`)}else{apply({duc:BAL.eff.jts.ducDenMiss});log("Ngươi thả đèn, lặng lẽ cầu thánh ân.")}})}),
  {n:"Thôi",fx:{}}/* the kit ✕ (KIT 32.10; owner 26/11 ~22:43Z: no close-only card) */]})}
/* NPCs float lanterns too, by the same rule (seen by the Emperor when he walks there and they are in favour) */
function tsDenNpc(){const f=tsDenFest();if(!f)return;const s=tsS();const key=`${S.year}-${f.k}`;if(s.denN===key)return;s.denN=key;const E=S.emp;
 const mg=typeof mg2On==="function"&&mg2On();/* mg2: her lantern game for each NPC = one draw (occ trieu, as tsGame) + the same odds as hers (tsDenOdds), and the same Ân tình */
 for(const o of npcWhyAll("tsDen")){const v=o.who;const ok=(E.mood||0)<=1&&(v.sung||0)>=20&&(mg?tsDenFar(kg82NpcRaw(v,"den",{occ:"trieu"}))||roll(tsDenOdds(v)):roll(30));
  if(!mg||!ok)spAdd(v,"duc",1);/* mg2: as her «Cầu thánh ân»: seen = Sủng +3, Ân tình +2; not seen = Đức +1 */if(ok){spAdd(v,"sung",3);if(mg)v.an=cl((v.an||0)+2,0,100);if(knows(v))log(`Đêm ${f.name}, Hoàng thượng dừng chân ngắm đèn của ${v.name}.`)}}}

/* =============== Ý 2 · HỘI PHỐI ĐỒ THEO ĐỀ (tháng tư và tháng mười, báo đề trước một tháng) =============== */
/* D17 (owner 15/11 23:05Z/23:15Z): each đề has a luxury RANGE r (4 pieces, absolute; capped by her own allowance: jlux luxThemeRange) and its
   tags cover every wearable by colour / material / name (jlux luxThemeTags; the hand-picked ones stay). Score = theme hits + the outfit's
   Xa xỉ inside the range (below = quá giản dị, above = phô trương: Đức −1, above her allowance = vượt phẩm: Danh −3) — chasing the
   highest number no longer wins. An empty Cài tóc / Áo slot = what she wears now. */
const TS_THEME={thanh:{n:"Thanh nhã",d:"ngọc bích, lụa mềm, hương thanh",r:[40,100],tags:["tramngoc","vongngoc","luahang","huongtram","tuithom"]},
 phu:{n:"Phú quý",d:"vàng, gấm, trâm diêu",r:[130,230],tags:["boodieu","vongvang","gamto","gamvang","tramphuong","lxson3","lxmay3"]},
 huong:{n:"Hương sắc",d:"son phấn, túi thơm, lụa",r:[60,130],tags:["lxson1","lxma1","tuithom","luahang","huongtram","tramngoc"]},
 xuan:{n:"Xuân sắc",d:"hoa đào, hoa mai, lụa hồng",r:[50,120],tags:["luahang","tuithom","lxma0","lxma2"]},
 co:{n:"Cổ phong",d:"trâm gỗ, đồng, hoa văn mây hạc",r:[70,150],tags:["vongngoc","huongtram"]}};
try{if(typeof luxThemeTags==="function")luxThemeTags(TS_THEME)}catch(e){}
/* items added by modules loaded after jts (e.g. jkc's khuê các pieces) or at run time get their tags too: re-tag whenever the item list grew */
let tsTagN=0;function tsTagsFresh(){try{if(typeof luxThemeTags!=="function")return;const n=Object.keys(IT).length+(typeof WD_ITEMS==="object"?Object.keys(WD_ITEMS).length:0);if(n!==tsTagN){tsTagN=n;luxThemeTags(TS_THEME)}}catch(e){}}
if(typeof kidThemes==="function"){const kt0=kidThemes;kidThemes=function(){tsTagsFresh();return kt0.apply(this,arguments)};window.kidThemes=kidThemes}
const TS_SLOT=[["hair","Cài tóc",k=>IT[k]&&(itm(k).sl==="hair"||itm(k).wsl==="tram")],["wrist","Đeo tay",k=>IT[k]&&itm(k).sl==="wrist"],["ao","Áo",k=>IT[k]&&(itm(k).dr||itm(k).wsl==="y")&&k!=="y_tang"],["kem","Hương, phấn",k=>["tuithom","huongtram"].includes(k)||(typeof lxOf==="function"&&!!lxOf(k))]];
function tsDressHost(){return queenP()&&queenP()!==S?queenP():null}
function tsLuxK(k){return typeof luxPiece==="function"?luxPiece(k):Math.round((IT[k]&&itm(k).pr||0)/5)}
/* an empty Cài tóc / Áo slot = what she wears now (j92 wardrobe) */
function tsDressFill(p,pickd){const P=Object.assign({},pickd);try{const w=wdOf(p);if(!P.hair&&w.tram&&IT[w.tram.k])P.hair=w.tram.k;if(!P.ao&&w.y&&IT[w.y.k]&&w.y.k!=="y_tang")P.ao=w.y.k}catch(e){}return P}
/* makeup-lux (OD L1634/L1643): mk = the entrant's face of the day (a toilette record) — its look's xa xỉ and her pets' join the outfit total, judged the same way */
function tsDressPts(p,pickd,th,mk){const T=TS_THEME[th]||TS_THEME.thanh,B=BAL.lux||{};const P=tsDressFill(p,pickd);let s=0,L=0;const vp=[];
 for(const [sl] of TS_SLOT){const k=P[sl];if(!k||!IT[k])continue;const it=itm(k);s+=T.tags.includes(k)?2:0;L+=tsLuxK(k);if(it.rk&&it.rk>rkOf(p)){s-=3;vp.push(it.n)}}
 let ml=0,pl=0;try{if(mk&&mk.makeup)ml=toilLv(toilMk(mk)).lux}catch(e){}try{pl=typeof petLuxOf==="function"?petLuxOf(p):0}catch(e){}L+=ml+pl;/* + pet (OD L1643: the event total = clothes + jewels + makeup + pet) */
 const R=typeof luxThemeRange==="function"?luxThemeRange(p,T):{lo:T.r?T.r[0]:40,hi:T.r?T.r[1]:120,bud:999};let st="hop";
 if(L>R.bud){st="vuot";s+=B.ctOver!=null?B.ctOver:-2;vp.push(`bộ đồ Xa xỉ ${L}`)}
 else if(L>R.hi){st="photruong";s+=B.ctShow!=null?B.ctShow:1}
 else if(L<R.lo){st="giandi";s+=Math.max(B.ctPlainMin!=null?B.ctPlainMin:-1,(B.ctFit)-(B.ctPlainK)*(R.lo-L)/Math.max(1,R.lo))}
 else s+=B.ctFit;
 return{raw:cl(Math.round(10*s/11),0,10),vp,lux:L,mkLux:ml,petLux:pl,st,lo:R.lo,hi:R.hi}}
function tsDressTotal(p,raw){return raw*4+Math.round(effSac(p)/5)+Math.round((p.tamco||0)/12)}
/* the best set from the pieces at hand (smart pick: NPC by Tâm cơ, a loyal maid) — small search, top pieces per slot by theme */
function tsDressBest(p,keys,th){const T=TS_THEME[th]||TS_THEME.thanh;const C=TS_SLOT.map(([sl,,fit])=>[sl,[...new Set(keys.filter(fit))].sort((a,b)=>(T.tags.includes(b)?1:0)-(T.tags.includes(a)?1:0)).slice(0,5)]);
 let best={},bv=-1;const go=(i,P)=>{if(i===C.length){const v=tsDressPts(p,P,th).raw;if(v>bv){bv=v;best=Object.assign({},P)}return}const [sl,L]=C[i];go(i+1,P);for(const k of L){P[sl]=k;go(i+1,P);delete P[sl]}};go(0,{});return best}
function tsNpcDress(p,th){const P={};const inv=(p.inv||[]).map(e=>e.k);const smart=roll(BAL.odb.jts.rbSmart+(p.tamco||0)/2);if(smart)return tsDressBest(p,inv,th);
 for(const [sl,,fit] of TS_SLOT){const c=inv.filter(fit);if(c.length)P[sl]=pick(c)}return P}
function tsDressAnnounce(){tsTagsFresh();const s=tsS();const th=pick(Object.keys(TS_THEME));s.dress={th,m:S.month%12+1,y:S.month===12?S.year+1:S.year};const T=TS_THEME[th];const H=tsDressHost();
 /* the Hoàng hậu announces it at the morning greeting: she sees her face (no named grey figure) */try{if(H&&typeof k61Meet==="function")k61Meet(H,"Buổi thỉnh an, ngươi được thấy người.")}catch(e){}
 tsDressAnnCard(th,s.dress.m)}
/* save-unseen-lists r4: the announcement card is BUILT by a registered generator from the đề (th) and its month; the draw of the đề (s.dress) and
   the meeting happen before, once */
const tsDressAnnCard=rcpReg("tsDressAnn",(th,dm)=>{const T=TS_THEME[th];if(!T)return null;const H=tsDressHost();
 const have=TS_SLOT.filter(([sl,,fit])=>S.inv.some(e=>fit(e.k)&&T.tags.includes(e.k))).length;
 return tsPanel({t:"Hội phối đồ: báo đề",who:H?pv(H):pTH(),art:"img/ev-yen-tiec.webp",h:`<p>${H?`Hoàng hậu ${H.name}`:"Thái hậu"} truyền: trung tuần tháng sau mở hội phối đồ trong ngự hoa viên. Đề năm nay: <b>${T.n}</b> (${T.d}).</p>${tsRows([["Bốn chỗ","Cài tóc · Đeo tay · Áo · Hương, phấn","n"],["Ngươi có",`${have}/4 chỗ có đồ hợp đề`,have>=2?"g":"r"]])}${kitNumBox(tsRows([["Xa xỉ",`đề ${T.n} chuộng cả bộ khoảng ${T.r?T.r[0]:40} đến ${T.r?T.r[1]:120}: thấp quá là quá giản dị, cao quá là phô trương`,"n"],["Lưu ý","quá phẩm vị của mình thì bị trừ nặng, dù hợp đề","n"],tsMkRow(th,dm)]))}`,
  opts:tsBorrowOpts(th).concat(tsMkScoutOpts(th,dm),[tsOpt({n:"Đã hiểu, sẽ chuẩn bị",duoc:["mua thêm đồ ở Nội vụ phủ hay mượn của người thân trước hội"]})])})});
/* r4b (F1, law 6c + 14): the Hội phối đồ «Mượn» is a loan of THE ONE LOAN RULE (jdc dcBorrow / loan book / co-op dcout-dcin), its tuần = the
   contest's; before it had its own mark (e.tsB) and return, no book, and on the co-op guest it spliced her copy of the NPC (the host never knew).
   Only a piece its holder may lend (dcFree: not on loan, not a lost case's, not hidden); not from the other co-op player; not where a loan cannot
   reach the NPC (a thin room). */
function tsBorFit(e,T){return T.tags.includes(e.k)&&(typeof dcFree!=="function"||dcFree(e))&&!S.inv.some(x=>x.k===e.k)}
function tsBorDue(){const D=tsS().dress;if(!D||!D.m||typeof dcWk!=="function")return null;return dcWk()+Math.max(0,3*((D.y*12+D.m)-(S.year*12+S.month)))+(1-(S.tuan|0))}/* the contest tuần (jts: month 4 / 10, tuần index 1) */
function tsBorrowOpts(th){const T=TS_THEME[th];const s=tsS();if(s.borrow)return[];if(typeof dcBorrow!=="function"||(typeof dcLend==="function"&&!dcLend()))return[];const F=liveRivals(true).filter(v=>!v.coop&&aff(v,S)>=netTh(v,"than")&&v.inv&&v.inv.some(e=>tsBorFit(e,T)));
 return F.slice(0,2).map(v=>{const e=v.inv.find(e=>tsBorFit(e,T));return tsOpt({n:`Mượn ${itm(e.k).n} của ${v.name}`,need:[{t:`nàng thân với ngươi (${kitNeed(aff(v,S),netTh(v,"than"))})`,ok:aff(v,S)>=netTh(v,"than")}],duoc:[`mặc ${itm(e.k).n} dự hội: hợp đề, dễ được chấm cao hơn`],mat:[],kem:[`thiện cảm ${balSg(spSee("rel",BAL.cv.tsBorrow.cost))} (nợ ân tình)`,"làm mất hay hỏng thì phải đền"],note:"xong hội thì trả",
  go:()=>{/* E30r3 (law 6c): the dialog was built earlier; the piece may have left her chest meanwhile (lent at a festival, given, lost): nothing moves */if(v.inv.indexOf(e)<0||!dcFree(e)||!dcBorrow(S,v,e,{due:tsBorDue(),why:"ts",chest:1,aff:false})){log(`${itm(e.k).n} của ${v.name} đã không còn trong rương nàng.`);return}s.borrow=1;tsAff(v,BAL.cv.tsBorrow.cost);log(`Ngươi mượn ${itm(e.k).n} của ${v.name} để dự hội phối đồ.`)}})})}
/* the contest is over: what she borrowed for it goes home now through the one loan return (dcGiveBack: the lender's book, the co-op «dcin», the ledger when the lender is gone) */
function tsDressReturn(){const s=tsS();s.borrow=0;try{if(typeof dcMigTs==="function")dcMigTs()}catch(e){}if(typeof dcGiveBack!=="function")return;
 for(const e of S.inv.slice()){if(!e||!e.bor||e.bor.why!=="ts")continue;const o=dcGiveBack(S,e,"inv");log(o&&o!==S?`Ngươi trả ${itm(e.k).n} cho ${o.name}.`:`${itm(e.k).n} không còn chủ để trả, đã nộp về Nội vụ phủ.`)}}
function tsDressHold(){tsTagsFresh();const s=tsS();const D=s.dress;if(!D||D.m!==S.month||D.y!==S.year)return;s.dress=null;
 if(!tsOn()||S.out||S.confined||S.rank>=7){tsDressFinish(D.th,D.m,D.y,null);return}tsDressCard(D.th,D.m,D.y)}
/* save-unseen-lists r4 (LAW 11 / 6c, rv FIX 4): the contest card is BUILT by a registered generator from the đề (th, month, year) — before, a reload
   while it waited lost the contest for good, and with it the return of what she had borrowed for it (dcBorrow loans: tsDressReturn runs in
   finish). The rivals' outfits are drawn when the contest is judged (finish), not when the card is made, so a remake draws nothing. */
function tsDressFinish(th,dm,dy,mine){const T=TS_THEME[th];
 /* makeup-theme (OD:L1514): every entrant's face is scored against the đề's hidden makeup want (jmkt tsMkPts; rivals by their own scouting) */
 const W=tsMkWant(th,dm),cid=dy+"-"+dm;
 const C=liveRivals(true).filter(v=>!v.confined&&!v.out);const R=C.map(v=>{const P=tsNpcDress(v,th);const mr=tsMkNpc(v,W,cid);const d=tsDressPts(v,P,th,mr);const mk=tsMkPts(mr,W);return{p:v,raw:d.raw,vp:d.vp,lux:d.lux,st:d.st,mk,score:tsDressTotal(v,d.raw)+mk.add}});
 const all=R.concat(mine?[mine]:[]).sort((a,b)=>b.score-a.score);all.forEach((x,i)=>x.place=i+1);const b=tsPre();const L=[];
  for(const x of all){if(x.vp.length)ap(x.p,{danh:BAL.eff.jts.dressVp});if(x.st==="photruong")ap(x.p,{duc:(BAL.lux&&BAL.lux.ctDuc)||-1});if(x.place===1){ap(x.p,{sung:BAL.eff.jts.dressSung,danh:BAL.eff.jts.dressDanh});bestow(x.p,"contest")}else if(x.place<=3)ap(x.p,{danh:BAL.eff.jts.dressTop3})}
  if(mine){const x=mine;L.push(`Hội phối đồ (${T.n}): ngươi đứng thứ ${x.place}/${all.length}.`);if(x.lux!=null)L.push(`Bộ đồ Xa xỉ ${x.lux}${x.mkLux?` (son phấn ${x.mkLux})`:""}: ${x.st==="hop"?`hợp đề ${T.n}`:x.st==="giandi"?"quá giản dị so với đề":x.st==="photruong"?`phô trương, người ta chê xa xỉ. Đức ${(BAL.lux&&BAL.lux.ctDuc)||-1}`:"quá phẩm vị của ngươi"}.`);
   if(x.vp.length)L.push(`${tsDressHost()?"Hoàng hậu":"Thái hậu"} nhắc: ${x.vp.join(", ")} vượt phẩm vị. Danh ${balSg(BAL.eff.jts.dressVp)}.`);L.push(tsMkLine(x,W,th))}
  else L.push(`Hội phối đồ (${T.n}): ${all[0].p.name} đứng đầu.`);log(L.join(" "));tsDressReturn();
  const show=()=>{tsRes(`Hội phối đồ · ${T.n}`,b,mine?mine.place<=3:null);render()};
  if(mine&&typeof kitPodiumShow==="function"&&!tsBot()&&all.length>=2)kitPodiumShow(all.slice(0,Math.max(3,all.length)).map(x=>({who:x.p,score:x.score,place:x.place})),{title:`Hội phối đồ · ${T.n}`,sub:T.d,onNext:show});else show()}
const tsDressCard=rcpReg("tsDress",(th,dm,dy)=>{const T=TS_THEME[th];if(!T)return null;const W=tsMkWant(th,dm);const finish=mine=>tsDressFinish(th,dm,dy,mine);
 return tsPanel({t:`Hội phối đồ · ${T.n}`,art:S.month>=7?"img/ev-le-thu-3.webp":"img/ev-dieu-lanh.webp",who:tsDressHost()?pv(tsDressHost()):pTH(),h:`<p>Ngự hoa viên bày bình phong gấm. Lục cung lần lượt ra mắt theo đề <b>${T.n}</b> (${T.d}).</p>`,opts:[
  tsOpt({n:"Tự tay phối đồ",fx:{suc:-5},need:[tsNeedSuc(5)],duoc:[`đứng đầu: ${sgStat(BAL.eff.jts.dressSung)}, Danh +${BAL.eff.jts.dressDanh}, một món ban thưởng`,`vào ba người đầu: Danh ${balSg(BAL.eff.jts.dressTop3)}`],mat:[`đồ vượt phẩm vị: Danh ${balSg(BAL.eff.jts.dressVp)}`,`bộ đồ quá đề (phô trương): Đức ${(BAL.lux&&BAL.lux.ctDuc)||-1}`],note:`tự phối đồ hoặc để cung nữ chọn giúp, rồi ngồi trước gương điểm trang; đề chuộng Xa xỉ ${T.r?T.r[0]:40} đến ${T.r?T.r[1]:120}`,later:1,go:()=>tsDressGame(th,(P,sk)=>tsMkSit(th,dm,()=>{const d=tsDressPts(S,P,th,toilToday(S));const mk=tsMkPts(toilToday(S),W);finish({p:S,raw:d.raw,vp:d.vp,lux:d.lux,mkLux:d.mkLux,st:d.st,mk,score:tsDressTotal(S,d.raw)+mk.add})}))}),
  tsOpt({n:"Cáo bệnh, không dự",fx:{danh:BAL.eff.jts.danhGo_3},duoc:[`Sức +${BAL.cv.rest}`],go:()=>{apply({suc:BAL.cv.rest});finish(null)}})]})});
/* the dressing board: tap item tiles into four slots, then present; skip = her maid picks (by her loyalty) */
function tsDressGame(th,done){tsTagsFresh();const T=TS_THEME[th];const P={};const inv=S.inv.map((e,i)=>({e,i})).filter(({e})=>TS_SLOT.some(([,,fit])=>fit(e.k)));
 const maidPick=()=>{const good=roll(S.maid?S.maid.loyal:50);const keys=inv.map(x=>x.e.k);if(good)return tsDressBest(S,keys,th);const Q2={};for(const [sl,,fit] of TS_SLOT){const c=keys.filter(fit);if(c.length)Q2[sl]=pick(c)}return Q2};
 if(tsBot()||typeof kg82Open!=="function"){setTimeout(()=>done(maidPick(),true),0);return}
 const d=kg82Open({art:"Phối đồ",title:`Đề: ${T.n}`,how:`Chạm một món để xem, rồi "Đặt vào" chỗ của nó (hay "Bỏ ra"). Đề ${T.n}: ${T.d}. ${tsMkRow(th,S.month)[0]}: ${tsMkRow(th,S.month)[1]}. Xong thì chạm "Ra mắt", rồi điểm trang trước gương.`});if(!d){done(maidPick(),true);return}const box=kg82Box();
 const grade=k=>typeof kmTierOf==="function"?kmTierOf(k):0;const src=k=>{try{const a=typeof itemArt==="function"?itemArt(k):null;if(a&&a.src)return a.src}catch(e){}return typeof kmItemImg==="function"?kmItemImg(k):""};
 let selI=null;const detHTML=()=>{const e=selI!=null?S.inv[selI]:null;if(!e||typeof kinlDetail!=="function")return typeof kinlDetail==="function"?kinlDetail(null,{key:"ts"}):"";
  const s=TS_SLOT.find(([,,fit])=>fit(e.k));const on=s&&P[s[0]]===e.k;const hit=T.tags.includes(e.k);
  const b=on?pbtn(`data-tsact="off" data-kgkeep="1"`,"Bỏ ra",`thành: ô ${s[1]} để trống`,""):pbtn(`data-tsact="on" data-kgkeep="1"`,`Đặt vào ${s?s[1].toLowerCase():""}`,`thành: ${hit?`hợp đề ${T.n}`:`không hợp đề ${T.n}`}${P[s&&s[0]]?` · kèm: thay ${itm(P[s[0]]).n}`:""}`,"");
  return kinlDetail({e},{key:"ts",acts:[b],luxItem:true})};
 const paint=()=>{const dp=tsDressPts(S,P,th),pts=dp.raw;kg82Set("score",`${pts}/10`);kg82Set("round",`đã đặt ${Object.keys(P).filter(k=>P[k]).length}/4 · Xa xỉ ${dp.lux}`);kg82Set("time","không giới hạn");
  box.innerHTML=`<div class="ts-slots">${TS_SLOT.map(([sl,lab])=>`<div class="ts-slot"><small>${lab}</small>${P[sl]?kitItem({name:itm(P[sl]).n,src:src(P[sl]),grade:grade(P[sl]),size:"sm"}):kitItem({empty:true,name:"trống",size:"sm"})}</div>`).join("")}</div>`+
   `<div class="ts-items">${inv.length?inv.map(({e,i})=>{const on=Object.values(P).includes(e.k);return `<button type="button" class="ts-it${on?" ts-on":""}" aria-pressed="${on}" data-tsi="${i}">${kitItem({name:itm(e.k).n,src:src(e.k),grade:grade(e.k),size:"sm",sel:selI===i})}</button>`}).join(""):`<p class="past">Rương chưa có trang sức, vải vóc hay hương phấn nào.</p>`}</div>`+
   `<div class="ts-det">${detHTML()}</div>`+
   `<div class="kg82act"><button class="kbtn" id="tsdgo">Ra mắt</button>${kitQuick({id:"tsdskip",n:"Bỏ qua",sub:`${S.maid?S.maid.name:"cung nữ"} chọn giúp (có hợp ý hay không tùy thiện cảm của ${S.maid?S.maid.name:"cung nữ"} với ngươi: ${chanceW(S.maid?S.maid.loyal:50)})`})}</div>`;
  /* KIT §70 (owner 15/11): a tap shows the piece (kitItemDetail) with "Đặt vào …" / "Bỏ ra"; nothing is placed on a blind tap */
  box.querySelectorAll("[data-tsi]").forEach(b=>b.onclick=()=>{const i=+b.dataset.tsi;selI=selI===i?null:i;try{sfx("tap")}catch(x){}paint()});
  box.querySelectorAll("[data-tsact]").forEach(b=>b.onclick=()=>{if(b.disabled)return;const e=S.inv[selI];if(!e)return;const s=TS_SLOT.find(([,,fit])=>fit(e.k));if(!s)return;P[s[0]]=b.dataset.tsact==="off"?null:e.k;paint()});
  $("tsdgo").onclick=()=>{kg82Close();done(P,false)};$("tsdskip").onclick=()=>{kg82Close();done(maidPick(),true)}};paint()}

/* =============== lịch: các việc theo tuần / tháng (gọi sau endTurn, giống approaches j24) =============== */
(function(){const e0=endTurn;endTurn=function(){const t0=S&&S.turn,tu=S&&S.tuan,q0=Q.length;const r=e0.apply(this,arguments);try{if(S&&!S.dead&&(S.turn!==t0||S.tuan!==tu)){
  if(!(typeof isSrv==="function"&&isSrv())){tsSummonWeek();tsDenNpc();if(S.tuan===0)tsNpcDanger();
   const s=tsS();if(S.tuan===2&&!S.out&&S.rank<7){const L=promoReqP(S);const miss=L.filter(x=>!x[0]).length;if(L.length&&miss<=1&&s.xpM!==S.turn){s.xpM=S.turn;tsPromoPanel(true)}}
   if(S.tuan===1&&TS_FEST[S.month%12+1]&&s.festY!==`${S.year}-${S.month}`){s.festY=`${S.year}-${S.month}`;if(!S.out)tsFestPre()}
   if((S.month===3||S.month===9)&&S.tuan===1&&!s.dress){if(tsOn()&&!S.out)tsDressAnnounce();else{const th=pick(Object.keys(TS_THEME));s.dress={th,m:S.month%12+1,y:S.month===12?S.year+1:S.year}}}
   if((S.month===4||S.month===10)&&S.tuan===1)tsDressHold();
   if(!S.out)tsDangerOmen()}
  if(Q.length>q0)showModal()}}catch(e){console.error("ts week",e)}return r}})();

/* ---------- vài dòng xếp ô (dùng kitItem + kgbtn của kit; không khung, không màu mới) ---------- */
(function(){const st=document.createElement("style");st.id="ts-css";st.textContent=`
#kg82 .ts-slots{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px;margin:4px 0 8px}
#kg82 .ts-slot{display:flex;flex-direction:column;align-items:center;gap:2px;min-width:0}
#kg82 .ts-slot>small{font-size:.74rem;color:var(--k-lab,#8a7350)}
#kg82 .ts-items{display:grid;grid-template-columns:repeat(auto-fill,minmax(88px,1fr));gap:6px;max-height:calc(42*var(--kvh,1vh));overflow:auto;padding:2px;align-items:start}
#kg82 .ts-det{margin:8px 0 4px}#kg82 .ts-det>.past{margin:4px 0}
/* review ts-a FAIL 1: a <button> centres its content — every tile starts at the top so pictures and names line up across a row */
#kg82 .ts-it{background:none;border:0;padding:0;cursor:pointer;min-width:0;opacity:.75;align-self:start;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;height:auto}
#kg82 .ts-it.ts-on{opacity:1}
/* KIT 31.13: the glow and ×1.06 are on the FRAME only (scaled from its centre) — the tile box, its name and its grade line stay on the row's line */
.ts-it.ts-on .kitb{filter:var(--k-glow,drop-shadow(0 0 5px #ffd66e) drop-shadow(0 0 2px #be8c1ee6));transform:scale(1.06)}
#kg82 .kgbox{position:relative}
#kg82 .ts-guard{position:absolute;left:50%;top:38%;transform:translateX(-50%);z-index:2;min-height:44px}

`;document.head.appendChild(st)})();
window.TSA=Object.assign(TSA,{dangerOf:tsDangerOf,dangerPanel:tsDangerPanel,promoPanel:tsPromoPanel,summonMe:tsSummonMe,summonWeek:tsSummonWeek,denWish:tsDenWish,denCard:tsDenCard,dressAnnounce:tsDressAnnounce,dressHold:tsDressHold,leHost:tsLeHost,birthReward:tsBirthReward,festPre:tsFestPre});
