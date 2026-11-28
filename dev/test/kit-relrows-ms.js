/* review/kit-relrows-ms (KIT §52 kitRelRows, KIT_REQUESTS 20/11 rel-men-servants): a man / servant / maid / court official reads the ONE relation model (j9 aff/oan)
   — ONE «Thiện cảm» number per pair (law 4). Whole family scan over relMSAll() + every man:
   - «→ ta: thiện cảm» == aff(p,S); «oán ta» == oan(p,S); no row shows p.loyal under «thiện cảm» (unless it equals aff);
   - men: «Ta → hắn: thiện cảm» == aff(S,p), no «Tin cậy»; her own servants (S.maid / ownerOf(p)===S): NO «Lòng» row (OD:L352, kit-relrows-ms1word) + «Ta tin cậy» == tinOf(p);
     other servants / officials: Thiện cảm + Oán only; not met (relMSMet false) → one «chưa rõ» row;
   - the person card left key (pcfKey) shows the same numbers (rendered, Fold + iPad shots).
   Needs a build WITH review/rel-men-servants (relMSAll); on LIVE it prints SKIP (old branch kept, guarded).
   usage: node dev/test/kit-relrows-ms.js <url> <outdir> */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();let bad=0;
 for(const [W,H] of [[755,1000],[1180,820]]){const ctx=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block',reducedMotion:'reduce'});const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));await p.goto(URL,{waitUntil:'domcontentloaded'});
  await p.addStyleTag({content:'#kload,#klife,.modal.kload,#modal.kptitle,.kroul,#kroulw,#curtain,#buoitr,.kmov{display:none!important}'});
  await p.waitForFunction(()=>typeof kitRelRows==='function'&&typeof start==='function',null,{timeout:240000});await sleep(1500);
  const r=await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<400;i++){start();if(!(typeof isSrv==='function'&&isSrv()))break}window.__nlInner=0;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;
   if(typeof relMSAll!=='function')return{skip:1};
   const f=[],tab=[];const L=relMSAll().slice();(S.men||[]).forEach(m=>{if(!L.includes(m))L.push(m)});
   /* make some pairs non-zero and loyal != aff so a wrong source shows */
   L.forEach((x,i)=>{try{affAdd(x,S,7+i%5);oanAdd(x,S,i%3?0:4);if(relMan(x))affAdd(S,x,3)}catch(e){}});
   let stranger=0;const met0=window.relMSMet;
   for(const pass of [0,1]){if(pass)window.relMSMet=()=>true;/* pass 1: everyone met (so the man / servant branches are all exercised) */
   for(const x of L){const R=kitRelRows(x);const lab=x.name||x.id;const man=relMan(x);const own=!man&&(x===S.maid||(typeof ownerOf==='function'&&ownerOf(x)===S));
    const g=(re,dir)=>R.find(z=>re.test(z.label)&&(!dir||z.dir===dir));
    if(R.some(z=>z.unk!=null)){if(pass)f.push(lab+': met but shows chưa rõ');stranger++;if(R.length!==1)f.push(lab+': stranger has more than one row');continue}
    const a=g(/→ ta: thiện cảm/,'them'),o=g(/oán ta/,'them');
    if(!a||a.now!==Math.round(aff(x,S)))f.push(lab+': Thiện cảm '+(a&&a.now)+' != aff '+aff(x,S));
    if(!o||o.now!==Math.round(oan(x,S)))f.push(lab+': Oán '+(o&&o.now)+' != oan '+oan(x,S));
    const th=R.filter(z=>z.dir==='them'&&z.w==='Thiện cảm');if(th.length!==1)f.push(lab+': '+th.length+' «Thiện cảm» rows toward her');
    if(man){const m=g(/Ta → .*thiện cảm/,'me');if(!m||m.now!==Math.round(aff(S,x)))f.push(lab+': Ta → hắn '+(m&&m.now)+' != '+aff(S,x));if(g(/tin cậy/i))f.push(lab+': man has Tin cậy')}
    else if(own){if(g(/lòng/i)||R.some(r=>/lòng/i.test(r.w||'')))f.push(lab+': shows a Lòng row (OD:L352: one word Thiện cảm)');const t=g(/tin cậy/i,'me');if(typeof tinOf==='function'&&(!t||t.now!==Math.round(tinOf(x))))f.push(lab+': Ta tin cậy wrong')}
    else{if(g(/lòng|tin cậy/i))f.push(lab+': not her servant but shows Lòng/Tin cậy')}
    tab.push(pass+' '+(man?'man':own?'own':'srv')+' '+lab+' → '+R.map(z=>z.w+'='+(z.now==null?'?':z.now)).join(' '))}}
   window.relMSMet=met0;const kinds={};tab.forEach(t=>{const k=t.split(' ').slice(0,2).join(' ');kinds[k]=(kinds[k]||0)+1});tab.unshift('kinds '+JSON.stringify(kinds));
   /* old loyal branch must not run for any of them */
   return {f,tab,n:L.length,stranger}});
  if(r.skip){console.log(W,'SKIP (no relMSAll: build without rel-men-servants)');await ctx.close();continue}
  if(W===755)r.tab.filter((x,i)=>i<2||/^1 man|^1 own/.test(x)).slice(0,12).forEach(x=>console.log('  '+x));
  /* rendered: person card of a man and of her maid → left key numbers */
  for(const k of ['maid','man']){const ok=await p.evaluate(k=>{tab='act';S.out=0;S.confined=0;render();const ps=curPeople();const i=ps.findIndex(x=>k==='maid'?x.kind==='maid':(x.kind==='man'||x.kind==='men'||(x.p&&relMan(x.p))));if(i<0)return 'none';popIdx=i;popMsg='';renderStage();return 'ok'},k);await sleep(1500);
   const t=await p.evaluate(()=>{const e=document.querySelector('.kr2w');return e?e.innerText.replace(/\s+/g,' ').slice(0,160):''});console.log(W,k,ok,'|',t);
   if(ok==='ok')await p.screenshot({path:`${OUT}/${W}-${k}.png`})}
  const e=r.f.slice();if(!r.n)e.push('no men/servants');if(errs.length)e.push('errors '+errs.slice(0,3).join('|'));
  if(e.length)bad++;console.log(`${W}x${H} people=${r.n} strangers=${r.stranger}`,e.length?'FAIL '+e.slice(0,8).join('; '):'PASS');await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
