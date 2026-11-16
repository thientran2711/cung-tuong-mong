/* Pet lifespan bot + UI (jpetlife). usage: node dev/test/pet-life-bot.js <baseURL> <W>x<H>@dpr <outdir> <tag> [oldsave.json] [--bot]
   --bot: RUNS × one kiếp (KIEP_Y years of weeks) of petWeek() on the real game, her pets with GOOD care vs ORDINARY care (kept above the
   neglect line), an NPC consort's pets under jpetcare's own NPC care; reports deaths by species (age at death), Già share, care years vs
   BAL.pet.life.dice[g].careMax (hard ceiling), Thái hậu unchanged when her gift pet dies of old age, perf (ms per petWeek on/off).
   Without --bot: UI shots — pet card + care screen of a Già pet, the "đã già" card, the farewell card; overflow / cut audit; page errors.
   oldsave.json (dev/test/mk-oldsave-pets.js): pets without age load, get a lifespan, none dies at once. Boot as dev/test/pets.js. */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,SZ,OUT,TAG,OLD0,F]=process.argv;const OLD=OLD0&&OLD0!=='--bot'?OLD0:null;const BOT=process.argv.includes('--bot');
const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);const RUNS=+process.env.RUNS||12,KIEP_Y=+process.env.KIEP_Y||30;
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:true});
 await ctx.addInitScript(()=>{window.__nlInner=1;addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='#kroul,#kload,.krbox{display:none!important}';document.head.appendChild(s)})});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const shot=async n=>{await p.waitForFunction(()=>[...document.querySelectorAll('#modal img')].every(i=>i.complete),null,{timeout:15000}).catch(()=>{});await p.waitForTimeout(300);await p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:80})};
 const audit=n=>p.evaluate(n=>{const vw=innerWidth,bad=[];document.querySelectorAll('#panel *, #modal .dlg *').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||e.closest('.kcattabs,.pctabs'))return;
   if(r.right>vw+1||r.left<-1)bad.push('x:'+(String(e.className)||e.tagName).slice(0,40));const cs=getComputedStyle(e);if(cs.textOverflow==='ellipsis'&&e.scrollWidth>e.clientWidth+1)bad.push('ell:'+e.className)});
  const imgs=[...document.querySelectorAll('#modal img')].filter(i=>i.complete&&i.naturalWidth===0).map(i=>i.src.slice(-40));return{n,ovX:document.documentElement.scrollWidth>vw,bad:[...new Set(bad)].slice(0,8),broken:imgs}},n);
 const clearQ=()=>p.evaluate(()=>{document.querySelectorAll('.kmov').forEach(e=>e.remove());Q.length=0;try{closeModal()}catch(e){}try{$("modal").hidden=true}catch(e){}});
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);const R={TAG};
 if(OLD){const d=fs.readFileSync(OLD,'utf8');R.oldsave=await p.evaluate(d=>{try{localStorage.setItem('hclh-save-v2-2',d);const x=loadSlot(2);if(!x)return'noload';SLOT=2;quiet=true;deser(x);quiet=false;document.getElementById('title').hidden=true;
   const a=(S.pets||[]).map(P=>({t:P.t,at:P.at,life:P.life,old:P.old}));window.__bot=1;for(let i=0;i<6;i++){for(const P of S.pets){P.full=P.clean=P.joy=80;petcSync(P)}petWeek()}window.__bot=0;/* care kept: the neglect rule (jpetcare) is not under test */
   return{pets:a,after:(S.pets||[]).map(P=>P.t+':'+P.life+'y'),deadOld:(S.petDl||[]).length}}catch(e){return'ERR '+e.message}},d);
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500)}
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}window.__kroulKey=null;start()});await p.waitForTimeout(2500);
 await p.evaluate(()=>{for(let i=0;i<20&&(S.origin.k==='cnv'||(typeof isSrv==='function'&&isSrv()));i++){try{store.set(NL_KEY,null)}catch(e){}start()}const k=document.getElementById('kroul');if(k)k.remove();window.kmPush=function(){};
  document.querySelectorAll('.kmov').forEach(e=>e.remove());Q.length=0;showModal();S.inv=[];S.pets=[];S.petOn=-1;S.petTip=1;S.rank=3;S.bac=600;render()});
 if(BOT){R.bot=await p.evaluate(({RUNS,KIEP_Y})=>{window.__bot=1;const L=BAL.pet.life,wY=L.wY,mine=["meomuop","hoami","cavang","hac","cuuvi","kylan"],npcs=["tho","sao","cachep","phuong","bachloc"];
   const v=liveRivals(true)[0];const T0={turn:S.turn,tuan:S.tuan};const out={};const add=(who,care,k,a)=>{const key=`${who}|${care}|${k}`;(out[key]=out[key]||[]).push(a)};
   let ceil=0,thBad=0,old=0,tot=0,ms=0,calls=0;const pm0=petMax;petMax=()=>20;/* the bot keeps every species at once (slots are not under test) */
   for(const care of ["good","ordinary"])for(let r=0;r<RUNS;r++){S.turn=T0.turn;S.tuan=0;S.pets=[];S.petOn=-1;v.pets=[];v.petOn=-1;S.petDl=[];
    for(const k of mine){const P=petAdd(S,k,"bot",k==="kylan"?"th":"buy");if(P)P.stg=2}for(const k of npcs){const P=petAdd(v,k,"bot","buy");if(P)P.stg=2}
    const born=S.turn*3;const th0=S.th;const seen=new Set();
    for(let w=0;w<KIEP_Y*wY;w++){const t=born+w;S.turn=Math.floor(t/3);S.tuan=t%3;
     for(const P of S.pets){if(care==="good"){P.full=P.clean=P.joy=90;P.aff=85}else{P.full=P.clean=P.joy=55;P.aff=40}petcSync(P)}
     for(const P of v.pets){P.full=Math.max(P.full,40);P.clean=Math.max(P.clean,40);P.joy=Math.max(P.joy,40);petcSync(P)}/* NPC keeps them above neglect (jpetcare NPC care feeds them too) */
     const t1=performance.now();petWeek();ms+=performance.now()-t1;calls++;
     for(const P of S.pets.concat(v.pets)){if(P.old)seen.add(P);if((P.lifeX||0)>L.dice[L.grp[petK(P.t)]].careMax)ceil++}}
    for(const d of S.petDl)add(d.who,care,d.k,d.a);for(const P of S.pets)add("me",care,P.t,"alive");for(const P of v.pets)add("npc",care,P.t,"alive");
    old+=seen.size;tot+=mine.length+npcs.length;if(S.pets.every(P=>P.t!=="kylan")&&S.th!==th0)thBad++}
   petMax=pm0;L.on=0;const t2=performance.now();for(let i=0;i<300;i++)petWeek();const off=(performance.now()-t2)/300;L.on=1;S.turn=T0.turn;S.tuan=T0.tuan;window.__bot=0;
   const rows=Object.entries(out).map(([k,a])=>{const [who,care,sp]=k.split('|');const d=a.filter(x=>x!=="alive");const c=L.dice[L.grp[sp]];
    return{who,care,sp,g:L.grp[sp],dead:d.length,alive:a.length-d.length,meanAge:d.length?(d.reduce((x,y)=>x+y,0)/d.length).toFixed(1):"-",min:d.length?Math.min(...d):"-",lo:c.lo,hi:c.hi+c.careMax,belowLo:d.filter(x=>x<c.lo).length}});
   return{rows,careCeilingBroken:ceil,thaiHauChangedOnOldAgeDeath:thBad,reachedGia:`${old}/${tot}`,msPerWeekOn:(ms/calls).toFixed(3),msPerWeekOff:off.toFixed(3),keepsakes:S.inv.filter(e=>e.k==="petkv").length,npcKeepsakes:(v.inv||[]).filter(e=>e.k==="petkv").length}},{RUNS,KIEP_Y})}
 else{/* UI: a crane at Già (old, far from its end) in slot 0, a cat about to die in slot 1 */
  await clearQ();R.ui=await p.evaluate(()=>{const L=BAL.pet.life;const a=petAdd(S,"hac","Thái hậu ban","th");const c=petAdd(S,"meo","nhờ thái giám mua","buy");
   const w=tsbWk();a.stg=3;a.at=w-L.dice.hac.old*L.wY-5;a.life=40;a.lifeW=0;a.lifeY=L.dice.hac.old;a.old=1;c.stg=2;c.at=w-11*L.wY;c.life=11;c.lifeW=1;c.lifeY=11;c.old=1;
   render();return{rows:petRowsL(a,0).map(r=>r[0]+": "+[].concat(r[1]).join(" ").replace(/<[^>]+>/g,"")).slice(0,6)}});
  await clearQ();await p.evaluate(()=>{((document.querySelector('#panel .keq')&&document.getElementById('panel').getBoundingClientRect().height>50)||document.querySelector('#tabs [data-tab=inv]').click())});await p.waitForTimeout(800);
  await clearQ();await p.evaluate(()=>document.querySelector('#panel [data-keqk="pets"][data-keqi="0"]').click());await p.waitForTimeout(900);await shot('01-gia-card');R.a1=await audit('gia-card');
  await clearQ();await p.evaluate(()=>petcOpen(0));await p.waitForTimeout(1000);await shot('02-gia-care');R.a2=await audit('gia-care');
  R.topAtBars=await p.evaluate(()=>{const b=document.querySelector('#kpcare');if(!b)return'no kpcare';const r=b.getBoundingClientRect();const e=document.elementFromPoint(r.left+r.width/2,r.top+20);let s='';for(let x=e,i=0;x&&i<5;x=x.parentElement,i++)s+=x.tagName+'.'+String(x.className).slice(0,40)+'#'+x.id+' < ';return s});
  R.careSub=await p.evaluate(()=>(document.querySelector('#modal .dlg')||{}).innerText.slice(0,160));
  await clearQ();await p.evaluate(()=>{const P=S.pets[0];P.old=0;P.lifeY=BAL.pet.life.dice.hac.old;petWeek()});await p.waitForTimeout(900);await shot('03-old-card');R.a3=await audit('old-card');
  await clearQ();const th0=await p.evaluate(()=>S.th);await p.evaluate(()=>{const c=S.pets[1];c.at=tsbWk()-c.life*BAL.pet.life.wY-2;petWeek()});await p.waitForTimeout(1000);await shot('04-farewell');R.a4=await audit('farewell');
  R.after=await p.evaluate(th0=>({pets:S.pets.map(P=>P.t),kv:S.inv.filter(e=>e.k==="petkv").map(e=>iname(e)),thSame:S.th===th0,dl:S.petDl,text:(document.querySelector('#modal .dlg')||{}).innerText}),th0);
  /* a Ngự tứ that dies: its shield goes with it, nothing given back */
  await clearQ();R.divine=await p.evaluate(()=>{window.__bot=1;const P=petAdd(S,"bachloc","Thu săn","hunt");P.stg=3;P.life=30;P.lifeW=0;P.at=tsbWk()-30*BAL.pet.life.wY;const before=petRescuer(S);petWeek();window.__bot=0;return{rescuerBefore:before,rescuerAfter:petRescuer(S),has:S.pets.some(x=>x.t==="bachloc")}})}
 /* co-op: NPC pets die on the host only (seat a); the guest (seat b) mirrors */
 if(!BOT)R.coop=await p.evaluate(()=>{window.__bot=1;const v=liveRivals(true)[0];const end=P=>{P.life=5;P.lifeW=0;P.at=tsbWk()-5*BAL.pet.life.wY-1};v.pets=[];v.petOn=-1;const P=petAdd(v,"tho","bot","buy");end(P);
  window.COOPW={on:1,seat:"b"};petWeek();const guest=v.pets.length;window.COOPW={on:1,seat:"a"};petWeek();const hostLeft=v.pets.length;window.COOPW=undefined;window.__bot=0;return{guestKeeps:guest,hostLeft}});
 R.errs=errs.slice(0,6);console.log(JSON.stringify(R,null,1));await b.close()})();
