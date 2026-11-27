/* kit-ton-row (review/kit-ton-row; FOREMAN_D econ-tamco «KIT-BLOCKED: Tốn row», KIT_REQUESTS L85 + L80) — node dev/test/kit-ton-row.js [dev/index.html]
   The option card «Tốn» row shows a PRICE the option itself names, whatever the stat: `ton:{tamco:-n}` / `ton:{bac:-pr}` (a price the fx does not pay itself) and a «tốn: …» part of the line — in the open card AND in a
   hidden-outcome card (pid → kitHideOut, which used to keep only khắc / Sức / Bạc). A plain fx CONSEQUENCE of a hidden-outcome card (Đức / Danh / Sủng / Tâm cơ) stays hidden (outcome rule). Scan: 7 stats × 3 ways × open / hidden,
   Fold 755x1000 and iPad 1180x820. «quý nhau» (L80): the decline row's liking loss shows in the hint, never «Tốn: không» only. */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const p=await (await b.newContext({viewport:{width:W,height:H}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof tsPanel==='function'&&typeof start==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.bac=500;S.tamco=40;try{render()}catch(e){}});await p.waitForTimeout(1200);
  const R=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const rows=[];let relT='';
   const KEYS=[["tamco","Tâm cơ"],["duc","Đức"],["danh","Danh"],["sung","Sủng"],["bac","Bạc"],["suc","Sức"],["khm","Hồi môn"]];
   const modes=[["fx",k=>({fx:{[k]:-3}})],["x",(k,n)=>({x:"tốn: "+n+" -3 · thành: giữ nguyên"})],["ton",k=>({ton:{[k]:-3},x:"thành: giữ nguyên"})]];
   for(const hid of [false,true])for(const [mn,f] of modes)for(const [k,n] of KEYS){Q.length=0;$("modal").hidden=true;const o=Object.assign({n:"Đường "+k,fx:{},p:70,go:()=>{}},f(k,n));
    const m={t:"Thử",who:pTH(),h:"<p>Chọn đường.</p>",opts:[o,{n:"Thôi",fx:{},go:()=>{}}]};if(hid)m.pid="zzpick";Q.push(m);showModal();await sleep(140);
    const bt=document.querySelector('#modal button.ka, #modal .opts>button');const t=bt?[...bt.querySelectorAll('.kr-ton .ef')].map(e=>e.textContent.trim()).join('/'):'?';rows.push({hid,mn,k,t,has:new RegExp(n.replace(' ','\\s')+'\\s*[-−]\\s?\\d+').test(t)})}
   /* kit-ton-row-2: a RELATION price in a hidden-outcome card stays words only (no «thiện cảm -3» number in Tốn) */
   {Q.length=0;$("modal").hidden=true;const m={t:"Thử",who:pTH(),h:"<p>Chọn đường.</p>",pid:"zzpick",opts:[{n:"Đường tình",fx:{},p:70,go:()=>{},x:"tốn: thiện cảm -3 · thành: giữ nguyên"},{n:"Thôi",fx:{},go:()=>{}}]};Q.push(m);showModal();await sleep(140);const bt=document.querySelector('#modal button.ka, #modal .opts>button');relT=bt?[...bt.querySelectorAll('.kr-ton .ef')].map(e=>e.textContent.trim()).join('/'):'?'}
   Q.length=0;$("modal").hidden=true;
   const hint=x=>[0,1,2].map(l=>kitHint({x},null,l).hint);const qn=hint("được: ngươi giữ lễ · mất: hai bên quý nhau -5");
   return{rows,qn,rel:relT}});
  const open=R.rows.filter(r=>!r.hid),hid=R.rows.filter(r=>r.hid);
  ok(open.every(r=>r.has),`${tag} open card: Tốn row shows the price in all ${open.length} cases (7 stats × fx / «tốn:» / ton)`,open.filter(r=>!r.has).map(r=>r.mn+':'+r.k));
  ok(hid.filter(r=>r.mn!=='fx').every(r=>r.has),`${tag} hidden-outcome card: a «tốn:» price and a ton:{…} price stay in the Tốn row (14 cases, was 8 hidden)`,hid.filter(r=>r.mn!=='fx'&&!r.has).map(r=>r.mn+':'+r.k));
  ok(hid.filter(r=>r.mn==='fx'&&["tamco","duc","danh","sung"].includes(r.k)).every(r=>!r.has),`${tag} hidden-outcome card: a plain fx consequence (Tâm cơ / Đức / Danh / Sủng) stays hidden`);
  ok(hid.filter(r=>r.mn==='fx'&&["bac","suc","khm"].includes(r.k)).every(r=>r.has),`${tag} hidden-outcome card: fx Bạc / Sức / Hồi môn price still shown (as before)`);
  ok(R.qn.every(t=>/thiện cảm hai bên −/.test(t)),/* WORDING-GAIN: stat + marks */ `${tag} «quý nhau» decline line: the liking loss is in the hint at every level`,R.qn);
  ok(!/\d/.test(R.rel||'')&&!/thiện cảm/.test(R.rel||''),`${tag} hidden-outcome card: a relation price («thiện cảm -3») stays words only, no number in Tốn`,R.rel);
  ok(errs.length===0,`${tag} no page errors`,errs.slice(0,2));await p.context().close()}
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`PASS ${res.length}`);process.exit(f?1:0)})();
