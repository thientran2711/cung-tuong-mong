/* kit-wear-row (K-WEAR-ROW, KK70 28/11; RV-185 find, laws 3 + 4) — node dev/test/kit-wear-row.js [dev/index.html]
   «Rương trang phục» ring (jkring-item kriToilOpen): a wear act moves no stat at once, so the result read «Được: không · Mất: không» while the piece's card
   says «Được cài: Sắc +3». Now the result names the card's own effect line (jwdinv wdItemLists D[0]): Cài / Đeo → Được, Tháo → Mất.
   Real flow: toilOpen → toilDressUI → kriToilOpen(chest piece) → kriAct «Cài»; then the worn piece → «Tháo». Fold 755x1000 + iPad 1180x820. KMUT=1 = old rows → FAIL. */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();
 for(const [vw,vh] of [[755,1000],[1180,820]]){const p=await (await b.newContext({viewport:{width:vw,height:vh}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kriToilOpen==='function'&&typeof toilOpen==='function');await p.waitForTimeout(2500);
  const r=await p.evaluate(async mut=>{const W=ms=>new Promise(r=>setTimeout(r,ms));localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{render()}catch(e){}
   if(mut)kriWearRows=rows=>rows;
   try{toilOpen()}catch(e){return {err:"toilOpen "+e.message}}await W(1200);try{toilDressUI()}catch(e){}await W(1000);
   const read=()=>{const P=document.querySelector('.kri-pane');if(!P)return null;const T=s=>(s||"").replace(/\s+/g," ").trim();const g=c=>[...P.querySelectorAll(c+' .krv > *')].map(e=>T(e.textContent)).filter(t=>t&&t!=="không");return {duoc:g('.kr-duoc'),mat:g('.kr-mat'),seal:T((P.querySelector('.kseal,.kri-seal,[class*=seal]')||{}).textContent).slice(0,20)}};
   const run=async(pred,actRe)=>{const it=((KINV.reg.toil||{}).items||[]).find(pred);if(!it)return {err:"no item"};if(!kriToilOpen(it))return {err:"ring not opened"};await W(900);let bt=[];for(let t=0;t<40;t++){bt=[...document.querySelectorAll(".kri-pane [data-kria]")].filter(x=>x.getClientRects().length);if(bt.length)break;await W(150)}const B=bt.find(x=>actRe.test(x.textContent.trim().split(/\s{2,}|\n/)[0].trim()))||bt.find(x=>actRe.test(x.textContent.trim()));if(!B)return {err:"no act",acts:bt.map(x=>x.textContent.trim())};B.click();await W(1500);const o=read();o.act=B.textContent.trim().slice(0,12);try{const x=document.querySelector('.kri .kit-x');if(x)x.click();await W(400);const x2=document.querySelector('.kri .kit-x');if(x2)x2.click()}catch(e){}await W(500);return o};
   const fxOf=g=>{try{const d=wdItemLists(wdEntryOf(g)).D[0];return /không thêm/.test(d)?"":d}catch(e){return""}};const candOf=()=>((KINV.reg.toil||{}).items||[]).filter(x=>x.g&&!x.g.wdSlot&&!x.g.w&&WD_ITEMS[x.g.k]&&WD_ITEMS[x.g.k].sl!=="y"&&fxOf(x.g));let cand=candOf();
   /* RV-188 note b (KK72): the random start may hold no chest piece with an effect → seed a real hair-pin WD item into S.inv (the chest reads S.inv by index) and reopen; the registry decides whether it has an effect */
   if(!cand.length){const K=Object.keys(WD_ITEMS).filter(k=>WD_ITEMS[k].sl==="tram").slice(0,5);for(const k of K){S.inv=S.inv||[];S.inv.push({k});try{toilOpen()}catch(e){}await W(1200);try{toilDressUI()}catch(e){}await W(1000);cand=candOf();if(cand.length)break}}
   if(!cand.length)return {err:"no chest piece with an effect",n:((KINV.reg.toil||{}).items||[]).length};const k=cand[0].g.k,fx=fxOf(cand[0].g);const bac0=S.bac;
   const on=await run(x=>x.g&&x.g.k===k&&!x.g.wdSlot&&!x.g.w,/^(Cài|Đeo)/);
   try{toilDressUI()}catch(e){}await W(800);
   const off=await run(x=>x.g&&x.g.k===k&&(x.g.wdSlot||x.g.w),/^Tháo/);
   return {k,fx,on,off,bac:S.bac-bac0}},!!process.env.KMUT);
  const tag=`${vw}x${vh}`;if(r.err){ok(false,`${tag} setup`,r);continue}
  ok(r.on&&!r.on.err&&r.on.duoc.some(t=>t===r.fx),`${tag} «Cài» result names the piece's effect in Được (card line «${r.fx}»)`,r.on);
  ok(r.off&&!r.off.err&&r.off.mat.some(t=>t===r.fx),`${tag} «Tháo» result names the same effect in Mất`,r.off);
  ok(!errs.length,`${tag} page errors 0`,errs.slice(0,3));await p.close()}
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}`:`ALL OK (${res.length})`);process.exit(f?1:0)})();
