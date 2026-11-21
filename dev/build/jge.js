/* ================= jge: GRAND ENDINGS ENGINE — Đại kết cục (design dev/design/GRAND_ENDINGS.md r3 §2; owner OD:L1613, L1618, L1623–L1624 (1), L1601 (3)–(5), L1837) =================
   Phase 1 (§7 step 2): engine + the pilot branches of GE_DATA (jgedata.js); names / pairs / titles from GE_CAT (jgecat.js, generated from the catalogue).
   A branch = identity × road (S.st.f14.rd, a full road of jroad.js). Only a branch with data is live; every other life plays as before.
   STATE (S.ge, personal; old saves: missing → made open on first read, geS):
     {b branch, st[4] "o" còn mở · "f" chỉ còn đường thua · "x" đã khép, cx[4] chapter where it closed, pull[4], lt option lean tally, d0 Đức at start,
      ce {arc: ending} chapters that ended, oc {chapter: open count} (funnel measure), r1/r2 the last two choices, res the outcome, done}
   FLOW: every option she takes in a story chapter (j67 res67) → pull / push / close / doom / lean tag of the branch (raw option names, like the j97 rare path);
     every chapter end (chEnd67) → "@arc=end" pulls; when the frame ends (BAL.ge.when "ch14": after chapter 14; "r11": after the road finale) → one hồi
     «Hồi kết nhánh» = two kit event dialogs (Ngã rẽ 1 · Đi hay ở, Ngã rẽ 2 · Đối đãi thế nào), forced, no costs → geResolve:
       pair owned by an open ending → odds (pull + its condition, BAL.ge.odds) rolled once → Đại kết cục in its shading (option C, hidden lean) or its fail outcome (loss);
       pair owned by a fail-only / closed ending → its fail outcome (loss); pair owned by none → the fail outcome of her most-pulled ending, quiet form (no loss, D8).
     Success: kit event «Đại kết cục · <danh hiệu>» + reward (BAL.ge.rw, same size both shadings) + Kim sách Thiên mệnh + the shading title (jdh group «Thiên mệnh»)
     + her row on the Bảng «Thiên mệnh» (NHIỆM VỤ tab) + ctm-ge collection; a leave / throne ending closes the life with an epilogue (D4, BAL.ge.after).
   CARRY (D5, BAL.ge.title.carry): the next life may wear the title earned in the life before (cosmetic); nothing else crosses lives.
   SỔ LUÂN HỒI: life line «Đại kết cục: …» / «Kết cục: …»; collection rows; Sơ đồ nhánh page waits for kit part K-GE-1 (BAL.ge.mapOn) — its data API geMap(branch) is ready.
   KIT: kit event dialogs (pushDil / PEND, j3), kit panel + rows + title plate (jdh / jtitle §82), kit podium (j90 §26.1). No private UI.
   ONE CORE: every number in BAL.ge (jbalge.js). VANPHONG: no %, odds (D7 on) only as the ladder word. */
(function(){try{
const GB=()=>BAL.ge;
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
/* the identity (origin key) a branch belongs to = its road's own declared origin ARC67[b].o (pt_* roads are origin "pf"); prefix only as fallback */
const geOrig=b=>{try{const a=typeof ARC67==="object"&&ARC67[b];return a&&a.o&&a.o!=="rd"?a.o:String(b).split("_")[0]}catch(e){return String(b).split("_")[0]}};
window.geOrig=geOrig;
const R1N=["Ở lại, giữ trọn phận mình","Ở lại, nắm lấy quyền bính","Rời khỏi cung cấm","Theo người ấy đi"];
const R2N=["Lấy ân mà đối đãi","Lấy uy mà trị","Buông bỏ tất cả"];
const SHN={t:"thiện",a:"ác"};
/* ---------- branch + state ---------- */
function geBranch(){try{if(!GB().on||!S||!S.st||!S.st.f14)return null;const rd=S.st.f14.rd;if(!rd||!GE_DATA[rd]||!GE_CAT[rd])return null;
 if(!S.origin||geOrig(rd)!==S.origin.k)return null;/* a country branch (Bắc Địch) playing nc roads owns its own set (D2, out of scope): not live */
 return rd}catch(e){return null}}
function geS(){if(typeof S==="undefined"||!S)return null;if(S.ge&&S.ge.b)return S.ge;const b=geBranch();if(!b)return null;
 S.ge={b,st:["o","o","o","o"],cx:[0,0,0,0],pull:[0,0,0,0],lt:0,d0:S.duc|0,ce:{},oc:{},done:0};return S.ge}
window.geS=geS;
const D=s=>GE_DATA[s.b],C=s=>GE_CAT[s.b];
const chN=()=>{try{return S.st.ch.n|0}catch(e){return 0}};
/* ---------- the world: seats, people ---------- */
function geMis(){try{const id=S.st.f14.act&&S.st.f14.act.mis;return id!=null?RV(id):null}catch(e){return null}}
/* GE09 seat locks both ways: a seat an NPC took by her own grand ending (v.ge.seat, jgenpc.js; rides the rivals in co-op) is taken for her too */
function geSeatTaken(X){try{if(X==="HH")return S.rank<RANKS.length-1&&typeof qOn==="function"&&qOn();const W=S.geSeat||{};if(!!W[X]&&W[X]!=="me")return true;
 return (typeof rivals==="object"&&rivals||[]).some(v=>v&&v.alive!==false&&v.ge&&v.ge.seat===X)}catch(e){return false}}
function geStat(k){try{if(k==="dad")return S.dad||0;if(k==="maid")return S.maid?S.maid.loyal||0:0;if(k==="mis"){const v=geMis();return v?aff(v,S):-100}return S[k]||0}catch(e){return 0}}
const gate=(s,i)=>(GB().gate[s.b+"_"+(i+1)]||{});
function geTerm(s,i,t){const k=t[0];
 if(k==="s")return geStat(t[1])>=(gate(s,i)[t[1]]||0);
 if(k==="e"){const e=typeof rdEnd==="function"?rdEnd(t[1]):"";return !!e&&String(t[2]).split("|").includes(e)}
 if(k==="seat")return !geSeatTaken(t[1]);
 if(k==="seatT")return geSeatTaken(t[1]);
 if(k==="mis"){const v=geMis();return !!(v&&v.alive&&!v.out)&&geStat("mis")>=(gate(s,i).mis||0)}
 if(k==="misD"){const v=geMis();return !(v&&v.alive&&!v.out)}
 if(k==="son")return typeof mySons==="function"&&mySons().length>0;
 return false}
function geCond(s,i){return (D(s).e[i].cond||[]).every(t=>geTerm(s,i,t))}
/* fail-only states from the world (a seat taken, the person gone, a chapter that ended badly) */
function geLive(s){if(!s)return;(D(s).e||[]).forEach((e,i)=>{if(s.st[i]==="o"&&(e.fo||[]).some(t=>geTerm(s,i,t)))s.st[i]="f"})}
window.geLive=geLive;
function geOpenN(s){return s.st.filter(x=>x==="o").length}
/* ---------- choices feed the branch ---------- */
function geNote(name){const s=geS();if(!s||s.done)return;const n=String(name||"");if(!n)return;const B=D(s),P=GB().pull;
 B.e.forEach((e,i)=>{if((e.pull||[]).includes(n))s.pull[i]+=P.step;if((e.push||[]).includes(n))s.pull[i]=Math.max(0,s.pull[i]-P.push);
  if((e.close||[]).includes(n)&&s.st[i]!=="x"){s.st[i]="x";s.cx[i]=chN()}else if((e.doom||[]).includes(n)&&s.st[i]==="o")s.st[i]="f"});
 if((B.lean.p||[]).includes(n))s.lt++;if((B.lean.m||[]).includes(n))s.lt--}
window.geNote=geNote;
(function(){const r0=res67;res67=function(tk,bid,i,odds){let o=null;try{const A=th67(tk);if(A&&A.cur===bid&&geS())o=opts67(A,beatDef67(A,bid))[i]}catch(e){}
 const r=r0.apply(this,arguments);try{if(o)geNote(o.n)}catch(e){console.error("ge",e)}return r}})();
(function(){const e0=chEnd67;chEnd67=function(A,E,ign){try{const s=geS();if(s&&!s.done&&A){s.ce[A.a]=A.end;geNote("@"+A.a+"="+A.end);
  (function(){const ch=store.get("ctm-gech")||{};const L=ch[s.b]||(ch[s.b]=[]);if(!L.includes(A.a)){L.push(A.a);store.set("ctm-gech",ch)}})();
  const a=ARC67[A.a];if(a&&a.road===s.b&&Object.keys(GB().funnel).map(Number).includes(a.rn||4)){geLive(s);s.oc[a.rn||4]=geOpenN(s)}if(A.a===s.b){geLive(s);s.oc[4]=geOpenN(s)}}}catch(e){console.error("ge",e)}
 return e0.apply(this,arguments)}})();
/* ---------- the shading lean (option C, hidden) ---------- */
function geLean(s){const V=GB().var;const last=s.r2===0?1:s.r2===1?-1:0;return s.lt*V.tag+((S.duc|0)-(s.d0|0))*V.duc+last*V.last}
function geShade(s,i){const L=geLean(s),c=GB().var.cut;if(L>=c)return"t";if(L<=-c)return"a";return C(s).e[i][2]==="A"?"a":"t"}
/* ---------- odds ---------- */
/* law 5 (harder as she climbs, OD:L1254; brief E35): ONE key BAL.ge.odds.rank = odds lost per rank step, read here for every branch of every wave;
   her rank step = rkOf(S) (the one rank reader, j8), 0 Đáp ứng … 7 Hoàng hậu; a servant life (isSrv) climbs the maid ladder instead: step = S.srv.rk */
function geRk(){try{const r=typeof isSrv==="function"&&isSrv()?S.srv.rk:typeof rkOf==="function"?rkOf(S):S.rank;return Math.max(0,Math.min(RANKS.length-1,r|0))}catch(e){return 0}}
window.geRk=geRk;
function geOdds(s,i){const O=GB().odds;let p=O.base+s.pull[i]*O.per-geRk()*(O.rank||0);p=Math.max(O.min,Math.min(O.max,p));if(!geCond(s,i))p=Math.min(p,O.noCond);return Math.round(p)}
window.geOdds=geOdds;
/* ---------- the Hồi kết nhánh ---------- */
function geReady(){const s=geS();if(!s||s.done||S.dead||S.out)return false;try{if(GB().when==="r11")return !!(typeof rdEnd==="function"&&rdEnd(BAL.road.last));return !!S.st.ch.all}catch(e){return false}}
const geQd=()=>Q.some(m=>m&&/^ge[12R]$/.test(m.pid||""));
function geAsk(){if(!geReady()||geQd())return;const s=geS();geLive(s);pushDil(mkP("ge1",{}),"Hồi kết nhánh")}
window.geAsk=geAsk;
/* «người ấy»: the strongest real bond of her life */
function geBond(){let best=null,bv=-1;try{for(const m of (S.men||[]))if(m&&m.alive!==false&&(m.tinh||0)>=GB().bond.men&&(m.tinh||0)>bv){best=m.name;bv=m.tinh}
 for(const v of (typeof liveRivals==="function"?liveRivals(true):[]))if(v&&aff(S,v)>=GB().bond.sis&&aff(S,v)>bv){best=v.name;bv=aff(S,v)}}catch(e){}return best}
PEND.ge1=()=>{const s=geS();if(!s||s.done)return null;const who=geBond();
 const o=R1N.map((n,i)=>{const c={n,fx:{},x:i===3?(who?`người ấy: ${who}`:""):"",risk:"có rủi ro",hint:"nẻo này dẫn tới đâu, thành hay hỏng, đến câu cuối mới rõ",go:()=>{const s2=geS();if(!s2||s2.done)return;s2.r1=i;pushDil(mkP("ge2",{}),"Hồi kết nhánh")}};
  if(i===3&&!who&&typeof kitOff==="function")kitOff(c,"chưa có ai","khi có một người ngươi thật lòng gắn bó");return c});
 return {who:pMe(),mustChoose:1,t:`<b>Hồi kết nhánh · Ngã rẽ 1 · Đi hay ở</b><br>Cuối con đường «${esc(C(s).n)}». Ngoảnh lại một đời trong cung, ngươi đứng trước hai ngã rẽ cuối cùng. Ngã thứ nhất: ở lại hay ra đi?`,o}};
PEND.ge2=()=>{const s=geS();if(!s||s.done||s.r1==null)return null;
 const o=R2N.map((n,i)=>{let x="";if(GB().showOdds){const j=C(s).e.findIndex(e=>e[3]===s.r1&&e[4]===i);if(j>=0&&s.st[j]==="o"&&typeof oddsLv==="function"&&typeof KIT_ODDS!=="undefined")x=KIT_ODDS[Math.max(0,oddsLv(geOdds(s,j)))]}
  return {n,fx:{},x,risk:"có rủi ro",hint:"thành bại khó đoán; hỏng thì có thể mất danh tiếng, phẩm vị",go:()=>geResolve(i)}});
 return {who:pMe(),mustChoose:1,t:`<b>Hồi kết nhánh · Ngã rẽ 2 · Đối đãi thế nào</b><br>Ngươi đã chọn: «${R1N[s.r1]}». Còn lại một câu: với thiên hạ, với những người quanh mình, ngươi đối đãi thế nào?`,o}};
/* ---------- resolve ---------- */
function geResolve(r2,force){const s=geS();if(!s||s.done)return null;if(r2!=null)s.r2=r2;geLive(s);const E=C(s).e,Bd=D(s);
 const i=E.findIndex(e=>e[3]===s.r1&&e[4]===s.r2);let res;
 if(i<0){let j=-1,best=-1;s.pull.forEach((p,k)=>{if(p>best||(p===best&&j>=0&&s.st[j]!=="o"&&s.st[k]==="o")){best=p;j=k}});if(best<=0){j=s.st.indexOf("o");if(j<0)j=0}
  res={i:j,ok:0,quiet:1}}
 else if(s.st[i]==="o"){const p=geOdds(s,i);const ok=force!=null?!!force:roll(p);res={i,ok:ok?1:0,odds:p}}
 else res={i,ok:0,st:s.st[i]};
 res.lean=geLean(s);if(res.ok){res.sh=geShade(s,res.i);res.ti=E[res.i][res.sh==="t"?6:7]}
 res.n=E[res.i][0];res.fail=Bd.e[res.i].fail;res.t=S.turn;res.life=geLifeNo();s.res=res;s.done=1;
 try{geApply(s,res)}catch(e){console.error("ge",e)}
 try{pushDil(mkP("geR",{}),res.ok?"Đại kết cục":"Kết cục")}catch(e){console.error("ge",e)}
 /* the title notice (jdh kit reward panel) comes AFTER the event */
 if(res.ok)try{if(typeof dhInc==="function")dhInc(S,geKey(s.b,res.i,res.sh))}catch(e){console.error("ge",e)}
 return res}
window.geResolve=geResolve;
/* the whole answer in one call (bots, tests): r1, r2 indexes; force = true/false skips the roll */
window.geAnswer=(r1,r2,force)=>{const s=geS();if(!s||s.done)return null;s.r1=r1;return geResolve(r2,force)};
function geLifeNo(){try{return (typeof lifeLog==="function"?lifeLog().length:0)+1}catch(e){return 1}}
/* ---------- reward / loss ---------- */
const STATK=["danh","sung","bac","mat","duc","tai","tamco","sac","th","hh","maid","suc"];
function geRank(n){if(!n||(typeof isSrv67==="function"&&isSrv67()))return"";const top=RANKS.length-2;const r0=S.rank;
 if(n>0){if(S.rank>=top)return"";S.rank=Math.min(top,S.rank+n);S.maxRank=Math.max(S.maxRank||0,S.rank);S.lastPromo=S.turn;try{ghenAll(BAL.ghen.rankUp)}catch(e){}}
 else{if(S.rank>=RANKS.length-1)return"";S.rank=Math.max(0,S.rank+n)}
 return S.rank!==r0?`Phẩm vị: ${RANKS[r0].n} → ${RANKS[S.rank].n}`:""}
function geApply(s,res){const id=s.b+"_"+(res.i+1);const out=[];
 if(res.ok){const W=GB().rw[id]||{};const fx={};STATK.forEach(k=>{if(W[k])fx[k]=W[k]});apply(fx);res.fx=fx;
  const rk=geRank(W.rank||0);if(rk)out.push(rk);
  if(W.seat==="HH"&&S.rank<RANKS.length-1&&!(typeof qOn==="function"&&qOn())){const r0=S.rank;S.rank=RANKS.length-1;S.justCrowned=1;S.lastPromo=S.turn;try{ghenAll(BAL.ghen.rankUp)}catch(e){}out.push(`Phẩm vị: ${RANKS[r0].n} → Hoàng hậu`)}
  const sum=C(s).e[res.i][5];if(GB().seat.includes(sum)&&sum!=="HH"){S.geSeat=S.geSeat||{};S.geSeat[sum]="me"}
  if(W.rel){let n=0;for(const v of (typeof liveRivals==="function"?liveRivals(true):[])){if(res.sh==="t")affAdd(v,S,W.rel);else oanAdd(v,S,W.rel);n++}
   if(n)out.push(res.sh==="t"?`Cả lục cung thêm thiện cảm với ngươi`:`Cả lục cung thêm kính sợ ngươi`)}
  if(W.mis){const v=geMis();if(v&&v.alive){relAdd(S,v,W.mis);out.push(`${v.name} thêm gắn bó với ngươi`)}}
  /* the one treasure: Kim sách Thiên mệnh, the shading title engraved (cannot be sold, given or lost) */
  const k=GB().kimsach;if(IT[k]){/* the one Ngự tứ path (j97 r97give), engraved */if(typeof r97give==="function"&&r97give(k,"Hoàng thượng")){const it=S.inv[S.inv.length-1];it.from="ge";it.ti=res.ti}out.push(`Phần thưởng: ${IT[k].n} khắc «${res.ti}» (đã vào Rương)`)}
  S.gePt=(S.gePt||0)+GB().pt;
  geBoardAdd(S,res.ti,res.sh,s.b);geBook(s,res);
  log(`<b class="g">Đại kết cục · ${res.ti}.</b> Thiên hạ truyền tai: ${S.name} đã thành “${res.ti}”.`)}
 else{const L=(!res.quiet||GB().quietLoss)?(GB().fail[id]||{}):{};const fx={};STATK.forEach(k=>{if(L[k])fx[k]=L[k]});if(Object.keys(fx).length)apply(fx);res.fx=fx;
  const rk=geRank(L.rank||0);if(rk)out.push(rk);if(L.mis){const v=geMis();if(v&&v.alive){relAdd(S,v,L.mis);out.push(`${v.name} xa cách ngươi`)}}
  geBook(s,res);log(`<b class="r">Kết cục · ${res.fail}.</b>${res.quiet?" Cuộc đời ngươi vẫn tiếp tục như thế.":""}`)}
 res.ex=out}
/* ---------- the result event (kit dialog; serialisable) ---------- */
function geExit(s,res){const A=GB().after;if(!res.ok)return false;if(A==="close")return true;if(A==="stay")return false;return GB().exitSum.includes(C(s).e[res.i][5])}
/* bang-words: ending texts carry the road's land tokens ({kha} {land} {quan} {dien} …) — filled by the one filler (j67 fill67), never shown raw */
function geF(x){try{return typeof fill67==="function"&&/\{\w+\}/.test(x||"")?fill67(x,(S&&S.st&&S.st.M)||{}):x}catch(e){return x}}
window.geF=geF;
PEND.geR=()=>{const s=S&&S.ge;if(!s||!s.res)return null;const res=s.res,e=D(s).e[res.i];
 const rows=[];if(res.fx&&Object.keys(res.fx).length)rows.push([res.ok?"Được":"Mất",fmt(res.fx),res.ok?"g":"r"]);(res.ex||[]).forEach(x=>rows.push(["",x,"t"]));
 const R=rows.length&&typeof kitRows==="function"?`<div class="kpsec">${kitRows(rows)}</div>`:"";
 if(res.ok){const ex=geExit(s,res);
  return {who:pMe(),mustChoose:1,t:`<b>Đại kết cục · ${esc(res.ti)}</b><br>${geF(res.sh==="t"?e.t:e.a)}<br><span class="past">Thiên hạ truyền tai: ${esc(S.name)} đã thành “${esc(res.ti)}”.</span>${R}`,
   o:[{n:"Tạ ơn",fx:{},x:ex?"kết thúc kiếp này":"",go:()=>{if(ex&&!S.dead&&typeof kitEndNext==="function")kitEndNext("grand");if(ex&&!S.dead)over(`Đại kết cục · ${res.ti}`,geF(res.sh==="t"?e.t:e.a),`Đại kết cục: ${res.ti}`,true)}}]}}
 return {who:pMe(),mustChoose:1,t:`<b>Kết cục · ${esc(res.fail)}</b><br>${res.quiet?"Cuộc đời ngươi vẫn tiếp tục như thế.":geF(e.ft)}${R}`,o:[{n:"Tiếp tục",fx:{},x:"",go:()=>{}}]}};
/* ---------- the collection (ctm-ge, across lives; knowledge only) ---------- */
const geKey=(b,i,sh)=>`ge_${b}_${i+1}${sh}`;
function geStore(){const g=store.get("ctm-ge");return g&&typeof g==="object"?Object.assign({t:{},g:{},f:{}},g):{t:{},g:{},f:{}}}
function geBook(s,res){const g=geStore();const node=s.b+"_"+(res.i+1);
 if(res.ok){const key=geKey(s.b,res.i,res.sh);const e=g.t[key]||(g.t[key]={name:res.ti,b:s.b,i:res.i,sh:res.sh,lives:[],first:{life:res.life,who:S.name,o:S.origin&&S.origin.n}});
  if(!e.lives.includes(res.life))e.lives.push(res.life);g.g[node]=(g.g[node]||0)+1;g.cur={key,life:res.life}}
 else g.f[node]=(g.f[node]||0)+1;store.set("ctm-ge",g)}
window.geStore=geStore;
/* ---------- titles: the jdh catalogue group «Thiên mệnh» (one step, tier BAL.ge.title.tier, no bonus: cosmetic) ---------- */
function geTitles(){try{if(typeof DH_CAT!=="object")return;BAL.dh.T=BAL.dh.T||{};for(const b in GE_DATA){const Cb=GE_CAT[b];if(!Cb)continue;Cb.e.forEach((e,i)=>{["t","a"].forEach(sh=>{
  const key=geKey(b,i,sh),nm=e[sh==="t"?6:7],how=GE_DATA[b].e[i][sh==="t"?"ht":"ha"];
  DH_CAT[key]={n:nm,g:"tm",how:()=>{const r=geStore().t[key];const id=GE_ID[geOrig(b)]||"";return `${geF(how)}. ${r&&r.first?`Kiếp ${r.first.life} · `:""}${id} · ${Cb.n}`}};
  BAL.dh.T[key]={n:[1],b:GB().title.tier,ch:[]}})})}}catch(e){console.error("ge",e)}}
geTitles();
/* carry (D5): a new life may wear the grand title of the life before ("prev") or any title ever earned ("any"); cosmetic only */
function geCarry(){try{const g=geStore();const keys=GB().title.carry==="any"?Object.keys(g.t):(g.last?[g.last]:[]);if(!keys.length||!S)return;
 S.dh=S.dh||{};for(const k of keys)if(DH_CAT[k]&&!S.dh[k])S.dh[k]={n:1,i:0,at:[""],carry:1}}catch(e){console.error("ge",e)}}
window.geCarry=geCarry;
(function(){const s0=start;start=function(){const r=s0.apply(this,arguments);try{geCarry()}catch(e){console.error("ge",e)}return r}})();
/* Sổ luân hồi: the life line + "last" (what the next life may wear) */
(function(){if(typeof lifeSave!=="function")return;const l0=lifeSave;lifeSave=function(fate){try{const r=S&&S.ge&&S.ge.res;const g=geStore();
  if(r){const add=r.ok?`Đại kết cục: ${r.ti}`:`Kết cục: ${r.fail}`;if(!String(fate||"").includes(add))fate=`${fate} · ${add}`}
  g.last=r&&r.ok?geKey(S.ge.b,r.i,r.sh):null;store.set("ctm-ge",g)}catch(e){console.error("ge",e)}return l0.call(this,fate)}})();
/* Sổ luân hồi: the collection rows (kit rows, like the kỳ ngộ book of j97) */
function geBookHTML(){const g=geStore();const nT=Object.keys(g.t).length,tot=Object.keys(GE_CAT).length*GB().n.grand*2;
 const rows=[["Danh hiệu Thiên mệnh",`<b>${nT}/${tot}</b>`,nT?"g":""]];
 for(const k in g.t){const e=g.t[k],Cb=GE_CAT[e.b];if(!Cb)continue;rows.push([`«${esc(e.name)}»`,`${esc(Cb.e[e.i][0])} · ${esc(GE_ID[geOrig(e.b)]||"")} · ${esc(Cb.n)} · kiếp ${e.lives.join(", ")}`,"g"])}
 rows.push(["Ghi chú","Chỉ danh hiệu Thiên mệnh của kiếp ngay trước được mang sang kiếp sau, để đeo cho đẹp."]);
 return `<h3>Thiên mệnh</h3>`+rows67(rows)}
if(typeof pastHTML==="function")(function(){const p0=pastHTML;pastHTML=function(){const h=p0.apply(this,arguments);try{return h+geBookHTML()}catch(e){return h}}})();
window.geBookHTML=geBookHTML;
/* ---------- Bảng «Thiên mệnh»: who reached a grand ending in THIS life ---------- */
function geBoardAdd(p,ti,sh,b){S.geBoard=S.geBoard||[];S.geBoard.push({id:p===S?"me":String(p.id),ti,sh,b,when:(typeof VP==="object"&&VP.date?VP.date(S.month,S.year):`Tháng ${S.month}, năm thứ ${S.year}`),pt:GB().pt})}
/* GE09: NPC rows come from the NPCs themselves (v.ge.res, jgenpc.js) so the co-op friend sees the same Bảng; her row first, then in order reached */
function geBoardList(){const L=(S&&S.geBoard||[]).filter(x=>x.id==="me").map(x=>Object.assign({},x,{who:S}));
 try{for(const v of (typeof rivals==="object"&&rivals||[])){const r=v&&v.ge&&v.ge.res;if(!r||!r.ok||!v.name)continue;L.push({id:String(v.id),ti:r.ti,sh:r.sh,b:v.ge.b,when:r.when||"",pt:GB().pt,t:r.t||0,who:v})}}catch(e){}
 const me=L.filter(x=>x.id==="me"),np=L.filter(x=>x.id!=="me").sort((a,b)=>(a.t||0)-(b.t||0));return me.concat(np).map((x,i)=>Object.assign(x,{place:i+1}))}
window.geBoardList=geBoardList;
function geBoardPanel(tabs){if(!S||typeof kitPanel!=="function")return;const L=geBoardList();const sec=[];if(tabs)sec.push({h:"",html:tabs});
 const rows=L.map(x=>{const o=typeof dhObj==="function"?dhObj(x.who,geKey(x.b,GE_CAT[x.b].e.findIndex(e=>e[6]===x.ti||e[7]===x.ti),x.sh)):null;
  const plate=o&&typeof kitTitlePlate==="function"?kitTitlePlate(o):`«${esc(x.ti)}»`;const nm=typeof kitName==="function"?kitName(x.who,x.who===S?{named:true}:{}):esc(x.who.name);
  return [plate,[nm,`${esc(GE_ID[geOrig(x.b)]||"")} · ${esc(x.when)}`],"t"]});
 sec.push({h:`Bảng Thiên mệnh · ${L.length} người`,rows:rows.length?rows:[["Bảng","Kiếp này chưa ai đạt Đại kết cục"]]});
 const opts=[];if(L.length>=2&&typeof kitPodiumShow==="function")opts.push({n:"Xem bảng vàng",fx:{},x:"",go:()=>kitPodiumShow(L.map(x=>({who:x.who,place:x.place,sub:x.ti,score:x.pt})),{title:"Bảng Thiên mệnh",next:"Đóng"})});
 opts.push({n:"Đóng",fx:{},go:()=>{}});
 kitPanel({kind:"info",title:"Thiên mệnh",sub:"Những người kiếp này đạt Đại kết cục",sections:sec,opts,dh:1,cls:"kes-t-fate"/* KIT §91 ending screen (owner #51) */},true);showModal()}
window.geBoardPanel=geBoardPanel;
/* ---------- the Kim sách item (one kind) ---------- */
try{IT[GB().kimsach]=IT[GB().kimsach]||{n:"Kim sách Thiên mệnh",kd:"Kỷ vật",d:"Sách vàng khắc danh hiệu Thiên mệnh của ngươi; không bán, không tặng, không mất",pr:0,keep:1,tg:[]}}catch(e){}
/* ---------- the triggers ---------- */
/* a new life of a live branch gets its state at once (Đức at the start = the lean's zero) */
(function(){if(typeof a67init!=="function")return;const i0=a67init;a67init=function(){const r=i0.apply(this,arguments);try{if(S)S.ge=null;geS()}catch(e){console.error("ge",e)}return r}})();
(function(){const a0=chAdvance67;chAdvance67=function(){const r=a0.apply(this,arguments);try{if(geReady())geAsk()}catch(e){console.error("ge",e)}return r}})();
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(geReady())geAsk()}catch(e){console.error("ge",e)}return r}})();
/* ---------- Sơ đồ nhánh data API (the page waits for kit part K-GE-1 kitBranchMap; BAL.ge.mapOn) ---------- */
function geMap(b){const Cb=GE_CAT[b];if(!Cb)return null;const g=geStore(),rb=store.get("ctm-rare97")||{},seen=(store.get("ctm-gech")||{})[b]||[];
 const s=S&&S.ge&&S.ge.b===b?S.ge:null;if(s)geLive(s);const R=typeof ROAD14==="object"?ROAD14[b]||{}:{};
 const curA=(()=>{try{return S.st.M?S.st.M.a:""}catch(e){return""}})();
 const ids=[b].concat([5,6,7,8,9,10,11].map(n=>R[n]).filter(Boolean));
 const spine=[{id:"nhap",n:"Nhập cung",seen:true}].concat(ids.map((id,k)=>({id,at:k+4,n:seen.includes(id)&&ARC67[id]?ARC67[id].t:"?",seen:seen.includes(id),past:!!(s&&s.ce[id]!=null),here:id===curA})),
  [{id:"ch12",at:12,n:"Chương 12"},{id:"hau14",at:13,n:ARC67.hau14?ARC67.hau14.t:"Chương 13"},{id:"ke14",at:14,n:ARC67.ke14?ARC67.ke14.t:"Chương 14"},{id:"hkn",n:"Hồi kết nhánh"}]);
 const rare=[[4,b],[11,R[11]]].map(([at,id])=>({at,id,seen:!!(id&&rb[id]),n:id&&rb[id]?rb[id].tag||"?":"?"}));
 const ends=Cb.e.map((e,i)=>{const node=b+"_"+(i+1);const tk=sh=>g.t[geKey(b,i,sh)];const any=tk("t")||tk("a");
  const lives=[].concat(tk("t")?tk("t").lives:[],tk("a")?tk("a").lives:[]).sort((x,y)=>x-y);
  return {i,n:any?e[0]:"?",st:s?s.st[i]:"o",ch:s?s.cx[i]:0,slots:[{sh:"t",ti:tk("t")?e[6]:"?"},{sh:"a",ti:tk("a")?e[7]:"?"}],
   fail:{n:g.f[node]&&GE_DATA[b]?GE_DATA[b].e[i].fail:"?"},
   card:any?{r1:R1N[e[3]],r2:R2N[e[4]],cw:GE_DATA[b]?GE_DATA[b].e[i].cw:"",lives}:{txt:"Chưa ai biết ngả này dẫn tới đâu."}}});
 const nG=ends.filter(x=>x.n!=="?").length,nT=ends.reduce((a,x)=>a+x.slots.filter(y=>y.ti!=="?").length,0),nK=rare.filter(x=>x.seen).length;
 return {b,n:Cb.n,id:GE_ID[geOrig(b)]||"",spine,rare,ends,count:{g:nG,t:nT,k:nK,txt:`Đại kết cục ${nG}/${GB().n.grand} · Danh hiệu ${nT}/${GB().n.grand*2} · Kỳ ngộ ${nK}/${GB().n.rare}`}}}
window.geMap=geMap;
/* ---------- the «Sơ đồ nhánh» PAGE in Sổ luân hồi (GE03, design GRAND_ENDINGS §2.10; BAL.ge.mapOn): kit parts only —
   identity tab row (kitTabRowHTML, count = Đại kết cục earned / all of that identity) × road tab row (kitTabRowHTML, the roads of that identity) × kitBranchMap of the picked branch (counts chip, spine, her chip, 4 ends, card on tap = kitBranchMapOpen);
   the whole-book totals are a kitRows row. Only her own lives are read (geMap: ctm-ge / ctm-rare97 / ctm-gech + this life's S.ge) — unseen nodes stay «?». The branch of the life she plays opens first. ---------- */
let GEMP=null;
function geMapIds(){return Object.keys(GE_ID).filter(id=>Object.keys(GE_CAT).some(k=>geOrig(k)===id))}
function geMapRoads(id){return Object.keys(GE_CAT).filter(k=>geOrig(k)===id)}
function geMapLive(){try{return S&&S.ge&&GE_CAT[S.ge.b]?S.ge.b:null}catch(e){return null}}
function geMapPick(){if(GEMP&&GE_CAT[GEMP.b])return GEMP;const b=geMapLive()||Object.keys(GE_CAT)[0];return GEMP={id:geOrig(b),b}}
function geMapInner(){const P=geMapPick(),ids=geMapIds(),GBn=GB().n;const cnt={};let tg=0,tt=0,tk=0,nb=0;
 for(const id of ids){let g=0;const roads=geMapRoads(id);for(const b of roads){const m=geMap(b);if(m){g+=m.count.g;tg+=m.count.g;tt+=m.count.t;tk+=m.count.k;nb++}}cnt[id]=`${g}/${roads.length*GBn.grand}`}
 const idTabs=ids.map(id=>({k:id,label:esc(GE_ID[id]),n:cnt[id],tip:`Đại kết cục đã đạt: ${cnt[id]}`}));
 const rdTabs=geMapRoads(P.id).map(b=>{const m=geMap(b);return {k:b,label:esc(GE_CAT[b].n),n:m?`${m.count.g}/${GBn.grand}`:null,tip:m?m.count.txt:""}});
 const m=geMap(P.b);
 return rows67([["Cả sổ luân hồi",`Đại kết cục ${tg}/${nb*GBn.grand} · Danh hiệu ${tt}/${nb*GBn.grand*2} · Kỳ ngộ ${tk}/${nb*GBn.rare}`]])+
  `<div class="pctabs kcattabs kgmtabs" role="tablist">${kitTabRowHTML(idTabs,P.id,"data-kgm-id")}</div>`+
  `<div class="pctabs kcattabs kgmroads" role="tablist">${kitTabRowHTML(rdTabs,P.b,"data-kgm-rd")}</div>`+
  `<div class="kgm-chart" data-kgm-b="${P.b}">${kitBranchMap(m)}</div>`}
function geMapPageHTML(){if(!GB().mapOn||typeof kitBranchMap!=="function"||typeof kitTabRowHTML!=="function")return"";if(GEMP&&GEMP.keep)GEMP.keep=false;else GEMP=null;/* a node card closing re-mounts the page: keep the picked branch then */
 try{return `<h3>Sơ đồ nhánh</h3><div class="kgm" data-kgm>${geMapInner()}</div>`}catch(e){console.error("ge",e);return""}}
document.addEventListener("click",e=>{const t=e.target&&e.target.closest&&e.target.closest("[data-kgm-id],[data-kgm-rd]");if(!t)return;
 try{const P=geMapPick();if(t.dataset.kgmId){const id=t.dataset.kgmId;if(id===P.id)return;const live=geMapLive();GEMP={id,b:live&&geOrig(live)===id?live:geMapRoads(id)[0]}}
  else GEMP={id:geOrig(t.dataset.kgmRd),b:t.dataset.kgmRd};
  const h=t.closest("[data-kgm]");if(h){h.innerHTML=geMapInner()}}catch(x){console.error("ge",x)}});
/* the kit's node-card handler reads host.__kbm: refresh it from the data at the moment of the tap (capture phase = before the kit's own handler) */
document.addEventListener("click",e=>{const n=e.target&&e.target.closest&&e.target.closest(".kgm-chart .kbm [data-kbm]");if(!n)return;const h=n.closest(".kgm-chart");if(h&&h.dataset.kgmB)try{h.__kbm=geMap(h.dataset.kgmB);if(GEMP)GEMP.keep=true}catch(x){}},true);
if(typeof pastHTML==="function")(function(){const p0=pastHTML;pastHTML=function(){const h=p0.apply(this,arguments);try{return h+geMapPageHTML()}catch(e){return h}}})();
window.geMapPageHTML=geMapPageHTML;
/* state words of a node this life (Sơ đồ nhánh, VANPHONG §5) */
window.geStateWord=(st,ch)=>st==="o"?"Còn mở":st==="f"?"Chỉ còn đường thua":`Đã khép${ch?" · chương "+ch:""}`;
/* read-only hooks for dev/test + dev/measure (the condition terms, stats and shading the engine uses) */
window.geDbg={term:geTerm,cond:geCond,stat:geStat,shade:geShade,lean:geLean,mis:()=>geMis()};
/* shared with the NPC parity module (jgenpc.js): the same names, keys, odds and lean formulas — nothing copied */
window.geK={R1N,R2N,SHN,STATK,key:geKey,store:geStore,seatTaken:geSeatTaken,lifeNo:geLifeNo};
}catch(e){console.error("jge",e)}})();
