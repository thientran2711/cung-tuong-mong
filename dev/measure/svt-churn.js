/* svt-churn (servant-trust fix r1, review FAIL 1): play N game months with the NPC servants' own acts on (jagstaff, agOn), clear the event queue each
   week, and count what the servant-trust family did: touches per kind, seen (by witness source), bất kính, Chủ tin drops → returns to Nội vụ phủ (svtMonth
   BAL.svt.tin.out), the cung-nữ «Hỏi chuyện» on her. usage: python3 dev/build/assemble.py && node dev/measure/svt-churn.js [months=14] [srv=0|1] */
const {chromium}=require('playwright');const path=require('path');
const MO=+(process.argv[2]||14),SRV=+(process.argv[3]||0),GAME=path.join(__dirname,'..','index.html');
(async()=>{const b=await chromium.launch();const page=await (await b.newContext({viewport:{width:755,height:1000}})).newPage();const errs=[];
 page.on('pageerror',e=>errs.push(String(e.message).slice(0,160)));
 await page.route(u=>!/^file:/.test(String(u)),r=>r.abort());await page.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await page.goto('file://'+GAME,{waitUntil:'domcontentloaded'});await page.waitForTimeout(2500);
 await page.evaluate(SRV=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()!==!!SRV&&g<40);window.__nlInner=0;window.__bot=1;Q.length=0;try{deal()}catch(e){}render()},SRV);
 const R=await page.evaluate(([MO,SRV])=>{Q.length=0;const t0=performance.now();const m0=S.month,y0=S.year||0;let wk0=wk(),n=0;
  const tins=()=>{const L=allServ().map(s=>tinOf(s));return{n:L.length,lo:L.filter(x=>x<BAL.svt.tin.out).length,avg:Math.round(L.reduce((a,b)=>a+b,0)/Math.max(1,L.length))}};const T0=tins();
  try{window.nfParked=()=>true;window.agDOn=()=>false/* the staff decide every buổi through asTick (jagstaff part B), the path the day planner feeds */}catch(e){}/* the night contest card (jnf) waits for a tap; a bot week skips it */
  while(wk()-wk0<MO*3&&n<MO*8&&!S.dead){n++;for(let b=0;b<3&&!S.dead;b++){Q.length=0;try{if(typeof nextBuoi==="function")nextBuoi()}catch(e){}try{asTick()}catch(e){}}Q.length=0;try{endTurn()}catch(e){return{err:'endTurn '+e.message}}Q.length=0}
  const A=window.__asN||{};const pk=g=>['chat','gift','ask'].map(k=>k+' '+((A[g]||{})[k]||0)).join(', ');
  return{weeks:wk()-wk0,turns:n,dead:!!S.dead,srv:typeof isSrv==='function'&&isSrv(),ms:Math.round(performance.now()-t0),stat:JSON.parse(JSON.stringify(SVT.stat)),tin0:T0,tin1:tins(),
   peersMaid:pk('maid'),peersSrv:pk('srv'),asN:A.n,asTop:Object.entries(A.maid||{}).sort((a,b)=>b[1]-a[1]).slice(0,8).map(x=>x.join(' ')).join(', '),agOn:typeof agOn==='function'&&agOn()}},[MO,SRV]);
 console.log(JSON.stringify(R,null,1));if(errs.length)console.log('page errors',errs.slice(0,5));await b.close();process.exit(errs.length||R.err?1:0)})();
