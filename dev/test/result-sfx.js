/* result-sfx test (D1): one central result sound per result, independent of kmOn; ok arg of kg82ShowRes; WebAudio/iOS layer (unlock, gain-routed music, buffers).
   usage: node dev/test/result-sfx.js <site url> <W>x<H> [more sizes...]   (one Chromium at a time; autoplay flag so <audio> really plays) */
const {chromium}=require('playwright');
const [,,URL,...SZ]=process.argv;
(async()=>{const out=[];let allOk=true;
 for(const sz of SZ){const [W,H]=sz.split('x').map(Number);const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[],bad=[];p.on('pageerror',e=>errs.push((e.stack||e.message).slice(0,300)));p.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url().slice(0,120))});
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitResultSfx==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await p.waitForTimeout(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s){Q.length=0;start()}return s});if(!srv)break}
  await p.evaluate(()=>{document.querySelectorAll(".kroul,#kroul").forEach(e=>e.remove());Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;tab="go";render()});
  const R=[];const ck=(name,ok,info)=>R.push({name,ok:!!ok,info});
  /* default */
  const def=await p.evaluate(()=>({snd:OPT.snd,sw:typeof SND_DEFAULT!=="undefined"?SND_DEFAULT:null,stored:localStorage.getItem("hclh-opt")}));ck("OPT.snd default follows SND_DEFAULT (=false, unchanged)",def.sw===false&&def.snd===false,def);
  /* real gestures: touchend unlocks WebAudio */
  await p.touchscreen.tap(5,5);await p.waitForTimeout(400);
  const un=await p.evaluate(()=>({unlocked:AU.unlocked,ctx:!!AU.ctx,state:AU.ctx&&AU.ctx.state,pre:AU.pre,audioSession:navigator.audioSession?navigator.audioSession.type:"n/a"}));
  ck("tap unlocks: AU.unlocked + AudioContext running",un.unlocked&&un.ctx&&un.state==="running",un);
  await p.evaluate(()=>{OPT.snd=true;OPT.mute=false;OPT.sfx=.7;OPT.mus=.5;OPT.fxon=true;AU.unlocked=true;window.__bot=false;auTick()});await p.waitForTimeout(1500);
  /* music through a gain node */
  const mu=await p.evaluate(()=>{const a=AU.cur;if(!a)return{none:1};const g=a.__gain;const r={routed:!!g,vol:a.volume};a.volume=.3;r.gain=g&&+g.gain.value.toFixed(3);OPT.mute=true;auTick();r.muted=g&&g.gain.value;OPT.mute=false;auTick();r.back=g&&+g.gain.value.toFixed(3);return r});
  ck("music routed through GainNode; volume setter drives gain; mute -> 0",mu.routed&&mu.gain===.3&&mu.muted===0&&mu.back>0,mu);
  /* WebAudio sfx once decoded */
  await p.waitForTimeout(2500);
  const wb=await p.evaluate(()=>{KSFX.last={};KSFX.live=[];const n=KSFX.log.length;kitSfx("win");return{bufReady:!!(AU.bufs&&AU.bufs["sfx-win"]&&AU.bufs["sfx-win"].buf),log:KSFX.log.slice(n)}});
  ck("sfx plays from a decoded AudioBuffer (log.w=1)",wb.bufReady&&wb.log.length&&wb.log[0].w===1,wb);
  const clean=()=>p.evaluate(()=>{document.querySelectorAll(".kmov,.kroul-ov,#kpodov").forEach(e=>e.remove());Q.length=0;KSFX.last={};KSFX.rs=-1e9;KSFX.mgShown=0;KSFX.live.forEach(v=>{try{v.a.pause()}catch(e){}});KSFX.live=[];KSFX.log.length=0});
  const card=(ok,title,extra)=>`(()=>{const bf=Object.fromEntries(RKEYS.map(([k])=>[k,S[k]||0]));S.sung=(S.sung||0)+${ok?3:-1};resultShow(${JSON.stringify(title)},bf,${ok});${extra||""}})()`;
  const names=async(ms,silent)=>{if(silent)await p.waitForTimeout(3500);else{await p.evaluate(()=>new Promise(res=>{const t0=performance.now();const iv=setInterval(()=>{if(KSFX.log.some(x=>/win|fail|expose|scheme|learn/.test(x.n))||performance.now()-t0>12000){clearInterval(iv);setTimeout(res,900)}},200)}))}return p.evaluate(()=>({n:KSFX.log.map(x=>x.n),dr:KSFX.drop.slice(-4).map(x=>x.n+":"+x.why),res:KSFX.log.filter(x=>x.m==="result").length,rs:KSFX.rs,drop:KSFX.rsDrop}))};
  /* result cards */
  await clean();await p.evaluate(card(true,"Dâng trà"));let r=await names();ck("card THÀNH: seal + win once",r.n.filter(x=>x==="sfx-seal-stamp").length===1&&r.n.filter(x=>x==="sfx-win").length===1,r);
  await clean();await p.evaluate(card(false,"Bày mưu"));r=await names();ck("card HỎNG: seal + fail once",r.n.filter(x=>x==="sfx-seal-stamp").length===1&&r.n.filter(x=>x==="sfx-fail").length===1,r);
  await clean();await p.evaluate(()=>{window.__kmOn0=window.kmOn;window.kmOn=()=>false});await p.evaluate(card(true,"Dâng trà (kmOn tắt)"));r=await names();await p.evaluate(()=>{window.kmOn=window.__kmOn0});
  ck("card sound independent of kmOn",r.n.includes("sfx-win")&&r.n.includes("sfx-seal-stamp"),r);
  await clean();await p.evaluate(card(true,"Hai lần")+";"+card(true,"Hai lần b"));r=await names();ck("two results within 1.5 s -> one sound (dedupe)",r.n.filter(x=>x==="sfx-win").length===1&&r.drop>=1,{n:r.n,drop:r.drop});
  await clean();await p.evaluate(()=>{const bf=Object.fromEntries(RKEYS.map(([k])=>[k,S[k]||0]));resultShow("Không đổi",bf,true)});r=await names(900,1);ck("empty result (nothing shown) -> no sound",!r.n.includes("sfx-win")&&!r.n.includes("sfx-seal-stamp"),r);
  /* minigame panels */
  const mg=async(name,ok,want,not)=>{await clean();await p.evaluate(ok=>{try{kg82Close()}catch(e){}kg82Open({art:"Cầm",title:"Thử",how:"x"});KG82.phase="result";kg82ShowRes('<div class="kg82act"><button id="kg82ok">Đã hiểu</button></div>',ok)},ok);const x=await names(900,!want.length);
   ck(name,want.every(w=>x.n.includes(w))&&!not.some(w=>x.n.includes(w)),x)};
  await mg("minigame ok=true -> learn-good once",true,["sfx-learn-good"],["sfx-learn-bad","sfx-seal-stamp"]);
  await mg("minigame ok=false -> learn-bad once",false,["sfx-learn-bad"],["sfx-learn-good"]);
  await mg("minigame ok=null (exam final) -> silent",null,[],["sfx-learn-good","sfx-learn-bad"]);
  await mg("minigame ok omitted -> silent",undefined,[],["sfx-learn-good","sfx-learn-bad"]);
  await clean();await p.evaluate(()=>{try{kg82Close()}catch(e){}kg82Open({art:"Cầm",title:"Thử",how:"x"});KG82.phase="result";kg82ShowRes("<p>a</p>",true);kg82ShowRes("<p>b</p>",true);});r=await names(900);ck("kg82ShowRes twice -> one sound",r.n.filter(x=>x==="sfx-learn-good").length===1,r);
  await clean();await p.evaluate(()=>{try{kg82Close()}catch(e){}kg82Open({art:"Cầm",title:"Thử",how:"x"});KG82.phase="result";kg82ShowRes("<p>a</p>",true);setTimeout(()=>feedback("good"),300)});r=await names(1100);ck("legacy openMG feedback(good) right after a panel -> dropped",r.n.filter(x=>x==="sfx-learn-good").length===1,r);
  /* podium owns the contest sound */
  await clean();const pod=await p.evaluate(()=>{try{kg82Close()}catch(e){}kg82Open({art:"Cầm",title:"Thử",how:"x"});KG82.phase="result";let c=0;Object.defineProperty(KSFX,"podAt",{get(){return c++},set(v){},configurable:true});/* podAt changes during the call = kitPodiumShow ran inside */kg82ShowRes("<p>a</p>",true);delete KSFX.podAt;return 1});r=await names(900,1);ck("contest with podium: podium owns it -> no extra mgwin",!r.n.includes("sfx-learn-good"),r);
  /* sound off */
  await clean();await p.evaluate(()=>{OPT.snd=false});await p.evaluate(card(true,"Tắt tiếng"));r=await names(900,1);ck("Tiếng off -> nothing plays",r.n.length===0,r);await p.evaluate(()=>{OPT.snd=true});
  const pass=R.every(x=>x.ok)&&!errs.length&&!bad.length;allOk=allOk&&pass;
  out.push({size:sz,ok:pass,pageErrors:errs,http4xx:bad.slice(0,6),checks:R});console.error(sz,pass?"PASS":"FAIL",R.filter(x=>!x.ok).map(x=>x.name+" "+JSON.stringify(x.info)).join(" | "));
  await ctx.close();await b.close()}
 console.log(JSON.stringify(out,null,1));process.exit(allOk?0:1)})().catch(e=>{console.error(e);process.exit(1)});
