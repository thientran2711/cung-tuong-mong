/* ACT-MERGE J3 LOOK: real taps on Fold 755x1000 + iPad 1180x820 (law 12), with video. Hành sự list → tap a door card → the kit option
   dialog → tap one way → the way's own result. usage: node dev/test/act-merge-j3-look.js <outdir> [url] [door key, default "nghi"] */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const src=fs.readFileSync(path.join(__dirname,'act-audit.js'),'utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const OUT=process.argv[2],URL=process.argv[3]||'file://'+path.resolve(__dirname,'../../index.html'),DOOR=process.argv[4]||'nghi';fs.mkdirSync(OUT,{recursive:true});
const CLEAN=`window.DRclean=()=>{if(!document.getElementById('drcss')){const st=document.createElement('style');st.id='drcss';st.textContent='#klife,.klife,.kload,.kmov,#kroulw,.kroul{display:none!important}';document.head.appendChild(st)}const k=document.getElementById('klife');if(k)k.remove();document.querySelectorAll('.kmov').forEach(e=>e.remove());for(const e of document.body.children){if(['game','rtoast','modal'].includes(e.id)||e.closest('#rtoast,#modal'))continue;const cs=getComputedStyle(e);if(cs.position==='fixed'&&cs.display!=='none'){const r=e.getBoundingClientRect();if(r.width>innerWidth*.6&&r.height>innerHeight*.6)e.style.display='none'}}};`;
const DEV={fold:{width:755,height:1000,mob:true},ipad:{width:1180,height:820,mob:false}};
(async()=>{const b=await chromium.launch();const facts={};
 for(const [dn,D] of Object.entries(DEV)){const ctx=await b.newContext({viewport:{width:D.width,height:D.height},deviceScaleFactor:1,hasTouch:D.mob,reducedMotion:'reduce',serviceWorkers:'block',recordVideo:{dir:OUT,size:{width:D.width,height:D.height}}});
  const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(2500);
  await p.evaluate(LIB);await p.evaluate(CLEAN);
  await p.evaluate(()=>{AA.scen('cao');S.bac=Math.max(S.bac,300);S.suc=Math.max(S.suc,90);deal();AA.hide();tab="act";try{K3SH.home=false}catch(e){}render();try{k3Shell()}catch(e){}DRclean()});
  await p.waitForTimeout(1500);await p.evaluate(()=>{DRclean();const m=document.getElementById('modal');if(m&&!m.hidden&&!Q.length)m.hidden=true});
  /* one-page Fold: the room page shows first; a real tap on the «Hành sự» tab opens the card page (jk3 K3SH) */
  for(let t=0;t<2;t++){const hb=await p.evaluate(()=>{const g=document.querySelector('.game');if(!g||!g.classList.contains('k3home'))return null;const b=[...document.querySelectorAll('nav button, .tabs button, button')].find(x=>x.textContent.trim()==="Hành sự"&&x.getClientRects().length);if(!b)return null;const q=b.getBoundingClientRect();return {x:q.x+q.width/2,y:q.y+q.height/2}});if(!hb)break;await p.mouse.click(hb.x,hb.y);await p.waitForTimeout(900);await p.evaluate(()=>DRclean())}
  const list=await p.evaluate(()=>[...document.querySelectorAll('#panel .cards > button')].filter(b=>!b.hidden).map(b=>(b.dataset.hsd?"[cửa] ":"")+((b.querySelector('.kan')||{}).textContent||"").trim()));
  await p.screenshot({path:`${OUT}/${dn}-1-list.png`});
  const r=await p.evaluate(k=>{const b=document.querySelector(`#panel button[data-hsd="${k}"]`);if(!b)return null;b.scrollIntoView({block:"center"});const q=b.getBoundingClientRect();return {x:q.x+q.width/2,y:q.y+Math.min(60,q.height/2)}},DOOR);
  await p.waitForTimeout(600);if(!r){facts[dn]={err:"no door "+DOOR,list};await ctx.close();continue}
  await p.screenshot({path:`${OUT}/${dn}-2-door.png`});
  await p.mouse.click(r.x,r.y);await p.waitForTimeout(1200);
  const dlg=await p.evaluate(()=>{const m=document.getElementById('modal');return {open:!m.hidden,t:Q[0]&&Q[0].t,door:Q[0]&&Q[0].hsDoor,opts:[...m.querySelectorAll('.opts button.opt')].map(o=>({n:(o.querySelector('.kan')||o).textContent.replace(/\s+/g," ").trim().slice(0,40),off:o.disabled||o.classList.contains('kdis')}))}});
  await p.screenshot({path:`${OUT}/${dn}-3-dialog.png`});
  const o=await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .opts button.opt')].find(x=>!x.disabled&&!x.classList.contains('kdis'));if(!b)return null;b.scrollIntoView({block:"center"});const q=b.getBoundingClientRect();return {x:q.x+q.width/2,y:q.y+q.height/2,n:(b.querySelector('.kan')||b).textContent.trim().slice(0,40),u:used}});
  if(o){await p.mouse.click(o.x,o.y);await p.waitForTimeout(1800)}
  const after=await p.evaluate(()=>({used,toast:((document.getElementById('rtoast')||{}).innerText||"").replace(/\s+/g," ").slice(0,200),q:Q.map(m=>m.t)}));
  await p.screenshot({path:`${OUT}/${dn}-4-result.png`});
  facts[dn]={list,dlg,picked:o&&o.n,usedBefore:o&&o.u,after,perr};await p.waitForTimeout(500);const v=p.video();await ctx.close();try{fs.renameSync(await v.path(),`${OUT}/${dn}-${DOOR}.webm`)}catch(e){}}
 fs.writeFileSync(`${OUT}/facts.json`,JSON.stringify(facts,null,1));console.log(JSON.stringify(facts,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
