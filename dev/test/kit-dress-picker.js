/* kit-dress-picker (review/kit-dress-picker; owner OD 20/11 ~21:45Z «màn chọn trang phục … không có nhân vật bên khung trái») — node dev/test/kit-dress-picker.js [dev/index.html]
   The dress picker (makeup «Trước gương đồng» step 1 = toilDressUI, the ONE picker; KIT §60.2 kitDressPicker): HER figure is on the left on every device — Fold 755x1000: the picker's own figure stand (.kdpk-fig);
   iPad 1180x820: the game frame's figure column (.kgfig) is the preview (refreshed with the dress she wears, no second figure). Exactly ONE figure, choices on the right, nothing cut off, the figure follows the rank of the worn dress. */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad'],[390,844,'phone']]){
  const p=await (await b.newContext({viewport:{width:W,height:H}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof toilOpen==='function'&&typeof kitDressPicker==='function'&&typeof start==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.bac=500;try{render()}catch(e){}});await p.waitForTimeout(1200);
  await p.evaluate(()=>{try{kmReset()}catch(e){}document.querySelectorAll('.kmov,#kmrew,#kroul').forEach(e=>e.remove());toilOpen();const r=document.getElementById('toilrdy');if(r)r.click()});await p.waitForTimeout(2200);
  const r=await p.evaluate(()=>{const o={};const box=document.getElementById('kg82');const vis=e=>{const r=e.getBoundingClientRect();return r.width>20&&r.height>40&&getComputedStyle(e).visibility!=='hidden'};
   const figs=[...box.querySelectorAll('.kesf')].filter(vis);o.figs=figs.length;o.kdpk=!!box.querySelector('.kdpk-fig');o.kgfig=!!box.querySelector('.kgfig');
   const f=figs[0],g=box.querySelector('.toilinv'),fr=f&&f.getBoundingClientRect(),gr=g&&g.getBoundingClientRect();o.left=!!(fr&&gr&&fr.right<=gr.left+4);o.grid=!!g&&vis(g);
   const im=f&&f.querySelector('img');o.img=!!im&&im.complete&&im.naturalWidth>0;const dlg=box.getBoundingClientRect();o.fit=!!fr&&fr.left>=dlg.left-1&&fr.right<=dlg.right+1&&fr.bottom<=innerHeight+1&&gr.right<=dlg.right+1;
   const ok1=document.getElementById('toilok');o.btn=!!ok1&&ok1.getBoundingClientRect().bottom<=innerHeight+1;
   const r0=S.rank;const a=kitDressFigSrc(S,0),c=kitDressFigSrc(S,7);o.s0=a;o.s6=c;o.rankBack=S.rank===r0&&typeof figTierOf==='function';const h=kitDressPicker({p:S,rank:7,head:"",body:"<i>x</i>"});o.pickSrc=(h.match(/src="([^"]+)"/)||[])[1]||"";o.hasKdpk=/kdpk-fig/.test(h);return o});
  if(tag!=='phone'){ok(r.figs===1,`${tag}: exactly ONE figure on screen`,r.figs);ok(r.left&&r.grid,`${tag}: figure left of the choices (grid visible)`,[r.left,r.grid]);ok(r.img,`${tag}: figure picture loaded`)}else ok(r.figs===0&&r.grid,`phone: no room for a figure — none shown, picker as before`,r.figs);ok((tag==='phone'||r.fit)&&r.btn,`${tag}: nothing cut off, «Mặc bộ này» in view`,[r.fit,r.btn]);
  ok(r.s0&&r.s6&&r.s0!==r.s6&&r.rankBack,`${tag}: the figure follows the dress rank (rank 0 ≠ rank 7), state put back`,[r.s0&&r.s0.split('/').pop(),r.s6&&r.s6.split('/').pop(),r.rankBack]);
  ok(!r.hasKdpk||r.pickSrc===r.s6,`${tag}: kitDressPicker builds the rank-7 figure when it owns the stand`,[r.hasKdpk,r.pickSrc&&r.pickSrc.split('/').pop()]);
  ok(errs.length===0,`${tag}: no page errors`,errs.slice(0,2));
  if(process.argv[3])await p.screenshot({path:path.join(process.argv[3],`dress-${tag}.png`)});await p.context().close()}
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`PASS ${res.length}`);process.exit(f?1:0)})();
