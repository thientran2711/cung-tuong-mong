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
   RE-PORT 16/11 (review/lost-items-port, D38 item rivalry, OD:L108 + L117) adds, on the same case record:
   · STEAL AND KEEP: a rival's doing may end with the rival keeping the item herself (LO.keepP) instead of planting it; she may wear it
     (then it can be recognised). The hearing for a kept item is loKeepHear (holder = the real culprit; true evidence only).
   · Act "Sai người lấy trộm đồ" (laydo, Bạc) + no-bạc road "Sai cung nữ thân tín lấy đồ" (laydol, BALANCE rule): the SAME rule for her and
     every NPC (two-way, motive-gated for NPCs through BANDS "nặng"). A stolen item can be planted with the existing "Cài đồ vào rương"
     act: it keeps its owner, so the planted chest becomes the rival-plant case (frame others with someone's item).
   · EVIDENCE TRUTH (OWNER_DECISIONS 15/11 "Evidence against a clean player"): a holder who never knowingly kept the item (it only turned up
     in her chest and she never denied it or wore it) is CLEARED at the hearing without a roll; only a real deed (a rival's plant scheme,
     a lie, keeping and wearing someone's item, a theft) can bring a penalty. Evidence is always about a real deed.
   · Extortion is live in jtsb (batnat, "Ép nộp của", Sổ đồ mất): not duplicated. Her losses here go into the same Sổ đồ mất (tsbLedger).
   · Item events §64 (jitev): notices carry the item as kitItemTag; the "loask" dialog resolves its item (Trả lại → flies back).
   Case: S.lost[] {id,k,e,own,cause,by,sv,w,due,st:"lost"|"held"|"found"|"done",at,open,cev,kn{},hear,acc,tip,ret,heard,end,how,keep,lied,reT}
   Knobs: LO below. Old saves: no S.lost → nothing to migrate. ================= */
const LO={rate:8,cd:6,minPr:30,findW:[2,7],
 home:{mis:55,srv:15,riv:0},away:{mis:20,srv:65,riv:75},   /* % back home / turns up in another palace; the rest: never found */
 rivP:40,srvP:[20,45],                                       /* cause: a rival (when one's motive allows), a servant (careless servant) */
 tipW:[1,3],hearW:[1,2],recog:{own:15,fr:4,me:8},keepWear:25,expire:54,keepP:35,hearCd:6,
 act:{bac:30,duc:-4},
 cost:{ask:{k:1},cct:{k:1,bac:20},book:{k:1,bac:10},soat:{k:2}}};
function loL(){S.lost=S.lost||[];return S.lost}
function loGet(id){return loL().find(c=>c.id===id)||null}
function lostEv(id){const c=loGet(id);return c?(c.cev||0):0}
function lostEvUse(id){const c=loGet(id);if(c&&c.cev>0){c.cev--;return true}return false}
function loNm(k){return typeof wdFrameNm==="function"?wdFrameNm(k):((IT[k]||{}).n||"món đồ")}
function loP(k){return byKey(k)}
function loAlive(p){return !!p&&(p===S?!S.dead:p.alive&&!p.out)}
function loPal(p){if(!p)return"";if(p===S)return"cung ngươi";let k=true;try{if(typeof kitKnownName==="function")k=kitKnownName(p)}catch(e){}try{const n=palName(palaceOf(p));if(n)return k?`${n}, chỗ ${p.name}`:n}catch(e){}return k?`cung ${p.name}`:"một cung khác"}
function loPrice(e){const w=typeof wdItem==="function"?wdItem(e):null;return w?(w.pr||0):((IT[e.k]&&itm(e.k).pr)||0)}
function loGrade(e){const w=typeof wdItem==="function"?wdItem(e):null;if(w)return w.g|0;const pr=loPrice(e);return (IT[e.k]&&itm(e.k).nt)?4:pr>=200?3:pr>=100?2:pr>=40?1:0}
function loPic(e,sz){const w=typeof wdItem==="function"?wdItem(e):null;return typeof kitItem==="function"?kitItem({src:kitItemSrc(e.k,w?w.icon:""),name:loNm(e.k),grade:loGrade(e),size:sz||"md"}):""}
/* the item in a notice: the §64.1 item frame (kitItemTag), kept by ievPlace (kiev-own) and floated right of the text */
function loTag(e){try{if(typeof kitItemTag==="function"&&typeof kitItemInfo==="function")return kitItemTag(kitItemInfo(e)).replace('class="kiev"','class="kiev kiev-own kiev-txt"')}catch(x){}return loPic(e,"md")}
function loOk(e){return !!e&&!e.h&&!e.t&&!e.lo&&!e.w&&!e.keep&&!(typeof wdIsNt==="function"&&wdIsNt(e))&&!(typeof vlIs==="function"&&vlIs(e))&&!(IT[e.k]&&(itm(e.k).evi||itm(e.k).nt))&&loPrice(e)>=LO.minPr}
function loMotive(v,t){try{if(typeof motiveOK==="function")return !!motiveOK(v,t,"plant").ok}catch(e){}return true}
/* hidden cause, chosen by the existing motive system */
function loCause(p){let R0=[];try{R0=liveRivals(true).filter(v=>v!==p&&bandOf(danger(v,p))>=2&&loMotive(v,p)&&(v.bac||0)>=LO.act.bac)}catch(e){}/* two-way law: a rival's theft costs what her Act 'Sai người lấy trộm đồ' costs: bạc LO.act.bac + Đức -4 */
 if(R0.length&&roll(LO.rivP)){const v=R0.sort((a,b)=>danger(b,p)-danger(a,p))[0];ap(v,{bac:-LO.act.bac,duc:LO.act.duc});return{cause:"riv",by:key(v)}}
 const st=[p.maid].concat(p.staff||[]).filter(Boolean);const sv=st.find(s=>s.tr==="nhat");
 if(roll(sv?LO.srvP[1]:LO.srvP[0])){const s=sv||pick(st);return{cause:"srv",sv:s?s.name:""}}return{cause:"mis"}}
/* the same function for everyone: an item leaves its owner's chest */
function loLose(p,force){if(!loAlive(p))return null;const L=(p.inv||[]).filter(loOk);if(!L.length)return null;
 L.sort((a,b)=>loPrice(b)-loPrice(a));const e=pick(L.slice(0,3));p.inv.splice(p.inv.indexOf(e),1);
 S.loSeq=(S.loSeq||0)+1;const c=Object.assign({id:S.loSeq,k:e.k,e,own:key(p),w:wk(),due:wk()+LO.findW[0]+R(LO.findW[1]-LO.findW[0]+1),st:"lost",at:null,open:0,cev:0,kn:{},hear:0,acc:null,d:(typeof wdWhen==="function"?String(wdWhen()).replace(/^./,x=>x.toLowerCase()):"")},force||loCause(p));
 loL().push(c);p.loCd=S.turn+LO.cd;const nm=loNm(e.k);
 /* a rival's doing: she may keep it herself (steal and keep) instead of planting it on someone (forced by the act, else LO.keepP) */
 if(c.cause==="riv"&&c.by&&(c.keep||(!force&&roll(LO.keepP)))){const v=loP(c.by);if(v&&loAlive(v)){const x=Object.assign({},e,{lo:c.id,gh:c.own,by:c.by});delete x.from;delete x.giver;delete x.w;v.inv=v.inv||[];v.inv.push(x);c.keep=1;c.st="held";c.at=c.by}else c.keep=0}
 if(p===S){Q.push({t:"Đồ thất lạc",who:pMe(),h:`${loTag(e)}<p><b>${nm}</b> trong rương ngươi đã thất lạc.</p><p class="past">Chưa rõ vì sao. Vào Tư trang › Việc › Đồ thất lạc để tra xét.</p>`,btn:"Đã hiểu"});log(`${nm} trong rương thất lạc.`);
  try{if(typeof tsbLedger==="function")tsbLedger({what:nm,how:"thất lạc",lo:c.id})}catch(x){}}
 else{const txt=`${wdNmC(p)} báo mất ${nm}.`;try{newsAdd(p,"lo",txt);if(S.news&&S.news[0]&&S.news[0].t===txt){c.heard=1;log(txt)}}catch(x){}}
 return c}
function loClean(e){const x=Object.assign({},e);for(const f of ["lo","gh","by","h","w"])delete x[f];return x}
function loLedgerBack(c){try{if(c&&c.own==="me")for(const x of S.tsbLog||[])if(x&&x.lo===c.id)x.back=1}catch(e){}}
/* the item goes back to its owner (j92 verdict, a quiet return, a search) */
function lostReturn(e,how){const c=e&&e.lo?loGet(e.lo):null;if(!c||c.st==="done")return;const o=loP(c.own);if(o&&loAlive(o)){o.inv=o.inv||[];o.inv.push(loClean(c.e||e))}
 c.st="done";c.end=wk();c.how=how||"tra";loLedgerBack(c);if(o===S)log(`${loNm(c.k)} đã về lại rương ngươi.`)}
/* take a worn missing item off before a search (wardrobe slot or j8 worn flag) */
function lostUnwear(t,a){if(!t)return;try{const w=typeof wdOf==="function"?wdOf(t):null;if(w)for(const sl of ["tram","y"]){const e=w[sl];if(e&&e.lo&&(!a||e.gh===key(a))){const k=sl==="y"?wdDefault(t,"y"):null;w[sl]=k?{k,from:"base"}:null;try{wdOf(t)}catch(x){}t.inv=t.inv||[];t.inv.push(e)}}}catch(x){}
 for(const e of t.inv||[])if(e&&e.lo&&(!a||e.gh===key(a)))e.w=0}
function loEntryAt(h,c){if(!h)return null;let w=null;try{w=typeof wdOf==="function"?wdOf(h):null}catch(x){}if(w)for(const sl of ["tram","y"])if(w[sl]&&w[sl].lo===c.id)return{h,e:w[sl],worn:1};
 const e=(h.inv||[]).find(x=>x&&x.lo===c.id);return e?{h,e,worn:!!e.w}:null}
/* where the item is now; it may have moved (planted with "Cài đồ vào rương"): then the case follows it */
function loEntry(c){const h=loP(c.at);const x=loEntryAt(h,c);if(x||!c.at)return x;for(const p of [S].concat(consorts())){if(p===h||!loAlive(p))continue;const y=loEntryAt(p,c);if(y){c.at=key(p);return y}}return null}
function loHolder(c){const o=loP(c.own),cu=c.by?loP(c.by):null;const L=consorts().filter(x=>x!==o&&x!==cu&&loAlive(x));if(!L.length)return null;
 if(cu)return L.sort((a,b)=>danger(cu,b)+R(20)-danger(cu,a)-R(20))[0];return pick(L)}
function loHonest(h){const tr=typeof traitsOf==="function"?traitsOf(h).join(" "):(h.trait||"");return (h.malice||0)<50&&!/Tham vọng|Kiêu ngạo/.test(tr)}
/* where it turns up */
function loFind(c){const r=R(100);const o=loP(c.own);if(!o||!loAlive(o)){c.st="done";c.how="mat";return}
 if(r<LO.home[c.cause]){o.inv=o.inv||[];o.inv.push(loClean(c.e));c.st="done";c.end=wk();c.how="nha";
  loLedgerBack(c);if(o===S){Q.push({t:"Tìm thấy đồ thất lạc",who:pMe(),h:`${loTag(c.e)}<p>Cung nhân tìm thấy <b>${loNm(c.k)}</b> ngay trong cung ngươi${c.cause==="srv"&&c.sv?`: ${c.sv} cất nhầm chỗ`:""}.</p>`,btn:"Đã hiểu"});log(`${loNm(c.k)} thất lạc nay tìm thấy trong cung.`)}return}
 if(r>=LO.home[c.cause]+LO.away[c.cause]){c.nf=1;return}
 const h=loHolder(c);if(!h){c.nf=1;return}const e=Object.assign({},c.e,{lo:c.id,gh:c.own});delete e.from;delete e.giver;if(c.cause==="riv"){e.h=1;e.by=c.by;c.tip=wk()+LO.tipW[0]+R(LO.tipW[1]-LO.tipW[0]+1)}else c.open=1;
 h.inv=h.inv||[];h.inv.push(e);c.st="held";c.at=key(h);
 if(h===S&&c.open){Q.push({t:"Đồ lạ trong rương",who:pMe(),h:`${loTag(e)}<p>Cung nhân thấy trong rương ngươi có <b>${loNm(c.k)}</b>, không rõ của ai.</p><p class="past">Vào Tư trang › Việc › Đồ thất lạc: đối chiếu sổ Nội vụ phủ để biết chủ, rồi trả về hay nộp lên.</p>`,btn:"Đã hiểu"});log(`Trong rương có ${loNm(c.k)} không rõ của ai.`)}
 else if(h!==S&&c.open&&loHonest(h))c.ret=wk()+1+R(3)}
/* the owner learns where it is (a tip, an investigation, a recognised item) */
function loKnowAt(c,p,how){if(!p||c.st==="done"||!c.at)return;c.kn[key(p)]=1;if(key(p)===c.own&&c.st==="held")c.st="found";
 if(p===S&&how){const h=loP(c.at);if(c.own==="me")Q.push({t:"Đồ thất lạc",who:h&&h!==S?pv(h):pMe(),h:`${loTag(c.e)}<p>${how}: <b>${loNm(c.k)}</b> của ngươi đang ở ${loPal(h)}.</p><p class="past">Đòi lại êm thấm, hay báo Cung Chính ti thu hồi (Tư trang › Việc › Đồ thất lạc, hoặc thẻ người của nàng).</p>`,btn:"Đã hiểu"});
  log(`${how}: ${loNm(c.k)} ${c.own==="me"?"của ngươi":"của "+wdNm(loP(c.own))} ở ${loPal(h)}.`)}}
/* the owner decides: ask for it quietly, or raise it at Cung Chính ti (NPC owners; her own choice is an act card) */
function loOwnerMove(c){const o=loP(c.own),h=loP(c.at);if(!o||o===S||!h||c.hear||c.asked||(c.reT||0)>wk())return;c.asked=1;
 if(aff(o,h)>=20||roll(40)){if(h===S){pushDil(mkP("loask",{id:c.id}),"Đồ thất lạc");return}if(roll(loAskOdds(h,o,c))){const x=loEntry(c);if(x){lostUnwear(h,o);const i=h.inv.indexOf(x.e);if(i>=0)h.inv.splice(i,1);lostReturn(x.e,"tra")}return}}
 loRaise(c,o)}
function loRaise(c,o){c.hear=wk()+LO.hearW[0]+R(LO.hearW[1]-LO.hearW[0]+1);c.acc=key(o);const h=loP(c.at);
 if(h===S){Q.push({t:"Đồ thất lạc",who:pv(o),h:`<p>${wdNmC(o)} báo Cung Chính ti: ${loNm(c.k)} của nàng thất lạc, nay thấy ở cung ngươi. Cung Chính ti sẽ xét trong ${c.hear-wk()} tuần.</p><p class="past">${c.keep&&c.at==="me"?"Lén trả lại trước khi xét thì êm chuyện: Tư trang › Việc › Đồ thất lạc.":"Tra xét trước để minh oan: Tư trang › Việc › Đồ thất lạc."}</p>`,btn:"Đã hiểu"});log(`${wdNmC(o)} báo Cung Chính ti: ${loNm(c.k)} thấy ở cung ngươi.`)}}
function loAskOdds(h,o,c){return cl(Math.round(40+aff(h,o)/2+(loHonest(h)?20:-10)-(c&&c.keep&&c.by===key(h)?20:0)),5,95)}
/* the hearing when the holder is the real thief (steal and keep): Cung Chính ti searches her palace; only true evidence counts */
function loKeepOdds(c,a,h){return cl(Math.round(40+lostEv(c.id)*10+evG(a,h)*10+((a.danh||0)-(h.danh||0))/10-(h.mat||0)*3),5,95)}
function loKeepHear(c,a,h){const nm=loNm(c.k);const o=loKeepOdds(c,a,h);
 if(roll(o)){const x=loEntry(c);if(x){lostUnwear(x.h,a);const i=x.h.inv.indexOf(x.e);if(i>=0)x.h.inv.splice(i,1);lostReturn(x.e,"xet")}
  if(evG(a,h)>0)evA(a,h,-1);ap(h,{danh:-10,sung:-5});punish(h,"lấy trộm đồ",1);relAdd(h,a,-6);
  return h===S?`<span class="r">Cung Chính ti soát cung ngươi, thấy ${nm} của ${wdNm(a)}.</span> Ngươi mang tội lấy trộm: Danh -10, Sủng -5, bị phạt. Món đồ về lại với chủ.`
   :`Cung Chính ti soát ${loPal(h)}, thấy ${nm} của ${wdNm(a)}. ${wdNmC(h)} mang tội lấy trộm: Danh -10, Sủng -5, bị phạt. Món đồ về lại với ${wdNm(a)}.`}
 c.asked=0;c.reT=wk()+LO.hearCd;relAdd(h,a,-6);
 return h===S?`Cung Chính ti soát cung ngươi, không thấy ${nm}. ${wdNmC(a)} chưa đủ chứng cứ; việc tạm gác.`
  :`Cung Chính ti soát ${loPal(h)}, không thấy ${nm}. Chưa đủ chứng cứ: việc tạm gác, ${LO.hearCd} tuần sau mới báo lại được.`}
/* the hearing when the holder never knowingly kept it (no lie, never worn, no rival behind it): cleared without a roll (evidence truth) */
function loQuietHear(c,a,h){const nm=loNm(c.k);const x=loEntry(c);if(x){lostUnwear(x.h,a);const i=x.h.inv.indexOf(x.e);if(i>=0)x.h.inv.splice(i,1);lostReturn(x.e,"xet")}
 return h===S?`Cung Chính ti xét: ${nm} của ${wdNm(a)} chỉ thất lạc, lẫn sang cung ngươi; ngươi không có lỗi. Món đồ về lại với chủ.`
  :`Cung Chính ti xét: ${nm} của ${wdNm(a)} chỉ thất lạc, lẫn sang ${loPal(h)}; ${wdNm(h)} không có lỗi. Món đồ về lại với ${wdNm(a)}.`}
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
 if(!c.ret&&!x.worn&&!c.wo&&roll(LO.keepWear)){c.wo=1;c.lied=1;const i=h.inv.indexOf(x.e);if(i<0)return;try{if(typeof wdItem==="function"&&wdItem(x.e))wdWear(h,i);else if(IT[x.e.k]&&itm(x.e.k).sl)wear(h,i)}catch(e){}}}
/* ---------- weekly / monthly ---------- */
function loWeek(){if(!S||S.dead)return;for(const c of loL()){if(c.st==="done")continue;try{
  const o=loP(c.own);if(!o||!loAlive(o)){c.st="done";c.how="mat";continue}
  if(c.st==="lost"){if(!c.nf&&wk()>=c.due)loFind(c);else if(o!==S&&roll(20))loNpcTry(o,c)}
  if(c.st==="held"||c.st==="found"){const x=loEntry(c);if(!x){c.st="done";c.how="matdau";continue}
   if(x.h===S&&x.worn&&c.own!=="me")c.lied=1;
   if(c.st==="held"&&c.tip&&wk()>=c.tip){c.tip=0;const cu=loP(c.by);loKnowAt(c,o,o===S?"Có người báo tin":"");if(o===S&&cu)c.tipBy=c.by}
   loHolderMove(c);if(c.st==="done")continue;
   if(c.st==="held"&&c.keep&&o!==S&&!c.kn[c.own]&&roll(20))loNpcTry(o,c);
   if(c.st==="found"&&o!==S)loOwnerMove(c);
   if(c.hear){const h=loP(c.at);if(h&&h!==S&&roll(50))loNpcTry(h,c);
    if(wk()>=c.hear){c.hear=0;const a=loP(c.acc);if(a&&h){const r=c.keep&&c.by===c.at?loKeepHear(c,a,h):(!c.by&&!c.lied)?loQuietHear(c,a,h):wdFrameResolve(a,h);if(r&&h===S&&a!==S)Q.push({t:"Cung Chính ti xét xử",who:pv(a),h:`<p>${r}</p>`,btn:"Đã hiểu"});if(r&&(a===S||h===S||c.heard))log(r);if(r&&a===S)Q.push({t:"Cung Chính ti xét xử",who:pv(h),h:`<p>${r}</p>`,btn:"Đã hiểu"});if(c.st!=="done"&&!loEntry(c)){c.st="done";c.how="xet"}}}}}
  if(c.st!=="done"&&wk()-c.w>LO.expire){c.st="done";c.how="mat";const x=c.at?loEntry(c):null;if(x&&c.keep){for(const f of ["lo","gh","by"])delete x.e[f]}else if(x&&!x.worn&&x.e.h){const i=x.h.inv.indexOf(x.e);if(i>=0)x.h.inv.splice(i,1)}}}catch(e){console.error(e)}}
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
  {n:"Nói không thấy",fx:{},j67:"tốn: không tốn gì",go:()=>{c.lied=1;relAdd(S,o,-4);loRaise(c,o)}}]}};
/* §64 item events: the loask dialog shows the item; "Trả lại" sends it flying back to the owner (jitev loads later: register after load) */
setTimeout(()=>{try{IEV_PID.loask=(p)=>{const c=loGet(p&&p.id);const x=c?loEntry(c):null;return x&&x.h===S?{e:x.e,acts:["back",null]}:null}}catch(e){}},0);

/* ---------- her side: act cards (full price + odds), Tư trang section, person cards ---------- */
function loCostTxt(kind){const C=LO.cost[kind];return `tốn: ${C.k} khắc${C.bac?`, Bạc -${C.bac}`:""}`}
function loWhy(kind){const C=LO.cost[kind];return Q.length?"đang có việc chờ":whyTime(C.k)||(C.bac&&S.bac<C.bac?`cần Bạc ${C.bac}`:"")}
function loBtn(c,a,n,sm,why){return pbtn(`data-lo="${a}" data-lc="${c.id}"`,n,sm,why||"")}
/* the acts that fit her place in a case (owner, holder, suspect, a witness) */
function loActs(c){const B=[];const me=c.own==="me",h=c.at?loP(c.at):null,atMe=c.at==="me",known=me&&c.st==="found"&&h&&!atMe;const thief=atMe&&c.keep&&c.by==="me";
 const tra=()=>{B.push(loBtn(c,"ask","Hỏi cung nhân",`${word(loOdds("ask",S))} · ${loCostTxt("ask")} · thành: thêm 1 chứng cứ, có khi biết món đồ ở đâu · hỏng: không ai biết gì`,loWhy("ask")));
  B.push(loBtn(c,"cct","Báo Cung Chính ti",`${word(loOdds("cct",S))} · ${loCostTxt("cct")} · thành: thêm 1 chứng cứ; món đồ đang ở cung nào thì tìm ra · hỏng: chưa tra ra gì`,loWhy("cct")));
  B.push(loBtn(c,"book","Đối chiếu sổ Nội vụ phủ",`${word(loOdds("book",S))} · ${loCostTxt("book")} · thành: thêm 1 chứng cứ, biết món đồ ghi tên ai · hỏng: sổ sách không rõ`,loWhy("book")))};
 if(thief){B.push(loBtn(c,"sneak","Lén trả lại",`Chắc chắn · tốn: 1 khắc · thành: món đồ lặng lẽ về rương ${wdNm(loP(c.own))}, không ai bị tra${c.hear?"; Cung Chính ti thôi xét":""}`,whyTime(1)));return B}
 if(me&&!known&&c.st!=="done"){tra();return B}
 if(known){const x=loEntry(c);const o=x?cl(WD.clearBase+(h.mat||0)*WD.clearMat+wdFrameEv(h,S,x.e)*10,5,95):50;
  B.push(loBtn(c,"askback","Đòi lại êm thấm",`${word(loAskOdds(h,S,c))} · tốn: 1 khắc · thành: nàng trả lại món đồ · hỏng: nàng chối, thân -4`,c.hear?"đã báo Cung Chính ti":whyTime(1)));
  B.push(loBtn(c,"raise","Báo Cung Chính ti thu hồi",`tốn: 1 khắc · thành: Cung Chính ti xét trong 1–2 tuần, soát cung nàng; thấy món đồ thì về lại rương · kèm: ai có lỗi thật (giữ đồ người khác, chối) thì bị phạt, Danh -10; người vô can được minh oan · hỏng: không thấy, ${LO.hearCd} tuần sau mới báo lại được`,c.hear?"đã báo, đang chờ xét":(c.reT||0)>wk()?`vừa xét xong, chờ ${c.reT-wk()} tuần`:whyTime(1)));
  tra();return B}
 if(atMe&&(c.open||c.hear)){const ownK=c.kn["ome"]||c.hear;
  if(c.hear)tra();
  else{B.push(loBtn(c,"book","Đối chiếu sổ Nội vụ phủ",`${word(loOdds("book",S))} · ${loCostTxt("book")} · thành: biết món đồ của ai, thêm 1 chứng cứ · hỏng: sổ sách không rõ`,loWhy("book")));
   B.push(loBtn(c,"giveback","Trả về chủ",`tốn: 1 khắc · thành: món đồ về tay chủ, thân +4`,ownK?whyTime(1):"chưa biết của ai: đối chiếu sổ trước"));
   B.push(loBtn(c,"handin","Nộp Nội vụ phủ",`tốn: 1 khắc · thành: Nội vụ phủ trả về chủ, Danh +1`,whyTime(1)))}
  return B}
 if(!me&&c.kn.me&&!atMe&&!c.told&&c.at){B.push(loBtn(c,"tell",`Báo cho ${loP(c.own)?loP(c.own).name:"chủ món đồ"}`,`tốn: 1 khắc · thành: nàng biết đồ của mình ở đâu, thân với nàng +6 · kèm: ${h?h.name:"người giữ đồ"} thù -6`,whyTime(1)))}
 return B}
function loMine(){return loL().filter(c=>c.st!=="done"&&(c.own==="me"||(c.at==="me"&&(c.open||c.hear||(c.keep&&c.by==="me")))||(c.kn.me&&c.own!=="me"&&c.at!=="me"&&!c.told)))}
function loState(c){const h=c.at?loP(c.at):null,o=loP(c.own);
 if(c.own==="me")return c.st==="found"&&h?[`Thấy ở ${loPal(h)}${c.hear?` · Cung Chính ti xét trong ${Math.max(0,c.hear-wk())} tuần`:""}`,"no"]:["Chưa rõ ở đâu","no"];
 if(c.at==="me"&&c.keep&&c.by==="me")return [`Của ${wdNm(o)} · người của ngươi lấy về${c.hear?` · ${o?o.name:""} đã báo Cung Chính ti, xét trong ${Math.max(0,c.hear-wk())} tuần`:""}`,"no"];
 if(c.at==="me")return c.hear?[`${o?o.name:""} đã báo Cung Chính ti · xét trong ${Math.max(0,c.hear-wk())} tuần`,"no"]:[c.kn["ome"]?`Của ${wdNm(o)}`:"Không rõ của ai","n"];
 return [`Của ${wdNm(o)} · ngươi thấy ở ${loPal(h)}`,"n"]}
function loInvHTML(){if(!S||S.dead)return"";const L=loMine();const D=loL().filter(c=>c.st==="done"&&c.own==="me"&&wk()-(c.end||0)<=3);if(!L.length&&!D.length)return"";
 const HOW={nha:"tìm thấy trong cung",tra:"đã về lại rương",soat:"đã về lại rương",nop:"được nộp trả",xet:"Cung Chính ti đã xét",mat:"mất hẳn",matdau:"mất dấu"};
 let h=`<div class="kwd"><div class="kpsec"><h4 class="kpst">Đồ thất lạc</h4>`;
 /* Soát rương joins the act grid of the last case (one grid per case, no half-empty row: owner 'no 2-col gaps') */
 const soat=L.some(c=>(c.at==="me"&&!(c.keep&&c.by==="me"))||c.own==="me")?pbtn(`data-inv="inspect"`,"Soát rương",`${word(oSee(S,true))} · tốn: 2 khắc · thành: tìm ra đồ lạ cài trong rương; đồ thất lạc của người khác thì trả về · hỏng: không thấy gì`,Q.length?"đang có việc chờ":whyTime(2)):"";
 L.forEach((c,n)=>{const st=loState(c);const facts=[`${loNm(c.k)}${c.d?` · ${c.keep&&c.by==="me"&&c.at==="me"?"lấy về":"thất lạc"} ${c.d}`:""}`];if(!(c.keep&&c.by==="me"))facts.push(`Chứng cứ tra xét: ${c.cev||0}`);
  if(c.own==="me"&&c.cause==="riv"&&c.by&&loP(c.by)&&evG(S,loP(c.by)))facts.push(`Chứng cứ về ${loP(c.by).name}: ${evG(S,loP(c.by))}`);
  const B=loActs(c);if(n===L.length-1&&soat)B.push(soat);
  h+=`<div class="kwdsel">${loPic(c.e,"md")}<div>${kitChip(st[0],st[1])}${kitFacts(facts)}</div></div>${B.length?`<div class="rbtn">${B.join("")}</div>`:""}`});
 for(const c of D)h+=`<p class="past">${loNm(c.k)}: ${HOW[c.how]||"đã xong"}.</p>`;
 return h+`</div></div>`}
(function(){if(typeof invHTML!=="function")return;const i0=invHTML;invHTML=function(){const h=i0.apply(this,arguments);let x="";try{x=loInvHTML()}catch(e){console.error(e)}return x?x+h:h}})();
/* person card: the same act cards for the cases that involve her */
(function(){if(typeof rvGroups!=="function")return;const g0=rvGroups;rvGroups=function(v){const G=g0.apply(this,arguments);try{if(v&&v.alive&&!v.out){const k=key(v);
  const B=loMine().filter(c=>c.at===k||c.own===k).flatMap(c=>loActs(c));
  if(B.length)G.unshift(["Đồ thất lạc",B])}}catch(e){console.error(e)}return G}})();
function loUI(a,id){const c=loGet(id);if(!c||c.st==="done"||!S||S.dead||Q.length)return;const nm=loNm(c.k);let r="";
 if(["ask","cct","book"].includes(a)){const C=LO.cost[a];if(!can(C.k)||(C.bac&&S.bac<C.bac))return;spend(C.k);r=loDo(a,S,c)}
 else if(a==="askback"){const h=loP(c.at);if(!can(1)||!h)return;spend(1);if(roll(loAskOdds(h,S,c))){const x=loEntry(c);if(x){lostUnwear(h,S);const i=h.inv.indexOf(x.e);if(i>=0)h.inv.splice(i,1);lostReturn(x.e,"tra")}r=`${wdNmC(h)} trả lại ${nm}.`}else{relAdd(S,h,-4);r=`${wdNmC(h)} chối không thấy ${nm}. Thân -4.`}}
 else if(a==="raise"){const h=loP(c.at);if(!can(1)||!h||c.hear||(c.reT||0)>wk())return;spend(1);loRaise(c,S);r=`Ngươi báo Cung Chính ti thu hồi ${nm} ở ${loPal(h)}; sẽ xét trong ${c.hear-wk()} tuần.`}
 else if(a==="giveback"||a==="handin"){if(!can(1))return;spend(1);const x=loEntry(c);const o=loP(c.own);if(x){lostUnwear(S);const i=S.inv.indexOf(x.e);if(i>=0)S.inv.splice(i,1);lostReturn(x.e,a==="handin"?"nop":"tra")}
  if(a==="giveback"&&o){relAdd(S,o,4);r=`Ngươi sai người trả ${nm} về ${wdNm(o)}. Thân +4.`}else{apply({danh:1});r=`Ngươi nộp ${nm} lên Nội vụ phủ trả về chủ. Danh +1.`}}
 else if(a==="sneak"){if(!can(1))return;spend(1);const x=loEntry(c);const o=loP(c.own);if(x){lostUnwear(S);const i=S.inv.indexOf(x.e);if(i>=0)S.inv.splice(i,1);lostReturn(x.e,"nop")}c.hear=0;r=`Người của ngươi lặng lẽ đặt ${nm} về rương ${wdNm(o)}. Không ai bị tra.`}
 else if(a==="tell"){if(!can(1))return;spend(1);const o=loP(c.own),h=loP(c.at);c.told=1;if(o){loKnowAt(c,o,"");relAdd(S,o,6)}if(h)relAdd(S,h,-6);r=`Ngươi báo cho ${wdNm(o)} biết ${nm} đang ở ${loPal(h)}. Thân +6; ${h?h.name:""} thù -6.`}
 if(r){log(r);Q.push({t:a==="sneak"?"Đồ thất lạc":"Tra xét",who:pMe(),h:`<p>${r}</p>`,btn:"Đã hiểu"});try{showModal()}catch(e){}}try{render()}catch(e){}}
document.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-lo]");if(!b||b.disabled)return;ev.stopPropagation();loUI(b.dataset.lo,+b.dataset.lc)},true);
/* ---------- STEAL (owner 14/11 22:55Z: "servants bribed to steal items, then keep or plant them"): ONE rule for her and every NPC ----------
   laydo: bribe a servant (Bạc) · laydol: her trusted cung nữ does it (no bạc, loyalty cost, harder) — the BALANCE rule's second road.
   Success: the item leaves the target's chest as a case (the target only sees "thất lạc"); her own theft stays in her chest
   (wear it and it may be recognised; plant it with "Cài đồ vào rương" to frame someone; "Lén trả lại" ends it quietly).
   An NPC thief keeps it or plants it on someone she dislikes (the hidden rival cause). Caught: the target holds 2 true evidence (j8 caught). */
function loStealOk(a,t){return !!t&&a!==t&&!t.out&&loAlive(t)&&(t.inv||[]).some(loOk)&&!loL().some(c=>c.own===key(t)&&c.st!=="done")}
function loStealO(a,t,self){return cl(Math.round(odA(a,38+(a.tamco||0)/4+(a.mat||0)*3-((t.maid&&t.maid.loyal)||50)/5))-(self?(BAL.selfMinus||12):0),5,95)}
function loSteal(a,t,self){a.schemes=(a.schemes||0)+1;if(typeof ducAdd==="function")ducAdd(a,LO.act.duc,"sai người lấy trộm đồ");else ap(a,{duc:LO.act.duc});
 if(self){const m=typeof econLoyalMaid==="function"?econLoyalMaid(a):a.maid;if(m)m.loyal=cl((m.loyal||0)-(BAL.loyalCost||10),0,100)}
 const cg=caught(a,t,false,"sai người lấy trộm đồ trong rương "+NM(t));if(cg)return cg;
 if(!roll(loStealO(a,t,self))){relAdd(a,t,-4);return `Người ${NM(a)} sai đi lấy đồ của ${NM(t)} không gặp lúc vắng người, đành về tay không. `}
 const keep=a===S||roll(LO.keepP);const c=loLose(t,{cause:"riv",by:key(a),keep:keep?1:0});if(!c)return `Rương ${NM(t)} không còn món nào đáng lấy. `;
 const nm=loNm(c.k);if(a===S)return `<span class="g">Người của ngươi lấy được ${nm} trong rương ${wdNm(t)}</span>; món ấy nay nằm trong rương ngươi. Đeo ra ngoài thì dễ bị nhận ra. `;
 return `${NMc(a)} sai người lấy ${nm} trong rương ${NM(t)}. `}
A("laydo","Sai người lấy trộm đồ",{c:{bac:-LO.act.bac},ok:(a,t)=>(a.bac||0)>=LO.act.bac&&loStealOk(a,t),o:(a,t)=>loStealO(a,t),x:"một món quý trong rương nàng về tay ngươi",
 f:(a,t)=>{ap(a,{bac:-LO.act.bac});return loSteal(a,t,false)}});
A("laydol","Sai cung nữ thân tín lấy đồ",{c:{},ok:(a,t)=>!!(typeof econLoyalMaid==="function"?econLoyalMaid(a):a.maid)&&loStealOk(a,t),o:(a,t)=>loStealO(a,t,true),
 x:"không tốn bạc · cung nữ thân tín lòng -10 · khó hơn",f:(a,t)=>loSteal(a,t,true)});
try{AOUT.laydo=["một món quý trong rương nàng về tay ngươi (nàng chỉ biết là thất lạc) · Đức -4","về tay không, nàng thù -4 · bị bắt: nàng nắm 2 chứng cứ"];
 AOUT.laydol=["một món quý trong rương nàng về tay ngươi · cung nữ thân tín lòng -10 · Đức -4","về tay không · bị bắt: nàng nắm 2 chứng cứ"];
 const why=t=>!(t.inv||[]).some(loOk)?"rương nàng không có món nào đáng lấy":loL().some(c=>c.own===key(t)&&c.st!=="done")?"nàng đang tra xét đồ thất lạc":"";
 LACK.laydo=t=>S.bac<LO.act.bac?`cần Bạc ${LO.act.bac} để sai người`:why(t);
 LACK.laydol=t=>!(typeof econLoyalMaid==="function"?econLoyalMaid(S):S.maid)?"cần cung nữ thân tín (Lòng 40+)":why(t);
 ACTDOM.laydo=ACTDOM.laydol="Mưu kế";if(typeof J78VERB==="object"){J78VERB.laydo="sai người lấy trộm đồ của {t}";J78VERB.laydol="sai cung nữ lấy trộm đồ của {t}"}
 const G=RVGRP.find(x=>x[0]==="Hại nặng");if(G)for(const k of ["laydo","laydol"])if(!G[1].includes(k))G[1].push(k);
 if(!BANDS[2][2].includes("laydo"))BANDS[2][2].push("laydo");if(!DIRTY.includes("laydo"))DIRTY.push("laydo","laydol")}catch(e){console.error("jlost acts",e)}
/* a stolen item planted with "Cài đồ vào rương" keeps its owner: the planted chest becomes the rival-plant case (j92 hearing, true culprit) */
(function(){if(typeof plantItem!=="function")return;const p0=plantItem;plantItem=function(a,t,ix){const e=a&&a.inv&&a.inv[ix];const lo=e&&e.lo?e.lo:0;const r=p0.apply(this,arguments);
 try{if(lo){const c=loGet(lo);const n=(t.inv||[])[t.inv.length-1];if(c&&n&&n.h&&n.k===e.k&&n.by===key(a)){if(c.own===key(t)){t.inv.pop();lostReturn(e,"nha")}
   else{Object.assign(n,{lo,gh:c.own});c.at=key(t);c.keep=0;c.by=key(a);c.st="held";c.tip=wk()+LO.tipW[0]+R(LO.tipW[1]-LO.tipW[0]+1)}}else if(c&&c.st!=="done"){c.st="done";c.end=wk();c.how="matdau"}}}catch(x){console.error(x)}return r}})();
window.LO=LO;window.loLose=loLose;window.loWeek=loWeek;window.loMonth=loMonth;window.lostReturn=lostReturn;window.lostEv=lostEv;window.lostEvUse=lostEvUse;window.lostUnwear=lostUnwear;window.loKeepHear=loKeepHear;window.loSteal=loSteal;window.loEntry=loEntry;window.loGet=loGet;
