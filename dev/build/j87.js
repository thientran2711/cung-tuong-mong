
/* ================= WEEK REPORT FLIP-BOOK (j87) — KIT component kitBook({pages,onClose}) =================
   The week summary (dawn) is an old ledger she turns page by page: cover → Tổng lược → one page per person
   (large kit portrait) → Triều đình · thiên hạ → closing page "Tuần này đến đây là hết." with a seal.
   Two-page spread on landscape tablets, one page at a time on portrait screens. Pages never scroll: content that
   does not fit continues on the next page ("tiếp theo"). Drag/swipe turns the page with a paper CURL (kitCurl, jbook: bending strips, shaded faces, moving cast
   shadow), tap the page edges, the ‹ › buttons or the arrow keys; prefers-reduced-motion = cross-fade.
   Art: img/book-cover.webp, img/book-left.webp, img/book-right.webp, img/book-end.webp when present, else CSS paper.
   Data only, never markup:
     kitBook({pages:[
       {kind:"cover", title:"Sổ tuần", sub:"Tháng tư · thượng tuần · năm thứ nhất", note:"Hạ · nắng gắt"},
       {kind:"text",  title:"Tổng lược", blocks:[{h:"Quẻ tuần"},{rows:[["Quẻ","Thượng · Cát","t"]]},{chips:[["Sủng",3]]},{facts:[...]}, "html"]},
       {kind:"person",who:v, chips:[["Thiện cảm",5]], rows:[["Hiện nay",[...]]], blocks:[{facts:[...]}]},
       {kind:"end",   title:"Tuần này đến đây là hết.", seal:["HẾT","TUẦN"], note:"Sổ ghi 12 việc, 4 người.", btn:"Vào ngày mới"}],
       head:"Sổ tuần · Tháng tư · thượng tuần", host:element, onClose:fn})  → {next, prev, go, close}
*/
const KBK_ART={cover:"img/book-cover.webp",left:"img/book-left.webp",right:"img/book-right.webp",end:"img/book-end.webp",title:"img/title-tuanluc-d4s.webp"};
/* KBK_TITLE_IMG: the cover label's written title as a picture (owner 11/15: vertical brush title d4 + the game's Trân nữ seal, KIT §27.1). A cover page whose
   title has a picture here draws it in the label (art cover only); any other title keeps the text. */
const KBK_FIG_COL=.36;   /* figure column ≤ 36 % of the page (KIT T3) */
const KBK_TITLE_IMG={"Tuần lục":KBK_ART.title};
const KBK_HAVE={};
/* lag-play (owner 16/11 15:05Z): ONE coalesced book re-layout. Every picture that arrived (book art, each figure's size/head measure)
   re-paginated every open book at once — 1-20 s per picture on a slow phone while a new life's figures stream in. */
function kitBookRelayoutSoon(ms){clearTimeout(kitBookRelayoutSoon.t);kitBookRelayoutSoon.t=setTimeout(()=>document.querySelectorAll(".kbk").forEach(r=>{try{r.__kbk&&r.__kbk.relayout()}catch(e){}}),ms==null?120:ms)}
window.kitBookRelayoutSoon=kitBookRelayoutSoon;
(function(){for(const [k,u] of Object.entries(KBK_ART)){try{const im=new Image();im.onload=()=>{KBK_HAVE[k]=true;document.querySelectorAll(".kbk").forEach(r=>{r.classList.add("art-"+k)});kitBookRelayoutSoon()};im.src=u}catch(e){}}})();

function kbkSfx(){try{if(typeof auOk!=="function"||!auOk())return;const C=window.__bellCtx||(window.__bellCtx=new (window.AudioContext||window.webkitAudioContext)());const t=C.currentTime,n=Math.floor(C.sampleRate*.28);
 const buf=C.createBuffer(1,n,C.sampleRate),d=buf.getChannelData(0);for(let i=0;i<n;i++){const e=i/n;d[i]=(Math.random()*2-1)*Math.pow(1-e,2)*(e<.08?e/.08:1)}
 const s=C.createBufferSource();s.buffer=buf;const f=C.createBiquadFilter();f.type="bandpass";f.frequency.value=2400;f.Q.value=.7;const g=C.createGain();g.gain.value=.09*((typeof OPT!=="undefined"&&OPT.sfx!=null)?OPT.sfx:1);
 s.connect(f).connect(g).connect(C.destination);s.start(t)}catch(e){}}

/* one block → HTML. string | {h} | {facts} | {rows} | {chips} | {html} ; facts expand into one block per fact so pages can split */
function kbkExpand(blocks,skip){const out=[];for(const b of (blocks||[])){if(!b)continue;if(typeof b==="string"){out.push({html:b});continue}
  if(b.h){out.push({html:`<h4 class="kpst kbk-h">${b.h}</h4>`,head:true,sec:b.sec||null});continue}
  if(b.facts){const prev=window.__kpSkip;window.__kpSkip=skip||prev;try{for(const f of b.facts){const h=kitFacts([f],{group:false});
    out.push({html:f&&f.art?`<div class="kbk-ev">${h}<img class="kbk-evart" src="${f.art}" alt="${f.artT||""}" title="${f.artT||""}" decoding="sync" onerror="this.remove()"></div>`:h})}}finally{window.__kpSkip=prev}continue}
  if(b.rows){out.push({html:kitRows(b.rows)});continue}
  if(b.chips){out.push({html:b.chips.length?kitChips(b.chips):`<span class="kchips"><span class="kchip n">${b.none||"Không đổi gì"}</span></span>`});continue}
  if(b.html)out.push({html:b.html,head:!!b.head,sec:b.sec||null})}
 return out}

function kitBook(spec){spec=spec||{};const rm=()=>{try{return reducedMotion()}catch(e){return false}};
 const root=document.createElement("div");root.className="kbk";root.setAttribute("role","dialog");root.setAttribute("aria-label",spec.label||"Tuần lục");
 for(const k of Object.keys(KBK_ART))if(KBK_HAVE[k])root.classList.add("art-"+k);
 root.innerHTML=`<div class="kbk-stage"><div class="kbk-book"></div></div><div class="kbk-bar"><button class="kbk-nav kbk-prev" aria-label="Trang trước">‹</button><span class="kbk-no" aria-live="polite"></span><button class="kbk-nav kbk-next" aria-label="Trang sau">›</button></div><button type="button" class="kit-x kbk-x" aria-label="${spec.closeLabel||"Đóng"}" title="${spec.closeLabel||"Đóng"}">✕</button><div class="kbk-measure" aria-hidden="true"></div>`;
 (spec.host||document.body).appendChild(root);
 const book=root.querySelector(".kbk-book"),stage=root.querySelector(".kbk-stage"),meas=root.querySelector(".kbk-measure"),noEl=root.querySelector(".kbk-no");
 let mode="single",PW=0,PH=0,leaves=[],sheets=[],cur=0,maxCur=0,busy=false,closed=false,logical=0,logicalB=null,lastKey="";

 /* ---- page shells ---- */
 const head=spec.head||"";
 const shell=(cls,inner,folio)=>`<div class="kbk-pg ${cls}"><div class="kbk-in">${head&&!/k-cover|k-blank|k-back/.test(cls)?`<div class="kbk-rh">${head}</div>`:""}<div class="kbk-body">${inner}</div>${folio?`<div class="kbk-fo">${folio}</div>`:""}</div></div>`;
 const coverH=p=>`<div class="kbk-cv"><div class="kbk-stitch"></div><div class="kbk-label">${(()=>{const t=String(p.title||"Tuần lục"),im=p.titleImg||KBK_TITLE_IMG[t];return (im?`<img class="kbk-ltimg" src="${im}" alt="${t}" draggable="false">`:"")+`<b class="kbk-lt${im?" has-img":""}">${t.split(" ").map(w=>`<span>${w}</span>`).join(" ")}</b>`})()}</div><div class="kbk-cmeta">${p.sub?`<span class="kbk-ls">${p.sub}</span>`:""}${p.note?`<span class="kbk-cn">${p.note}</span>`:""}</div><b class="kbk-cseal">${p.seal||"TUẦN"}</b><span class="kbk-hint">${p.hint||"Vuốt trang hoặc chạm mép phải để lật"}</span></div>`;
 const endH=p=>`<div class="kbk-end"><span class="kbk-orn"></span><h3 class="kbk-et">${p.title||"Tuần này đến đây là hết."}</h3><b class="kbk-seal" aria-label="${(p.seal||["HẾT","TUẦN"]).join(" ")}">${(p.seal||["HẾT","TUẦN"]).map(s=>`<i>${s}</i>`).join("")}</b>${p.note?`<p class="kbk-en">${p.note}</p>`:""}<button class="kbtn kbk-go" id="${p.btnId||"kbk-go"}">${p.btn||"Đã hiểu"}</button></div>`;
 const blankH=()=>`<div class="kbk-blank"><span class="kbk-orn"></span></div>`;
 const textTop=(p,cont)=>`<div class="kbk-th"><h3 class="kbk-t">${p.title||""}${cont?` <small class="kbk-cont">tiếp theo</small>`:""}</h3>${p.sub&&!cont?`<small class="kbk-ts">${p.sub}</small>`:""}</div>`;
 /* KIT §27 person pages (owner 11/15 04:30Z + 04:35Z): EVERY page about a person — continuation pages too — is the same page: the full-body
    figure fills the page body on the left (same scale on every page), the text column on the right; "(tiếp theo)" on the title, no small portrait */
 const personTop=(p,cont)=>p.kind!=="person"?textTop(p,cont):cont?`<div class="kbk-pname">${kitName(p.who,{cap:true,named:p.who===S})} <small class="kbk-cont">(tiếp theo)</small></div>`
   :`<div class="kbk-pname">${kitName(p.who,{cap:true,named:p.who===S})}${p.sub?`<small class="kbk-ts">${p.sub}</small>`:""}</div>${p.rel&&p.rel.length&&PW>=440?kitRelTable(p.rel,{paper:true}):""}`;
 const personBody=(p,cont)=>{const fw=p.kind==="person"?p.who:p.fig;let fig=typeof kitStageFig==="function"&&fw&&kitStageFig(fw,{cap:false})||"";
  /* owner 17:45Z: every page has its subject's full-length figure; no painting (yet) or the figure list still loading → the kit silhouette */
  if(!fig&&fw&&typeof kitStageFig==="function"){const sx=kitSilG(fw);fig=kitStageFig(fw,{cap:false,src:(typeof KIT_DIR==="string"?KIT_DIR:"img/kit/")+`unknown-fig-${sx}.webp`})||""}const kfr=(/--kfr:([\d.]+)/.exec(fig)||[])[1]||"1";
  return `<div class="kbk-person${fig?" kbk-full":""}" style="--kfr:${kfr}${typeof kitBookFigCol==="function"?kitBookFigCol(fig,PW,PH):""}"><div class="kbk-por">${fig||(fw?pframe(kitFace(fw)):"")}</div><div class="kbk-phead">${personTop(p,!!cont)}</div><div class="kbk-flow"></div></div>`};

 /* ---- pagination: fill each page until it overflows, continue on the next ---- */
 function paginate(){const L=[];meas.style.width=PW+"px";meas.style.height=PH+"px";
  for(const p of (spec.pages||[])){
   if(p.kind==="cover"){L.push({cls:"k-cover",html:coverH(p),kind:"cover"});continue}
   if(p.kind==="end"){L.push({cls:"k-end",html:endH(p),kind:"end",folio:true});continue}
   const isP=p.kind==="person"&&p.who||p.kind==="text"&&p.fig;const blocks=kbkExpand(p.blocks,p.kind==="person"?p.who:null);let i=0,first=true;
   if(isP&&PW<440&&p.rel&&p.rel.length)blocks.unshift({html:kitRelTable(p.rel,{paper:true})});
   /* a continuation page of a flowing text page is titled by the section it continues (owner 17:00Z: short sections share pages) */
   const secAt=k=>{for(let q=k-1;q>=0;q--)if(blocks[q]&&blocks[q].sec)return blocks[q].sec;return null};
   do{const b0=i;const tp=first?p:{title:blocks[i]&&blocks[i].sec?p.title:(secAt(i)||p.title)};meas.innerHTML=shell(isP?"k-person r":"k-text r",isP?personBody(p,!first):`${textTop(tp,!first)}<div class="kbk-flow"></div>`,"0");
    const flow=meas.querySelector(".kbk-flow");const over=()=>flow.scrollHeight>flow.clientHeight+1;let n=0;
    while(i<blocks.length){flow.insertAdjacentHTML("beforeend",blocks[i].html);if(over()&&n>0){flow.lastElementChild.remove();break}i++;n++}
    while(n>1&&i<blocks.length&&blocks[i-1]&&blocks[i-1].head){flow.lastElementChild.remove();i--;n--}
    /* one entry taller than a whole page: never clipped — that page's text column scrolls inside the page */
    const big=over();L.push({cls:(isP?"k-person":"k-text")+(big?" k-scroll":""),html:meas.querySelector(".kbk-body").innerHTML,kind:p.kind,folio:true,src:p,b0});first=false}while(i<blocks.length);
  }
  meas.innerHTML="";return L}

 /* ---- layout: spread on landscape tablets, single page otherwise ---- */
 function layout(keep,keepB){const W=root.clientWidth||innerWidth,H=root.clientHeight||innerHeight;const bar=root.querySelector(".kbk-bar").offsetHeight||48;
  const aw=W-(W<600?20:40),ah=H-bar-(H<700?18:30);const spread=W>=900&&W/H>=1.15;mode=spread?"spread":"single";
  if(spread){PH=Math.min(ah,Math.floor(aw/2/.7));PW=Math.min(Math.floor(aw/2),Math.floor(PH*.76))}
  else{const sp=W<600?8:12;PW=Math.min(aw-sp,Math.floor(ah*.74));PH=Math.min(ah,Math.floor(PW/.5));PW=Math.floor(PW)}
  root.classList.toggle("spread",spread);root.classList.toggle("single",!spread);root.classList.toggle("narrow",PW<440);
  root.style.setProperty("--pw",PW+"px");root.style.setProperty("--ph",PH+"px");root.style.setProperty("--fs",Math.max(13,Math.min(17,PW/34)).toFixed(2)+"px");
  root.style.setProperty("--por",Math.round(Math.min(PW*(PW<440?.42:.4),PH*.62*480/1037))+"px");
  /* full-page figure column (owner 17/11 03:12Z, KIT 56.3): NARROW, against the page's left edge: KBK_FIG_COL of the inner page width (.kbk-in = 89 % of the page); the figure is fitted into it, the text frame gets the rest */
  root.style.setProperty("--porf",Math.round(PW*.89*KBK_FIG_COL)+"px");
  leaves=paginate();
  /* page numbers (cover has none) */
  let no=0;leaves.forEach(l=>{if(l.kind!=="cover")l.no=++no});
  /* sheets */
  sheets=[];if(spread){const P=leaves.slice();const endI=P.findIndex(l=>l.kind==="end");
    if(endI>0&&endI%2===1)P.splice(endI,0,{cls:"k-blank",html:blankH(),kind:"blank"});
    for(let i=0;i<P.length;i+=2)sheets.push({front:P[i],back:P[i+1]||{cls:"k-back",html:"",kind:"back"}});
    maxCur=Math.max(0,sheets.length-1);if(sheets.length&&sheets[sheets.length-1].front.kind!=="end"&&sheets[sheets.length-1].back.kind!=="back")maxCur=sheets.length}
  else{for(const l of leaves)sheets.push({front:l,back:{cls:"k-verso",html:blankH(),kind:"verso"}});maxCur=Math.max(0,sheets.length-1)}
  /* a relayout that comes out the same (fonts ready, book art loaded, a resize that keeps the page size) keeps the pages that are on screen:
     the book is never rebuilt from scratch under her eyes (owner 15:45Z: the figure and the right column flashed) */
  /* restore position by logical page (+ the block the reader was on) */
  const restore=()=>{cur=0;if(keep!=null){for(let i=0;i<sheets.length;i++){const s=sheets[i];if(s.front.src===keep||s.back.src===keep||s.front.kind===keep||s.back.kind===keep){cur=spread&&s.back.src===keep?i+1:i;break}}
   /* same reading position: the page of that section that holds the first block the reader was on (not the section's first page) */
   if(keepB!=null&&typeof keep==="object"){let best=null;sheets.forEach((s,i)=>{for(const f of [s.front,s.back])if(f.src===keep&&f.b0!=null&&f.b0<=keepB&&(!best||f.b0>=best.b0))best={b0:f.b0,i:spread&&f===s.back?i+1:i}});if(best)cur=best.i}
   cur=Math.min(cur,maxCur)}};
  const key=mode+"|"+PW+"x"+PH+"|"+sheets.map(s=>s.front.cls+s.front.html+"\u0001"+s.back.cls+s.back.html).join("\u0002");
  if(key===lastKey&&book.querySelector(".kbk-sheet")){restore();paint();return}
  lastKey=key;
  book.innerHTML=sheets.map((s,i)=>`<div class="kbk-sheet" data-i="${i}"><div class="kbk-face kbk-front">${shell(s.front.cls+" r",s.front.html,s.front.folio?String(s.front.no||""):"")}<i class="kbk-sh"></i></div><div class="kbk-face kbk-back">${shell(s.back.cls+" l",s.back.html,s.back.folio?String(s.back.no||""):"")}<i class="kbk-sh"></i></div></div>`).join("")+`<i class="kbk-cast"></i><i class="kbk-gutter"></i>`;
  book.querySelectorAll(".kbk-go").forEach(b=>b.onclick=e=>{e.stopPropagation();close()});
  /* no flash on turning (owner 15:45Z): every picture of the book is marked decoding="sync" + eager (kitImgMark, jbook: a hidden page that
     comes into view paints decoded, never one empty frame); only the sheets in view and the ones a turn can reveal next are decoded
     ahead (kitImgSync in paint()). F10 renderer-mem: decoding EVERY picture of every page at open (364 pictures in a year-1 Tuần lục)
     spiked the renderer past 2.6 GB and froze/crashed the page on phones. */
  try{if(typeof kitImgMark==="function")kitImgMark(book);else if(typeof kitImgSync==="function")kitImgSync(book)}catch(e){}
  restore();
  try{if(typeof kitNoUnkDom==="function")kitNoUnkDom(root)}catch(e){}
  paint()}
 const sheetEls=()=>book.querySelectorAll(".kbk-sheet");
 function paint(){const els=sheetEls();const n=els.length;els.forEach(el=>{if(el.__curl){el.__curl.destroy();el.__curl=null}});
  els.forEach((el,i)=>{const fl=i<cur;el.style.transform=fl?"rotateY(-180deg)":"";el.style.zIndex=fl?String(i+1):String(n*2-i);
   const near=mode==="spread"?(i>=cur-2&&i<=cur+1):(i>=cur-1&&i<=cur+1);el.style.visibility=near&&!(mode==="single"&&fl)?"visible":"hidden";
   /* decode ahead: the sheets in view + one more each way (what the next / previous turn shows), once per sheet */
   if(!el.__kis&&(mode==="spread"?(i>=cur-3&&i<=cur+2):(i>=cur-2&&i<=cur+2))){el.__kis=1;try{if(typeof kitImgSync==="function")kitImgSync(el)}catch(e){}}
   el.classList.remove("turn");el.querySelectorAll(".kbk-sh").forEach(s=>s.style.opacity="")});
  const cast=book.querySelector(".kbk-cast");if(cast){cast.style.opacity="0"}
  book.classList.toggle("closed",mode==="spread"&&cur===0);book.classList.toggle("atend",mode==="spread"&&cur>=sheets.length);
  const s=sheets[cur]||sheets[sheets.length-1];let label="";
  if(mode==="spread"){const a=cur>0?sheets[cur-1].back:null,b=sheets[cur]?sheets[cur].front:null;const nums=[a,b].filter(x=>x&&x.no).map(x=>x.no);label=b&&b.kind==="cover"?"Bìa sổ":nums.length?`Trang ${nums.join("–")}`:"" }
  else label=s&&s.front.kind==="cover"?"Bìa sổ":s&&s.front.no?`Trang ${s.front.no}`:"";
  const tot=leaves.filter(l=>l.no).length;noEl.textContent=label+(label&&label!=="Bìa sổ"?` / ${tot}`:"");
  root.querySelector(".kbk-prev").disabled=cur<=0;root.querySelector(".kbk-next").disabled=cur>=maxCur;
  logical=(sheets[cur]&&(sheets[cur].front.src||sheets[cur].front.kind))||null;logicalB=sheets[cur]&&sheets[cur].front.b0!=null?sheets[cur].front.b0:null;
  const lv=mode==="spread"&&cur>0?sheets[cur-1].back:null;if(lv&&lv.src){logical=lv.src;logicalB=lv.b0!=null?lv.b0:null}}   /* spread: the left page is the earliest one in view */

 /* ---- the turn: p = 0 (flat, right) … 1 (turned, left) ---- */
 /* the turn: the WHOLE sheet swings around the spine (kitCurl = kitSheetTurn, jbook / KIT §34.1, owner 11/15 10:00Z); content printed on the sheet */
 /* portrait (one page, no book): the page SLIDES instead of curling (kitSlideSheet, KIT §34); landscape (spread or a wide single page) curls */
 function slideMode(){return mode==="single"&&typeof kitIsPortrait==="function"&&kitIsPortrait()}
 function turnMs(){return slideMode()?KIT_SLIDE_MS:KIT_TURN_MS}
 function setTurn(el,p){const c=el&&el.__curl;if(c)c.set(p)}
 function beginTurn(i,dir){const els=sheetEls();const el=els[i];if(!el)return null;try{document.querySelectorAll("img.kemo.kemo-lean").forEach(e=>kesLeanEnd(e))}catch(e){}/* a running seal lean ends when a page starts to turn: its big clone never rides over the other person's page (owner 24/11 flight) */
  for(let k=i-2;k<=i+2;k++)if(els[k])els[k].style.visibility="visible";if(mode==="single"&&els[i+1]&&i===cur)els[i+1].style.visibility="visible";
  if(mode==="spread")book.classList.remove("closed","atend");
  if(el.__curl){el.style.visibility="hidden";return el}el.__dir=dir||1;
  /* one page at a time: the back of the turning sheet shows the next page (owner 11/15), not a blank verso */
  const nx=mode==="single"&&els[i+1]?els[i+1].querySelector(".kbk-front>.kbk-pg"):null;
  el.__curl=kitCurl({slide:slideMode(),host:book,front:el.querySelector(".kbk-front>.kbk-pg"),back:nx||el.querySelector(".kbk-back>.kbk-pg"),w:PW,h:PH,x:mode==="spread"?PW:0,y:0,
   po:mode==="spread"?0:PW*.5,shadeL:mode==="spread",vanish:mode!=="spread",dir:dir||1,p:i<cur?1:0});
  el.style.visibility="hidden";el.classList.add("turn");return el}
 const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,easeOut=t=>1-Math.pow(1-t,3);
 let animId=0;
 function animate(i,from,to,dur,fn,done){const el=beginTurn(i,to>=from?1:-1);if(!el){done&&done();return}busy=true;
  /* the sheet's copies of the pictures not decoded yet (kitImgSync / kitImgPending, KIT §52.1): the live sheet stays shown and the copy
     hidden until they are (at most 350 ms), then the turn starts — never one blank portrait on the turning sheet */
  const cu=el.__curl;if(cu&&cu.pending&&cu.pending()){const id0=++animId;cu.el.style.visibility="hidden";el.style.visibility="visible";
   cu.ready(slideMode()?220:350).then(()=>{if(id0!==animId)return;cu.el.style.visibility="";el.style.visibility="hidden";run()});pend={el,to,done};return}
  run();function run(){const t0=performance.now(),id=++animId;
  pend={el,to,done};
  const step=now=>{if(id!==animId)return;const t=Math.min(1,(now-t0)/dur);el.__curl&&el.__curl.set(from+(to-from)*fn(t),el.__dir||1);if(t<1)requestAnimationFrame(step);else{busy=false;pend=null;done&&done()}};requestAnimationFrame(step)}}
 /* a tap while a turn runs: that turn jumps to its end at once, then the new one starts (fast taps never jam; KIT §34.0) */
 let pend=null;function flush(){if(!busy||!pend)return;const f=pend;pend=null;animId++;try{if(f.el.__curl){f.el.__curl.el.style.visibility="";f.el.__curl.set(f.to)}}catch(e){}busy=false;f.done&&f.done()}
 function fade(nc){busy=true;book.classList.add("fade");setTimeout(()=>{cur=nc;paint();book.classList.remove("fade");setTimeout(()=>{busy=false},60)},60)   /* Gọn: instant swap + ~120 ms fade */}
 /* a picture of the sheets about to show that is still on its way (a painting that replaced a silhouette a moment ago): wait for it,
    at most 350 ms, so the turning sheet never shows it blank (owner 15:45Z) */
 function ready(i,go){const els=sheetEls();const L=[els[i-1],els[i],els[i+1],els[i+2]].filter(Boolean);
  if(typeof kitImgSync!=="function"||L.every(s=>[...s.querySelectorAll("img")].every(im=>im.complete&&im.naturalWidth))){go();return}
  busy=true;Promise.all(L.map(s=>kitImgSync(s,350))).then(()=>{busy=false;if(!closed)go()})}
 function next(){flush();if(busy||cur>=maxCur)return;kbkSfx();if(rm()){fade(cur+1);return}const i=cur;ready(i,()=>animate(i,0,1,turnMs(),slideMode()?kitSlideEase:kitTurnEase,()=>{cur=i+1;paint()}))}
 function prev(){flush();if(busy||cur<=0)return;kbkSfx();if(rm()){fade(cur-1);return}const i=cur-1;ready(i,()=>animate(i,1,0,turnMs(),slideMode()?kitSlideEase:kitTurnEase,()=>{cur=i;paint()}))}
 function go(n){animId++;busy=false;drag=null;n=Math.max(0,Math.min(maxCur,n));cur=n;paint()}

 /* ---- drag / swipe / tap ---- */
 let drag=null;
 book.addEventListener("pointerdown",e=>{if(busy||closed||e.button>0)return;if(e.target.closest(".kgl,.kodm,button,a"))return;
  const r=book.getBoundingClientRect();drag={x0:e.clientX,y0:e.clientY,r,id:e.pointerId,dir:0,el:null,p:0,hist:[[performance.now(),e.clientX]],side:(e.clientX-r.left)/r.width}});
 book.addEventListener("pointermove",e=>{if(!drag||e.pointerId!==drag.id)return;const dx=e.clientX-drag.x0,dy=e.clientY-drag.y0;drag.hist.push([performance.now(),e.clientX]);if(drag.hist.length>8)drag.hist.shift();
  if(!drag.dir){if(Math.abs(dx)<8||Math.abs(dx)<Math.abs(dy))return;
   const fwd=mode==="spread"?drag.side>=.5:dx<0;if(fwd&&cur>=maxCur||!fwd&&cur<=0){drag.dir=9;return}
   drag.dir=fwd?1:-1;try{book.setPointerCapture(e.pointerId)}catch(_){}if(!rm()){drag.i=fwd?cur:cur-1;drag.el=beginTurn(drag.i,drag.dir)}}
  if(drag.dir===9||!drag.el)return;e.preventDefault();const r=drag.r;
  /* distance the finger needs to travel for a full turn: to the opposite edge of the book */
  if(slideMode()){drag.p=drag.dir===1?Math.max(0,Math.min(1,-dx/r.width)):1-Math.max(0,Math.min(1,dx/r.width))}   /* slide: the sheet follows the finger 1:1 */
  else if(drag.dir===1){const span=Math.max(80,drag.x0-(mode==="spread"?r.left:r.left-r.width*.15));drag.p=Math.max(0,Math.min(1,-dx/span))}
  else{const span=Math.max(80,(mode==="spread"?r.right:r.right+r.width*.15)-drag.x0);drag.p=1-Math.max(0,Math.min(1,dx/span))}
  setTurn(drag.el,drag.p)},{passive:false});
 const endDrag=e=>{if(!drag||e.pointerId!==drag.id)return;const d=drag;drag=null;const dx=e.clientX-d.x0;
  if(!d.dir){if(Math.abs(dx)<10&&Math.abs(e.clientY-d.y0)<10&&e.type==="pointerup"){const s=(e.clientX-d.r.left)/d.r.width;
    if(mode==="spread"){if(s>=.62)next();else if(s<=.38)prev()}else{if(s>=.5)next();else if(s<=.3)prev()}}return}
  if(d.dir===9)return;
  if(!d.el){if(d.dir===1&&dx<-40)next();else if(d.dir===-1&&dx>40)prev();return}
  const h=d.hist,a=h[0],b=h[h.length-1];const v=(b[1]-a[1])/Math.max(1,b[0]-a[0]);
  const th=slideMode()?.3:.42;   /* slide: past ~30 % snaps to the next page */
  const fwdDone=d.dir===1?(d.p>th||v<-.35)&&!(v>.35):!((1-d.p)>th||v>.35)||v<-.35;
  const target=d.dir===1?(fwdDone?1:0):(fwdDone?1:0);const dur=slideMode()?Math.max(120,Math.abs(target-d.p)*250):Math.max(140,Math.abs(target-d.p)*520);if(target!==d.p)kbkSfx();
  animate(d.i,d.p,target,dur,easeOut,()=>{cur=target===1?d.i+1:d.i;paint()})};
 book.addEventListener("pointerup",endDrag);book.addEventListener("pointercancel",endDrag);
 root.querySelector(".kbk-next").onclick=e=>{e.stopPropagation();next()};root.querySelector(".kbk-prev").onclick=e=>{e.stopPropagation();prev()};
 root.querySelector(".kbk-x").onclick=e=>{e.stopPropagation();close()};
 /* KIT 32.10: a tap on the ground around the book closes it (press started there and did not move; a page drag never closes) */
 {let dn=null;const gr=t=>t===root||t===stage;root.addEventListener("pointerdown",e=>{dn=gr(e.target)?{x:e.clientX,y:e.clientY,t:Date.now()}:null},true);
  root.addEventListener("click",e=>{const d=dn;dn=null;if(!d||!gr(e.target)||busy)return;if(Math.hypot(e.clientX-d.x,e.clientY-d.y)>10||Date.now()-d.t>900)return;e.stopPropagation();close()})}
 const key=e=>{if(closed||root.offsetParent===null&&!root.getClientRects().length)return;const k=e.key;
  if(k==="ArrowRight"||k==="PageDown"){e.preventDefault();next()}else if(k==="ArrowLeft"||k==="PageUp"){e.preventDefault();prev()}
  else if(k==="Escape"){e.preventDefault();close()}else if((k==="Enter"||k===" ")&&!e.target.closest("button")){e.preventDefault();if(cur>=maxCur)close();else next()}};
 document.addEventListener("keydown",key);
 let rt=0;const onR=()=>{clearTimeout(rt);rt=setTimeout(()=>{if(!closed&&!busy)layout(logical,logicalB)},120)};addEventListener("resize",onR);
 function close(){if(closed)return;closed=true;document.removeEventListener("keydown",key);removeEventListener("resize",onR);try{spec.onClose&&spec.onClose()}catch(e){console.error(e)}}
 layout(null);
 /* web fonts that arrive after the first measure change line heights: measure again (keeps the page) */
 try{if(document.fonts&&document.fonts.status!=="loaded")document.fonts.ready.then(()=>{if(!closed&&!busy)layout(logical)})}catch(e){}
 root.__kbk={relayout:()=>{if(!closed&&!busy)layout(logical,logicalB)}};
 /* the figure list (img/FIGURES.json) may arrive after the book opened: lay out again once, the silhouettes become the paintings */
 {let nF=typeof FIGS!=="undefined"?FIGS.length:0;const iv=setInterval(()=>{if(closed){clearInterval(iv);return}const n=typeof FIGS!=="undefined"?FIGS.length:0;if(n!==nF){nF=n;if(!busy){clearInterval(iv);
  /* load the paintings first, then swap them in (never a figure that is still on its way) */
  const L=(spec.pages||[]).map(p=>p.kind==="person"?p.who:p.fig).filter(Boolean).map(w=>{try{return kitFigOf(w)}catch(e){return""}}).filter(Boolean);
  /* F10: bytes only (the sheets in view are decoded by paint(), the rest when they show — kitImgMark) */
  Promise.race([Promise.all([...new Set(L)].map(u=>new Promise(r=>{const im=new Image();im.onload=im.onerror=()=>r();im.src=u}))),new Promise(r=>setTimeout(r,4000))]).then(()=>{if(!closed&&!busy)layout(logical,logicalB)})}}},500);setTimeout(()=>clearInterval(iv),60000)}
 return {root,next,prev,go,close,get cur(){return cur},get max(){return maxCur},get mode(){return mode},relayout:()=>layout(logical)}}

/* ---------- week data → pages ---------- */
(function(){if(typeof wkSnap!=="function")return;const s0=wkSnap;
 wkSnap=function(){const s=s0.apply(this,arguments);try{s.duc=S.duc;s.th=S.th;s.hh=S.hh;s.mat=S.mat;s.an=S.an||0;s.pp={};
  (typeof rivals!=="undefined"?rivals:[]).forEach(v=>{if(v&&v.id!=null)s.pp[v.id]=[v.rel||0,v.ghen||0,v.oan||0]})}catch(e){}return s}})();

const KBK_DELTA_ONLY=/^(\s*[A-Za-zÀ-ỹĐđ]+(?: [A-Za-zÀ-ỹĐđ]+){0,5} [+\-−]\d+\s*[,;·]?)+\s*\.?$/;
const KBK_WORLD=/(thế lực|Kho lúa|kho lúa|^Sớ|triều đình|Triều đình|biên ải|Được mùa|Mất mùa|thiên tai|lũ lụt|hạn hán|dịch bệnh|sứ thần|ngoại bang|giặc|khoa cử|Hộ bộ|Binh bộ|Lễ bộ|Lại bộ|Hình bộ|Công bộ|Hàn lâm|thiên hạ|dân gian|kinh thành)/;
/* ===== review/weekbook-entries (owner 15/11: "Giải thích gì mà không liên quan tới hoàng thượng vậy.") =====
   Every person page lists ONLY what happened with THAT person this week: one entry per log unit, the unit's cause + the effect sentence
   + only the numbers that belong to that person (Sủng → Hoàng thượng, "Thái hậu quý ngươi" → Thái hậu, "<tên> oán/ghen" → that
   person, Danh/Sức/Bạc/Đức… → her own page). The numbers of the page's relation table equal the sum of the entries (a small
   "chuyện nhỏ khác" entry carries what no line explained). Card promise text is never an entry. */
const WKE_NAME="[A-ZÀ-ỸĐ][\\p{L}]*(?: [A-ZÀ-ỸĐ][\\p{L}]*){0,3}";
const WKE_TOK=kRx("(?<![\\p{L}\\d])((?:Thái hậu|Hoàng hậu|phi tần|các phi tần|mọi phi tần|kẻ khác|người khác|"+WKE_NAME+")\\s+)?(Sủng(?: của "+WKE_NAME+")?|quý ngươi|quý ta|thiện cảm|oán ngươi|oán ta|ghen|Danh|Sức|Bạc|Đức|Tai mắt|Ân tình|Tài|Sắc|Tâm cơ)\\s+(-?\\d+\\s*(?:→|->)\\s*-?\\d+|[+\\-−]\\d+)(?![\\d])","gu");
const WKE_CARD=new RegExp(String.raw`(^|\s)·\s*(kèm|thành|hỏng)\s*:|\b@@ODDS@@\s*·|ai gặp ta cũng nhìn|\(thẻ [^)]*\)|chọn món trong rương|Dùng được ở thẻ|^Xem sổ thị tẩm|Sổ thị tẩm:`.replace("@@ODDS@@","(?:"+KIT_ODDS_ALT+")"));
function wkeDelta(v){v=String(v).replace(/−/g,"-");const m=/^(-?\d+)\s*(?:→|->)\s*(-?\d+)$/.exec(v);return m?+m[2]-+m[1]:parseInt(v,10)}
function wkeNorm(h){return kpMapText(String(h||""),s=>s.replace(/\b(Thái hậu|Hoàng hậu)\s+(?=[+\-−]\d)/g,"$1 thiện cảm "))}
/* every number of a unit: {m:[start,end] in the plain segment, who: person | "me" | null, row:"sung"|"aff"|"oan"|"ghen"|"", d, label} */
function wkeTokens(html,people,nodup){const out=[];const TH=S.thO||{kind:"th"};
 kpMapText(wkeNorm(html),s=>{WKE_TOK.lastIndex=0;let m;while((m=WKE_TOK.exec(s))){let [all,pre,lab,val]=m;pre=(pre||"").trim();const d=wkeDelta(val);if(!d)continue;let who=null,row="";
  const byName=n=>{const e=people.find(x=>x[0]===n||x[0].endsWith(" "+n)||n.endsWith(" "+x[0]));return e?e[1]:null};
  const pers=n=>/^(phi tần|các phi tần|mọi phi tần|kẻ khác|người khác)$/.test(n)?"grp":n==="Thái hậu"?TH:n==="Hoàng hậu"?((typeof rivals!=="undefined"&&rivals.find(v=>v.queen))||null):byName(n);
  if(/^Sủng/.test(lab)){const o=/^Sủng của (.+)$/.exec(lab);if(o){who=byName(o[1]);if(who===S)who="me"}else{who=S.emp||null;row="sung"}}
  else if(/^(quý|thiện|oán|ghen)/.test(lab)){row=/^oán/.test(lab)?"oan":lab==="ghen"?"ghen":"aff";if(pre)who=pers(pre)}
  else{if(pre)who=pers(pre);else who="me"}
  const ab=/→|->/.test(val)?val.replace(/\s|−/g,m=>m==="−"?"-":"").replace("->","→"):"";
  if(!nodup&&ab&&out.some(x=>x.ab===ab&&x.row===row&&x.lab===lab&&x.pre===pre))continue;/* the same "a → b" said twice in one unit counts once */
  out.push({who,row,d,pre,lab,ab,all:m[0],at:m.index,seg:s});}return s});return out}
/* remove tokens that do not satisfy keep(tok) from the html, tidy the punctuation they leave */
function wkeStrip(html,people,keep){const toks=wkeTokens(html,people,true);if(!toks.length)return html;let h=wkeNorm(html);
 h=kpMapText(h,s=>{WKE_TOK.lastIndex=0;return s.replace(WKE_TOK,(all,pre,lab,val)=>{const t=toks.find(x=>x.all===all.trim()||x.all===all);return t&&!keep(t)?"":all})});
 return h.replace(/<(span|b|i)[^>]*>\s*<\/\1>/g,"").replace(/(\s*[,;·]\s*)+(?=\.|$)/g,"").replace(/([.:;])\s*,\s*/g,"$1 ").replace(/,\s*,/g,",").replace(/\s+([.,;:])/g,"$1").replace(/\.\s*\./g,".").replace(/^\s*[,;·.]\s*/,"").replace(/(^|[.:;>]\s*)vì [^.<]*\.?/g,"$1").replace(/(\s*·\s*){2,}/g," · ").replace(/\s*·\s*(?=[,;.]|$)/g,"").replace(/(^|[.:;]\s+)·\s*/g,"$1").replace(/\s{2,}/g," ").replace(/(^|[.!?]\s+)([a-zà-ỹđ])/g,(m,a,b)=>a+b.toUpperCase()).trim()}
function wkeTrim(h){let p;h=String(h||"");do{p=h;h=h.replace(/(?:[\s,;·:.]|→)+((?:<\/[a-z]+>)*)$/,"$1")}while(h!==p);return h.trim()}
function wkeSign(d){return d>0?"+"+d:"-"+Math.abs(d)}
/* the entry of one owner: the unit's cause (numbers removed) + why it moved + the owner's own numbers */
function wkeEntry(html,people,p,toks){const mine=toks.filter(t=>t.who===p);let cause=wkeTrim(wkeStrip(html,people,()=>false));
 if(!kpPlain(cause)||/^[\s.]*$/.test(kpPlain(cause)))cause="";
 const net={};mine.forEach(t=>{const k=t.row||t.lab;net[k]=(net[k]||0)+t.d});
 const sj=(typeof kitRelSubj==="function"?kitRelSubj(p):"Nàng"),sjl=sj==="Nàng"||sj==="Hắn"?sj.toLowerCase():sj;
 const why=[],chips=[];
 for(const k of Object.keys(net)){const d=net[k];if(!d)continue;
  if(k==="sung"){why.push(d>0?"Hoàng thượng để tâm đến ta hơn":"Hoàng thượng nhạt lòng với ta");chips.push(`Sủng ${wkeSign(d)}`)}
  else if(k==="aff"){why.push(d>0?`${sjl} thêm quý mến ta`:`${sjl} bớt vừa lòng về ta`);chips.push(`${sj} thiện cảm ${wkeSign(d)}`)}
  else if(k==="oan"){why.push(d>0?`${sjl} thêm oán ta`:`${sjl} bớt oán ta`);chips.push(`${sj} oán ta ${wkeSign(d)}`)}
  else if(k==="ghen"){why.push(d>0?`${sjl} thêm ghen ghét ta`:`${sjl} bớt ghen`);chips.push(`${sj} ghen ${wkeSign(d)}`)}
  else chips.push(`${k} ${wkeSign(d)}`)}
 const w0=why.length&&!(cause&&why.every(x=>kpPlain(cause).toLowerCase().includes(x.toLowerCase())))?why:[];
 return `${cause?cause+(w0.length?", ":""):""}${w0.length?w0.join("; "):""}${cause||w0.length?". ":""}${chips.join(", ")}${chips.length?".":""}`.replace(/\.{2,}/g,".").replace(/^\s*,\s*/,"").trim()}
function wkBookData(){const s=S.wkSnap||wkSnap();const n=Math.max(0,Math.min(S.logs.length,(S.logSeq||0)-(s.seq||0)));
 const raw=S.logs.slice(0,n).slice().reverse();const people=kpPeople();const SKIPRE=/^(Xin xăm|Gieo lại|Đến Tẩm cung của ngươi)/;
 const TH=S.thO||{kind:"th"};let pay="";const U=[];let last=null;
 /* the person a sentence is about = the one named FIRST outside brackets (never "Hoàng thượng" only because a hint in brackets names him) */
 const homeOf=t=>{try{const [,w0]=kpPeopleIn(kpMapText(t,x=>x.replace(/\([^)]*\)/g,"")),people);const w=w0.map(x=>x&&x.kind==="th"&&!rivals.includes(x)?TH:x);const p=w.find(x=>x!==S&&!(S.emp&&x===S.emp))||w[0]||null;
  /* Hoàng thượng / Thái hậu are "the person it is about" only when the sentence opens with them ("Được Hoàng thượng ban…", "Thái hậu triệu…"), not when a hint names them later */
  if(p&&(p===S.emp||p===TH)&&!people.some(x=>x[1]===p)){const q=kpPlain(t).replace(/\([^)]*\)/g,"");const i=q.search(p===S.emp?/Hoàng thượng|Thánh thượng/:/Thái hậu/);if(i<0||i>12)return null}
  return p}catch(e){return null}};
 for(const h of raw){const pl=plain(h);if(!pl||SKIPRE.test(pl))continue;if(/^Bổng lộc tháng/.test(pl)){pay=pl.replace(/^Bổng lộc tháng [^:]*:\s*/,"").replace(/\.$/,"");continue}
  const html=kbkClean(String(h).replace(/<span class="ld">[^<]*<\/span>/,"").replace(/\s*\(Đã ghi vào mục Đã biết[^)]*\)\.?/g,""));last=null;
  for(let t of kpSentences(html)){const tp=kpPlain(t);if(!tp||SKIPRE.test(tp)||/^\(?Đã ghi vào mục Đã biết/.test(tp))continue;
   /* the card's own promise / hint text is not an event (owner 15/11: Điểm trang entry on Hoàng thượng's page) */
   if(WKE_CARD.test(tp))continue;
   /* a line that is only a name ("Hoàng hậu Chu Thục Nghi.") says nothing (owner 15:30Z) */
   {let r=tp;for(const [n] of people)r=r.split(n).join(" ");r=r.replace(/(Thái tử|Hoàng tử|Công chúa|Hoàng hậu|Hoàng quý phi|Quý phi|Phi|Tần|Quý nhân|Thường tại|Đáp ứng|Thái hậu|Hoàng thượng|Phế phi|Thái y|Thị vệ|Ma ma|Cô cô)/g," ");if(!/[\p{L}\d]/u.test(r))continue}
   if(/^(Tháng này|Tin triều đình|Triều đình|Thiên hạ)\s*:/.test(tp)){t=t.replace(/^((?:<[^>]+>)*)\s*(Tháng này|Tin triều đình|Triều đình|Thiên hạ)\s*:\s*/,"$1");last={t,world:true};U.push(last);continue}
   /* a festival prize "X đoạt giải … (Sủng +2, Danh +2)" belongs to the winner X (a rival), not to her or to Hoàng thượng: drop the bracket (r1 review) */
   if(/đoạt giải/.test(tp)&&!/^(Ngươi|Ta)\b/.test(tp.replace(/^[^:]*:\s*/,"")))t=t.replace(/(đoạt giải(?:[^(<]|<[^>]*>)*?)\s*\((?=(?:<[^>]*>)*\s*(?:Sủng|Danh|Đức))[^)]*\)/,"$1");
   const hm=homeOf(t);
   /* a result / reaction / bare number joins the unit before it, but only when it is about the same person (no more "last" glued across people) */
   if(last&&(KBK_DELTA_ONLY.test(tp)||!/[\p{L}\d]/u.test(tp.replace(WKE_TOK,"").replace(/[+\-−→>]|\d/g,""))||(!kbkMeaning(tp)&&(!hm||hm===last.home||(last.home==null&&hm===S))))){last.t+=" "+t;continue}
   let p=hm;
   if(!p&&(last&&last.world&&/^(Nhà |Kho |.*thế lực)/.test(tp)||KBK_WORLD.test(tp))){last={t,world:true};U.push(last);continue}
   last={t,home:p&&p!==S?p:null};U.push(last)}}
 /* ---- units → pages: by the owner of each number, then by the person the unit is about ---- */
 const by=new Map(),me=[],world=[];const add=(p,e)=>{if(!by.has(p))by.set(p,{who:p,F:[],tk:[]});const x=by.get(p);if(e)x.F.push(e)};
 const SEEN=new Map();const meKeep=t=>t.who==="me"||t.who==="grp"||t.who===S.emp&&t.row==="sung";
 for(const u of U){if(u.world){world.push(u.t);continue}
  const toks=wkeTokens(u.t,people).filter(t=>{if(!t.ab||!t.who)return true;const k=(t.row||t.lab)+"|"+t.ab;let m=SEEN.get(t.who);if(!m)SEEN.set(t.who,m=new Set());if(m.has(k))return false;m.add(k);return true});const owners=new Set();
  toks.forEach(t=>{if(t.who&&t.who!=="me"&&t.who!=="grp")owners.add(t.who)});
  /* an unattributed relation number ("nàng quý ngươi +2") belongs to the person the unit is about */
  toks.forEach(t=>{if(!t.who&&t.row&&u.home){t.who=u.home;owners.add(u.home)}});
  if(u.home)owners.add(u.home);
  for(const p of owners){if(p===S)continue;const mine=toks.filter(t=>t.who===p);
   /* a person is listed only for something that happened WITH them: their own number, or the sentence is about them */
   if(!mine.length&&p!==u.home)continue;
   const e=wkeEntry(u.t,people,p,toks);if(e&&kpPlain(e))add(p,e);by.get(p)&&by.get(p).tk.push(...mine)}
  const hasMe=toks.some(meKeep);
  if(hasMe||(!u.home&&!owners.size)||(!toks.length&&!u.home))me.push(hasMe?wkeStrip(u.t,people,meKeep):u.t)}
 /* duplicates: one row, "2 lần" */
 const dedup=L=>{const m=new Map();for(const t of L){const k=kpPlain(t);if(m.has(k))m.get(k).n++;else m.set(k,{t,n:1})}return [...m.values()].map(x=>x.n>1?{text:x.t,chips:[[`${x.n} lần`,"n"]]}:{text:x.t})};
 const D=[["Sủng",S.sung-s.sung],["Danh",S.danh-s.danh],["Sức",S.suc-s.suc],["Bạc",S.bac-s.bac]];
 if(s.duc!=null)D.push(["Đức",S.duc-s.duc]);if(s.mat!=null)D.push(["Tai mắt",S.mat-s.mat]);if(s.an!=null)D.push(["Ân tình",(S.an||0)-s.an]);
 const rank=S.rank!==s.rank?(S.rank>s.rank?"Được thăng ":"Bị giáng xuống ")+(S.rank>=7?"Hoàng hậu":meRankN()):"",kids=S.kids.length-(s.kids||0);
 /* KIT §52 (owner 11/15 15:30Z): every person page has the SAME relation table, fixed rows for the kind of person (kitRelRows),
    with the week's change from the snapshot; no private chips, no "Hiện nay" row of its own.
    owner 15/11 (weekbook-entries): the table's change = the sum of the entries listed; what no line explained is one more entry. */
 const persons=[...by.values()].map(x=>{const p=x.who;const rel=typeof kitRelRows==="function"?kitRelRows(p,s):[];
  const F=x.F.slice();
  if(p===S.emp||(p===TH)||p===S.thO||p.kind==="th"||true){
   const sj=typeof kitRelSubj==="function"?kitRelSubj(p):"Nàng",sjl=sj==="Nàng"||sj==="Hắn"?sj.toLowerCase():sj;
   for(const r of rel){if(!r.d||/^Ta /.test(r.label)||r.unk!=null)continue;
    const k=p===S.emp?"sung":/oán/.test(r.label)?"oan":/ghen/.test(r.label)?"ghen":/tin cậy/.test(r.label)?"":"aff";if(!k)continue;
    const got=x.tk.filter(t=>(t.row||"")===k).reduce((a,t)=>a+t.d,0);const rest=r.d-got;if(!rest)continue;
    const lab=k==="sung"?"Sủng":k==="aff"?`${sj} thiện cảm`:k==="oan"?`${sj} oán ta`:`${sj} ghen`;
    const why=k==="sung"?(rest>0?"Hoàng thượng để tâm đến ta hơn":"Hoàng thượng nhạt lòng với ta"):k==="aff"?(rest>0?`${sjl} thêm quý mến ta`:`${sjl} bớt vừa lòng về ta`):k==="oan"?(rest>0?`${sjl} thêm oán ta`:`${sjl} bớt oán ta`):(rest>0?`${sjl} thêm ghen ghét ta`:`${sjl} bớt ghen`);
    F.push(`Mấy việc vặt trong tuần chưa ghi riêng, ${why}. ${lab} ${wkeSign(rest)}.`)}}
  return {kind:"person",who:p,rel,blocks:[{facts:dedup(F)}],n:F.length}}).filter(x=>x.n>0||x.rel.some(r=>r.d));
 const rk=p=>S.emp&&p.who===S.emp?0:(S.thO&&p.who===S.thO)||p.who.kind==="th"?1:2;
 persons.sort((a,b)=>rk(a)-rk(b)||b.n-a.n);
 return {D,rank,kids,pay,me:dedup(me),world:dedup(world),persons}}

/* event art (j89 evArtOf) for each fact of the week: the sentence picks an event id, else the page's context */
const KBK_EVRE=[[/thị tẩm|lật thẻ|ngự giá|ngủ lại/i,"sys:thi-tam"],[/có thai|mang thai|hoài thai|có hỷ|hỉ mạch/i,"sys:co-thai"],
 [/hạ sinh|sinh hạ|sinh được|chào đời/i,"sys:sinh-con"],[/băng hà/i,"sys:bang-ha"],[/qua đời|tạ thế|đã chết|bị giết|hoăng|mất mạng/i,"sys:qua-doi"],
 [/sẩy thai|xạ hương|hại thai/i,"plot:musk"],[/đầu độc|trúng độc|thuốc độc|bỏ độc/i,"plot:poison"],[/vu oan|vu cáo|bùa|hình nhân|cáo giác|tố giác/i,"plot:frame"],
 [/hối lộ|đút lót|uy hiếp|tống tiền/i,"plot:bribe"],[/tin đồn|đồn đại|lời đồn|đồn rằng|bàn tán/i,"plot:rumor"],[/lãnh cung/i,"sys:lanh-cung"],
 [/giáng|trượng|cấm túc|bị phạt|trừng phạt|quỳ/i,"sys:giang-chuc"],[/tấn phong|được thăng|thăng làm|phong làm|sắc phong|lập hậu|tranh ghế/i,"sys:tan-phong"],
 [/tuyển tú|tú nữ/i,"sys:tuyen-tu"],[/dịch bệnh|ôn dịch/i,"arc:s_dich"],[/ốm|bệnh|thái y|cảm hàn|phát sốt|thuốc/i,"sys:om"],[/cháy|hỏa hoạn/i,"j7:fire"],
 [/được mùa|kho lúa/i,"qs:mua"],[/lũ|lụt/i,"qs:lut"],[/hạn hán|cầu mưa/i,"qs:han"],[/tham ô|tham quan|tham nhũng/i,"qs:tham"],
 [/thắng trận|đại thắng|khải hoàn/i,"news:thang-tran"],[/giặc|biên ải|thua trận|binh đao|chiến sự/i,"qs:giac-thua"],[/sứ thần|triều cống|ngoại bang|cống phẩm/i,"qs:cong"],
 [/hòa thân/i,"news:hoa-than"],[/yến|tiệc|mừng thọ/i,"qs:hoi"],[/thỉnh an|vấn an/i,"j24:thai-hau-trieu"],[/thư nhà|gia thư|nhà gửi|người nhà/i,"j7:letterhome"],
 [/hoàng tử|công chúa|hoàng tự|(^|\s)con(\s|$|[,.])/i,"e68:kidGift"],[/liên thủ|kết minh|mật ước|đồng minh|kết giao/i,"j7:pact"],
 [/dò la|tai mắt|rình|nghe lén|khả nghi|mật báo/i,"j7:eunuch"],[/cung nữ|thái giám|kẻ hầu|nô tỳ|ma ma|cung nhân/i,"j24:viec-ke-hau"],
 [/tài nghệ|luyện|học|tấu đàn|gảy đàn|ngâm thơ|vẽ tranh|thêu|múa/i,"e68:musician"],[/lễ phật|chùa|cầu phúc|dâng hương|tế lễ/i,"e68:templeRite"],
 [/ban thưởng|được thưởng|ân điển|đại xá|ân xá/i,"sys:dai-xa"],[/ghen|tranh chấp|cãi|khiêu khích|mỉa|chèn ép|lườm/i,"j7:rvquarrel"],
 [/đến thăm|ghé thăm|tới chơi|trò chuyện|uống trà|tặng|biếu|quà/i,"j24:co-nguoi-den"],[/tuyết|mưa|nắng|gió|bão|sen nở/i,"e68:snowDay"]];
function kbkEvId(text,ctx){const t=String(text||"");for(const [re,id] of KBK_EVRE)if(re.test(t))return id;
 if(ctx==="world")return "qs:yen";if(ctx==="emp")return /giận|phiền|trách/i.test(t)?"sys:mood-gian":"sys:mood-vui";if(ctx==="th")return "j24:thai-hau-trieu";
 return "j24:co-nguoi-den"}
/* ---- picture of each line (review/act-pics, owner 11/15: "Nhịn." and "Làm thơ dâng lên" had the same brocade chest, "Ngủ đêm hồi sức" and
   "Đi." the same room): every line gets the picture of ITS meaning, first match wins —
   1. img/ACTS.json "log": [[regex, key], …] (choice lines, game sentences) · key = act key (img/act-<key>.webp), "ev:<category>" (j89) or "scene:<sc>";
   2. "Đến <nơi>" → that place's own scene for the season and the buổi of the walk (j94 sceneImg; the log carries the buổi);
   3. the line starts with an act name → that act's picture (kitActKey, same as the act card);
   4. the event regexes above (KBK_EVRE) → the event category, every file of it;
   5. the act's category picture (act-cat-*), then the old page default.
   Two lines in a row never share a picture when they mean different things: the next candidate is taken. ---- */
function kbkPlaceArt(t,html){try{if(typeof SCIMG!=="object")return"";const nm=t.replace(/^Đến\s+/,"").replace(/[,.].*$/,"").trim();if(!nm)return"";
 let sc="";let L=[];try{L=typeof places==="function"?places():[]}catch(e){}L=L.concat([{k:"home",n:"Tẩm cung của ngươi",sc:"home"}]);
 for(const p of L){let n2="";try{n2=typeof accName==="function"?accName(p.k):""}catch(e){}if(nm===p.n||nm===n2){sc=p.sc;break}}
 if(!sc&&/cung|điện|các|hiên|viện/i.test(nm))sc="rv";if(!sc)return"";
 const cur=SCIMG[sc];if(!cur)return"";const base=String(cur).replace(/-(xuan|ha|thu|dong)-(sang|trua|chieu|toi)$/,"");
 const m=/data-b="(\d)"/.exec(String(html||""));let n=base;
 if(typeof sceneImg==="function"&&S){const b0=S.buoi;try{if(m)S.buoi=+m[1];n=sceneImg(base)}finally{S.buoi=b0}}
 return `img/${n}.webp`}catch(e){return""}}
function kbkEvFiles(id,salt){try{const A=EVART;if(!A)return[];const c=evArtCat(id);const C=c&&A.categories[c];if(!C||!C.files||!C.files.length)return[];
 const f=evArtOf(id,salt);return [f].concat(C.files.filter(x=>x!==f))}catch(e){return[]}}
function kbkKeySrc(key,salt,t,html){key=String(key||"");if(!key)return[];
 if(key.startsWith("ev:")){const c=key.slice(3);const C=EVART&&EVART.categories&&EVART.categories[c];return C&&C.files?C.files.slice():[]}
 if(key.startsWith("scene:")){const sc=key.slice(6);const cur=typeof SCIMG==="object"&&SCIMG[sc];return cur?[`img/${cur}.webp`]:[]}
 return [`img/act-${key}.webp`]}
/* review/act-pics2 (owner 11/15: every meaning its own picture): ACTS.json "log" = every meaning rule of dev/figwork/acts/meanings.py, compiled once;
   key "-" = a sentence with no meaning of its own (a reaction, a result, a number, a UI word): it joins the line of the sentence before it */
let KBK_RC=null,KBK_RCsrc=null;
function kbkRules(){const R=(typeof KIT_ACTS!=="undefined"&&KIT_ACTS.log)||[];if(R!==KBK_RCsrc){KBK_RCsrc=R;KBK_RC=[];for(const [re,key] of R){try{KBK_RC.push([new RegExp(re,"i"),key])}catch(e){}}}return KBK_RC}
function kbkFirst(html){let s=html;try{const L=kpSentences(String(html||""));if(L.length)s=L[0]}catch(e){}return kpPlain(s).replace(/[\s\u00a0]+/g," ").trim()}
function kbkMeaning(t){t=String(t||"").replace(/[\s\u00a0]+/g," ").trim();for(const [re,key] of kbkRules())if(re.test(t))return key==="-"?"":key;
 if(/^Đến /.test(t))return"place";const head=t.split(/[.:·([]/)[0].trim();try{if(head.length>=3&&typeof kitActKey==="function"&&kitActKey(head))return"act"}catch(e){}
 return kbkRules().length?"":"?"}
function kbkCands(f,ctx,salt){const html=String(f.text||"");const t=kbkFirst(html);const C=[];const add=a=>{for(const x of [].concat(a||[]))if(x&&!C.includes(x))C.push(x)};
 const head=t.split(/[.:·([]/)[0].trim();
 const R=(typeof KIT_ACTS!=="undefined"&&KIT_ACTS.log)||[];
 for(const [re,key] of kbkRules()){if(re.test(t)){if(key==="-")return[];add(kbkKeySrc(key,salt,t,html));break}}  /* "-" = a line with no meaning: no picture */
 if(/^Đến /.test(t))add(kbkPlaceArt(t,html));
 let ak="";try{ak=head.length>=3&&typeof kitActKey==="function"?kitActKey(head):""}catch(e){}if(ak)add(`img/act-${ak}.webp`);
 /* Tổng lược, every page (act-pics2 a467; owner 14:15Z "no picture rather than a repeated one", 14:30Z group pictures banned; reviewer r7
    widened it from "Việc của ngươi" to other people's pages and Triều đình · thiên hạ, LUẬT SỬA CẢ NHÓM): a line shows ONLY a picture made
    for it (ACTS log rule, its place, its act name); no match → NO picture, never an event-group (KBK_EVRE) or act-category stand-in */
 /* the page default only on the Emperor's / Thái hậu's own pages (a picture of that person); her lines, other people's and the world's get
    NO picture rather than the same "Có người đến" room on every line (act-pics2 a467 / owner: one meaning = one picture) */
 if(!C.length&&(ctx==="emp"||ctx==="th"))add(kbkEvFiles(kbkEvId(t,ctx),salt));
 return C}
/* a picture made for this very line (ACTS.json log rule or act name), "" when only a general one would fit */
function kbkSpecific(t){t=kbkFirst(t);const R=(typeof KIT_ACTS!=="undefined"&&KIT_ACTS.log)||[];
 for(const [re,key] of kbkRules()){if(re.test(t))return key==="-"?"":(kbkKeySrc(key,"",t,"")[0]||"")}
 const head=t.split(/[.:·([]/)[0].trim();let ak="";try{ak=head.length>=3&&typeof kitActKey==="function"?kitActKey(head):""}catch(e){}return ak?`img/act-${ak}.webp`:""}
function kbkArtLabel(src){const m=/img\/ev-([a-z-]+?)(?:-\d+)?\.webp/.exec(src||"");if(m&&EVART&&EVART.categories){for(const c in EVART.categories)if((EVART.categories[c].files||[]).includes(src))return EVART.categories[c].title||""}
 const a=/img\/act-cat-([a-z-]+)\.webp/.exec(src||"");if(a&&typeof KIT_CAT!=="undefined"&&KIT_CAT[a[1]])return KIT_CAT[a[1]][0];return""}
function kbkArt(facts,ctx){if(typeof evArtOf!=="function")return facts;let w=0;try{w=wk()}catch(e){}let prev="",prevT="";
 return (facts||[]).map((f,i)=>{if(!f||typeof f!=="object")return f;try{const t=kpPlain(f.text||"");const C=kbkCands(f,ctx,w+":"+i);
  const same=prevT&&prevT.split(/[.:·([]/)[0].trim()===t.split(/[.:·([]/)[0].trim();
  /* a picture MADE for this line (log rule / act name / its place) is right even if the line above has it too (same scene: "Thỉnh an Thái hậu" +
     "được thấy mặt Thái hậu"); only general pictures (event category, act category, page default) step aside for the next candidate */
  let own=false;try{own=!!C[0]&&(C[0]===kbkSpecific(t)||/^Đến /.test(t))}catch(e){}
  const a=same||own?C[0]:(C.find(x=>x!==prev)||C[0]);if(a){f.art=a;f.artT=kbkArtLabel(a);prev=a;prevT=t}}catch(e){}return f})}

/* ---- choice lines say WHAT and WITH WHOM (owner 11/15: "Nhịn." / "Đi." mean nothing in the books) ----
   chooseM logs "<option>." — now: a navigation-only choice (Thôi, Đi, Đợi buổi sau) logs nothing (the walk logs "Đến <nơi>." itself);
   a choice whose effect the game writes as its own sentence logs only that sentence; a short choice gets its context:
   "Nhịn lời mỉa của <tên>", "Cho <tên> mượn bạc", else "<option> (<first sentence of the question>)". c.lg (option) overrides. */
const KBK_OPT_DROP=/^(Thôi|Đi|Đợi buổi sau \(Qua buổi\)|Đợi sáng mai \(Qua đêm\))$/;
const KBK_OPT_NAMES=[[/^(Nhịn|Nhẫn nhịn)$/,/khiêu khích/,n=>`Nhịn lời khiêu khích của ${n}`],[/^Đáp trả sắc sảo$/,/khiêu khích/,n=>`Đáp trả lời khiêu khích của ${n}`],
 [/^(Nhịn|Nhẫn nhịn)$/,/mỉa/,n=>`Nhịn lời mỉa của ${n}`],[/^Đáp trả sắc sảo$/,/mỉa/,n=>`Đáp trả lời mỉa của ${n}`],
 [/^Cho mượn$/,/mượn/,n=>`Cho ${n} mượn bạc`],[/^Từ chối$/,/mượn/,n=>`Từ chối cho ${n} mượn bạc`],
 [/^Nhận lời xin lỗi$/,/xin lỗi/,n=>`Nhận lời xin lỗi của ${n}`],[/^Lạnh lùng$/,/xin lỗi/,n=>`Lạnh lùng trước lời xin lỗi của ${n}`]];
function kbkOptWho(m){try{const w=m&&m.who&&m.who.w;if(w&&w[0]==="r"){const v=RV(+w[1]);if(v&&v.name)return v.name}}catch(e){}return""}
/* OB-VERDICT-3 (title of the result card = this name): the visitor's ARRIVAL stage line («Ngoài điện có tiếng xướng: “… giá đáo!”», «… xin cầu kiến»,
   owner 24/11 ~22:08Z) is not the question — the context starts after it (before: «Nhịn (Ngoài điện có tiếng xướng: “Hoàng hậu … giá đáo)») */
const KBK_ARRIVE=/^[^“"]*[“"][^”"]*(giá đáo|xin cầu kiến|xin ra mắt)[^”"]*[”"]\s*/;
function kbkOptName(m,c){const n=String(c.n||"");if(c.lg)return c.lg;let ctx=kpPlain(m.h||"").replace(/\s+/g," ").trim();for(let k=0;k<2&&KBK_ARRIVE.test(ctx);k++)ctx=ctx.replace(KBK_ARRIVE,"").trim();const who=kbkOptWho(m);
 for(const [a,b,f] of KBK_OPT_NAMES)if(who&&a.test(n)&&b.test(ctx))return f(who);
 if(n.split(/\s+/).length>3||(who&&n.includes(who)))return n;
 let s=(ctx.match(/^[^.!?]*/)||[""])[0].trim();if(!s||s.length>90)s=kpPlain(m.t||"").trim();
 /* the log line already starts with the event's title (j3 logChoice "<việc>: <lựa chọn> → …"): never repeat it in brackets */
 return s&&!s.includes(n)&&s!==kpPlain(m.t||"").trim()&&!/^(Có người đến|Thông báo|Tin)$/.test(s)?`${n} (${s})`:n}
(function(){if(typeof chooseM!=="function"||typeof log!=="function")return;let RW=null;
 const l0=log;log=function(h){const w=RW;if(w&&!w.done&&typeof h==="string"&&h.startsWith(w.n+".")){w.done=true;if(w.nm===null)return;h=w.nm+h.slice(w.n.length);w.seq=(S.logSeq||0)+1}
  else if(typeof h==="string"&&S&&/^Đến /.test(h))h+=`<i class="kbb" data-b="${S.buoi||0}"></i>`;
  return l0.apply(this,[h].concat([].slice.call(arguments,1)))};
 const c0=chooseM;chooseM=function(i){let m=null,c=null;try{m=Q[0];c=m&&m.opts&&m.opts[i]}catch(e){}
  if(!m||!c||(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0))return c0.apply(this,arguments);
  const n=String(c.n||"");const noFx=!Object.keys(c.fx||{}).some(k=>c.fx[k]);let nm=n;
  try{nm=noFx&&KBK_OPT_DROP.test(n)?null:kbkOptName(m,c)}catch(e){nm=n}
  /* the result card's title (j19 wrapR reads c.n) says the same as the line: the option carries its full name from here on */
  if(nm&&nm!==n)c.n=nm;
  /* (the last picture is per life: lifeStore __kitLastEvArt in j1) …and the result card shows this choice's own picture when it has one (jk2b reads __kitLastEvArt), not the question's */
  try{const sp=nm&&kbkSpecific(nm);if(sp)window.__kitLastEvArt={src:sp,lab:""}}catch(e){}
  const w=RW={n:c.n,nm,done:false,seq:0};let r;try{r=c0.apply(this,arguments)}finally{RW=null}
  /* the option only opened what the game then wrote as its own sentence ("Núp nghe lén." + "Núp sau hòn giả sơn, ngươi nghe rõ…"): keep the sentence */
  try{if(w.seq&&noFx&&!(c.x&&!c.go)&&(S.logSeq||0)>w.seq){const k=(S.logSeq||0)-w.seq;if(S.logs[k]&&kpPlain(S.logs[k]).includes(kpPlain(nm))){S.logs.splice(k,1);S.logSeq--}}}catch(e){}
  return r}})();

/* one log line → what the book prints (owner 11/15 16:55Z, 16:58Z; also lines written by older versions of the game):
   - the card's promise text never stands in for the result: " · kèm: …", " · thành: …", "Dùng được ở thẻ nàng (N cách)" are dropped;
   - "(Chứng cứ X +1.)" glued to the next event by the old "Tai mắt thấy" line is dropped (evidence has its own line with its source);
   - whole numbers only ("−1.76" → "−2"), never a double full stop. */
function kbkClean(h){try{h=String(h||"").replace(/\s*·\s*(kèm|thành|hỏng|tốn)\s*:[^·<]*(?=·|<|$)/gi,"").replace(/\s*Dùng được ở thẻ nàng \(\d+ cách\)\.?/g,"")
  .replace(/\s*\(Chứng cứ [^()]*?[+\-−]\d+\.?\)\s*/g," ");
  const fx=s=>s.replace(/([+\-−]?)(\d+)[.,](\d+)(?![\d.,]*\d*[:\/])/g,(m,sg,a,b)=>sg+Math.round(+(a+"."+b))).replace(kRx("(?<!\\.)\\.\\s*\\.(?!\\.)","g"),".").replace(/\s+([.,;:])/g,"$1");
  return typeof kpMapText==="function"?kpMapText(h,fx):fx(h)}catch(e){return h}}
function wkBookPages(){const d=wkBookData();const date=kitDate(S.month,S.year,S.tuan);const sea=`${SEASON[S.month-1]}${S.wx?" · "+S.wx.n:""}`;
 const P=[{kind:"cover",title:"Tuần lục",sub:date,note:sea}];
 const b=[];b.push({rows:[["Ngày",date,"t"],["Tiết",sea,"n"]]});
 if(S.lot){const bad=LVB[S.lot.lv]<0||(S.lot.dom==="Hung"&&S.lot.lv>=3),good=LVB[S.lot.lv]>0;b.push({h:kitGloss("Quẻ tuần")});b.push({rows:[["Quẻ",`<span class="ef t">${LV[S.lot.lv]} · ${S.lot.dom}</span>`],["Lời quẻ",(LOTS[S.lot.i]||[])[2]||"","n"],["Tuần này",String(lotEffect(S.lot)).replace(/\s*Gồm:.*$/,"").replace(/^Tuần này:\s*/,"")/* owner 17:16Z: short, no list of acts */,bad?"r":good?"g":"n"]]})}
 b.push({h:"Ngươi tuần qua"});b.push({chips:d.D.filter(([,v])=>v)});
 const mine=[];if(d.rank)mine.push({text:`<b class="g">${d.rank}</b>`,who:S});if(d.kids>0)mine.push({text:`Thêm ${d.kids} con.`,who:S});if(mine.length)b.push({facts:mine});
 b.push({h:kitGloss("Bổng lộc")});b.push(d.pay?{rows:[["Đã lĩnh",kpChipify(d.pay),"t"]]}:{rows:[["Kỳ tới",`còn ${3-(S.tuan||0)} tuần`,"n"]]});
 if(d.persons.length){b.push({h:"Sổ này ghi"});b.push(`<div class="kbk-toc">${d.persons.map(p=>`<span class="kbk-tc">${kitFaceH(p.who,"xs")}${kitName(p.who,{cap:true})}</span>`).join("")}</div>`)}
 if(d.me.length){b.push({h:"Việc của ngươi"});b.push({facts:kbkArt(d.me.map(f=>Object.assign(f,{who:S})),"me")})}
 if(!d.me.length&&!d.persons.length&&!d.world.length&&!mine.length)b.push({facts:[{text:"Một tuần yên ả.",kind:"world",auto:false}]});
 d.persons.forEach(p=>{const ctx=S.emp&&p.who===S.emp?"emp":(S.thO&&p.who===S.thO)||(p.who&&p.who.kind==="th")?"th":"p";(p.blocks||[]).forEach(b=>{if(b.facts)b.facts=kbkArt(b.facts,ctx)})});
 /* owner 11/15 17:45Z: every subject keeps its OWN page, and EVERY page carries the full-length figure of its subject (KIT §36.5):
    Tổng lược → her own figure, a person → that person, Triều đình · thiên hạ → Hoàng thượng */
 P.push({kind:"text",title:"Tổng lược",sub:"Những điều chính của tuần qua",fig:S,blocks:b});
 P.push(...d.persons);
 if(d.world.length)P.push({kind:"text",title:"Triều đình · thiên hạ",fig:S.emp||null,blocks:[{facts:kbkArt(d.world.map(f=>Object.assign(f,{kind:"world"})),"world")}]});
 const nf=d.me.length+d.world.length+d.persons.reduce((a,p)=>a+p.n,0);
 P.push({kind:"end",title:"Tuần này đến đây là hết.",seal:["HẾT","TUẦN"],note:nf?`Sổ ghi ${nf} việc${d.persons.length?`, ${d.persons.length} người`:""}.`:"Một tuần yên ả.",btn:"Vào ngày mới",btnId:"dawn-go"});
 return {pages:P,head:`Tuần lục · ${date}`}}

/* ---------- the dawn: the book replaces the week panel; "Vào ngày mới" closes it and the day goes on ---------- */
(function(){if(typeof dawn!=="function")return;const old=dawn;
 dawn=function(){let built;try{built=wkBookPages()}catch(e){console.error(e);return old.apply(this,arguments)}
  S.wkSnap=wkSnap();try{const rt=$("rtoast");if(rt){rt.classList.remove("on");clearTimeout(window.__rtT)}document.body.classList.add("kbk-open")}catch(e){}let w=$("dawn");if(!w){w=document.createElement("div");w.id="dawn";w.className="dawn";document.body.appendChild(w)}
  w.classList.add("kbkdawn");w.onclick=null;w.innerHTML=`<div class="dsky"><i class="lan l1"></i><i class="lan l2"></i><i class="lan l3"></i><i class="sun"></i></div>`;w.classList.remove("kbkskyd");{const sk=w.querySelector(".dsky"),fz=()=>w.classList.add("kbkskyd");if(sk)sk.addEventListener("animationend",fz,{once:true});setTimeout(fz,3600)}
  w.hidden=false;w.classList.toggle("rm",reducedMotion());void w.offsetWidth;w.classList.add("on");
  const tok=w.__kbkTok={};const bk=kitBook({pages:built.pages,head:built.head,host:w,label:"Tuần lục",onClose:()=>{if(window.__kbk===bk)window.__kbk=null;/* F10: a closed book holds nothing (its sheets, pictures and page HTML were kept alive through window.__kbk until the next week) */if(w.__kbkTok!==tok)return;document.body.classList.remove("kbk-open");w.classList.remove("on");setTimeout(()=>{if(w.__kbkTok!==tok)return;w.hidden=true;w.innerHTML=""},reducedMotion()?0:350)}});
  window.__kbk=bk;setTimeout(bell,reducedMotion()?0:1400);try{w.querySelector(".kbk-next").focus({preventScroll:true})}catch(e){}}})();

(function(){const st=document.createElement("style");st.id="kbk-css";st.textContent=`
.dawn.kbkdawn{padding:0;overflow:hidden;align-items:stretch;justify-content:stretch}
/* owner 24/11 flight: the sky behind the book is STATIC once the book is open (its sunrise keyframe animation could restart on a page turn = a dark navy flash); same final colours as the end of @keyframes dsky */
.dawn.kbkdawn.kbkskyd .dsky{animation:none!important;background:linear-gradient(#f7e2c0,#f3c98f 55%,#e9a96a)!important;filter:none!important}
.kbk{position:absolute;inset:0;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:10px 10px max(8px,env(safe-area-inset-bottom));box-sizing:border-box;
 --paper:#f3e5c4;--paper2:#ead6ac;--rule:var(--k-seal,#9a2c1c);--cloth:#27324d;--cloth2:#1c2439;font-size:var(--fs,15px);animation:kbkin .9s ease both .5s}
@keyframes kbkin{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.dawn.rm .kbk{animation-duration:.01s;animation-delay:0s}
@media (prefers-reduced-motion:reduce){.kbk{animation:none}}
.kbk-measure{position:absolute;left:-99999px;top:0;visibility:hidden;pointer-events:none;contain:layout style}
.kbk-measure>.kbk-pg{position:relative;width:100%;height:100%}
.kbk-stage{display:flex;align-items:center;justify-content:center;width:100%;flex:0 0 auto}
/* review r6: ✕ above every sheet — kitBook stacks sheets at z = n*2-i (line ~111), so a book of 4+ sheets covered a z-index:6 ✕ */
.kbk>.kbk-x{position:absolute;top:max(10px,env(safe-area-inset-top));right:max(12px,env(safe-area-inset-right));z-index:999;box-shadow:0 2px 8px #2a1a1240}
.kbk-book{position:relative;width:var(--pw);height:var(--ph);transform-style:flat;touch-action:pan-y;user-select:none;-webkit-user-select:none;transition:transform .55s cubic-bezier(.3,.7,.3,1),opacity .06s}
.kbk.spread .kbk-book{width:calc(var(--pw) * 2)}
.kbk.spread .kbk-book.closed{transform:translateX(calc(var(--pw) * -.5))}
.kbk-book.fade{opacity:0}
/* boards behind the pages: cloth edges + page-stack lines */
.kbk-book::before{content:"";position:absolute;inset:-2px;border-radius:5px;background:linear-gradient(#e6d3ab,#c9ad7d);box-shadow:0 6px 18px #3a1e0a40}
.kbk.spread .kbk-book.closed::before{left:calc(50% - 7px)}
.kbk.single .kbk-book::before{left:-4px}
.kbk-book::after{content:"";position:absolute;top:2px;bottom:2px;right:-4px;width:4px;background:repeating-linear-gradient(90deg,#e9d8b4 0 1px,#bfa679 1px 2px);border-radius:0 2px 2px 0}
.kbk.single .kbk-book{margin-left:12px}
.kbk-sheet{position:absolute;top:0;left:0;width:100%;height:100%;transform-origin:0 50%;transform-style:preserve-3d;transition:none}
.kbk.spread .kbk-sheet{left:50%;width:50%}
.kbk-sheet.turn{will-change:transform}
.kbk-face{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;overflow:hidden}
.kbk-back{transform:rotateY(180deg)}
.kbk-sh{position:absolute;inset:0;pointer-events:none;opacity:0;z-index:5}
.kbk-front>.kbk-sh{background:linear-gradient(90deg,#3a210f66 0%,#3a210f22 35%,#fff6e01f 62%,#3a210f33 100%)}
.kbk-back>.kbk-sh{background:linear-gradient(270deg,#3a210f66 0%,#3a210f22 35%,#fff6e01f 62%,#3a210f33 100%)}
.kbk-cast{position:absolute;top:0;bottom:0;left:50%;width:50%;pointer-events:none;opacity:0;transform-origin:0 50%;z-index:9998;background:linear-gradient(90deg,#1a0d0599,#1a0d0533 45%,transparent)}
.kbk-cast.lft{transform-origin:100% 50%;background:linear-gradient(270deg,#1a0d0599,#1a0d0533 45%,transparent)}
.kbk.single .kbk-cast{width:100%}
.kbk.spread .kbk-cast.lft{left:0}
.kbk-gutter{display:none}
.kbk.spread .kbk-gutter{display:block;position:absolute;top:0;bottom:0;left:calc(50% - 2px);width:4px;background:linear-gradient(90deg,#00000030,#00000055,#00000030);pointer-events:none;z-index:9000}
.kbk.spread .kbk-book.closed .kbk-gutter{display:none}
/* the page */
.kbk-pg{position:absolute;inset:0;box-sizing:border-box;color:var(--ink);background:
 radial-gradient(ellipse 70% 50% at 25% 18%,#fbf3dd 0,transparent 70%),radial-gradient(ellipse 60% 45% at 85% 92%,#e2c995 0,transparent 70%),
 radial-gradient(circle at 78% 22%,#c9a46a1c 0 3%,transparent 6%),radial-gradient(circle at 18% 80%,#b8894a14 0 4%,transparent 8%),
 url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='2' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 .45 0 0 0 0 .3 0 0 0 0 .12 0 0 0 .09 0'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E"),
 linear-gradient(var(--paper),var(--paper2));box-shadow:inset 0 0 38px #8a5a2440}
.kbk-pg.r{border-radius:0 4px 4px 0}.kbk-pg.l{border-radius:4px 0 0 4px}
.kbk.spread .kbk-pg.r::after,.kbk.spread .kbk-pg.l::after{content:"";position:absolute;top:0;bottom:0;width:9%;pointer-events:none}
.kbk.spread .kbk-pg.r::after{left:0;background:linear-gradient(90deg,#5a3a1a40,transparent)}
.kbk.spread .kbk-pg.l::after{right:0;background:linear-gradient(270deg,#5a3a1a40,transparent)}
.kbk.single .kbk-pg.r::after{content:"";position:absolute;top:0;bottom:0;left:0;width:5%;background:linear-gradient(90deg,#5a3a1a33,transparent);pointer-events:none}
.kbk.art-right .kbk-pg.r:not(.k-cover):not(.k-end){background:url(${KBK_ART.right}) center/100% 100% no-repeat}
.kbk.art-left .kbk-pg.l{background:url(${KBK_ART.left}) center/100% 100% no-repeat}
.kbk.art-end .kbk-pg.k-end{background:url(${KBK_ART.end}) center/100% 100% no-repeat}
.kbk-in{position:absolute;inset:4.2% 5.5% 3.6%;display:flex;flex-direction:column;min-height:0}
.kbk:not(.art-right) .kbk-pg:not(.k-cover):not(.k-back) .kbk-in{border:2px solid var(--rule);outline:1px solid var(--rule);outline-offset:3px;padding:.7em .85em .45em}
.kbk.art-right .kbk-pg.r .kbk-in{inset:5.2% 5.8% 4.4% 8.4%}
.kbk.art-left .kbk-pg.l .kbk-in{inset:5.2% 8.4% 4.4% 5.8%}
.kbk.art-right .kbk-pg{box-shadow:inset 0 0 24px #8a5a2430}
.kbk.art-right .kbk-pg.k-cover{box-shadow:none}
.kbk.art-end .kbk-pg.k-end .kbk-seal{position:absolute;left:78.6%;top:84.6%;width:19.9%;height:14.3%;margin:0;transform:rotate(-5deg);font-size:min(2.6cqw,1em);container-type:size}
.kbk.art-end .kbk-pg.k-end .kbk-in{container-type:size}
.kbk.art-end .kbk-pg.k-end .kbk-seal i{font-size:max(1.1em,24cqh)}
.kbk.art-cover .kbk-label{position:absolute;left:9.1%;top:3.6%;width:13.8%;height:57.7%;min-width:0;max-width:none;background:none;border:0;outline:0;box-shadow:none;padding:0;container-type:size;justify-content:center;align-items:center}
.kbk.art-cover .kbk-lt{display:flex;flex-direction:column;align-items:center;gap:.25em;font-size:min(24cqw,11cqh);letter-spacing:0;line-height:1.05}
/* review/small-bugs-3: the text fallback of the cover label (no title picture) keeps a margin: a 4–5 letter word ("Tuần", "Hoàng") ≤ ~3/4 of the
   narrow label (was 36cqw: "Tuần" 62 of 66 px at 1000x755) */
.kbk-ltimg{display:none}
.kbk.art-cover.art-title .kbk-label:has(.kbk-ltimg){justify-content:flex-start}
.kbk.art-cover.art-title .kbk-ltimg{display:block;flex:0 0 auto;width:calc(100% - 12px);height:calc(100% - 20px);margin:10px auto 0;object-fit:contain;object-position:50% 0;pointer-events:none;-webkit-user-drag:none}
.kbk.art-cover.art-title .kbk-lt.has-img{display:none}
.kbk.art-cover .kbk-cmeta{position:absolute;left:28%;right:8%;top:5%;text-align:left;align-items:flex-start}
.kbk.art-cover .kbk-cn{text-align:left}
.kbk.art-cover .kbk-hint{left:26%;right:6%}
.kbk.art-cover .kbk-cv{padding:9% 8% 7% 26%}
.kbk-rh{flex:0 0 auto;text-align:center;font-family:var(--display);font-size:.72em;letter-spacing:.06em;color:var(--rule);padding-bottom:.3em;margin-bottom:.45em;border-bottom:1px solid #9a2c1c55}
.kbk-body{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;overflow:hidden}
.kbk-fo{flex:0 0 auto;text-align:center;font-family:var(--display);font-size:.72em;color:#8a5a3a;padding-top:.25em}
.kbk-fo::before,.kbk-fo::after{content:"—";margin:0 .5em;color:#9a2c1c88}
.kbk-flow{flex:1 1 auto;min-height:0;overflow:hidden;display:flex;flex-direction:column;gap:0}
.kbk-th{flex:0 0 auto;margin:0 0 .5em}
.kbk-t{margin:0;font-family:var(--display);font-size:1.32em;color:var(--rule);line-height:1.2}
.kbk-cont{font-family:var(--body);font-size:.6em;color:var(--dim);font-weight:400}
.kbk-ts{display:block;color:var(--dim);font-size:.8em;margin-top:.15em}
.kbk-pc{display:flex;align-items:center;gap:.5em}.kbk-pc .kbk-t{font-size:1.1em}
.kbk-pg h4.kbk-h{margin:.6em 0 .3em;font-family:var(--display);font-size:.8em;letter-spacing:.08em;text-transform:uppercase;color:var(--rule);display:flex;align-items:center;gap:.4em}
.kbk-pg h4.kbk-h::after{content:"";flex:1;height:1px;background:#9a2c1c44}
.kbk-flow>h4.kbk-h:first-child{margin-top:0}
.kbk-pg .kfacts{gap:0;margin:0}
.kbk-pg .kfact{padding:.32em .1em;border-bottom:1px dashed #9a2c1c33;background:transparent!important;border-radius:0;font-size:1em}
.kbk-pg .kft{font-size:.92em;line-height:1.42}
.kbk-pg .kb{font-size:.9em;margin:.1em 0 .25em}
.kbk-pg .kchips{margin:.15em 0 .3em}
.kbk-pg .kchip{background:#fffaf0cc}
.kbk-pg .kname{color:color-mix(in srgb,var(--rc,#2a1a12) 50%,#2a1a12)!important}/* the title keeps its rank tone (KIT 48.3) */
.kbk-pg .kfact:has(>.kfdot){grid-template-columns:.6em minmax(0,1fr);gap:.55em}
.kbk-pg .kfdot{width:.5em;height:.5em;border-radius:1px;background:var(--rule);border:0;transform:rotate(45deg);margin-top:.62em;opacity:.8}
/* KIT §36.1 people-chip list (owner 11/15 04:25Z + 08:10Z): ONE grid of equal columns that line up across rows; every portrait the same
   cell size; the name left beside it, wrapping inside its own cell */
.kbk-toc{display:grid;grid-template-columns:repeat(auto-fill,minmax(min(100%,11.5em),1fr));gap:.3em .8em;font-size:.9em;margin:.1em 0 .2em}
.kbk-tc{display:flex;align-items:center;gap:.4em;min-width:0}
.kbk-tc>span.md,.kbk-tc>.md{flex:0 0 auto;width:26px!important;min-width:26px!important;max-width:26px!important}
.kbk-tc>:last-child{min-width:0;overflow-wrap:anywhere;line-height:1.2}
/* person page: large kit portrait (3:4 frame), name + chips + rows beside it, facts below/beside */
.kbk-person{flex:1 1 auto;min-height:0;display:grid;grid-template-columns:var(--por) minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);grid-template-areas:"por head" "por flow";gap:.2em 1em}
.kbk-por{grid-area:por;align-self:start}
.kbk-por .pfwrap{width:100%!important;max-width:none!important;margin:0!important;float:none!important;display:block}
.kbk-por .pfr,.kbk-por .pcp{width:100%!important;max-width:none!important;max-height:none!important;height:auto!important;margin:0!important;float:none!important}
.kbk-por .pfrw{display:none}
.kbk-phead{grid-area:head;min-width:0}
.kbk-person>.kbk-flow{grid-area:flow}
.kbk.narrow .kbk-person{grid-template-areas:"por head" "flow flow";grid-template-rows:auto minmax(0,1fr)}
/* full-page figure (owner 04:30Z): the figure column spans the whole page body; the figure's height = the body height (men ×1, women
   ×1/KIT_FIG.man through --kfr); the text column beside it scrolls into a "(tiếp theo)" page, the figure never shrinks */
.kbk-person.kbk-full,.kbk.narrow .kbk-person.kbk-full{grid-template-columns:var(--porf) minmax(0,1fr);grid-template-areas:"por head" "por flow";grid-template-rows:auto minmax(0,1fr);height:100%}
.kbk-person.kbk-full>.kbk-phead{box-sizing:border-box;padding-right:52px}/* KIT 34.6 r5: room for the mood seal slot (jfigseal), the same on every page */
.kbk-person.kbk-full>.kbk-por{align-self:stretch;height:100%;min-height:0;position:relative;display:flex;justify-content:flex-start;align-items:flex-end;overflow:visible}
.kbk-person.kbk-full>.kbk-por{z-index:0}.kbk-person.kbk-full>.kbk-phead,.kbk-person.kbk-full>.kbk-flow{position:relative;z-index:1}/* KIT 56.3: the figure (transparent) may spread under the text; the text is drawn ON TOP */
.kbk-person.kbk-full>.kbk-por>.kesf{height:100%;margin:0;display:flex;flex-direction:column;justify-content:flex-end;align-items:flex-start;min-height:0;max-width:100%}
.kbk-person.kbk-full>.kbk-por .kesfi{display:block;position:relative;height:calc(100% * var(--kfr,1));width:auto;max-width:none;flex:0 0 auto}
.kbk-person.kbk-full>.kbk-por .kesfi>.kesimg{display:block;height:100%!important;width:auto!important;max-width:none!important;max-height:none!important}
/* phones: same narrow column, figure fitted into it (the text never sits on the figure, so no paper panel) */
.kbk.narrow .kbk-person.kbk-full .kbk-pair{white-space:normal!important}.kbk.narrow .kbk-person.kbk-full .krv{min-width:0;overflow-wrap:anywhere}
.kbk-pname{font-family:var(--display);font-size:1.4em;line-height:1.25;margin:.1em 0 .25em;padding-bottom:.25em;border-bottom:2px solid #9a2c1c55}
.kbk-pname .kname{font-weight:700}
.kbk-pchips .kchips{margin:.1em 0 .35em}
/* "Hiện nay": a label never parts from its number */
.kbk-pg .krv>.kbk-pair{white-space:nowrap}
.kbk.narrow .kbk-flow>.kb:first-child{margin:0 0 .35em;padding-bottom:.3em;border-bottom:1px dashed #9a2c1c33}
/* event art beside each fact (j89 evArtOf): a small print pasted in the ledger */
.kbk-ev{display:grid;grid-template-columns:minmax(0,1fr) 3em;gap:.55em;align-items:start;border-bottom:1px dashed #9a2c1c33}
.kbk-ev>.kfacts .kfact{border-bottom:0}
.kbk-evart{display:block;width:3em;height:4em;object-fit:cover;margin:.3em 0;padding:2px;background:var(--k-card,#fffaf0);border:1px solid #9a2c1c88;box-shadow:0 1px 3px #3a210f55;transform:rotate(1.2deg)}
.kbk-ev:nth-child(even) .kbk-evart{transform:rotate(-1deg)}
body.kbk-open #rtoast,body:has(#dawn.kbkdawn:not([hidden])) #rtoast{opacity:0!important;visibility:hidden!important;pointer-events:none!important}
/* cover: indigo cloth, thread binding, title label */
.kbk-pg.k-cover{background:repeating-linear-gradient(45deg,#ffffff08 0 2px,transparent 2px 5px),repeating-linear-gradient(-45deg,#00000014 0 2px,transparent 2px 5px),radial-gradient(ellipse at 40% 30%,#34405f,var(--cloth2));box-shadow:inset 0 0 50px #0008;border-radius:0 5px 5px 0}
.kbk.art-cover .kbk-pg.k-cover{background:url(${KBK_ART.cover}) center/100% 100% no-repeat}
.kbk.art-cover .kbk-stitch{display:none}
.kbk .kbk-pg.k-cover .kbk-in{inset:0!important;padding:0!important;border:0!important;outline:0!important}
.kbk-cv{position:absolute;inset:0;display:flex;flex-direction:column;align-items:flex-end;padding:9% 9% 7% 18%;box-sizing:border-box}
.kbk-stitch{position:absolute;left:0;top:0;bottom:0;width:11%;border-right:1px solid #ffffff22;background:
 linear-gradient(90deg,#00000044,transparent 30%),
 repeating-linear-gradient(180deg,transparent 0 calc(25% - 7px),#eadcbf calc(25% - 7px) calc(25% - 5px),transparent calc(25% - 5px) 25%)}
.kbk-stitch::before{content:"";position:absolute;top:0;bottom:0;left:52%;width:2px;background:#eadcbfcc;box-shadow:0 0 1px #000}
.kbk-label{background:linear-gradient(#f6ead2,#ecdcb8);border:2px solid var(--rule);outline:1px solid var(--rule);outline-offset:3px;padding:1.1em .9em;min-width:46%;max-width:62%;text-align:center;box-shadow:0 4px 10px #0006;display:flex;flex-direction:column;gap:.5em}
.kbk-lt{font-family:var(--display);color:var(--rule);font-size:2.1em;letter-spacing:.08em;line-height:1.15}
.kbk-ls{font-family:var(--display);font-size:.9em;color:var(--ink);line-height:1.35}
.kbk-cmeta{display:flex;flex-direction:column;align-items:flex-end;gap:.35em;margin-top:.9em}
.kbk-cmeta .kbk-ls{color:#f3e5c4;font-family:var(--display);font-size:1.05em}
.kbk-cn{color:#eadcbf;font-family:var(--display);font-size:.9em;text-align:right}
.kbk-cseal{margin-top:auto;align-self:flex-end;font-family:var(--display);font-size:1em;color:#fff4dc;background:var(--rule);border:2px solid #fff4dc55;outline:2px solid var(--rule);padding:.45em .5em;letter-spacing:.1em;transform:rotate(-4deg)}
.kbk-hint{position:absolute;left:18%;right:9%;bottom:3%;text-align:center;color:#eadcbfcc;font-size:.78em}
/* the cover seal clears the page-turn hint even when the hint wraps to two lines (narrow covers, e.g. 844x390): hint = bottom 3% of the page + up to 2 lines;
   the seal sits on the 7%-of-width bottom padding, so it is lifted by the difference (cq units of the cover .kbk-in) */
.kbk .kbk-pg.k-cover .kbk-in{container-type:size}
.kbk .kbk-pg.k-cover .kbk-cseal{margin-bottom:max(0px,calc(3cqh + 2.2em + 4px - 7cqw))}
/* closing page */
.kbk-end{flex:1;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:1em;padding:0 .5em}
.kbk-et{margin:0;font-family:var(--display);font-size:1.6em;color:var(--ink);line-height:1.3}
.kbk-seal{display:grid;grid-template-columns:1fr;place-items:center;width:5.6em;height:5.6em;box-sizing:border-box;background:#a8301e;color:#fff1dc;font-family:var(--display);font-weight:800;font-size:1.05em;letter-spacing:.12em;line-height:1.05;
 border:3px solid #fff1dc66;outline:3px solid #a8301e;transform:rotate(-7deg);border-radius:6px;padding:.4em;
 -webkit-mask-image:radial-gradient(circle at 30% 30%,#000 0 60%,#000c 80%,#0009);mask-image:radial-gradient(circle at 30% 30%,#000 0 60%,#000c 80%,#0009);box-shadow:inset 0 0 12px #5a0e0688}
.kbk-seal i{font-style:normal;font-size:1.35em}
.kbk-en{margin:0;color:var(--dim);font-size:.9em}
.kbk-orn{display:block;width:154px;height:10px;background:radial-gradient(circle,var(--rule) 0 3px,transparent 4px) center/14px 10px repeat-x;opacity:.55}
.kbk-blank{flex:1;display:flex;align-items:center;justify-content:center}
.kbk-pg.k-back,.kbk-pg.k-verso{background:linear-gradient(var(--paper),var(--paper2))}
.kbk-pg.k-verso .kbk-in{border:0!important;outline:0!important}
/* bar */
.kbk-bar{flex:0 0 auto;display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:nowrap;color:#f3e5c4}
.kbk-nav{width:44px;height:40px;border-radius:8px;border:1px solid var(--line);background:var(--k-card);color:var(--rule,#9a2c1c);font-size:1.5rem;line-height:1;cursor:pointer;font-family:var(--display)}
.kbk-nav:disabled{opacity:.45;cursor:default}
.kbk-no{min-width:8.5em;text-align:center;font-family:var(--display);font-size:.9rem;font-weight:600;color:#fff3d6;background:#1c2439e6;border:1px solid #c9a46a88;border-radius:20px;padding:.45em .9em;white-space:nowrap}
.kbk-bar .kbtn.alt{min-height:40px;padding:6px 16px}
`;document.head.appendChild(st)})();

/* owner 11/15 (Tuần lục cut off): no text is ever clipped. Entries flow to the next page; a single entry longer than a page scrolls
   inside its own text column (k-scroll). Stat chips inside running text never break inside ("Tần Liễu Họa / Mi Sủng −1 0"):
   they stay on one line, and a long one (a name + a number) reads as plain coloured text instead of a chip. */
(function(){const st=document.createElement("style");st.id="kbk-noclip";st.textContent=`
.kbk-pg.k-scroll .kbk-flow{overflow-y:auto!important;overscroll-behavior:contain;touch-action:pan-y;scrollbar-width:thin}
.kbk .kbk-flow .ef,.kbk .kbk-flow .kchip{white-space:nowrap}
.kbk .kbk-flow .ef.kbk-long,.kbk .kbk-flow .kchip.kbk-long{white-space:normal;background:none!important;border:0!important;box-shadow:none!important;padding:0!important;display:inline!important;border-radius:0!important}
`;document.head.appendChild(st)})();
function kbkLongChips(root){try{(root||document).querySelectorAll(".kbk .kbk-flow .ef:not(.kbk-long),.kbk .kbk-flow .kchip:not(.kbk-long)").forEach(c=>{if((c.textContent||"").trim().length>16)c.classList.add("kbk-long")})}catch(e){}}
(function(){const k0=kbkExpand;kbkExpand=function(){const out=k0.apply(this,arguments);try{const t=document.createElement("template");for(const b of out){if(!b||!b.html||!/class="(ef|kchip)/.test(b.html))continue;t.innerHTML=b.html;t.content.querySelectorAll(".ef,.kchip").forEach(c=>{if((c.textContent||"").trim().length>16)c.classList.add("kbk-long")});b.html=t.innerHTML}}catch(e){}return out}})();

/* ---- relations inside entries (owner 11/15 15:30Z + 16:50Z: kit only): a relation change written by the log ("Hoàng hậu quý ngươi -3",
   "nàng oán ngươi +9", "ghen +25", "thân +7") is redrawn by the kit's kitRelDelta (KIT §52) with the KIT_REL words ("Nàng → ta: thiện cảm",
   "Nàng oán ta", "Nàng ghen"); NPC ↔ NPC ("thân +7") reads "thiện cảm +7". Whole numbers. */
const KBK_RELRE=/^(.*?)\b(quý ngươi|quý ta|thân|thiện cảm|oán ngươi|oán ta|ghen)\s*([+\-−]\s?\d+(?:[.,]\d+)?)$/i;
function kbkRelInline(root){root.querySelectorAll(".ef,.kchip").forEach(c=>{const t=(c.textContent||"").replace(/\s+/g," ").trim();const m=KBK_RELRE.exec(t);if(!m)return;
 const w=m[2].toLowerCase();const v=Math.round(+m[3].replace("−","-").replace(/\s/g,"").replace(",","."));let who=m[1].replace(/[\s:,→]+$/,"").trim();
 const toMe=/ngươi|ta$/.test(w)||w==="ghen";if(/^(nàng|nàng ta|nàng ấy)$/i.test(who))who="Nàng";
 let lab;if(!toMe)lab="thiện cảm";else if(/oán/.test(w))lab=`${who||"Nàng"} oán ta`;else if(w==="ghen")lab=`${who||"Nàng"} ghen`;else lab=`${who||"Nàng"} → ta: thiện cảm`;
 const tmp=document.createElement("template");tmp.innerHTML=kitRelDelta(lab,toMe?"them":"none",v,/oán|ghen/.test(w)?"bad":"good");c.replaceWith(tmp.content.firstChild)})}
(function(){const k0=kbkExpand;kbkExpand=function(){const out=k0.apply(this,arguments);try{const t=document.createElement("template");for(const b of out){if(!b||!b.html||!/class="(ef|kchip)/.test(b.html))continue;t.innerHTML=b.html;kbkRelInline(t.content);b.html=t.innerHTML}}catch(e){}return out}})();
/* an entry that is only a name ("Hoàng hậu Chu Thục Nghi.") says nothing: dropped */
(function(){const k0=kbkExpand;kbkExpand=function(){return k0.apply(this,arguments).filter(b=>{if(!b||!b.html)return !!b;const t=String(b.html).replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().replace(/[.·:]+$/,"");
  if(!t)return false;try{const P=[S].concat(typeof rivals!=="undefined"?rivals:[]).filter(Boolean);for(const p of P){const nm=p.name||"";if(nm&&(t===nm||t.endsWith(" "+nm))&&t.split(" ").length<=nm.split(" ").length+2)return false}}catch(e){}return true})}})();
