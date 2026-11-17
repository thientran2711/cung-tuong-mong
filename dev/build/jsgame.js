
/* ===================== jsgame.js — TRÒ MƯU (scheme mini-games), review/scheme-games =====================
   Short, ABSTRACT skill checks on existing player acts (person card → Hại nhỏ / Hại nặng / Sát hại):
     spy    "Dò la"             → Nghe ngóng : keep the shadow in the safe band + tap the true lines (with the words to listen for), not the rumours
     rumor  "Tung tin đồn"      → Truyền lời : pick a chain of trusted courtiers to the target's household
     bribe  "Mua chuộc cung nữ" → Mặc cả     : a price bar vs her hidden threshold (from her temper + loyalty); silver spent = the card's Tốn
     12 stealth acts of Hại nặng / Sát hại → Thời cơ : tap when the watcher's attention is low (no act name, no method on any game screen)
   Rules (owner 11/15): always "Giao cho người làm" = plain odds; NPCs never play (runAct untouched, same price and odds);
   the result moves the player's odds ONE step on the ladder (sgShift; raw 7+ up, 4–6 same, 0–3 down), only inside the player's own doAct call;
   the act then runs through doAct as usual → the normal result card. Bots calling doAct() directly never see a game.
   Kit: kg82Open/kitGameFrame default seal, k91 tiles, kitOdds, kitGameResult. Boards: kit silk fallback until the kit keeper adds painted boards (KIT REQUEST); no new kit parts here. */
const SG={mod:null,inC:0,K:{}};window.SG=SG;
function sgRM(){try{return typeof kmReduced==="function"?kmReduced():matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}}
function sgShuf(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
/* mg-easy pattern: a «Gợi ý» kit button (costs a little score, never blocks) + a quiet auto-hint when she stalls; sgHint(box, idleMs, fn) -> {tap(), act()}; fn(auto) draws/pops the hint */
function sgHint(box,idle,fn){const H={cost:0,at:performance.now()};const b=k91Btns(box,[["sghint","Gợi ý","bớt một ít phần"]]);
 H.act=()=>{H.at=performance.now()};H.use=auto=>{H.at=performance.now();H.cost+=auto?.3:.6;fn(auto)};b.querySelector("#sghint").onclick=()=>H.use(false);
 H.idle=now=>{if(idle&&now-H.at>idle){H.use(true)}};return H}
KG82_SPR.nghe=["tho-slip"];KG82_SPR.truyen=["tho-slip","doi-slip"];KG82_SPR.mac=["tho-slip"];

/* ---------- 1. NGHE NGÓNG ---------- */
const SG_KW=["thư riêng","cửa sau","hộp gấm","canh ba","sổ bạc","khăn tay thêu","lối hồ sen","trâm bạc","người lạ","kho lụa"];
const SG_IMP=["Nhớ cất {k} cho kín.","Chuyện {k} chớ nói ra.","Ai đã thấy {k} chưa?","Đêm nay lại nhắc {k}.","{K} đã đưa đi rồi.","Đừng để ai biết {k}."];
const SG_FILL=["Trà hôm nay hơi đắng.","Hoa đào nở sớm quá.","Mai thêu nốt đôi hài.","Trời trở gió rồi.","Chim sẻ đậu mái hiên.","Bánh hạnh nhân ngon lắm.","Đèn lồng treo lệch kìa.","Nước hồ hôm nay trong.","Cuộn chỉ đỏ đâu rồi?","Sáng mai quét sân sớm."];
function sgPh(t,k){return t.replace("{k}",k).replace("{K}",k[0].toUpperCase()+k.slice(1))}
function sgNghe(box,env){const R=sgRM();const C=kg82Canvas(box,.86,400),{g,W,H}=C;
 k91Btns(box,[["sgnep","Nép sau bình phong","giữ bóng trong dải xanh"]]);let glow=null,gUntil=0;
 const KW=sgShuf(SG_KW),key=KW.slice(0,3),oth=KW.slice(3);const T=30000,N=16,GAP=1700,CROSS=6500,SHOW=2600;
 /* 16 lines: 7 with a word to listen for, 3 decoys (another secret word), 6 small talk; the last two are always small talk */
 const kinds=sgShuf(["i","i","i","i","i","i","i","d","d","d","f","f","f","f"]).concat(["f","f"]);
 const imp=sgShuf(SG_IMP),fil=sgShuf(SG_FILL);let ii=0,fi=0;
 const ph=kinds.map((c,n)=>({s:c==="i"?sgPh(imp[ii++%imp.length],key[n%3]):c==="d"?sgPh(imp[ii++%imp.length],oth[n%oth.length]):fil[fi++%fil.length],imp:c==="i",at:600+n*GAP,lane:n%3,done:0}));
 const NI=ph.filter(p=>p.imp).length;const MX=26,y0=H*.16,y1=H*.88,LO=.3,HI=.7;const lanes=[H*.34,H*.55,H*.76];const sw=Math.min(W*.6,300),sh=34;
 let e=.5,band=0,tot=0,hits=0,wrong=0,last=0,t0=0,stop=false,gust=0,warn=0;const pops=[];
 const hear=()=>e>=LO&&e<=HI;
 const pos=(p,now)=>{const tt=now-t0-p.at;if(tt<0)return null;if(R){if(tt>SHOW)return null;return{x:MX+30+(W-MX-30)/2,y:lanes[p.lane]}}
  const x=W+sw/2-(tt/CROSS)*(W+sw);if(x<-sw/2)return null;return{x,y:lanes[p.lane]}};
 const raw=()=>cl(7*hits/NI+3*(tot?band/tot:1)-.7*wrong-HI_.cost,0,10);
 const nep=()=>{if(stop)return;HI_.act();e=Math.max(0,e-.13);kg82Pluck(1,true)};
 const HI_=sgHint(box,10000,auto=>{if(stop)return;const now=performance.now();if(e>HI){kg82Pop(pops,W*.55,H*.5,"Bóng lộ rồi, chạm «Nép»","#8a7350");return}if(e<LO){kg82Pop(pops,W*.55,H*.5,"Còn xa, chờ bóng tiến lại","#8a7350");return}
  const q=ph.find(p=>!p.done&&p.imp&&(pos(p,now)||{x:-1}).x>MX+40);if(q){glow=q;gUntil=now+3500;kg82Pop(pops,W*.55,H*.5,auto?"Ma ma nhắc: câu này có từ cần nghe":"Câu sáng viền có từ cần nghe","#8a7350")}else kg82Pop(pops,W*.55,H*.5,"Chưa có câu đáng nghe, chờ thêm","#8a7350")});
 document.getElementById("sgnep").onclick=nep;
 k91Pointer(C,{down:(x,y)=>{if(stop)return;HI_.act();if(x<MX+22){nep();return}const now=performance.now();
  for(const p of ph){if(p.done)continue;const q=pos(p,now);if(!q)continue;if(Math.abs(x-q.x)<=sw/2&&Math.abs(y-q.y)<=sh/2+4){
   if(!hear()){kg82Pop(pops,q.x,q.y-sh,e<LO?"Xa quá, không nghe rõ":"Đang lộ bóng","#8a7350");return}
   p.done=p.imp?1:2;if(p.imp){hits++;kg82Pop(pops,q.x,q.y-sh,"Ghi nhớ!",K91C.good());kg82Pluck(3,true)}else{wrong++;kg82Pop(pops,q.x,q.y-sh,"Chuyện không đáng",K91C.red());kg82Pluck(0,false)}return}}}});
 function draw(now){kg82Bg(g,W,H,"nghe",.08,.5);
  g.save();g.font=k91F(700,15);g.fillStyle=K91C.ink;g.textAlign="center";g.textBaseline="middle";kg82Lbl(g,`Cần nghe: ${key.join(" · ")}`,MX+22+(W-MX-22)/2,H*.07,W-MX-40);g.restore();
  /* the shadow gauge: grey = too far, green = safe, red = seen */
  const yy=v=>y1-v*(y1-y0);g.save();k91RR(g,MX-9,y0,18,y1-y0,8);g.fillStyle="rgba(255,250,238,.85)";g.fill();
  g.fillStyle="rgba(120,110,95,.35)";g.fillRect(MX-8,yy(LO),16,yy(0)-yy(LO));g.fillStyle="rgba(45,122,82,.55)";g.fillRect(MX-8,yy(HI),16,yy(LO)-yy(HI));g.fillStyle="rgba(194,59,34,.5)";g.fillRect(MX-8,yy(1),16,yy(HI)-yy(1));
  k91RR(g,MX-9,y0,18,y1-y0,8);g.lineWidth=1.5;g.strokeStyle=K91C.hair;g.stroke();
  g.fillStyle=e>HI?K91C.red():e<LO?"#6b6256":K91C.gold();g.fillRect(MX-14,yy(e)-3,28,6);g.restore();
  g.save();g.font=k91F(700,11,true);g.fillStyle=K91C.ink;g.textAlign="center";kg82Lbl(g,"Lộ",MX,y0-6,30);kg82Lbl(g,"Xa",MX,y1+14,30);g.restore();
  g.save();g.beginPath();g.rect(MX+22,0,W,H);g.clip();for(const p of ph){const q=pos(p,now);if(!q)continue;const ok=hear();g.save();if(!ok&&!p.done)g.globalAlpha=.55;
   k91Tile(g,q.x-sw/2,q.y-sh/2,sw,sh,ok||p.done?p.s:"· · ·",p.done===1?"ok":p.done===2?"bad":"n",14);g.restore();if(glow===p&&now<gUntil&&!p.done)k91Glow(g,q.x-sw/2,q.y-sh/2,sw,sh,now)}g.restore();
  if(e>HI){g.save();g.strokeStyle=K91C.red();g.globalAlpha=.5+.3*Math.sin(now/120);g.lineWidth=5;g.strokeRect(2.5,2.5,W-5,H-5);g.restore()}
  kg82DrawPops(g,pops,now)}
 const stopL=k91Loop(now=>{if(stop)return;if(!t0){t0=now;last=now;gust=now+4000+Math.random()*2000}HI_.idle(now);const dt=Math.min(80,now-last);last=now;const tt=now-t0;
  e+=dt/1000*(.075+.04*Math.sin(tt/900));if(now>gust){e+=.12;gust=now+4000+Math.random()*2500;kg82Pop(pops,W*.6,H*.95,"Có tiếng bước chân!","#8a7350")}
  e=Math.max(0,e);if(e>=1){e=.55;wrong++;kg82Pop(pops,W*.6,H*.95,"Suýt lộ!",K91C.red())}
  tot+=dt;if(hear())band+=dt;
  env.hud({score:`${Math.round(raw())}/10`,round:"1/1",time:`${Math.max(0,Math.ceil((T-tt)/1000))} giây`});draw(now);
  if(tt>=T){stop=true;const r=Math.round(raw());setTimeout(()=>env.end(r,{hits,NI,wrong,band:tot?band/tot:1}),350)}});
 KG82.peek=()=>{if(stop)return null;if(e>HI-.08)return{sel:"#sgnep"};if(!hear())return null;const now=performance.now();
  for(const p of ph){if(p.done||!p.imp)continue;const q=pos(p,now);if(q&&q.x>MX+40+sw/4&&q.x<W-sw/4)return C.client(q.x,q.y)}return null};
 return()=>{stop=true;stopL()}}

/* ---------- 2. TRUYỀN LỜI ---------- */
const SG_ROLE=["Cung nữ","Thái giám","Ma ma","Thị vệ","Nhạc kỹ","Thợ thêu","Ngự trù","Phu kiệu"];
function sgGraph(){/* layered: 0 = Ngươi, columns 1–3 two courtiers each, 4 = người hầu cung nàng; forward edges only, each with trust 1–3; a few skip edges are short but risky */
 const roles=sgShuf(SG_ROLE);const N=[{c:0,j:0,n:"Ngươi"}];let r=0;for(let c=1;c<=3;c++)for(let j=0;j<2;j++)N.push({c,j,n:roles[r++]});N.push({c:4,j:0,n:"Cung nàng"});
 const col=c=>N.map((x,i)=>[x,i]).filter(([x])=>x.c===c).map(([,i])=>i);const E=[];const has=(a,b)=>E.some(x=>x.a===a&&x.b===b);
 const add=(a,b,t)=>{if(!has(a,b))E.push({a,b,t})};const tr=()=>1+Math.floor(Math.random()*3);
 for(let c=0;c<4;c++){const A=col(c),B=col(c+1);for(const a of A)for(const b of B)if(Math.random()<.6)add(a,b,tr());
  for(const a of A)if(!E.some(x=>x.a===a&&B.includes(x.b)))add(a,B[Math.floor(Math.random()*B.length)],tr());
  for(const b of B)if(!E.some(x=>x.b===b&&A.includes(x.a)))add(A[Math.floor(Math.random()*A.length)],b,tr())}
 for(let s=0;s<2;s++){const c=Math.floor(Math.random()*3);const A=col(c),B=col(c+2);add(A[Math.floor(Math.random()*A.length)],B[Math.floor(Math.random()*B.length)],1)}
 /* best (lowest risk = Σ(4 − trust)) path, DAG order by column */
 const best=N.map(()=>Infinity),prev=N.map(()=>-1);best[0]=0;const ord=N.map((x,i)=>i).sort((a,b)=>N[a].c-N[b].c);
 for(const a of ord)for(const x of E)if(x.a===a&&best[a]+4-x.t<best[x.b]){best[x.b]=best[a]+4-x.t;prev[x.b]=a}
 const T=N.length-1;const path=[];for(let k=T;k>=0;k=prev[k])path.unshift(k);return{N,E,best:best[T],path,T}}
function sgTruyen(box,env){const R=sgRM();const C=kg82Canvas(box,.9,420),{g,W,H}=C;const NB=3,LIM=12000;
 const nw=Math.min(78,(W-24)/5-20),nh=32;let b=0,G=null,path=[0],t0=0,phase="play",stop=false,pts=0,anim=null,risk=0,gl=-1,glU=0,hc=0;const pops=[];
 const HI_=sgHint(box,10000,auto=>{if(stop||phase!=="play"||!G)return;const ok=path.every((v,k)=>G.path[k]===v);const i=ok?G.path[path.length]:path[path.length-1];if(i==null||!G.N[i])return;gl=i;glU=performance.now()+3500;hc+=auto?.3:.6;
  const q=P(i);kg82Pop(pops,q.x,q.y-nh,ok?(auto?"Ma ma nhắc: người này tin cậy hơn":"Đi qua người sáng viền"):"Lùi lại: chặng này dễ bị lần ra","#8a7350")});
 const P=i=>{const x=G.N[i];if(!x)return{x:-999,y:-999};const n=x.c===0||x.c===4?1:2;return{x:12+nw/2+x.c*(W-24-nw)/4,y:n===1?H*.55:(x.j?H*.8:H*.3)+((x.c%2)?-H*.04:H*.04)}};
 const edge=(a,c)=>G.E.find(x=>x.a===a&&x.b===c);const sum=p=>p.slice(1).reduce((s,v,i)=>s+4-edge(p[i],v).t,0);
 const next=()=>{if(b>=NB){stop=true;return setTimeout(()=>env.end(pts,{}),400)}G=sgGraph();path=[0];risk=0;phase="play";t0=performance.now();anim=null;gl=-1;HI_.act()};
 const finish=(ok)=>{phase="wait";const T=G.T;let got=0;if(ok){got=Math.max(0,10/NB*Math.pow(G.best/Math.max(G.best,risk),1.3)-hc/NB);const P0=P(T);kg82Pop(pops,P0.x,P0.y-nh,risk<=G.best?"Kín kẽ!":"Lời đã tới",risk<=G.best?K91C.good():K91C.gold())}
  else{const P0=P(path[path.length-1]);kg82Pop(pops,P0.x,P0.y-nh,"Hết giờ, lời chưa tới",K91C.red())}pts+=got;b++;setTimeout(next,R?700:1100)};
 const tapN=i=>{if(phase!=="play"||stop)return;HI_.act();const L=path[path.length-1];if(i===L&&path.length>1){path.pop();risk=sum(path);return}
  const ed=edge(L,i);if(!ed){const q=P(i);kg82Pop(pops,q.x,q.y-nh,"Không quen người này","#8a7350");return}
  if(path.length>4){const q=P(i);kg82Pop(pops,q.x,q.y-nh,"Lời truyền quá xa","#8a7350");return}
  path.push(i);risk=sum(path);kg82Pluck(path.length,true);if(i===G.T){phase="anim";anim=performance.now();setTimeout(()=>finish(true),R?0:700)}};
 k91Pointer(C,{down:(x,y)=>{if(!G)return;for(let i=0;i<G.N.length;i++){const q=P(i);if(Math.abs(x-q.x)<=nw/2+4&&Math.abs(y-q.y)<=nh/2+6){tapN(i);return}}}});
 function draw(now){kg82Bg(g,W,H,"truyen",.12,.5);
  g.save();g.fillStyle="rgba(255,250,238,.45)";g.fillRect(0,0,W,H);g.restore();
  /* edges: trust 3 = gold solid, 2 = amber, 1 = red dashed; dots at the middle = trust */
  for(const x of G.E){const a=P(x.a),c=P(x.b);const on=path.some((v,k)=>k>0&&path[k-1]===x.a&&v===x.b);g.save();
   g.strokeStyle=on?K91C.ink:x.t===3?"#b8860b":x.t===2?"#d0662a":"#b8321f";g.lineWidth=on?4.5:x.t===3?3:x.t===2?2.2:1.6;if(x.t===1&&!on)g.setLineDash([6,5]);
   g.beginPath();g.moveTo(a.x,a.y);g.lineTo(c.x,c.y);g.stroke();g.setLineDash([]);
   const mx=a.x+(c.x-a.x)*.42,my=a.y+(c.y-a.y)*.42;g.fillStyle="#fffaf0";g.beginPath();g.ellipse(mx,my,6+x.t*5,7,0,0,Math.PI*2);g.fill();g.lineWidth=1;g.strokeStyle=K91C.hair;g.stroke();
   for(let d=0;d<x.t;d++){g.fillStyle=x.t===3?"#b8860b":x.t===2?"#d0662a":"#b8321f";g.beginPath();g.arc(mx-(x.t-1)*5+d*10,my,3.2,0,Math.PI*2);g.fill()}g.restore()}
  const L=path[path.length-1];
  for(let i=0;i<G.N.length;i++){const q=P(i),x=G.N[i];const st=path.includes(i)?(i===L?"on":"ok"):(phase==="play"&&edge(L,i)?"n":"n");
   g.save();if(phase==="play"&&!path.includes(i)&&!edge(L,i)&&i!==0)g.globalAlpha=.7;k91Tile(g,q.x-nw/2,q.y-nh/2,nw,nh,x.n,st,13,i===G.T?"doi-slip":"tho-slip");g.restore();if(gl===i&&now<glU&&phase==="play")k91Glow(g,q.x-nw/2,q.y-nh/2,nw,nh,now)}
  if(anim&&!R&&path.length>1&&path.every(i=>G.N[i])){const k=Math.min(1,(now-anim)/650);const segs=path.length-1;const f=k*segs;const s=Math.min(segs-1,Math.floor(f));const a=P(path[s]),c=P(path[s+1]);const u=f-s;
   g.save();g.fillStyle=K91C.gold();g.shadowColor="#f0d070";g.shadowBlur=12;g.beginPath();g.arc(a.x+(c.x-a.x)*u,a.y+(c.y-a.y)*u,6,0,Math.PI*2);g.fill();g.restore()}
  /* trace gauge (top): how easily the word can be traced back to her */
  const gw=Math.min(220,W*.45),gx=12,gy=H*.055;g.save();k91RR(g,gx,gy-7,gw,14,7);g.fillStyle="rgba(255,250,238,.9)";g.fill();g.strokeStyle=K91C.hair;g.stroke();
  const fr=Math.min(1,risk/9);k91RR(g,gx+1,gy-6,Math.max(0,(gw-2)*fr),12,6);g.fillStyle=fr<.45?K91C.good():fr<.75?"#d0662a":K91C.red();if(fr>0)g.fill();
  g.font=k91F(700,12,true);g.fillStyle=K91C.ink;g.textAlign="left";g.textBaseline="middle";kg82Lbl(g,`Dấu vết ${risk}`,gx+gw+8,gy,W-gx-gw-16);g.restore();
  kg82DrawPops(g,pops,now)}
 next();const stopL=k91Loop(now=>{if(stop&&!pops.length)return;if(G){if(phase==="play"){HI_.idle(now);const left=LIM-(now-t0);if(left<=0)finish(false);
   env.hud({score:`${Math.round(Math.min(10,pts))}/10`,round:`${Math.min(b+1,NB)}/${NB}`,time:`${Math.max(0,Math.ceil(left/1000))} giây`})}draw(now)}});
 KG82.peek=()=>{if(stop||phase!=="play"||!G)return null;const ok=path.every((v,k)=>G.path[k]===v);const i=ok?G.path[path.length]:path[path.length-1];if(i==null||!G.N[i])return null;const q=P(i);return C.client(q.x,q.y)};
 return()=>{stop=true;stopL()}}

/* ---------- 3. MẶC CẢ ----------
   A price bar (Ít → Rất hậu, no numbers): her hidden threshold comes from her temper (seeded from her name) and her loyalty to her mistress.
   3 hồi: set the bar, tap «Ngỏ giá»; her answer (Phật ý / Lắc đầu / Ngập ngừng / Nhận lời) tells how far below her threshold the offer is.
   The silver actually spent is ALWAYS the act card's Tốn (same price as NPCs); the game only moves the odds one step. */
const SG_TEMP=[["tham bạc",-.12],["nhát gan",.1],["thật thà",.04],["khôn lỏi",-.04]];
const SG_TR={tham:0,nhat:1,trung:2,lanh:3,chuyen:3};
function sgTemper(m){if(m&&qv(SG_TR,m)!=null)return SG_TEMP[qv(SG_TR,m)];const s=String(m&&m.name||"");let h=7;for(const c of s)h=(h*31+c.charCodeAt(0))%9973;return SG_TEMP[h%SG_TEMP.length]}
function sgLoyW(l){return l>=70?"rất trung":l>=50?"trung":l>=30?"vừa phải":"lỏng"}
function sgThr(v){const m=v&&v.maid||{};const loy=m.loyal==null?50:m.loyal;return cl(.3+loy/220+sgTemper(m)[1]+(Math.random()-.5)*.1,.18,.86)}
const SG_GIA=["Ít ỏi","Nhẹ tay","Vừa phải","Hậu","Rất hậu"];
function sgGiaW(x){return SG_GIA[Math.min(4,Math.floor(x*5))]}
function sgMac(box,env){const R=sgRM();const C=kg82Canvas(box,.66,300),{g,W,H}=C;const NR=3,LIM=10000;
 const v=env.v;let T=sgThr(v);let X=.3,r=0,t0=0,phase="play",stop=false,deal=0,shown=null,mt=0,drag=false;const H0=[];const pops=[];
 k91Btns(box,[["sgminus","Bớt",""],["sgplus","Thêm",""],["sggive","Ngỏ giá","trao lời ngỏ này"]]);
 const HI_=sgHint(box,9000,auto=>{if(phase!=="play"||stop)return;const d=X-T;const w=d>.2?"Hậu quá, nàng sinh nghi: bớt đi":d>=0?"Giá này nàng chịu, ngỏ đi":d>=-.08?"Gần rồi, thêm chút nữa":d>=-.2?"Còn thấp, thêm một ít":"Còn thấp lắm, thêm hẳn";kg82Pop(pops,W/2,H*.3,auto?"Ma ma nhắc: "+w.toLowerCase():w,"#8a7350")});
 const set=d=>{if(phase!=="play")return;HI_.act();X=cl(Math.round((X+d)*20)/20,0,1);kg82Pluck(d>0?2:1,true)};
 const gx=24,gw=W-48,by=H*.56,bh=22;const toX=x=>cl((x-gx)/gw,0,1);
 k91Pointer(C,{down:(x,y)=>{if(phase!=="play"||stop)return;HI_.act();if(Math.abs(y-by-bh/2)<=34){drag=true;X=toX(x)}},move:(x)=>{if(drag&&phase==="play")X=toX(x)},up:()=>{drag=false}});
 const Z=d=>d>=0?[3,"Nhận lời"]:d>=-.08?[2,"Ngập ngừng"]:d>=-.2?[1,"Lắc đầu"]:[0,"Phật ý"];
 const give=()=>{if(phase!=="play"||stop)return;const d=X-T;const [z,w]=Z(d);shown=z;mt=performance.now();H0.push(`Hồi ${r+1}: giá ${sgGiaW(X).toLowerCase()} · ${w}`);
  if(z===3){deal=r+1;phase="wait";stop=true;env.hud({score:`${deal===1?10:deal===2?8:6}/10`});const over=d>.2;kg82Pop(pops,W/2,H*.3,over?"Nàng nhận, nhưng sinh nghi":"Nàng nhận lời!",over?K91C.gold():K91C.good());kg82Pluck(4,true);
   const raw=Math.max(0,(over?5:deal<=2?(deal===1?10:8):6)-HI_.cost);setTimeout(()=>env.end(raw,{deal,over}),R?300:900);return}
  if(z===0){T=Math.min(.95,T+.05);kg82Pop(pops,W/2,H*.3,"Phật ý: nàng đòi thêm",K91C.red())}else kg82Pop(pops,W/2,H*.3,w,"#8a7350");kg82Pluck(0,false);
  r++;phase="wait";if(r>=NR){stop=true;setTimeout(()=>env.end(2,{deal:0}),R?300:900);return}setTimeout(()=>{phase="play";t0=performance.now()},R?150:600)};
 document.getElementById("sgminus").onclick=()=>set(-.05);document.getElementById("sgplus").onclick=()=>set(.05);document.getElementById("sggive").onclick=give;
 function draw(now){kg82Bg(g,W,H,"mac",.1,.6);g.save();g.fillStyle="rgba(255,250,238,.35)";g.fillRect(0,0,W,H);g.restore();
  /* her answer: four marks, the last one lit */
  const zl=["Phật ý","Lắc đầu","Ngập ngừng","Nhận lời"],zc=[K91C.red(),"#d0662a","#c99a1e",K91C.good()];const cw=(W-32)/4;
  g.save();g.font=k91F(700,12,true);g.textAlign="center";g.textBaseline="middle";g.fillStyle=K91C.ink;kg82Lbl(g,"Lời nàng đáp",W/2,H*.08,W-40);
  for(let i=0;i<4;i++){const x=16+cw*i;const on=shown===i;k91RR(g,x+3,H*.13,cw-6,26,8);g.fillStyle="rgba(255,250,238,.9)";g.fill();g.lineWidth=on?3:1;g.strokeStyle=on?zc[i]:K91C.hair;g.stroke();
   g.fillStyle=on?zc[i]:K91C.ink;kg82Lbl(g,zl[i],x+cw/2,H*.13+13,cw-12)}g.restore();
  /* the price bar */
  g.save();k91RR(g,gx,by,gw,bh,11);g.fillStyle="rgba(255,250,238,.92)";g.fill();g.strokeStyle=K91C.hair;g.lineWidth=1.5;g.stroke();
  k91RR(g,gx+2,by+2,Math.max(4,(gw-4)*X),bh-4,9);g.fillStyle=K91C.gold();g.fill();
  const kx=gx+gw*X;g.fillStyle=K91C.ink;g.beginPath();g.arc(kx,by+bh/2,13,0,Math.PI*2);g.fill();g.fillStyle="#fffaf0";g.beginPath();g.arc(kx,by+bh/2,6,0,Math.PI*2);g.fill();
  g.font=k91F(600,11,true);g.fillStyle=K91C.ink;g.textBaseline="top";g.textAlign="left";kg82Lbl(g,"Ít",gx,by+bh+6,60);g.textAlign="right";kg82Lbl(g,"Rất hậu",gx+gw,by+bh+6,80);g.restore();
  g.save();g.font=k91F(700,18);g.textAlign="center";g.textBaseline="middle";g.fillStyle=K91C.ink;kg82Lbl(g,`Giá ngỏ: ${sgGiaW(X)}`,W/2,H*.43,W-40);g.restore();
  if(H0.length){g.save();g.font=k91F(600,12,true);g.textAlign="center";g.textBaseline="middle";g.fillStyle=K91C.ink;kg82Lbl(g,H0[H0.length-1],W/2,H*.86,W-40);g.restore()}
  kg82DrawPops(g,pops,now)}
 t0=performance.now();const stopL=k91Loop(now=>{if(phase==="play"){HI_.idle(now);const left=LIM-(now-t0);if(left<=0)give();
   env.hud({score:`${deal?(deal===1?10:deal===2?8:6):0}/10`,round:`${Math.min(r+1,NR)}/${NR}`,time:`${Math.max(0,Math.ceil(left/1000))} giây`})}draw(now);if(stop&&!pops.length&&now-mt>500)return});
 /* test helper: walk the bar up to her threshold */
 KG82.peek=()=>{if(phase!=="play"||stop)return null;return{sel:X<T?"#sgplus":"#sggive"}};
 KG82.peekBad=()=>{if(phase!=="play"||stop)return null;return{sel:X>0?"#sgminus":"#sggive"}};
 return()=>{stop=true;stopL()}}

/* ---------- 4. THỜI CƠ (generic timing; Hại nặng / Sát hại acts; owner 11/15: fully abstract, card wording only) ----------
   A watcher's attention rises and falls; tap «Ra tay» when it is lowest. Waiting raises suspicion; a tap at high attention raises it more. 3 rounds. */
KG82_SPR.thoico=[];
function sgThoiCo(box,env){const R=sgRM();const C=kg82Canvas(box,.6,300),{g,W,H}=C;const NR=3,LIM=8000;
 k91Btns(box,[["sgtap","Ra tay","khi chú ý thấp nhất"]]);
 const HI_=sgHint(box,0,auto=>{if(phase!=="play"||stop)return;const n=performance.now(),a=att(n),b=att(n+350);const w=a<.25?"Ngay lúc này!":b<a?"Chú ý đang hạ, chờ thêm chút":"Chú ý đang lên, chờ nó hạ";kg82Pop(pops,W/2,H*.5,auto?"Ma ma nhắc: "+w.toLowerCase():w,"#8a7350")});
 let r=0,t0=0,ph0=Math.random()*6,sus=0,q=[],phase="play",stop=false,last=0,mark=null;const pops=[];
 const fr=[.9+Math.random()*.4,2.1+Math.random()*.5];
 const att=now=>{const t=(now-t0)/1000;return cl(.5+.32*Math.sin(t*fr[0]+ph0)+.16*Math.sin(t*fr[1]+ph0*2),0,1)};
 const raw=()=>{const a=q.length?q.reduce((s,x)=>s+x,0)/NR:0;return cl(10*a-3*sus-HI_.cost,0,10)};
 const tap=()=>{if(phase!=="play"||stop)return;HI_.act();const now=performance.now();const a=att(now);q.push(1-a);if(a>.6)sus=Math.min(1,sus+.2);mark={a,now};
  kg82Pop(pops,W/2,H*.5,a<.25?"Đúng lúc!":a<.5?"Tạm được":"Bị để ý",a<.25?K91C.good():a<.5?K91C.gold():K91C.red());kg82Pluck(a<.25?4:a<.5?2:0,a<.5);
  r++;phase="wait";if(r>=NR){stop=true;setTimeout(()=>env.end(raw(),{}),R?300:800);return}setTimeout(()=>{phase="play";t0=performance.now();ph0=Math.random()*6},R?200:700)};
 document.getElementById("sgtap").onclick=tap;
 const gx=20,gw=W-40;
 function bar(y,v,lab,cols){g.save();k91RR(g,gx,y,gw,16,8);g.fillStyle="rgba(255,250,238,.9)";g.fill();g.strokeStyle=K91C.hair;g.stroke();
  if(v>0){k91RR(g,gx+1,y+1,Math.max(2,(gw-2)*v),14,7);g.fillStyle=v<.25?cols[0]:v<.6?cols[1]:cols[2];g.fill()}
  g.font=k91F(700,12,true);g.fillStyle=K91C.ink;g.textAlign="left";g.textBaseline="bottom";kg82Lbl(g,lab,gx,y-3,gw);g.restore()}
 function draw(now){kg82Bg(g,W,H,"thoico",.1,.5);g.save();g.fillStyle="rgba(255,250,238,.3)";g.fillRect(0,0,W,H);g.restore();
  const a=phase==="play"?att(now):(mark?mark.a:.5);
  bar(H*.24,a,"Người canh chú ý",[K91C.good(),"#c99a1e",K91C.red()]);bar(H*.76,sus,"Nghi ngờ",[K91C.good(),"#d0662a",K91C.red()]);
  kg82DrawPops(g,pops,now)}
 t0=performance.now();const stopL=k91Loop(now=>{if(phase==="play"){HI_.idle(now);const left=LIM-(now-t0);sus=Math.min(1,sus+(now-(last||now))/1000*.015);if(left<=0)tap();
  env.hud({score:`${Math.round(raw())}/10`,round:`${Math.min(r+1,NR)}/${NR}`,time:`${Math.max(0,Math.ceil(left/1000))} giây`})}last=now;draw(now)});
 KG82.peek=()=>{if(phase!=="play"||stop)return null;return att(performance.now())<.22?{sel:"#sgtap"}:null};
 KG82.peekBad=()=>{if(phase!=="play"||stop)return null;return att(performance.now())>.75?{sel:"#sgtap"}:null};
 return()=>{stop=true;stopL()}}

/* ---------- odds ladder: a game moves the odds by ONE step of Liều / Khó / Năm ăn năm thua / Khá chắc / Chắc / Rất chắc / Nắm chắc ----------
   raw 7–10 = up one step, 4–6 = unchanged, 0–3 = down one step. The number keeps its place inside the new step (word() boundaries). */
const SG_LO=[5,31,46,56,66,81,91],SG_HI=[30,45,55,65,80,90,95];
function sgLv(o){return o>=91?6:o>=81?5:o>=66?4:o>=56?3:o>=46?2:o>=31?1:0}
function sgShift(o,d){if(!d)return o;const l=sgLv(o),l2=cl(l+d,0,6);if(l2===l)return o;const f=cl((o-SG_LO[l])/Math.max(1,SG_HI[l]-SG_LO[l]),0,1);return Math.round(SG_LO[l2]+f*(SG_HI[l2]-SG_LO[l2]))}
function sgStep(raw){return raw>=7?1:raw<=3?-1:0}

/* ---------- the act table ---------- */
const SG_HUD=t=>[["score","Phần","0/10"],["round","Hồi","1/3"],["time","Còn",t]];
SG.K={
 spy:{g:"nghe",t:"Nghe ngóng",eng:sgNghe,dur:"30 giây",
  how:"Chạm «Nép» để giữ bóng trong dải xanh: xa quá thì không nghe rõ, gần quá thì lộ. Chạm câu thật có từ cần nghe; câu có từ khác là lời đồn.",
  hud:[["score","Phần","0/10"],["round","Bóng","Kín"],["time","Còn","30 giây"]],
  steps:["Chạm «Nép» để bóng nằm trong dải xanh: xa quá không nghe rõ, gần quá bị lộ.","Dòng «Cần nghe» ghi ba từ. Chạm câu có từ ấy.","Câu có từ khác là lời đồn, chuyện vặt thì bỏ qua."],
  ask:v=>`Dò la ${NM(v)}: tự mình nép sau bình phong nghe ngóng, hay giao cho người làm?`},
 rumor:{g:"truyen",t:"Truyền lời",eng:sgTruyen,dur:"3 hồi, mỗi hồi 12 giây",
  how:"Chạm từng người một, từ «Ngươi» tới «Cung nàng». Mỗi chặng có một tới ba chấm tin cậy: ít chấm thì dễ bị lần ra. Chạm lại người cuối để lùi.",
  hud:SG_HUD("12 giây"),steps:["Chạm lần lượt từng người, từ «Ngươi» tới «Cung nàng».","Chấm vàng là tin cậy, chấm đỏ là dễ bị lần ra: chọn đường nhiều chấm vàng.","Chạm lại người cuối để lùi bước."],ask:v=>`Tung tin đồn về ${NM(v)}: tự chọn người truyền lời, hay giao cho người làm?`},
 bribe:{g:"mac",t:"Mặc cả",eng:sgMac,dur:"3 hồi, mỗi hồi 10 giây",
  how:"Kéo thanh giá hoặc chạm «Thêm» / «Bớt», rồi chạm «Ngỏ giá». Lời nàng đáp cho biết còn xa hay gần giá nàng chịu. Ngỏ quá hậu thì nàng sinh nghi.",
  hud:SG_HUD("10 giây"),steps:["Chạm «Thêm» hoặc «Bớt» (hay kéo thanh) để chọn giá ngỏ, từ Ít tới Rất hậu.","Chạm «Ngỏ giá»; lời nàng đáp cho biết còn xa hay gần giá nàng chịu.","Nhận lời sớm thì tốt; ngỏ quá hậu thì nàng sinh nghi."],
  ask:v=>`Mua chuộc cung nữ của ${NM(v)}: tự mặc cả, hay giao cho người làm?`}};
/* Thời cơ on the stealth acts of the Hại nặng / Sát hại groups. Fully abstract (owner 11/15): the game screens never name the act or any method,
   only "Thời cơ" and the target; the act's own card (Cần/Tốn/Được/Mất) stays as it is in the choice dialog. */
const SG_THOI=["frame","block","ksab","lygian","poison","kpoison","pond","pushp","musk","catswap","kframe","slowpoison"];
SG_THOI.forEach(k=>{if(!ACT[k]||!ACT[k].o||SG.K[k])return;
 SG.K[k]={g:"thoico",t:"Thời cơ",eng:sgThoiCo,dur:"3 hồi, mỗi hồi 8 giây",hide:1,
  how:"Chạm «Ra tay» lúc người canh chú ý thấp nhất. Chờ lâu hay ra tay lúc bị để ý thì nghi ngờ tăng.",
  hud:SG_HUD("8 giây"),steps:["Thanh «Người canh chú ý» lên xuống liên tục.","Chạm «Ra tay» lúc thanh thấp nhất.","Chờ lâu hay ra tay lúc bị để ý thì nghi ngờ tăng."],ask:v=>`Việc nhắm vào ${NM(v)}: tự mình chọn thời cơ, hay giao cho người làm?`}});
/* ---------- jobs: every place a scheme can start is a "job" built from saved params (PEND.sgpick params survive save / load) ----------
   j:"act"   person card / Hậu cung act card (doAct)            {v,k}
   j:"place" the place's own act entry (Dò la, Tung tin đồn, Bỏ độc…, j9 placeHarms)  {v,k,pi}  paid through the place popup (a.open)
   j:"over"  "Nghe lén câu chuyện" at a place (j78 overhear) → Nghe ngóng          {pi}
   j:"serv"  "Mua chuộc" a servant of another palace (bribeServ j29 / j10 / j15) → Mặc cả   {sid}
   job = {gk (SG.K key), t (game title), v (target, for the game), name, p0() (odds now), line(word) (card text), ask, cost (silver text), pay()→bool (take the time/silver), run(m) (act under the step), art} */
function sgOdds(v,k){const a=ACT[k];const o=a&&a.o?a.o(S,v):50;return cl(Math.round(o+(typeof lotB==="function"?lotB(S,ACTDOM[k]):0)),5,95)}
function sgLine(v,k,w,c){const prev=typeof J78!=="undefined"?J78.cardV:null;try{if(typeof J78!=="undefined")J78.cardV=v;return actLineRaw(k,w,c)}finally{if(typeof J78!=="undefined")J78.cardV=prev}}
function sgCan(i,k){const v=rivals[i],a=ACT[k];if(!v||!a||!SG.K[k]||typeof S==="undefined"||!S||S.dead||Q.length||!v.alive||v.out||!can(BAL.actK)||!a.ok(S,v))return false;
 if(typeof k61Named==="function"&&!k61Named(v))return false;if(S.confined&&typeof CRIME!=="undefined"&&CRIME.includes(k))return false;if(k==="bribe"&&!v.maid)return false;return true}
function sgTitle(k){return SG.K[k]&&SG.K[k].hide?"Thời cơ":ACT[k].n}
SG.K.over={g:"nghe",t:"Nghe ngóng",eng:sgNghe,dur:"30 giây",how:SG.K.spy.how,hud:SG.K.spy.hud,steps:SG.K.spy.steps,ask:()=>"Nghe lén câu chuyện ở đây: tự mình nép sau bình phong nghe ngóng, hay nghe qua loa?"};
SG.K.serv={g:"mac",t:"Mặc cả",eng:sgMac,dur:"3 hồi, mỗi hồi 10 giây",how:SG.K.bribe.how,hud:SG_HUD("10 giây"),steps:SG.K.bribe.steps,ask:()=>"Mua chuộc người hầu cung khác: tự mặc cả, hay giao cho người làm?"};
const SG_ACTS=[["Dò la","spy"],["Tung tin đồn","rumor"],["Bỏ độc vào trà nàng","poison"],["Bỏ xạ hương vào thuốc nàng","musk"],["Đẩy con nàng xuống hồ","pond"],["Vu oan","frame"]];
function sgServCost(s){return nv(s,"bribeCost")}
function sgServOdds(s){return odA(S,35+nq(s,"greed",BAL.net.k.bribeGreed)-nq(s,"timid",BAL.net.k.bribeTimid)-nq(s,"loyal",BAL.net.k.bribeLoyal)-s.loyal/3+S.tamco/5)}
function sgPopPay(pi,tc){return()=>{if(!can(tc))return false;spend(tc);try{S.payOnPick=0}catch(e){}try{if(pi!=null&&S.visit){S.visit.tk=S.visit.tk||{};S.visit.tk[pi]=1}}catch(e){}return true}}
function sgJob(p){if(!p||typeof S==="undefined"||!S)return null;if(!p.j)p.j="act";
 if(p.j==="act"||p.j==="place"){const v=RV(p.v),k=p.k,a=ACT[k],G=SG.K[k];if(!v||!a||!G)return null;
  const J={gk:k,G,t:G.t,v,name:NM(v),art:G.hide?NM(v):a.n,ask:G.ask(v),cost:fmt(a.c)||"không tốn bạc",p0:()=>sgOdds(v,k),line:w=>sgLine(v,k,w,fmt(a.c)||"không tốn bạc")};
  if(p.j==="act"){J.pay=()=>true;J.run=m=>sgRun(v.id,k,m)}
  else{J.pay=sgPopPay(p.pi,BAL.actK);J.run=m=>{SG.mod=m&&m.step?m:null;let r="";try{r=runAct(S,v,k)||""}finally{SG.mod=null}if(r)log(`${a.n}: ${r}`);render()}}
  return J}
 if(p.j==="over"){const G=SG.K.over,b=40+S.mat*6;
  return{gk:"over",G,t:G.t,v:{},name:"",art:"Nghe lén",ask:G.ask(),cost:"không tốn bạc",p0:()=>od(b),line:w=>`Nghe lén câu chuyện · ${w} · biết 1 điều thật về nàng · chứng cứ +1 · tốn: không tốn bạc`,pay:sgPopPay(p.pi,1),
   run:m=>{SG.mod=m&&m.step?m:null;let r="";try{r=overhear(S.place)||""}finally{SG.mod=null}if(r)log(`Nghe lén câu chuyện: ${r}`);render()}}}
 if(p.j==="serv"){const s=servById(p.sid),G=SG.K.serv;if(!s)return null;const o=ownerOf(s),c=sgServCost(s);if(!o||o===S)return null;
  return{gk:"serv",G,t:G.t,v:{maid:s},name:s.name,art:"Mua chuộc",ask:`Mua chuộc ${s.name}, người hầu của ${NM(o)}: tự mặc cả, hay giao cho người làm?`,cost:`${c} bạc`,p0:()=>sgServOdds(s),
   line:w=>`Mua chuộc ${s.name} · ${w} · thành: thành tai mắt của ngươi · tốn: ${c} bạc · thất bại: nàng mách chủ`,
   pay:()=>{if(S.bac<c||!can(BAL.servK))return false;spend(BAL.servK);return true},run:m=>{SG.mod=m&&m.step?m:null;let r="";try{r=bribeServ(S,s)||""}finally{SG.mod=null}if(r)log(r);render()}}}
 return null}

/* ---------- the choice: Tự ra tay (game) · Giao cho người làm (plain odds) · Thôi ---------- */
PEND.sgpick=p=>{const J=sgJob(p);if(!J)return null;const G=J.G,p0=J.p0();
 const up=word(sgShift(p0,1)),dn=word(sgShift(p0,-1));const base=J.line(word(p0));
 const gl=base+` · (tự chơi ${G.dur}: khéo thì lên ${up}, vụng thì xuống ${dn})`;
 const go=f=>()=>{const J2=sgJob(p);if(!J2||!J2.pay()){try{render()}catch(e){}return}f(J2)};
 return{t:`<p>${J.ask}</p>`,who:p.j==="act"||p.j==="place"?(typeof pv==="function"?pv(J.v):null):null,o:[{n:`Tự ra tay: ${G.t}`,fx:{},x:gl,showOut:true,go:go(J2=>sgPlay(J2))},{n:"Giao cho người làm",fx:{},x:base,showOut:true,go:go(J2=>J2.run(null))},{n:"Thôi",fx:{},showOut:true}]}};
function sgAsk(p,title){const d=mkP("sgpick",p);if(!d)return;pushDil(d,title);showModal()}
/* the act-card click (person card / Hậu cung): capture before j6's panel handler; bots that call doAct() directly are untouched */
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("button[data-r][data-a]");if(!b||b.disabled)return;const k=b.dataset.a;if(!SG.K[k])return;
 const i=+b.dataset.r;if(!sgCan(i,k))return;e.stopPropagation();e.preventDefault();sgAsk({j:"act",v:rivals[i].id,k},sgTitle(k))},true);
/* the servant card / list «Mua chuộc» (j10 list + j15 person card, data-sv="mua"): the same Mặc cả; spending (2 khắc + silver) happens when she chooses */
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest('button[data-sv="mua"]');if(!b||b.disabled)return;if(typeof S==="undefined"||!S||S.dead||Q.length)return;
 const s=servById(+b.dataset.sid);if(!s||!ownerOf(s)||ownerOf(s)===S||S.bac<sgServCost(s)||!can(BAL.servK))return;e.stopPropagation();e.preventDefault();sgAsk({j:"serv",sid:s.sid},"Mua chuộc")},true);
/* the place popup (j2 talkOpts): Nghe lén câu chuyện + the place's scheme acts open the same choice (a.open, free to cancel) */
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{if(!p||p.kind!=="rival"||!p.ref||!Array.isArray(A))return A;const v=p.ref;
 A.forEach((a,i)=>{if(!a||a.lock||a.open)return;let q=null;
  if(a.n==="Nghe lén câu chuyện")q={j:"over"};
  else{const m=a.act&&SG_ACTS.find(x=>x[0]===a.n);if(m&&SG.K[m[1]]&&ACT[m[1]]&&!(S.confined&&typeof CRIME!=="undefined"&&CRIME.includes(m[1])))q={j:"place",v:v.id,k:m[1]}}
  if(q)A[i]=Object.assign({},a,{open:()=>sgAsk(Object.assign({pi:popIdx},q),q.j==="over"?"Nghe ngóng":sgTitle(q.k)),run:undefined})})}catch(e){}return A}})();

/* ---------- play → result page → act ---------- */
function sgPlay(J){const G=J.G;if(typeof S==="undefined"||!S||S.dead){try{render()}catch(e){}return}
 KG82.ctx="muu";kg82Preload(G.g).then(()=>{});const d=kg82Open({art:J.art,title:G.t,how:G.how});if(!d)return;const box=kg82Box();const p0=J.p0();const v=J.v,k=J.gk;
 const seenK="sg:"+G.t;
 const rows=[["Cơ may",kitOdds(p0)+`<small class="kpnote"> hiện nay; khéo thì lên ${word(sgShift(p0,1))}, vụng thì xuống ${word(sgShift(p0,-1))}</small>`]];
 if(G.g==="mac"){const m=v.maid||{};rows.push(["Cung nữ",`tính ${sgTemper(m)[0]}, lòng trung với chủ ${sgLoyW(m.loyal==null?50:m.loyal)}`]);
  rows.push(["Tốn",`${J.cost} · như thẻ việc, mặc cả chỉ đổi cơ may`])}
 /* mg-easy: a one-screen how-to card the first time (S.mgSeen), then only the Gợi ý button + a quiet nudge when she stalls */
 const first=!kg82Seen(seenK);const how=first?`<h4 class="kpst">Cách chơi, lần đầu</h4>`+kitRows(G.steps.map((t,i)=>[`Bước ${i+1}`,t]))+`<div class="kpnote">Chưa rõ thì chạm «Gợi ý» (bớt một ít phần), hoặc để ma ma tự nhắc khi ngươi dừng lâu.</div>`:"";
 const intro=()=>{KG82.phase="intro";box.innerHTML=how+kitRows(rows)+`<div class="kg82act"><button class="${kg82Btn()}" id="sggo">${first?"Đã hiểu, bắt đầu":"Bắt đầu"}</button><button class="${kg82Btn(true)}" id="sgskip">Giao cho người làm<small>cơ may như hiện nay</small></button></div>`;
  $("sggo").onclick=()=>{kg82Seen(seenK,true);sgEng(G,v,(raw,o)=>finish(raw,o))};$("sgskip").onclick=()=>{kg82Close();J.run(null)}};
 const finish=(raw,o)=>{KG82.phase="result";const st=sgStep(raw);const m={step:st};const p1=sgShift(p0,st);
  const parts=[["Phần chơi",`${kg82Word(raw)} · ${raw}/10`]];
  if(G.eng===sgNghe)parts.push(["Câu thật nghe được",`${o.hits||0} / ${o.NI||0}${o.wrong?` · lầm lời đồn ${o.wrong}`:""}`]);
  if(G.g==="mac")parts.push(["Mặc cả",o.deal?`nàng nhận lời ở hồi ${o.deal}${o.over?", nhưng giá quá hậu nên sinh nghi":""}`:"nàng chưa nhận lời"]);
  const xr=[["Cơ may",`${kitOdds(p0)} <span class="ksep">→</span> ${kitOdds(p1)}`]];
  const note=st>0?"Khéo léo: cơ may lên một bậc.":st<0?"Vụng về: cơ may xuống một bậc.":"Cơ may giữ nguyên.";
  const html=kitGameResult({parts,note:note+" Chạm «Ra tay»: việc làm theo cơ may này, kết quả hiện ở thẻ kết quả."})+kitRows(xr)+
   `<div class="kg82act"><button class="${kg82Btn()}" id="sgdo">Ra tay</button></div>`;
  kg82ShowRes(html,st>0?true:st<0?false:null);/* merge-train-4: result sound (result-sfx): odds up = win, down = lose */kg82Set("score",`${raw}/10`);kg82Set("time","đã hết");$("sgdo").onclick=()=>{kg82Close();J.run(m)};const dd=kg82El();if(dd)dd.scrollTop=0};
 intro()}
function sgEng(G,v,onEnd){const box=kg82Box();box.innerHTML="";const res=$("kg82box-res");if(res){res.hidden=true;res.innerHTML=""}KG82.phase="play";let done=false,dead=false,stop=null;
 KG82.peekBad=null;const env={v,lv:0,hud:o=>{for(const k in o)kg82Set(k,kg82Cap(o[k]))},end:(raw,info)=>{if(done)return;done=true;clearTimeout(guard);KG82.peek=()=>null;KG82.peekBad=null;const st=stop;KG82.run=null;try{if(st)st()}catch(e){}onEnd(cl(Math.round(raw),0,10),info||{})}};
 const guard=setTimeout(()=>env.end(0,{}),70000);KG82.run={stop:()=>{dead=true;clearTimeout(guard);if(stop)stop()}};
 kg82Preload(G.g).then(()=>{if(dead||done)return;try{stop=G.eng(box,env)}catch(e){console.error(e);env.end(5,{})}})}
/* run the act through the normal doAct chain (cost, result card, logs, notes); the step lives only inside this call */
function sgRun(id,k,m){const v=RV(id),i=rivals.indexOf(v);if(i<0)return;SG.mod=m&&m.step?m:null;try{doAct(i,k)}finally{SG.mod=null}}

/* ---------- the temporary step: player only (a === S), only while SG.mod is set; NPCs and skipped games use the plain odds ---------- */
(function(){const o0=odA;odA=function(a,b){const r=o0.apply(this,arguments);return SG.mod&&SG.mod.step&&a===S?sgShift(r,SG.mod.step):r}})();
