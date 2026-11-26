/* review/tainghe-info (owner OD 25/11 ~23:48Z, k18 shot: «NĂM BẬC» rows drawn over each other; «Bấm vào dung nghi thì không ra gì hết»;
   «không biết bấm vô cái gì mở ra cái khung này»). REAL taps (dev/test/realtap.js), Fold 755x1000 + iPad 1180x820, every Tài nghệ sub-tab:
   T1 every skill card (.kskill art-/vir-/wk-) has ONE visible labelled info target = its name (.kskn, «ⓘ name»)
   T2 no hidden tap zone: no element carrying data-v85tab without visible text; the «Bậc l/max» steps are not a button
   T3 real tap on the name → the rule popup of THAT skill opens (title holds the name)
   T4 in that popup no text overlaps: every kit tier row (.ktier) — label box and text box do not intersect, label not cut (scrollWidth);
      every kit row (.kr) — label/value do not intersect
   T5 real tap on the popup ✕ closes it, the tab is still Tài nghệ
   usage: node dev/test/tainghe-info.js [index.html|URL] [outdir] [WxH,...]  (VIDEO=1 records a .webm per device into outdir) */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const cp=require('child_process');const cdn={};const RT=require('./realtap.js');
const A=process.argv.slice(2);const URL0=A[0]||path.resolve(__dirname,'../../index.html');const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const OUT=A[1]||'/tmp/tainghe-info';fs.mkdirSync(OUT,{recursive:true});const SIZES=(A[2]||'755x1000,1180x820').split(',');
const SETUP=()=>{try{window.__kbootHostDrop&&window.__kbootHostDrop()}catch(e){}document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());
 SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
 Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<3;i++){try{nextBuoi()}catch(e){}Q.length=0}
 /* some progress so the popups have a current level and the cards differ */try{S.arts.cam=2;S.artp.cam=30;S.vir.dung=1;S.arts.theu=5}catch(e){}
 const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');tab='art';try{K3SH.home=false}catch(e){};render();try{k3Shell()}catch(e){}};
const POPQ=nm=>{const M=document.getElementById('modal');if(!M||M.hidden)return {open:false};const dlg=M.querySelector('.dlg');const tt=(M.querySelector('.kpt,.kph h3,h3,.kptitle')||dlg||M).innerText||'';
     const inter=(a,b)=>!(a.right<=b.left+.5||b.right<=a.left+.5||a.bottom<=b.top+.5||b.bottom<=a.top+.5);
     const txt=e=>{const r=document.createRange();r.selectNodeContents(e);const L=[...r.getClientRects()].filter(x=>x.width>0&&x.height>0);if(!L.length)return null;return {left:Math.min(...L.map(x=>x.left)),right:Math.max(...L.map(x=>x.right)),top:Math.min(...L.map(x=>x.top)),bottom:Math.max(...L.map(x=>x.bottom))}};
     const ov=[];M.querySelectorAll('.ktier').forEach((r,i)=>{const k=r.querySelector('.ktk'),v=r.querySelector('.ktb');if(!k||!v)return;const a=txt(k),c=txt(v);if(a&&c&&inter(a,c))ov.push('tier'+(i+1));if(k.scrollWidth>k.clientWidth+1)ov.push('tier'+(i+1)+' label cut')});
     M.querySelectorAll('.kr').forEach((r,i)=>{const k=r.querySelector('.krl'),v=r.querySelector('.krv');if(!k||!v)return;const a=txt(k),c=txt(v);if(a&&c&&inter(a,c))ov.push('row'+(i+1))});
     return {open:true,title:(M.innerText||'').slice(0,80).replace(/\s+/g,' '),has:(M.innerText||'').includes(nm.split(' · ')[0]),tiers:M.querySelectorAll('.ktier').length,ov}};
/* KK37 r5: a game event (e.g. «Có người bán tin», timed) can open over the tab mid-run; CLEAN closes ANY open dialog (Q-backed or not) and the day card — before, a dialog whose Q was emptied stayed over the sub-tabs → «DEAD BUTTON cover div.kph in #modal» (LC19 a14 Fold 3/4) */
const CLEAN=()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn,#kmrew,.km-reward,#kdaytc').forEach(e=>e.remove());try{while(Q.length){const n=Q.length;closeModal();if(Q.length>=n)break}}catch(e){}Q.length=0;const M=document.getElementById('modal');if(M&&!M.hidden){M.hidden=true;document.body.classList.remove('kdlg-on')}if(tab!=='art'){tab='art';render()}};
(async()=>{const b=await chromium.launch();let bad=0;const rows=[];
 for(const wh of SIZES){const [W,H]=wh.split('x').map(Number);const dev=W<1000?'fold':'ipad';
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce',...(process.env.VIDEO?{recordVideo:{dir:OUT,size:{width:W,height:H}}}:{})});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});
  /* CTM_CURL_CDN=1: CDN pictures fetched with curl so the real paintings show (as kit-info-tap.js) */
  if(process.env.CTM_CURL_CDN)await ctx.route(/ctm-img\.victoria-tntt\.workers\.dev/,r=>{const u=r.request().url();try{if(!cdn[u])cdn[u]=cp.execFileSync('curl',['-sSf','-m','30',u],{maxBuffer:60e6});r.fulfill({status:200,body:cdn[u],contentType:u.endsWith('.json')?'application/json':u.endsWith('.webp')?'image/webp':'application/octet-stream',headers:{'access-control-allow-origin':'*'}})}catch(e){r.fulfill({status:404,body:''})}});
  /* VIDEO: a dot shows where each real tap lands (drawing only, pointer-events none) */
  if(process.env.VIDEO)await ctx.addInitScript(()=>{addEventListener('pointerdown',e=>{const d=document.createElement('i');d.style.cssText=`position:fixed;left:${e.clientX-14}px;top:${e.clientY-14}px;width:28px;height:28px;border-radius:50%;background:rgba(220,40,40,.45);border:2px solid #c00;z-index:2147483647;pointer-events:none`;document.documentElement.appendChild(d);setTimeout(()=>d.remove(),700)},true)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  if(!/^https?:/.test(URL))await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(SETUP);await p.waitForTimeout(1500);await p.evaluate(CLEAN);await p.waitForTimeout(1200);
  const rt=RT.make(p,{dev,log:d=>{if(d&&d.k!=='tap')console.log(wh,'RT',JSON.stringify(d))}});
  const subs=await p.evaluate(()=>[...document.querySelectorAll('#panel [data-ktsub="art"] [data-ktsv]')].map(e=>e.dataset.ktsv));
  for(const sv of subs){
   await p.evaluate(CLEAN);
   let st=false;for(let tr=0;tr<3&&!st;tr++){st=await rt.tap(`#panel [data-ktsub="art"] [data-ktsv="${sv}"]`,{screen:'art',label:'sub '+sv});if(!st){await p.waitForTimeout(800);await p.evaluate(CLEAN)}}/* the panel can be re-drawn while the robot scrolls to it: find it again */
   if(!st){const mm=await p.evaluate(()=>{const M=document.getElementById('modal');return M&&!M.hidden?{q:Q.length,qt:(Q[0]&&(Q[0].t||Q[0].__ks))||'',txt:(M.innerText||'').replace(/\s+/g,' ').slice(0,140),cls:(M.querySelector('.dlg')||{}).className||''}:null});bad++;rows.push([wh,sv,'-','sub-tab tap','FAIL '+JSON.stringify(mm)]);continue}
   await p.waitForTimeout(700);
   const g=await p.evaluate(()=>{const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0};
    const cards=[...document.querySelectorAll('#panel .kskill')].filter(c=>/^(art|vir|wk)-/.test(c.dataset.skill||'')&&c.querySelector('.ksteps')&&vis(c));
    const noName=cards.filter(c=>!c.querySelector('.kskn')).map(c=>c.dataset.skill);
    const hidden=[...document.querySelectorAll('#panel [data-v85tab]')].filter(e=>vis(e)&&!(e.innerText||'').replace(/[\sⓘ]/g,'')).map(e=>e.className);
    const stepBtn=document.querySelectorAll('#panel button.ksteps').length;
    return {skills:cards.map(c=>c.dataset.skill),noName,hidden,stepBtn}});
   const ok12=!g.noName.length&&!g.hidden.length&&!g.stepBtn;if(!ok12)bad++;
   rows.push([wh,sv,`${g.skills.length} cards`,`T1 no-name ${g.noName.length} · T2 hidden ${g.hidden.length} step-buttons ${g.stepBtn}`,ok12?'PASS':'FAIL']);
   for(const sk of g.skills){
    await p.evaluate(CLEAN);
    const sel=`#panel .kskill[data-skill="${sk}"] .kskn`;const nm=await p.evaluate(s=>{const e=document.querySelector(s);return e?e.innerText.replace(/ⓘ/g,'').replace(/\s+/g,' ').trim():''},sel);
    if(!nm){bad++;rows.push([wh,sv,sk,'T3 no name target','FAIL']);continue}
    let t=await rt.tap(sel,{screen:'art/'+sv,label:nm});await p.waitForTimeout(process.env.VIDEO?1800:900);
    const q=await p.evaluate(POPQ,nm);
    if(!t||!q.open){/* a game layer that came up by itself during the tap (first-meeting card .kpscene with the rank name .krn) ate it: put it away (CLEAN) and tap again; logged */
     const dbg=await p.evaluate(s=>{const e=document.querySelector(s);const r=e&&e.getBoundingClientRect();const h=r&&document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return h&&!(h===e||e.contains(h))?h.outerHTML.slice(0,100):''},sel);
     console.log(wh,sk,'retap after a layer came up:',dbg);await p.evaluate(CLEAN);await p.waitForTimeout(500);t=await rt.tap(sel,{screen:'art/'+sv,label:nm});await p.waitForTimeout(900);Object.assign(q,await p.evaluate(POPQ,nm))}
    if(!q.open)console.log(wh,sk,'NOT OPEN dbg',JSON.stringify(await p.evaluate(s=>{const e=document.querySelector(s);const k=document.getElementById('kpop');const r=e&&e.getBoundingClientRect();const h=r&&document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return {kpop:k&&!k.hidden?k.innerText.slice(0,60):null,at:h?h.outerHTML.slice(0,120):null,r:r&&[r.x,r.y,r.width,r.height],tab,modal:document.getElementById('modal').hidden}},sel)));
    let closed=false;
    if(q.open){await p.waitForTimeout(process.env.VIDEO?1200:400);const xs=await p.evaluate(()=>{const M=document.getElementById('modal');const c=[...M.querySelectorAll('button')].find(b=>/^(✕|×|x)$/i.test((b.innerText||b.textContent||'').trim())||/Đóng/.test(b.getAttribute('aria-label')||''));if(!c)return null;c.dataset.tix='1';return 1});
     if(xs){const cov=await p.evaluate(()=>{const x=document.querySelector('#modal [data-tix="1"]');const r=x.getBoundingClientRect();const h=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return h===x||x.contains(h)?'':h.outerHTML.slice(0,140)});if(cov)console.log(wh,sk,'✕ COVERED BY',cov);await rt.tap('#modal [data-tix="1"]',{screen:'popup',label:'✕'})}await p.waitForTimeout(600);
     for(let tr=0;tr<4;tr++){closed=await p.evaluate(t0=>{const M=document.getElementById('modal');if(!M||M.hidden)return tab==='art';/* KK37 r5: a queued game dialog may open right after the ✕ (agQShow) — the RULE popup is closed when the dialog shown is another one */const t=(M.innerText||'').slice(0,80).replace(/\s+/g,' ');if(t!==t0&&!/^LUẬT/.test(t)){console.log('after ✕ a game dialog:',t);if(typeof Q!=='undefined'){try{while(Q.length){const n=Q.length;closeModal();if(Q.length>=n)break}}catch(e){}}M.hidden=true;return tab==='art'}return false},(q.title||'').replace(/\s+/g,' '));if(closed)break;await p.waitForTimeout(500)}}
    const ok=t&&q.open&&q.has&&!(q.ov||[]).length&&closed;if(!ok)bad++;
    rows.push([wh,sv,sk,`T3 open ${q.open} title-has-name ${q.has} · T4 tiers ${q.tiers} overlap ${(q.ov||[]).length?q.ov.join(','):'0'} · T5 closed ${closed}`,ok?'PASS':'FAIL']);
    if(!ok)await p.screenshot({path:`${OUT}/${wh}-${sk}-fail.jpg`,type:'jpeg',quality:55});
    if(process.env.SHOTS&&q.open&&sk===g.skills[0])await p.screenshot({path:`${OUT}/${wh}-${sk}.jpg`,type:'jpeg',quality:60})}}
  if(errs.length){bad++;rows.push([wh,'-','-','page errors '+errs.join(' | '),'FAIL'])}
  await ctx.close()}
 for(const r of rows)console.log(r.join(' | '));console.log(bad?`FAIL ${bad}`:'ALL PASS');await b.close();process.exit(bad?1:0)})();
