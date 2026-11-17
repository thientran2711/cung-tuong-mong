/* ================= jopic: OPTION CARD = COMPACT ACT CARD WITH ITS PICTURE LEFT — KIT §6.2 (owner 15/11, review/opt-pics) =================
   Owner (verbatim, repeated): "Hình minh họa cho từng hành động bên trái. Bên phải là thông tin. Tôi nói hoài vậy."
   Markup dev/handover/refs/owner-option-picture-left.jpg (docs branch). Coordinator: ONE act-card form = the COMPACT card of Hậu cung (KIT §43):
   small picture left (~1/4), title + Cần/Tốn/Được/Mất/Gợi ý rows right, height = content; tap the picture = enlarge.
   Owner ruling: one picture per MEANING GROUP (all "nhận lỗi / cúi đầu" share one, all "dâng lễ vật" share one …), reused everywhere.
   ONE place: every dialog option (`#modal .opts` button.ka, kit choice panel `.kpscopts`), after the j63 frame (kaNorm1) built it:
     kpOptArt(b) → `.kaart` slot (kitArtFrame, the act-card picture frame) + `.kabody` (the rows) + classes `kart kopt` → compact CSS (jk4 KIT §43,
     shared rule set kitCompactCSS). The tiny portrait icon in the title (.md, j25 / pickers) leaves the title.
   Picture of an option (kitOptPic(title, b)), first hit wins:
     1. kitActKey(title) — the option IS an act, or ACTS.json already has its own choice picture (act-pics2 "-h" keys);
     2. ACTS.json "log" meaning rules (kbkRules, j87: the Tuần lục picture of that same choice line), key "-" = none;
     3. KIT_OPT_RULES — the meaning groups below (regex on the plain option title) → shared group picture img/act-opt-<group>.webp;
     4. a picture the option already carries (a person's portrait .md img, an item picture) — pickers of people / items;
     5. the KIT §59 act placeholder (light / dark by kitPhTone), recorded once in CTM_MISSING_PICS as kind "opt".
   A key whose file is not on the CDN (img/_index.json) is skipped (next rule).
   Tap / click on the picture = kitPicZoom(src) (does not choose the option). ============================================================ */
const KIT_OPT_RULES=[
 /* review/cycle-art (owner 16/11): the monthly report options (jcycle PEND.cyrep) — before the generic "báo" (tố giác) / "giấu" rules */
 [/^báo đúng ngày/i,"opt-bao-ky-dung"],[/^báo lùi/i,"opt-bao-ky-lui"],[/^báo sớm/i,"opt-bao-ky-som"],[/^giấu, không báo/i,"opt-bao-ky-giau"],
 /* review/placeholder-pics3 (D46b): new main content. "thuê thợ thêu" first so it no longer falls to the padlock rule (opt-canh-giu) further down */
 [/^thuê thợ thêu/i,"opt-thue-tho-theu"],[/^hòa giải/i,"opt-hoa-giai"],[/^răn dạy/i,"opt-ran-day"],[/^xử nghiêng về/i,"opt-xu-nghieng"],
 [/^bảo hắn giả vờ nhận/i,"opt-phan-gian"],[/^thăng làm người thân cận/i,"opt-than-can"],[/^thử lòng bằng một tin giả/i,"opt-tin-gia"],
 [/^tin hắn, thưởng/i,"opt-tin-thuong"],[/^tra xem có kẻ/i,"opt-tra-xem"],[/^khéo để ngài thắng/i,"opt-de-thang"],[/^khéo nói xấu/i,"opt-noi-xau"],
 [/^nói thật, không thêm bớt/i,"opt-thua-trinh"],[/^nói tốt cho/i,"khen-mot-cau-h"],
 /* review/opt-pics2 (D53): meaning groups that had no picture (hands-only gpt-2-6 paintings, ids dev/figwork/optpics2/gens.txt) + reuse of existing act pictures */
 [/^(thêu thật kỹ|thêu cờ)/i,"opt-theu-khuya"],[/(thêu chung|^cùng làm)/i,"opt-lam-chung"],
 [/^(mang canh khuya|sang hầu ngài giữa đêm)/i,"opt-hau-dem"],[/^(ra hồ hầu|theo hầu trọn|tiếp chuyện cả buổi)/i,"opt-hau-ben"],
 [/^(ngắt hoa dâng|làm thơ vịnh)/i,"opt-dang-hoa-tho"],[/^(chỉ bảo|tận tình chỉ bảo|nghiêm túc góp ý)/i,"opt-chi-bao"],
 [/^(bỏ tiền mua bù|bỏ bạc may thêm|góp chút ít)/i,"opt-bo-bac"],[/^(bỏ bạc xin xem một quẻ|treo bùa)/i,"opt-bua-que"],
 [/^(bớt nước cung|phát áo bông)/i,"opt-chia-cung-nhan"],[/^thay hết nước/i,"opt-thay-do"],
 [/^(ra lệnh phòng bị)/i,"opt-canh-giu"],
 [/^(cáo bận việc|hẹn hôm khác)/i,"opt-cao-ban"],[/^tránh mặt/i,"opt-tranh-mat"],[/^(giữ lễ, không|giữ phần mình)/i,"opt-giu-le"],
 [/^(bắt tay với|sang thân thiết)/i,"opt-bat-tay"],[/^đi cùng nàng/i,"opt-di-cung"],[/^lặng lẽ báo cho/i,"opt-thi-tham"],
 [/^can thái hậu/i,"opt-can-ngan"],[/^khắc dấu/i,"opt-gia-mao"],[/^ra tay trước/i,"opt-ra-tay"],[/^cho người mang đi xa/i,"opt-mang-di-xa"],
 [/^bánh bột hấp/i,"opt-banh-la"],[/^thử tài trước sứ thần/i,"opt-trinh-dien"],
 [/^hỏi .*(thái giám|người coi)/i,"do-la-h"],[/^thề thốt/i,"minh-oan-h"],[/^làm như không nghe/i,"lam-nhu-khong-thay-h"],
 [/^tự tay vào bếp/i,"opt-vao-bep"],[/^thuê đầu bếp/i,"opt-thue-dau-bep"],[/^nhường .* phần đẹp/i,"opt-nhuong-phan-dep"],[/^cho nghỉ/i,"opt-nghi-viec"],
 [/^bắt làm tiếp/i,"opt-bat-lam-tiep"],[/^nói thật món ăn/i,"opt-noi-that-mon"],[/^[^()]{4,40} \((liều|khó|năm ăn năm thua|khá|chắc|rất chắc|nắm chắc)\)$/i,"opt-mon-an"],
 [/^nằm yên/i,"o-yen-nghi-h"],[/^ở nhà đọc sách/i,"doc-sach-giai-khuay"],[/^gắng chịu, che mặt/i,"deo-mang-che-h"],
 /* (meaning group → picture key; "opt-*" = painted for this group by review/opt-pics, every other key = an existing act / choice picture reused) */
 /* — leave it / not now — */
 [/^(thôi|bỏ qua|không mua|đóng$|để sau|nghĩ lại|đã rõ|thôi, để sau|thôi, ở lại|cảm ơn, không cần)/i,"opt-thoi"],
 /* r1: "Đi / Vẫn đi" = going, "Ở lại" = staying put — not the turning-away picture */
 [/^(vẫn đi|đi$|đi \()/i,"den-ngay-h"],[/^ở lại/i,"o-yen-nghi-h"],
 [/(che phần lớn)/i,"giau-trong-ruong-h"],
 [/^(im lặng|làm thinh|lặng thinh|nín lặng|cười trừ|giả vờ không hiểu|nghe và giữ kín)/i,"im-lang-h"],
 [/^(không dự|không đến|không dâng lễ|không phát|không bày tiệc|cáo mệt|khéo cáo mệt|bỏ thi|đóng cửa giữ mình|ở yên|ở cung|sống thật thanh tĩnh|để mặc, giữ mình|bình thản chờ|đứng ngoài|mặc kệ|làm ngơ|bỏ mặc|bỏ ngoài tai|mặc họ|không dính vào)/i,"o-yen-nghi-h"],
 [/(ngồi xem|chỉ xem|đứng xem|đứng nhìn|cổ vũ)/i,"dung-xem-h"],
 [/^(không cho|không giao|không bán|khéo từ chối|từ chối|cự tuyệt|không nhận|không chịu|khiêm nhường)/i,"tu-choi-h"],
 [/(trả lại|gửi trả)/i,"tra-lai-qua"],
 /* — named small groups (reused act pictures) — */
 [/(hạ độc|bỏ độc|hạc đỉnh hồng|thạch tín|thuốc độc)/i,"ha-doc"],
 [/(dự thi|ghi tên)/i,"ghi-ten-du-thi-h"],
 [/^(mạng |kết bằng|tìm mạng)/i,"tu-tay-ket-h"],
 [/(nhờ vẽ|cho vẽ|nét bút)/i,"ve-tranh"],
 [/(về phe|kết thân|kết nghĩa|đồng minh)/i,"ket-minh-g-h"],
 [/(tìm lỗi|lật lại chuyện)/i,"do-la-h"],
 [/(sớ)/i,"dang-so"],
 [/(trả nợ|đòi bằng được)/i,"uy-hiep-doi-bac-h"],
 [/(khen)/i,"khen-mot-cau-h"],
 [/(lấy lại lòng hoàng thượng)/i,"tro-chuyen-hoang-thuong"],
 [/(trang sức|phối đồ|điểm trang)/i,"diem-trang-h"],
 [/(hàn lâm|tiến sĩ|mời thầy)/i,"moi-thay-day-nghe-h"],
 /* — humble / apologise / beg — */
 [/(nhận lỗi|nhận tội|tạ lỗi|tạ tội|xin lỗi|cúi đầu đi qua|nhún nhường|hạ mình|^nhịn)/i,"cui-dau-nhan-loi-h"],
 [/(quỳ xin|khóc lóc xin|xin tha|van xin|dập đầu|xin bà cứu)/i,"quy-xin-tha-h"],
 [/^(thưa|bẩm|kể thật|giải thích|phân trần|thanh minh|biện bạch|tự thú)/i,"opt-thua-trinh"],
 [/^(vâng|vâng chỉ|tuân|nhận lời|nhận\b|nhận ngay|đồng ý|tạ ơn|chu toàn lễ nghĩa|giao$)/i,"cui-dau-tuan-lenh-h"],
 /* — gifts / silver — */
 [/(lì xì)/i,"li-xi-h"],
 [/(đút bạc|đưa bạc|bỏ bạc mua|lo lót|hối lộ|mua chuộc|bịt miệng|im miệng)/i,"dut-bac-rut-loi-h"],
 [/(dâng lễ|lễ vật|lễ mọn|mang lễ|gửi lễ|biếu|dâng ngọc|đáp lễ|tặng)/i,"bieu-qua-h"],
 [/(gửi bạc|góp bạc|quyên|cho vay|xóa nợ|cứu lụt|lều cháo|dâng thóc|kèm bạc)/i,"gui-bac-chua-benh-h"],
 [/(cược|ván nhỏ|ván lớn|chơi ván)/i,"cuoc-thien-xa-h"],
 /* — answer back / warn / cold — */
 [/(lạnh nhạt|lạnh lùng|ngoảnh mặt)/i,"lanh-lung-h"],
 [/(cảnh cáo|dọa)/i,"canh-bao-h"],
 [/(đáp|cãi|phản đòn|mắng|vặn lại|khiêu khích|khéo lời hóa giải|đối chất)/i,"dap-tra-mia-h"],
 /* — report / evidence / spy — */
 [/(chứng cứ|kẽ hở|lời khai|nắm lại thóp)/i,"trinh-chung-cu-hh-h"],
 [/(ghi nhớ|ghi lại|trả thù)/i,"ghi-nho-chung-cu-h"],
 [/^(tố\s|mách|báo|kể với|mật báo|tâu|dâng thư|dâng sớ)/i,"to-giac"],
 [/(theo dõi|canh chừng|người canh)/i,"sai-theo-doi"],
 [/(dò|thăm dò|hỏi thẳng|hỏi thăm|hỏi ma ma|gợi chuyện|lục tìm|hỏi cho ra lẽ)/i,"do-la-h"],
 [/^(sai|nhờ|giao cho|đổi .* sang việc khác|đổi hắn)/i,"sai-nguoi-tang-h"],
 [/(xin cung chính ti tra|tra xét)/i,"xin-ht-tra-xet-h"],
 /* — hide / burn / secret love — */
 [/(đốt|xóa mọi dấu|xóa dấu|tiêu hủy)/i,"dot-tho-h"],
 [/(giấu|giữ kín|giữ lại|giữ thư|giữ tín vật|ép cành hoa|cất)/i,"giau-trong-ruong-h"],
 [/(buông tay|quên ta|quên mình|đừng tìm ta|đừng chờ ta|cắt hẳn|ngừng mọi liên lạc|tránh hẳn|giữ khoảng cách|ta còn gia tộc)/i,"opt-buong-tay"],
 [/(lời hẹn|nắm tay|như năm ấy|giả sơn)/i,"hen-gap"],
 /* — harm / timing — */
 [/(thử bằng kim bạc|thử trước|nếm trước|kim bạc)/i,"nghiem-doc-h"],
 [/(vu oan|vu cho|phao tin|tung tin|đồn)/i,"vu-oan-h"],
 [/^(ngày hội đông người|lúc nàng|khi nàng|sau cơn mưa|một đêm vắng)/i,"opt-rinh-cho"],
 [/(phạt|trách|đánh(?! lạc hướng)|quở|đuổi)/i,"phat-vi-h"],
 /* — guard the palace — */
 [/(canh giữ|soát|chuyển đồ quý|đồ quý|giữ đèn nến|che chắn|sửa gấp|thuê thợ|cho người sửa|chắp lại)/i,"opt-canh-giu"],
 [/(hoảng sợ|hô thị vệ|lao vào cứu)/i,"opt-hoang-so"],
 /* — kindness / help / talk — */
 [/(an ủi|vỗ về|khuyên|làm lành)/i,"khuyen-giu-long-the-h"],
 [/(giúp|đỡ lời|nói giúp|che chở|bênh|cứu|tận tâm)/i,"giup-do-nang-h"],
 [/(tiệc|pha trà|mời khách|pha .* mời)/i,"bay-o-yen-tiec-h"],
 [/(chúc mừng|bái kiến|thỉnh an|chào)/i,"bai-kien-h"],
 [/(xin hoàng thượng|xin ngài|xin thái hậu|xin hoàng hậu|ân điển|ban hôn|ban mạng|xin nội vụ|^xin )/i,"xin-an-dien-h"],
 /* — prayer / medicine / children — */
 [/(chép|kinh)/i,"chep-kinh-h"],
 [/(cầu|hương án|cúng|đèn hoa đăng|giữ chay)/i,"cung-duong-dau-den-h"],
 [/(thái y|thuốc|bắt mạch)/i,"thai-y-khac-bat-mach-h"],
 [/(con ôn bài|kèm .*con|cho con|dạy con|chăm|nhận nuôi)/i,"day-con-hoc"],
 /* r1: "chàng" alone (any line about him) is the LAST resort — petitions / help for him hit their own group first */
 [/(chàng)/i,"hen-gap"],
];
const kitOptPlain=s=>String(s||"").replace(/<[^>]+>/g," ").replace(/[\s ]+/g," ").trim();
/* r1 (LUẬT SỬA CẢ NHÓM): a meaning-group hit must be whole words — JS \b does not know Vietnamese letters, so "dò" hit "Viết một dòng",
   "sớ" hit "sớm", "đồn" hit "đồng minh". A match counts only when no letter touches it on either side. */
function kitOptHit(re,t){try{const g=new RegExp(re.source,re.flags.replace("g","")+"g");let m;while((m=g.exec(t))){const a=t[m.index-1]||"",z=t[m.index+m[0].length]||"";
  const L=c=>/\p{L}/u.test(c),s=m[0];if(!(L(a)&&L(s[0]||""))&&!(L(z)&&L(s[s.length-1]||"")))return true;if(!m[0].length)g.lastIndex++}return false}catch(e){return re.test(t)}}
function kitOptOnCdn(src){try{return typeof kitPhOnCdn!=="function"||kitPhOnCdn(src)}catch(e){return true}}
/* the picture of an option title: {src, key, how} — how = rule | act | log | own | ph */
function kitOptPic(title,b){const t=kitOptPlain(title);const tryKey=(k,how)=>{if(!k||k==="-")return null;
  let src="";if(String(k).startsWith("ev:")||String(k).startsWith("scene:")){try{src=(kbkKeySrc(k,"",t,"")||[])[0]||""}catch(e){}}else src=`img/act-${k}.webp`;
  return src&&kitOptOnCdn(src)?{src,key:k,how}:null};
 let r=null;
 /* an option that NAMES its person target (Q option field `kgt` = a rival object / "emp" / "th" / "maid") shows that person's kit portrait, whatever its title says (masked "Phi ???" too) */
 try{const m=typeof Q!=="undefined"&&Q[0],o=b&&b.dataset&&b.dataset.m!=null&&m&&m.opts&&m.opts[+b.dataset.m];if(o&&o.kgt){const g=o.kgt;const f=g==="emp"?pEmp():g==="th"?pTH():g==="maid"?kitFace(S.maid):pv(g);if(f&&f.src)return{src:f.src,key:"",how:"face",face:true}}}catch(e){}
 /* kit-size #8 (kit-conform "generic picture on a person option", SRV:night2): an option whose title NAMES a live person shows THAT person's kit portrait (pv: a stranger gives the kit
    silhouette), whatever act / meaning group its words hit. Not inside a person-event frame (the figure column on the left already is that person). Same name test as kit-conform (b). */
 if(t&&b&&b.closest){try{const dl=b.closest(".dlg");if(dl&&!dl.querySelector(".kpsubj.kes,.kszfig")&&typeof liveRivals==="function"&&typeof pv==="function"){const who=liveRivals(true).find(v=>v&&v.name&&v.name.length>3&&t.includes(v.name));const f=who&&pv(who);if(f&&f.src)return{src:f.src,key:"",how:"face",face:true}}}catch(e){}}
 if(t){try{r=tryKey(typeof kitActKey==="function"?kitActKey(t):"","act");if(r)return r}catch(e){}
  /* review/pcard-actrow (owner 16/11 "Hình nhân vật đâu?"): an option that is a PERSON (spy target, gift recipient, invite, accuse, visit … any "chọn người"
     — it carries that person's kit portrait chip in its title) shows THAT person's portrait (a stranger: the kit silhouette pv gives), never a meaning-group
     scene picture. Beats the `log` / `rule` groups; a specific act picture (above) still wins. */
  try{const kn=b&&b.querySelector(".kan");const chip=(kn&&kn.querySelector(":scope > .md"))||(b&&b.querySelector(":scope > .md"));const im=chip&&chip.querySelector("img");const fs=im&&im.getAttribute("src");if(fs&&!/\/ph-act-/.test(fs))return{src:fs,key:"",how:"face",face:true}}catch(e){}
  try{if(typeof kbkRules==="function")for(const [re,k] of kbkRules())if(re.test(t)||re.test(t+".")){r=tryKey(k,"log");if(r)return r;break}}catch(e){}
  for(const [re,k] of KIT_OPT_RULES)if(kitOptHit(re,t)){r=tryKey(k,"rule");if(r)return r;break}}
 /* pickers of people / items: the person's own portrait (as j25 put beside the title) or the item's own picture */
 if(t){try{const v=typeof rivals!=="undefined"?rivals.find(r=>r&&r.name&&t.startsWith(r.name)):null;
   const f=v&&typeof pv==="function"?pv(v):/^Hoàng thượng$/.test(t)&&typeof pEmp==="function"?pEmp():/^Thái hậu$/.test(t)&&typeof pTH==="function"?pTH():null;
   if(f&&f.src)return{src:f.src,key:"",how:"face",face:true}}catch(e){}
  try{if(typeof IT!=="undefined"&&typeof kitItemSrc==="function"){if(!kitOptPic.items){kitOptPic.items={};for(const k in IT){const n=IT[k]&&itm(k).n;if(n&&!kitOptPic.items[n])kitOptPic.items[n]=k}}
   const k=kitOptPic.items[t]||kitOptPic.items[t.split(" · ")[0]];const s=k?kitItemSrc(k,""):"";if(s)return{src:s,key:"",how:"item"}}}catch(e){}}
 /* a picture the option already carries: that picture, in the slot */
 if(b){const im=b.querySelector(".kan .md img, .kan img, .kitem img");const s=im&&(im.getAttribute("src")||"");if(s&&!/\/ph-act-/.test(s))return{src:s,key:"",how:"own",face:!!im.closest(".md")}}
 if(typeof KIT_PH!=="undefined"&&(typeof kitPhActReady!=="function"||kitPhActReady())&&(typeof kitPhEventLike!=="function"||typeof Q==="undefined"||!Q[0]||!b||!b.closest("#modal")||kitPhEventLike(Q[0]))){/* review/kpanel-compact: no placeholder picture on a menu / confirm / picker option */const tone=typeof kitPhTone==="function"?kitPhTone(t):"light";
  try{if(typeof kitPhNote==="function")kitPhNote("opt",t.slice(0,60),tone,"")}catch(e){}return{src:KIT_PH.act[tone],key:"",how:"ph",tone}}
 return{src:"",key:"",how:"none"}}
/* the dialog option groups this applies to (every event / dilemma / night / reaction / servant / co-op dialog) */
/* not: the identity card's approved pinned pair (.nlopts, KIT 31.16 "owner approved") */
const KIT_OPT_SEL="#modal .opts:not(.nlopts) > button.ka, .kpscopts:not(.nlopts) > button.ka, .kitpg-opts > button.ka";/* r1: j79 kpIdentity moves the .nlopts pair into .kpscopts — still not a picture card */
function kpOptArt(b){if(!b||b.classList.contains("kcard"))return;if(b.dataset.kopt==="1"&&b.querySelector(":scope > .kaart"))return;
 const kan=b.querySelector(":scope > .kat > .kan, :scope > .kabody > .kat > .kan");if(!kan)return;
 const name=typeof kpActName==="function"?kpActName(kan):kitOptPlain(kan.textContent);
 const p=kitOptPic(name,b);
 /* the tiny portrait / icon beside the title goes: the picture on the left replaces it (owner) */
 kan.querySelectorAll(":scope > .md, :scope > img").forEach(e=>e.remove());b.querySelectorAll(":scope > .md").forEach(e=>e.remove());
 if(!p.src){b.classList.add("kopt");b.dataset.kopt="1";return}
 let cat="";try{cat=typeof kitActCat==="function"?kitActCat(name):""}catch(e){}const col=(typeof KIT_CAT!=="undefined"&&KIT_CAT[cat]||[])[1]||"";
 let body=b.querySelector(":scope > .kabody");if(!body){body=document.createElement("span");body.className="kabody";[...b.childNodes].forEach(n=>{if(!(n.nodeType===1&&n.classList.contains("kaart")))body.appendChild(n)});b.appendChild(body)}
 let art=b.querySelector(":scope > .kaart");if(!art){art=document.createElement("span");art.className="kaart";b.prepend(art)}
 art.innerHTML=kitArtFrame(p.src,"","kopic"+(p.face?" kopface":""),"");art.dataset.kzoom=p.src;art.title="Chạm để xem tranh";
 if(col)b.style.setProperty("--kcc0",col);b.dataset.kopt="1";b.dataset.kopic=p.how+(p.key?":"+p.key:"");b.classList.add("kart","kopt")}
window.kitOptPic=kitOptPic;window.kpOptArt=kpOptArt;window.KIT_OPT_RULES=KIT_OPT_RULES;
(function(){if(typeof kaNorm1!=="function")return;const n0=kaNorm1;kaNorm1=function(b){const r=n0.apply(this,arguments);try{if(b&&b.matches&&b.classList.contains("ka")&&b.matches(KIT_OPT_SEL))kpOptArt(b)}catch(e){}return r}})();
try{if(typeof kaNorm==="function"&&document.getElementById("modal"))kaNorm(document.getElementById("modal"))}catch(e){}

/* ---- kitPicZoom(src): the picture enlarged over everything; tap anywhere closes (KIT §6.2) ---- */
function kitPicZoom(src){try{if(!src)return;let z=document.getElementById("kpzoom");if(!z){z=document.createElement("div");z.id="kpzoom";z.setAttribute("role","dialog");
  z.addEventListener("click",e=>{e.stopPropagation();z.hidden=true});document.body.appendChild(z)}
 z.innerHTML=`<div class="kpzf">${kitSceneArt(src,"",{shape:"tall"})}</div>`;z.hidden=false}catch(e){}}
window.kitPicZoom=kitPicZoom;
/* capture phase: a tap on an option's picture enlarges it and does NOT choose the option */
document.addEventListener("click",e=>{try{const a=e.target&&e.target.closest&&e.target.closest("button.ka.kopt > .kaart[data-kzoom]");if(!a)return;
 e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();kitPicZoom(a.dataset.kzoom)}catch(x){}},true);
(function(){const st=document.createElement("style");st.id="kit-opt-pic";st.textContent=`
#kpzoom{position:fixed;inset:0;z-index:100000;background:#1a0f08cc;display:grid;place-items:center;cursor:zoom-out;padding:16px}
#kpzoom[hidden]{display:none!important}
#kpzoom .kpzf{width:min(78vw,calc(calc(82*var(--kvh,1vh)) * 3 / 4),506px)}
button.ka.kopt>.kaart[data-kzoom]{cursor:zoom-in}
button.ka.kopt>.kaart .ksart.kopface>img{object-position:50% 12%}
${typeof kitCompactCSS==="function"?kitCompactCSS("button.ka.kart.kopt",84,112):""}
/* one option card per row, full width (owner L109: horizontal option cards, no 2-col gaps; with the picture a half-width cell left the
   rows a thin column). Overrides jk3 31.16 k3grid and the person-dialog 2-column rules (jk4 32.7 / KIT 50 kdpo2, jplace): :is(#mb,*) +
   the repeated class only lift the specificity above theirs (2 ids, 5 classes). */
html body #modal :is(#mb,*)>.opts.opts.opts>button.ka.kopt.kart{grid-column:1/-1!important;order:0!important}
html body #modal :is(#mb,*)>.opts.opts.opts:has(> button.ka.kopt.kart),html body #modal :is(#mb,*)>.kpscopts.kpscopts.kpscopts:has(> button.ka.kopt.kart),.kitpg-opts:has(> button.ka.kopt.kart){display:grid!important;flex-direction:unset!important;grid-template-columns:minmax(0,1fr)!important;grid-auto-rows:max-content!important;align-items:stretch!important;align-content:start!important}
/* equal sizes: a row is never lower than the picture + padding (the options area scrolls, KIT 32.5: a "1fr" row would be squeezed into
   its height), so cards with the usual rows are all the same height; a card with more text grows, never clips */
html body button.ka.kart.kopt{min-height:calc(var(--kah,112px) + 18px)!important;box-sizing:border-box}
/* review/opt-pics r1: the person dialog (jk4 32.7 .kdper) sets min-height:max-content on every option (2 ids, 3 classes); in its short
   scrolling grid at 844x390 that let the rows shrink to 41 px and the 130 px cards OVERLAPPED. The picture floor must win there too. */
/* review/pcard-actrow: a person dialog (kdper, picture/figure column left) lists its option rows as a FLEX COLUMN: in the grid form above the auto rows stayed at the 130 px floor
   while a long row (Cần / Được / Mất) overflowed its box and was cut (spy-target picker, 755 px) */
html body #modal .dlg.kdper>#mb>.opts.opts.opts.opts.opts:has(> button.ka.kopt.kart){display:flex!important;flex-direction:column!important;grid-template-columns:none!important;gap:8px!important}
html body #modal .dlg.kdper>#mb>.opts.opts.opts.opts.opts>button.ka.kopt.kart{flex:0 0 auto!important;height:auto!important}
html body #modal :is(#mb,*)>:is(.opts,.kpscopts):is(.opts,.kpscopts):is(.opts,.kpscopts)>button.ka.kart.kopt{min-height:calc(var(--kah,112px) + 18px)!important}
`;document.head.appendChild(st)})();
/* kit sample page (§6.2): three options of "Hoàng hậu triệu kiến" through the real modal markup → kaNorm → kpOptArt */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§6.2",title:"Thẻ lựa chọn: tranh bên trái, thông tin bên phải (thẻ gọn)",html:()=>
 `<div class="opts kitpg-opts">`+
 [["Cúi đầu nhận lỗi","tốn: 1 khắc"],["Thưa rằng do Hoàng thượng định","tốn: 1 khắc"],["Dâng lễ vật xin bỏ qua","tốn: Bạc -20, 1 khắc"]]
  .map(([n,x],i)=>`<button class="opt" data-ksample="${i}">${n}<small>${typeof kitParse==="function"?kitParse(x):x}</small></button>`).join("")+`</div>`})}catch(e){}
/* kit sample page (§6.2b, review/kit-fit, owner 16/11 s21): the card picks its picture form from its text — short text → SQUARE (no empty space under the
   text), long text → the tall 3:4 picture (kitOptFit, jk4) */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§6.2b",title:"Thẻ lựa chọn: chữ ngắn thì tranh vuông, chữ dài thì tranh đứng (không chừa khoảng trống)",html:()=>
 `<div class="opts kitpg-opts">`+
 [["Tiếp","thân +3"],["Xin về tảo mộ tổ tiên",`tốn: Sức -${BAL.kitpage.demo.tomb.suc} · được: Đức +${BAL.kitpage.demo.tomb.duc}, cha mẹ vui lòng`],["Dâng lễ vật xin Hoàng hậu bỏ qua cho lần này",`tốn: Bạc -${BAL.kitpage.demo.gift.bac}, ${BAL.kitpage.demo.k} khắc · được: Hoàng hậu thiện cảm +${BAL.kitpage.demo.gift.hh}, Danh +${BAL.kitpage.demo.gift.danh} · mất: Thái hậu thiện cảm -${BAL.kitpage.demo.gift.th} · cần: Bạc ≥ ${BAL.kitpage.demo.gift.bac}`]]
  .map(([n,x],i)=>`<button class="opt" data-ksample="${i}">${n}<small>${typeof kitParse==="function"?kitParse(x):x}</small></button>`).join("")+`</div>`})}catch(e){}
/* kit sample page (§6.3, review/pcard-actrow): the acts of a person card = the same long row, one per line (pop-up / tab / any width) */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§6.3",title:"Việc trên thẻ người: hàng dài, mỗi việc một dòng",html:()=>
 `<div class="pc"><div class="pcr"><div class="pcb">`+
 [["Tâm sự","tốn: 1 khắc · được: thiện cảm +6"],["Sai đi dò la","Năm ăn năm thua · tốn: 2 khắc · được: biết 2 điều thật về nàng ta, "+evSg(BAL.ag.ev.one)+" · mất: thiện cảm -5"],["Nghe ngóng chung","tốn: 1 khắc · được: biết 1 điều thật trong cung (hay về người đang gây chuyện)"]]
  .map(([n,x],i)=>pbtn(`data-kitsample="pc${i}"`,n,typeof kitParse==="function"?kitParse(x):x,"")).join("")+`</div></div></div>`})}catch(e){}
/* GOAL / TASK cards (owner 16/11 21:10Z, chapter goal list "Đi làm: Học một môn tài nghệ" had no picture): an "Đi làm: <việc>" option is matched on the
   task itself (prefix dropped), and when nothing names a picture it shows the task's act / act-category picture (kitActArt) — every goal card has one. */
(function(){const p0=kitOptPic;kitOptPic=function(title,b){const t=kitOptPlain(title),m=/^Đi làm:\s*(.+)$/i.exec(t);if(!m)return p0.apply(this,arguments);
 const r0=p0.apply(this,arguments);if(r0&&r0.src&&r0.how!=="ph")return r0;const r=p0.call(this,m[1],b);if(r&&r.src&&r.how!=="ph")return r;try{const a=kitActArt(m[1]);if(a&&a.src&&!/\/ph-act-/.test(a.src)&&kitOptOnCdn(a.src))return{src:a.src,key:"",how:"cat"}}catch(e){}return r0&&r0.how==="ph"?r0:r};/* nothing yet (e.g. the person chip is painted later): "none" lets kpOptArt run again */window.kitOptPic=kitOptPic})();
