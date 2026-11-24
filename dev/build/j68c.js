/* ================= j68c: COMPOSED j68 OPENINGS (ORDER THIN P4, owner OD 23/11 ~22:50Z; EVCAT §3 P4) =================
   Seeds (data J68SEEDS in j68sd.js, built from dev/handover/content/thin/j68seeds*.md by dev/build/j68sd_build.py; schema reports/thin.md «## API P4»):
   `comp` = a new decision (complication × real people by nết × real object × 4 equal-value stances); `open` = an opener line of the same family.
   At load every comp becomes ONE more EV6 template "c:"+id whose wordings are (fitting opener + comp text), so the whole j68 runtime plays it unchanged:
   cadence, scheduler, per-life cooldown, variant memory (e.vu) and the shared no-repeat memory jnorep (family "j68", keys "c:<id>:<wording>").
   The 90 old decisions / 370 wordings are untouched; e68Count() keeps reporting them only, e68cCount() reports the composed ones.
   Numbers (law 4): one gain/loss step = BAL.j68c.fx[tier][key]; weights / cooldown / thresholds in BAL.j68c; nothing typed here.
   Choices (laws 2/3): every stance Σgain == Σloss == tier steps (validator dev/test/j68seeds_validate.py); outcomes are certain.
   GROUNDING (j68h rule): a seed is made only when every role is a living real person with the wanted nết and need on the live world, every
   {placeholder} has a person, and the object owner is cast. Objects stay traceable (law 6c): S.e68c.ob {sid,name,owner,trace,turn}.
   Personal per seat (S.e68c): never a co-op world key. */
const J68C_STAT=["sung","danh","bac","suc","mat","th","hh","duc","tamco","an"];
const J68C_NET=new Set(["rv","sv"]);
const J68C_SEEDS={};
function e68c(){if(!S)return null;const j=S.e68c=S.e68c||{};j.ob=j.ob||[];return j}
function j68cK(r){const k=(r&&r.kind)||"rv";return k.indexOf("man:")===0?"man":k}
/* nết filter: any-of per list, lists AND-ed (yard.md rule) */
function j68cFit(o,r){if(!r||!J68C_NET.has(j68cK(r)))return true;let T=[];try{T=tr6(o)||[]}catch(e){T=[]}
 const any=L=>!L||!L.length||L.some(n=>T.includes(n));return any(r["nết"])&&any(r["lòng"])}
/* needs: real state on the live world (thresholds BAL.j68c.need) */
function j68cNeed(nd,o,oB){if(!nd)return true;const N=BAL.j68c.need;try{
 if(nd==="ill")return !!(o&&illOf(o));
 if(nd==="preg")return !!(o&&o.preg>0&&!o.hidden);
 if(nd==="friend")return !!o&&aff(o,S)>=N.friend;
 if(nd==="feud")return !!(o&&oB&&(aff(o,oB)<=N.feud||aff(oB,o)<=N.feud));
 if(nd==="kids")return !!o&&(o.kids||[]).some(k=>k.alive);
 if(nd==="poor")return !!o&&o.bac!=null&&o.bac<N.poor;
 if(nd==="thIll")return !S.thDead&&!!S.thIll;
 if(nd==="empIll")return !!illOf(S.emp);
 if(nd==="fest")return !!(typeof festToday==="function"&&festToday());
 if(nd==="rain")return !!(S.wx&&/rain|storm/.test(S.wx.k||""));
 if(nd==="snow")return !!(S.wx&&/snow/.test(S.wx.k||""));
}catch(e){return false}return false}
function j68cNeeds(n){n=n||{};
 if(n.rank_min!=null&&(S.rank||0)<n.rank_min)return false;if(n.rank_max!=null&&(S.rank||0)>n.rank_max)return false;
 if(n.nights_min!=null&&(S.nights||0)<n.nights_min)return false;if(n.month&&n.month.length&&!n.month.includes(S.month))return false;
 if(n.not_confined&&S.confined)return false;if(n.kids_min!=null&&(S.kids||[]).filter(k=>k.alive).length<n.kids_min)return false;return true}
/* cast one role from the live roster (npc-purpose pickers of j68: rv6/sv6/kid6/man6; fixed people through A6) */
function j68cOne(r,nm,P){const k=j68cK(r);const oA=P.oA;
 const ok=o=>j68cFit(o,r)&&(r.need==="feud"||j68cNeed(r.need,o));
 if(k==="rv"){const id=rv6(v=>ok(v)&&(!oA||v!==oA));return id==null?null:id}
 if(k==="sv"){const id=sv6(s=>ok(s)&&(!oA||s!==oA));return id==null?null:id}
 if(k==="kid"){const n=kid6(x=>ok(x)&&(!oA||x!==oA));return n==null?null:n}
 if(k==="man"){const L=(S.men||[]).filter(m=>m.alive!==false&&m.rw===r.kind.slice(4)&&ok(m)&&m!==oA);return L.length?pick(L).id:null}
 const a=A6(k);if(!a||!j68cNeed(r.need,a.o))return null;return 0}
function j68cCast(sd){const R=sd.roles||{};const p={};const P={};
 if(R.A){const a=j68cOne(R.A,"A",P);if(a==null)return null;p.a0=a;const X=A6(j68cK(R.A),a);if(!X)return null;P.oA=X.o}
 if(R.B){const b=j68cOne(R.B,"B",P);if(b==null)return null;p.a1=b;const Y=A6(j68cK(R.B),b);if(!Y||Y.o===P.oA)return null;P.oB=Y.o}
 for(const[nm,o,ob]of[["A",P.oA,P.oB],["B",P.oB,P.oA]])if(R[nm]&&R[nm].need==="feud"&&!j68cNeed("feud",o,ob))return null;
 return p}
function j68cStep(tier,k){const F=BAL.j68c.fx[tier]||BAL.j68c.fx.m;return F[k]||0}
/* gain/loss step map → {fx (signed stats), A, B relation} */
function j68cVal(m,tier,sign){const fx={};let A=0,B=0;for(const[k,n]of Object.entries(m||{})){
 if(J68C_STAT.includes(k)){fx[k]=(fx[k]||0)+n*j68cStep(tier,k)*sign}else if(k==="rel.A")A+=n*j68cStep(tier,"rel")*sign;else if(k==="rel.B")B+=n*j68cStep(tier,"rel")*sign}return{fx,A,B}}
function j68cO(t,sd){const o=sd.object;return String(t||"").replace(/\{O\}/g,o&&o.name?o.name:"")}
/* where the object ends (law 6c) */
function j68cTrace(sd,X,st){const o=sd.object;if(!o)return"";const j=e68c();const tr=e68Fill(j68cO(st.trace||o.trace,sd),X),nm=e68Fill(j68cO(o.name,sd),X);
 const own=o.owner==="me"?(S.name||"ngươi"):o.owner==="kho"?"Nội vụ phủ":o.owner==="B"?(X.B?X.B.n:""):(X.A?X.A.n:"");
 j.ob.push({sid:sd.id,name:nm,owner:own,trace:tr,turn:S.turn});if(j.ob.length>BAL.j68c.obKeep)j.ob.splice(0,j.ob.length-BAL.j68c.obKeep);return `${nm}: ${tr}.`}
function j68cOpts(sd,X){const tier=sd.tier||"m";return Object.entries(sd.stances||{}).map(([id,st])=>{
 const g=j68cVal(st.gain,tier,1),l=j68cVal(st.loss,tier,-1);const r=[];
 if(X.A&&(g.A+l.A))r.push([X.A,g.A+l.A]);if(X.B&&(g.B+l.B))r.push([X.B,g.B+l.B]);
 const spec={c:l.fx,w:g.fx,r,ok:()=>{const t=e68Fill(j68cO((sd.outcomes||{})[id],sd),X);const tr=j68cTrace(sd,X,st);return [t,tr].filter(Boolean).join(" ")}};
 return c6(e68Fill(j68cO(st.text,sd),X),spec)})}
/* the wordings: every opener of the family whose person A fits, then the comp text (the comp alone if none fits) */
function j68cV(sd,OP){const ak=sd.roles&&sd.roles.A?j68cK(sd.roles.A):null;const tag=sd.fam==="rumor"?BAL.j68c.rumorTag:"";
 const L=OP.filter(o=>o.a==="any"||(ak&&o.a===ak));const body=j68cO(sd.text,sd)+tag;
 return{v:L.length?L.map(o=>o.text+" "+body):[body],ops:L}}
function j68cReg(sd,OP){if(!sd||!sd.id||E68I["c:"+sd.id]||!FAM6[sd.fam])return null;const R=sd.roles||{};
 const a=[];if(R.A)a.push(j68cK(R.A));if(R.B)a.push(j68cK(R.B));const W=j68cV(sd,OP);J68C_SEEDS[sd.id]=sd;
 EV6("c:"+sd.id,sd.fam,{a,cs:sd.id,cd:BAL.j68c.cd,v:W.v,
  w:C=>{if(!BAL.j68c.on||!j68cNeeds(sd.needs))return 0;let w=BAL.j68c.w[sd.fam]!=null?BAL.j68c.w[sd.fam]:BAL.j68c.w.def;if(nrSeen("j68","c:"+sd.id,true)>0)w*=BAL.j68c.seen;return w},
  pp:()=>j68cCast(sd),
  vf:()=>W.ops.length?W.ops.map((o,i)=>(!o.needs||!o.needs.month||o.needs.month.includes(S.month))?i:-1).filter(i=>i>=0):null,
  o:X=>j68cOpts(sd,X)});return E68I["c:"+sd.id]}
(function(){try{const L=(typeof J68SEEDS!=="undefined"&&Array.isArray(J68SEEDS))?J68SEEDS:[];const OP={};
 for(const r of L)if(r&&r.type==="open")(OP[r.fam]=OP[r.fam]||[]).push(r);
 for(const r of L)if(r&&r.type==="comp")j68cReg(r,OP[r.fam]||[])}catch(e){console.error("j68c",e)}})();
/* the old counter keeps counting the 90 hand-written decisions only (gate «j68 counts unchanged»); composed ones apart */
(function(){const c0=window.e68Count;if(typeof c0!=="function")return;window.e68Count=function(){const cs=E68.filter(s=>s.cs);const r=c0.apply(this,arguments);
 r.templates-=cs.length;r.variants-=cs.reduce((a,s)=>a+(s.v||[""]).length,0);return r}})();
window.e68cCount=function(){const by={},wd={};for(const s of E68)if(s.cs){by[s.fam]=(by[s.fam]||0)+1;wd[s.fam]=(wd[s.fam]||0)+(s.v||[""]).length}return{seeds:by,wordings:wd}};
