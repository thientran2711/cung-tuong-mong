/* review/emotion-acts (jemoact; owner OD 16/11 13:08Z, 13:25Z B, 13:50Z s17 (3)): emotion act cards, outbursts, hỏi tội, extreme mood, locks.
   usage: node dev/test/emotion-acts.js <build url> <outdir> [WxH@dpr,...]
   cases: gian (her deck at a low angry mood: Đập đồ + Mắng cung nữ cards), vui (Đàn hát tự thưởng), scold (Mắng cung nữ: pick the maid),
          out (a hot-tempered her bursts out: kit event frame, only "Tiếp tục"), gen (a generous her in high joy hands out silver),
          hoi (a higher-rank mistress comes to hỏi tội: 3 answers), hit (a lower-rank consort scolded her maid: 2 answers),
          ext (3 tuần of deep sorrow → Tâm bệnh), lock (hot + furious: "Nhịn" greyed, reason in its line), oldsave (a save without S.ea).
   Checks per case: no page error, no horizontal page overflow, dialog content inside its panel; the case's own expectation (ok). */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const R={};let bad=0;
 for(const sz of (SIZES||"755x1000@2,1000x755@1,1180x820@2,1366x1024@2,844x390@1,390x844@1").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const res={},errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr||1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,.kroul,.kmov{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&typeof eaSync==='function',null,{timeout:90000});await sleep(2500);
  const fresh=()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<3;i++){try{nextBuoi()}catch(e){}Q.length=0}
   Q.length=0;m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');
   const t=document.getElementById('rtoast');if(t)t.classList.remove('on');mbS();S.mood.v=0;S.emo=null;eaS0();render()};
  const shot=async(nm,fn,again)=>{await p.evaluate(`(${fresh.toString()})()`.replace('eaS0()','(S.ea={})'));await sleep(800);const r0=await p.evaluate(fn);await sleep(600);if(again)await p.evaluate(again);await sleep(5400);
   const m=await p.evaluate(()=>{const M=document.getElementById('modal');const d=M&&!M.hidden&&M.querySelector('.dlg');const dr=d&&d.getBoundingClientRect();
    const over=d?[...d.querySelectorAll('*')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&r.right>dr.right+1}).map(e=>e.className||e.tagName).slice(0,4):[];
    const opts=d?[...d.querySelectorAll('.opts > button')].map(b=>(b.disabled?"[x] ":"")+b.textContent.replace(/\s+/g," ").trim().slice(0,110)):[];
    return{modal:!!d,title:d?(d.querySelector('.kph,h3,h2')||{}).textContent:"",hscroll:document.documentElement.scrollWidth>innerWidth+1,over,opts}});
   res[nm]=Object.assign({r0},m);if(m.hscroll||m.over.length||(r0&&r0.ok===false))bad++;await p.screenshot({path:`${OUT}/${wh}-${nm}.jpg`,type:'jpeg',quality:60})};
  const card=n=>`(()=>{try{const g=document.querySelector('.game.k3home');const t=document.querySelector('#tabs [data-tab="act"]');if(g&&t)t.click()}catch(e){}const c=[...document.querySelectorAll('[data-i]')].find(b=>/${n}/.test(b.textContent));if(c)c.scrollIntoView({block:'center'});return !!c})()`;
  await shot('gian',`(()=>{S.mood.v=-45;S.emo={k:"gian",v:60,why:"bị làm nhục",w:wk()};render();const n=deck.filter(a=>a.ea).map(a=>a.n);return {n,ok:n.join()==="Đập đồ,Mắng cung nữ"&&${card("Đập đồ")}}})()`,`${card("Đập đồ")}`);
  await shot('vui',`(()=>{/* MOODKNOW step 0: the bar is the signed sum of causes and an act needs the matching feeling */(S.mk=[],S.emo=null,S.__mkL=null,emoSet(S,"vui",60,"thử"),mkSync(S),mkBar(45-S.mood.v,"thử","x:test"),mkSync(S));render();const n=deck.filter(a=>a.ea).map(a=>a.n);return {n,ok:n.join()==="Đàn hát tự thưởng"&&${card("Đàn hát tự thưởng")}}})()`,`${card("Đàn hát tự thưởng")}`);
  await shot('scold',`(()=>{S.mood.v=-45;S.emo={k:"gian",v:60,why:"thử",w:wk()};S.staff=S.staff||[];if(!S.staff.some(s=>s.role==="maid"))S.staff.push(mkServ("maid"));render();const i=deck.findIndex(a=>a.ea==="mang");act(i);showModal();return {ok:Q.length>0&&/Mắng/.test(Q[0].t)}})()`);
  await shot('out',`(()=>{S.pTr="Kiêu ngạo";S.mood.v=-80;S.emo={k:"gian",v:80,why:"thử",w:wk()};BAL.ea.out.ch=100;S.ea.wk=-1;const ok0=eaTemper(S).k==="hot";let t=0;while(!Q.length&&t++<20){S.ea.wk=-1;S.ea.ocd=0;window.__bot=0;eaWeek()}showModal();return {ok:ok0&&Q.length>0,t:Q[0]&&Q[0].t}})()`);
  await shot('gen',`(()=>{S.pTr="Trọng nghĩa";S.mood.v=85;S.emo={k:"vui",v:80,why:"thử",w:wk()};S.bac=200;S.staff=S.staff||[];if(!S.staff.length)S.staff.push(mkServ("maid"));BAL.ea.out.ch=100;let t=0;while(!(Q[0]&&Q[0].t==="Ban thưởng cung nhân")&&t++<40){Q.length=0;S.mood.v=85;S.ea.wk=-1;S.ea.ocd=0;S.ea.xn=0;eaWeek()}showModal();return {ok:Q[0]&&Q[0].t==="Ban thưởng cung nhân",tries:t}})()`);
  await shot('hoi',`(()=>{const v=liveRivals(true).find(x=>x.queen)||liveRivals(true)[0];S.bac=Math.max(S.bac,50);S.ea.hoi=[{id:v.id,m:"Tiểu Thúy",w:wk()}];eaHoi();showModal();return {ok:Q.length>0&&Q[0].opts.length===3}})()`);
  await shot('hit',`(()=>{S.rank=Math.max(S.rank,4);const v=liveRivals(true).filter(x=>!x.queen).sort((a,b)=>a.rank-b.rank)[0];v.rank=0;v.emo={k:"gian",v:90,why:"thử",w:wk(),t:"me"};v.trait="Kiêu ngạo";const r=EA_REACT.find(x=>x.k==="khac");Q.length=0;eaDo_test=0;const P={r};window.__eaT=1;const o=(function(){return eaPick?null:null})();
     /* run the reaction directly */ let t=0;BAL.ea.npc.outCh=100;BAL.ea.npc.actCh=0;while(!(Q[0]&&Q[0].t==="Cung nữ bị ức hiếp")&&t++<40){Q.length=0;S.ea.wk=-1;S.ea.hitW=-1;v.emo.v=90;for(const x of liveRivals(true))if(x!==v)x.emo=null;eaWeek()}showModal();return {ok:Q[0]&&Q[0].t==="Cung nữ bị ức hiếp",tries:t}})()`);
  await shot('ext',`(()=>{S.mood.v=-80;S.emo={k:"buon",v:80,why:"thử",w:wk()};BAL.ea.out.ch=0;for(let i=0;i<3;i++){Q.length=0;S.mood.v=-80;S.ea.wk=-1;eaWeek()}showModal();return {ok:Q[0]&&Q[0].t==="Ưu uất thành bệnh"&&!!S.ill}})()`);
  await shot('lock',`(()=>{S.pTr="Kiêu ngạo";(S.mk=[],S.emo=null,S.__mkL=null,emoSet(S,"gian",80,"thử"),mkSync(S),mkBar(-80-S.mood.v,"thử","x:test"),mkSync(S));Q.push({ev:1,t:"Lời mỉa mai",h:"<p>Một vị phi tần buông lời mỉa mai ngươi trước mặt mọi người.</p>",opts:[{n:"Nhịn",fx:{duc:1},x:"Chắc chắn · thành: Đức +1"},{n:"Đáp trả sắc sảo",fx:{},x:"Khá chắc · thành: Danh +2 · hỏng: Danh −1"}]});showModal();const b=document.querySelector('#modal .opts > button[data-m="0"]');return {ok:!!(b&&b.disabled)}})()`);
  await shot('oldsave',`(()=>{const d=ser();delete d.S.ea;deser(d);S.mood.v=-45;S.emo={k:"buon",v:60,why:"thử",w:wk()};render();return {ok:deck.filter(a=>a.ea).length===2}})()`,`${card("Khóc thầm")}`);
  R[wh]={res,errs};if(errs.length)bad++;await ctx.close()}
 console.log(JSON.stringify(R,null,1));console.log(bad?`FAIL ${bad}`:"PASS");await b.close()})();
