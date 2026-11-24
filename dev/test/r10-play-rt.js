/* robot-fix-cnv family 1 (save→load→save): the robot's bot page plays with render OFF (inpage6 stubs render/renderStage/renderPanel/renderHUD),
   so game rules that run on render (j95c roster sync + jpal palFix on a roster change, the stage visitor list S.visit, lazy faces) never run there
   and its in-place roundTrip reports them as drift. This probe plays the SAME bot (inpage6 + robot10-in, forced origin/road) with the REAL render
   restored, and at every buổi does what a reload does for her: ser → deser → render → ser, listing EVERY differing path (grouped by family).
   Load-time repairs by design are counted apart (same filter as r10-rt.js: item census il.seq / .iu, fcKeep, roster labels).
   usage: node dev/test/r10-play-rt.js <origin> <road> <buoi> [seed] [bot]   exit 1 = a real drift */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const [ORIGIN,ROAD,NB,SEED,BOT]=process.argv.slice(2);const M=path.join(__dirname,'..','measure');const rd=f=>fs.readFileSync(path.join(M,f),'utf8');
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});
 const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});await serve(ctx);
 await ctx.route(/\.(webp|png|jpe?g|gif|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
 await ctx.addInitScript(`window.__seed=${+SEED||7};(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(500);
 await p.evaluate(`window.__PROBE_PAL=${process.env.PROBE_PAL?1:0}`);await p.evaluate(()=>{localStorage.clear();window.__keep={render,renderHUD,renderStage,renderPanel,fx,curtain,popNum}});
 await p.evaluate(`window.__r10cfg=${JSON.stringify({origin:ORIGIN,road:ROAD,locked:false,pers:BOT||'skilled',uiEvery:0,lagMs:1e9,rtEvery:1e9})}`);
 await p.evaluate(rd('inpage6.js'));await p.evaluate(rd('inty.js'));await p.evaluate(rd('robot10-in.js'));
 const mode=await p.evaluate(()=>window.__r10.mode);
 await p.evaluate(()=>{const K=window.__keep;render=K.render;renderHUD=K.renderHUD;renderStage=K.renderStage;renderPanel=K.renderPanel;
  document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());document.getElementById('title').hidden=true;SLOT=1;Q=[];start();try{render()}catch(e){}
  const VOL=['at'];const one=()=>{const d=ser();VOL.forEach(k=>delete d[k]);return JSON.stringify(d)};
  window.__fam={};window.__ex={};window.__n=0;window.__rep=0;
  const REP=/^save\.(S|R\.\d+)\.inv\.\d+\.iu$|^save\.S\.il\.seq$|\.fcKeep$|^save\.S\.roster\./;
  const diff=(a,b,p,out)=>{if(out.length>400)return;if(a===undefined)return;if(JSON.stringify(a)===JSON.stringify(b))return;
   if(a&&b&&typeof a==='object'&&typeof b==='object'){new Set(Object.keys(a).concat(Object.keys(b))).forEach(k=>diff(a[k],b[k],p+'.'+k,out));return}out.push([p,String(JSON.stringify(a)).slice(0,90)+' → '+String(JSON.stringify(b)).slice(0,90)])};
  const rt=()=>{if(!S||S.dead||S.mg||Q.length)return;try{render()}catch(e){}if(window.__PROBE_PAL){const a=one();const L0=(S.logs||[]).length;palFix();const b=one();if(a!==b){const o=[];diff(JSON.parse(a),JSON.parse(b),'pal',o);window.__palx=(window.__palx||[]).concat(o.slice(0,3).map(x=>x.join(': ')+' @ '+S.year+'/'+S.month+' place '+S.place))}}const s1=one();quiet=true;deser(JSON.parse(s1));quiet=false;try{render()}catch(e){}const s2=one();window.__n++;
   const out=[];diff(JSON.parse(s1),JSON.parse(s2),'save',out);for(const [pth,v] of out){if(REP.test(pth)){window.__rep++;continue}const k=pth.replace(/\.\d+/g,'.N');window.__fam[k]=(window.__fam[k]||0)+1;if(!window.__ex[k])window.__ex[k]=pth+': '+v+' @ '+S.year+'/'+S.month}};
  const nb0=nextBuoi;nextBuoi=function(){const r=nb0.apply(this,arguments);try{rt()}catch(e){window.__ex.THROW=String(e.message)}return r}});
 const want=+NB||150;for(let i=0;i<4000;i++){const r=await p.evaluate(([m])=>{try{window.__bot.step(m,5)}catch(e){}return {n:window.__n,dead:!S||S.dead}},[mode]);if(r.n>=want||r.dead)break}
 await p.evaluate(()=>0);const r=await p.evaluate(()=>({palx:(window.__palx||[]).slice(0,12),n:window.__n,rep:window.__rep,fam:window.__fam,ex:window.__ex,y:S&&S.year}));
 const fams=Object.entries(r.fam).sort((a,b)=>b[1]-a[1]);
 console.log((fams.length?'DRIFT':'ok   ')+` ${ORIGIN}/${ROAD} round trips ${r.n} (render on) · repairs by design ${r.rep} · drift families ${fams.length}`);
 for(const [k,n] of fams)console.log('  '+n+'× '+k+'\n      e.g. '+r.ex[k]);if(r.palx&&r.palx.length)console.log('  LIVE palFix() not settled before save:\n    '+r.palx.join('\n    '));if(r.ex.THROW)console.log('  THROW '+r.ex.THROW);
 if(errs.length)console.log('  page errors: '+[...new Set(errs)].slice(0,6).join(' | '));
 await b.close();process.exit(fams.length?1:0)})();
