/* review/temper-perception (seat T2): the onlooker rule (jtperc) + her reason gate (Option A), with REAL TAPS (dev/test/realtap.js) for every player act.
   usage: node dev/test/temper-perception.js <build url> <outdir> [WxH@dpr,...]   (default: Fold 755x1000@2 + iPad 1180x820@2)
   cases (state is prepared by script; every act SHE does is a real tap on the screen):
     gateNo   her «Khiêu khích» card on a rival with no reason: greyed «chưa có cớ»; a real tap changes nothing.
     gateYes  the same rival after a grudge (Oán 45): the card names its reason «cớ: oán 45»; a real tap lands: the rival's regard drops,
              the deed is judged by exactly the people the ONE record puts at that place this khắc (+ the Sổ line «Người chứng kiến» when any).
     eaHook   an outburst (eaDo, Mắng cung nữ) enters the rule as an outburst; the consorts at her place judge it.
     math     tpJudge on one onlooker: trọng Nhân harsher; a kind memory softens; reason known (×reason) < no reason (×noReason); hearsay ×hear;
              Phạm thượng before a Tín judge who knows the reason = approval (+); Thái hậu's yearly cap holds.
     label    3 outbursts + 3 kind deeds seen → «Khẩu xà tâm Phật»; her real tap on that consort shows it on the «Tính nết» row of the card.
     npcMood  the motive gate adds BAL.tp.moodM for a heavily angry NPC (law 1: the same term as hers).
     oldsave  a save without S.tp loads and the rule runs.
   Checks per case: no page error, no horizontal page overflow, the case's expectation (ok); dead buttons counted by realtap. */
const {chromium}=require('playwright');const fs=require('fs');const RT=require('./realtap.js');
const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R={};let bad=0;
 for(const sz of (SIZES||"755x1000@2,1180x820@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const res={},errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr||1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  const rt=RT.make(p,{log:()=>{},ignoreCover:/kpop|rtoast/});
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,.kroul,.kmov{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof tpDeed==='function'&&typeof eaSync==='function',null,{timeout:120000});await sleep(2500);
  const fresh=async()=>{await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<3;i++){try{nextBuoi()}catch(e){}Q.length=0}
   Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');
   const t=document.getElementById('rtoast');if(t)t.classList.remove('on');S.mood.v=0;S.emo=null;S.tp=null;S.confined=0;S.suc=100;render()});await sleep(600)};
  const done=async(nm,r)=>{const hs=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);res[nm]=Object.assign({hscroll:hs},r);if(hs||!r||r.ok!==true)bad++;
   await p.screenshot({path:`${OUT}/${wh}-${nm}.jpg`,type:'jpeg',quality:55})};
  /* go to the rival's palace (state), then a REAL tap on her figure opens the person card; returns the card's «Khiêu khích» button text */
  /* the rival comes to HER palace (state: her row of the ONE record says so); a REAL tap on her figure opens the person card */
  const openRival=async()=>{const i=await p.evaluate(()=>{const v=window.__tv;Q.length=0;const R=agRec();if(R&&R.P["v"+v.id])for(let q=0;q<J95.KH;q++)R.P["v"+v.id][q]=["home","visit","me","sang chơi"];
    S.where=S.where||{};S.where[v.id]="home";popIdx=null;goTo("home");Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render();return curPeople().findIndex(x=>x.ref===v&&x.kind==="rival")});
   if(i<0)return {i};await sleep(800);const ok=await rt.tap(`#tokens .tok[data-p="${i}"]`,{screen:'visit',label:'rival'});await sleep(1000);
   const btn=await p.evaluate(()=>{const b=[...document.querySelectorAll('.opt[data-o]')].find(x=>/Khiêu khích/.test(x.textContent));return b?{t:b.textContent.replace(/\s+/g," ").trim().slice(0,160),o:b.dataset.o}:null});
   return {i,tap:ok,btn}};
  const tabTo=async()=>{/* the act may sit in another group tab of the card: tap the tab that holds it */
   const has=await p.evaluate(()=>{const b=[...document.querySelectorAll('.opt[data-o]')].find(x=>/Khiêu khích/.test(x.textContent));return !!(b&&b.offsetParent)});if(has)return;
   const n=await p.evaluate(()=>document.querySelectorAll('.pctabs .pct').length);for(let j=0;j<n;j++){await rt.tap(`.pctabs .pct:nth-child(${j+1})`,{screen:'card',label:'tab'});await sleep(400);
    const ok=await p.evaluate(()=>{const b=[...document.querySelectorAll('.opt[data-o]')].find(x=>/Khiêu khích/.test(x.textContent));return !!(b&&b.offsetParent)});if(ok)return}};
  const setup=()=>p.evaluate(()=>{const v=liveRivals(false).find(x=>!x.queen&&!sameHouse(S,x)&&!x.confined);window.__tv=v;S.ro[v.id]=0;S.rl[v.id]=0;v.rel=0;v.oan=0;S.sung=Math.max(S.sung,v.sung);for(const f of liveRivals(true))if(f.ag)f.ag.vent={};return !!v});
  /* gateNo */
  await fresh();await setup();{const o=await openRival();await tabTo();const B=await p.evaluate(()=>{const b=[...document.querySelectorAll('.opt[data-o]')].find(x=>/Khiêu khích/.test(x.textContent));return b?b.textContent.replace(/\s+/g," ").trim():""});
   const r0=await p.evaluate(()=>window.__tv.rel);if(B){await rt.tap(`.opt[data-o="${o.btn?o.btn.o:-1}"]`,{screen:'card',label:'Khiêu khích'}).catch(()=>false)}await sleep(800);
   const r1=await p.evaluate(()=>window.__tv.rel);await done('gateNo',{o,B,r0,r1,ok:/chưa có cớ/.test(B)&&r0===r1})}
  /* gateYes */
  await fresh();await setup();{await p.evaluate(()=>{S.ro[window.__tv.id]=45});const o=await openRival();await tabTo();
   const B=await p.evaluate(()=>{const b=[...document.querySelectorAll('.opt[data-o]')].find(x=>/Khiêu khích/.test(x.textContent));return b?{t:b.textContent.replace(/\s+/g," ").trim(),o:b.dataset.o}:null});
   const pre=await p.evaluate(()=>{const v=window.__tv,R=agRec(),kh=j95kh(),pl=tpWhere(S);const at=R?Object.keys(R.P).filter(id=>R.P[id][kh]&&j95at(R.P[id][kh][0],pl)&&id!=="me"&&id!=="v"+v.id&&(id==="emp"||id==="th"||/^v\d+$/.test(id))):[];return {rel:v.rel,at,pl,n:(S.tp&&S.tp.n)||0}});
   const tapped=B?await rt.tap(`.opt[data-o="${B.o}"]`,{screen:'card',label:'Khiêu khích'}):false;await sleep(1200);
   const post=await p.evaluate(()=>{const v=window.__tv,q=(S.tp&&S.tp.q)||[];const it=q[q.length-1];const L=(S.logs||[]).slice(0,6).join(" ").replace(/<[^>]+>/g,"");return {rel:v.rel,it:it&&{d:it.d,x:it.x,v:it.v,j:Object.keys(it.j)},log:/Người chứng kiến/.test(L)}});
   const sameSet=post.it&&pre.at.every(id=>post.it.j.includes(id))&&post.it.j.every(id=>pre.at.includes(id));
   await done('gateYes',{B:B&&B.t,tapped,pre,post,ok:!!B&&/cớ: oán 45/.test(B.t)&&tapped&&post.rel<pre.rel&&!!post.it&&post.it.d==="provoke"&&sameSet&&(pre.at.length?post.log:true)})}
  /* eaHook: an outburst lands in the rule as an outburst; the consorts that stand at her place judge it */
  await fresh();{const r=await p.evaluate(()=>{const v=liveRivals(true)[0];const R=agRec(),kh=j95kh();const pl=tpWhere(S);if(R&&R.P["v"+v.id])R.P["v"+v.id][kh]=[pl,"visit","me","thử"];
    const a0=v.rel;const row=EA_REACT.find(x=>x.k==="mang"&&x.who==="c");const o=window.eaDo(S,row);const q=S.tp.q,it=q[q.length-1];return {o:!!o,it:it&&{d:it.d,o:it.o,j:Object.keys(it.j)},seen:it&&!!it.j["v"+v.id],a0,a1:v.rel,rec:!!R}});
   await done('eaHook',Object.assign(r,{ok:r.o&&r.it&&r.it.d==="mang"&&r.it.o===1&&(r.rec?r.seen:true)}))}
  /* math on one onlooker */
  await fresh();{const r=await p.evaluate(()=>{const P=BAL.tp;const [X,O]=liveRivals(false).filter(x=>!x.queen);const it=d=>({id:999,x:String(X.id),v:null,d,o:1,wk:wk(),j:{}});
    const run=(d,how,setup)=>{S.tp=null;const s0={r:O.rl[X.id]||0};O.rl[X.id]=0;O.trong=setup.tr||["Cần","Trí"];if(setup.close)O.rl[X.id]=netTh(O,"than");const b=O.rl[X.id];
     const m0=window.memList;if(setup.kind)window.memList=(h,a)=>h===O&&a===X?[{s:1,w:wk(),n:1,g:20}]:m0(h,a);const m1=window.moodCauseKnownBy;if(setup.reason)window.moodCauseKnownBy=()=>"thử";
     S.tp=null;tpS().r={};const st=tpS();let v=0;for(let i=0;i<10;i++){v+=tpJudge(O,Object.assign(it(d),{id:999+i}),how)}window.memList=m0;window.moodCauseKnownBy=m1;const out=O.rl[X.id]-b;O.rl[X.id]=s0.r;return out};
    const base=run("mang","eye",{}),nhan=run("mang","eye",{tr:["Nhân","Trí"]}),kind=run("mang","eye",{kind:1}),rs=run("mang","eye",{reason:1}),hear=run("mang","hear",{}),ap=run("pham","eye",{tr:["Tín","Cần"],reason:1}),apNo=run("pham","eye",{tr:["Tín","Cần"]});
    /* Thái hậu cap: 30 harsh deeds by her in a year cost at most cap.th */
    S.tp=null;const th0=S.th;const itS=k=>({id:5000+k,x:"me",v:null,d:"danh",o:1,wk:wk(),j:{}});for(let k=0;k<30;k++)tpJudge("th",itS(k),"eye");const thLoss=th0-S.th;
    return {base,nhan,kind,rs,hear,ap,apNo,thLoss,cap:P.cap.th,
     ok:nhan<base&&kind>base&&rs>base&&hear>base&&base<0&&ap>0&&apNo===0&&thLoss<=P.cap.th&&thLoss>0}});
   await done('math',r)}
  /* label: 3 outbursts + 3 kind deeds seen by one consort → «Khẩu xà tâm Phật» on her card (real tap opens it) */
  await fresh();await setup();{const r=await p.evaluate(()=>{const v=window.__tv;S.tp=null;const m0=window.memList;window.__m0=m0;window.memList=(h,a)=>h===v&&a===S?[{s:1,w:wk(),n:3,g:20}]:m0(h,a);
    for(let i=0;i<3;i++)tpJudge(v,{id:700+i,x:"me",v:null,d:"mang",o:1,wk:wk(),j:{}},"eye");return {lab:tpLabOf(v)}});
   const o=await openRival();const txt=await p.evaluate(()=>{const M=document.querySelector('#pop,.pc,.pcf');const t=(document.querySelector('.pcf')||document.body).textContent;return /Khẩu xà tâm Phật/.test(t)});
   await p.evaluate(()=>{window.memList=window.__m0});await done('label',{lab:r.lab,tap:o.tap,txt,ok:r.lab==="good"&&o.tap&&txt})}
  /* npcMood */
  await fresh();{const r=await p.evaluate(()=>{const [a,t]=liveRivals(false).filter(x=>!x.queen);a.rl[t.id]=0;a.ro[t.id]=25;a.emo=null;const g0=motiveOK(a,t,"provoke");
    a.emo={k:"gian",v:95,why:"thử",w:wk()};try{mkAdd(a,{kd:"tptest",k:"gian",s:95,why:"thử"},20)}catch(e){}const st=typeof feelSums==="function";const md=tpMoodM(a);const g1=motiveOK(a,t,"provoke");return {g0:g0.ok,g1:g1.ok,why:g1.why,md,
     ok:md===BAL.tp.moodM&&!g0.ok&&g1.ok&&/bức bối/.test(g1.why)}});await done('npcMood',r)}
  /* oldsave */
  await fresh();{const r=await p.evaluate(()=>{delete S.tp;const sv=JSON.stringify(S);S=JSON.parse(sv);delete S.tp;let e="";try{tpTick();tpDeed(S,"mang",null,{what:"thử"})}catch(x){e=String(x)}return {e,ok:!e&&!!S.tp}});await done('oldsave',r)}
  res.errs=errs;res.dead=rt.stats();if(errs.length)bad++;R[wh]=res}
 fs.writeFileSync(`${OUT}/temper-perception.json`,JSON.stringify(R,null,1));console.log(JSON.stringify(R,null,1).slice(0,6000));console.log(bad?`FAIL ${bad}`:"PASS");await b.close();process.exit(bad?1:0)})();
