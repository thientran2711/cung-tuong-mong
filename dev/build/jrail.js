/* ================= jrail: kitStageRail — THE stage icon rail (KIT §77, owner 16/11, shot 1b571e3a: "one column of small round icon buttons,
   top-left of the stage") =================
   ONE kit part, the same on every stage (her room, every place, co-op): a vertical column of small round kit buttons at the LEFT edge of
   #stage, under the scene title, never over a face (it only takes the left gutter: 40 px buttons, 6 px apart). Order = `order` (small first).
   Built-in: (1) Lịch tháng (kitMonthCalOpen, replaces the desk calendar in her room's corner, §58), (3) Mục tiêu chương (kitGoalDetail, replaces
   the goal strip on the stage and on top of Hành sự, §72.2; a small dot while the goal changed and she has not opened it).
   (2) Chat is added by co-op chat (review/coop-chat) through the API:
     kitStageRail.add({id, icon:"img/kit/….webp", title:"Tên", onTap:fn, badge:()=>bool, when:()=>bool, order:20})
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
 const live=typeof S!=="undefined"&&S&&!S.dead;if(!st||!live){if(el)el.remove();return}
 const L=R.filter(x=>val(x.when,true));if(!L.length){if(el)el.remove();return}
 if(!el){el=document.createElement("nav");el.id="krail";el.className="krail";el.setAttribute("aria-label","Lối tắt")}
 const h=L.map(x=>{const b=val(x.badge,false);return `<button type="button" class="krailb${b?" kbadge":""}" data-rail="${x.id}" aria-label="${x.title}${b?" (có mới)":""}" title="${x.title}"><img src="${x.icon}" alt="" decoding="async"></button>`}).join("");
 if(el.__h!==h){el.innerHTML=h;el.__h=h}if(el.parentNode!==st)st.appendChild(el);place(el,st)}catch(e){console.error("kitStageRail",e)}}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#krail [data-rail]");if(!b)return;e.stopPropagation();e.preventDefault();
 const x=byId(b.dataset.rail);if(!x||typeof x.onTap!=="function")return;try{if(typeof sfx==="function")sfx("sfx-tap")}catch(y){}try{x.onTap()}catch(y){console.error("rail tap",y)}paint()},true);
try{if(typeof renderStage==="function"){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);paint();return r}}}catch(e){}
try{const r1=render;render=function(){const r=r1.apply(this,arguments);paint();return r};window.render=render}catch(e){}
let rt=0;addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(paint,80)});
window.kitStageRail={add,remove,paint,items:()=>R.slice()};
/* (1) Lịch tháng — §58 kitMonthCalOpen; the desk calendar in the room corner is retired (one place: the rail) */
add({id:"cal",order:10,icon:"img/kit/mo-calendar.webp",title:"Lịch tháng",when:()=>typeof kitMonthCalOpen==="function",onTap:()=>kitMonthCalOpen()});
try{if(typeof kitDeskCal==="function"){window.kitDeskCal=kitDeskCal=function(){const b=document.getElementById("kmcdesk");if(b)b.remove()};const b=document.getElementById("kmcdesk");if(b)b.remove()}}catch(e){}
/* (3) Mục tiêu chương — §72 kitGoalDetail; dot = the goal changed since she last opened it */
const gSig=()=>{try{const G=typeof kitGoalNow==="function"?kitGoalNow():null;return G?[G.kicker,G.title,G.step].join("|"):""}catch(e){return""}};
add({id:"goal",order:30,icon:"img/kit/mo-edict-closed.webp",title:"Mục tiêu chương",when:()=>!!gSig(),badge:()=>{const s=gSig();return !!s&&S.goalSeen!==s},
 onTap:()=>{S.goalSeen=gSig();if(typeof kitGoalDetail==="function")kitGoalDetail()}});
const css=document.createElement("style");css.id="kit-rail";css.textContent=`
.krail{position:absolute;left:8px;top:44px;z-index:7;display:flex;flex-direction:column;gap:6px;pointer-events:none}
.krailb{pointer-events:auto;position:relative;width:44px;height:44px;min-width:44px;padding:4px;margin:0;border-radius:8px;box-sizing:border-box;cursor:pointer;
 background:var(--k-card,#fffaf0);border:1px solid var(--gold,#b8892b);box-shadow:inset 0 0 0 2px var(--k-card,#fffaf0),inset 0 0 0 3px var(--k-hair,#e6d3ac),0 2px 6px #0003;display:flex;align-items:center;justify-content:center}
.krailb img{width:100%;height:100%;object-fit:contain;display:block;pointer-events:none}
.krailb:active{transform:scale(.94)}
.krailb.kbadge:after{content:"";position:absolute;top:1px;right:1px;width:10px;height:10px;border-radius:50%;background:var(--k-seal,#9a2c1c);box-shadow:0 0 0 2px var(--k-card,#fffaf0)}
@media (max-height:430px){.krail{gap:4px}}
`;document.head.appendChild(css);
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§77",title:"kitStageRail · cột nút vuông bên trái sân khấu (Lịch · Chat · Mục tiêu)",
 html:()=>`<div class="kitpg-row" style="position:relative;height:150px"><nav class="krail" style="position:static">${[["mo-calendar","Lịch tháng",0],["ico-chat","Chat",0],["mo-edict-closed","Mục tiêu chương",1]].map(([i,t,b])=>`<button type="button" class="krailb${b?" kbadge":""}" title="${t}"><img src="img/kit/${i}.webp" alt=""></button>`).join("")}</nav></div>`})}catch(e){}
}catch(e){console.error("jrail",e)}})();
