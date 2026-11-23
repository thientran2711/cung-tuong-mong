/* j84 — VĂN PHONG: every player-visible word in one classical (cổ trang) register. Style guide: dev/kit/VANPHONG.md.
   Must stay the LAST module. It changes no rule or number: (1) data patches (tab names, tooltips); (2) one replacement
   table window.VP applied to text nodes and to title/aria-label/placeholder/data-s attributes as they appear on screen
   (MutationObserver), never to HTML source, inputs or textareas; (3) servant address by the player's rank inside quoted
   speech (tiểu chủ below Tần, nương nương from Tần). VP.fix(str) / VP.date(m,y,tuan,buoi) are for other modules and the kit. */
(function(){
const MON=["giêng","hai","ba","tư","năm","sáu","bảy","tám","chín","mười","mười một","chạp"];
const U=["","một","hai","ba","bốn","năm","sáu","bảy","tám","chín"];
function num(n){n=+n;if(!(n>=0)||n>99)return String(n);if(n===0)return"không";if(n<10)return U[n];if(n===10)return"mười";const t=Math.floor(n/10),u=n%10;
  const head=t===1?"mười":U[t]+" mươi";if(!u)return head;const tail=u===5?"lăm":u===1&&t>1?"mốt":u===4&&t>1?"tư":U[u];return head+" "+tail}
function ord(n){n=+n;return n===1?"nhất":n===4?"tư":num(n)}
function mon(m){m=+m;return MON[m-1]||String(m)}
function cap(s){return s.charAt(0).toUpperCase()+s.slice(1)}
function date(m,y,tuan,buoi){let s=`Tháng ${mon(m)}, năm thứ ${ord(y)}`;if(tuan!=null&&typeof TUAN!=="undefined")s+=", "+TUAN[tuan];if(buoi!=null&&typeof BUOI!=="undefined")s+=", "+String(BUOI[buoi]).toLowerCase();return s}
const B="(?<![\\p{L}\\d])",E="(?![\\p{L}\\d])";
const R=(src,f="g")=>kRx(src,f+"u");/* kRx: lookbehind that also runs on Safari < 16.4 (j0) */
const srvMode=()=>{try{return typeof isSrv==="function"&&!!S&&isSrv()}catch(e){return false}};/* servant start: "Chủ tin" is the mistress's trust in HER — keep the word */
/* ordered phrase rules: [regex, replacement|function] */
const RULES=[
 /* internal attack tags "[Tung tin đồn · Tùy duyên · hỏng]" → a sentence */
 [/^\[([^\[\]]+?) · (thành|hỏng)\]$/u,(m,a,ok)=>{const p=a.split(" · ");const x=p[0],y=p[1];return `«${x}» nhắm vào ngươi${y?` (việc ${y.toLowerCase()})`:""}: ${ok==="thành"?"đã thành":"không thành"}.`}],
 /* dates */
 [R(B+"T(\\d{1,2})\\/(\\d{1,3})( · | )(thượng|trung|hạ) tuần"),(m,a,b,s,t)=>`Tháng ${mon(a)}, năm thứ ${ord(b)} · ${t} tuần`],
 [R(B+"T(\\d{1,2})\\/(\\d{1,3})"+E),(m,a,b)=>`Tháng ${mon(a)}, năm thứ ${ord(b)}`],
 [R(B+"([Nn])ăm (\\d{1,3}), tháng (\\d{1,2}), "),(m,n,y,mm)=>`${n==="N"?"Tháng":"tháng"} ${mon(mm)}, năm thứ ${ord(y)}, `],
 [R(B+"Năm (\\d{1,3}) · Tháng (\\d{1,2}) · (?:(Thượng|Trung|Hạ) tuần)?"),(m,y,mm,t)=>`Tháng ${mon(mm)} · năm thứ ${ord(y)} · ${t?t.toLowerCase()+" tuần":""}`],
 [R(B+"([Tt])háng (\\d{1,2}), năm (\\d{1,3})"+E),(m,t,mm,y)=>`${t}háng ${mon(mm)}, năm thứ ${ord(y)}`],
 [R(B+"năm thứ (\\d{1,3})"+E),(m,y)=>`năm thứ ${ord(y)}`],
 [R("(^|[.(]\\s?)([Nn])ăm (\\d{1,3})(?=[,)])"),(m,p,n,y)=>`${p}${n}ăm thứ ${ord(y)}`],
 [R(B+"([Tt])háng (\\d{1,2})(?![\\d\\/]| tuổi| tháng)"),(m,t,mm)=>+mm>=1&&+mm<=12?`${t}háng ${mon(mm)}`:m],
 /* art levels */
 [/^B([1-5]): /,"Bậc $1: "],
 /* save book */
 [R("(?<!\\p{L})Ô (\\d)(?!\\d)"),(m,d)=>"Sổ "+num(d)],["Ô trống","Sổ chưa ghi"],["chọn ô khác","chọn sổ khác"],
 ["chép ván thành mã chữ","chép kiếp thành bản chép"],["chưa có ván nào","chưa có kiếp nào"],["dán mã để nạp ván","dán bản chép để nạp"],
 ["Xuất ván","Chép sổ"],["Nhập ván","Nạp sổ"],["Đọc mã","Đọc bản chép"],["Đã chép mã.","Đã chép."],["chép mã trong ô","chép chữ trong khung"],
 ["Mã không chứa ván chơi.","Bản chép không có kiếp nào."],["Dán mã ván","Dán bản chép"],["Mã ván","Bản chép"],
 [/Phiên bản ván \(([^)]*)\) không hợp với bản game này\./,"Bản chép này ($1) không hợp với bản hiện nay."],["đang có ván ","đang ghi kiếp "],
 [R(B+"(\\d+) ký tự"+E),"$1 chữ"],["Chắc chắn ghi","Quyết ghi"],["tải lại trang","mở lại"],
 /* sound settings */
 ["Bật âm thanh","Mở tiếng"],["Tắt âm thanh","Im tiếng"],["Hiệu ứng âm","Tiếng động"],["Tắt tiếng","Im tiếng"],["Hiệu ứng hình","Cảnh động"],
 /* panels, help lines */
 ["Chạm để đóng","Chạm để lui"],["đầy đủ ở Nhật ký","đầy đủ trong Sổ ghi"],["Nhật ký","Sổ ghi"],["Tuyến truyện","Mệnh truyện"],["Bản đồ","Dư đồ"],
 ["Mở tab ","Vào mục "],["Mở rộng bảng chỉ số","Mở bảng"],["Thu gọn bảng chỉ số","Thu bảng"],["Thu gọn","Thu lại"],["Mở rộng","Mở ra"],
 ["không đổi chỉ số","không đổi gì"],[R(B+"Bấm"+E),"Chạm"],[R(B+"bấm"+E),"chạm"],
 /* modern words */
 ["Xét nghiệm","Nghiệm độc"],["xét nghiệm","nghiệm độc"],["Kiểm tra","Soát"],["kiểm tra","soát"],["cơ hội được","thêm dịp được"],["cơ hội","cơ duyên"],
 ["bảng điểm","bảng định thứ"],[R(B+"(?<![Tt]rang )điểm(?! tâm| trang)"+E),"phần"],[R(B+"Điểm(?! trang)"+E),"Phần"],
 ["Đến lượt ngươi","Tới phiên ngươi"],["Lật hai ô một lượt, tìm đủ các cặp giống nhau trong số lượt cho phép.","Mỗi hồi lật hai thẻ, tìm đủ các cặp giống nhau trong số hồi cho phép."],
 [R(B+"Lượt"+E),"Hồi"],[R(B+"lượt"+E),"hồi"],
 ["người bạn","người quen"],["Bạn trong cung","Người quen trong cung"],["Bạn (thiện","Người quen (thiện"],["cần bạn ","cần người quen "],
 ["nghe bạn là","nghe người quen là"],["bạn mạnh","kẻ mạnh"],["bỏ bạn ","bỏ người quen "],
 /* the player's own acts: narration calls her "ngươi" */
 ["Mời đến cung ta","Mời nàng sang cung"],
 /* owner 11/15 (final names): narrator / UI text names the player in the FIRST person — "ngươi" → "ta" ("Con của ta", "Hoàng hậu
    với ta", "Ta với Quý phi"). NPC speech keeps "ngươi": anything inside “…” (also a quote that opens or closes in another text node)
    is left as it is. Applied on screen only, so code that matches "ngươi" in logs (and old saves) is unchanged. List: NAMING_APPLIED.md */
 /* review 11/15 (sub-odds): relation lines in old event cards "Thái hậu với ngươi -3" read as the one relation word "quý" (KIT §36.3) */
 /* owner 09:55Z (supersedes "quý"): one relation word, "thiện cảm" (KIT_REL): "X với/quý ngươi|ta ±N" → "X → ta: thiện cảm ±N", a bare "nàng quý ngươi" → "thiện cảm" */
 /* review ts-a r6 (same class as j84 "với ngươi"): "X quý ngươi hơn" is a sentence, not a label: "Họ thiện cảm hơn" → "Họ có thiện cảm với ta hơn" */
 [kRx("(?<![\\p{L}])quý (?:ngươi|ta) hơn(?![\\p{L}])","gu"),"có thiện cảm với ta hơn"],
 [/(Thái hậu|Hoàng hậu|Hoàng thượng|Hắn|hắn) (?:với|quý) (?:ngươi|ta)(?=\s*(?:[-+−]?\d|$|:|,|≥|≤| dưới| từ| \())/g,"$1 → ta: thiện cảm"],
 /* owner 15:30Z ("thiện cảm" trơn): with its subject the label keeps it — "Nàng quý ngươi" → "Nàng → ta: thiện cảm"; "Ngươi quý nàng" → "Ta → nàng: thiện cảm"
    (review fix-float r9: same label-only lookaheads as ts-a 11/15 below — "với ngươi" only before a number or ":") */
 [kRx("(?<![\\p{L}])([Nn])àng(?: ta)? (?:quý (?:ngươi|ta)(?=\\s*(?:[-+−]?\\d|$|:|,|≥|≤| dưới| từ| \\())|với (?:ngươi|ta)(?=\\s*(?:[-+−]?\\d|:)))","gu"),"$1àng → ta: thiện cảm"],
 [kRx("(?<![\\p{L}])(?:[Nn]gươi|Ta) (?:quý nàng(?: ta)?(?=\\s*(?:[-+−]?\\d|$|:|,|≥|≤| dưới| từ| \\())|với nàng(?: ta)?(?=\\s*(?:[-+−]?\\d|:)))","gu"),"Ta → nàng: thiện cảm"],
 /* ts-a 11/15: "với ngươi" is a relation label only before a number or ":" — "ra tay với ngươi, …", "hẹn ước với ngươi, …",
    "thân với ngươi hơn" are sentences (they became "ra tay thiện cảm," before) and only get "ngươi" → "ta" below */
 [kRx("(?<![\\p{L}])(?:[Nn]àng(?: ta)? )?(?:quý (?:ngươi|ta)(?=\\s*(?:[-+−]?\\d|$|:|,|≥|≤| dưới| từ| \\())|với (?:ngươi|ta)(?=\\s*(?:[-+−]?\\d|:)))","gu"),"thiện cảm"],
 /* NPC ↔ NPC "thân +7" (j8 giveTo, old logs): the one relation word */
 [kRx("(?<![\\p{L}])thân ([+\\-−]\\s?\\d)","gu"),"thiện cảm $1"],
 [kRx("^[^“”]*”|“[^”]*(?:”|$)|(?<![\\p{L}\\p{M}])([Nn])gươi(?![\\p{L}\\p{M}])","gu"),(m,n)=>n?(n==="N"?"Ta":"ta"):m],
 /* servant words (owner 11/15 10:10Z, VANPHONG §1; KIT_REL): one word for the servant's attitude to her, one for her trust in him */
 /* another person is "nàng ta", never a bare "nàng" (owner 11/15: a bare "nàng" reads as the player) — kitThey(p) in jaudit */
 /* story-voice (owner 21/11 #61): speech inside “…” keeps its own «nàng» — the Emperor says «Nàng nghĩ sao?» TO her (kAddr), never «Nàng ta»; same quote skip as «ngươi» above */
 [R("^[^“”]*”|“[^”]*(?:”|$)|(?<!(?:→|oán|quý|với|ghen) )"+B+"([Nn])àng"+E+"(?! ta"+E+")(?! ấy"+E+")(?! (?:oán|ghen|→|quý|thương)"+E+")"),(m,n)=>n?n+"àng ta":m],/* "Nàng oán ta", "Nàng → ta", "Ta → nàng" stay (owner 15:30Z: never "Nàng ta oán ta") */
 [kRx("(?<![\\p{L}])([Nn])àng ta (?=(?:oán ta|→ ta|ghen)(?![\\p{L}]))","gu"),"$1àng "],
 [R(B+"cần Chủ tin"),m=>srvMode()?m:"cần tin cậy"],[R(B+"Chủ tin với "),m=>srvMode()?m:"tin cậy "],[R(B+"Chủ tin"+E),m=>srvMode()?m:"Ta tin cậy"],[R(B+"chủ tin"+E),m=>srvMode()?m:"tin cậy"],
 ["Lòng cung nữ","Thiện cảm của cung nữ"],[R(B+"Lòng(?= [+\\-−]?\\d)"),"Thiện cảm"],[R(B+"Lòng(?= \\p{Lu}[\\p{L}]*( \\p{Lu}[\\p{L}]*)? [+\\-−]?\\d)"),"Thiện cảm"],
 [R(B+"lòng(?= [+\\-−]\\d)"),"thiện cảm"],
 /* review/small-bugs-3: the old relation word "thân ±N" (old saves' Sổ ghi / Tuần lục lines) reads as "thiện cảm ±N" */
 [R("(?<!(?:[Xx]uất|[Bb]ản|[Pp]hụ|[Mm]ẫu|[Kk]ết) )"+B+"(?:[Nn]àng )?thân(?= [+\\-−]\\d)"),"thiện cảm"],[R(B+"lòng (còn )?dưới (?=\\d)"),"thiện cảm $1dưới "],[R(B+"Lòng"+E+"(?=\\s*$)"),"Thiện cảm"]
];
/* whole-text exact labels (trimmed) */
const FULL={"Cung ngươi":"Cung ta","Lòng":"Thiện cảm","lòng":"thiện cảm","Đang cài":"Đang mặc","Đang đeo":"Đang mặc","Đang dùng":"Đang mặc","Đã rõ":"Đã hiểu","Đóng":"Lui","✕ Đóng":"✕ Lui","Hành động":"Hành sự","Quan hệ":"Giao tình","Chỉ số":"Tư chất"};
/* save-slot words only on the title screen / save-book panel */
const SLOT={"Trống":"Chưa ghi","trống":"chưa ghi"};
const QUICK=/quý (ngươi|ta)|thân [+\-−]|với ngươi|[Nn]àng|[Ll]òng|Đang (cài|đeo|dùng)|[Cc]hủ tin|Cung ngươi|T\d|[Nn]ăm \d|[Tt]háng \d|năm thứ \d|^B[1-5]:|Ô |ô |\[|Nhật ký|Tuyến truyện|Bản đồ|tab |[Xx]ét nghiệm|[Kk]iểm tra|chỉ số|Thu gọn|Mở rộng|cơ hội|[Ll]ượt|tải lại|[Bb]ấm|[Bb]ạn|[Đđ]iểm|ván|[Mm]ã|ký tự|Chắc chắn ghi|âm thanh|Hiệu ứng|Tắt tiếng|cung ta|Mục Việc|[Nn]ương nương|Đóng|Đã rõ|Hành động|Quan hệ|Chỉ số|[Tt]rống|[Nn]gươi/;
function lowRank(){/* one address core (jvoice kAddr, VANPHONG §2): what her own servant calls her */try{return !!(S&&!(typeof isSrv==="function"&&isSrv())&&kAddr({srv:"f"},S,{m:"cool"}).goi==="tiểu chủ")}catch(e){return false}}
function addr(s){/* servants/eunuchs speaking to the player: tiểu chủ below Tần */
  if(!/[Nn]ương nương/.test(s)||!lowRank())return s;
  s=s.replace(/“[^”]*”/g,q=>/Nương nương (sang|đi vắng)/.test(q)?q:q.replace(/Hoàng hậu nương nương/g,"\u0000").replace(/Nương nương/g,"Tiểu chủ").replace(/nương nương/g,"tiểu chủ").replace(/\u0000/g,"Hoàng hậu nương nương"));
  return s.replace(/quỳ xin nương nương/g,"quỳ xin tiểu chủ")}
function fix(s,el){if(s==null)return s;s=String(s);if(!QUICK.test(s))return s;
  const t=s.trim();if(t){const lead=s.slice(0,s.indexOf(t)),tail=s.slice(s.indexOf(t)+t.length);
    if(FULL[t])return lead+FULL[t]+tail;
    if(SLOT[t]&&el&&el.closest&&el.closest("#title,#slots,.xio,[data-xt],[data-xs]"))return lead+SLOT[t]+tail}
  for(const [a,b] of RULES){if(typeof a==="string"){if(s.includes(a))s=s.split(a).join(b)}else s=s.replace(a,b)}
  return addr(s)}
const SKIP=/^(SCRIPT|STYLE|TEXTAREA|INPUT|NOSCRIPT|SELECT|OPTION)$/;
const ATTR=["title","aria-label","placeholder","data-s","data-l0","data-s0"];
let busy=false,changed=0;
/* review/small-bugs-3: an item name is a common noun — mid-sentence it is written in lower case ("tặng trâm gỗ đào cho …"; VANPHONG §1
   "Tên món đồ"). Standing alone (item cell, card title, chip, start of a sentence or line) it keeps its capital. Proper names inside the
   name keep theirs ("vòng ngọc Hòa Điền"). One rule for every log / news / Tuần lục / card line (old saves too): names from IT + WD_ITEMS. */
let ITRX=null,ITN=-1,ITT=0;
function itRx(){const now=Date.now();if(ITRX!==null&&now-ITT<4000)return ITRX;ITT=now;const L=[];
  try{for(const k in IT){const n=IT[k]&&itm(k).n;if(n)L.push(n)}}catch(e){}
  try{if(typeof WD_ITEMS==="object")for(const k in WD_ITEMS){const n=WD_ITEMS[k]&&WD_ITEMS[k].n;if(n)L.push(n)}}catch(e){}
  if(L.length===ITN&&ITRX)return ITRX;ITN=L.length;const U=[...new Set(L.filter(n=>n.length>=3&&/^\p{Lu}\p{Ll}/u.test(n)&&/ /.test(n)||/^(A giao|Xạ hương|Yến sào)$/.test(n)))].sort((a,b)=>b.length-a.length);
  ITRX=U.length?kRx("(?<![\\p{L}\\p{M}\\d])(?:"+U.map(x=>x.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")).join("|")+")(?![\\p{L}\\p{M}\\d])","gu"):false;return ITRX}
const ITMID=/[\p{L}\p{M}\d,:)]\s+$/u;
function itemLow(s,before){if(!s||!/\p{Lu}/u.test(s))return s;const rx=itRx();if(!rx)return s;rx.lastIndex=0;
  return s.replace(rx,(m,i)=>ITMID.test((before||"")+s.slice(0,i))?m.charAt(0).toLowerCase()+m.slice(1):m)}
const INL=/^(B|I|SPAN|EM|STRONG|SMALL|A|U|MARK)$/;
function prevText(n){let x=n;for(let d=0;d<3&&x;d++){let p=x.previousSibling;while(p&&p.nodeType===8)p=p.previousSibling;if(p)return (p.textContent||"").slice(-40);
  x=x.parentElement;if(!x||!INL.test(x.tagName))return""}return""}
function fixText(n){const p=n.parentElement;if(!p||SKIP.test(p.tagName)||p.closest("[data-vp-skip]"))return;const v=n.nodeValue;let t=fix(v,p);try{t=itemLow(t,prevText(n))}catch(e){}if(t!==v){n.nodeValue=t;changed++}}
function fixAttr(el,a){const v=el.getAttribute(a);if(!v)return;const t=fix(v,el);if(t!==v){el.setAttribute(a,t);changed++}}
function fixEl(el){if(el.nodeType===3)return fixText(el);if(el.nodeType!==1||SKIP.test(el.tagName))return;
  for(const a of ATTR)if(el.hasAttribute(a))fixAttr(el,a);
  el.querySelectorAll("[title],[aria-label],[placeholder],[data-s],[data-l0]").forEach(x=>{for(const a of ATTR)if(x.hasAttribute(a))fixAttr(x,a)});
  const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;const L=[];while(n=w.nextNode())L.push(n);L.forEach(fixText)}
/* data patches */
const TABS={act:["Hành sự","Hành sự"],go:["Dư đồ","Dư đồ"],rv:["Phi tần","Phi tần"],rel:["Ân oán","Ân oán"],court:["Chí tôn","Chí tôn"],men:["Nam nhân","Nam nhân"],fac:["Phe phái","Phe"],staff:["Cung nhân","Cung nhân"],kid:["Hoàng tự","Hoàng tự"],inv:["Tư trang","Tư trang"],art:["Tài nghệ","Tài nghệ"],story:["Mệnh truyện","Mệnh"],log:["Sổ ghi","Sổ ghi"]};
function patchTabs(){document.querySelectorAll("#tabs button[data-tab]").forEach(b=>{const T=TABS[b.dataset.tab];if(!T)return;
  if(b.dataset.l0!=null){b.dataset.l0=T[0];b.dataset.s0=T[1]}if(!(typeof isSrv==="function"&&isSrv())){b.textContent=T[0];b.dataset.s=T[1]}})}
/* maid-8tabs: the cung nữ tab names live in jroad8 ROAD8 (the SRVTABS rename is gone) */
try{if(typeof HX==="object"){HX.hh="Lòng Hoàng hậu đối với ngươi. Càng cao càng được che chở; thấp quá sẽ bị làm khó, chặn đường thăng phẩm.";
  HX.date="Ngày tháng trong cung. Mỗi tháng ba tuần (thượng, trung, hạ tuần), mỗi tuần bốn buổi.";
  /* jreg: help texts added by later modules get the same wording fix */
  regEach(HX,k=>{if(typeof HX[k]==="string")HX[k]=fix(HX[k])},"HX wording")}}catch(e){}
patchTabs();
const mo=new MutationObserver(ms=>{if(busy)return;busy=true;try{for(const m of ms){if(m.type==="characterData")fixText(m.target);else if(m.type==="attributes")fixAttr(m.target,m.attributeName);else m.addedNodes.forEach(fixEl)}}finally{busy=false}});
function boot(){fixEl(document.body);mo.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:ATTR})}
if(document.body)boot();else document.addEventListener("DOMContentLoaded",boot);
document.title=fix(document.title);
window.VP={fix,itemLow,date,num,ord,mon,rules:RULES,full:FULL,tabs:TABS,refresh:()=>{patchTabs();fixEl(document.body)},get changed(){return changed}};
})();
