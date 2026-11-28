/* ================= jopic: OPTION CARD = COMPACT ACT CARD WITH ITS PICTURE LEFT — KIT §6.2 (owner 15/11, review/opt-pics) =================
   Owner (verbatim, repeated): "Hình minh họa cho từng hành động bên trái. Bên phải là thông tin. Tôi nói hoài vậy."
   Markup dev/handover/refs/owner-option-picture-left.jpg (docs branch). Coordinator: ONE act-card form = the COMPACT card of Hậu cung (KIT §43):
   small picture left (~1/4), title + Cần/Tốn/Được/Mất/Gợi ý rows right, height = content; tap the picture = choose (like the rest of the card).
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
   A tap on the picture CHOOSES the option like any other tap on the card (KK29, KIT BUG #6); kitPicZoom(src) is only for a separate control. ============================================================ */
/* stand-ins (title → an existing act picture) shown with the 'tạm' chip: Giữ chân Hoàng thượng (night-final flip choice, main s26 23:39Z; ART REQUEST by main) */
const KIT_OPT_TAM=[[/^Giữ chân Hoàng thượng/,"thap-den-hau-ruou-h"]];
const KIT_OPT_RULES=[
 /* review/art-event (ART-EVENT, KK33 ART LIST, owner 25/11 via MAIN «each card's picture must differ and fit its option»): the event hand cards that showed the
    shared stand-in or a picture another card of the same frame shows. FIRST so they beat the generic rules below. New paintings = opt-ev-*; the rest reuse existing act pictures. */
 [/^đàn$/i,"opt-wk-cam"],[/^cờ$/i,"opt-wk-ky"],[/^(vẽ|họa)$/i,"opt-wk-hoa"],[/^(múa|vũ)$/i,"opt-wk-vu"],[/^(thơ|thi)$/i,"opt-wk-thi"],[/^điều hương$/i,"tu-hoc-huong-h"],
 [/^nấu ăn$/i,"opt-wk-nau"],[/^thêu$/i,"opt-wk-theu"],[/^y thuật (&|và) điều hương/i,"opt-wk-y"],[/^đầu hồ$/i,"opt-ev-dau-ho"],
 [/^ra vấn an/i,"opt-ev-ra-van-an"],[/^lánh đi lối khác/i,"opt-ev-lanh-loi-khac"],[/^để cung chính ti tra hỏi/i,"opt-ev-ccti-tra-hoi"],[/^đứng ra bảo lãnh/i,"opt-ev-bao-lanh"],
 [/^làm như không quen/i,"opt-ev-nhu-khong-quen"],[/^làm theo lời cha/i,"opt-ev-theo-loi-cha"],[/^dặn .{1,24} chỉ viết chuyện vặt/i,"opt-ev-viet-chuyen-vat"],
 [/^ở lại, nắm lấy quyền bính/i,"opt-ev-nam-quyen-binh"],[/^rời khỏi cung cấm/i,"opt-ev-roi-cung-cam"],[/^theo người ấy đi/i,"opt-ev-theo-nguoi-ay"],
 [/^giao việc: canh chừng cung/i,"opt-ev-canh-chung-cung"],[/^giao việc: thử độc/i,"opt-ev-thu-doc"],[/^giao việc: giữ sổ sách/i,"so-sach"],[/^giữ nguyên$/i,"opt-ev-giu-nguyen"],
 [/^để .{1,24} nhận lỗi thay/i,"opt-ev-nhan-loi-thay"],[/^kêu oan: ta không biết/i,"keu-oan-h"],[/^giúp qua loa/i,"opt-ev-giup-qua-loa"],[/^đeo trang sức đẹp nhất/i,"deo-trang-suc-h"],
 [/^kết bằng dây bạc/i,"opt-ev-ket-day-bac"],[/^kết bằng kim tuyến/i,"opt-ev-ket-kim-tuyen"],[/^xin thái hậu ban mạng/i,"opt-ev-xin-th-ban-mang"],
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
 [/^nằm yên/i,"o-yen-nghi"],[/^ở nhà đọc sách/i,"doc-sach-giai-khuay"],[/^gắng chịu, che mặt/i,"deo-mang-che-h"],
 /* (meaning group → picture key; "opt-*" = painted for this group by review/opt-pics, every other key = an existing act / choice picture reused) */
 /* — leave it / not now — */
 [/^(thôi|bỏ qua|không mua|đóng$|để sau|nghĩ lại|đã rõ|thôi, để sau|thôi, ở lại|cảm ơn, không cần)/i,"opt-thoi"],
 /* r1: "Đi / Vẫn đi" = going, "Ở lại" = staying put — not the turning-away picture */
 [/^(vẫn đi|đi$|đi \()/i,"den-ngay-h"],[/^ở lại/i,"o-yen-nghi"],
 [/(che phần lớn)/i,"giau-trong-ruong"],
 [/^(im lặng|làm thinh|lặng thinh|nín lặng|cười trừ|giả vờ không hiểu|nghe và giữ kín)/i,"im-lang"],
 [/^(không dự|không đến|không dâng lễ|không phát|không bày tiệc|cáo mệt|khéo cáo mệt|bỏ thi|đóng cửa giữ mình|ở yên|ở cung|sống thật thanh tĩnh|để mặc, giữ mình|bình thản chờ|đứng ngoài|mặc kệ|làm ngơ|bỏ mặc|bỏ ngoài tai|mặc họ|không dính vào)/i,"o-yen-nghi"],
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
 [/^(vâng|vâng chỉ|tuân|cúi đầu (vâng|dạ|tuân|nghe)|nhận lời|nhận\b|nhận ngay|đồng ý|tạ ơn|chu toàn lễ nghĩa|giao$)/i,"cui-dau-tuan-lenh-h"],
 /* — gifts / silver — */
 [/(lì xì)/i,"li-xi-h"],
 [/(đút bạc|đưa bạc|bỏ bạc mua|lo lót|hối lộ|mua chuộc|bịt miệng|im miệng)/i,"dut-bac-rut-loi-h"],
 [/(dâng lễ|lễ vật|lễ mọn|mang lễ|gửi lễ|biếu|dâng ngọc|đáp lễ|tặng)/i,"bieu-qua-h"],
 [/(gửi bạc|góp bạc|quyên|cho vay|xóa nợ|cứu lụt|lều cháo|dâng thóc|kèm bạc)/i,"gui-bac-chua-benh"],
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
 [/(giấu|giữ kín|giữ lại|giữ thư|giữ tín vật|ép cành hoa|cất)/i,"giau-trong-ruong"],
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
 [/(chép|kinh)/i,"chep-kinh"],
 [/(cầu|hương án|cúng|đèn hoa đăng|giữ chay)/i,"cung-duong-dau-den-h"],
 [/(thái y|thuốc|bắt mạch)/i,"thai-y-khac-bat-mach-h"],
 [/(con ôn bài|kèm .*con|cho con|dạy con|chăm|nhận nuôi)/i,"day-con-hoc"],
 /* KIT-STAGE-R5 (KK46 review F1, law 11 whole family): every «Cúi đầu …» option without a more specific group above (vâng dạ, im lặng, lui, thưa tên …) = the bowing picture, never the stand-in */
 [/^cúi đầu/i,"cui-dau-tuan-lenh-h"],
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
 try{const m=typeof Q!=="undefined"&&Q[0],o=b&&b.dataset&&b.dataset.m!=null&&m&&m.opts&&m.opts[+b.dataset.m];
  if(o&&o.kgp&&typeof kitFace==="function"){const f=kitFace(o.kgp);if(f&&f.src)return{src:f.src,key:"",how:"face",face:true,f,who:o.kgp}}/* dialog-person (owner 21/11): an option that IS a person (entourage, any servant / NPC target) names her in kgp */
  if(o&&o.kgt){const g=o.kgt;const f=g==="emp"?pEmp():g==="th"?pTH():g==="maid"?kitFace(S.maid):pv(g);if(f&&f.src)return{src:f.src,key:"",how:"face",face:true,f,who:g==="emp"?S.emp:g==="th"?S.thO:g==="maid"?S.maid:g}}}catch(e){}
 /* kit-size #8 (kit-conform "generic picture on a person option", SRV:night2): an option whose title NAMES a live person shows THAT person's kit portrait (pv: a stranger gives the kit
    silhouette), whatever act / meaning group its words hit. Not inside a person-event frame (the figure column on the left already is that person). Same name test as kit-conform (b). */
 if(t&&b&&b.closest){try{const dl=b.closest(".dlg");if(dl&&!dl.querySelector(".kpsubj.kes,.kszfig")&&typeof liveRivals==="function"&&typeof pv==="function"){const who=liveRivals(true).find(v=>v&&v.name&&v.name.length>3&&t.includes(v.name));const f=who&&pv(who);if(f&&f.src)return{src:f.src,key:"",how:"face",face:true,f,who}}}catch(e){}}
 /* review/art-event: a face-veil option («Mạng … · <phẩm>», jveil vlnvp / vlout) shows that veil's own painting at its grade (kitItemSrc), never the generic «mạng» rule */
 if(t&&typeof vlIsK==="function"&&typeof IT!=="undefined"&&typeof kitItemSrc==="function"){try{const [nm,gr]=t.split(" · ");const G=typeof WD_GRADE!=="undefined"?WD_GRADE:["Thường","Tinh phẩm","Trân phẩm","Tuyệt phẩm"];const gi=gr?G.indexOf(gr.trim()):-1;
  const k=Object.keys(IT).find(k=>vlIsK(k)&&IT[k]&&IT[k].n===nm.trim()&&(gi<0||k==="mcnt"||+k[3]===gi));const s=k?kitItemSrc(k,""):"";if(s)return{src:s,key:"",how:"item"}}catch(e){}}
 if(t){try{r=tryKey(typeof kitActKey==="function"?kitActKey(t):"","act");if(r)return r}catch(e){}
  /* review/pcard-actrow (owner 16/11 "Hình nhân vật đâu?"): an option that is a PERSON (spy target, gift recipient, invite, accuse, visit … any "chọn người"
     — it carries that person's kit portrait chip in its title) shows THAT person's portrait (a stranger: the kit silhouette pv gives), never a meaning-group
     scene picture. Beats the `log` / `rule` groups; a specific act picture (above) still wins. */
  try{const kn=b&&b.querySelector(".kan");const chip=(kn&&kn.querySelector(":scope > .md"))||(b&&b.querySelector(":scope > .md"));const im=chip&&chip.querySelector("img");const fs=im&&im.getAttribute("src");if(fs&&!/\/ph-(?:act-|event-|[plws]-)/.test(fs))return{src:fs,key:"",how:"face",face:true,chip}}catch(e){}
  try{if(typeof kbkRules==="function")for(const [re,k] of kbkRules())if(re.test(t)||re.test(t+".")){r=tryKey(k,"log");if(r)return r;break}}catch(e){}
  for(const [re,k] of KIT_OPT_RULES)if(kitOptHit(re,t)){r=tryKey(k,"rule");if(r)return r;break}}
 /* pickers of people / items: the person's own portrait (as j25 put beside the title) or the item's own picture */
 if(t){try{const v=typeof rivals!=="undefined"?rivals.find(r=>r&&r.name&&t.startsWith(r.name)):null;
   const f=v&&typeof pv==="function"?pv(v):/^Hoàng thượng$/.test(t)&&typeof pEmp==="function"?pEmp():/^Thái hậu$/.test(t)&&typeof pTH==="function"?pTH():null;
   if(f&&f.src)return{src:f.src,key:"",how:"face",face:true,f,who:v||null}}catch(e){}
  try{if(typeof IT!=="undefined"&&typeof kitItemSrc==="function"){if(!kitOptPic.items){kitOptPic.items={};for(const k in IT){const n=IT[k]&&itm(k).n;if(n&&!kitOptPic.items[n])kitOptPic.items[n]=k}}
   const k=kitOptPic.items[t]||kitOptPic.items[t.split(" · ")[0]];const s=k?kitItemSrc(k,""):"";if(s)return{src:s,key:"",how:"item"}}}catch(e){}}
 /* STAND-IN pictures (KIT §84.4): an option with no picture of its own yet borrows an existing one that fits, marked 'tạm' (kitTam) until its own exists */
 if(t)for(const [re,k] of KIT_OPT_TAM)if(re.test(t)){const own=tryKey(typeof kitActKey==="function"?kitActKey(t):"","act");if(own)return own;const r2=tryKey(k,"tam");if(r2){r2.tam=true;return r2}break}
 /* a picture the option already carries: that picture, in the slot */
 if(b){const im=b.querySelector(".kan .md img, .kan img, .kitem img");const s=im&&(im.getAttribute("src")||"");if(s&&!/\/ph-(?:act-|event-|[plws]-)/.test(s))return{src:s,key:"",how:"own",face:!!im.closest(".md")}}
 /* KK33 (owner 25/11 via MAIN 146 «each card's picture must differ and fit its option»): an option with no picture of its own that NAMES a person — one of the frame's
    faction faces (Q[0].faces: by name or by role «Tể tướng»), Hoàng thượng / bệ hạ, Thái hậu — shows THAT person's portrait (real art), never the shared stand-in.
    how = "lead" (a side / a person the choice follows), NOT a person picker: the hand (§101) keeps it. */
 if(t){const L=kitOptLead(t);if(L)return L}
 if(typeof KIT_PH!=="undefined"&&(typeof kitPhActReady!=="function"||kitPhActReady())&&(typeof kitPhEventLike!=="function"||typeof Q==="undefined"||!Q[0]||!b||!b.closest("#modal")||kitPhEventLike(Q[0]))){/* review/kpanel-compact: no placeholder picture on a menu / confirm / picker option */const tone=typeof kitPhTone==="function"?kitPhTone(t):"light";
  try{if(typeof kitPhNote==="function")kitPhNote("opt",t.slice(0,60),tone,"")}catch(e){}return{src:KIT_PH.act[tone],key:"",how:"ph",tone}}
 return{src:"",key:"",how:"none"}}
/* KK36 (MAIN 151 look «Thì thầm nói xấu … ???», law 11 = every card / option picture): a picture that would be the grey stand-in (a stranger's kit
   silhouette) becomes the PAINTED veiled portrait (kitVeilPor) — until that art is on the CDN, the option's own act picture, else the shared stand-in.
   The face flag / who stay (person pickers are still recognised). */
{const kop0=kitOptPic;kitOptPic=function(title,b){const r=kop0.apply(this,arguments);try{if(r&&r.src&&KIT_GREYSRC.test(r.src)){const v=kitVeilPor(r.src);if(v)return Object.assign({},r,{src:v,veil:true});
  /* an option that IS the person (a person picker card: kgp / kgt) keeps her kit stand-in until the veiled art lands — its picture is her, not an act */
  try{const m=typeof Q!=="undefined"&&Q[0],o=b&&b.dataset&&b.dataset.m!=null&&m&&m.opts&&m.opts[+b.dataset.m];if(o&&(o.kgp||o.kgt))return r}catch(e){}
  const t=kitOptPlain(title);const k=typeof kitActKey==="function"&&t?kitActKey(t):"";const s=k&&k!=="-"?`img/act-${k}.webp`:"";if(s&&kitOptOnCdn(s))return Object.assign({},r,{src:s,key:k,greyOff:true});
  if(typeof KIT_PH!=="undefined"){const tone=typeof kitPhTone==="function"?kitPhTone(t):"light";return Object.assign({},r,{src:KIT_PH.act[tone],key:"",greyOff:true,tone})}}}catch(e){}return r};try{window.kitOptPic=kitOptPic}catch(e){}}
/* KK36 (MAIN 151 look: «Thì thầm nói xấu … ???» hand card = grey silhouette): the grey stand-in (KIT §59.1 img/kit/unknown[-fig]-f|m|k) is NEVER a
   card / stage picture. An unknown person's card shows the PAINTED veiled portrait (KIT_VEILPOR, art slot for Foreman C — ART REQUEST K-VEIL-POR) once it
   is on the CDN; until then the card falls back to its own act picture / the shared stand-in like any card without a person. */
const KIT_GREYSRC=/img\/kit\/unknown(-fig)?-([fmk])\.webp/;const KIT_VEILPOR={f:"img/kit/veil-por-f.webp",m:"img/kit/veil-por-m.webp",k:"img/kit/veil-por-k.webp"};
function kitVeilPor(src){try{const g=KIT_GREYSRC.exec(String(src||""));if(!g)return src;const v=KIT_VEILPOR[g[2]];const has=typeof KIT_CDNHAVE!=="undefined"&&KIT_CDNHAVE&&KIT_CDNHAVE.has(v);return has?v:""}catch(e){return""}}
try{window.KIT_GREYSRC=KIT_GREYSRC;window.KIT_VEILPOR=KIT_VEILPOR;window.kitVeilPor=kitVeilPor}catch(e){}
function kitOptLead(t){try{const C=[];const m=typeof Q!=="undefined"&&Q[0];
  if(m&&Array.isArray(m.faces))m.faces.forEach(x=>{const w=x&&x[0];if(w&&w.src)C.push([w,[x[1],w.rw].filter(Boolean)])});
  if(typeof pEmp==="function")C.push([pEmp(),["Hoàng thượng","bệ hạ","Bệ hạ"]]);if(typeof pTH==="function"&&!(typeof S!=="undefined"&&S.thDead))C.push([pTH(),["Thái hậu"]]);
  for(const [w,ns] of C)if(w&&w.src&&ns.some(n=>n&&n.length>2&&kitOptHit(new RegExp(n.replace(/[.*+?^${}()|[\]\\]/g,"\\$&"),"i"),t))){const s=kitVeilPor(w.src);if(!s)return null;return{src:s,key:s===w.src?(w.rk||""):"veil",how:"lead",lead:true}}}catch(e){}return null}
/* the dialog option groups this applies to (every event / dilemma / night / reaction / servant / co-op dialog) */
/* not: the identity card's approved pinned pair (.nlopts, KIT 31.16 "owner approved") */
const KIT_OPT_SEL="#modal .opts:not(.nlopts) > button.ka, .kpscopts:not(.nlopts) > button.ka, .kitpg-opts > button.ka";/* r1: j79 kpIdentity moves the .nlopts pair into .kpscopts — still not a picture card */
/* KIT 48.6 (kit-rank-name, owner 17/11 ~16:20Z): an option row that wears a PERSON's portrait is an avatar row, so its title is the STACK (rank over name), never "rank name" on one line.
   Text based (works for a masked "Phi ???" too): the title's plain text must START with a rank word (RANKS, longest first); what follows up to " (" is the name; any tail
   ("(Nữ công bậc 3)") stays as a small line under. Hoàng thượng / Thái hậu (one word) and rows already stacked are left alone. */
function kitOptStackTitle(kan){if(!kan||kan.querySelector(".knr")||typeof RANKS==="undefined"||typeof kitRankName!=="function")return;
 const t=String(kan.textContent||"").replace(/\s+/g," ").trim();let rk=RANKS.map(r=>r.n).sort((a,b)=>b.length-a.length).find(n=>t.startsWith(n+" "));if(!rk)return;
 const rest=t.slice(rk.length+1);const i=rest.indexOf(" (");const name=(i<0?rest:rest.slice(0,i)).trim(),tail=i<0?"":rest.slice(i+1).trim();if(!name)return;
 const rv=typeof rivals!=="undefined"?rivals.find(r=>r&&r.name===name):null;
 kan.innerHTML=kitRankName(rv||null,{form:"stack",parts:{rank:rk,name}})+(tail?`<span class="kanx">${tail}</span>`:"")}
window.kitOptStackTitle=kitOptStackTitle;
/* PERSON OPTION CARD (owner 21/11 ~04:27Z, OD "Bạn đã thật sự làm mấy cái khung theo một cái kit chưa? Mà tại sao cái avatar này không có"): an option that
   targets / chooses a PERSON (entourage, spy / gift / invite / visit target …) wears the KIT AVATAR part (mdH: the rank frame, ground and badge of her rank,
   KIT §4.2) in its picture slot — never an event picture, never a loose portrait crop (kitArtFrame) — and its title is the kit STACK rank / name (kitRankName).
   ONE builder: kpOptArt (every option), jgift (gift rows) both call it. */
function kitOptAvatar(b,f,who,src){try{if(!b||!f||typeof mdH!=="function")return false;const kan=b.querySelector(":scope > .kat > .kan, :scope > .kabody > .kat > .kan");
 let art=b.querySelector(":scope > .kaart");if(!art){let body=b.querySelector(":scope > .kabody");if(!body){body=document.createElement("span");body.className="kabody";[...b.childNodes].forEach(n=>{if(!(n.nodeType===1&&n.classList.contains("kaart")))body.appendChild(n)});b.appendChild(body)}
  art=document.createElement("span");art.className="kaart";b.prepend(art)}
 art.innerHTML=mdH(f,"big");art.classList.add("kaav");
 b.querySelectorAll(":scope > .md").forEach(x=>x.remove());if(kan)kan.querySelectorAll(":scope > .md, :scope > img").forEach(x=>x.remove());
 if(kan&&who&&typeof who==="object"&&typeof kitRankName==="function"&&!kan.querySelector(".knr")){const tx=String(kan.textContent||"").replace(/\s+/g," ").trim();const ix=tx.indexOf(" · ");const head=(ix>=0?tx.slice(0,ix):tx).replace(/\s*\([^)]*\)\s*$/,"").trim();
  let rn=["",who.name||""];try{if(typeof kszRankName==="function")rn=kszRankName(who)}catch(e){}
  /* the title is JUST the person (name, or rank + name, + a "· đang nhắm" marker): the kit stack rank / name. A SENTENCE about her ("Tố Quý phi …") keeps its verb: only the rank-led form is stacked (kitOptStackTitle) */
  const tl=()=>{const t=kan.querySelector(":scope > .kanx");return t?t.outerHTML:ix>=0?`<span class="kanx">${tx.slice(ix+3).replace(/[<>&]/g,"")}</span>`:""};
  const nm0=who.name||"";/* the title may carry her REAL name while the kit shows "???" for a stranger (kszRankName masks): both count as "just the person" */
  if(rn[1]&&(head===rn[1]||head===(rn[0]+" "+rn[1]).trim()||nm0&&(head===nm0||head===(rn[0]+" "+nm0).trim()))||!rn[1]&&head===rn[0])kan.innerHTML=kitRankName(who,{form:"stack"})+tl();
  else if(rn[0]&&head===rn[0]+" ???"){let col="";try{col=kitPersonCol(who)}catch(e){}/* a stranger: the rank is known, the name is not (kit: "???") */kan.innerHTML=kitRankName(null,{form:"stack",parts:{rank:rn[0],name:"???",col}})+tl()}
  else try{kitOptStackTitle(kan)}catch(e){}}
 b.dataset.kopt="1";b.dataset.kopic="face:avatar";b.classList.add("kart","kopt","kopav");return true}catch(e){return false}}
window.kitOptAvatar=kitOptAvatar;
function kpOptArt(b){if(!b||b.classList.contains("kcard"))return;if(b.dataset.kopt==="1"&&b.querySelector(":scope > .kaart"))return;
 const kan=b.querySelector(":scope > .kat > .kan, :scope > .kabody > .kat > .kan");if(!kan)return;
 const name=typeof kpActName==="function"?kpActName(kan):kitOptPlain(kan.textContent);
 let p=kitOptPic(name,b);if(!p.src&&typeof KIT_PH!=="undefined"&&KIT_PH.act)/* OD 21/11 ~04:20Z (#56): EVERY option card shows a picture — no art of its own → the §59 stand-in, even when no sibling has one */{let tn="light";try{if(typeof kitPhTone==="function")tn=kitPhTone(name)}catch(e){}p={src:KIT_PH.act[tn]||KIT_PH.act.light,key:"",how:"ph",tone:tn}}
 /* the tiny portrait / icon beside the title goes: the picture on the left replaces it (owner) */
 kan.querySelectorAll(":scope > .md, :scope > img").forEach(e=>e.remove());b.querySelectorAll(":scope > .md").forEach(e=>e.remove());
 if(!p.src){b.classList.add("kopt");b.dataset.kopt="1";return}
 let cat="";try{cat=typeof kitActCat==="function"?kitActCat(name):""}catch(e){}const col=(typeof KIT_CAT!=="undefined"&&KIT_CAT[cat]||[])[1]||"";
 let body=b.querySelector(":scope > .kabody");if(!body){body=document.createElement("span");body.className="kabody";[...b.childNodes].forEach(n=>{if(!(n.nodeType===1&&n.classList.contains("kaart")))body.appendChild(n)});b.appendChild(body)}
 let art=b.querySelector(":scope > .kaart");if(!art){art=document.createElement("span");art.className="kaart";b.prepend(art)}
 if(p.face&&p.f&&kitOptAvatar(b,p.f,p.who,p.src))return;
 /* the name chip beside the title IS already a kit avatar (mdH): it moves into the picture slot, grown to the kit "big" size — never re-cut into a loose crop */
 if(p.face&&p.chip&&p.chip.classList.contains("md")){const c=p.chip.cloneNode(true);c.classList.remove("xs","sm");c.classList.add("big");
  let ar=b.querySelector(":scope > .kaart");if(!ar){ar=document.createElement("span");ar.className="kaart";b.prepend(ar)}
  ar.innerHTML="";ar.appendChild(c);ar.classList.add("kaav");try{kitOptStackTitle(kan)}catch(e){}
  b.dataset.kopt="1";b.dataset.kopic="face:chip";b.classList.add("kart","kopt","kopav");return}
 if(p.face)try{kitOptStackTitle(kan)}catch(e){}
 art.innerHTML=kitArtFrame(p.src,"","kopic"+(p.face?" kopface":p.lead?" koplead":""),"")+(p.tam&&typeof kitTam==="function"?kitTam(true):"");
 if(col)b.style.setProperty("--kcc0",col);b.dataset.kopt="1";b.dataset.kopic=p.how+(p.key?":"+p.key:"");b.classList.add("kart","kopt")}
window.kitOptPic=kitOptPic;window.kpOptArt=kpOptArt;window.KIT_OPT_RULES=KIT_OPT_RULES;window.KIT_OPT_TAM=KIT_OPT_TAM;
(function(){if(typeof kaNorm1!=="function")return;const n0=kaNorm1;kaNorm1=function(b){const r=n0.apply(this,arguments);try{if(b&&b.matches&&b.classList.contains("ka")&&b.matches(KIT_OPT_SEL))kpOptArt(b)}catch(e){}return r}})();
try{if(typeof kaNorm==="function"&&document.getElementById("modal"))kaNorm(document.getElementById("modal"))}catch(e){}

/* ---- kitPicZoom(src): the picture enlarged over everything; tap anywhere closes (KIT §6.2) ---- */
function kitPicZoom(src){try{if(!src)return;let z=document.getElementById("kpzoom");if(!z){z=document.createElement("div");z.id="kpzoom";z.setAttribute("role","dialog");
  z.addEventListener("click",e=>{e.stopPropagation();z.hidden=true});document.body.appendChild(z)}
 z.innerHTML=`<div class="kpzf">${kitSceneArt(src,"",{shape:"tall"})}</div>`+kitOvX("kpzoom");z.hidden=false}catch(e){}}
/* OB-M3UI (robot M3 26/11, fault 2 «lightbox with no exit», whole family: #kpzoom picture, #kpinfo «!» card): every full-screen viewer shows the ONE kit ✕ in its top-right corner;
   a tap anywhere (✕ included) closes it, and Esc / the device Back close it too (jk4 kitTopClose). */
function kitOvX(k){return typeof kitXHTML==="function"?kitXHTML(`data-kitx="${k}"`,"Đóng").replace('class="kit-x"','class="kit-x kxov"'):""}
window.kitOvX=kitOvX;
window.kitPicZoom=kitPicZoom;
/* KK29 (MAIN 136 25/11, robot M3, KIT BUG #6): a tap ANYWHERE on an option card chooses it, its picture included (iPad 1180x820: the picture tap opened this lightbox and the option was never chosen). The picture is no zoom trigger any more; kitPicZoom(src) stays for a SEPARATE control (nothing in the option card calls it). */
(function(){const st=document.createElement("style");st.id="kit-opt-pic";st.textContent=`
button.ka .kr.kwinrow>.krv>.ef.r:not(.kdup)::after{content:" khi thành";font-weight:400;white-space:nowrap}
#kpzoom{position:fixed;inset:0;z-index:100000;background:var(--kveil,#1a0f08cc);display:grid;place-items:center;cursor:zoom-out;padding:16px}
#kpzoom[hidden]{display:none!important}
#kpzoom .kpzf{width:min(78vw,calc(calc(82*var(--kvh,1vh)) * 3 / 4),506px)}
html body #modal button.ka.kopt.kopav>.kaart.kaav,html body button.ka.kopt.kopav>.kaart.kaav{overflow:visible!important;background:none!important;box-shadow:none!important;border-radius:0!important;display:flex!important;align-items:center;justify-content:center}
html body button.ka.kopt.kopav>.kaart.kaav>span.md.kmini.kmini{width:100%!important;max-width:100%}
button.ka.kopt>.kaart .ksart.kopface>img,button.ka.kopt>.kaart .ksart.koplead>img{object-position:50% 12%}
button.ka .kan .kanx{display:block;font-size:.82em;font-weight:600;opacity:.85;line-height:1.25}
button.ka .kan .knr{display:flex;flex-direction:column;align-items:flex-start;text-align:left;padding:0;margin:0;line-height:1.2}
button.ka .kan .knr-n{font-size:1em}
button.ka .kan .knr-r{font-size:.78em}
${typeof kitCompactCSS==="function"?kitCompactCSS("button.ka.kart.kopt",84,112):""}
/* one option card per row, full width (owner L109: horizontal option cards, no 2-col gaps; with the picture a half-width cell left the
   rows a thin column). Overrides jk3 31.16 k3grid and the person-dialog 2-column rules (jk4 32.7 / KIT 50 kdpo2, jplace): :is(#mb,*) +
   the repeated class only lift the specificity above theirs (2 ids, 5 classes). */
html body #modal :is(#mb,*)>.opts.opts.opts>button.ka.kopt.kart{grid-column:1/-1!important;order:0!important}
html body #modal :is(#mb,*)>.opts.opts.opts:has(> button.ka.kopt.kart),html body #modal :is(#mb,*)>.kpscopts.kpscopts.kpscopts:has(> button.ka.kopt.kart),.kitpg-opts:has(> button.ka.kopt.kart){display:grid!important;flex-direction:unset!important;grid-template-columns:minmax(0,1fr)!important;grid-auto-rows:max-content!important;align-items:stretch!important;align-content:start!important}
/* review/pcard-actrow: a person dialog (kdper, picture/figure column left) lists its option rows as a FLEX COLUMN: in the grid form above the auto rows stayed at the 130 px floor
   while a long row (Cần / Được / Mất) overflowed its box and was cut (spy-target picker, 755 px) */
html body #modal .dlg.kdper>#mb>.opts.opts.opts.opts.opts:has(> button.ka.kopt.kart){display:flex!important;flex-direction:column!important;grid-template-columns:none!important;gap:8px!important}
html body #modal .dlg.kdper>#mb>.opts.opts.opts.opts.opts>button.ka.kopt.kart{flex:0 0 auto!important;height:auto!important}
`;document.head.appendChild(st)})();
/* ===== KIT §6.2 FINAL (owner 18/11 ~07:25Z, review/opt-card-short): ONE card form for EVERY dialog option =====
   picture 66x88 (3:4 rectangle, B form) + title (odds chip under it) + EXACTLY two rows: Tốn and Được. An option without a cost / gain still shows the row, greyed ("Tốn: không" / "Được: không"),
   so every card is the same size. Mất folds into the Tốn row, the extra Được rows into the Được row (copies, marked .kdup). Everything else (Cần, Bại, Kèm, Ghi chú, lead text) is folded (.kofold) and
   opens from the "!" in the card's corner (kitOptInfo); the tap never chooses the option. EXCEPTION: a DISABLED card keeps its red Cần row (the player must see why it is dead). */
function kitOptCompactRows(b){try{if(!b||b.dataset.kocr==="1")return;const kb=b.querySelector(".kb");if(!kb)return;b.dataset.kocr="1";
 const note=kb.querySelector(".kr-note"),ton=kb.querySelector(".kr-ton .krv");
 if(note){[...note.querySelectorAll(".krv > .ef")].forEach(e=>{const t=(e.textContent||"").trim().replace(/^\(|\)$/g,"");
  if(/^trả khi làm xong$/i.test(t)&&ton){const x=document.createElement("span");x.className="ef n";x.textContent="trả khi làm xong";const sp=document.createElement("span");sp.className="ksep";sp.textContent="·";ton.append(sp,x);e.remove()}});
  note.querySelectorAll(".krv > .ksep").forEach(s=>{if(!s.previousElementSibling||!s.nextElementSibling)s.remove()});if(!note.querySelector(".krv > .ef"))note.remove()}}catch(e){}}
window.kitOptCompactRows=kitOptCompactRows;
/* a picture-less option gets the §59 placeholder in the same slot when a sibling has a picture (one form per dialog) */
/* F10 member 5 (26/11, Seat A nc_gian speed-1 b1649 crawl: kitOptUnify ← kpOptArt ← kaNorm1, 1 buổi per 3–4 min): every card of a list ran the
   whole-list unify, and each run rebuilt EVERY art-less sibling again (data-kopt off/on, rows redone) → n × n rebuilds + mutation records per pass.
   Now: one list is unified once per synchronous pass (a card normalised later in the same pass re-runs it once at the next microtask), and a
   sibling already unified whose card is unchanged is skipped. */
const KIT_OPT_UNQ=new Set(),KIT_OPT_UNL=new Set();const kitOptUnSig=x=>x.childElementCount+"|"+x.textContent.length+"|"+(x.dataset.kopt||"");
let KIT_OPT_UNI=0;function kitOptUnify(b){if(KIT_OPT_UNI)return;const c=b&&b.parentElement;if(!c)return;
 if(KIT_OPT_UNQ.has(c)){if(!KIT_OPT_UNL.size)queueMicrotask(()=>{const L=[...KIT_OPT_UNL];KIT_OPT_UNL.clear();L.forEach(c=>{if(c.isConnected)kitOptUnify0(c)})});KIT_OPT_UNL.add(c);return}
 if(!KIT_OPT_UNQ.size)queueMicrotask(()=>KIT_OPT_UNQ.clear());KIT_OPT_UNQ.add(c);kitOptUnify0(c)}
function kitOptUnify0(c){if(KIT_OPT_UNI)return;try{KIT_OPT_UNI=1;const sib=[...c.children].filter(x=>x.matches&&x.matches("button.ka")&&x.matches(KIT_OPT_SEL));if(!sib.some(x=>x.querySelector(":scope > .kaart")))return;
 sib.forEach(x=>{if(x.querySelector(":scope > .kaart")||x.classList.contains("kcard"))return;if(x.__kouS&&x.__kouS===kitOptUnSig(x))return;x.__koph=1;delete x.dataset.kopt;kpOptArt(x);kitOptCompactRows(x);kitOptFinal(x);x.__kouS=kitOptUnSig(x)})}catch(e){}finally{KIT_OPT_UNI=0}}
function kitOptFinal(b){try{if(!b||!b.matches||!b.matches("button.ka.kopt")||b.classList.contains("kcard")||b.closest(".pc")||b.classList.contains("kbare"))return;/* KIT §93.7 bare selection card: no rows */

 {const k1=b.querySelector("small.kb");if(b.__kofSig&&k1&&b.__kofSig===kitOptSig(b,k1))return}/* idempotent: our own DOM edits must not re-trigger the observers that call us */
 b.querySelectorAll(".kfill,.kobang,.kdup").forEach(e=>e.remove());b.querySelectorAll(".kofold").forEach(e=>e.classList.remove("kofold"));b.querySelectorAll(".kcpsrc").forEach(e=>e.classList.remove("kcpsrc"));
 const body=b.querySelector(":scope > .kabody")||b;let kb=body.querySelector(":scope > small.kb, :scope > .kb");if(!kb){kb=document.createElement("small");kb.className="kb";body.appendChild(kb)}
 const row=(cls,lab,chips)=>{const r=document.createElement("span");r.className="kr "+cls;r.innerHTML=`<span class="krl">${lab}</span><span class="krv"></span>`;const v=r.querySelector(".krv");chips.forEach((c,i)=>{if(i){const sp=document.createElement("span");sp.className="ksep kdup";sp.textContent="·";v.appendChild(sp)}v.appendChild(c)});return r};
 const chipsOf=r=>r?[...r.querySelectorAll(":scope > .krv > .ef, :scope > .krv > .kwhy")]:[];
 const dupOf=c=>{const x=c.cloneNode(true);x.classList.add("kdup");return x};
 const R=k=>[...kb.querySelectorAll(":scope > .kr-"+k)];
 let ton=R("ton")[0],mats=R("mat"),gains=[...R("thanh"),...R("duoc")],gain=gains[0];
 /* tinbao-words (owner OD 25/11 ~23:36Z, Tin báo «Xem tin» card read «TỐN không / ĐƯỢC không»): a FREE CHOICE card — no cost, no gain, no loss, no
    hint row and no odds of its own (only notes such as «kèm: trả lời trước …», which stay behind «!») — shows NO grey «không» rows (.kfree) */
 const free=false;/* KK56 (KIT-STD-AUDIT F7, OD 26/11 ~17:55Z KEEP ALL rows): a NAVIGATION option (nav:1) shows its Tốn / Được rows through the same kit rows (kaRows) like every card; the §6.2m no-row nav card is retired *//* OD 26/11 ~17:55Z (canon overwrite of tinbao-words): KEEP ALL result rows — «Tốn: không», «Được: không» stay on every card, nothing hidden; the .kfree no-row card is retired */
 /* LAW 3 (review/odds-meter-back): a card with NO roll (no odds of its own; a no-roll option carries no odds word at all, owner 26/11 ~18:25Z) cannot fail — its
    «mất: …» (parsed as a Bại row beside Thành) is a CERTAIN loss and stands in Tốn like a Mất row, never folded behind «!» */
 const sure=!b.querySelector(".kat .kodds,:scope > .kaart .kodb");if(sure)mats=mats.concat(R("bai"));
 /* OD 21/11 ~05:0xZ (#72): the LOSS has its own «Mất» row (Tốn = the price, Được = the gain, Mất = what can be lost), never folded into Tốn */
 const loss=[];let kemC=null,kemAfter=false;/* TMK-WARN-5 (RV-189, law 3 / 11): a ROLLED card's hint «…; nhưng X» = what comes WITH the deed (kitHint: the kèm / side losses), not what failure adds → its own Kèm row (below) */if(!ton){ton=row("kr-ton kfill","Tốn",[]);const e=document.createElement("span");e.className="ef n kdup";e.textContent="không";ton.querySelector(".krv").appendChild(e)}
 mats.forEach(m=>chipsOf(m).forEach(c=>loss.push(dupOf(c))));
 if(gain){const v=gain.querySelector(".krv");gains.slice(1).forEach(g=>chipsOf(g).forEach(c=>{const sp=document.createElement("span");sp.className="ksep kdup";sp.textContent="·";v.append(sp,dupOf(c))}))}
 else{gain=row("kr-duoc kfill","Được",[]);
  /* LAW 3 (no hidden gain / loss): an option whose value is worded only as a GỢI Ý («được lòng bề trên», «giữ trọn khắc và Sức buổi này; nhưng mất lòng bề trên») shows that wording in Được (the part before «nhưng») and Tốn (the part after it) instead of «không» */
  const hr=R("hint")[0],ht=hr?(hr.querySelector(".krv")||hr).textContent.split(/\s*;\s*/).map(x=>x.trim()).filter(x=>x&&!KA_ODDS.test(x)).join("; "):"";/* KK53 ROOT of the doubled odds clause («…; Tùy duyên; Tùy duyên» on a card): the hint string is «gain; ODDS WORD; nhưng loss» (jk2b kitHint, jroad ro.hint) and the odds word already stands in the card's own meter (.kodds) — a whole clause that IS an odds-ladder word never goes into the Được / Tốn copy, so no re-run can repeat it */const cp=(t,c)=>{const e=document.createElement("span");e.className="ef "+c+" kdup";e.textContent=t;return e};
  if(ht&&!/^(không|chưa rõ|không được mất gì)\.?$/i.test(ht)){/* only the EMPTY hints; «không dính vào thù oán …; nhưng …» is a real gain + loss (review/odds-meter-back) */const parts=ht.split(/\s*;\s*nhưng\s+|\s+nhưng\s+/),gl=parts[0].trim().split(/\s*;\s*(?=hỏng thì\s)/),g0=gl[0].trim();let l0=gl.slice(1).concat(parts.slice(1)).join("; ").trim();
   /* TMK-WARN-5 (RV-189 «Xử nhân chứng» plaques): on a ROLLED card the «nhưng …» clauses go to a Kèm row and Bại keeps ONLY the «hỏng thì …» clauses
      (before: an either-way loss — the deed's Đức — read as a failure, and the success looked free). Kèm sits under Thành when the hint writes it
      before «hỏng thì», under Bại when after. A SURE card is unchanged (its «nhưng …» is the sure loss: the Mất row). */
   if(!sure&&parts.length>1){const fi=ht.search(/;\s*hỏng thì\s/),ni=ht.search(/\s*;\s*nhưng\s+|\s+nhưng\s+/);const K=[],F=gl.slice(1).map(x=>x.trim());
    parts.slice(1).forEach(x=>{const z=x.trim().split(/\s*;\s*(?=hỏng thì\s)/);K.push(z[0].trim());F.push(...z.slice(1).map(y=>y.trim()))});
    l0=F.join("; ").trim();const kt=K.filter(Boolean).join("; ");if(kt){kemC=cp(kt,"r");kemAfter=fi>=0&&fi<ni;try{(window.__kitKem=window.__kitKem||[]).push({t:(b.querySelector(".kan,b")||b).textContent.trim().slice(0,60),hint:ht.slice(0,160),kem:kt,fail:l0,after:kemAfter})}catch(x){}/* K-HINT-KEM census hook (test only, no effect; like __kitNoGain) */}}/* KK56-R10 (MAIN LOOK 27/11, KIT §224 kaRows): a loss clause («hỏng thì …») NEVER sits in Được: split by meaning, the Thành/Được part green, the «hỏng thì …» part red in its own Mất row */gain.querySelector(".krv").appendChild(cp(g0,"g"));
   if(l0)loss.push(cp(l0.replace(/(^|;\s*)hỏng thì\s+/g,"$1"),"r"))/* the Bại / Mất label says it: never «hỏng thì …» inside a row (OD 27/11 ~05:27Z) */}
  else{const e=document.createElement("span");e.className="ef n kdup";e.textContent="không";gain.querySelector(".krv").appendChild(e);try{(window.__kitNoGain=window.__kitNoGain||[]).push((b.querySelector(".kan,b")||b).textContent.trim().slice(0,60))}catch(x){}/* KK54 (law 3 census, MAIN 171): every card whose Được falls back to «không» is listed here (test hook, no effect) */}}
 const matRow=loss.length?row("kr-mat2 kdup","Mất",loss):null;if(matRow)kb.appendChild(matRow);const kemRow=kemC?row("kr-kem kdup","Kèm",[kemC]):null;if(kemRow)kb.appendChild(kemRow);const keep=new Set([ton,gain,matRow,kemRow]);const dis=b.classList.contains("kdis");
 let extra=false;[...kb.children].forEach(r=>{if(keep.has(r)||r.classList.contains("kdup0"))return;r.classList.add("kofold");if(!(r.classList.contains("kr-mat")||(sure&&r.classList.contains("kr-bai"))||gains.includes(r)))extra=true;else r.classList.add("kcpsrc")/* K-HAND-DUPMAT (KK70): a source row whose chips the face copies (Mất → the Mất/Bại row, a sure card's Bại, the extra Được rows) — kitOptCopy(face) drops it */});
 /* order: Tốn · Được · the folded rest; the Được slot is ALWAYS labelled Được (a rolled card's Thành row, Được ngay …) */
 {const l=gain.querySelector(":scope > .krl");if(l)l.textContent=sure?"Được":"Thành";/* OD 27/11 ~05:27Z (owner approved 05:29Z): a card with ODDS reads «Thành:» (green) + «Bại:» (red) on its own line; only a SURE card reads «Được:» / «Mất:» — kaRows labels, as the act cards */if(!sure){gain.classList.remove("kr-duoc");gain.classList.add("kr-thanh");if(matRow){matRow.classList.remove("kr-mat2");matRow.classList.add("kr-bai");const ml=matRow.querySelector(":scope > .krl");if(ml)ml.textContent="Bại"}}}gain.classList.toggle("kwinrow",!sure&&gain.classList.contains("kr-thanh"))/* K-WIN-PAY (KIT_REQUESTS 21/11 econ-tamco F1): on a rolled card the Được slot IS the Thành row, so a red item there (a price paid only when it works, §88 THÀNH Mất) reads «… khi thành» */;kb.insertBefore(ton,kb.firstChild);ton.after(gain);if(matRow)gain.after(matRow);if(kemRow){if(kemAfter&&matRow)matRow.after(kemRow);else gain.after(kemRow)}
 if(free){ton.remove();gain.remove();if(!b.classList.contains("kfree"))b.classList.add("kfree")}else if(b.classList.contains("kfree"))b.classList.remove("kfree");
 const lead=b.querySelector(".klead");if(lead){lead.classList.add("kofold");extra=true}
 if(b.dataset.knav==="1")extra=false;/* §6.2m a nav card has nothing to explain */if(extra&&![...b.querySelectorAll(".kofold")].some(r=>{const v=r.querySelector(":scope > .krv")||r;return (v.textContent||"").replace(/\s+/g,"").length>0}))extra=false;/* KIT §6.2 «!» only when something real is folded behind it (MAIN 161: a lone «!» with nothing to show, whole family) */if(extra){const m=document.createElement("span");m.className="kobang";m.setAttribute("role","button");m.setAttribute("aria-label","Xem thêm");m.title="Xem thêm";m.textContent="!";b.appendChild(m)}
 /* KIT §6.6 GAIN LIST (OB-KIEP): the rows assembled here from copies follow the one list rule */if(typeof kaListFix==="function")[ton,gain,matRow,kemRow].forEach(r=>r&&kaListFix(r.querySelector(":scope > .krv")));
 b.dataset.kofin="1";b.__kofSig=kitOptSig(b,kb)}catch(e){console.error("kitOptFinal",e)}}
/* KIT §56.19 (opt-scroll-reset): the signature covers the card's SOURCE rows only, never kitOptFinal's own copies (.kdup chips, .kfill rows, the «!»).
   The rank-name painter (jaudit kitRankNamePaint) titles a bare name inside a copied chip one frame later; with the copies in the signature that edit
   made the next kaNorm pass rebuild every copy (bare again), the painter titled them again, … — ~1900 DOM edits / 600 ms, the option list re-laid out
   every frame and its scroll snapped back to the top (pgin, rcpacc, empnight, …). */
function kitOptSig(b,kb){try{const c=kb.cloneNode(true);c.querySelectorAll(".kdup,.kfill,.kobang").forEach(e=>e.remove());return c.innerHTML+"|"+(typeof kfCls==="function"?kfCls(b):b.className)}catch(e){return kb.innerHTML+"|"+(typeof kfCls==="function"?kfCls(b):b.className)}}/* kfCls: the press class is not a change (button-crawl-fix-4) */
/* ================= KIT §93.8 · kitOddsBadge — THE ODDS ON THE PICTURE OF AN EVENT lá bài (owner 27/11 ~06:10Z; scope owner 06:45Z + ~07:12Z) =================
   OPT-IN ONLY: nothing calls it by itself (no observer, not kitOptFinal). Only the EVENT hand (Bàn bài: small cards + the enlarged card) calls kitOddsBadgeHand(handEl) / kitOddsBadge(card) / kitOddsBadgeOn(pictureEl, word).
   Everywhere else (tabs, frames, popups, plaques, môn cells) the odds stay on their own row exactly as LIVE: small pictures cannot hold the badge.
   The kit odds part (kitOdds: 7-segment bar + the WHOLE ladder word, law 7) is a badge `.kodb` centred on the TOP edge of the card picture (.kaart / .khbp) on a light kit plate. Sure card (no odds) = no badge.
   On a narrow picture (~85-95 px) the bar sits above the word (flex-wrap) and the word is never clipped; font clamp(.56rem, .12 x --kas, .95rem).
   API: kitOddsBadge(card) moves card's .kodds meter onto card > .kaart; kitOddsBadgeHand(handEl) does it for every button.ka of a hand container; kitOddsBadgeOn(pictureEl, word); kitOddsBadgeHTML(word). Test: dev/test/badge-scope.js. */
function kitOddsBadgeHTML(w,o){try{if(typeof kitOdds!=="function"||typeof kitOddsLv!=="function"||kitOddsLv(w)<0)return"";return `<span class="kodb">${kitOdds(w,o)}</span>`}catch(e){return""}}
function kitOddsBadgeOn(art,w,o){try{if(!art)return null;const old=art.querySelector(":scope > .kodb");if(old)old.remove();const h=kitOddsBadgeHTML(w,o);if(!h)return null;art.insertAdjacentHTML("beforeend",h);return art.querySelector(":scope > .kodb")}catch(e){return null}}
function kitOddsBadge(b){try{if(!b||!b.querySelector)return null;const art=b.querySelector(":scope > .kaart");if(!art)return null;const k=b.querySelector(".kat .kodds,:scope > .kodds");
 if(!k)return art.querySelector(":scope > .kodb");const m=k.querySelector(".kodm");if(!m){k.remove();return null}let bd=art.querySelector(":scope > .kodb");if(!bd){bd=document.createElement("span");bd.className="kodb";art.appendChild(bd)}bd.innerHTML="";bd.appendChild(m);k.remove();return bd}catch(e){console.error("kitOddsBadge",e);return null}}
function kitOddsBadgeHand(hand){try{const n=[];(hand||document).querySelectorAll("button.ka").forEach(c=>{const r=kitOddsBadge(c);if(r)n.push(r)});return n}catch(e){return[]}}
window.kitOddsBadge=kitOddsBadge;window.kitOddsBadgeOn=kitOddsBadgeOn;window.kitOddsBadgeHTML=kitOddsBadgeHTML;window.kitOddsBadgeHand=kitOddsBadgeHand;
(function(){const st=document.createElement("style");st.id="kit-oddsbadge";st.textContent=`
.kodb{position:absolute;top:3px;left:50%;transform:translateX(-50%);z-index:4;display:flex;align-items:center;justify-content:center;max-width:calc(100% - 4px);box-sizing:border-box;padding:1px 5px;border-radius:10px;background:#fffaf0f2;border:1px solid var(--gold,#c9a46a);box-shadow:0 1px 3px #0005;pointer-events:none;font-size:clamp(.56rem,calc(var(--kas,100px)*.12),.95rem);line-height:1.15}
.kodb .kodm{display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:.1em .35em;margin:0;padding:0;background:none;border:0;pointer-events:none;max-width:100%}
.kodb .kodm b{font-size:1em;white-space:nowrap;overflow:visible;text-overflow:clip;max-width:none}.kodb .kseg i{height:.55em;width:.55em}
.kodb .kodm.kodm.kodm{flex-wrap:wrap!important;row-gap:1px}.kodb .kodm.kodm.kodm>b{flex:none;white-space:nowrap!important;max-width:100%}/* wins over the kit-odfit nowrap!important: on a ~80 px picture the bar wraps above the word and the word stays whole (KIT-STAGE-R12 finding) */
`;document.head.appendChild(st)})();
window.kitOptFinal=kitOptFinal;
(function(){const k0=kpOptArt;kpOptArt=function(b){const r=k0.apply(this,arguments);try{kitOptCompactRows(b);kitOptFinal(b);kitOptUnify(b)}catch(e){}return r};window.kpOptArt=kpOptArt})();
/* KIT §6.2d — TWO OPTION LAYOUTS (1 long row per line / 2-column grid), phone AND iPad, and ONE SIZE PER BUTTON TIER (owner 18/11 ~16:05Z + 16:15Z).
   Order of work: frame class (KIT_SIZE S/M/L/XL) -> layout -> button tier. Tier S / M / L = ONE card size each (picture box + card height; the width is the cell). Never a variant inside a tier.
   Each tier size = the LARGEST card that tier needs over every layout phone -> iPad (table in KIT.md §6.2d, scan dev/test/opt-card-scan.js). kitOptTier(g) picks, per dialog, the first of
   [2 columns S] [1 column M] [1 column L] whose cards ALL fit their tier (no card taller than the tier, nothing cut sideways). */
const KIT_OPT={tiers:{S:{pw:60,ph:60,h:132},M:{pw:66,ph:66,h:104},L:{pw:84,ph:84,h:140}},gap:8};window.KIT_OPT=KIT_OPT;
const KIT_OPT_CSS=(()=>{const T=KIT_OPT.tiers;let c="html body #modal,html body .kitpg-opts,html body .kscn-box{--ko-pw:"+T.M.pw+"px;--ko-ph:"+T.M.ph+"px;--ko-h:"+T.M.h+"px}\n";
 for(const k in T)c+=`html body #modal .opts[data-kot="${k}"],html body .kitpg-opts[data-kot="${k}"],html body .kscn-box .opts[data-kot="${k}"]{--ko-pw:${T[k].pw}px;--ko-ph:${T[k].ph}px;--ko-h:${T[k].h}px}\n`;
 c+=`html body #modal#modal button.ka.kopt.kopt:not(.kart) :is(.kofold,small.kb>.kr-hint,small.kb>.kr-why){display:none!important}
html body #modal#modal button.ka.kopt.kopt:not(.kart){min-height:var(--ko-h,104px)!important;position:relative;box-sizing:border-box;align-items:center}
html body #modal#modal button.ka.kopt:not(.kart) .kobang{position:absolute;top:5px;right:6px;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;font:700 .85rem/1 var(--body,sans-serif);color:var(--gold,#8f5f0c)!important;background:var(--k-card,#fffaf0)!important;border:1px solid var(--gold,#8f5f0c)!important;cursor:help;z-index:2}
html body #modal#modal .opts[data-kol],html body .kitpg-opts[data-kol]{display:grid!important;grid-template-columns:repeat(var(--k3c,1),minmax(0,1fr))!important;gap:${KIT_OPT.gap}px;align-content:start}
html body #modal#modal .opts[data-kol]>button.kopt:not(.kart){align-items:flex-start}
html body #modal#modal .opts[data-kol]>button.kopt>.kaart{align-self:center}
html body #modal#modal .opts[data-kol]>button.kopt>.kabody{align-self:flex-start;margin-top:var(--kbtop,0px)}
html body #modal#modal .opts[data-kol]>button.kopt .kat{min-height:var(--kat-h,0px);align-content:center;box-sizing:border-box}
html body #modal#modal .opts[data-kol]>button.kopt{grid-column:auto!important;width:auto;min-width:0;max-width:none;margin:0}`;return c})();
function kitOptCards(g){return[...g.children].filter(b=>b.matches&&b.matches("button.ka.kopt")&&!b.classList.contains("kcard")&&!b.closest(".pc")&&b.getClientRects().length)}
/* KIT §98.17 (K-BARE-GRID): a bare card (§93.7, title only) has no meter, so kitOdFit1 never sets __kodRoom for it; its title column must still be at least KIT_ODFIT.bare em wide, else the layout (2 columns) does not fit and the picker goes to 1 column (never «one word per line») */
function kitBareNarrow(b){try{if(!b.classList.contains("kbare"))return false;const k=b.querySelector(".kat");if(!k)return false;const fs=parseFloat(getComputedStyle(k).fontSize)||13;return k.getBoundingClientRect().width/fs<(typeof KIT_ODFIT!=="undefined"?KIT_ODFIT.bare:9)}catch(e){return false}}
/* KIT §6.2h COLUMN TOO NARROW FOR ITS TEXT (KK43, MAIN 159 iPad «Danh hiệu mới»: «Đeo ngay» / «Để sau» side by side in the S frame, one word per line; law 11 whole family):
   a layout does not fit when a card's text stacks — a title of ≤ KIT_OPT_NARROW.short words breaks at all, or any title / visible row value puts one word per line.
   Then the picker steps 2 columns → 1 column (every option list, Fold and iPad, every frame size incl. the step-down N* frames). Lines are counted from the text's own line boxes. */
const KIT_OPT_NARROW={short:3,stack:2};window.KIT_OPT_NARROW=KIT_OPT_NARROW;
function kitTxtLines(e){try{const r=document.createRange();r.selectNodeContents(e);const ys=new Set();for(const q of r.getClientRects())if(q.width>1&&q.height>1)ys.add(Math.round(q.top/4));return ys.size}catch(x){return 1}}
function kitTxtStack(e,short){const t=(e.textContent||"").replace(/\s+/g," ").trim();if(!t||!e.getClientRects().length)return false;const w=t.split(" ").length,l=kitTxtLines(e);if(l<=1)return false;return (short&&w<=KIT_OPT_NARROW.short)||(w>=KIT_OPT_NARROW.stack&&l>=w)}
function kitOptNarrow(b){try{const n=b.querySelector(".kat .kan")||b.querySelector(".kan");if(n){const P=n.querySelector(".knr")?[...n.querySelectorAll(".knr > *")]/* KIT 48.6 stacked rank over name: each line on its own */:[n];if(P.some(e=>kitTxtStack(e,true)))return true}for(const v of b.querySelectorAll(":scope > .kabody .kr:not(.kofold) > .krv, :scope .kb > .kr:not(.kofold) > .krv"))if(v.getClientRects().length&&kitTxtStack(v,false))return true;return false}catch(e){return false}}
window.kitOptNarrow=kitOptNarrow;window.kitTxtStack=kitTxtStack;
function kitOptCut(b){const R=b.getBoundingClientRect();const bd=b.querySelector(":scope > .kabody")||b;for(const e of bd.querySelectorAll("*")){if(!e.getClientRects().length)continue;const r=e.getBoundingClientRect();if(r.width&&r.right>R.right+1)return true}return false}
/* KIT §56.19 (opt-scroll-reset): kitOptTier runs again on every kaNorm pass (any node added anywhere in the page: a toast, a timer, the HUD). Its trial layouts
   (2 columns S first) shrink the list for a moment and the browser clamps the scroll owner's scrollTop, so the player's scroll snapped back to the top.
   (1) Nothing changed since the last pick (list width, the cards, their classes, text and heights under the picked tier) → keep the pick, touch nothing.
   (2) A real re-pick keeps the scroll position of the list and its scrolling ancestors. */
function kitOptTierSig(g,bs){return Math.round(g.clientWidth)+"|"+(g.dataset.kol||"")+(g.dataset.kot||"")+"|"+bs.map(b=>(typeof kfCls==="function"?kfCls(b):b.className)+":"+b.textContent.length+":"+b.offsetHeight)/* layout height: the press scale (.kfdown) is not a size change (button-crawl-fix-4) */.join(",")}
const KOT_MEMO=new Map(),KOT_MEMO_MAX=200;window.KOT_MEMO=KOT_MEMO;
function kitOptMemoKey(g,bs){try{return Math.round(g.clientWidth)+"|"+innerWidth+"x"+innerHeight+"|"+(parseFloat(getComputedStyle(document.documentElement).fontSize)||16)+"|"+bs.map(b=>b.className.replace(/\bk(?:od(?:row|w|stk)|apic\w*)\b/g,"").replace(/\s+/g," ").trim()+":"+(b.querySelector(":scope > .kaart")?1:0)+":"+b.textContent).join("¦")}catch(e){return""}}
function kitOptTier(g){try{if(g.classList.contains("khand"))return;/* KIT §101: a hand of cards (jkhand) lays itself out */const bs=kitOptCards(g);if(!bs.length||g.__kotBusy)return;if(g.__kotSig&&g.dataset.kot&&g.__kotSig===kitOptTierSig(g,bs)){g.style.setProperty("--k3c",g.dataset.kol);/* kszBtnGridLive3 rewrote --k3c from its own width rule: the picked layout wins (OD 21/11 ~04:00Z #49b, iPad 2 columns) */return g.dataset.kol+g.dataset.kot}
 const SC=[];for(let e=g;e&&e.nodeType===1;e=e.parentElement)if(e.scrollTop>0)SC.push([e,e.scrollTop]);
 g.__kotBusy=1;const T=KIT_OPT.tiers;
 bs.forEach(b=>{const m=b.querySelector(".kobang");if(m&&m.parentElement!==b)b.appendChild(m)});/* the "!" is always the card's own corner child (a picture-less hide-out card had it inside the title) */
 const set=(lay,t)=>{g.style.setProperty("--kat-h","0px");g.style.setProperty("--kbtop","0px");g.dataset.kol=lay;g.dataset.kot=t;g.style.setProperty("--k3c",lay);bs.forEach(b=>b.style.setProperty("--k3s",1));bs.forEach(b=>{b.style.removeProperty("min-height");const a=b.querySelector(":scope > .kaart");if(a)a.style.removeProperty("height")});void g.offsetHeight;bs.forEach(b=>{if(typeof kitOdFit1==="function")kitOdFit1(b)});/* KIT §6.2b-1: the meter stacks by the TITLE ROOM (j79 kitOdFit1), one rule for every card */void g.offsetHeight};
 const band=t=>{g.style.setProperty("--kat-h","0px");g.style.setProperty("--kbtop","0px");void g.offsetHeight;const kh=Math.max(0,...bs.map(b=>{const k=b.querySelector(".kat");return k?Math.ceil(k.getBoundingClientRect().height):0}));g.style.setProperty("--kat-h",kh+"px");void g.offsetHeight;
  const mb=Math.max(0,...bs.map(b=>{const k=b.querySelector(":scope > .kabody");return k?Math.ceil(k.getBoundingClientRect().height):0}));g.style.setProperty("--kbtop",Math.max(0,Math.floor((KIT_OPT.tiers[t].h-mb-14)/2))+"px");void g.offsetHeight};
 const fit=(lay,t)=>{set(lay,t);band(t);const hs=bs.map(b=>Math.round(b.getBoundingClientRect().height)),cut=bs.map(kitOptCut);const ok=bs.every((b,i)=>hs[i]<=T[t].h&&!cut[i]&&!(typeof KIT_ODFIT!=="undefined"&&b.__kodRoom<KIT_ODFIT.min)&&!kitBareNarrow(b)&&!(lay==="2"&&kitOptNarrow(b)));/* §6.2h: 2 columns only when no card text stacks *//* KIT §6.2b-1: a layout that leaves a title less than KIT_ODFIT.min em beside its meter does not fit (2 columns → 1 column) */(window.__kotLog=window.__kotLog||[]).push(lay+t+":"+hs.join("/")+(cut.some(x=>x)?"cut":"")+(ok?"ok":""));return ok};
 const one=!!(g.closest&&g.closest("#modal.kgoalhow,.kgoalhow"));/* KK54 (RV-165 §6.2l, law 10): the «Cách làm» nav cards (Đi tới / Xem Dư đồ) are ONE long row each, never two columns */const seq=bs.length>=2&&!one?[["2","S"],["1","M"],["1","L"]]:[["1","M"],["1","L"]];let pick=seq[seq.length-1],last=null,settled=false;
 /* KIT §98.13 (fitfast r2): the pick is a pure function of the list width, the viewport and what the cards SAY (class + text), so a card shape seen before is laid out ONCE: try its remembered tier first (same fit test); it only wins when it fits AND is where the trial loop stopped before (every tier before it in the sequence was rejected for the same inputs) — a miss or a failed check runs the full loop exactly as before */
 const mk=kitOptMemoKey(g,bs),hit=mk&&KOT_MEMO.get(mk);
 if(hit){const q=seq.find(x=>x[0]+x[1]===hit);if(q&&fit(q[0],q[1])){pick=q;last=q;settled=true}}
 if(!settled)for(const q of seq){const ok=fit(q[0],q[1]);last=q;if(ok){pick=q;settled=true;break}}
 if(mk&&settled){if(KOT_MEMO.size>=KOT_MEMO_MAX)KOT_MEMO.delete(KOT_MEMO.keys().next().value);KOT_MEMO.set(mk,pick.join(""))}
 /* the layout left by the last trial IS the picked one (set + band done): nothing to lay out again */
 const again=!(last&&last[0]===pick[0]&&last[1]===pick[1]);
 if(again)set(pick[0],pick[1]);bs.forEach(b=>{b.dataset.kapic="eq"});
 /* OWNER 18/11 ~21:20Z: the title sits in the card's TOP BAND, vertically centred there, the SAME in every card of the frame: one band height (the tallest title band), the card's text block starts at ONE top offset (the tallest block centred in the tier height) */
 if(again)band(pick[1]);
 /* KIT §6.2c (owner 24/11, MAIN GO): the picture is a SQUARE of the tier (pw = ph), never stretched to the card height (the #49c fill rule is gone) */
 g.__kotBusy=0;try{const dl=g.closest(".dlg");if(dl&&typeof kszEvLaw10==="function"){kszEvLaw10(dl);if(typeof kszTextFirst3==="function")kszTextFirst3(dl)/* law 10 text first stays after every option re-layout */}}catch(e){}
 SC.forEach(([e,t])=>{if(e.isConnected&&e.scrollTop!==t)e.scrollTop=t});
 /* late changes (fonts, pictures, a frame re-pick, a resize) re-run the choice: the grid or a card changed size under the picked tier */
 if(!g.__kotRO&&typeof ResizeObserver==="function"){g.__kotRO=new ResizeObserver(()=>{if(g.__kotBusy||!g.isConnected)return;const T0=KIT_OPT.tiers[g.dataset.kot],c=kitOptCards(g);const bad=c.some(b=>b.getBoundingClientRect().height>T0.h+1||kitOptCut(b));const w=Math.round(g.clientWidth);if(bad||w!==g.__kotW){g.__kotW=w;clearTimeout(g.__kotT);g.__kotT=setTimeout(()=>kitOptTier(g),50)}});g.__kotRO.observe(g);bs.forEach(b=>g.__kotRO.observe(b))}
 g.__kotW=Math.round(g.clientWidth);g.__kotSig=kitOptTierSig(g,bs);if(again&&typeof kitOdRefit==="function")kitOdRefit(bs);/* KIT §6.2b-1: the trial layouts moved every title row; fit the meters on the final one (when the last trial was the picked layout the meters were just fitted on it: no refit) */return pick.join("")}catch(e){g.__kotBusy=0;console.error("kitOptTier",e)}}
window.kitOptTier=kitOptTier;window.kitOptCards=kitOptCards;
/* "!" on a card: the full card (every row, lead text) in an overlay; tap anywhere closes; the option is NOT chosen */
/* KIT §6.2o K-HAND-MAT (KK63, TMK-WARN F seat s21e, laws 3 + 9 + 11): ONE copy builder for every read-only copy of an option card — the hand plate
   (jkhand kitHandPlate) and the «!» overlay (kitOptInfo). The copy shows the card's SOURCE rows (folded ones unfolded; kitOptFinal's own .kdup / .kfill
   copies dropped so nothing prints twice). ROOT of the lost Mất rows: the copy is a disabled button (it must not be pressed), and the locked-card rule
   (j63 «button.ka:disabled .kr-mat / .kr-kem / .kr-bai {display:none}») hid EVERY Mất / Kèm / Bại row on it — the player read only Được on a card
   whose model held 5 Mất rows («Nhận bạc, làm tai mắt»). Now the copy is .kopinfo (exempt from that rule) and only a copy of a LOCKED card
   (disabled / .kdis) carries .khlock, which keeps the locked look. A no-roll card's Bại row is a certain loss: it is labelled Mất, as on the card. */
function kitOptCopy(b,face){const c=b.cloneNode(true);c.removeAttribute("id");c.querySelectorAll("[id]").forEach(e=>e.removeAttribute("id"));c.querySelectorAll(face?".kaart,.kobang,.kcpsrc":".kaart,.kobang,.kfill,.kdup,.kdup0").forEach(e=>e.remove());/* K-HAND-DUPMAT (KK70, TMK-WARN-3): the face keeps the face rows (.kfill / .kdup copies), so the SOURCE rows those copy (.kcpsrc, kitOptFinal) go — a sure card's «Mất» printed twice (kr-mat2 copy + the unfolded kr-mat / kr-bai); the plain copy keeps the sources and drops the copies *//* face = the hand's enlarged card (jkhand kitHandBigBuild, KIT §101.10 «info on the FRONT»): it keeps the card face's own Tốn / Được rows (.kfill / .kdup) and shows the hint only when no row says it; every source row (Được, Mất, Kèm, Bại) is kept either way */c.querySelectorAll(".kofold").forEach(e=>e.classList.remove("kofold"));
 c.querySelectorAll(".kr-ton,.kr-duoc").forEach(r=>{if(!r.querySelector(".krv > *")&&!(r.querySelector(".krv")||{}).textContent)r.remove()});
 if(!b.querySelector(".kat .kodds"))c.querySelectorAll(".kr-bai > .krl").forEach(l=>{l.textContent="Mất"});
 ["--kx","--ky","--kr","--k3s","min-height"].forEach(p=>c.style.removeProperty(p));c.classList.remove("kopt","kart","klift","kfdown");c.classList.add("kopinfo");if(b.disabled||b.classList.contains("kdis"))c.classList.add("khlock");
 c.disabled=true;c.type="button";c.removeAttribute("data-m");c.removeAttribute("data-khi");return c}
window.kitOptCopy=kitOptCopy;
function kitOptInfo(b){try{let z=document.getElementById("kpinfo");if(!z){z=document.createElement("div");z.id="kpinfo";z.setAttribute("role","dialog");z.addEventListener("click",e=>{e.stopPropagation();z.hidden=true});document.body.appendChild(z)}
 const c=kitOptCopy(b);z.innerHTML="";z.appendChild(c);z.insertAdjacentHTML("beforeend",kitOvX("kpinfo"));z.hidden=false}catch(e){console.error(e)}}
window.kitOptInfo=kitOptInfo;
document.addEventListener("click",e=>{try{const m=e.target&&e.target.closest&&e.target.closest("button.ka.kopt > .kobang");if(!m)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();kitOptInfo(m.parentElement)}catch(x){}},true);

/* ===== KIT §6.2c DIALOG NUMBER LINES BEHIND "!" (owner 18/11 07:25Z): the formula / threshold lines of a dialog's info (Phẩm = …, Thường dưới 6 · Khá 6 · …) are NOT shown in the dialog;
   kitNumBox(html) puts a "!" in the info's corner (float right) and keeps the lines hidden (.knum); the key sentences stay as normal text. Tap "!" = the lines in the overlay (#kpinfo). */
function kitNumBox(h){return `<span class="knbang" role="button" tabindex="0" aria-label="Xem thêm" title="Xem thêm">!</span><div class="knum">${h}</div>`}
window.kitNumBox=kitNumBox;
document.addEventListener("click",e=>{try{const m=e.target&&e.target.closest&&e.target.closest(".knbang");if(!m)return;const n=(m.parentElement||document).querySelector(":scope > .knum");if(!n)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();
 let z=document.getElementById("kpinfo");if(!z){z=document.createElement("div");z.id="kpinfo";z.setAttribute("role","dialog");z.addEventListener("click",ev=>{ev.stopPropagation();z.hidden=true});document.body.appendChild(z)}
 z.innerHTML=`<div class="kopinfo knumpop">${n.innerHTML}</div>`+kitOvX("kpinfo");z.hidden=false}catch(x){}},true);
(function(){const st=document.createElement("style");st.id="kit-num-bang";st.textContent=`
#modal .knum{display:none!important}
#modal .kpmain:has(>.knbang),#modal .kpmain:has(.knbang){position:relative}
#modal .kpmain:has(.knbang)>:is(p,.kfacts,.kfact,div):first-of-type{padding-right:30px}
#modal .knbang{position:absolute;top:0;right:7px;z-index:2;margin:0;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;font:700 .85rem/1 var(--body,sans-serif);color:var(--gold,#8f5f0c);background:var(--k-card,#fffaf0);border:1px solid var(--gold,#8f5f0c);cursor:help}
#modal .knbang::after{content:"";position:absolute;inset:-9px}
#kpinfo>.knumpop{width:min(560px,92vw);box-sizing:border-box;padding:12px 14px;background:var(--k-card,#fffaf0);border:1px solid var(--gold,#8f5f0c);border-radius:10px;color:var(--ink,#2a1a12);cursor:zoom-out;font-size:.9rem}
#kpinfo>.knumpop p{margin:0 0 6px}`;document.head.appendChild(st)})();
/* tinbao-words (MAIN 147 look): a FREE CHOICE card (.kfree, no rows) has no title rule under its name — nothing sits under it (same as .kback) */
(function(){const st=document.createElement("style");st.id="kit-opt-free";st.textContent="html body button.ka.kfree .kat{border-bottom:0!important;padding-bottom:0!important;margin-bottom:0!important}html body button.ka.kfree>.kabody>small.kb:empty,html body button.ka.kfree small.kb:empty{display:none!important}";document.head.appendChild(st)})();
(function(){const st=document.createElement("style");st.id="kit-opt-final";const mk=O=>`${O}{--kaw:var(--ko-pw,66px)!important;--kah:var(--ko-ph,66px)!important;min-height:var(--ko-h,104px)!important;height:auto!important;align-items:center!important;box-sizing:border-box;position:relative;padding-top:6px!important;padding-bottom:6px!important}
${O}>.kaart{flex:0 0 var(--ko-pw,66px)!important;width:var(--ko-pw,66px)!important;height:var(--ko-ph,66px)!important;min-height:0!important;aspect-ratio:1/1;align-self:center!important;margin-block:0!important}/* KIT §6.2c: SQUARE picture, one size per tier */
${O} .kat{flex-wrap:nowrap!important;align-items:center!important;padding-right:24px}/* OD 21/11 ~04:00Z (#49a): the odds word sits ON THE TITLE ROW, never its own row */
${O} .kat>.kan{line-height:1.15;text-align:left}/* one alignment for every card title (owner via MAIN 88: «Đeo ngay» left vs «Để sau» centred) */
${O} .kat>.kan{flex:1 1 0!important;min-width:0!important}
${O} .kat>.kodds{flex:0 0 auto!important;margin-left:auto}
${O} small.kb{row-gap:1px!important}
${O} small.kb>.kr>.krv{display:block!important}
${O} small.kb>.kr>.krv>*{display:inline!important}
${O} small.kb>.kr>.krv>.ksep{display:inline!important;margin:0 4px!important;opacity:.55}
${O} .kofold,${O} small.kb>.kr-hint,${O} small.kb>.kr-why{display:none!important}/* Gợi ý / Vì sao rows (a hide-out card adds them after the first fold pass) stay behind "!" */
${O} .kfill .ef{color:var(--dim,#9a8a78)!important;font-weight:400!important}
${O} .kfill .krl{opacity:.6}
${O}>.kobang{position:absolute;top:5px;right:6px;width:22px;height:22px;border-radius:50%;display:grid;place-items:center;font:700 .85rem/1 var(--body,sans-serif);color:var(--gold,#8f5f0c);background:var(--k-card,#fffaf0);border:1px solid var(--gold,#8f5f0c);cursor:help;z-index:2}
${O}>.kobang::after{content:"";position:absolute;inset:-9px}`;
 st.textContent=mk("html body #modal#modal button.ka.kart.kopt.kopt")+"\n"+mk("html body .kitpg-opts>button.ka.kart.kopt.kopt")+"\n"+mk("html body .kscn-box button.ka.kart.kopt.kopt")+`
/* KIT §6.2d TWO OPTION LAYOUTS + ONE SIZE PER BUTTON TIER (owner 18/11 ~16:05Z + 16:15Z): layout "1" = one long button per row, "2" = two-column grid, on phone AND iPad; tier S / M / L = ONE card size each (KIT_OPT.tiers) */
${KIT_OPT_CSS}
#kpinfo{position:fixed;inset:0;z-index:100001;background:#1a0f08cc;display:grid;place-items:center;cursor:zoom-out;padding:16px}
#kpinfo[hidden]{display:none!important}
/* OB-M3UI: the kit ✕ of a full-screen viewer (#kpzoom, #kpinfo) and of the word pop-up (#kpop): the same kit-x, only placed in the corner */
html body .kit-x.kxov{position:fixed!important;top:calc(12px + env(safe-area-inset-top,0px));right:12px;z-index:2}
html body .kpop>.kit-x.kxpop{position:absolute!important;top:4px;right:4px;width:28px;height:28px;min-width:28px;min-height:28px;font-size:14px;padding:0}
html body .kpop:has(>.kit-x.kxpop){padding-right:36px}
#kpinfo>button.kopinfo{width:min(560px,92vw);max-height:calc(86*var(--kvh,1vh));overflow:auto;text-align:left;cursor:zoom-out;opacity:1!important;pointer-events:none;background:var(--k-card,#fffaf0)!important;color:var(--ink,#2a1a12)!important;filter:none!important}`;document.head.appendChild(st)})();
/* §6.2e A SHORT PHRASE NEVER BREAKS (KK35; MAIN 149 «Tin báo» Fold: «Để / ta / xem» one word per line beside the big thumbnail; law 11 = every LIST option card,
   hand cards §101 have their own face): a card name of ≤ 4 words that wraps, or any name broken one word per line, first gets the SMALL thumbnail (.kofit1),
   still broken → the name goes UNDER the thumbnail row (.kofit2, full card width). Measured after layout (rAF) on every open / re-render / resize. */
function kitOptNameBad(b){try{const kan=b.querySelector(".kat>.kan");if(!kan||!b.querySelector(":scope>.kaart"))return false;const c=kan.cloneNode(true);c.querySelectorAll(".kodds,.khnx,small,.kb,.kwhy").forEach(e=>e.remove());const t=(c.textContent||"").replace(/\s+/g," ").trim();if(!t)return false;const nw=t.split(" ").length;
 const lh=parseFloat(getComputedStyle(kan).lineHeight)||(parseFloat(getComputedStyle(kan).fontSize)||14)*1.15;const n=Math.round(kan.getBoundingClientRect().height/lh);return n>1&&(nw<=4||(nw>=2&&n>=nw))}catch(e){return false}}
/* ONE thumbnail size per option list (law 10): the step a card needs is given to every card of its list */
function kitOptNameFit(g){try{if(!g||!g.isConnected||g.classList.contains("khand"))return;const bs=[...g.children].filter(b=>b.matches&&b.matches("button.ka.kart.kopt")&&b.getClientRects().length);if(!bs.length)return;
 bs.forEach(b=>b.classList.remove("kofit1","kofit2"));if(!bs.some(kitOptNameBad))return;bs.forEach(b=>b.classList.add("kofit1"));if(!bs.some(kitOptNameBad))return;bs.forEach(b=>{b.classList.remove("kofit1");b.classList.add("kofit2")})}catch(e){}}
function kitOptNameFitAll(){try{document.querySelectorAll("#modal:not([hidden]) .opts:not(.khand),.kitpg-opts,.kscn-box .opts:not(.khand)").forEach(kitOptNameFit)}catch(e){}}
let KONF_T=0;function kitOptNameFitSoon(){if(KONF_T)return;KONF_T=requestAnimationFrame(()=>{KONF_T=0;kitOptNameFitAll()})}
window.kitOptNameFit=kitOptNameFit;window.kitOptNameFitAll=kitOptNameFitAll;
(function(){try{const M=document.getElementById("modal");if(M&&typeof MutationObserver==="function")new MutationObserver(ms=>{for(const m of ms){const t=m.target;if(t&&t.closest&&t.closest(".opts")&&!(m.type==="attributes"&&/^kofit/.test(String(t.className||"").split(" ").find(x=>/^kofit/.test(x))||"")&&m.attributeName==="class")){kitOptNameFitSoon();return}}}).observe(M,{subtree:true,childList:true,characterData:true});
 addEventListener("resize",kitOptNameFitSoon);const s0=window.showModal;if(typeof s0==="function"){window.showModal=showModal=function(){const r=s0.apply(this,arguments);kitOptNameFitSoon();return r}}}catch(e){}})();
(function(){const st=document.createElement("style");st.id="kit-opt-namefit";const P="html body #modal#modal#modal button.ka.kart.kopt.kopt.kopt";const Q2="html body .kitpg-opts>button.ka.kart.kopt.kopt.kopt";
 st.textContent=[P,Q2].map(O=>`${O}.kofit1,${O}.kofit2{--ko-pw:40px;--ko-ph:40px}
${O}.kofit2{flex-wrap:wrap!important;align-content:center!important}
${O}.kofit2>.kabody{flex:1 0 100%!important;width:100%!important;max-width:none!important}
${O}.kofit2>.kaart{margin-inline:auto 0}`).join("\n");document.head.appendChild(st)})();
/* kit sample page (§6.2): three options of "Hoàng hậu triệu kiến" through the real modal markup → kaNorm → kpOptArt */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§6.2",title:"Thẻ lựa chọn: tranh bên trái, thông tin bên phải (thẻ gọn)",html:()=>
 `<div class="opts kitpg-opts">`+
 [["Cúi đầu nhận lỗi","tốn: "+BAL.time.cost.talk+" khắc"],["Thưa rằng do Hoàng thượng định","tốn: "+BAL.time.cost.talk+" khắc"],["Dâng lễ vật xin bỏ qua",`tốn: Bạc -${BAL.kitpage.demo.gift.bac}, ${BAL.kitpage.demo.k} khắc`]]
  .map(([n,x],i)=>`<button class="opt" data-ksample="${i}">${n}<small>${typeof kitParse==="function"?kitParse(x):x}</small></button>`).join("")+`</div>`})}catch(e){}
/* kit sample page (§6.2b FINAL): no cost / no gain → grey "không" rows, long note behind "!", every card one size */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§6.2b",title:"Thẻ lựa chọn: một cỡ, chỉ Tốn và Được (còn lại sau dấu !)",html:()=>
 `<div class="opts kitpg-opts">`+
 [["Tiếp","thân +3"],["Xin về tảo mộ tổ tiên",`tốn: Sức -${BAL.kitpage.demo.tomb.suc} · được: Đức +${BAL.kitpage.demo.tomb.duc}, cha mẹ vui lòng · ghi chú: chơi 6 phần ra Khá`],["Thôi, không làm gì","ghi chú: để lần sau"]]
  .map(([n,x],i)=>`<button class="opt" data-ksample="${i}">${n}<small>${typeof kitParse==="function"?kitParse(x):x}</small></button>`).join("")+`</div>`})}catch(e){}
/* kit sample page (§6.2b-END, FIRSTCARD-3, owner OD 26/11 ~18:25Z): the odds word only on an option that really rolls. The button opens a REAL dialog
   (Q + showModal, the game's own path): (1) a hidden roll declared by the real kitRiskOpt (true chance → word(p) lead + the red Mất row), (2) a certain
   ending of a real choice → NO odds word, (3) a safe option → NO odds word; the choice holds a life-changing option, so the small line «Cẩn thận khi lựa chọn» stands above it. */
function kitEndSample(){try{if(typeof S==="undefined"||!S||typeof Q==="undefined"||Q.length)return false;const pg=document.getElementById("kitpage");const was=!!(pg&&!pg.hidden);const back=()=>{if(was&&pg)pg.hidden=false};if(pg)pg.hidden=true;
 const nop=()=>setTimeout(back,0);const o1=kitRiskOpt({n:"Dâng khúc đàn",fx:{},x:"",j67:"tốn: không",hint:"chơi một màn đàn",go:nop},BAL.odds.cut[0],"không lọt vào bốn người đứng đầu thì bị ban hoa, kiếp này dừng",true);
 Q.push({t:"Lễ ra mắt (mẫu kit)",h:"<p>Mẫu §6.2b-END: chữ cơ hội chỉ ở lựa chọn có gieo; lựa chọn đổi kết cục có dòng cẩn thận phía trên.</p>",pid:"kitpg-end",onClose:back,
  opts:[o1,{n:"Cắt tóc đi tu",fx:{},x:"",j67:"tốn: không",hint:"thoát khỏi mọi chuyện; nhưng kiếp này dừng",go:nop},{n:"Vâng lời, chờ ngày khác",fx:{},x:"",j67:"tốn: không",go:nop}]});showModal();return true}catch(e){console.error("kitEndSample",e);return false}}
window.kitEndSample=kitEndSample;
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§6.2b-END",title:"Thẻ lựa chọn có thể dừng kiếp này: chữ cơ hội chỉ ở lựa chọn có thật sự gieo; lựa chọn đổi kết cục không có chữ, có dòng «Cẩn thận khi lựa chọn» (chạm để mở thẻ thật)",html:()=>{const ok=typeof S!=="undefined"&&S;
 return `<div class="kitpg-row"><button type="button" class="kbtn alt" onclick="kitEndSample()"${ok?"":" disabled"}>Lễ ra mắt · ban hoa · đi tu</button></div>`+(ok?"":kitFacts(["Vào một kiếp rồi mở lại trang mẫu để xem thẻ."],{group:false}))}})}catch(e){}
/* kit sample page (§6.2c): the tall-frame rule, described (the real frames are the modals themselves) */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§6.2c",title:"Khung hội thoại: điện thoại, chỉ khung cao (L / XL) kéo đúng tỷ lệ màn hình",html:()=>
 `<div class="kpnote">Điện thoại dọc: chỉ khung hội thoại cao (cỡ L, XL) kéo cao cả trên lẫn dưới, tỷ lệ bằng màn hình. Khung thấp, nhỏ, ngắn (S, M) giữ nguyên.</div>`})}catch(e){}
/* kit sample page (§6.2d): the two option layouts and the three button tiers, one size each */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§6.2d",title:"Thẻ lựa chọn: hai cách xếp (một hàng dài / hai cột) và ba bậc nút S · M · L, mỗi bậc một cỡ",html:()=>{
 const card=(n,x,i)=>`<button class="opt" data-ksample="d${i}">${n}<small>${typeof kitParse==="function"?kitParse(x):x}</small></button>`;
 const set=(lab,lay,t,L)=>`<div class="kpnote">${lab}</div><div class="opts kitpg-opts" data-kol="${lay}" data-kot="${t}" style="--k3c:${lay}">`+L.map(([n,x],i)=>card(n,x,i)).join("")+`</div>`;
 return set("Hai cột, bậc S (chữ ngắn)","2","S",[["Tiếp","tốn: "+BAL.kitpage.demo.k+" khắc"],["Lui về","tốn: "+BAL.kitpage.demo.k+" khắc"]])
  +set("Một hàng dài, bậc M","1","M",[["Cúi đầu nhận lỗi","tốn: "+BAL.kitpage.demo.k+" khắc"],["Dâng lễ vật xin bỏ qua","tốn: Bạc -"+BAL.kitpage.demo.gift.bac+", "+BAL.kitpage.demo.k+" khắc"]])
  +set("Một hàng dài, bậc L (chữ dài nhất)","1","L",[["Xin về tảo mộ tổ tiên cho trọn đạo hiếu","tốn: Sức -"+BAL.kitpage.demo.tomb.suc+" · được: Đức +"+BAL.kitpage.demo.tomb.duc+", cha mẹ vui lòng"]])}})}catch(e){}
/* kit sample page (§6.3, review/pcard-actrow): the acts of a person card = the same long row, one per line (pop-up / tab / any width) */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§6.3",title:"Việc trên thẻ người: ảnh vuông + Tốn/Được, ô thông tin full-width dưới",html:()=>
 `<div class="pc"><div class="pcr"><div class="pcb">`+
 [["Tâm sự","tốn: "+BAL.time.cost.talk+" khắc · được: thiện cảm +6 · ghi chú: chỉ làm được khi nàng ta ở nhà"],["Sai đi dò la","Tùy duyên · tốn: "+BAL.time.cost.talkAct+" khắc · được: biết 2 điều thật về nàng ta, "+evSg(BAL.ag.ev.one)+" · mất: thiện cảm -5 · cần: đã gặp mặt"],["Nghe ngóng chung","tốn: "+BAL.time.cost.talk+" khắc · được: biết 1 điều thật trong cung (hay về người đang gây chuyện)"]]
  .map(([n,x],i)=>pbtn(`data-kitsample="pc${i}"`,n,typeof kitParse==="function"?kitParse(x):x,"")).join("")+`</div></div></div>`})}catch(e){}
/* GOAL / TASK cards (owner 16/11 21:10Z, chapter goal list "Đi làm: Học một môn tài nghệ" had no picture): an "Đi làm: <việc>" option is matched on the
   task itself (prefix dropped), and when nothing names a picture it shows the task's act / act-category picture (kitActArt) — every goal card has one. */
(function(){const p0=kitOptPic;kitOptPic=function(title,b){const t=kitOptPlain(title),m=/^Đi làm:\s*(.+)$/i.exec(t);if(!m)return p0.apply(this,arguments);
 const r0=p0.apply(this,arguments);if(r0&&r0.src&&r0.how!=="ph")return r0;const r=p0.call(this,m[1],b);if(r&&r.src&&r.how!=="ph")return r;try{const a=kitActArt(m[1]);if(a&&a.src&&!/\/ph-(?:act-|event-|[plws]-)/.test(a.src)&&kitOptOnCdn(a.src))return{src:a.src,key:"",how:"cat"}}catch(e){}return r0&&r0.how==="ph"?r0:r};/* nothing yet (e.g. the person chip is painted later): "none" lets kpOptArt run again */window.kitOptPic=kitOptPic})();
/* bag-inline (owner mark #23, 21/11 ~02:50Z "Tư trang › Việc: act cards have no picture"): the six Việc acts had no ACTS.json entry, so they showed the placeholder.
   Code-side alias (no CDN manifest push; ACTS.json wins when it gains the same title): each reuses the picture of its meaning group
   (owner 15/11: one picture per meaning group). Chợ đen has no picture of its own yet (ART REQUEST in FOREMAN_C_STATUS) and uses "buôn bán lén". */
const KIT_ACT_ALIAS={"Nhờ thái giám mua đồ":"mua-hang","Soát đồ":"kiem-tra-ruong","Sai cung nữ thân tín mua lén ngoài cung":"len-mua-ngoai-cung-h","Hối lộ người ở Thái y viện":"mua-chuoc","Chợ đen ở cửa Thần Vũ":"buon-ban-len","Xin đồng minh":"ket-minh"};
try{const kak0=kitActKey;kitActKey=function(name){try{const a=KIT_ACT_ALIAS[kpPlain(name)];if(a&&!((KIT_ACTS.acts||{})[kpPlain(name)]))return a}catch(e){}return kak0.apply(this,arguments)}}catch(e){}
try{const ka0=kitActArt;kitActArt=function(name){const r=ka0.apply(this,arguments);try{const n=kpPlain(name),a=KIT_ACT_ALIAS[n];if(a&&r&&!((KIT_ACTS.acts||{})[n]))r.src=`img/act-${a}.webp`}catch(e){}return r};window.kitActArt=kitActArt}catch(e){}
/* ===== KIT §6.2k «CẨN THẬN KHI LỰA CHỌN» — ONE small warning line above a choice (owner 26/11 ~18:25Z, KK44) =====
   Options that do NOT roll a chance but change her ending / life (xuất giá, đi tu / xuất gia, tự vẫn, rời cung, chuyển kiếp, «Cúi đầu chờ xét» …) show NO odds word;
   instead the dialog carries warn:1 (Q card, or kitPanel spec.warn) and the kit draws ONE line «Cẩn thận khi lựa chọn» right above its option list (.opts).
   The word lives in VANPHONG (KIT_WARN_LINE); one look (.kwarnl: small, the kit red, the «!» disc), every dialog path (j3 cards and kit panels). */
const KIT_WARN_LINE="Cẩn thận khi lựa chọn";window.KIT_WARN_LINE=KIT_WARN_LINE;
function kitWarnLine(text){return `<div class="kwarnl" role="note"><i class="khap" aria-hidden="true">!</i><span>${text||KIT_WARN_LINE}</span></div>`}
function kitWarnPut(){try{const m=Q[0],M=document.getElementById("modal");if(!m||!M||M.hidden)return;const wv=m.warn||(m.kit&&m.kit.warn);const on=!!wv;const o=M.querySelector("#mb .opts");const old=M.querySelectorAll(".kwarnl");
 if(!on||!o){old.forEach(e=>e.remove());return}if(o.previousElementSibling&&o.previousElementSibling.classList.contains("kwarnl"))return;old.forEach(e=>e.remove());o.insertAdjacentHTML("beforebegin",kitWarnLine(typeof wv==="string"?wv:""))}catch(e){console.error("kitWarnPut",e)}}
window.kitWarnLine=kitWarnLine;window.kitWarnPut=kitWarnPut;
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);kitWarnPut();setTimeout(kitWarnPut,120);return r};window.showModal=showModal})();
(function(){const st=document.createElement("style");st.textContent=`#modal .kwarnl{display:flex;align-items:center;justify-content:center;gap:6px;margin:4px auto 6px;padding:2px 10px;font-size:.82rem;line-height:1.3;color:var(--bad);font-weight:600;letter-spacing:.01em;flex:0 0 auto}
#modal .kwarnl .khap{flex:0 0 auto;margin:0;width:16px;height:16px;line-height:16px;font-size:.72rem;background:var(--bad);color:var(--panel,#fff);animation:none}`;document.head.appendChild(st)})();
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§6.2k",title:"Dòng cảnh báo «Cẩn thận khi lựa chọn» trên lựa chọn đổi kết cục (không có chữ cơ hội)",html:()=>`<div id="modal" style="position:static"><div id="mb">${kitWarnLine()}<div class="opts kitpg-opts"><button class="opt">Xuất gia<small>đổi kiếp này</small></button><button class="opt">Ở lại<small>giữ nguyên</small></button></div></div></div>`})}catch(e){}
/* ===== KIT §6.2l GOAL LINK + «CÁCH LÀM» PANEL (owner 26/11 ~18:05Z: «mấy cái dấu gạch hướng dẫn dưới chân của cái dòng đó … bấm vào là để hiện ra cái hướng dẫn, hoặc là hiện ra là đi tới nơi đó»; KK44) =====
   kitGoalLink(label, how) → an UNDERLINED (dotted) link inside any goal / task / notice text; tap → kitHowPanel(how) = the small kit panel «Cách làm»:
   who (name + painting), where (place + its open hours), what it costs, + ONE button «Đi tới» (its khắc cost shown) that runs how.go (walk her there /
   open the Dư đồ with the place pulsing). how = {who: person object | name, where: place key | name, hours: text, cost: text, note: text, go: fn, goK: khắc, map: fn («Xem Dư đồ»)}.
   The data comes from the caller (the goal list knows its target); the kit only draws it. One look everywhere (.kglink), registry by id (no inline code). */
const KGL=window.KGL=window.KGL||{n:0,m:{}};
function kitGoalLink(label,how){const id="g"+(++KGL.n);KGL.m[id]=how||{};if(KGL.n>400){const ks=Object.keys(KGL.m);ks.slice(0,ks.length-300).forEach(k=>delete KGL.m[k])}
 return `<span class="kglink" role="button" tabindex="0" data-kglink="${id}">${label}</span>`}
function kitHowPanel(how){try{how=how||{};const p=how.who&&typeof how.who==="object"?how.who:null;const nm=p?(p.name||""):(how.who||"");
 const wk=how.where||"";let pl=wk;try{if(wk&&typeof placeName==="function"&&typeof placeOf==="function"&&placeOf(wk))pl=placeName(wk)||wk}catch(e){}
 const ico=wk&&typeof kitPlaceIcon==="function"?kitPlaceIcon(wk,16):"";const kplc=String(pl||"").replace(/\s*·\s*/g," ");/* the kit splits row values at « · » */
 const rows=[["Ai",nm?(typeof kitName==="function"&&p?kitName(p):nm):""],["Ở đâu",pl?`<span class="kglwhere">${ico}${pl}</span>`:""],["Giờ mở",how.hours||""],["Tốn",how.cost||""],["Ghi chú",how.note||""]];
 const html=(typeof kitRows==="function"?kitRows(rows):rows.filter(r=>r[1]).map(r=>`<p><b>${r[0]}:</b> ${r[1]}</p>`).join(""));
 const opts=[];if(typeof how.go==="function")opts.push({n:"Đi tới",nav:1,fx:{},x:`tốn: ${how.goK!=null?how.goK+" khắc":"không"} · được: tới ${kplc||"nơi ấy"}${nm?", gặp "+nm:""}`,go:()=>{try{how.go()}catch(e){console.error("kitHowPanel go",e)}}});if(typeof how.map==="function")opts.push({n:"Xem Dư đồ",nav:1,fx:{},x:`tốn: không · được: xem ${kplc||"nơi ấy"} trên Dư đồ`,go:()=>{try{how.map()}catch(e){console.error("kitHowPanel map",e)}}});
 const m=typeof kitModal==="function"?kitModal({kind:"info",title:"Cách làm",subject:p||undefined,html,opts:opts.length?opts:undefined,cls:"kgoalhow"}):null;
 /* the head picture is the painting of the PLACE (kitPlaceArt), never the generic event art */try{const a=wk&&typeof kitPlaceArt==="function"&&typeof placeOf==="function"&&placeOf(wk)?kitPlaceArt(wk):null;if(m&&a){m.headArt=a;showModal()}}catch(e){}return m}catch(e){console.error("kitHowPanel",e);return null}}
window.kitGoalLink=kitGoalLink;window.kitHowPanel=kitHowPanel;
/* window capture: runs before the document-level frame / tap-catcher handlers that take a tap inside an info frame */
window.addEventListener("click",e=>{const t=e.target&&e.target.closest&&e.target.closest("[data-kglink]");if(!t)return;const h=KGL.m[t.dataset.kglink];if(!h)return;e.stopImmediatePropagation();e.preventDefault();kitHowPanel(h)},true);
document.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;const t=e.target&&e.target.closest&&e.target.closest("[data-kglink]");if(!t)return;e.preventDefault();t.click()});
(function(){const st=document.createElement("style");st.textContent=`.kglink{text-decoration:underline dotted;text-decoration-thickness:1.5px;text-underline-offset:3px;text-decoration-color:var(--gold);color:inherit;cursor:pointer;font-weight:600}
#modal .kglwhere{display:inline-flex;align-items:center;gap:4px;white-space:nowrap}
#modal.kgoalhow .opts,.kgoalhow #mb .opts{clear:both;width:100%}
.kglink:focus-visible{outline:2px solid var(--gold);outline-offset:2px;border-radius:3px}`;document.head.appendChild(st)})();
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§6.2l",title:"Chữ dẫn đường trong mục tiêu (gạch chấm) + khung «Cách làm» với nút «Đi tới»",html:()=>`<p class="kitpg-row">Mua một hộp phấn của ${kitGoalLink("thái giám Nội vụ phủ",{who:"Thái giám Nội vụ phủ",where:"nvp",hours:"buổi sáng, buổi trưa",cost:"Bạc theo món",goK:1,go:()=>{}})} trước rằm.</p>`})}catch(e){}
