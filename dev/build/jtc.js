/* ================= jtc: CUNG NỮ THÂN CẬN (owner OD 20/11 ~15:55Z = OD:L2051, verbatim there; order MAIN ROOT-79 20/11 15:40Z; review/thancan) =================
   RULE (owner): no thân cận slot at the start of a life; any trusted maid of her household (tam / nhị / nhất đẳng, BAL.thc.rk) can be raised by the
   interaction «Chọn làm cung nữ thân cận» on her person card; a thân cận wears HER MASTER'S own thân cận uniform (one per master: every chủ vị by her
   palace + Hoàng hậu + Thái hậu; same cut, embroidery richer with the master's rank); NPC masters choose the same way (law 1 two-way, law 6b).
   ONE flag, reused: the record's q.close (j95s: serves more, follows first, "cung nữ thân cận … không rảnh") now means THIS choice — it was "the
   personal maid" (kind mm) before. Data: master.thc = sid of a staff maid, or "m:<name>" = her personal maid (p.maid, j3 / jcmaid). A thc that no longer
   points to a maid of that house (dismissed, sold, died, replaced, raised out of range) reads as none and is cleared (thcOf).
   GAIN AND LOSS (law 3; numbers BAL.thc, jbal2.js — law 4): choose = the maid's lòng +pick.loy and she becomes the close one (j95s) | Bạc -pick.bac (her
   uniform is sewn) and the other maids of the house lòng -pick.envy (jealous). Dismiss = the others' envy eases (lòng +drop.calm) | the dismissed
   maid lòng drop.loy. Trust bar = BAL.loy.trust (the one "trusted" bar of the game).
   LOOK (kit figure, j88 f88Best): a thân cận's figure is the record of her identity whose tier is her look key "maid-thancan-<master>-t<tier>"
   (master = th | hh | p<palace slot>; tier = master rank + 1, Thái hậu 9). Not painted yet → her usual maid dress (never an empty picture);
   uniform records never stand in for an ordinary maid dress. Art keys proposed to Foreman C (THANCAN batch).
   CO-OP: one world; the guest's tap is an intent run on the host (jcoopthinf F.reg "thcPick"); both seats read the same master.thc.
   OLD SAVES: a master without thcV (her, every consort; set on start / newRival) keeps the personal maid of every house as its thân cận (she was the close maid before); new lives start with none. */
function thcB(){return BAL.thc}
function thcMaidRk(s,isM){try{if(isM)return s.rk!=null?s.rk:BAL.srvRk.dai;return s.rk==null?1:s.rk}catch(e){return 1}}
/* the maids of a master's house: [{s, id, m (personal maid)}] */
function thcHouse(p){const L=[];if(!p)return L;try{if(p.maid&&p.maid.name&&p!==S.thO&&!(p===S&&typeof isSrv==="function"&&isSrv()))L.push({s:p.maid,id:"m:"+p.maid.name,m:true});
 for(const s of p.staff||[])if(s&&s.role==="maid"&&s.sid!=null&&!s.out&&!s.dead)L.push({s,id:s.sid,m:false})}catch(e){}return L}
function thcRef(p,s){if(!p||!s)return null;if(s===p.maid)return "m:"+s.name;return s.sid!=null?s.sid:null}
/* the thân cận of master p (the maid object) or null; a stale pointer is cleared */
function thcOf(p){if(!p||p.thc==null)return null;const e=thcHouse(p).find(x=>x.id===p.thc);if(e&&thcRkOk(e.s,e.m))return e.s;try{delete p.thc}catch(x){}return null}
function thcIs(p,s){return !!s&&thcOf(p)===s}
function thcRkOk(s,isM){const r=thcMaidRk(s,isM),R=thcB().rk;return r>=R[0]&&r<=R[1]}
/* who may be chosen: why-not text (VANPHONG) or "" */
function thcWhyNot(p,s,o){if(!s||s.role!=null&&s.role!=="maid"&&s!==p.maid)return "chỉ cung nữ";const isM=s===p.maid;if(!thcRkOk(s,isM))return "chỉ cung nữ tam đẳng đến nhất đẳng";
 if((s.loyal||0)<BAL.loy.trust)return `chưa đủ tin (thiện cảm cần ${BAL.loy.trust})`;if(!(o&&o.paid)&&typeof p.bac==="number"&&p.bac<thcB().pick.bac)return `cần ${thcB().pick.bac} bạc`;return ""}
function thcPay(p,o){if(p===S)apply(o);else if(typeof p.bac==="number"&&o.bac)p.bac+=o.bac}
/* ONE function for her and every NPC master (two-way): s = the maid to raise, or null = dismiss the current one. Returns the log line ("" = nothing) */
function thcSet(p,s,o){/* o.paid: the uniform was already paid by the caller's own shown cost (j68g card) */const B=thcB();if(!p)return "";const cur=thcOf(p);const me=p===S;const H=thcHouse(p);let r="";
 if(s&&cur===s)return "";
 if(s&&(thcWhyNot(p,s,o)||thcRef(p,s)==null))return "";/* r1: an ineligible pick (state moved since the card was drawn, e.g. a co-op intent landing late) changes nothing — never steps the current one down */
 if(cur){/* the one stepping down: her lòng drops, the others' envy eases */cur.loyal=cl((cur.loyal||0)+B.drop.loy,0,100);for(const e of H)if(e.s!==cur&&e.s!==s)e.s.loyal=cl((e.s.loyal||0)+B.drop.calm,0,100);delete p.thc;
  r=me?`${cur.name} thôi làm cung nữ thân cận: nàng: thiện cảm ${balSg(B.drop.loy)}; cung nữ khác: thiện cảm ${balSg(B.drop.calm)}.`:`${p.name} cho ${cur.name} thôi làm cung nữ thân cận.`}
 if(s){const id=thcRef(p,s);if(!(o&&o.paid))thcPay(p,{bac:-B.pick.bac});s.loyal=cl((s.loyal||0)+B.pick.loy,0,100);
  for(const e of H)if(e.s!==s&&e.s!==cur)e.s.loyal=cl((e.s.loyal||0)-B.pick.envy,0,100);p.thc=id;s.thcAt=S?S.turn||0:0;
  const t=me?`Chọn ${s.name} làm cung nữ thân cận, may y phục thân cận riêng của cung ngươi (Bạc ${balSg(-B.pick.bac)}): nàng: thiện cảm ${balSg(B.pick.loy)}; cung nữ khác ghen: thiện cảm ${balSg(-B.pick.envy)}.`
   :`${p===S.thO?"Thái hậu":p.name} chọn ${s.name} làm cung nữ thân cận.`;r=r?r+" "+t:t}
 try{if(typeof J95S==="object")J95S.last=null}catch(e){}/* the record re-reads the close one */
 return r}
/* her tap (person card): k = sid or "m:<name>", on = 1 choose / 0 dismiss. Registered as a co-op intent (jcoopthinf "thcPick") */
function thcPick(k,on){if(!S||S.dead||(typeof Q!=="undefined"&&Q.length))return "";const e=thcHouse(S).find(x=>x.id===k);if(!e)return "";
 const r=on?thcSet(S,e.s):(thcOf(S)===e.s?thcSet(S,null):"");if(r){log(r);try{render()}catch(x){}}return r}
/* the kit person-card group (j15 pcard groups) for one of her maids */
function thcGroups(s){try{if(!S||!s||S.dead)return[];const p=S;const isM=s===p.maid;if(!isM&&s.role!=="maid")return[];if(typeof isSrv==="function"&&isSrv())return[];
 const B=thcB(),k=isM?"m:"+s.name:s.sid,cur=thcOf(p);const ka=`data-thcp="${k}"`;
 if(cur===s)return [["Thân cận",[pbtn(`${ka} data-thcon="0"`,"Thôi làm cung nữ thân cận",`nàng: thiện cảm ${balSg(B.drop.loy)} · cung nữ khác: thiện cảm ${balSg(B.drop.calm)}`,"")]]];
 const why=thcWhyNot(p,s);
 return [["Thân cận",[pbtn(`${ka} data-thcon="1"`,"Chọn làm cung nữ thân cận",`Bạc ${balSg(-B.pick.bac)} · nàng: thiện cảm ${balSg(B.pick.loy)} · cung nữ khác ghen: thiện cảm ${balSg(-B.pick.envy)}${cur?` · thay ${cur.name}`:""}`,why)]]]}catch(e){return[]}}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("button[data-thcp]");if(!b||b.disabled)return;const k0=b.dataset.thcp;const k=/^m:/.test(k0)?k0:+k0;
 thcPick(k,b.dataset.thcon==="1"?1:0)});
/* NPC masters (every living consort, Hoàng hậu, Thái hậu): once a month by their own reasons — the most loyal trusted maid at npc.p odds when none;
   a thân cận whose lòng fell under npc.drop is let go. The world's step: host only in co-op (monthTick runs there). */
function thcNpc(p){const B=thcB().npc;if(!p||p===S)return "";const cur=thcOf(p);
 if(cur){if((cur.loyal||0)<B.drop)return thcSet(p,null);return ""}
 const L=thcHouse(p).filter(e=>!thcWhyNot(p,e.s)).sort((a,b)=>(b.s.loyal||0)-(a.s.loyal||0));if(!L.length||!roll(B.p))return "";return thcSet(p,L[0].s)}
function thcNpcAll(){const N=window.__tcN=window.__tcN||{pick:0,drop:0};try{for(const v of (typeof liveRivals==="function"?liveRivals(true):[]))if(v&&v.alive&&!v.out){const h=!!thcOf(v);thcNpc(v);const n=!!thcOf(v);if(n&&!h)N.pick++;if(h&&!n)N.drop++}
 if(S.thO&&!S.thDead){const h=!!thcOf(S.thO);thcNpc(S.thO);const n=!!thcOf(S.thO);if(n&&!h)N.pick++;if(h&&!n)N.drop++}}catch(e){console.error("thcNpc",e)}}
/* the look key of a thân cận (kit figure, j88): null when s is not a thân cận */
function thcMasterOf(s){try{if(!S||!s)return null;const M=[S].concat(typeof rivals!=="undefined"?rivals:[],S.thO?[S.thO]:[]);for(const p of M)if(p&&p.thc!=null&&thcOf(p)===s)return p}catch(e){}return null}
function thcLookKey(s){const p=thcMasterOf(s);if(!p)return null;let m,t;
 if(p===S.thO){m="th";t=9}else{const r=rkOf(p);t=cl(r,0,7)+1;if(p.queen||(p===S&&r>=7))m="hh";else{/* her house's palace (the chủ vị's; a low consort lives in one) */let sl=null;try{const h=byKey(houseOf(p));sl=h===S?S.pal:h?h.pal:null;if(sl==null)sl=p===S?S.pal:p.pal}catch(e){}m=sl!=null?"p"+sl:"x"}}
 return `maid-thancan-${m}-t${t}`}
(function(){
 /* figure: a thân cận wears her master's uniform record when painted; uniform records are never an ordinary maid dress */
 if(typeof f88Best==="function"){const f0=f88Best;f88Best=function(L,who,kind){try{if(Array.isArray(L)&&L.some(f=>f&&/^maid-thancan-/.test(String(f.tier||"")))){
   const k=who&&who!==S?thcLookKey(who):null;if(k){const U=L.filter(f=>f&&f.tier===k&&(kind!=="por"||f.por));if(U.length)return U[0]}
   const N=L.filter(f=>!(f&&/^maid-thancan-/.test(String(f.tier||""))));return f0.call(this,N.length?N:L,who,kind)}}catch(e){}return f0.apply(this,arguments)}}
 /* her personal maid's title reads «thân cận» only while she is the chosen one (kit title, j79) */
 if(typeof kitMaidTitle==="function"){const k0=kitMaidTitle;kitMaidTitle=function(m){const t=k0.apply(this,arguments);try{const x=m||(S&&S.maid);if(x&&thcIs(S,x))return String(t).replace("thân tín","thân cận")}catch(e){}return t}}
 /* new life: no thân cận anywhere (owner: "ngay từ đầu … không có") */
 if(typeof start==="function"){const s0=start;start=function(){const r=s0.apply(this,arguments);try{if(S){S.thcV=1;delete S.thc;for(const v of rivals||[])if(v)delete v.thc;if(S.thO)delete S.thO.thc}}catch(e){}return r}}
 /* every master made from now on is new (per object, so a co-op world rebuilt by deser never re-migrates a new consort) */
 if(typeof newRival==="function"){const n0=newRival;newRival=function(){const n=n0.apply(this,arguments);try{if(n&&typeof n==="object")n.thcV=1}catch(e){}return n}}
 /* old save: the personal maid of every house was its close maid → stays its thân cận */
 if(typeof deser==="function"){const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{thcOld()}catch(e){}return r}}
 if(typeof monthTick==="function"){const m0=monthTick;monthTick=function(){const ev=m0.apply(this,arguments);try{if(S&&!S.dead&&(typeof worldOn!=="function"||worldOn()))thcNpcAll()}catch(e){}return ev}}
})();
function thcOld(){if(!S)return;for(const p of [S].concat(rivals||[])){if(!p||p.thcV)continue;p.thcV=1;if(p.maid&&p.maid.name&&p.thc==null)p.thc="m:"+p.maid.name}}
