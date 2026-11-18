/* review/servant-mline-r1: long sim of the NPC maid line. usage: node dev/measure/sim_maidline_r1.js <url> [runs] [months] [mat] [off]
   Each run = a fresh game (thd), she does nothing and is kept alive; the palace lives <months> months. Prints one JSON per run. */
const {chromium}=require('playwright');const [,,URL,RUNS='4',MON='360',MAT='',OFF='0',HIRE='0']=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage','--blink-settings=imagesEnabled=false']});
 const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});await ctx.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));p.setDefaultTimeout(1200000);
 await p.goto(URL,{waitUntil:'domcontentloaded'});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await sleep(1000);
 for(let r=0;r<+RUNS;r++){const out=await p.evaluate(async([MON,MAT,OFF,HIRE])=>{window.__mloff=+OFF;window.__mlN={};
  window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;quiet=true;window.__nlInner=1;start();window.__nlInner=0;quiet=true;Q.length=0;
  const render0=render,die0=die,over0=over;render=()=>{};die=()=>{};over=()=>{};for(let i=0;i<HIRE;i++){const s=mkServ('maid');s.age=17+i*2;S.staff.push(s)}
  const R={months:0,hersTargeted:0,hersBribed:0,hersLost:0,hersRose:0,rose:0,linesMl:0,linesMlMonthsWith:0,maxLinesMonth:0,seatOver:[],consortsMax:0,consortCapHit:0,errs:[],sample:[]};
  const fx0=mlFx;mlFx=function(f,s){try{if(S.staff&&S.staff.includes(s))R.hersTargeted++}catch(e){}return fx0.apply(this,arguments)};
  const bs0=bribeServ;bribeServ=function(a,s){try{if(S.staff&&S.staff.includes(s))R.hersBribed++}catch(e){}return bs0.apply(this,arguments)};
  const ro0=mlRose;mlRose=function(pp,s){R.rose++;if(pp===S)R.hersRose++;return ro0.apply(this,arguments)};
  const mm0=mlMonth;mlMonth=function(){const before=new Set((S.staff||[]).map(x=>x.sid));const ev=mm0.apply(this,arguments)||"";const after=new Set((S.staff||[]).map(x=>x.sid));for(const k of before)if(!after.has(k))R.hersLost++;
   const n=ev?ev.split(/\.\s+/).filter(x=>x.trim()).length:0;R.linesMl+=n;if(n){R.linesMlMonthsWith++;if(R.sample.length<14)R.sample.push(ev.slice(0,260))}R.maxLinesMonth=Math.max(R.maxLinesMonth,n);return ev};
  const sm0=servMonth;servMonth=function(){const r=sm0.apply(this,arguments);R.months++;try{for(const k of Object.keys(SEATCAP)){const h=holders(+k).length;if(h>SEATCAP[k])R.seatOver.push([S.turn,k,h])}const nc=liveRivals(true).length;R.consortsMax=Math.max(R.consortsMax,nc);if(!roomFor("consort"))R.consortCapHit++}catch(e){R.errs.push(String(e).slice(0,120))}return r};
  let g=0;while(R.months<MON&&g++<MON*8){if(S.dead)S.dead=false;if(MAT!=='')tmPlace(S,+MAT);S.suc=Math.max(S.suc||0,60);Q.length=0;try{const md=document.getElementById('modal');if(md)md.hidden=true}catch(e){}S.mg=null;S.out=false;S.confined=0;try{endTurn()}catch(e){R.errs.push(String(e).slice(0,160));if(R.errs.length>5)break}}
  mlFx=fx0;bribeServ=bs0;mlRose=ro0;mlMonth=mm0;servMonth=sm0;render=render0;die=die0;over=over0;R.N=Object.fromEntries(Object.entries(window.__mlN).map(([k,v])=>[k,+(+v).toFixed(2)]));R.seatOver=R.seatOver.slice(0,5);return R},[+MON,MAT,OFF,+HIRE]);
  console.log(JSON.stringify(out))}
 console.log(JSON.stringify({pageErrors:errs.slice(0,8)}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
