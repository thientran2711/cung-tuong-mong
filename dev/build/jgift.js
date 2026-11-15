/* ================= jgift: QUÀ ĂN UỐNG CÓ THỂ BỎ ĐỘC · CHÂN TÌNH CÓ NGUYÊN CỚ · ÂN TÌNH (owner 15/11, review/poison-gift) — numbers in BAL.pg / BAL.gift =================
   1. POISONS (real items, bought by the existing đồ-cấm routes j83 WILL/IROUTE): Hạc đỉnh hồng (chết), Độc ngấm dần (Sức −25, ốm 3 tháng = the
      "Hạ độc dần" effect), Phấn hủy nhan (Sắc −8), Xạ hương (sảy thai, only a pregnant target), Mê dược (Sức −10, thẻ bài rút 1 tuần).
   2. Giving food / drink / a sachet — her own work (j83 kinds mon, huong) or a bought food (yến sào, nhân sâm, a giao) — adds "Bỏ độc vào…" when she
      holds a poison: one card per target × poison with Cần/Tốn/Được/Mất + odds word + Vì sao.
      Odds pgOdds(a, t, grade) = odA(a, BAL.pg.base + Tâm cơ/4 + target's thiện cảm toward her /4 (trust) + grade × BAL.pg.grade (a fine dish masks taste)
        − target's guard: her vigilance (oSee/3), a trusted thái y (BAL.pg.doctor), a silver needle (BAL.pg.needle), a loyal maid tasting (BAL.pg.maid)).
      Success: the effect. Failure: the dish is noticed; the existing caught() rules decide whether it is traced to her (evidence to the target, and to the
      Hoàng hậu: +1), else the target only throws it away (thiện cảm −). Đức −BAL.pg.duc for trying.
      Hoàng thượng and Thái hậu are NOT offered (a taster always checks; treason) — default, the owner may overrule (OWNER_DECISIONS).
   3. NPCs: the same act (pgift) — a malicious NPC holding a poison sends her (or another consort) a poisoned dish. When a dish reaches HER she gets a card:
      Ăn ngay · Thử bằng kim bạc (needs one) · Nhờ cung nữ nếm trước (her maid's loyalty decides, the maid may fall ill) · Trả lại.
   4. CHÂN TÌNH (replaces j83's hidden trait check): a real, visible cause — the work is HANDMADE by the giver AND made for this person (matches their
      taste / what they love) AND the bond is real (Ân tình ≥ BAL.gift.an for Hoàng thượng, thiện cảm ≥ BAL.gift.rel for others / Thái hậu quý ≥ BAL.gift.th)
      AND not right after asking them for something (BAL.gift.askW tuần). Traits only add a small visible +1. The give card shows it under "Vì sao"
      or what is missing. NPCs use the same rule.
   5. ÂN TÌNH: gloss (how it is earned, what it does, the existing monthly fade j8 anMonth) on the term and in the emperor card. */
Object.assign(BAL,{pg:{base:42,grade:6,doctor:15,needle:30,maid:12,duc:6,hhEv:1},gift:{an:30,rel:40,th:40,askW:2}});
/* ---------- poisons ---------- */
IT.docngam=IT.docngam||{n:"Độc ngấm dần",kd:"Độc dược",d:"Bỏ vào đồ ăn: Sức -25, ốm ba tháng · bị khám ra là có tội",pr:60,il:1,tg:[]};
IT.phanhuy=IT.phanhuy||{n:"Phấn hủy nhan",kd:"Độc dược",d:"Trộn vào đồ ăn, phấn sáp: Sắc -8 · bị khám ra là có tội",pr:45,il:1,tg:[]};
IT.meduoc=IT.meduoc||{n:"Mê dược",kd:"Độc dược",d:"Bỏ vào trà, rượu: mê man, Sức -10, lỡ một tuần thẻ bài · bị khám ra là có tội",pr:35,il:1,tg:[]};
IT.kimbac=IT.kimbac||{n:"Kim bạc thử độc",kd:"Tạp vật",d:"Cắm vào đồ ăn: kim đen là có độc",pr:15,rk:0,tg:["rv"]};
try{Object.assign(WILL,{docngam:{eff:"Sức -25, ốm ba tháng",tr:"khó lần ra: độc ngấm chậm"},phanhuy:{eff:"Sắc -8",tr:"vừa: mặt nổi mẩn, thái y đoán được"},meduoc:{eff:"mê man, Sức -10, lỡ thẻ bài một tuần",tr:"dễ lần ra: ngủ li bì, ai cũng ngờ"}});
 for(const r of ["maid","cho"])if(IROUTE[r])for(const k of ["docngam","phanhuy","meduoc"])if(!IROUTE[r].ks.includes(k))IROUTE[r].ks.push(k);
 if(!SHOP_ALL.includes("kimbac"))SHOP_ALL.push("kimbac")}catch(e){}
const PGX={hacdinh:{n:"Hạc đỉnh hồng",fx:"nàng trúng độc, thường là chết",num:"nàng Sức -120",duc:10},docngam:{n:"Độc ngấm dần",fx:"nàng ốm ba tháng, sức yếu hẳn",num:"nàng Sức -25",duc:6},
 phanhuy:{n:"Phấn hủy nhan",fx:"nàng nổi mẩn, nhan sắc tàn đi",num:"nàng Sắc -8",duc:5},xahuong:{n:"Xạ hương",fx:"nàng sảy thai",num:"nàng Sức -25",duc:10,preg:1},meduoc:{n:"Mê dược",fx:"nàng mê man, lỡ thẻ bài một tuần",num:"nàng Sức -10",duc:3}};
const PGX_FOOD=["yensao","nhansam","agiao"];
function pgFood(e){return !!e&&!e.h&&(e.wk?["mon","huong"].includes(e.wk.kind):PGX_FOOD.includes(e.k))}
function pgHeld(a){return Object.keys(PGX).filter(k=>(a.inv||[]).some(e=>e&&e.k===k&&!e.h))}
function pgGrade(e){return e&&e.wk?(e.wk.ti|0):e&&IT[e.k]?Math.min(3,Math.floor((IT[e.k].pr||0)/25)):0}
function pgGuard(t){const L=[];let g=0;const v=Math.round(oSee(t,true)/3);g+=v;L.push(`nàng cảnh giác −${v}`);if(t.doctor){g+=BAL.pg.doctor;L.push(`thái y tâm phúc −${BAL.pg.doctor}`)}
 if((t.inv||[]).some(e=>e&&e.k==="kimbac"&&!e.h)){g+=BAL.pg.needle;L.push(`kim bạc thử độc −${BAL.pg.needle}`)}if(t.maid&&(t.maid.loyal||0)>=70){g+=BAL.pg.maid;L.push(`cung nữ trung thành nếm trước −${BAL.pg.maid}`)}return{g,L}}
function pgOdds(a,t,e){const G=pgGuard(t);const tr=Math.round((t===S?(rel(t,a)||0):rel(t,a))/4),tc=Math.round((a.tamco||0)/4),gr=pgGrade(e)*BAL.pg.grade;
 const o=cl(Math.round(odA(a,BAL.pg.base+tc+tr+gr-G.g)),3,92);const why=[`Tâm cơ +${tc}`,`nàng ${tr>=0?"tin":"ngờ"} ngươi ${tr>=0?"+":""}${tr}`,gr?`món khéo che vị +${gr}`:"món thường +0"].concat(G.L);return{o,why}}
function pgEffect(a,t,pk){const nm=t===S?"Ngươi":`${rkName(t)} ${t.name}`;
 if(pk==="hacdinh"){if(t===S){die("Trúng độc, không qua khỏi");return `<span class="r">Ngươi trúng độc.</span> `}ap(t,{suc:-120});try{dieIf(t,"Trúng độc, không qua khỏi")}catch(e){}return `<span class="r">${nm} trúng độc nặng.</span> `}
 if(pk==="docngam"){ap(t,{suc:-25});t.sick=Math.max(t.sick||0,3);return `${nm} ăn xong thì người mệt dần, thái y bảo trúng hàn khí (Sức -25, ốm ba tháng). `}
 if(pk==="phanhuy"){ap(t,{sac:-8});return `${nm} nổi mẩn khắp mặt (Sắc -8). `}
 if(pk==="xahuong"){if(t.preg&&!t.fake){t.preg=0;t.hidden=false;ap(t,{suc:-25});return `<span class="r">${nm} động thai, sảy mất đứa bé.</span> `}return `${nm} dùng xong không sao. `}
 if(pk==="meduoc"){ap(t,{suc:-10});t.block=Math.max(t.block||0,1);return `${nm} ngủ li bì cả ngày, lỡ thẻ bài tuần này (Sức -10). `}return""}
/* the one act: same function for her and every NPC */
function pgGive(a,t,ix,pk){const e=a.inv[ix];if(!e||!pgFood(e)||!PGX[pk])return"";const pi=a.inv.findIndex(x=>x&&x.k===pk&&!x.h);if(pi<0)return"";
 const by=a===S?"Ngươi":`${rkName(a)} ${a.name}`,dn=e.wk?e.wk.n:IT[e.k].n;const O=pgOdds(a,t,e);
 a.inv.splice(Math.max(ix,pi),1);a.inv.splice(Math.min(ix,pi),1);a.schemes=(a.schemes||0)+1;if(typeof ducAdd==="function")ducAdd(a,-PGX[pk].duc,"bỏ độc vào quà");else ap(a,{duc:-PGX[pk].duc});
 if(t===S){pushDil(mkP("pgin",{f:key(a),dn,pk,o:O.o,e:Object.assign({},e)}),"Quà tặng");return ""}
 if(roll(O.o)){const r=pgEffect(a,t,pk);if(a!==S)try{newsAdd(t,"poison",`${rkName(t)} ${t.name} lâm bệnh lạ sau khi dùng quà.`)}catch(x){}return `${by} sai người mang ${dn} sang tặng ${rkName(t)} ${t.name}. ${r}`}
 const c=caught(a,t,true,`bỏ ${PGX[pk].n.toLowerCase()} vào ${dn} tặng ${NM(t)}`);if(c){const q=queenP();if(q&&q!==a)evA(q,a,BAL.pg.hhEv);return `${by} tặng ${NM(t)} ${dn} có độc. ${c}`}
 relAdd(t,a,-6);return `${NMc(t)} thấy ${dn} có vị lạ, sai đổ đi; từ đó dè chừng ${a===S?"ngươi":NM(a)}. `}
/* her card: pick target × poison */
PEND.pgpick=p=>{const e=S.inv[p.ix];if(!e||!pgFood(e))return null;const dn=e.wk?e.wk.n:IT[e.k].n;const O=[];
 for(const t of liveRivals(true)){if(t.out)continue;for(const pk of pgHeld(S)){const P=PGX[pk];if(P.preg&&!(t.preg&&!t.hidden))continue;const X=pgOdds(S,t,e);
  O.push({n:`${P.n} vào ${dn} tặng ${rkName(t)} ${t.name}`,fx:{},x:`${word(X.o)} · tốn: 2 khắc, 1 ${P.n} · thành: ${P.fx} · hỏng: bị phát giác thì lần ra ngươi, nàng và Hoàng hậu nắm chứng cứ · kèm: Đức -${P.duc} · (${P.num}) · (vì sao: ${X.why.join(", ")})`,
   go:()=>{spend(2);const i=S.inv.indexOf(e);const r=pgGive(S,t,i,pk);if(r)log(r)}})}}
 O.push({n:"Thôi",fx:{}});
 return{t:`<p>Lén bỏ độc vào <b>${dn}</b> rồi tặng ai? Hoàng thượng và Thái hậu luôn có người nếm thử, không thể.</p><p class="past">Khả năng theo: Tâm cơ của ngươi, nàng tin ngươi đến đâu, món khéo đến đâu; trừ đi: nàng cảnh giác, thái y tâm phúc, kim bạc, cung nữ nếm trước.</p>`,o:O}};
/* her side when a dish comes in (poisoned or not) */
PEND.pgin=p=>{const f=byKey(p.f);if(!f)return null;const P=p.pk?PGX[p.pk]:null;const nd=(S.inv||[]).findIndex(e=>e&&e.k==="kimbac"&&!e.h);const m=S.maid;
 const keep=()=>{if(p.e)S.inv.push(Object.assign({},p.e,{wk:p.e.wk?Object.assign({},p.e.wk,{from:p.f}):undefined}))};
 const hit=()=>{const r=pgEffect(f,S,p.pk);log(r);Q.push({t:"Trúng độc",who:pv(f),h:`<p class="r">${r}</p><p class="past">Món ${p.dn} của ${f.name}.</p>`})};
 const found=how=>{evA(S,f,2);relAdd(S,f,-15);Q.push({t:"Phát hiện có độc",who:pv(f),h:`<p>${how}: ${p.dn} của ${f.name} có độc. Ngươi nắm 2 chứng cứ của nàng.</p>`});log(`${how}: ${p.dn} của ${f.name} có độc (chứng cứ +2).`)};
 const clean=how=>{log(`${how}: ${p.dn} không có gì lạ.`);keep()};
 const O=[{n:"Nhận ngay",fx:{},x:`Khó lường · thành: cất vào rương, nàng thấy ngươi tin nàng · hỏng: món có độc thì ngươi dùng phải`,go:()=>{if(!P)return keep();if(roll(p.o))hit();else{log(`Ngươi thấy ${p.dn} có vị lạ, bỏ đi.`);relAdd(S,f,-4)}}}];
 if(nd>=0)O.push({n:"Thử bằng kim bạc",fx:{},x:`${word(98)} · tốn: 1 Kim bạc thử độc · thành: biết món có độc hay không; có độc thì nắm 2 chứng cứ của nàng`,go:()=>{S.inv.splice(nd,1);if(P)found("Kim bạc đen lại");else clean("Kim bạc không đổi màu")}});
 if(m)O.push({n:`Nhờ ${m.name} nếm trước`,fx:{},x:`${word(cl(m.loyal||0,5,95))} · thành: biết món có độc hay không; có độc thì nắm 2 chứng cứ của nàng · hỏng: ${m.name} nếm phải độc, Lòng -10`,go:()=>{if(!P)return clean(`${m.name} nếm thử`);if(roll(cl(m.loyal||0,5,95)))found(`${m.name} nếm thấy lạ`);else{m.loyal=cl((m.loyal||0)-10,0,100);log(`${m.name} nếm phải độc, ngã bệnh.`);Q.push({t:"Cung nữ trúng độc",h:`<p class="r">${m.name} nếm ${p.dn} rồi ngã bệnh. Lòng -10.</p>`})}}});
 O.push({n:"Trả lại quà",fx:{},x:"thành: không động đến món ăn · kèm: nàng phật ý, thiện cảm -4",go:()=>relAdd(S,f,-4)});
 return{who:pv(f),t:`<p>${f.name} sai người mang <b>${p.dn}</b> sang tặng ngươi.</p><p class="past">Đồ ăn của người khác: có thể thử trước bằng kim bạc hay nhờ cung nữ nếm.</p>`,o:O}};
/* every food gift that reaches her uses the same card, poisoned or not (no tell) */
(function(){const g0=PEND.giftin;PEND.giftin=function(p){try{if(p&&p.e&&pgFood(p.e)&&!p.e.t)return PEND.pgin({f:p.f,dn:iname(p.e),pk:null,o:0,e:p.e})}catch(x){console.error("pg in",x)}return g0.apply(this,arguments)}})();
/* the give cards: one more option when she can */
function gfMeter(a,w){const L=[];try{for(const [id,n] of wkTargets(a)){const r=wkTgt(id);if(!r||r==="maid")continue;const ev=wkEval(a,w,r);if(!ev||!ev.ok)continue;const s=gfSincere(a,w,r);
  L.push(`<div class="gfm ${s.ok?"ok":"no"}"><b>${s.ok?"✓":"✗"} ${n}</b> <span>${s.txt.replace(/^Chân tình: /,"")}</span></div>`)}}catch(e){}
 return L.length?`<div class="gfmeter"><div class="gfmh">${kitGloss("Chân tình","Chân tình")} với từng người <small>(tự tay làm · hợp ý · đủ thân · không ngay sau khi nhờ việc)</small></div>${L.join("")}</div>`:""}
try{KIT_GLOSS["Chân tình"]=`Quà thành chân tình khi đủ cả bốn: tự tay làm, làm đúng ý người nhận, đã đủ thân (với Hoàng thượng Ân tình từ ${BAL.gift.an}, Thái hậu quý ngươi từ ${BAL.gift.th}, phi tần quý ngươi từ ${BAL.gift.rel}), và không phải ngay sau khi vừa nhờ người ấy việc gì (đợi ${BAL.gift.askW} tuần). Chân tình làm quà nặng hơn: Hoàng thượng Sủng thêm, Thái hậu và phi tần quý thêm. Tính nết hiền hậu của người nhận thêm một chút.`}catch(e){}
(function(){const st=document.createElement("style");st.textContent=`.gfmeter{margin:6px 0;padding:6px 8px;border:1px solid var(--k-hair,#e6d3ac);border-radius:8px;background:rgba(255,250,240,.7);font-size:.8rem;line-height:1.35}.gfmh{font-weight:700;margin-bottom:3px}.gfmh small{font-weight:400;color:var(--dim)}.gfm{margin:2px 0}.gfm.ok b{color:#2f7a3a}.gfm.no b{color:#a0442c}`;document.head.appendChild(st)})();
(function(){const g0=PEND.wkgive;PEND.wkgive=function(p){const d=g0.apply(this,arguments);try{const e0=S.inv[p.ix];if(d&&e0&&e0.wk){d.t=d.t.replace(/Đồ tự tay làm được thêm chân tình với người hiền hậu, thêm hợp ý khi trúng sở thích\./,"Đồ tự tay làm có thể thành chân tình, xem từng người bên dưới.");d.t=d.t.replace(/<\/p>/,"</p>"+gfMeter(S,e0.wk))}}catch(x){console.error("gf meter",x)}try{const e=S.inv[p.ix];if(d&&e&&pgFood(e)){d.o=d.o.filter(o=>!/Lén bỏ Hạc đỉnh hồng/.test(o.n));if(pgHeld(S).length){const i=d.o.findIndex(o=>o.n==="Thôi");d.o.splice(i<0?d.o.length:i,0,{n:"Bỏ độc vào…",fx:{},x:"chọn người và thứ độc (không được với Hoàng thượng, Thái hậu)",go:()=>setTimeout(()=>{pushDil(mkP("pgpick",{ix:p.ix}),"Bỏ độc vào quà");showModal()},0)})}}}catch(x){console.error("pg wk",x)}return d}})();
(function(){const g0=PEND.giftpick;PEND.giftpick=function(p){const d=g0.apply(this,arguments);try{const ix=p.ix!=null?p.ix:-1;const e=S.inv[ix];if(d&&e&&pgFood(e)&&pgHeld(S).length&&d.o){const i=d.o.findIndex(o=>o.n==="Thôi");d.o.splice(i<0?d.o.length:i,0,{n:"Bỏ độc vào…",fx:{},x:"chọn người và thứ độc (không được với Hoàng thượng, Thái hậu)",go:()=>setTimeout(()=>{pushDil(mkP("pgpick",{ix}),"Bỏ độc vào quà");showModal()},0)})}}catch(x){console.error("pg gift",x)}return d}})();
/* NPC act (same function): a malicious consort with a poison and a dish */
A("pgift","Tặng quà ăn có độc",{c:{},ok:(a,t)=>a!==t&&pgHeld(a).length>0&&(a.inv||[]).some(pgFood),o:(a,t)=>{const e=(a.inv||[]).find(pgFood);return e?pgOdds(a,t,e).o:5},x:"nàng trúng độc nếu ăn",
 f:(a,t)=>{const ix=(a.inv||[]).findIndex(pgFood);const L=pgHeld(a).filter(k=>!PGX[k].preg||(t.preg&&!t.hidden));if(ix<0||!L.length)return"";return pgGive(a,t,ix,L.sort((x,y)=>PGX[y].duc-PGX[x].duc)[0])}});
try{ACTDOM.pgift="Mưu kế";J78VERB.pgift="tặng {t} quà ăn có độc";const G=RVGRP.find(x=>x[0]==="Sát hại");if(G&&!G[1].includes("pgift"))G[1].push("pgift");if(BANDS[3]&&!BANDS[3][2].includes("pgift"))BANDS[3][2].push("pgift");
 LACK.pgift=()=>!pgHeld(S).length?"cần một thứ độc (đồ cấm)":!(S.inv||[]).some(pgFood)?"cần một món ăn, túi hương hay đồ bổ để tặng":""}catch(e){}
(function(){if(typeof mindMenu!=="function")return;const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{if(Array.isArray(O)&&v!==S&&bandOf(danger(v,t))>=3&&ACT.pgift.ok(v,t)){const w=2*persW(v,"pgift");if(w>0)O.push(["pgift",w])}}catch(e){}return O}})();
/* NPCs cook too: a malicious NPC holding poison keeps a dish at hand (same rule as her: works come from practice) */
(function(){if(typeof npcMonthly!=="function")return;const m0=npcMonthly;npcMonthly=function(v){const r=m0.apply(this,arguments);try{if(v&&v.alive&&pgHeld(v).length&&!(v.inv||[]).some(pgFood)&&roll(30)){v.inv.push(wkMake(v,"mon",0,4))}}catch(e){}return r}})();
/* ---------- CHÂN TÌNH: a visible cause ---------- */
function gfFor(a,w,r){try{if(r==="emp")return wkEmpMatch(w).length>0;if(r==="th")return ["kinh","tranh","theu"].includes(w.kind);if(r&&typeof r==="object")return wkBestArt(r)===w.a}catch(e){}return false}
function gfBond(a,r){if(r==="emp")return[(a===S?(S.an||0):(a.an||0)),BAL.gift.an,"Ân tình"];if(r==="th")return[(a===S?(S.th||0):(a.th||0)),BAL.gift.th,"Thái hậu quý ngươi"];if(r==="maid")return[(a.maid&&a.maid.loyal)||0,40,"Lòng"];return[rel(r,a)||0,BAL.gift.rel,"nàng quý ngươi"]}
function gfSincere(a,w,r){const made=w.by===key(a);const fr=gfFor(a,w,r);const [b,need,lab]=gfBond(a,r);const ask=a.askAt&&a.askAt[r==="emp"||r==="th"?r:(r&&r.id)];const asked=ask!=null&&wk()-ask<BAL.gift.askW;
 const ok=made&&fr&&b>=need&&!asked;const who=r==="emp"?"ngài":r==="th"?"Thái hậu":"nàng";const have=[],miss=[];
 (made?have:miss).push(made?`tự tay làm cho ${who}`:"đồ tự tay làm");(fr?have:miss).push(fr?`hợp ý ${who}`:`làm đúng ý ${who}${r==="emp"?": món, hoa, nhạc ngài thích":r==="th"?": kinh, tranh, đồ thêu":(()=>{const k=wkBestArt(r);const A=k&&ARTS.find(x=>x.k===k);return A?`: nàng mê ${A.n}`:": tài nghệ nàng mê"})()}`);
 if(b>=need)have.push(`${lab} ${b} ≥ ${need}`);else miss.push(`${lab} ${need}, đang ${b}`);if(asked)miss.push(`đợi ${BAL.gift.askW} tuần sau khi nhờ việc, kẻo như quà đáp lễ`);
 let tr=0;try{if(r==="emp"&&(has("nhantu")||has("datinh")))tr=1;else if(r&&typeof r==="object"&&traitsOf(r).some(x=>x==="Hiền lành"||x==="Nhu mì"))tr=1}catch(e){}
 const txt=ok?`Chân tình: đủ — ${have.join(", ")}${tr?", tính người nhận thêm +1":""}`:`Chân tình: chưa đủ — cần ${miss.join(" · ")}`;return{ok,have,miss,tr,txt,why:ok?have:miss}}
wkSincere=function(){return false};/* the old hidden check: off; wkEval below adds the visible one */
(function(){const e0=wkEval;wkEval=function(a,w,r){const ev=e0.apply(this,arguments);try{if(!ev||!ev.ok||r==="maid")return ev;const s=gfSincere(a,w,r);const add=(s.ok?(r==="emp"?1:2):0)+(s.ok&&s.tr?1:0);
  if(add){ev.v=(ev.v||0)+add;if(ev.fx.sung!=null)ev.fx.sung+=Math.ceil(add/2);if(ev.fx.th!=null)ev.fx.th+=add;if(ev.fx.maid!=null)ev.fx.maid+=add*2;if(ev.rel!=null)ev.rel+=add}
  ev.notes=ev.notes.filter(n=>n!=="chân tình");ev.notes.push(`(Chân tình ${s.ok?"đủ":"chưa đủ"})`);ev.sincere=s}catch(x){console.error("sincere",x)}return ev}})();
/* bought gifts: say plainly they can never be chân tình */
(function(){const g0=PEND.giftpick;PEND.giftpick=function(p){const d=g0.apply(this,arguments);try{if(d&&d.o&&p.v==null)d.o.forEach(o=>{if(o.n!=="Thôi"&&!/Bỏ độc/.test(o.n)&&!/^\(Chân tình/.test(o.x||""))o.x=(o.x?o.x+" · ":"")+"(Chân tình: không, đồ mua bằng bạc; chỉ đồ tự tay làm mới thành chân tình)"})}catch(x){}return d}})();
/* requests remembered (so a gift right after is not chân tình): favour-asking acts */
(function(){const r0=runAct;runAct=function(a,t,k){try{if(["ally","xinhh","blockf","xin"].includes(k)&&a&&t){a.askAt=a.askAt||{};a.askAt[t.id]=wk()}}catch(e){}return r0.apply(this,arguments)}})();
/* ---------- ÂN TÌNH ---------- */
try{KIT_GLOSS["Ân tình"]=`Tình nghĩa riêng giữa Hoàng thượng và ngươi. Có được: những đêm thị tẩm, lúc riêng tư bên ngài, dâng đồ Tuyệt phẩm tự tay làm. Dùng để: xin tha tội dễ thành, xin ngài ghé đêm, giữ được long thai, thư từ lãnh cung được ngài đọc. Mỗi tháng tự phai: không đêm nào gần ngài thì giảm 4, mỗi đêm trong tháng bớt được 2, ít nhất cũng giảm 1.`;if(typeof HX==="object")HX.an="Ân tình: "+KIT_GLOSS["Ân tình"].charAt(0).toLowerCase()+KIT_GLOSS["Ân tình"].slice(1)}catch(e){}
function anBar(){const a=S.an|0,g=S.sung|0;const row=(k,lab,v)=>`<div class="kr3b"><span class="kr3k">${kitGloss(k,lab)}</span><span class="kr3v"><span class="ef g">${v}</span>${fbar(v,0,100,true)}</span></div>`;return row("Sủng","Sủng",g)+row("Ân tình","Ân tình",a)}
(function(){if(typeof pcard!=="function")return;const p0=pcard;pcard=function(o){try{if(S&&o&&o.rank==="Hoàng thượng"&&!(typeof isSrv==="function"&&isSrv())){
  o=Object.assign({},o,{lines:(o.lines||[]).map(l=>typeof l==="string"&&/Ân tình <b>/.test(l)?"":l),groups:[["Ngài với ngươi",[anBar()]]].concat(o.groups||[])})}}catch(e){}return p0.call(this,o)}})();
/* her own status: an Ân tình cell (bar + number) beside Sủng in the top bar */
function anHud(){try{if(!S)return;let c=document.getElementById("hud-an");const sg=document.getElementById("hud-sung");if(!sg)return;
 if(!c){sg.insertAdjacentHTML("afterend",kitStatCell(null,"Ân tình","",{id:"hud-an",k:"an",bar:0,title:"Ân tình"}));c=document.getElementById("hud-an");
  c.addEventListener("click",e=>{e.stopPropagation();if(Q.length||!S||S.dead)return;Q.unshift({t:`Ân tình ${S.an|0}`,h:`<p>${HX.an||KIT_GLOSS["Ân tình"]}</p>`});showModal()})}
 c.hidden=typeof isSrv==="function"&&isSrv();kitStatSet(c,S.an|0,{bar:S.an|0,title:`Ân tình ${S.an|0} · chạm để xem`})}catch(e){}}
(function(){const r0=renderHUD;renderHUD=function(){const r=r0.apply(this,arguments);anHud();return r}})();
/* monthly decay already exists (j8 anMonth, every consort): −4 a month, −2 less per night that month, at least −1 — the gloss states it */
/* these are her own act choices, not blind events: show Được/Mất/odds (kit option.showOut) */
for(const k of ["pgpick","pgin","wkgive","giftpick"])(function(k){const g0=PEND[k];if(!g0)return;PEND[k]=function(){const d=g0.apply(this,arguments);try{if(d&&d.o)d.o.forEach(o=>{if(o)o.showOut=true})}catch(e){}return d}})(k);
window.pgOdds=pgOdds;window.pgGive=pgGive;window.gfSincere=gfSincere;
