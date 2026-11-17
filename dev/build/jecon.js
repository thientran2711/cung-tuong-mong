/* ================= jecon: ECONOMY — bổng lộc, lễ nghĩa theo phẩm, thu nhập có nguyên cớ, giá theo bậc, bán đồ (owner 15/11, balance v12) =================
   Notes + bot numbers: dev/ECONOMY.md. ONE SOURCE: every number is in BAL (jbal); j20 (bổng lộc) and j83 (tác phẩm) read it through this module.
   1. Month (every consort the same): + BAL.pay[rank] bổng, − BAL.wage × her servants (the staff her rank is given), − BAL.duty[rank] lễ nghĩa
      (lễ tiết, thưởng người hầu, tiếp khách), and from Hoàng quý phi up − BAL.banThuong[rank] given to the lower consorts she favours (real bạc to them).
      Free silver ≈ 3–4× from Đáp ứng to Hoàng hậu (not 10×). Skipping lễ nghĩa / ban thưởng is her choice on the month card:
      Danh −(BAL.dutySkip.danh + rank/2), Đức −BAL.dutySkip.duc; NPCs who cannot pay skip with the same cost.
   2. Income with a real cause (no dice): nhà mẹ đẻ every BAL.homeEvery months by origin (BAL.home); a good night: BAL.nightBac with the
      bestowal; a patron (a consort ≥ 2 ranks higher with thiện cảm ≥ BAL.patronRel) pays BAL.patronPay for errands each month; selling her works.
   3. Prices by tier (BAL.priceTier): everyday 3–15, mid 20–60, luxury 100–400; rank-gated items (IT.rk) stay "vượt phẩm" above her rank.
   4. Selling: one API for the UI and every NPC (econSellable / econPrice / econRisk / econSell / econSellBtn). Works (j83, not a second system):
      Nội vụ phủ buys openly at BAL.noivuPct % of j83's outside price, no risk; j83's "Bán ra ngoài cung" (cửa Thần Vũ) pays the full price
      wkSellVal (= BAL.craftSell[grade] + BAL.craftLv × her art level, × size) with j83's smuggling risk. Plain items: Nội vụ phủ at BAL.sellPct %;
      a gift of Hoàng thượng / Thái hậu / Hoàng hậu sold: BAL.giftLeak % it gets known (bất kính, BAL.giftHit). Ngự tứ / kỷ vật: never.
      Trâm / y phục: j92 bán lén through a ma ma or eunuch. ================= */
Object.assign(BAL,{
 pay:[40,55,70,95,125,165,215,280],payCold:5,payConfined:.5,payCut:.7,wage:3,
 duty:[0,4,10,18,30,48,72,100],banThuong:[0,0,0,0,0,0,20,40],dutySkip:{danh:1,duc:0},
 home:{tt:30,dtq:20,muoi:40,cn:0,nc:25,bd:20,td:0,ch:20,thd:5,cnv:0},homeEvery:3,nightBac:20,patronRel:40,patronPay:[10,10,12,14,16,18,20,22],
 sellPct:50,noivuPct:70,craftSell:[8,14,24,40],craftLv:3,craftGift:[2,3,5,7],
 giftLeak:{emp:35,th:25,hh:25},giftHit:{emp:{sung:-6,danh:-4},th:{th:-6,danh:-2},hh:{hh:-6,danh:-2}},
 priceTier:{sonphan:8,huongtram:10,tuithom:6,demgam:12,thuocanthai:15,yensao:25,agiao:35,luahang:30,tramngoc:30,vongngoc:50,botngua:30,nhansam:60,nghien:60,xahuong:50,
  giaidoc:60,boodieu:140,vongvang:180,tramphuong:360,gamto:120,gamvang:300,tranhco:150,dancoc:200,hacdinh:150}});
try{for(const k in BAL.priceTier)if(IT[k])IT[k].pr=BAL.priceTier[k]}catch(e){}
/* the old tables read the same numbers (display + any code that still reads them) */
try{BL.splice(0,BL.length,...BAL.pay)}catch(e){}
try{WVAL.splice(0,WVAL.length,...BAL.craftGift)}catch(e){}
function econMonthName(){try{return typeof WMON!=="undefined"&&WMON[S.month]?WMON[S.month]:String(S.month)}catch(e){return ""}}
function econDuty(p){const r=Math.min(7,rkOf(p));return p.out||p.confined?0:BAL.duty[r]}
function econBan(p){const r=Math.min(7,rkOf(p));return p.out||p.confined?0:BAL.banThuong[r]}
/* who receives her ban thưởng: up to 2 lower consorts she likes best */
function econBanTo(p){return consorts().filter(v=>v!==p&&!v.out&&v.alive!==false&&rkOf(v)<rkOf(p)).sort((a,b)=>rel(p,b)-rel(p,a)).slice(0,2)}
function econDoDuty(p,pay){const d=econDuty(p),b=econBan(p);const r=Math.min(7,rkOf(p));
 if(pay&&(p.bac||0)>=d+b){if(d)ap(p,{bac:-d});if(b){ap(p,{bac:-b});const T=econBanTo(p);T.forEach(v=>{ap(v,{bac:Math.floor(b/T.length)});try{relAdd(v,p,BAL.eff.jecon.econDoDuty)}catch(e){}})}return{paid:1,d,b}}
 const dn=BAL.dutySkip.danh+Math.floor(r/2),du=BAL.dutySkip.duc;if(d||b){ap(p,{danh:-dn});if(du){if(typeof ducAdd==="function")ducAdd(p,-du,"bớt lễ nghĩa");else ap(p,{duc:-du})}}return{paid:0,d,b,dn,du}}
/* nhà mẹ đẻ (by origin, every BAL.homeEvery months), patron errands */
function econHome(p){try{if(p!==S||!S.origin||S.out||(S.month%BAL.homeEvery)!==1)return 0;return S.homeCut?0:(BAL.home[S.origin.k]||0)}catch(e){return 0}}
function econPatron(p){if(p.out)return null;const r=rkOf(p);const L=consorts().filter(v=>v!==p&&!v.out&&v.alive!==false&&rkOf(v)>=r+2&&rel(v,p)>=BAL.patronRel&&(v.bac||0)>=40);
 if(!L.length)return null;const v=L.sort((a,b)=>rel(b,p)-rel(a,p))[0];const n=BAL.patronPay[Math.min(7,r)];ap(v,{bac:-n});ap(p,{bac:n});return{v,n}}
function econStipend(p){const r=rkOf(p),me=p===S,staff=(p.staff||[]).length;let base=BAL.pay[Math.min(7,r)],why=[],cut=false;
 if(p.out){base=BAL.payCold;why.push(`lãnh cung: chỉ ${BAL.payCold} bạc`)}else{if(p.confined){base=Math.round(base*BAL.payConfined);why.push("cấm túc: nửa bổng, không lễ nghĩa")}
  if(p.cutPay>0){cut=true;base=Math.round(base*BAL.payCut);why.push(`Nội vụ phủ khất bổng${p.cutBy?" theo ý "+p.cutBy:""}: bớt 3 phần 10`);p.cutPay--;if(!p.cutPay)p.cutBy=""}}
 /* jstip: the goods of her rank (real items) and the Nội vụ phủ skimming (silver + worse goods), same rule for every consort */
 const SK=typeof stipSkim==="function"?stipSkim(p,base,cut):null;const skB=SK?SK.bac:0;
 const G=typeof stipGoods==="function"?stipGoods(p,SK):[];
 const wage=p.out?0:staff*BAL.wage,bonus=p.bonusPay||0;p.bonusPay=0;const home=econHome(p);const net=base-skB-wage+bonus+home;ap(p,{bac:net});
 const pat=econPatron(p);const d=econDuty(p),bt=econBan(p);
 if(!me){econDoDuty(p,true);try{if(SK&&typeof stipNpc==="function")stipNpc(p,SK,G)}catch(e){console.error("stip npc",e)}return""}
 const tot=net+(pat?pat.n:0);const gn=typeof stipGoodsTxt==="function"?stipGoodsTxt(G):"";
 const parts=[`+${base} bạc`];if(gn)parts.push(gn);if(skB)parts.push(`Nội vụ phủ cắt xén −${skB} bạc`);if(wage)parts.push(`trả công ${staff} kẻ hầu: −${wage} bạc`);if(bonus)parts.push(`ân thưởng +${bonus}`);if(home)parts.push(`nhà gửi +${home}`);if(pat)parts.push(`việc vặt +${pat.n}`);
 if(SK&&SK.why)why.push(`cắt xén vì ${SK.why}`);
 const line=`Bổng lộc tháng ${econMonthName()}: ${parts.join(" · ")} = ${tot>=0?"+":""}${tot} bạc${why.length?" ("+why.join("; ")+")":""}.`;
 try{if(!(typeof isSrv==="function"&&isSrv())){const R=[["Bổng",`${rkName(S)}: +${base} bạc`,"g"]];if(gn)R.push(["Đồ phát",gn,SK&&SK.items?"r":"g"]);if(skB)R.push(["Bị cắt xén",`Nội vụ phủ bớt ${skB} bạc`,"r"]);if(wage)R.push(["Công kẻ hầu",`trả công ${staff} kẻ hầu: −${wage} bạc`,"r"]);
   if(bonus)R.push(["Ân thưởng",`+${bonus} bạc`,"g"]);if(home)R.push(["Nhà gửi vào",`${S.origin.n}: +${home} bạc`,"g"]);if(pat)R.push(["Việc vặt",`${rkName(pat.v)} ${pat.v.name} trả công: +${pat.n} bạc`,"g"]);
   if(why.length)R.push(["Ghi chú",why.join(" · "),"n"]);R.push(["Còn",`Bạc ${S.bac}`,"n"]);
   const card={ev:1,t:`Bổng lộc tháng ${econMonthName()}`,who:typeof pMe==="function"?pMe():null,h:kitRows(R)};
   if(d||bt){const sk=BAL.dutySkip.danh+Math.floor(Math.min(7,r)/2);const what=[d?`lễ nghĩa (lễ tiết, thưởng người hầu, tiếp khách) ${d} bạc`:"",bt?`ban thưởng phi tần dưới ${bt} bạc`:""].filter(Boolean).join(" · ");
    card.h+=`<p class="past">Việc theo phẩm ${rkName(S)} tháng này: ${what}.</p>`;
    card.opts=[{n:"Chu toàn lễ nghĩa",fx:{bac:-(d+bt)},x:`tốn: Bạc -${d+bt} · thành: giữ thể diện${bt?" · phi tần được thưởng quý ngươi hơn":""}`,go:()=>{const x=econDoDuty(S,true);if(x.paid)log(`Ngươi chu toàn lễ nghĩa tháng: Bạc -${d+bt}.`);else log(`Không đủ bạc lo lễ nghĩa: Danh -${x.dn}${x.du?`, Đức -${x.du}`:""}.`)}},
     {n:"Bớt lễ nghĩa",fx:{danh:-sk},x:`mất: Danh -${sk}${BAL.dutySkip.duc?`, Đức -${BAL.dutySkip.duc}`:""} · giữ lại ${d+bt} bạc`,go:()=>{econDoDuty(S,false);log(`Ngươi bớt lễ nghĩa tháng: Danh -${sk}${BAL.dutySkip.duc?`, Đức -${BAL.dutySkip.duc}`:""}.`)}}]}
   Q.push(card);try{if(typeof stipShow==="function")stipShow(G,net,SK)}catch(e){console.error("stip show",e)}}else econDoDuty(p,true)}catch(e){console.error("econ card",e)}
 return line};
blCard=function(){return `<p>Bổng lộc phát ngày đầu mỗi tháng, theo phẩm vị (mọi phi tần như nhau). Mỗi kẻ hầu ăn công ${BAL.wage} bạc/tháng. Phẩm càng cao, lễ nghĩa càng tốn.</p>${kitRows(BAL.pay.map((b,i)=>[i>=7?"Hoàng hậu":RANKS[i].n,[`<span class="ef t">${b} bạc</span>`,typeof stipRankTxt==="function"?stipRankTxt(i):BLG[i],BAL.duty[i]?`lễ nghĩa ${BAL.duty[i]}`:"",BAL.banThuong[i]?`ban thưởng ${BAL.banThuong[i]}`:""].filter(Boolean),"n"]))}<p class="past">Lãnh cung: chỉ ${BAL.payCold} bạc. Cấm túc: nửa bổng. Hoàng hậu ghét ngươi (thiện cảm dưới -30): mỗi tháng sai Nội vụ phủ khất bổng (bớt 3 phần 10): ${word(20)}. Sinh con, được ân thưởng: cộng thêm một lần.</p>${typeof stipRuleTxt==="function"?stipRuleTxt():""}`};
/* a good night: Hoàng thượng's thưởng also brings silver (same for every consort). It is the night entry of j20's reward silver (BBAC), so it
   goes through the ONE ân thưởng path: inside bestow, before the tray (j93 kitReward) counts its coins, in the awards ledger (S.awards), the
   "Ân thưởng …: <món>, Bạc +N" log line and the award card chip — no second silver wrapper, no stray Bạc line of its own. */
try{Object.defineProperty(BBAC,"night",{get:()=>BAL.nightBac|0,enumerable:true,configurable:true})}catch(e){console.error("nightBac",e)}
/* ---------- works on the item grade scale + price by grade and skill ---------- */
function econWkGrade(w){return Math.max(0,Math.min(3,w.ti|0))}
wkSellVal=function(w){return Math.round((BAL.craftSell[econWkGrade(w)]+BAL.craftLv*(w.lv|0))*Math.sqrt((WK[w.kind]?WK[w.kind].need:2)/2))};
/* ---------- the one sale API ---------- */
function econGiver(e){if(!e)return null;if(e.from==="emp"||e.giver==="Hoàng thượng")return"emp";if(e.from==="th"||e.giver==="Thái hậu")return"th";if(e.from==="hh"||e.giver==="Hoàng hậu")return"hh";return null}
const ECON_GN={emp:"Hoàng thượng",th:"Thái hậu",hh:"Hoàng hậu"};
function econRisk(p,e){if(!e)return null;if(typeof wdItem==="function"&&wdItem(e)){const ag=wdAgent(p);return{pct:wdLeak(p,ag),why:"bán lén: lộ ra thì mang tiếng túng thiếu",hit:{danh:-WD.sellDanh}}}
 const g=econGiver(e);if(!g)return null;return{pct:BAL.giftLeak[g],why:`đồ ${ECON_GN[g]} ban: lộ ra là bất kính`,hit:BAL.giftHit[g],g}}
function econNo(p,e){if(!e||e.h)return"không có";const it=IT[e.k];if(e.wk)return e.wk.p!=null?"phải dâng trong tuần này":"";
 if(typeof wdIsNt==="function"&&wdIsNt(e))return"đồ ngự tứ: bán là bất kính";if(it&&(it.keep||it.nt))return"kỷ vật: không bán";
 if(typeof wdItem==="function"&&wdItem(e))return wdAgent(p)?"":"chưa có ma ma hay thái giám tin cẩn";
 if(!it||!it.pr)return"không ai mua";if(it.il)return"đồ cấm: không bán công khai";return""}
function econPrice(p,e){if(!e)return 0;if(e.wk)return Math.max(1,Math.round(wkSellVal(e.wk)*BAL.noivuPct/100));if(typeof wdItem==="function"&&wdItem(e)){const ag=wdAgent(p);return Math.max(1,Math.round(wdPrice(e)*(ag?wdSellPct(p,ag):WD.sellLo)/100))}
 const it=IT[e.k];return it&&it.pr?Math.floor(it.pr*BAL.sellPct/100):0}
function econSellable(p){p=p||S;return (p.inv||[]).map((e,ix)=>{if(!e||e.h)return null;const it=IT[e.k];let grade=0,src="";
  try{if(e.wk){grade=econWkGrade(e.wk);const a=itemArt(e);src=a?a.src:""}else if(window.WD_ITEMS&&WD_ITEMS[e.k]){grade=WD_ITEMS[e.k].g|0;src=WD_ITEMS[e.k].icon}else{const a=itemArt(e.k);grade=a?a.grade|0:0;src=a?a.src:""}}catch(x){}
  return{ix,k:e.k,name:e.wk?e.wk.n:itm(e.k).n,grade,src,price:econPrice(p,e),via:e.wk||!(window.WD_ITEMS&&WD_ITEMS[e.k])?"noivu":"agent",risk:econRisk(p,e),no:econNo(p,e)}}).filter(Boolean)}
function econSell(p,ix){const e=p.inv&&p.inv[ix];if(!e)return"";const no=econNo(p,e);if(no)return"";
 if(typeof wdItem==="function"&&wdItem(e))return wdSell(p,ix);
 const pr=econPrice(p,e),R=econRisk(p,e),nm=e.wk?e.wk.n:itm(e.k).n,who=p===S?"Ngươi":`${rkName(p)} ${p.name}`;p.inv.splice(ix,1);ap(p,{bac:pr});
 let r=`${who} bán ${nm} cho thái giám Nội vụ phủ: Bạc +${pr}. `;
 if(R&&roll(R.pct)){ap(p,R.hit);const fx=Object.entries(R.hit).map(([k,v])=>`${NAMES[k]||k} ${v}`).join(", ");
  r+=`<span class="r">Chuyện ${p===S?"ngươi":"nàng"} đem bán ${nm} do ${ECON_GN[R.g]} ban lọt ra ngoài, ai cũng chê bất kính.</span> ${fx}. `;
  if(p!==S)try{newsAdd(p,"sell",`${who} đem bán đồ ${ECON_GN[R.g]} ban.`,false)}catch(x){}}
 return r}
/* plain items: the old open sale follows the same rule (NPCs call sellItem too); works keep j83's second channel wkSell (cửa Thần Vũ, risky, full price) */
sellItem=function(p,ix){return econSell(p,ix)};
window.econSellable=econSellable;window.econPrice=econPrice;window.econRisk=econRisk;window.econSell=econSell;
/* her own sale from a panel: 1 khắc */
function econSellUI(ix){if(!S||S.dead||!can(1))return;const r=econSell(S,ix);if(!r)return;spend(1);log(r);render()}
window.econSellUI=econSellUI;if(typeof wrapR==="function")wrapR("econSellUI",()=>"Bán đồ");
document.addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-econsell]");if(!b||b.disabled)return;ev.stopPropagation();try{if(Q.length)closeModal()}catch(x){}econSellUI(+b.dataset.econsell)},true);
function econSellBtn(ix){const e=S.inv[ix];const no=econNo(S,e),R=econRisk(S,e),pr=econPrice(S,e);
 return pbtn(`data-econsell="${ix}"`,e.wk||!(window.WD_ITEMS&&WD_ITEMS[e.k])?"Bán cho Nội vụ phủ":"Bán lén",`tốn: 1 khắc · thành: Bạc +${pr}${R?` · kèm: ${R.why} (${word(R.pct)})`:""}`,no||whyTime(1))}
window.econSellBtn=econSellBtn;

/* ---------- Tư trang: each work is its own bag item (tab Tác phẩm) with its own panel ---------- */
try{if(!KINV_CATS.some(c=>c[0]==="tp"))KINV_CATS.push(["tp","Tác phẩm",["Tác phẩm"]])}catch(e){}
kinvGroups=function(){const vis=S.inv.map((e,i)=>[e,i]).filter(([e])=>!e.h&&IT[e.k]);const G=[];
 for(const [e,i] of vis){const g=!e.wk&&G.find(x=>x.k===e.k&&!x.wk&&!!x.t===!!(e.by==="me"&&e.t)&&!x.w&&!e.w&&econGiver(S.inv[x.i])===econGiver(e));
  if(g)g.n++;else G.push({k:e.k,t:e.by==="me"?e.t:null,w:e.w,i,n:1,from:e.from,wk:e.wk||null})}return G};
(function(){const k0=kinvItems;kinvItems=function(){return k0.apply(this,arguments).map(x=>{const e=x.g&&x.g.i>=0?S.inv[x.g.i]:null;if(!e||!e.wk)return x;const w=e.wk;let a=null;try{a=itemArt(e)}catch(y){}
  return Object.assign(x,{cat:"tp",name:w.n,grade:econWkGrade(w),src:a?a.src:x.src,src512:a?(a.src512||a.src):x.src512,tip:`${w.n} · ${KIT_GRADE[econWkGrade(w)].n}`})})}})();
function econWkOpen(x){const i=x.g.i,e=S.inv[i],w=e.wk,ar=ARTS.find(y=>y.k===w.a);const gr=KIT_GRADE[econWkGrade(w)];const t1=whyTime(1),t2=whyTime(2);
 const B=[pbtn(`data-wk="give" data-ix="${i}"`,"Dâng, tặng",`tốn: 2 khắc · thành: chọn người (Hoàng thượng, Thái hậu, phi tần), quý theo phẩm (${gr.n}: ${BAL.craftGift[econWkGrade(w)]})`,t2),econSellBtn(i),
  pbtn(`data-wk="sell" data-ix="${i}"`,"Bán ra ngoài cung",`${word(wkSellO(S))} · tốn: 1 khắc · thành: Bạc +${wkSellVal(w)} · hỏng: thị vệ cửa Thần Vũ bắt gặp, Danh -3, mất tác phẩm`,t1)];
 if(!w.show&&w.p==null)B.push(pbtn(`data-wk="show" data-ix="${i}"`,"Bày ở yến tiệc",`tốn: 2 khắc · thành: Danh +${WSHOW[w.ti]}${w.ti===3?` · kèm: phi tần ghen +${ghenN(BAL.ghen.showTreasure)}`:""}`,t2));
 /* the rows = KIT §70 kitItemDetailRows (same Phẩm · Loại · Được · Lai lịch · Ghi chú as every item) */
 const rows=kitItemDetailRows({ix:i});
 kitModal({kind:"info",title:w.n,sub:"Tác phẩm tự tay",itemPic:kitItem({src:x.src512||x.src,name:"",grade:econWkGrade(w),size:"lg"}).replace('<span class="kitn"></span>',''),
  html:`<div class="kinvrows">${rows}</div><div class="rbtn kinvacts">${B.join("")}</div>`,btn:"Lui"})}
(function(){const o0=kinvOpen;kinvOpen=function(x){try{const e=x&&x.g&&x.g.i>=0?S.inv[x.g.i]:null;if(e&&e.wk)return econWkOpen(x);
  /* plain items: the sale card says the real risk (a gift of Hoàng thượng / Thái hậu / Hoàng hậu) */
  if(e&&!(window.WD_ITEMS&&WD_ITEMS[e.k])&&IT[e.k]&&itm(e.k).pr){const km=kitModal;kitModal=function(o){try{o.html=String(o.html||"").replace(/<button data-kinvact="sell"[^>]*>[\s\S]*?<\/button>/,econSellBtn(x.g.i))}catch(y){}return km.apply(this,arguments)};
   try{return o0.apply(this,arguments)}finally{kitModal=km}}}catch(y){console.error("econ open",y)}return o0.apply(this,arguments)}})();
/* a [data-wk] act inside the item panel closes the panel first */
addEventListener("click",ev=>{const b=ev.target.closest&&ev.target.closest("[data-wk]");if(!b||b.disabled)return;if(b.closest("#mb,.dlg,.modal")){try{if(Q.length)closeModal()}catch(e){}}},true);

/* ---------- 5. MƯU KẾ: giá theo người bị nhắm, đường không tốn bạc cho phẩm thấp, phẩm cao nhiều mắt nhìn (owner 15/11) ----------
   - Every harmful act that costs bạc (ACT.c.bac < 0, not Giao thiệp) costs more against a target of HIGHER rank than the actor
     (+BAL.schemeRk per rank above) and a better-guarded one (+BAL.schemeGuard per loyal servant ≥ 70, at most 3). The card shows the
     real price (ACT.c is read for the target the card was built for), the same rule charges it (actor and NPCs alike).
   - Routes without bạc (cheaper in silver, riskier or slower), shown as their own act cards with full Tốn/Được/Mất + odds:
       "Tự đi dò la" (spyk): no bạc, Tâm cơ +1 on success, odds −BAL.selfMinus, caught: Danh −2;
       "Sai cung nữ thân tín lấy lòng" (bribel): no bạc, her cung nữ's loyalty −BAL.loyalCost, odds −BAL.selfMinus;
       "Nhờ ơn người quen ở Kính sự phòng" (blockf): no bạc, an ally with thiện cảm ≥ BAL.favorRel spends it: thiện cảm −BAL.favorCost.
   - Watched more at high rank: when a scheme of hers is caught at rank ≥ BAL.watchRank, Danh −(rank − BAL.watchRank + 1) more. */
Object.assign(BAL,{schemeRk:.15,schemeGuard:.1,selfMinus:8,loyalCost:25,favorRel:60,favorCost:30,watchRank:5});
const ECON_FREE=["ally","gift"];
function econGuards(t){return Math.min(3,[t.maid].concat(t.staff||[]).filter(s=>s&&(s.loyal||0)>=BAL.loy.trust).length)}
function econSchemeMul(a,t){if(!a||!t)return 1;/* two-way law (owner 16/11 s21): one price for everyone, no NPC discount (was .06/.04 for NPCs) */return 1+BAL.schemeRk*Math.max(0,rkOf(t)-rkOf(a))+BAL.schemeGuard*econGuards(t)}
let ECON_AT=[null,null];/* the actor / target of the scheme being priced: per life (review/newlife-reset: it kept the old life's people) */
try{lifeStore("ECON_AT",()=>{ECON_AT=[null,null]})}catch(e){}
function econSchemePrice(k,a,t){const A0=ACT[k];const base=A0&&A0.__c0&&A0.__c0.bac<0?-A0.__c0.bac:0;return Math.round(base*econSchemeMul(a,t))}
(function(){for(const k in ACT){const A0=ACT[k];if(!A0||!A0.c||!(A0.c.bac<0)||ECON_FREE.includes(k))continue;const c0=Object.assign({},A0.c);A0.__c0=c0;
  const c={};for(const x in c0)if(x!=="bac")c[x]=c0[x];Object.defineProperty(c,"bac",{enumerable:true,get(){const [a,t]=ECON_AT;return a&&t?-econSchemePrice(k,a,t):c0.bac}});A0.c=c;
  const ok0=A0.ok;A0.ok=function(a,t){ECON_AT=[a,t];if(!ok0.apply(this,arguments))return false;return (a.bac||0)>=econSchemePrice(k,a,t)};
  const f0=A0.f;A0.f=function(a,t){const extra=econSchemePrice(k,a,t)+c0.bac;if(extra>0)ap(a,{bac:-extra});return f0.apply(this,arguments)}}})();
/* the routes without bạc */
function econLoyalMaid(p){return p.maid&&!p.maid.spyFor&&(p.maid.loyal||0)>=BAL.loy.low?p.maid:null}
function econFavor(p){return consorts().filter(v=>v!==p&&!v.out&&v.alive!==false&&rel(v,p)>=BAL.favorRel).sort((x,y)=>rel(y,p)-rel(x,p))[0]||null}
A("spyk","Tự đi dò la",{c:{},ok:()=>true,o:a=>cl(oSpy(a)-BAL.selfMinus,5,95),x:"không tốn bạc · tự đi nghe ngóng: dễ lộ hơn · lộ: Danh -2",f:(a,t)=>{
 if(roll(cl(oSpy(a)-BAL.selfMinus,5,95))){ap(a,{tamco:1});return spyFind(a,t,"tự đi nghe ngóng")}
 relAdd(a,t,BAL.eff.jecon.f);ap(a,{danh:-2});return `${NMc(a)} rình nghe chuyện ${NM(t)}: <span class="r">bị bắt gặp</span>. Danh -2. `}});
A("bribel","Sai cung nữ thân tín lấy lòng",{c:{},ok:(a,t)=>!!econLoyalMaid(a)&&!!t.maid,o:(a,t)=>cl(oBribe(a,t)-BAL.selfMinus,5,95),x:`không tốn bạc · cung nữ thân tín lòng -${BAL.loyalCost} · chậm và dễ hỏng hơn`,f:(a,t)=>{
 const m=econLoyalMaid(a);if(!m)return"";m.loyal=cl((m.loyal||0)-BAL.loyalCost,0,100);
 if(roll(cl(oBribe(a,t)-BAL.selfMinus,5,95))){t.maid.loyal=cl(t.maid.loyal-10,0,100);if(t.schemes>0){/*evok: schemes>0*/evA(a,t,BAL.eff.jecon.evF);return `${m.name} làm thân với ${t.maid.name}, dò ra mưu kế của ${NM(t)}: ${NM(a)} nắm 1 chứng cứ. `}return `${m.name} làm thân được với ${t.maid.name} của ${NM(t)}. `}
 t.maid.loyal=cl(t.maid.loyal+5,0,100);evA(t,a,BAL.eff.jecon.evF_2);return `${t.maid.name} nhận ra ${m.name} đến dò, báo cho chủ. `}});
A("blockf","Nhờ ơn người quen rút thẻ bài",{c:{},ok:(a,t)=>!!econFavor(a)&&!t.block,o:a=>oBlock(a),x:`không tốn bạc · người quen của ngươi trả ơn: thiện cảm -${BAL.favorCost} · 2 tuần nàng không được lật thẻ`,f:(a,t)=>{
 const v=econFavor(a);if(!v)return"";relAdd(v,a,-BAL.favorCost);const c=caught(a,t,false,"nhờ người rút thẻ bài của "+NM(t));if(c)return c;
 if(roll(oBlock(a))){t.block=2;return `${v.name} nhờ người ở Kính sự phòng rút thẻ bài của ${NM(t)} giúp ${NM(a)}: 2 tuần nàng không được lật thẻ. `}return `Kính sự phòng không dám rút thẻ bài của ${NM(t)}. `}});
try{for(const [k,g] of [["spyk","Hại nhỏ"],["bribel","Hại nặng"],["blockf","Hại nặng"]]){const G=RVGRP.find(x=>x[0]===g);if(G&&!G[1].includes(k))G[1].push(k);ACTDOM[k]=ACTDOM[k]||"Mưu kế"}
 AOUT.spyk=["nắm thêm một chứng cứ, Tâm cơ +1",`bị bắt gặp: Danh -2, nàng thù ${balSg(BAL.eff.jecon.f)}`];AOUT.bribel=["cung nữ của nàng ngả về phía ngươi (dò ra mưu kế: 1 chứng cứ)","bị báo cho chủ: nàng nắm 1 chứng cứ"];AOUT.blockf=["2 tuần nàng không được lật thẻ","không thành; người quen vẫn mất thiện cảm"];
 J78VERB.spyk="tự dò la {t}";J78VERB.bribel="sai cung nữ lấy lòng người của {t}";J78VERB.blockf="nhờ người rút thẻ bài của {t}"}catch(e){}
/* watched more at high rank */
(function(){const c0=caught;caught=function(a,t,ps,desc){const r=c0.apply(this,arguments);try{if(r&&a&&rkOf(a)>=BAL.watchRank){const n=rkOf(a)-BAL.watchRank+1;ap(a,{danh:-n});return r+`Phẩm cao, nhiều mắt nhìn: Danh -${n}. `}}catch(e){}return r}})();
window.econSchemePrice=econSchemePrice;window.econSchemeMul=econSchemeMul;
