/* AG-CARRY-TURN (jagday-walk r5, law 6c: no tin báo item ever vanishes; law 11: the whole carry group knCarryOut / knCarryIn / knCarryTick / knTb)
   node dev/test/ag-carry-turn.test.js [index.html]
   1 knTb does not rebuild at a half-turned key while the buổi turns (KN.turn): the carried item is still waiting after it
   2 once the turn is done the rebuild lands it at the real key (due 0 → in tinBaoList at khắc 1)
   3 a refused turn (the same buổi key) keeps the carried items when knCarryOut runs again
   4 items still on the road (W, due not reached) when a buổi ends are not dropped: they land at once in the next buổi
   5 knCarryOut first lands the world work still waiting (agDrain), so a deed of the last khắc is read
   6 no page   (live carries across week wraps: ag-walk 4 + dev/handover/reports/probes/rv-jw-agwalk-carry.js) / agent errors */
const {chromium}=require('playwright');const U0=process.argv[2]||'index.html';const URL=/^(https?|file):/.test(U0)?U0:'file://'+require('path').resolve(U0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{const o={};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv())break}
  window.__bot=1;window.__agAll=1;window.__tmOff=1;Q.length=0;for(let i=0;i<8&&(S.buoi||0)!==1;i++){Q.length=0;S.mg=0;try{nextBuoi()}catch(e){}Q.length=0}placeWhere();agFlush();
  const it=(id,due)=>({id:"x:"+id+":c",k:"gossip",place:"lc",k0:-1,k1:-1,who:"",line:"thử",by:"mat",seen:0,ended:0,carry:1,due});
  const has=id=>{used=0;KN.m=null;return tinBaoList().some(x=>x.id==="x:"+id+":c")};
  /* 1 + 2 */
  knTb();S.tb.C=[it("a",0)];S.tb.Cb=bkey();KN.turn=1;const b0=S.buoi;S.buoi=(b0+1)%4;let mid=null;try{knTb();mid=(S.tb.C||[]).length}finally{KN.turn=0}
  o.t1={mid,b:S.tb.b};o.t2=has("a");S.buoi=b0;S.tb.b=null;knTb();
  /* 3 */
  S.tb.C=[it("b",0)];S.tb.Cb=bkey();const A0=adHapNow;adHapNow=function(){KN.raw=[];return[]};try{knCarryOut()}finally{adHapNow=A0}o.t3=(S.tb.C||[]).map(x=>x.id);
  /* 4 */
  S.tb.C=[];S.tb.W=[it("w",3)];S.tb.b="old";o.t4=has("w");
  /* 5 */
  let dr=0;const D0=agDrain;agDrain=function(){dr++;return D0.apply(this,arguments)};try{knCarryOut()}finally{agDrain=D0}o.t5=dr;
  o.errs=AG.errs.slice(0,5);return o});
 ok(r.t1.mid===1,'1 no rebuild at a half-turned key while the buổi turns: the carried item still waits',r.t1);
 ok(r.t2===true,'2 after the turn the rebuild lands it at the real key',r.t2);
 ok(r.t3.includes("x:b:c"),'3 a refused turn keeps the carried items when knCarryOut runs again',r.t3);
 ok(r.t4===true,'4 items still on the road when the buổi ends land at once in the next buổi',r.t4);
 ok(r.t5>=1,'5 knCarryOut first lands the world work still waiting (agDrain)',r.t5);
 ok(!errs.length&&!r.errs.length,'6 no page / agent errors',errs.concat(r.errs).slice(0,3));
 await b.close();const n=res.filter(x=>!x).length;console.log(n?`${n} FAIL`:`AG-CARRY-TURN: ALL ${res.length} PASS`);process.exit(n?1:0)})().catch(e=>{console.error(e);process.exit(1)});
