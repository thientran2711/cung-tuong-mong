/* review/appearance-port-r1: weekly healing end to end. usage: node dev/test/ap-week.js <url> */
const {chromium}=require('playwright');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.waitForTimeout(4000);
 const out=await p.evaluate(()=>{const R=[];Q.length=0;document.getElementById('modal').hidden=true;
  const w0=wk();S.suc=100;S.arts=S.arts||{};S.arts.y=0;
  rashGive(S,2,'t');pzGive(S,1,'t',null);slapGive(S,rivals[0],'');penGive(S,'quy','');
  const un=()=>({rash:S.rash&&S.rash.until-w0,pz:S.pz&&S.pz.until-w0,slap:S.slap&&S.slap.until-w0,pen:S.pen&&S.pen.until-w0});R.push(['start',un()]);
  for(let i=1;i<=7;i++){Q.length=0;S.mg=null;S.dead=0;S.suc=100;const a=wk();endTurn();Q.length=0;document.getElementById('modal').hidden=true;R.push([i,wk()-w0,{rash:!!S.rash,pz:!!S.pz,slap:!!S.slap,pen:!!S.pen},FX_ACTIVE()])}
  return R;function FX_ACTIVE(){return[S.rash&&rshOf(S).chip,S.pen&&S.pen.until>wk()?'pen':'' ].join('|')}});
 console.log(JSON.stringify(out));console.log('errs',errs);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
