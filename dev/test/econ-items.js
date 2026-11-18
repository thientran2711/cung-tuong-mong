/* review/econ-items (D6): girlhood chest at a new life · summer ice + melt · skim severity by standing · servants pocketing goods (dialog) ·
   robe re-issue roads (robbery card + Tư trang → Việc) · NPC fallback robe · old save loads.
   usage: node dev/test/sw-serve.js <port> <repo root>  (other shell);  node dev/test/econ-items.js http://127.0.0.1:<port>/ <outdir> [WxH@dpr,...] [save.json]
   Exit 1 on a miss. Screenshots: chest, pilfer dialog, re-issue dialog per size. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES,SAVE]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
const clean=p=>p.evaluate(()=>{try{const dw=document.getElementById('dawn');if(dw){dw.classList.remove('on');dw.hidden=true}document.querySelectorAll('[id^=kroul],.kroul-ov,.kroul').forEach(e=>e.remove());KMQ.length=0;document.querySelectorAll('.kmov').forEach(o=>o.remove());kmBusy=false}catch(e){}});
const dlgCheck=p=>p.evaluate(()=>{const M=document.getElementById('modal');const d=M.querySelector('.dlg');if(M.hidden||!d)return{shown:false};const r=d.getBoundingClientRect();
 const ovf=[...M.querySelectorAll('*')].filter(e=>e.scrollWidth>e.clientWidth+2&&getComputedStyle(e).overflowX==='visible'&&e.clientWidth>0&&!e.closest('svg')).length;
 return{shown:true,t:document.getElementById('mt').textContent,inView:r.left>=-1&&r.right<=innerWidth+1&&r.top>=-1&&r.bottom<=innerHeight+1,ovf,pageOvf:document.documentElement.scrollWidth>innerWidth+1,
  opts:[...M.querySelectorAll('.opt')].map(o=>o.textContent.replace(/\s+/g,' ').trim().slice(0,90))}});
(async()=>{const b=await chromium.launch();const R=[];const fails=[];const F=(sz,m)=>fails.push(`${sz}: ${m}`);
 for(const sz of (SIZES||"755x1000@2,1180x820@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr||1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.addInitScript(()=>{window.__nlInner=1});
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&typeof girlChest==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul,.kroul{display:none!important}'});
  /* 1. girlhood chest on a new life */
  const r1=await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<400;i++){KMQ.length=0;start();if(!isSrv())break}
   const w=wdOf(S);const worn=S.inv.filter(e=>e.w&&!e.h&&IT[e.k]&&IT[e.k].sl).map(e=>IT[e.k].sl);
   return{girl:S.girl,worn,y:w.y&&w.y.k,tram:w.tram&&w.tram.k,kq:KMQ.length,khantay:S.inv.some(e=>e.k==="khantay"),kc:S.inv.filter(e=>e.from==="kc").length,lux:luxOf(S)}});
  /* main 211d22d1 (card flip ends with the kit scene-end button, no auto-close): tap through the night card-flip scene(s) queued before the chest reveal */
  for(let i=0;i<60&&!(await p.$('#kmrew'));i++){await p.evaluate(()=>{const b=document.querySelector('.kmov .kmend,.kmend');if(b&&!document.getElementById('kmrew'))b.click()});await sleep(400)}
  await p.waitForSelector('#kmrew',{timeout:20000}).catch(()=>{});await p.evaluate(()=>{const o=document.querySelector('#kmrew');if(o)o.click()});
  await p.waitForSelector('#kmrew .km-done',{timeout:30000}).catch(()=>{});await sleep(700);
  r1.chest=await p.evaluate(()=>{const ov=document.querySelector('#kmrew');return ov?{title:(ov.querySelector('.kmrew-h b')||{}).textContent,rows:[...ov.querySelectorAll('.kmrow')].map(r=>r.textContent.trim().slice(0,60))}:null});
  await p.screenshot({path:`${OUT}/girl-chest-${wh}.jpg`,type:'jpeg',quality:55});
  if(!r1.girl||r1.girl.length!==6)F(sz,`girl chest ${JSON.stringify(r1.girl)}`);if(!r1.chest||r1.chest.rows.length!==6)F(sz,`chest reveal ${JSON.stringify(r1.chest)}`);
  for(const s of ["wrist","waist","scent"])if(!r1.worn.includes(s))F(sz,`not worn ${s}`);if(!r1.y)F(sz,'no robe worn');
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});await clean(p);
  /* 2. summer ice + melt; winter coal; skim severity */
  const r2=await p.evaluate(()=>{const out={};S.rank=3;S.sung=60;S.month=5;const n0=S.inv.length;const G=stipGoods(S,null);out.summer=G.map(g=>[g.k,g.n]);
   out.ice=S.inv.slice(n0).filter(e=>e.k==="bangda").length;S.turn++;itemMonth(S);out.afterMelt=S.inv.filter(e=>e.k==="bangda").length;
   S.month=11;out.winter=stipList(3,false,stipWinter(),stipSummer());
   const sev=[];for(const [rk,sung,nc] of [[0,5,2],[0,40,1],[3,40,1],[5,40,1],[6,5,2]]){S.rank=rk;S.sung=sung;sev.push([rk,sung,nc,stipItemN(S,Array(nc).fill({k:"x"}))])}out.sev=sev;
   S.rank=0;S.sung=5;S.month=5;const G2=stipGoods(S,{items:stipItemN(S,[{},{}])});out.skimmed=G2.map(g=>[g.k0,g.k,g.n,g.kem,g.lost]);
   out.rankTxt=stipRankTxt(3);return out});
  if(r2.ice!==BAL_ICE3(r2))F(sz,`ice ${r2.ice}`);if(r2.afterMelt!==0)F(sz,`ice did not melt ${r2.afterMelt}`);if(!r2.winter.some(x=>x[0]==="thanbac"))F(sz,'no winter coal');
  /* 3. a servant pockets a piece → she notices → dialog */
  const r3=await p.evaluate(()=>{S.rank=2;S.sung=40;S.month=6;tmPlace(S,10);if(!S.staff.length)S.staff.push(mkServ("eunuch"));const s=S.staff[0];s.loyal=0;s.spyFor=null;delete s.pilDet;
   BAL.eit.pil.base=100;BAL.eit.pil.cap=100;BAL.eit.pil.see=100;BAL.stip.cap=0;Q.length=0;const n0=S.inv.length;stipend(S);const ev=Q.find(q=>q.t==="Kẻ hầu ăn bớt");
   const issued=S.inv.length-n0;if(ev){while(Q.length&&Q[0]!==ev)Q.shift()}showModal();return{ev:!!ev,issued,who:s.name,Q:Q.map(q=>q.t)}});
  await clean(p);await sleep(900);const d3=await dlgCheck(p);await p.screenshot({path:`${OUT}/pilfer-${wh}.jpg`,type:'jpeg',quality:55});
  if(!r3.ev)F(sz,`no pilfer dialog ${JSON.stringify(r3)}`);else{if(!d3.inView||d3.ovf||d3.pageOvf)F(sz,`pilfer dialog layout ${JSON.stringify(d3)}`);
   r3.after=await p.evaluate(()=>{const n0=S.inv.length;const i=Q[0].opts.findIndex(o=>o.n==="Phạt nặng");chooseM(i);return{back:S.inv.length-n0,loyal:S.staff[0]?S.staff[0].loyal:null,det:S.staff[0]&&S.staff[0].pilDet}});
   if(r3.after.back!==1)F(sz,`punish did not return the piece ${JSON.stringify(r3.after)}`)}
  await p.evaluate(()=>{BAL.eit.pil.base=8;BAL.eit.pil.cap=55;BAL.eit.pil.see=25;Q.length=0;document.getElementById('modal').hidden=true;render()});
  /* 4. robe lost → wait by rank; Tư trang → Việc button → dialog; maid road succeeds (forced roll) */
  const r4=await p.evaluate(()=>{const out={};S.place="home";const w=wdOf(S);out.had=!!w.y;w.y=null;S.rank=0;S.sung=5;tyLost(S,"cuop");out.waitWk=S.tyNvp-wk();S.rank=6;S.sung=60;tyLost(S,"cuop");out.waitWkHigh=S.tyNvp-wk();
   /* owner 16/11 s9: a RANDOM 1–3 weeks weighted by Nội vụ phủ's regard */const smp=(rk,sg)=>{S.rank=rk;S.sung=sg;const L=[];for(let i=0;i<300;i++)L.push(eitReWk(S));return{min:Math.min(...L),max:Math.max(...L),mean:+(L.reduce((x,y)=>x+y,0)/L.length).toFixed(2)}};out.wLow=smp(0,5);out.wHigh=smp(6,80);S.rank=1;
   tab="inv";try{KINV_SUB="viec"}catch(e){}render();const btn=document.querySelector('[data-eitre]');out.btn=!!btn;if(btn)btn.click();return out});
  await clean(p);await sleep(900);await clean(p);const d4=await dlgCheck(p);await p.screenshot({path:`${OUT}/reissue-${wh}.jpg`,type:'jpeg',quality:55});
  for(const w of [r4.wLow,r4.wHigh])if(w.min<1||w.max>3)F(sz,`re-issue wait out of 1–3 ${JSON.stringify(w)}`);if(!(r4.wLow.mean>r4.wHigh.mean+.5))F(sz,`re-issue wait not weighted by regard ${JSON.stringify([r4.wLow,r4.wHigh])}`);
  if(!r4.btn)F(sz,'no Xin cấp lại button in Tư trang Việc');if(!d4.shown||d4.t!=="Xin cấp lại y phục")F(sz,`re-issue dialog ${JSON.stringify(d4)}`);
  else{if(!d4.inView||d4.ovf||d4.pageOvf)F(sz,`re-issue layout ${JSON.stringify(d4)}`);if(d4.opts.length<3)F(sz,`re-issue roads ${d4.opts.length}`);
   r4.after=await p.evaluate(()=>{const r0=Math.random;Math.random=()=>0;const i=Q[0].opts.findIndex(o=>/^Sai /.test(o.n));const s0=S.suc;chooseM(i>=0?i:0);Math.random=r0;KMQ.length=0;return{y:!!wdOf(S).y,ty:tyOn(S),suc:S.suc-s0,nvp:S.tyNvp}});
   if(!r4.after.y||r4.after.ty)F(sz,`maid road did not issue a robe ${JSON.stringify(r4.after)}`)}
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;tab="act";render()});await clean(p);
  /* 5. robbery card offers the roads; family letter arrives in famWk weeks */
  const r5=await p.evaluate(()=>{const out={};Q.length=0;const ok=tyRob(S.place==="home"?"ngu":S.place);const m=Q.find(q=>q.t==="Bị giật y phục giữa đường");out.rob=ok;out.opts=m?m.opts.map(o=>o.n):null;Q.length=0;
   const r0=Math.random;Math.random=()=>0;const O=eitReOpts(true);const f=O.find(o=>/thư/.test(o.n));if(f){f.go()}Math.random=r0;out.fam=S.tyFam;for(let i=0;i<4&&S.tyFam;i++){S.tuan=(S.tuan+1)%3;if(!S.tuan)S.turn++;eitWeek()}out.famDone=!S.tyFam;out.y=!!wdOf(S).y;
   /* NPC fallback robe */
   out.npc=liveRivals(true).filter(v=>!v.out).map(v=>(v.inv||[]).some(e=>e.from==="kc")).filter(Boolean).length;out.npcN=liveRivals(true).filter(v=>!v.out).length;return out});
  if(!r5.opts||!r5.opts.some(n=>/Lót tay/.test(n)))F(sz,`robbery card roads ${JSON.stringify(r5.opts)}`);if(!r5.famDone||!r5.y)F(sz,`family robe ${JSON.stringify(r5)}`);if(r5.npc<r5.npcN)F(sz,`NPC girlhood robe ${r5.npc}/${r5.npcN}`);
  /* 6. old save (optional) */
  let r6=null;if(SAVE){r6=await p.evaluate(save=>{try{localStorage.setItem(SK(3),save);const d=loadSlot(3);SLOT=3;quiet=true;deser(d);quiet=false;deal();endTurn();render();return{ok:!!S&&!S.dead,girl:S.girl||null}}catch(e){quiet=false;return{ok:false,err:e.message}}},fs.readFileSync(SAVE,'utf8'));if(!r6.ok)F(sz,`old save ${JSON.stringify(r6)}`)}
  if(errs.length)F(sz,`page errors ${errs.join(' | ')}`);
  R.push({sz,r1,r2,r3,d3,r4,d4,r5,r6,errs});await ctx.close()}
 await b.close();fs.writeFileSync(`${OUT}/econ-items.json`,JSON.stringify(R,null,1));console.log(JSON.stringify(R.map(x=>({sz:x.sz,girl:x.r1.girl,chest:x.r1.chest&&x.r1.chest.rows.length,lux:x.r1.lux&&x.r1.lux.sc,ice:x.r2.ice,sev:x.r2.sev,skim:x.r2.skimmed,pil:x.r3.ev,wait:[x.r4.wLow,x.r4.wHigh],roads:x.d4.opts,rob:x.r5.opts}))));
 console.log(fails.length?'FAIL\n'+fails.join('\n'):'PASS');process.exit(fails.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
function BAL_ICE3(){return 1}
