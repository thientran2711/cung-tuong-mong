/* review/slap-mg: tiered Tát (jslap + jface). usage: node dev/test/slap-mg.js <page url> <WxH> <outdir> [N slaps for the tier spread, default 0]
   Prints JSON {sizes, spread, npc, costs, dodge, errs}. Screenshots: <outdir>/slap-<WxH>-*.jpg */
const {chromium}=require('playwright');const [,,URL,SZ,OUT,NN]=process.argv;const [W,H]=SZ.split('x').map(Number);const N=+(NN||0);
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const ctx=await b.newContext({viewport:{width:W,height:H},serviceWorkers:'block',hasTouch:W<1100,isMobile:W<1100});
 const p=await ctx.newPage();p.setDefaultTimeout(60000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.waitForTimeout(5000);
 await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important}'});
 for(let i=0;i<3;i++){await p.mouse.click(W/2,H/2);await p.waitForTimeout(700)}
 const R={sizes:SZ};
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,.kroul').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;window.together=()=>true;window.__rkS=6;const rk0=rkOf;window.rkOf=p=>p===S?window.__rkS:rk0(p);S.suc=90;S.duc=60;
  const v=liveRivals(true).sort((a,b)=>rkOf(a)-rkOf(b))[0];window.__v=v;v.rank=1;v.queen=false;try{S.met=S.met||{};S.met[v.id]=1;window.kitKnown=()=>true}catch(e){}render()});
 const idx=await p.evaluate(()=>rivals.indexOf(window.__v));
 const shot=async n=>{await p.screenshot({path:`${OUT}/slap-${SZ}-${n}.jpg`,type:'jpeg',quality:70})};
 const play=async(mode)=>{ /* mode: 'skip' | 'tap' (random time) | 'tapnow' */
  await p.evaluate(i=>{used=0;Q.length=0;window.__v.slap=null;SLAPG.busy=0;doAct(i,'tat')},idx);await p.waitForSelector('#kg82go',{timeout:30000,state:'attached'});
  if(mode==='skip'){await p.click('#kg82skip')}else{await p.click('#kg82go');if(mode==='skilled'){await p.waitForFunction(()=>KG82.peek&&KG82.peek(),null,{timeout:4000,polling:20}).catch(()=>{})}else await p.waitForTimeout(Math.random()*3300);await p.evaluate(()=>{if(window.__slapTap)window.__slapTap()})}
  await p.waitForFunction(()=>!document.getElementById('kg82'),null,{timeout:12000});await p.waitForTimeout(150);
  return p.evaluate(()=>({sev:window.__v.slap?window.__v.slap.sev:0}))};
 /* screenshots: intro card, mid game, three marks on the portrait, dodge card */
 await p.evaluate(i=>{used=0;doAct(i,'tat')},idx);await p.waitForSelector('#kg82go');await shot('1-intro');
 R.introText=await p.evaluate(()=>document.getElementById('kg82').innerText.slice(0,400));
 R.introOverflow=await p.evaluate(()=>{const d=document.getElementById('kg82');return d.scrollWidth>d.clientWidth+2||document.documentElement.scrollWidth>innerWidth});
 await p.click('#kg82go');await p.waitForTimeout(900);await shot('2-bar');
 R.barOverflow=await p.evaluate(()=>{const c=document.querySelector('#kg82 canvas');const r=c&&c.getBoundingClientRect();return{canvas:r?[Math.round(r.width),Math.round(r.height),Math.round(r.bottom)]:null,vh:innerHeight,x:document.documentElement.scrollWidth>innerWidth}});
 await p.evaluate(()=>{window.__slapTap&&window.__slapTap()});await p.waitForFunction(()=>!document.getElementById('kg82'),null,{timeout:12000});
 /* marks: render each tier on the same face (kitPortrait lg) in a clean strip */
 await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;SLAPG.busy=0});
 R.marks=await p.evaluate(async()=>{const v=window.__v,o=[];const strip=document.createElement('div');strip.id='slapstrip';strip.style.cssText='position:fixed;left:0;top:0;right:0;z-index:99999;background:#f4e6c8;display:flex;gap:8px;padding:8px;justify-content:center';
  for(const s of [0,1,2,3]){v.slap=s?{sev:s,until:wk()+5,by:'me',at:wk()}:null;const h=kitPortrait(v,{size:'lg'});const c=document.createElement('div');c.style.cssText='width:'+Math.min(180,innerWidth/4-12)+'px';c.innerHTML=h+'<div style="text-align:center;font:12px sans-serif">'+['không','nhẹ','vừa','nặng'][s]+'</div>';strip.appendChild(c);o.push({s,layers:(h.match(/kslap|kswell/g)||[]).length,cls:(h.match(/kslap s\d/)||[''])[0]})}
  document.body.appendChild(strip);v.slap=null;await new Promise(r=>setTimeout(r,1800));return o});
 await shot('3-marks');await p.evaluate(()=>{const e=document.getElementById('slapstrip');e&&e.remove()});
 /* costs per tier from the real act */
 R.costs=await p.evaluate(()=>{const v=window.__v,o=[];for(const s of [1,2,3]){v.slap=null;SLAP.next=s;const d0=S.duc,a0=v.aff!==undefined?v.aff:0,ev0=S.__x;const k=key(S);const rel0=aff(v,S),oan0=S.ro[v.id]||0,oanv=v.oan||0;const r=runAct(S,v,'tat');o.push({s,duc:S.duc-d0,wks:v.slap?v.slap.until-wk():0,sev:v.slap&&v.slap.sev,rel:aff(v,S)-rel0,txt:r.replace(/<[^>]+>/g,'').slice(0,160)});v.slap=null}return o});
 /* NPC dodge */
 await p.evaluate(()=>{used=0;Q.length=0;document.getElementById('modal').hidden=true;const v=window.__v;v.rank=6;window.__rkS=2;S.slap=null;window.__sevForce=0;runAct(v,S,'tat');showModal()});
 await p.waitForTimeout(500);await shot('4-dodge-card');R.dodgeCard=await p.evaluate(()=>document.getElementById('modal').innerText.slice(0,300));
 await p.evaluate(()=>document.querySelector('#modal .opt[data-m="0"]').click());await p.waitForSelector('#kg82go',{timeout:30000,state:'attached'});await shot('5-dodge-intro');await p.click('#kg82go');await p.waitForTimeout(700);await shot('6-dodge-bar');
 await p.waitForFunction(()=>!document.getElementById('kg82'),null,{timeout:12000});await p.waitForTimeout(400);R.dodgeEnd={slap:await p.evaluate(()=>S.slap?S.slap.sev:0),modal:await p.evaluate(()=>document.getElementById('modal').innerText.slice(0,200))};await shot('7-dodge-result');
 R.npc=await p.evaluate(()=>{const v=window.__v,o={};for(const g of [1,2,3]){window.__rkS=1;v.rank=1+g;const c=[0,0,0,0];for(let i=0;i<2000;i++)c[slapNpcTier(v)]++;o['gap'+g]=c.slice(1).map(x=>Math.round(x/20))}return o});
 if(N){await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;window.__rkS=6;window.__v.rank=1;window.__v.slap=null;S.slap=null});const c={skip:[0,0,0,0],tap:[0,0,0,0],skilled:[0,0,0,0]};
  let done=0;try{for(let i=0;i<N;i++){const m=i%10===0?'skip':i%10===5?'skilled':'tap';const r=await play(m);c[m][r.sev]++;done++}}catch(e){R.spreadErr=String(e.message).slice(0,80)}R.spread=c;R.spreadDone=done}
 R.errs=errs;console.log(JSON.stringify(R));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
