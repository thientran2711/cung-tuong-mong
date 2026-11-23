/* ================= j91 MỖI MÔN MỘT TRÒ (owner 11/14: "5 câu hỏi chọn đáp án không phải minigame") =================
   Every contest kind of j82 / j71 (and every lesson art) now has its OWN mechanic; no two kinds share one.
   Table (dev/MINIGAMES.md):  dan rhythm · hat hold (giữ hơi theo giai điệu) · co go · dauho fling (kéo thả ném tên) · ban aim ·
     tho verse (kéo chữ vào câu bát, đúng vần) · doi pair (nối chữ đối) · doden lamp (jlant.js: thắp đèn theo mẫu) ·
     ve trace (đồ nét) · hoa arrange (cắm hoa thiên–nhân–địa) · theu pattern (nhớ mẫu thêu, j82) · kim papercut (jcraft_kim) · mua steps ·
     banh cook (giữ lửa + thứ tự nguyên liệu) · huong blend (thanh trượt pha hương).
   Engines follow the j82 contract: eng(box, env{kind, lv 0–5, hud(o), end(raw0to10)}) -> stop(); KG82.peek() is the test oracle:
     {x,y} tap · {sel} click · {drag:[[x,y],…]} drag path (client px) · {hold:bool, hsel|x,y} keep a pointer down or not.
   Drawing only inside the kit game box (.kgbox canvas); buttons are kit .kgbtn in the j82 .kg82act row. No new CSS. */

/* ---------- helpers ---------- */
function k91F(w,px,body){return `${w} ${Math.round(px)}px ${kg82Col(body?"--body":"--display",body?"sans-serif":"serif")}`}
function k91RR(g,x,y,w,h,r){r=Math.min(r,w/2,h/2);g.beginPath();g.moveTo(x+r,y);g.arcTo(x+w,y,x+w,y+h,r);g.arcTo(x+w,y+h,x,y+h,r);g.arcTo(x,y+h,x,y,r);g.arcTo(x,y,x+w,y,r);g.closePath()}
function k91Wrap(g,text,maxW){const w=String(text).split(" ");const L=[];let cur="";for(const x of w){const t=cur?cur+" "+x:x;if(g.measureText(t).width>maxW&&cur){L.push(cur);cur=x}else cur=t}if(cur)L.push(cur);return L}
function k91T(g,t,x,y,maxW){const f=g.font;const m=f.match(/(\d+(?:\.\d+)?)px/);let px=m?+m[1]:14;while(px>9&&g.measureText(t).width>maxW){px-=1;g.font=f.replace(/\d+(?:\.\d+)?px/,px+"px")}g.fillText(t,x,y);g.font=f}
const K91C={ink:"#2a1a12",paper:"#fffdf6",hair:"#d2b071",lab:"#8a7350",
 good:()=>kg82Col("--good","#2d7a52"),red:()=>kg82Col("--red","#c23b22"),gold:()=>kg82Col("--gold","#8f5f0c"),pk:()=>kg82Col("--peony","#e48aa4")};
/* painted paper slip (tho-slip cream / doi-slip red), 3-slice so its gold border keeps its shape */
let K91SK="tho-slip";
function k91Slip(g,n,x,y,w,h){const im=kg82Img(n);if(!(im.complete&&im.naturalWidth))return false;const iw=im.naturalWidth,ih=im.naturalHeight,cs=ih*.45,cd=Math.min(w/2,cs*h/ih);
 g.drawImage(im,0,0,cs,ih,x,y,cd,h);g.drawImage(im,cs,0,iw-2*cs,ih,x+cd,y,Math.max(0,w-2*cd),h);g.drawImage(im,iw-cs,0,cs,ih,x+w-cd,y,cd,h);return true}
/* a word tile: st n | on | ok | bad | blank */
/* a round's verdict ("Khớp hương mẫu!", "Đối chỉnh!"…): drawn IN PLACE of the hint/heading line it would cover, never floating over other text */
function k91Say(g,t,col,x,y,maxW,align){t=kg82Sym(t);g.save();g.fillStyle=col;g.font=`700 16px ${kg82Col("--display","serif")||"serif"}`;g.textAlign=align||"center";g.textBaseline="alphabetic";kg82Lbl(g,t,x,y,maxW);g.restore()}
function k91Tile(g,x,y,w,h,txt,st,fs,skin){skin=skin||K91SK;const red=skin==="doi-slip";
 if(st!=="blank"){g.save();if(st==="on"){g.shadowColor="#2a1a1266";g.shadowBlur=10;g.shadowOffsetY=3}const ok=k91Slip(g,skin,x,y,w,h);g.restore();
  if(ok){g.save();if(st!=="n"){k91RR(g,x-1.5,y-1.5,w+3,h+3,6);g.lineWidth=3;g.strokeStyle=st==="ok"?K91C.good():st==="bad"?K91C.red():"#e0a526";g.stroke()}
   if(txt){g.fillStyle=red?"#fff3cf":st==="ok"?K91C.good():st==="bad"?K91C.red():K91C.ink;g.font=k91F(700,fs||15);g.textAlign="center";g.textBaseline="middle";g.fillText(txt,x+w/2,y+h/2+1)}
   if(red&&(st==="ok"||st==="bad")){g.fillStyle=st==="ok"?K91C.good():K91C.red();g.beginPath();g.arc(x+w-5,y+5,5,0,Math.PI*2);g.fill()}g.restore();return}}
 g.save();const col=st==="ok"?K91C.good():st==="bad"?K91C.red():st==="on"?K91C.gold():K91C.hair;
 g.shadowColor="#6e4d0e33";g.shadowBlur=st==="blank"?0:4;g.shadowOffsetY=st==="blank"?0:1.5;k91RR(g,x,y,w,h,7);
 g.fillStyle=st==="blank"?"rgba(255,250,236,.55)":st==="on"?"#fff3d6":K91C.paper;g.fill();g.shadowBlur=0;g.shadowOffsetY=0;g.lineWidth=st==="n"||st==="blank"?1.2:2.4;
 if(st==="blank")g.setLineDash([5,4]);g.strokeStyle=col;g.stroke();g.setLineDash([]);
 if(txt){g.fillStyle=st==="ok"?K91C.good():st==="bad"?K91C.red():K91C.ink;g.font=k91F(600,fs||15);g.textAlign="center";g.textBaseline="middle";g.fillText(txt,x+w/2,y+h/2+1)}g.restore()}
function k91Pointer(C,h){const cv=C.cv;
 cv.addEventListener("pointerdown",e=>{e.preventDefault();try{cv.setPointerCapture(e.pointerId)}catch(_){}const [x,y]=C.at(e);if(h.down)h.down(x,y,e.pointerId)});
 cv.addEventListener("pointermove",e=>{if(!h.move)return;const [x,y]=C.at(e);h.move(x,y,e.pointerId)});
 const up=e=>{const [x,y]=C.at(e);if(h.up)h.up(x,y,e.pointerId)};cv.addEventListener("pointerup",up);cv.addEventListener("pointercancel",up)}
/* a button in play is a sign (✓ done / ? hint); its word lives only in the tooltip (list item = [id, sign, small, tooltip]) */
function k91Btns(box,list){const d=document.createElement("div");d.className="kg82act";d.innerHTML=list.map(([id,t,s,tip])=>`<button class="kgbtn" id="${id}"${tip?` title="${tip}" aria-label="${tip}"`:""}>${t}${s?`<small>${s}</small>`:""}</button>`).join("");box.appendChild(d);return d}
function k91Loop(fn){let stop=false,raf=0;const L=now=>{if(stop)return;fn(now);if(!stop)raf=requestAnimationFrame(L)};raf=requestAnimationFrame(L);return()=>{stop=true;cancelAnimationFrame(raf)}}
const k91Dist=(a,b,c,d)=>Math.hypot(a-c,b-d);
function k91SegX(a,b,c,d){const o=(p,q,r)=>Math.sign((q[0]-p[0])*(r[1]-p[1])-(q[1]-p[1])*(r[0]-p[0]));return o(a,b,c)!==o(a,b,d)&&o(c,d,a)!==o(c,d,b)&&o(a,b,c)!==0&&o(c,d,a)!==0}

/* =============== 1. HOLD (Hát): keep a finger down to raise the voice, lift to lower; follow the melody ribbon =============== */
const K91_CA=["Gió đưa cành trúc la đà","Tiếng chuông Trấn Vũ canh gà Thọ Xương","Mịt mù khói tỏa ngàn sương","Nhịp chày Yên Thái mặt gương Tây Hồ"];
function k91Hold(box,env){const C=kg82Canvas(box,.9,430),{g,W,H}=C;const lv=env.lv||0;const DUR=20000,SPD=W*.2/1000,MX=W*.24,band=H*(.075+.007*lv)*mgTol(env),V=H*.72/1000;
 const SG=typeof mgpOne==="function"?mgpOne("hat"):null;/* ORDER THIN P1: one composed song (theme · lines · melody contour), drawn through the no-repeat memory */const ph=SG?SG.ph:[Math.random()*6,Math.random()*6,Math.random()*6],FQ=SG?SG.f:[1.05,2.2,3.5],AM=SG?SG.a:[.19,.08,.035];const cy=t=>H*.5+H*AM[0]*Math.sin(t/1000*FQ[0]+ph[0])+H*AM[1]*Math.sin(t/1000*FQ[1]+ph[1])+H*AM[2]*Math.sin(t/1000*FQ[2]+ph[2]);
 const words=[];(SG?SG.lines:K91_CA).forEach((l,i)=>{const w=l.split(" ");w.forEach((x,j)=>words.push({x,t:i*5000+300+j*(4400/w.length),c:i}))});
 let y=H*.5,vy=0,held=new Set(),t0=performance.now()+1600,last=performance.now(),inb=0,tot=0,done=false;const pops=[];
 const ratio=()=>tot?Math.min(1,inb/tot/mgFull(env,.82)):0;
 const stop=k91Loop(now=>{const dt=Math.min(50,now-last);last=now;const t=now-t0;const tgt=held.size?-V:V;vy+=(tgt-vy)*Math.min(1,dt/80);y=cl(y+vy*dt,H*.06,H*.94);
  const ok=t>=0&&Math.abs(y-cy(t))<band;if(t>=0&&t<=DUR){tot+=dt;if(ok)inb+=dt}
  kg82Bg(g,W,H,"hat",.06,.75);
  /* ribbon = the kit lit path (mg-play2 law 11: was a .38 fill + thin dashed line, too faint) */const ta=t-MX/SPD,tb=t+(W-MX)/SPD;{const T=[],B=[];for(let tt=ta;tt<=tb+40;tt+=40){const x=MX+(tt-t)*SPD;T.push([x,cy(tt)-band]);B.push([x,cy(tt)+band])}kg82FxLane.path(g,T,B)}
  g.save();g.setLineDash([4,6]);g.strokeStyle=K91C.gold();g.lineWidth=1.4;g.beginPath();for(let tt=ta;tt<=tb;tt+=40){const x=MX+(tt-t)*SPD;g.lineTo(x,cy(tt))}g.stroke();g.restore();
  /* lyric words on the ribbon (from the start: the countdown and its hint own the board before) */g.font=k91F(600,Math.max(12,Math.min(16,W/30)));g.textAlign="center";g.textBaseline="alphabetic";
  if(t>=0)for(const w of words){if(w.t<ta-500||w.t>tb+500||w.t>DUR)continue;const x=MX+(w.t-t)*SPD;g.fillStyle=Math.abs(w.t-t)<350?K91C.red():"#3a2a1e";kg82Lbl(g,"♪",x,cy(w.t)-band-6)}
  g.fillStyle="#c23b2233";g.fillRect(MX-1,0,2,H);
  {const lr=Math.min(24,W*.05);if(!kg82Spr(g,"hat-lotus",MX,y,lr*2,null,{alpha:ok?1:.6,glow:ok?BAL.mgFx.glow:null,ring:ok}))kg82Blossom(g,MX,y,lr*.7,ok?K91C.pk():"#b9a58a",ok)}
  if(t<0){g.fillStyle=K91C.ink;g.font=k91F(700,24);kg82Lbl(g,String(Math.ceil(-t/1000)),W/2,H*.2);g.font=k91F(700,13,1);g.fillStyle="#3a2a1e";kg82Lbl(g,"Giữ ngón tay: lên giọng · buông: xuống giọng",W/2,H*.2+22,W-16)}
  kg82DrawPops(g,pops,now);
  env.hud({score:mgLive(env,10*Math.min(1,(inb+Math.max(0,DUR-tot))/DUR/mgFull(env,.82))),round:`Hồi ${cl(1+Math.floor(Math.max(0,t)/5000),1,4)}/4`,time:`${Math.max(0,Math.ceil((DUR-Math.max(0,t))/1000))} giây`});
  if(t>DUR&&!done){done=true;setTimeout(()=>env.end((10*ratio())),200)}});
 k91Pointer(C,{down:(x,y,id)=>held.add(id),up:(x,y,id)=>held.delete(id)});
 const kd=e=>{if(e.key===" "){e.preventDefault();held.add("k")}},ku=e=>{if(e.key===" ")held.delete("k")};document.addEventListener("keydown",kd);document.addEventListener("keyup",ku);
 KG82.peek=()=>{const t=performance.now()-t0;if(t<0||done)return null;const p=C.client(W/2,H/2);return{hold:y>cy(t+120)+2,x:p.x,y:p.y}};
 return()=>{done=true;stop();document.removeEventListener("keydown",kd);document.removeEventListener("keyup",ku)}}

/* =============== 2. FLING (Đầu hồ): drag back and release to throw the arrow; wind changes every throw ===============
   dauho-lv5 (owner 21/11, «thu lại cho ngay đúng cái bình»): the scoring holes ARE the holes painted in mg-dauho-pot.webp, measured on the art
   (BAL.mgArt.dauho, shares of the picture width): the mouth opening (centre on the throw line MY, half-width R = the ease lever mouth) and the two
   ear tubes at THEIR painted place (lower than the mouth). An arrow crossing the mouth plane inside the opening counts; on the outer lip it bounces
   (miss); into the painted neck below the lip = miss; beside the vase it flies on and may still drop into an ear tube. A counted arrow is drawn standing IN its hole (the part below the near lip
   is hidden by a clip), never beside the vase. */
function k91Fling(box,env){const C=kg82Canvas(box,.85,430),{g,W,H}=C;const N=6,U=Math.min(W,H);const A=BAL.mgArt.dauho,M=A.mouth,E=A.ear;
 const AIDT=mgLev(env,"dauho","aid");/* seconds of flight shown by the aim dots */const PULL=mgLev(env,"dauho","pull")||1;/* cal-p2: drag gain by ease (BAL.mgTier.lev.dauho.pull); the cap grows by the same factor so the strongest throw stays K·MAXD */const X0=W*.13,Y0=H*.8,GR=H*1.9,K=5.4*PULL,MAXD=U*.45/PULL,MY=H*.5;let px=0,R=0,Ws=0,wd=0,k=0,pts=0,phase="aim",aim=null,fly=null,sol=null,landed=[],done=false;const pops=[];
 /* the painted holes at this throw's vase size: R = mouth half-width (BAL.mgTier.lev.dauho.mouth by ease), Ws = picture width, ears below the mouth */
 const G=()=>({ry:M.ry*Ws,rim:A.rim*Ws,ey:MY+(E.cy-M.cy)*Ws,ex:E.dx*Ws,er:E.rx*Ws,ery:E.ry*Ws});
 const setThrow=()=>{px=W*(.6+Math.random()*.22);R=U*.05*mgLev(env,"dauho","mouth");/* mg-balance-2: mouth size by ease (BAL.mgTier.lev.dauho) */Ws=R/M.rx;wd=(Math.random()*2-1)*H*.55*(k/N);aim=null;fly=null;sol=null;phase="aim"};setThrow();
 const vOf=(ax,ay,cx,cy)=>{let dx=cx-ax,dy=cy-ay;const L=Math.hypot(dx,dy);if(L>MAXD){dx*=MAXD/L;dy*=MAXD/L}return[-dx*K,-dy*K]};
 /* ONE judge for the aim sim, the solver and the real flight: a step from (·,py) to (x,y) going down through a hole plane */
 function judge(py,y,x){const g0=G();if(py<MY&&y>=MY){const d=Math.abs(x-px);if(d<=R)return{q:d<R*A.q.c?A.q.m[0]:A.q.m[1],at:0,x};if(d<=g0.rim)return{q:0,at:-9,x}}
  if(py<g0.ey&&y>=g0.ey){for(const s of[-1,1])if(Math.abs(x-(px+s*g0.ex))<=g0.er)return{q:A.q.ear,at:s,x}}
  if(y>MY&&y<g0.ey&&Math.abs(x-px)<=neck(y))return{q:0,at:-9,x};/* into the painted neck between the lip and the ears: it strikes the vase = miss */return null}
 function neck(y){const N=A.neck,u=(y-MY)/Ws+M.cy;let i=0;while(i<N.length-2&&u>N[i+1][0])i++;const [a,ha]=N[i],[b,hb]=N[i+1];return Ws*(ha+(hb-ha)*cl((u-a)/(b-a),0,1))}
 function sim(vx,vy,cb){let x=X0,y=Y0,t=0;const dt=1/120;for(let i=0;i<600;i++){const py=y;vx+=wd*dt;vy+=GR*dt;x+=vx*dt;y+=vy*dt;t+=dt;if(cb&&cb(x,y,t)===false)return null;
   const j=judge(py,y,x);if(j)return{q:j.q,x,t};if(y>H+40||x>W+40||x<-40)return{q:0,x,t}}return{q:0,x,t}}
 function solve(){if(sol)return sol;let best=null;for(let a=30;a<=78;a+=1)for(let v=200;v<=MAXD*K;v+=4){const r=Math.PI*a/180,vx=v*Math.cos(r),vy=-v*Math.sin(r);const s=sim(vx,vy);if(s&&s.q===A.q.m[0]){const d=Math.abs(s.x-px);if(!best||d<best.d)best={d,vx,vy}}}
  sol=best||{vx:300,vy:-400};return sol}
 function pot(g){const x=px,y=MY,g0=G();/* the bronze pitch-pot painting, placed so its painted mouth opening sits on (px, MY) with half-width R */
  if(kg82Spr(g,"dauho-pot",x,y-M.cy*Ws,Ws,null,{ay:0}))return;g.save();const r=g0.rim,gr=g.createLinearGradient(x-r*2.4,0,x+r*2.4,0);gr.addColorStop(0,"#6e4d0e");gr.addColorStop(.5,"#c9a03a");gr.addColorStop(1,"#6e4d0e");g.fillStyle=gr;
  g.beginPath();g.moveTo(x-r,y);g.lineTo(x+r,y);g.bezierCurveTo(x+r*.7,y+r*1.3,x+r*2.5,y+r*1.9,x+r*2,y+r*4.3);g.lineTo(x-r*2,y+r*4.3);g.bezierCurveTo(x-r*2.5,y+r*1.9,x-r*.7,y+r*1.3,x-r,y);g.fill();
  [-1,1].forEach(s=>{g.fillRect(x+s*g0.ex-g0.er*1.4,g0.ey,g0.er*2.8,g0.er*3);g.fillStyle="#2a1a12";g.beginPath();g.ellipse(x+s*g0.ex,g0.ey,g0.er,g0.ery,0,0,Math.PI*2);g.fill();g.fillStyle=gr});
  g.fillStyle="#2a1a12";g.beginPath();g.ellipse(x,y,R,g0.ry,0,0,Math.PI*2);g.fill();g.restore()}
 function arrow(g,x,y,ang,len){if(kg82Spr(g,"dauho-arrow",x,y,len*1.25,null,{rot:ang,ax:.98,ay:.5}))return;g.save();g.translate(x,y);g.rotate(ang);g.strokeStyle="#4a3010";g.lineWidth=2.2;g.beginPath();g.moveTo(-len,0);g.lineTo(0,0);g.stroke();g.fillStyle=K91C.red();g.beginPath();g.moveTo(4,0);g.lineTo(-6,-4);g.lineTo(-6,4);g.fill();
  g.fillStyle="#f6ead6";g.strokeStyle="#8a7350";g.lineWidth=1;g.beginPath();g.moveTo(-len,0);g.lineTo(-len-8,-5);g.lineTo(-len+6,0);g.lineTo(-len-8,5);g.closePath();g.fill();g.stroke();g.restore()}
 /* a counted arrow standing in its hole: it passes through its landing point on the hole plane, tip sunk below, tail leaning out by at most BAL.mgArt.dauho.lean;
    the clip (all above the plane + the hole's ellipse) hides the part behind the near lip */
 function stuck(g,a){const g0=G(),hx=a.at===0?px:px+a.at*g0.ex,hy=a.at===0?MY:g0.ey,rx=a.at===0?R:g0.er,ry=a.at===0?g0.ry:g0.ery,x=px+a.dx,len=U*.11;
  const ang=Math.PI/2+A.lean*cl((x-hx)/rx,-1,1),s=A.sink*len;g.save();g.beginPath();g.rect(0,0,W,hy);g.ellipse(hx,hy,rx,ry,0,0,Math.PI*2);g.clip();arrow(g,x+Math.cos(ang)*s,hy+Math.sin(ang)*s,ang,len);g.restore()}
 const stop=k91Loop(now=>{kg82Bg(g,W,H,"dauho",0,.75);pot(g);
  landed.forEach(a=>stuck(g,a));
  /* wind */const wl=Math.abs(wd)/(H*.55);g.fillStyle="#3a2a1e";g.font=k91F(700,13,1);g.textAlign="left";g.textBaseline="top";const WB=A.wind;/* owner 21/11 (verbatim): "hồi trước nó còn có cái dòng chữ hướng gió á ... những cái hướng dẫn cần chữ thì vẫn phải có chứ" — the wind word line is back (mg-noword-a had cut it) */kg82Lbl(g,wl<WB[0]?"Gió lặng":`Gió ${wd<0?"ngược":"xuôi"} ${wl<WB[1]?"nhẹ":wl<WB[2]?"vừa":"mạnh"}`,10,10);
  if(wl>=WB[0]){const ax=10,ay=34,L=20+40*wl;g.strokeStyle="#6b5643";g.lineWidth=2;g.beginPath();g.moveTo(ax+(wd<0?L:0),ay);g.lineTo(ax+(wd<0?0:L),ay);g.stroke();const hx=ax+(wd<0?0:L),s=wd<0?1:-1;g.beginPath();g.moveTo(hx,ay);g.lineTo(hx+6*s,ay-4);g.lineTo(hx+6*s,ay+4);g.fill()}
  if(phase==="aim"){let vx=0,vy=0;if(aim){[vx,vy]=vOf(aim.ax,aim.ay,aim.cx,aim.cy)}const ang=aim?Math.atan2(vy,vx):-Math.PI/4;arrow(g,X0,Y0,ang,U*.12);
   if(aim&&Math.hypot(vx,vy)>40){const T=AIDT;g.fillStyle="#8a2a1e";sim(vx,vy,(x,y,t)=>{if(t>T)return false;if(Math.round(t*120)%5===0){g.beginPath();g.arc(x,y,2.2,0,Math.PI*2);g.fill()}});
    g.strokeStyle="#8a735088";g.setLineDash([3,4]);g.beginPath();g.moveTo(aim.ax,aim.ay);g.lineTo(aim.cx,aim.cy);g.stroke();g.setLineDash([])}
   else{g.fillStyle="#3a2a1e";g.textAlign="center";g.font=k91F(700,13,1);kg82Lbl(g,"↙",W/2,H*.95,W-16)}}
  if(phase==="fly"&&fly){const dt=1/60;for(let i=0;i<2;i++){fly.vx+=wd*dt/2;fly.vy+=GR*dt/2;const py=fly.y;fly.x+=fly.vx*dt/2;fly.y+=fly.vy*dt/2;
    const j=judge(py,fly.y,fly.x);if(j){land(j.q,fly.x,j.at);break}
    if(fly.y>H*.9||fly.x>W+20||fly.x<-20){land(0,fly.x,-9);break}}
   if(fly)arrow(g,fly.x,fly.y,Math.atan2(fly.vy,fly.vx),U*.12)}
  kg82DrawPops(g,pops,now);env.hud({score:mgLive(env,10*(pts+N-k)/N),round:`Hồi ${Math.min(k+1,N)}/${N}`,time:`${N-k} tên`})});
 function land(q,x,at){fly=null;phase="wait";pts+=q;if(q>0)landed.push({dx:x-px,at});KG82.flingLast={q,at,dx:x-px,R,ear:G()};kg82Pop(pops,px,MY-R*2,q===A.q.m[0]?"Trúng giữa bình!":q>=A.q.m[1]?"Vào bình":q>0?"Vào tai bình":"Trượt",q>=A.q.m[1]?K91C.good():q>0?K91C.gold():K91C.red());kg82Pluck(k,q>0);k++;
  if(k>=N){done=true;setTimeout(()=>env.end((10*pts/N)),700)}else setTimeout(setThrow,700)}
 k91Pointer(C,{down:(x,y)=>{if(phase==="aim")aim={ax:x,ay:y,cx:x,cy:y}},move:(x,y)=>{if(aim&&phase==="aim"){aim.cx=x;aim.cy=y}},
  up:(x,y)=>{if(!aim||phase!=="aim")return;aim.cx=x;aim.cy=y;const [vx,vy]=vOf(aim.ax,aim.ay,x,y);aim=null;if(Math.hypot(vx,vy)<60)return;fly={x:X0,y:Y0,vx,vy};phase="fly"}});
 KG82.peek=()=>{if(phase!=="aim"||done||aim)return null;const s=solve();const a=C.client(W/2,H*.35),b=C.client(W/2-s.vx/K,H*.35-s.vy/K);/* aim: a player watches the aim dots while pulling, so the longer the dots the finer the release (dev/measure/mg-bots.js scales its drag scatter by it) */
  return{drag:[[a.x,a.y],[(a.x+b.x)/2,(a.y+b.y)/2],[b.x,b.y]],aim:Math.min(1,.1/Math.max(.05,AIDT))}};
 /* test hook (dev/test/dauho-hole.js): the painted holes of the current throw in canvas px + a throw from a given velocity */
 KG82.flingGeo=()=>({W,H,px,MY,R,Ws,...G(),shoot:(vx,vy)=>{if(phase!=="aim")return false;fly={x:X0,y:Y0,vx,vy};phase="fly";return true},X0,Y0,GR,wd,setWind:v=>{wd=v;sol=null},setPx:v=>{px=v;sol=null},sim,judge,pot,stuck,phase:()=>phase,landed:()=>landed.slice()});
 return()=>{done=true;stop()}}

/* ---------- mg-easy: shared bits of the three "verse/pair/riddle" games ---------- */
/* rhyme part of a syllable without the tone (người → ươi, ngài → ai, quang → ang, đau → au): shown on the board so a rhyme is matched by eye, not by knowing old verse */
function k91End(w){const t=String(w).normalize("NFD").replace(/[̣̀́̃̉]/g,"").normalize("NFC").toLowerCase();const V="aăâeêioôơuưy";let i=0;
 if(/^qu./.test(t))i=2;else if(/^gi./.test(t)&&V.includes(t[2]))i=2;while(i<t.length&&!V.includes(t[i]))i++;return t.slice(i)}
/* one-screen "how to play" card, shown the first time a kind is played (S.mgSeen); lives inside the game box, closed with the kit button */
function k91DemoCard(box,key,o){return null;/* owner OD 20/11 ~05:10Z: no text in play; the shared rules screen (§13.7) already teaches before «Sẵn sàng» */if(kg82Seen(key))return null;const bt=k91Btns(box,[["k91demo","Đã hiểu, bắt đầu"]]);const D={on:true};
 bt.querySelector("#k91demo").onclick=()=>{kg82Seen(key,true);D.on=false;bt.remove();if(o.done)o.done()};
 D.draw=(g,W,H,now)=>{g.save();k91RR(g,8,6,W-16,H-12,10);g.fillStyle="rgba(255,250,236,.94)";g.fill();g.strokeStyle=K91C.hair;g.lineWidth=2;g.stroke();
  g.fillStyle="#5a3a0c";g.font=k91F(700,14,1);g.textAlign="center";g.textBaseline="alphabetic";g.fillText(o.title,W/2,28);
  let y=o.art?o.art(g,W,H,now):60;const fs=W<420?12.5:14;g.fillStyle=K91C.ink;g.font=k91F(600,fs,1);g.textAlign="center";
  o.lines.forEach(l=>{k91Wrap(g,l,W-44).forEach(t=>{g.fillText(t,W/2,y);y+=Math.round(fs*1.4)});y+=3});g.restore()};
 return D}
/* a gentle glow round a rectangle (hint) */
function k91Glow(g,x,y,w,h,now){g.save();g.globalAlpha=.55+.45*Math.sin(now/170);g.strokeStyle="#e0a526";g.lineWidth=3.5;k91RR(g,x-3,y-3,w+6,h+6,8);g.stroke();g.restore()}

/* (3. VERSE, 4. PAIR and 5. LANTERN word games removed: owner 16/11 07:20Z no word games; replaced by jnwp calli / doiline and jlant lamp) */
/* =============== 6. TRACE (Vẽ): follow the faint brush line with one finger; coverage × steadiness =============== */
const K91_SH=[["Cành trúc",[t=>[.47+.04*Math.sin(t*3),.92-.84*t],t=>[.5+.35*t,.36-.12*t-.06*Math.sin(t*3)],t=>[.48-.33*t,.56-.06*t]]],
 ["Lá lan",[t=>{const u=1-t;return[u*u*u*.12+3*u*u*t*.2+3*u*t*t*.95+t*t*t*.86,u*u*u*.9+3*u*u*t*.25+3*u*t*t*.85+t*t*t*.14]}]],
 ["Núi xa",[t=>{const P=[[.05,.75],[.27,.35],[.44,.6],[.62,.2],[.8,.55],[.95,.7]];const s=t*(P.length-1),i=Math.min(P.length-2,Math.floor(s)),f=s-i;return[P[i][0]+(P[i+1][0]-P[i][0])*f,P[i][1]+(P[i+1][1]-P[i][1])*f]}]],
 ["Sóng nước",[t=>[.08+.84*t,.5+.13*Math.sin(t*Math.PI*3)]]],
 ["Trăng khuyết",[t=>{const a=(-100+260*t)*Math.PI/180;return[.5+.33*Math.cos(a),.5+.33*Math.sin(a)]}]],
 ["Chữ Nhân",[t=>[.52-.02*t-.3*t*t,.12+.76*t],t=>[.47+.38*t,.45+.43*t]]]];
function k91Trace(box,env){const C=kg82Canvas(box,1,460),{g,W,H}=C;const lv=env.lv||0;const NR=4;const Figs=kg82Shuf(K91_SH).slice(0,NR);const S0=Math.min(W,H)-30,ox=(W-S0)/2,oy=(H-S0)/2+12,tol=S0*.04*(1+.1*lv)*mgTol(env);
 let r=-1,sum=0,F=null,si=0,ink=null,inks=[],sc=[],phase="",t0=0,LIM=0,done=false;const pops=[];
 const toC=([u,v])=>[ox+u*S0,oy+v*S0];
 const sample=f=>{const P=[];let pr=null;for(let k=0;k<=400;k++){const p=toC(f(k/400));if(!pr||k91Dist(p[0],p[1],pr[0],pr[1])>=4||k===400){P.push(p);pr=p}}return P};
 function next(){r++;if(r>=NR){done=true;return setTimeout(()=>env.end((10*Math.min(1,sum/NR/mgFull(env,.85)))),300)}F={n:Figs[r][0],S:Figs[r][1].map(sample)};si=0;inks=[];sc=[];ink=null;LIM=9000+F.S.length*3500+lv*1000;phase="play";t0=performance.now()}
 const scoreStroke=(G,U)=>mgTraceScore(G,U,tol);/* review/mg-snap: the ONE trace score (jmgt), shared with Thêu theo nét */
 function endFig(){phase="judge";while(sc.length<F.S.length)sc.push(0);const s=sc.reduce((a,b)=>a+b,0)/F.S.length;sum+=s;const w=s>=.85?"★★★":s>=.65?"★★":s>=.4?"★":"✗";/* mg-noword-b: stars, no word */
  F.say=[w,s>=.65?K91C.good():s>=.4?K91C.gold():K91C.red()];setTimeout(next,1300)}
 const stop=k91Loop(now=>{if(!F)return;const left=LIM-(now-t0);if(phase==="play"&&left<=0)endFig();kg82Bg(g,W,H,"ve",0,.7);
  g.fillStyle="rgba(255,252,242,.62)";k91RR(g,ox-6,oy-6,S0+12,S0+12,8);g.fill();
  kg82Spr(g,"ve-inkstone",ox+S0-S0*.07,oy+S0-S0*.05,S0*.16,null,{alpha:.95});
  if(phase==="judge"&&F.say)k91Say(g,F.say[0],F.say[1],ox,oy-12,W-ox-8,"left");else{for(let q=0;q<F.S.length;q++){g.fillStyle=q<si?K91C.good():"#8a735077";g.beginPath();g.arc(ox+7+q*18,oy-17,6,0,Math.PI*2);g.fill()}}
  F.S.forEach((P,k)=>{g.save();g.lineCap="round";g.lineJoin="round";g.strokeStyle=k<si?"#8a735022":k===si?"#8a735040":"#8a735020";g.lineWidth=tol*2;g.beginPath();P.forEach(p=>g.lineTo(p[0],p[1]));g.stroke();
   g.strokeStyle=k===si?"#8a7350aa":"#8a735055";g.lineWidth=1.2;g.setLineDash([3,5]);g.beginPath();P.forEach(p=>g.lineTo(p[0],p[1]));g.stroke();g.restore();
   if(k===si&&phase==="play"){g.fillStyle=K91C.good();g.beginPath();g.arc(P[0][0],P[0][1],7,0,Math.PI*2);g.fill();g.fillStyle="#fff";g.font=k91F(700,10,1);g.textAlign="center";g.textBaseline="middle";g.fillText(String(k+1),P[0][0],P[0][1]+.5)}});
  inks.concat(ink?[ink]:[]).forEach(U=>{g.save();g.lineCap="round";g.lineJoin="round";g.strokeStyle="#1e140e";for(let i=1;i<U.length;i++){const sp=k91Dist(U[i][0],U[i][1],U[i-1][0],U[i-1][1]);g.lineWidth=Math.max(2.5,Math.min(9,9-sp*.35));g.beginPath();g.moveTo(U[i-1][0],U[i-1][1]);g.lineTo(U[i][0],U[i][1]);g.stroke()}g.restore()});
  {const tip=ink&&ink.length?ink[ink.length-1]:null;if(tip)kg82Spr(g,"ve-brush",tip[0],tip[1],S0*.2,null,{ax:.06,ay:.95,alpha:.95})}
  kg82DrawPops(g,pops,now);env.hud({score:mgLive(env,10*Math.min(1,(sum+NR-cl(r+(phase==="judge"?1:0),0,NR))/NR/mgFull(env,.85))),round:`Hồi ${Math.min(r+1,NR)}/${NR}`,time:phase==="play"?`${Math.max(0,Math.ceil(left/1000))} giây`:"–"})});
 k91Pointer(C,{down:(x,y)=>{if(phase!=="play")return;ink=[[x,y]]},move:(x,y)=>{if(ink&&phase==="play"){const l=ink[ink.length-1];if(k91Dist(x,y,l[0],l[1])>=2)ink.push([x,y])}},
  up:()=>{if(!ink||phase!=="play"){ink=null;return}const U=ink;ink=null;if(U.length<4||si>=F.S.length)return;/* mg-balance: a stroke after the last one (before endFig) no longer throws */inks.push(U);sc.push(scoreStroke(F.S[si],U));kg82Pluck(si,sc[si]>.5);si++;if(si>=F.S.length)setTimeout(()=>{if(phase==="play")endFig()},250)}});
 KG82.peek=()=>{if(phase!=="play"||!F||ink||si>=F.S.length)return null;return{drag:F.S[si].filter((p,i,a)=>i%2===0||i===a.length-1).map(p=>{const c=C.client(p[0],p[1]);return[c.x,c.y]})}};
 next();return()=>{done=true;stop()}}

/* =============== 7. ARRANGE (Cắm hoa): drag each stem into the vase; long stem = Thiên (trời), middle = Nhân (người), short = Địa (đất) =============== */
/* painted cut branches img/kit/mg-hoa-<k>-<l|m|s>.webp (long / middle / short) */
const K91_FL=[["Mẫu đơn","#e48aa4","peony"],["Hoa lan","#f4efe6","orchid"],["Cúc vàng","#e8b83a","chrys"],["Hoa mai","#c8303a","plum"],["Đào phai","#f6c1cf","peach"]];
function k91Arrange(box,env){const C=kg82Canvas(box,1.08,480),{g,W,H}=C;const lv=env.lv||0;const NR=3,CNT=[3,4,5];const U=Math.min(W,H*.95)*.5;const MXv=W/2,MYv=H*.6;
 let r=-1,sum=0,P=null,phase="",t0=0,LIM=0,drag=null,done=false;const pops=[];
 const T0=[["Thiên",.98,-14],["Nhân",.7,42],["Địa",.46,-62],["Phụ",.58,74],["Phụ",.84,22]];
 const btn=k91Btns(box,[["k91done","✓","","Cắm xong: chấm bố cục"]]);const bd=btn.querySelector("#k91done");
 function next(){r++;if(r>=NR){done=true;bd.disabled=true;return setTimeout(()=>env.end((10*Math.min(1,sum/NR/mgFull(env,.88)))),300)}const n=CNT[r];
  const tg=T0.slice(0,n).map(([nm,l,a])=>{const ang=(a+(Math.random()*12-6))*Math.PI/180,L=l*U;return{nm,L,ang,x:MXv+L*Math.sin(ang),y:MYv-L*Math.cos(ang)}});
  const fl=kg82Shuf(K91_FL).slice(0,n);const F=kg82Shuf(tg.map((t,i)=>({L:t.L,ti:i,c:fl[i][1],nm:fl[i][0],k:fl[i][2],placed:false,x:0,y:0})));
  const ty=H*.86,tw=(W-16)/n;F.forEach((f,i)=>{f.hx=8+tw*(i+.5);f.hy=ty});P={tg,F,tw};LIM=26000+lv*2000;phase="play";t0=performance.now();drag=null;bd.disabled=false}
 const lenCls=L=>{const s=P.F.map(f=>f.L).sort((a,b)=>a-b);const i=s.indexOf(L);return i===s.length-1?"l":i===0?"s":"m"};
 /* draw a painted branch whose cut end sits at (x0,y0) and whose bloom (≈ 10 % below the picture's top) reaches distance L along angle a */
 const branch=(f,x0,y0,L,a,hl,al)=>kg82Spr(g,`hoa-${f.k}-${lenCls(f.L)}`,x0,y0,null,L/.9,{rot:a,ax:.5,ay:.98,glow:hl?BAL.mgFx.glow:null,alpha:al});
 const lenWord=L=>{const s=P.F.map(f=>f.L).sort((a,b)=>a-b);const i=s.indexOf(L);return i===s.length-1?"dài nhất":i===0?"ngắn nhất":`dài thứ ${s.length-i}`};
 function aimAt(f,x,y){const dx=x-MXv,dy=y-MYv;let a=Math.atan2(dx,-dy);a=cl(a,-Math.PI*.55,Math.PI*.55);f.x=MXv+f.L*Math.sin(a);f.y=MYv-f.L*Math.cos(a)}
 function judge(){phase="judge";bd.disabled=true;const F=P.F,T=P.tg;const placed=F.filter(f=>f.placed);let best=0;
  /* best assignment flower→target (≤5! permutations) */const perm=(a)=>a.length<=1?[a]:a.flatMap((x,i)=>perm(a.slice(0,i).concat(a.slice(i+1))).map(p=>[x].concat(p)));
  for(const p of perm([...T.keys()])){let s=0;F.forEach((f,i)=>{if(!f.placed)return;const t=T[p[i]];const e=k91Dist(f.x,f.y,t.x,t.y)/U;s+=Math.max(0,1-e/(.32*(1+.08*lv)))});if(s>best)best=s}
  const mx=placed.length?placed.reduce((a,f)=>a+f.x,0)/placed.length:MXv,tx=T.reduce((a,t)=>a+t.x,0)/T.length;const bal=Math.max(0,1-Math.abs(mx-tx)/(U*.35));
  const s=.85*best/T.length+.15*bal*(placed.length/T.length);sum+=s;P.say=[s>=.8?"Thế hoa cân đối!":s>=.55?"Khá đẹp":"Còn lệch",s>=.8?K91C.good():s>=.55?K91C.gold():K91C.red()];setTimeout(next,1700)}
 function stemDraw(f,hl){if(branch(f,MXv,MYv+U*.02,f.L+U*.02,Math.atan2(f.x-MXv,MYv-f.y),hl))return;g.save();g.strokeStyle="#4f7f4a";g.lineWidth=3;g.beginPath();g.moveTo(MXv,MYv);g.quadraticCurveTo((MXv+f.x)/2+(f.x-MXv)*.08,(MYv+f.y)/2,f.x,f.y);g.stroke();
  g.fillStyle="#5fa58c";const mx=(MXv*.4+f.x*.6),my=(MYv*.4+f.y*.6);g.beginPath();g.ellipse(mx+8,my,10,4,.6,0,Math.PI*2);g.fill();kg82Blossom(g,f.x,f.y,U*.085,f.c,hl);g.restore()}
 const stop=k91Loop(now=>{if(!P)return;const left=LIM-(now-t0);if(phase==="play"&&left<=0)judge();kg82Bg(g,W,H,"hoa",0,.6);
  /* targets */const ga=r===0?.85:r===1?.6:.4;P.tg.forEach(t=>{g.save();g.globalAlpha=phase==="judge"?.9:ga;g.strokeStyle=K91C.good();g.setLineDash([4,4]);g.lineWidth=1.6;g.beginPath();g.arc(t.x,t.y,U*.1,0,Math.PI*2);g.stroke();g.setLineDash([]);
   g.fillStyle=K91C.good();g.font=k91F(700,11,1);g.textAlign="center";g.textBaseline="middle";g.restore()});
  P.F.forEach(f=>{if(f.placed&&f!==drag)stemDraw(f,false)});if(drag&&drag.f.placed)stemDraw(drag.f,true);
  /* vase: the celadon painting, mouth (36 % of its width) at the stems' root */
  if(kg82Spr(g,"hoa-vase",MXv,MYv-U*.03,U*.24/.36*.9,null,{ay:0})){}else{g.save();const gr=g.createLinearGradient(MXv-U*.3,0,MXv+U*.3,0);gr.addColorStop(0,"#2f5d6e");gr.addColorStop(.5,"#6aa0b0");gr.addColorStop(1,"#2f5d6e");g.fillStyle=gr;
  g.beginPath();g.moveTo(MXv-U*.12,MYv);g.lineTo(MXv+U*.12,MYv);g.bezierCurveTo(MXv+U*.1,MYv+U*.12,MXv+U*.3,MYv+U*.18,MXv+U*.22,MYv+U*.42);g.lineTo(MXv-U*.22,MYv+U*.42);g.bezierCurveTo(MXv-U*.3,MYv+U*.18,MXv-U*.1,MYv+U*.12,MXv-U*.12,MYv);g.fill();
  g.strokeStyle="#f4efe6aa";g.lineWidth=1.5;g.beginPath();g.ellipse(MXv,MYv+U*.25,U*.13,U*.05,0,0,Math.PI*2);g.stroke();g.restore()}
  /* tray: the branches lie ready on the cloth (light wash for legibility) */g.fillStyle="rgba(255,250,236,.5)";g.fillRect(0,H*.8,W,H*.2);
  P.F.forEach(f=>{if(f.placed||(drag&&drag.f===f))return;g.save();const by=H*.955,bh=H*.09+f.L/U*H*.06;
   if(!branch(f,f.hx,by,bh*.9,0,false)){g.strokeStyle="#4f7f4a";g.lineWidth=2.5;g.beginPath();g.moveTo(f.hx,by);g.lineTo(f.hx,by-bh*.6);g.stroke();kg82Blossom(g,f.hx,by-bh*.6,Math.min(U*.07,P.tw*.22),f.c,false)}
   if(phase!=="judge"){g.fillStyle=K91C.ink;g.font=k91F(700,Math.min(12,P.tw*.14),1);g.textAlign="center";g.textBaseline="alphabetic";0}g.restore()});
  /* the verdict sits on the tray (its slip names are hidden meanwhile), clear of the Thiên/Nhân/Địa marks */if(phase==="judge"&&P.say)k91Say(g,P.say[0],P.say[1],W/2,H*.92,W-16);
  if(drag&&!drag.f.placed){g.save();if(!branch(drag.f,drag.x,drag.y+drag.f.L*.5,drag.f.L*.6,0,true))kg82Blossom(g,drag.x,drag.y,U*.08,drag.f.c,true);g.restore()}
  /* balance scale */const pl=P.F.filter(f=>f.placed);if(pl.length){const mx=pl.reduce((a,f)=>a+f.x,0)/pl.length;const tx=P.tg.reduce((a,t)=>a+t.x,0)/P.tg.length;g.fillStyle="#3a2a1e";g.font=k91F(700,11,1);g.textAlign="left";g.textBaseline="top";kg82Lbl(g,"Cân thế hoa",8,8);
   g.strokeStyle=K91C.hair;g.lineWidth=2;g.beginPath();g.moveTo(8,30);g.lineTo(90,30);g.stroke();g.fillStyle=K91C.good();g.fillRect(49-2,24,4,12);g.fillStyle=Math.abs(mx-tx)<U*.1?K91C.good():K91C.red();g.beginPath();g.arc(49+cl((mx-tx)/U*80,-40,40),30,5,0,Math.PI*2);g.fill()}
  kg82DrawPops(g,pops,now);env.hud({score:mgLive(env,10*Math.min(1,(sum+NR-cl(r+(phase==="judge"?1:0),0,NR))/NR/mgFull(env,.88))),round:`Hồi ${Math.min(r+1,NR)}/${NR}`,time:phase==="play"?`${Math.max(0,Math.ceil(left/1000))} giây`:"–"})});
 k91Pointer(C,{down:(x,y)=>{if(phase!=="play")return;let f=P.F.find(f=>f.placed&&k91Dist(x,y,f.x,f.y)<Math.max(26,U*.1));
   if(!f)f=P.F.find(f=>!f.placed&&Math.abs(x-f.hx)<P.tw/2&&y>H*.78);if(f)drag={f,x,y}},
  move:(x,y)=>{if(!drag)return;drag.x=x;drag.y=y;if(y<MYv+U*.05){drag.f.placed=true;aimAt(drag.f,x,y)}else if(!drag.f.placed||y>H*.8){drag.f.placed=false}},
  up:(x,y)=>{if(!drag)return;const f=drag.f;drag=null;if(y<MYv+U*.05){f.placed=true;aimAt(f,x,y);kg82Pluck(1,true)}else f.placed=false}});
 bd.onclick=()=>{if(phase==="play")judge()};
 KG82.peek=()=>{if(phase!=="play"||!P||drag)return null;const f=P.F.find(f=>!f.placed);if(!f)return{sel:"#k91done"};const t=P.tg[f.ti];const a=C.client(f.hx,H*.86),b=C.client(t.x,t.y),m=C.client(MXv,MYv-U*.2);return{drag:[[a.x,a.y],[m.x,m.y],[b.x,b.y]]}};
 next();return()=>{done=true;stop()}}

/* =============== 8. (was UNTANGLE, Khéo tay «Gỡ rối chỉ»): removed by review/mg-craft — Khéo tay plays jcraft_kim «Cắt hoa giấy»; no other caller =============== */

/* =============== 9. COOK (Nấu ăn): hold "Quạt lửa" to keep the fire in the step's zone and put the ingredients in the recipe's order =============== */
const K91_RC=[["Chè hạt sen long nhãn",[["Nước giếng",2],["Hạt sen",1],["Long nhãn",0],["Đường phèn",0]]],["Gà ác tần thuốc bắc",[["Gà ác",2],["Thuốc bắc",1],["Táo đỏ",1],["Kỷ tử",0]]],
 ["Cháo yến sào",[["Gạo tám",2],["Nước dùng",1],["Yến sào",0],["Đường phèn",0]]],["Canh hạt sen hầm xương",[["Xương ống",2],["Hạt sen",1],["Củ sen",1],["Hành ngò",0]]]];
const K91_RX=["Ớt hiểm","Giấm chua","Mắm tôm","Rượu nặng","Muối hột"];
/* ingredient → painting img/kit/mg-banh-<k>.webp */
const K91_ING={"Nước giếng":"nuoc","Hạt sen":"sen","Long nhãn":"nhan","Đường phèn":"duong","Gà ác":"ga","Thuốc bắc":"thuoc","Táo đỏ":"tao","Kỷ tử":"kytu","Gạo tám":"gao","Nước dùng":"dung",
 "Yến sào":"yen","Xương ống":"xuong","Củ sen":"cusen","Hành ngò":"hanh","Ớt hiểm":"ot","Giấm chua":"giam","Mắm tôm":"mam","Rượu nặng":"ruou","Muối hột":"muoi"};
function k91Ing(g,t,x,y,w,h,st,fs){k91Tile(g,x,y,w,h,"",st,fs,"tho-slip");const ic=h*1.02;kg82Spr(g,"banh-"+K91_ING[t.n],x+w/2,y+h/2,ic,ic)}/* picture only: no ingredient name in play */
function k91Cook(box,env){const C=kg82Canvas(box,(box.clientWidth||300)<420?1.25:.95,470),{g,W,H}=C;const lv=env.lv||0;const RCP=K91_RC.length<4||typeof mgpOne!=="function"?kg82Shuf(K91_RC)[0]:(r=>[r.nm,r.steps])(mgpOne("banh"));/* ORDER THIN P1: K91_RC shorter than 4 = a handmade recipe (jwkr) keeps its own; else one of the composed recipes */const [nm,steps]=RCP;const Z=[[.14,.36],[.42,.62],[.68,.88]].map(([a,b])=>{const c=(a+b)/2,h=((b-a)/2+.015*lv)*mgTol(env);return[c-h,c+h]});const ZN=["lửa nhỏ","lửa vừa","lửa lớn"];
 /* mg-balance-2: the fire answers the fan with a LAG and draughts of wind (gusts) push it up or down; both grow as the ease falls (BAL.mgTier.lev.banh) */
 const LAG=Math.max(.02,mgLev(env,"banh","lag")),GUA=mgLev(env,"banh","gust"),GAP=mgLev(env,"banh","gap"),REACH=mgLev(env,"banh","reach"),FAN=.34,COOL=.1;/* her hand: fan heats up to FAN/s, no fan cools COOL/s (one place; the gust cap reads the same two) */let rr=-.1,gu=0,guEnd=0,guNext=GAP*(.6+.8*Math.random());
 const DUR=55000,SIM=3200;let heat=.3,fan=new Set(),si=0,simAt=0,inz=0,qual=[],miss=0,t0=performance.now()+1200,last=performance.now(),drag=null,done=false,msg="";const pops=[];
 const nd=lv>=3?1:2;const tiles=kg82Shuf(steps.map(([n],i)=>({n,i})).concat(kg82Shuf(K91_RX).slice(0,nd).map(n=>({n,i:-1}))));
 const bt=k91Btns(box,[["k91fan",`<img alt="" src="${kg82Img("banh-flame").src}" style="height:2.2em;vertical-align:middle;pointer-events:none"> Quạt lửa`,""]]);const fb=bt.querySelector("#k91fan");fb.dataset.kgkeep=1;
 const on=e=>{e.preventDefault();fan.add(e.pointerId);fb.classList.add("on")},off=e=>{fan.delete(e.pointerId);if(!fan.size)fb.classList.remove("on")};fb.addEventListener("pointerdown",on);["pointerup","pointercancel","pointerleave"].forEach(ev=>fb.addEventListener(ev,off));fb.addEventListener("contextmenu",e=>e.preventDefault());
 const kd=e=>{if(e.key===" "){e.preventDefault();fan.add("k")}},ku=e=>{if(e.key===" ")fan.delete("k")};document.addEventListener("keydown",kd);document.addEventListener("keyup",ku);
 const PX=W*.55,PY=H*.44,PR=Math.min(W*.2,H*.16);const GX=W*.06,GY=Math.max(H*.2,96),GW=Math.max(18,W*.05),GH=H*.46;
 /* ingredient slips on the counter: always inside the board (bottom 30 %), smaller slips when many rows are needed */
 function lay(){g.font=k91F(700,W<420?13:15);const left=tiles.filter(t=>!t.used);let th=40,tw=Math.max(96,Math.max(...tiles.map(t=>g.measureText(t.n).width))+20+th);const per=Math.max(2,Math.floor((W-12)/(tw+6)));
  if(per*(tw+6)-6>W-8)tw=(W-8-6*(per-1))/per;const rows=Math.max(1,Math.ceil(left.length/per)),av=H*.3-4;if(rows*(th+6)>av)th=Math.max(26,av/rows-6);const top=H-rows*(th+6)-2;
  left.forEach((t,k)=>{const row=Math.floor(k/per),col=k%per;const n=Math.min(per,left.length-row*per);const rw=n*(tw+6)-6;t.x=(W-rw)/2+col*(tw+6);t.y=top+row*(th+6);t.w=tw;t.h=th})}
 lay();const score=()=>Math.max(0,(qual.reduce((a,b)=>a+b,0)-.3*miss)/steps.length);
 const whyIt=()=>{const ok=qual.filter(q=>q>.85).length;KG82.why=`Nấu xong ${qual.length}/${steps.length} bước · ${ok} bước đúng lửa · nhầm ${miss} lần`};/* the «Vì sao» row (mg-5s-clear) */
 function add(t){if(si>=steps.length||simAt)return;if(t.i===si){t.used=true;simAt=performance.now();inz=0;lay();kg82Pluck(si,true);msg=""}
  else{miss++;kg82Pluck(0,false);if(t.i<0){t.used=true;lay();kg82Pop(pops,PX,PY-PR-10,"✗",K91C.red())}else kg82Pop(pops,PX,PY-PR-10,"✗",K91C.red())}}
 const stop=k91Loop(now=>{const dt=Math.min(50,now-last)/1000;last=now;const t=now-t0;if(t>=0&&!done){const ts=t/1000;if(GUA>.01&&ts>=guNext){gu=(Math.random()<.5?-1:1)*GUA*(.6+.4*Math.random());gu=gu>0?Math.min(gu,REACH*COOL):Math.max(gu,-REACH*FAN);/* cal-p2b: never past what her hand can answer (cool .1/s, fan .34/s) */guEnd=ts+.7;guNext=ts+GAP*(.6+.8*Math.random());kg82Pop(pops,PX,PY-PR-10,gu>0?"▲":"▼",K91C.gold())}if(ts>=guEnd)gu=0;
   rr+=((fan.size?FAN:-COOL)-rr)*Math.min(1,dt/LAG);heat=cl(heat+(rr+gu)*dt,0,1)}
  const st=steps[Math.min(si,steps.length-1)];const z=Z[st[1]];const inZ=heat>=z[0]&&heat<=z[1];
  if(simAt){inz+=inZ?dt*1000:0;if(now-simAt>=SIM){const q=.4+.6*Math.min(1,inz/SIM);qual.push(q);kg82Pop(pops,PX,PY-PR-10,q>.85?"★★★":q>.6?"★★":"★",q>.85?K91C.good():q>.6?K91C.gold():K91C.red());simAt=0;si++;
   if(si>=steps.length&&!done){done=true;whyIt();setTimeout(()=>env.end((10*score())),900)}}}
  if(t>DUR&&!done){done=true;whyIt();setTimeout(()=>env.end((10*score())),300)}
  kg82Bg(g,W,H,"banh",0,1);
  /* recipe = PICTURES only (owner 20/11 ~05:10Z: no words in a mini-game): the order of the painted ingredients, the heat each needs as flame icons, tick when done */
  {const n=steps.length,cs=Math.min(46,(W-20)/n-30),gap=Math.max(26,Math.min(60,(W-20-n*cs)/n));let rx=10;g.textBaseline="middle";
   steps.forEach(([nn,lvz],i)=>{const cy=8+cs/2+(i===si?0:2),a=i<si?.55:1,sc=i===si?1.12:1;g.save();g.globalAlpha=a;
    if(i===si){g.fillStyle="#ffe9a8";g.strokeStyle=K91C.red();g.lineWidth=3;k91RR(g,rx-4,cy-cs*sc/2-4,cs*sc+8,cs*sc+8,8);g.fill();g.stroke()}
    kg82Spr(g,"banh-"+K91_ING[nn],rx+cs*sc/2,cy,cs*sc,null);g.restore();
    for(let f=0;f<=lvz;f++)kg82Spr(g,"banh-flame",rx+cs*sc+8+f*9,cy+cs*.18,10,null,{ay:1,alpha:i<si?.4:1});
    if(i<si){g.fillStyle=K91C.good();g.font=k91F(700,Math.round(cs*.6),1);g.textAlign="center";g.fillText("✓",rx+cs/2,cy)}
    rx+=cs*sc+gap+lvz*9})}
  /* gauge */g.fillStyle="#fffdf6";g.fillRect(GX,GY,GW,GH);g.strokeStyle=K91C.hair;g.strokeRect(GX,GY,GW,GH);kg82FxLane.zone(g,GX,GY+GH*(1-z[1]),GW,GH*(z[1]-z[0]));/* mg-play2 law 11: was .27 green */
  const hy=GY+GH*(1-heat);const gr=g.createLinearGradient(0,GY+GH,0,GY);gr.addColorStop(0,"#f0b040");gr.addColorStop(1,"#c23b22");g.fillStyle=gr;g.fillRect(GX+3,hy,GW-6,GY+GH-hy);
  g.fillStyle=inZ?K91C.good():K91C.red();g.beginPath();g.moveTo(GX+GW+2,hy);g.lineTo(GX+GW+11,hy-6);g.lineTo(GX+GW+11,hy+6);g.fill();kg82Spr(g,"banh-flame",GX+GW/2,GY+GH+22,18,null,{ay:1});
  {const zy=GY+GH*(1-(z[0]+z[1])/2);for(let f=0;f<=st[1];f++)kg82Spr(g,"banh-flame",GX+GW+30+f*13,zy+8,14,null,{ay:1})}
  /* the painted clay stove, its fire (grows with the heat) in the fire mouth, the painted pot on top */
  {const sw=PR*1.75,sh=sw*kg82SprR("banh-stove"),sy=Math.min(PY+PR*.55,H*.69-sh);if(kg82Spr(g,"banh-stove",PX,sy,sw,sh,{ay:0})){
    const fh=sh*(.16+heat*.44)*(.92+.08*Math.sin(now/80));kg82Spr(g,"banh-flame",PX,sy+sh*.86,sh*.42*(.7+heat*.4),fh,{ay:1,alpha:.55+heat*.45});
    kg82Spr(g,"banh-pot",PX,sy+sh*.12,PR*1.55,null,{ay:1})}
   else{g.fillStyle="#8a5a3a";k91RR(g,PX-PR*1.25,PY+PR*.7,PR*2.5,PR*.85,PR*.12);g.fill();g.fillStyle="#3a2a1e";k91RR(g,PX-PR,PY,PR*2,PR*.95,PR*.25);g.fill()}}
  if(simAt){const k=Math.min(1,(now-simAt)/SIM);g.strokeStyle=K91C.good();g.lineWidth=4;g.beginPath();g.arc(PX,PY+PR*.45,PR*.32,-Math.PI/2,-Math.PI/2+k*Math.PI*2);g.stroke();
   }
  g.save();g.globalAlpha=.35;g.fillStyle="#fff";for(let k=0;k<3;k++){const sx=PX-PR*.4+k*PR*.4,sy=PY-PR*.3-((now/12+k*40)%(PR*.8));g.beginPath();g.arc(sx+Math.sin(now/300+k)*6,sy,PR*.12,0,Math.PI*2);g.fill()}g.restore();
  /* counter: the painted ingredients on paper slips */tiles.forEach(t=>{if(t.used||(drag&&drag.t===t))return;k91Ing(g,t,t.x,t.y,t.w,t.h,"n",W<420?13:15)});if(drag)k91Ing(g,drag.t,drag.x-drag.t.w/2,drag.y-drag.t.h/2,drag.t.w,drag.t.h,"on",W<420?13:15);
  
  {/* owner 21/11 ~00:50Z (mg-5s-clear): one guiding line, driven by the fire and the step */const nn=steps[Math.min(si,steps.length-1)][0],gd=K91C.good(),rd=K91C.red();let tx,tc="#6b4a1c";
   if(si>=steps.length){tx="Món đã xong"}
   else if(simAt){if(inZ){tx="Giữ lửa trong vùng xanh cho chín";tc=gd}else if(heat<z[0]){tx="Lửa yếu · giữ nút quạt";tc=rd}else{tx="Lửa mạnh · buông quạt";tc=rd}}
   else if(inZ){tx=`Lửa đủ · kéo «${nn}» vào nồi`;tc=gd}else if(heat<z[0]){tx=`Giữ nút quạt cho lửa lên vùng xanh (${ZN[st[1]]})`}else{tx="Lửa quá mạnh · buông quạt cho dịu";tc=rd}
   kg82Guide(g,tx,W/2,78,tc,13,W-16)}
  kg82DrawPops(g,pops,now);env.hud({score:mgLive(env,10*cl((qual.reduce((a,b)=>a+b,0)+Math.max(0,steps.length-qual.length)-.3*miss)/steps.length,0,1)),round:`Hồi ${Math.min(si+1,steps.length)}/${steps.length}`,time:`${Math.max(0,Math.ceil((DUR-Math.max(0,t))/1000))} giây`})});
 let dn=null;k91Pointer(C,{down:(x,y)=>{if(done)return;const t=tiles.find(t=>!t.used&&x>=t.x&&x<=t.x+t.w&&y>=t.y&&y<=t.y+t.h);if(t){drag={t,x,y};dn={x,y}}},move:(x,y)=>{if(drag){drag.x=x;drag.y=y}},
  up:(x,y)=>{if(!drag)return;const t=drag.t;drag=null;const moved=dn&&k91Dist(x,y,dn.x,dn.y)>8;dn=null;if(!moved||k91Dist(x,y,PX,PY+PR*.3)<PR*1.4)add(t)}});
 KG82.peek=()=>{if(done||performance.now()<t0)return null;const st=steps[Math.min(si,steps.length-1)],z=Z[st[1]];const mid=(z[0]+z[1])/2;/* a cook who knows the fire: judge by where the heat is heading (lag + gust) */const ahead=heat+(rr+gu)*LAG;const o={hold:ahead<mid,hsel:"#k91fan"};
  if(!simAt&&si<steps.length&&heat>=z[0]+.02&&heat<=z[1]-.02){const t=tiles.find(t=>!t.used&&t.i===si);if(t){const a=C.client(t.x+t.w/2,t.y+t.h/2),b=C.client(PX,PY+PR*.3);o.drag=[[a.x,a.y],[(a.x+b.x)/2,(a.y+b.y)/2],[b.x,b.y]]}}return o};
 return()=>{done=true;stop();document.removeEventListener("keydown",kd);document.removeEventListener("keyup",ku)}}

/* =============== 10. BLEND (Điều hương): move three sliders until your smoke matches the sample's colour; then "Dâng hương" =============== */
const K91_ES=[["Trầm",[122,74,42],"tram"],["Hoa nhài",[236,230,170],"nhai"],["Quế",[200,80,30],"que"],["Hoa hồng",[224,122,154],"hong"],["Bạc hà",[79,176,160],"bacha"],["Đàn hương",[176,136,80],"dan"],["Mộc lan",[160,120,200],"moclan"]];
function k91Blend(box,env){const C=kg82Canvas(box,1,460),{g,W,H}=C;const lv=env.lv||0;const NR=3,LIM=22000+lv*2000;let r=-1,sum=0,P=null,phase="",t0=0,drag=-1,done=false;const pops=[];const HU=[];
 const bt=k91Btns(box,[["k91done","✓","","Dâng hương: chấm độ khớp"]]);const bd=bt.querySelector("#k91done");
 let HI=null;const pick3=()=>{HI=typeof mgpOne==="function"?mgpOne("huong",HU):null;if(HI)return HI.E.map(i=>K91_ES[i]);for(let t=0;t<50;t++){const E=kg82Shuf(K91_ES).slice(0,3);const ok=E.every((a,i)=>E.every((b,j)=>i===j||Math.hypot(a[1][0]-b[1][0],a[1][1]-b[1][1],a[1][2]-b[1][2])>90));if(ok)return E}return K91_ES.slice(0,3)};
 const ratio=v=>{const s=v.reduce((a,b)=>a+b,0);return s>0?v.map(x=>x/s):v.map(()=>1/v.length)};const mix=(E,v)=>{const q=ratio(v);return[0,1,2].map(c=>Math.round(E.reduce((a,e,i)=>a+e[1][c]*q[i],0)))};
 const dist=(a,b)=>{const p=ratio(a),q=ratio(b);return p.reduce((s,x,i)=>s+Math.abs(x-q[i]),0)/2};
 function next(){r++;if(r>=NR){done=true;bd.disabled=true;return setTimeout(()=>env.end((10*sum/NR)),300)}const E=pick3();let tv;if(HI)tv=HI.tv.slice();else do tv=[0,1,2].map(()=>1+Math.floor(Math.random()*6));while(Math.max(...tv)-Math.min(...tv)<2);
  P={E,tv,v:[.5,.5,.5]};phase="play";t0=performance.now();bd.disabled=false}
 /* cal-p2b: ONE round score for the live hint, the verdict and the grade (BAL.mgTier.blend) */const rs=d=>cl(1-d/(BAL.mgTier.blend.w*mgTol(env)),0,1);
 const SL=()=>{const top=H*.47,bot=H*.93,cw=W/3;return[0,1,2].map(i=>({x:cw*(i+.5),top,bot}))};
 function judge(){phase="judge";bd.disabled=true;const d=dist(P.v,P.tv);const s=rs(d),T=BAL.mgTier.blend.star;sum+=s;/* the verdict takes the hint line's place (never drawn over it) */P.verdict=[s>T[2]?"Khớp hương mẫu!":s>T[1]?"Gần giống":"Lệch hương",s>T[2]?K91C.good():s>T[1]?K91C.gold():K91C.red()];setTimeout(next,1500)}
 function smoke(x,y,R,c,lab){/* the painted censer under its live smoke */kg82Spr(g,"huong-censer",x,y+R*.42,R*1.35,null,{ay:0});g.save();const gr=g.createRadialGradient(x,y,R*.1,x,y,R);gr.addColorStop(0,`rgba(${c},1)`);gr.addColorStop(.7,`rgba(${c},.85)`);gr.addColorStop(1,`rgba(${c},0)`);g.fillStyle=gr;g.beginPath();g.arc(x,y,R,0,Math.PI*2);g.fill();
  g.fillStyle=K91C.ink;g.font=k91F(700,12,1);g.textAlign="center";g.textBaseline="alphabetic";kg82Lbl(g,lab,x,y+R*1.85+12);g.restore()}
 const stop=k91Loop(now=>{if(!P)return;const left=LIM-(now-t0);if(phase==="play"&&left<=0)judge();kg82Bg(g,W,H,"huong",.08,.8);
  const R=Math.min(W*.14,H*.095);const tc=mix(P.E,P.tv),mc=mix(P.E,P.v);smoke(W*.27,H*.12,R,tc.join(","),"Hương mẫu");smoke(W*.73,H*.12,R,mc.join(","),"Hương ngươi pha");
  const ls=rs(dist(P.v,P.tv)),T=BAL.mgTier.blend.star;g.font=k91F(700,13,1);g.textAlign="center";
  /* huong-cue (owner OD 21/11 ~00:40Z): the near / far cue with NO word — a lit ring round her smoke + a gauge of T.length segments (one more filled each time the hint gets closer, same BAL.mgTier.blend.star steps as the grade) */
  const stp=T.filter(x=>ls>x).length,sc=stp>=T.length?K91C.good():stp>=T.length-1?K91C.gold():"#6b5643";
  g.save();g.shadowColor=stp>=T.length-1?BAL.mgFx.glow:"transparent";g.shadowBlur=stp*BAL.mgFx.blur/T.length;g.strokeStyle=stp?sc:K91C.hair;g.lineWidth=2+stp*2.5;g.beginPath();g.arc(W*.73,H*.12,R*1.06,0,Math.PI*2);g.stroke();g.restore();
  if(phase==="judge"&&P.verdict)k91Say(g,P.verdict[0],P.verdict[1],W/2,H*.4,W-16);else{/* huong-cue: the guiding words are back (owner OD 21/11 ~00:50Z): how close + which scent the sample leans on */const dom=P.E[P.tv.indexOf(Math.max(...P.tv))][0],d=dist(P.v,P.tv),word=stp>=T.length?"khớp":stp===T.length-1?"rất gần":stp===T.length-2?"đã gần":"còn xa";g.fillStyle=stp>=T.length?K91C.good():stp>=T.length-1?K91C.gold():"#6b5643";g.font=k91F(700,13,1);kg82Lbl(g,`Mẫu nặng về ${dom} · độ khớp: ${word}`,W/2,H*.425,W-16);const n=T.length,sw=Math.min(W*.2,70),sh=16,gap=6,gx=W/2-(n*sw+(n-1)*gap)/2,gy=H*.345-sh/2;
   for(let i=0;i<n;i++){const x=gx+i*(sw+gap);g.save();g.fillStyle=i<stp?sc:"rgba(255,250,238,.55)";g.strokeStyle=i<stp?K91C.ink:K91C.hair;g.lineWidth=2;g.beginPath();g.roundRect(x,gy,sw,sh,sh/2);g.fill();g.stroke();g.restore()}}
  SL().forEach((s,i)=>{const e=P.E[i];g.strokeStyle=K91C.hair;g.lineWidth=6;g.lineCap="round";g.beginPath();g.moveTo(s.x,s.top);g.lineTo(s.x,s.bot-22);g.stroke();
   const y=s.bot-22-(s.bot-22-s.top)*P.v[i];g.strokeStyle=`rgb(${e[1].join(",")})`;g.beginPath();g.moveTo(s.x,s.bot-22);g.lineTo(s.x,y);g.stroke();
   /* knob = the painted jar of that scent */if(!kg82Spr(g,"huong-"+e[2],s.x,y,56,null,{})){g.fillStyle=`rgb(${e[1].join(",")})`;g.strokeStyle="#6e4d0e";g.lineWidth=2;g.beginPath();g.arc(s.x,y,13,0,Math.PI*2);g.fill();g.stroke()}
   g.fillStyle=K91C.ink;g.font=k91F(700,12,1);g.textBaseline="alphabetic";kg82Lbl(g,e[0],s.x,s.bot)});
  kg82DrawPops(g,pops,now);env.hud({score:mgLive(env,10*(sum+NR-cl(r+(phase==="judge"?1:0),0,NR))/NR),round:`Hồi ${Math.min(r+1,NR)}/${NR}`,time:phase==="play"?`${Math.max(0,Math.ceil(left/1000))} giây`:"–"})});
 const setV=(i,y)=>{const s=SL()[i];P.v[i]=cl((s.bot-22-y)/(s.bot-22-s.top),0,1)};
 k91Pointer(C,{down:(x,y)=>{if(phase!=="play")return;if(y<H*.43)return;drag=cl(Math.floor(x/(W/3)),0,2);setV(drag,y)},move:(x,y)=>{if(drag>=0&&phase==="play")setV(drag,y)},up:()=>{drag=-1}});
 bd.onclick=()=>{if(phase==="play")judge()};
 KG82.peek=()=>{if(phase!=="play"||!P||drag>=0)return null;const mx=Math.max(...P.tv);const tv=P.tv.map(x=>x/mx*.9);const i=tv.findIndex((x,k)=>Math.abs(x-P.v[k])>.02);if(i<0)return{sel:"#k91done"};
  const s=SL()[i];const y0=s.bot-22-(s.bot-22-s.top)*P.v[i],y1=s.bot-22-(s.bot-22-s.top)*tv[i];const a=C.client(s.x,y0),b=C.client(s.x,y1);return{drag:[[a.x,a.y],[b.x,(a.y+b.y)/2],[b.x,b.y]]}};
 next();return()=>{done=true;stop()}}

/* ---------- wiring: one engine per kind, new "how" lines ---------- */
Object.assign(KG82_ENG,{hold:k91Hold,fling:k91Fling,trace:k91Trace,arrange:k91Arrange,cook:k91Cook,blend:k91Blend});
Object.assign(KG82_KIND,{
 hat:{e:"hold",n:"Hát",t:"Giữ hơi theo giai điệu",how:"Giữ ngón tay trên ô để lên giọng, buông ra để xuống giọng; giữ đóa hoa trong dải vàng của giai điệu suốt bài ca."},
 dauho:{e:"fling",n:"Đầu hồ",t:"Ném tên vào bình",how:"Đặt ngón tay, kéo ngược về sau rồi buông để ném tên vào miệng bình. Kéo dài thì ném xa; gió đổi mỗi lần. 6 lần ném."},
 ve:{e:"trace",n:"Vẽ",t:"Đồ nét bút",how:"Đặt ngón tay ở chấm xanh rồi đưa theo nét mờ cho kín và đều tay. 4 bức."},
 hoa:{e:"arrange",n:"Cắm hoa",t:"Cắm thế thiên – nhân – địa",how:"Kéo từng cành vào bình, đặt đóa hoa vào vòng của nó: cành dài nhất là Thiên, cành vừa là Nhân, cành ngắn là Địa. Giữ thế hoa cân. 3 bình."},
 banh:{e:"cook",n:"Nấu ăn",t:"Canh lửa nấu món",how:"Giữ nút Quạt lửa cho lửa nằm trong vùng xanh của từng bước, kéo nguyên liệu vào nồi đúng thứ tự công thức và chờ ninh xong. Lửa lên xuống chậm sau tay quạt, lại có gió lùa: buông tay sớm một chút."},
 huong:{e:"blend",n:"Điều hương",t:"Pha hương theo mẫu",how:"Kéo ba thanh trượt để pha ba vị hương cho màu khói giống hương mẫu, rồi chạm Dâng hương. 3 lư hương."}});
KG82_KIND.theu.how="Mũi thêu hiện trên khung rồi khuất. Chạm lại đúng những ô có mũi thêu. 5 hồi.";
/* lessons (Tài nghệ tab): every art plays its own contest game (cam→đàn, ky→cờ, thi→thơ, hoa→vẽ, vu→múa, y→điều hương, theu→thêu, nau→nấu ăn) */
Object.assign(KG82_MGL,{cam:["Cầm: tấu khúc","dan"],ky:["Kỳ: ăn quân","co"],thi:["Thi: điền câu lục bát","tho"],hoa:["Họa: đồ nét bút","ve"],vu:["Vũ: theo bước múa","mua"],
 y:["Y thuật & điều hương: pha hương","huong"],theu:["Thêu: nhớ mẫu thêu","theu"],nau:["Nấu nướng: canh lửa nấu món","banh"]});
/* ---------- mg-craft (owner OD 20/11 ~08:15Z: each craft its OWN real mechanic, tracing only for Chép kinh; dev/design/MG_CRAFTS.md) ----------
   THE ONE PLACE that maps the craft kinds to their new engines. A kind switches the moment its engine registers (jcraft.js crReg, called by
   jcraft_kim / jcraft_ve / jcraft_hoa, and by jtd for td_cong = the stitch board of jcraft_theu; owner 21/11 ~01:05Z: Thêu keeps the j82 pattern game); until then it keeps the engine above. Kind KEYS stay (ve, hoa, kim, td_cong): every caller (startContest,
   playArt, lessons, jexam, jentry, Thử tay, works j83) and old saves keep working. e = engine · t / how = the rules screen (kgReady; text is allowed there,
   never in play, OD 20/11 ~05:10Z) · demo = the KG82_DEMO move picture · mgl = the lesson label (KG82_MGL) when the kind is a lesson art · spr = the sprites preloaded (KG82_SPR; [] while the board draws stand-ins). */
const KG82_CRAFT={
 kim:{e:"papercut",t:"Cắt hoa giấy",demo:"drag",spr:[],
  how:"Hoa giấy mẫu treo bên trái; bên phải là tờ giấy đỏ đã gấp. Kéo hình kéo cắt (trăng, tam giác, giọt) đặt lên tờ gấp ở chỗ mở ra sẽ thành lỗ của mẫu, rồi chạm ✓ để mở giấy. Lỗ trùng mẫu sáng lên, lỗ thừa bị trừ. 3 tờ."},
 ve:{e:"inkwash",t:"Thủy mặc",demo:"drag",mgl:"Họa: thủy mặc",
  how:"Bức mẫu của thầy ghim ở góc. Kéo núi, nước, thuyền, tùng đặt lên cuộn lụa đúng chỗ như mẫu: càng cao càng xa, càng nhỏ và nhạt. Rồi chạm ✓: giữ bút trên nghiên cho mực đậm dần, buông đúng sắc mực của lớp đang sáng và quệt lên lớp ấy. Mực lan vào chỗ trống thì thành vết. 3 bức."},
 hoa:{e:"ikebana",t:"Chọn mùa · cắt cành · nghiêng thế",demo:"drag",
  how:"Chạm đúng loài hoa của mùa trong cửa sổ (đông mai, hạ sen, thu cúc, xuân đào); hoa trái mùa sẽ héo. Vuốt ngang cành nằm trên khăn để cắt cho dài đúng so với bình: Thiên cao nhất, Nhân kém ba phần tư, Địa lại kém ba phần tư nữa. Kéo cành đã cắt vào miệng bình, rồi kéo ngọn cho nghiêng đúng thế. 3 bình."},
 td_cong:{e:"stitch",t:"Thêu theo nét",demo:"tap",spr:[],/* owner 21/11 ~01:05Z: Thêu keeps «Nhớ mẫu thêu»; the stitch board serves the Công lesson (jtd registers it) */
  how:"Mẫu thêu nhỏ ở góc khung. Dải sáng trên khung là chỗ thêu kế: chạm cuộn chỉ cùng sắc với dải ấy trong mẫu, rồi chạm khung đúng lúc kim chúc xuống chấm sáng để gieo mũi. Lệch nhịp thì mũi lỏng, phải gieo lại. Thêu từ dải đậm ở mép vào dải nhạt ở lòng hoa. 3 tấm."}};
/* jreg: engines is read when asked, so engines of later modules (jnwp, jwkg…) are listed */
window.K91={get engines(){return Object.keys(KG82_ENG)},kinds:()=>Object.fromEntries(Object.entries(KG82_KIND).map(([k,v])=>[k,v.e]))};
