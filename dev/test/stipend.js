/* review/econ-stipend: monthly stipend goods are real items + chest reveal; Nội vụ phủ skimming event (kitEventDp person dialog);
   NPC skimming; goodsGive (EV6 gift, j67 gi); old save loads.
   usage: node dev/test/stipend.js <build url> <outdir> [WxH@dpr,...]   (screenshots: chest, event; JSON result on stdout) */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R=[];
 for(const sz of (SIZES||"755x1000@2,1000x755@2,1180x820@2,1366x1024@2,844x390@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul,.kroul{display:none!important}'});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}
   Q.length=0;document.getElementById('modal').hidden=true;render()});await sleep(800);
  await p.evaluate(()=>{try{const dw=document.getElementById('dawn');if(dw){dw.classList.remove('on');dw.hidden=true}document.querySelectorAll('[id^=kroul],.kroul-ov,.kroul').forEach(e=>e.remove());KMQ.length=0;document.querySelectorAll('.kmov').forEach(o=>o.remove());kmBusy=false}catch(e){}});
  /* 1. a month with a cause: low Sủng + greedy eunuch, rank Tần, winter */
  const r1=await p.evaluate(()=>{S.rank=3;S.sung=5;S.month=11;stipW().greedy=1;const st=stipSt(S);delete st.tip;st.tips=0;(S.staff||[]).forEach(s=>s.loyal=40);BAL.stip.cap=100;BAL.stip.w.sung=100;
   const n0=S.inv.length,b0=S.bac;Q.length=0;const line=stipend(S);log(line);render();showModal();
   const add=S.inv.slice(n0).map(e=>({k:e.k,n:IT[e.k].n,from:e.from,art:!!itemArt(e.k)}));
   return{line,add,bac:S.bac-b0,Q:Q.map(q=>q.t),evOpts:(Q.find(q=>/^Bổng lộc tháng/.test(q.t||"")&&(q.opts||[]).some(o=>/^Lót tay/.test(o.n)))||{opts:[]}).opts.map(o=>o.n),sepCard:Q.some(q=>q.t==="Bổng lộc bị cắt xén")}/* review/bongloc-options: the cut answers are ON the month frame (no separate card) */});
  r1.km=await p.evaluate(()=>({q:KMQ.length,busy:kmBusy,free:kmFree(),ov:[...document.querySelectorAll('.kmov')].map(o=>o.className)}));await p.waitForSelector('#kmrew',{timeout:20000}).catch(()=>{});await sleep(900);await p.screenshot({path:`${OUT}/chest-closed-${wh}.jpg`,type:'jpeg',quality:60});
  await p.evaluate(()=>{const o=document.querySelector('#kmrew');if(o)o.click()});await sleep(1500);await p.screenshot({path:`${OUT}/chest-reveal-${wh}.jpg`,type:'jpeg',quality:60});await p.waitForSelector('#kmrew .km-done',{timeout:30000}).catch(()=>{});await sleep(800);
  await p.screenshot({path:`${OUT}/chest-open-${wh}.jpg`,type:'jpeg',quality:60});
  const chest=await p.evaluate(()=>{const ov=document.querySelector('#kmrew');return ov?{rows:[...ov.querySelectorAll('.kmrow')].map(r=>r.textContent.trim()),imgs:[...ov.querySelectorAll('.kmrow img, .kmsh img, .kmitems img')].length}:null});
  await p.evaluate(()=>{const c=document.querySelector('#kmrew [data-km-close]');if(c)c.click()});await sleep(800);
  /* the card first, then the event */
  await p.evaluate(()=>{while(Q.length&&!(/^Bổng lộc tháng/.test(Q[0].t||"")&&(Q[0].opts||[]).some(o=>/^Lót tay/.test(o.n))))Q.shift();showModal()});await sleep(1500);
  await p.screenshot({path:`${OUT}/event-${wh}.jpg`,type:'jpeg',quality:60});
  const ev=await p.evaluate(()=>{const M=document.getElementById('modal');const d=M.querySelector('.dlg');const r=d.getBoundingClientRect();
   const ovf=[...M.querySelectorAll('*')].filter(e=>e.scrollWidth>e.clientWidth+2&&getComputedStyle(e).overflowX==='visible'&&e.clientWidth>0).length;
   return{shown:!M.hidden,mode:d.className,box:[Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)],inView:r.left>=0&&r.right<=innerWidth+1&&r.top>=0&&r.bottom<=innerHeight+1,
    hint:(M.querySelector('.kr-hint')||{}).textContent||"",opts:[...M.querySelectorAll('#mb .opts > *')].filter(x=>x.offsetParent).map(x=>x.textContent.trim().slice(0,60)),hscroll:document.documentElement.scrollWidth>innerWidth}});
  /* choose "Đút bạc" → goods restored */
  const r2=await p.evaluate(()=>{if(!Q[0]||!Q[0].opts)return{noEvent:true,why:JSON.stringify(stipCauses(S,false).C.map(c=>c.k)),ally:stipAlly(S),sung:S.sung};const i=Q[0].opts.findIndex(o=>/^Lót tay/.test(o.n));const kem0=S.inv.filter(e=>/hàng kém/.test((IT[e.k]||{}).n||"")).length;S.bac=Math.max(S.bac,100);chooseM(i);
   const kem1=S.inv.filter(e=>/hàng kém/.test((IT[e.k]||{}).n||"")).length;return{kem0,kem1,tip:stipSt(S).tip===S.turn}});
  /* 2. high favour: no skim; NPCs: the same rule */
  const r3=await p.evaluate(()=>{S.sung=70;const SK=stipSkim(S,100,false);let npc=0,news0=(S.news||[]).length;
   for(const v of liveRivals(true)){v.sung=3;const s=stipSkim(v,80,false);if(s){npc++;stipNpc(v,s,stipGoods(v,s))}}
   return{herSkim:!!SK,npcSkimmed:npc,npcInv:liveRivals(true)[0]&&liveRivals(true)[0].inv.filter(e=>e.from==="noivu").length,news:(S.news||[]).slice(0,2).map(n=>n.t)}});
  /* 3. Tuần lục line + goodsGive from an EV6 gift + j67 gi + sale price of an issued item */
  const r4=await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;
   const s=E68I.giftArrive;const vi=s.v.findIndex(t=>/xấp lụa/.test(t));const d=mkP("e68giftArrive",{vi,a0:liveRivals(true)[0].id});let got=null;
   if(d){const n0=S.inv.length;d.o[0].go();got=S.inv.slice(n0).map(e=>e.k)}
   const ix=S.inv.findIndex(e=>e.from==="noivu"&&e.k==="luahang"||e.from==="noivu"&&e.k==="vaibong");const pr=ix>=0?econPrice(S,S.inv[ix]):null;
   return{giftOpt:d?d.o.map(o=>o.n):null,got,noivuPrice:pr,goodsGive:goodsGive(S,["guong"],{from:"emp"})}});
  await sleep(500);
  R.push({sz,r1,chest,ev,r2,r3,r4,errs});await ctx.close()}
 console.log(JSON.stringify(R,null,1));
 /* verdict (review/bongloc-options): the cut answers on the Bổng lộc month frame, shown, in view, choosable; no separate card; no page error */
 const bad=R.filter(x=>{const cut=/cắt xén/.test(x.r1.line);return x.errs.length||x.r1.sepCard||(cut&&(!x.r1.evOpts.some(n=>/^Lót tay/.test(n))||!x.r1.evOpts.some(n=>/đòi lại phần bị cắt xén$/.test(n))||!x.ev.shown||!x.ev.opts.length||!x.ev.inView||x.ev.hscroll||x.r2.noEvent||!(x.r2.kem1<x.r2.kem0)))});
 console.log(bad.length?`STIPEND FAIL ${bad.map(x=>x.sz).join(",")}`:`STIPEND PASS ${R.length} size(s)`);await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});