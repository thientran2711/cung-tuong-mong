
/* ================= j95c: SỔ VỊ TRÍ — VÁ SAU KIỂM ĐỘC LẬP (wraps only; after j95, j95b) =================
   1) Giá họa trộm đồ (j92 act giahoa / wdFrame, the monthly jwd92b plant, NPC plans that call ACT.f directly) goes through the
      motive gate and into the record; the reason at planting time is kept (j95z().plant) for the "Bị tố ăn cắp" card weeks later
      (P95B.wdframe), whose line is written when the card is made. Same gate for poison sent in a dish (j83 wkPoison).
   2) Housing changes (jpal palFix at start / end of week / map / load; a head fallen, dead, raised) resync the record at once
      (j95fixHouse moves home lines, visits, servants, children); a fall / death / cold palace re-houses and resyncs at once.
   3) Turn-of-buổi acts that could not sit in the shown khắc of the buổi just ended land at the start of the new buổi (J95B.next).
   4) The stage is reconciled with the record whenever it is rebuilt (reload, coldVisit, homePeople, goTo).
   5) Loading a save never creates servants; servant names are unique (no two "Lão Quế Tử").
   ===================================================================================================================== */
const J95C={later:[],stat:{frameGate:0,framePass:0,poisonGate:0,repal:0,next:0,dedupe:0,loadNoFill:0},errs:[],raG:null,loading:0,lastV:null,sig:""};
/* off-map code: a man who comes in mid-buổi was outside the palace in the khắc already shown (never on the map, never on a stage) */
const J95OUT="ngoai";
(function(){const pn0=placeOf;placeOf=function(k){if(k===J95OUT)return{k,n:"Ngoài cung",d:"Chưa vào cung.",sc:"lc"};return pn0.apply(this,arguments)}})();
function j95cErr(w,e){try{if(J95C.errs.length<20)J95C.errs.push(w+": "+(e&&e.message||e))}catch(x){}}
function j95cCur(){return j95on()&&S&&!S.dead&&S.roster&&S.roster.key===j95key()}
/* ranks are in the signature too: a promotion / demotion (a card choice mid-week) re-houses at once, as loading the save would (jpal palFix in deser) */
function j95cSig(){try{return rivals.map(v=>v.alive?(v.out?"o":palaceOf(v)+":"+v.rank+(v.queen?"q":"")):"x").join(",")+"|"+(S.out?1:0)+":"+S.rank}catch(e){return""}}
/* servant names: unique among every servant and every cung nữ thân tín */
function j95cDedupe(){let n=0;try{const seen=new Set([S&&S.maid&&S.maid.name].concat((rivals||[]).map(v=>v&&v.maid&&v.maid.name)).filter(Boolean));
 for(const s of allServ()){if(!s||!s.name)continue;if(seen.has(s.name)){/* port 16/11: names carry no numbers (main jaudit aaNamesFix): take an unused name from the same pool */const used=new Set(allServ().map(x=>x&&x.name).concat([...seen]));const pool=(s.role==="eunuch"?EUN:MAIDS).filter(x=>!used.has(x));if(pool.length){s.name=pool[Math.floor(Math.random()*pool.length)];n++}}seen.add(s.name)}}catch(e){j95cErr("dedupe",e)}
 if(n)J95C.stat.dedupe+=n;return n}
(function(){
 /* ---- 1. giá họa: the gate, the record, the reason kept ---- */
 if(typeof wdFrame==="function"){const wf0=wdFrame;wdFrame=function(a,t){if(!j95on()||!a||a===S||a.rel==null||!t||a===t)return wf0.apply(this,arguments);
   let g;const G=J95C.raG;if(G&&G.a===a&&G.t===t){g=G.g;G.used=1}else{g=motiveOK(a,t,"giahoa");j95actLog(a,t,"giahoa",g)}
   if(!g.ok){J95C.stat.frameGate++;return ""}J95C.stat.framePass++;
   try{j95z().plant[key(a)+">"+key(t)]={w:wk(),why:g.why||""}}catch(e){}return wf0.apply(this,arguments)}}
 const ra0=runAct;runAct=function(a,t,k){if(k!=="giahoa"||!j95on()||!a||a===S||a.rel==null||!t)return ra0.apply(this,arguments);
  const prev=J95C.raG;J95C.raG={a,t,g:motiveOK(a,t,"giahoa")};try{return ra0.apply(this,arguments)}finally{J95C.raG=prev}};
 /* the card weeks later: its line in the record is written when the card is made (and again when shown) */
 const mk0=mkP;mkP=function(id,pp){const d=mk0.apply(this,arguments);try{if(d&&id==="wdframe"&&j95on()&&S&&S.roster&&pp){const a=byKey(pp.a);if(a&&a!==S&&a.rel!=null){const f=j95bPlanted(a,S);
   j95bAct("v"+a.id,"giahoa","me",{ok:true,ex:1,why:f?`đã sai người lén đặt đồ từ tuần ${f.w} (lúc ấy: ${f.why})`:"đã sai người lén đặt đồ từ trước"},"wdframe")}}}catch(e){j95cErr("mkP",e)}return d};
 /* poison in a dish (j83): same gate as Hạ độc */
 if(typeof wkPoison==="function"){const wp0=wkPoison;wkPoison=function(a,t){if(j95on()&&a&&a!==S&&a.rel!=null&&t&&a!==t){const g=motiveOK(a,t,"poison");j95actLog(a,t,"poison",g);if(!g.ok){J95C.stat.poisonGate++;return ""}}return wp0.apply(this,arguments)}}

 /* ---- 2. housing changes → the record follows at once ---- */
 if(typeof palFix==="function"){const pf0=palFix;palFix=function(){const s0=j95cSig();try{j95cCap()}catch(e){j95cErr("cap",e)}const r=pf0.apply(this,arguments);try{const s1=j95cSig();if(j95cCur()&&(s1!==s0||s1!==J95C.sig)){J95C.sig=s1;J95C.stat.repal++;j95sync()}}catch(e){j95cErr("palFix",e)}return r}}
 for(const n of ["deathSentence","fall","cold","restore","fireServ"]){if(typeof window[n]!=="function")continue;const o=window[n];window[n]=function(){const r=o.apply(this,arguments);
   try{if(j95cCur()){if(n!=="fireServ")try{palFix()}catch(e){}if(j95cCur())j95sync()}}catch(e){j95cErr(n,e)}return r}}

 /* any resync first re-houses if someone's home changed since the last look (the game only re-houses at the map / end of week) */
 const sy0=j95sync;j95sync=function(){try{if(!J95C.inSync&&j95cCur()){j95cDedupe();const sg=j95cSig();if(sg!==J95C.sig){J95C.sig=sg;J95C.inSync=1;try{palFix()}finally{J95C.inSync=0}J95C.sig=j95cSig()}
   /* she stood in a palace whose head has moved out (fallen, died, raised, re-housed): that palace is no more; she goes home */
   if(!S.out&&!(typeof isSrv==="function"&&isSrv())&&/^r\d+$/.test(S.place||"")&&!j95rnOK(S.place)){const h=RV(+S.place.slice(1));S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};J95C.stat.sentHome=(J95C.stat.sentHome||0)+1;try{log(`${h?h.name+" đã dời cung":"Chủ cung đã dời đi"}, ngươi trở về cung mình.`)}catch(e){}}}}catch(e){j95cErr("sync",e)}return sy0.apply(this,arguments)};
 /* ---- 3. turn-of-buổi acts that land at the start of the new buổi ---- */
 const pw0=placeWhere;placeWhere=function(){const r=pw0.apply(this,arguments);try{j95cNext()}catch(e){j95cErr("next",e)}return r};

 /* ---- 4. the stage is reconciled whenever it is rebuilt; a housing change seen at render re-houses ---- */
 const r0=render;render=function(){try{if(j95cCur()){const sg=j95cSig();if(sg!==J95C.sig){J95C.sig=sg;try{palFix()}catch(e){}if(j95cCur()){j95sync();J95C.sig=j95cSig()}}
    if(S.visit&&S.visit!==J95C.lastV&&S.visit.k===S.place){J95C.lastV=S.visit;j95stage(S.roster,j95kh())}}}catch(e){j95cErr("render",e)}return r0.apply(this,arguments)};

 /* she stands where her stage is: a failed re-entry at the new buổi leaves her home with the old stage; in lãnh cung she is in lãnh cung */
 for(const n of ["nextBuoi","endTurn"]){if(typeof window[n]!=="function")continue;const o=window[n];window[n]=function(){const r=o.apply(this,arguments);try{if(J95C.later.length){const L=J95C.later;J95C.later=[];for(const w of L)j95cStrip(w)}if(j95cCur()&&j95cVisitFix())j95sync()}catch(e){j95cErr(n,e)}return r}}
 /* ---- 5. loading creates nobody; names unique ---- */
 if(typeof staffInit==="function"){const si0=staffInit;staffInit=function(){if(!J95C.loading)return si0.apply(this,arguments);
   try{sidN=Math.max(sidN,...allServ().map(s=>s.sid),0);for(const p of consorts()){if(!p.staff){p.staff=[];fillStaff(p,true)}else J95C.stat.loadNoFill++}}catch(e){j95cErr("staffInit",e)}}}
 const d0=deser;deser=function(){J95C.loading=1;let r;try{r=d0.apply(this,arguments)}finally{J95C.loading=0}J95C.lastV=null;try{j95cVisitFix();if(j95cCur())j95sync()}catch(e){j95cErr("deserVisit",e)}try{J95C.sig=j95cSig();if(j95cCur()&&S.visit&&S.visit.k===S.place){J95C.lastV=S.visit;j95stage(S.roster,j95kh())}}catch(e){j95cErr("deser",e)}return r};
 if(typeof mkServ==="function"){const m0=mkServ;mkServ=function(){const s=m0.apply(this,arguments);try{const taken=new Set(allServ().map(x=>x.name).concat([S&&S.maid&&S.maid.name],(rivals||[]).map(v=>v&&v.maid&&v.maid.name)).filter(Boolean));
   if(s&&taken.has(s.name)){/* no numbers in names (main jaudit) */const pool=(s.role==="eunuch"?EUN:MAIDS).filter(x=>!taken.has(x));if(pool.length){s.name=pool[Math.floor(Math.random()*pool.length)];J95C.stat.dedupe++}}}catch(e){}return s}}
 if(typeof ageInit==="function"){const a0=ageInit;ageInit=function(){const r=a0.apply(this,arguments);if(!J95C.loading)j95cDedupe();return r}}
 if(typeof start==="function"){const st0=start;start=function(){J95C.lastV=null;J95C.sig="";const r=st0.apply(this,arguments);try{j95cDedupe();if(j95cCur())j95sync()}catch(e){j95cErr("start",e)}return r}}
})();
function j95cVisitFix(){if(!S||S.dead||(typeof isSrv==="function"&&isSrv()))return false;if(S.out&&S.place!=="lc"){coldVisit();return true}if(S.mg)return false;
 if(S.visit&&S.visit.k!==S.place&&S.place==="home"){S.visit={k:"home",people:homePeople(),talked:false,tk:{}};return true}return false}
/* jpal keeps a resident whose head is still valid even when the house is over its side-hall cap (a girl of the tuyển tú or a promotion
   placed there before palFix ran): the newest extras leave so palFix finds them another house (the cap the owner set: BAL.res, resCap) */
function j95cCap(){const live=p=>p===S?!!S&&!S.out&&!S.dead:!!p&&p.alive&&!p.out;let n=0;
 for(const h of [S].concat(rivals)){if(!live(h))continue;const k=key(h);const L=rivals.filter(y=>y!==h&&live(y)&&y.resHead===k&&!(rkOf(y)>=3&&y.pal!=null));const me=S!==h&&live(S)&&S.resHead===k&&!(rkOf(S)>=3&&S.pal!=null)?1:0;
  const over=L.length+me-resCap();if(over>0)for(const y of L.slice(-over)){y.resHead=null;n++}}
 if(n)J95C.stat.cap=(J95C.stat.cap||0)+n;return n}
/* a turn-of-buổi act placed at the start of the buổi, then overtaken before the news was read (she is confined / banished right
   after): the news line is withdrawn so nothing on screen says she is where the record no longer has her */
function j95cUnsay(id,key,kh){try{for(let i=J95B.bind.length-1;i>=0;i--){const b=J95B.bind[i];if(!b.next||b.id!==id||b.key!==key||b.kh!==kh)continue;J95B.bind.splice(i,1);j95cStrip(b.why)}}catch(e){j95cErr("unsay",e)}}
function j95cStrip(why,list){const w=String(why||"").slice(0,60);if(!w)return 0;let n=0;
 for(const m of list||Q){if(!m||typeof m.h!=="string")continue;const j=m.h.indexOf(w);if(j<0)continue;const re=/[.!?…](\s|<|$)/g;re.lastIndex=j+w.length-1;const mm=re.exec(m.h);const e=mm?mm.index+1:m.h.length;m.h=m.h.slice(0,j)+m.h.slice(e).replace(/^\s+/,"");n++;J95C.stat.unsay=(J95C.stat.unsay||0)+1}return n}
function j95cNext(){const P=J95B.next;if(!P||!P.length)return;J95B.next=[];if(!j95cCur())return;const R=S.roster;const used={};let n=0;
 for(const x of P){const e=R.P[x.id];if(!e){J95C.later.push(x.why);continue}if(x.id[0]==="v"){const v=RV(+x.id.slice(1));if(!v||!v.alive||v.out||v.confined){J95C.later.push(x.why);continue}}
  let kh=used[x.id]||0;/* the first khắc of the coming buổi (endTurn resets the khắc count only after planning) */while(kh<4&&(e[kh][1]==="tryst"||e[kh][1]==="meet"))kh++;if(kh>=4){J95C.later.push(x.why);continue}used[x.id]=kh+1;
  e[kh]=[x.k,x.act||"here",x.k==="home"?"me":null,x.why];J95B.bind.push({id:x.id,k:x.k,kh,key:R.key,wk:R.wk,b:R.b,past:1,next:1,src:x.src,why:x.why});if(J95B.bind.length>400)J95B.bind.splice(0,100);n++}
 if(n){J95C.stat.next+=n;j95sync()}}
/* a second turn-of-buổi act for her, decided after the new buổi was planned (the month report after the week report): the first act
   already holds this khắc and was told ("Tai mắt kể: X dâng canh sâm …"); the second would move her away from what was just told,
   so its line is not told (the khắc keeps one place each, and only the current khắc may change in the present buổi) */
(function(){if(typeof j95bPutPast!=="function")return;const o=j95bPutPast;j95bPutPast=function(id,k){try{const R=S&&S.roster;
  /* (any khắc of the bind: endTurn resets the khắc count only after this report is written) */
  if(j95cCur()&&R.P[id]){if(J95B.bind.some(b=>b.next&&b.id===id&&b.key===R.key&&b.k!==k&&R.P[id][b.kh]&&R.P[id][b.kh][0]===b.k)){J95C.stat.next2Drop=(J95C.stat.next2Drop||0)+1;return"seen"}}}catch(e){j95cErr("putPast2",e)}
  return o.apply(this,arguments)}})();
/* a news card about to be shown that would put her, at this very khắc, somewhere else than the turn-of-buổi act already told for it
   ("Tai mắt kể: X đứng đợi ngự giá ở ngự hoa viên" then "X đút lót Kính sự phòng"): that sentence is not told */
function j95cClash(m){if(!m||m.pid||m.__c95||typeof m.h!=="string"||!j95cCur())return 0;m.__c95=1;const R=S.roster,kh=j95kh();let n=0;
 try{for(const x of j95bScan(m.h)){const b=J95B.bind.find(b=>b.next&&b.id===x.id&&b.key===R.key&&b.kh===kh&&b.k!==x.k);if(!b||!R.P[x.id]||R.P[x.id][kh][0]!==b.k)continue;
   n+=j95cStrip(x.why,[m])}}catch(e){j95cErr("clash",e)}if(n)J95C.stat.clash=(J95C.stat.clash||0)+n;return n}
(function(){const bp=j95bPresent;j95bPresent=function(m){try{j95cClash(m)}catch(e){}return bp.apply(this,arguments)};
 const sm=showModal;showModal=function(){try{while(Q.length&&j95cClash(Q[0])&&!j95bStrip(Q[0].h).replace(/[\s.,;:!?…()]/g,"")&&!(Q[0].opts&&Q[0].opts.length))Q.shift()}catch(e){}return sm.apply(this,arguments)}})();
/* j96 (love story) asks the ledger where her man is (rosterWhere); without an answer it wrote S.menW by itself, a place the record did not
   have. The record answers, and a man it has nowhere this buổi comes to his first haunt IN the record (the rest of the buổi) */
function rosterWhere(m){try{if(!m||!j95cCur())return null;const R=S.roster,kh=j95kh();let e=R.P[m.id];if(e&&e[kh]&&e[kh][0])return e[kh][0];
  if(!m.alive)return null;const k=(m.haunts&&m.haunts[0])||"vuon";R.who[m.id]=[m.name,m.role];R.P[m.id]=[0,1,2,3].map(i=>i<kh?[J95OUT,"away",null,"chưa vào cung"]:[k,"go",null,"lặng lẽ đến"]);/* he comes in now: the khắc already shown keep him outside the palace (N1) */J95C.stat.man96=(J95C.stat.man96||0)+1;j95sync();return k}catch(e){j95cErr("rosterWhere",e);return null}}
window.__j95c=()=>({stat:J95C.stat,errs:J95C.errs,j95fix:J95.stat.fix||0});
