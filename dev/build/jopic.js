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
 /* (meaning group → picture key; "opt-*" = painted for this group by review/opt-pics, every other key = an existing act / choice picture reused) */
 /* — leave it / not now — */
 [/^(thôi|bỏ qua|không mua|đóng$|để sau|nghĩ lại|đã rõ|thôi, để sau|thôi, ở lại|ở lại|vẫn đi|đi$|đi \(|cảm ơn, không cần)/i,"opt-thoi"],
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
 [/(chàng|lời hẹn|nắm tay|như năm ấy|giả sơn)/i,"hen-gap"],
 /* — harm / timing — */
 [/(thử bằng kim bạc|thử trước|nếm trước|kim bạc)/i,"nghiem-doc-h"],
 [/(vu oan|vu cho|phao tin|tung tin|đồn)/i,"vu-oan-h"],
 [/^(ngày hội đông người|lúc nàng|khi nàng|sau cơn mưa|một đêm vắng)/i,"opt-rinh-cho"],
 [/(phạt|trách|đánh|quở|đuổi)/i,"phat-vi-h"],
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
];
const kitOptPlain=s=>String(s||"").replace(/<[^>]+>/g," ").replace(/[\s ]+/g," ").trim();
function kitOptOnCdn(src){try{return typeof kitPhOnCdn!=="function"||kitPhOnCdn(src)}catch(e){return true}}
/* the picture of an option title: {src, key, how} — how = rule | act | log | own | ph */
function kitOptPic(title,b){const t=kitOptPlain(title);const tryKey=(k,how)=>{if(!k||k==="-")return null;
  let src="";if(String(k).startsWith("ev:")||String(k).startsWith("scene:")){try{src=(kbkKeySrc(k,"",t,"")||[])[0]||""}catch(e){}}else src=`img/act-${k}.webp`;
  return src&&kitOptOnCdn(src)?{src,key:k,how}:null};
 let r=null;
 if(t){try{r=tryKey(typeof kitActKey==="function"?kitActKey(t):"","act");if(r)return r}catch(e){}
  try{if(typeof kbkRules==="function")for(const [re,k] of kbkRules())if(re.test(t)||re.test(t+".")){r=tryKey(k,"log");if(r)return r;break}}catch(e){}
  for(const [re,k] of KIT_OPT_RULES)if(re.test(t)){r=tryKey(k,"rule");if(r)return r;break}}
 /* pickers of people / items: the person's own portrait (as j25 put beside the title) or the item's own picture */
 if(t){try{const v=typeof rivals!=="undefined"?rivals.find(r=>r&&r.name&&t.startsWith(r.name)):null;
   const f=v&&typeof pv==="function"?pv(v):/^Hoàng thượng$/.test(t)&&typeof pEmp==="function"?pEmp():/^Thái hậu$/.test(t)&&typeof pTH==="function"?pTH():null;
   if(f&&f.src)return{src:f.src,key:"",how:"face",face:true}}catch(e){}
  try{if(typeof IT!=="undefined"&&typeof kitItemSrc==="function"){if(!kitOptPic.items){kitOptPic.items={};for(const k in IT){const n=IT[k]&&IT[k].n;if(n&&!kitOptPic.items[n])kitOptPic.items[n]=k}}
   const k=kitOptPic.items[t]||kitOptPic.items[t.split(" · ")[0]];const s=k?kitItemSrc(k,""):"";if(s)return{src:s,key:"",how:"item"}}}catch(e){}}
 /* a picture the option already carries: that picture, in the slot */
 if(b){const im=b.querySelector(".kan .md img, .kan img, .kitem img");const s=im&&(im.getAttribute("src")||"");if(s&&!/\/ph-act-/.test(s))return{src:s,key:"",how:"own",face:!!im.closest(".md")}}
 if(typeof KIT_PH!=="undefined"&&(typeof kitPhActReady!=="function"||kitPhActReady())){const tone=typeof kitPhTone==="function"?kitPhTone(t):"light";
  try{if(typeof kitPhNote==="function")kitPhNote("opt",t.slice(0,60),tone,"")}catch(e){}return{src:KIT_PH.act[tone],key:"",how:"ph",tone}}
 return{src:"",key:"",how:"none"}}
/* the dialog option groups this applies to (every event / dilemma / night / reaction / servant / co-op dialog) */
/* not: the identity card's approved pinned pair (.nlopts, KIT 31.16 "owner approved") */
const KIT_OPT_SEL="#modal .opts:not(.nlopts) > button.ka, .kpscopts > button.ka, .kitpg-opts > button.ka";
function kpOptArt(b){if(!b||b.classList.contains("kcard"))return;if(b.dataset.kopt==="1"&&b.querySelector(":scope > .kaart"))return;
 const kan=b.querySelector(":scope > .kat > .kan, :scope > .kabody > .kat > .kan");if(!kan)return;
 const name=typeof kpActName==="function"?kpActName(kan):kitOptPlain(kan.textContent);
 const p=kitOptPic(name,b);
 /* the tiny portrait / icon beside the title goes: the picture on the left replaces it (owner) */
 kan.querySelectorAll(":scope > .md, :scope > img").forEach(e=>e.remove());
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
#kpzoom .kpzf{width:min(78vw,calc(82vh * 3 / 4),506px)}
button.ka.kopt>.kaart[data-kzoom]{cursor:zoom-in}
button.ka.kopt>.kaart .ksart.kopface>img{object-position:50% 12%}
${typeof kitCompactCSS==="function"?kitCompactCSS("button.ka.kart.kopt",84,112):""}
/* one option card per row, full width (owner L109: horizontal option cards, no 2-col gaps; with the picture a half-width cell left the
   rows a thin column). Overrides jk3 31.16 k3grid and the person-dialog 2-column rules (jk4 32.7 / KIT 50 kdpo2, jplace): :is(#mb,*) +
   the repeated class only lift the specificity above theirs (2 ids, 5 classes). */
html body #modal :is(#mb,*)>.opts.opts.opts>button.ka.kopt.kart{grid-column:1/-1!important;order:0!important}
html body #modal :is(#mb,*)>.opts.opts.opts:has(> button.ka.kopt.kart),html body #modal :is(#mb,*)>.kpscopts.kpscopts.kpscopts:has(> button.ka.kopt.kart),.kitpg-opts:has(> button.ka.kopt.kart){display:grid!important;flex-direction:unset!important;grid-template-columns:minmax(0,1fr)!important;grid-auto-rows:auto!important;align-items:stretch!important;align-content:start!important}
/* equal sizes: a row is never lower than the picture + padding (the options area scrolls, KIT 32.5: a "1fr" row would be squeezed into
   its height), so cards with the usual rows are all the same height; a card with more text grows, never clips */
html body button.ka.kart.kopt{min-height:calc(var(--kah,112px) + 18px)!important;box-sizing:border-box}
`;document.head.appendChild(st)})();
/* kit sample page (§6.2): three options of "Hoàng hậu triệu kiến" through the real modal markup → kaNorm → kpOptArt */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§6.2",title:"Thẻ lựa chọn: tranh bên trái, thông tin bên phải (thẻ gọn)",html:()=>
 `<div class="opts kitpg-opts">`+
 [["Cúi đầu nhận lỗi","tốn: 1 khắc"],["Thưa rằng do Hoàng thượng định","tốn: 1 khắc"],["Dâng lễ vật xin bỏ qua","tốn: Bạc -20, 1 khắc"]]
  .map(([n,x],i)=>`<button class="opt" data-ksample="${i}">${n}<small>${typeof kitParse==="function"?kitParse(x):x}</small></button>`).join("")+`</div>`})}catch(e){}
