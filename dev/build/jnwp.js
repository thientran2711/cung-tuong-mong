/* ================= jnwp — NO WORD GAMES, family A: Thơ + Câu đối (owner 16/11 07:20Z "no word games", OD:L1265/L1266) =================
   She does NOT want games built on words/text. The two word games of the Thi art are replaced for EVERY entry point (contest j71/j82, lessons KG82_MGL,
   handmade works j83 playArt, teacher lessons jrcp, Phúc tuyển jkc, veil jveil): kinds `tho` and `doi` now run NON-word engines, winnable by what is shown.
     tho (Thi / thư pháp)  -> engine "calli"   : brush-stroke tracing in calligraphy ORDER (numbered strokes, lane, forward progress, 3 glyphs)
     doi (Câu đối)         -> engine "doiline" : paired scrolls of brush marks; the right scroll must be the MIRROR of the left (phẩy ↔ mác …); drag/tap tiles
   Same rules as mg-easy / jtd Tứ đức games: first-time demo card, Gợi ý button (costs a little, never blocks), quiet auto-hint when she stalls (tier 0/1),
   a wrong try bounces back, same 0–10 score -> j83 work tiers (raw feeds wkScore) / j71 skill scale.
   Difficulty: ONE function nwTier(kind, env) = jmgt mgTierOf(env): the tier mgSet() put in KG82.tier, else kg82Tier(env.lv) (0 Dễ · 1 Vừa · 2 Khó); the capped score reads mgFull(env,b) when it exists;
   every number below lives in BAL.nw (one core). The old verse/pair engines (j91) and the doi quiz bank (j82/j5) were deleted in review/mg-train. */
BAL.nw=Object.assign(BAL.nw||{},{
 calli:{tol:[.04,.032,.026],      /* lane half-width as a share of the board side, by tier */
  rounds:[[2,3,3],[3,3,4],[3,4,5]],/* strokes of the 3 glyphs, by tier */
  base:8,per:4.5,lvSec:.8,         /* seconds per glyph = base + strokes × per + level × lvSec */
  idle:[9000,15000,0],bead:[1,0,0],/* ms idle before the quiet auto-hint (0 = never) / the ghost bead runs on the board */
  hintCost:.1,                     /* share of a glyph's score a Gợi ý costs */
  full:.95,accPow:1.6},                       /* share of a perfect trace that already scores 10 / how hard drifting out of the lane counts (score = progress × accuracy^accPow) */
 doi:{rows:[[3,3,4],[3,4,4],[4,4,5]],/* pairs of marks in the 3 rounds, by tier */
  decoy:[1,2,3],                   /* extra wrong tiles in the tray */
  sec:[8,7,6],                     /* seconds per pair (the 3 rounds together stay under the j82 guard of 97 s) */
  miss:.8,hintCost:.25,            /* score lost per wrong drop / per Gợi ý (in pairs) */
  idle:[8000,14000,0],ghost:[1,0,0]}});

/* ---------- difficulty: one hook ---------- */
function nwTier(kind,env){/* review/mg-train: one helper for the whole no-word family (jmgt mgTierOf: KG82.tier set by mgSet, else kg82Tier(env.lv)) */
 return typeof mgTierOf==="function"?mgTierOf(env):kg82Tier(env&&env.lv)}
const nwP=(a,t)=>a[Math.min(t,a.length-1)];
const NWC={ink:"#2a1a12",paper:"#fffdf6"};
function nwBtn(box,id,text,sub){return k91Btns(box,[[id,text,sub]])}
/* mg-noword-b: the hint button is an icon (no word in play); same box (.kg82act) + id as before */
function nwHintBtn(box){const d=document.createElement("div");d.className="kg82act";d.innerHTML=NWB.btn("nwhint","hint",{cls:"kgbtn",label:"Gợi ý: chỉ chỗ đúng, bớt một ít phần"});box.appendChild(d);return d}

/* ================= 1. CALLI (Thơ → thư pháp): trace numbered brush strokes in order ================= */
/* glyph = [name, strokes]; stroke = 2 points (straight) or 3 points (quadratic curve); unit square */
const NW_GLYPH={
 2:[["Chữ Nhị",[[[.22,.34],[.78,.34]],[[.12,.7],[.88,.7]]]],["Chữ Thập",[[[.15,.5],[.85,.5]],[[.5,.14],[.5,.88]]]],["Chữ Nhân",[[[.54,.14],[.4,.5],[.16,.86]],[[.46,.46],[.64,.66],[.88,.86]]]],["Chữ Bát",[[[.46,.2],[.38,.55],[.2,.86]],[[.54,.3],[.66,.6],[.84,.86]]]],["Chữ Đinh",[[[.14,.3],[.86,.3]],[[.5,.3],[.5,.88]]]],["Chữ Bốc",[[[.44,.12],[.44,.88]],[[.44,.4],[.58,.48],[.76,.56]]]],["Chữ Thất",[[[.14,.4],[.86,.4]],[[.44,.12],[.48,.72],[.84,.84]]]]],
 3:[["Chữ Thổ",[[[.28,.34],[.72,.34]],[[.5,.12],[.5,.8]],[[.14,.84],[.86,.84]]]],["Chữ Công",[[[.2,.2],[.8,.2]],[[.5,.2],[.5,.84]],[[.12,.84],[.88,.84]]]],["Chữ Thượng",[[[.5,.12],[.5,.8]],[[.5,.44],[.76,.44]],[[.14,.84],[.86,.84]]]],["Chữ Hạ",[[[.14,.16],[.86,.16]],[[.5,.16],[.5,.86]],[[.5,.48],[.74,.64]]]],["Chữ Đại",[[[.12,.38],[.88,.38]],[[.52,.12],[.4,.5],[.14,.88]],[[.5,.45],[.66,.66],[.88,.88]]]],["Chữ Tam",[[[.28,.2],[.72,.2]],[[.2,.5],[.8,.5]],[[.12,.8],[.88,.8]]]],
  ["Chữ Xuyên",[[[.22,.14],[.2,.52],[.14,.88]],[[.5,.12],[.5,.88]],[[.78,.14],[.8,.52],[.86,.88]]]],["Chữ Tiểu",[[[.5,.12],[.5,.88]],[[.32,.38],[.24,.6],[.12,.82]],[[.68,.38],[.76,.6],[.88,.82]]]]],
 4:[["Chữ Vương",[[[.2,.2],[.8,.2]],[[.28,.5],[.72,.5]],[[.5,.2],[.5,.82]],[[.14,.82],[.86,.82]]]],["Chữ Sơn",[[[.5,.14],[.5,.8]],[[.2,.42],[.2,.84]],[[.8,.18],[.8,.84]],[[.1,.84],[.9,.84]]]],
  ["Chữ Thiên",[[[.22,.2],[.78,.2]],[[.12,.46],[.88,.46]],[[.52,.46],[.4,.7],[.14,.9]],[[.5,.62],[.66,.76],[.88,.9]]]],["Chữ Mộc",[[[.14,.34],[.86,.34]],[[.5,.1],[.5,.9]],[[.45,.42],[.32,.66],[.12,.86]],[[.55,.42],[.68,.66],[.88,.86]]]],
  ["Chữ Tỉnh",[[[.14,.36],[.86,.36]],[[.14,.66],[.86,.66]],[[.36,.14],[.36,.88]],[[.64,.14],[.64,.88]]]],["Chữ Phong",[[[.2,.2],[.8,.2]],[[.14,.46],[.86,.46]],[[.2,.72],[.8,.72]],[[.5,.1],[.5,.9]]]],
  ["Chữ Thủy",[[[.5,.1],[.5,.9]],[[.14,.44],[.3,.5],[.44,.46]],[[.42,.3],[.3,.6],[.12,.82]],[[.58,.3],[.7,.6],[.88,.82]]]],["Chữ Hỏa",[[[.3,.18],[.26,.34],[.18,.46]],[[.7,.18],[.74,.34],[.82,.46]],[[.5,.12],[.4,.5],[.14,.88]],[[.5,.45],[.66,.66],[.88,.88]]]]],
 5:[["Chữ Hòa",[[[.42,.1],[.28,.18],[.14,.24]],[[.12,.36],[.88,.36]],[[.5,.12],[.5,.9]],[[.45,.42],[.32,.66],[.12,.86]],[[.55,.42],[.68,.66],[.88,.86]]]],
  ["Chữ Vị",[[[.3,.2],[.7,.2]],[[.14,.44],[.86,.44]],[[.5,.1],[.5,.9]],[[.45,.52],[.32,.7],[.12,.88]],[[.55,.52],[.68,.7],[.88,.88]]]],
  ["Chữ Chính",[[[.14,.16],[.86,.16]],[[.5,.16],[.5,.84]],[[.5,.46],[.74,.46]],[[.28,.46],[.28,.84]],[[.12,.86],[.88,.86]]]],["Chữ Sinh",[[[.46,.12],[.34,.24],[.2,.34]],[[.22,.4],[.78,.4]],[[.5,.2],[.5,.86]],[[.3,.62],[.7,.62]],[[.12,.86],[.88,.86]]]],
  ["Chữ Bản",[[[.14,.34],[.86,.34]],[[.5,.1],[.5,.9]],[[.45,.42],[.32,.66],[.12,.86]],[[.55,.42],[.68,.66],[.88,.86]],[[.3,.72],[.7,.72]]]],["Chữ Ngọc",[[[.2,.2],[.8,.2]],[[.3,.46],[.7,.46]],[[.5,.2],[.5,.86]],[[.14,.86],[.86,.86]],[[.64,.58],[.76,.7]]]],
  ["Chữ Điền",[[[.2,.2],[.2,.84]],[[.2,.2],[.8,.2],[.8,.84]],[[.2,.52],[.8,.52]],[[.5,.2],[.5,.84]],[[.2,.84],[.8,.84]]]]]};
const NWU=[];/* glyph ids shown in this game */
function nwPick(n){const it=typeof mgpOne==="function"?mgpOne("tho",NWU,x=>x.n===n):null;/* ORDER THIN P1: glyph × brush manner, drawn through the no-repeat memory */if(it)return it.g;const L=NW_GLYPH[n]||NW_GLYPH[3];return L[Math.floor(Math.random()*L.length)]}
function nwCalli(box,env){NWU.length=0;const C=kg82Canvas(box,1,460),{g,W,H}=C;const T=BAL.nw.calli,tier=nwTier("tho",env),lv=env.lv||0;
 const FULL=typeof mgFull==="function"?mgFull(env,T.full):T.full,NR=T.rounds[0].length,S0=Math.min(W,H)-34,ox=(W-S0)/2,oy=(H-S0)/2+14,tol=S0*nwP(T.tol,tier);
 let r=-1,sum=0,F=null,si=0,ink=null,inks=[],sc=[],phase="",t0=0,LIM=0,done=false,tAct=0,glow=0,cost=0,tip=null;const pops=[];
 const toC=([u,v])=>[ox+u*S0,oy+v*S0];
 const bez=(P,t)=>P.length===2?[P[0][0]+(P[1][0]-P[0][0])*t,P[0][1]+(P[1][1]-P[0][1])*t]:[(1-t)*(1-t)*P[0][0]+2*(1-t)*t*P[1][0]+t*t*P[2][0],(1-t)*(1-t)*P[0][1]+2*(1-t)*t*P[1][1]+t*t*P[2][1]];
 const sample=P=>{const out=[];let pr=null;for(let k=0;k<=400;k++){const p=toC(bez(P,k/400));if(!pr||k91Dist(p[0],p[1],pr[0],pr[1])>=4||k===400){out.push(p);pr=p}}return out};
 const hb=nwHintBtn(box);
 const dm=k91DemoCard(box,"nwcalli",{title:"CÁCH CHƠI: ĐỒ NÉT THƯ PHÁP",done:()=>{hb.hidden=false;t0=tAct=performance.now()},
  lines:["Đặt ngón tay ở chấm xanh có số, kéo theo nét mờ đến hết nét rồi nhấc tay.","Làm lần lượt nét 1, nét 2, nét 3… như người viết chữ. Giữ bút trong vệt mờ thì nét đẹp và đều.","Chưa thấy nét nào thì chạm Gợi ý, chỉ tốn một ít phần."],
  art:(g,W,H,now)=>{const x0=W/2-70,y0=82,x1=W/2+70,y1=82;g.save();g.lineCap="round";g.strokeStyle="#8a735040";g.lineWidth=18;g.beginPath();g.moveTo(x0,y0);g.quadraticCurveTo(W/2,y0-18,x1,y1);g.stroke();
   g.setLineDash([3,5]);g.strokeStyle="#8a7350aa";g.lineWidth=1.2;g.stroke();g.setLineDash([]);const k=(now%2600)/2600,u=k<.15?0:k>.85?1:(k-.15)/.7;const px=x0+(x1-x0)*u,py=y0-18*2*u*(1-u);
   g.strokeStyle="#1e140e";g.lineWidth=7;g.beginPath();g.moveTo(x0,y0);for(let s=1;s<=20;s++){const q=u*s/20;g.lineTo(x0+(x1-x0)*q,y0-36*q*(1-q))}g.stroke();
   g.fillStyle=K91C.good();g.beginPath();g.arc(x0,y0,9,0,Math.PI*2);g.fill();g.fillStyle="#fff";g.font=k91F(700,11,1);g.textAlign="center";g.textBaseline="middle";g.fillText("1",x0,y0+.5);
   g.fillStyle="#e0a526";g.beginPath();g.arc(px,py,5,0,Math.PI*2);g.fill();g.restore();return y0+34}});
 if(dm)hb.hidden=true;
 function next(){r++;if(r>=NR){done=true;return setTimeout(()=>env.end(10*Math.min(1,sum/NR/FULL)),300)}const n=nwP(T.rounds,tier)[r],G=nwPick(n);F={n:G[0],S:G[1].map(sample),ns:G[1].length};si=0;inks=[];sc=[];ink=null;glow=0;cost=0;tip=null;
  LIM=(T.base+F.ns*T.per+lv*T.lvSec)*1000;phase="play";t0=tAct=performance.now()}
 /* ordered progress along the guide: a drawn point only counts when it lies a little FURTHER along the stroke (calligraphy has a direction) */
 function scoreStroke(G,U){if(U.length<2)return 0;const look=Math.max(30,Math.round(G.length*.3));let idx=-1,hit=0,miss=0;
  for(const q of U){let bj=-1,bd=tol*tol;for(let j=Math.max(0,idx);j<Math.min(G.length,Math.max(idx,0)+look);j++){const d=(G[j][0]-q[0])**2+(G[j][1]-q[1])**2;if(d<=bd){bd=d;bj=j}}
   if(bj>=0){hit++;if(bj>idx)idx=bj}else miss++}
  const first=k91Dist(U[0][0],U[0][1],G[0][0],G[0][1])<=tol*2.6;const prog=(idx+1)/G.length,acc=hit/Math.max(1,hit+miss);return Math.max(0,Math.min(1,prog*Math.pow(acc,T.accPow)*(first?1:.7)))}
 function endGlyph(){phase="judge";while(sc.length<F.ns)sc.push(0);/* review/mg-tune: × the time part (jmgt mgPace, ONE CORE) */const sp=mgPace(env,"tho",performance.now()-t0,LIM),s=Math.max(0,sc.reduce((a,b)=>a+b,0)/F.ns-cost)*sp;sum+=s;const w=s>=.85?"Nét thần!":s>=.65?"Nét vững":s>=.4?"Tạm được":"Nét run";/* huong-cue-2: guiding verdict words back (owner 21/11) */
  F.say=[`${F.n}: ${w}`,s>=.65?(sp<.995?K91C.gold():K91C.good())/* review/mg-score-same-rv: gold when the time part cut the glyph, as the other 8 mgPace kinds */:s>=.4?K91C.gold():K91C.red()];setTimeout(next,1300)}
 function hint(auto){if(phase!=="play"||(dm&&dm.on)||si>=F.ns)return;const now=performance.now();glow=now+(auto?5000:6500);tAct=now;if(!auto){cost+=T.hintCost;tip={t:"Từ chấm xanh, theo nét mờ",c:K91C.gold(),until:now+3200}}}
 hb.querySelector("#nwhint").onclick=()=>hint(false);
 const stop=k91Loop(now=>{if(!F)return;if(dm&&dm.on){kg82Bg(g,W,H,"tho",.5,.7);dm.draw(g,W,H,now);env.hud({score:"0/10",round:`Hồi 1/${NR}`,time:"–"});return}
  const left=LIM-(now-t0);if(phase==="play"){if(left<=0)endGlyph();else if(nwP(T.idle,tier)&&now-tAct>nwP(T.idle,tier))hint(true)}
  kg82Bg(g,W,H,"tho",.5,.7);g.fillStyle="rgba(255,252,242,.66)";k91RR(g,ox-6,oy-6,S0+12,S0+12,8);g.fill();
  kg82Spr(g,"ve-inkstone",ox+S0-S0*.07,oy+S0-S0*.05,S0*.16,null,{alpha:.95});
  if(phase==="judge"&&F.say)k91Say(g,F.say[0],F.say[1],ox,oy-12,W-ox-8,"left");else if(tip&&now<tip.until)k91Say(g,tip.t,tip.c,ox,oy-12,W-ox-8,"left");else{for(let q=0;q<F.ns;q++){g.fillStyle=q<si?K91C.good():"#8a735077";g.beginPath();g.arc(ox+7+q*18,oy-17,6,0,Math.PI*2);g.fill()}}
  /* the glyph: pale lane + dashed centre line, current stroke stronger; ghost bead (tier 0) or the hint glow runs along the current stroke */
  F.S.forEach((P,k)=>{g.save();g.lineCap="round";g.lineJoin="round";if(k===si&&phase==="play")kg82FxLane.stroke(g,P,tol*2);else{g.strokeStyle=k<si?"#8a735018":"#8a735033";g.lineWidth=tol*2;g.beginPath();P.forEach(p=>g.lineTo(p[0],p[1]));g.stroke()}/* mg-play2 law 11: the stroke to trace = kit lit path (was .27) */
   g.strokeStyle=k===si?"#8a7350bb":"#8a735066";g.lineWidth=1.2;g.setLineDash([3,5]);g.beginPath();P.forEach(p=>g.lineTo(p[0],p[1]));g.stroke();g.restore();
   if(phase==="play"||k>=si){g.fillStyle=k===si&&phase==="play"?K91C.good():"#8a735099";g.beginPath();g.arc(P[0][0],P[0][1],k===si?8:6,0,Math.PI*2);g.fill();g.fillStyle="#fff";g.font=k91F(700,k===si?11:9,1);g.textAlign="center";g.textBaseline="middle";g.fillText(String(k+1),P[0][0],P[0][1]+.5)}});
  if(phase==="play"&&si<F.ns&&!ink&&(nwP(T.bead,tier)||glow>now)){const P=F.S[si],u=((now/1600)%1),p=P[Math.min(P.length-1,Math.floor(u*(P.length-1)))];g.save();g.shadowColor="#e0a526";g.shadowBlur=12;g.fillStyle="#e0a526";g.beginPath();g.arc(p[0],p[1],6,0,Math.PI*2);g.fill();g.restore();
   if(glow>now)k91Glow(g,P[0][0]-12,P[0][1]-12,24,24,now)}
  inks.concat(ink?[ink]:[]).forEach(U=>{g.save();g.lineCap="round";g.lineJoin="round";g.strokeStyle="#1e140e";for(let i=1;i<U.length;i++){const sp=k91Dist(U[i][0],U[i][1],U[i-1][0],U[i-1][1]);g.lineWidth=Math.max(2.5,Math.min(10,10-sp*.35));g.beginPath();g.moveTo(U[i-1][0],U[i-1][1]);g.lineTo(U[i][0],U[i][1]);g.stroke()}g.restore()});
  {const tip2=ink&&ink.length?ink[ink.length-1]:null;if(tip2)kg82Spr(g,"ve-brush",tip2[0],tip2[1],S0*.2,null,{ax:.06,ay:.95,alpha:.95})}
  kg82DrawPops(g,pops,now);env.hud({score:mgLive(env,(()=>{const j=cl(r+(phase==="judge"?1:0),0,NR),pl=phase==="play"&&j<NR?1:0;return 10*Math.min(1,(sum+(pl?Math.max(0,1-cost)*mgPace(env,"tho",now-t0,LIM):0)+(NR-j-pl))/NR/FULL)})()),round:`Hồi ${Math.min(r+1,NR)}/${NR}`,time:phase==="play"?`${Math.max(0,Math.ceil(left/1000))} giây`:"–"})});
 k91Pointer(C,{down:(x,y)=>{if(phase!=="play"||(dm&&dm.on))return;tAct=performance.now();ink=[[x,y]]},move:(x,y)=>{if(ink&&phase==="play"){const l=ink[ink.length-1];if(k91Dist(x,y,l[0],l[1])>=2)ink.push([x,y])}},
  up:()=>{if(!ink||phase!=="play"||si>=F.ns){ink=null;return}/* review/mg-train: an extra stroke in the 250 ms after the last one read F.S[ns] (page error) */const U=ink;ink=null;if(U.length<4)return;inks.push(U);const s=scoreStroke(F.S[si],U);sc.push(s);kg82Pluck(si,s>.5);si++;if(si>=F.ns)setTimeout(()=>{if(phase==="play")endGlyph()},250)}});
 KG82.peek=()=>{if(!F||phase!=="play"||(dm&&dm.on)||ink||si>=F.ns)return null;return{drag:F.S[si].filter((p,i,a)=>i%2===0||i===a.length-1).map(p=>{const c=C.client(p[0],p[1]);return[c.x,c.y]})}};
 KG82.st=()=>({r,si,phase,ink:!!ink,ns:F&&F.ns,left:LIM-(performance.now()-t0)});
 next();return()=>{done=true;stop()}}

/* ================= 2. DOILINE (Câu đối → đối nét): the right scroll is the mirror of the left ================= */
/* brush marks: [x, y, half-width] points in a -1..1 box (variable-width stroke). Every mark is lopsided so its mirror image is a different picture. */
const NW_MARK={cham:[[-.3,-.3,.12],[0,0,.5],[.36,.42,.1]],ngang:[[-.9,.22,.42],[-.4,.06,.26],[.9,-.22,.06]],so:[[0,-.92,.38],[.04,-.1,.24],[-.06,.62,.2],[-.4,.92,.05]],
 phay:[[.46,-.84,.38],[.1,-.02,.26],[-.72,.86,.05]],hat:[[-.84,.62,.34],[-.1,.36,.2],[.84,-.64,.04]]};
const NW_TYPES=Object.keys(NW_MARK);
const NW_DENSE={};
function nwDense(type){if(NW_DENSE[type])return NW_DENSE[type];const A=NW_MARK[type],out=[];const q=(a,b,c,d,t)=>.5*((2*b)+(-a+c)*t+(2*a-5*b+4*c-d)*t*t+(-a+3*b-3*c+d)*t*t*t);
 for(let i=0;i<A.length-1;i++){const p0=A[Math.max(0,i-1)],p1=A[i],p2=A[i+1],p3=A[Math.min(A.length-1,i+2)];for(let k=0;k<8;k++){const t=k/8;out.push([0,1,2].map(j=>q(p0[j],p1[j],p2[j],p3[j],t)))}}
 out.push(A[A.length-1].slice());return NW_DENSE[type]=out}
function nwMark(g,type,cx,cy,s,mir,col,alpha){const P=nwDense(type).map(([x,y,w])=>[(mir?-x:x)*s,y*s,Math.max(.6,w*s)]);const L=[],R=[];
 P.forEach((p,i)=>{const a=P[Math.max(0,i-1)],b=P[Math.min(P.length-1,i+1)];let dx=b[0]-a[0],dy=b[1]-a[1];const d=Math.hypot(dx,dy)||1;dx/=d;dy/=d;L.push([p[0]-dy*p[2],p[1]+dx*p[2]]);R.push([p[0]+dy*p[2],p[1]-dx*p[2]])});
 g.save();g.translate(cx,cy);g.globalAlpha*=alpha==null?1:alpha;g.fillStyle=col||NWC.ink;g.beginPath();g.moveTo(L[0][0],L[0][1]);for(let i=1;i<L.length;i++)g.lineTo(L[i][0],L[i][1]);
 for(let i=R.length-1;i>=0;i--)g.lineTo(R[i][0],R[i][1]);g.closePath();g.fill();[P[0],P[P.length-1]].forEach(p=>{g.beginPath();g.arc(p[0],p[1],p[2],0,Math.PI*2);g.fill()});g.restore()}
function nwDoi(box,env){const C=kg82Canvas(box,1.05,480),{g,W,H}=C;const T=BAL.nw.doi,tier=nwTier("doi",env);
 const wide=W>=H*1.45,WL=wide?W*.6:W;const R=T.rows[Math.min(tier,T.rows.length-1)];const ND=nwP(T.decoy,tier);
 let r=-1,pts=0,tot=0,okT=0,msT=0,P=null,phase="",t0=0,drag=null,sel=null,done=false,tAct=0,tip=null;const pops=[];
 const hb=nwHintBtn(box);
 const dm=k91DemoCard(box,"nwdoi",{title:"CÁCH CHƠI: ĐỐI NÉT BÚT",done:()=>{hb.hidden=false;t0=tAct=performance.now()},
  lines:["Hai bức liễn treo đối nhau: bức trái có nét bút, bức phải phải là hình lật gương của nét ấy, cùng hàng.","Kéo nét trong khay vào ô bên phải (hoặc chạm nét rồi chạm ô). Nét lật gương đúng thì ở lại, sai thì tự quay về.","Chưa thấy nét nào thì chạm Gợi ý, chỉ tốn một ít phần."],
  art:(g,W,H,now)=>{const cx=W/2,y=84,s=13;g.save();g.strokeStyle=K91C.hair;g.setLineDash([4,4]);g.beginPath();g.moveTo(cx,y-30);g.lineTo(cx,y+30);g.stroke();g.setLineDash([]);
   k91Tile(g,cx-86,y-24,48,48,"","n",14,"tho-slip");nwMark(g,"phay",cx-62,y,s,false,NWC.ink);k91Tile(g,cx+38,y-24,48,48,"","blank",14,"tho-slip");
   const k=(now%3200)/3200,e=k<.25?0:k<.65?(k-.25)/.4:1,sx=cx-20,sy=y+50,tx=sx+(cx+62-sx)*e,ty=sy+(y-sy)*e;nwMark(g,"phay",tx,ty,s,true,e>=1?K91C.good():NWC.ink);return y+78}});
 if(dm)hb.hidden=true;
 function lay(){const top=46;P.top=top;const rowsH=(wide?H-top-6:H*.56-top);const rh=Math.min(62,rowsH/P.n);P.rh=rh;const ts=Math.min(rh-8,54,(WL/2-14)),sz=ts;P.ts=sz;P.lx=WL*.27-sz/2;P.rx=WL*.73-sz/2;P.axis=WL*.5;
  P.slots=P.rows.map((_,i)=>({x:P.rx,y:top+i*rh+(rh-sz)/2,w:sz,h:sz}));P.left=P.rows.map((_,i)=>({x:P.lx,y:top+i*rh+(rh-sz)/2,w:sz,h:sz}));
  const ty0=wide?top:top+P.n*rh+34,perRow=wide?Math.max(2,Math.floor((W-WL-10)/(sz+8))):Math.max(2,Math.floor((W-12)/(sz+8)));
  P.tiles.forEach((t,i)=>{const row=Math.floor(i/perRow),col=i%perRow;const n=Math.min(perRow,P.tiles.length-row*perRow);const rw=n*(sz+8)-8;const x0=wide?WL+(W-WL-rw)/2:(W-rw)/2;t.hx=x0+col*(sz+8);t.hy=ty0+row*(sz+8);t.w0=sz;t.h0=sz;if(t.at==null){t.x=t.hx;t.y=t.hy}});P.trayY=ty0}
 function next(){r++;if(r>=R.length){done=true;KG82.why=`Nét lật gương đặt đúng ${okT}/${tot} · đặt sai ${msT} lần`;return setTimeout(()=>env.end(10*pts/Math.max(1,tot)),300)}const n=R[r];
  const rows=[];for(let i=0;i<n;i++){let t;do t=NW_TYPES[Math.floor(Math.random()*NW_TYPES.length)];while(i&&t===rows[i-1]&&Math.random()<.8);rows.push(t)}
  const good=rows.map(t=>({type:t,mir:true}));const used=[...new Set(rows)];const dec=[];
  for(let i=0;i<ND;i++){let d;const pool=NW_TYPES.filter(t=>!used.includes(t));
   if(tier>=2||(tier===1&&i%2===0)||!pool.length)d={type:used[i%used.length],mir:false,decoy:1};else d={type:pool[Math.floor(Math.random()*pool.length)],mir:Math.random()<.5,decoy:1};dec.push(d)}
  P={n,rows,tiles:kg82Shuf(good.concat(dec)),fill:{},miss:0,cost:0,glow:null};lay();phase="play";t0=tAct=performance.now();sel=null;drag=null;tip=null}
 const tileAt=(x,y)=>{for(let i=P.tiles.length-1;i>=0;i--){const t=P.tiles[i];if(t.locked)continue;if(x>=t.x&&x<=t.x+t.w0&&y>=t.y&&y<=t.y+t.h0)return t}return null};
 const slotAt=(x,y)=>{let bi=-1,bd=1e9;P.slots.forEach((s,i)=>{if(P.fill[i])return;const d=k91Dist(x,y,s.x+s.w/2,s.y+s.h/2);if(d<bd){bd=d;bi=i}});const s=bi>=0?P.slots[bi]:null;return s&&bd<s.w*.9?bi:-1};
 function bounce(t){t.bk={x:t.x,y:t.y,a:performance.now()};t.at=null;t.x=t.hx;t.y=t.hy}
 const okFor=(t,i)=>t.mir&&t.type===P.rows[i];
 function place(t,i){const now=performance.now();tAct=now;if(P.fill[i]){bounce(t);return}
  if(!okFor(t,i)){P.miss++;P.glow=null;tip={t:t.mir?"Chưa đối: nét này khác":"Chưa đối: chưa lật gương",c:K91C.red(),until:now+2300};kg82Pop(pops,P.slots[i].x+P.slots[i].w/2,P.slots[i].y+P.slots[i].h/2,NWB.POP.bad,K91C.red());kg82Pluck(0,false);bounce(t);return}
  t.at=i;t.locked=true;P.fill[i]=t;t.x=P.slots[i].x;t.y=P.slots[i].y;P.glow=null;kg82Pluck(i,true);if(P.rows.every((_,k)=>P.fill[k]))setTimeout(()=>{if(phase==="play")judge()},350)}
 function hint(auto){if(phase!=="play"||(dm&&dm.on))return;const i=P.rows.findIndex((_,k)=>!P.fill[k]);if(i<0)return;const now=performance.now();P.glow={i,until:now+(auto?5000:6500)};tAct=now;if(!auto){P.cost+=T.hintCost;tip={t:"Nét sáng: hình lật gương",c:K91C.gold(),until:now+3200}}}
 hb.querySelector("#nwhint").onclick=()=>hint(false);
 function judge(){phase="judge";const ok=P.rows.filter((_,k)=>P.fill[k]).length,nb=P.n;pts+=Math.max(0,ok-P.miss*T.miss-P.cost)*(P.sp=mgPace(env,"doi",performance.now()-t0,R[r]*nwP(T.sec,tier)*1000));/* review/mg-tune: time part */tot+=nb;okT+=ok;msT+=P.miss;
  P.say=[ok===nb?(P.miss||P.cost?"Đối chỉnh!":"Đối chỉnh, không sai nét!"):`Đối được ${ok}/${nb} nét`,ok===nb&&P.sp>=.995?K91C.good():K91C.gold()];setTimeout(next,1500)}
 function frame(g,x,y,w,h,st){k91Tile(g,x,y,w,h,"",st,14,"tho-slip")}
 const stop=k91Loop(now=>{if(!P)return;kg82Bg(g,W,H,"doi",.14,1);
  if(dm&&dm.on){dm.draw(g,W,H,now);env.hud({score:"0/10",round:`Hồi 1/${R.length}`,time:"–"});return}
  const left=R[Math.min(r,R.length-1)]*nwP(T.sec,tier)*1000-(now-t0);if(phase==="play"){if(left<=0)judge();else if(nwP(T.idle,tier)&&now-tAct>nwP(T.idle,tier))hint(true)}
  if(P.glow&&now>P.glow.until)P.glow=null;if(tip&&now>tip.until)tip=null;
  g.textAlign="center";g.textBaseline="alphabetic";
  g.textAlign="center";g.textBaseline="alphabetic";
  /* the two scrolls (paper strips) and the mirror axis between them */
  [P.lx,P.rx].forEach(x=>{g.save();g.fillStyle="rgba(255,252,242,.55)";k91RR(g,x-8,P.top-4,P.ts+16,P.n*P.rh+6,8);g.fill();g.strokeStyle=K91C.hair;g.lineWidth=1.4;g.stroke();g.restore()});
  g.save();g.strokeStyle="#c23b22aa";g.lineWidth=1.6;g.setLineDash([5,5]);g.beginPath();g.moveTo(P.axis,P.top-2);g.lineTo(P.axis,P.top+P.n*P.rh);g.stroke();g.restore();
  P.rows.forEach((t,i)=>{const a=P.left[i],s=P.slots[i];frame(g,a.x,a.y,a.w,a.h,"n");nwMark(g,t,a.x+a.w/2,a.y+a.h/2,a.w*.36,false,NWC.ink);
   if(!P.fill[i]){frame(g,s.x,s.y,s.w,s.h,"blank");if(nwP(T.ghost,tier)&&phase==="play")nwMark(g,t,s.x+s.w/2,s.y+s.h/2,s.w*.36,true,"#8a7350",.3)}
   if(P.glow&&P.glow.i===i&&phase==="play")k91Glow(g,s.x,s.y,s.w,s.h,now)});
  if(phase==="judge"&&P.say)k91Say(g,P.say[0],P.say[1],wide?WL/2:W/2,wide?H-8:P.trayY-10,(wide?WL:W)-16);else if(tip)k91Say(g,tip.t,tip.c,wide?WL/2:W/2,wide?H-8:P.trayY-10,(wide?WL:W)-16);else{g.fillStyle="#5a3a0c";g.font=k91F(700,12,1);g.textAlign="center";g.textBaseline="alphabetic";kg82Lbl(g,"KHAY NÉT BÚT",wide?(WL+W)/2:W/2,wide?18:P.trayY-10,W-16)}
  
  const pos=t=>{if(!t.bk)return[t.x,t.y];const k=Math.min(1,(now-t.bk.a)/280),e=1-Math.pow(1-k,3);if(k>=1){delete t.bk;return[t.x,t.y]}return[t.bk.x+(t.x-t.bk.x)*e,t.bk.y+(t.y-t.bk.y)*e]};
  const drawT=(t,x,y,st)=>{frame(g,x,y,t.w0,t.h0,st);nwMark(g,t.type,x+t.w0/2,y+t.h0/2,t.w0*.36,t.mir,NWC.ink)};
  P.tiles.forEach(t=>{if(t===drag)return;const [tx,ty]=pos(t);drawT(t,tx,ty,t.locked?"ok":t===sel?"on":"n");
   if(P.glow&&phase==="play"&&!t.locked&&okFor(t,P.glow.i))k91Glow(g,tx,ty,t.w0,t.h0,now)});
  if(drag)drawT(drag,drag.x,drag.y,"on");
  {/* owner 21/11 ~00:50Z (mg-5s-clear): the two scrolls are named, one state-driven guiding line */g.font=`700 12px ${kg82Col("--body","sans-serif")}`;g.fillStyle="#6b4a1c";kg82Lbl(g,"Nét mẫu",P.lx+P.ts/2,P.top-8,P.ts+14);kg82Lbl(g,"Nét đối",P.rx+P.ts/2,P.top-8,P.ts+14);
   if(phase==="play")kg82Guide(g,drag?"Thả vào ô trống bên phải, cùng hàng":sel?"Chạm ô trống bên phải, cùng hàng, để đặt":"Kéo nét lật gương của bên trái sang ô bên phải",(wide?WL:W)/2,14,drag||sel?K91C.good():"wait",12,(wide?WL:W)-12)}
  kg82DrawPops(g,pops,now);env.hud({score:mgLive(env,(()=>{const j=cl(r+(phase==="judge"?1:0),0,R.length),pl=phase==="play"&&P&&j<R.length?1:0,all=R.reduce((a,b)=>a+b,0);return 10*(pts+(pl?Math.max(0,P.n-P.miss*T.miss-P.cost)*mgPace(env,"doi",now-t0,R[r]*nwP(T.sec,tier)*1000):0)+R.slice(j+pl).reduce((a,b)=>a+b,0))/Math.max(1,all)})()),round:`Hồi ${Math.min(r+1,R.length)}/${R.length}`,time:phase==="play"?`${Math.max(0,Math.ceil(left/1000))} giây`:"–"})});
 let dn=null;k91Pointer(C,{down:(x,y)=>{if(phase!=="play"||(dm&&dm.on))return;tAct=performance.now();const t=tileAt(x,y);dn={x,y,t,moved:false};if(t){drag=t;delete t.bk;t.ox=x-t.x;t.oy=y-t.y}},
  move:(x,y)=>{if(!dn||!drag)return;if(k91Dist(x,y,dn.x,dn.y)>6)dn.moved=true;drag.x=x-drag.ox;drag.y=y-drag.oy},
  up:(x,y)=>{if(!dn)return;const t=dn.t,moved=dn.moved;dn=null;drag=null;if(phase!=="play")return;
   if(t&&moved){const i=slotAt(t.x+t.w0/2,t.y+t.h0/2);if(i>=0)place(t,i);else bounce(t);return}
   if(t){sel=sel===t?null:t;return}
   const i=slotAt(x,y);if(i>=0&&sel){place(sel,i);sel=null}}});
 KG82.peek=()=>{if(phase!=="play"||!P||(dm&&dm.on))return null;const i=P.rows.findIndex((_,k)=>!P.fill[k]);if(i<0)return null;const t=P.tiles.find(t=>!t.locked&&!t.bk&&okFor(t,i));if(!t)return null;
  const a=C.client(t.x+t.w0/2,t.y+t.h0/2),b=C.client(P.slots[i].x+P.slots[i].w/2,P.slots[i].y+P.slots[i].h/2);return{drag:[[a.x,a.y],[(a.x+b.x)/2,(a.y+b.y)/2],[b.x,b.y]],cands:P.tiles.filter(t=>!t.locked).length/* review/mg-tune, bots: tray marks to compare */}};
 KG82.st=()=>({r,n:P&&P.n,miss:P&&P.miss,cost:P&&P.cost,pts,tot,phase,left:R[Math.min(r,R.length-1)]*nwP(T.sec,tier)*1000-(performance.now()-t0)});
 /* test oracle for the bots: every tray tile (ok = the right mirror of an empty row) and every empty slot, in client px */
 KG82.peekX=()=>{if(phase!=="play"||!P||(dm&&dm.on))return null;const e=P.rows.findIndex((_,k)=>!P.fill[k]);return{tiles:P.tiles.filter(t=>!t.locked&&!t.bk).map(t=>{const c=C.client(t.x+t.w0/2,t.y+t.h0/2);return{x:c.x,y:c.y,ok:e>=0&&okFor(t,e)}}),
  slots:P.slots.map((s,i)=>{const c=C.client(s.x+s.w/2,s.y+s.h/2);return{x:c.x,y:c.y,filled:!!P.fill[i],next:i===e}})}};
 next();return()=>{done=true;stop()}}

/* ================= registry: the word games are unhooked everywhere ================= */
KG82_ENG.calli=nwCalli;KG82_ENG.doiline=nwDoi;/* the old verse / pair engines are gone from j91 (review/mg-train) */
KG82_KIND.tho={e:"calli",n:"Thơ",t:"Thư pháp đồ nét",how:"Đặt ngón tay ở chấm xanh có số, kéo theo nét mờ đến hết nét rồi nhấc tay; làm đủ các nét theo thứ tự số. Giữ bút trong vệt mờ thì nét đẹp. Có nút Gợi ý. 3 chữ. Làm nhanh thì được trọn phần."};
KG82_KIND.doi={e:"doiline",n:"Câu đối",t:"Đối nét bút",how:"Bức liễn bên trái có các nét bút. Kéo nét trong khay vào ô bên phải, ngang hàng với nét trái: nét phải là hình lật gương của nét trái. Đặt sai thì nét tự quay về. Có nút Gợi ý. 3 câu đối. Làm nhanh thì được trọn phần."};
KG82_SPR.tho=["tho-slip","ve-brush","ve-inkstone"];KG82_SPR.doi=["tho-slip"];
KG82_MGL.thi=["Thi: thư pháp đồ nét","tho"];
/* K91.engines is a live getter (j91, jreg): nothing to refresh here */
