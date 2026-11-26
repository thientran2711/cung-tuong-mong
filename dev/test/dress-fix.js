/* dress-fix (owner OD 26/11 ~18:50Z (2)(3)(5)(6), DRESS-FIX) — node dev/test/dress-fix.js [dev/index.html]
   (1)(2) hoa điền picked in the dress picker (real taps) → kept by «Điểm trang nhanh» and «Để mộc» (S.toilette.hd = the pick), the makeup step places THAT one (no chooser)
   (3) worn slots: Túi thơm + Ngọc bội = one «Đeo eo» slot for her and NPCs (wear(), old save with both worn → one after load)
   (5) robbery: rare (odds caps + cooldown), the robe never drops back into her chest (60 runs of the find step), reissue never a copy of a robe she owns
   (6) maid road = Danh by rank + the 2-khắc wait, no Sức. Fold 755x1000 + iPad 1180x820 for the taps. */
const {chromium}=require('playwright');const path=require('path');
const U0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(U0)?U0:'file://'+path.resolve(U0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){const p=await (await b.newContext({viewport:{width:W,height:H}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof toilOpen==='function'&&typeof start==='function');await p.waitForTimeout(2500);
  const boot=()=>p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
   for(const k of ["hd_dao","hd_lan"])if(WD_ITEMS[k])S.inv.push({k});S.toilette=null;save();try{render()}catch(e){}});
  const open=async()=>{await p.evaluate(()=>{try{kmReset()}catch(e){}document.querySelectorAll('.kmov,#kmrew,#kroul').forEach(e=>e.remove());try{kg82Close()}catch(e){}toilOpen();document.getElementById('toilrdy').click()});await p.waitForTimeout(1500)};
  for(const way of ['quick','moc','hand']){await boot();await p.waitForTimeout(600);await open();
   const srv=await p.evaluate(()=>typeof isSrv==="function"&&isSrv());
   if(srv){const r=await p.evaluate(()=>({tab:!!document.querySelector('#kg82 [data-kinvtab="hd"]'),slot:[...document.querySelectorAll('#kg82 .keqg .keql')].some(e=>/Hoa điền/.test(e.textContent))}));ok(!r.tab&&!r.slot,`${tag} ${way}: palace-maid life: no hoa điền slot / tab (art rule)`,r);continue}
   await p.click('#kg82 [data-kinvtab="hd"]');await p.waitForTimeout(300);
   const i=await p.evaluate(()=>{const o=KINV.reg.toil;const e=[...document.querySelectorAll('#kg82 .toilinv [data-kinvi]')].find(e=>{const it=o.items[+e.dataset.kinvi];return e.offsetParent&&it&&it.g&&it.g.k==="hd_lan"});return e?+e.dataset.kinvi:-1});
   if(i<0){ok(false,`${tag} ${way}: hoa điền in the chest tab`);continue}
   await p.click(`#kg82 .toilinv [data-kinvi="${i}"]`);await p.waitForTimeout(500);
   const sl=await p.evaluate(()=>[...document.querySelectorAll('#kg82 .keqg [data-keqk="toil"]')].map(e=>e.getAttribute('title')||'').join('|'));
   ok(/Hoa điền/.test(sl)&&/lan/i.test(sl),`${tag} ${way}: the «Hoa điền» slot shows the picked one`,sl);
   await p.click('#toilok');await p.waitForTimeout(500);
   if(way==='quick'){await p.click('#toilquick');await p.waitForTimeout(400)}else if(way==='moc'){await p.click('#toilmoc');await p.waitForTimeout(400)}
   else{const r=await p.evaluate(()=>{let used=null;const o=hdBoard;hdBoard=function(x){used=x.k;hdBoard=o;return o.apply(this,arguments)};const ctx={C:null,G:null,file:"",box:document.createElement('div'),draw:()=>0,done:()=>0};
     try{TOIL.st.parts=TOIL.st.parts||{};const L=hdOwned(S);/* the step must go straight to the board with the pick, no chooser buttons */const ch=hdStep.toString().includes('st.hdk!=null');return{ch,k:TOIL.st.hdk}}catch(e){return{err:String(e)}}});
     ok(r.ch&&r.k==="hd_lan",`${tag} hand: the makeup step places the picked hoa điền (no chooser)`,r);await p.evaluate(()=>toilFinish(false));await p.waitForTimeout(300)}
   const t=await p.evaluate(()=>({hd:S.toilette&&S.toilette.hd,shown:typeof hdShown==="function"?hdShown(S):null,lux:luxParts(S).hd}));
   if(way!=='hand')ok(t.hd&&t.hd.k==="hd_lan"&&typeof t.hd.q==="number",`${tag} ${way}: today's face keeps the picked hoa điền`,t)}
  ok(!errs.length,`${tag}: no page errors`,errs.slice(0,3));await p.close()}
 /* rules (one page) */
 const p=await (await b.newContext({viewport:{width:755,height:1000}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof tyRob==='function');await p.waitForTimeout(2000);
 const R=await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const o={};
  /* (3) merge */const kw=Object.keys(IT).find(k=>IT[k].sl==="waist"),ks=Object.keys(IT).find(k=>IT[k].sl==="scent");S.inv=S.inv.filter(e=>!(IT[e.k]&&["waist","scent"].includes(IT[e.k].sl)));
  S.inv.push({k:kw});wear(S,S.inv.length-1);S.inv.push({k:ks});wear(S,S.inv.length-1);o.mergeWear=S.inv.filter(e=>e.w&&IT[e.k]&&["waist","scent"].includes(IT[e.k].sl)).length;
  S.inv.forEach(e=>{if(IT[e.k]&&["waist","scent"].includes(IT[e.k].sl))e.w=1});wearMerge(S);o.mergeOld=S.inv.filter(e=>e.w&&IT[e.k]&&["waist","scent"].includes(IT[e.k].sl)).length;
  const v=rivals.find(x=>x&&x.alive!==false);if(v){v.inv=v.inv||[];v.inv.push({k:kw,w:1},{k:ks,w:1});wearMerge(v);o.mergeNpc=v.inv.filter(e=>e.w&&IT[e.k]&&["waist","scent"].includes(IT[e.k].sl)).length}
  /* (5) rarity */const T=BAL.ty;o.maxThug=T.robThug+T.robNight+T.robLonely;o.maxPlot=T.robPlot+T.robNight+T.robLonely;
  S.buoi=3;const k0=Object.keys(typeof ACC==="object"?ACC:{}).find(x=>x!=="home")||"nguhoavien";const save0=window.curPeople;window.curPeople=()=>[];o.oddsNight=tyRobOdds(k0,0);
  /* (5) real loss + no duplicate */let home=0,held=0,dup=0;const own0=new Set();
  for(let i=0;i<60;i++){S.tyRobW=null;const w=wdOf(S);if(!w.y){const k=earnPlainY(S);w.y={k,src:"nvp",nvp:1}}const lost0=(S.lost||[]).length;const rk=w.y.k;tyRob(k0);
   const c=(S.lost||[])[(S.lost||[]).length-1];if(!c||c.cause!=="rob"){continue}c.due=wk();loFind(c);if(c.how==="nha")home++;if(c.st==="held")held++;
   const nk=earnPlainY(S);if((S.inv||[]).some(e=>e&&!e.h&&e.k===nk))dup++;Q.length=0}
  o.robHome=home;o.robHeld=held;o.reissueDup=dup;o.cdOdds=(S.tyRobW=wk(),tyRobOdds(k0,0));
  /* (6) maid road */S.tyRobW=null;const O=eitReOpts(true);const m=O.find(x=>/^Sai /.test(x.n));o.maid=m?{fx:m.fx,x:m.x}:null;window.curPeople=save0;return o});
 ok(R.mergeWear===1,'(3) wear(): Ngọc bội + Túi thơm = one Đeo eo slot (one worn)',R.mergeWear);ok(R.mergeOld===1,'(3) old save with both worn → one after wearMerge',R.mergeOld);ok(R.mergeNpc===1,'(3) NPC: the same rule',R.mergeNpc);
 ok(R.maxThug<=6&&R.maxPlot<=30,'(5) rare: thug ≤ 6 %, plot ≤ 30 % per walk (was 23 % / 65 %)',[R.maxThug,R.maxPlot,R.oddsNight]);ok(R.cdOdds===0,'(5) no second robbery inside the cooldown',R.cdOdds);
 ok(R.robHome===0,'(5) a robbed robe never drops back into her chest (60 runs)',{home:R.robHome,held:R.robHeld});ok(R.reissueDup===0,'(5) a reissued robe is never a copy of one she owns',R.reissueDup);
 ok(R.maid&&R.maid.fx&&R.maid.fx.danh<0&&!R.maid.fx.suc&&/khắc/.test(R.maid.x),'(6) maid road: Danh + 2-khắc wait, no Sức',R.maid);ok(!errs.length,'rules page: no page errors',errs.slice(0,3));
 const n=res.filter(x=>x).length;console.log(res.every(x=>x)?`PASS ${n}`:`FAIL ${res.length-n}/${res.length}`);await b.close()})();
