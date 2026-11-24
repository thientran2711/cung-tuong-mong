/* ================= jfigx: ART WIRING 1119 — Thái hậu per face · a65 age step · outfit colours v1/v2 (owner 19/11) =================
   Owner (verbatim, OD 19/11 ~00:45Z / ~00:49Z / ~00:50Z): "Hình Thái Hậu cũng vậy. Nói chung là hình nào mà hôm nay vẽ mà tao duyệt ok rồi
   thì đẩy hết lên live đi." · "Ai cũng là Thái Hậu hết, 90 người Thái Hậu." · "Cái mốc 65 tuổi không phải là thêm cho mỗi phi tần mà là ở bất
   kỳ một cái nhóm nào, như cung nữ cũng có 65 tuổi, tức là nhân viên của mình bất kỳ ai cũng có 65 tuổi."
   The ONE selector stays j39 figPick/figFor + j66 figTierOf/figDist + j88 f88Best; this module only adds to it:
   (1) img/FIGURES-x.json (dev/tools/figx_rows.py, built from what is on the CDN) holds the rows that have no slot in FIGURES.json:
       consort Thái hậu robes (tier "th", a36/a51/a65), the a65 age step of t7/t8, the colour variants (v:1|2) of t7/t8.
       a65 rows join FIGIX like every other row (nearest age is the normal rule). "th" and "v" rows are kept apart (FIGXT) so no other
       reader of FIGIX (jht, jkc, jstaff, j86 …) can ever pick a Thái hậu robe for a rank or a random colour.
   (2) THÁI HẬU = A FACE OF THE POOL: S.thO takes a free identity of the pool (consort c01–c32, maid m01–m52, ma ma k01–k08), preferring a
       face whose Thái hậu robe is painted; one face for life, never reused (figUsed). The old shared fig-thaihau-h1/h2/h3 are retired (an old
       save's S.thO.fid "thaihau:hN" is dropped and she draws a pool face). Co-op: the host draws (thO + fidUsed are world keys).
       Whoever IS Thái hậu (S.thO; her, after the succession roads a / b) wears her own face's Thái hậu robe at her age band; a face without
       that robe wears her own highest consort dress (t8) at her age, else any picture of the same person (law 6c: never blank).
   (3) a65: the top band (BAL.ageBand[3]+, art tag BAL.ageArt[4]) for every woman, every rank/role; a missing a65 file = the nearest age of the same person.
   (4) COLOUR: each woman wears one colour of her t7/t8 dress for the life (v0 / v1 / v2 = BAL.figVar colours, stable per face and per reign,
       the same on both co-op seats); who.figV (0..n-1) overrides it. Where a colour is not painted she wears v0. */
const FIG_TH=9;/* tier code of the Thái hậu robe (an art slot code, not a game number) */
let FIGXR=[],FIGXT={};
function figxKey(f){return norm(f.role)+":"+f.identity}
/* r2 (review FAIL #1): figxLoad.ok = the rows are in. The Thái hậu's face is for life, so she is not drawn before they are (a draw before
   would not see which faces have a painted Thái hậu robe). After BAL.figxTry failed reads (offline / missing file) she is drawn anyway. */
function figxLoad(){try{fetch("img/FIGURES-x.json",{cache:"no-cache"}).then(r=>r.ok?r.json():[]).catch(()=>[]).then(j=>{const L=figList(j);if(!L.length){figxLoad.fail=(figxLoad.fail||0)+1;/* keep the last good list (law 11: every timed figure loader) */if(figxLoad.ok)return}
  const sig=L.length+"|"+L.map(f=>f.file).join(",").length;if(sig===figxLoad.sig)return;figxLoad.sig=sig;
  const T={},A=[];for(const f of L){const t=String(f.tier);if(t==="th"||f.v){const k=figxKey(f);const X=T[k]=T[k]||{th:[],v:[]};(t==="th"?X.th:X.v).push(f)}else A.push(f)}
  FIGXR=A;FIGXT=T;if(L.length)figxLoad.ok=1;if(typeof FIGS!=="undefined"&&FIGS.length){FIGIX=figIndex(FIGS);try{if(S&&!S.dead)kitRenderSoon(250)}catch(e){}}}).catch(()=>{})}catch(e){}}
/* the a65 rows index like any other row (j39 loadFigs → figIndex) */
(function(){const i0=figIndex;figIndex=function(all){return i0.call(this,(all||[]).concat(FIGXR))}})();
(function(){const t0=figTier;figTier=function(t){if(/^th$/i.test(String(t==null?"":t).trim()))return FIG_TH;return t0.apply(this,arguments)}})();
/* who is Thái hậu now: the Thái hậu; her once she chose road a (con làm vua) or b (buông rèm), or her life ended as Thái hậu */
function figIsTh(who){try{if(!S||!who)return false;if(who===S.thO)return true;
  if(who===S){const E=S.succ;if(E&&(E.p==="a"||E.p==="b"))return true;return !!(S.dead&&/thái hậu/i.test(String(S.fate||""))&&!/thái phi/i.test(String(S.fate||"")))}}catch(e){}return false}
(function(){const t0=figTierOf;figTierOf=function(who){try{if(figIsTh(who))return FIG_TH}catch(e){}return t0.apply(this,arguments)}})();
(function(){const w0=f88Wear;f88Wear=function(who){try{if(figIsTh(who))return true}catch(e){}return w0.apply(this,arguments)}})();
/* the pool of women's faces (the "90"): consort + maid identities (j88 f88Keys) + the ma ma identities */
function figxPool(){const M=(typeof FIGIX!=="undefined"&&FIGIX.mama)||{};return f88Keys("all").concat(Object.keys(M).filter(k=>M[k]&&M[k].length).sort())}
function figxHas(k){return !!(k&&FIGIX[k.split(":")[0]]&&FIGIX[k.split(":")[0]][k]&&FIGIX[k.split(":")[0]][k].length)}
function figxReady(){return !!figxLoad.ok||(figxLoad.fail||0)>=BAL.figxTry}
function figThPick(){const T=S.thO;if(T.fid&&/^thaihau:/.test(T.fid)){const old=T.fid;T.fid=null;S.fidUsed=figUsed().filter(x=>x!==old)}
 if(T.fid&&figxHas(T.fid))return T.fid;if(window.COOPW&&COOPW.on&&COOPW.seat==="b")return null;/* the guest waits for the host's face */
 if(!figxReady())return null;/* until the rows are in she keeps her old portrait (faceFor "thaihau", j17): never blank, never a wrong face for life */
 const U=new Set(figUsed().concat(S.fidDead||[]));const free=figxPool().filter(k=>!U.has(k));if(!free.length)return null;
 const good=free.filter(k=>FIGXT[k]&&FIGXT[k].th.length);const k=pick(good.length?good:free);T.fid=k;figUsed().push(k);return k}
(function(){const r0=figRoles;figRoles=function(who){try{if(S&&who&&who===S.thO)return["consort","maid","mama"]}catch(e){}return r0.apply(this,arguments)}})();
(function(){const p0=figPick;figPick=function(who){try{if(S&&who&&who===S.thO&&typeof FIGS!=="undefined"&&FIGS.length)return figThPick()}catch(e){console.error("figx th",e)}return p0.apply(this,arguments)}})();
/* r2 (review FAIL #2): a save made before this build keeps the dress colour she and everyone already wore (v0) for the reign running when
   it is first loaded: S.emp.figV0 = that reign's era S.emp.era (a world key, written by the host / solo only, so both seats agree). A new life
   (start) is stamped at once and is never pinned; the next reign (another Emperor) wears the colours. */
function figVPin(){try{if(!S||!S.emp)return false;if(!S.figVStamp){if(!(window.COOPW&&COOPW.on&&COOPW.seat==="b")&&S.emp.figV0==null)S.emp.figV0=String(S.emp.era||"");S.figVStamp=1}
  return S.emp.figV0!=null&&S.emp.figV0===String(S.emp.era||"")}catch(e){return false}}
(function(){const s0=start;start=function(){const r=s0.apply(this,arguments);try{if(S)S.figVStamp=1}catch(e){}return r}})();
/* her colour of the t7/t8 dress */
function figVOf(who){try{if(!who||!S)return 0;const n=Math.max(1,BAL.figVar|0);if(who.figV!=null)return Math.max(0,Math.min(n-1,who.figV|0));if(n<=1||figVPin())return 0;
  const k=who===S?(S.pid||S.fid):who.fid;if(!k)return 0;return wdHash(k+"|"+(S.emp&&S.emp.era||""))%n}catch(e){return 0}}
function figVSet(who,v){if(!who)return false;who.figV=v==null?null:Math.max(0,v|0);return true}
window.figVOf=figVOf;window.figVPin=figVPin;window.figxReady=figxReady;window.figVSet=figVSet;window.figIsTh=figIsTh;
(function(){const b0=f88Best;f88Best=function(L,who,kind){try{if(!L||!L.length)return b0.apply(this,arguments);const X=FIGXT[figKey(L[0])]||null;const age=figAgeOf(who);
  if(figTierOf(who)===FIG_TH){const T=X?X.th:[];const Tp=kind==="por"?T.filter(f=>f.por):T;if(Tp.length)return figBest(Tp,null,age);
   const Lp=kind==="por"&&L.some(f=>f.por)?L.filter(f=>f.por):L;return f88Pick(Lp,8,age,false,null)||figBest(Lp,null,age)}
  const f=b0.apply(this,arguments);const w=figVOf(who);
  if(f&&w&&X&&X.v.length){const alt=X.v.find(x=>x.v===w&&String(x.tier)===String(f.tier)&&x.ageBand===f.ageBand&&(kind!=="por"||x.por));if(alt)return alt}
  return f}catch(e){console.error("figx best",e);return b0.apply(this,arguments)}}})();
figxLoad();setInterval(figxLoad,300000);
