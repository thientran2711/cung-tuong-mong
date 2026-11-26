/* ================= jplrule: PLACE RULES — one presence truth (owner OD 25/11 ~23:33Z, review/place-rules) =================
   Owner bug: at Đức Thọ cung past buổi sáng she was «giải ra» under cấm túc 2 tháng, yet the stage still showed Đức Thọ cung; no warning
   came before the punishment; the Hoàng hậu she was talking with «cũng tới» as a new arrival. LUẬT SỬA CẢ NHÓM — three families:
   (1) FORCED MOVE = MOVED AT ONCE. Every path that puts her under cấm túc / in lãnh cung / sends her away moves S.place + S.visit at once:
       · plSweep (before every render / renderStage, beside jsl kitLifePlace which pins lãnh cung + Tân Giả khố): cấm túc ⇒ her own room.
         Whatever path set S.confined (punish from a sneak, a stay roll, an event, a trial) — one sweep, so no path can leave her elsewhere.
       · plHome(msg): the ONE forced walk home (no khắc: the guards / the decree take her; never blocked by an open card, unlike goTo).
       · the door refusals that left her standing inside (j2 goTo: Cần Chính điện «Ngươi phải lui ra», Càn Thanh «Thái giám chặn cửa»)
         now send her back to her room with the same line.
       · a summons she answers («… triệu» card, option «Đến…») walks her there (the j41 chooseM pass already existed; now the move too).
   (2) ONE PRESENCE: a person already with her (on her stage, this place, this khắc) does not "arrive": the AG-MEET card (jgreet gmCard
       «Có người đến … giá đáo»), the weekly door approach (j24 AP_MK) and the AG deed card (jagent agScene «Có người tìm đến») skip the
       arrival; the deed card says she is beside her instead of «tìm đến».
   (3) WARNING BEFORE THE LIMIT: see jstagehere (the closing notice now also shows on entry for a place that closes at the next buổi, and
       stayRoll never punishes without that warning having been shown: unwarned = escorted out, no loss).
   Tests: dev/test/place-rules.js. Old saves: nothing new stored except S.plWarn (optional string). */
(function(){try{
const PR=window.PR={stat:{sweep:0,door:0,summon:0,dupMeet:0,dupAp:0,dupSeek:0}};
const nm=k=>{try{return typeof accName==="function"?accName(k):placeOf(k).n}catch(e){return k}};
const mode=()=>{try{if(typeof isSrv==="function"&&isSrv())return"srv";if(typeof isKc==="function"&&isKc())return"kc"}catch(e){}return""};
/* the ONE forced walk home: S.place + S.visit (her room's people) + the hall and a pending act trip dropped; msg = the stage line */
function plHome(msg){try{if(typeof S!=="object"||!S||S.dead||mode())return false;if(S.out){if(typeof coldVisit==="function"&&S.place!=="lc")coldVisit();return false}
 const from=S.place;if(from==="home"&&S.visit&&S.visit.k==="home"){if(msg)S.visit.msg=msg;return false}
 S.place="home";try{S.hall=null}catch(e){}window.__actPend=null;S.visit={k:"home",people:homePeople(),talked:false,tk:{}};if(msg)S.visit.msg=msg;return from}catch(e){console.error("plHome",e);return false}}
window.plHome=plHome;
/* (1) cấm túc pins her to her own room, whatever path set it */
function plSweep(){try{if(typeof S!=="object"||!S||S.dead||S.out||mode())return;if(!(S.confined>0))return;if(S.place==="home"&&S.visit&&S.visit.k==="home")return;
 const from=S.place;const n=from&&from!=="home"?nm(from):"";PR.stat.sweep++;
 plHome(n?`Thị vệ đưa ngươi rời ${n} về tẩm cung: ngươi đang bị cấm túc.`:"");if(n)log(`Rời ${n}: đang bị cấm túc, thị vệ đưa ngươi về tẩm cung.`)}catch(e){console.error("plSweep",e)}}
window.plSweep=plSweep;
if(typeof render==="function"){const r0=render;render=function(){plSweep();return r0.apply(this,arguments)}}
if(typeof renderStage==="function"){const r1=renderStage;renderStage=function(){plSweep();return r1.apply(this,arguments)}}
/* the door refusals of j2 goTo that left her inside: back to her room with the same line */
if(typeof goTo==="function"){const g0=goTo;goTo=function(k){const r=g0.apply(this,arguments);try{if(S&&!S.dead&&S.place===k&&S.visit&&S.visit.k===k&&(k==="thu"||k==="dtd")){const m=String(S.visit.msg||"");
  if(/Ngươi phải lui ra\.|Thái giám chặn cửa/.test(m)){PR.stat.door++;plHome(m.replace("Ngươi phải lui ra.","Ngươi phải lui về cung."));if(typeof render==="function")render()}}}catch(e){console.error("plDoor",e)}return r}}
/* a summons she answers walks her there (the pass: j41 chooseM) — after the cards close (jstagehere actPendRun) */
const SUMMON=[[/Thái hậu/,"tn"],[/Hoàng hậu/,"kn"]];
if(typeof chooseM==="function"){const c0=chooseM;chooseM=function(i){let k=null;try{const m=Q[0];if(m&&/triệu/i.test(m.t||"")&&m.opts&&m.opts[i]&&/^Đến/.test(m.opts[i].n)&&!S.confined&&!S.out&&!mode()){for(const [re,kk] of SUMMON)if(re.test(m.t)){k=kk;break}if(k==="kn"&&!(typeof qOn==="function"&&qOn()))k=null}}catch(e){}
  const r=c0.apply(this,arguments);try{if(k&&S&&!S.dead&&S.place!==k){PR.stat.summon++;window.__actPend={k,bk:typeof bkey==="function"?bkey():""};if(!Q.length&&typeof actPendRun==="function")actPendRun()}}catch(e){}return r}}
/* (2) ONE PRESENCE: is v on her stage now (this place, this khắc)? */
function plWith(v){try{if(!v||v===S||!S||!S.visit||S.visit.k!==S.place)return false;const L=typeof curPeople==="function"?curPeople():S.visit.people;
 if(!(L||[]).some(p=>p&&p.kind!=="chest"&&p.ref===v))return false;try{if(typeof whereOf==="function"&&whereOf(v)!==S.place)return false}catch(e){}return true}catch(e){return false}}
window.plWith=plWith;
if(typeof gmCard==="function"){const m0=gmCard;gmCard=function(v){if(plWith(v)){PR.stat.dupMeet++;return null}return m0.apply(this,arguments)}}
try{if(typeof AP_MK==="object"&&AP_MK)for(const k of Object.keys(AP_MK)){const f=AP_MK[k];if(typeof f!=="function")continue;AP_MK[k]=function(o){if(o&&o.who&&plWith(o.who)){PR.stat.dupAp++;return null}return f.apply(this,arguments)}}}catch(e){}
if(typeof agScene==="function"){const s0=agScene;agScene=function(p,v){const n0=Q.length;const r=s0.apply(this,arguments);try{if(plWith(v)&&Q.length>n0){const m=Q[Q.length-1];
  if(m&&m.t==="Có người tìm đến"){PR.stat.dupSeek++;m.t="Người bên cạnh";if(typeof m.h==="string")m.h=m.h.replace(/tìm đến ngươi ở ([^:.<]+)/,"đang ở cùng ngươi tại $1, quay sang ngươi").replace(/ ngươi ở ([^.<]+)\./," ngươi ngay tại $1.")}}}catch(e){}return r}}
/* the ONE gate for every other arrival card (j24 faction ask, j68 «Có người đến» family, any later maker): a card titled as an arrival whose
   person (who.w = ["r", id]) is already beside her keeps its content (its effects already ran) but loses the arrival: title «Người bên cạnh»,
   the door / road arrival line (giá đáo · xin cầu kiến · xin ra mắt) dropped */
const ARR=/^(Có người đến|Có người tìm đến)$/;
function plArrFix(){try{for(const m of Q){if(!m||m.plDup||!ARR.test(m.t||"")||!m.who||!Array.isArray(m.who.w)||m.who.w[0]!=="r")continue;const v=typeof RV==="function"?RV(m.who.w[1]):null;if(!plWith(v))continue;
  m.plDup=1;PR.stat.dupGate=(PR.stat.dupGate||0)+1;m.t="Người bên cạnh";if(typeof m.h==="string")m.h=m.h.replace(/<p>[^<]*(giá đáo|xin cầu kiến|xin ra mắt)[^<]*<\/p>/g,"").replace(/tìm đến ngươi ở ([^:.<]+)/,"đang ở cùng ngươi tại $1, quay sang ngươi")}}catch(e){console.error("plArrFix",e)}}
window.plArrFix=plArrFix;
if(typeof showModal==="function"){const sm0=showModal;showModal=function(){plArrFix();return sm0.apply(this,arguments)}}
/* (4) DƯ ĐỒ under an all-locked state (owner OD 25/11 ~23:40Z, k17 shot: «đi đâu nó cũng xám hết … chỗ nào là nhà?»), label/marker layer only:
   · HER HOME on the plan (her room, or the palace whose phối điện houses her: mapHereK at "home") is never greyed/locked: it is where she lives;
     its label line starts «Nhà ta» on every map view (painted home icon: KIT_REQUESTS K-ICO-HOME; until then the word).
   · ONE reason for the whole map: cấm túc / lãnh cung, or any reason that sits on most labels (hết khắc, buổi tối…) is said once in the map's
     top row (the kit chip of that row, .fest) and dropped from the labels; the lock marks stay.
   · Away from home: «Về phòng · N khắc» in the map's top row (kit .btn mz), the walk home (goTo("home")). */
function plHomeK(){try{if(!S)return null;const p0=S.place;let k;try{S.place="home";k=typeof mapHereK==="function"?mapHereK():"home"}finally{S.place=p0}return k||"home"}catch(e){return"home"}}
window.plHomeK=plHomeK;
if(typeof accState==="function"){const as0=accState;accState=function(k){try{if(S&&S.place==="home"&&!S.out&&k&&k===plHomeK())return{why:"",here:1}}catch(e){}return as0.apply(this,arguments)}}
const esc2=t=>String(t).replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
function plMap(h){try{if(!S||S.dead||typeof h!=="string"||h.indexOf('class="maptools"')<0)return h;const hk=S.out?null:plHomeK();
 /* the one reason */
 let why=S.out?"Đang ở lãnh cung":S.confined>0?`Đang cấm túc, còn ${S.confined} tháng: chỉ ở trong cung mình`:"";const strip=[];
 if(S.out)strip.push("đang ở lãnh cung");if(S.confined>0)strip.push(`đang cấm túc (${S.confined} tháng)`,`đang cấm túc (còn ${S.confined} tháng)`,`cấm túc ${S.confined} tháng`);
 if(!why){const C={};let n=0;h.replace(/<span class="mmeta">([^]*?)<\/span>/g,(m,x)=>{n++;const e=x.match(/<em>([^<]+)<\/em>/);if(e)C[e[1]]=(C[e[1]]||0)+1;return m});
  const top=Object.entries(C).sort((a,b)=>b[1]-a[1])[0];if(top&&top[1]>=5&&top[1]>=n*.6){why=top[0].charAt(0).toUpperCase()+top[0].slice(1);strip.push(top[0])}}
 if(why){PR.stat.banner=(PR.stat.banner||0)+1;for(const w of strip){const W=esc2(w);
   h=h.replace(new RegExp(`( · )?<em>${W}</em>`,"g"),"").replace(new RegExp(`<span class="mchip[^"]*">${W}</span>`,"g"),"")}
  h=h.replace(/<span class="mmeta">\s*<\/span>/g,"");
  if(window.kitMapBanner)kitMapBanner.set({id:"plban",line:why,home:hk});/* KIT §103 the one Dư đồ banner (K-MAP-BANNER) carries the reason + the home mark on every map style */
  else h=h.replace('<div class="maptools">',`<div class="maptools"><span class="fest" data-plban="1">${why}</span>`)}
 else if(window.kitMapBanner)kitMapBanner.clear("plban");
 /* her home */
 if(hk){h=h.replace(new RegExp(`(<(?:button|div) class="mspot[^"]*"[^>]*data-(?:go|ak)="${esc2(hk)}"[^>]*>[^]*?)(<span class="mmeta">|</(?:button|div)>)`),(m,a,b)=>b==='<span class="mmeta">'?`${a}<span class="mmeta">Nhà ta · `:`${a}<span class="mmeta">Nhà ta</span>${b}`)}
 /* the way home */
 if(S.place!=="home"&&!S.out&&!S.confined&&!(typeof isSrv==="function"&&isSrv())){let tc=0,ok=true;try{tc=travel(S.place,"home");ok=typeof walkOk==="function"?walkOk(tc):true}catch(e){}
  const b=`<button class="btn mz" data-plhome="1"${ok?"":" disabled"} title="${ok?`Đi về cung mình: ${tc} khắc`:"Không đủ khắc để về"}">Về phòng · ${tc} khắc</button>`;
  h=h.replace(/(<div class="maptools">[^]*?<span>)(<button class="btn mz" data-mapz)/,`$1${b}$2`)}
 return h}catch(e){console.error("plMap",e);return h}}
window.plMap=plMap;
/* the Dư đồ «leather» style hides the top row's text chips (jbook): the one reason also goes through the ONE notice system (kitNotice: top chip +
   «!» box), sticky while the state holds — the chip shows once per buổi on the Dư đồ; dropped when she is free again. (A dedicated map banner part:
   KIT_REQUESTS K-MAP-BANNER.) */
function plBanTick(){try{if(window.kitMapBanner){try{if(typeof kitNoticeDrop==="function")kitNoticeDrop("plban")}catch(e){}return}/* KIT §103: the Dư đồ banner replaces this notice stand-in */if(typeof kitNotice!=="function"||!S||S.dead)return;const why=S.out?"Đang ở lãnh cung":S.confined>0?`Đang cấm túc, còn ${S.confined} tháng: chỉ ở trong cung mình`:"";
 if(!why){try{if(typeof kitNoticeDrop==="function")kitNoticeDrop("plban")}catch(e){}return}
 if(typeof tab==="undefined"||tab!=="go")return;const key=(typeof bkey==="function"?bkey():"")+"|"+why;if(S.plBan===key)return;S.plBan=key;
 kitNotice({id:"plban",kind:"close",line:why,text:`${why}. Mọi nơi khác trên Dư đồ đều không đi được cho đến khi hết hạn.`,sticky:true})}catch(e){console.error("plBan",e)}}
if(typeof render==="function"){const rb0=render;render=function(){const r=rb0.apply(this,arguments);plBanTick();return r}}
if(typeof mapHTML==="function"){const mh0=mapHTML;mapHTML=function(){return plMap(mh0.apply(this,arguments))}}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-plhome]");if(!b)return;e.preventDefault();e.stopImmediatePropagation();if(b.disabled||!S||S.dead||Q.length)return;try{goTo("home")}catch(x){console.error(x)}},true);
}catch(e){console.error("jplrule",e)}})();
