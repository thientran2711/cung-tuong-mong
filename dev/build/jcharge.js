/* ================= CHARGE-EVIDENCE (review/charge-evidence, Foreman D job D4 option A; owner 26/11 ~05:15Z «D4 A», find odds ~05:35Z, verbatim in OD) =================
   Evidence is kept PER CHARGE (tội danh, BAL.charge.C): each accusation needs its own pieces of its own kind, never a total count.
   1. STORE: holder h → target t → charge c: h.evc[key(t)][c] (the player's too: S.evc). The old total (t.ev / h.evm, jtruth-capped) stays the
      sum of the pieces; chSync keeps both equal — an old save or any direct write of the total is spread onto the target's real deeds
      (newest first, each charge up to its cap) or taken back from the fullest charge.
   2. A PIECE EXISTS ONLY FOR A REAL DEED (law 6a, jtruth): charge cap = the deeds of that charge (DEEDW weights), at least the pieces the
      charge needs once she really did one (one real deed leaves enough traces); no deed of that charge → 0. deedCap = the sum (jtruth reads it).
   3. SEARCH = one roll per piece (chFind, all numbers BAL.charge): base band of the crime + the MASTER's Tâm cơ vs the target's + the sent
      servant (small) + Tai mắt + guard + each earlier miss. Every search road runs inside chSearch(h, servant, fn); outside it a gain is a
      certain piece (caught in the act, a confession, a frame exposed). A miss says so in plain words (never «không có gì sai trái» when
      she did wrong) and makes the next search of that charge easier; someone searching HER is reported by her Tai mắt (two-way).
   4. ACCUSING = one charge whose pieces are full (chReady); the punishment follows that charge (BAL.charge.C[c].pun, one punishment, D1),
      only that charge's pieces are spent, and her notice lists the charge and each piece (punEvTxt). Same rule for every consort (law 1).
   ============================================================================================================================ */
let CHS=null,CHLAST=null,CHX=null,CHLASTC=null,CHSKIP=null;
function chB(){return BAL.charge}
function chC(c){return BAL.charge.C[c]||null}
function chOfDeed(k){return BAL.charge.deed[k]||"uh"}
function chName(c){const C=chC(c);return C?C.n:"tội khác"}
function chNeed(t,c){const C=chC(c);return C?C.need+(t&&rkOf(t)>=7?chB().queenPlus:0):99}
/* band (0..6, the 7 equal odds bands) → the middle odds of that band */
function chBandO(b){const K=BAL.odds.cut,lo=BAL.odds.lo,hi=BAL.odds.hi;b=Math.max(0,Math.min(K.length,b|0));const a=b===0?lo:K[b-1],z=b===K.length?hi:K[b]-1;return Math.round((a+z)/2)}
/* the target's real deeds per charge (memo per day and ledger size) */
const CHM=new Map();
function chDeedMap(t){if(!t)return{};let L=[];try{L=deedsOf(t)}catch(e){}const sig=wk()+":"+L.length+":"+(t.dw||0);const m=CHM.get(t);if(m&&m.sig===sig)return m.map;
 const map={};const ord=[];for(let i=L.length-1;i>=0;i--){const d=L[i];if(!d)continue;const c=chOfDeed(d.k);if(!map[c]){map[c]={w:0,list:[]};ord.push(c)}map[c].w+=(d.w||1);map[c].list.push(d)}
 map._ord=ord;CHM.set(t,{sig,map});if(CHM.size>80)CHM.delete(CHM.keys().next().value);return map}
function chCapC(t,c){const D=chDeedMap(t)[c];if(!D||!D.w)return 0;return Math.max(chNeed(t,c),D.w)}
function chOrd(t){return (chDeedMap(t)._ord||[]).slice()}
function chStore(h,t){h.evc=h.evc||{};const k=key(t);return h.evc[k]||(h.evc[k]={})}
function chMissS(h,t){h.evq=h.evq||{};const k=key(t);return h.evq[k]||(h.evq[k]={})}
function chSum(m){let s=0;for(const c in m)s+=(m[c]||0);return s}
/* keep the pieces equal to the total (old saves, direct writes): spread onto real deeds / take back from the fullest charge */
function chSync(h,t){if(!h||!t||h===t)return{};const m=chStore(h,t);let tot=0;try{tot=evG(h,t)}catch(e){}let s=chSum(m);if(s===tot)return m;
 if(s>tot){while(s>tot){let b=null;for(const c in m)if((m[c]||0)>0&&(b==null||m[c]>m[b]))b=c;if(!b)break;m[b]--;s--;if(!m[b])delete m[b]}return m}
 let x=tot-s;const O=chOrd(t);for(const c of O){while(x>0&&(m[c]||0)<chCapC(t,c)){m[c]=(m[c]||0)+1;x--}}
 if(x>0){const c=O[0]||"uh";m[c]=(m[c]||0)+x}return m}
function chHave(h,t,c){if(!h||!t||h===t)return 0;return chSync(h,t)[c]||0}
/* the charge a new piece (or a search) goes to: the one she is already building (closest to full), else her newest unproven deed */
function chFor(h,t){const m=chSync(h,t);const O=chOrd(t);let best=null,gap=1e9;for(const c of O){const n=m[c]||0,cap=chCapC(t,c);if(n>0&&n<cap){const g=Math.max(0,chNeed(t,c)-n);if(g<gap){gap=g;best=c}}}
 if(best)return best;for(const c of O)if((m[c]||0)<chCapC(t,c))return c;return null}
/* a charge whose pieces are full (heaviest first); c given = only that charge */
function chReady(h,t,c){if(!h||!t||h===t)return null;const m=chSync(h,t);const L=c?[c]:chB().order;for(const x of L)if((m[x]||0)>=chNeed(t,x))return x;return null}
function chOK(h,t,c){return !!chReady(h,t,c)}
/* the charge she is building on t (known to her: she holds a piece of it), for the cards */
function chChase(h,t){const m=chSync(h,t);let best=null,gap=1e9;for(const c of chB().order){const n=m[c]||0;if(n>0&&n<chNeed(t,c)){const g=Math.max(0,chNeed(t,c)-n);if(g<gap||(g===gap&&!best)){gap=g;best=c}}}return best}
function chWho(p,me){return p===S?(me||"ngươi"):p.name}
/* FIND ODDS of ONE search for ONE piece of charge c (owner 26/11 ~05:35Z): every factor in bands of BAL.odds.cut */
function chFind(h,t,c,ag){const B=chB(),C=chC(c)||chC("hd");const W=[];let b=C.band;
 W.push(b<=2?"tội nặng, dấu vết giấu kỹ":b>=5?"tội nhẹ, dấu vết dễ lộ":"tội vừa");
 const g=Math.max(-B.tcCap,Math.min(B.tcCap,Math.trunc(((h.tamco||0)-(t.tamco||0))/B.tcStep)));b+=g;
 if(g>0)W.push(`tâm cơ ${chWho(h)} hơn ${chWho(t,"ngươi")}`);else if(g<0)W.push(`tâm cơ ${chWho(h)} kém ${chWho(t,"ngươi")}, dấu vết bị giấu kỹ`);
 if(ag&&ag!==h){let s=0;try{const r=srk(ag);if(netIs(ag,"sharp")&&r>=B.srvHi)s=1;else if(netIs(ag,"timid")&&r<=B.srvLo)s=-1}catch(e){}b+=s;if(s>0)W.push(`${ag.name} khéo léo`);else if(s<0)W.push(`${ag.name} vụng về`)}
 const n=+h.mat||0;let e=n>=B.matHigh?2:n>=B.matMid?1:0;const pl=(t.staff||[]).some(s=>s&&s.spyFor===key(h));if(pl)e+=B.plantB;e=Math.min(B.eyeCap,e);b+=e;
 if(n>=B.matMid)W.push(`${chWho(h)} nhiều tai mắt`);if(pl)W.push(`có người cài trong cung ${chWho(t,"ngươi")}`);
 if(rkOf(t)>=B.guardRk){b+=B.guard;W.push(`cung ${chWho(t,"ngươi")} canh nghiêm`)}
 const q=Math.min(B.missCap,(h.evq&&h.evq[key(t)]&&h.evq[key(t)][c])||0)*B.missStep;if(q>0){b+=q;W.push(`đã dò ${q/B.missStep} lần chưa thấy, lần này dễ hơn`)}
 b=Math.max(0,Math.min(BAL.odds.cut.length,b));return{o:chBandO(b),band:b,c,why:W}}
/* the plain line on a search card (VANPHONG): the charge she builds if she holds a piece of it, else the middle crime (the card never
   reveals a crime she does not know of) */
function chFindTxt(h,t,ag){if(!h||!t||h===t)return"";const c=chChase(h,t);const F=chFind(h,t,c||"hd",ag);
 const why=F.why.slice(c?0:1);return `Tìm chứng${c?` tội ${chName(c).toLowerCase()}`:""}: ${word(F.o)}${why.length?` (${why.join(", ")})`:""}${c?"":"; tội nặng thì khó tìm hơn, tội nhẹ thì dễ hơn"}; mỗi lần dò hụt, lần sau dễ hơn`}
/* her Tai mắt report someone digging on HER (two-way), once a day per searcher */
function chWarn(h){try{if(!S||h===S)return;const B=chB();const mine=(h.staff||[]).some(s=>s&&s.spyFor==="me");if((+S.mat||0)<B.warnMat&&!mine)return;S.chw=S.chw||{};if(S.chw[h.id]===wk())return;S.chw[h.id]=wk();
 log(`Tai mắt báo: người của ${typeof NM==="function"?NM(h):h.name} đang dò tìm chứng cứ về ngươi.`)}catch(e){}}
/* every search road: fn runs with the search context; CHLAST keeps what was tried (for the result line) */
function chSearch(h,ag,fn){const p=CHS;CHS={h,ag:ag||null,tries:[]};try{return fn()}finally{CHLAST=CHS;CHS=p}}
/* the result words of the last search on t: a miss on a real deed (never «không có gì sai trái» then) */
function chMissTxt(t){const L=CHLAST&&CHLAST.tries||[];const x=L.filter(z=>!z.hit).pop();if(!x)return"";return `Dò kỹ mà chưa tìm ra chứng tội ${chName(x.c).toLowerCase()} (Tìm chứng: ${word(x.o)}); lần sau dễ hơn.`}
function chMissed(){const L=CHLAST&&CHLAST.tries||[];return L.length&&!L.some(z=>z.hit)}
/* ---------- the one evidence write: per charge ---------- */
(function(){const e0=evA;evA=function(h,t,n,c){if(!h||!t||h===t||!n)return e0.apply(this,arguments);const m=chSync(h,t);
 if(n<0&&!c&&CHSKIP&&CHSKIP.a===h&&CHSKIP.t===t){const z=CHSKIP;CHSKIP=null;return evA(h,t,-z.n,z.c)}/* rv: a road that spends a typed count (jaudit «Trình Hoàng hậu») spends the proven charge's pieces instead */
 if(n<0){const d=e0(h,t,n);let x=-d;const L=(c?[c]:[]).concat(Object.keys(m).sort((a,b)=>(m[b]||0)-(m[a]||0)));for(const z of L){while(x>0&&(m[z]||0)>0){m[z]--;x--}if(!m[z])delete m[z]}return d}
 let got=0;const srch=CHS&&CHS.h===h;if(srch&&t===S)chWarn(h);
 for(let i=0;i<n;i++){const cc=c&&(m[c]||0)<chCapC(t,c)?c:chFor(h,t);if(!cc){if(typeof evMiss==="function")evMiss(h,t,n-i);break}
  if(srch){const F=chFind(h,t,cc,CHS.ag);const hit=roll(F.o);CHS.tries.push({c:cc,o:F.o,hit});const q=chMissS(h,t);if(!hit){q[cc]=(q[cc]||0)+1;continue}delete q[cc]}
  CHLASTC={t,c:cc};m[cc]=(m[cc]||0)+1;/* first: a hook inside the write (j78 evdSync → evidenceActs) reads the pieces in step with the total */let d=0;try{d=e0(h,t,1)}catch(x){m[cc]--;throw x}if(!d){m[cc]--;if(!m[cc])delete m[cc];break}got++}
 return got}})();
/* jtruth's cap = the per-charge caps (a real deed of a charge leaves at least the pieces that charge needs) */
(function(){const d0=deedCap;deedCap=function(p){if(!p)return 0;try{const O=chOrd(p);let s=0;for(const c of O)s+=chCapC(p,c);return s}catch(e){return d0.apply(this,arguments)}}})();
/* ---------- accusing: one full charge ---------- */
accOK=function(a,t){return chOK(a,t)&&(rkOf(t)<7||rkOf(a)>=3)};
/* the pieces needed, as shown: the charge she builds (else the lightest) */
accNeed=function(t,h){h=h||S;const c=(h&&t&&h!==t&&chChase(h,t))||"vp";return chNeed(t,c)};
(function(){const o0=oAccuse;oAccuse=function(a,t){const c=chReady(a,t);const n=c?chHave(a,t,c):0,g=evG(a,t);return oddsCl(Math.round(o0.apply(this,arguments)+(n-g)*BAL.charge.accW))/* the charge's own pieces weigh, not the total */}})();
/* the punishment a proven charge brings (one punishment, D1 punish-reason; NPC and player alike) */
function chPunTxt(t,c){const C=chC(c);if(!C)return"bị phạt";const m=typeof punishMonths==="function"?punishMonths():1;
 return C.pun==="light"?`bị phạt bổng ${BAL.charge.fine} lượng`:C.pun==="cam"?`bị cấm túc ${m} tháng`:C.pun==="giang"?`bị giáng một bậc`:rkOf(t)>=5||t.queen?`bị phế vào lãnh cung`:`bị đày vào lãnh cung`}
function chPunish(t,c,why,by){const C=chC(c);if(!C||!t)return;const W=`${why} (tội ${chName(c).toLowerCase()})`;const a=typeof punWho==="function"?punWho(by):by;
 if(C.pun==="light"){ap(t,{bac:-BAL.charge.fine,danh:BAL.charge.danh});if(typeof ducAdd==="function")ducAdd(t,BAL.charge.duc,chName(c).toLowerCase());
  if(c==="vp"&&typeof vpItems==="function"){for(const e of vpItems(t)){if(e.dress){t.dress=null;continue}const i=(t.inv||[]).indexOf(e);if(i>=0){t.inv.splice(i,1);try{if(typeof itGone==="function")itGone(e,"tịch thu")}catch(x){}}}}
  log(`<span class="r">${NMc(t)} bị phạt bổng ${BAL.charge.fine} lượng vì ${punPlain(W)}.</span>`);if(t===S)punNote({kind:"phat",why:W,by:a});return}
 if(C.pun==="cam"){if(c==="il")for(const e of (t.inv||[]).slice()){if(e&&IT[e.k]&&itm(e.k).il&&!((e.by&&e.by!==key(t))||e.gh)){t.inv.splice(t.inv.indexOf(e),1)}}punish(t,W,1);return}
 if(C.pun==="giang"){if(t===S){if(typeof demote==="function"&&S.rank>0)demote(S,punPlain(W));else punish(S,W,1);return}
  if(rkOf(t)<=0||punTwice(t)){punish(t,W,1);return}const r0=rkOf(t);seatPut(t,punDown(t));punMark(t,r0);log(`<span class="g">${t.name} ${punPlain(W)}, bị giáng xuống ${RANKS[rkOf(t)].n}.</span>`);return}
 /* cold */
 if(t===S){if(!S.out&&!S.dead)cold(`Ngươi ${punPlain(W)}`,a);return}
 if(t.out||t.alive===false)return;if(a&&a!==t)t.coldBy=key(a);if(t.queen){t.queen=false;t.rank=6}t.out=true;t.coldWk=punNow();log(`<span class="g">${t.name} ${punPlain(W)}, bị ${rkOf(t)>=5?"phế":"đày"} vào lãnh cung.</span>`)}
/* the accusation act itself (j8 «Tố giác»): the full charge only; its pieces are spent, the others kept */
(function(){const A=ACT.accuse;if(!A)return;const f0=A.f;
 Object.defineProperty(A,"x",{configurable:true,get(){return `cần đủ chứng cứ của một tội (mỗi tội một số chứng riêng: ${chB().order.slice().reverse().map(c=>`${chName(c)} ${chC(c).need}`).join(", ")}; Hoàng hậu thêm ${chB().queenPlus} và phẩm Tần trở lên)`}});
 A.f=function(a,t){const c=chReady(a,t);if(!c)return f0.apply(this,arguments);const o=oAccuse(a,t);const n=chHave(a,t,c);const px=CHX;CHX={a,t,c,n};
  try{evA(a,t,-n,c);
   if(aRoll(o,a)){econPayWin(a,"accuse",t,0);const r=`${NMc(a)} tố giác ${NM(t)} tội ${chName(c).toLowerCase()} trước ${judgeName(t)}: <span class="${t===S?"r":"g"}">thành</span>. `;ap(a,{danh:BAL.eff.j8.accuseDanh});if(empGive(a,BAL.tw.accBestow,"accuse"))bestow(a,"accuse");if(rkOf(t)>=7)a.seatBan=S.turn+12;chPunish(t,c,"bị tố giác, chứng cứ rành rành",a);return r}
   ap(a,{danh:BAL.eff.j8.accuseFailDanh});relAdd(a,t,BAL.eff.j8.f_6);if(rkOf(t)>=7)punish(a,"tố hụt Hoàng hậu, phạm thượng",2);return `${NMc(a)} tố giác ${NM(t)} tội ${chName(c).toLowerCase()} không thành; chứng cứ bị hủy. `}
  finally{CHX=px}}})();
/* Hoàng hậu «Xử tội» (j8 judge, hers and an NPC queen's): by the full charge */
(function(){const j0=judge;judge=function(q,p){const c=chReady(q,p);if(!c)return j0.apply(this,arguments);const n=chHave(q,p,c);const px=CHX;CHX={a:q,t:p,c,n};
 try{const r=`${q===S?"Ngươi, ngôi Hoàng hậu,":"Hoàng hậu "+q.name} xét tội ${NM(p)}: ${chName(c).toLowerCase()}, theo ${n} chứng cứ. `;evA(q,p,-n,c);relAdd(q,p,BAL.eff.j8.judge);chPunish(p,c,"bị Hoàng hậu xử tội",q);return r}finally{CHX=px}}})();
/* «Trình Hoàng hậu» (rv: the live executor is jaudit T.f → jrcv rcvJudge — her card when she is the Hoàng hậu, the same options for an NPC queen):
   one full charge — only its pieces are spent, and «Xét tội theo chứng cứ» punishes by that charge (as Tố giác / Xử tội), even when she decides later */
(function(){const T=ACT.trinhhh;if(!T)return;const f0=T.f;T.f=function(a,t){const c=chReady(a,t);if(!c){if(t)t.chTr=null;return f0.apply(this,arguments)}
 const n=chHave(a,t,c);t.chTr={a:key(a),c,n};const ps=CHSKIP;CHSKIP={a,t,c,n};try{return f0.apply(this,arguments)}finally{CHSKIP=ps}}})();
(function(){const p0=punish;punish=function(p,why,sev){if(p&&typeof p==="object"&&p.chTr&&why==="bị Hoàng hậu xét tội theo chứng cứ"){const z=p.chTr;p.chTr=null;
 const a=byKey(z.a);const px=CHX;CHX={a,t:p,c:z.c,n:z.n};try{chPunish(p,z.c,why,a||queenP())/* AI TỐ = the one who presented the proof */}finally{CHX=px}return}return p0.apply(this,arguments)}})();
/* WHICH EVIDENCE in her notice: the charge and each piece behind it (jpun punEvTxt) */
(function(){if(typeof punEvTxt!=="function")return;const p0=punEvTxt;punEvTxt=function(a,t){t=t||S;if(!a||!CHX||CHX.a!==a||CHX.t!==t)return p0.apply(this,arguments);
 const D=chDeedMap(t)[CHX.c];const DL=((D&&D.list)||[]).filter(d=>d&&d.x);const PK=(chC(CHX.c)||{}).pk||[];const L=[];/* rv: one line per piece, «deed · kind» (table A rule 4) */
 for(let i=0;i<Math.min(CHX.n,BAL.pun.evShow)&&DL.length;i++)L.push(`${DL[i%DL.length].x}${PK.length?" · "+PK[i%PK.length]:""}`)
 return `tội ${chName(CHX.c).toLowerCase()}, ${CHX.n} món chứng${L.length?": "+L.join("; "):""}`}})();
if(typeof PUNK==="object")PUNK.phat="Phạt bổng";
(function(){if(typeof punRows!=="function")return;const r0=punRows;punRows=function(o){const R=r0.apply(this,arguments);if(o&&o.kind==="phat")R.push(["Hình phạt",punEsc(`Phạt bổng ${BAL.charge.fine} lượng, Danh ${balSg(BAL.charge.danh)}`)]);return R}})();
/* ---------- the evidence lines for the cards ---------- */
/* «Tư thông 2/3 · Vượt phẩm 1/1» — every charge she holds a piece of */
function chLine(h,t){if(!h||!t||h===t)return"";const m=chSync(h,t);return chB().order.filter(c=>(m[c]||0)>0).map(c=>`${chName(c)} ${m[c]}/${chNeed(t,c)}`).join(" · ")}
function chNeedTxt(h,t,c){const L=chLine(h,t);if(c){return `cần ${chNeed(t,c)} chứng cứ tội ${chName(c).toLowerCase()} (có ${chHave(h,t,c)})`}
 return L?`chưa đủ chứng một tội: ${L}`:`chưa có chứng cứ về ${chWho(t,"ngươi")}`}
kitWhyEv=function(a,n){return a?chNeedTxt(S,a):`thiếu chứng cứ`};
/* «Tố tội thật» (j30): a full charge among the plain crimes she can be shown to have (vượt phẩm, đồ cấm, bày mưu) */
function chTocao(h,t){for(const c of ["uh","il","vp"])if(chReady(h,t,c))return c;return null}
/* the deed behind the piece the last search found (the result line names the right wrong) */
function chHitDeed(t){const x=(CHLAST&&CHLAST.tries||[]).filter(z=>z.hit).pop();if(!x)return null;const D=chDeedMap(t)[x.c];return D&&D.list[0]||null}
/* evidence card rows (kit fact rows): one row per charge she holds a piece of — pieces / need, and the next search's odds word */
function chRows(h,t){if(!h||!t||h===t)return[];const m=chSync(h,t);const ag=h===S?S.maid:null;return chB().order.filter(c=>(m[c]||0)>0).map(c=>{const need=chNeed(t,c),n=m[c];
 return [chName(c),n>=need?`${n}/${need}, đủ để tố`:`${n}/${need} · Tìm chứng: ${word(chFind(h,t,c,ag).o)}`]})}
/* the short word for a picker sub-line, and the one plain paragraph that says what decides it (the search dialog) */
function chFindWord(h,t,ag){if(!h||!t||h===t)return"";const c=chChase(h,t);return `Tìm chứng: ${word(chFind(h,t,c||"hd",ag).o)}`}
function chHowTxt(h,ag){const B=chB(),n=+h.mat||0;return `«Tìm chứng» là may rủi của một lần dò: có tìm ra một món chứng cứ hay không. Tội nhẹ dấu vết dễ lộ, tội nặng giấu kỹ; ${chWho(h,"Ngươi")} có Tâm cơ ${h.tamco||0}: hơn người bị dò thì dễ tìm, kém thì khó tìm; ${chWho(h)} có ${n} tai mắt (từ ${B.matMid} người trở lên thì dễ hơn), cài được người trong cung nàng thì dễ hơn nữa; cung từ ${RANKS[B.guardRk].n} trở lên canh nghiêm hơn; ${ag&&ag.name?ag.name+" chỉ giúp được chút ít; ":""}mỗi lần dò hụt, lần sau dễ hơn.`}
/* the evidence record (j78 S.evd «proves») names a real deed OF THE CHARGE the piece was written to */
(function(){if(typeof j78proof!=="function")return;const p0=j78proof;j78proof=function(v){try{if(CHLASTC&&CHLASTC.t===v){const D=chDeedMap(v)[CHLASTC.c];S.evd=S.evd||{};
 const PK=(chC(CHLASTC.c)||{}).pk||[];const i=Math.max(0,chHave(S,v,CHLASTC.c)-1);const kd=PK.length?` · ${PK[i%PK.length]}`:"";/* rv: each piece names its kind (table A rule 4), never the same line twice */
 const have=new Set((S.evd[v.id]||[]).map(e=>e.ref).filter(Boolean));for(const d of (D&&D.list)||[]){const ref="td:"+(d.at==null?"o":d.at+":"+d.k+":"+(d.t||""));if(!have.has(ref))return{proves:`${j78Who(v)} ${d.x}${kd}`,ref,aim:d.t}}
 const d=D&&D.list[0];if(d)return{proves:`${j78Who(v)} ${d.x}${kd}`,ref:"tc:"+CHLASTC.c+":"+((S.evd[v.id]||[]).length),aim:d.t}}}catch(e){}return p0.apply(this,arguments)}})();
