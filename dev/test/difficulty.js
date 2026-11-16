/* D31 difficulty modes (jdiff): identity-card picker, knobs, accept/reload, old save, self chip, end card, Sổ luân hồi.
   usage: node dev/test/difficulty.js <url of the built site, e.g. http://127.0.0.1:PORT/> [WxH ...] [SHOT=dir]
   Checks per size: (1) the Độ khó row (kit .kpsec + .ksub) is on the identity card, in normal flow, default Vừa, not overlapping the
   face picker / tiles / choices, every choice button in view after scrolling the card, no horizontal overflow;
   (2) Khó / Dễ / Vừa switch the knobs (base × m + a) and her starting bạc; (3) accepted → kept after render, week end, save + reload;
   (4) an old save without S.diff loads as Vừa with the base knobs; (5) her own card shows the chip "Kiếp này: Khó";
   (6) death: end card row "Độ khó", Khó Phúc duyên ×1.5 line, Sổ luân hồi line; (7) no page errors. */
const {chromium}=require('playwright');
const args=process.argv.slice(2);const URL0=args[0];const VPS=(args.slice(1).length?args.slice(1):['755x1000','1000x755','1180x820','1366x1024','844x390','390x844']).map(s=>s.split('x').map(Number));
const SHOT=process.env.SHOT||'';if(SHOT)require('fs').mkdirSync(SHOT,{recursive:true});
/* same rounding as jdiff: a whole-number base stays whole */
const kn=(b,m,a)=>{const v=b*m+(a||0);return Number.isInteger(b)?Math.round(v):Math.round(v*100)/100};
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const PX=process.env.HTTPS_PROXY||process.env.https_proxy||'';
(async()=>{const b=await chromium.launch({args:['--no-sandbox','--ignore-certificate-errors'],proxy:PX?{server:PX,bypass:'127.0.0.1,localhost'}:undefined});
 for(const [w,h] of VPS){const tag=w+'x'+h;
  const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:true,isMobile:w<1100,reducedMotion:'reduce',ignoreHTTPSErrors:true});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  try{
  await p.goto(URL0,{waitUntil:'domcontentloaded',timeout:180000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof diffOf==='function'&&document.querySelector('#title'),null,{timeout:180000});
  if(w<h&&w<600){ /* phone portrait: the game asks to rotate (KIT §0); only check that nothing throws */
   await p.waitForTimeout(1500);ok(true,`${tag} loaded (rotate prompt size; card checks run in landscape)`);await ctx.close();continue}
  await p.evaluate(()=>{try{localStorage.removeItem('ctm-diff')}catch(e){}kitRoulette=function(o){try{o&&o.done&&o.done()}catch(e){}};const r=$("kroul");if(r)r.remove();SLOT=1;$("title").hidden=true;start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&NLP&&document.querySelector('#modal .kdiff'),null,{timeout:120000});
  await p.waitForTimeout(1500);
  /* the asset loading screen (#kload) can sit over everything on a slow box; tests remove it (as mgeasy.js does) */
  await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove()});
  const base=await p.evaluate(()=>({hz:BAL.hz,poisonNow:BAL.poisonNow,birthMin:BAL.birthMin,outQ:BAL.outQ,mot:J70CFG.mot,bac:S.bac,bac0:S.bac0}));
  const card=await p.evaluate(()=>{const M=$("modal"),d=M.querySelector('.kdiff');const r=e=>{if(!e)return null;const b=e.getBoundingClientRect();return {x:b.x,y:b.y,w:b.width,h:b.height,b:b.bottom,r:b.right}};
   const on=[...d.querySelectorAll('.ksubb')].map(x=>[x.textContent,x.classList.contains('on')]);
   const ov=(a,c)=>a&&c&&a.x<c.r-1&&c.x<a.r-1&&a.y<c.b-1&&c.y<a.b-1;
   const D=r(d);const others=[...M.querySelectorAll('#mb > *')].filter(x=>x!==d&&!x.contains(d)).map(x=>[x.className,r(x)]).filter(x=>x[1]&&x[1].h>0);
   const hit=others.filter(([c,b])=>ov(D,b)).map(x=>x[0]);
   const inOpts=!!d.closest('.kpopts,.nlopts');const pos=getComputedStyle(d.querySelector('.ksub')).position;
   const doc=document.documentElement;return {S:S.diff,on,hit,inOpts,pos,hov:doc.scrollWidth>doc.clientWidth+1,gloss:!!d.querySelector('h4.kpst')}});
  ok(card.S==='vua'&&card.on.map(x=>x[0]).join('/')==='Dễ/Vừa/Khó'&&card.on[1][1],`${tag} card: Độ khó Dễ/Vừa/Khó, default Vừa`,card.on);
  ok(!card.hit.length&&!card.inOpts&&card.pos==='static'&&card.gloss,`${tag} card: own row in flow, no overlap, not in the choice block`,card);
  ok(!card.hov,`${tag} no horizontal overflow`);
  /* Khó */
  await p.click('#modal button[data-diff="kho"]');await p.waitForTimeout(800);
  const kho=await p.evaluate(()=>({d:S.diff,hz:BAL.hz,poisonNow:BAL.poisonNow,birthMin:BAL.birthMin,outQ:BAL.outQ,mot:J70CFG.mot,bac:S.bac,on:[...document.querySelectorAll('#modal .kdiff .ksubb.on')].map(x=>x.textContent),note:(document.querySelector('#modal .kdiff .kpnote')||{}).textContent,ls:localStorage.getItem('ctm-diff')}));
  ok(kho.d==='kho'&&Math.abs(kho.hz-Math.round(base.hz*1.1*100)/100)<1e-9&&kho.birthMin===base.birthMin+4&&kho.outQ===base.outQ+25&&kho.mot===kn(base.mot,1.2)&&kho.bac===Math.round(base.bac0*.7)&&kho.on[0]==='Khó'&&kho.ls==='kho',`${tag} Khó: knobs + bạc ×0.7 + remembered`,{base,kho});
  await p.click('#modal button[data-diff="de"]');await p.waitForTimeout(800);
  const de=await p.evaluate(()=>({d:S.diff,hz:BAL.hz,poisonNow:BAL.poisonNow,birthMin:BAL.birthMin,outQ:BAL.outQ,bac:S.bac}));
  ok(de.d==='de'&&de.poisonNow===0&&de.birthMin===base.birthMin-3&&de.outQ===base.outQ&&de.bac===Math.round(base.bac0*1.5),`${tag} Dễ: knobs from the Vừa base (not from Khó)`,de);
  await p.click('#modal button[data-diff="vua"]');await p.waitForTimeout(800);
  const vu=await p.evaluate(()=>({d:S.diff,hz:BAL.hz,poisonNow:BAL.poisonNow,birthMin:BAL.birthMin,outQ:BAL.outQ,mot:J70CFG.mot,bac:S.bac}));
  ok(vu.hz===base.hz&&vu.poisonNow===base.poisonNow&&vu.birthMin===base.birthMin&&vu.outQ===base.outQ&&vu.mot===base.mot&&vu.bac===base.bac0,`${tag} Vừa: every knob back to base`,vu);
  await p.click('#modal button[data-diff="kho"]');await p.waitForTimeout(2000);
  /* all choice buttons reachable */
  const vis=[];for(let i=0;i<4;i++){const v=await p.evaluate(i=>{const x=[...$("modal").querySelectorAll('.kpopts button,.nlopts button')][i];if(!x)return null;x.scrollIntoView({block:'nearest'});return 1},i);if(!v)break;await p.waitForTimeout(400);
   vis.push(await p.evaluate(i=>{const x=[...$("modal").querySelectorAll('.kpopts button,.nlopts button')][i];const r=x.getBoundingClientRect();const e=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return [x.textContent.slice(0,20),!!(e&&(e===x||x.contains(e))),e&&!(e===x||x.contains(e))?e.tagName+'#'+e.id+'.'+e.className:'']},i))}
  if(SHOT&&!(vis.length&&vis.every(x=>x[1])))await p.screenshot({path:`${SHOT}/visfail-${tag}.jpg`,type:'jpeg',quality:55});
  ok(vis.length&&vis.every(x=>x[1]),`${tag} every identity-card choice is visible and tappable`,vis);
  if(SHOT){await p.evaluate(()=>{const d=document.querySelector('#modal .kdiff');d&&d.scrollIntoView({block:'center'})});await p.screenshot({path:`${SHOT}/card-${tag}.jpg`,type:'jpeg',quality:55})}
  /* accept */
  await p.evaluate(()=>{nlAccept();while(Q.length)Q.shift();try{closeModal()}catch(e){}render()});await p.waitForTimeout(800);
  const acc=await p.evaluate(()=>({d:S.diff,hz:BAL.hz,nl:!!NLP,ctl:!!document.querySelector('.kdiff')}));
  ok(acc.d==='kho'&&!acc.nl&&!acc.ctl&&Math.abs(acc.hz-Math.round(base.hz*1.1*100)/100)<1e-9,`${tag} accepted: Khó kept, no control left`,acc);
  /* self card chip */
  const chip=await p.evaluate(()=>{showSelf();const t=$("modal").textContent;while(Q.length)Q.shift();try{closeModal()}catch(e){}return /Kiếp này: Khó/.test(t)});
  ok(chip,`${tag} her own card shows "Kiếp này: Khó"`);
  /* Sổ luân hồi in-game line */
  const past=await p.evaluate(()=>/Kiếp này: <b>Khó<\/b>/.test(pastHTML()));ok(past,`${tag} in-game Sổ luân hồi line says Kiếp này: Khó`);
  /* week end keeps it */
  await p.evaluate(()=>{try{endTurn()}catch(e){}while(Q.length)Q.shift();try{closeModal()}catch(e){}save()});
  /* reload, load Sổ 1 */
  await p.reload({waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof diffOf==='function'&&typeof loadSlot==='function',null,{timeout:180000});await p.waitForTimeout(1500);
  const rl=await p.evaluate(()=>{const b=document.querySelector('#slots [data-load="1"]');if(b)b.click();try{render()}catch(e){}return {d:S&&S.diff,hz:BAL.hz,mot:J70CFG.mot}});
  ok(rl.d==='kho'&&Math.abs(rl.hz-Math.round(base.hz*1.1*100)/100)<1e-9&&rl.mot===kn(base.mot,1.2),`${tag} reload: Khó life loads with Khó knobs`,rl);
  /* old save: no S.diff */
  /* (edited in storage, then loaded from the title in the same page: a reload would save the live Khó life over the edit on unload) */
  const old=await p.evaluate(()=>{const k='hclh-save-v2-1';const d=JSON.parse(localStorage.getItem(k));delete d.S.diff;delete d.S.bac0;localStorage.setItem(k,JSON.stringify(d));
   $("title").hidden=false;showTitle();const b=document.querySelector('#slots [data-load="1"]');if(b)b.click();try{render()}catch(e){}return {d:diffOf(),sd:S.diff,name:diffName(),hz:BAL.hz,poisonNow:BAL.poisonNow,outQ:BAL.outQ}});
  ok(old.d==='vua'&&old.hz===base.hz&&old.poisonNow===base.poisonNow&&old.outQ===base.outQ,`${tag} old save (no S.diff) = Vừa, base knobs`,old);
  /* Khó death: end card row + Phúc duyên ×1.5 + Sổ luân hồi */
  const end=await p.evaluate(()=>{S.diff='kho';S.kpTron=1;render();const pd0=pdGet();try{over("Qua đời","Thử kết kiếp.","bệnh")}catch(e){return {err:String(e)}}
   const M=Q.find(x=>x&&x.cls==="end");const h=M?M.h:"";const L=lifeLog()[0]||{};
   return {row:/<span class="krl">Độ khó<\/span><span class="krv"><span class="ef t">Khó<\/span>/.test(h),line:/kiếp khó: \+\d+/.test(h),gain:pdGet()-pd0,log:L.f}});
  ok(end.row&&end.line&&/Kiếp này: Khó/.test(end.log||''),`${tag} Khó death: end-card row, ×1.5 Phúc duyên line, Sổ luân hồi`,end);
  if(SHOT&&tag==='1180x820'){await p.waitForTimeout(800);await p.screenshot({path:`${SHOT}/end-${tag}.jpg`,type:'jpeg',quality:55})}
  ok(!errs.length,`${tag} no page errors`,errs.slice(0,5));
  }catch(e){ok(false,`${tag} run`,String(e).slice(0,300))}
  await ctx.close()}
 await b.close();const n=res.filter(x=>!x).length;console.log(n?`${n} FAIL`:'ALL OK');process.exit(n?1:0)})();
