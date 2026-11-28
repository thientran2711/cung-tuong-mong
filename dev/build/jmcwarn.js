/* ================= TMK-WARN (owner-facing play-stopper, F seat s21e on LIVE 8330e8b8; MAIN 181 order; laws 11 / 6a / 2 / 3 / 1 / 4 / 7) =================
   Seen: year 3 «Bạc lạ» → «Nhận bạc, làm tai mắt»; five years later the end «Bị đuổi khỏi cung vì nhận bạc mua chuộc» (jcharge chMcFire → chSrvEnd:
   a proven «Mua chuộc người hầu» charge on the BUYER dismisses every servant who took the buyer's bạc, her too) with NO warning in between, and the take
   card named only the j42 srvWatch road. The charge rule itself is NOT changed (law 16); this module makes it visible and answerable:
   (a) every TAKE card (j42 cnvBribeOpts take / cnvBlackOpts obey, jcoopworld P2H.bribe / PEND.thBribe) prints the jcharge road in odds words
       (cnvSpyX(m,noPay,v) → mcwTakeX: the charge's pieces chNeed and one search's odds chFind as a side-event chance chanceW «khả năng …», VANPHONG.md l.67; the ladder word() only for an option's own roll);
       every BUY card (j7 volunteer, jtsb defect, j24 svDefect) prints the same road from the buyer's side (mcwBuyX).
   (b) a REAL warning beat: the moment someone writes a piece of the mc charge on her buyer (evA hook, jcharge CHLASTC) — and on the monthly
       servant tick for old saves / co-op — she gets the card «Gió lọt» once per new piece, with three tiers (law 2, cost and result rise together):
       NHẸ «Lặng lẽ thôi làm tai mắt» (loses the monthly bạc, the buyer resents her) · VỪA «Trả lại bạc, xin thôi» (bạc back, no grudge) ·
       NẶNG «Bẩm chủ, khai kẻ mua chuộc» (odds; holds: Chủ tin up, her master holds pieces of the buyer's mc charge; fails: Tân Giả khố),
       and «Cứ làm tai mắt» (keep the bạc, keep the risk). Her servant panel row says how many pieces are held at any time (discoverable).
   (c) TWO-WAY (law 1): an NPC servant bought by anyone hears the same news and cuts ties at BAL.mcw.npcCut; when the buyer is HER, she is told
       (her bought servant quits) and her Tai mắt report the pieces held on her.
   ============================================================================================================================ */
/* the most pieces of the mc charge anyone (but the buyer; the servant player is on the buyer's side) holds on t */
function mcwHeld(t){const r={h:null,n:0,need:0};if(!t||typeof chHave!=="function")return r;try{r.need=chNeed(t,"mc")}catch(e){}
 const L=[S].concat(typeof liveRivals==="function"?liveRivals(true):(rivals||[]));for(const h of L){if(!h||h===t)continue;if(h===S&&typeof isSrv==="function"&&isSrv())continue;let n=0;try{n=chHave(h,t,"mc")}catch(e){}if(n>r.n){r.n=n;r.h=h}}return r}
/* one search's odds for one piece of the mc charge on v (who searches: her master m; else a plain searcher) */
function mcwFindO(v,m){try{return chFind(m&&m.name?m:{tamco:0,mat:0,staff:[]},v,"mc").o}catch(e){try{return chBandO(BAL.charge.C.mc.band)}catch(x){return BAL.odds.lo}}}
function mcwNm(v){return v&&typeof v==="object"?v.name:(v||"người mua")}
/* (a) the TAKE card tail: the jcharge road in odds words */
function mcwTakeX(v,m){const vo=v&&typeof v==="object"?v:null;let need=2;try{need=chNeed(vo,"mc")}catch(e){}
 /* worded as ONE loss with its odds inside (TMK-WARN-2, stills 27/11): the kit row parser (kitParse → kaRows) puts a loss with no number and no
    «khả năng …» clause in Kèm (folded behind «!»), so «nếu … thì ngươi bị đuổi khỏi cung» never stood in the card's Mất row; «bị đuổi khỏi cung khi …
    (mỗi lần … ra một chứng: khả năng …)» does. The odds are one search's, chanceW like the master's-watch clause beside it (law 7, no %). */
 return `bị đuổi khỏi cung khi ${mcwNm(v)} bị nắm đủ ${need} chứng tội mua chuộc người hầu (mỗi lần ${m&&m.name?m.name:"có người"} dò, ra một chứng: ${chanceW(mcwFindO(vo,m))}); có người nắm chứng thì ngươi nghe phong thanh trước`}
/* (a) the BUY card tail (her as the buyer): the same charge from her side */
function mcwBuyX(s){let need=2;try{need=chNeed(S,"mc")}catch(e){}return `kèm: nếu ngươi bị tố tội mua chuộc người hầu (cần ${need} chứng) thì bị phạt bổng ${BAL.charge.fine} lượng, ${s&&s.name?s.name:"kẻ ấy"} bị đuổi khỏi cung`}
/* the one tai mắt terms text (was j42 cnvSpyX: «mỗi tháng Bạc +8 · kèm: …» — a «kèm» note sits behind «!» on the kit card, so the take card showed only
   «Được Bạc»; stills 27/11). Both dangers now stand in the card's own «Mất» row: the master's watch (srvWatch) and the jcharge road (v given).
   noPay (cnvBlackOpts obey): the danger text alone, the caller prints «mất: » before it. */
(function(){if(typeof cnvSpyX!=="function")return;cnvSpyX=function(m,noPay,v){const P=BAL.ag.why.srv.pun;
 const watch=`mỗi tháng chủ phát hiện: ${chanceW(nv(m,"spyFind"))}, khi ấy bị đánh chết: ${chanceW(npwShare(["kill","lau"],k=>srvPunW(m,k),"kill"))}, không thì Tân Giả khố ${P.lauWk} tuần`;
 const d=v?`${watch}, ${mcwTakeX(v,m)}`:watch;/* «, » not «; »: the kit parser keeps the charge in the same Mất row */return noPay?d:`mỗi tháng Bạc +${P.spyPay} · mất: ${d}`}})();
/* is the servant player the tai mắt of t */
function mcwMine(t){return !!(t&&S&&!S.dead&&typeof isSrv==="function"&&isSrv()&&S.srv&&S.srv.spyFor!=null&&String(S.srv.spyFor)===String(t.id))}
/* (b) the warning beat, once per new piece held on her buyer */
function mcwWarnMe(t){if(!mcwMine(t))return false;const H=mcwHeld(t);if(!H.n)return false;S.srv.mcw=S.srv.mcw||{};const k=String(t.id);if((S.srv.mcw[k]||0)>=H.n)return false;S.srv.mcw[k]=H.n;
 try{log(`<span class="r">Nghe phong thanh: có người đã nắm ${H.n}/${H.need} chứng tội mua chuộc người hầu của ${t.name}.</span>`)}catch(e){}
 try{pushDil(mkP("mcWarn",{v:t.id}),"Gió lọt")}catch(e){console.error("mcWarn",e)}return true}
/* (c) two-way: NPC servants bought by t hear it too; her as the buyer is told */
function mcwNpc(h,t){const k=key(t);const H=mcwHeld(t);
 for(const o of [S].concat(rivals||[])){if(!o||o===t||(o!==S&&(o.alive===false||o.out)))continue;for(const s of (o.staff||[])){if(!s||s.coop||s.spyFor==null||String(s.spyFor)!==String(k))continue;
  if(!roll(BAL.mcw.npcCut))continue;s.spyFor=null;if(t===S)try{log(`<span class="r">${s.name} (người hầu cung ${o===S?"ngươi":o.name}) nghe phong thanh tội mua chuộc của ngươi sắp lộ, lặng lẽ thôi làm tai mắt.</span>`)}catch(e){}}}
 if(t===S&&h&&h!==S){const mine=(h.staff||[]).some(s=>s&&s.spyFor==="me");if((+S.mat||0)>=BAL.charge.warnMat||mine){S.mcwMe=S.mcwMe||{};const hk=String(key(h));if((S.mcwMe[hk]||0)<H.n){S.mcwMe[hk]=H.n;
  try{log(`Tai mắt báo: ${typeof NM==="function"?NM(h):h.name} đã nắm ${chHave(h,S,"mc")}/${H.need} chứng tội mua chuộc người hầu của ngươi; bị tố thì phạt bổng ${BAL.charge.fine} lượng, người hầu ngươi mua bị đuổi khỏi cung.`)}catch(e){}}}}}
function mcwHit(h,t){if(!t||h===t)return;try{mcwWarnMe(t)}catch(e){console.error("mcwWarnMe",e)}try{mcwNpc(h,t)}catch(e){console.error("mcwNpc",e)}}
(function(){if(typeof evA!=="function")return;const e0=evA;evA=function(h,t,n,c){const r=e0.apply(this,arguments);try{if(n>0&&r>0&&t&&h&&h!==t&&CHLASTC&&CHLASTC.t===t&&CHLASTC.c==="mc")mcwHit(h,t)}catch(e){console.error("mcw",e)}return r}})();
/* the monthly servant tick (j42 srv month): old saves, co-op seats */
function mcwMonth(v){try{mcwWarnMe(v)}catch(e){}}
/* the warning card: three tiers + keep going */
PEND.mcWarn=pp=>{const m=typeof srvM==="function"?srvM():null,v=RV(pp.v);if(!m||!v||!mcwMine(v))return null;const H=mcwHeld(v),P=BAL.ag.why.srv.pun,C=BAL.mcw.conf,pay=BAL.coopBribe.pay;
 const o=oddsCl(Math.round(C.base+((S.tin||0)-C.tinMid)/C.tinD));const end=`${v.name} bị tố tội mua chuộc thì ngươi bị đuổi khỏi cung`;
 const cut=()=>{S.srv.spyFor=null};
 return{t:`<p>Trong hành lang, mấy cung nữ thì thào: có người đang gom chứng tội mua chuộc người hầu của ${v.name}.</p><p class="past">Đã có người nắm ${H.n}/${H.need} chứng. ${end}.</p>`,who:pv(v),o:[
  {n:"Cứ làm tai mắt",fx:{},x:`mỗi tháng Bạc +${P.spyPay} · mất: ${mcwTakeX(v,m)}`/* the danger in the Mất row (was «kèm:», folded behind «!») */,go:()=>{}},
  {n:"Lặng lẽ thôi làm tai mắt · nhẹ",fx:{},x:`tốn: thôi Bạc +${P.spyPay} mỗi tháng · được: tội ${v.name} có lộ, ngươi không bị đuổi · mất: ${v.name} ghi hận ngươi, thiện cảm ${balSg(spSee("rel",-BAL.coopBribe.grudge))}`,
   go:()=>{cut();cnvBribeAff(v,S,-1);log(`Ngươi lặng lẽ thôi làm tai mắt cho ${v.name}.`)}},
  {n:"Trả lại bạc, xin thôi · vừa",fx:{bac:-pay},x:`tốn: Bạc ${balSg(-pay)} · được: thôi làm tai mắt, tội ${v.name} có lộ ngươi không bị đuổi, ${v.name} không ghi hận`,
   go:()=>{cut();if(v.id!=null)ap(v,{bac:pay});log(`Ngươi trả lại ${pay} lượng bạc cho người của ${v.name}, xin thôi làm tai mắt.`)}},
  {n:"Bẩm chủ, khai kẻ mua chuộc · nặng",fx:{},p:o,x:`${word(o)} · thành: thôi làm tai mắt, Chủ tin +${C.tin}, ${m.name} nắm ${evSg(C.ev)} tội mua chuộc của ${v.name} · hỏng: ${m.name} giận, đày Tân Giả khố ${P.lauWk} tuần · kèm: ${v.name} ghi hận ngươi`,
   go:()=>{const ok=roll(o)/* law 4: the odds shown (p) are the odds rolled */;cut();cnvBribeAff(v,S,-1);if(ok){S.tin=cl((S.tin||0)+C.tin,0,100);try{evA(m,v,C.ev,"mc")}catch(e){}try{typeof spyLearn==="function"&&spyLearn(m,v)}catch(e){}log(`Ngươi quỳ bẩm ${m.name} chuyện ${v.name} mua chuộc ngươi; chủ tha, ghi nhớ kẻ mua chuộc.`)}
    else srvLaundry(`${m.name} nghe ngươi khai từng nhận bạc của ${v.name}, nổi giận.`,P.lauWk)}}]}};
