/* court-rules test (owner 11/15 05:45Z): 1) Hoàng hậu and Hoàng quý phi live ALONE (nobody's house is theirs) — new game, promotion,
   tuyển tú, old save (moved on load with a log line); 2) Thái hậu 51–62 and ≥ Emperor + 18, old save with 43 lifted, portrait band from her age.
   usage: node dev/test/court-rules.js <url of a build at the site root> <W>x<H>@dpr <outdir> <tag> */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */
const [,,URL,SZ,OUT,TAG]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(300000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 const boot=async()=>{await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();const kr=document.getElementById('kroul');if(kr)kr.remove()})};
 const shot=async n=>{await p.evaluate(()=>{['kroul','dawn'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()})});for(let t=0;t<3;t++){try{await p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:82,timeout:120000});return}catch(e){await p.waitForTimeout(3000)}}};
 const R={};
 await boot();
 /* audit helper in page */
 const audit=()=>p.evaluate(()=>{if(!S)return{noS:1};const solo=[S].concat(rivals).filter(x=>(x===S||x.alive&&!x.out)&&palSolo(x));
  const under=[S].concat(rivals).filter(x=>(x===S||x.alive&&!x.out)&&!solo.includes(x)).filter(x=>{const h=byKey(houseOf(x));return h&&h!==x&&solo.includes(h)||(x!==S&&palaceOf(x)==="kn")}).map(x=>x.name);
  const ea=S.emp&&S.emp.age;return{solo:solo.map(x=>`${x.name}:${rkOf(x)}`),under,kn:residents("kn").map(x=>x.name),thAge:S.thAge,empAge:ea,thOk:S.thAge>=51&&S.thAge>=ea+18,thOage:S.thO&&S.thO.age,
   thFig:typeof kitFigOf==="function"?kitFigOf(pTH()):"",thFigK:(()=>{try{return figFor({kind:"th"})}catch(e){return"ERR "+e.message}})(),thPor:(()=>{try{return figFor({kind:"th"},"por")}catch(e){return"ERR "+e.message}})(),thFace:S.thF}});
 /* 1. new games: 6 starts */
 R.fresh=[];for(let i=0;i<6;i++){R.fresh.push(await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;render();return 1}).then(audit))}
 /* 2. promotion: the strongest head becomes Hoàng quý phi with residents; tuyển tú; a year of turns */
console.log("fresh",JSON.stringify(R.fresh));
 R.promo=await p.evaluate(()=>{const heads=rivals.filter(v=>v.alive&&!v.out&&!v.queen&&v.rank>=PAL_HEAD);const h=heads[0];if(!h)return{skip:"no head"};
  const low=rivals.filter(v=>v.alive&&!v.out&&v.rank<PAL_HEAD).slice(0,2);low.forEach(v=>v.resHead=key(h));const before=low.filter(v=>houseOf(v)===key(h)).length;h.rank=6;
  const sameTurn=low.filter(v=>houseOf(v)===key(h)).length;const n0=(S.logs||[]).length;palFix();S.month=2;S.tuan=0;S.year=3;S.ttDone=0;tuyenTu();Q.length=0;
  return{hqp:h.name,before,sameTurn,after:low.filter(v=>houseOf(v)===key(h)).length,logs:(S.logs||[]).slice(0,6).map(x=>String(x.t||x).replace(/<[^>]+>/g,"").slice(0,140)).filter(t=>/dời khỏi/.test(t))}}).then(async x=>Object.assign(x,{audit:await audit()}));
 R.turns=await p.evaluate(()=>{quiet=true;let e="";for(let i=0;i<24;i++){try{nextBuoi()}catch(x){e=x.message}Q.length=0;if(S.dead)break}quiet=false;Q.length=0;['dawn'].forEach(i=>{const x=document.getElementById(i);if(x)x.remove()});document.getElementById('modal').hidden=true;render();return e}).then(async e=>({err:e,audit:await audit()}));
 /* 3. Hậu cung strip + Thái hậu card shots */
 await p.evaluate(()=>{const b=document.querySelector('#tabs [data-tab="rivals"]')||[...document.querySelectorAll('#tabs [data-tab]')].find(x=>/Hậu cung|Phi tần/.test(x.textContent));if(b)b.click()});await p.waitForTimeout(2500);await shot('haucung');
 await p.evaluate(()=>{Q.length=0;if(typeof kitCourtOpen==="function")kitCourtOpen("th")});await p.waitForTimeout(2500);await shot('thaihau');
 /* 4. old save: a low consort living under the queen, Thái hậu 43 → reload → moved with a log line, age lifted */
 R.old=await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;const q=rivals.find(v=>v.queen&&v.alive&&!v.out);const v=rivals.find(x=>x.alive&&!x.out&&!x.queen&&x.rank<PAL_HEAD);if(!q||!v)return{skip:1};
  v.resHead=key(q);S.thAge=43;if(S.thO){delete S.thO.age}if(S.emp)S.emp.age=25;SLOT=3;quiet=false;try{NLP=null}catch(e){}save();return{q:q.name,v:v.name,keys:Object.keys(localStorage),dead:!!S.dead}});console.log("saved",JSON.stringify(R.old));
 await boot();
console.log("mid",JSON.stringify(R));
 R.oldLoad=await p.evaluate(()=>{const keys=Object.keys(localStorage);document.getElementById('title').hidden=true;let ok=true;try{const d=loadSlot(3);if(!d)return{ok:"NO SAVE",keys};SLOT=3;deser(d);try{deal()}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;render()}catch(e){ok="ERR "+e.message}
  return{ok,logs:(S.logs||[]).slice(0,8).map(x=>String(x.t||x).replace(/<[^>]+>/g,"").slice(0,160)).filter(t=>/dời khỏi/.test(t))}}).then(async x=>Object.assign(x,{audit:await audit()}));
 console.log("old",JSON.stringify(R.oldLoad));await p.evaluate(()=>{if(S&&typeof kitCourtOpen==="function")kitCourtOpen("th")});await p.waitForTimeout(2500);await shot("thaihau-oldsave");
 R.hovf=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
 console.log(JSON.stringify({TAG,R,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
