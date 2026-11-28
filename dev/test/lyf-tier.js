/* review/lyf-tier: S.lyF (the fallen Lý object) must never make S look like her. usage: node dev/test/lyf-tier.js [oldRoot] [outdir]
   For rank 0..7: S's figure (figFor S "por"/"fig"/"stage"-kind) must be her rank tier, figTierOf(S)=S.rank, figRoles(S)=player/heroine, f88Wear(S) not forced;
   the fallen Lý (lyFallen()) keeps tier -1 / role fallen|consort. Also a kind:"fallen" person. oldRoot = main checkout (shows the bug: before). */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
const NEWR=path.resolve(__dirname,'../..');const OLDR=process.argv[2]?path.resolve(process.argv[2]):null;
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();
 const run=async(root,label)=>{const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,reducedMotion:'reduce'});
  await ctx.route('http://ts.local/**',r=>{let u=decodeURIComponent(new URL(r.request().url()).pathname);const f=root+u;
   if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
   r.fulfill({status:200,contentType:/\.html$/.test(f)?'text/html; charset=utf-8':/\.json$/.test(f)?'application/json':'application/octet-stream',body:fs.readFileSync(f)})});
  await ctx.route(/^https?:\/\/(?!ts\.local)/,r=>/image|media|font/.test(r.request().resourceType())?r.abort():r.continue());
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto('http://ts.local/index.html',{waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof start==='function',null,{timeout:180000});await p.waitForTimeout(2500);
  const r=await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;try{store.set(NL_KEY,null)}catch(e){}start();Q.length=0;
   const ly=lyFallen();const out=[];
   for(let k=0;k<=7;k++){S.rank=k;S.out=0;
    out.push({k,tierS:figTierOf(S),rolesS:figRoles(S).join("/"),wearS:!!f88Wear(S),porS:figFor(S,"por")||"",figS:figFor(S,"fig")||""})}
   S.rank=3;const mk=S.lyF&&typeof S.lyF==="object";
   // save → load round trip (old-save style): lyF object stays one person
   quiet=false;save();const d=JSON.parse(JSON.stringify(ser()));quiet=true;deser(d);quiet=false;
   const after={same:S.lyF&&S.lyF.lyF===1,tierS:figTierOf(S),tierLy:figTierOf(S.lyF),rolesLy:figRoles(S.lyF).join("/"),rolesS:figRoles(S).join("/"),porLy:figFor(S.lyF,"por")||"",porS:figFor(S,"por")||"",wearLy:!!f88Wear(S.lyF)};
   return{mk,out,after,rank:S.rank}});
  return{r,errs}};
 const n=await run(NEWR,'new');
 let o=null;if(OLDR){o=await run(OLDR,'old');console.log('BEFORE (main):',JSON.stringify(o.r.after),JSON.stringify(o.r.out.map(x=>[x.k,x.tierS,x.rolesS])))}
 console.log('AFTER :',JSON.stringify(n.r.after));
 ok(n.r.mk,'S.lyF is set (fallen Lý object stored on S)');
 for(const x of n.r.out){ok(x.tierS===x.k+1,'rank '+x.k+': figTierOf(S)='+x.tierS);ok(x.rolesS==='player/heroine','rank '+x.k+': figRoles(S)='+x.rolesS);ok(!/cold|fallen/.test(x.porS+x.figS),'rank '+x.k+': S art is not the cold-palace art',x.porS.slice(-40))}
 const a=n.r.after;ok(a.same,'old-save style round trip keeps Lý marker');ok(a.tierS===n.r.rank+1,'after load figTierOf(S)=rank');ok(a.tierLy===-1,'Lý tier still -1 (cold look)');ok(/fallen|consort/.test(a.rolesLy),'Lý role fallen/consort',a.rolesLy);ok(a.rolesS==='player/heroine','S roles after load');ok(a.wearLy,'Lý f88Wear still true');
 ok(a.porLy!==a.porS||!a.porS,'Lý and S use different figures');
 ok(!n.errs.length,'no page errors',n.errs);
 if(o){ok(o.r.out.every(x=>x.tierS===-1),'(old build shows the bug: figTierOf(S)=-1)')}
 await b.close();process.exit(res.every(Boolean)?0:1)})();
