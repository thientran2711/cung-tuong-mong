/* robot-fix-cnv-2 R2 scan (law 11, family «lazy face pick»): a person keeps a face while in one age band and gets a new one on entering the next band
   (j17 faceFor/bandKeys), but the pick ran only at render (renderPanel0 → faceInit) and at load (ageInit), while save() runs BEFORE render() everywhere.
   So the file held the old face key (fk) and a reload re-picked a random face. This probe plays the robot's bot (render OFF, as the robot) and at every
   buổi does the robot's in-place round trip (ser → deser → ser), counting only the face paths (.fc / .fk), per kind of person.
   usage: node dev/test/r10-face-band.js <origin> <road> <buoi> [seed] [bot]   exit 1 = a face changed on reload */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const [ORIGIN,ROAD,NB,SEED,BOT]=process.argv.slice(2);const M=path.join(__dirname,'..','measure');const rd=f=>fs.readFileSync(path.join(M,f),'utf8');
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});
 const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});await serve(ctx);
 await ctx.route(/\.(webp|png|jpe?g|gif|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
 await ctx.addInitScript(`window.__seed=${+SEED||7};(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(500);
 await p.evaluate(()=>localStorage.clear());
 await p.evaluate(`window.__r10cfg=${JSON.stringify({origin:ORIGIN,road:ROAD,locked:false,pers:BOT||'skilled',uiEvery:0,lagMs:1e9,rtEvery:1e9})}`);
 await p.evaluate(rd('inpage6.js'));await p.evaluate(rd('inty.js'));await p.evaluate(rd('robot10-in.js'));
 const mode=await p.evaluate(()=>window.__r10.mode);
 await p.evaluate(()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());document.getElementById('title').hidden=true;SLOT=1;Q=[];start();
  const one=()=>{const d=ser();delete d.at;return d};window.__fam={};window.__ex={};window.__n=0;window.__yr=0;
  const diff=(a,b,p,out)=>{if(a===undefined||JSON.stringify(a)===JSON.stringify(b))return;if(a&&b&&typeof a==='object'&&typeof b==='object'){new Set(Object.keys(a).concat(Object.keys(b))).forEach(k=>diff(a[k],b[k],p+'.'+k,out));return}out.push([p,String(a)+' → '+String(b)])};
  const rt=()=>{if(!S||S.dead||S.mg||Q.length||(S.nfX&&S.nfX.st&&S.nfX.st!=='done'))return;window.__n++;const A=one();const y=S.year;quiet=true;deser(JSON.parse(JSON.stringify(A)));quiet=false;const B=one();
   const out=[];diff(A,B,'save',out);for(const [pth,v] of out){if(!/\.f[ck]$/.test(pth))continue;const k=pth.replace(/\.\d+/g,'.N');window.__fam[k]=(window.__fam[k]||0)+1;if(!window.__ex[k])window.__ex[k]=pth+': '+v+' @ '+y}};
  const nb0=nextBuoi;nextBuoi=function(){const r=nb0.apply(this,arguments);try{rt()}catch(e){window.__ex.THROW=String(e.message)}return r}});
 const want=+NB||300;for(let i=0;i<6000;i++){const r=await p.evaluate(([m])=>{try{window.__bot.step(m,5)}catch(e){}return {n:window.__n,dead:!S||S.dead}},[mode]);if(r.n>=want||r.dead)break}
 const r=await p.evaluate(()=>({n:window.__n,fam:window.__fam,ex:window.__ex,y:S&&S.year,y0:S&&S.year}));const fams=Object.entries(r.fam).sort((a,b)=>b[1]-a[1]);
 const tot=fams.reduce((a,x)=>a+x[1],0);
 console.log((tot?'DRIFT':'ok   ')+` ${ORIGIN}/${ROAD} seed ${SEED||7} round trips ${r.n} (render off, as the robot) · face paths changed on reload ${tot} · year ${r.y}`);
 for(const [k,n] of fams)console.log('  '+n+'× '+k+'\n      e.g. '+r.ex[k]);if(r.ex.THROW)console.log('  THROW '+r.ex.THROW);
 if(errs.length)console.log('  page errors: '+[...new Set(errs)].slice(0,6).join(' | '));
 await b.close();process.exit(tot?1:0)})();
