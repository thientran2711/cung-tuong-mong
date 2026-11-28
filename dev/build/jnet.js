/* ================= ONE TRAIT POOL engine (owner 17/11 05:45Z–06:20Z, review/trait-pool) =================
   THE table is BAL.net (jbal2.js). Everyone except the Emperor (S.emp.traits / ETRAITS) and Thái hậu (TH_ARCH) holds
   p.net = [Tính tình, Lòng dạ, Chí hướng]: one nết per group, female or male pool by sex, same formulas for all.
   One lookup per person (netOf / traitsOf) and per nết (BAL.net.T[t]) — SHOW-WHY, greeting names, AG-MEET and voice build on these:
     traitsOf(p) → 3 names · hasT(p,t) · netQ(p,k) quality sum · netIs(p,k) quality on · nq(p,k,n) n × quality ·
     tv(tbl,p,def) first of her nết found in a nết-keyed table · netRx(p,re) · netTxt(p) · netRow(t) the table row.
   Deterministic draw (hash of the person key, like trongOf) so co-op seats and reloads agree. Old saves: the old 1–2 nết
   (.trait/.trait2, servants .tr/.tr2, men .trait) map into their groups (BAL.net.old), the missing groups are drawn. */
(function(){const N=BAL.net;for(const t in N.T){PERS[t]=N.T[t];if(N.T[t].v)TR_V[t]=N.T[t].v;if(N.T[t].ban)TR_BAN[t]=N.T[t].ban;if(N.T[t].fade&&BAL.mem&&BAL.mem.fadeT)BAL.mem.fadeT[t]=N.T[t].fade}})();
function netRow(t){return BAL.net.T[t]||null}
function netMix(s){let h=trHash(s);h^=h>>>13;h=Math.imul(h,0x5bd1e995)>>>0;h^=h>>>15;return h>>>0}
function netSex(p){if(!p||p===S)return"f";if(p.sex==="m"||p.male)return"m";if(p.sex==="f")return"f";
 if(p.isMin||p.role==="eunuch"||p.role==="eun"||p.kind==="ty"||p.kind==="man"||p.rw!=null)return"m";
 if(typeof p.id==="string"&&/^m\d/.test(p.id))return"m";if(p.r==="cha"||/^huynh/.test(p.r||""))return"m";return"f"}
function netKey(p){return p===S||p.coop||p.id===901||p.id===902?"me:"+(p.name||""):p.sid!=null?"s:"+p.sid:p.id!=null?"id:"+p.id+":"+(p.name||""):"n:"+(p.name||"")}
function netOk(n,sx){const P=BAL.net[sx==="m"?"M":"F"];return Array.isArray(n)&&n.length===3&&P.tt.includes(n[0])&&P.ld.includes(n[1])&&P.ch.includes(n[2])}
/* the old nết this person carried (only string words the old map knows) */
function netOldOf(p){const O=BAL.net.old;return [p.trait,p.trait2,p.tr,p.tr2].filter(x=>typeof x==="string"&&(O[x]||BAL.net.T[x])).map(x=>O[x]||x)}
function netDraw(p,key,sx,seed){const N=BAL.net,P=N[sx==="m"?"M":"F"],out={};
 for(const t of seed||[]){const t2=sx==="m"?(N.toM[t]||t):(N.toF[t]||t);const r=N.T[t2];if(r&&P[r.g].includes(t2)&&!out[r.g])out[r.g]=t2}
 for(const g of ["tt","ld","ch"])if(!out[g])out[g]=P[g][netMix(key+"#net:"+g)%P[g].length];
 return [out.tt,out.ld,out.ch]}
function netOf(p0){let p;try{p=trRes(p0)}catch(e){p=p0}if(!p||p==="th"||typeof p!=="object"||(S&&p===S.emp)||p.kind==="emp"||p.kind==="th")return null;
 const sx=netSex(p);if(netOk(p.net,sx))return p.net;
 const seed=(Array.isArray(p.net)?p.net:[]).concat(p===S||p.coop?[]:netOldOf(p));
 const n=netDraw(p,netKey(p),sx,seed);try{p.net=n;netTrong(p)}catch(e){}return n}
/* first trọng follows the Lòng dạ nết; the second (1 of 13) stays */
function netTrong(p){if(!Array.isArray(p.trong)||p.trong.length!==2)return;const ld=p.net[1],R=BAL.net.T[ld];if(!R||!R.v)return;const ban=new Set(R.ban||[]);
 if(p.trong[0]===R.v)return;const two=p.trong[1]!==R.v&&!ban.has(p.trong[1])?p.trong[1]:p.trong[0]!==R.v&&!ban.has(p.trong[0])?p.trong[0]:null;
 if(two)p.trong=[R.v,two];else delete p.trong}
(function(){const t0=traitsOf;traitsOf=function(p){try{const n=netOf(p);if(n)return n.slice()}catch(e){}return t0.apply(this,arguments)}})();
/* jtrong's trọng reads trTraits: same pool for everyone (co-op friend included) */
(function(){const r0=trTraits;trTraits=function(p){try{const n=netOf(p);if(n)return [n[1],n[0],n[2]]}catch(e){}return r0.apply(this,arguments)}})();
/* the balance-law line of a nết (gain + cost), for tooltips and the coming SHOW-WHY row */
function netTip(t){const R=BAL.net.T[t];return R?`Được: ${R.gain}. Mất: ${R.cost}.`:""}
/* nv(p,key): the value of a nết-keyed table BAL.net.n[key] for p — keys tested in order (nết name → hasT, "q:<quality>" → netIs), first hit wins, else "_" */
function nv(p,key){const M=BAL.net.n[key];if(!M)return 0;try{if(p)for(const k in M){if(k==="_")continue;if(k.startsWith("q:")?netIs(p,k.slice(2)):hasT(p,k))return M[k]}}catch(e){}return M._!=null?M._:0}
function hasT(p,t){try{return traitsOf(p).includes(t)}catch(e){return false}}
function netRx(p,re){try{return re.test(traitsOf(p).join(" "))}catch(e){return false}}
function netTxt(p,sep){try{return traitsOf(p).join(sep||", ")}catch(e){return""}}
function tv(tbl,p,def){try{for(const t of traitsOf(p))if(tbl&&tbl[t]!=null)return tbl[t]}catch(e){}return def}
function netQ(p,k){let v=0;try{for(const t of traitsOf(p)){const R=BAL.net.T[t];if(R&&R.q&&R.q[k])v+=R.q[k]}}catch(e){}const C=BAL.net.qClamp;return Math.max(C[0],Math.min(C[1],v))}
function netIs(p,k){return netQ(p,k)>=BAL.net.qOn}
/* a table keyed by servant-quality codes (trung/tham/nhat/lanh/chuyen): value of her strongest quality that is on */
function qv(tbl,p,def){let best=null,bq=-9;try{const C=BAL.net.qCode;for(const c in C)if(tbl&&tbl[c]!=null){const q=netQ(p,C[c]);if(q>=BAL.net.qOn&&q>bq){bq=q;best=tbl[c]}}}catch(e){}return best!=null?best:def}
function nq(p,k,n){return Math.round(n*netQ(p,k))}
/* malice of a new consort: base + her 3 nết + spread */
function netMal(v){let m=BAL.net.malBase;for(const t of traitsOf(v)){const R=BAL.net.T[t];if(R&&R.mal)m+=R.mal}return cl(m+R(20)-10,0,100)}
/* PERS fields: dang / mal add, harmGate takes the highest, the rest multiply (before: harmGate × 0 never worked) */
persF=function(p,f,def){let v=def;for(const t of traitsOf(p)){const P=PERS[t];if(P&&P[f]!=null)v=f==="dang"||f==="mal"?v+P[f]:f==="harmGate"?Math.max(v,P[f]):v*P[f]}return v};
/* new consorts: 3 nết drawn at once, malice from them (.trait stays only as the figure look key, FIGURES.json) */
spreadTraits=function(){const A=[...TRAITS,...TRAITS].sort(()=>Math.random()-.5);rivals.forEach((v,i)=>{v.trait=A[i%A.length][0];delete v.trait2;delete v.net;v.net=netDraw(v,netKey(v),"f");v.malice=netMal(v)})};
/* ensureT2 (old saves without a 2nd nết) → the pool, seeded from the old nết; a brand-new consort draws fresh (look key .trait is no seed) */
ensureT2=function(v){if(v)try{netOf(v)}catch(e){}return v};
(function(){const n0=newRival;newRival=function(){const v=n0.apply(this,arguments);try{if(v){delete v.trait2;v.net=netDraw(v,netKey(v),netSex(v));if(v.malice!=null)v.malice=netMal(v)}}catch(e){}return v}})();
/* known nết in old saves were stored under old words */
(function(){const k0=trKnown;trKnown=function(v){const K=k0.apply(this,arguments);try{const O=BAL.net.old;for(let i=0;i<K.length;i++)if(O[K[i]]&&K[i]!==O[K[i]])K[i]=O[K[i]];const T=traitsOf(v);for(let i=K.length-1;i>=0;i--)if(!T.includes(K[i]))K.splice(i,1)}catch(e){}return K}})();
/* old saves: every person gets p.net on load (netOf migrates lazily too; this makes the save itself carry it) */
function netMigrateAll(){if(!S)return;try{const L=[S].concat(typeof rivals!=="undefined"?rivals:[],S.staff||[],S.maid?[S.maid]:[],S.men||[]);
 for(const r of (typeof rivals!=="undefined"?rivals:[]))for(const s of r.staff||[])L.push(s);for(const p of L)if(p&&typeof p==="object")netOf(p);delete S.pTr;if(S.thTrait&&BAL.net.old[S.thTrait])S.thTrait=BAL.net.old[S.thTrait]}catch(e){}}
(function(){if(typeof deser!=="function")return;const d0=deser;deser=function(){const r=d0.apply(this,arguments);netMigrateAll();return r}})();
/* ================= NẾT THRESHOLDS (review/net-build; BAL.net.th — jbal2.js) =================
   netTh(p,key): the relation level of person p for key (base + her 3 nết offsets, clamped). Every relation gate reads this, never a typed number (law 4);
   same rule for her (S.net) and for everyone else (law 1). Thái hậu = holder "th": her ONE pool nết is her archetype's (TH_ARCH[..].trait via
   traitsOf("th"): Ân cần / Thật thà / Kín đáo / Kiêu ngạo / Mê tín), so a Từ ái Thái hậu warms sooner than a Quyền uy one (ROW 9; every
   S.th / p.th gate reads netTh("th",key), scan dev/measure/th-scan.py). Emperor (ETRAITS, no pool nết) → the base. */
/* PERF (net-build-rv fix 4): netTh and the band shifts depend ONLY on the holder's 3 nết, so they are kept per person and recomputed when her nết array
   changes (p.net is only ever replaced, never edited in place: a redraw / migration / a test setting S.net = a new array → a miss). People without
   a p.net array (Emperor; Thái hậu "th", one nết) are computed each time. No behaviour change: same numbers, fewer traitsOf walks. */
const NET_MEMO=new WeakMap();
function netMemo(p){if(!p||typeof p!=="object"||!Array.isArray(p.net))return null;let m=NET_MEMO.get(p);if(!m||m.n!==p.net){m={n:p.net,v:{},b:null};NET_MEMO.set(p,m)}return m}
function netTh(p,key){const m=netMemo(p);if(m&&m.v[key]!==undefined)return m.v[key];const r=netTh0(p,key);const m2=netMemo(p);if(m2)m2.v[key]=r;return r}
function netTh0(p,key){const N=BAL.net,b=N.th[key];if(b==null)return 0;let o=0;try{const F=N.thFrom[key];for(const t of (p==="th"||(p&&typeof p==="object")?traitsOf(p):[])){const R=N.T[t];if(!R||!R.th)continue;
  if(R.th[key]!=null)o+=R.th[key];else if(F&&R.th[F[0]]!=null)o+=R.th[F[0]]*F[1]}}catch(e){}const C=N.thClamp[key];return C?Math.max(C[0],Math.min(C[1],Math.round(b+o))):Math.round(b+o)}
/* ROW 9 r3 (rv FAIL 4): the Hoàng hậu holds a pool nết (queenP() is a consort), so every gate on HER regard (S.hh toward the player, p.hh toward a consort)
   reads her own level, like the Thái hậu's netTh("th",key): netHh(key) = netTh(the reigning Hoàng hậu, key); no Hoàng hậu (or the player holds the seat) →
   the base level. Scan: dev/measure/th-scan.py (holder hh). */
function hhHolder(){try{const q=typeof queenP==="function"?queenP():null;return q&&typeof q==="object"&&q!==S?q:null}catch(e){return null}}
function netHh(key){return netTh(hhHolder(),key)}
/* a lighter gate: share k (BAL.net.thK[k]) of p's level of key */
function netThK(p,key,k){return Math.round(netTh(p,key)*BAL.net.thK[k])}
/* a mark ABOVE the top level (Thái hậu 70 / 80 / 85 — BAL.ag.why.cmood.thHi, hhNeed .th, BAL.ag.why.g2pet.kyTh keep their own key): the same mark moved by p's nết exactly as her «key» level moves, capped at 100 */
function netAt(p,key,v,rk,st){const r=Math.min(100,Math.round(v+netTh(p,key)-BAL.net.th[key]));const h=p==="th"?thHold(rk):paceHold(st,rk);return h!=null?Math.max(Math.min(r,h),netTh(p,key)):r}/* never below her own «key» level (the mark stays a mark above it) */
/* ROW 9 r3: the highest Thái hậu regard a mark may ask for (rk = the rank the mark is asked at; none = gift ceiling only) = the lower of where her gift
   gains end (jtrong trThDeed: A.cap + thGiftCap + thGiftSpan) and the stat pace stop at that rank (spTop), minus BAL.net.atGap; null before a life exists.
   row9-net (8) measures each archetype's real plateau (gifts through apply + monthly cooling) per rank and FAILs a mark above plateau − atGap/2. */
/* any other holder (the Hoàng hậu's mark on a consort's regard st = "hh"): only the stat pace stop at the rank it is asked, minus atGap (none without rk / st) */
function paceHold(st,rk){try{if(st==null||rk==null||typeof spTop!=="function"||!BAL.stp||!BAL.stp.on)return null;return Math.round(spTop(st,rk)-BAL.net.atGap)}catch(e){return null}}
function thHold(rk){try{if(!S||typeof thArch!=="function")return null;const A=thArch(),B=BAL.trong;let h=A.cap+B.thGiftCap+B.thGiftSpan;
 if(rk!=null&&typeof spTop==="function"&&BAL.stp&&BAL.stp.on)h=Math.min(h,spTop("th",rk));return Math.round(h-BAL.net.atGap)}catch(e){return null}}
/* FORGIVENESS (net-build-rv fix 2, law 1): ONE rule for every apology / mediation road — her «Tạ lỗi» / «Nhún nhường» (j9 / jtwoway), the NPC deeds
   (SOC.apologise / SOC.mediate j28, TW apol jtwoway, cx:humble jagacts, «Tạ lỗi, đền bạc» jemoact) and the receiver of a mediation (jrcv RCVK.mediate):
   the wronged one t lets a's wrong go only while t's oán toward a is under t's own «nguoi» level (her = S.net, same function). Told after, in words. */
function netForgive(t,a){try{return oan(t,a)<netTh(t,"nguoi")}catch(e){return true}}
function netRefused(a,t,what){return `${a===S?"Ngươi":a.name} ${what} ${NM(t)}, nhưng ${t===S?"ngươi vẫn chưa nguôi giận":"bị gạt đi"}`}
/* harm band of danger d for holder v: band 1 starts at BANDS[1][0] + v's act shift, bands 2 / 3 at bandHi of it (T[t].th.act3 = her own band-3 shift) */
function bandCuts(v){const m=netMemo(v);if(m&&m.b)return m.b;const sh=netTh(v,"act")-BAL.net.th.act;let s3=null;try{for(const t of traitsOf(v)){const R=BAL.net.T[t];if(R&&R.th&&R.th.act3!=null)s3=(s3||0)+R.th.act3}}catch(e){}
 /* rv: cuts never fall below the band under them (a gentle Xảo quyệt went 1 → 3 at 72 while her band 2 began at 75) */
 const C=[];let lc=-1e9;for(let i=1;i<BANDS.length;i++){const c=Math.max(lc,BANDS[i][0]+(i===1?sh:i===3&&s3!=null?s3:Math.round(sh*BAL.net.bandHi)));lc=c;C[i]=c}const m2=netMemo(v);if(m2)m2.b=C;return C}
function bandCut(v,d){const C=bandCuts(v);let b=0;for(let i=1;i<C.length;i++)if(d>=C[i])b=i;return b}
function bandVT(v,t){return bandCut(v,danger(v,t))}
/* RANGE (step 0, LAW 11): thiện cảm −100..100 and oán 0..100 (BAL.linkRange) hold for every writer — 55 modules write .rel / .rl / .oan / .ro straight;
   aff()/oan() clamp on read and netClampAll() puts every stored value back in range each week and on load (old saves with out-of-range values load clean). */
function netClampAll(){if(!S)return 0;const A=BAL.linkRange.rl,O=BAL.linkRange.ro;let n=0;const ca=v=>{const x=typeof v==="number"&&isFinite(v)?Math.max(A[0],Math.min(A[1],v)):0;if(x!==v)n++;return x},
  co=v=>{const x=typeof v==="number"&&isFinite(v)?Math.max(O[0],Math.min(O[1],Math.round(v))):0;if(x!==v)n++;return x},
  cm=(m,f)=>{if(m&&typeof m==="object")for(const k in m)if(typeof m[k]==="number"||m[k]==null||typeof m[k]!=="object")m[k]=f(m[k])};
 try{cm(S.rl,ca);cm(S.ro,co);for(const v of (typeof rivals!=="undefined"?rivals:[])){if(!v||typeof v!=="object")continue;if(v.rel!=null)v.rel=ca(v.rel);if(v.oan!=null)v.oan=co(v.oan);cm(v.rl,ca);cm(v.ro,co);if(v.ghen!=null)v.ghen=co(v.ghen)}
  for(const h of (typeof relMSAll==="function"?relMSAll():[])){if(typeof h.af==="number")h.af=ca(h.af);else cm(h.af,ca);if(typeof h.oan==="number")h.oan=co(h.oan);cm(h.ro,co)}}catch(e){}return n}
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{netClampAll()}catch(e){}return r}})();
(function(){if(typeof deser!=="function")return;const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{netClampAll()}catch(e){}return r}})();
/* crossing a level (report §3.4): when someone's thiện cảm crosses HER OWN «than» level toward the player she says so in her nết's voice
   (told to the player); when it falls under her «ghet» level toward anyone, the hatred shows (news by the witness rule, newsAdd). Once per crossing. */
const NET_TH_LINE={than:{"Lạnh lùng":"vốn ít khi mở lòng, nay lại coi ngươi là chỗ thân tình","Kiêu ngạo":"vốn kiêu kỳ, nay chịu nhận ngươi là người thân",
 "Ân cần":"nắm tay ngươi, nói từ nay coi nhau như chị em ruột","Kín đáo":"kể ngươi nghe một chuyện riêng chưa nói với ai","Nóng nảy":"nói ai động đến ngươi là động đến nàng",
 "Cương trực":"nói thẳng: từ nay chuyện của ngươi là chuyện của nàng","Xu nịnh":"nói từ nay xin được theo hầu bên ngươi",_:"nay coi ngươi là chỗ thân tình"}};
function netCross(x,y,b,a){if(!S||!x||!y||x===y||x===S||typeof x!=="object"||typeof y!=="object"||b===a)return;const th=netTh(x,"than"),gh=netTh(x,"ghet");
 /* perf (fix 4): nothing to tell unless the change reaches a level (or comes back from one) */if(a<th&&b<th&&a>gh&&b>gh&&!(S.netX&&S.netX[x.id+">"+(y===S?"me":y.id)]))return;
 if(!rivals.includes(x))return;S.netX=S.netX||{};const k=x.id+">"+(y===S?"me":y.id),st=a>=th?1:a<=gh?-1:0,o=S.netX[k]||0;if(st===o)return;S.netX[k]=st;
 if(st===1&&y===S&&b<th){const L=NET_TH_LINE.than;newsAdd(x,"netThan",`${x.name} ${tv(L,x,L._)}`,true)}
 else if(st===-1&&b>gh)newsAdd(x,"netGhet",`${x.name} từ nay ghét ${NM(y)} ra mặt`,false)}
/* ROW 9: the Thái hậu crosses HER OWN levels too (holder "th", her archetype's nết): her regard for the player reaching her «than» level or falling
   to her «ghet» level is told once per crossing, in her nết's voice, as the player's own log line (she sees it herself). First look = silent baseline. */
const NET_TH_TH={than:{"Ân cần":"nắm tay ngươi, dặn từ nay có chuyện gì cứ sang Đức Thọ cung mà nói","Thật thà":"nói thẳng trước mặt mọi người: ngươi là đứa biết điều, bà tin ngươi",
 "Kín đáo":"vốn chẳng tin ai, nay lại kể ngươi nghe một chuyện cũ trong cung","Kiêu ngạo":"vốn khó chiều, nay lại khen ngươi trước mặt các phi tần",
 "Mê tín":"nói ngươi có phúc tướng, từ nay cho ngươi hầu bên cạnh",_:"từ nay coi ngươi là chỗ thân tình"},
 ghet:{"Ân cần":"thở dài, từ nay không gọi ngươi sang hầu chuyện nữa","Kiêu ngạo":"từ nay không thèm nhìn ngươi lấy một lần",_:"từ nay lạnh nhạt với ngươi ra mặt"}};
function netThCross(){if(!S||S.thDead||S.dead)return;const v=S.th||0,th=netTh("th","than"),gh=netTh("th","ghet"),st=v>=th?1:v<=gh?-1:0;S.netX=S.netX||{};
 const o=S.netX["th>me"];S.netX["th>me"]=st;if(o===undefined||o===st)return;if(st===1){const L=NET_TH_TH.than;log(`Thái hậu ${tv(L,"th",L._)}.`)}
 else if(st===-1){const L=NET_TH_TH.ghet;log(`Thái hậu ${tv(L,"th",L._)}.`)}}
(function(){const a0=apply;apply=function(o){const r=a0.apply(this,arguments);try{if(o&&o.th)netThCross()}catch(e){}return r}})();
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{netThCross()}catch(e){}return r}})();
(function(){const a0=affAdd;affAdd=function(x,y,n){let b=null;try{if(n&&x&&y&&x!==y&&x!==S)b=aff(x,y)}catch(e){}const r=a0.apply(this,arguments);try{if(b!=null)netCross(x,y,b,aff(x,y))}catch(e){}return r}})();
