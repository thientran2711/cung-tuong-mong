/* mg-ready-guide (owner OD 20/11 ~00:20Z, KIT §13.7) — node dev/test/mg-ready-guide.js [dev/index.html] [WxH]
   Owner: "Vừa mới vào game các bạn đã bắt đầu trừ giờ của tôi là không có được ... khi nào tôi ready thì tôi bấm sẵn sàng rồi bắt đầu mới trừ giờ ...
   thêm cả cho tôi có option là hướng dẫn". For EVERY mini-game kind (all KG82_KIND) and EVERY caller (playArt, startContest, Thử tay mgCalRun, khảo hạch exRun,
   tuyển chọn kcEntryExam, Tát slapGame, Tu đức tdPlay, Hoàng thượng triệu tsGame, Chải chuốt wdGroomUI, mưu kế sgPlay, Nghiệm thân rtNgSleight, j5 openMG fallback):
   1 the first screen is the shared rules block (.kgr: Môn / Luật or steps + the picture of the move), the start button reads «Sẵn sàng», «Hướng dẫn» beside it
   2 before «Sẵn sàng»: no engine, no canvas, no KG82.run, the kit clock chip hidden, the HUD time unchanged after 1.5 s (no clock ticking)
   3 «Hướng dẫn»: the same engine runs (guided round), the ghost hand shows a move (.kgt-hand.on) from the engine's KG82.peek, no clock chip, unscored:
     S is byte-identical after it (nothing saved, no khắc / bạc / stat), KG82.tier / lv put back; «Về luật chơi» (or the round's own end) brings back the SAME rules
     screen (buttons still work), repeatable
   4 a guided round played by following the hand ends by itself and returns to the rules screen (rhythm, aim, go, pattern, steps, lamp)
   5 «Sẵn sàng» starts the real play exactly as before (KG82.phase play / engine running)
   6 no page errors. Prints the before/after scan table (every kind × caller). */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const [VW,VH]=(process.argv[3]||'755x1000').split('x').map(Number);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
  const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.ap=9;try{render()}catch(e){}
  /* the in-page checker: open(src) → the first screen, the idle check, the guided round, back, «Sẵn sàng» */
  window.__rg=async(src,o)=>{o=o||{};const sleep=t=>new Promise(r=>setTimeout(r,t));const r={};
   try{kg82Close()}catch(e){}Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;
   try{(0,eval)(src)}catch(e){r.openErr=String(e.message||e);return r}
   await sleep(o.wait||900);
   const box=o.j5?document.getElementById('mgb'):kg82Box();if(!box){r.nobox=1;return r}
   const go=box.querySelector('.kgr-go');r.rules=!!box.querySelector('.kgr .kpst')&&/Luật chơi/.test(box.querySelector('.kgr .kpst').textContent)&&!!box.querySelector('.kgr .kpst .kfx')&&!box.querySelector('.kgr .kgr-demo');
   r.luat=!!box.querySelector('.kgr .kpst .kfx')&&!box.querySelector('.kgr .kb');r.go=go?go.firstChild.textContent.trim():null;r.tutBtn=!!box.querySelector('#kgrtut');
   const clk=()=>{const c=document.querySelector('.kgame .kgclk');return !c||c.hidden};const tv=()=>{const e=document.querySelector('#kg82 [data-kg="time"]');return e?e.textContent:""};
   const idle=()=>KG82.phase!=='play'&&!KG82.run&&!box.querySelector('canvas')&&clk()&&!(o.j5&&!mgDone&&typeof mgStop==='function'&&mgStop);
   r.idle0=idle();const t0=tv();await sleep(1500);r.idle1=idle()&&tv()===t0;
   if(r.tutBtn&&!o.noTut){const SJ=()=>JSON.stringify(Object.assign({},S,{pcx:undefined}))/* S.pcx = palace-chatter no-repeat memory, an ambient timer of the page, not the mini-game */,S0=SJ(),T0=JSON.stringify(KG82.tier),L0=KG82.lv;
    box.querySelector('#kgrtut').click();await sleep(50);r.tutOn=!!KG82.tut&&!!document.querySelector('.kgt-bar');let hand=false,eng=false,clkT=true,end=performance.now()+(o.tutMs||15000);
    /* a player following the hand: taps the point / button the ghost hand shows (drags and holds are only watched) */
    let nx=0;const tap=()=>{const hh=KG82.hint&&KG82.hint();const pk=hh&&hh.soon?{x:hh.x,y:hh.y}:KG82.peek&&KG82.peek();const now=performance.now();if(!pk||now<nx)return;
     if(pk.sel&&!pk.hsel){const el=document.querySelector(pk.sel);if(el)el.click()}else if(!pk.drag&&pk.hold==null&&Number.isFinite(pk.x)){let el=null;const cvs=[...box.querySelectorAll('canvas')].find(c=>{const q=c.getBoundingClientRect();return pk.x>=q.left&&pk.x<=q.right&&pk.y>=q.top&&pk.y<=q.bottom});el=cvs||document.elementFromPoint(pk.x,pk.y);/* the board itself (a test-only reward pop-up may lie over it) */
      if(el&&!el.closest('.kgt-hand'))el.dispatchEvent(new PointerEvent('pointerdown',{clientX:pk.x,clientY:pk.y,pointerType:'touch',isPrimary:true,bubbles:true,cancelable:true}))}nx=now+120};
    while(performance.now()<end&&KG82.tut){await sleep(o.play?8:80);if(document.querySelector('.kgt-hand.on'))hand=true;if(box.querySelector('canvas')||box.children.length)eng=true;if(!clk())clkT=false;
     if(o.play){tap();if(performance.now()>end-100)break}else if(hand&&performance.now()>end-o.tutMs+2500)break}
    r.tutHand=hand;r.tutEng=eng;r.tutClock=clkT;r.selfEnd=false;
    if(o.play){const e2=performance.now()+4000;while(KG82.tut&&performance.now()<e2)await sleep(100);r.selfEnd=!KG82.tut}
    if(KG82.tut){const bk=document.getElementById('kgtback');if(bk)bk.click()}await sleep(200);
    r.back=!KG82.tut&&!!box.querySelector('.kgr-go')&&!!box.querySelector('#kgrtut')&&!document.querySelector('.kgt-hand')&&!document.querySelector('.kgt-bar');
    r.unsaved=SJ()===S0;if(!r.unsaved){const a=JSON.parse(S0),c=S;r.diff=Object.keys(c).filter(k=>JSON.stringify(c[k])!==JSON.stringify(a[k])).slice(0,6)}
    r.tierBack=JSON.stringify(KG82.tier)===T0&&KG82.lv===L0;r.idle2=idle()}
   const g2=box.querySelector('.kgr-go');if(g2){g2.click();await sleep(o.playWait||2200);r.play=KG82.phase==='play'||!!KG82.run||!!box.querySelector('canvas')||(o.j5&&!mgDone)}
   try{if(o.j5){if(typeof mgStop==='function'&&mgStop)mgStop();mgStop=null;mgDone=true;document.getElementById('ov').hidden=true}else kg82Close()}catch(e){}
   return r}});
 await p.waitForTimeout(4000);/* the stat-change log of the setup above lands before any snapshot */
 const rows=[];const run=async(label,src,o)=>{let r;try{r=await p.evaluate(([s,o])=>window.__rg(s,o),[src,o||{}])}catch(e){r={err:String(e.message).slice(0,120)}}rows.push([label,r]);return r};
 /* 1–5 every kind (playArt; Cắm hoa by startContest: the plain art key "hoa" is Vẽ in playArt) */
 const kinds=await p.evaluate(()=>Object.keys(KG82_KIND).map(k=>[k,KG82_KIND[k].e]));
 const PLAY={rhythm:1,aim:1,go:1,pattern:1,steps:1,lamp:1};
 for(const [k,e] of kinds){const src=k==='hoa'?`startContest({art:"hoa",title:"Hội thi",onDone:()=>{}})`:k==='chai'?`(can(1)||(S.ap=9),wdGroomUI())`:`playArt({art:${JSON.stringify(k)},onDone:()=>{}})`;
  await run(`kind ${k} (${e})`,src,{play:!!PLAY[e],tutMs:PLAY[e]?50000:15000})}
 /* every caller */
 const v=`(liveRivals(true)[0])`;
 await run('caller startContest','startContest({art:"dan",title:"Hội Thượng nguyên",onDone:()=>{}})');
 await run('caller playArt','playArt({art:"mua",title:"Tự học",onDone:()=>{}})');
 await run('caller mgcal Thử tay','mgCalRun("dan")');
 await run('caller jexam khảo hạch','exRun(exPlan(S),{},()=>{})');
 await run('caller jentry tuyển chọn','kcEntryExam("dan",()=>{},{})');
 await run('caller jslap Tát',`slapGame({dodge:false,by:${v},title:"Giáng tay",rows:[],go:"Tát",skip:"Tát luôn",skipSub:"",onDone:()=>{}})`);
 await run('caller jtd Tu đức','(TDS.busy=false,S.mg=null,tdPlay("cong","self"))');
 await run('caller jts Hoàng thượng triệu','tsGame({kind:"duho",odds:50,onDone:()=>{}})');
 await run('caller j92 Chải chuốt','(can(1)||(S.ap=9),wdGroomUI())');
 await run('caller jsgame mưu kế',`sgPlay({G:SG.K.rumor,art:"Mưu kế",v:${v},p0:()=>50,run:()=>{},cost:""})`);
 await run('caller jroute Nghiệm thân','rtNgSleight("alum",3,()=>{})');
 await run('caller j5 openMG (fallback)','(S.mg=null,openMG("cam",1,()=>{}))',{j5:1,noTut:1});
 /* 7 jmgcal (owner bug 20/11, ROOT-72): the kind is kept the moment round n's raw arrives (before «Xem mức tay»); an unfinished kind never reaches the code */
 const cal=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const k0=kg82Play;const o={};
  kg82Play=(kind,onEnd)=>setTimeout(()=>onEnd(7),30);/* the board itself is tested above; here only the save */
  try{const n=BAL.ag.mg2.cal.d.length;const has=k=>new RegExp("(^| )"+k+":").test(mgCalCode());o.ve0=has("ve");o.mua0=has("mua");
   mgCalRun("mua");for(let i=0;i<n-2;i++){await sleep(200);document.getElementById("kg82go").click();await sleep(200);const b=(document.getElementById("mgcal-nx")||document.getElementById("kg82ok"));if(b&&i<n-3)b.click()}
   await sleep(200);kg82Close();o.partial=has("mua");
   mgCalRun("ve");for(let i=0;i<n;i++){await sleep(200);document.getElementById("kg82go").click();await sleep(250);if(i<n-1)(document.getElementById("mgcal-nx")||document.getElementById("kg82ok")).click()}
   o.lastBtn=((document.getElementById("mgcal-nx")||document.getElementById("kg82ok"))||{}).textContent;o.kept=has("ve");kg82Close();await sleep(100);o.keptAfterLeave=has("ve")}catch(e){o.err=String(e.message||e)}finally{kg82Play=k0}
  return o});
 console.log(JSON.stringify(cal));
 /* the scan table */
 console.log('\n| kind / caller | before (main) | after: rules | Sẵn sàng | Hướng dẫn | idle 1.5 s | guided: hand | unscored | back | self-end | play on Sẵn sàng |');
 console.log('|---|---|---|---|---|---|---|---|---|---|---|');
 for(const [l,r] of rows)console.log(`| ${l} | clock/board start on the first tap, no rules screen, no tutorial | ${r.rules?'yes':'NO'} | ${r.go==='Sẵn sàng'?'yes':'NO ('+r.go+')'} | ${r.tutBtn?'yes':(/j5/.test(l)?'n/a (fallback, no hint hook)':'NO')} | ${r.idle0&&r.idle1?'yes':'NO'} | ${r.tutBtn?(r.tutHand?'yes':'NO'):'–'} | ${r.tutBtn?(r.unsaved&&r.tierBack?'yes':'NO '+JSON.stringify(r.diff||'')):'–'} | ${r.tutBtn?(r.back?'yes':'NO'):'–'} | ${r.selfEnd?'yes':'–'} | ${r.play?'yes':'NO'} |`);
 console.log('');
 const bad=f=>rows.filter(([l,r])=>!f(l,r)).map(([l,r])=>l+' '+JSON.stringify(r).slice(0,160));
 ok(kinds.length>=31,'every KG82_KIND kind listed',{n:kinds.length});
 let B=bad((l,r)=>r.rules&&r.go==='Sẵn sàng'&&(r.tutBtn||/j5/.test(l)));ok(!B.length,'1 first screen = shared rules block + «Sẵn sàng» + «Hướng dẫn» (every kind, every caller)',B);
 B=bad((l,r)=>r.idle0&&r.idle1);ok(!B.length,'2 no engine / canvas / clock before «Sẵn sàng» (HUD time still after 1.5 s)',B);
 B=bad((l,r)=>!r.tutBtn||(r.tutOn&&r.tutEng&&r.tutHand&&r.tutClock));ok(!B.length,'3 «Hướng dẫn» runs the same engine with the ghost hand, no clock chip',B);
 B=bad((l,r)=>!r.tutBtn||(r.unsaved&&r.tierBack&&r.back&&r.idle2));ok(!B.length,'3 guided round unscored (S identical, tier back) and back on the same rules screen',B);
 B=rows.filter(([l])=>/\((rhythm|aim|go|pattern|steps|lamp)\)/.test(l)).filter(([l,r])=>!r.selfEnd).map(([l])=>l);ok(!B.length,'4 a round played by following the hand ends by itself and returns to the rules',B);
 B=bad((l,r)=>r.play);ok(!B.length,'5 «Sẵn sàng» starts the real play',B);
 ok(!errs.length,'6 no page errors',errs.slice(0,5));
 ok(!cal.err&&!cal.ve0&&!cal.partial&&/Xem mức tay/.test(cal.lastBtn||'')&&cal.kept&&cal.keptAfterLeave,'7 Thử tay: kind saved when round n ends (before «Xem mức tay», kept after leaving); an unfinished kind is not in the code',cal);
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`PASS ${res.length}/${res.length}`);process.exit(f?1:0)})();
