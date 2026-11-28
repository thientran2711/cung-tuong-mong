/* review/kc-lgr (27/11): the home→palace «thư nhà» / «quà nhà» deliveries (jkcg palRecvFromKc) must write their line in the item ledger
   (S.il.log, law 6c REAL OBJECTS: every item traceable). Before the fix `lgr` was module-local to jdh2, the call sat in try{} and the line
   was silently skipped. Plays origin nc to the palace (same flow as kc-roads/route.js), then delivers one letter and one gift and checks
   S.il.log gained [wk,uid,item,"kc:…"|"kc","me","thư nhà"|"quà nhà"] and the item is in S.inv.
   usage: node dev/test/kc-roads/lgr-ledger.js <url of built dev/index.html> [shotdir]   exit 1 on fail
   With a shotdir: Tư trang tab stills at Fold 755x1000@2 and iPad 1180x820@2 (outside the repo). */
const {chromium}=require('../lib/dlgs-off').pw('tap');/* play bot: a side-line dialogue scene is tapped through like a player (lib/dlgs-off.js) */const fs=require('fs');const URL=process.argv[2];const SH=process.argv[3];const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const out={fails:[]};const F=m=>out.fails.push(m);
 for(const [W,H] of [[755,1000],[1180,820]]){
  const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:SH?2:1,serviceWorkers:'block'});
  await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});
  const p=await c.newPage();p.on('pageerror',e=>F(W+' pageerror '+e.message.slice(0,120)));
  await p.goto(URL);await sleep(2500);await p.evaluate(()=>localStorage.clear());await p.reload();await sleep(3000);
  await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(2500);
  await p.evaluate(()=>{for(let i=0;i<400&&S.origin.k!=="nc";i++){try{store.set(NL_KEY,null)}catch(e){}start()}});await sleep(500);
  await p.evaluate(()=>{const b=document.querySelector('#modal [data-kcp="nha"]');if(b)b.click()});await sleep(800);
  await p.evaluate(()=>{const ok=document.querySelector('#modal button[data-nl="ok"]');if(ok)ok.click()});await sleep(1500);
  const r=await p.evaluate(()=>{const dr=()=>{for(let i=0;i<20&&Q.length&&!S.dead;i++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}};
   S.turn=S.kc.due-1;S.tuan=2;Object.assign(S,{suc:90});dr();for(let k=0;k<24&&isKc()&&!S.dead;k++){try{endTurn()}catch(e){break}dr()}
   if(!kcgPal())return{err:"not in palace"};
   const n0=ilS().log.length,inv0=S.inv.length,from=S.kc.fam.find(m=>m.r==="cha")||null;
   const h1=palRecvFromKc("letter",null,from),n1=ilS().log.length;const h2=palRecvFromKc("gift",null,from),n2=ilS().log.length;
   const L=ilS().log.slice(-2);return{n0,n1,n2,inv:S.inv.length-inv0,L,h1:!!h1,h2:!!h2}});
  out["w"+W]=r;
  if(r.err)F(W+' '+r.err);else{if(r.n1!==r.n0+1)F(W+' letter wrote no ledger line');if(r.n2!==r.n1+1)F(W+' gift wrote no ledger line');if(r.inv!==2)F(W+' items not in S.inv');
   if(!(r.L[0]&&r.L[0][5]==="thư nhà"))F(W+' letter line wrong: '+JSON.stringify(r.L[0]));if(!(r.L[1]&&r.L[1][5]==="quà nhà"))F(W+' gift line wrong: '+JSON.stringify(r.L[1]))}
  if(SH&&!r.err){fs.mkdirSync(SH,{recursive:true});for(let i=0;i<4;i++){await p.keyboard.press('Escape');await sleep(500)}await p.evaluate(()=>{try{closeModal()}catch(e){}});const t=await p.evaluate(()=>{const b=[...document.querySelectorAll('#tabs [data-tab]')].find(x=>x.dataset.tab==="inv");if(b){b.click();return 1}return 0});await sleep(1200);
   await p.screenshot({path:`${SH}/tutrang-${W}x${H}.png`})}
  await c.close()}
 await b.close();console.log(JSON.stringify(out,null,1));process.exit(out.fails.length?1:0)})();
