/* review/temper-outburst (OD 25/11 ~05:45Z (1) + ~08:05Z «Bộc phát theo tính cách là phải làm»; temper-design (b) + (e) G1 / G2), REAL TAPS (dev/test/realtap.js).
   usage: node dev/test/temper-outburst.js <build url|file> <outdir> [WxH@dpr,...]   (default: Fold 755x1000@2, iPad 1180x820@2, phone 390x844@3)
   Set-up (state only) by page.evaluate; every CHOICE is made by real finger taps on the option card (rt.choose: lift → ✓), never .click() / a game call.
   cases:
    hot    — a hot her (Kiêu ngạo), furious: jemoact eaMeOut → kit event frame with 2..BAL.ea.pick.n options, NO «Tiếp tục» / «Nhịn», every row shows
             its gain and loss (Được / Tốn / Mất / Kèm); tap «Đập đồ» → Bạc −fx.bac, Danh −fx.danh exactly as shown, tâm trạng +pick.vent (asserted: Δ ≥ vent − 1, real feelings set — review N2), the dialog closes.
    timid  — a timid her (Khiêm nhường): the angry options are the timid set (no Đập đồ / Đánh / Phạm thượng; Nuốt giận chép kinh offered); tap it → Sức −13 Đức +1.
    jfeel  — the LIVE path (jfeel feelActTick, BAL.feel.act): a heavy anger cause (mkAdd) + bar past the line → the same choice frame (eaOut flag); tap the first row.
    npc    — law 1: an NPC consort's outburst (eaPick) is one of HER option list for the same temper / feeling (eaOpts), 40 draws.
    cap    — G1 / G2: Danh spent to the yearly cap → no option that costs Danh; Phạm thượng inside phamCd → not offered.
    old    — an old save (S.ea without eaC, NPCs without eaC) opens the choice with no error.
   Checks per case: no page error, no horizontal overflow, the case's expectation (ok). Shots to <outdir> (never git). Exit 1 on any failure. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');const RT=require('./realtap.js');
const [,,URL0,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
(async()=>{const b=await chromium.launch();let bad=0;const all={};
 for(const sz of (SIZES||"755x1000@2,1180x820@2,390x844@3").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const res={},errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr||1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  const tl=[];const rt=RT.make(p,{dev:wh,shots:OUT,log:x=>{if(x.k!=='tap')tl.push(x)}});
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,.kroul,.kmov{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&typeof eaOpts==='function'&&window.__ctmBuilt===1,null,{timeout:90000});
  /* a fresh life (setup), dialogs cleared */
  const fresh=async(net)=>{for(let k=0;k<60;k++){await p.evaluate(()=>{const f=()=>document.querySelectorAll(".krskip").forEach(b=>b.click());window.__skipI=window.__skipI||setInterval(f,300);SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});
    await p.waitForFunction(()=>typeof S!=='undefined'&&!!S&&!!S.name&&window.__kroulStep==null,null,{timeout:30000});if(!await p.evaluate(()=>typeof isSrv==='function'&&isSrv()))break}
   await p.waitForTimeout(400);await p.evaluate((net)=>{Q.length=0;/* set-up: the opening life cards and the finished roulette / motion layers (jdayq dqActEl would hold every card under them) */document.querySelectorAll('.kmov,[id^="kroul"],.kroul-ov,#kmrew,#kpodov').forEach(e=>e.remove());const m=document.getElementById('modal');if(m)m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');
    (q=>{const n=["Điềm tĩnh","Thanh liêm","Ham học"];if(net)n[{tt:0,ld:1,ch:2}[BAL.net.T[net].g]]=net;q.net=n})(S);S.bac=Math.max(S.bac||0,200);S.suc=Math.max(S.suc||0,80);S.ea={};render()},net);
   /* set-up: the opening life scene (#klife) can still arrive late: wait for it to settle, then put it away (it is the start card, not the case) */
   for(let i=0;i<10;i++){await p.waitForTimeout(300);await p.evaluate(()=>{const k=document.getElementById('klife');if(k)k.remove();if(Q.length&&!Q.some(q=>q.eaOut)){Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true}})}};
  const dlg=()=>p.evaluate(()=>{const M=document.getElementById('modal');const d=M&&!M.hidden&&M.querySelector('.dlg');if(!d)return{modal:false};const dr=d.getBoundingClientRect();
   const over=[...d.querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>dr.right+1}).map(e=>e.className||e.tagName).slice(0,4);
   const opts=[...d.querySelectorAll('.opts > button')].filter(b=>b.offsetParent).map(b=>({t:b.textContent.replace(/\s+/g," ").trim(),rows:[...b.querySelectorAll('.krl')].map(x=>x.textContent.trim())}));
   return{modal:true,title:(d.querySelector('.kph,h3,h2')||{}).textContent||"",hscroll:document.documentElement.scrollWidth>innerWidth+1,over,opts,close:!!d.querySelector('.x,.kx,[aria-label="Đóng"]')}});
  const tapOpt=async(re,screen)=>{const loc=p.locator('#modal .dlg .opts > button').filter({hasText:re}).first();return rt.choose(loc,{screen,label:String(re),wait:6000})};/* STALE-TESTS-7: the event frame is a HAND (.opts.khand, KIT §101/§102.2): a tap lifts the card, its ✓ chooses — rt.choose, the ONE helper (realtap.js) */
  const st=()=>p.evaluate(()=>({bac:S.bac,danh:S.danh,suc:S.suc,duc:S.duc,mood:(typeof moodBar==="function"?moodBar(S):S.mood&&S.mood.v),log:(S.log||[]).slice(-3).map(x=>String(x.t||x).replace(/<[^>]+>/g,"")).join(" | ")}));
  const shot=n=>p.screenshot({path:`${OUT}/${wh}-${n}.jpg`,type:'jpeg',quality:60});
  const noHold=o=>!o.some(x=>/^(Tiếp tục|Nhịn|Bỏ qua|Thôi)/.test(x.t));
  /* hot */
  await fresh("Kiêu ngạo");await p.evaluate(()=>{/* N2: a REAL bad mood (feelings, as the jfeel case) so the vent is measured, not a bar the next read recomputes */for(const kd of ["t-gian1","t-gian2","t-gian3","t-gian4"])mkAdd(S,{kd,k:"gian",s:95,why:"bị làm nhục"},60);S.emo={k:"gian",v:80,why:"thử",w:wk()};window.__bot=0;eaMeOut("gian");showModal()});await p.waitForTimeout(600);
  {const d=await dlg();await shot('hot');const F=await p.evaluate(()=>({fx:BAL.ea.fx.dapdo,n:BAL.ea.pick.n,v:BAL.ea.pick.vent,temper:eaTemper(S).k}));const s0=await st();
   const rowsOk=d.opts&&d.opts.every(o=>o.rows.some(r=>/Được/.test(r))&&o.rows.some(r=>/Tốn|Mất|Kèm/.test(r)));
   const has=d.opts&&d.opts.some(o=>/^Đập đồ/.test(o.t));const tapped=has&&await tapOpt(/^Đập đồ/,'hot');await p.waitForTimeout(700);const s1=await st();const d1=await dlg();
   const ok=F.temper==="hot"&&d.modal&&d.opts.length>=2&&d.opts.length<=F.n&&noHold(d.opts)&&rowsOk&&tapped&&s0.bac-s1.bac===F.fx.bac&&s0.danh-s1.danh===F.fx.danh&&s1.mood-s0.mood>=F.v-1&&!(d1.modal&&/Lòng không giữ/.test(d1.title));
   res.hot={ok,opts:d.opts&&d.opts.map(o=>o.t.slice(0,90)),rows:d.opts&&d.opts.map(o=>o.rows.join("/")),s0,s1,hscroll:d.hscroll,over:d.over};if(!ok||d.hscroll||d.over.length)bad++}
  /* stale (temper-outburst-fix, D 25/11 11:08Z): raw S.mood.v (+40) ≠ the shown bar (causes, low) — every row must say «giải tỏa tâm trạng» and the tap must vent UP */
  await fresh("Kiêu ngạo");await p.evaluate(()=>{for(const kd of ["s-gian1","s-gian2","s-gian3","s-gian4"])mkAdd(S,{kd,k:"gian",s:95,why:"bị làm nhục"},60);S.emo={k:"gian",v:80,why:"thử",w:wk()};moodBar(S);S.mood.v=40;window.__bot=0;eaMeOut("gian");S.mood.v=40;showModal()});await p.waitForTimeout(600);
  {const d=await dlg();await shot('stale');const s0=await st();const V=await p.evaluate(()=>BAL.ea.pick.vent);const T=(d.opts||[]).map(o=>o.t+" "+o.rows.join(" "));
   const txtOk=T.length>=2&&T.every(t=>/giải tỏa tâm trạng/.test(t)&&!/lòng vui lắng xuống/.test(t));const first=d.opts&&d.opts[0]&&d.opts[0].t.slice(0,12);
   const tapped=!!first&&await tapOpt(new RegExp('^'+first.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')),'stale');await p.waitForTimeout(700);const s1=await st();
   const ok=d.modal&&s0.mood<0&&txtOk&&tapped&&s1.mood-s0.mood>=V-1;res.stale={ok,bar0:s0.mood,bar1:s1.mood,opts:T.map(t=>t.slice(0,110))};if(!ok||d.hscroll||d.over.length)bad++}
  /* timid */
  await fresh("Khiêm nhường");await p.evaluate(()=>{S.mood.v=-80;S.emo={k:"gian",v:80,why:"thử",w:wk()};window.__bot=0;eaMeOut("gian");showModal()});await p.waitForTimeout(600);
  {const d=await dlg();await shot('timid');const s0=await st();const T=d.opts.map(o=>o.t).join(" | ");const tapped=await tapOpt(/^Nuốt giận chép kinh/,'timid');await p.waitForTimeout(700);const s1=await st();const F=await p.evaluate(()=>BAL.ea.fx.nuot);
   const ok=d.modal&&!/Đập đồ|Đánh cung nữ|Phạm thượng/.test(T)&&/Nuốt giận chép kinh/.test(T)&&noHold(d.opts)&&tapped&&s0.suc-s1.suc===F.suc&&s1.duc-s0.duc===F.duc;
   res.timid={ok,opts:d.opts.map(o=>o.t.slice(0,90)),s0,s1};if(!ok||d.hscroll||d.over.length)bad++}
  /* jfeel live path */
  await fresh("Kiêu ngạo");const jf=await p.evaluate(()=>{const on=typeof feelOn==="function"&&feelOn()&&!!(BAL.feel&&BAL.feel.act);S.mood.v=-80;window.__bot=0;BAL.feel.act.o=100;S.fcd={};S.fa=null;S.fa2={w:-1,n:0};
   for(const kd of ["t-gian1","t-gian2","t-gian3","t-gian4"])mkAdd(S,{kd,k:"gian",s:95,why:"bị làm nhục"},60);const dbg={bar:feelBar(S),sums:feelSums(S),line:BAL.ea.out.v};let n=0;while(!Q.length&&n++<10){S.fcd={};feelActTick(S)}const q=Q[0];showModal();return{dbg,on,q:!!q,eaOut:!!(q&&q.eaOut),n:q&&q.opts?q.opts.length:0}});
  await p.waitForTimeout(600);{const d=await dlg();await shot('jfeel');const first=d.opts&&d.opts[0]?d.opts[0].t.split(/ (Được|Tốn|Mất|Kèm)/)[0].trim():"";const s0=await st();
   const tapped=first?await tapOpt(new RegExp('^'+first.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').slice(0,20)),'jfeel'):false;await p.waitForTimeout(700);const s1=await st();const fa=await p.evaluate(()=>S.fa&&S.fa.n);
   const ok=jf.on&&jf.eaOut&&d.modal&&d.opts.length>=2&&noHold(d.opts)&&tapped&&!!fa&&s1.mood>s0.mood;res.jfeel={ok,jf,first,fa,opts:d.opts&&d.opts.map(o=>o.t.slice(0,80)),s0,s1};if(!ok||d.hscroll||d.over.length)bad++}
  /* npc parity */
  res.npc=await p.evaluate(()=>{const L=(rivals||[]).filter(v=>v.alive&&!v.out);let tot=0,inL=0,cons=0;for(const v of L.slice(0,6)){for(const g of ["gian","buon","so","ghen","vui"]){const O=eaOpts(v,null,g).map(o=>o.k);for(let i=0;i<8;i++){const P=eaPick(v,g);if(!P)continue;tot++;if(O.includes(P.r.k))inL++}}cons++}return{ok:tot>0&&inL===tot,tot,inL,cons}});if(!res.npc.ok)bad++;
  /* caps */
  res.cap=await p.evaluate(()=>{const T={k:"hot",tr:[]};const before=eaOpts(S,null,"gian",T).map(o=>o.k);S.ea.eaC={w0:wk(),danh:BAL.ea.pick.cap.danh,duc:0,hh:0,pham:wk()};const after=eaOpts(S,null,"gian",T).map(o=>o.k);
   const paysDanh=k=>eaPx(S,{k}).L.some(x=>x[3]==="danh"&&x[1]>0);return{ok:after.length>0&&!after.some(paysDanh)&&!after.includes("pham"),before,after}});if(!res.cap.ok)bad++;
  /* old save */
  await fresh("Kiêu ngạo");res.old=await p.evaluate(()=>{S.ea={used:{},hoi:[]};for(const v of rivals||[])delete v.eaC;S.mood.v=-80;window.__bot=0;Q.length=0;const r=eaMeOut("gian");return{ok:!!r&&Q.length===1}});if(!res.old.ok)bad++;
  res.errs=errs;res.rt=rt.stats();res.tl=tl.slice(0,10);if(errs.length||res.rt.dead)bad++;all[wh]=res;await ctx.close()}
 fs.writeFileSync(path.join(OUT,'temper-outburst.json'),JSON.stringify(all,null,1));
 for(const k in all){const r=all[k];console.log(k,Object.keys(r).filter(x=>r[x]&&r[x].ok!=null).map(x=>`${x}:${r[x].ok?'ok':'FAIL'}`).join(' '),'errs',r.errs.length,'taps',r.rt.taps,'dead',r.rt.dead)}
 console.log(bad?`FAIL ${bad}`:'PASS');await b.close();process.exit(bad?1:0)})();
