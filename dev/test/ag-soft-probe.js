/* AG soft-fail line probe (odds-cap merge, review AG LATER #2): 12 buổi with every ag roll forced to MISS (agTry false) and every miss forced
   SOFT (agSoft true) — the whole world runs its soft branches. node dev/test/ag-soft-probe.js [dev/index.html]
   1 no log / news / dialog / page text with "undefined", "NaN" or "{n}"
   2 the BẠI line is the j63 oddsSoft words ("người tính không bằng trời tính"), seen at least once (her or an NPC)
   3 an NPC soft line never charges her: agSoftTxt(npc, …, cost) leaves S unchanged; her own line charges its Sức share once (oddsSoftCost)
   4 no page errors */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,600):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(async()=>{const o={};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv())break}
  window.__bot=1;Q.length=0;
  /* 3 unit: NPC line never charges S; her line charges the Sức share once, never bạc */
  {const v=liveRivals(true).find(x=>x.alive&&!x.out);const s0={suc:S.suc,bac:S.bac},v0={suc:v.suc,bac:v.bac};agSoftTxt(v,"",{suc:-6,bac:-20});o.npcPay={S:[S.suc-s0.suc,S.bac-s0.bac],v:[v.suc-v0.suc,v.bac-v0.bac]};
   const s1={suc:S.suc,bac:S.bac};agSoftTxt(S,"Thử",{suc:-6,bac:-20});o.herPay=[S.suc-s1.suc,S.bac-s1.bac]}
  const T0=window.agTry,F0=window.agSoft;let tries=0;window.agTry=x=>{tries++;return false};window.agSoft=x=>true;
  const bad=[],seen={soft:0};const scan=(t,w)=>{t=String(t==null?"":t);if(/undefined|NaN|\{n\}/.test(t))bad.push(w+": "+t.replace(/<[^>]+>/g,"").slice(0,160));if(/người tính không bằng trời tính/.test(t))seen.soft++};
  const L0=S.logs.length;let steps=0;
  try{for(let i=0;i<12;i++){for(let k=0;k<30&&Q.length;k++){const q=Q[0];scan(q&&q.h,"dlg");(q.opts||[]).forEach(x=>scan(x.x,"opt"));Q.shift()}
    try{nextBuoi()}catch(e){bad.push("nextBuoi: "+e.message)}steps++;await new Promise(r=>setTimeout(r,60))}}finally{window.agTry=T0;window.agSoft=F0}
  for(const l of S.logs)scan(l,"log");for(const n of (S.news||[]))scan(typeof n==="string"?n:JSON.stringify(n),"news");scan(document.body.innerText,"page");
  o.bad=bad.slice(0,12);o.nbad=bad.length;o.soft=seen.soft;o.tries=tries;o.steps=steps;return o});
 ok(r.npcPay.S.every(x=>x===0)&&r.npcPay.v[0]===-6&&r.npcPay.v[1]===0,'3 NPC soft line: her stats untouched; the NPC pays only the Sức share, never bạc',r.npcPay);
 ok(r.herPay[0]===-6&&r.herPay[1]===0,'3 her soft line (oddsSoft): Sức share once, never bạc',r.herPay);
 ok(r.steps===12&&r.tries>0,'12 buổi with every ag roll a forced soft miss',{steps:r.steps,tries:r.tries});
 ok(r.nbad===0,'1 no undefined / NaN / {n} in logs, news, dialogs, page',r.bad);
 ok(r.soft>0,'2 the BẠI line is the j63 oddsSoft words (seen)',r.soft);
 ok(errs.length===0,'4 no page errors',errs.slice(0,5));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`${f} FAIL`:`ALL PASS (${res.length})`);process.exit(f?1:0)})();
