
/* ===================== jsgame.js — TRÒ MƯU (scheme mini-games), review/scheme-games =====================
   Three short skill checks on existing player acts (person card, group "Hại nhỏ" / "Hại nặng"):
     spy    "Dò la"             → Nghe ngóng : keep the shadow in the safe band (tap Nép) + tap the phrases with the words to listen for → odds of evidence
     rumor  "Tung tin đồn"      → Truyền lời : pick a chain of courtiers to the target's household; each hop has a trust value → rumour odds + detection
     bribe  "Mua chuộc cung nữ" → Mặc cả     : 3 rounds of offers vs her price; overpay costs bạc, underpay = no deal → bạc paid + odds
   Rules: the player is always offered "Giao cho người làm" (plain odds, no game); NPCs never play (runAct untouched);
   the game only sets a TEMPORARY modifier (SG.mod) for the duration of the player's own doAct call (odA / oSee / bribe price, a===S only);
   the act then runs through doAct as usual → the normal bullet result card (j19 wrapR). Bots calling doAct() directly never see a game
   (the choice is opened from the act-card click only). Kit: kg82Open/kitGameFrame (seal "muu" = MƯU), k91 tiles, kitOdds, kitGameResult.
   Boards reuse existing paintings via KG82_BGX (no new art): act-binh-phong, ev-tin-don, ev-hoi-lo; sprites tho-slip, bac. */
const SG={mod:null,inC:0,K:{}};window.SG=SG;
function sgRM(){try{return typeof kmReduced==="function"?kmReduced():matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}}
function sgShuf(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
KG82_BGX.nghe="@act-binh-phong";KG82_BGX.truyen="@ev-tin-don";KG82_BGX.mac="@ev-hoi-lo";
KG82_SPR.nghe=["tho-slip"];KG82_SPR.truyen=["tho-slip","doi-slip"];KG82_SPR.mac=["@bac","tho-slip"];

/* ---------- 1. NGHE NGÓNG ---------- */
const SG_KW=["thư riêng","cửa sau","hộp gấm","canh ba","sổ bạc","khăn tay thêu","lối hồ sen","trâm bạc","người lạ","kho lụa"];
const SG_IMP=["Nhớ cất {k} cho kín.","Chuyện {k} chớ nói ra.","Ai đã thấy {k} chưa?","Đêm nay lại nhắc {k}.","{K} đã đưa đi rồi.","Đừng để ai biết {k}."];
const SG_FILL=["Trà hôm nay hơi đắng.","Hoa đào nở sớm quá.","Mai thêu nốt đôi hài.","Trời trở gió rồi.","Chim sẻ đậu mái hiên.","Bánh hạnh nhân ngon lắm.","Đèn lồng treo lệch kìa.","Nước hồ hôm nay trong.","Cuộn chỉ đỏ đâu rồi?","Sáng mai quét sân sớm."];
function sgPh(t,k){return t.replace("{k}",k).replace("{K}",k[0].toUpperCase()+k.slice(1))}
function sgNghe(box,env){const R=sgRM();const C=kg82Canvas(box,.86,400),{g,W,H}=C;
 k91Btns(box,[["sgnep","Nép sau bình phong","giữ bóng trong dải xanh"]]);
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
 const raw=()=>cl(7*hits/NI+3*(tot?band/tot:1)-.7*wrong,0,10);
 const nep=()=>{if(stop)return;e=Math.max(0,e-.13);kg82Pluck(1,true)};
 document.getElementById("sgnep").onclick=nep;
 k91Pointer(C,{down:(x,y)=>{if(stop)return;if(x<MX+22){nep();return}const now=performance.now();
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
   k91Tile(g,q.x-sw/2,q.y-sh/2,sw,sh,ok||p.done?p.s:"· · ·",p.done===1?"ok":p.done===2?"bad":"n",14);g.restore()}g.restore();
  if(e>HI){g.save();g.strokeStyle=K91C.red();g.globalAlpha=.5+.3*Math.sin(now/120);g.lineWidth=5;g.strokeRect(2.5,2.5,W-5,H-5);g.restore()}
  kg82DrawPops(g,pops,now)}
 const stopL=k91Loop(now=>{if(stop)return;if(!t0){t0=now;last=now;gust=now+4000+Math.random()*2000}const dt=Math.min(80,now-last);last=now;const tt=now-t0;
  e+=dt/1000*(.075+.04*Math.sin(tt/900));if(now>gust){e+=.12;gust=now+4000+Math.random()*2500;kg82Pop(pops,W*.6,H*.95,"Có tiếng bước chân!","#8a7350")}
  e=Math.max(0,e);if(e>=1){e=.55;wrong++;kg82Pop(pops,W*.6,H*.95,"Suýt lộ!",K91C.red())}
  tot+=dt;if(hear())band+=dt;
  env.hud({score:`${Math.round(raw())}/10`,round:e>HI?"Hở bóng":e<LO?"Xa quá":"Kín",time:`${Math.max(0,Math.ceil((T-tt)/1000))} giây`});draw(now);
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
 const nw=Math.min(78,(W-24)/5-20),nh=32;let b=0,G=null,path=[0],t0=0,phase="play",stop=false,pts=0,anim=null,risk=0;const pops=[];
 const P=i=>{const x=G.N[i];const n=x.c===0||x.c===4?1:2;return{x:12+nw/2+x.c*(W-24-nw)/4,y:n===1?H*.55:(x.j?H*.8:H*.3)+((x.c%2)?-H*.04:H*.04)}};
 const edge=(a,c)=>G.E.find(x=>x.a===a&&x.b===c);const sum=p=>p.slice(1).reduce((s,v,i)=>s+4-edge(p[i],v).t,0);
 const next=()=>{if(b>=NB){stop=true;return setTimeout(()=>env.end(pts,{}),400)}G=sgGraph();path=[0];risk=0;phase="play";t0=performance.now();anim=null};
 const finish=(ok)=>{phase="wait";const T=G.T;let got=0;if(ok){got=10/NB*Math.pow(G.best/Math.max(G.best,risk),1.3);const P0=P(T);kg82Pop(pops,P0.x,P0.y-nh,risk<=G.best?"Kín kẽ!":"Lời đã tới",risk<=G.best?K91C.good():K91C.gold())}
  else{const P0=P(path[path.length-1]);kg82Pop(pops,P0.x,P0.y-nh,"Hết giờ, lời chưa tới",K91C.red())}pts+=got;b++;setTimeout(next,R?700:1100)};
 const tapN=i=>{if(phase!=="play"||stop)return;const L=path[path.length-1];if(i===L&&path.length>1){path.pop();risk=sum(path);return}
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
   g.save();if(phase==="play"&&!path.includes(i)&&!edge(L,i)&&i!==0)g.globalAlpha=.7;k91Tile(g,q.x-nw/2,q.y-nh/2,nw,nh,x.n,st,13,i===G.T?"doi-slip":"tho-slip");g.restore()}
  if(anim&&!R){const k=Math.min(1,(now-anim)/650);const segs=path.length-1;const f=k*segs;const s=Math.min(segs-1,Math.floor(f));const a=P(path[s]),c=P(path[s+1]);const u=f-s;
   g.save();g.fillStyle=K91C.gold();g.shadowColor="#f0d070";g.shadowBlur=12;g.beginPath();g.arc(a.x+(c.x-a.x)*u,a.y+(c.y-a.y)*u,6,0,Math.PI*2);g.fill();g.restore()}
  /* trace gauge (top): how easily the word can be traced back to her */
  const gw=Math.min(220,W*.45),gx=12,gy=H*.055;g.save();k91RR(g,gx,gy-7,gw,14,7);g.fillStyle="rgba(255,250,238,.9)";g.fill();g.strokeStyle=K91C.hair;g.stroke();
  const fr=Math.min(1,risk/9);k91RR(g,gx+1,gy-6,Math.max(0,(gw-2)*fr),12,6);g.fillStyle=fr<.45?K91C.good():fr<.75?"#d0662a":K91C.red();if(fr>0)g.fill();
  g.font=k91F(700,12,true);g.fillStyle=K91C.ink;g.textAlign="left";g.textBaseline="middle";kg82Lbl(g,`Dấu vết ${risk}`,gx+gw+8,gy,W-gx-gw-16);g.restore();
  kg82DrawPops(g,pops,now)}
 next();const stopL=k91Loop(now=>{if(stop&&!pops.length)return;if(G){if(phase==="play"){const left=LIM-(now-t0);if(left<=0)finish(false);
   env.hud({score:`${Math.round(Math.min(10,pts))}/10`,round:`Hồi ${Math.min(b+1,NB)}/${NB}`,time:`${Math.max(0,Math.ceil(left/1000))} giây`})}draw(now)}});
 KG82.peek=()=>{if(stop||phase!=="play"||!G)return null;const ok=path.every((v,k)=>G.path[k]===v);const i=ok?G.path[path.length]:path[path.length-1];const q=P(i);return C.client(q.x,q.y)};
 return()=>{stop=true;stopL()}}

/* ---------- 3. MẶC CẢ ---------- */
function sgPrice(v){const m=v&&v.maid||{};const loy=m.loyal==null?50:m.loyal;let p=40*(.7+loy/170)*(m.tr==="tham"||v.tr==="tham"?.78:1)*(.92+Math.random()*.16);return cl(Math.round(p/5)*5,20,85)}
function sgMac(box,env){const R=sgRM();const C=kg82Canvas(box,.72,330),{g,W,H}=C;const NR=3,LIM=9000;
 const v=env.v;let P=sgPrice(v);const MAXB=Math.min(100,Math.floor((S.bac||0)/5)*5);let X=Math.min(30,MAXB),r=0,t0=0,phase="play",stop=false,deal=0,shown=null,mt=0;const H0=[];const pops=[];
 k91Btns(box,[["sgminus","− 5 lượng",""],["sgplus","+ 5 lượng",""],["sggive","Trao","đưa số bạc này"]]);
 const set=d=>{if(phase!=="play")return;X=cl(X+d,10,MAXB);kg82Pluck(d>0?2:1,true)};
 const Z=q=>q>=1?[3,"Nhận lời"]:q>=.85?[2,"Ngập ngừng"]:q>=.7?[1,"Lắc đầu"]:[0,"Phật ý"];
 const give=()=>{if(phase!=="play"||stop)return;const q=X/P;const [z,w]=Z(q);shown=Math.min(1.1,q);mt=performance.now();H0.push(`Hồi ${r+1}: ${X} lượng · ${w}`);
  if(z===3){deal=r+1;phase="wait";kg82Pop(pops,W/2,H*.5,"Nàng nhận lời!",K91C.good());kg82Pluck(4,true);stop=true;const over=X-P;
   setTimeout(()=>env.end(cl(10-3*(deal-1)-Math.max(0,over)/5,1,10),{deal,X,P,over}),R?300:900);return}
  if(z===0){P=Math.min(95,P+5);kg82Pop(pops,W/2,H*.5,"Phật ý: giá nhích lên",K91C.red())}else kg82Pop(pops,W/2,H*.5,w,"#8a7350");kg82Pluck(0,false);
  r++;phase="wait";if(r>=NR){stop=true;setTimeout(()=>env.end(0,{deal:0,X,P}),R?300:900);return}setTimeout(()=>{phase="play";t0=performance.now()},R?150:600)};
 document.getElementById("sgminus").onclick=()=>set(-5);document.getElementById("sgplus").onclick=()=>set(5);document.getElementById("sggive").onclick=give;
 function draw(now){kg82Bg(g,W,H,"mac",.1,.6);g.save();g.fillStyle="rgba(255,250,238,.25)";g.fillRect(0,0,W,H);g.restore();
  /* her mood gauge: four zones, needle = her last reaction (unknown before the first offer) */
  const gx=16,gw=W-32,gy=H*.12,gh=16;const zc=["#b8321f","#d0662a","#c99a1e","#2d7a52"],zl=["Phật ý","Lắc đầu","Ngập ngừng","Nhận lời"],zb=[.4,.7,.85,1,1.1];const fx=q=>gx+gw*(q-.4)/.7;
  g.save();for(let i=0;i<4;i++){k91RR(g,fx(zb[i])+1,gy,fx(zb[i+1])-fx(zb[i])-2,gh,5);g.fillStyle=zc[i];g.globalAlpha=.8;g.fill()}g.globalAlpha=1;
  g.font=k91F(700,11,true);g.textAlign="center";g.textBaseline="top";g.fillStyle=K91C.ink;for(let i=0;i<4;i++)kg82Lbl(g,zl[i],(fx(zb[i])+fx(zb[i+1]))/2,gy+gh+4,fx(zb[i+1])-fx(zb[i])-4);
  g.textBaseline="bottom";kg82Lbl(g,"Lòng nàng",gx+40,gy-3,90);
  if(shown!=null){const k=R?1:Math.min(1,(now-mt)/400);const q=.4+(Math.max(.4,shown)-.4)*k;const x=fx(q);g.fillStyle=K91C.ink;g.beginPath();g.moveTo(x,gy+gh+1);g.lineTo(x-6,gy-7);g.lineTo(x+6,gy-7);g.closePath();g.fill()}g.restore();
  /* the silver on the table */
  const n=Math.round(X/5),per=10,sz=Math.min(30,(W-40)/per);const cx=W/2,by=H*.66;
  for(let i=0;i<n;i++){const row=Math.floor(i/per),col=i%per,inRow=Math.min(per,n-row*per);kg82Spr(g,"@bac",cx+(col-(inRow-1)/2)*sz*.92,by-row*sz*.55,sz,sz)}
  g.save();g.font=k91F(700,20);g.textAlign="center";g.textBaseline="middle";g.fillStyle=K91C.ink;kg82Lbl(g,`Bạc ${X} lượng`,cx,H*.86,W-40);g.restore();
  if(H0.length){g.save();g.font=k91F(600,12,true);g.textAlign="left";g.textBaseline="middle";g.fillStyle=K91C.ink;kg82Lbl(g,H0[H0.length-1],16,H*.42,W*.6);g.restore()}
  kg82DrawPops(g,pops,now)}
 t0=performance.now();const stopL=k91Loop(now=>{if(phase==="play"){const left=LIM-(now-t0);if(left<=0)give();
   env.hud({score:`${deal?Math.round(cl(10-3*(deal-1),1,10)):0}/10`,round:`Hồi ${Math.min(r+1,NR)}/${NR}`,time:`${Math.max(0,Math.ceil(left/1000))} giây`})}draw(now);if(stop&&!pops.length&&shown!=null&&now-mt>500)return});
 KG82.peek=()=>{if(phase!=="play"||stop)return null;return{sel:X<P&&X<MAXB?"#sgplus":"#sggive"}};
 return()=>{stop=true;stopL()}}


/* ---------- 4. THỜI CƠ (generic timing; Hại nặng / Sát hại acts; owner 11/15: fully abstract, card wording only) ----------
   A watcher's attention rises and falls; tap «Ra tay» when it is lowest. Waiting raises suspicion; a tap at high attention raises it more. 3 rounds. */
KG82_BGX.thoico="@tam-cung-dem";KG82_SPR.thoico=[];
function sgThoiCo(box,env){const R=sgRM();const C=kg82Canvas(box,.6,300),{g,W,H}=C;const NR=3,LIM=8000;
 k91Btns(box,[["sgtap","Ra tay","khi chú ý thấp nhất"]]);
 let r=0,t0=0,ph0=Math.random()*6,sus=0,q=[],phase="play",stop=false,last=0,mark=null;const pops=[];
 const fr=[.9+Math.random()*.4,2.1+Math.random()*.5];
 const att=now=>{const t=(now-t0)/1000;return cl(.5+.32*Math.sin(t*fr[0]+ph0)+.16*Math.sin(t*fr[1]+ph0*2),0,1)};
 const raw=()=>{const a=q.length?q.reduce((s,x)=>s+x,0)/NR:0;return cl(10*a-4*sus,0,10)};
 const tap=()=>{if(phase!=="play"||stop)return;const now=performance.now();const a=att(now);q.push(1-a);if(a>.6)sus=Math.min(1,sus+.2);mark={a,now};
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
 t0=performance.now();const stopL=k91Loop(now=>{if(phase==="play"){const left=LIM-(now-t0);sus=Math.min(1,sus+(now-(last||now))/1000*.025);if(left<=0)tap();
  env.hud({score:`${Math.round(raw())}/10`,round:`Hồi ${Math.min(r+1,NR)}/${NR}`,time:`${Math.max(0,Math.ceil(left/1000))} giây`})}last=now;draw(now)});
 KG82.peek=()=>{if(phase!=="play"||stop)return null;return att(performance.now())<.2?{sel:"#sgtap"}:null};
 return()=>{stop=true;stopL()}}

/* ---------- the act table ---------- */
SG.K={
 spy:{g:"nghe",t:"Nghe ngóng",eng:sgNghe,dur:"30 giây",span:[-15,15],
  how:"Chạm «Nép» để giữ bóng trong dải xanh: xa quá thì không nghe rõ, gần quá thì lộ. Chạm những câu có từ cần nghe.",
  hud:[["score","Phần","0/10"],["round","Bóng","Kín"],["time","Còn","30 giây"]],
  ask:v=>`Dò la ${NM(v)}: tự mình nép sau bình phong nghe ngóng, hay giao cho người làm?`,
  mod:raw=>({od:Math.round((raw-5)*3)})},
 rumor:{g:"truyen",t:"Truyền lời",eng:sgTruyen,dur:"3 hồi × 12 giây",span:[-12,12],
  how:"Chạm lần lượt từng người, từ «Ngươi» tới «Cung nàng». Mỗi chặng có độ tin 1–3 chấm: ít chấm thì dễ bị lần ra. Chạm lại người cuối để lùi.",
  hud:[["score","Phần","0/10"],["round","Hồi","1/3"],["time","Còn","12 giây"]],
  ask:v=>`Tung tin đồn về ${NM(v)}: tự chọn người truyền lời, hay giao cho người làm?`,extra:"phát giác cũng giảm hay tăng theo",
  mod:raw=>({od:Math.round((raw-5)*2.4),see:Math.round((5-raw)*2.4)})},
 bribe:{g:"mac",t:"Mặc cả",eng:sgMac,dur:"3 hồi × 9 giây",span:[5,15],
  how:"Chỉnh số bạc rồi chạm «Trao». Lòng nàng cho biết còn xa hay gần giá nàng muốn. Trả thiếu cả ba hồi thì nàng không nhận; trả dư thì tốn bạc.",
  hud:[["score","Phần","0/10"],["round","Hồi","1/3"],["time","Còn","9 giây"]],
  ask:v=>`Mua chuộc cung nữ ${v.maid&&v.maid.name&&!/\?/.test(v.maid.name)?v.maid.name+" ":""}của ${NM(v)}: tự mặc cả, hay giao cho người làm?`,extra:"trả thiếu cả ba hồi thì nàng không nhận và báo cho chủ",
  mod:(raw,o)=>o&&o.deal?{od:[15,10,5][o.deal-1]||5,bac:o.X}:{od:0,bac:0,nodeal:1}}};

/* Thời cơ on the stealth acts of the Hại nặng / Sát hại groups (card wording only: the act's own name) */
["frame","block","ksab","lygian","poison","kpoison","pond","pushp","musk","catswap","kframe","slowpoison"].forEach(k=>{if(!ACT[k]||!ACT[k].o||SG.K[k])return;
 SG.K[k]={g:"thoico",t:"Thời cơ",eng:sgThoiCo,dur:"3 hồi × 8 giây",span:[-12,12],
  how:"Chạm «Ra tay» lúc người canh chú ý thấp nhất. Chờ lâu hay ra tay lúc bị để ý thì nghi ngờ tăng.",
  hud:[["score","Phần","0/10"],["round","Hồi","1/3"],["time","Còn","8 giây"]],
  ask:v=>`${ACT[k].n} · ${NM(v)}: tự canh thời cơ, hay giao cho người làm?`,extra:ACAUGHT.includes(k)?"phát giác cũng giảm hay tăng theo":"",
  mod:raw=>({od:Math.round((raw-5)*2.4),see:Math.round((5-raw)*2.4)})}});
/* ---------- odds + price line (same as the act card) ---------- */
function sgOdds(v,k){const a=ACT[k];const o=a&&a.o?a.o(S,v):50;return cl(Math.round(o+(typeof lotB==="function"?lotB(S,ACTDOM[k]):0)),5,95)}
function sgLine(v,k,w,c){const prev=typeof J78!=="undefined"?J78.cardV:null;try{if(typeof J78!=="undefined")J78.cardV=v;return actLineRaw(k,w,c)}finally{if(typeof J78!=="undefined")J78.cardV=prev}}
function sgSeeW(v,k,d){try{const n=cl(oSee(v,false)-4*(facN(S)-1)+(d||0),5,95);return typeof chanceLvl==="function"?chanceLvl(n):word(n)}catch(e){return""}}
function sgCan(i,k){const v=rivals[i],a=ACT[k];if(!v||!a||!SG.K[k]||typeof S==="undefined"||!S||S.dead||Q.length||!v.alive||v.out||!can(2)||!a.ok(S,v))return false;
 if(typeof k61Named==="function"&&!k61Named(v))return false;if(S.confined&&typeof CRIME!=="undefined"&&CRIME.includes(k))return false;if(k==="bribe"&&!v.maid)return false;return true}

/* ---------- the choice: Tự ra tay (game) · Giao cho người làm (plain odds) · Thôi ---------- */
PEND.sgpick=p=>{const v=RV(p.v),k=p.k,a=ACT[k],G=SG.K[k];if(!v||!a||!G)return null;const p0=sgOdds(v,k);
 const lo=cl(p0+G.span[0],5,95),hi=cl(p0+G.span[1],5,95);const base=sgLine(v,k,word(p0),fmt(a.c));
 const gl=sgLine(v,k,word(p0),k==="bribe"?`Bạc tùy giá mặc cả (thường ${-a.c.bac} lượng)`:fmt(a.c))+` · (tự chơi ${G.dur}: khéo thì lên ${word(hi)} — vụng thì ${k==="bribe"?"vẫn":"xuống"} ${word(lo)}${G.extra?" — "+G.extra:""})`;
 return{t:`<p>${G.ask(v)}</p>`,who:typeof pv==="function"?pv(v):null,o:[{n:`Tự ra tay: ${G.t}`,fx:{},x:gl,showOut:true,go:()=>sgPlay(v.id,k)},{n:"Giao cho người làm",fx:{},x:base,showOut:true,go:()=>sgRun(v.id,k,null)},{n:"Thôi",fx:{},showOut:true}]}};
function sgAsk(i,k){const v=rivals[i];const d=mkP("sgpick",{v:v.id,k});if(!d)return;pushDil(d,ACT[k].n);showModal()}
/* the act-card click (person card / Hậu cung): capture before j6's panel handler; bots that call doAct() directly are untouched */
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("button[data-r][data-a]");if(!b||b.disabled)return;const k=b.dataset.a;if(!SG.K[k])return;
 const i=+b.dataset.r;if(!sgCan(i,k))return;e.stopPropagation();e.preventDefault();sgAsk(i,k)},true);

/* ---------- play → result page → act ---------- */
function sgPlay(id,k){const v=RV(id),i=rivals.indexOf(v),G=SG.K[k],a=ACT[k];if(!v||!sgCan(i,k)){try{render()}catch(e){}return}
 KG82.ctx="muu";kg82Preload(G.g);const d=kg82Open({art:a.n,title:G.t,how:G.how,seal:"muu",hud:G.hud});if(!d)return;const box=kg82Box();const p0=sgOdds(v,k);
 const rows=[["Cơ may",kitOdds(p0)+`<small class="kpnote"> nay; khéo thì lên ${word(cl(p0+G.span[1],5,95))}, vụng thì ${k==="bribe"?"vẫn":"xuống"} ${word(cl(p0+G.span[0],5,95))}</small>`]];
 if(k==="rumor")rows.push(["Bị phát giác",`${sgSeeW(v,k)} nay`]);if(k==="bribe")rows.push(["Ngươi có",`Bạc ${S.bac} lượng · giá thường ${-a.c.bac} lượng`]);
 const intro=()=>{KG82.phase="intro";box.innerHTML=kitRows(rows)+`<div class="kg82act"><button class="${kg82Btn()}" id="sggo">Bắt đầu</button><button class="${kg82Btn(true)}" id="sgskip">Giao cho người làm<small>cơ may như hiện nay</small></button></div>`;
  $("sggo").onclick=()=>sgEng(G,v,(raw,o)=>finish(raw,o));$("sgskip").onclick=()=>{kg82Close();sgRun(id,k,null)}};
 const finish=(raw,o)=>{KG82.phase="result";const m=G.mod(raw,o);const p1=m.nodeal?5:cl(p0+(m.od||0),5,95);
  const parts=[["Phần chơi",`${kg82Word(raw)} · ${raw}/10`]];
  if(k==="spy")parts.push(["Câu nghe được",`${o.hits||0} / ${o.NI||0}${o.wrong?` · nghe nhầm ${o.wrong}`:""}`]);
  if(k==="bribe")parts.push(["Mặc cả",o.deal?`nhận lời ở hồi ${o.deal}, giá ${o.X} lượng${o.over>0?` (dư ${o.over})`:""}`:`không thành: nàng muốn ${o.P} lượng`]);
  const xr=[["Cơ may",`${kitOdds(p0)} <span class="ksep">→</span> ${kitOdds(p1)}`]];if(k==="rumor")xr.push(["Bị phát giác",`${sgSeeW(v,k)} → ${sgSeeW(v,k,m.see)}`]);
  if(k==="bribe")xr.push(["Tốn",o.deal?`<span class="ef r">Bạc -${o.X}</span>`:`<span class="ef t">không mất bạc</span>`]);
  const html=kitGameResult({parts,note:m.nodeal?"Nàng không nhận bạc và sẽ báo cho chủ. Chạm «Ra tay» để xem kết quả.":"Chạm «Ra tay»: việc làm theo cơ may mới, kết quả hiện ở thẻ kết quả."})+kitRows(xr)+
   `<div class="kg82act"><button class="${kg82Btn()}" id="sgdo">Ra tay</button></div>`;
  kg82ShowRes(html);kg82Set("score",`${raw}/10`);kg82Set("time","đã hết");$("sgdo").onclick=()=>{kg82Close();sgRun(id,k,m)};const dd=kg82El();if(dd)dd.scrollTop=0};
 intro()}
function sgEng(G,v,onEnd){const box=kg82Box();box.innerHTML="";const res=$("kg82box-res");if(res){res.hidden=true;res.innerHTML=""}KG82.phase="play";let done=false,dead=false,stop=null;
 const env={v,lv:0,hud:o=>{for(const k in o)kg82Set(k,kg82Cap(o[k]))},end:(raw,info)=>{if(done)return;done=true;clearTimeout(guard);KG82.peek=()=>null;const st=stop;KG82.run=null;try{if(st)st()}catch(e){}onEnd(cl(Math.round(raw),0,10),info||{})}};
 const guard=setTimeout(()=>env.end(0,{}),70000);KG82.run={stop:()=>{dead=true;clearTimeout(guard);if(stop)stop()}};
 kg82Preload(G.g).then(()=>{if(dead||done)return;try{stop=G.eng(box,env)}catch(e){console.error(e);env.end(5,{})}})}
/* run the act through the normal doAct chain (result card, logs, notes); the modifier lives only inside this call */
function sgRun(id,k,m){const v=RV(id),i=rivals.indexOf(v);if(i<0)return;if(m&&m.nodeal&&k==="bribe"){sgNoDeal(i);return}SG.mod=m||null;try{doAct(i,k)}finally{SG.mod=null}}
/* bribe without a deal: she refuses the silver and tells her mistress (same outcome as the act's failure), no silver spent */
function sgNoDeal(i){const v=rivals[i];if(!v||!v.maid||!can(2)||S.dead||Q.length)return;spend(2);v.maid.loyal=cl((v.maid.loyal||0)+5,0,100);evA(v,S,1);
 log(`Cung nữ ${v.maid.name} của ${NM(v)} chê số bạc ngươi trả, không nhận lời và báo cho chủ.`);render()}
wrapR("sgNoDeal",()=>"Mua chuộc cung nữ",()=>false);

/* ---------- the temporary modifier: player only (a === S), only while SG.mod is set ---------- */
(function(){const o0=odA;odA=function(a,b){const r=o0.apply(this,arguments);return SG.mod&&SG.mod.od&&a===S?cl(r+SG.mod.od,5,95):r}})();
(function(){const s0=oSee;oSee=function(){const r=s0.apply(this,arguments);return SG.inC&&SG.mod&&SG.mod.see?cl(r+SG.mod.see,5,95):r}})();
(function(){const c0=caught;caught=function(a){if(!(SG.mod&&a===S))return c0.apply(this,arguments);SG.inC=1;try{return c0.apply(this,arguments)}finally{SG.inC=0}}})();
(function(){const a=ACT.bribe;if(!a)return;const f0=a.f;a.f=function(p,t){const m=SG.mod;const r=f0.apply(this,arguments);if(m&&p===S&&m.bac!=null){const d=-(a.c.bac||-40)-m.bac;if(d)ap(p,{bac:d})}return r}})();
