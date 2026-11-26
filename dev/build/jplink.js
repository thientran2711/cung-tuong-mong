/* ================= jplink: PERSON NAME LINK in act cards (owner 25/11 ~23:00Z, shot k7; KIT §6.3j "KK34") =================
   Owner (verbatim): "Tất cả những cái thông tin nào liên quan tới người là phải để vào một cái tab người riêng." Person info lives only in the people tab; an act card
   about a person only NAMES the person, and tapping that name opens the person in the people tab (link only, the card is never embedded).
   After each render, in an ACTION tab (act / go / court-less road tabs / art / inv / story / staff-less), every full person name inside a button of #panel
   becomes <span class="kplink">: tap → the people tab of that kind of person with that person selected:
     palace: consort (rivals) → Phi tần (rv) · man (S.men) → Nam nhân (men) · servant (S.staff) → Cung nhân (staff);
     home:   family / teacher / bà mối / suitor (S.kc.fam) → Gia tộc (rv) via kcSel (it knows every list and sub-tab).
   One kit look (.kplink: dotted underline, pointer); the act itself is NOT fired by a tap on the name (the name is its own tap target). */
const PLK_ACT=["act","go","art","inv","story","court","rel","q72","log"];
function plkTable(){const M=new Map();const add=(n,o)=>{n=String(n||"").trim();if(n.split(" ").length>=2&&!/^(Một|Người lạ|Vị )/.test(n)&&!M.has(n))M.set(n,o)};
 try{if(isKc&&isKc()){(S.kc&&S.kc.fam||[]).forEach(m=>add(m.name,{k:"fam",id:m.id,m}))}
  else{(typeof rivals!=="undefined"?rivals:[]).forEach(v=>add(v.name,{k:"rv",v}));(S.men||[]).forEach(m=>add(m.name,{k:"men",v:m}));(S.staff||[]).forEach(s=>add(s.name,{k:"staff",v:s}))}}catch(e){}
 return M}
function plkRx(M){const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");const L=[...M.keys()].sort((a,b)=>b.length-a.length);return L.length?new RegExp(`(?<![\\p{L}\\p{M}])(${L.map(esc).join("|")})(?![\\p{L}\\p{M}])`,"gu"):null}
function plkPaint(){try{if(!S||!PLK_ACT.includes(tab))return 0;const P=document.getElementById("panel");if(!P)return 0;const M=plkTable(),rx=plkRx(M);if(!rx)return 0;
 const W=document.createTreeWalker(P,NodeFilter.SHOW_TEXT,{acceptNode:n=>{rx.lastIndex=0;if(!rx.test(n.nodeValue))return NodeFilter.FILTER_REJECT;const p=n.parentElement;return p&&p.closest("button,[data-kt],.kact")&&!p.closest(".kplink,.pgwrap,script,style")?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT}});
 const L=[];while(W.nextNode())L.push(W.currentNode);let c=0;
 for(const n of L){const v=n.nodeValue;rx.lastIndex=0;let m,last=0;const f=document.createDocumentFragment();
  while((m=rx.exec(v))){if(m.index>last)f.appendChild(document.createTextNode(v.slice(last,m.index)));const sp=document.createElement("span");sp.className="kplink";sp.setAttribute("role","link");sp.setAttribute("data-plk",m[1]);sp.textContent=m[1];f.appendChild(sp);last=m.index+m[1].length;c++}
  if(last<v.length)f.appendChild(document.createTextNode(v.slice(last)));n.parentNode.replaceChild(f,n)}
 return c}catch(e){console.error("jplink paint",e);return 0}}
function plkGo(name){const M=plkTable(),t=M.get(name);if(!t)return false;try{Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true}catch(e){}
 if(t.k==="fam"){kcSel(t.id);tab="rv";render();return true}
 tab=t.k;render();const nm=name.split(" ");const want=[nm.slice(-2).join(" "),nm.slice(-1)[0]];
 const b=[...document.querySelectorAll("#panel [data-pg][data-pi]")].find(x=>x.dataset.pi!=null&&want.some(w=>w&&(x.textContent||"").trim()===w));if(b)b.click();return true}
window.plkGo=plkGo;window.plkPaint=plkPaint;
document.addEventListener("click",e=>{const a=e.target&&e.target.closest&&e.target.closest(".kplink");if(!a)return;e.preventDefault();e.stopPropagation();e.stopImmediatePropagation();plkGo(a.dataset.plk)},true);
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{plkPaint()}catch(e){}return r}})();
(function(){let q=false,P=null;const run=()=>{q=false;plkPaint()};const arm=()=>{const el=document.getElementById("panel");if(!el||el===P)return;P=el;new MutationObserver(()=>{if(q)return;q=true;requestAnimationFrame(run)}).observe(el,{childList:true,subtree:true})};
 if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",arm);else arm();setTimeout(arm,1500)})();
