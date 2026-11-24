/* DAYQ-2 (owner 24/11 ~22:02Z real, item (1), shot dev/handover/refs/owner-2411-viecnho/v9.jpg) — NOTHING STARTS INSIDE AN ACTIVITY.
   Her path: she taps «Điểm trang» (1 khắc) → the khắc turns → a visitor («Quý phi … lặng lẽ tiến lại», jdfv stage «say» scene) played BEHIND the
   mini-game intro before she pressed «Sẵn sàng». Rule: no visitor / event card or scene starts or renders while she is inside an activity; it
   waits until she finishes, then shows unchanged.
   Matrix (every activity × every khắc event route), real render, Fold 755x1000@2 + iPad 1180x820@2:
     activities: A1 Điểm trang intro (her tap; the card arrives INSIDE the same tap's spend; finished = mirror + its result scene closed) · A2 j5 mini-game (openMG) · A3 kit reward scene
                 (kitGain «Nhận» via kmPush) · A4 the person view she opens herself (jdfv dfOpen) · A5 podium (kitPodiumShow)
     sources:    S1 a visitor who stands with her (jgreet gmCard, real; jdfv stage scene route) · S2 j24 approaches() (buổi-turn visitors, real;
                 may yield none) · S3 a released j68 held event (evRelease's own push + showModal) · S4 any other queued card (timer) ·
                 S5 a new kit motion scene (kmPush) during a mini-game screen.
   Per case: while the activity is open (0.4 s and 2 s) no card is painted (#modal hidden, no jdfv encounter) and no new scene starts;
   after she finishes it the card is on screen (centre card or the stage scene) / the scene runs. 0 page errors.
   usage: node dev/test/dayq-hold.js <baseURL> <path> [shotDir]   e.g. http://127.0.0.1:8771 dev/index.html /home/user/wt/dayq2-s/hold */
const {chromium}=require('playwright');const fs=require('fs');const [,,BASE,PATH,OUT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const VP=[[755,1000,2],[1180,820,2]];
const NEWLIFE=`(function(){localStorage.removeItem('hclh-opt');SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){window.__forceOrigin='thd';window.__nlInner=1;start();window.__nlInner=0;if(!(typeof isSrv==='function'&&isSrv()))break}
 quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;return S.name})()`;
/* page helpers */
const H=`(()=>{const hid=el=>Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').get.call(el);
 window.__T={hid,
  clean(){window.__s5='';document.querySelectorAll('.kmov,#klife,#kmrew,#kpodov').forEach(e=>e.remove());try{KMQ.length=0;kmBusy=false}catch(e){}Q.length=0;const m=document.getElementById('modal');if(m)hid(m)||(m.hidden=true);
   const d=document.getElementById('dawn');if(d){d.hidden=true;d.className='dawn';d.innerHTML=''}document.body.classList.remove('kbk-open');try{if(DF.F)DF.F.destroy();dfClosed(DF.tk)}catch(e){}
   const ov=document.getElementById('ov');if(ov&&!hid(ov)){try{kg82Close(true)}catch(e){}ov.hidden=true}try{S.mg=null}catch(e){}if(window.tab!=='act'){try{setTab('act')}catch(e){}}render()},
  card(){const M=document.getElementById('modal');return !hid(M)||!!(window.DF&&DF.encM&&DF.F)},
  scene(){return [...document.querySelectorAll('.kmov:not(.km-out)')].filter(e=>e.dataset.tst).length},
  ovOpen(){const ov=document.getElementById('ov');return !!ov&&!hid(ov)},
  /* a rival who stands here with a stage picture, known to her (her name on the say box) */
  here(){const P=curPeople();for(let i=0;i<P.length;i++){const p=P[i];if(p.ref&&rivals.includes(p.ref)&&dfHasFig(i)){try{k61Know(p.ref,'',true,2)}catch(e){}return p.ref}}return null},
  any(){return rivals.find(v=>v.alive!==false&&!v.out)},
  src(k){/* push one card of source k (returns its title or '') */
   if(k==='S1'){const v=__T.here()||__T.any();const c=gmCard(v);if(!c)return'';delete c.ev;c.must=1;Q.push(c);showModal();return 'gm:'+c.t+(__T.here()===v?'@stage':'')}
   if(k==='S2'){const n=Q.length;try{approaches()}catch(e){}if(Q.length>n){Q.slice(n).forEach(m=>{m.must=1});showModal();return 'ap:'+Q[n].t}
    const v=__T.any();Q.push({t:'Có người đến',must:1,who:pv(v),h:'<p>'+v.name+' tiến lại.</p>',opts:[{n:'Khéo cáo lui',fx:{},x:'',go:()=>{}}]});showModal();return 'ap:fallback'}
   if(k==='S3'){const v=__T.any();const m={t:'Việc khó xử',__held:1,must:1,h:'<p>'+v.name+' nhờ ta một việc.</p>',opts:[{n:'Từ chối',fx:{},x:'',go:()=>{}}]};Q.push(m);showModal();return 'evhold'}
   if(k==='S4'){Q.push({t:'Tin báo',must:1,h:'<p>Có tin từ Nội vụ phủ.</p>'});showModal();return 'card'}
   if(k==='S5'){kmPush(fin=>{const d=document.createElement('div');d.className='kmov';d.dataset.tst='1';d.style.cssText='position:fixed;inset:20%;z-index:9999;background:#fff';d.innerHTML='<button class="tstend">x</button>';document.body.appendChild(d);if(__T.ovOpen())window.__s5bad=1;window.__s5=(window.__s5||'')+' start@'+(__T.ovOpen()?'ov':'free');d.querySelector('button').onclick=()=>{d.remove();fin()}});return 'km'}},
  answer(){for(let k=0;k<20&&Q.length;k++){const m=Q[0];if(m.opts&&m.opts.length){const i=m.opts.findIndex(o=>!o.off&&!(o.fx&&o.fx.bac&&S.bac+o.fx.bac<0));chooseM(i<0?0:i)}else closeModal()}
   try{if(DF.F){DF.F.destroy();dfClosed(DF.tk)}}catch(e){}document.querySelectorAll('.kmov[data-tst]').forEach(e=>{const b=e.querySelector('button');b&&b.click()})}};return 1})()`;
/* open activity a; return a short tag */
const OPEN={
 A1:null,/* her tap: done in the runner (the card arrives inside the same tap) */
 A2:`(()=>{openMG('ky',1,()=>{S.mg=null;render()});return 'openMG ky'})()`,
 A3:`(()=>{S.mg=null;wkFinishLesson('vu',{kind:'mua'},60,'tự học');render();return 'kitGain'})()`,
 A4:`(()=>{const P=curPeople();for(let i=0;i<P.length;i++)if(dfHasFig(i)){dfOpen(i);return 'dfOpen '+P[i].name}return ''})()`,
 A5:`(()=>{const L=[{who:S,score:9},{who:rivals[0],score:7},{who:rivals[1],score:5}];const e=kitPodiumShow(L,{title:'Hội thi',next:'Tiếp',onNext:()=>kitPodiumClose()});return e?'podium':''})()`};
const isOpen={A1:`__T.ovOpen()`,A2:`__T.ovOpen()`,A3:`!!document.querySelector('.kmov:not(.km-out):not([data-tst])')`,A4:`!!(DF.F&&!DF.encM)`,A5:`!!document.getElementById('kpodov')`};
(async()=>{const b=await chromium.launch();const rows=[];let fail=0;if(OUT)fs.mkdirSync(OUT,{recursive:true});
 for(const vp of VP){const tag=vp[0]+'x'+vp[1];const c=await b.newContext({serviceWorkers:'block',viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2]});
  const p=await c.newPage();const pe=[];p.on('pageerror',e=>pe.push(e.message.slice(0,160)));await p.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());
  await p.goto(BASE+'/'+PATH);await p.waitForFunction(()=>typeof start==='function'&&!!document.querySelector('#slots button[data-new="1"]'),null,{timeout:60000});await sleep(1500);
  await p.evaluate(()=>localStorage.clear());await p.evaluate(NEWLIFE);await sleep(2500);await p.evaluate(H);
  const ACTS=['A1','A2','A3','A4','A5'],SRC=['S1','S2','S3','S4','S5'];
  for(const A of ACTS)for(const Sx of SRC){
   if(Sx==='S5'&&!['A1','A2'].includes(A))continue;
   if(process.env.ONLY&&!process.env.ONLY.split(',').includes(A+':'+Sx))continue;/* ONLY=A1:S5,A2:S1 (debug) *//* S5 = a new motion scene during a mini-game screen (one scene at a time elsewhere is kmBusy) */
   const r={vp:tag,A,S:Sx,bad:[]};const bad=s=>{r.bad.push(s)};
   await p.evaluate(()=>{__T.clean();/* her first buổi, a fresh khắc budget, the toilette not done today (the Điểm trang tap opens the mirror) */used=0;S.buoi=0;S.toilette=null;render()});await sleep(700);
   await p.evaluate(()=>{document.querySelectorAll('.kmov,#kmrew').forEach(e=>e.remove());try{KMQ.length=0;kmBusy=false}catch(e){}Q.length=0;const m=document.getElementById('modal');m.hidden=true});
   if(A==='A1'){/* her exact tap: the khắc turns inside spend and the card arrives there */
    r.src=await p.evaluate(Sx=>{const s0=spend;spend=function(){const x=s0.apply(this,arguments);spend=s0;window.__srcT=__T.src(Sx);return x};const bt=document.querySelector('[data-k3="toil"],[data-hx="toil"]');if(!bt)return 'no toil button';bt.click();return window.__srcT},Sx);
    r.act='toil';}
   else{r.act=await p.evaluate(OPEN[A]);if(!r.act){r.skip='activity n/a';rows.push(r);continue}await sleep(500);r.src=await p.evaluate(Sx=>__T.src(Sx),Sx)}
   for(const t of [400,1600]){await sleep(t);const st=await p.evaluate(`({open:${isOpen[A]},card:__T.card(),scene:__T.scene(),Q:Q.length})`);
    if(!st.open){bad('activity not open at '+t);break}if(st.card)bad('card painted inside the activity at '+t+' ms');if(st.scene)bad('scene started inside the activity at '+t+' ms')}
   if(OUT&&Sx==='S1'&&(A==='A1'||A==='A4'))await p.screenshot({path:`${OUT}/${tag}-${A}-held.png`});
   /* she finishes the activity */
   await p.evaluate(A=>{if(A==='A1'||A==='A2'){const ov=document.getElementById('ov');for(let k=0;k<8&&!__T.hid(ov);k++){try{if(A==='A1'&&k===0&&typeof toilFinish==='function'){toilFinish(false);continue}}catch(e){}
      const B=[...ov.querySelectorAll('button')].filter(x=>!x.disabled&&x.getBoundingClientRect().width>0&&!x.closest('[hidden]'));const pick=B.find(x=>/mgskip|mgok|kg82skip|kg82ok|kgr-ok/.test(x.id+' '+x.className))||B[B.length-1];if(!pick)break;pick.click()}}
    if(A==='A3'){const b=document.querySelector('.kmov.kfgain .krevok')||[...document.querySelectorAll('.kmov:not([data-tst]) button')].pop();b&&b.click()}
    if(A==='A4'){const x=document.querySelector('.kfoc .kfoc-x');x&&x.click()}
    if(A==='A5'){const B=[...document.querySelectorAll('#kpodov button')];(B.pop()||{click(){}}).click();if(document.getElementById('kpodov'))kitPodiumClose()}},A);
   /* A1: the Điểm trang result may hold more screens; keep tapping its buttons until the mirror is gone */
   for(let k=0;k<14;k++){await sleep(700);const o=await p.evaluate(`${isOpen[A]}||!!document.querySelector('.kmov:not(.km-out):not([data-tst]),#kmrew')`);if(!o)break;
    if(await p.evaluate(()=>{const k=document.querySelector('.kmov:not(.km-out):not([data-tst]),#kmrew');if(!k)return 0;const b=[...k.querySelectorAll('button')].filter(x=>!x.disabled&&x.getBoundingClientRect().width>0).pop();if(b){b.click();return 1}return 2})===2)await p.mouse.click(vp[0]/2,vp[1]/2);await p.evaluate(()=>{const ov=document.getElementById('ov');const B=[...ov.querySelectorAll('button')].filter(x=>!x.disabled&&x.getBoundingClientRect().width>0);(B.find(x=>/ok|Xong|Đã hiểu/i.test(x.id+x.textContent))||B[B.length-1]||{click(){}}).click();
     const kb=[...document.querySelectorAll('.kmov:not([data-tst]) button')].pop();kb&&kb.click()})}
   await sleep(1500);
   const af=await p.evaluate(`({open:${isOpen[A]},card:__T.card(),scene:__T.scene(),Q:Q.map(m=>m.t),st:window.DQ?JSON.stringify(DQ.stat):"",s5:window.__s5||'',km:[typeof KMQ!=="undefined"?KMQ.length:-1,kmBusy?1:0,document.querySelectorAll(".kmov").length].join(",")})`);r.after=af;
   if(af.open)bad('activity still open after finishing');
   if(Sx==='S5'){/* started after she finished (a tap of the finishing steps may already have closed it) */if(!af.scene&&!/start@free/.test(af.s5))bad('held scene did not start after the activity [km '+af.km+af.s5+']')}else if(!af.card&&r.src)bad('held card not shown after the activity (Q '+af.Q.join('|')+')');
   if(OUT&&Sx==='S1'&&(A==='A1'||A==='A4'))await p.screenshot({path:`${OUT}/${tag}-${A}-after.png`});
   await p.evaluate(()=>__T.answer());await sleep(400);
   if(r.bad.length)fail++;rows.push(r)}
  if(pe.length){fail++;rows.push({vp:tag,pageErrors:pe})}
  await c.close()}
 for(const r of rows)console.log(r.pageErrors?`${r.vp} PAGE ERRORS ${JSON.stringify(r.pageErrors)}`:`${r.vp} ${r.A}×${r.S} ${r.skip?'SKIP '+r.skip:(r.bad.length?'FAIL '+r.bad.join('; '):'ok')}  [${r.act||''} · ${r.src||''}]`);
 console.log(fail?`dayq-hold: FAIL ${fail}`:`dayq-hold: PASS ${rows.filter(r=>!r.skip&&!r.pageErrors).length} cases`);await b.close();process.exit(fail?1:0)})();
