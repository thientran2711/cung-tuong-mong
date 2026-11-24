/* jmgcal — OWNER-ONLY MINIGAME CALIBRATION (AG-ALL-2d2; owner OD 17/11 ~16:20Z (f) + ~16:40Z option 1, verbatim key words:
   "cần cho tôi một cái bài test để tôi chơi thử ... mỗi một cái mini game ... 3 vòng hoặc là 5 vòng ... mỗi một vòng là mỗi cái khó hơn ... chỉ có cái tài
   khoản của tôi là mới test kiểu này thôi ... bất kỳ người nào chơi thì người đó cũng sẽ đi chơi theo cái con số của tôi" / "chỉ có tôi test và cái số
   của tôi dùng chung cho mọi người").
   WHAT: one test per mini-game kind (KG82_KIND with an engine): BAL.ag.mg2.cal.d.length rounds (5), board gap d rising (Dễ → Khó), the same kit game
   frame / rows / buttons the exam uses (jexam exRun pattern: kg82Open + kg82Rows + kg82Btn + kg82ShowRes + kg82Play). Nothing else is drawn here.
   HER BASE per kind  b = mean over rounds of (raw_i − (mgMedD(d_i) − mgMedD(0)))  = her graded play brought back to a MATCHING board (the same board
   shift the NPC side uses), clamped 0..10 — mgCalBase(raws, ds).
   NPC HAND CURVE per kind (jmgt mgHand reads mgCalBand; owner OD 20/11 ~06:40Z bell curve, OK ~07:15Z): the real adult population — average play
   Normal(ctr, sd) per kind (BAL.ag.mg2.hand ctr / sd / grp), NOT centred on her. Her base b only places her on it (mgCalShare: better / about equal
   (± eqZ·sd) / worse than her FALL OUT of the curve).
   WHERE HER NUMBERS LIVE: one core — BAL.ag.mg2.cal.k[kind] = {b, n, at} in jbal2.js, the SAME for every player (no test for anyone else). Her device
   keeps the raw record (localStorage "ctm-mgcal") and shows a short code line «CTM-CAL …» with a copy button; the coordinator writes it into BAL with
   dev/tools/mgcal_apply.py "<code>". Her device does NOT apply its local record (co-op and every other player must roll the same hands).
   WHO SEES IT: only with the owner flag (localStorage "ctm-owner-cal" = "1", set once by opening the game with ?hieuchuan=1; ?hieuchuan=0 clears it):
   one kit row «Thử tay tài nghệ» at the end of Thiết lập (the same .kctl row + .kbtn.alt jnotes uses). Nobody else ever sees the row. */
(function(){try{
const LS={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v)}catch(e){}},del(k){try{localStorage.removeItem(k)}catch(e){}}};
const KEY="ctm-mgcal",FLAG="ctm-owner-cal";
(function(){try{const q=new URLSearchParams(location.search).get("hieuchuan");if(q==="1")LS.set(FLAG,"1");else if(q==="0")LS.del(FLAG)}catch(e){}})();
function mgCalOwner(){return LS.get(FLAG)==="1"}
function C(){return (BAL.ag&&BAL.ag.mg2&&BAL.ag.mg2.cal)||{on:0,d:[0],k:{}}}
/* her base on a matching board from the rounds she played (raws[i] at gap ds[i]) */
function mgCalBase(raws,ds,kind){const n=Math.min(raws.length,ds.length);if(!n)return null;let s=0;for(let i=0;i<n;i++)s+=(+raws[i]||0)-(mgMedD(ds[i],kind)-mgMedD(0,kind));/* kind: its own board shift when BAL.ag.mg2.medK has it (dauho-lv5) */
 return Math.round(cl(s/n,0,10)*10)/10}
/* the NPC hand band of a kind: {lo, hi, sig} (sig changes when the band changes, so a cached hand is re-rolled from the same hash) */
/* the NPC hand curve of a kind (owner OD 20/11 ~06:40Z bell curve, OK ~07:15Z; BAL.ag.mg2.hand ctr / sd / grp): the average adult play m = ctr (per kind, "" default),
   spread sd of the kind's skill group; hands = m + w/2 + sd·z. c = the hand centre, lo / hi = ± zMax·sd, far = slapZ·sd (the scale jslap reads); sig changes when
   the curve changes, so a cached hand is re-rolled from the same hash. Her calibrated b does NOT move the curve — it only places her on it (mgCalShare). */
function mgCalGrp(kind){const G=BAL.ag.mg2.hand.grp||{};for(const g in G)if((G[g]||[]).includes(kind))return g;return""}
function mgCalBand(kind){const H=BAL.ag.mg2.hand,r=x=>Math.round(x*100)/100,T=H.ctr,D=H.sd,g=mgCalGrp(kind);/* every number from BAL (law 4, rv) */
 const m=+(T[kind]!=null?T[kind]:T[""]),sd=+(D[g]!=null?D[g]:D[""]),c=r(m+H.w/2);
 return{c,m:r(m),sd,lo:r(c-H.zMax*sd),hi:r(c+H.zMax*sd),far:r(H.slapZ*sd),sig:"n/"+r(m)+"/"+sd}}
/* where HER calibrated play b sits on that curve: the shares of NPCs (before art / upbringing lifts) better / about equal (± eqZ·sd) / worse than her */
function mgCalShare(kind){const H=BAL.ag.mg2.hand,c=C(),e=c.on&&c.k&&c.k[kind];if(!(e&&isFinite(+e.b)))return null;const Bd=mgCalBand(kind),z=(+e.b-Bd.m)/Bd.sd,q=H.eqZ||0;
 const P=x=>.5*(1+erf(x/Math.SQRT2)),r=x=>Math.round(x*1000)/1000;return{b:+e.b,z:r(z),better:r(1-P(z+q)),equal:r(P(z+q)-P(z-q)),worse:r(P(z-q))}}
function erf(x){const t=1/(1+.3275911*Math.abs(x)),y=1-(((((1.061405429*t-1.453152027)*t)+1.421413741)*t-.284496736)*t+.254829592)*t*Math.exp(-x*x);return x<0?-y:y}
/* the kinds she can test: every KG82 kind whose engine is in the game */
function mgCalKinds(){try{return Object.keys(KG82_KIND).filter(k=>{const K=KG82_KIND[k];return K&&K.n&&typeof KG82_ENG!=="undefined"&&typeof KG82_ENG[K.e]==="function"})}catch(e){return[]}}
/* owner 21/11 ~00:25Z (verbatim): "mấy cái nút đó đỏ lại đi. Mấy cái nút mà của mấy cái game tao chưa có thử xong á" — kinds whose game was FIXED after her try
   (BAL.ag.mg2.cal.redo {kind: ISO time of the fix}) count as NOT tried until she plays them again after that time: red button, in «Chưa thử», in «Thử tiếp». */
function stale(L,k){const R=C().redo||{};return !!(L&&R[k]&&(+L.t||0)<Date.parse(R[k]))}
function ok(r,k){return !!r[k]&&!stale(r[k],k)}
function rec(){try{return JSON.parse(LS.get(KEY)||"{}")||{}}catch(e){return{}}}
function recSet(kind,raws,ds){const r=rec();r[kind]={raws,ds,b:mgCalBase(raws,ds,kind),t:Date.now()};LS.set(KEY,JSON.stringify(r));return r[kind]}
function mmdd(t){const d=new Date(t||Date.now()),p=n=>String(n).padStart(2,"0");return `${p(d.getMonth()+1)}/${p(d.getDate())}/${d.getFullYear()}`}
/* the code line for the coordinator: CTM-CAL kind:b/rounds@mm/dd/yyyy … */
function mgCalCode(r){r=r||rec();/* rv mgcal-redo: a try taken before its game was fixed never goes into the code (broken-board tries are dropped) */return "CTM-CAL "+Object.keys(r).filter(k=>ok(r,k)&&r[k].b!=null).map(k=>`${k}:${r[k].b}/${(r[k].raws||[]).length}@${mmdd(r[k].t)}`).join(" ")}
function nm(k){const K=KG82_KIND[k];return K&&K.n||k}
function stat(k){const L=rec()[k],c=C().k||{};const a=L?(stale(L,k)?"đã sửa trò, cần thử lại":`đã thử, tay ${mgWord(L.b)}`):"chưa thử";return c[k]?`${a} · đã ghi vào sổ chung`:a}
/* ---- the test (kit game frame only) ---- */
function pick(){const ks=mgCalKinds();if(typeof kg82Open!=="function")return;
 const d=kg82Open({art:"Thử tay",title:"Tài nghệ các môn",how:`Mỗi môn ${C().d.length} hồi, hồi sau khó hơn hồi trước. Phần của người thành mức chuẩn cho tay nghề của mọi người trong cung.`,round:"Môn",roundV:`${ks.length}`});
 if(!d)return;KG82.back=()=>{};/* KIT §13.9: the kit ✕ «Quay lại» closes the list (back to Thiết lập) */const box=kg82Box();const r=rec();
 const dn=ks.filter(k=>ok(r,k)),nd=ks.filter(k=>!ok(r,k));/* s34 MUST: one kind at a time, any order; đã thử / chưa thử in kit rows */
 box.innerHTML=`<h4 class="kpst">Đã thử ${dn.length}/${ks.length} môn</h4>`+kg82Rows([["Đã thử",dn.length?dn.map(k=>`${nm(k)} (${mgWord(r[k].b)})`).join(", "):"chưa môn nào","t"],["Chưa thử",nd.length?nd.map(nm).join(", "):"đã thử đủ","n"]])+/* owner 17/11 ~17:10Z: ONE run through every kind in order (Thử lần lượt), progress kept; resumes at the next kind not yet done */
  `<div class="kg82act"><button class="${kg82Btn()}" id="mgcal-seq">${nd.length?(dn.length?`Thử tiếp các môn còn lại<small>từ môn ${nm(nd[0])} · còn ${nd.length} môn</small>`:`Thử hết cả ${ks.length} môn<small>dừng lúc nào cũng được, lần sau thử tiếp</small>`):`Thử lại hết từ đầu<small>đã thử đủ ${ks.length} môn</small>`}</button></div>`+
  `<h4 class="kpst">Hoặc chọn một môn</h4>`+
  `<div class="kg82act">${ks.map(k=>`<button class="${kg82Btn(ok(r,k))}" data-mgcal-k="${k}">${nm(k)}<small>${stat(k)}</small></button>`).join("")}</div>`+
  (Object.keys(r).some(k=>ok(r,k))?`<h4 class="kpst">Mã kết quả</h4>`+kg82Rows([["Mã",mgCalCode(r),"n"]])+`<div class="kg82act"><button class="${kg82Btn(true)}" id="mgcal-copy">Chép mã</button></div>`:"");/* no «Thôi» row: the kit ✕ «Quay lại» (§13.9, 32.10) */
 box.querySelectorAll("[data-mgcal-k]").forEach(b=>b.onclick=()=>run(b.dataset.mgcalK));
 const sq=$("mgcal-seq");if(sq)sq.onclick=()=>run(nd.length?nd[0]:ks[0],nd.length?"seq":"all");
 const cp=$("mgcal-copy");if(cp)cp.onclick=()=>copy(cp)}
function copy(b){const t=mgCalCode();const ok=()=>{b.textContent="Đã chép"};try{navigator.clipboard.writeText(t).then(ok,()=>{})}catch(e){}}
/* the next kind of a run: "seq" = the next kind not yet done (resume), "all" = the next kind in order (a full redo) */
function nextOf(kind,seq){const ks=mgCalKinds(),r=rec(),i=ks.indexOf(kind);const L=ks.slice(i+1);return seq==="all"?L[0]||null:L.find(k=>!ok(r,k))||ks.find(k=>!ok(r,k))||null}
function run(kind,seq){const K=KG82_KIND[kind],ds=C().d.slice(),n=ds.length,raws=[];let i=0;KG82.ctx="hoc";
 const round=()=>{const t=mgSet(kind,{occ:"hoc",lv:0,d:ds[i]});try{kg82Preload(kind)}catch(e){}
  const d=kg82Open({art:"Thử tay",title:`${K.n} · hồi ${i+1}/${n}`,how:K.how,round:"Hồi",roundV:`${i+1}/${n}`,pic:kg82Pic(kind)});if(!d)return;
  /* owner 20/11 ~04:45Z (KIT §13.9): the kit ✕ «Quay lại» on every screen of a kind → the kind list; a kind left before its last round is NOT saved
     (raws stay local, recSet only at round n — unchanged); asked once while a board is live */
  KG82.back=()=>pick();
  const box=kg82Box();box.innerHTML=`<h4 class="kpst">Thử tay · ${K.n}</h4>`+kg82Rows([["Môn",`${K.n} · ${K.t}`,"t"],["Hồi",`${i+1}/${n}`,"t"],["Độ khó",mgDiffTxt(t,kind),"n"]])+
   `<div class="kg82act"><button class="${kg82Btn()}" id="kg82go">Bắt đầu</button></div>`;
  kgReady(box,{kind});/* KIT §13.7 rules screen; mgcal numbers unchanged (rounds, gaps) */
  $("kg82go").onclick=()=>kg82Play(kind,raw=>after(raw),{raw:1})};/* cal-p2c: Thử tay = her raw hand (no identity offset; her b is seeded from BAL cal.k, jmgid) */
 let L=null;/* owner bug 20/11 (ROOT-72): the kind is saved the moment the LAST round's raw arrives, before any button — leaving after round n keeps it;
    an unfinished kind is never saved (raws stay local until round n), so the code never carries a partial kind */
 const after=raw=>{raws.push(raw);i++;const last=i>=n;if(last)L=recSet(kind,raws.slice(),ds);
  kg82ShowRes(kg82Rows([[`Hồi ${i}`,`${raw}/10 · ${kg82Word(raw)}`,"t"]])+`<div class="kg82act"><button class="${kg82Btn()}" id="mgcal-nx">${last?"Xem mức tay":"Hồi kế tiếp"}</button></div>`,raw>=5);/* own id: the kit ✕ is «Quay lại» here, not this button */
  kg82Set("score",`${raw}/10`);$("mgcal-nx").onclick=()=>{if(last)done();else round()}};
 const done=()=>{if(!L)L=recSet(kind,raws.slice(),ds);const nx=seq?nextOf(kind,seq):null;
  kg82Open({art:"Thử tay",title:`Mức tay · ${K.n}`,how:"Mức này thành chuẩn tay nghề của mọi người trong cung khi được ghi vào sổ chung.",round:"Hồi",roundV:`${n}/${n}`,pic:kg82Pic(kind)});KG82.back=()=>pick();
  kg82ShowRes(kg82Rows(raws.map((x,j)=>[`Hồi ${j+1}`,`${x}/10 · ${kg82Word(x)}`,"t"]).concat([["Mức tay của người",kg82Word(Math.round(L.b)),"t"],["Mã",mgCalCode(),"n"]]))+
   (seq&&nx?`<div class="kg82act"><button class="${kg82Btn()}" id="mgcal-next">Môn kế tiếp<small>${nm(nx)}</small></button></div>`:"")+
   `<div class="kg82act"><button class="${kg82Btn(true)}" id="mgcal-copy">Chép mã</button><button class="${kg82Btn(!!(seq&&nx))}" id="kg82ok">${seq&&nx?"Dừng ở đây":"Thử môn khác"}</button></div>`,true);
  const cp=$("mgcal-copy");if(cp)cp.onclick=()=>copy(cp);$("kg82ok").onclick=()=>pick();const nb=$("mgcal-next");if(nb)nb.onclick=()=>run(nx,seq)};
 round()}
/* ---- entry: one kit row at the end of Thiết lập, owner flag only ---- */
if(typeof optHTML==="function"){const o0=optHTML;optHTML=function(){const h=o0.apply(this,arguments);if(!mgCalOwner())return h;
 const row=`<div class="kctl"><span class="kctl-l">Thử tay tài nghệ<small>chỉ chủ sổ thấy</small></span><span class="kctl-c"><button type="button" class="kbtn alt" data-mgcal-open="1">Thử</button></span></div>`;
 return h.replace(/<\/div>\s*$/,row+"</div>")};window.optHTML=optHTML}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-mgcal-open]");if(!b)return;e.stopPropagation();e.preventDefault();
 try{if(typeof sfx==="function")sfx("sfx-tap")}catch(x){}
 const go=()=>{let n=0;const t=setInterval(()=>{const T=$("title");if((!T||T.hidden)||++n>40){clearInterval(t);pick()}},250)};
 if(typeof kitMenuResume==="function"&&kitMenuResume()){go();return}
 const x=document.querySelector("#modal .kph button, #modal #mclose");if(x)x.click();go()},true);
Object.assign(window,{mgCalBase,mgCalBand,mgCalShare,mgCalGrp,mgCalKinds,mgCalCode,mgCalOwner,mgCalOpen:pick,mgCalRun:run});
}catch(e){console.error(e)}})();
