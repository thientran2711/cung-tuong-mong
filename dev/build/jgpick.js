/* ================= jgpick: KIT 28.13i ITEM PICK GRID + the painted gift moment (owner 15/11 session 8, review/gift-pick) =================
   Owner: "Khung tặng quà tôi muốn hiện hình món đồ luôn, xếp theo như kiểu ô tư trang á. Xếp hàng ngang để chọn rồi có animation khi tặng."
   ONE rule for every dialog that asks her to choose an ITEM to give / offer / plant / use on someone: when its options carry `ik`
   (the S.inv index of the item), the option list becomes the kit tile grid (28.13e `.kshg` + pick tile `.kshc.kshpick`, picture = kitItem
   "slot" in the item's grade frame, name in its KIT_GRADE colour, what it is, grade word) in horizontal rows. Tap a tile → it is selected
   (31.13 glow) and the detail under the grid shows that option's own kit card (odds ·
   Tốn · Được · Mất · Kèm, or the reason it cannot be chosen) + ONE confirm button (verb per dialog). Confirm = the real option (chooseM via
   its own .opt button: every wrapper, cost, item-event hook stays). Close = the kit ✕ (32.10). Family (scan dev/test/gift-pick-scan.js):
   giftpick (Hậu cung act "Tặng quà"), giftto ("Dâng quà" Hoàng thượng / Thái hậu), plantpick ("Cài đồ vào rương").
   Gift moment (22:45Z #4/#5, KIT §68 kitFxGiftCarry): after the gift is applied (state first, never waits; co-op sends only state), a maid's
   hands carry the item, wrapped (lacquer box, or silk for cloth), to the person; ribbon untied on arrival; accepted → box opens with light +
   painted sparkles; refused (taint found) → the box is set down and taken back. Gọn / reduced motion / bots: nothing. Tap = skip. ===== */
const KIP_VERB={giftpick:"Tặng",giftto:"Dâng",plantpick:"Cài vào rương",wkgive:"Dâng"};
const KIP_SEL=new WeakMap();
function kipOn(m){return !!(m&&m.opts&&m.opts.some(o=>o&&o.ik!=null&&S.inv[o.ik]))}
function kipE(s){return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
/* picture, name, grade, kind of an inventory entry — the same resolvers as the gift card (jgift giftArt / giftName, j98 itemArt) */
function kipItem(e){const a=typeof giftArt==="function"?giftArt(e):{src:"",grade:0,gradeName:"Thường"};const g=Math.max(0,Math.min(4,a.grade|0));
 const G=(typeof KIT_GRADE!=="undefined"&&KIT_GRADE[g])||{};const it=(e&&IT[e.k])||{};
 const name=typeof giftName==="function"?giftName(e):(it.n||"");const kind=e&&e.wk?((typeof WK!=="undefined"&&WK[e.wk.kind])?WK[e.wk.kind].n:"Tác phẩm"):(it.kd||"Vật phẩm");
 const use=e&&e.wk?(typeof WTIER!=="undefined"?WTIER[e.wk.ti]:""):String(it.d||"").replace(/\s*·\s*(Thường|Tinh phẩm|Trân phẩm|Tuyệt phẩm|Ngự tứ)\s*$/,"");/* reviewer r1: IT.d ends with the grade word, already on the tile's grade line (was shown twice) */
 return{src:a.src||(typeof kitItemSrc==="function"?kitItemSrc(e.k):""),grade:g,gname:a.gradeName||G.n||"",col:G.c||"",name,kind,use,silk:it.kd==="Vải vóc"||/lụa|gấm|vải|sa\b/i.test(name)}}
function kipLocked(c){return !!(c&&(c.lock||(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0)))}
function kipTile(c,i,on){const e=S.inv[c.ik],I=kipItem(e),lock=kipLocked(c);
 const mark=e&&e.t?["đã tẩm","r"]:null;
 return `<div class="kshc kshpick kipc${lock?" kshno":""}${on?" on":""}" role="radio" aria-checked="${on?"true":"false"}" data-kip="${i}">`+
  `<button type="button" class="kshpic" data-kip="${i}" aria-label="${kipE(I.name)}">${kitItem({src:I.src,name:I.name,grade:I.grade,size:"slot",tip:I.name,mark})}</button>`+
  `<span class="kshn"${I.col?` style="color:${I.col}"`:""} title="${kipE(I.name)}">${kipE(I.name)}</span>`+
  `<span class="kshe" title="${kipE(I.use)}">${kipE(I.use)}</span></div>`}
/* the detail: the option's own decorated kit card (a display copy: name, odds, Tốn / Được / Mất / Kèm or the reason) + the confirm button.
   KIT §70 item detail (kitItemDetail strip, jitd) sits above the card (reviewer r1, item-info landed). */
function kipDetail(M,m,i){const d=M.querySelector(".kipd");if(!d)return;const c=m.opts[i];const src=M.querySelector(`.opts>.opt[data-m="${i}"]`);
 if(!c||!src){d.innerHTML=typeof kinlDetail==="function"?kinlDetail(null,{key:"gpick"}):`<p class="kshm">Chạm vào một món để xem được gì.</p>`;return}
 const lock=kipLocked(c)||src.disabled;const card=src.cloneNode(true);card.removeAttribute("data-m");card.setAttribute("tabindex","-1");card.setAttribute("aria-hidden","true");
 card.classList.add("kipcard");card.querySelectorAll(".kitem,.kaart").forEach(x=>x.remove());card.classList.remove("kart","kopt");/* reviewer r1: no KIT §6.2 option picture in the display copy (jopic): the §70 strip above already shows the item; the squeezed title broke letter by letter */card.disabled=false;
 /* KIT §70 item detail (review/item-info, landed on main): the chosen item's own detail strip above the option card (reviewer r1) */
 let det="";try{const e=S.inv[c.ik];if(e&&typeof kitItemDetail==="function")det=kinlDetail({e},{key:"gpick",noLux:true})}catch(x){}
 d.innerHTML=det;d.classList.toggle("kipd2",!!det);
 d.appendChild(card);
 d.insertAdjacentHTML("beforeend",`<button type="button" class="kbtn kipgo" data-kipgo="${i}"${lock?" disabled":""}>${kipE(KIP_VERB[m.pid]||"Chọn")}</button>`)}
function kipSelect(M,m,i){KIP_SEL.set(m,i);M.querySelectorAll(".kipc").forEach(t=>{const on=+t.dataset.kip===i;t.classList.toggle("on",on);t.setAttribute("aria-checked",on?"true":"false")});
 M.querySelector(".kipw").classList.add("has");kipDetail(M,m,i)}
function kipBuild(){const m=Q[0],M=$("modal");if(!M||M.hidden||!kipOn(m))return;const ops=M.querySelector(".opts");if(!ops||M.querySelector(".kipw"))return;
 const L=m.opts.map((c,i)=>[c,i]).filter(([c,i])=>c&&c.ik!=null&&S.inv[c.ik]&&ops.querySelector(`.opt[data-m="${i}"]`));
 /* doable first (kitDoableFirst rule), then the dialog's own order */
 L.sort((a,b)=>(kipLocked(a[0])-kipLocked(b[0]))||(a[1]-b[1]));
 let sel=KIP_SEL.get(m);if(sel==null||!L.some(x=>x[1]===sel)){const f=L.find(x=>!kipLocked(x[0]));sel=f?f[1]:null}
 const w=document.createElement("div");w.className="kipw kshop";
 w.innerHTML=`<div class="kshg kipg" role="radiogroup" aria-label="Chọn món">${L.map(([c,i])=>kipTile(c,i,i===sel)).join("")}</div><div class="kipd" aria-live="polite"></div>`;
 ops.prepend(w);w.style.setProperty("grid-column","1 / -1","important");ops.classList.add("kiphas");  /* inside the option box: the grid takes the options' own place in every dialog layout (person dialog 32.7 too) */M.querySelector(".dlg").classList.add("kipdlg");
 if(sel!=null)kipSelect(M,m,sel);else kipDetail(M,m,-1)
 /* the gift moment's two pictures load when a gift picker opens (on demand, ~60 KB; sw.js caches them) */
 try{if(KIP_VERB[m.pid]&&m.pid!=="plantpick"&&kfOn()&&!kfStill())["gift-hands.webp","gift.webp"].forEach(f=>{const i=new Image();i.src=kfkU(f)})}catch(e){}}
(function(){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{kipBuild()}catch(e){console.error("kipBuild",e)}return r}})();
document.addEventListener("click",ev=>{const t=ev.target.closest&&ev.target.closest("#modal [data-kip],#modal [data-kipgo]");if(!t)return;const M=$("modal"),m=Q[0];if(!kipOn(m))return;
 ev.stopPropagation();ev.preventDefault();
 if(t.dataset.kipgo!=null){if(t.disabled)return;const i=+t.dataset.kipgo,b=M.querySelector(`.opts>.opt[data-m="${i}"]`);if(!b||b.disabled)return;
  KIP_GO={pid:m.pid,pp:m.pp,c:m.opts[i],from:(M.querySelector(`.kipc[data-kip="${i}"] .kitem`)||t).getBoundingClientRect(),to:kipTarget(M)};b.click();return}
 kipSelect(M,m,+t.dataset.kip)},true);
/* ---------- the gift moment ---------- */
let KIP_GO=null;
/* where the person is: the open person card's portrait in the panel, else the dialog's own figure, else the upper middle */
function kipTarget(M){const vis=el=>{if(!el||!el.offsetParent)return null;const r=el.getBoundingClientRect();return r.width>20&&r.bottom>0&&r.top<innerHeight?r:null};
 const P=[...document.querySelectorAll("#panel img.kpor, #panel .kpsubj img")].map(e=>[e,vis(e)]).filter(x=>x[1]).sort((a,b)=>b[1].width*b[1].height-a[1].width*a[1].height)[0];
 if(P)return{x:P[1].left+P[1].width/2,y:P[1].top+P[1].height*.45};
 const F=M&&M.querySelector("#mb .spk .pframe, #mb .kpfig img, #mb figure img");const r=vis(F);if(r)return{x:r.left+r.width/2,y:r.top+r.height/2};
 return{x:innerWidth/2,y:innerHeight*.36}}
/* her gifts: the result of giveTo decides accept / refuse (taint found → refused, item taken back); "" = nothing given */
let KIP_GIVE=null;
(function(){const g0=giveTo;giveTo=function(a,r,ix){const e=a&&a.inv&&a.inv[ix];const out=g0.apply(this,arguments);
 try{if(a===S&&e&&out&&KIP_GO)KIP_GIVE={e,refuse:/phát hiện|trả lại|từ chối|không nhận/.test(out)}}catch(x){}return out}})();
/* the gift card opened from Tư trang (item → person, jgift giftDialog: giftpick / wkgive with ix, giftto) plays the same moment:
   from the item picture, to the chosen person's portrait on the option */
function kipGoOf(i){try{const m=Q[0],M=$("modal");if(!m||!/^(giftpick|wkgive|giftto)$/.test(m.pid)||!M||M.hidden)return null;
 const pic=M.querySelector(".kgiftpic .kitem, .kpsubj .kitem")||M.querySelector(`.opt[data-m="${i}"] .kitem`);const fr=(pic||M.querySelector(".dlg")).getBoundingClientRect();
 const who=M.querySelector(`.opt[data-m="${i}"] .md, .opt[data-m="${i}"] img`);const r=who&&who.getBoundingClientRect();
 return{pid:m.pid,from:fr,to:r&&r.width?{x:r.left+r.width/2,y:r.top+r.height/2}:kipTarget(M)}}catch(e){return null}}
/* 22:45Z #5 — a gift that ARRIVES (PEND.giftin / pgin, "Nhận"): the lacquer box opens with a soft light + painted sparkles where the
   item is shown (the §64 keep flight then carries the item to Tư trang) */
function kipRecv(i){try{const m=Q[0],M=$("modal");if(!m||!/^(giftin|pgin)$/.test(m.pid)||!M||M.hidden)return null;const c=m.opts&&m.opts[i];if(!c||!/^Nhận/.test(c.n||""))return null;
 const el=M.querySelector(".kiev .kitem, .kiev, #mb .ksart");const r=el&&el.getBoundingClientRect();return r&&r.width?{x:r.left+r.width/2,y:r.top+r.height/2}:{x:innerWidth/2,y:innerHeight*.4}}catch(e){return null}}
(function(){const c0=chooseM;chooseM=function(i){const go=KIP_GO||kipGoOf(i),rv=kipRecv(i);KIP_GO=go;KIP_GIVE=null;let r;try{r=c0.apply(this,arguments)}finally{KIP_GO=null}
 try{const g=KIP_GIVE;KIP_GIVE=null;if(go&&g&&typeof kitFxGiftCarry==="function"){const I=kipItem(g.e);
   kitFxGiftCarry(go.to,{item:I.src,from:{x:go.from.left+go.from.width/2,y:go.from.top+go.from.height/2},wrap:I.silk?"silk":"box",refuse:g.refuse})}
   if(rv&&typeof kitFxGift==="function"&&!kfStill())kitFxGift("open",rv,{size:Math.min(130,innerWidth*.24)})}catch(e){console.error("kip gift fx",e)}
 return r}})();
/* the item's gift line on the Hậu cung "Tặng quà" picker: the same evaluation as the gift card (jgift giftEval: odds · tốn · thành · kèm) */
(function(){const g0=PEND.giftpick;PEND.giftpick=function(p){const d=g0.apply(this,arguments);try{if(d&&d.o&&p&&p.v!=null&&typeof giftEval==="function"){const v=RV(p.v);
  if(v)d.o.forEach(o=>{if(o.ik==null||!S.inv[o.ik])return;const ev=giftEval(S.inv[o.ik],v);if(ev.ok)o.kgift=ev.x;else{o.kgwhy=ev.why||"nàng không nhận món này";o.lock=true}})}}catch(e){}return d}})();
(function(){const st=document.createElement("style");st.id="kip-css";st.textContent=`
/* KIT 28.13i: the 28.13e grid + pick tile, no button row (picture · name · what it is · grade); selected = 31.13 glow */
.kipw{display:flex;flex-direction:column;gap:8px;min-width:0;margin:6px 0 0}
#modal .opts.kiphas{display:block!important;grid-template-columns:none!important}
#modal .opts.kiphas>.opt{display:none!important}
html body #modal .opts.kiphas>.kipw{grid-column:1/-1!important;width:100%;max-width:none!important}
.kipg{--kshsz:96px;flex:none;max-height:min(calc(46*var(--kvh,1vh)),420px)}
.kshc.kshpick.kipc{grid-template-rows:auto calc(2rem * 1.2 * .8) calc(2rem * 1.2 * .72);cursor:pointer}
.kshc.kipc>.kshpic{cursor:pointer;transition:transform .15s}
.kipw.has .kshc.kipc:not(.on){opacity:.75}
.kshc.kipc.on>.kshpic{filter:var(--k-glow);transform:scale(1.06)}
.kipd{display:flex;flex-direction:column;gap:6px;min-width:0}
.kipd>.opt.kipcard{pointer-events:none;margin:0;width:100%}
.kipd>.kipgo{align-self:stretch;min-height:40px}
.kipd>.kipgo:disabled{filter:grayscale(1);opacity:.55}
/* reviewer r1: with the §70 strip the confirm stays in view — strip | card + confirm side by side on landscape screens, and the confirm
   sticks to the bottom of the scrolling option box everywhere */
.kipd>.kipgo{position:sticky;bottom:0;z-index:2}
/* kv3:.kv2 */:where(.kv2) .kipd.kipd2{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;column-gap:10px}:where(.kv2) .kipd2>.kidet{grid-column:1;grid-row:1/span 2}:where(.kv2) .kipd2>.kipcard,:where(.kv2) .kipd2>.kipgo{grid-column:2}:where(.kv2) .kipd2>.kipgo{align-self:start;max-height:48px}

/* kv3:.kv1 */:where(.kv1) .kipg{--kshsz:84px}
`;document.head.appendChild(st)})();
if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§28.13i",title:"Item pick grid (Tặng quà · Dâng quà · Cài đồ) — tile + selected",html:()=>{try{
 const L=Object.keys(IT).filter(k=>!itm(k).story).slice(0,4);return `<div class="kipw kshop has"><div class="kshg kipg">${L.map((k,i)=>{const I=kipItem({k});
  return `<div class="kshc kshpick kipc${i===1?" on":""}"><span class="kshpic">${kitItem({src:I.src,name:I.name,grade:I.grade,size:"slot"})}</span><span class="kshn" style="color:${I.col}">${kipE(I.name)}</span><span class="kshe">${kipE(I.use)}</span></div>`}).join("")}</div></div>`}catch(e){return""}}});
