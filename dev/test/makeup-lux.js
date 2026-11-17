/* review/makeup-lux (owner 17/11 ~15:35Z, OD L1638): five makeup levels (Diêm dúa dropped, Khuynh thành = max), each level's beauty points +
   xa xỉ from BAL.toil.lv shown with kit chips, the makeup level's xa xỉ inside the ONE luxury total (luxOf) at events only (month tick = clothes),
   "diêm dúa" = the word for a total far above the occasion (BAL.lux.diem), per-person liked LEVEL (jmkt taste), Hội phối đồ counts the face,
   NPC + co-op friend the same way, an old save holding the dropped level.
   usage: node dev/test/makeup-lux.js <url of dev/index.html> <WxH@dpr> <shotdir>   (prints JSON; exit 1 on a failed check) */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');
const [,,URL,VP,DIR]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@2');const W=+m[1],H=+m[2],DPR=+m[3];const tag=`${W}x${H}`;
fs.mkdirSync(DIR,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,serviceWorkers:'block'});await ctx.route(u=>/ctmload=1|x-ctm-load/.test(String(u)),r=>r.abort());const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(180000);const out={vp:VP},fail=[];const ck=(k,ok,v)=>{out[k]=v;if(!ok)fail.push(k);console.error('ck',k,ok?'ok':'FAIL',JSON.stringify(v).slice(0,300))};
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true})});
 for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:120000});
  const ok=await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()&&!S.out&&S.rank<7);if(ok)break}
 await require('./lib/roulette').dismissRoulette(p);await p.waitForTimeout(1200);
 await p.evaluate(()=>{const k=document.getElementById('kroul');if(k)k.remove();Q.length=0;try{closeModal()}catch(e){}S.suc=90;S.bac=200;render()});
 /* 1. five levels, one table, Khuynh thành the max */
 const L=await p.evaluate(()=>({lvs:TOIL_LVS,mk:TOIL_MK,lv:BAL.toil.lv,base:BAL.toil.lvBase,chips:toilLvChips("tuyet"),rows:toilLvRows().length,old:TOIL_OLDLV}));
 const lvOk=L.lvs.join()==="moc,vung,vua,dep,tuyet"&&!("diem" in L.mk)&&L.lvs.every((k,i)=>typeof L.lv[k].dep==="number"&&typeof L.lv[k].lux==="number"&&(i===0||(L.lv[k].dep>L.lv[L.lvs[i-1]].dep&&L.lv[k].lux>=L.lv[L.lvs[i-1]].lux)));
 ck('levels',lvOk&&L.old.diem==="tuyet",L);
 ck('chips',L.chips.includes(`Dung nhan ${L.lv.tuyet.dep}`)&&L.chips.includes(`Xa xỉ <b>${L.lv.tuyet.lux}</b>`)&&/class="kchip/.test(L.chips)&&L.rows===5,L.chips);
 /* 2. the ONE total: luxOf = clothes + jewels + pet + today's level; the month tick passes noMk */
 const T=await p.evaluate(()=>{const o={};for(const k of TOIL_LVS){S.toilette={day:toilWk()*10,wk:toilWk(),score:k==="tuyet"?92:k==="dep"?75:k==="vua"?50:20,makeup:k!=="moc",style:"fit",dv:"hopdip",F:1,occ:["th"],look:k==="vung"?"vung":k==="vua"?null:k==="moc"?null:k};
   o[k]=luxOf(S).sc-luxOf(S,{noMk:1}).sc}S.toilette=null;o.none=luxOf(S).sc-luxOf(S,{noMk:1}).sc;return o});
 ck('luxTotal',TOIL_ok(T),T);function TOIL_ok(T){return T.moc===0&&T.none===0&&T.vung===L.lv.vung.lux&&T.vua===L.lv.vua.lux&&T.dep===L.lv.dep.lux&&T.tuyet===L.lv.tuyet.lux}
 /* NPC (raw roll, no recursion) and the co-op friend (her own synced sitting) the same way */
 const N=await p.evaluate(()=>{const R=liveRivals(true).filter(v=>!v.out).slice(0,8).map(v=>{const r=TOIL_NPC0(v);const want=r.makeup?BAL.toil.lv[toilMk(r)].lux:0;return{n:v.name,mk:toilMk(r),d:luxOf(v).sc-luxOf(v,{noMk:1}).sc,want,dv:toilNpc(v).dv}});
  const v=liveRivals(true).find(v=>!v.out);const c0=v.coop,t0=v.toilette;v.coop=true;v.toilette={wk:toilWk(),makeup:true,score:92,look:"tuyet"};const f=luxOf(v).sc-luxOf(v,{noMk:1}).sc;v.toilette={wk:toilWk(),makeup:false,score:0};const f0=luxOf(v).sc-luxOf(v,{noMk:1}).sc;v.coop=c0;v.toilette=t0;return{R,f,f0}});
 ck('npcFriend',N.R.length>0&&N.R.every(x=>x.d===x.want)&&N.f===L.lv.tuyet.lux&&N.f0===0,N);
 /* 3. "diêm dúa" = the total far above the occasion: photruong just above, diem above hi × BAL.lux.diem; the host reacts with its diem row */
 const D=await p.evaluate(()=>{const a0=luxAllow;const res={};try{S.toilette={day:toilWk()*10,wk:toilWk(),score:92,makeup:true,style:"fit",dv:"hopdip",F:1,occ:["th"],look:"tuyet"};S.toilSeen=null;
   const tot=luxOf(S).sc;const R=luxRange(S,1,"th");for(const [k,r] of [["fit",.8*R.fit[1]],["show",(R.hi*(1+BAL.lux.diem)/2)],["diem",R.hi*BAL.lux.diem*1.2]]){const bud=Math.max(1,Math.round(tot/r));luxAllow=()=>bud;
    const V=luxVerdict(S,1,"th");S.toilSeen=null;const fx=toilFx(S,"th",1,"ok");res[k]={bud,tot,v:V.v,word:V.word,mk:V.mk,why:fx&&fx.why.map(w=>w[0]+" "+w[1])}}
   /* month tick: the face does not count — with the "diem" allowance the clothes alone stay inside */
   const bud=Math.max(1,Math.round(tot/(R.hi*BAL.lux.diem*1.2)));luxAllow=()=>bud;res.month={withMk:luxOf(S).lv,noMk:luxOf(S,{noMk:1}).lv,clothes:luxOf(S,{noMk:1}).sc}}finally{luxAllow=a0}return res});
 ck('diemWord',D.show.v==="photruong"&&D.diem.v==="diem"&&D.diem.word==="diêm dúa"&&D.diem.mk===L.lv.tuyet.lux&&(D.diem.why||[]).some(w=>/diêm dúa/.test(w)&&/son phấn/.test(w)),D);
 /* 4. old save: a stored "diem" face loads as Khuynh thành (one map), its xa xỉ is Khuynh thành's */
 const O=await p.evaluate(()=>{const raw=JSON.parse(JSON.stringify(ser()));raw.S.toilette={day:toilWk()*10,wk:toilWk(),score:72,makeup:true,style:"showy",dv:"hopdip",F:1,occ:["th"],look:"diem",col:{mat:"hongmai",ma:"yenchi",son:"dotham",may:"den",want:"diem",seed:3}};
  let ok=true,err="";try{deser(raw);render()}catch(e){ok=false;err=String(e)}const c=toilChip();return{ok,err,mk:toilMk(S.toilette),face:toilLookRec(S.toilette),chip:c&&c.full,d:luxOf(S).sc-luxOf(S,{noMk:1}).sc}});
 ck('oldSave',O.ok&&O.mk==="tuyet"&&O.face==="tuyet"&&/Khuynh thành/.test(O.chip||"")&&O.d===L.lv.tuyet.lux,O);
 /* 5. Hội phối đồ: the face's xa xỉ joins the outfit total; the level's contest points = dep − lvBase (bare face = pts.moc) */
 const C=await p.evaluate(()=>{const f={makeup:true,score:92,look:"tuyet",col:{}};const a=tsDressPts(S,{},"phu"),b=tsDressPts(S,{},"phu",f);const w=tsMkWant("phu",4);
  const pts={};for(const k of TOIL_LVS){const r=k==="moc"?{makeup:false}:{makeup:true,score:k==="tuyet"?92:k==="dep"?75:k==="vua"?50:20,look:k==="vung"?"vung":k==="vua"?null:k,col:{}};pts[k]=tsMkPts(r,w);}
  return{d:b.lux-a.lux,mkLux:b.mkLux,lvPts:Object.fromEntries(TOIL_LVS.filter(k=>k!=="moc").map(k=>[k,BAL.toil.lv[k].dep-BAL.toil.lvBase])),moc:pts.moc.pts,vung:pts.vung.pts,mocKey:BAL.toil.taste.pts.moc}});
 ck('contest',C.d===L.lv.tuyet.lux&&C.mkLux===L.lv.tuyet.lux&&C.moc===C.mocKey&&C.vung===C.lvPts.vung,C);
 /* 6. per-person liked LEVEL: by nết, else hash; liked = +, two steps away = −; known → on the card; the Emperor's likes row exists */
 const K=await p.evaluate(()=>{const B=BAL.toil.taste;S.toilette={day:toilWk()*10,wk:toilWk(),score:92,makeup:true,style:"fit",dv:"hopdip",F:1,occ:["th"],look:"tuyet"};
  const v=liveRivals(true).find(v=>!v.out&&!v.queen);const t0=traitsOf;let tr=["Kiêu ngạo"];traitsOf=x=>x===v?tr:t0(x);let likeA,nA,likeB,nB,fx;
  try{likeA=toilLvTasteOf(v);nA=toilLvTasteN(S,v);tr=["Khiêm nhường"];likeB=toilLvTasteOf(v);nB=toilLvTasteN(S,v);
  S.mkKnow=S.mkKnow||{p:{},th:{}};S.mkKnow.lv={};S.mkKnow.lv[toilTasteKey(v)]=1;tr=["Kiêu ngạo"];S.toilSeen=null;fx=toilFx(S,v,0,"ok")}finally{traitsOf=t0}
  const ids=[];for(const h of liveRivals(true).slice(0,10))ids.push(toilLvTasteOf(h));const E=S.emp;delete (E.likes||{}).mkLv;E.known=E.known||{};delete E.known.mkLv;for(let i=0;i<60&&!E.known.mkLv;i++){try{discover()}catch(e){}}/* whenever "Nói thật lòng" reveals the row, the like exists */
  return{likeA,nA,likeB,nB,fx:fx&&fx.why,ids,emp:E.likes&&E.likes.mkLv,empLv:toilLvTasteOf("emp"),row:LIKEN.mkLv}});
 ck('lvTaste',K.likeA==="tuyet"&&K.nA===BAL_lvReact(0)&&K.likeB==="vua"&&K.nB===BAL_lvReact(1)&&(K.fx||[]).some(w=>/dung nhan Khuynh thành/.test(w[0]))&&!!K.emp&&!!K.empLv&&K.ids.every(x=>x===""||["vua","dep","tuyet"].includes(x)),K);
 function BAL_lvReact(i){return [1,-1][i]}
 /* 7. the screens: the mirror ladder (five levels, two chips each) and a made result with its level row + the day's total */
 await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}S.toilette=null;S.buoi=0;toilOpen()});await p.waitForTimeout(1200);
 for(let i=0;i<4&&!(await p.$('#kg82 .toilw .kgr'));i++){const b2=await p.$('#kg82 .kg82act button');if(b2)await b2.click().catch(()=>{});await p.waitForTimeout(1200)}
 const lad=await p.evaluate(()=>{const g=document.querySelector('#kg82 .toilw .kgr');return g?{t:g.textContent,chips:g.querySelectorAll('.kchip').length}:null});
 ck('ladder',lad&&lad.chips===10&&/Khuynh thành/.test(lad.t)&&!/Diêm dúa/.test(lad.t),lad);
 await p.screenshot({path:`${DIR}/mlux-${tag}-1-ladder.jpg`,quality:72});
 await p.evaluate(()=>{const st=TOIL.st;st.parts={brow:.97,powder:.97,son:.97};toilFinish(true)});await p.waitForTimeout(1500);
 for(let i=0;i<6&&await p.$('.ktrv');i++){if(await p.$('.ktrv-ov>.kmend'))await p.click('.ktrv-ov>.kmend').catch(()=>{});else await p.evaluate(()=>{const o=document.querySelector('.ktrv-ov');o&&o.click()});await p.waitForTimeout(900)}
 await require('./lib/roulette').clearMoments(p);await p.waitForSelector('#toildone');
 const res=await p.evaluate(()=>document.querySelector('#kg82').textContent.replace(/\s+/g," "));ck('result',/Mức điểm trang/.test(res)&&/Dung nhan \d/.test(res)&&/Cả bộ hôm nay/.test(res)&&/Xa xỉ \d/.test(res),res.slice(0,400));
 await p.screenshot({path:`${DIR}/mlux-${tag}-2-result.jpg`,quality:72});await p.click('#toildone');await p.waitForTimeout(800);
 /* 8. one event result: Thỉnh an Thái hậu with the day's look judged (the Vì sao / reaction names the total) */
 const ev=await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}S.toilSeen=null;const a0=luxAllow;const tot=luxOf(S).sc;const R=luxRange(S,1,"th");const bud=Math.max(1,Math.round(tot/(R.hi*BAL.lux.diem*1.2)));window.__a0=a0;luxAllow=()=>bud;
  const o=talkOpts({kind:'th'}).find(a=>/^Thỉnh an/.test(a.n));if(!o)return null;try{if(o.run)o.run();else o.go()}catch(e){return String(e)}render();try{showModal()}catch(e){}return{n:o.n,x:o.x||"",risk:o.risk||""}});
 await p.waitForTimeout(1500);const evt=await p.evaluate(()=>{const t=[...document.querySelectorAll('.dlg,.kpop,.ktrp,#toilpop,.krc')].map(e=>e.textContent).join(" ").replace(/\s+/g," ");luxAllow=window.__a0;return t.slice(0,600)});
 ck('event',!!ev&&errs.length===0,{ev,evt});
 await p.screenshot({path:`${DIR}/mlux-${tag}-3-event.jpg`,quality:72});
 out.errs=errs;if(errs.length)fail.push('pageerror');out.fail=fail;console.log(JSON.stringify(out,null,1));await b.close();process.exit(fail.length?1:0)})();
