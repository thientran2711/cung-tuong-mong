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
/* palace voice: the maid's warning is a pool (jvoice kLine, no repeat within BAL.voice.noRepeat tuần); {V} = who asks around */
const TS_WARN=["“Dạo này người các cung nhìn {goi} không thiện ý. Nô tỳ nghe bên {V} hỏi giờ giấc cung ta.”","“{Goi}, người bên {V} cứ lảng vảng quanh cửa cung mình. Nô tỳ thấy không yên.”",
 "“Tai vách mạch rừng, {goi} ạ. Bên {V} vừa dò hỏi chuyện ăn uống của cung ta.”","“Nô tỳ nghe phong thanh, {V} đang để mắt đến {goi}. Mấy hôm nay {goi} nên cẩn trọng.”",
 "“Cung nữ bên {V} hỏi han nô tỳ đủ điều, nô tỳ chẳng dám hé răng. {Goi} phải đề phòng.”","“Cây cao thì đón gió, {goi} ạ. Bên {V} xì xào về cung mình đã mấy hôm.”"];
function tsGoi(p){/* one address core (jvoice kAddr, VANPHONG §2) */return kSay({srv:"f"},p||S,"{goi}")}
function tsNm(p){try{if(p===S)return"ngươi";return (p.queen?"Hoàng hậu":RANKS[cl(p.rank||0,0,7)].n)+" "+p.name}catch(e){return p&&p.name||""}}
function tsBot(){return typeof window.__bot!=="undefined"}
function tsLast(){return BUOI.length-1}
/* ---------- one option card: odds word + Được / Mất / Kèm (+ costs in fx → Tốn) + Cần (need) ---------- */
function tsOpt(o){const sure=o.odds==null||o.odds>=100;const L=[sure?"Chắc chắn":word(cl(Math.round(o.odds),5,95))];
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
(function(){const i0=kg82Img;kg82Img=function(n){if(TS_IMG[n]){let i=KG82_IMG[n];if(!i){i=new Image();i.decoding="async";i.src=TS_IMG[n];KG82_IMG[n]=i}return i}return i0.apply(this,arguments)}})();
function tsEngPluck(box,env){const C=kg82Canvas(box,1,460),{g,W,H}=C;const N=12,lv=env.lv||0,dur=24000,spd=W/(5200+lv*350);const t0=performance.now();
 const L=[];let next=600,made=0,credit=0,stop=false,raf=0;const pops=[];const zx0=W*.28,zx1=W*.72,zy=H*.4,zy1=H*.74;
 const risk=KG82.tsRisk||null;let alarm=null;KG82.tsGuard=null;
 function spawn(tt){const big=Math.random()<.55;L.push({x:W+40,y:zy+(zy1-zy)*(.2+Math.random()*.65),r:big?26+Math.random()*7:16+Math.random()*5,big,born:tt,st:0});made++}
 function draw(now){const tt=now-t0;kg82Bg(g,W,H,"duho",.05,.5);
  g.save();g.fillStyle="rgba(240,208,112,.16)";g.fillRect(zx0,zy,zx1-zx0,zy1-zy);g.strokeStyle="rgba(240,208,112,.85)";g.setLineDash([6,5]);g.lineWidth=2;g.strokeRect(zx0,zy,zx1-zx0,zy1-zy);g.restore();
  g.font=`700 14px ${kg82Col("--display","serif")}`;g.textAlign="center";kg82Lbl(g,"Tầm tay",(zx0+zx1)/2,zy1-8);
  for(const s of L){if(s.st)continue;if(!kg82Spr(g,"hat-lotus",s.x,s.y,s.r*2.2,null,{alpha:s.big?1:.88}))kg82Blossom(g,s.x,s.y,s.r*.8,"#e48aa4",false)}
  if(alarm&&!alarm.done){g.font=`700 15px ${kg82Col("--display","serif")}`;g.textAlign="left";kg82Lbl(g,"Lau sậy bên bờ khẽ động",10,22,W-20,true)}
  kg82DrawPops(g,pops,now)}
 function frame(now){if(stop)return;const tt=now-t0;
  if(!alarm||alarm.done){if(tt>next&&made<N){spawn(tt);next=tt+1500+Math.random()*700}}
  for(const s of L){if(s.st)continue;s.x-=spd*16;if(s.x<-40)s.st=2}
  if(risk&&!alarm&&tt>dur*.5){alarm={a:tt,done:false};const b=document.createElement("button");b.className="kgbtn ts-guard";b.type="button";b.textContent="Hộ giá";b.onclick=()=>{if(alarm.done)return;alarm.done=true;KG82.tsGuard=1;b.remove();kg82Pop(pops,W/2,H*.3,"Hộ giá kịp lúc","#2d7a52")};box.appendChild(b);alarm.btn=b}
  if(alarm&&!alarm.done&&tt-alarm.a>3500){alarm.done=true;KG82.tsGuard=0;if(alarm.btn)alarm.btn.remove();kg82Pop(pops,W/2,H*.3,"Cấm quân đã xông tới","#8a7350")}
  const left=L.filter(s=>!s.st).length;const done=made>=N&&!left;env.hud({score:`${Math.round(10*Math.min(1,credit/(N*mgFull(env,.62))))}/10`,round:`Hồi ${Math.min(N,made)}/${N}`,time:`${Math.max(0,Math.ceil((dur-tt)/1000))} giây`});
  draw(now);if(done||tt>dur+4000){stop=true;if(risk&&KG82.tsGuard==null)KG82.tsGuard=0;return env.end(10*Math.min(1,credit/(N*mgFull(env,.62))))}raf=requestAnimationFrame(frame)}
 C.cv.addEventListener("pointerdown",e=>{e.preventDefault();if(stop)return;const [x,y]=C.at(e);let best=null,bd=1e9;for(const s of L){if(s.st)continue;const d=Math.hypot(s.x-x,s.y-y);if(d<s.r*1.25&&d<bd){bd=d;best=s}}
  if(!best)return;if(best.x>=zx0&&best.x<=zx1){best.st=1;credit+=best.big?1:.45;kg82Pop(pops,best.x,best.y-best.r,best.big?"Sen nở":"Búp sen",best.big?"#2d7a52":"#8f5f0c")}else{credit-=.15;kg82Pop(pops,best.x,best.y-best.r,"Xa quá","#c23b22")}});
 KG82.peek=()=>{const s=L.find(s=>!s.st&&s.x>zx0+10&&s.x<zx1-10);return s?C.client(s.x,s.y):null};
 raf=requestAnimationFrame(frame);return()=>{stop=true;cancelAnimationFrame(raf);const b=box.querySelector(".ts-guard");if(b)b.remove()}}
function tsEngSteer(box,env){const C=kg82Canvas(box,1.05,470),{g,W,H}=C;const lv=env.lv||0,dur=20000;const t0=performance.now();let stop=false,raf=0,lx=W/2,tx=W/2,wind=0,good=0,tot=0,hit=0;const pops=[];
 const pads=[];let nextPad=900;const ly=H*.72;
 function chan(tt){return W/2+Math.sin(tt/2100)*W*.22}
 function draw(now){const tt=now-t0;kg82Bg(g,W,H,"den",.04,.55);const cx=chan(tt),cw=W*(.2+lv*.012);
  const gr=g.createLinearGradient(cx-cw,0,cx+cw,0);gr.addColorStop(0,"rgba(255,240,190,0)");gr.addColorStop(.5,"rgba(255,240,190,.32)");gr.addColorStop(1,"rgba(255,240,190,0)");g.fillStyle=gr;g.fillRect(cx-cw,0,cw*2,H);
  for(const p of pads)kg82Spr(g,"hat-lotus",p.x,p.y,p.r*2.1,null,{alpha:.95});
  if(!kg82Spr(g,"doden-lantern",lx,ly,48,null,{glow:hit>now?0:1}))kg82Blossom(g,lx,ly,16,"#e06030",true);
  g.font=`700 13px ${kg82Col("--display","serif")}`;g.textAlign="center";kg82Lbl(g,wind>.15?"Gió đẩy sang phải":wind<-.15?"Gió đẩy sang trái":"Lặng gió",W/2,18);kg82DrawPops(g,pops,now)}
 function frame(now){if(stop)return;const tt=now-t0;wind=Math.sin(tt/1700)*.6+Math.sin(tt/530)*.25;
  lx+=(tx-lx)*.12+wind*1.6;lx=cl(lx,20,W-20);
  if(tt>nextPad){pads.push({x:20+Math.random()*(W-40),y:-30,r:22+Math.random()*10});nextPad=tt+900+Math.random()*700}
  for(const p of pads)p.y+=H/(5200+lv*300)*16;for(let i=pads.length-1;i>=0;i--)if(pads[i].y>H+40)pads.splice(i,1);
  const cx=chan(tt),cw=W*(.2+lv*.012);tot++;if(Math.abs(lx-cx)<cw*.8)good++;
  for(const p of pads){if(!p.hit&&Math.hypot(p.x-lx,p.y-ly)<p.r+14){p.hit=1;good=Math.max(0,good-40);hit=now+500;kg82Pop(pops,lx,ly-30,"Chạm hoa sen","#c23b22")}}
  const sc=Math.round(10*good/Math.max(1,tot));env.hud({score:`${sc}/10`,round:`Hồi 1/1`,time:`${Math.max(0,Math.ceil((dur-tt)/1000))} giây`});
  draw(now);if(tt>dur){stop=true;return env.end(10*good/Math.max(1,tot))}raf=requestAnimationFrame(frame)}
 const mv=e=>{const [x]=C.at(e);tx=x};C.cv.addEventListener("pointerdown",e=>{e.preventDefault();mv(e)});C.cv.addEventListener("pointermove",e=>{if(e.buttons||e.pointerType==="touch")mv(e)});
 KG82.peek=()=>C.client(chan(performance.now()-t0),ly);
 raf=requestAnimationFrame(frame);return()=>{stop=true;cancelAnimationFrame(raf)}}
Object.assign(KG82_ENG,{tspluck:tsEngPluck,tssteer:tsEngSteer});
/* tsGame({kind, art, title, odds (cơ may thường 0–100), risk, ctx, intro:[rows], onDone(res)}): res {raw 0–10, skipped, guard} */
function tsGame(o){const odds=cl(Math.round(o.odds||50),5,95);const skipRes=()=>{const ok=roll(odds);return{raw:ok?7:3,skipped:true,ok,guard:o.risk?(roll(odds)?1:0):null}};
 if(tsBot()||typeof kg82Open!=="function"){const r=skipRes();setTimeout(()=>o.onDone(r),0);return}
 const K=KG82_KIND[o.kind];KG82.ctx=o.ctx||"hoc";KG82.tsRisk=o.risk||null;KG82.tsGuard=null;try{mgSet(o.kind,{occ:o.occ||"trieu"})}catch(e){KG82.lv=0}kg82Preload(o.kind);
 const d=kg82Open({art:o.art||K.n,title:o.title||K.t,how:K.how,pic:typeof kg82Pic==="function"?kg82Pic(o.kind):""});if(!d){o.onDone(skipRes());return}const box=kg82Box();
 const fin=(r)=>{KG82.phase="result";KG82.tsRisk=null;const rows=[["Màn chơi",r.skipped?`Bỏ qua: tính theo cơ may (${word(odds)}) → ${r.ok?"thuận":"không thuận"}`:`${r.raw}/10 · ${kg82Word(r.raw)}`,"t"]];
  if(o.risk)rows.push(["Hộ giá",r.guard?"kịp lúc":"không kịp, cấm quân lo liệu",r.guard?"g":"n"]);if(o.note)rows.push(["Ghi chú",o.note,"n"]);
  kg82ShowRes(tsRows(rows)+`<div class="kg82act"><button class="kbtn" id="kg82ok">Đã hiểu</button></div>`,r.skipped?!!r.ok:r.raw>=5);kg82Set("score",`${r.raw}/10`);kg82Set("time","đã hết");
  $("kg82ok").onclick=()=>{kg82Close();try{o.onDone(r)}catch(e){console.error(e)}}};
 KG82.phase="intro";box.innerHTML=(o.intro?tsRows(o.intro):"")+`<div class="kg82act"><button class="kbtn" id="kg82go">Bắt đầu</button><button class="kbtn alt" id="kg82skip">Bỏ qua<small>tính theo cơ may thường: ${word(odds)}</small></button></div>`;
 $("kg82go").onclick=()=>kg82Play(o.kind,raw=>fin({raw,skipped:false,guard:o.risk?(KG82.tsGuard?1:0):null}));$("kg82skip").onclick=()=>fin(skipRes())}
window.tsGame=tsGame;

/* =============== Ý 6 · NGUY HIỂM CHUNG: mọi ghen / oán / ghét nhắm vào một người, gộp làm một thanh (cùng công thức rivalsBuoi, j24) =============== */
/* q(v→t) = cơ một tháng v ra tay với t: cơ mỗi buổi theo mức (BANDS) × phần v nhắm t (pickTarget) qua 9 buổi */
function tsQ(v,t){try{const d=danger(v,t),b=bandOf(d);if(!b)return 0;const lo=BANDS[b][0],hi=b<3?BANDS[b+1][0]:100;let c=[0,.03,.04,.05][b]*(1+cl((d-lo)/(hi-lo),0,1));if(t===S)c*=BAL.hz;
  const L=others(v);const w=L.map(x=>1+hostility(v,x));const sh=(1+hostility(v,t))/w.reduce((a,b)=>a+b,0);return 1-Math.pow(1-c*sh,9)}catch(e){return 0}}
function tsNamed(v){try{return typeof k61Named!=="function"||k61Named(v)}catch(e){return true}}
/* "quý" words (VANPHONG §1) */
function tsQuy(a){return quyW(a)}/* ONE CORE: VANPHONG "quý" word (BAL.quyLv) */
function tsDangerOf(t,known){const L=(t===S?liveRivals(true):others(t).filter(x=>x!==S)).filter(v=>v.alive&&!v.out&&v!==t);let p=1;const top=[];let unk=0;
 for(const v of L){const isK=!known||((knows(v)||(S.dKnown&&S.dKnown[v.id]))&&tsNamed(v));if(!isK){unk++;continue}const q=tsQ(v,t);if(q<=0)continue;p*=1-q;top.push({v,q,b:bandOf(danger(v,t))})}
 top.sort((a,b)=>b.q-a.q);return{n:Math.round(100*(1-p)),top,unk}}
const TS_DW=[[0,"yên"],[10,"có kẻ dòm ngó"],[30,"nhiều kẻ muốn hại"],[60,"rất nguy"]];
function tsDWord(n){let w=TS_DW[0][1];for(const [a,b] of TS_DW)if(n>=a)w=b;return w}
function tsDangerPanel(){if(!S||S.dead)return;const D=tsDangerOf(S,true);
 const facts=D.top.slice(0,6).map(x=>({who:x.v,text:`${kitName?kitName(x.v):x.v.name}: mức ${BANDS[x.b][1]} · đang ghen ${x.v.ghen||0} · oán ${Math.round(oan(x.v,S)||0)}`}));
 const sec=`<div class="kpsec"><h4 class="kpst">Thanh chung</h4>${tsRows([["Nguy hiểm chung",`${D.n} · ${tsDWord(D.n)}`,D.n>=BAL.tsDanger.hot?"r":"t"],["Gộp từ",`${D.top.length} người ngươi đã rõ lòng`,"n"],D.unk?["Chưa rõ",`${D.unk} người ngươi chưa rõ lòng (dò la, tai mắt để biết)`,"n"]:null].filter(Boolean))}</div>`+
  `<div class="kpsec"><h4 class="kpst">Cách tính</h4>${tsRows([["Mỗi người","Ghen, Oán hoặc ghét (lấy cao nhất) + tính nết → mức hại (thang nguy hiểm)","n"],["Gộp","cơ một tháng có ít nhất một người ra tay với ngươi, từ 0 đến 100","n"],["Áp cho","mọi phi tần, cùng một cách tính","n"]])}</div>`+
  (facts.length?`<div class="kpsec"><h4 class="kpst">Người nặng lòng nhất</h4>${tsFacts(facts)}</div>`:"");
 const g=tsS().guard>wk();const opts=[tsOptGuard(),tsOptGifts(D),tsOptGiftsItem(D),{n:"Thôi",fx:{}}].filter(Boolean);/* "Thôi" = the kit ✕ (KIT 32.10), never a button */
 Q.unshift({t:"Nguy hiểm chung",h:sec,opts,showOut:true,tsk:"danger"});showModal()}
function tsOptGuard(){const s=tsS();if(s.guard>wk())return tsOpt({n:"Đóng cửa giữ mình",need:[{t:`chưa giữ mình (còn ${s.guard-wk()} tuần)`,ok:false}],duoc:["kẻ muốn hại khó ra tay"]});
 return tsOpt({n:"Đóng cửa giữ mình",fx:{sung:-2},need:[{t:"không cấm túc",ok:!S.confined}],duoc:["2 tuần: mưu hại nhắm vào ngươi thành ít đi một nửa"],kem:["ít gặp Hoàng thượng"],go:()=>{s.guard=wk()+2;log("Ngươi đóng cửa cung, dặn kẻ hầu canh giữ nghiêm, hai tuần không ra ngoài nhiều.")}})}
function tsOptGifts(D){const L=D.top.filter(x=>x.b>=1).slice(0,4);if(!L.length)return null;const G=BAL.tsGift,c=L.length*G.bac;
 return tsOpt({n:"Biếu quà làm lành",fx:{bac:-c},need:[tsNeedBac(c)],duoc:L.map(x=>`${x.v.name} bớt ghen ${G.ghen}, bớt oán ${G.oan}`),go:()=>{for(const x of L){x.v.ghen=cl((x.v.ghen||0)-G.ghen,0,100);oanAdd(x.v,S,-G.oan);tsAff(x.v,G.aff)}log(`Ngươi sai người mang quà sang ${kitNameList(L.map(x=>x.v))}, lời lẽ mềm mỏng.`)}})}
/* D19 (owner OD:L752): "Biếu quà làm lành" also takes a handmade work or an item of equal worth instead of bạc, for the person who bears the most
   ill will. Worth = the same rules as any gift: a work by wkEval (tastes, fatigue, chân tình), an item by giftVal (her tastes) + jlux.luxGift (a
   mọn piece is not enough). BAL.tsGift.eq = the least worth; the item itself goes through giveTo (one gift rule for her and every consort). */
function tsGiftWorth(e,v){if(!e||e.h)return{ok:false,why:"",q:-1};
 if(e.wk){const ev=wkEval(S,e.wk,v);if(!ev.ok)return{ok:false,why:ev.why||"nàng không nhận đồ này",q:-1};const ok=ev.v>=BAL.tsGift.eq;return{ok,why:ok?"":"tác phẩm còn mỏng, chưa đủ lễ",q:ev.v,note:ev.notes.join("; ")}}
 const it=IT[e.k];if(!it)return{ok:false,why:"",q:-1};if(e.t)return{ok:false,why:"đồ đã tẩm, không thể biếu",q:-1};
 const q=giftVal(Object.assign({k:e.k},it),v);let lg=null;try{lg=luxGift(e.k,S,v)}catch(x){}
 const mon=lg&&lg.st==="mon";const ok=q>=BAL.tsGift.eq&&!mon;return{ok,why:ok?"":(mon?"quà mọn, chưa đủ lễ":"nàng không ưa món này, chưa đủ lễ"),q,note:lg?lg.word:""}}
function tsOptGiftsItem(D){const L=D.top.filter(x=>x.b>=1).slice(0,4);if(!L.length||!S.inv.some(e=>!e.h))return null;const x=L[0],G=BAL.tsGift;
 return tsOpt({n:"Biếu quà làm lành bằng đồ",duoc:[`${x.v.name} bớt ghen ${G.ghen}, bớt oán ${G.oan}`],kem:["một món trong rương thay cho bạc"],note:"người nặng lòng nhất",go:()=>{pushDil(mkP("tsgiftpick",{v:x.v.id}),"Biếu quà làm lành")}})}
PEND.tsgiftpick=p=>{const v=RV(p.v);if(!v)return null;const G=BAL.tsGift;const items=S.inv.map((e,i)=>[e,i]).filter(([e])=>!e.h);
 return{who:pv(v),t:`<p>Chọn món đồ biếu ${v.name} để làm lành. Món phải đáng giá một phần lễ bạc (${G.bac} bạc), hợp ý nàng.</p>`,o:items.map(([e,i])=>{const w=tsGiftWorth(e,v);
  return{n:giftName(e),ik:i,fx:{},x:w.ok?`Chắc chắn · thành: nàng bớt ghen ${G.ghen}, bớt oán ${G.oan}${w.note?" · "+w.note:""}`:"",need:w.ok?[]:[{t:w.why||"không biếu được",ok:false}],tsDis:!w.ok,
   go:()=>{if(!w.ok)return;spend(G.khac);const r=giveTo(S,v,i);v.ghen=cl((v.ghen||0)-G.ghen,0,100);oanAdd(v,S,-G.oan);log(`${r}Lời lẽ mềm mỏng, lòng nàng dịu đi.`)}}}).concat([{n:"Thôi",fx:{}}])}};
/* the guard: same rule for everyone (a target who keeps to herself is harder to reach) */
(function(){if(typeof npcAct!=="function")return;const n0=npcAct;npcAct=function(v,t){try{const g=t===S?tsS().guard:t&&t.tsGuard;if(g>wk()&&roll(50))return""}catch(e){}return n0.apply(this,arguments)}})();
/* NPC side: a consort whom many want to harm closes her doors / sends gifts, by her own nature (same costs) */
function tsNpcDanger(){for(const v of liveRivals(true)){if(!v.alive||v.out||v.tsGuard>wk())continue;const D=tsDangerOf(v,false);if(D.n<BAL.tsDanger.act)continue;const care=nv(v,"tsCare");if(!roll(care))continue;v.tsGuard=wk()+2;v.sung=cl((v.sung||0)-2,0,100)}}
/* the HUD chip (Tình trạng row) + điềm báo when her own known bar climbs a step */
/* review ts-a FAIL 2: the chip sits in the stage's right column (K3_RIGHT), never on the top bar's buổi line (it broke the date line on Fold) */
if(window.K3_RIGHT)window.K3_RIGHT.push("tsnh");
(function(){if(typeof renderHud2!=="function")return;const r0=renderHud2;renderHud2=function(){const r=r0.apply(this,arguments);try{const el=$("hud2");if(el&&tsOn()&&!S.out){const D=tsDangerOf(S,true);
  el.insertAdjacentHTML("beforeend",`<button class="hc ${D.n>=BAL.tsDanger.hot?"hot":D.n<BAL.tsDanger.calm?"ok":""}" data-hx="tsnh">Nguy hiểm chung: ${D.n}</button>`)}}catch(e){}return r}})();
document.addEventListener("click",e=>{const b=e.target.closest('[data-hx="tsnh"],[data-k3="tsnh"]');if(!b||!tsOn())return;e.stopPropagation();e.preventDefault();if(Q.length)return;tsDangerPanel()},true);
function tsDangerOmen(){const s=tsS();const D=tsDangerOf(S,true);const st=TS_DW.filter(x=>D.n>=x[0]).length-1;const was=s.dStep||0;s.dStep=st;if(st<=was||st<2||!D.top.length)return;
 const x=D.top[0];tsPanel({t:"Lời cảnh báo",who:pMaid(),h:`<p>${S.maid.name} khẽ thưa: ${kLine("ts:warn",TS_WARN,{sp:{srv:"f"},ls:S}).replace(/\{V\}/g,x.v.name)}</p>${tsRows([["Nguy hiểm chung",`${D.n} · ${tsDWord(D.n)}`,"r"]])}`,
  opts:[tsOptGuard(),tsOptGifts(D),tsOptGiftsItem(D),tsOpt({n:"Ghi nhớ, cứ như thường",duoc:["không tốn gì"],kem:["kẻ muốn hại vẫn rình"]})].filter(Boolean)})}

/* =============== Ý 5 · NGƯỠNG XÉT PHẨM HIỆN TRƯỚC (promoReqP j8: cùng điều kiện cho mọi phi tần) =============== */
function tsPromoRows(){const L=promoReqP(S);return L.map(([ok,t])=>[ok?"Đủ":"Thiếu",t,ok?"g":"r"])}
function tsPromoPanel(pre){if(!tsOn()||S.out||S.rank>=7)return;const L=promoReqP(S);if(!L.length)return;const miss=L.filter(x=>!x[0]).length;const nx=RANKS[S.rank+1].n;
 const m={t:`Xét phẩm cuối tháng · ${nx}`,h:`${pre?`<p>Cuối tháng này Nội vụ phủ dâng danh sách lên Hoàng thượng xét tấn phong. Còn ${3-S.tuan} tuần.</p>`:""}<div class="kpsec"><h4 class="kpst">Điều kiện lên ${nx}</h4>${tsRows(tsPromoRows())}</div>${tsRows([["Ghi chú",miss?`thiếu ${miss} điều: đủ hết thì cuối tháng được sắc phong`:"đủ cả: cuối tháng được sắc phong nếu không gì đổi","n"]])}`,btn:"Đã hiểu",tsk:"promo"};
 if(pre)Q.push(m);else{Q.unshift(m);showModal()}}
if(window.K3_RIGHT)window.K3_RIGHT.push("tsxp");
(function(){if(typeof renderHud2!=="function")return;const r0=renderHud2;renderHud2=function(){const r=r0.apply(this,arguments);try{const el=$("hud2");if(el&&tsOn()&&!S.out&&S.rank<7){const L=promoReqP(S);if(L.length){const miss=L.filter(x=>!x[0]).length;
  el.insertAdjacentHTML("beforeend",`<button class="hc ${miss?"":"ok"}" data-hx="tsxp">Xét phẩm: ${miss?`thiếu ${miss}`:"đủ"}</button>`)}}}catch(e){}return r}})();
document.addEventListener("click",e=>{const b=e.target.closest('[data-hx="tsxp"],[data-k3="tsxp"]');if(!b||!tsOn())return;e.stopPropagation();e.preventDefault();if(Q.length)return;tsPromoPanel(false)},true);
/* festivals (j3/j8 festival): the two judged banquets say beforehand what is judged and where she stands */
const TS_FEST={1:["Yến tiệc đầu xuân","sac","Sắc và điệu múa"],7:["Thi tài ngày Thất tịch","tai","Tiếng đàn, lời thơ"]};
function tsFestScore(p,k){return k==="sac"?effSac(p)+artW2(p,"vu")*6:p.tai+(artW2(p,"cam")+artW2(p,"thi"))*3}
function tsFestPre(){const m=S.month%12+1;const F=TS_FEST[m];if(!F)return;const s=tsS();const [n,k,lbl]=F;const me=tsFestScore(S,k);const top=s.festTop&&s.festTop[k];
 Q.push({t:`Sắp tới: ${n}`,h:`<p>Đầu tháng sau có ${n}. Hoàng thượng chấm ${lbl.toLowerCase()}; người đứng đầu được ban thưởng.</p><div class="kpsec"><h4 class="kpst">Phần của ngươi lúc này</h4>${tsRows([
  [k==="sac"?"Sắc":"Tài",`${k==="sac"?effSac(S):S.tai}`,"t"],[k==="sac"?"Vũ (nhân 6)":"Cầm + Thi (nhân 3)",`${k==="sac"?artW2(S,"vu"):artW2(S,"cam")+artW2(S,"thi")}`,"t"],["Tổng",`${me} (thêm vận may hôm ấy 0–30)`,"t"],
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
  const gifts=G.filter(v=>aff(v,S)>=30&&v.inv&&v.inv.length).slice(0,2);const gl=[];for(const v of gifts){const k=pick(["tuithom","demgam","sonphan","huongtram"]);S.inv.push({k,from:v.id});gl.push(`${v.name}: ${itm(k).n}`)}
  const n=G.length,hi=8*n,lo=4*n;const s=tsS();s.leN=(s.leN||0)+1;
  tsPanel({t:`Lễ tấn phong · ${RANKS[to].n}`,who:pMe(),h:`<p>Thánh chỉ vừa tuyên, ${n} vị phi tần sang cung ngươi dự lễ chúc mừng.</p>${tsFacts(lines)}${gl.length?tsRows([["Quà mừng",gl.join(" · "),"g"]]):""}<p class="past">Theo lệ, chủ lễ phát lì xì cho khách. Phát hậu thì lòng người êm; không phát dễ mang tiếng keo kiệt.</p>`,
   opts:[tsOpt({n:"Phát lì xì hậu",fx:{bac:-hi},need:[tsNeedBac(hi)],duoc:[`${n} vị khách bớt ghen 6`,"khách: thiện cảm +4","Danh +1"],go:()=>{G.forEach(v=>{v.ghen=cl((v.ghen||0)-6,0,100);tsAff(v,4)});apply({danh:1});log(`Lễ tấn phong: ngươi phát lì xì hậu cho ${n} vị khách.`)}}),
    tsOpt({n:"Phát lì xì vừa phải",fx:{bac:-lo},need:[tsNeedBac(lo)],duoc:[`${n} vị khách bớt ghen 3`,"khách: thiện cảm +2"],go:()=>{G.forEach(v=>{v.ghen=cl((v.ghen||0)-3,0,100);tsAff(v,2)});log(`Lễ tấn phong: ngươi phát lì xì cho ${n} vị khách.`)}}),
    tsOpt({n:"Không phát",mat:["Danh -2","người đang ghen: ghen +3 (chê keo kiệt)"],go:()=>{apply({danh:-2});G.forEach(v=>{if((v.ghen||0)>=40)v.ghen=cl(v.ghen+3,0,100)});log("Lễ tấn phong: ngươi không phát lì xì; có người xì xào chê keo kiệt.")}})]});
  return}
 /* an NPC host: the same rite, she is a guest */
 if(!tsOn()||S.out||S.confined)return;const s=tsS();if(s.leWk===wk())return;s.leWk=wk();const [k]=tsWish(S,p);
 /* the invitation names the host: she is known from now on (name + face) */
 try{if(typeof k61Meet==="function")k61Meet(p,"Nhân lễ tấn phong, ngươi được thấy người.")}catch(e){}const rich=(p.bac||0)>=40;
 tsPanel({t:`Lễ tấn phong ${p.name}`,who:pv(p),h:`<p>${p.name} vừa được tấn phong ${RANKS[cl(to,0,7)].n}. Cung nàng mở tiệc, mời lục cung sang chúc.</p>${tsRows([[kitRel("them",KIT_REL.affThem),knows(p)?`${tsQuy(aff(p,S))} · ${aff(p,S)}`:KIT_REL.unknown,aff(p,S)>=11?"g":aff(p,S)<=-11?"r":"n"],["Lì xì",rich?"nhà nàng có của, hẳn phát cho khách":"nàng không dư dả, chưa chắc có lì xì","n"]])}`,
  opts:[tsOpt({n:"Đến chúc mừng",fx:{suc:-5},need:[tsNeedSuc(5)],duoc:["thiện cảm +5",rich?"lì xì Bạc +6":"nàng nhớ ngươi đến"],kem:k==="gượng"?["ngươi đang ghen với nàng, khó giấu nét mặt"]:[],go:()=>{tsAff(p,5);if(rich){apply({bac:6});p.bac=(p.bac||0)-6}log(`Ngươi sang dự lễ tấn phong của ${p.name}.`)}}),
   tsOpt({n:"Gửi lễ mừng",fx:{bac:-15},need:[tsNeedBac(15)],duoc:["thiện cảm +6"],go:()=>{tsAff(p,6);p.bac=(p.bac||0)+15;log(`Ngươi gửi lễ mừng ${p.name}.`)}}),
   tsOpt({n:"Không đến",mat:["thiện cảm -6",`oán ta ${balSg(BAL.eff.jts.go)}`],go:()=>{tsAff(p,-6);oanAdd(p,S,BAL.eff.jts.go);log(`Ngươi không sang dự lễ tấn phong của ${p.name}.`)}})]})}
/* other NPC guests at an NPC rite follow the same rule silently: lì xì from a rich host lowers their envy a little */
function tsLeNpc(p){const G=tsGuests(p).filter(x=>x!==S);if((p.bac||0)<4*G.length)return;p.bac-=4*G.length;for(const v of G){if(v.rl)v.rl[p.id]=cl((v.rl[p.id]||0)+2,-100,100)}}
(function(){const p0=promoteP;promoteP=function(p){const r0=rkOf(p),al=p===S||p.alive;const r=p0.apply(this,arguments);try{if(al&&rkOf(p)>r0&&!quiet&&!(typeof NLP!=="undefined"&&NLP)){if(p===S){if(tsOn()&&!S.out)tsLeHost(S,S.rank)}else{tsLeNpc(p);tsLeHost(p,rkOf(p))}}}catch(e){console.error("tsLe",e)}return r}})();

/* =============== Ý 12 · ÂN THƯỞNG SAU SINH: thưởng theo nguyên nhân thật (con trai / gái, Sủng của mẹ, Thái hậu), không còn hên xui =============== */
let tsBirthOn=0;
(function(){const b0=bestow;bestow=function(p,why){if(tsBirthOn&&(why==="son"||why==="dau"))return;return b0.apply(this,arguments)}})();
(function(){const b0=birthP;birthP=function(p,fake){const n0=(p.kids||[]).length;tsBirthOn++;let r;try{r=b0.apply(this,arguments)}finally{tsBirthOn--}
 try{const born=(p.kids||[]).slice(n0);if(born.length&&(p===S?!S.dead:p.alive))r=(r||"")+tsBirthReward(p,born)}catch(e){console.error("tsBirth",e)}return r}})();
function tsBirthReward(p,born){const me=p===S;const son=born.some(k=>k.sex==="m");const first=(p.kids||[]).length===born.length;const L=[];
 /* Hoàng thượng: always for a prince; for a princess when she is in favour (Sủng ≥ 30) or it is her first child */
 const emp=son||(p.sung||0)>=30||first;if(emp){const q0=Q.length,n0=(p.inv||[]).length;bestow(p,son?"son":"dau");for(let i=Q.length-1;i>=q0;i--)if(Q[i]&&Q[i].t==="Thánh thượng ban thưởng")Q.splice(i,1);
  const it=(p.inv||[]).length>n0?IT[p.inv[p.inv.length-1].k]:null;L.push(["Hoàng thượng",`${son?"mừng hoàng tử":"mừng công chúa"}: ${it?it.n:"một món ngự ban"}, Bạc +${son?30:15}`,"g"])}
 /* Thái hậu: when she favours the mother (Thái hậu ≥ 20) */
 const thOk=!S.thDead&&((me?S.th:p.th)||0)>=20;if(thOk){const k=pick(["nhansam","yensao","demgam"]);p.inv.push({k,from:"th"});ap(p,{bac:20});L.push(["Thái hậu",`${itm(k).n}, Bạc +20`,"g"])}
 if(first){ap(p,{danh:3});L.push(["Lần đầu làm mẹ","Danh +3","g"])}
 if(!me){if(L.length)return `${p.name} được ân thưởng sau sinh. `;return""}
 if(!emp&&!thOk)L.push(["Ghi chú","Hoàng thượng chưa ban gì: Sủng của ngươi dưới 30 và đây không phải con đầu","n"]);
 Q.push({t:"Ân thưởng sau sinh",art:"img/ev-sinh-no.webp",h:`<p>Tin ngươi mẹ tròn con vuông truyền khắp lục cung.</p>${tsRows(L)}`,btn:"Tạ ơn",tsk:"birth"});return""}

/* =============== Ý 3 · HOÀNG THƯỢNG TRIỆU RIÊNG: đàn theo nhịp, chơi cờ, du hồ (một luật cho mọi phi tần) =============== */
function tsMoodW(){const m=S.emp.mood||0;return [1.25,1,.55,.25][cl(m,0,3)]}
function tsRebel(){try{const T=typeof trS==="function"?trS():null;return T&&T.bien<50?T.bien:0}catch(e){return 0}}
function tsSummonW(p){return Math.pow(Math.max(1,(p.sung||0)),1.4)*(1+((p===S?S.an:p.an)||0)/80)}
/* what he asks for: by her gifts and the season (du hồ only in the warm months) */
function tsSummonKind(p){const a=p.arts||{};const warm=S.month>=4&&S.month<=9;const L=[["dan",1+(a.cam||0)*2],["co",1+(a.ky||0)*2]];if(warm)L.push(["duho",2.5]);let t=L.reduce((s,x)=>s+x[1],0)*Math.random();for(const x of L){t-=x[1];if(t<=0)return x[0]}return L[0][0]}
function tsSummonOdds(p,k){const a=p.arts||{};return k==="dan"?40+(a.cam||0)*9+(p.tai||0)/6:k==="co"?40+(a.ky||0)*9+(p.tamco||0)/5:45+effSac(p)/5+(p.tai||0)/8}
function tsSummonGain(raw){return{sung:raw>=BAL.cut.summon[2]?4:raw>=BAL.cut.summon[1]?3:raw>=BAL.cut.summon[0]?2:1,an:raw>=BAL.cut.summon[2]?3:raw>=BAL.cut.summon[1]?2:1}}
function tsSummonWeek(){if(!S||S.dead||S.out||(typeof isSrv==="function"&&isSrv()))return;if(!roll(14*tsMoodW()))return;
 const C=consorts().filter(p=>p.alive!==false&&!p.out&&!p.confined&&!(p.preg>=8));if(!C.length)return;
 const w=C.map(tsSummonW);let r=Math.random()*w.reduce((a,b)=>a+b,0),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}const p=C[i];const k=tsSummonKind(p);
 if(p!==S){const raw=typeof kg82NpcRaw==="function"?kg82NpcRaw(p,k==="duho"?"dan":k):5;const g=tsSummonGain(raw);ap(p,{sung:g.sung});p.an=cl((p.an||0)+g.an,0,100);
  if(k==="duho"&&tsRebel()&&roll(40)){if(roll(tsSummonOdds(p,k)))ap(p,{sung:4,danh:3})}if(knows(p)||S.mat>=2)log(`${p.name} được Hoàng thượng triệu ${k==="dan"?"đánh đàn":k==="co"?"đánh cờ":"du hồ"}.`);return}
 tsSummonMe(k)}
function tsSummonMe(k){const E=S.emp;/* a private summons: she is face to face with him (never a grey "Người lạ" emperor) */try{if(typeof k61Meet==="function"&&E&&!tsNamed(E))k61Meet(E,"Ngài triệu riêng, ngươi được diện kiến.")}catch(e){}const odds=tsSummonOdds(S,k);const nm={dan:"đánh đàn",co:"đánh cờ",duho:"du hồ"}[k];const reb=k==="duho"?tsRebel():0;
 const likes=k==="dan"&&E.known&&E.known.music?` Ngài thích khúc ${E.likes.music}.`:"";
 const kem=reb?[`biên cương bất ổn (${reb}), cấm quân đang lùng loạn đảng quanh kinh thành`]:[];
 const go=()=>{const b=tsPre();tsGame({kind:k,art:k==="dan"?"Cầm":k==="co"?"Kỳ":"Du hồ",title:k==="dan"?"Đàn cho Hoàng thượng nghe":k==="co"?"Đánh cờ cùng Hoàng thượng":"Du hồ cùng Hoàng thượng",odds,risk:reb&&roll(40)?1:0,
  intro:[["Hoàng thượng",k==="dan"?"nghe đàn trong thư phòng":k==="co"?"bày cờ trong thư phòng":"ngồi thuyền giữa hồ sen","n"]].concat(reb?[["Điềm báo","cấm quân canh hai bờ, có tin loạn đảng trà trộn","r"]]:[]),
  onDone:res=>{const g=tsSummonGain(res.raw);const L=[];apply({sung:g.sung});S.an=cl((S.an||0)+g.an,0,100);
   L.push(res.raw>=5?`Hoàng thượng vui lòng (${nm}).`:`Hoàng thượng lơ đãng, ngồi được một lúc thì về (${nm}).`);
   if(res.guard!=null){if(res.guard){apply({sung:4,danh:3});S.an=cl((S.an||0)+3,0,100);L.push("Lau sậy động, ngươi kêu hộ giá kịp lúc; cấm quân bắt được kẻ lạ. Ngài nhớ ơn ngươi (Sủng +4, Danh +3, Ân tình +3).")}else{apply({suc:-8});L.push("Lau sậy động, cấm quân xông tới trước; kẻ lạ bị bắt. Ngươi kinh hãi.")}}
   log(L.join(" "));tsRes(`Hoàng thượng triệu ${nm}`,b,res.raw>=5||res.guard===1);render()}})};
 const g7=tsSummonGain(8),g3=tsSummonGain(3);
 tsPanel({t:`Hoàng thượng triệu ${nm}`,who:pEmp(),art:k==="duho"?"img/ev-le-ha.webp":k==="co"?"img/ev-hoang-de-vui-2.webp":"img/ev-tai-nghe.webp",
  h:`<p>Thái giám Càn Thanh cung đến truyền: “Hoàng thượng rảnh việc triều chính, cho mời ${tsGoi()} sang ${nm}.”${likes}</p>`,
  opts:[tsOpt({n:`Vâng chỉ, sang ${nm}`,fx:{suc:-5},need:[tsNeedSuc(5)],odds,duoc:[`Sủng +${g3.sung}..+${g7.sung}`,`Ân tình +${g3.an}..+${g7.an}`],mat:["ngài lơ đãng: chỉ Sủng +1"],kem:kem,note:"thành bại theo trò nhỏ hoặc theo cơ may khi bỏ qua",later:1,go}),
   reb?tsOpt({n:"Xin ngài đổi sang ngắm hoa trong vườn",fx:{suc:-3},duoc:["Sủng +2"],note:"tránh hồ khi có tin loạn đảng",go:()=>{apply({sung:2});log("Ngươi khéo xin Hoàng thượng đổi sang ngắm hoa trong ngự hoa viên.")}}):null,
   tsOpt({n:"Cáo bệnh",mat:["Sủng -2"],go:()=>{apply({sung:-2});log(`Ngươi cáo bệnh, không sang ${nm}.`)}})].filter(Boolean)})}

/* =============== Ý 14 · THẢ ĐÈN HOA ĐĂNG (Nguyên tiêu, Thất tịch, Trung thu): điều cầu gắn với nguyên nhân thật =============== */
const TS_DEN=["nguyentieu","thattich","trungthu"];
function tsDenFest(){try{const f=festToday();return f&&TS_DEN.includes(f.k)?f:null}catch(e){return null}}
function tsDenCard(){const f=tsDenFest();if(!f||!tsOn()||S.out)return null;const s=tsS();const key=`${S.year}-${f.k}`;
 return{n:"Thả đèn hoa đăng",t:`Đêm ${f.name}, cung nhân thả đèn trên hồ Thái Dịch. Viết điều cầu vào đèn rồi thả trôi.`,c:{bac:-10},o:100,w:{},k:2,b:tsLast(),dom:"Giao thiệp",done:s.den===key?1:0,x:"chọn điều cầu ở bước sau",go:()=>{s.den=key;tsDenWish(f)}}}
(function(){const d0=deal;deal=function(){const r=d0.apply(this,arguments);try{if(Array.isArray(deck)&&tsOn()){const c=tsDenCard();if(c)deck.unshift(c)}}catch(e){}return r}})();
function tsDenSeen(){const E=S.emp;return (E.mood||0)<=1&&(S.sung||0)>=20}
function tsDenWish(f){const s=tsS();const pdLeft=Math.max(0,6-(s.denPD||0));const hos=liveRivals(true).filter(v=>bandOf(danger(v,S))>=1&&!(S.dKnown&&S.dKnown[v.id])&&!knows(v));
 const odds=45+(S.tai||0)/4+(S.arts&&S.arts.hoa||0)*4;const seen=tsDenSeen();
 const play=(kind,after)=>{const b=tsPre();tsGame({kind:"den",art:"Hoa đăng",title:`Thả đèn đêm ${f.name}`,odds,intro:[["Điều cầu",kind,"t"],["Ghi chú","đèn trôi xa và sáng thì người bên hồ trông thấy","n"]],onDone:res=>{const far=res.raw>=6;after(far);tsRes("Thả đèn hoa đăng",b,true);render()}})};
 tsPanel({t:`Đêm ${f.name}: thả đèn`,art:f.k==="nguyentieu"?"img/ev-le-xuan-2.webp":"img/ev-le-thu-2.webp",who:pMaid(),h:`<p>${S.maid.name} đã dán sẵn chiếc đèn hoa sen. Ngươi cầm bút, nghĩ xem nên cầu điều gì.</p>`,opts:[
  tsOpt({n:"Cầu tin tức người nhà",odds:hos.length?Math.min(95,odds):null,duoc:hos.length?["người hầu ngoài bờ nghe được chuyện: biết lòng một người đang muốn hại ngươi"]:["người nhà cũng thả đèn, nhờ người gửi thư vào: Thư nhà"],note:"đèn trôi xa thì nghe rõ hơn",later:1,
   go:()=>play("tin tức",far=>{if(hos.length&&(far||roll(odds))){const v=hos.sort((a,b)=>danger(b,S)-danger(a,S))[0];kn();S.dKnown=S.dKnown||{};S.dKnown[v.id]=wk();noteAdd(v.id,`nghe được bên hồ đêm ${f.name}: nàng có ý hại ngươi (mức ${BANDS[bandOf(danger(v,S))][1]})`);log(`Đêm ${f.name}, người hầu nghe được bên hồ: ${v.name} có ý hại ngươi (mức ${BANDS[bandOf(danger(v,S))][1]}).`)}
    else if(!hos.length&&s.thuY!==S.year){s.thuY=S.year;S.inv.push({k:"thunha",from:"home"});log("Người nhà gửi thư vào cung nhân đêm hoa đăng. Được Thư nhà.")}else log("Đèn trôi chưa xa, chưa nghe được tin gì.")})}),
  tsOpt({n:"Cầu bình an",duoc:pdLeft?[`Phúc duyên +2 (kiếp này còn được ${pdLeft})`,"Đức +1"]:["Đức +1"],note:"Phúc duyên từ đèn có giới hạn: 6 mỗi kiếp",later:1,go:()=>play("bình an",far=>{apply({duc:1});if(pdLeft&&typeof pdAdd==="function"){s.denPD=(s.denPD||0)+2;pdAdd(2,`thả đèn cầu bình an đêm ${f.name}`)}else log("Ngươi thả đèn cầu bình an.")})}),
  tsOpt({n:"Cầu thánh ân",odds:seen?Math.min(95,odds):null,duoc:seen?["Hoàng thượng dạo bên hồ, trông thấy đèn: Sủng +3, Ân tình +2"]:["Đức +1"],kem:seen?[]:["đêm nay Hoàng thượng không ra hồ (ngài đang phiền, hoặc Sủng của ngươi dưới 20)"],later:1,
   go:()=>play("thánh ân",far=>{if(seen&&(far||roll(odds))){apply({sung:3});S.an=cl((S.an||0)+2,0,100);log(`Đêm ${f.name}, Hoàng thượng dạo bên hồ, trông thấy đèn của ngươi trôi xa, dừng lại hỏi han.`)}else{apply({duc:1});log("Ngươi thả đèn, lặng lẽ cầu thánh ân.")}})}),
  tsOpt({n:"Thôi, không thả nữa",duoc:["không mất thêm gì"]})]})}
/* NPCs float lanterns too, by the same rule (seen by the Emperor when he walks there and they are in favour) */
function tsDenNpc(){const f=tsDenFest();if(!f)return;const s=tsS();const key=`${S.year}-${f.k}`;if(s.denN===key)return;s.denN=key;const E=S.emp;
 for(const v of liveRivals(true)){if(!roll(45))continue;v.duc=cl((v.duc||0)+1,0,100);if((E.mood||0)<=1&&(v.sung||0)>=20&&roll(30)){v.sung=cl(v.sung+3,0,100);if(knows(v))log(`Đêm ${f.name}, Hoàng thượng dừng chân ngắm đèn của ${v.name}.`)}}}

/* =============== Ý 2 · HỘI PHỐI ĐỒ THEO ĐỀ (tháng tư và tháng mười, báo đề trước một tháng) =============== */
/* D17 (owner 15/11 23:05Z/23:15Z): each đề has a luxury RANGE r (4 pieces, absolute; capped by her own allowance: jlux luxThemeRange) and its
   tags cover every wearable by colour / material / name (jlux luxThemeTags; the hand-picked ones stay). Score = theme hits + the outfit's
   Xa xỉ inside the range (below = quá giản dị, above = phô trương: Đức −1, above her allowance = vượt phẩm: Danh −3) — chasing the
   highest number no longer wins. An empty Cài tóc / Áo slot = what she wears now. */
const TS_THEME={thanh:{n:"Thanh nhã",d:"ngọc bích, lụa mềm, hương thanh",r:[40,100],tags:["tramngoc","vongngoc","luahang","huongtram","tuithom"]},
 phu:{n:"Phú quý",d:"vàng, gấm, trâm diêu",r:[130,230],tags:["boodieu","vongvang","gamto","gamvang","tramphuong","sonphan"]},
 huong:{n:"Hương sắc",d:"son phấn, túi thơm, lụa",r:[60,130],tags:["sonphan","tuithom","luahang","huongtram","tramngoc"]},
 xuan:{n:"Xuân sắc",d:"hoa đào, hoa mai, lụa hồng",r:[50,120],tags:["luahang","tuithom","sonphan"]},
 co:{n:"Cổ phong",d:"trâm gỗ, đồng, hoa văn mây hạc",r:[70,150],tags:["vongngoc","huongtram"]}};
try{if(typeof luxThemeTags==="function")luxThemeTags(TS_THEME)}catch(e){}
/* items added by modules loaded after jts (e.g. jkc's khuê các pieces) or at run time get their tags too: re-tag whenever the item list grew */
let tsTagN=0;function tsTagsFresh(){try{if(typeof luxThemeTags!=="function")return;const n=Object.keys(IT).length+(typeof WD_ITEMS==="object"?Object.keys(WD_ITEMS).length:0);if(n!==tsTagN){tsTagN=n;luxThemeTags(TS_THEME)}}catch(e){}}
if(typeof kidThemes==="function"){const kt0=kidThemes;kidThemes=function(){tsTagsFresh();return kt0.apply(this,arguments)};window.kidThemes=kidThemes}
const TS_SLOT=[["hair","Cài tóc",k=>IT[k]&&(itm(k).sl==="hair"||itm(k).wsl==="tram")],["wrist","Đeo tay",k=>IT[k]&&itm(k).sl==="wrist"],["ao","Áo",k=>IT[k]&&(itm(k).dr||itm(k).wsl==="y")&&k!=="y_tang"],["kem","Hương, phấn",k=>["sonphan","tuithom","huongtram"].includes(k)]];
function tsDressHost(){return queenP()&&queenP()!==S?queenP():null}
function tsLuxK(k){return typeof luxPiece==="function"?luxPiece(k):Math.round((IT[k]&&itm(k).pr||0)/5)}
/* an empty Cài tóc / Áo slot = what she wears now (j92 wardrobe) */
function tsDressFill(p,pickd){const P=Object.assign({},pickd);try{const w=wdOf(p);if(!P.hair&&w.tram&&IT[w.tram.k])P.hair=w.tram.k;if(!P.ao&&w.y&&IT[w.y.k]&&w.y.k!=="y_tang")P.ao=w.y.k}catch(e){}return P}
function tsDressPts(p,pickd,th){const T=TS_THEME[th]||TS_THEME.thanh,B=BAL.lux||{};const P=tsDressFill(p,pickd);let s=0,L=0;const vp=[];
 for(const [sl] of TS_SLOT){const k=P[sl];if(!k||!IT[k])continue;const it=itm(k);s+=T.tags.includes(k)?2:0;L+=tsLuxK(k);if(it.rk&&it.rk>rkOf(p)){s-=3;vp.push(it.n)}}
 const R=typeof luxThemeRange==="function"?luxThemeRange(p,T):{lo:T.r?T.r[0]:40,hi:T.r?T.r[1]:120,bud:999};let st="hop";
 if(L>R.bud){st="vuot";s+=B.ctOver!=null?B.ctOver:-2;vp.push(`bộ đồ Xa xỉ ${L}`)}
 else if(L>R.hi){st="photruong";s+=B.ctShow!=null?B.ctShow:1}
 else if(L<R.lo){st="giandi";s+=Math.max(B.ctPlainMin!=null?B.ctPlainMin:-1,(B.ctFit)-(B.ctPlainK)*(R.lo-L)/Math.max(1,R.lo))}
 else s+=B.ctFit;
 return{raw:cl(Math.round(10*s/11),0,10),vp,lux:L,st,lo:R.lo,hi:R.hi}}
function tsDressTotal(p,raw){return raw*4+Math.round(effSac(p)/5)+Math.round((p.tamco||0)/12)}
/* the best set from the pieces at hand (smart pick: NPC by Tâm cơ, a loyal maid) — small search, top pieces per slot by theme */
function tsDressBest(p,keys,th){const T=TS_THEME[th]||TS_THEME.thanh;const C=TS_SLOT.map(([sl,,fit])=>[sl,[...new Set(keys.filter(fit))].sort((a,b)=>(T.tags.includes(b)?1:0)-(T.tags.includes(a)?1:0)).slice(0,5)]);
 let best={},bv=-1;const go=(i,P)=>{if(i===C.length){const v=tsDressPts(p,P,th).raw;if(v>bv){bv=v;best=Object.assign({},P)}return}const [sl,L]=C[i];go(i+1,P);for(const k of L){P[sl]=k;go(i+1,P);delete P[sl]}};go(0,{});return best}
function tsNpcDress(p,th){const P={};const inv=(p.inv||[]).map(e=>e.k);const smart=roll(40+(p.tamco||0)/2);if(smart)return tsDressBest(p,inv,th);
 for(const [sl,,fit] of TS_SLOT){const c=inv.filter(fit);if(c.length)P[sl]=pick(c)}return P}
function tsDressAnnounce(){tsTagsFresh();const s=tsS();const th=pick(Object.keys(TS_THEME));s.dress={th,m:S.month%12+1,y:S.month===12?S.year+1:S.year};const T=TS_THEME[th];const H=tsDressHost();
 /* the Hoàng hậu announces it at the morning greeting: she sees her face (no named grey figure) */try{if(H&&typeof k61Meet==="function")k61Meet(H,"Buổi thỉnh an, ngươi được thấy người.")}catch(e){}
 const have=TS_SLOT.filter(([sl,,fit])=>S.inv.some(e=>fit(e.k)&&T.tags.includes(e.k))).length;
 tsPanel({t:"Hội phối đồ: báo đề",who:H?pv(H):pTH(),art:"img/ev-yen-tiec.webp",h:`<p>${H?`Hoàng hậu ${H.name}`:"Thái hậu"} truyền: trung tuần tháng sau mở hội phối đồ trong ngự hoa viên. Đề năm nay: <b>${T.n}</b> (${T.d}).</p>${tsRows([["Bốn chỗ","Cài tóc · Đeo tay · Áo · Hương, phấn","n"],["Ngươi có",`${have}/4 chỗ có đồ hợp đề`,have>=2?"g":"r"],["Xa xỉ",`đề ${T.n} chuộng cả bộ khoảng ${T.r?T.r[0]:40} đến ${T.r?T.r[1]:120}: thấp quá là quá giản dị, cao quá là phô trương`,"n"],["Lưu ý","quá phẩm vị của mình thì bị trừ nặng, dù hợp đề","n"]])}`,
  opts:tsBorrowOpts(th).concat([tsOpt({n:"Đã hiểu, sẽ chuẩn bị",duoc:["mua thêm đồ ở Nội vụ phủ hay mượn của người thân trước hội"]})])})}
function tsBorrowOpts(th){const T=TS_THEME[th];const s=tsS();if(s.borrow)return[];const F=liveRivals(true).filter(v=>aff(v,S)>=25&&v.inv&&v.inv.some(e=>T.tags.includes(e.k)&&!S.inv.some(x=>x.k===e.k)));
 return F.slice(0,2).map(v=>{const e=v.inv.find(e=>T.tags.includes(e.k)&&!S.inv.some(x=>x.k===e.k));return tsOpt({n:`Mượn ${itm(e.k).n} của ${v.name}`,need:[{t:`nàng thân với ngươi (${aff(v,S)}/25)`,ok:aff(v,S)>=25}],duoc:[`${itm(e.k).n} dùng cho hội, xong thì trả`],mat:[],kem:["thiện cảm -2 (nợ ân tình)","làm mất hay hỏng thì phải đền"],
  go:()=>{const i=v.inv.indexOf(e);if(i>=0)v.inv.splice(i,1);e.tsB=v.id;S.inv.push(e);/* the same piece moves (item ledger jil) */s.borrow=1;tsAff(v,-2);log(`Ngươi mượn ${itm(e.k).n} của ${v.name} để dự hội phối đồ.`)}})})}
function tsDressReturn(){const s=tsS();s.borrow=0;for(let i=S.inv.length-1;i>=0;i--){const e=S.inv[i];if(!e.tsB)continue;const v=RV(e.tsB),vk=e.tsB;S.inv.splice(i,1);delete e.tsB;if(v&&v.alive){v.inv.push(e);log(`Ngươi trả ${itm(e.k).n} cho ${v.name}.`)}else if(typeof ilGone==="function")ilGone(S,e,"dead",{own:vk})}}
function tsDressHold(){tsTagsFresh();const s=tsS();const D=s.dress;if(!D||D.m!==S.month||D.y!==S.year)return;s.dress=null;const th=D.th,T=TS_THEME[th];
 const C=liveRivals(true).filter(v=>!v.confined&&!v.out);const R=C.map(v=>{const P=tsNpcDress(v,th);const d=tsDressPts(v,P,th);return{p:v,raw:d.raw,vp:d.vp,lux:d.lux,st:d.st,score:tsDressTotal(v,d.raw)}});
 const finish=(mine)=>{const all=R.concat(mine?[mine]:[]).sort((a,b)=>b.score-a.score);all.forEach((x,i)=>x.place=i+1);const b=tsPre();const L=[];
  for(const x of all){if(x.vp.length)ap(x.p,{danh:-3});if(x.st==="photruong")ap(x.p,{duc:(BAL.lux&&BAL.lux.ctDuc)||-1});if(x.place===1){ap(x.p,{sung:3,danh:3});bestow(x.p,"contest")}else if(x.place<=3)ap(x.p,{danh:2})}
  if(mine){const x=mine;L.push(`Hội phối đồ (${T.n}): ngươi đứng thứ ${x.place}/${all.length}.`);if(x.lux!=null)L.push(`Bộ đồ Xa xỉ ${x.lux}: ${x.st==="hop"?`hợp đề ${T.n}`:x.st==="giandi"?"quá giản dị so với đề":x.st==="photruong"?`phô trương, người ta chê xa xỉ. Đức ${(BAL.lux&&BAL.lux.ctDuc)||-1}`:"quá phẩm vị của ngươi"}.`);
   if(x.vp.length)L.push(`${tsDressHost()?"Hoàng hậu":"Thái hậu"} nhắc: ${x.vp.join(", ")} vượt phẩm vị. Danh -3.`)}
  else L.push(`Hội phối đồ (${T.n}): ${all[0].p.name} đứng đầu.`);log(L.join(" "));tsDressReturn();
  const show=()=>{tsRes(`Hội phối đồ · ${T.n}`,b,mine?mine.place<=3:null);render()};
  if(mine&&typeof kitPodiumShow==="function"&&!tsBot()&&all.length>=2)kitPodiumShow(all.slice(0,Math.max(3,all.length)).map(x=>({who:x.p,score:x.score,place:x.place})),{title:`Hội phối đồ · ${T.n}`,sub:T.d,onNext:show});else show()};
 if(!tsOn()||S.out||S.confined||S.rank>=7){finish(null);return}
 tsPanel({t:`Hội phối đồ · ${T.n}`,art:S.month>=7?"img/ev-le-thu-3.webp":"img/ev-dieu-lanh.webp",who:tsDressHost()?pv(tsDressHost()):pTH(),h:`<p>Ngự hoa viên bày bình phong gấm. Lục cung lần lượt ra mắt theo đề <b>${T.n}</b> (${T.d}).</p>`,opts:[
  tsOpt({n:"Tự tay phối đồ",fx:{suc:-5},need:[tsNeedSuc(5)],duoc:["đứng đầu: Sủng +3, Danh +3, một món ban thưởng","vào ba người đầu: Danh +2"],mat:["đồ vượt phẩm vị: Danh -3",`bộ đồ quá đề (phô trương): Đức ${(BAL.lux&&BAL.lux.ctDuc)||-1}`],note:`tự phối đồ hoặc để cung nữ chọn giúp; đề chuộng Xa xỉ ${T.r?T.r[0]:40} đến ${T.r?T.r[1]:120}`,later:1,go:()=>tsDressGame(th,(P,sk)=>{const d=tsDressPts(S,P,th);finish({p:S,raw:d.raw,vp:d.vp,lux:d.lux,st:d.st,score:tsDressTotal(S,d.raw)})})}),
  tsOpt({n:"Cáo bệnh, không dự",mat:["Danh -1"],go:()=>{apply({danh:-1});finish(null)}})]})}
/* the dressing board: tap item tiles into four slots, then present; skip = her maid picks (by her loyalty) */
function tsDressGame(th,done){tsTagsFresh();const T=TS_THEME[th];const P={};const inv=S.inv.map((e,i)=>({e,i})).filter(({e})=>TS_SLOT.some(([,,fit])=>fit(e.k)));
 const maidPick=()=>{const good=roll(S.maid?S.maid.loyal:50);const keys=inv.map(x=>x.e.k);if(good)return tsDressBest(S,keys,th);const Q2={};for(const [sl,,fit] of TS_SLOT){const c=keys.filter(fit);if(c.length)Q2[sl]=pick(c)}return Q2};
 if(tsBot()||typeof kg82Open!=="function"){setTimeout(()=>done(maidPick(),true),0);return}
 const d=kg82Open({art:"Phối đồ",title:`Đề: ${T.n}`,how:`Chạm một món để xem, rồi "Đặt vào" chỗ của nó (hay "Bỏ ra"). Đề ${T.n}: ${T.d}. Xong thì chạm "Ra mắt".`});if(!d){done(maidPick(),true);return}const box=kg82Box();
 const grade=k=>typeof kmTierOf==="function"?kmTierOf(k):0;const src=k=>{try{const a=typeof itemArt==="function"?itemArt(k):null;if(a&&a.src)return a.src}catch(e){}return typeof kmItemImg==="function"?kmItemImg(k):""};
 let selI=null;const detHTML=()=>{const e=selI!=null?S.inv[selI]:null;if(!e||typeof kitItemDetail!=="function")return`<p class="past">Chạm một món để xem; đặt vào hay bỏ ra bằng nút dưới thông tin.</p>`;
  const s=TS_SLOT.find(([,,fit])=>fit(e.k));const on=s&&P[s[0]]===e.k;const hit=T.tags.includes(e.k);
  const b=on?pbtn(`data-tsact="off"`,"Bỏ ra",`thành: ô ${s[1]} để trống`,""):pbtn(`data-tsact="on"`,`Đặt vào ${s?s[1].toLowerCase():""}`,`thành: ${hit?`hợp đề ${T.n}`:`không hợp đề ${T.n}`}${P[s&&s[0]]?` · kèm: thay ${itm(P[s[0]]).n}`:""}`,"");
  return kitItemDetail({e},{cls:"kidet-strip",acts:[b],luxItem:true})};
 const paint=()=>{const dp=tsDressPts(S,P,th),pts=dp.raw;kg82Set("score",`${pts}/10`);kg82Set("round",`đã đặt ${Object.keys(P).filter(k=>P[k]).length}/4 · Xa xỉ ${dp.lux}`);kg82Set("time","không giới hạn");
  box.innerHTML=`<div class="ts-slots">${TS_SLOT.map(([sl,lab])=>`<div class="ts-slot"><small>${lab}</small>${P[sl]?kitItem({name:itm(P[sl]).n,src:src(P[sl]),grade:grade(P[sl]),size:"sm"}):kitItem({empty:true,name:"trống",size:"sm"})}</div>`).join("")}</div>`+
   `<div class="ts-items">${inv.length?inv.map(({e,i})=>{const on=Object.values(P).includes(e.k);return `<button type="button" class="ts-it${on?" ts-on":""}" aria-pressed="${on}" data-tsi="${i}">${kitItem({name:itm(e.k).n,src:src(e.k),grade:grade(e.k),size:"sm",sel:selI===i})}</button>`}).join(""):`<p class="past">Rương chưa có trang sức, vải vóc hay hương phấn nào.</p>`}</div>`+
   `<div class="ts-det">${detHTML()}</div>`+
   `<div class="kg82act"><button class="kbtn" id="tsdgo">Ra mắt</button><button class="kbtn alt" id="tsdskip">Bỏ qua<small>${S.maid?S.maid.name:"cung nữ"} chọn giúp (có hợp ý hay không tùy thiện cảm của ${S.maid?S.maid.name:"cung nữ"} với ngươi: ${word(S.maid?S.maid.loyal:50)})</small></button></div>`;
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
