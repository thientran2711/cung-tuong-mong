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
 else if(o.kind==="cold")R.push(["Hình phạt",punEsc(`${PUNK.cold}, ở ít nhất ${BAL.pun.coldMinDays} ngày mới được xét tha`)]);
 S.punLast={why:w,who:a?a.name:"",kind:o.kind,wk:punNow()};return R}
function punNote(o){if(!S||S.dead)return;const R=punRows(o);const a=punWho(o.by);
 if(typeof kitPanel!=="function"){Q.push({t:PUNK[o.kind]||"Bị phạt",h:`<p>${R.map(r=>`${r[0]}: ${r[1]}`).join("<br>")}</p>`,btn:"Đã rõ"});return}
 kitPanel({kind:"notice",title:o.kind==="giang"?"Bị giáng phẩm":PUNK[o.kind]||"Bị phạt",sub:typeof when==="function"?when():"",subject:a||null,sections:[{h:"",rows:R}],btn:"Đã rõ"})}
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
function coldFree(v){const r=v.coldR!=null?v.coldR:(v.queen?7:(v.rank|0));if(v.queen)v.queen=false;v.out=false;v.rank=BAL.pun.npcOneBelow?Math.max(0,Math.min(6,r-1)):0/* PENDING OWNER (law 16): false = the old rule, an NPC always comes back as Đáp ứng */;v.coldWk=null;v.coldR=null;return v.rank}
/* WHY an ally pardons her (Hoàng hậu «Ân xá», law 1 same words for an NPC): her standing with the one who pardons, read from the one relation core */
function punAllyWhy(a,p){let n=0;try{n=Math.round(aff(a,p))}catch(e){}const t=p===S?"ngươi":p.name;/* reviewer r1: the words follow the real standing from the one relation core (netTh «thân» line; never «quý» at thiện cảm < 0) */let th=Infinity;try{th=netTh(a,"than")}catch(e){}return n>=th?`nàng quý ${t} (thiện cảm ${n})`:n>=0?`nàng mở lòng khoan dung với ${t} (thiện cảm ${n})`:`nàng giữ đức khoan dung của Trung cung, dù không ưa ${t} (thiện cảm ${n})`}
/* ONE RANK: the seat cap never pushes the punished one further (jseat settle). While she sits on the rank she was punished to, the settle
   pass does not pick her; if that rank is over its cap, the standing seat rule moves its newest other holder instead («ghế đã đủ người»,
   jseat, with its own reason line), so the cap still holds at every month end (dev/test/seatcap-active.js) */
(function(){if(typeof seatKept!=="function")return;const k0=seatKept;seatKept=function(p){try{if(p&&p!==S&&p.punR!=null){if(p.punR===rkOf(p)&&!p.out&&p.alive!==false/* until her rank changes again */)return true;p.punR=null}}catch(e){}return k0.apply(this,arguments)}})();
function punEsc(s){return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
