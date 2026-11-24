/* jnamefix.js — ONE NAME CORE, part 2 (assembled LAST so every older fixer has run first). Pools + nmNew live in jname.js.
   nmFix(): one sweep over every person of the save (nmPeople):
     - an excluded (Vietnamese-style) name or a name someone else already holds (living or dead, the player first) is renamed with nmNew;
       the player's own name is NEVER changed (an NPC who collides with her is renamed instead); her own family keeps her surname;
     - when the old name belonged to that one person only, every text of the save that names her (ledger, notes, relations, roads,
       letters…) is rewritten to the new name; a shared old name stays with the person who keeps it (texts cannot tell them apart); when no one keeps it, its texts go to the first holder renamed;
     - every name now held is written to the registry S.nmReg (so a name is never given again, even after its holder dies).
   Runs after a save loads (the one-time migration, then a no-op), after start(), and at every month end (safety net for any place
   that might still make a name by itself). Co-op: only the world owner (host or solo) sweeps; a guest keeps the host's names. */
function nmEsc(s){return String(s).replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}
/* rewrite old -> neu in every string of the save, whole words only; other people's longer names that contain old are protected */
function nmRewrite(old,neu,protect){if(!old||old===neu)return 0;const re=new RegExp("(?<![\\p{L}\\p{N}])"+nmEsc(old)+"(?![\\p{L}\\p{N}])","gu");
 const rk=new RegExp("(?<![\\p{L}])"+nmEsc(old)+"(?![\\p{L}\\p{N}])","u");/* keys like S.rcpK "v12<name>" */const P=(protect||[]).filter(p=>p&&p!==old&&p.indexOf(old)>=0&&nmBare(p)!==old)/* review r1: never protect the renamed person's own titled name ("Thị vệ X", "Công chúa X"), else her titled texts were never rewritten */.sort((a,b)=>b.length-a.length);let n=0;const seen=new Set();
 const fix=s=>{if(s.indexOf(old)<0)return s;let t=s;P.forEach((p,i)=>{t=t.split(p).join("\u0001"+i+"\u0001")});const u=t.replace(re,()=>{n++;return neu});
  return P.length?u.replace(/\u0001(\d+)\u0001/g,(m,i)=>P[+i]):u};
 const walk=o=>{if(!o||typeof o!=="object"||seen.has(o)||o===S.nmReg||o===S.nmOrd)return;seen.add(o);/* the registry keeps old names: never rewritten; nor the host's rename orders (coop-name-clash: her seat rewrote its own copy of an order, o became n) */
  if(Array.isArray(o)){for(let i=0;i<o.length;i++){const v=o[i];if(typeof v==="string")o[i]=fix(v);else walk(v)}return}
  for(const k of Object.keys(o)){const v=o[k];if(typeof v==="string")o[k]=fix(v);else if(v&&typeof v==="object")walk(v);
   if(k.indexOf(old)>=0){const k2=k.replace(rk,neu);if(k2!==k){if(!(k2 in o)){o[k2]=o[k];delete o[k]}else if(typeof o[k]==="number"&&typeof o[k2]==="number"){o[k2]=Math.max(o[k2],o[k]);delete o[k]}}}}};/* keys too (S.rcpK "v12<name>") */
 try{walk(S);walk(rivals)}catch(e){console.error("nmRewrite",e)}return n}
const NM_FIX={runs:0,renamed:[]};
function nmFix(why){if(typeof S==="undefined"||!S)return null;if(!nmOwner()){nmOrdApply(why);return null}const out=[];nmOrdPrune();
 /* co-op: the friend's own people (e.guest: her coop entry and its maid/staff/kids) are named on her seat and never renamed here (a rename
   on the host copy would be undone by her next sync and the two seats would read different names); they hold their names first and the
   host's world people (which sync to both seats) give way */
 /* first sweep of an old save (no registry yet): people who already left the save (sold, dead, sent home) still name their records
    (S.dnames, name keys of S.npw "Name|kind"); their names go into the registry first so no one is renamed into them (review r1) */
 try{if(!S.nmV){const R0=nmReg();(S.dnames||[]).forEach(n=>{const b=nmBare(n);if(b&&!R0[b])R0[b]="gone"});
  for(const k in (S.npw||{})){const n=k.split("|")[0];if(n&&n!=="*"&&n!=="me"&&/^\p{Lu}/u.test(n)&&!/\d/.test(n)&&!R0[n])R0[n]="gone"}}}catch(e){}
 try{const L0=nmPeople();const L=L0.filter(e=>e.me).concat(L0.filter(e=>!e.me&&e.guest),L0.filter(e=>!e.me&&!e.guest));const me=L.find(e=>e.me);const meSur=me?nmSurOf(nmBare(S.name)):"";
  const held=new Map();for(const e of L){const b=nmBare(e.o[e.f]);held.set(b,(held.get(b)||0)+1)}
  const full=new Set(),vars=new Set(),sur=new Set(),vby=new Map();const todo=[];
  for(const e of L){const raw=e.o[e.f];const b=nmBare(raw);let bad=e.me||e.guest?"":nmBad(b);if(e.guest&&!e.me&&full.has(b))bad="dup";/* coop-name-clash: her person behind a higher holder (the host herself / the friend / an earlier person of hers) */
   if(bad==="sur"&&e.fam&&nmSurOf(b)===meSur)bad="";/* her own family keeps her surname */
   if(!e.me&&!e.guest&&!bad){if(full.has(b))bad="dup";else if(nmAlive(e)&&(e.kind==="mo"?sur.has(nmSurOf(b)):nmVars(b).some(v=>vars.has(v)))){bad="like";e.by=(nmVars(b).map(v=>vby.get(v)).find(Boolean))||""}}
   if(bad){todo.push([e,bad]);continue}
   full.add(b);if(nmAlive(e)&&!e.fr/* coop-name-clash: the friend's people seen only through her blob (her servants, home family, marriage pools) hold their FULL names; a world person is not renamed for a short form one of them shares (her seat's own nmNew keeps short forms apart; host-side churn of living consorts for a pool candidate = a world rename every merge) */){nmVars(b).forEach(v=>{vars.add(v);if(!vby.has(v))vby.set(v,(e.guest?(e.fr?"fr:":"g:"):e.me?"me:":"")+(e.fp?e.fp+":":"")+b)});if(e.kind==="mo")sur.add(nmSurOf(b))}}
  /* the storyline people kept as plain text (j4 S.st.guard / S.st.stu) and the fallen consort's name (j59 S.lcfPn) */
  const txt=[];try{if(S.st){if(S.st.guard)txt.push([S.st,"guard","m"]);if(S.st.stu)txt.push([S.st,"stu","m"])}if(S.lcfPn)txt.push([S,"lcfPn","f",{sur:"Tần"}])}catch(e){}
  for(const [o,f,kind,op] of txt){const b=nmBare(o[f]);const bad=nmBad(b)||(full.has(b)?"dup":"");if(bad)todo.push([{o,f,kind,txt:1,op},bad]);else full.add(b)}
  const names=L.map(e=>String(e.o[e.f]));const shared=new Map();
  for(const [e,bad] of todo){if(e.guest){nmOrder(e);continue}const raw=String(e.o[e.f]);const b=nmBare(raw);const pre=raw.slice(0,raw.length-b.length);
   const keepSur=e.fam&&nmSurOf(b)&&!NM_BAN_SUR.includes(nmSurOf(b))?nmSurOf(b):e.fam&&meSur&&!NM_BAN_SUR.includes(meSur)&&e.kind!=="mo"?meSur:null;
   let nb=e.kind==="prince"||e.kind==="princess"?nmNew(e.kind):nmNew(e.kind,e.op||(keepSur?{sur:keepSur}:{}));
   e.o[e.f]=pre+nb;if(e.f==="pn"&&e.o.name===b)e.o.name=nb;
   if(e.o.eid&&typeof e.o.call==="string"){const oc=e.o.call;e.o.call=nmSurOf(nb)+" "+oc.split(" ").slice(-2).join(" ");if(held.get(b)===1&&oc!==e.o.call&&nmSurOf(b)!==nmSurOf(nb))nmRewrite(oc,e.o.call,names)}
   let refs=0;if(bad!=="dup"&&held.get(b)===1)refs=nmRewrite(b,nb,names);else if(bad!=="dup"&&!shared.has(b))shared.set(b,{nb,x:null});
   const x={old:raw,neu:pre+nb,why:bad,kind:e.kind,refs};if(e.by)x.by=e.by;/* who keeps the short form (diagnostics) */if(shared.has(b)&&!shared.get(b).x&&shared.get(b).nb===nb)shared.get(b).x=x;out.push(x)}
  /* a name two people shared, and every holder was renamed (e.g. two maids "Thu Thủy"): texts and name keys (S.npw "Thu Thủy|maidSell")
     cannot tell them apart, but they must not keep naming nobody (law 6b: a person named in any road really exists) -> they go to the
     first holder renamed (the player's family / the friend's people / the world, in that order); if someone still holds it, they stay */
  if(shared.size){const now=new Set(nmPeople().map(e=>nmBare(e.o[e.f])));for(const [b,v] of shared)if(!now.has(b)){const k=nmRewrite(b,v.nb,names.concat([...now]));if(v.x)v.x.refs=k}}
  /* "Phế phi họ X" label of the cold palace */
  try{const o="Phế phi họ Lý",n2="Phế phi họ Tần";if(S.lyF&&S.lyF.name===o)S.lyF.name=n2;const k=nmRewrite(o,n2,[]);if(k)out.push({old:o,neu:n2,why:"sur",kind:"lbl",refs:k})}catch(e){}
  const R=nmReg();for(const e of nmPeople())R[nmBare(e.o[e.f])]=R[nmBare(e.o[e.f])]||e.kind;
  try{if(S.st){if(S.st.guard)R[nmBare(S.st.guard)]="m";if(S.st.stu)R[nmBare(S.st.stu)]="m"}if(S.lcfPn)R[nmBare(S.lcfPn)]="f"}catch(e){}
  S.nmV=1;NM_FIX.runs++;if(out.length){NM_FIX.renamed.push(...out.map(x=>Object.assign({at:why||""},x)));if(NM_FIX.renamed.length>400)NM_FIX.renamed.splice(0,NM_FIX.renamed.length-400)}
 }catch(e){console.error("nmFix",e)}return out}
window.nmFix=nmFix;window.NM_FIX=NM_FIX;
/* ---------- coop-name-clash: the two players' people in ONE name list (law 6b), the HOST decides, the guest reads the same ----------
   S.nmReg and S.nmOrd are WORLD keys (jcoopworld W_KEYS + HOST_ONLY): the guest's new names avoid every name the host ever gave, and
   the host's rename orders reach her. A person of the friend (her coop entry, her maid / servants / children / home family, read from
   the room's P of her seat) holds her name before every world person and the host's own people (they give way: nmFix renames them, texts
   follow). Only behind the host player herself (or an earlier person of the friend) does one of hers give way; the host cannot rename a
   person that lives on her seat, so it writes an ORDER S.nmOrd[her pid] = [{p:path in her S, o:old, n:new}] (n registered at once) and
   her seat applies it (nmOrdApply, after every rebuild and on the host-lag relay); the host drops an order once her blob shows it done. */
const nmPidF=()=>{try{return window.COOPW.seat==="a"?902:901}catch(e){return 0}},nmPidMe=()=>{try{return window.COOPW.seat==="a"?901:902}catch(e){return 0}};
function nmAt(s,p){let o=s;if(p==="name")return s;for(const k of String(p).split(".")){if(!o||typeof o!=="object")return null;o=o[k]}return o&&typeof o==="object"?o:null}
function nmOrder(e){const pid=nmPidF();if(!pid||!e.fp)return;S.nmOrd=S.nmOrd&&typeof S.nmOrd==="object"?S.nmOrd:{};const L=S.nmOrd[pid]=Array.isArray(S.nmOrd[pid])?S.nmOrd[pid]:[];
 const raw=String(e.o[e.f]),b=nmBare(raw),pre=raw.slice(0,raw.length-b.length);let x=L.find(z=>z.p===e.fp&&z.o===b);
 if(!x){const n=e.kind==="prince"||e.kind==="princess"?nmNew(e.kind):nmNew(e.kind,e.fam&&nmSurOf(b)?{sur:nmSurOf(b)}:{});x={p:e.fp,o:b,n};L.push(x);NM_FIX.orders=(NM_FIX.orders||0)+1}
 if(!e.fr)e.o[e.f]=pre+x.n/* her coop entry on this seat (a display copy) shows the new name at once; her seat sends it back after she applies */}
function nmOrdPrune(){try{const O=S.nmOrd;if(!O||typeof O!=="object")return;const W=window.COOPW;if(!W||!W.on){delete S.nmOrd;return}const P=nmFrBlob(),pid=String(nmPidF());
 for(const k of Object.keys(O)){if(k!==pid||!P){delete O[k];continue}/* done (her blob shows the new name), or her person is gone (rebirth): dropped */
  const hers=nmPers(P.S);O[k]=(Array.isArray(O[k])?O[k]:[]).filter(z=>{const o=nmAt(P.S,z.p);return !!(o&&nmBare(o.name)===z.o)||hers.some(e=>nmBare(e.o.name)===z.o)/* review r1: a path from her entry's copy can miss her real S (kidsCopy drops dead children: "kids.i" shifts) -> still pending while any of her people holds the old name (nmOrdApply finds it by name the same way) */});if(!O[k].length)delete O[k]}}catch(e){}}
/* the other player's own people from the room's P (on the guest too: the host at home is not on her stage, yet she holds her name) */
function nmOtherHeld(b){try{const W=window.COOPW;const P=W&&W.on&&W.base&&W.base.P&&W.base.P[W.seat==="a"?"b":"a"];return P&&P.S&&!P.dead?nmPers(P.S).filter(e=>nmBare(e.o.name)===b).length:0}catch(e){return 0}}
/* GUEST: apply the host's orders for her own people (idempotent: a person already renamed is skipped) */
const NM_ORD={applied:0,last:null};
function nmOrdApply(why){try{const O=S&&S.nmOrd;const L=O&&O[nmPidMe()];if(!Array.isArray(L)||!L.length)return 0;let n=0;const mine=nmPers(S);
  for(const z of L){if(!z||!z.o||z.o===z.n)continue;let o=nmAt(S,z.p);if(!o||nmBare(o.name)!==z.o){const e=mine.find(m=>nmBare(m.o.name)===z.o);o=e?e.o:null}if(!o)continue;
   const raw=String(o.name),b=nmBare(raw),pre=raw.slice(0,raw.length-b.length);o.name=pre+z.n;n++;
   const held=nmPeople().filter(e=>nmBare(e.o[e.f])===z.o).length+nmOtherHeld(z.o);if(!held)nmRewrite(z.o,z.n,nmPeople().map(e=>String(e.o[e.f])))/* her texts follow when no one else here holds the old name */}
  if(n){NM_ORD.applied+=n;NM_ORD.last={why:why||"",n}}return n}catch(e){console.error("nmOrdApply",e);return 0}}
/* a NEW LIFE (first character, rebirth, either seat) is a draft until it enters the room: every person of it whose full name is already
   held in the room's world C (NPCs, their servants and children, court, men, the other player and her people, every name ever given:
   C.W.S.nmReg + dnames) is renamed now, before it is sent (jcoopworld attach). Her own name too: the new character is not yet anyone. */
function nmNamesOfC(C){const A=[],V=new Set();try{const W=C.W||{},WS=W.S||{};const live=x=>x.alive!==false&&x.alive!==0&&!x.dead&&!x.out;
  const b=(x,lv)=>{if(x&&typeof x==="object"&&typeof x.name==="string"){const n=nmBare(x.name);A.push(n);if(lv!==false&&live(x))nmVars(n).forEach(v=>V.add(v))}};
  for(const r of W.R||[]){if(!r||r.coop)continue;b(r);b(r.maid);(r.staff||[]).forEach(x=>{if(x&&!x.coop)b(x)});(r.kids||[]).forEach(x=>b(x))}
  const Cc=WS.court||{};for(const k in Cc){const c=Cc[k];if(c&&typeof c==="object"){if(c.pn){A.push(nmBare(c.pn));nmVars(nmBare(c.pn)).forEach(v=>V.add(v))}else b(c)}}
  (WS.men||[]).forEach(x=>b(x));try{for(const c in (WS.trieu&&WS.trieu.H)||{})b(WS.trieu.H[c])}catch(e){}try{(WS.thO&&WS.thO.staff||[]).forEach(x=>b(x))}catch(e){}
  for(const k in WS.nmReg||{})A.push(k);(WS.dnames||[]).forEach(n=>A.push(nmBare(n)));
  for(const seat in C.P||{}){if(seat===(window.COOPW&&window.COOPW.seat))continue;const P=C.P[seat];if(P&&P.S&&!P.dead)nmPers(P.S).forEach(e=>b(e.o))}}catch(e){console.error("nmNamesOfC",e)}
 return{full:A.filter(Boolean),vars:V}}
const NM_BIRTH={runs:0,renamed:[]};
/* her person is a clash when the full name is taken (living or dead, ever given) or, as nmFix judges the living, a short form of it is a
   living person's (no "Phương Hoa" beside "Bạch Phương Hoa"): checked here so the host's join sweep has nothing of the room to rename */
function nmBirth(C){if(!C||!C.W||typeof S==="undefined"||!S)return 0;const T=nmNamesOfC(C);const taken=new Set(T.full);const mine=nmPers(S);const own=new Set(),ownV=new Set();let n=0;NM_BIRTH.runs++;
 const hit=(b,kind)=>taken.has(b)||own.has(b)||(kind!=="mo"&&nmVars(b).some(v=>T.vars.has(v)||ownV.has(v)));
 for(const e of mine){const raw=String(e.o.name),b=nmBare(raw);if(!hit(b,e.kind)){own.add(b);nmVars(b).forEach(v=>ownV.add(v));continue}
  const pre=raw.slice(0,raw.length-b.length);const more=[...taken,...T.vars,...own,...ownV];const op={more,reg:nmOwner()};if(e.fam&&nmSurOf(b))op.sur=nmSurOf(b);
  const nb=e.kind==="prince"||e.kind==="princess"?nmNew(e.kind,{more,reg:nmOwner()}):nmNew(e.kind,op);e.o.name=pre+nb;own.add(nb);nmVars(nb).forEach(v=>ownV.add(v));n++;
  try{nmRewrite(b,nb,mine.map(m=>String(m.o.name)))}catch(x){}NM_BIRTH.renamed.push({p:e.fp,old:b,neu:nb})}
 return n}
window.nmBirth=nmBirth;window.nmOrdApply=nmOrdApply;window.NM_ORD=NM_ORD;window.NM_BIRTH=NM_BIRTH;
(function(){
 /* save round-trip family (robot10-coop row S.qPool[].name, fixer #9): a co-op life (a coop entry = the friend in rivals) is loaded only to go
    back into its room (jslots: it is never written to a solo sổ); at load COOPW is not on yet, so nmOwner() is true on EITHER seat and the
    load sweep renamed the guest's own people (her pool candidate sharing a short form with the friend). The room's sweep is the host's
    nmFix("join") (jcoopworld attach) and his month sweep; a co-op save is never swept on load, so save → load → save keeps every name. */
 const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{if(!(Array.isArray(rivals)&&rivals.some(v=>v&&v.coop)))nmFix("load")}catch(e){}return r};
 const s0=start;start=function(){const r=s0.apply(this,arguments);try{nmFix("start")}catch(e){}return r};
 /* coop-name-clash: an order the host relays inside the week (review/coop-host-lag ops carry the world key nmOrd) is applied at the next
    render on her seat, as a sync from the host (CW.inFC: the guest tripwire counts only writes outside a sync); no orders = one lookup */
 if(typeof render==="function"){const r0=render;render=function(){try{const W=window.COOPW;if(W&&W.on&&S&&S.nmOrd&&!nmOwner()){const L=S.nmOrd[nmPidMe()];if(Array.isArray(L)&&L.length){W.inFC=(W.inFC||0)+1;try{nmOrdApply("relay")}finally{W.inFC--}}}}catch(e){}return r0.apply(this,arguments)}}
 if(typeof monthTick==="function"){const m0=monthTick;monthTick=function(){const r=m0.apply(this,arguments);try{nmFix("month")}catch(e){}return r}}
})();
