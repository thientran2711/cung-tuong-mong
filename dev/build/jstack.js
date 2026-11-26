/* ================= jstack: ONE item-add rule + STACKS (inv-stack, MAIN 154 ORDER 26/11 ~07:50Z; FOREMAN F 07:45Z s7 evidence)
   Before: every piece was one entry for ever — s7 year 18: S.inv 1,437 entries (518 Nến mỡ dê …, all from:"noivu" lệ tháng), 43 NPC bags 7,537,
   the ledger store S.il.box 20,688 «kho» records (2.75 MB of a 4.76 MB save); every list drew one card per entry (DOM 43k, renderer 2.4 GB) and
   the weekly store loop walked every record.
   Now (law 6c REAL OBJECTS: every piece still exists, owned, traceable — counted, with its owner, source, giver and date):
   1. p.inv keeps at most BAL.stack.live REAL pieces of one kind-and-source (same k + from + giver + src + uses u + colour c …: invSig);
      the rest of that kind sit in the person's OWN stack p.invS = [{k,from,giver,…, n, d (latest), d0 (earliest)}] — the same chest, counted.
      Every per-piece road (use, give, gift, sell, steal, confiscate, co-op ops, the ledger census) keeps working on the real pieces in p.inv;
      after a piece leaves, the next one comes out of the stack (invTop: after each render for her, after each turn for everyone).
   2. Counting goes through invCount / invGroups (pieces + stacks): bag grid «Tư trang», gift picker «Biếu quà», shop «có», Bán, NPC weights.
   3. The ledger store S.il.box folds the same way (plain parked records at Nội vụ phủ, why kho / dead): S.il.bs, refilled by boxTop.
   4. Old saves: on load every bag and the store are folded (no piece lost: totals equal — dev/test/inv-stack.js).
   Two-way (law 1): the same rule for her, every NPC and the servants. A co-op friend's ENTRY (v.coop, a copy of her chest) is never folded;
   she folds her own chest on her own seat. NPC bags fold only where the NPCs live (solo / co-op host).
   Numbers: BAL.stack (ONE CORE). BAL.stack.on = false turns folding off (stacks already made still count and still come out). ============ */
Object.assign(BAL,{stack:{on:true,live:2}});
/* the fields a plain piece may carry; any other field (worn w, hidden h, taint t/by, lost-case lo/gh, handmade wk, co-op ci/hiu …) = one of a kind, never stacked */
const INV_OK=["k","from","d","giver","src","iu","u","c","nt","fab","nvp","tested"];
const INV_SIGX=["iu","d","d0","n"];
/* flags that only matter when set (giveTo leaves w:0 on a given piece): unset = plain */
const INV_FLAG=["w","h","t","by","gh","lo","bor"];
function invOn(){return !!(typeof BAL==="object"&&BAL.stack&&BAL.stack.on)}
function invLive(){return Math.max(1,(BAL.stack&&BAL.stack.live)|0||2)}
function invCan(e){if(!e||typeof e!=="object"||Array.isArray(e)||typeof e.k!=="string")return false;for(const f in e)if(INV_OK.indexOf(f)<0&&!(INV_FLAG.indexOf(f)>=0&&!e[f]))return false;
 if(e.k==="tp")return false;try{if(typeof IL_DH!=="undefined"&&IL_DH.includes(e.k))return false}catch(x){}
 return !!((typeof IT==="object"&&IT[e.k])||(typeof WD_ITEMS==="object"&&WD_ITEMS&&WD_ITEMS[e.k]))}
/* kind-and-source: every field but the ledger id, the date and the count */
function invSig(e){const o=[];for(const f of Object.keys(e).sort())if(INV_SIGX.indexOf(f)<0&&e[f]!==undefined&&!(INV_FLAG.indexOf(f)>=0&&!e[f]))o.push(f+"="+JSON.stringify(e[f]));return o.join("|")}
function invS(p){if(!p)return[];if(!Array.isArray(p.invS))p.invS=[];return p.invS}
/* how many pieces one inv entry or stack stands for */
function invN(x){return x&&x.n>1?x.n|0:1}
/* ONE item-add rule: every piece that enters a person's chest goes through here (the push sites of dev/build, table in reports/inv-stack.md).
   Returns the new length, exactly as the Array push it replaces (callers keep their own reference to the piece). Folding happens after the
   turn (invFoldAll), so a piece received now stays a real entry while its dialog, reveal and ledger run. */
function invAdd(p,e){if(!p)return 0;if(!Array.isArray(p.inv))p.inv=[];return p.inv.push(e)}
/* a person whose bag folds: her, or a living NPC / servant record — never a co-op friend's entry (her seat folds her own chest) */
function invFoldOk(p){if(!p||typeof p!=="object"||p.coop)return false;if(typeof S!=="undefined"&&p===S)return !S.dead;return p.alive!==false&&!p.dead}
function invLedgerDrop(e){try{if(e&&e.iu&&typeof S!=="undefined"&&S&&S.il&&S.il.at)delete S.il.at[e.iu]}catch(x){}}
/* move the surplus plain pieces of each kind-and-source into the stack; `all`: also this turn's pieces (load migration) */
function invFold(p,all){if(!invOn()||!invFoldOk(p)||!Array.isArray(p.inv)||!p.inv.length)return 0;const L=p.inv,G=new Map(),T=(typeof S!=="undefined"&&S&&S.turn)||0;
 for(const e of L)if(invCan(e)){const s=invSig(e);const a=G.get(s);if(a)a.push(e);else G.set(s,[e])}
 const live=invLive(),rm=new Set();let moved=0;
 for(const [s,A] of G){if(A.length<=live)continue;const old=all?A:A.filter(e=>!(e.d!=null&&e.d>=T));/* this turn's pieces stay real (reveal, skim, ledger) */
  const k=Math.min(old.length,A.length-live);if(k<=0)continue;let st=invS(p).find(x=>invSig(x)===s);
  if(!st){const proto={};for(const f in old[0])if(INV_SIGX.indexOf(f)<0&&!(INV_FLAG.indexOf(f)>=0&&!old[0][f]))proto[f]=old[0][f];st=Object.assign(proto,{n:0});invS(p).push(st)}
  for(let i=0;i<k;i++){const e=old[i];rm.add(e);st.n+=invN(e);if(e.d!=null){st.d=st.d==null?e.d:Math.max(st.d,e.d);st.d0=st.d0==null?e.d:Math.min(st.d0,e.d)}invLedgerDrop(e)}moved+=k}
 if(rm.size){let j=0;for(let i=0;i<L.length;i++)if(!rm.has(L[i]))L[j++]=L[i];L.length=j}
 return moved}
/* bring pieces out of the stack until each kind-and-source has `live` real pieces again (or `want` of one stack: selling ×N) */
function invUnit(st){const e={};for(const f in st)if(f!=="n"&&f!=="d0")e[f]=st[f];return e}
function invTop(p,only,want){if(!p||!Array.isArray(p.invS)||!p.invS.length)return 0;if(!Array.isArray(p.inv))p.inv=[];const C=new Map();
 for(const e of p.inv)if(invCan(e)){const s=invSig(e);C.set(s,(C.get(s)||0)+1)}let out=0;
 for(const st of p.invS.slice()){if(only&&!only(st))continue;const s=invSig(st);let have=C.get(s)||0;const need=want!=null?want:invLive();
  while(have<need&&st.n>0){p.inv.push(invUnit(st));st.n--;have++;out++}C.set(s,have)}
 p.invS=p.invS.filter(st=>st.n>0);return out}
/* count: real pieces + stacked ones matching pred (pred sees an entry or a stack: k, from, giver, …) */
function invCount(p,pred){if(!p)return 0;let n=0;for(const e of p.inv||[])if(e&&(!pred||pred(e)))n++;for(const st of p.invS||[])if(st&&st.n>0&&(!pred||pred(st)))n+=st.n|0;return n}
/* how many more of this entry's kind-and-source wait in the stack (bag tiles add it to their ×N) */
function invMore(p,e){if(!p||!e||!invCan(e)||!Array.isArray(p.invS))return 0;const s=invSig(e);const st=p.invS.find(x=>invSig(x)===s);return st?st.n|0:0}
/* everyone whose bag folds where this seat runs them */
function invNpcHere(){try{if(typeof COOPW==="object"&&COOPW&&COOPW.on&&COOPW.seat&&COOPW.seat!=="a")return false}catch(e){}return true}
function invPeople(){const L=[];if(typeof S!=="undefined"&&S)L.push(S);if(!invNpcHere())return L;try{for(const v of (typeof rivals!=="undefined"&&rivals)||[]){if(v&&L.indexOf(v)<0)L.push(v);for(const s of v.staff||[])if(s&&typeof s==="object"&&Array.isArray(s.inv)&&L.indexOf(s)<0)L.push(s)}}catch(e){}
 try{if(S&&S.srv&&typeof S.srv==="object"&&Array.isArray(S.srv.inv))L.push(S.srv)}catch(e){}return L}
/* ---- the ledger store: plain parked records (Nội vụ phủ, kho / dead, no timer of their own) fold the same way into S.il.bs ---- */
const BOX_OK=["e","at","why","own","w","by"];
function boxCan(x){if(!x||typeof x!=="object"||x.at!=="nvp"||(x.why!=="kho"&&x.why!=="dead"))return false;for(const f in x)if(BOX_OK.indexOf(f)<0)return false;return invCan(x.e)}
function boxSig(x){return [x.at,x.why,String(x.own==null?"":x.own),String(x.by||""),invSig(x.e)].join("#")}
function boxFold(){if(!invOn()||typeof S==="undefined"||!S||!S.il||!Array.isArray(S.il.box))return 0;const I=S.il,B=I.box;if(!Array.isArray(I.bs))I.bs=[];
 const G=new Map();for(const x of B)if(boxCan(x)){const s=boxSig(x);const a=G.get(s);if(a)a.push(x);else G.set(s,[x])}
 const live=invLive(),rm=new Set();let moved=0;
 for(const [s,A] of G){if(A.length<=live)continue;let st=I.bs.find(y=>boxSig(y)===s);
  if(!st){const pe={};for(const f in A[0].e)if(INV_SIGX.indexOf(f)<0&&!(INV_FLAG.indexOf(f)>=0&&!A[0].e[f]))pe[f]=A[0].e[f];pe.n=0;st={e:pe,at:A[0].at,why:A[0].why,own:A[0].own,by:A[0].by||"",w:A[0].w};I.bs.push(st)}
  for(let i=0;i<A.length-live;i++){const x=A[i];rm.add(x);st.e.n+=invN(x.e);if(x.w!=null)st.w=Math.max(st.w||0,x.w);const d=x.e.d;if(d!=null){st.e.d=st.e.d==null?d:Math.max(st.e.d,d);st.e.d0=st.e.d0==null?d:Math.min(st.e.d0,d)}invLedgerDrop(x.e);moved++}}
 if(rm.size){let j=0;for(let i=0;i<B.length;i++)if(!rm.has(B[i]))B[j++]=B[i];B.length=j}return moved}
function boxTop(){if(typeof S==="undefined"||!S||!S.il||!Array.isArray(S.il.bs)||!S.il.bs.length)return 0;const I=S.il;I.box=I.box||[];const C=new Map();
 for(const x of I.box)if(boxCan(x)){const s=boxSig(x);C.set(s,(C.get(s)||0)+1)}let out=0;
 for(const st of I.bs){const s=boxSig(st);let have=C.get(s)||0;while(have<invLive()&&st.e.n>0){I.box.push({e:invUnit(st.e),at:st.at,why:st.why,own:st.own,w:st.w,by:st.by});st.e.n--;have++;out++}C.set(s,have)}
 I.bs=I.bs.filter(st=>st.e.n>0);return out}
/* store records counted (stacks included), for the census audit / tests */
function boxCount(pred){let n=0;try{for(const x of (S.il&&S.il.box)||[])if(!pred||pred(x))n++;for(const st of (S.il&&S.il.bs)||[])if(!pred||pred(st))n+=st.e.n|0}catch(e){}return n}
/* a dead holder's stacked pieces: the census sends her real pieces to the store; her stacks follow them there (the same record ilGone makes, counted) */
function invDeadStacks(){try{for(const p of invPeople()){if(p===S||!Array.isArray(p.invS)||!p.invS.length||!(p.alive===false||p.dead))continue;
  const I=typeof ilS==="function"?ilS():null;if(!I)continue;I.bs=I.bs||[];
  for(const st of p.invS){const u=invUnit(st);let dur=true;try{dur=typeof ilDur==="function"?ilDur(u):true}catch(x){}if(!dur)continue;
   const rec={e:Object.assign(u,{n:st.n}),at:"nvp",why:"dead",own:"",w:typeof wk==="function"?wk():0,by:""};if(st.d0!=null)rec.e.d0=st.d0;I.bs.push(rec);st.n=0}
  p.invS=p.invS.filter(st=>st.n>0)}}catch(e){console.error("invDeadStacks",e)}}
/* the whole pass: fold every bag + the store, then refill the real pieces */
function invFoldAll(all){let n=0;try{if(!invOn())return 0;for(const p of invPeople())n+=invFold(p,all);if(invNpcHere()){invDeadStacks();n+=boxFold()}}catch(e){console.error("invFoldAll",e)}
 try{for(const p of invPeople())invTop(p);if(invNpcHere())boxTop()}catch(e){console.error("invTopAll",e)}return n}
/* audit (tests): pieces per kind for one person / the store, stacks included */
function invTotals(p){const o={};for(const e of (p&&p.inv)||[])if(e&&e.k)o[e.k]=(o[e.k]||0)+1;for(const st of (p&&p.invS)||[])if(st&&st.k)o[st.k]=(o[st.k]||0)+(st.n|0);return o}
/* hooks: after a turn (fold + refill), after load (migration: fold everything), after each panel render (her real pieces refilled) */
(function(){if(typeof endTurn!=="function")return;const e0=endTurn;endTurn=function(){try{if(typeof S!=="undefined"&&S&&!S.dead)for(const q of invPeople())invTop(q)}catch(e){console.error("inv stack top0",e)}/* the turn starts with every real piece out */const r=e0.apply(this,arguments);try{if(typeof S!=="undefined"&&S&&!S.dead)invFoldAll(false)}catch(e){console.error("inv stack turn",e)}return r};window.endTurn=endTurn})();
(function(){if(typeof deser!=="function")return;const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{if(typeof S!=="undefined"&&S&&!S.dead)invFoldAll(true)}catch(e){console.error("inv stack load",e)}return r};window.deser=deser})();
(function(){if(typeof renderPanel!=="function")return;const r0=renderPanel;renderPanel=function(){try{if(typeof S!=="undefined"&&S&&!S.dead&&S.invS&&S.invS.length)invTop(S)}catch(e){console.error("inv stack top",e)}return r0.apply(this,arguments)};window.renderPanel=renderPanel})();
window.invAdd=invAdd;window.invCount=invCount;window.invTop=invTop;window.invFold=invFold;window.invFoldAll=invFoldAll;window.invTotals=invTotals;window.invMore=invMore;window.invSig=invSig;window.invCan=invCan;window.boxCount=boxCount;
/* grouping lists (bag grid, Bán, gift picker): the first real piece of a kind-and-source also carries its stack's count */
function invMoreOnce(p,e,seen){if(!invCan(e))return 0;const s=invSig(e);if(seen.has(s))return 0;seen.add(s);return invMore(p,e)}
window.invMoreOnce=invMoreOnce;
