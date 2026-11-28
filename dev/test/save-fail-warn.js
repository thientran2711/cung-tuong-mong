/* save-fail-warn (MAIN 182 order 27/11 23:14Z; Foreman E 23:00Z: E-S5 skilled-3 QuotaExceeded x540, «the player sees NO warning»).
   Every save writer, with the browser refusing every write (Storage.prototype.setItem throws QuotaExceededError), must show the ONE kit
   notice (kitNotice id saveBlocked, words CTM_WAIT.saveBlocked) where she SEES it (chip on screen, inside the viewport, on top at its centre),
   and keep telling her while the failures go on (again at every new buổi), without a chip per write in the same buổi; once a write reaches her
   slot again the notice goes and the sổ does not keep it. Writers checked live: j6 save (autosave of every step), jqSaveNow, j1 store.set of the
   cross-life stores (luân hồi / next life / life log), j52 pdSet (phúc duyên), j16 Sổ › Nhập ván › Ghi vào ô (title screen, its own red line);
   module-private writers (jcloud writeSlot, jcoopworld snapSave, jcoopthine guest copy, jcoopthin host store) = the static family scan
   dev/test/r10e-savewrite-scan.py (run here too). Devices: Fold 755x1000 + iPad 1180x820.
   usage: node dev/test/save-fail-warn.js <save.json> [root]   (root = another checkout with a built dev/index.html, e.g. LIVE)
   MUTATE=2: the r1 saveOk (any working write drops the notice) → row 5b must FAIL.
   MUTATE=1: the page's saveBlocked is put back to the one-shot LIVE form → the «again» rows must FAIL.   exit 1 on a fail */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),cp=require('child_process');
const SV=process.argv[2]||path.join(__dirname,'fixtures/world30-met.json');const ROOT=process.argv[3]||null;const MUT=process.env.MUTATE||'';
const {serve,BASE}=require('./coop-serve.js');let bad=0;const ok=(c,m,x)=>{if(!c)bad++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{
 /* static family scan (every save writer of the build is told) */
 {const r=cp.spawnSync('python3',[path.join(__dirname,'r10e-savewrite-scan.py')],{cwd:ROOT||path.resolve(__dirname,'../..'),encoding:'utf8'});
  const last=(r.stdout||'').trim().split('\n').pop();ok(r.status===0,'static scan: every save writer tells a refused write',last)}
 const b=await chromium.launch();
 for(const [W,H,dev] of [[755,1000,'Fold'],[1180,820,'iPad']]){
  const ctx=await b.newContext({viewport:{width:W,height:H},reducedMotion:'reduce'});await serve(ctx,ROOT);
  await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});const p=await ctx.newPage();const pe=[];p.on('pageerror',e=>pe.push(String(e)));
  await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof start==='function'&&typeof kitNotice==='function',null,{timeout:180000});await p.waitForTimeout(800);
  await p.evaluate(d=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());document.getElementById('title').hidden=true;SLOT=3;Q=[];quiet=true;deser(JSON.parse(d));quiet=false;try{Q.length=0;closeModal()}catch(e){}render()},fs.readFileSync(SV,'utf8'));
  await p.waitForTimeout(1500);
  await p.evaluate(mut=>{window.__jqoff=1;window.__spreadOff=1;window.__sbN=0;const k0=window.kitNotice;window.kitNotice=function(x){if(x&&x.id==='saveBlocked')window.__sbN++;return k0.apply(this,arguments)};
   if(mut==='2'){window.saveOk=function(){try{kitNoticeDrop('saveBlocked')}catch(z){}}}/* MUTATE=2: r1 saveOk (any working write drops it) → row 5b FAILs */
   else if(mut){window.saveBlocked=function(){try{kitNotice({id:"saveBlocked",line:CTM_WAIT.saveBlocked,sticky:true})}catch(z){}}}
   const o=Storage.prototype.setItem;window.__rs=()=>{Storage.prototype.setItem=o};window.__fail=()=>{Storage.prototype.setItem=function(){throw new DOMException('quota','QuotaExceededError')}};
   window.__clear=()=>{try{Q.length=0;closeModal()}catch(e){}try{render()}catch(e){}}},MUT);
  /* the chip SEEN: in the DOM, not fading, visible, inside the viewport, on top at its centre, her words readable */
  const seen=()=>p.evaluate(()=>{const c=document.getElementById('kntchip');if(!c||c.classList.contains('out')||c.dataset.id!=='saveBlocked')return {seen:false,why:c?('other/out:'+c.dataset.id+':'+c.textContent.slice(0,40)):'none'};
   const st=getComputedStyle(c),r=c.getBoundingClientRect();const inV=r.width>0&&r.left>=0&&r.top>=0&&r.right<=innerWidth+1&&r.bottom<=innerHeight+1;
   const t=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);const top=!!t&&(t===c||c.contains(t));const txt=c.textContent.includes(CTM_WAIT.saveBlocked.slice(0,20));
   return {seen:st.visibility!=='hidden'&&st.display!=='none'&&+st.opacity>0.5&&inV&&top&&txt,inV,top,txt,fs:parseFloat(st.fontSize),r:[Math.round(r.left),Math.round(r.top),Math.round(r.width),Math.round(r.height)]}});
  /* a card / scene the step opened holds every chip until it closes (kit notice rule §42.2): close it, as she would, then look */
  const waitSeen=async()=>{let s;for(let i=0;i<24;i++){if(i%4===0)await p.evaluate(()=>__clear());s=await seen();if(s.seen)return s;await p.waitForTimeout(250)}return s};
  const gone=async()=>{const ms=await p.evaluate(()=>{try{return BAL.entryToastMs||5000}catch(e){return 5000}});await p.waitForTimeout(ms+1200)};
  const step=()=>p.evaluate(()=>{S.buoi=((S.buoi||0)+1)%4;if(!S.buoi)S.tuan=(S.tuan||0)+1});
  ok(!(await seen()).seen,`${dev}: no notice while writes succeed`);
  /* 1 · j6 save (the autosave every step runs) */
  await p.evaluate(()=>{__fail();save()});await p.waitForTimeout(400);await p.evaluate(()=>__clear());
  let s=await waitSeen();ok(s.seen,`${dev}: j6 save refused → kit notice SEEN`,s);
  ok(await p.evaluate(()=>kitNoticeList().some(x=>x.id==='saveBlocked'&&x.sticky)),`${dev}: the notice stays in Tin báo (sticky)`);
  /* 2 · it STAYS: another notice of the step takes the chip, the toast time runs out → the held chip is back, still one line in Tin báo */
  await p.evaluate(()=>{__clear();kitNotice({id:'sfw-other',line:'Trong cung có tin mới',again:true})});await gone();await p.evaluate(()=>{save();save()});await p.waitForTimeout(600);
  s=await waitSeen();const one=await p.evaluate(()=>kitNoticeList().filter(x=>x.id==='saveBlocked').length);ok(s.seen&&one===1,`${dev}: after another notice + the toast time + 2 more refused writes → still SEEN (held), one line`,Object.assign({one},s));
  /* 3 · failures go on into a NEW buổi → told again (E: x540 refused writes, one chip at the first) */
  await step();await p.evaluate(()=>save());await p.waitForTimeout(300);await p.evaluate(()=>__clear());s=await waitSeen();ok(s.seen,`${dev}: new buổi, j6 save still refused → notice SEEN again`,s);
  /* 4 · jqSaveNow (life start «Nhận thân phận») at a new buổi */
  await gone();await step();await p.evaluate(()=>{if(typeof jqSaveNow==='function')jqSaveNow();else save()});await p.waitForTimeout(300);await p.evaluate(()=>__clear());s=await waitSeen();ok(s.seen,`${dev}: jqSaveNow refused → notice SEEN`,s);
  /* 5 · cross-life stores (j1 store.set) + phúc duyên (j52 pdSet): a refused write reaches saveBlocked */
  for(const [nm,fn] of [['store.set cung-luanhoi',()=>{const v=store.get('cung-luanhoi');store.set('cung-luanhoi',v)}],['store.set ctm-nextlife',()=>{store.set('ctm-nextlife',store.get('ctm-nextlife'))}],['store.set cung-kiep',()=>{store.set('cung-kiep',store.get('cung-kiep')||[])}],['pdSet',()=>{pdSet(typeof pdGet==='function'?pdGet():0)}]]){
   await gone();await step();const n0=await p.evaluate(()=>__sbN);await p.evaluate(`(${fn})()`);await p.waitForTimeout(300);await p.evaluate(()=>__clear());
   const n1=await p.evaluate(()=>__sbN);s=await waitSeen();ok(n1>n0&&s.seen,`${dev}: ${nm} refused → notice SEEN`,Object.assign({calls:n1-n0},s))}
  /* 5b · (reviewer r2) PART of the writes refused (size-dependent quota: the phúc duyên store refused, the slot autosave works) → the notice is
     NOT taken away by the working slot writes; it goes only when phúc duyên itself is written again */
  {await p.evaluate(()=>{__rs();save();store.set('cung-luanhoi',store.get('cung-luanhoi'));store.set('ctm-nextlife',store.get('ctm-nextlife'));store.set('cung-kiep',store.get('cung-kiep')||[]);pdSet(pdGet())});await p.waitForTimeout(500);
   const clean=await p.evaluate(()=>!kitNoticeList().some(x=>x.id==='saveBlocked'));
   await gone();await step();await p.evaluate(()=>{const o=Storage.prototype.setItem;window.__rs=()=>{Storage.prototype.setItem=o};Storage.prototype.setItem=function(k){if(k===PD_KEY)throw new DOMException('quota','QuotaExceededError');return o.apply(this,arguments)};pdSet(pdGet())});
   await p.waitForTimeout(300);await p.evaluate(()=>{save();save();save()});await p.waitForTimeout(800);await p.evaluate(()=>__clear());s=await waitSeen();
   const held=await p.evaluate(()=>kitNoticeList().some(x=>x.id==='saveBlocked'));ok(clean&&held&&s.seen,`${dev}: phúc duyên refused while the slot autosave works → notice SEEN, not dropped by the slot writes`,Object.assign({clean,held},s))}
  /* 6 · every refused writer works again → the notice goes, and the sổ does not keep a stale one */
  await p.evaluate(()=>{__rs();store.set('cung-luanhoi',store.get('cung-luanhoi'));store.set('ctm-nextlife',store.get('ctm-nextlife'));store.set('cung-kiep',store.get('cung-kiep')||[]);pdSet(pdGet());save()});await p.waitForTimeout(800);
  const rec=await p.evaluate(()=>{const raw=slotGet(SK(SLOT));let nt=null;try{nt=(JSON.parse(raw).nt||[]).map(x=>x.id||x[0]||x.i).filter(Boolean)}catch(e){}return {inList:kitNoticeList().some(x=>x.id==='saveBlocked'),slotHas:JSON.stringify(nt||[]).includes('saveBlocked')||String(raw).includes(CTM_WAIT.saveBlocked)}});
  ok(!rec.inList&&!rec.slotHas,`${dev}: write works again → notice dropped, sổ keeps no stale notice`,rec);
  /* 7 · j16 Thiết lập › Nạp sổ › Ghi vào ô (title screen; the real taps; its own red line beside «Đọc bản chép») */
  const code=await p.evaluate(async()=>await saveCode(slotGet(SK(SLOT))));
  await p.evaluate(()=>{try{localStorage.removeItem(SK(2))}catch(e){}showTitle();document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove())});await p.waitForTimeout(500);
  const cl=async q=>{await p.locator(q).filter({visible:true}).first().click({timeout:8000});await p.waitForTimeout(300)};
  let t={};try{await cl('[data-tgo="opt"]');await cl('#x-imp');await p.locator('#x-in').filter({visible:true}).first().fill(code);await cl('#x-chk');await cl('[data-xt="2"]');
   await p.evaluate(()=>__fail());await cl('#x-write');await p.evaluate(()=>__rs());
   const m=p.locator('#x-msg').filter({visible:true}).first();await m.scrollIntoViewIfNeeded();
   t=await m.evaluate(m=>{const r=m.getBoundingClientRect(),tp=document.elementFromPoint(r.left+Math.min(12,r.width/2),r.top+r.height/2);
    return {txt:m.textContent.includes(CTM_WAIT.saveBlocked.slice(0,20)),vis:r.width>0&&r.top>=0&&r.bottom<=innerHeight&&getComputedStyle(m).visibility!=='hidden',top:!!tp&&(tp===m||m.contains(tp)),r:[r.left,r.top,r.width,r.height].map(Math.round)}})}catch(e){t={err:String(e).slice(0,120)};await p.evaluate(()=>__rs())}
  ok(t.txt&&t.vis&&t.top,`${dev}: Thiết lập › Nạp sổ › Ghi vào ô refused → its line SEEN`,t);
  ok(!pe.length,`${dev}: no page error`,pe.slice(0,3));await ctx.close()}
 await b.close();console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0)})();
