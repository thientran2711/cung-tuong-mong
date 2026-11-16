/* review/reign-road-fix scan (LUẬT SỬA CẢ NHÓM): every tab × sub-tab of the side panel, after a mid-game start, lists
   (a) lines that print "???" and (b) lines that print the RAW name of a consort she has not met by name (kitKnownName false).
   Faction-style lists ("<rank> ???, <rank> ???") are the bug family; a single masked person line is the intended kit mask.
   usage: NODE_PATH=$(npm root -g) node dev/test/unmet-names-scan.js <url|file> [WxH]   (prints a table; exit 1 on a raw name) */
const {chromium}=require('playwright');const path=require('path');
const [,,URL0,VP]=process.argv;const [W,H]=(VP||'755x1000').split('x').map(Number);const URL=/^https?:/.test(URL0)?URL0:'file://'+path.resolve(URL0);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block'});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof rgMonth==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;
  for(let i=0;i<40;i++){start();if(S.ps&&!(typeof isSrv==='function'&&isSrv())&&S.origin.k!=='tt')break}Q.length=0;$("modal").hidden=true});
 await p.waitForTimeout(800);await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});
 const R=await p.evaluate(async()=>{
  /* put the whole court into the two factions, with strangers, and make the road live */
  rgW().ch=3;S.reign.side='emp';const un=rivals.filter(v=>!kitKnownName(v)&&!v.queen);
  const out=[];const raw=un.map(v=>v.name).filter(n=>n&&n.length>2);out.push({where:'unmet',line:un.map(v=>v.name+'/'+v.rank).join(', '),kind:'info'});
  const tabs=['go','staff','inv','story','rv','act','log','kid','art','rel','fac','court'];
  for(const t of tabs){tab=t;try{render()}catch(e){out.push({t,err:e.message});continue}
   const subs=[...document.querySelectorAll('#panel [data-ktsub]')].map(g=>[g.dataset.ktsub,[...g.querySelectorAll('[data-ktsv]')].map(x=>x.dataset.ktsv)]);
   const visit=(label)=>{const txt=document.getElementById('panel').innerText;for(const ln of txt.split('\n')){const q=ln.includes('???');const r=raw.find(n=>ln.includes(n));if(q||r){const i=r?ln.indexOf(r):ln.indexOf('???');out.push({where:t+(label?'›'+label:''),line:(r?'['+r+'] ':'')+ln.slice(Math.max(0,i-50),i+60).trim(),kind:r?'RAW NAME':'mask'})}}};
   visit('');
   for(const [key,vals] of subs)for(const v of vals){KTSUB[key]=v;try{render()}catch(e){out.push({t,err:e.message});continue}visit(key+'='+v)}}
  return{n:un.length,rows:out}});
 console.log('unmet consorts',R.n);const seen=new Set();let bad=0;for(const r of R.rows){const k=r.where+'|'+r.line;if(seen.has(k))continue;seen.add(k);if(r.kind==='RAW NAME'||r.err)bad++;console.log(r.kind||'ERR',r.where||r.t,'|',r.line||r.err)}
 console.log('page errors',errs.length,errs.slice(0,3));await b.close();process.exit(bad||errs.length?1:0)})();
