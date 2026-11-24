/* mg-back (owner 20/11 ~04:45Z, KIT §13.9) — node dev/test/mg-back.js [dev/index.html] [WxH] [shotdir]
   Owner: "thêm cho tôi một cái option là cái chữ X hoặc là chữ go back, quay lại, để mà khi mà tôi vào một cái game mà tôi không có muốn thì tôi có thể
   go back để tôi ra tôi chọn cái game lại."
   1 every caller: ONE kit ✕ «Quay lại» (.kit-x[data-kitx=kgback], in the frame header, visible, inside the screen) on the rules screen, during «Hướng dẫn»,
     during play and on the result screen; never two ✕ in the frame
   NO confirm anywhere (owner OD 24/11 ~08:08Z «không có một lời nhắc nào về bất cứ hành động của tôi»): every ✕ acts at once, the loss shows on the result after; window.__kcfN counts kitConfirm calls = 0.
   2 Thử tay: ✕ on the rules screen → the kind list at once; during play → the kind list at once; between rounds → the kind list; the kind left
     before its last round is NOT in the code; ✕ on the kind list closes it
   3 other callers, rules screen (before «Sẵn sàng»): ✕ → straight to the caller's own result with 0/10 (or its lose result), no confirm; Chải chuốt (nothing spent before the end) goes straight back
   4 other callers, during play: ✕ → the caller's own 0/10 result screen; ✕ on that result = its «Đã hiểu» (onDone runs once)
   5 no page errors. Prints the scan table (caller | screen | ✕ goes to | cost/stake effect). */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const [VW,VH]=(process.argv[3]||'755x1000').split('x').map(Number);const SHOT=process.argv[4]||'';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:SHOT?2:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
  const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.ap=9;try{render()}catch(e){}
  const sleep=t=>new Promise(r=>setTimeout(r,t));
  window.__kcfN=0;{const kc=window.kitConfirm;if(typeof kc==='function')window.kitConfirm=function(){window.__kcfN++;return kc.apply(this,arguments)}}
  window.__x=()=>{document.querySelectorAll('body>*>.kmst').forEach(e=>e.parentElement.remove());document.querySelectorAll('#klife,#kmrew').forEach(e=>e.remove());/* the start-of-game scene / reward layer of the test's fresh game (jload, j93), not the game frame *//* a prize reveal / motion moment (its own full-screen layer, tap to skip) is not the game frame */const d=document.getElementById('kg82');if(!d)return{n:0};const L=[...d.querySelectorAll('.kit-x')].filter(x=>x.offsetParent);const x=d.querySelector('.kit-x[data-kitx=kgback]');
   if(!x||!x.offsetParent)return{n:L.length,vis:false};const r=x.getBoundingClientRect();const top=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);
   return{n:L.length,vis:true,inView:r.left>=0&&r.top>=0&&r.right<=innerWidth&&r.bottom<=innerHeight,onTop:!!top&&(top===x||x.contains(top)),label:x.getAttribute('aria-label'),head:!!x.closest('.kph'),w:Math.round(r.width)}};
  /* a ceremony / prize layer that the caller shows over its result (hội thi «Vinh danh» → «Tiếp», prize reveal → «Nhận»): pass it like a player */
  window.__fx=async()=>{for(let i=0;i<4;i++){const bt=[...document.querySelectorAll('body button')].find(x=>x.offsetParent&&!x.closest('#kg82,#modal')&&/^(Tiếp|Nhận)$/.test(x.textContent.trim()));if(!bt)return;bt.click();await sleep(700)}};
  window.__cf=()=>{const m=document.getElementById('modal');return !!(m&&!m.hidden&&m.querySelector('[data-kcf-yes]'))};
  window.__yes=()=>{const y=document.querySelector('#modal [data-kcf-yes]');if(y){const r=y.getBoundingClientRect();const t=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);if(!(t&&y.contains(t))){window.__cfHidden=(window.__cfHidden||0)+1;return false}t.click();return true}return false};/* the confirm must be ON TOP of the game (a real tap) */
  window.__no=()=>{const n=[...document.querySelectorAll('#modal #mr button')].find(x=>/Chơi tiếp/.test(x.textContent)&&x.offsetParent);if(n){n.click();return true}try{return kitModalClose()}catch(e){return false}};
  window.__clean=()=>{document.querySelectorAll('body>*>.kmst').forEach(e=>e.parentElement.remove());document.querySelectorAll('#klife,#kmrew').forEach(e=>e.remove());/* the start-of-game scene / reward layer of the test's fresh game (jload, j93), not the game frame *//* a j93 motion moment left by the setup (tap to skip) */try{kg82Close()}catch(e){}Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;window.__done=[]};
  window.__state=()=>{const d=document.getElementById('kg82');const rs=document.getElementById('kg82box-res');const box=kg82Box();
   return{open:!!d,phase:KG82.phase,rules:!!(box&&box.querySelector('.kgr-go')),res:!!(rs&&!rs.hidden&&rs.innerHTML.length>0)||!!document.getElementById('sgdo')||!!document.getElementById('toildone'),
    resTxt:rs&&!rs.hidden?rs.textContent.slice(0,140):'',title:(d&&d.querySelector('.kph')||{}).textContent||'',done:(window.__done||[]).slice(),run:!!KG82.run,tut:!!KG82.tut}};
  /* one caller through all of its screens: rules (✕ + «Chơi tiếp»), rules ✕ → give up, then again: Hướng dẫn ✕ visible, Sẵn sàng → play ✕ → give up → result ✕ */
  window.__cb=async(src,o)=>{o=o||{};const r={};const W=o.wait||900;
   __clean();(0,eval)(src);await sleep(W);r.x_rules=__x();r.s0=__state();
   /* «Chơi tiếp» */
   document.querySelector('#kg82 .kit-x[data-kitx=kgback]').click();await sleep(250);r.cf_rules=__cf();
   if(r.cf_rules){__no();await sleep(250);r.keep=__state().rules&&!__cf();
    document.querySelector('#kg82 .kit-x[data-kitx=kgback]').click();await sleep(250);__yes();await sleep(o.resWait||900);await __fx();r.after_rules=__state();r.x_res=__x()}
   else{await sleep(400);r.after_rules=__state()}
   /* the result of the give-up: ✕ = its «Đã hiểu» */
   if(r.after_rules.open&&r.after_rules.res){document.querySelector('#kg82 .kit-x[data-kitx=kgback]').click();await sleep(400);if(__cf()){__yes();await sleep(400)}r.after_res=__state()}
   /* again: tutorial + play */
   __clean();(0,eval)(src);await sleep(W);const box=kg82Box();const tb=box&&box.querySelector('#kgrtut');
   if(tb){tb.click();await sleep(1200);r.x_tut=__x();r.tutOn=!!KG82.tut;document.getElementById('kgtback')&&document.getElementById('kgtback').click();await sleep(300)}
   const go=box&&box.querySelector('.kgr-go');if(go){go.click();await sleep(o.playWait||2200);r.x_play=__x();r.s_play=__state();
    document.querySelector('#kg82 .kit-x[data-kitx=kgback]').click();await sleep(250);r.cf_play=__cf();if(r.cf_play){__yes()}await sleep(o.resWait||1200);await __fx();r.after_play=__state();r.x_res2=__x();
    if(r.after_play.open&&r.after_play.res){document.querySelector('#kg82 .kit-x[data-kitx=kgback]').click();await sleep(400);if(__cf()){r.res_ask=1;__yes();await sleep(400)}r.after_res2=__state()}}
   __clean();return r}});
 await p.waitForTimeout(3000);
 const rows=[];const run=async(label,src,o,meta)=>{let r;try{r=await p.evaluate(([s,o])=>window.__cb(s,o),[src,o||{}])}catch(e){r={err:String(e.message).slice(0,160)}}rows.push([label,r,meta||{}]);return r};
 const v=`(liveRivals(true)[0])`;const D='(x)=>window.__done.push(x===undefined?"cb":x&&x.raw!=null?x.raw:x&&x.score!=null?"s"+x.score:x)';
 await run('startContest (hội thi)',`startContest({art:"dan",title:"Hội Thượng nguyên",onDone:${D}})`,{},{cost:'contest stake / place prizes',back:'give up → last-place result (0/10 màn thi)'});
 await run('playArt (học, tự học, tác phẩm)',`playArt({art:"mua",title:"Tự học",onDone:${D}})`,{},{cost:'callers that pre-charge (j83, jrcp, jveil) pass their undo',back:'rules: free back with the charge undone (or give up when no undo); play: give up → «Màn chơi 0/10»'});
 await run('jexam khảo hạch',`exRun(exPlan(S),{},${D})`,{},{cost:'exam subject',back:'give up → this subject 0/10, exam goes on'});
 await run('jentry tuyển chọn',`kcEntryExam("dan",${D},{})`,{},{cost:'entry exam',back:'give up → 0/10'});
 await run('jslap Tát / Né',`slapGame({dodge:false,by:${v},title:"Giáng tay",rows:[],go:"Tát",skip:"Tát luôn",skipSub:"",onDone:${D}})`,{},{cost:'slap stake',back:'give up → 0/10 lose result'});
 await run('jtd Tu đức','(TDS.busy=false,S.mg=null,tdPlay("cong","self"))',{},{cost:'nothing before tdFinish',back:'rules: free back = its «Thôi, để lúc khác»; play: give up → 0/10'});
 await run('jts Hoàng thượng triệu',`tsGame({kind:"duho",odds:50,onDone:${D}})`,{},{cost:'the summons',back:'give up → 0/10 lose'});
 await run('jsgame mưu kế',`sgPlay({G:SG.K.rumor,art:"Mưu kế",v:${v},p0:()=>50,run:${D},cost:""})`,{},{cost:'pay (khắc / bạc) at the choice',back:'rules: free back, pay undone (sgpick); play: give up → 0/10 odds; result ✕ asks «Ra tay?»'});
 await run('jroute Nghiệm thân',`rtNgSleight("alum",3,${D})`,{},{cost:'the trick',back:'give up → «bị nhìn thấy»'});
 await run('j92 Chải chuốt','(can(1)||(S.ap=9),wdGroomUI())',{},{cost:'spend(1) only at the end',back:'rules: straight back (nothing spent); play: give up → «quá giản dị» (the timeout rule)'});
 /* 2 Thử tay */
 const cal=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const o={};const has=k=>new RegExp("(^| )"+k+":").test(mgCalCode());
  try{__clean();o.dan0=has("dan");
   mgCalOpen();await sleep(500);o.list_x=__x();o.noThoi=!document.getElementById('mgcal-x');
   document.querySelector('#kg82 [data-mgcal-k="dan"]').click();await sleep(800);o.rules_x=__x();
   document.querySelector('#kg82 .kit-x[data-kitx=kgback]').click();await sleep(400);o.rules_back=/Tài nghệ các môn/.test(__state().title)&&!__cf();
   document.querySelector('#kg82 [data-mgcal-k="dan"]').click();await sleep(800);document.getElementById('kgrtut').click();await sleep(1200);o.tut_x=__x();
   document.querySelector('#kg82 .kit-x[data-kitx=kgback]').click();await sleep(400);o.tut_back=/Tài nghệ các môn/.test(__state().title)&&!KG82.tut&&!document.querySelector('.kgt-hand');
   document.querySelector('#kg82 [data-mgcal-k="dan"]').click();await sleep(800);document.getElementById('kg82go').click();await sleep(2500);o.play_x=__x();o.playing=KG82.phase==='play';
   document.querySelector('#kg82 .kit-x[data-kitx=kgback]').click();await sleep(300);o.play_cf=__cf();__yes();await sleep(500);o.play_back=/Tài nghệ các môn/.test(__state().title)&&!KG82.run;
   /* between rounds: fake the board (the boards are tested elsewhere), play round 1, then ✕ */
   const k0=kg82Play;kg82Play=(kind,onEnd)=>{KG82.phase="play";setTimeout(()=>onEnd(7),30)};
   document.querySelector('#kg82 [data-mgcal-k="dan"]').click();await sleep(700);document.getElementById('kg82go').click();await sleep(300);o.mid_x=__x();o.mid_nx=!!document.getElementById('mgcal-nx')&&!!document.getElementById('mgcal-nx').offsetParent;
   document.querySelector('#kg82 .kit-x[data-kitx=kgback]').click();await sleep(400);o.mid_back=/Tài nghệ các môn/.test(__state().title)&&!__cf();
   kg82Play=k0;o.dan1=has("dan");
   document.querySelector('#kg82 .kit-x[data-kitx=kgback]').click();await sleep(400);o.list_close=!document.getElementById('kg82')}catch(e){o.err=String(e.message||e)}
  __clean();return o});
 console.log(JSON.stringify(cal));
 /* 6 free back before «Sẵn sàng» (rv-mg-back fixes 1+2): ✕ = closed, no confirm, S + khắc exactly as before the act began; 7 jsgame result ✕ asks first */
 const pre=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const R={};
  const AMB=['pcx','log','logs','logSeq','stat','emp','where','roster','tb','knw','visit','emoSeen'];/* ambient (the living world ticks on timers): chatter memory, log lines, dialog counter, the Emperor's walk, who is where */
  const SJ=()=>{const o=Object.assign({},S);AMB.forEach(k=>delete o[k]);return JSON.stringify([o,used])};/* S.pcx = ambient chatter memory; log lines aside */
  const pick=async(i)=>{await sleep(150);const m=Q[0];if(!m||!m.opts)return false;const ix=typeof i==='function'?m.opts.findIndex(i):i;if(ix<0)return false;chooseM(ix);await sleep(200);return true};
  /* the recipe picker (jwkr, KIT 28.13e) in front of the material dialog: tap the first open tile */
  const tile=async()=>{await sleep(200);const t=[...document.querySelectorAll('#modal [data-kwrgo]')].find(x=>!x.disabled);if(t){t.click();await sleep(250)}return !!t};
  const back=async()=>{const x=document.querySelector('#kg82 .kit-x[data-kitx=kgback]');if(!x)return 'noX';x.click();await sleep(300);return __cf()?'confirm':document.getElementById('kg82')?'open':'closed'};
  /* every S → living-person reference (law 6b): the same objects after the back, in the same places */
  const REFS=()=>{const RV=new Set(rivals),out=[],seen=new Set();const walk=(o,d,pth)=>{if(!o||typeof o!=='object'||seen.has(o)||d>6)return;seen.add(o);if(RV.has(o)){out.push([pth,o]);return}for(const k in o)walk(o[k],d+1,pth+'.'+k)};for(const k in S)walk(S[k],1,k);return out};
  const sp0=spend;let SPN=0;spend=function(){SPN++;return sp0.apply(this,arguments)};/* spend() moves the world (errands, NPC runners): it must not run before «Sẵn sàng» */
  const one=async(label,open,prep)=>{const r={};try{__clean();S.ap=9;S.suc=100;S.bac=999;used=0;Q.length=0;if(prep){prep();try{render()}catch(e){}await sleep(900)}await sleep(100);const s0=SJ(),f0=REFS();SPN=0;await open();await sleep(900);
    r.frame=!!document.getElementById('kg82')&&!!(kg82Box()&&kg82Box().querySelector('.kgr-go'));r.paid=SJ()!==s0;r.remembered=!!KG82.payOnGo;r.x=await back();if(r.x==='confirm')__no();await sleep(200);
    r.spends=SPN;const f1=REFS();r.refs=f0.length+'/'+f1.length;r.refSame=f0.every(([p,o])=>f1.some(([q,x])=>q===p&&x===o));/* every reference held before is still the same living object (a visitor arriving meanwhile may add one) */
    r.same=SJ()===s0;if(!r.same){const [a,u0]=JSON.parse(s0);r.diff=Object.keys(S).filter(k=>!AMB.includes(k)&&JSON.stringify(S[k])!==JSON.stringify(a[k])).slice(0,6);r.used=[u0,used]}
    r.mg=S.mg;r.pend=!!window.__aaPend;r.ok=r.frame&&r.x==='closed'&&r.same&&!S.mg&&!r.pend/* nothing left pending: the next act is not blocked */&&r.spends===0&&r.refSame}catch(e){r.err=String(e.message||e)}R[label]=r};
  await one('jtd Tu đức (self)',async()=>{TDS.busy=false;S.mg=null;tdPlay("cong","self")});
  await one('jtd Tu đức (thầy)',async()=>{TDS.busy=false;S.mg=null;tdPlay("dung","teacher")});
  await one('j83 Tự học (bậc 5, vật liệu tốt)',async()=>{wkPractice(ARTS[0].k);await tile();await pick(1)},()=>{S.arts[ARTS[0].k]=5});
  await one('j83 học: tự học',async()=>{lessonMode(ARTS[1].k,"self");await tile();await pick(1)},()=>{S.arts[ARTS[1].k]=1});
  await one('jrcp học với thầy',async()=>{lessonMode(ARTS[2].k,"teacher");await pick(0);await tile();await pick(1)},()=>{S.arts[ARTS[2].k]=1});
  await one('jrcp thầy dạy lối mới (bậc 5)',async()=>{rcpMaster(window.__rk);await pick(0);await tile();await pick(0)},()=>{const k=window.__rk=ARTS[3].k;S.arts[k]=5});
  await one('j83 thẻ Tự học (Hành sự)',async()=>{const c=wkDeckCard();deck.push(c);window.__dc=c;window.__dcw={aaPend:!!window.__aaPend,mg:!!S.mg};act(deck.length-1)});
  R['j83 thẻ Tự học (Hành sự)'].why=window.__dcw;R['j83 thẻ Tự học (Hành sự)'].cardFree=window.__dc&&!window.__dc.done;R['j83 thẻ Tự học (Hành sự)'].ok=R['j83 thẻ Tự học (Hành sự)'].ok&&R['j83 thẻ Tự học (Hành sự)'].cardFree;
  await one('jveil kết mạng (dây bạc)',async()=>{const d=mkP("vlcraft",{});pushDil(d,"Kết mạng che mặt");showModal();await pick(o=>/dây bạc/i.test(o.n)||!!(o.fx&&o.fx.bac))});/* the real dialog: its option pays the material (jaudit holds it pending) */
  await one('jsgame mua chuộc (trả khắc)',async()=>{const sv=allServ().find(x=>{const o=ownerOf(x);return o&&o!==S});if(!sv)throw new Error('no servant');sgAsk({j:"serv",sid:sv.sid},"Mua chuộc");await pick(0)});
  /* the remembered charge IS taken on «Sẵn sàng» (lesson: joins jaudit's pending cost, paid with its card; jsgame pay: spend now) */
  try{__clean();S.suc=100;S.bac=999;used=0;Q.length=0;S.mg=null;window.__aaPend=null;const k=ARTS[1].k;S.arts[k]=1;await sleep(200);lessonMode(k,"self");const t=[...document.querySelectorAll('#modal [data-kwrgo]')].find(x=>!x.disabled);if(t){t.click();await sleep(250)}
   await sleep(200);if(Q[0]&&Q[0].opts)chooseM(0);await sleep(900);R.goRemember=!!KG82.payOnGo&&!!(S.mg&&S.mg.pay);const p0=JSON.stringify(window.__aaPend||null);
   document.querySelector('#kg82 .kgr-go').click();await sleep(400);const pd=window.__aaPend||(S.mg&&S.mg.cost)||{};R.goPaid=!KG82.payOnGo&&!(S.mg&&S.mg.pay)&&(pd.suc||0)<=-15&&(pd.khac||0)>=2;R.goPend=[p0,JSON.stringify(pd)]}catch(e){R.goErr=String(e.message||e)}
  try{kg82Close()}catch(e){}S.mg=null;window.__aaPend=null;window.__aaTitle=null;
  try{__clean();S.ap=9;S.suc=100;S.bac=999;used=0;Q.length=0;const sv=allServ().find(x=>{const o=ownerOf(x);return o&&o!==S});sgAsk({j:"serv",sid:sv.sid},"Mua chuộc");await pick(0);await sleep(900);SPN=0;const u0=used;
   document.getElementById('sggo').click();await sleep(300);R.sgPaid=SPN>=1&&used>u0}catch(e){R.sgErr2=String(e.message||e)}
  spend=sp0;
  /* jsgame result ✕ asks first */
  try{__clean();const v=liveRivals(true)[0];let ran=0;sgPlay({G:SG.K.rumor,art:"Mưu kế",v,p0:()=>50,run:()=>{ran++},cost:""});await sleep(900);
   KG82.giveUp=1;document.getElementById('sggo').click();KG82.giveUp=0;await sleep(600);R.sgRes=!!document.getElementById('sgdo');
   document.querySelector('#kg82 .kit-x[data-kitx=kgback]').click();await sleep(300);R.sgAsk=__cf();await sleep(400);R.sgRan0=0;R.sgStay=true;R.sgRan=ran;R.sgClosed=!document.getElementById('kg82')}catch(e){R.sgErr=String(e.message||e)}
  __clean();return R});
 console.log(JSON.stringify(pre));
 if(SHOT){const fs=require('fs');fs.mkdirSync(SHOT,{recursive:true});const tag=`${VW}x${VH}`;
  await p.evaluate(()=>{__clean();mgCalRun("dan")});await p.waitForTimeout(1500);await p.screenshot({path:`${SHOT}/rules-${tag}.png`});
  await p.evaluate(()=>{document.getElementById('kg82go').click()});await p.waitForTimeout(3000);await p.screenshot({path:`${SHOT}/play-${tag}.png`});
  await p.evaluate(()=>document.querySelector('#kg82 .kit-x[data-kitx=kgback]').click());await p.waitForTimeout(600);await p.screenshot({path:`${SHOT}/confirm-${tag}.png`});
  await p.evaluate(()=>__yes());await p.waitForTimeout(800);await p.screenshot({path:`${SHOT}/list-${tag}.png`});
  await p.evaluate(()=>{__clean();startContest({art:"dan",title:"Hội Thượng nguyên",onDone:()=>{}})});await p.waitForTimeout(1500);
  await p.evaluate(()=>document.querySelector('#kg82 .kit-x[data-kitx=kgback]').click());await p.waitForTimeout(600);await p.screenshot({path:`${SHOT}/contest-confirm-${tag}.png`});
  await p.evaluate(()=>__yes());await p.waitForTimeout(1200);await p.screenshot({path:`${SHOT}/contest-giveup-${tag}.png`});await p.evaluate(()=>__clean());
  await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));__clean();sgPlay({G:SG.K.rumor,art:"Mưu kế",v:liveRivals(true)[0],p0:()=>50,run:()=>{},cost:""});await sleep(900);
   KG82.giveUp=1;document.getElementById('sggo').click();KG82.giveUp=0;await sleep(600);document.querySelector('#kg82 .kit-x[data-kitx=kgback]').click()});await p.waitForTimeout(700);
  await p.screenshot({path:`${SHOT}/scheme-raytay-${tag}.png`});await p.evaluate(()=>__clean())}
 /* the scan table */
 const X=x=>x&&x.vis&&x.inView&&x.onTop&&x.n===1&&x.head?'✕':'NO '+JSON.stringify(x);
 console.log('\n| caller | rules ✕ | Hướng dẫn ✕ | play ✕ | result ✕ | rules ✕ goes to | play ✕ goes to | cost/stake effect |');console.log('|---|---|---|---|---|---|---|---|');
 for(const [l,r,m] of rows)console.log(`| ${l} | ${X(r.x_rules)} | ${r.x_tut?X(r.x_tut):'–'} | ${X(r.x_play)} | ${X(r.x_res2||r.x_res)} | ${r.cf_rules?'confirm → ':''}${r.after_rules&&r.after_rules.res?'own result: '+(r.after_rules.resTxt||'').replace(/\s+/g,' ').slice(0,50):r.after_rules&&!r.after_rules.open?'closed (back)':'?'} | ${r.cf_play?'confirm → ':''}${r.after_play&&r.after_play.res?'own result: '+(r.after_play.resTxt||'').replace(/\s+/g,' ').slice(0,50):'?'} | ${m.cost} → ${m.back} |`);
 console.log(`| Thử tay (mgcal) | ${X(cal.rules_x)} | ${X(cal.tut_x)} | ${X(cal.play_x)} | ${X(cal.mid_x)} | kind list, no confirm | confirm → kind list | nothing at stake; kind not saved |`);
 console.log('');
 const bad=f=>rows.filter(([l,r])=>!f(l,r)).map(([l,r])=>l+' '+JSON.stringify(r).slice(0,260));
 const XV=x=>x&&x.vis&&x.inView&&x.onTop&&x.n===1&&x.head&&x.label==='Quay lại';
 let B=bad((l,r)=>XV(r.x_rules)&&(!r.x_tut||XV(r.x_tut))&&XV(r.x_play)&&(XV(r.x_res2)||XV(r.x_res)));ok(!B.length,'1 one kit ✕ «Quay lại» in the header on rules / Hướng dẫn / play / result (every caller)',B);
 B=bad((l,r)=>/Chải chuốt|Tu đức/.test(l)?(!r.cf_rules&&!r.after_rules.open):(!r.cf_rules&&r.after_rules.open&&r.after_rules.res));ok(!B.length,'3 rules ✕ → NO confirm → the caller\'s own give-up result at once (Chải chuốt, Tu đức: straight back, nothing spent)',B);
 B=bad((l,r)=>!r.cf_play&&r.after_play&&r.after_play.open&&r.after_play.res&&!r.after_play.run);ok(!B.length,'4 play ✕ → no confirm → the caller\'s own result screen, board stopped',B);
 B=bad((l,r)=>{const a=r.after_res2;return a&&(/khảo hạch/.test(l)?(a.open&&/Môn 2/.test(a.title)):!a.open&&(/(Tu đức|Nghiệm thân|mưu kế|Chải chuốt)/.test(l)||a.done.length===1))});ok(!B.length,'4 ✕ on the give-up result = its «Đã hiểu» (frame closes, onDone once; khảo hạch: the next subject)',B);
 B=rows.filter(([l,r])=>r.after_play&&/\d+\/10/.test(r.after_play.resTxt)&&!/(^|\D|Môn \d)0\/10/.test(r.after_play.resTxt)).map(([l,r])=>l+' '+r.after_play.resTxt);ok(!B.length,'4 the give-up result reads 0/10 where the caller shows a score',B);
 ok(!cal.err&&XV(cal.list_x)&&cal.noThoi&&XV(cal.rules_x)&&cal.rules_back&&XV(cal.tut_x)&&cal.tut_back&&XV(cal.play_x)&&cal.playing&&!cal.play_cf&&cal.play_back&&XV(cal.mid_x)&&cal.mid_nx&&cal.mid_back&&!cal.dan0&&!cal.dan1&&cal.list_close,'2 Thử tay: ✕ → kind list from rules / Hướng dẫn / play (no confirm) / between rounds; kind not saved; ✕ closes the list',cal);
 {const L=Object.keys(pre).filter(k=>typeof pre[k]==='object'&&pre[k]&&'ok' in pre[k]);const B2=L.filter(k=>!pre[k].ok).map(k=>k+' '+JSON.stringify(pre[k]));
  ok(L.length>=9&&!B2.length,'6 before «Sẵn sàng»: ✕ = free back, no confirm, nothing spent (Sức, bạc, phí, khắc, vật liệu identical) — jtd, j83 (dialog + deck card), jrcp, jveil, jsgame pay',B2);
  ok(L.filter(k=>!/jtd|thẻ/.test(k)).every(k=>pre[k].remembered),'6b the charge is only REMEMBERED on the rules screen (nothing spent, spend() never ran, S→rivals refs identical)',L.map(k=>k+':'+pre[k].remembered+'/sp'+pre[k].spends+'/refs'+pre[k].refs));
  ok(pre.goRemember&&pre.goPaid&&pre.sgPaid,'6c «Sẵn sàng» takes the remembered charge (lesson: Sức + 2 khắc join jaudit\'s pending cost; paid scheme: spend now)',{goRemember:pre.goRemember,goPaid:pre.goPaid,goPend:pre.goPend,sgPaid:pre.sgPaid,e:[pre.goErr,pre.sgErr2]});
  ok(pre.sgRes&&!pre.sgAsk&&pre.sgRan===1&&pre.sgClosed,'7 jsgame result: ✕ = «Ra tay» at once, no «Ra tay?» confirm (runs once)',pre)}
 const kcf=await p.evaluate(()=>window.__kcfN||0);ok(kcf===0,'no kitConfirm was opened by any ✕ in the whole run',{kitConfirm:kcf});
 ok(!errs.length,'5 no page errors',errs.slice(0,5));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`PASS ${res.length}/${res.length}`);process.exit(f?1:0)})();
