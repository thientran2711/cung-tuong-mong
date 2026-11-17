/* review/emotion-acts-2 (jemoact r1 FAIL fix): every NPC kind's outbursts / extremes move real stats + show; quở trách by temper + mood; pillow talk by mood.
   usage: node dev/test/emotion-acts-2.js <build url> <outdir> [WxH@dpr,...]
   cases: kinds (one person of every kind × every feeling: a real stat moves; news rows with faces on the week card), egian (the Emperor's
          extreme anger → Long nhan đại nộ), tvui (Thái hậu's extreme joy, she is the favourite), quo (a hot Thái hậu scolds her: harsh words,
          ×hot), pillow (low mood: night answers harder), plock (hot + furious: Rót rượu greyed), punish (an angry Emperor: +1 month),
          hoitimid (a timid mistress's hỏi tội words), oldsave (a save without the new fields).
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
  /* (4) every NPC kind: one person of each kind bursts out in every feeling (eaDo); each must move a real stat; then the week card news rows */
  await shot('kinds',`(()=>{try{trS()}catch(e){}const one={};for(const x of eaPeople()){const k=eaKind(x);one[k]=one[k]||x}const snap=x=>JSON.stringify([x.loyal,x.tinh,x.af,x.pow,x.hp,x.fond,x.tal,x.sung,x.bac,x.danh,x.suc,x.eaAway,x.eaQ,x.mood,S.th,S.sung,S.suc,S.thIll,x.ill,(S.trieu||{}).kho,(S.trieu||{}).rel,liveRivals(true).map(v=>[v.sung,v.th,v.suc,v.oan,v.ro,v.danh,v.bac]),(x.staff||[]).map(s=>s.loyal)]);
     const bad=[],T={};for(const k in one)for(const g of ["gian","buon","so","ghen","vui"]){const x=one[k];if(k==="m")x.eaAway=0;if(k==="e")x.eaQ=-1;const P=eaPick(x,g);if(!P){T[k+":"+g]="none";continue}const a=snap(x);const o=eaDo(x,P.r);const b=snap(x);T[k+":"+g]=P.r.k;if(!o||a===b)bad.push(k+":"+g+":"+P.r.k);if(o)eaSay(x,o.h)}
     const seq=S.logSeq;S.wkSnap=Object.assign(wkSnap(),{seq:seq-12});Q.length=0;dawn();const d=document.getElementById('dawn');const txt=d?d.textContent:"";const rows=/Hoàng thượng|Thái hậu/.test(txt)?1:0;
     return {T,bad,rows,ok:bad.length===0&&rows>0}})()`,`(()=>{const b=[...document.querySelectorAll('button')].filter(x=>x.offsetParent&&x.textContent.trim()==='›')[0];if(b)b.click()})()`);
  await shot('egian',`(()=>{const E=S.emp;E.eaX={};for(let i=0;i<3;i++){E.emo={k:"gian",v:95,w:wk()};eaExtNpc(E,"gian")}showModal();return {ok:Q[0]&&Q[0].t==="Long nhan đại nộ"}})()`);
  await shot('tvui',`(()=>{const T=S.thO;T.eaX={};S.th=100;for(const v of liveRivals(true))v.th=0;for(let i=0;i<3;i++){T.emo={k:"vui",v:95,w:wk()};eaExtNpc(T,"vui")}showModal();return {ok:Q[0]&&Q[0].t==="Thái hậu thiên vị"}})()`);
  await shot('quo',`(()=>{const T=S.thO;const r=EA_REACT.find(x=>x.k==="quo"&&x.g==="gian");T.emo={k:"gian",v:90,w:wk(),t:"me"};const tr0=traitsOf;window.traitsOf=function(p){return p==="th"?["Kiêu ngạo"]:tr0.apply(this,arguments)};S.ea.hitW=-1;const th0=S.th;eaDo(T,r);window.traitsOf=tr0;showModal();
     return {ok:Q[0]&&Q[0].t==="Thái hậu quở trách"&&/đập tay/.test(Q[0].h)&&th0-S.th===Math.round(BAL.ea.fx.quo.th*BAL.ea.quo.hot),d:th0-S.th}})()`);
  await shot('pillow',`(()=>{S.mood.v=-80;S.emo={k:"buon",v:80,why:"thử",w:wk()};Q.length=0;pushFront(mkP("night1",{q:2,vp:0}),"Đêm thị tẩm");showModal();const x=Q[0].opts.map(o=>o.x);return {ok:x.filter(s=>/khó hơn/.test(s)).length===3,x}})()`);
  await shot('plock',`(()=>{/* trait pool d296f3cd: nết live in p.net (S.pTr / .trait no longer read) */(p=>{const n=netOf(p).slice();n[{tt:0,ld:1,ch:2}[BAL.net.T["Kiêu ngạo"].g]]="Kiêu ngạo";p.net=n})(S);S.mood.v=-80;S.emo={k:"gian",v:80,why:"thử",w:wk()};Q.length=0;pushFront(mkP("night1",{q:2,vp:0}),"Đêm thị tẩm");showModal();const b=[...document.querySelectorAll('#modal .opts > button.opt')];const L=b.filter(x=>x.disabled).map(x=>x.textContent);return {ok:L.length===1&&/Rót rượu/.test(L[0]),L}})()`);
  await shot('punish',`(()=>{S.emp.emo={k:"gian",v:90,why:"thử",w:wk()};S.confined=0;const m0=(has("nongnay")?3:has("nhantu")?1:2);const r0=Math.random;Math.random=()=>.99;punish(S,"thử",1);Math.random=r0;const L=S.logs[0];Q.push({t:"Sổ ghi",h:"<p>"+L+"</p>",opts:[{n:"Tiếp tục",fx:{},go:()=>{}}]});showModal();
     return {ok:S.confined===m0+1&&/phạt nặng thêm/.test(L),c:S.confined,L:L.replace(/<[^>]+>/g,"")}})()`);
  await shot('hoitimid',`(()=>{const v=liveRivals(true).find(x=>x.queen)||liveRivals(true)[0];const tr0=traitsOf;window.traitsOf=function(p){return p===v?["Khiêm nhường"]/* trait pool d296f3cd: old "Nhu mì" left T_TIMID; its pool word (BAL.net.old.nhat) */:tr0.apply(this,arguments)};S.bac=Math.max(S.bac,50);S.ea.hoi=[{id:v.id,m:"Tiểu Thúy",w:wk()}];eaHoi();window.traitsOf=tr0;showModal();return {ok:Q.length>0&&/khẽ nói/.test(Q[0].h)}})()`);
  await shot('oldsave',`(()=>{const d=ser();delete d.S.ea;for(const m of d.S.men||[]){delete m.eaAway;delete m.eaX}if(d.S.emp){delete d.S.emp.eaQ;delete d.S.emp.eaQx}d.S.news=(d.S.news||[]).concat([{w:0,id:null,k:"emo",t:"x"}]);deser(d);eaNpcWeek();S.mood.v=-45;S.emo={k:"buon",v:60,why:"thử",w:wk()};render();return {ok:deck.filter(a=>a.ea).length===2}})()`);
  R[wh]={res,errs};if(errs.length)bad++;await ctx.close()}
 console.log(JSON.stringify(R,null,1));console.log(bad?`FAIL ${bad}`:"PASS");await b.close()})();
