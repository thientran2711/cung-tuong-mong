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
  const boot=()=>p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;for(let n=0;n<10;n++){localStorage.clear();window.__nlInner=1;start();window.__nlInner=0;if(!(typeof isSrv==="function"&&isSrv()))break}/* a consort life (a palace-maid life is checked once below) */Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
   for(const k of ["hd_dao","hd_lan"])if(WD_ITEMS[k])S.inv.push({k});S.toilette=null;save();try{render()}catch(e){}});
  const open=async()=>{await p.evaluate(()=>{try{kmReset()}catch(e){}document.querySelectorAll('.kmov,#kmrew,#kroul').forEach(e=>e.remove());try{kg82Close()}catch(e){}toilOpen();document.getElementById('toilrdy').click()});await p.waitForTimeout(1500)};
  for(const way of ['quick','moc','hand']){await boot();await p.waitForTimeout(600);await open();
   const srv=await p.evaluate(()=>typeof isSrv==="function"&&isSrv());
   if(srv){const r=await p.evaluate(()=>({tab:!!document.querySelector('#kg82 [data-kinvtab="hd"]'),slot:[...document.querySelectorAll('#kg82 .keqg .keql')].some(e=>/Hoa điền/.test(e.textContent))}));ok(!r.tab&&!r.slot,`${tag} ${way}: palace-maid life: no hoa điền slot / tab (art rule)`,r);continue}
   await p.click('#kg82 [data-kinvtab="hd"]');await p.waitForTimeout(300);
   const i=await p.evaluate(()=>{const o=KINV.reg.toil;const e=[...document.querySelectorAll('#kg82 .toilinv [data-kinvi]')].find(e=>{const it=o.items[+e.dataset.kinvi];return e.offsetParent&&it&&it.g&&it.g.k==="hd_lan"});return e?+e.dataset.kinvi:-1});
   if(i<0){ok(false,`${tag} ${way}: hoa điền in the chest tab`);continue}
   await p.click(`#kg82 .toilinv [data-kinvi="${i}"]`);await p.waitForTimeout(900);
   /* LIVE chest ring (jkring-item «Rương trang phục»): the tap opens the ring on that piece → its act «Dán» (real tap), then the ring closes back to the toilette */
   {const bs=await p.$$('button');let d=null;for(const x of bs){if(!(await x.isVisible().catch(()=>false)))continue;const t=((await x.textContent())||'').trim();if(/^Dán\b/.test(t)){d=x;break}}
    if(d){await d.click();await p.waitForTimeout(900);await p.evaluate(()=>{try{if(window.kitRingItem&&kitRingItem.close)kitRingItem.close()}catch(e){}});await p.waitForTimeout(900)}}
   const sl=await p.evaluate(()=>[...document.querySelectorAll('#kg82 .keqg [data-keqk="toil"]')].map(e=>e.getAttribute('title')||'').join('|'));
   ok(/Hoa điền/.test(sl)&&/lan/i.test(sl),`${tag} ${way}: the «Hoa điền» slot shows the picked one`,sl);
   await p.click('#toilok');await p.waitForTimeout(500);
   if(way==='quick'){await p.click('#toilquick');await p.waitForTimeout(400)}else if(way==='moc'){await p.click('#toilmoc');await p.waitForTimeout(400)}
   else{const r=await p.evaluate(()=>{let used=null;const o=hdBoard;hdBoard=function(x){used=x.k;hdBoard=o;return{stop(){}}};const ctx={C:null,G:null,file:"",box:document.createElement('div'),draw:()=>0,done:()=>0};
     /* behaviour, not text: the makeup step goes straight to the drag board with the PICKED hoa điền — no chooser buttons, no chooser ring */
     try{TOIL.st.parts=TOIL.st.parts||{};const took=hdStep(ctx);const ring=!!(window.kitRingItem&&kitRingItem.cur);const ch=took&&used===TOIL.st.hdk&&!ctx.box.querySelector('[data-hdk]')&&!ring;hdBoard=o;try{if(KG82.run&&KG82.run.stop)KG82.run.stop()}catch(e){}return{ch,k:TOIL.st.hdk,used,ring}}catch(e){hdBoard=o;return{err:String(e)}}});
     ok(r.ch&&r.k==="hd_lan",`${tag} hand: the makeup step places the picked hoa điền (no chooser)`,r);await p.evaluate(()=>toilFinish(false));await p.waitForTimeout(300)}
   const t=await p.evaluate(()=>({hd:S.toilette&&S.toilette.hd,shown:typeof hdShown==="function"?hdShown(S):null,lux:luxParts(S).hd}));
   if(way!=='hand')ok(t.hd&&t.hd.k==="hd_lan"&&typeof t.hd.q==="number",`${tag} ${way}: today's face keeps the picked hoa điền`,t)}
  ok(!errs.length,`${tag}: no page errors`,errs.slice(0,3));await p.close()}
 /* rules (one page) */
 const p=await (await b.newContext({viewport:{width:755,height:1000}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof tyRob==='function');await p.waitForTimeout(2000);
 const R=await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;for(let n=0;n<10;n++){localStorage.clear();window.__nlInner=1;start();window.__nlInner=0;if(!(typeof isSrv==="function"&&isSrv()))break}/* a consort life (a palace-maid life is checked once below) */Q.length=0;const o={};
  /* (3) merge */const kw=Object.keys(IT).find(k=>IT[k].sl==="waist"),ks=Object.keys(IT).find(k=>IT[k].sl==="scent");S.inv=S.inv.filter(e=>!(IT[e.k]&&["waist","scent"].includes(IT[e.k].sl)));
  S.inv.push({k:kw});wear(S,S.inv.length-1);S.inv.push({k:ks});wear(S,S.inv.length-1);o.mergeWear=S.inv.filter(e=>e.w&&IT[e.k]&&["waist","scent"].includes(IT[e.k].sl)).length;
  S.inv.forEach(e=>{if(IT[e.k]&&["waist","scent"].includes(IT[e.k].sl))e.w=1});wearMerge(S);o.mergeOld=S.inv.filter(e=>e.w&&IT[e.k]&&["waist","scent"].includes(IT[e.k].sl)).length;
  const v=rivals.find(x=>x&&x.alive!==false);if(v){v.inv=v.inv||[];v.inv.push({k:kw,w:1},{k:ks,w:1});wearMerge(v);o.mergeNpc=v.inv.filter(e=>e.w&&IT[e.k]&&["waist","scent"].includes(IT[e.k].sl)).length}
  /* (5) strip = an enemy's CHOICE only (MAIN 161 ruling ~18:40Z) */S.buoi=3;const k0="ngự hoa viên";const save0=window.curPeople;window.curPeople=()=>[];S.tyOmen=null;o.noPlot=tyRobOdds(k0,0);
  const en=rivals.find(x=>x&&x.alive!==false&&!x.out);let inEnemy=0,home=0,dup=0;
  for(let i=0;i<20;i++){const w=wdOf(S);if(!w.y){const k=earnPlainY(S);if(k&&(S.inv||[]).some(e=>e&&!e.h&&e.k===k))dup++;if(!k){const i=S.inv.findIndex(e=>e&&!e.h&&WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==="y");if(i>=0)wdWear(S,i)}else w.y={k,src:"nvp",nvp:1}}if(!wdOf(S).y)break;const rk=w.y.k;const nS=(S.inv||[]).filter(e=>e&&e.k===rk).length,nE=(en.inv||[]).filter(e=>e&&e.k===rk).length;S.tyOmen={by:en.id,until:wk()+2};o.plot=tyRobOdds(k0,0);tyRob(k0);
   if((en.inv||[]).filter(e=>e&&e.k===rk).length>nE)inEnemy++;if((S.inv||[]).filter(e=>e&&e.k===rk).length>nS)home++;Q.length=0}
  o.inEnemy=inEnemy;o.robHome=home;o.reissueDup=dup;
  /* two-way: her act */const t=rivals.find(x=>x&&x.alive!==false&&!x.out&&x!==en&&wdOf(x).y)||en;const ty=(wdOf(t).y||{}).k;S.bac=500;const save1=window.caught;window.caught=()=>"";const r0=window.aRoll;window.aRoll=()=>true;
  o.actOk=!!(ACT.tyrob&&ACT.tyrob.ok(S,t)&&ACT.tyrobl);let txt="";try{txt=ACT.tyrob.f(S,t)}catch(e){txt="ERR "+e}window.caught=save1;window.aRoll=r0;
  o.act={txt:String(txt).replace(/<[^>]+>/g,""),mine:(S.inv||[]).some(e=>e&&e.k===ty),tTy:tyOn(t),lack:LACK.tyrob(t)};
  /* n1 (law 1 parity): NPC schemes «nặng» include tyrob; an NPC on an NPC = the robe moves now; an NPC on HER = the omen plot (her real risk), then the robe goes into THAT NPC's chest */
  o.bands=BANDS[2][2].includes("tyrob");o.robThug=("robThug" in BAL.ty);
  const nA=rivals.find(x=>x&&x.alive!==false&&!x.out&&x!==t&&x!==en)||en,nT=rivals.find(x=>x&&x.alive!==false&&!x.out&&x!==nA&&wdOf(x).y&&!tyOn(x));
  if(nA&&nT){nA.bac=500;const k2=(wdOf(nT).y||{}).k;window.caught=()=>"";window.aRoll=()=>true;try{ACT.tyrob.f(nA,nT)}catch(e){o.npcErr=String(e)}window.caught=save1;window.aRoll=r0;o.npcNpc={inA:(nA.inv||[]).some(e=>e&&e.k===k2),tTy:tyOn(nT)}}
  S.tyOmen=null;Q.length=0;nA.bac=500;window.caught=()=>"";let rS="";try{rS=ACT.tyrob.f(nA,S)}catch(e){rS="ERR "+e}window.caught=save1;
  const om=S.tyOmen&&S.tyOmen.by===nA.id,card=Q.some(m=>m&&m.t==="Điềm báo");let w0=wdOf(S);if(!w0.y){const k=earnPlainY(S);if(k)w0.y={k,src:"nvp",nvp:1}}const rk2=(wdOf(S).y||{}).k;const n0=(nA.inv||[]).filter(e=>e&&e.k===rk2).length;
  S.buoi=3;window.curPeople=()=>[];const odds=tyRobOdds(k0,0);tyRob(k0);window.curPeople=save0;o.npcHer={omen:om,card,odds,robeInA:(nA.inv||[]).filter(e=>e&&e.k===rk2).length>n0,txt:String(rS).replace(/<[^>]+>/g,"")};Q.length=0;window.curPeople=save0;
  /* (6) maid road */S.tyRobW=null;S.tyOmen=null;const O=eitReOpts(true);const m=O.find(x=>/^Sai /.test(x.n));o.maid=m?{fx:m.fx,x:m.x}:null;window.curPeople=save0;return o});
 ok(R.mergeWear===1,'(3) wear(): Ngọc bội + Túi thơm = one Đeo eo slot (one worn)',R.mergeWear);ok(R.mergeOld===1,'(3) old save with both worn → one after wearMerge',R.mergeOld);ok(R.mergeNpc===1,'(3) NPC: the same rule',R.mergeNpc);
 ok(R.noPlot===0,'(5) no enemy plot → no robbery at night in a lonely place (no random thug)',R.noPlot);ok(R.plot>0,'(5) an enemy who chose it (omen plot) → the risk is real',R.plot);
 ok(R.inEnemy===20&&R.robHome===0,'(5) the robbed robe goes into THAT enemy\'s chest (20/20), never back into hers',{inEnemy:R.inEnemy,home:R.robHome});ok(R.reissueDup===0,'(5) a reissued robe is never a copy of one she owns',R.reissueDup);
 ok(R.actOk&&R.act.mine&&R.act.tTy,'(5) two-way: her «Thuê người giật y phục» puts the target\'s robe in HER chest, the target in trung y',R.act);
 ok(R.bands&&!R.robThug,'(5 n1) NPC schemes «nặng» include tyrob; BAL.ty.robThug gone',{bands:R.bands,robThug:R.robThug});
 ok(R.npcNpc&&R.npcNpc.inA&&R.npcNpc.tTy,'(5 n1) NPC → NPC «Thuê người giật y phục»: robe into the actor\'s chest, target in trung y',R.npcNpc||R.npcErr);
 ok(R.npcHer&&R.npcHer.omen&&R.npcHer.card&&R.npcHer.odds>0&&R.npcHer.robeInA,'(5 n1) NPC → her: omen card + real risk on her night walk, then the robe goes into THAT NPC\'s chest',R.npcHer);
 ok(R.maid&&R.maid.fx&&R.maid.fx.danh<0&&!R.maid.fx.suc&&/khắc/.test(R.maid.x),'(6) maid road: Danh + 2-khắc wait, no Sức',R.maid);ok(!errs.length,'rules page: no page errors',errs.slice(0,3));
 const n=res.filter(x=>x).length;console.log(res.every(x=>x)?`PASS ${n}`:`FAIL ${res.length-n}/${res.length}`);await b.close()})();
