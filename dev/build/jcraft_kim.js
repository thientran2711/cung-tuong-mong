/* ================= jcraft_kim: Khéo tay «Cắt hoa giấy» (kind kim, engine "papercut"; MG_CRAFTS.md §4; Khất xảo paper-cut, UNESCO ICH 2009) =================
   Real craft: red paper folded 2, 4 or 8 times and snipped; unfolded it becomes a symmetric window-flower. The skill is seeing, while folded, what each
   snip becomes once opened. Board: the finished window-flower (sample) on the left — covered by its cloth after lev.peek ms; on the right the same paper
   folded into a wedge (fold edges = the two radii, open edge = the arc). Drag one of the cutter shapes (moon, triangle, drop; + lev.alike look-alikes)
   onto the wedge where it will make the sample's holes; drag a cut off the wedge to take it back; tap ✓: the paper unfolds (accordion: panel m shows the
   wedge mirrored on every second panel), matching holes glow, extra holes show. 3 sheets: folds 2 · folds/2 · folds (lev.folds 8 = 2·4·8, 4 = 2·2·4).
   Match = same shape within lev.place (share of the wedge radius) of a hole of the sample, in the wedge's own plane.
   Score per sheet = 10/3 · max(0, (matched − lev.extra · extra) / needed) · mgPace(env, "kim", el, lim). No words in play: ★ / ✗ / ✓ signs only. */
const CRK_SH=["moon","tri","drop"],CRK_ALIKE=["half","dia"];/* the alike pool: half-moon looks like the moon, the diamond like the drop / triangle */
function crkShape(g,sh,x,y,a,z){/* a cutter / hole shape centred (x,y), symmetric about its radial axis a (pointing outward), size z (px) */
 g.save();g.translate(x,y);g.rotate(a+Math.PI/2);/* local: −y = outward */g.beginPath();
 if(sh==="moon"){g.arc(0,0,z,0,Math.PI*2);g.closePath();g.save();g.clip();g.beginPath();g.arc(0,0,z,0,Math.PI*2);g.arc(0,-z*.55,z*.82,0,Math.PI*2,true);g.fill("evenodd");g.restore();g.restore();return}
 if(sh==="half"){g.arc(0,z*.25,z,Math.PI,Math.PI*2);g.closePath()}
 else if(sh==="tri"){g.moveTo(0,z*1.05);g.lineTo(-z*.95,-z*.75);g.lineTo(z*.95,-z*.75);g.closePath()}
 else if(sh==="drop"){/* round end inward, tip outward: the arc between the two tangent points from the tip (0, −1.15z) */g.arc(0,z*.3,z*.72,-Math.PI*.166,-Math.PI*.834,false);g.lineTo(0,-z*1.15);g.closePath()}
 else if(sh==="dia"){g.moveTo(0,-z*1.1);g.lineTo(z*.62,0);g.lineTo(0,z*1.1);g.lineTo(-z*.62,0);g.closePath()}
 g.fill();g.restore()}
function crkPaper(box,env){const C=kg82Canvas(box,(box.clientWidth||300)<420?1.15:.8,470),{g,W,H}=C;const K="kim",L=n=>crLev(env,K,n);
 const F=Math.max(2,Math.pow(2,Math.round(Math.log2(Math.max(2,L("folds")))))),FOLDS=[2,Math.max(2,F/2),F],NR=FOLDS.length;
 const HOLES=Math.max(1,Math.round(L("holes")))+mgMore(env),SIZE=L("size"),TOL=L("place"),PEEK=L("peek"),ALIKE=Math.max(0,Math.round(L("alike"))),LIM=L("lim"),EX=L("extra");
 const side=W>=H*1.05;/* sample left / wedge right (wide); sample above / wedge below (narrow) */
 const SX=side?W*.2:W*.5,SY=side?H*.42:H*.2,RS=side?Math.min(W*.17,H*.34):Math.min(W*.3,H*.17);
 const AX=side?W*.7:W*.5,AY=side?H*.72:H*.74,R=side?Math.min(W*.27,H*.55):Math.min(W*.42,H*.4);
 const TY=H*.92,RED="#c0282d",PAPER="#fbf1dc";const pops=[];const KU=[];let r=-1,P=null,phase="",pts=0,done=false,drag=null,stop=null;
 const bt=k91Btns(box,[["crkok","✓","","Mở giấy: xem hoa cắt"]]);const okb=bt.querySelector("#crkok");
 /* wedge-plane point (rr share of R, ph radians from the wedge's left fold) → board px */
 const wA0=a=>-Math.PI/2-a/2;
 const toXY=(rr,ph,a)=>{const t=wA0(a)+ph;return[AX+Math.cos(t)*rr*R,AY+Math.sin(t)*rr*R]};
 const fromXY=(x,y,a)=>{const dx=x-AX,dy=y-AY;const rr=Math.hypot(dx,dy)/R;let t=Math.atan2(dy,dx)-wA0(a);while(t<-Math.PI)t+=Math.PI*2;while(t>Math.PI)t-=Math.PI*2;return[rr,t]};
 const inW=(rr,ph,a)=>rr>=.08&&rr<=1.02&&ph>=-.04&&ph<=a+.04;
 const pl=(rr,ph)=>[rr*Math.cos(ph),rr*Math.sin(ph)];/* the wedge's own plane (units of R) */
 const dist=(c,t)=>{const a=pl(c.r,c.ph),b=pl(t.r,t.ph);return Math.hypot(a[0]-b[0],a[1]-b[1])};
 function next(){if(done)return;r++;if(r>=NR){done=true;okb.disabled=true;phase="end";return crLater(()=>env.end(pts),300)}
  const f=FOLDS[r],a=Math.PI*2/f,shapes=CRK_SH.concat(CRK_ALIKE.slice(0,ALIKE));const z=SIZE;const T=[];
  const KI=typeof mgpOne==="function"?mgpOne("kim",KU):null,RN=KI?mgpRng(KI.seed):Math.random,hs=KI?KI.sh.concat(CRK_ALIKE.slice(0,ALIKE)):shapes;/* ORDER THIN P1: one composed paper (hole shapes × layout seed), drawn through the no-repeat memory; the tray keeps every cutter */
  for(let k=0;k<HOLES;k++){for(let tr=0;tr<80;tr++){const rr=.3+RN()*.55,edge=RN()<.2?(RN()<.5?0:a):null;
    const ph=edge!=null?edge:a*(.18+RN()*.64);const t={sh:hs[Math.floor(RN()*hs.length)],r:rr,ph};
    /* holes apart from each other (and from their own mirror images across the folds) */
    if(T.every(o=>dist(o,t)>z*3.2)&&(edge!=null||(rr*Math.sin(Math.min(ph,a-ph))>z*1.6))){T.push(t);break}}}
  const tray=shapes.map((sh,i)=>({sh,x:(side?W*.42:W*.1)+(i+.5)*((side?W*.56:W*.8)/shapes.length),y:TY}));
  P={f,a,z,T,cuts:[],tray,start:crNow(),ph:"cut",open:0,res:null};phase="play";okb.disabled=false}
 function drawPaper(cx,cy,RR,a0,span,cuts,opts){/* the red paper sector [a0, a0+span] with every cut's mirrored images (panels of angle P.a) */
  g.save();g.beginPath();g.moveTo(cx,cy);g.arc(cx,cy,RR,a0,a0+span);g.closePath();g.fillStyle=RED;g.fill();g.clip();g.fillStyle=PAPER;
  const n=Math.ceil(span/P.a-1e-6);for(let m=0;m<n;m++)for(const c of cuts){const t=m%2===0?a0+m*P.a+c.ph:a0+(m+1)*P.a-c.ph;if(t>a0+span+1e-6)continue;
   const x=cx+Math.cos(t)*c.r*RR,y=cy+Math.sin(t)*c.r*RR;g.fillStyle=opts&&opts.col?opts.col(c):PAPER;crkShape(g,c.sh,x,y,t,P.z*RR)}
  /* creases */g.strokeStyle="rgba(255,255,255,.28)";g.lineWidth=1;for(let m=1;m<n;m++){const t=a0+m*P.a;g.beginPath();g.moveTo(cx,cy);g.lineTo(cx+Math.cos(t)*RR,cy+Math.sin(t)*RR);g.stroke()}
  g.restore()}
 function draw(now){kg82Bg(g,W,H,"kim",.12,.6);if(!P)return;const a=P.a,hid=now-P.start>PEEK&&P.ph==="cut";
  /* the sample: the opened window-flower (or its cloth); the gold outline marks the panel that is the folded wedge */
  crArt(g,"kim-sample",SX,SY,RS*2,RS*2,{},()=>{if(hid){g.save();g.beginPath();g.arc(SX,SY,RS,0,Math.PI*2);g.fillStyle="#c9a77a";g.fill();g.restore()}
   else{drawPaper(SX,SY,RS,wA0(a),Math.PI*2,P.T);g.save();g.strokeStyle="rgba(255,226,140,.85)";g.lineWidth=1.6;g.beginPath();g.moveTo(SX,SY);g.arc(SX,SY,RS,wA0(a),wA0(a)+a);g.closePath();g.stroke();g.restore()}
   crTmp(g,SX-RS,SY-RS,RS*2,RS*2)});
  if(P.ph==="cut"){/* the folded wedge with the cuts so far (as cut paper: the holes show), the fold edges darker */
   crArt(g,"kim-wedge",AX,AY,R*2,R*2,{},()=>{drawPaper(AX,AY,R,wA0(a),a,P.cuts);crTmp(g,AX-R,AY-R,R*2,R)});
   g.save();g.strokeStyle="#7a1418";g.lineWidth=2.5;g.beginPath();g.moveTo(...toXY(1,0,a));g.lineTo(AX,AY);g.lineTo(...toXY(1,a,a));g.stroke();g.restore();
   if(drag&&drag.c){const c=drag.c;g.save();g.globalAlpha=.85;g.fillStyle=PAPER;const t=Math.atan2(drag.y-AY,drag.x-AX);crkShape(g,c.sh,drag.x,drag.y,t,P.z*R);g.restore()}}
  else{/* opening: the sector grows from the wedge to the full sheet; then the holes are judged */const k=Math.min(1,(now-P.open)/900);const span=a+(Math.PI*2-a)*k*k*(3-2*k);
   const OY=AY-R*.35,OR=R*.62;drawPaper(AX,OY,OR,wA0(a),span,P.cuts,P.res&&k>=1?{col:c=>c.ok?"#fff0a0":"#ffffff"}:null);
   if(P.res&&k>=1){g.save();g.setLineDash([4,3]);g.strokeStyle=K91C.red();g.lineWidth=1.6;/* the sample's holes she missed, as dashed ghosts on the wedge panel */
    for(const t of P.T.filter(t=>!t.ok)){const ang=wA0(a)+t.ph,x=AX+Math.cos(ang)*t.r*OR,y=OY+Math.sin(ang)*t.r*OR;g.beginPath();g.arc(x,y,P.z*OR*1.25,0,Math.PI*2);g.stroke()}g.restore()}}
  /* the cutter tray (pictures only) */
  P.tray.forEach(s=>{const on=drag&&drag.c&&drag.new&&drag.c.sh===s.sh;crArt(g,"kim-cut-"+s.sh,s.x,s.y,P.z*R*3,P.z*R*3,{},()=>{g.save();g.fillStyle="#fff8ea";g.strokeStyle="#8f5f0c";g.lineWidth=1.5;
    k91RR(g,s.x-P.z*R*1.6,s.y-P.z*R*1.6,P.z*R*3.2,P.z*R*3.2,6);g.fill();g.stroke();g.fillStyle=RED;crkShape(g,s.sh,s.x,s.y,-Math.PI/2,P.z*R*(on?BAL.mgFx.pop:1));g.restore()})});
  kg82DrawPops(g,pops,now);crHud(env,phase==="play"&&P.ph==="cut"?mgReach(pts+10/NR*mgPace(env,K,now-P.start,LIM),r+1,NR):mgReach(pts,Math.min(NR,r+1),NR),r,NR,phase==="play"&&P.ph==="cut"?LIM-(now-P.start):null);
  if(phase==="play"&&P.ph==="cut"&&now-P.start>LIM)open(now)}
 function open(now){if(!P||P.ph!=="cut")return;P.ph="open";P.open=now;okb.disabled=true;drag=null;const el=now-P.start;
  /* greedy match: each hole of the sample takes the nearest unused cut of its shape within the tolerance */
  const used=new Set();let m=0;P.T.forEach(t=>{t.ok=false;let bi=-1,bd=TOL;P.cuts.forEach((c,i)=>{if(used.has(i)||c.sh!==t.sh)return;const d=dist(c,t);if(d<=bd){bd=d;bi=i}});if(bi>=0){used.add(bi);P.cuts[bi].ok=true;t.ok=true;m++}});
  const extra=P.cuts.length-used.size;const s=Math.max(0,(m-EX*extra)/P.T.length),sp=mgPace(env,K,el,LIM);const got=10/NR*s*sp;pts+=got;
  crLater(()=>{if(!P)return;P.res={m,extra};kg82Pluck(2,s>=.6);kg82Pop(pops,W/2,H*.1+10,crStars(s),crCol(s,sp))},900);
  phase="judge";crLater(()=>{if(done)return;phase="play";next()},2300)}
 okb.onclick=()=>{if(phase==="play"&&P&&P.ph==="cut")open(crNow())};
 k91Pointer(C,{down:(x,y)=>{if(phase!=="play"||!P||P.ph!=="cut")return;
   const s=P.tray.find(s=>Math.abs(x-s.x)<P.z*R*1.7&&Math.abs(y-s.y)<P.z*R*1.7);if(s){drag={c:{sh:s.sh},new:1,x,y};return}
   /* pick up a cut already on the wedge (to move it, or off the wedge to take it back) */
   let bi=-1,bd=P.z*R*1.3;P.cuts.forEach((c,i)=>{const [cx,cy]=toXY(c.r,c.ph,P.a);const d=k91Dist(x,y,cx,cy);if(d<bd){bd=d;bi=i}});if(bi>=0){const c=P.cuts.splice(bi,1)[0];drag={c,new:0,x,y}}},
  move:(x,y)=>{if(drag){drag.x=x;drag.y=y}},
  up:(x,y)=>{if(!drag||!P||P.ph!=="cut"){drag=null;return}const [rr,ph]=fromXY(x,y,P.a);
   if(inW(rr,ph,P.a)){const c={sh:drag.c.sh,r:Math.min(1,rr),ph:cl(ph,0,P.a)};/* the hole of the sample this cut was meant for (the oracle's bookkeeping) */
    const free=P.T.map((t,i)=>i).filter(i=>P.T[i].sh===c.sh&&!P.cuts.some(q=>q.aim===i));let ai=-1,ad=1e9;free.forEach(i=>{const d=dist(c,P.T[i]);if(d<ad){ad=d;ai=i}});c.aim=ai;
    P.cuts.push(c);kg82Pluck(P.cuts.length,true)}drag=null}});
 /* the oracle: drag the shape of the next hole not yet cut from the tray to its place on the wedge, then ✓ */
 KG82.peek=()=>{if(phase!=="play"||!P||P.ph!=="cut"||drag)return null;const i=P.T.findIndex((t,k)=>!P.cuts.some(c=>c.aim===k));if(i<0)return{sel:"#crkok"};
  const t=P.T[i],s=P.tray.find(s=>s.sh===t.sh);const [tx,ty]=toXY(t.r,t.ph,P.a);const A=C.client(s.x,s.y),B=C.client(tx,ty);return{drag:[[A.x,A.y],[(A.x+B.x)/2,Math.min(A.y,B.y)-20],[B.x,B.y]]}};
 next();stop=crLoop(draw);return()=>{done=true;if(stop)stop()}}
crReg("kim","papercut",crkPaper);
