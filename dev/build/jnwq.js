/* ================= jnwq: NO WORD GAMES, family C (owner 16/11 07:20Z + 07:25Z, s11, review/nw-quiz) =================
   The four vấn đáp / quiz kinds of the promotion exam (jexam EXK: le, tc, xa, thq) are now SKILL games of the same subject, winnable by what is SHOWN
   (same easy rules as mg-easy: Gợi ý button, first-time demo card, tier by level, wrong tries bounce back, quiet auto-hint when she stalls):
     le  Lễ nghi        → "lay"  Bày lễ: copy the model altar (drag each object to the place it has on the sample).
     tc  Trị cung       → "sort" Phân kho: drag every ware into the storeroom whose door shows the same kind of ware.
     xa  Xử án          → "clue" Khám vật chứng: tap the suspect whose robe + carried thing match the pictured evidence.
     thq Thái hậu hỏi   → "seat" Xếp chỗ ngồi yến: more jade pins = higher rank = nearer Thái hậu; drag each guest to the seat.
   No sentence is read or chosen anywhere; the pictures are the existing kit paintings (img/kit/mg-*.webp, nothing new is painted: art is paused).
   Engines follow the j82/j91 contract: eng(box, env{kind, lv 0–5, hud(o), end(raw0to10)}) -> stop(); KG82.peek() is the test oracle.
   Every number is read from BAL.nwq (jbal2). Difficulty tier: mgTierOf(env) (jmgt: KG82.tier set by mgSet, else kg82Tier(lv)) + BAL.nwq.shift.
   Pieces come from j82/j91 (kg82Canvas, kg82Bg, kg82Spr, k91Tile, k91DemoCard, k91Btns…): no CSS here, no private frame. */
const NWQ_BG={le:"huong",tc:"banh",xa:"doi",thq:"mua"};
const NWQ_SPR={le:["huong-censer","hoa-vase","nghiem-bowl","doden-lantern","mua-fan","ve-inkstone","mua-bell","banh-pot","tho-slip"],
 tc:["banh-gao","banh-botgao","banh-muoi","banh-duong","banh-hatthong","banh-sen","banh-sam","banh-thuoc","banh-kytu","banh-tao","banh-namtuyet","banh-nhan","huong-tram","huong-que","huong-dan","huong-bacha","huong-nhai","huong-hong","kim-spool","kim-knot","theu-peony","theu-crane","theu-cloud","theu-butterfly","banh-ga","banh-suon","banh-xuong","banh-caque","banh-cachua","banh-hanh","tho-slip"],
 xa:["ve-brush","ve-inkstone","mua-fan","mua-bell","nghiem-bowl","kim-spool","theu-peony","theu-crane","theu-cloud","theu-butterfly","tho-slip"],thq:["tho-slip"]};
(function(){const b0=kg82BgName;kg82BgName=function(kind){return NWQ_BG[kind]?b0(NWQ_BG[kind]):b0(kind)};
 if(typeof KG82_SPR!=="undefined")for(const k in NWQ_SPR)KG82_SPR[k]=NWQ_SPR[k]})();
function nwqTier(env){/* review/mg-train: the tier mgSet() set for this play (jexam: the exam stakes of the target rank), via jmgt mgTierOf */
 return cl((typeof mgTierOf==="function"?mgTierOf(env):kg82Tier(env.lv))+(BAL.nwq.shift||0),0,2)}
/* a painted sprite fitted inside a size×size box, centred at (x,y) */
function nwqFit(g,n,x,y,s,o){const r=kg82SprR(n);return kg82Spr(g,n,x,y,s/Math.max(1,r),null,o)}
const nwqKey=a=>"nwq-"+a;

/* =============== generic "drag every piece to its place" engine (lay · sort · seat) ===============
   cfg.build(r,tier,W,H) → P{items:[{x,y(centre),hx,hy(home),size,paint(g,it,cx,cy,s,st)}], slots:[{x,y,w,h,multi,ok(it),paint(g,s,st,now),ax,ay,aw,ah}], tipY}
   tier < BAL.nwq.free: a drop is checked at once (right = stays, wrong = bounces back with a soft tip, a little score);
   tier ≥ free: pieces can be placed freely and are judged on «Xong». Gợi ý glows the next piece and its place. */
function nwqPlace(box,env,cfg){const kind=env.kind,B=BAL.nwq,tier=nwqTier(env),imm=tier<B.free;const C=kg82Canvas(box,cfg.ratio,cfg.hMax),{g,W,H}=C;
 const NR=B.rounds[kind],LIM=B.lim[kind][tier]*1000,IDLE=imm&&B.idle[tier]?B.idle[tier]*1000:0;
 let r=-1,pts=0,tot=0,P=null,phase="",t0=0,tAct=0,drag=null,done=false;const pops=[];
 const hb=document.createElement("div");hb.className="kg82act";hb.innerHTML=NWB.btn("nwqhint","hint",{cls:"kgbtn",label:"Gợi ý: "+cfg.hintSub})+(imm?"":NWB.btn("nwqdone","check",{cls:"kgbtn",label:"Xong: chấm điểm"}));box.appendChild(hb);/* mg-noword-b: icon buttons, no word in play */
 cfg=Object.assign({wrong:()=>cfg.wrongT,hint:()=>cfg.hintT},cfg);
 const dm=k91DemoCard(box,nwqKey(kind),Object.assign({done:()=>{hb.hidden=false;t0=tAct=performance.now()}},cfg.demo));if(dm)hb.hidden=true;
 const slotOf=it=>it.slot>=0?P.slots[it.slot]:null;
 function relayout(s){const n=s.list.length;if(!n)return;if(!s.multi){const it=s.list[0];it.x=s.x;it.y=s.y;it.sc=s.sc||1;return}
  const cols=Math.max(1,Math.ceil(Math.sqrt(n*s.aw/s.ah))),rows=Math.ceil(n/cols),ms=Math.min(s.aw/cols,s.ah/rows,s.mini||99);
  s.list.forEach((it,i)=>{it.x=s.ax+((i%cols)+.5)*s.aw/cols;it.y=s.ay+(Math.floor(i/cols)+.5)*s.ah/rows;it.sc=Math.min(1,ms*.92/it.size)})}
 function unseat(it){const s=slotOf(it);if(s){s.list=s.list.filter(x=>x!==it);relayout(s)}it.slot=-1}
 function home(it,fly){if(fly)it.bk={x:it.x,y:it.y,a:performance.now()};unseat(it);it.x=it.hx;it.y=it.hy;it.sc=1}
 function seat(it,s){unseat(it);if(!s.multi)s.list.slice().forEach(o=>home(o,true));s.list.push(it);it.slot=P.slots.indexOf(s);relayout(s)}
 function next(){r++;if(r>=NR){done=true;return setTimeout(()=>env.end(10*pts/Math.max(1,tot)),300)}/* float: graded once by kg82 mgGrade */
  P=cfg.build(r,tier,W,H);P.miss=0;P.cost=0;P.glow=null;P.tip=null;P.say=null;P.items.forEach(it=>{it.x=it.hx;it.y=it.hy;it.slot=-1;it.locked=false;it.sc=1;it.res=null});P.slots.forEach(s=>{s.list=[]});
  phase="play";t0=tAct=performance.now();drag=null;const d=hb.querySelector("#nwqdone");if(d)d.disabled=false;hb.querySelector("#nwqhint").disabled=false}
 const itemAt=(x,y)=>{for(let i=P.items.length-1;i>=0;i--){const it=P.items[i];if(it.locked)continue;const h=it.size*it.sc/2+4;if(Math.abs(x-it.x)<=h&&Math.abs(y-it.y)<=h)return it}return null};
 const slotAtPt=(x,y)=>{let bi=-1,bd=1e9;P.slots.forEach((s,i)=>{const inside=Math.abs(x-s.x)<=s.w/2*1.12&&Math.abs(y-s.y)<=s.h/2*1.12;const d=inside?0:k91Dist(x,y,s.x,s.y)-Math.max(s.w,s.h)*.6;if(d<bd){bd=d;bi=i}});return bd<=0?bi:-1};
 const tip=(t,c)=>{P.tip={t,c:c||K91C.red(),until:performance.now()+2400}}/* huong-cue-2: guiding tip words back (short, <= BAL.mgFx.popMax) */;
 function drop(it,si){const s=P.slots[si];tAct=performance.now();
  if(imm){if(!s.ok(it)){P.miss++;P.glow=null;tip(cfg.wrong(it,s,P));kg82Pluck(0,false);home(it,true);return}
   if(!s.multi&&s.list.length){home(it,true);return}
   seat(it,s);it.locked=true;P.glow=null;kg82Pluck(si,true);if(P.items.every(i=>i.locked))setTimeout(()=>{if(phase==="play")judge()},420);return}
  seat(it,s);kg82Pluck(1,true)}
 function wrongOnes(){return P.items.filter(it=>!it.locked&&!(it.slot>=0&&P.slots[it.slot].ok(it)))}
 function hint(auto){if(phase!=="play"||(dm&&dm.on))return;const w=wrongOnes();if(!w.length)return;const it=w.find(i=>i.slot<0)||w[0];const si=P.slots.findIndex(s=>s.ok(it)&&(s.multi||imm||!s.list.length||s.list[0]===it));const now=performance.now();
  P.glow={it,si,until:now+(auto?5000:6500)};P.cost+=auto?B.auto:B.hint;tAct=now;if(P.peekAt!=null)P.peekAt=now;tip(cfg.hint(it,P.slots[si],P),K91C.gold())}
 hb.querySelector("#nwqhint").onclick=()=>hint(false);
 function judge(){phase="judge";let ok=0;P.items.forEach(it=>{const good=it.slot>=0&&P.slots[it.slot].ok(it);it.res=good?"ok":"bad";if(good)ok++});const n=P.items.length;pts+=Math.max(0,ok-P.miss*B.miss-P.cost)*(P.sp=mgPace(env,kind,performance.now()-t0,LIM));/* review/mg-tune: time part */tot+=n;P.glow=null;
  P.say=[ok===n?(P.miss||P.cost?cfg.fine:cfg.perfect):`Đúng ${ok}/${n}`,ok===n&&P.sp>=.995?K91C.good():K91C.gold()];hb.querySelector("#nwqhint").disabled=true;const d=hb.querySelector("#nwqdone");if(d)d.disabled=true;setTimeout(next,1800)}
 const dn=hb.querySelector("#nwqdone");if(dn)dn.onclick=()=>{if(phase==="play")judge()};
 const pos=(it,now)=>{if(!it.bk)return[it.x,it.y];const k=Math.min(1,(now-it.bk.a)/300),e=1-Math.pow(1-k,3);if(k>=1){delete it.bk;return[it.x,it.y]}return[it.bk.x+(it.x-it.bk.x)*e,it.bk.y+(it.y-it.bk.y)*e]};
 const stop=k91Loop(now=>{if(!P)return;kg82Bg(g,W,H,kind,cfg.veil,cfg.ay);
  if(dm&&dm.on){NWQ_LBL=true;try{dm.draw(g,W,H,now)}finally{NWQ_LBL=false}env.hud({score:"0/10",round:`Hồi 1/${NR}`,time:"–"});return}
  const left=LIM-(now-t0);if(phase==="play"){if(left<=0)judge();else if(IDLE&&now-tAct>IDLE&&wrongOnes().length&&!P.glow)hint(true)}
  if(P.glow&&now>P.glow.until)P.glow=null;if(P.tip&&now>P.tip.until)P.tip=null;
  P.draw(g,P,now,{tier,phase,W,H});
  P.slots.forEach(s=>s.paint(g,s,phase==="judge"?(s.multi||!s.list.length?"n":s.list[0].res):"n",now));
  const drawIt=(it,st)=>{const [x,y]=pos(it,now);it.paint(g,it,x,y,it.size*it.sc,st)};
  const stOf=it=>phase==="judge"?it.res:it.locked?"ok":"n";
  P.items.forEach(it=>{if(it!==drag)drawIt(it,stOf(it))});if(drag)drawIt(drag,"on");
  if(P.glow&&phase==="play"){const it=P.glow.it,s=P.slots[P.glow.si];const h=it.size*it.sc;k91Glow(g,it.x-h/2,it.y-h/2,h,h,now);if(s)k91Glow(g,s.x-s.w/2,s.y-s.h/2,s.w,s.h,now)}
  const ty=P.tipY*H;if(phase==="judge"&&P.say){g.fillStyle="rgba(255,250,236,.9)";g.fillRect(8,ty-17,W-16,24);k91Say(g,P.say[0],P.say[1],W/2,ty,W-24)}
  else if(P.tip){g.fillStyle="rgba(255,250,236,.9)";g.fillRect(8,ty-17,W-16,24);g.textAlign="center";g.textBaseline="alphabetic";g.font=k91F(700,Math.min(14,W/26),1);g.fillStyle=P.tip.c;kg82Lbl(g,P.tip.t,W/2,ty,W-24)}
  kg82DrawPops(g,pops,now);env.hud({score:mgLive(env,(()=>{const j=cl(r+(phase==="judge"?1:0),0,NR),pl=phase==="play"&&P&&j<NR?1:0,n=P?P.items.length:0,fut=(NR-j-pl)*n;return 10*(pts+(pl?Math.max(0,n-P.miss*B.miss-P.cost)*mgPace(env,kind,now-t0,LIM):0)+fut)/Math.max(1,tot+pl*n+fut)})()),round:`Hồi ${Math.min(r+1,NR)}/${NR}`,time:phase==="play"?`${Math.max(0,Math.ceil(left/1000))} giây`:"–"})});
 let dd=null;k91Pointer(C,{down:(x,y)=>{if(phase!=="play"||(dm&&dm.on))return;tAct=performance.now();const it=itemAt(x,y);if(!it)return;delete it.bk;if(it.slot>=0)unseat(it);dd={it,ox:x-it.x,oy:y-it.y};drag=it},
  move:(x,y)=>{if(!dd)return;dd.it.x=x-dd.ox;dd.it.y=y-dd.oy},
  up:(x,y)=>{if(!dd)return;const it=dd.it;dd=null;drag=null;if(phase!=="play"){home(it,false);return}const si=slotAtPt(it.x,it.y);if(si>=0)drop(it,si);else home(it,true)}});
 KG82.peek=()=>{if(phase!=="play"||!P||(dm&&dm.on)||drag)return null;const w=wrongOnes();
  if(!w.length)return imm?null:{sel:"#nwqdone"};const it=w.find(i=>i.slot<0&&!i.bk)||w.find(i=>!i.bk);if(!it||it.bk)return null;
  const si=P.slots.findIndex(s=>s.ok(it)&&(s.multi||imm||!s.list.length||s.list[0]===it));if(si<0)return null;const s=P.slots[si];
  const a=C.client(it.x,it.y),b=C.client(s.multi?s.ax+s.aw/2:s.x,s.multi?s.ay+s.ah/2:s.y);return{drag:[[a.x,a.y],[(a.x+b.x)/2,(a.y+b.y)/2],[b.x,b.y]],cands:P.slots.length/* review/mg-tune, bots: places to look through */}};
 next();return()=>{done=true;stop()}}

/* ---- shared paints ---- */
let NWQ_LBL=false;/* panel captions are drawn on the rules card only (mg-noword-b) */
function nwqPanel(g,x,y,w,h,label,fs){g.save();k91RR(g,x,y,w,h,10);g.fillStyle="rgba(255,250,236,.8)";g.fill();g.lineWidth=2;g.strokeStyle=K91C.hair;g.stroke();
 if(label){g.fillStyle="#5a3a0c";g.font=k91F(700,fs||11,1);g.textAlign="left";g.textBaseline="top";g.fillText(label,x+8,y+5)}g.restore()}
function nwqSlotRing(g,s,st){g.save();g.setLineDash(st==="n"?[5,4]:[]);g.lineWidth=st==="n"?1.6:3;g.strokeStyle=st==="ok"?K91C.good():st==="bad"?K91C.red():K91C.hair;k91RR(g,s.x-s.w/2,s.y-s.h/2,s.w,s.h,Math.min(s.w,s.h)*.2);g.fillStyle="rgba(255,250,236,.45)";g.fill();g.stroke();g.restore()}
function nwqSprItem(name){return(g,it,x,y,s,st)=>{g.save();if(st==="on"){g.shadowColor="#2a1a1288";g.shadowBlur=12;g.shadowOffsetY=4}
 if(!nwqFit(g,name,x,y,s)){g.fillStyle="#d9c08a";k91RR(g,x-s/2,y-s/2,s,s,6);g.fill()}g.restore();
 if(st==="ok"||st==="bad"){g.save();g.lineWidth=2.5;g.strokeStyle=st==="ok"?K91C.good():K91C.red();g.beginPath();g.arc(x+s*.36,y-s*.36,Math.max(5,s*.09),0,Math.PI*2);g.fillStyle=st==="ok"?K91C.good():K91C.red();g.fill();g.restore()}}}

/* =============== 1. LAY (Lễ nghi): the model altar is shown; drag every object to its place on the table =============== */
const NWQ_LE=["huong-censer","hoa-vase","nghiem-bowl","doden-lantern","mua-fan","ve-inkstone","mua-bell","banh-pot"];
const LEU=[];/* altar ids shown in this game */
const NWQ_LAY={3:[[.5,.28],[.24,.72],[.76,.72]],4:[[.24,.28],[.76,.28],[.24,.72],[.76,.72]],5:[[.17,.28],[.5,.22],[.83,.28],[.33,.74],[.67,.74]]};
function nwqLay(box,env){return nwqPlace(box,env,{ratio:1.25,hMax:560,veil:.18,ay:.85,hintSub:"chỉ chỗ đúng, bớt một ít phần",wrongT:"Chưa đúng chỗ, xem tờ mẫu.",hintT:"Vật sáng đặt vào chỗ sáng.",perfect:"Bàn lễ đúng mẫu!",fine:"Bàn lễ xong!",
 demo:{title:"CÁCH CHƠI: BÀY LỄ",lines:["Tờ mẫu ở trên cho thấy mỗi vật đặt ở đâu trên bàn lễ.","Kéo từng vật ở khay dưới đến đúng chỗ của nó trên bàn.","Đặt sai thì vật tự quay về khay. Chưa rõ thì chạm Gợi ý, chỉ tốn một ít phần."],
  art:(g,W,H,now)=>{const cx=W/2;nwqPanel(g,cx-92,42,184,58,"MẪU",10);const m=[[cx-48,74],[cx+48,74]],nm=["huong-censer","hoa-vase"];m.forEach(([x,y],i)=>nwqFit(g,nm[i],x,y,34));
   nwqPanel(g,cx-92,110,184,58,"BÀN LỄ",10);const sx=[cx-48,cx+48],sy=142;sx.forEach(x=>{nwqSlotRing(g,{x,y:sy,w:40,h:40},"n")});
   const k=(now%3200)/3200,e=k<.25?0:k<.65?(k-.25)/.4:1,hx=cx,hy=196,tx=hx+(sx[1]-hx)*e,ty=hy+(sy-hy)*e;nwqFit(g,"hoa-vase",tx,ty,36);nwqFit(g,"huong-censer",sx[0],sy,34,{alpha:.9});return 236}},
 build(r,tier,W,H0){if(!r)LEU.length=0;const B=BAL.nwq,N=B.n.le[tier],IT=typeof mgpOne==="function"?mgpOne("le",LEU,x=>x.n===N):null,L=IT?IT.lay:NWQ_LAY[N],objs=IT?IT.objs.slice():kg82Shuf(NWQ_LE).slice(0,N);/* ORDER THIN P1: one composed altar (object set × table layout), drawn through the no-repeat memory */
  const H=H0*Math.min(1,Math.max(.7,((typeof innerHeight==='number'?innerHeight:800)-185)/H0));/* short landscape: keep tray + altar above the sticky hint bar */
  const mx=W*.18,mw=W*.64,my=H*.03,mh=H*.29,ax=W*.05,aw=W*.9,ay=H*.36,ah=H*.4;const mS=Math.min(mh*.44,mw/(N>3?3.1:2.7)),aS=Math.min(ah*.44,aw/(N>3?3.7:3));
  const slots=L.map((p,j)=>({x:ax+p[0]*aw,y:ay+p[1]*ah,w:aS*1.1,h:aS*1.1,ok:it=>it.k===j,paint:(g,s,st)=>nwqSlotRing(g,s,st)}));
  const order=kg82Shuf([...Array(N).keys()]),ts=Math.min(H*.17,(W-12)/N*.86);
  const items=order.map((j,i)=>({k:j,size:aS,hx:(W-12)/N*(i+.5)+6,hy:H*.89,paint:nwqSprItem(objs[j])}));
  const P={items,slots,tipY:.355,peekAt:performance.now()};
  P.draw=(g,P,now,o)=>{g.save();g.fillStyle="rgba(255,250,236,.55)";g.fillRect(0,H*.8,W,H*.2);g.restore();
   const show=o.tier<BAL.nwq.free||now<P.peekAt+BAL.nwq.peek*1000;nwqPanel(g,mx,my,mw,mh,show?"MẪU BÀY":"MẪU ĐÃ KHUẤT · CHẠM GỢI Ý ĐỂ XEM LẠI",10);
   if(show)L.forEach((p,j)=>{const x=mx+p[0]*mw,y=my+mh*.12+p[1]*mh*.78;nwqFit(g,objs[j],x,y,mS)});
   nwqPanel(g,ax,ay,aw,ah,"BÀN LỄ CỦA NGƯƠI",10)};
  /* the slots/items paint after P.draw, so the altar panel is drawn first; tray items sit on the wash */
  return P}})}

/* =============== 2. SORT (Trị cung): drag every ware into the storeroom whose door shows the same kind of ware =============== */
const NWQ_CAT={luong:{n:"Kho lương",s:["banh-gao","banh-botgao","banh-muoi","banh-duong","banh-hatthong","banh-sen"]},
 thuoc:{n:"Kho thuốc",s:["banh-sam","banh-thuoc","banh-kytu","banh-tao","banh-namtuyet","banh-nhan"]},
 huong:{n:"Kho hương",s:["huong-tram","huong-que","huong-dan","huong-bacha","huong-nhai","huong-hong"]},
 chi:{n:"Kho chỉ lụa",s:["kim-spool","kim-knot","theu-peony","theu-crane","theu-cloud","theu-butterfly"]},
 tuoi:{n:"Kho thịt cá rau",s:["banh-ga","banh-suon","banh-xuong","banh-caque","banh-cachua","banh-hanh"]}};
const NWQ_SPLIT={5:[2,2,1],6:[2,2,2],7:[3,2,2],8:[3,3,2]};
function nwqSort(box,env){return nwqPlace(box,env,{ratio:1.12,hMax:540,veil:.2,ay:.9,hintSub:"chỉ kho đúng, bớt một ít phần",wrongT:"Chưa đúng loại, xem hàng mẫu.",hintT:"Món sáng cất vào kho sáng.",perfect:"Vào kho đủ cả!",fine:"Vào kho xong!",
 demo:{title:"CÁCH CHƠI: PHÂN KHO",lines:["Mỗi cửa kho có hàng mẫu và tên kho. Hàng cùng loại với mẫu thì cất vào kho ấy.","Kéo từng món ở dưới vào cửa kho đúng loại.","Cất sai thì món tự quay về. Chưa rõ thì chạm Gợi ý, chỉ tốn một ít phần."],
  art:(g,W,H,now)=>{const cx=W/2;nwqPanel(g,cx-100,42,96,76,"Kho lương",10);nwqPanel(g,cx+4,42,96,76,"Kho hương",10);nwqFit(g,"banh-gao",cx-52,86,40);nwqFit(g,"huong-tram",cx+52,86,40);
   const k=(now%3200)/3200,e=k<.25?0:k<.65?(k-.25)/.4:1,hx=cx-52,hy=170,tx=hx+(cx-52-hx)*e,ty=hy+(98-hy)*e;nwqFit(g,"banh-muoi",tx,ty,34);return 196}},
 build(r,tier,W,H){const B=BAL.nwq,N=B.n.tc[tier],keys=kg82Shuf(Object.keys(NWQ_CAT)).slice(0,3),cnt=kg82Shuf((NWQ_SPLIT[N]||NWQ_SPLIT[6]).slice());
  const rw=(W-16)/3,ry=H*.03,rh=H*.42,NS=tier===0?2:1;const items=[];const roomsKit=keys.map((k,i)=>{const pool=kg82Shuf(NWQ_CAT[k].s);const samp=pool.slice(0,NS),mine=pool.slice(NS,NS+cnt[i]);mine.forEach(n=>items.push({k:i,size:0,nm:n}));return{k,samp}});
  const per=Math.min(items.length,Math.max(3,Math.floor((W-12)/(Math.min(H*.17,(W-12)/4*.92)+4)))),ts=Math.min(H*.17,(W-12)/Math.min(per,4)*.92);const rowsT=Math.ceil(items.length/per),sh=kg82Shuf(items);
  sh.forEach((it,i)=>{const row=Math.floor(i/per),col=i%per,n=Math.min(per,sh.length-row*per);it.size=ts;it.hx=(W-n*(ts+6)+6)/2+col*(ts+6)+ts/2;it.hy=H*.585+row*(ts+8)+ts/2;it.paint=nwqSprItem(it.nm)});
  const slots=roomsKit.map((rm,i)=>{const x=8+rw*i,w=rw-8;return{x:x+w/2,y:ry+rh/2,w,h:rh,multi:true,ax:x+6,ay:ry+rh*.52,aw:w-12,ah:rh*.44,mini:ts*.6,ok:it=>it.k===i,room:rm,
   paint:(g,s,st)=>{g.save();k91RR(g,s.x-s.w/2,s.y-s.h/2,s.w,s.h,10);g.fillStyle="rgba(255,250,236,.78)";g.fill();g.lineWidth=2;g.strokeStyle=K91C.hair;g.stroke();g.restore();
    const ss=Math.min(s.h*.3,s.w*(NS===2?.4:.5));rm.samp.forEach((n,j)=>nwqFit(g,n,s.x+(rm.samp.length===1?0:(j-.5)*ss*1.05),s.y-s.h/2+s.h*.1+ss*.5+(tier<2?s.h*.07:0),ss));
        g.save();g.setLineDash([4,4]);g.strokeStyle="#b8935588";g.lineWidth=1.2;k91RR(g,s.ax,s.ay,s.aw,s.ah,6);g.stroke();g.restore()}}});
  const P={items,slots,tipY:.5};P.draw=(g,P,now,o)=>{g.save();g.fillStyle="rgba(255,250,236,.5)";g.fillRect(0,H*.54,W,H*.46);g.restore()};return P}})}

/* =============== 3. SEAT (Thái hậu hỏi): more jade pins = higher rank = nearer Thái hậu; drag each guest to a seat =============== */
function nwqPins(g,x,y,w,h,n,st){const per=n>4?Math.ceil(n/2):n,rows=n>4?2:1,pr=Math.min(h*.11,w/(per*2.6));
 for(let i=0;i<n;i++){const row=Math.floor(i/per),inRow=Math.min(per,n-row*per),col=i%per;const cx=x+w/2+(col-(inRow-1)/2)*pr*2.5,cy=y+h*(rows>1?.3+row*.24:.38);
  g.save();g.fillStyle=st==="bad"?"#b0463a":"#c9a03a";g.strokeStyle="#6e4d0e";g.lineWidth=1.2;g.beginPath();g.arc(cx,cy,pr,0,Math.PI*2);g.fill();g.stroke();g.fillStyle="#fff3c2";g.beginPath();g.arc(cx-pr*.28,cy-pr*.28,pr*.3,0,Math.PI*2);g.fill();g.restore()}}
function nwqSeat(box,env){return nwqPlace(box,env,{ratio:1.0,hMax:480,veil:.2,ay:.8,hintSub:"chỉ ghế đúng, bớt một ít phần",wrongT:"Chưa hợp phẩm: nhiều ngọc ghim ngồi gần hơn.",hintT:"Người sáng ngồi ghế sáng.",perfect:"Xếp chỗ đúng lễ!",fine:"Xếp chỗ xong!",
 demo:{title:"CÁCH CHƠI: XẾP CHỖ NGỒI YẾN",lines:["Thái hậu ngồi bên trái. Người nhiều ngọc ghim là phẩm cao, ngồi gần Thái hậu nhất.","Kéo từng người ở dưới vào ghế. Hai người ngang phẩm thì người phong trước (năm nhỏ hơn) ngồi trước.","Xếp sai thì người tự quay về. Chưa rõ thì chạm Gợi ý, chỉ tốn một ít phần."],
  art:(g,W,H,now)=>{const cx=W/2,tw=50,th=42;nwqPanel(g,cx-118,40,236,70,null);g.fillStyle="#5a3a0c";g.font=k91F(700,10,1);g.textAlign="left";g.fillText("Thái hậu",cx-110,56);
   [[cx-40,3],[cx+22,1]].forEach(([x,n])=>{k91Tile(g,x,60,tw,th,"","n",12,"tho-slip");nwqPins(g,x,60,tw,th,n,"n")});
   const k=(now%3200)/3200,e=k<.25?0:k<.65?(k-.25)/.4:1,hx=cx-tw/2,hy=140,tx=hx+(cx-40-hx)*e,ty=hy+(60-hy)*e;k91Tile(g,tx,ty,tw,th,"","on",12,"tho-slip");nwqPins(g,tx,ty,tw,th,3,"n");return 196}},
 build(r,tier,W,H){const B=BAL.nwq,N=B.n.thq[tier];let stars,year;
  if(tier<B.free){stars=kg82Shuf([1,2,3,4,5,6,7]).slice(0,N);year=stars.map(()=>0)}
  else{stars=[];while(stars.length<N)stars.push(1+Math.floor(Math.random()*5));year=kg82Shuf([1,2,3,4,5,6,7,8]).slice(0,N);}
  const guests=stars.map((s,i)=>({s,yr:year[i]})),ord=guests.slice().sort((a,b)=>b.s-a.s||a.yr-b.yr);/* yr, never y: the engine moves every item by it.x / it.y (pixels) — the old q.y made the label read «phong năm 209.8» */guests.forEach(q=>q.k=ord.indexOf(q));
  const cw=Math.min(W*.17,78),sw=Math.min((W-16-cw-6)/N,110),sh=Math.min(H*.25,sw*1.05),sy=H*.44,tw=sw*.92,th=sh*.92;
  const slots=ord.map((q,j)=>({x:8+cw+6+sw*(j+.5),y:sy,w:sw-4,h:sh,ok:it=>it.k===j,paint:(g,s,st)=>{nwqSlotRing(g,s,st);if(tier<B.free){g.fillStyle="#8a7350";g.font=k91F(700,12,1);g.textAlign="center";g.textBaseline="alphabetic";g.fillText(String(j+1),s.x,s.y+s.h/2+14)}}}));
  const items=kg82Shuf(guests).map((q,i,a)=>{q.size=tw;q.hx=(W-12)/N*(i+.5)+6;q.hy=H*.82;q.paint=(g,it,x,y,s,st)=>{const w=s,h=s*th/tw;g.save();if(st==="on"){g.shadowColor="#2a1a1288";g.shadowBlur=12;g.shadowOffsetY=4}k91Tile(g,x-w/2,y-h/2,w,h,"",st==="ok"||st==="bad"?st:st==="on"?"on":"n",12,"tho-slip");g.restore();
    nwqPins(g,x-w/2,y-h/2,w,h*(tier>=B.free?.82:1),it.s,st);if(tier>=B.free){g.fillStyle=K91C.ink;g.font=k91F(700,Math.max(9,w*.17),1);g.textAlign="center";g.textBaseline="alphabetic";g.fillText(`◷ ${it.yr}`,x,y+h*.4)}};return q});
  const P={items,slots,tipY:.275};P.draw=(g,P,now,o)=>{g.save();g.fillStyle="rgba(255,250,236,.5)";g.fillRect(0,H*.68,W,H*.32);g.restore();
   const cy=sy-sh/2-2;k91Tile(g,8,sy-sh/2,cw,sh,"","n",12,"tho-slip");g.fillStyle=K91C.ink;g.font=k91F(700,Math.min(13,cw/5.5),1);g.textAlign="center";g.textBaseline="middle";g.fillText("Thái",8+cw/2,sy-8);g.fillText("hậu",8+cw/2,sy+10);
   g.textBaseline="alphabetic";g.fillStyle="#5a3a0c";g.font=k91F(700,Math.min(12,W/30),1);kg82Lbl(g,"GẦN THÁI HẬU · PHẨM CAO  →  XA · PHẨM THẤP",W/2,H*.16,W-16);
   g.strokeStyle=K91C.gold();g.lineWidth=2;g.beginPath();g.moveTo(8+cw+10,H*.2);g.lineTo(W-14,H*.2);g.stroke();g.beginPath();g.moveTo(W-14,H*.2);g.lineTo(W-22,H*.2-5);g.moveTo(W-14,H*.2);g.lineTo(W-22,H*.2+5);g.stroke()};return P}})}

/* =============== 4. CLUE (Xử án): tap the suspect whose robe and carried thing match the pictured evidence =============== */
const NWQ_COL=[["đỏ","#b8322a"],["lam","#2f5d8a"],["lục","#3f8a5a"],["vàng","#c9a03a"],["hồng","#d98aa4"],["ngà","#efe6d0"]];
const NWQ_THG=[["ve-brush","bút"],["ve-inkstone","nghiên"],["mua-fan","quạt"],["mua-bell","chuông"],["nghiem-bowl","chén"],["kim-spool","cuộn chỉ"]];
const NWQ_EMB=["theu-peony","theu-crane","theu-cloud","theu-butterfly"];
const NWQ_CASE=["Vụ mất trâm ngọc","Vụ hỏng tấm lụa","Vụ đổ mực trên thư","Vụ vỡ bình quý","Vụ mất thuốc quý"];
function nwqRobe(g,x,y,w,h,col,emb){const cx=x+w/2,hr=h*.12;g.save();
 g.fillStyle=col;g.strokeStyle="#00000033";g.lineWidth=1.2;g.beginPath();g.moveTo(cx-w*.17,y+h*.3);g.lineTo(cx+w*.17,y+h*.3);g.lineTo(cx+w*.31,y+h*.97);g.lineTo(cx-w*.31,y+h*.97);g.closePath();g.fill();g.stroke();
 g.beginPath();g.ellipse(cx-w*.27,y+h*.55,w*.08,h*.2,.35,0,Math.PI*2);g.fill();g.stroke();g.beginPath();g.ellipse(cx+w*.27,y+h*.55,w*.08,h*.2,-.35,0,Math.PI*2);g.fill();g.stroke();
 g.fillStyle="#f6eedc";g.beginPath();g.moveTo(cx-w*.08,y+h*.3);g.lineTo(cx,y+h*.46);g.lineTo(cx+w*.08,y+h*.3);g.closePath();g.fill();
 g.fillStyle="#f2dcc4";g.strokeStyle="#00000033";g.beginPath();g.arc(cx,y+h*.2,hr,0,Math.PI*2);g.fill();g.stroke();g.fillStyle="#2a1a12";g.beginPath();g.arc(cx,y+h*.2,hr*1.05,Math.PI,Math.PI*2);g.fill();
 if(emb)nwqFit(g,emb,cx,y+h*.68,w*.26);g.restore()}
function nwqScrap(g,cx,cy,s,col,emb){g.save();g.translate(cx,cy);g.fillStyle=col;g.strokeStyle="#00000044";g.lineWidth=1.2;g.beginPath();const p=[[-.5,-.4],[-.18,-.5],[.1,-.38],[.5,-.5],[.42,-.05],[.52,.4],[.12,.5],[-.12,.36],[-.5,.46],[-.4,0]];p.forEach(([a,b],i)=>i?g.lineTo(a*s,b*s):g.moveTo(a*s,b*s));g.closePath();g.fill();g.stroke();
 g.globalAlpha=.2;g.strokeStyle="#fff";g.lineWidth=1;for(let i=-3;i<=3;i++){g.beginPath();g.moveTo(-s*.5,i*s*.12);g.lineTo(s*.5,i*s*.12);g.stroke()}g.globalAlpha=1;if(emb)nwqFit(g,emb,0,0,s*.55);g.restore()}
function nwqClue(box,env){const B=BAL.nwq,tier=nwqTier(env),C=kg82Canvas(box,1.2,540),{g,W,H}=C;const NS=B.n.xa[tier],NC=B.clues[tier],NR=B.rounds.xa,LIM=B.lim.xa[tier]*1000,IDLE=B.idle[tier]?B.idle[tier]*1000:0;
 let r=-1,pts=0,P=null,phase="",t0=0,tAct=0,done=false;const pops=[];
 const hb=document.createElement("div");hb.className="kg82act";hb.innerHTML=NWB.btn("nwqhint","hint",{cls:"kgbtn",label:"Gợi ý: gạch một người không khớp"});box.appendChild(hb);
 const dm=k91DemoCard(box,nwqKey("xa"),{title:"CÁCH CHƠI: KHÁM VẬT CHỨNG",done:()=>{hb.hidden=false;t0=tAct=performance.now()},
  lines:["Vụ án có vật chứng bày ở trên: mảnh áo, đồ rơi lại. Mỗi người bị nghi mặc áo nào, mang theo thứ gì thì hiện ở dưới.","Chạm vào người có áo và vật mang theo khớp cả hai vật chứng.","Chọn sai thì người ấy bị gạch, mất một ít phần. Chưa rõ thì chạm Gợi ý."],
  art:(g,W,H,now)=>{const cx=W/2;nwqScrap(g,cx-46,76,44,NWQ_COL[0][1]);nwqFit(g,"ve-brush",cx+46,76,44);const on=Math.floor(now/900)%2;
   [[cx-60,0],[cx+60,1]].forEach(([x,j])=>{nwqRobe(g,x-30,112,60,66,NWQ_COL[j===0?0:1][1]);nwqFit(g,j===0?"ve-brush":"mua-fan",x+22,150,28)});
   if(on){g.save();g.strokeStyle=K91C.good();g.lineWidth=3;k91RR(g,cx-92,106,64,76,8);g.stroke();g.restore()}return 204}});
 if(dm)hb.hidden=true;
 function next(){r++;if(r>=NR){done=true;return setTimeout(()=>env.end(cl(pts,0,10)),300)}
  const cols=kg82Shuf(NWQ_COL),thg=kg82Shuf(NWQ_THG),emb=kg82Shuf(NWQ_EMB);const att=["c","t","e"].slice(0,NC);
  const cul={c:cols[0],t:thg[0],e:emb[0]};const S=[{cul:true,c:cols[0],t:thg[0],e:emb[0]}];
  for(let i=1;i<NS;i++){const m=Math.floor(Math.random()*(NC));const keep=kg82Shuf(att).slice(0,Math.min(m,NC-1));const q={cul:false};
   q.c=keep.includes("c")?cul.c:cols.filter(x=>x!==cul.c)[Math.floor(Math.random()*(cols.length-1))];q.t=keep.includes("t")?cul.t:thg.filter(x=>x!==cul.t)[Math.floor(Math.random()*(thg.length-1))];q.e=keep.includes("e")?cul.e:emb.filter(x=>x!==cul.e)[Math.floor(Math.random()*(emb.length-1))];S.push(q)}
  const L=kg82Shuf(S);const cs=NS<=3?NS:Math.min(NS,Math.max(2,Math.floor((W-8)/104)));const rows=Math.ceil(NS/cs),cw=(W-12)/cs-6,top=H*.4,ch=Math.min((H*.58-4)/rows-6,cw*1.12);
  L.forEach((q,i)=>{const row=Math.floor(i/cs),col=i%cs,n=Math.min(cs,L.length-row*cs);q.x=(W-n*(cw+6)+6)/2+col*(cw+6);q.y=top+row*(ch+6);q.w=cw;q.h=ch;q.gone=false;q.res=null});
  P={S:L,att,cul,cost:0,miss:0,glow:null,tip:null,say:null,title:NWQ_CASE[r%NWQ_CASE.length],cw,ch};phase="play";t0=tAct=performance.now();hb.querySelector("#nwqhint").disabled=false}
 const live=()=>P.S.filter(q=>!q.gone);
 function hint(auto){if(phase!=="play"||(dm&&dm.on))return;const w=live().filter(q=>!q.cul);if(!w.length)return;const q=w[Math.floor(Math.random()*w.length)];q.gone=true;P.cost+=auto?B.auto:B.hint;tAct=performance.now();
  P.tip={t:auto?"Ma ma nhắc: chưa khớp.":"Người này chưa khớp, bỏ đi.",c:K91C.gold(),until:performance.now()+2600};if(!live().filter(q=>!q.cul).length)hb.querySelector("#nwqhint").disabled=true}
 hb.querySelector("#nwqhint").onclick=()=>hint(false);
 function end(ok){phase="judge";P.S.forEach(q=>{q.res=q.cul?"ok":q.res});if(ok)pts+=Math.max(B.xaFloor,2-P.cost-P.miss*B.xaMiss)*(P.sp=mgPace(env,"xa",performance.now()-t0,LIM));/* review/mg-tune: time part */
  P.say=[ok?(P.miss||P.cost?"Đúng người rồi!":"Khớp vật chứng, đúng người!"):"Hết giờ: người khớp đã hiện",ok?(P.sp<.995?K91C.gold():K91C.good()):K91C.red()];hb.querySelector("#nwqhint").disabled=true;setTimeout(next,1700)}
 function accuse(q){if(phase!=="play"||q.gone)return;tAct=performance.now();if(q.cul){kg82Pluck(3,true);end(true)}else{q.gone=true;q.res="bad";P.miss++;kg82Pluck(0,false);P.tip={t:"Chưa khớp, thử người khác.",c:K91C.red(),until:performance.now()+2200};if(live().length<=1&&live()[0]&&live()[0].cul){P.tip={t:"Chỉ còn một người, chạm người ấy.",c:K91C.gold(),until:performance.now()+2600}}}}
 const lab=(c)=>c[0],thN=t=>t[1];
 const stop=k91Loop(now=>{if(!P)return;kg82Bg(g,W,H,"xa",.22,.85);if(dm&&dm.on){NWQ_LBL=true;try{dm.draw(g,W,H,now)}finally{NWQ_LBL=false}env.hud({score:"0/10",round:`Hồi 1/${NR}`,time:"–"});return}
  const left=LIM-(now-t0);if(phase==="play"){if(left<=0)end(false);else if(IDLE&&now-tAct>IDLE&&live().filter(q=>!q.cul).length>1)hint(true)}
  if(P.tip&&now>P.tip.until)P.tip=null;
  nwqPanel(g,6,H*.02,W-12,H*.3,P.title.toUpperCase()+" · VẬT CHỨNG",11);
  const ey=H*.02+H*.3*.46,es=Math.min(H*.13,(W-40)/(NC*1.5));const cx0=W/2-(NC-1)*es*.85;
  P.att.forEach((a,i)=>{const x=cx0+i*es*1.7;if(a==="c"){nwqScrap(g,x,ey,es,P.cul.c[1],null);if(tier===0){g.fillStyle=K91C.ink;g.font=k91F(700,11,1);g.textAlign="center";g.textBaseline="alphabetic";kg82Lbl(g,"mảnh áo "+lab(P.cul.c),x,ey+es*.78,es*1.6)}}
   else if(a==="t"){nwqFit(g,P.cul.t[0],x,ey,es);if(tier===0){g.fillStyle=K91C.ink;g.font=k91F(700,11,1);g.textAlign="center";g.textBaseline="alphabetic";kg82Lbl(g,"đồ rơi: "+thN(P.cul.t),x,ey+es*.78,es*1.6)}}
   else{g.save();g.fillStyle="#f6eedc";g.strokeStyle=K91C.hair;g.lineWidth=2;g.beginPath();g.arc(x,ey,es*.5,0,Math.PI*2);g.fill();g.stroke();g.restore();nwqFit(g,P.cul.e,x,ey,es*.8)}});
  g.fillStyle="#5a3a0c";g.font=k91F(700,Math.min(12,W/30),1);g.textAlign="center";g.textBaseline="alphabetic";kg82Lbl(g,"AI MẶC ÁO VÀ MANG VẬT KHỚP VẬT CHỨNG?",W/2,H*.37,W-16);
    P.S.forEach(q=>{g.save();k91RR(g,q.x,q.y,q.w,q.h,10);g.fillStyle="rgba(255,250,236,.82)";g.fill();g.lineWidth=q.res==="ok"?3.5:2;g.strokeStyle=q.res==="ok"?K91C.good():q.res==="bad"?K91C.red():K91C.hair;g.stroke();g.restore();
   g.save();if(q.gone)g.globalAlpha=.4;nwqRobe(g,q.x+q.w*.02,q.y+q.h*.04,q.w*.62,q.h*.84,q.c[1],P.att.includes("e")?q.e:null);nwqFit(g,q.t[0],q.x+q.w*.78,q.y+q.h*.52,q.w*.36);
   if(tier===0){g.fillStyle=K91C.ink;g.font=k91F(700,Math.min(11,q.w/9),1);g.textAlign="center";g.textBaseline="alphabetic";g.fillText(`áo ${lab(q.c)} · ${thN(q.t)}`,q.x+q.w/2,q.y+q.h-5)}g.restore();
   if(q.gone&&q.res!=="ok"){g.save();g.strokeStyle=K91C.red();g.lineWidth=4;g.beginPath();g.moveTo(q.x+q.w*.18,q.y+q.h*.2);g.lineTo(q.x+q.w*.82,q.y+q.h*.8);g.moveTo(q.x+q.w*.82,q.y+q.h*.2);g.lineTo(q.x+q.w*.18,q.y+q.h*.8);g.stroke();g.restore()}});
  const ty=H*.355-1;
  if(phase==="judge"&&P.say){g.fillStyle="rgba(255,250,236,.92)";g.fillRect(8,H*.36-3,W-16,26);k91Say(g,P.say[0],P.say[1],W/2,H*.36+15,W-24)}
  else if(P.tip){g.fillStyle="rgba(255,250,236,.92)";g.fillRect(8,H*.36-3,W-16,26);g.textAlign="center";g.textBaseline="alphabetic";g.font=k91F(700,Math.min(13,W/26),1);g.fillStyle=P.tip.c;kg82Lbl(g,P.tip.t,W/2,H*.36+15,W-24)}
  kg82DrawPops(g,pops,now);env.hud({score:mgLive(env,(()=>{const j=cl(r+(phase==="judge"?1:0),0,NR),pl=phase==="play"&&P&&j<NR?1:0;return cl(pts+(pl?Math.max(B.xaFloor,2-P.cost-P.miss*B.xaMiss)*mgPace(env,"xa",now-t0,LIM):0)+10*(NR-j-pl)/NR,0,10)})()),round:`Vụ ${Math.min(r+1,NR)}/${NR}`,time:phase==="play"?`${Math.max(0,Math.ceil(left/1000))} giây`:"–"})});
 k91Pointer(C,{down:(x,y)=>{if(phase!=="play"||(dm&&dm.on))return;const q=P.S.find(q=>x>=q.x&&x<=q.x+q.w&&y>=q.y&&y<=q.y+q.h);if(q)accuse(q)}});
 KG82.peek=()=>{if(phase!=="play"||!P||(dm&&dm.on))return null;const q=P.S.find(q=>q.cul);const c=C.client(q.x+q.w/2,q.y+q.h/2);return{x:c.x,y:c.y,cands:live().length*P.att.length/* review/mg-tune, bots: suspects × clues to compare */}};
 next();return()=>{done=true;stop()}}
Object.assign(KG82_ENG,{lay:nwqLay,sort:nwqSort,seat:nwqSeat,clue:nwqClue});
window.NWQ={tier:nwqTier,engines:["lay","sort","seat","clue"],kinds:["le","tc","xa","thq"]};
/* the old Tài nghệ lesson «Y thuật & điều hương» (j5 MG.y, a quiz over YQ) now plays the pha-hương skill game (j91 blend), like Thêu and Nấu nướng before it */
try{if(typeof KG82_MGL!=="undefined")KG82_MGL.y=["Y thuật & điều hương: pha hương","huong"]}catch(e){}
