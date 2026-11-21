/* origin-arts — EVERY IDENTITY (origin × its story road) HAS ITS OWN START ARTS (owner OD 20/11 ~02:05Z: "mỗi một thân phận là có 4 nhánh chuyện ...
   thì phải là 4 các cái tài nghệ của mỗi thân phận khác nhau đi cho nó đa dạng"; OD ~02:15Z each set fits its road; OD ~01:50Z noble higher, poor lower).
   node dev/test/origin-arts.js [dev/index.html]
   1 survey: every origin (ORIGINS + country branches ORIGIN_BR) has a BAL.orig.art row whose road keys are exactly that origin's real story roads
     (ARC67 premise arcs, nrRoads) + "" (the origin's own row); prints the true identity count
   2 one core (law 4): every key is a real art (ARTS) or virtue (VIR), every bậc an integer 1..5; no ORIGINS / ORIGIN_BR entry keeps an art:{} (law 14)
   3 variety: no two identities share the same set (keys + bậc); ~4 arts each (3..4)
   4 noble > poor, law 2: every road of one origin has the same total bậc and the same training points (bậc L = L(L+3)/2, j85 addArtP); tt/nc/bd > muoi/cn/thd > cnv; each road row holds the origin row's art
   5 new game: for every origin (forced) her S.arts / S.vir = the row of the road STORY init rolled (S.st.f14.road), every other art 0;
     F14 off (no road) → the origin's own row
   6 old saves keep their arts: a save serialised with other arts loads with the same S.arts / S.vir
   7 NPC upbringing (mg-fair-hands): mgOrgLv reads the NPC's identity row (v.nr.o × v.nr.r), no road → the origin row, td_<k> boards read the virtue;
     the player herself 0 (her row is already in her arts)
   8 no page errors */
const {chromium}=require('playwright');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;
  const T=BAL.orig.art,o={};const keysOf=k=>Object.keys(T[k]||{}).filter(x=>x!=="").sort();
  const origins=ORIGINS.map(x=>x.k).concat(Object.keys(ORIGIN_BR));
  /* 1 */
  o.survey=origins.map(k=>{const roads=nrRoads(k).slice().sort();return{k,roads:roads.length,match:JSON.stringify(roads)===JSON.stringify(keysOf(k)),own:!!(T[k]&&T[k][""])}});
  o.ids=origins.reduce((a,k)=>a+keysOf(k).length,0);o.extra=Object.keys(T).filter(k=>!origins.includes(k)&&!(BAL.start&&BAL.start.npcW&&k in BAL.start.npcW));/* NPC-only origins (balance-core quan) keep an own row only */
  /* 2 */
  const AK=ARTS.map(a=>a.k),VK=VIR.map(v=>v.k);o.bad=[];for(const k in T)for(const rd in T[k])for(const a in T[k][rd]){const v=T[k][rd][a];if(!(AK.includes(a)||VK.includes(a))||!(Number.isInteger(v)&&v>=1&&v<=5))o.bad.push(k+"/"+rd+"/"+a+"="+v)}
  o.oldArt=ORIGINS.filter(x=>x.art).map(x=>x.k).concat(Object.keys(ORIGIN_BR).filter(k=>ORIGIN_BR[k].art));
  o.startSrc=/o\.art/.test(String(start));
  /* 3 */
  const sig=R=>Object.keys(R).sort().map(a=>a+R[a]).join(",");const seen={};o.dup=[];o.nArts=[];
  for(const k of origins)for(const rd of keysOf(k)){const s=sig(T[k][rd]);if(seen[s])o.dup.push(seen[s]+"="+rd);seen[s]=rd;o.nArts.push(Object.keys(T[k][rd]).length)}
  /* 4 */
  const tot=R=>Object.values(R).reduce((a,x)=>a+x,0);o.tot={};o.eqRoad=[];o.core=[];
  for(const k of origins){const L=keysOf(k).map(rd=>tot(T[k][rd])),P=keysOf(k).map(rd=>Object.values(T[k][rd]).reduce((a,x)=>a+x*(x+3)/2,0));o.tot[k]=L[0];if(L.some(x=>x!==L[0])||P.some(x=>x!==P[0]))o.eqRoad.push(k);
   const own=T[k][""];for(const rd of keysOf(k))for(const a in own)if(!((T[k][rd][a]||0)>=own[a]))o.core.push(k+"/"+rd+"/"+a)}
  /* 5 */
  o.ng=[];const zero=R=>{const x={};for(const a of AK)x[a]=0;for(const v of VK)x[v]=0;return x};
  const herRow=()=>{const x={};for(const a of AK)x[a]=(S.arts||{})[a]||0;for(const v of VK)x[v]=(S.vir||{})[v]||0;return x};
  for(const k of origins)for(let i=0;i<3;i++){window.__forceOrigin=k;window.__nlInner=1;start();window.__nlInner=0;window.__forceOrigin=undefined;window.__bot=1;Q.length=0;
   const rd=S.st&&S.st.f14&&S.st.f14.road,want=Object.assign(zero(),T[k][rd]||{});o.ng.push({k,rd,ok:!!rd&&keysOf(k).includes(rd)&&JSON.stringify(herRow())===JSON.stringify(want)})}
  {window.F14_ON=false;window.__forceOrigin="thd";window.__nlInner=1;start();window.__nlInner=0;window.__forceOrigin=undefined;window.F14_ON=true;Q.length=0;
   o.noRoad=JSON.stringify(herRow())===JSON.stringify(Object.assign(zero(),T.thd[""]))}
  /* 6 */
  {window.__forceOrigin="tt";window.__nlInner=1;start();window.__nlInner=0;window.__forceOrigin=undefined;Q.length=0;
   for(const a of AK)S.arts[a]=0;S.arts.cam=1;S.arts.hoa=3;for(const v of VK)S.vir[v]=0;S.vir.hanh=2;const want=JSON.stringify(herRow());
   const d=JSON.parse(JSON.stringify(ser()));deser(d);o.oldSave=JSON.stringify(herRow())===want}
  /* 7 */
  {const v=(nr,ag)=>({name:"Np",id:71000,rank:2,arts:{},alive:true,nr,ag});
   o.npc={tranhDan:mgOrgLv(v({o:"tt",r:"tt_tranh"}),"dan"),tranhVe:mgOrgLv(v({o:"tt",r:"tt_tranh"}),"ve"),ttNoRoad:mgOrgLv(v({o:"tt"}),"dan"),agTt:mgOrgLv(v(undefined,{o:"tt"}),"dan"),
    hoaDung:mgOrgLv(v({o:"bd",r:"bd_hoa"}),"td_dung"),ngua:mgOrgLv(v({o:"bd",r:"bd_ngua"}),"huong"),srv:mgOrgLv({name:"m",sid:3,org:"x",arts:{}},"dan"),me:mgOrgLv(S,"dan")};
   const q=v({o:"tt",r:"tt_tranh"});o.lift=+(mgHandEff("dan",q)-mgHandEff("dan",v({o:"cnv",r:"cnv_ma"}))).toFixed(3)}
  return o});
 console.log(JSON.stringify({ids:r.ids,tot:r.tot}));
 ok(r.survey.every(x=>x.match&&x.own&&x.roads===4)&&!r.extra.length,`1 every origin has a row per real story road + its own row (${r.survey.length} origins incl. branches, ${r.ids} identities)`,r.survey.filter(x=>!x.match||!x.own||x.roads!==4).concat(r.extra));
 ok(!r.bad.length&&!r.oldArt.length&&!r.startSrc,'2 one core: real art / virtue keys, bậc 1..5 in BAL; no ORIGINS art:{} left; start() reads no o.art',{bad:r.bad,oldArt:r.oldArt,startSrc:r.startSrc});
 ok(!r.dup.length&&r.nArts.every(n=>n>=3&&n<=4),'3 variety: no two identities share a set; 3..4 arts each',{dup:r.dup,n:[Math.min(...r.nArts),Math.max(...r.nArts)]});
 const t=r.tot;ok(!r.eqRoad.length&&!r.core.length&&Math.min(t.tt,t.nc,t.bd)>Math.max(t.muoi,t.cn,t.thd)&&Math.min(t.muoi,t.cn,t.thd)>t.cnv,'4 law 2: equal total bậc + training points per road of an origin; noble > middle > poor; each road keeps the origin art',{eqRoad:r.eqRoad,core:r.core,tot:t});
 ok(r.ng.every(x=>x.ok)&&r.noRoad,'5 new game: her arts / tứ đức = the row of her rolled road (every origin, 3 lives); F14 off → the origin row',{bad:r.ng.filter(x=>!x.ok),noRoad:r.noRoad});
 ok(r.oldSave,'6 old saves keep their arts (save / load: same S.arts, S.vir)');
 const n=r.npc;ok(n.tranhDan===2&&n.tranhVe===2&&n.ttNoRoad===1&&n.agTt===1&&n.hoaDung===2&&n.ngua===2&&n.srv===0&&n.me===0&&r.lift>0,'7 NPC upbringing reads her identity row (road row; no road → origin row; td_ → virtue); servant / herself 0',Object.assign({lift:r.lift},n));
 ok(!errs.length,'8 no page errors',errs.slice(0,5));
 await b.close();process.exit(res.every(x=>x)?0:1)})().catch(e=>{console.error(e);process.exit(1)});
