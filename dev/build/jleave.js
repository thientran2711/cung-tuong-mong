/* ================= jleave: LEAVE-THE-PALACE = ENDING (owner OD 24/11 ~06:05Z, review/leave-palace) =================
   Owner (verbatim, short): "bất kỳ một cái lựa chọn nào mà chọn đi ra khỏi cung đều là một cái kết cục ... hết kiếp ... Mình không cần phải chơi gì ở
   ngoài cung hết ... các cái kết nó khác nhau ... phải phụ thuộc vào cái tính cách của người vương gia này ... chết lúc mấy tuổi, vì lý do chết là vì
   cái gì, có bao nhiêu con".
   Every leave ending already goes through over() (j32) → the ONE end screen (jend kitEndScreen). This file only WRITES the «Về sau» part of that card:
     lpvEpiFor(h,t,fate,live) → {k kind, m partner name, net his nết, cls his class, kids born after, age at death, cause, txt passage} or null.
   kind  = how she left (lpvKindOf, table LPV_KIND below; a caller may name it first with lpvNext(kind, man) like kitEndNext).
   cls   = the partner's REAL nết (traitsOf: the man in S.men, or the named groom read through the same trait pool) scored by BAL.leave.cls.
   state = her Sức and age now, her children left in the palace; numbers (years left, children, cause weights) = BAL.leave (one core).
   The passage is drawn once per life and kept on S.lvEp (saved), so a reload or a co-op re-render shows the same lines; two lives with the same
   partner class read differently (several lines per slot, cause and numbers drawn). No new screen, no new kit part: j32 prints it with kitRows. ===== */
const LPV_KIND=[/* first match wins; tested on "h · fate · text" */
 ["phu",/theo con ra phủ/i],
 ["tron",/Cao chạy xa bay|Trốn khỏi cung cùng|rời cung cùng|Giả chết, rời cung/i],
 ["tron1",/Trốn khỏi cung|bỏ trốn khỏi cung/i],
 ["vuong",/nữ vương/i],
 ["thiep",/Vào vương phủ|Làm thiếp|Vương gia che chở|Được Vương gia che chở|ban hôn cho (Thân vương|Vương gia)/i],
 ["hon",/ban hôn|ban gả|Xuất giá|Thành thân|hòa thân|vương phủ/i],
 ["tu",/xuất gia/i],
 ["dan",/thứ dân/i],
 ["duoi",/đuổi khỏi cung|Bị đuổi/i],
 ["que",/Xuất cung|về quê|Ma ma|dưỡng già|an hưởng tuổi già|mở tiệm/i],
 ["other",/ra khỏi cung|rời cung|ẩn cư|sống đời áo vải|tự do/i],
 /* Trả thẻ bài kinds (jkc, new lives only; named by lpvKc through lpvNext, never matched from palace text: they sit after «other») */
 ["hoa",/^Hòa thân thay công chúa/i],["day",/^Nữ phu tử/i]];
/* inside-the-palace endings that must never get a «Về sau» (they match no leave word, listed so a later wording change cannot slip in) */
const LPV_STAY=/lãnh cung|trong cung|^Thái phi$|Thành Thái phi|Thái hậu|Mẫu hậu|Tân đế|đăng cơ|Ở lại/i;
let LPV_NEXT=null;
function lpvNext(k,m){LPV_NEXT={k:LPV_KIND.some(x=>x[0]===k)?k:"",m:m||null}}
window.lpvNext=lpvNext;
function lpvKindOf(h,fate,t,live){if(!live)return"";
 /* the Tiểu thư ngoài cung home road (jkc, before she ever entered) has its own story endings: not a leaving of the palace */
 if(typeof S!=="undefined"&&S&&S.kc&&!S.kc.inPal)return"";const s=`${h||""} · ${fate||""}`;const all=`${s} · ${String(t||"").replace(/<[^>]+>/g,"")}`;
 for(const [k,re] of LPV_KIND)if(k!=="other"&&re.test(s))return k;
 if(LPV_STAY.test(s)&&!/ra khỏi cung|rời cung|xuất cung/i.test(all))return"";
 if(LPV_KIND[LPV_KIND.length-1][1].test(s))return"other";
 /* a grand / rare ending whose text says she leaves (jge «cùng người thị vệ năm xưa ra khỏi cung») */
 for(const [k,re] of LPV_KIND)if(k!=="que"&&re.test(all))return k;
 return""}
window.lpvKindOf=lpvKindOf;
/* the partner: named by the caller, else the man of S.men (alive or not) whose name the card carries, else the named groom (a fixed nết from
   the same pool, drawn from his name so he keeps it) */
function lpvShort(n){const w=String(n||"").split(" ");return w.length>2?w.slice(-2).join(" "):String(n||"")}
function lpvPartner(h,fate,t,nx){if(nx)return typeof nx==="object"?nx:{name:String(nx),sex:"m"};
 const s=`${h||""} ${fate||""} ${t||""}`;const M=(S&&S.men)||[];
 const m=M.filter(x=>x&&x.name&&s.includes(x.name)).sort((a,b)=>b.name.length-a.name.length)[0];if(m)return m;
 if(typeof WEDW!=="undefined")for(const w of WEDW)if(s.includes(w))return{name:w,sex:"m",kind:"man"};
 const g=s.match(/(?:ban hôn cho|ban gả cho|thành thân với|cùng) ([^.,·<]{3,40})/i);
 return g&&!/người xưa|người ấy|người thị vệ năm xưa/.test(g[1])?{name:g[1].trim(),sex:"m",kind:"man"}:null}
function lpvNet(m){if(!m)return[];try{const n=traitsOf(m);if(n&&n.length)return n.slice(0,3)}catch(e){}return[]}
function lpvCls(net){const B=BAL.leave;if(!net.length)return"none";let best="none",bs=0;
 for(const c of B.clsOrd){const W=B.cls[c];let v=0;for(const t of net)v+=W[t]||0;if(v>bs){bs=v;best=c}}return best}
const lpvR=(a)=>a[0]+Math.floor(Math.random()*(a[1]-a[0]+1));
function lpvCause(k,cls,age,kids,hasM){const B=BAL.leave,W=Object.assign({},B.cause),K=B.causeK[k]||{},C=hasM?(B.causeC[cls]||{}):{};
 for(const x in W)W[x]*=(K[x]==null?1:K[x])*(C[x]==null?1:C[x]);
 if(!hasM)W.hai=0;if(age<B.old)W.gia=0;else W.gia*=3;if(!kids||age>B.birthAge)W.sinh=0;
 let sum=0;for(const x in W)sum+=W[x];if(sum<=0)return age>=B.old?"gia":"benh";let r=Math.random()*sum;for(const x in W){r-=W[x];if(r<=0)return x}return"benh"}
/* ---------- the words (cổ trang, VANPHONG; {m} = his short name, {me} = her name) ---------- */
const LPV_OPEN={
 tron:["Ngươi và {m} đổi tên, dựng một mái nhà nhỏ ở nơi không ai biết mặt.","Con thuyền đưa ngươi và {m} xuôi về phương Nam; từ đó ngươi mang một cái tên khác.","Ngươi theo {m} lên vùng núi xa kinh thành, sống bằng nghề của chàng.","Ngươi và {m} trọ hết trấn này sang trấn khác, mỗi lần có người lạ hỏi han lại dọn đi."],
 tron1:["Ngươi đổi tên, sống lẫn giữa dân thường ở một trấn nhỏ.","Ngươi thuê một gian nhà ven chợ, nhận may vá thuê, không ai biết ngươi từng ở trong cung.","Ngươi đi về phía biên ải, nơi quan lại thưa thớt và chẳng ai hỏi người lạ từ đâu đến."],
 hon:["Kiệu hoa đưa ngươi về phủ {m}; từ nay ngươi là người của nhà ấy.","Ngươi về làm vợ {m}, gian phòng mới nhỏ hơn cung cũ mà ấm hơn.","Ngươi bước qua cổng phủ {m}, tay còn cầm chiếc quạt Hoàng thượng ban năm nào."],
 thiep:["Ngươi bước vào hậu viện phủ {m}, ở gian phòng phía tây, sau chính thất và các trắc thất.","Ngươi về phủ {m} làm thiếp; vương phi nhận trà của ngươi mà không nhìn mặt.","Phủ {m} cũng có hậu viện, có thứ bậc, có người thắp đèn chờ chủ nhân; ngươi là ngọn đèn mới nhất."],
 que:["Ngươi về quê, sớm hôm hầu cha mẹ; chuyện trong cung như một giấc mộng dài.","Ngươi mua mấy sào ruộng, nuôi một đàn gà, tối tối kể chuyện cung cấm cho trẻ con trong xóm.","Ngươi về lại ngõ cũ; giếng nước, cây đa vẫn thế, chỉ ngươi là khác."],
 tu:["Ngươi cạo tóc, ở một gian thiền phòng nhìn ra rừng trúc.","Ngươi khoác áo nâu, sớm quét sân chùa, tối chép kinh dưới ngọn đèn dầu.","Tiếng mõ sớm chiều thay tiếng trống canh trong cung; ngươi học quên tên mình."],
 dan:["Ngươi ra khỏi cung với một tay nải nhỏ, thuê một gian nhà tranh ngoài thành.","Không tước, không bổng, ngươi sống bằng nghề thêu học được trong cung.","Người làng bàn tán về người đàn bà từng là phi tần; ngươi cúi đầu mà sống."],
 duoi:["Ngươi bị đuổi ra cửa cung không một đồng, nương nhờ một am nhỏ ngoài thành.","Nhà không dám nhận ngươi; ngươi đi giặt thuê bên bến sông.","Ngươi về quê trong tiếng xì xào; cha mẹ khóa cửa, chỉ bà vú cũ lén mang cơm."],
 phu:["Ngươi theo con về vương phủ; sáng sáng cháu nhỏ chạy sang thỉnh an tổ mẫu.","Vương phủ của con không lớn, nhưng không ai còn bắt ngươi quỳ.","Ngươi rời cung trong kiệu của con trai, không ngoái lại nhìn bức tường son."],
 vuong:["Ngươi trị vì cố quốc, giữ hòa ước với Đại Hy suốt đời.","Ngươi lên ngôi nơi cố quốc; mỗi mùa xuân vẫn sai sứ mang trà sang biếu Hoàng thượng."],
 other:["Ngươi rời bức tường son, bắt đầu một cuộc đời không ai ghi vào sổ cung.","Ngoài cung, ngày dài hơn và đêm yên hơn; ngươi sống phần đời còn lại như người thường."]};
const LPV_MID={
 chung:["{m} giữ trọn lời hứa: cả đời không nạp thêm ai, đi đâu cũng mang ngươi theo.","{m} thương ngươi như ngày đầu; những năm đói kém, chàng nhường ngươi bát cơm đầy.","Hàng xóm bảo nhà ấy chẳng giàu, nhưng chưa ai nghe hai người to tiếng.","Tóc đã bạc, {m} vẫn tự tay chải tóc cho ngươi mỗi sáng."],
 datinh:["Chưa đầy ba năm, {m} nạp thêm thiếp; phủ đông người, ngươi thành một gương mặt cũ.","{m} vẫn ghé phòng ngươi, mỗi năm một thưa; tiếng đàn ca ở viện bên thì không dứt.","Hậu viện của {m} hóa ra cũng là một hậu cung nhỏ: thiếp mới, a hoàn mới, lời đồn mới; ngươi lại phải giữ mình như năm nào trong cung.","{m} đa tình: lời hẹn ước năm xưa, chàng cũng từng nói với người khác."],
 quyen:["{m} cần ngươi vì những điều ngươi biết về trong cung; khi đã dùng hết, chàng lạnh dần.","{m} đem ngươi ra làm cầu nối với nhà quyền thế; ngươi sống như một món đồ quý cất kỹ.","Đường công danh của {m} lên mãi; ngươi ngồi sau rèm nghe chàng bàn việc, chẳng bao giờ được hỏi."],
 bao:["{m} nóng tính; uống rượu vào là đập bát, mắng ngươi là đồ bỏ của hoàng gia.","Lời qua tiếng lại thành roi vọt; ngươi giấu vết bầm dưới ống tay áo dài.","{m} thù dai: chuyện ngươi từng là người của Hoàng thượng, chàng nhắc mãi không thôi."],
 lanh:["{m} đối với ngươi trọn lễ mà không trọn tình; hai người ăn chung mâm, nói với nhau dăm câu.","{m} vùi mình vào sách vở và việc quan; ngươi giữ nhà, giữ một sự yên ổn lạnh lẽo.","Chàng chưa từng phụ ngươi, cũng chưa từng nói một lời thương."],
 /* no partner: her own road */
 none:["Mấy năm sau, bà mối đến; ngươi lấy một người thợ hiền lành trong vùng.","Ngươi không lấy ai; cửa nhà quạnh quẽ mà yên.","Ngươi dạy chữ, dạy thêu cho con gái trong vùng; người ta gọi ngươi là cô giáo trong cung ra."]};
const LPV_MID_K={phu:["Con dâu hiếu thuận, giữ lễ thần hôn định tỉnh với ngươi đến cuối đời.","Con trai ngươi làm một vị vương nhàn tản, không tranh với tân đế; nhà ấy yên.","Có năm tân đế nghi kỵ các vương, phủ con ngươi đóng cửa cả mùa đông; rồi mọi chuyện cũng qua."],tu:["Ngươi giữ giới suốt đời; có năm trụ trì cho ngươi giảng kinh cho tín nữ.","Sư bà dạy ngươi bốc thuốc; dân quanh chùa nhớ ơn một ni cô ít lời.","Có đêm ngươi nghe tiếng trống từ kinh thành vọng về, rồi lại cúi đầu niệm Phật."],
 vuong:["Triều thần cố quốc nể ngươi vì ngươi hiểu lòng Đại Hy.","Ngươi mở trường dạy chữ Hán, cho con gái quan lại được học như con trai."]};
const LPV_KIDS0=["Ngươi không có thêm con.","Cả đời ngươi không sinh nở thêm lần nào.","Nhà vắng tiếng trẻ."];
const LPV_KIDS=["Ngươi sinh thêm {n} người con.","Ngươi có thêm {n} người con; đứa lớn biết chữ từ năm lên bốn.","Ngươi nuôi lớn {n} người con; đứa út theo ngươi đến cuối đời."];
const LPV_LEFT=["Con của ngươi ở lại trong cung; ngươi chỉ nghe tin con qua những lá thư hiếm hoi.","Con của ngươi ở lại sau bức tường son; tên con ngươi viết lên giấy rồi đốt, mỗi năm một lần."];
const LPV_DIE={gia:["Năm {a} tuổi, ngươi mất trong giấc ngủ, tuổi già sức yếu.","Năm {a} tuổi, ngươi nhắm mắt, con cháu quây quần bên giường."],
 benh:["Năm {a} tuổi, một trận phong hàn kéo dài cướp mất ngươi.","Năm {a} tuổi, bệnh cũ tái phát; thuốc thang không kịp."],
 sinh:["Năm {a} tuổi, ngươi khó sinh, không qua khỏi.","Năm {a} tuổi, lần sinh nở cuối cùng lấy đi hơi thở của ngươi."],
 sau:["Năm {a} tuổi, ngươi u uất sinh bệnh, mất trong một đêm mưa.","Năm {a} tuổi, ngươi buồn rầu bỏ ăn, héo dần như cành mai cuối đông."],
 hai:["Năm {a} tuổi, ngươi mất sau một bát thuốc lạ; người trong nhà bảo là bệnh cũ.","Năm {a} tuổi, ngươi trượt chân bên giếng sau nhà; không ai hỏi vì sao đêm ấy cửa sau không khóa."],
 loan:["Năm {a} tuổi, giặc cướp tràn qua vùng ngươi ở; ngươi không kịp chạy.","Năm {a} tuổi, binh biến nổi lên; ngươi mất giữa đường lánh nạn."],
 dich:["Năm {a} tuổi, dịch bệnh tràn về, ngươi mất giữa mùa hạ.","Năm {a} tuổi, ôn dịch qua làng; ngươi đi sau mấy người hàng xóm."]};
const LPV_CAUSE={gia:"Tuổi già",benh:"Bệnh nặng",sinh:"Khó sinh",sau:"U uất thành bệnh",hai:"Bị người trong nhà hãm hại",loan:"Loạn lạc",dich:"Dịch bệnh"};
const LPV_TITLE={phu:"Theo con ra phủ",tron:"Theo người ra đi",tron1:"Trốn đi một mình",hon:"Làm vợ ngoài cung",thiep:"Làm thiếp trong phủ",que:"Về quê",tu:"Vào cửa Phật",dan:"Làm thứ dân",duoi:"Bị đuổi khỏi cung",vuong:"Về cố quốc",other:"Rời cung",hoa:"Đi hòa thân",day:"Ở vậy dạy chữ"};
const LPV_CLS={chung:"một lòng một dạ",datinh:"đa tình",quyen:"nặng công danh",bao:"nóng nảy, thù dai",lanh:"lạnh nhạt",none:""};
function lpvFill(s,o){return String(s).replace(/\{m\}/g,o.ms||"người ấy").replace(/\{me\}/g,o.me||"").replace(/\{n\}/g,o.n).replace(/\{a\}/g,o.a).replace(/(^|[.!?]\s+)(\S)/g,(x,b,c)=>b+c.toUpperCase())}
/* the whole «Về sau» for this life (drawn once, kept on S.lvEp) */
function lpvEpiFor(h,t,fate,live){if(!S)return null;if(S.lvEp&&S.lvEp.f===fate)return S.lvEp;
 const nx=LPV_NEXT;LPV_NEXT=null;let k=nx&&nx.k?nx.k:lpvKindOf(h,fate,t,live);if(!k)return null;
 const B=BAL.leave,m=(nx&&nx.m)?lpvPartner(h,fate,t,nx.m):(["tron","hon","thiep","other"].includes(k)?lpvPartner(h,fate,t):null);
 const net=lpvNet(m),cls=lpvCls(net),M=B.mod[cls]||B.mod.none,age=S.age||20;
 const suc=typeof S.suc==="number"?S.suc:60;let yrs=Math.round(lpvR(B.yrs[k]||B.yrs.other)*M.y*(B.sucA+suc/B.sucD));
 const a=Math.max(age+1,Math.min(B.maxAge,age+Math.max(1,yrs)));
 let n=k==="tu"?0:Math.max(0,lpvR(B.kids[k]||B.kids.other)+(m?M.k:0));if(age>=B.birthAge)n=0;else{const span=Math.max(0,Math.min(a,B.birthAge)-age);if(span<2)n=Math.min(n,1)}
 const cause=lpvCause(k,cls,a,n,!!m);const o={ms:m?(m.short||lpvShort(m.name)):"",me:S.name,n,a};
 /* Trả thẻ bài (she never entered): her own lines, and no line that speaks of a palace life she never had */
 const kc=!!(S.kc&&!S.kc.inPal),pk=L=>{const f=kc?L.filter(x=>!LPV_PAL.test(x)):L;return pick(f.length?f:L)};
 const left=(typeof mySons==="function"?mySons().length:0)+(typeof myDaus==="function"?myDaus().length:0);
 const P=[pk((kc&&LPV_OPEN_KC[k])||LPV_OPEN[k]||LPV_OPEN.other)];const MK=(kc&&LPV_MID_K_KC[k])||LPV_MID_K[k];
 if(MK)P.push(pk(MK));else if(m&&LPV_MID[cls])P.push(pk(LPV_MID[cls]));else P.push(pk(LPV_MID.none));
 if(left&&k!=="phu")P.push(pick(LPV_LEFT));P.push(k==="tu"||k==="day"?"":n?pk(LPV_KIDS):pk(LPV_KIDS0));P.push(pk(LPV_DIE[cause]));
 const ep={f:fate,k,ti:LPV_TITLE[k],m:m?m.name:"",net,cls,kids:n,age:a,cause,cl:LPV_CAUSE[cause],txt:P.filter(Boolean).map(x=>lpvFill(x,o)).join(" ")};
 S.lvEp=ep;return ep}
window.lpvEpiFor=lpvEpiFor;
/* the kit rows j32 prints under «Về sau» (KIT 9: h4.kpst + kitRows — no new part) */
function lpvRows(ep){const R=[];if(ep.m)R.push(["Người ấy",`${ep.m}${ep.net.length?` · ${ep.net.join(", ")}`:""}${LPV_CLS[ep.cls]?` (${LPV_CLS[ep.cls]})`:""}`,"t"]);
 R.push(["Về sau",`mất năm ${ep.age} tuổi · ${ep.cl} · ${ep.kids?`${ep.kids} người con về sau`:"không thêm con"}`,"t"]);return R}
window.lpvRows=lpvRows;
/* Đại kết cục (jge) that leaves the palace: the summit says how (GE_CAT e[5]), Ngã rẽ 1 (e[3]) says she left; «theo người» = the real man of her bond */
const LPV_GE={NUN:"tu",NV:"vuong",FOLLOW:"tron",REUNION:"que",FREE:"other"};
function lpvGe(e,bond){try{const fork=e[3],sum=e[5];let k=LPV_GE[sum]||((BAL.ge.exitFork||[]).includes(fork)?"other":"");if(!k)return;
 let m=null;if(k==="tron"||fork===3){const n=bond;m=n?(S.men||[]).find(x=>x&&x.name===n)||null:null;if(!m)k=k==="tron"?"other":k;else if(k==="other")k="tron"}
 lpvNext(k,m)}catch(e){console.error("lpvGe",e)}}
window.lpvGe=lpvGe;
/* ---------- Trả thẻ bài = an ENDING with «Về sau» (MAIN 117 05:07Z; owner OD 24/11 ~06:05Z, voluntary/at-home = ending, no outside road) ----------
   The tiểu thư home road (jkc): after Điện tuyển returns her tablet (kcTraveD), every way it closes (gả / ở vậy dạy chữ / xuất gia / ✦ rare) already
   ends the life through kcEndDo → over(). NEW lives (S.kc.lv, set at kcInit) now get the same «Về sau» passage + rows as a palace leaving:
   kind by the ending, partner = the REAL man (the suitor object of S.kc.suit keeps his drawn nết through netOf; ✦ Trạng nguyên = the man of S.men).
   Old saves (no S.kc.lv) keep today's card. */
const LPV_PAL=/cung|Hoàng thượng|hoàng gia|phi tần|tường son|tú nữ cũ/i;
const LPV_OPEN_KC={
 hon:["Kiệu hoa đưa ngươi về với {m}; thẻ bài trả về năm ấy, mẹ ngươi cất dưới đáy rương.","Ngươi về làm vợ {m}; chuyện điện tuyển năm nào chỉ còn là một câu kể cho con cháu.","Ngày cưới, tiếng pháo nhà {m} nổ ran; ngươi nhớ lại tiếng thái giám xướng tên mình trong điện tuyển."],
 thiep:["Ngươi vào nhà {m} làm thiếp, ở gian phòng phía tây, sau chính thất.","Chính thất nhà {m} nhận chén trà của ngươi mà không nhìn mặt.","Nhà {m} cũng có hậu viện, có thứ bậc; ngươi là người đến sau cùng."],
 tu:["Ngươi cạo tóc ở chùa Hộ Quốc; tiếng mõ sớm chiều thay tiếng trống tuyển tú.","Ngươi khoác áo nâu, sớm quét sân chùa, tối chép kinh dưới ngọn đèn dầu.","Ngươi xin một gian thiền phòng nhìn ra rừng trúc, học quên những ngày ngồi chờ xướng tên."],
 day:["Ngươi không lấy chồng; lớp học của ngươi ở ngõ Tây có ba mươi đứa con gái nhà nghèo.","Ngươi ở vậy, mở lớp dạy chữ, dạy thêu; người trong phố gọi ngươi là nữ phu tử."],
 hoa:["Ngươi được nhận làm nghĩa nữ, theo đoàn sứ lên phương Bắc hòa thân.","Xe hoa đi một tháng mới tới thảo nguyên; từ đó quê nhà chỉ còn trong giấc mơ."]};
const LPV_MID_K_KC={
 day:["Học trò của ngươi lớn lên, có đứa làm thơ, có đứa giữ sổ sách cho cả nhà chồng.","Có năm mất mùa, ngươi bán chiếc vòng hồi môn để lớp học không phải đóng cửa.","Cha mẹ ngươi mất, anh em chia nhà; ngươi chỉ xin giữ gian phòng có mấy chiếc bàn học."],
 hoa:["Khả hãn đối đãi ngươi trọn lễ; ngươi dạy người phương Bắc trồng dâu nuôi tằm.","Theo tục phương Bắc, khả hãn mất thì ngươi phải về với người kế vị; ngươi cắn răng mà sống.","Biên cương yên ổn hai mươi năm; người hai bên ải gọi ngươi là nương nương hòa thân."]};
const LPV_KC={"Chính thất hầu phủ":"hon","Gả xa":"hon","Làm thiếp nhà quyền quý":"thiep","Vợ quan thanh liêm":"hon","Nữ phu tử":"day","Xuất gia":"tu","Vợ Trạng nguyên":"hon","Hòa thân thay công chúa":"hoa"};
let LPV_KCS=null;
(function(){
 if(typeof kcInit==="function"){const i0=kcInit;kcInit=function(){const r=i0.apply(this,arguments);try{if(S&&S.kc)S.kc.lv=1}catch(e){}return r}}
 if(typeof kcTraveD==="function"){const t0=kcTraveD;kcTraveD=function(){const d=t0.apply(this,arguments);try{if(S&&S.kc&&S.kc.lv)S.kc.trv=1}catch(e){}return d}}
 if(typeof kcMarry==="function"){const m0=kcMarry;kcMarry=function(s){LPV_KCS=s||null;try{return m0.apply(this,arguments)}finally{LPV_KCS=null}}}
 if(typeof kcEndDo==="function"){const e0=kcEndDo;kcEndDo=function(h,t,fate,alive){try{const K=S&&S.kc,k=LPV_KC[h];
   if(K&&K.lv&&K.trv&&!K.inPal&&!S.dead&&k){let m=null;
    if(h==="Vợ Trạng nguyên")m=typeof kcTmMan==="function"?kcTmMan():null;
    else if((k==="hon"||k==="thiep")&&LPV_KCS&&LPV_KCS.n){m=LPV_KCS;m.name=m.name||m.n;m.short=m.n;m.sex="m";m.kind=m.kind||"man"}
    lpvNext(k,m);alive=true}}catch(e){console.error("lpvKc",e)}
  return e0.call(this,h,t,fate,alive)}}})();
