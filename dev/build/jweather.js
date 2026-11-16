/* ================= jweather: ĐI NGOÀI TRỜI LÚC MƯA BÃO, TUYẾT, BĂNG GIÁ (owner 15/11) — numbers in BAL.wx =================
   Before: weather only lowered Sức recovery (harsh), kept people out of the garden (wet) and added contest noise.
   Now, walking OUTDOORS on a bad day has real costs, for her and for every NPC by the same rule:
   - severity wxSev(): 0 fine · 1 mưa phùn / tuyết nhẹ / sương giá (đá trơn) · 2 tuyết dày · 3 giông tố.
   - walking costs nothing extra (owner: harsh weather already slows Sức recovery); the risk belongs to OUTDOOR ACTS (below).
   - risks per outdoor act (shown on the act card as Mất + "Vì sao"):
       cảm lạnh = BAL.wx.cold[sev] % → Phong hàn (j13 illness, weeks of lost Sức; starts "nặng" when her Sức < BAL.wx.weakSuc);
       trơn trượt = BAL.wx.slip[sev] % → Sức −BAL.wx.slipSuc; pregnant: BAL.wx.slipMisc % she loses the child.
     × BAL.wx.lowSuc when Sức < 40, × BAL.wx.veryLowSuc when Sức < 20, slip × BAL.wx.preg when pregnant;
     × BAL.wx.gear when she owns a dù / áo tơi (cold) or giày đế cỏ (slip); × BAL.wx.help when a servant holds the umbrella
     (a maid/eunuch of hers with loyalty ≥ BAL.wx.helpLoyal); from rank BAL.wx.kieuRank she goes out by kiệu when she has the bạc
     (Bạc −BAL.wx.kieuBac per outing) × BAL.wx.kieu.
   - indoor acts and fine weather: nothing.
   - giông tố passes: in the buổi S.wx.clr (1–2 buổi after it starts) it turns to mưa phùn.
   - when it happens to her: a kit result card at once. NPCs: each buổi an NPC is out of her palace in bad weather, the same odds
     in the garden (her own gear / kiệu / servants); what happens goes into the news. ================= */
Object.assign(BAL,{wx:{cold:[0,3,5,8],slip:[0,4,5,6],lowSuc:1.5,veryLowSuc:2,preg:1.5,gear:.5,help:.7,helpLoyal:50,
 kieu:.15,kieuRank:3,kieuBac:6,slipSuc:12,slipMisc:25,weakSuc:30}});
/* gear for the shop (low price tier) */
IT.du={n:"Dù giấy dầu",kd:"Tạp vật",d:"Che mưa tuyết khi ra ngoài: ít cảm lạnh hơn",pr:15,rk:0,tg:["rv"],wxg:"cold"};
IT.aotoi={n:"Áo tơi lá",kd:"Tạp vật",d:"Mặc ngoài khi mưa bão: ít cảm lạnh hơn",pr:12,rk:0,tg:["rv"],wxg:"cold"};
IT.giaycoi={n:"Giày đế cỏ",kd:"Tạp vật",d:"Đế cỏ bện, đi đá trơn, băng giá ít ngã",pr:12,rk:0,tg:["rv"],wxg:"slip"};
try{for(const k of ["du","aotoi","giaycoi"])if(!SHOP_ALL.includes(k))SHOP_ALL.push(k)}catch(e){}
/* paintings (gpt-2-6, item-art style): img/item-<k>.webp 256 + img/item512/item-<k>.webp 512; grade Thường */
try{for(const k of ["du","aotoi","giaycoi"]){if(typeof ITEM_ART_G==="object")ITEM_ART_G[k]=0;if(typeof ITIMG==="object")ITIMG[k]=k}}catch(e){}
function wxSev(){if(!S||!S.wx)return 0;const f=S.wx.f,n=S.wx.n;if(f===3)return 3;if(f===4)return 2;if(f===1)return 1;if(/sương giá/.test(n||""))return 1;return 0}
function wxKind(){const n=(S&&S.wx&&S.wx.n)||"";return /tuyết|sương giá/.test(n)?"băng tuyết":/giông/.test(n)?"giông tố":"mưa"}
function wxPal(p,k){if(!k)return"";if(k==="home")return palaceOf(p);if(k[0]==="r"){const v=rivals.find(x=>"r"+x.id===k);return v?palaceOf(v):k}return k}
function wxOutdoor(p,a,b){if(!a||!b||a===b)return false;return wxPal(p,a)!==wxPal(p,b)}
function wxHasGear(p,g){return (p.inv||[]).some(e=>e&&!e.h&&IT[e.k]&&IT[e.k].wxg===g)}
function wxHelper(p){return (p===S?[S.maid].concat(S.staff||[]):[p.maid].concat(p.staff||[])).find(s=>s&&!s.spyFor&&(s.loyal||0)>=BAL.wx.helpLoyal)||null}
function wxKieuOk(p){return rkOf(p)>=BAL.wx.kieuRank&&!p.out&&(p.bac||0)>=BAL.wx.kieuBac}
/* the odds of one outdoor walk for p: {sev, cold, slip, why:[...], kieu} (percent, rounded) */
function wxRisk(p,o){o=o||{};const sev=wxSev();if(!sev)return{sev:0,cold:0,slip:0,why:[]};const W=BAL.wx;let c=W.cold[sev],s=W.slip[sev];const why=[`trời ${S.wx.n} ${["","nhẹ","nặng","rất nặng"][sev]}`];
 const su=p.suc|0;if(su<20){c*=W.veryLowSuc;s*=W.veryLowSuc;why.push("Sức dưới 20: dễ gấp đôi")}else if(su<40){c*=W.lowSuc;s*=W.lowSuc;why.push("Sức dưới 40: dễ hơn")}
 if(p.preg&&!p.fake){s*=W.preg;why.push("đang mang thai nên dễ trượt hơn")}
 const kieu=o.kieu!=null?o.kieu:wxKieuOk(p);if(kieu){c*=W.kieu;s*=W.kieu;why.push(`đi kiệu hết Bạc −${W.kieuBac}: gần như không sao`)}else{
  if(wxHasGear(p,"cold")){c*=W.gear;why.push("có dù / áo tơi: bớt một nửa cảm lạnh")}
  if(wxHasGear(p,"slip")){s*=W.gear;why.push("có giày đế cỏ: bớt một nửa trơn trượt")}
  const h=wxHelper(p);if(h){c*=W.help;s*=W.help;why.push(`${h.name} che dù và dìu đi: bớt rủi ro`)}}
 return{sev,cold:Math.max(1,Math.round(c)),slip:Math.max(1,Math.round(s)),why,kieu}}
function wxRiskWord(n){return typeof chanceW==="function"?chanceW(n):"khả năng thấp"}
/* what happens: same for her and NPCs; returns a line ("" = nothing) */
function wxHit(p,R){let r="";const me=p===S,nm=me?"Ngươi":`${rkName(p)} ${p.name}`;
 if(roll(R.slip)){ap(p,{suc:-BAL.wx.slipSuc});r+=`${nm} trượt chân trên đá ${wxKind()==="băng tuyết"?"đóng băng":"ướt"}, ngã đau. Sức −${BAL.wx.slipSuc}. `;
  if(p.preg&&!p.fake&&roll(BAL.wx.slipMisc)){p.preg=0;p.hidden=false;ap(p,{suc:-20});r+=`<span class="r">${me?"Ngươi":"Nàng"} sảy thai.</span> Sức −20. `}}
 if(!illOf(p)&&roll(R.cold)){const t=catchIll(p,"phonghan");if(p.ill&&(p.suc|0)<BAL.wx.weakSuc)p.ill.st=2;r+=me?`Ngươi nhiễm lạnh, mắc phong hàn${p.ill&&p.ill.st>=2?" nặng":""}. `:`${nm} nhiễm lạnh, mắc phong hàn. `}
 return r}
/* giông tố passes: known buổi it clears */
(function(){const w0=rollWx;rollWx=function(){const r=w0.apply(this,arguments);try{if(S.wx&&S.wx.f===3)S.wx.clr=1+R(2)}catch(e){}return r}})();
(function(){const n0=nextBuoi;nextBuoi=function(){const r=n0.apply(this,arguments);try{if(S&&S.wx&&S.wx.f===3&&S.wx.clr!=null&&(S.buoi||0)>=S.wx.clr){S.wx={n:"mưa phùn",k:"rain",f:1};log("Giông tố đã tạnh, chỉ còn mưa phùn.")}}catch(e){}return r}})();
function wxClrName(){const c=S&&S.wx&&S.wx.clr;return c!=null&&typeof BUOI!=="undefined"&&BUOI[c]?String(BUOI[c]).toLowerCase():""}
/* OUTDOOR ACTS (owner correction 15/11: walking costs nothing extra; the risk belongs to what she DOES outside in that weather).
   An act is outdoors when its name says so (dạo / ngắm / hái / vườn / hồ sen / săn / chặn ngự giá / quỳ, đứng ngoài…) or it is done in the
   garden (S.place "vuon"). Deck cards and dilemma options alike: the card gets a Mất line + "Vì sao", the risk rolls when she does it. */
const WX_OUT=/dạo|ngắm|hái|vườn|hoa viên|hồ sen|săn|ngự giá|quỳ ngoài|quỳ trước|đứng ngoài|ngoài sân|ngoài điện|thả diều|đạp thanh|câu cá|tuyết|đón gió/i;
/* acts that are indoor work even when she stands in the garden (the place fallback skips them) */
const WX_IN=/điểm trang|nghỉ ngơi|ngủ|tắm|học|luyện|đọc|thêu|viết|chép|đàn|vẽ|nấu|sổ sách|thuốc|dưỡng|thiền|tụng|cầu phúc|trang điểm/i;
function wxOutAct(o){if(!o||!wxSev())return false;const n=String(o.n||"");if(/Thôi|Đợi|ở lại|trong phòng|^Về |về phòng|về cung|hồi cung|quay về|chờ tạnh|lui về|đứng ngoài nhìn|đứng ngoài,? giữ mình|đứng ngoài$/i.test(n)&&!/quỳ/i.test(n))return false;
 return WX_OUT.test(n)||(S&&S.place==="vuon"&&!o.indoor&&!WX_IN.test(n))}
/* kit price-line format (kitParse): "kèm: a, b (note)" -> red Kèm row + the trailing note in Ghi chú; no commas / nested brackets inside the note */
function wxMat(R){const pg=S&&S.preg&&!S.fake;return `kèm: cảm lạnh: ${wxRiskWord(R.cold)}, trơn ngã: ${wxRiskWord(R.slip)}${pg?", ngã có thể sảy thai":""} · (vì sao: ${R.why.join(" / ")})`}
function wxAfter(){try{if(!S||S.dead)return;const R=wxRisk(S);if(R.kieu)ap(S,{bac:-BAL.wx.kieuBac});const t=wxHit(S,R);if(t){log(t);Q.push({t:"Gió lạnh, đường trơn",who:typeof pMe==="function"?pMe():null,h:`<p>${t}</p><p class="past">Vì sao: ${R.why.join(" · ")}.</p>`});showModal()}}catch(e){console.error("wx",e)}}
/* deck cards: the line on the card, the roll when she does it */
(function(){const c0=cardH;cardH=function(a,i){let x0,mod=false;try{if(wxOutAct(a)){const R=wxRisk(S);x0=a.x;mod=true;a.x=(a.x?a.x+" · ":"")+wxMat(R)}}catch(e){}
  try{return c0.apply(this,arguments)}finally{if(mod)a.x=x0}}})();
(function(){const r0=runOpt;runOpt=function(a){const out=wxOutAct(a);const r=r0.apply(this,arguments);if(out&&r!==null)wxAfter();return r}})();
/* dilemma / event options: the option text gets the Mất, the roll after she picks it */
(function(){const s0=showModal;showModal=function(){try{const m=Q[0];if(m&&m.opts&&!m.__wx)m.opts.forEach(o=>{if(wxOutAct(o)&&!o.__wx){o.__wx=1;const R=wxRisk(S);o.x=(o.x?o.x+" · ":"")+wxMat(R)}})}catch(e){}return s0.apply(this,arguments)}})();
(function(){const c0=chooseM;chooseM=function(i){const m=Q[0];const o=m&&m.opts&&m.opts[i];const out=!!(o&&o.__wx&&wxSev());const r=c0.apply(this,arguments);if(out&&Q[0]!==m)wxAfter();return r}})();
/* NPCs: the same rule for an NPC out in the garden (dạo vườn) in bad weather, once per buổi (her gear, kiệu, servants); into the news */
(function(){const p0=placeWhere;placeWhere=function(){const r=p0.apply(this,arguments);try{if(!wxSev())return r;const W=S.where||{};let news="";
  for(const v of liveRivals(true)){if(!v.alive||v.out||v.confined||W[v.id]!=="vuon")continue;
   const R=wxRisk(v);if(R.kieu)ap(v,{bac:-BAL.wx.kieuBac});const t=wxHit(v,R);if(t){news+=t;try{newsAdd(v,"wx",t.replace(/<[^>]+>/g,""),false)}catch(e){}}}
  if(news)try{log(news)}catch(e){}}catch(e){console.error("wx npc",e)}return r}})();
window.wxRisk=wxRisk;window.wxSev=wxSev;window.wxOutAct=wxOutAct;
