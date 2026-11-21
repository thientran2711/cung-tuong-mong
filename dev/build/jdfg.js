/* ================= jdfg: the ON-FIGURE act games of the Dư đồ focus view (review/duodo-focus; owner OD 21/11 ~06:50Z «bất kỳ một cái action nào … đều sẽ là một cái mini game») =================
   Seven gesture engines played ON the person (act table: dev/handover/reports/duodo-focus.md §PLAN 2):
     swipe «Giáng tay / Hắt / Ngáng»  stroke through the moving target (face, or feet) — speed = strength
     tug   «Xô»                      tap fast to push the balance meter over the pond edge against her pull-back
     bow   «Hành lễ»                 tap as each ring closes on her (3 beats)
     drag  «Trao tay»                drag the token into her moving hands
     ear   «Ghé tai»                 hold at her ear while the onlooker does not look
     words «Lời hay»                 tap the fitting signs (check), never the wrong ones (cross)
     stare «Đấu mắt»                 hold to keep the pressure inside the band while she pushes back
   ONE shell dfGame(eng, o): o = {box (the play layer element: kitFocus F.play()), fig {x,y,w,h} (the figure box inside box, CSS px), rank (whose rank sets the stake:
   hers, the attacker's for a dodge), at ("feet" for a low swipe), onDone({raw 0..top, skipped}), hud(o)} → {skip(), destroy()}.
   NO word in play (owner OD 20/11 ~05:10Z): rings, gauges, kit signs (jnwb NWB check / cross) only; the score chip / clock come through o.hud (kit kitGameMark / kitGameClock).
   Numbers: BAL.df (jbaldf) — nothing typed here. Difficulty (law 5): jmgt mgTier("df_<eng>", {occ:"df", rank}) → ease 0..5 → every lerp pair of BAL.df.<eng>.
   Painted hand / props (ART REQUEST df-hand / df-props) draw on top when BAL.df.art is on; until then the stroke trail is the kit gold line. ====================== */
const DFG={cur:null,ENG:{}};window.DFG=DFG;const DFG_MS=1000;/* ms per second (unit) */
function dfgL(pr,f){return pr[0]+(pr[1]-pr[0])*f}
function dfgEase(eng,rank){let t=null;try{t=mgTier("df_"+eng,{occ:"df",rank,lv:0})}catch(e){}const top=(BAL.df.easeTop);return{t,f:cl(t?t.ease:0,0,top)/top}}
function dfgSeg(p,a,b){const dx=b[0]-a[0],dy=b[1]-a[1],L=dx*dx+dy*dy;let u=L?((p.x-a[0])*dx+(p.y-a[1])*dy)/L:0;u=cl(u,0,1);return Math.hypot(a[0]+u*dx-p.x,a[1]+u*dy-p.y)}
function dfgPath(name){try{const s=String(NWB.P[name]||"");return s.split(' d=\x22').slice(1).map(x=>new Path2D(x.split('\x22')[0]))}catch(e){return[]}}
function dfgCol(){const O=typeof KIT_ODDS_COL!=="undefined"?KIT_ODDS_COL:[];return{ink:kg82Col("--ink",kg82Col("--body-ink","#3b2a1c")),gold:kg82Col("--gold","#c99a1e"),red:O[0]||"#b8321f",green:O[O.length-1]||"#2d7a52",paper:kg82Col("--paper","#f6eedc")}}
function dfGame(eng,o){const E=DFG.ENG[eng];if(!E||!o||!o.box||!o.fig)return null;if(DFG.cur)DFG.cur.destroy();
 const B=BAL.df[eng],top=BAL.df.rawTop,box=o.box,cv=document.createElement("canvas");cv.className="kfoc-cv";cv.setAttribute("aria-hidden","true");
 Object.assign(cv.style,{position:"absolute",left:"0",top:"0",width:"100%",height:"100%",touchAction:"none"});box.appendChild(cv);
 const W=box.clientWidth,H=box.clientHeight,dpr=Math.max(1,window.devicePixelRatio||1);cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);const g=cv.getContext("2d");g.scale(dpr,dpr);
 const F=o.fig,fh=F.h,ez=dfgEase(eng,o.rank);
 const c={eng,o,B,top,W,H,g,fh,e:ez.f,tier:ez.t,col:dfgCol(),P:(gy,gx)=>({x:F.x+F.w/2+(gx||0)*fh,y:F.y+gy*fh}),t0:performance.now(),done:false,raf:0};
 c.now=()=>performance.now()-c.t0;
 c.end=raw=>{if(c.done)return;c.done=true;raw=cl(Math.round(raw),0,top);c.raw=raw;try{o.hud&&o.hud({score:raw,end:true})}catch(e){}stop();try{o.onDone&&o.onDone({raw,skipped:false})}catch(e){console.error(e)}};
 const pt=e=>{const r=cv.getBoundingClientRect();return[(e.clientX-r.left)*(W/Math.max(1,r.width)),(e.clientY-r.top)*(H/Math.max(1,r.height))]};
 const dn=e=>{if(c.done)return;e.preventDefault();try{cv.setPointerCapture(e.pointerId)}catch(x){}const [x,y]=pt(e);c.down&&c.down(x,y,c.now())},
  mv=e=>{if(c.done)return;const [x,y]=pt(e);c.move&&c.move(x,y,c.now())},up=e=>{if(c.done)return;const [x,y]=pt(e);c.up&&c.up(x,y,c.now())};
 cv.addEventListener("pointerdown",dn);cv.addEventListener("pointermove",mv);cv.addEventListener("pointerup",up);cv.addEventListener("pointercancel",up);
 E(c);let last=0;
 const frame=()=>{if(c.done)return;const t=c.now(),dt=last?t-last:0;last=t;if(c.tick)c.tick(dt,t);if(c.done)return;
  if(t>=(c.ms||B.ms)){c.timeout?c.timeout():c.end(0);return}
  g.clearRect(0,0,W,H);try{c.draw&&c.draw(g,t)}catch(e){}try{o.hud&&o.hud({time:Math.max(0,Math.ceil(((c.ms||B.ms)-t)/DFG_MS))})}catch(e){}c.raf=requestAnimationFrame(frame)};
 function stop(){cancelAnimationFrame(c.raf);cv.removeEventListener("pointerdown",dn);cv.removeEventListener("pointermove",mv);cv.removeEventListener("pointerup",up);cv.removeEventListener("pointercancel",up);cv.remove();if(DFG.cur===h)DFG.cur=null}
 const h={c,skip(){if(c.done)return;c.done=true;stop();try{o.onDone&&o.onDone({raw:null,skipped:true})}catch(e){console.error(e)}},destroy(){c.done=true;stop()},
  /* test / measure oracle (never drawn): where the target is now */peek(){return c.peek?c.peek(c.now()):null},canvas:cv};
 DFG.cur=h;c.raf=requestAnimationFrame(frame);return h}
window.dfGame=dfGame;
/* ---------- drawing helpers (kit colours, no words) ---------- */
function dfgRing(g,x,y,r,col,w){g.beginPath();g.arc(x,y,Math.max(1,r),0,Math.PI*2);g.strokeStyle=col;g.lineWidth=w||3;g.stroke()}
function dfgDot(g,x,y,r,col){g.beginPath();g.arc(x,y,Math.max(1,r),0,Math.PI*2);g.fillStyle=col;g.fill()}
function dfgTrail(g,pts,col){if(pts.length<2)return;g.beginPath();g.moveTo(pts[0][0],pts[0][1]);for(const p of pts)g.lineTo(p[0],p[1]);g.strokeStyle=col;g.lineWidth=5;g.lineCap="round";g.lineJoin="round";g.stroke()}
function dfgBar(g,x,y,w,h,v,col,band){g.fillStyle="rgba(0,0,0,.18)";g.fillRect(x,y,w,h);if(band){g.fillStyle="rgba(63,138,67,.35)";g.fillRect(x,y+h*(1-band[1]),w,h*(band[1]-band[0]))}g.fillStyle=col;const v2=cl(v,0,1);g.fillRect(x,y+h*(1-v2),w,h*v2);g.strokeStyle="rgba(0,0,0,.35)";g.lineWidth=1;g.strokeRect(x,y,w,h)}
function dfgSign(g,name,x,y,s,col){const P=dfgPath(name);g.save();g.translate(x-s/2,y-s/2);g.scale(s/24,s/24);g.strokeStyle=col;g.lineWidth=2.6;g.lineCap="round";g.lineJoin="round";for(const p of P)g.stroke(p);g.restore()}
/* ---------- swipe: stroke through the moving target; strength = stroke speed ---------- */
DFG.ENG.swipe=c=>{const B=c.B,G=BAL.df.geo,low=c.o.at==="feet",r=dfgL(B.zone,c.e)*c.fh/2,A=G.amp*c.fh,w=dfgL(B.spd,c.e)*c.fh/Math.max(1,A),fast=dfgL(B.fast,c.e),slow=dfgL(B.slow,c.e);let pts=[];
 /* dodge (an NPC's hand comes at her face, OD 06:55Z «Né»): the target flies in from the side and must be struck away before it lands; hit = top, landed = miss */
 const dm=dfgL(B.dodgeMs,c.e),side=(Math.random()*2|0)?1:-1;if(c.o.dodge)c.ms=dm;
 const zc=t=>{const b=c.P(low?G.feet:G.face,G.faceX);if(c.o.dodge){const f=cl(t/dm,0,1);return{x:b.x+side*(1-f)*c.W/2,y:b.y}}return{x:b.x+A*Math.sin(t/DFG_MS*w),y:b.y}};
 c.down=(x,y,t)=>{pts=[[x,y,t]]};c.move=(x,y,t)=>{if(pts.length)pts.push([x,y,t])};
 c.up=(x,y,t)=>{if(!pts.length)return;pts.push([x,y,t]);const z=zc(t);let hit=false,len=0;for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i];len+=Math.hypot(b[0]-a[0],b[1]-a[1]);if(dfgSeg(z,a,b)<=r)hit=true}
  const v=len/c.fh/(Math.max(1,pts[pts.length-1][2]-pts[0][2])/DFG_MS);c.stroke={hit,v};
  if(c.o.dodge){if(hit)return c.end(B.top);pts=[];return}
  if(!hit)return c.end(B.miss);if(v>=fast)return c.end(B.top);if(v>=slow)return c.end(B.mid[0]+(B.mid[1]-B.mid[0])*(v-slow)/Math.max(Number.EPSILON,fast-slow));return c.end(B.low)};
 c.draw=(g,t)=>{const z=zc(t);dfgRing(g,z.x,z.y,r,c.col.red,3);dfgTrail(g,pts,c.col.gold)};c.timeout=()=>c.end(B.miss);c.peek=t=>Object.assign(zc(t),{r,fast,slow})};
/* ---------- tug: tap to push the meter to the pond edge; she pulls back ---------- */
DFG.ENG.tug=c=>{const B=c.B,G=BAL.df.geo,push=dfgL(B.push,c.e),back=dfgL(B.back,c.e);let m=B.start,mx=m;
 c.down=()=>{m=Math.min(1,m+push);mx=Math.max(mx,m);if(m>=1)c.end(c.top)};c.tick=dt=>{m=Math.max(0,m-back*dt/DFG_MS)};
 c.draw=g=>{const p=c.P(G.chest,0),bw=c.fh*G.amp,bh=c.fh*G.amp*2.5;dfgBar(g,p.x+c.fh*G.earX*2,p.y,bw/3,bh,m,c.col.gold);dfgSign(g,"check",p.x+c.fh*G.earX*2+bw/6,p.y-bw/3,bw/2.5,c.col.green)};
 c.timeout=()=>c.end(c.top*mx);c.peek=()=>({m,push,back})};
/* ---------- bow: tap as each ring closes on her ---------- */
DFG.ENG.bow=c=>{const B=c.B,G=BAL.df.geo,win=dfgL(B.win,c.e),beats=[];for(let k=0;k<B.beats;k++)beats.push({t:B.lead+k*B.gap,s:null});c.ms=B.lead+(B.beats-1)*B.gap+win*B.zero;
 const score=err=>err<=win?1:Math.max(0,1-(err-win)/Math.max(1,(B.zero-1)*win));
 c.down=(x,y,t)=>{const b=beats.filter(b=>b.s==null).sort((a,b)=>Math.abs(a.t-t)-Math.abs(b.t-t))[0];if(!b||Math.abs(b.t-t)>B.gap/2)return;b.s=score(Math.abs(b.t-t));if(beats.every(b=>b.s!=null))fin()};
 const fin=()=>c.end(c.top*beats.reduce((s,b)=>s+(b.s||0),0)/beats.length);
 c.tick=(dt,t)=>{for(const b of beats)if(b.s==null&&t>b.t+win*B.zero)b.s=0;if(beats.every(b=>b.s!=null))fin()};
 c.draw=(g,t)=>{const p=c.P(G.chest,0);dfgRing(g,p.x,p.y,B.r1*c.fh,c.col.ink,2);for(const b of beats){if(b.s!=null)continue;const f=(b.t-t)/B.gap;if(f>1||f<-.2)continue;dfgRing(g,p.x,p.y,(B.r1+(B.r0-B.r1)*Math.max(0,f))*c.fh,f<=win/B.gap&&f>=-win/B.gap?c.col.green:c.col.gold,4)}};
 c.timeout=fin;c.peek=t=>{const b=beats.find(b=>b.s==null);return b?{at:b.t-t,win}:null}};
/* ---------- drag: put the token into her moving hands ---------- */
DFG.ENG.drag=c=>{const B=c.B,G=BAL.df.geo,r=dfgL(B.zone,c.e)*c.fh/2,A=G.amp*c.fh,w=dfgL(B.spd,c.e)*c.fh/Math.max(1,A);const home=c.P(G.feet,0);let tok={x:home.x,y:home.y},drag=false;
 const zc=t=>{const b=c.P(G.hands,0);return{x:b.x+A*Math.sin(t/DFG_MS*w),y:b.y}};
 c.down=(x,y)=>{if(Math.hypot(x-tok.x,y-tok.y)<=r*B.grab)drag=true};c.move=(x,y)=>{if(drag){tok={x,y}}};
 c.up=(x,y,t)=>{if(!drag)return;drag=false;const z=zc(t),d=Math.hypot(tok.x-z.x,tok.y-z.y);
  if(d<=r)return c.end(B.inMin+(c.top-B.inMin)*(1-d/r));if(d<=B.near*r)return c.end(B.nearRaw);tok={x:home.x,y:home.y}};
 c.draw=(g,t)=>{const z=zc(t);dfgRing(g,z.x,z.y,r,c.col.green,3);dfgDot(g,tok.x,tok.y,r*.55,c.col.gold);dfgRing(g,tok.x,tok.y,r*.55,c.col.ink,2)};c.timeout=()=>c.end(0);c.peek=t=>Object.assign(zc(t),{r,tok})};
/* ---------- ear: hold at her ear while the onlooker does not look ---------- */
DFG.ENG.ear=c=>{const B=c.B,G=BAL.df.geo,z=c.P(G.ear,G.earX),r=B.zone*c.fh,sp=dfgL(B.glance,c.e)*Math.PI*2,ph=Math.random()*Math.PI*2;let hold=false,acc=0,pen=0;
 const look=t=>.5+.5*Math.sin(t/DFG_MS*sp+ph)*Math.cos(t/DFG_MS*sp*BAL.df.ear.mix+ph);
 c.down=(x,y)=>{hold=Math.hypot(x-z.x,y-z.y)<=r*BAL.df.ear.grip};c.up=()=>{hold=false};c.move=(x,y)=>{if(hold&&Math.hypot(x-z.x,y-z.y)>r*BAL.df.ear.grip*BAL.df.ear.grip)hold=false};
 c.tick=(dt,t)=>{if(!hold)return;if(look(t)>=B.hot){pen++;hold=false;return}acc+=dt;if(acc>=B.need)c.end(c.top-pen*B.pen)};
 c.draw=(g,t)=>{const L=look(t);dfgRing(g,z.x,z.y,r,hold?c.col.green:c.col.gold,3);const p=c.P(G.face,0);dfgBar(g,p.x-c.fh*G.earX*3,p.y,c.fh*G.amp/3,c.fh*G.amp*2,L,L>=B.hot?c.col.red:c.col.ink,null);
  dfgBar(g,z.x+r*G.side,z.y-r,c.fh*G.amp*G.thin,r*2,acc/B.need,c.col.green,null)};
 c.timeout=()=>c.end(c.top*acc/B.need-pen*B.pen);c.peek=t=>({x:z.x,y:z.y,r,look:look(t),hot:B.hot,acc,pen})};
/* ---------- words: tap the fitting signs, never the wrong ones ---------- */
DFG.ENG.words=c=>{const B=c.B,G=BAL.df.geo,good=dfgL(B.good,c.e),sp=dfgL(B.spd,c.e)*c.fh,sz=B.size*c.fh;let score=0,hits=0;const L=[];
 const spawn=t=>{const p=c.P(G.chest,0);return{x:p.x+(Math.random()*2-1)*c.fh*G.amp*B.spread,y:p.y+c.fh*G.amp*(1+Math.random()),born:t,ok:Math.random()<good}};
 for(let k=0;k<B.n;k++){const s=spawn(0);s.y-=k*c.fh*G.amp*.6;L.push(s)}
 c.down=(x,y,t)=>{/* the NEAREST sign under the finger (two signs can overlap: the one she aims at counts, not the first in the list) */let i=-1,dm=sz*B.hit;L.forEach((s,k)=>{const d=Math.hypot(s.x-x,s.y-y);if(d<=dm){dm=d;i=k}});if(i<0)return;const s=L[i];if(s.ok){score+=2;hits++}else score-=2;L[i]=spawn(t);if(hits>=B.goal)c.end(score)};
 c.tick=(dt,t)=>{for(let i=0;i<L.length;i++){L[i].y-=sp*dt/DFG_MS;if(L[i].y<c.P(0,0).y)L[i]=spawn(t)}};
 c.draw=g=>{for(const s of L){dfgDot(g,s.x,s.y,sz/2,c.col.paper);dfgRing(g,s.x,s.y,sz/2,s.ok?c.col.green:c.col.red,2);dfgSign(g,s.ok?"check":"cross",s.x,s.y,sz*.6,s.ok?c.col.green:c.col.red)}};
 c.timeout=()=>c.end(score);c.peek=()=>({L:L.map(s=>({x:s.x,y:s.y,ok:s.ok})),score,hits})};
/* ---------- stare: hold to keep the pressure inside the band while she pushes back ---------- */
DFG.ENG.stare=c=>{const B=c.B,G=BAL.df.geo,band=dfgL(B.band,c.e),push=dfgL(B.push,c.e),lo=B.mid-band/2,hi=B.mid+band/2;let p=0,hold=false,inT=0;
 c.down=()=>{hold=true};c.up=()=>{hold=false};
 c.tick=(dt,t)=>{const s=dt/DFG_MS;p=cl(p+(hold?B.rise:-B.fall)*s+push*Math.sin(t/DFG_MS*Math.PI*BAL.df.stare.wob)*s,0,1);if(p>=lo&&p<=hi)inT+=dt};
 c.draw=g=>{const q=c.P(G.chest,0);dfgBar(g,q.x+c.fh*G.earX*2,q.y-c.fh*G.amp,c.fh*G.amp/3,c.fh*G.amp*3,p,p>=lo&&p<=hi?c.col.green:c.col.gold,[lo,hi])};
 c.timeout=()=>c.end(c.top*inT/B.ms);c.peek=()=>({p,lo,hi,inT})};
