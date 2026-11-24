/* robot-fix-cnv family 1 (save→load→save): the robot's bot page plays with render OFF (inpage6 stubs render/renderStage/renderPanel/renderHUD),
   so game rules that run on render (j95c roster sync + jpal palFix on a roster change, the stage visitor list S.visit, lazy faces) never run there
   and its in-place roundTrip reports them as drift. This probe plays the SAME bot (inpage6 + robot10-in, forced origin/road) with the REAL render
   restored, and at every buổi does what a reload does for her: ser → deser → render → ser, listing EVERY differing path (grouped by family).
   Load-time repairs by design are counted apart (same filter as r10-rt.js: item census il.seq / .iu, fcKeep, roster labels).
   robot-fix-cnv-3 R7: the round trip is the REAL reload: after each buổi press the probe waits until the deferred agent jobs (staff slices,
   khắc resync, news scan: jagent AGL) have run, then takes the FILE save() wrote (localStorage, what a reload reads), deser → render → waits
   for the jobs again → the file written now. (Before: ser() inside nextBuoi, before the slices ran = a state no file ever held settled.)
   robot-fix-cnv-4: RELOAD=1 = a TRUE reload: the bot page never loads in place; each round trip copies the bot page's whole localStorage
   into a SECOND browser context, reloads that page (fresh JS world: no old-world timer / modal hook survives), opens the slot by the
   title button (the real path: kmReset → deser → deal → showModal → render), waits for the deferred jobs, and diffs its file against s1.
   usage: [RELOAD=1] node dev/test/r10-play-rt.js <origin> <road> <buoi> [seed] [bot]   exit 1 = a real drift */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const [ORIGIN,ROAD,NB,SEED,BOT]=process.argv.slice(2);const M=path.join(__dirname,'..','measure');const rd=f=>fs.readFileSync(path.join(M,f),'utf8');
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});
 const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});await serve(ctx);
 await ctx.route(/\.(webp|png|jpe?g|gif|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
 await ctx.addInitScript(`window.__seed=${+SEED||7};(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(/^why/.test(m.text()))console.log(m.text())});p.on('crash',()=>console.log('PAGE CRASH (renderer) · round trips so far unknown'));
 await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(500);
 await p.evaluate(`window.__IDB=${process.env.IDLEDBG?1:0}`);await p.evaluate(`window.__RELOAD=${process.env.RELOAD?1:0}`);await p.evaluate(`window.__PROBE_PAL=${process.env.PROBE_PAL?1:0}`);await p.evaluate(()=>{localStorage.clear();window.__keep={render,renderHUD,renderStage,renderPanel,fx,curtain,popNum,save}});
 await p.evaluate(`window.__r10cfg=${JSON.stringify({origin:ORIGIN,road:ROAD,locked:false,pers:BOT||'skilled',uiEvery:0,lagMs:1e9,rtEvery:1e9})}`);
 await p.evaluate(rd('inpage6.js'));await p.evaluate(rd('inty.js'));await p.evaluate(rd('robot10-in.js'));
 const mode=await p.evaluate(()=>window.__r10.mode);
 let q=null,errB=[];const RL=!!process.env.RELOAD;if(RL){const c2=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});await serve(c2);
  await c2.route(/\.(webp|png|jpe?g|gif|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());await c2.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
  await c2.addInitScript(`window.__seed=${+SEED||7};(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`);
  q=await c2.newPage();q.on('pageerror',e=>errB.push(e.message));await q.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000})}
 /* one true reload: q gets p's whole localStorage, reloads, opens the slot by the title button, waits for the deferred jobs, returns its file */
 let dn=0;const reloadTrip=async()=>{const ls=await p.evaluate(()=>window.__ls);
  await q.reload({waitUntil:'domcontentloaded',timeout:120000});await q.waitForFunction(()=>typeof deser==='function'&&typeof showTitle==='function'&&document.querySelector('#slots'),null,{timeout:120000});await q.waitForTimeout(300);
  /* the page that just unloaded saved ITS world on the way out (pagehide → save): write the bot's storage again, now, in the fresh page */
  await q.evaluate(o=>{localStorage.clear();for(const k in o)localStorage.setItem(k,o[k])},ls);
  const ok=await q.evaluate(()=>{/* same rules as the bot page: robot10-in sets window.__bot after boot, and ~55 modules switch on it (jchat stage grouping, jagent, j72 cards…) */window.__bot=window.__bot||{step(){}};document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());showTitle();const bt=document.querySelector('#slots button[data-load="1"]');if(!bt)return 0;bt.click();return S&&!S.dead?1:0});if(!ok)return null;
  await q.waitForTimeout(80);try{await q.waitForFunction(()=>typeof AGL==='undefined'||(!AGL.L.length&&!AGL.run),null,{timeout:15000,polling:50})}catch(e){}await q.waitForTimeout(80);
  try{await q.waitForFunction(()=>typeof AGL==='undefined'||(!AGL.L.length&&!AGL.run),null,{timeout:15000,polling:50})}catch(e){}
  return q.evaluate(()=>localStorage.getItem(SK(1)))};
 await p.evaluate(()=>{const K=window.__keep;render=K.render;renderHUD=K.renderHUD;renderStage=K.renderStage;renderPanel=K.renderPanel;save=K.save;/* R7: the real save() too (inpage6 stubs it): the round trip reads the file it writes */
  document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());document.getElementById('title').hidden=true;SLOT=1;Q=[];start();try{render()}catch(e){}
  const VOL=['at'].concat(window.__RELOAD?['tab']:[]);const one=()=>{const d=ser();VOL.forEach(k=>delete d[k]);return JSON.stringify(d)};
  window.__fam={};window.__ex={};window.__n=0;window.__rep=0;
  const REP=/^save\.(S|R\.\d+)\.inv\.\d+\.iu$|^save\.S\.il\.seq$|\.fcKeep$|^save\.S\.roster\./;
  const diff=(a,b,p,out)=>{if(out.length>400)return;if(a===undefined)return;if(JSON.stringify(a)===JSON.stringify(b))return;
   if(a&&b&&typeof a==='object'&&typeof b==='object'){new Set(Object.keys(a).concat(Object.keys(b))).forEach(k=>diff(a[k],b[k],p+'.'+k,out));return}out.push([p,String(JSON.stringify(a)).slice(0,90)+' → '+String(JSON.stringify(b)).slice(0,90)])};
  const file=()=>{const t=localStorage.getItem(SK(SLOT));if(!t)return null;const d=JSON.parse(t);VOL.forEach(k=>delete d[k]);return JSON.stringify(d)};
  window.__rtA=()=>{window.__s1=null;/* the file holds the waiting cards too (serQ / deserQ): a card the deferred jobs queued is part of the round trip; a mini-game or a pending night flip is not a quiet moment */if(!S||S.dead||S.mg||(S.nfX&&S.nfX.st&&S.nfX.st!=='done'))return 0;/* a code card waiting holds the autosave (jqsave JQ.held, jspread SP13.held, by design): the file is the last settled one, not this moment */if((typeof JQ!=='undefined'&&JQ.held)||(typeof SP13!=='undefined'&&SP13.held)){window.__held=(window.__held||0)+1;return 0}if(window.__PROBE_PAL){const a=one();palFix();const b=one();if(a!==b){const o=[];diff(JSON.parse(a),JSON.parse(b),'pal',o);window.__palx=(window.__palx||[]).concat(o.slice(0,3).map(x=>x.join(': ')+' @ '+S.year+'/'+S.month+' place '+S.place))}}
   const s1=file();if(!s1)return 0;window.__s1=s1;if(window.__RELOAD){const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=localStorage.getItem(k)}window.__ls=o;return 1}window.__lgS=[];if(window.__IDB&&!window.__lgW){window.__lgW=1;const l0=log;log=function(){if(window.__s1)window.__lgS.push(String(arguments[0]).slice(0,50)+' <= '+String(new Error().stack).split('\n').slice(-6).map(x=>x.trim().split(' ')[1]).join('<'));return l0.apply(this,arguments)}}quiet=true;deser(JSON.parse(s1));quiet=false;try{render()}catch(e){}return 1};
  window.__rtB=(f2)=>{const s1=window.__s1;if(!s1)return;window.__s1=null;let s2=f2!==undefined?f2:file();if(f2!==undefined&&s2){const d=JSON.parse(s2);VOL.forEach(k=>delete d[k]);s2=JSON.stringify(d)}if(!s2){window.__ex.NOFILE='reload page wrote no file';return}window.__n++;if(window.__IDB&&window.__lgS.length&&!window.__lgD)window.__lgD=window.__lgS.slice(0,6);
   const out=[];diff(JSON.parse(s1),JSON.parse(s2),'save',out);for(const [pth,v] of out){if(REP.test(pth)){window.__rep++;continue}const k=pth.replace(/\.\d+/g,'.N');window.__fam[k]=(window.__fam[k]||0)+1;if(!window.__ex[k])window.__ex[k]=pth+': '+v+' @ '+S.year+'/'+S.month}};
  const nb0=nextBuoi;nextBuoi=function(){const r=nb0.apply(this,arguments);window.__nbHit=1;return r}});
 const idle=async()=>{const t=Date.now();try{await p.waitForFunction(()=>typeof AGL==='undefined'||(!AGL.L.length&&!AGL.run),null,{timeout:15000,polling:50})}catch(e){if(process.env.IDLEDBG)console.log('idle timeout',await p.evaluate(()=>JSON.stringify(AGL.L.map(x=>[x.k,x.w===S,x.b,agBk()]))))}if(process.env.IDLEDBG)console.log('idle ms',Date.now()-t)};
 const want=+NB||150;for(let i=0;i<4000;i++){const r=await p.evaluate(([m])=>{window.__nbHit=0;try{window.__bot.step(m,5)}catch(e){}return {n:window.__n,dead:!S||S.dead,hit:window.__nbHit}},[mode]);if(process.env.IDLEDBG&&i%20==0)console.log('it',i,'n',r.n,'hit',r.hit,Date.now()%1e6);if(r.n>=want||r.dead)break;
  if(r.hit){await idle();/* a card's own setTimeout(…,0) (j77 «Đi» → goTo) runs first: an in-place load must not hand it the loaded world (a real reload kills it) */await p.waitForTimeout(80);await idle();const a=await p.evaluate(()=>{try{const w=[!!S,S&&S.dead,S&&!!S.mg,S&&S.nfX&&S.nfX.st,!!localStorage.getItem(SK(SLOT)),SLOT,typeof quiet!=='undefined'&&quiet].join(',');const x=window.__rtA();return window.__IDB?x+'|'+w:x}catch(e){window.__ex.THROW=String(e.message);return 0}});if(process.env.IDLEDBG)console.log('rtA',a);if(a&&a!==0&&!/^0\|/.test(String(a))){if(RL){const f2=await reloadTrip();if(process.env.DUMP){const s1=await p.evaluate(()=>window.__s1);fs.writeFileSync(process.env.DUMP+'-s1-'+(dn)+'.json',s1||'');fs.writeFileSync(process.env.DUMP+'-s2-'+(dn++)+'.json',f2||'')}await p.evaluate(f=>{try{window.__rtB(f||'')}catch(e){window.__ex.THROW=String(e.message)}},f2)}else{await idle();await p.evaluate(()=>{try{window.__rtB()}catch(e){window.__ex.THROW=String(e.message)}})}}}}
 await p.evaluate(()=>0);const r=await p.evaluate(()=>({palx:(window.__palx||[]).slice(0,12),n:window.__n,rep:window.__rep,fam:window.__fam,ex:window.__ex,y:S&&S.year,held:window.__held||0,lg:window.__lgD}));if(r.lg)console.log('LOG IN ROUND TRIP',JSON.stringify(r.lg));
 const fams=Object.entries(r.fam).sort((a,b)=>b[1]-a[1]);
 console.log((fams.length?'DRIFT':'ok   ')+` ${ORIGIN}/${ROAD} round trips ${r.n} (render on, ${RL?'TRUE reload':'file, in-place load'}) · skipped while the autosave is held ${r.held} · repairs by design ${r.rep} · drift families ${fams.length}`);
 for(const [k,n] of fams)console.log('  '+n+'× '+k+'\n      e.g. '+r.ex[k]);if(r.palx&&r.palx.length)console.log('  LIVE palFix() not settled before save:\n    '+r.palx.join('\n    '));if(r.ex.THROW)console.log('  THROW '+r.ex.THROW);
 if(errs.length)console.log('  page errors: '+[...new Set(errs)].slice(0,6).join(' | '));if(errB.length)console.log('  reload page errors: '+[...new Set(errB)].slice(0,6).join(' | '));
 await b.close();process.exit(fams.length?1:0)})();
