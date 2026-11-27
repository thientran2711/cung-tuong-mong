/* kit-dlg-avatar (LAW 11 fix-the-whole-group; owner 27/11 «Đại kết cục»: the avatar on the picture strip sat over the title line, and the toast
   «Hoàng hậu → ta: thiện cảm +4» sat over an open dialog's option card). KIT §31.16 (.kevav) + §28.8f (seal lean own box) + §57.1b (labels / toasts vs open dialog).
   usage: node dev/test/kit-dlg-avatar.js file://…/index.html [outdir]   → tables + PASS / FAIL (exit 0 / 1); Fold 755x1000 + iPad 1180x820.
   A. WHOLE-GAME SWEEP of every PEND dialog builder: every avatar on an event picture (.k3ev > .kevav) lies wholly INSIDE its picture (never over text).
   B. STRIP HEIGHTS: the grand-ending dialog (Đại kết cục, a second person on the picture) with its picture forced to 40…220px: the avatar stays inside.
   C. SEAL LEAN: the big seal clone (.kemo-big) of a seal inside an open dialog stays inside its own box (the picture / its avatar frame).
   D. LABELS + TOASTS over an open dialog: a cell-less stat label (Hoàng hậu → ta), a top-bar cell label (Đức), the line toast (kitLineToast), and card→cell
      FLIGHTS fired from the dialog's own card (Danh, Sủng): none covers the dialog (KIT §57.1b + §57.1c).
   E. PAINTED BURSTS over an open dialog (KIT §57.1c, MAIN 177 ruling): every glow / spark sprite (not falling petals) drawn while the dialog is open —
      the ending's own entrance burst + bursts aimed at the dialog title — keeps its core off the dialog box (or inside a dialog picture); falling petals / screen-wide kinds too (MAIN 178 ruling). */
const {chromium}=require('playwright');const fs=require('fs');
const URL=process.argv[2];const OUT=process.argv[3]||'';if(OUT)fs.mkdirSync(OUT,{recursive:true});
const fails=[];const note=(ok,m)=>{if(!ok)fails.push(m)};
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(0);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof geS==='function',null,{timeout:0});await p.waitForTimeout(2500);
  /* the grand-ending life (ge-shots set-up) */
  await p.evaluate(async()=>{localStorage.removeItem('ctm-ge');const road='tt_co',k='tt';quiet=true;const others=Object.keys(ARC67).filter(id=>ARC67[id].o===k&&id!==road);
   localStorage.setItem('ctm-arcs',JSON.stringify({[k]:others}));localStorage.setItem('ctm-tm96','1');window.__forceOrigin=k;document.getElementById('title').hidden=true;const kl=document.getElementById('kload');if(kl)kl.remove();window.__nlInner=1;start();window.__nlInner=0;quiet=false;try{kmReset()}catch(e){}
   await new Promise(r=>{let n=0;const t=()=>{if((typeof S!=='undefined'&&S&&S.origin&&S.st&&S.st.f14)||++n>150)r();else setTimeout(t,100)};t()});Q.length=0;
   const s=geS();s.pull=[2,9,0,1];s.st=['o','o','x','o'];s.cx[2]=8;S.duc=62;S.sung=64;S.st.ch.all=1;S.st.f14.ends[11]='win';render();await new Promise(r=>setTimeout(r,2500));try{kmReset()}catch(e){}Q.length=0;
   window.__inside=(a,c,t)=>a.left>=c.left-t&&a.top>=c.top-t&&a.right<=c.right+t&&a.bottom<=c.bottom+t});
  const settle=async()=>{await p.waitForTimeout(600);await p.waitForFunction(()=>!(window.KLIFE&&KLIFE.on),null,{timeout:90000}).catch(()=>{});await p.waitForTimeout(900);await p.evaluate(()=>{try{kmReset()}catch(e){}});await p.waitForTimeout(500)};
  /* ---- A. whole-game sweep ---- */
  await p.evaluate(()=>{window.__AV=[];const k0=window.kitFrameLive3;window.kitFrameLive3=kitFrameLive3=function(m){const r=k0.apply(this,arguments);try{const dlg=document.querySelector('#modal .dlg');if(!dlg)return r;
    dlg.querySelectorAll('.k3ev>.kevav').forEach(av=>{const ev=av.parentElement,a=av.getBoundingClientRect(),c=ev.getBoundingClientRect();const kids=[...av.children].map(x=>x.getBoundingClientRect());
     const ok=kids.every(k=>__inside(k,c,1)||(k.top>=c.top-1&&__inside({left:k.left,right:k.right,top:k.top,bottom:Math.min(k.bottom,a.bottom)},c,1)));
     window.__AV.push({id:String(m&&(m.pid||m.t)||'').replace(/<[^>]+>/g,'').slice(0,34),evH:Math.round(c.height),avH:Math.round(a.height),avW:Math.round(a.width),ok})})}catch(e){window.__AV.push({id:'ERR '+e,ok:false})}return r}});
  const ids=await p.evaluate(()=>Object.keys(PEND));
  for(let i=0;i<ids.length;i+=40){const part=ids.slice(i,i+40);
   await p.evaluate(async(part)=>{const R0=typeof liveRivals==='function'?liveRivals(true):[];const v=R0[0];const tries=[{v:v&&v.id},{}];const close=()=>{Q.length=0;const M=document.getElementById('modal');M.hidden=true};
    for(const id of part){if(/^ge/.test(id))continue;try{for(const pp of tries){let d=null;try{d=PEND[id](Object.assign({},pp))}catch(e){d=null}if(!d||!(d.o||d.t))continue;close();try{pushDil(mkP(id,pp),id);showModal()}catch(e){continue}close();break}}catch(e){close()}}},part)}
  const A=await p.evaluate(()=>window.__AV);const bad=A.filter(r=>!r.ok);
  console.log(`\nA. SWEEP ${tag}: ${ids.length} PEND builders · ${A.length} picture avatars (.kevav) laid out · ${bad.length} over the picture edge`);
  bad.slice(0,12).forEach(r=>console.log(`  ✗ ${r.id} strip ${r.evH}px avatar ${r.avW}x${r.avH}`));note(!bad.length,`${tag} A: ${bad.length} picture avatars leave their picture`);
  /* ---- B. strip heights on the grand ending ---- */
  /* the sweep opens chest pickers whose «Vòng bảo vật» ring stays up after the dialog is dropped: close it (a test leftover, not a game state) */
  await p.evaluate(()=>{for(let i=0;i<20&&window.kitRingItem&&kitRingItem.cur;i++){try{kitRingItem.close()}catch(e){break}}document.querySelectorAll('#modal.kri-hide').forEach(m=>m.classList.remove('kri-hide'));Q.length=0;geAsk();showModal()});await settle();await p.evaluate(()=>chooseM(0));await settle();
  await p.evaluate(()=>{window.__fx=[];window.__fxN=0;const sp0=window.kfkSp;if(sp0&&!sp0.__w){window.kfkSp=kfkSp=function(k){const s=sp0.apply(this,arguments);if(s){s.__k=k;window.__fxN++}return s};kfkSp.__w=1}
   /* sampled once per painted frame (after the effect layer's own frame tick), not on a timer that can fall between a dialog opening and the next frame */
   window.__fxOn=1;window.__fxT=0;const fxS=()=>{const d=document.querySelector('#modal:not([hidden]) .dlg');if(!d||!window.KFX||!KFX.parts)return;const dr=d.getBoundingClientRect();const pics=[...d.querySelectorAll('.k3ev,.k3mpic,.kdlgart,.ksart,.kszfs,.md,.pcp')].map(e=>e.getBoundingClientRect());
    for(const s of KFX.parts){if(!s||!s.visible||!s.__k||s.alpha<.15||(s.v&&s.v.clip))continue;/* petals / weather too (MAIN 178 ruling); stage weather (v.clip) has its own keep-out */const big=/glowburst|lotuslight|orb/.test(s.__k),hw=Math.abs(s.width)*(big?.25:.5),hh=Math.abs(s.height)*(big?.25:.5);/* whole sprite (glow lights: their core) */const c={left:s.x-hw,right:s.x+hw,top:s.y-hh,bottom:s.y+hh};
     const hit=c.left<dr.right&&c.right>dr.left&&c.top<dr.bottom&&c.bottom>dr.top&&!pics.some(q=>__inside(c,q,1));window.__fx.push({k:s.__k,hit,r:[c.left,c.top,c.right-c.left,c.bottom-c.top].map(Math.round)})}};const fxL=()=>{if(!window.__fxOn)return;try{fxS()}catch(e){}requestAnimationFrame(fxL)};requestAnimationFrame(fxL)});
  await p.evaluate(()=>{window.__lab=[];window.__labT=setInterval(()=>{const d=document.querySelector('#modal:not([hidden]) .dlg');if(!d)return;const dr=d.getBoundingClientRect();
    document.querySelectorAll('.ksfl,#ktbtoast,#kupdline').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||getComputedStyle(e).visibility==='hidden'||+getComputedStyle(e).opacity<.05)return;const hit=r.left<dr.right&&r.right>dr.left&&r.top<dr.bottom&&r.bottom>dr.top;window.__lab.push({t:e.textContent.slice(0,40),hit,r:[r.x,r.y,r.width,r.height].map(Math.round)})});
    document.querySelectorAll('.kemo-big').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width)return;window.__lab.push({t:'(seal lean)',seal:1,r:[r.x,r.y,r.width,r.height].map(Math.round)})})},40)});
  await p.evaluate(()=>{const r0=window.roll;window.roll=()=>true;chooseM(0);window.roll=r0});await settle();
  if(OUT)await p.screenshot({path:`${OUT}/${tag}-dai-ket-cuc.png`});
  const B=await p.evaluate(async()=>{const ev=document.querySelector('#modal .k3ev');if(!ev)return null;const out=[];const h0=ev.style.cssText;
   for(const h of [40,56,80,120,160,220]){ev.style.setProperty('height',h+'px','important');ev.style.setProperty('min-height',h+'px','important');ev.style.setProperty('flex','0 0 auto','important');await new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r)));
    const av=ev.querySelector('.kevav');if(!av){out.push({h,none:1});continue}const c=ev.getBoundingClientRect(),k=av.getBoundingClientRect();out.push({h,av:[Math.round(k.width),Math.round(k.height)],ok:__inside(k,c,1)})}
   ev.style.cssText=h0;return out});
  console.log(`\nB. STRIP HEIGHTS ${tag} (Đại kết cục): `+(B?B.map(r=>r.none?`${r.h}px: no avatar`:`${r.h}px → avatar ${r.av[0]}x${r.av[1]} ${r.ok?'inside ✓':'OUT ✗'}`).join(' · '):'no picture'));
  note(B&&B.some(r=>!r.none),`${tag} B: the grand-ending picture has no avatar`);(B||[]).forEach(r=>note(r.none||r.ok,`${tag} B: strip ${r.h}px avatar leaves the picture`));
  /* ---- D. labels / toasts fired while the dialog is open ---- */
  /* E (aimed bursts) + D (flights from the dialog's own card): fired at the title / the option card of the open dialog */
  await p.evaluate(()=>{const d=document.querySelector('#modal:not([hidden]) .dlg');const t=d&&(d.querySelector('.k3t,.k3ttl,h3,b')||d);const o=d&&d.querySelector('.opt,.pcard,.k3opt')||t;
   try{kitFxBurst('glowburst',t,1)}catch(e){}try{kitFxBurst('spark',t,12)}catch(e){}try{const r=o.getBoundingClientRect();kitStatFx([{k:'danh',dv:2,from:r},{k:'sung',dv:1,from:r}],{src:'test0'})}catch(e){}});
  await p.waitForTimeout(3000);
  await p.evaluate(()=>{try{kitStatFx([{k:'hh',dv:4}],{src:'test1'})}catch(e){}try{kitStatFx([{k:'duc',dv:1}],{src:'test2'})}catch(e){}try{if(typeof kitLineToast==='function')kitLineToast('Hoàng hậu → ta: thiện cảm +4')}catch(e){}});
  await p.waitForTimeout(4000);
  /* ---- C + D results ---- */
  const L=await p.evaluate(()=>{clearInterval(window.__labT);window.__fxOn=0;const d=document.querySelector('#modal:not([hidden]) .dlg');const ev=d&&d.querySelector('.k3ev');const c=ev&&ev.getBoundingClientRect();
   return {lab:window.__lab,fx:window.__fx,fxN:window.__fxN,ev:c&&{left:c.left,top:c.top,right:c.right,bottom:c.bottom}}});
  {const fh=L.fx.filter(x=>x.hit);const kinds=[...new Set(L.fx.map(x=>x.k))];
   console.log(`E. BURSTS ${tag}: ${L.fxN} sprites made · ${L.fx.length} sprite frames while the dialog is open (${kinds.join(', ')||'none'}) · ${fh.length} cores over the dialog`+(fh[0]?` (e.g. ${fh[0].k} ${fh[0].r})`:''));
   note(!fh.length,`${tag} E: ${fh.length} burst sprite frames over the open dialog (${[...new Set(fh.map(x=>x.k))].join(' | ')})`);note(L.fxN>0,`${tag} E: no painted burst drawn at all (Pixi off?) — check not run`)}
  const labs=L.lab.filter(x=>!x.seal),hits=labs.filter(x=>x.hit),seals=L.lab.filter(x=>x.seal);
  const sealOut=seals.filter(s=>!(L.ev&&s.r[0]>=L.ev.left-1&&s.r[1]>=L.ev.top-1&&s.r[0]+s.r[2]<=L.ev.right+1&&s.r[1]+s.r[3]<=L.ev.bottom+1));
  console.log(`\nC. SEAL LEAN ${tag}: ${seals.length} frames of the big seal clone · ${sealOut.length} outside its picture`+(sealOut[0]?` (e.g. ${sealOut[0].r})`:''));
  note(!sealOut.length,`${tag} C: the seal lean leaves its picture ${sealOut.length} frames`);
  const names=[...new Set(labs.map(x=>x.t))];
  console.log(`D. LABELS/TOASTS ${tag}: seen ${names.join(' | ')||'(none while open)'} · ${hits.length} frames over the open dialog`+(hits[0]?` (e.g. «${hits[0].t}» ${hits[0].r})`:''));
  note(!hits.length,`${tag} D: ${hits.length} label/toast frames over the open dialog (${[...new Set(hits.map(x=>x.t))].join(' | ')})`);
  /* the waiting label shows once the dialog closes */
  await p.evaluate(()=>{window.__seen2=[];window.__t2=setInterval(()=>document.querySelectorAll('.ksfl').forEach(e=>window.__seen2.push(e.textContent)),60);chooseM(0);setTimeout(()=>{Q.length=0;const M=document.getElementById('modal');if(M)M.hidden=true},300)});
  await p.waitForTimeout(3500);const s2=await p.evaluate(()=>{clearInterval(window.__t2);return [...new Set(window.__seen2)]});
  console.log(`D2. after close ${tag}: labels shown ${s2.join(' | ')||'(none)'}`);
  note(!errs.length,`${tag}: page errors ${errs.slice(0,3).join(' / ')}`);await ctx.close()}
 await b.close();console.log(fails.length?`\nkit-dlg-avatar: FAIL ${fails.length}\n- `+fails.join('\n- '):'\nkit-dlg-avatar: PASS');process.exit(fails.length?1:0)})();
