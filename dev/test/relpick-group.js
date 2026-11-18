/* review/rel-picker-r2 WHOLE GROUP: every tab / sub-tab that shows a person strip (.pstrip): strip height, empty area (strip height minus tallest face cell), main card top/bottom vs the panel, scroll needed.
   usage: node dev/test/relpick-group.js <url> <tag> [WxH@dpr,...] */
const {chromium}=require('playwright');const [,,URL,TAG,SIZES]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const out=[];
 for(const sz of (SIZES||"755x1000@2,1180x820@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul,#kboot{display:none!important}'});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<400;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}
   const L=liveRivals(true);S.met=S.met||{};tmPlace(S,0);L.forEach(v=>{S.met[v.id]=1;try{S.known[kOf61(v)]=3}catch(e){}})});
  const tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].map(b=>b.dataset.tab));
  const meas=label=>p.evaluate(label=>{const P=document.getElementById('panel');const R=e=>e.getBoundingClientRect();const st=[...P.querySelectorAll('.pstrip')].filter(e=>e.offsetParent);if(!st.length)return null;
   const pr=R(P);const s=st[0];const sr=R(s);const faces=[...s.querySelectorAll('.pface')].filter(e=>e.offsetParent);const fh=Math.max(0,...faces.map(f=>R(f).height));
   const card=[...P.querySelectorAll('.pc,.kpc,.pcard,.krpair')].filter(e=>e.offsetParent&&R(e).top>=sr.bottom-2)[0];const cr=card?R(card):null;
   return{label,strips:st.length,stripH:+sr.height.toFixed(0),faceH:+fh.toFixed(0),empty:+(sr.height-fh).toFixed(0),cardTop:cr?+(cr.top-pr.top).toFixed(0):null,cardH:cr?+cr.height.toFixed(0):null,panelH:+pr.height.toFixed(0),
    cardFits:cr?cr.bottom<=pr.bottom+1:null}},label);
  for(const t of tabs){await p.evaluate(t=>{tab=t;render()},t);await sleep(700);let r=await meas(t);if(r)out.push({sz,...r});
   const subs=await p.evaluate(()=>[...document.querySelectorAll('#panel .kcattabs button, #panel .ksubb')].filter(e=>e.offsetParent).map((e,i)=>i));
   for(const i of subs.slice(0,6)){await p.evaluate(i=>{const e=[...document.querySelectorAll('#panel .kcattabs button, #panel .ksubb')].filter(e=>e.offsetParent)[i];if(e)e.click()},i);await sleep(500);r=await meas(t+'/'+i);if(r)out.push({sz,...r})}}
  out.push({sz,errs});await ctx.close()}
 console.log(out.map(o=>JSON.stringify(o)).join("\n"));await b.close()})();
