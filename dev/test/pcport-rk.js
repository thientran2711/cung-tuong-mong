/* review/pcport-rk: pcPort must never throw on a figure whose rk is not a string (TypeError f.rk.split is not a function).
   usage: node dev/test/pcport-rk.js [url|-] [WxH ...]   (default: serve the built repo root, Fold 755x1000 + iPad 1180x820)
   Against a BARE build (before the fix) the injected-figure checks FAIL with the page error; against the fix they PASS. */
const {chromium}=require('playwright');const D=require('./lib/device');
const SIZES=(process.argv.slice(3).length?process.argv.slice(3):['755x1000','1180x820']).map(s=>s.split('x').map(Number));
(async()=>{let srv=null,base=process.argv[2];if(!base||base==='-'){srv=await D.serveRoot();base=srv.url+'/dev/index.html'.replace('/dev','')}
 const opt={};if(process.env.HTTPS_PROXY)opt.proxy={server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'};const b=await chromium.launch(opt);let bad=0;
 for(const [W,H] of SIZES){const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,deviceScaleFactor:1,reducedMotion:'reduce',serviceWorkers:'block'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(base+(base.includes('?')?'&':'?')+'khost=0',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(1500);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}});
  /* 1. whole-family scan: every figure the game builds for a real person has a string rk */
  const scan=await p.evaluate(()=>{const out=[];const chk=(n,f)=>{if(f&&f.rk!=null&&typeof f.rk!=='string')out.push(n+':'+typeof f.rk)};
   try{chk('me',pMe());chk('emp',pEmp());chk('th',pTH());chk('maid',pMaid())}catch(e){out.push('x:'+e.message)}
   for(const v of rivals){chk('rv',pv(v));(v.staff||[]).forEach(s=>chk('stf',pServ(s)));chk('kf',kitFace(v))}(S.staff||[]).forEach(s=>{chk('own',pServ(s));chk('kf',kitFace(s))});
   try{(S.men||[]).forEach(m=>chk('man',pMan(m)))}catch(e){}return out});
  /* 2. injected bad rk: pcPort / pframe / mdH / Hậu cung → Cung nhân with a poisoned rank source */
  const inj=await p.evaluate(()=>{const R=[];const t=(n,fn)=>{try{const h=fn();R.push([n,typeof h==='string'&&h.length>0])}catch(e){R.push([n,false,e.message.slice(0,80)])}};
   for(const [n,v] of [['num',3],['arr',['c1','x']],['obj',{a:1}],['nan',NaN],['neg',-1],['bool',true]]){t('pcPort-'+n,()=>pcPort({rk:v,src:'',ini:'A'}));t('pframe-'+n,()=>pframe({rk:v,src:'',ini:'A'}));t('mdH-'+n,()=>mdH({rk:v,src:'',ini:'A',col:'#fff'}))}
   t('pcPort-good',()=>{const h=pcPort({rk:'kid c4',src:'',ini:'A'});if(!/rk-kid rk-c4/.test(h))throw new Error('class changed');return h});
   t('pcPort-person',()=>{const h=pcPort({role:'maid',rk:2,src:'',ini:'A'});if(!/rk-sv2/.test(h))throw new Error('no sv2');return h});
   const ro=rkOfFace;try{rkOfFace=function(k,o){return k==='serv'?[5,'Cung nữ']:ro.apply(this,arguments)};
    Q.length=0;tab='staff';try{K3SH.home=false}catch(e){}t('cungnhan-tab',()=>{render();return document.getElementById('panel').innerHTML||'x'})}finally{rkOfFace=ro}return R});
  const fails=inj.filter(r=>!r[1]);const tag=W+'x'+H;
  console.log(JSON.stringify({tag,scanBadRk:scan,injFail:fails,pageErrors:errs}));if(scan.length||fails.length||errs.length)bad++;await ctx.close()}
 await b.close();if(srv)srv.close();console.log(bad?'FAIL':'PASS');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
