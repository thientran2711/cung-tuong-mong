/* mg-skip-all (owner 18/11 ~05:45Z/~05:55Z; KIT §13.6 kitQuick, BAL.skip): the ONE quick option on the mini-games, in the real page.
   Checks the button (kit part, odds WORD, no %), the outcome table (lesson won = partial progress / lost = 0; makeup won = the middle tier /
   lost = Vụng về; works = no product), and shoots the intro of 4 games (makeup, Tài nghệ lesson, Tu đức lesson, the old j5 overlay).
   usage: node dev/test/mg-skip.js <url of dev/index.html> <WxH@dpr> <shotdir> */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');
const [,,URL,VP,DIR]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@2');const W=+m[1],H=+m[2],DPR=+m[3];const tag=`${W}x${H}`;
fs.mkdirSync(DIR,{recursive:true});let fail=0;const ck=(n,c,x)=>{console.log((c?'ok  ':'FAIL')+' '+n+(x!==undefined?' · '+JSON.stringify(x):''));if(!c)fail++};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,serviceWorkers:'block'});
 await ctx.route(u=>/ctmload=1|x-ctm-load/.test(String(u)),r=>r.abort());const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>{errs.push(e.message.slice(0,200));console.log('PAGEERR',e.message.slice(0,300))});p.setDefaultTimeout(180000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true})});
 for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:120000});
  if(await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()&&!S.out))break}
 console.log('started');try{await require('./lib/roulette').dismissRoulette(p)}catch(e){}console.log('roulette done');
 await p.waitForTimeout(1200);
 const reset=()=>p.evaluate(()=>{const kg=document.querySelector('[data-kl="go"]');if(kg)kg.click();const k=document.getElementById('kroul');if(k)k.remove();document.querySelectorAll('.kmov,.modal.kload').forEach(e=>e.remove());try{TOIL.st=null}catch(e){}try{TDS.busy=false}catch(e){}Q.length=0;S.buoi=0;used=0;S.suc=90;S.bac=Math.max(S.bac||0,500);S.mg=null;try{closeModal()}catch(e){}try{kg82Close()}catch(e){}
  const ov=document.getElementById('ov');if(ov)ov.hidden=true;render()});
 const shot=async n=>{await p.waitForTimeout(700);await p.screenshot({path:`${DIR}/${tag}-${n}.png`})};
 const btn=sel=>p.evaluate(s=>{const e=document.querySelector(s);if(!e)return null;const r=e.getBoundingClientRect();return{t:e.innerText.replace(/\s+/g,' '),cls:e.className,vis:r.width>0&&r.height>0&&r.bottom<=innerHeight+1&&r.right<=innerWidth+1}},sel);
console.log('step0');
 /* 0. the core: one key, one roll */
 const core=await p.evaluate(()=>({od:BAL.skip&&BAL.skip.od,old5:!!(BAL.odb.j5),old83:!!(BAL.odb.j83),w:word(od(BAL.skip.od)),roll:String(kitQuickRoll).includes('BAL.skip.od')}));
 ck('BAL.skip.od = 40, old odb keys gone, kitQuickRoll reads it',core.od===40&&!core.old5&&!core.old83&&core.roll,core);
 const wordOK=t=>/(Liều|Khó|Năm phần|Khá chắc|Chắc|Nắm chắc|Nắm chắc)/.test(t)&&!/%|Chắc chắn/.test(t);

 /* 1. MAKEUP (morning mirror): quick on the dress screen; won = Đoan trang (vua), lost = Vụng về */
 for(const ok of [true,false]){await reset();await p.evaluate(()=>toilOpen());await p.waitForSelector('#kg82',{state:'visible'});
  await p.evaluate(()=>toilDressDone(true));await p.waitForSelector('#toilquick');
  const q=await btn('#toilquick');ck(`makeup quick button (kit .kquick, odds word) [${ok}]`,q&&/kquick/.test(q.cls)&&/kbtn alt/.test(q.cls)&&wordOK(q.t)&&/Điểm trang nhanh/.test(q.t)&&/Đoan trang/.test(q.t)&&/Vụng về/.test(q.t)&&q.vis,q);
  if(ok)await shot('makeup');
  await p.evaluate(o=>{window.__kq=kitQuickRoll;kitQuickRoll=()=>o},ok);await p.evaluate(()=>document.querySelector('#toilquick').click());await p.waitForSelector('#toildone',{state:'attached',timeout:30000}).catch(()=>{});
  const r=await p.evaluate(()=>{kitQuickRoll=window.__kq;return{mk:toilMk(S.toilette),made:S.toilette.makeup,score:S.toilette.score}});
  ck(`makeup quick ${ok?'won → vua (Đoan trang)':'lost → vung (Vụng về)'}`,r.made&&r.mk===(ok?'vua':'vung'),r);if(!ok)await shot('makeup-res')}
 /* colour screen (contest makeup path) has it too */
 await reset();await p.evaluate(()=>toilOpen());await p.waitForSelector('#kg82',{state:'visible'});await p.evaluate(()=>{TOIL.st.F=1;toilColUI()});
 ck('makeup colour screen quick (contest path)',!!(await btn('#toilquick2')));

 /* 2. Tài nghệ lesson (j83 «Học nhanh» through playArt): button + outcome (won = 1 lesson pt, no work) */
 await reset();const lesson=await p.evaluate(()=>new Promise(res=>{let out=null;playArt({art:'cam',title:'Học Cầm',quick:{n:'Học nhanh',roll:1,win:'tiến bộ một phần, không ra thành phẩm',lose:'không tiến bộ'},onDone:(raw,o)=>{out={raw,o};res(out)}});
  setTimeout(()=>res({t:(document.querySelector('#kg82skip')||{}).innerText}),900)}));
 const lq=await btn('#kg82skip');ck('lesson «Học nhanh» kit button with the odds word',lq&&/kquick/.test(lq.cls)&&wordOK(lq.t)&&/Học nhanh/.test(lq.t)&&/thành: tiến bộ một phần/.test(lq.t)&&/hỏng: không tiến bộ/.test(lq.t)&&lq.vis,lq);
 await shot('lesson');
 await p.evaluate(()=>{window.__kq=kitQuickRoll;kitQuickRoll=()=>true;window.__pa=null;const o=KG82;});
 const pa=await p.evaluate(()=>new Promise(res=>{const b=document.querySelector('#kg82skip');b.click();setTimeout(()=>{const ok=document.querySelector('#kg82ok');const row=(document.querySelector('#kg82box-res')||document.querySelector('#kg82box')||{}).innerText;
  res({row:String(row||'').replace(/\s+/g,' ').slice(0,120),ok:!!ok})},300)}));
 await p.evaluate(()=>{kitQuickRoll=window.__kq});ck('lesson quick result row says thành (no 5/10)',pa.ok&&/học nhanh/i.test(pa.row)&&/thành/.test(pa.row)&&!/5\/10/.test(pa.row),pa);
 await reset();

 /* 3. j83 lesson outcome through the real lesson button path: pts from the roll */
 const j83=await p.evaluate(()=>{const g=[];for(const ok of [true,false]){S.mg={k:'cam',l:0,mode:'self',wk:{kind:WDEF.cam,mat:0}};let got=null;
   const pa0=playArt;playArt=function(o){o.onDone(0,{skipped:true,ok})};try{openMG('cam',0,x=>{got=x})}finally{playArt=pa0}g.push(got);S.mg=null}
   return g});
 ck('j83 lesson quick: won = 1 pt (× danh sư), lost = 0',j83[0]>=1&&j83[1]===0,j83);

 /* 4. Tu đức lesson (jtd): button, won = partial progress, lost = 0 */
 await reset();const k=await p.evaluate(()=>{vNorm(S);const v=VIR.find(x=>S.vir[x.k]<4);return v&&v.k});
 await p.evaluate(k=>{S.suc=90;tdPlay(k,'self')},k);await p.waitForSelector('#kg82skip');
 const tq=await btn('#kg82skip');ck('Tu đức «Để trời định» kit button with the odds word',tq&&/kquick/.test(tq.cls)&&wordOK(tq.t)&&/tiến bộ một phần/.test(tq.t)&&!/5\/10/.test(tq.t)&&tq.vis,tq);
 await shot('tuduc');
 for(const ok of [true,false]){await reset();const g0=await p.evaluate(k=>{S.suc=90;const g={dead:S.dead,q:Q.length,mg:!!S.mg,busy:TDS.busy,l:S.vir[k],can:can(BAL.td.k),suc:S.suc};tdPlay(k,'self');g.vis=!!document.querySelector('#kg82:not([hidden]) #kg82skip');return g},k);console.log('td guard',JSON.stringify(g0));await p.waitForSelector('#kg82skip',{state:'visible'});
  const v0=await p.evaluate(k=>S.vir[k]+(S.virP&&S.virP[k]||0)+JSON.stringify(S.virx||''),k);
  const before=await p.evaluate(k=>JSON.stringify([S.vir[k],S.virp||null,S.vp||null]),k);
  await p.evaluate(o=>{window.__kq=kitQuickRoll;kitQuickRoll=()=>o},ok);await p.evaluate(()=>document.querySelector('#kg82skip').click());await p.waitForTimeout(400);console.log('after skip',JSON.stringify(await p.evaluate(()=>[document.querySelectorAll('#kg82skip').length,(document.querySelector('#kg82skip')||{}).outerHTML,!!document.querySelector('#kg82ok'),(document.querySelector('#kg82')||{}).hidden,(document.querySelector('#kg82box-res')||{}).innerText])));await p.waitForSelector('#kg82ok',{state:'attached'});
  let got=null;await p.evaluate(()=>{window.__g=[];const a0=addVir;window.__a0=a0;addVir=function(pp,kk,g){if(pp===S)window.__g.push(g);return a0.apply(this,arguments)}});
  await p.evaluate(()=>document.querySelector('#kg82ok').click());await p.waitForTimeout(300);got=await p.evaluate(()=>{addVir=window.__a0;kitQuickRoll=window.__kq;return window.__g});
  ck(`Tu đức quick ${ok?'won → progress > 0':'lost → progress 0'}`,ok?got.length&&got[0]>0:(!got.length||got[0]===0),got)}

 /* 5. the old j5 lesson overlay (#mgskip) */
 await reset();await p.evaluate(()=>{S.mg=null;openMG('ky',0,()=>{})});await p.waitForSelector('#mgskip',{state:'visible'});
 const jq=await btn('#mgskip');ck('j5 overlay «Để trời định» = kit quick (odds word, thành/hỏng)',jq&&/kquick/.test(jq.cls)&&wordOK(jq.t)&&/thành:? tiến bộ một phần/i.test(jq.t)&&/hỏng|bại/i.test(jq.t),jq);
 await shot('j5ov');
 const pts=await p.evaluate(()=>new Promise(res=>{window.__kq=kitQuickRoll;kitQuickRoll=()=>false;const ov=document.getElementById('mgskip');ov.click();setTimeout(()=>{kitQuickRoll=window.__kq;res(document.querySelector('#ov .mgres')&&document.querySelector('#ov .mgres').innerText)},200)}));
 ck('j5 quick lost → "Không vào"',/Không vào/.test(pts||''),pts);
 await p.evaluate(()=>{const b=document.getElementById('mgok');if(b)b.click()});

 /* 6. works: the veil craft quick makes nothing */
 await reset();const vl=await p.evaluate(()=>{const n0=S.inv.length;const b0=S.bac;const pa0=playArt;let q=null;playArt=function(o){q=o.quick;o.onDone(5,{skipped:true})};try{vlCraftRun(0)}finally{playArt=pa0}return{q,n:S.inv.length-n0,bac:S.bac-b0}});
 ck('veil quick = no product (sure)',vl.q&&vl.q.sure&&vl.n===0,vl);
 ck('no page errors',!errs.length,errs.slice(0,3));
 await b.close();console.log(fail?`FAIL ${fail}`:'PASS mg-skip');process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
