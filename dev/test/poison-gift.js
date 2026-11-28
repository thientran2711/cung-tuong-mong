/* review/poison-gift: gift dialog "Bỏ độc vào…", the poison card (odds word = the roll's odds, full numbers, Vì sao popover), chân tình per person,
   the Emperor card "Ngài với ngươi" (Sủng + Ân tình bars), an NPC's poisoned dish reaching her (kim bạc test), NPC→NPC act, header untouched.
   usage: node dev/test/poison-gift.js <url of index.html> <W>x<H>@dpr <outdir> <tag> [oldsave.json]
   Prints one JSON line: per step overflowX + clipped leaf text, checks, page errors. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');
const [,,BASE,SZ,OUT,TAG,OLD]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(3000);
 const R={};
 R.rot=await p.evaluate(()=>{const e=document.querySelector('#rotate,.rotate,#rot');return e?getComputedStyle(e).display!=='none'&&e.offsetParent!==null:false});
 if(process.env.ROT_ONLY&&W<H&&W<500){await p.screenshot({path:`${OUT}/${TAG}-rotate.jpg`,type:'jpeg',quality:70});console.log(JSON.stringify(Object.assign(R,{errs})));await b.close();return}
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>e.remove());
  S.an=35;S.tamco=40;S.buoi=1;S.used=0;try{k61Meet(S.emp,"gặp",3)}catch(e){}
  const w=wkMake(S,"mon",2,80);S.inv.push(w,{k:"hacdinh"},{k:"docngam"},{k:"kimbac"},{k:"yensao"});render()});
 await p.waitForTimeout(1200);
 const settle=()=>p.waitForFunction(()=>[...document.images].filter(i=>i.offsetParent&&i.getBoundingClientRect().width>30).every(i=>i.complete&&i.naturalWidth>0),null,{timeout:10000}).catch(()=>{});
 const shot=async n=>{await settle();return p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:70})};
 const meas=()=>p.evaluate(()=>{const vw=innerWidth;const cut=[...document.querySelectorAll('#panel *, #modal *')].filter(e=>e.offsetParent&&e.children.length===0&&e.textContent.trim()&&e.scrollWidth>e.clientWidth+2&&['hidden','clip'].includes(getComputedStyle(e).overflowX)).slice(0,6).map(e=>e.className+':'+e.textContent.trim().slice(0,40));
  const M=document.querySelector('#modal .dlg');const mr=M?M.getBoundingClientRect():null;
  return{ovf:document.documentElement.scrollWidth>vw+1,cut,dlgOut:mr?(mr.left<-1||mr.right>vw+1):false}});
 const close=()=>p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});
 /* 1. gift dialog of the dish: kit dialog (kgiftdlg + tabs), "Bỏ độc vào…" in every tab, chân tình note per person */
 await p.evaluate(()=>{const ix=S.inv.findIndex(e=>e&&e.wk&&e.wk.kind==="mon");GIFT_TAB=null;itemAct("gift",ix)});await p.waitForTimeout(1800);
 R.gift=Object.assign(await meas(),await p.evaluate(()=>{const M=document.getElementById('modal');const tabs=[...M.querySelectorAll('[data-kgtab]')].map(t=>t.dataset.kgtab);const res={kitDlg:!!M.querySelector('.dlg.kgiftdlg'),pic:!!M.querySelector('.kgiftpic .kitem'),tabs,pgVisible:{}};
  for(const t of tabs){M.querySelector(`[data-kgtab="${t}"]`).click();const pb=[...M.querySelectorAll('.opt[data-m]')].find(b=>/Bỏ độc vào/.test(b.innerText));res.pgVisible[t]=!!(pb&&!pb.hidden&&pb.offsetParent)}
  const ct=M.querySelector('[data-kgtab="ct"]');if(ct)ct.click();
  res.notes=[...M.querySelectorAll('.opt[data-m]')].filter(b=>b.offsetParent).map(b=>{const n=b.querySelector('.kr-note');return (b.querySelector('.kan')||b).innerText.split('\n')[0].slice(0,30)+' | '+(n?n.innerText.replace(/\s+/g,' ').slice(0,160):'-')});
  res.oldPoisonRows=[...M.querySelectorAll('.opt[data-m]')].filter(b=>/Lén bỏ Hạc đỉnh hồng/.test(b.innerText)).length;
  res.info=(M.querySelector('.kinvrows')||{}).innerText||'';return res}));
 await shot('gift');
 /* 2. the poison card */
 await p.evaluate(()=>{const M=document.getElementById('modal');const pt=M.querySelector('[data-kgtab="pt"]');if(pt)pt.click();const pb=[...M.querySelectorAll('.opt[data-m]')].find(b=>/Bỏ độc vào/.test(b.innerText));pb.click()});
 await p.waitForTimeout(1500);
 R.pick=Object.assign(await meas(),await p.evaluate(()=>{const M=document.getElementById('modal');const m=Q[0];const B=[...M.querySelectorAll('.opt[data-m]')];
  const rows=B.map(b=>{const o=m.opts[+b.dataset.m];const chip=b.querySelector('.oc');return{n:(o&&o.n||'').slice(0,60),chip:chip?chip.textContent.trim():'',want:o&&o.o!=null?word(o.o):'',
   rows:[...b.querySelectorAll('.kr')].map(r=>r.className.replace('kr ','')+'='+r.innerText.replace(/\s+/g,' ').slice(0,90))}});
  const bad=rows.filter(r=>r.want&&r.chip!==r.want).length;const targets=new Set(m.opts.filter(o=>o.o!=null).map(o=>o.n.replace(/.* tặng /,'')));
  return{pid:m.pid,count:rows.length,oddsMismatch:bad,noEmpTh:![...targets].some(t=>/Hoàng thượng|Thái hậu/.test(t)),first:rows[0],event:typeof kitIsEventChoice==='function'?kitIsEventChoice(m):null,
   rollSame:(()=>{const o=m.opts.find(x=>x.o!=null);return o?o.o:null})()}}));
 await shot('pick');
 /* 2b. the Vì sao popover of the first option */
 R.why=await p.evaluate(async()=>{const od=document.querySelector('#modal .opt[data-m] .kodm');if(!od)return{none:1};od.click();await new Promise(r=>setTimeout(r,400));const pp=document.getElementById('kpop');return{shown:!!(pp&&pp.offsetParent),txt:pp?pp.innerText.replace(/\s+/g,' ').slice(0,300):''}});
 await shot('why');
 /* 2c. choose it: the roll, the log line, items spent */
 await p.evaluate(()=>{const k=document.getElementById('kpop');if(k)k.remove()});await p.waitForTimeout(300);R.do=await p.evaluate(()=>{window.__kpNoWarn=1;const n0=S.inv.length,d0=S.duc;const b=[...document.querySelectorAll('#modal .opt[data-m]')][0];b.click();
  return new Promise(r=>setTimeout(()=>r({spent:n0-S.inv.length,duc:S.duc-d0,q:Q[0]&&Q[0].t,qh:Q[0]&&String(Q[0].h||'').replace(/<[^>]+>/g,'').slice(0,200),btn:b.innerText.slice(0,40),modal:!document.getElementById("modal").hidden,roul:!!document.querySelector(".kroul,#kroul,#kroulw"),lg:String((S.log||[]).slice(-1)[0]||"").replace(/<[^>]+>/g,"").slice(0,160)}),6000))});
 await p.waitForTimeout(800);await close();
 /* 3. the Emperor card: "Ngài với ngươi" (Sủng + Ân tình) */
 await p.evaluate(()=>{tab="court";PG.court=0;render()});await p.waitForTimeout(1500);
 R.emp=Object.assign(await meas(),await p.evaluate(()=>{const P=document.getElementById('panel');const C=[...P.querySelectorAll('.kst-chip')].map(c=>c.textContent.replace(/\s+/g,' ').trim());
  const an=[...P.querySelectorAll('.kst-chip')].find(c=>/^Ân tình/.test(c.textContent.trim()));if(an)an.scrollIntoView({block:'center'});
  return{chips:C.slice(0,8),anChip:!!an,anBar:!!(an&&an.querySelector('.fbar')),anVal:an?an.querySelector('.kstv').textContent:'',daytime:/ban ngày/.test(P.textContent)}}));
 await shot('emp');
 /* 4. an NPC's poisoned dish reaches her: the card (event rule), then the silver needle */
 await p.evaluate(()=>{tab="me";render();const v=liveRivals(false)[0];v.inv=v.inv||[];v.inv.push(wkMake(v,"mon",0,50),{k:"hacdinh"});const ix=v.inv.findIndex(e=>e&&e.wk&&e.wk.kind==="mon");window.__pgv=v.name;pgGive(v,S,ix,"hacdinh");showModal()});
 await p.waitForTimeout(1500);
 R.pgin=Object.assign(await meas(),await p.evaluate(()=>{const m=Q[0];const M=document.getElementById('modal');return{pid:m&&m.pid,opts:[...M.querySelectorAll('.opt[data-m]')].map(b=>b.innerText.replace(/\s+/g,' ').slice(0,100)),event:typeof kitIsEventChoice==='function'?kitIsEventChoice(m):null}}));
 await shot('pgin');
 R.needle=await p.evaluate(async()=>{const b=[...document.querySelectorAll('#modal .opt[data-m]')].find(x=>/kim bạc/.test(x.innerText));if(!b)return{none:1};const ev0=liveRivals(false)[0].ev;b.click();await new Promise(r=>setTimeout(r,600));return{t:Q[0]&&Q[0].t,ev:liveRivals(false)[0].ev-ev0,alive:!S.dead}});
 await close();
 /* 5. NPC → NPC through the act table (runAct), 30 tries, no errors */
 R.npc=await p.evaluate(()=>{const L=liveRivals(false);let n=0,txt=[];for(let i=0;i<30;i++){const a=L[i%L.length],t=L[(i+1)%L.length];if(a===t)continue;a.inv=a.inv||[];a.inv.push(wkMake(a,"mon",0,50),{k:"phanhuy"});
   try{const r=runAct(a,t,"pgift");if(r){n++;if(txt.length<2)txt.push(String(r).replace(/<[^>]+>/g,'').slice(0,140))}}catch(e){txt.push('ERR '+e.message)}}return{n,txt}});
 /* 6. old save */
 if(OLD){const d=fs.readFileSync(OLD,'utf8');R.old=await p.evaluate(d=>{try{localStorage.setItem('hclh-save-v2-2',d);const x=loadSlot(2);if(!x)return'noload';SLOT=2;quiet=true;deser(x);quiet=false;document.getElementById('title').hidden=true;deal();Q.length=0;tab='court';render();return'ok '+S.name+' an='+S.an}catch(e){return'ERR '+e.message}},d);
  await p.waitForTimeout(1200);R.oldMeas=await meas();await shot('old')}
 console.log(JSON.stringify(Object.assign(R,{errs})));await b.close()})().catch(e=>{console.error(e);process.exit(2)});
