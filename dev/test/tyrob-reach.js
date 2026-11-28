/* tyrob-reach (dress-fix-df; MAIN 177 + RV-163F law-1 gap: with ACT-MOVE «Giật y phục» was in no BAL.df list / door → she could not reach it)
   node dev/test/tyrob-reach.js [dev/index.html] [shotdir]
   Design (act-move OD 27/11 ~00:32–00:54Z + door-onetap ~01:12Z): «Giật y phục» = a remote «sai người» way → BAL.df.either (her pop-up AND her palace),
   member of door P10 «Lấy của»; its tier is READ from BAL.charge (deed uh, like «Lấy đồ»; split-merge P3). P10 is a HARM tier door: the tier button runs ONE member of that tier, equal chance among its real outcomes
   (seeded per target + buổi + door). Robot, Fold 755x1000 + iPad 1180x820, real taps: at the consort's palace (her pop-up or chest) and where she is,
   tap «Lấy của · <tier>» (new seed each try) until the game picks «Giật y phục» (ONE.last), let the sent servant come back (ptime), and check the result:
   the consort's robe is in HER chest and the consort walks in trung y. The act's own roll / caught are pinned to «thành», not caught (test only). */
const {chromium}=require('playwright');const path=require('path');
const U0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(U0)?U0:'file://'+path.resolve(U0);const SHOT=process.argv[3]||'';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const p=await (await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:SHOT?2:1,serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof doorOpen==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{for(let n=0;n<10;n++){localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;if(!(typeof isSrv==="function"&&isSrv()))break}});await p.waitForTimeout(7000);
  await p.evaluate(()=>{try{kmReset()}catch(e){}document.querySelectorAll('.kmov,#kmrew,#kroul').forEach(e=>e.parentNode&&e.parentNode.removeChild(e));Q.splice(0);try{closeModal()}catch(e){}
   window.__pin=[window.aRoll,window.caught];window.aRoll=()=>true;window.caught=()=>""});
  const lists=await p.evaluate(()=>({either:BAL.df.either.includes("tyrob"),door:(DOOR.T.find(r=>r.k==="P10")||{acts:{a:[]}}).acts.a.includes("tyrob"),tier:(DOOR.T.find(r=>r.k==="P10")||{tiers:{}}).tiers["a:tyrob"]}));
  const fam=await p.evaluate(()=>(DOOR.T.find(r=>r.k==="P10")||{tiers:{}}).tiers["a:laydo"]);const TIER=lists.tier;
  ok(lists.either&&lists.door&&!!TIER&&TIER===fam,`${tag}: «Giật y phục» bound — BAL.df.either + door P10 «Lấy của», tier read from BAL.charge (= «Lấy đồ» family: ${fam})`,Object.assign({fam},lists));
  for(const where of ['palace']){let done=false;for(let att=0;att<3&&!done;att++){/* a real refusal (her maid kneels and refuses, someone saw) is a true outcome: try again */
   let got=null,tries=0,seen={};
   for(;tries<40&&!got;tries++){
    const st=await p.evaluate(([w,t,TIER])=>{Q.splice(0);try{document.getElementById('modal').hidden=true}catch(e){}try{const Z=ptZ();Z.splice(0)}catch(e){}
     const v=rivals.find(x=>x&&x.alive&&!x.out&&!sameHouse(S,x)&&(typeof k61Named!=="function"||k61Named(x)));if(!v)return {none:1};
     if(!wdOf(v).y||tyOn(v)){const k0=earnPlainY(v);if(k0)wdOf(v).y={k:k0,src:"nvp",nvp:1}}/* fixture: the earlier case robbed her — a robe on again */
     const k=w==='palace'?palaceOf(v):whereOf(v);S.turn=(S.turn||0)+1;S.buoi=t%3;used=0;S.confined=0;popIdx=null;S.bac=Math.max(S.bac||0,300);S.suc=Math.max(S.suc||0,80);
     window.__j77etq=1;window.__accStay=1;try{goTo(k)}finally{window.__j77etq=0;window.__accStay=0}tab="act";try{render()}catch(e){}
     const i=curPeople().findIndex(x=>x.ref===v&&(w==='palace'||x.kind!=="chest"));if(i<0)return {name:v.name,k,miss:1};
     Q.splice(0);try{document.getElementById('modal').hidden=true}catch(e){}try{if(typeof kitFocus==='object'&&kitFocus.close)kitFocus.close()}catch(e){}
     /* look ahead WITHOUT acting: the turn whose seeded equal-chance pick of its tier is «Giật y phục» (ONE.tierRows = what the tap will run) */
     const R=DOOR.T.find(r=>r.k==="P10");let found=-1;const t0=S.turn||0;for(let d=0;d<60&&found<0;d++){S.turn=t0+d;try{const rows=ONE.tierRows(R,DOOR.more(curPeople()[i],R),v.id);const row=rows.find(x=>x.t===TIER);if(row&&row.m&&row.m.id==="a:tyrob")found=d}catch(e){}}
     if(found<0)return {name:v.name,k,nofit:1};
     window.__tv=v;window.__robe=(wdOf(v).y||{}).k;doorOpen(curPeople()[i],'P10');try{showModal()}catch(e){}return {name:v.name,k,kind:curPeople()[i].kind}},[where,tries,TIER]);
    if(st.none){ok(false,`${tag} ${where}: a consort with a robe to stand by`,st);break}
    if(st.miss||st.nofit){seen[st.miss?"miss":"nofit"]=(seen[st.miss?"miss":"nofit"]||0)+1;continue}
    await p.waitForTimeout(600);
    const bt=await p.$$('#modal button:not([disabled])');let tier=null;for(const x of bt){if(!(await x.isVisible()))continue;if(((await x.textContent())||'').includes('Lấy của · '+TIER))tier=x}
    if(!tier){seen.noTier=(seen.noTier||0)+1;continue}
    if(SHOT&&!seen.shot){seen.shot=1;await p.screenshot({path:path.join(SHOT,`tyrob-door-${where}-${tag}.png`)})}
    const line=((await tier.textContent())||'');if(/Giật y phục/.test(line))seen.listed=(seen.listed||0)+1;/* the card names its real outcomes («ra một trong: …») */
    await p.evaluate(()=>{window.ONE&&(ONE.last=null)});await tier.click();await p.waitForTimeout(700);
    /* the hanging tier card (kit pick) may only raise on the first tap: then the tap event on the card itself chooses it */
    if(await p.evaluate(()=>!(window.ONE&&ONE.last))){try{await tier.evaluate(e=>e.click());await p.waitForTimeout(700)}catch(e){}}
    const last=await p.evaluate(()=>window.ONE&&ONE.last?ONE.last.id||ONE.last.n:"");seen[last]=(seen[last]||0)+1;
    if(/tyrob|Giật y phục/.test(last))got=st}
   ok(!!got,`${tag} ${where}: tapping «Lấy của · ${TIER}» can land on «Giật y phục» (equal-chance tier member)`,{tries,seen});
   if(!got)continue;
   const r=await p.evaluate(async()=>{const v0=window.__tv;for(let n=0;n<6&&!tyOn(v0);n++){try{ptZ().forEach(a=>a.due=0);window.ptBusyTick=false;ptTick()}catch(e){}await new Promise(r=>setTimeout(r,300));for(let k=0;k<4;k++){try{if(Q.length)closeModal()}catch(e){}}}const v=window.__tv;
    return {z:(()=>{try{return ptZ().map(a=>a.kind+":"+a.back+":"+(a.a&&a.a.run||""))}catch(e){return String(e)}})(),lg:((S.logs||[]).slice(0,4).map(x=>String(x.t||x.h||x).replace(/<[^>]+>/g,"").slice(0,90))),mine:(S.inv||[]).some(e=>e&&e.k===window.__robe),inV:(v.inv||[]).some(e=>e&&e.k===window.__robe),tTy:tyOn(v)}});
   const refused=!(r.mine&&r.tTy)&&(r.lg||[]).some(x=>/quỳ xin|biết chuyện|bị bắt|bị lộ|không thành|không làm được/.test(x));const idle=!(r.mine&&r.tTy)&&!refused&&!(r.z||[]).length;/* no servant free to send this khắc (ptime lock): nothing left the palace — a true «not now», retry */if((refused||idle)&&att<2){console.log(refused?'   (real refusal, retry)':'   (no servant free, retry)',JSON.stringify((r.lg||[]).slice(0,2)));continue}done=true;
   ok(r.mine&&r.tTy,`${tag} ${where} (${got.kind} @${got.k}): after her servant comes back, ${got.name}'s robe is in HER chest and she walks in trung y`,r)}}
  /* her pop-up where the consort really is (face to face): «Giật y phục» is offered there too (BAL.df.either), free to tap */
  const per=await p.evaluate(()=>{const out={tried:0,offered:0};for(const v of rivals){if(!v||!v.alive||v.out||sameHouse(S,v)||(typeof k61Named==="function"&&!k61Named(v)))continue;
    if(!wdOf(v).y||tyOn(v)){const k0=earnPlainY(v);if(k0)wdOf(v).y={k:k0,src:"nvp",nvp:1}}const w=whereOf(v);if(!w||w===palaceOf(v))continue;
    Q.splice(0);used=0;popIdx=null;window.__j77etq=1;window.__accStay=1;try{goTo(w)}finally{window.__j77etq=0;window.__accStay=0}const pp=curPeople().find(x=>x.ref===v&&x.kind!=="chest");if(!pp)continue;out.tried++;
    const R=DOOR.T.find(r=>r.k==="P10");const m=DOOR.more(pp,R).find(b=>b.id==="a:tyrob");if(m&&!m.off){out.offered++;out.at=w;out.v=v.name}}return out});
  ok(per.offered===per.tried,`${tag} person: on her pop-up where she really is, «Giật y phục» is offered (door «Lấy của»)${per.tried?"":" — no named consort away from home in this life (covered by act-move-reach D)"}`,per);
  await p.evaluate(()=>{[window.aRoll,window.caught]=window.__pin});
  ok(!errs.length,`${tag}: no page errors`,errs.slice(0,3));await p.close()}
 const n=res.filter(x=>x).length;console.log(res.every(x=>x)?`PASS ${n}`:`FAIL ${res.length-n}/${res.length}`);await b.close()})();
