/* ================= jlux — XA XỈ as one system (D17, owner 15/11 23:05Z + 23:15Z, ledger 71/210) =================
   Builds on what exists (no second luxury score, no second dress verdict):
   · luxury of a piece = jinv luxVal / jwdinv wdLux / jpet petLux (grade + price, derived from item data); worn total + rank allowance = luxOf(p).
   · the dress verdict = jtoil toilDress (hợp dịp / hợp phẩm / quá giản dị / quá phô trương / vượt phẩm / phạm tang) read by jaudit §17 leAttire.
   This module makes the verdict a RANGE per OCCASION (fractions of her rank allowance, BAL.lux.occ), shifted by the host's taste
   (frugal: nết Hiền lành/Nhu mì or — when review/personality is in — trọng Kiệm/Khiêm; etiquette: trọng Lễ; Hoàng thượng thích lộng lẫy),
   by quốc tang and by a frugal edict (Ý chỉ tiết kiệm). Too plain → thiếu lễ (jaudit, unchanged numbers) / Danh −; too lavish → Đức −,
   host frowns, rivals' ghen (jtoil crowd), a "tiếng xa hoa" reputation that can bring an edict; inside the range → small bonus.
   Default ranges = jtoil's old BAL.toil.dress thresholds, so a day with no modifier plays exactly as before.
   Public API (also for D19 Biếu quà làm lành): luxPiece(k) · luxRange(p,occ,host) · luxVerdict(p,occ,host) · luxCtx(p) · luxGift(k,from,to).
   Same rules for NPCs (serveTH, monthly reputation, edict). Co-op: S.luxEdict is a world key (one edict for the whole palace);
   reputation p.luxRep is per person. Display only through existing parts: act-card Kèm/risk line + "Vì sao" (jtoil/jaudit), event cards
   (Q), Hội phối đồ rows (kitRows via tsRows), result card / log. ================= */
Object.assign(BAL,{lux:{
 /* rank allowance (jinv luxAllow): base + perRank × rank (+ sungAdd from Sủng sungAt), + jwdinv wdBaseLux; above lv3 × allowance = jinv level 3 (Quá xa xỉ) */
 allow:{base:36,perRank:16,sungAt:60,sungAdd:10},lv3:1.5,
 /* occasion ranges, as fractions r = worn luxury / her allowance: below lo = quá giản dị, [fit0,fit1] = hợp dịp, above hi = quá phô trương
    (above 1 = beyond her rank's allowance: always phô trương, jinv lv 2+). F = formality used by jtoil reactions (0 thường, 1 thỉnh an, 2 yến/lễ). */
 occ:{thuong:{n:"ngày thường",F:0,lo:0,fit:[0,.62],hi:.9},
  thinhan:{n:"thỉnh an",F:1,lo:.2,fit:[.38,1],hi:1},
  yen:{n:"yến tiệc, lễ lớn",F:2,lo:.3,fit:[.55,1],hi:1},
  tang:{n:"quốc tang",F:1,lo:0,fit:[0,.35],hi:.5},
  edict:{n:"lệnh tiết kiệm",F:1,lo:0,fit:[.1,.45],hi:.55},
  lanh:{n:"lãnh cung",F:0,lo:0,fit:[0,.3],hi:.4}},
 /* host taste: frugal pulls the range down, etiquette / lavish taste pushes the floor up */
 host:{frugal:{fit:.8,hi:.85},strict:{lo:1.25},lay:{lo:1.2,fit0:1.15}},
 /* extra consequences at a formal moment (F ≥ 1), once per host per day (jtoil toilSeen), all shown on the card first */
 showDuc:-1,          /* quá phô trương / vượt phẩm before a superior: Đức −1 */
 edictDuc:-2,edictDanh:-1,/* above the edict's range while it stands: Đức −2, Danh −1 (instead of showDuc) */
 tangDuc:-2,          /* lavish (not red/yellow — j92 punishes that) in quốc tang */
 fitDanh:1,           /* hợp dịp at a festival / yến (F 2): Danh +1 */
 plainDanh:-1,        /* quá giản dị at a festival / yến (F 2), unless the strict-host Danh already applies */
 /* reputation "tiếng xa hoa" p.luxRep 0..12 (monthly): +1 above her allowance (jinv lv 2), +2 far above (lv 3), +1 per phô trương verdict taken (max 2), −1 otherwise */
 repMax:12,repOn:6,repDanh:-1,repTh:-2,
 /* frugal edict: when ≥ edictN people in the palace have tiếng xa hoa (a frugal Thái hậu: edictNF), chance edictP each month, lasts edictM months,
    not again within edictCd months. While it stands: everyone above its range at month end Đức −2 (her: also Thái hậu −2); plain dress 1 in 3 Đức +1 */
 edictN:4,edictNF:3,edictP:25,edictM:3,edictCd:24,edictTh:-2,
 plainP:33,plainDuc:1,/* under the edict, plain dress within its range: chance a month of praise, and the Đức it gives */
 npcCalm:70,npcCalmProud:25,/* chance an NPC with tiếng xa hoa (or above an edict) dresses one phẩm lower that month */
 lanhDuc:-1,          /* lavish dress in lãnh cung (monthly) */
 /* Hội phối đồ: theme range is absolute (4 pieces), capped by her allowance; a floor never above capLo × allowance */
 capLo:.45,ctFit:3,ctShow:1,ctOver:-2,ctPlainK:4,ctPlainMin:-1,ctDuc:-1,
 /* gifts (D19 Biếu quà làm lành): piece luxury vs the receiver's allowance — below lo = mọn, above hi = quá hậu (đút lót / vượt lễ) */
 gift:{lo:.08,fit:[.15,.45],hi:.6}}});

/* ---------- one luxury number per piece (wardrobe piece → wdLux; jewellery / fabric → luxVal; pet → petLux) ---------- */
function luxPiece(k){try{if(typeof WD_ITEMS==="object"&&WD_ITEMS[k])return wdLux(k);if(typeof PET==="object"&&PET[k]&&typeof petLux==="function")return petLux(k);return IT[k]?luxVal(k):0}catch(e){return 0}}
window.luxPiece=luxPiece;

/* ---------- the context that overrides the occasion: quốc tang > lệnh tiết kiệm > lãnh cung ---------- */
function luxEdictOn(){try{const E=S&&S.luxEdict;return !!(E&&E.until>S.turn)}catch(e){return false}}
function luxCtx(p){p=p||S;try{if(typeof wdTang==="function"&&wdTang())return"tang";if(luxEdictOn())return"edict";if(p&&p.out)return"lanh"}catch(e){}return""}
/* host taste (soft hook on review/personality: trọng Kiệm/Khiêm → frugal, Lễ → strict) */
function luxTrong(host){try{if(typeof trongOf==="function"&&host&&host!=="emp")return trongOf(host)||[]}catch(e){}return[]}
(function(){if(typeof leHostKind!=="function")return;const h0=leHostKind;leHostKind=function(host){const k=h0.apply(this,arguments);if(k!=="normal")return k;
 const T=luxTrong(host);if(T.includes("Kiệm")||T.includes("Khiêm"))return"frugal";if(T.includes("Lễ"))return"strict";return k};window.leHostKind=leHostKind})();
function luxHostKind(host){try{if(host==="emp")return typeof toilEmpTaste==="function"&&toilEmpTaste()==="lay"?"lay":"";if(host)return leHostKind(host)}catch(e){}return""}
const LUX_F=["thuong","thinhan","yen"];
/* the range in fractions + absolute points for this person, occasion and host */
function luxRange(p,occ,host){p=p||S;const B=BAL.lux;if(typeof occ==="number")occ=LUX_F[Math.max(0,Math.min(2,occ|0))];
 const base=B.occ[occ]||B.occ.thuong;const ctx=luxCtx(p);let o={lo:base.lo,fit:base.fit.slice(),hi:base.hi};const why=[];
 /* mourning / edict / lãnh cung cap the range (the stricter wins); the floor of a formal occasion stays (thiếu lễ still exists, mourning white is issued) */
 if(ctx){const c=B.occ[ctx];o={lo:Math.min(o.lo,c.lo),fit:[Math.min(o.fit[0],c.fit[0]),Math.min(o.fit[1],c.fit[1])],hi:Math.min(o.hi,c.hi)};why.push(c.n)}
 const hk=luxHostKind(host),M=B.host[hk];
 if(M){if(M.fit){o.fit=[o.fit[0]*M.fit,o.fit[1]*M.fit];o.hi=Math.min(o.hi,o.hi*(M.hi||M.fit))}if(M.lo)o.lo=o.lo*M.lo;if(M.fit0)o.fit[0]=Math.min(o.fit[1],o.fit[0]*M.fit0)}
 o.lo=Math.min(o.lo,o.fit[0]);o.hi=Math.max(o.hi,o.fit[1]);
 let bud=1;try{bud=luxOf(p).bud||1}catch(e){}
 return{occ,ctx,hk,n:ctx?B.occ[ctx].n:base.n,F:base.F,lo:o.lo,fit:o.fit,hi:o.hi,bud,pts:{lo:Math.round(o.lo*bud),fit:[Math.round(o.fit[0]*bud),Math.round(o.fit[1]*bud)],hi:Math.round(o.hi*bud)},why}}
window.luxRange=luxRange;
/* the verdict (one place): v = hopdip | hoppham | giandi | photruong | vuot | tang  (jtoil TOIL_DV words) */
function luxVerdict(p,occ,host){p=p||S;const R=luxRange(p,occ,host);let st="ok";try{st=wdStatus(p)}catch(e){}
 let x={lv:1,sc:0,bud:1};try{x=luxOf(p)}catch(e){}const r=x.bud?x.sc/x.bud:0;const out=(v,style)=>({v,style,sc:x.sc,r,R,word:(typeof TOIL_DV==="object"&&TOIL_DV[v])||v});
 if(st==="tang")return out("tang","showy");
 let vp=0;try{vp=(vpItems(p)||[]).length}catch(e){}if(st==="over"||vp)return out("vuot","showy");
 if(x.lv>=2)return out("photruong","showy");
 let d=0;try{d=wdLevel(p)-Math.min(8,wdPOf(p))}catch(e){}const B=BAL.toil&&BAL.toil.dress?BAL.toil.dress[Math.max(0,Math.min(2,R.F|0))]:{under:-9,fitD:-9};
 if(d<=B.under||r<R.lo)return out("giandi","plain");if(r>R.hi)return out("photruong","showy");
 if(d>=B.fitD&&r>=R.fit[0]&&r<=R.fit[1])return out("hopdip","fit");return out("hoppham","fit")}
window.luxVerdict=luxVerdict;

/* ---------- jtoil: the dress verdict reads the range (same thresholds by default; the host of the moment shifts it) ---------- */
let LUX_HOST=null;
if(typeof toilDress==="function"){toilDress=function(p,F,host){const V=luxVerdict(p,F,host!==undefined?host:LUX_HOST);return{v:V.v,style:V.style,sc:V.sc,R:V.R}}}
/* extra consequences of the verdict at a formal moment (shown first: they join toilFx's delta → leAttire → card Kèm / Vì sao / applied) */
function luxExtra(p,host,F,V){const B=BAL.lux,o={danh:0,duc:0,why:[]};if(!V||(F|0)<1)return o;const ctx=V.R&&V.R.ctx;
 if(V.v==="photruong"||V.v==="vuot"){if(ctx==="edict"){o.duc+=B.edictDuc;o.danh+=B.edictDanh;o.why.push("trái lệnh tiết kiệm")}
  else if(ctx==="tang"&&V.v==="photruong"){o.duc+=B.tangDuc;o.why.push("xa hoa giữa quốc tang")}else{o.duc+=B.showDuc;o.why.push("xa xỉ quá dịp")}}
 else if(F>=2&&V.v==="hopdip"){o.danh+=B.fitDanh;o.why.push("hợp dịp lễ lớn")}
 else if(F>=2&&V.v==="giandi"){o.danh+=B.plainDanh;o.why.push("quá giản dị giữa lễ lớn")}
 return o}
if(typeof toilFx==="function"){const tf0=toilFx;toilFx=function(p,host,F,baseState){const ph=LUX_HOST;LUX_HOST=host;let t;try{t=tf0.apply(this,arguments)}finally{LUX_HOST=ph}
 try{if(!toilOn(p)||(p===S&&toilSeen(host)))return t;
  let V=null;if(!baseState||baseState==="ok"||baseState==="showy"||baseState==="overRank")V=luxVerdict(p,F,host);
  const X=luxExtra(p,host,F,V);if(!X.danh&&!X.duc){if(t&&V)t.lux=V;return t}
  if(t&&t.hk==="strict"&&t.danh&&X.danh<0)X.danh=0;/* the strict host's plain Danh already counts */
  if(!X.danh&&!X.duc){if(t&&V)t.lux=V;return t}
  t=t||{aff:0,danh:0,duc:0,why:[],hk:toilHostKind(host),dress:V&&V.v,mk:""};t.danh=(t.danh||0)+X.danh;t.duc=(t.duc||0)+X.duc;t.lux=V;
  const lab=`Xa xỉ ${V?V.sc:0} giữa dịp ${V&&V.R?V.R.n:""}: ${X.why.join(", ")}`;/* the numbers are in the rider's total */
  const i=t.why.findIndex(w=>/^y phục /.test(w[0]));if(i>=0)t.why[i]=[`${t.why[i][0]} (${lab})`,t.why[i][1]];else t.why.push([`y phục ${V?V.word:""} (${lab})`,0]);
  return t}catch(e){console.error("lux toilFx",e);return t}}}
/* thiếu lễ (jaudit) does not fire in mourning white or under a frugal edict — plain is what is asked then */
(function(){if(typeof aaThieuLe0!=="function")return;const a0=aaThieuLe0;aaThieuLe0=function(p){try{const c=luxCtx(p);if(c==="tang"||c==="edict")return false}catch(e){}return a0.apply(this,arguments)}})();
/* her phô trương verdicts taken count toward the reputation */
(function(){if(typeof aaThieuLeApply!=="function")return;const ap0=aaThieuLeApply;aaThieuLeApply=function(host,f0){let L=null;try{L=leAttire(S,"",host)}catch(e){}const r=ap0.apply(this,arguments);
 try{const V=L&&L.toil&&L.toil.lux;if(V&&(V.v==="photruong"||V.v==="vuot")&&(f0||L.delta)&&((f0||L.delta).duc||(f0||L.delta).aff))S.luxRepD=Math.min(2,(S.luxRepD|0)+1)}catch(e){}return r}})();
/* NPCs waiting on Thái hậu: the same extra (Đức), at most once a month (they wait on her far more often than she can) — jtoil applies regard and Danh */
(function(){try{if(typeof SOC==="object"&&SOC.serveTH){const r0=SOC.serveTH.run;SOC.serveTH.run=function(v){const r=r0.apply(this,arguments);
 try{if(v&&v!==S&&toilOn(v)&&v.luxXM!==S.turn){const F=toilFOf("th");const X=luxExtra(v,"th",F,luxVerdict(v,F,"th"));if(X.duc){ap(v,{duc:X.duc});v.luxXM=S.turn}}}catch(e){}return r}}}catch(e){}})();
/* NPCs: their dress verdict is their real clothes (j92 dresses them by nết each month), not a dice look */
(function(){if(typeof toilNpc!=="function")return;const n0=toilNpc;toilNpc=function(v){const o=n0.apply(this,arguments);try{let x=null;try{x=luxOf(v)}catch(e){}
 if(x&&x.sc>0){const V=luxVerdict(v,toilFOf("th"),"th");o.dv=V.v==="tang"||V.v==="vuot"?"photruong":V.v;o.style=V.style}}catch(e){}return o}})();

/* ---------- monthly: reputation (tiếng xa hoa), the frugal edict, lãnh cung ---------- */
function luxRepTick(p){const B=BAL.lux;let x={lv:1};try{x=luxOf(p)}catch(e){}const add=(x.lv>=3?2:x.lv>=2?1:0)+(p===S?Math.min(2,S.luxRepD|0):0);if(p===S)S.luxRepD=0;
 p.luxRep=cl((p.luxRep|0)+(add||-1),0,B.repMax);return p.luxRep}
function luxXaHoa(p){return (p.luxRep|0)>=BAL.lux.repOn}
window.luxXaHoa=luxXaHoa;
/* co-op: the edict is a WORLD key — only the host rolls it; the guest gets it with the week's world and is told once (luxEdictSeen is hers) */
const luxGuest=()=>{try{return !!(window.COOPW&&COOPW.on&&COOPW.seat==="b")}catch(e){return false}};
function luxEdictCard(E){const B=BAL.lux;const q=typeof queenP==="function"?queenP():null;const by=E.by;const who=by==="th"?"Thái hậu":by==="hh"&&q?`Hoàng hậu ${q.name}`:"Hoàng thượng";const me=luxXaHoa(S);S.luxEdictSeen=E.at;
 try{Q.push({t:"Ý chỉ tiết kiệm",who:by==="th"?pTH():by==="hh"&&q?pv(q):pEmp(),h:`<p>${who} nghe lục cung chuộng xa hoa, ban ý chỉ: ${B.edictM} tháng tới hậu cung phải tiết kiệm, y phục trang sức giản dị.</p>`+
  (typeof kitRows==="function"?kitRows([["Trong ba tháng","ăn vận xa xỉ quá lệnh: Đức "+B.edictDuc+", bề trên phật ý","r"],["Ăn vận giản dị",`có khi được khen: Đức +${B.plainDuc}`,"g"],["Thỉnh an","mặc giản dị không bị coi là thiếu lễ","n"]].concat(me?[["Tiếng xa hoa","ngươi cũng bị nhắc tên trong số người phô trương","r"]]:[])):"")})}catch(e){}
 return `${who} ban ý chỉ tiết kiệm ba tháng. `}
function luxEdictTry(){const B=BAL.lux;if(!S||S.dead)return"";
 if(luxGuest()){const E=S.luxEdict;return E&&E.until>S.turn&&E.at!=null&&S.luxEdictSeen!==E.at?luxEdictCard(E):""}
 if(luxEdictOn())return"";
 const E=S.luxEdict;if(E&&E.at!=null&&S.turn-E.at<B.edictCd)return"";
 const C=[S].concat(liveRivals(true)).filter(p=>p&&p.alive!==false);const n=C.filter(luxXaHoa).length;let fr=false;try{fr=!S.thDead&&leHostKind("th")==="frugal"}catch(e){}
 if(n<(fr?B.edictNF:B.edictN)||!roll(B.edictP))return"";
 const q=typeof queenP==="function"?queenP():null;const by=!S.thDead?"th":q&&q!==S?"hh":"emp";
 S.luxEdict={until:S.turn+B.edictM,at:S.turn,by};return luxEdictCard(S.luxEdict)}
function luxMonthX(p){const B=BAL.lux;let r="";const me=p===S;if(!p||p.alive===false)return"";
 let x={lv:0,sc:0,bud:1};try{x=luxOf(p)}catch(e){}const ratio=x.bud?x.sc/x.bud:0;
 if(p.out){if(ratio>B.occ.lanh.hi){if(me){apply({duc:B.lanhDuc});r+=`Ở lãnh cung mà còn ăn vận xa xỉ, người ta chê ngươi không biết hối lỗi. Đức ${B.lanhDuc}. `}else ap(p,{duc:B.lanhDuc})}return r}
 const was=luxXaHoa(p);const rep=luxRepTick(p);
 if(rep>=B.repOn){if(me){apply({danh:B.repDanh});if(!S.thDead)apply({th:B.repTh});r+=`Hậu cung gọi ngươi là người xa hoa${!was?" (tiếng xa hoa mới nổi)":""}. Danh ${B.repDanh}${!S.thDead?`, Thái hậu ${B.repTh}`:""}. `}
  else{ap(p,{danh:B.repDanh});p.th=cl((p.th||0)+B.repTh,-100,100)}}
 else if(was&&me)r+="Tiếng xa hoa của ngươi đã lắng. ";
 if(luxEdictOn()){const R=luxRange(p,"thinhan");if(ratio>R.hi){if(me){apply({duc:B.edictDuc});if(!S.thDead&&S.luxEdict.by==="th")apply({th:B.edictTh});r+=`<span class="r">Ngươi ăn vận quá lệnh tiết kiệm. Đức ${B.edictDuc}${!S.thDead&&S.luxEdict.by==="th"?`, Thái hậu ${B.edictTh}`:""}.</span> `}else ap(p,{duc:B.edictDuc})}
  else if(x.sc>0&&ratio<=R.fit[1]&&roll(B.plainP)){if(me){apply({duc:B.plainDuc});r+=`Ngươi giữ lệnh tiết kiệm, được khen. Đức +${B.plainDuc}. `}else ap(p,{duc:B.plainDuc})}}
 /* NPCs learn: with tiếng xa hoa or above an edict they tone down (nết Kiêu ngạo / Tham vọng seldom) — j92 wdAutoFor one phẩm lower */
 if(!me){try{const over=luxXaHoa(p)||(luxEdictOn()&&ratio>luxRange(p,"thinhan").hi);const t=traitsOf(p);
  if(over&&roll(t.some(x=>x==="Kiêu ngạo"||x==="Tham vọng")?BAL.lux.npcCalmProud:BAL.lux.npcCalm)&&typeof wdAutoFor==="function")wdAutoFor(p,-1)}catch(e){}}
 return r}
if(typeof luxMonth==="function"){const lm0=luxMonth;luxMonth=function(p){let r="";try{r=lm0.apply(this,arguments)||""}catch(e){}try{r+=luxMonthX(p);if(p===S)r+=luxEdictTry()}catch(e){console.error("luxMonth",e)}return r}}
/* co-op: one edict for the palace — "luxEdict" is in jcoopworld W_KEYS */

/* ---------- theme tags for EVERY wearable, derived from colour / material / name (no hand list), read by kidThemes + Hội phối đồ ---------- */
const LUX_TH={thanh:{col:["xanh","trang","lam"],re:/ngọc|lụa|lan|trúc|bạc|thúy|thủy/i},
 phu:{col:["vang","do"],re:/vàng|gấm|phượng|kim|minh hoàng|bộ diêu|long|triều/i},
 huong:{col:["hong","tim"],re:/son|phấn|hương|thơm|hồng|mẫu đơn/i},
 xuan:{col:["hong"],re:/hoa|đào|mai|hải đường|xuân|điệp|lụa/i},
 co:{col:["nau"],re:/gỗ|đồng|cổ|vân|hạc|điền|chồn|bông|lam/i}};
/* whole words only ("thạch" is not "hạc", "Hòa Điền" stays a place): letters on either side break the match */
for(const t in LUX_TH)LUX_TH[t].re=new RegExp(`(?<!\\p{L})(?:${LUX_TH[t].re.source})(?!\\p{L})`,"iu");
function luxThemesOf(k){const L=[];try{const w=typeof WD_ITEMS==="object"?WD_ITEMS[k]:null,it=IT[k];const nm=(w&&w.n)||(it&&it.n)||"",col=w?w.col:"";
 for(const t in LUX_TH){const D=LUX_TH[t];if((col&&D.col.includes(col))||D.re.test(nm))L.push(t)}}catch(e){}return L}
window.luxThemesOf=luxThemesOf;
/* fills TS_THEME[t].tags (jts) with every wearable that fits, keeping the hand-picked ones */
function luxThemeTags(TH){try{const keys=new Set(Object.keys(IT).filter(k=>IT[k]&&(IT[k].sl||IT[k].dr||IT[k].wsl||["sonphan","tuithom","huongtram"].includes(k))));
 if(typeof WD_ITEMS==="object")for(const k in WD_ITEMS)if(k!=="y_tang")keys.add(k);
 for(const k of keys)for(const t of luxThemesOf(k))if(TH[t]&&!TH[t].tags.includes(k))TH[t].tags.push(k)}catch(e){console.error("luxThemeTags",e)}}
window.luxThemeTags=luxThemeTags;
/* Hội phối đồ range for this person: the theme's absolute range, capped by her allowance (floor ≤ capLo × allowance) */
function luxThemeRange(p,T){let bud=1;try{bud=luxOf(p).bud}catch(e){}const r=T&&T.r||[40,120];const hi=Math.min(r[1],bud),lo=Math.min(r[0],Math.round(bud*BAL.lux.capLo),hi);return{lo,hi,bud,r}}
window.luxThemeRange=luxThemeRange;

/* ---------- gifts (for D19 Biếu quà làm lành): a piece's luxury vs the receiver's allowance ---------- */
function luxGift(k,from,to){const G=BAL.lux.gift;const v=typeof k==="number"?k:luxPiece(k);let bud=1;try{bud=luxOf(to||S).bud||1}catch(e){}const r=v/bud;
 const st=r<G.lo?"mon":r>G.hi?"hau":r>=G.fit[0]&&r<=G.fit[1]?"hop":"vua";
 return{v,r,bud,st,word:{mon:"quà mọn",vua:"vừa lễ",hop:"hợp lễ",hau:"quá hậu"}[st],pts:{lo:Math.round(G.lo*bud),fit:[Math.round(G.fit[0]*bud),Math.round(G.fit[1]*bud)],hi:Math.round(G.hi*bud)}}}
window.luxGift=luxGift;

/* ---------- LUẬT SỬA CẢ NHÓM: a Hành sự card copied from a talk option (j2 directActs: Thỉnh an Thái hậu / Hoàng hậu …) dropped the option's
   side line (a.risk): thiếu lễ, the day's look and the luxury verdict were applied but never shown on the deck card. The deck card (j19 cardH)
   already has a Kèm row for " · kèm: …" in a.x — every card with a risk now uses it (display copy; the act itself is untouched). ---------- */
(function(){if(typeof cardH!=="function")return;const c0=cardH;cardH=function(a,i){try{if(a&&typeof a.risk==="string"&&a.risk&&!/ · kèm: /.test(a.x||"")){const b=Object.assign({},a,{x:(a.x||"")+" · kèm: "+a.risk});return c0.call(this,b,i)}}catch(e){}return c0.apply(this,arguments)}})();
/* the rider words: a frugal host pleased by plain dress is not "thiếu lễ" (jtoil's head said so when the look added a line) */
(function(){if(typeof aaThieuLeTxt!=="function")return;const t0=aaThieuLeTxt;aaThieuLeTxt=function(host,f0){const s=t0.apply(this,arguments);try{const L=leAttire(S,"",host);
 if(L.state==="plain"&&luxHostKind(host)==="frugal"&&(f0||L.delta).duc>=0){const who=host==="th"?"Thái hậu":host==="emp"?"Hoàng thượng":host&&host.queen?"Hoàng hậu":"chủ nhà";return s.replace(/^thiếu lễ \([^)]*\)/,`y phục giản dị hợp ý ${who}`)}}catch(e){}return s}})();
