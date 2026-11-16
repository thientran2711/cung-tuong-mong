
/* ================= WEEK REPORT FLIP-BOOK (j87) — KIT component kitBook({pages,onClose}) =================
   The week summary (dawn) is an old ledger she turns page by page: cover → Tổng lược → one page per person
   (large kit portrait) → Triều đình · thiên hạ → closing page "Tuần này đến đây là hết." with a seal.
   Two-page spread on landscape tablets, one page at a time on portrait screens. Pages never scroll: content that
   does not fit continues on the next page ("tiếp theo"). Drag/swipe turns the page in 3D (perspective + shade + cast
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
const KBK_ART={cover:"img/book-cover.webp",left:"img/book-left.webp",right:"img/book-right.webp",end:"img/book-end.webp"};
const KBK_HAVE={};
(function(){for(const [k,u] of Object.entries(KBK_ART)){try{const im=new Image();im.onload=()=>{KBK_HAVE[k]=true;document.querySelectorAll(".kbk").forEach(r=>{r.classList.add("art-"+k);if(r.__kbk)r.__kbk.relayout()})};im.src=u}catch(e){}}})();

function kbkSfx(){try{if(typeof auOk!=="function"||!auOk())return;const C=window.__bellCtx||(window.__bellCtx=new (window.AudioContext||window.webkitAudioContext)());const t=C.currentTime,n=Math.floor(C.sampleRate*.28);
 const buf=C.createBuffer(1,n,C.sampleRate),d=buf.getChannelData(0);for(let i=0;i<n;i++){const e=i/n;d[i]=(Math.random()*2-1)*Math.pow(1-e,2)*(e<.08?e/.08:1)}
 const s=C.createBufferSource();s.buffer=buf;const f=C.createBiquadFilter();f.type="bandpass";f.frequency.value=2400;f.Q.value=.7;const g=C.createGain();g.gain.value=.09*((typeof OPT!=="undefined"&&OPT.sfx!=null)?OPT.sfx:1);
 s.connect(f).connect(g).connect(C.destination);s.start(t)}catch(e){}}

/* one block → HTML. string | {h} | {facts} | {rows} | {chips} | {html} ; facts expand into one block per fact so pages can split */
function kbkExpand(blocks,skip){const out=[];for(const b of (blocks||[])){if(!b)continue;if(typeof b==="string"){out.push({html:b});continue}
  if(b.h){out.push({html:`<h4 class="kpst kbk-h">${b.h}</h4>`,head:true});continue}
  if(b.facts){const prev=window.__kpSkip;window.__kpSkip=skip||prev;try{for(const f of b.facts){const h=kitFacts([f],{group:false});
    out.push({html:f&&f.art?`<div class="kbk-ev">${h}<img class="kbk-evart" src="${f.art}" alt="${f.artT||""}" title="${f.artT||""}" decoding="async" onerror="this.remove()"></div>`:h})}}finally{window.__kpSkip=prev}continue}
  if(b.rows){out.push({html:kitRows(b.rows)});continue}
  if(b.chips){out.push({html:b.chips.length?kitChips(b.chips):`<span class="kchips"><span class="kchip n">${b.none||"Không đổi gì"}</span></span>`});continue}
  if(b.html)out.push({html:b.html,head:!!b.head})}
 return out}

function kitBook(spec){spec=spec||{};const rm=()=>{try{return reducedMotion()}catch(e){return false}};
 const root=document.createElement("div");root.className="kbk";root.setAttribute("role","dialog");root.setAttribute("aria-label",spec.label||"Sổ tuần");
 for(const k of Object.keys(KBK_ART))if(KBK_HAVE[k])root.classList.add("art-"+k);
 root.innerHTML=`<div class="kbk-stage"><div class="kbk-book"></div></div><div class="kbk-bar"><button class="kbk-nav kbk-prev" aria-label="Trang trước">‹</button><span class="kbk-no" aria-live="polite"></span><button class="kbk-nav kbk-next" aria-label="Trang sau">›</button><button class="kbtn alt kbk-x">${spec.closeLabel||"Lui"}</button></div><div class="kbk-measure" aria-hidden="true"></div>`;
 (spec.host||document.body).appendChild(root);
 const book=root.querySelector(".kbk-book"),stage=root.querySelector(".kbk-stage"),meas=root.querySelector(".kbk-measure"),noEl=root.querySelector(".kbk-no");
 let mode="single",PW=0,PH=0,leaves=[],sheets=[],cur=0,maxCur=0,busy=false,closed=false,logical=0;

 /* ---- page shells ---- */
 const head=spec.head||"";
 const shell=(cls,inner,folio)=>`<div class="kbk-pg ${cls}"><div class="kbk-in">${head&&!/k-cover|k-blank|k-back/.test(cls)?`<div class="kbk-rh">${head}</div>`:""}<div class="kbk-body">${inner}</div>${folio?`<div class="kbk-fo">${folio}</div>`:""}</div></div>`;
 const coverH=p=>`<div class="kbk-cv"><div class="kbk-stitch"></div><div class="kbk-label"><b class="kbk-lt">${String(p.title||"Sổ tuần").split(" ").map(w=>`<span>${w}</span>`).join(" ")}</b></div><div class="kbk-cmeta">${p.sub?`<span class="kbk-ls">${p.sub}</span>`:""}${p.note?`<span class="kbk-cn">${p.note}</span>`:""}</div><b class="kbk-cseal">${p.seal||"TUẦN"}</b><span class="kbk-hint">${p.hint||"Vuốt trang hoặc chạm mép phải để lật"}</span></div>`;
 const endH=p=>`<div class="kbk-end"><span class="kbk-orn"></span><h3 class="kbk-et">${p.title||"Tuần này đến đây là hết."}</h3><b class="kbk-seal" aria-label="${(p.seal||["HẾT","TUẦN"]).join(" ")}">${(p.seal||["HẾT","TUẦN"]).map(s=>`<i>${s}</i>`).join("")}</b>${p.note?`<p class="kbk-en">${p.note}</p>`:""}<button class="kbtn kbk-go" id="${p.btnId||"kbk-go"}">${p.btn||"Đã hiểu"}</button></div>`;
 const blankH=()=>`<div class="kbk-blank"><span class="kbk-orn"></span></div>`;
 const textTop=(p,cont)=>`<div class="kbk-th"><h3 class="kbk-t">${p.title||""}${cont?` <small class="kbk-cont">tiếp theo</small>`:""}</h3>${p.sub&&!cont?`<small class="kbk-ts">${p.sub}</small>`:""}</div>`;
 const personTop=(p,cont)=>cont?`<div class="kbk-th kbk-pc">${kitFaceH(p.who,"sm")}<h3 class="kbk-t">${kitName(p.who,{cap:true,named:p.who===S})} <small class="kbk-cont">tiếp theo</small></h3></div>`
   :`<div class="kbk-pname">${kitName(p.who,{cap:true,named:p.who===S})}${p.sub?`<small class="kbk-ts">${p.sub}</small>`:""}</div>${p.chips&&p.chips.length?`<div class="kbk-pchips">${kitChips(p.chips)}</div>`:""}${p.rows&&p.rows.length&&PW>=440?kitRows(p.rows):""}`;
 const personBody=(p,cont)=>cont?`${personTop(p,true)}<div class="kbk-flow"></div>`:`<div class="kbk-person"><div class="kbk-por">${pframe(kitFace(p.who))}</div><div class="kbk-phead">${personTop(p,false)}</div><div class="kbk-flow"></div></div>`;

 /* ---- pagination: fill each page until it overflows, continue on the next ---- */
 function paginate(){const L=[];meas.style.width=PW+"px";meas.style.height=PH+"px";
  for(const p of (spec.pages||[])){
   if(p.kind==="cover"){L.push({cls:"k-cover",html:coverH(p),kind:"cover"});continue}
   if(p.kind==="end"){L.push({cls:"k-end",html:endH(p),kind:"end",folio:true});continue}
   const isP=p.kind==="person"&&p.who;const blocks=kbkExpand(p.blocks,isP?p.who:null);let i=0,first=true;
   if(isP&&PW<440&&p.rows&&p.rows.length)blocks.unshift({html:kitRows(p.rows)});
   do{meas.innerHTML=shell(isP?"k-person r":"k-text r",isP?personBody(p,!first):`${textTop(p,!first)}<div class="kbk-flow"></div>`,"0");
    const flow=meas.querySelector(".kbk-flow");const over=()=>flow.scrollHeight>flow.clientHeight+1;let n=0;
    while(i<blocks.length){flow.insertAdjacentHTML("beforeend",blocks[i].html);if(over()&&n>0){flow.lastElementChild.remove();break}i++;n++}
    while(n>1&&i<blocks.length&&blocks[i-1]&&blocks[i-1].head){flow.lastElementChild.remove();i--;n--}
    L.push({cls:isP?"k-person":"k-text",html:meas.querySelector(".kbk-body").innerHTML,kind:p.kind,folio:true,src:p});first=false}while(i<blocks.length);
  }
  meas.innerHTML="";return L}

 /* ---- layout: spread on landscape tablets, single page otherwise ---- */
 function layout(keep){const W=root.clientWidth||innerWidth,H=root.clientHeight||innerHeight;const bar=root.querySelector(".kbk-bar").offsetHeight||48;
  const aw=W-(W<600?20:40),ah=H-bar-(H<700?18:30);const spread=W>=900&&W/H>=1.15;mode=spread?"spread":"single";
  if(spread){PH=Math.min(ah,Math.floor(aw/2/.7));PW=Math.min(Math.floor(aw/2),Math.floor(PH*.76))}
  else{const sp=W<600?8:12;PW=Math.min(aw-sp,Math.floor(ah*.74));PH=Math.min(ah,Math.floor(PW/.5));PW=Math.floor(PW)}
  root.classList.toggle("spread",spread);root.classList.toggle("single",!spread);root.classList.toggle("narrow",PW<440);
  root.style.setProperty("--pw",PW+"px");root.style.setProperty("--ph",PH+"px");root.style.setProperty("--fs",Math.max(13,Math.min(17,PW/34)).toFixed(2)+"px");
  root.style.setProperty("--por",Math.round(Math.min(PW*(PW<440?.42:.4),PH*.62*480/1037))+"px");
  leaves=paginate();
  /* page numbers (cover has none) */
  let no=0;leaves.forEach(l=>{if(l.kind!=="cover")l.no=++no});
  /* sheets */
  sheets=[];if(spread){const P=leaves.slice();const endI=P.findIndex(l=>l.kind==="end");
    if(endI>0&&endI%2===1)P.splice(endI,0,{cls:"k-blank",html:blankH(),kind:"blank"});
    for(let i=0;i<P.length;i+=2)sheets.push({front:P[i],back:P[i+1]||{cls:"k-back",html:"",kind:"back"}});
    maxCur=Math.max(0,sheets.length-1);if(sheets.length&&sheets[sheets.length-1].front.kind!=="end"&&sheets[sheets.length-1].back.kind!=="back")maxCur=sheets.length}
  else{for(const l of leaves)sheets.push({front:l,back:{cls:"k-verso",html:blankH(),kind:"verso"}});maxCur=Math.max(0,sheets.length-1)}
  book.innerHTML=sheets.map((s,i)=>`<div class="kbk-sheet" data-i="${i}"><div class="kbk-face kbk-front">${shell(s.front.cls+" r",s.front.html,s.front.folio?String(s.front.no||""):"")}<i class="kbk-sh"></i></div><div class="kbk-face kbk-back">${shell(s.back.cls+" l",s.back.html,s.back.folio?String(s.back.no||""):"")}<i class="kbk-sh"></i></div></div>`).join("")+`<i class="kbk-cast"></i><i class="kbk-gutter"></i>`;
  book.querySelectorAll(".kbk-go").forEach(b=>b.onclick=e=>{e.stopPropagation();close()});
  /* restore position by logical page */
  cur=0;if(keep!=null){for(let i=0;i<sheets.length;i++){const s=sheets[i];if(s.front.src===keep||s.back.src===keep||s.front.kind===keep||s.back.kind===keep){cur=spread&&s.back.src===keep?i+1:i;break}}cur=Math.min(cur,maxCur)}
  paint()}
 const sheetEls=()=>book.querySelectorAll(".kbk-sheet");
 function paint(){const els=sheetEls();const n=els.length;
  els.forEach((el,i)=>{const fl=i<cur;el.style.transform=fl?"rotateY(-180deg)":"";el.style.zIndex=fl?String(i+1):String(n*2-i);
   const near=mode==="spread"?(i>=cur-2&&i<=cur+1):(i>=cur-1&&i<=cur+1);el.style.visibility=near&&!(mode==="single"&&fl)?"visible":"hidden";
   el.classList.remove("turn");el.querySelectorAll(".kbk-sh").forEach(s=>s.style.opacity="")});
  const cast=book.querySelector(".kbk-cast");if(cast){cast.style.opacity="0"}
  book.classList.toggle("closed",mode==="spread"&&cur===0);book.classList.toggle("atend",mode==="spread"&&cur>=sheets.length);
  const s=sheets[cur]||sheets[sheets.length-1];let label="";
  if(mode==="spread"){const a=cur>0?sheets[cur-1].back:null,b=sheets[cur]?sheets[cur].front:null;const nums=[a,b].filter(x=>x&&x.no).map(x=>x.no);label=b&&b.kind==="cover"?"Bìa sổ":nums.length?`Trang ${nums.join("–")}`:"" }
  else label=s&&s.front.kind==="cover"?"Bìa sổ":s&&s.front.no?`Trang ${s.front.no}`:"";
  const tot=leaves.filter(l=>l.no).length;noEl.textContent=label+(label&&label!=="Bìa sổ"?` / ${tot}`:"");
  root.querySelector(".kbk-prev").disabled=cur<=0;root.querySelector(".kbk-next").disabled=cur>=maxCur;
  logical=(sheets[cur]&&(sheets[cur].front.src||sheets[cur].front.kind))||null}

 /* ---- the turn: p = 0 (flat, right) … 1 (turned, left) ---- */
 function setTurn(el,p){const a=-180*p;el.style.transform=`perspective(${Math.round(PW*3.2)}px) rotateY(${a.toFixed(2)}deg)`;const sh=el.querySelectorAll(".kbk-sh");
  const s=Math.sin(Math.PI*p);if(sh[0])sh[0].style.opacity=String(Math.min(1,p*1.6)*.85);if(sh[1])sh[1].style.opacity=String((1-p)*.85);
  const cast=book.querySelector(".kbk-cast");if(cast){const c=Math.cos(Math.PI*p);
   if(p<.5){cast.style.left=mode==="spread"?"50%":"0";cast.style.transform=`scaleX(${Math.max(.02,c).toFixed(3)})`;cast.classList.remove("lft")}
   else{cast.style.left=mode==="spread"?"0":"0";cast.style.transform=`scaleX(${Math.max(.02,-c).toFixed(3)})`;cast.classList.add("lft")}
   cast.style.opacity=(mode==="single"&&p>=.5?0:s*.9).toFixed(3)}}
 function beginTurn(i){const els=sheetEls();const el=els[i];if(!el)return null;el.style.visibility="visible";el.style.zIndex="9999";el.classList.add("turn");
  for(let k=i-2;k<=i+2;k++)if(els[k])els[k].style.visibility="visible";if(mode==="single"&&els[i+1]&&i===cur)els[i+1].style.visibility="visible";
  if(mode==="spread")book.classList.remove("closed","atend");return el}
 const ease=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2,easeOut=t=>1-Math.pow(1-t,3);
 let animId=0;
 function animate(i,from,to,dur,fn,done){const el=beginTurn(i);if(!el){done&&done();return}busy=true;const t0=performance.now(),id=++animId;
  const step=now=>{if(id!==animId)return;const t=Math.min(1,(now-t0)/dur);setTurn(el,from+(to-from)*fn(t));if(t<1)requestAnimationFrame(step);else{busy=false;done&&done()}};requestAnimationFrame(step)}
 function fade(nc){busy=true;book.classList.add("fade");setTimeout(()=>{cur=nc;paint();book.classList.remove("fade");setTimeout(()=>{busy=false},160)},160)}
 function next(){if(busy||cur>=maxCur)return;kbkSfx();if(rm()){fade(cur+1);return}const i=cur;animate(i,0,1,720,ease,()=>{cur=i+1;paint()})}
 function prev(){if(busy||cur<=0)return;kbkSfx();if(rm()){fade(cur-1);return}const i=cur-1;animate(i,1,0,720,ease,()=>{cur=i;paint()})}
 function go(n){animId++;busy=false;drag=null;n=Math.max(0,Math.min(maxCur,n));cur=n;paint()}

 /* ---- drag / swipe / tap ---- */
 let drag=null;
 book.addEventListener("pointerdown",e=>{if(busy||closed||e.button>0)return;if(e.target.closest(".kgl,.kodm,button,a"))return;
  const r=book.getBoundingClientRect();drag={x0:e.clientX,y0:e.clientY,r,id:e.pointerId,dir:0,el:null,p:0,hist:[[performance.now(),e.clientX]],side:(e.clientX-r.left)/r.width}});
 book.addEventListener("pointermove",e=>{if(!drag||e.pointerId!==drag.id)return;const dx=e.clientX-drag.x0,dy=e.clientY-drag.y0;drag.hist.push([performance.now(),e.clientX]);if(drag.hist.length>8)drag.hist.shift();
  if(!drag.dir){if(Math.abs(dx)<8||Math.abs(dx)<Math.abs(dy))return;
   const fwd=mode==="spread"?drag.side>=.5:dx<0;if(fwd&&cur>=maxCur||!fwd&&cur<=0){drag.dir=9;return}
   drag.dir=fwd?1:-1;try{book.setPointerCapture(e.pointerId)}catch(_){}if(!rm()){drag.i=fwd?cur:cur-1;drag.el=beginTurn(drag.i)}}
  if(drag.dir===9||!drag.el)return;e.preventDefault();const r=drag.r;
  /* distance the finger needs to travel for a full turn: to the opposite edge of the book */
  if(drag.dir===1){const span=Math.max(80,drag.x0-(mode==="spread"?r.left:r.left-r.width*.15));drag.p=Math.max(0,Math.min(1,-dx/span))}
  else{const span=Math.max(80,(mode==="spread"?r.right:r.right+r.width*.15)-drag.x0);drag.p=1-Math.max(0,Math.min(1,dx/span))}
  setTurn(drag.el,drag.p)},{passive:false});
 const endDrag=e=>{if(!drag||e.pointerId!==drag.id)return;const d=drag;drag=null;const dx=e.clientX-d.x0;
  if(!d.dir){if(Math.abs(dx)<10&&Math.abs(e.clientY-d.y0)<10&&e.type==="pointerup"){const s=(e.clientX-d.r.left)/d.r.width;
    if(mode==="spread"){if(s>=.62)next();else if(s<=.38)prev()}else{if(s>=.5)next();else if(s<=.3)prev()}}return}
  if(d.dir===9)return;
  if(!d.el){if(d.dir===1&&dx<-40)next();else if(d.dir===-1&&dx>40)prev();return}
  const h=d.hist,a=h[0],b=h[h.length-1];const v=(b[1]-a[1])/Math.max(1,b[0]-a[0]);
  const fwdDone=d.dir===1?(d.p>.42||v<-.35)&&!(v>.35):!((1-d.p)>.42||v>.35)||v<-.35;
  const target=d.dir===1?(fwdDone?1:0):(fwdDone?1:0);const dur=Math.max(140,Math.abs(target-d.p)*520);if(target!==d.p)kbkSfx();
  animate(d.i,d.p,target,dur,easeOut,()=>{cur=target===1?d.i+1:d.i;paint()})};
 book.addEventListener("pointerup",endDrag);book.addEventListener("pointercancel",endDrag);
 root.querySelector(".kbk-next").onclick=e=>{e.stopPropagation();next()};root.querySelector(".kbk-prev").onclick=e=>{e.stopPropagation();prev()};
 root.querySelector(".kbk-x").onclick=e=>{e.stopPropagation();close()};
 const key=e=>{if(closed||root.offsetParent===null&&!root.getClientRects().length)return;const k=e.key;
  if(k==="ArrowRight"||k==="PageDown"){e.preventDefault();next()}else if(k==="ArrowLeft"||k==="PageUp"){e.preventDefault();prev()}
  else if(k==="Escape"){e.preventDefault();close()}else if((k==="Enter"||k===" ")&&!e.target.closest("button")){e.preventDefault();if(cur>=maxCur)close();else next()}};
 document.addEventListener("keydown",key);
 let rt=0;const onR=()=>{clearTimeout(rt);rt=setTimeout(()=>{if(!closed&&!busy)layout(logical)},120)};addEventListener("resize",onR);
 function close(){if(closed)return;closed=true;document.removeEventListener("keydown",key);removeEventListener("resize",onR);try{spec.onClose&&spec.onClose()}catch(e){console.error(e)}}
 layout(null);
 /* web fonts that arrive after the first measure change line heights: measure again (keeps the page) */
 try{if(document.fonts&&document.fonts.status!=="loaded")document.fonts.ready.then(()=>{if(!closed&&!busy)layout(logical)})}catch(e){}
 root.__kbk={relayout:()=>{if(!closed&&!busy)layout(logical)}};
 return {root,next,prev,go,close,get cur(){return cur},get max(){return maxCur},get mode(){return mode},relayout:()=>layout(logical)}}

/* ---------- week data → pages ---------- */
(function(){if(typeof wkSnap!=="function")return;const s0=wkSnap;
 wkSnap=function(){const s=s0.apply(this,arguments);try{s.duc=S.duc;s.th=S.th;s.hh=S.hh;s.mat=S.mat;s.an=S.an||0;s.pp={};
  (typeof rivals!=="undefined"?rivals:[]).forEach(v=>{if(v&&v.id!=null)s.pp[v.id]=[v.rel||0,v.ghen||0,v.oan||0]})}catch(e){}return s}})();

const KBK_DELTA_ONLY=/^(\s*[A-Za-zÀ-ỹĐđ]+(?: [A-Za-zÀ-ỹĐđ]+){0,5} [+\-−]\d+[,;]?)+\s*\.?$/;
const KBK_WORLD=/(thế lực|Kho lúa|kho lúa|^Sớ|triều đình|Triều đình|biên ải|Được mùa|Mất mùa|thiên tai|lũ lụt|hạn hán|dịch bệnh|sứ thần|ngoại bang|giặc|khoa cử|Hộ bộ|Binh bộ|Lễ bộ|Lại bộ|Hình bộ|Công bộ|Hàn lâm|thiên hạ|dân gian|kinh thành)/;
function wkBookData(){const s=S.wkSnap||wkSnap();const n=Math.max(0,Math.min(S.logs.length,(S.logSeq||0)-(s.seq||0)));
 const raw=S.logs.slice(0,n).slice().reverse();const people=kpPeople();const SKIPRE=/^(Xin xăm|Gieo lại|Đến )/;
 const by=new Map(),me=[],world=[];const TH=S.thO||{kind:"th"};let pay="";const key=p=>p;
 const add=(p,text)=>{if(!by.has(key(p)))by.set(key(p),{who:p,F:[]});by.get(key(p)).F.push(text)};
 for(const h of raw){const pl=plain(h);if(!pl||SKIPRE.test(pl))continue;if(/^Bổng lộc tháng/.test(pl)){pay=pl.replace(/^Bổng lộc tháng [^:]*:\s*/,"").replace(/\.$/,"");continue}
  const html=String(h).replace(/<span class="ld">[^<]*<\/span>/,"");let last=null;
  for(let t of kpSentences(html)){const tp=kpPlain(t);if(!tp||SKIPRE.test(tp))continue;
   if(/^(Tháng này|Tin triều đình|Triều đình|Thiên hạ)\s*:/.test(tp)){t=t.replace(/^((?:<[^>]+>)*)\s*(Tháng này|Tin triều đình|Triều đình|Thiên hạ)\s*:\s*/,"$1");world.push(t);last="world";continue}
   if(KBK_DELTA_ONLY.test(tp)&&last){const tgt=last==="world"?world:last===S?me:(by.get(last)||{}).F;if(tgt&&tgt.length){tgt[tgt.length-1]+=" "+t;continue}}
   const [,w0]=kpPeopleIn(t,people);const w=w0.map(x=>x&&x.kind==="th"&&!rivals.includes(x)?TH:x);let p=w.find(x=>x!==S&&!(S.emp&&x===S.emp))||w[0]||null;
   if(!p&&last&&last!=="world"&&!/^(Được mùa|Mất mùa|Sớ|Kho)/.test(tp))p=last;
   if(!p&&(last==="world"&&/^(Nhà |Kho |.*thế lực)/.test(tp)||KBK_WORLD.test(tp))){world.push(t);last="world";continue}
   if(!p)p=S;
   if(p===S)me.push(t);else add(p,t);last=p}}
 /* duplicates: one row, "2 lần" */
 const dedup=L=>{const m=new Map();for(const t of L){const k=kpPlain(t);if(m.has(k))m.get(k).n++;else m.set(k,{t,n:1})}return [...m.values()].map(x=>x.n>1?{text:x.t,chips:[[`${x.n} lần`,"n"]]}:{text:x.t})};
 const D=[["Sủng",S.sung-s.sung],["Danh",S.danh-s.danh],["Sức",S.suc-s.suc],["Bạc",S.bac-s.bac]];
 if(s.duc!=null)D.push(["Đức",S.duc-s.duc]);if(s.mat!=null)D.push(["Tai mắt",S.mat-s.mat]);if(s.an!=null)D.push(["Ân tình",(S.an||0)-s.an]);
 const rank=S.rank!==s.rank?(S.rank>s.rank?"Được thăng ":"Bị giáng xuống ")+(S.rank>=7?"Hoàng hậu":RANKS[S.rank].n):"",kids=S.kids.length-(s.kids||0);
 const persons=[...by.values()].map(x=>{const p=x.who;const chips=[],rows=[];
  if(typeof rivals!=="undefined"&&rivals.includes(p)){const o=s.pp&&s.pp[p.id];
   if(o){[["Thiện cảm",(p.rel||0)-o[0]],["Ghen",(p.ghen||0)-o[1]],["Oán",(p.oan||0)-o[2]]].forEach(([l,v])=>{if(v)chips.push([l,v])})}
   rows.push(["Hiện nay",[`<span class="ef n kbk-pair">${kitGloss("Thiện cảm")} ${p.rel||0}</span>`,`<span class="ef n kbk-pair">${kitGloss("Ghen")} ${p.ghen||0}</span>`,`<span class="ef n kbk-pair">${kitGloss("Oán")} ${p.oan||0}</span>`]])}
  else if(S.emp&&p===S.emp){if(S.sung-s.sung)chips.push(["Sủng",S.sung-s.sung])}
  else if(S.thO&&p===S.thO&&s.th!=null&&S.th-s.th)chips.push(["Thái hậu",S.th-s.th]);
  return {kind:"person",who:p,chips,rows,blocks:[{facts:dedup(x.F)}],n:x.F.length}});
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
function kbkArt(facts,ctx){if(typeof evArtOf!=="function")return facts;let w=0;try{w=wk()}catch(e){}
 return (facts||[]).map((f,i)=>{if(!f||typeof f!=="object")return f;try{const id=kbkEvId(kpPlain(f.text||""),ctx);const a=evArtOf(id,w+":"+i);
  if(a){f.art=a;f.artT=(typeof evArtTitle==="function"&&evArtTitle(id))||""}}catch(e){}return f})}

function wkBookPages(){const d=wkBookData();const date=kitDate(S.month,S.year,S.tuan);const sea=`${SEASON[S.month-1]}${S.wx?" · "+S.wx.n:""}`;
 const P=[{kind:"cover",title:"Sổ tuần",sub:date,note:sea}];
 const b=[];b.push({rows:[["Ngày",date,"t"],["Tiết",sea,"n"]]});
 if(S.lot){const bad=LVB[S.lot.lv]<0||(S.lot.dom==="Hung"&&S.lot.lv>=3),good=LVB[S.lot.lv]>0;b.push({h:kitGloss("Quẻ tuần")});b.push({rows:[["Quẻ",`<span class="ef t">${LV[S.lot.lv]} · ${S.lot.dom}</span>`],["Lời quẻ",(LOTS[S.lot.i]||[])[2]||"","n"],["Tuần này",String(lotEffect(S.lot)).replace(/…\./," và các việc khác cùng loại."),bad?"r":good?"g":"n"]]})}
 b.push({h:"Ngươi tuần qua"});b.push({chips:d.D.filter(([,v])=>v)});
 const mine=[];if(d.rank)mine.push({text:`<b class="g">${d.rank}</b>`,who:S});if(d.kids>0)mine.push({text:`Thêm ${d.kids} con.`,who:S});if(mine.length)b.push({facts:mine});
 b.push({h:kitGloss("Bổng lộc")});b.push(d.pay?{rows:[["Đã lĩnh",kpChipify(d.pay),"t"]]}:{rows:[["Kỳ tới",`còn ${3-(S.tuan||0)} tuần`,"n"]]});
 if(d.persons.length){b.push({h:"Sổ này ghi"});b.push(`<div class="kbk-toc">${d.persons.map(p=>`<span class="kbk-tc">${kitFaceH(p.who,"xs")}${kitName(p.who,{cap:true})}</span>`).join("")}</div>`)}
 if(d.me.length){b.push({h:"Việc của ngươi"});b.push({facts:kbkArt(d.me.map(f=>Object.assign(f,{who:S})),"me")})}
 if(!d.me.length&&!d.persons.length&&!d.world.length&&!mine.length)b.push({facts:[{text:"Một tuần yên ả.",kind:"world",auto:false}]});
 P.push({kind:"text",title:"Tổng lược",sub:"Những điều chính của tuần qua",blocks:b});
 d.persons.forEach(p=>{const ctx=S.emp&&p.who===S.emp?"emp":(S.thO&&p.who===S.thO)||(p.who&&p.who.kind==="th")?"th":"p";(p.blocks||[]).forEach(b=>{if(b.facts)b.facts=kbkArt(b.facts,ctx)})});
 P.push(...d.persons);
 if(d.world.length)P.push({kind:"text",title:"Triều đình · thiên hạ",blocks:[{facts:kbkArt(d.world.map(f=>Object.assign(f,{kind:"world"})),"world")}]});
 const nf=d.me.length+d.world.length+d.persons.reduce((a,p)=>a+p.n,0);
 P.push({kind:"end",title:"Tuần này đến đây là hết.",seal:["HẾT","TUẦN"],note:nf?`Sổ ghi ${nf} việc${d.persons.length?`, ${d.persons.length} người`:""}.`:"Một tuần yên ả.",btn:"Vào ngày mới",btnId:"dawn-go"});
 return {pages:P,head:`Sổ tuần · ${date}`}}

/* ---------- the dawn: the book replaces the week panel; "Vào ngày mới" closes it and the day goes on ---------- */
(function(){if(typeof dawn!=="function")return;const old=dawn;
 dawn=function(){let built;try{built=wkBookPages()}catch(e){console.error(e);return old.apply(this,arguments)}
  S.wkSnap=wkSnap();try{const rt=$("rtoast");if(rt){rt.classList.remove("on");clearTimeout(window.__rtT)}document.body.classList.add("kbk-open")}catch(e){}let w=$("dawn");if(!w){w=document.createElement("div");w.id="dawn";w.className="dawn";document.body.appendChild(w)}
  w.classList.add("kbkdawn");w.onclick=null;w.innerHTML=`<div class="dsky"><i class="lan l1"></i><i class="lan l2"></i><i class="lan l3"></i><i class="sun"></i></div>`;
  w.hidden=false;w.classList.toggle("rm",reducedMotion());void w.offsetWidth;w.classList.add("on");
  const tok=w.__kbkTok={};const bk=kitBook({pages:built.pages,head:built.head,host:w,label:"Sổ tuần",onClose:()=>{if(w.__kbkTok!==tok)return;document.body.classList.remove("kbk-open");w.classList.remove("on");setTimeout(()=>{if(w.__kbkTok!==tok)return;w.hidden=true;w.innerHTML=""},reducedMotion()?0:350)}});
  window.__kbk=bk;setTimeout(bell,reducedMotion()?0:1400);try{w.querySelector(".kbk-next").focus({preventScroll:true})}catch(e){}}})();

(function(){const st=document.createElement("style");st.id="kbk-css";st.textContent=`
.dawn.kbkdawn{padding:0;overflow:hidden;align-items:stretch;justify-content:stretch}
.kbk{position:absolute;inset:0;z-index:1;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:10px 10px max(8px,env(safe-area-inset-bottom));box-sizing:border-box;
 --paper:#f3e5c4;--paper2:#ead6ac;--rule:var(--k-seal,#9a2c1c);--cloth:#27324d;--cloth2:#1c2439;font-size:var(--fs,15px);animation:kbkin .9s ease both .5s}
@keyframes kbkin{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:none}}
.dawn.rm .kbk{animation-duration:.01s;animation-delay:0s}
@media (prefers-reduced-motion:reduce){.kbk{animation:none}}
.kbk-measure{position:absolute;left:-99999px;top:0;visibility:hidden;pointer-events:none;contain:layout style}
.kbk-measure>.kbk-pg{position:relative;width:100%;height:100%}
.kbk-stage{display:flex;align-items:center;justify-content:center;width:100%;flex:0 0 auto}
.kbk-book{position:relative;width:var(--pw);height:var(--ph);transform-style:flat;touch-action:pan-y;user-select:none;-webkit-user-select:none;transition:transform .55s cubic-bezier(.3,.7,.3,1),opacity .16s}
.kbk.spread .kbk-book{width:calc(var(--pw) * 2)}
.kbk.spread .kbk-book.closed{transform:translateX(calc(var(--pw) * -.5))}
.kbk-book.fade{opacity:0}
/* boards behind the pages: cloth edges + page-stack lines */
.kbk-book::before{content:"";position:absolute;inset:-7px -7px -7px -7px;border-radius:5px;background:repeating-linear-gradient(45deg,#ffffff07 0 2px,transparent 2px 5px),linear-gradient(var(--cloth),var(--cloth2));box-shadow:0 18px 40px #000b,inset 0 0 0 1px #ffffff14}
.kbk.spread .kbk-book.closed::before{left:calc(50% - 7px)}
.kbk.single .kbk-book::before{left:-16px}
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
.kbk.art-cover .kbk-lt{display:flex;flex-direction:column;align-items:center;gap:.25em;font-size:min(36cqw,13cqh);letter-spacing:0;line-height:1.05}
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
.kbk-pg .kname,.kbk-pg .kname .kti{color:color-mix(in srgb,var(--rc,#2a1a12) 50%,#2a1a12)!important}
.kbk-pg .kfact:has(>.kfdot){grid-template-columns:.6em minmax(0,1fr);gap:.55em}
.kbk-pg .kfdot{width:.5em;height:.5em;border-radius:1px;background:var(--rule);border:0;transform:rotate(45deg);margin-top:.62em;opacity:.8}
.kbk-toc{display:flex;flex-wrap:wrap;gap:.3em .9em;font-size:.9em;margin:.1em 0 .2em}
.kbk-tc{display:inline-flex;align-items:center;gap:.35em}
/* person page: large kit portrait (3:4 frame), name + chips + rows beside it, facts below/beside */
.kbk-person{flex:1 1 auto;min-height:0;display:grid;grid-template-columns:var(--por) minmax(0,1fr);grid-template-rows:auto minmax(0,1fr);grid-template-areas:"por head" "por flow";gap:.2em 1em}
.kbk-por{grid-area:por;align-self:start}
.kbk-por .pfwrap{width:100%!important;max-width:none!important;margin:0!important;float:none!important;display:block}
.kbk-por .pfr,.kbk-por .pcp{width:100%!important;max-width:none!important;max-height:none!important;height:auto!important;margin:0!important;float:none!important}
.kbk-por .pfrw{display:none}
.kbk-phead{grid-area:head;min-width:0}
.kbk-person>.kbk-flow{grid-area:flow}
.kbk.narrow .kbk-person{grid-template-areas:"por head" "flow flow";grid-template-rows:auto minmax(0,1fr)}
.kbk-pname{font-family:var(--display);font-size:1.4em;line-height:1.25;margin:.1em 0 .25em;padding-bottom:.25em;border-bottom:2px solid #9a2c1c55}
.kbk-pname .kname{font-weight:700}
.kbk-pchips .kchips{margin:.1em 0 .35em}
/* "Hiện nay": a label never parts from its number */
.kbk-pg .krv>.kbk-pair{white-space:nowrap}
.kbk.narrow .kbk-flow>.kb:first-child{margin:0 0 .35em;padding-bottom:.3em;border-bottom:1px dashed #9a2c1c33}
/* event art beside each fact (j89 evArtOf): a small print pasted in the ledger */
.kbk-ev{display:grid;grid-template-columns:minmax(0,1fr) 3em;gap:.55em;align-items:start;border-bottom:1px dashed #9a2c1c33}
.kbk-ev>.kfacts .kfact{border-bottom:0}
.kbk-evart{display:block;width:3em;height:4em;object-fit:cover;margin:.3em 0;padding:2px;background:#fffaf0;border:1px solid #9a2c1c88;box-shadow:0 1px 3px #3a210f55;transform:rotate(1.2deg)}
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
