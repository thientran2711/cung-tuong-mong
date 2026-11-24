
/* ================= BẢN ĐỒ: CHẠM LÀ CÓ VIỆC (j77) =================
   Before: a tap on a map place could do nothing at all —
   - her own palace / where she stands was a disabled <button> (no click event fires);
   - a grey place (.agrey) had its click swallowed by j41's capture listener; its tiny buttons were the only way in;
   - "hết khắc" was shown while 4 khắc were left: the walk needed can(tc+1), and can() asks Sức 20 for anything over
     1 khắc, so with Sức under 20 every place read "hết khắc", and an accepted 'Xin bái kiến' still could not walk in.
   Now: walking (and asking / sneaking in) costs only its khắc (j80 has since dropped the Sức-20 floor); the reason says
   what is really missing; a tap on a reachable place goes there; on where she stands, opens the scene; on a closed
   place, a card with the reason and the ways in (Xin bái kiến / yết kiến, Lẻn vào with odds and risk, wait for the
   next buổi). The whole place is the tap target (labels and chips let the tap through), at least 36px. */
(function(){
 /* the walk: goTo's own check can(tc+1) reads as "tc khắc left" while she walks (can() is looked up now, so a later
    module that replaces it, e.g. j80's Sức floor, is still the one asked for everything else) */
 const g0=goTo;goTo=function(k){if(!S||!k||k==="home"||k===S.place)return g0.apply(this,arguments);
  let tc=1;try{tc=travel(S.place,k)}catch(e){}const c0=can;can=function(c){return c===tc+1?j77Kh(tc):c0(c)};
  try{return g0.apply(this,arguments)}finally{can=c0}};
})();
/* what stops the walk itself, in words */
function j77Kh(n){return walkOk(n)}
/* the map's walk reason reads the DAY (owner 15/11): a walk longer than this buổi's khắc spills (j9 walkSpill, card "Đi (đến nơi vào buổi sau)");
   only buổi tối (no walk past the night) or a place closed when she would arrive is a real stop, said in words */
function j77WalkWhy(tc,k){const left=Math.max(0,BAL.time.khac-used),b=S.buoi||0;if(left>0&&b>=B4L)return `hết khắc trong ngày (đi ${tc} khắc)`;
 const P=k&&typeof walkSpill==="function"?walkSpill(k):null;if(P)return P.ok?`đi ${tc} khắc, đến nơi đã sang ${String(BUOI[P.b]).toLowerCase()}`:`đến nơi đã sang ${String(BUOI[P.b]).toLowerCase()} — ${P.why}`;return walkWhy(tc)} /* co-op walks spill too (time-spill sweep 16/11) */
/* time-spill sweep 16/11 (owner OD L852/L886/21:42Z): asking, sneaking, being led in and greeting read the DAY like every act (dayFit, j76):
   longer than the khắc left in this buổi → it runs on into the next buổi (a pass granted now holds on arrival, j9 walkSpillGo {pass});
   red only when the day is short. j77Bound = that reason in words (j76 dayWhy), never a per-buổi lock. */
function j77Bound(n){return dayWhy(n)||`hết khắc trong ngày (cần ${n} khắc)`}
/* go in now, or walk on into the next buổi keeping the pass she was given */
function j77In(k){if(!S||S.dead||S.place===k)return;let tc=1;try{tc=travel(S.place,k)}catch(e){}if(walkOk(tc)){goTo(k);return}const P=walkSpill(k,{pass:1});if(P&&P.ok)walkSpillGo(k,{pass:1})}
/* the map state of a place (same shape as j41's; prices: walk tc, ask 1+tc, sneak 1+tc) */
accState=function(k){if(!S||!k)return{why:""};if(S.place===k)return{why:"",here:1};
 if(S.out)return{why:"đang ở lãnh cung"};if(S.confined)return{why:`cấm túc ${S.confined} tháng`};
 const a=accessOf(S,k);const tc=k===S.place?0:travel(S.place,k);
 if(!a.ok){const st={why:a.why,kind:a.kind,ask:a.ask,tc};st.sneakOk=dayFit(tc+1);if(a.ask==="yk")st.empAway=(S.where||{}).emp!==k;st.askOk=dayFit(tc+1)&&!st.empAway;return st}
 if(!j77Kh(tc)){const P=typeof walkSpill==="function"?walkSpill(k):null;return{why:j77WalkWhy(tc,k),tc,walk:1,spill:!!(P&&P.ok)}} /* home too (OD L1976): a long road home spills like every walk; spill: the walk only runs on into the next buổi = OPEN (day-khắc r2); every reader asks accSpillOk(k,st), never !st.why alone */
 return{why:"",tc}};
/* sneaking: 1 khắc at the side gate, then the walk; the Emperor's halls are a serious offence */
function accSneakPen(k){return typeof ACC_ETQ!=="undefined"&&ACC_ETQ.sneakHeavy[k]?{danh:-BAL.sneak.heavy,sev:2,txt:`Danh -${BAL.sneak.heavy}, ${typeof aaPunishTxt==="function"?aaPunishTxt(2):"tội nặng (có thể bị giáng phẩm)"}`}:{danh:-BAL.sneak.danh,sev:1,txt:`Danh -${BAL.sneak.danh}, ${typeof aaPunishTxt==="function"?aaPunishTxt(1):"bị phạt"}`}}
function j77Tc(k){try{return k===S.place?0:travel(S.place,k)}catch(e){return 1}}
/* where she ends up when asking / sneaking / being led in costs n khắc (the ask + the walk): this buổi, or the buổi the walk spills into (j76arrive) — VANPHONG true words (day-khắc r2) */
function j77When(n){return used+n<=BAL.time.khac?" buổi này":` (đến nơi vào ${j76arrive(n)})`}
accAskLine=function(k){return `${word(accAskO(k))} · tốn: ${j77Tc(k)+1} khắc · thành: được vào${j77When(j77Tc(k)+1)} · hỏng: không mất gì`};
accMini=function(k,st,risk){const L=[];const t=(st.tc!=null?st.tc:j77Tc(k))+1;
 if(st.ask==="yk")L.push(`<button class="acb" data-acask="${k}" ${st.askOk?"":"disabled"}>Xin yết kiến ${st.empAway?'<i>ngài vắng</i>':st.dayDone?'<i>hôm nay đã gặp</i>':oddsChip(word(accAskO(k)))+`<i>${t} khắc</i>`}</button>`);
 if(st.ask==="bk")L.push(`<button class="acb" data-acask="${k}" ${st.askOk?"":"disabled"}>Xin bái kiến ${oddsChip(word(accAskO(k)))}<i>${t} khắc</i></button>`);
 if(st.kind)L.push(`<button class="acb" data-acsneak="${k}" ${st.sneakOk?"":"disabled"}>Lẻn vào ${oddsChip(word(accSneakO(k)))}<i>${t} khắc${risk?` · bắt: Danh ${accSneakPen(k).danh}`:""}</i></button>`);
 return L.length?`<span class="macts">${L.join("")}</span>`:""};
accSneakLine=function(k,tc){return `${word(accSneakO(k))} · tốn: ${tc+1} khắc · thành: vào được${j77When(tc+1)} · hỏng: ${accSneakPen(k).txt}`};
accSneak=function(k){if(!S||S.dead||Q.length||S.out||S.confined)return;const tc=travel(S.place,k);if(!dayFit(tc+1))return;const nm=accName(k);const o=accSneakO(k);spend(1);
 if(roll(o)){accGrant(S,k);log(`Lẻn vào ${nm} trót lọt.`);window.__accSilent=0;j77In(k);if(S.place!==k)render();return}
 const P=accSneakPen(k);const r0=S.rank;spend(tc);apply({danh:P.danh});log(`<span class="r">Lẻn vào ${nm}, bị thị vệ bắt được: Danh ${P.danh}.</span>`);punish(S,`tự tiện lẻn vào ${nm}`,P.sev);
 Q.push({t:"Bị bắt",h:`<p>Thị vệ ${nm} bắt được ngươi ở cửa hông. Chuyện truyền khắp lục cung.</p><p class="r">Danh ${P.danh} · ${S.rank<r0?`bị giáng xuống ${RANKS[S.rank].n}`:S.confined?`cấm túc ${S.confined} tháng`:"bị phạt"}</p>`});showModal();render()};
/* an accepted request walks her in at once */
(function(){const a0=accAsk;accAsk=function(k){const r=a0.apply(this,arguments);try{if(accHas(S,k)&&S.place!==k&&Q.length&&/Được/.test(Q[0].t||"")){const m=Q[0];m.btn="Vào";m.onClose=()=>{lifeTimeout(()=>{if(!Q.length&&S&&S.place!==k)j77In(k)},0)};showModal()}}catch(e){}return r}})();
/* the card for a place she cannot enter now */
function j77Card(k,empty){if(!S||S.dead||Q.length)return;
 if(empty){Q.push({t:empty,h:`<p>Cung trống, chưa có ai ở.</p>`,btn:"Đã hiểu"});showModal();return}
 const st=accState(k);const nm=accName(k);let n=0;try{n=countAt(k)}catch(e){}
 const left=Math.max(0,BAL.time.khac-used);const sp=st.walk&&typeof walkSpill==="function"?walkSpill(k):null;const bu=i=>String(BUOI[i]||"").toLowerCase();
 const L=[sp&&sp.ok?`<p>Đi bây giờ thì đến nơi vào ${bu(sp.b)}.</p>`:`<p>Không vào được lúc này: <b>${st.why}</b>.</p>`];
 if(sp&&!sp.ok&&!String(st.why||"").includes(sp.why))L.push(`<p class="past">Đi đến nơi vào ${bu(sp.b)} cũng không được: ${sp.why}.</p>`); /* said once (j77WalkWhy already names it) */
 if(st.kind==="hour")L.push(`<p class="past">Mở cửa buổi sáng, trưa và chiều.</p>`);
 if(n)L.push(`<p class="past">Có ${n} bóng người ở đó.</p>`);
 const opts=[];
 if(st.ask){const nmA=st.ask==="yk"?"Xin yết kiến":"Xin bái kiến";
  if(st.empAway)L.push(`<p class="past">${nmA}: Hoàng thượng không có ở đây.</p>`);
  else if(st.dayDone)L.push(`<p class="past">${nmA}: ${st.askWhy}.</p>`);
  else if(!st.askOk)L.push(`<p class="past">${nmA}: ${j77Bound(st.tc+1)}.</p>`);
  else opts.push({n:nmA,fx:{},x:accAskLine(k),go:()=>setTimeout(()=>accAsk(k),0)})}
 if(st.kind){if(st.sneakOk)opts.push({n:"Lẻn vào",fx:{},x:accSneakLine(k,st.tc),go:()=>setTimeout(()=>accSneak(k),0)});
  else L.push(`<p class="past">Lẻn vào: ${j77Bound(st.tc+1)}.</p>`)}
 if(sp&&sp.ok)opts.push({n:"Đi (đến nơi vào buổi sau)",fx:{},x:`tốn: ${sp.now?`${sp.now} khắc ${bu(sp.b-1)} + `:""}${sp.rest} khắc ${bu(sp.b)} · thành: đến nơi ${bu(sp.b)}, thấy ai ở đó`,go:()=>lifeTimeout(()=>walkSpillGo(k),0)});
 const waitHelps=!sp&&(st.kind==="hour"||st.walk||/sáng|thỉnh an/.test(st.why||"")||(st.ask&&!st.empAway&&!st.askOk&&!st.dayDone)||(st.kind&&!st.sneakOk));
 if(waitHelps&&!S.out&&!S.confined&&!S.mg){const b=S.buoi||0,night=b>=(typeof B4L==="number"?B4L:2),morn=st.kind==="hour"||/sáng|thỉnh an/.test(st.why||""); /* owner final names (11/15): night "Sang ngày mới" / day "Sang buổi"; no daytime wait for a place that only opens in the morning */
  if(night||!morn)opts.push({n:night?"Sang ngày mới":"Sang buổi",fx:{},x:morn?"sáng mai mở cửa · thử lại":night?"sáng mai đủ khắc · thử lại":`${bu(b+1)} đủ khắc · thử lại`,go:()=>lifeTimeout(()=>{try{nextBuoi()}catch(e){}},0)})}
 if(opts.length){opts.push({n:"Thôi",fx:{},x:""});Q.push({t:nm,h:L.join(""),opts})}else Q.push({t:nm,h:L.join(""),btn:"Đã hiểu"});
 showModal()}
/* a walk that uses the last khắc: say so plainly, then go (she sees who is there; next buổi she starts there) */
function j77LastWalk(k,tc){let n=0;try{n=countAt(k)}catch(e){}
 Q.push({act:1,t:accName(k),h:`<p>Đường đi ${tc} khắc · đến nơi là hết khắc, sang buổi sau.</p>${n?`<p class="past">Có ${n} bóng người ở đó.</p>`:""}<p class="past">Ngươi ở lại đó: buổi sau bắt đầu ngay tại chỗ, thấy ai ở đó.</p>`,
  opts:[{n:"Đi",fx:{},x:`tốn: ${tc} khắc · thành: đến nơi, thấy ai ở đó; người ở đó có thể đến gần`,go:()=>lifeTimeout(()=>{if(S&&!S.dead&&!Q.length)goTo(k)},0)},{n:"Thôi",fx:{},x:""}]});showModal()}
/* one tap rule for the map and the list (owner 18/11 ~06:00Z–06:30Z, map-tap-go): TAP A PLACE = GO THERE AT ONCE. No confirm card, no undo, no arrival note:
   the walk khắc is deducted silently like any Hành sự action (the top bar updates); a walk into the next buổi plays the normal buổi change.
   A place she cannot reach says why in the kit CẤM toast (srvToast); a place with real choices (xin bái kiến / yết kiến, lẻn vào) still opens the ONE place card. */
function j77Go(k){if(!S||S.dead||Q.length)return;goTo(k)}
function j77Tap(k,empty){if(!S||S.dead||Q.length)return;if(empty||!k)return j77Card(k,empty||"Cung trống");
 if(S.place===k){window.__fromMap=1;tab="act";render();return}
 const st=accState(k);
 if(!st.why){j77Go(k);if(S.place!==k&&!Q.length)j77Card(k);return}
 const sp=st.walk&&typeof walkSpill==="function"?walkSpill(k):null;
 if(sp&&sp.ok&&!st.ask&&!st.kind)return walkSpillGo(k);/* crosses a buổi turn (night card, roulette…): no undo window, the buổi card says it */
 if(!st.ask&&!st.kind&&!S.out&&!S.confined&&typeof srvToast==="function"){const why=String(st.why||"").replace(/\.$/,"");srvToast(`${accName(k)}: ${why}`);return}
 j77Card(k)}
window.addEventListener("click",e=>{try{if(typeof tab==="undefined"||tab!=="go"||!S||(typeof isKc==="function"&&isKc()))return;/* the home road map (jkcg) walks on its own [data-kcgo] / [data-kcmap] */
 const sp=e.target.closest("#panel .mspot, #panel .mtile");if(!sp)return;
 if(sp.classList.contains("mtile")&&e.target.closest(".acb"))return; /* the list keeps its own kit buttons */
 const k=sp.dataset.go||sp.dataset.ak||"";let empty="";if(!k){const l=sp.querySelector(".mlab");empty=(l?l.textContent:"")||"Cung trống"}
 e.preventDefault();e.stopImmediatePropagation();j77Tap(k,empty)}catch(err){}},true);
/* the map: no disabled place buttons (a disabled button swallows the tap); legend separator */
(function(){const m0=mapHTML;mapHTML=function(){let h=m0.apply(this,arguments);if(window.__mapList)return h;
 try{h=h.replace(/(<button class="mspot[^"]*"[^>]*?)\sdisabled(?=[\s>])/g,"$1");
  h=h.replace('<span class="mleg">đi gần','<span class="mleg"> · đi gần')}catch(e){}return h}})();
(function(){const g0=mapHTMLgrid;mapHTMLgrid=function(){let h=g0.apply(this,arguments);
 try{h=h.replace(/(<button class="mtile[^"]*"[^>]*?)\sdisabled(?=[\s>])/g,"$1")}catch(e){}return h}})();
(function(){const st=document.createElement("style");st.textContent=`
.mspot{min-width:36px;min-height:36px}
.mspot.agrey,.mspot.off,.mspot.empty{cursor:pointer}
.mspot>*,.mspot .acb,.mspot .macts{pointer-events:none!important}
.mtile .tacts .acb{min-height:36px}
.mspot.empty{z-index:1}
`;document.head.appendChild(st)})();
/* ================= LỄ NGHI THAY KHÓA PHẨM (j77, owner 11/14; values set from the historian's findings) =================
   One rule for everyone (her and every NPC):
   - a consort's palace: anyone may come as a guest (visiting a side-hall resident is allowed; no rank lock).
     Greeting the chủ vị first is expected courtesy, never a lock: an optional 1-khắc bái kiến (chủ vị thiện cảm +2),
     or walk in without it (chủ vị thiện cảm −, more the wider the rank gap and the prouder her nature). An invitation
     (a pass for the buổi) needs no greeting.
   - Dưỡng Hòa điện / Cần Chính điện (the Emperor's quarters): summons only; xin yết kiến, or wait to be summoned;
     sneaking in is a serious offence (Danh -15, heavy punishment).
   - Càn Ninh cung (the Empress) and Đức Thọ cung (the Thái hậu): the morning thỉnh an, or by invitation / summons;
     otherwise xin bái kiến.  - Gardens / Thái y viện: closed at night. */
/* THE KNOBS (values pending the historian's findings; change here only, every rule below reads them):
   mode: "optional" = guests just walk in (greeting not asked, no card);
         "expected" = card: greet (cost, ±thiện cảm) or walk in without greeting (penalty below);
         "required" = card: greet or turn back (no walking in without greeting). */
const ACC_ETQ={mode:"expected",
 khac:1,            /* khắc the greeting takes */
 okAff:2,           /* chủ vị thiện cảm for the greeting (a sure act) */
 skipBase:1,skipGap:.5,skipMax:6, /* walking in without greeting: −(base + gap×rank gap), capped, × her nature */
 skipTrait:{"Kiêu ngạo":1.5,"Xảo quyệt":1.25,"Kín đáo":1.25,"Tham vọng":1,"Khiêm nhường":.75,"Ân cần":.5},
 skipDanh:0,        /* no Danh loss: it is discourtesy, not an offence */
 npcGreet:70,       /* % an NPC guest greets the chủ vị (same costs and effects apply to her) */
 lead:false,        /* 'nhờ thái giám dẫn vào' for the Emperor's halls: off (summons only) */
 sneakHeavy:{dtd:1,thu:1}, /* sneaking into these: Danh -15 and heavy punishment */
 invite:true,       /* an invitation / accepted request / pass for the buổi skips the greeting */
 hostHome:true,     /* only when the chủ vị is at home */
 rankGap:1,         /* greeting asked when chủ vị's rank exceeds the guest's by at least this */
 knMorningFree:true /* Càn Ninh at morning thỉnh an: the thỉnh an is the greeting */};
function accRkName(p){return p.queen?"Hoàng hậu":RANKS[rkOf(p)].n}
accessOf=function(p,k){p=p||S;if(!k)return{ok:false,why:"cung trống",kind:"rule"};
 if(accOwn(p,k))return{ok:true};
 const ctx={b:S.buoi||0,r:rkOf(p),host:accHost(k)};
 for(const fn of ACC_ROLE){try{const v=fn(p,k,ctx);if(v)return v}catch(e){}}
 if(accHas(p,k))return{ok:true,pass:1};
 const b=ctx.b;
 if(k==="dtd"||k==="thu")return{ok:false,why:k==="dtd"?"tẩm điện Hoàng thượng: chỉ vào khi được triệu":"nơi Hoàng thượng phê tấu: chỉ vào khi được triệu",kind:"rule",ask:"yk",lead:1,heavy:1};
 if(k==="kn"){if(!qOn()||b===0||ctx.r>=7)return{ok:true};return{ok:false,why:"cung Hoàng hậu: ngoài giờ thỉnh an phải được mời",kind:"rule",ask:"bk"}}
 if(k==="tn"){if(S.thDead||b===0)return{ok:true};return{ok:false,why:"Thái hậu chỉ tiếp lúc sáng thỉnh an",kind:"rule",ask:"bk"}}
 if(ACC_DAY[k]){if(b<B4L)return{ok:true};return{ok:false,why:"đóng cửa tối",kind:"hour"}}
 return{ok:true}};
/* the chủ vị a guest must greet before entering k now, or null */
function accEtq(p,k){p=p||S;const C=ACC_ETQ;if(C.mode==="optional")return null;if(!k||k==="home"||accOwn(p,k)||(C.invite&&accHas(p,k)))return null;if(k!=="kn"&&k[0]!=="r")return null;
 const h=accHost(k);if(!h||h===p||!h.alive||h.out)return null;if(C.hostHome&&whereOf(h)!==k)return null;if(rkOf(h)-rkOf(p)<C.rankGap)return null;
 if(k==="kn"&&C.knMorningFree&&(S.buoi||0)===0)return null; /* morning thỉnh an is the greeting */
 return h}
function accSkipAff(h,g){const C=ACC_ETQ;const gap=Math.max(1,rkOf(h)-rkOf(g));const m=tv(C.skipTrait,h)||1;return -Math.max(1,Math.round(Math.min(C.skipMax,C.skipBase+C.skipGap*gap)*m))}
/* the card: greet, or walk in without greeting, or not go; then carry on with what she meant to do */
function accEtqCard(k,then){const h=accEtq(S,k);if(!h){then();return}if(!S||S.dead||Q.length)return;
 const tc=travel(S.place,k);const nm=accName(k);const hn=`${accRkName(h)} ${h.name}`;const left=Math.max(0,BAL.time.khac-used);const opts=[];
 const C=ACC_ETQ,sh=h.name.split(" ").pop(),sg=n=>(n>0?"+":"")+n,skA=accSkipAff(h,S);
 const L=[`<p>${hn} là chủ vị ${nm}, đang ở cung. Khách phẩm thấp hơn ${C.mode==="required"?"phải":"theo lệ nên"} vào chào chủ vị trước${C.invite?" (đến theo lời mời thì khỏi)":""}${C.mode==="required"?"":"; ngươi vẫn có thể đi thẳng đến chỗ người ngươi thăm"}.</p>`];
 const sp=!j77Kh(tc)?walkSpill(k):null;
 if(sp&&sp.ok)opts.push({n:"Đi (đến nơi vào buổi sau)",fx:{},x:`tốn: ${sp.now?`${sp.now} khắc ${String(BUOI[sp.b-1]).toLowerCase()} + `:""}${sp.rest} khắc ${String(BUOI[sp.b]).toLowerCase()} · thành: đến nơi ${String(BUOI[sp.b]).toLowerCase()}, chủ vị còn ở cung thì bái kiến lúc ấy`,go:()=>lifeTimeout(()=>walkSpillGo(k),0)});
 else if(dayFit(tc+C.khac))opts.push({n:`Bái kiến ${accRkName(h)} rồi vào`,fx:{},x:`tốn: ${tc+C.khac} khắc · thành: ${sh}: ${(typeof pvRel==="function"?pvRel(h,C.okAff):"thiện cảm "+sg(C.okAff))} · (gồm ${C.khac} khắc bái kiến)`,go:()=>setTimeout(()=>accEtqGo(k,h,1,then),0)});
 if(!(sp&&sp.ok)&&!dayFit(tc+C.khac))L.push(`<p class="past">Bái kiến: ${j77Bound(tc+C.khac)}.</p>`);
 if(C.mode!=="required"&&j77Kh(tc))opts.push({n:"Vào thẳng, không bái kiến",fx:{},x:`tốn: ${tc} khắc · thành: vào cung · kèm: thiếu lễ, ${sh}: ${(typeof pvRel==="function"?pvRel(h,skA):"thiện cảm "+sg(skA))}${C.skipDanh?`, Danh ${sg(C.skipDanh)}`:""}`,go:()=>setTimeout(()=>accEtqGo(k,h,0,then),0)});
 if(C.invite)L.push(`<p class="past">Đến theo lời mời thì không cần bái kiến: mời nàng sang cung ngươi, hoặc chờ được mời.</p>`);
 opts.push({n:"Thôi",fx:{},x:""});Q.push({t:nm,h:L.join(""),opts});showModal()}
function accEtqGo(k,h,greet,then){if(!S||S.dead||Q.length)return;const sh=h.name.split(" ").pop();const bf=typeof rsnap==="function"?rsnap():null;
 const C=ACC_ETQ,sg=n=>(n>0?"+":"")+n;
 /* the greeting runs on past this buổi (dayFit): walk in first, then the bow spends its khắc into the next buổi (j76 carry) */
 if(greet&&!j77Kh(travel(S.place,k)+C.khac)){if(!j77Kh(travel(S.place,k))||!dayFit(travel(S.place,k)+C.khac))return;accGrant(S,k);then();if(S.place!==k)return;
  spend(C.khac);relAdd(S,h,C.okAff);log(`Ngươi cúi chào, bái kiến ${accRkName(h)} ${h.name} ở ${accName(k)}: chủ vị quý ngươi ${sg(C.okAff)}.`);try{if(typeof k61Meet==="function")k61Meet(h,"",1)}catch(e){}
  setTimeout(()=>{try{if(bf)resultShow(`Bái kiến ${accRkName(h)} ${h.name}`,bf,true)}catch(e){}},30);return}
 if(greet){if(!j77Kh(travel(S.place,k)+C.khac))return;spend(C.khac);relAdd(S,h,C.okAff);log(`Ngươi cúi chào, bái kiến ${accRkName(h)} ${h.name} ở ${accName(k)}: chủ vị quý ngươi ${sg(C.okAff)}.`);/* bowing to her face to face = she sees her (j61: a greeting reveals the face, not the name) */try{if(typeof k61Meet==="function")k61Meet(h,"",1)}catch(e){}}
 else{if(C.mode==="required")return;const a=accSkipAff(h,S);relAdd(S,h,a);if(C.skipDanh)apply({danh:C.skipDanh});log(`<span class="r">Vào ${accName(k)} không chào chủ vị ${h.name}: thiếu lễ, chủ vị quý ngươi ${sg(a)}${C.skipDanh?`, Danh ${sg(C.skipDanh)}`:""}.</span>`)}
 accGrant(S,k);then();
 /* act audit: the change came after the dialog had closed, and the arrival card ("không đổi gì") covered it: show it after arriving */
 setTimeout(()=>{try{if(bf)resultShow(greet?`Bái kiến ${accRkName(h)} ${h.name}`:`Vào ${accName(k)} không bái kiến`,bf,true)}catch(e){}},30)}
/* the gate: every way in (map, person card, follow) passes the greeting first */
(function(){const g0=goTo;goTo=function(k){if(!S||!k||k===S.place||k==="home"||window.__accSilent||window.__j77etq)return g0.apply(this,arguments);
 const h=accEtq(S,k);if(!h||S.dead||Q.length||S.out||S.confined||!accessOf(S,k).ok)return g0.apply(this,arguments);
 accEtqCard(k,accThen({f:"goTo",a:[k],etq:1},()=>{window.__j77etq=1;try{goTo(k)}finally{window.__j77etq=0}}));return}})();
/* what the greeting leads on to, as data beside the closure (co-op thin F2: the greeting runs on the host, the road after it is named, not captured) */
function accThen(d,fn){try{fn.__f=d}catch(e){}return fn}
/* person-card acts: the visit and 'Đến gặp' carry the greeting in their price, and run it before opening her card */
(function(){const v0=visitPal;visitPal=function(id){const v=rivals.find(x=>x.id===id);if(!v||!S||S.dead||Q.length)return;const k=palaceOf(v);
  if(S.place!==k&&!S.confined&&!S.out&&!accessOf(S,k).ok)return j77Card(k);
  if(S.place!==k&&!j77Kh(travel(S.place,k))){if(accGuestSpill(k,travel(S.place,k)))walkSpillGo(k);return} /* arrives next buổi; the greeting (if owed) is asked on arrival */
  if(S.place!==k&&accEtq(S,k)&&!S.confined&&!S.out)return accEtqCard(k,accThen({f:"visitPal",a:[id]},()=>visitPal(id)));const c0=can,tc=travel(S.place,k);can=function(c){return c===tc+1?j77Kh(tc):c0(c)};try{return v0.apply(this,arguments)}finally{can=c0}};
 const s0=goSee;goSee=function(id){const v=rivals.find(x=>x.id===id);if(!v||!S||S.dead||Q.length)return;const k=whereOf(v);
  if(S.place!==k&&!S.confined&&!S.out&&!accessOf(S,k).ok)return j77Card(k);
  if(S.place!==k&&accEtq(S,k)&&!S.confined&&!S.out)return accEtqCard(k,accThen({f:"goSee",a:[id]},()=>goSee(id)));
  if(S.place===k)return s0.apply(this,arguments);if(!j77Kh(travel(S.place,k))){if(accGuestSpill(k,travel(S.place,k)))walkSpillGo(k);return} /* arrives next buổi and sees who is there then */const c0=can,tc=travel(S.place,k);can=function(c){return c===tc+1?j77Kh(tc):c0(c)};try{return s0.apply(this,arguments)}finally{can=c0}}})();
/* the two person-card buttons, one rule: a lock is not a dead button: tapping opens the card with its reason and ways in */
function accGuestLine(k,tc,tail){const who=accEtq(S,k);return `tốn: ${tc+(who?ACC_ETQ.khac:0)} khắc · thành: ${tail}${who?` · (gồm ${ACC_ETQ.khac} khắc bái kiến ${accRkName(who)} ${who.name.split(" ").pop()})`:""}`}
/* khắc for the person-card walks read the DAY (owner 15/11, time-spill sweep 16/11): the palace visit and 'Đến gặp' may arrive next buổi
   (walk spill, j9) and meet whoever is there then; buổi tối never runs past the night */
function accGuestSpill(k,tc){if(j77Kh(tc)||typeof walkSpill!=="function")return null;const P=walkSpill(k);return P&&P.ok?P:null}
function accGuestWhy(k,tc){if(S.confined)return"đang cấm túc";if(S.out)return"đang ở lãnh cung";const a=accessOf(S,k);if(!a.ok)return"";if(j77Kh(tc))return"";
 if(accGuestSpill(k,tc))return"";const b=S.buoi||0;if(b>=B4L)return `hết khắc trong ngày (đi ${tc} khắc)`;
 const P=typeof walkSpill==="function"?walkSpill(k):null;return P&&!P.ok&&P.why?`đến nơi đã sang ${String(BUOI[b+1]).toLowerCase()} — ${P.why}`:(dayWhy(tc)||`hết khắc trong ngày (đi ${tc} khắc)`)}
function accGuestNeed(h,k,tc){const P=accGuestSpill(k,tc);if(!P||/data-kneed=|\sdisabled/.test(h.slice(0,h.indexOf(">")+1)))return h;
 return h.replace(/^<button /,`<button data-kneed="${encodeURIComponent(JSON.stringify([{t:`đi ${tc} khắc (đến nơi ${String(BUOI[P.b]).toLowerCase()})`,ok:true}]))}" `)}
function accLockTag(k){const a=accessOf(S,k);return a.ok?"":` · (${a.why}: chạm để xem cách vào)`}
visitBtn=function(v){if(!v||!v.alive||v.out||sameHouse(S,v))return"";const k=palaceOf(v);if(S.place===k)return"";const tc=travel(S.place,k);
 return accGuestNeed(pbtn(`data-visit="${v.id}"`,`Đến cung nàng thăm`,accGuestLine(k,tc,"nếu nàng ở nhà thì gặp mặt · có khi nàng đi vắng")+accLockTag(k),accGuestWhy(k,tc)),k,tc)};
seeBtn=function(v){if(!v||v===S||!v.alive||v.out||together(S,v)||!locKnown(v))return"";const k=whereOf(v),tc=travel(S.place,k);
 return accGuestNeed(pbtn(`data-see="${v.id}" class="seeb"`,`Đến gặp ${v.name.split(" ").pop()}`,accGuestLine(k,tc,"gặp mặt, mọi việc làm tại chỗ, dễ hơn sai người")+accLockTag(k),accGuestWhy(k,tc)),k,tc)};
/* hard-lock extra way in: ask a eunuch to lead her in (bạc), for the Emperor's halls */
function accLeadO(k){return od(BAL.odb.j77.odAccLeadO+(S.danh||0)/8+(typeof mm==="function"?mm():0))}
function accLeadCost(){return BAL.sneak.lead}
function accLead(k){if(!S||S.dead||Q.length||S.out||S.confined)return;const tc=travel(S.place,k);if(!dayFit(tc+1)||S.bac<accLeadCost())return;const nm=accName(k);
 const o=accLeadO(k);/* odds read before the spend (shown-odds r2) */spend(1);/* review ag-all-2 r2 A5 (OD 17/11 ~17:10Z (1)): the eunuch's bạc only when he leads her in */if(roll(o)){apply({bac:-accLeadCost()});accGrant(S,k);log(`Nhờ thái giám dẫn vào ${nm}: được dẫn vào (Bạc -${accLeadCost()}).`);j77In(k);if(S.place!==k)render();return}
 log(`Nhờ thái giám dẫn vào ${nm}: hắn không dám nhận bạc, từ chối.`);Q.push({t:"Không được dẫn vào",h:`<p>Thái giám đẩy gói bạc lại, lắc đầu: “Không có khẩu dụ, nô tài không dám.”</p>`});showModal();render()}
/* the closed-place card gains the eunuch and the 'chờ được triệu' line */
(function(){const c0=j77Card;j77Card=function(k,empty){const n0=Q.length;c0.apply(this,arguments);try{if(empty||Q.length===n0)return;const m=Q[Q.length-1];const a=accessOf(S,k);if(!a.lead)return;
  const tc=travel(S.place,k);const left=Math.max(0,BAL.time.khac-used);
  if(!ACC_ETQ.lead){m.h+=`<p class="past">Tự ý vào là tội nặng. Hoặc chờ được triệu.</p>`;showModal();return}
  if(!m.opts)m.opts=[{n:"Thôi",fx:{},x:""}],m.btn=undefined;
  const ok=dayFit(tc+1)&&S.bac>=accLeadCost();
  if(ok)m.opts.splice(Math.max(0,m.opts.length-1),0,{n:"Nhờ thái giám dẫn vào",fx:{},x:`${word(accLeadO(k))} · tốn: ${tc+1} khắc · thành: được vào${j77When(tc+1)}, Bạc -${accLeadCost()} · hỏng: không mất bạc`,go:()=>setTimeout(()=>accLead(k),0)});
  else m.h+=`<p class="past">Nhờ thái giám dẫn vào: ${!dayFit(tc+1)?j77Bound(tc+1):`cần ${accLeadCost()} bạc (có ${S.bac})`}.</p>`;
  m.h+=`<p class="past">Hoặc chờ được triệu.</p>`;showModal()}catch(e){}}})();
/* map tiles: a palace whose chủ vị outranks her shows the greeting in its price */
/* one source for a printed walk price (walk-cost r3): "home" (her own phối điện too, jres resMeHoused) = the walk home only, no greeting;
   a palace whose chủ vị outranks her and is in = walk + the greeting (accEtq) — also the chủ vị's halls of the palace she lives in.
   Used by the Dư đồ spot (her home spot prints accWalkTxt("home")) and the palace-view hall rows (jpm). */
function accResHomeK(){try{const r=typeof resMeHoused==="function"&&resMeHoused();return r?palaceOf(r.head):null}catch(e){return null}}
function accWalkCost(k){if(!S||!k)return{tc:0};const tc=k===S.place?0:travel(S.place,k);const who=k==="home"?null:accEtq(S,k);return{tc,who,n:tc+(who?ACC_ETQ.khac:0)}}
function accWalkTxt(k){const c=accWalkCost(k);return `${c.n} khắc${c.who?" · bái kiến":""}`}
(function(){const m0=mapHTML;mapHTML=function(){let h=m0.apply(this,arguments);if(window.__mapList)return h;
 try{h=h.replace(/(<button class="mspot[^"]*" data-go="([^"]+)"[^>]*>)([\s\S]*?)(<\/button>)/g,(all,open,k,inner,close)=>{const who=accEtq(S,k);if(!who)return all;
   if(k===accResHomeK())return open.replace(/title="([^"]*)"/,(m,t)=>`title="${t} · vào chính điện: bái kiến ${accRkName(who)} ${who.name} (+${ACC_ETQ.khac} khắc)"`)+inner.replace(/<em class="ok">\d+ khắc<\/em>/,`<em class="ok">${accWalkTxt("home")}</em>`)+close; /* her home: the label is the walk home goTo("home") charges */
   const tc=travel(S.place,k);inner=inner.replace(/<em class="ok">\d+ khắc<\/em>/,`<em class="ok">${accWalkTxt(k)}</em>`);
   open=open.replace(/title="([^"]*)"/,(m,t)=>`title="${t} · bái kiến ${accRkName(who)} ${who.name} (+${ACC_ETQ.khac} khắc)"`);return open+inner+close})}catch(e){}return h}})();
/* TRA CỨU: the rules as they now stand */
accInfo=function(){if(!S||Q.length)return;const R=n=>`<b>${n}</b>`;
 Q.push({t:"Ra vào cung cấm",h:`<div class="acinfo"><p>Một luật cho mọi người trong cung, cả phi tần khác.</p>
 <p>${R("Cung phi tần")}: ai cũng đến làm khách được.${(()=>{const C=ACC_ETQ,sg=n=>(n>0?"+":"")+n;if(C.mode==="optional")return"";return ` Chủ vị phẩm cao hơn ngươi đang ở cung: theo lệ ${C.mode==="required"?"phải":"nên"} ${R("bái kiến")} trước (${C.khac} khắc, chủ vị quý ngươi ${sg(C.okAff)})${C.invite?"; đến theo lời mời thì khỏi":""}.${C.mode==="expected"?` Không chào: chủ vị phật ý, bớt quý ngươi (phẩm cách càng xa, tính càng kiêu thì càng giảm).`:""}`})()}</p>
 <p>${R("Càn Ninh cung, Đức Thọ cung")}: sáng thỉnh an, hoặc khi được mời, được triệu. Lúc khác: xin bái kiến.</p>
 <p>${R("Dưỡng Hòa điện, Cần Chính điện")}: chỉ khi được triệu. Cách khác: xin yết kiến, hoặc chờ được triệu. Tự ý vào là tội nặng.</p>
 <p>Phẩm thấp gặp phẩm cao thì cúi chào trước.</p>
 <p>${R("Thái y viện, Ngự hoa viên")}: sáng, trưa, chiều. Tối đóng cửa.</p>
 <p>${R("Kính sự phòng")}: phi tần nào cũng vào. ${R("Trường Môn viện")}: ai cũng vào, bị thấy: Danh -${BAL.sneak.seen}.</p>
 <p>${R("Cung của ngươi")}: luôn vào được.</p>
 <p>Chỗ có dấu khóa: không vào được lúc này; chạm vào tên để xem lý do và cách vào. <b>Lẻn vào</b>: tốn khắc, bị bắt Danh -${BAL.sneak.danh} và bị phạt (điện của Hoàng thượng: Danh -${BAL.sneak.heavy}, tội nặng).</p></div>`,btn:"Đã hiểu"});showModal()};
/* NPC guests keep the same courtesy: when a consort spends the buổi in a palace whose chủ vị outranks her, she greets
   (chủ vị thiện cảm +okAff toward her) or does not (the same scaled loss) */
(function(){const pw=placeWhere;placeWhere=function(){const r=pw.apply(this,arguments);try{const C=ACC_ETQ;if(C.mode==="optional")return r;const W=S.where||{};
 for(const v of rivals){if(!v.alive||v.out)continue;const k=W[v.id];if(!k||k==="home"||k[0]!=="r"||palaceOf(v)===k)continue;const h=accHost(k);
  if(!h||h===v||!h.alive||h.out||whereOf(h)!==k||rkOf(h)-rkOf(v)<C.rankGap)continue;
  if(roll(C.npcGreet))relAdd(v,h,C.okAff);else relAdd(v,h,accSkipAff(h,v))}}catch(e){}return r}})();

/* owner 11/15 06:45Z: when the khắc run out the buổi still turns over by itself, but she STAYS where she is (j41 nextBuoi keeps
   S.place): the stage of that place shows who is there in the new buổi, with one line "Sang buổi tối · ngươi vẫn ở Kính sự phòng" */
(function(){const n0=nextBuoi;nextBuoi=function(){const k=S&&S.place,b=S?(S.buoi||0):0;const r=n0.apply(this,arguments);
 try{if(S&&!S.dead&&!S.out&&k&&k!=="home"&&b<(typeof B4L==="number"?B4L:2)&&(S.buoi||0)===b+1&&S.place===k&&S.visit&&S.visit.k===k){const nm=typeof accName==="function"?accName(k):k;
  const line=`Sang ${String(BUOI[S.buoi]).toLowerCase()} · ngươi vẫn ở ${nm}.`;{const stay=/Sang [^·.]+ · ngươi vẫn ở [^.]+\.\s*/g;let m0=(S.visit.msg||"").replace(stay,"");S.visit.msg=line+(m0?" "+m0:"");render()}}}catch(e){}return r}})();
