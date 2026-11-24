/* review ag-all-2 r2 W1 — storm and the agent day plan (owner OD 17/11 ~18:05Z: weather never closes a place; staying indoors is the NPC's own choice, by odds).
   node dev/test/ag-wx.js [dev/index.html]
   1 storm buổi: of the NPCs whose plan picks the garden, some keep it (odds 100 − BAL.wx.fx.storm.leave) and some re-plan indoors (AGD.stat.wxStay / wxLeave)
   2 the jwxk sweep does not move a planned NPC; the plan (agDaySlot), the record row and S.where agree after placeWhere
   3 jweather hits only NPCs really in the garden (final placement)
   4 no storm → no re-plan (stats unchanged); no page errors */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{const o={};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv())break}
  window.__bot=1;window.__agAll=1;Q.length=0;o.agD=agDOn();
  const st0=window.wxkStormB,sv0=window.wxSev,fx0=window.wxkFx,hit0=window.wxHit;
  /* 4 no storm: stats unchanged */window.wxkStormB=()=>false;const s0=[AGD.stat.wxStay||0,AGD.stat.wxLeave||0];for(let i=0;i<20;i++){agDz().d=-1;agDayEnsure()}o.noStorm=[(AGD.stat.wxStay||0)-s0[0],(AGD.stat.wxLeave||0)-s0[1]];
  /* 1 storm: every outdoor pick decides by odds */window.wxkStormB=()=>true;const a0=[AGD.stat.wxStay||0,AGD.stat.wxLeave||0];for(let i=0;i<300;i++){agDz().d=-1;agDayEnsure()}
  o.stay=(AGD.stat.wxStay||0)-a0[0];o.leave=(AGD.stat.wxLeave||0)-a0[1];o.leaveP=BAL.wx.fx.storm.leave;
  /* 2 + 3 a storm buổi: placeWhere with the sweep and the hit live */
  window.wxkFx=n=>n==="storm"?1:fx0(n);window.wxSev=()=>true;const hit=[];window.wxHit=(v,R)=>{hit.push(v.id);return ""};const pwT=placeWhere;const hb=[];placeWhere=function(){hit.length=0;const x=pwT.apply(this,arguments);for(const id of hit)if((S.where||{})[id]!=="vuon")hb.push(id);hit.length=0;return x};/* every placeWhere (nextBuoi too): who was hit vs where she is when it returns */
  let bad=[],planned=0,inG=0;
  try{for(let t=0;t<6;t++){agDz().d=-1;placeWhere();agFlush();const W=S.where||{};const R=typeof agRec==="function"?agRec():null;const kh=agKh();
    for(const v of liveRivals(true)){if(!v.alive||v.out||v.confined)continue;const s=agDaySlot("v"+v.id);if(!s)continue;planned++;
     const rec=R&&R.P["v"+v.id]&&R.P["v"+v.id][kh]?R.P["v"+v.id][kh][0]:null;
     if(j95on()){if(rec!==W[v.id])bad.push([v.id,"rec",rec,W[v.id]])}else if(W[v.id]!==s.pl)bad.push([v.id,"plan",s.pl,W[v.id]]);
     if(W[v.id]==="vuon")inG++}
    hit.length=0;Q.length=0;S.mg=0;try{nextBuoi()}catch(e){}Q.length=0}}
  finally{window.wxkStormB=st0;window.wxSev=sv0;window.wxkFx=fx0;window.wxHit=hit0;placeWhere=pwT}o.hitBad=hb;
  o.bad=bad.slice(0,5);o.planned=planned;o.inG=inG;return o});
 ok(r.agD,'agent day plan on',r.agD);
 ok(r.noStorm[0]===0&&r.noStorm[1]===0,'4 no storm: no storm re-plan',r.noStorm);
 ok(r.stay>0&&r.leave>0&&r.leave>r.stay,'1 storm: of the garden picks some stay and some re-plan indoors, about BAL.wx.fx.storm.leave % leave',{stay:r.stay,leave:r.leave,leaveP:r.leaveP});
 ok(r.planned>0&&r.bad.length===0,'2 the sweep leaves planned NPCs alone: plan / record == S.where',{planned:r.planned,bad:r.bad});
 ok(r.inG>0&&r.hitBad&&r.hitBad.length===0,'3 the weather hits only NPCs really in the garden (final placement)',{inGarden:r.inG,bad:r.hitBad});
 ok(!errs.length,'no page errors',errs.slice(0,3));
 await b.close();const n=res.filter(x=>!x).length;console.log(n?`${n} FAIL`:`AG-WX: ALL ${res.length} PASS`);process.exit(n?1:0)})();
