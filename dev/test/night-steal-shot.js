/* review/night-steal: a STEAL moment in the card-flip scene (her card turned, an NPC takes the night on the way). Boot copied from dev/test/cardflip.js.
   usage: node dev/test/night-steal-shot.js <url> <outdir> 755x1000,1180x820 [dpr]
   (orig header) review/cardflip (KIT §67): the card-flip scene. For each viewport: a real week end (endTurn → flip → scene, her night forced through
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
  res.real=await p.evaluate(()=>{S.dead=false;S.preg=0;S.pregUnk=0;S.ill=0;S.confined=0;S.block=0;S.sung=Math.max(S.sung,40);S.ntk=null;S.ntTry=null;const R0=Math.random;Math.random=()=>0.01;
   const L=liveRivals(true).filter(v=>!v.coop);const keep=[];L.forEach((v,i)=>{keep.push([v,v.block]);v.block=i===L.length-1?0:1});const X=L[L.length-1];Object.assign(X,{preg:0,confined:0,suc:70,duc:60});X.sung=Math.min(X.sung,30);
   const kb=BAL.steal.k;BAL.steal.k=1e6;
   try{CLEAN();endTurn()}finally{Math.random=R0;BAL.steal.k=kb;keep.forEach(([v,b])=>v.block=b)}
   const d=document.getElementById('dawn');if(d){d.classList.remove('on');d.hidden=true}const ks=Q.filter(q=>q.t==="Kính sự phòng").map(q=>q.h);CLEAN();
   return{ks,first:consorts()[0]===S,tonight:S.tonight==="me"?"me":S.tonight&&S.tonight.name,why:S.nightWhy&&{pick:S.nightWhy.pick,flip0:S.nightWhy.flip0,cause:S.nightWhy.cause}}});
  console.log(v,JSON.stringify(res.real));
  await p.waitForFunction(()=>document.querySelector('.kmov.kcf'),null,{timeout:20000}).catch(async()=>console.log('NO SCENE',await p.evaluate(()=>JSON.stringify({dbg:window.__cfdbg,q:typeof KMQ!=='undefined'?KMQ.length:null,busy:typeof kmBusy!=='undefined'?kmBusy:null,modal:document.getElementById('modal').hidden}))));
  const T=await p.evaluate(()=>BAL.cardFlip.t);
  await p.evaluate(async(T)=>{const W=t=>new Promise(r=>setTimeout(r,t));const o=document.querySelector('.kmov.kcf');if(!o)return;const w=T.res+1500-(performance.now()-o.__t0);if(w>0)await W(w)},T);
  await SHOT(p,{path:`${OUT}/steal-final-${v}.jpg`});
  res.cap=await p.evaluate(()=>{const o=document.querySelector('.kmov.kcf');return o?{res:(o.querySelector('.kcf-res')||{}).textContent,hs:document.documentElement.scrollWidth>innerWidth+1}:null});
  console.log(v,JSON.stringify(res.cap),'errors',errs.length?errs.slice(0,3):0);await c.close()}
 await b.close()})();
