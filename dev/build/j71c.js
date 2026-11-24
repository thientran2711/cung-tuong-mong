/* ================= j71c: COMPOSED FESTIVALS (ORDER THIN P7, owner OD 23/11 ~22:50Z; EVCAT §3 P7) =================
   Seeds (data J71SEEDS in j71sd.js, built from dev/handover/content/thin/fseeds*.md by dev/build/j71sd_build.py; schema reports/thin.md «## API P7»):
   stage × rival × prize × complication.
   - stage: one more variant of FV7[fest] [kind, sub, text] (+ its FT7 title), appended AFTER the old ones at load so the old history keys
     j71:f:<fest>:<i> stay; the whole j71 runtime plays it (fvPick: unused this life, least seen in 5 lives; fPP7 entrants; SC7 one formula).
   - complication: on the festival day, after the festival's own card, one complication card fitting the stage kind (P0 family "j71c:c",
     fresh-first, never twice in a life) with a real rival B cast from the consorts present (contest: from the real entrants; a contest
     complication only when she entered); 4 equal-value stances, one step = BAL.j71c.fx[tier][key] (laws 2/3/4).
   - prize: a real object the winner of a contest takes (P0 family "j71c:p:<fest>", fresh-first), named on the invitation; when she wins an IT
     key puts the real item in her chest (goodsGive), when an NPC wins the trace names the real winner (law 6c). The old stat prize stays.
   Personal per seat (S.j71c): never a co-op world key. */
(function(){
if(typeof FV7==="undefined")return;
const SI={},CI={},PI={},CF={},PF={};window.J71C_SEEDS={SI,CI,PI};
const STAT=["sung","danh","bac","suc","mat","th","hh","duc","tamco","an"];
const Bf=()=>BAL.j71c;
function jc(){if(!S)return null;const j=S.j71c=S.j71c||{};j.ob=j.ob||[];j.cur=j.cur||{};return j}
function on(){return !!(BAL.j71c&&Bf().on)}
function fit(o,r){if(!r)return true;let T=[];try{T=tr6(o)||[]}catch(e){T=[]}const any=L=>!L||!L.length||L.some(n=>T.includes(n));return any(r["nết"])&&any(r["lòng"])}
function needsOk(n){n=n||{};if(n.rank_min!=null&&(S.rank||0)<n.rank_min)return false;if(n.rank_max!=null&&(S.rank||0)>n.rank_max)return false;
 if(n.not_confined&&S.confined)return false;if(n.kids_min!=null&&(S.kids||[]).filter(k=>k.alive).length<n.kids_min)return false;return true}
/* ---------- stages: appended to FV7 (index after the old ones) ---------- */
function regStage(sd){if(!sd||sd.type!=="stage"||!sd.id||SI[sd.id]||!FV7[sd.fest])return false;const L=FV7[sd.fest];L.push([sd.kind,sd.sub||"",sd.text]);
 const i=L.length-1;SI[sd.id]={sd,i};if(sd.kind==="C"&&sd.title&&typeof FT7!=="undefined")FT7[sd.fest+":"+i]=sd.title;return true}
function regComp(sd){if(!sd||sd.type!=="comp"||!sd.id||CI[sd.id])return false;CI[sd.id]=sd;(CF[sd.fest]=CF[sd.fest]||[]).push(sd);return true}
function regPrize(sd){if(!sd||sd.type!=="prize"||!sd.id||PI[sd.id])return false;PI[sd.id]=sd;(PF[sd.fest]=PF[sd.fest]||[]).push(sd);return true}
function reg(sd){return sd&&(sd.type==="stage"?regStage(sd):sd.type==="comp"?regComp(sd):sd.type==="prize"?regPrize(sd):false)}
/* the old variant count (j71Count users / EVCAT) keeps counting the hand-written ones; composed apart */
const OLDN={};for(const k in FV7)OLDN[k]=FV7[k].length;
/* composed stages only when on: fvPick skips them when off */
if(typeof fvPick==="function"){const v0=fvPick;fvPick=function(k,noC){if(!on()&&FV7[k]&&FV7[k].length>(OLDN[k]||0)){const L=FV7[k];const keep=L.splice(OLDN[k]);try{return v0.apply(this,arguments)}finally{L.push(...keep)}}
 const vi=v0.apply(this,arguments);try{if(vi!=null)LASTV[k]=vi}catch(e){}return vi}}
const LASTV={};
/* ---------- prize: drawn when the festival's params are made (fPP7), told on the invitation, given when the contest ends ---------- */
function drawPrize(k){if(!on())return null;const L=PF[k]||[];if(!L.length)return null;const fam="j71c:p:"+k;const F=nrFresh(fam,L,x=>x.id);const p=nrPick(fam,F,x=>x.id);if(p)nrMark(fam,p.id);return p?p.id:null}
if(typeof fPP7==="function"){const f0=fPP7;fPP7=function(k,vi){const pp=f0.apply(this,arguments);try{if(pp&&FV7[k]&&FV7[k][vi]&&FV7[k][vi][0]==="C"&&S){const cz=drawPrize(k);if(cz){pp.cz=cz;jc().cur[k]={cz,sd:pp.sd,done:0}}}}catch(e){console.error("j71c pp",e)}return pp}}
function prizeLine(k,pp){const c=pp&&pp.cz?PI[pp.cz]:null;return c?`<p>Giải: ${c.name} (${c.from}).</p>`:""}
if(typeof fInv7==="function"){const i0=fInv7;fInv7=function(k,pp,view){const m=i0.apply(this,arguments);try{if(m){const x=prizeLine(k,pp);if(x){if(m.h!=null)m.h+=x;else if(m.t!=null)m.t+=x}}}catch(e){}return m}}
let LASTL=null;
if(typeof capRank7==="function"){const r0=capRank7;capRank7=function(){const L=r0.apply(this,arguments);LASTL=L;return L}}
function award(k,L){const j=jc();const c=j&&j.cur[k];if(!c||c.done||!L||!L.length)return"";const pz=PI[c.cz];if(!pz)return"";c.done=1;const w=L[0].p;let t="";
 if(w===S){t=pz.trace_me;if(pz.it&&typeof IT!=="undefined"&&IT[pz.it]&&typeof goodsGive==="function"){try{goodsGive(S,pz.it,{from:"story",who:pz.from})}catch(e){}}}
 else t=String(pz.trace_npc||"").replace(/\{W\}/g,w&&w.name?w.name:"người thắng");
 j.ob.push({sid:pz.id,name:pz.name,owner:w===S?(S.name||"ngươi"):(w&&w.name)||"",trace:t,turn:S.turn});if(j.ob.length>Bf().obKeep)j.ob.splice(0,j.ob.length-Bf().obKeep);
 return ` Giải ${pz.name}: ${t}.`}
if(typeof cRun7==="function"){const c0=cRun7;cRun7=function(k){LASTL=null;const r=c0.apply(this,arguments);try{if(r&&LASTL)return r+award(k,LASTL)}catch(e){console.error("j71c award",e)}return r}}
if(typeof cFin7==="function"){const c1=cFin7;cFin7=function(k,kind,L){const r=c1.apply(this,arguments);try{const x=award(k,L);if(x)log(`${fName7(k)}:${x}`)}catch(e){console.error("j71c award",e)}return r}}
/* ---------- complication: after the festival day's own card ---------- */
function stepV(tier,k){const F=Bf().fx[tier]||Bf().fx.m;return F[k]||0}
function val(m,tier,sign){const fx={};let B=0;for(const[k,n]of Object.entries(m||{})){if(STAT.includes(k))fx[k]=(fx[k]||0)+n*stepV(tier,k)*sign;else if(k==="rel.B")B+=n*stepV(tier,"rel")*sign}return{fx,B}}
function drawComp(k,kind,ents){if(!on())return null;const fam="j71c:c";const L=(CF[k]||[]).concat(CF["*"]||[]).filter(sd=>(sd.kinds||[]).includes(kind)&&needsOk(sd.needs)&&!nrNow(fam,sd.id));if(!L.length)return null;
 const pres=liveRivals(true).filter(v=>{try{return present7(v)}catch(e){return v.alive&&!v.out&&!v.confined}});const pool=kind==="C"?ents:pres;
 const tries=nrFresh(fam,L,x=>x.id).slice();while(tries.length){const sd=nrPick(fam,tries,x=>x.id);if(!sd)break;tries.splice(tries.indexOf(sd),1);
  let b=null;const R=(sd.roles||{}).B;if(R){const set=new Set(pool);const id=rv6(v=>set.has(v)&&fit(v,R));if(id==null)continue;b=id}
  nrMark(fam,sd.id);return{id:sd.id,b}}return null}
function compCard(k,c){const sd=CI[c.id];if(!sd)return null;const X={};if(c.b!=null){const A=A6("rv",c.b);if(!A)return null;X.B=A}
 const o=sd.object;const pre=t=>String(t||"").replace(/\{O\}/g,o&&o.name?o.name:"").replace(/\{F\}/g,fShort7(k));const fill=t=>{try{return e68Fill(pre(t),X)}catch(e){return pre(t)}};
 const tier=sd.tier||"m";const opts=Object.entries(sd.stances||{}).map(([id,st])=>{const g=val(st.gain,tier,1),l=val(st.loss,tier,-1);const rr=[];if(X.B&&(g.B+l.B))rr.push([X.B,g.B+l.B]);
  return c6(fill(st.text),{c:l.fx,w:g.fx,r:rr,ok:()=>{let tr="";if(o){const j=jc();tr=`${fill(o.name)}: ${fill(st.trace||o.trace)}.`;j.ob.push({sid:sd.id,name:fill(o.name),owner:o.owner==="me"?(S.name||"ngươi"):o.owner==="kho"?"Nội vụ phủ":(X.B?X.B.n:""),trace:fill(st.trace||o.trace),turn:S.turn});if(j.ob.length>Bf().obKeep)j.ob.splice(0,j.ob.length-Bf().obKeep)}
   return [fill((sd.outcomes||{})[id]),tr].filter(Boolean).join(" ")}})});
 return{t:`${fShort7(k)} · Chuyện bên lề hội`,who:X.B?X.B.f:(typeof pMaid==="function"&&S.maid?pMaid():pEmp()),h:`<p>${fill(sd.text)}</p>`,opts}}
const PEND7=[];
if(typeof fDay7==="function"){const d0=fDay7;fDay7=function(k){const j=j7s();const P=j.plans&&j.plans[k];const planned=P&&P.y===S.year?P:null;const vi0=planned?planned.pp.vi:null;const me=planned?planned.me:0;const pp0=planned?planned.pp:null;
 LASTV[k]=null;const m=d0.apply(this,arguments);try{if(m&&on()&&!S.confined&&!(typeof isSrv==="function"&&isSrv())){const vi=vi0!=null?vi0:LASTV[k];const V=vi!=null&&FV7[k]?FV7[k][vi]:null;
  if(V&&(V[0]!=="C"||me>0)){const c=drawComp(k,V[0],V[0]==="C"&&pp0?ents7(pp0):[]);if(c){const card=compCard(k,c);if(card)PEND7.push(card)}}}}catch(e){console.error("j71c comp",e)}return m}}
function flush(){if(!PEND7.length||!S||S.dead)return;let n=0;for(const m of PEND7.splice(0)){Q.push(m);n++}if(n&&$("modal").hidden)showModal()}
{const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{flush()}catch(e){console.error("j71c flush",e)}return r}}
{const r0=render;render=function(){const r=r0.apply(this,arguments);try{if(PEND7.length&&!S.mg)flush()}catch(e){}return r}}
{const d1=window.j71Day;if(typeof d1==="function")window.j71Day=function(k){const r=d1.apply(this,arguments);try{flush()}catch(e){}return r}}
/* ---------- register ---------- */
try{const L=(typeof J71SEEDS!=="undefined"&&Array.isArray(J71SEEDS))?J71SEEDS:[];for(const sd of L)reg(sd)}catch(e){console.error("j71c",e)}
window.j71cReg=reg;
window.j71cCount=function(){const st={},co={},pz={};for(const id in SI){const f=SI[id].sd.fest;st[f]=(st[f]||0)+1}for(const id in CI){const f=CI[id].fest;co[f]=(co[f]||0)+1}for(const id in PI){const f=PI[id].fest;pz[f]=(pz[f]||0)+1}return{stages:st,comps:co,prizes:pz,old:Object.assign({},OLDN)}};
window.J71C_X={drawComp,compCard,award,drawPrize,flush,PEND7,LASTV,OLDN,val};
})();
