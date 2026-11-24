/* dev/test/moment.test.js — KHOẢNH KHẮC CHÂN DUNG (jmoment.js, review/moment). Run after dev/build/assemble.py:  node dev/test/moment.test.js
   1 table (every moment has a real trigger: place + season/buổi, a FEST key, or an event) · 2 odds harder as she climbs (law 5) · 3 she earns one at the
   painter's place (dialog → item in her chest, ledger line, ilWhere) · 4 real object: give to an NPC (ledger moves), jlost may take it, shelf may hold it
   · 5 NPC parity: same moOdds for the same numbers; an NPC where the painter stands collects the same item · 6 «chưa vẽ» guard never blank ·
   7 promotion portrait (her + NPC) · 8 once per moment a year + yearly cap · 9 old save without moY loads. Exit 1 on any FAIL. */
const {chromium}=require('playwright');const D=require('./lib/device');
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold');const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const g=await D.openHost(p,srv.url,{timeout:120000});await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});
 await g.evaluate(()=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<40;i++){window.__forceOrigin=null;start();if(!(S.origin&&S.origin.k==='cnv')&&!(window.isSrv&&isSrv()))break}window.__nlInner=0;
  ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});for(let j=0;j<10&&Q.length;j++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM(0);else closeModal()}catch(e){Q.shift()}}});
 const R=await g.evaluate(()=>{const out={fail:[],T:{}};const F=(c,m)=>{if(!c)out.fail.push(m)};const B=BAL.mo;const rnd=Math.random;const lo=()=>{Math.random=()=>0.001},back=()=>{Math.random=rnd};
  Q.length=0;
  /* the painter must exist (real man) */
  if(typeof menInit==="function")menInit();let pt=moPainter();if(!pt){S.men=S.men||[];S.men.push({id:"mtest",name:"Họa sư Lý Thanh",rw:"họa sư",alive:true,age:30,haunts:["vuon","tn"]});pt=moPainter()}
  F(!!pt,"no living Họa sư");
  /* 1 TABLE */
  const rows=[];for(const k in B.list){const M=B.list[k];const ok=M.ev?M.ev==="promo":(!!M.pl&&(M.fest?!!FEST[M.fest]:true)&&(!M.sea||SEASON.includes(M.sea)));rows.push([k,M.n,M.fest||M.sea||"",M.pl||M.ev,ok?"ok":"BAD"]);F(ok,"bad trigger "+k);F(!/%|\d/.test(M.n+M.d),"number/% in player text "+k)}
  out.T.table=rows;
  /* 2 ODDS by rank (same Sắc / Tài) */
  const v=liveRivals(false).filter(x=>x.alive&&!x.out)[0],w=liveRivals(false).filter(x=>x.alive&&!x.out)[1];
  const by=[];const s0={sac:S.sac,tai:S.tai,rank:S.rank};S.sac=60;S.tai=50;for(let r=0;r<8;r++){S.rank=r;by.push(moOdds(S,false))}S.rank=s0.rank;
  out.T.oddsByRank=by;F(by.every((x,i)=>!i||x<=by[i-1])&&by[7]<by[0],"odds do not fall with rank");
  /* parity: the same numbers give the same odds for her and an NPC */
  const vs={sac:v.sac,tai:v.tai,rank:v.rank,queen:v.queen};v.sac=60;v.tai=50;v.rank=3;v.queen=false;S.rank=3;
  out.T.parity={me:moOdds(S,true),npc:moOdds(v,true)};F(out.T.parity.me===out.T.parity.npc,"odds differ her vs NPC");S.rank=s0.rank;Object.assign(v,vs);S.sac=s0.sac;S.tai=s0.tai;
  /* 3 SHE EARNS: Đông, sáng, painter at Ngự hoa viên */
  S.month=11;S.tuan=2;S.buoi=0;S.moBusy=null;S.moY={};S.menW={[pt.id]:"vuon"};S.where=S.where||{};S.where.emp="thu";Q.length=0;
  window.moOffer("vuon");const card=Q[0];F(card&&card.t==="Họa sư đang vẽ"&&card.opts&&card.opts.length===3,"no painter card at vuon");
  out.T.card=card?{t:card.t,opts:card.opts.map(o=>o.n+" | "+(typeof dilLine==="function"?String(dilLine(o)).replace(/<[^>]+>/g,""):""))}:null;
  if(card){F(!card.opts.some(o=>/%/.test(o.n+o.x)),"% in options");lo();chooseM(0);back()}
  const mine=S.inv.filter(e=>e.k==="chandung"&&e.of==="me");F(mine.length===1&&mine[0].mo==="dongmai","no Dưới tuyết mai portrait in her chest");const e=mine[0];
  F(e&&S.moY.dongmai===S.year,"moY not set");F(e&&ilWhere(e)==="me","ledger: not with her");F(e&&(S.il.log||[]).some(L=>L[2]==="chandung"&&L[4]==="me"),"no ledger line");
  F(Q.some(m=>m.t==="Khoảnh khắc chân dung"),"no reward card");out.T.name=e?iname(e):"";Q.length=0;
  /* a second offer the same buổi: painter busy */
  window.moOffer("vuon");F(!Q.length,"painter painted twice in one buổi");
  /* 4 REAL OBJECT */
  const ix=S.inv.indexOf(e);F(typeof loOk==="function"?loOk(e):true,"jlost may not take it (theft impossible)");
  const shelfOk=!!(BAL.shelf&&BAL.shelf.it&&BAL.shelf.it.chandung);F(shelfOk,"not displayable on the shelf");
  const gv=giveTo(S,v,ix);const wv=ilWhere(e);const sameE=x=>x&&x.k==="chandung"&&x.iu===e.iu;F(!!e.iu&&((wv==="me"&&S.inv.some(sameE))||(String(wv)===String(v.id)&&(v.inv||[]).some(sameE))),"give to NPC: piece not traced "+wv);
  const e2=moGrant(S,"hasen","test");const ix2=S.inv.indexOf(e2);let ge="";{ge=giveTo(S,"emp",ix2);F(!S.inv.includes(e2)&&ilWhere(e2)==="emp","give to Hoàng thượng: ledger "+ilWhere(e2))}
  out.T.give={npc:String(gv).replace(/<[^>]+>/g,"").slice(0,120),npcWhere:wv,emp:String(ge).replace(/<[^>]+>/g,"").slice(0,120),empWhere:typeof e2!=="undefined"?ilWhere(e2):""};
  /* 6 GUARD */
  const pics=[moPic(e),moPic({k:"chandung",mo:"hasen",of:"me",src:""}),moPic({k:"chandung",mo:"hasen",of:"99999",src:""}),kitItemInfo(e).src];
  out.T.pics=pics;F(pics.every(s=>typeof s==="string"&&s.length>4),"blank picture");F(!moDrawn(e),"art map not empty yet (guard must be on)");
  /* 5 NPC COLLECTS: next buổi, w at vuon with the painter */
  S.buoi=1;S.moBusy=null;const n0=(w.inv||[]).filter(x=>x.k==="chandung").length;w.moY={};S.where={emp:"thu",[w.id]:"vuon"};S.menW={[pt.id]:"vuon"};
  for(const x of liveRivals(true))if(x!==w)S.where[x.id]="tyv";lo();window.moNpcPass();back();
  const wn=(w.inv||[]).filter(x=>x.k==="chandung");F(wn.length===n0+1,"NPC did not collect");
  const we=wn[wn.length-1];F(we&&we.mo==="dongmai"&&ilWhere(we)!=null,"NPC portrait not traced");out.T.npc=we?{who:w.name,mo:we.mo,where:ilWhere(we)}:null;
  /* 8 CAP: once per moment a year, at most capY a year */
  F(!moFree(S,"dongmai",S.year),"same moment twice a year");const H={moY:{a:S.year,b:S.year}};F(!moFree(H,"c",S.year)===(B.capY<=2),"cap not enforced");F(moFree(S,"dongmai",S.year+1),"next year blocked");
  /* 10 FESTIVAL WORK ORDER: Thượng Nguyên tuần, tối → the schedule (jmen) puts the Họa sư at the feast; other buổi it does not */
  {const m0=S.month,t0=S.tuan,b0=S.buoi;S.month=1;S.tuan=1;Q.length=0;S.place="home";const fo={};for(const bb of [0,3]){S.buoi=bb;placeWhere();fo["b"+bb]=(S.menW||{})[pt.id]||"";}
   out.T.festOrder=Object.assign(fo,{why:(S.menWhy||{})[pt.id],open:moOpen("vuon",SEASON[0],3,"nguyentieu")});F(fo.b3==="vuon"&&out.T.festOrder.open.includes("nguyentieu"),"no festival work order at the feast");
   F(!moOpen("vuon",SEASON[0],0,"nguyentieu").includes("nguyentieu"),"festival moment open at the wrong buổi");S.month=m0;S.tuan=t0;S.buoi=b0;Q.length=0}
  /* 11 REACHABLE (E73r item 1, law 6b): walk the REAL schedule (placeWhere → jmen menSched + the moment work orders) 2 years × 12 months × 3 tuần × 4 buổi,
     no forced S.menW; count the buổi where the Họa sư really stands at the moment's place with that moment open. Every place moment must be > 0. */
  {const keep={y:S.year,m:S.month,t:S.tuan,b:S.buoi,turn:S.turn,pl:S.place};const H={},road0=Object.assign({},S.moRoad||{});for(const m in B.list)H[m]=0;let alive=0;const t0=S.turn||0;
   for(let y=0;y<2;y++)for(let mo=1;mo<=12;mo++)for(let t=0;t<3;t++)for(let bb=0;bb<4;bb++){S.year=keep.y+y;S.month=mo;S.tuan=t;S.turn=t0+y*12+mo-1;S.buoi=bb;S.place="home";Q.length=0;
    for(const x of liveRivals(true))x.moY={};try{placeWhere()}catch(x){out.fail.push("placeWhere threw "+x.message);break}
    const P=moPainter();if(!P)continue;alive++;const f=festToday();const fkk=f?f.k:"";
    for(const m in B.list){const M=B.list[m];if(M.ev){if(bb===0&&t===0&&mo===1)H[m]++;continue}if((S.menW||{})[P.id]===M.pl&&moOpen(M.pl,SEASON[mo-1],bb,fkk).includes(m))H[m]++}}
   Q.length=0;Object.assign(S,{year:keep.y,month:keep.m,tuan:keep.t,buoi:keep.b,turn:keep.turn,place:keep.pl});
   const rd={};for(const k in (S.moRoad||{}))rd[k]=(S.moRoad[k]||0)-(road0[k]||0);out.T.reach2y=Object.assign({},H,{"(painter alive buổi)":alive,"(NPC roads taken)":rd});
   for(const m in H)F(H[m]>0,"moment never reachable in 2 years: "+m)}
  /* 12 NPC BRIBE ROAD (E73r item 3, law 1): same roads, same price, bạc spent, rumour → her Danh, item traced */
  {S.buoi=2;S.moBusy=null;w.moY={};w.bac=500;const d0=w.danh||0,b0=w.bac;S.where={emp:"thu",[w.id]:"vuon"};S.menW={[pt.id]:"vuon"};for(const x of liveRivals(true))if(x!==w)S.where[x.id]="tyv";
   const np=window.npwPick;window.npwPick=npwPick=(L)=>L.includes("bribe")?"bribe":np(L);const RD=moRoads(moOdds(w,false));lo();window.moNpcPass();back();window.npwPick=npwPick=np;
   const got=(w.inv||[]).filter(x=>x.k==="chandung"&&x.mo==="dongmai"&&x.y===S.year);out.T.npcBribe={price:RD.br,bacPaid:b0-w.bac,danh:(w.danh||0)-d0,got:got.length,where:got[0]?ilWhere(got[0]):null};
   F(b0-w.bac===RD.br,"NPC bribe: bạc not spent at the same price");F((w.danh||0)-d0===B.rumorDanh+B.danh,"NPC bribe: rumour did not hit her Danh");F(got.length===1&&ilWhere(got[0])!=null,"NPC bribe: no traced painting")}
  /* 13 EQUAL VALUE (E73r item 2, law 2/3): sit vs bribe within BAL.pm.eqTol at every rank and Sắc, incl. the clamp at hi; each road has a gain and a cost */
  {const tol=BAL.pm.eqTol;const tab=[];const s1={sac:S.sac,tai:S.tai,rank:S.rank};for(const sc of [20,60,100])for(let r=0;r<B.bar.length;r++){S.rank=r;S.sac=sc;S.tai=sc;const RD=moRoads(moOdds(S,false)),RE=moRoads(moOdds(S,true));
    for(const X of [RD,RE]){const d=Math.abs(X.sit-X.bribe);tab.push([sc,r,X.p0,X.p1,X.br,+X.sit.toFixed(1),+X.bribe.toFixed(1),+d.toFixed(1)]);F(d<=tol,`unequal roads Sắc ${sc} rank ${r}: ${d.toFixed(1)}`);F(X.br>0&&B.kh>0,"a road with no cost")}}
   Object.assign(S,s1);out.T.eq=tab.filter((x,i)=>i%2===0).map(x=>x.join(" "))}
  /* 14 LOG SCAN (E73r item 4): every moment log line after Thôi / ✕ + re-offer, busy NPC, bribe rumour, NPC sitting — no undefined/null/NaN */
  {const CAP=[],log0=log;log=function(h){CAP.push(String(h));return log0.apply(this,arguments)};S.buoi=0;S.month=11;S.tuan=2;S.moY={};S.menW={[pt.id]:"vuon"};S.where={emp:"thu"};S.place="vuon";
   for(const pick of [2,"close"]){S.moBusy=null;Q.length=0;window.moOffer("vuon");if(pick==="close")Q.length=0;else chooseM(pick);Q.length=0;window.moOffer("vuon");window.moOffer("vuon");try{placeWhere()}catch(x){}Q.length=0}
   const at=()=>{S.menW={[pt.id]:"vuon"};S.where={emp:"thu"};S.place="vuon"};at();S.moBusy=null;S.bac=Math.max(S.bac||0,500);window.moOffer("vuon");lo();if(Q[0]&&Q[0].opts)chooseM(1);back();Q.length=0;
   at();S.moBusy=null;S.moY={};window.moOffer("vuon");Math.random=()=>0.999;if(Q[0]&&Q[0].opts)chooseM(0);back();Q.length=0;
   S.buoi=1;S.moBusy=null;w.moY={};S.mat=9;S.where={emp:"thu",[w.id]:"vuon"};S.menW={[pt.id]:"vuon"};for(const x of liveRivals(true))if(x!==w)S.where[x.id]="tyv";lo();window.moNpcPass();back();S.moY={};window.moOffer("vuon");Q.length=0;
   log=log0;const lines=CAP;const bad=lines.filter(x=>/undefined|null|NaN/.test(x));out.T.logScan={lines:lines.length,bad,sample:lines.map(x=>x.replace(/<[^>]+>/g,"").slice(0,90))};F(lines.length>=6,"log scan saw too few moment lines");F(!bad.length,"log line with undefined/null/NaN: "+bad[0])}
  /* 7 PROMOTION (her + NPC) */
  const pr={};for(const who of [S,w]){who.moY={};const k0=who===S?S.rank:w.rank;const old=promoReqP;window.promoReqP=()=>[[true]];promoReqP=window.promoReqP;lo();try{promoteP(who)}catch(x){out.fail.push("promoteP threw "+x.message)}back();promoReqP=old;window.promoReqP=old;
   pr[who===S?"me":"npc"]=(who.inv||[]).some(x=>x.k==="chandung"&&x.mo==="sacphong")}
  out.T.promo=pr;F(pr.me&&pr.npc,"promotion portrait missing "+JSON.stringify(pr));
  /* bag tiles: each painting its own tile with a picture (no ×N stack) */
  {const a1=moGrant(S,"thucuc","test"),a2=moGrant(S,"xuandao","test");const T=kinvItems().filter(x=>x.g&&x.g.k==="chandung");
   out.T.bag=T.map(x=>[x.name,x.grade,x.qty,!!x.src]);F(T.length>=2&&T.every(x=>x.qty===1&&x.src&&/Tranh «/.test(x.name)),"bag tiles stacked or blank")}
  /* gallery rows */
  const gb=moBookHTML();F(/Khoảnh khắc chân dung/.test(gb)&&/class="/.test(gb),"no gallery rows");
  /* 9 OLD SAVE: a life without moY / moBusy */
  delete S.moY;delete S.moBusy;S.buoi=0;S.menW={[pt.id]:"vuon"};Q.length=0;try{window.moOffer("vuon")}catch(x){out.fail.push("old save threw "+x.message)}Q.length=0;
  return out});
 /* 15 LITERALS (E73r item 5, law 4): outside the BAL.mo table no number in jmoment code but 0 / 1 (index, flag, ±1 counter) and 100 (odds → share) */
 {const src=require('fs').readFileSync(require('path').join(__dirname,'../build/jmoment.js'),'utf8').replace(/\/\*[\s\S]*?\*\//g,"");const i0=src.indexOf("Object.assign(BAL,{mo:"),i1=src.indexOf("/*CORE{*/")>=0?src.indexOf("function moTop"):-1;
  const code=src.slice(i1);const nums=[...code.matchAll(/(?<![\w.$])\d+(?:\.\d+)?(?![\w])/g)].map(m=>m[0]).filter(n=>!["0","1","100"].includes(n));
  R.T.literals=nums;if(nums.length)R.fail.push("typed numbers in jmoment: "+[...new Set(nums)].join(","))}
 console.log(JSON.stringify(R.T,null,1));for(const f of R.fail)console.log("FAIL "+f);if(errs.length)console.log("page errors:",errs.slice(0,5));
 const ok=!R.fail.length&&!errs.length;console.log(ok?"MOMENT TEST PASS":"MOMENT TEST FAIL");await b.close();srv.close&&srv.close();process.exit(ok?0:1)})().catch(e=>{console.error(e);process.exit(1)});
