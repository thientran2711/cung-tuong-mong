/* ================= jevfit: EVENT PICTURE BY MEANING (owner 15/11 "Mấy cái ảnh minh họa không liên quan gì cả", review/ev-art-fit) =================
   RULE (KIT §28.10c): no generic default picture anywhere. A dialog that has no picture of its own (own banner img/ev-<key>.webp, its own
   EVENTS.json id, a story beat, a festival band) gets the picture of its MEANING GROUP (owner 15/11: one picture per group, shared by every
   event of that meaning) — never "whoever is on the stage" (the old jk4 default: any visitor → "Có người đến chơi" gift box, the Emperor →
   "Hoàng thượng ngự giá", Thái hậu → "Thỉnh an"). Nothing fits → the §59 placeholder (jph), listed in CTM_MISSING_PICS so it gets painted.
   KIT_EVFIT rows: [rule, group, title RegExp | null, body RegExp | null]; the body is the first two sentences of the dialog text
   (never the option hints). First row whose title AND body tests pass wins. group = an EVENTS.json category (img/ev-<group>[-n].webp);
   kitEvFit(m) → {id:"cat:<group>", rule} | {art:{src,lab}, rule} (a group given as a picture, or a function of the dialog) | null
   (j89 evArtCat resolves "cat:<group>").
   Groups added by this branch (EVENTS.json): mat-bao (warning / whispered tip-off), am-muu (a plot being hatched), bac-tien (silver, loans,
   allowance), canh-phong (guarding her palace), hao-huu (co-op friend), nguy-gia (rescuing the Emperor), tin-cung (palace news: ev-news-tin-trong-cung), tham-hoi (a consort comes to chat: ev-khach-den), qua-tang (gifts, rewards: ev-khach-den-2, formerly mixed into khach-den).
   Test: node dev/test/ev-art-fit.js <build url> <out.json> → every dialog, its picture, group and rule. ===================================== */
const KIT_EVFIT=[
 /* warnings, tip-offs */
 /* remarks on her dress / face (the toilette pictures, jtoil): who speaks × praise or blame */
 ["dress-remark",m=>{const {b}=kitEvFitText(m);const who=/^(Thái hậu|Ai gia)/.test(b)?"th":/^Hoàng hậu/.test(b)?"hh":/^(Hoàng thượng|Ngài)/.test(b)?"emp":"rival";
   const bad=/chê|vượt phẩm|giản dị quá|chẳng ra dáng|quê|lòe loẹt|sai phẩm|mặt mộc|cười khẽ|mỉa/i.test(b);
   const k=who==="emp"?(bad?"emp-dislike":"emp-like"):who==="rival"?(bad?"rival-tease":"rival-praise"):who+(bad?"-scold":"-praise");
   return{src:`img/ev-toil-${k}.webp`,lab:bad?"Lời chê y phục":"Lời khen y phục"}},/^(Lời nhận xét|Thái hậu chê dung nhan|Hoàng hậu chê dung nhan)$/i,null],
 ["dress-contest",{src:"img/ev-toil-crowd-jealous.webp",lab:"Hội phối đồ"},/^Hội phối đồ ·/i,null],
 ["dress-contest-call","hh-viec",/^Hội phối đồ: báo đề/i,null],
 ["guard","canh-phong",/^Phòng bị$/i,null],
 /* Lập công (j71m): each task by its own meaning */
 ["merit-rite","te-le",/^Lập công · (Lễ|Chép kinh)/i,null],
 ["merit-graft","tham-quan",/^Lập công · Bắt kẻ tham ô/i,null],
 ["merit-books","bac-tien",/^Lập công · Soát sổ sách/i,null],
 ["merit-relief","lu-lut",/^Lập công · Cứu tế/i,null],
 ["merit-plague","dich-benh",/^Lập công · Dịch/i,null],
 ["merit-peace","tranh-sung",/^Lập công · Hòa giải/i,null],
 ["merit-nurse","benh-tat",/^Lập công · (Hầu bệnh|Trông con bệnh)/i,null],
 ["merit-fire","hoa-hoan",/^Lập công · Hỏa hoạn/i,null],
 ["merit-talent","trieu-chinh",/^Lập công · Tiến cử/i,null],
 ["merit-envoy","su-than",/^Lập công · Tiếp sứ thần/i,null],
 ["merit-plot","tai-mat",/^Lập công · Vạch mưu/i,null],
 ["merit-rescue","nguy-gia",/^Lập công · Cứu giá/i,null],
 /* festivals announced ahead (jts) */
 ["fest-soon-ny","fest-newyear",/^Sắp tới: Yến tiệc đầu xuân/i,null],
 ["fest-soon-tt","fest-thattich",/^Sắp tới: Thi tài ngày Thất tịch/i,null],
 /* her clothes */
 ["underwear-out",{src:"img/ev-toil-rival-tease.webp",lab:"Y phục chưa chỉnh tề"},/^Ra ngoài khi mặc trung y/i,null],
 ["clothes-snatched","tai-mat",/^Bị giật y phục/i,null],
 ["omen","chuyen-la",/^(Điềm báo|Điềm lạ)/i,null],
 /* side quests / chapters with no picture of their own: by what they ask */
 ["q-money","bac-tien",/Mượn tiền|gửi bạc|túng thiếu/i,null],
 ["q-hh","hh-viec",/Lời Hoàng hậu|Hoàng hậu giao/i,null],
 ["q-rescue","hinh-phat",/^Cứu .* khỏi/i,null],
 ["q-memorial","trieu-chinh",/sớ|triều đình|Lục bộ|thượng thư/i,null],
 ["q-leak","tai-mat",/làm lọt|tin của|dò la|nghe ngóng/i,null],
 ["dread","am-muu",/^Hung tin/i,null],
 ["rank-review","tan-phong",/^Xét phẩm/i,null],
 ["accused-theft","vu-oan",/^Bị tố ăn cắp/i,null],
 /* co-op: the friend in the palace */
 ["coop-friend","hao-huu",/^Hảo hữu (vào cung|tìm đến|nhận lời|từ chối)/i,null],
 ["coop-harm","am-muu",/^(Hảo hữu ra tay|Biến cố)$/i,null],
 ["coop-week","tin-cung",/^Tuần mới$/i,null],
 ["warn","mat-bao",/^(Lời cảnh báo|Tai mắt báo tin|Mật báo)/i,null],
 /* the j70 plot family: the kind of harm decides the picture */
 ["plot-poison","dau-doc",/^(Mưu hại|Sau vụ mưu hại|Thời cơ ra tay|Mưu đã xong|Mưu bị lộ)$/i,/độc|thuốc|trà|canh|bánh/i],
 ["plot-musk","hai-thai",/^(Mưu hại|Sau vụ mưu hại|Thời cơ ra tay|Mưu đã xong|Mưu bị lộ)$/i,/xạ hương|thai/i],
 ["plot-frame","vu-oan",/^(Mưu hại|Sau vụ mưu hại|Thời cơ ra tay|Mưu đã xong|Mưu bị lộ)$/i,/vu|bùa|hình nhân|tố/i],
 ["plot-caught","hinh-phat",/^Mưu bị lộ$/i,null],
 ["plot","am-muu",/^(Mưu hại|Sau vụ mưu hại|Thời cơ ra tay|Mưu đã xong)$/i,null],
 ["loyal-servant","cung-nhan",/^Kẻ hầu trung thành$/i,null],
 ["spy-send","tai-mat",/^Sai .* đi dò la|dò la|nghe lén/i,null],
 /* "Có người đến" (j24 approaches): what she came FOR */
 ["visit-mock","tranh-sung",/^Có người đến$/i,/mỉa|chê|cười nhạo|khiêu khích|buông lời|xỉa xói|lườm/i],
 ["visit-loan","bac-tien",/^Có người đến$/i,/mượn|vay/i],
 ["visit-ally","mat-uoc",/^Có người đến$/i,/kết làm chị em|liên thủ|kết minh|cùng nhau đứng vững/i],
 ["visit-gift","qua-tang",/^Có người đến$/i,/tặng|biếu|mang sang|gửi sang/i],
 ["visit","tham-hoi",/^Có người đến$/i,null],
 ["faction","mat-uoc",/^Lời mời vào phe$/i,null],
 /* the Emperor, Thái hậu, Hoàng hậu calling */
 ["emp-visit","hoang-de-dem",/^(Hoàng thượng đến|Hoàng thượng triệu)/i,null],
 ["th-call","thinh-an",/^Thái hậu triệu/i,null],
 ["share-favour","tranh-sung",/^Mưa móc đều khắp$/i,null],
 /* rewards, gifts */
 ["reward","qua-tang",/^(Thánh thượng ban thưởng|Thái hậu ban thưởng|Hoàng hậu ban thưởng|Đồ ngự tứ|Ngự tứ|Chủ thưởng|Được ban thưởng|Quà tặng)$/i,null],
 /* money */
 ["stipend","bac-tien",/Bổng lộc|^Hàng chợ đen$/i,null],
 /* servants, maid road */
 ["servant","cung-nhan",/^(Kẻ hầu xin|Việc của kẻ hầu|Kẻ hầu)$/i,null],
 ["maid-road","cung-nu",/^(Tin về chủ nhân|Đổi chủ)$/i,null],
 /* health, poison */
 ["doctor","benh-tat",/^Thái y bắt mạch$/i,null],
 ["poison","dau-doc",/^(Trúng độc|Phát hiện có độc)$/i,null],
 /* guilt, punishment, pardon */
 ["mistress-order","am-muu",/^Lệnh của /i,null],
 ["mistress-scold","hinh-phat",/ quở mắng$|^Tân Giả khố$/i,null],
 ["selection","tuyen-tu",/^Tuyển tú$/i,null],
 ["old-colleague","cung-nhan",/Đồng liêu cũ/i,null],
 ["punish","hinh-phat",/^(Tội bất kính|Mang tội ăn trộm|Nhận lỗi|Tự thú)$/i,null],
 ["pardon","dai-xa",/^Minh oan$/i,null],
 ["mourning","quoc-tang",/^Quốc tang$/i,null],
 /* rank, promotion, seat contest */
 ["contest-art","tai-nghe",/^Vòng 1: Tài nghệ|dùng vật liệu gì\?$|^Hội phối đồ/i,null],
 ["promotion","tan-phong",/^(Thăng bậc|Lễ tấn phong|Tranh ghế|Kết quả tranh ghế|Vòng 2: Đức hạnh|Ban cung)/i,null],
 /* the bedchamber office (pictures owned by review/night-end-r1: the existing "ngự giá" group only) */
 ["night-stolen","tranh-sung",/^Kính sự phòng$/i,/báo đau|giành|cướp|sai người báo/i],
 ["night-office","hoang-de-dem",/^(Kính sự phòng|Thái giám Kính sự phòng kể)$/i,null],
 ["night-office-b","hoang-de-dem",null,/Kính sự phòng/],
 ["home-news","thu-nha",/^(Tin nhà|Thư nhà)/i,null],
 /* any other title: the meaning of its first sentences */
 ["b-warn","mat-bao",null,/thì thầm|khẽ thưa|mật báo|dò hỏi giờ giấc|có ý (hại|không lành)/i],
 ["b-poison","dau-doc",null,/hạ độc|bỏ độc|thuốc độc|trúng độc|đầu độc/i],
 ["b-musk","hai-thai",null,/xạ hương|sảy thai|hại thai/i],
 ["b-frame","vu-oan",null,/vu oan|vu cáo|vu khống|bùa|hình nhân/i],
 ["b-bribe","hoi-lo",null,/hối lộ|đút lót|uy hiếp|tống tiền/i],
 ["b-plot","am-muu",null,/âm mưu|mưu hại|hãm hại|lập mưu|bày mưu/i],
 ["b-humiliate","tranh-sung",null,/quỳ dâng trà|bắt ngươi quỳ|làm nhục|sỉ nhục/i],
 ["b-oldlove","tu-tinh",null,/thanh mai|trúc mã|người cũ|ngày từ biệt/i],
 ["b-origin","thu-nha",null,/thân thế|miếng ngọc cũ|cha mẹ ruột/i],
 ["b-rumor","tin-don",null,/tin đồn|đồn rằng|lời đồn|đồn đại/i],
 ["b-loan","bac-tien",null,/mượn .{0,12}bạc|vay .{0,12}bạc|bổng lộc|cắt xén/i],
 ["b-mock","tranh-sung",null,/mỉa mai|khiêu khích|cười nhạo|chèn ép|ghen tức/i],
 ["b-gift","qua-tang",null,/ban thưởng|ban cho ngươi|mang sang tặng|gửi tặng|biếu ngươi/i],
 ["b-doctor","benh-tat",null,/thái y|bắt mạch|ốm nặng|phát sốt/i]
];
function kitEvFitText(m){const P=s=>String(s||"").replace(/<p class="past">[\s\S]*?<\/p>/g," ").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
 return {t:P(m&&(m.t||m.kit&&m.kit.title)).replace(/^(Chính tuyến|Phụ tuyến) · /,"").replace(/ · Lời nhờ.*$/,""),b:P(m&&m.h).split(kRx("(?<=[.!?…”])\\s+","")).slice(0,2).join(" ")}}
function kitEvFit(m){try{if(!m||typeof evArtCat!=="function")return null;const {t,b}=kitEvFitText(m);
 for(const [rule,g,tr,br] of KIT_EVFIT){if(tr&&!tr.test(t))continue;if(br&&!br.test(b))continue;if(!tr&&!br)continue;
  const G=typeof g==="function"?g(m):g;if(G&&typeof G==="object"&&G.src)return{art:G,rule};if(G&&evArtCat("cat:"+G))return{id:"cat:"+G,rule}}
 return null}catch(e){return null}}
window.kitEvFit=kitEvFit;window.KIT_EVFIT=KIT_EVFIT;
const KIT_EVFIT_WHY=new WeakMap();
/* owner 15/11 "Hình minh họa đâu? Khung sự kiện đâu?" (BÁO "Hảo hữu vào cung": rows + a tiny portrait, no picture): every BÁO / TIN /
   KẾT QUẢ / VIỆC / BAN THƯỞNG / MẬT BÁO / CẢNH GIÁC / CHỨNG CỨ pop-up gets the event picture too (jk2b showModal), not only choices.
   Not: rule / info (ĐIỀU) / person cards, look-up, shop and pick lists, the identity card, night panels (review/night-end), Nhập cung (review/newgame-ui). */
const KIT_EVFIT_KINDS=/^(notice|news|result|choice|reward|intel|threat|evidence)$/;
function kitEvFitWant(m,kind){try{if(!m||!KIT_EVFIT_KINDS.test(kind||""))return false;if(m.kit&&(m.kit.look||m.kit.shop||m.kit.pick))return false;
 if(m.shop)return false;if(m.pid&&typeof KIT_ACT_PIDS!=="undefined"&&KIT_ACT_PIDS.has(m.pid))return false;const T=kitEvFitText(m);if(/^Nhập cung/.test(T.t)||/^Không vào được lúc này/.test(T.b))return false;  /* a closed-door notice belongs to its place (jplace) */return true}catch(e){return false}}
window.kitEvFitWant=kitEvFitWant;
/* titles whose meaning group beats a shared own banner (the j70 "threat" banner ev-j70thr shows a court audience, not a whispered warning) */
const KIT_EVFIT_OVER=/^(Lời cảnh báo|Tai mắt báo tin|Mật báo)$/;
/* a panel that already shows a PORTRAIT subject but nobody on the stage (MẬT BÁO "Tai mắt báo tin" with the unknown-man frame, a BÁO with a
   small portrait): the event picture goes in the wide band on top (the same .kdlgart band as headArt / kitEventStage), never skipped */
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const m=typeof Q!=="undefined"?Q[0]:null;const r=s0.apply(this,arguments);try{
 const M=document.getElementById("modal"),mb=document.getElementById("mb"),dlg=M&&M.querySelector(".dlg.kpanel");if(!m||!dlg||!mb||M.hidden)return r;
 if(mb.querySelector(":scope > .kdlgart")||mb.querySelector(".kpsubj.kpev")||mb.querySelector(".kpid"))return r;
 const kind=dlg.dataset.kind||"";if(!kitEvFitWant(m,kind)||!mb.querySelector(".kpsubj"))return r;
 if(typeof kitStagePeople==="function"&&kitStagePeople(m).length)return r;  /* kitEventStage (jk4) lays the band itself */
 const a=typeof kitEvArt==="function"?kitEvArt(Object.assign({kind},m)):null;if(!a||!a.src)return r;
 const d=document.createElement("div");d.className="kdlgart kesband";
 d.innerHTML=kitSceneArt(a.src,a.lab,Object.assign({shape:"wide",cap:!!a.lab},typeof kitEvCat==="function"?kitEvCat(m,a):{},a.mark?{mark:a.mark,markAlt:a.markAlt||""}:{}));mb.prepend(d)}catch(e){console.error("kitEvFit band",e)}return r}})();
