/* ================= PUNISH-REASON (review/punish-reason, Foreman D job D1; owner 26/11 ~01:25Z + ~04:15Z, verbatim in OD) =================
   ONE helper set for every punishment road (j8 fall / punish / deathSentence, j30 demote, j14 cold / restore, j4 father, j67 / jreign NPC
   drops, every release from lãnh cung, hers and an NPC's — law 1):
   1. ONE RANK PER PUNISHMENT: punDown(p) = exactly one rank lower; the seat cap never pushes the punished one further (jseat settle
      leaves p.punR alone while she sits on that rank; the full rank still takes nobody new).
   2. NEVER TWO AT ONCE: a second rank punishment within BAL.pun.gapDays days becomes cấm túc (punTwice / punLight); lãnh cung after a
      same-day demotion keeps the rank she had before it (cold reads punFromToday), so a stay + pardon is still one rank in all.
   3. LÃNH CUNG STAY: nobody leaves before BAL.pun.coldMinDays days (coldStayOk). Her early pardon waits (S.coldPend) and comes on the
      first day the stay is served (punDay, each endTurn); an NPC's early release simply does not happen yet.
   4. REASON FIRST: every punishment of her shows WHO / WHY / WHICH EVIDENCE / WHAT PUNISHMENT as kit fact rows (kitPanel kind
      "notice", KIT §8 / §9) in the same notice that announces it; the j93 gloom scene reads the same reason (S.punLast). */
function punNow(){try{return wk()}catch(e){return 0}}
/* exactly one rank lower (0 = Đáp ứng is the floor); the Hoàng hậu seat (7) steps to Hoàng quý phi */
function punDown(p){return Math.max(0,Math.min(6,rkOf(p)-1))}
/* stamp the punished one: the rank she was punished to (jseat skips her while she holds it) and the day */
function punMark(p,from){p.punR=rkOf(p);p.punWk=punNow();p.punFrom=from}
/* a rank punishment already fell on p within BAL.pun.gapDays days */
function punTwice(p){return p&&p.punWk!=null&&punNow()-p.punWk<BAL.pun.gapDays}
/* the rank p held before a demotion today (lãnh cung after it keeps that rank as the one to be restored), else her rank now */
function punFromToday(p){return punTwice(p)&&p.punFrom!=null?p.punFrom:rkOf(p)}
/* the light road when a second rank punishment would fall the same day: cấm túc instead (never a second rank) */
/* punPlus(p,fx,f): a side penalty (Danh / Sủng …) that belongs to the punishment f() brings on p — ONE penalty (row 12 r3, law 11 «no penalty split»):
   the jaccw gate holds fx together with the core when it holds the core, and pays it just before the core when it falls now. Fallback: fx, then f(). */
function punPlus(p,fx,f){if(p&&fx)ap(p,fx);return f()}
function punHeldLast(){return false}
function punLight(p,why,by){const m=typeof punishMonths==="function"?punishMonths():1;p.confined=Math.max(p.confined||0,m);
 const t=`${NMc(p)} vừa chịu phạt hôm nay; lần này chỉ bị cấm túc ${m} tháng vì ${punPlain(why)}.`;
 if(p===S){log(`<span class="r">${t}</span>`);punNote({kind:"camtuc",why,by,m})}else log(t);return t}
function punPlain(why){return String(why||"").replace(/<[^>]+>/g,"").replace(/^Ngươi\s+/,"").trim()}
/* WHO: the doer of the act now running (ACTX.a), else the one named by the caller; null = no accuser */
function punWho(by){try{if(by&&by!==S)return by;if(typeof ACTX!=="undefined"&&ACTX&&ACTX.a&&ACTX.a!==S)return ACTX.a}catch(e){}return null}
function punWhoTxt(a){if(!a)return"";const r=rkOf(a);return `${a.name}${r>=7?" (Hoàng hậu)":RANKS[r]?` (${RANKS[r].n})`:""}`}
/* WHICH EVIDENCE: the pieces the accuser holds on her (evG) named by the real wrongs behind them (jtruth deedsOf, heaviest first; each
   wrong covers as many pieces as its weight), plus things found in her chest that she did not put there; nothing typed */
function punEvTxt(a,t){t=t||S;if(!a)return"";let n=0;try{n=evG(a,t)}catch(e){}const L=[];
 if(n>0&&typeof deedsOf==="function"){let left=n;for(const d of deedsOf(t).slice().sort((x,y)=>(y.w||1)-(x.w||1))){if(left<=0||L.length>=BAL.pun.evShow)break;if(d&&d.x&&!L.includes(d.x)){L.push(d.x);left-=(d.w||1)}}}
 const pl=(t.inv||[]).filter(e=>e&&IT[e.k]&&((e.by&&e.by!==key(t))||e.gh)).map(e=>(IT[e.k]||{}).n).filter(Boolean);
 if(pl.length)L.push(`tìm thấy trong rương: ${pl.slice(0,BAL.pun.evShow).join(", ")}`);
 if(!n&&!pl.length)return "không có chứng cứ, chỉ có lời tố";
 return `${n?`${n} món`:""}${n&&L.length?": ":""}${L.join("; ")}`}
const PUNK={giang:"Giáng một bậc",cold:"Đày vào lãnh cung",camtuc:"Cấm túc",chet:"Ban chết",nhe:"Phạt nhẹ"};
/* the ONE reason notice for her (kit notice, fact rows); S.punLast feeds the j93 gloom line */
function punRows(o){const a=punWho(o.by),R=[];const w=punPlain(o.why);/* the edict names the accuser: she now knows her name (k61, no «???» beside the row) */try{if(a&&typeof k61Know==="function")k61Know(a,"",true,2)}catch(e){}
 if(a)R.push(["Ai tố",punEsc(punWhoTxt(a))]);else R.push(["Ai xử",punEsc(o.auth||"Hoàng thượng, theo cung quy")]);
 R.push(["Vì sao",punEsc(w||"phạm cung quy")]);
 if(a)R.push(["Chứng cứ",punEsc(punEvTxt(a,S))]);
 if(o.kind==="giang"&&o.from!=null)R.push(["Hình phạt",punEsc(`${PUNK.giang}: từ ${RANKS[o.from].n} xuống ${RANKS[o.to].n}`)]);
 else if(o.kind==="camtuc")R.push(["Hình phạt",punEsc(`${PUNK.camtuc} ${o.m} tháng`)]);
 else if(o.kind==="nhe")R.push(["Hình phạt",punEsc(o.c>0?`Khất bổng ${o.c} tháng`:"Cảnh cáo")]);/* merge home-way (BAL.punW nhẹ, sev 0): the light punishment shows its reason too (D1) */
 else if(o.kind==="cold")R.push(["Hình phạt",punEsc(o.title!=null&&o.from!=null?`${punColdTxt(o.from,o.title,o.x).replace(/^bị /,"").replace(/^./,c=>c.toUpperCase())}, ở ít nhất ${BAL.pun.coldMinDays} ngày mới được xét tha`:`${PUNK.cold}, ở ít nhất ${BAL.pun.coldMinDays} ngày mới được xét tha`)]);
 else if(o.kind==="phat")R.push(["Hình phạt",punEsc(`Phạt bổng ${BAL.charge.fine} lượng, Danh ${balSg(BAL.charge.danh)}`)]);
 punTierRows(o,R);
 S.punLast={why:w,who:a?a.name:"",kind:o.kind,wk:punNow()};return R}
/* PUNISH-TIER result rows (kit fact rows, «không» rows kept): Mức tội · Giáng phẩm · Lãnh cung — the same three rows on every punishment of her */
const PUNTK={nhe:"nhe",phat:"nhe",camtuc:"nhe",giang:"vua",cold:"nang",chet:"tu"};
function punTierRows(o,R){const x=o.x||(PUNT&&PUNT.x)||PUNTK[o.kind]||"nhe";const rn=k=>k>=7?"Hoàng hậu":RANKS[Math.max(0,k|0)].n;
 R.splice(R.findIndex(r=>r[0]==="Hình phạt")>=0?R.findIndex(r=>r[0]==="Hình phạt"):R.length,0,["Mức tội",punEsc(punTierN(x))]);
 let g="không";if(o.kind==="giang"&&o.from!=null)g=`từ ${rn(o.from)} xuống ${rn(o.to)}`;else if(o.kind==="cold"&&o.from!=null&&o.title!=null&&o.title<o.from)g=o.life?`phế vị (từ ${rn(o.from)})`:`từ ${rn(o.from)} xuống ${rn(o.title)}`;
 R.push(["Giáng phẩm",punEsc(g)]);R.push(["Lãnh cung",punEsc(o.kind==="cold"?(o.life?"có, chung thân":o.title!=null&&o.title>0?`có, vẫn mang phẩm ${rn(o.title)}`:"có"):"không")]);return R}
function punNote(o){if(!S||S.dead)return;if(window.__punQuiet)return;/* review/place-close: the caller says the punishment in its own kit notice (chip + «Tin báo»), no panel (owner: no dialog for overstay) */
 const R=punRows(o);
 if(typeof kitPanel!=="function"){Q.push({t:PUNK[o.kind]||"Bị phạt",h:`<p>${R.map(r=>`${r[0]}: ${r[1]}`).join("<br>")}</p>`,btn:"Đã rõ"});return}
 kitPanel({kind:"notice",rk:o.kind==="giang"?1:0/* rank screen (j93 kmRankWait) */,title:o.kind==="giang"?"Bị giáng phẩm":PUNK[o.kind]||"Bị phạt",sub:typeof when==="function"?when():"",subject:typeof pMe==="function"?pMe():null/* PUNISH-TIER-2 (one family with j14 Lãnh cung): the left figure is HER, the one punished; the accuser is named in the «Ai tố» row */,sections:[{h:"",rows:R}],btn:"Đã rõ"})}
/* LÃNH CUNG STAY: p may leave only after BAL.pun.coldMinDays days inside (an NPC sent there by any road is stamped lazily) */
function coldStamp(p){if(!p)return;const inn=p===S?!!S.out:!!p.out;if(inn){if(p.coldWk==null)p.coldWk=punNow();if(p!==S&&p.coldR==null)p.coldR=coldRankIn(p)}else{if(p.coldWk!=null)p.coldWk=null;if(p!==S&&p.coldR!=null)p.coldR=null}}
/* the rank an NPC held when she went in (Hoàng hậu = 7; a demotion earlier the same day is folded in, like her S.coldRank) — reviewer r1, law 1 */
function coldRankIn(p){return p.queen?7:punFromToday(p)}
function coldStayOk(p){if(!p)return true;coldStamp(p);if(p===S?!S.out:!p.out)return true;return punNow()-p.coldWk>=BAL.pun.coldMinDays}
function coldDaysLeft(p){coldStamp(p);return p.coldWk==null?0:Math.max(0,BAL.pun.coldMinDays-(punNow()-p.coldWk))}
/* each day: stamp every NPC who entered lãnh cung by any road; her pardon that waited comes once the stay is served */
function punDay(){if(!S||S.dead)return;try{for(const v of (rivals||[]))if(v&&v.alive!==false)coldStamp(v);coldStamp(S);
 if(S.out&&S.coldPend&&coldStayOk(S)){const P=S.coldPend;S.coldPend=null;restore(P.full,P.why)}else if(!S.out)S.coldPend=null}catch(e){console.error("punDay",e)}}
(function(){if(typeof endTurn!=="function")return;const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{punDay()}catch(e){console.error("punDay",e)}return r}})();
/* an NPC leaves lãnh cung (every NPC release road): one rank below the rank she held when she went in, never Đáp ứng from any height */
function coldFree(v,full){const T=coldTitleOf(v),from=v.coldFrom!=null?v.coldFrom:(v.coldR!=null?v.coldR:(v.queen?7:(v.rank|0)));const want=full?Math.max(from,T==null?0:T):(T==null?from:T);
 if(v.queen)v.queen=false;v.out=false;v.coldWk=null;v.coldR=null;v.coldFrom=null;v.coldX=null;v.coldLife=0;const r=coldBack(v,want);if(r>=7){v.rank=6;v.queen=true}else v.rank=r;return rkOf(v)}
/* ================= PUNISH-TIER (review/punish-tier, owner OD 26/11 ~20:35Z + MAIN recs, verbatim in OD; numbers BAL.charge.tier / tu / rep / conf) =================
   The CRIME decides the penalty, the SAME for every rank; the evidence only decides whether it sticks.
   nhẹ = phạt bổng / cấm túc ngắn (no rank change) · vừa = giáng 1 bậc (seat frees) · nặng = giáng 1 bậc + lãnh cung (seat frees: holders /
   liveRivals skip her, her own S.rank is 0 while out) · tử tội = ban chết, or commuted (punTuSpare) to phế vị + lãnh cung chung thân.
   Leaving lãnh cung (her and an NPC alike, law 1): minh oan = the rank before the conviction, a pardon / đại xá / plea = the title she kept
   inside; that rank when its seat is free, else BAL.pun.oneBelow lower. Chung thân: only minh oan opens the door. */
function punTierN(x){const T=BAL.charge.tier[x];return T?T.n:""}
/* one step lighter / heavier on the ladder (tự thú / a proven lie, BAL.charge.conf) */
function punStep(x,d){const O=BAL.charge.tierOrd;const i=Math.max(0,Math.min(O.length-1,O.indexOf(x)+d));return O[i]}
/* the title she keeps inside lãnh cung from rank r (Hoàng hậu = 7): nặng = one rank lower (a demotion earlier the same day already took it:
   cur, D1 «one rank per punishment»); "keep" (no crime: bị bỏ quên) = her rank now; "phe" (tử tội commuted) = phế vị (0) */
function coldTitle(r,x,cur){r=Math.max(0,Math.min(7,r|0));cur=cur==null?r:Math.max(0,Math.min(7,cur|0));if(x==="keep")return cur;if(x==="phe")return 0;return Math.max(0,Math.min(6,r-1,cur>=r?r-1:cur))}
/* the title p holds while inside (null = not in lãnh cung); an old save / an old road (no coldFrom) is read as a nặng stay */
function coldTitleOf(p){if(!p)return null;if(p===S){if(!S.out)return null;return S.coldFrom!=null?(S.coldRank|0):coldTitle(S.coldRank|0,"nang")}
 if(!p.out)return null;if(p.coldFrom!=null)return p.coldR!=null?p.coldR:(p.rank|0);return coldTitle(p.coldR!=null?p.coldR:(p.queen?7:(p.rank|0)),"nang")}
/* PUNISH-TIER-9 (RV-184 FAIL 1, law 6 + 1 + 11): the ONE plate word of someone inside lãnh cung, her and an NPC alike.
   «Phế phi» only for phế vị (chung thân: tử tội commuted) or an old save / old road with no kept title (no coldFrom); a nặng / keep stay shows the title kept.
   null = not in lãnh cung (the caller prints the usual rank). Read by every name plate that used `out?"Phế phi"` (j61 j79 j95 jhc jksize jhaohuu jly). */
function outTitleN(p){try{if(!p||!(p===S?S.out:p.out))return null;if(coldLife(p))return"Phế phi";if((p===S?S.coldFrom:p.coldFrom)==null)return"Phế phi";return coldTitleTxt(p)||"Phế phi"}catch(e){return"Phế phi"}}
function coldTitleTxt(p){const t=coldTitleOf(p);if(t==null)return"";return t>=7?"Hoàng hậu":RANKS[Math.max(0,t)].n}
/* the rank she comes back to: the one owed when its seat is free (the Hoàng hậu seat too), else BAL.pun.oneBelow lower — one step, never more */
function coldBack(p,want){want=Math.max(0,Math.min(7,want|0));if(want<=0)return 0;if(seatHas(p,want))return want;return Math.max(0,Math.min(6,want-BAL.pun.oneBelow))}
/* chung thân (tử tội commuted): no pardon, đại xá or plea opens the door; minh oan (full) still does */
function coldLife(p){return !!(p&&(p===S?S.coldLife:p.coldLife))}
(function(){const k0=coldStayOk;coldStayOk=function(p,full){if(coldLife(p)&&!full)return false;return k0.apply(this,arguments)}})();
/* the weight context of the punishment running now (her notice rows read it) */
let PUNT=null;
/* lãnh cung: x "nang" = one rank down + inside · "phe" = phế vị + chung thân · "keep" = no crime, title kept (her: j14 cold; an NPC: the same state) */
function punCold(p,x,why,by,quiet){x=x==="keep"||x==="phe"?x:"nang";const a=punWho(by);const r0=punFromToday(p),r=p.queen?7:r0,title=coldTitle(r,x,rkOf(p));
 if(p===S){if(S.out||S.dead)return;const pt=PUNT;PUNT={x:x==="phe"?"tu":x,title,from:r,life:x==="phe"};try{cold(/^Ngươi/.test(why)?why:`Ngươi ${punPlain(why)}`,a,x)}finally{PUNT=pt}return}
 if(p.out||p.alive===false)return;if(a&&a!==p)p.coldBy=key(a);if(p.queen)p.queen=false;p.coldFrom=r;p.rank=Math.min(6,title);p.coldR=title;p.coldX=x;p.coldLife=x==="phe"?1:0;p.out=true;p.coldWk=punNow();punMark(p,r);
 if(!quiet)log(`<span class="g">${p.name} ${punPlain(why)}, ${punColdTxt(r,title,x)}.</span>`)}
function punColdTxt(r,title,x){const rn=k=>k>=7?"Hoàng hậu":RANKS[k].n;return x==="phe"?"được tha tội chết, bị phế vị, đày lãnh cung chung thân":title<r?`bị giáng xuống ${rn(title)} rồi đày vào lãnh cung`:`bị đày vào lãnh cung`}
/* VỪA: one rank down (her and an NPC; Đáp ứng / a second rank punishment the same day = cấm túc, D1) */
function punGiang(p,why,by){if(p===S){if(S.out||S.dead)return;const a=punWho(by);const pt=PUNT;PUNT=Object.assign({},pt||{},{x:(pt&&pt.x)||"vua"});try{if(S.rank<=0){punish(S,why,1);return}if(punTwice(S)){punLight(S,why,a);return}
  const r0=S.rank;S.rank=punDown(S);punMark(S,r0);S.lastPromo=S.turn;log(`<span class="r">Ngươi ${punPlain(why)}, bị giáng xuống ${RANKS[S.rank].n}.</span>`);punNote({kind:"giang",why,by:a,from:r0,to:S.rank})}finally{PUNT=pt}return}
 if(p.out||p.alive===false)return;if(rkOf(p)<=0||punTwice(p)){punish(p,why,1);return}const r0=rkOf(p);seatPut(p,punDown(p));punMark(p,r0);p.lastPromo=S.turn;
 log(`<span class="g">${p.name} ${punPlain(why)}, bị giáng xuống ${RANKS[rkOf(p)].n}.</span>`)}
/* TỬ TỘI commuted: the Emperor spares her life (BAL.charge.tu.spare: Sủng + who pleads — Thái hậu, Hoàng hậu, family) */
function punTuSpare(p){const B=BAL.charge.tu.spare;let o=B.base+(p.sung||0)/B.sungD;const W=[];
 if((p.th||0)>=B.thMin){o+=B.th;W.push("Thái hậu xin tha")}
 try{const q=queenP();if(q&&q!==p&&aff(q,p)>=netTh(q,"than")){o+=B.hh;W.push(`Hoàng hậu ${q.name} xin tha`)}}catch(e){}
 if((p.dad||0)>=B.dadMin){o+=B.dad;W.push("nhà mẹ đẻ dâng sớ xin tha")}
 return {o:Math.round(typeof oddsCl==="function"?oddsCl(o):o),why:W}}
/* PREGNANT (待产): a vừa / nặng / tử penalty waits until after the birth (j8 birthP), her and an NPC */
function punPreg(p){return !!(p&&p.preg>0&&!p.fake&&!(p===S&&S.dead)&&p.alive!==false)}
function punDefer(p,x,why,by){p.punDefer={x,why,by:by&&by!==p?key(by):null,at:punNow()};const t=`${p===S?"Ngươi":p.name} đang mang long thai: hình phạt (${punTierN(x)}) hoãn đến sau khi sinh.`;log(`<span class="r">${t}</span>`);
 if(p===S&&typeof kitPanel==="function")kitPanel({kind:"notice",title:"Hoãn hình phạt",btn:"Đã rõ",sections:[{h:"",rows:[["Vì sao",punEsc(punPlain(why))],["Mức tội",punEsc(punTierN(x))],["Hình phạt",punEsc(punTierTxt(p,x))],["Khi nào",punEsc("sau khi sinh")]]}]})}
(function(){if(typeof birthP!=="function")return;const b0=birthP;birthP=function(p){const r=b0.apply(this,arguments);try{const d=p&&p.punDefer;if(d&&!punPreg(p)){p.punDefer=null;punTier(p,d.x,d.why,d.by?byKey(d.by):null,true)}}catch(e){console.error("punDefer",e)}return r}})();
/* the ONE penalty of a crime of weight x (vừa / nặng / tử tội; nhẹ stays with its road: phạt bổng or cấm túc ngắn) */
function punTier(p,x,why,by,now){if(!p)return;if(!now&&x!=="nhe"&&punPreg(p))return punDefer(p,x,why,by);
 if(x==="vua")return punGiang(p,why,by);if(x==="nang")return punCold(p,"nang",why,by);
 if(x==="tu"){const sp=punTuSpare(p);if(roll(sp.o))return punCold(p,"phe",`${punPlain(why)}${sp.why.length?` (${sp.why.join(", ")})`:""}`,by);
  const pt=PUNT;PUNT={x:"tu"};try{deathSentence(p,/^Bị ban chết/.test(why)?why:`Bị ban chết vì ${punPlain(why)}`)}finally{PUNT=pt}return}
 return punish(p,why,1)}
/* the plain words of the penalty a weight brings on p (cards, warnings: the same rule as punTier) */
function punTierTxt(p,x){const r=p?(p.queen?7:rkOf(p)):0;const m=typeof punishMonths==="function"?punishMonths():1;
 if(x==="vua")return r>0?"bị giáng một bậc":`bị cấm túc ${m} tháng`;if(x==="nang")return r>0?"bị giáng một bậc và đày vào lãnh cung":"bị đày vào lãnh cung";
 if(x==="tu")return "bị ban chết, hoặc được tha chết mà phế vị, đày lãnh cung chung thân";return `bị cấm túc ${m} tháng`}
/* WHY an ally pardons her (Hoàng hậu «Ân xá», law 1 same words for an NPC): her standing with the one who pardons, read from the one relation core */
function punAllyWhy(a,p){let n=0;try{n=Math.round(aff(a,p))}catch(e){}const t=p===S?"ngươi":p.name;/* reviewer r1: the words follow the real standing from the one relation core (netTh «thân» line; never «quý» at thiện cảm < 0) */let th=Infinity;try{th=netTh(a,"than")}catch(e){}return n>=th?`nàng quý ${t} (thiện cảm ${n})`:n>=0?`nàng mở lòng khoan dung với ${t} (thiện cảm ${n})`:`nàng giữ đức khoan dung của Trung cung, dù không ưa ${t} (thiện cảm ${n})`}
/* ONE RANK: the seat cap never pushes the punished one further (jseat settle). While she sits on the rank she was punished to, the settle
   pass does not pick her; if that rank is over its cap, the standing seat rule moves its newest other holder instead («ghế đã đủ người»,
   jseat, with its own reason line), so the cap still holds at every month end (dev/test/seatcap-active.js) */
(function(){if(typeof seatKept!=="function")return;const k0=seatKept;seatKept=function(p){try{if(p&&p!==S&&p.punR!=null){if(p.punR===rkOf(p)&&!p.out&&p.alive!==false/* until her rank changes again */)return true;p.punR=null}}catch(e){}return k0.apply(this,arguments)}})();
function punEsc(s){return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
