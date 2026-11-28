/* kit-hand-dupmat (K-HAND-DUPMAT, KK70 28/11; TMK-WARN-3 find, laws 3 + 9 + 11) — node dev/test/kit-hand-dupmat.js [dev/index.html]
   The hand's enlarged card (jkhand kitHandBigBuild → jopic kitOptCopy(b, face=1)) kept the face rows (kitOptFinal's .kdup / .kfill copies: the Mất row
   kr-mat2, the extra Được chips) AND unfolded their SOURCE rows → a sure card's «Mất» printed twice. Now kitOptFinal marks the copied sources .kcpsrc and the
   face copy drops them; the plain copy («!» overlay) keeps the sources and drops the copies. Every chip text appears ONCE in each copy, nothing is lost.
   Cards: sure + loss + 2 gain rows; rolled + loss; locked. Fold 755x1000 + iPad 1180x820. KMUT=1 = old copy rule → FAIL. */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();
 for(const [vw,vh] of [[755,1000],[1180,820]]){const p=await (await b.newContext({viewport:{width:vw,height:vh}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitOptCopy==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
  const r=await p.evaluate(async mut=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
   if(mut){const k0=kitOptCopy;kitOptCopy=function(b,face){if(!face)return k0.apply(this,arguments);const x=b.cloneNode(true);x.querySelectorAll(".kcpsrc").forEach(e=>e.classList.remove("kcpsrc"));return k0.call(this,x,face)};window.kitOptCopy=kitOptCopy}
   Q.push({t:"Thử bài",d:"",opts:[{n:"Việc chắc",x:"tốn: Bạc 5 · được: Danh +2 · kèm: Sủng +1 · mất: Đức -3",fx:{},go:()=>{}},{n:"Việc liều",o:50,x:"Tùy duyên · tốn: Sức 5 · thành: Danh +3 · hỏng: Đức -4",fx:{},go:()=>{}},{n:"Đóng",fx:{},go:()=>{}}]});
   showModal();await new Promise(r=>setTimeout(r,900));
   const M=document.getElementById('modal');const cards=[...M.querySelectorAll('button.ka')].filter(x=>/Việc/.test(x.textContent));
   const T=s=>String(s||"").replace(/\s+/g," ").trim();
   const rep=c=>{const rows=[...c.querySelectorAll('.kb>.kr')].filter(r=>!r.classList.contains('kofold')&&!r.classList.contains('kr-hint'));
    const chips=rows.flatMap(r=>[...r.querySelectorAll('.krv>.ef')].map(e=>T(e.textContent))).filter(t=>t&&t!=="không");
    return {labs:rows.map(r=>T((r.querySelector('.krl')||{}).textContent)),chips}};
   return cards.map(b=>({n:T((b.querySelector('.kan,b')||b).textContent).slice(0,20),face:rep(kitOptCopy(b,1)),plain:rep(kitOptCopy(b,0))}))},!!process.env.KMUT);
  const tag=`${vw}x${vh}`;ok(r.length>=2,`${tag} two test cards drawn`,r.map(x=>x.n));
  for(const c of r){for(const m of ["face","plain"]){const X=c[m];const dup=X.chips.filter((t,i)=>X.chips.indexOf(t)!==i);const matN=X.labs.filter(l=>l==="Mất").length;
    ok(!dup.length&&matN<=1,`${tag} ${c.n} ${m}: every chip once, «Mất» row ≤ 1`,{labs:X.labs,dup})}
   const lost=c.plain.chips.filter(t=>!c.face.chips.includes(t)),lost2=c.face.chips.filter(t=>!c.plain.chips.includes(t));ok(!lost.length&&!lost2.length,`${tag} ${c.n}: face and plain show the same facts`,{lost,lost2})}
  ok(r.some(c=>/Đức/.test(c.face.chips.join())),`${tag} the loss «Đức» is on the face`);
  ok(!errs.length,`${tag} page errors 0`,errs.slice(0,3));await p.close()}
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}`:`ALL OK (${res.length})`);process.exit(f?1:0)})();
