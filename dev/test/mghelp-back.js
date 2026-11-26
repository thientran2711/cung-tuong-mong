/* mghelp-back (E95, owner OD 26/11 ~01:25Z) — node dev/test/mghelp-back.js [dev/index.html] [WxH] [shotdir]
   Owner (verbatim): "PHẦN THI KHẢO HẠCH, TÔI BẤM VÀO HƯỚNG DẪN ĐỂ XEM HƯỚNG DẪN MINI GAME, BẤM QUAY LẠI THÌ PHẦN THI 0 ĐIỂM LUÔN"
   Rule: opening any mini-game's «Hướng dẫn» then Back / ✕ / Esc / tap outside PAUSES the round and RETURNS to it unchanged — never ends it, never scores 0.
   Whole family = every caller that dresses its first screen with kgReady (KIT §13.7): exams, contests, practice, lessons, care games, toilette, schemes.
   Per caller, per close path (kgback ✕ «Quay lại» / dialog ✕ / Esc / tap outside / «Về luật chơi»):
     1 «Hướng dẫn» runs (KG82.tut)   2 after the close: tutorial off, the SAME rules screen back («Sẵn sàng» present), frame still open
     3 nothing scored: onDone not called, no result screen, exam raws unchanged   4 S unchanged (JSON, minus ambient S.pcx)
     5 «Sẵn sàng» afterwards still starts the real round (phase play / board present)   6 no page errors
   Prints the scan table (caller | path | before (main 5e013076) | after). */
const {chromium}=require('playwright');const path=require('path');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const [VW,VH]=(process.argv[3]||'755x1000').split('x').map(Number);const SHOT=process.argv[4]||'';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:SHOT?2:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
  const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.ap=9;try{render()}catch(e){}
  const sleep=t=>new Promise(r=>setTimeout(r,t));window.__sleep=sleep;
  window.__clean=()=>{document.querySelectorAll('body>*>.kmst').forEach(e=>e.parentElement.remove());document.querySelectorAll('#klife,#kmrew').forEach(e=>e.remove())};
  window.__SJ=()=>JSON.stringify(Object.assign({},S,{pcx:undefined,mg:undefined}));
  /* where the guided round lives: the game frame (#kg82) or a care game inside #modal */
  window.__tutBox=()=>{const t=KG82.tut;return t&&t.el?t.el:null};
  window.__rulesBtn=()=>{const L=[...document.querySelectorAll('.kgr-go')].filter(x=>x.offsetParent);return L[0]||null};
  window.__tutBtn=()=>{const L=[...document.querySelectorAll('#kgrtut')].filter(x=>x.offsetParent);return L[0]||null};
  window.__paths={
   kgback:()=>{const x=document.querySelector('#kg82 .kit-x[data-kitx=kgback]');if(!x)return false;x.click();return true},
   panelx:()=>{const t=__tutBox();const M=document.getElementById('modal');if(!t||!M||!M.contains(t))return false;const x=[...M.querySelectorAll('.kit-x,#mclose')].find(e=>e.offsetParent&&!t.contains(e));if(!x)return false;x.click();return true},
   esc:()=>{document.dispatchEvent(new KeyboardEvent('keydown',{key:'Escape',bubbles:true}));return true},
   outside:()=>{const t=__tutBox();const M=document.getElementById('modal');const ov=document.getElementById('ov');const L=(M&&!M.hidden&&t&&M.contains(t))?M:ov;if(!L||L.hidden)return false;
    const o={bubbles:true,cancelable:true,clientX:3,clientY:3};L.dispatchEvent(new PointerEvent('pointerdown',o));L.dispatchEvent(new MouseEvent('click',o));return true},
   vlc:()=>{const x=document.getElementById('kgtback');if(!x)return false;x.click();return true}};
  window.__one=async(src,path,o)=>{o=o||{};const r={path};__clean();S.ap=9;S.suc=100;window.__done=[];const E={};window.__E=E;
   try{(0,eval)(src)}catch(e){r.err='open:'+e.message;return r}await sleep(o.wait||1200);if(o.pre){try{await (0,eval)(o.pre)}catch(e){r.err='pre:'+e.message;return r}await sleep(600)}
   const tb=__tutBtn();r.tutBtn=!!tb;if(!tb){try{kg82Close()}catch(e){}try{closeModal()}catch(e){}return r}
   const S0=__SJ(),raws0=JSON.stringify((E.pend||{}).raws||null);tb.click();await sleep(1500);r.tutOn=!!KG82.tut;
   r.did=__paths[path]();await sleep(900);
   r.tutOff=!KG82.tut;r.rules=!!__rulesBtn();r.frame=!!(document.getElementById('kg82')||document.querySelector('#modal:not([hidden]) .kgame'));
   const rs=document.getElementById('kg82box-res');r.res=!!(rs&&!rs.hidden&&rs.innerHTML.length>0);r.done=window.__done.length;r.rawsSame=JSON.stringify((E.pend||{}).raws||null)===raws0;r.Ssame=__SJ()===S0;
   if(!r.Ssame){const a=JSON.parse(S0),c=JSON.parse(__SJ());r.Sdiff=Object.keys(Object.assign({},a,c)).filter(k=>JSON.stringify(a[k])!==JSON.stringify(c[k])).slice(0,6)}
   /* «Sẵn sàng» still starts the real round */
   const go=__rulesBtn();if(go&&o.play!==false){go.click();await sleep(1200);r.playOk=KG82.phase==="play"||(typeof PETC!=="undefined"&&PETC.rdy)||KG82.phase==="setup"||!!document.querySelector('#kg82 canvas,#modal .kgame canvas,#kg82box [data-kgcell],#kg82box button:not(.kgr-go)')}
   __clean();try{kg82Close()}catch(e){}try{const M=document.getElementById('modal');if(M&&!M.hidden){Q.length=0;closeModal()}}catch(e){}await sleep(200);return r}});
 await p.waitForTimeout(3000);
 const v=`(liveRivals(true)[0])`;const D='(x)=>window.__done.push(x===undefined?"cb":x)';
 const C=[
  ['jexam khảo hạch',`exRun(exPlan(S),window.__E,${D})`,{}],
  ['startContest hội thi',`startContest({art:"dan",title:"Hội Thượng nguyên",onDone:${D}})`,{}],
  ['playArt tự học',`playArt({art:"mua",title:"Tự học",onDone:${D}})`,{}],
  ['jmgcal Thử tay','mgCalRun("dan")',{}],
  ['jentry tuyển chọn',`kcEntryExam("dan",${D},{})`,{}],
  ['jslap Tát',`slapGame({dodge:false,by:${v},title:"Giáng tay",rows:[],go:"Tát",skip:"Tát luôn",skipSub:"",onDone:${D}})`,{}],
  ['jtd Tu đức','(TDS.busy=false,S.mg=null,tdPlay("cong","self"))',{}],
  ['jts Hoàng thượng triệu',`tsGame({kind:"duho",odds:50,onDone:${D}})`,{}],
  ['j92 Chải chuốt','(can(1)||(S.ap=9),wdGroomUI())',{}],
  ['jsgame mưu kế',`sgPlay({G:SG.K.rumor,art:"Mưu kế",v:${v},p0:()=>50,run:${D},cost:""})`,{}],
  ['jroute Nghiệm thân',`rtNgSleight("alum",3,${D})`,{}],
  ['jpetcare Chăm thú',`(S.petTip=1,S.rank=3,S.pets=[],petAdd(S,'meo','x','buy'),S.petOn=0,Q.length=0,document.getElementById('modal').hidden=true,petcOpen(0))`,{pre:`(()=>{const b=[...document.querySelectorAll('#kpcare button')].find(x=>x.offsetParent&&/Cho ăn|Tắm|Chơi|Vuốt/.test(x.textContent));if(b)b.click()})()`}],
 ];
 const PATHS=['kgback','panelx','esc','outside','vlc'];const rows=[];
 for(const [label,src,o] of C){for(const pa of PATHS){let r;try{r=await p.evaluate(([s,pa,o])=>window.__one(s,pa,o),[src,pa,o])}catch(e){r={err:String(e.message).slice(0,160)}}
  if(r.did===false)continue;/* that close path does not exist for this caller (e.g. no dialog ✕ around a #kg82 frame) */
  rows.push([label,pa,r]);
  if(!r.tutBtn){ok(false,`${label}: «Hướng dẫn» button present`,r);break}
  const good=r.tutOn&&r.tutOff&&r.rules&&r.frame&&!r.res&&!r.done&&r.rawsSame&&r.Ssame;
  ok(good,`${label} · ${pa}: guided round → back to the same rules screen, nothing scored / ended / changed`,good?undefined:r);
  if(r.playOk!==undefined)ok(r.playOk,`${label} · ${pa}: «Sẵn sàng» afterwards starts the real round`)}}
 if(SHOT){await p.evaluate(async([s])=>{__clean();window.__E={};(0,eval)(s);await __sleep(1200);__tutBtn().click();await __sleep(1500)},[C[0][1]]);await p.screenshot({path:SHOT+'/mghelp-tut-'+VW+'.png'});
  await p.evaluate(async()=>{__paths.kgback();await __sleep(900)});await p.screenshot({path:SHOT+'/mghelp-back-'+VW+'.png'})}
 ok(errs.length===0,'no page errors',errs.slice(0,3));
 console.log('\nSCAN TABLE (caller | close path during «Hướng dẫn» | after this branch)');
 rows.forEach(([l,pa,r])=>console.log(`| ${l} | ${pa} | ${r.err?'ERR '+r.err:(r.tutOff&&r.rules&&!r.res&&!r.done&&r.rawsSame&&r.Ssame?'back to rules, unchanged':'BAD '+JSON.stringify(r))} |`));
 const n=res.filter(x=>!x).length;console.log(`\n${res.length-n}/${res.length} ok`);await b.close();process.exit(n?1:0)})();
