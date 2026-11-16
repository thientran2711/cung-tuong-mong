/* ================= j52: PHÚC DUYÊN + THÂN PHẬN ĐỊNH SẴN (owner 11/14) =================
   The next life is rolled ONCE and kept in localStorage "ctm-nextlife" (global, not per slot): a seed that drives
   Math.random for the whole of start() (faces drawn from a second stream of the same seed, so late-loading art does not
   shift the rolls), plus a snapshot of the faces the first showing picked. Every way into a new life (any slot,
   "Kiếp mới", "Chuyển kiếp", a reload mid-creation) realises that same roll; a fresh roll is made only when the player
   presses "Nhận thân phận". Until then nothing is saved to the slot. "Đổi thân phận" costs PD_COST Phúc duyên and
   stores a new roll the same way.
   Phúc duyên ("ctm-phucduyen") is earned by milestones and survives death; it buys rerolls only, no power in a life. */
const NL_KEY="ctm-nextlife",PD_KEY="ctm-phucduyen",PD_COST=100;
/* measured (sensible bot, 41 lives): median ~82, mean ~98, quartiles ~37/152; random bot ~7. Festivals pay once per year
   (uncapped they were ~6 a year and doubled the total). */
const PD_V={promo:5,kid:5,year:3,fest:2,tg:8,hh:25,tz:15};
const PD_END={"Hoàng thái hậu":40,"Mẫu hậu Hoàng thái hậu":30,"Thái phi":15};
const PD_GOOD=["Xuất giá","Được ban hôn","Vào vương phủ","Thành thân","Ma ma","Xuất cung","Được Vương gia che chở","Xuất gia"];
function pdGet(){try{const v=Math.floor(+localStorage.getItem(PD_KEY));return isFinite(v)&&v>0?v:0}catch(e){return 0}}
function pdSet(n){try{localStorage.setItem(PD_KEY,String(Math.max(0,Math.floor(n))))}catch(e){}}
function nlSeed(){try{const a=new Uint32Array(1);crypto.getRandomValues(a);if(a[0])return a[0]}catch(e){}return (Math.floor(Math.random()*4294967295)>>>0)||1}
function nlNew(){const d={seed:nlSeed(),at:Date.now()};store.set(NL_KEY,d);return d}
function nlGet(){const d=store.get(NL_KEY);return d&&typeof d.seed==="number"&&d.seed>0?d:nlNew()}
function nlRng(a){a=a>>>0;return function(){a=(a+0x6D2B79F5)|0;let t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296}}
let NLP=null,NLR=null;
/* face pickers use their own stream while a life is being rolled */
(function(){const wrap=f=>function(){if(!NLR)return f.apply(this,arguments);const pr=Math.random;Math.random=NLR.face;try{return f.apply(this,arguments)}finally{Math.random=pr}};
 if(typeof drawF==="function")drawF=wrap(drawF);if(typeof figPick==="function")figPick=wrap(figPick);if(typeof faceFor==="function")faceFor=wrap(faceFor)})();
/* nothing is written to a slot while the identity card is open */
(function(){const s0=save;save=function(){if(NLP)return;return s0.apply(this,arguments)}})();
const NL_FK=["fc","fk","fid","face","hue","fv"];
function nlHolders(){if(!S)return[];const H=[S,S.maid,S.emp,S.thO];const C=S.court||{};Object.keys(C).sort().forEach(k=>H.push(C[k]));(rivals||[]).forEach(v=>H.push(v));
 try{if(typeof allServ==="function")allServ().forEach(x=>H.push(x))}catch(e){}(S.men||[]).forEach(m=>H.push(m));(S.kids||[]).forEach(k=>H.push(k));(rivals||[]).forEach(v=>(v.kids||[]).forEach(k=>H.push(k)));
 return H.map(o=>o&&typeof o==="object"?o:null)}
/* first showing records the faces; later showings put the same faces back (missing ones are filled in as they appear) */
function nlFaces(d){const H=nlHolders();let ch=false;const F=d.faces=d.faces||{h:[]};
 H.forEach((o,i)=>{if(!o)return;const r=F.h[i]=F.h[i]||{};NL_FK.forEach(k=>{if(k in r)o[k]=r[k];else if(o[k]!==undefined&&o[k]!==null&&o[k]!==""){r[k]=o[k];ch=true}})});
 for(const k of ["fseen","fidUsed","usedFaces","thF"]){if(F[k]!==undefined)S[k]=Array.isArray(F[k])?F[k].slice():F[k];else if(S[k]!==undefined){F[k]=Array.isArray(S[k])?S[k].slice():S[k];ch=true}}
 if(ch&&NLP&&NLP.seed===d.seed)store.set(NL_KEY,d)}
const _start52=start;
function nlRun(d){const mr=Math.random;NLR={face:nlRng((d.seed^0x5bd1e995)>>>0)};Math.random=nlRng(d.seed);rid=0;try{if(typeof sidN!=="undefined")sidN=0}catch(e){}
 try{_start52()}finally{Math.random=mr;NLR=null}}
function nlFigsReady(){try{return typeof FIGSIG==="undefined"||FIGSIG!==""}catch(e){return true}}
function nlBegin(){const go=()=>{const d=nlGet();NLP={seed:d.seed};nlRun(d);if(d.re)S.nlRe=d.re;nlFaces(d);nlCard()};
 if(nlFigsReady())return go();let n=0;const t=setInterval(()=>{if(nlFigsReady()||++n>=25){clearInterval(t);go()}},100)}
start=function(){if(window.__nlInner)return _start52.apply(this,arguments);return nlBegin()};
function nlStat(l,v){return [l,v,"t"]}/* KIT §51: a kit table row */
function nlCardHTML(){const o=S.origin,pts=pdGet(),ok=pts>=PD_COST,srv=typeof isSrv==="function"&&isSrv();
 const pos=srv?"Cung nữ":o.k==="cnv"?"Cung nữ":RANKS[S.rank].n;
 return `<p><b>${S.name}</b>, ${S.age} tuổi, ${o.n}. ${o.t}</p>
 ${kitRows([nlStat("Xuất thân",o.n),nlStat("Vào cung",pos),nlStat("Tuổi",S.age),nlStat("Tài",S.tai),nlStat("Sắc",S.sac),nlStat("Tâm cơ",S.tamco),nlStat("Đức",S.duc),nlStat("Danh",S.danh),nlStat("Thái hậu ưa",S.th),nlStat("Bạc",S.bac),nlStat("Hoàng thượng",`${S.emp.era}, ${S.emp.age} tuổi${S.ps?", mới đăng cơ":""}`)])}
 <p class="past">Thân phận này đã định sẵn: tải lại trang, chọn ô khác hay bấm Kiếp mới vẫn ra đúng thân phận này. Phúc duyên đang có: <b>${pts}</b>.</p>
 <div class="opts nlopts"><button class="opt" data-nl="ok">Nhận thân phận<small>tốn: không · thành: bắt đầu kiếp này</small></button>
 <button class="opt" data-nl="re" ${ok?"":"disabled"}>Đổi thân phận (−${PD_COST} Phúc duyên)${ok?`<small>tốn: Phúc duyên -${PD_COST} · thành: thân phận mới (cũng định sẵn)</small>`:`<small data-kp="1">Cần ${PD_COST} Phúc duyên, đang có ${pts}</small>`}</button></div>`}
function nlCard(){Q=Q.filter(m=>!m.nl);Q.unshift({nl:1,t:"Thân phận kiếp này",cls:"nlcard",faces:[[pMe(),S.name]],h:nlCardHTML(),opts:[],onClose:()=>nlAccept(true)});showModal();
 try{const d=store.get(NL_KEY);if(d&&NLP&&d.seed===NLP.seed)nlFaces(d)}catch(e){}}
function nlAccept(viaClose){if(!NLP)return;try{const d=store.get(NL_KEY);if(d&&d.seed===NLP.seed)nlFaces(d)}catch(e){}
 NLP=null;nlNew();S.pdw=pdBase();S.pdLife=0;if(S.nlRe)log(`Đã đổi thân phận ${S.nlRe} lần (−${S.nlRe*PD_COST} Phúc duyên).`);
 if(!viaClose){Q=Q.filter(m=>!m.nl);showModal();render()}}
function nlReroll(){if(!NLP)return;const pts=pdGet();if(pts<PD_COST)return;const re=(S&&S.nlRe||0)+1;pdSet(pts-PD_COST);const d={seed:nlSeed(),at:Date.now(),re};store.set(NL_KEY,d);NLP={seed:d.seed};nlRun(d);S.nlRe=re;nlFaces(d);nlCard()}
$("modal").addEventListener("click",e=>{const b=e.target.closest("button[data-nl]");if(!b||b.disabled)return;e.stopPropagation();if(b.dataset.nl==="ok")nlAccept(false);else if(b.dataset.nl==="re")nlReroll()});

/* ---------- earning ---------- */
function pdLv(){return (typeof isSrv==="function"&&isSrv())?-1:S.rank}
function pdBase(){return{lv:pdLv(),kids:(S.kids||[]).length,year:S.year,fest:S.festDone||"",tz:[]}}
function pdAdd(n,why,k){if(k){S.pdN=S.pdN||{};S.pdN[k]=(S.pdN[k]||0)+1}if(!n)return;pdSet(pdGet()+n);S.pdLife=(S.pdLife||0)+n;log(`<span class="pdl">+${n} Phúc duyên: ${why}.</span>`)}
function pdCheck(){if(!S||S.dead||NLP)return;const w=S.pdw;if(!w||typeof w!=="object"){S.pdw=pdBase();return}w.tz=w.tz||[];
 const lv=pdLv();while(lv>w.lv){w.lv++;if(w.lv>=7)pdAdd(PD_V.hh,"lên ngôi Hoàng hậu","hh");else if(w.lv>=0)pdAdd(PD_V.promo,`thăng ${RANKS[w.lv].n}`,"promo")}
 const nk=(S.kids||[]).length;if(nk>w.kids){for(let i=w.kids;i<nk;i++){const k=S.kids[i];pdAdd(PD_V.kid,`sinh ${k&&k.name?k.name:"một đứa con"}`,"kid")}}w.kids=nk;
 while(S.year>w.year){w.year++;pdAdd(PD_V.year,`tròn năm thứ ${w.year-1} trong cung`,"year")}
 const fd=S.festDone||"";if(fd&&fd!==w.fest){w.fest=fd;if(w.festY!==S.year){w.festY=S.year;const f=typeof FEST!=="undefined"&&FEST[fd.split("-").slice(1).join("-")];pdAdd(PD_V.fest,`dự ${f&&f.name?f.name:"lễ hội"} (lễ hội đầu tiên trong năm)`,"fest")}}
 const h=S.heir;if(h&&h.k&&!h.v&&h.k.alive!==false&&!w.tz.includes(h.k.name)){w.tz.push(h.k.name);pdAdd(PD_V.tz,`${h.k.name} được lập làm Thái tử`,"tz")}}
(function(){const r0=render;render=function(){try{pdCheck()}catch(e){}return r0.apply(this,arguments)}})();
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{pdCheck()}catch(e){}return r}})();
if(typeof contestEnd==="function")(function(){const c0=contestEnd;contestEnd=function(){const r=c0.apply(this,arguments);try{if(S&&!S.dead&&!NLP&&/xong: Ngươi/.test(String(r||"")))pdAdd(PD_V.tg,"thắng Tranh ghế","tg")}catch(e){}return r}})();
/* ending bonus and the end-card line */
(function(){const o0=over;over=function(h,t,fate){if(!S||S.dead)return o0.apply(this,arguments);try{pdCheck()}catch(e){}
 const r=o0.apply(this,arguments);
 try{const m=Q[0];if(m&&m.cls==="end"&&!m.pd){m.pd=1;const hh=((m.h.match(/<h3>([\s\S]*?)<\/h3>/)||[])[1]||h||"").replace(/<[^>]+>/g,"").trim();
  const b=PD_END[hh]!=null?PD_END[hh]:PD_GOOD.includes(hh)?10:5;pdSet(pdGet()+b);S.pdLife=(S.pdLife||0)+b;log(`<span class="pdl">+${b} Phúc duyên: kết cục ${hh}.</span>`);
  const line=`<p class="pdend">Kiếp này được <b class="g">+${S.pdLife} Phúc duyên</b> (kết cục ${hh}: +${b}) · Tổng: <b>${pdGet()}</b>. Đổi thân phận kiếp sau cần ${PD_COST}.</p>`;
  m.h=m.h.replace(/<p class="past">Chết là hết\.[^<]*<\/p>/,`<p class="past">Chết là hết. Kiếp sau bắt đầu lại từ đầu; chỉ còn tên trong Sổ luân hồi và Phúc duyên để đổi thân phận.</p>`)+line;
  if(!$("modal").hidden||Q[0]===m)showModal()}}catch(e){console.error(e)}
 return r}})();
/* title: the balance under the slots */
function pdTitle(){try{const s=$("slots");let w=$("pdwrap");if(!w){w=document.createElement("div");w.id="pdwrap";s.parentNode.insertBefore(w,s.nextSibling)}
 const p=pdGet();w.innerHTML=`<div class="pdbox"><b>Phúc duyên: ${p}</b><span class="past">${p>=PD_COST?`Đủ ${PD_COST} để đổi thân phận kiếp tới một lần.`:`Đổi thân phận kiếp tới cần ${PD_COST}, còn thiếu ${PD_COST-p}.`} Thân phận kiếp tới đã định sẵn; lên phẩm, sinh con, sống tròn năm, dự lễ hội (mỗi năm một lần) đều thêm Phúc duyên.</span></div>`}catch(e){}}
(function(){const t0=showTitle;showTitle=function(){const r=t0.apply(this,arguments);pdTitle();return r}})();
if(!$("title").hidden)pdTitle();
(function(){const st=document.createElement("style");st.textContent=`.pdbox{margin:8px 0 2px;padding:7px 10px;border:1px solid var(--line,#c9a46a);border-radius:8px;background:rgba(255,250,240,.7);text-align:left;font-size:.84rem;line-height:1.35}.pdbox b{display:block;color:#8a5a12}.pdbox .past{display:block;font-size:.76rem;white-space:normal}
.pdl{font-size:.82em;color:#8a5a12}.pdend{margin:8px 0 0;font-size:.9rem}.nlcard .nlopts .opt{white-space:normal}.nlcard .pcb.rows{margin:6px 0}`;document.head.appendChild(st)})();
/* a page that loaded straight into an old save: give it a baseline (no back pay) */
try{if(S&&!S.pdw&&!S.dead)S.pdw=pdBase()}catch(e){}
/* the collapsible status bar redraws on any click; before the first life there is no S to draw (title-screen click error) */
if(typeof renderHud2==="function")(function(){const h0=renderHud2;renderHud2=function(){if(!S)return;return h0.apply(this,arguments)}})();
/* the balance beside Sổ luân hồi in the Nhật ký tab */
if(typeof pastHTML==="function")(function(){const p0=pastHTML;pastHTML=function(){const h=p0.apply(this,arguments);try{return h+`<p class="past pdpast">Phúc duyên: <b>${pdGet()}</b>${S&&!S.dead?` · kiếp này đã được +${S.pdLife||0}`:""} · đổi thân phận kiếp tới cần ${PD_COST}.</p>`}catch(e){return h}}})();
