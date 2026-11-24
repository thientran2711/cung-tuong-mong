/* cal-p2b (owner OD 20/11 ~07:35Z: fix the broken mini-games only, then she re-tests) — node dev/test/cal-p2b.js [dev/index.html] [WxH] [shotdir]
   A. Điều hương (huong): live hint ★, verdict ★ and grade read ONE round score from BAL.mgTier.blend (no typed .32 / .22 / .12 / .05 left);
      kG.huong 1 → the grade equals what the board shows (round of 10·mean round score).
   B. Múa (mua): a cushion shown twice in a row goes dark for BAL.mgTier.lev.mua.dark ms between the two steps (measured on the real board,
      frame by frame, with every step forced onto the same cushion), and each shown step pops from its own start.
   C. Nấu ăn (banh): a gust never pushes the fire past BAL.mgTier.lev.banh.reach of what the hand can answer (source + a copy of the fire physics
      fed from the real BAL); an ideal hand holds the fire at every ease, and harder boards stay harder (law 5).
   E. full-marks window (ROOT-75 07:36Z, owner «đạt hết mà toàn 9/10»): in the 9 mgPace kinds a careful normal-speed round keeps the whole score —
      skilled-bot time share p75 at ease 2 and p50 at ease 1 (reports/mg-score-same.md) → mgPace = 1; law 5: fast at ease 0 ≤ at ease 5.
   D. shots of the three boards in play (look at them; written OUTSIDE the repo) + no page errors. */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const [VW,VH]=(process.argv[3]||'755x1000').split('x').map(Number);const SHOT=process.argv[4]||'';
let bad=0;const ok=(c,m,x)=>{if(!c)bad++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const src=['j82.js','j91.js'].map(f=>fs.readFileSync(path.join(__dirname,'../build/'+f),'utf8')).join('\n');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH}});await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.ap=9;try{render()}catch(e){}});
 /* the mẫu thân chest at the start of a life: open it and take it, so the boards are seen clean */
 for(let i=0;i<4;i++){await p.evaluate(()=>{const t=document.querySelector('.kmtap');if(t)t.click();const c=document.querySelector('[data-km-close]');if(c)c.click()});await p.waitForTimeout(400)}
 const B=await p.evaluate(()=>({kG:BAL.mgTier.kG.huong,bl:BAL.mgTier.blend,mua:BAL.mgTier.lev.mua,banh:BAL.mgTier.lev.banh,g:[0,2.5,5,6.1,8.5,10].map(r=>[r,mgGrade(r,"huong")])}));
 // A
 ok(B.kG===1&&B.g.every(([r,g])=>g===Math.round(r)),'A huong grade = shown score (kG 1)',B.g);
 ok(B.bl&&B.bl.w>0&&B.bl.star.length===3&&B.bl.star[0]<B.bl.star[1]&&B.bl.star[1]<B.bl.star[2],'A BAL.mgTier.blend {w, star} rising',B.bl);
 ok(!/\.32\*mgTol/.test(src)&&!/d>\.22\?/.test(src)&&!/d<=\.05\?/.test(src)&&/BAL\.mgTier\.blend\.w\*mgTol\(env\)/.test(src),'A k91Blend: no typed width / mix-gap thresholds; ONE round score rs() from BAL');
 ok(/const s=rs\(d\),T=BAL\.mgTier\.blend\.star/.test(src)&&/const ls=rs\(dist\(P\.v,P\.tv\)\),T=BAL\.mgTier\.blend\.star/.test(src),'A live hint and verdict read the same rs() + BAL star');
 // B — real board, same cushion forced, frame-by-frame lit trace
 const M=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const r0=Math.random;Math.random=()=>.1;/* every step = cushion 0 */
  const trace=[];const sp0=kg82Spr;let fr=null;window.kg82Spr=function(g,n,x,y,w,h,o){if(n==="mua-mat"&&fr)fr.push(!!(o&&o.glow));return sp0.apply(this,arguments)};
  try{kg82Close()}catch(e){}Q.length=0;playArt({art:'mua',title:'t',onDone(){}});await sleep(900);const go=kg82Box()&&kg82Box().querySelector('.kgr-go');if(go)go.click();
  /* a virtual clock (16.7 ms frames) so the trace does not depend on the headless frame rate */await sleep(60);const pn=performance.now.bind(performance),raf0=window.requestAnimationFrame;let vt=pn(),q=[];
  performance.now=()=>vt;window.requestAnimationFrame=cb=>{q.push(cb);return 1};await sleep(40);
  for(let f=0;f<260;f++){vt+=1000/60;fr=[];const L=q;q=[];for(const cb of L)cb(vt);if(fr.length)trace.push([vt,fr[0]])}
  performance.now=pn;window.requestAnimationFrame=raf0;for(const cb of q)raf0(cb);
  window.kg82Spr=sp0;Math.random=r0;const lev=BAL.mgTier.lev.mua;const dark=Math.min(...lev.dark);let gaps=[],lits=[],cur=null,start=0;
  for(const [t,on] of trace){if(cur===null){cur=on;start=t;continue}if(on!==cur){(cur?lits:gaps).push(t-start);cur=on;start=t}}
  try{kg82Close()}catch(e){}return{gaps,lits,dark}});
 const midGaps=M.gaps.slice(1,M.lits.length);/* the first dark run = before the show starts; after the last lit step = her turn */
 ok(M.lits.length>=3,'B Múa shows the repeated cushion as separate lit steps',{lit:M.lits.length,litMs:M.lits.map(Math.round)});
 ok(midGaps.length>=2&&midGaps.every(g=>g>=M.dark-40),'B dark gap between two same-cushion steps ≥ BAL lev.mua.dark (one frame slack)',{dark:M.dark,gaps:midGaps.map(Math.round)});
 ok(/kg82FxPop\(i===showI\?showAt:/.test(src)&&/SP-DARK/.test(src)&&!/SP\*\.72/.test(src),'B each shown step pops from its own start; no typed .72 lit share');
 ok(M.dark>=200&&B.mua.dark&&B.mua.dark.length===2,'B BAL.mgTier.lev.mua.dark',B.mua.dark);
 // C — source + copy of the fire physics on the real BAL
ok(/gu=gu>0\?Math\.min\(gu,REACH\*COOL\):Math\.max\(gu,-REACH\*FAN\)/.test(src)&&/REACH=mgLev\(env,"banh","reach"\),FAN=\.34,COOL=\.1;/.test(src)&&/rr\+=\(\(fan\.size\?FAN:-COOL\)-rr\)/.test(src),'C k91Cook caps every gust by BAL lev.banh.reach');
 const T=await p.evaluate(()=>{const lv=(L,e)=>L[0]+(L[1]-L[0])*Math.min(5,Math.max(0,e))/5,Lb=BAL.mgTier.lev.banh;let seed=7;const rnd=()=>(seed=(seed*16807)%2147483647)/2147483647;
  const one=(e,cap)=>{const env={lv:e};const LAG=Math.max(.02,lv(Lb.lag,e)),GUA=lv(Lb.gust,e),GAP=lv(Lb.gap,e),RE=lv(Lb.reach,e);
   const Z=[[.14,.36],[.42,.62],[.68,.88]].map(([a,b])=>{const c=(a+b)/2,h=((b-a)/2+.015*e)*mgTol(env);return[c-h,c+h]});
   let heat=.3,rr=-.1,gu=0,guEnd=0,guNext=GAP*(.6+.8*rnd()),ts=0,dt=1/60,inz=0,tot=0,over=0;
   for(const zi of [0,1,2,1,0,2]){const z=Z[zi],c=(z[0]+z[1])/2;let t=0;while(t<5.2){ts+=dt;t+=dt;
    if(GUA>.01&&ts>=guNext){gu=(rnd()<.5?-1:1)*GUA*(.6+.4*rnd());if(cap)gu=gu>0?Math.min(gu,RE*.1):Math.max(gu,-RE*.34);guEnd=ts+.7;guNext=ts+GAP*(.6+.8*rnd())}if(ts>=guEnd)gu=0;
    if(gu>.1||gu<-.34)over++;const fan=heat+(rr+gu)*LAG<c;rr+=((fan?.34:-.1)-rr)*Math.min(1,dt/LAG);heat=Math.max(0,Math.min(1,heat+(rr+gu)*dt));if(t>2){tot+=dt;if(heat>=z[0]&&heat<=z[1])inz+=dt}}}
   return[inz/tot,over]};
  const R={};for(const e of [0,1,2,3,5])for(const cap of [0,1]){let a=0,o=0;for(let i=0;i<60;i++){const[x,y]=one(e,cap);a+=x;o+=y}R[(cap?'after':'before')+e]=[+(a/60).toFixed(2),o]}return R});
 ok([0,1,2,3,5].every(e=>T['after'+e][1]===0),'C no gust beyond the hand\'s reach at any ease',T);
 ok(T.after0[0]>=.4&&T.before0[0]<.2,'C ideal hand at the hardest board: before cannot hold the fire, after can (still hard)',[T.before0[0],T.after0[0]]);
 ok(T.after0[0]<=T.after1[0]&&T.after1[0]<=T.after2[0]&&T.after2[0]<=T.after5[0]+.001,'C law 5: harder board = less time in the zone',[0,1,2,5].map(e=>T['after'+e][0]));
 // E — full-marks window of the mgPace kinds
 const E=await p.evaluate(()=>{const U={co:[.39,.47],tho:[.20,.21],doi:[.38,.41],doden:[.28,.37],kim:[.21,.26],le:[.32,.33],tc:[.33,.34],xa:[.21,.26],thq:[.49,.56]},R={};
  for(const k in U){const L=BAL.mgTier.lev[k];R[k]={p50e1:mgPace({lv:1},k,U[k][0]*1000,1000),p75e2:mgPace({lv:2},k,U[k][1]*1000,1000),law5:L.fast[0]<=L.fast[1],fast:L.fast}}return R});
 ok(Object.values(E).every(r=>r.p50e1===1&&r.p75e2===1),'E a careful normal-speed round keeps full marks in all 9 mgPace kinds',E);
 ok(Object.values(E).every(r=>r.law5),'E law 5: the window shrinks as the board hardens');
 // D — shots in play
 if(SHOT){fs.mkdirSync(SHOT,{recursive:true});for(const [k,ms] of [['huong',2500],['mua',1300],['banh',4500]]){
  await p.evaluate(async(k)=>{const sleep=t=>new Promise(r=>setTimeout(r,t));try{kg82Close()}catch(e){}Q.length=0;playArt({art:k,title:'t',onDone(){}});await sleep(900);const go=kg82Box()&&kg82Box().querySelector('.kgr-go');if(go)go.click()},k);
  await p.waitForTimeout(ms);await p.screenshot({path:path.join(SHOT,`${k}-${VW}x${VH}.png`)});await p.evaluate(()=>{try{kg82Close()}catch(e){}})}}
 ok(errs.length===0,'D no page errors',errs.slice(0,5));
 await b.close();console.log(bad?`cal-p2b FAIL ${bad}`:'cal-p2b PASS');process.exit(bad?1:0)})();
