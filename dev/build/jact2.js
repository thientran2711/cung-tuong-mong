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
   HÀNH SỰ 38 → 16: ONE FEATURE = ONE BUTTON, on the ONE door engine (J1 dev/build/jdoor.js, DECK doors: DOOR.deck rows, road «hs» = the consort
   Hành sự). This block only REGISTERS the rows (true duplicates, H-number = HANHSU_MERGE §3.2); jdoor folds the RENDERED panel (display only, deck untouched;
   a door when ≥2 ways are dealt, a lone way stays its own card), opens the standard choice card, keeps locked ways grey with their reason, and runs
   the picked way as act(i) of its old card in its own task (same khắc, cost, odds, wrappers, result). No rule, outcome or number moved (law 4);
   NPCs keep their BAL.deck / AGC3BTN tables (law 1).
   ĐỂ RIÊNG (owner ~07:32Z «những cái cần để riêng thì vẫn cứ để riêng»): Điểm trang (H1), Hối lộ Kính sự phòng (H9 lật thẻ), Cầu tự (H10),
   Trò chuyện với cung nữ (H12), Phát bạc cứu giúp (H13), Để ý nam nhân (H15), Giả mang thai (H16) — each a feature of its own.
   Lãnh cung / cung nữ / khuê các decks: their own rows (act-merge J5). */
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
/* registration only (jdoor is assembled after this file: registered once DOOR exists — at the end of this script task, and before any deal) */
let hsdOk=false;function hsdReg(){if(hsdOk||!window.DOOR||!DOOR.deck)return;hsdOk=true;HSD.forEach(d=>DOOR.deck({k:"hs-"+d.k,n:d.n,roads:["hs"],h:d.t,re:new RegExp(d.m.map(r=>r.source).join("|"))}))}
setTimeout(hsdReg,0);(function(){const d0=deal;deal=function(){hsdReg();return d0.apply(this,arguments)}})();
