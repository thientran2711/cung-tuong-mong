/* chap-label: a save made with the build BEFORE this branch (main) loads in this build; the story labels then show Chương · Hồi.
   Three saves: v3 life at an arc chapter, the same with A.chap removed (older v2 thread), and an old v1 story (no chapters).
   usage: NODE_PATH=$(npm root -g) node dev/test/chap-label-oldsave.js <before url> <after url> */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const [,,BEF,AFT]=process.argv;
(async()=>{const b=await chromium.launch();const errs=[];
 const boot=async(url)=>{const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();p.on('pageerror',e=>errs.push(url.slice(-12)+': '+e.message.slice(0,160)));
  await p.goto(url,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1200);return p};
 const p0=await boot(BEF);
 const saves=await p0.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;window.__forceOrigin='td';document.getElementById('title').hidden=true;start();
  const A=newThread67('td_an','m');S.st.ch.n=2;A.chap=2;A.i=1;pickNext67(A);A.due=0;A.dl=S.turn+6;S.st.M=A;S.st.ms=null;const v3=JSON.stringify(ser());
  delete A.chap;const v2=JSON.stringify(ser());S.st={step:1,done:0,tag:''};const v1=JSON.stringify(ser());return{v3,v2,v1}});
 await p0.close();
 const p=await boot(AFT);const out={};
 for(const k of ['v3','v2','v1']){out[k]=await p.evaluate(s=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;Q.length=0;
   deser(JSON.parse(s));tab='story';render();const card=(document.querySelector('#panel .kskill')||{}).innerText||'';tab='act';render();
   const head=(document.querySelector('#panel .obj67')||{}).innerText||'';let t='';
   Q.length=0;if(S.st.v2){fireBeat67(S.st.M);t=Q[0]&&Q[0].t}else{pushDil({t:'x',o:[{n:'ok'}]},'Tuyến truyện');t=Q[0]&&Q[0].t}Q.length=0;
   for(let i=0;i<3;i++){try{used=0;nextBuoi()}catch(e){return{err:e.message}}Q.length=0}
   return{card:card.replace(/\s+/g,' '),head:head.replace(/\s+/g,' ').slice(0,90),t}},saves[k])}
 console.log(JSON.stringify(out,null,1));
 const ok=/Chương 2 · Hồi 2\/\d/.test(out.v3.t)&&/Chương 2 · Hồi/.test(out.v3.head)&&/Chương 2.*Hồi 2\//.test(out.v3.card)
  &&/Chương 2 · Hồi 2\/\d/.test(out.v2.t)&&/Chương 1 · Hồi \d\/\d/.test(out.v1.t)&&/Chương 1.*Hồi \d\//.test(out.v1.card)&&!errs.length;
 console.log(ok?'PASS':'FAIL',errs);await b.close();process.exit(ok?0:1)})().catch(e=>{console.error(e);process.exit(2)});
