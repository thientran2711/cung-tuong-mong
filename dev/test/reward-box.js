/* Imperial / given rewards come in their BOX (kitReward chest / tray / royal / gift box), never a silent add or a bare kitGain pop
   (owner 08:20Z + 17:24Z "Hoàng thượng ban thưởng tranh cổ" with no chest). review/game-feel-r6.
   usage: node dev/test/sw-serve.js 8955 <repo root>  (another shell);  node dev/test/reward-box.js http://localhost:8955/ <outdir>
   Each case: which kitReward boxes (kind, title, from, item names) and which kitGain reveals answered the adds. Exit 1 on a miss. */
const {chromium}=require('playwright');const fs=require('fs');const [,,BASE,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitGain,null,{timeout:180000});
 await p.waitForFunction(()=>!document.getElementById('kload')||(window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)),null,{timeout:240000}).catch(()=>{});
 const R=await p.evaluate(async()=>{const wait=t=>new Promise(o=>setTimeout(o,t));
  document.querySelectorAll('#kload').forEach(e=>e.remove());SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;
  document.querySelectorAll('[id^=kroul],#dawn,.kmov').forEach(e=>e.remove());render();await wait(300);
  const box=[];const o=window.kitReward;window.kitReward=function(s){if(!KFX.inBest)box.push({kind:s.kind,title:s.title,from:s.from,items:(s.items||[]).map(i=>i.n+'|'+i.tier+'|'+(i.img?'pic':'NOPIC')),bac:s.bac||0});return o.apply(this,arguments)};
  const drain=async()=>{for(let i=0;i<30;i++){const v=document.querySelector('.kmov');if(!v){await wait(150);if(!document.querySelector('.kmov')&&!(window.KMQ&&KMQ.length))break;continue}v.click();await wait(300)}};
  const out=[];const step=async(name,fn)=>{const b0=box.length,g0=(KFX.gains||[]).length,n0=S.inv.length;let err='';try{fn()}catch(e){err=e.message}Q.length=0;document.getElementById('modal').hidden=true;render();await wait(400);
   const added=S.inv.slice(n0).map(x=>(IT[x.k]?IT[x.k].n:x.k)+'<'+(x.from||'-')+'>');out.push({name,added,boxes:box.slice(b0),gains:(KFX.gains||[]).slice(g0).map(g=>g.name),err});await drain()};
  /* force j92's extra garment so bestow adds 2 items (the owner's case) */
  const rr=window.roll;
  await step('bestow contest + garment',()=>{window.roll=()=>true;try{bestow(S,'contest')}finally{window.roll=rr}});
  await step('bestow contest',()=>{bestow(S,'contest')});
  await step('bestow night',()=>{bestow(S,'night')});
  await step('bestow son (ngự tứ)',()=>{bestow(S,'son')});
  await step('story reward (reward67 emp)',()=>{reward67('emp',2)});
  await step('rare (r97give)',()=>{r97give('tranhco','Hoàng thượng')});
  await step('Thái hậu (from th)',()=>{S.inv.push({k:'nhansam',from:'th'})});
  await step('consort gift',()=>{const v=rivals.find(x=>x.alive);S.inv.push({k:'tuithom',from:v.id})});
  await step('Nội vụ phủ 2 pieces',()=>{S.inv.push({k:'luahang',from:'nvp'},{k:'gamto',from:'nvp'})});
  await step('own work (cooking)',()=>{wkFinishLesson((WK.mon&&WK.mon.a)||'nau',{kind:'mon',mat:0},7,'tự luyện')});
  await step('purchase 1',()=>{S.inv.push({k:'sonphan'})});
  await step('burst of 4',()=>{S.inv.push({k:'sonphan'},{k:'huongtram'},{k:'demgam'},{k:'nghien'})});
  return out});
 const fails=[];for(const s of R){const n=s.added.length;const inBox=s.boxes.reduce((a,b)=>a+b.items.length,0);
  if(s.err)fails.push(`${s.name}: ${s.err}`);
  if(n&&inBox+s.gains.length<n)fails.push(`${s.name}: ${n} added, ${inBox} in boxes + ${s.gains.length} reveals`);
  if(/bestow|story|rare|Thái hậu|consort|Nội vụ/.test(s.name)&&n&&s.gains.length)fails.push(`${s.name}: given item shown as a bare kitGain pop`);
  if(/bestow|story|rare|Nội vụ|burst/.test(s.name)&&s.boxes.length>1)fails.push(`${s.name}: ${s.boxes.length} boxes for one moment`);
  for(const bx of s.boxes)for(const it of bx.items)if(/NOPIC/.test(it))fails.push(`${s.name}: ${it} has no picture`)}
 if(errs.length)fails.push('page errors: '+errs.join(' | '));
 fs.writeFileSync(OUT+'/reward-box.json',JSON.stringify({R,errs,fails},null,1));
 for(const s of R)console.log(s.name,'| added',s.added.join(', '),'| boxes',JSON.stringify(s.boxes.map(b=>[b.kind,b.title,b.from,b.items,b.bac])),'| pops',s.gains.join(', '));
 console.log(fails.length?'FAIL\n'+fails.join('\n'):'PASS');await b.close();process.exit(fails.length?1:0)})();
