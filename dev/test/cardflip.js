/* review/cardflip (KIT §67): the card-flip scene. For each viewport: a real week end (endTurn → flip → scene, her night forced through
   j8's own flip by making only her card eligible), frames at each beat, a 20-card + 2-card demo, reduced-motion still, tap-skip, old save.
   Checks: cards inside the tray floor, picked card inside the screen, no horizontal overflow, no page errors, scene shows j75's real pick.
   usage: node dev/test/cardflip.js <url> <outdir> 755x1000,1000x755,1180x820,1366x1024,844x390 [dpr] [shots: all|few] */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,OUT,VPS,DPR,SH]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));const ALL=SH==='all';
const SHOT=async(p,o)=>{for(let i=0;i<3;i++){try{await p.screenshot(Object.assign({timeout:150000,type:'jpeg',quality:62},o));return}catch(e){console.error('shot retry',o.path)}}};
const CLEAN=()=>{Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('[id^=kroul],.kroul,#kload').forEach(e=>e.remove());const d=document.getElementById('dawn');if(d){d.classList.remove('on');d.hidden=true}document.querySelectorAll('.kmov').forEach(e=>e.remove());if(window.KMQ)KMQ.length=0;render()};
const GEOM=()=>{const ov=document.querySelector('.kmov.kcf');if(!ov)return null;const w=ov.querySelector('.kcf-w').getBoundingClientRect();const C=BAL.cardFlip,Pl=C.plates[innerWidth/innerHeight<C.portraitBelow?'p':'l'];const F=ov.querySelector('.kcf-w').classList.contains('kcf-on-b')?Pl.fb:Pl.fa;
 const fl={l:w.left+w.width*F.x0,t:w.top+w.height*F.y0,r:w.left+w.width*F.x1,b:w.top+w.height*F.y1};
 const cs=[...ov.querySelectorAll('.kcf-c:not(.kcf-gone):not(.kcf-pick)')].map(e=>e.getBoundingClientRect());
 const out=cs.filter(r=>r.left<fl.l-1||r.right>fl.r+1||r.top<fl.t-1||r.top+r.width*1037/550*0.72>fl.b+2).length;  /* the frame body (to the band) lies on the floor; the tassel may hang over the rim */
 const pk=ov.querySelector('.kcf-pick');const pr=pk&&pk.getBoundingClientRect();
 return{n:cs.length,out,cw:cs[0]?Math.round(cs[0].width):0,pick:pr?[pr.left,pr.top,pr.right,pr.bottom].map(Math.round):null,pickOff:pr?(pr.left<0||pr.top<0||pr.right>innerWidth+1||pr.bottom>innerHeight+1):null,
  fin:ov.dataset.fin||'',t:Math.round(performance.now()-ov.__t0),hscroll:document.documentElement.scrollWidth>innerWidth+1,res:(ov.querySelector('.kcf-res')||{}).textContent||'',cap:(ov.querySelector('.kcf-cap')||{}).textContent||'',
  resOverPick:(()=>{const r=ov.querySelector('.kcf-res .kmres');if(!r||!pr)return false;const q=r.getBoundingClientRect();return q.top<pr.bottom-pr.height*.12&&q.left<pr.right&&q.right>pr.left})()}};
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});
 const vps=(VPS||'755x1000').split(',');const R={};
 for(const v of vps){const [W,H]=v.split('x').map(Number);const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),hasTouch:true});const p=await c.newPage();const errs=[];
  p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR/.test(m.text()))errs.push('console: '+m.text())});
  await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.addStyleTag({content:'.modal.kload,#kload{display:none!important}'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:120000});await sleep(2000);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
  for(let i=0;i<40;i++){await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name,null,{timeout:90000});if(!(await p.evaluate(()=>isSrv())))break;await p.evaluate(()=>{S=null;start()})}
  /* the palace scene now waits for the Luân hồi identity card (review/flip-newlife): accept it like a player */
  for(let i=0;i<60&&await p.evaluate(()=>typeof NLP!=='undefined'&&!!NLP);i++){await p.evaluate(()=>{const s=[...document.querySelectorAll('#kroul button,.kroul button')].find(x=>/Bỏ qua/.test(x.textContent));if(s)s.click();const b=document.querySelector('button[data-nl="ok"]');if(b)b.click()});await p.waitForTimeout(300)}
  for(let i=0;i<30;i++){await sleep(600);const k=await p.evaluate(()=>{const r=document.querySelector('[id^=kroul],.kroul,.kbd-roulette');if(!r)return 0;const bs=[...r.querySelectorAll('button')];const b=bs.find(x=>/Bỏ qua/.test(x.textContent))||bs.find(x=>/Tiếp|Vào|Nhập/.test(x.textContent))||bs[0];if(b)b.click();else r.click();return 1});if(!k)break}
  await sleep(600);await p.evaluate(([s,g])=>{window.CLEAN=eval('('+s+')');window.GEOM=eval('('+g+')')},[CLEAN.toString(),GEOM.toString()]);await p.evaluate(CLEAN);const res={};
  for(let i=0;i<40;i++){const busy=await p.evaluate(()=>{const o=document.querySelector('.kmov');if(o){o.click();const kb=o.querySelector('.kmend');if(kb)kb.click()}const d=document.getElementById('dawn');if(d){d.classList.remove('on');d.hidden=true}return !!o||kmBusy||KMQ.length>0});if(!busy)break;await sleep(700)}await p.evaluate(CLEAN);
  /* A · a real week end: only her card can be turned (others barred by a hidden tablet), the flip roll forced */
  res.real=await p.evaluate(()=>{S.dead=false;S.preg=0;S.pregUnk=0;S.ill=0;S.confined=0;S.block=0;S.sung=Math.max(S.sung,40);const R0=Math.random;Math.random=()=>0.01;
   const keep=[];for(const v of liveRivals(true)){keep.push([v,v.block]);v.block=1}let nc=0;try{nc=nightCh(S)}catch(e){}
   try{CLEAN();endTurn()}finally{Math.random=R0;keep.forEach(([v,b])=>v.block=b)}
   const d=document.getElementById('dawn');if(d){d.classList.remove('on');d.hidden=true}
   return{nc,tonight:S.tonight==="me"?"me":S.tonight&&S.tonight.id,why:S.nightWhy&&{pick:S.nightWhy.pick,flip0:S.nightWhy.flip0,cause:S.nightWhy.cause,n:S.nightWhy.rows.length,bar:S.nightWhy.rows.filter(r=>!(r.w>0)).length}}});
  await p.waitForFunction(()=>document.querySelector('.kmov.kcf'),null,{timeout:20000}).catch(async()=>{console.log('NO SCENE',await p.evaluate(()=>JSON.stringify({q:KMQ.length,busy:kmBusy,dawn:(document.getElementById('dawn')||{}).className,dh:(document.getElementById('dawn')||{}).hidden,kbk:document.querySelectorAll('.kbk').length,title:document.getElementById('title').hidden,dbg:window.__cfdbg,kmov:[...document.querySelectorAll('.kmov,#kmrew,#kpodov,[id^=kroul],.kroul-ov')].map(e=>e.id+'.'+e.className)})))});
  res.realGeom=await p.evaluate(async()=>{const T=BAL.cardFlip.t;const beats=[['1-lit',T.in+500],['2-grey',T.lift+250],['3-arranged',T.carry-50],['4-carry',T.carry+550],['5-hand',T.lift2+150],['6-centre',T.res-100],['7-final',T.res+1300]];
   const W=t=>new Promise(r=>setTimeout(r,t));let o=null;for(let i=0;i<400&&!o;i++){o=document.querySelector('.kmov.kcf');if(!o)await W(50)}if(!o)return{none:window.__cfdbg};
   const G={};for(const [k,at] of beats){const w=at-(performance.now()-o.__t0);if(w>0)await W(w);G[k]=GEOM()}return G});
  if(ALL){await p.evaluate(()=>cfDemo(14,3,'me'));await p.waitForFunction(()=>document.querySelector('.kcf-hand.on'),null,{timeout:30000,polling:50}).catch(()=>{});await SHOT(p,{path:`${OUT}/hand-${v}.jpg`});await p.evaluate(()=>{const o=[...document.querySelectorAll('.kmov.kcf')].pop();o.click()});await sleep(1200);await SHOT(p,{path:`${OUT}/final-me-${v}.jpg`});await p.evaluate(CLEAN)}
  res.realPlan=await p.evaluate(()=>window.cfLast||null);
  await p.evaluate(()=>{const o=document.querySelector('.kmov.kcf');if(o){o.click();const kb=o.querySelector('.kmend');if(kb)kb.click()}});await sleep(600);
  /* B · demos: 20+ cards (another woman picked), 2 cards (hers); tap-skip lands on the final still */
  await p.evaluate(CLEAN);await sleep(400);await p.evaluate(CLEAN);await p.evaluate(()=>cfDemo(22,6,3));await p.waitForFunction(()=>{const o=document.querySelector('.kmov.kcf');return o&&performance.now()-o.__t0>=BAL.cardFlip.t.carry*.82+200},null,{timeout:30000,polling:50}).catch(()=>{});res.d22=await p.evaluate(GEOM);if(ALL)await SHOT(p,{path:`${OUT}/demo22-arr-${v}.jpg`});
  res.d22n=await p.evaluate(()=>document.querySelectorAll('.kmov').length);await p.evaluate(()=>[...document.querySelectorAll('.kmov.kcf')].pop().click());await sleep(700);res.d22f=await p.evaluate(GEOM);res.d22btn=await p.evaluate(()=>{const b=document.querySelector('.kmov.kcf .kmend');return b?b.textContent:null});await sleep(6000);res.d22still=await p.evaluate(()=>!!document.querySelector('.kmov.kcf'));  /* the scene must still be open (no auto-close) */await SHOT(p,{path:`${OUT}/demo22-final-${v}.jpg`});
  await p.evaluate(()=>{const o=document.querySelector('.kmov.kcf');if(o){o.click();const kb=o.querySelector('.kmend');if(kb)kb.click()}});await sleep(500);
  await p.evaluate(CLEAN);await p.evaluate(()=>cfDemo(2,0,'me'));await sleep(1500);res.d2=await p.evaluate(GEOM);
  await p.evaluate(()=>document.querySelector('.kmov.kcf').click());await sleep(800);res.d2f=await p.evaluate(GEOM);if(ALL)await SHOT(p,{path:`${OUT}/demo2-final-${v}.jpg`});
  await p.evaluate(()=>{const o=document.querySelector('.kmov.kcf');if(o){o.click();const kb=o.querySelector('.kmend');if(kb)kb.click()}});await sleep(500);
  /* C · reduced motion: final still at once */
  await p.emulateMedia({reducedMotion:'reduce'});await p.evaluate(CLEAN);await p.evaluate(()=>cfDemo(12,3,'me'));await sleep(900);res.rm=await p.evaluate(()=>({fin:!!document.querySelector('.kmov.kcf.kcf-fin'),red:!!document.querySelector('.kmov.kcf.km-red'),pts:document.querySelectorAll('.kcf-pt').length}));
  if(ALL)await SHOT(p,{path:`${OUT}/rm-${v}.jpg`});await p.emulateMedia({reducedMotion:'no-preference'});await p.evaluate(CLEAN);
  /* D · an old save (no S.nightWhy.flip0) still plays: delete the field and end a week */
  res.old=await p.evaluate(()=>{if(S.nightWhy)delete S.nightWhy.flip0;const s=ser();quiet=true;try{deser(s)}finally{quiet=false}CLEAN();endTurn();const d=document.getElementById('dawn');if(d){d.classList.remove('on');d.hidden=true}return{ok:!!S&&!S.dead,why:!!S.nightWhy}});
  await sleep(1500);res.oldScene=await p.evaluate(()=>!!document.querySelector('.kmov.kcf')||!S.nightWhy||!S.nightWhy.rows.length);
  res.errs=errs;R[v]=res;console.log(v,JSON.stringify(res));await c.close()}
 fs.writeFileSync(`${OUT}/result.json`,JSON.stringify(R,null,1));await b.close()})();
