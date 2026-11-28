/* ================= jpdist: PALACE DISTANCE — the Emperor visits / calls a near palace more often; a far one less, but a visit there is a strong favour sign =================
   Owner ruling (OD 24/11 ~08:45Z, verbatim in FOREMAN_D_STATUS ORDER UPDATE 08:46Z): "những cái phi tần mà thường mà ở xa nơi ở của vua á, thường là sẽ ít được
   để ý tới hơn, bởi vì vua đi xa, vua mệt, nhiều khi vua làm biếng tới gặp. Còn khi mà đã là cái người ở xa rồi mà vua vẫn tới gặp, tức là người đó vua rất là sủng."
   History (law 8): dev/research/palace-residence.md §1.2 — "Distance = how easily the Emperor visits, how fast news reaches her, how often she is seen".
   ONE measure (law 4): pdFar(p) 0..1 = where p lives (jres residenceOf: chủ vị / side hall → her palace, Hoàng hậu → Càn Ninh, below Tần → Ngọc Thanh các)
   measured on the plan to Dưỡng Hòa điện exactly as jbancung bcNear (same MAPH anchors, same spread: 0 = the nearest palace, 1 = the farthest).
   Effects, every number in BAL.palDist, the SAME for her, the co-op friend and every NPC consort (law 1):
     1. the tablet (j8 nightCh → flip / empPick / jledger): weight × (1 − night × far)
     2. the visit (jvisit visCh → daily roll / jagacts2 emp:visit): odds × (1 − visit × far)
     3. the night's Sủng (j8 nightGain → her nightFx, NPC rivalNight): + round(nightSung × far)  — gain-and-loss (laws 2/3): near = more nights, far = more per night
     4. a visit to a far palace (far ≥ farMin): extra Sủng + round(visSung × far), Danh + round(visDanh × far), and the harem hears «… dù ở xa vẫn được ngự giá».
   Ban cung (jbancung card): pdCardTxt(p,i) prints the visit odds word at palace i (law 7) + the reason (near / far + the far-visit bonus).
   Pure functions of the shared world (no dice, no new save field): both co-op seats read the same numbers; old saves load unchanged. */
Object.assign(BAL,{palDist:{
 night:.3,        /* tablet weight × (1 − night × far): the farthest palace keeps 70 % of the weight */
 visit:.5,        /* visit odds × (1 − visit × far): he walks there himself, so distance tells more than for the tablet's sedan */
 nightSung:2,     /* + Sủng on every night × far (a night that reached a far palace means more) */
 farMin:.6,       /* far ≥ this = «ở xa»: the visit is a strong favour sign */
 nearMax:.25,     /* far ≤ this = «gần ngự tẩm» (the card's reason) */
 visSung:4,visDanh:3, /* far visit: Sủng + round(visSung × far), Danh + round(visDanh × far) */
 showWk:12        /* the Ban cung card's word = odds of at least one visit in this many tuần (from the real visCh at that palace) */
}});
const pdB=()=>BAL.palDist;
function pdDistPt(pt){const e=MAPH.places.dtd;if(!pt||!e)return null;const a=pt.anchor||pt.box,b=e.anchor||e.box;return Math.hypot(a.x-b.x,a.y-b.y)}
/* the plan's spread = the consort palaces (as jbancung bcNear) */
function pdSpread(){const D=PALN.map((_,j)=>bcDistOf(j));return{lo:Math.min(...D),hi:Math.max(...D)}}
function pdFarD(d){if(d==null)return 0;const s=pdSpread();return s.hi>s.lo?cl((d-s.lo)/(s.hi-s.lo),0,1):0}
/* far of palace index i (= 1 − bcNear(i)) */
function pdFarIx(i){return pdFarD(bcDistOf(i))}
/* where p lives → the plan point; null = no consort residence (servant, lãnh cung, unknown) */
function pdHome(p){try{const r=residenceOf(p);if(!r)return null;if(r.part==="lc"||r.part==="cungnhan")return null;
 if(r.part==="kn")return{k:"kn",pt:MAPH.places.kn};if(r.pal!=null&&MAPH.rivalSlots[r.pal])return{k:"pal",i:r.pal,pt:MAPH.rivalSlots[r.pal]};
 if(r.part==="ngocthanh")return{k:"home",pt:MAPH.places.home};return null}catch(e){return null}}
function pdFar(p){const h=pdHome(p);if(!h)return 0;return h.k==="pal"?pdFarIx(h.i):pdFarD(pdDistPt(h.pt))}
function pdPlace(p){const h=pdHome(p);if(!h)return"";return h.k==="pal"?PALN[h.i]:h.k==="kn"?PLNAME.kn[0]:(typeof HOMEN!=="undefined"?HOMEN:"")}
/* the far-visit bonus (0 below farMin) — ONE function for the card, her visit and an NPC's */
function pdVisBonus(far){const B=pdB();if(!(far>=B.farMin))return null;return{sung:Math.round(B.visSung*far),danh:Math.round(B.visDanh*far)}}
function pdNightAdd(p){return Math.round(pdB().nightSung*pdFar(p))}
/* 1. tablet */
(function(){const n0=nightCh;nightCh=function(p){const c=n0.apply(this,arguments);try{if(c>0){const f=pdFar(p||S);if(f>0)return Math.max(1,Math.round(c*(1-pdB().night*f)))}}catch(e){}return c}})();
/* 2. visit (jvisit: window.visCh is the one read by its daily roll and by jagacts2) */
let pdVis0=null;
(function(){if(typeof window.visCh!=="function")return;pdVis0=window.visCh;window.visCh=function(p){const c=pdVis0.apply(this,arguments);try{if(c>0){const f=pdFar(p);if(f>0)return c*(1-pdB().visit*f)}}catch(e){}return c}})();
/* visit odds (0..100 per tuần) for p as if she lived at palace i (the Ban cung card) */
function pdVisAt(p,i){if(!pdVis0)return 0;const c=pdVis0(p);return c*(1-pdB().visit*pdFarIx(i))}
function pdVisOdds(p,i){const q=pdVisAt(p,i)/100;const o=100*(1-Math.pow(1-q,pdB().showWk));return cl(Math.round(o),BAL.odds.lo,BAL.odds.hi)}
/* 3. the night's Sủng: whose night it is — her (default) or the NPC inside rivalNight */
let pdWho=null;
(function(){const g0=nightGain;nightGain=function(s){const r=g0.apply(this,arguments);try{const a=pdNightAdd(pdWho||S);if(a)return Object.assign({},r,{sung:r.sung+a})}catch(e){}return r};
 const r0=rivalNight;rivalNight=function(v){const w0=pdWho;pdWho=v;try{return r0.apply(this,arguments)}finally{pdWho=w0}}})();
/* 4. the far visit: her (after the visit night's extras, jvisit nightFx wrapper) */
function pdFarLine(nm,pl){return `Hậu cung truyền nhau: ${nm} ở tận ${pl}, dù ở xa vẫn được ngự giá; ai cũng biết ân sủng ấy không nhỏ.`}
(function(){const n0=nightFx;nightFx=function(s){const vis=!!(S&&S.visNight!=null&&typeof wk==="function"&&wk()-S.visNight<=1);const r=n0.apply(this,arguments);
 if(vis)try{const f=pdFar(S),g=pdVisBonus(f);if(g){const s0=S.sung,d0=S.danh;apply(Object.assign({},g));/* apply() scales / rewrites: print what really changed */log(`${pdFarLine("ngươi",pdPlace(S))} Sủng ${s0} → ${S.sung} · Danh ${d0} → ${S.danh}.`)}}catch(e){console.error("pdist",e)}return r}})();
/* ...and an NPC consort (jvisit visGo → "npc"); the co-op friend plays her own card on her seat (the branch above) */
(function(){if(typeof window.visGo!=="function")return;const v0=window.visGo;window.visGo=function(p){const r=v0.apply(this,arguments);
 try{if(r==="npc"&&p&&p!==S){const f=pdFar(p),g=pdVisBonus(f);if(g){ap(p,Object.assign({},g));const t=pdFarLine(p.name,pdPlace(p));log(t);try{newsAdd(p,"farvisit",t,true)}catch(e){}}}}catch(e){console.error("pdist",e)}return r}})();
/* the Ban cung card: the visit odds word at palace i + why (law 7: no %) */
function pdCardTxt(p,i){const B=pdB(),f=pdFarIx(i),g=pdVisBonus(f);
 const why=g?`cung xa ngự tẩm, ngài ít lui tới; mỗi lần ngự giá thêm ${sgStat(g.sung)}, Danh +${g.danh}`:f<=B.nearMax?"cung gần ngự tẩm, ngài năng lui tới, thẻ bài dễ lật":"cung không xa không gần ngự tẩm";
 return `ngự giá: ${word(pdVisOdds(p,i))} (${why})`}
/* the card face (kit hint, jk2b kitHint): the kit's own hint for the option + the short distance phrase (the full one stays in the option text) */
function pdCardShort(p,i){const B=pdB(),f=pdFarIx(i),g=pdVisBonus(f),w=word(pdVisOdds(p,i));
 return g?`ngự giá ${w}: cung xa, ngài ít đến, song mỗi lần đến là ân sủng lớn`:f<=B.nearMax?`ngự giá ${w}: cung gần, ngài năng đến`:`ngự giá ${w}: cung không xa không gần`}
function pdHint(o,p,i){if(!o||typeof kitHint!=="function")return o;const h0=o.hint;o.hint=lv=>{let h="";try{h=h0!=null?(typeof h0==="function"?h0(lv):String(h0)):kitHint(Object.assign({},o,{hint:null}),null,lv).hint}catch(e){}return (h?h+"; ":"")+pdCardShort(p,i)};return o}
window.pdHint=pdHint;window.pdCardShort=pdCardShort;
window.pdFar=pdFar;window.pdFarIx=pdFarIx;window.pdCardTxt=pdCardTxt;window.pdVisOdds=pdVisOdds;window.pdVisBonus=pdVisBonus;window.pdNightAdd=pdNightAdd;
