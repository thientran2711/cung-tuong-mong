/* ================= jlogbao: ONE-TIME LINES · BÁO DURING PLAY · WHO OF EVERY LOG LINE (owner bug 17/11 03:18Z + 03:22Z, worker tuanluc-sync) =================
   Owner (verbatim, OD tail 17/11 03:18Z): "Đây là những cái thông tin gì mà sau lúc tôi chơi game nó không hề pop up những cái thông tin này cho tôi biết vậy? …
   Rồi 9 lần là sao?" + 03:22Z: "một quý phi chưa quen biết báo thị vệ. Cái này là quý phi chứ không phải là tôi đâu, mà nó nằm bên cái ô của tôi".
   1. ONE-TIME = ONCE, KEPT IN THE SAVE: logOnce(key, html) writes a line only the first time in a life (S.once{key: turn}); rtOpen/jroute uses it.
      (Root of "9 lần": jroute stored the unlock as T.open=S.turn, and S.turn is 0 in the first month -> falsy -> written on every render.)
   2. SHOWN DURING PLAY: every log line is classified by LOGBAO (ONE table; dev/test/tuanluc-sites.py applies the same table to every log() call site):
      (a) it changes her game (a new act group / road opens, her rank, a punishment on her, someone acts on her, someone joins her, a rule she must know)
          -> also shown at the moment as ONE kit notice (kitPanel kind "notice", seal BÁO) per buổi, lines grouped, max BAL-free cap LBMAX lines + "…";
          a line already on screen in the dialog she is reading is not repeated. (b) routine act results -> week book only (they already have #rtoast).
   3. WHO: the outermost log wrapper sees the RAW line (before the name mask of j61) and stamps the person it is about (first person named) into the
      stored line as an empty marker <i class="kw" data-w="name"></i>; the week book (j87 wkBookData) files the line on THAT person's page, or among
      "Tin trong cung" when she has not met that person — never on her own page with her portrait.
   Loaded LAST (assemble.py) so its log wrapper is the outermost one. KIT: kitPanel notice (§8, T1/T3) only — no private frame. */
const LBMAX=5;
function logOnce(key,h){if(!S)return false;S.once=S.once||{};if(S.once[key]!=null)return false;S.once[key]=S.turn||0;log(h);return true}
/* class (a) — plain text of the RAW line. Order = label shown nowhere (scan table only). */
const LOGBAO=[
 ["mở lối",/có thêm nhóm|nhóm «|Lối riêng|mở thêm|được mở|nay được (vào|ra|dùng)|Thẻ «[^»]+» ở Hành sự/],
 ["phẩm vị",/^(Ngươi|Ta)(\s[^.;:]{0,40},)? (được thăng|được tấn phong|được sắc phong|được phong|bị giáng|giáng xuống|bị phế|thăng làm|lên ngôi|phục vị)|(tấn phong|sắc phong|thăng|giáng|phế) (ngươi|ta)\b|(ngươi|ta) được (phong|thăng|ban hiệu)|^(Được thăng|Được phong|Đỗ khảo hạch|Trượt khảo hạch|Được dự khảo hạch|Lỡ hạn khảo hạch)|ban hiệu .{0,30}từ nay/],
 ["bị phạt",/^(Ngươi|Ta)(\s[^.;:]{0,30},)? bị (cấm túc|phạt|đánh|giam|đày|thu|tống|quở|đuổi|đưa vào lãnh cung|bắt)|^Bị (phạt|quản sự bắt gặp)|(phạt|cấm túc|đánh trượng|đày|giam|đánh) (ngươi|ta)\b|(ngươi|ta) (vào|bị đưa vào|bị giam ở) lãnh cung|cấm túc của (ngươi|ta)|của (ngươi|ta) bị (Nội vụ phủ )?thu|(ngươi|ta) mang tội/],
 ["nhắm vào ta",/(vu oan|vu cáo|hãm hại|hạ độc|đầu độc|tố giác|cáo giác|tố cáo|tung tin|bỏ xạ hương|khiêu khích|chèn ép|làm nhục|lấy trộm|trộm mất|uy hiếp|tống tiền|bán tin)[^.]{0,30}\b(ngươi|ta)\b|\b(ngươi|ta) (bị vu|bị hại|trúng độc|bị tố|bị trộm|bị uy hiếp)|\btố (ngươi|ta)\b|bị (ngươi|ta) phạt oan/],
 ["người mới",/(đi theo|theo hầu|về hầu|là người của|chạy việc cho) (ngươi|ta)\b|(về hầu|vào hầu) (cung )?(ngươi|ta)\b|^(Ngươi|Ta) (nay )?đã (biết tên|quen biết)|(ngươi|ta) quen [^.]{2,40}, |người quen cũ, sẵn lòng che chở/],
 ["luật phải biết",/^Từ nay|[.:;] Từ nay|(ngươi|ta) (không được|bị cấm) |^Luật mới|từ nay muốn|^Không được ở lại/]];
/* never BÁO: routine results / numbers only / the week's pay / walking */
const LOGBAO_NOT=/^(Đến |Bổng lộc|Xin xăm|Ngủ |Nghỉ |Đọc |Sang tuần mới|Mời thái y|Thỉnh bình an|Điểm trang|Dưỡng nhan)|^[^:]{1,40}: (Thôi|Để sau|Đã hiểu)\.?$/;
/* one tidy pass on the STORED line (after every wrapper, incl. the j61 name mask): reads like a person wrote it (owner 17/11 03:18Z).
   (1) a stranger named again in the same line → "nàng ta" (same title) / "một vị <title> khác" (another title), never "Một vị Tần chưa quen biết: Một vị
   Tần chưa quen biết…"; (2) a title glued to its own badge ("Quý phi<span>Quý phi</span> …") once; (3) a word glued to a following tag gets its space. */
const LB_RK="Hoàng quý phi|Quý phi|Phi|Tần|Quý nhân|Thường tại|Đáp ứng|Hoàng hậu|Phế phi";
function lbTidy(h){let o=String(h||"");
 o=o.replace(new RegExp(`(^|[^\\p{L}])(${LB_RK})((?:<[^>]+>)+)\\2(?![\\p{L}])`,"gu"),"$1$3$2");
 o=o.replace(/(\p{Ll})(<(?:span|b|i)\b[^>]*>)(?=\p{Lu})/gu,"$1 $2");
 o=o.replace(/(Thị vệ|Thái y|Họa sư|Nhạc sư|Sứ thần|Vương gia|Công tử|Thái giám|Cung nữ|Ma ma) (một (?:vị )?(?:\1|[^ ]+ [^ ]+) (?:lạ mặt|chưa quen biết|khác))/gi,(m,a,b)=>b.toLowerCase().startsWith("một "+a.toLowerCase())||b.toLowerCase().startsWith("một vị "+a.toLowerCase())?b:m);
 const seen=[];o=o.replace(/([Mm])ột vị ([^<.,:;()]{2,24}?) chưa quen biết/g,(m,M,t)=>{if(!seen.length){seen.push(t);return m}
  if(seen.includes(t))return (M==="M"?"N":"n")+"àng ta";seen.push(t);return `${M}ột vị ${t} khác`});
 return o}
function lbPlain(h){return String(h||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim()}
function lbClass(h){const t=lbPlain(h);if(!t||LOGBAO_NOT.test(t))return null;for(const [k,re] of LOGBAO)if(re.test(t))return k;return null}
/* people list cached for a moment (one buổi writes many lines; kpPeople sorts the whole court each call) */
let LBP=null,LBPt=0;function lbPeople(){const n=Date.now();if(!LBP||n-LBPt>400){LBP=typeof kpPeople==="function"?kpPeople():[];LBPt=n}return LBP}
/* the person a RAW line is about: the first person named (outside brackets), never her; staff elders by their call ("Tống ma ma") */
function lbWho(h){try{const t=lbPlain(h).replace(/\([^)]*\)/g," ");let best=null,at=1e9;
  const L=lbPeople();/* an elder (Tống ma ma…) owns a line only when SHE speaks or tells it ("Tống ma ma: “…”", "Tống ma ma dặn thêm"), not when a chapter goal names her */
  try{if(typeof elders==="function")for(const s of elders())for(const n of [s.call,s.name])if(n&&(t.startsWith(n)||t.includes(n+":")||t.includes(n+" dặn thêm"))){const i=t.startsWith(n)?0:t.indexOf(n);if(i<at){at=i;best=n}}}catch(e){}
  for(const [n,p] of L){if(!n||p===S||n.length<3)continue;const i=t.indexOf(n);if(i>=0&&i<at){at=i;best=n}}
  /* "Ngươi …" / "Ta …" at the very start = her own line */
  if(best&&/^(Ngươi|Ta)\b/.test(t)&&at>0)return null;return best}catch(e){return null}}
function lbFind(name){if(!name)return null;try{const L=lbPeople();const x=L.find(([n])=>n===name);if(x)return x[1];
  if(typeof elders==="function"){const s=elders().find(s=>s.call===name||s.name===name);if(s)return s}}catch(e){}return null}
window.lbFind=lbFind;
/* the notice queue: lines of class (a) wait in S.lbQ (kept in the save) until no dialog is open; ONE notice per buổi (S.lbAt) */
const LB={shown:[],t:0};
function lbKey(){return (S.turn||0)+"."+(S.tuan||0)+"."+(S.buoi||0)}
function lbSeen(t){const k=t.slice(0,28);return LB.shown.some(x=>x.includes(k))}
function lbFlush(){LB.t=0;try{if(!S||S.dead||S.mg||!S.lbQ||!S.lbQ.length||window.__bot||window.__lbOff)return;if(typeof Q!=="undefined"&&Q.length)return;
  if(S.lbAt===lbKey())return;/* one per buổi: the rest waits for the next buổi */
  const L=S.lbQ.filter(x=>!lbSeen(lbPlain(x)));S.lbQ=[];if(!L.length)return;S.lbAt=lbKey();
  const more=L.length>LBMAX?L.length-LBMAX:0;const facts=L.slice(0,LBMAX).map(x=>x.replace(/<i class="kw"[^>]*><\/i>/g,""));
  if(more)facts.push(`Còn ${more} việc nữa, xem trong Tuần lục.`);
  let sub="";try{sub=typeof BUOI!=="undefined"&&BUOI[S.buoi||0]||""}catch(e){}
  kitPanel({kind:"notice",title:"Việc đáng nhớ",sub:sub||"Vừa xảy ra",cls:"klbao",facts,btn:"Đã hiểu"});if(typeof showModal==="function")showModal()}catch(e){console.error("lbFlush",e)}}
function lbLater(){if(!LB.t)LB.t=setTimeout(lbFlush,700)}/* a moment after the buổi settles: never inside the buổi's own work */
(function(){if(typeof log!=="function")return;const l0=log;log=function(h){
  if(typeof h!=="string"||!S)return l0.apply(this,arguments);
  const who=lbWho(h),cls=lbClass(h),seq=S.logSeq||0;const r=l0.apply(this,arguments);
  try{if((S.logSeq||0)!==seq&&S.logs&&S.logs[0]){S.logs[0]=lbTidy(S.logs[0]);if(who)S.logs[0]+=`<i class="kw" data-w="${String(who).replace(/"/g,"")}"></i>`;
    if(cls){/* the dialog on screen already says it? then it is seen */let onScr="";try{const m=document.getElementById("modal");if(m&&!m.hidden)onScr=lbPlain(m.textContent)}catch(e){}
     const t=lbPlain(S.logs[0].replace(/<span class="ld">[^<]*<\/span>/,""));if(!(onScr&&onScr.includes(t.slice(0,28)))){(S.lbQ=S.lbQ||[]).push(S.logs[0].replace(/<span class="ld">[^<]*<\/span>/,""));lbLater()}}}}catch(e){}
  return r}})();
/* what she reads in a dialog counts as seen */
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{const m=document.getElementById("modal");if(m&&!m.hidden){LB.shown.push(lbPlain(m.textContent));if(LB.shown.length>12)LB.shown.shift()}}catch(e){}return r}})();
(function(){if(typeof closeModal!=="function")return;const c0=closeModal;closeModal=function(){const r=c0.apply(this,arguments);try{if(S&&S.lbQ&&S.lbQ.length&&!Q.length)lbLater()}catch(e){}return r}})();
(function(){if(typeof render!=="function")return;const r0=render;render=function(){const r=r0.apply(this,arguments);try{if(S&&S.lbQ&&S.lbQ.length&&!Q.length&&!LB.t)lbLater()}catch(e){}return r}})();
window.LOGBAO=LOGBAO;window.lbTidy=lbTidy;window.lbClass=lbClass;window.logOnce=logOnce;

/* ================= SỔ GHI KEEPS EVERY CARD (tuanluc-sync item 7, owner 17/11 03:34Z verbatim: "Đúng ra cái sổ ghi là phải lưu lại tất cả mọi
   thứ xảy ra từ nhỏ tới lớn.") =================
   Every KẾT QUẢ card (#rtoast result card, KIT §7) and every dialog card (VIỆC / BÁO / TIN / event, the modal queue) she is shown is kept IN FULL
   — title, text, Được / Mất / Kèm rows, who — in S.cards (kept in the save, newest BAL-free cap LBCARDS) and shown in the Sổ ghi at the moment it
   happened, between the log lines. Kept OUT of S.logs on purpose: the cards restate numbers ("Sức 91→100") that the Sổ ghi replay (jlogsync) and
   the Tuần lục (j87) already count once. Markup = the card's own kit parts (seal + title, .kb kit rows, kitKemRow) — no new frame or CSS. */
const LBCARDS=60;
function lbCardKeep(h,key){try{if(!S||!h)return;S.cards=S.cards||[];const k=lbKey()+"|"+key;if(S.cards.some(c=>c.k===k))return;const h4=String(h).slice(0,4000);const kt=String(key).split("|").slice(0,2).join("|")+"|";if(S.cards.slice(0,3).some(c=>c.h===h4&&String(c.k).includes("|"+kt)))return;/* the very same card (same rows, same numbers) caught by two hooks a tick apart = one */
  let d="";try{d=`T${S.month}/${S.year} ${TUAN[S.tuan]}`}catch(e){}
  S.cards.unshift({q:S.logSeq||0,k,d,h:String(h).slice(0,4000)});if(S.cards.length>LBCARDS)S.cards.length=LBCARDS}catch(e){}}
const lbStrip=h=>String(h||"").replace(/<(img|video|audio|canvas|svg|button|figure|picture)\b[\s\S]*?(<\/\1>|\/?>)/gi,"").replace(/<(script|style)\b[\s\S]*?<\/\1>/gi,"")
  .replace(/\s(on\w+|id|data-a|data-k|tabindex|role)="[^"]*"/g,"").replace(/<span class="kalog"[\s\S]*?<\/span>/,"");
/* the KẾT QUẢ card: what the toast really showed, after every wrapper (j63 resultShow calls lbCardRes a tick after it fills #rtoast) */
/* same title + same log moment but other rows (two acts with one name in a buổi) = another card: the key carries the text hash */
const lbHash=t=>{let h=0;for(let i=0;i<t.length;i++)h=(h*31+t.charCodeAt(i))|0;return (h>>>0).toString(36)};
function lbCardRes(title,any){try{const t2=document.getElementById("rtoast");const rt=t2&&(any||t2.classList.contains("on"))&&t2.querySelector(".rt");if(rt)lbCardKeep(`<span class="klk">${lbStrip(rt.innerHTML)}</span>`,"kq|"+lbPlain(String(title||"")).slice(0,60)+"|"+lbHash(lbPlain(rt.innerHTML)))/* no log counter in the key: the two hooks a tick apart (a log between them) keep ONE card */}catch(e){}}
window.lbCardRes=lbCardRes;
/* … and any other path that fills the result card (outermost wrapper: a card some wrapper builds itself) */
(function(){if(typeof resultShow!=="function")return;const r0=resultShow;resultShow=function(title){if(window.__tsNoRes)return r0.apply(this,arguments);/* jts holds this card back (shown later under its own title) */const tt=document.getElementById("rtoast");const h0=tt?tt.innerHTML:"";const r=r0.apply(this,arguments);
  setTimeout(()=>{try{const t2=document.getElementById("rtoast");if(t2&&t2.innerHTML!==h0)lbCardRes(title,1)}catch(e){}},20);return r}})();
/* a dialog card: title + its text and rows (not menus without a title) */
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{const q=typeof Q!=="undefined"&&Q[0];const m=document.getElementById("modal");
  if(q&&q.t&&m&&!m.hidden&&!S.mg){let body=lbStrip(typeof q.h==="string"?q.h:"");if(!lbPlain(body)){const mb=m.querySelector("#mb");if(mb)body=lbStrip(mb.innerHTML)}const qw=q.who&&typeof q.who==="object"?(q.who.name||q.who.n||(q.who.__kp&&q.who.__kp.name)||""):q.who;const who=qw?lbPlain(String(qw)).slice(0,40):"";/* who may be a portrait object: its name, never "[object Object]" */
   const opts=Array.isArray(q.opts)&&q.opts.length?`<span class="kb"><span class="kr"><span class="krl">Lựa chọn</span><span class="krv">${q.opts.map(o=>`<span class="ef n">${lbPlain(o.n||"")}</span>`).join('<span class="ksep">·</span>')}</span></span></span>`:"";
   lbCardKeep(`<b>${lbPlain(String(q.t))}</b>${who&&!lbPlain(body).includes(who)?` · ${who}`:""} ${body}${opts}`,"dl|"+lbPlain(String(q.t)).slice(0,40)+"|"+lbPlain(body).slice(0,60))}}catch(e){}return r}})();
/* shown in the Sổ ghi: each kept card sits above the first log line written before it */
(function(){if(typeof renderPanel0!=="function")return;const p0=renderPanel0;renderPanel0=function(){const r=p0.apply(this,arguments);try{
  if(typeof tab==="undefined"||tab!=="log"||!S||!S.cards||!S.cards.length)return r;const box=document.querySelector("#panel .logs");if(!box)return r;
  const rows=[...box.children];const top=S.logSeq||0;let ri=0;
  for(const c of S.cards){while(ri<rows.length&&top-ri>c.q)ri++;const el=document.createElement("div");el.dataset.card="1";el.dataset.nrk="1";el.dataset.nrh="1";/* j65 kitNames must not paint the names a 2nd time (they are the card's own kit names: "Hoàng hậu Hoàng hậu X") */el.innerHTML=`<span class="ld">${c.d||""}</span>${c.h}`;
   if(ri<rows.length)rows[ri].before(el);else box.appendChild(el)}}catch(e){console.error("lbCards",e)}return r}})();
window.lbCardKeep=lbCardKeep;
