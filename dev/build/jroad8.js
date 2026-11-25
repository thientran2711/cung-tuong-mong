/* ================= jroad8: ONE 8-TAB BAR ON EVERY ROAD (owner 21/11 ~03:15Z, mark #32; MAIN CHÍNH 85 brief maid-8tabs) =================
   Owner (verbatim, OD 21/11 ~03:15Z): "Mình vẫn giữ đủ 8 cái tab, nhưng mà mỗi một cái tab mình để y chang luôn … tôi nghĩ là mình không có nên thay đổi
   những cái tab này … trước mắt là cứ làm cái layout là 8 cái tab. Còn mà đổi cái gì vào trong cái tab gì cho nó đúng thì tôi sẽ báo bạn sau."
   Every road — consort, cung nữ (isSrv, j42), tiểu thư ngoài cung (isKc, jkc/jkc2) — shows the SAME 8 bottom tabs (Hành sự · Dư đồ · Hậu cung · Giao tình ·
   Hoàng tự · Tư trang · Tài nghệ · Mệnh truyện) with the same groups and sub-tabs (j79 KG, kit sub-tab row .ksub). No locks.
   ROAD8 = the ONE mapping table (change only this when she rules the final mapping): per road, consort tab key → what her road shows there:
     (key not listed)      the consort panel as it is (it works on her road: Chí tôn, Phi tần, Ân oán, Hoàng tự, Tư trang, Tài nghệ, Sổ ghi …)
     {k:"<her key>"}       her road's own panel, rendered with tab = that key (the road modules keep their own panels)
     {l:"label" | ()=>…}   the sub-tab label on her road
     {empty:[topic,line]}  the kit empty card (kitEmpty, KIT §21): a tab with nothing yet, never a lock
     {hide:1}              not a sub-tab on her road (the bottom tab itself always opens) */
const ROAD8={
 /* cung nữ: Phận sự → Hành sự (act), Dư đồ → Dư đồ (go), Đồng liêu → Hậu cung › Đồng liêu (staff: the shared person pager, j42 srvStaffTabHTML),
    Thân phận → Mệnh truyện › Thân phận (story), Sổ ghi → Mệnh truyện › Sổ ghi (log); Phi tần → «Chủ tử» (owner 21/11 ~03:25Z mark #36); every other tab = the consort panel */
 srv:{rv:{l:"Chủ tử"},staff:{l:"Đồng liêu"},story:{l:"Thân phận"},
  /* ACTS = the ONE allowlist of acts on a person card on her road (MAIN CHÍNH 90 option A, interim until the owner rules her mapping; brief main90-maid-acts-a):
     per card kind (pcard tabKey; "rival" = Hậu cung › Chủ tử, every consort) → act key (road8ActKey) → {} kept as is | {r:[[from,to],…]} kept with her words.
     A key NOT listed is simply ABSENT on her road (owner 21/11 ~03:15Z: "tôi nghĩ cũng chả cần phải khóa nữa") — no lock, no grey button.
     Kept = what a cung nữ really does to a consort: walk to her (khắc only, the same cost on every road) and ask a servant who she is. Meeting her, the
     cung nữ's own talk (j42 srvTalk sk rv/hh: Hành lễ thỉnh an · Mật báo chuyện của chủ · Tố cáo chủ trước Hoàng hậu, SRVA costs) = what an NPC maid does
     to a consort (jagstaff asOpts greet / betray / accuse: law 1 two-way). The consort acts (cost Sủng, need her own palace, servants, tai mắt, phẩm, bạc
     sai người: Kết giao, Tranh sủng, Ly gián, Phạt quỳ, Rút thẻ bài, Mời đến cung ta …) are absent. Full kept / absent list: reports/maid-acts-a.md. */
  acts:{rival:{
   visit:{r:[["Đến cung nàng thăm","Đến cung nàng thỉnh an"]]},
   see:{r:[["mọi việc làm tại chỗ, dễ hơn sai người","hành lễ, hầu chuyện tại chỗ"]]},
   "k61:ask":{}},
   /* the card's side note on her road (the consort's «phải sai người» / «làm tại chỗ» lines speak of a consort's means) */
   note:{rival:"Gặp mặt: hành lễ thỉnh an; biết chuyện của chủ thì có thể mật báo."}}},
 /* tiểu thư ngoài cung (KCTABS names follow her variant, jkc2 KC2W): Khuê phòng → Hành sự, Thư từ → Hậu cung › first sub-tab, Gia tộc → Hậu cung › second,
    Giao du → Giao tình, Hoàng tự = empty card; Dư đồ / Tư trang / Tài nghệ / Mệnh truyện = hers */
 kc:{court:{k:"kid",l:()=>KCTABS.kid},rv:{l:()=>KCTABS.rv},men:{hide:1},staff:{hide:1},rel:{k:"staff",l:()=>KCTABS.staff},fac:{hide:1},
  kid:{empty:["Hoàng tự","Ngươi chưa vào cung, chưa có con."]},kvo:{hide:1},kin:{hide:1},hon:{hide:1},qt:{hide:1},
  q72:{hide:1},nho:{hide:1},quest:{hide:1},req:{hide:1},log:{hide:1}}};
/* ROAD8_LAB = the ONE label table of the stage right column groups (owner 21/11 ~03:25Z mark #36: "bất kỳ một cái gì thông tin nào ở bên phi tần có thì bên
   cung nữ đều có, nhưng mà mình có thể linh động đổi tên lại … cung nhân ở bên phi tần thì mình có thể đổi lại là đồng liêu ở bên cung nữ … chủ tử").
   Same boxes, same kit parts on every road; only these words change. cn = the household box (kit square button + fold + phone rail), ct = the court box. */
/* PLACE WORDS (owner OD 25/11 ~22:45Z, review/ob-ngoaicung: "Tại sao đang ở ngoài cung mà có cung nhân chí tôn? Phải là người hầu hay gì chứ? Phải dùng từ
   cho hợp thân phận chứ"): ROAD8_LAB is also THE ONE word table keyed by PLACE CONTEXT (placeCtx): palace words only once she is in the palace.
   Contexts: "" = in the palace (consort) · srv = cung nữ road · kc = at home before the palace (tiểu thư phủ: khuê phòng, phủ, kinh thành, journeys;
   isKc) · kc:dan = thôn nữ at home (cnv) · kc:nc = a foreign princess at her own court before the hòa thân (nc / bd / pf). A context falls back
   kc:x -> kc -> "" word by word. Keys: cn / ct = the two stage head-count groups (her household / the people above her) · maid = her personal
   maid's title (kitMaidTitle; no palace rank like «tam đẳng» outside) · sv_maid / sv_eunuch = the role word of other servants of her household. */
const ROAD8_LAB={"":{cn:"Cung nhân",ct:"Chí tôn",t_mus:"Nhạc sư Giáo phường",t_craft:"Ma ma Thượng công cục",t_rite:"Nữ quan Thượng nghi cục",t_vir:"Ma ma giáo tập",t_fee:"nữ quan",tch_cons:"1"},srv:{cn:"Đồng liêu"},
 kc:{cn:"Người hầu",ct:"Trưởng bối",maid:"Tỳ nữ thân tín",sv_maid:"Tỳ nữ",sv_eunuch:"Gia đinh",
  /* teachers she can have at home (no palace office, no consort): t_mus = music / dance, t_craft = needlework / cooking, t_rite = letters / rites, t_vir = Tứ đức;
     tch_cons = 0: no consort teaches her before she is in the palace (law 6: she cannot reach them) */
  fame3:"Cả phủ nghe danh.",t_mus:"Nhạc sư",t_craft:"Ma ma trong phủ",t_rite:"Nữ sư",t_vir:"Nữ sư",t_fee:"nữ sư",tch_cons:"0"},
 "kc:dan":{fame3:"Cả xóm nghe danh.",cn:"Người ở",ct:"Gia đình",maid:"Người ở thân tín",sv_maid:"Người ở",sv_eunuch:"Người làm"},"kc:nc":{fame3:"Cả cung nghe danh.",ct:"Vương tộc",t_mus:"Nhạc sư trong cung",t_craft:"Ma ma trong cung",t_rite:"Nữ quan",t_vir:"Ma ma giáo tập",t_fee:"nữ quan"}};
function placeCtx(){const r=road8();if(r!=="kc")return r;let d="";try{d=typeof kc2D==="function"?kc2D():(S.kc&&S.kc.kd)||""}catch(e){}
 return d==="dan"?"kc:dan":d?"kc:nc":"kc"}
/* the word of key k in context c (default: where she is now); "" when no context has one */
function placeW(k,c){c=c==null?placeCtx():c;const L=[c];if(c.indexOf(":")>0)L.push(c.split(":")[0]);L.push("");
 for(const x of L){const T=ROAD8_LAB[x];if(T&&T[k])return T[k]}return""}
function road8Lab(k){return placeW(k)}
window.ROAD8_LAB=ROAD8_LAB;window.road8Lab=road8Lab;window.placeCtx=placeCtx;window.placeW=placeW;
/* outside the palace her maid has no palace rank (kitMaidTitle is the ONE maid title: figure tag, person card, group list, gift, relation rows),
   and the servants of her house are not cung nữ / thái giám (srkName: the ONE servant rank word) */
/* PLACE GATE for dialogs (owner OD 25/11 ~22:48Z: "Tôi đang ở ngoài cung mà tại sao lại có cung nữ tới báo tin là sao? Những cái thông tin như thế này nó
   xuất hiện không có đúng thân phận gì hết."; law 6 real people): while she is at home before the palace (road8 kc) no palace person can stand in front
   of her: a dialog whose speaker is the emperor, the Thái hậu, a consort or a palace servant (figure rk emp / th / c<rank> / cold / sv<rung>, her own
   maid excepted) is not shown (the palace world goes on; she simply is not there). Her home pools (pid kc…: kcE, kc2Sel, jkc3 …) keep their speakers
   (the «Chiếu tuyển tú» read by the emperor's edict, the selection days). ONE gate: placeEvOk(m), run by showModal before a dialog is drawn. */
function placeEvOk(m){try{if(!m||road8()!=="kc")return true;if(/^kc/i.test(String(m.pid||"")))return true;if(m.kind==="news"&&/^Tin trong cung/.test(m.t||""))return false;/* the palace's own news sheet of the buổi */const w=m.who;if(!w||typeof w!=="object")return true;
 const rk=String(w.rk||"");if(!/^(emp|th|c\d|cold|sv)/.test(rk))return true;
 if(S.maid&&/^sv/.test(rk)&&typeof pMaid==="function"&&w.src===pMaid().src)return true;return false}catch(e){return true}}
window.placeEvOk=placeEvOk;
/* placeSift: drops every queued dialog the place forbids; it runs inside the game's ONE dialog gate (j68 evGate: pacing, dry sifts of jspread) and,
   for a build without it, in front of showModal */
function placeSift(){try{if(road8()!=="kc"||!Q.length)return;for(let i=Q.length-1;i>=0;i--)if(!placeEvOk(Q[i]))Q.splice(i,1)}catch(e){console.error("placeSift",e)}}
window.placeSift=placeSift;
/* the journal at home: palace-world lines that speak as if she lived in the palace or report the inner palace day by day never reach her sổ
   (she has her own news there: letters, rumours bought on her home road). ONE pattern list per place context; a line matching one is not written. */
const PLACE_LOG_DROP={kc:[/sang cung ngươi/,/ghé chơi cung ngươi/,/tròn năm thứ \d+ trong cung/,/^Tin trong cung ·/,/được Hoàng thượng ban/,
 /^Trong cung (truyền tai nhau|khi ấy)/,/Trong cung khi ấy —/,/^Đêm nay Hoàng thượng/,/giá đáo!/,/^Có người (đến|tìm đến|bán tin)\b/,/^Tin mua được/,
 /^(Hỏa hoạn lớn|Lễ Phật đản|Sứ đoàn vào triều|Nạn châu chấu|Đại hàn, tuyết lớn|Đại trai đàn|Yến đầy tháng|Tỉnh thân|Thu săn|Đại phóng cung nhân|Đại xá thiên hạ|Lũ lớn, mất mùa|Án mất trộm ngự khố)\b/,
 / dời sang .*(hiên|các|điện|cung)\b/,/ngự tứ/,/ tát vì /,/thưởng bạc cho cung nhân/,/^Sét đánh trúng mái cung/,/mắc phong hàn/,/được Hoàng thượng (triệu|ban)/,/trong cung, .*Bạc −/,/ báo thị vệ:/,
 /^(Dãy cung cháy|Lễ Phật đã xong|Sứ đoàn đã lên đường|Gia quyến đã ra về|Tuyết đã tan; Nội vụ phủ)/,/bị cấm túc .* vì /]};
/* a line written while the palace world runs its own buổi for the home road (jkc kcW: rivals' turns, the night, the palace news) is palace business */
function placeLogOk(h){try{const L=PLACE_LOG_DROP[road8()];if(!L)return true;if(window.__kcWorld>0)return false;const t=String(h||"").replace(/<[^>]+>/g,"");return !L.some(re=>re.test(t))}catch(e){return true}}
window.placeLogOk=placeLogOk;
(function(){if(typeof kcW!=="function")return;const w0=kcW;kcW=function(){window.__kcWorld=(window.__kcWorld||0)+1;try{return w0.apply(this,arguments)}finally{window.__kcWorld--}}})();
(function(){if(typeof log!=="function")return;const l0=log;log=function(h){if(!placeLogOk(h))return;return l0.apply(this,arguments)}})();
(function(){if(typeof evGate==="function"){const g0=evGate;evGate=function(){placeSift();return g0.apply(this,arguments)}}
 /* outermost: installed once every module has wrapped showModal (jdayq holds dialogs in front of the others: the sift must come first) */
 const wrap=()=>{if(typeof showModal!=="function"||showModal.__place)return;const s0=showModal;showModal=function(){placeSift();return s0.apply(this,arguments)};showModal.__place=1;try{window.showModal=showModal}catch(e){}};
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",wrap);else setTimeout(wrap,0)})();
(function(){if(typeof kitMaidTitle==="function"){const k0=kitMaidTitle;kitMaidTitle=function(m,lower){const w=road8()==="kc"?placeW("maid"):"";
  if(!w)return k0.apply(this,arguments);return lower?w.charAt(0).toLowerCase()+w.slice(1):w}}
 if(typeof srkName==="function"){const s0=srkName;srkName=function(s){const w=road8()==="kc"&&s&&s.role&&(s===S.maid||(S.staff||[]).includes(s))?placeW("sv_"+s.role):"";return w||s0.apply(this,arguments)}}})();
function road8(){try{if(!S||S.dead)return"";if(typeof isKc==="function"&&isKc())return"kc";if(typeof isSrv==="function"&&isSrv())return"srv"}catch(e){}return""}
function road8E(k){const r=road8();return r&&ROAD8[r]&&ROAD8[r][k]||null}
function road8Hide(k){const e=road8E(k);return !!(e&&e.hide)}
function road8Label(k){const e=road8E(k);if(!e||!e.l)return"";try{return typeof e.l==="function"?e.l()||"":e.l}catch(x){return""}}
/* where a key lives on her road, for help / goal lines: "Hậu cung › Đồng liêu"; "" on the consort road (the callers keep their own words) */
function road8Name(k){try{if(!road8()||road8Hide(k))return"";const g=typeof kgOf==="function"?kgOf(k):null;
  if(g&&KG[g]){const L=kgKeys(g);if(L.length<2)return KG[g].l;return `${KG[g].l} › ${kgLabel(k)}`}
  const b=document.querySelector(`#tabs [data-tab="${k}"]`);return b?(b.dataset.l0||b.textContent).trim():""}catch(e){return""}}
window.ROAD8=ROAD8;window.road8=road8;window.road8Hide=road8Hide;window.road8Label=road8Label;window.road8Name=road8Name;
/* a key with no bar button, or one her road leaves out, opens Hành sự (old saves / old links of the old servant and home bars) */
(function(){const r0=render;render=function(){try{if(road8()){const b=document.querySelector(`#tabs [data-tab="${tab}"]`);if(!b||road8Hide(tab))tab="act"}}catch(e){}return r0.apply(this,arguments)}})();
(function(){const p0=renderPanel0;renderPanel0=function(){const e=road8E(tab);const el=$("panel");if(!e||e.hide){if(el)el.__r8=null;return p0.apply(this,arguments)}
 if(e.empty){const gm=document.querySelector(".game");if(gm)gm.classList.remove("cardtab","maptab");const h=kitEmpty(e.empty[0],e.empty[1]);
  if(el.dataset.tab!==tab||el.__r8!==h){el.innerHTML=h;el.__r8=h;el.dataset.tab=tab;el.dataset.pg="";try{kitFix(el)}catch(x){}}return}
 el.__r8=null;
 /* her own panel: the road module draws it under its own key; the bar, groups and sub-tabs keep the consort key */
 if(e.k&&e.k!==tab){const t0=tab;tab=e.k;try{return p0.apply(this,arguments)}finally{tab=t0}}
 return p0.apply(this,arguments)}})();
/* ---- the act table on her road (ROAD8.<road>.acts): which act buttons a person card shows ---- */
/* act key of one act button: data-a (ACT, j15 rvGroups) · data-e + data-k (Quyền Hoàng hậu: "hh:<k>") · data-see / data-visit / data-scout / data-invite (j21) ·
   data-pma (jpma: "pm:<a>") · data-k61 (j61: "k61:<v>") · else "?<first data name>" (unknown = not listed = absent) */
function road8ActKey(h){h=String(h||"");const m=h.match(/^\s*<button([^>]*)>/);if(!m)return"";const a=m[1];let x;
 if((x=a.match(/\bdata-a="([^"]+)"/)))return x[1];if((x=a.match(/\bdata-e="[^"]*"[^>]*\bdata-k="([^"]+)"/)))return"hh:"+x[1];
 for(const k of ["see","visit","scout","invite"])if(new RegExp("\\bdata-"+k+"=").test(a))return k;
 if((x=a.match(/\bdata-pma="([^"]+)"/)))return"pm:"+x[1];if((x=a.match(/\bdata-k61="([^"]+)"/)))return"k61:"+x[1];
 x=a.match(/\bdata-([a-z0-9]+)=/);return x?"?"+x[1]:"?"}
function road8Acts(o){const r=road8();const T=r&&ROAD8[r]&&ROAD8[r].acts;if(!T||!o||!o.tabKey||!T[o.tabKey])return o;const A=T[o.tabKey];
 const keep=h=>{if(typeof h!=="string"||!/^\s*<button/.test(h))return h;const e=A[road8ActKey(h)];if(!e)return"";let y=h;for(const [f,t] of e.r||[])y=y.split(f).join(t);return y};
 const groups=(o.groups||[]).map(g=>g&&Array.isArray(g[1])?[g[0],g[1].map(keep).filter(Boolean)]:g).filter(g=>g&&Array.isArray(g[1])&&g[1].length);
 const n=T.note&&T.note[o.tabKey];const note=o.note&&/^(Cùng chỗ: làm tại chỗ|Không gặp mặt: phải sai người)/.test(o.note)?(n||""):o.note;
 return Object.assign({},o,{groups,note})}
window.road8ActKey=road8ActKey;window.road8Acts=road8Acts;
