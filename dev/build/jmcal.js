/* ================= jmcal: LỊCH THÁNG · kitMonthCal + kitDeskCal (owner 15/11 ~18:30Z, KIT §58) =================
   A wall calendar: one month = 3 rows (thượng / trung / hạ tuần) x 10 squares (days 1-30). Only the FIXED YEARLY festivals of the game
   calendar (FEST, j31 + j71 Thánh thọ Thái hậu while she lives) are marked; private contests, tea parties, private banquets and every other
   surprise event never appear (they are not in FEST).
   TIME MODEL: the game has no day of the month; a turn is a tuần (S.tuan 0/1/2). Day squares map to tuần as 1-10 = thượng, 11-20 = trung,
   21-30 = hạ. A festival is marked on its traditional day (MCAL.days) when that day lies in the tuần the game holds it (FEST.t);
   otherwise on the first day of each of its tuần (Hội Phượng: 1, 11, 21 — it lasts the whole month).
   TODAY = the current tuần row (gold) + "Tuần này"; days of earlier tuần of this month are dimmed.
   The 12 month tabs run from this month to 11 months ahead (months before this one are next year's), so she can look ahead.
   A festival square (and its line in the list under the grid) opens the kit popover (kpPop): name, day, a short line, what contests
   the festival can hold (from its j71 pool FV7: C = contests SC7, W = wagers …), the prize, and how many tuần are left.
   kitDeskCal: the painted desk calendar (img/kit/desk-cal.webp; plain img/kit/desk-cal-plain.webp in lãnh cung / as a servant) in a
   free corner of HER room's stage (S.place "home"; in lãnh cung her place "lc"); one tap opens the calendar in the kit modal. ===== */
const MCAL={
 days:{newyear:[1,2,3],nguyentieu:[15],thanhminh:[5],doanngo:[5],thattich:[7],vulan:[15],trungthu:[15],vantho:[25],trungcuu:[9],thanhtho:[15],dongchi:[15],lapbat:[8],giaothua:[30]},
 short:{newyear:"Nguyên đán",nguyentieu:"Nguyên tiêu",thanhminh:"Thanh minh",doanngo:"Đoan ngọ",phoenix:"Hội Phượng",thattich:"Thất tịch",vulan:"Vu Lan",trungthu:"Trung thu",vantho:"Vạn thọ",trungcuu:"Trùng cửu",thanhtho:"Thánh thọ",dongchi:"Đông chí",lapbat:"Lạp bát",giaothua:"Giao thừa"},
 line:{newyear:"Lục cung vào chúc Tết Hoàng thượng và Thái hậu, mở yến xuân.",
  nguyentieu:"Đêm rằm tháng giêng, đèn lồng treo khắp ngự hoa viên, cả cung đố đèn.",
  thanhminh:"Các cung theo Thái hậu cúng tế tiên đế, đạp thanh, thả diều.",
  doanngo:"Đua thuyền rồng trên Thái Dịch trì, đeo túi thơm, gói bánh ú.",
  phoenix:"Hội thi cưỡi ngựa bắn cung ở sân tàu ngựa phía tây, kéo dài cả tháng.",
  thattich:"Đêm Ngưu Lang Chức Nữ gặp nhau, các cung xâu kim khất xảo dưới trăng.",
  vulan:"Rằm tháng bảy, chùa trong cung mở đại lễ, các cung cúng dường cầu siêu.",
  trungthu:"Đêm rằm tháng tám, Hoàng thượng mở yến thưởng trăng bên hồ.",
  vantho:"Mừng thánh đản Hoàng thượng: các cung dâng lễ chúc thọ, mở yến lớn.",
  trungcuu:"Lên Cảnh Sơn ngắm cúc, ủ rượu cúc, dâng lễ người già.",
  thanhtho:"Mừng thọ Thái hậu ở Từ Ninh cung: các cung dâng lễ, lễ được khen sẽ được nhắc cả năm.",
  dongchi:"Hoàng thượng ra đàn Nam Giao tế trời; đêm dài nhất năm.",
  lapbat:"Mồng tám tháng chạp, nấu cháo lạp bát cúng dường, sửa soạn đón Tết.",
  giaothua:"Đêm cuối năm, cung đình đốt pháo, Hoàng thượng ban yến đón giao thừa."},
 other:{W:"đặt cược",B:"mở yến mời",P:"dâng lễ",R:"lễ cúng",G:"chơi cùng phi tần"}};
const mcTuanOf=d=>Math.min(2,Math.floor((d-1)/10));
const mcEsc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
function mcNow(){try{if(S&&S.month)return{m:+S.month,y:+S.year||1,t:+S.tuan||0}}catch(e){}return{m:1,y:1,t:0}}
function mcMonName(m){try{return `tháng ${KP_MON[(m-1)%12]}`}catch(e){return `tháng ${m}`}}
function mcYearName(y){try{return kpYear(y)}catch(e){return `năm thứ ${y}`}}
function mcDayName(d){return d<=10?`mồng ${d}`:`ngày ${d}`}
function mcDaysName(L){if(!L.length)return"";const run=L.every((d,i)=>!i||d===L[i-1]+1);if(L.length>1&&run)return `${L[0]<=10?"mồng ":"ngày "}${L[0]}–${L[L.length-1]}`;return L.map(mcDayName).join(", ")}
/* the fixed yearly festivals of month m: [{k,name,short,days,t}] (FEST is the one source; Thánh thọ only while Thái hậu lives) */
function mcFests(m){const out=[];if(typeof FEST==="undefined")return out;
 for(const k in FEST){const f=FEST[k];if(!f||+f.m!==m)continue;if(k==="thanhtho"&&typeof S!=="undefined"&&S&&S.thDead)continue;
  const T=Array.isArray(f.t)&&f.t.length?f.t.slice().sort():[0];let d=(MCAL.days[k]||[]).filter(x=>T.includes(mcTuanOf(x)));if(!d.length)d=T.map(t=>t*10+1);
  out.push({k,name:String(f.name||k).replace(/\s*\([^)]*\)\s*$/,""),short:MCAL.short[k]||String(f.name||k).replace(/^(Tết|Tiết|Lễ|Hội|Đêm)\s+/,""),days:d,t:T})}
 return out.sort((a,b)=>a.days[0]-b.days[0])}
/* what the festival can hold, from its j71 pool (the same filter as fvPick: no Thái hậu variants once she is gone) */
function mcActs(k){const P=(typeof FV7!=="undefined"&&FV7[k])||[];const thD=typeof S!=="undefined"&&S&&S.thDead;const C=[],O=[];
 for(const v of P){if(thD&&(v[1]==="th"||/Thái hậu/.test(v[2])))continue;if(v[0]==="C"){const n=typeof SC7!=="undefined"&&SC7[v[1]]&&SC7[v[1]].n;if(n&&!C.includes(n))C.push(n)}else{const n=MCAL.other[v[0]];if(n&&!O.includes(n))O.push(n)}}
 return{C,O}}
function mcPrize(k){try{if(typeof prize7==="function"&&typeof NAMES!=="undefined")return Object.entries(prize7(k)).map(([a,v])=>`${NAMES[a]} +${v}`).join(", ")}catch(e){}return""}
/* tuần from now to (offset o months ahead, tuần t); <0 = already past */
function mcLeft(o,t){const n=mcNow();return o*3+t-n.t}
function mcLeftText(o,f){const L=f.t.map(t=>mcLeft(o,t));const nx=L.find(x=>x>=0);if(nx==null)return"đã qua";if(nx===0)return"tuần này";return `còn ${nx} tuần`}
/* ---------- the calendar (pure HTML; o = months ahead of the current month, 0..11) ---------- */
function kitMonthCal(opt){opt=opt||{};const n=mcNow();const o=Math.max(0,Math.min(11,opt.o|0));const m=(n.m-1+o)%12+1,y=n.y+((n.m-1+o)>=12?1:0);const F=mcFests(m);
 const at={};F.forEach(f=>f.days.forEach(d=>{(at[d]=at[d]||[]).push(f)}));
 const tabs=[];for(let i=0;i<12;i++){const mm=(n.m-1+i)%12+1;const c=mcFests(mm).length;tabs.push({k:String(i),label:`Tháng ${typeof KP_MON!=="undefined"?KP_MON[mm-1]:mm}`,n:c||null,tip:c?`${c} lễ hội`:""})}
 const tabRow=typeof kitTabRowHTML==="function"?kitTabRowHTML(tabs,String(o),"data-kmcm"):"";
 let g="";for(let t=0;t<3;t++){const now=o===0&&t===n.t;const T=(typeof TUAN!=="undefined"?TUAN[t]:["thượng tuần","trung tuần","hạ tuần"][t]).split(" ");
  g+=`<div class="kmc-row${now?" on":""}"><div class="kmc-tl"><span>${T[0][0].toUpperCase()+T[0].slice(1)}</span><span>${T[1]}</span>${now?`<span class="kchip g kmc-now">Tuần này</span>`:""}</div>`;
  for(let d=t*10+1;d<=t*10+10;d++){const past=o===0&&t<n.t;const L=at[d];
   if(L){const f=L[0];g+=`<button type="button" class="kmc-d f${past?" past":""}" data-kmcf="${f.k}" data-kmco="${o}" aria-label="${mcEsc(mcDayName(d)+": "+L.map(x=>x.name).join(", "))}"><img src="img/ev-fest-${f.k}.webp" alt="" loading="lazy" decoding="async" onerror="this.remove()"><span class="kmc-n">${d}</span><span class="kmc-fn">${mcEsc(f.short)}</span></button>`}
   else g+=`<div class="kmc-d${past?" past":""}"><span class="kmc-n">${d}</span></div>`}
  g+=`</div>`}
 const rows=F.map(f=>[mcDaysName(f.days),`<span class="kmc-lk" role="button" tabindex="0" data-kmcf="${f.k}" data-kmco="${o}">${mcEsc(f.name)}</span> · ${mcLeftText(o,f)}`]);
 const list=F.length?(typeof kitRows==="function"?kitRows(rows):rows.map(r=>`<div>${r[0]} · ${r[1]}</div>`).join("")):`<div class="kmc-none">Tháng này không có lễ hội lớn.</div>`;
 return `<div class="kmc" data-kmc="${o}"><div class="pctabs kcattabs kmc-tabs" role="tablist">${tabRow}</div>`+
  `<div class="kmc-head"><b>${mcMonName(m).replace(/^t/,"T")}</b> · ${mcYearName(y)}${o===0?"":` <span class="kmc-ahead">(${o===1?"tháng sau":`${o} tháng nữa`})</span>`}</div>`+
  `<div class="kmc-grid">${g}</div><div class="kmc-list">${list}</div></div>`}
/* the popover of one festival (kit kpPop) */
function mcPopHTML(k,o){const f=mcFests((mcNow().m-1+o)%12+1).find(x=>x.k===k);if(!f)return"";const A=mcActs(k),pz=mcPrize(k);
 const T=f.t.map(t=>typeof TUAN!=="undefined"?TUAN[t]:"").filter(Boolean).join(", ");
 return `<div class="kpopt">${mcEsc(f.name)}</div><div class="kpopx kmc-px"><div class="kmc-pw">${mcDaysName(f.days)} ${mcMonName((mcNow().m-1+o)%12+1)} · ${T} · <b>${mcLeftText(o,f)}</b></div>`+
  `<div>${MCAL.line[k]||""}</div>`+(A.C.length?`<div><b>Có thể thi:</b> ${A.C.join(", ")}</div>`:"")+(A.O.length?`<div><b>Còn có:</b> ${A.O.join(", ")}</div>`:"")+
  (A.C.length&&pz?`<div><b>Thắng thi:</b> ${pz}</div>`:"")+`</div>`}
function kitMonthCalOpen(){try{if(typeof kitModal!=="function")return;kitModal({kind:"cal",title:"Lịch tháng",sub:`Nay là ${typeof k3Date==="function"?k3Date():""}. Lịch chỉ ghi lễ hội lớn hằng năm, sửa soạn trước cho kịp.`,html:kitMonthCal({o:0}),cls:"kmc-modal"})}catch(e){console.error(e)}}
try{KP_SEAL.cal="LỊCH"}catch(e){}
window.kitMonthCal=kitMonthCal;window.kitMonthCalOpen=kitMonthCalOpen;
/* month tabs + festival taps (delegated; the capture-phase kit popover closer runs first, so a tap on another square re-opens it) */
document.addEventListener("click",e=>{const t=e.target.closest&&e.target.closest("[data-kmcm]");if(t){const c=t.closest(".kmc");if(!c)return;e.stopPropagation();e.preventDefault();
  const sx=(c.querySelector(".kmc-tabs")||{}).scrollLeft||0;const w=document.createElement("div");w.innerHTML=kitMonthCal({o:+t.dataset.kmcm});const nc=w.firstElementChild;c.replaceWith(nc);
  const tr=nc.querySelector(".kmc-tabs");if(tr){tr.scrollLeft=sx;const on=tr.querySelector(".pct.on");if(on&&on.scrollIntoView)on.scrollIntoView({block:"nearest",inline:"nearest"})}return}
 const f=e.target.closest&&e.target.closest("[data-kmcf]");if(f&&typeof kpPop==="function"){e.stopPropagation();e.preventDefault();const h=mcPopHTML(f.dataset.kmcf,+f.dataset.kmco||0);if(h)kpPop(f,h)}});
document.addEventListener("keydown",e=>{if(e.key!=="Enter"&&e.key!==" ")return;const f=e.target.closest&&e.target.closest(".kmc-lk[data-kmcf]");if(f){e.preventDefault();f.click()}});
/* hover (mouse) shows the same popover */
document.addEventListener("mouseover",e=>{try{if(!matchMedia("(hover:hover) and (pointer:fine)").matches)return;const f=e.target.closest&&e.target.closest(".kmc-d[data-kmcf]");if(!f||f.__kmh)return;f.__kmh=1;
 const h=mcPopHTML(f.dataset.kmcf,+f.dataset.kmco||0);if(h)kpPop(f,h);f.addEventListener("mouseleave",()=>{f.__kmh=0;const p=document.getElementById("kpop");if(p)p.hidden=true},{once:true})}catch(x){}});
/* ---------- kitDeskCal: the desk calendar in a free corner of her room ---------- */
const KIT_DESKCAL={min:48,max:84,frac:.11,pad:8};
function kdcPlain(){try{return !!(S.out||(typeof isSrv==="function"&&isSrv()))}catch(e){return false}}
function kdcRects(st){const L=[];const add=(e,sx)=>{const r=e.getBoundingClientRect();if(r.width<2||r.height<2)return;if(sx){const w=r.width*sx;L.push({left:r.left+(r.width-w)/2,right:r.right-(r.width-w)/2,top:r.top,bottom:r.bottom})}else L.push(r)};
 st.querySelectorAll("#sc-t,#stop,.ksh,.k3cs,.tag,#j59metag,#tomap,.kmm,.kchip,.kmnote,.empty,.j59more").forEach(e=>{if(e.offsetParent)add(e)});
 st.querySelectorAll("img.figimg,#mefig").forEach(e=>{if(e.offsetParent)add(e,.6)});return L}
function kdcPlace(){const st=document.getElementById("stage"),b=document.getElementById("kmcdesk");if(!st||!b)return;const R=st.getBoundingClientRect();if(R.width<40)return;
 const sz=Math.round(Math.max(KIT_DESKCAL.min,Math.min(KIT_DESKCAL.max,R.height*KIT_DESKCAL.frac)));const p=KIT_DESKCAL.pad;b.style.setProperty("--kmcd",sz+"px");
 const L=kdcRects(st);const sct=st.querySelector("#sc-t");const tb=sct&&sct.offsetParent?sct.getBoundingClientRect().bottom-R.top+4:p;
 const C=[[R.width-sz-p,R.height-sz-p],[p,R.height-sz-p],[p,Math.max(p,tb)],[R.width-sz-p,Math.max(p,tb)]];
 const ov=([x,y])=>{const a={left:R.left+x,top:R.top+y,right:R.left+x+sz,bottom:R.top+y+sz};let s=0;for(const r of L){const w=Math.min(a.right,r.right)-Math.max(a.left,r.left),h=Math.min(a.bottom,r.bottom)-Math.max(a.top,r.top);if(w>0&&h>0)s+=w*h}return s};
 let best=C[0],bs=Infinity;for(const c of C){const s=ov(c);if(s<bs){bs=s;best=c}if(!s)break}
 b.style.left=best[0]+"px";b.style.top=best[1]+"px";b.dataset.ov=Math.round(bs)}
function kitDeskCal(){try{const st=document.getElementById("stage");if(!st)return;let b=document.getElementById("kmcdesk");
 const show=typeof S!=="undefined"&&S&&!S.dead&&(S.place==="home"||(S.out&&S.place==="lc"));if(!show){if(b)b.remove();return}
 const src=`img/kit/desk-cal${kdcPlain()?"-plain":""}.webp`;
 if(!b){b=document.createElement("button");b.type="button";b.id="kmcdesk";b.className="kmcdesk";b.setAttribute("aria-label","Lịch tháng");b.title="Lịch tháng";
  b.addEventListener("click",e=>{e.stopPropagation();kitMonthCalOpen()})}
 let im=b.querySelector("img");const want=src.replace(/^.*?img\//,"img/");if(!im||!(im.getAttribute("src")||"").split("?")[0].endsWith(want)){if(im)im.remove();im=document.createElement("img");im.alt="";im.decoding="async";im.src=src;b.appendChild(im)}if(b.parentNode!==st)st.appendChild(b);
 kdcPlace();requestAnimationFrame(kdcPlace);setTimeout(kdcPlace,350);setTimeout(kdcPlace,1200)}catch(e){console.error(e)}}
window.kitDeskCal=kitDeskCal;
(function(){if(typeof renderStage!=="function")return;const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);kitDeskCal();return r}})();
addEventListener("resize",()=>{clearTimeout(window.__kdcT);window.__kdcT=setTimeout(kdcPlace,150)});
(function(){const st=document.createElement("style");st.id="kmc-css";st.textContent=`
.kmc{display:grid;gap:8px;min-width:0}
#modal.kmc-modal .dlg.kpanel{max-width:min(780px,calc(100vw - 24px))!important;width:100%}
.kmc-tabs{display:flex!important;flex-wrap:wrap!important;gap:5px;overflow:visible!important}
.kmc-head{font-family:var(--display);color:var(--ink);font-size:.95rem}.kmc-head b{color:var(--gold)}.kmc-ahead{color:var(--dim);font-size:.8rem}
.kmc-grid{display:grid;grid-template-columns:auto repeat(10,minmax(0,1fr));gap:3px;min-width:0}
.kmc-row{display:contents}
.kmc-tl{display:flex;flex-direction:column;justify-content:center;align-items:center;gap:2px;text-align:center;font-family:var(--display);font-size:.72rem;line-height:1.1;color:var(--dim);padding:0 4px;border-radius:6px}
.kmc-row.on .kmc-tl{color:var(--gold);background:#f0d07033;box-shadow:inset 0 0 0 1px var(--gold)}
.kmc-now{font-size:.62rem!important;white-space:nowrap}
.kmc-d{position:relative;min-width:0;aspect-ratio:1/1.08;min-height:46px;max-height:96px;display:flex;flex-direction:column;justify-content:flex-end;margin:0;padding:0;border:1px solid var(--k-hair);border-radius:6px;background:var(--k-card);color:var(--ink);font:inherit;overflow:hidden}
.kmc-row.on .kmc-d{border-color:var(--gold);box-shadow:inset 0 0 0 1px #f0d07088}
.kmc-d.past{opacity:.5}
.kmc-n{position:absolute;top:2px;left:3px;font-weight:700;font-size:.74rem;line-height:1.1}
.kmc-d.f{cursor:pointer;border:1.5px solid var(--gold);box-shadow:0 0 0 1px #f0d07066}
.kmc-d.f img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
.kmc-d.f .kmc-n{background:#fffaf0e0;border-radius:4px;padding:0 3px}
.kmc-fn{position:relative;display:block;background:#fffaf0eb;color:var(--ink);font-size:.68rem;font-weight:700;line-height:1.1;padding:2px 1px;text-align:center;overflow-wrap:normal;word-break:keep-all}
.kmc-lk{color:var(--gold);font-weight:700;text-decoration:underline dotted;text-underline-offset:3px;cursor:pointer}
.kmc-none{color:var(--dim);font-size:.85rem}
.kmc-px>div{margin-top:3px}.kmc-pw{color:var(--dim)}
.kmcdesk{position:absolute;z-index:3;width:var(--kmcd,64px);height:var(--kmcd,64px);min-width:44px;min-height:44px;padding:0;margin:0;border:0;background:none;cursor:pointer;filter:drop-shadow(0 2px 3px #2a1a1270)}
.kmcdesk img{width:100%;height:100%;object-fit:contain;display:block;pointer-events:none}
.kmcdesk.kmc-st{position:relative}.kmc-strow{display:flex;gap:16px}
.kmcdesk:active{transform:scale(.94)}
@media (max-height:520px){.kmc-tabs{flex-wrap:nowrap!important;overflow-x:auto!important}.kmc-d{aspect-ratio:auto;height:50px;min-height:50px}}
`;document.head.appendChild(st)})();
/* ---------- kit sample page (§47) ---------- */
if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push(
 {id:"§58",title:"kitMonthCal: lịch tháng (3 tuần × 10 ngày, lễ hội cố định)",html:()=>kitMonthCal({o:0})},
 {id:"§58.1",title:"kitMonthCal: tháng có lễ hội (tháng giêng)",html:()=>{const n=mcNow();return kitMonthCal({o:(13-n.m)%12})}},
 {id:"§58.2",title:"kitDeskCal: lịch để bàn ở góc phòng (thường · lãnh cung)",html:()=>`<div class="kmc-strow"><button type="button" class="kmcdesk kmc-st" aria-label="Lịch tháng"><img src="img/kit/desk-cal.webp" alt=""></button><button type="button" class="kmcdesk kmc-st" aria-label="Lịch tháng"><img src="img/kit/desk-cal-plain.webp" alt=""></button></div>`});
