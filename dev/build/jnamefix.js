/* jnamefix.js — ONE NAME CORE, part 2 (assembled LAST so every older fixer has run first). Pools + nmNew live in jname.js.
   nmFix(): one sweep over every person of the save (nmPeople):
     - an excluded (Vietnamese-style) name or a name someone else already holds (living or dead, the player first) is renamed with nmNew;
       the player's own name is NEVER changed (an NPC who collides with her is renamed instead); her own family keeps her surname;
     - when the old name belonged to that one person only, every text of the save that names her (ledger, notes, relations, roads,
       letters…) is rewritten to the new name; a shared old name stays with the person who keeps it (texts cannot tell them apart);
     - every name now held is written to the registry S.nmReg (so a name is never given again, even after its holder dies).
   Runs after a save loads (the one-time migration, then a no-op), after start(), and at every month end (safety net for any place
   that might still make a name by itself). Co-op: only the world owner (host or solo) sweeps; a guest keeps the host's names. */
function nmEsc(s){return String(s).replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}
/* rewrite old -> neu in every string of the save, whole words only; other people's longer names that contain old are protected */
function nmRewrite(old,neu,protect){if(!old||old===neu)return 0;const re=new RegExp("(?<![\\p{L}\\p{N}])"+nmEsc(old)+"(?![\\p{L}\\p{N}])","gu");
 const P=(protect||[]).filter(p=>p&&p!==old&&p.indexOf(old)>=0).sort((a,b)=>b.length-a.length);let n=0;const seen=new Set();
 const fix=s=>{if(s.indexOf(old)<0)return s;let t=s;P.forEach((p,i)=>{t=t.split(p).join("\u0001"+i+"\u0001")});const u=t.replace(re,()=>{n++;return neu});
  return P.length?u.replace(/\u0001(\d+)\u0001/g,(m,i)=>P[+i]):u};
 const walk=o=>{if(!o||typeof o!=="object"||seen.has(o))return;seen.add(o);
  if(Array.isArray(o)){for(let i=0;i<o.length;i++){const v=o[i];if(typeof v==="string")o[i]=fix(v);else walk(v)}return}
  for(const k in o){const v=o[k];if(typeof v==="string")o[k]=fix(v);else if(v&&typeof v==="object")walk(v)}};
 try{walk(S);walk(rivals)}catch(e){console.error("nmRewrite",e)}return n}
const NM_FIX={runs:0,renamed:[]};
function nmFix(why){if(typeof S==="undefined"||!S||!nmOwner())return null;const out=[];
 try{const L=nmPeople();const me=L.find(e=>e.me);const meSur=me?nmSurOf(nmBare(S.name)):"";
  const held=new Map();for(const e of L){const b=nmBare(e.o[e.f]);held.set(b,(held.get(b)||0)+1)}
  const full=new Set(),vars=new Set(),sur=new Set();const todo=[];
  for(const e of L){const raw=e.o[e.f];const b=nmBare(raw);let bad=e.me?"":nmBad(b);
   if(bad==="sur"&&e.fam&&nmSurOf(b)===meSur)bad="";/* her own family keeps her surname */
   if(!e.me&&!bad){if(full.has(b))bad="dup";else if(nmAlive(e)&&(e.kind==="mo"?sur.has(nmSurOf(b)):nmVars(b).some(v=>vars.has(v))))bad="like"}
   if(bad){todo.push([e,bad]);continue}
   full.add(b);if(nmAlive(e)){nmVars(b).forEach(v=>vars.add(v));if(e.kind==="mo")sur.add(nmSurOf(b))}}
  /* the storyline people kept as plain text (j4 S.st.guard / S.st.stu) and the fallen consort's name (j59 S.lcfPn) */
  const txt=[];try{if(S.st){if(S.st.guard)txt.push([S.st,"guard","m"]);if(S.st.stu)txt.push([S.st,"stu","m"])}if(S.lcfPn)txt.push([S,"lcfPn","f",{sur:"Tần"}])}catch(e){}
  for(const [o,f,kind,op] of txt){const b=nmBare(o[f]);const bad=nmBad(b)||(full.has(b)?"dup":"");if(bad)todo.push([{o,f,kind,txt:1,op},bad]);else full.add(b)}
  const names=L.map(e=>String(e.o[e.f]));
  for(const [e,bad] of todo){const raw=String(e.o[e.f]);const b=nmBare(raw);const pre=raw.slice(0,raw.length-b.length);
   const keepSur=e.fam&&nmSurOf(b)&&!NM_BAN_SUR.includes(nmSurOf(b))?nmSurOf(b):e.fam&&meSur&&!NM_BAN_SUR.includes(meSur)&&e.kind!=="mo"?meSur:null;
   let nb=e.kind==="prince"||e.kind==="princess"?nmNew(e.kind):nmNew(e.kind,e.op||(keepSur?{sur:keepSur}:{}));
   e.o[e.f]=pre+nb;if(e.f==="pn"&&e.o.name===b)e.o.name=nb;
   if(e.o.eid&&typeof e.o.call==="string"){const oc=e.o.call;e.o.call=nmSurOf(nb)+" "+oc.split(" ").slice(-2).join(" ");if(held.get(b)===1&&oc!==e.o.call&&nmSurOf(b)!==nmSurOf(nb))nmRewrite(oc,e.o.call,names)}
   let refs=0;if(bad!=="dup"&&held.get(b)===1)refs=nmRewrite(b,nb,names);
   out.push({old:raw,neu:pre+nb,why:bad,kind:e.kind,refs})}
  /* "Phế phi họ X" label of the cold palace */
  try{const o="Phế phi họ Lý",n2="Phế phi họ Tần";if(S.lyF&&S.lyF.name===o)S.lyF.name=n2;const k=nmRewrite(o,n2,[]);if(k)out.push({old:o,neu:n2,why:"sur",kind:"lbl",refs:k})}catch(e){}
  const R=nmReg();for(const e of nmPeople())R[nmBare(e.o[e.f])]=R[nmBare(e.o[e.f])]||e.kind;
  try{if(S.st){if(S.st.guard)R[nmBare(S.st.guard)]="m";if(S.st.stu)R[nmBare(S.st.stu)]="m"}if(S.lcfPn)R[nmBare(S.lcfPn)]="f"}catch(e){}
  S.nmV=1;NM_FIX.runs++;if(out.length){NM_FIX.renamed.push(...out.map(x=>Object.assign({at:why||""},x)));if(NM_FIX.renamed.length>400)NM_FIX.renamed.splice(0,NM_FIX.renamed.length-400)}
 }catch(e){console.error("nmFix",e)}return out}
window.nmFix=nmFix;window.NM_FIX=NM_FIX;
(function(){
 const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{nmFix("load")}catch(e){}return r};
 const s0=start;start=function(){const r=s0.apply(this,arguments);try{nmFix("start")}catch(e){}return r};
 if(typeof monthTick==="function"){const m0=monthTick;monthTick=function(){const r=m0.apply(this,arguments);try{nmFix("month")}catch(e){}return r}}
})();
