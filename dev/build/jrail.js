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
function paint(){try{const st=document.getElementById("stage");let el=document.getElementById("krail");
 const tt=document.getElementById("title");const onTitle=!!(tt&&!tt.hidden&&tt.getClientRects().length);
 /* on a portrait tab that hides the stage (its height is 0) the stage rail cannot be seen: only the status icons stay, in the fixed corner dock above the tab bar */
 /* KIT 33.11: on a Dư đồ level the rail stands in the map leather (kitSideHost), same spot as on the room stage */
 const mvh=typeof kitSideHost==="function"?kitSideHost():null;const onMap=!!mvh&&mvh!==st;const stOn=onMap||(!!st&&st.getBoundingClientRect().height>40);
 const live=typeof S!=="undefined"&&S&&!S.dead&&!!st&&!onTitle&&stOn;
 /* no game on screen (title / loading): only items flagged onTitle (status icons, §77.1) live in a fixed corner dock; the game's own shortcuts wait */
 let calm=false;try{calm=typeof reducedMotion==="function"&&reducedMotion()}catch(e){}
 const L=R.filter(x=>(live||x.onTitle)&&val(x.when,true));if(!L.length){if(el)el.remove();return}
 if(!el){el=document.createElement("nav");el.id="krail";el.className="krail";el.setAttribute("aria-label","Lối tắt")}
 const h=L.map(x=>{const b=val(x.badge,false),bz=val(x.busy,false)&&!calm,dn=val(x.done,false);return `<button type="button" class="krailb${b?" kbadge":""}${bz?" kbusy":""}${dn?" kdone":""}${x.glyph?" kglyph":""}" data-rail="${x.id}" aria-label="${x.title}${b?" (có mới)":""}" title="${x.title}">${x.glyph?`<span class="krailg" aria-hidden="true">${val(x.glyph,"")}</span>`:`<img src="${val(x.icon,"")}" alt="" decoding="async">`}</button>`}).join("");
 const host=live?(onMap?mvh:st):document.body;el.classList.toggle("kstdock",!live);
 if(el.__h!==h){el.innerHTML=h;el.__h=h}if(el.parentNode!==host)host.appendChild(el);
 if(live){place(el,onMap?mvh:st);el.style.bottom=""}else{el.style.top="";const tb=document.getElementById("tabs");const q=!onTitle&&tb&&tb.getClientRects().length?tb.getBoundingClientRect():null;el.style.bottom=q?`${Math.round(innerHeight-q.top+6)}px`:""}
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
.krailb{pointer-events:auto;position:relative;width:44px;height:44px;min-width:44px;padding:4px;margin:0;border-radius:8px;box-sizing:border-box;cursor:pointer;
 background:var(--k-card,#fffaf0);border:1px solid var(--gold,#b8892b);box-shadow:inset 0 0 0 2px var(--k-card,#fffaf0),inset 0 0 0 3px var(--k-hair,#e6d3ac),0 2px 6px #0003;display:flex;align-items:center;justify-content:center}
.krailb img{width:100%;height:100%;object-fit:contain;display:block;pointer-events:none}
.krailb:active{transform:scale(.94)}
.krailg{font:700 22px/1 var(--body,inherit);color:var(--ink,#3a2418);display:block;pointer-events:none}
.krailb.kbusy .krailg,.krailb.kbusy img{animation:krailDl calc(1.8s*var(--pace,1)) ease-in-out infinite}
@keyframes krailDl{0%,100%{transform:translateY(-3px);opacity:.55}50%{transform:translateY(3px);opacity:1}}
.krailb.kdone .krailg{color:var(--k-ok,#3c6b32)}
.krailb.kdone{border-color:var(--k-ok,#3c6b32)}
.krail.kstdock{position:fixed;left:calc(env(safe-area-inset-left,0px) + 8px);top:auto;bottom:calc(env(safe-area-inset-bottom,0px) + 8px);z-index:8700}
body:has(#modal:not([hidden])) .krail.kstdock,body:has(#ov:not([hidden])) .krail.kstdock,body.kbk-open .krail.kstdock{visibility:hidden}
.krailb.kbadge:after{content:"";position:absolute;top:1px;right:1px;width:10px;height:10px;border-radius:50%;background:var(--k-seal,#9a2c1c);box-shadow:0 0 0 2px var(--k-card,#fffaf0)}
`;document.head.appendChild(css);
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§77",title:"kitStageRail · cột nút vuông bên trái sân khấu (Lịch · Chat · Mục tiêu)",
 html:()=>`<div class="kitpg-row" style="position:relative;height:150px"><nav class="krail" style="position:static">${[["ico-cal","Lịch tháng",0],["ico-chat","Chat",0],["ico-goal","Mục tiêu chương",1]].map(([i,t,b])=>`<button type="button" class="krailb${b?" kbadge":""}" title="${t}"><img src="img/kit/${i}.webp" alt=""></button>`).join("")}</nav></div>`})}catch(e){}
}catch(e){console.error("jrail",e)}})();
