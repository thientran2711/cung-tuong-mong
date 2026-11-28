/* KIT §6.4b person INFO panel (review/kit-person-panel; owner 27/11 ~00:32Z + ~00:42Z) — family scan + measure.
   usage: node dev/test/kit-person-panel.js <url> <W>x<H> <outdir> <tag> [shots=1]
   Opens every person tab (Hậu cung Chí tôn / Phi tần / Nam nhân / Cung nhân, Hoàng tự), taps up to 3 people each, and per card prints:
   kpp (built), tabs (must be exactly Thông tin + Giao tình), visible act buttons (must be 0: info only), the card buttons (≤ 2, titles Tìm gặp / Ghé cung,
   whole), repeated label in «Thông tin» (one fact once), portrait width + share of screen height, boxes that scroll, name cut, page errors. On LIVE (no kpp) it only measures (before column).
   Exit 1 on: a built card with a tab set ≠ [Thông tin, Giao tình], a visible act button, > 2 card buttons or one not whole, a scrolling card or tab, a repeated label in «Thông tin», a cut name. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');
const [,,BASE,SZ,OUT,TAG,SHOTS]=process.argv;const [W,H]=SZ.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,reducedMotion:'reduce'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300);window.kitRoulette=function(){}});
 if(process.env.KIDS)await ctx.addInitScript(()=>{window.__KIDS=1});const p=await ctx.newPage();if(process.env.ROUNDOFF)await ctx.addInitScript(()=>{const iv=setInterval(()=>{const s=document.getElementById('kit-pp-round');if(s){s.disabled=true;clearInterval(iv)}},50)});p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:90000});await p.waitForTimeout(+(process.env.BOOTW||6000));
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{flip=function(){}}catch(e){}for(let i=0;i<2;i++){try{nextBuoi()}catch(e){}Q.length=0}
  try{kn();for(const v of rivals){S.met[v.id]=1};for(const v of rivals)k61Meet(v,"gặp",3);k61Meet(S.emp,"gặp",3)}catch(e){}
  try{menInit();(S.men||[]).slice(0,4).forEach(x=>{try{S.met[x.id]=1;k61Meet(x,"gặp",3)}catch(e){}})}catch(e){}
  if(window.__KIDS){try{S.kids.push(mkKid('m',3),mkKid('f',1))}catch(e){}}/* KIDS=1: two children of hers so the Hoàng tự tab has cards */
  Q.length=0;if(m)m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');try{render()}catch(e){}});
 await p.waitForTimeout(1200);
 const settle=async()=>{await p.waitForTimeout(900);await p.waitForFunction(()=>[...document.querySelectorAll('#panel img')].every(i=>i.complete),null,{timeout:20000}).catch(()=>{});await p.waitForTimeout(300)};
 const meas=()=>p.evaluate(()=>{const pc=document.querySelector('#panel .pc');if(!pc)return{none:1};
  const vis=e=>{const r=e.getBoundingClientRect();if(!r.width||!r.height)return null;let t=r.top,bt=r.bottom,l=r.left,rt=r.right;for(let a=e.parentElement;a&&a!==document.documentElement;a=a.parentElement){const cs=getComputedStyle(a);if(/(auto|scroll|hidden|clip)/.test(cs.overflowY+cs.overflowX)){const q=a.getBoundingClientRect();t=Math.max(t,q.top);bt=Math.min(bt,q.bottom);l=Math.max(l,q.left);rt=Math.min(rt,q.right)}}t=Math.max(t,0);bt=Math.min(bt,innerHeight);l=Math.max(l,0);rt=Math.min(rt,innerWidth);return{whole:bt-t>=r.height-1.5&&rt-l>=r.width-1.5,none:bt<=t||rt<=l}};
  const btn=[...pc.querySelectorAll('.pcb>button.ka')].filter(e=>e.offsetParent);let whole=0,cut=0,hid=0;btn.forEach(e=>{const v=vis(e);if(!v)return;v.whole?whole++:v.none?hid++:cut++});
  const cb=[...pc.querySelectorAll('.kppbtns>button')].filter(e=>e.offsetParent);const cbt=cb.map(e=>(e.firstChild&&e.firstChild.textContent||'').trim()+(e.disabled?'(x)':''));const cbcut=cb.filter(e=>{const v=vis(e);return !v||!v.whole}).length;
  const scr=[pc,...pc.querySelectorAll('*')].filter(e=>e.offsetParent&&e.scrollHeight>e.clientHeight+3&&/(auto|scroll)/.test(getComputedStyle(e).overflowY)).map(e=>e.className.toString().slice(0,30));
  const pp=pc.querySelector(':scope>.pcl>.pcp');const pr=pp&&pp.getBoundingClientRect();const nm=(pc.querySelector('.pcname')||{}).textContent||'';
  return{name:nm.trim().slice(0,30),kpp:pc.dataset.kpp||0,tab:pc.dataset.kppv||'',tabs:[...pc.querySelectorAll(':scope>.pcr>.kppt>.pct')].map(e=>e.textContent),
   por:pr?[Math.round(pr.width),Math.round(pr.height)]:null,porShare:pr?Math.round(pr.height/innerHeight*100):null,btn:btn.length,whole,cut,hid,scroll:scr,cbtn:cbt,cbcut,
   nameCut:(()=>{const n=pc.querySelector(':scope>.pcl>.pcname');if(!n)return 0;const L=n.parentNode.getBoundingClientRect();const r=document.createRange();r.selectNodeContents(n);const q=r.getBoundingClientRect();return (q.left<L.left-1||q.right>L.right+1)?1:0})(),nameLines:(()=>{const n=pc.querySelector(':scope>.pcl>.pcname');if(!n)return 0;const r=document.createRange();r.selectNodeContents(n);return new Set([...r.getClientRects()].map(x=>Math.round(x.top))).size})(),
   ovf:document.documentElement.scrollWidth>innerWidth+1,
   strip:(()=>{const s=document.querySelector('#panel .pstrip');if(!s)return null;const fs=[...s.querySelectorAll('.pface')].filter(e=>e.offsetParent);const md=fs[0]&&fs[0].querySelector('.md');const r=s.getBoundingClientRect();return{h:Math.round(r.height),faces:fs.length,round:md?getComputedStyle(md).borderRadius==='50%':false,cardTop:Math.round(pc.getBoundingClientRect().top)}})()}});
 const R=[];const tabs=['court','rv','men','staff','kid'];
 for(const t of tabs){await p.evaluate(t=>{Q.length=0;const mo=document.getElementById('modal');if(mo)mo.hidden=true;document.body.classList.remove('kbk-open');const dw=document.getElementById('dawn');if(dw){dw.hidden=true;dw.innerHTML='';dw.classList.remove('on')}tab=t;try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){};document.querySelectorAll('.kres,.ktoast,#ktoast').forEach(e=>e.remove())},t);await settle();
  const n=await p.evaluate(()=>document.querySelectorAll('#panel .kpstrip button, #panel [data-pi]').length);
  for(let i=0;i<Math.min(3,Math.max(1,n));i++){
   if(n>1){await p.evaluate(i=>{const a=[...document.querySelectorAll('#panel .kpstrip button, #panel [data-pi]')];if(a[i])a[i].click()},i);await settle()}
   const m=await meas();m.tabk=t;m.i=i;
   if(m.kpp){for(const v of ['rel','info']){await p.evaluate(v=>{const b=document.querySelector(`#panel .pc .kppt .pct[data-kppv="${v}"]`);if(b)b.click()},v);await p.waitForTimeout(250);const s=await p.evaluate(()=>{const pc=document.querySelector('#panel .pc');const v=pc.querySelector(`:scope>.pcr>.kppv[data-v="${pc.dataset.kppv}"]`);const N=t=>{t=String(t||'').replace(/[:：]\s*$/,'').replace(/\s+/g,' ').trim().toLowerCase();return t==='tính'||t==='tính cách'?'tính nết':t};const labs=[];if(v&&pc.dataset.kppv==='info'){v.querySelectorAll('.krl,.kstl').forEach(e=>{if(e.offsetParent)labs.push(N(e.textContent))});v.querySelectorAll('.kpfacts .pcinfo>span').forEach(e=>{if(!e.offsetParent)return;const m=/^\s*([^:：]{1,24})[:：]/.exec(e.firstChild&&e.firstChild.nodeType===3?e.firstChild.textContent:'');if(m)labs.push(N(m[1]))});v.querySelectorAll('.chips>.chip').forEach(e=>{if(e.offsetParent&&/^\s*(Tính nết|Tính)\b/i.test(e.textContent))labs.push('tính nết')})}
    const dup=[...new Set(labs.filter((x,i)=>x&&labs.indexOf(x)!==i))];return{v:pc.dataset.kppv,dup,shown:!!(v&&v.offsetParent),scroll:v?v.scrollHeight>v.clientHeight+3:null,over:v?v.scrollHeight-v.clientHeight:null,txt:v?v.textContent.trim().slice(0,60):''}});m['tab_'+v]=s;if(+SHOTS!==0&&i===0)await p.screenshot({path:`${OUT}/${TAG}-${t}-${v}.jpg`,type:'jpeg',quality:72})}
   }
   else if(+SHOTS!==0&&i===0)await p.screenshot({path:`${OUT}/${TAG}-${t}.jpg`,type:'jpeg',quality:72});
   R.push(m);if(m.none)break}}
 const bad=R.filter(m=>m.kpp&&(m.btn||m.scroll.length||m.tabs.join('|')!=='Thông tin|Giao tình'||m.cbtn.length>2||m.cbcut||m.cbtn.some(x=>!/^(Tìm gặp|Ghé cung)/.test(x))||m.nameCut||(m.tab_info&&(m.tab_info.scroll||(m.tab_info.dup||[]).length))||(m.tab_rel&&m.tab_rel.scroll)));
 console.log(JSON.stringify({TAG,W,H,R,errs,bad:bad.length}));await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
