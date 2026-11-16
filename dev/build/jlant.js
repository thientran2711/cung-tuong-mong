/* ================= jlant: THẮP ĐÈN — the non-word lantern game for the Nguyên tiêu / Hoa đăng / Trung thu contests (key "doden") =================
   Owner 16/11 07:20Z (no word games): the đố đèn riddle game (j91 k91Lantern) is replaced by a lantern light/shape game, winnable by what is SHOWN.
   Three short rounds (raw 0–10 like every contest game): 1 "Cùng kiểu" (tap every lantern like the sample card: shape + colour) · 2 "Thắp theo hình"
   (light the lanterns so the grid matches the sample grid) · 3 "Treo theo dải" (tap the tray lanterns in the order of the sample string).
   Same easy rules as mg-easy: Gợi ý button (a little score), idle auto-hint at tiers 0/1, a wrong tap bounces back at tiers 0/1, first-time demo card.
   Every number is BAL.lantern (tier 0/1/2 columns). Difficulty tier: window.mgTier (review/mg-balance) when it exists, else kg82Tier(player level).
   Uses only existing kit parts: j82 game frame + canvas, k91Btns / k91DemoCard / k91Pointer / k91Loop, the doden-bg painting. KIT REQUEST: none.
   Registers KG82_ENG.lamp; KG82_KIND.doden (j82) points at it. Old saves: key "doden" unchanged; the demo flag is the new key "doden2". */
BAL.lantern={field:[8,10,12],same:[3,3,4],lit:[3,4,5],rows:[2,3,3],seq:[3,4,5],lim:[32000,28000,24000],idle:[9000,14000,0],
 pts:[3,3.5,3.5],miss:.18,speed:.3,hint:.3,tier:null,
 timeout:.6,autoHint:.5,bad:[1300,1300,500],glow:3500,pause:[900,1100],short:{h:520,min:240}};
const LM_COL=[["#c23b22","#ff8a6a","#6e1608"],["#d99a1b","#ffe08a","#7a5206"],["#2f9d78","#8ff0c8","#0f5a40"]];
function lmTier(env){const T=BAL.lantern.tier;if(T!=null)return cl(+T||0,0,2);
 try{if(typeof window.mgTier==="function"){const t=window.mgTier(env.kind||"doden",env.ctx||KG82.ctx);if(typeof t==="number"&&isFinite(t))return cl(Math.round(t),0,2)}}catch(e){}
 return kg82Tier(env.lv)}
/* one lantern: shape 0 tròn · 1 bầu · 2 lục giác · 3 trụ dài; col 0 đỏ · 1 vàng · 2 ngọc; lit = glowing; st n|ok|bad|dim */
function lmDraw(g,cx,cy,w,h,shape,col,lit,st,sway){const C=LM_COL[col];g.save();g.translate(cx,cy);if(sway)g.rotate(sway);
 const bw=w*.92,bh=h*.7,top=-h/2,by=-bh/2+h*.03;g.strokeStyle="#7a5a20";g.lineWidth=1.5;g.beginPath();g.moveTo(0,top-3);g.lineTo(0,by);g.stroke();
 g.globalAlpha=st==="dim"?.35:1;if(lit){g.shadowColor=C[1];g.shadowBlur=w*.55}
 const body=()=>{g.beginPath();if(shape===0)g.ellipse(0,0,bw/2,bh/2,0,0,Math.PI*2);
  else if(shape===1){const a=bw/2,b=bh/2;g.moveTo(0,-b);g.bezierCurveTo(a*.62,-b,a*.7,-b*.2,a*.34,-b*.12);g.bezierCurveTo(a*1.08,-b*.02,a*1.08,b,0,b);g.bezierCurveTo(-a*1.08,b,-a*1.08,-b*.02,-a*.34,-b*.12);g.bezierCurveTo(-a*.7,-b*.2,-a*.62,-b,0,-b);g.closePath()}
  else if(shape===2){const a=bw/2,b=bh/2,c=bw*.2;g.moveTo(-a+c,-b);g.lineTo(a-c,-b);g.lineTo(a,0);g.lineTo(a-c,b);g.lineTo(-a+c,b);g.lineTo(-a,0);g.closePath()}
  else{const a=bw*.3,b=bh*.58,r=a*.5;g.moveTo(-a+r,-b);g.arcTo(a,-b,a,b,r);g.arcTo(a,b,-a,b,r);g.arcTo(-a,b,-a,-b,r);g.arcTo(-a,-b,a,-b,r);g.closePath()}};
 const gr=g.createRadialGradient(0,-bh*.1,bw*.05,0,0,bw*.62);gr.addColorStop(0,lit?"#fffbe6":C[1]);gr.addColorStop(.55,lit?C[1]:C[0]);gr.addColorStop(1,lit?C[0]:C[2]);
 body();g.fillStyle=gr;g.fill();if(st==="off"){g.fillStyle="rgba(24,12,36,.5)";g.fill()}g.shadowBlur=0;g.lineWidth=2;g.strokeStyle=st==="ok"?"#7dffb0":st==="bad"?"#ff6a50":"#4a2a0a";g.stroke();
 g.save();body();g.clip();g.strokeStyle="rgba(60,20,10,.35)";g.lineWidth=1.2;
 if(col===0){for(const k of[-.5,0,.5]){g.beginPath();g.ellipse(0,0,Math.abs(bw*k*.5)+.1,bh/2,0,0,Math.PI*2);g.stroke()}}
 else if(col===1){for(const k of[-.22,.22]){g.beginPath();g.moveTo(-bw/2,bh*k);g.lineTo(bw/2,bh*k);g.stroke()}}
 else{g.fillStyle="rgba(60,20,10,.28)";for(let i=-1;i<=1;i++)for(let j=-1;j<=1;j++){g.beginPath();g.arc(i*bw*.24,j*bh*.24,w*.04,0,Math.PI*2);g.fill()}}g.restore();
 g.fillStyle="#b8862a";const cw=Math.min(bw*.42,w*.4);g.fillRect(-cw/2,by-bh*.02-3,cw,5);g.fillRect(-cw/2,by+bh*.97,cw,5);
 g.strokeStyle=C[0];g.lineWidth=2;g.beginPath();g.moveTo(0,by+bh*.97+5);g.lineTo(0,by+bh*.97+h*.16);g.stroke();g.restore()}
function lmShuf(a){return kg82Shuf(a.slice())}
function k92Lamp(box,env){const C=kg82Canvas(box,1.25,560,innerHeight<BAL.lantern.short.h?BAL.lantern.short.min:0),{g,W,H}=C;const tier=lmTier(env),B=BAL.lantern,LIM=B.lim[tier],IDLE=B.idle[tier];
 let rd=-1,pts=0,R=null,t0=0,tAct=0,done=false,wait=0;const pops=[];const hb=k91Btns(box,[["k92hint","Gợi ý","bớt một ít phần"]]);
 const dm=k91DemoCard(box,"doden2",{title:"CÁCH CHƠI: THẮP ĐÈN",done:()=>{hb.hidden=false;t0=tAct=performance.now();setTimeout(fit,50)},
  lines:["Ba hồi, hồi nào cũng làm theo cái đang hiện sẵn trên màn.","Hồi 1: chạm mọi chiếc đèn giống đèn mẫu (cùng dáng, cùng màu). Hồi 2: chạm để thắp đèn cho giống hình mẫu. Hồi 3: chạm đèn theo đúng thứ tự dải mẫu.","Chạm nhầm thì đèn tối đi, chạm lại. Chưa rõ thì chạm Gợi ý, chỉ tốn một ít phần."]});
 if(dm)hb.hidden=true;
 const TZ=()=>Math.round(H*.3);
 function cells(n,cols,y0,h0){const rows=Math.ceil(n/cols),cw=(W-16)/cols,ch=h0/rows;return Array.from({length:n},(_,i)=>{const c=i%cols,r=Math.floor(i/cols);return{x:8+c*cw,y:y0+r*ch,w:cw,h:ch}})}
 function lw(c){const w=Math.min(c.w*.72,c.h*.62);return[w,w*1.28]}
 function mk(type){const o={type,found:0,miss:0,cost:0,mean:tier<2,t:performance.now(),flash:[]};
  if(type===0){const n=B.field[tier],K=B.same[tier],cols=n<=8?4:n<=10?5:4;const s0=Math.floor(Math.random()*4),c0=Math.floor(Math.random()*3);o.samp={s:s0,c:c0};
   const L=[];for(let i=0;i<K;i++)L.push({s:s0,c:c0,ok:1});
   while(L.length<n){let s=Math.floor(Math.random()*4),c=Math.floor(Math.random()*3);const one=tier>=1&&Math.random()<.7;if(one){if(Math.random()<.5)s=s0;else c=c0}
    if(s===s0&&c===c0)continue;L.push({s,c,ok:0})}
   o.L=lmShuf(L).map(x=>({...x,on:0,bad:0}));o.cols=cols;o.need=K}
  else if(type===1){const cols=3,rows=B.rows[tier],n=cols*rows;let lit=Math.min(B.lit[tier],n-1);const idx=lmShuf([...Array(n).keys()]).slice(0,lit);
   o.T=Array(n).fill(0);idx.forEach(i=>o.T[i]=1);o.P=Array(n).fill(0);o.cols=cols;o.rows=rows;o.need=lit;o.sc=lmShuf([0,1,2,3]).slice(0,1)[0]}
  else{const m=B.seq[tier];const pairs=lmShuf([0,1,2,3].flatMap(s=>[0,1,2].map(c=>({s,c})))).slice(0,m);o.S=pairs;o.tray=lmShuf(pairs.map((p,i)=>({...p,i,used:0,bad:0})));o.k=0;o.need=m}
  return o}
 function next(){rd++;if(rd>=3){done=true;return setTimeout(()=>env.end(Math.round(cl(pts,0,10))),400)}R=mk(rd);t0=tAct=performance.now()}
 function fin(timeout){if(R.fin)return;const now=performance.now(),sp=cl(1-(now-t0)/LIM,0,1),base=B.pts[R.type];let p;
  const frac=R.type===0?R.found/R.need:R.type===1?R.P.filter((v,i)=>v===R.T[i]).length/R.P.length:R.k/R.need;
  p=timeout?base*frac*B.timeout:base*(1-B.speed+B.speed*sp);p=Math.max(0,p-R.miss*base*B.miss-R.cost);if(timeout)p=Math.min(p,base*frac*B.timeout);pts+=p;R.fin=now;
  kg82Pop(pops,W/2,H*.5,timeout?"Hết giờ":"Đèn đã sáng!",timeout?K91C.gold():K91C.good());kg82Pluck(3,!timeout);setTimeout(next,B.pause[timeout?1:0])}
 function nextTarget(){if(!R||R.fin)return null;
  if(R.type===0){const i=R.L.findIndex(x=>x.ok&&!x.on);return i<0?null:{i}}
  if(R.type===1){const i=R.P.findIndex((v,k)=>v!==R.T[k]);return i<0?null:{i}}
  const want=R.S[R.k];const i=R.tray.findIndex(x=>!x.used&&x.s===want.s&&x.c===want.c);return i<0?null:{i}}
 function hint(auto){if(!R||R.fin||done||(dm&&dm.on))return;tAct=performance.now();const t=nextTarget();if(!t)return;R.glow=t.i;R.glowAt=tAct;R.cost+=auto?B.hint*B.autoHint:B.hint}
 hb.querySelector("#k92hint").onclick=()=>hint(false);
 /* geometry of the current round (same function for drawing and hit-testing) */
 function geo(){const tz=TZ(),fy=tz+14,fh=H-fy-6;
  if(R.type===0)return{f:cells(R.L.length,R.cols,fy,fh)};
  if(R.type===1){const n=R.T.length,mini=cells(n,R.cols,6,tz-12);const sw=Math.min(W*.34,(tz-12)*1.05);const mc=R.cols,mr=R.rows,cw=sw/mc,ch=(tz-14)/mr;
   const m=Array.from({length:n},(_,i)=>({x:W-8-sw+(i%mc)*cw,y:8+Math.floor(i/mc)*ch,w:cw,h:ch}));return{f:cells(n,R.cols,fy,fh),m}}
  const n=R.S.length,sw=(W-16)/n,s=Array.from({length:n},(_,i)=>({x:8+i*sw,y:20,w:sw,h:tz-22}));return{s,f:cells(n,Math.min(n,5),fy,fh)}}
 function tapAt(x,y){if(!R||R.fin||(dm&&dm.on))return;tAct=performance.now();const G=geo();const i=G.f.findIndex(c=>x>=c.x&&x<=c.x+c.w&&y>=c.y&&y<=c.y+c.h);if(i<0)return;
  if(R.type===0){const L=R.L[i];if(L.on)return;if(L.ok){L.on=1;R.found++;kg82Pluck(R.found,true);if(R.found>=R.need)fin(false)}
   else{R.miss++;L.bad=performance.now()+B.bad[tier];kg82Pluck(0,false);if(tier<2)kg82Pop(pops,G.f[i].x+G.f[i].w/2,G.f[i].y+8,"Chưa giống, thử đèn khác",K91C.red())}}
  else if(R.type===1){const was=R.P[i]===R.T[i];R.P[i]^=1;const now=R.P[i]===R.T[i];kg82Pluck(i,now);if(was&&!now){R.miss++;kg82Pop(pops,G.f[i].x+G.f[i].w/2,G.f[i].y+8,"Chưa đúng hình",K91C.red())}
   if(R.P.every((v,k)=>v===R.T[k]))fin(false)}
  else{const t=R.tray[i];if(t.used)return;const want=R.S[R.k];if(t.s===want.s&&t.c===want.c){t.used=1;R.k++;kg82Pluck(R.k,true);if(R.k>=R.need)fin(false)}
   else{R.miss++;t.bad=performance.now()+B.bad[tier];kg82Pluck(0,false);if(tier<2)kg82Pop(pops,G.f[i].x+G.f[i].w/2,G.f[i].y+8,"Chưa tới đèn này",K91C.red())}}}
 const TXT=["Chạm mọi chiếc đèn giống đèn mẫu","Chạm để thắp đèn cho giống hình mẫu","Chạm đèn theo thứ tự dải mẫu"];
 const stop=k91Loop(now=>{if(!R)return;kg82Bg(g,W,H,"doden",0,.6);
  if(dm&&dm.on){dm.draw(g,W,H,now);env.hud({score:"0/10",round:"Hồi 1/3",time:"–"});return}
  const left=LIM-(now-t0);if(!R.fin){if(left<=0)fin(true);else if(IDLE&&now-tAct>IDLE)hint(true)}
  const G=geo(),tz=TZ(),sw=Math.sin(now/700)*.025;
  g.fillStyle="#fff1d0";g.font=k91F(700,Math.max(12,Math.min(15,W/28)),1);g.textAlign="center";g.textBaseline="alphabetic";
  if(R.type===0){/* sample card, left */
   const cw=Math.min(W*.3,tz*1.0);k91RR(g,10,8,cw,tz-12,10);g.fillStyle="rgba(255,250,236,.92)";g.fill();g.strokeStyle=K91C.hair;g.lineWidth=2;g.stroke();
   lmDraw(g,10+cw/2,8+(tz-12)*.52,cw*.55,(tz-12)*.62,R.samp.s,R.samp.c,true,"n",sw);g.fillStyle="#5a3a0c";g.font=k91F(700,12,1);g.textAlign="center";g.fillText("Đèn mẫu",10+cw/2,tz-8);
   g.fillStyle="#fff1d0";g.font=k91F(700,Math.max(12,Math.min(15,W/28)),1);g.textAlign="left";kg82Lbl(g,TXT[0],cw+22,tz*.4,W-cw-30,true);g.font=k91F(600,12,1);kg82Lbl(g,`Đã thấy ${R.found}/${R.need} chiếc`,cw+22,tz*.4+20,W-cw-30,true)}
  else if(R.type===1){/* sample grid, right */
   const m=G.m,x0=m[0].x-4,y0=m[0].y-4,mw=m[0].w*R.cols+8,mh=m[0].h*R.rows+8;k91RR(g,x0,y0,mw,mh,8);g.fillStyle="rgba(255,250,236,.9)";g.fill();g.strokeStyle=K91C.hair;g.lineWidth=2;g.stroke();
   m.forEach((c,i)=>{const [w,h]=lw(c);lmDraw(g,c.x+c.w/2,c.y+c.h*.5,w*.8,h*.8,R.sc,1,!!R.T[i],R.T[i]?"n":"off",0)});
   g.fillStyle="#fff1d0";g.font=k91F(700,Math.max(12,Math.min(15,W/28)),1);g.textAlign="left";kg82Lbl(g,TXT[1],12,tz*.42,x0-16,true)}
  else{/* sample string */
   G.s.forEach((c,i)=>{const [w,h]=lw({w:c.w,h:c.h});const lit=i<R.k;lmDraw(g,c.x+c.w/2,c.y+c.h*.55,w*.78,h*.78,R.S[i].s,R.S[i].c,lit,"n",sw);if(i===R.k&&!R.fin){g.save();g.globalAlpha=.55+.45*Math.sin(now/170);g.strokeStyle="#e0a526";g.lineWidth=3;k91RR(g,c.x+3,c.y,c.w-6,c.h,8);g.stroke();g.restore()}});
   g.textAlign="center";kg82Lbl(g,TXT[2],W/2,16,W-16,true)}
  G.f.forEach((c,i)=>{const [w,h]=lw(c);const sy=Math.sin(now/600+i)*.02;let sh,co,lit=false,st="n";
   if(R.type===0){const L=R.L[i];sh=L.s;co=L.c;lit=!!L.on;if(L.on)st="ok";else if(L.bad>now)st="dim"}
   else if(R.type===1){sh=R.sc;co=1;lit=!!R.P[i];if(!lit)st="off"}
   else{const t=R.tray[i];sh=t.s;co=t.c;if(t.used)st="dim";else if(t.bad>now)st="bad"}
   if(R.type===0&&R.L[i].bad>now)st="dim";lmDraw(g,c.x+c.w/2,c.y+c.h*.5,w,h,sh,co,lit,st,sy);
   if(R.glow===i&&now-R.glowAt<B.glow&&!R.fin)k91Glow(g,c.x+c.w*.12,c.y+c.h*.06,c.w*.76,c.h*.88,now)});
  kg82DrawPops(g,pops,now);env.hud({score:`${Math.round(pts)}/10`,round:`Hồi ${Math.min(rd+1,3)}/3`,time:R.fin?"–":`${Math.max(0,Math.ceil(left/1000))} giây`})});
 k91Pointer(C,{down:(x,y)=>tapAt(x,y)});
 KG82.peek=()=>{if(!R||R.fin||(dm&&dm.on))return null;const t=nextTarget();if(!t)return null;const c=geo().f[t.i];return C.client(c.x+c.w/2,c.y+c.h/2)};
 /* test oracle for the random-play measure: every cell centre of the round */
 KG82.cells=()=>{if(!R||R.fin)return[];return geo().f.map(c=>C.client(c.x+c.w/2,c.y+c.h/2))};
 /* short screens (844x390): the dialog scrolls, so bring the board to the top of the scroll area where it fits whole above the Gợi ý button */
 const fit=()=>{if(innerHeight>=BAL.lantern.short.h)return;const sc=C.cv.closest(".kginfo");if(!sc)return;sc.scrollTop+=C.cv.getBoundingClientRect().top-sc.getBoundingClientRect().top-2};
 setTimeout(fit,60);
 next();return()=>{done=true;stop()}}
KG82_ENG.lamp=k92Lamp;
Object.assign(KG82_KIND.doden,{e:"lamp"});
