/* ================= jkrev — KIT §54.1 ITEM REVEAL + GRADE CHIP · KIT §54.2 kitLose (owner 11/15 08:20Z + 17:02Z, review/game-feel) =================
   §54.1  kitItemInfo(entry|key) → {k, name, src, src512, grade 0..4, gname, col, sub}: the ONE answer to "what does this item look like and what
        grade is it" — the same name / painting / grade the Tư trang bag shows (works: j98 itemArt(entry) + WTIER tier word; garments / hairpins:
        j92 WD_ITEMS icon + g; veils: jveil vlSrc + vlG; everything else: j98 itemArt(k)). Never a letter placeholder: no picture = empty frame.
        kitGradeChip(grade, {name, extra, size}) → the grade pill in the KIT_GRADE colour (Thường grey · Tinh phẩm jade · Trân phẩm sapphire ·
        Tuyệt phẩm amethyst · Ngự tứ gold-red). name overrides the word (work tiers Khá / Tinh xảo), extra is added after " · ".
        kitRevealHTML(info, {from}) → the spotlight piece: light pool in the grade colour, kitItem size "xl" (the kit graded frame), name, grade chip.
        Used by kitGain (one item) and kitReward (each item of a box, one by one). Timings: BAL.reveal (jbal2).
   §54.2  kitLose(entries, {why, title, text, to, bac}) → an item LEAVES her Tư trang:
          why "sell"  item flies away from the Tư trang tab, then silver flies INTO the Bạc cell (o.bac)
          why "give"  item flies away (up, towards the person) and fades
          why "lose"  lost / confiscated / robbed / bullied out of her: a kit notice card (kitPanel kind notice) with the item(s) fading and
                      falling, title (o.title) + what happened (o.text)
          why "fade"  gone without a story we can name (spoiled, used up somewhere): the item fades and falls by the tab, no card
        kitCoins("out"|"in", n, {x,y}) → silver coins fly out of / into the Bạc cell (#hud-bac). kitLose({bac:n}) = kitCoins("out", n).
        Wiring: ONE place, jfx kmDiff (every render compares S.inv / S.bac with the last snapshot). Test: dev/test/item-lose.js.
   Off switches as the rest of the FX kit: "Cảnh động" off / reduced motion → no flight, the card still shows; bots / quiet → nothing. */
function kitItemInfo(x){const e=x&&typeof x==="object"?x:{k:x};const k=e.k;const it=(typeof IT==="object"&&IT[k])||{};
 const KG=typeof KIT_GRADE!=="undefined"?KIT_GRADE:[{n:"Thường",c:"#9a8a78"}];
 let name=it.n||String(k||""),src="",src512="",g=0,gn="",sub=it.kd||"";
 try{
  if(e.wk){const a=typeof itemArt==="function"?itemArt(e):null;const ti=Math.max(0,Math.min(3,e.wk.ti|0));name=e.wk.n||name;g=ti;gn=typeof WTIER!=="undefined"?WTIER[ti]:"";
   src=a?a.src:"";src512=a?a.src512:"";sub="Tác phẩm tự tay"}
  else if(typeof WD_ITEMS==="object"&&WD_ITEMS[k]){const w=WD_ITEMS[k];name=w.n||name;src=w.icon||"";g=w.g|0;sub=w.sl==="tram"?"Trâm cài":"Y phục"}
  else if(it.vl){src=typeof vlSrc==="function"?vlSrc(k):"";g=typeof vlG==="function"?vlG(e):0;sub=it.kd||"Mạng che mặt"}
  else{const a=typeof itemArt==="function"?itemArt(k):null;if(a){src=a.src;src512=a.src512;g=a.grade|0}else if(typeof ITIMG==="object"&&ITIMG[k])src=`img/item-${ITIMG[k]}.webp`}
 }catch(err){}
 g=Math.max(0,Math.min(4,g|0));const G=KG[g]||KG[0];return{k,name,src,src512:src512||src,grade:g,gname:gn||G.n,col:G.c,sub}}
function krEsc(s){return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function kitGradeChip(g,o){o=o||{};g=Math.max(0,Math.min(4,g|0));const G=(typeof KIT_GRADE!=="undefined"&&KIT_GRADE[g])||{n:"Thường",c:"#9a8a78"};
 return `<span class="kgchip kgc${g}${o.size==="sm"?" kgchip-sm":""}" style="--gc:${o.col||G.c}">${krEsc(o.name||G.n)}${o.extra?` · ${krEsc(o.extra)}`:""}</span>`}
function kitRevealHTML(I,o){o=o||{};const R=(typeof BAL==="object"&&BAL.reveal)||{};
 return `<div class="krev" style="--gc:${I.col};--krise:${(R.rise||550)}ms">`+`<i class="krevl" aria-hidden="true"></i>`+
  kitItem({src:I.src512||I.src,name:"",grade:I.grade,size:"xl",tip:I.name}).replace('<span class="kitn"></span>','')+
  `<b class="krevn">${krEsc(I.name)}</b>${kitGradeChip(I.grade,{name:I.gname,extra:o.noSub?"":I.sub})}${o.from?`<small class="krevf">${krEsc(o.from)}</small>`:""}</div>`}
window.kitItemInfo=kitItemInfo;window.kitGradeChip=kitGradeChip;window.kitRevealHTML=kitRevealHTML;

/* ---------- §54.2 kitLose ---------- */
function krOn(){return typeof S!=="undefined"&&S&&!window.__bot&&!(typeof quiet!=="undefined"&&quiet)}
function krStill(){try{return matchMedia("(prefers-reduced-motion: reduce)").matches||(typeof OPT!=="undefined"&&OPT.fxon===false)}catch(e){return false}}
function krVis(el){if(!el)return null;const r=el.getBoundingClientRect();return r.width&&r.height&&r.bottom>0&&r.top<innerHeight&&r.right>0&&r.left<innerWidth?r:null}
function krBagPt(){const tb=[...document.querySelectorAll('#tabs [data-tab="inv"],[data-tab="inv"]')].map(krVis).find(Boolean);
 if(tb)return{x:tb.left+tb.width/2,y:tb.top+tb.height/2,r:tb};return{x:innerWidth/2,y:innerHeight*.55,r:null}}
function kitCoins(dir,n,from){if(!krOn()||krStill()||!(n>0))return;const R=(typeof BAL==="object"&&BAL.reveal)||{};const cell=document.getElementById("hud-bac");const cr=krVis(cell);
 const c={x:cr?cr.left+cr.width/2:innerWidth/2,y:cr?cr.top+cr.height/2:innerHeight*.2};const f=from||{x:innerWidth/2,y:innerHeight*.5};const cnt=Math.min(9,3+Math.round(n/15));
 for(let i=0;i<cnt;i++){const im=document.createElement("img");im.className="kcoinfly";im.src="img/kit/mo-coin-silver.webp";im.alt="";document.body.appendChild(im);
  const sx=(i-(cnt-1)/2)*14,dl=i*70,d=R.coins||900;let K;
  if(dir==="out"){const ex=c.x+sx*3+(i%2?40:-40),ey=c.y+90+(i%3)*30;K=[{transform:`translate(${c.x-12}px,${c.y-12}px) scale(.7)`,opacity:1},{transform:`translate(${(c.x+ex)/2-12}px,${c.y-30}px) scale(1)`,opacity:1,offset:.35},{transform:`translate(${ex-12}px,${ey}px) scale(.8) rotate(${i%2?90:-90}deg)`,opacity:0}]}
  else K=[{transform:`translate(${f.x+sx-12}px,${f.y-12}px) scale(.8)`,opacity:0},{transform:`translate(${f.x+sx-12}px,${f.y-40}px) scale(1)`,opacity:1,offset:.25},{transform:`translate(${c.x-12}px,${c.y-12}px) scale(.6)`,opacity:.9}];
  const an=im.animate(K,{duration:d,delay:dl,easing:"cubic-bezier(.45,.05,.4,1)",fill:"both"});an.onfinish=()=>im.remove()}
 if(cell){const cls=dir==="out"?"kfhit-r":"kfhit";setTimeout(()=>{cell.classList.remove("kfhit","kfhit-r");void cell.offsetWidth;cell.classList.add(cls);setTimeout(()=>cell.classList.remove(cls),2700)},dir==="out"?120:(R.coins||900)+cnt*70-120)}
 try{if(typeof sfx==="function")sfx("sfx-coin")}catch(e){}}
/* one item tile leaving from the Tư trang tab: "away" (sold), "give" (given), "fall" (faded away) */
function krFly(I,mode,i){if(krStill())return null;const R=(typeof BAL==="object"&&BAL.reveal)||{};const p=krBagPt();const w=document.createElement("div");w.className="klsfly";
 w.innerHTML=kitItem({src:I.src,name:"",grade:I.grade,size:"md",tip:I.name}).replace('<span class="kitn"></span>','');document.body.appendChild(w);
 const ww=w.offsetWidth||72,hh=w.offsetHeight||72;const x0=Math.max(8,Math.min(innerWidth-ww-8,p.x-ww/2+(i||0)*24)),y0=Math.max(8,(p.r&&p.r.top>innerHeight*.6?p.r.top-hh-14:p.y-hh/2));
 const at=(x,y,s,o,r)=>({transform:`translate(${x}px,${y}px) scale(${s}) rotate(${r||0}deg)`,opacity:o});let K,d;
 if(mode==="fall"){K=[at(x0,y0-10,.7,0),Object.assign(at(x0,y0-18,1,1),{offset:.25,filter:"grayscale(0)"}),Object.assign(at(x0+10,y0+130,.9,0,14),{filter:"grayscale(1)"})];d=R.fall||1300}
 else{const tx=mode==="give"?innerWidth/2-ww/2:innerWidth+20,ty=mode==="give"?-hh-20:Math.max(-hh,y0-220);K=[at(x0,y0+10,.7,0),Object.assign(at(x0,y0-14,1.05,1),{offset:.3}),Object.assign(at(x0,y0-18,1,1),{offset:.45}),at(tx,ty,.55,0,mode==="give"?0:-10)];d=(R.fall||1300)}
 const an=w.animate(K,{duration:d,delay:(i||0)*160,easing:"cubic-bezier(.4,.05,.45,1)",fill:"both"});an.onfinish=()=>w.remove();return{x:x0+ww/2,y:y0+hh/2,d:d+(i||0)*160}}
function kitLose(x,o){o=o||{};if(!krOn())return;if(x&&!Array.isArray(x)&&typeof x==="object"&&x.bac!=null&&!x.k){kitCoins("out",x.bac);return}
 const L=(Array.isArray(x)?x:[x]).filter(Boolean).map(kitItemInfo);if(!L.length){if(o.bac)kitCoins(o.why==="sell"?"in":"out",o.bac);return}
 const why=o.why||"lose";try{(window.KFX=window.KFX||{}).loses=(KFX.loses||[]);KFX.loses.push({why,names:L.map(I=>I.name),title:o.title||"",text:o.text||"",bac:o.bac||0})}catch(e){}
 if(why==="sell"||why==="give"||why==="fade"){let last=null;L.forEach((I,i)=>{last=krFly(I,why==="sell"?"away":why,i)||last});
  if(why==="sell"&&o.bac)setTimeout(()=>kitCoins("in",o.bac,last||krBagPt()),last?Math.round(last.d*.55):0);return}
 /* lose: the kit notice card; its picture (the kit item panel picture, itemPic) = the lost item fading and falling (CSS, §54.2); more items are named in the text */
 const I0=L[0];const pic=kitItem({src:I0.src512||I0.src,name:"",grade:I0.grade,size:"lg",tip:I0.name}).replace('<span class="kitn"></span>','').replace('class="kitem ','class="kitem klsfall ');
 const names=L.map(I=>I.name);const facts=[];if(o.text)facts.push(o.text);facts.push(`Mất khỏi Tư trang: ${names.join(", ")}.`);
 try{const was=document.getElementById("modal");const open=was&&!was.hidden;
  kitPanel({kind:"notice",title:o.title||"Mất đồ",sub:L.length>1?`${L.length} món`:`${L[0].sub?L[0].sub+" · ":""}${L[0].gname}`,itemPic:pic,facts,btn:"Đã hiểu",cls:"klose"});
  if(!open&&typeof showModal==="function")showModal()}catch(e){console.error("kitLose",e)}
 try{if(typeof vib==="function"&&typeof OPT!=="undefined"&&OPT.vib!==false)vib("fail")}catch(e){}}
window.kitLose=kitLose;window.kitCoins=kitCoins;
(function(){const st=document.createElement("style");st.id="kit-reveal";st.textContent=`
/* §54.1 grade chip */
.kgchip{display:inline-block;font-size:.84rem;font-weight:700;line-height:1.3;padding:2px 12px;border-radius:999px;background:var(--gc);color:#fff;white-space:nowrap;box-shadow:inset 0 0 0 1px #fff4;text-shadow:0 1px 1px #0003}
.kgchip.kgc4{background:linear-gradient(#c9a227,#a8261c)}
.kgchip-sm{font-size:.66rem;padding:1px 7px;border-radius:6px}
/* §54.1 reveal spotlight (kitGain, each item of kitReward) */
.krev{position:relative;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center;color:#fff3dc}
.krevl{position:absolute;left:50%;top:75px;width:300px;height:300px;margin:-150px 0 0 -150px;border-radius:50%;pointer-events:none;
 background:radial-gradient(circle,color-mix(in srgb,var(--gc) 80%,#fff) 0,color-mix(in srgb,var(--gc) 45%,transparent) 32%,transparent 68%);animation:krevBurst calc(var(--krise)*2) ease-out both,krevBreath 2.4s ease-in-out calc(var(--krise)*2) infinite}
.krev>.kitem{position:relative;animation:krevRise var(--krise) cubic-bezier(.2,.9,.3,1.2) both}
.krev>.kitem>.kitb{filter:drop-shadow(0 0 14px var(--gc)) drop-shadow(0 4px 8px #0006)}
.krev>.kitem>.kitg{display:none}
.krevn{position:relative;font-family:var(--display,serif);font-size:1.18rem;line-height:1.25;text-shadow:0 2px 6px #000a;animation:krevUp calc(0.4s*var(--pace,1)) calc(var(--krise)*.6) ease-out both}
.krev>.kgchip{position:relative;animation:krevUp calc(0.4s*var(--pace,1)) calc(var(--krise)*.8) ease-out both}
.krevf{position:relative;font-size:.76rem;color:#f6ead6c0}
.krevok{position:relative;margin-top:6px;min-width:120px;animation:krevUp calc(.4s*var(--pace)) var(--kok,calc(900ms*var(--pace))) ease-out both}
.krev.krev-out{animation:krevOut var(--kshelf,calc(380ms*var(--pace))) ease-in forwards}
@keyframes krevBurst{0%{transform:scale(.2);opacity:0}35%{transform:scale(1.15);opacity:1}100%{transform:scale(1);opacity:.85}}
@keyframes krevBreath{0%,100%{opacity:.85;transform:scale(1)}50%{opacity:1;transform:scale(1.06)}}
@keyframes krevRise{from{transform:translateY(60px) scale(.35);opacity:0}to{transform:none;opacity:1}}
@keyframes krevUp{from{transform:translateY(8px);opacity:0}to{transform:none;opacity:1}}
@keyframes krevOut{to{transform:translateY(70px) scale(.3);opacity:0}}
.krevfly,.klsfly{position:fixed;left:0;top:0;z-index:9470;pointer-events:none;will-change:transform,opacity}
.krevfly{object-fit:contain}
.kcoinfly{position:fixed;left:0;top:0;width:24px;height:auto;z-index:9470;pointer-events:none;will-change:transform,opacity}
/* §54.2 lose card: the item(s) fade, grey and fall a little inside the notice card */
.klspic{display:flex;gap:8px;justify-content:center;flex-wrap:wrap}
.klsfall{animation:klsFall var(--klfall,calc(1.3s*var(--pace))) ease-in calc(.35s*var(--pace)) both}
@keyframes klsFall{0%{transform:none;opacity:1;filter:none}100%{transform:translateY(16px) rotate(7deg);opacity:.42;filter:grayscale(1)}}
@media (prefers-reduced-motion:reduce){.krev *,.krev,.klsfall,.krevok{animation:none!important}.klsfall{opacity:.5;filter:grayscale(1)}.krevfly,.klsfly,.kcoinfly{display:none!important}}
.kf-still .krev *,.kf-still .krev,.kf-still .klsfall,.kf-still .krevok{animation:none!important}
`;document.head.appendChild(st)})();
/* kit sample page (#kit, jkitpage): §54.1 grade chips + one reveal spotlight, §54.2 the lose card picture */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push(
 {id:"§54.1",title:"kitGradeChip · kitRevealHTML (kitGain / kitReward)",where:"<b>ONE chip part</b> <code>kitGradeChip(grade,{size,name,extra})</code> in two sizes, never two parts: <b>normal</b> = under the item name on the reveal card (kitGain / kitReward), item detail, lists; <b>sm</b> (<code>size:\"sm\"</code>) = the grade tag laid over an item picture / inside a tight row (kitItem tile, Tư trang, week-book rows). Rows below: normal chips, a normal chip with a maker note, then the sm chip.",html:()=>`<div class="kitpg-row">${[0,1,2,3,4].map(g=>kitGradeChip(g)).join(" ")} ${kitGradeChip(2,{name:"Tinh xảo",extra:"Tác phẩm tự tay"})} <span class="kitpg-w" style="margin:0 0 0 14px;padding-left:12px;border-left:1px solid var(--k-hair)">chip cỡ NHỎ (<code>size:"sm"</code>, cùng một chip, dùng làm nhãn đề trên ảnh vật phẩm) →</span>${kitGradeChip(1,{size:"sm"})}</div>`+
  `<div class="kitpg-row" style="background:#1a0f0acc;padding:14px;border-radius:8px">${kitRevealHTML(kitItemInfo("nhansam"),{from:"Thái hậu ban"})}</div>`},
 {id:"§54.2",title:"kitLose: thẻ mất đồ (món mờ dần, rơi)",html:()=>`<div class="kitpg-row"><span class="klspic">${["vongngoc","tramngoc"].map((k,i)=>{const I=kitItemInfo(k);return kitItem({src:I.src,name:I.name,grade:I.grade,size:"lg"}).replace('class="kitem ','class="kitem klsfall ')}).join("")}</span></div>`})}catch(e){}
