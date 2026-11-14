
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
const J95C={stat:{frameGate:0,framePass:0,poisonGate:0,repal:0,next:0,dedupe:0,loadNoFill:0},errs:[],raG:null,loading:0,lastV:null,sig:""};
function j95cErr(w,e){try{if(J95C.errs.length<20)J95C.errs.push(w+": "+(e&&e.message||e))}catch(x){}}
function j95cCur(){return j95on()&&S&&!S.dead&&S.roster&&S.roster.key===j95key()}
function j95cSig(){try{return rivals.map(v=>v.alive?(v.out?"o":palaceOf(v)):"x").join(",")+"|"+(S.out?1:0)}catch(e){return""}}
/* servant names: unique among every servant and every cung nữ thân tín */
function j95cDedupe(){let n=0;try{const seen=new Set([S&&S.maid&&S.maid.name].concat((rivals||[]).map(v=>v&&v.maid&&v.maid.name)).filter(Boolean));
 for(const s of allServ()){if(!s||!s.name)continue;if(seen.has(s.name)){const base=s.name.replace(/ \d+$/,"");let i=2;while(seen.has(base+" "+i))i++;s.name=base+" "+i;n++}seen.add(s.name)}}catch(e){j95cErr("dedupe",e)}
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
 for(const n of ["nextBuoi","endTurn"]){if(typeof window[n]!=="function")continue;const o=window[n];window[n]=function(){const r=o.apply(this,arguments);try{if(j95cCur()&&j95cVisitFix())j95sync()}catch(e){j95cErr(n,e)}return r}}
 /* ---- 5. loading creates nobody; names unique ---- */
 if(typeof staffInit==="function"){const si0=staffInit;staffInit=function(){if(!J95C.loading)return si0.apply(this,arguments);
   try{sidN=Math.max(sidN,...allServ().map(s=>s.sid),0);for(const p of consorts()){if(!p.staff){p.staff=[];fillStaff(p,true)}else J95C.stat.loadNoFill++}}catch(e){j95cErr("staffInit",e)}}}
 const d0=deser;deser=function(){J95C.loading=1;let r;try{r=d0.apply(this,arguments)}finally{J95C.loading=0}J95C.lastV=null;try{j95cVisitFix();if(j95cCur())j95sync()}catch(e){j95cErr("deserVisit",e)}try{J95C.sig=j95cSig();if(j95cCur()&&S.visit&&S.visit.k===S.place){J95C.lastV=S.visit;j95stage(S.roster,j95kh())}}catch(e){j95cErr("deser",e)}return r};
 if(typeof mkServ==="function"){const m0=mkServ;mkServ=function(){const s=m0.apply(this,arguments);try{const taken=new Set(allServ().map(x=>x.name).concat([S&&S.maid&&S.maid.name],(rivals||[]).map(v=>v&&v.maid&&v.maid.name)).filter(Boolean));
   if(s&&taken.has(s.name)){const base=s.name.replace(/ \d+$/,"");let i=2;while(taken.has(base+" "+i))i++;s.name=base+" "+i;J95C.stat.dedupe++}}catch(e){}return s}}
 if(typeof ageInit==="function"){const a0=ageInit;ageInit=function(){const r=a0.apply(this,arguments);if(!J95C.loading)j95cDedupe();return r}}
 if(typeof start==="function"){const st0=start;start=function(){J95C.lastV=null;J95C.sig="";const r=st0.apply(this,arguments);try{j95cDedupe();if(j95cCur())j95sync()}catch(e){j95cErr("start",e)}return r}}
})();
function j95cVisitFix(){if(!S||S.dead||(typeof isSrv==="function"&&isSrv()))return false;if(S.out&&S.place!=="lc"){coldVisit();return true}if(S.mg)return false;
 if(S.visit&&S.visit.k!==S.place&&S.place==="home"){S.visit={k:"home",people:homePeople(),talked:false,tk:{}};return true}return false}
/* jpal keeps a resident whose head is still valid even when the house is over its 3 side halls (a girl of the tuyển tú or a promotion
   placed there before palFix ran): the newest extras leave so palFix finds them another house (the cap the owner set, ≤3) */
function j95cCap(){const live=p=>p===S?!!S&&!S.out&&!S.dead:!!p&&p.alive&&!p.out;let n=0;
 for(const h of [S].concat(rivals)){if(!live(h))continue;const k=key(h);const L=rivals.filter(y=>y!==h&&live(y)&&y.resHead===k&&!(rkOf(y)>=3&&y.pal!=null));const me=S!==h&&live(S)&&S.resHead===k&&!(rkOf(S)>=3&&S.pal!=null)?1:0;
  const over=L.length+me-3;if(over>0)for(const y of L.slice(-over)){y.resHead=null;n++}}
 if(n)J95C.stat.cap=(J95C.stat.cap||0)+n;return n}
function j95cNext(){const P=J95B.next;if(!P||!P.length)return;J95B.next=[];if(!j95cCur())return;const R=S.roster;const used={};let n=0;
 for(const x of P){const e=R.P[x.id];if(!e)continue;if(x.id[0]==="v"){const v=RV(+x.id.slice(1));if(!v||!v.alive||v.out||v.confined)continue}
  let kh=Math.max(j95kh(),used[x.id]||0);while(kh<4&&(e[kh][1]==="tryst"||e[kh][1]==="meet"))kh++;if(kh>=4)continue;used[x.id]=kh+1;
  e[kh]=[x.k,x.act||"here",x.k==="home"?"me":null,x.why];J95B.bind.push({id:x.id,k:x.k,kh,key:R.key,wk:R.wk,b:R.b,past:1,next:1,src:x.src,why:x.why});if(J95B.bind.length>400)J95B.bind.splice(0,100);n++}
 if(n){J95C.stat.next+=n;j95sync()}}
window.__j95c=()=>({stat:J95C.stat,errs:J95C.errs,j95fix:J95.stat.fix||0});
