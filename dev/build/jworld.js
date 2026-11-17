/* ================= jworld — WORLD WINDOW layer + the 11 world events (review/world-events) =================
   Owner OD:L1587 rule 4 (17/11 13:15Z, verbatim part): "lâu lâu mình vẫn có thể cho những cái sự kiện bốc thăm vào, Nhưng mà những cái sự
   kiện này phải là những sự kiện có thật ở trong game, và khi nó xảy ra là nó thực sự tác động tới tất cả mọi người ở trong game."
   + OD 17/11 13:48Z: build all of dev/research/world-events.md §3. PRIORITY RULE #1: every content below already existed (research §1);
   this file only adds ONE shared record that makes it act on EVERYONE, and wires the existing gates to read it.
   ONE RECORD  S.wwin = {L:[{id,k,t0,t1,scope,cause,x}], last:{k:tuần}, n:{k:count}, seen:{...}, seq} — a co-op WORLD key (W_KEYS), host rolls.
               t0/t1 in tuần (wk()); a window is open while t0 <= wk() < t1 and ends by itself. Every number: BAL.world (jbal2).
   ONE READER  worldWin(k) → the open window of kind k or null; worldWin() → all open windows. worldPlanW(p) → {place,act} multipliers.
   REAL CAUSES only (no pure dice event): a real death (Thái hậu S.thDead, the Hoàng hậu, the Thái tử), the calendar (tuyển tú year KC.ty+3n,
               tế Giao, thu săn, the Emperor's / Thái hậu's milestone birthday), the court roll j55 moodMonth (sứ thần, a failed flood /
               drought relief + Kho lúa low, a lost war + Biên cương low), a real jtsb fire that spreads, a famine that turns to plague,
               a real first prince / lập hậu / victory / relief (đại xá). The few rolls left decide only WHEN a real cause becomes a window
               (owner: "lâu lâu ... bốc thăm" allowed when the event is real and touches everyone).
   GATES that read it (existing code, never rebuilt): nightCh (thị tẩm, j8 flip, every consort the same) · visRoll (jvisit ngự giá) ·
               S.where.emp (stroll "!" jact, countAt) · festToday / festival (FEST days, j71 yến) · stipend (monthly pay) · wdTang (j92
               tang dress, jlux, jtoil, jpm) · mindW (every NPC choice site: jagent, j28 SOC, j40 menu, jsteal, …) · placeWhere (places) ·
               AD_HAP_FIX / AD_HAP_FIRE (Dư đồ "!") · freshEvents (the j7 comet card leaves the weekly pool: it comes with the sky window).
   TWO-WAY: NPCs cause (a careless maid / arsonist's fire, a minister's failed relief, a general's lost war, a consort's son, a death they
               caused) and always react (mindW / place weights, and the same option list she gets at the window's "!" place, chosen by
               mindPick). Her choice at the place changes her part of the window like theirs.
   Co-op: S.wwin is world (host); S.wwSeen / S.wwHap are her own; cards show once per player (guest via the render hook). Old saves: lazy. */
(function(){
const B=()=>BAL.world;
const host=()=>typeof worldOn!=="function"||worldOn();
const now=()=>{try{return wk()}catch(e){return 0}};
const T_=()=>{try{return typeof trS==="function"?trS():null}catch(e){return null}};
const WN={tang:"Quốc tang",away:"Ngự giá xa cung",tuyen:"Đại tuyển tú nữ",hoa:"Hỏa hoạn lớn",dis:"Thiên tai mất mùa",dich:"Ôn dịch",su:"Sứ đoàn vào triều",tho:"Đại thọ",sao:"Thiên tượng",xa:"Đại xá thiên hạ"};
const AWAY_N={te:"Đại lễ tế Giao",san:"Thu săn",tuan:"Ngự giá tuần du",chinh:"Ngự giá thân chinh"};
function wName(w){if(!w)return"";if(w.k==="away")return AWAY_N[w.x&&w.x.sub]||WN.away;if(w.k==="dis")return w.x&&w.x.sub==="han"?"Hạn hán, mất mùa":"Lũ lớn, mất mùa";if(w.k==="sao")return"Nhật thực, sao chổi";return WN[w.k]||w.k}
const WW={stat:{start:{},end:0,skip:{}},err:0};window.WW=WW;
function wErr(t,e){WW.err++;console.error("jworld "+t,e)}
function wZ(){if(!S)return null;let z=S.wwin;if(!z||typeof z!=="object")z=S.wwin={};if(!Array.isArray(z.L))z.L=[];if(!z.last)z.last={};if(!z.n)z.n={};if(z.seq==null)z.seq=0;return z}
function worldWin(k){try{if(!S||!BAL.world||!B().on)return k?null:[];const z=S.wwin;if(!z||!Array.isArray(z.L))return k?null:[];const t=now();const A=z.L.filter(w=>w&&w.t0<=t&&t<w.t1);return k?(A.find(w=>w.k===k)||null):A}catch(e){return k?null:[]}}
function worldAny(f){return worldWin().some(f)}
/* ---------- who is who ---------- */
const isEmpP=p=>!!S&&(p===S.emp||p==="emp");
const isThP=p=>!!S&&(p==="th"||p===S.thO||(p&&p.kind==="th"));
function wGroup(p){if(!p)return"consort";if(isEmpP(p))return"emp";if(isThP(p))return"th";if(p===S)return typeof isSrv==="function"&&isSrv()?"srv":"consort";
 if(typeof rivals!=="undefined"&&rivals.includes(p))return p.queen?"queen":"consort";if(p.loyal!=null)return"srv";return"other"}
function pid(p){return p===S?"me":p&&p.id}
function byPid(id){if(id==="me")return S;return(typeof rivals!=="undefined"?rivals:[]).find(v=>v.id===id)||null}
/* ---------- NPC reaction weights (the ONE interface for AG-ALL's day plan; mindW for every choice site) ---------- */
function worldPlanW(p){const out={place:{},act:{}};try{const g=wGroup(p);if(g==="emp"||g==="other")return out;for(const w of worldWin()){const b=B()[w.k];if(!b)continue;
  const A=g==="srv"&&b.srvAct?b.srvAct:b.act;for(const t in A||{})out.act[t]=(out.act[t]==null?1:out.act[t])*A[t];
  const P=b.place||{};for(const k in P)out.place[k]=(out.place[k]==null?1:out.place[k])*P[k];
  if(w.k==="tang"){const m=w.x&&w.x.why==="queen"?"kn":"tn";for(const k of ["tn","kn"])if(k!==m)delete out.place[k]}}}catch(e){wErr("planW",e)}return out}
if(typeof window.mindW==="function"){const m0=window.mindW;window.mindW=function(p,tag){const w=m0.apply(this,arguments);try{if(!S||!BAL.world||!B().on)return w;const a=worldPlanW(p).act[tag];if(a!=null)return Math.max(BAL.mind.wMin,w*a)}catch(e){}return w}}
/* ---------- start / end ---------- */
function wCd(k){const b=B()[k]||{};return b.cd||0}
function worldQueue(k,cause,o){if(!host()||!S||!B().on)return;const z=wZ();(z.q=z.q||[]).push({k,cause,o:o||{}})}
const TANG_NO=["tho","su","tuyen"];
function worldStart(k,cause,o){if(!host()||!S||S.dead||!B().on)return null;if(!WW.inTick){worldQueue(k,cause,o);return null}const z=wZ(),t=now(),b=B()[k]||{};o=o||{};
 if(k!=="tang"&&worldWin("tang")&&(TANG_NO.includes(k)||(k==="away"&&!(o.x&&o.x.sub==="chinh")))){WW.stat.skip[k]=(WW.stat.skip[k]||0)+1;return null}
 if(worldWin(k)){WW.stat.skip[k]=(WW.stat.skip[k]||0)+1;return null}
 if(!o.force&&z.last[k]!=null&&t-z.last[k]<(o.cd!=null?o.cd:wCd(k))){WW.stat.skip[k]=(WW.stat.skip[k]||0)+1;return null}
 if(!o.force&&worldWin().length>=B().maxOpen){WW.stat.skip[k]=(WW.stat.skip[k]||0)+1;return null}
 const len=Math.max(1,o.len||b.len||1);const w={id:++z.seq,k,t0:t,t1:t+len,scope:o.scope||"all",cause:cause||"",x:o.x||{}};
 z.L.push(w);z.last[k]=t;z.n[k]=(z.n[k]||0)+1;WW.stat.start[k]=(WW.stat.start[k]||0)+1;
 let txt="";try{const E=EVD[k];if(E&&E.start)txt=E.start(w)||""}catch(e){wErr("start "+k,e)}w.txt=txt;
 try{if(typeof tdNews==="function"&&T_())tdNews(`${wName(w)}: ${cause}.`)}catch(e){}
 log(`<b>${wName(w)}.</b> ${cause}. ${txt}`);return w}
function worldEnd(w){const z=wZ();let txt="";try{const E=EVD[w.k];if(E&&E.end)txt=E.end(w)||""}catch(e){wErr("end "+w.k,e)}WW.stat.end++;w.done=1;
 z.L=z.L.filter(x=>x!==w);(z.H=z.H||[]).unshift({k:w.k,sub:w.x&&w.x.sub||"",t0:w.t0,t1:w.t1,cause:w.cause});if(z.H.length>12)z.H.length=12;
 if(txt)log(txt);return txt}
/* ---------- helpers for effects ---------- */
const liveR=()=>{try{return liveRivals(true)}catch(e){return[]}};
const cons=()=>{try{return consorts().filter(p=>!(p===S&&typeof isSrv==="function"&&isSrv()))}catch(e){return[]}};
function moodFloor(m){try{if(S.emp&&(S.emp.mood==null||S.emp.mood<m))S.emp.mood=m}catch(e){}}
function moodSet(m){try{if(S.emp)S.emp.mood=m}catch(e){}}
function nmList(L){return L.map(p=>p===S?"ngươi":p.name).join(", ")}
function npcPick(v,O){try{return typeof mindPick==="function"?mindPick(O,v):O.sort((a,b)=>b[1]-a[1])[0][0]}catch(e){return O[0][0]}}
const mW=(v,t)=>{try{return typeof window.mindW==="function"?window.mindW(v,t):1}catch(e){return 1}};
function monthsWord(n){const m=Math.round(n/3);return m>=1?(["","một","hai","ba","bốn","năm","sáu"][m]||m)+" tháng":(["","một","hai","ba"][n]||n)+" tuần"}
function meCons(){return !(typeof isSrv==="function"&&isSrv())&&!S.out}
/* ---------- the 11 events (research §3 rows; contents reused, see each) ---------- */
const EVD={};
/* 1 QUỐC TANG (row 8): real death of Thái hậu / Hoàng hậu / Thái tử. Reuses j92 (tang dress law, y_tang, tangPunish, the "Quốc tang" card),
   jlux/jtoil/jpm (read wdTang). Adds: no thị tẩm the first weeks, no festival/yến for the whole window, mourning rite at the hall. */
EVD.tang={place:w=>w.x.why==="queen"?"kn":"tn",
 start(w){const b=B().tang;moodFloor(b.mood);let n=0;for(const v of liveR())if(v.wd&&typeof wdAutoFor==="function"){/* j92 does the dress by traits at month end; mid-month deaths: the same rule now */
   try{if(roll(traitsOf(v).includes("Kiêu ngạo")?70:90)){wdAutoFor(v,0);n++}}catch(e){}}
  return `Cả cung để tang ${monthsWord(w.t1-w.t0)}: không yến tiệc, không ca nhạc; ${monthsWord(b.noNight[w.x.why]||1)} đầu không ai được thị tẩm.`},
 end(w){return `Mãn tang (${wName(w)}): cung cấm trở lại như thường.`},
 card(w){if(Q.some(m=>m&&m.t==="Quốc tang"))return null;/* j92's own card already says it */
  return{t:"Quốc tang",who:pEmp(),h:`<p>${w.cause}. ${w.txt||""}</p><p class="past">Mặc đồ đỏ hay vàng lúc này là tội. Nên thay y phục, tháo trâm (Tư trang).</p>`}},
 scene(w){const b=B().tang.rite;const P=wPresent(EVD.tang.place(w));return{t:"Linh cữu",h:`<p>Quan tài đặt giữa chính điện, khói hương nghi ngút. ${P.length?nmList(P)+" đang quỳ túc trực.":"Cung nhân thay nhau túc trực."}</p>`,
  opts:[{n:"Quỳ túc trực, tụng kinh",fx:{suc:-8},x:`thành: Đức +${b.duc}, Thái hậu +${b.th}`,go:()=>{apply({duc:b.duc});if(!S.thDead&&w.x.why!=="th")apply({th:b.th})}},
   {n:"Thắp nén hương rồi lui",fx:{},x:"không được không mất"}]}},
 night(w,p){return wNow0(w)<(B().tang.noNight[w.x.why]||1)},feast:1};
/* 2 NGỰ GIÁ XA CUNG (rows 10 + 11): tế Giao (calendar), thu săn (autumn, peace), tuần du (good years), thân chinh (a lost war).
   Reuses: S.where.emp (he is not in the palace: no stroll "!", countAt), nightCh (only those who follow him), visRoll (no ngự giá),
   j55 Đại tướng quân roll formula for the war, jact2 "Xin theo hầu lễ tế / Theo ngài lên núi" are the same wish (followers by favour). */
EVD.away={place:w=>"thu",
 start(w){const b=B().away,sub=w.x.sub;const n=b.fol[sub]||0;w.x.f=[];
  if(n>0&&sub==="san"){/* thu săn: those who ride with him = jpet's hunt rule (Sủng >= BAL, the most favoured first), so the jpet hunt gifts go to them */
   const C=cons().filter(p=>!p.out&&!p.confined&&(p.sung||0)>=b.san.folSung).sort((x,y)=>(y.sung||0)-(x.sung||0)).slice(0,n);w.x.f=C.map(pid)}
  else if(n>0){const C=cons().filter(p=>!p.preg&&!p.confined&&!p.out);const W=C.map(p=>[p,Math.max(1,rawNight(p))*(p===S?1:mW(p,"social"))]);
   for(let i=0;i<n&&W.length;i++){const p=npcPick(null,W.slice());const j=W.findIndex(x=>x[0]===p);if(j>=0)W.splice(j,1);if(p)w.x.f.push(pid(p))}}
  const F=w.x.f.map(byPid).filter(Boolean);
  return `Ngài rời cung ${monthsWord(w.t1-w.t0)}${F.length?`; theo hầu: ${nmList(F)}`:""}. Thái hậu và Hoàng hậu trông coi hậu cung; không thị tẩm, không ngự giá.`},
 tick(w){if(w.x.sub==="chinh"&&now()<w.t1-1){try{log(`Tin quân báo về: ngự giá ${pick(["đã tới biên ải","đóng quân bên sông","giao chiến với giặc","chờ lương thảo"])}.`)}catch(e){}}},
 end(w){const b=B().away,F=(w.x.f||[]).map(byPid).filter(p=>p&&(p===S||p.alive));for(const p of F)ap(p,{sung:b.folSung});let r=`${wName(w)} xong, ngự giá hồi cung.${F.length?` Người theo hầu được thêm ân sủng: ${nmList(F)}.`:""}`;
  if(w.x.sub==="chinh"){const T=T_();if(T){const DT=T.H["Đại tướng quân"];const c=b.chinh.win;const o=cl(Math.round(c[0]+(DT?DT.pow/c[1]+DT.sk/c[2]:0)),10,92);
    if(roll(o)){T.bien=cl(T.bien+b.chinh.winBien,0,100);moodSet(0);r+=` Đại thắng trở về, Biên cương +${b.chinh.winBien}.`;w.x.won=1}
    else{T.bien=cl(T.bien+b.chinh.loseBien,0,100);moodSet(3);r+=` Thua trận trở về, Biên cương ${b.chinh.loseBien}; ngài giận dữ.`}}}
  if(w.x.won)worldStart("xa","Thắng trận trở về, ban ân xá");return r},
 card(w){const me=(w.x.f||[]).includes("me");if(!me)return{t:wName(w),who:pEmp(),h:`<p>${w.cause}.</p><p>${w.txt||""}</p>`};
  const b=B().away;return{t:wName(w),who:pEmp(),h:`<p>${w.cause}.</p><p>${w.txt||""}</p><p>Thái giám truyền chỉ: ngươi được chọn theo hầu.</p>`,
   opts:[{n:"Theo hầu ngự giá",fx:{},x:`thành: đi cùng ngài, hết chuyến Sủng +${b.folSung}`},
    {n:"Cáo bệnh ở lại",fx:{},x:`kèm: nhường chỗ cho người khác, Danh ${b.stayDanh}`,go:()=>{w.x.f=(w.x.f||[]).filter(x=>x!=="me");apply({danh:b.stayDanh});
      const C=liveR().filter(v=>!v.preg&&!v.confined&&!(w.x.f||[]).includes(v.id));if(C.length){const v=npcPick(null,C.map(v=>[v,Math.max(1,rawNight(v))*mW(v,"social")]));if(v){w.x.f.push(v.id);log(`${v.name} theo hầu thay ngươi.`)}}}}]}},
 night(w,p){return !(w.x.f||[]).includes(pid(p))},emp:1};
/* 3 ĐẠI TUYỂN TÚ NỮ (row 2): every 3 years at the KC.ty clock (the player's own road already runs on it). Reuses newRival/drawFace/palFix
   (as j3 moreRivals and j55 "tuyen"), roomFor/CAPC caps, jealousy via relAdd/affAdd (the same relation core). */
EVD.tuyen={place:w=>typeof qOn==="function"&&qOn()?"kn":"tn",
 start(w){const b=B().tuyen;const n=b.n[0]+R(b.n[1]-b.n[0]+1);const N=[];const old=cons();
  for(let i=0;i<n;i++){try{if(typeof roomFor==="function"&&!roomFor("consort"))break;if(liveR().length+1>=(typeof CAPC==="number"?CAPC:16))break;
   const v=newRival(R(b.rankMax+1));Object.assign(v,drawFace());v.age=b.age[0]+R(b.age[1]);v.sung=cl((v.sung||0)+b.newSung,0,100);v.wNew=w.id;rivals.push(v);N.push(v)}catch(e){wErr("tuyen new",e)}}
  try{if(N.length&&typeof palFix==="function")palFix()}catch(e){}w.x.n=N.map(v=>v.id);
  for(const p of old)ap(p,{sung:-b.sungThin});
  for(const v of old){if(v===S||!N.length)continue;const t=pick(N);const k=npcPick(v,[["welcome",mW(v,"help")],["ambush",mW(v,"harm")*(1+(v.ghen||0)/50)],["ignore",1]]);
   if(k==="welcome")affAdd(t,v,b.welcomeAff);else if(k==="ambush"){relAdd(v,t,b.ambushRel);if(typeof newsAdd==="function")newsAdd(v,"tuyen",`${v.name} ra oai với tú nữ mới ${t.name}.`)}}
  return N.length?`${N.length} tú nữ vào cung: ${N.map(v=>`${v.name} (${RANKS[v.rank].n})`).join(", ")}. Ân sủng cũ phải chia bớt.`:"Hậu cung đã đủ người, lần này không ai được giữ lại."},
 end(w){return""},
 card(w){return{t:"Đại tuyển tú nữ",who:pEmp(),h:`<p>${w.cause}.</p><p>${w.txt||""}</p>`}},
 scene(w){const b=B().tuyen;const N=(w.x.n||[]).map(byPid).filter(v=>v&&v.alive);if(!N.length)return null;const t=N[0];
  return{t:"Tú nữ mới vào cung",who:pv(t),h:`<p>Các tú nữ mới quỳ ra mắt. ${nmList(N)} cúi đầu, chưa dám ngẩng lên.</p>`,
   opts:[{n:"Tặng quà làm quen",fx:{bac:-b.giftBac},x:`thành: ${t.name} quý ngươi +${b.giftAff}`,go:()=>affAdd(t,S,b.giftAff)},
    {n:"Ra oai phủ đầu",fx:{},x:`thành: ${t.name} sợ ngươi · kèm: ${t.name} oán ngươi`,go:()=>relAdd(S,t,b.ambushRel)},
    {n:"Đứng xem rồi về",fx:{},x:"không được không mất"}]}},
 night(w,p){return false}};
/* 4 HỎA HOẠN LỚN (row 4): a real jtsb fire (careless maid / falling wick / arsonist, the same rule for every cung) spreads in the dry season.
   Reuses jtsb tsbBurn (burn only flammables, Sổ đồ ledger), tsbFireBase dry check, newsAdd, j71 hoahoan stays her merit chance. */
EVD.hoa={place:w=>{const p=byPid(w.x.who);return p&&p!==S&&typeof palaceOf==="function"?palaceOf(p):"nvp"},
 start(w){const b=B().hoa;moodFloor(b.mood);const L=[];for(const p of [S].concat(liveR())){if(pid(p)===w.x.who||p.out)continue;if(!roll(b.nb))continue;
   try{WW.inFire=1;const lost=typeof tsbBurn==="function"?tsbBurn(p,1,"lửa lan từ dãy cung bên"):[];if(lost.length)L.push(p)}catch(e){}finally{WW.inFire=0}}
  try{if(S.rt)S.rt.fire=S.turn}catch(e){}
  const p=byPid(w.x.who);return `Lửa từ ${p?(p===S?"cung ngươi":"cung "+p.name):"một dãy cung"} lan sang cả dãy, cung nhân xách nước cả đêm.${L.length?` Mất đồ vì lửa lan: ${nmList(L)}.`:""} Nội vụ phủ tra xét nguyên do.`},
 card(w){const p=byPid(w.x.who);try{if(p&&p!==S&&p.alive&&EVI&&EVI.fire){const pp=EVI.fire.pp()||{};pp.v=p.id;const d=mkP("fire",pp);if(d){log(`${w.cause}. ${w.txt||""}`);return{t:"Hỏa hoạn lớn",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp}}}}catch(e){wErr("fire card",e)}
  return{t:"Hỏa hoạn lớn",who:pEmp(),h:`<p>${w.cause}.</p><p>${w.txt||""}</p>`,headArt:typeof tsbArt==="function"?tsbArt("ev-hoa-hoan","Hỏa hoạn"):undefined}},
 scene(w){const b=B().hoa;const p=byPid(w.x.who);if(!p||p===S)return null;return{t:"Đám cháy đêm qua",who:pv(p),h:`<p>Cung ${p.name} còn khói. Nàng đứng giữa đống đồ cháy dở.</p>`,
  opts:[{n:"Mang đồ sang giúp",fx:{bac:-b.helpBac},x:`thành: ${p.name} quý ngươi +${b.helpAff}, Đức +${b.helpDuc}`,go:()=>{affAdd(p,S,b.helpAff);apply({duc:b.helpDuc})}},
   {n:"Hỏi han vài câu rồi về",fx:{},x:"không được không mất"}]}},
 night(w,p){return false}};
/* 5 THIÊN TAI (row 5): j55 flood / drought whose relief FAILED and Kho lúa is low. Reuses j55 (Hộ bộ roll, Kho lúa), j3 mood, the stipend
   rule (pay cut, same for all), festival gates (yến cancelled). NPCs give or keep by their own silver and traits — the same options as hers. */
EVD.dis={place:w=>"cnh",
 start(w){const b=B().dis;moodFloor(b.mood);const G=[],K=[];for(const v of liveR()){const k=npcPick(v,[["give",mW(v,"help")*(.3+Math.min(2,(v.bac||0)/100))],["thrift",1],["keep",mW(v,"bribe")*.8]]);
   if(k==="give"&&(v.bac||0)>=b.give){ap(v,{bac:-b.give,danh:b.giveDanh});v.th=(v.th||0)+b.giveTh;G.push(v)}else if(k==="keep"&&(v.bac||0)>=b.stingyBac){ap(v,{danh:b.stingyDanh});K.push(v)}}
  w.x.G=G.map(v=>v.id);return `Hoàng thượng giảm thiện, bãi yến tiệc; bổng lộc trong cung bớt ${Math.round(b.payCut*10)} phần 10 cho đến khi qua nạn.${G.length?` Quyên bạc cứu đói: ${nmList(G)}.`:""}${K.length?` Bị chê keo kiệt: ${nmList(K)}.`:""}`},
 end(w){if(roll(B().xa.afterDis))worldStart("xa","Qua cơn thiên tai, ban ân điển");return "Nạn đói đã qua, cung cấm thôi giảm thiện."},
 card(w){const b=B().dis;const o=meCons()?[{n:"Quyên bạc cứu đói",fx:{bac:-b.give},x:`thành: Danh +${b.giveDanh}, Thái hậu +${b.giveTh}`,go:()=>apply({danh:b.giveDanh,th:b.giveTh})},
   {n:"Bớt chi dùng trong cung",fx:{},x:`thành: Đức +${b.thrift.duc}`,go:()=>apply(b.thrift)},
   {n:"Làm như không biết",fx:{},x:(S.bac||0)>=b.stingyBac?`kèm: bị chê keo kiệt, Danh ${b.stingyDanh}`:"không được không mất",go:()=>{if((S.bac||0)>=b.stingyBac)apply({danh:b.stingyDanh})}}]:null;
  return{t:wName(w),who:pEmp(),h:`<p>${w.cause}.</p><p>${w.txt||""}</p>`,opts:o||undefined}},
 night(w,p){return false},feast:1,pay:1};
/* 6 ÔN DỊCH (row 6): a famine that does not lift turns to plague. Reuses j13 illness rulebook (catchIll, ILL cont, illMonthP stages,
   careOdds, Thái y), nightCh (thị tẩm halted). Everyone may close her gate (the same option, NPCs by mindPick). */
EVD.dich={place:w=>"tyv",
 start(w){const b=B().dich;moodFloor(2);const C=[];for(const v of liveR()){const k=npcPick(v,[["safe",mW(v,"flee")*(v.bac>=b.safeBac?1:.2)],["go",mW(v,"social")]]);if(k==="safe"&&v.bac>=b.safeBac){ap(v,{bac:-b.safeBac});v.wSafe=w.id;C.push(v)}}
  return `Dịch lan từ ngoài thành vào cung: cửa cung đóng, thị tẩm tạm dừng, Thái y viện ngày đêm sắc thuốc.${C.length?` Đóng cửa cung, xông ngải: ${nmList(C)}.`:""}`},
 tick(w){const b=B().dich;let n=0;for(const p of [S].concat(liveR())){if(p.out||p.dead||p.alive===false)continue;const safe=(p===S?S.wSafe:p.wSafe)===w.id;
   if(roll(b.catch*(safe?b.safeMul:1))){const r=catchIll(p,b.ill);if(p===S&&r)log(r);n++}}if(n)WW.stat.ill=(WW.stat.ill||0)+n},
 end(w){if(roll(B().xa.afterDis))worldStart("xa","Dịch đã qua, ban ân điển");return "Dịch đã lui, cửa cung mở lại."},
 card(w){const b=B().dich;return{t:"Ôn dịch",who:pEmp(),h:`<p>${w.cause}.</p><p>${w.txt||""}</p>`,
  opts:[{n:"Đóng cửa cung, xông ngải",fx:{bac:-b.safeBac},x:"thành: khó nhiễm bệnh hơn cho đến khi hết dịch",go:()=>{S.wSafe=w.id}},{n:"Vẫn đi lại như thường",fx:{},x:"kèm: dễ nhiễm bệnh hơn"}]}},
 night(w,p){return true}};
/* 7 SỨ ĐOÀN (row 1): j55 "cong" (Sứ thần các nước vào triều cống) while Biên cương is strong. Reuses j55 cong, FEST/jact2 place
   (Cần Chính điện banquet), the j67 s_su / jrd_nc arcs stay as they are. Invited consorts (rank >= BAL) may show a talent. */
EVD.su={place:w=>"thu",
 start(w){const b=B().su;moodSet(b.mood);const S1=[];for(const v of liveR()){if(rkOf(v)<b.rank)continue;const k=npcPick(v,[["show",mW(v,"art")],["quiet",1]]);
   if(k==="show"){if(roll(odA(v,b.show[0]+(v.tai||0)/b.show[1]))){ap(v,{sung:b.showSung,danh:b.showDanh});S1.push(v)}else ap(v,{danh:b.failDanh})}}
  return `Yến tiếp sứ ở Cần Chính điện; phi tần từ ${RANKS[b.rank].n} trở lên dự yến.${S1.length?` Được sứ thần khen tài: ${nmList(S1)}.`:""}`},
 card(w){return{t:"Sứ đoàn vào triều",who:pEmp(),h:`<p>${w.cause}.</p><p>${w.txt||""}</p>`}},
 scene(w){const b=B().su;const ok=meCons()&&rkOf(S)>=b.rank;const o=od(b.show[0]+(S.tai||0)/b.show[1]);
  return{t:"Yến tiếp sứ",who:pEmp(),h:`<p>Sứ thần dâng lễ vật lạ, bá quan ngồi kín hai bên.</p>${ok?"":`<p class="past">Phẩm của ngươi chưa được dự yến; chỉ đứng xa mà xem.</p>`}`,
   opts:ok?[{n:"Dâng một khúc đàn trong yến",fx:{},x:`${word(o)} · thành: Sủng +${b.showSung}, Danh +${b.showDanh} · hỏng: Danh ${b.failDanh}`,go:()=>{if(roll(o))apply({sung:b.showSung,danh:b.showDanh});else apply({danh:b.failDanh})}},
    {n:"Ngồi yên giữ lễ",fx:{},x:"không được không mất"}]:[{n:"Đứng xem rồi về",fx:{},x:"không được không mất"}]}},
 night(w,p){return false}};
/* 8 ĐẠI THỌ (row 3): the Emperor's 40/50/60… or Thái hậu's 60/70/80 birthday (j71 Tiết Vạn thọ / Thánh thọ days). Reuses FEST days,
   j3 mood, j55 Kho lúa. Every consort gives a gift by her own silver (NPCs) or by her choice (her). */
EVD.tho={place:w=>w.x.who==="th"?"tn":"thu",
 start(w){const b=B().tho;moodSet(b.mood);const T=T_();if(T)T.kho=cl(T.kho-b.kho,0,100);let n=0;
  for(const v of liveR()){const g=Math.round((v.bac||0)*b.npcGift);if(g<=0)continue;ap(v,{bac:-g});const s=g>=b.big?b.npcSung[1]:b.npcSung[0];ap(v,{sung:s});if(w.x.who==="th")v.th=(v.th||0)+s;n++}
  return `Đại yến mừng thọ, cả triều dâng lễ; ${n} phi tần đã dâng lễ vật.${T?` Kho lúa -${b.kho}.`:""}`},
 card(w){const b=B().tho;const th=w.x.who==="th";const o=od(b.make[0]+(S.tai||0)/b.make[1]);
  return{t:wName(w),who:pEmp(),h:`<p>${w.cause}.</p><p>${w.txt||""}</p>`,opts:meCons()?[
   {n:"Dâng lễ vật quý",fx:{bac:-b.big},x:`thành: Sủng +${b.sungBig}${th?`, Thái hậu +${b.thBig}`:""}`,go:()=>apply(th?{sung:b.sungBig,th:b.thBig}:{sung:b.sungBig})},
   {n:"Dâng lễ vật vừa phải",fx:{bac:-b.mid},x:`thành: Sủng +${b.sungMid}`,go:()=>apply({sung:b.sungMid})},
   {n:"Tự tay làm lễ vật",fx:{suc:-b.makeSuc},x:`${word(o)} · thành: Sủng +${b.sungBig} · hỏng: không ai để ý`,go:()=>{if(roll(o))apply({sung:b.sungBig})}}]:undefined}},
 night(w,p){return false}};
/* 9 THIÊN TƯỢNG (row 7): eclipse / comet read by Khâm Thiên giám. Reuses the j7 comet card (it names her or a rival) — it leaves the weekly
   random pool and comes only with this window (LUẬT SỬA CẢ NHÓM); j3 mood; no feasts for the window. */
EVD.sao={place:w=>"cnh",
 start(w){moodFloor(B().sao.mood);return "Khâm Thiên giám tâu điềm lạ; Hoàng thượng ăn chay, bãi yến, cả cung cầu đảo."},
 card(w){try{if(EVI&&EVI.comet&&EVI.comet.ok()){const d=mkEv("comet");if(d)return{t:"Thiên tượng",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp}}}catch(e){wErr("comet",e)}
  return{t:"Thiên tượng",who:pEmp(),h:`<p>${w.cause}.</p><p>${w.txt||""}</p>`}},
 night(w,p){return false},feast:1};
/* 10 ĐẠI XÁ (row 9): a real first prince, lập hậu, a victory, the end of a disaster. Reuses cấm túc (confined), lãnh cung (out) and her
   own way out j14 restore() ("chờ ân xá" is already on her cold-palace card), j8 "pardon" rule for NPCs (out=false, rank 0). */
EVD.xa={place:w=>"lc",
 start(w){const b=B().xa;const F=[];if(S.confined&&!(typeof isSrv==="function"&&isSrv())){S.confined=0;F.push(S)}
  for(const v of rivals){if(!v.alive)continue;if(v.confined){v.confined=0;F.push(v)}else if(v.out&&!v.coop&&roll(b.npcP)){v.out=false;v.rank=0;F.push(v)}}
  const T=T_();if(T)T.kho=cl(T.kho-b.kho,0,100);w.x.me=S.out&&(S.turn-(S.coldTurn||0))>=b.minM?1:0;
  return `Chiếu đại xá: miễn thuế một năm, người bị cấm túc được tha${F.length?`: ${nmList(F)}`:""}.`},
 card(w){if(w.x.me&&S.out){try{restore(false,"Chiếu đại xá thiên hạ")}catch(e){wErr("restore",e)}return null}return{t:"Đại xá thiên hạ",who:pEmp(),h:`<p>${w.cause}.</p><p>${w.txt||""}</p>`}},
 night(w,p){return false}};
function wNow0(w){return now()-w.t0}
function wPresent(k){try{return liveR().filter(v=>whereOf(v)===k&&!v.confined)}catch(e){return[]}}
/* ---------- gates (existing code reads the window) ---------- */
function rawNight(p){WW.noGate=1;try{return nightCh(p)||0}catch(e){return 0}finally{WW.noGate=0}}
function nightBlocked(p){if(WW.noGate)return false;for(const w of worldWin()){const E=EVD[w.k];try{if(E&&E.night&&E.night(w,p||S))return true}catch(e){}}return false}
{const n0=nightCh;nightCh=function(p){const c=n0.apply(this,arguments);try{if(c&&S&&B().on&&nightBlocked(p||S))return 0;
  const t=worldWin("tuyen");if(c&&t&&(t.x.n||[]).includes((p||S).id))return Math.round(c*B().tuyen.newNight)}catch(e){}return c}}
if(typeof window.visRoll==="function"){const v0=window.visRoll;window.visRoll=function(){try{if(S&&B().on&&nightBlocked(S))return""}catch(e){}return v0.apply(this,arguments)}}
function feastOff(){return worldAny(w=>EVD[w.k]&&EVD[w.k].feast)}
{const f0=festToday;festToday=function(){const f=f0.apply(this,arguments);try{if(f&&S&&B().on&&feastOff())return null}catch(e){}return f}}
if(typeof festival==="function"){const f0=festival;festival=function(title){try{if(S&&B().on&&feastOff()){log(`${title}: năm nay bãi yến vì ${wName(worldWin().find(w=>EVD[w.k].feast))}.`);return""}}catch(e){}return f0.apply(this,arguments)}}
{const s0=stipend;stipend=function(p){let line=s0.apply(this,arguments);try{if(p&&!p.out&&S&&B().on&&worldAny(w=>EVD[w.k]&&EVD[w.k].pay)){const n=Math.round((BAL.pay[Math.min(7,rkOf(p))]||0)*B().dis.payCut);
   if(n>0){ap(p,{bac:-n});if(p===S)line=(line||"")+` Mất mùa, cung giảm bổng: Bạc -${n}.`}}}catch(e){}return line}}
if(typeof wdTang==="function"){const t0=wdTang;wdTang=function(){try{if(S&&B().on&&worldWin("tang"))return true}catch(e){}return t0.apply(this,arguments)}}
/* j92 starts its own quốc tang at month end (S.wdTang = turn+3): the window is the one record. Its card stays (it is the announcement). */
if(typeof wdMonth==="function"){const m0=wdMonth;wdMonth=function(pre){const had=!!worldWin("tang");const q0=Q.length;const r=m0.apply(this,arguments);
  try{if(S&&B().on&&had&&S.wdTang>S.turn){S.wdTang=0;for(let i=Q.length-1;i>=q0;i--)if(Q[i]&&Q[i].t==="Quốc tang")Q.splice(i,1)}}catch(e){wErr("wdMonth",e)}return r}}
/* the j7 comet leaves the weekly random pool: the sky window brings it (whole-group audit, research §5) */
const W_OUT={comet:()=>false,fire:()=>false,foreignwed:()=>!!worldWin("su")};/* comet → sky window, fire → fire window, foreignwed (an envoy asks) → envoy window */
if(typeof freshEvents==="function"){const f0=freshEvents;freshEvents=function(){const L=f0.apply(this,arguments);try{if(B().on)return L.filter(e=>!(e&&W_OUT[e.id]&&!W_OUT[e.id]()))}catch(e){}return L}}
/* jpet's autumn-hunt gifts (month 9, every year) only in a year the hunt really happens (z.sanY) */
if(typeof petMonth==="function"){const p0=petMonth;petMonth=function(){try{if(S&&B().on&&S.month===B().away.san.month&&wZ().sanY!==S.year)S.petHunt=S.year}catch(e){}return p0.apply(this,arguments)}}
/* LUẬT SỬA CẢ NHÓM (research §5): the world-ish events that ran on their own dice for her alone now need the real world state.
   jroute: the monthly dice fire at Ngự thiện phòng (roll RTC.fire, "khắp cung chạy loạn" — nobody else touched) is gone; the escape
     route's "Nhân lúc hỏa hoạn" reads the real fire window instead (EVD.hoa start sets S.rt.fire).
   j71 "Lập công · Hỏa hoạn, thiên tai trong cung": each picture needs its real cause — fire (0, 4) a fire window, flood (1) a flood window
     or a storm, storm (2) and lightning (5) a storm (rollWx severity 3), snow (3) a snow storm; no cause, no merit card. */
try{if(typeof RTC!=="undefined"&&RTC)RTC.fire=0}catch(e){}
try{if(typeof MF7!=="undefined"&&MF7.hoahoan){const H=MF7.hoahoan,w0=H.w;const storm=()=>!!(S&&S.wx&&S.wx.f===3);
  const ok=i=>{if(!B().on)return true;const d=worldWin("dis");return i===0||i===4?!!worldWin("hoa"):i===1?!!(d&&d.x.sub==="lut")||storm():i===3?storm()&&/tuyết/.test(S.wx.n||""):storm()};
  H.pick=ok;H.w=function(){const r=w0.apply(this,arguments);try{if(B().on&&!H.v.some((x,i)=>ok(i)))return 0}catch(e){}return r}}}catch(e){wErr("mf7",e)}
/* places: the Emperor is out of the palace; NPCs go where the window draws them (fallback until AG-ALL's day plan reads worldPlanW) */
{const pw=placeWhere;placeWhere=function(){const r=pw.apply(this,arguments);try{if(S&&S.where&&B().on){const A=worldWin();if(!A.length)return r;
  if(A.some(w=>EVD[w.k]&&EVD[w.k].emp))S.where.emp=null;if(!window.WORLD_PLAN_HOOKED&&host())wPull()}}catch(e){wErr("place",e)}return r}}
function wPull(){const W=S.where;for(const v of liveR()){if(v.confined||v.coop)continue;const P=worldPlanW(v).place;const cur=W[v.id];
  if(cur&&P[cur]===0){W[v.id]=palaceOf(v);continue}
  const L=Object.entries(P).filter(([k,m])=>m>1&&(k!=="kn"||(typeof qOn==="function"&&qOn()&&!v.queen)));if(!L.length)continue;
  const [k,m]=L.sort((a,b)=>b[1]-a[1])[0];if(roll(Math.min(80,B().pull*(m-1)))){try{if(typeof accessOf==="function"&&!accessOf(v,k).ok)continue}catch(e){}W[v.id]=k}}}
/* ---------- the Dư đồ "!": the first buổi of a window show it at the real place (what the NPCs are doing there) ---------- */
if(typeof AD_HAP_FIX!=="undefined"){AD_HAP_FIX.push(()=>{if(!S||!B().on||S.confined)return null;const t=now();S.wwHap=S.wwHap||{};
  for(const w of worldWin()){if(w.t0!==t||(S.buoi||0)>=B().hapB||S.wwHap[w.id])continue;const E=EVD[w.k];if(!E||!E.scene)continue;let k=null;try{k=E.place(w)}catch(e){}if(k)return{k,id:"world",x:w.id}}return null});
 AD_HAP_T.world="Việc lớn trong cung";
 /* the window's place is open to her that first tuần until she has been (the court gathers there), as jact2 does for a festival place */
 if(typeof ACC_ROLE!=="undefined"&&Array.isArray(ACC_ROLE))ACC_ROLE.unshift((p,k)=>{try{if(p!==S||(typeof adSrv==="function"&&adSrv())||!B().on)return null;const t=now();S.wwHap=S.wwHap||{};
   for(const w of worldWin()){if(w.t0!==t||S.wwHap[w.id])continue;const E=EVD[w.k];if(E&&E.scene&&E.place(w)===k)return{ok:true,world:1}}}catch(e){}return null});
 AD_HAP_FIRE.world=(h)=>{const w=worldWin().find(x=>x.id===h.x);if(!w)return false;S.wwHap=S.wwHap||{};if(S.wwHap[w.id])return false;S.wwHap[w.id]=1;
  let m=null;try{m=EVD[w.k].scene(w)}catch(e){wErr("scene",e)}if(!m)return false;if(!m.who)m.who=pEmp();Q.push(m);return true}}
/* ---------- triggers (real causes) ---------- */
function wSeen(){const z=wZ();const q=(typeof qOn==="function"&&qOn()&&rivals[0]&&rivals[0].queen)?rivals[0]:null;const h=S.heir&&S.heir.k;
 const sons=(()=>{try{return allKids().filter(([k])=>k.alive&&k.sex==="m").length}catch(e){return 0}})();
 return{th:!!S.thDead,q:q?q.id:null,qd:q?0:1,h:h?(h.name||"")+"|"+(h.age||0):null,ha:h?!!h.alive:false,sons,qs:S.rank>=7?"me":(q?q.id:null)}}
function wDeaths(){const z=wZ();const o=z.seen,n=wSeen();z.seen=n;if(!o)return;
 if(n.th&&!o.th)worldStart("tang","Thái hậu băng hà",{force:1,len:B().tang.len.th,x:{why:"th"}});
 else if(o.q!=null&&n.q!==o.q){const q=rivals.find(v=>v.id===o.q);if(q&&!q.alive)worldStart("tang",`Hoàng hậu ${q.name} băng hà`,{force:1,len:B().tang.len.queen,x:{why:"queen"}})}
 if(o.ha&&S.heir&&S.heir.k&&!S.heir.k.alive&&n.h===o.h)worldStart("tang",`Thái tử ${S.heir.k.name||""} qua đời`,{force:1,len:B().tang.len.heir,x:{why:"heir"}});
 if(o.sons===0&&n.sons>0)worldStart("xa","Hoàng thượng có hoàng tử đầu lòng");
 else if(n.qs!=null&&o.qs!==n.qs&&o.qs!==undefined)worldStart("xa","Lập Hoàng hậu, ban ân điển")}
/* the court roll: what moodMonth decided this month (text of j55 is fixed in this repo; test world_check pins it) */
{const m0=moodMonth;moodMonth=function(){const T=T_();const b0=T?{kho:T.kho,bien:T.bien}:null;const r=m0.apply(this,arguments);try{if(S&&T){const s=String(r||"");
  const k=/Sứ thần/.test(s)?"cong":/Lũ lụt/.test(s)?"lut":/Hạn hán/.test(s)?"han":/Biên ải/.test(s)?"giac":/Được mùa/.test(s)?"mua":/Quan tham/.test(s)?"tham":"";
  const fail=/chậm trễ|thua trận/.test(s);S.wMM={k,fail:fail?1:0,kho:T.kho,bien:T.bien,y:S.year,m:S.month}}}catch(e){}return r}}
function wCourt(){const T=T_(),M=S.wMM;if(!T||!M||M.done)return;M.done=1;const b=B();
 if(M.k==="cong"&&T.bien>=b.su.bien)worldStart("su","Sứ thần các nước vào triều cống");
 if((M.k==="lut"||M.k==="han")&&M.fail&&T.kho<b.dis.kho)worldStart("dis",`${M.k==="lut"?"Lũ lụt ở Giang Nam":"Hạn hán miền bắc"}, cứu tế chậm trễ, kho lúa cạn`,{x:{sub:M.k}});
 if(M.k==="giac"&&M.fail&&T.bien<b.away.chinh.bien){const c=b.away.chinh;const z=wZ();const ok=(S.emp.age||0)<=c.age&&!(S.emp.ill&&S.emp.ill.st>=2)&&(z.last.away_chinh==null||now()-z.last.away_chinh>=c.gapY*36);
  if(ok&&roll(c.p)&&worldStart("away","Giặc phá biên ải, Hoàng thượng quyết thân chinh",{len:b.away.len.chinh,x:{sub:"chinh"}}))z.last.away_chinh=now()}
 const d=wZ().H&&wZ().H.find(h=>h.k==="dis");if(T.kho<b.dich.kho&&(worldWin("dis")||(d&&now()-d.t1<b.dich.after))&&roll(b.dich.p))worldStart("dich","Đói kém kéo dài, dịch bệnh nổi lên");}
function wCalendar(){const b=B(),T=T_(),z=wZ(),y=S.year,m=S.month,t=S.tuan||0,E=S.emp||{};const ill=!!(E.ill&&E.ill.st>=2);
 /* tuyển tú: the KC.ty clock, every 3 years after the player's own (her home road ends at KC.ty) */
 if(typeof KC!=="undefined"&&m===KC.tm&&t===0&&y>KC.ty&&(y-KC.ty)%b.tuyen.every===0&&!(typeof isKc==="function"&&isKc()))worldStart("tuyen",`Năm thứ ${y}, đại tuyển tú nữ theo lệ ba năm`);
 /* tế Giao every 3 years before Đông chí */
 if(m===b.away.te.month&&t===0&&y%b.away.te.every===0&&!ill)worldStart("away","Hoàng thượng ra đàn Nam Giao tế trời",{len:b.away.len.te,x:{sub:"te"},cd:0});
 /* thu săn: autumn, peace at the border, he is well; decided the tuần before (the jpet hunt gifts at the month's start read z.sanY) */
 {const c=b.away.san;const pm=c.month===1?12:c.month-1;if(m===pm&&t===2)z.sanY=!ill&&(!T||T.bien>=c.bien)&&(E.age||0)<=c.age&&roll(c.p)?(c.month===1?y+1:y):0;
  if(m===c.month&&t===0&&z.sanY===y)worldStart("away","Mùa thu, Hoàng thượng đi săn ở Mộc Lan",{len:b.away.len.san,x:{sub:"san"},cd:0})}
 /* tuần du: spring of a good year */
 {const c=b.away.tuan;if(m===c.month&&t===0&&!ill&&T&&T.kho>=c.kho&&T.bien>=c.bien&&(E.age||0)<=c.age&&(z.last.away_tuan==null||now()-z.last.away_tuan>=c.gapY*36)&&roll(c.p)){
  if(worldStart("away","Bốn bề yên ổn, Hoàng thượng tuần du phương nam",{len:b.away.len.tuan,x:{sub:"tuan"},cd:0}))z.last.away_tuan=now()}}
 /* đại thọ: milestone birthdays on the existing Vạn thọ / Thánh thọ days */
 {const c=b.tho;const f=(typeof FEST!=="undefined")?FEST:{};const vt=f.vantho,tt=f.thanhtho;
  if(vt&&m===vt.m&&t===vt.t[0]&&(E.age||0)>=c.emp[0]&&(E.age||0)%c.emp[1]===0&&z.thoE!==y){z.thoE=y;worldStart("tho",`Vạn thọ: Hoàng thượng tròn ${E.age} tuổi`,{x:{who:"emp"},cd:0})}
  if(tt&&m===tt.m&&t===tt.t[0]&&!S.thDead&&(S.thAge||0)>=c.th[0]&&(S.thAge||0)%c.th[1]===0&&z.thoT!==y){z.thoT=y;worldStart("tho",`Thánh thọ: Thái hậu tròn ${S.thAge} tuổi`,{x:{who:"th"},cd:0})}}
 /* the sky: a month's chance (Khâm Thiên giám) */
 if(t===0&&roll(b.sao.p))worldStart("sao",pick(["Nhật thực giữa trưa","Sao chổi hiện ở trời tây"]));}
/* a real jtsb fire that spreads in the dry season */
if(typeof tsbBurn==="function"){const b0=tsbBurn;tsbBurn=function(p,n,cause){const L=b0.apply(this,arguments);try{if(!WW.inFire&&L&&L.length)WW.stat.fire=(WW.stat.fire||0)+1;if(!WW.inFire&&L&&L.length&&S&&B().on&&host()&&p&&!p.out){
   const dry=typeof tsbFireBase==="function"&&tsbFireBase(p)>1;if(roll(B().hoa.spread[dry?0:1]))worldStart("hoa",`Cung ${p===S?"của ngươi":p.name} bén lửa (${cause||"đèn nến"}), gió hanh thổi lửa lan`,{len:B().hoa.len,x:{who:pid(p)}})}}catch(e){wErr("fire",e)}return L}}
/* ---------- the tuần tick (after endTurn) ---------- */
function worldTick(){if(!S||S.dead||!B().on)return;const z=wZ();if(host()){WW.inTick=1;try{const t=now();
  for(const w of z.L.slice())if(t>=w.t1)worldEnd(w);
  for(const w of worldWin()){const E=EVD[w.k];if(E&&E.tick)try{E.tick(w)}catch(e){wErr("tick "+w.k,e)}
   if(w.k==="tang"&&wNow0(w)<(B().tang.noNight[w.x.why]||1))moodFloor(B().tang.mood);if(w.k==="dis")moodFloor(B().dis.mood)}
  for(const a of (z.q||[]).splice(0))worldStart(a.k,a.cause,a.o);
  if(!z.seen)z.seen=wSeen();else wDeaths();if(worldWin("tang")&&S.wdTang)S.wdTang=0;
  if((S.tuan||0)===0)wCourt();wCalendar()}finally{WW.inTick=0}}
 worldShow()}
function worldShow(){if(!S||S.dead)return;S.wwSeen=S.wwSeen||{};const A=worldWin();
 for(const w of A){if(S.wwSeen[w.id])continue;S.wwSeen[w.id]=1;let m=null;try{m=EVD[w.k].card(w)}catch(e){wErr("card "+w.k,e)}if(m){if(!m.who)m.who=pEmp();if(!m.opts)delete m.opts;Q.push(m)}}
 const ids=new Set(A.map(w=>w.id));for(const k in S.wwSeen)if(!ids.has(+k)&&+k<(wZ().seq-20))delete S.wwSeen[k]}
{const e0=endTurn;endTurn=function(){const t0=S?now():0;const r=e0.apply(this,arguments);try{if(S&&!S.dead&&now()!==t0){worldTick();if(Q.length&&$("modal").hidden)showModal()}}catch(e){wErr("tick",e)}return r}}
/* co-op guest: cards of windows the host opened */
{const r0=render;render=function(){const r=r0.apply(this,arguments);try{if(S&&!S.dead&&!host()&&!Q.length&&!S.mg){const n=Q.length;worldShow();if(Q.length>n&&$("modal").hidden)showModal()}}catch(e){}return r}}
try{const K=window.COOPW&&COOPW.X&&COOPW.X.W_KEYS;if(Array.isArray(K)&&!K.includes("wwin"))K.push("wwin")}catch(e){}
Object.assign(window,{worldQueue,worldWin,worldPlanW,worldStart,worldEnd,worldTick,worldName:wName,WORLD_EVD:EVD,worldNightBlocked:nightBlocked});
})();
