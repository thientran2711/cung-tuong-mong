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
 if(p.role==="eunuch"||p.role==="eun"||p.kind==="ty"||p.kind==="man"||p.rw!=null)return"m";
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
 const seed=(Array.isArray(p.net)?p.net:[]).concat(p===S?[]:netOldOf(p));
 const n=netDraw(p,netKey(p),sx,seed);try{p.net=n;netTrong(p)}catch(e){}return n}
/* first trọng follows the Lòng dạ nết; the second (1 of 13) stays */
function netTrong(p){if(!Array.isArray(p.trong)||p.trong.length!==2)return;const ld=p.net[1],R=BAL.net.T[ld];if(!R||!R.v)return;const ban=new Set(R.ban||[]);
 if(p.trong[0]===R.v)return;const two=p.trong[1]!==R.v&&!ban.has(p.trong[1])?p.trong[1]:p.trong[0]!==R.v&&!ban.has(p.trong[0])?p.trong[0]:null;
 if(two)p.trong=[R.v,two];else delete p.trong}
(function(){const t0=traitsOf;traitsOf=function(p){try{const n=netOf(p);if(n)return n.slice()}catch(e){}return t0.apply(this,arguments)}})();
/* jtrong's trọng reads trTraits: same pool for everyone (co-op friend included) */
(function(){const r0=trTraits;trTraits=function(p){try{const n=netOf(p);if(n)return [n[1],n[0],n[2]]}catch(e){}return r0.apply(this,arguments)}})();
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
