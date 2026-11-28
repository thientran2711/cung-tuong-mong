/* trung y (jty) test: empty Y phục slot → her trung y picture of the right tier on the stage / dialog / round portrait;
   going out → "Mất" on the place card and Danh lost; the robbery event; an old save loads.
   usage: node dev/test/trung-y.js <site url (dev/index.html)> <W>x<H>@dpr <outdir> <tag> [old-save.json] [local trung y dir]
   [local dir]: img/FIGURES-ty.json + fig/por-*-ty* served from this folder (art not yet on the CDN) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
const [,,URL,SZ,OUT,TAG,OLD,LOC]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 if(LOC)await ctx.route(/img\/(FIGURES-ty\.json|(fig|por)-[a-z]+-[a-z]\d+-ty\d-a\d+\.webp)(\?.*)?$/,async r=>{const n=r.request().url().split('?')[0].split('/').pop();const f=path.join(LOC,n);
   if(fs.existsSync(f))return r.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':n.endsWith('json')?'application/json':'image/webp','access-control-allow-origin':'*'}});return r.continue()});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 const shot=async n=>{for(let t=0;t<3;t++){try{await p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:80});return}catch(e){await p.waitForTimeout(1500)}}};
 const clear=()=>p.evaluate(()=>{try{KMQ.length=0}catch(e){}document.querySelectorAll('.kmov').forEach(e=>e.remove());Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;document.querySelectorAll('.kroul').forEach(e=>e.remove())});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof tyOn==='function');await p.waitForTimeout(2500);
 const R={};
 /* 1. old save loads */
 if(OLD&&fs.existsSync(OLD)){const d=fs.readFileSync(OLD,'utf8');R.old=await p.evaluate(d=>{try{const kl=document.getElementById('kload');if(kl)kl.remove();localStorage.setItem(SK(2),d);SLOT=2;const dd=loadSlot(2);quiet=true;deser(dd);quiet=false;try{deal()}catch(e){}document.getElementById('title').hidden=true;
   Q.length=0;render();const w=wdOf(S);return{ok:!!S&&!S.dead,name:S.name,y:!!w.y,ty:tyOn(S)}}catch(e){return{err:e.message}}},d);await p.waitForTimeout(1500);await shot('old')}
 /* 2. a new life, a consort; face c01 (art drawn) */
 /* start() is async: wait for the new life, keep a consort (not a palace maid) */
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true});
 for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:30000});
  if(await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()&&!S.out))break}
 R.setup=await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;
  Q.length=0;try{NLP=null}catch(e){}const s=document.createElement('style');s.textContent='.kroul{display:none!important}';document.head.appendChild(s);
  S.pid='consort:c01';S.fid='consort:c01';try{figUsed().push('consort:c01')}catch(e){}
  S.place='home';S.visit={k:'home',people:homePeople(),talked:false,tk:{}};S.buoi=0;used=0;tab='act';render();return{srv:isSrv(),fid:figPick(S),rank:S.rank,y:!!wdOf(S).y}});
 await clear();await p.waitForFunction(()=>window.TYF&&TYF.ix||true);await p.waitForTimeout(2500);
 R.dressed=await p.evaluate(()=>({src:(document.getElementById('mefig')||{}).src||'',ty:tyOn(S)}));await shot('1-dressed');
 /* 3. the robe is confiscated (jearn path: a base re-issue) → slot stays empty */
 R.confiscated=await p.evaluate(()=>{const w=wdOf(S);w.y={k:w.y.k,from:'base'};const w2=wdOf(S);render();return{y:w2.y,ty:tyOn(S),nvp:S.tyNvp,wk:wk()}});
 await p.waitForTimeout(2500);
 for(const rank of [0,3,7]){R['r'+rank]=await p.evaluate(rank=>{S.rank=rank;S.queen=rank===7?1:0;render();return{tier:tyTier(S)}},rank);await p.waitForTimeout(2200);await clear();
  R['r'+rank].stage=await p.evaluate(()=>{const m=document.getElementById('mefig');return m?m.getAttribute('src').split('/').pop():null});
  R['r'+rank].por=await p.evaluate(()=>{try{return figFor(S,'por').split('/').pop()}catch(e){return e.message}});await shot('2-stage-r'+rank)}
 await p.evaluate(()=>{S.rank=1;S.queen=0;render()});await p.waitForTimeout(1500);
 /* 4. a dialog with her: a person card / event card that shows her picture */
 R.dialog=await p.evaluate(()=>{Q.push({t:'Trong tẩm cung',who:pMe(),h:'<p>Ngươi ngồi bên song cửa, chưa khoác y phục.</p>',opts:[{n:'Đã rõ',fx:{},x:'',go:()=>{}}]});render();return true});
 await p.waitForTimeout(2500);R.dialogImgs=await p.evaluate(()=>[...document.querySelectorAll('#modal img')].map(i=>i.getAttribute('src')||'').filter(s=>/-ty\d-/.test(s)).map(s=>s.split('/').pop()));await shot('3-dialog');await clear();
 /* 5. going out: the place card shows Mất, then walking costs Danh */
 await clear();R.out=await p.evaluate(()=>{S.buoi=0;used=0;tab='go';render();const k=['vuon','ngu','tyv','thu'].find(k=>{try{return accessOf(S,k).ok}catch(e){return false}})||'vuon';j77Tap(k);
  const M=document.getElementById('modal');return{k,shown:M&&!M.hidden,title:(document.getElementById('mt')||{}).textContent,mat:((M.innerText||'').match(/(Mất|mất)[^\n]*/)||[null])[0],danh0:S.danh}});
 await p.waitForTimeout(1800);await shot('4-place-card');
 R.walk=await p.evaluate(k=>{const d0=S.danh;Q.length=0;document.getElementById('modal').hidden=true;window.__tyCardK=k;goTo(k);render();return{place:S.place,danh:S.danh,lost:d0-S.danh,log:(S.logs||[])[0]}},R.out.k);
 await p.waitForTimeout(2000);await shot('5-out');
 /* 6. wear a robe again from Tư trang → normal picture */
 R.rewear=await p.evaluate(()=>{const i=(S.inv||[]).findIndex(e=>e&&wdItem(e)&&wdItem(e).sl==='y');if(i<0)return{none:1};wdWear(S,i);render();return{ty:tyOn(S),src:(document.getElementById('mefig')||{}).src||''}});
 /* 7. robbery: omen from an enemy, night, a lonely place */
 R.rob=await p.evaluate(()=>{S.place='home';S.visit={k:'home',people:homePeople(),talked:false,tk:{}};const v=liveRivals(true)[0];S.tyOmen={by:v.id,until:wk()+2};S.buoi=3;used=0;
  const odds=tyRobOdds('vuon');const ok=tyRob('vuon');render();return{odds,ok,ty:tyOn(S),place:S.place,card:(Q[0]||{}).t,danh:S.danh}});
 await p.waitForTimeout(2500);await shot('6-robbed');await clear();
 /* 8. omen card + Nội vụ phủ issue after N weeks (week tick) */
 R.week=await p.evaluate(()=>{S.tyNvp=wk();const n0=(S.inv||[]).length;tyWeek();return{inv:(S.inv||[]).length-n0,q:Q.map(x=>x.t)}});await p.waitForTimeout(1500);await shot('7-week');await clear();
 /* 9. NPC same rule (data) */
 R.npc=await p.evaluate(()=>{const v=liveRivals(true)[1];const w=wdOf(v);w.y=null;v.inv=[];S.where=S.where||{};S.where[v.id]='vuon';const d=v.danh;tyWeek();return{name:v.name,ty:tyOn(v),danh0:d,danh:v.danh,news:(S.news||[]).filter(n=>n.k==='ty').length}});
 R.hovf=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
 console.log(JSON.stringify({TAG,R,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
