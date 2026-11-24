/* chai-ramp (owner 21/11 ~00:55Z, MAIN CHÍNH 83): "Với lại cái chải chuốt á, qua cả năm hồi mà cái thanh màu xanh lá cây đó nó vẫn có một cái khoảng đó,
   nó không có thu nhỏ lại như những game khác." node dev/test/chai-ramp.js [dev/index.html|url]
   1 Thử tay: the green «đúng phẩm» band of Chải chuốt narrows hồi 1 → 5 (BAL.mgTier.cal d −2..2 → board ease, jmgt mgSet), strictly, as played on the board
   2 the band = wdGroomW (Tài, khéo tay, ma ma) × BAL.mgTier.lev.chai.zone at the board ease (ONE core, jmgt mgLev) — no typed width
   3 real play (wdGroomUI «Bắt đầu»): the board ease of her seat (mgSet "chai" occ hoc, rank, law 5): a higher rank → a narrower band
   4 no page errors */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;Q.length=0;KG82.noDemo=1});
 /* one board: open it at the given ease, tap three times, read the band width the board used (KG92.last.w) */
 const play=async(setup)=>{await p.evaluate(setup);await p.waitForTimeout(1500);
  for(let i=0;i<3;i++){await p.evaluate(()=>{const c=document.querySelector('#kg82box canvas');if(c)c.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true}))});await p.waitForTimeout(250)}
  await p.waitForTimeout(900);return p.evaluate(()=>{const w=KG92.last&&KG92.last.w;KG92.last=null;try{kg82Close()}catch(e){}return w})};
 const ds=await p.evaluate(()=>BAL.ag.mg2.cal.d.slice());const W=[],E=[];
 for(const d of ds){const w=await play(`(()=>{const t=mgSet("chai",{occ:"hoc",lv:0,d:${d}});window.__e=t.ease;kg82Open({art:"Thử tay",title:"t",how:"",round:"Hồi",roundV:"1/5"});kg82Play("chai",()=>{},{raw:1})})()`);
  W.push(w);E.push(await p.evaluate(()=>window.__e))}
 const want=await p.evaluate(es=>es.map(e=>wdGroomW(S)*mgLev({lv:e},"chai","zone")),E);
 ok(W.every(x=>x>0)&&W.every((x,i)=>i===0||x<W[i-1]),'1 Thử tay: the green band narrows every hồi 1 → 5',{ease:E,w:W.map(x=>+(+x).toFixed(3))});
 ok(W.every((x,i)=>Math.abs(x-want[i])<1e-9)&&W[0]/W[W.length-1]>1.6,'2 band = wdGroomW × BAL.mgTier.lev.chai.zone at the board ease (hồi 1 / hồi 5 > 1.6)',{want:want.map(x=>+x.toFixed(3)),ratio:+(W[0]/W[W.length-1]).toFixed(2)});
 /* 3 real play: rank 0 vs rank 6 through wdGroomUI's own «Bắt đầu» */
 const real=async rk=>{await p.evaluate(rk=>{S.rank=rk;S.khac=S.khac;try{kg82Close()}catch(e){}},rk);
  const w=await play(`(()=>{wdGroomUI();const g=document.getElementById("kg92go");if(g)g.onclick()})()`);return w};
 const r0=await real(0),r6=await real(6);const base=await p.evaluate(()=>wdGroomW(S));
 ok(r0>0&&r6>0&&r6<r0,'3 real play: band from the board ease of her seat; higher rank → narrower (law 5)',{rank0:r0&&+r0.toFixed(3),rank6:r6&&+r6.toFixed(3),base:+base.toFixed(3)});
 ok(errs.length===0,'4 no page errors',errs.slice(0,3));
 await b.close();const n=res.filter(x=>!x).length;console.log(n?`${n} FAIL`:'ALL OK');process.exit(n?1:0)})();
