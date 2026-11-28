/* KK60 kit-focus-keepin (KIT §92.7, G1 BIG #21 «Chọn làm cung nữ thân cận» cut on Fold): real dfOpen on every stage person + figure-width sweep (SWEEP=1 default list, or SWL='[null,[x,w],..]');
   every .kfoc-b, its column and its «!» must lie inside the focus layer AND the screen; title text never runs out of the plaque. FAILS on bd1bf3d0 (Fold sweep: left column -17..73 / -167..-77).
   usage: SWEEP=1 node dev/test/kit-focus-keepin.js <file:///…/index.html> <outdir> [WxH,...]   (SHOT=1 stills of faults, SHOTALL=1 stills of person 0, DSF=2) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,URL,OUT,SIZES,PLACES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();let tot=0;
 for(const wh of (SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(process.env.DSF||1),hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitFocus&&window.dfOpen,null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}
   Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');tab='act';render();});
  await p.waitForTimeout(2500);await p.addStyleTag({content:'#kload,#klife,.modal.kload,#modal.kptitle,.kscn,[class^=kscn],.kmsc,#kmscene{display:none!important}'});
  await p.evaluate(()=>{for(const b of document.querySelectorAll('button'))if(/Vào cung ngay/.test(b.textContent)&&b.offsetParent)b.click()});await p.waitForTimeout(1500);
  await p.evaluate(a=>{window.__ALL=a;document.documentElement.classList.add('kf-still')},!!process.env.ALL);
  const places=(PLACES||"").split("|").filter(Boolean);if(!places.length)places.push("");
  for(const pl of places){
   if(pl){const r=await p.evaluate(pl=>{try{(new Function(pl))();return 'ok'}catch(e){return e.message}},pl);await p.waitForTimeout(1500);if(r!=='ok')console.log(wh,'place err',r)}
   const n=await p.evaluate(()=>{try{return curPeople().length}catch(e){return -1}});
   for(let i=0;i<n;i++){
    const sweeps=process.env.SWL?JSON.parse(process.env.SWL):process.env.SWEEP?[[.05,150],[.5,150],[.95,150],[.1,300],[.5,300],[.9,300],[.2,450],[.5,450],[.8,450],[.5,600]]:[null];for(const sw of sweeps){
    const ok=await p.evaluate(([i,sw])=>{try{if(window.DF&&DF.F){DF.F.destroy()}if(!sw)return dfOpen(i);const st=document.getElementById('stage').getBoundingClientRect();const w=sw[1],h=w/0.42>st.height?st.height*0.95:w/0.42,x=st.left+sw[0]*st.width-w/2;window.__sw=sw;
      DF.F=kitFocus.open({p:curPeople()[i],person:curPeople()[i],fig:null,from:{left:x,top:st.bottom-h-4,width:w,height:h,right:x+w,bottom:st.bottom-4},groups:dfData(i),onAct:()=>{},onClose:()=>{}});return true}catch(e){return 'err '+e.message}},[i,sw]);if(ok!==true){console.log('open',ok);continue}await p.waitForTimeout(500);
    const tabs=await p.evaluate(()=>[...document.querySelectorAll('.kfoc .kfoc-tabs .pct')].map(t=>t.dataset.k));if(!tabs.length)tabs.push(null);
    for(const k of tabs){if(k)await p.evaluate(k=>{const t=document.querySelector(`.kfoc .kfoc-tabs .pct[data-k="${k}"]`);t&&t.click()},k);await p.waitForTimeout(300);
     const r=await p.evaluate(()=>{const F=document.querySelector('.kfoc');if(!F)return null;const fr=F.getBoundingClientRect(),W=innerWidth,out=[];
      const nm=(window.DF&&DF.p&&(DF.p.name||DF.p.n))||'?';
      document.querySelectorAll('.kfoc .kfoc-col .kfoc-b').forEach(b=>{const r=b.getBoundingClientRect(),c=b.closest('.kfoc-col').getBoundingClientRect(),t=b.querySelector('.kfoc-t b').textContent;
       const i=b.querySelector('.kfoc-i'),ir=i&&i.getBoundingClientRect();
       const bad=[];if(r.left<Math.max(0,fr.left)-0.5||r.right>Math.min(W,fr.right)+0.5)bad.push(`plaque ${r.left|0}..${r.right|0} vs view ${Math.max(0,fr.left)|0}..${Math.min(W,fr.right)|0}`);
       if(r.left<c.left-0.5||r.right>c.right+0.5)bad.push(`out of column ${c.left|0}..${c.right|0}`);
       if(c.left<Math.max(0,fr.left)-0.5||c.right>Math.min(W,fr.right)+0.5)bad.push(`column ${c.left|0}..${c.right|0} off view`);
       if(ir&&(ir.right>Math.min(W,fr.right,c.right)+0.5||ir.left<Math.max(0,c.left)-0.5))bad.push(`! at ${ir.left|0}..${ir.right|0}`);
       const tt=b.querySelector('.kfoc-t');if(tt.getBoundingClientRect().right>r.right+0.5)bad.push(`content overflows plaque sw ${b.scrollWidth} cw ${b.clientWidth} t.right ${tt.getBoundingClientRect().right|0} b.right ${r.right|0}`);if(window.__ALL)out.push('  '+t+' | '+(b.querySelector('small')||{}).textContent);if(bad.length)out.push(`${b.closest('.kfoc-l')?'L':'R'} «${t}» ${bad.join('; ')}`)});
      return {nm,fr:[fr.left|0,fr.right|0],cols:[...document.querySelectorAll('.kfoc .kfoc-col')].map(c=>{const r=c.getBoundingClientRect();return (c.classList.contains('kfoc-l')?'L':'R')+(r.left|0)+'..'+(r.right|0)}).join(' '),n:document.querySelectorAll('.kfoc .kfoc-col .kfoc-b').length,out}});
     if(!r)continue;tot+=r.out.length;console.log(`${wh} p${i} sw${JSON.stringify(sw)} ${r.nm} [${k}] n=${r.n} kfoc ${r.fr} cols ${r.cols}${r.out.length?'\n   BAD '+r.out.join('\n   BAD '):''}`);
     if((r.out.length&&process.env.SHOT)||(process.env.SHOTALL&&i===0&&k===tabs[0]))await p.evaluate(()=>{const f=document.querySelector('.kfoc');const L=document.elementsFromPoint(innerWidth/2,innerHeight/2);window.__hid=[];window.__hidE=[];for(const e of L){if(f.contains(e)||e.contains(f))break;window.__hid.push(e.id||e.className);window.__hidE.push(e);e.style.setProperty('visibility','hidden','important')}});console.log('  hid',await p.evaluate(()=>JSON.stringify(window.__hid)));await p.screenshot({path:`${OUT}/${W}-p${i}-${k}-${sw?sw.join('_'):'real'}.png`});await p.evaluate(()=>{(window.__hidE||[]).forEach(e=>e.style.removeProperty('visibility'))});}
    await p.evaluate(()=>{try{DF.F&&DF.F.destroy()}catch(e){}});}}
  }
  if(errs.length)console.log(wh,'pageerrors',errs.slice(0,5));await ctx.close()}
 console.log("TOTAL BAD",tot);process.exitCode=tot?1:0;await b.close()})();
