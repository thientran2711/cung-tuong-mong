
/* jtut: HƯỚNG DẪN TÂN THỦ (owner 11/15 03:55Z "hướng dẫn tân thủ cho người chơi làm quen tính năng của game") — KIT.md §72 (72.1–72.3; was §36 on the old branch, §36 is Hậu cung on main).
   One kit, two pieces, both drawn as the kit panel (.dlg.kpanel, kpHeader, .kbtn) with the guide's portrait in the kit frame (pcPort, role mama):
   - kitCoach(spec): spotlight (the step's target stays bright inside a gold ring, the rest is dimmed) + a small coach card placed beside the
     target, never over it when the step asks for a tap. Re-measured on every resize / rotation / scroll and while the target moves.
   - kitTip(spec): a small lời dặn card above the tab bar, 1–3 sentences + "Đã hiểu"; never blocks (only the card takes taps), once each.
   The guide = staffGuide() of review/elder-staff (a real named palace elder: name, title, the same face); fallback Quế ma ma (a ma ma portrait already drawn, img/FIGURES-servants.json role mama; never a new drawing, never a face used by
   someone in this kiếp). She says "nô tỳ" and calls the player "tiểu chủ" (Tần and up: "nương nương"; cung nữ road: "ta" / "ngươi").
   Lượt dẫn đầu kiếp (KTUT_STEPS, ≤12 steps): first kiếp on this device, or "Xem lại lời dặn" in ☰. It starts after the Nhập cung card and the
   "Mệnh truyện kiếp này" goal card (jgoal), and one step shows the goal icon of the stage rail (§77). Old players (an older sổ or a Sổ luân hồi
   entry, no record on this device) are asked once; a sổ past its 2nd week never starts the tour nor asks, and gives no tips (S.tutOld)
   unless she turns "Lời dặn tân thủ" on again in Thiết lập or picks "Xem lại lời dặn". State: device `hclh-tut` {tour, asked, seen{}} + OPT.tut (Thiết lập "Lời dặn tân thủ")
   + S.tutTour in the sổ (a sổ copied to another device does not start the tour again).
   Off for bots (window.__bot, quiet) and for automated browsers (navigator.webdriver) unless localStorage hclh-tut-test = "1" or ?tut=1,
   so measure bots and screenshot scripts are never blocked. Co-op: everything here is local to each machine; nothing waits for it. */
(function(){try{
const TK="hclh-tut";
/* the guide is a REAL palace NPC (owner 16/11): review/elder-staff exports staffGuide() → {id,name,title,office,face,kr}; name, title and
   the face the game shows for her elsewhere come from it. The fallback below is used only while that module is not in the build. */
function GD(){try{if(typeof staffGuide==="function"){const g=staffGuide();if(g&&g.name)return g}}catch(e){}return null}
function MMN(){const g=GD();return g?g.name:"Quế ma ma"}
function MMT(){const g=GD();return g?[g.name,g.title||g.office].filter(Boolean).join(", "):"Quế ma ma"}
function rd(){try{return JSON.parse(localStorage.getItem(TK)||"null")||{}}catch(e){return{}}}
function wr(o){try{localStorage.setItem(TK,JSON.stringify(o))}catch(e){}}
let REC=rd();REC.seen=REC.seen||{};
function saveRec(){wr(REC)}
const T={rec:REC,on:false,step:-1,ask:false,tip:null,tipQ:[],replay:false,fresh:false,pend:{}};
window.KTUT=T;
function optOn(){try{return typeof OPT==="undefined"||OPT.tut!==false}catch(e){return true}}
function testFlag(){try{return localStorage.getItem("hclh-tut-test")==="1"||/[?&]tut=1\b/.test(location.search)}catch(e){return false}}
function botOff(){try{return !!window.__bot||(typeof quiet!=="undefined"&&quiet)}catch(e){return false}}
function autoOk(){return !botOff()&&optOn()&&(!navigator.webdriver||testFlag())}
function rm(){try{return typeof kmReduced==="function"?kmReduced():matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}}
function vis(e){return !!e&&!e.hidden&&e.getClientRects().length>0&&getComputedStyle(e).visibility!=="hidden"&&getComputedStyle(e).display!=="none"}
function $q(s,r){return (r||document).querySelector(s)}
function srv(){try{return typeof isSrv==="function"&&isSrv()}catch(e){return false}}
function coop(){try{return !!(window.COOP&&COOP.state&&COOP.state.playing)}catch(e){return false}}
/* how the ma ma speaks to her (VANPHONG §2) */
function X(cap){/* one address core (jvoice kAddr, VANPHONG §2) */let w=srv()?"ngươi":kSay({srv:"f"},S,"{goi}");return cap?w.charAt(0).toUpperCase()+w.slice(1):w}
function ME(cap){const w=srv()?"ta":"nô tỳ";return cap?w.charAt(0).toUpperCase()+w.slice(1):w}
function say(s){return String(s).replace(/\{X\}/g,X(true)).replace(/\{x\}/g,X(false)).replace(/\{M\}/g,ME(true)).replace(/\{m\}/g,ME(false))}
/* the screen is busy: a dialog, the title / menu, a motion moment, the week book, a mini game, the loading screen, the co-op wait card */
function busy(){try{
 if(typeof S==="undefined"||!S||S.dead)return true;
 if(typeof Q!=="undefined"&&Q&&Q.length)return true;
 if(S.mg)return true;
 const t=$q("#title");if(t&&!t.hidden)return true;
 for(const id of ["modal","ov","dawn","kload","coopfz","kpodov","kupd"])if(vis(document.getElementById(id)))return true;
 for(const m of document.querySelectorAll(".modal,.kmov,.kbk,.kroul"))if(vis(m))return true;
 /* any other kit panel on screen (a mini game frame such as Điểm trang, a shop, a picker) */
 for(const m of document.querySelectorAll(".dlg.kpanel"))if(!m.closest("#ktut,.ktip")&&vis(m))return true;
 if(document.visibilityState!=="visible")return true}catch(e){return true}return false}
T.busy=busy;

/* ---------- the guide's portrait: a ma ma identity nobody in this kiếp wears (one face per person, owner rule) ---------- */
function mmFace(){const g=GD();if(g&&g.face){try{const f=g.face;if(typeof f==="object"&&(f.src!==undefined||f.ini))return Object.assign({},f,{rw:f.rw||MMN(),__kr:g.kr||f.__kr});
  if(typeof f==="string")return{src:f,ini:MMN().split(" ")[0],col:(typeof kitServCol==="function"?kitServCol("maid",3):"#a0584a"),rw:MMN(),__kr:g.kr||{role:"mama",rank:3,origin:null,sex:"f",kid:false}}}catch(e){}}
 let src="img/por-mama-k03-a51.webp";
 try{const M=(typeof FIGIX!=="undefined"&&FIGIX&&FIGIX.mama)||null;
  if(M&&S){let k=S.tutFid&&M[S.tutFid]?S.tutFid:null;
   if(!k){const used=new Set(typeof figUsed==="function"?figUsed():[]);const ks=Object.keys(M).sort();k=ks.find(x=>!used.has(x))||ks[0];
    if(k&&!coop()){S.tutFid=k;try{if(!used.has(k))figUsed().push(k)}catch(e){}}}
   const L=M[k]||[];const f=L.find(x=>x.ageBand==="a51")||L.find(x=>x.ageBand==="a36")||L[0];if(f&&f.por)src=figPath(f.por)}}catch(e){}
 return{src,ini:"Quế",col:(typeof kitServCol==="function"?kitServCol("maid",3):"#a0584a"),rw:MMN(),__kr:{role:"mama",rank:3,origin:null,sex:"f",kid:false}}}
function mmFig(){try{const f=mmFace();const s=String(f.src||"");return s.replace(/\/por-/,"/fig-")}catch(e){return""}}

/* ---------- kit CSS (one look; tokens of KIT.md §1 / §8) ---------- */
const st=document.createElement("style");st.id="kit-tut";st.textContent=`
#ktut{position:fixed;inset:0;z-index:9300;pointer-events:none}
#ktut[hidden]{display:none!important}
#ktut .ktut-dim{position:fixed;inset:0;background:rgba(30,18,10,.58)}
#ktut .ktut-hole{position:fixed;left:0;top:0;width:0;height:0;border-radius:10px;
 box-shadow:0 0 0 3px #f0d070,0 0 16px 5px #ffd66e99,0 0 0 4000px rgba(30,18,10,.58)}
#ktut.ktut-mv .ktut-hole{transition:left .28s ease,top .28s ease,width .28s ease,height .28s ease}
#ktut .ktut-mark{position:fixed;border-radius:10px;box-shadow:0 0 0 3px #f0d070,0 0 14px 4px #ffd66e99;pointer-events:none}
#ktut .ktut-blk{position:fixed;pointer-events:auto;background:transparent}
#ktut .ktut-card{position:fixed;pointer-events:auto;margin:0;box-shadow:0 0 0 3px #f6ead6,0 0 0 4px #c9a46a,0 10px 30px #0008}
#ktut.ktut-mv .ktut-card{animation:ktutIn .26s ease both}
@keyframes ktutIn{from{opacity:0;transform:translateY(8px)}}
.ktut-say{min-width:0}
.ktut-say p{margin:0 0 6px}
.ktut-say .kb{margin:4px 0 2px}
.ktut-say .ktut-do{color:var(--gold);font-weight:600}
.kpseal.kp-guide{background:#a0584a;border-color:#6e3a30}
.ktip[hidden]{display:none!important}
.ktip{position:fixed;left:50%;translate:-50% 0;z-index:9200;width:var(--kpw);pointer-events:none}
.ktip .dlg.kpanel{pointer-events:auto;box-shadow:0 0 0 3px #f6ead6,0 0 0 4px #c9a46a,0 6px 24px #0006}
.ktip.ktut-mv{animation:ktutIn .26s ease both}
`;document.head.appendChild(st);
try{if(typeof KP_SEAL==="object")KP_SEAL.guide="LỜI DẶN"}catch(e){}

/* ---------- kitCoach: spotlight + coach card ---------- */
let ROOT=null,CUR=null,RAF=0,TICK=0;
function root(){if(!ROOT){ROOT=document.createElement("div");ROOT.id="ktut";ROOT.hidden=true;ROOT.setAttribute("role","dialog");ROOT.setAttribute("aria-modal","false");document.body.appendChild(ROOT)}return ROOT}
function rectOf(t){try{const el=typeof t==="function"?t():typeof t==="string"?$q(t):t;if(!el||!vis(el))return null;const r=el.getBoundingClientRect();if(r.width<2||r.height<2)return null;return r}catch(e){return null}}
function clip(r,pad){const vw=innerWidth,vh=innerHeight;const L=Math.max(4,r.left-pad),Tp=Math.max(4,r.top-pad),R=Math.min(vw-4,r.right+pad),B=Math.min(vh-4,r.bottom+pad);
 return{left:L,top:Tp,right:R,bottom:B,width:Math.max(0,R-L),height:Math.max(0,B-Tp)}}
function kitCoach(spec){const R0=root();CUR=spec;R0.hidden=false;R0.classList.toggle("ktut-mv",!rm());
 const card=kitPersonDlg({kind:"guide",title:spec.title||MMN(),sub:spec.sub||"",p:mmFace(),fig:mmFig(),name:`<b class="kname" style="--rc:#a0584a">${MMN()}</b>`,pic:spec.pic?{src:spec.pic,lab:""}:null,html:`<div class="ktut-say">${spec.html||""}</div>`,btns:spec.btns,cls:"ktut-card"});
 R0.innerHTML=`${spec.target?"":`<div class="ktut-dim"></div>`}<div class="ktut-hole"${spec.target?"":" hidden"}></div><div class="ktut-blks"></div><div class="ktut-marks"></div>${card}`;
 try{kitPersonDlgFit(R0)}catch(e){}
 R0.querySelectorAll("[data-ktut]").forEach(b=>b.addEventListener("click",e=>{e.stopPropagation();try{if(typeof sfx==="function")sfx("sfx-tap")}catch(x){}const k=b.dataset.ktut;if(spec.on)spec.on(k)}));
 place(true);
 const f=R0.querySelector(".ktut-card .kbtn:not(.alt)")||R0.querySelector(".ktut-card .kbtn");if(f)try{f.focus({preventScroll:true})}catch(e){}
 if(!TICK)TICK=setInterval(()=>{if(CUR&&ROOT&&!ROOT.hidden)place(false)},140)}
function coachOff(){CUR=null;if(ROOT){ROOT.hidden=true;ROOT.innerHTML=""}clearInterval(TICK);TICK=0}
function blk(L,Tp,W,H){return `<div class="ktut-blk" style="left:${L}px;top:${Tp}px;width:${Math.max(0,W)}px;height:${Math.max(0,H)}px"></div>`}
let LAST="";
function place(force){const R0=ROOT;if(!R0||!CUR||R0.hidden)return;const s=CUR;const vw=innerWidth,vh=innerHeight;
 const card=R0.querySelector(".ktut-card"),hole=R0.querySelector(".ktut-hole");if(!card)return;
 const r0=s.target?rectOf(s.target):null;let r=r0?clip(r0,s.pad==null?6:s.pad):null;
 /* a target that runs under the bottom bar (a tall act card on a phone in landscape) is lit only above the bar */
 try{const te=typeof s.target==="function"?s.target():typeof s.target==="string"?$q(s.target):s.target;const tb=$q("#tabs");
  /* only the part that shows inside its scroll box (a card scrolled half under the pane's sticky tabs / the top bar) */
  if(r&&te&&te.parentElement){let p=te.parentElement;while(p&&p!==document.body){const cs=getComputedStyle(p);if(/(auto|scroll|hidden)/.test(cs.overflowY)){const q=p.getBoundingClientRect();let top=q.top;
     p.querySelectorAll(":scope > .ksub, :scope > .kcattabs, :scope .kpanebar").forEach(x=>{const xr=x.getBoundingClientRect();if(getComputedStyle(x).position==="sticky"&&xr.bottom>top&&xr.bottom<q.bottom)top=xr.bottom});
     const T2=Math.max(r.top,top-2),B2=Math.min(r.bottom,q.bottom+2);if(B2-T2>30)r=Object.assign({},r,{top:T2,bottom:B2,height:B2-T2})}p=p.parentElement}}
  if(r&&te&&tb&&vis(tb)&&!te.closest("#tabs")&&te.id!=="next"){const tt=tb.getBoundingClientRect().top-2;if(r.bottom>tt&&r.top<tt-40){r=Object.assign({},r,{bottom:tt,height:tt-r.top})}}}catch(e){}
 const marks=(s.marks||[]).map(m=>rectOf(m)).filter(Boolean).map(m=>clip(m,3));
 const key=[vw,vh,r?[r.left,r.top,r.width,r.height].map(Math.round).join(","):"-",marks.map(m=>[m.left,m.top,m.width].map(Math.round).join(",")).join(";"),card.offsetHeight].join("|");
 if(!force&&key===LAST)return;LAST=key;
 /* the card keeps the ONE kit frame size (OD:L963); when it fits on no side of the target, the lit hole shrinks to the part of the target that still leaves the card a free side (the target stays tappable there: a card/row is tapped anywhere on it). Only a tap step does this: a look-at step keeps its whole hole (the card then lies where it covers least) */
 if(r&&s.interact){const cw0=card.offsetWidth,ch0=card.offsetHeight,g0=12,M0=8;
  const fits=r.bottom+g0+ch0<=vh-M0||r.top-g0-ch0>=M0||r.right+g0+cw0<=vw-M0||r.left-g0-cw0>=M0;
  if(!fits){const O=[];const mk=(l,t,rr,b)=>{if(rr-l>=56&&b-t>=56)O.push({left:l,top:t,right:rr,bottom:b,width:rr-l,height:b-t})};
   mk(r.left,r.top,r.right,Math.min(r.bottom,vh-M0-g0-ch0));/* card below */
   mk(r.left,Math.max(r.top,M0+ch0+g0),r.right,r.bottom);/* card above */
   mk(Math.max(r.left,M0+cw0+g0),r.top,r.right,r.bottom);/* card at the left */
   mk(r.left,r.top,Math.min(r.right,vw-M0-g0-cw0),r.bottom);/* card at the right */
   O.sort((a,b)=>b.width*b.height-a.width*a.height);if(O[0])r=O[0]}}
 const D=R0.querySelector(".ktut-dim");
 if(r){if(D)D.remove();hole.hidden=false;Object.assign(hole.style,{left:r.left+"px",top:r.top+"px",width:r.width+"px",height:r.height+"px"})}
 else{hole.hidden=true;if(!R0.querySelector(".ktut-dim"))R0.insertAdjacentHTML("afterbegin",`<div class="ktut-dim"></div>`)}
 /* taps: a step that asks for a tap lets it through the hole only; any other step takes every tap outside the card */
 const B=R0.querySelector(".ktut-blks");
 B.innerHTML=s.interact&&r?blk(0,0,vw,r.top)+blk(0,r.bottom,vw,vh-r.bottom)+blk(0,r.top,r.left,r.height)+blk(r.right,r.top,vw-r.right,r.height):blk(0,0,vw,vh);
 R0.querySelector(".ktut-marks").innerHTML=marks.map(m=>`<div class="ktut-mark" style="left:${m.left}px;top:${m.top}px;width:${m.width}px;height:${m.height}px"></div>`).join("");
 /* card: ONE frame size per viewport (owner OD:L963), placed by POSITION only: below, above, right or left of the target where it fits whole (the step's preferred side first). When it fits on no side the card goes to the screen corner/edge that covers the LEAST of the hole (the frame is never shrunk); a step with no hole is centred */
 card.style.removeProperty("--kph");card.style.removeProperty("--kpw");
 const cw=card.offsetWidth,ch=card.offsetHeight,g=12,M=8;let L,Tp;
 if(!r){L=(vw-cw)/2;Tp=Math.max(M,(vh-ch)/2)}
 else{const cx=r.left+r.width/2,cy=r.top+r.height/2;
  const hx=Math.min(Math.max(M,cx-cw/2),vw-cw-M),hy=Math.min(Math.max(M,cy-ch/2),vh-ch-M);
  const C=[];if(r.bottom+g+ch<=vh-M)C.push(["below",hx,r.bottom+g]);if(r.top-g-ch>=M)C.push(["above",hx,r.top-g-ch]);
  if(r.right+g+cw<=vw-M)C.push(["right",r.right+g,hy]);if(r.left-g-cw>=M)C.push(["left",r.left-g-cw,hy]);
  const want=s.side==="above"?"above":"below";
  const c=C.find(x=>x[0]===want)||C.find(x=>x[0]==="below"||x[0]==="above")||C[0];
  if(c){L=c[1];Tp=c[2]}
  else{/* no side fits the whole card: the position that covers the least of the hole */
   const ov=(l,t)=>Math.max(0,Math.min(l+cw,r.right)-Math.max(l,r.left))*Math.max(0,Math.min(t+ch,r.bottom)-Math.max(t,r.top));
   const P=[[M,M],[vw-cw-M,M],[M,vh-ch-M],[vw-cw-M,vh-ch-M],[hx,M],[hx,vh-ch-M],[M,hy],[vw-cw-M,hy]].map(x=>[x[0],x[1],ov(x[0],x[1])]).sort((a,b)=>a[2]-b[2]);L=P[0][0];Tp=P[0][1]}}
 card.style.left=Math.round(Math.max(M,Math.min(L,vw-cw-M)))+"px";card.style.top=Math.round(Math.max(M,Math.min(Tp,vh-ch-M)))+"px"}
addEventListener("resize",()=>{LAST="";if(CUR){place(true);clearTimeout(T.rz);T.rz=setTimeout(()=>{try{if(T.on&&STEPS[T.step]&&STEPS[T.step].prep)STEPS[T.step].prep(true)}catch(e){}LAST="";place(true)},350)}if(T.tip)tipPlace()});
addEventListener("orientationchange",()=>{LAST="";setTimeout(()=>{if(CUR)place(true);if(T.tip)tipPlace()},250)});
document.addEventListener("scroll",()=>{if(CUR)place(false)},true);
window.kitCoach=kitCoach;window.kitCoachOff=coachOff;

/* ---------- kitTip: small lời dặn card, never blocks, once each ---------- */
let TIPEL=null;
function tipPlace(){if(!TIPEL)return;let top=innerHeight;document.querySelectorAll("#tabs,#next").forEach(e=>{if(!vis(e))return;const r=e.getBoundingClientRect();if(r.height&&r.top>innerHeight*.5)top=Math.min(top,r.top)});
 TIPEL.style.bottom=Math.max(10,Math.round(innerHeight-top+10))+"px"}
function kitTip(spec){tipOff();const el=document.createElement("div");el.className="ktip"+(rm()?"":" ktut-mv");el.id="ktip";el.setAttribute("role","status");
 el.innerHTML=kitPersonDlg({kind:"guide",title:spec.title,sub:MMN()+" dặn",p:mmFace(),fig:mmFig(),name:`<b class="kname" style="--rc:#a0584a">${MMN()}</b>`,pic:spec.pic?{src:spec.pic,lab:""}:(ia("Hành sự")?{src:ia("Hành sự"),lab:""}:null),html:`<div class="ktut-say">${spec.html}</div>`,btns:[{k:"tip",t:"Đã hiểu"}]});
 document.body.appendChild(el);TIPEL=el;T.tip=spec.id;tipPlace();try{kitPersonDlgFit(el)}catch(e){}
 el.querySelector("[data-ktut=tip]").addEventListener("click",e=>{e.stopPropagation();try{if(typeof sfx==="function")sfx("sfx-tap")}catch(x){}tipOff();T.tipGap=Date.now()+1500})}
function tipOff(){if(TIPEL){TIPEL.remove();TIPEL=null}T.tip=null}
window.kitTip=kitTip;window.kitTipOff=tipOff;

/* ---------- helpers for the steps ---------- */
function tabBtn(k){return $q(`#tabs [data-tab="${k}"]`)}
function goTab(k){const b=tabBtn(k);if(!b)return false;if(typeof tab!=="undefined"&&tab===k&&!$q(".game.k3home"))return true;b.click();return true}
function goRoom(){try{if($q(".game.k3ph")&&!$q(".game.k3home")&&typeof k3Home==="function")k3Home()}catch(e){}}
function shown(k){const b=tabBtn(k);return !!b&&vis(b)}
/* the group button that holds a hidden member tab (Sổ ghi is inside Mệnh truyện) */
function groupBtn(k){const b=tabBtn(k);if(b&&vis(b))return b;try{for(const g in KG)if(KG[g].keys.includes(k)){const gb=KG[g].keys.map(tabBtn).find(x=>x&&vis(x));if(gb)return gb}}catch(e){}return null}
function goalEl(){const L=[...document.querySelectorAll("#krail [data-rail=goal]")].filter(e=>{if(!vis(e))return false;const r=e.getBoundingClientRect();return r.width>=24&&r.height>=24&&r.bottom>0&&r.top<innerHeight});return L[0]||null}
function panelBox(){const p=$q("#panel");return p&&vis(p)?p:null}
/* the act card for the "đọc thẻ / làm thử" steps: a quiet act she can do now (no harm, no scheme) */
let PICK=null;
function pickAct(){if(PICK&&document.contains(PICK)&&vis(PICK)&&!PICK.disabled&&!PICK.classList.contains("kdis"))return PICK;
 const L=[...document.querySelectorAll("#panel .cards button.ka.kcard, #panel .cards button.ka")].filter(b=>vis(b)&&!b.disabled&&!b.classList.contains("kdis"));
 const cat=b=>{try{return kitActCat((b.querySelector(".kan")||b).textContent.trim())}catch(e){return""}};
 const good=["nghi-ngoi","le-nghi","hoc-tap","hau-ha","giao-thiep"];/* quiet first; never a card that opens a mini game (Điểm trang, lessons) */
 const plain=b=>!/Điểm trang|Tự học|Học |luyện/i.test((b.querySelector(".kan")||b).textContent||"");
 PICK=good.map(g=>L.find(b=>cat(b)===g&&plain(b)&&!/Liều|Khó/.test((b.querySelector(".kodds")||{}).textContent||""))).find(Boolean)||L.find(b=>good.includes(cat(b))&&!/Liều|Khó/.test((b.querySelector(".kodds")||{}).textContent||""))||L.find(b=>!["muu-ke","hai-nguoi"].includes(cat(b)))||null;return PICK}
function allCat(){const t=$q("#panel .kcattabs .pct, #panel .kcattabs button");if(t&&!t.classList.contains("on")&&/^Tất cả/.test(t.textContent.trim()))t.click()}
function scrollTo(el){try{let p=el.parentElement;while(p&&p!==document.body){const cs=getComputedStyle(p);if(/(auto|scroll)/.test(cs.overflowY)&&p.scrollHeight>p.clientHeight+4)break;p=p.parentElement}
 if(!p||p===document.body){el.scrollIntoView({block:"start"});return}
 const pr=p.getBoundingClientRect(),er=el.getBoundingClientRect();let sticky=0;p.querySelectorAll(".ksub,.kcattabs").forEach(s=>{if(getComputedStyle(s).position==="sticky")sticky=Math.max(sticky,s.getBoundingClientRect().height)});
 p.scrollTop+=er.top-pr.top-sticky-8}catch(e){}}
function mapSpot(){const L=[...document.querySelectorAll("#panel .mspot:not(.off):not(.sm)")].filter(vis);const vw=innerWidth,vh=innerHeight;
 return L.find(e=>{const r=e.getBoundingClientRect();return r.left>=8&&r.right<=vw-8&&r.top>=60&&r.bottom<=vh-80})||L[0]||$q("#panel .mapv")}
function resOn(){const t=$q("#rtoast");return t&&t.classList.contains("on")?t:null}
const R=(k,v,c)=>[k,v,c||"n"];

/* ---------- tab groups, read live (data-tab, KG, .ksub .ksubb[data-ksub]) ---------- */
const GROUP_ANCHORS=["rv","rel","staff"];
const SUBSAY={rv:"thẻ từng phi tần: chạm mặt để xem, giao thiệp hay ra tay",rel:"ai thương, ai ghen, ai oán {x}",fac:"các phe trong cung và chỗ đứng của {x}",
 staff:"kẻ hầu của {x}: Lòng là họ trung bao nhiêu, Ta tin cậy là {x} đặt lòng tin vào họ bao nhiêu; Lòng dưới 45 dễ bị mua chuộc",
 court:"Hoàng thượng, Thái hậu: hầu hạ, thỉnh an, xem lòng người trên",emp:"Hoàng thượng, Thái hậu: hầu hạ, thỉnh an, xem lòng người trên",th:"Thái hậu: thỉnh an, xem lòng người",men:"nam nhân trong cung: thái y, thị vệ, quan viên",
 story:"truyện riêng của thân phận {x}",log:"mọi việc đã qua",kid:"con của {x}",art:"các môn tài nghệ",inv:"rương đồ của {x}"};
function grpOf(k){try{for(const g in KG)if(KG[g].keys.includes(k))return g}catch(e){}return null}
function grpKeys(k){const g=grpOf(k);try{return g?KG[g].keys.filter(x=>tabBtn(x)):[k]}catch(e){return[k]}}
function grpFirst(k){const L=grpKeys(k);return L.includes(k)?k:L[0]}
function tabLabel(x){const sb=$q(`#panel .ksub .ksubb[data-ksub="${x}"]`);const b=tabBtn(x);return ((sb&&sb.textContent)||(b&&(b.dataset.l0||b.textContent))||x).trim().replace(/\s+\d+$/,"")}
function grpLabel(k){const g=grpOf(k);const gb=groupBtn(k);try{if(g&&KG[g].l)return KG[g].l}catch(e){}return gb?gb.textContent.trim():tabLabel(k)}
function grpWhen(k,i){if(!tabBtn(k)||!groupBtn(k))return false;const g=grpOf(k)||("t:"+k);
 for(let j=0;j<i;j++){const a=GROUP_ANCHORS[j];if(tabBtn(a)&&groupBtn(a)&&(grpOf(a)||("t:"+a))===g)return false}return true}
function grpHTML(k){const L=grpKeys(k);if(srv()&&k==="staff")return say(`<p>Đồng liêu là những cung nữ, thái giám làm cùng {x}. Kết thân thì được đỡ đần; gây thù thì bị hãm hại.</p>`);
 const rows=L.map(x=>[tabLabel(x),say(SUBSAY[x]||""),"n"]).filter(r=>r[1]);
 if(L.length<2)return say(`<p>${rows[0]?rows[0][0]+": "+rows[0][1]+".":""}</p>`);
 return say(`<p>Mục ${grpLabel(k)} có ${L.length} phần, chạm hàng trên cùng để đổi:</p>`)+kitRows(rows)}
/* ---------- GAME NÀY CHƠI GÌ: the intro pages of step 1 ---------- */
function ia(k){try{const a=kitInfoArt(k);return a&&a.src||""}catch(e){return""}}
function owide(){try{return typeof kitOriginWide==="function"?kitOriginWide(S.origin.k):kitOriginArt(S.origin.k)}catch(e){return""}}
const rows=L=>kitRows(L.map(x=>[x[0],say(x[1]),x[2]||""]));
const INTRO=[
 {t:"Game này là gì",p:()=>owide(),h:()=>say(`<p>{M} là ${MMT()}, phụng mệnh dạy lễ cho {x} những ngày đầu trong cung. Trước hết, {m} xin nói rõ {x} đang bước vào chuyện gì.</p>`)+
  rows([["Đây là","một kiếp người trong hậu cung: {x} là một cô gái vừa vào cung, mỗi buổi tự chọn việc mà làm để sống sót và đi lên"],
   ["Mỗi kiếp","một thân phận khác (con nhà quyền thế, nhà buôn, cung nữ…), một Hoàng thượng khác, một hậu cung khác"],
   ["Lựa chọn","không có đường định sẵn; việc nào cũng ghi rõ cái được và cái giá"]])},
 {t:"Mục tiêu",p:()=>ia("Sắc phong"),h:()=>rows([["Sống sót","trong cung có người thương, có kẻ ghen, kẻ hại; giữ được mạng mình là trước hết"],
   srv()?["Đi lên","từ thân cung nữ, được chủ tin và Hoàng thượng để mắt thì được phong Đáp ứng, rồi leo như phi tần"]
    :["Đi lên",`từ ${RANKS[0].n}, Thường tại, Quý nhân, Tần, Phi, Quý phi, Hoàng quý phi tới Hoàng hậu; con lên ngôi thì thành Hoàng thái hậu`],
   ["Nhà và con","nhà mẹ đẻ có vinh có nhục theo {x}; con được trọng thì mẫu thân được nể"],
   ["Mệnh truyện","truyện riêng của thân phận, mở từng chương; cuộn chiếu Mục tiêu ở cột nút bên trái màn luôn cho biết chương này cần gì"],
   ["Kết cục","mỗi kiếp khép lại bằng một kết: kết hay, kết dở, và những kết hiếm khó gặp"]])},
 {t:"Chơi thế nào",p:()=>ia("Hành sự"),h:()=>rows([["Buổi · khắc","mỗi tuần bốn buổi (sáng, trưa, chiều, tối), mỗi tháng ba tuần; mỗi buổi "+(BAL.time.khac)+" khắc, việc nào cũng tốn khắc"],
   [srv()?"Phận sự":"Hành sự","chọn việc mà làm; thẻ ghi cơ may, cái giá, cái được"],["Dư đồ","đi tới các nơi trong cung, gặp người"],
   srv()?["Đồng liêu","người làm cùng: kết bạn, đề phòng kẻ vu cáo"]:["Hậu cung · Giao tình","người trong cung; ai thương, ai ghen, ai oán {x}"],
   srv()?null:["Tài nghệ","học cầm kỳ thi họa, nữ công; mỗi bài là một trò nhỏ"],
   srv()?null:["Tư trang","y phục, trang sức; sáng sáng điểm trang trước khi gặp người"],
   ["Sự việc","tin trong cung, sự kiện, lời mời tự tìm đến; {x} chọn cách đáp"],["Sang buổi","hết khắc thì qua buổi; qua buổi tối là sang ngày mới, cũng là sang tuần mới"]].filter(Boolean))},
 {t:"Được · mất",p:()=>ia("Luân hồi")||ia("Mệnh truyện"),h:()=>rows([["Mất","bệnh nặng, sinh nở gặp nạn, bị người hại thì hết kiếp","r"],
   ["Lãnh cung","bị phế vào lãnh cung là mất phẩm vị; còn sống là còn đường về","r"],
   ["Được",srv()?"được phong vị, có người nâng đỡ, đi tới đâu tùy {x}":"ngôi Hoàng hậu; con lên ngôi thì làm Hoàng thái hậu, buông rèm nhiếp chính, hay tự lên ngôi","g"],
   ["Phúc duyên","kiếp sau không mang theo gì; chỉ Phúc duyên tích được để đổi thân phận"],
   ["Chơi cùng bạn","hai người một hậu cung, mỗi người một thân phận, một mục tiêu riêng"]])+say(`<p>{X} chạm <b>Tiếp</b> để {m} chỉ qua mấy chỗ trên màn.</p>`)}];
function introHTML(i){const P=INTRO[i];return P.h()}
function introPic(i){try{return INTRO[i].p()||""}catch(e){return""}}
/* the event picture (RIGHT TOP) of a spotlight step: the tab / topic it is about, else the Hành sự picture (kitInfoArt keys) */
const STEP_PIC={chao:"Hành sự",tuchat:"Sắc phong",khac:"Hành sự",the:"Hành sự",thu:"Hành sự",ketqua:"Hành sự",dudo:"Dư đồ",nhom0:"Hậu cung",nhom1:"Giao tình",nhom2:"Hậu cung",tutrang:"Tư trang",muctieu:"Mệnh truyện",so:"Luân hồi",quabuoi:"Hành sự"};
function stepPic(s){try{return ia(STEP_PIC[s.id]||"Hành sự")||ia("Hành sự")||""}catch(e){return""}}

/* ---------- LƯỢT DẪN ĐẦU KIẾP: 12 steps ---------- */
const STEPS=[
 /* step 1 = "Game này chơi gì" (owner 16/11: "bạn tôi hỏi ủa game này chơi cái gì? Mục tiêu là gì? Làm gì?"): 4 short pages, each with a
    painted picture (kitSceneArt) + kit rows; "Tiếp" turns the page, the last page goes on to the tour; "Bỏ qua lời dặn" on every page. */
 {id:"chao",title:()=>INTRO[T.page||0].t,big:true,pages:()=>INTRO.length,prep(){goRoom()},html:()=>introHTML(T.page||0)},
 {id:"tuchat",title:"Thanh trên cùng",target:"#kstrow",prep(){goRoom()},
  html:()=>srv()?say(`<p>Tám ô trên cùng là căn cơ của {x}: Sắc, Tài, Tâm cơ, Đức là tư chất; Bạc để chi tiêu, Sức để làm việc, Chủ tin là chủ nhân tin {x} bao nhiêu, Danh là tiếng tăm.</p><p>Chạm vào ô nào cũng có lời giải.</p>`)
   :say(`<p>Tám ô trên cùng là căn cơ của {x}:</p>${kitRows([R("Tư chất","Sắc · Tài · Tâm cơ · Đức"),R("Bạc","tiền riêng để chi tiêu"),R("Sức","để làm việc; dưới 20 thì không làm được việc nặng"),R("Sủng","Hoàng thượng thương {x} bao nhiêu"),R("Danh","tiếng tăm trong cung")].map(x=>[x[0],say(x[1]),x[2]]))}<p>Chạm vào ô nào cũng có lời giải.</p>`)},
 {id:"khac",title:"Buổi · khắc · quẻ tuần",target:"#k3tt",prep(){goRoom()},
  html:()=>say(`<p>Mỗi buổi có ${BAL.time.khac} khắc, chấm tròn đầy là khắc còn lại. Việc nào cũng tốn khắc; hết khắc thì qua buổi.</p><p>Đầu mỗi tuần rút một quẻ: quẻ tốt thì loại việc ghi trong ngoặc dễ thành hơn suốt tuần, quẻ xấu thì khó hơn; gặp quẻ Hung thì nên giữ mình. Bên cạnh là thời tiết hôm nay.</p>`)},
 {id:"the",title:"Đọc một thẻ việc",when:()=>!!groupBtn("act"),target:()=>pickAct(),pad:4,
  prep(re){goTab("act");setTimeout(()=>{allCat();const c=pickAct();if(c&&!re)scrollTo(c)},420)},
  html:()=>say(`<p>Mỗi việc là một thẻ. Chữ bên phải là cơ may: Liều, Khó, Năm ăn năm thua, Khá chắc, Chắc, Rất chắc, Nắm chắc; việc chắc thì không ghi.</p>${kitRows([R("Cần","điều kiện: ✓ đã đủ, ✗ còn thiếu"),R("Tốn","khắc và thứ phải bỏ ra"),R("Được","lợi khi thành, chữ xanh","g"),R("Mất","thiệt khi hỏng, chữ đỏ","r"),R("Kèm","hệ lụy có thể đến dù thành","r")])}<p>Dòng Quẻ dưới cơ may cho biết quẻ tuần làm việc ấy dễ hay khó hơn; "có thai: Liều" trong Được là cơ may riêng của điều ấy.</p>`)},
 {id:"thu",title:"Làm thử một việc",when:()=>!!groupBtn("act"),target:()=>pickAct(),pad:4,interact:true,noNext:true,
  prep(re){goTab("act");setTimeout(()=>{allCat();const c=pickAct();if(c&&!re)scrollTo(c)},420)},
  html:()=>say(`<p class="ktut-do">{X} chạm vào thẻ đang sáng để làm thử một việc thật.</p><p>Làm xong sẽ có thẻ kết quả.</p>`)},
 {id:"ketqua",title:"Thẻ kết quả",target:()=>resOn(),pad:4,skipIf:()=>!resOn(),
  prep(){try{clearTimeout(window.__rtT)}catch(e){}},
  html:()=>say(`<p>Sau mỗi việc, thẻ kết quả đóng dấu <b>Thành</b> hay <b>Hỏng</b>, ghi đúng những gì được và mất.</p><p>Thẻ tự lui sau ít lâu; việc đã qua đều chép vào Sổ ghi.</p>`)},
 {id:"dudo",title:"Dư đồ",when:()=>!!groupBtn("go"),target:()=>mapSpot(),pad:6,prep(){goTab("go")},marks:[()=>groupBtn("go")],
  html:()=>say(`<p>Dư đồ là bản đồ hậu cung. Mỗi nhãn ghi số bóng người ở đó và đường đi tốn mấy khắc; bóng người chưa cho biết là ai, đến nơi mới thấy mặt.</p><p>Chạm nhãn để đi. Nơi có dấu khóa thì phải xin yết kiến, hoặc lẻn vào và chịu hiểm.</p>`)},
 /* GROUP STEPS (tab layout may change: review/hau-cung-ui 06:00Z). Read from data attributes only: the tab keys (data-tab) and the
    group table KG; labels come from the live buttons, words per sub-tab from SUBSAY by key. A group step = the tab group that holds
    the step's anchor key; a later step whose group is the same as an earlier one is left out; a key that is its own top tab gets the
    same step without sub-tabs. To change the tour for a new layout: edit GROUP_ANCHORS / SUBSAY only. */
 ...GROUP_ANCHORS.map((k,i)=>({id:"nhom"+i,anchor:k,title:()=>grpLabel(k),when:()=>grpWhen(k,i),target:()=>$q("#panel .ksub")||panelBox(),pad:4,
  prep(){goTab(grpFirst(k))},marks:[()=>groupBtn(k)],html:()=>grpHTML(k)})),
 {id:"tutrang",title:"Tư trang",when:()=>!!groupBtn("inv"),target:()=>panelBox(),pad:0,prep(){goTab("inv")},marks:[()=>groupBtn("inv")],
  html:()=>say(`<p>Tư trang là rương đồ của {x}: trâm cài, y phục, quà được ban.</p><p>Mặc hợp phẩm thì yên; vượt phẩm hay quá giản dị đều có người để ý. Đồ ngự tứ không được bán.</p>`)},
 {id:"muctieu",title:"Mục tiêu chương",when:()=>typeof kitGoalNow==="function"&&!!kitGoalNow(),target:()=>goalEl(),pad:4,prep(){goRoom();if(!goalEl())goTab("act")},marks:[()=>groupBtn("story")],
  html:()=>say(`<p>Cuộn chiếu này là mục tiêu của chương đang đi: việc phải làm và tiến độ. {X} chạm vào để xem chi tiết chương và những việc nên làm, có lối "Đi làm" dẫn thẳng tới chỗ.</p><p>Truyện riêng của thân phận {x} nằm ở mục <b>${grpLabel("story")}</b>; Sổ ghi chép mọi việc đã qua cũng ở đó.</p>`)},
 {id:"so",title:"Ghi sổ · Nạp sổ",target:"#menu",pad:4,prep(){goRoom()},
  html:()=>say(`<p>Sổ tự ghi sau mỗi việc. Chạm ☰ để về màn đầu: chọn sổ, nạp lại kiếp đang chơi, xem Sổ luân hồi.</p><p>Chép sổ và Nạp sổ nằm trong Thiết lập; muốn nghe {m} dặn lại thì chọn <b>Xem lại lời dặn</b>.</p>`)},
 {id:"quabuoi",title:"Sang buổi",target:"#next",pad:4,side:"above",prep(){goRoom()},last:true,
  html:()=>say(`<p>Hết khắc hay muốn nghỉ thì chạm <b>Sang buổi</b>. Qua buổi tối là sang ngày mới, cũng là tuần mới: Hoàng thượng lật thẻ bài, rút quẻ mới.</p><p>{M} xin lui. Gặp việc mới, {m} sẽ dặn thêm đôi lời.</p>`)}];
window.KTUT_STEPS=STEPS;
const TOUR_TABS={the:"act",dudo:"go",tutrang:"inv",muctieu:"story",khac:"que"};
function steps(){return STEPS.filter(s=>!s.when||s.when())}
function total(){return steps().filter(s=>s.id!=="ketqua").length}
function numOf(s){const L=steps().filter(x=>x.id!=="ketqua");const i=L.indexOf(s);return i<0?L.indexOf(STEPS[STEPS.indexOf(s)-1])+1:i+1}

function tourStart(){if(T.on)return;tipOff();T.on=true;T.step=-1;T.page=0;T.paused=false;T.res0=window.kaLastResult;next()}
function tourEnd(how){T.on=false;T.step=-1;coachOff();PICK=null;REC.tour=how||"done";REC.asked=1;saveRec();try{if(S&&!coop())S.tutTour=1}catch(e){}
 const t=resOn();if(t)setTimeout(()=>t.classList.remove("on"),200);T.tipGap=Date.now()+2500;T.replay=false}
function next(){const was=STEPS[T.step];if(was&&was.id==="ketqua"){const t=resOn();if(t)t.classList.remove("on")}let i=T.step+1;while(i<STEPS.length){const s=STEPS[i];if((!s.when||s.when())&&!(s.skipIf&&s.skipIf()))break;i++}
 if(i>=STEPS.length){tourEnd("done");return}T.step=i;show(true)}
function show(prep){const s=STEPS[T.step];if(!s)return;if(busy()){T.paused=true;coachOff();return}T.paused=false;
 if(prep&&s.prep)try{s.prep(false)}catch(e){}
 const k=TOUR_TABS[s.id];if(k){REC.seen["tab-"+k]=1;saveRec()}if(s.anchor){grpKeys(s.anchor).forEach(x=>REC.seen["tab-"+x]=1);saveRec()}
 const n=numOf(s),tot=total();
 const btns=[{k:"skip",t:"Bỏ qua lời dặn",alt:true}];if(!s.noNext)btns.push({k:"next",t:s.last?"Đã hiểu":"Tiếp"});
 setTimeout(()=>{if(!T.on||STEPS[T.step]!==s)return;if(busy()){T.paused=true;coachOff();return}
  const np=s.pages?s.pages():0,pg=T.page||0;
  kitCoach({title:typeof s.title==="function"?s.title():s.title,sub:np?`Game này chơi gì · trang ${pg+1}/${np} · lời dặn ${n}/${tot}`:`${MMN()} · lời dặn ${n}/${tot}`,html:typeof s.html==="function"?s.html():s.html,target:s.target,pad:s.pad,interact:s.interact,marks:s.marks,side:s.side,big:s.big,btns,pic:np?introPic(pg):stepPic(s),
   on(k){if(k==="skip")return tourEnd("skip");if(k==="next"){if(np&&pg<np-1){T.page=pg+1;show(false);return}T.page=0;next()}}})},prep&&s.prep?560:0)}
/* the trial act: the step ends when the act's result arrives (result card, or the act opened a dialog of its own) */
function watchTry(){const s=STEPS[T.step];if(!T.on||!s||s.id!=="thu")return;
 if(T.waitRes){if(resOn()||Date.now()-T.waitRes>3000){T.waitRes=0;next()}return true}
 if(window.kaLastResult!==T.res0||resOn()){T.res0=window.kaLastResult;coachOff();T.waitRes=Date.now();return true}
 if(busy()){coachOff();T.paused=true;T.tryDone=true;return true}}
window.kitTour=function(){tourStart()};

/* ---------- LỜI DẶN LẦN ĐẦU (contextual tips) ---------- */
const TIPS={
 "tab-act":{t:"Hành sự",h:"Mỗi thẻ là một việc: Cần, Tốn, Được, Mất, Kèm ghi rõ cái giá và cái lợi; chữ bên phải là cơ may. Hàng mục trên cùng lọc việc theo loại."},
 "tab-go":{t:"Dư đồ",h:"Nhãn mỗi nơi ghi số bóng người và đường đi tốn mấy khắc. Nơi có dấu khóa phải xin yết kiến, hoặc lẻn vào và chịu hiểm."},
 "tab-rv":{t:"Phi tần",h:"Chạm mặt một người để xem thẻ: thiện cảm, ghen, oán với {x}, và những việc làm được với nàng. Điều chưa biết ghi dấu hỏi."},
 "tab-rel":{t:"Giao tình",h:"Giao tình cho thấy ai thương, ai ghen, ai oán. Người oán {x} nhiều sẽ tìm dịp trả thù; nên kết thân trước khi bị cô lập."},
 "tab-fac":{t:"Phe phái",h:"Trong cung ai cũng có chỗ dựa. Theo một phe thì được che chở, nhưng phe đối nghịch sẽ để mắt tới {x}."},
 "tab-court":{t:"Chí tôn",h:"Hoàng thượng và Thái hậu: hầu hạ, thỉnh an, xem lòng người trên. Người trên thương thì đường tấn phong rộng mở."},
 "tab-men":{t:"Nam nhân",h:"Thái y, thị vệ, quan viên trong cung. Giao thiệp có ích, nhưng gần gũi quá dễ sinh lời ra tiếng vào."},
 "tab-staff":{t:"Cung nhân",h:"Lòng là kẻ hầu trung với {x} bao nhiêu, Ta tin cậy là {x} đặt lòng tin vào họ bao nhiêu. Lòng dưới 45 thì dễ bị người khác mua chuộc."},
 "tab-kid":{t:"Hoàng tự",h:"Con của {x} ở đây: Sức khỏe, Tài và lòng Hoàng thượng thương. Chăm dạy con chu đáo; con được trọng thì mẫu thân cũng được nể."},
 "tab-inv":{t:"Tư trang",h:"Rương đồ của {x}: trâm cài, y phục, quà được ban. Mặc vượt phẩm hay quá giản dị đều có người để ý; đồ ngự tứ không được bán."},
 "tab-art":{t:"Tài nghệ",h:"Mỗi môn có bậc; mỗi bài học là một trò nhỏ, chơi khéo thì lên bậc nhanh. Bậc cao mở việc mới và giúp thắng thi tài."},
 "tab-story":{t:"Mệnh truyện",h:"Truyện riêng của thân phận {x}, từng hồi mở ra theo thời gian. Lựa chọn chỉ ghi cái giá; được mất chỉ lộ ra sau."},
 "tab-log":{t:"Sổ ghi",h:"Mọi việc đã qua đều chép ở đây: việc {x} làm, việc người khác làm với {x}, tin trong cung."},
 "que":{t:"Quẻ đầu tuần",h:"Mỗi đầu tuần rút một quẻ. Quẻ tốt thì loại việc ghi trong ngoặc dễ thành hơn suốt tuần, quẻ xấu thì khó hơn; gieo lại tốn "+(BAL.lot.bac)+" bạc và "+(BAL.lot.k)+" khắc."},
 "minigame":{t:"Trò nhỏ",h:"Trong trò nhỏ, chơi khéo thì được nhiều phần. Phần chơi cộng với bậc tài nghệ và tư chất thành kết quả cuối."},
 "muuke":{t:"Mưu kế",h:"Việc mưu kế, hại người được nhiều nhưng dòng Kèm ghi rõ hiểm họa. Lộ ra thì mất Đức, người bị hại sinh oán; Tâm cơ cao và chứng cứ giúp {x} đứng vững."},
 "thitam":{t:"Thị tẩm",h:"Mỗi tối Hoàng thượng lật thẻ bài chọn người hầu đêm; Sủng cao thì hay được chọn. Đêm hầu khéo thì Sủng, Ân tình tăng và có thể có thai."},
 "thai":{t:"Có thai",h:"{X} có tin vui. Giữ Sức, mời thái y an thai; kẻ ghen có thể ra tay hại thai, và lúc sinh nở cũng có hiểm nguy."},
 "tuyentu":{t:"Tuyển tú",h:"Ba năm một lần cung đón thêm tú nữ mới. Người mới được sủng thì người cũ dễ bị lãng quên; kết thân sớm hay đề phòng là tùy {x}."},
 "tranhghe":{t:"Tranh ghế",h:"Khi một ghế phẩm vị còn trống, các phi tần thi tài nghệ rồi xét đức hạnh. Ai đứng đầu được tấn phong vào ghế ấy."},
 "lanhcung":{t:"Lãnh cung",h:"Vào lãnh cung là mất phẩm vị. Còn sống là còn đường xin phục vị; giữ Sức và chờ dịp."},
 "luanhoi":{t:"Luân hồi",h:"Chết là hết: kiếp này không mang theo gì của kiếp trước, chỉ Phúc duyên tích được mới đổi được thân phận. Kiếp chưa tròn một năm mà chưa lên Quý nhân là kiếp dở dang, không được Phúc duyên."},
 "coop":{t:"Chơi cùng bạn",h:"Hai người cùng một hậu cung, mỗi người một thân phận. Mỗi người làm việc của mình; tuần mới bắt đầu khi cả hai đã qua đêm."}};
window.KTUT_TIPS=TIPS;
function want(id){if(!TIPS[id]||REC.seen[id])return;T.pend[id]=1}
function showTip(id){const d=TIPS[id];if(!d)return;REC.seen[id]=1;saveRec();delete T.pend[id];kitTip({id,title:d.t,html:`<p>${say(d.h)}</p>`})}
/* first open of a tab (the panel really on screen: not the phone room view, not the map's travel card) */
function curTab(){try{return typeof tab!=="undefined"?tab:null}catch(e){return null}}
function tabSeen(){const k=curTab();if(!k||$q(".game.k3home"))return;if(!panelBox())return;
 const id="tab-"+(k==="nho"||k==="quest"||k==="req"?"story":k);if(TIPS[id]&&!REC.seen[id])want(id)}
/* first meeting of a feature: read from the dialog that opens and from the state */
function fromModal(){try{const m=Q&&Q[0];if(!m)return;const t=String(m.t||"")+" "+String(m.cls||"");
 if(/thị tẩm|lật thẻ|night/i.test(t))want("thitam");if(/Tuyển tú/i.test(t))want("tuyentu");if(/Tranh ghế/i.test(t))want("tranhghe");
 if(/Gieo quẻ|quẻ đầu tuần/i.test(t))want("que")}catch(e){}}
let LS={preg:0,out:0,mg:0,co:0,dawn:0};
function fromState(){try{if(!S)return;if(S.preg&&!LS.preg)want("thai");LS.preg=S.preg?1:0;if(S.out&&!LS.out)want("lanhcung");LS.out=S.out?1:0;
 const mg=!!S.mg||vis($q("#ov"));if(mg&&!LS.mg)want("minigame");LS.mg=mg?1:0;const d=vis($q("#dawn"));if(d&&!LS.dawn)want("que");LS.dawn=d?1:0;
 if(coop()&&!LS.co)want("coop");LS.co=coop()?1:0}catch(e){}}
document.addEventListener("click",e=>{try{const b=e.target.closest&&e.target.closest(".kcattabs button,.kcattabs .pct,.pctabs .pct");if(b&&/^(Mưu kế|Hại người|Hại nhỏ|Hại nặng|Sát hại)/.test(b.textContent.trim()))want("muuke")}catch(x){}},true);

/* ---------- old players: asked once ---------- */
function veteran(){try{if(lifeLog&&lifeLog().length)return true}catch(e){}
 try{if(S&&!T.fresh&&((S.turn||0)>0||(S.logs||[]).length>3||S.year>1||S.month!==3||(S.tuan||0)>0))return true}catch(e){}
 try{for(const n of [1,2,3]){if(typeof SLOT!=="undefined"&&n===SLOT)continue;if(loadSlot(n))return true}}catch(e){}return false}
/* a sổ past its 2nd week (owner task 16/11): no tour, no ask, no tips; Thiết lập or "Xem lại lời dặn" turn them back on */
function oldSave(){try{return !T.fresh&&S&&((S.turn||0)*3+(S.tuan||0))>=2}catch(e){return false}}
function askOnce(){T.ask=true;tipOff();
 kitCoach({title:"Lời dặn tân thủ",sub:MMN(),big:true,html:say(`<p>{M} là ${MMN()}, dạy lễ cho người mới vào cung. {X} đã quen lối trong cung, có muốn nghe {m} dặn lại từ đầu?</p><p>Muốn nghe lúc khác: ☰ rồi chọn <b>Xem lại lời dặn</b>. Lời dặn bật tắt trong Thiết lập.</p>`),
  btns:[{k:"no",t:"Không cần",alt:true},{k:"yes",t:"Nghe ma ma dặn"}],
  on(k){T.ask=false;REC.asked=1;coachOff();if(k==="yes"){saveRec();tourStart()}else{REC.tour="skip";saveRec();try{OPT.tut=false;saveOpt()}catch(e){}try{if(S&&!coop())S.tutTour=1}catch(e){}}}})}

/* ---------- the loop: start, pause / resume, tips when the screen is free ---------- */
let NEWLIFE=false;
function loop(){try{
 if(botOff()){if(T.on||T.ask)coachOff();tipOff();return}
 if(typeof S==="undefined"||!S)return;
 fromState();fromModal();
 if(T.on){const s=STEPS[T.step];
  if(s&&s.id==="thu"&&!T.paused){watchTry();return}
  if(busy()){if(!T.paused){T.paused=true;coachOff()}return}
  if(T.paused){if(s&&s.id==="thu"&&T.tryDone){T.tryDone=false;next();return}show(false);return}
  return}
 if(T.ask){if(busy()){coachOff();T.askHid=true}else if(T.askHid){T.askHid=false;askOnce()}return}
 if(busy()||CUR){/* a dialog, or a kitCoach ring from elsewhere (jgoal "Đi làm"): the tip waits */if(TIPEL)TIPEL.hidden=true;return}
 if(TIPEL&&TIPEL.hidden){TIPEL.hidden=false;tipPlace()}
 if(T.replay){T.replay=false;tourStart();return}
 if(!T.fresh&&S.tutOld==null&&!S.tutTour){S.tutOld=oldSave()?1:0;if(S.tutOld)S.tutTour=1}
 if(autoOk()&&!REC.tour&&!REC.asked&&!S.tutTour&&!S.dead){
  if(T.fresh&&!veteran()){REC.asked=1;saveRec();tourStart();return}
  if(veteran()){askOnce();return}}
 if(!optOn()||(navigator.webdriver&&!testFlag())||S.tutOld===1)return;
 tabSeen();
 if(NEWLIFE){NEWLIFE=false;want("luanhoi")}
 if(!T.tip&&Date.now()>(T.tipGap||0)){const id=Object.keys(T.pend).find(k=>!REC.seen[k]);if(id)showTip(id)}
}catch(e){console.error(e)}}
setInterval(loop,500);
/* a new kiếp: fresh (the tour may start); after a past life, the luân hồi tip */
try{const s0=start;start=function(){const r=s0.apply(this,arguments);try{/* not botOff(): quiet is still on while Luân hồi waits for the figures (j52 nlBegin) */if(!window.__bot&&!(window.COOPW&&COOPW.ctx)/* co-op thin B: the host building the GUEST's life (context b) is not a new life on this phone */){T.fresh=true;PICK=null;let past=0;try{past=lifeLog().length}catch(e){}if(past)NEWLIFE=true}}catch(e){}return r};window.start=start}catch(e){}

/* ---------- Thiết lập: "Lời dặn tân thủ" switch (kit toggle) ---------- */
try{const oh=optHTML;optHTML=function(){const h=oh.apply(this,arguments);
  const tg=kitToggle({id:"o-tut",label:"Lời dặn tân thủ",sub:"ma ma chỉ lối, dặn khi gặp việc mới",on:optOn()});
  const rb=(typeof S!=="undefined"&&S&&!S.dead)?`<button type="button" class="kbtn alt ktutb" data-ktut-replay="1">Xem lại lời dặn<small>Game này chơi gì · ${MMN()} chỉ lối</small></button>`:"";
  return h.replace(/<\/div>\s*$/,tg+rb+"</div>")};
 const ow=wireOpt;wireOpt=function(){const r=ow.apply(this,arguments);try{const t=document.getElementById("o-tut");if(t)t.onchange=e=>{OPT.tut=!!e.target.checked;saveOpt();try{if(OPT.tut&&S)S.tutOld=0}catch(x){}if(!OPT.tut){tipOff();T.pend={}}}}catch(e){}return r};
 window.optHTML=optHTML;window.wireOpt=wireOpt}catch(e){console.error(e)}

/* ---------- ☰ menu: "Xem lại lời dặn" (only with a kiếp in play) ---------- */
function addReplay(){const m=document.querySelector("#modal.kpthome .kpmenu");if(!m||m.querySelector(".ktutb"))return;
 const cont=m.querySelector('[data-tgo="cont"]');if(!cont||typeof S==="undefined"||!S||S.dead||botOff())return;
 const b=document.createElement("button");b.type="button";b.className="kbtn alt ktutb";b.dataset.ktutReplay="1";b.innerHTML=`Xem lại lời dặn<small>${MMN()} chỉ lối</small>`;m.appendChild(b)}
new MutationObserver(addReplay).observe(document.getElementById("modal"),{childList:true,subtree:true});
document.getElementById("modal").addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-ktut-replay]");if(!b)return;e.stopPropagation();e.preventDefault();
 try{if(typeof sfx==="function")sfx("sfx-tap")}catch(x){}
 T.replay=true;try{if(S)S.tutOld=0}catch(x){}
 /* the shared ☰ "back to the game" path (j74 kitMenuResume) from the home page and from Thiết lập alike; the tour starts when the screen is free */
 if(typeof kitMenuResume==="function"&&kitMenuResume())return;
 const x=document.querySelector("#modal .kph button, #modal #mclose");if(x)x.click()},true);
}catch(e){console.error(e)}})();
