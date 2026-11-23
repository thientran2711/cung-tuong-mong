/* PARALLEL TIME round 2 (jptime §12–17; Foreman D #3 rulings 18/11 (a) summons, (c) NPC giftin / invite / shop) — unit test.
   node dev/test/ptime2.test.js [dev/index.html]
   12 jstip «Sai <cung nữ> đi đòi» · 13 jveil «Sai người mua lén ngoài cung» · 14 jmkt «Sai tai mắt dò bên chủ hội»
   15 summons: Truyền thái y (card k = order, physician away, treat at due, second summon locked) · Mời thái y bắt mạch (courtAct bm)
   16 two-way: an NPC's gift is carried by her servant (no modal now, the «Quà tặng» card at due) · an NPC host's invitation lands at due
   17 Nhờ thái giám mua đồ: the tray comes at due · no page / jptime errors */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:60000}).catch(()=>{});
 const r=await p.evaluate(()=>{const o={};const E=(k,f)=>{try{o[k]=f()}catch(e){o[k]="ERR "+e.message}};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;
  for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv()&&S.maid&&!S.out)break}
  window.__bot=1;Q.length=0;S.mg=0;const toB0=()=>{for(let i=0;i<12&&!((S.buoi||0)===0&&used===0);i++){Q.length=0;S.mg=0;try{nextBuoi()}catch(e){}Q.length=0}};
  const R=BAL.ptime.kinds;const land=k=>{const a=S.away.filter(x=>x.kind===k).pop();return a};
  /* 12 jstip */
  E("stip",()=>{toB0();S.maid.loyal=80;S.maid.spyFor=null;const ev=stipEvent([],{bac:5,sup:null,why:"thử"});const op=ev.opts.find(x=>x.n===`Sai ${S.maid.name} đòi lại phần bị cắt xén`);
   const u0=used,b0=S.bac,l0=S.maid.loyal;op.go();const a=land("ask");const r={x:op.x,u:used-u0,away:!!PTIME.away("mm:me"),due:a&&a.due-ptNow()};spend(R.ask.n);r.back=!!(a&&a.back);r.rep=a&&a.rep&&a.rep.t;r.d=[S.bac-b0,S.maid.loyal-l0];return r});
  /* 13 jveil */
  E("veil",()=>{toB0();Q.length=0;S.bac=500;S.maid.loyal=90;const d=PEND.vlout({});const op=(d&&d.o||[]).find(x=>x.fx&&x.fx.bac<0);if(!op)return"no option";const ag=vlAgent(S);
   const u0=used,b0=S.bac;apply(op.fx);spend(1);used-=1;op.go();const a=land("vlbuy");const r={j:op.j67,u:used-u0,away:!!PTIME.away(ptPid(ag)),paid:S.bac-b0};
   const d2=PEND.vlout({});const op2=(d2.o||[]).find(x=>x.fx&&x.fx.bac<0);r.lock2=!!(op2&&op2.lock);spend(R.vlbuy.n-R.vlbuy.o);r.back=!!(a&&a.back);r.rep=a&&a.rep&&a.rep.t;r.net=S.bac-b0;return r});
  /* 14 jmkt */
  E("mkt",()=>{toB0();S.bac=500;const e0=eyes;eyes=()=>99;const th=Object.keys(TS_THEME)[0];const L=tsMkScoutOpts(th,S.month||1);const op=L.find(x=>x.n==="Sai tai mắt dò bên chủ hội");if(!op)return"no option "+L.map(x=>x.n).join("/");
   eyes=e0;const u0=used;op.go();const a=land("mktspy");const r={x:op.x,u:used-u0,who:a&&a.nm,due:a&&a.due-ptNow()};spend(R.mktspy.n);r.back=!!(a&&a.back);r.rep=a&&a.rep&&a.rep.t;return r});
  /* 15 summons */
  E("treat",()=>{toB0();S.bac=500;S.ill={k:Object.keys(ILL)[0],st:1};const c=illCards().find(x=>x.n==="Truyền thái y");if(!c)return"no card";const u0=used;spend(c.k);apply(c.c||{});c.go();
   const a=land("summon");const r={k:c.k,x:c.x,u:used-u0,away:!!PTIME.away(ptDocId()),run:a&&a.a.run};const c2=illCards().find(x=>x.n==="Truyền thái y");r.lock2=!!(c2&&c2.lock);r.why=c2&&c2.t;
   spend(R.summon.n-R.summon.o);r.back=!!(a&&a.back);r.rep=a&&a.rep&&a.rep.t;S.ill=null;return r});
  E("bm",()=>{toB0();Q.length=0;S.bac=500;const u0=used;courtAct("bm","ty");const a=land("summon");const r={u:used-u0,run:a&&a.a.run,q0:Q.filter(x=>/Thái y bắt mạch/.test(x.t||"")).length};/* only the verdict card counts (a random world event may queue on its own) */spend(R.summon.n-R.summon.o);r.back=!!(a&&a.back);r.q=Q.map(x=>x.t);Q.length=0;return r});
  /* 16 two-way */
  E("giftin",()=>{toB0();Q.length=0;const v=liveRivals(true).find(x=>x.alive&&!x.out);v.inv=v.inv||[];v.inv.push({k:"tramngoc"in IT?"tramngoc":Object.keys(IT)[0]});const ln=giveTo(v,S,v.inv.length-1);
   const a=S.away.filter(x=>x.kind==="giftin").pop();const r={ln,q0:Q.length,by:a&&a.by,who:a&&a.who};spend(R.giftin.n);r.back=!!(a&&a.back);r.q=Q.map(x=>x.t);Q.length=0;return r});
  E("inv",()=>{toB0();Q.length=0;S.invQ=[];const v=liveRivals(true).find(x=>x.alive&&!x.out&&!x.confined);const f=AGRUN["cx3:invite2"];if(!f)return"no AGRUN";f(v,S);
   const a=S.away.filter(x=>x.kind==="npcinv").pop();const r={wrapped:!!f.__pt,q:S.invQ.length,away:!!a};const f2=AGRUN["cx3:invite2"](v,S);r.dup=S.away.filter(x=>x.kind==="npcinv"&&!x.back).length;
   spend(R.npcinv.n);r.back=!!(a&&a.back);r.where=S.where[v.id]===palaceOf(v);r.qAfter=S.invQ.length;return r});
  /* 17 shop */
  E("shop",()=>{toB0();Q.length=0;invAct("shop");const a=land("shop");const r={q0:Q.length,away:!!PTIME.away("eun:nvp")};spend(R.shop.n);r.back=!!(a&&a.back);r.q=Q.map(x=>x.t);Q.length=0;return r});
  /* 18 FAIL 7 item 4: an NPC deed by a SENT servant (mindRun / runAct / exec70) = S.away + due khắc; the servant is locked; the NPC's away maid is locked for every deed */
  E("npcDeed",()=>{toB0();Q.length=0;const L=liveRivals(true).filter(v=>v&&v.alive&&!v.out&&!v.confined&&(v.staff||[]).length);S.place="home";S.where=S.where||{};let v=null;/* a consort NOT in the same place as her (her place and theirs vary by life) */
   for(const x of L.filter(x=>!sameHouse(x,S))){for(const w of ["vuon","nvp","tn","cnh","home"]){S.where[x.id]=w;if(!together(x,S)){v=x;break}}if(v)break;S.place="vuon"}if(!v)return{tog:1};const x={};const n0=S.away.length;const sv=bestSent(v);
   x.r=mindRun(v,S,"rumor",0);const a=S.away[S.away.length-1];x.sent=S.away.length===n0+1&&a&&a.by==="v"+v.id&&a.kind==="harm";x.who=a&&a.who;x.svId=(v.staff||[]).some(z=>ptPid(z,v)===(a&&a.who))?a.who:null;x.due=a?a.due-ptNow():null;
   x.busy=!!(a&&ptBusy(a.who));const b2=bestSent(v);x.notSame=!b2||ptPid(b2,v)!==a.who;
   x.r2=runAct(v,S,"rumor");x.sent2=S.away.length>=n0+(b2?2:1);
   const l0=S.logSeq||0;spend(BAL.ptime.kinds.harm.n);x.back=!!(a&&a.back);x.logged=(S.logSeq||0)>l0;
   /* NPC maid away = locked for her other deeds */S.away.push({id:"t-m",who:"mm:"+v.id,nm:"x",kind:"spy",by:"v"+v.id,t0:ptNow(),due:ptNow()+2,back:0,a:{},lbl:""});
   x.maidLock=AGRUN["cx2:maidTalk"]?AGRUN["cx2:maidTalk"](v)==="":true;S.away=S.away.filter(z=>z.id!=="t-m");return x});
  /* 19 Cài người hầu vào cung (j10 plantsv): the servant walks over, placed at due (BAL.ptime.kinds.bribe true) */
  E("plantsv",()=>{toB0();Q.length=0;if(!(S.staff||[]).length)return null;S.bac=Math.max(S.bac||0,BAL.house.plantBac+50);const d=PEND.plantsv({});const op=d&&d.o.find(x=>x.kgt);if(!op||op.lock)return null;/* no free servant: nothing to send */
   const u0=used,t0=ptNow();op.go();const a=S.away.filter(z=>z.kind==="bribe").pop();const x={x:op.x,u:used-u0,away:!!a,due:a?a.due-t0:null};spend(BAL.ptime.kinds.bribe.n);x.back=!!(a&&a.back);return x});
  /* FAIL 7 item 1: jptime never re-registers «tin» on render, and stays off it when MAIN's jerr errIcon is in the build */
  E("icon",()=>{const x={};let n=0,rf=0;const s0=kitStatusIcon.set,r0=kitStatusIcon.refresh;
    /* count only jptime's OWN «tin» registration (ptIconReg); MAIN's jerr (IIFE, window.ERR) sets «tin» from its own render wrapper */
    kitStatusIcon.set=function(id){if(id==="tin"&&/ptIconReg/.test(String(new Error().stack)))n++;return s0.apply(this,arguments)};kitStatusIcon.refresh=function(){rf++;return r0.apply(this,arguments)};
    const had=Object.prototype.hasOwnProperty.call(window,"errIcon"),e0=window.errIcon;x.jerr=!!window.ERR;
    try{render();render();x.onRender=n;if(!x.jerr)window.errIcon=function(){x.err=(x.err||0)+1};const n0=n,f0=rf;ptIcon();x.setWithErr=n-n0;x.refresh=rf-f0;x.own=ptErrOwn()}
    finally{kitStatusIcon.set=s0;kitStatusIcon.refresh=r0;if(had)window.errIcon=e0;else delete window.errIcon}
   const sp=ptPanel();x.facts=Array.isArray(sp.facts);x.noH=!sp.h;return x});
  o.errs=PT.stat.errs.slice();return o});
 console.log(JSON.stringify(r));const BAL_HN=2;
 const S=r.stip;ok(S&&S.u===0&&S.away&&S.due===2&&/chờ 2 khắc/.test(S.x)&&S.back&&S.rep,"12 jstip đi đòi: no order khắc, maid away 2, lands at due",S);
 const V=r.veil;ok(V&&V.u===1&&V.away&&V.lock2&&V.back&&/chờ 2 khắc/.test(V.j)&&V.paid<0&&V.net===V.paid,"13 jveil mua lén: 1 khắc order, agent away + locked, bạc paid once, lands at due",V);
 const M=r.mkt;ok(M&&M.u===0&&M.who&&M.due===2&&M.back&&/chờ 2 khắc/.test(M.x),"14 jmkt tai mắt: a real runner goes, lands at due",M);
 const T=r.treat;ok(T&&T.k===1&&T.u===1&&T.away&&T.lock2&&T.back&&T.run==="thyTreat"&&/chờ 2 khắc/.test(T.x),"15 Truyền thái y: order 1 khắc, physician away, 2nd summon locked, treat at due",T);
 const B=r.bm;ok(B&&B.u===1&&B.run==="thyPay"&&B.q0===0&&B.back&&B.q.includes("Thái y bắt mạch"),"15 Mời thái y bắt mạch: no card now, the physician's verdict at due",B);
 const G=r.giftin;ok(G&&G.q0===0&&/^v/.test(G.by||"")&&G.back&&G.q.includes("Quà tặng"),"16 NPC gift: carried by her servant, «Quà tặng» at due (not at once)",G);
 const I=r.inv;ok(I&&I.wrapped&&I.q===0&&I.away&&I.dup===1&&I.back&&I.where&&I.qAfter===0,"16 NPC invitation: runner away, one at a time, lands at due (no double wait)",I);
 const H=r.shop;ok(H&&H.q0===0&&H.away&&H.back&&H.q.includes("Nhờ thái giám mua đồ"),"17 shop: the tray comes at due",H);
 const N=r.npcDeed;ok(N&&(!N.tog&&(N.r===""&&N.sent&&N.who===N.svId&&N.due===BAL_HN&&N.busy&&N.notSame&&N.r2===""&&N.sent2&&N.back&&N.maidLock)),"18 two-way: NPC deed by a sent servant = away + due khắc, servant locked, lands; NPC maid away locked for other deeds",N);
 const P=r.plantsv;ok(P===null||(P&&P.u===1&&P.away&&P.due===2&&P.back&&/chờ 2 khắc/.test(P.x)),"19 Cài người hầu vào cung: servant away 2, placed at due",P);
 const IC=r.icon;ok(IC&&IC.onRender===0&&IC.setWithErr===0&&IC.own&&(IC.jerr?IC.refresh>=1:IC.err===1)&&IC.facts&&IC.noH,"FAIL7-1 «tin»: never registered on render; MAIN's errIcon owns it when present; fallback panel = kit facts spec",IC);
 ok(!(r.errs||[]).length,"no jptime errors",r.errs);ok(!errs.length,"no page errors",errs.slice(0,3));
 await b.close();console.log(res.every(Boolean)?"ALL OK":"FAILED");process.exit(res.every(Boolean)?0:1)})().catch(e=>{/* a crash inside the page is a clean FAIL line (reviewer note) */console.log("FAIL crash: "+(e&&e.message||e).toString().slice(0,300));process.exit(1)});
