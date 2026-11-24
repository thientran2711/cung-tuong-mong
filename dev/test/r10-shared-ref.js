/* REVIEW r1 robot-fix-cnv law 6b (one person = one object after a load): ser() keeps rivals ($r) and kids ($k) by reference and EVERY other object by value,
   so an object reached by two paths before a load (the same servant / man in S.visit.people and in S.men / staff) becomes two copies after it. This probe
   plays the robot's bot with the real render on, and every 5 buổi lists every shared object (path pair), loads in place (deser(ser())) and reports each pair
   that is no longer ONE object. Data records shared by two fields (S.empWhy = S.nightWhy.emp) show up too: read the family.
   usage: node dev/test/r10-shared-ref.js <origin> <road> <loads> [seed] [bot]   exit 1 = a split */
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
  window.__split={};window.__sx={};window.__n=0;window.__sh=0;
  const isP=o=>(rivals||[]).includes(o)||allKids().some(x=>x[0]===o);
  const pairs=()=>{const seen=new Map(),P=[];const walk=(o,p,top)=>{if(!o||typeof o!=='object')return;if(!top&&isP(o))return;if(seen.has(o)){P.push([seen.get(o),p]);return}seen.set(o,p);
    if(Array.isArray(o)){o.forEach((x,i)=>walk(x,p+'.'+i,false));return}for(const k in o){const v=o[k];if(typeof v==='function'||k==='origin')continue;walk(v,p+'.'+k,(k==='kids'&&false))}};
   walk(S,'S',true);(rivals||[]).forEach((v,i)=>walk(v,'R.'+i,true));return P};
  const at=pth=>{const a=pth.split('.');let x=a[0]==='S'?S:rivals[+a[1]];for(const k of a.slice(a[0]==='S'?1:2)){if(x==null)return undefined;x=x[k]}return x};
  const rt=()=>{if(!S||S.dead||S.mg||Q.length)return;try{render()}catch(e){}const P=pairs();window.__sh+=P.length;const s1=JSON.stringify(ser());quiet=true;deser(JSON.parse(s1));quiet=false;try{render()}catch(e){}window.__n++;
   for(const [a,b] of P){const x=at(a),y=at(b);if(x&&typeof x==='object'&&x===y)continue;const k=a.replace(/\.\d+/g,'.N')+' = '+b.replace(/\.\d+/g,'.N');window.__split[k]=(window.__split[k]||0)+1;if(!window.__sx[k])window.__sx[k]=a+' = '+b+' ('+(x&&x.name||x&&x.kind||typeof x)+') @ '+S.year+'/'+S.month+' place '+S.place}};
  const nb0=nextBuoi;nextBuoi=function(){const r=nb0.apply(this,arguments);try{if(++window.__k%(window.__EV||5)===0)rt()}catch(e){window.__sx.THROW=String(e.stack).slice(0,300)}return r};window.__k=0});
 const want=+NB||40;for(let i=0;i<4000;i++){const r=await p.evaluate(([m])=>{try{window.__bot.step(m,5)}catch(e){}return {n:window.__n,dead:!S||S.dead}},[mode]);if(r.n>=want||r.dead)break}
 const r=await p.evaluate(()=>({n:window.__n,sh:window.__sh,split:window.__split,sx:window.__sx}));
 const fams=Object.entries(r.split).sort((a,b)=>b[1]-a[1]);
 console.log((fams.length?'SPLIT':'ok   ')+` ${ORIGIN}/${ROAD} loads ${r.n} · shared refs seen ${r.sh} · split families ${fams.length}`);
 for(const [k,n] of fams.slice(0,40))console.log('  '+n+'× '+k+'\n      e.g. '+r.sx[k]);if(r.sx.THROW)console.log('  THROW '+r.sx.THROW);
 if(errs.length)console.log('  page errors: '+[...new Set(errs)].slice(0,6).join(' | '));
 await b.close();process.exit(fams.length?1:0)})();
