/* owner 21/11 (verbatim): "mấy cái nút đó đỏ lại đi. Mấy cái nút mà của mấy cái game tao chưa có thử xong á" — Thử tay list: a kind whose game was fixed after her
   try (BAL.ag.mg2.cal.redo) shows a RED button (kbtn, not alt), sits in «Chưa thử», is next in «Thử tiếp»; a kind tried after the fix (or never in redo) stays white.
   node dev/test/mgcal-redo.js [dev/index.html]  — Fold 755x1000 + iPad 1180x820 */
const {chromium}=require('playwright');const path=require('path');const U0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(U0)?U0:'file://'+path.resolve(U0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();
for(const [w,h,dev] of [[755,1000,'fold'],[1180,820,'ipad']]){const p=await b.newPage({viewport:{width:w,height:h}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;Q.length=0;
  localStorage.setItem("ctm-owner-cal","1");const R=BAL.ag.mg2.cal.redo||{},ks=mgCalKinds();const old=Date.parse("2026-11-20T10:00:00Z"),nw=Date.parse("2026-11-20T16:00:00Z");
  const redoK=ks.filter(k=>R[k]);const after=redoK[0];const rec={};ks.forEach(k=>rec[k]={raws:[8,8,8,8,8],ds:[-2,-1,0,1,2],b:8,t:k===after?nw:old});localStorage.setItem("ctm-mgcal",JSON.stringify(rec));
  mgCalOpen();
  const btn=k=>document.querySelector(`[data-mgcal-k="${k}"]`);const red=k=>{const e=btn(k);return !!e&&!e.classList.contains('alt')};
  const seq=(document.getElementById('mgcal-seq')||{}).textContent||"";
  return {redoK,after,redRedo:redoK.filter(k=>k!==after).every(red),afterWhite:!red(after),othersWhite:ks.filter(k=>!R[k]).every(k=>!red(k)),
   n:redoK.length,code:mgCalCode(),small:(btn(redoK[1])||{}).textContent||"",seq,hdr:(kg82Box().querySelector(".kpst")||{}).textContent||""}});
 ok(/\bdauho:/.test(r.code)&&!/\b(mua|huong|td_dung|chai|hoadien|den|banh):/.test(r.code),dev+' «Mã kết quả» holds only tries taken after the fix',r.code);
 ok(r.n===8,dev+' 8 fixed games listed in BAL.ag.mg2.cal.redo',r.redoK);
 ok(r.redRedo,dev+' every fixed game tried BEFORE its fix: red button',r.small);
 ok(r.afterWhite&&r.othersWhite,dev+' tried after the fix / never fixed: white',{after:r.after});
 ok(/còn 7 môn/.test(r.seq)&&/Đã thử/.test(r.hdr),dev+' «Thử tiếp» resumes at the not-yet-re-tried games',{seq:r.seq,hdr:r.hdr});
 await p.screenshot({path:`/tmp/claude-0/mgcal-redo-${dev}.png`});
 ok(!errs.length,dev+' no page errors',errs.slice(0,3));await p.close()}
 await b.close();const n=res.filter(Boolean).length;console.log(`\n${n}/${res.length} passed`);process.exit(n===res.length?0:1)})();
