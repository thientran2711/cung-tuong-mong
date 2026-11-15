/* Every item she gains is revealed (kitGain / kitReward) — owner 11/15 loot-game rule. FAILS (exit 1) when an add is silent.
   usage: node dev/test/sw-serve.js 8955 <repo root>   (another shell);  node dev/test/item-gain.js http://localhost:8955/ <outdir> [shots]
   1. STATIC: lists every inventory-add call site in dev/build (".inv.push(", ".inv.unshift(", ".inv.splice(…, 0, …", "inv=…concat") — they all
      reach the ONE universal path (j93 kmDiff → jfx kitGain after the next render), so the test checks that path is wired.
   2. DYNAMIC: drives real call sites — a Tài nghệ work from the cooking mini-game (j83 wkFinishLesson 'nau' → dish), embroidery, painting,
      calligraphy, music; a purchase-style add; an ân thưởng (bestow → kitReward); a gift from Thái hậu (kitReward); a burst of 3 adds —
      and hooks S.inv's push: every added entry must be answered by a kitGain or a kitReward.
   3. Works: the reveal and the Tư trang bag show the work's own name (not "Tác phẩm tự tay"), its tier word from the score, its tier painting. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const [,,BASE,OUT,SHOTS]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));const fails=[];const ok=(c,m)=>{if(!c)fails.push(m)};
/* 1. static scan */
const B=path.join(__dirname,'..','build');const sites=[];
for(const f of fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f)&&!/^all/.test(f))){const t=fs.readFileSync(path.join(B,f),'utf8').split('\n');
 t.forEach((l,i)=>{const m=l.match(/[\w.\]]*inv\.(push|unshift)\(|[\w.]*inv\.splice\([^)]*,\s*0\s*,|inv\s*=\s*[\w.]*inv\.concat/g);if(m)sites.push(`${f}:${i+1} ${m.join(' ')}`)})}
const jfx=fs.readFileSync(path.join(B,'jfx.js'),'utf8');ok(/W\("kmDiff"/.test(jfx)&&/kitGain\(x\)/.test(jfx),'universal kmDiff → kitGain hook missing in jfx.js');
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitGain,null,{timeout:180000});
 await p.waitForFunction(()=>!document.getElementById('kload')||(window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)),null,{timeout:240000}).catch(()=>{});await sleep(1500);
 const R=await p.evaluate(async()=>{const wait=t=>new Promise(o=>setTimeout(o,t));
  document.querySelectorAll('#kload').forEach(e=>e.remove());SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;
  document.querySelectorAll('[id^=kroul],#dawn,.kmov').forEach(e=>e.remove());render();await wait(300);
  /* hook S.inv: record every add, whoever makes it */
  const adds=[];const hook=()=>{const a=S.inv;if(a.__h)return;const P=a.push,U=a.unshift;Object.defineProperty(a,'__h',{value:1});a.push=function(...x){adds.push(...x);return P.apply(this,x)};a.unshift=function(...x){adds.push(...x);return U.apply(this,x)}};hook();
  const drain=async()=>{for(let i=0;i<20;i++){const o=document.querySelector('.kmov');if(!o){await wait(150);if(!document.querySelector('.kmov')&&!(window.KMQ&&KMQ.length))break;continue}o.click();await wait(350)}};
  const g0=()=>((KFX.gains||[]).length),r0=()=>(KFX.rewards||0);const steps=[];
  const step=async(name,fn)=>{const ga=g0(),ra=r0(),aa=adds.length;let err='';try{fn()}catch(e){err=e.message}render();await wait(400);const gl=(KFX.gains||[]).slice(ga);await drain();
   steps.push({name,adds:adds.length-aa,gains:g0()-ga,rewards:r0()-ra,shown:gl,err})};
  /* Tài nghệ works: cooking (the owner's case), embroidery, painting, calligraphy, music */
  const W=[['nau','mon',7],['theu','theu',4],['hoa','tranh',10],['thi','tho',7],['cam','khuc',0]];
  for(const [art,kind,raw] of W){await step('work '+kind,()=>{const k=(WK[kind]&&WK[kind].a)||art;wkFinishLesson(k,{kind,mat:0},raw,'tự luyện')})}
  await step('generic add (purchase / find)',()=>{S.inv.push({k:'nhansam'})});
  await step('ân thưởng (bestow)',()=>{bestow(S,'contest')});
  await step('gift from Thái hậu',()=>{S.inv.push({k:'vongngoc',from:'th'})});
  await step('burst of 3',()=>{S.inv.push({k:'sonphan'},{k:'huongtram'},{k:'demgam'})});
  /* the bag shows works with their own name + painting + tier */
  const works=S.inv.filter(e=>e.wk);const bag=kinvItems().filter(x=>x.g&&x.g.wk).map(x=>({name:x.name,src:x.src,gname:x.gname,ti:x.g.wk.ti,q:x.g.wk.q}));
  return{steps,bag,works:works.map(e=>({n:e.wk.n,ti:e.wk.ti,q:e.wk.q,tier:WTIER[e.wk.ti]}))}});
 for(const s of R.steps){ok(!s.err,`${s.name}: error ${s.err}`);ok(s.adds>0||/bestow/.test(s.name),`${s.name}: nothing was added (call site not driven)`);
  ok(s.gains+s.rewards>=Math.max(1,s.adds)||(s.adds===0&&s.rewards>0),`${s.name}: ${s.adds} added, only ${s.gains} kitGain + ${s.rewards} kitReward`);
  for(const g of s.shown){ok(g.name&&g.name!=='Tác phẩm tự tay',`${s.name}: generic name "${g.name}"`);ok(!!g.src,`${s.name}: "${g.name}" has no picture`)}}
 for(const w of R.bag){ok(w.name!=='Tác phẩm tự tay',`bag: generic work name`);ok(/item-tp-[a-z]+(-r\d+)?-b[1-4]\.webp/.test(w.src),`bag: work "${w.name}" has no tier picture (${w.src})`);ok(w.gname===['Thường','Khá','Tinh xảo','Tuyệt phẩm'][w.ti],`bag: "${w.name}" tier word ${w.gname} ≠ tier ${w.ti}`);
  ok(w.ti===(w.q>=14?3:w.q>=10?2:w.q>=6?1:0)||w.ti===Math.min(3,(w.q>=14?3:w.q>=10?2:w.q>=6?1:0)+1),`bag: "${w.name}" tier ${w.ti} does not follow score ${w.q}`)}
 if(SHOTS){await p.evaluate(()=>{document.querySelectorAll('[id^=kroul],#dawn,.kmov').forEach(e=>e.remove());if(window.KMQ)KMQ.length=0;wkFinishLesson((WK.mon&&WK.mon.a)||'nau',{kind:'mon',mat:0},7,'tự luyện');render()});await sleep(1600);await p.evaluate(()=>document.querySelectorAll('[id^=kroul]').forEach(e=>e.remove()));await p.screenshot({path:`${OUT}/item-gain-reveal-1180x820.jpg`,type:'jpeg',quality:62,timeout:120000}).catch(()=>{})}
 ok(!errs.length,'page errors: '+errs.join(' | '));
 const out={sites:sites.length,siteList:sites,steps:R.steps.map(s=>({name:s.name,adds:s.adds,gains:s.gains,rewards:s.rewards,shown:s.shown.map(g=>`${g.name} · ${g.grade} · ${g.src?'pic':'NO PIC'}`)})),bag:R.bag,works:R.works,errs,fails};
 fs.writeFileSync(OUT+'/item-gain.json',JSON.stringify(out,null,1));console.log(JSON.stringify({sites:sites.length,steps:out.steps,bag:R.bag,fails},null,1));await b.close();process.exit(fails.length?1:0)})();
