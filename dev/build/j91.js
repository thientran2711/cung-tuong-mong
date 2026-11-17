/* ================= j91 MỖI MÔN MỘT TRÒ (owner 11/14: "5 câu hỏi chọn đáp án không phải minigame") =================
   Every contest kind of j82 / j71 (and every lesson art) now has its OWN mechanic; no two kinds share one.
   Table (dev/MINIGAMES.md):  dan rhythm · hat hold (giữ hơi theo giai điệu) · co go · dauho fling (kéo thả ném tên) · ban aim ·
     tho verse (kéo chữ vào câu bát, đúng vần) · doi pair (nối chữ đối) · doden lamp (jlant.js: thắp đèn theo mẫu) ·
     ve trace (đồ nét) · hoa arrange (cắm hoa thiên–nhân–địa) · theu pattern · kim untangle (gỡ rối chỉ) · mua steps ·
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
function k91Say(g,t,col,x,y,maxW,align){g.save();g.fillStyle=col;g.font=`700 16px ${kg82Col("--display","serif")||"serif"}`;g.textAlign=align||"center";g.textBaseline="alphabetic";kg82Lbl(g,t,x,y,maxW);g.restore()}
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
function k91Btns(box,list){const d=document.createElement("div");d.className="kg82act";d.innerHTML=list.map(([id,t,s])=>`<button class="kgbtn" id="${id}">${t}${s?`<small>${s}</small>`:""}</button>`).join("");box.appendChild(d);return d}
function k91Loop(fn){let stop=false,raf=0;const L=now=>{if(stop)return;fn(now);if(!stop)raf=requestAnimationFrame(L)};raf=requestAnimationFrame(L);return()=>{stop=true;cancelAnimationFrame(raf)}}
const k91Dist=(a,b,c,d)=>Math.hypot(a-c,b-d);
function k91SegX(a,b,c,d){const o=(p,q,r)=>Math.sign((q[0]-p[0])*(r[1]-p[1])-(q[1]-p[1])*(r[0]-p[0]));return o(a,b,c)!==o(a,b,d)&&o(c,d,a)!==o(c,d,b)&&o(a,b,c)!==0&&o(c,d,a)!==0}

/* =============== 1. HOLD (Hát): keep a finger down to raise the voice, lift to lower; follow the melody ribbon =============== */
const K91_CA=["Gió đưa cành trúc la đà","Tiếng chuông Trấn Vũ canh gà Thọ Xương","Mịt mù khói tỏa ngàn sương","Nhịp chày Yên Thái mặt gương Tây Hồ"];
function k91Hold(box,env){const C=kg82Canvas(box,.9,430),{g,W,H}=C;const lv=env.lv||0;const DUR=20000,SPD=W*.2/1000,MX=W*.24,band=H*(.075+.007*lv)*mgTol(env),V=H*.72/1000;
 const ph=[Math.random()*6,Math.random()*6,Math.random()*6];const cy=t=>H*.5+H*.19*Math.sin(t/1000*1.05+ph[0])+H*.08*Math.sin(t/1000*2.2+ph[1])+H*.035*Math.sin(t/1000*3.5+ph[2]);
 const words=[];K91_CA.forEach((l,i)=>{const w=l.split(" ");w.forEach((x,j)=>words.push({x,t:i*5000+300+j*(4400/w.length),c:i}))});
 let y=H*.5,vy=0,held=new Set(),t0=performance.now()+1600,last=performance.now(),inb=0,tot=0,done=false;const pops=[];
 const ratio=()=>tot?Math.min(1,inb/tot/mgFull(env,.82)):0;
 const stop=k91Loop(now=>{const dt=Math.min(50,now-last);last=now;const t=now-t0;const tgt=held.size?-V:V;vy+=(tgt-vy)*Math.min(1,dt/80);y=cl(y+vy*dt,H*.06,H*.94);
  const ok=t>=0&&Math.abs(y-cy(t))<band;if(t>=0&&t<=DUR){tot+=dt;if(ok)inb+=dt}
  kg82Bg(g,W,H,"hat",.06,.75);
  /* ribbon */const ta=t-MX/SPD,tb=t+(W-MX)/SPD;g.save();g.beginPath();for(let tt=ta;tt<=tb;tt+=40){const x=MX+(tt-t)*SPD;g.lineTo(x,cy(tt)-band)}for(let tt=tb;tt>=ta;tt-=40){const x=MX+(tt-t)*SPD;g.lineTo(x,cy(tt)+band)}g.closePath();
  g.fillStyle="rgba(255,226,140,.38)";g.fill();g.setLineDash([4,6]);g.strokeStyle=K91C.gold();g.lineWidth=1.4;g.beginPath();for(let tt=ta;tt<=tb;tt+=40){const x=MX+(tt-t)*SPD;g.lineTo(x,cy(tt))}g.stroke();g.restore();
  /* lyric words on the ribbon (from the start: the countdown and its hint own the board before) */g.font=k91F(600,Math.max(12,Math.min(16,W/30)));g.textAlign="center";g.textBaseline="alphabetic";
  if(t>=0)for(const w of words){if(w.t<ta-500||w.t>tb+500||w.t>DUR)continue;const x=MX+(w.t-t)*SPD;g.fillStyle=Math.abs(w.t-t)<350?K91C.red():"#3a2a1e";kg82Lbl(g,w.x,x,cy(w.t)-band-6)}
  g.fillStyle="#c23b2233";g.fillRect(MX-1,0,2,H);
  {const lr=Math.min(24,W*.05);if(!kg82Spr(g,"hat-lotus",MX,y,lr*2,null,{alpha:ok?1:.6,glow:ok?"#fff2b0":null,blur:16}))kg82Blossom(g,MX,y,lr*.7,ok?K91C.pk():"#b9a58a",ok)}
  if(t<0){g.fillStyle=K91C.ink;g.font=k91F(700,24);kg82Lbl(g,String(Math.ceil(-t/1000)),W/2,H*.2);g.font=k91F(700,13,1);g.fillStyle="#3a2a1e";kg82Lbl(g,"Giữ ngón tay: lên giọng · buông: xuống giọng",W/2,H*.2+22,W-16)}
  kg82DrawPops(g,pops,now);
  env.hud({score:`${Math.round(10*ratio())}/10`,round:`Hồi ${cl(1+Math.floor(Math.max(0,t)/5000),1,4)}/4`,time:`${Math.max(0,Math.ceil((DUR-Math.max(0,t))/1000))} giây`});
  if(t>DUR&&!done){done=true;setTimeout(()=>env.end((10*ratio())),200)}});
 k91Pointer(C,{down:(x,y,id)=>held.add(id),up:(x,y,id)=>held.delete(id)});
 const kd=e=>{if(e.key===" "){e.preventDefault();held.add("k")}},ku=e=>{if(e.key===" ")held.delete("k")};document.addEventListener("keydown",kd);document.addEventListener("keyup",ku);
 KG82.peek=()=>{const t=performance.now()-t0;if(t<0||done)return null;const p=C.client(W/2,H/2);return{hold:y>cy(t+120)+2,x:p.x,y:p.y}};
 return()=>{done=true;stop();document.removeEventListener("keydown",kd);document.removeEventListener("keyup",ku)}}

/* =============== 2. FLING (Đầu hồ): drag back and release to throw the arrow; wind changes every throw =============== */
function k91Fling(box,env){const C=kg82Canvas(box,.85,430),{g,W,H}=C;const lv=env.lv||0;const N=6,U=Math.min(W,H);
 const AIDT=mgLev(env,"dauho","aid");/* seconds of flight shown by the aim dots */const X0=W*.13,Y0=H*.8,GR=H*1.9,K=5.4,MAXD=U*.45,MY=H*.5,EAR=1.6;let px=0,mh=0,wd=0,k=0,pts=0,phase="aim",aim=null,fly=null,sol=null,landed=[],done=false;const pops=[];
 const setThrow=()=>{px=W*(.6+Math.random()*.22);mh=U*.05*mgLev(env,"dauho","mouth");/* mg-balance-2: mouth size by ease (BAL.mgTier.lev.dauho) */wd=(Math.random()*2-1)*H*.55*(k/N);aim=null;fly=null;sol=null;phase="aim"};setThrow();
 const vOf=(ax,ay,cx,cy)=>{let dx=cx-ax,dy=cy-ay;const L=Math.hypot(dx,dy);if(L>MAXD){dx*=MAXD/L;dy*=MAXD/L}return[-dx*K,-dy*K]};
 function sim(vx,vy,cb){let x=X0,y=Y0,t=0;const dt=1/120;for(let i=0;i<600;i++){const py=y;vx+=wd*dt;vy+=GR*dt;x+=vx*dt;y+=vy*dt;t+=dt;if(cb&&cb(x,y,t)===false)return null;
   if(py<MY&&y>=MY&&vy>0){const d=Math.abs(x-px);if(d<mh*.5)return{q:1,x,t};if(d<mh)return{q:.7,x,t};if(Math.abs(d-mh*EAR)<mh*.45)return{q:.5,x,t}}if(y>H+40||x>W+40||x<-40)return{q:0,x,t}}return{q:0,x,t}}
 function solve(){if(sol)return sol;let best=null;for(let a=30;a<=78;a+=1)for(let v=200;v<=MAXD*K;v+=4){const r=Math.PI*a/180,vx=v*Math.cos(r),vy=-v*Math.sin(r);const s=sim(vx,vy);if(s&&s.q===1){const d=Math.abs(s.x-px);if(!best||d<best.d)best={d,vx,vy}}}
  sol=best||{vx:300,vy:-400};return sol}
 function pot(g){const x=px,y=MY;/* the bronze pitch-pot painting: mouth = 42 % of its width */
  if(kg82Spr(g,"dauho-pot",x,y-mh*.35,mh*2/.42,null,{ay:0}))return;g.save();const gr=g.createLinearGradient(x-mh*3,0,x+mh*3,0);gr.addColorStop(0,"#6e4d0e");gr.addColorStop(.5,"#c9a03a");gr.addColorStop(1,"#6e4d0e");g.fillStyle=gr;
  g.beginPath();g.moveTo(x-mh,y);g.lineTo(x+mh,y);g.bezierCurveTo(x+mh*.9,y+mh*1.6,x+mh*3.2,y+mh*2.4,x+mh*2.6,y+mh*5.4);g.lineTo(x-mh*2.6,y+mh*5.4);g.bezierCurveTo(x-mh*3.2,y+mh*2.4,x-mh*.9,y+mh*1.6,x-mh,y);g.fill();
  [-1,1].forEach(s=>{g.fillRect(x+s*mh*2.2-mh*.5,y,mh,mh*1.6);g.fillStyle="#2a1a12";g.beginPath();g.ellipse(x+s*mh*2.2,y,mh*.5,mh*.18,0,0,Math.PI*2);g.fill();g.fillStyle=gr});
  g.fillStyle="#2a1a12";g.beginPath();g.ellipse(x,y,mh,mh*.3,0,0,Math.PI*2);g.fill();g.restore()}
 function arrow(g,x,y,ang,len){if(kg82Spr(g,"dauho-arrow",x,y,len*1.25,null,{rot:ang,ax:.98,ay:.5}))return;g.save();g.translate(x,y);g.rotate(ang);g.strokeStyle="#4a3010";g.lineWidth=2.2;g.beginPath();g.moveTo(-len,0);g.lineTo(0,0);g.stroke();g.fillStyle=K91C.red();g.beginPath();g.moveTo(4,0);g.lineTo(-6,-4);g.lineTo(-6,4);g.fill();
  g.fillStyle="#f6ead6";g.strokeStyle="#8a7350";g.lineWidth=1;g.beginPath();g.moveTo(-len,0);g.lineTo(-len-8,-5);g.lineTo(-len+6,0);g.lineTo(-len-8,5);g.closePath();g.fill();g.stroke();g.restore()}
 const stop=k91Loop(now=>{kg82Bg(g,W,H,"dauho",0,.75);pot(g);
  landed.forEach(a=>arrow(g,px+a.dx,MY+mh*.4,a.ang,U*.11));
  /* wind */const wl=Math.abs(wd)/(H*.55);g.fillStyle="#3a2a1e";g.font=k91F(700,13,1);g.textAlign="left";g.textBaseline="top";kg82Lbl(g,wl<.05?"Gió lặng":`Gió ${wd<0?"ngược":"xuôi"} ${wl<.35?"nhẹ":wl<.7?"vừa":"mạnh"}`,10,10);
  if(wl>=.05){const ax=10,ay=34,L=20+40*wl;g.strokeStyle="#6b5643";g.lineWidth=2;g.beginPath();g.moveTo(ax+(wd<0?L:0),ay);g.lineTo(ax+(wd<0?0:L),ay);g.stroke();const hx=ax+(wd<0?0:L),s=wd<0?1:-1;g.beginPath();g.moveTo(hx,ay);g.lineTo(hx+6*s,ay-4);g.lineTo(hx+6*s,ay+4);g.fill()}
  if(phase==="aim"){let vx=0,vy=0;if(aim){[vx,vy]=vOf(aim.ax,aim.ay,aim.cx,aim.cy)}const ang=aim?Math.atan2(vy,vx):-Math.PI/4;arrow(g,X0,Y0,ang,U*.12);
   if(aim&&Math.hypot(vx,vy)>40){const T=AIDT;g.fillStyle="#8a2a1e";sim(vx,vy,(x,y,t)=>{if(t>T)return false;if(Math.round(t*120)%5===0){g.beginPath();g.arc(x,y,2.2,0,Math.PI*2);g.fill()}});
    g.strokeStyle="#8a735088";g.setLineDash([3,4]);g.beginPath();g.moveTo(aim.ax,aim.ay);g.lineTo(aim.cx,aim.cy);g.stroke();g.setLineDash([])}
   else{g.fillStyle="#3a2a1e";g.textAlign="center";g.font=k91F(700,13,1);kg82Lbl(g,"Kéo ngược về sau rồi buông tay",W/2,H*.95,W-16)}}
  if(phase==="fly"&&fly){const dt=1/60;for(let i=0;i<2;i++){fly.vx+=wd*dt/2;fly.vy+=GR*dt/2;const py=fly.y;fly.x+=fly.vx*dt/2;fly.y+=fly.vy*dt/2;
    if(py<MY&&fly.y>=MY&&fly.vy>0){const d=Math.abs(fly.x-px);const q=d<mh*.5?1:d<mh?.7:Math.abs(d-mh*EAR)<mh*.45?.5:0;if(q>0){land(q,fly.x,Math.atan2(fly.vy,fly.vx));break}}
    if(fly.y>H*.9||fly.x>W+20||fly.x<-20){land(0,fly.x,0);break}}
   if(fly)arrow(g,fly.x,fly.y,Math.atan2(fly.vy,fly.vx),U*.12)}
  kg82DrawPops(g,pops,now);env.hud({score:`${Math.round(10*pts/N)}/10`,round:`Hồi ${Math.min(k+1,N)}/${N}`,time:`${N-k} tên`})});
 function land(q,x,ang){fly=null;phase="wait";pts+=q;if(q>0)landed.push({dx:x-px,ang});kg82Pop(pops,px,MY-mh*2,q===1?"Trúng giữa bình!":q>=.7?"Vào bình":q>0?"Vào tai bình":"Trượt",q>=.7?K91C.good():q>0?K91C.gold():K91C.red());kg82Pluck(k,q>0);k++;
  if(k>=N){done=true;setTimeout(()=>env.end((10*pts/N)),700)}else setTimeout(setThrow,700)}
 k91Pointer(C,{down:(x,y)=>{if(phase==="aim")aim={ax:x,ay:y,cx:x,cy:y}},move:(x,y)=>{if(aim&&phase==="aim"){aim.cx=x;aim.cy=y}},
  up:(x,y)=>{if(!aim||phase!=="aim")return;aim.cx=x;aim.cy=y;const [vx,vy]=vOf(aim.ax,aim.ay,x,y);aim=null;if(Math.hypot(vx,vy)<60)return;fly={x:X0,y:Y0,vx,vy};phase="fly"}});
 KG82.peek=()=>{if(phase!=="aim"||done||aim)return null;const s=solve();const a=C.client(W/2,H*.35),b=C.client(W/2-s.vx/K,H*.35-s.vy/K);/* aim: a player watches the aim dots while pulling, so the longer the dots the finer the release (dev/measure/mg-bots.js scales its drag scatter by it) */
  return{drag:[[a.x,a.y],[(a.x+b.x)/2,(a.y+b.y)/2],[b.x,b.y]],aim:Math.min(1,.1/Math.max(.05,AIDT))}};
 return()=>{done=true;stop()}}

/* ---------- mg-easy: shared bits of the three "verse/pair/riddle" games ---------- */
/* rhyme part of a syllable without the tone (người → ươi, ngài → ai, quang → ang, đau → au): shown on the board so a rhyme is matched by eye, not by knowing old verse */
function k91End(w){const t=String(w).normalize("NFD").replace(/[̣̀́̃̉]/g,"").normalize("NFC").toLowerCase();const V="aăâeêioôơuưy";let i=0;
 if(/^qu./.test(t))i=2;else if(/^gi./.test(t)&&V.includes(t[2]))i=2;while(i<t.length&&!V.includes(t[i]))i++;return t.slice(i)}
/* one-screen "how to play" card, shown the first time a kind is played (S.mgSeen); lives inside the game box, closed with the kit button */
function k91DemoCard(box,key,o){if(kg82Seen(key))return null;const bt=k91Btns(box,[["k91demo","Đã hiểu, bắt đầu"]]);const D={on:true};
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
 function endFig(){phase="judge";while(sc.length<F.S.length)sc.push(0);const s=sc.reduce((a,b)=>a+b,0)/F.S.length;sum+=s;const w=s>=.85?"Nét thần!":s>=.65?"Nét vững":s>=.4?"Tạm được":"Nét run";
  F.say=[`${F.n}: ${w}`,s>=.65?K91C.good():s>=.4?K91C.gold():K91C.red()];setTimeout(next,1300)}
 const stop=k91Loop(now=>{if(!F)return;const left=LIM-(now-t0);if(phase==="play"&&left<=0)endFig();kg82Bg(g,W,H,"ve",0,.7);
  g.fillStyle="rgba(255,252,242,.62)";k91RR(g,ox-6,oy-6,S0+12,S0+12,8);g.fill();
  kg82Spr(g,"ve-inkstone",ox+S0-S0*.07,oy+S0-S0*.05,S0*.16,null,{alpha:.95});
  if(phase==="judge"&&F.say)k91Say(g,F.say[0],F.say[1],ox,oy-12,W-ox-8,"left");else{g.fillStyle="#3a2a1e";g.font=k91F(700,12,1);g.textAlign="left";g.textBaseline="alphabetic";kg82Lbl(g,F.n.toUpperCase(),ox,oy-12)}
  F.S.forEach((P,k)=>{g.save();g.lineCap="round";g.lineJoin="round";g.strokeStyle=k<si?"#8a735022":k===si?"#8a735040":"#8a735020";g.lineWidth=tol*2;g.beginPath();P.forEach(p=>g.lineTo(p[0],p[1]));g.stroke();
   g.strokeStyle=k===si?"#8a7350aa":"#8a735055";g.lineWidth=1.2;g.setLineDash([3,5]);g.beginPath();P.forEach(p=>g.lineTo(p[0],p[1]));g.stroke();g.restore();
   if(k===si&&phase==="play"){g.fillStyle=K91C.good();g.beginPath();g.arc(P[0][0],P[0][1],7,0,Math.PI*2);g.fill();g.fillStyle="#fff";g.font=k91F(700,10,1);g.textAlign="center";g.textBaseline="middle";g.fillText(String(k+1),P[0][0],P[0][1]+.5)}});
  inks.concat(ink?[ink]:[]).forEach(U=>{g.save();g.lineCap="round";g.lineJoin="round";g.strokeStyle="#1e140e";for(let i=1;i<U.length;i++){const sp=k91Dist(U[i][0],U[i][1],U[i-1][0],U[i-1][1]);g.lineWidth=Math.max(2.5,Math.min(9,9-sp*.35));g.beginPath();g.moveTo(U[i-1][0],U[i-1][1]);g.lineTo(U[i][0],U[i][1]);g.stroke()}g.restore()});
  {const tip=ink&&ink.length?ink[ink.length-1]:null;if(tip)kg82Spr(g,"ve-brush",tip[0],tip[1],S0*.2,null,{ax:.06,ay:.95,alpha:.95})}
  kg82DrawPops(g,pops,now);env.hud({score:`${Math.round(10*Math.min(1,sum/NR/mgFull(env,.85)))}/10`,round:`Hồi ${Math.min(r+1,NR)}/${NR}`,time:phase==="play"?`${Math.max(0,Math.ceil(left/1000))} giây`:"–"})});
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
 const btn=k91Btns(box,[["k91done","Cắm xong","chấm bố cục"]]);const bd=btn.querySelector("#k91done");
 function next(){r++;if(r>=NR){done=true;bd.disabled=true;return setTimeout(()=>env.end((10*Math.min(1,sum/NR/mgFull(env,.88)))),300)}const n=CNT[r];
  const tg=T0.slice(0,n).map(([nm,l,a])=>{const ang=(a+(Math.random()*12-6))*Math.PI/180,L=l*U;return{nm,L,ang,x:MXv+L*Math.sin(ang),y:MYv-L*Math.cos(ang)}});
  const fl=kg82Shuf(K91_FL).slice(0,n);const F=kg82Shuf(tg.map((t,i)=>({L:t.L,ti:i,c:fl[i][1],nm:fl[i][0],k:fl[i][2],placed:false,x:0,y:0})));
  const ty=H*.86,tw=(W-16)/n;F.forEach((f,i)=>{f.hx=8+tw*(i+.5);f.hy=ty});P={tg,F,tw};LIM=26000+lv*2000;phase="play";t0=performance.now();drag=null;bd.disabled=false}
 const lenCls=L=>{const s=P.F.map(f=>f.L).sort((a,b)=>a-b);const i=s.indexOf(L);return i===s.length-1?"l":i===0?"s":"m"};
 /* draw a painted branch whose cut end sits at (x0,y0) and whose bloom (≈ 10 % below the picture's top) reaches distance L along angle a */
 const branch=(f,x0,y0,L,a,hl,al)=>kg82Spr(g,`hoa-${f.k}-${lenCls(f.L)}`,x0,y0,null,L/.9,{rot:a,ax:.5,ay:.98,glow:hl?"#fff3b0":null,blur:16,alpha:al});
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
   g.fillStyle=K91C.good();g.font=k91F(700,11,1);g.textAlign="center";g.textBaseline="middle";kg82Lbl(g,t.nm,t.x,t.y-U*.1-8);g.restore()});
  P.F.forEach(f=>{if(f.placed&&f!==drag)stemDraw(f,false)});if(drag&&drag.f.placed)stemDraw(drag.f,true);
  /* vase: the celadon painting, mouth (36 % of its width) at the stems' root */
  if(kg82Spr(g,"hoa-vase",MXv,MYv-U*.03,U*.24/.36*.9,null,{ay:0})){}else{g.save();const gr=g.createLinearGradient(MXv-U*.3,0,MXv+U*.3,0);gr.addColorStop(0,"#2f5d6e");gr.addColorStop(.5,"#6aa0b0");gr.addColorStop(1,"#2f5d6e");g.fillStyle=gr;
  g.beginPath();g.moveTo(MXv-U*.12,MYv);g.lineTo(MXv+U*.12,MYv);g.bezierCurveTo(MXv+U*.1,MYv+U*.12,MXv+U*.3,MYv+U*.18,MXv+U*.22,MYv+U*.42);g.lineTo(MXv-U*.22,MYv+U*.42);g.bezierCurveTo(MXv-U*.3,MYv+U*.18,MXv-U*.1,MYv+U*.12,MXv-U*.12,MYv);g.fill();
  g.strokeStyle="#f4efe6aa";g.lineWidth=1.5;g.beginPath();g.ellipse(MXv,MYv+U*.25,U*.13,U*.05,0,0,Math.PI*2);g.stroke();g.restore()}
  /* tray: the branches lie ready on the cloth (light wash for legibility) */g.fillStyle="rgba(255,250,236,.5)";g.fillRect(0,H*.8,W,H*.2);
  P.F.forEach(f=>{if(f.placed||(drag&&drag.f===f))return;g.save();const by=H*.955,bh=H*.09+f.L/U*H*.06;
   if(!branch(f,f.hx,by,bh*.9,0,false)){g.strokeStyle="#4f7f4a";g.lineWidth=2.5;g.beginPath();g.moveTo(f.hx,by);g.lineTo(f.hx,by-bh*.6);g.stroke();kg82Blossom(g,f.hx,by-bh*.6,Math.min(U*.07,P.tw*.22),f.c,false)}
   if(phase!=="judge"){g.fillStyle=K91C.ink;g.font=k91F(700,Math.min(12,P.tw*.14),1);g.textAlign="center";g.textBaseline="alphabetic";kg82Lbl(g,lenWord(f.L),f.hx,H*.99,P.tw-4)}g.restore()});
  /* the verdict sits on the tray (its slip names are hidden meanwhile), clear of the Thiên/Nhân/Địa marks */if(phase==="judge"&&P.say)k91Say(g,P.say[0],P.say[1],W/2,H*.92,W-16);
  if(drag&&!drag.f.placed){g.save();if(!branch(drag.f,drag.x,drag.y+drag.f.L*.5,drag.f.L*.6,0,true))kg82Blossom(g,drag.x,drag.y,U*.08,drag.f.c,true);g.restore()}
  /* balance scale */const pl=P.F.filter(f=>f.placed);if(pl.length){const mx=pl.reduce((a,f)=>a+f.x,0)/pl.length;const tx=P.tg.reduce((a,t)=>a+t.x,0)/P.tg.length;g.fillStyle="#3a2a1e";g.font=k91F(700,11,1);g.textAlign="left";g.textBaseline="top";kg82Lbl(g,"Cân thế hoa",8,8);
   g.strokeStyle=K91C.hair;g.lineWidth=2;g.beginPath();g.moveTo(8,30);g.lineTo(90,30);g.stroke();g.fillStyle=K91C.good();g.fillRect(49-2,24,4,12);g.fillStyle=Math.abs(mx-tx)<U*.1?K91C.good():K91C.red();g.beginPath();g.arc(49+cl((mx-tx)/U*80,-40,40),30,5,0,Math.PI*2);g.fill()}
  kg82DrawPops(g,pops,now);env.hud({score:`${Math.round(10*Math.min(1,sum/NR/mgFull(env,.88)))}/10`,round:`Hồi ${Math.min(r+1,NR)}/${NR}`,time:phase==="play"?`${Math.max(0,Math.ceil(left/1000))} giây`:"–"})});
 k91Pointer(C,{down:(x,y)=>{if(phase!=="play")return;let f=P.F.find(f=>f.placed&&k91Dist(x,y,f.x,f.y)<Math.max(26,U*.1));
   if(!f)f=P.F.find(f=>!f.placed&&Math.abs(x-f.hx)<P.tw/2&&y>H*.78);if(f)drag={f,x,y}},
  move:(x,y)=>{if(!drag)return;drag.x=x;drag.y=y;if(y<MYv+U*.05){drag.f.placed=true;aimAt(drag.f,x,y)}else if(!drag.f.placed||y>H*.8){drag.f.placed=false}},
  up:(x,y)=>{if(!drag)return;const f=drag.f;drag=null;if(y<MYv+U*.05){f.placed=true;aimAt(f,x,y);kg82Pluck(1,true)}else f.placed=false}});
 bd.onclick=()=>{if(phase==="play")judge()};
 KG82.peek=()=>{if(phase!=="play"||!P||drag)return null;const f=P.F.find(f=>!f.placed);if(!f)return{sel:"#k91done"};const t=P.tg[f.ti];const a=C.client(f.hx,H*.86),b=C.client(t.x,t.y),m=C.client(MXv,MYv-U*.2);return{drag:[[a.x,a.y],[m.x,m.y],[b.x,b.y]]}};
 next();return()=>{done=true;stop()}}

/* =============== 8. UNTANGLE (Khéo tay): drag the knots until no two silk threads cross =============== */
function k91Untangle(box,env){const C=kg82Canvas(box,1,460),{g,W,H}=C;const lv=env.lv||0;const NR=3,NS=[6,7,8];const cx=W/2,cy=H/2,RAD=Math.min(W,H)*.38,HR=Math.max(22,Math.min(W,H)*.05);
 let r=-1,pts=0,P=null,phase="",t0=0,LIM=0,drag=null,done=false;const pops=[];
 function tri(a){/* chords of a random triangulation of polygon vertex list a */if(a.length<4)return[];const i=Math.floor(Math.random()*a.length);let j;do j=Math.floor(Math.random()*a.length);while(Math.abs(i-j)<2||Math.abs(i-j)===a.length-1);
  const [p,q]=i<j?[i,j]:[j,i];return[[a[p],a[q]]].concat(tri(a.slice(p,q+1)),tri(a.slice(q).concat(a.slice(0,p+1))))}
 const cross=(N,E)=>{let c=0;const X=new Set();for(let i=0;i<E.length;i++)for(let j=i+1;j<E.length;j++){const [a,b]=E[i],[c2,d]=E[j];if(a===c2||a===d||b===c2||b===d)continue;if(k91SegX([N[a].x,N[a].y],[N[b].x,N[b].y],[N[c2].x,N[c2].y],[N[d].x,N[d].y])){c++;X.add(i);X.add(j)}}return{c,X}};
 function next(){r++;if(r>=NR){done=true;return setTimeout(()=>env.end((pts)),300)}const n=NS[r];const home=[...Array(n).keys()].map(i=>({x:cx+RAD*Math.cos(i/n*Math.PI*2-Math.PI/2),y:cy+RAD*Math.sin(i/n*Math.PI*2-Math.PI/2)}));
  const E=[...Array(n).keys()].map(i=>[i,(i+1)%n]).concat(kg82Shuf(tri([...Array(n).keys()])).slice(0,Math.ceil(n/2)));let N;
  for(let t=0;t<200;t++){N=[];for(let i=0;i<n;i++){let p,k=0;do{p={x:HR+Math.random()*(W-2*HR),y:HR+Math.random()*(H-2*HR)};k++}while(k<50&&N.some(q=>k91Dist(p.x,p.y,q.x,q.y)<HR*2.2));N.push(p)}if(cross(N,E).c>=n-2)break}
  P={n,E,N,home,c0:Math.max(1,cross(N,E).c)};LIM=(30000+lv*2500)*mgTol(env);phase="play";t0=performance.now();drag=null}
 function finish(ok,t){phase="judge";const per=10/NR;let got;if(ok)got=per*mgPace(env,"kim",t-t0,LIM);/* review/mg-tune-r1: the ONE time part (was its own typed .6+.4·left/LIM) */else got=per*.5*(1-cross(P.N,P.E).c/P.c0);pts+=Math.max(0,got);
  kg82Pop(pops,W/2,H*.08+10,ok?"Gỡ xong mối rối!":"Hết giờ",ok?K91C.good():K91C.red());setTimeout(next,1200)}
 const stop=k91Loop(now=>{if(!P)return;const left=LIM-(now-t0);if(phase==="play"&&left<=0)finish(false,now);kg82Bg(g,W,H,"kim",.06,.7);
  kg82Spr(g,"kim-spool",W-Math.min(W,H)*.07,Math.min(W,H)*.09,Math.min(W,H)*.1,null,{alpha:.95});
  const {c,X}=cross(P.N,P.E);P.E.forEach(([a,b],i)=>{g.strokeStyle=X.has(i)?K91C.red():phase==="judge"&&!c?K91C.good():"#c9a03a";g.lineWidth=X.has(i)?3:3.5;g.beginPath();g.moveTo(P.N[a].x,P.N[a].y);g.lineTo(P.N[b].x,P.N[b].y);g.stroke()});
  P.N.forEach((p,i)=>{const on=drag&&drag.i===i;/* the painted silk knot */if(kg82Spr(g,"kim-knot",p.x,p.y,HR*(on?1.35:1.18),null,{glow:on?"#ffe08a":null,blur:18}))return;g.save();g.shadowColor="#0005";g.shadowBlur=4;const gr=g.createRadialGradient(p.x-4,p.y-4,2,p.x,p.y,HR*.6);gr.addColorStop(0,on?"#fff3d6":"#fbe9c4");gr.addColorStop(1,on?"#e4a54a":"#b88a3a");
   g.fillStyle=gr;g.beginPath();g.arc(p.x,p.y,HR*.55,0,Math.PI*2);g.fill();g.shadowBlur=0;g.strokeStyle="#6e4d0e";g.lineWidth=1.5;g.stroke();g.restore()});
  g.fillStyle="#3a2a1e";g.font=k91F(700,13,1);g.textAlign="left";g.textBaseline="top";kg82Lbl(g,`Chỗ chỉ chéo: ${c}`,8,8);
  kg82DrawPops(g,pops,now);env.hud({score:`${Math.round(pts)}/10`,round:`Hồi ${Math.min(r+1,NR)}/${NR}`,time:phase==="play"?`${Math.max(0,Math.ceil(left/1000))} giây`:"–"})});
 k91Pointer(C,{down:(x,y)=>{if(phase!=="play")return;let bi=-1,bd=1e9;P.N.forEach((p,i)=>{const d=k91Dist(x,y,p.x,p.y);if(d<bd){bd=d;bi=i}});if(bd<HR*1.1)drag={i:bi,dx:P.N[bi].x-x,dy:P.N[bi].y-y}},
  move:(x,y)=>{if(!drag||phase!=="play")return;const p=P.N[drag.i];p.x=cl(x+drag.dx,HR*.6,W-HR*.6);p.y=cl(y+drag.dy,HR*.6,H-HR*.6)},
  up:()=>{if(!drag)return;drag=null;if(phase==="play"&&cross(P.N,P.E).c===0){kg82Pluck(2,true);finish(true,performance.now())}}});
 KG82.peek=()=>{if(phase!=="play"||!P||drag)return null;let bi=-1,bd=4;P.N.forEach((p,i)=>{const d=k91Dist(p.x,p.y,P.home[i].x,P.home[i].y);if(d>bd){bd=d;bi=i}});if(bi<0)return null;
  const a=C.client(P.N[bi].x,P.N[bi].y),b=C.client(P.home[bi].x,P.home[bi].y);return{drag:[[a.x,a.y],[(a.x+b.x)/2,(a.y+b.y)/2],[b.x,b.y]]}};
 next();return()=>{done=true;stop()}}

/* =============== 9. COOK (Nấu ăn): hold "Quạt lửa" to keep the fire in the step's zone and put the ingredients in the recipe's order =============== */
const K91_RC=[["Chè hạt sen long nhãn",[["Nước giếng",2],["Hạt sen",1],["Long nhãn",0],["Đường phèn",0]]],["Gà ác tần thuốc bắc",[["Gà ác",2],["Thuốc bắc",1],["Táo đỏ",1],["Kỷ tử",0]]],
 ["Cháo yến sào",[["Gạo tám",2],["Nước dùng",1],["Yến sào",0],["Đường phèn",0]]],["Canh hạt sen hầm xương",[["Xương ống",2],["Hạt sen",1],["Củ sen",1],["Hành ngò",0]]]];
const K91_RX=["Ớt hiểm","Giấm chua","Mắm tôm","Rượu nặng","Muối hột"];
/* ingredient → painting img/kit/mg-banh-<k>.webp */
const K91_ING={"Nước giếng":"nuoc","Hạt sen":"sen","Long nhãn":"nhan","Đường phèn":"duong","Gà ác":"ga","Thuốc bắc":"thuoc","Táo đỏ":"tao","Kỷ tử":"kytu","Gạo tám":"gao","Nước dùng":"dung",
 "Yến sào":"yen","Xương ống":"xuong","Củ sen":"cusen","Hành ngò":"hanh","Ớt hiểm":"ot","Giấm chua":"giam","Mắm tôm":"mam","Rượu nặng":"ruou","Muối hột":"muoi"};
function k91Ing(g,t,x,y,w,h,st,fs){k91Tile(g,x,y,w,h,"",st,fs,"tho-slip");const ic=h*1.02;kg82Spr(g,"banh-"+K91_ING[t.n],x+6+ic/2,y+h/2,ic,ic);
 g.save();g.fillStyle=K91C.ink;g.font=k91F(700,fs);g.textAlign="center";g.textBaseline="middle";g.fillText(t.n,x+ic+6+(w-ic-6)/2,y+h/2+1);g.restore()}
function k91Cook(box,env){const C=kg82Canvas(box,(box.clientWidth||300)<420?1.25:.95,470),{g,W,H}=C;const lv=env.lv||0;const [nm,steps]=kg82Shuf(K91_RC)[0];const Z=[[.14,.36],[.42,.62],[.68,.88]].map(([a,b])=>{const c=(a+b)/2,h=((b-a)/2+.015*lv)*mgTol(env);return[c-h,c+h]});const ZN=["lửa nhỏ","lửa vừa","lửa lớn"];
 /* mg-balance-2: the fire answers the fan with a LAG and draughts of wind (gusts) push it up or down; both grow as the ease falls (BAL.mgTier.lev.banh) */
 const LAG=Math.max(.02,mgLev(env,"banh","lag")),GUA=mgLev(env,"banh","gust"),GAP=mgLev(env,"banh","gap");let rr=-.1,gu=0,guEnd=0,guNext=GAP*(.6+.8*Math.random());
 const DUR=55000,SIM=3200;let heat=.3,fan=new Set(),si=0,simAt=0,inz=0,qual=[],miss=0,t0=performance.now()+1200,last=performance.now(),drag=null,done=false,msg="";const pops=[];
 const nd=lv>=3?1:2;const tiles=kg82Shuf(steps.map(([n],i)=>({n,i})).concat(kg82Shuf(K91_RX).slice(0,nd).map(n=>({n,i:-1}))));
 const bt=k91Btns(box,[["k91fan","Quạt lửa","giữ để lửa lên"]]);const fb=bt.querySelector("#k91fan");
 const on=e=>{e.preventDefault();fan.add(e.pointerId);fb.classList.add("on")},off=e=>{fan.delete(e.pointerId);if(!fan.size)fb.classList.remove("on")};fb.addEventListener("pointerdown",on);["pointerup","pointercancel","pointerleave"].forEach(ev=>fb.addEventListener(ev,off));fb.addEventListener("contextmenu",e=>e.preventDefault());
 const kd=e=>{if(e.key===" "){e.preventDefault();fan.add("k")}},ku=e=>{if(e.key===" ")fan.delete("k")};document.addEventListener("keydown",kd);document.addEventListener("keyup",ku);
 const PX=W*.55,PY=H*.44,PR=Math.min(W*.2,H*.16);const GX=W*.06,GY=H*.2,GW=Math.max(18,W*.05),GH=H*.46;
 /* ingredient slips on the counter: always inside the board (bottom 30 %), smaller slips when many rows are needed */
 function lay(){g.font=k91F(700,W<420?13:15);const left=tiles.filter(t=>!t.used);let th=40,tw=Math.max(96,Math.max(...tiles.map(t=>g.measureText(t.n).width))+20+th);const per=Math.max(2,Math.floor((W-12)/(tw+6)));
  if(per*(tw+6)-6>W-8)tw=(W-8-6*(per-1))/per;const rows=Math.max(1,Math.ceil(left.length/per)),av=H*.3-4;if(rows*(th+6)>av)th=Math.max(26,av/rows-6);const top=H-rows*(th+6)-2;
  left.forEach((t,k)=>{const row=Math.floor(k/per),col=k%per;const n=Math.min(per,left.length-row*per);const rw=n*(tw+6)-6;t.x=(W-rw)/2+col*(tw+6);t.y=top+row*(th+6);t.w=tw;t.h=th})}
 lay();const score=()=>Math.max(0,(qual.reduce((a,b)=>a+b,0)-.3*miss)/steps.length);
 function add(t){if(si>=steps.length||simAt)return;if(t.i===si){t.used=true;simAt=performance.now();inz=0;lay();kg82Pluck(si,true);msg=""}
  else{miss++;kg82Pluck(0,false);if(t.i<0){t.used=true;lay();kg82Pop(pops,PX,PY-PR-10,"Không có trong công thức!",K91C.red())}else kg82Pop(pops,PX,PY-PR-10,"Chưa đến lượt",K91C.red())}}
 const stop=k91Loop(now=>{const dt=Math.min(50,now-last)/1000;last=now;const t=now-t0;if(t>=0&&!done){const ts=t/1000;if(GUA>.01&&ts>=guNext){gu=(Math.random()<.5?-1:1)*GUA*(.6+.4*Math.random());guEnd=ts+.7;guNext=ts+GAP*(.6+.8*Math.random());kg82Pop(pops,PX,PY-PR-10,gu>0?"Gió lùa, lửa bùng":"Gió lùa, lửa lụi",K91C.gold())}if(ts>=guEnd)gu=0;
   rr+=((fan.size?.34:-.1)-rr)*Math.min(1,dt/LAG);heat=cl(heat+(rr+gu)*dt,0,1)}
  const st=steps[Math.min(si,steps.length-1)];const z=Z[st[1]];const inZ=heat>=z[0]&&heat<=z[1];
  if(simAt){inz+=inZ?dt*1000:0;if(now-simAt>=SIM){const q=.4+.6*Math.min(1,inz/SIM);qual.push(q);kg82Pop(pops,PX,PY-PR-10,q>.85?"Vừa lửa!":q>.6?"Được":"Lửa chưa đều",q>.85?K91C.good():q>.6?K91C.gold():K91C.red());simAt=0;si++;
   if(si>=steps.length&&!done){done=true;setTimeout(()=>env.end((10*score())),900)}}}
  if(t>DUR&&!done){done=true;setTimeout(()=>env.end((10*score())),300)}
  kg82Bg(g,W,H,"banh",0,1);
  /* recipe */g.fillStyle="#3a2a1e";g.font=k91F(700,12,1);g.textAlign="left";g.textBaseline="top";kg82Lbl(g,nm.toUpperCase(),10,8);g.font=k91F(700,W<420?12:13,1);
  let rx=10,ry=26;steps.forEach(([n,lvz],i)=>{const s=`${i<si?"✓ ":""}${i+1}. ${n} (${ZN[lvz]})`;const w=g.measureText(s).width+16;if(rx+w>W-6){rx=10;ry+=18}g.fillStyle=i<si?K91C.good():i===si?K91C.red():"#3a2a1e";kg82Lbl(g,s,rx,ry);rx+=w});
  /* gauge */g.fillStyle="#fffdf6";g.fillRect(GX,GY,GW,GH);g.strokeStyle=K91C.hair;g.strokeRect(GX,GY,GW,GH);g.fillStyle="#2d7a5244";g.fillRect(GX,GY+GH*(1-z[1]),GW,GH*(z[1]-z[0]));
  const hy=GY+GH*(1-heat);const gr=g.createLinearGradient(0,GY+GH,0,GY);gr.addColorStop(0,"#f0b040");gr.addColorStop(1,"#c23b22");g.fillStyle=gr;g.fillRect(GX+3,hy,GW-6,GY+GH-hy);
  g.fillStyle=inZ?K91C.good():K91C.red();g.beginPath();g.moveTo(GX+GW+2,hy);g.lineTo(GX+GW+11,hy-6);g.lineTo(GX+GW+11,hy+6);g.fill();g.fillStyle="#3a2a1e";g.font=k91F(700,11,1);g.textAlign="center";kg82Lbl(g,"Lửa",GX+GW/2,GY+GH+6);
  g.textAlign="left";g.fillStyle=inZ?K91C.good():K91C.red();kg82Lbl(g,`cần ${ZN[st[1]]}`,GX+GW+14,GY+GH*(1-(z[0]+z[1])/2)-6);
  /* the painted clay stove, its fire (grows with the heat) in the fire mouth, the painted pot on top */
  {const sw=PR*1.75,sh=sw*kg82SprR("banh-stove"),sy=Math.min(PY+PR*.55,H*.69-sh);if(kg82Spr(g,"banh-stove",PX,sy,sw,sh,{ay:0})){
    const fh=sh*(.16+heat*.44)*(.92+.08*Math.sin(now/80));kg82Spr(g,"banh-flame",PX,sy+sh*.86,sh*.42*(.7+heat*.4),fh,{ay:1,alpha:.55+heat*.45});
    kg82Spr(g,"banh-pot",PX,sy+sh*.12,PR*1.55,null,{ay:1})}
   else{g.fillStyle="#8a5a3a";k91RR(g,PX-PR*1.25,PY+PR*.7,PR*2.5,PR*.85,PR*.12);g.fill();g.fillStyle="#3a2a1e";k91RR(g,PX-PR,PY,PR*2,PR*.95,PR*.25);g.fill()}}
  if(simAt){const k=Math.min(1,(now-simAt)/SIM);g.strokeStyle=K91C.good();g.lineWidth=4;g.beginPath();g.arc(PX,PY+PR*.45,PR*.32,-Math.PI/2,-Math.PI/2+k*Math.PI*2);g.stroke();
   g.fillStyle="#fff";g.font=k91F(600,11,1);g.textAlign="center";g.textBaseline="middle";g.fillText("đang ninh",PX,PY+PR*.45)}
  g.save();g.globalAlpha=.35;g.fillStyle="#fff";for(let k=0;k<3;k++){const sx=PX-PR*.4+k*PR*.4,sy=PY-PR*.3-((now/12+k*40)%(PR*.8));g.beginPath();g.arc(sx+Math.sin(now/300+k)*6,sy,PR*.12,0,Math.PI*2);g.fill()}g.restore();
  /* counter: the painted ingredients on paper slips */tiles.forEach(t=>{if(t.used||(drag&&drag.t===t))return;k91Ing(g,t,t.x,t.y,t.w,t.h,"n",W<420?13:15)});if(drag)k91Ing(g,drag.t,drag.x-drag.t.w/2,drag.y-drag.t.h/2,drag.t.w,drag.t.h,"on",W<420?13:15);
  if(t<0){g.fillStyle=K91C.ink;g.font=k91F(700,15,1);g.textAlign="center";g.textBaseline="middle";/* right of the heat gauge, never over its "Lửa" label */const ix=GX+GW+16;kg82Lbl(g,"Giữ nút Quạt lửa · kéo nguyên liệu vào nồi theo thứ tự",(ix+W-8)/2,H*.68,W-8-ix)}
  kg82DrawPops(g,pops,now);env.hud({score:`${Math.round(10*score())}/10`,round:`Hồi ${Math.min(si+1,steps.length)}/${steps.length}`,time:`${Math.max(0,Math.ceil((DUR-Math.max(0,t))/1000))} giây`})});
 let dn=null;k91Pointer(C,{down:(x,y)=>{if(done)return;const t=tiles.find(t=>!t.used&&x>=t.x&&x<=t.x+t.w&&y>=t.y&&y<=t.y+t.h);if(t){drag={t,x,y};dn={x,y}}},move:(x,y)=>{if(drag){drag.x=x;drag.y=y}},
  up:(x,y)=>{if(!drag)return;const t=drag.t;drag=null;const moved=dn&&k91Dist(x,y,dn.x,dn.y)>8;dn=null;if(!moved||k91Dist(x,y,PX,PY+PR*.3)<PR*1.4)add(t)}});
 KG82.peek=()=>{if(done||performance.now()<t0)return null;const st=steps[Math.min(si,steps.length-1)],z=Z[st[1]];const mid=(z[0]+z[1])/2;/* a cook who knows the fire: judge by where the heat is heading (lag + gust) */const ahead=heat+(rr+gu)*LAG;const o={hold:ahead<mid,hsel:"#k91fan"};
  if(!simAt&&si<steps.length&&heat>=z[0]+.02&&heat<=z[1]-.02){const t=tiles.find(t=>!t.used&&t.i===si);if(t){const a=C.client(t.x+t.w/2,t.y+t.h/2),b=C.client(PX,PY+PR*.3);o.drag=[[a.x,a.y],[(a.x+b.x)/2,(a.y+b.y)/2],[b.x,b.y]]}}return o};
 return()=>{done=true;stop();document.removeEventListener("keydown",kd);document.removeEventListener("keyup",ku)}}

/* =============== 10. BLEND (Điều hương): move three sliders until your smoke matches the sample's colour; then "Dâng hương" =============== */
const K91_ES=[["Trầm",[122,74,42],"tram"],["Hoa nhài",[236,230,170],"nhai"],["Quế",[200,80,30],"que"],["Hoa hồng",[224,122,154],"hong"],["Bạc hà",[79,176,160],"bacha"],["Đàn hương",[176,136,80],"dan"],["Mộc lan",[160,120,200],"moclan"]];
function k91Blend(box,env){const C=kg82Canvas(box,1,460),{g,W,H}=C;const lv=env.lv||0;const NR=3,LIM=22000+lv*2000;let r=-1,sum=0,P=null,phase="",t0=0,drag=-1,done=false;const pops=[];
 const bt=k91Btns(box,[["k91done","Dâng hương","chấm độ khớp"]]);const bd=bt.querySelector("#k91done");
 const pick3=()=>{for(let t=0;t<50;t++){const E=kg82Shuf(K91_ES).slice(0,3);const ok=E.every((a,i)=>E.every((b,j)=>i===j||Math.hypot(a[1][0]-b[1][0],a[1][1]-b[1][1],a[1][2]-b[1][2])>90));if(ok)return E}return K91_ES.slice(0,3)};
 const ratio=v=>{const s=v.reduce((a,b)=>a+b,0);return s>0?v.map(x=>x/s):v.map(()=>1/v.length)};const mix=(E,v)=>{const q=ratio(v);return[0,1,2].map(c=>Math.round(E.reduce((a,e,i)=>a+e[1][c]*q[i],0)))};
 const dist=(a,b)=>{const p=ratio(a),q=ratio(b);return p.reduce((s,x,i)=>s+Math.abs(x-q[i]),0)/2};
 function next(){r++;if(r>=NR){done=true;bd.disabled=true;return setTimeout(()=>env.end((10*sum/NR)),300)}const E=pick3();let tv;do tv=[0,1,2].map(()=>1+Math.floor(Math.random()*6));while(Math.max(...tv)-Math.min(...tv)<2);
  P={E,tv,v:[.5,.5,.5]};phase="play";t0=performance.now();bd.disabled=false}
 const SL=()=>{const top=H*.47,bot=H*.93,cw=W/3;return[0,1,2].map(i=>({x:cw*(i+.5),top,bot}))};
 function judge(){phase="judge";bd.disabled=true;const d=dist(P.v,P.tv);const s=cl(1-d/(.32*mgTol(env)),0,1);sum+=s;/* the verdict takes the hint line's place (never drawn over it) */P.verdict=[s>.85?"Khớp hương mẫu!":s>.55?"Gần giống":"Lệch hương",s>.85?K91C.good():s>.55?K91C.gold():K91C.red()];setTimeout(next,1500)}
 function smoke(x,y,R,c,lab){/* the painted censer under its live smoke */kg82Spr(g,"huong-censer",x,y+R*.42,R*1.35,null,{ay:0});g.save();const gr=g.createRadialGradient(x,y,R*.1,x,y,R);gr.addColorStop(0,`rgba(${c},1)`);gr.addColorStop(.7,`rgba(${c},.85)`);gr.addColorStop(1,`rgba(${c},0)`);g.fillStyle=gr;g.beginPath();g.arc(x,y,R,0,Math.PI*2);g.fill();
  g.fillStyle=K91C.ink;g.font=k91F(700,12,1);g.textAlign="center";g.textBaseline="alphabetic";kg82Lbl(g,lab,x,y+R*1.85+12);g.restore()}
 const stop=k91Loop(now=>{if(!P)return;const left=LIM-(now-t0);if(phase==="play"&&left<=0)judge();kg82Bg(g,W,H,"huong",.08,.8);
  const R=Math.min(W*.14,H*.095);const tc=mix(P.E,P.tv),mc=mix(P.E,P.v);smoke(W*.27,H*.12,R,tc.join(","),"Hương mẫu");smoke(W*.73,H*.12,R,mc.join(","),"Hương ngươi pha");
  const d=dist(P.v,P.tv);const word=d>.22?"còn xa":d>.12?"đã gần":d>.05?"rất gần":"khớp";g.fillStyle=d<=.05?K91C.good():d<=.12?K91C.gold():"#6b5643";g.font=k91F(700,13,1);g.textAlign="center";
  const dom=P.E[P.tv.indexOf(Math.max(...P.tv))][0];if(phase==="judge"&&P.verdict)k91Say(g,P.verdict[0],P.verdict[1],W/2,H*.4,W-16);else kg82Lbl(g,`Mẫu nặng về ${dom} · độ khớp: ${word}`,W/2,H*.4,W-16);
  SL().forEach((s,i)=>{const e=P.E[i];g.strokeStyle=K91C.hair;g.lineWidth=6;g.lineCap="round";g.beginPath();g.moveTo(s.x,s.top);g.lineTo(s.x,s.bot-22);g.stroke();
   const y=s.bot-22-(s.bot-22-s.top)*P.v[i];g.strokeStyle=`rgb(${e[1].join(",")})`;g.beginPath();g.moveTo(s.x,s.bot-22);g.lineTo(s.x,y);g.stroke();
   /* knob = the painted jar of that scent */if(!kg82Spr(g,"huong-"+e[2],s.x,y,56,null,{})){g.fillStyle=`rgb(${e[1].join(",")})`;g.strokeStyle="#6e4d0e";g.lineWidth=2;g.beginPath();g.arc(s.x,y,13,0,Math.PI*2);g.fill();g.stroke()}
   g.fillStyle=K91C.ink;g.font=k91F(700,12,1);g.textBaseline="alphabetic";kg82Lbl(g,e[0],s.x,s.bot)});
  kg82DrawPops(g,pops,now);env.hud({score:`${Math.round(10*sum/NR)}/10`,round:`Hồi ${Math.min(r+1,NR)}/${NR}`,time:phase==="play"?`${Math.max(0,Math.ceil(left/1000))} giây`:"–"})});
 const setV=(i,y)=>{const s=SL()[i];P.v[i]=cl((s.bot-22-y)/(s.bot-22-s.top),0,1)};
 k91Pointer(C,{down:(x,y)=>{if(phase!=="play")return;if(y<H*.43)return;drag=cl(Math.floor(x/(W/3)),0,2);setV(drag,y)},move:(x,y)=>{if(drag>=0&&phase==="play")setV(drag,y)},up:()=>{drag=-1}});
 bd.onclick=()=>{if(phase==="play")judge()};
 KG82.peek=()=>{if(phase!=="play"||!P||drag>=0)return null;const mx=Math.max(...P.tv);const tv=P.tv.map(x=>x/mx*.9);const i=tv.findIndex((x,k)=>Math.abs(x-P.v[k])>.02);if(i<0)return{sel:"#k91done"};
  const s=SL()[i];const y0=s.bot-22-(s.bot-22-s.top)*P.v[i],y1=s.bot-22-(s.bot-22-s.top)*tv[i];const a=C.client(s.x,y0),b=C.client(s.x,y1);return{drag:[[a.x,a.y],[b.x,(a.y+b.y)/2],[b.x,b.y]]}};
 next();return()=>{done=true;stop()}}

/* ---------- wiring: one engine per kind, new "how" lines ---------- */
Object.assign(KG82_ENG,{hold:k91Hold,fling:k91Fling,trace:k91Trace,arrange:k91Arrange,untangle:k91Untangle,cook:k91Cook,blend:k91Blend});
Object.assign(KG82_KIND,{
 hat:{e:"hold",n:"Hát",t:"Giữ hơi theo giai điệu",how:"Giữ ngón tay trên ô để lên giọng, buông ra để xuống giọng; giữ đóa hoa trong dải vàng của giai điệu suốt bài ca."},
 dauho:{e:"fling",n:"Đầu hồ",t:"Ném tên vào bình",how:"Đặt ngón tay, kéo ngược về sau rồi buông để ném tên vào miệng bình. Kéo dài thì ném xa; gió đổi mỗi lần. 6 lần ném."},
 ve:{e:"trace",n:"Vẽ",t:"Đồ nét bút",how:"Đặt ngón tay ở chấm xanh rồi đưa theo nét mờ cho kín và đều tay. 4 bức."},
 hoa:{e:"arrange",n:"Cắm hoa",t:"Cắm thế thiên – nhân – địa",how:"Kéo từng cành vào bình, đặt đóa hoa vào vòng của nó: cành dài nhất là Thiên, cành vừa là Nhân, cành ngắn là Địa. Giữ thế hoa cân. 3 bình."},
 kim:{e:"untangle",n:"Khéo tay",t:"Gỡ rối chỉ",how:"Kéo các nút chỉ cho đến khi không còn sợi nào chéo nhau (sợi đỏ là chỗ chéo). 3 mối rối. Làm nhanh thì được trọn phần."},
 banh:{e:"cook",n:"Nấu ăn",t:"Canh lửa nấu món",how:"Giữ nút Quạt lửa cho lửa nằm trong vùng xanh của từng bước, kéo nguyên liệu vào nồi đúng thứ tự công thức và chờ ninh xong. Lửa lên xuống chậm sau tay quạt, lại có gió lùa: buông tay sớm một chút."},
 huong:{e:"blend",n:"Điều hương",t:"Pha hương theo mẫu",how:"Kéo ba thanh trượt để pha ba vị hương cho màu khói giống hương mẫu, rồi chạm Dâng hương. 3 lư hương."}});
KG82_KIND.theu.how="Mũi thêu hiện trên khung rồi khuất. Chạm lại đúng những ô có mũi thêu. 5 hồi.";
/* lessons (Tài nghệ tab): every art plays its own contest game (cam→đàn, ky→cờ, thi→thơ, hoa→vẽ, vu→múa, y→điều hương, theu→thêu, nau→nấu ăn) */
Object.assign(KG82_MGL,{cam:["Cầm: tấu khúc","dan"],ky:["Kỳ: ăn quân","co"],thi:["Thi: điền câu lục bát","tho"],hoa:["Họa: đồ nét bút","ve"],vu:["Vũ: theo bước múa","mua"],
 y:["Y thuật & điều hương: pha hương","huong"],theu:["Thêu: nhớ mẫu thêu","theu"],nau:["Nấu nướng: canh lửa nấu món","banh"]});
/* jreg: engines is read when asked, so engines of later modules (jnwp, jwkg…) are listed */
window.K91={get engines(){return Object.keys(KG82_ENG)},kinds:()=>Object.fromEntries(Object.entries(KG82_KIND).map(([k,v])=>[k,v.e]))};
