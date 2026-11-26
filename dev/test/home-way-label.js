/* review/home-way-nits (law 10): the top-bar «Về phòng» label never wraps a line: every state (at home / «Về phòng · N khắc» / «Về phòng · hết khắc»)
   × her palace's name fits ONE fixed button box per device (the same width in every state), and every other top-bar button label keeps one line per text line.
   usage (built root): [DEV=fold|ipadAir] [SHOT_DIR=…] node dev/test/home-way-label.js → JSON + exit 1 on a fault */
const {chromium}=require('playwright');const D=require('./lib/device');const path=require('path');const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const dev=process.env.DEV||'fold';const srv=await D.serveRoot(path.resolve(__dirname,'../..'));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,dev);const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 await p.addInitScript(()=>{let a=24681357;Math.random=()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
 const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(1500);
 await g.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;S.rank=Math.max(S.rank,2);render();
  const s=document.createElement('style');s.textContent='#klife,#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn,.krbox{display:none!important}';document.head.appendChild(s)});
 const out=[];
 /* every palace name she can live in (the longest decides the box), every state */
 const st=[["home",0,"home"],["vuon",0,"away"],["vuon",3,"short"],["vuon",4,"none"],["tn",4,"none-far"]];
 for(const [k,u,lab] of st){const r=await g.evaluate(async([k,u])=>{const W=t=>new Promise(r=>setTimeout(r,t));Q.length=0;document.getElementById('modal').hidden=true;S.dead=false;S.out=0;S.confined=0;S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.buoi=1;used=0;
   if(k!=="home"){window.__accSilent=1;try{accGrant(S,k);goTo(k)}finally{window.__accSilent=0}for(let i=0;i<4&&S.place!==k&&Q.length;i++){const m=Q[0];const j=(m.opts||[]).findIndex(o=>o.n==="Đi một mình");if(j<0)break;chooseM(j);await W(300)}}
   Q.length=0;document.getElementById('modal').hidden=true;used=u;tab="act";render();await W(500);
   const one=el=>{const r=el.getBoundingClientRect();const l=el.querySelector('.kbl')||el;const cs=getComputedStyle(l);const lh=parseFloat(cs.lineHeight)||parseFloat(cs.fontSize)*1.2;
    const lines=(l.textContent||"").split("\n").filter(Boolean).length||1;const lr=l.getBoundingClientRect();const vis=cs.display!=="none"&&lr.height>0;const simple=l.classList.contains('kbl')||![...l.children].some(c=>c.tagName!=='BR');let rows=0;if(vis&&simple){const rg=document.createRange();rg.selectNodeContents(l);const tops=new Set([...rg.getClientRects()].filter(q=>q.width>0.5).map(q=>Math.round(q.top/3)));rows=tops.size}
    return{id:el.id||el.className.split(" ")[0],txt:(l.textContent||"").replace(/\n/g," / "),w:Math.round(r.width),h:Math.round(r.height),lines,rows,simple,vis,over:l.scrollWidth>l.clientWidth+1,out:r.right>innerWidth+0.5||r.left<-0.5}};
   const hd=document.querySelector('header.hud');const btns=[...hd.querySelectorAll('button')].filter(x=>x.offsetParent&&x.getBoundingClientRect().width>0).map(one);
   const kids=[...hd.children].filter(c=>c.offsetParent&&!/hud-mood/.test(c.className)).map(c=>{/* drawn extent = union of the content rects (a stretched grid box is not ink) */let q=[];const tw=document.createTreeWalker(c,NodeFilter.SHOW_TEXT);for(let n;(n=tw.nextNode());){if(!n.textContent.trim())continue;const rg=document.createRange();rg.selectNodeContents(n);q.push(...rg.getClientRects())}c.querySelectorAll("img,i,svg,canvas").forEach(e=>q.push(e.getBoundingClientRect()));q=q.filter(z=>z.width>0.5&&z.height>0.5);if(!q.length)q=[c.getBoundingClientRect()];return{id:c.id||c.className.split(" ")[0],x:Math.min(...q.map(z=>z.left)),y:Math.min(...q.map(z=>z.top)),r:Math.max(...q.map(z=>z.right)),b:Math.max(...q.map(z=>z.bottom))}});
   const ov=[];for(let i=0;i<kids.length;i++)for(let j=i+1;j<kids.length;j++){const A=kids[i],B=kids[j];const w=Math.min(A.r,B.r)-Math.max(A.x,B.x),h=Math.min(A.b,B.b)-Math.max(A.y,B.y);if(w>2&&h>2)ov.push(A.id+"×"+B.id+"("+Math.round(w)+"x"+Math.round(h)+")")}
   return{place:S.place,left:BAL.time.khac-used,btns,ov}},[k,u]);
  r.state=lab;out.push(r);if(process.env.SHOT_DIR)await p.screenshot({path:`${process.env.SHOT_DIR}/${dev}-${lab}.png`})}
 const fail=[];const rb=out.map(r=>({s:r.state,b:r.btns.find(x=>x.id==="k3room")}));
 for(const {s,b:x} of rb){if(!x){if(s!=="home")fail.push("no k3room "+s);continue}/* one page: at home on her own room page the button is hidden by design (KIT §75) */if(x.vis&&x.rows>x.lines)fail.push(`k3room wraps ${s}: ${x.txt} rows ${x.rows}>${x.lines}`);if(x.over||x.out)fail.push("k3room clipped "+s)}
 const ws=new Set(rb.filter(r=>r.b&&r.b.vis&&r.s!=="home").map(r=>r.b.w));if(ws.size>1)fail.push("k3room width changes with the state "+[...ws]);
 for(const r of out)if(r.ov.length)fail.push(`top bar overlap ${r.state}: ${r.ov}`);for(const r of out)for(const x of r.btns)if(x.id!=="k3room"&&x.vis&&x.simple&&x.rows>x.lines&&x.txt.trim())fail.push(`top-bar ${x.id} wraps ${r.state}: ${x.txt}`);
 console.log(JSON.stringify({dev,out:rb,all:out,fail,errs},null,1));await b.close();srv.close();process.exit(fail.length||errs.length?1:0)})();
