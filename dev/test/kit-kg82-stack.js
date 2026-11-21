/* kit-kg82-stack (review/kit-kg82-stack; owner Fold shot «Thử tay: Tài nghệ các môn» — the kind grid drawn OVER the rows / button / heading above it) — node dev/test/kit-kg82-stack.js [dev/index.html]
   Cause: every .kg82act was position:sticky;bottom:0 (jcui) → several blocks pinned to the same bottom edge, a 31-button grid covered what is above. Rule now: only the LAST .kg82act is the sticky bar, and only on a screen with no grid block.
   Scan on Fold 755x1000 + iPad 1180x820: (a) the «Tài nghệ các môn» pick screen with 31 kinds (the same markup as jmgcal pick()), (b) the rules screen of EVERY kg82 kind (playArt), (c) a result-like screen (rows + two buttons),
   (d) a screen with a long row + three kg82act blocks. Overlap = two in-flow children of the box whose rectangles intersect by > 6 px (the legit sticky bottom bar — the last .kg82act with ≤ 3 buttons — floating over scrolled content is by design and is not counted). Also: a single-bar screen keeps its sticky bar. */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const p=await (await b.newContext({viewport:{width:W,height:H}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kg82Open==='function'&&typeof playArt==='function'&&typeof start==='function'&&typeof KG82_KIND!=='undefined');await p.waitForTimeout(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.ap=9;try{render()}catch(e){}
   window.__ov=()=>{const box=kg82Box();if(!box)return{none:1};const vis=e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0&&getComputedStyle(e).display!=='none'};const acts=[...box.querySelectorAll(':scope > .kg82act')],lastAct=acts[acts.length-1];const K=[...box.children].filter(vis).map(e=>({e,c:(e.className||e.tagName)+'',r:e.getBoundingClientRect(),pos:getComputedStyle(e).position,bar:e===lastAct&&e.querySelectorAll(':scope > button').length<=3}));const ov=[];/* the legit sticky bottom bar (the LAST .kg82act with ≤ 3 buttons) floating over scrolled content is by design: it is the only pair not counted */
    for(let i=0;i<K.length;i++)for(let j=i+1;j<K.length;j++){const a=K[i],c=K[j];if(c.bar||a.bar)continue;const it=Math.min(a.r.bottom,c.r.bottom)-Math.max(a.r.top,c.r.top);if(it>6)ov.push(a.c.split(' ')[0]+'#'+i+'∩'+c.c.split(' ')[0]+'#'+j+':'+Math.round(it))}
    return{n:K.length,ov,sticky:K.filter(k=>k.pos==='sticky').length}}});
  const R=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const o={};const ks=Object.keys(KG82_KIND).filter(k=>typeof KG82_ENG[KG82_KIND[k].e]==='function');const nmf=k=>KG82_KIND[k].n||k;
   try{kg82Close()}catch(e){}
   /* (a) the pick screen */
   const d=kg82Open({art:"Thử tay",title:"Tài nghệ các môn",how:"Mỗi môn ba hồi.",round:"Môn",roundV:String(ks.length)});const box=kg82Box();const dn=ks.slice(0,12),nd=ks.slice(12);
   box.innerHTML=`<h4 class="kpst">Đã thử ${dn.length}/${ks.length} môn</h4>`+kg82Rows([["Đã thử",dn.map(k=>`${nmf(k)} (khá chắc)`).join(", "),"t"],["Chưa thử",nd.map(nmf).join(", "),"n"]])+`<div class="kg82act"><button class="${kg82Btn()}" id="mgcal-seq">Thử tiếp các môn còn lại<small>từ môn ${nmf(nd[0])} · còn ${nd.length} môn</small></button></div><h4 class="kpst">Hoặc chọn một môn</h4><div class="kg82act">${ks.map(k=>`<button class="${kg82Btn(false)}" data-mgcal-k="${k}">${nmf(k)}<small>đã thử, tay khá</small></button>`).join("")}</div><h4 class="kpst">Mã kết quả</h4>`+kg82Rows([["Mã","CTM-CAL x"]])+`<div class="kg82act"><button class="${kg82Btn(true)}" id="mgcal-copy">Chép mã</button></div>`;
   await sleep(500);o.pick=__ov();
   /* (c) result-like */
   kg82Open({art:"Thử tay",title:"Kết quả",how:"x",round:"Hồi",roundV:"1/3"});kg82Box().innerHTML=`<h4 class="kpst">Kết quả</h4>`+kg82Rows([["Môn","Đàn"],["Điểm","8/10"]])+`<div class="kg82act"><button class="${kg82Btn(true)}" id="a1">Chép mã</button><button class="${kg82Btn()}" id="a2">Thử môn khác</button></div>`;await sleep(300);o.result=__ov();
   /* (d) long row + 3 blocks */
   kg82Open({art:"Thử tay",title:"Nhiều khối",how:"x",round:"Hồi",roundV:"1/3"});kg82Box().innerHTML=kg82Rows([["Dài",ks.map(nmf).join(", "),"t"]])+`<div class="kg82act"><button class="${kg82Btn()}">Một</button></div><h4 class="kpst">Hai</h4><div class="kg82act"><button class="${kg82Btn()}">A</button><button class="${kg82Btn()}">B</button></div><div class="kg82act"><button class="${kg82Btn()}">Ba</button></div>`;await sleep(300);o.multi=__ov();
   /* (b) the rules screen of every kind */
   o.kinds=[];for(const k of ks){try{kg82Close()}catch(e){}Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;try{(0,eval)(k==='hoa'?`startContest({art:"hoa",title:"Hội thi",onDone:()=>{}})`:`playArt({art:${JSON.stringify(k)},onDone:()=>{}})`)}catch(e){o.kinds.push([k,'ERR']);continue}await sleep(500);const v=__ov();o.kinds.push([k,v.none?'nobox':v.ov.length,v.sticky])}
   try{kg82Close()}catch(e){}return o});
  ok(R.pick.ov&&R.pick.ov.length===0,`${tag} «Tài nghệ các môn» pick screen: nothing overlaps (was: the grid over the rows / heading / button)`,R.pick.ov);
  ok(R.result.ov.length===0&&R.multi.ov.length===0,`${tag} result-like + multi-block screens stack without overlap`,[R.result.ov,R.multi.ov]);
  ok(R.result.sticky===1,`${tag} a single action-bar screen keeps its ONE sticky bar`,R.result.sticky);ok(R.pick.sticky===0,`${tag} a screen with a grid has no pinned bar (one scrolling column)`,R.pick.sticky);
  const bad=R.kinds.filter(x=>x[1]!==0&&x[1]!=='nobox');ok(bad.length===0,`${tag} rules screen of every kind (${R.kinds.length}): no overlap`,bad.slice(0,6));
  ok(errs.length===0,`${tag} no page errors`,errs.slice(0,2));await p.context().close()}
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`PASS ${res.length}`);process.exit(f?1:0)})();
