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
    Giao du → Giao tình, Hoàng tự = empty card; Dư đồ / Tư trang / Tài nghệ / Mệnh truyện = hers. The 8 bottom tabs keep their names on every road
    (owner OD:L2108 21/11 ~03:15Z «mỗi một cái tab mình để y chang luôn … không có bị lạ khi mà họ thay đổi thân phận»); only the content fits her station. */
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
const ROAD8_LAB={"":{aa_t:"Trong cung vừa qua",cn:"Cung nhân",ct:"Chí tôn",t_mus:"Nhạc sư Giáo phường",t_craft:"Ma ma Thượng công cục",t_rite:"Nữ quan Thượng nghi cục",t_vir:"Ma ma giáo tập",t_fee:"nữ quan",tch_cons:"1"},srv:{cn:"Đồng liêu"},
 kc:{me:"Tiểu thư",aa_t:"Trong phủ vừa qua",cn:"Người hầu",ct:"Trưởng bối",maid:"Tỳ nữ thân tín",sv_maid:"Tỳ nữ",sv_eunuch:"Gia đinh",
  /* teachers she can have at home (no palace office, no consort): t_mus = music / dance, t_craft = needlework / cooking, t_rite = letters / rites, t_vir = Tứ đức;
     tch_cons = 0: no consort teaches her before she is in the palace (law 6: she cannot reach them) */
  fame3:"Cả phủ nghe danh.",t_mus:"Nhạc sư",t_craft:"Ma ma trong phủ",t_rite:"Nữ sư",t_vir:"Nữ sư",t_fee:"nữ sư",tch_cons:"0"},
 "kc:dan":{me:"Thôn nữ",aa_t:"Ở nhà vừa qua",fame3:"Cả xóm nghe danh.",cn:"Người ở",ct:"Gia đình",maid:"Người ở thân tín",sv_maid:"Người ở",sv_eunuch:"Người làm"},dtv:{me:"Tú nữ",aa_t:"Ở Dưỡng Tú viện vừa qua",cn:"Tú nữ cùng khóa",ct:"Ma ma giáo dưỡng",maid:"Tỳ nữ thân tín",sv_maid:"Tỳ nữ",sv_eunuch:"Gia đinh",fame3:"Cả Dưỡng Tú viện nghe danh.",tch_cons:"0"},
 "kc:nc":{me:"Công chúa",aa_t:"Trong cung cố quốc vừa qua",fame3:"Cả cung nghe danh.",ct:"Vương tộc",t_mus:"Nhạc sư trong cung",t_craft:"Ma ma trong cung",t_rite:"Nữ quan",t_vir:"Ma ma giáo tập",t_fee:"nữ quan"}};
/* DƯỠNG TÚ VIỆN (MAIN 150/151 order; place key dtv = review/ob-phu jmapz MAPZ_DTV, tú nữ lodging): a girl who lodges there as a tú nữ before phân cung
   (still on her home road, isKc, standing at dtv) is no palace woman and has no household there: cn = the tú nữ of her intake, ct = the ma ma who teach them. */
function placeCtx(){const r=road8();if(r==="kc"){try{if(S&&S.place==="dtv")return "dtv"}catch(e){}}if(r!=="kc")return r;let d="";try{d=typeof kc2D==="function"?kc2D():(S.kc&&S.kc.kd)||""}catch(e){}
 return d==="dan"?"kc:dan":d?"kc:nc":"kc"}
/* the word of key k in context c (default: where she is now); "" when no context has one */
function placeW(k,c){c=c==null?placeCtx():c;const L=[c];if(c.indexOf(":")>0)L.push(c.split(":")[0]);L.push("");
 for(const x of L){const T=ROAD8_LAB[x];if(T&&T[k])return T[k]}return""}
function road8Lab(k){return placeW(k)}
/* HER rank word (BIG FAIL r2, law 11, ONE source): every place that prints HER rank reads meRankN(). In the palace = RANKS[S.rank].n (unchanged);
   before the palace (home road, isKc) = her home station from ROAD8_LAB «me» (Tiểu thư / Thôn nữ / Công chúa / Tú nữ), never a palace rank like «Đáp ứng». */
function meRankN(){try{if(typeof S!=="undefined"&&S&&!S.out&&road8()==="kc"){const t=placeW("me");if(t)return t}}catch(e){}try{return RANKS[S.rank]?RANKS[S.rank].n:""}catch(e){return""}}
window.ROAD8_LAB=ROAD8_LAB;window.road8Lab=road8Lab;window.placeCtx=placeCtx;window.placeW=placeW;
/* outside the palace her maid has no palace rank (kitMaidTitle is the ONE maid title: figure tag, person card, group list, gift, relation rows),
   and the servants of her house are not cung nữ / thái giám (srkName: the ONE servant rank word) */
/* PLACE GATE for dialogs (owner OD 25/11 ~22:48Z: "Tôi đang ở ngoài cung mà tại sao lại có cung nữ tới báo tin là sao? Những cái thông tin như thế này nó
   xuất hiện không có đúng thân phận gì hết."; law 6 real people): while she is at home before the palace (road8 kc) no palace person can stand in front
   of her: a dialog whose speaker is the emperor, the Thái hậu, a consort or a palace servant (figure rk emp / th / c<rank> / cold / sv<rung>, her own
   maid excepted) is not shown (the palace world goes on; she simply is not there). Her home pools (pid kc…: kcE, kc2Sel, jkc3 …) keep their speakers
   (the «Chiếu tuyển tú» read by the emperor's edict, the selection days). ONE gate: placeEvOk(m), run by showModal before a dialog is drawn. */
function placeEvOk(m){try{if(!m||road8()!=="kc")return true;if(/^kc/i.test(String(m.pid||"")))return true;if(m.kind==="news"&&/^Tin trong cung/.test(m.t||""))return false;/* the palace's own news sheet of the buổi */if(m.wwin)return false;/* a palace world-care card (jworldc wcCard «Thế sự trong cung»: palace maids / consorts / the court; its speaker is the role-A face, which may be anyone) */const w=m.who;if(!w||typeof w!=="object")return true;
 /* HER OWN figure (pMe: w ["me"], rk c0) is never a palace person (RV-OB-NGOAICUNG FAIL 1: the «Tiền truyện» cards vanished); its tag is her home station
    now (FAIL 2: a figure made before the home road began kept a palace rank) */
 if(Array.isArray(w.w)&&w.w.includes("me")){try{const t=placeW("me");if(t)w.rw=t}catch(e){}return true}
 const rk=String(w.rk||"");if(!/^(emp|th|c\d|cold|sv)/.test(rk))return true;
 if(S.maid&&/^sv/.test(rk)&&typeof pMaid==="function"&&w.src===pMaid().src)return true;return false}catch(e){return true}}
window.placeEvOk=placeEvOk;
/* placeSift: drops every queued dialog the place forbids; it runs inside the game's ONE dialog gate (j68 evGate: pacing, dry sifts of jspread) and,
   for a build without it, in front of showModal */
function placeSift(){try{if(road8()!=="kc"||!Q.length)return;for(let i=Q.length-1;i>=0;i--)if(!placeEvOk(Q[i]))Q.splice(i,1)}catch(e){console.error("placeSift",e)}}
window.placeSift=placeSift;
/* the journal at home: palace-world lines that speak as if she lived in the palace or report the inner palace day by day never reach her sổ
   (she has her own news there: letters, rumours bought on her home road). ONE pattern list per place context; a line matching one is not written. */
const PLACE_LOG_DROP={kc:[/sai người sang [^.]*ngươi/,/sang cung ngươi/,/ghé chơi cung ngươi/,/tròn năm thứ \d+ trong cung/,/^Tin trong cung ·/,/được Hoàng thượng ban/,
 /^Trong cung (truyền tai nhau|khi ấy)/,/Trong cung khi ấy —/,/^Đêm nay Hoàng thượng/,/giá đáo!/,/^Có người (đến|tìm đến|bán tin)\b/,/^Tin mua được/,
 /^(Hỏa hoạn lớn|Lễ Phật đản|Sứ đoàn vào triều|Nạn châu chấu|Đại hàn, tuyết lớn|Đại trai đàn|Yến đầy tháng|Tỉnh thân|Thu săn|Đại phóng cung nhân|Đại xá thiên hạ|Lũ lớn, mất mùa|Án mất trộm ngự khố)\b/,
 / dời sang .*(hiên|các|điện|cung)\b/,/ngự tứ/,/ tát vì /,/thưởng bạc cho cung nhân/,/^Sét đánh trúng mái cung/,/mắc phong hàn/,/được Hoàng thượng (triệu|ban)/,/trong cung, .*Bạc −/,/ báo thị vệ:/,
 /^(Dãy cung cháy|Lễ Phật đã xong|Sứ đoàn đã lên đường|Gia quyến đã ra về|Tuyết đã tan; Nội vụ phủ)/,/bị cấm túc .* vì /]};
/* a line written while the palace world runs its own buổi for the home road (jkc kcW: rivals' turns, the night, the palace news) is palace business */
function placeLogOk(h){try{const L=PLACE_LOG_DROP[road8()];if(!L)return true;if(window.__kcWorld>0)return false;const t=String(h||"").replace(/<[^>]+>/g,"");return !L.some(re=>re.test(t))}catch(e){return true}}
window.placeLogOk=placeLogOk;
/* TIN BÁO at home (owner OD 25/11 ~23:10Z: "tin tức nó chỉ tới khi mà tôi mua tin hay là cho người dò la thôi"): ONE gate on the notice feed
   (kitNotice: Tin báo, ! chip, know / tin / flip / here lines). While she is at home a notice reaches her only from her OWN act (a home card or her
   answer in a dialog: mua tin, nhờ người dò la, viết thư vào cung … — window.__kcActing, kept a moment for the batched «biết thêm» flush);
   by itself no palace happening, palace acquaintance, «xưng danh», lật thẻ, or the empty «… vẫn ở Khuê phòng. Không gặp ai.» filler. */
const PLACE_NOTE_RE=/\bcung\b|Hoàng (hậu|thượng)|Thái (hậu|y)\b|\b(Phi|Tần|Quý nhân|Đáp ứng|Thường tại|Quý phi)\b|[Cc]ung nữ|[Tt]hái giám|[Nn]gự |thẻ bài|cho gọi ngươi|thách đấu ngươi|Lời thách đấu|xưng danh|ghé chơi cung/;
function placeNoteOk(sp){try{if(!sp||road8()!=="kc")return true;const k=String(sp.kind||"");const t=String((sp.line||"")+" "+(sp.text||"")).replace(/<[^>]+>/g,"");
 /* never at home, whoever acts: the palace tai-mắt feed (tin), lật thẻ (flip), the stay-filler of a new buổi (close) */
 if(k==="tin"||k==="flip"||/vẫn ở [^.]*\.\s*(Không gặp ai|Ở đây (có|còn) \d+ người)\.?\s*$/.test(t.trim()))return false;/* the stay filler of a new buổi, whatever kind the feed gave it (OB-NGOAICUNG-2: the iPad stage feed sends it as another kind) */
 /* nor a palace person's summons / challenge / visit / xưng danh (the palace agents also run while one of her cards spends khắc) */
 if(/cho gọi ngươi|thách đấu ngươi|Lời thách đấu|sai người sang|xưng danh|ghé chơi cung|Có khách đến chơi/.test(t))return false;
 if(window.__kcActing>0||sp.own){sp.own=1;return true}
 if(k==="know")return false;return !PLACE_NOTE_RE.test(t)}catch(e){return true}}
window.placeNoteOk=placeNoteOk;
/* notices already in the feed when she is (or stays) at home — made in the palace world's own tick, before the home road began, or by a path that
   does not pass kitNotice — are swept by the same rule on every render (her own acts' notices carry own=1 and stay) */
function placeNoteSweep(){try{if(road8()!=="kc"||typeof kitNoticeList!=="function"||typeof kitNoticeDrop!=="function")return;
 for(const x of kitNoticeList())if(x&&x.id!=null&&!placeNoteOk(x))kitNoticeDrop(x.id)}catch(e){console.error("placeNoteSweep",e)}}
window.placeNoteSweep=placeNoteSweep;
(function(){const own=f=>function(){window.__kcActing=(window.__kcActing||0)+1;try{return f.apply(this,arguments)}finally{window.__kcActing--/* only what her act does synchronously; the batched «biết thêm» keeps the own mark (jnotice kitKnow) */}};
 /* time moving on (a new buổi, the palace world's own turn) is never her act, even when one of her cards spends the last khắc */
 const notOwn=f=>function(){const k=window.__kcActing||0;window.__kcActing=0;try{return f.apply(this,arguments)}finally{window.__kcActing=k}};
 for(const n of ["nextBuoi","kcW"])if(typeof window[n]==="function"||typeof globalThis[n]==="function"){const f0=globalThis[n];const w=notOwn(f0);if(n==="nextBuoi")nextBuoi=w;else kcW=w;window[n]=w}
 if(typeof act==="function"){const a0=act;act=own(a0);window.act=act}if(typeof chooseM==="function"){const c0=chooseM;chooseM=own(c0);window.chooseM=chooseM}
 /* kitNotice (jnotice, the kit notice feed) asks placeNoteOk itself: its own module calls it from inside, so no outside wrapper could reach them */})();
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
(function(){const r0=render;render=function(){const x=r0.apply(this,arguments);placeNoteSweep();return x}})();
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
/* THÔN NỮ HAS NO PERSONAL MAID (law 6 real world; MAIN 150 order, OB-NGOAICUNG open item 1): a village girl's family keeps no maid, so on the cnv home road
   (isKc && kd "dan") S.maid is null — the head-count shows «Gia đình» only (kgfCount cn = 0). The palace sim must not hand her a maid while she is at home
   (j8 consorts / maidMonthP give every consort one lazily; at home she is no consort): she is left out of consorts() there. Once she enters the palace
   (placement: maid / Tân Giả khố / low consort) the palace gives her one again as before (j42 srv start, j8 maidMk). Old cnv saves at home lose the maid. */
function noHomeMaid(){try{return !!(S&&S.kc&&!S.kc.inPal&&S.kc.kd==="dan")}catch(e){return false}}
window.noHomeMaid=noHomeMaid;
(function(){const dropMaid=()=>{if(noHomeMaid()&&S.maid)S.maid=null};
 if(typeof kc2Init==="function"){const i0=kc2Init;kc2Init=function(){const r=i0.apply(this,arguments);dropMaid();return r}}
 if(typeof consorts==="function"){const c0=consorts;consorts=function(){if(!noHomeMaid())return c0.apply(this,arguments);const L=c0.apply(this,arguments).filter(p=>p!==S);dropMaid();return L}}
 if(typeof maidMonthP==="function"){const m0=maidMonthP;maidMonthP=function(p){if(p===S&&noHomeMaid())return"";return m0.apply(this,arguments)}}
 if(typeof render==="function"){const r0=render;render=function(){dropMaid();return r0.apply(this,arguments)}}})();
/* PALACE ASKS AT HOME (OB-NGOAICUNG-2, k3/k9 family from the full-life video: «Một vị Phi sai người sang thách đấu ngươi» on her home «Nghỉ ngơi» card):
   the palace NPC asks (jrcv RCVK: thách đấu, nhờ vả, kết giao, mượn … — rcvAsk, one entry for every kind) never reach her while she is at home
   from a palace person (a living consort, a palace servant, the emperor / Thái hậu); a queued one (PEND.rcvAsk) made before she left is dropped too.
   Her own family / home people are not palace people and still reach her. Law 1 holds: at home she cannot reach them either (placeEvOk / gifts). */
function placePalP(p){try{if(!p||p===S)return false;if(p==="emp"||p==="th"||p===window.EMP)return true;if((typeof liveRivals==="function"?liveRivals(true):[]).includes(p))return true;
 if(p!==S.maid&&(typeof allServ==="function"?allServ():[]).includes(p))return true;return false}catch(e){return false}}
window.placePalP=placePalP;
(function(){if(typeof rcvAsk==="function"){const a0=rcvAsk;rcvAsk=function(k,p,t){if(t===S&&road8()==="kc"&&placePalP(p))return"";return a0.apply(this,arguments)};window.rcvAsk=rcvAsk}
 if(typeof PEND==="object"&&PEND.rcvAsk){const q0=PEND.rcvAsk;PEND.rcvAsk=function(pp){try{if(road8()==="kc"&&placePalP(byKey(pp.a)))return null}catch(e){}return q0.apply(this,arguments)}}})();
/* «TIME PASSED» CARD AT HOME (jaudit aaNote → resultShow "Trong cung vừa qua"; OB-NGOAICUNG-2 full-life video, thôn nữ Fold: «KẾT QUẢ · Trong cung vừa qua …
   Hoàng hậu …: ghen +8, Quý phi …, một vị Phi …») — at home the card is titled by place (ROAD8_LAB aa_t) and shows only HER own numbers: the palace
   people's feelings drifting in the palace world are not news that reaches her (law 6; placeNoteOk / placeEvOk family). */
/* the same for EVERY result card at home (a home act that spends khắc lets the palace world run: its drift is not hers to see), except the person her
   own act names in its title (a gift / letter she sends into the palace: «Gửi quà vào cung cho X») */
(function(){if(typeof resultShow!=="function")return;const r0=resultShow;resultShow=function(t,b){try{if(road8()==="kc"){if(t==="Trong cung vừa qua")t=placeW("aa_t")||t;
 if(b&&b.rel&&typeof relSnap==="function"){const now=relSnap(),rel={},T=String(t||"");for(const v of (typeof rivals!=="undefined"&&rivals)||[]){if(!v||!v.id)continue;
  rel[v.id]=v.name&&T.includes(v.name)&&b.rel[v.id]?b.rel[v.id]:now[v.id]}b=Object.assign({},b,{rel})}
 /* RV r3 FAIL 1 (same gate): Hoàng hậu's / Thái hậu's «thiện cảm» are HER stats hh / th (RKEYS rows «Hoàng hậu <tên>: thiện cảm −10») — at home they are
    palace people's feelings too: kept only when her own act names them in the title */
 if(b){const T=String(t||""),q=typeof queenP==="function"?queenP():null;const nb={};if(b.hh!=null&&!(q&&q!==S&&q.name&&T.includes(q.name))&&!/Hoàng hậu/.test(T))nb.hh=S.hh||0;
  if(b.th!=null&&!/Thái hậu/.test(T))nb.th=S.th||0;if(Object.keys(nb).length)b=Object.assign({},b,nb)}
 window.__r8T=String(t||"")}}catch(e){}try{return r0.apply(this,[t,b].concat([].slice.call(arguments,2)))}finally{window.__r8T=null}};window.resultShow=resultShow})();
/* the «Vì sao» rows of a result card / Sổ ghi tail (jwhyn whyText: one note per relAdd change) at home: no palace person's note (placePalP), except the
   person her own act names in the card title (RV r3 FAIL 1: «Mất: Hoàng hậu …: thiện cảm −10» came from this change list, not before.rel) */
(function(){if(typeof whyText!=="function")return;const w0=whyText;whyText=function(e){try{if(e&&road8()==="kc"&&placePalP(e.who)){const T=window.__r8T||"",n=e.who&&e.who.name;
 if(!(n&&T.includes(n))&&!(e.who==="th"&&/Thái hậu/.test(T)))return""}}catch(x){}return w0.apply(this,arguments)};window.whyText=whyText})();
/* HER TAG AT HOME (RV-OB-NGOAICUNG FAIL 2, k2 wording family): pMe().rw = her home station from ROAD8_LAB «me» (Tiểu thư / Thôn nữ / Công chúa / Tú nữ),
   never a palace rank, wherever her figure is drawn (dialogs, cards, stage) */
(function(){if(typeof pMe!=="function")return;const p0=pMe;pMe=function(){const f=p0.apply(this,arguments);try{if(road8()==="kc"&&f&&!S.out){const t=placeW("me");if(t)f.rw=t}}catch(e){}return f};window.pMe=pMe})();
/* HOME START (MAIN 159 r5, law 6+11): start() first makes the palace life (consort / cung nữ entry, its «Chương 1», the Sổ ghi sync «Sủng 8 → 0
   (Hoàng thượng phật ý)») and only then «Nhận thân phận» picks the home road (kcInit → kc2Init). Those palace start lines are not her life at home:
   the home start keeps only the life-start lot («Xin xăm») and her own new-life cost line («Đã đổi thân phận N lần (−X Phúc duyên)», nlAccept,
   RV r5: a cost she paid stays traceable, law 6) and writes its own first line. ONE place: kcInit (every home road goes through it). */
(function(){if(typeof kcInit!=="function")return;const i0=kcInit;kcInit=function(){try{if(S&&Array.isArray(S.logs))S.logs=S.logs.filter(x=>/Xin xăm|Đã đổi thân phận/.test(String(x).replace(/<[^>]+>/g,"")))}catch(e){}
 return i0.apply(this,arguments)};window.kcInit=kcInit})();
