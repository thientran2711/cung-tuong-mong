/* ================= j88: FACE POOL OF 84 WOMEN (owner 11/14: cung nữ có thể lên phi tần) — LOGIC + DATA ONLY =================
   No CSS, no markup: the portrait chooser UI is a kit component (review/kit-2); it reads this module's API.
   Pool = 32 consort identities (FIGIX.consort "consort:c01".."c32") + 52 maid identities (FIGIX.maid "maid:m01".."m52").
   - Dress tiers: anyone in consort dress (her as a consort, every NPC consort) wears the consort tier of her identity
     (j66 figTierOf: t1..t8 by rank, "cold" in lãnh cung). Maid identities read Part C records (role "maid", tier "t1".."t8"/"cold")
     from img/FIGURES-servants.json as soon as they appear (j39 re-reads every manifest every 5 min); a missing tier falls back to
     the nearest drawn tier, then to the plain maid art (tier null / servant tiers "m0".."m4"). Never an empty picture.
   - Servants (and her while she is a palace maid) wear maid art only, never a consort tier.
   - NPC consorts (start, tuyển tú, every newRival) draw from the free part of the 84: one face for life, never reused in a game
     (her face included via j66 figUsed); a reserve of maid faces is kept for servants who still need one. A maid face joins the
     NPC draw once it has Part C consort-dress art (F88_NEED_C), so a consort never wears maid clothes at her rank.
   - A maid raised to consort (servRanks j14, sendMaid j8) keeps her own maid face (and age) and switches to its consort tiers.
   - Old saves: nothing is rewritten; any stored fid / S.pid (consort or maid) keeps working.
   API for the kit chooser: facePool(filter,who) · faceImg(id,who,kind) · faceOn() · faceChoose(id) (see dev/PROGRESS_face84.md). */
function f88Num(k){return +String(k).replace(/\D/g,"")||0}
function f88Src(k){return /^maid:m\d+$/.test(k||"")?"maid":/^consort:c\d+$/.test(k||"")?"consort":null}
function f88Keys(src){const out=[];const add=r=>{const M=(typeof FIGIX!=="undefined"&&FIGIX[r])||{};
  Object.keys(M).filter(x=>f88Src(x)===r&&M[x]&&M[x].length).sort((a,b)=>f88Num(a)-f88Num(b)).forEach(x=>out.push(x))};
 if(!src||src==="all"||src==="consort")add("consort");if(!src||src==="all"||src==="maid")add("maid");return out}
function f88List(k){const r=f88Src(k);return r&&typeof FIGIX!=="undefined"?((FIGIX[r]||{})[k]||[]):[]}
/* consort dress tier record: numeric tier (consort art) or "t1".."t8" / "cold" (Part C); servant tiers "m0".."m4" are not */
function f88IsCT(f){const t=f&&f.tier;if(t==null||t==="")return false;if(typeof t==="number")return true;return /^(t\d+|\d+|cold|lanh)/i.test(String(t).trim())}
function f88TNum(f){return /cold|lanh/i.test(String(f.tier))?-1:parseInt(String(f.tier).replace(/[^\d-]/g,""),10)}
/* pick one record of an identity: consort mode = nearest consort tier, then age; base mode = maid art */
function f88Pick(L,tier,age,base,mrank){if(!L||!L.length)return null;const T=L.filter(f88IsCT),B=L.filter(f=>!f88IsCT(f));
 if(base&&B.length){const N=B.filter(f=>f.tier==null||f.tier==="");if(mrank==null&&N.length)return figBest(N,null,age);
  /* the plain maid art (tier null) is the dress of maid rank 1 (there is no "m1" file for maid faces); m0, m2..m4 are their own ranks */
  let md=1e9;const d=f=>Math.abs((f.tier==null||f.tier===""?1:(parseInt(String(f.tier).replace(/\D/g,""),10)||0))-(mrank||0));
  for(const f of B)md=Math.min(md,d(f));return figBest(B.filter(f=>d(f)===md),null,age)}
 /* review/fig-rank-match (owner 17/11: "Hoàng hậu ... chưa đúng phẩm"): dress tier = rank tier EXACTLY. The exact tier if it is drawn,
    else the nearest tier ABOVE (reported in dev/handover/reports/fig-rank-match.md), NEVER a lower rank's dress, never maid art on a
    consort. Nothing to show -> null (figFor returns "" and the frame shows its own placeholder). (Old rule: nearest tier either way, so a
    Hoàng hậu (t8) wore t4 and a promoted maid wore maid clothes.) */
 if(!base&&tier!=null){return figBestRank(T,tier,age)}
 if(!base&&T.length&&tier==null)return figBest(T,null,age);
 if(B.length){const N=B.filter(f=>f.tier==null||f.tier==="");return figBest(N.length?N:B,null,age)}
 return figBest(L,tier,age)}
/* strict rank pick inside one identity's consort-dress records T: exact tier, else the nearest tier above, else null (never lower) */
function figBestRank(T,tier,age){try{if(!T||!T.length)return null;const C=T.filter(f88IsCT);if(tier==null)return C.length?figBest(C,null,age):null;
 let md=1e9;for(const f of C){const d=f88TNum(f)-tier;if(d>=0&&d<md)md=d}if(md===1e9)return null;
 return figBest(C.filter(f=>f88TNum(f)-tier===md),tier,age)}catch(e){return null}}
/* who wears consort dress */
function f88Wear(who){try{if(who===S)return !(typeof isSrv==="function"&&isSrv());return (rivals||[]).includes(who)}catch(e){return false}}
/* her maid dress rank on the cung nữ road (review/player-dress): Tân Giả khố = m0, Ma ma = m4 (the highest maid dress; the mama
   pictures are other women), else her rank 0..4 (Cung nữ thô sử m0 · Cung nữ m1 · Đại cung nữ m2 · Chưởng sự cô cô m3 · Nữ quan m4) */
function f88SrvRk(){try{const v=S&&S.srv;if(!v)return 1;if(v.lau>0)return 0;if(v.mama)return 4;return Math.max(0,Math.min(4,v.rk==null?1:v.rk|0))}catch(e){return 1}}
function f88Best(L,who,kind){const Lp=kind==="por"?L.filter(f=>f.por):L;const W=f88Wear(who);
 const mr=(!W&&who===S)?f88SrvRk():(!W&&who&&who!==S&&who.role==="maid"&&typeof srk==="function")?(()=>{try{return srk(who)}catch(e){return null}})():null;
 return f88Pick(Lp.length?Lp:L,figTierOf(who),figAgeOf(who),!W,mr)}
/* j39 figFor with the tier-aware choice */
figFor=function(p,kind){try{if(!FIGS.length||!p||!S)return"";const who=figWho(p);if(!who)return"";const k=figPick(who);if(!k)return"";
 const r=k.split(":")[0];const L=(FIGIX[r]||{})[k];if(!L||!L.length)return"";const f=f88Best(L,who,kind);if(!f)return"";
 if(kind==="por")return figPath(f.por||f.file||f.src);return figPath(f.file||f.src)}catch(e){return""}};
/* maid faces still needed by servants (young maids without a face yet) + a margin, so they never run dry */
function f88Reserve(){let n=4;try{const L=(typeof allServ==="function"?allServ():[]).concat(S&&S.maid?[S.maid]:[]);
 for(const s of L)if(s&&!s.fid&&(s===S.maid||s.role==="maid")&&(s.age||18)<36)n++}catch(e){}return n}
function f88Take(who,k){who.fid=k;const U=figUsed();if(!U.includes(k))U.push(k);return k}
function f88FreeMaid(age){const U=new Set(figUsed());const fm=f88Keys("maid").filter(k=>!U.has(k));if(!fm.length)return null;
 return fm[Math.floor(Math.random()*fm.length)%fm.length]}
/* NPC consort without a face: uniform over the free part of the 84 (consort keys go through the old scorer: look by trait) */
/* F88_NEED_C: an NPC consort only draws a maid face once that identity has consort-dress art (Part C), so no consort wears
   maid clothes at a rank (8 dress tiers = 8 ranks); the pool grows to 84 by itself as Part C lands. false = all 84 now. */
let F88_NEED_C=true;
function f88Draw(who){const U=new Set(figUsed());const fc=f88Keys("consort").filter(k=>!U.has(k)),fm=f88Keys("maid").filter(k=>!U.has(k)&&(!F88_NEED_C||f88List(k).some(f88IsCT)));
 const room=Math.max(0,fm.length-f88Reserve());const n=fc.length+room;if(!n)return null;
 if(Math.random()*n<fc.length)return null;const k=fm[Math.floor(Math.random()*fm.length)%fm.length];return f88Take(who,k)}
(function(){const p0=figPick;figPick=function(who){try{
 if(who===S&&S&&S.pid&&f88Src(S.pid)==="maid"){figUsed();if(f88List(S.pid).length){S.fid=S.pid;return S.pid}return null}
 if(who&&who!==S&&S&&(rivals||[]).includes(who)){if(S.pid&&who.fid===S.pid)who.fid=null;
  if(who.fid&&f88Src(who.fid)&&f88List(who.fid).length)return who.fid;
  if(!who.fid&&typeof FIGS!=="undefined"&&FIGS.length){const k=f88Draw(who);if(k)return k}}
 }catch(e){console.error("f88",e)}return p0.apply(this,arguments)}})();
/* a maid raised to consort keeps her face (and her age) */
function f88Carry(n,m){try{if(!n)return;let k=null;
 if(m&&m.fid&&f88Src(m.fid)==="maid"&&f88List(m.fid).length)k=m.fid;
 if(!k&&m&&typeof FIGS!=="undefined"&&FIGS.length&&typeof m==="object"&&!m.fid){try{const r=figRoles(m);if(r.includes("maid")&&!r.includes("mama")){const kk=figPick(m);if(f88Src(kk)==="maid")k=kk}}catch(e){}}
 if(!k&&typeof FIGS!=="undefined"&&FIGS.length)k=f88FreeMaid(m&&m.age);
 if(k){f88Take(n,k);n.fromMaid=k;if(m&&m.age>=18&&m.age<60)n.age=m.age;
  const U=figUsed();const seen=new Set();S.fidUsed=U.filter(x=>seen.has(x)?false:(seen.add(x),true))}}catch(e){console.error("f88carry",e)}}
if(typeof servRanks==="function"){const s0=servRanks;servRanks=function(){let before=null;try{before=new Set(allServ())}catch(e){}
 const nr0=newRival,done=new Set();
 newRival=function(){const n=nr0.apply(this,arguments);try{if(before){const now=new Set(allServ());const gone=[...before].filter(s=>s&&!now.has(s)&&!done.has(s)&&s.role==="maid");const s=gone[gone.length-1];if(s){done.add(s);f88Carry(n,s)}}}catch(e){}return n};
 try{return s0.apply(this,arguments)}finally{newRival=nr0}}}
if(typeof sendMaid==="function"){const m0=sendMaid;sendMaid=function(a){const m=a&&a.maid;const nr0=newRival;
 newRival=function(){const n=nr0.apply(this,arguments);f88Carry(n,m);return n};try{return m0.apply(this,arguments)}finally{newRival=nr0}}}
/* ---------- API for the kit portrait chooser ---------- */
/* one identity's picture for a wearer (default: her), by dress tier and age with fallbacks; kind "por" (default) or "fig" */
function faceImg(id,who,kind){try{who=who||S;kind=kind||"por";const L=f88List(id);if(!L.length)return"";const f=f88Best(L,who,kind==="por"?"por":"fig");
 if(!f)return"";return figPath(kind==="por"?(f.por||f.file||f.src):(f.file||f.src))}catch(e){return""}}
/* the pool: filter "all" | "consort" | "maid"; who = the wearer the pictures are drawn for (default her).
   → [{id:"maid:m05", src:"maid"|"consort", n:5, por:"img/…", fig:"img/…", mine:bool, tiers:[1,2,…]}] in c01..c32, m01..m52 order */
function facePool(filter,who){who=who||S;return f88Keys(filter||"all").map(id=>({id,src:f88Src(id),n:f88Num(id),por:faceImg(id,who,"por"),fig:faceImg(id,who,"fig"),
 mine:!!(S&&S.pid===id),tiers:[...new Set(f88List(id).filter(f88IsCT).map(f88TNum))].sort((a,b)=>a-b)}))}
/* she may choose now: the identity card is open (new life rolled, not yet accepted) */
function faceOn(){try{return !!(typeof NLP!=="undefined"&&NLP&&S&&S.pid&&f88List(S.pid).length)}catch(e){return false}}
/* she takes face id: a consort holding it gets her previous face (swap, both stay unique); a servant holding it is cleared and
   draws a fresh maid face later; the stored roll (ctm-nextlife: d.pid + face snapshot) is rewritten so a reload shows the same.
   Returns true when changed. Cosmetic only: no stat changes. The caller redraws (render() + its own panel). */
function faceChoose(id){if(!faceOn()||!id||id===S.pid||!f88List(id).length)return false;const old=S.pid;
 const H=nlHolders();const holder=H.find(o=>o&&o!==S&&o.fid===id)||null;const swap=!!(holder&&(rivals||[]).includes(holder));
 let U=(S.fidUsed||[]).slice();
 if(swap)holder.fid=old;else{U=U.filter(x=>x!==old);if(holder){holder.fid=null;U=U.filter(x=>x!==id)}}
 S.pid=id;S.fid=id;if(!U.includes(id))U.push(id);if(swap&&!U.includes(old))U.push(old);
 const seen=new Set();S.fidUsed=U.filter(x=>seen.has(x)?false:(seen.add(x),true));
 try{const d=store.get(NL_KEY);if(d&&d.seed===NLP.seed){d.pid=id;d.fpick=id;const F=d.faces=d.faces||{h:[]};F.h=F.h||[];
   H.forEach((o,i)=>{if(!o)return;const r=F.h[i]=F.h[i]||{};if(o===S||(o===holder&&swap))r.fid=o.fid;else if(o===holder||r.fid===id)delete r.fid});
   F.fidUsed=S.fidUsed.slice();store.set(NL_KEY,d)}}catch(e){console.error(e)}
 try{const src=faceImg(id,S,"por");if(src&&typeof PORK!=="undefined"&&PORK[src]!==1){const im=new Image();im.onload=()=>{PORK[src]=1};im.src=src}}catch(e){}
 return true}
