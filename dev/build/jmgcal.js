/* jmgcal — OWNER-ONLY MINIGAME CALIBRATION (AG-ALL-2d2; owner OD 17/11 ~16:20Z (f) + ~16:40Z option 1, verbatim key words:
   "cần cho tôi một cái bài test để tôi chơi thử ... mỗi một cái mini game ... 3 vòng hoặc là 5 vòng ... mỗi một vòng là mỗi cái khó hơn ... chỉ có cái tài
   khoản của tôi là mới test kiểu này thôi ... bất kỳ người nào chơi thì người đó cũng sẽ đi chơi theo cái con số của tôi" / "chỉ có tôi test và cái số
   của tôi dùng chung cho mọi người").
   WHAT: one test per mini-game kind (KG82_KIND with an engine): BAL.ag.mg2.cal.d.length rounds (5), board gap d rising (Dễ → Khó), the same kit game
   frame / rows / buttons the exam uses (jexam exRun pattern: kg82Open + kg82Rows + kg82Btn + kg82ShowRes + kg82Play). Nothing else is drawn here.
   HER BASE per kind  b = mean over rounds of (raw_i − (mgMedD(d_i) − mgMedD(0)))  = her graded play brought back to a MATCHING board (the same board
   shift the NPC side uses), clamped 0..10 — mgCalBase(raws, ds).
   NPC HAND BAND per kind (jmgt mgHand reads mgCalBand): hi = min(cal.max, b + w/2 + cal.up), lo = max(cal.min, b + w/2 − cal.dn) — an NPC's average
   play is (hand − w/2), so the best hands play about cal.up above her (rare: skew), the clumsy ones cal.dn below her, the middle hand clearly below.
   No calibration for a kind yet → the BAL default band (BAL.ag.mg2.hand lo / hi, interim mg-bots).
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
function C(){return (BAL.ag&&BAL.ag.mg2&&BAL.ag.mg2.cal)||{on:0,d:[0],up:1,dn:4,min:1,max:9.5,k:{}}}
/* her base on a matching board from the rounds she played (raws[i] at gap ds[i]) */
function mgCalBase(raws,ds){const n=Math.min(raws.length,ds.length);if(!n)return null;let s=0;for(let i=0;i<n;i++)s+=(+raws[i]||0)-(mgMedD(ds[i])-mgMedD(0));
 return Math.round(cl(s/n,0,10)*10)/10}
/* the NPC hand band of a kind: {lo, hi, sig} (sig changes when the band changes, so a cached hand is re-rolled from the same hash) */
function mgCalBand(kind){const H=BAL.ag.mg2.hand,c=C(),e=c.on&&c.k&&c.k[kind];
 if(!e||!isFinite(+e.b))return{lo:H.lo,hi:H.hi,sig:H.lo+"/"+H.hi};
 const w2=H.w/2;let hi=Math.min(c.max!=null?c.max:H.hi,+e.b+w2+c.up),lo=Math.max(c.min,+e.b+w2-c.dn);if(lo>hi-.5)lo=Math.max(0,hi-.5);
 lo=Math.round(lo*100)/100;hi=Math.round(hi*100)/100;return{lo,hi,sig:lo+"/"+hi}}
/* the kinds she can test: every KG82 kind whose engine is in the game */
function mgCalKinds(){try{return Object.keys(KG82_KIND).filter(k=>{const K=KG82_KIND[k];return K&&K.n&&typeof KG82_ENG!=="undefined"&&typeof KG82_ENG[K.e]==="function"})}catch(e){return[]}}
function rec(){try{return JSON.parse(LS.get(KEY)||"{}")||{}}catch(e){return{}}}
function recSet(kind,raws,ds){const r=rec();r[kind]={raws,ds,b:mgCalBase(raws,ds),t:Date.now()};LS.set(KEY,JSON.stringify(r));return r[kind]}
function mmdd(t){const d=new Date(t||Date.now()),p=n=>String(n).padStart(2,"0");return `${p(d.getMonth()+1)}/${p(d.getDate())}/${d.getFullYear()}`}
/* the code line for the coordinator: CTM-CAL kind:b/rounds@mm/dd/yyyy … */
function mgCalCode(r){r=r||rec();return "CTM-CAL "+Object.keys(r).filter(k=>r[k]&&r[k].b!=null).map(k=>`${k}:${r[k].b}/${(r[k].raws||[]).length}@${mmdd(r[k].t)}`).join(" ")}
function nm(k){const K=KG82_KIND[k];return K&&K.n||k}
function stat(k){const L=rec()[k],c=C().k||{};const a=L?`đã thử, tay ${mgWord(L.b)}`:"chưa thử";return c[k]?`${a} · đã ghi vào sổ chung`:a}
/* ---- the test (kit game frame only) ---- */
function pick(){const ks=mgCalKinds();if(typeof kg82Open!=="function")return;
 const d=kg82Open({art:"Thử tay",title:"Tài nghệ các môn",how:`Mỗi môn ${C().d.length} hồi, hồi sau khó hơn hồi trước. Phần của người thành mức chuẩn cho tay nghề của mọi người trong cung.`,round:"Môn",roundV:`${ks.length}`});
 if(!d)return;const box=kg82Box();const r=rec();
 const dn=ks.filter(k=>r[k]),nd=ks.filter(k=>!r[k]);/* s34 MUST: one kind at a time, any order; đã thử / chưa thử in kit rows */
 box.innerHTML=`<h4 class="kpst">Đã thử ${dn.length}/${ks.length} môn</h4>`+kg82Rows([["Đã thử",dn.length?dn.map(k=>`${nm(k)} (${mgWord(r[k].b)})`).join(", "):"chưa môn nào","t"],["Chưa thử",nd.length?nd.map(nm).join(", "):"đã thử đủ","n"]])+/* owner 17/11 ~17:10Z: ONE run through every kind in order (Thử lần lượt), progress kept; resumes at the next kind not yet done */
  `<div class="kg82act"><button class="${kg82Btn()}" id="mgcal-seq">${nd.length?(dn.length?`Thử tiếp các môn còn lại<small>từ môn ${nm(nd[0])} · còn ${nd.length} môn</small>`:`Thử hết cả ${ks.length} môn<small>dừng lúc nào cũng được, lần sau thử tiếp</small>`):`Thử lại hết từ đầu<small>đã thử đủ ${ks.length} môn</small>`}</button></div>`+
  `<h4 class="kpst">Hoặc chọn một môn</h4>`+
  `<div class="kg82act">${ks.map(k=>`<button class="${kg82Btn(!!r[k])}" data-mgcal-k="${k}">${nm(k)}<small>${stat(k)}</small></button>`).join("")}</div>`+
  (Object.keys(r).length?`<h4 class="kpst">Mã kết quả</h4>`+kg82Rows([["Mã",mgCalCode(r),"n"]])+`<div class="kg82act"><button class="${kg82Btn(true)}" id="mgcal-copy">Chép mã</button></div>`:"")+
  `<div class="kg82act"><button class="${kg82Btn(true)}" id="mgcal-x">Thôi</button></div>`;
 box.querySelectorAll("[data-mgcal-k]").forEach(b=>b.onclick=()=>run(b.dataset.mgcalK));
 const sq=$("mgcal-seq");if(sq)sq.onclick=()=>run(nd.length?nd[0]:ks[0],nd.length?"seq":"all");
 const x=$("mgcal-x");if(x)x.onclick=()=>kg82Close();const cp=$("mgcal-copy");if(cp)cp.onclick=()=>copy(cp)}
function copy(b){const t=mgCalCode();const ok=()=>{b.textContent="Đã chép"};try{navigator.clipboard.writeText(t).then(ok,()=>{})}catch(e){}}
/* the next kind of a run: "seq" = the next kind not yet done (resume), "all" = the next kind in order (a full redo) */
function nextOf(kind,seq){const ks=mgCalKinds(),r=rec(),i=ks.indexOf(kind);const L=ks.slice(i+1);return seq==="all"?L[0]||null:L.find(k=>!r[k])||ks.find(k=>!r[k])||null}
function run(kind,seq){const K=KG82_KIND[kind],ds=C().d.slice(),n=ds.length,raws=[];let i=0;KG82.ctx="hoc";
 const round=()=>{const t=mgSet(kind,{occ:"hoc",lv:0,d:ds[i]});try{kg82Preload(kind)}catch(e){}
  const d=kg82Open({art:"Thử tay",title:`${K.n} · hồi ${i+1}/${n}`,how:K.how,round:"Hồi",roundV:`${i+1}/${n}`,pic:kg82Pic(kind)});if(!d)return;
  const box=kg82Box();box.innerHTML=`<h4 class="kpst">Thử tay · ${K.n}</h4>`+kg82Rows([["Môn",`${K.n} · ${K.t}`,"t"],["Hồi",`${i+1}/${n}`,"t"],["Độ khó",mgDiffTxt(t,kind),"n"]])+
   `<div class="kg82act"><button class="${kg82Btn()}" id="kg82go">Bắt đầu</button></div>`;
  $("kg82go").onclick=()=>kg82Play(kind,raw=>after(raw))};
 const after=raw=>{raws.push(raw);i++;const last=i>=n;
  kg82ShowRes(kg82Rows([[`Hồi ${i}`,`${raw}/10 · ${kg82Word(raw)}`,"t"]])+`<div class="kg82act"><button class="${kg82Btn()}" id="kg82ok">${last?"Xem mức tay":"Hồi kế tiếp"}</button></div>`,raw>=5);
  kg82Set("score",`${raw}/10`);$("kg82ok").onclick=()=>{if(last)done();else round()}};
 const done=()=>{const L=recSet(kind,raws,ds);const nx=seq?nextOf(kind,seq):null;
  kg82Open({art:"Thử tay",title:`Mức tay · ${K.n}`,how:"Mức này thành chuẩn tay nghề của mọi người trong cung khi được ghi vào sổ chung.",round:"Hồi",roundV:`${n}/${n}`,pic:kg82Pic(kind)});
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
Object.assign(window,{mgCalBase,mgCalBand,mgCalKinds,mgCalCode,mgCalOwner,mgCalOpen:pick,mgCalRun:run});
}catch(e){console.error(e)}})();
