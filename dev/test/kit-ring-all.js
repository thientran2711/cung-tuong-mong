/* K-RING-ALL (law 6c REAL OBJECTS, KK59): every item ring shows EVERY item (the old kitRingItem cut at 24 is gone). Fold + iPad.
   A: kitRingItem.open with N = 10 / 24 / 40 / 120 items → tiles on the ring = N; spin to the last one → it is the bright front item; open time.
   B: the Tư trang sample ring (kit page §104 wiring, the bag) with 40 real bag items → 40 tiles.
   usage: node dev/test/kit-ring-all.js <file-or-url> [shotdir] */
const {chromium}=require('playwright');const path=require('path');const [,,G,OUT]=process.argv;const URL=/^(https?|file):/.test(G)?G:'file://'+path.resolve(G);
const FRESH=()=>{if(typeof kitRoulette==='function'){kitRoulette=function(o){try{o&&o.done&&o.done()}catch(e){}}}try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;try{REC.tour='done';REC.asked=1;saveRec()}catch(e){}
 for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}try{S.tutTour=1}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn').forEach(e=>e.remove());render()};
(async()=>{const b=await chromium.launch();let fail=0;
 for(const [W,H] of [[755,1000],[1180,820]]){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:OUT?2:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.route(/\.(mp3|ogg|m4a|mp4|webm|wav)(\?|$)/,r=>r.abort());await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForFunction(()=>typeof start==='function'&&window.kitRingItem,null,{timeout:240000});await p.waitForTimeout(1500);
  await p.evaluate(FRESH);await p.waitForTimeout(2500);await p.evaluate(()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true});
  const row=[];for(const N of [10,24,40,120]){const r=await p.evaluate(async N=>{const K=Object.keys(IT).filter(k=>IT[k]&&IT[k].n);const L=[];for(let i=0;i<N;i++){const k=K[i%K.length];L.push({id:i,src:typeof kitItemSrc==='function'?kitItemSrc(k):'',name:IT[k].n+' '+(i+1),grade:i%5})}
    const t0=performance.now();const R=kitRingItem.open({key:'scan'+N,title:'Vòng bảo vật',sub:N+' món',items:L,acts:it=>[{n:'Xem thử',main:1,fn:()=>null}]});await new Promise(r=>setTimeout(r,900));const ms=Math.round(performance.now()-t0);
    const tiles=document.querySelectorAll('.kri-t').length;let last=-1;try{await R.turnTo(N-1);await new Promise(r=>setTimeout(r,400));last=R.front()}catch(e){last='err '+e}return{N,items:R.items.length,tiles,last,ms}},N);
   row.push(r);if(r.items!==N||r.tiles!==N||r.last!==N-1)fail++;
   if(OUT&&N===40)await p.screenshot({path:`${OUT}/ring-all-${W}x${H}-40-at40.png`});await p.evaluate(()=>{try{kitRingItem.cur&&kitRingItem.cur.close()}catch(e){}});await p.waitForTimeout(500)}
  /* B: the bag (Tư trang sample) with 40 real items */
  const bag=await p.evaluate(async()=>{const K=Object.keys(IT).filter(k=>IT[k]&&IT[k].n);S.inv=S.inv||[];while(S.inv.filter(e=>e&&!e.h&&IT[e.k]).length<40)S.inv.push({k:K[S.inv.length%K.length]});
    try{kitRingItem.cur&&kitRingItem.cur.close()}catch(e){}await new Promise(r=>setTimeout(r,600));let pg=document.getElementById('kitpage');if(!pg){pg=document.createElement('div');pg.id='kitpage';document.body.appendChild(pg)}const btn=document.createElement('button');btn.setAttribute('data-kriring','1');(pg||document.body).appendChild(btn);if(pg)pg.hidden=false;btn.click();await new Promise(r=>setTimeout(r,1200));
    const n=S.inv.filter(e=>e&&!e.h&&IT[e.k]).length;const R=kitRingItem.cur&&kitRingItem.cur.o&&/§104/.test(kitRingItem.cur.o.sub||'')?kitRingItem.cur:null;const out={sample:!!R,bag:n,items:R?R.items.length:0,tiles:document.querySelectorAll('.kri-t').length};try{R&&R.close()}catch(e){}btn.remove();return out});
  if(!bag.sample||bag.items!==bag.bag)fail++;console.log(`${W}x${H}`,JSON.stringify(row),'bag',JSON.stringify(bag),'errs',errs.length);if(errs.length)fail++;await ctx.close()}
 console.log(fail?'FAIL '+fail:'PASS');await b.close();process.exit(fail?1:0)})();
