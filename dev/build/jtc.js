/* ================= jtc: CUNG NỮ THÂN CẬN (owner OD 20/11 ~15:55Z = OD:L2051, verbatim there; order MAIN ROOT-79 20/11 15:40Z; review/thancan) =================
   RULE (owner): no thân cận slot at the start of a life; any trusted maid of her household (tam / nhị / nhất đẳng, BAL.tc.rk) can be raised by the
   interaction «Chọn làm cung nữ thân cận» on her person card; a thân cận wears HER MASTER'S own thân cận uniform (one per master: every chủ vị by her
   palace + Hoàng hậu + Thái hậu; same cut, embroidery richer with the master's rank); NPC masters choose the same way (law 1 two-way, law 6b).
   ONE flag, reused: the record's q.close (j95s: serves more, follows first, "cung nữ thân cận … không rảnh") now means THIS choice — it was "the
   personal maid" (kind mm) before. Data: master.tc = sid of a staff maid, or "m:<name>" = her personal maid (p.maid, j3 / jcmaid). A tc that no longer
   points to a maid of that house (dismissed, sold, died, replaced, raised out of range) reads as none and is cleared (tcOf).
   GAIN AND LOSS (law 3; numbers BAL.tc, jbal2.js — law 4): choose = the maid's lòng +pick.loy and she becomes the close one (j95s) | Bạc -pick.bac (her
   uniform is sewn) and the other maids of the house lòng -pick.envy (jealous). Dismiss = the others' envy eases (lòng +drop.calm) | the dismissed
   maid lòng drop.loy. Trust bar = BAL.loy.trust (the one "trusted" bar of the game).
   LOOK (kit figure, j88 f88Best): a thân cận's figure is the record of her identity whose tier is her look key "maid-thancan-<master>-t<tier>"
   (master = th | hh | p<palace slot>; tier = master rank + 1, Thái hậu 9). Not painted yet → her usual maid dress (never an empty picture);
   uniform records never stand in for an ordinary maid dress. Art keys proposed to Foreman C (THANCAN batch).
   CO-OP: one world; the guest's tap is an intent run on the host (jcoopthinf F.reg "tcPick"); both seats read the same master.tc.
   OLD SAVES: a master without tcV (her, every consort; set on start / newRival) keeps the personal maid of every house as its thân cận (she was the close maid before); new lives start with none. */
function tcB(){return BAL.tc}
function tcMaidRk(s,isM){try{if(isM)return s.rk!=null?s.rk:BAL.srvRk.dai;return s.rk==null?1:s.rk}catch(e){return 1}}
/* the maids of a master's house: [{s, id, m (personal maid)}] */
function tcHouse(p){const L=[];if(!p)return L;try{if(p.maid&&p.maid.name&&p!==S.thO&&!(p===S&&typeof isSrv==="function"&&isSrv()))L.push({s:p.maid,id:"m:"+p.maid.name,m:true});
 for(const s of p.staff||[])if(s&&s.role==="maid"&&s.sid!=null&&!s.out&&!s.dead)L.push({s,id:s.sid,m:false})}catch(e){}return L}
function tcRef(p,s){if(!p||!s)return null;if(s===p.maid)return "m:"+s.name;return s.sid!=null?s.sid:null}
/* the thân cận of master p (the maid object) or null; a stale pointer is cleared */
function tcOf(p){if(!p||p.tc==null)return null;const e=tcHouse(p).find(x=>x.id===p.tc);if(e&&tcRkOk(e.s,e.m))return e.s;try{delete p.tc}catch(x){}return null}
function tcIs(p,s){return !!s&&tcOf(p)===s}
function tcRkOk(s,isM){const r=tcMaidRk(s,isM),R=tcB().rk;return r>=R[0]&&r<=R[1]}
/* who may be chosen: why-not text (VANPHONG) or "" */
function tcWhyNot(p,s){if(!s||s.role!=null&&s.role!=="maid"&&s!==p.maid)return "chỉ cung nữ";const isM=s===p.maid;if(!tcRkOk(s,isM))return "chỉ cung nữ tam đẳng đến nhất đẳng";
 if((s.loyal||0)<BAL.loy.trust)return `chưa đủ tin (lòng cần ${BAL.loy.trust})`;if(typeof p.bac==="number"&&p.bac<tcB().pick.bac)return `cần ${tcB().pick.bac} bạc`;return ""}
function tcPay(p,o){if(p===S)apply(o);else if(typeof p.bac==="number"&&o.bac)p.bac+=o.bac}
/* ONE function for her and every NPC master (two-way): s = the maid to raise, or null = dismiss the current one. Returns the log line ("" = nothing) */
function tcSet(p,s){const B=tcB();if(!p)return "";const cur=tcOf(p);const me=p===S;const H=tcHouse(p);let r="";
 if(s&&cur===s)return "";
 if(cur){/* the one stepping down: her lòng drops, the others' envy eases */cur.loyal=cl((cur.loyal||0)+B.drop.loy,0,100);for(const e of H)if(e.s!==cur&&e.s!==s)e.s.loyal=cl((e.s.loyal||0)+B.drop.calm,0,100);delete p.tc;
  r=me?`${cur.name} thôi làm cung nữ thân cận: lòng ${balSg(B.drop.loy)}; các cung nữ khác bớt ghen, lòng ${balSg(B.drop.calm)}.`:`${p.name} cho ${cur.name} thôi làm cung nữ thân cận.`}
 if(s){if(tcWhyNot(p,s))return r;const id=tcRef(p,s);if(id==null)return r;tcPay(p,{bac:-B.pick.bac});s.loyal=cl((s.loyal||0)+B.pick.loy,0,100);
  for(const e of H)if(e.s!==s&&e.s!==cur)e.s.loyal=cl((e.s.loyal||0)-B.pick.envy,0,100);p.tc=id;s.tcAt=S?S.turn||0:0;
  const t=me?`Chọn ${s.name} làm cung nữ thân cận, may y phục thân cận riêng của cung ngươi (Bạc ${balSg(-B.pick.bac)}): lòng nàng ${balSg(B.pick.loy)}; các cung nữ khác ghen, lòng ${balSg(-B.pick.envy)}.`
   :`${p===S.thO?"Thái hậu":p.name} chọn ${s.name} làm cung nữ thân cận.`;r=r?r+" "+t:t}
 try{if(typeof J95S==="object")J95S.last=null}catch(e){}/* the record re-reads the close one */
 return r}
/* her tap (person card): k = sid or "m:<name>", on = 1 choose / 0 dismiss. Registered as a co-op intent (jcoopthinf "tcPick") */
function tcPick(k,on){if(!S||S.dead||(typeof Q!=="undefined"&&Q.length))return "";const e=tcHouse(S).find(x=>x.id===k);if(!e)return "";
 const r=on?tcSet(S,e.s):(tcOf(S)===e.s?tcSet(S,null):"");if(r){log(r);try{render()}catch(x){}}return r}
/* the kit person-card group (j15 pcard groups) for one of her maids */
function tcGroups(s){try{if(!S||!s||S.dead)return[];const p=S;const isM=s===p.maid;if(!isM&&s.role!=="maid")return[];if(typeof isSrv==="function"&&isSrv())return[];
 const B=tcB(),k=isM?"m:"+s.name:s.sid,cur=tcOf(p);const ka=`data-tcp="${k}"`;
 if(cur===s)return [["Thân cận",[pbtn(`${ka} data-tcon="0"`,"Thôi làm cung nữ thân cận",`nàng: lòng ${balSg(B.drop.loy)} · cung nữ khác: lòng ${balSg(B.drop.calm)}`,"")]]];
 const why=tcWhyNot(p,s);
 return [["Thân cận",[pbtn(`${ka} data-tcon="1"`,"Chọn làm cung nữ thân cận",`Bạc ${balSg(-B.pick.bac)} · nàng: lòng ${balSg(B.pick.loy)} · cung nữ khác ghen: lòng ${balSg(-B.pick.envy)}${cur?` · thay ${cur.name}`:""}`,why)]]]}catch(e){return[]}}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("button[data-tcp]");if(!b||b.disabled)return;const k0=b.dataset.tcp;const k=/^m:/.test(k0)?k0:+k0;
 tcPick(k,b.dataset.tcon==="1"?1:0)});
/* NPC masters (every living consort, Hoàng hậu, Thái hậu): once a month by their own reasons — the most loyal trusted maid at npc.p odds when none;
   a thân cận whose lòng fell under npc.drop is let go. The world's step: host only in co-op (monthTick runs there). */
function tcNpc(p){const B=tcB().npc;if(!p||p===S)return "";const cur=tcOf(p);
 if(cur){if((cur.loyal||0)<B.drop)return tcSet(p,null);return ""}
 const L=tcHouse(p).filter(e=>!tcWhyNot(p,e.s)).sort((a,b)=>(b.s.loyal||0)-(a.s.loyal||0));if(!L.length||!roll(B.p))return "";return tcSet(p,L[0].s)}
function tcNpcAll(){const N=window.__tcN=window.__tcN||{pick:0,drop:0};try{for(const v of (typeof liveRivals==="function"?liveRivals(true):[]))if(v&&v.alive&&!v.out){const h=!!tcOf(v);tcNpc(v);const n=!!tcOf(v);if(n&&!h)N.pick++;if(h&&!n)N.drop++}
 if(S.thO&&!S.thDead){const h=!!tcOf(S.thO);tcNpc(S.thO);const n=!!tcOf(S.thO);if(n&&!h)N.pick++;if(h&&!n)N.drop++}}catch(e){console.error("tcNpc",e)}}
/* the look key of a thân cận (kit figure, j88): null when s is not a thân cận */
function tcMasterOf(s){try{if(!S||!s)return null;const M=[S].concat(typeof rivals!=="undefined"?rivals:[],S.thO?[S.thO]:[]);for(const p of M)if(p&&p.tc!=null&&tcOf(p)===s)return p}catch(e){}return null}
function tcLookKey(s){const p=tcMasterOf(s);if(!p)return null;let m,t;
 if(p===S.thO){m="th";t=9}else{const r=rkOf(p);t=cl(r,0,7)+1;if(p.queen||(p===S&&r>=7))m="hh";else{/* her house's palace (the chủ vị's; a low consort lives in one) */let sl=null;try{const h=byKey(houseOf(p));sl=h===S?S.pal:h?h.pal:null;if(sl==null)sl=p===S?S.pal:p.pal}catch(e){}m=sl!=null?"p"+sl:"x"}}
 return `maid-thancan-${m}-t${t}`}
(function(){
 /* figure: a thân cận wears her master's uniform record when painted; uniform records are never an ordinary maid dress */
 if(typeof f88Best==="function"){const f0=f88Best;f88Best=function(L,who,kind){try{if(Array.isArray(L)&&L.some(f=>f&&/^maid-thancan-/.test(String(f.tier||"")))){
   const k=who&&who!==S?tcLookKey(who):null;if(k){const U=L.filter(f=>f&&f.tier===k&&(kind!=="por"||f.por));if(U.length)return U[0]}
   const N=L.filter(f=>!(f&&/^maid-thancan-/.test(String(f.tier||""))));return f0.call(this,N.length?N:L,who,kind)}}catch(e){}return f0.apply(this,arguments)}}
 /* new life: no thân cận anywhere (owner: "ngay từ đầu … không có") */
 if(typeof start==="function"){const s0=start;start=function(){const r=s0.apply(this,arguments);try{if(S){S.tcV=1;delete S.tc;for(const v of rivals||[])if(v)delete v.tc;if(S.thO)delete S.thO.tc}}catch(e){}return r}}
 /* every master made from now on is new (per object, so a co-op world rebuilt by deser never re-migrates a new consort) */
 if(typeof newRival==="function"){const n0=newRival;newRival=function(){const n=n0.apply(this,arguments);try{if(n&&typeof n==="object")n.tcV=1}catch(e){}return n}}
 /* old save: the personal maid of every house was its close maid → stays its thân cận */
 if(typeof deser==="function"){const d0=deser;deser=function(){const r=d0.apply(this,arguments);try{tcOld()}catch(e){}return r}}
 if(typeof monthTick==="function"){const m0=monthTick;monthTick=function(){const ev=m0.apply(this,arguments);try{if(S&&!S.dead&&(typeof worldOn!=="function"||worldOn()))tcNpcAll()}catch(e){}return ev}}
})();
function tcOld(){if(!S)return;for(const p of [S].concat(rivals||[])){if(!p||p.tcV)continue;p.tcV=1;if(p.maid&&p.maid.name&&p.tc==null)p.tc="m:"+p.maid.name}}
