/* ================= jgenpc: GRAND ENDINGS — NPC PARITY (GE09), her help moves an NPC's ending (GE10), world news pop-up (GE08),
   NPC foreign princesses (OR19) — design dev/design/GRAND_ENDINGS.md §2.5 (1), §2.9; STORY_ROADS_PLAN.md §3.0; OD:L1288 (NPC identities from
   the player's pool), OD:L1386 / L1403 (NPCs by the same rules), OD:L1601 (4) (her help / sabotage, the NPC strikes back) =================
   Builds on jge.js (engine, GE_DATA / GE_CAT, BAL.ge), jnroad.js (NPC roads: v.nr) and jnroadhp.js (help record, strike-back) — nothing copied:
   names, pairs, titles, odds, lean and seat rules are read from them; every number lives in BAL.ge.npc / BAL.ge.help / BAL.nroad.fp.
   STATE v.ge (an NPC consort whose road v.nr.r is a live branch; saved with her, rides the rivals in co-op):
     {b branch, st[4] o/f/x, cx[4], pull[4], lt lean tally, d0 Đức at her start, en {chapter: ending key}, r1, r2, res, done, seat}
   FLOW (host only, like the NPC roads): every chapter she plays off-screen (nrPlay) → for each stage of that chapter she picks ONE option of the
     stage, weighted by her nature (jmind mindPick: lean side + the endings her nature points to — no flat roll) → pull / push / close / doom /
     lean like the player's choices, + «@<chapter>=<ending>» → fail-only checks (her chapter ends, seats) → when her road closes: the Hồi kết
     nhánh = Ngã rẽ 1/2 picked from her nature × pull → the SAME resolve as hers (open → odds → grand in a shading or fail; no owner → quiet).
   SUCCESS: her stats + rank step (seat rules), Hoàng hậu through the lập hậu pattern (j8), a seat ending holds the seat (v.ge.seat: locks the
     player's endings that need it, jge geSeatTaken), a leave ending takes her out of the palace, the shading title on her (jdh), a Kim sách
     in her chest (real object, law 6c), her row on the Bảng Thiên mệnh, world news = the centre kit pop-up (GE08, both co-op players).
   FAIL: her loss; a public fall (rank lost) is a palace news line only.
   HELP (GE10): the jnroad help hồi → +BAL.ge.help.pull on the ending she leans to most; a betrayal → −push (0 → fail-only); the rival told
     gets +pull (two-way); she unlocks after the player's help and no betrayal → BAL.ge.help.rw to the player.
   OR19: at game start (and on arrival) an NPC consort may be a foreign princess with the player's pool share; v.fpk origin key, v.fpf face no.
   Kill switch: BAL.ge.npc.on false. Kit only: Q centre pop-up (kitModal through showModal), log lines, jdh title, j90 podium (jge). */
(function(){try{
const GB=()=>BAL.ge,NB=()=>BAL.ge.npc;
const on=()=>{try{return !!(GB().on&&NB().on&&typeof GE_DATA==="object"&&typeof GE_CAT==="object")}catch(e){return false}};
const host=()=>{try{return !(typeof nrGuest==="function"&&nrGuest())}catch(e){return true}};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const K=()=>window.geK;
/* ---------- OR19: foreign princess identity ---------- */
/* share of the player's pool (BAL.orig.ow): hòa thân's weight over every consort origin's weight */
function fpShare(){const W=BAL.orig.ow,no=BAL.nroad.fp.no||[];let t=0;for(const k in W)if(!no.includes(k))t+=W[k]||0;return t>0?(W.nc||0)/t*100:0}
function fpUsed(){const U={};try{const me=S.origin&&S.origin.k;if(me&&originRoot(me)==="nc")(U[me]=U[me]||[]).push(S.fpf||1)}catch(e){}
 for(const v of (rivals||[]))if(v&&v.fpk)(U[v.fpk]=U[v.fpk]||[]).push(v.fpf||0);return U}
/* one roll per consort, kept: "" = not a princess; else the country branch key (nc / bd …) */
function nrFpRoll(v){if(!v||v===S)return"";if(v.fpk!==undefined)return v.fpk||"";v.fpk="";
 try{if(!on()&&!(BAL.nroad&&BAL.nroad.fp))return"";if(v.fromMaid||v.wasMaid||v.coop||v.queen)return"";
  /* a house's own daughter (j55: the house sent her, n.dad set) is that house's record, never a princess */
  if(v.dad!=null&&v.clan)return"";if(!roll(fpShare()))return"";
  const k=originBrPick("nc",Math.random());const F=BAL.nroad.fp,U=fpUsed();const used=U[k]||[];if(used.length>=F.max)return"";
  const free=[];for(let i=1;i<=F.faces;i++)if(!used.includes(i))free.push(i);if(!free.length)return"";
  const o=originByKey(k);v.fpk=k;v.fpf=pick(free);v.clan=(o&&o.land)||"";/* her house is abroad: no court house (tdHouse null) */return k}catch(e){console.error("fp",e);return""}}
window.nrFpRoll=nrFpRoll;
/* the player's own princess face takes one of the same faces (never twice in one game) */
function fpMine(){try{const me=S.origin&&S.origin.k;if(!me||originRoot(me)!=="nc"||S.fpf)return;const U=fpUsed();const used=(U[me]||[]).filter(x=>x);
 const free=[];for(let i=1;i<=BAL.nroad.fp.faces;i++)if(!used.includes(i))free.push(i);S.fpf=free.length?pick(free):1}catch(e){}}
(function(){if(typeof start!=="function")return;const s0=start;start=function(){const r=s0.apply(this,arguments);
 try{if(S&&!S.dead&&host()){fpMine();for(const v of rivals.slice())if(v&&v.alive&&!v.out&&!v.coop&&v.fpk===undefined)nrFpRoll(v)}}catch(e){console.error("fp",e)}return r}})();
/* ---------- GE09: NPC state ---------- */
function nBranch(v){const r=v&&v.nr&&v.nr.r;return r&&GE_DATA[r]&&GE_CAT[r]&&geOrig(r)===v.nr.o?r:null}/* origin from ARC67[r].o (pt_* roads are origin pf), like the player (jge.js geOrig) */
function nS(v){if(!v||v===S||v.coop)return null;if(v.ge&&v.ge.b)return v.ge;if(!on())return null;const b=nBranch(v);if(!b)return null;
 v.ge={b,st:["o","o","o","o"],cx:[0,0,0,0],pull:[0,0,0,0],lt:0,d0:v.duc|0,en:{},done:0};return v.ge}
const D=g=>GE_DATA[g.b],C=g=>GE_CAT[g.b];
/* her stats for the gates (same keys as the player's; a field she lacks counts 0) */
function nStat(v,k){try{if(k==="dad")return v.dad||0;if(k==="maid"){let m=0;try{for(const s of (typeof knStaff==="function"?knStaff(v):[]))m=Math.max(m,s.loyal||0)}catch(e){}return m}
 if(k==="mis")return -100;if(k==="mat")return +v.mat||0;return v[k]||0}catch(e){return 0}}
const gate=(g,i)=>(GB().gate[g.b+"_"+(i+1)]||{});
function nSeatTaken(X,v){try{if(X==="HH"){if(v.queen)return false;return (typeof qOn==="function"&&qOn())||(S.rank>=RANKS.length-1&&!S.cold)}
 const W=S.geSeat||{};if(W[X])return true;return rivals.some(w=>w&&w!==v&&w.alive!==false&&w.ge&&w.ge.seat===X)}catch(e){return false}}
function nSon(v){try{return allKids().some(([k,m])=>m===v&&k.sex==="m"&&k.alive)}catch(e){return false}}
const ENDK={1:"win",0:"mid","-1":"lose"};
function nTerm(v,g,i,t){const k=t[0];
 if(k==="s")return nStat(v,t[1])>=(gate(g,i)[t[1]]||0);
 if(k==="e"){const e=g.en[t[1]];return !!e&&String(t[2]).split("|").includes(e)}
 if(k==="seat")return !nSeatTaken(t[1],v);
 if(k==="seatT")return nSeatTaken(t[1],v);
 if(k==="mis")return false;/* a consort has no mistress: a {mis} condition never holds for her */
 if(k==="misD")return false;
 if(k==="son")return nSon(v);
 return false}
const nCond=(v,g,i)=>(D(g).e[i].cond||[]).every(t=>nTerm(v,g,i,t));
function nLive(v,g){(D(g).e||[]).forEach((e,i)=>{if(g.st[i]==="o"&&(e.fo||[]).some(t=>nTerm(v,g,i,t)))g.st[i]="f"})}
/* one option name taken → the branch (the player's geNote rules, on her state) */
function nNote(g,n,ch){const B=D(g),P=GB().pull;
 B.e.forEach((e,i)=>{if((e.pull||[]).includes(n))g.pull[i]+=P.step;if((e.push||[]).includes(n))g.pull[i]=Math.max(0,g.pull[i]-P.push);
  if((e.close||[]).includes(n)&&g.st[i]!=="x"){g.st[i]="x";g.cx[i]=ch}else if((e.doom||[]).includes(n)&&g.st[i]==="o")g.st[i]="f"});
 if((B.lean.p||[]).includes(n))g.lt++;if((B.lean.m||[]).includes(n))g.lt--}
/* her nature (traits) */
function nTraits(v){let t=[];try{t=typeof traitsOf==="function"?traitsOf(v)||[]:[]}catch(e){}if(!t.length&&v.trait)t=[v.trait];return t}
function nNat(v){const N=NB().nat,T=nTraits(v);const r1=[0,0,0,0],r2=[0,0,0];let n=0;
 for(const t of T){const x=N[t];if(!x)continue;n++;x.r1.forEach((w,i)=>r1[i]+=w);x.r2.forEach((w,i)=>r2[i]+=w)}
 if(!n){r1.fill(1);r2.fill(1)}return {r1,r2,kind:T.some(t=>NB().kind.includes(t)),cruel:T.some(t=>NB().cruel.includes(t))}}
/* the weight of an option for HER: base 1, + her side of the lean, + endings her nature points to (their pair weight) */
function nOptW(v,g,n,nat){const B=D(g),W=NB().w;let w=1;
 if(nat.kind&&(B.lean.p||[]).includes(n))w+=W.lean;if(nat.cruel&&(B.lean.m||[]).includes(n))w+=W.lean;
 const top1=Math.max(...nat.r1),top2=Math.max(...nat.r2);
 C(g).e.forEach((e,i)=>{if(g.st[i]==="x")return;const a=nat.r1[e[3]]||0,b=nat.r2[e[4]]||0;const mine=a>=top1&&b>=top2,half=a>=top1||b>=top2;
  if((B.e[i].pull||[]).includes(n))w+=mine?W.pull:half?W.pull/2:0;
  /* she shies away from what would close or doom an ending her nature points to (a player who aims at one does the same) */
  if(g.st[i]==="o"&&(mine||half)&&((B.e[i].close||[]).includes(n)||(B.e[i].doom||[]).includes(n)))w*=W.close});return w}
const RAWN=o=>{try{return typeof o.n==="function"?"":String(o.n||"")}catch(e){return""}};
/* she plays chapter A: one option per stage of the chapter's path, picked by her nature */
function nChoose(v,g,A,ch){try{const nat=nNat(v);const P=Array.isArray(A.p)?A.p:[[Object.keys(A.B||{})[0]]];
 for(const stage of P){const L=[];for(const bid of [].concat(stage)){const b=A.B&&A.B[bid];if(!b||!Array.isArray(b.o))continue;for(const o of b.o){const n=RAWN(o);if(n&&!L.some(x=>x[0]===n))L.push([n,nOptW(v,g,n,nat)])}}
  if(!L.length)continue;const n=typeof mindPick==="function"?mindPick(L,v):wpick(L);if(n)nNote(g,n,ch)}}catch(e){console.error("ge npc",e)}}
/* ---------- the Hồi kết nhánh of an NPC ---------- */
function nBond(v){try{const s=GB().bond.sis;for(const x of (typeof liveRivals==="function"?liveRivals(true):[]))if(x&&x!==v&&!x.coop&&aff(v,x)>=s)return x.name;
 if(aff(v,S)>=s&&!S.dead)return S.name}catch(e){}return null}
function nPair(v,g){const nat=nNat(v),E=C(g).e,pw=NB().pw;const bond=nBond(v);const L=[];
 for(let a=0;a<4;a++)for(let b=0;b<3;b++){let w=(nat.r1[a]||0)*(nat.r2[b]||0);if(a===3)w=bond?w*NB().bondMul:0;if(w<=0)continue;
  const j=E.findIndex(e=>e[3]===a&&e[4]===b);if(j>=0&&g.st[j]==="o")w*=1+g.pull[j]*pw;L.push([[a,b],w])}
 const p=L.length?(typeof mindPick==="function"?mindPick(L,v):wpick(L)):[0,2];g.who=bond||"";return p||[0,2]}
function nLean(v,g){const V=GB().var;const last=g.r2===0?1:g.r2===1?-1:0;return g.lt*V.tag+((v.duc|0)-(g.d0|0))*V.duc+last*V.last}
function nShade(v,g,i){const L=nLean(v,g),c=GB().var.cut;if(L>=c)return"t";if(L<=-c)return"a";return C(g).e[i][2]==="A"?"a":"t"}
function nOdds(v,g,i){const O=GB().odds;let p=O.base+g.pull[i]*O.per;p=Math.max(O.min,Math.min(O.max,p));if(!nCond(v,g,i))p=Math.min(p,O.noCond);return Math.round(p)}
function nWhen(){try{return typeof VP==="object"&&VP.date?VP.date(S.month,S.year):`Tháng ${S.month}, năm thứ ${S.year}`}catch(e){return""}}
function nResolve(v,force){const g=nS(v);if(!g||g.done)return null;nLive(v,g);const [r1,r2]=nPair(v,g);g.r1=r1;g.r2=r2;const E=C(g).e,Bd=D(g);
 const i=E.findIndex(e=>e[3]===r1&&e[4]===r2);let res;
 if(i<0){let j=-1,best=-1;g.pull.forEach((p,k)=>{if(p>best||(p===best&&j>=0&&g.st[j]!=="o"&&g.st[k]==="o")){best=p;j=k}});if(best<=0){j=g.st.indexOf("o");if(j<0)j=0}res={i:j,ok:0,quiet:1}}
 else if(g.st[i]==="o"){const p=nOdds(v,g,i);res={i,ok:(force!=null?!!force:roll(p))?1:0,odds:p}}
 else res={i,ok:0,st:g.st[i]};
 res.lean=nLean(v,g);if(res.ok){res.sh=nShade(v,g,res.i);res.ti=E[res.i][res.sh==="t"?6:7]}
 res.n=E[res.i][0];res.fail=Bd.e[res.i].fail;res.t=S.turn;res.when=nWhen();g.res=res;g.done=1;
 try{nApply(v,g,res)}catch(e){console.error("ge npc",e)}return res}
window.geNpcResolve=nResolve;
/* ---------- reward / loss on the NPC ---------- */
function nRank(v,n){try{if(!n||v.queen)return"";const r0=v.rank|0;
 if(n>0){const r=Math.min(RANKS.length-2,r0+n);if(r>r0&&(typeof seatHas!=="function"||seatHas(v,r))){if(typeof seatUp==="function"&&r<RANKS.length-1)seatUp(v,r,"ge");else v.rank=r;v.lastPromo=S.turn}}
 else v.rank=Math.max(0,r0+n);return v.rank!==r0?`${RANKS[r0].n} → ${RANKS[v.rank].n}`:""}catch(e){return""}}
function nCrown(v){if(v.queen||(typeof qOn==="function"&&qOn())||S.rank>=RANKS.length-1)return false;
 v.rank=RANKS.length-2;v.queen=true;const i=rivals.indexOf(v);if(i>0){rivals.splice(i,1);rivals.unshift(v)}v.lastPromo=S.turn;return true}
function nApply(v,g,res){const id=g.b+"_"+(res.i+1),sum=C(g).e[res.i][5];const out=[];res.fx={};
 if(res.ok){const W=GB().rw[id]||{};const fx={};for(const k of K().STATK)if(W[k]&&k in v)fx[k]=W[k];if(Object.keys(fx).length)ap(v,fx);res.fx=fx;
  const rk=nRank(v,W.rank||0);if(rk)out.push(rk);
  if((W.seat==="HH"||sum==="HH")&&nCrown(v))out.push("lập làm Hoàng hậu");
  else if(GB().seat.includes(sum)&&sum!=="HH"&&!nSeatTaken(sum,v)){g.seat=sum}
  if(W.rel){for(const x of (typeof liveRivals==="function"?liveRivals(true):[]))if(x&&x!==v&&!x.coop){if(res.sh==="t")affAdd(x,v,W.rel);else oanAdd(x,v,W.rel)}}
  /* the one treasure, a real object in HER chest (law 6c; cannot be sold, given or lost) */
  const kk=GB().kimsach;if(IT[kk]){v.inv=v.inv||[];v.inv.push({k:kk,from:"ge",ti:res.ti,d:S.turn,nt:true})}
  try{if(typeof dhInc==="function")dhInc(v,K().key(g.b,res.i,res.sh))}catch(e){}
  if(NB().leave.includes(sum)&&!v.queen){v.alive=false;v.left=sum;if(sum==="NUN")v.nun=1;g.left=1}
  /* GE10: her help on this road (no betrayal) is remembered */
  try{const H=v.nr&&Array.isArray(v.nr.hp)?v.nr.hp:[];if(H.some(x=>x[1]>0)&&!H.some(x=>x[1]<0)&&!v.nr.geRw){v.nr.geRw=1;const R=GB().help.rw;apply(R);res.help=fmt(R)}}catch(e){console.error(e)}
  log(`<b class="g">Thiên hạ truyền tin · Đại kết cục:</b> ${esc(v.name)} đã thành “${esc(res.ti)}”${out.length?` (${out.join(", ")})`:""}.${res.help?` Nhờ ngươi từng giúp một tay, nàng nhớ ơn: ${res.help}.`:""}`)}
 else{const L=res.quiet?{}:(GB().fail[id]||{});const fx={};for(const k of K().STATK)if(L[k]&&k in v)fx[k]=L[k];if(Object.keys(fx).length)ap(v,fx);res.fx=fx;
  const rk=nRank(v,L.rank||0);if(rk){out.push(rk);res.fall=1;log(`<span class="past">Tin trong cung · ${esc(v.name)} · ${esc(res.fail)}: bị giáng ${rk}.</span>`)}}
 res.ex=out}
/* ---------- the funnel rides her road ---------- */
function nAfterCh(v,A,cid,n,r){if(!r||!A)return;const g=nS(v);if(!g||g.done)return;nChoose(v,g,A,n);
 const x=nrEnd.k;if(x){g.en[n]=String(x);nNote(g,"@"+cid+"="+x,n)}nLive(v,g);
 if(v.nr.x&&v.alive&&!v.out)nResolve(v)}
(function(){if(typeof nrPlay!=="function")return;const f=nrPlay;nrPlay=function(v){let A=null,cid="",n=0;
 try{if(on()&&v&&v.nr&&nBranch(v)){n=v.nr.n;A=nrCh(v.nr.r,n);cid=typeof nrAskId==="function"?nrAskId(v.nr.r,n):v.nr.r;nrEnd.k=null}}catch(e){}
 const r=f.apply(this,arguments);try{if(A&&on())nAfterCh(v,A,cid,n,r)}catch(e){console.error("ge npc",e)}return r}})();
/* ---------- GE10: her help / betrayal on an NPC road ---------- */
function nLeadI(g){let j=-1,b=-1;g.st.forEach((s,i)=>{if(s==="o"&&g.pull[i]>b){b=g.pull[i];j=i}});return j}
function nHelpMove(v,sign){const g=nS(v);if(!g||g.done)return"";const j=nLeadI(g);if(j<0)return"";const H=GB().help;
 if(sign>0){g.pull[j]+=H.pull;return ` Ngả đường «${esc(C(g).e[j][0])}» của ${typeof nrHe==="function"?nrHe(v):"nàng"} thêm vững.`}
 g.pull[j]=Math.max(0,g.pull[j]-H.push);if(g.pull[j]<=0){g.st[j]="f";g.cx[j]=v.nr?v.nr.n:0}return""}
(function(){if(typeof nrHelped!=="function")return;const h0=nrHelped;nrHelped=function(X,how){const r=h0.apply(this,arguments);
 try{if(!on()||!how||!host())return r;const v=X&&X.A&&X.A.o;let add="";if(v&&rivals.includes(v))add+=nHelpMove(v,how>0?1:-1);
  if(how<0){const o=X.B&&X.B.o;if(o&&o!==v&&rivals.includes(o))nHelpMove(o,1)}return (r||"")+add}catch(e){console.error("ge npc",e);return r}}})();
/* ---------- GE08: world news = centre kit pop-up (both co-op players read the same NPC state) ---------- */
function nSum(v,g,res){const sum=C(g).e[res.i][5];if(v.queen&&(sum==="HH"))return"Thánh chỉ lập nàng làm Hoàng hậu, chủ trì lục cung.";
 if(g.left)return sum==="NUN"?"Nàng xin xuất gia, rời cung cấm.":sum==="FOLLOW"?"Nàng theo người mình gắn bó rời khỏi cung cấm.":sum==="NV"?"Nàng về cố quốc, lên ngôi nữ vương.":"Nàng rời khỏi cung cấm.";
 if(g.seat)return {NDE:"Ngôi nữ đế từ nay thuộc về nàng.",THH:"Nàng buông rèm nhiếp chính.",TM:"Con nàng nối ngôi, nàng thành mẹ của vua."}[g.seat]||"";return""}
function nNews(){if(!S||S.dead||!on()||!NB().news)return 0;S.geNs=S.geNs||{};let n=0;
 for(const v of (rivals||[])){const g=v&&v.ge,res=g&&g.res;if(!res||!res.ok||!v.name)continue;const id=String(v.id)+":"+g.b;if(S.geNs[id])continue;S.geNs[id]=1;
  const ident=(typeof GE_ID==="object"&&GE_ID[geOrig(g.b)])||"";const s2=nSum(v,g,res);
  /* the kit news panel (KIT §kitModal, kind "news"): the person = the full-body figure column (subject), one fact per line, the date on the sub line */
  const facts=[`${v.name} đi trọn con đường «${C(g).n}»${ident?` (${ident})`:""}, tới Đại kết cục «${res.n}».`,`Thiên hạ gọi nàng là “${res.ti}”.`];
  if(s2)facts.push(s2);if(res.help)facts.push(`Nàng nhớ ơn ngươi từng giúp một tay: ${res.help}.`);
  /* the news names her in public: the player now knows her name (j61 reveal stage 2 «Biết tên»; true information) */
  try{if(typeof k61Know==="function")k61Know(v,"Thiên hạ truyền tin về nàng.",true,2)}catch(e){}
  if(typeof kitPanel==="function")kitPanel({kind:"result",title:"Thiên hạ truyền tin",sub:res.when||"",subject:v,facts,btn:"Đã rõ"});
  else Q.push({t:"Thiên hạ truyền tin",who:v,h:facts.map(f=>`<p>${esc(typeof f==="string"?f:v.name+" "+f.text)}</p>`).join("")});n++}
 return n}
window.geNpcNews=nNews;
(function(){if(typeof endTurn!=="function")return;const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(nNews()&&typeof showModal==="function"&&$("modal")&&$("modal").hidden)showModal()}catch(e){console.error("ge npc",e)}return r}})();
(function(){if(typeof render!=="function")return;const r0=render;render=function(){const r=r0.apply(this,arguments);try{if(S&&!S.dead&&!host()&&!Q.length&&!S.mg&&nNews()&&$("modal").hidden)showModal()}catch(e){}return r}})();
/* old saves: a road already past its finale with no v.ge stays as it was (nothing to resolve); dbg for tests / bots */
window.geNpcDbg={state:nS,choose:nChoose,pair:nPair,odds:nOdds,lean:nLean,term:nTerm,live:nLive,help:nHelpMove,share:fpShare,used:fpUsed};
}catch(e){console.error("jgenpc",e)}})();
