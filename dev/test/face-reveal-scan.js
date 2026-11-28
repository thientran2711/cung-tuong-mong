/* review/face-reveal (owner 15/11 ~21:00Z, LUẬT SỬA CẢ NHÓM): every event dialog that SHOWS a person reveals that person's face
   (known stage >= 1, a consort also counts as met), and the name (stage >= 2) when the text names her / him.
   Dynamic scan: plays new lives with the balance bot (dev/measure/inpage4.js) and records EVERY dialog shown (showModal):
   the code site that queued it (stack of the Q push / unshift / splice), the people it shows (who / who2 / stage / faces / kit.subject),
   whether each was a stranger before, whether the dialog drew a grey silhouette, and whether the person is known afterwards.
   usage: node dev/test/face-reveal-scan.js <page url> [steps=12] [lives seeds=2] > out.json
   Output: {sites:{<file:line>:{n,title,shown,strangerShown,greyDialogs,revealedAfter,notRevealed}}, totals, errs} */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
const [,,URL,ST,NS]=process.argv;const STEPS=+ST||12;const NSEED=+NS||2;
const INP=fs.readFileSync(path.join(__dirname,'../measure/inpage4.js'),'utf8');
/* map a line of the built page to its module file (dev/build/assemble.py order) */
function lineMap(html){const asm=fs.readFileSync(path.join(__dirname,'../build/assemble.py'),'utf8');const files=JSON.parse(asm.match(/for f in (\[[^\]]+\])/)[1].replace(/'/g,'"'));
 const first=fs.readFileSync(path.join(__dirname,'../build/jcdn.js'),'utf8').split('\n')[0];const L=html.split('\n');let s=L.findIndex(x=>x===first||x.startsWith(first.slice(0,60)));
 const M=[];let at=s+1;for(const f of files){const t=fs.readFileSync(path.join(__dirname,'../build/'+f),'utf8');M.push([at,f]);at+=t.split('\n').length-1}return n=>{let r=null;for(const [a,f] of M){if(a<=n)r=[f,n-a+1];else break}return r?`${r[0]}:${r[1]}`:`?:${n}`}}
(async()=>{const b=await chromium.launch();const out={sites:{},totals:{dialogs:0,withPerson:0,strangerShown:0,grey:0,revealed:0,notRevealed:0},errs:[]};
 let html='';
 for(let seed=1;seed<=NSEED;seed++){const ctx=await b.newContext({viewport:{width:1180,height:820},deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:'reduce'});
  /* python http.server sends .html without a charset: serve the page as UTF-8 */
  await ctx.route(/\.html(\?.*)?$/,async r=>{const res=await r.fetch();r.fulfill({response:res,headers:Object.assign({},res.headers(),{'content-type':'text/html; charset=utf-8'})})});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>out.errs.push(e.message.slice(0,160)));
  if(!html)html=await (await ctx.request.get(URL)).text();
  await p.addInitScript(sd=>{let x=sd*9301+49297;Math.random=()=>{x=(x*9301+49297)%233280;return x/233280}},seed);
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:120000});await p.waitForTimeout(1500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.origin,null,{timeout:120000});await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove())});
  await p.evaluate(INP);
  /* the bot loops on the 'walk out in trung y?' card: she always dresses first in the scan */
  await p.evaluate(()=>{try{tyOn=()=>false}catch(e){}});
  await p.evaluate(()=>{window.__fr=[];
   /* where was it queued: the first frame below the Array method */
   const site=()=>{const st=(new Error().stack||'').split('\n').slice(3).filter(l=>!/Array\.|__frq/.test(l));return st.slice(0,4).map(l=>(l.match(/:(\d+):\d+\)?$/)||[])[1]).filter(Boolean).map(Number)};
   const tag=a=>{for(const m of a)if(m&&typeof m==='object'&&!m.__site)try{Object.defineProperty(m,'__site',{value:site(),enumerable:false,writable:true})}catch(e){}};
   for(const k of ['push','unshift']){const f=Array.prototype[k];Array.prototype[k]=function(){if(this===Q)tag(arguments);return f.apply(this,arguments)}}
   const sp=Array.prototype.splice;Array.prototype.splice=function(){if(this===Q&&arguments.length>2)tag([].slice.call(arguments,2));return sp.apply(this,arguments)};
   const ents=m=>{const L=[];const add=x=>{if(!x||typeof x!=='object')return;let e=null;try{e=k61PortEnt(x)||x.__kp||(k61All().includes(x)?x:null)}catch(er){}if(e&&e!==S&&!L.includes(e))L.push(e)};
    (Array.isArray(m.stage)?m.stage:[]).forEach(add);add(m.who);add(m.who2);add(m.kit&&m.kit.subject);(m.faces||[]).forEach(f=>add(f&&f[0]));return L};
   const s0=showModal;showModal=function(){const m=Q[0];let rec=null;
    try{if(m&&S&&S.known&&!m.__seen){const E=ents(m);rec={site:m.__site||[],t:String(m.t||'').slice(0,50),p:E.map(e=>({k:kOf61(e),kind:k61Kind(e),face0:isKnown61(e),st0:k61St(e)}))};}}catch(e){}
    const r=s0.apply(this,arguments);
    try{const M0=document.getElementById('modal');/* r1: only a dialog really drawn (j68 evGate may hold / drop the optional Q[0]) */if(rec&&(Q[0]!==m||!M0||M0.hidden))rec=null;if(rec){m.__seen=1;const M=M0;const grey=M&&!M.hidden?M.querySelectorAll('img[src*="unknown-"],image[href*="unknown-"]').length:0;
     rec.grey=grey;if(grey)rec.greyCtx=[...M.querySelectorAll('img[src*="unknown-"],image[href*="unknown-"]')].slice(0,3).map(g=>{const c=g.closest('figure,.kfact,.spk,.kitem,li,p,div');return (c?c.className+': ':'')+(c?c.textContent:'').replace(/\s+/g,' ').slice(0,60)});rec.p.forEach(x=>{const e=k61Ent(x.k);x.face1=e?isKnown61(e):null;x.st1=e?k61St(e):null});window.__fr.push(rec)}}catch(e){}return r}});
  for(let i=0;i<STEPS;i++){try{await p.evaluate(()=>window.__bot.step('sens',300))}catch(e){out.errs.push('step '+String(e.message).slice(0,100));break}}
  const R=await p.evaluate(()=>window.__fr);const where=lineMap(html);
  for(const r of R){out.totals.dialogs++;const key=r.site.length?where(r.site[0]):'?';const S0=out.sites[key]=out.sites[key]||{n:0,title:r.t,via:r.site.slice(1,3).map(where),shown:0,strangerShown:0,greyDialogs:0,revealedAfter:0,notRevealed:0,kinds:{}};
   S0.n++;if(r.greyCtx&&(S0.greyCtx=S0.greyCtx||[]).length<4)S0.greyCtx.push({p:r.p.map(x=>x.kind+(x.face1?'+':'-')),g:r.greyCtx});if(r.p.length){out.totals.withPerson++;S0.shown++}if(r.grey){S0.greyDialogs++;out.totals.grey++}
   for(const x of r.p){S0.kinds[x.kind]=(S0.kinds[x.kind]||0)+1;if(!x.face0){S0.strangerShown++;out.totals.strangerShown++;if(x.face1){S0.revealedAfter++;out.totals.revealed++}else{S0.notRevealed++;out.totals.notRevealed++}}}}
  await ctx.close()}
 await b.close();console.log(JSON.stringify(out,null,1))})().catch(e=>{console.error(e);process.exit(1)});
