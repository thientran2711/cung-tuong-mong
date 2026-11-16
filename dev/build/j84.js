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
const R=(src,f="g")=>new RegExp(src,f+"u");
/* ordered phrase rules: [regex, replacement|function] */
const RULES=[
 /* internal attack tags "[Tung tin đồn · Năm ăn năm thua · hỏng]" → a sentence */
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
 ["bảng điểm","bảng định thứ"],[R(B+"điểm(?! tâm| trang)"+E),"phần"],[R(B+"Điểm(?! trang)"+E),"Phần"],
 ["Đến lượt ngươi","Tới phiên ngươi"],["Lật hai ô một lượt, tìm đủ các cặp giống nhau trong số lượt cho phép.","Mỗi hồi lật hai thẻ, tìm đủ các cặp giống nhau trong số hồi cho phép."],
 [R(B+"Lượt"+E),"Hồi"],[R(B+"lượt"+E),"hồi"],
 ["người bạn","người quen"],["Bạn trong cung","Người quen trong cung"],["Bạn (thiện","Người quen (thiện"],["cần bạn ","cần người quen "],
 ["nghe bạn là","nghe người quen là"],["bạn mạnh","kẻ mạnh"],["bỏ bạn ","bỏ người quen "],
 /* the player's own acts: narration calls her "ngươi" */
 ["Mời đến cung ta","Mời nàng sang cung"],["Mục Việc:","Mục Phận sự:"]
];
/* whole-text exact labels (trimmed) */
const FULL={"Đã rõ":"Đã hiểu","Đóng":"Lui","✕ Đóng":"✕ Lui","Hành động":"Hành sự","Quan hệ":"Giao tình","Chỉ số":"Tư chất"};
/* save-slot words only on the title screen / save-book panel */
const SLOT={"Trống":"Chưa ghi","trống":"chưa ghi"};
const QUICK=/T\d|[Nn]ăm \d|[Tt]háng \d|năm thứ \d|^B[1-5]:|Ô |ô |\[|Nhật ký|Tuyến truyện|Bản đồ|tab |[Xx]ét nghiệm|[Kk]iểm tra|chỉ số|Thu gọn|Mở rộng|cơ hội|[Ll]ượt|tải lại|[Bb]ấm|[Bb]ạn|[Đđ]iểm|ván|[Mm]ã|ký tự|Chắc chắn ghi|âm thanh|Hiệu ứng|Tắt tiếng|cung ta|Mục Việc|[Nn]ương nương|Đóng|Đã rõ|Hành động|Quan hệ|Chỉ số|[Tt]rống/;
function lowRank(){try{return !!(S&&S.rank<3&&!(typeof isSrv==="function"&&isSrv()))}catch(e){return false}}
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
function fixText(n){const p=n.parentElement;if(!p||SKIP.test(p.tagName)||p.closest("[data-vp-skip]"))return;const v=n.nodeValue;const t=fix(v,p);if(t!==v){n.nodeValue=t;changed++}}
function fixAttr(el,a){const v=el.getAttribute(a);if(!v)return;const t=fix(v,el);if(t!==v){el.setAttribute(a,t);changed++}}
function fixEl(el){if(el.nodeType===3)return fixText(el);if(el.nodeType!==1||SKIP.test(el.tagName))return;
  for(const a of ATTR)if(el.hasAttribute(a))fixAttr(el,a);
  el.querySelectorAll("[title],[aria-label],[placeholder],[data-s],[data-l0]").forEach(x=>{for(const a of ATTR)if(x.hasAttribute(a))fixAttr(x,a)});
  const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT);let n;const L=[];while(n=w.nextNode())L.push(n);L.forEach(fixText)}
/* data patches */
const TABS={act:["Hành sự","Hành sự"],go:["Dư đồ","Dư đồ"],rv:["Phi tần","Phi tần"],rel:["Giao tình","Giao tình"],fac:["Phe phái","Phe"],staff:["Cung nhân","Cung nhân"],kid:["Hoàng tự","Hoàng tự"],inv:["Tư trang","Tư trang"],art:["Tài nghệ","Tài nghệ"],story:["Mệnh truyện","Mệnh"],log:["Sổ ghi","Sổ ghi"]};
function patchTabs(){document.querySelectorAll("#tabs button[data-tab]").forEach(b=>{const T=TABS[b.dataset.tab];if(!T)return;
  if(b.dataset.l0!=null){b.dataset.l0=T[0];b.dataset.s0=T[1]}if(!(typeof isSrv==="function"&&isSrv())){b.textContent=T[0];b.dataset.s=T[1]}})}
try{if(typeof SRVTABS==="object"&&SRVTABS){if(SRVTABS.act==="Việc")SRVTABS.act="Phận sự";if(SRVTABS.story==="Thân phận")SRVTABS.story="Thân phận"}}catch(e){}
try{if(typeof HX==="object"){HX.hh="Lòng Hoàng hậu đối với ngươi. Càng cao càng được che chở; thấp quá sẽ bị làm khó, chặn đường thăng phẩm.";
  HX.date="Ngày tháng trong cung. Mỗi tháng ba tuần (thượng, trung, hạ tuần), mỗi tuần ba buổi.";
  for(const k in HX)HX[k]=fix(HX[k])}}catch(e){}
patchTabs();
const mo=new MutationObserver(ms=>{if(busy)return;busy=true;try{for(const m of ms){if(m.type==="characterData")fixText(m.target);else if(m.type==="attributes")fixAttr(m.target,m.attributeName);else m.addedNodes.forEach(fixEl)}}finally{busy=false}});
function boot(){fixEl(document.body);mo.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:ATTR})}
if(document.body)boot();else document.addEventListener("DOMContentLoaded",boot);
document.title=fix(document.title);
window.VP={fix,date,num,ord,mon,rules:RULES,full:FULL,tabs:TABS,refresh:()=>{patchTabs();fixEl(document.body)},get changed(){return changed}};
})();
