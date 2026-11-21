/* review/kit-opt-sg (K-OPT-SG, law 4 + law 11): her own Sủng in an option's literal x text is drawn through sg() like apply().
   For traits none / nóng nảy / lạnh lùng: optLine + dilLine on synthetic options (x literal «thành: Sủng +4 · hỏng: Sủng -3», plus fmt(w) Sủng +2 that is already sg'd),
   checks shown == sg(v) for the x numbers, fmt part sg'd ONCE, someone else's Sủng («nàng Sủng -5», «Hoàn Bích Sủng -15») untouched, x restored after the call;
   then the REAL option j7 «Tự trình lên Hoàng thượng» (rv probe): card number == the number apply() adds.  usage: node dev/test/kit-opt-sg.js <url> <outdir> */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(240000);
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof optSgTxt==='function'&&typeof start==='function',null,{timeout:240000});await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{SLOT=3;try{start()}catch(e){}const out=[],bad=[];const txt=h=>{const d=document.createElement('div');d.innerHTML=h;return d.textContent};
  const setTr=t=>{S.emp=S.emp||{};const T0=(typeof EMP!=='undefined'&&EMP)||null;window.__tr=t};
  const has0=window.has;
  for(const tr of ['','nongnay','lanhlung']){window.has=k=>k===tr?true:(k==='nongnay'||k==='lanhlung'?false:has0(k));
   const a={n:'Thử',x:'Khá chắc · thành: Sủng +4 · hỏng: Sủng -3 · kèm: nàng Sủng -5, Hoàn Bích Sủng -15',w:{sung:2}};const c={n:'Thử',x:'Khó · thành: Danh +2, Sủng +3',fx:{sung:-2}};
   const t1=txt(optLine(a)),t2=txt(dilLine(c));const want=v=>(sg(v)>0?'+':'-')+Math.abs(sg(v));
   const ok1=t1.includes('Sủng '+want(4))&&t1.includes('Sủng '+want(-3))&&t1.includes('nàng Sủng -5')&&t1.includes('Hoàn Bích Sủng -15')&&t1.includes('Sủng '+want(2))&&a.x.includes('Sủng +4');
   const ok2=t2.includes('Sủng '+want(3))&&t2.includes('Sủng '+want(-2))&&c.x.includes('Sủng +3');
   out.push({tr:tr||'none',sg4:sg(4),sgm3:sg(-3),sg2:sg(2),t1:t1.slice(0,160),t2:t2.slice(0,120),ok1,ok2});if(!ok1||!ok2)bad.push(tr||'none')}
  window.has=has0;return {out,bad}});
 console.log(JSON.stringify(r.out,null,0));
 /* the real option: «Tự trình lên Hoàng thượng» j7 card vs apply, nóng nảy */
 const real=await p.evaluate(()=>{const has0=window.has;window.has=k=>k==='nongnay'?true:k==='lanhlung'?false:has0(k);try{const v=BAL.eff.j7.sungGo;const x=`Khá chắc · thành: Sủng ${balSg(v)} · hỏng: Sủng ${balSg(BAL.eff.j7.sungGo_2)}`;
   const d=document.createElement('div');d.innerHTML=optLine({n:'Tự trình lên Hoàng thượng',x,fx:{danh:-3}});const shown=+(/thành: Sủng ([+\-]\d+)/.exec(d.textContent)||[])[1];
   const s0=S.sung;apply({sung:v});const applied=S.sung-s0;S.sung=s0;return {shown,applied}}finally{window.has=has0}});
 console.log('real j7',JSON.stringify(real));const bad=r.bad.length||real.shown!==real.applied;
 console.log(bad?'FAIL '+r.bad.join(',')+(real.shown!==real.applied?' real j7 shown '+real.shown+' applied '+real.applied:''):'PASS');await b.close();process.exit(bad?1:0)})();
