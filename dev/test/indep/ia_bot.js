/* Independent roster audit, bot play on the real merged build (4 buổi from jtime4; no NB patch).
   usage: node ia_bot.js <sens|rand> <lives> <out.json> <originOffset> [gameURL]
   Every origin in turn (9, incl. cnv), 2 game years per life (or death). Checks (ia_hook.js) after every spend / goTo / nextBuoi;
   JSON save round trip at ~4% of those moments and at ~15% of bot steps that stop on a card or a minigame. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,MODE='sens',LIVES='9',OUT='/dev/stdout',OFF='0',URL='http://127.0.0.1:8971/t.html']=process.argv;
const MEAS=process.env.MEAS||path.join(__dirname,'..','..','measure');const HOOK=fs.readFileSync(path.join(__dirname,'ia_hook.js'),'utf8');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const ctx=await b.newContext({viewport:{width:390,height:844}});const p=await ctx.newPage();
 await p.route(/\.(webp|png|jpg|mp3|ogg|m4a)$/,r=>r.abort());const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(800);await p.evaluate(()=>localStorage.clear());await p.reload({waitUntil:'domcontentloaded'});await p.waitForTimeout(800);
 await p.evaluate(`(function(){const O=['tt','dtq','muoi','cn','nc','td','ch','thd','cnv'];let i=${+OFF};const s0=start;start=function(){window.__forceOrigin=O[(i++)%9];return s0.apply(this,arguments)}})()`);
 await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await p.waitForTimeout(600);
 await p.evaluate(`window.__servPolicy='';window.__aff=0;window.__balO=null;window.__fairO=null;window.__q72O=null;window.__xO=null;window.__q72off=1`);
 for(const f of [process.env.BOT||'inpage6.js','inbal.js'])await p.evaluate(fs.readFileSync(path.join(MEAS,f),'utf8'));
 await p.evaluate(HOOK);
 await p.evaluate(()=>{const IA=window.__IA;IA.lives=[];
  const w=(n)=>{const o=window[n];window[n]=function(){const r=o.apply(this,arguments);try{IA.check(n);if(Math.random()<.04)IA.roundTrip(n)}catch(e){IA.bad("X",n+": "+e.message)}return r}};
  /* no save inside goTo: goTo spends the walk before it sets S.place (j2), a moment the real game never saves at */
  let inGo=0;
  {const o=spend;spend=function(){const r=o.apply(this,arguments);try{IA.check("spend");if(!inGo&&Math.random()<.04)IA.roundTrip("spend")}catch(e){IA.bad("X","spend: "+e.message)}return r}}
  {const o=goTo;goTo=function(){inGo++;let r;try{r=o.apply(this,arguments)}finally{inGo--}try{IA.check("goTo")}catch(e){IA.bad("X","goTo: "+e.message)}return r}}
  {const o=nextBuoi;nextBuoi=function(){const r=o.apply(this,arguments);try{IA.check("nextBuoi");if(Math.random()<.04)IA.roundTrip("nextBuoi")}catch(e){IA.bad("X","nextBuoi: "+e.message)}return r}}
  const st0=window.__bot.step;let dead=0;window.__iaStep=function(m,n){for(let i=0;i<n;i++){
    try{if(S&&!S.dead&&(Q.length||S.mg)&&Math.random()<.15)IA.roundTrip(S.mg?"minigame":"thẻ")}catch(e){IA.bad("X","rt: "+e.message)}
    st0(m,1);
    try{if(S&&!S.dead&&S.turn>=24&&!Q.length){IA.lives.push({o:S.origin.k,end:"2 năm",t:S.turn,rank:S.rank});start()}else if(S&&S.dead&&!dead){dead=1;IA.lives.push({o:S.origin.k,end:"chết/hết",t:S.turn,rank:S.rank})}if(S&&!S.dead)dead=0}catch(e){}}
   return IA.lives.length};start()});
 const t0=Date.now();let n=0;while(true){n=await p.evaluate(([m])=>window.__iaStep(m,200),[MODE]);if(n>=+LIVES)break;if(Date.now()-t0>(+process.env.CAP||3600)*1e3){console.log('time cap');break}}
 const out=await p.evaluate(()=>({n:__IA.n,err:__IA.err,ex:__IA.ex,stat:__IA.stat,lives:__IA.lives,where:__IA.lastPlace,j95errs:J95.errs,j95berrs:J95B.errs,botres:(window.__res||[]).slice(-40).map(r=>[r.origin,r.title,r.turns])}));
 out.pageErrors=errs.slice(0,20);out.pageErrorN=errs.length;out.mode=MODE;fs.writeFileSync(OUT,JSON.stringify(out,null,1));
 console.log(MODE,OFF,'lives',out.lives.length,'checks',out.n,'err',JSON.stringify(out.err),'saves',out.stat.saves,'midQ',out.stat.savesMidQ,'midMg',out.stat.savesMidMg,'pageErr',errs.length);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
