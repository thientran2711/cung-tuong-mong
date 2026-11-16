/* review/appearance-port: face-condition overlays (ill, poison, slap, rash) + penalty, on the current figure system.
   usage: node dev/test/appearance-port.js <page url> <W>x<H>@dpr [outdir] */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,SZ,OUT]=process.argv;const [WH,DPR]=(SZ||'1180x820@1').split('@');const [W,H]=WH.split('x').map(Number);
if(OUT)fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),serviceWorkers:'block',reducedMotion:'reduce',hasTouch:W<1100,isMobile:W<1100});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));const bad=[];p.on('response',r=>{if(r.status()>=400&&/img\//.test(r.url()))bad.push(r.status()+' '+r.url().slice(-60))});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.waitForTimeout(5000);
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true;render()});
 const tag=SZ.replace(/[@x]/g,'_');const R={size:SZ,steps:[]};
 const shot=async n=>{if(OUT)await p.screenshot({path:`${OUT}/ap-${n}-${tag}.jpg`,type:'jpeg',quality:70})};
 const st=()=>p.evaluate(()=>{const f=[...document.querySelectorAll('.kfx>*,.kfxf>*')].map(e=>e.className.baseVal||e.className).filter(Boolean);return {sac:effSac(S),layers:f,ovx:document.documentElement.scrollWidth>innerWidth+2}});
 R.base=await st();
 /* 1 rash (her), each level */
 for(const sev of [1,2,3]){const r=await p.evaluate(async sev=>{S.rash=null;rashGive(S,sev,'thử');render();await new Promise(r=>setTimeout(r,800));return{sac:effSac(S),chip:rshOf(S).chip}},sev);R.steps.push(['rash',sev,r,(await st()).layers.join(',')]);if(sev===3)await shot('rash3')}
 /* veil works for a rash */
 R.veil=await p.evaluate(()=>{const k=vlKey(Math.min(8,wdPOf(S)),0);S.inv=S.inv||[];S.inv.push({k,src:'cu'});const ix=S.inv.length-1;const n=vlWear(S,ix);render();return{worn:n,need:vlNeed(S),sac:effSac(S),lost:rshOf(S).lost,veiled:rshOf(S).veiled}});
 await p.waitForTimeout(600);R.veil.layers=(await st()).layers.join(',');await shot('rash-veil');
 await p.evaluate(()=>{vlOff(S);S.rash=null;render()});
 /* 2 ill / poison / slap / penalty */
 const base=await p.evaluate(()=>effSac(S));
 for(const [k,fn] of [['ill',()=>{S.sick=2}],['poison',()=>{pzGive(S,2,'thử',null)}],['slap',()=>{slapGive(S,rivals[0],'thử')}],['pen',()=>{penGive(S,'truong','thử')}]]){
  await p.evaluate(fn=>{S.sick=0;S.pz=null;S.slap=null;S.pen=null;S.rash=null;new Function('return '+fn)()();render()},fn.toString());await p.waitForTimeout(900);const s=await st();R.steps.push([k,{d:base-s.sac},s.layers.join(','),s.ovx]);await shot(k)}
 /* a consort with a rash: layer in her card, chip only if known */
 R.npc=await p.evaluate(async()=>{const v=liveRivals(true)[0];S.sick=0;S.pz=null;S.slap=null;S.pen=null;rashGive(v,2,'thử');v.pz=null;tab='rv';PG.rv=rivals.indexOf(v);render();await new Promise(r=>setTimeout(r,1200));return{name:v.name,known:KIT_RASH.on(v),layers:[...document.querySelectorAll('.kfx>*,.kfxf>*')].map(e=>e.className.baseVal||e.className).join(',')}});await shot('npc');
 /* weekly passes: healing + cards, no errors */
 R.week=await p.evaluate(async()=>{S.rash=null;rashGive(S,3,'thử');pzGive(S,2,'thử',null);slapGive(S,rivals[0],'');penGive(S,'quy','');for(let i=0;i<6;i++){try{if(typeof nextWeek==='function')nextWeek();else endTurn()}catch(e){return 'ERR '+e.message}}return{rash:!!S.rash,pz:!!S.pz,slap:!!S.slap,pen:!!S.pen,wk:wk()}});
 /* acts exist for NPC logic */
 R.acts=await p.evaluate(()=>['tat','phatquy','rash','poison'].map(k=>!!ACT[k]));
 R.errs=errs;R.bad=bad;console.log(JSON.stringify(R));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
