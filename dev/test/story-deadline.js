/* jstory check (owner 17:06Z): the witness beat (td_an c1) with Bạc 29 → title "Chính tuyến · … · Chương c · Hồi i/n", the silver route shows the rank
   price, a pledge option + non-silver routes exist, pledging keeps the beat open, the countdown chip is in the stage plaque and the Mệnh
   truyện tab, paying later from the chip resolves the beat, and an unpaid pledge lapses only after its deadline.
   usage: NODE_PATH=$(npm root -g) node dev/test/story-deadline.js <url> [WxH] [shot.png] */
const {chromium}=require('playwright');const [,,URL,VP,SHOT]=process.argv;const [W,H]=(VP||'755x1000').split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block'});const p=await ctx.newPage();await p.addInitScript(require('./lib/qdrain').init);/* headless loop: __bot + answer the night choice (lib/qdrain.js, NPCROADS-RED) */
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1200);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='td';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(1800);await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});
 const setup=()=>p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());const md=document.getElementById('modal');md.hidden=true;md.className='modal';try{NLP=null}catch(e){}Q.length=0;
  const A=newThread67('td_an','m');A.chap=2;A.i=1;A.nb='c1';A.due=0;A.dl=S.turn+6;S.st.M=A;S.bac=29;S.foeDad=S.foeDad||'Tào Dật';fireBeat67(A);showModal();render();
  const m=Q[0];return{exp:price67(-40),ovf:document.documentElement.scrollWidth-innerWidth,t:m.t,opts:m.opts.map(o=>o.n),fx:m.opts.map(o=>o.fx&&o.fx.bac||0),dis:[...document.querySelectorAll('#modal .opt')].map(x=>x.disabled),
   hint:[...document.querySelectorAll('#modal .opt')].map(x=>(x.querySelector('.khint')||{}).textContent||''),can:[...document.querySelectorAll('#modal .opt')].map(x=>(x.querySelector('.kr-why .krv,.kr-can .krv')||{}).textContent||''),
   head:(document.querySelector('#modal .kptitle,#mt')||{}).textContent}});
 const out={};const r1=await setup();out.dialog=r1;
 if(SHOT)await p.screenshot({path:SHOT});
 const ok=[];const chk=(n,c)=>ok.push([n,!!c]);
 chk('title Chính tuyến · Báo thù cho nhà · Chương 2 · Hồi 2/n (chap-label)',/^Chính tuyến · Báo thù cho nhà · Chương 2 · Hồi 2\/\d$/.test(r1.t));
 chk('silver route priced by rank',r1.fx.includes(r1.exp));chk('no horizontal overflow',r1.ovf<=0);
 chk('pledge option',r1.opts.some(n=>/nhận lời, lo liệu trong/.test(n)));
 chk('non-silver routes (kho củi, Thái y viện)',r1.opts.some(n=>/kho củi/.test(n))&&r1.opts.some(n=>/Thái y viện/.test(n)));
 /* pledge */
 await p.evaluate(()=>{const i=Q[0].opts.findIndex(o=>o.pl67);chooseM(i);render()});await p.waitForTimeout(800);
 const r2=await p.evaluate(()=>{render();const A=S.st.M;
  const chip=document.querySelector('#k3tt [data-k3="pl67"]')||document.querySelector('#hud2 [data-hx="pl67"]');
  return{pl:S.pl67&&{due:S.pl67.due-absB67(),cost:S.pl67.cost},cur:A.cur,chip:chip&&chip.textContent,plaque:!!document.querySelector('#k3tt [data-k3="pl67"]'),panel:/Đang lo liệu/.test(panel67())}});
 out.pledge=r2;chk('pledge kept, beat open',r2.pl&&r2.cur==='c1');chk('countdown chip in the top bar (k3tt state row)',r2.plaque);chk('Mệnh truyện tab block',r2.panel);
 /* pay later from the chip */
 const r3=await p.evaluate(()=>{S.bac=80;Q.length=0;render();const c=document.querySelector('#k3tt [data-k3="pl67"]')||document.querySelector('#hud2 [data-hx="pl67"]');if(c)c.click();
  const m=Q[0];if(!m)return{opened:false};const i=m.opts.findIndex(o=>/Tân Giả/.test(o.n));const t=m.t;chooseM(i);return{opened:true,t,bac:S.bac,pl:!!S.pl67,cur:S.st.M.cur,wit:!!S.st.M.f.wit}});
 out.pay=r3;chk('chip opens the choice again',r3.opened);chk('paid: beat resolved, pledge cleared, witness kept',r3.opened&&!r3.pl&&r3.cur==null&&r3.wit&&r3.bac===80+r1.exp);
 /* lapse */
 const r4=await p.evaluate(()=>{Q.length=0;const A=newThread67('td_an','m');A.chap=2;A.i=1;A.nb='c1';A.due=0;A.dl=S.turn+6;S.st.M=A;S.bac=10;fireBeat67(A);
  const i=Q[0].opts.findIndex(o=>o.pl67);chooseM(i);Q.length=0;const due=S.pl67.due;let early=null,n=0;
  while(S.pl67&&n<60){if(absB67()===due-1)early=!!S.pl67&&A.cur==='c1';__qDrain();used=0;nextBuoi();n++}
  return{early,lapsed:!S.pl67,cur:A.cur,steps:n,log:S.logs.slice(0,3).map(x=>String(x).replace(/<[^>]+>/g,''))}});
 out.lapse=r4;chk('no failure before the deadline',r4.early!==false);chk('lapses at the deadline',r4.lapsed&&r4.cur==null);
 out.checks=ok;out.errs=errs;console.log(JSON.stringify(out,null,1));await b.close();process.exit(ok.every(x=>x[1])&&!errs.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
