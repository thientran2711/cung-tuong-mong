/* ================= jcui: contest UI + real prizes (review/contest-ui, C34; owner 15/11 s8) =================
   1. Picture LEFT / info RIGHT on every game frame (.kgame: contests, exams, works, lessons) incl. the result panel; phones: a short picture band on
      top while reading, hidden while the game runs. The contest intro keeps the PHẦN / HỒI / CÒN counters out until the game runs; the ĐỐI THỦ
      list is its own fixed-height box that scrolls by itself (.kgrv), the buttons stay in view.
   2. Real prizes by place (BAL.cp, bạc-equivalence rule): Nhất = themed item + bạc + chest reveal (kitReward) + contest title in her record
      (S.honors) + the Emperor's own gift when he attends (big festivals, the two feasts); Nhì and Tam = a smaller token item and/or bạc.
      NPC winners are paid the same (their inv / bạc). Pool value per place = months of stipend (BL) at the winner's rank x share.
   3. Everyone who competes with her becomes KNOWN (k61Meet: face + name, "đã gặp").
   API: cuAward(o, ord, place, of, kind) -> {mine, html} (called by j82 finish), cuMeet(list), cuChest(), CU.last = {places:[{prize:[...]}], mine} */
const CU={did:false,last:null};window.CU=CU;
/* BALANCE: the whole prize of a place is worth (stipend of the winner's rank x months) x share, in bạc; the item is part of it at its shop price
   (it, share of the pool as an item), the rest is paid in bạc. A bigger festival (Emperor attends) is worth more months. */
BAL.cp={months:{small:1,big:2},share:[1,.5,.25],item:[.6,.4,.6],minBac:5};
const CU_POOL={dan:["dancoc","tuithom"],hat:["dancoc","vongngoc","tuithom"],co:["nghien","tranhco","demgam"],dauho:["nhansam","yensao","demgam"],ban:["nhansam","yensao","agiao"],
 tho:["nghien","tranhco"],doi:["nghien","tranhco"],doden:["nghien","tuithom","demgam"],ve:["tranhco","nghien"],hoa:["tramngoc","vongngoc","boodieu","tuithom"],
 theu:["luahang","gamto","demgam","tuithom"],kim:["luahang","gamto","tuithom","vongngoc"],mua:["tramngoc","vongngoc","vongvang","boodieu"],banh:["yensao","nhansam","agiao"],huong:["huongtram","tuithom","lxma2"]};
const CU_KHOI={dan:"Cầm khôi",hat:"Ca khôi",co:"Kỳ khôi",dauho:"Đầu hồ khôi",ban:"Xạ khôi",tho:"Thi khôi",doi:"Đối khôi",doden:"Đăng khôi",ve:"Họa khôi",hoa:"Hoa khôi",theu:"Thêu khôi",kim:"Xảo khôi",mua:"Vũ khôi",banh:"Bếp khôi",huong:"Hương khôi"};
const CU_PLACE=["Quán quân","Á quân","Giải ba"];
/* one prize table per contest: the pool follows HER rank (what bạc is worth to her), so Nhất > Nhì > Tam whoever stands where */
function cuBudget(p,i,big){const r=Math.max(0,Math.min(7,rkOf(S)|0));return Math.round((BL[r]||30)*(big?BAL.cp.months.big:BAL.cp.months.small)*BAL.cp.share[i])}
function cuItem(kind,p,i,P){const pool=(CU_POOL[kind]||["tuithom"]).filter(k=>IT[k]&&(!itm(k).rk||itm(k).rk<=rkOf(p)));if(!pool.length)return null;const cap=P*BAL.cp.item[i];
 const fit=pool.filter(k=>itm(k).pr<=cap).sort((a,b)=>itm(b).pr-itm(a).pr);if(fit.length)return fit[0];
 const cheap=pool.slice().sort((a,b)=>itm(a).pr-itm(b).pr)[0];return itm(cheap).pr<=cap*1.35?cheap:null}
function cuPrize(kind,i,p,big){const P=cuBudget(p,i,big);const k=cuItem(kind,p,i,P);const ip=k?itm(k).pr:0;const bac=Math.max(BAL.cp.minBac,Math.round((P-ip)/5)*5);return{k,bac,pool:P}}
function cuMeet(list){try{if(typeof k61Meet!=="function")return;(list||[]).forEach(p=>{if(p&&p!==S&&typeof p==="object"&&(rivals||[]).includes(p)&&!p.out)k61Meet(p,"Cùng dự hội thi",2)})}catch(e){console.error(e)}}
function cuItemChip(k){return kitChip(itm(k).n,"g")}
function cuAward(o,ord,place,of,kind){o=o||{};const big=!!o.big,res={mine:null,html:"",places:[]};CU.did=true;CU.last=res;
 const title=o.title||"Hội thi";
 ord.slice(0,3).forEach((x,i)=>{const p=x.p||null;if(!p||typeof p!=="object"){res.places.push({prize:[]});return}
  const z=cuPrize(kind,i,p,big);const chips=[];
  if(z.k){p.inv=p.inv||[];invAdd(p,{k:z.k,from:"thi"});chips.push(cuItemChip(z.k))}
  if(z.bac){if(p===S)apply({bac:z.bac});else ap(p,{bac:z.bac});chips.push(["Bạc",z.bac])}
  const ent={prize:chips,k:z.k,bac:z.bac,place:i+1};
  if(i===0){/* the Emperor's own gift: guaranteed at the big festivals and the feasts he attends */
   if(big&&typeof bestow==="function"){ent.emp=true;try{bestow(p,"contest")}catch(e){console.error(e)}}else if(p!==S&&empGive(p,30,"contest"))try{bestow(p,"contest")}catch(e){}else if(p===S&&empGive(S,30,"contest")){ent.emp=true;try{bestow(S,"contest")}catch(e){}}}
  if(p===S){S.honors=S.honors||[];const hn=(i===0&&CU_KHOI[kind]?CU_KHOI[kind]+" · ":CU_PLACE[i]+" · ")+title;S.honors.unshift({d:`T${S.month}/${S.year}`,t:hn,p:i+1});if(S.honors.length>40)S.honors.length=40;ent.title=hn;res.mine=ent}
  res.places.push(ent)});
 const m=res.mine;if(m){const rows=[];const ch=[];if(m.k)ch.push(cuItemChip(m.k));if(m.bac)ch.push(kitChip("Bạc",m.bac,"g"));rows.push(["Phần thưởng",ch,"t"]);
  rows.push(["Danh hiệu",`<span class="ef t">${m.title}</span>`,"t"]);if(m.emp)rows.push(["Ngự tứ",`<span class="ef g">Hoàng thượng ban riêng một món</span>`,"t"]);
  res.html=`<h4 class="kpst">Ban thưởng hội thi</h4>`+kitRows(rows)}
 return res}
/* CU.did ("this contest was already paid by cuAward") must not outlive its contest: a new contest starts clean, and it is cleared right after the
   contest's own onDone (cFin7/fxFin7 read it inside onDone); otherwise a contest that ends with no cFin7/fxFin7 leaves it set and the next contest she skips loses its Emperor roll */
(function(){if(typeof startContest!=="function")return;const s0=startContest;startContest=function(o){CU.did=false;if(o&&typeof o.onDone==="function"){const d0=o.onDone;o=Object.assign({},o,{onDone:function(){try{return d0.apply(this,arguments)}finally{CU.did=false}}})}
 const r=s0.call(this,o);return r};window.startContest=startContest})();
/* the chest reveal for HER prize (kit §65 kitReward), after the podium */
function cuChest(){try{const c=CU.last;if(!c||!c.mine||c.chest)return;c.chest=1;const m=c.mine;const it=[];
  if(m.k){const I=typeof kitItemInfo==="function"?kitItemInfo(m.k):{};it.push({n:itm(m.k).n,d:itm(m.k).d,img:kmItemImg(m.k),tier:kmTierOf(m.k),gn:I.gname||"",k:m.k})}
  if(typeof kitReward==="function")kitReward({kind:m.place===1?"chest":"tray",title:"Ban thưởng hội thi",from:m.title,items:it,bac:m.bac})}catch(e){console.error(e)}}
/* origin line of a prize item in the bag */
(function(){if(typeof kinvFrom!=="function")return;const f0=kinvFrom;kinvFrom=function(f){return f==="thi"?"Thưởng hội thi":f0.apply(this,arguments)}})();
/* owner 16/11 (Q15): her contest titles show as ONE kit row list in three places: Sổ ân thưởng (all 40), her profile card (selfCardHTML, newest 5) and the Mệnh truyện tab (panel67, newest 5). Rows = [date, title, tone] */
window.kcuHonorRows=function(n){const H=(typeof S!=="undefined"&&S&&S.honors)||[];return(n?H.slice(0,n):H).map(x=>[x.d,x.t,"t"])};
(function(){if(typeof panel67!=="function")return;const p0=panel67;panel67=function(){let h=p0.apply(this,arguments);try{if(kcuHonorRows(1).length)h+=`<h3>Danh hiệu thi tài</h3>`+rows67(kcuHonorRows(5))}catch(e){}return h}})();
/* her contest titles live in the Sổ ân thưởng page */
(function(){if(typeof awCard!=="function")return;const a0=awCard;awCard=function(){let h=a0.apply(this,arguments);try{const H=(S&&S.honors)||[];
  h+=`<h3>Danh hiệu thi tài</h3>${H.length?kitRows(H.map(x=>[x.d,[`<span class="ef t">${x.t}</span>`],"t"])):`<p class="past">Chưa đoạt danh hiệu nào.</p>`}`}catch(e){}return h}})();
/* ---------- layout: picture LEFT, info RIGHT (kit game frame) ---------- */
(function(){const st=document.createElement("style");st.id="kcu-css";st.textContent=`
#ov .mg.kg82{max-width:min(940px,100%);display:flex;flex-direction:column;max-height:calc(100dvh - 16px);overflow:hidden}
.kgame .kgbody{display:block;min-height:0;flex:1 1 auto}
.kgame .kgbody.kgpic-on{display:grid;grid-template-columns:minmax(150px,36%) minmax(0,1fr);grid-template-rows:minmax(0,1fr);gap:0;overflow:hidden}
.kgpic{position:relative;margin:10px 0 10px 14px;border:1px solid var(--line);border-radius:var(--k-rad);overflow:hidden;background:#f1e6d2;min-height:220px;box-shadow:0 0 0 2px #fffaf0 inset}
.kgpic img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:50% 60%;display:block}
.kginfo{min-width:0;min-height:0;display:flex;flex-direction:column;overflow-y:auto;overscroll-behavior:contain;max-height:calc(100dvh - 128px)}
.kginfo .kgbox{flex:0 1 auto}
.kg82.kg-idle .kghud{display:none}
.kgrv{max-height:clamp(120px,calc(30*var(--kvh,1dvh)),260px);overflow-y:auto;overscroll-behavior:contain;margin:0 0 4px;border:1px solid var(--k-hair);border-radius:var(--k-rad);background:#fffdf8;padding:0 6px}
.kgrv .kfacts{margin:0}
/* kit-kg82-stack (owner Fold shot «Thử tay: Tài nghệ các môn»): EVERY .kg82act used to be sticky at the bottom, so a screen with several of them (a button, a heading, a 31-button grid, the copy button) pinned them all to the same bottom edge and the grid was drawn OVER the rows / heading / button above it.
   Rule: only the LAST .kg82act of a screen is the sticky bottom bar, and only on a screen that has no grid block (a .kg82act with 4+ buttons, e.g. the list of 31 kinds) — a screen with a grid scrolls as ONE column, nothing is pinned over it; every other block stacks in the normal flow and takes its own height. */
.kg82 .kg82act{position:relative;margin-bottom:0}
.kg82:not(:has(.kg82act > button:nth-child(4))) .kg82act:not(:has(~ .kg82act)){position:sticky;bottom:0;background:linear-gradient(#fffaf000,var(--k-card) 22%);padding-top:10px;z-index:2}
/* kv3:.kv1 */:where(.kv1) .kgame .kgbody.kgpic-on{display:block;overflow:visible}:where(.kv1) .kgpic{margin:8px 10px 0;min-height:0;height:104px}:where(.kv1) .kgpic img{object-position:50% 55%}
 :where(.kv1) .kg82:not(.kg-idle) .kgpic{display:none}:where(.kv1) .kginfo{max-height:none;overflow:visible}:where(.kv1) #ov .mg.kg82{overflow-y:auto}:where(.kv1) .kgrv{max-height:clamp(110px,calc(26*var(--kvh,1dvh)),220px)}

/* podium in short landscape (844x390): compact header + plaque so figures keep their scale and nothing runs under the header */

`;document.head.appendChild(st)})();

/* KIT §13.10 sample: the game mark chip «n/10» beside the clock; the clock normal and amber (review/kit-mark) */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§13.10",title:"kitGameMark + kitGameClock · chip «n/10» và đồng hồ hổ phách",where:"MỌI trò tài nghệ: một chip điểm nhỏ cạnh đồng hồ trên dòng tên; đồng hồ ngả hổ phách khi qua thời gian đủ điểm",html:()=>{try{const f=a=>`<div class="mg kpanel kgame kg82" style="position:relative;max-width:760px;margin:0 auto 10px"><div class="kph"><b class="kpseal">TÀI NGHỆ</b><span class="kpht"><span class="kptitle">Cờ: Thế cờ</span></span><span class="kgmk">${kitChips([`<span class="kchip n kgmk-c"><b>${a[0]}/10</b></span>`])}</span><span class="kgclk${a[2]?" kgclk-amber":""}">${kitCoopClock({left:a[1]*1000,len:20000,tone:a[2]?"w":"n"})}</span></div></div>`;return f([9,16,0])+f([7,5,1])}catch(e){return ""}}})}catch(e){}

/* KIT §82.1 + §21.2 samples (review/kit-ge): the «Thiên mệnh» plate in two tones, a plate-label row, and the Sơ đồ nhánh node chart */
window.KBM_SAMPLE={b:"sample",n:"Cung nữ · Đường vào cung",count:{txt:"Đại kết cục 1/4 · Danh hiệu 1/8 · Kỳ ngộ 1/2"},
 spine:[{id:"nhap",n:"Nhập cung",seen:true,past:true},{id:"a4",at:4,n:"Mới vào cung",seen:true,past:true},{id:"a5",at:5,n:"Lần đầu yết kiến",seen:true,past:true},{id:"a6",at:6,n:"?",seen:false,past:true},{id:"a7",at:7,n:"Đêm mưa hành lang",seen:true,here:true},{id:"a8",at:8,n:"?",seen:false},{id:"a9",at:9,n:"?",seen:false},{id:"a10",at:10,n:"?",seen:false},{id:"a11",at:11,n:"?",seen:false},{id:"ch12",at:12,n:"Chương 12"},{id:"hau14",at:13,n:"Chương 13"},{id:"ke14",at:14,n:"Chương 14"},{id:"hkn",n:"Hồi kết nhánh"}],
 rare:[{at:4,id:"r4",seen:true,n:"Gặp cố nhân"},{at:11,id:"r11",seen:false,n:"?"}],
 ends:[{i:0,n:"Giữ trọn phận mình",st:"o",ch:0,slots:[{sh:"t",ti:"Phận an nhiên"},{sh:"a",ti:"?"}],fail:{n:"Bị lãng quên"},card:{r1:"Ở lại, giữ trọn phận mình",r2:"Lấy ân mà đối đãi",cw:"cần Tai mắt rộng và sổ môn sinh trong tay",lives:[2]}},
  {i:1,n:"?",st:"f",ch:0,slots:[{sh:"t",ti:"?"},{sh:"a",ti:"?"}],fail:{n:"Thất thế"},card:{txt:"Chưa ai biết ngả này dẫn tới đâu."}},
  {i:2,n:"?",st:"c",ch:8,slots:[{sh:"t",ti:"?"},{sh:"a",ti:"?"}],fail:{n:"?"},card:{txt:"Chưa ai biết ngả này dẫn tới đâu."}},
  {i:3,n:"?",st:"o",ch:0,slots:[{sh:"t",ti:"?"},{sh:"a",ti:"?"}],fail:{n:"?"},card:{txt:"Chưa ai biết ngả này dẫn tới đâu."}}]};
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§28.6i",title:"Hàng «Tốn» nhận một giá mà fx không tự trả: ton:{tamco:-n} / ton:{bac:-giá}",where:"thẻ lựa chọn có giá riêng (Hao tâm cơ, Thuê người, Làm như thường …), cả thẻ mở lẫn thẻ ẩn kết quả: giá do chính lựa chọn nêu hiện ở hàng Tốn, hậu quả (fx) của thẻ ẩn vẫn ẩn",
 html:()=>{try{const pr=(typeof BAL==="object"&&BAL.actBac&&BAL.actBac.xinhh)||0,tc=Math.max(1,Math.round(pr/(BAL.road&&BAL.road.rate||BAL.tcroad&&BAL.tcroad.rate||pr||1)));/* sample numbers come from BAL (ONE CORE) */const L=[{n:"Hao tâm cơ, tự mình sắp đặt",ton:{tamco:-tc},x:"thành: tự tay sắp đặt, chắc tay hơn"},{n:"Làm như thường",ton:{bac:-pr},x:"thành: giữ nguyên"}];return L.map(o=>`<p class="kpnote">${o.n}</p>`+kitRows([["Tốn",fmt(o.ton)]])).join("")}catch(e){return ""}}})}catch(e){}
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§28.6h",title:"Chỉ số đường nhà + «quý nhau» trong hàng Tốn / Được / Bại và trong lời gợi ý (chế độ ẩn kết quả)",where:"mọi thẻ việc / lựa chọn có Gia thanh, Áp lực hôn sự, Hồi môn, Lời đồn hoặc «quý nhau»: hàng Tốn / Được / Bại giữ đủ; Áp lực hôn sự và Lời đồn càng ít càng tốt; Hồi môn đã dâng là một khoản Tốn; lời gợi ý nêu đúng điều đó, không bao giờ «không được mất gì» khi có chỉ số",
 html:()=>{try{const L=["Khá chắc · tốn: Hồi môn -40 · thành: Gia thanh +2 · hỏng: Áp lực hôn sự +8","Chắc · thành: Áp lực hôn sự -8 · hỏng: Gia thanh -2","Liều · thành: Lời đồn -4 · hỏng: Lời đồn +5","được: ngươi giữ lễ · mất: hai bên quý nhau -5"];return L.map(x=>{let h="";try{h=kitHint({x},null,1).hint}catch(e){}return `<p class="kpnote">${kaPlain(x)}</p>${kitRows([["Gợi ý",h]])}`}).join("")}catch(e){return ""}}})}catch(e){}
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§82.1",title:"kitTitlePlate «Thiên mệnh» hai sắc · hàng có nhãn là danh hiệu",where:"mọi chỗ danh hiệu Thiên mệnh (thẻ trên sân khấu, tab Danh hiệu, Bảng Thiên mệnh, Sổ luân hồi); hàng có nhãn là bảng danh hiệu xếp bảng trên, giá trị dưới",html:()=>{try{const a=kitTitlePlate({id:"ge_x_1t",name:"Phượng triều thiên hạ",tier:8,sh:"t"},{id:false}),b=kitTitlePlate({id:"ge_x_1a",name:"Phượng triều thiên hạ",tier:8,sh:"a"},{id:false}),c=kitTitlePlate({id:"s8",name:"Phượng minh thiên hạ",tier:8},{id:false});return `<div style="display:flex;gap:10px;flex-wrap:wrap;margin-bottom:8px">${a}${b}${c}</div><div class="kpb">${kitRows([[a,["Đạt được khi nàng ngồi vững ngôi Hoàng hậu"],"t"],["Trên đầu","chưa mang danh hiệu nào"]])}</div>`}catch(e){return ""}}})}catch(e){}
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§21.2",title:"kitBranchMap · Sơ đồ nhánh",where:"Sổ luân hồi (trang Sơ đồ nhánh): một sơ đồ cho mỗi nhánh; chạm một nút để xem thẻ",html:()=>{try{const id="kbmsample";setTimeout(()=>{const el=document.getElementById(id);if(el)kitBranchMapMount(el,window.KBM_SAMPLE)},0);return `<div id="${id}" style="max-width:760px;margin:0 auto"></div>`}catch(e){return ""}}})}catch(e){}
/* KIT §81.1 sample (review/kit-podium-gate): the entry gate scene, one play button per kind */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§81.1",title:"kitEntryGate · cổng cung → điện tuyển",where:"một lần mỗi kiếp trước thẻ chọn đầu tiên trong cung (joi.js oiGate); bốn loại: consort · bride · maid · corridor",html:()=>`<div style="display:flex;gap:8px;flex-wrap:wrap">${["consort","bride","maid","corridor"].map(k=>`<button type="button" class="kbtn alt" onclick="kitEntryGate({kind:'${k}',to:'Điện tuyển'})">${k}</button>`).join("")}</div>`})}catch(e){}
/* KIT §13.4 sample: the tài nghệ frame with her live figure (wide) — on the Fold (html.kv1) the column is not drawn */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§13.4",title:"kitGameFrame + kitGameFig · khung tài nghệ có hình toàn thân của nàng",where:"MỌI trò tài nghệ (thi, học, tự luyện, Điểm trang, khảo hạch…) qua kg82Open; cột trái chỉ ở màn rộng (kv2)",html:()=>{try{return `<div class="mg kpanel kgame kg82" style="position:relative;max-width:760px;margin:0 auto">${kitGameFrame({art:"Đàn",title:"Tấu khúc",how:"Chạm đúng dây khi hoa chạm vạch son.",hud:[["score","Phần","0/10"],["round","Hồi","1/20"],["time","Còn","30 giây"]],id:"kgsample",fig:true})}</div>`}catch(e){return ""}}})}catch(e){}
