/* ================= jcraft_hoa: CẮM HOA «Chọn mùa · cắt cành · nghiêng thế» (mg-craft-hoa; design dev/design/MG_CRAFTS.md §3; owner OD 20/11 ~08:15Z:
   each craft its own mechanic, no tracing) =================
   Kind key `hoa` (kG / kAdj / cal key unchanged), engine `ikebana`: eng(box, env{kind,lv,hud,end(raw 0..10)}) → stop, KG82.peek oracle.
   Three vases (stems BAL.mgTier.hoa.n + mgMore). Per vase:
     1 CHỌN  tap the season's main flower in a tray of 6 (the window shows the season; an off-season look-alike wilts, season share falls)
     2 CẮT   one stem at a time lies on the cloth; SWIPE across it to cut: Thiên ≈ 1.5 × vase height, Nhân ≈ ¾ Thiên, Địa ≈ ¾ Nhân (the vase is the ruler)
     3 CẮM   drag the cut stem into the vase mouth, then drag its tip round to lean it (Thiên ~10°, Nhân ~45°, Địa ~75°, uneven triangle)
   Score per vase 10/NR × (w.sea·season + w.len·length + w.ang·lean + w.bal·balance) × mgPace; levers BAL.mgTier.lev.hoa.* through mgLev (ONE CORE), other
   constants BAL.mgTier.hoa. No word is drawn in play (pictures, stars, the role bars, the ghost ticks / fan); art here is a STAND-IN drawn on the canvas
   (canvas.dataset.tam="hoa" marks it; ART REQUEST in reports/mg-craft-hoa.md). ✕ / Quay lại / ✓ are the kit's. */
const KCH_SEAS=[/* winter · summer · autumn · spring: the main flower + its look-alikes (same colour family, other season) */
 {k:"mai",fl:{col:"#fffaf0",ctr:"#e3b23c",n:5,pt:.46},like:[{col:"#fff0e6",ctr:"#9bb05a",n:5,pt:.46},{col:"#f6f8ee",ctr:"#e3b23c",n:6,pt:.4},{col:"#fffdf5",ctr:"#c9a0a0",n:5,pt:.55}]},
 {k:"sen",fl:{col:"#f19ab8",ctr:"#f0d060",n:9,pt:.3},like:[{col:"#f5b0c8",ctr:"#9bb05a",n:9,pt:.3},{col:"#e98aac",ctr:"#f0d060",n:8,pt:.34},{col:"#f6c0d4",ctr:"#e3b23c",n:10,pt:.28}]},
 {k:"cuc",fl:{col:"#f2c230",ctr:"#a8691a",n:14,pt:.2},like:[{col:"#f6d25a",ctr:"#7a8a3a",n:14,pt:.2},{col:"#ecb020",ctr:"#a8691a",n:12,pt:.22},{col:"#f8dc7a",ctr:"#b8791a",n:16,pt:.18}]},
 {k:"dao",fl:{col:"#f8b4c4",ctr:"#c4425a",n:5,pt:.5},like:[{col:"#fbc4d0",ctr:"#e3b23c",n:5,pt:.5},{col:"#f4a0b6",ctr:"#c4425a",n:6,pt:.44},{col:"#fdd0da",ctr:"#9b4a6a",n:5,pt:.52}]}];
const KCH_RCP={chrys:"cuc",plum:"mai",peach:"dao"};/* jwkr WKR_FL flower → this board's season flower */
const KCH_OTHER=[{col:"#8aa4ea",ctr:"#fff4c0",n:6,pt:.38},{col:"#b58ad8",ctr:"#f0e0a0",n:7,pt:.34},{col:"#e8704a",ctr:"#5a2a10",n:8,pt:.3},{col:"#ffffff",ctr:"#444444",n:12,pt:.22}];
/* one blossom (stand-in): n petals of length pt·r·2, centre disc; droop = wilted (greyed, bent) */
function kchBloom(g,x,y,r,F,droop){g.save();g.translate(x,y);if(droop){g.rotate(1.15);g.globalAlpha*=.85}
 for(let i=0;i<F.n;i++){g.rotate(Math.PI*2/F.n);g.fillStyle=droop?"#a99a86":F.col;g.strokeStyle="rgba(90,60,40,.28)";g.lineWidth=1;g.beginPath();g.ellipse(0,-r*.62,r*F.pt*.8,r*.62,0,0,Math.PI*2);g.fill();g.stroke()}
 g.fillStyle=droop?"#7a6a58":F.ctr;g.beginPath();g.arc(0,0,r*.26,0,Math.PI*2);g.fill();g.restore()}
/* a stem: base (bx,by), length L, lean ang (rad from vertical), bloom at the tip; cut end is drawn as a light disc */
function kchStem(g,bx,by,L,ang,F,r,o){o=o||{};const tx=bx+L*Math.sin(ang),ty=by-L*Math.cos(ang),px=Math.cos(ang),py=Math.sin(ang);g.save();if(o.alpha!=null)g.globalAlpha*=o.alpha;
 if(o.glow){g.shadowColor=BAL.mgFx.glow;g.shadowBlur=BAL.mgFx.blur*.5}
 g.strokeStyle="#4f7f4a";g.lineWidth=Math.max(3,r*.34);g.lineCap="round";g.beginPath();g.moveTo(bx,by);g.quadraticCurveTo((bx+tx)/2+px*L*.05,(by+ty)/2+py*L*.05,tx,ty);g.stroke();g.shadowBlur=0;
 g.fillStyle="#6b9a5e";for(const q of [.38,.62]){const lx=bx+(tx-bx)*q,ly=by+(ty-by)*q,s=q<.5?-1:1;g.beginPath();g.ellipse(lx+s*r*.5*px,ly+s*r*.5*py,r*.5,r*.2,ang+s*.6,0,Math.PI*2);g.fill()}
 g.fillStyle="#e8dcb0";g.beginPath();g.arc(bx,by,Math.max(2.5,r*.17),0,Math.PI*2);g.fill();
 kchBloom(g,tx,ty,r,F,o.droop);g.restore();return{x:tx,y:ty}}
/* the season in the window: winter snow · summer lotus pond · autumn leaves · spring petals (stand-in picture) */
function kchScene(g,x,y,w,h,si,F,now,fa){g.save();g.beginPath();g.rect(x,y,w,h);g.clip();
 const bg=[["#e6eef6","#f8fbff"],["#cfe8d6","#a8d2c0"],["#f6dca8","#e8b878"],["#fbe6ee","#fff4f4"]][si];const gr=g.createLinearGradient(0,y,0,y+h);gr.addColorStop(0,bg[0]);gr.addColorStop(1,bg[1]);g.fillStyle=gr;g.fillRect(x,y,w,h);
 const t=(now||0)/1000;
 if(si===0){g.fillStyle="#fff";for(let i=0;i<14;i++){g.beginPath();g.arc(x+((i*53+t*14)%w),y+((i*37+t*22)%h),1.6+(i%3),0,7);g.fill()}g.strokeStyle="#6a5040";g.lineWidth=3;g.beginPath();g.moveTo(x+w*.1,y+h*.95);g.quadraticCurveTo(x+w*.4,y+h*.5,x+w*.85,y+h*.3);g.stroke()}
 else if(si===1){g.fillStyle="#7fb7a8";g.fillRect(x,y+h*.62,w,h*.38);g.fillStyle="#4f9a62";for(let i=0;i<4;i++){g.beginPath();g.ellipse(x+w*(.18+i*.22),y+h*(.74+(i%2)*.1),w*.09,h*.05,0,0,7);g.fill()}}
 else if(si===2){g.fillStyle="#c8602a";for(let i=0;i<9;i++){g.save();g.translate(x+((i*61+t*10)%w),y+((i*43+t*26)%h));g.rotate(i+t);g.beginPath();g.ellipse(0,0,5,2.6,0,0,7);g.fill();g.restore()}}
 else{g.fillStyle="#f6a6b8";for(let i=0;i<10;i++){g.beginPath();g.ellipse(x+((i*47+t*12)%w),y+((i*39+t*20)%h),3.4,2,i,0,7);g.fill()}}
 /* the season's flower, large, in the window corner: the aid (BAL lev.hoa.ghost); at the hardest board she must know it */if(fa>.02){g.globalAlpha=Math.min(1,fa);kchBloom(g,x+w*.78,y+h*.62,Math.min(w,h)*.26,F,false)}g.restore();
 g.save();g.strokeStyle="#6b4a2a";g.lineWidth=4;g.strokeRect(x,y,w,h);g.beginPath();g.moveTo(x+w/2,y);g.lineTo(x+w/2,y+h);g.moveTo(x,y+h/2);g.lineTo(x+w,y+h/2);g.lineWidth=2;g.stroke();g.restore()}
function kcHoa(box,env){const C=kg82Canvas(box,1.08,480),{g,W,H}=C;C.cv.dataset.tam="hoa";const B=BAL.mgTier.hoa,L=n=>mgLev(env,"hoa",n);const NR=B.n.length;
 const hv=Math.min(H*.2,W*.28),MX=W*.5,MY=H*.56,TY=H*.9,HX=W*.07,LU=B.cut*hv,rB=hv*.2,more=Math.min(B.maxMore,mgMore(env));
 const ghost=L("ghost"),cutTol=L("cutTol"),angTol=L("angTol"),sway=L("sway"),nAlike=Math.round(L("alike"));
 /* a handmade-work recipe (j83 «Cắm hoa», jwkr WKR_FL) with one of this board's four flowers arranges only that flower: every vase takes its season (orchid / peony / mixed recipes keep the shuffle) */
 const wk=(typeof wkrNow==="function"&&wkrNow())||null,rf=wk&&wk.kind==="bhoa"&&typeof WKR_FL!=="undefined"?KCH_RCP[WKR_FL[wk.r]]:null,ri=rf?KCH_SEAS.findIndex(x=>x.k===rf):-1;
 const seas=ri>=0?[ri,ri,ri,ri]:kg82Shuf([0,1,2,3]);const HU=[],HS=[];let r=-1,sum=0,P=null,phase="",done=false,gest=null,pops=[],falls=[],slash=null,tEnd=0;
 const btn=k91Btns(box,[["k91done","✓","","Cắm xong: chấm thế hoa"]]);const bd=btn.querySelector("#k91done");
 const rad=d=>d*Math.PI/180,dg=a=>a*180/Math.PI,wob=now=>rad(sway*180)*Math.sin(now/110);
 /* target of stem i: length in px (chain Thiên → Nhân → Địa; guests hang off Nhân / Địa alternately) and the lean in degrees */
 const lenT=i=>{const k=B.k;const th=B.thien*hv;if(i===0)return th;if(i===1)return th*k[0];if(i===2)return th*k[0]*k[1];const gi=i-3;return th*k[0]*(i%2?1:k[1])*B.guest[Math.min(gi,B.guest.length-1)]};
 const angT=i=>B.ang[Math.min(i,B.ang.length-1)];
 const pickPos=i=>({x:W*(.2+.3*(i%3)),y:H*(.5+.2*Math.floor(i/3))});
 const tipOf=(s,a)=>({x:MX+s.L*Math.sin(a),y:MY-s.L*Math.cos(a)});
 function next(){r++;if(r>=NR){done=true;bd.disabled=true;phase="end";return setTimeout(()=>env.end(Math.max(0,Math.min(10,sum))),300)}
  const IT=typeof mgpOne==="function"?mgpOne("hoa",HU,x=>ri>=0?x.si===ri:HS.indexOf(x.si)<0):null;/* ORDER THIN P1: one composed tray (season × look-alike order × two other flowers), drawn through the no-repeat memory */if(IT)HS.push(IT.si);
  const si=IT?IT.si:seas[r],SE=KCH_SEAS[si],n=B.n[r]+more;const like=(IT?IT.like.map(i=>SE.like[i]):kg82Shuf(SE.like)).slice(0,Math.max(0,Math.min(3,nAlike)));
  const oAll=KCH_SEAS.filter((_,i)=>i!==si).map(s=>s.fl).concat(KCH_OTHER);const oth=IT?IT.oth.map(i=>oAll[i]).concat(kg82Shuf(oAll.filter((_,i)=>IT.oth.indexOf(i)<0))):kg82Shuf(oAll);const fl=[{F:SE.fl,main:true}].concat(like.map(F=>({F,main:false})),oth.map(F=>({F,main:false}))).slice(0,6);
  P={si,SE,fl:kg82Shuf(fl).map(f=>Object.assign(f,{wilt:false})),wrong:0,picked:false,cur:0,last:null,t0:performance.now(),lim:n*L("limStem"),
   st:Array.from({length:n},(_,i)=>({i,Lt:lenT(i),at:angT(i),cut:false,L:0,seated:false,a:0,leaned:false}))};phase="pick";bd.disabled=true}
 function score(){const S=P.st,n=S.length;const z=B.zero-1;let ln=0,an=0;
  S.forEach(s=>{if(s.cut){const e=Math.abs(s.L-s.Lt)/s.Lt;ln+=Math.max(0,Math.min(1,1-(e-cutTol)/(z*cutTol)))}if(s.seated){const e=Math.abs(dg(s.a)-s.at);an+=Math.max(0,Math.min(1,1-(e-angTol)/(z*angTol)))}});
  const pl=S.filter(s=>s.seated);const cen=(arr,f)=>arr.reduce((a,s)=>a+s.Lc*Math.sin(f(s)),0)/(arr.reduce((a,s)=>a+s.Lc,0)||1);
  const b=pl.length?Math.max(0,1-Math.abs(cen(pl.map(s=>({Lc:s.L,s})),o=>o.s.a)-cen(S.map(s=>({Lc:s.Lt,s})),o=>rad(o.s.at)))/B.balTol):0;
  const sea=P.picked?Math.max(0,1-P.wrong*B.wrong):0;return{sea,len:ln/n,ang:an/n,bal:b*(pl.length/n),s:B.w.sea*sea+B.w.len*ln/n+B.w.ang*an/n+B.w.bal*b*(pl.length/n)}}
 function judge(){if(phase==="judge")return;const el=performance.now()-P.t0;phase="judge";bd.disabled=true;gest=null;const sc=score(),pace=mgPace(env,"hoa",el,P.lim),v=10/NR*sc.s*pace;sum+=v;P.verdict=sc.s;P.sp=pace;P.v=v;
  setTimeout(()=>{if(!done)next()},B.judgeMs)}
 const stop=k91Loop(now=>{if(!P)return;const left=P.lim-(now-P.t0);if((phase==="pick"||phase==="play")&&left<=0)judge();
  kg82Bg(g,W,H,"hoa",.28,.6);
  /* season window: large while she picks, a small reminder while she cuts */
  const big=phase==="pick";const wx=big?W*.12:W*.03,wy=big?H*.03:H*.02,ww=big?W*.76:W*.22,wh=big?H*.3:H*.15;kchScene(g,wx,wy,ww,wh,P.si,P.SE.fl,now,ghost);
  if(phase==="pick"){P.fl.forEach((f,i)=>{const c=pickPos(i);g.save();g.fillStyle="rgba(255,250,236,.55)";g.beginPath();g.ellipse(c.x,c.y+rB*1.9,rB*1.7,rB*.5,0,0,7);g.fill();
    kchStem(g,c.x,c.y+rB*1.9,rB*3.4,f.wilt?.5:0,f.F,rB*1.15,{droop:f.wilt,alpha:f.wilt?.7:1});g.restore()})}
  else{
   /* role bars: one bar per stem, as tall as its target; the seated ones are filled, the next one is lit */
   const S=P.st,bw=Math.min(14,W*.035),bx0=W-8-S.length*(bw+4);g.save();S.forEach((s,i)=>{const h=s.Lt/(B.thien*hv)*H*.12,x=bx0+i*(bw+4);const cur=i===P.cur&&phase==="play";
    if(cur){g.shadowColor=BAL.mgFx.glow;g.shadowBlur=BAL.mgFx.blur*.4}g.fillStyle=s.seated?K91C.good():cur?"#fff3b0":"rgba(255,250,236,.7)";g.strokeStyle=cur?K91C.gold():K91C.hair;g.lineWidth=cur?2.5:1.5;
    g.beginPath();g.rect(x,H*.16-h,bw,h);g.fill();g.stroke();g.shadowBlur=0});g.restore();
   /* the stems in the vase (longest first), then the vase over their feet */
   const seated=S.filter(s=>s.seated).sort((a,b)=>b.L-a.L);seated.forEach(s=>{const a=s.a+(gest&&gest.type==="lean"&&gest.s===s?wob(now):0);kchStem(g,MX,MY+hv*.04,s.L,a,P.fl.find(f=>f.main).F,rB*(s.i>=3?.85:1),{glow:gest&&gest.s===s})});
   if(!kg82Spr(g,"hoa-vase",MX,MY-hv*.02,null,hv*1.05,{ay:0})){g.save();const vw=hv*.55;const gr=g.createLinearGradient(MX-vw,0,MX+vw,0);gr.addColorStop(0,"#2f5d6e");gr.addColorStop(.5,"#6aa0b0");gr.addColorStop(1,"#2f5d6e");g.fillStyle=gr;
    g.beginPath();g.moveTo(MX-vw*.42,MY);g.lineTo(MX+vw*.42,MY);g.bezierCurveTo(MX+vw*.4,MY+hv*.25,MX+vw,MY+hv*.35,MX+vw*.8,MY+hv);g.lineTo(MX-vw*.8,MY+hv);g.bezierCurveTo(MX-vw,MY+hv*.35,MX-vw*.4,MY+hv*.25,MX-vw*.42,MY);g.fill();
    g.strokeStyle="#f4efe6aa";g.lineWidth=1.5;g.beginPath();g.ellipse(MX,MY+hv*.55,vw*.6,hv*.1,0,0,7);g.stroke();g.restore()}
   /* the cloth */g.fillStyle="rgba(255,250,236,.55)";g.fillRect(0,TY-hv*.62,W,H-(TY-hv*.62));
   const s=S[P.cur];const FF=P.fl.find(f=>f.main).F;
   if(s&&phase==="play"){
    if(!s.cut){/* the long stem lies on the cloth; ghost ticks every half vase + the right one lit */
     if(ghost>.02){g.save();g.globalAlpha=Math.min(1,ghost);g.strokeStyle=K91C.lab;g.lineWidth=1.5;for(let k=1;k*hv/2<LU;k++){const x=HX+k*hv/2;g.beginPath();g.moveTo(x,TY+rB*.5);g.lineTo(x,TY+rB*(k%2?.9:1.3));g.stroke()}
      const x=HX+s.Lt;g.strokeStyle=K91C.good();g.lineWidth=3;g.shadowColor=BAL.mgFx.glow;g.shadowBlur=BAL.mgFx.blur*.4;g.beginPath();g.moveTo(x,TY-rB*1.4);g.lineTo(x,TY+rB*1.4);g.stroke();g.restore()}
     kchStem(g,HX+LU,TY,LU,-Math.PI/2,FF,rB,{glow:true})}
    else if(!(gest&&gest.type==="carry"&&gest.f===s)){kchStem(g,HX+s.L,TY,s.L,-Math.PI/2,FF,rB,{glow:true});
     if(ghost>.02){g.save();g.globalAlpha=Math.min(1,ghost)*.5;g.setLineDash([5,5]);g.strokeStyle=K91C.good();g.lineWidth=2;const a=rad(s.at);g.beginPath();g.moveTo(MX,MY);g.lineTo(MX+s.L*Math.sin(a),MY-s.L*Math.cos(a));g.stroke();g.restore()}}
    else{kchStem(g,gest.x,gest.y,s.L,0,FF,rB,{glow:true})}
    if(P.last&&!P.last.leaned&&ghost>.02){g.save();g.globalAlpha=Math.min(1,ghost)*.5;g.setLineDash([5,5]);g.strokeStyle=K91C.good();g.lineWidth=2;const q=P.last,a=rad(q.at);g.beginPath();g.moveTo(MX,MY);g.lineTo(MX+q.L*Math.sin(a),MY-q.L*Math.cos(a));g.stroke();g.restore()}}
   if(phase==="judge"){/* the master's own set, faint, and the stars */g.save();g.globalAlpha=.55;g.setLineDash([4,4]);g.strokeStyle=K91C.good();g.lineWidth=2;S.forEach(q=>{const a=rad(q.at);g.beginPath();g.arc(MX+q.Lt*Math.sin(a),MY-q.Lt*Math.cos(a),rB*.7,0,7);g.stroke()});g.restore();
    const v=P.verdict;g.fillStyle=crCol(v,P.sp);g.font=k91F(700,22,1);g.textAlign="center";g.textBaseline="alphabetic";kg82Lbl(g,crStars(v),W/2,TY,W-16)}}
  /* falling cut-offs + the slash */
  for(let i=falls.length-1;i>=0;i--){const q=falls[i],k=(now-q.a)/600;if(k>=1){falls.splice(i,1);continue}g.save();g.globalAlpha=1-k;g.strokeStyle="#4f7f4a";g.lineWidth=Math.max(3,rB*.34);g.lineCap="round";g.translate(0,k*k*hv*.5);g.rotate(k*.3);g.beginPath();g.moveTo(q.x,TY);g.lineTo(q.x+q.len,TY);g.stroke();g.restore()}
  if(slash&&now-slash.a<BAL.mgFx.ms){g.save();g.globalAlpha=1-(now-slash.a)/BAL.mgFx.ms;g.strokeStyle=BAL.mgFx.ring;g.lineWidth=4;g.shadowColor=BAL.mgFx.glow;g.shadowBlur=BAL.mgFx.blur*.5;g.beginPath();g.moveTo(slash.x0,slash.y0);g.lineTo(slash.x1,slash.y1);g.stroke();g.restore()}
  if(gest&&gest.type==="cut"){g.save();g.strokeStyle="rgba(255,255,255,.9)";g.lineWidth=3;g.beginPath();g.moveTo(gest.x0,gest.y0);g.lineTo(gest.x1,gest.y1);g.stroke();g.restore()}
  kg82DrawPops(g,pops,now);
  const on=phase==="pick"||phase==="play";/* the ONE live grade (crHud → mgLive): done vases + the open one's time part + vases to come */
  crHud(env,on?mgReach(sum+10/NR*mgPace(env,"hoa",now-P.t0,P.lim),r+1,NR):mgReach(sum,Math.min(NR,r+1),NR),r,NR,on?left:null)});
 const segD=(px,py,ax,ay,bx,by)=>{const dx=bx-ax,dy=by-ay,t=Math.max(0,Math.min(1,((px-ax)*dx+(py-ay)*dy)/(dx*dx+dy*dy||1)));return Math.hypot(px-(ax+dx*t),py-(ay+dy*t))};
 const aimOf=(x,y)=>Math.max(-rad(80),Math.min(rad(80),Math.atan2(x-MX,MY-y)));
 k91Pointer(C,{
  down:(x,y)=>{if(!P)return;
   if(phase==="pick"){const i=P.fl.findIndex((f,k)=>{const c=pickPos(k);return k91Dist(x,y,c.x,c.y+rB*.4)<Math.max(30,rB*2.2)});if(i<0)return;const f=P.fl[i];if(f.wilt)return;
    if(f.main){P.picked=true;P.cur=0;phase="play";bd.disabled=false;kg82Pluck(1,true);pops.length=0;kg82Pop(pops,pickPos(i).x,pickPos(i).y-rB*2,"✓",K91C.good())}
    else{f.wilt=true;P.wrong++;kg82Pluck(0,false);kg82Pop(pops,pickPos(i).x,pickPos(i).y-rB*2,"✗",K91C.red())}return}
   if(phase!=="play")return;const s=P.st[P.cur];
   /* turn a stem already in the vase: the nearest tip, or the stem just set that was never turned */
   const near=P.st.filter(q=>q.seated).map(q=>({q,d:k91Dist(x,y,tipOf(q,q.a).x,tipOf(q,q.a).y)})).sort((a,b)=>a.d-b.d)[0];
   if(y<MY+hv*.15&&near&&(near.d<Math.max(46,hv*.5)||(P.last&&!P.last.leaned))){const q=near.d<Math.max(46,hv*.5)?near.q:P.last;gest={type:"lean",s:q};q.a=aimOf(x,y);return}
   if(!s)return;
   if(!s.cut){if(Math.abs(y-TY)<hv*.8&&x>HX-12&&x<HX+LU+30)gest={type:"cut",x0:x,y0:y,x1:x,y1:y};return}
   if(segD(x,y,HX,TY,HX+s.L,TY)<Math.max(26,hv*.24))gest={type:"carry",f:s,x,y}},
  move:(x,y)=>{if(!gest)return;if(gest.type==="cut"){gest.x1=x;gest.y1=y}else if(gest.type==="carry"){gest.x=x;gest.y=y}else if(gest.type==="lean"){gest.s.a=aimOf(x,y)}},
  up:(x,y)=>{if(!gest)return;const G=gest;gest=null;const now=performance.now();
   if(G.type==="cut"){const s=P.st[P.cur];G.x1=x;G.y1=y;if((G.y0-TY)*(G.y1-TY)<0&&Math.abs(G.y1-G.y0)>10){const cx=G.x0+(G.x1-G.x0)*(TY-G.y0)/(G.y1-G.y0);
     if(cx>HX+hv*.15&&cx<HX+LU){s.cut=true;s.L=cx-HX;falls.push({x:cx,len:HX+LU-cx,a:now});slash={x0:G.x0,y0:G.y0,x1:G.x1,y1:G.y1,a:now};kg82Pluck(2,true)}}return}
   if(G.type==="carry"){const s=G.f;if(k91Dist(x,y,MX,MY)<B.seat*hv){s.seated=true;s.a=0;P.last=s;P.cur++;kg82Pluck(1,true)}return}
   if(G.type==="lean"){G.s.a=aimOf(x,y)+(sway?wob(now):0);G.s.leaned=true;if(G.s===P.last)P.last=P.st.slice().reverse().find(q=>q.seated&&!q.leaned)||null;kg82Pluck(1,true)}}});
 bd.onclick=()=>{if(phase==="play")judge()};
 /* the test oracle (KG82.peek): the next right move, in client coordinates */
 KG82.peek=()=>{if(!P||gest)return null;
  if(phase==="pick"){const i=P.fl.findIndex(f=>f.main);const c=pickPos(i),p=C.client(c.x,c.y+rB*.4);return{x:p.x,y:p.y}}
  if(phase!=="play")return null;const q=P.last;
  if(q&&!q.leaned){const a=rad(q.at),t0=tipOf(q,q.a),t1={x:MX+q.L*Math.sin(a),y:MY-q.L*Math.cos(a)},A=C.client(t0.x,t0.y),Bq=C.client(t1.x,t1.y);return{drag:[[A.x,A.y],[(A.x+Bq.x)/2,(A.y+Bq.y)/2],[Bq.x,Bq.y]]}}
  const s=P.st[P.cur];if(!s)return{sel:"#k91done"};
  if(!s.cut){const x=HX+s.Lt,a=C.client(x,TY-hv*.4),b=C.client(x,TY+hv*.4);return{drag:[[a.x,a.y],[b.x,b.y]]}}
  const a=C.client(HX+s.L*.5,TY),b=C.client(MX,MY+hv*.02);return{drag:[[a.x,a.y],[(a.x+b.x)/2,(a.y+b.y)/2-hv*.3],[b.x,b.y]]}};
 next();return()=>{done=true;stop()}}

/* wiring: the ONE table KG82_CRAFT (j91 re-wire block) names this engine + its rules text; the rules picture uses the "drag" demo until the kit's "cut" motion exists (KIT_REQUESTS.md, mg-craft-hoa; tạm → "cut" in KG82_CRAFT.hoa.demo) */
crReg("hoa","ikebana",kcHoa);
