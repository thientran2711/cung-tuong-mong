/* ================= jstory: STORY LABELS · DEADLINES · PRICE BY RANK · NON-SILVER ROUTES (owner 15/11 13:55Z + 17:06Z) =================
   Wraps only (j67 chapters, j4 old story, j97 rare chance, j72 side quests); loaded after jk2b/jaudit so the kit option wrappers sit inside.
   (1) Every story dialog is titled with its line, quest, chapter and act: "Chính tuyến · Báo thù cho nhà · Chương 2 · Hồi 3/5" (j67 lab67,
       owner 15/11 20:30Z; old saves without a chapter: Chương 1) · "Phụ tuyến · <việc> · Lời nhờ" (j72 offer). Data only: the kit header.
   (2) A chapter option that costs more Bạc than she has is not a dead button any more: a sibling option "…: nhận lời, lo liệu trong N"
       keeps the beat open with a DEADLINE by severity (BAL.dl67Khan / dl67Vua / dl67Lon, in buổi). She can settle it later from any screen:
       the countdown chip in the stage status plaque (Tình trạng, tap = the same choice again), the Mệnh truyện tab, or the beat card itself.
       Nothing fails before the deadline; when it passes the beat resolves as giving up (its no-cost option, else the pledged option fails)
       and Danh −BAL.dl67Pen. While a beat is pledged the chapter clock (A.dl) waits.
   (3) Price by rank: every Bạc cost of a chapter option × BAL.cost67[rank] (a Đáp ứng pays less than a Quý phi), rounded to 5.
   (4) Every chapter beat with a Bạc option also offers a route WITHOUT silver (ALT67 hand-written, else "nhờ người quen lo liệu"):
       Sức instead of Bạc, odds from the silver route's own odds − BAL.alt67Pen + Tai mắt + her maid's Lòng; same success, failure = the
       route's own loss + Danh −2. Indices stay stable (appended after the beat's own options).
   Audit: dev/review/story-deadlines.md (script dev/review/story_audit.js). ====================================================== */
Object.assign(BAL,{dl67Khan:4,dl67Vua:9,dl67Lon:21,dl67Pen:2,cost67:[.6,.7,.8,.9,1,1.1,1.25,1.4,1.5],alt67Pen:15,alt67Suc:-6});
function absB67(){try{return wk()*B4N+(S.buoi||0)}catch(e){return 0}}
function dlT67(nb){nb=Math.max(0,nb|0);return nb<=0?"hết hạn":nb<B4N?`${nb} buổi`:nb%B4N===0?`${nb/B4N} ngày`:nb<2*B4N?`${nb} buổi`:`${Math.round(nb/B4N)} ngày`}
function rkMul67(){const L=BAL.cost67;return L[Math.max(0,Math.min(L.length-1,(S&&S.rank)|0))]}
function price67(n){return -Math.max(5,Math.round(-n*rkMul67()/5)*5)}
/* severity: hand-set beats, else from the text (hunted / urgent) and the beat slot (climax and turn beats are big) */
const SEV67={"td_an.c1":"Khan"};
function beatId67(A,b){for(const id of [A.cur,A.nb].concat(A.seq?[].concat(...A.seq.map(x=>Array.isArray(x)?x:[x])):[]))if(id&&beatDef67(A,id)===b)return id;
 const a=ARC67[A.a];if(a&&a.B)for(const k in a.B)if(a.B[k]===b)return k;return null}
function sev67(A,bid,b){const k=A.a+"."+bid;if(SEV67[k])return SEV67[k];if(b&&b.sev)return b.sev;let t="";try{t=fill67(b.t||"",A)+" "+fill67(b.h||"",A)}catch(e){}
 if(/truy sát|bị .{0,30}lùng|lùng bắt|ngay đêm nay|gấp|sắp bị|nguy kịch|hấp hối|chặn đường/i.test(t))return"Khan";
 if(/^(x|t)/.test(String(bid||"")))return"Lon";return"Vua"}
const SEVN67={Khan:"khẩn",Vua:"vừa",Lon:"lớn"};
/* hand-written non-silver routes (key arc.beat); {maid} {foed}… are j67 tokens */
const ALT67={
 "td_an.c1":[{n:"Nhờ {maid} giấu ông trong kho củi sau cung",c:{suc:-6},o:()=>40+(S.maid?(S.maid.loyal||0)/3:0)+(S.mat||0)*4,sc:1,f:"wit",wx:"giữ được nhân chứng",
   l:{danh:-3},lx:"lục soát ra thì cung ngươi mang tiếng chứa chấp",rt:"Lão Vương nằm im trong kho củi, {maid} đêm đêm mang cơm.",rf:"Người của {foed} lục soát, lão Vương phải bỏ trốn; cung ngươi bị dị nghị."},
  {n:"Xin Thái y viện nhận ông làm người sắc thuốc",c:{suc:-4},o:()=>30+((S.arts&&S.arts.y)||0)*9+(S.tamco||0)/5,sc:1,f:"wit",wx:"nhân chứng có chỗ đứng chính danh",
   l:{},lx:"thái y không dám nhận",rt:"Lão Vương thành người sắc thuốc ở Thái y viện, không ai ngờ.",rf:"Thái y lắc đầu, không dám chứa người lạ."}]};
/* bạc ↔ the road without it (owner rule 15/11 via coordinator): the road without silver costs about what the silver is WORTH to her —
   the price in khắc at her rank (BAL.bacTuan = bạc she earns per tuần of 16 khắc at each rank, measured by the sensible bot,
   dev/measure/bacroad.js) — paid as Sức (BAL.altK.suc per khắc of price), a lower chance (BAL.altK.pen points per khắc) and, on a phụ tuyến step, khắc of
   asking around (BAL.altK.k72 per khắc of price), between the
   old flat road (floor) and BAL.altK.sucMax / penMax. Small prices keep the old road; big ones get a dearer road, so she hesitates. */
Object.assign(BAL,{bacTuan:[17,20,25,40,45,51,60,70],altK:{suc:1.2,pen:1.6,sucMax:20,penMax:40,k72:.5}});
function bacK(bac,rk){const T=BAL.bacTuan;return Math.abs(bac||0)*16/T[Math.max(0,Math.min(T.length-1,rk==null?3:rk|0))]}
function altCost(bac,rk,suc0,pen0){const k=bacK(bac,rk),K=BAL.altK;return{suc:Math.max(Math.abs(suc0),Math.min(K.sucMax,Math.round(k*K.suc))),pen:Math.max(pen0,Math.min(K.penMax,Math.round(k*K.pen)))}}
function altOf67(A,bid,o){const base=typeof o.o==="function"?o.o:(o.o==null?80:o.o);const AC=altCost(o.c&&o.c.bac,S&&S.rank,BAL.alt67Suc,BAL.alt67Pen);
 return{n:"Nhờ người quen lo liệu, không dùng bạc",c:{suc:-AC.suc},o:A2=>{let x=typeof base==="function"?base(A2):base;return x-AC.pen+(S.mat||0)*4+(S.maid?((S.maid.loyal||0)-50)/5:0)},
  w:o.w,sc:o.sc,f:o.f,wx:o.wx,l:Object.assign({},o.l||{},{danh:((o.l||{}).danh||0)-2}),lx:[o.lx,"người được nhờ lỡ việc"].filter(Boolean).join(", "),
  rt:o.rt,rf:o.rf||"Người được nhờ làm hỏng việc.",e:o.e,to:o.to,tf:o.tf,go:o.go,need:o.need}}
(function(){const o0=opts67;opts67=function(A,b){let L=o0.apply(this,arguments);try{if(!v267()||!A||!b||!Array.isArray(L))return L;
 L=L.map(o=>o&&o.c&&typeof o.c==="object"&&o.c.bac<0?Object.assign({},o,{c:Object.assign({},o.c,{bac:price67(o.c.bac)}),c0:o.c.bac}):o);
 const silver=L.filter(o=>o.c&&o.c.bac<0);if(!silver.length)return L;const bid=beatId67(A,b);
 const hand=ALT67[A.a+"."+bid];const alts=(hand||[altOf67(A,bid,silver[0])]).map(x=>Object.assign({},x,{alt67:1}));
 return L.concat(alts.filter(x=>{try{return oNeed67(x)}catch(e){return true}}))}catch(e){console.error("jstory opts",e);return L}}})();
/* ---------- the dialog: label, pledge option, "để sau" ---------- */
function quest67(){try{return (QUEST67[S.origin.k]||QUEST67.tt).t}catch(e){return"Mệnh truyện"}}
function title67(A){if(!A)return"Mệnh truyện";const main=A===S.st.M;return `${main?"Chính tuyến":"Phụ tuyến"} · ${main?quest67():ARC67[A.a].t} · ${lab67(A)}`}
function pl67(){const P=S&&S.pl67;if(!P)return null;let A=null;try{A=th67(P.t)}catch(e){}if(!A||A.a!==P.a||A.cur!==P.b||A.done){S.pl67=null;return null}return P}
(function(){const p0=PEND.j67;PEND.j67=function(p){const d=p0.apply(this,arguments);try{if(!d||!v267())return d;const A=th67(p.t);if(!A)return d;const b=beatDef67(A,p.b);const O=opts67(A,b);
 d.t=String(d.t).replace(/^<b>([^<]*)<\/b> <span class="past">· hồi \d+\/\d+<\/span>/,(m,x)=>`<b>${(pos67(A)||{}).c?`Chương ${pos67(A).c} · `:""}${x}</b>`);
 const P=pl67();
 if(P&&P.a===p.a&&P.b===p.b){const left=P.due-absB67();d.t+=`<br><span class="past">Ngươi đã nhận lời «${P.n}»: còn ${dlT67(left)} để lo đủ Bạc ${P.cost}.</span>`;
  d.o.push({n:"Để sau, còn lo liệu",fx:{},x:"",j67:`kèm: còn ${dlT67(left)} tới hạn`,hint:"việc chưa xong, hạn vẫn chạy",risk:"an toàn",go:()=>log(`Ngươi khất việc «${P.n}», còn ${dlT67(left)}.`)})}
 else if(!P){const poor=O.map((o,i)=>[o,i]).filter(([o])=>o.c&&o.c.bac<0&&!o.alt67&&S.bac+o.c.bac<0);
  if(poor.length){const [o,i]=poor[0];const sv=sev67(A,p.b,b),nb=BAL["dl67"+sv];const nm=fill67(o.n,A);
   d.o.push({n:`${nm}: nhận lời, lo liệu trong ${dlT67(nb)}`,fx:{},x:"",pl67:1,j67:`kèm: quá ${dlT67(nb)} chưa nộp thì việc hỏng`,
    kneed:[{t:`nộp Bạc ${-o.c.bac} trong ${dlT67(nb)} (đang có ${S.bac})`,ok:true}],hint:`giữ việc lại; phải gom đủ bạc trong ${dlT67(nb)}`,risk:"có rủi ro",go:()=>pledge67(p,i,sv,nb)})}}
 return d}catch(e){console.error("jstory PEND",e);return d}}})();
function pledge67(p,i,sv,nb){const A=th67(p.t);if(!A||A.cur!==p.b)return;const b=beatDef67(A,p.b);const o=opts67(A,b)[i];if(!o)return;
 S.pl67={a:p.a,b:p.b,t:p.t,pp:p,i,sev:sv,due:absB67()+nb,t0:absB67(),n:plain(fill67(o.n,A)),h:plain(fill67(b.h||"",A)),cost:-o.c.bac,chap:A.chap||1};
 if(A.dl!=null)A.dl=Math.max(A.dl,S.turn+Math.ceil(nb/9)+1);
 log(`Ngươi nhận lời: <b>${S.pl67.n}</b>. Việc ${SEVN67[sv]}: hạn ${dlT67(nb)} để lo đủ Bạc ${S.pl67.cost} (đang có ${S.bac}).`)}
function pl67Open(){const P=pl67();if(!P||!S||S.dead||Q.length)return false;const A=th67(P.t);const d=mkP("j67",P.pp);if(!d)return false;
 Q.unshift({t:title67(A),h:d.t,opts:d.o,who:d.who,pid:"j67",pp:P.pp});showModal();return true}
window.pl67Open=pl67Open;
function pl67Lapse(){const P=pl67();if(!P||S.dead)return;const A=th67(P.t);const b=beatDef67(A,P.b);const O=opts67(A,b);
 const free=O.map((o,i)=>[o,i]).filter(([o])=>!o.alt67&&!Object.values(o.c||{}).some(v=>v<0)&&!(o.need||[]).length);
 const pick=free.find(([o])=>o.o==null)||free[0];S.pl67=null;apply({danh:-BAL.dl67Pen});
 log(`<span class="r">Quá hạn lo liệu «${P.n}»: việc hỏng.</span> Danh -${BAL.dl67Pen}.`);
 if(pick)res67(P.t,P.b,pick[1],100);else res67(P.t,P.b,P.i,0);
 card67("info","Quá hạn lo liệu",[["Việc",P.n],["Hạn",`đã qua (${dlT67(P.due-P.t0)})`,"r"],["Kết cục",pick?`như chọn «${plain(fill67(pick[0].n,A))}»`:"việc hỏng","r"],["Thể diện",`Danh -${BAL.dl67Pen}`,"r"]],who67(b.w,A))}
(function(){const r0=res67;res67=function(tk){const r=r0.apply(this,arguments);try{pl67()}catch(e){}return r}})();
(function(){const n0=nextBuoi;nextBuoi=function(){const r=n0.apply(this,arguments);try{const P=pl67();if(P&&absB67()>=P.due)pl67Lapse()}catch(e){console.error("jstory lapse",e)}return r}})();
/* ---------- labels on every story dialog ---------- */
(function(){const d0=pushDil;pushDil=function(d,title){try{if(d&&v267()){if(d.pid==="j67"){const A=th67(d.pp&&d.pp.t);if(A)title=title67(A)}
  else if(d.pid==="j97x"){const c=S.st.ch,a=d.pp&&d.pp.a,x=c&&c.past?c.past.slice().reverse().find(y=>y.a===a):null;title=`Chính tuyến · ${quest67()} · Chương ${x?x.n:(pos67()||{}).c||1} · Cơ duyên hiếm`}}
 else if(d&&title==="Tuyến truyện"&&S&&S.st)title=`Chính tuyến · ${quest67()} · ${lab67()||"Chương 1"}`}catch(e){}return d0.call(this,d,title)}})();
(function(){const s0=showModal;showModal=function(){try{const m=Q[0];if(m&&m.pid==="q72o"&&!m.__lab&&typeof q72X==="function"){const X=q72X(m.pp.x);if(X){m.t=`Phụ tuyến · ${plain(q72Title(X))} · Lời nhờ (${X.T.s.length} bước)`;m.__lab=1}}}catch(e){}return s0.apply(this,arguments)}})();
/* the Cần row of an option (kit data-kneed, j63) for modal options that carry kneed */
(function(){const n0=kaNorm1;kaNorm1=function(b){try{if(b&&b.dataset&&b.dataset.m!=null&&!b.dataset.kneed){const M=b.closest&&b.closest("#modal");const o=M&&Q[0]&&Q[0].opts&&Q[0].opts[+b.dataset.m];
  if(o&&o.kneed)b.dataset.kneed=encodeURIComponent(JSON.stringify(o.kneed))}}catch(e){}return n0.apply(this,arguments)}})();
/* ---------- countdown: status plaque chip (kit Tình trạng, jk3) + Mệnh truyện tab ---------- */
try{window.K3_STATE.push("pl67")}catch(e){}
HX.pl67="Việc trong Mệnh truyện ngươi đã nhận lời lo liệu. Chạm để lo liệu ngay.";
/* kit page #kit sample of the K3_STATE hook (KIT 31.2): a module's state chip in the top-bar state row, drawn by jk3 k3row (review r6) */
if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§31.2",title:"K3_STATE: chip trạng thái ở hàng đầu trang (hạn lo liệu)",html:()=>typeof k3row!=="function"?"":
 `<div class="k3tc"><span class="k3tt"><span class="kstl k3l1">${k3row("pl67","Hạn lo liệu","4 buổi","hot")} ${k3row("fake","Giả bệnh","","hot")}</span></span></div>`});
(function(){const h0=renderHud2;renderHud2=function(){const r=h0.apply(this,arguments);try{const P=pl67();const el=$("hud2");if(P&&el&&!el.querySelector('[data-hx="pl67"]')){const left=P.due-absB67();
  el.insertAdjacentHTML("beforeend",`<button class="hc hot" data-hx="pl67">Hạn lo liệu <b>${dlT67(left)}</b></button>`);if(typeof k3Stage==="function")k3Stage()}}catch(e){}return r}})();
window.addEventListener("click",e=>{const t=e.target.closest&&e.target.closest('[data-k3="pl67"],[data-hx="pl67"],[data-pl67]');if(!t)return;e.stopPropagation();e.preventDefault();pl67Open()},true);
(function(){const p0=panel67;panel67=function(){let h=p0.apply(this,arguments);try{const P=pl67();if(!P)return h;const left=P.due-absB67();
  const blk=`<h3>Đang lo liệu</h3>`+rows67([["Việc",`${P.n} · Chương ${P.chap||1}`],["Hạn",(typeof kitChip==="function"?kitChip(`còn ${dlT67(left)}`,left<=3?"r":"n"):`còn ${dlT67(left)}`)],["Cần",`Bạc ${P.cost} (có ${S.bac})`,S.bac>=P.cost?"g":"r"],
   ["Quá hạn","việc hỏng như bỏ mặc, Danh -"+BAL.dl67Pen,"r"],["Đường khác","có cách không dùng bạc trong chính việc này"]])+`<p><button class="kbtn" data-pl67="1">Lo liệu ngay</button></p>`;
  const i=h.indexOf("</div>");h=i>=0?h.slice(0,i+6)+blk+h.slice(i+6):blk+h}catch(e){console.error(e)}return h}})();
(function(){const o0=obj67;obj67=function(){const r=o0.apply(this,arguments);try{const P=pl67();if(P)return `Lo liệu «${P.n}»: còn ${dlT67(P.due-absB67())} · `+r}catch(e){}return r}})();
/* ---------- old story (j4, saves from before chapters): the witness also gets routes without silver ---------- */
(function(){const t0=PEND.td1;if(!t0)return;PEND.td1=function(p){const d=t0.apply(this,arguments);try{if(d&&d.o){const st=S.st;
 d.o.splice(1,0,{n:`Nhờ ${S.maid?S.maid.name:"cung nữ thân tín"} giấu ông trong kho củi`,fx:{suc:-6},x:`${word(od(40+(S.maid?(S.maid.loyal||0)/3:0)+(S.mat||0)*4))} · thành: giữ được nhân chứng · hỏng: Danh -3, mất nhân chứng`,
  go:()=>{if(roll(od(40+(S.maid?(S.maid.loyal||0)/3:0)+(S.mat||0)*4)))st.wit=1;else{apply({danh:-3});S.caseEv=Math.max(0,(S.caseEv||0)-1);log(`<span class="r">Người của ${S.foeDad} lục soát, lão Vương bỏ trốn.</span>`)}}});
 const g=d.o.find(o=>/Tân Giả Khố/.test(o.n));if(g&&g.fx&&g.fx.bac)g.fx.bac=price67(g.fx.bac)}}catch(e){}return d}})();
/* ---------- phụ tuyến (j72): every step that costs Bạc gets a branch without silver (owner 17:06Z, whole group) ----------
   A single Bạc step becomes a two-way step: the original (same odds / cost / outcome) or "… (nhờ người, không dùng bạc)": one khắc more,
   Sức −6, odds of the original −BAL.alt72Pen + Tai mắt (q72 skill "mat"). A branched step whose every branch costs Bạc gets the same extra
   branch built from its first silver branch. j72 deadlines already work the owner's way (fail only when the tuần deadline passes). */
BAL.alt72Pen=10;
/* built once at load, but priced when read: odds, khắc and Sức follow HER rank now (getters), as the silver is worth more to a low rank
   (balance-pass: priced at the middle rank only, rank-1 roads were too cheap and rank-5 roads too dear, dev/review/bacroad-*.md) */
function alt72(s,n){const bac=s.c&&s.c.bac,p0=Math.min(s.p!=null?s.p:(s.b==null?100:s.b),100),k0=(s.k==null?1:s.k)+1,rk=()=>(typeof S!=="undefined"&&S?S.rank|0:3);
 const o={n:`${n} (nhờ người, không dùng bạc)`,sk:"mat",
 w:s.w,r:s.r,rb:s.rb,l:Object.assign({},s.l||{}),lr:s.lr,lrb:s.lrb,fn:s.fn,ok:s.ok,no:s.no,to:s.to,lto:s.lto||(s.f==="r"?"r":s.f)||"r",t:s.t,tw:s.tw,alt72:1};
 Object.defineProperty(o,"p",{get:()=>p0-altCost(bac,rk(),6,BAL.alt72Pen).pen,enumerable:true,configurable:true});
 Object.defineProperty(o,"k",{get:()=>k0+Math.round(bacK(bac,rk())*BAL.altK.k72),enumerable:true,configurable:true});
 Object.defineProperty(o,"c",{get:()=>({suc:-altCost(bac,rk(),6,BAL.alt72Pen).suc}),enumerable:true,configurable:true});return o}
(function(){try{if(typeof T72==="undefined")return;for(const T of T72)for(const st of T.s||[]){if(st.w!=null&&!st.n)continue;
 if(!st.ch&&st.c&&st.c.bac<0){const o0={n:st.n,p:st.b<100?st.b:null,sk:st.sk,k:st.k,c:st.c,w:st.w,r:st.r,rb:st.rb,l:st.l,lr:st.lr,lrb:st.lrb,fn:st.fn,ok:st.ok,no:st.no,lto:st.f};
  st.ch=[o0,alt72(Object.assign({},st,{p:st.b}),st.n)]}
 else if(st.ch&&st.ch.length&&!st.ch.some(o=>o.alt72)&&st.ch.every(o=>o.c&&o.c.bac<0))st.ch.push(alt72(st.ch[0],st.ch[0].n))}}catch(e){console.error("jstory j72",e)}})();
