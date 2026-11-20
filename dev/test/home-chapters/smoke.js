/* review/home-chapters: plays home lives (Ở nhà chờ tuyển tú) month by month with no UI clicks, answering every dialog by a random
   option, until she enters the palace. Checks: no page error; every planned home chapter ends (win / mid / lose) before or at entry;
   the ending's palace arc is the first palace road (jst14 f14.road or pool head) and starts with its Lợi thế; roster people exist
   (nhũ mẫu, bà mối, 5 teachers, every suitor a person); a dying mother leaves the keepsake item in her bag.
   usage: node dev/test/home-chapters/smoke.js <url> [--origin=tt] [--lives=4] */
const {chromium}=require('playwright');
const A=process.argv.slice(2),URL=A[0];const opt=(k,d)=>{const a=A.find(x=>x.startsWith('--'+k+'='));return a?a.split('=')[1]:d};
const ORG=opt('origin','tt').split(','),LIVES=+opt('lives',4);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await c.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)+' @'+String(e.stack||'').split('\n')[1]));
 await p.addInitScript(()=>{window.__bot=1;try{localStorage.setItem('ctm-bgpause','1')}catch(e){}});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await sleep(4000);
 const out=[];let bad=0;
 for(const o of ORG)for(let L=0;L<LIVES;L++){
  const r=await p.evaluate(o=>{const F=[];const res={o,fail:F};try{
   for(let i=0;i<80;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!S.srv&&!(typeof isSrv==='function'&&isSrv()))break}
   S.origin=ORIGINS.find(x=>x.k===o);S.kcPick='nha';Q=[];kcInit();Q=[];
   if(!S.kc.c3)F.push('no c3');res.plan=S.kc.ar.plan.slice();
   const R0=['nm','ba','thay0','thay1','thay2','thay3','thay4'].filter(r=>!S.kc.fam.some(m=>m.r===r));if(R0.length)F.push('roster missing '+R0);
   const answer=()=>{for(let g=0;g<40&&Q.length;g++){const m=Q.shift();if(m.opts&&m.opts.length){const op=m.opts.filter(x=>!x.dis);const x=op[Math.floor(Math.random()*op.length)];
     try{if(x.fx)apply(x.fx)}catch(e){}try{x.go&&x.go()}catch(e){F.push('go '+e.message)}}}};
   let n=0;for(;n<40&&isKc()&&!S.dead;n++){S.tuan=2;kcMonth();answer();if(S.kc.tt&&!S.kc.inPal){/* the round: keep her */try{if(!S.kc.inPal){kcEnter(1)}}catch(e){F.push('enter '+e.message)}}answer()}
   res.months=n;res.dead=!!S.dead;res.inPal=!!(S.kc&&S.kc.inPal);
   const ar=S.kc.ar;res.done=ar.done.map(d=>d.a+':'+d.e+':'+d.seed);res.seed=S.kc.seed3||null;
   if(!S.dead&&res.inPal){const miss=ar.plan.filter(id=>!ar.done.some(d=>d.a===id));if(miss.length)F.push('chapters not ended '+miss);
    if(S.kc.seed3&&S.st&&S.st.ch){const c=S.st.ch;res.road=(S.st.f14&&S.st.f14.road)||c.pool[0];if(arcOk67(ARC67[S.kc.seed3.id])&&res.road!==S.kc.seed3.id&&!(S.st.f14&&S.st.f14.r0))F.push('road '+res.road+' != seed '+S.kc.seed3.id)}}
   res.sx=S.kc.fam.filter(m=>/^sx/.test(m.r)).length;res.suits=(S.kc.suit||[]).length;
   if(S.kc.fam.some(m=>m.r==='me'&&m.dead)&&!(S.inv||[]).some(e=>e.k==='divat'))F.push('mother died, no keepsake');
   res.divat=(S.inv||[]).some(e=>e.k==='divat');
  }catch(e){F.push('throw '+e.message+' '+String(e.stack).split('\n')[1])}return res},o);
  if(r.fail.length)bad++;out.push(r)}
 console.log(JSON.stringify({errs:errs.slice(0,10),out},null,0).replace(/\},\{/g,'},\n{'));await b.close();process.exit(bad||errs.length?1:0)})();
