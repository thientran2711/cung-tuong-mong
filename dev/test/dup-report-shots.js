/* DUP-REPORT SHOTS (E97f fix r1): (1) the real Hậu cung consort card with its group-tab counts; (2) the «<Tên>: thiện cảm +N (total)» mock on a
   real Kết giao result: the total is READ from game state after the act (aff(v,S) = her thiện cảm toward the player, the number the line shows)
   and appended in-page as plain text on the existing kit row (no new kit part; KK37 builds the real row after her pick).
   usage: node dev/test/dup-report-shots.js <outdir> [url]   → hc-<dev>.png, before-result-<dev>.png, after-result-<dev>.png + facts.json */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const src=fs.readFileSync(__dirname+'/act-audit.js','utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const OUT=process.argv[2],URL=process.argv[3]||'file://'+path.resolve(__dirname,'../../index.html');
const DEV={fold:{width:755,height:1000,mob:true},ipad:{width:1180,height:820,mob:false}};
(async()=>{const b=await chromium.launch();const facts={};
 for(const [dn,D] of Object.entries(DEV)){const ctx=await b.newContext({viewport:{width:D.width,height:D.height},deviceScaleFactor:2,hasTouch:D.mob,isMobile:D.mob,reducedMotion:'reduce',serviceWorkers:'block'});
  const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(3000);await p.evaluate(LIB);
  const f=await p.evaluate(()=>{AA.scen('cao');window.DRclean=()=>{if(!document.getElementById('drcss')){const st=document.createElement('style');st.id='drcss';st.textContent='#klife,.klife,.kload,.kmov,#kroulw,.kroul{display:none!important}';document.head.appendChild(st)}const k=document.getElementById('klife');if(k)k.remove();document.querySelectorAll('.kmov').forEach(e=>e.remove());const c=document.getElementById('curtain');if(c)c.classList.remove('on');
    /* any other full-screen cover (day banner, roulette, loading gate) that sits over the game: hidden for the shot only */
    for(const e of document.body.children){if(['game','rtoast','modal'].includes(e.id)||e.closest('#rtoast,#modal'))continue;const cs=getComputedStyle(e);if(cs.position==='fixed'&&cs.display!=='none'){const r=e.getBoundingClientRect();if(r.width>innerWidth*.6&&r.height>innerHeight*.6)e.style.display='none'}}};
   const sf=AA.surfaces().find(s=>/^rv:/.test(s.id));AA.restore(1);AA.show(sf);let i=-1;
   for(let pi=0;pi<12;pi++){PG.rv=pi;render();const o=typeof rvOrd==="function"?rvOrd():null;const ri=o?o[pi]:pi;const vv=rivals[ri];if(vv&&!vv.queen&&document.querySelector('#panel button[data-a="ally"]:not([disabled])')){i=ri;break}}
   const v=rivals[i];DRclean();const tabs=[...document.querySelectorAll('#panel .pct')].map(t=>t.textContent.replace(/\s+/g," ").trim());return {name:v.name,i,tabs,before:aff(v,S)}});
  await p.waitForTimeout(1500);f.cover=await p.evaluate(()=>{DRclean();let x=document.elementFromPoint(innerWidth/2,innerHeight/2);const c=[];while(x&&c.length<6){c.push(x.tagName+"#"+x.id+"."+String(x.className).slice(0,50));x=x.parentElement}return c.join(" < ")});await p.screenshot({path:`${OUT}/hc-${dn}.png`});
  /* the act: Thỉnh an Hoàng hậu card, every roll forced to success */
  const r=await p.evaluate(async()=>{const q=rivals.find(v=>v.queen&&v.alive);const b0=q?aff(q,S):null;const sf=AA.surfaces().find(s=>s.id==="act");AA.show(sf);
   const btn=[...document.querySelectorAll('#panel button')].find(x=>{const k=x.querySelector('.kan');return k&&/^Thỉnh an Hoàng hậu$/.test(k.textContent.trim())});if(!btn)return {err:"no Thỉnh an Hoàng hậu card"};
   AA.force=true;btn.click();await new Promise(r=>setTimeout(r,200));const m=document.getElementById("modal");let opt=null;
   if(m&&!m.hidden){opt=m.querySelector('.opts button:not([disabled]), .opt:not([disabled])');if(opt){opt.click();await new Promise(r=>setTimeout(r,250))}}
   AA.force=null;DRclean();const mm=document.getElementById("modal");return {queen:q&&q.name,b0,after:q?aff(q,S):null,opt:opt?opt.textContent.replace(/\s+/g," ").trim().slice(0,60):null,toast:(document.getElementById("rtoast")||{}).innerText,modal:mm&&!mm.hidden?mm.innerText.slice(0,300):null}});
  await p.waitForTimeout(900);await p.evaluate(()=>{DRclean();const m=document.getElementById("modal");if(m&&!m.hidden)m.style.display="none"});await p.screenshot({path:`${OUT}/before-result-${dn}.png`});
  const lines=await p.evaluate(()=>{const ppl=[...rivals,...(S.staff||[])].filter(x=>x&&x.name);const L=[];const box=document.getElementById("rtoast");if(!box)return L;
   for(const v of ppl){const RX=new RegExp(v.name.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\s*: thiện cảm [+−-]\\d+");const E=[...box.querySelectorAll('*')].filter(e=>RX.test(e.textContent));if(!E.length)continue;
    const row=E.find(e=>![...e.children].some(c=>E.includes(c)));/* deepest element holding the first such line */
    const tw=document.createTreeWalker(row,NodeFilter.SHOW_TEXT);let n,acc="";const N=[];while((n=tw.nextNode())){N.push([n,acc.length]);acc+=n.nodeValue}
    const m=new RegExp(v.name.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\s*: thiện cảm ([+−-]\\d+)").exec(acc);if(!m)continue;const end=m.index+m[0].length;const hit=N.find(([t,o])=>o<end&&o+t.nodeValue.length>=end);if(!hit)continue;
    const [t,o]=hit;const tot=aff(v,S);const k=end-o;t.nodeValue=t.nodeValue.slice(0,k)+` (${tot<0?"−"+(-tot):tot})`+t.nodeValue.slice(k);L.push({who:v.name,delta:m[1],total:tot,row:row.textContent.slice(0,140)})}return L});
  await p.waitForTimeout(300);f.toastVis=await p.evaluate(()=>{const m=document.getElementById("modal");if(m&&!m.hidden)m.style.display="none";/* a random event card (Kỳ ngộ …) queued after the act: hidden for the shot so the result card shows */
   const t=document.getElementById("rtoast");if(!t)return null;const r=t.getBoundingClientRect();return {on:t.classList.contains("on"),top:Math.round(r.top),h:Math.round(r.height)}});await p.screenshot({path:`${OUT}/after-result-${dn}.png`});
  facts[dn]={...f,...r,lines,perr};await ctx.close()}
 fs.writeFileSync(`${OUT}/facts.json`,JSON.stringify(facts,null,1));console.log(JSON.stringify(facts,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
