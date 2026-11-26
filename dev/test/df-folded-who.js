/* DF-FOLDED-WHO (MAIN 158 → act-merge J2, OB-OAN proof): a card whose «who» is a person folded into the stage «+N» (token display:none) must show as the
   centre modal (no figure on screen to play an encounter on); a person whose token IS on screen still gets the in-scene encounter (jdfv). Real game, HOST mode,
   device profiles of dev/test/lib/device.js. usage: node dev/test/df-folded-who.js [fold|ipadAir ...]   exit 1 on any FAIL.
   Checks per device: (A) every token the stage hides counts as no figure (dfHasFig false) — real «+N» overflow when the place has one;
   (B) forced fold of a consort's token: a choice card with her as «who» → #modal visible with its options; (C) same card, token visible → encounter (modal hidden, DF.F). */
const {chromium}=require('playwright');const D=require('./lib/device');
(async()=>{const devs=process.argv.slice(2).length?process.argv.slice(2):['fold','ipadAir'];const F=[];const srv=await D.serveRoot();
 const b=await chromium.launch({args:['--disable-dev-shm-usage'],proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});
 for(const dev of devs){const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:120000});await p.waitForTimeout(2000);
  await g.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
  await g.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known,null,{timeout:120000});await p.waitForTimeout(3000);
  const clear=async()=>{for(let k=0;k<10;k++){const any=await g.evaluate(()=>{const M=document.getElementById('modal');if(M.hidden)return false;const c=document.getElementById('mclose');if(c){c.click();return true}const o=[...M.querySelectorAll('.opts button:not(:disabled)')];const x=o.find(y=>/Đi một mình|Bỏ qua|Đã hiểu/.test(y.textContent))||o[o.length-1];if(x){x.click();return true}return false});if(!any)break;await p.waitForTimeout(600)}};
  for(let k=0;k<4;k++){await g.evaluate(()=>{const x=[...document.querySelectorAll('button')].find(y=>/^Bỏ qua$/.test(y.textContent.trim())&&y.offsetParent);if(x)x.click()});await p.waitForTimeout(1000)}
  await g.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;S.out=false;try{k61Know(rivals.filter(v=>v.alive),"",true,3)}catch(e){}tab="act";used=0;render();goTo("vuon")});await p.waitForTimeout(800);await clear();await p.waitForTimeout(1500);await clear();
  const R=await g.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const out={};Q.length=0;showModal();used=0;render();await sleep(400);
   /* (A) real overflow: every person whose token is hidden or absent has no figure */
   if(!S.visit)S.visit={k:S.place,people:[],talked:false,tk:{},msg:"",cap:{}};const P=curPeople();out.A=[];P.forEach((q,i)=>{const t=document.querySelector(`#tokens .tok[data-p="${i}"]`);const vis=!!t&&t.getBoundingClientRect().width>0&&getComputedStyle(t).display!=='none';if(!vis&&dfHasFig(i))out.A.push(i+':'+q.name)});
   out.n=P.length;out.hidden=P.filter((q,i)=>{const t=document.querySelector(`#tokens .tok[data-p="${i}"]`);return !t||t.getBoundingClientRect().width===0}).length;
   let i=P.findIndex((q,j)=>q.kind==='rival'&&q.ref&&dfHasFig(j));if(i<0)i=P.findIndex(q=>q.kind==='rival'&&q.ref);if(i<0){if(!S.visit)S.visit={k:S.place,people:[],talked:false,tk:{},msg:"",cap:{}};const v=rivals.find(x=>x.alive&&!x.out&&!x.queen);S.visit.people.push(rp(v));render();await sleep(500);i=curPeople().length-1}
   const v=curPeople()[i].ref;out.who=v.name;const card=()=>({t:'Thử',h:'<p>Thử thẻ có người đứng.</p>',who:WHO(['r',v.id]),opts:[{n:'Một',fx:{}},{n:'Hai',fx:{}}]});
   const tok=()=>document.querySelector(`#tokens .tok[data-p="${i}"]`);
   /* (C) visible token → encounter (only when her figure is drawn) */
   out.visFig=dfHasFig(i);
   if(out.visFig){pushModal(card());showModal();await sleep(1200);const M=document.getElementById('modal');out.C={modalShown:!M.hidden,scene:!!(window.DF&&DF.F)};Q.length=0;try{if(DF.F)dfGone()}catch(e){}showModal();await sleep(300)}
   /* (B) fold her token as the «+N» overflow does (display:none) → centre modal */
   const t=tok();if(t)t.style.display='none';out.foldFig=dfHasFig(i);pushModal(card());showModal();await sleep(1200);const M=document.getElementById('modal');
   out.B={modalShown:!M.hidden,opts:[...M.querySelectorAll('.opts button')].length,scene:!!(window.DF&&DF.F)};
   return out});
  console.log(dev,JSON.stringify(R));
  if(R.A.length)F.push(`${dev} A: hidden token counted as figure ${R.A.join(',')}`);
  if(R.foldFig)F.push(`${dev} B: folded token still dfHasFig`);
  if(!R.B.modalShown||R.B.opts<2)F.push(`${dev} B: folded «who» card not shown as centre modal (${JSON.stringify(R.B)})`);
  if(R.C&&!(R.C.scene&&!R.C.modalShown))F.push(`${dev} C: visible «who» card did not play in the scene (${JSON.stringify(R.C)})`);
  if(errs.length)F.push(`${dev} page errors: ${errs.slice(0,3).join(' | ')}`);
  await ctx.close()}
 await b.close();try{srv.close()}catch(e){}
 console.log(F.length?'FAIL '+F.length+'\n  '+F.join('\n  '):'PASS df-folded-who (A hidden token = no figure · B folded «who» → centre modal · C visible «who» → scene)');process.exit(F.length?1:0)})();
