/* dialog-person scan (owner 21/11 marks #58 #59 #62–#65 #67 #69 #70 #73 #76–#81; LAW 11 fix-the-whole-group; LAW 6b real people).
   usage: node dev/test/dialog-person-scan.js file://…/dev/index.html <outdir> [shots=1]      → tables + PASS / FAIL (exit 0 / 1)
   A. OWN ACT: every picker she opens alone (KIT_ACT_PIDS + entpick) and a bare frame → her own figure / the event picture; the default ma-ma narrator is GONE.
   B. PERSON OPTION CARDS: real pickers (entourage, spy, evidence, item target, plant, gift) on Fold 755x1000 + iPad 1180x820: every option naming a person has
      the KIT avatar (.kaart.kaav span.md.kit), the rank over the name, no loose crop, no event picture.
   C. WHOLE-GAME SWEEP of every PEND dialog builder (+ news card) on both devices, BEFORE (old rule: named person else the fixed palace narrator of the kind)
      vs AFTER (the rule): subject is never an elder / default narrator unless the dialog names her; ONE AVATAR RULE: the left subject has no line avatar,
      a line naming ≥ 2 people has none, a second person's avatar sits on the event picture (.kevav) not in the text, her own frame shows «(ta)»;
      no broken avatar image anywhere in the frame.                                                                                               */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,OUT,SH]=process.argv;const SHOTS=SH!=='0';fs.mkdirSync(OUT,{recursive:true});
const fails=[];const note=(ok,m)=>{if(!ok)fails.push(m)};
const OLDN={news:"kn",notice:"kn",week:"kn",choice:"kn",rule:"tn",info:"tn",evidence:"tn",night:"ksp",reward:"tq",intel:"maid",threat:"maid",person:"maid",end:"me",result:"me"};
(async()=>{const b=await chromium.launch();const trans={};const sweepRows=[];
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,reducedMotion:'reduce',serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route(u=>/^https?:/.test(u.href)&&!/ctm-img/.test(u.href),r=>r.abort());
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(4500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{kbootDone()}catch(e){}document.querySelectorAll('#kboot,.kboot').forEach(x=>x.remove());try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;try{girlChestShow=function(){};window.girlChestShow=girlChestShow;kitReward=function(){};window.kitReward=kitReward}catch(e){}window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;try{NLP=null}catch(e){}render();
   try{S.inv.push({k:"tramngoc",from:"me"})}catch(e){}});
  await p.waitForTimeout(1500);
  if(tag==='fold'){
   /* ---- A. own act ---- */
   const A=await p.evaluate(()=>{const rows=[];const nm=x=>x&&(x.name||x.n)||"(event picture)";
    for(const pid of [...KIT_ACT_PIDS,"entpick"]){const m={t:"x",h:"x",pid,opts:[{n:"a"}]};const a=kszWho3({kind:"choice",m}),st=kitStagePeople(m);rows.push({pid,after:nm(a),own:a===S&&st[0]===S})}
    const bare=kszWho3({kind:"news",m:{t:"x",h:"x"}});rows.push({pid:"(bare news frame)",after:nm(bare),own:bare===null});return rows});
   console.log("\nA. OWN ACT / BARE FRAME (default narrator gone)\ndialog | after");for(const r of A){console.log(`${r.pid} | ${r.after}${r.own?"  ✓":"  ✗"}`);note(r.own,`A: ${r.pid} -> ${r.after}`)}
  }
  /* ---- B. person option cards ---- */
  const pickers=[["entpick",()=>{for(let i=0;i<10;i++){try{j95sync(false,true)}catch(e){}if(j95sEntAsk(1))return true;Q.length=0;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;Q.length=0}return false}],["spy",()=>{spyPick(0);return true}],
   ["evpick",()=>{pushDil(mkP("evpick",{ix:0}),"Tập chứng cứ");return true}],["itarget",()=>{const k=Object.keys(IT)[0];pushDil(mkP("itarget",{k,ix:0}),"Dùng đồ");return true}],
   ["plantsv",()=>{pushDil(mkP("plantsv",{}),"Cài người");return true}],["gift",()=>{const ix=S.inv.findIndex(e=>e&&!e.h);if(ix<0)return false;const d=giftDialog(ix);if(!d)return false;pushDil(d,"Tặng quà");return true}]];
  console.log(`\nB. PERSON OPTION CARDS (${tag} ${W}x${H})\npicker | person options | kit avatar | rank+name stack | loose crop | event picture`);
  for(const [id,open] of pickers){
   const ok=await p.evaluate(open=>{Q.length=0;try{const r=eval("("+open+")")();showModal();return !!r}catch(e){return "ERR "+e.message}},open.toString());
   if(ok!==true){console.log(`${id} | (not openable here: ${ok})`);continue}
   await p.waitForTimeout(900);await p.evaluate(()=>document.querySelectorAll('#klife,.klife').forEach(x=>x.remove()));await p.waitForTimeout(300);
   const r=await p.evaluate(()=>{const m=Q[0];const B=[...document.querySelectorAll("#modal .opts > button.ka")];const out={n:0,av:0,stack:0,crop:0,ev:0,miss:[]};
    B.forEach(bt=>{const o=m&&m.opts&&m.opts[+bt.dataset.m];if(!o||!(o.kgp||o.kgt))return;out.n++;const a=bt.querySelector(":scope > .kaart.kaav span.md.kit");const sk=(bt.querySelector(".kan .knr .knr-n")&&bt.querySelector(".kan .knr .knr-r"))||bt.querySelector(".kan .knr .knr-only");
     if(a)out.av++;else out.miss.push((bt.querySelector(".kan")||{}).textContent);if(sk)out.stack++;else out.ms=(out.ms||[]).concat((bt.querySelector('.kan')||{}).innerHTML.slice(0,160));if(bt.querySelector(".kopface"))out.crop++;const kp=bt.querySelector(":scope > .kaart .ksart");if(kp&&!a)out.ev++});
    const fig=document.querySelector("#mb .kszfig .knr-n,#mb .kes .knr-n,#mb .kpsn .kname");return Object.assign(out,{fig:fig?fig.textContent:"",me:S.name})});
   console.log(`${id} | ${r.n} | ${r.av} | ${r.stack} | ${r.crop} | ${r.ev}   (left: ${r.fig||"-"}; player: ${r.me})`);
   note(r.n>0,`${tag} ${id}: no person option found`);note(r.av===r.n,`${tag} ${id}: person options without kit avatar: ${r.miss.join(" / ")}`);note(r.stack===r.n,`${tag} ${id}: person options without rank/name stack: ${(r.ms||[]).join(' // ')}`);note(r.crop===0,`${tag} ${id}: loose portrait crop (kopface) present`);
   if(SHOTS)await p.screenshot({path:`${OUT}/${tag}-${id}.png`});
   await p.evaluate(()=>{Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true});
  }
  /* ---- C. whole-game sweep ---- */
  await p.waitForTimeout(500);
  await p.evaluate(OLDN=>{window.__DP=[];const nm=x=>x&&(x.name||x.n)||"(event picture)";
   const k0=window.kitFrameLive3;window.kitFrameLive3=kitFrameLive3=function(m){const r=k0.apply(this,arguments);try{if(!r)return r;const dlg=document.querySelector('#modal .dlg.kpanel');const X=dlg&&dlg.__ksz3;if(!X)return r;
    const kind=dlg.dataset.kind;let P=[];try{P=kitStagePeople(m)}catch(e){}
    const old=P[0]?P[0]:(()=>{const n=OLDN[kind]||"maid";if(n==="me")return S;if(n==="emp")return S.emp;if(n==="maid")return S.maid;if(n==="tq"||n==="ksp")return S.court&&S.court[n]||S.maid;try{return elderBy(n)}catch(e){return null}})();
    const who=X.who;const sub=who&&(who.__kp||who);const rec={id:String(m.pid||m.t||"").replace(/<[^>]+>/g,"").slice(0,40),kind,before:nm(old),after:nm(who),afterIsElder:!!(sub&&sub.eid&&!P[0]),fixed:P[0]?"named":who===null?"picture":sub===S?"self":"person"};
    const rows=[...dlg.querySelectorAll('#mb .kfact[data-kfp]')];const vis=r=>{const c=r.querySelector(':scope > .md');return c&&!r.classList.contains('kfav-off')};
    rec.dupLeft=rows.filter(r=>{const q=kfpGet(r.dataset.kfp);return vis(r)&&who&&q&&(q.__kp||q)===sub}).length;rec.many=rows.filter(r=>vis(r)&&(+r.dataset.kfn||1)>=2).length;rec.slot=X.slot||"";rec.lineAv=(who&&X.slot!=="item")?rows.filter(vis).length:0;/* #76: an item-left-slot frame shows no person on the left, so her line avatar is the ordinary actor avatar */
    rec.onPic=dlg.querySelectorAll('.kevav .md').length;rec.ta=(sub===S&&X.slot!=="item")?(dlg.querySelectorAll('.knr-ta').length>0):true;/* #76 (kit-dialog-2): an item-subject frame shows the ITEM in the left slot, not her figure, so no «(ta)» is due */
    rec.srcs=[...dlg.querySelectorAll('#mb .md img, #mb .kevav img')].map(im=>im.getAttribute('src')||"");
    window.__DP.push(rec)}catch(e){window.__DP.push({id:"ERR",err:String(e).slice(0,200)})}return r}},OLDN);
  /* (1) every PEND builder */
  const ids=await p.evaluate(()=>Object.keys(PEND));
  for(let i=0;i<ids.length;i+=40){const part=ids.slice(i,i+40);
   await p.evaluate(async(part)=>{const R0=liveRivals(true);const v=R0[0];const iix=S.inv.findIndex(e=>e&&e.k==="tramngoc");const tries=id=>[{v:v&&v.id,ix:iix},{ix:iix},{v:v&&v.id},{}];const close=()=>{Q.length=0;const M=document.getElementById('modal');M.hidden=true};
    for(const id of part){try{for(const pp of tries(id)){let d=null;try{d=PEND[id](Object.assign({},pp))}catch(e){d=null}if(!d||!(d.o||d.t))continue;close();try{pushDil(mkP(id,pp),id);showModal()}catch(e){continue}close();break}}catch(e){close()}}},part)}
  /* (2) the game itself: play many buổi, answering every dialog (first option / close) — the natural events, nights, visits, notices */
  for(let round=0;round<14;round++){await p.evaluate(async()=>{let g=0;while(g++<60){const M=document.getElementById('modal');if(Q.length){const m=Q[0];try{if(m.opts&&m.opts.length){const i=m.opts.findIndex(c=>c&&!c.off&&!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0));if(i>=0)chooseM(i);else closeModal()}else closeModal()}catch(e){try{Q.shift()}catch(x){}}if(S.dead)break;continue}
     try{S.mg=0;if(typeof nextBuoi==="function")nextBuoi()}catch(e){}if(S.dead){try{window.__nlInner=1;start();window.__nlInner=0}catch(e){}}}
    Q.length=0;const M=document.getElementById('modal');if(M)M.hidden=true;document.querySelectorAll('#klife,.klife,.kroul,#kroul,#kroulw').forEach(x=>x.remove())})}
  const rowsT0=await p.evaluate(()=>window.__DP);const rowsT=[];const seenK=new Set();rowsT0.forEach(r=>{if(r.err){console.log('HOOK ERR',r.err);return}rowsT.push(r)});
  /* broken avatar images: load every distinct avatar src once */
  const srcs=[...new Set(rowsT.flatMap(r=>r.srcs||[]))].filter(Boolean);
  const bad=await p.evaluate(async(srcs)=>{const out=[];await Promise.all(srcs.map(s=>new Promise(res=>{if(!/^(https?:|img\/|data:|blob:)/.test(s)){out.push(s);return res()}const im=new Image();im.onload=()=>res();im.onerror=()=>{out.push(s);res()};im.src=s;setTimeout(res,8000)})));return out},srcs);
  rowsT.forEach(r=>{r.broken=(r.srcs||[]).filter(s=>bad.includes(s))});
  console.log(`\nC. WHOLE-GAME SWEEP (${tag}): ${rowsT.length} live event frames (${ids.length} PEND builders + ${14} rounds of play), ${srcs.length} distinct avatar images, ${bad.length} broken`);
  const t={};rowsT.forEach(r=>{const k=`${r.fixed}: ${r.before===r.after?"same":r.before+" -> "+r.after}`.replace(/Diệp Thanh Hòa|[A-ZĐ][^ ]* [^ ]* [^ ]*$/,m=>m);t[r.fixed+(r.before===r.after?" (same)":" (changed)")]=(t[r.fixed+(r.before===r.after?" (same)":" (changed)")]||0)+1});
  console.log("subject transitions:",JSON.stringify(t));
  const ch=rowsT.filter(r=>r.before!==r.after);console.log(`changed (${ch.length}): `+ch.slice(0,40).map(r=>`${r.id}[${r.kind}] ${r.before} -> ${r.after}`).join(" ; "));
  sweepRows.push({tag,rowsT});
  for(const r of rowsT){note(!r.afterIsElder,`${tag} C: ${r.id} subject is an elder/default narrator`);note(r.dupLeft===0,`${tag} C: ${r.id} same person twice (left + line avatar)`);note(r.many===0,`${tag} C: ${r.id} avatar on a line naming many people`);note(r.lineAv===0,`${tag} C: ${r.id} line avatar while the left slot shows a person (slot ${r.slot})`);note(r.ta,`${tag} C: ${r.id} her own frame has no «(ta)»`);note(!r.broken.length,`${tag} C: ${r.id} broken avatar image ${r.broken.join(",")}`)}
  note(errs.length===0,`${tag} page errors: ${errs.join(" | ")}`);await ctx.close()}
 await b.close();
 if(fails.length){console.log("\nFAIL");fails.slice(0,60).forEach(f=>console.log(" - "+f));if(fails.length>60)console.log(` … ${fails.length-60} more`);process.exit(1)}console.log("\nPASS")})();
