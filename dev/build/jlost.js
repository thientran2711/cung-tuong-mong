/* ================= jlost: ĐỒ THẤT LẠC VÀ MINH OAN (owner 15/11 00:25Z: theft/framing as pure game rules; review/lost-items) =================
   Abstract rules only: an item "thất lạc" (goes missing) from a chest and may later "được tìm thấy" somewhere. Nothing describes how.
   The same rules for her and for every consort (two-way).
   · Thất lạc: rarely (LO.rate per month, cooldown LO.cd months) a valuable item (price ≥ LO.minPr, not worn, not ngự tứ) leaves its owner's chest.
     Hidden cause: "mis" just misplaced · "srv" a servant's slip · "riv" a rival's doing — only a rival whose motive band (j24 BANDS ≥ nặng)
     and motive gate (j95 motiveOK(v,t,"plant") when present) allow it.
   · Tìm thấy: after LO.findW weeks it turns up back home, or in another palace (riv: hidden in the chest of someone the rival dislikes,
     then the rival lets it be known; mis/srv: openly, the holder sees an item of unknown owner), or never.
   · The owner may ask for it quietly or raise it at Cung Chính ti: the hearing is j92's GIÁ HỌA verdict (wdFrameResolve / PEND.wdframe)
     with the owner field (entry.lo): the culprit is the rival or nobody, case evidence counts for the wrongly suspected holder.
   · Tra xét acts (Tư trang › Đồ thất lạc and person cards): Hỏi cung nhân · Báo Cung Chính ti · Soát rương (j8 inspect) · Đối chiếu sổ
     Nội vụ phủ — each may add one piece of evidence (rival: the j8 evidence counter evA; otherwise the case counter cev).
   · Nhận ra: a missing item worn in public may be recognised by people who know it (owner, her friends, her if she heard of it).
   Case: S.lost[] {id,k,e,own,cause,by,sv,w,due,st:"lost"|"held"|"found"|"done",at,open,cev,kn{},hear,acc,tip,ret,heard,end,how}
   Knobs: LO below. ================= */
const LO={rate:8,cd:6,minPr:30,findW:[2,7],
 home:{mis:55,srv:15,riv:0},away:{mis:20,srv:65,riv:75},   /* % back home / turns up in another palace; the rest: never found */
 rivP:40,srvP:[20,45],                                       /* cause: a rival (when one's motive allows), a servant (careless servant) */
 tipW:[1,3],hearW:[1,2],recog:{own:15,fr:4,me:8},keepWear:25,expire:54,
 cost:{ask:{k:1},cct:{k:1,bac:20},book:{k:1,bac:10},soat:{k:2}}};
function loL(){S.lost=S.lost||[];return S.lost}
function loGet(id){return loL().find(c=>c.id===id)||null}
function lostEv(id){const c=loGet(id);return c?(c.cev||0):0}
function lostEvUse(id){const c=loGet(id);if(c&&c.cev>0){c.cev--;return true}return false}
function loNm(k){return typeof wdFrameNm==="function"?wdFrameNm(k):((IT[k]||{}).n||"món đồ")}
function loP(k){return byKey(k)}
function loAlive(p){return !!p&&(p===S?!S.dead:p.alive&&!p.out)}
function loPal(p){if(!p)return"";if(p===S)return"cung ngươi";let k=true;try{if(typeof kitKnownName==="function")k=kitKnownName(p)}catch(e){}try{const n=palName(palaceOf(p));if(n)return k?`${n}, chỗ ${p.name}`:n}catch(e){}return k?`cung ${p.name}`:"một cung khác"}
function loPrice(e){const w=typeof wdItem==="function"?wdItem(e):null;return w?(w.pr||0):((IT[e.k]&&IT[e.k].pr)||0)}
function loGrade(e){const w=typeof wdItem==="function"?wdItem(e):null;if(w)return w.g|0;const pr=loPrice(e);return (IT[e.k]&&IT[e.k].nt)?4:pr>=200?3:pr>=100?2:pr>=40?1:0}
function loPic(e,sz){const w=typeof wdItem==="function"?wdItem(e):null;return typeof kitItem==="function"?kitItem({src:kitItemSrc(e.k,w?w.icon:""),name:loNm(e.k),grade:loGrade(e),size:sz||"md"}):""}
function loOk(e){return !!e&&!e.h&&!e.t&&!e.lo&&!e.w&&!e.keep&&!(typeof wdIsNt==="function"&&wdIsNt(e))&&!(typeof vlIs==="function"&&vlIs(e))&&!(IT[e.k]&&(IT[e.k].evi||IT[e.k].nt))&&loPrice(e)>=LO.minPr}
function loMotive(v,t){try{if(typeof motiveOK==="function")return !!motiveOK(v,t,"plant").ok}catch(e){}return true}
/* hidden cause, chosen by the existing motive system */
function loCause(p){let R0=[];try{R0=liveRivals(true).filter(v=>v!==p&&bandOf(danger(v,p))>=2&&loMotive(v,p))}catch(e){}
 if(R0.length&&roll(LO.rivP)){const v=R0.sort((a,b)=>danger(b,p)-danger(a,p))[0];return{cause:"riv",by:key(v)}}
 const st=[p.maid].concat(p.staff||[]).filter(Boolean);const sv=st.find(s=>s.tr==="nhat");
 if(roll(sv?LO.srvP[1]:LO.srvP[0])){const s=sv||pick(st);return{cause:"srv",sv:s?s.name:""}}return{cause:"mis"}}
/* the same function for everyone: an item leaves its owner's chest */
function loLose(p){if(!loAlive(p))return null;const L=(p.inv||[]).filter(loOk);if(!L.length)return null;
 L.sort((a,b)=>loPrice(b)-loPrice(a));const e=pick(L.slice(0,3));p.inv.splice(p.inv.indexOf(e),1);
 S.loSeq=(S.loSeq||0)+1;const c=Object.assign({id:S.loSeq,k:e.k,e,own:key(p),w:wk(),due:wk()+LO.findW[0]+R(LO.findW[1]-LO.findW[0]+1),st:"lost",at:null,open:0,cev:0,kn:{},hear:0,acc:null,d:(typeof wdWhen==="function"?String(wdWhen()).replace(/^./,x=>x.toLowerCase()):"")},loCause(p));
 loL().push(c);p.loCd=S.turn+LO.cd;const nm=loNm(e.k);
 if(p===S){Q.push({t:"Đồ thất lạc",who:pMe(),h:`<p style="text-align:center">${loPic(e,"lg")}</p><p><b>${nm}</b> trong rương ngươi đã thất lạc.</p><p class="past">Chưa rõ vì sao. Vào mục Tư trang › Đồ thất lạc để tra xét.</p>`,btn:"Đã hiểu"});log(`${nm} trong rương thất lạc.`)}
 else{const txt=`${wdNmC(p)} báo mất ${nm}.`;try{newsAdd(p,"lo",txt);if(S.news&&S.news[0]&&S.news[0].t===txt){c.heard=1;log(txt)}}catch(x){}}
 return c}
function loClean(e){const x=Object.assign({},e);for(const f of ["lo","gh","by","h","w"])delete x[f];return x}
/* the item goes back to its owner (j92 verdict, a quiet return, a search) */
function lostReturn(e,how){const c=e&&e.lo?loGet(e.lo):null;if(!c||c.st==="done")return;const o=loP(c.own);if(o&&loAlive(o)){o.inv=o.inv||[];o.inv.push(loClean(c.e||e))}
 c.st="done";c.end=wk();c.how=how||"tra";if(o===S)log(`${loNm(c.k)} đã về lại rương ngươi.`)}
/* take a worn missing item off before a search (wardrobe slot or j8 worn flag) */
function lostUnwear(t,a){if(!t)return;try{const w=typeof wdOf==="function"?wdOf(t):null;if(w)for(const sl of ["tram","y"]){const e=w[sl];if(e&&e.lo&&(!a||e.gh===key(a))){const k=sl==="y"?wdDefault(t,"y"):null;w[sl]=k?{k,from:"base"}:null;try{wdOf(t)}catch(x){}t.inv=t.inv||[];t.inv.push(e)}}}catch(x){}
 for(const e of t.inv||[])if(e&&e.lo&&(!a||e.gh===key(a)))e.w=0}
function loEntry(c){const h=loP(c.at);if(!h)return null;const w=typeof wdOf==="function"?wdOf(h):null;if(w)for(const sl of ["tram","y"])if(w[sl]&&w[sl].lo===c.id)return{h,e:w[sl],worn:1};
 const e=(h.inv||[]).find(x=>x&&x.lo===c.id);return e?{h,e,worn:!!e.w}:null}
function loHolder(c){const o=loP(c.own),cu=c.by?loP(c.by):null;const L=consorts().filter(x=>x!==o&&x!==cu&&loAlive(x));if(!L.length)return null;
 if(cu)return L.sort((a,b)=>danger(cu,b)+R(20)-danger(cu,a)-R(20))[0];return pick(L)}
function loHonest(h){const tr=typeof traitsOf==="function"?traitsOf(h).join(" "):(h.trait||"");return (h.malice||0)<50&&!/Tham vọng|Kiêu ngạo/.test(tr)}
/* where it turns up */
function loFind(c){const r=R(100);const o=loP(c.own);if(!o||!loAlive(o)){c.st="done";c.how="mat";return}
 if(r<LO.home[c.cause]){o.inv=o.inv||[];o.inv.push(loClean(c.e));c.st="done";c.end=wk();c.how="nha";
  if(o===S){Q.push({t:"Tìm thấy đồ thất lạc",who:pMe(),h:`<p style="text-align:center">${loPic(c.e,"lg")}</p><p>Cung nhân tìm thấy <b>${loNm(c.k)}</b> ngay trong cung ngươi${c.cause==="srv"&&c.sv?`: ${c.sv} cất nhầm chỗ`:""}.</p>`,btn:"Đã hiểu"});log(`${loNm(c.k)} thất lạc nay tìm thấy trong cung.`)}return}
 if(r>=LO.home[c.cause]+LO.away[c.cause]){c.nf=1;return}
 const h=loHolder(c);if(!h){c.nf=1;return}const e=Object.assign({},c.e,{lo:c.id,gh:c.own});delete e.from;delete e.giver;if(c.cause==="riv"){e.h=1;e.by=c.by;c.tip=wk()+LO.tipW[0]+R(LO.tipW[1]-LO.tipW[0]+1)}else c.open=1;
 h.inv=h.inv||[];h.inv.push(e);c.st="held";c.at=key(h);
 if(h===S&&c.open){Q.push({t:"Đồ lạ trong rương",who:pMe(),h:`<p style="text-align:center">${loPic(e,"lg")}</p><p>Cung nhân thấy trong rương ngươi có <b>${loNm(c.k)}</b>, không rõ của ai.</p><p class="past">Vào mục Tư trang › Đồ thất lạc: đối chiếu sổ Nội vụ phủ để biết chủ, rồi trả về hay nộp lên.</p>`,btn:"Đã hiểu"});log(`Trong rương có ${loNm(c.k)} không rõ của ai.`)}
 else if(h!==S&&c.open&&loHonest(h))c.ret=wk()+1+R(3)}
/* the owner learns where it is (a tip, an investigation, a recognised item) */
function loKnowAt(c,p,how){if(!p||c.st==="done"||!c.at)return;c.kn[key(p)]=1;if(key(p)===c.own&&c.st==="held")c.st="found";
 if(p===S&&how){const h=loP(c.at);if(c.own==="me")Q.push({t:"Đồ thất lạc",who:h&&h!==S?pv(h):pMe(),h:`<p style="text-align:center">${loPic(c.e,"md")}</p><p>${how}: <b>${loNm(c.k)}</b> của ngươi đang ở ${loPal(h)}.</p><p class="past">Đòi lại êm thấm, hay báo Cung Chính ti thu hồi (Tư trang › Đồ thất lạc, hoặc thẻ người của nàng).</p>`,btn:"Đã hiểu"});
  log(`${how}: ${loNm(c.k)} ${c.own==="me"?"của ngươi":"của "+wdNm(loP(c.own))} ở ${loPal(h)}.`)}}
/* the owner decides: ask for it quietly, or raise it at Cung Chính ti (NPC owners; her own choice is an act card) */
function loOwnerMove(c){const o=loP(c.own),h=loP(c.at);if(!o||o===S||!h||c.hear||c.asked)return;c.asked=1;
 if(aff(o,h)>=20||roll(40)){if(h===S){pushDil(mkP("loask",{id:c.id}),"Đồ thất lạc");return}if(roll(loAskOdds(h,o))){const x=loEntry(c);if(x){lostUnwear(h,o);const i=h.inv.indexOf(x.e);if(i>=0)h.inv.splice(i,1);lostReturn(x.e,"tra")}return}}
 loRaise(c,o)}
function loRaise(c,o){c.hear=wk()+LO.hearW[0]+R(LO.hearW[1]-LO.hearW[0]+1);c.acc=key(o);const h=loP(c.at);
 if(h===S){Q.push({t:"Đồ thất lạc",who:pv(o),h:`<p>${wdNmC(o)} báo Cung Chính ti: ${loNm(c.k)} của nàng thất lạc, nay thấy ở cung ngươi. Cung Chính ti sẽ xét trong ${c.hear-wk()} tuần.</p><p class="past">Tra xét trước để minh oan: Tư trang › Đồ thất lạc.</p>`,btn:"Đã hiểu"});log(`${wdNmC(o)} báo Cung Chính ti: ${loNm(c.k)} thấy ở cung ngươi.`)}}
function loAskOdds(h,o){return cl(Math.round(40+aff(h,o)/2+(loHonest(h)?20:-10)),5,95)}
/* ---------- the four tra xét acts: one function each for everyone, same odds ---------- */
function loWatch(p){return [p.maid].concat(p.staff||[]).some(s=>s&&(s.loyal||0)>=60)}
function loOdds(kind,p){if(kind==="ask")return cl(Math.round(35+(p.mat||0)*6+(p.tamco||0)/5+(loWatch(p)?10:0)),5,95);
 if(kind==="cct")return cl(Math.round(50+(p.danh||0)/8+rkOf(p)*3),5,95);if(kind==="book")return cl(Math.round(55+(p.tai||0)/5+(p.mat||0)*3),5,95);return oSee(p,true)}
function loEvAdd(c,p,why){if(c.cause==="riv"&&c.by&&loP(c.by)&&p!==loP(c.by)){evA(p,loP(c.by),1);return `${why}, dấu vết dẫn về ${wdNm(loP(c.by))} (chứng cứ +1)`}c.cev=(c.cev||0)+1;return `${why} (chứng cứ tra xét +1)`}
function loDo(kind,p,c){const C=LO.cost[kind]||{};if(C.bac)ap(p,{bac:-C.bac});const o=loOdds(kind,p);const nm=loNm(c.k);
 if(kind==="soat"){const f=inspect(p);return f.length?`Soát rương, tìm thấy: ${f.join("; ")}.`:"Soát rương: không thấy gì lạ."}
 if(!roll(o))return kind==="ask"?"Hỏi cung nhân: không ai biết gì.":kind==="cct"?"Cung Chính ti ghi lại, chưa tra ra gì.":"Đối chiếu sổ Nội vụ phủ: sổ sách lộn xộn, không rõ.";
 let r="";const held=(c.st==="held"||c.st==="found")&&c.at;
 if(kind==="ask"){r=loEvAdd(c,p,c.cause==="srv"&&c.sv?`Hỏi cung nhân: ${c.sv} nhận lỡ tay cất nhầm ${nm}`:c.cause==="riv"?"Hỏi cung nhân: có kẻ lạ ra vào lúc vắng người":"Hỏi cung nhân: không ai thấy kẻ lạ, có lẽ chỉ thất lạc");
  if(held&&!c.kn[key(p)]&&roll(60)){loKnowAt(c,p,"");r+=`; có người thấy món ấy ở ${loPal(loP(c.at))}`}}
 else if(kind==="cct"){r=loEvAdd(c,p,"Cung Chính ti tra sổ ra vào");if(held&&!c.kn[key(p)]){loKnowAt(c,p,"");r+=`; tìm thấy ${nm} ở ${loPal(loP(c.at))}`}}
 else{r=loEvAdd(c,p,`Đối chiếu sổ Nội vụ phủ: ${nm} ghi tên ${wdNm(loP(c.own))}`);c.kn["o"+key(p)]=1}
 return r+"."}
/* NPCs: the owner investigates while it is missing, the suspect before her hearing (the same acts, no khắc) */
function loNpcTry(p,c){if(!p||p===S||!loAlive(p))return;const kind=(p.bac||0)>=40&&roll(40)?"cct":(p.bac||0)>=20&&roll(40)?"book":"ask";loDo(kind,p,c)}
/* ---------- Nhận ra: a missing item worn in public ---------- */
function loRecog(c){const x=loEntry(c);if(!x||!x.worn)return;const o=loP(c.own),h=x.h;if(!o||h===o)return;
 if(o!==S&&roll(LO.recog.own)){loKnowAt(c,o,"");return}
 if(o===S&&roll(LO.recog.own)){loKnowAt(c,S,`Ngươi nhận ra ${wdNm(h)} đang đeo đồ của mình`);return}
 if(o!==S&&c.heard&&!c.kn.me&&roll(LO.recog.me)){c.kn.me=1;log(`Ngươi nhận ra ${wdNm(h)} đang đeo ${loNm(c.k)}, món ${wdNm(o)} báo mất.`);return}
 for(const f of liveRivals(true))if(f!==o&&f!==h&&aff(f,o)>=40&&roll(LO.recog.fr)){loKnowAt(c,o,o===S?`${f.name} nhận ra món đồ, sang báo`:"");return}}
/* NPC holder who sees an item of unknown owner: an honest one hands it in, another keeps it and may wear it */
function loHolderMove(c){const x=loEntry(c);if(!x||x.h===S)return;const h=x.h;
 if(c.ret&&wk()>=c.ret){lostUnwear(h);const i=h.inv.indexOf(x.e);if(i>=0)h.inv.splice(i,1);lostReturn(x.e,"nop");const o=loP(c.own);if(o)relAdd(h,o,3);if(o===S){Q.push({t:"Đồ thất lạc",who:pv(h),h:`<p>${wdNmC(h)} thấy ${loNm(c.k)} lẫn trong rương, sai người nộp Nội vụ phủ trả về ngươi.</p>`,btn:"Đã hiểu"})}return}
 if(!c.ret&&!x.worn&&!c.wo&&roll(LO.keepWear)){c.wo=1;const i=h.inv.indexOf(x.e);if(i<0)return;try{if(typeof wdItem==="function"&&wdItem(x.e))wdWear(h,i);else if(IT[x.e.k]&&IT[x.e.k].sl)wear(h,i)}catch(e){}}}
/* ---------- weekly / monthly ---------- */
function loWeek(){if(!S||S.dead)return;for(const c of loL()){if(c.st==="done")continue;try{
  const o=loP(c.own);if(!o||!loAlive(o)){c.st="done";c.how="mat";continue}
  if(c.st==="lost"){if(!c.nf&&wk()>=c.due)loFind(c);else if(o!==S&&roll(20))loNpcTry(o,c)}
  if(c.st==="held"||c.st==="found"){const x=loEntry(c);if(!x){c.st="done";c.how="matdau";continue}
   if(c.st==="held"&&c.tip&&wk()>=c.tip){c.tip=0;const cu=loP(c.by);loKnowAt(c,o,o===S?"Có người báo tin":"");if(o===S&&cu)c.tipBy=c.by}
   loHolderMove(c);if(c.st==="done")continue;
   if(c.st==="found"&&o!==S)loOwnerMove(c);
   if(c.hear){const h=loP(c.at);if(h&&h!==S&&roll(50))loNpcTry(h,c);
    if(wk()>=c.hear){c.hear=0;const a=loP(c.acc);if(a&&h){const r=wdFrameResolve(a,h);if(r&&(a===S||h===S||c.heard))log(r);if(r&&a===S)Q.push({t:"Cung Chính ti xét xử",who:pv(h),h:`<p>${r}</p>`,btn:"Đã hiểu"});if(c.st!=="done"&&!loEntry(c)){c.st="done";c.how="xet"}}}}}
  if(c.st!=="done"&&wk()-c.w>LO.expire){c.st="done";c.how="mat";const x=c.at?loEntry(c):null;if(x&&!x.worn&&x.e.h){const i=x.h.inv.indexOf(x.e);if(i>=0)x.h.inv.splice(i,1)}}}catch(e){console.error(e)}}
 S.lost=loL().filter(c=>c.st!=="done"||wk()-(c.end||c.w)<=12).slice(-40)}
function loMonth(){if(!S||S.dead)return;for(const p of consorts()){if(!loAlive(p)||(p.loCd||0)>S.turn)continue;if(loL().some(c=>c.own===key(p)&&c.st!=="done"))continue;if(roll(LO.rate))loLose(p)}
 for(const c of loL())if(c.st==="held"||c.st==="found")loRecog(c)}
(function(){const e0=endTurn;endTurn=function(){const m=S&&S.turn,w0=S&&wk();const r=e0.apply(this,arguments);try{if(S&&!S.dead&&wk()!==w0){const q=Q.length;if(S.turn!==m)loMonth();loWeek();if(Q.length>q){showModal();render()}}}catch(e){console.error(e)}return r}})();
/* Soát rương (j8 inspect) finds a missing item hidden in the chest: it goes back to its owner; the trail may lead to whoever hid it (same odds) */
(function(){const i0=inspect;inspect=function(p){const L=(p.inv||[]).filter(e=>e&&e.lo&&e.h);L.forEach(e=>p.inv.splice(p.inv.indexOf(e),1));let f;try{f=i0.apply(this,arguments)}finally{L.forEach(e=>p.inv.push(e))}
 const sees=oSee(p,true);for(const e of L){if(!roll(sees))continue;const c=loGet(e.lo);const i=p.inv.indexOf(e);if(i>=0)p.inv.splice(i,1);lostReturn(e,"soat");const o=c?loP(c.own):null;
  let s=`${loNm(e.k)} của ${o?wdNm(o):"người khác"} lẫn trong rương (đồ thất lạc), đã sai người trả về`;const by=e.by?byKey(e.by):null;if(by&&by!==p&&roll(40+(p.mat||0)*6)){evA(p,by,2);s+=`: dấu vết dẫn về ${NM(by)} (chứng cứ +2)`}f.push(s)}
 return f}})();
/* the owner asks her quietly (event: costs only) */
PEND.loask=pp=>{const c=loGet(pp.id);if(!c||c.st==="done")return null;const o=loP(c.own);if(!o)return null;const nm=loNm(c.k);
 return{who:pv(o),t:`<p>${wdNmC(o)} sai người sang hỏi: <b>${nm}</b> của nàng thất lạc, nghe nói đang ở cung ngươi.</p>`,o:[
  {n:"Trả lại",fx:{},j67:"tốn: không tốn gì",go:()=>{const x=loEntry(c);if(x){lostUnwear(S,o);const i=S.inv.indexOf(x.e);if(i>=0)S.inv.splice(i,1);lostReturn(x.e,"tra")}relAdd(S,o,4);log(`Ngươi trả ${nm} cho ${wdNm(o)}.`)}},
  {n:"Nói không thấy",fx:{},j67:"tốn: không tốn gì",go:()=>{relAdd(S,o,-4);loRaise(c,o)}}]}};

/* ---------- her side: act cards (full price + odds), Tư trang section, person cards ---------- */
function loCostTxt(kind){const C=LO.cost[kind];return `tốn: ${C.k} khắc${C.bac?`, Bạc -${C.bac}`:""}`}
function loWhy(kind){const C=LO.cost[kind];return Q.length?"đang có việc chờ":whyTime(C.k)||(C.bac&&S.bac<C.bac?`cần Bạc ${C.bac}`:"")}
function loBtn(c,a,n,sm,why){return pbtn(`data-lo="${a}" data-lc="${c.id}"`,n,sm,why||"")}
/* the acts that fit her place in a case (owner, holder, suspect, a witness) */
function loActs(c){const B=[];const me=c.own==="me",h=c.at?loP(c.at):null,atMe=c.at==="me",known=me&&c.st==="found"&&h&&!atMe;
 const tra=()=>{B.push(loBtn(c,"ask","Hỏi cung nhân",`${word(loOdds("ask",S))} · ${loCostTxt("ask")} · thành: thêm 1 chứng cứ, có khi biết món đồ ở đâu · hỏng: không ai biết gì`,loWhy("ask")));
  B.push(loBtn(c,"cct","Báo Cung Chính ti",`${word(loOdds("cct",S))} · ${loCostTxt("cct")} · thành: thêm 1 chứng cứ; món đồ đang ở cung nào thì tìm ra · hỏng: chưa tra ra gì`,loWhy("cct")));
  B.push(loBtn(c,"book","Đối chiếu sổ Nội vụ phủ",`${word(loOdds("book",S))} · ${loCostTxt("book")} · thành: thêm 1 chứng cứ, biết món đồ ghi tên ai · hỏng: sổ sách không rõ`,loWhy("book")))};
 if(me&&!known&&c.st!=="done"){tra();return B}
 if(known){const x=loEntry(c);const o=x?cl(WD.clearBase+(h.mat||0)*WD.clearMat+wdFrameEv(h,S,x.e)*10,5,95):50;
  B.push(loBtn(c,"askback","Đòi lại êm thấm",`${word(loAskOdds(h,S))} · tốn: 1 khắc · thành: nàng trả lại món đồ · hỏng: nàng chối, thân -4`,c.hear?"đã báo Cung Chính ti":whyTime(1)));
  B.push(loBtn(c,"raise","Báo Cung Chính ti thu hồi",`tốn: 1 khắc · thành: Cung Chính ti xét trong 1–2 tuần; món đồ về lại rương · kèm: nàng minh oan được (${word(o)}) thì kẻ giấu đồ, nếu có, bị phạt; không minh oan được thì nàng bị phạt, Danh -10`,c.hear?"đã báo, đang chờ xét":whyTime(1)));
  tra();return B}
 if(atMe&&(c.open||c.hear)){const ownK=c.kn["ome"]||c.hear;
  if(c.hear)tra();
  else{B.push(loBtn(c,"book","Đối chiếu sổ Nội vụ phủ",`${word(loOdds("book",S))} · ${loCostTxt("book")} · thành: biết món đồ của ai, thêm 1 chứng cứ · hỏng: sổ sách không rõ`,loWhy("book")));
   B.push(loBtn(c,"giveback","Trả về chủ",`tốn: 1 khắc · thành: món đồ về tay chủ, thân +4`,ownK?whyTime(1):"chưa biết của ai: đối chiếu sổ trước"));
   B.push(loBtn(c,"handin","Nộp Nội vụ phủ",`tốn: 1 khắc · thành: Nội vụ phủ trả về chủ, Danh +1`,whyTime(1)))}
  return B}
 if(!me&&c.kn.me&&!atMe&&!c.told&&c.at){B.push(loBtn(c,"tell",`Báo cho ${loP(c.own)?loP(c.own).name:"chủ món đồ"}`,`tốn: 1 khắc · thành: nàng biết đồ của mình ở đâu, thân với nàng +6 · kèm: ${h?h.name:"người giữ đồ"} thù -6`,whyTime(1)))}
 return B}
function loMine(){return loL().filter(c=>c.st!=="done"&&(c.own==="me"||(c.at==="me"&&(c.open||c.hear))||(c.kn.me&&c.own!=="me"&&c.at!=="me"&&!c.told)))}
function loState(c){const h=c.at?loP(c.at):null,o=loP(c.own);
 if(c.own==="me")return c.st==="found"&&h?[`Thấy ở ${loPal(h)}${c.hear?` · Cung Chính ti xét trong ${Math.max(0,c.hear-wk())} tuần`:""}`,"no"]:["Chưa rõ ở đâu","no"];
 if(c.at==="me")return c.hear?[`${o?o.name:""} đã báo Cung Chính ti · xét trong ${Math.max(0,c.hear-wk())} tuần`,"no"]:[c.kn["ome"]?`Của ${wdNm(o)}`:"Không rõ của ai","n"];
 return [`Của ${wdNm(o)} · ngươi thấy ở ${loPal(h)}`,"n"]}
function loInvHTML(){if(!S||S.dead)return"";const L=loMine();const D=loL().filter(c=>c.st==="done"&&c.own==="me"&&wk()-(c.end||0)<=3);if(!L.length&&!D.length)return"";
 const HOW={nha:"tìm thấy trong cung",tra:"đã về lại rương",soat:"đã về lại rương",nop:"được nộp trả",xet:"Cung Chính ti đã xét",mat:"mất hẳn",matdau:"mất dấu"};
 let h=`<div class="kwd"><div class="kpsec"><h4 class="kpst">Đồ thất lạc</h4>`;
 for(const c of L){const st=loState(c);const facts=[`${loNm(c.k)}${c.d?` · thất lạc ${c.d}`:""}`,`Chứng cứ tra xét: ${c.cev||0}`];
  if(c.own==="me"&&c.cause==="riv"&&c.by&&loP(c.by)&&evG(S,loP(c.by)))facts.push(`Chứng cứ về ${loP(c.by).name}: ${evG(S,loP(c.by))}`);
  h+=`<div class="kwdsel">${loPic(c.e,"md")}<div>${kitChip(st[0],st[1])}${kitFacts(facts)}</div></div><div class="rbtn">${loActs(c).join("")}</div>`}
 if(L.some(c=>c.at==="me"||c.own==="me"))h+=`<div class="rbtn">${pbtn(`data-inv="inspect"`,"Soát rương",`${word(oSee(S,true))} · tốn: 2 khắc · thành: tìm ra đồ lạ cài trong rương; đồ thất lạc của người khác thì trả về · hỏng: không thấy gì`,Q.length?"đang có việc chờ":whyTime(2))}</div>`;
 for(const c of D)h+=`<p class="past">${loNm(c.k)}: ${HOW[c.how]||"đã xong"}.</p>`;
 return h+`</div></div>`}
(function(){if(typeof invHTML!=="function")return;const i0=invHTML;invHTML=function(){const h=i0.apply(this,arguments);let x="";try{x=loInvHTML()}catch(e){console.error(e)}return x?x+h:h}})();
/* person card: the same act cards for the cases that involve her */
(function(){if(typeof rvGroups!=="function")return;const g0=rvGroups;rvGroups=function(v){const G=g0.apply(this,arguments);try{if(v&&v.alive&&!v.out){const k=key(v);
  const B=loMine().filter(c=>c.at===k||c.own===k).flatMap(c=>loActs(c));
  if(B.length)G.unshift(["Đồ thất lạc",B])}}catch(e){console.error(e)}return G}})();
function loUI(a,id){const c=loGet(id);if(!c||c.st==="done"||!S||S.dead||Q.length)return;const nm=loNm(c.k);let r="";
 if(["ask","cct","book"].includes(a)){const C=LO.cost[a];if(!can(C.k)||(C.bac&&S.bac<C.bac))return;spend(C.k);r=loDo(a,S,c)}
 else if(a==="askback"){const h=loP(c.at);if(!can(1)||!h)return;spend(1);if(roll(loAskOdds(h,S))){const x=loEntry(c);if(x){lostUnwear(h,S);const i=h.inv.indexOf(x.e);if(i>=0)h.inv.splice(i,1);lostReturn(x.e,"tra")}r=`${wdNmC(h)} trả lại ${nm}.`}else{relAdd(S,h,-4);r=`${wdNmC(h)} chối không thấy ${nm}. Thân -4.`}}
 else if(a==="raise"){const h=loP(c.at);if(!can(1)||!h||c.hear)return;spend(1);loRaise(c,S);r=`Ngươi báo Cung Chính ti thu hồi ${nm} ở ${loPal(h)}; sẽ xét trong ${c.hear-wk()} tuần.`}
 else if(a==="giveback"||a==="handin"){if(!can(1))return;spend(1);const x=loEntry(c);const o=loP(c.own);if(x){lostUnwear(S);const i=S.inv.indexOf(x.e);if(i>=0)S.inv.splice(i,1);lostReturn(x.e,a==="handin"?"nop":"tra")}
  if(a==="giveback"&&o){relAdd(S,o,4);r=`Ngươi sai người trả ${nm} về ${wdNm(o)}. Thân +4.`}else{apply({danh:1});r=`Ngươi nộp ${nm} lên Nội vụ phủ trả về chủ. Danh +1.`}}
 else if(a==="tell"){if(!can(1))return;spend(1);const o=loP(c.own),h=loP(c.at);c.told=1;if(o){loKnowAt(c,o,"");relAdd(S,o,6)}if(h)relAdd(S,h,-6);r=`Ngươi báo cho ${wdNm(o)} biết ${nm} đang ở ${loPal(h)}. Thân +6; ${h?h.name:""} thù -6.`}
 if(r){log(r);Q.push({t:"Tra xét",who:pMe(),h:`<p>${r}</p>`,btn:"Đã hiểu"});try{showModal()}catch(e){}}try{render()}catch(e){}}
document.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-lo]");if(!b||b.disabled)return;ev.stopPropagation();loUI(b.dataset.lo,+b.dataset.lc)},true);
window.LO=LO;window.loLose=loLose;window.loWeek=loWeek;window.loMonth=loMonth;window.lostReturn=lostReturn;window.lostEv=lostEv;window.lostEvUse=lostEvUse;window.lostUnwear=lostUnwear;
