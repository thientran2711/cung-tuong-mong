
/* ================= j75: ONE NIGHT = ONE VISIT; TRUE NIGHT RESULTS; PREGNANCY FOUND LATER (owner 11/14) =================
   1. Each week has one night and the Emperor visits one palace. The visit is "taken" when a steal/road wins (by anyone)
      or when the night itself starts (her prep, a rival's night at week end). After that every night-stealing act
      (deck cards, rival-panel acts, NPC social steals, the flip-time NPC steals) is closed with the reason
      "Đêm nay Hoàng thượng đã ở cung …". Every person (her and NPCs alike) gets one try per night; a failed try uses it.
   2. Won nights report what really happened: no ranges in results. nightFx logs Sủng/Ân tình before → after, the
      reward actually given (or none), and the jealousy it really caused among rivals she knows; at the end of the night a
      result card sums the whole night (before → after) from the start of the prep.
   3. Conception is not known on the night. She hears "Đêm nay ngươi được thị tẩm." only; if she did conceive, 3–6 weeks
      later the physician finds it ("Thái y bắt mạch: ngươi đã có thai, đang tháng thứ N", N = the game's own month count) as a modal card: keep secret or announce.
      No message when she did not conceive. Until found, pregnancy marks are hidden from her HUD/status; once found the
      HUD chip reads "Có thai: tháng N".
   4. The prep acts all give a real, visible effect with a real cost; only one prep per night (one prep modal per night). */
(function(){
const NTW=()=>wk();
function ntTaken(){const n=S&&S.ntk;return n&&n.w===NTW()?n:null}
function ntTake(who){if(!S)return;const me=who===S||who==="me";S.ntk={w:NTW(),who:me?"me":(who&&who.id),nm:me?"ngươi":(who&&who.name)||""}}
function ntTried(a){const t=S&&S.ntTry;return !!(t&&t.w===NTW()&&t.ids.includes(a===S?"me":a&&a.id))}
function ntTry(a){if(!S)return;if(!S.ntTry||S.ntTry.w!==NTW())S.ntTry={w:NTW(),ids:[]};const k=a===S?"me":a&&a.id;if(!S.ntTry.ids.includes(k))S.ntTry.ids.push(k)}
function ntReason(a){const n=ntTaken();if(n)return `Đêm nay Hoàng thượng đã ở cung ${n.who==="me"?"ngươi":n.nm}`;if(ntTried(a||S))return a&&a!==S?`${a.name} đã thử giành đêm nay`:"Đêm nay ngươi đã thử giành một lần rồi";return ""}
function ntCan(a){return !ntReason(a)}
window.ntTaken=ntTaken;window.ntReason=ntReason;window.ntCan=ntCan;

/* --- stealing: one try each, nothing after the visit is taken (her and NPCs alike) --- */
const sn0=stealNight;stealNight=function(a,t,mode){if(!ntCan(a))return "";ntTry(a);return sn0.apply(this,arguments)};
const sw0=stealWin;stealWin=function(a,t,mode){const n=ntTaken();if(n)return `${ntReason(a)}. `;
 /* owner 11/15 16:58Z: the log says what REALLY happened to the one she took the night from (no card range "+3 đến +23") */
 const me=a===S&&t&&t!==S;const b=me?{f:aff(t,S),o:Math.round(oan(t,S)),g:t.ghen||0}:null;
 let r=sw0.apply(this,arguments);if(a!==S)ntTake(a);
 if(me)try{const sg=x=>(x>0?"+":"−")+Math.abs(x);const d=[];const g=(t.ghen||0)-b.g,f=aff(t,S)-b.f,o=Math.round(oan(t,S))-b.o;
  if(g)d.push(`nàng ghen ${sg(g)}`);if(f)d.push(`Nàng → ta: thiện cảm ${sg(f)}`);if(o)d.push(`Nàng oán ta ${sg(o)}`);if(d.length)r=r.replace(/\s*$/,"")+" "+d.join(", ")+". "}catch(e){}
 return r};
for(const k of ["steal","road"]){const A0=ACT[k];if(!A0)continue;const ok0=A0.ok;A0.ok=function(a,t){return ntCan(a)&&ok0.apply(this,arguments)}}
if(typeof LACK==="object")for(const k of ["steal","road"]){const l0=LACK[k];LACK[k]=function(v){const w=ntReason(S);return w||(l0?l0.apply(this,arguments):"")}}
/* the NPC social "steal" used to report a stolen night without moving it; now it is the real act or nothing */
if(typeof SOC==="object"&&SOC.steal){const s0=SOC.steal;SOC.steal=Object.assign({},s0,{ok:(v,t)=>tonightOf()===t&&ntCan(v)&&v.sung>=20,run:(v,t)=>{const r=stealNight(v,t,"feign");return String(r||"").replace(/\.\s*$/,"").trim()}})}
/* a rival's own night taken at week end */
const rt0=resolveTonight;resolveTonight=function(){const t=S&&S.tonight;if(t&&t!=="me"&&t.alive&&!t.out&&!ntTaken())ntTake(t);return rt0.apply(this,arguments)};

/* --- deck cards Tranh sủng / Chặn ngự giá: closed with the reason, true result text --- */
const d0=deal;deal=function(){const r=d0.apply(this,arguments);try{if(!S||!Array.isArray(deck))return r;
 deck=deck.filter(a=>!(S.pregUnk&&a&&a.n==="Báo tin có thai"));
 for(const a of deck){if(!a||a.__steal||!(a.n==="Tranh sủng"||a.n==="Chặn ngự giá")||a.b!==2)continue;const road=a.n==="Chặn ngự giá";const desc=a.t;const v=tonightOf();if(!v||v===S)continue;
  a.__steal=1;Object.defineProperty(a,"lock",{get:()=>!ntCan(S),set:()=>{},enumerable:true,configurable:true});Object.defineProperty(a,"t",{get:()=>ntCan(S)?desc:ntReason(S),set:()=>{},enumerable:true,configurable:true});
  a.x=`thành: đêm nay Hoàng thượng sang cung ngươi (Sủng, Ân tình tính theo đêm) · kèm: ${stealKem(v)} · mỗi đêm chỉ thử một lần`;
  a.go=()=>{ntTry(S);const n=ntTaken();if(n){log(`${ntReason(S)}.`);return}const t=tonightOf();if(!t||t===S)return;log(`${stealWin(S,t,road?"road":"feign")}Đêm thị tẩm đang chờ; Sủng, Ân tình tính sau đêm.`)};
  a.fail=()=>{ntTry(S);log("Đêm nay ngươi không còn dịp giành lại.")}}}catch(e){console.error(e)}return r};
/* results never echo the pre-act line of a steal card (that line was the source of '+3..8', 'có thể') */
const ro0=runOpt;runOpt=function(a){if(a&&a.__steal){const x=a.x;a.x="";try{return ro0.apply(this,arguments)}finally{a.x=x}}return ro0.apply(this,arguments)};

/* --- her night: once per night; the visit is taken when it starts --- */
const ns0=nightScene;nightScene=function(){const n=ntTaken();if(n){log(`${ntReason(S)}.`);if(n.who!=="me"&&S.tonight==="me")S.tonight=null;return}ntTake(S);S.tonight="me";try{window.__nsnap=rsnap()}catch(e){window.__nsnap=null}return ns0.apply(this,arguments)};
/* the tablet card and the late visit close their 'night' option with the reason when the night is gone */
function lockFirst(id,re){const p0=PEND[id];if(!p0)return;PEND[id]=function(){const d=p0.apply(this,arguments);try{if(d&&d.o){const o=d.o.find(o=>re.test(o.n||""));if(o)o.lk=()=>ntReason(S)}}catch(e){}return d}}
lockFirst("ksp",/^Tắm gội chờ giá/);lockFirst("empnight",/^Thắp đèn hầu rượu/);
const sm0=showModal;showModal=function(){const r=sm0.apply(this,arguments);try{const m=Q[0];const M=$("modal");if(m&&m.opts&&M&&!M.hidden)m.opts.forEach((o,i)=>{if(typeof o.lk!=="function")return;const w=o.lk();const b=M.querySelector(`.opt[data-m="${i}"]`);if(!b)return;if(w){b.disabled=true;const s=b.querySelector("small");if(s)s.innerHTML=`<span class="ef r">${w}</span>`}})}catch(e){}return r};
const cm0=chooseM;chooseM=function(i){try{const m=Q[0];const o=m&&m.opts&&m.opts[i];if(o&&typeof o.lk==="function"&&o.lk())return}catch(e){}
 window.__ntDone=0;const r=cm0.apply(this,arguments);
 try{if(window.__ntDone&&window.__nsnap&&S&&!S.dead){const b=window.__nsnap;b.seq=window.__ntSeq!=null?window.__ntSeq:b.seq;window.__nsnap=null;window.__ntDone=0;resultShow("Đêm thị tẩm",b,"sure")}}catch(e){}return r};

/* owner 13:30Z "Bạc −5 phải truy nguồn": the night card's "Mất: Bạc 300→295 (−5)" was the price of the PREP choice (Điểm trang lộng lẫy
   Bạc −5; Tắm cánh hoa Bạc −15; Tập trước Sức −5), already paid and shown as that choice's Tốn — the night snapshot is taken at nightScene,
   BEFORE prep. Re-base Bạc / Sức when the night itself begins (night1 is built, after the prep cost was applied by chooseM), so the night
   card shows only what the night did. (Bạc won IN the night — "Xin ân cho gia đình" — still shows.) */
{const n1=PEND.night1;PEND.night1=function(){try{const b=window.__nsnap;if(b&&S){b.bac=S.bac||0;b.suc=S.suc||0}}catch(e){}return n1.apply(this,arguments)}}
/* --- the night's true line --- */
const nf0=nightFx;nightFx=function(s){const b={sung:S.sung,an:S.an||0,inv:S.inv.length,g:{}};for(const v of liveRivals(true))b.g[v.id]=v.ghen||0;
 const L0=log;log=function(h){if(/^Thị tẩm\. Sủng/.test(String(h)))return;return L0.apply(this,arguments)};let r;
 try{r=nf0.apply(this,arguments)}finally{log=L0}
 try{const got=S.inv.slice(b.inv).filter(e=>e&&e.from==="emp").map(e=>itm(e.k).n);
  const gh=liveRivals(true).filter(v=>knows(v)&&b.g[v.id]!=null&&(v.ghen||0)!==b.g[v.id]).map(v=>`${v.name.split(" ").pop()} ghen ${b.g[v.id]} → ${v.ghen}`);
  const unk=liveRivals(true).some(v=>!knows(v)&&b.g[v.id]!=null&&(v.ghen||0)!==b.g[v.id]);
  window.__ntSeq=S.logSeq||0;
  log(`Đêm nay ngươi được thị tẩm. Sủng ${b.sung} → ${S.sung} · Ân tình ${b.an} → ${S.an||0} · ${got.length?`<span class="g">được ban ${got.join(", ")}</span>`:"không được ban thưởng"}${gh.length?` · ${gh.join(", ")}`:""}${unk?" · người ngươi chưa quen cũng ghen thêm":""}.`);
  window.__ntDone=1}catch(e){console.error(e)}return r};

/* --- conception: unknown on the night, found 3–6 weeks later --- */
const ng0=night;night=function(p){p=p||S;if(p!==S)return ng0.apply(this,arguments);const was=S.preg;
 const L0=log;log=function(h){if(/Thái y bắt mạch: ngươi đã có thai/.test(String(h)))return;return L0.apply(this,arguments)};let r;
 try{r=ng0.call(this,p)}finally{log=L0}
 if(!was&&S.preg&&!S.fake){S.pregUnk=1;S.hidden=true;S.pregDisc=wk()+3+R(4)}return r};
function pregFind(){if(!S||S.dead)return;if(!S.preg){S.pregUnk=0;return}if(!S.pregUnk)return;if(wk()<(S.pregDisc||0)&&S.preg<4)return;
 S.pregUnk=0;const m=S.preg;const canHide=S.hidden&&S.preg<=3;
 const h=`<p>Mấy hôm nay ${S.maid?`cung nữ ${S.maid.name}`:"cung nữ"} thấy ngươi biếng ăn, hay buồn nôn, liền mời thái y.</p><p><b class="g">Thái y bắt mạch: ngươi đã có thai, đang tháng thứ ${m}.</b></p>${canHide?`<p class="past">Ngươi có thể giấu thai đến hết tháng thứ 3, hoặc báo tin để được sủng ái.</p>`:""}`;
 const card={ev:1,t:"Thái y bắt mạch",who:pDoc(),h};/* ev: keep secret / announce is an EVENT choice (KIT 28.6; reviewer r7: its opts are set after the literal, so it slipped) */
 if(canHide)card.opts=[{n:"Giữ kín, dặn thái y không nói",fx:{},x:"giấu thai đến hết tháng thứ 3 · phi tần chưa biết để nhắm vào thai",go:()=>{S.hidden=true;log("Ngươi giữ kín tin có thai.")}},
  {n:"Báo tin cho Hoàng thượng",fx:{sung:6,th:5},x:`các phi tần ghen +${ghenN(BAL.ghen.preg)} · kẻ ác có thể nhắm vào thai`,go:()=>{S.hidden=false;ghenAll(BAL.ghen.preg);log("Ngươi báo tin có thai.")}}];
 else card.btn="Đã hiểu";
 log(`<span class="g">Thái y bắt mạch: ngươi đã có thai, đang tháng thứ ${m}.</span>`);Q.push(card)}
window.pregFind=pregFind;
/* before it is found nobody knows: the tablet still treats her as not pregnant (no second conception: night() skips) */
const nc0=nightCh;nightCh=function(p){p=p||S;if(p===S&&S.pregUnk&&S.preg){const k=S.preg;S.preg=0;try{return nc0.call(this,p)}finally{S.preg=k}}return nc0.apply(this,arguments)};
const fl0=flip;flip=function(){const r=fl0.apply(this,arguments);try{pregFind()}catch(e){console.error(e)}return r};

/* HUD / status: hidden until found; once found "Có thai: tháng N" */
const rh0=renderHud2;renderHud2=function(){const r=rh0.apply(this,arguments);try{const el=$("hud2");if(!el||!S)return r;const b=el.querySelector('.hc[data-hx="preg"]');
 if(S.preg&&S.pregUnk){if(b)b.remove();const bb=el.querySelector('.hc[data-hx="birth"]');if(bb)bb.remove()}
 else if(b&&S.preg){const cc=el.querySelector('.hc[data-hx="con"]');if(cc)cc.remove();const i=b.querySelector(".ic");b.innerHTML=(i?i.outerHTML:"")+`Có thai: <b>tháng ${S.preg}</b>${S.hidden&&!S.fake?" · đang giấu":""}`}}catch(e){}return r};
const ch0=chip;chip=function(t,cls){if(S&&S.preg&&/Mang thai tháng/.test(String(t||""))){if(S.pregUnk)return "";t=String(t).replace(/Mang thai tháng \d+/,`Có thai: tháng ${S.preg}${S.hidden&&!S.fake?" · đang giấu":""}`)}return ch0.call(this,t,cls)};

/* --- prep: every option a real effect and a real cost; numbers it shows are the numbers it uses --- */
const UA="mỗi +1: Ân tình +1 · mỗi +2: Sủng +1 · dễ được ban thưởng hơn";
PEND.prep=()=>{const wb=wearBonus(S),vp=vpItems(S).length>0,b=bestArt();const jb=wb.sac>0?Math.max(2,1+Math.round(wb.sac/3)):0;
 const lv=Math.max(1,b.l||0),oP=od(BAL.odb.j75.odOP+S.tai/2+(b.l||0)*8);
 const nx1=(q,vpv,ln)=>()=>{if(ln)log(ln);pushFront(mkP("night1",{q,vp:vpv}),"Đêm thị tẩm")};
 return{who:pMe(),t:`<p>Kính sự phòng đã báo tin. Còn hai canh giờ trước khi kiệu đến. Chỉ kịp chuẩn bị một việc.</p><p class="past">Được ưa đêm nay: ${UA}.</p>`,o:[
 {n:"Tắm cánh hoa, xông hương",fx:{bac:-15},x:"đêm nay được ưa +2",go:nx1(3,0,"Tắm cánh hoa, xông hương: đêm nay được ưa +2.")},
 {n:"Điểm trang lộng lẫy",fx:{bac:-5},x:"son phấn: Sắc đêm nay +3 → được ưa +1",go:nx1(2,0,"Điểm trang: Sắc đêm nay +3, được ưa +1.")},
 Object.assign({n:"Đeo trang sức đẹp nhất",fx:{},x:jb?`trang sức đang đeo Sắc +${wb.sac} → được ưa +${jb}${vp?" · kèm: vượt phẩm, Hoàng thượng có thể thu đồ, Danh -4":""}`:"cần đeo trang sức trong Rương đồ",go:nx1(1+jb,vp?1:0,`Đeo trang sức: được ưa +${jb}.`)},{lk:()=>jb?"":"Chưa đeo trang sức nào: vào mục Rương đồ, chọn Đeo"}),
 {n:`Tập trước ${b.n}`,fx:{suc:-5},x:`${word(oP)} · thành: được ưa +${1+lv} · hỏng: được ưa +1`,go:()=>{const ok=roll(oP);const g=ok?1+lv:1;log(`Tập trước ${b.n}: <span class="${ok?"g":"r"}">${ok?"thành":"hỏng"}</span>, đêm nay được ưa +${g}.`);pushFront(mkP("night1",{q:1+g,vp:0}),"Đêm thị tẩm")}},
 {n:"Để mộc, nghỉ ngơi",fx:{suc:BAL.eff.j75.sucFx},x:`giữ sức: Sức ${balSg(BAL.eff.j75.sucFx)} · không thêm được ưa`,go:nx1(1,0,"")}]}};

})();

/* ===== 6. FAIR NIGHTS (owner 11/14): in-world causes only, the same rules for every consort, her included =====
   Diagnosis (old build): NPC Sủng had three sources she never had: a free hidden +3 roll in npcMonthly (~30%/month),
   a night that always paid +4..7 Sủng (no đêm vui/nhạt), and no weekly decay (random walk -1..+1 vs her -1/tuần);
   high ranks also start with Sủng 20+rank×9, so the tablet weight (Sủng/4 is its biggest term) favours them early.
   Now: (a) an NPC night is graded exactly like hers (prep, talk that may or may not suit him, his mood, luck) and its
   reward chance is hers (10 + 4×điểm); (b) the quiet +3 is a world act with a cost (dâng canh, thơ, túi thơm) that
   tai mắt can hear about; (c) every consort loses Sủng 1/tuần on the same rule as her, and NPCs work for Sủng each tuần with her own deck acts (dance/zither/chess at art ≥3, else a small gift; trait sets how often); (d) mùng 1 (40%) / rằm (20%) the Emperor
   by custom goes to the Hoàng hậu; (e) a favourite who holds ≥4 of the last 6 nights (độc sủng) draws jealousy,
   resentment, an admonition "mưa móc đều khắp" from Hoàng hậu/Thái hậu (Sủng -5, and he heeds it for 2 tuần) and
   rival houses pushing their daughters; all visible with true deltas, the same when the favourite is her;
   (f) S.nightWhy / window.nightWhy(): why tonight's pick (weights, Sủng, his mood, reasons) for the kit's notice. */
(function(){
/* knobs for the balance pass: eff = how often NPCs work for Sủng (×), custom = % mùng 1 / rằm to the Hoàng hậu, fav = nights in 6 that make độc sủng */
/* sat = the Emperor wants a change of face: each night a consort already had in the last 6 tuần beyond the first lowers her chance of the tablet by sat (×, floor satMin) and
   her chance to lure him away (Tranh sủng / Chặn ngự giá) by satO points; the same for every consort, shown as a reason in nightWhy */
/* sat .2 / satO 8 = the measured balance values (BALANCE_REPORT 11/14); one-core: they were 0 / 0 here and set again in jbal2 */
/* custom (mùng 1 / rằm weight) lives in BAL.ag.emp.custom (AG2, ONE CORE) */
const FAIRN=window.FAIRN={eff:1,fav:4,sat:.2,satMin:.35,satO:8};
const MOODW=["vui","bình thường","phiền muộn","giận dữ"];
function talkOpts(p){const E=S.emp;return [has("trongtai")?3:(p.tai||0)>=60?1:0,has("chamchinh")?3:-1,has("datinh")||has("mesac")?3:has("lanhlung")?-1:0,E.mood>=2?2:1]}
/* (a) an NPC's night: same formula as hers (PEND.prep q, PEND.night1 talk + mood + R(3), nightFx gains and reward) */
rivalNight=function(v){v.nights++;v.nightLog.push(wk());
 let q=1;if(v.bac>=BAL.bacFee.npcMat&&roll(55)){ap(v,{bac:-BAL.bacFee.npcMat});q=3}else if((v.suc||0)>=30){ap(v,{suc:-5});const lv=Math.max(1,Math.max(...Object.values(v.arts)));q=1+(roll(odA(v,40+(v.tai||0)/2+lv*8))?1+lv:1)}
 const O=talkOpts(v);const fit=roll(BAL.odb.j75.rbFit+(v.tamco||0)/2)?Math.max(...O):pick(O);const mood=BAL.night.mood[S.emp.mood];
 const sc=q+fit+mood+R(3);const NG=nightGain(sc),g=NG.sung,an=NG.an;ap(v,{sung:g,an});v.pg=cl(v.pg+6,0,100);v.tablet=0;v.lastNightS=sc;
 const grade=sc>=BAL.nightEnd.warm?"đêm vui":sc>=BAL.nightEnd.normal?"đêm êm":"đêm nhạt";
 let r=`Đêm qua thẻ bài của ${v.name} được lật${S.mat>=2?` (tai mắt nói: ${grade})`:""}. `;
 if(giuBlocked(v)){if(v.bac>=BAL.bacFee.giu&&roll(odA(v,45+v.tamco/3))){ap(v,{bac:-BAL.bacFee.giu});night(v)}}else night(v);
 {let x=null;if(typeof pillowNpc==="function"&&agOn())x=pillowNpc(v,sc);/* AG2: her own choice by her spite need (two-way row 24, one deed BAL.tw.g.pillow) */
  else if(v.rel<-20&&roll(20)){const o=odA(v,30+v.an/2);if(roll(o)){const b=S.sung;apply({sung:-4});x={t:S,ok:1,b}}else if(DG()){ap(v,{sung:-6})}}
  if(x&&x.t===S&&x.ok&&S.mat>=2)r+=`Tai mắt nghe được: gối đầu, ${v.name} nói xấu ngươi.${x.b!==S.sung?` Sủng của ta ${x.b} → ${S.sung}.`:""} `}
 if(typeof amOn==="function"&&amOn()?amSendQ(v):roll(3)){r+=sendMaid(v)}/* AG3: her own choice (jagmaid) */
 if(roll(BAL.odb.j75.rbTop+sc*4))bestow(v,"night");return r};
/* (b) the quiet favour is a world act with a cost */
const QF=["dâng canh sâm lên Dưỡng Hòa điện","chép bài thơ dâng lên ngự thư phòng","thêu túi thơm dâng Hoàng thượng","đứng đợi ngự giá ở ngự hoa viên, dâng một khúc đàn"];
const nm0=npcMonthly;npcMonthly=function(v){const a0=ap,fi0=v.fakeIll;let seen="";let armed=false;
 const od0=odA;odA=function(p,b){if(p===v&&!armed)armed=Math.abs(b-(55+v.sung/5+mm()))<1e-9;return od0.apply(this,arguments)};
 ap=function(p,o){if(armed&&p===v&&o&&o.sung===3&&Object.keys(o).length===1&&!(v.fakeIll===2&&fi0!==2)){armed=false;if((v.bac||0)<10)return;const b=v.sung;a0(p,{sung:3,bac:-10});
   if(roll(BAL.odb.j75.rbTop_2+S.mat*10))seen+=`Tai mắt kể: ${v.name} ${pick(QF)}; Hoàng thượng vui lòng.${b!==v.sung?` Sủng của ${v.name} ${b} → ${v.sung}.`:""} `;return}return a0.apply(this,arguments)};
 let r;try{r=nm0.apply(this,arguments)}finally{ap=a0;odA=od0}return (r||"")+seen};
/* (c) the same weekly decay for everyone (her rule from endTurn: -1, none for Hoàng hậu after the first tuần, none in tuần 2 if he is lạnh lùng) */
/* NPCs work for Sủng as she does: the same acts as her deck cards (art ≥3: dance, zither, chess; else a small gift), same costs and odds shape */
const EFF={"Tham vọng":.35,"Nóng nảy":.25,"Kiêu ngạo":.25,"Ân cần":.1,"Khiêm nhường":.1};
/* the act she would do now (her best art, else a small gift) — read by the weekly pass below and by the NPC agent loop (jagent, AG1) */
/* ONE table (BAL.deck, jbal2) and ONE odds formula for her cards (j2 artActs) and the NPC's same act (r1 fault 7) */
function deckOdds(p,k){const D=BAL.deck[k];const l=typeof artW2==="function"&&p&&p.arts?artW2(p,k):(p.arts&&p.arts[k]||0);return D.o[0]+l*D.o[1]+(D.st?(+p[D.st[0]]||0)/D.st[1]:0)+mm()}
function deckGain(k){const D=BAL.deck[k];return k==="ky"?Object.assign({},D.w,{danh:BAL.tw.g.ky[0],tamco:BAL.tw.g.ky[1]}):Object.assign({},D.w)}
function deckLoss(k){return k==="vu"?{danh:-BAL.tw.g.vu[2]}:Object.assign({},BAL.deck[k].l||{})}
const DECKN={vu:"múa Kinh hồng vũ trong yến tiệc",cam:"đàn khúc Phượng cầu hoàng vọng sang Dưỡng Hòa điện",ky:"đánh cờ cùng Hoàng thượng"};
function npcEffortKind(v){if(v.confined||v.out||illOf(v)||(v.preg||0)>=7)return null;
 const A=v.arts||{},B=BAL.deck;let kd="";for(const k of ["vu","cam","ky"])if((A[k]||0)>=B[k].lv&&v.suc>=B[k].sucMin){kd=k;break}
 if(kd){const l=deckLoss(kd);return{kd,n:DECKN[kd],c:Object.assign({},B[kd].c),o:odA(v,deckOdds(v,kd)),w:deckGain(kd),lose:-(l.sung||0),l}}
 if((v.bac||0)>=B.qf.bac)return{kd:"qf",n:pick(QF),c:{bac:-B.qf.bac},o:odA(v,B.qf.o),w:{sung:B.qf.w},lose:0,l:{}};
 return null}
window.deckOdds=deckOdds;window.deckGain=deckGain;window.deckLoss=deckLoss;
/* force = the agent loop chose it (no weekly trait frequency) */
function npcEffort(v,force){const K=npcEffortKind(v);if(!K)return "";const pt=tv(EFF,v)!=null?tv(EFF,v):.18;if(!force&&Math.random()>pt*FAIRN.eff)return "";
 const {kd,n,c,o,w,lose}=K;
 ap(v,c);const b=v.sung;const ok=roll(o);ap(v,ok?w:K.l);try{if(typeof empMet==="function")empMet(v,kd,ok)}catch(e){}/* AG2: he remembers it (her runOpt: jagemp) */
 /* two-way (owner 16/11 s21): her Kinh hồng vũ card also stirs the others (ghen +10, liking −5); an NPC dance does the same */
 if(kd==="vu"){liveRivals(true).forEach(x=>{if(x!==v){x.ghen=cl((x.ghen||0)+BAL.tw.g.vu[0],0,100);affAdd(x,v,-BAL.tw.g.vu[1])}});affAdd(S,v,-BAL.tw.g.vu[1])}
 /* the change names whose Sủng it is; a line with no change says nothing about numbers (owner 11/15: "Sủng nàng 45 → 45") */
 return roll(BAL.odb.j75.rbTop_2+S.mat*10)?`Tai mắt kể: ${v.name} ${n}: ${ok?"Hoàng thượng vui lòng":"ngài không để ý"}.${b!==v.sung?` Sủng của ${v.name} ${b} → ${v.sung}.`:""} `:""}
window.npcEffort=npcEffort;window.npcEffortKind=npcEffortKind;
const rt0=rivalsTurn;rivalsTurn=function(){let ev=rt0.apply(this,arguments)||"";try{if(S.dead)return ev;
 for(const v of liveRivals(true)){if(!v.alive||v.out)continue;ev+=window.npcEffort(v);/* the global one: jagent mutes this weekly dice while the agent loop owns the deed */const keep=(has("lanhlung")&&S.tuan===1)||(rkOf(v)>=7&&S.tuan!==0);if(!keep)v.sung=cl(v.sung-1,0,100)}
 ev+=monopoly()}catch(e){console.error(e)}return ev};
/* (e) độc sủng and the world's answer */
function nightsIn(p,n){const w0=wk();return (p.nightLog||[]).filter(w=>w0-w>=0&&w0-w<n).length}
function favNow(){let best=null,bn=0;for(const p of consorts()){if(p!==S&&(!p.alive||p.out))continue;const n=nightsIn(p,6);if(n>bn){bn=n;best=p}}return bn>=FAIRN.fav?{p:best,n:bn}:null}
function monopoly(){const f=favNow();if(!f)return"";const p=f.p,me=p===S,nm=me?"ngươi":p.name;let ev="";
 for(const v of liveRivals(true)){if(v===p||!v.alive||v.out)continue;if(me)v.ghen=cl((v.ghen||0)+2,0,100);else if((v.malice||0)>=40)oanAdd(v,p,BAL.eff.j75.monopoly)}
 if(!(p.admonWk!=null&&wk()-p.admonWk<BAL.tw.g.admonCd)&&roll(30)){const q=queenP();const who=q&&q!==p&&q!==S?`Hoàng hậu ${q.name}`:q===S&&!me?"ngươi (Hoàng hậu)":(!S.thDead?"Thái hậu":null);
  if(who&&!(q===S&&!me)){const b=p.sung;ap(p,{sung:-BAL.tw.g.admon});p.admonWk=wk();
   const t=`${who} khuyên Hoàng thượng “mưa móc đều khắp”, đừng chỉ sủng ${me?"ngươi":p.name} (${f.n} trong sáu đêm gần đây). ${b!==p.sung?`Sủng của ${me?"ta":p.name} ${b} → ${p.sung}; h`:"H"}ai tuần tới ngài để ý đến người khác.`;/* owner 11/15: name whose Sủng; no "30 → 30" */
   if(me)Q.push({t:"Mưa móc đều khắp",who:q&&q!==S?pv(q):pTH(),h:`<p>${t}</p>`});ev+=t+" "}}
 if(roll(25)){const L=consorts().filter(x=>x!==p&&(x===S||(x.alive&&!x.out)));const x=pick(L);if(x){const b=x.sung;ap(x,{sung:3});ev+=x===S?`Nhà ngươi thấy ${nm} độc sủng, dâng lễ vật xin Hoàng thượng để mắt đến ngươi.${b!==S.sung?` Sủng của ngươi ${b} → ${S.sung}.`:""} `:`Nhà ${x.name} thấy ${nm} độc sủng, dâng lễ vật xin Hoàng thượng để mắt đến con gái.${b!==x.sung?` Sủng của ${x.name} ${b} → ${x.sung}.`:""} `}}
 return ev}
window.favNow=favNow;
function satN(p){return Math.max(0,nightsIn(p,6)-1)}
{const ncS=nightCh;nightCh=function(p){p=p||S;const c=ncS.call(this,p);const k=satN(p);if(!c||!k||!FAIRN.sat)return c;return Math.max(1,Math.round(c*Math.max(FAIRN.satMin,1-FAIRN.sat*k)))}}
{const os0=oSteal;oSteal=function(a,m){const o=os0.apply(this,arguments);const k=a?satN(a):0;return k&&FAIRN.satO?cl(o-FAIRN.satO*k,5,95):o}}
/* the admonition is heeded for 2 tuần: a visible cause, shown in the news and in nightWhy */
const nc0=nightCh;nightCh=function(p){p=p||S;const c=nc0.call(this,p);if(c&&p.admonWk!=null&&wk()-p.admonWk>=0&&wk()-p.admonWk<=2)return Math.max(1,Math.round(c/2));return c};
/* (d) mùng 1 / rằm: custom sends him to the Hoàng hậu; (f) the data of why */
function whyRows(){const T=[];for(const p of consorts()){if(p!==S&&(!p.alive||p.out))continue;const w=nightCh(p)*(typeof empMemF==="function"?empMemF(p):1);const rs=[];
  try{if(w>0&&typeof empMemN==="function"&&empOn()&&empMemN(p))rs.push({k:"met",t:`Hoàng thượng còn nhớ việc ${p===S?"ngươi":"nàng"} làm gần đây`,pub:true})}catch(e){}
  if(p.preg&&!(p===S&&S.pregUnk))rs.push({k:"preg",t:"đang có thai",pub:!p.hidden||p===S});if(illOf(p))rs.push({k:"ill",t:illName(p),pub:true});if(p.confined)rs.push({k:"conf",t:"cấm túc",pub:true});if(p.out)rs.push({k:"out",t:"lãnh cung",pub:true});
  if(p.block)rs.push({k:"block",t:"thẻ bài bị giấu",pub:p===S?false:false});if(p.admonWk!=null&&wk()-p.admonWk<=2)rs.push({k:"admon",t:"vừa bị khuyên mưa móc đều khắp",pub:true});if(FAIRN.sat&&satN(p))rs.push({k:"sat",t:`đã được thị tẩm ${nightsIn(p,6)} đêm trong sáu tuần, ngài muốn đổi người`,pub:true});if(p.tablet)rs.push({k:"tablet",t:"đã đút lót Kính sự phòng",pub:p===S});
  T.push({id:p===S?"me":p.id,name:p===S?"Ngươi":p.name,rank:rkName(p),sung:p.sung,w,n6:nightsIn(p,6),reasons:rs})}
 const tot=T.reduce((a,x)=>a+x.w,0)||1;T.forEach(x=>x.share=Math.round(x.w*100/tot));return T.sort((a,b)=>b.w-a.w)}
const fl0=flip;flip=function(){let rows=null;try{rows=whyRows()}catch(e){}const r=fl0.apply(this,arguments);const t0=S&&S.tonight;let cause=S&&S.tonight?"tablet":"none";
 try{if(S&&!S.dead){const q=queenP();const CU=BAL.ag.emp.custom,tq=S.tuan===0?CU[0]:S.tuan===1?CU[1]:0;const cur=tonightOf();
  if(S.tonight&&q&&tq&&!ntTaken()&&cur!==q&&nightCh(q)>0&&(typeof empOn==="function"&&empOn()?empCustom(q,cur,tq):roll(tq))){const lost=cur;
   if(lost===S){for(let i=Q.length-1;i>=0;i--)if(Q[i].pid==="ksp")Q.splice(i,1);Q.push({t:"Kính sự phòng",who:pEunCourt?pEunCourt("ksp"):undefined,h:`<p>Thẻ bài của ngươi đã được lật, nhưng hôm nay là ${S.tuan===0?"mùng một":"rằm"}: theo lệ, Hoàng thượng nghỉ ở cung Hoàng hậu.</p>`})}
   S.tonight=q===S?"me":q;if(q===S)pushDil(mkP("ksp"),"Kính sự phòng báo tin");cause="custom"}
  else if(S.tonight&&ntTaken()&&ntTaken().who!=="me")cause="stolen";
  const t=tonightOf();S.nightWhy={wk:wk(),pick:t?(t===S?"me":t.id):null,flip0:t0?(t0==="me"?"me":t0.id):null/* the card he turned (KIT §67 card-flip) */,cause,day:S.tuan===0?"mùng một":S.tuan===1?"rằm":"",mood:MOODW[S.emp.mood],rows:rows||[],emp:S.empWhy&&S.empWhy.wk===wk()?Object.assign({},S.empWhy):null}}}catch(e){console.error(e)}return r};
window.nightWhy=function(){const d=S&&S.nightWhy;if(!d||d.wk!==wk())return null;const row=d.rows.find(x=>x.id===d.pick)||null;const tot=d.rows.reduce((a,x)=>a+x.w,0);
 const text=!d.pick?"Đêm nay Hoàng thượng không lật thẻ bài nào.":d.cause==="custom"?`Hôm nay là ${d.day}: theo lệ, Hoàng thượng nghỉ ở cung Hoàng hậu.`:d.cause==="stolen"?"Hoàng thượng bị mời sang cung khác giữa đường.":row?`${row.name}: Sủng ${row.sung} · dịp được lật thẻ: ${typeof chanceLvl==="function"?chanceLvl(row.share):word(row.share)} · ${row.n6} đêm trong sáu tuần gần đây · Hoàng thượng đang ${d.mood}`:"";
 let tx=text;try{const e=typeof empWhyTxt==="function"?empWhyTxt(d):"";if(e)tx=!d.pick?`${text} ${e}`:`${e} ${text}`}catch(x){}/* AG2: his own reason */
 return Object.assign({},d,{row,text:tx})};
})();
