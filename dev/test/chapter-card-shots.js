/* review/chapter-card: shots of every Mệnh truyện sub-tab at Fold 755x1000 + iPad 1180x820 (HOST mode = what a player sees).
   usage: NODE_PATH=$(npm root -g) node dev/test/chapter-card-shots.js <outdir> [states,comma]   shots stay OUTSIDE the repo. */
const {chromium}=require('playwright');const D=require('./lib/device');const OUT=process.argv[2];
const STATES=(process.argv[3]||'ms,rank,past').split(',');
const RGS=()=>{S.ps=1;S.reign={done:{},tr:0,sw:0,t0:S.turn,power:50,side:''};try{if(typeof trS==='function'&&!trS()&&S.trieu==null)S.trieu={}}catch(e){}};
const PRE={rg:RGS,rg2:RGS,rgm:RGS,rgl:RGS,past:()=>{try{S.st.ch.past=[{n:1,k:1,tag:'Thành',t:'Nhập cung'}];S.r97=[]}catch(e){}}};
const SUB={dlg:'now',rg2:'rg',rgm:'rg',ms:'now',arc:'now',v1:'now',rank:'rank',past:'past',rg:'rg',rgl:'rgl',pt:'pt'};
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();
 for(const dev of ['fold','ipadAir']){
  const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1200);
  await g.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='td';document.getElementById('title').hidden=true;start()});
  await g.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(1800);
  await g.addStyleTag({content:'#kroul,#kroulw,#ktut,.kmov{display:none!important}'});
  const reset=()=>g.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,#kpop,.kmov').forEach(e=>e.remove());try{kitCatchOff()}catch(e){}const kc=document.getElementById('kxcatch');if(kc)kc.hidden=true;const md=document.getElementById('modal');md.hidden=true;md.className='modal';try{NLP=null}catch(e){}Q.length=0});
  await reset();
  await g.evaluate(()=>{tab='act';render()});await p.waitForTimeout(500);await p.screenshot({path:`${OUT}/${dev}-act.png`});
  for(const st of STATES){await reset();await g.evaluate(f=>{if(f)new Function('return '+f)()()},PRE[st]?PRE[st].toString():null);await g.evaluate(([st,k])=>{tab='story';render();KTSUB.story=k;renderPanel()},[st,SUB[st]]);await p.waitForTimeout(600);if(st==='rg2')await g.evaluate(()=>{document.querySelector('[data-ksgo="1"]').click();document.querySelector('[data-ksgo="1"]').click()});if(st==='dlg')await g.evaluate(()=>kitGoalDetail());if(st==='rgm')await g.evaluate(()=>document.querySelector('[data-ksmuc]').click());await p.waitForTimeout(500);await p.screenshot({path:`${OUT}/${dev}-${st}.png`})}
  console.log(dev,'errs',errs);await ctx.close()}
 await b.close();srv.close()})();
