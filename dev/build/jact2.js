/* ================= jact2: ACT SPLIT waves 2 + 3 (owner-approved split 16/11: Hành sự = VIỆC, Hậu cung = AI, Dư đồ = ĐI ĐÂU; review/act-split-w2) =================
   Loaded right after jact.js. Wraps only. Before/after table: dev/review/act-split-w2.md. Numbers: BAL.ad (jbal2.js).
   WAVE 2 (festivals, outings). A festival day used to bring up to THREE dialogs for one festival: the j71 festival dialog (contests, wagers,
   feast, offering, rite; fixed day), the j31 FESTEV "light event" (7 festivals, pushed at the start of the day) and the j7 random month event
   (5 festivals, any tuần of that month). ONE HOME each:
   - the j71 festival dialog stays THE festival dialog of the day (unchanged);
   - the light acts of a festival (j31 FESTEV + the j7 festival events, same options, same numbers) live at the festival's PLACE on Dư đồ:
     on the festival day that place carries the "!" (kitHapMark) and is open to her for the day (the court gathers there); arriving there opens
     the light acts, once per festival per year. The outings with the Emperor (Xin theo hầu lễ tế, Theo ngài lên núi, Xin về tảo mộ,
     Xin thử một mũi tên) are among these acts, so they move with them;
   - an option that is the same act as this year's j71 festival dialog (câu đối, đố đèn, đàn, bắn cung, cược, cháo, thơ, thêu, bánh, dâng lễ)
     is left out of the light acts that day (the contest is its home);
   - "Thả đèn cầu con" (FESTEV Nguyên tiêu) is the same act as the Hành sự card "Thả đèn hoa đăng" → it becomes that card's wish "Cầu con"
     (same cost Bạc -10, same effect).
   WAVE 3 (night = the last buổi).
   - "Lẻn vào" (the locked-place card, j41/j77) is the one home of sneaking; at night it uses the same odds + BAL.ad.nightSneak (fewer guards)
     and, if caught, the same penalty + BAL.ad.nightCaught Danh (a gain and a loss). Same rule for anyone who sneaks.
   - Night-only happening "Tiếng khóc ở Trường Môn viện": the fallen consort's call (j7 coldvisit, whose text happens AT the cold palace)
     leaves the random event pool and fires when she goes to Trường Môn viện at night (same options, same numbers, same 12-month rest).
   - "Nghe lén câu chuyện" was on EVERY consort's pop-up at a place (one copy per person) and is the same act as the "!" Nghe lỏm chuyện:
     one door per place per buổi (doing one greys the others).
   Co-op: S.adFest / S.adDoor are her personal state; S.festDone (world key) is set exactly as before; no world agency. Old saves fill lazily. */
const AD2=BAL.ad;
function as2Night(){try{return S&&(S.buoi||0)>=BUOI.length-1}catch(e){return false}}
/* ---------- WAVE 2: festivals ---------- */
const AS_FPLACE={newyear:"thu",giaothua:"thu",trungcuu:"thu",dongchi:"thu",nguyentieu:"vuon",trungthu:"vuon",phoenix:"vuon",doanngo:"vuon",
 thanhminh:"tn",thanhtho:"tn",lapbat:"cnh",vulan:"cnh"};
const AS_J7F={doanngo:"doanngo",trungcuu:"trungcuu",vulan:"vulan",dongchi:"dongchi",thanhtho:"thbirthday"};
/* the j31 light events leave the day-start queue: kept here, fired at the place */
const AS_LIGHT={};try{if(typeof FESTEV==="object")for(const k of Object.keys(FESTEV)){AS_LIGHT[k]=FESTEV[k];delete FESTEV[k]}}catch(e){}
/* the j7 festival events (and the cold-palace call, wave 3) leave the random weekly pool; PEND keeps them so a pending one in an old save loads */
const AS_J7OUT=new Set([...Object.values(AS_J7F),"coldvisit"]);
if(typeof freshEvents==="function"){const f0=freshEvents;freshEvents=function(){const L=f0.apply(this,arguments);try{if(!adSrv())return L.filter(e=>!AS_J7OUT.has(e.id))}catch(e){}return L}}
/* S.festDone (j52 Phúc duyên "dự lễ", co-op world key) is still set at the start of the festival day, as j31 did */
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead&&!S.out){const f=festToday();const key=f&&`${S.year}-${f.k}`;if(f&&AS_LIGHT[f.k]&&S.festDone!==key){S.festDone=key;log(`${f.name}.`)}}}catch(e){console.error("jact2 fest",e)}return r}})();
/* this year's j71 festival dialog (its title tells which act it is) */
if(typeof fDay7==="function"){const d0=fDay7;fDay7=function(k){const m=d0.apply(this,arguments);try{if(m&&S)S.adF71={y:S.year,k,t:String(m.t||"")}}catch(e){}return m}}
const AS_SAME=[[/câu đối/i,/câu đối/i],[/đố đèn/i,/đố đèn/i],[/khúc đàn/i,/Thi đàn/i],[/mũi tên/i,/bắn/i],[/Đặt cược/i,/Đặt cược/i],[/nấu cháo/i,/cháo/i],
 [/Làm thơ/i,/Thi thơ/i],[/thêu/i,/thêu/i],[/^(Dâng bánh|Gói bánh)/i,/bánh/i],[/^(Dâng ngọc|Lễ mọn)/i,/Dâng lễ/i]];
function asSameAsJ71(k,name){const F=S.adF71;if(!F||F.y!==S.year||F.k!==k)return false;return AS_SAME.some(([a,b])=>a.test(name)&&b.test(F.t))}
function asFestToday(){try{const f=festToday();return f&&AS_FPLACE[f.k]&&(AS_LIGHT[f.k]||AS_J7F[f.k])?f:null}catch(e){return null}}
function asFestDone(k){return !!(S.adFest&&S.adFest[k]===S.year)}
/* the festival place is open to her on the festival day until she has been (the court gathers there) */
if(typeof ACC_ROLE!=="undefined"&&Array.isArray(ACC_ROLE))ACC_ROLE.unshift((p,k)=>{if(p!==S||adSrv())return null;const f=asFestToday();return f&&AS_FPLACE[f.k]===k&&!asFestDone(f.k)?{ok:true,fest:1}:null});
AD_HAP_FIX.push(()=>{const f=asFestToday();if(!f||asFestDone(f.k)||S.confined)return null;return{k:AS_FPLACE[f.k],id:"fest",x:f.k}});
AD_HAP_T.fest="Ngày hội";
/* a light event keeps at least 2 options: when the left-out acts leave one, the plain "watch and go back" (no gain, no loss) is added */
const AS_WATCH={n:"Đứng xem rồi về",fx:{},x:"không được không mất"};
function asLightOpts(k,O){const O2=(O||[]).filter(o=>o&&!asSameAsJ71(k,o.n));if(O2.length<2&&!O2.some(o=>o.n===AS_WATCH.n))O2.push(Object.assign({},AS_WATCH));return O2}
AD_HAP_FIRE.fest=(h)=>{const k=h.x,f=festToday();if(!f||f.k!==k||asFestDone(k))return false;S.adFest=S.adFest||{};S.adFest[k]=S.year;let fired=false;
 if(AS_LIGHT[k]){const m=Object.assign({who:pEmp(),ev:"fest",evId:"fest:"+k,headArt:{src:`img/ev-fest-${k}-b.webp`,label:f.name}},AS_LIGHT[k]());
  m.opts=asLightOpts(k,(m.opts||[]).filter(o=>!(k==="nguyentieu"&&o.n==="Thả đèn cầu con")));Q.push(m);fired=true}
 const j=AS_J7F[k];if(j&&EVI[j]){try{if(EVI[j].ok()){const d=mkEv(j);if(d){d.o=asLightOpts(k,d.o);pushDil(d,f.name);fired=true}}}catch(e){console.error(e)}}
 return fired};
/* "Thả đèn cầu con" → the Hành sự card "Thả đèn hoa đăng" (jts), wish "Cầu con" on the Nguyên tiêu night (the card already costs Bạc -10) */
if(typeof tsPanel==="function"&&typeof tsOpt==="function"){const p0=tsPanel;tsPanel=function(o){try{const f=festToday();if(o&&Array.isArray(o.opts)&&f&&f.k==="nguyentieu"&&/: thả đèn$/.test(o.t||"")&&!o.opts.some(x=>x&&x.n==="Cầu con"))
  o.opts.splice(Math.max(0,o.opts.length-1),0,tsOpt({n:"Cầu con",duoc:["dễ có thai thêm một tháng"],go:()=>{S.fert=Math.max(S.fert||0,1);log(`Đêm ${f.name}, ngươi thả đèn cầu con.`)}}))}catch(e){console.error("jact2 den",e)}return p0.apply(this,arguments)}}
/* ---------- WAVE 3: the night ---------- */
/* sneaking at night: fewer guards (odds + nightSneak), heavier if caught (Danh + nightCaught) */
if(typeof accSneakO==="function"){const o0=accSneakO;accSneakO=function(k,a){const o=o0.apply(this,arguments);try{if(as2Night())return oddsCl(o+AD2.nightSneak)}catch(e){}return o}}
if(typeof accSneakPen==="function"){const p0=accSneakPen;accSneakPen=function(k){const P=p0.apply(this,arguments);try{if(as2Night()&&P){const d=P.danh+AD2.nightCaught;return Object.assign({},P,{danh:d,txt:String(P.txt||"").replace(/Danh -\d+/,`Danh ${d}`)+" (bắt giữa đêm, tội nặng thêm)"})}}catch(e){}return P}}
if(typeof accSneakLine==="function"){const l0=accSneakLine;accSneakLine=function(){const t=l0.apply(this,arguments);return as2Night()?t+" · (đêm vắng người: dễ lọt hơn, bị bắt thì tội nặng hơn)":t}}
/* the fallen consort's call: a night happening at Trường Môn viện (j7 coldvisit, same options; its 12-month rest via S.seen) */
AD_HAP_FIX.push(()=>{if(!as2Night()||S.confined)return null;const e=typeof EVI!=="undefined"&&EVI.coldvisit;try{if(!e||!evFresh(e)||!e.ok())return null}catch(x){return null}return{k:"lc",id:"cold"}});
AD_HAP_T.cold="Tiếng khóc ở Trường Môn viện";
AD_HAP_FIRE.cold=()=>{if(!as2Night())return false;const d=mkEv("coldvisit");if(!d)return false;pushDil(d,AD_HAP_T.cold);return true};
/* one door per place per buổi for "Nghe lén câu chuyện" (every pop-up at the place + the "!" Nghe lỏm chuyện) */
function as2NgheKey(){try{return "nghe:"+S.place+":"+bkey()}catch(e){return ""}}
function as2NgheUsed(){return !!(S&&S.adDoor&&S.adDoor.__nghe===as2NgheKey())}
function as2NgheMark(){if(!S)return;S.adDoor=S.adDoor||{};S.adDoor.__nghe=as2NgheKey()}
(function(){const t0=talkOpts;talkOpts=function(p){let A=t0.apply(this,arguments);try{if(Array.isArray(A)&&as2NgheUsed())A=A.map(a=>a&&a.n==="Nghe lén câu chuyện"?Object.assign({},a,{lock:true,t:"đã nghe lén ở đây buổi này"}):a)}catch(e){}return A}})();
(function(){const t0=talk;talk=function(oi){let a=null;try{const p=S&&curPeople()[popIdx];a=p&&talkOpts(p)[oi]}catch(e){}if(a&&a.n==="Nghe lén câu chuyện"&&a.lock)return;
 const r=t0.apply(this,arguments);try{if(a&&a.n==="Nghe lén câu chuyện")as2NgheMark()}catch(e){}return r}})();
(function(){const a0=adHapFire1;adHapFire1=function(h,k){const r=a0.apply(this,arguments);try{if(h&&h.id==="gossip"&&r)as2NgheMark()}catch(e){}return r}})();
/* ================= ACT-MERGE J3 (owner 26/11 ~07:25Z + ~07:32Z, plan review/act-merge §4 row J3 = dup-report HANHSU_MERGE §3.2 H1–H16) =================
   HÀNH SỰ 38 → 16: ONE FEATURE = ONE BUTTON. A true duplicate (one feature split into several cards) shows as ONE door card; the way is chosen
   INSIDE through the kit option dialog (Q modal → kitOptFinal option cards). DISPLAY ONLY: the deck keeps every original card object, every way
   runs the SAME act(i) as before (same khắc, cost, odds, wrappers, results, NPC parity: the NPCs use the same BAL.deck / AGC3BTN tables), so no
   rule, outcome or number is lost or typed here (law 4). ONE ENGINE (J1 dev/build/jdoor.js): the rows are registered in DOOR (DOOR.add, kind «hs» = Hành sự, so DOOR.of(name,"hs") names the door; NPC keys AGC3DOOR unchanged), the door follows the jdoor DECK rule (deckFold: ≥2 ways dealt, a lone way stays bare) and opens the standard DOOR.card choice card.
   ĐỂ RIÊNG (owner ~07:32Z «những cái cần để riêng thì vẫn cứ để riêng»): Điểm trang (H1), Hối lộ Kính sự phòng (H9 lật thẻ), Cầu tự (H10),
   Trò chuyện với cung nữ (H12), Phát bạc cứu giúp (H13), Để ý nam nhân (H15), Giả mang thai (H16) — each a feature of its own.
   Lãnh cung (S.out), the cung nữ road and khuê các keep their own decks here (act-merge J5). Co-op: display only, no shared state. */
const HSD=[/* door key, door name, line, ways (card names) — H-number = HANHSU_MERGE §3.2 */
 {k:"nghi",h:"H2",n:"Nghỉ ngơi",t:"Nghỉ một lát, nghỉ dưỡng sức, hay dưỡng nhan.",m:[/^Nghỉ ngơi một lát$/,/^Nghỉ ngơi dưỡng sức$/,/^Dưỡng nhan$/]},
 {k:"caobenh",h:"H3",n:"Cáo bệnh",t:"Giả bệnh xin thương, hay đóng cửa tĩnh dưỡng.",m:[/^Giả bệnh$/,/^Xin rút thẻ bài, đóng cửa tĩnh dưỡng$/]},
 {k:"thinhan",h:"H4",n:"Thỉnh an",t:"Sang thỉnh an Thái hậu hay Hoàng hậu.",m:[/^Thỉnh an Thái hậu$/,/^Thỉnh an Hoàng hậu$/]},
 {k:"thaiy",h:"H5",n:"Bắt mạch, chữa bệnh",t:"Mời thái y tới cung hay tự sang Thái y viện; lúc lâm bệnh thì chữa bệnh.",m:[/^Mời thái y bắt mạch$/,/^Sang Thái y viện xin bắt mạch$/,/^Truyền thái y$/,/^Tự bốc thuốc$/,/^Tĩnh dưỡng$/]},
 {k:"soksp",h:"H6",n:"Xem sổ Kính sự phòng",t:"Lót tay thái giám, hay lén xem sổ.",m:[/^Xem sổ nguyệt sự$/,/^Xem lén sổ nguyệt sự$/]},
 {k:"docsach",h:"H7",n:"Đọc sách",t:"Đọc sách giải khuây, hay đọc binh thư sử sách.",m:[/^Đọc sách giải khuây$/,/^Đọc binh thư, sử sách$/]},
 {k:"tainghe",h:"H8",n:"Dâng tài nghệ",t:"Múa, đàn, cờ, vẽ: mỗi môn một đường.",m:[/^Múa trong yến tiệc$/,/^Kinh hồng vũ$/,/^Đánh cờ với Hoàng thượng$/,/^Đàn khúc Phượng cầu hoàng$/,/^Vẽ chân dung tặng Thái hậu$/]},
 {k:"taimat",h:"H11",n:"Tai mắt",t:"Sai cung nữ dò la, nghe ngóng chung, hay cài tai mắt.",m:[/^Sai cung nữ đi dò la$/,/^Nghe ngóng chung$/,/^Cài tai mắt$/]},
 {k:"roicung",h:"H14",n:"Rời cung",t:"Trốn, xuất gia, xin ban hôn, về quê; nhờ Thái hậu nói giúp trước khi xin.",m:[/^Nghĩ cách trốn khỏi cung$/,/^Dâng biểu xin xuất gia$/,/^Xin ban hôn cho /,/^Xin về quê phụng dưỡng cha mẹ$/,/^Nhờ Thái hậu nói giúp$/]},
 {k:"anthai",h:"(+)",n:"An thai",t:"Uống thuốc an thai, hay báo tin có thai.",m:[/^An thai$/,/^Báo tin có thai$/]}];
const HSD_ART={};/* door name → the way whose act art the door shows (set at render) */
function hsdOn(){try{return typeof tab!=="undefined"&&tab==="act"&&!!S&&!S.dead&&!S.out&&!S.kc&&!adSrv()}catch(e){return false}}
function hsdOf(n){return HSD.find(d=>d.m.some(r=>r.test(n||"")))||null}
function hsdWhy(a,dis){if(!dis)return"";let w="";try{w=cardWhy(a)}catch(e){}return w||(a.lock&&a.t)||"chưa làm được lúc này"}
function hsdBuild(){if(!hsdOn())return;const P=$("panel");const G=P&&P.querySelector(".cards");if(!G)return;
 const cards=[...G.querySelectorAll(":scope > button.kcard[data-i]")];
 for(const d of HSD){const mem=cards.filter(b=>{const a=deck[+b.dataset.i];return a&&d.m.some(r=>r.test(a.n||""))});if(mem.length<2)continue;/* the ONE deck-door rule (jdoor deckFold, J5b): a door when ≥2 ways are dealt today (greyed ways show greyed inside, with their reason); a lone way stays its own card */
  const W=mem.map(b=>({i:+b.dataset.i,dis:!!(b.disabled||b.classList.contains("kdis"))}));const ok=W.filter(w=>!w.dis);
  const lead=deck[(ok[0]||W[0]).i];HSD_ART[d.n]=lead.n;
  const ks=(ok.length?ok:W).map(w=>cardCost(deck[w.i]));
  const o={n:d.n,t:d.t,k:Math.min(...ks),c:{},w:{},x:W.map(w=>String(deck[w.i].n).split(", ")[0]).join(" · ")/* the Thành row names the ways (short name: the part before a comma, the kit splits rows on commas) */,dom:lead.dom,lock:!ok.length,hsDoor:d.k};
  /* odds chip: when EVERY usable way rolls, the door shows the best way's odds; a door with a sure way keeps the kit's sure look (odds cap) */
  try{const R=ok.map(w=>deck[w.i]).filter(a=>a.o!=null&&a.o<100);if(ok.length&&R.length===ok.length)o.o=Math.max(...R.map(a=>a.o))}catch(e){}
  const tp=document.createElement("template");tp.innerHTML=cardH(o,W[0].i).trim();const b=tp.content.querySelector("button");if(!b)continue;
  b.removeAttribute("data-i");b.dataset.hsd=d.k;b.dataset.hsi=W.map(w=>w.i).join(",");b.dataset.hsx=W.map(w=>w.dis?0:1).join(",");
  b.querySelectorAll("[data-kinfo]").forEach(e=>e.remove());if(!ok.length)b.disabled=true;
  mem[0].before(b);mem.forEach(m=>m.remove())}}
if(typeof kitActArt==="function"){const k0=kitActArt;kitActArt=function(name){try{if(HSD_ART[name])return k0.call(this,HSD_ART[name])}catch(e){}return k0.apply(this,arguments)}}
(function(){const r0=renderPanel;renderPanel=function(){const r=r0.apply(this,arguments);try{hsdReg();hsdBuild()}catch(e){console.error("hsdBuild",e)}return r}})();
/* the door: ONE kit option dialog, one option per way (its own khắc / cost / odds line), «Thôi» = the kit ✕ */
function hsdOpt(a,why,i){const sp=String(a.x||"").split(/ · kèm: /);const ton=[`${cardCost(a)} khắc`];try{const c=fmt(a.c||{});if(c)ton.push(c)}catch(e){}
 let gain="";try{gain=[fmt(a.w||{}),sp[0]].filter(Boolean).join(" · ")}catch(e){}const P=["tốn: "+ton.join(" · "),"thành: "+(gain||a.t||"")];if(sp[1])P.push("kèm: "+sp[1]);
 const rolled=a.o!=null&&a.o<100&&!a.lock;const o={n:a.n,x:P.join(" · "),go:()=>{setTimeout(()=>{try{act(i)}catch(e){console.error("hsd act",e)}},0)}};/* the way runs in its OWN task, exactly like a tap on its old card: no dialog-choice context (j78 evidence «how», j85 deed, co-op pick text) wraps it */
 if(rolled){let f="";try{f=[fmt(a.l||{}),typeof a.lx==="string"?a.lx:""].filter(Boolean).join(" · ")}catch(e){}o.x+=" · hỏng: "+(f||"không mất gì");try{o.p=optOdds(a)}catch(e){}}
 if(why)o.off={why};return o}
function hsdReg(){try{if(window.DOOR&&DOOR.add&&!DOOR.byK("hs-nghi"))HSD.forEach(d=>DOOR.add({k:"hs-"+d.k,n:d.n,kinds:["hs"],re:new RegExp(d.m.map(r=>r.source).join("|")),h:d.t,hs:d.h}))}catch(e){}}
function hsdOpen(b){if(!S||S.dead||Q.length)return;hsdReg();const d=HSD.find(x=>x.k===b.dataset.hsd);if(!d)return;const I=b.dataset.hsi.split(",").map(Number),X=b.dataset.hsx.split(",").map(Number);
 const rows=I.map((i,j)=>{const a=deck[i];if(!a)return null;const o=hsdOpt(a,hsdWhy(a,!X[j]),i);o.hsd=d.k;return o}).filter(Boolean);
 if(window.DOOR&&DOOR.card)DOOR.card(d.n,d.t,rows,null);else{rows.push({n:"Thôi"});Q.push({t:d.n,h:`<p>${d.t}</p>`,opts:rows});showModal()}}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#panel button[data-hsd]");if(!b)return;e.stopPropagation();e.preventDefault();if(b.disabled)return;try{hsdOpen(b)}catch(x){console.error("hsdOpen",x)}},true);
document.addEventListener("pointerup",e=>{try{const b=e.target.closest&&e.target.closest("#panel .kcard[disabled][data-hsd]");if(!b||typeof kpPop!=="function"||!S||S.dead)return;
 const I=b.dataset.hsi.split(",").map(Number);const rows=I.map(i=>{const a=deck[i];return a?`<span class="ef n">${a.n}: ${hsdWhy(a,1)}</span>`:""}).join("");
 window.__adGreyT=Date.now();window.__adGreyR=b.getBoundingClientRect();kpPop(b,`<div class="kpopt">${b.querySelector(".kan")?b.querySelector(".kan").textContent:""}</div><div class="kpopx">${rows}</div>`,{inside:true})}catch(x){}},true);
/* the way's own act logs its own line (as when it was a card): the door dialog adds no «Door: way» line of its own */
(function(){const l0=logChoice;logChoice=function(m){if(m&&m.opts&&m.opts.some(o=>o&&o.hsd))return;return l0.apply(this,arguments)}})();
