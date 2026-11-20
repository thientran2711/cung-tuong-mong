/* ===== mg-craft-ve · Vẽ «Thủy mặc: bố cục, năm sắc mực» (design dev/design/MG_CRAFTS.md §2; owner OD 20/11 ~08:15Z real: each art its OWN mechanic, no tracing)
   KG82 contract: eng(box, env{kind, lv, hud, end(raw0to10)}) → stop; KG82.peek = the test oracle (KG82.peek formats of the other engines).
   Per painting (3 of them, +1 motif on the last):
     1 BỐ CỤC  drag the motif stamps (chủ sơn, khách sơn, thuyền + nước, tùng, hạc) from the tray onto the blank scroll where the master's small
               sample has them; higher on the scroll = farther = drawn smaller and paler (three distances). ✓ (a sign) when all are down.
     2 MỰC     the layers glow one by one, far → near. Hold the brush on the inkstone: its tip darkens through the tones painted on the stone's
               rim; release on the tone that layer shows in the sample; flick (tap) onto the glowing layer: the wash blooms. A flick that spills
               into the blank mist leaves a blot. A loaded brush dries (pales a tone) after a while.
   Score per painting = 10/3 × (wPlace × placement + wTone × tone + wClean × clean) × mgPace(env,"ve",el,lim); raw = the sum → mgGrade(raw,"ve").
   ONE CORE: every board number is BAL.mgTier.lev.ve.* [ease0, ease5] through mgLev (jbal2.js); motifs +mgMore(env). No words in play (OD 05:10Z).
   STAND-IN ART («tạm»): the motif stamps, scroll and stone rim are drawn on the canvas until Foreman C paints the ART REQUEST (report mg-craft-ve.md);
   the inkstone and brush sprites ve-inkstone / ve-brush already exist. K91VE_TEMP marks the stand-in. */
const K91VE_TEMP=true;/* stand-in art: the missing sprite names ve-motif-<type> are listed by crArt (kitPhNote mg) */
/* the master's paintings: motif type + spot on the scroll (u across, v down = near; far things sit high). Tone of a layer = how far it is (v). */
const K91VE_PAINT=[
 [["sonchu",.30,.46],["sonkhach",.74,.28],["thuyen",.62,.80],["tung",.12,.74],["hac",.88,.58],["sonkhach",.50,.22]],
 [["sonkhach",.22,.26],["sonchu",.62,.42],["tung",.26,.78],["thuyen",.78,.82],["hac",.84,.18],["tung",.46,.84]],
 [["sonchu",.74,.38],["sonkhach",.26,.24],["hac",.44,.58],["tung",.16,.76],["thuyen",.62,.84],["sonkhach",.92,.62]]];
const K91VE_BASE=[3,3,4];/* motifs per painting before mgMore (design: 3–4) */
const K91VE_SZ={u:.115,far:.58,pale:.5,tone:[[222,214,198],[22,18,14]],near:[.12,.76]};/* picture constants: stamp half-size / scroll width, far scale, far alpha, tone ramp, v range of the tone ramp */
function k91VePath(g,t,x,y,s){/* stand-in silhouettes in a ±1 box round (x, y), scale s: closed shapes first, thin lines last (water, neck) */
 g.beginPath();const m=(a,b)=>g.moveTo(x+a*s,y+b*s),l=(a,b)=>g.lineTo(x+a*s,y+b*s),e=(a,b,rx,ry)=>{g.moveTo(x+(a+rx)*s,y+b*s);g.ellipse(x+a*s,y+b*s,rx*s,ry*s,0,0,Math.PI*2)};
 if(t==="sonchu"){m(-1,.7);l(-.55,.1);l(-.2,.3);l(.12,-.8);l(.5,-.15);l(.85,.7);g.closePath()}
 else if(t==="sonkhach"){m(-.9,.6);l(-.3,-.3);l(.05,.1);l(.4,-.45);l(.95,.6);g.closePath()}
 else if(t==="thuyen"){m(-.55,.3);l(.55,.3);l(.38,.52);l(-.38,.52);g.closePath();m(0,-.7);l(0,.24);l(.46,.14);g.closePath();m(-.9,.74);g.quadraticCurveTo(x-.45*s,y+.64*s,x,y+.74*s);g.quadraticCurveTo(x+.45*s,y+.84*s,x+.9*s,y+.74*s);m(-.7,.92);g.quadraticCurveTo(x-.3*s,y+.84*s,x+.1*s,y+.92*s);g.quadraticCurveTo(x+.4*s,y+1*s,x+.7*s,y+.92*s)}
 else if(t==="tung"){m(-.07,.1);l(.07,.1);l(.09,.9);l(-.09,.9);g.closePath();e(0,-.55,.5,.17);e(0,-.28,.66,.2);e(0,.0,.82,.22)}
 else{e(-.34,.1,.3,.13);e(.42,.34,.24,.1);m(-.1,.02);g.quadraticCurveTo(x+.06*s,y-.3*s,x+.1*s,y-.62*s);m(.5,.26);g.quadraticCurveTo(x+.52*s,y,x+.58*s,y-.14*s);m(-.62,.1);l(-.95,.2)}}
function k91VeDraw(g,t,x,y,s,col,a,line){if(crArt(g,"ve-motif-"+t,x,y,s*2,s*2,{alpha:a},null))return;g.save();g.globalAlpha*=a;k91VePath(g,t,x,y,s);if(line){g.strokeStyle=col;g.lineWidth=1.8;g.setLineDash([3,4]);g.lineJoin="round";g.stroke()}else{g.fillStyle=col;g.fill();g.strokeStyle=col;g.lineWidth=Math.max(1.4,s*.045);g.lineJoin="round";g.lineCap="round";g.stroke()}g.restore()}
const k91VeInk=f=>{const [a,b]=K91VE_SZ.tone;return`rgb(${a.map((v,i)=>Math.round(v+(b[i]-v)*f)).join(",")})`};
function k91Ve(box,env){const C=kg82Canvas(box,1.12,520),{g,W,H}=C;const NR=3;
 const Lv=n=>crLev(env,"ve",n),Z=K91VE_SZ;
 const T=Math.max(2,Math.round(Lv("tones"))),PLACE=Lv("place"),RAMP=Lv("ramp"),DRY=Lv("dry"),PEEK=Lv("peek"),BLEED=Lv("bleed"),HOLDMIN=Lv("holdMin"),REACH=Lv("reach");
 const WP=Lv("wPlace"),WT=Lv("wTone"),WC=Lv("wClean");
 const SX=W*.05,SW=W*.9,SY=H*.31,SH=H*.5,UN=SW*Z.u;/* the scroll */
 const TW=W*.38,TH=TW*SH/SW,TX=W*.04,TY=H*.03;/* the master's sample pinned top-left, same shape as the scroll */
 const ST={x:W*.57,y:H*.04,w:W*.38,h:H*.15};/* the inkstone */
 const OFF=UN*.9;/* a dragged stamp rides above the finger */
 let r=-1,pts=0,P=null,phase="",t0=0,LIM=0,drag=null,done=false,peekAt=0,fl=null,act=null;/* act = the one finger (pointer id) being followed */const pops=[];
 const btn=k91Btns(box,[["k91vdone","✓","","Bố cục xong: bắt đầu tô mực"]]);const bd=btn.querySelector("#k91vdone");
 const sc=cy=>Z.far+(1-Z.far)*cl((cy-SY)/SH,0,1),pa=cy=>Z.pale+(1-Z.pale)*cl((cy-SY)/SH,0,1);
 const toneF=v=>cl((v-Z.near[0])/(Z.near[1]-Z.near[0]),0,1),toneOf=v=>Math.round(toneF(v)*(T-1));
 const tgPt=t=>[SX+t.u*SW,SY+t.v*SH];
 function next(){r++;if(r>=NR){done=true;bd.disabled=true;return crLater(()=>env.end(Math.min(10,pts)),300)}
  const n=Math.min(K91VE_PAINT[r].length,K91VE_BASE[r]+mgMore(env));const M=K91VE_PAINT[r].slice(0,n).map(([type,u,v])=>({type,u,v,tone:toneOf(v)}));
  const S=kg82Shuf(M.map((m,i)=>({ti:i,type:m.type,placed:false,x:0,y:0})));const tw=(W-12)/n;S.forEach((s,i)=>{s.hx=6+tw*(i+.5);s.hy=H*.915});
  P={M,S,tw,order:null,tp:[],ts:[],blots:[],bl:0};LIM=n*Lv("lim")+Lv("limBase");phase="place";t0=crNow();peekAt=t0;drag=null;fl=null;bd.disabled=true}
 /* the best way to name which stamp stands for which motif (same type only; ≤ 6! tries) */
 function assign(){const S=P.S,M=P.M,sp=(s,t)=>{if(!s.placed||s.type!==t.type)return s.type===t.type?0:-9;const [tx,ty]=tgPt(t),d=Math.hypot(s.x-tx,(s.y-ty))/SW;return cl(1-(d-PLACE)/(2*PLACE),0,1)};
  let best=-1e9,bp=null;const perm=(a,rest)=>{if(!rest.length){let v=0;a.forEach((j,i)=>v+=sp(S[i],M[j]));if(v>best){best=v;bp=a.slice()}return}rest.forEach((j,k)=>perm(a.concat(j),rest.slice(0,k).concat(rest.slice(k+1))))};
  perm([],M.map((_,i)=>i));P.map=bp;P.tp=M.map((t,j)=>{const i=bp.indexOf(j);return Math.max(0,sp(S[i],t))});
  /* a stamp still in the tray is laid on the scroll's near edge so the ink round can go on (its placement scores 0) */
  S.forEach((s,i)=>{if(!s.placed){s.placed=true;s.x=SX+SW*(.15+.7*i/Math.max(1,S.length-1));s.y=SY+SH*.94}});
  P.lay=M.map((t,j)=>({j,s:S[bp.indexOf(j)],tone:t.tone,done:false,miss:0,ts:0,at:0,tonePut:-1})).sort((a,b)=>M[a.j].v-M[b.j].v)}
 function inkStart(now){assign();phase="ink";bd.disabled=true;P.li=0;fl={mode:"idle",loadAt:0,loadedAt:0,tone:0,down:null};peekAt=now}
 function paintEnd(now,ended){/* one painting is done: score it, show the stars, go on */
  phase="judge";bd.disabled=true;const n=P.M.length,pl=P.tp.reduce((a,b)=>a+b,0)/n,tn=P.lay.reduce((a,l)=>a+l.ts,0)/n,cn=cl(1-P.bl*.5,0,1);
  const el=Math.min(LIM,now-t0),q=WP*pl+WT*tn+WC*cn,sp=mgPace(env,"ve",el,LIM),got=10/NR*q*sp;pts+=got;P.stars=q;P.sp=sp;kg82Pluck(2,q*sp>.5);crLater(next,1500)}
 const stop=crLoop(now=>{if(!P)return;const left=LIM-(now-t0);
  if(phase==="place"&&left<=0)inkStart(now);else if(phase==="ink"&&left<=0)paintEnd(now,true);
  kg82Bg(g,W,H,"ve",0,.7);
  /* the sample (rolled up once its time is out; tap it to look again) */
  const seen=now-peekAt<PEEK||phase==="judge";g.fillStyle="rgba(255,250,236,.9)";k91RR(g,TX-3,TY-3,TW+6,TH+6,5);g.fill();g.strokeStyle=K91C.hair;g.lineWidth=1.5;g.stroke();
  if(seen){P.M.forEach(t=>{const x=TX+t.u*TW,y=TY+t.v*TH,s=UN*TW/SW*sc(SY+t.v*SH)*1.0;k91VeDraw(g,t.type,x,y,s,k91VeInk(toneF(t.v)),1)})}
  else{g.fillStyle="#d8c79a";k91RR(g,TX+TW*.1,TY+TH*.2,TW*.8,TH*.6,6);g.fill();g.strokeStyle="#8a7350";g.lineWidth=2;g.beginPath();g.moveTo(TX+TW*.1,TY+TH*.5);g.lineTo(TX+TW*.9,TY+TH*.5);g.moveTo(TX+TW*.1,TY+TH*.35);g.lineTo(TX+TW*.9,TY+TH*.35);g.moveTo(TX+TW*.1,TY+TH*.65);g.lineTo(TX+TW*.9,TY+TH*.65);g.stroke()}
  /* the blank scroll (stand-in «tạm»: dashed edge) with a band of mist */
  g.fillStyle="rgba(255,252,242,.74)";k91RR(g,SX,SY,SW,SH,8);g.fill();g.strokeStyle=K91VE_TEMP?"#b99a52":K91C.hair;g.lineWidth=2;if(K91VE_TEMP)g.setLineDash([6,4]);g.stroke();g.setLineDash([]);
  {const mg=g.createLinearGradient(0,SY+SH*.42,0,SY+SH*.62);mg.addColorStop(0,"rgba(255,255,255,0)");mg.addColorStop(.5,"rgba(236,240,238,.7)");mg.addColorStop(1,"rgba(255,255,255,0)");g.fillStyle=mg;g.fillRect(SX+2,SY+SH*.42,SW-4,SH*.2)}
  /* stamps on the scroll */
  const stampAt=s=>{const dg=drag&&drag.s===s;return dg?[drag.x,drag.y]:[s.x,s.y]};
  P.S.forEach(s=>{if(!s.placed&&!(drag&&drag.s===s))return;const [x,y]=stampAt(s);const lay=P.lay&&P.lay.find(l=>l.s===s);
   if(phase==="place"||!lay)k91VeDraw(g,s.type,x,y,UN*sc(y),"#4a4136",pa(y));
   else if(lay.done){const k=cl((now-lay.at)/BAL.mgFx.ms/1.6,0,1);k91VeDraw(g,s.type,x,y,UN*sc(y)*(1+.18*(1-k)),k91VeInk(lay.tonePut/(T-1)),.35+.65*k)}
   else k91VeDraw(g,s.type,x,y,UN*sc(y),"#6b5a3c",.8,true)});
  P.blots.forEach(b=>{g.save();const gr=g.createRadialGradient(b.x,b.y,0,b.x,b.y,b.r);gr.addColorStop(0,"rgba(20,16,12,.85)");gr.addColorStop(.7,"rgba(20,16,12,.5)");gr.addColorStop(1,"rgba(20,16,12,0)");g.fillStyle=gr;g.beginPath();g.arc(b.x,b.y,b.r,0,Math.PI*2);g.fill();g.restore()});
  /* the lit layer */
  if(phase==="ink"&&P.li<P.lay.length){const l=P.lay[P.li],s=l.s,k=sc(s.y),F=BAL.mgFx;g.save();g.globalAlpha=.6+.4*Math.sin(now/170);g.shadowColor=F.glow;g.shadowBlur=F.blur;g.strokeStyle=F.ring;g.lineWidth=Math.max(3,UN*k*F.ringW*2.4);g.beginPath();g.arc(s.x,s.y,UN*k*1.05,0,Math.PI*2);g.stroke();g.restore()}
  /* the tray (placement only) */
  if(phase==="place"){g.fillStyle="rgba(255,250,236,.55)";g.fillRect(0,H*.84,W,H*.16);P.S.forEach(s=>{if(s.placed||(drag&&drag.s===s))return;k91VeDraw(g,s.type,s.hx,s.hy,Math.min(UN*.8,P.tw*.4),"#4a4136",.9)})}
  /* the inkstone: tones on its rim, the brush tip darkens while held */
  {const lit=phase==="ink";g.save();g.globalAlpha=lit?1:.55;if(!kg82Spr(g,"ve-inkstone",ST.x+ST.w*.5,ST.y+ST.h*.45,ST.w*.62,null,{})){g.fillStyle="#2a2622";k91RR(g,ST.x+ST.w*.12,ST.y,ST.w*.76,ST.h*.9,10);g.fill()}
   const lvl=fl&&fl.mode==="load"?Math.min(T-.001,T*(now-fl.loadAt)/RAMP):-1,sw=Math.min(ST.w*.8/T,22);
   for(let i=0;i<T;i++){const x=ST.x+ST.w*.5+(i-(T-1)/2)*sw*1.15,y=ST.y+ST.h*.98;g.fillStyle=k91VeInk(i/(T-1));g.strokeStyle=Math.floor(lvl)===i?"#e0a526":"#6b5a3c";g.lineWidth=Math.floor(lvl)===i?3.5:1.2;g.beginPath();g.arc(x,y,sw*.52*(Math.floor(lvl)===i?1.25:1),0,Math.PI*2);g.fill();g.stroke()}
   if(fl&&(fl.mode==="load"||fl.mode==="loaded")){const tn=fl.mode==="load"?Math.floor(lvl):Math.max(0,fl.tone-Math.floor((now-fl.loadedAt)/DRY)),bx=ST.x+ST.w*.5,by=ST.y+ST.h*.35;
    if(!kg82Spr(g,"ve-brush",bx,by,UN*1.6,null,{ax:.06,ay:.95,glow:fl.mode==="load"?BAL.mgFx.glow:null})){g.strokeStyle="#6b4a2a";g.lineWidth=5;g.lineCap="round";g.beginPath();g.moveTo(bx+UN*.9,by-UN*.9);g.lineTo(bx,by);g.stroke()}
    g.fillStyle=k91VeInk(tn/(T-1));g.beginPath();g.arc(bx,by,UN*.14,0,Math.PI*2);g.fill()}g.restore()}
  if(phase==="judge"&&P.stars!=null)k91Say(g,crStars(P.stars),crCol(P.stars,P.sp),W/2,H*.915,W-16);/* the family star rule (crStars / crCol, review/mg-craft-r1) */
  kg82DrawPops(g,pops,now);const on=phase==="place"||phase==="ink";/* the ONE live grade (crHud → mgLive): done paintings + the open one's time part + paintings to come */
  crHud(env,on?mgReach(pts+10/NR*mgPace(env,"ve",Math.min(LIM,now-t0),LIM),r+1,NR):mgReach(pts,Math.min(NR,r+1),NR),r,NR,on?left:null)});
 const onStone=(x,y)=>x>=ST.x-6&&x<=ST.x+ST.w+6&&y>=ST.y-6&&y<=ST.y+ST.h+ST.h*.3+6;
 const nearStamp=(x,y)=>{let b=null,bd=1e9;P.S.forEach(s=>{if(!s.placed)return;const d=k91Dist(x,y,s.x,s.y);if(d<bd&&d<UN*sc(s.y)*1.1){bd=d;b=s}});return b};
 function flick(x,y,now){const l=P.lay[P.li],s=l.s,R=UN*sc(s.y),d=k91Dist(x,y,s.x,s.y),bl=BLEED*SW;
  if(d<=R*REACH){/* the wash lands on the layer: tone = what the brush still holds */
   const put=cl(fl.tone-Math.floor((now-fl.loadedAt)/DRY),0,T-1),e=Math.abs(put-l.tone);l.ts=e===0?1:e===1?.5:0;l.tonePut=put;l.done=true;l.at=now;kg82Pluck(put,e<=1);
   if(d+bl>R*REACH*.9){P.blots.push({x,y,r:bl});P.bl++}P.li++;if(P.li>=P.lay.length)crLater(()=>{if(phase==="ink")paintEnd(crNow())},500)}
  else{P.blots.push({x,y,r:bl});P.bl++;l.miss++;kg82Pluck(0,false);if(l.miss>=2){l.done=true;l.at=now;l.tonePut=0;l.ts=0;P.li++;if(P.li>=P.lay.length)crLater(()=>{if(phase==="ink")paintEnd(crNow())},500)}}
  fl.mode="idle";fl.down=null}
 k91Pointer(C,{down:(x,y,id)=>{const now=crNow();if(!P)return;if(act!=null){if(fl&&fl.mode==="load")return;drag=null;if(fl)fl.down=null}act=id;/* a new finger replaces a finished-looking one, never a brush being loaded */
   if(x>=TX&&x<=TX+TW&&y>=TY&&y<=TY+TH&&(phase==="place"||phase==="ink")){peekAt=now;return}
   if(phase==="place"){let s=nearStamp(x,y);if(s)drag={s,x:s.x,y:s.y,dx:s.x-x,dy:s.y-y};else{s=P.S.find(s=>!s.placed&&Math.abs(x-s.hx)<P.tw/2&&y>H*.82);if(s)drag={s,x,y:y-OFF,dx:0,dy:-OFF}}return}
   if(phase==="ink"){if(onStone(x,y)){fl.mode="load";fl.loadAt=now;fl.down=null;return}if(fl.mode==="loaded")fl.down=[x,y]}},
  move:(x,y,id)=>{if(id===act&&drag){drag.x=x+drag.dx;drag.y=y+drag.dy}},
  up:(x,y,id)=>{const now=crNow();if(!P||id!==act)return;act=null;
   if(drag){const s=drag.s,cx=x+drag.dx,cy=y+drag.dy;drag=null;if(phase!=="place")return;if(cx>=SX&&cx<=SX+SW&&cy>=SY&&cy<=SY+SH){s.placed=true;s.x=cx;s.y=cy;kg82Pluck(1,true)}else s.placed=false;bd.disabled=!P.S.every(s=>s.placed);return}
   if(phase==="ink"&&fl){if(fl.mode==="load"){if(now-fl.loadAt<HOLDMIN){fl.mode="idle";return}fl.tone=Math.min(T-1,Math.floor(T*(now-fl.loadAt)/RAMP));fl.mode="loaded";fl.loadedAt=now;
     if(!onStone(x,y)&&P.li<P.lay.length)flick(x,y,now);/* one gesture: load on the stone, lift on the layer */return}
    if(fl.mode==="loaded"&&fl.down&&P.li<P.lay.length)flick(x,y,now)}}});
 bd.onclick=()=>{if(phase==="place"&&P.S.every(s=>s.placed))inkStart(crNow())};
 KG82.peek=()=>{if(!P||drag)return null;
  if(phase==="place"){const s=P.S.find(s=>!s.placed);if(!s)return{sel:"#k91vdone"};const t=P.M[s.ti],[tx,ty]=tgPt(t),a=C.client(s.hx,s.hy),b=C.client(tx,ty+OFF),m=C.client((s.hx+tx)/2,(s.hy+ty)/2);return{drag:[[a.x,a.y],[m.x,m.y],[b.x,b.y]]}}
  if(phase==="ink"&&P.li<P.lay.length){const l=P.lay[P.li];
   if(fl.mode==="loaded"){const c=C.client(l.s.x,l.s.y);return{x:c.x,y:c.y,thinkMs:Lv("flick")}}
   const sc2=C.client(ST.x+ST.w*.5,ST.y+ST.h*.45);
   if(fl.mode==="load"){const lv=Math.min(T-.001,T*(crNow()-fl.loadAt)/RAMP);return{hold:!((lv>=l.tone+.3||lv>=T-.01)&&crNow()-fl.loadAt>=HOLDMIN+25),x:sc2.x,y:sc2.y}}
   return{hold:true,x:sc2.x,y:sc2.y}}
  return null};
 next();return()=>{done=true;stop()}}
/* wiring: the ONE table KG82_CRAFT (j91) names the engine «inkwash» + rules text; crReg registers it and switches the kind ve (jcraft.js) */
crReg("ve","inkwash",k91Ve);
