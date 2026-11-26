/* review/home-way-nits (law 11): every disabled kit button (j63 .ka) whose code KNOWS the reason (data-why / title) must show it in the «Cần» row,
   never the generic «chưa đủ điều kiện». Walks every place × tabs act/go × khắc full/empty, collects disabled .ka buttons.
   usage (built root): [DEV=fold|ipadAir] node dev/test/kit-why-scan.js → JSON table + exit 1 on a fault */
const {chromium}=require('playwright');const D=require('./lib/device');const path=require('path');const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const srv=await D.serveRoot(path.resolve(__dirname,'../..'));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,process.env.DEV||'ipadAir');const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(600000);
 await p.addInitScript(()=>{let a=24681357;Math.random=()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
 const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(1500);
 let out=await g.evaluate(async()=>{SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;S.rank=Math.max(S.rank,2);render();
  const s=document.createElement('style');s.textContent='#klife,#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn,.krbox{display:none!important}';document.head.appendChild(s);
  const W=t=>new Promise(r=>setTimeout(r,t));const hide=()=>{Q.length=0;document.getElementById('modal').hidden=true};
  const go=async k=>{hide();window.__accSilent=1;try{accGrant(S,k);goTo(k)}catch(e){}finally{window.__accSilent=0}for(let i=0;i<4&&S.place!==k&&Q.length;i++){const m=Q[0];const j=(m.opts||[]).findIndex(o=>o.n==="Đi một mình");if(j<0)break;chooseM(j);await W(300)}hide()};
  tab="go";render();await W(300);const L=[...new Set(["home","vuon","tn","thu",...[...document.querySelectorAll('[data-go]')].map(e=>e.dataset.go)])].filter(Boolean);
  const rows=new Map();
  for(const k of L){for(const u of [...Array(BAL.time.khac+1).keys()]){hide();S.dead=false;S.confined=0;S.out=0;S.acPass={};S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.buoi=1;used=0;render();if(k!=="home")await go(k);if(S.place!==k){window.__miss=(window.__miss||[]).concat(k+":"+S.place+":"+(Q[0]&&Q[0].t));continue}used=u;
    for(const t of ["act","go"]){tab=t;render();await W(250);
     document.querySelectorAll('button.ka:disabled').forEach(bt=>{if(!bt.offsetParent)return;const can=[...bt.querySelectorAll('.kr-why .kwhy:not(.kok)')].map(x=>x.textContent.replace(/^[✗✓]\s*/,"").trim());
      const known=bt.dataset.why||"";const ti=bt.getAttribute("title")||"";const name=(bt.querySelector('.kan')||bt).textContent.trim().slice(0,40);
      const key=name.replace(/\d+/g,"N")+"|"+t+"|"+can.join("·").replace(/\d+/g,"N");if(!rows.has(key))rows.set(key,{name,tab:t,place:k,left:BAL.time.khac-u,can:can.join(" · "),why:known,title:ti.slice(0,80)})})}}}
  hide();return {rows:[...rows.values()],L,miss:window.__miss}});
 const generic=/^chưa đủ điều kiện$/i;
 const miss=out.miss,L0=out.L;out=out.rows;const fault=out.filter(r=>(!r.can||r.can.split(" · ").every(x=>generic.test(x)))&&(r.why||r.title));
 console.log(JSON.stringify({L:L0,miss,n:out.length,rows:out,fault,errs:errs.slice(0,5)},null,1));await b.close();srv.close();process.exit(fault.length||errs.length?1:0)})();
