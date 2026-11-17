/* ================= jpoison: QUÀ ĂN UỐNG CÓ THỂ BỎ ĐỘC · CHÂN TÌNH CÓ NGUYÊN CỚ · ÂN TÌNH (owner 15/11 12:25Z, 13:15Z, 14:05Z; review/poison-gift)
   Loads after jgift (the kit gift dialog of main, gift-ui): it only ADDS to that dialog, never replaces it. Numbers in BAL.pg / BAL.gift.
   1. POISONS (real items, bought by the existing đồ-cấm routes j83 WILL/IROUTE): Hạc đỉnh hồng (chết), Độc ngấm dần (Sức −25, ốm 3 tháng = the
      "Hạ độc dần" effect), Phấn hủy nhan (Sắc −8), Xạ hương (sảy thai, only a pregnant target), Mê dược (Sức −10, thẻ bài rút 1 tuần).
   2. Giving food / drink / a sachet — her own work (j83 kinds mon, huong) or a bought / stipend good of those kinds (tonics, tea, snacks, wine, túi thơm) — the gift dialog gets one
      more row "Bỏ độc vào…" (in every recipient tab) when she holds a poison: it opens a card of target × poison, each a kit option with the REAL
      odds word, Tốn/Được/Mất/Kèm with numbers (an active act: owner 15:05Z) and the kit "Vì sao <bậc>?" popover (jwhy: option.why()).
      pgOdds(a,t,e) = odA(a, BAL.pg.base + Tâm cơ/4 + the target's thiện cảm toward the giver /4 + grade × BAL.pg.grade
        − the target's guard: vigilance oSee/3, a trusted thái y (BAL.pg.doctor), a silver needle (BAL.pg.needle), a loyal maid tasting (BAL.pg.maid)).
      Success: the effect. Failure: the dish is noticed; caught() (the same chance is shown on the card) decides whether it is traced to the giver
      (2 evidence to the target, +1 to the Hoàng hậu), else the target only throws it away (quý −6). Đức −P.duc for trying.
      Hoàng thượng and Thái hậu are NOT offered (a taster always checks; treason) — default, the owner may overrule (OWNER_DECISIONS).
   3. NPCs: the same act (pgift) — a malicious NPC holding a poison sends her (or another consort) a poisoned dish. Every food gift that reaches HER
      (poisoned or not, no tell) gets a card: Nhận ngay · Thử bằng kim bạc (needs one) · Nhờ cung nữ nếm trước (her maid's Lòng) · Trả lại.
      That card arrives unbidden, so it follows the event-choice rule (KIT §28.6: price + Cần + hint), not the act card.
   4. CHÂN TÌNH (replaces j83's hidden trait check): a real, visible cause — HANDMADE by the giver AND made for this person (their taste) AND the
      bond is real (Ân tình ≥ BAL.gift.an for Hoàng thượng, Thái hậu quý ≥ BAL.gift.th, a consort's quý ≥ BAL.gift.rel) AND not within
      BAL.gift.askW weeks of asking them a favour. Each recipient row of the gift dialog shows the check in its kit Ghi chú row
      ("Chân tình: đủ — …" / "Chân tình: chưa đủ — cần …"). NPCs use the same rule.
   5. ÂN TÌNH: gloss (how it is earned, what it does, the existing monthly fade j8 anMonth); the Emperor card shows Sủng and Ân tình as kit
      person-card chips (Ân tình with its bar). The top bar stays the header-danh layout (owner ≈17:50Z: left Sắc·Tài·Tâm cơ·Đức·Danh·Sủng,
      right Bạc·Sức): no extra cell; Ân tình also shows in the stage "Ân sủng" panel (owner-approved 17:55Z). */
Object.assign(BAL,{pg:{base:42,grade:6,doctor:15,needle:30,maid:12,duc:6,hhEv:1,weakSuc:30/* review/one-core-jkc: Sức below this = she is weak (the odds line names the cut) */},gift:{an:30,rel:40,th:40,askW:2}});
/* ---------- poisons ---------- */
IT.docngam=IT.docngam||{n:"Độc ngấm dần",kd:"Độc dược",d:"Bỏ vào đồ ăn: Sức -25, ốm ba tháng · bị khám ra là có tội",pr:60,il:1,tg:[]};
IT.phanhuy=IT.phanhuy||{n:"Phấn hủy nhan",kd:"Độc dược",d:"Trộn vào đồ ăn, phấn sáp: Sắc -8 · bị khám ra là có tội",pr:45,il:1,tg:[]};
IT.meduoc=IT.meduoc||{n:"Mê dược",kd:"Độc dược",d:"Bỏ vào trà, rượu: mê man, Sức -10, lỡ một tuần thẻ bài · bị khám ra là có tội",pr:35,il:1,tg:[]};
/* item pictures (gpt-2-6, img/item-<k>.webp + item512, on the CDN) and their grade frame (j98) */
try{Object.assign(ITEM_ART_G,{docngam:1,phanhuy:1,meduoc:0,kimbac:0})}catch(e){}
IT.kimbac=IT.kimbac||{n:"Kim bạc thử độc",kd:"Tạp vật",d:"Cắm vào đồ ăn: kim đen là có độc",pr:15,rk:0,tg:["rv"]};
try{Object.assign(WILL,{docngam:{eff:"Sức -25, ốm ba tháng",tr:"khó lần ra: độc ngấm chậm"},phanhuy:{eff:"Sắc -8",tr:"vừa: mặt nổi mẩn, thái y đoán được"},meduoc:{eff:"mê man, Sức -10, lỡ thẻ bài một tuần",tr:"dễ lần ra: ngủ li bì, ai cũng ngờ"}});
 for(const r of ["maid","cho"])if(IROUTE[r])for(const k of ["docngam","phanhuy","meduoc"])if(!IROUTE[r].ks.includes(k))IROUTE[r].ks.push(k);
 if(!SHOP_ALL.includes("kimbac"))SHOP_ALL.push("kimbac")}catch(e){}
/* won: the kit "thành" text of her card ("nàng … -N" = harm to a rival, green in the kit) */
const PGX={hacdinh:{n:"Hạc đỉnh hồng",won:"nàng Sức -120 · nàng thường chết",duc:10},docngam:{n:"Độc ngấm dần",won:"nàng Sức -25 · nàng ốm ba tháng",duc:6},
 phanhuy:{n:"Phấn hủy nhan",won:"nàng Sắc -8 vì nổi mẩn",duc:5},xahuong:{n:"Xạ hương",won:"nàng sảy thai · nàng Sức -25",duc:10,preg:1},meduoc:{n:"Mê dược",won:"nàng Sức -10 · nàng không được lật thẻ một tuần",duc:3}};
/* food, drink, sachets: handmade dishes / sachets, and every bought or stipend good of those kinds (jstip tea, snacks, wine; j8 tonics; túi thơm) */
const PGX_FOOD=["yensao","nhansam","agiao","tuithom"],PGX_KD=["Thuốc bổ","Trà","Điểm tâm","Rượu"];
function pgFood(e){return !!e&&!e.h&&(e.wk?["mon","huong"].includes(e.wk.kind):PGX_FOOD.includes(e.k)||!!(IT[e.k]&&PGX_KD.includes(itm(e.k).kd)))}
function pgHeld(a){return Object.keys(PGX).filter(k=>(a.inv||[]).some(e=>e&&e.k===k&&!e.h))}
function pgGrade(e){return e&&e.wk?(e.wk.ti|0):e&&IT[e.k]?Math.min(3,Math.floor((itm(e.k).pr||0)/25)):0}
function pgNm(p,cap){return p===S?(cap?"Ngươi":"ngươi"):p.name}
/* the target's guard: [label, points] lowering the odds (hidden facts stay without numbers) */
function pgGuard(t){const L=[];const v=Math.round(oSee(t,true)/3);L.push([`${pgNm(t,1)} cảnh giác`,-v]);if(t.doctor)L.push([`Thái y tâm phúc của ${pgNm(t)}`,-BAL.pg.doctor]);
 if((t.inv||[]).some(e=>e&&e.k==="kimbac"&&!e.h))L.push([`${pgNm(t,1)} có kim bạc thử độc`,-BAL.pg.needle]);
 if(t.maid&&(t.maid.loyal||0)>=BAL.loy.trust)L.push([`Cung nữ trung thành của ${pgNm(t)} nếm trước`,-BAL.pg.maid]);return L}
/* the one formula (her card, the roll, every NPC): {o, F: kit "Vì sao" factors, cp: chance that a failed try is traced back (caught())} */
function pgOdds(a,t,e){const G=pgGuard(t);const tr=Math.round((rel(t,a)||0)/4),tc=Math.round((a.tamco||0)/4),gr=pgGrade(e)*BAL.pg.grade;
 const raw=BAL.pg.base+tc+tr+gr+G.reduce((s,x)=>s+x[1],0);const o=cl(Math.round(odA(a,raw)),3,92);
 const F=[[`Tâm cơ ${pgNm(a)} ${a.tamco|0}`,tc],[`${pgNm(t,1)} ${tr>=0?"tin":"ngờ"} ${pgNm(a)}`,tr],
  [e&&e.wk?`Món ${WTIER[e.wk.ti|0]} che vị`:`${e&&IT[e.k]?itm(e.k).n:"Món"} che vị`,gr]].concat(G);if((a.suc||0)<BAL.pg.weakSuc)F.push([`Sức ${pgNm(a)} dưới ${BAL.pg.weakSuc}`,-15]);
 const cp=cl(oSee(t,true)-4*(facN(a)-1),5,95);return{o,F,cp}}
function pgEffect(a,t,pk){const nm=t===S?"Ngươi":`${rkName(t)} ${t.name}`;
 if(pk==="hacdinh"){if(t===S){die("Trúng độc, không qua khỏi");return `<span class="r">Ngươi trúng độc.</span> `}ap(t,{suc:-120});try{dieIf(t,"Trúng độc, không qua khỏi")}catch(e){}return `<span class="r">${nm} trúng độc nặng.</span> `}
 if(pk==="docngam"){ap(t,{suc:BAL.eff.jpoison.sucPgEffect});t.sick=Math.max(t.sick||0,3);return `${nm} ăn xong thì người mệt dần, thái y bảo trúng hàn khí (Sức ${balSg(BAL.eff.jpoison.sucPgEffect)}, ốm ba tháng). `}
 if(pk==="phanhuy"){ap(t,{sac:BAL.eff.jpoison.sacPgEffect});return `${nm} nổi mẩn khắp mặt (Sắc ${balSg(BAL.eff.jpoison.sacPgEffect)}). `}
 if(pk==="xahuong"){if(t.preg&&!t.fake){t.preg=0;t.hidden=false;ap(t,{suc:BAL.eff.jpoison.sucPgEffect_2});return `<span class="r">${nm} động thai, sảy mất đứa bé (Sức ${balSg(BAL.eff.jpoison.sucPgEffect_2)}).</span> `}return `${nm} dùng xong không sao. `}
 if(pk==="meduoc"){ap(t,{suc:BAL.eff.jpoison.sucPgEffect_3});t.block=Math.max(t.block||0,1);return `${nm} ngủ li bì cả ngày, lỡ thẻ bài tuần này (Sức ${balSg(BAL.eff.jpoison.sucPgEffect_3)}). `}return""}
/* the one act: same function for her and every NPC */
function pgGive(a,t,ix,pk){const e=a.inv[ix];if(!e||!pgFood(e)||!PGX[pk])return"";const pi=a.inv.findIndex(x=>x&&x.k===pk&&!x.h);if(pi<0)return"";
 const by=a===S?"Ngươi":`${rkName(a)} ${a.name}`,dn=e.wk?e.wk.n:itm(e.k).n;const O=pgOdds(a,t,e);
 a.inv.splice(Math.max(ix,pi),1);a.inv.splice(Math.min(ix,pi),1);a.schemes=(a.schemes||0)+1;if(typeof ducAdd==="function")ducAdd(a,-PGX[pk].duc,"bỏ độc vào quà");else ap(a,{duc:-PGX[pk].duc});
 if(t===S){pushDil(mkP("pgin",{f:key(a),dn,pk,o:O.o,e:Object.assign({},e)}),"Quà tặng");return ""}
 if(roll(O.o)){const r=pgEffect(a,t,pk);if(a!==S)try{newsAdd(t,"poison",`${rkName(t)} ${t.name} lâm bệnh lạ sau khi dùng quà.`)}catch(x){}return `${by} sai người mang ${dn} sang tặng ${rkName(t)} ${t.name}. ${r}`}
 const c=caught(a,t,true,`bỏ ${PGX[pk].n.toLowerCase()} vào ${dn} tặng ${NM(t)}`);
 if(c){const q=queenP();const hq=q&&q!==a&&q!==t;if(hq)evA(q,a,BAL.pg.hhEv);return `${by} tặng ${NM(t)} ${dn} có độc. ${c}${hq?`Hoàng hậu nắm thêm ${BAL.pg.hhEv} chứng cứ. `:""}`}
 relAdd(t,a,BAL.eff.jpoison.pgGive);return `${NMc(t)} thấy ${dn} có vị lạ, sai đổ đi; từ đó dè chừng ${a===S?"ngươi":NM(a)} (quý ${a===S?"ngươi":NM(a)} ${balSg(BAL.eff.jpoison.pgGive)}). `}
/* her card: target × poison — kit options with the real odds word, full numbers, Vì sao (option.why) */
function pgLine(t,pk,X){/* previews: pgGive */const P=PGX[pk];const q=queenP();const hh=q&&q!==t&&q!==S?` · Hoàng hậu nắm thêm ${BAL.pg.hhEv} chứng cứ của ngươi`:"";
 return `${word(X.o)} · tốn: 2 khắc, ${P.n} -1, Đức -${P.duc} · thành: ${P.won} · hỏng: ${t.name} với ngươi ${balSg(BAL.eff.jpoison.pgGive)} vì nhận ra vị lạ · kèm: hỏng mà bị lần ra (khả năng ${chanceLo(X.cp)}): nàng nắm ${balAb(BAL.eff.j8.evCaught)} chứng cứ của ngươi${hh}`}
PEND.pgpick=p=>{const e=S.inv[p.ix];if(!e||!pgFood(e))return null;const dn=e.wk?e.wk.n:itm(e.k).n;const O=[];
 for(const t of liveRivals(true)){if(t.out)continue;for(const pk of pgHeld(S)){const P=PGX[pk];if(P.preg&&!(t.preg&&!t.hidden))continue;const X=pgOdds(S,t,e);
  O.push({n:`${P.n} vào ${dn} tặng ${rkName(t)} ${t.name}`,fx:{},x:pgLine(t,pk,X),o:X.o,base:BAL.pg.base,why:()=>pgOdds(S,t,e).F,
   go:()=>{spend(2);const i=S.inv.indexOf(e);const r=pgGive(S,t,i,pk);if(r)log(r)}})}}
 O.sort((x,y)=>y.o-x.o);O.push({n:"Thôi",fx:{}});
 return{t:`<p>Lén bỏ độc vào <b>${dn}</b> rồi tặng ai? Hoàng thượng và Thái hậu luôn có người nếm thử, không thể.</p><p class="past">Thành hay bại tùy: Tâm cơ của ngươi, người nhận tin ngươi đến đâu, món đồ khéo đến đâu; người nhận càng cảnh giác, có thái y tâm phúc, kim bạc thử độc hay cung nữ nếm trước thì càng khó.</p>`,o:O}};
try{KIT_ACT_PIDS.add("pgpick")}catch(e){}
/* her side when a dish comes in (poisoned or not) — arrives unbidden: event-choice rule (price + Cần + hint) */
PEND.pgin=p=>{const f=byKey(p.f);if(!f)return null;const P=p.pk?PGX[p.pk]:null;const nd=(S.inv||[]).findIndex(e=>e&&e.k==="kimbac"&&!e.h);const m=S.maid;
 const keep=()=>{if(p.e)S.inv.push(Object.assign({},p.e,{wk:p.e.wk?Object.assign({},p.e.wk,{from:p.f}):undefined}))};
 const hit=()=>{const r=pgEffect(f,S,p.pk);log(r);Q.push({t:"Trúng độc",who:pv(f),h:`<p class="r">${r}</p><p class="past">Món ${p.dn} của ${f.name}.</p>`})};
 const found=how=>{/*evok: poisoned gift act*/evA(S,f,BAL.eff.jpoison.evFound);relAdd(S,f,BAL.eff.jpoison.found);Q.push({t:"Phát hiện có độc",who:pv(f),h:`<p>${how}: ${p.dn} của ${f.name} có độc. Ngươi nắm ${balAb(BAL.eff.jpoison.evFound)} chứng cứ của nàng · ${f.name} quý ngươi ${balSg(BAL.eff.jpoison.found)}.</p>`});log(`${how}: ${p.dn} của ${f.name} có độc (chứng cứ ${balSg(BAL.eff.jpoison.evFound)}).`)};
 const clean=how=>{log(`${how}: ${p.dn} không có gì lạ.`);keep()};
 const O=[{n:"Nhận ngay",fx:{},x:`Khó lường · thành: cất vào rương · kèm: món có độc thì ngươi dùng phải, độc nặng thì mất mạng`,hint:"cất món vào rương; món có độc thì ta dùng phải, độc nặng thì mất mạng",risk:"liều",go:()=>{if(!P)return keep();if(roll(p.o))hit();else{log(`Ngươi thấy ${p.dn} có vị lạ, bỏ đi.`);relAdd(S,f,BAL.eff.jpoison.go)}}}];
 {const kb={n:"Thử bằng kim bạc",fx:{},x:`tốn: Kim bạc thử độc -1 · thành: biết món có độc hay không · có độc thì ngươi nắm ${balAb(BAL.eff.jpoison.evFound)} chứng cứ của nàng`,hint:"dùng hết một kim bạc; biết chắc món có độc hay không, có độc thì nắm chứng cứ",risk:"an toàn",go:()=>{S.inv.splice(nd,1);if(P)found("Kim bạc đen lại");else clean("Kim bạc không đổi màu")}};if(nd<0)kitOff(kb,kitWhyItem("kim bạc"),kitWhenItem());O.push(kb)}
 if(m){const om=cl(m.loyal||0,5,95);O.push({n:`Nhờ ${m.name} nếm trước`,fx:{},x:`${word(om)} · thành: biết món có độc hay không · có độc thì ngươi nắm ${balAb(BAL.eff.jpoison.evFound)} chứng cứ của nàng · hỏng: món có độc thì ${m.name} trúng độc · Lòng ${m.name} -${balAb(BAL.eff.jpoison.loyalGo)}`,hint:lv=>`biết món có độc hay không; ${lv>=1?`${m.name} càng trung thành càng tinh ý; `:""}món có độc thì ${m.name} có thể trúng độc`,risk:"có rủi ro",
  go:()=>{if(!P)return clean(`${m.name} nếm thử`);if(roll(om))found(`${m.name} nếm thấy lạ`);else{m.loyal=cl((m.loyal||0)-BAL.eff.jpoison.loyalGo,0,100);log(`${m.name} nếm phải độc, ngã bệnh.`);Q.push({t:"Cung nữ trúng độc",h:`<p class="r">${m.name} nếm ${p.dn} rồi ngã bệnh. Lòng -${balAb(BAL.eff.jpoison.loyalGo)}.</p>`})}}})}
 O.push({n:"Trả lại quà",fx:{},x:`thành: không động đến món ăn · kèm: ${f.name} với ngươi ${balSg(BAL.eff.jpoison.go_2)}`,hint:lv=>`không động đến món ăn; nhưng ${lv>=1?f.name:"người tặng"} phật ý`,risk:"an toàn",go:()=>relAdd(S,f,BAL.eff.jpoison.go_2)});
 return{who:pv(f),t:`<p>${f.name} sai người mang <b>${p.dn}</b> sang tặng ngươi.</p><p class="past">Đồ ăn của người khác: có thể thử trước bằng kim bạc hay nhờ cung nữ nếm.</p>`,o:O}};
/* every food gift that reaches her uses the same card, poisoned or not (no tell) */
(function(){const g0=PEND.giftin;PEND.giftin=function(p){try{if(p&&p.e&&pgFood(p.e)&&!p.e.t)return PEND.pgin({f:p.f,dn:iname(p.e),pk:null,o:0,e:p.e})}catch(x){console.error("pg in",x)}return g0.apply(this,arguments)}})();
/* the kit gift dialog (jgift giftDialog): one more row "Bỏ độc vào…" (kgg "all": shown in every recipient tab); j83's old Hạc đỉnh hồng rows go */
function pgRow(ix){return{n:"Bỏ độc vào…",fx:{},kgg:"all",kgift:"(chọn người nhận và thứ độc; không được với Hoàng thượng, Thái hậu)",
 go:()=>setTimeout(()=>{pushDil(mkP("pgpick",{ix}),"Bỏ độc vào quà");showModal()},0)}}
for(const k of ["giftpick","wkgive"])(function(k){const g0=PEND[k];if(!g0)return;PEND[k]=function(p){const d=g0.apply(this,arguments);try{if(d&&d.o&&p&&p.ix!=null&&p.v==null){
  d.o=d.o.filter(o=>!(o&&/^Lén bỏ Hạc đỉnh hồng/.test(o.n||"")));const e=S.inv[p.ix];
  if(e&&pgFood(e)&&pgHeld(S).length){const i=d.o.findIndex(o=>o&&(o.kgx||o.n==="Thôi"));d.o.splice(i<0?d.o.length:i,0,pgRow(p.ix))}}}catch(x){console.error("pg gift",x)}return d}})(k);
/* NPC act (same function): a malicious consort with a poison and a dish */
A("pgift","Tặng quà ăn có độc",{c:{},ok:(a,t)=>a!==t&&pgHeld(a).length>0&&(a.inv||[]).some(pgFood),o:(a,t)=>{const e=(a.inv||[]).find(pgFood);return e?pgOdds(a,t,e).o:5},x:"nàng trúng độc nếu ăn",
 why:(a,t)=>{const e=(a.inv||[]).find(pgFood);return e?pgOdds(a,t,e).F:[]},
 f:(a,t)=>{const ix=(a.inv||[]).findIndex(pgFood);const L=pgHeld(a).filter(k=>!PGX[k].preg||(t.preg&&!t.hidden));if(ix<0||!L.length)return"";return pgGive(a,t,ix,L.sort((x,y)=>PGX[y].duc-PGX[x].duc)[0])}});
try{ACTDOM.pgift="Mưu kế";J78VERB.pgift="tặng {t} quà ăn có độc";const G=RVGRP.find(x=>x[0]==="Sát hại");if(G&&!G[1].includes("pgift"))G[1].push("pgift");if(BANDS[3]&&!BANDS[3][2].includes("pgift"))BANDS[3][2].push("pgift");
 LACK.pgift=()=>!pgHeld(S).length?"cần một thứ độc (đồ cấm)":!(S.inv||[]).some(pgFood)?"cần một món ăn, túi hương hay đồ bổ để tặng":""}catch(e){}
(function(){if(typeof mindMenu!=="function")return;const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{if(Array.isArray(O)&&v!==S&&bandOf(danger(v,t))>=3&&ACT.pgift.ok(v,t)){const w=2*persW(v,"pgift");if(w>0)O.push(["pgift",w])}}catch(e){}return O}})();
/* NPCs cook too: a malicious NPC holding poison keeps a dish at hand (same rule as her: works come from practice) */
(function(){if(typeof npcMonthly!=="function")return;const m0=npcMonthly;npcMonthly=function(v){const r=m0.apply(this,arguments);try{if(v&&v.alive&&pgHeld(v).length&&!(v.inv||[]).some(pgFood)&&roll(30)){v.inv.push(wkMake(v,"mon",0,4))}}catch(e){}return r}})();
/* ---------- CHÂN TÌNH: a visible cause ---------- */
function gfFor(a,w,r){try{if(r==="emp")return wkEmpMatch(w).length>0;if(r==="th")return ["kinh","tranh","theu"].includes(w.kind);if(r&&typeof r==="object")return wkBestArt(r)===w.a}catch(e){}return false}
function gfBond(a,r){if(r==="emp")return[(a.an||0)|0,BAL.gift.an,"Ân tình"];if(r==="th")return[(a.th||0)|0,BAL.gift.th,"Thái hậu quý ngươi"];return[(rel(r,a)||0)|0,BAL.gift.rel,`${r.name} quý ngươi`]}
function gfSincere(a,w,r){const made=w.by===key(a)||(a===S&&w.bn==="ngươi");const fr=gfFor(a,w,r);const [b,need,lab]=gfBond(a,r);const ask=a.askAt&&a.askAt[r==="emp"||r==="th"?r:(r&&r.id)];const asked=ask!=null&&wk()-ask<BAL.gift.askW;
 const ok=made&&fr&&b>=need&&!asked;const who=r==="emp"?"ngài":r==="th"?"Thái hậu":"nàng";const have=[],miss=[];
 (made?have:miss).push(made?`tự tay làm cho ${who}`:"đồ tự tay làm");
 (fr?have:miss).push(fr?`hợp ý ${who}`:`làm đúng ý ${who}${r==="emp"?": món, hoa, nhạc ngài thích":r==="th"?": kinh, tranh, đồ thêu":(()=>{const k=wkBestArt(r);const A=k&&ARTS.find(x=>x.k===k);return A?`: nàng mê ${A.n}`:""})()}`);
 if(b>=need)have.push(`${lab} ${b} ≥ ${need}`);else miss.push(`${lab} từ ${need}, nay ${b}`);if(asked)miss.push(`đợi ${BAL.gift.askW} tuần sau khi nhờ việc`);
 let tr=0;try{if(r==="emp"&&(has("nhantu")||has("datinh")))tr=1;else if(r&&typeof r==="object"&&traitsOf(r).some(x=>x==="Ân cần"||x==="Khiêm nhường"))tr=1}catch(e){}
 const txt=ok?`Chân tình: đủ — ${have.join(", ")}${tr?", tính người nhận thêm +1":""}`:`Chân tình: chưa đủ — cần ${miss.join(" và ")}`;return{ok,have,miss,tr,txt}}
wkSincere=function(r){return r==="maid"};/* the old hidden trait check: off (the maid keeps j83's fixed bonus); wkEval below adds the visible one */
(function(){const e0=wkEval;wkEval=function(a,w,r){const ev=e0.apply(this,arguments);try{if(!ev||!ev.ok||r==="maid")return ev;const s=gfSincere(a,w,r);
  const add=s.ok?(r==="emp"?1:2)+(s.tr?1:0)+(BAL.wk.tinh[w.m||0]||0):0;
  if(add){ev.v=(ev.v||0)+add;if(ev.fx.sung!=null)ev.fx.sung+=Math.ceil(add/2);if(ev.fx.th!=null)ev.fx.th+=add;if(ev.rel!=null)ev.rel+=add;if(ev.fx.hh!=null)ev.fx.hh+=add}
  ev.notes=ev.notes.filter(n=>n!=="chân tình");if(s.ok)ev.notes.push("chân tình");ev.sincere=s}catch(x){console.error("sincere",x)}return ev}})();
/* the gift dialog line: the check per person in the kit Ghi chú row (a trailing "(…)" → Ghi chú) */
(function(){const g0=wkGainTxt;wkGainTxt=function(ev){const t=g0.apply(this,arguments);try{if(ev&&ev.sincere)return `${t}${t?" · ":""}(${ev.sincere.txt})`}catch(e){}return t}})();
/* the requests remembered (a gift right after is not chân tình): favour-asking acts */
(function(){const r0=runAct;runAct=function(a,t,k){try{if(["ally","xinhh","blockf","xin"].includes(k)&&a&&t){a.askAt=a.askAt||{};a.askAt[t.id]=wk()}}catch(e){}return r0.apply(this,arguments)}})();
try{KIT_GLOSS["Chân tình"]=`Quà thành chân tình khi đủ cả bốn: tự tay làm, làm đúng ý người nhận, đã đủ thân (với Hoàng thượng Ân tình từ ${BAL.gift.an}, Thái hậu quý ngươi từ ${BAL.gift.th}, phi tần quý ngươi từ ${BAL.gift.rel}), và không phải ngay sau khi vừa nhờ người ấy việc gì (đợi ${BAL.gift.askW} tuần). Chân tình làm quà nặng hơn: Hoàng thượng Sủng thêm, Thái hậu và phi tần quý thêm. Đồ mua bằng bạc không thành chân tình.`}catch(e){}
/* ---------- ÂN TÌNH ---------- */
try{KIT_GLOSS["Ân tình"]=`Tình nghĩa riêng giữa Hoàng thượng và ngươi. Có được: những đêm thị tẩm, lúc riêng tư bên ngài, dâng đồ Tuyệt phẩm tự tay làm. Dùng để: xin tha tội dễ thành, xin ngài ghé đêm, giữ được long thai, thư từ lãnh cung được ngài đọc. Mỗi tháng tự phai: không đêm nào gần ngài thì giảm 4, mỗi đêm trong tháng bớt được 2, ít nhất cũng giảm 1.`;if(typeof HX==="object")HX.an="Ân tình: "+KIT_GLOSS["Ân tình"].charAt(0).toLowerCase()+KIT_GLOSS["Ân tình"].slice(1)}catch(e){}
/* the Emperor card: Sủng + Ân tình as kit person-card chips (pcard lines "Label: value" + fbar → kitPcFix .kpbars → kitPcGrid kst-chip with its bar) */
(function(){if(typeof pcard!=="function")return;const p0=pcard;pcard=function(o){try{if(S&&o&&o.rank==="Hoàng thượng"&&!(typeof isSrv==="function"&&isSrv())){
  const L=(o.lines||[]).filter(l=>!(typeof l==="string"&&/Ân tình <b>/.test(l)));L.push(`Sủng: <b>${S.sung|0}</b>`,`Ân tình: <b>${S.an|0}</b>${fbar(S.an|0,0,100,true)}`);o=Object.assign({},o,{lines:L})}}catch(e){}return p0.call(this,o)}})();
window.pgOdds=pgOdds;window.pgGive=pgGive;window.gfSincere=gfSincere;
