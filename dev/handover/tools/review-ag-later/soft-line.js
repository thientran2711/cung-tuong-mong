/* soft-line: every agent soft fail (agSoft at the odds cap) prints a real line through the ONE soft-fail rule (main odds-cap: oddsSoft / kitSoftW),
   never 'undefined', for her and for NPCs; 12 bot buổi with agTry forced to miss and agSoft forced on.
   usage: python3 dev/build/assemble.py && node dev/test/soft-line.js dev/index.html */
const {chromium}=require('playwright');const U='file://'+require('path').resolve(process.argv[2]||'dev/index.html');
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto(U,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;window.__agAll=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
const r=await p.evaluate(()=>{const o={};const v=liveRivals(true).find(x=>!x.coop);
 o.me=String(agSoftTxt(S));o.npc=String(agSoftTxt(v));
 const t0=agTry,s0=agSoft;window.agTry=agTry=()=>false;window.agSoft=agSoft=()=>true;const L=[];const l0=log;window.log=log=function(t){L.push(String(t));return l0.apply(this,arguments)};
 const R=[];try{for(let i=0;i<12&&!S.dead;i++){Q.length=0;S.mg=0;try{placeWhere();agFlush()}catch(e){}try{nextBuoi()}catch(e){}Q.length=0}
  try{for(const k of Object.keys(AGL&&AGL.stat||{}))0}catch(e){}}finally{window.agTry=agTry=t0;window.agSoft=agSoft=s0;window.log=log=l0}
 const all=L.concat((S.log||[]).map(x=>String(x&&x.t||x)).slice(-400));o.bad=all.filter(t=>/undefined|NaN|\{n\}/.test(t)).slice(0,5);o.soft=all.filter(t=>/bại|không thành/.test(t)).length;o.n=all.length;return o});
ok(r.me&&!/undefined/.test(r.me),'her soft-fail line is real',r.me);
ok(r.npc&&!/undefined/.test(r.npc)&&r.npc.length>8,'an NPC soft-fail line is real',r.npc);
ok(!r.bad.length,'12 buổi with every agent roll soft-failing: no undefined / NaN / {n} line',r.bad);
ok(!errs.length,'no page errors',errs.slice(0,2));
const n=res.filter(x=>!x).length;console.log(n?`SOFT-LINE: ${n} FAIL`:`SOFT-LINE: ALL ${res.length} PASS (${r.soft} soft lines / ${r.n})`);await b.close();process.exit(n?1:0)})();
