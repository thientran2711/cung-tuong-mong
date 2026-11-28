
/* ================= j73: CHILD IDENTITIES (owner 11/14: children drawn as children, not babies at every age) =================
   img/FIGURES-kids.json lists child lineups: role "prince" / "princess", identity pNN / fNN, ageBand 4 / 9 / 14 / 20
   (fig-kid-<id>-a<band>.webp full body + por-kid-<id>-a<band>.webp portrait). Every prince / princess (the Thái tử too, and
   the rivals' children) gets ONE identity of his / her sex for life (k.kid), never reused by another child in the same game
   (S.kidUsed keeps every identity handed out, dead children included). Age band: 0–6 -> 4, 7–11 -> 9, 12–16 -> 14, 17+ -> 20.
   A missing band uses the nearest band of the identity; no art (manifest not loaded, pool used up) -> the old face-*.webp.
   Old saves: children without k.kid get one on the first render after the manifest loads; nothing else is changed.
   The manifest is read on its own (j39's loader keeps its three files) and re-read every 5 minutes like the others. */
const KIDF="img/FIGURES-kids.json";
let KIDIX={prince:{},princess:{}},KIDSIG="";
const KIDBANDS=[4,9,14,20];
function kidBandOf(a){a=+a||0;return a<=6?4:a<=11?9:a<=16?14:20}
function kidLoad(){try{fetch(KIDF,{cache:"no-cache"}).then(r=>r.ok?r.json():[]).catch(()=>[]).then(j=>{const L=figList(j).filter(f=>!/(^|\/)_old\//.test(String(f.file||f.src)));/* a failed / empty refetch (offline, CDN hiccup) never wipes the last good list (law 11: every timed figure loader) */if(!L.length)return;
 const sig=L.length+"|"+L.map(f=>f.file||f.src).join(",").length;if(sig===KIDSIG)return;KIDSIG=sig;
 const ix={prince:{},princess:{}};for(const f of L){const r=norm(f.role);if(!ix[r]||f.identity==null)continue;const b=parseInt(f.ageBand,10);if(isNaN(b))continue;(ix[r][f.identity]=ix[r][f.identity]||{})[b]=f}
 KIDIX=ix;try{if(S&&!S.dead){kidAssignAll();render()}}catch(e){}}).catch(()=>{})}catch(e){}}
kidLoad();setInterval(kidLoad,300000);
function kidRole(k){return k&&k.sex==="m"?"prince":"princess"}
function kidUsedList(){S.kidUsed=Array.isArray(S.kidUsed)?S.kidUsed:[];return S.kidUsed}
/* one identity per child for life; free ones first, then (only if every one is taken) one held only by dead children */
function kidId(k){if(!k||!S)return null;const M=KIDIX[kidRole(k)]||{};if(k.kid&&M[k.kid])return k.kid;if(k.kid)return null;
 const keys=Object.keys(M).sort();if(!keys.length)return null;const U=kidUsedList();const A=allKids().map(([x])=>x);
 const held=new Set(A.filter(x=>x!==k&&x.kid).map(x=>x.kid));U.forEach(x=>held.add(x));
 let free=keys.filter(x=>!held.has(x));
 if(!free.length){const live=new Set(A.filter(x=>x!==k&&x.kid&&x.alive).map(x=>x.kid));free=keys.filter(x=>!live.has(x))}
 if(!free.length)return null;const id=pick(free);k.kid=id;if(!U.includes(id))U.push(id);return id}
function kidAssignAll(){if(!S||!S.kids)return;const A=allKids().map(([x])=>x).filter(x=>!x.kid).sort((a,b)=>(b.age||0)-(a.age||0));A.forEach(kidId)}
/* the file for this child's identity at this age (nearest drawn band) */
function kidFig(k){const id=kidId(k);if(!id)return null;const B=(KIDIX[kidRole(k)]||{})[id]||{};const want=kidBandOf(k.age||0);
 let b=null;for(const x of KIDBANDS.slice().sort((p,q)=>Math.abs(p-want)-Math.abs(q-want)||q-p))if(B[x]){b=B[x];break}return b}
function kidFigSrc(k,kind){const f=kidFig(k);if(!f)return"";return figPath(kind==="por"?f.por:(f.file||f.src))}
/* portraits: the identity's por once it has loaded, the old face until then (or if it fails) */
const KPORK={},KPIM=[];
function kidPre(src){if(!src||KPORK[src]!=null)return;KPORK[src]=2;const im=new Image();im.onload=()=>{KPORK[src]=1;kitRenderSoon(250)};im.onerror=()=>{KPORK[src]=0};KPIM.push(im);im.src=src}
/* every band of the child's identity is fetched early, so a birthday never flashes the old face */
/* entry-blank-r3 (review item 6): the other age bands of a child are a 'later' fetch — while the life gate / life set is still bringing the
   pictures on screen (KLIFE busy) they wait, so ~16 child portraits no longer take a slow line before her own portrait and the side cards */
const KPRE_W=new Set();
function kidPreAll(k){const id=kidId(k);if(!id)return;const L=window.KLIFE;if(L&&(L.on||L.busy>0)){if(!KPRE_W.has(id)){KPRE_W.add(id);setTimeout(()=>{KPRE_W.delete(id);kidPreAll(k)},3000)}return}
 const B=(KIDIX[kidRole(k)]||{})[id]||{};KIDBANDS.forEach(b=>{if(B[b])kidPre(figPath(B[b].por))})}
function kidPor(k,fb){try{kidPreAll(k);const src=kidFigSrc(k,"por");if(!src)return fb;if(KPORK[src]===1)return src;kidPre(src);return fb}catch(e){return fb}}
(function(){const k0=kidFace0;kidFace0=function(k){const r=k0.apply(this,arguments);try{if(r&&k)r.src=kidPor(k,r.src)}catch(e){}return r}})();
(function(){const r0=render;render=function(){try{if(S&&!S.dead&&KIDSIG)kidAssignAll()}catch(e){}return r0.apply(this,arguments)}})();
/* a new life's identity card: the children's identities are kept with the other face fields */
try{if(typeof NL_FK!=="undefined"&&!NL_FK.includes("kid"))NL_FK.push("kid")}catch(e){}
/* place screens: children stand full-body too, at a height that suits their age */
const KIDH={4:.6,9:.74,14:.88,20:1};
(function(){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{const ppl=curPeople();document.querySelectorAll("#tokens .tok:not(.fig)").forEach(b=>{const p=ppl[+b.dataset.p];if(!p||p.kind!=="kid"||!p.ref)return;
  const src=kidFigSrc(p.ref);if(!src)return;const md=b.querySelector(".md");if(!md)return;const s=KIDH[kidBandOf(p.ref.age||0)]||1;
  const im=document.createElement("img");im.className="figimg kidfig";im.alt="";im.src=src;im.style.maxHeight=`min(${Math.round(420*s)}px,calc(58cqh * ${s}))`;im.style.height=`calc(58cqh * ${s})`;
  im.onerror=()=>{im.remove();md.style.display="";b.classList.remove("fig")};md.style.display="none";b.insertBefore(im,md);b.classList.add("fig")})}catch(e){}return r}})();
