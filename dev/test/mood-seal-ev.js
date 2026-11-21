/* mood-seal-2 (owner 21/11 mark #68): every EMOTION event dialog (her outburst «Khóc suốt đêm» / «Trốn trong phòng» …, an NPC's outburst, hỏi tội, extreme mood) wears the emotion seal on the TOP-RIGHT corner of its event picture and the seal moves AT ONCE (live img.kemo, lean starts ≤ 400 ms after the dialog shows).
   usage: node dev/test/mood-seal-ev.js <build url> <outdir> 755x1000,1180x820  → one line per case + shots <outdir>/<WxH>-<case>.jpg */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
const CASES=[["khoc","feel","khoc"],["tron","feel","so"],["chan","feel","chan"],["hot-cham","hit","cham"],["emp-noi","hit","noi"],["emp-ban","hit","ban"],["th-quo","hit","quo"],["th-tvui","hit","tvui"],["emp-egian","hit","egian"],["out-gian","out","gian"],["out-buon","out","buon"],["ext-so","ext","so"]];
(async()=>{const b=await chromium.launch();let bad=0;
for(const sz of SIZES.split(",")){const [W,H]=sz.split("x").map(Number);const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,150)));
await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);await p.addStyleTag({content:'#kroul{display:none!important}'});
await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}});
await p.waitForFunction(()=>typeof S!=='undefined'&&S&&typeof rivals!=='undefined'&&rivals&&rivals.length>1);
await p.evaluate(()=>{window.kitKnown=()=>true;const k=document.getElementById('kload');if(k)k.remove();Q.length=0;document.getElementById('modal').hidden=true;document.getElementById('title').hidden=true;render()});await sleep(1500);
console.log(sz,errs.join('|'));
for(const [nm,kind,k] of CASES){
 const r=await p.evaluate(([nm,kind,k])=>{Q.length=0;document.getElementById('modal').hidden=true;document.getElementById('title').hidden=true;const R0=liveRivals(true);const v=R0.find(x=>x.queen)||R0[0];
  try{if(kind==="feel")feelMeShow({n:{khoc:"Khóc suốt đêm",so:"Trốn trong phòng",chan:"Bỏ dở việc đang làm"}[k],art:{khoc:"nhin-loi-mia-h"}[k]||"xa-huong"},{h:"Đêm ấy ta khóc suốt, gối ướt đẫm.",res:["Sức −8","tâm trọng +12"]},k);
   else if(kind==="hit"){eaS().hitW=-9;const p0=/^(noi|ban|nghi|egian|evui)$/.test(k)?S.emp:/^(quo|tgian|tvui)$/.test(k)?S.thO:v;window.eaHitMe(p0,k,{tk:"even",n:3,past:"Đã mấy tuần"});window.__hitN=0}
   else if(kind==="out"){const A=eaS();A.hitW=-9;eaMeOut(k)}
   else if(kind==="ext"){Q.push({t:"Lo âu mất ngủ",emoSeal:{k:"so",who:"me"},art:"img/act-xa-huong.webp",hideOut:true,h:"<p>Lo âu.</p>",opts:[{n:"Tiếp tục",fx:{},hideOut:true,hint:"không đổi gì thêm",risk:"an toàn",go:()=>{}}]})}
  }catch(e){return{err:String(e).slice(0,100)}}
  if(!Q.length)return{err:"no event queued"};const q=Q[0];window.__f=-1;const t0=performance.now();clearInterval(window.__iv);window.__iv=setInterval(()=>{if(window.__f<0&&document.querySelector('.kemo-big'))window.__f=Math.round(performance.now()-t0)},10);render();return{t:q.t,seal:q.emoSeal&&q.emoSeal.k}},[nm,kind,k]);
 if(r.err){console.log(' ',nm.padEnd(10),JSON.stringify(r));bad++;continue}
 await sleep(1400);const first=await p.evaluate(()=>window.__f);const early={big:first>=0&&first<=900,ms:first};
 await p.evaluate(()=>{document.getElementById('title').hidden=true;return Promise.all([...document.querySelectorAll('#modal img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)})))});await sleep(300);
 const m=await p.evaluate(()=>{const M=document.getElementById('modal');const mk=M.querySelector('.ksart>img.ksart-mark');const fig=mk&&mk.parentElement;const B=fig&&fig.getBoundingClientRect(),K=mk&&mk.getBoundingClientRect();const D=M.querySelector('.dlg'),DR=D&&D.getBoundingClientRect();
  return{open:!M.hidden,mark:mk?(mk.className.match(/kemo-([\w-]+)/)||[])[1]:'',px:K?Math.round(K.width):0,topRight:!!(K&&B&&K.right<=B.right+1&&K.top>=B.top-1&&K.right>B.right-K.width-14&&K.top<B.top+14),live:!!(mk&&mk.classList.contains('kemo-live')),fits:!!(DR&&DR.top>=-1&&DR.bottom<=innerHeight+1)}});
 const ok=m.mark&&m.topRight&&m.fits&&early.big;if(!ok)bad++;
 console.log(' ',nm.padEnd(10),JSON.stringify(Object.assign(r,m,{leanMs:early.ms})),ok?'OK':'FAIL');await p.screenshot({path:`${OUT}/${sz}-${nm}.jpg`,type:'jpeg',quality:55})}
await ctx.close()}
await b.close();console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0)})();
