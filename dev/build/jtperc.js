/* ================= jtperc — TEMPER PERCEPTION: who saw it, what they trọng, what they know (seat T2, Foreman D) =================
   Owner OD 25/11 ~05:45Z (verbatim in dev/OWNER_DECISIONS.md): "một người nóng tính, nhưng mà nếu như mà họ nóng nhưng mà họ vẫn tốt bụng thì sao
   ... những người khác nhìn nhận như thế nào. Đó, những cái điểm thiện cảm nên tăng giảm ra làm sao" + OD 25/11 ~08:05Z «Bộc phát theo tính cách là
   phải làm» (open point (d) = OPTION A). Design: dev/handover/reports/temper-design.md (c) + (d), rows #4 + #5 of its (f) table.
   1. ONE RULE tpDeed(doer X, deed d, victim V) for her and every NPC (law 1). A deed is an outburst (jemoact eaDo / jfeel feelDo, every kind of person),
      a shared social deed (jtwoway twDo: provoke, humil, gossip, help, visit, apol, mediate …), an NPC vent (jagent agVent outside twDo: Trút giận,
      pillow talk, greeting taunts) or her own talk-card gây sự (j2 «Khiêu khích» / «Trút giận», direct relAdd).
   2. WHO JUDGES (law 6a, real evidence): eye-witnesses = everyone whose row of the ONE record (S.roster, j95) stands at X's place at that khắc
      (her, consorts, Hoàng thượng, Thái hậu). The deed is also registered as a happening of the servants' knowledge record (jagknow knwSee):
      servants who stood there carry it by gossip (BAL.slv.gos) and tell their mistress (knTell) — a consort told that way judges it later
      at ×hear. Hoàng thượng / Thái hậu only hear it when someone who knows tells them (a teller who dislikes X or loves V, hashed odds tellUp).
      Nobody judges a deed she never saw or heard of. Record off (co-op, measuring): the consorts standing at the same place (whereOf).
   3. WHAT EACH OBSERVER O DOES: Δ thiện cảm (O → X) = base[d] × trọngK × relK × kindK × reasonK (× hear), fractions carried per pair (exact, no dice):
      trọngK = O's trọng against the deed's virtue tags (DEED, jtrong; the same up / off steps BAL.trong); a harsh deed whose tags O only honours
      (Phạm thượng before a Tín / Trung judge) wins her approval when O knows the reason (approve);
      relK = the victim's friend ×friend, the victim's enemy turns the sign at ×foe (glad);
      kindK = O holds kind memories of X (jmem, last kindWk tuần): harsh losses ×(1 − forgive), ×(1 − forgiveV) when O trọng Nhân or Nghĩa;
      labels: O saw ≥ tagN outbursts and ≥ tagN kind deeds → «good» (losses ×goodK, kind deeds ×goodKind); outbursts + ≥ tagN harms and few
      kind deeds → «evil» (losses ×evilK, Oán +evilOan each). The label shows on O's person card, «Tính nết» row, as a kit tap-word;
      reasonK = O knows the reason (O close to X, an open feud = oán ≥ her own «thù» level netTh(X,"thu"), or O knows the cause of X's mood, jmoodknow) ×reason, else ×noReason.
      Who it lands on: a consort's / her own thiện cảm (affAdd); Hoàng hậu → her S.hh; Thái hậu → th; Hoàng thượng → Sủng ×empK.
      Gate stats (th, hh, Sủng) lose at most cap per doer per 12 months to this rule (design (e) G1) and at most hiCap per deed.
   4. HER REASON GATE (design (d) OPTION A, OD 25/11 ~08:05Z): her gây sự cards (Khiêu khích, Trút giận, Hạ nhục) pass the SAME motive gate as the
      NPCs (motiveOK(S, t, "provoke", 1), j95); a closed card reads «chưa có cớ»; an open one names its reason («cớ: oán 42 · ghét»).
   Numbers: BAL.tp (law 4). Off switch for measuring: window.__tpOff = 1 or BAL.tp.on = 0. Personal state S.tp (lazy; old saves load).
   ===================================================================================================================================== */
Object.assign(BAL,{tp:{on:1,
 /* base Δ thiện cảm of one onlooker per deed (− harsh, + kind); a deed not listed is not judged */
 base:{dapdo:-1,mang:-2,danh:-5,khac:-3,gaysu:-3,pham:-3,cham:-2,ke:-2,khoe:-1,khoc:1,tui:1,thuong:1,tiec:1,cau:1,
  provoke:-3,humil:-4,vent:-3,gossip:-1,help:1,apol:1,mediate:1,
  soat:-2,bove:-1,treo:-1,noi:-2,nghi:-2,quo:-2,cai:-1,okho:-2,qgian:-1,qhac:-1,khon:-1,vuive:1},
 /* REVIEW B1 (LAW 11): every outburst reaction of every kind of person → the deed it is judged as (jemoact R_ + jfeel BAL.feel.act; keys of
    base judge themselves). A reaction not here and not in base hurts or helps nobody in front of others (her own fast, prayer, letter home,
    a sleepless night, work …): «self» in dev/measure/temper-judged.js. */
 map:{kexau:"ke",ohoi:"ke",caugat:"mang",noimoc:"cham",khoetai:"khoe",mhoi:"cham",ban:"thuong",eyen:"tiec",mvui:"tiec",qvui:"tiec",
  sk:"khoc",okhoc:"khoc",mcai:"cai",kquay:"dapdo",ovui:"vuive",kvui:"vuive"},
 /* the deeds that count as an outburst / as a harm for the labels */
 harm:["danh","khac","humil","ke","gaysu","soat","noi","nghi","quo","okho"],
 hear:.5,friend:1.5,foe:.5,approve:1,kindWk:24,forgive:.5,forgiveV:.7,forgiveTr:["Nhân","Nghĩa"],
 tagN:3,goodK:.5,goodKind:1.2,evilK:1.5,evilOan:3,reason:.6,noReason:1.3,
 tellUp:30,tellHost:30,empK:.5,hiCap:2,cap:{th:6,hh:8,sung:4},capWk:36,max:12,days:3,keep:40,
 /* motive gate (j95 motiveOK, every doer): a heavy angry / jealous mood adds moodM to the motive (feeling level ≥ moodLv) */
 moodM:10,moodLv:2,moodG:["gian","ghen"],
 /* REVIEW B2: the motive kinds the mood term applies to = gây sự (agent provoke covers humil / drop / gossip, j95s rumor; vent / humil named for direct calls) */
 moodK:["provoke","vent","humil","gossip","rumor"]}});
/* the deeds' virtue tags (jtrong DEED: +1 honours, −1 offends), design table (c) */
Object.assign(DEED,{dapdo:{"Kiệm":-1,"Lễ":-1},mang:{"Nhân":-1},danh:{"Nhân":-1,"Lễ":-1},khac:{"Nhân":-1,"Lễ":-1},gaysu:{"Lễ":-1,"Khiêm":-1},
 pham:{"Lễ":-1,"Đễ":-1,"Tín":1,"Trung":1},cham:{"Khiêm":-1,"Nhân":-1},ke:{"Tín":-1},khoe:{"Khiêm":-1},khoc:{"Nhân":1},tui:{"Nhân":1},
 thuong:{"Nhân":1,"Kiệm":-1},cau:{"Kiệm":-1},tiec:{"Nghĩa":1,"Kiệm":-1},
 soat:{"Nhân":-1,"Tín":-1},bove:{"Lễ":-1},treo:{"Lễ":-1,"Nhân":-1},noi:{"Nhân":-1},nghi:{"Tín":-1,"Nhân":-1},quo:{"Nhân":-1,"Lễ":1},
 cai:{"Lễ":-1},okho:{"Nhân":-1,"Nghĩa":-1},qgian:{"Lễ":-1},qhac:{"Khiêm":-1,"Trung":1},khon:{"Đễ":-1},vuive:{"Nghĩa":1},humil:DEED.humiliate,vent:DEED.provoke,apol:DEED.apologise});
const TP={stat:{deed:0,eye:0,hear:0,up:0,zero:0,lab:{good:0,evil:0},gate:{ok:0,no:0}},fd:0,tw:0,pk:null};
function tpOn(){try{return !!(typeof S!=="undefined"&&S&&BAL.tp&&BAL.tp.on&&!window.__tpOff&&!S.dead)}catch(e){return false}}
function tpS(){S.tp=S.tp||{q:[],m:{},r:{},c:{},n:0};const T=S.tp;T.q=T.q||[];T.m=T.m||{};T.r=T.r||{};T.c=T.c||{};return T}
/* keys: "me" her, "emp", "th", a consort id (jmem's memKey: one key style) */
function tpK(p){try{if(p==="th"||(S.thO&&p===S.thO))return"th";if(S.emp&&p===S.emp)return"emp";if(p&&p!==S&&typeof relMS==="function"&&relMS(p)){const k=relKey(p);return k?"x"+k:null}return typeof memKey==="function"?memKey(p):p===S?"me":p&&p.id!=null?String(p.id):null}catch(e){return null}}
function tpP(k){if(k==="me")return S;if(k==="emp")return S.emp||null;if(k==="th")return"th";if(/^x/.test(k)){try{return typeof window.relMSOf==="function"?window.relMSOf(k.slice(1)):null}catch(e){return null}}try{const v=RV(+k);return v&&v.alive&&!v.out?v:null}catch(e){return null}}
/* REVIEW N6: the doer key of a knowledge record = the record's own person ids («me», «v<id>» a consort, «emp», «th», «s<sid>» a servant),
   else the j61 person key (kOf61: «x<n>» a man / child / court person) — never «v»+ a non-consort key */
function tpAb(X,xk){try{if(xk==="me"||xk==="emp"||xk==="th")return xk;if(tpCons(X))return"v"+X.id;if(X&&X.sid!=null)return"s"+X.sid;return typeof kOf61==="function"?kOf61(X)||xk:xk}catch(e){return xk}}
function tpRid(k){return k==="me"||k==="emp"||k==="th"?k:"v"+k}
function tpCons(p){return !!p&&p!=="th"&&p!==S.emp&&(p===S||(typeof rivals!=="undefined"&&rivals.includes(p)))}
function tpName(p){try{return p===S?"ngươi":p==="th"?"Thái hậu":p===S.emp?"Hoàng thượng":p.queen?"Hoàng hậu":p.name||""}catch(e){return""}}
function tpHash(s){let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return((h>>>0)%10000)/100}
/* ---------- the motive gate's mood term (j95 motiveOK reads it for every doer, her included) ---------- */
function tpMoodM(a,kind){try{const B=BAL.tp;if(!B||!B.on||window.__tpOff||typeof emoGet!=="function")return 0;/* REVIEW B2 (D, owner «gây sự» only): the mood term counts for the gây sự kinds only (BAL.tp.moodK), the same for her and every NPC */if(kind&&!(B.moodK||[]).includes(kind))return 0;const e=emoGet(a);if(!e||!e.k)return 0;
 const g=typeof feelGrp==="function"?feelGrp(e.k):e.k;if(!B.moodG.includes(g))return 0;const lv=typeof feelLv==="function"?feelLv(a,e.k):(typeof emoLv==="function"?emoLv(e.k):0);
 return lv>=B.moodLv?B.moodM:0}catch(e){return 0}}
/* her motive toward t: the SAME gate the NPCs pass (law 1, design (d) Option A) */
function motiveMe(t,kind){try{return motiveOK(S,t,kind||"provoke",1)}catch(e){return{ok:true,why:""}}}
/* ---------- where the deed happens + who stands there ---------- */
function tpWhere(X){try{const w=typeof j95whereId==="function"?j95whereId(j95id(X)||(X===S.emp?"emp":(S.thO&&X===S.thO)||X==="th"?"th":"")):null;if(w&&w.place)return w.place}catch(e){}
 const a=tpAnchor(X);if(a)return tpWhere(a);
 try{return X===S?(S.place||"home"):X===S.emp?null:whereOf(X)}catch(e){return null}}
/* a doer outside the ONE record stands where the person he serves stands: a servant by the mistress (relOwner), a child by its mother,
   a nữ quan by the Hoàng hậu who runs the six palaces, a minister / an official man before Hoàng thượng at court */
function tpAnchor(X){try{if(!X||X===S||X===S.emp||X==="th"||X===S.thO||tpCons(X))return null;const k=typeof eaKind==="function"?eaKind(X):"";
 if(k==="s")return (typeof relOwner==="function"&&relOwner(X))||S;if(k==="k"){const a=allKids().find(z=>z[0]===X);return a?(a[1]||S):S}
 if(k==="o"){const q=(rivals||[]).find(v=>v.queen&&v.alive&&!v.out);return q||S}if(k==="q"||k==="m")return S.emp||null}catch(e){}return null}
function tpEye(pl,kh,X,V){const out=[];if(!pl)return out;const R=typeof agRec==="function"?agRec():null;
 if(R&&R.P){for(const id in R.P){const x=R.P[id][kh];if(!x||!(typeof j95at==="function"?j95at(x[0],pl):x[0]===pl))continue;
   const O=id==="me"?S:id==="emp"?S.emp:id==="th"?(S.thDead?null:"th"):/^v\d+$/.test(id)?RV(+id.slice(1)):null;
   if(O&&O!==X&&O!==V&&(O==="th"||O===S||O===S.emp||(O.alive&&!O.out)))out.push(O)}return out}
 /* the record is off (co-op / measuring): the consorts who stand at the same place */
 try{for(const v of liveRivals(true))if(v!==X&&v!==V&&!v.coop&&whereOf(v)===pl)out.push(v);if(X!==S&&V!==S&&!S.out&&whereOf(S)===pl)out.push(S)}catch(e){}return out}
/* ---------- the judge ---------- */
function tpTrK(O,tags,harsh,why){const B=BAL.trong,P=BAL.tp;if(!tags)return 1;let a=0,b=0;for(const v of trongOf(O)){const t=tags[v]||0;if(t<0)a++;else if(t>0)b++}
 if(a)why.push("trọng "+trongOf(O).filter(v=>tags[v]<0).join(", "));
 if(harsh){if(b&&!a)return{ap:b*P.approve};return Math.max(0,1+a*B.off-b*B.up)}
 return Math.max(0,1+b*B.up-a*B.off)}
function tpRelK(O,V){try{if(!V||!tpCons(V)||O==="th"||O===S.emp)return 1;if(aff(O,V)>=netTh(O,"than"))return BAL.tp.friend;if(oan(O,V)>=netTh(O,"thu"))return-BAL.tp.foe}catch(e){}return 1}
function tpKind(O,X){try{if(typeof memList!=="function")return 0;const n=wk(),W=BAL.tp.kindWk;return memList(O==="th"?"th":O,X).filter(m=>m.s>0&&n-(m.w||0)<=W).reduce((s,m)=>s+(m.n||1),0)}catch(e){return 0}}
function tpCloseTo(O,X){try{if(O==="th"||O===S.emp||X===S.emp)return false;return aff(O,X)>=netTh(O,"than")}catch(e){return false}}
function tpReason(O,X,V){try{if(tpCloseTo(O,X))return true;if(V&&tpCons(V)&&tpCons(X)&&oan(X,V)>=netTh(X,"thu"))return true;
 const c=typeof moodCauseKnownBy==="function"?moodCauseKnownBy(O==="th"?S.thO:O,X):null;return !!c}catch(e){return false}}
function tpMark(O,X){const T=tpS(),k=tpK(O)+"|"+tpK(X);return T.m[k]=T.m[k]||{o:[],k:[],h:[]}}
function tpLab(O,X){const T=tpS(),M=T.m[tpK(O)+"|"+tpK(X)];if(!M)return"";const P=BAL.tp,n=wk(),W=P.kindWk*2;
 for(const f of ["o","k","h"])M[f]=(M[f]||[]).filter(w=>n-w<=W);const kind=M.k.length+tpKind(O,X);
 const lab=M.o.length>=P.tagN&&kind>=P.tagN?"good":M.o.length>=P.tagN&&M.h.length>=P.tagN&&kind<P.tagN?"evil":"";
 if(lab&&lab!==M.lab)TP.stat.lab[lab]++;M.lab=lab;return lab}
/* who it lands on: the number applied (rounded per pair, fractions carried), capped for the gate stats */
function tpLand(O,X,d){if(!d)return 0;const T=tpS(),P=BAL.tp,pk=tpK(O)+">"+tpK(X);let f=null,mul=1;if(X==="th"){X=S.thO;if(!X)return 0}
 if(O==="th"&&!tpCons(X)){O=S.thO;if(!O)return 0}
 if(O===S.emp&&tpCons(X)){f="sung";mul=P.empK}else if(O==="th")f="th";else if(O.queen&&X===S)f="hh";
 let v=(T.r[pk]||0)+d*mul;let n=v<0?Math.ceil(v):Math.floor(v);T.r[pk]=+(v-n).toFixed(3);if(!T.r[pk])delete T.r[pk];if(!n)return 0;
 if(f){n=Math.max(-P.hiCap,Math.min(P.hiCap,n));if(n<0){const ck=tpK(X)+":"+f,y=Math.floor(wk()/P.capWk);const C=T.c[ck]&&T.c[ck].y===y?T.c[ck]:(T.c[ck]={y,u:0});
   const room=Math.max(0,P.cap[f]-C.u);n=-Math.min(-n,room);C.u+=-n;if(!n)return 0}
  if(f==="sung"){if(X===S)apply({sung:n});else ap(X,{sung:n})}else if(f==="th"){if(X===S)apply({th:n});else ap(X,{th:n})}else apply({hh:n});return n}
 n=Math.max(-P.max,Math.min(P.max,n));affAdd(O,X,n);return n}
/* O judges deed it of X (it = the pending item); how = "eye" | "hear" | "up" */
function tpJudge(O,it,how){const P=BAL.tp,X=tpP(it.x),V=it.v!=null?tpP(it.v):null;if(!X||!O||O===X)return 0;const base=P.base[it.d];if(!base)return 0;
 const harsh=base<0,why=[];let d=base;const tk=tpTrK(O,DEED[it.d],harsh,why);const rs=harsh?tpReason(O,X,V):true;
 if(tk&&tk.ap){d=rs?Math.abs(base)*tk.ap:0}else{d*=tk;
  const rk=tpRelK(O,V);if(rk<0)d=-d*(-rk);else d*=rk;
  if(harsh&&d<0){const kind=tpKind(O,X);if(kind>0){const tr=trongOf(O);d*=1-(tr.some(v=>P.forgiveTr.includes(v))?P.forgiveV:P.forgive)}
   d*=rs?P.reason:P.noReason}}
 const M=tpMark(O,X);const lab=tpLab(O,X);
 if(lab==="good")d*=d<0?P.goodK:P.goodKind;else if(lab==="evil"&&d<0)d*=P.evilK;
 if(how!=="eye")d*=P.hear;
 /* what this onlooker saw, kept for her labels (an outburst / a harm / a kind deed of X) */
 const n=wk();if(it.o)M.o.push(n);if(P.harm.includes(it.d)||(harsh&&!rs))M.h.push(n);if(!harsh)M.k.push(n);
 const got=tpLand(O,X,d);
 if(lab==="evil"&&harsh&&tpCons(O)&&tpCons(X))try{oanAdd(O,X,P.evilOan)}catch(e){}
 if(!got)TP.stat.zero++;TP.stat[how==="eye"?"eye":how==="up"?"up":"hear"]++;return got}
/* ---------- THE RULE: a deed happens ---------- */
function tpDeed(X,d,V,o){if(!tpOn()||!X||!BAL.tp.base[d])return null;o=o||{};if(typeof isSrv==="function"&&isSrv()&&X===S)return null;
 try{const T=tpS(),xk=tpK(X);if(!xk)return null;const vk=V?tpK(V):null;const at=o.at||null;const pl=at?at.pl:(o.pl||tpWhere(X));let kh=0;try{kh=at?at.kh:j95kh()}catch(e){}
  const it={id:++T.n,x:xk,v:vk,d,o:o.out?1:0,wk:wk(),pl,j:{}};TP.stat.deed++;
  /* the servants who stood there carry it (one knowledge record): its id lets the later gossip passes find who was told */
  try{if(typeof knwSee==="function"&&pl&&o.what){const Z0=S.knw;const c=knwSee(pl,kh,o.what,tpAb(X,xk),"tp:"+it.id);if(c&&S.knw)it.iid="i"+wk()+"."+S.knw.n}}catch(e){}
  const seen=[];for(const O of (at?at.eyes:tpEye(pl,kh,X,V))){const k=tpRid(tpK(O));if(it.j[k])continue;it.j[k]=1;const g=tpJudge(O,it,"eye");if(g)seen.push([O,g])}
  tpUp(it);
  T.q.push(it);if(T.q.length>BAL.tp.keep)T.q.splice(0,T.q.length-BAL.tp.keep);
  /* she stood there: what the onlookers made of it, in the Sổ (the number shown = the number applied) */
  if(X===S&&seen.length)tpWit(`Người chứng kiến: ${seen.map(([O,g])=>`${tpName(O)} ${g>0?"+":""}${g}`).join(" · ")}.`,at&&at.seq,o.line);
  return it}catch(e){console.error("tpDeed",e);return null}}
/* REVIEW N3: the onlookers' line goes on the deed's OWN Sổ line — the next log() of this same step (the card / outburst writes its line right
   after the deed is judged); a deed that writes no line gets it as its own line at the next khắc (j95sync) */
function tpWit(s,seq,line){/* her card: the chooser wrote the card's own line («Khiêu khích: thành …») just before go — attach there */try{if(line&&S.logs){for(let i=0;i<Math.min(4,S.logs.length);i++)if(S.logs[i].includes(line)){S.logs[i]+=` <span class="past">${s}</span>`;return}}}catch(e){}
 /* the deed already wrote its line during this step (logSeq moved since the deed started): append to it */try{if(seq!=null&&(S.logSeq||0)>seq&&S.logs&&S.logs.length){S.logs[0]+=` <span class="past">${s}</span>`;return}}catch(e){}
 tpWitFlush();TP.wit=s}
function tpWitFlush(){if(TP.wit){const s=TP.wit;TP.wit=null;try{log(`<span class="past">${s}</span>`)}catch(e){}}}
/* someone who knows tells Hoàng thượng / Thái hậu (a teller who dislikes the doer or loves the victim; odds hashed per deed) */
function tpUp(it){if(it.up)return;const P=BAL.tp,X=tpP(it.x),V=it.v!=null?tpP(it.v):null;if(!X)return;
 for(const k in it.j){const t=tpP(k==="me"||k==="emp"||k==="th"?k:k.slice(1));if(!t||!tpCons(t)||t===X)continue;
  let host=0;try{host=typeof hostility==="function"&&X!==S.emp?hostility(t,X):0}catch(e){}const fr=V&&tpCons(V)&&tpCloseTo(t,V);
  if(host<P.tellHost&&!fr)continue;if(tpHash("up|"+it.id+"|"+k+"|"+(S.tb&&S.tb.seed||0))>=P.tellUp)continue;
  it.up=k;for(const H of [S.emp,S.thDead?null:"th"]){if(!H||H===X)continue;const hk=tpRid(tpK(H));if(it.j[hk])continue;it.j[hk]=1;tpJudge(H,it,"up")}return}}
/* each khắc after the servants' gossip (jagknow knwGossip inside j95sync): the mistresses told since judge it at ×hear */
function tpTick(){if(!tpOn()||!S.tp||!S.tp.q.length)return;const Z=S.knw,n=wk(),P=BAL.tp;S.tp.q=S.tp.q.filter(it=>n-it.wk<=P.days);
 if(!Z||!Z.K)return;for(const it of S.tp.q){if(!it.iid)continue;const xr=tpRid(it.x),vr=it.v!=null?tpRid(it.v):null;for(const id in Z.K){if(it.j[id]||id===xr||id===vr||!(id==="me"||/^v\d+$/.test(id)))continue;/* the doer never judges her own deed, the victim is not an onlooker (same as tpEye) */const K=Z.K[id][it.iid];if(!K)continue;
  it.j[id]=1;const O=id==="me"?S:RV(+id.slice(1));if(!O||(O!==S&&(!O.alive||O.out)))continue;tpJudge(O,it,K[0]==="saw"?"eye":"hear")}tpUp(it)}}
/* ---------- the label an onlooker keeps of her (person card «Tính nết» row, kit tap-word) ---------- */
const TP_LAB={good:["Khẩu xà tâm Phật","Nàng biết ngươi nóng nảy mà lòng dạ tốt: cơn giận của ngươi nàng bỏ qua quá nửa, việc tốt của ngươi nàng nhớ lâu hơn."],
 evil:["Hung hăng độc địa","Nàng cho ngươi nóng nảy mà độc ác: mỗi lần ngươi nổi giận, nàng ghét ngươi nặng hơn và để bụng thêm."]};
function tpLabOf(O){try{const P=O==="th"||O===S.emp?O:O;const M=S.tp&&S.tp.m[tpK(P)+"|me"];return M?tpLab(P,S):""}catch(e){return""}}
/* ---------- hooks ---------- */
/* WHEN and WHERE a deed happens = the moment it starts: a deed that costs a khắc (her cards) or moves people must be judged by who stood there THEN, not by who stands there after the khắc has turned (one rule for every hook) */
/* the deed a reaction is judged as: its own key, else BAL.tp.map, else its jfeel twin (BAL.feel.act.fx use); null = a self-only reaction */
function tpDeedOf(k){const B=BAL.tp;if(B.base[k])return k;if(B.map[k]&&B.base[B.map[k]])return B.map[k];try{const u=((BAL.feel.act||{}).fx||{})[k];if(u&&u.use)return tpDeedOf(u.use)}catch(e){}return null}
window.tpDeedOf=tpDeedOf;
function tpAt(X,V,pk){try{if(!tpOn()||!X)return null;const pl=pk?pk.pl:tpWhere(X);let kh=0;try{kh=pk?pk.kh:j95kh()}catch(e){}return {pl,kh,eyes:tpEye(pl,kh,X,V),seq:S.logSeq||0}}catch(e){return null}}window.tpAt=tpAt;
(function(){
 if(typeof log==="function"){const l0=log;log=function(h){if(TP.wit&&h!=null){h=`${h} <span class="past">${TP.wit}</span>`;TP.wit=null}return l0.apply(this,[h].concat([].slice.call(arguments,1)))}}
 /* outbursts of every kind of person: jemoact's ONE eaDo (window.eaDo = eaDo0 + this hook, internal calls go through it too) and jfeel's feelDo */
 window.tpOut=function(p,r,o,at,feel){try{if((TP.fd&&!feel)||!o||!r||!r.k)return;const d=tpDeedOf(r.k);if(!d)return;
  const V=o.target||null;if(at&&V)at.eyes=at.eyes.filter(O=>O!==V);tpDeed(p,d,V,{out:1,at,what:`${p===S?S.name:tpName(p)} ${String(r.n||"").toLowerCase()}`})}catch(e){console.error("tpOut",e)}};
 if(typeof feelDo==="function"){const f0=feelDo;feelDo=function(p,r){const at=tpAt(p,null);TP.fd++;let o;try{o=f0.apply(this,arguments)}finally{TP.fd--}
  try{if(o&&r){const F=(fB().act.fx||{})[r.k];window.tpOut(p,{k:r.k,n:r.n},o,at,1)}}catch(e){}return o};window.feelDo=feelDo}
 /* the shared social deeds (both sides: NPC agent deeds land through twDo, her talk options call it with paid) */
 if(typeof twDo==="function"){const t0=twDo;twDo=function(a,t,k){const at=BAL.tp.base[k]&&k!=="visit"?tpAt(a,t||null,a===S?TP.pk:null):null;TP.tw++;let r;try{r=t0.apply(this,arguments)}finally{TP.tw--}
  try{if(r&&a&&BAL.tp.base[k]&&k!=="visit")tpDeed(a,k,t||null,{at,what:String(r).replace(/<[^>]+>/g,"")})}catch(e){}return r}}
 /* NPC vents outside twDo (Trút giận cx2, pillow talk, a greeting taunt): the same rule */
 if(typeof agVent==="function"){const v0=agVent;agVent=function(v,t,k){const at=!TP.tw&&v&&t&&(k==="provoke"||k==="vent")?tpAt(v,t):null;const r=v0.apply(this,arguments);try{if(!TP.tw&&v&&t&&(k==="provoke"||k==="vent"))tpDeed(v,"vent",t,{at,what:`${v.name} trút giận lên ${tpName(t)}`})}catch(e){}return r}}
 if(typeof j95sync==="function"){const s0=j95sync;j95sync=function(){tpWitFlush();const r=s0.apply(this,arguments);try{tpTick()}catch(e){console.error("tpTick",e)}return r}}
 /* HER gây sự cards: the reason gate (Option A) + the deed's onlookers */
 /* REVIEW N4: keyed by the card's deed id (tw: j2 talk cards + jtwoway twOpts), never by its name */
 const HOST={provoke:"provoke",vent:"vent",humil:"humil"};
 const gate=(A,v)=>{if(!Array.isArray(A)||!v||!tpOn())return A;return A.map(a=>{const d=a&&HOST[a.tw];if(!d||a.__tp)return a;const g=motiveMe(v,"provoke");
   TP.stat.gate[g.ok?"ok":"no"]++;if(!g.ok)return Object.assign({},a,{__tp:1,lock:true,t:"chưa có cớ"});
   const why=String(g.why||"").replace(/,\s*/g," · ");/* the khắc and place she chooses it in (the card is built in that khắc; its cost turns the khắc before go runs) */let pk=null;try{pk={pl:tpWhere(S),kh:j95kh()}}catch(e){}const b=Object.assign({},a,{__tp:1,x:[a.x,why?`cớ: ${why}`:""].filter(Boolean).join(" · ")});
   /* Hạ nhục runs twDo (hooked above); Khiêu khích / Trút giận change the relation directly → the deed is told here */
   if(d!=="humil"){if(a.go){const g0=a.go;b.go=function(){const at=tpAt(S,v,pk);const r=g0.apply(this,arguments);try{tpDeed(S,d,v,{at,line:a.n,what:`${S.name} ${a.n.toLowerCase()} ${tpName(v)}`})}catch(e){}return r}}
    else if(a.run){const r0=a.run;b.run=function(){const at=tpAt(S,v,pk);const r=r0.apply(this,arguments);try{tpDeed(S,d,v,{at,line:a.n,what:`${S.name} ${a.n.toLowerCase()} ${tpName(v)}`})}catch(e){}return r}}}
   else{/* Hạ nhục: twDo tells it; it uses the khắc she chose it in */const k0=a.go?"go":a.run?"run":null;if(k0){const f0=a[k0];b[k0]=function(){const o=TP.pk;TP.pk=pk;try{return f0.apply(this,arguments)}finally{TP.pk=o}}}}
   return b})};
 if(typeof talkOpts==="function"){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{const v=p&&(p.kind==="hh"?p.ref||queenP():p.kind==="rival"?(p.ref||p.v||null):null);
   if(v&&v!==S)return gate(A,v)}catch(e){console.error(e)}return A}}
 if(typeof topicOpts==="function"){const t1=topicOpts;topicOpts=function(v){const A=t1.apply(this,arguments);try{if(v&&v!==S&&v.rel!=null)return gate(A,v)}catch(e){console.error(e)}return A}}
 /* the label on the onlooker's card: one more word on the existing «Tính nết» row (kit tap-word, kitFactRows; no new part) */
 /* jpcf's info panel (pcfTaste, inside its closure) is built inside pcard: the card's person (window.pcfEnt) is kept while it is built */
 let TP_PC=null;
 if(typeof pcard==="function"){const p0=pcard;pcard=function(o){const k=TP_PC;try{TP_PC=typeof window.pcfEnt==="function"&&o?window.pcfEnt(o):null}catch(x){TP_PC=null}
   try{return p0.apply(this,arguments)}finally{TP_PC=k}}}
 if(typeof kitFactRows==="function"){const k0=kitFactRows;kitFactRows=function(R){try{const e=TP_PC;if(e&&tpOn()&&Array.isArray(R)){const r=R.find(x=>x&&x.l==="Tính nết");
   if(r){const O=e===S.emp?S.emp:(e===S.thO||e.kind==="th")?"th":e.id!=null&&e!==S?e:null;const lab=O?tpLabOf(O):"";
    if(lab){const L=TP_LAB[lab];const w=`xem ngươi: ${kitTapWord(L[0],L[1])}`;R=R.map(x=>x===r?Object.assign({},r,{f:(Array.isArray(r.f)?r.f:[r.f]).concat([w]),c:"t"}):x)}}}}catch(x){}
   return k0.call(this,R)}}
})();
Object.assign(window,{tpDeed,tpJudge,tpTick,tpMoodM,motiveMe,tpLabOf,TP,TP_LAB});
