/* review/stat-fx-2: (1) diff-glow on re-rendered person card / status tiles, (2) loss number turns red like gain turns green,
   (3) log line has no dangling fragment, (4) mood tile without a cause event has no stand-in picture.
   usage: node dev/test/stat-fx-2.js <url> <outdir> [WxH@dpr,...] */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R={};let fail=0;
 for(const sz of (SIZES||"755x1000@1,1000x755@1,1180x820@1,1366x1024@1,844x390@1").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const res={},errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&typeof kitStatFx==='function',null,{timeout:60000});await sleep(2500);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}
   kn();for(const v of rivals){S.met[v.id]=1};try{for(const v of rivals)k61Meet(v,"gặp",3);k61Meet(S.emp,"gặp",3)}catch(e){};OPT.fxon=true;
   Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');render()});
  await sleep(1500);
  /* (2) HUD loss/gain number colours while glowing */
  res.hud=await p.evaluate(async()=>{const o={};for(const [k,dv] of [['danh',2],['sung',-3]]){const c=document.getElementById('hud-'+k);KSF.seen={};kitStatGlow(c,dv);await new Promise(r=>setTimeout(r,500));const v=c.querySelector('.kstv');o[k]={cls:(c.className.match(/ksf-\w/)||[])[0],color:getComputedStyle(v).color};await new Promise(r=>setTimeout(r,2400))}return o});
  /* (3) log: every line ends like a sentence */
  res.log=await p.evaluate(()=>{const bad=S.logs.map(h=>h.replace(/<[^>]+>/g,"")).filter(t=>t&&!/[.!?…)”"\d]$/.test(t.trim()));return{n:S.logs.length,bad}});
  /* (1)(4) person card: open a rival's card, bump relation, re-render, observe glow */
  const open=([t,k,i])=>{Q.length=0;document.getElementById('modal').hidden=true;tab=t;try{K3SH.home=false}catch(e){};PG[k]=i;render();try{k3Shell()}catch(e){}};
  await p.evaluate(open,['rv','rv',0]);await sleep(3500);
  res.card=await p.evaluate(async()=>{const v=rivals[0];const last=()=>[...document.querySelectorAll('.pc')].filter(e=>e.offsetParent).pop();
   const sleep=t=>new Promise(r=>setTimeout(r,t));const clickT=pc=>{const t=[...pc.querySelectorAll('.pctabs .pct')].find(t=>/Lòng người/.test(t.textContent));if(t)t.click()};
   let pc=last();if(!pc)return{card:false};clickT(pc);await sleep(400);
   const cellsBefore=pc.querySelectorAll('.krt-v,.kst-tile,.kst-chip').length;
   v.rel=(v.rel||0)+7;v.oan=(v.oan||0)+5;v.ghen=Math.max(0,(v.ghen||0)-4);
   render();try{k3Shell()}catch(e){}await sleep(250);const pc2=last();clickT(pc2);await sleep(500);
   const g=[...pc2.querySelectorAll('.ksf-g,.ksf-r')].map(e=>({c:(e.className.match(/ksf-\w/)||[])[0],t:e.textContent.replace(/\s+/g,' ').trim().slice(0,30)}));
   const mood=pc2.querySelector('.pcf-mood');return{card:true,cellsBefore,glow:g,mood:mood?{img:!!mood.querySelector('img,.ksart'),txt:mood.textContent.replace(/\s+/g,' ').trim().slice(0,80)}:null}});
  res.mood=await p.evaluate(()=>{const v=rivals[0];const k0=window.kitEmotion;const f=()=>{const d=document.createElement('div');d.innerHTML=pcfBlocks(v,{},false);const m=d.querySelector('.kskill[data-skill^=mood]');return m?{art:!!m.querySelector('.ksart,img'),txt:m.textContent.replace(/\s+/g,' ').trim().slice(0,70)}:null};
   const o={};o.unknown=f();window.kitEmotion=()=>({k:'lo',name:'Lo âu',v:50,why:'',known:true});try{emoSet(v,'lo',0,'')}catch(e){}o.noCause=f();try{emoSet(v,'lo',60,'Khương Lạc Anh được tấn phong')}catch(e){}o.cause=f();window.kitEmotion=k0;return o});
  await p.screenshot({path:`${OUT}/${wh}-card.jpg`,type:'jpeg',quality:55});
  res.overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);res.errs=errs;R[wh]=res;
  const ok=res.hud.danh.cls==='ksf-g'&&res.hud.sung.cls==='ksf-r'&&res.log.bad.length===0&&res.card.card&&res.mood.unknown&&!res.mood.unknown.art&&!res.overflow&&!errs.length;if(!ok)fail++;console.log(wh,ok?'PASS':'FAIL',JSON.stringify(res));await ctx.close()}
 await b.close();fs.writeFileSync(OUT+'/res.json',JSON.stringify(R,null,1));process.exit(fail?1:0)})();
