/* ================= jrail: kitStageRail — THE stage icon rail (KIT §77, owner 16/11, shot 1b571e3a: "one column of small round icon buttons,
   top-left of the stage") =================
   ONE kit part, the same on every stage (her room, every place, co-op): a vertical column of small round kit buttons at the LEFT edge of
   #stage, under the scene title, never over a face (it only takes the left gutter: 40 px buttons, 6 px apart). Order = `order` (small first).
   Built-in: (1) Lịch tháng (kitMonthCalOpen, replaces the desk calendar in her room's corner, §58), (3) Mục tiêu chương (kitGoalDetail, replaces
   the goal strip on the stage and on top of Hành sự, §72.2; a small dot while the goal changed and she has not opened it).
   (2) Chat is added by co-op chat (review/coop-chat) through the API:
     kitStageRail.add({id, icon:"img/kit/….webp", title:"Tên", onTap:fn, badge:()=>bool, when:()=>bool, order:20})
   Status-icon extras (§77.1, used by kitStatusIcon in jstatus.js): icon:()=>path (painted state icon, ico-download / ico-update) or glyph:"↓" (text, fallback only), busy:()=>bool (tiny CSS-only motion on the glyph),
   done:()=>bool (still, green), onTitle:true (also shown in a fixed bottom-left dock while no game is on screen).
   Label+count variant (KIT §31.2b, review/stage-rightcol): {id,label:"Cung nhân",count:()=>n,active:()=>bool,title,onTap,when,order} = the same square button with a bold number over a tiny label (no painted icon); used by the phone Dư đồ group buttons.
     kitStageRail.remove(id) · kitStageRail.paint() (re-draw now; it also re-draws after every renderStage / render and on resize).
   Kit look: the square kit icon button (card paper, gold hairline, soft shadow) with a painted icon; the badge = the kit seal-red dot.
   Old saves load unchanged: S.goalSeen is new and optional. */
(function(){try{
const R=[];const byId=id=>R.find(x=>x.id===id);
function add(o){if(!o||!o.id)return;const i=R.findIndex(x=>x.id===o.id);const it=Object.assign({order:50},o);if(i>=0)R[i]=it;else R.push(it);R.sort((a,b)=>a.order-b.order);paint()}
function remove(id){const i=R.findIndex(x=>x.id===id);if(i>=0)R.splice(i,1);paint()}
const val=(f,d)=>{try{return typeof f==="function"?f():(f==null?d:f)}catch(e){return d}};
function place(el,st){try{const t=st.querySelector("#sc-t");const R0=st.getBoundingClientRect();let top=8;
  if(t&&t.offsetParent){const q=t.getBoundingClientRect();if(q.bottom>R0.top&&q.top<R0.top+80)top=Math.max(top,Math.round(q.bottom-R0.top+6))}
  el.style.top=top+"px"}catch(e){}}
function hudSlot(el,hud){try{if(getComputedStyle(hud).position==="static")hud.style.position="relative";el.style.bottom="";el.style.left="0px";el.style.top="0px";
 for(const dir of ["column","row"]){el.style.flexDirection=dir;if(hudFit(el,hud))return true}return false}catch(e){return false}}
function hudFit(el,hud){try{
 const H=hud.getBoundingClientRect(),s=H.width/(hud.offsetWidth||H.width)||1,E=el.getBoundingClientRect(),w=E.width,h=E.height;if(!w||!h)return false;
 const R=[];for(const e of hud.querySelectorAll("*")){if(el.contains(e))continue;if(e.children.length&&!e.matches("button,img,svg,canvas,[role=button]"))continue;if(!e.getClientRects().length)continue;
  const r=e.getBoundingClientRect();if(r.width<2||r.height<2)continue;const cs=getComputedStyle(e);if(cs.visibility==="hidden"||+cs.opacity===0)continue;R.push(r)}
 const free=(x,y)=>R.every(r=>x+w+3<=r.left||x-3>=r.right||y+h+3<=r.top||y-3>=r.bottom);
 for(let y=H.top+3;y+h<=H.bottom-3;y+=2)for(let x=H.right-4-w;x>=H.left+4;x-=2)if(free(x,y)){el.style.left=((x-H.left)/s-hud.clientLeft).toFixed(1)+"px";el.style.top=((y-H.top)/s-hud.clientTop).toFixed(1)+"px";return true}
 return false}catch(e){return false}}
function paint(){try{const st=document.getElementById("stage");let el=document.getElementById("krail");
 const tt=document.getElementById("title");const onTitle=!!(tt&&!tt.hidden&&tt.getClientRects().length);
 /* on a portrait tab that hides the stage (its height is 0) the stage rail cannot be seen: only the status icons stay, in the fixed corner dock above the tab bar */
 /* KIT 33.11: on a Dư đồ level the rail stands in the map leather (kitSideHost), same spot as on the room stage */
 const mvh=typeof kitSideHost==="function"?kitSideHost():null;const onMap=!!mvh&&mvh!==st;const stOn=onMap||(!!st&&st.getBoundingClientRect().height>40);
 const live=typeof S!=="undefined"&&S&&!S.dead&&!!st&&!onTitle&&stOn;
 /* no game on screen (title / loading): only items flagged onTitle (status icons, §77.1) live in a fixed corner dock; the game's own shortcuts wait */
 let calm=false;try{calm=typeof reducedMotion==="function"&&reducedMotion()}catch(e){}
 /* dock:true (alert items: closing §77.2, tin báo «!» §42.2): on a game screen whose stage is hidden (Fold panel tab) they stand in the same corner dock */
 const dockOn=typeof S!=="undefined"&&S&&!S.dead&&!onTitle&&!live;
 const L=R.filter(x=>(live||x.onTitle||(x.dock&&dockOn))&&val(x.when,true));if(!L.length){if(el)el.remove();return}
 if(!el){el=document.createElement("nav");el.id="krail";el.className="krail";el.setAttribute("aria-label","Lối tắt")}
 const h=L.map(x=>{if(x.chip)return `<div class="krailc" data-rail="${x.id}">${val(x.chip,"")}</div>`;const b=val(x.badge,false),bz=val(x.busy,false)&&!calm,dn=val(x.done,false);if(x.label){const on=val(x.active,false);return `<button type="button" class="krailb krailt${on?" kopen":""}" data-rail="${x.id}" aria-label="${x.title}" aria-pressed="${on}" title="${x.title}"><b>${val(x.count,"")}</b><span>${x.label}</span></button>`}return `<button type="button" data-g="${String(x.title||"").trim().charAt(0)}" class="krailb${x.glyph?"":" kld"}${b?" kbadge":""}${bz?" kbusy":""}${dn?" kdone":""}${x.glyph?" kglyph":""}" data-rail="${x.id}" aria-label="${x.title}${b?" (có mới)":""}" title="${x.title}">${x.glyph?`<span class="krailg" aria-hidden="true">${val(x.glyph,"")}</span>`:`<img src="${val(x.icon,"")}" alt="" decoding="async" onload="this.parentNode.classList.remove('kld')" onerror="this.parentNode.classList.remove('kld');this.parentNode.classList.add('kerr')">`}</button>`}).join("");
 /* HEADER SLOT (stage-here r3d, ROOT-58 BACK 22:41Z): on a game screen whose stage is hidden (Fold panel tabs) the dock stands in a free slot of the
    fixed top bar (header.hud), as a row — never over scrolling content (cards, portraits, people). No free slot → the old corner dock. */
 const hud=!live&&dockOn?document.querySelector("header.hud"):null;const inHud=!!(hud&&hud.getClientRects().length);
 const host=live?(onMap?mvh:st):(inHud?hud:document.body);el.classList.toggle("kstdock",!live&&!inHud);el.classList.toggle("khud",inHud);
 if(el.__h!==h){el.innerHTML=h;el.__h=h;el.querySelectorAll(".krailb.kld").forEach(b=>{const i=b.querySelector("img");if(i&&i.complete&&i.naturalWidth)b.classList.remove("kld")})}if(el.parentNode!==host)host.appendChild(el);
 if(live){place(el,onMap?mvh:st);el.style.bottom=""}else if(inHud){if(!hudSlot(el,hud)){el.classList.remove("khud");el.classList.add("kstdock");document.body.appendChild(el);el.style.left=el.style.top="";const tb=document.getElementById("tabs");const q=tb&&tb.getClientRects().length?tb.getBoundingClientRect():null;el.style.bottom=q?`${Math.round(innerHeight-q.top+6)}px`:""}}else{el.style.top="";const tb=document.getElementById("tabs");const q=!onTitle&&tb&&tb.getClientRects().length?tb.getBoundingClientRect():null;el.style.bottom=q?`${Math.round(innerHeight-q.top+6)}px`:""}
 /* the stage may collapse / grow a moment after a tab change: look once more when the layout has settled */
 if(!paint.__t){paint.__t=setTimeout(()=>{paint.__t=0;const s2=document.getElementById("stage"),on=!!s2&&s2.getBoundingClientRect().height>40;if(on!==stOn)paint()},450)}}catch(e){console.error("kitStageRail",e)}}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#krail [data-rail]");if(!b)return;e.stopPropagation();e.preventDefault();
 const x=byId(b.dataset.rail);if(!x||typeof x.onTap!=="function")return;try{if(typeof sfx==="function")sfx("sfx-tap")}catch(y){}try{x.onTap()}catch(y){console.error("rail tap",y)}paint()},true);
/* oi-render: paint reads the stage box — it ran 2x per render (renderStage + render); inside a render it now runs once at its end (jlag2 renderAfter) */
const paintR=()=>(window.renderAfter||((k,g)=>g()))("krail",paint);
try{if(typeof renderStage==="function"){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);paintR();return r}}}catch(e){}
try{const r1=render;render=function(){const r=r1.apply(this,arguments);paintR();return r};window.render=render}catch(e){}
let rt=0;addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(paint,80)});
window.kitStageRail={add,remove,paint,items:()=>R.slice()};
/* (1) Lịch tháng — §58 kitMonthCalOpen; the desk calendar in the room corner is retired (one place: the rail) */
add({id:"cal",order:10,icon:"img/kit/ico-cal.webp",title:"Lịch tháng",when:()=>typeof kitMonthCalOpen==="function",onTap:()=>kitMonthCalOpen()});
try{if(typeof kitDeskCal==="function"){window.kitDeskCal=kitDeskCal=function(){const b=document.getElementById("kmcdesk");if(b)b.remove()};const b=document.getElementById("kmcdesk");if(b)b.remove()}}catch(e){}
/* (3) Mục tiêu chương — §72 kitGoalDetail; dot = the goal changed since she last opened it */
const gSig=()=>{try{const G=typeof kitGoalNow==="function"?kitGoalNow():null;return G?[G.kicker,G.title,G.step].join("|"):""}catch(e){return""}};
add({id:"goal",order:30,icon:"img/kit/ico-goal.webp",title:"Mục tiêu chương",when:()=>!!gSig(),badge:()=>{const s=gSig();return !!s&&S.goalSeen!==s},
 onTap:()=>{S.goalSeen=gSig();if(typeof kitGoalDetail==="function")kitGoalDetail()}});
const css=document.createElement("style");css.id="kit-rail";css.textContent=`
.krail{position:absolute;left:8px;top:44px;z-index:7;display:flex;flex-direction:column;gap:6px;pointer-events:none}
.krail.khud{flex-direction:row;z-index:8700;gap:4px}
.krail.khud .krailb{width:32px;height:32px;min-width:0;min-height:0}.krail.khud .krailg{font-size:17px}
.krailb{pointer-events:auto;position:relative;width:44px;height:44px;min-width:44px;padding:4px;margin:0;border-radius:8px;box-sizing:border-box;cursor:pointer;
 background:var(--k-card,#fffaf0);border:1px solid var(--gold,#b8892b);box-shadow:inset 0 0 0 2px var(--k-card,#fffaf0),inset 0 0 0 3px var(--k-hair,#e6d3ac),0 2px 6px #0003;display:flex;align-items:center;justify-content:center}
.krailb img{width:100%;height:100%;object-fit:contain;display:block;pointer-events:none}
.krailb:active{transform:scale(.94)}
/* ui-fixes-1: while a slot's icon is still arriving (.kld) the button shows the kit shimmer + the first letter of its name (never an empty square); a failed icon (.kerr) keeps the letter */
.krailb.kld,.krailb.kerr{background:linear-gradient(100deg,#efe4cf 30%,#fbf3e0 48%,#efe4cf 66%) 0 0/250% 100%,var(--k-card,#fffaf0)}
.krailb.kld{animation:kitShim 1.6s linear infinite}
.krailb.kld img,.krailb.kerr img{opacity:0}
.krailb.kld:before,.krailb.kerr:before{content:attr(data-g);position:absolute;inset:0;display:grid;place-items:center;font:700 20px/1 var(--display,serif);color:#8f5f0c;pointer-events:none}
@media (prefers-reduced-motion:reduce){.krailb.kld{animation:none}}
.krailg{font:700 22px/1 var(--body,inherit);color:var(--ink,#3a2418);display:block;pointer-events:none}
.krailb.kbusy .krailg,.krailb.kbusy img{animation:krailDl calc(1.8s*var(--pace,1)) ease-in-out infinite}
@keyframes krailDl{0%,100%{transform:translateY(-3px);opacity:.55}50%{transform:translateY(3px);opacity:1}}
.krailb.kdone .krailg{color:var(--k-ok,#3c6b32)}
.krailb.kdone{border-color:var(--k-ok,#3c6b32)}
.krail.kstdock{position:fixed;left:calc(env(safe-area-inset-left,0px) + 8px);top:auto;bottom:calc(env(safe-area-inset-bottom,0px) + 8px);z-index:8700}
body:has(#modal:not([hidden])) .krail.kstdock,body:has(#ov:not([hidden])) .krail.kstdock,body.kbk-open .krail.kstdock{visibility:hidden}
.krailb.kbadge:after{content:"";position:absolute;top:1px;right:1px;width:10px;height:10px;border-radius:50%;background:var(--k-seal,#9a2c1c);box-shadow:0 0 0 2px var(--k-card,#fffaf0)}
/* KIT §77b kitStBadge: the round STATUS BADGE at the bottom-right corner of a kit square rail button (.krailb): ✓ green = ready, … grey = busy, ⏸ amber = paused; none = no badge. Offline = class koff on the button (picture goes grey). K-BADGE-HAOHUU */
.krailb .kbdg{position:absolute;right:-7px;bottom:-7px;min-width:20px;height:20px;padding:0 3px;border-radius:50%;box-sizing:border-box;font:800 14px/20px system-ui,sans-serif;text-align:center;color:#fff;background:#8a7350;box-shadow:0 0 0 2px var(--k-card,#fffaf0);pointer-events:none;z-index:2;display:flex;align-items:center;justify-content:center}
.krailb .kbdg.ok{background:#2f8a4a}.krailb .kbdg.pause{background:#b07a18;font-size:0;gap:3px}.krailb .kbdg.busy{background:#7a6a58;letter-spacing:-1px}
/* ⏸ is drawn as two CSS bars (font independent): each 3 x 10 px */
/* the same two bars inline in any kit chip text (.kpzb, K-CHIP-PAUSE): never a ⏸ font glyph in a chip — it reads as a smudge at chip size */
.kpzb{display:inline-flex;gap:3px;align-items:center;vertical-align:-1px;margin-right:4px}.kpzb::before,.kpzb::after{content:"";display:block;width:3px;height:10px;border-radius:1px;background:currentColor}
.krailb .kbdg.pause::before,.krailb .kbdg.pause::after{content:"";display:block;width:3px;height:10px;border-radius:1px;background:#fff}
.krailb.koff>:not(.kbdg){filter:grayscale(1) brightness(.92);opacity:.7}
`;document.head.appendChild(css);
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§77",title:"kitStageRail · cột nút vuông bên trái sân khấu (Lịch · Chat · Mục tiêu)",
 html:()=>`<div class="kitpg-row" style="position:relative;height:150px"><nav class="krail" style="position:static">${[["ico-cal","Lịch tháng",0],["ico-chat","Chat",0],["ico-goal","Mục tiêu chương",1]].map(([i,t,b])=>`<button type="button" data-g="${t.charAt(0)}" class="krailb${b?" kbadge":""}" title="${t}"><img src="img/kit/${i}.webp" alt=""></button>`).join("")}</nav></div>`})}catch(e){}
function kitStBadge(st){const m={ok:"✓",busy:"…",pause:"⏸"};return m[st]?`<b class="kbdg ${st}" aria-hidden="true">${m[st]}</b>`:""}window.kitStBadge=kitStBadge;
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§77b",title:"kitStBadge · huy hiệu trạng thái ở góc nút vuông (✓ sẵn sàng · … đang bận · ⏸ tạm dừng · xám = ngoại tuyến)",
 html:()=>`<div class="kitpg-row" style="display:flex;gap:14px;padding:8px">${[["ok",""],["busy",""],["pause",""],["","koff"]].map(([st,c])=>`<button type="button" class="krailb ${c}" aria-label="${st||"ngoại tuyến"}"><span class="krailg">♥</span>${kitStBadge(st)}</button>`).join("")}</div>`})}catch(e){}
}catch(e){console.error("jrail",e)}})();

/* KIT §77c kitPromoChip (MAIN 117 KIT REQUEST, owner 24/11 ~05:55Z «để trên cái mép trên cùng của cái sân khấu, ghi ngắn gọn thôi»): ONE short chip at the TOP edge of the stage,
   centred (the bottom edge belongs to the figure name tags; the scene title is top-left #kshL and the chip column top-right #kshR, both clear of the centre), telling the time to the
   next promotion round and the rank: «Kỳ thăng: 3 tháng · Tần». Data hook (Foreman D, PROMO-HIST): window.kitPromoHook = () => ({months:n, rank:"Tần"}) | null (null = no chip).
   months 0 → «Kỳ thăng: kỳ này · Tần». cổ trang, no %, kit `.kchip` look; not tappable. Mounted after every renderStage. */
(function(){try{
 const css=document.createElement("style");css.id="kpromo-css";css.textContent=`#stage>.kpromo{position:absolute;top:6px;left:50%;transform:translateX(-50%);z-index:6;pointer-events:none;white-space:nowrap;margin:0;box-shadow:0 1px 4px #2a1a1244}#stage>.kpromo b{font-weight:700}`;document.head.appendChild(css);
 window.kitPromoInfo=function(){try{const f=window.kitPromoHook;const r=typeof f==="function"?f():null;if(!r||!(r.months>=0)||!r.rank)return null;return r}catch(e){return null}};
 window.kitPromoChip=function(r){r=r||kitPromoInfo();if(!r)return"";const w=r.months>0?`${r.months} tháng`:"kỳ này";return `<span class="kchip kpromo" data-kpromo="1">Kỳ thăng: <b>${w}</b> · ${r.rank}</span>`};
 /* the chip stands at the centre of the top edge; when a head seal / mood seal / the right title column is there, it slides along the top edge to the nearest free place (never over a seal) */
 window.kitPromoPlace=function(st){const c=st&&st.querySelector(":scope>.kpromo");if(!c)return;c.style.left="50%";c.style.transform="translateX(-50%)";const R=st.getBoundingClientRect(),w=c.offsetWidth,h=c.offsetHeight,top=6;
  /* a spot is taken when anything but the stage picture / a figure body lies under the chip (seal, mood avatar, rail button, count pill, title column) */
  const RX=/seal|kemo|kmemark|kmglw|krail|kchip|kgfbtn|kpill|j59hchip|kfig|kscene|ktitle|kshR|kshL/i;
  const taken=x=>{const y=R.top+top+h/2;for(let dx=0;dx<=w;dx+=Math.max(8,w/12)){const px=R.left+x+dx;for(const e of document.elementsFromPoint(px,y)){if(e===c||e.closest(".kpromo"))continue;if(e===st)break;const cls=String(e.className&&e.className.baseVal!==undefined?e.className.baseVal:e.className||"")+" "+(e.id||"");if(RX.test(cls)&&!/figimg|bob/.test(cls))return true}}return false};
  const cx=(R.width-w)/2;if(!taken(cx))return;const lo=8,hi=R.width-w-8;let best=null;for(let x=lo;x<=hi;x+=6){if(!taken(x)&&(best==null||Math.abs(x-cx)<Math.abs(best-cx)))best=x}
  if(best!=null){c.style.left=best+"px";c.style.transform="none"}};
 window.kitPromoMount=function(){const st=document.getElementById("stage");if(!st)return;st.querySelectorAll(":scope>.kpromo").forEach(e=>e.remove());const h=kitPromoChip();if(h){st.insertAdjacentHTML("beforeend",h);kitPromoPlace(st);setTimeout(()=>{try{kitPromoPlace(st)}catch(e){}},700)}};
 if(typeof renderStage==="function"){const rs0=renderStage;renderStage=function(){const r=rs0.apply(this,arguments);try{kitPromoMount()}catch(e){}return r}}
 if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§77c",title:"kitPromoChip · chip «Kỳ thăng» ở mép trên sân khấu",where:"<b>Mép trên sân khấu</b> (giữa, dưới thanh trên)",note:"Chip ngắn «Kỳ thăng: n tháng · hạng»; dữ liệu từ <code>window.kitPromoHook</code> (Foreman D); ẩn khi hook trả null.",html:()=>`<div class="kitpg-row" style="padding:8px">${kitPromoChip({months:3,rank:"Tần"})}${kitPromoChip({months:0,rank:"Phi"})}</div>`})
}catch(e){console.error("kpromo",e)}})();
