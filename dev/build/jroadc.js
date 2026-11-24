/* ================= jroadc: COMPOSED ORIGIN ROADS — ORDER THIN P8 (owner OD 23/11 ~22:50Z «ORDER THIN»; EVCAT §3 P8; API P8 in
   dev/handover/reports/thin.md) =================
   Each origin gets 4 NEW roads on top of its old 4. A new road = ONE new j67 premise arc ARC67[<prem>] (o:<origin>: it joins the origin's pool, so
   jst14 rolls it like the old premises, ctm-arcs avoid-last-10 kept, NPC women live it through jnroad) + chapters .5–.11 registered through
   jroad.js rdDef, whose hồi are COMPOSED once per life from the origin's shared part pools (RDCSD rows, dev/build/jrdcsd.js, built from the writer
   files dev/handover/content/thin/rdseeds_*.md by dev/build/jrdcsd_build.py):
     per chapter n: 2 openings (one after a won chapter, one after a middle/lost one: jroad RDW, only the fitting one plays), 2 complications,
     1 turning hồi, 1 climax of the band of n (its title / goal / subject / 3 endings are the chapter's).
   The composition of the life's road is kept in S.st.f14.rc[n] = {s:[ow,ol],c:[c1,c2],t:[t1],x:x1} (part ids; personal, saved with the life), so a
   reload plays the same road; a road that is not the life's road (NPC roads, scans) reads a fixed default composition. One road never shows a
   part twice; across lives parts are drawn fresh-first through P0 jnorep (family "rdc:<origin>", key = part id; × BAL.road.c.seen per past life).
   Numbers (law 4): a part counts STEPS; one step = BAL.road.c.fx[key] (options) / Efx[key] (endings); climax odds = BAL.road.c.xo[risk][band] + the
   stat term BAL.road.c.xs[stat] (+ Lợi thế, j67). Laws 2/3: every option Σgain steps == Σloss steps == BAL.road.c.st (validator rdseeds_validate.py).
   Kit only: every screen is the j67 story card (kit event frame), nothing new is drawn. Old saves: no old road changes; a life on an old road never
   reads this file. */
const RDC={P:{},road:{},def:{},cache:{},ids:{}};
window.RDCSD=window.RDCSD||[];
const rdcB=()=>BAL.road.c;
const rdcBand=n=>rdcB().band[n]||"a";
/* the cast roles a text names ({v} / {v2}) */
function rdcRoles(...T){const s=T.join(" ");return ["v","v2"].filter(k=>s.includes("{"+k+"}"))}
function rdcTexts(h){const L=[h.h,h.t];for(const o of h.opts||[])L.push(o.n,o.rt,o.rf,o.wx,o.lx);return L.filter(Boolean)}
/* steps → j67 option numbers (c = paid when she picks, w = given when it holds; sc = Lợi thế; rel through rdRel) */
function rdcOpt(o,clim,band){const C=rdcB(),c={},w={},rel=[];let sc=0;
 for(const [k,n] of Object.entries(o.loss||{})){if(k.startsWith("rel."))rel.push([k.slice(4),-n]);else c[k]=(c[k]||0)-n*C.fx[k]}
 for(const [k,n] of Object.entries(o.gain||{})){if(k==="sc")sc+=n*C.fx.sc;else if(k.startsWith("rel."))rel.push([k.slice(4),n]);else w[k]=(w[k]||0)+n*C.fx[k]}
 const X={n:o.n,c,w,rt:o.rt||"",rf:o.rf||""};if(o.wx)X.wx=o.wx;if(o.lx)X.lx=o.lx;if(sc)X.sc=sc;
 if(rel.length)X.go=(A,ok)=>{for(const [k,n] of rel)if(n<0||ok!==false)rdRel(A,k,n*C.fx.rel)};
 if(clim){const t=C.xs[o.stat]||C.xs.danh;const q=[C.xo[o.risk==="lo"?"lo":"hi"][band]||50,[t[0],o.stat,t[1]]];X.o=A=>rdOdds(q,A);X.l={};
  X.e=o.risk==="lo"?["win","mid"]:["win","lose"]}
 return X}
/* one hồi row → a j67 beat */
function rdcBeat(h,clim,band){const B={h:h.h,w:h.w||"me",t:h.t,o:(h.opts||[]).map(o=>rdcOpt(o,clim,band))};
 const need=(h.need||[]).slice();for(const k of rdcRoles(...rdcTexts(h)))if(!need.includes(k))need.push(k);if(need.length)B.need=need;
 if(h.after==="win")B.if=RDW(1);else if(h.after==="lose")B.if=RDW(0);return B}
/* the 3 endings (steps × Efx; win +, lose −, mid by its sign) */
function rdcEnds(E){const C=rdcB(),R={},K={win:1,mid:0,lose:-1};
 for(const k of ["win","mid","lose"]){const e=E&&E[k]||{tag:"",t:""},fx={},rel=[];
  for(const [s,n0] of Object.entries(e.fx||{})){const n=k==="win"?Math.abs(n0):k==="lose"?-Math.abs(n0):n0;if(s.startsWith("rel."))rel.push([s.slice(4),n]);else fx[s]=n*C.Efx[s]}
  R[k]={tag:e.tag,t:e.t,k:K[k],fx};if(rel.length)R[k].go=A=>{for(const [r,n] of rel)rdRel(A,r,n*C.Efx.rel);return""}}
 return R}
/* nết filter of a premise's cast (any-of; loose: anyone when nobody fits) */
function rdcFit(f){if(!f||!f["nết"]||!f["nết"].length)return null;const W=f["nết"];
 return v=>{try{const T=(typeof traitsOf==="function"?traitsOf(v):v.net)||[];return W.some(x=>T.includes(x))}catch(e){return false}}}
function rdcCastKeys(A,keys,F){for(const k of keys){if(rv67(A,k))continue;const f=rdcFit(F&&F[k]);if(!(f&&castRv67(A,k,f)))castRv67(A,k)}return true}
/* ---------- the premise (.4) = a plain j67 arc ---------- */
function rdcPrem(r){const B={},p=[[],[],[],[]],slots=[["s",0],["c",1],["t",2],["x",3]];let roles=[];
 for(const [s,i] of slots)(r[s]||[]).forEach((h,j)=>{const id=s+(j+1);B[id]=rdcBeat(h,s==="x","a");p[i].push(id);roles=roles.concat(rdcRoles(...rdcTexts(h)))});
 const keys=[...new Set(roles)],F=r.cast||{};
 const def={o:r.o,t:r.title,w:r.w||"me",sj:r.sj||"",g:r.g,p,B,E:rdcEnds(r.E),rdc:1,cast(A){return rdcCastKeys(A,keys,F)}};
 ARC67[r.id]=typeof arcFx==="function"?arcFx(r.id,def):def;try{if(typeof RTHEME67==="object"&&!RTHEME67[r.id])RTHEME67[r.id]="court"}catch(e){}}
/* ---------- composition ---------- */
const rdcFam=o=>"rdc:"+o;
/* weighted pick: P0 fresh-first, own-road parts weigh BAL.road.c.own; det = the fixed default (first fitting, no dice) */
function rdcPick(o,L,road,det){if(!L.length)return null;if(det)return L.slice().sort((a,b)=>((b.rd||[]).includes(road)-(a.rd||[]).includes(road))||(a.id<b.id?-1:1))[0];
 const C=rdcB(),fam=rdcFam(o);let F=L;try{if(typeof nrFresh==="function")F=nrFresh(fam,L,x=>x.id)}catch(e){}
 const W=F.map(x=>((x.rd||[]).includes(road)?C.own:1)*(typeof nrSeen==="function"?Math.pow(C.seen,nrSeen(fam,x.id)):1));
 const T=W.reduce((a,b)=>a+b,0);let x=rnd67()*T;for(let i=0;i<F.length;i++){x-=W[i];if(x<0)return F[i]}return F[F.length-1]}
/* one road's 7 chapters → {n:{s,c,t,x}} or null when the pools cannot fill it without a repeat */
function rdcCompose(road,det){const o=RDC.road[road],P=RDC.P[o];if(!P)return null;const used=new Set(),R={};
 const take=(L,f)=>{const x=rdcPick(o,L.filter(r=>!used.has(r.id)&&(!f||f(r))),road,det);if(x)used.add(x.id);return x};
 for(let n=BAL.road.first;n<=BAL.road.last;n++){const band=rdcBand(n);
  const x=take(P.clim[band]||[],r=>band!=="f"||!(r.rd&&r.rd.length)||r.rd.includes(road));
  const ow=take(P.open,r=>r.after!=="lose"),ol=take(P.open,r=>r.after!=="win");
  const c1=take(P.comp),c2=take(P.comp),t1=take(P.turn);
  if(!x||!ow||!ol||!c1||!c2||!t1)return null;R[n]={s:[ow.id,ol.id],c:[c1.id,c2.id],t:[t1.id],x:x.id}}
 return R}
/* the composition this chapter reads now */
function rdcLife(road){try{const f=S&&S.st&&S.st.f14;if(f&&f.rd===road){if(!f.rc||!rdcValid(road,f.rc)){const c=rdcCompose(road)||RDC.def[road];f.rc=JSON.parse(JSON.stringify(c))}return f.rc}}catch(e){}return null}
function rdcValid(road,rc){try{for(let n=BAL.road.first;n<=BAL.road.last;n++){const c=rc[n];if(!c)return false;for(const id of [].concat(c.s,c.c,c.t,[c.x]))if(!RDC.ids[id])return false}return true}catch(e){return false}}
function rdcComp(road,n){const L=rdcLife(road);return (L&&L[n])||RDC.def[road][n]}
/* the j67 chapter object of a composition (cached per composition) */
function rdcChap(road,n){const c=rdcComp(road,n),key=road+"|"+n+"|"+[].concat(c.s,c.c,c.t,[c.x]).join(",");let D=RDC.cache[key];if(D)return D;
 const I=RDC.ids,band=rdcBand(n),x=I[c.x];const B={s1:rdcBeat(I[c.s[0]]),s2:rdcBeat(I[c.s[1]]),c1:rdcBeat(I[c.c[0]]),c2:rdcBeat(I[c.c[1]]),t1:rdcBeat(I[c.t[0]]),x1:rdcBeat(x,true,band)};
 let roles=[];for(const id of [].concat(c.s,c.c,c.t,[c.x]))roles=roles.concat(rdcRoles(...rdcTexts(I[id])));
 D={t:x.title,w:x.w||"me",sj:x.sj||"",g:x.g,p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],B,E:rdcEnds(x.E),keys:[...new Set(roles)],parts:[].concat(c.s,c.c,c.t,[c.x])};
 RDC.cache[key]=D;return D}
/* register the 7 chapters of a road: rdDef with live getters (title, goal, hồi, endings follow the life's composition) */
function rdcRoad(road){for(let n=BAL.road.first;n<=BAL.road.last;n++){const id=rdDef(road,n,{t:"",g:"",p:[[],[],[],[]],B:{},E:{}}),a=ARC67[id];
  for(const k of ["t","w","sj","g","p","B","E"])Object.defineProperty(a,k,{get:()=>rdcChap(road,n)[k],enumerable:true,configurable:true});
  a.rdc=1;a.cast=function(A){return rdCast(A,rdcChap(road,n).keys)}}}
/* load (also used by tests with fixture rows): premises + pools; a road is registered only when its pools fill all 7 chapters without a repeat */
function rdcLoad(rows){const out={prem:0,roads:0,skip:[]};
 for(const r of rows){if(!r||!r.id||!r.o)continue;RDC.ids[r.id]=r;if(r.type==="prem")continue;
  const P=RDC.P[r.o]=RDC.P[r.o]||{open:[],comp:[],turn:[],clim:{a:[],b:[],f:[]}};
  if(r.type==="open")P.open.push(r);else if(r.type==="comp")P.comp.push(r);else if(r.type==="turn")P.turn.push(r);else if(r.type==="clim"&&P.clim[r.band])P.clim[r.band].push(r)}
 for(const r of rows){if(!r||r.type!=="prem"||!r.id||!r.o)continue;if(ARC67[r.id]&&!ARC67[r.id].rdc){out.skip.push(r.id+" (id taken)");continue}
  try{rdcPrem(r);out.prem++;RDC.road[r.id]=r.o;const d=rdcCompose(r.id,true);if(d){RDC.def[r.id]=d;rdcRoad(r.id);out.roads++}else out.skip.push(r.id+" (pools short)")}catch(e){console.error("rdc",r.id,e);out.skip.push(r.id+" ("+e.message+")")}}
 RDC.cache={};return out}
/* the life's road starts (jst14 + jroad a67init): compose it now, fresh-first */
(function(){if(typeof a67init!=="function")return;const i0=a67init;a67init=function(k){const r=i0.apply(this,arguments);
 try{if(f14()){const f=S.st.f14;if(f.rd&&RDC.road[f.rd]){const c=rdcCompose(f.rd)||RDC.def[f.rd];f.rc=JSON.parse(JSON.stringify(c))}}}catch(e){console.error(e)}return r}})();
/* a composed chapter that opens marks its parts in P0 (fresh-first in later lives) */
(function(){const n0=newThread67;newThread67=function(id){const A=n0.apply(this,arguments);try{const a=ARC67[id];
 if(A&&a&&a.rdc&&a.o==="rd"&&rdOn()&&a.road===S.st.f14.rd&&typeof nrMark==="function"){const o=RDC.road[a.road];for(const p of rdcChap(a.road,a.rn).parts)nrMark(rdcFam(o),p)}}catch(e){console.error(e)}return A}})();
/* counts for tests / measures */
function rdcCount(){const R={};for(const [road,o] of Object.entries(RDC.road)){R[o]=R[o]||{prem:0,roads:0};R[o].prem++;if(RDC.def[road])R[o].roads++}return R}
window.rdcLoad=rdcLoad;window.rdcCompose=rdcCompose;window.rdcChap=rdcChap;window.rdcCount=rdcCount;window.RDC=RDC;
try{rdcLoad(window.RDCSD)}catch(e){console.error("rdc load",e)}
