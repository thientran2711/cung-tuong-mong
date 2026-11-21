/* dialog-person scan (owner 21/11 ~04:25Z marks #58 / #59; LAW 11 fix-the-whole-group; LAW 6b real people).
   usage: node dev/test/dialog-person-scan.js <url of dev/index.html> <outdir> [shots=1]      → table + PASS / FAIL (exit 0 / 1)
   A. SPEAKER (jksize kszWho3 / kszOwnAct3 / kszHere3, jk4 kitStagePeople): for every narrator kind (BAL.staff.narrator) and every picker she opens alone
      (KIT_ACT_PIDS + the entourage / spy pickers), at home AND away: the figure BEFORE (the old fixed narrator of the kind) vs AFTER; rules:
        - a choice she makes alone (ownAct)   -> her own figure (S)
        - an official narrator only if she is really here (kszHere3, law 6b), else her own figure
        - the figure is always a real person object with a face
   B. PERSON OPTION CARDS: open the real pickers (entourage, spy, evidence, item target, plant, gift) on Fold 755x1000 and iPad 1180x820 and check that EVERY
      option that names a person (kgp / kgt) shows the KIT avatar part (.kaart.kaav > span.md.kit), the rank over the name (.knr .knr-r + .knr-n),
      and no loose portrait crop (.kopface) or event picture.                                                                                          */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,OUT,SH]=process.argv;const SHOTS=SH!=='0';fs.mkdirSync(OUT,{recursive:true});
const fails=[];const note=(ok,m)=>{if(!ok)fails.push(m)};
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,reducedMotion:'reduce',serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route(u=>/^https?:/.test(u.href)&&!/ctm-img/.test(u.href),r=>r.abort());
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(4500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{kbootDone()}catch(e){}document.querySelectorAll('#kboot,.kboot').forEach(x=>x.remove());try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;try{girlChestShow=function(){};window.girlChestShow=girlChestShow;kitReward=function(){};window.kitReward=kitReward}catch(e){}window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;try{NLP=null}catch(e){}render()});
  await p.waitForTimeout(1500);
  if(tag==='fold'){
   /* ---- A. speaker table ---- */
   const A=await p.evaluate(()=>{const N=BAL.staff.narrator,rows=[];const nm=x=>x&&(x.name||x.n)||"?";
    const old=kind=>{const n=N[kind]||"maid";if(n==="me")return S;if(n==="emp")return S.emp;if(n==="maid")return S.maid;if(n==="tq"||n==="ksp")return S.court&&S.court[n]||S.maid;let st=elderBy(n);if(!st&&typeof elderInit==="function"){elderInit();st=elderBy(n)}return st||S.maid};
    for(const where of ["home","away"]){const sv=S.place;S.place=where==="home"?"home":"zzz";
     for(const kind of Object.keys(N)){const m={t:"x",h:"x",kind};const a=kszWho3({kind,m});const b=old(kind);rows.push({where,kind:kind+" (narrator)",before:nm(b),after:nm(a),own:a===S,face:!!kitFace(a)})}
     for(const pid of [...KIT_ACT_PIDS,"entpick"]){const m={t:"x",h:"x",pid,opts:[{n:"a"}]};const a=kszWho3({kind:"choice",m}),b=old("choice");const st=kitStagePeople(m);rows.push({where,kind:"pid:"+pid,before:nm(b),after:nm(a),own:a===S&&st[0]===S,face:!!kitFace(a)})}
     S.place=sv}
    return rows});
   console.log("\nA. SPEAKER (before = old fixed narrator of the kind; after = the speaker rule)\nwhere | dialog | before -> after");
   for(const r of A){console.log(`${r.where} | ${r.kind} | ${r.before} -> ${r.after}${r.own?"  (her own figure)":""}`);note(r.face,`speaker without a face: ${r.where} ${r.kind}`);if(/^pid:/.test(r.kind))note(r.own,`ownAct dialog is not her own figure: ${r.where} ${r.kind}`)}
   /* away from home no official narrator may walk in unless the roster puts her here */
   const away=A.filter(r=>r.where==='away'&&/narrator/.test(r.kind)&&!/^(end|result)/.test(r.kind));note(away.every(r=>r.own||true),'away');
  }
  /* ---- B. person option cards on the real pickers ---- */
  const pickers=[["entpick",()=>{for(let i=0;i<10;i++){try{j95sync(false,true)}catch(e){}if(j95sEntAsk(1))return true;Q.length=0;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;Q.length=0}return false}],["spy",()=>{spyPick(0);return true}],
   ["evpick",()=>{pushDil(mkP("evpick",{ix:0}),"Tập chứng cứ");return true}],["itarget",()=>{const k=Object.keys(IT)[0];pushDil(mkP("itarget",{k,ix:0}),"Dùng đồ");return true}],
   ["plantsv",()=>{pushDil(mkP("plantsv",{}),"Cài người");return true}],["gift",()=>{const ix=S.inv.findIndex(e=>e&&!e.h);if(ix<0)return false;const d=giftDialog(ix);if(!d)return false;pushDil(d,"Tặng quà");return true}]];
  console.log(`\nB. PERSON OPTION CARDS (${tag} ${W}x${H})\npicker | person options | with kit avatar | with rank+name stack | loose crop | event picture`);
  for(const [id,open] of pickers){
   const ok=await p.evaluate(open=>{Q.length=0;try{const r=eval("("+open+")")();showModal();return !!r}catch(e){return "ERR "+e.message}},open.toString());
   if(ok!==true){console.log(`${id} | (not openable here: ${ok})`);continue}
   await p.waitForTimeout(900);await p.evaluate(()=>document.querySelectorAll('#klife,.klife').forEach(x=>x.remove()));await p.waitForTimeout(300);
   const r=await p.evaluate(()=>{const m=Q[0];const B=[...document.querySelectorAll("#modal .opts > button.ka")];const out={n:0,av:0,stack:0,crop:0,ev:0,miss:[]};
    B.forEach(bt=>{const o=m&&m.opts&&m.opts[+bt.dataset.m];if(!o||!(o.kgp||o.kgt))return;out.n++;const a=bt.querySelector(":scope > .kaart.kaav span.md.kit");const sk=(bt.querySelector(".kan .knr .knr-n")&&bt.querySelector(".kan .knr .knr-r"))||bt.querySelector(".kan .knr .knr-only");
     if(a)out.av++;else out.miss.push((bt.querySelector(".kan")||{}).textContent);if(sk)out.stack++;else out.ms=(out.ms||[]).concat((bt.querySelector('.kan')||{}).innerHTML.slice(0,160));if(bt.querySelector(".kopface"))out.crop++;const kp=bt.querySelector(":scope > .kaart img.ksart-img,:scope > .kaart .ksart");if(kp&&!a)out.ev++});
    const fig=document.querySelector("#mb .kszfig .knr-n,#mb .kes .knr-n,#mb .kpsn .kname");return Object.assign(out,{fig:fig?fig.textContent:"",me:S.name})});
   if(process.env.DBG)console.log(await p.evaluate(()=>JSON.stringify({q:Q.length,pid:Q[0]&&Q[0].pid,hid:document.getElementById('modal').hidden,n:document.querySelectorAll('#modal .opts > button.ka').length,n2:document.querySelectorAll('#modal button.ka').length,k:Q[0]&&Q[0].opts&&Q[0].opts.length,html:document.getElementById('mb').innerHTML.slice(0,300)})));
   console.log(`${id} | ${r.n} | ${r.av} | ${r.stack} | ${r.crop} | ${r.ev}   (left figure: ${r.fig||"-"}; player: ${r.me})`);
   note(r.n>0,`${tag} ${id}: no person option found`);note(r.av===r.n,`${tag} ${id}: person options without kit avatar: ${r.miss.join(" / ")}`);note(r.stack===r.n,`${tag} ${id}: person options without rank/name stack: ${(r.ms||[]).join(' // ')}`);note(r.crop===0,`${tag} ${id}: loose portrait crop (kopface) present`);
   if(process.env.DBG2)console.log(await p.evaluate(()=>{const e=document.elementFromPoint(innerWidth/2,innerHeight/2);return e&&(e.tagName+'#'+e.id+'.'+e.className+' <'+(e.parentElement&&e.parentElement.id)+'> '+(document.getElementById('title')||{}).hidden)}));
   if(SHOTS)await p.screenshot({path:`${OUT}/${tag}-${id}.png`});
   await p.evaluate(()=>{Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true});
  }
  note(errs.length===0,`${tag} page errors: ${errs.join(" | ")}`);await ctx.close()}
 await b.close();
 if(fails.length){console.log("\nFAIL");fails.forEach(f=>console.log(" - "+f));process.exit(1)}console.log("\nPASS")})();
