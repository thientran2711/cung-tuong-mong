/* ================= jcraft_theu: the stitch board, Công «Thêu theo nét» (kind td_cong, engine "stitch"; MG_CRAFTS.md §1 — built for Thêu, moved to the Công
   lesson by the owner 21/11 ~01:05Z: Thêu keeps the j82 memory game «Nhớ mẫu thêu»; registered by jtd: crReg("td_cong","stitch",tdWrap(crtStitch)). owner OD 20/11 ~08:15Z: «choose the right thread
   colour and stitch along a lit pattern in rhythm») =================
   Real craft (Su xiu long-and-short shading): a petal is built from bands of ONE hue, dark at the rim to light at the heart; the colour order is the skill,
   the even stitch rhythm is the hand. Board: the hoop with the flower cut into bands, the finished sample in the corner (covered by its cloth after
   lev.peek ms), a row of silk spools (the right shades shuffled + lev.alike decoys half a shade step off). Per band: tap the spool of that band's shade,
   then lev.st stitches: the needle dips on a steady beat (lev.beat ms); tap the hoop as it dips onto the lit dot (±lev.win ms = on-beat 1, ±near·win = 0.6,
   else a loose loop 0 that must be re-stitched). 3 pieces (mai 3 · mẫu đơn 4 · phượng 5 bands, + mgMore with rank).
   Score per piece = 10/3 · (wC · right-colour share + wS · mean stitch quality) · mgPace(env, kind, el, lim); levers BAL.mgTier.lev.<kind> (td_cong). In play: ★ / ✗ signs + ONE short guiding line (kit kg82Guide, KIT §13.7.2) and the «Mẫu» tag (owner OD 21/11 ~00:50Z «guiding words stay»; LIVE huong-cue-2 gave the old Công board «Chỉ mẫu» / «Chạm sợi chỉ cùng màu», carried here by review/mg-craft-r3). */
const CRT_PCS=[/* [petals, base bands, dark rgb, light rgb] mai (pink) · mẫu đơn (rose) · phượng (gold) */[5,3,[150,28,58],[255,214,224]],[8,4,[128,18,40],[255,206,206]],[6,5,[150,78,8],[255,234,170]]];
function crtStitch(box,env){const C=kg82Canvas(box,(box.clientWidth||300)<420?1.22:.98,500),{g,W,H}=C;const K=env.kind||"td_cong",L=n=>crLev(env,K,n);
 const NP=CRT_PCS.length,BEAT=L("beat"),WIN=L("win"),NEAR=L("near"),ALIKE=Math.round(L("alike")),SWAY=L("sway"),PEEK=L("peek"),ST=Math.max(1,Math.round(L("st"))),LIM=L("lim"),wC=L("wC"),wS=L("wS");
 /* the hoop above, the spool rows below it (two rows when crowded), never overlapping */
 const R0=Math.min(W*.34,H*.27),HX=W*.5,HY=H*.36,SY=H*.85;const pops=[];
 let pi=-1,P=null,phase="",pts=0,done=false,t0=0,stop=null;const TDU=[];
 const hx=now=>HX+SWAY*W*Math.sin(now/1100);
 function piece(){if(done)return;pi++;if(pi>=NP){done=true;phase="end";return crLater(()=>env.end(pts),300)}
  const PC=CRT_PCS[pi],TI=typeof mgpOne==="function"?mgpOne("td_cong",TDU,x=>x.slot===pi):null;/* ORDER THIN P1: one composed piece (petals × palette; band count stays the slot's), drawn through the no-repeat memory */const [pet,b0,dk,lt]=TI?[TI.pet,PC[1],TI.dk,TI.lt]:PC;const n=b0+mgMore(env);const col=i=>crMix(dk,lt,n>1?i/(n-1):0);
  /* spools: every band's shade + decoys half a step off (the hardest look-alikes: next to the darkest bands) */
  const sp=[...Array(n).keys()].map(i=>({c:col(i),b:i}));for(let k=0;k<Math.min(ALIKE,n-1);k++)sp.push({c:crMix(col(k),col(k+1),.5),b:-1});
  P={pet,n,col,sp:kg82Shuf(sp),band:0,ph:"pick",cols:[],q:[],k:0,used:-1,ok:0,start:crNow(),pk:null,dip0:0};phase="play";t0=P.start;layout()}
 /* spool places: one row (two rows when crowded) under the hoop */
 function layout(){const m=P.sp.length,rows=m>6?2:1,per=Math.ceil(m/rows),sx=W/(per+1),r=Math.min(sx*.36,24,H*.05);
  P.sp.forEach((s,i)=>{const row=Math.floor(i/per),j=i%per,cnt=row<rows-1?per:m-per*(rows-1);s.x=W/2+(j-(cnt-1)/2)*sx;s.y=SY+(rows>1?(row-.5)*r*2.7:0);s.r=r})}
 /* band i of the flower: scale from the rim (i = 0) to the heart */
 const sc=i=>1-i/(P.n+.6);
 function petals(x,y,R,s,fill,stroke,lw){g.save();g.translate(x,y);g.beginPath();for(let k=0;k<P.pet;k++){const a=k/P.pet*Math.PI*2-Math.PI/2;
   g.moveTo(Math.cos(a)*R*s*1.02,Math.sin(a)*R*s*1.02);g.ellipse(Math.cos(a)*R*s*.52,Math.sin(a)*R*s*.52,R*s*.5,R*s*.28,a,0,Math.PI*2)}
  if(fill){g.fillStyle=fill;g.fill()}if(stroke){g.strokeStyle=stroke;g.lineWidth=lw||1.2;g.stroke()}g.restore()}
 /* the stitch dots of band i: ST points on the band's mid-line, at petals spread round the flower */
 function dots(i,x,y){const s=(sc(i)+sc(i+1))/2,out=[];for(let k=0;k<ST;k++){const pt=Math.floor(k*P.pet/ST),a=pt/P.pet*Math.PI*2-Math.PI/2;out.push([x+Math.cos(a)*R0*s*.75,y+Math.sin(a)*R0*s*.75])}return out}
 /* the dip of the needle nearest to now (dip i at dip0 + i·beat) */
 const dipIdx=now=>Math.round((now-P.dip0)/BEAT),dipAt=i=>P.dip0+i*BEAT;
 function sample(x,y,R,now){const hid=now-P.start>PEEK;g.save();g.beginPath();g.arc(x,y,R*1.12,0,Math.PI*2);g.fillStyle="#fbf3e2";g.fill();g.strokeStyle="#8f5f0c";g.lineWidth=2;g.stroke();g.restore();
  if(!hid)for(let i=0;i<P.n;i++)petals(x,y,R,sc(i),crRGB(P.col(i)));
  else{/* the silk cloth over the sample (memory at high rank) */g.save();g.beginPath();g.arc(x,y,R*1.1,0,Math.PI*2);g.fillStyle="#c9a77a";g.fill();g.clip();g.globalAlpha=.3;g.strokeStyle="#6e4d0e";g.lineWidth=1;
   for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(x-R*1.1,y+k*R*.28);g.quadraticCurveTo(x,y+k*R*.28+R*.12,x+R*1.1,y+k*R*.28);g.stroke()}g.restore()}
  crTmp(g,x-R*1.12,y-R*1.12,R*2.24,R*2.24);return hid}
 function draw(now){kg82Bg(g,W,H,K,.1,.6);if(!P)return;const x=hx(now),y=HY;
  /* hoop: stand-in wooden ring + silk */
  crArt(g,"theu-hoop",x,y,R0*2.3,R0*2.3,{},()=>{g.save();g.beginPath();g.arc(x,y,R0*1.08,0,Math.PI*2);g.fillStyle="#fffaf0";g.fill();g.lineWidth=R0*.07;g.strokeStyle="#a8743a";g.stroke();g.restore();crTmp(g,x-R0*1.12,y-R0*1.12,R0*2.24,R0*2.24)});
  /* the bands: stitched ones in the chosen silk, the band being stitched half filled, the next one lit, the rest a faint outline */
  for(let i=0;i<P.n;i++){if(i<P.band||(i===P.band&&P.ph==="stitch")){const c=P.cols[i]||P.col(i);petals(x,y,R0,sc(i),crRGB(i<P.band?c:crMix(c,[255,255,255],.55*(1-P.k/ST))),null)}
   else petals(x,y,R0,sc(i),i===P.band&&P.ph==="pick"?"rgba(255,240,160,.6)":"rgba(255,255,255,.35)","rgba(110,77,14,.5)",1.2)}
  if(P.ph!=="end"&&P.band<P.n){/* lit band rim */g.save();g.shadowColor=BAL.mgFx.glow;g.shadowBlur=BAL.mgFx.blur*.5;petals(x,y,R0,sc(P.band),null,BAL.mgFx.ring,2.6);g.restore()}
  if(P.ph==="stitch"){const D=dots(P.band,x,y);D.forEach((d,k)=>{if(k<P.k){g.fillStyle=crRGB(P.cols[P.band]);g.strokeStyle="#6e4d0e";g.lineWidth=1;g.beginPath();g.arc(d[0],d[1],5,0,Math.PI*2);g.fill();g.stroke()}});
   const d=D[P.k];if(d){/* the lit dot and the needle bobbing onto it on the beat */const ph=((now-P.dip0)%BEAT+BEAT)%BEAT/BEAT,lift=(1-Math.cos(ph*Math.PI*2))/2;
    const near=1-Math.min(1,Math.abs(now-dipAt(dipIdx(now)))/(BEAT*.5));const rr=7+6*near;
    g.save();g.shadowColor=BAL.mgFx.glow;g.shadowBlur=BAL.mgFx.blur*near;g.fillStyle=near>.75?BAL.mgFx.ring:"#f6d27a";g.strokeStyle="#8f5f0c";g.lineWidth=1.5;g.beginPath();g.arc(d[0],d[1],rr,0,Math.PI*2);g.fill();g.stroke();g.restore();
    const ny=d[1]-6-lift*R0*.5;crArt(g,"theu-needle",d[0],ny,14,R0*.5,{ay:1},()=>{g.save();g.strokeStyle="#5b5b66";g.lineWidth=3;g.lineCap="round";g.beginPath();g.moveTo(d[0],ny);g.lineTo(d[0]+3,ny-R0*.42);g.stroke();
     g.strokeStyle=crRGB(P.cols[P.band]);g.lineWidth=1.6;g.beginPath();g.moveTo(d[0]+3,ny-R0*.4);g.quadraticCurveTo(d[0]+R0*.3,ny-R0*.6,d[0]+R0*.45,ny-R0*.2);g.stroke();g.restore()})}}
  /* sample in the corner */const sr=Math.min(W,H)*.08;sample(sr*1.35,sr*1.35,sr,now);
  /* spools */P.sp.forEach((s,i)=>{const on=P.pk===i&&now-P.litAt<BAL.mgFx.ms;const sz=on?kg82FxPop(P.litAt,now):1;crArt(g,"theu-spool",s.x,s.y,s.r*2*sz,s.r*2.4*sz,{},()=>{g.save();g.translate(s.x,s.y);g.scale(sz,sz);
    g.fillStyle="#b88a3a";g.fillRect(-s.r*.95,-s.r*1.15,s.r*1.9,s.r*.3);g.fillRect(-s.r*.95,s.r*.85,s.r*1.9,s.r*.3);g.fillStyle=crRGB(s.c);g.fillRect(-s.r*.8,-s.r*.85,s.r*1.6,s.r*1.7);
    g.globalAlpha=.22;g.strokeStyle="#000";g.lineWidth=1;for(let k=-3;k<=3;k++){g.beginPath();g.moveTo(-s.r*.8,k*s.r*.24);g.lineTo(s.r*.8,k*s.r*.24+2);g.stroke()}g.restore()});
   if(P.pk===i)kg82FxRing(g,s.x,s.y,s.r*1.2,P.litAt,now)});
  /* the «Mẫu» tag under the sample + ONE kit guiding line between the hoop and the spools: pick = which spool, stitch = when to tap (green when the lit dot glows) */
  g.textAlign="center";g.textBaseline="alphabetic";g.fillStyle=kg82Col("--k-lab","#6b4a1c");g.font=`700 12px ${kg82Col("--body","sans-serif")}`;kg82Lbl(g,"Mẫu",sr*1.35,sr*2.47+13,70);
  if(phase==="play"&&P.ph!=="end"){const top=Math.min(...P.sp.map(s=>s.y-s.r*1.2)),gy=(HY+R0*1.12+top)/2;
   if(P.ph==="pick")kg82Guide(g,"Chạm cuộn chỉ cùng sắc dải sáng",W/2,gy,"wait",13,W-16);
   else if(P.ph==="stitch"&&P.k<ST){const go=1-Math.min(1,Math.abs(now-dipAt(dipIdx(now)))/(BEAT*.5))>.75;kg82Guide(g,go?"Chạm khung ngay!":"Chạm khung khi kim chúc xuống",W/2,gy,go?"go":"wait",13,W-16)}}
  kg82DrawPops(g,pops,now);crHud(env,reach(now),pi,NP,phase==="play"?LIM-(now-t0):null);
  if(phase==="play"&&P.ph!=="end"&&now-P.start>LIM)endPiece(now)}
 /* the raw float if the rest goes perfectly: pieces done + the open piece's reach (wrong spools / loose stitches so far stay lost, its time part now) + pieces to come */
 function reach(now){if(!P||phase!=="play"||P.ph==="end")return mgReach(pts,Math.min(NP,pi+1),NP);const picked=P.band+(P.ph==="stitch"?1:0),cR=(P.ok+P.n-picked)/P.n;
  const sq=P.q.reduce((a,b)=>a+b,0),left=P.n*ST-P.q.filter(q=>q>0).length,sR=(sq+left)/Math.max(P.q.length+left,P.n*ST);
  return mgReach(pts+10/NP*(wC*cR+wS*sR)*mgPace(env,K,now-P.start,LIM),pi+1,NP)}
 function bandDone(){if(!P||P.ph!=="stitch")return;P.band++;P.k=0;if(P.band>=P.n)return endPiece(crNow());P.ph="pick"}
 function endPiece(now){if(P.ph==="end")return;P.ph="end";const cShare=P.ok/P.n,sQ=P.q.reduce((a,b)=>a+b,0)/Math.max(P.q.length,P.n*ST);
  const f=wC*cShare+wS*sQ,sp=mgPace(env,K,now-P.start,LIM),got=10/NP*f*sp;pts+=Math.max(0,got);kg82Pop(pops,W/2,H*.08+12,crStars(f),crCol(f,sp));
  phase="judge";crLater(piece,1200)}
 function tapAt(x,y){if(phase!=="play"||!P)return;const now=crNow();
  if(P.ph==="pick"){const i=P.sp.findIndex(s=>k91Dist(x,y,s.x,s.y)<s.r*1.35);if(i<0)return;const s=P.sp[i];P.pk=i;P.litAt=now;const right=s.b===P.band;
   P.cols[P.band]=s.c;if(right)P.ok++;kg82Pluck(P.band,right);kg82Pop(pops,s.x,s.y-s.r*1.6,right?"★":"✗",right?K91C.good():K91C.red());
   P.ph="stitch";P.k=0;P.dip0=now+BEAT*.5;P.used=-1;return}
  if(P.ph==="stitch"&&P.k<ST){if(k91Dist(x,y,hx(now),HY)>R0*1.25)return;const di=dipIdx(now),dt=Math.abs(now-dipAt(di));const d=dots(P.band,hx(now),HY)[P.k];
   const q=di<0||di===P.used?0:dt<=WIN?1:dt<=WIN*NEAR?.6:0;P.q.push(q);
   if(q>0){P.used=di;P.k++;kg82Pluck(P.k,true);if(q<1)kg82Pop(pops,d[0],d[1]-16,"★",K91C.gold());if(P.k>=ST)crLater(bandDone,BEAT*.35)}
   else kg82Pop(pops,d[0],d[1]-16,"✗",K91C.red())}}
 k91Pointer(C,{down:(x,y)=>tapAt(x,y)});
 /* the oracle: the right spool (with its look-alikes and whether the sample is covered: a test bot's memory slip), then the hoop on the dip */
 KG82.peek=()=>{if(phase!=="play"||!P)return null;const now=crNow();
  if(P.ph==="pick"){const i=P.sp.findIndex(s=>s.b===P.band);if(i<0)return null;const s=P.sp[i];const c=C.client(s.x,s.y);
   const al=P.sp.filter(t=>t!==s&&t.b<0&&Math.abs(t.c[0]-s.c[0])+Math.abs(t.c[1]-s.c[1])+Math.abs(t.c[2]-s.c[2])<90).map(t=>C.client(t.x,t.y));return Object.assign(c,{alike:al,hidden:now-P.start>PEEK})}
  /* stitch: the next free dip once it is near (≤ 300 ms); at = ms until that moment (the jslap convention read by dev/measure/mg-bots.js), so a bot taps on the beat, not on the call */
  if(P.ph==="stitch"&&P.k<ST){let di=Math.ceil((now-WIN*.25-P.dip0)/BEAT);if(di<=P.used)di=P.used+1;if(di<0)di=0;if(dipAt(di)-now>300)return null;const d=dots(P.band,hx(now),HY)[P.k];return d?Object.assign(C.client(d[0],d[1]),{at:dipAt(di)-now}):null}return null};
 KG82.hint=()=>{if(phase!=="play"||!P||P.ph!=="stitch"||P.k>=ST)return null;const now=crNow();let di=Math.ceil((now-WIN*.25-P.dip0)/BEAT);if(di<=P.used)di=P.used+1;if(di<0)di=0;
  const d=dots(P.band,hx(now),HY)[P.k];if(!d)return null;const c=C.client(d[0],d[1]);return{x:c.x,y:c.y,soon:dipAt(di)-now<BAL.mgTier.tut.lead}};
 piece();stop=crLoop(draw);return()=>{done=true;KG82.hint=null;if(stop)stop()}}
window.crtStitch=crtStitch;/* registered by jtd (loads later): crReg("td_cong","stitch",tdWrap(crtStitch,"stitch")) */
