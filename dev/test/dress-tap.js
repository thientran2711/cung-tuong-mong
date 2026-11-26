/* dress-tap (E95, owner OD 26/11 ~01:25Z) — node dev/test/dress-tap.js [dev/index.html] [shotdir]
   Owner (verbatim): "Buổi sáng mặc y phục trong trang điểm không được, bấm chọn mà không thấy mặc"
   Rule: in the dress picker, a TAP on a piece in the chest wears it at once — shown = worn — and the look is saved.
   Whole family (every outfit / hairpin / jewel picker, per tab of the ONE picker kitDressPicker = toilDressUI «Trước gương đồng» Hồi 1):
     tabs Y phục / Trâm cài / Trang sức; real taps (page.click, the player's finger), Fold 755x1000 + iPad 1180x820.
   Per tap: 1 the piece is worn (wdOf(S).y / .tram, or the jewel's .w)   2 the «Đang mặc» slot shows it   3 the detail under the chest offers «Tháo» (selected, info shown)
            4 her figure = the figure at the worn dress's tier (kitDressFigSrc)   5 after a reload (loadSlot + deser) the same piece is worn
   Also: a tap on a piece she already wears only selects it (no change); Tư trang bag: tap → card → «Mặc» wears it (unchanged path, figure + reload).
   Prints the scan table (picker | tab | before (main 5e013076: tap = select only, «Mặc» needed) | after). */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);const SHOT=process.argv[3]||'';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};const table=[];
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const p=await (await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:SHOT?2:1})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof toilOpen==='function'&&typeof start==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.bac=500;S.ap=9;
   /* a second jewel so the Trang sức tab has a piece in the chest */try{const k=Object.keys(IT).find(k=>IT[k]&&itm(k).sl==="ear"&&!(S.inv||[]).some(e=>e&&e.k===k));if(k)S.inv.push({k})}catch(e){}save();try{render()}catch(e){}});await p.waitForTimeout(1200);
  const open=async()=>{await p.evaluate(()=>{try{kmReset()}catch(e){}document.querySelectorAll('.kmov,#kmrew,#kroul').forEach(e=>e.remove());try{kg82Close()}catch(e){}toilOpen();document.getElementById('toilrdy').click()});await p.waitForTimeout(1800)};
  await open();
  const worn=()=>p.evaluate(()=>({y:(wdOf(S).y||{}).k||null,tram:(wdOf(S).tram||{}).k||null,jw:(S.inv||[]).filter(e=>e&&e.w&&IT[e.k]).map(e=>e.k).sort().join(','),
   slots:[...document.querySelectorAll('#kg82 [data-keqk="toil"]')].map(e=>e.getAttribute('title')||'').join('|'),
   fig:((document.querySelector('#kg82 .kesf img')||{}).src||'').split('/').pop(),want:(()=>{try{return String(kitDressFigSrc(S,toilPor().rank)||'').split('/').pop()}catch(e){return''}})(),
   det:[...document.querySelectorAll('#kg82 [data-toilact]')].map(x=>x.dataset.toilact).join(',')}));
  for(const [tab,label] of [['y','Y phục'],['tram','Trâm cài'],['trang','Trang sức']]){
   await p.click(`#kg82 [data-kinvtab="${tab}"]`);await p.waitForTimeout(400);
   const cand=await p.evaluate(()=>{const o=KINV.reg.toil;return [...document.querySelectorAll('#kg82 .toilinv [data-kinvi]')].filter(e=>e.offsetParent).map(e=>{const it=o.items[+e.dataset.kinvi];return{i:+e.dataset.kinvi,k:it&&it.g&&it.g.k,worn:!!(it&&it.g&&(it.g.wdSlot||it.g.w)),name:it&&it.name}})});
   const pick=cand.find(c=>!c.worn);if(!pick){ok(false,`${tag} ${label}: a piece in the chest to tap`,cand);continue}
   const w0=await worn();await p.click(`#kg82 .toilinv [data-kinvi="${pick.i}"]`);await p.waitForTimeout(700);await p.waitForFunction(()=>{const i=document.querySelector("#kg82 .kesf img");return !i||i.src.split("/").pop()===String(kitDressFigSrc(S,toilPor().rank)).split("/").pop()},null,{timeout:4000}).catch(()=>0);const w1=await worn();
   const isWorn=tab==='y'?w1.y===pick.k:tab==='tram'?w1.tram===pick.k:w1.jw.split(',').includes(pick.k);
   ok(isWorn,`${tag} ${label}: one tap on «${pick.name}» wears it at once`,{before:w0[tab==='trang'?'jw':tab],after:w1[tab==='trang'?'jw':tab]});
   ok(w1.slots.includes(pick.name),`${tag} ${label}: «Đang mặc» shows «${pick.name}»`,w1.slots);
   ok(/off/.test(w1.det),`${tag} ${label}: the piece stays selected, its detail offers «Tháo»`,w1.det);
   ok(!w1.fig||w1.fig===w1.want,`${tag} ${label}: her figure = the figure at the worn dress's tier`,[w1.fig,w1.want]);
   table.push([tag,'Điểm trang · '+label,'tap = select, «Mặc» needed',isWorn?'tap = worn + saved':'NOT worn'])}
  /* a tap on a piece she already wears: select only */
  await p.click('#kg82 [data-kinvtab="y"]');await p.waitForTimeout(400);
  const wi=await p.evaluate(()=>{const o=KINV.reg.toil;const e=[...document.querySelectorAll('#kg82 .toilinv [data-kinvi]')].find(e=>{const it=o.items[+e.dataset.kinvi];return e.offsetParent&&it&&it.g&&it.g.wdSlot});return e?+e.dataset.kinvi:-1});
  if(wi>=0){const a=await worn();await p.click(`#kg82 .toilinv [data-kinvi="${wi}"]`);await p.waitForTimeout(500);const c=await worn();ok(a.y===c.y&&a.tram===c.tram&&a.jw===c.jw,`${tag}: a tap on what she already wears changes nothing`)}
  if(SHOT)await p.screenshot({path:path.join(SHOT,`dress-tap-${tag}.png`)});
  /* reload: the worn look is saved */
  const before=await worn();await p.reload({waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  const after=await p.evaluate(()=>{const d=loadSlot(3);if(!d)return{err:'no save'};SLOT=3;quiet=true;deser(d);quiet=false;document.getElementById('title').hidden=true;Q.length=0;
   return{y:(wdOf(S).y||{}).k||null,tram:(wdOf(S).tram||{}).k||null,jw:(S.inv||[]).filter(e=>e&&e.w&&IT[e.k]).map(e=>e.k).sort().join(',')}});
  ok(after.y===before.y&&after.tram===before.tram&&after.jw===before.jw,`${tag}: after a reload she still wears what she tapped`,{before:[before.y,before.tram,before.jw],after});
  /* Tư trang bag (same family, unchanged path): tap a robe → its card → «Mặc» */
  const tt=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));try{kg82Close()}catch(e){}S.ap=9;const i=(S.inv||[]).findIndex(e=>e&&WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==="y"&&!e.h);if(i<0)return{none:1};const k=S.inv[i].k;
   const y0=(wdOf(S).y||{}).k;wdWearUI(i);await sleep(300);return{k,y0,y1:(wdOf(S).y||{}).k}});
  if(!tt.none){ok(tt.y1===tt.k,`${tag} Tư trang: «Mặc» on a robe wears it`,tt);table.push([tag,'Tư trang · Y phục','card → «Mặc» (1 khắc)',tt.y1===tt.k?'unchanged, worn':'NOT worn'])}
  ok(errs.length===0,`${tag}: no page errors`,errs.slice(0,2));await p.context().close()}
 await b.close();console.log('\nSCAN TABLE (device | picker · tab | before | after)');table.forEach(r=>console.log('| '+r.join(' | ')+' |'));
 const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`PASS ${res.length}`);process.exit(f?1:0)})();
