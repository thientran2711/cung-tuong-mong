
/* ================= jk3: KIT 3 — FOLD LAYOUT (kit owner, owner 11/14 Fold screenshots) =================
   One layout rule set for every screen and mode (consort road, cung nữ road, lãnh cung):
   1. TOP BAR = ONE slim row (phones: two): ☰ · her small frame + name + rank chip + short date · Bạc / Sức / Sủng / Danh.
      The Hoàng thượng box, the Thái hậu / Hoàng hậu chips and the status chip row leave the top bar (they live on the stage, 2).
   2. STAGE HUD: semi-transparent kit plaques in two side gutters of the stage (--kgl / --kgr); the figures stand in the middle
      (j59 lays them out inside the gutters, so a plaque never covers a figure). Left: place name · time (buổi, còn N khắc,
      weather, Quẻ tuần) · Tư chất · Tình trạng. Right: Hoàng thượng / Thái hậu / Hoàng hậu chips (attitude + mood when known) ·
      her servant (Lòng) · servant-road facts. Tap a plaque = the full status sheet (kit sheet, centred, scrolls inside).
   3. ONE STAGE SIZE on every tab (portrait: --kstH of the screen height; landscape: the left column). The panel below scrolls.
   4. STICKY HEADERS (sub-tabs, person-card strip, panel headers) are opaque and in the flow; nothing scrolls visibly behind them.
   5. CHIP LISTS / SELECTORS wrap (never clipped); the panel scrolls.
   One fact, one place: the date (top bar only), khắc (time plaque only, no dots), weather (time plaque only), attitude of
   Thái hậu / Hoàng hậu (their chip only), Sủng (top bar only). */
(function(){
const $$=s=>document.getElementById(s);
const T=s=>String(s==null?"":s).replace(/\s+/g," ").trim();
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
/* ---------- short date (VANPHONG: "Tháng ba · thượng tuần · năm thứ nhất") ---------- */
function k3Date(){try{const mo=(typeof KP_MON!=="undefined"&&KP_MON[(S.month-1)%12])||S.month;const yr=typeof kpYear==="function"?kpYear(S.year):"năm thứ "+S.year;
 return `Tháng ${mo} · ${TUAN[S.tuan]} · ${yr}`}catch(e){return""}}
window.k3Date=k3Date;
/* the status sheet always starts closed (it is opened from a stage plaque) */
try{localStorage.setItem("hclh-h2c","1")}catch(e){}window.__h2c=true;
/* the Đức goal line (lập Hoàng hậu is a consort goal: never on the cung nữ road or in lãnh cung); "" when it does not apply */
function k3DucNeed(){try{return S.rank<7&&S.duc<hhNeed(S).duc&&!(window.kitRoad&&kitRoad())?`Cần Đức ${BAL.hhDuc} mới được lập Hoàng hậu (mẹ Thái tử: ${BAL.hhDucHeir})`:""}catch(e){return""}}
window.k3DucNeed=k3DucNeed;
function k3Hud(){try{if(!S)return;const d=$$("me-d");if(d){const t=k3Date();if(d.textContent!==t)d.textContent=t}
 /* lãnh cung: the rank chip says what the figure label says (rkOfFace "Phế phi · lãnh cung"), not her old rank (review fold-layout) */
 if(S.out){const r=$$("me-r"),w="Phế phi · lãnh cung";if(r&&r.textContent.trim()!==w)r.textContent=w}
 /* her Tư chất: the kit stat cells in the top bar's kitStatRow (jk4) */
 k3TopRow();try{window.kitHxRoad&&kitHxRoad()}catch(e){}if(typeof kitStatSet!=="function")return;/* NO "!" badge on top-bar stat cells (owner 17/11 08:00Z): the Đức goal (lập Hoàng hậu) lives in the tooltip + the tap popup (k3DucNeed) */const dw=k3DucNeed();
 [["sac","Sắc"],["tai","Tài"],["tamco","Tâm cơ"],["duc","Đức"]].forEach(([k,l])=>{const c=$$("hud-"+k);if(c)kitStatSet(c,S[k],{title:`${l} ${S[k]}${k==="duc"&&dw?" · "+dw:""} · chạm để xem đủ`})});
 /* Danh · Sủng · Bạc · Sức: tooltip = name + value + "chạm để xem đủ" (the label line's own text, so the servant road's "Chủ tin" reads right) */
 ["danh","sung","bac","suc"].forEach(k=>{const c=$$("hud-"+k);if(!c)return;const l=T((c.querySelector(".kstl")||c).textContent),v=k3CellKey(k)==="tin"?S.tin:S[k];kitStatSet(c,hudFmt(k3CellKey(k),v),{title:`${l} ${hudFmt(k3CellKey(k),v)} · chạm để xem đủ`})})}catch(e){}}
/* the top bar's second row (KIT 31.1): time (buổi, khắc dots, weather, Quẻ tuần) + status chips | her Tư chất. ONE component, every device */
function k3TopRow(){const hd=document.querySelector("header.hud");let tc=$$("k3tc");if(!tc&&hd){tc=document.createElement("div");tc.id="k3tc";tc.className="k3tc";
 tc.innerHTML=`<span id="k3tt" class="k3tt"></span>`;hd.appendChild(tc);
 /* every top-bar cell explains itself on tap (owner 15/11 ~17:50Z moved Danh · Sủng into the left group: both groups behave the same) */
 document.querySelectorAll("#kstrow>.kstg").forEach(g=>{const o=e=>{e.stopPropagation();const c=e.target.closest&&e.target.closest('[id^="hud-"]');if(c)k3Explain(k3CellKey(c.id.slice(4)))};g.addEventListener("click",o);g.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ")o(e)})})}return tc}
/* the cell's key -> the explanation key (servant road: the Sủng cell is "Chủ tin") */
function k3CellKey(k){return k==="sung"&&typeof isSrv==="function"&&isSrv()?"tin":k}
if(typeof renderHUD==="function"){const r0=renderHUD;renderHUD=function(){const r=r0.apply(this,arguments);k3Hud();return r}}

/* ---------- stage HUD ---------- */
const K3_TIME=["buoi","lot"],K3_STAT=["sac","tai","tamco","duc"],K3_STATE=["preg","ill","fake","out","block","doc","conf","shield","birth"];window.K3_STATE=K3_STATE;/* other modules add their own state key (e.g. jstory "pl67" = hạn lo liệu) */
const K3_RIGHT=["srk","nt","chu","wage","merit"];/* "tin" (Chủ tin) is in the top bar on the servant road */
window.K3_RIGHT=K3_RIGHT;/* jts adds its status chips here (stage right column) */
const K3_ICO={sac:"sac",tai:"tai",tamco:"tam-co",duc:"duc"};
function k3hc(k){const h=$$("hud2");return h&&h.querySelector(`.hc[data-hx="${k}"]`)}
function k3val(b){const x=b&&b.querySelector("b");return x?T(x.textContent):""}
function k3lab(b){if(!b)return"";const c=b.cloneNode(true);c.querySelectorAll("b,i,img,.kodm").forEach(e=>e.remove());return T(c.textContent)}
function k3row(k,lab,val,cls,ico){return `<button type="button" class="k3r ${cls||""}" data-k3="${k}" title="${lab}${val!==""&&val!=null?" "+val:""}">${ico||""}<span class="k3l">${lab}</span>${val!==""&&val!=null?`<b>${val}</b>`:""}</button>`}
function k3court(){let R=[];try{R=typeof kitCourtRows==="function"?kitCourtRows():[]}catch(e){}
 return R.map(r=>{const m=r.mood;const moodTxt=m&&!/chưa rõ/.test(m[0])?`<span class="ef ${m[1]==="g"?"g":m[1]==="r"?"r":"n"}">${esc(m[0])}</span>`:"";
  let att="";if(r.k==="th"||r.k==="hh"){const n=r.k==="th"?(S.th|0):(S.hh|0);const known=typeof window.kitCourtKnown!=="function"||window.kitCourtKnown(r.k)!==false;
   if(known)att=`<span class="k3v"><small>quý ngươi</small> <span class="ef ${n>0?"g":n<0?"r":"n"}">${n>0?"+":""}${n}</span></span>`}
  return `<button type="button" class="k3c kcrow" data-kc="${r.k}" title="${r.who} · chạm để xem thẻ">${mdH(r.f,"xs")}<span class="k3ct"><b>${r.who}</b>${moodTxt}${att}</span></button>`}).join("")}
/* KIT PART kitGroupFold (owner 18/11 ~20:55Z, review/stage-rightcol; KIT_REQUESTS kitCrewPlaque renamed): ONE generic group accordion for the stage right column.
   Closed = one kit row "Label · N ›" (no faces, same look as "Ân sủng ›"); tap = the group's person cards DROP DOWN in place ("Label · N ‹" folds), never another frame.
   ONE group open at a time; the open key lives in window.__kgfOpen (kept for the whole session, not per place). kitGroupFold(key,label,n,itemsHTML) -> html. */
function kitGroupFold(key,label,n,items){if(!n||!items||window.__kgfOpen!==key)return"";
 return `<div class="k3p kgf kgfopen" data-kgfbox="${key}"><button type="button" class="k3h kgf-t" data-kgf="${key}" title="${esc(label)} · ${n} · chạm để thu lại"><span>${esc(label)} · ${n}</span><b>‹</b></button><div class="kgf-l">${items}</div></div>`}
/* the two small group buttons (right column: top of #kshR on the stage and the iPad map): number over label, same square kit button as the rail; tap = drop list under them */
/* maid-8tabs #33/#34/#36 (owner 21/11 ~03:18Z «layout của mọi thứ copy phải y chang nhau hết», ~03:25Z «chỉ là những cái thay đổi của cái tên thôi»): every road shows
   the SAME two buttons; the words come from ONE label table (jroad8 ROAD8_LAB: cung nữ «Đồng liêu» in the Cung nhân place). Her chủ («Chủ tin N») is a row of the
   court box, where the consort has Hoàng thượng (kitCourtRows, j42 srvCourtRow) — tap = her chủ's person card */
function kgfLab(k){return typeof road8Lab==="function"?road8Lab(k):k==="cn"?"Cung nhân":"Chí tôn"}
function kitGroupBtns(){const d=["cn","ct"].map(k=>[k,kgfLab(k),kgfCount(k)]).filter(x=>x[2]>0);
 if(!d.length)return"";
 return `<div class="kgfbtns">${d.map(([k,l,n])=>{const on=window.__kgfOpen===k;return `<button type="button" class="krailb krailt kgfbtn${on?" kopen":""}" data-kgf="${k}" aria-pressed="${on}" title="${l} · ${n} · chạm để ${on?"thu lại":"mở"}"><b>${n}</b><span>${l}</span></button>`}).join("")}</div>`}
window.kitGroupFold=kitGroupFold;window.kitGroupBtns=kitGroupBtns;
/* «Cung nhân» = her household: the personal maid + every maid / eunuch of S.staff (same person cards as the Cung nhân tab; tap = that tab).
   Cung nữ road (#36): the same box = «Đồng liêu», her colleagues (j42 srvColleagues, the people of her Hậu cung › Đồng liêu pager), value = Thiện cảm */
function k3crewChip(f,name,loy,tip,lab,cls){const n=+loy;return `<button type="button" class="k3c" data-k3go="staff" title="${esc(tip)} · chạm để xem">${f}<span class="k3ct"><b>${esc(name)}</b><span class="k3v"><small>${lab||"Thiện cảm"}</small> <span class="ef ${cls||(n>=BAL.loy.close?"g":n<BAL.loy.warn?"r":"n")}">${esc(String(loy))}</span></span></span></button>`}
function k3crewList(){if(!S)return"";let h="";
 if(typeof isSrv==="function"&&isSrv()){try{srvColleagues().forEach((s,j)=>{const a=S.srv.af[s.sid]|0;let f="";try{f=mdH(pServ(s),"xs")}catch(e){}
   h+=k3crewChip(f,typeof shortN==="function"?shortN(s.name):s.name,a,srkName(s),"Thiện cảm",a>=BAL.srvx.friendAf?"g":a<0?"r":"n").replace('data-k3go="staff"',`data-k3go="staff" data-k3pi="${j}"`)})}catch(e){}return h}
 if(S.maid){let f="";try{f=mdH(pMaid(),"xs")}catch(e){}h+=k3crewChip(f,S.maid.name,S.maid.loyal|0,"Cung nữ thân tín")}
 (S.staff||[]).forEach(s=>{if(!s||s===S.maid)return;let f="";try{f=mdH(pServ(s),"xs")}catch(e){}h+=k3crewChip(f,typeof shortN==="function"?shortN(s.name):s.name,s.loyal|0,s.role==="eunuch"?"Thái giám":"Cung nữ")});
 return h}
function k3crewN(){return kgfCount("cn")}
function k3crew(){return kitGroupFold("cn",kgfLab("cn"),kgfCount("cn"),k3crewList())}
function k3chitonG(){let R=[];try{R=typeof kitCourtRows==="function"?kitCourtRows():[]}catch(e){}return kitGroupFold("ct",kgfLab("ct"),R.length,k3court())}
/* PHONE DƯ ĐỒ (owner 18/11 ~21:40Z): no full-width group bars. «Cung nhân» / «Chí tôn» = TWO small kit rail buttons (number over label) right under the book / scroll icons;
   tap = that group's people list drops down in the empty left strip of the map under the buttons (#kgfdrop, one open at a time, tap again closes). */
function kgfPhoneMap(){try{const m=kitSideHost();return !!m&&m.classList.contains("mapv")&&kitView().pages===1}catch(e){return false}}
function kgfCount(k){try{if(!S||S.dead)return 0;if(k==="cn"){if(typeof isSrv==="function"&&isSrv())return srvColleagues().length;return(S.maid?1:0)+(S.staff||[]).filter(s=>s&&s!==S.maid).length}return(typeof kitCourtRows==="function"?kitCourtRows():[]).length}catch(e){return 0}}
function kgfDrop(){try{let d=document.getElementById("kgfdrop");const k=window.__kgfOpen,mv=kitSideHost();
 if(!k||!kgfPhoneMap()||!mv||!S||S.dead){if(d)d.remove();kgfTags(null);return}
 const lab=kgfLab(k),n=kgfCount(k);if(!n){if(d)d.remove();kgfTags(null);return}
 const items=k==="cn"?k3crewList():k3court();
 if(!d){d=document.createElement("div");d.id="kgfdrop";d.className="ksh kgfdrop"}if(d.parentNode!==mv)mv.appendChild(d);
 const h=`<div class="k3p kgf kgfopen"><div class="k3h kgf-t" style="cursor:default"><span>${esc(lab)} · ${n}</span></div><div class="kgf-l">${items}</div></div>`;if(d.__h!==h){d.innerHTML=h;d.__h=h}
 const rl=document.getElementById("krail"),m0=mv.getBoundingClientRect(),r0=rl?rl.getBoundingClientRect():null;d.style.top=Math.round((r0&&r0.height?r0.bottom-m0.top:52)+6)+"px";
 const ar=document.querySelector("#kshR .kas,#kshR .k3py");const bot=ar?ar.getBoundingClientRect().top-m0.top-6:m0.height-8;d.style.maxHeight=Math.max(120,Math.round(bot-parseFloat(d.style.top)))+"px";kgfTags(d)}catch(e){console.error("kgfDrop",e)}}
/* MAIN ROOT-57 (owner 21:40Z «must not cover the map's place tags more than needed»): while the list is open, a map place tag (.mspot) the list would cover steps right
   just clear of the list (translate only, nothing else changes; data-kgft marks the ones moved); closing the list or panning the map puts every tag back / re-checks */
function kgfTags(d){try{document.querySelectorAll(".mspot[data-kgft]").forEach(t=>{t.style.translate="";delete t.dataset.kgft});if(!d||!d.isConnected)return;
 const sc=d.parentNode&&d.parentNode.querySelector(".mapsc")||document.querySelector(".game.maptab .mapsc,.mapv .mapsc");if(!sc)return;
 const a=d.getBoundingClientRect(),m=sc.getBoundingClientRect(),T=[...sc.querySelectorAll(".mspot")].filter(t=>t.offsetParent).map(t=>({t,z:t.getBoundingClientRect()})).filter(o=>o.z.width>2);
 const ov=(z,l,r)=>l<z.right&&r>z.left;const vis=z=>z.right>m.left&&z.left<m.right&&z.bottom>m.top&&z.top<m.bottom;
 T.forEach(o=>{const z=o.z;if(!vis(z)||!ov(z,a.left,a.right+2)||z.bottom<=a.top||z.top>=a.bottom)return;
  /* step right just clear of the list, then past any other tag it would land on (≤4 hops), only if it stays inside the map view */
  let L=a.right+4;for(let k=0;k<4;k++){const w=z.right-z.left,R=L+w;const h=T.find(q=>q!==o&&!q.moved&&vis(q.z)&&ov(q.z,L,R)&&q.z.top<z.bottom&&q.z.bottom>z.top);if(!h)break;L=h.z.right+3}
  let dx=Math.ceil(L-z.left);if(z.right+dx>m.right-2||L-a.right>z.right-z.left)dx=Math.ceil(a.right+4-z.left);/* no free gap near: just clear of the list (readable beats hidden) */
  if(z.right+dx<=m.right-2){o.t.style.translate=dx+"px 0";o.t.dataset.kgft=dx;o.moved=1;o.z={left:z.left+dx,right:z.right+dx,top:z.top,bottom:z.bottom}}})}catch(e){console.error("kgfTags",e)}}
/* the map re-draws (render) and pans (scroll of any map box): re-check while the list is open */
(function(){let q=0;const go=()=>{cancelAnimationFrame(q);q=requestAnimationFrame(()=>{const d=document.getElementById("kgfdrop");if(d||document.querySelector(".mspot[data-kgft]"))kgfTags(d)})};
 document.addEventListener("scroll",go,{capture:true,passive:true});addEventListener("resize",go);
 /* the map can also be moved without a scroll event (centring / zoom moves the picture box): while the list is open only, a light re-check every 300 ms; idle otherwise */
 setInterval(()=>{if(!document.hidden&&document.getElementById("kgfdrop"))go()},300);
 if(typeof render==="function"){const r0=render;render=function(){const r=r0.apply(this,arguments);try{go();setTimeout(go,350)}catch(e){}return r}}})();
function kgfRail(){try{if(kgfRail.done||typeof kitStageRail!=="object")return;kgfRail.done=1;
 /* one rail item per label of the ONE label table (jroad8 ROAD8_LAB; the kit rail prints a fixed label): it shows on the road whose word it is */
 ["cn","ct"].forEach((k,o)=>{const T0=window.ROAD8_LAB||{"":{}};const labs=[...new Set(Object.keys(T0).map(r=>(T0[r]||{})[k]||(T0[""]||{})[k]||kgfLab(k)))];
  labs.forEach((lab,j)=>kitStageRail.add({id:"kgf-"+k+(j?"-"+j:""),order:61+o,label:lab,title:lab+" · chạm để mở danh sách",count:()=>kgfCount(k),active:()=>window.__kgfOpen===k,when:()=>kgfPhoneMap()&&kgfLab(k)===lab&&kgfCount(k)>0,onTap:()=>{window.__kgfOpen=window.__kgfOpen===k?null:k;const R=$$("kshR");if(R)R.dataset.full="";k3Stage();kgfDrop()}}))})}catch(e){}}
/* a tap on a person IN the open fold goes to that person's card: the fold shuts first (no repaint), so the tab click it sends is not taken as a «tap outside» (maid-8tabs:
   the Cung nhân / Đồng liêu chips and the court rows — Hoàng hậu, her chủ — only closed the fold) */
function kgfShut(){if(!window.__kgfOpen)return;window.__kgfOpen=null;const R=$$("kshR");if(R)R.dataset.full=""}
(function(){if(typeof kitCourtOpen!=="function")return;const o0=kitCourtOpen;kitCourtOpen=function(){try{kgfShut()}catch(e){}return o0.apply(this,arguments)}})();
/* owner ruling via ROOT-56: an open group list closes with ONE tap anywhere outside it (map, tag, figure) — that tap only closes — and with Esc */
function kgfClose(){if(!window.__kgfOpen)return false;window.__kgfOpen=null;const R=$$("kshR");if(R)R.dataset.full="";k3Stage();try{kitStageRail.paint()}catch(e){}return true}
document.addEventListener("click",e=>{if(!window.__kgfOpen)return;const t=e.target;if(t&&t.closest&&t.closest("#kgfdrop,#kshR .kgfopen,[data-kgf],#krail [data-rail^=kgf-]"))return;if(kgfClose()){e.stopPropagation();e.preventDefault()}},true);
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&kgfClose())e.stopPropagation()},true);
/* ROOT-56 flag: a figure's emotion face chip (.kemo seal) never sits under the right column — handled in the ONE kit part kitFigSeal (jfigseal: stage plaque columns are a
   no-go zone, KIT_FIGSEAL.pad); here we only re-run the seal placement after the column changes (no private margin shifts, no polling) */
function kgfClearEmo(){try{if(typeof kitFigSealAll==="function")kitFigSealAll()}catch(e){console.error("kgfClearEmo",e)}}
window.kgfClearEmo=kgfClearEmo;
/* Ân sủng chips (owner 11/15 04:05Z): Tai mắt + the Ân sủng facts under the court chips, same plaque card and column width, one value per line,
   labels never cut. Có thai / Lật thẻ on the chance scale (chanceLvl, j1: Rất thấp…Rất cao), never the act ladder. Bổng lộc lives only here. */
/* maid-8tabs #33: the cung nữ road keeps the same Ân sủng card: Tai mắt + her own facts (Hoàng thượng để ý, Công lao, Lương tháng; Tân Giả khố,
   chuyện của chủ, tai mắt cho người khác when they apply) — the facts that sat in a separate servant box (srk = the header's title, not repeated) */
const K3_SRVAS=["nt","merit","wage","lau","sec","spy"];
function k3AsRows(){if(!S||S.dead)return[];const rd=window.kitRoad&&kitRoad();
 if(rd==="srv"){const L=[["mat","Tai mắt",S.mat|0]];K3_SRVAS.forEach(k=>{const b=k3hc(k);if(b)L.push([k,k==="nt"?"Ngài để ý"/* the column width (KIT_RCOLW 140 px) cuts «Hoàng thượng để ý»; «Ngài» = Hoàng thượng as in «Ngài sủng ngươi»; tap = the full HX text */:k3lab(b),k3val(b)])});return L}
 /* consort-only facts (Lật thẻ, Có thai, Bổng lộc…): none in lãnh cung nor at home (review/small-bugs-2) */if(rd)return[];const L=[];const hv=k=>{const b=k3hc(k);return b?k3val(b):""};
 L.push(["mat","Tai mắt",S.mat|0]);
 let c="",n="";try{c=chanceLvl(conceiveCh())}catch(e){}try{n=chanceLvl(nightCh())}catch(e){}
 if(c)L.push(["con","Có thai",c]);if(n)L.push(["dem","Lật thẻ",n]);
 L.push(["an","Ân tình (đêm)",S.an|0]);const aw=hv("aw");if(aw!=="")L.push(["aw","Số lần ân thưởng",aw]);
 const bl=k3hc("bl");if(bl)L.push(["bl",k3lab(bl).replace(/\s*sau$/,"")||"Bổng lộc","sau "+k3val(bl)]);return L}
function k3AnSung(one,open){const L=k3AsRows();if(!L.length)return"";
 if(one)return `<div class="k3p kas kas1"><button type="button" class="k3r kas-one" data-kasall="1" title="Ân sủng · chạm để mở"><span class="k3l">Ân sủng</span><b>›</b></button></div>`;
 return `<div class="k3p kas${open?" kasopen":""}">`+(open?`<button type="button" class="k3h kasfold" data-kasfold="1" title="Ân sủng · chạm để thu lại"><span>Ân sủng</span><b>‹</b></button>`:`<span class="k3h">Ân sủng</span>`)+L.map(([k,l,v])=>`<button type="button" class="k3r kasr" data-kas="${k}" title="${esc(l)}: ${esc(String(v))} · chạm để xem"><span class="k3l">${esc(l)}</span><b>${esc(String(v))}</b></button>`).join("")+`</div>`}
/* the column is crowded when it runs past the stage floor or touches a figure / name tag (KIT_FIG: chips never cover people) */
function k3AsCrowded(st,R){try{const s=st.getBoundingClientRect(),r=R.getBoundingClientRect();if(r.bottom>s.bottom-8)return true;
 const hit=q=>Math.min(q.right,r.right)-Math.max(q.left,r.left)>1&&Math.min(q.bottom,r.bottom)-Math.max(q.top,r.top)>1;
 const figs=typeof kitFigRects==="function"?kitFigRects():[];if(figs.some(hit))return true;
 return [...st.querySelectorAll(".tok .nm, .tok .tag, .ftag")].some(e=>e.offsetParent&&!R.contains(e)&&hit(e.getBoundingClientRect()))}catch(e){return false}}
document.addEventListener("click",e=>{const a=e.target.closest&&e.target.closest("#kshR [data-kgf]");if(!a)return;e.stopPropagation();
 const k=a.dataset.kgf;window.__kgfOpen=window.__kgfOpen===k?null:k;const R=$$("kshR");if(R)R.dataset.full="";k3Stage();
 const R2=$$("kshR");if(R2&&window.__kgfOpen){const o=R2.querySelector(".kgfopen");if(o)o.scrollIntoView({block:"nearest"})}},true);
/* "Ân sủng ›" opens IN PLACE (owner 11/15 17:40Z + reference shot): the folded chip becomes the full Ân sủng card in the right column,
   column width, label left / value right — never a floating popover; its title "Ân sủng ‹" folds it again */
document.addEventListener("click",e=>{const a=e.target.closest&&e.target.closest("#kshR [data-kas], #kshR [data-kasall], #kshR [data-kasfold]");if(!a)return;e.stopPropagation();
 if(a.dataset.kas){k3Explain(a.dataset.kas);return}
 window.__kasOpen=!a.dataset.kasfold;const R=$$("kshR");if(R)R.dataset.full="";k3Stage();
 /* short stages (844x390): the opened card is scrolled into view inside the column */
 const R2=$$("kshR");if(R2&&window.__kasOpen)R2.scrollTop=R2.scrollHeight},true);
function k3Stage(){try{const st=$$("stage");if(!st)return;{const pk=S?(S.place||"")+"|"+(S.buoi|0)+"|"+(S.month|0):"";if(window.__kasKey!==pk){window.__kasKey=pk;if(window.__kasOpen){window.__kasOpen=false;const kr=$$("kshR");if(kr)kr.dataset.full=""}}}const stop=st.querySelector(".stop");const gm=document.querySelector(".game");
 let L=$$("kshL"),R=$$("kshR");/* KIT 33.11 SIDE COLUMNS EVERYWHERE (owner 16/11 ~19:20Z via s22: "bất kỳ cái nào … dư đồ, màn hình cảnh phòng, nơi chốn … đều sẽ có những
    cái thông tin cột trái và cột phải y chang giống như cái phòng ngủ"): the SAME right column (#kshR) and left rail (#krail, jrail) as her room
    stand on every Dư đồ level too — kitSideHost() = the map leather (.mapv: plan + courtyard) on the Dư đồ tab, else the stage. */
 const mvh=kitSideHost(),mv=mvh!==st?mvh:null;st.classList.toggle("kplfs",!!(typeof window.k3Full==="function"&&window.k3Full()));
 const off=!S||S.dead||!stop||(gm&&gm.classList.contains("maptab")&&!mv);
 if(off){if(L)L.hidden=true;if(R)R.hidden=true;st.classList.remove("k3g");return}
 if(mv){if(L)L.hidden=true}else{if(!L){L=document.createElement("div");L.id="kshL";L.className="ksh kshL"}if(L.parentNode!==stop)stop.appendChild(L)}
 if(!R){R=document.createElement("div");R.id="kshR";R.className="ksh kshR"}const host=mv||st;if(R.parentNode!==host)host.appendChild(R);
 if(!mv)L.hidden=false;R.hidden=false;if(mv){mv.classList.add("kside");k3RW(mv)}else{st.classList.add("k3g");k3RW(st)}
 /* left: time · tư chất · tình trạng */
 const bu=k3hc("buoi"),lot=k3hc("lot"),wx=$$("hud2")&&$$("hud2").querySelector(".kmwx");
 let t="";if(bu){const w=String(BUOI[S.buoi||0]);{const left=typeof used!=="undefined"?Math.max(0,BAL.time.khac-used):BAL.time.khac;t+=`<button type="button" class="k3r k3time" data-k3="buoi" title="Còn ${left} khắc trong buổi" aria-label="${esc(w)}, còn ${left} khắc"><span class="k3l">${esc(w)}</span><span class="k3dots">${[0,1,2,3].map(i=>`<i class="${i<left?"on":""}"></i>`).join("")}</span></button>`}}
 const t1=t;t="";/* line 1 = buổi + khắc (+ states); line 2 = weather + Quẻ (kitStatCell lines, KIT 32) */
 if(wx){const c=wx.cloneNode(true);c.className="k3r k3wx kmwx";window.__k3wx=c.outerHTML}if(window.__k3wx&&S.wx)t+=window.__k3wx
 if(lot){const lt=(k3lab(lot)||T(lot.textContent)).replace(/^Quẻ tuần:\s*/,"Quẻ ");t+=`<button type="button" class="k3r k3lot ${lot.classList.contains("ok")?"ok":lot.classList.contains("hot")?"hot":""}" data-k3="lot"><span class="k3l">${esc(lt)}</span></button>`}
 let s="";K3_STAT.forEach(k=>{const b=k3hc(k);if(!b)return;const im=b.querySelector("img.ic");s+=k3row(k,esc(k3lab(b)),esc(k3val(b)),b.classList.contains("hot")?"hot":"",im?im.outerHTML:(typeof ic==="function"&&K3_ICO[k]?ic(K3_ICO[k],14):""))});
 let x="";K3_STATE.forEach(k=>{const b=k3hc(k);if(!b)return;x+=k3row(k,esc(k3lab(b)),esc(k3val(b)),b.classList.contains("hot")?"hot":b.classList.contains("ok")?"ok":"")});
 const hL="";{const tr=k3TopRow();const tt=tr&&tr.querySelector("#k3tt");const ht=`<span class="kstl k3l1">${t1}${x}</span><span class="kstv k3l2">${t}</span>`;if(tt&&tt.dataset.h!==ht){tt.innerHTML=ht;tt.dataset.h=ht}}
 if(L.dataset.h!==hL){L.innerHTML=hL;L.dataset.h=hL}
 /* right: court chips · servant · servant-road facts */
 let y="";const rdS=window.kitRoad&&kitRoad()==="srv";K3_RIGHT.forEach(k=>{if(rdS&&(k==="srk"||K3_SRVAS.includes(k)))return;/* #33: in the Ân sủng card / the header */const b=k3hc(k);if(!b)return;y+=k3row(k,esc(k3lab(b)),esc(k3val(b)),b.classList.contains("hot")?"hot":b.classList.contains("ok")?"ok":"")});
 const phoneMap=!!mv&&kgfPhoneMap();const hR0=phoneMap?"":kitGroupBtns()+k3crew()+k3chitonG(),hY=y?`<div class="k3p k3py">${y}</div>`:"";
 const full=hR0+k3AnSung(false)+hY;
 /* Ân sủng under the court chips; when the column would run past the stage floor or onto a figure / name tag -> ONE "Ân sủng ›" chip */
 if(R.dataset.full!==full||R.dataset.w!==String(st.clientWidth)+"x"+st.clientHeight){R.classList.remove("kasx");R.innerHTML=full;R.dataset.full=full;R.dataset.w=st.clientWidth+"x"+st.clientHeight;R.dataset.h=full;
  R.classList.remove("k3c2");
  /* review/stage-side (owner 16/11 "lúc nào nó cũng thể hiện đầy đủ … không cần thu gọn"): the column always shows EVERYTHING —
     no folded "Ân sủng ›" chip, no fold title; when it is taller than the stage it scrolls inside itself */
  /* review/stage-side (owner 16/11 "làm cái khung dọc giống như ở trên màn hình điện thoại"): the side info is ALWAYS ONE narrow
     vertical column at the stage's right edge — the tassel-fix two-column block (.k3c2) is gone; a column taller than the stage
     scrolls inside itself (.kasx) */}
 R.classList.add("kasx");
 kgfRail();kgfDrop();kgfClearEmo();requestAnimationFrame(kgfClearEmo);
 k3Gut()}catch(e){console.error("k3Stage",e)}}
function kitSideHost(){try{const gm=document.querySelector(".game");if(gm&&gm.classList.contains("maptab")){const m=document.querySelector("#panel .mapv");if(m&&m.getClientRects().length)return m}}catch(e){}return $$("stage")}
window.kitSideHost=kitSideHost;window.k3Stage=k3Stage;window.k3row=k3row;/* the top-bar row builder, for modules that add a row (jtoil "Hôm nay: …") */
/* name tags are one-line text now: re-run the stage layout once the tags have their final width (fonts, new labels), so neighbours that
   would touch drop to the second tag row (j59 crowd rule) */
function k3Relay(){clearTimeout(window.__k3rl);window.__k3rl=setTimeout(()=>{try{window.j59lay&&j59lay()}catch(e){}kgfClearEmo();setTimeout(kgfClearEmo,700);setTimeout(kgfClearEmo,1600)},250)}
try{document.fonts&&document.fonts.ready.then(k3Relay)}catch(e){}
if(typeof renderStage==="function"){const r1=renderStage;renderStage=function(){const r=r1.apply(this,arguments);k3Relay();return r}}
/* gutter widths: from the stage width, then grown to the plaques' real width; j59 keeps the figures between them */
/* review/stage-side: the side column's width comes from the stage width only (never from its content), so it is the same narrow column
   on every screen and every render: 24 % of the stage, 132–172 px */
function k3RW(st){/* one column width for every host: from the PAGE width (the map leather spans the spread on iPad = 2 pages) */let W=st.clientWidth;try{if((st.classList.contains("mapv")||st.classList.contains("kplfs"))&&kitView().pages===2)W=W/2}catch(e){}/* reviewer stage-pets-r1: the full-screen place painting spans the spread too (33.10) → same column as her room / the map (139 px at 1180, was 172) */if(!W)return;/* owner 17/11 06:45Z: the column is NARROWER, fits its content (the widest line is ~135 px) → ONE width KIT_RCOLW (140 px) on every screen; only a tiny stage shrinks it */const v=Math.round(Math.max(132,Math.min(140,W*.25)))+"px";if(st.style.getPropertyValue("--kgrw")!==v)st.style.setProperty("--kgrw",v)}
function k3Gut(){const st=$$("stage");if(!st)return;const W=st.clientWidth;if(!W)return;k3RW(st);
 const g=Math.round(Math.max(W<520?96:116,Math.min(190,W*.2)));st.classList.toggle("k3n",g<116);const L=$$("kshL"),R=$$("kshR");
 st.style.setProperty("--kgw",g+"px");st.style.setProperty("--k3stw",W+"px");
 /* KIT 33: an EMPTY plaque column (no plaques, zero height) reserves no gutter — the floor belongs to the people */
 const need=el=>{if(!el||el.hidden)return 0;const q=el.getBoundingClientRect();return q.height>2?Math.ceil(q.width)+10:0};
 const gl=Math.max(need(L),0),gr=Math.max(need(R),0);const ol=st.style.getPropertyValue("--kgl"),or=st.style.getPropertyValue("--kgr");
 st.style.setProperty("--kgl",gl+"px");st.style.setProperty("--kgr",gr+"px");
 if((ol!==gl+"px"||or!==gr+"px")&&typeof window.j59lay==="function"){try{window.j59lay()}catch(e){}}}
document.addEventListener("click",e=>{const p=e.target.closest&&e.target.closest("#kshL [data-k3], #kshR [data-k3], #kshR [data-k3go], #kgfdrop [data-k3go], .k3p[data-k3sheet], #k3tt [data-k3]");if(!p)return;
 if(p.classList.contains("kmwx"))return;e.stopPropagation();
 if(p.dataset.k3go){if(p.dataset.k3pi!=null&&typeof PG==="object")PG[p.dataset.k3go]=+p.dataset.k3pi;/* #36: that colleague's card in the Đồng liêu pager */kgfShut();/* the open fold's «tap outside closes» guard (kgfClose) would eat this tab click */const b=document.querySelector(`[data-tab="${p.dataset.k3go}"]`);if(b)b.click();return}
 const k=p.dataset.k3,h=$$("hud2");if(!h)return;
 if(k==="lot"){const b=k3hc("lot");if(b){const c=h.classList.contains("col");h.classList.remove("col");b.click();if(c&&$$("hud2"))$$("hud2").classList.add("col")}return}
 k3Explain(k)},true);
/* owner 11/15 04:05Z: the "Tư chất · trạng thái" sheet is GONE — every fact lives in the top bar, the stage plaques or the court / Ân sủng
   chips. A tap on a fact opens its own explanation (the j19 status-cell card: HX text, Bổng lộc card, Ân thưởng card), never a sheet. */
function k3Explain(k){try{if(!S||S.dead||Q.length)return;try{window.kitHxRoad&&kitHxRoad()}catch(e){}const b=k3hc(k);
 if(b&&!b.classList.contains("keep")){b.click();return}
 const t=typeof HX==="object"&&HX[k];if(t){const hc=$$("hud-"+k),hl=hc&&hc.querySelector(".kstl");Q.unshift({t:b?k3lab(b)||T(b.textContent):hl?T(hl.textContent):k,h:`<p>${t}</p>${k==="duc"&&k3DucNeed()?`<p>${k3DucNeed()}</p>`:""}`});showModal()}}catch(e){}}
window.k3Explain=k3Explain;
function k3Sheet(open){const h=$$("hud2");if(!h)return;if(open)return;/* the sheet never opens (owner 04:05Z) */
 const isOpen=!h.classList.contains("col");if(open===isOpen)return;const t=h.querySelector(".h2t");if(t)t.click()}
/* keep #hud2 folded for good (an old "expanded" choice in localStorage would reopen the sheet) */
if(typeof renderHud2==="function"){const r00=renderHud2;renderHud2=function(){window.__h2c=true;try{localStorage.setItem("hclh-h2c","1")}catch(e){}return r00.apply(this,arguments)}}
window.k3Sheet=k3Sheet;
/* the sheet: tap on the dim backdrop closes it */
document.addEventListener("click",e=>{const h=$$("hud2");if(h&&e.target===h&&!h.classList.contains("col"))k3Sheet(false)});
document.addEventListener("keydown",e=>{if(e.key==="Escape"){const h=$$("hud2");if(h&&!h.classList.contains("col"))k3Sheet(false)}});
/* oi-render: k3Stage reads the stage size (clientWidth/Height) after writing the side column — it ran 3x per render (renderHud2, renderStage,
   render), each a forced layout. Inside a render it now runs ONCE when the outermost render returns (jlag2 renderAfter); outside, at once.
   The name tags (j59lay, inside renderStage) were placed with the gutters of this render's first k3Stage: when the gutters change, they are
   placed again right after, so the frame shows the same as before. */
function k3StageR(){(window.renderAfter||((k,f)=>f()))("k3Stage",()=>{const st=$$("stage");const g0=st?st.className+"|"+st.style.cssText:"";k3Stage();
 try{if(st&&g0!==st.className+"|"+st.style.cssText){if(window.kitFloorFit)kitFloorFit();if(window.j59lay)j59lay()}}catch(e){}})}
if(typeof renderStage==="function"){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{k3StageR()}catch(e){}return r}}
if(typeof renderHud2==="function"){const r0=renderHud2;renderHud2=function(){const r=r0.apply(this,arguments);try{k3StageR();k3Hud()}catch(e){}return r}}
if(typeof render==="function"){const r0=render;render=function(){const r=r0.apply(this,arguments);try{k3Hud();k3StageR()}catch(e){}return r}}
try{const st=$$("stage");if(st&&window.ResizeObserver)new ResizeObserver(()=>{clearTimeout(window.__k3g);window.__k3g=setTimeout(k3Gut,30)}).observe(st)}catch(e){}

/* ---------- CSS: the one layout ---------- */
const css=document.createElement("style");css.id="k3-layout";css.textContent=`
:root{--k3pl:rgba(255,250,240,.88)}
/* stage frame (KIT 31.3): portrait screens get a FIXED aspect — Fold/tablets 600–999 px wide: 2:1 (width:height); phones < 600 px: 3:2.
   The panel below takes the rest and scrolls. Landscape: the left column (unchanged). */
:root{--kstH:calc((100vw - 16px) / 2)}
/* kv3:.kv1 */:root:where(.kv1){--kstH:calc((100vw - 12px) / 1.5)}
/* 3 · ONE STAGE SIZE (portrait): same on every tab; the panel scrolls */
/* kv3:.kv1 */
 html:where(.kv1) body .game#game:not(.maptab),html:where(.kv1) body .game#game.cardtab:not(.maptab){grid-template-rows:auto var(--kstH) minmax(0,1fr) auto!important}

/* 1 · TOP BAR: one slim row */
html body header.hud{display:grid!important;grid-template-columns:auto minmax(0,1fr) auto!important;grid-template-areas:"menu me stats"!important;align-items:center!important;gap:0 10px!important;padding:4px 8px!important;min-height:0!important;flex-wrap:nowrap!important}
html body header.hud>#menu{grid-area:menu;min-height:40px!important;min-width:40px!important;padding:0 8px!important;align-self:center}
html body header.hud>.me{grid-area:me;min-width:0!important;max-width:none!important;flex:none!important;display:flex!important;align-items:center;gap:8px;padding:0!important;background:none!important;border:0!important;text-align:left}
html body header.hud>.me .mi{display:flex!important;flex-direction:column;min-width:0;gap:1px}
html body header.hud>.me .mi>b{font-size:1.02rem!important;line-height:1.15}
html body header.hud>.me .rk{align-self:flex-start;font-size:.74rem!important}
html body header.hud>.me .dt,html body header.hud #me-d{font-size:.74rem!important;line-height:1.25!important;white-space:normal!important;display:block!important;color:var(--dim)}
html body header.hud>#emp{display:none!important}
html body header.hud>#hud2,html body #hud2.khud{position:fixed!important;left:0!important;top:0!important;width:0!important;height:0!important;min-height:0!important;padding:0!important;margin:0!important;border:0!important;overflow:visible!important;background:none!important;box-shadow:none!important;z-index:60}
html body #hud2.hud2>:not(.khg):not(#k3x){display:none!important}
/* the full status sheet: a centred kit sheet over a dim backdrop, scrolls inside */
html body #hud2:not(.col):has(.khg)::before{content:"";position:fixed;inset:0;background:#2a1a1266;z-index:0}
html body #hud2 .khg{position:fixed!important;z-index:1!important;left:50%!important;top:50%!important;transform:translate(-50%,-50%);width:min(760px,calc(100vw - 24px))!important;max-height:calc(100dvh - 32px)!important;overflow:auto!important;overscroll-behavior:contain;box-sizing:border-box}
html body #hud2 .khg .khsh{position:sticky;top:-8px;z-index:2;background:var(--k-card,#fffaf0);margin:-8px -8px 0;padding:8px}
html body #hud2 .khg .khc .hc{white-space:normal!important}
/* one fact, one place: Thái hậu / Hoàng hậu attitude is in the Trong cung column of the sheet (and on their stage chips) */
html body #hud2 .khg .khc .hc[data-hx="th"],html body #hud2 .khg .khc .hc[data-hx="hh"]{display:none!important}
/* kv: dropped @media (max-width:599px) (one page = spread page, KIT §0) */
/* 4 · STICKY HEADERS in the panel (sub-tabs .ksub and any later sticky bar): opaque, and the panel's 8 px top padding band above them is
   covered too, so rows scrolling up never show above the bar */
html body #panel .ksub{top:0!important;z-index:7!important;box-shadow:0 -9px 0 0 var(--panel),0 3px 6px -4px #5a3a2040;overflow:visible!important}
html body #panel .ksub .ksubb:first-child{border-radius:8px 0 0 8px}html body #panel .ksub .ksubb:last-child{border-radius:0 8px 8px 0}
/* 5 · CHIP LISTS / SELECTORS wrap, never clip (the panel scrolls) */
html body #panel .relsel,html body #panel .pctabs:not(.kcattabs),html body #panel .chips,html body #panel .kchips{flex-wrap:wrap!important;overflow:visible!important;max-height:none!important}
/* 2 · STAGE HUD plaques */
html body .stage.k3g .stop{right:auto!important;width:var(--kgw,150px)!important;max-width:var(--kgw,150px)!important;flex-direction:column!important;align-items:stretch!important;gap:5px!important;max-height:calc(100% - 16px)!important;pointer-events:none}
html body .stage.k3g .stop .scene-t{max-width:none!important;width:auto;flex:0 0 auto!important;font-size:.95rem}
html body .stage.k3g .stop .scene-t *{white-space:normal!important}
html body .stage.k3g #sc-t h2{display:block!important;font-size:1.05rem;line-height:1.15;margin:0}html body .stage.k3g #sc-t h2>*{display:inline!important;min-width:0!important}
html body .stage.k3g.k3n #sc-t h2{font-size:.86rem}
.ksh{display:flex;flex-direction:column;gap:5px;pointer-events:none;min-width:0}
.ksh[hidden]{display:none!important}
html body .kshR{position:absolute;top:8px;right:8px;width:var(--kgrw,150px);min-width:0;max-width:none;z-index:2;align-items:stretch;box-sizing:border-box}
/* review/stage-side: one narrow column; every plaque is the column width (border-box), names / labels wrap, nothing runs past its edge */
.kshR *{box-sizing:border-box}.kshR .k3c .k3ct>b{white-space:normal!important;overflow-wrap:anywhere}.kshR .k3c .k3ct{flex:1 1 auto}
.kshR .k3r>b{white-space:normal;text-align:right}
/* owner 11/15: people may stand under the right column — its plaques float on top on a SOLID card */
.kshR .k3p,.kshR .k3c{background:rgb(255,250,240)!important;backdrop-filter:none}
.ksh .k3p,.ksh .k3c{pointer-events:auto;background:var(--k3pl);border:1px solid var(--line);border-radius:8px;box-shadow:0 1px 4px #3a20101f;backdrop-filter:blur(2px)}
.ksh .k3p{display:flex;flex-direction:column;padding:3px 6px;gap:0}
.ksh .k3h{font-family:var(--display);font-size:.7rem;color:var(--gold);letter-spacing:.03em;border-bottom:1px solid var(--k-hair,#e6d3ac);margin-bottom:1px}
.ksh .k3r{display:flex!important;align-items:center;gap:4px;border:0;background:none;padding:1px 0;margin:0;font:inherit;font-size:.75rem;line-height:1.25;color:var(--ink);text-align:left;cursor:pointer;min-height:0;width:100%}
.ksh .k3r .k3l{flex:1 1 auto;min-width:0;white-space:normal}
.ksh .k3r>b{font-weight:700;white-space:nowrap;margin-left:auto}
.ksh .k3r img.ic{width:14px;height:14px;flex:0 0 auto}
.ksh .k3r.hot,.ksh .k3r.hot b{color:var(--bad)}.ksh .k3r.ok,.ksh .k3r.ok b{color:var(--good)}
.ksh .k3lot .k3l{font-weight:600}
.ksh .k3time{flex-wrap:wrap;column-gap:4px}.ksh .k3time .k3l{font-weight:700;color:var(--gold);flex:0 1 auto}.ksh .k3time>b{margin-left:0}
.ksh .k3wx{padding-left:0!important;font-size:.75rem!important;background:none!important;border:0!important;box-shadow:none!important;min-height:0!important}
.ksh .k3wx img{width:18px!important;height:18px!important;border-radius:50%}
.ksh .k3cs{display:grid;grid-template-columns:100%;grid-auto-rows:1fr;gap:4px}/* owner 17/11 06:50Z: same-kind cards (Hoàng thượng / Thái hậu / Hoàng hậu / cung nữ) = ONE height (the tallest), all the column's width */
.ksh .k3c{display:flex;align-items:center;gap:5px;padding:2px 6px 2px 3px;font:inherit;text-align:left;cursor:pointer;min-height:0;color:var(--ink);width:100%}
.ksh .k3c .md{flex:0 0 auto}
.ksh .k3c .k3ct{display:flex;flex-direction:column;line-height:1.2;min-width:0}
.ksh .k3c .k3ct>b{font-size:.75rem;color:var(--gold);font-weight:700;white-space:nowrap}
.ksh .k3c .k3ct>.ef,.ksh .k3c .k3v{font-size:.72rem;font-weight:600}
.ksh .k3c .k3v small{font-weight:400;color:var(--dim);font-size:.68rem}
/* narrow stage (phones): smaller type, Tư chất as icon + number (label in the tooltip), chips keep title + value */
.stage.k3n .ksh .k3r,.stage.k3n .ksh .k3c .k3ct>b{font-size:.64rem}.stage.k3n .ksh .k3c .k3ct>.ef,.stage.k3n .ksh .k3c .k3v{font-size:.62rem}
.stage.k3n .ksh .k3c{padding:2px 4px 2px 2px;gap:3px}.stage.k3n .ksh .k3c .md{width:20px!important}
.stage.k3n .ksh .k3ps{display:grid;grid-template-columns:1fr 1fr;column-gap:6px}.stage.k3n .ksh .k3ps .k3h{grid-column:1/-1}
.stage.k3n .ksh .k3ps .k3r .k3l{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0)}
.stage.k3n .ksh .k3c .k3v small{font-size:.58rem}
/* Ân sủng plaque under the court chips (owner 11/15 04:05Z) */
.ksh .kas .k3r{column-gap:8px}.ksh .kas .k3r>b{color:var(--ink)}
.ksh .kas .kasfold{all:unset;box-sizing:border-box;display:flex;justify-content:space-between;align-items:baseline;width:100%;cursor:pointer;font-family:var(--display);font-size:.7rem;color:var(--gold);letter-spacing:.03em;border-bottom:1px solid var(--k-hair,#e6d3ac);margin-bottom:1px}
/* kitGroupFold (stage right column): closed row like "Ân sủng ›"; open = header + the person cards stacked in place */
.ksh .kgf.kgfopen{padding:3px 4px 4px}.ksh .kgf-t{all:unset;box-sizing:border-box;display:flex;justify-content:space-between;align-items:baseline;width:100%;cursor:pointer;font-family:var(--display);font-size:.7rem;color:var(--gold);letter-spacing:.03em;border-bottom:1px solid var(--k-hair,#e6d3ac);margin-bottom:3px;padding:1px 2px}
.kgfbtns{display:flex;gap:6px;flex:none}.kgfbtns .kgfbtn.krailb{flex:1 1 0;width:auto;min-width:0;padding:2px}
.ksh .kgf-l{display:flex;flex-direction:column;gap:3px}.ksh .kgf-l .k3c{flex:none;box-shadow:none;border-color:var(--k-hair,#e6d3ac)}
.kshR>.kgf,.kshR>.kgfbtns,.kshR>.kas,.kshR>.k3py{flex:none}

/* kitGroupFold on the phone Dư đồ: the drop list stands in the left strip of the map under the rail buttons */
.kgfdrop{position:absolute;left:6px;width:var(--kgrw,140px);z-index:9;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;scrollbar-width:thin;pointer-events:auto}

.krailb.krailt{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:0;line-height:1.05;color:var(--ink,#3a2418)}
.krailb.krailt b{font-size:1.05rem;font-weight:800;color:var(--gold,#9a6b12)}
.krailb.krailt span{font-size:.46rem;font-weight:700;white-space:nowrap;letter-spacing:0}
.krailb.krailt.kopen{box-shadow:0 0 0 2px var(--gold,#b8892b),0 1px 4px #3a20101f}
.kshR.kasx{max-height:calc(100% - 16px - var(--kgrb,0px));overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;scrollbar-width:thin}
.ksh .kas1{padding:2px 6px}.ksh .kas-one .k3l{font-weight:700;color:var(--gold)}.ksh .kas-one>b{color:var(--gold)}
`;document.head.appendChild(css);

/* ---------- 6. kitPhoneShell (KIT 31.7, owner 11/14): portrait screens under 1000 px wide (Fold, phones) work as TWO views.
   HOME = the room scene full screen between the slim top bar and the bottom tab bar (stage HUD plaques on it; tap a person = card).
   PANEL = a bottom tab opens full screen in place of the room (sub-tabs, picker, person card get the whole height).
   Back to the room: tap the active tab again, or the "Phòng" button in the top bar; "Sang buổi" always lands in the room. A person card
   opened from the room (#popw) shows full screen too and returns to the room when closed. Result cards / events overlay as before.
   Wider or landscape screens keep the split stage | panel. ---------- */
const K3SH={home:true};
/* KIT §75 kitBackBtnHtml(kind,label): ONE painted icon button for every "go back to a place" control (room / map). Icon = img/kit/ico-<kind>.webp
   (gpt-2-6), label beside it (short, one line, ellipsis); the button has no bar of its own (no border / ground), so nothing reads as an empty field. */
function kitBackBtnHtml(kind,label){return `<img class="kbi" src="img/kit/ico-${kind}.webp" width="30" height="30" alt="" draggable="false" onerror="this.remove()"><span class="kbl">${label}</span>`}
window.kitBackBtnHtml=kitBackBtnHtml;
/* KIT §0 sample: ONE design frame — the spread (2 pages) and the one-page view, drawn to scale from KIT_FRAME */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§0",title:"Khung thiết kế · một trang = nửa trang đôi iPad (co giãn đều)",
 html:()=>{const F=window.KIT_FRAME||{spread:{w:1180,h:820},page:{w:590,h:820}},k=.2,v=(typeof kitView==="function"?kitView():{pages:2}),pg=(t,c)=>`<div style="width:${F.page.w*k}px;height:${F.page.h*k}px;border:1px solid var(--line);background:${c};display:grid;place-items:center;font-size:.7rem;color:var(--ink)">${t}</div>`;
  return `<div class="kitpg-row" style="display:flex;gap:24px;align-items:flex-end;flex-wrap:wrap"><div><div style="display:flex">${pg("Phòng (trang trái)","#f3e6c9")}${pg("Thẻ đang mở (trang phải)","#fbf3dd")}</div><small>Ngang: ${F.spread.w}×${F.spread.h}</small></div><div>${pg("Phòng ⇄ thẻ","#fbf3dd")}<small>Dọc: ${F.page.w}×${F.page.h}</small></div><small>Đang xem: ${v.pages===1?"một trang":"trang đôi"}</small></div>`}})}catch(e){}
/* KIT §0 sample: the ONE-PAGE bottom bar — 8 tabs as TWO ROWS OF 4 + Sang buổi as one tall button (owner 16/11 13:25Z (C); the real bar gets the same from :where(.kv1) in p1.html + tabsFit) */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§0b",title:"Thanh tab dưới · một trang: 2 hàng x 4 nút + Sang buổi",
 html:()=>`<nav class="bar" style="width:582px;max-width:100%;display:flex;gap:5px;align-items:stretch"><div class="tabs" style="flex:1;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:minmax(36px,1fr);gap:4px;overflow:visible">${["Hành sự","Dư đồ","Hậu cung","Giao tình","Hoàng tự","Tư trang","Tài nghệ","Mệnh truyện"].map((t,i)=>`<button type="button" aria-selected="${i===0}" style="min-height:36px;padding:2px 4px;border-radius:8px;font-size:.86rem">${t}</button>`).join("")}</div><button type="button" class="main" style="width:84px;padding:4px 6px;white-space:normal;font-size:.95rem;line-height:1.15;border-radius:8px">Sang buổi</button></nav>`})}catch(e){}
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§75",title:"kitBackBtnHtml · nút về phòng / về bản đồ (biểu tượng vẽ)",
 html:()=>`<div class="kitpg-row" style="display:flex;gap:18px;align-items:center;flex-wrap:wrap"><span class="kbackb">${kitBackBtnHtml("room","Về phòng")}</span><span class="kbackb">${kitBackBtnHtml("room","Về Kính sự phòng")}</span><span class="kbackb">${kitBackBtnHtml("map","Dư đồ")}</span></div>`})}catch(e){}
/* one-page view (KIT §0 kv1): the room home and the open tab are the two pages of the spread, shown one at a time */
/* KIT 33.10 (jplfs): away from her own residence the place painting is the whole page on EVERY screen = the one-page shell */
/* stage-here (owner OD 18/11 ~19:45Z (5)): the STAGE on Hành sự and EVERY tab = the place where she IS (S.place); the one-page full-screen
   painting (KIT 33.10) is only the place PAGE itself (K3SH.home); any tab on a two-page screen = the normal spread, stage (her place) | panel */
function k3Full(){try{return typeof window.kplAway==="function"&&window.kplAway()&&(kitView().pages===1||K3SH.home)}catch(e){return false}}
window.k3Full=k3Full;
function k3Phone(){try{return kitView().pages===1||k3Full()}catch(e){return false}}
function k3Shell(){try{if(window.COOPW&&COOPW.ctx)return;/* co-op thin: the other seat's run on the host never drives the host's phone shell */const gm=document.querySelector(".game");if(!gm)return;try{const hd0=document.querySelector("header.hud");if(hd0)document.documentElement.style.setProperty("--k3hb",Math.round(hd0.getBoundingClientRect().bottom)+"px");const nb0=document.querySelector("nav.bar");if(nb0)document.documentElement.style.setProperty("--k3nb",Math.round(innerHeight-nb0.getBoundingClientRect().top)+"px")}catch(e){}const on=k3Phone()&&!!S&&!S.dead;const alive=!!S&&!S.dead;gm.classList.toggle("k3ph",on);
 const pw=$$("popw");const pop=!!(pw&&pw.children.length&&pw.textContent.trim());
 const wasPop=gm.classList.contains("k3pop");gm.classList.toggle("k3home",on&&K3SH.home&&!pop);gm.classList.toggle("k3pop",on&&pop);
 /* reviewer stage-pets-r1: the left rail (KIT 33.11) is re-drawn by renderStage while the card page still hides the stage, so closing a person card left the painting WITHOUT the rail (no way back to the map): re-draw it when the card page opens / closes */
 if(wasPop!==gm.classList.contains("k3pop"))try{if(typeof kitStageRail==="object"&&kitStageRail.paint)requestAnimationFrame(()=>kitStageRail.paint())}catch(e){}
 let rb=$$("k3room");const hd=document.querySelector("header.hud");
 if(alive&&!rb&&hd){rb=document.createElement("button");rb.id="k3room";rb.type="button";rb.className="btn k3room kbackb";rb.innerHTML=kitBackBtnHtml("room","Về phòng");rb.title="Về phòng";rb.setAttribute("aria-label","Về phòng");rb.addEventListener("click",e=>{e.stopPropagation();k3Home()});hd.appendChild(rb)}
 /* owner 16/11 (Q6): wide / landscape (two-page spread) shows the room button too, always; one-page view keeps it only while away from the room home */
 if(rb)rb.hidden=!alive||(on&&K3SH.home&&!pop);
 document.querySelectorAll("#tabs [data-tab]").forEach(b=>b.classList.toggle("k3dim",on&&K3SH.home&&!pop))}catch(e){console.error("k3Shell",e)}}
window.k3Shell=k3Shell;
function k3Home(){K3SH.home=true;try{if(typeof popIdx!=="undefined"&&popIdx!=null){popIdx=null;if(typeof renderStage==="function")renderStage()}}catch(e){}const pw=$$("popw");if(pw&&pw.children.length)pw.innerHTML="";k3Shell();setTimeout(()=>{try{window.j59lay&&j59lay();typeof kitFloorFit==="function"&&kitFloorFit()}catch(e){}},30)}
window.k3Home=k3Home;
/* owner 11/15 06:38Z: tapping the place she is AT on Dư đồ opens that place's stage (scene + the people there), like arriving — on the
   phone shell that is the room view, not the Hành sự panel; arriving from the map lands on the stage too. "‹ Phòng" says where she is
   ("‹ Kính sự phòng") and returns to that stage (her current place, not home). */
function k3ShowPlace(){if(window.COOPW&&COOPW.ctx)return;/* co-op thin: the other seat's run on the host never drives the host's phone shell */window.__k3quiet=1;clearTimeout(window.__k3qt);window.__k3qt=setTimeout(()=>{window.__k3quiet=0},450);K3SH.home=true;k3Home()}
function k3PlaceName(){try{if(!S||!S.place||S.place==="home")return"Phòng";return typeof accName==="function"?accName(S.place):(placeOf(S.place).n||"Phòng")}catch(e){return"Phòng"}}
(function(){if(typeof j77Tap==="function"){const t0=j77Tap;j77Tap=function(k){const here=!!(S&&!S.dead&&!Q.length&&k&&S.place===k);const r=t0.apply(this,arguments);
  if(here&&k3Phone())k3ShowPlace();return r}}
 const g0=goTo;goTo=function(k){const fromMap=typeof tab!=="undefined"&&tab==="go";const p0=S&&S.place;const r=g0.apply(this,arguments);
  try{if(fromMap&&k3Phone()&&S&&!S.dead&&S.place===k&&p0!==k&&!Q.length)k3ShowPlace()}catch(e){}return r};
 const s0=k3Shell;k3Shell=function(){const r=s0.apply(this,arguments);try{const rb=$$("k3room");if(rb){const t=S&&S.place&&S.place!=="home"?"Về "+k3PlaceName():"Về phòng";const l=rb.querySelector(".kbl");if(l&&l.textContent!==t){l.textContent=t;rb.setAttribute("aria-label",t)}rb.title=t}}catch(e){}return r};window.k3Shell=k3Shell})();
document.addEventListener("click",e=>{if(!k3Phone())return;const b=e.target.closest&&e.target.closest("#tabs [data-tab], #tabs [data-kg]");
 if(b){const active=b.classList.contains("on")||b.classList.contains("kgon")||b.getAttribute("aria-selected")==="true";
  if(!K3SH.home&&active&&!b.classList.contains("kghide")){e.preventDefault();e.stopPropagation();k3Home();return}
  K3SH.home=false;setTimeout(k3Shell,0);return}
 if(e.target.closest&&e.target.closest("#next")){K3SH.home=true;setTimeout(k3Home,0)}},true);
try{const pw=$$("popw");if(pw)new MutationObserver(()=>{clearTimeout(window.__k3pw);window.__k3pw=setTimeout(k3Shell,0)}).observe(pw,{childList:true})}catch(e){}
addEventListener("resize",()=>{clearTimeout(window.__k3sh);window.__k3sh=setTimeout(k3Shell,60)});
if(typeof render==="function"){const r0=render;render=function(){const r=r0.apply(this,arguments);try{k3Shell()}catch(e){}return r}}
/* any code path that switches tab on its own (rank chip, court chips, links "Xem đầy đủ ở Nhật ký") opens the panel view */
(function(){let t0=typeof tab!=="undefined"?tab:null;setInterval(()=>{try{if(tab!==t0){t0=tab;if(k3Phone()&&K3SH.home&&!window.__k3quiet){K3SH.home=false;k3Shell()}}}catch(e){}},150)})();
const cssS=document.createElement("style");cssS.id="k3-shell";cssS.textContent=`
html body .game#game.k3ph:not(.maptab)>#stage{grid-area:stage!important}html body .game#game.k3ph:not(.maptab)>#panel{grid-area:stage!important}
html body .game#game.k3ph:not(.maptab){grid-template-areas:"hud" "stage" "bar"!important;grid-template-columns:minmax(0,1fr)!important}
html body .game#game.k3ph.k3home:not(.maptab){grid-template-rows:auto minmax(0,1fr) auto!important}
html body .game#game.k3ph.k3home:not(.maptab)>#panel{display:none!important}
/* KIT §0: one page shows ONE page box between the top bar and the tab bar (no empty row, no extra gap): same page box as the spread */
html body .game#game.k3ph:not(.k3home):not(.maptab){grid-template-rows:auto minmax(0,1fr) auto!important}
html body .game#game.k3ph:not(.k3home):not(.maptab)>#stage{visibility:hidden!important;min-height:0!important;height:0!important;border:0!important;overflow:hidden!important}
html body .game#game.k3ph.k3pop>#panel{display:none!important}
/* the person card docked by j59 (#popw.j59dock, grid-area:panel) has no 'panel' area on the one-page grid: it took implicit tracks and squeezed the top bar to 329 px (Fold, found by review/two-way-acts shots) — it takes the page box like a tab panel */
html body .game#game.k3ph.k3pop>#popw{grid-area:stage!important}
/* the person card page (#popw docked in the grid by j59dock with grid-area "panel") takes the ONE page box too: the one-page grid has no "panel"
   area, so an undocked area name made an implicit second column (top bar + tabs squeezed to the left, card in a 270 px strip; Fold home + places) */
html body .game#game.k3ph>#popw.j59dock{grid-area:stage!important}
html body .game#game.k3ph:not(.k3pop)>#popw{display:none!important}
html body header.hud>#k3room{grid-area:stats;justify-self:start;min-height:40px;padding:0 12px;font-weight:600;color:var(--gold);white-space:nowrap}
/* KIT §75 painted back button (room / map): icon + short label, no bar */
.kbackb{display:inline-flex;flex-direction:row;align-items:center;gap:5px;background:none!important;border:0!important;box-shadow:none!important;padding:0 6px!important;font-weight:600;color:var(--gold);white-space:nowrap;cursor:pointer;-webkit-tap-highlight-color:transparent}
.kbackb .kbi{width:30px;height:30px;max-width:none;flex:none;object-fit:contain;filter:drop-shadow(0 1px 1px #5a3a2040)}
.kbackb .kbl{font-size:.74rem;line-height:1.1;min-width:0;overflow:hidden;text-overflow:ellipsis}
.kbackb:active .kbi{transform:scale(.94)}
/* phones < 600 px: icon only (label = tooltip / aria-label, same as the stat cells), sits under the menu button */
/* kv3:.kv1 */html:where(.kv1) body header.hud>#k3room.kbackb{padding:0!important;min-height:0;justify-self:center;align-self:center}
 html:where(.kv1) body header.hud>#k3room.kbackb .kbl{display:none}
 /* icon missing (CDN 404, img removed by onerror): show the label so the button never becomes invisible */
 html:where(.kv1) body header.hud>#k3room.kbackb:not(:has(.kbi)) .kbl{display:inline!important}
 html:where(.kv1) body header.hud>#k3room.kbackb:not(:has(.kbi)){padding:0 8px!important;min-height:34px}
 html:where(.kv1) body header.hud:has(#k3room.kbackb:not(:has(.kbi))):not(:has(#k3room[hidden]))>#menu{justify-self:start}
html body .stage>#tomap.kbackb,html body #tomap.kbackb{background:#fffaf0e6!important;border:1px solid var(--line,#d9c49a)!important;border-radius:18px!important;padding:2px 12px 2px 6px!important;color:var(--ink,#3a2a1a);box-shadow:0 2px 8px #0004!important;min-height:38px;font-family:var(--display)}
html body header.hud>#k3room.kbackb{justify-self:end;min-height:36px;max-width:100%}
html body header.hud>#k3room[hidden]{display:none!important}
html body .game#game.k3ph header.hud>#k3room:not([hidden]){grid-area:room}
/* top bar time block (31.1): the bar grid, the stat cells and the two-line time block are kitStatRow / kitStatCell (jk4, KIT 32) */
.k3tc .k3tt .k3r{display:inline-flex;align-items:center;gap:4px;border:0;background:none;padding:0;font:inherit;font-size:.74rem;color:var(--ink);cursor:pointer;min-height:24px;white-space:nowrap}
.k3tc .k3tt .k3r .k3l{white-space:nowrap}.k3tc .k3tt .k3r.hot{color:var(--bad)}.k3tc .k3tt .k3r.ok{color:var(--good)}
.k3tc .k3tt .k3time .k3l{font-weight:700;color:var(--gold)}
.k3tc .k3tt .k3wx{background:none!important;border:0!important;box-shadow:none!important;padding:0!important;font-size:.74rem!important;min-height:24px!important}.k3tc .k3tt .k3wx img{width:18px!important;height:18px!important;border-radius:50%}
.k3tc .k3dots{display:inline-flex;gap:3px}.k3tc .k3dots i{width:9px;height:9px;border-radius:50%;border:1.5px solid var(--gold);background:transparent}.k3tc .k3dots i.on{background:var(--gold)}
.ksh .k3dots{display:inline-flex;gap:3px;margin-left:auto}.ksh .k3dots i{width:9px;height:9px;border-radius:50%;border:1.5px solid var(--gold);background:transparent}.ksh .k3dots i.on{background:var(--gold)}
/* one fact, one place: buổi / khắc are on the time plaque; Tư chất in the top bar (the sheet keeps the rest) */
html body #hud2 .khg .khc .hc[data-hx="buoi"],html body #hud2 .khg .khc .hc[data-hx="sac"],html body #hud2 .khg .khc .hc[data-hx="tai"],html body #hud2 .khg .khc .hc[data-hx="tamco"],html body #hud2 .khg .khc .hc[data-hx="duc"]{display:none!important}
html body #hud2 .khg .hc.hot[data-hx]{color:inherit}
/* 3 + 4 · scene words straight on the painting (no plaque, no pill), one line each, soft light halo for readability */
/* s31 stage-caption (owner 17/11: caption too faint over the backdrop): the place name + caption sit on the SAME kit plate as the side plaques (.k3p: --k3pl paper, --line border, 8px radius) and the caption uses the kit body size */
html body .stage #sc-t{background:var(--k3pl)!important;border:1px solid var(--line)!important;border-radius:8px!important;box-shadow:0 1px 4px #3a20101f!important;backdrop-filter:blur(2px)!important;padding:3px 8px!important}
html body .stage #sc-t h2,html body .stage #sc-t h2 *{white-space:nowrap!important;color:#3a1d10;text-shadow:none}
html body .stage #sc-t h2 .rmsg{font-size:.88rem!important;line-height:1.25;font-weight:600}
/* the place line never runs under the court chips (review fold-layout): it ends before the right plaque column; the place NAME stays one
   line, the trailing note ("… đi vắng, đang ở …") wraps under it */
html body .stage.k3g #sc-t{width:max-content!important;max-width:calc(var(--k3stw,100vw) - var(--kgr,0px) - 24px)!important}
html body .stage.k3g #sc-t h2{white-space:normal!important}html body .stage.k3g #sc-t h2>*:not(:first-child),html body .stage.k3g #sc-t h2>*:not(:first-child) *{white-space:normal!important}
html body .stage .tok .tag,html body .stage #j59metag .tag{background:none!important;border:0!important;box-shadow:none!important;padding:0!important;white-space:nowrap!important;color:#2a1a12!important;font-weight:600;text-shadow:var(--kts,0 0 2px #fff8ee,0 0 5px #fff8ee,0 0 9px #fff8eecc)}
/* KIT 33.5 STAGE NAME CHIP (owner 11/15 iPad): TWO lines — rank / role on top (small), name below (bigger); both tinted by the person's
   rank colour (--tc from j59col = the kit rank palette RCOL / maid MRCOL / eunuch ERCOL / Emperor gold / Thái hậu amber), darkened for legibility */
html body .stage .tok .tag,html body .stage #j59metag .tag{text-align:center!important}
html body .stage .tok .tag .j59t,html body .stage #j59metag .tag .j59t{display:block!important;background:none!important;box-shadow:none!important;padding:0!important;margin:0 0 1px!important;font-size:.74rem!important;line-height:1.1!important;font-weight:600;letter-spacing:.02em;color:color-mix(in srgb,var(--tc,#7a5530) 75%,#2a1a12)!important}
html body .stage .tok .tag .j59n,html body .stage #j59metag .tag .j59n{display:block!important;margin:0!important;font-size:1rem!important;line-height:1.2!important;font-weight:700;color:color-mix(in srgb,var(--tc,#2a1a12) 45%,#2a1a12)!important}
html body .stage .tok .tag .j59t.j59only,html body .stage #j59metag .tag .j59t.j59only{font-size:1rem!important;font-weight:700}
/* NON-PERSON PICTURES: kitArtFrame = kitSceneArt (jk2b; simple gold line, no tassel, KIT 31.10); act slot 170 px wide (128 px on phones), 3:4 */
:root{--kaw:170px}#panel.k3pn .cards{--kaw:128px}
html body button.ka.kcard.kart{min-height:0!important}
/* floating notes (kmnote: "Tối nay Hoàng thượng lật thẻ…") sit just above the bottom tab bar: never over the top bar, the date or the sub-tabs */
html body .kmnote{top:auto!important;bottom:calc(var(--k3nb,60px) + 10px)!important}
#tabs [data-tab].k3dim{background:var(--panel)!important;color:var(--ink)!important;box-shadow:none!important}
`;document.head.appendChild(cssS);

/* ---------- 7. kitCatTabs (KIT 31.11, owner 11/14): a long act list (Hành sự, servant Phận sự, Cung nhân, Tài nghệ … any `.cards` grid of
   act cards with 2+ categories and 6+ cards) is split into CATEGORY TABS — the same tab row as the person card's act groups (`.pctabs .pct`,
   count "làm được/tổng"), one sticky row that scrolls sideways on narrow screens. "Tất cả" first; the last choice is remembered per tab. ---------- */
/* the ONE category-tab row (buttons only; the caller owns the .pctabs.kcattabs row): list [{k,label,n,tip}] → `.pct` tabs with a count
   `<i>`; used by k3CatTabs (act lists) and kitInvGrid (Tư trang bag). */
window.kitTabRowHTML=function(list,cur,attr){return list.map(x=>`<button class="pct${x.k===cur?" on":""}" ${attr}="${x.k}" role="tab" aria-selected="${x.k===cur}">${x.label}${x.n!=null?` <i${x.tip?` title="${x.tip}"`:""}>${x.n}</i>`:""}</button>`).join("")};
/* sticky only where the page is long (see the KIT RULE in the CSS below) */
function kitTabStick(){try{const P=$$("panel");if(!P)return;const long=P.scrollHeight>P.clientHeight*1.5;P.querySelectorAll(".kcattabs").forEach(r=>r.classList.toggle("kstick",long))}catch(e){}}
addEventListener("resize",()=>{clearTimeout(window.__ktsT);window.__ktsT=setTimeout(kitTabStick,80)});
/* tab-underline (C39): chip/tab rows that scroll sideways show NO scrollbar track or thumb (the grey bar / brown stub the owner saw); the overflow is hinted by a soft edge fade on the side that has more chips (.kfl / .kfr, set by kitTabFade) */
const KIT_CHIPROWS=".pctabs,.kcattabs,.ksub,.ksubs,.kchips,.chips,.relsel,.hud2,.j59strip";
function kitTabFade(){try{document.querySelectorAll(KIT_CHIPROWS).forEach(r=>{const o=r.scrollWidth>r.clientWidth+2&&getComputedStyle(r).overflowX!=="visible";r.classList.toggle("kfl",o&&r.scrollLeft>2);r.classList.toggle("kfr",o&&r.scrollLeft+r.clientWidth<r.scrollWidth-2)})}catch(e){}}
let kitTfQ=0;function kitTabFadeSoon(){if(kitTfQ)return;kitTfQ=requestAnimationFrame(()=>{kitTfQ=0;kitTabFade()})}
document.addEventListener("scroll",e=>{const r=e.target;if(r&&r.matches&&r.matches(KIT_CHIPROWS))kitTabFadeSoon()},true);addEventListener("resize",kitTabFadeSoon);
/* DOM changes (the page mutates ~500x/s while idle): throttled to one check per 150 ms, never per frame */
let kitTfM=0;try{/* kit keeper (perf): observe only the three hosts of chip rows; skip while the page is hidden or in Gọn mode (OPT.fxon false) */const mo=new MutationObserver(()=>{if(kitTfM||document.hidden||(typeof OPT!=="undefined"&&OPT&&OPT.fxon===false))return;kitTfM=setTimeout(()=>{kitTfM=0;kitTabFadeSoon()},150)});document.querySelectorAll("#panel,#modal,header.hud").forEach(h=>mo.observe(h,{childList:true,subtree:true}))}catch(e){}

function k3CatTabs(){try{const P=$$("panel");if(!P)return;P.querySelectorAll(".cards").forEach((G,gi)=>{
 const cards=[...G.querySelectorAll(":scope > button.ka")];if(cards.length<6)return;
 const cats=[];cards.forEach(b=>{const c=b.dataset.kart||"khac";if(!cats.includes(c))cats.push(c)});if(cats.length<2){const o=P.querySelector(`.kcattabs[data-g="${gi}"]`)||G.previousElementSibling;if(o&&o.classList.contains("kcattabs")&&!o.classList.contains("kinvtabs"))o.remove();return}
 const key="hclh-kcat-"+(typeof tab!=="undefined"?tab:"")+"-"+gi;let cur=null;try{cur=localStorage.getItem(key)}catch(e){}if(cur&&cur!=="all"&&!cats.includes(cur))cur="all";cur=cur||"all";
 const name=c=>(typeof KIT_CAT!=="undefined"&&KIT_CAT[c]?KIT_CAT[c][0]:c==="khac"?"Khác":c);
 const cnt=c=>{const L=c==="all"?cards:cards.filter(b=>(b.dataset.kart||"khac")===c);return [L.filter(b=>!b.disabled&&!b.classList.contains("kdis")).length,L.length]};
 let row=P.querySelector(`.kcattabs[data-g="${gi}"]`)||G.previousElementSibling;if(!row||!row.classList.contains("kcattabs")||row.classList.contains("kinvtabs")){row=document.createElement("div");row.className="pctabs kcattabs";row.setAttribute("role","tablist");G.before(row)}
 const h=kitTabRowHTML(["all"].concat(cats).map(c=>{const [n,t]=cnt(c);return{k:c,label:c==="all"?"Tất cả":name(c),n:`${n}/${t}`,tip:`làm được ${n} trên ${t} việc`}}),cur,"data-kcat");
 if(row.dataset.h!==h){row.innerHTML=h;row.dataset.h=h}row.dataset.key=key;row.dataset.g=gi;
 /* act-dedupe UI: in "Tất cả" the usable cards come first, the greyed ones after (CSS order on the grid; every other tab keeps the dealt order) */
 cards.forEach(b=>{b.hidden=!(cur==="all"||(b.dataset.kart||"khac")===cur);const g=b.disabled||b.classList.contains("kdis");const o=cur==="all"&&g?"1":"";if(b.style.order!==o)b.style.order=o})});(window.renderAfter||((k,g)=>g()))("kitTabStick",kitTabStick)/* oi-render: reads the panel height — at the end of a render */}catch(e){console.error("k3CatTabs",e)}}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest(".kcattabs [data-kcat]");if(!b)return;e.stopPropagation();const row=b.closest(".kcattabs");
 try{localStorage.setItem(row.dataset.key,b.dataset.kcat)}catch(x){}k3CatTabs()},true);
if(typeof renderPanel==="function"){const r0=renderPanel;renderPanel=function(){const r=r0.apply(this,arguments);try{setTimeout(k3CatTabs,0)}catch(e){}return r}}
try{const P0=$$("panel");if(P0)new MutationObserver(()=>{clearTimeout(window.__k3ct);window.__k3ct=setTimeout(k3CatTabs,30)}).observe(P0,{childList:true,subtree:true,attributes:true,attributeFilter:["data-kart","disabled","class"]})}catch(e){}
const cssC=document.createElement("style");cssC.id="k3-cattabs";cssC.textContent=`
/* KIT RULE (owner 11/15, markups 1115-inv-markup + 1115-tabrow-gap): the category tab row
   - sits CENTRED between what is above and below it: one spacing token --k-tabgap above and below (the neighbours' own margins are zeroed);
   - NEVER covers anything at rest (no upward cover shadow);
   - is sticky ONLY on long pages (panel content > 1.5× the panel height, class .kstick set by kitTabStick): there it has a solid ground and
     the list scrolls beneath it. On short pages (Tư trang, most tabs) it is a plain row that scrolls with the page, so it never overlaps. */
#panel{--k-tabgap:10px}
#panel .kcattabs{position:relative;z-index:6;background:var(--panel);margin:var(--k-tabgap) -8px!important;padding:4px 8px}
#panel .kcattabs.kstick{position:sticky;top:0;box-shadow:0 3px 6px -4px #5a3a2040}
#panel .ksub~* .kcattabs.kstick,#panel .ksub~.kcattabs.kstick{top:var(--ksubh,44px)}
#panel *:has(+ .kcattabs),#panel *:has(+ .kinv){margin-bottom:0!important}
#panel .kcattabs+*{margin-top:0!important}
#panel .kcattabs .pct{white-space:nowrap}
#panel .cards>button.ka[hidden]{display:none!important}
html body #panel .kcattabs{display:flex!important;flex-wrap:nowrap!important;overflow-x:auto!important}#panel .kcattabs .pct{flex:0 0 auto}
/* tab-underline (C39): no scrollbar on any chip row; edge fade instead */
.pctabs,.kcattabs,.ksub,.ksubs,.kchips,.chips,.relsel,.hud2,.j59strip,html body header.hud>.hud2,html body #panel .kcattabs,.pc.kpnar[data-k2] .kpstick .pctabs{scrollbar-width:none!important;-ms-overflow-style:none!important}
.pctabs::-webkit-scrollbar,.kcattabs::-webkit-scrollbar,.ksub::-webkit-scrollbar,.ksubs::-webkit-scrollbar,.kmc-tabs::-webkit-scrollbar,.kchips::-webkit-scrollbar,.chips::-webkit-scrollbar,.relsel::-webkit-scrollbar,.hud2::-webkit-scrollbar,.j59strip::-webkit-scrollbar{display:none!important;width:0!important;height:0!important;background:transparent!important}
.kfr:not(.kfl){-webkit-mask-image:linear-gradient(90deg,#000 calc(100% - 22px),transparent);mask-image:linear-gradient(90deg,#000 calc(100% - 22px),transparent)}
.kfl:not(.kfr){-webkit-mask-image:linear-gradient(90deg,transparent,#000 22px);mask-image:linear-gradient(90deg,transparent,#000 22px)}
.kfl.kfr{-webkit-mask-image:linear-gradient(90deg,transparent,#000 22px,#000 calc(100% - 22px),transparent);mask-image:linear-gradient(90deg,transparent,#000 22px,#000 calc(100% - 22px),transparent)}
`;document.head.appendChild(cssC);
})();

/* ---------- 8. KIT SELECTED STATE (KIT 31.13, owner 11/14 approved): ONE selected look for every picker — dung mạo faces (kitPicker .kpki),
   consort / servant / kid picker strips (.pface), origin wheel tiles (.krt), pressed kit toggles (.ksel). No box or background block, no check
   badge: the chosen frame glows gold along its own outline, is very slightly enlarged and in full colour; the others are dimmed.
   aria-checked / aria-pressed stay for accessibility. ---------- */
(function(){const st=document.createElement("style");st.id="k3-sel";st.textContent=`
:root{--k-glow:drop-shadow(0 0 5px rgba(255,214,110,1)) drop-shadow(0 0 2px rgba(190,140,30,.9))}
html body .kpki,html body .kpki:hover,html body .kpki.on{background:none!important;box-shadow:none!important;outline:none!important}
html body .kpki{transition:transform .15s ease,opacity .15s ease}
html body .kpki:not(.on){opacity:.7}html body .kpki:not(.on):hover{opacity:.9}
html body .kpki.on{transform:scale(1.07);z-index:2;opacity:1}
html body .kpki.on span.md{filter:var(--k-glow)}
html body .kpki:focus-visible{outline:2px dashed var(--gold)!important;outline-offset:1px}
html body .kpkck{display:none!important}
html body .pface.on{border-color:transparent!important;background:none!important;box-shadow:none!important}
html body .pface:not(.on){opacity:.75}html body .pface:not(.on):hover{opacity:.95}
html body .pface.on>span.md,html body .pface.on>.md{filter:var(--k-glow);transform:scale(1.06)}
html body .kroul .krt.on{background:var(--k-card,#fffaf0)!important;box-shadow:none!important;filter:var(--k-glow);transform:scale(1.06)}
html body .ksel:not(.kpki),html body [aria-pressed="true"].kselable{outline:none!important;box-shadow:0 0 0 2px var(--k-sel-ring,#a8740c),0 0 10px 3px rgba(255,214,110,.85)!important}
`;document.head.appendChild(st)})();

/* ---------- 9. NO LONE BUTTON ROWS in person cards (KIT 28.18): the card's ✕ (kit-x, #popx, card opened from the room) sits in the card's
   top-right corner beside the name row instead of taking a row of its own above the acts. ---------- */
(function(){const st=document.createElement("style");st.id="k3-pcx";st.textContent=`
html body .pc:has(>.pcr>.pcx){position:relative}
/* a card opened from the room (#popw) lies over the panel: above the panel's sticky rows (sub-tabs, category tabs) AND the pane bar
   (jpane .kpbar, z 40, KIT §45) — at 12 the bar's chips covered the card's top and its ✕ (owner 16/11 "Nút tắt bị che", review/press-fx-r1) */
html body #popw{z-index:41!important}
html body .pc>.pcr>.pcx{position:absolute!important;top:6px;right:6px;margin:0!important;z-index:8;translate:0 var(--kpcxy,0px)}
html body .pc:has(>.pcr>.pcx)>.pcl>.kpnm{padding-right:46px}
/* KIT 32.10: the ✕ owns the card's top-right corner — the first act card starts under it, never under the ✕.
   person-dialog-restore (owner 18/11 06:10Z): ONLY when the ✕ is the first child. kitPcFix (jk2b) prepends the sticky info block (.kpstick) BEFORE the ✕, so
   the old ".pcx+*" rule hit the act list under the sticky block and left a 42 px empty band between them (every person card, every result/tab state). */
html body .pc>.pcr>.pcx:first-child+*{margin-top:42px!important}
/* kit panels (report / story / info dialogs): the close row "Đã hiểu" is pinned at the dialog's bottom, the body scrolls under it */
html body .dlg.kpanel>.mr{position:sticky;bottom:0;z-index:9;background:linear-gradient(rgba(255,250,240,0),var(--k-card,#fffaf0) 10px);padding-top:8px}
`;document.head.appendChild(st)})();
/* the card's ✕ stays in the card's top-right corner while the card's own body scrolls (owner 16/11 "Nút tắt bị che": on a phone the room card
   .pc scrolls inside itself and the absolute ✕ scrolled away with the acts) — it is moved down by the card's scrollTop (--kpcxy) */
document.addEventListener("scroll",e=>{const pc=e.target;if(!pc||!pc.classList||!pc.classList.contains("pc"))return;const x=pc.querySelector(":scope>.pcr>.pcx");if(x)pc.style.setProperty("--kpcxy",pc.scrollTop+"px")},{capture:true,passive:true});

/* ---------- 10. NAME TAGS NEVER OVERLAP (KIT 31.12): name tags under figures stay one line; when two tags would touch, the later one
   steps one line down (or up when there is no room under it). Runs after every stage render and on resize. ---------- */
function k3Tags(){try{const st=document.getElementById("stage");if(!st)return;const SR=st.getBoundingClientRect();
 const G=[...st.querySelectorAll(".tok .tag")].filter(g=>{const t=g.closest(".tok");return t&&getComputedStyle(t).visibility!=="hidden"&&getComputedStyle(g).display!=="none"&&g.getBoundingClientRect().width>0})
  .map(g=>({g,m:getComputedStyle(g).position==="static"?g.closest(".tok"):g}));/* a static tag moves with its own holder (#j59metag) */
 G.forEach(o=>o.m.style.translate="");/* measure the TEXT itself (the tag box can be narrower than its one-line text) */
 const R=G.map(o=>{const rg=document.createRange();rg.selectNodeContents(o.g);return {g:o.m,r:rg.getBoundingClientRect()}}).sort((a,b)=>a.r.left-b.r.left);const placed=[];
 R.forEach(o=>{const h=o.r.height+2;let dy=0;const hit=d=>placed.some(p=>o.r.left<p.r.right+4&&o.r.right>p.r.left-4&&o.r.top+d<p.r.bottom+p.dy&&o.r.bottom+d>p.r.top+p.dy);
  for(const d of [0,h,-h,2*h,-2*h]){if(o.r.bottom+d>SR.bottom-2||o.r.top+d<SR.top+2)continue;if(!hit(d)){dy=d;break}}
  if(dy)o.g.style.translate=`0 ${dy}px`;placed.push({r:o.r,dy})})}catch(e){}}
(function(){let tt=0;const go=()=>{clearTimeout(tt);tt=setTimeout(k3Tags,80);setTimeout(k3Tags,700)};
 if(typeof renderStage==="function"){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);go();return r}}
 addEventListener("resize",go);setInterval(()=>{if(!document.hidden)k3Tags()},700)})();

/* ---------- 11. kitBullets (KIT 31.14, owner 11/14): a long result / report / spy / news paragraph is shown as a BULLET LIST, one fact per
   line. Split on the text's own sentence ends (". ", "! ", "? ") and on a "Label:" that starts a new fact after a colon; a sentence that is
   only "( … )" (filler such as "(Đã ghi vào mục Đã biết…)") becomes a small dim footnote. Gains / costs inside "( … +N )" / "( … -N )" get the
   kit colours (KIT 1.2: green = gain, red = cost). Applied to: result card sentence (#rtoast .ksen), the person-card result note (.pc .pcn),
   news / intel / result kit panels (.kfacts paragraphs) — every generator benefits without changing its text. ---------- */
function kitBulletsHTML(h){h=String(h||"").trim();if(!h)return h;const txt=h.replace(/<[^>]+>/g,"");if(txt.length<70)return null;
 /* split outside tags only */
 const parts=[];let cur="",depth=0,tag=false,qd=0;for(let i=0;i<h.length;i++){const c=h[i];cur+=c;if(c==="<")tag=true;else if(c===">"){tag=false;
  /* a lone gain/cost chip ("<span class=r>Lòng -5</span> Ngọc Lan …") is its own fact */
  if(/^<span class="(ef )?[rg]">[^<]*<\/span>$/.test(cur.trim())&&/^\s+\S/.test(h.slice(i+1))){const f=h.slice(i+1).trim().charAt(0);if(f===f.toUpperCase()&&f!==f.toLowerCase()){parts.push(cur);cur="";continue}}}if(tag)continue;
  if(c==="(")depth++;else if(c===")")depth=Math.max(0,depth-1);
  /* a quoted speech “…” is ONE fact (review/toilette: "“Mặt mộc mà đến thỉnh an ai gia sao? Thật chẳng ra thể thống.”" was cut in two):
     no split inside the quotes; after the closing ” when the speech ended a sentence */
  if(c==="“"&&h.indexOf("”",i)>0)qd++;else if(c==="”")qd=Math.max(0,qd-1);
  const endP=depth===0&&qd===0&&((/[.!…]/.test(c)||(c==="?"&&h[i-1]!=="?"&&h[i+1]!=="?"))||(c==="”"&&/[.!?…]/.test(h[i-1]||""))||(c===")"&&cur.trim().replace(/^(<[^>]+>)+/,"").startsWith("(")));
  if(endP&&/^\s+/.test(h.slice(i+1))){const rest=h.slice(i+1).replace(/^\s+/,"").replace(/^(<[^>]+>)+/,"");const f=rest.charAt(0);if(/[("“]/.test(f)||(f&&f===f.toUpperCase()&&f!==f.toLowerCase())){parts.push(cur);cur=""}}
  else if(depth===0&&qd===0&&c===":"&&cur.replace(/<[^>]+>/g,"").length>30&&/^\s+(<[^>]+>)*[A-ZĐÀÁẢÃẠÂẦẤẨẪẬĂẰẮẲẴẶÈÉẺẼẸÊỀẾỂỄỆÌÍỈĨỊÒÓỎÕỌÔỒỐỔỖỘƠỜỚỞỠỢÙÚỦŨỤƯỪỨỬỮỰỲÝỶỸỴ][^:.<()]{0,24}:\s/.test(h.slice(i+1))){parts.push(cur.slice(0,-1));cur=""}}
 if(cur.trim())parts.push(cur);const P=parts.map(s=>s.trim().replace(/^(<\/[^>]+>)+/,"").trim()).filter(s=>/[\p{L}\d]/u.test(s.replace(/<[^>]+>/g,"")));/* act audit 08:35Z: a bullet that is only "." (left after a chip) is dropped */
 if(P.length<2)return null;const foot=[],li=[];
 P.forEach(s=>{const t=s.replace(/<[^>]+>/g,"").trim();if(/^\(.*\)\.?$/.test(t)){foot.push(t.replace(/^\(|\)\.?$/g,""));return}
  s=s.replace(/\.\s*$/,"").replace(/\(([^()<>]*?)([+−-]\s?\d+)\)/g,(m,a,n)=>`(<span class="ef ${/^\+/.test(n)?"g":"r"}">${a}${n}</span>)`);li.push(s)});
 return `<ul class="kbl">${li.map(s=>`<li>${s}</li>`).join("")}</ul>`+(foot.length?`<small class="kblf">${foot.join(" ")}</small>`:"")}
function kitBullets(el){try{if(!el||el.dataset.kbl===el.innerHTML.length+"")return;if(el.querySelector(".kbl"))return;
 el.querySelectorAll("br").forEach(x=>x.replaceWith(" "));el.querySelectorAll("span.past").forEach(x=>x.replaceWith(...x.childNodes));const r=kitBulletsHTML(el.innerHTML);
 if(r){el.innerHTML=r;el.classList.add("kblw")}el.dataset.kbl=el.innerHTML.length+""}catch(e){}}
(function(){const SEL="#rtoast .ksen, .pc .pcn, .dlg.kpanel .kfacts .kfx, .dlg.kpanel .kfacts p";let t=0;
 const run=()=>{document.querySelectorAll(SEL).forEach(e=>{if(e.closest(".kpid"))return;kitBullets(e)})};
 try{new MutationObserver(()=>{if(!t)t=setTimeout(()=>{t=0;run()},20)}).observe(document.body,{childList:true,subtree:true})}catch(e){}
 const st=document.createElement("style");st.id="k3-bl";st.textContent=`
ul.kbl{margin:2px 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:3px;text-align:left}
ul.kbl>li{position:relative;padding-left:14px;line-height:1.35}
ul.kbl>li::before{content:"";position:absolute;left:3px;top:.55em;width:5px;height:5px;border-radius:50%;background:var(--gold,#8f5f0c)}
.pc .pcn.kpres{margin:4px 0 8px;padding:8px 10px;background:var(--k-card,#fffaf0);border:1px solid var(--line);border-left:3px solid var(--gold,#8f5f0c);border-radius:8px;font-size:.84rem}
small.kblf{display:block;margin-top:3px;font-size:.72rem;color:var(--dim,#7a6a58);font-style:italic}
`;document.head.appendChild(st)})();

/* ---------- 12. HER AGE in the top bar (owner 11/14, KIT 31.1): "N tuổi" as a small chip right after her rank chip, every device and road;
   shown only here (one fact, one place). ---------- */
(function(){if(typeof renderHUD!=="function")return;const r0=renderHUD;renderHUD=function(){const r=r0.apply(this,arguments);try{const m=document.getElementById("me-r");
 if(m&&S&&typeof S.age==="number"){let a=document.getElementById("me-a");if(!a){a=document.createElement("span");a.id="me-a";a.className="k3age"}let w=m.parentNode;if(!w.classList.contains("k3rr")){w=document.createElement("span");w.className="k3rr";m.before(w);w.appendChild(m)}if(m.nextSibling!==a)m.after(a);const t=`${Math.floor(S.age)} tuổi`;if(a.textContent!==t)a.textContent=t;/* hdr-kiep: same kit chip, life number in words, after the age chip */let k=document.getElementById("me-k");if(!k){k=document.createElement("span");k.id="me-k";k.className="k3age"}if(a.nextSibling!==k)a.after(k);const kt=window.geK&&typeof geK.lifeNo==="function"&&typeof kpLife==="function"?kpLife(geK.lifeNo()):"";if(kt){k.hidden=false;if(k.textContent!==kt)k.textContent=kt}else k.hidden=true}}catch(e){}return r}
 const st=document.createElement("style");st.id="k3-age";st.textContent=`
#me .k3rr{display:flex;align-items:center;flex-wrap:nowrap;gap:0;min-width:0}
#me-a.k3age,#me-k.k3age{display:inline-flex;flex:0 0 auto;align-items:center;vertical-align:middle;margin-left:5px;padding:0 7px;border:1px solid var(--line);border-radius:999px;
 font-size:.72rem;font-weight:600;line-height:1.5;color:var(--ink);background:var(--k3pl,#fffaf0);white-space:nowrap}
`;document.head.appendChild(st)})();

/* ---------- 13. DIALOG OPTIONS ONE PER ROW + DIALOG HEADER PICTURE (KIT 31.16, owner 11/14 succession card) ----------
   Every dialog / event / chapter / choice panel: option act-cards are FULL WIDTH, one per row, stacked (no 2-column grid with empty gaps).
   On wide screens (≥ 1000 px) two columns are kept only when the cards are of similar height (max/min ≤ 1.2); measured after each dialog opens.
   The identity card (.kpid) keeps its approved two pinned choices.
   Header picture: a Q / kitModal item may carry headArt:"img/…webp" or {src,label} → a wide 16:9 kitSceneArt band at the top of the dialog
   (height capped so the choices stay on screen). Succession and big story events use it. ---------- */
/* option-group layout (KIT 31.16 table): 'rows' = full-width cards one per row · 'grid' = equal cells, 2 columns (3 on ≥ 1000 px with 3+ options).
   Per screen: a Q / kitModal item may set optLayout:'rows'|'grid'; otherwise it is read from the options' CONTENT: an option is LONG when it
   shows Cần / Được / Mất / Kèm rows, an odds word, or a text over 2 lines; SHORT = title + cost line. All short → grid, all long → rows,
   mixed → long ones full width, short ones in the grid. The identity card keeps its approved pinned pair. */
function k3IsLong(b){if(b.querySelector(".kr-can,.kr-duoc,.kr-mat,.kr-thanh,.kr-bai,.kr-kem,.kr-why,.kodds:not(:empty),.oc"))return true;const lh=parseFloat(getComputedStyle(b).lineHeight)||20;
 const t=b.querySelector(".kan");return !!(t&&t.getBoundingClientRect().height>lh*2.3)}
function k3OptCols(){try{const W=innerWidth;const m=typeof Q!=="undefined"?Q[0]:null;const want=m&&(m.optLayout||(m.kit&&m.kit.optLayout));
 document.querySelectorAll("#modal .opts:has(> button.ka), #modal .kpscopts").forEach(g=>{const dl=g.closest(".dlg");if(dl&&dl.querySelector(".kpid"))return;
  const B=[...g.querySelectorAll(":scope > button.ka")];g.classList.remove("k3rows","k3grid","k3g3","k3tight");B.forEach(x=>{x.classList.remove("k3long");const a=x.querySelector(":scope>.kaart");if(a&&a.dataset.k3t){a.style.removeProperty("flex");a.style.removeProperty("width");a.style.removeProperty("height");delete a.dataset.k3t}});
  if(g.clientWidth>0&&g.clientWidth<540){g.classList.add("k3rows");if(g.clientWidth<340){g.classList.add("k3tight");B.forEach(x=>{const a=x.matches(".kart")&&x.querySelector(":scope>.kaart");if(a){a.style.setProperty("flex","0 0 62px","important");a.style.setProperty("width","62px","important");a.dataset.k3t="1"/* #49c: the height is the card height (kitOptTier), never a fixed 84 */}})}/* kit-opt-text KP14: a narrow option column gives its width to the TEXT, the card picture shrinks */return}/* two columns need >= 270 px per card (a 304 px right column made 149 px cards: one word per line) */
  if(want==="rows"){g.classList.add("k3rows");return}if(want==="grid"){g.classList.add("k3grid");if(W>=1000&&B.length>=3)g.classList.add("k3g3");return}
  g.classList.add("k3rows");const L=B.map(k3IsLong);if(L.every(Boolean))return;g.classList.remove("k3rows");g.classList.add("k3grid");if(W>=1000&&B.filter((x,i)=>!L[i]).length>=3)g.classList.add("k3g3");
  B.forEach((x,i)=>{if(L[i])x.classList.add("k3long")});
  /* mixed groups (review fold-layout): the short ones sit together first, the long ones under them, and an odd last short cell takes the whole row — no holes */
  const sh=B.filter((x,i)=>!L[i]);const cols=g.classList.contains("k3g3")?3:2;B.forEach(x=>x.classList.remove("k3odd"));if(sh.length%cols)sh[sh.length-1].classList.add("k3odd")})}catch(e){}}
(function(){if(typeof showModal!=="function")return;const s0=showModal;showModal=function(){const m=typeof Q!=="undefined"?Q[0]:null;const r=s0.apply(this,arguments);
 try{const mb=document.getElementById("mb");const ha=m&&(m.headArt||(m.kit&&m.kit.headArt));if(mb&&ha&&!mb.querySelector(":scope > .kdlgart")){const src=typeof ha==="string"?ha:ha.src,lab=typeof ha==="string"?"":(ha.label||"");
  const d=document.createElement("div");d.className="kdlgart";d.innerHTML=kitSceneArt(src,lab,{shape:"wide",cap:!!lab,mark:typeof ha==="string"?"":ha.mark||"",markAlt:typeof ha==="string"?"":ha.markAlt||""});mb.prepend(d)}}catch(e){}
 requestAnimationFrame(k3OptCols);setTimeout(k3OptCols,300);return r}
 addEventListener("resize",()=>setTimeout(k3OptCols,60));
 const st=document.createElement("style");st.id="k3-opts";st.textContent=`
html body #modal .opts.k3rows:has(> button.ka),html body #modal .kpscopts.k3rows{display:grid!important;grid-template-columns:minmax(0,1fr)!important;grid-auto-rows:auto!important}
html body #modal .opts.k3rows>button.ka,html body #modal .kpscopts.k3rows>button.ka{min-height:0!important}
html body #modal .opts.opts.opts.opts.k3tight>button.ka.kart>.kaart.kaart,html body #modal .kpscopts.kpscopts.kpscopts.k3tight>button.ka.kart>.kaart.kaart{flex:0 0 62px!important;width:62px!important}html body #modal .opts.k3tight>button.ka.kart,html body #modal .kpscopts.k3tight>button.ka.kart{gap:7px!important}
html body #modal .opts.k3grid:has(> button.ka),html body #modal .kpscopts.k3grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;grid-auto-rows:auto!important;align-items:stretch!important}
html body #modal .opts.k3grid.k3g3:has(> button.ka),html body #modal .kpscopts.k3grid.k3g3{grid-template-columns:repeat(3,minmax(0,1fr))!important}
html body #modal .k3grid>button.ka.k3long{grid-column:1/-1;order:1}html body #modal .k3grid>button.ka.k3odd{grid-column:1/-1}
#mb>.kdlgart{margin:0 0 8px}#mb>.kdlgart>.ksart{aspect-ratio:auto;height:clamp(90px,calc(22*var(--kvh,1dvh)),220px)}#mb>.kdlgart>.ksart>img{object-position:center 45%}
`;document.head.appendChild(st)})();

/* ---------- 14. ONE PERSON CARD + CATEGORY PICTURE FRAMES + ALIGNED TOP BAR (owner 11/14, kit owner #2) ----------
   (a) Person card: the iPad two-column card on every screen ≥ 600 px (kitPcWide, jk2b). Left column, top-aligned: name → rank → the rank frame
       at the FULL column width (its empty canvas headroom above the ornament is trimmed per frame picture, measured once) → chips (wrap inside
       the column, never clipped) → one short dim helper line ("Mới biết tên ⓘ", full text in the tooltip) → Biết tên / Nơi ở chips.
   (b) kitSceneArt category frame (act cards; events by type): the category colour as a rich double border with four corner ornaments whose
       shape differs per category (KIT_CATFR), label plaque at the bottom; no tassel.
   (c) Top bar on iPad (≥ 1000 px): the four Tư chất cells use the SAME cell as Bạc / Sức / Sủng / Danh (icon + small label on top, number
       below), one row, equal spacing, shared baselines. ---------- */
(function(){
 /* (a) trim the frame's empty headroom: first opaque row of the frame picture, cached per src */
 const TOP={};function topOf(src,cb){if(TOP[src]!=null)return cb(TOP[src]);const im=new Image();im.crossOrigin="anonymous";/* CDN pictures: CORS or the canvas read fails (review/stage-side) */im.onload=()=>{try{const w=64,h=Math.round(64*im.naturalHeight/im.naturalWidth);const c=document.createElement("canvas");c.width=w;c.height=h;
   const x=c.getContext("2d",{willReadFrequently:true});x.drawImage(im,0,0,w,h);const d=x.getImageData(0,0,w,h).data;let y=0;outer:for(;y<h;y++){for(let i=0;i<w;i++)if(d[(y*w+i)*4+3]>40)break outer}TOP[src]=y/h}catch(e){TOP[src]=0}cb(TOP[src])};im.onerror=()=>{TOP[src]=0;cb(0)};im.src=src}
 function fit(){document.querySelectorAll(".pc.kpwide[data-k2]>.pcl>.pcp.kit").forEach(pp=>{const fr=pp.querySelector("img.kfr");if(!fr)return;const src=fr.getAttribute("src");
   /* owner 11/15 05:45Z ("khung nhảy"): ONE portrait box for every person — the trimmed headroom is the same constant for every frame
      (KIT_PORT_TRIM = the tallest crest's top), never measured per frame, so switching people never moves or resizes the frame */
   /* the constant trim is pure CSS (jhc: .pc.kpwide .pcp.kit margin-top = 4px − KIT_PORT_TRIM × cell height), so it is there in the first frame */
   pp.style.removeProperty("margin-top")});
  document.querySelectorAll(".pc[data-k2] .kpfacts .pcinfo>*,.pc[data-k2]>.pcl>p").forEach(e=>{const t=e.textContent.trim();if(e.classList.contains("kphelp")||!/^(Mới biết tên|Chưa biết)/.test(t)&&!(t.length>60&&e.tagName==="P"))return;
   const lab=/^Mới biết tên/.test(t)?"Mới biết tên":/^Chưa biết/.test(t)?"Chưa biết là ai":"Ghi chú";e.classList.add("kphelp");e.title=t;e.innerHTML=`${lab} <i aria-hidden="true">ⓘ</i>`})}
 let tt=0;try{new MutationObserver(()=>{if(!tt)tt=setTimeout(()=>{tt=0;fit()},40)}).observe(document.body,{childList:true,subtree:true})}catch(e){}addEventListener("resize",()=>setTimeout(fit,80));
 const st=document.createElement("style");st.id="k3-card1";st.textContent=`
html body .pc.kpwide[data-k2]{align-items:start!important}
html body .pc.kpwide[data-k2]>.pcl{align-self:start!important;justify-content:flex-start!important;padding:0 3px 6px!important;overflow-x:hidden!important}
html body .pc.kpwide[data-k2]>.pcl>.pcp.kit{width:100%!important;float:none!important;margin-left:0!important;margin-right:0!important;margin-bottom:4px!important;position:relative;z-index:0}
html body .pc.kpwide[data-k2]>.pcl>.pcname,html body .pc.kpwide[data-k2]>.pcl>.pcrk{position:relative;z-index:1}
html body .pc.kpwide .kpgrid,html body .pc.kpwide .kpgr{min-width:0;max-width:100%;flex-wrap:wrap!important}
html body .pc.kpwide .kst-chip{max-width:100%;min-width:0;flex-wrap:wrap}
.pc .kphelp{display:block;font-size:.72rem!important;color:var(--dim,#8a7a68)!important;line-height:1.3;cursor:help}
.pc .kphelp i{font-style:normal}
`;document.head.appendChild(st);
 /* (b) category frames */
 const sh=document.createElement("style");sh.id="k3-catfr";sh.textContent=`
.ksart.ksart-cat{border:3px double var(--kcc)!important;box-shadow:inset 0 0 0 2px #fffaf0,inset 0 0 0 3px var(--kcc),0 1px 4px #3a201030!important;border-radius:6px;--kco:10px;--kcr:2px;--kcrot:45deg}
.ksart.ksart-cat::after{content:"";position:absolute;inset:-1px;pointer-events:none;z-index:3;
 background:
  linear-gradient(var(--kcc),var(--kcc)) top left/var(--kco) var(--kco) no-repeat,
  linear-gradient(var(--kcc),var(--kcc)) top right/var(--kco) var(--kco) no-repeat,
  linear-gradient(var(--kcc),var(--kcc)) bottom left/var(--kco) var(--kco) no-repeat,
  linear-gradient(var(--kcc),var(--kcc)) bottom right/var(--kco) var(--kco) no-repeat;
 -webkit-mask:var(--kcm,none);mask:var(--kcm,none)}
.ksart.ksart-cat::before{content:"";position:absolute;inset:5px;border:1px solid color-mix(in srgb,var(--kcc) 55%,#fff);border-radius:var(--kcr);pointer-events:none;z-index:3}
/* corner motif per category: square (Lễ nghi), round (Giao thiệp), diamond (Mưu kế), notched (Hại người), cloud-round (Nghỉ ngơi),
   wide bar (Học tập), heart-round (Tranh sủng), coin (Buôn bán), arrow (Đi lại), small square (Hầu hạ), cross (Trừng phạt), soft (Con cái) */
.ksart.kcat-le-nghi{--kco:12px}
.ksart.kcat-giao-thiep::after,.ksart.kcat-nghi-ngoi::after,.ksart.kcat-cham-con::after,.ksart.kcat-sung-ai::after,.ksart.kcat-buon-ban::after{
 background:radial-gradient(circle,var(--kcc) 0 5px,transparent 5.5px) top left/12px 12px no-repeat,radial-gradient(circle,var(--kcc) 0 5px,transparent 5.5px) top right/12px 12px no-repeat,
  radial-gradient(circle,var(--kcc) 0 5px,transparent 5.5px) bottom left/12px 12px no-repeat,radial-gradient(circle,var(--kcc) 0 5px,transparent 5.5px) bottom right/12px 12px no-repeat}
.ksart.kcat-sung-ai::before{border-style:dashed;border-radius:10px}
.ksart.kcat-buon-ban::before{border-style:double;border-width:3px}
.ksart.kcat-nghi-ngoi::before{border-radius:14px}
.ksart.kcat-cham-con::before{border-radius:8px;border-style:dotted;border-width:2px}
.ksart.kcat-muu-ke::after,.ksart.kcat-hai-nguoi::after,.ksart.kcat-trung-phat::after{
 background:conic-gradient(from 45deg,var(--kcc) 0 25%,transparent 0 50%,var(--kcc) 0 75%,transparent 0) top left/12px 12px no-repeat,
  conic-gradient(from 45deg,var(--kcc) 0 25%,transparent 0 50%,var(--kcc) 0 75%,transparent 0) top right/12px 12px no-repeat,
  conic-gradient(from 45deg,var(--kcc) 0 25%,transparent 0 50%,var(--kcc) 0 75%,transparent 0) bottom left/12px 12px no-repeat,
  conic-gradient(from 45deg,var(--kcc) 0 25%,transparent 0 50%,var(--kcc) 0 75%,transparent 0) bottom right/12px 12px no-repeat}
.ksart.kcat-hai-nguoi::before{border-style:solid;border-width:2px;border-radius:0}
.ksart.kcat-trung-phat::before{border-style:dashed;border-radius:0}
.ksart.kcat-hoc-tap{--kco:16px}.ksart.kcat-hoc-tap::before{border-style:double;border-width:3px;border-radius:0}
.ksart.kcat-di-lai::before{border-style:dashed}
.ksart.kcat-hau-ha{--kco:7px}
.ksart.kcat-trieu-chinh{--kco:14px}.ksart.kcat-trieu-chinh::before{border-width:2px}
`;document.head.appendChild(sh);
 /* (c) aligned top bar: moved to the ONE stat cell kitStatCell / kitStatRow (jk4, KIT 32) */
})();

/* KIT 31.18: the act lists read their PANEL's width (k3pn = panel under 440 px), not the screen */
(function(){function pw(){const p=document.getElementById("panel");if(p&&p.clientWidth)p.classList.toggle("k3pn",p.clientWidth<440)}
 try{const p=document.getElementById("panel");if(p&&typeof ResizeObserver==="function")new ResizeObserver(pw).observe(p)}catch(e){}addEventListener("resize",pw);setTimeout(pw,0)})();

/* KIT 31.19 ACT ORDER (owner 11/15 04:55Z "Nên để hành động nào làm được ở trên cùng"): in EVERY act list (Hành sự + its category tabs,
   person-card act groups, Cung nhân, map place acts — any container whose element children are all act cards button.ka) the acts read
   1) doable now · 2) blocked ONLY by time (wrong buổi / not enough khắc left) · 3) blocked by anything else (greyed as before);
   inside a group the source order stays. The order is decided once per list per buổi and then kept, so a re-render after an act
   (the act turns "đã làm") never makes the list jump while she reads. */
const KAS_ORD=new Map(),KAS_TRY=new WeakMap();lifeStore("KAS_ORD card-order memo (keys = card text of that life)",()=>KAS_ORD.clear());const kasT=s=>String(s||"").replace(/\s+/g," ").trim();
function kitActGroup(b){if(!b.disabled&&!b.classList.contains("kdis"))return 0;
 const x=[...b.querySelectorAll(".kr-why .kchip, .kr-why .kwhy")].map(e=>kasT(e.textContent)).filter(t=>/^✗/.test(t));
 if(x.length&&x.every(t=>/buổi|khắc/i.test(t)&&!/chưa làm|đã làm/i.test(t)))return 1;return 2}
/* (tabs-kit r7) was named kitActKey: in the one concatenated script it shadowed j79 kitActKey(name) (ACTS.json lookup), so every
   name lookup threw and acts lost their own pictures (j79 kitActArt wrapper, j87, kit-fig2 kitActCompactOn). */
function kitActSortKey(b){const h=b.querySelector("h4, .kan");return (b.dataset.i||b.dataset.a||"")+"|"+kasT((h||b).textContent).slice(0,60)}
function kitActSort(root){try{if(!S)return;const when=[S.year,S.month,S.tuan,S.buoi||0].join(".");
 (root||document).querySelectorAll(".cards, .rbtn").forEach(G=>{const kids=[...G.children];if(kids.length<2||!kids.every(e=>e.matches("button.ka")))return;
  /* wait until every greyed card has its Cần row (j63 fills it a frame later): classifying before would freeze a wrong order */
  if(kids.some(b=>(b.disabled||b.classList.contains("kdis"))&&!b.querySelector(".kr-why"))){const n=(KAS_TRY.get(G)||0)+1;KAS_TRY.set(G,n);if(n<4)return}
  const seen={};const keys=kids.map(b=>{const k=kitActSortKey(b);seen[k]=(seen[k]||0)+1;return k+"#"+seen[k]});
  const id=when+"|"+keys.slice().sort().join("¦");let ord=KAS_ORD.get(id);
  if(!ord){const g=kids.map(kitActGroup);ord=kids.map((b,i)=>i).sort((a,c)=>g[a]-g[c]||a-c).map(i=>keys[i]);KAS_ORD.set(id,ord);if(KAS_ORD.size>200)KAS_ORD.delete(KAS_ORD.keys().next().value)}
  const by=new Map(keys.map((k,i)=>[k,kids[i]]));const want=ord.map(k=>by.get(k)).filter(Boolean);
  if(want.some((b,i)=>G.children[i]!==b))want.forEach(b=>G.appendChild(b))})}catch(e){console.error("kitActSort",e)}}
window.kitActSort=kitActSort;
(function(){let q=0;const run=()=>{q=0;kitActSort(document)};
 try{new MutationObserver(()=>{if(!q)q=requestAnimationFrame(run)}).observe(document.body,{childList:true,subtree:true})}catch(e){}})();
