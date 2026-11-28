/* node run.js WxH@dpr OUTDIR : each season x each buoi, every scene; checks chosen bg + feet on floor + no page errors */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');
const [,,SZ,OUT]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();
const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+DPR,hasTouch:W<1100});const p=await ctx.newPage();
const errs=[],bad=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errs.push('console:'+m.text().slice(0,160))});
p.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url().split('/').pop())});
await p.route('**/pixi.min.js',r=>r.fulfill({path:process.env.PIXI,contentType:'application/javascript'}));
await p.goto('http://localhost:8941/t-seasons.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
await p.click('[data-new]');await p.waitForTimeout(1200);
const clear=async()=>{for(let i=0;i<16;i++){const st=await p.evaluate(()=>{const d=document.getElementById('dawn');if(d&&!d.hidden){const g=document.getElementById('dawn-go');if(g){g.click();return 1}}
 const m=document.getElementById('modal');if(!m||m.hidden)return 0;const bs=[...m.querySelectorAll('button')].filter(b=>b.offsetParent&&!b.disabled);const pr=bs.find(b=>b.dataset.nl!==undefined)||bs.find(b=>b.id==='mclose')||bs[bs.length-1];if(pr){pr.click();return 1}return 0});if(!st)return;await p.waitForTimeout(450)}};
await clear();await p.waitForTimeout(600);await clear();
const R=[];const SE=[[2,'xuan'],[5,'ha'],[8,'thu'],[11,'dong']];
if(process.env.BUOI4)await p.evaluate(()=>{if(BUOI.length<4)BUOI.splice(1,0,'Buổi trưa')});
const nb=await p.evaluate(()=>BUOI.length);
const places=await p.evaluate(()=>{const o={};for(const x of places())if(SCIMG[x.sc]&&!o[x.sc])o[x.sc]=x.k;o.home='home';return o});
for(const [m,se] of SE)for(let bu=0;bu<nb;bu++){
 for(const [sc,k] of Object.entries(places)){
  const r=await p.evaluate(([m,bu,k])=>{S.month=m;S.buoi=bu;S.place=k;try{if(typeof Q!=='undefined')Q.length=0}catch(e){}
   document.getElementById('modal')&&(document.getElementById('modal').hidden=true);render();
   const im=document.getElementById('scimg');const bg=(im.style.backgroundImage.match(/img\/([^.]+)\.webp/)||[])[1]||'';
   return {bg,ev:typeof evArt==='function'?evArt():''}},[m,bu,k]);
  await p.waitForTimeout(450);
  const f=await p.evaluate(()=>{const st=document.getElementById('stage').getBoundingClientRect();const me=document.getElementById('mefig');
   const toks=[...document.querySelectorAll('#tokens .tok')].filter(e=>e.offsetParent);
   const feet=[me,...toks].filter(Boolean).map(e=>Math.round(st.bottom-e.getBoundingClientRect().bottom));let px=null;try{px=(typeof PX==='object'&&PX.app)?(PIXI.Assets.cache.has('img/'+((document.getElementById('scimg').style.backgroundImage.match(/img\/([^.]+)\.webp/)||[])[1])+'.webp')?'ok':'miss'):'nopx'}catch(e){px='err'}return {px,feet,kf:getComputedStyle(document.getElementById('stage')).getPropertyValue('--kfb')}});
  R.push({se,bu,sc,...r,...f});
  if(sc==='vuon'||sc==='home'||sc==='kn')await p.screenshot({timeout:90000,animations:'disabled',path:`${OUT}/${SZ.replace('@','_')}-n${nb}-${se}-b${bu}-${sc}.png`});
 }}
const BU=nb>=4?['sang','trua','chieu','toi']:['sang','chieu','toi'];
const pxMiss=R.filter(x=>x.px==='miss').map(x=>x.sc+':'+x.se+x.bu);const pxStat=[...new Set(R.map(x=>x.px))];const wrong=R.filter(x=>!x.bg.endsWith('-'+x.se+'-'+BU[x.bu])||x.ev.indexOf(x.bg+'.webp')<0);
console.log(JSON.stringify({size:SZ,buoi:nb,n:R.length,wrong:wrong.length,pxStat,pxMiss:pxMiss.slice(0,8),wrongList:wrong.slice(0,10).map(x=>x.sc+':'+x.se+x.bu+':'+x.bg),feetRange:[Math.min(...R.flatMap(x=>x.feet)),Math.max(...R.flatMap(x=>x.feet))],sample:R.filter(x=>x.sc==='vuon'||x.sc==='home').map(x=>`${x.se}/${x.bu}/${x.sc}:${x.bg} ev=${x.ev.split('/').pop()} feet=${x.feet.join(',')}`),errors:[...new Set(errs)],http:[...new Set(bad)]},null,1));await b.close()})().catch(e=>{console.log('FATAL',e.message);process.exit(1)});
