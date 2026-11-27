/* KIT §104.1c (K-RING-ALL b, KK59): the place ring layer never eats a tap over a stage figure.
   RV-163J G4 q-softlock («DEAD BUTTON cover div.kring-band») + RV-172 nhv family. Real taps, Fold + iPad, on the kit-ring-boot life (Ngự hoa viên, 6 consorts, ring open).
   A: every stage figure (#tokens .tok[data-p]) under the open ring: a real tap at its centre must DO something (the ring focuses her / a view or frame opens) — never a dead tap.
   B: while the ring layer is not on screen (opening, opacity ~0) it takes no tap (elementFromPoint at a figure is never inside the ring layer).
   usage: node dev/test/kit-ring-band.js <url> [out.json] */
const {chromium}=require('playwright');const fs=require('fs');const boot=require('./kit-ring-boot.js');const [,,URL,OUT]=process.argv;
(async()=>{const b=await chromium.launch();let fail=0;const res={};
 for(const wh of (process.env.SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await boot(p,{url:URL});const R={noSlot:0,tapped:0,dead:0,coverBand:0,deadList:[],invisCover:0,samples:0};
  const toks=()=>p.evaluate(()=>[...document.querySelectorAll('#tokens .tok[data-p]')].filter(e=>{const r=e.getBoundingClientRect();return r.width>10&&r.bottom>0&&getComputedStyle(e).visibility!=='hidden'}).map(e=>{const r=e.getBoundingClientRect();return{i:e.dataset.p,x:Math.round(r.left+r.width/2),y:Math.round(r.top+r.height*.45)}}));
  const reset=async()=>{await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m&&!m.classList.contains('kring-held'))m.hidden=true;try{if(window.DF&&DF.F&&typeof dfClose==='function'&&!(kitRing.cur&&kitRing.cur.F===DF.F))dfClose()}catch(e){}});
   const c=await p.evaluate(()=>!!kitRing.cur);if(c){await p.evaluate(()=>kitRing.cur.sel>=0&&kitRing.back());await p.waitForTimeout(700)}else{await p.evaluate(()=>kitRing.open({mode:'person'}));await p.waitForFunction(()=>kitRing.cur&&document.querySelector('.kscn.kring.kring-live,.kscn.kring[style*="opacity: 1"]'),null,{timeout:20000}).catch(()=>{});await p.waitForTimeout(500)}};
  const T=(await toks()).slice(0,8);
  /* a figure point no ring slot covers (turn the ring until the point is clear) = the band case proper */
  const clear=async t=>{const N=await p.evaluate(()=>kitRing.cur?kitRing.cur.slots.length:0);for(let r=0;r<N;r++){await p.evaluate(r=>kitRing.turnTo(r),r);await p.waitForTimeout(150);
    if(await p.evaluate(([x,y])=>!kitRing.cur.slots.some(s=>{if(s.style.visibility==='hidden')return false;const b=s.getBoundingClientRect();return x>=b.left&&x<=b.right&&y>=b.top&&y<=b.bottom}),[t.x,t.y]))return true}return false};
  for(const t of T){await reset();t.noSlot=await clear(t);if(t.noSlot)R.noSlot=(R.noSlot||0)+1;const before=await p.evaluate(([x,y])=>{const e=document.elementFromPoint(x,y);return{hit:e?String(e.className||e.tagName).slice(0,40):'-',sel:kitRing.cur?kitRing.cur.sel:null,df:!!(window.DF&&DF.F),modal:!document.getElementById('modal').hidden,rot:kitRing.cur?kitRing.cur.rot:null}},[t.x,t.y]);
   if(/kring-band/.test(before.hit))R.coverBand++;await p.touchscreen.tap(t.x,t.y);await p.waitForTimeout(1800);R.tapped++;
   const after=await p.evaluate(()=>({sel:kitRing.cur?kitRing.cur.sel:null,df:!!(window.DF&&DF.F),modal:!document.getElementById('modal').hidden,pop:!!document.querySelector('.kfoc:not([hidden]),#popw .pcpop'),rot:kitRing.cur?kitRing.cur.rot:null,cur:!!kitRing.cur}));
   const alive=(after.sel!=null&&after.sel>=0)||(after.df&&!before.df)||(after.modal&&!before.modal)||after.pop||after.rot!==before.rot;
   if(!alive){R.dead++;R.deadList.push({i:t.i,hit:before.hit,noSlot:t.noSlot})}}
  /* B: the opening ring layer (opacity ~0) */
  await p.evaluate(()=>{kitRing.close(true);Q.length=0;document.getElementById('modal').hidden=true});await p.waitForTimeout(500);const T2=(await toks()).slice(0,4);
  await p.evaluate(T2=>{window.__invis={n:0,c:0};const t0=performance.now();const tick=()=>{const L=document.querySelector('.kscn.kring');if(L){const op=+getComputedStyle(L).opacity;if(op<.05){for(const t of T2){window.__invis.n++;const e=document.elementFromPoint(t.x,t.y);if(e&&L.contains(e))window.__invis.c++}}}if(performance.now()-t0<6000)requestAnimationFrame(tick)};requestAnimationFrame(tick);kitRing.open({mode:'person'})},T2);
  await p.waitForTimeout(6500);const iv=await p.evaluate(()=>window.__invis);R.samples=iv.n;R.invisCover=iv.c;
  R.errs=errs.length;res[wh]=R;console.log(wh,JSON.stringify(R));if(R.dead||R.invisCover||!R.tapped)fail++;await ctx.close()}
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(res,null,1));console.log(fail?'FAIL '+fail:'PASS');await b.close();process.exit(fail?1:0)})();
