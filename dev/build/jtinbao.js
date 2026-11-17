/* ================= jtinbao — TIN BÁO UI: kitTinBaoBadge · kitTinBaoToast · kitTinBaoCard (KIT §87) =================
   Owner OD ~14:50Z (2): a '!' badge on the fixed TOP BAR (same look as the Dư đồ '!' kitHapMark, bigger OK'd) that blinks when news arrives; tap → a kit TIN BÁO
   card: who brings the news + where + a line in that person's own voice, then a button to go to the Dư đồ / the place. Also a short gold toast line at the top for ~3 s with
   ONE sound; no modal interrupts. ~15:25Z (4): news is always true (the API only lists real happenings); (5) bubble talk PARKED.
   Data: the AG-ALL-2c API (jagknow): tinBaoList() → [{id,k,place,b,k0,k1,who,line,by,seen}], tinBaoNew(), tinBaoOn(fn), tinBaoSeen(id?). No numbers here (BAL has none to add).
   Parts (all from the shared kit; no private frame):
     kitTinBaoBadge()  — repaint the badge: the `.khap` disc (bigger) on a kit round button beside the Hoàng thượng chip of the top bar; blinks (.on) while tinBaoNew() > 0, calm
                         (dim, no blink) when everything was seen, absent when there is nothing to show. data-n = unseen count. Reduced motion / "Hiệu ứng: Gọn": no blink.
     kitTinBaoToast(it) — ONE line under the top bar: gold border (kitLine look), 3 s, kitSfx("notice") once, never a modal. Once per item (TB.toasted); a dialog open → badge only.
     kitTinBaoCard()   — kitModal kind "news" (seal TIN): one option row per item (informer's portrait in the option picture slot = the §6.3 person option rule), title = the
                         place, body = the informer's line, button "Tới xem" → closes the card, marks seen, opens the Dư đồ tab. Unseen first, seen after (marked "đã xem").
   Test hook: window.TB {toasted, queue, shown:[ids], sounds}. */
(function(){
const TB=window.TB={toasted:{},queue:[],shown:[],sounds:0,t:0,card:0};
const live=()=>{try{return typeof S!=="undefined"&&S&&!S.dead&&typeof tinBaoList==="function"}catch(e){return false}};
const items=()=>{try{return live()?tinBaoList():[]}catch(e){return[]}};
const nNew=()=>{try{return live()?tinBaoNew():0}catch(e){return 0}};
const calm=()=>{try{return typeof reducedMotion==="function"&&reducedMotion()}catch(e){return false}};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const plName=k=>{try{return placeName(k)||String(k||"")}catch(e){return String(k||"")}};
const modalOpen=()=>{const m=document.getElementById("modal");return !!(m&&!m.hidden)||(document.body&&document.body.classList.contains("kdlg-on"))};
/* the informer of an item: her own servant / confidant maid / a friend among the consorts; "mat" (her own Tai mắt), "here", "le" have no person */
function informer(it){const by=String(it&&it.by||"");const k=String(it&&it.inf||"");let p=null;try{
 if(k){if(k==="maid")p=S.maid;else if(k[0]==="s")p=(typeof servById==="function"?servById(+k.slice(1)):null)||null;else if(k[0]==="v")p=(rivals||[]).find(v=>"v"+v.id===k)||null}
 if(!p){if(by.indexOf("scm")===0){const m=by.slice(3);p=m==="me"?S.maid:((rivals||[]).find(v=>"v"+v.id===m)||{}).maid||null}
 else if(/^s\d/.test(by)){p=(S.staff||[]).find(s=>"s"+s.sid===by)||null;if(!p)for(const v of (rivals||[])){p=(v.staff||[]).find(s=>"s"+s.sid===by);if(p)break}}
 else if(/^v\d/.test(by)){p=(rivals||[]).find(v=>"v"+v.id===by)||null}}}catch(e){}
 return p||null}
function byName(it){const p=informer(it);if(p&&p.name)return String(p.name);const by=String(it&&it.by||"");return by==="mat"?"Tai mắt":""}
function face(it){const p=informer(it);if(p){try{return kitFace(p)}catch(e){}}return{src:"img/kit/unknown-f.webp",ini:"?",col:"#9a8a78"}}
/* ---------- badge ---------- */
/* the badge floats over the top bar: it takes the first free spot (nothing of the bar under it): left of the seal · under the seal · left of the time block · else ON the seal (no text there) */
function badgePos(b){try{const h=document.querySelector("header.hud");const s=b.offsetWidth||34;const hr=h.getBoundingClientRect();const seal=h.querySelector(".kseal-hud")||document.getElementById("emp");const sr=seal&&seal.getClientRects().length?seal.getBoundingClientRect():null;
 const tc=h.querySelector(".k3tc"),tr=tc&&tc.getClientRects().length?tc.getBoundingClientRect():null;
 const leaves=[...h.querySelectorAll("*")].filter(e=>!e.children.length&&e!==b&&e.getClientRects().length&&!(sr&&seal.contains(e))&&!e.matches(".kseal")&&(e.textContent.trim()||e.tagName==="IMG"||e.tagName==="I")).map(e=>e.getBoundingClientRect()).filter(r=>r.width>1&&r.height>1);
 const free=(x,y)=>x>=hr.left+2&&x+s<=hr.right-2&&y>=hr.top+2&&y+s<=hr.bottom-2&&!leaves.some(r=>x<r.right+8&&x+s>r.left-8&&y<r.bottom+4&&y+s>r.top-4);
 const C=[];if(sr){C.push([sr.left-s-6,sr.top+(sr.height-s)/2],[sr.right-s,sr.bottom+3],[sr.left-s-6,sr.bottom+3])}if(tr)C.push([tr.left-s-8,tr.top+(tr.height-s)/2]);
 let c=C.find(q=>free(q[0],q[1]));if(!c)c=sr?[sr.left+(sr.width-s)/2,sr.top+(sr.height-s)/2]:[hr.right-s-8,hr.top+4];/* nothing free (narrow bar): it sits ON the seal, which carries no text */
 b.style.left=Math.round(c[0])+"px";b.style.top=Math.round(c[1])+"px"}catch(x){}}
function kitTinBaoBadge(){try{let b=document.getElementById("ktbbadge");const L=items(),n=L.filter(x=>!x.seen).length;const hud=document.querySelector("header.hud");
 if(!L.length||!hud||!hud.getClientRects().length){if(b)b.remove();return null}
 if(!b){b=document.createElement("button");b.type="button";b.id="ktbbadge";b.className="ktbb";b.innerHTML=`<i class="khap" aria-hidden="true">!</i>`;document.body.appendChild(b)}
 b.classList.toggle("on",n>0);b.classList.toggle("calm",calm());b.dataset.n=String(n);
 const lab=n>0?`Tin báo: ${n} tin mới`:"Tin báo (đã xem hết)";b.setAttribute("aria-label",lab);b.title=lab;badgePos(b);clearTimeout(kitTinBaoBadge.t);kitTinBaoBadge.t=setTimeout(()=>{const x=document.getElementById("ktbbadge");if(x)badgePos(x)},500);try{if(window.ResizeObserver&&!kitTinBaoBadge.ro){kitTinBaoBadge.ro=new ResizeObserver(()=>{const x=document.getElementById("ktbbadge");if(x)badgePos(x)});kitTinBaoBadge.ro.observe(hud)}}catch(e){}return b}catch(e){console.error("kitTinBaoBadge",e);return null}}
/* ---------- toast ---------- */
function toastShow(it){const hud=document.querySelector("header.hud");let el=document.getElementById("ktbtoast");if(el)el.remove();
 el=document.createElement("div");el.id="ktbtoast";el.className="ktbt";el.setAttribute("role","status");el.dataset.tb=it.id;
 const w=byName(it);el.innerHTML=`<b class="ktbs">TIN</b><span>${esc(w?w+" báo: ":"Có tin: ")}${esc(plName(it.place))} có chuyện</span>`;
 const r=hud&&hud.getClientRects().length?hud.getBoundingClientRect():null;el.style.top=(r?Math.round(r.bottom+6):6)+"px";document.body.appendChild(el);
 el.addEventListener("click",()=>{el.remove();kitTinBaoCard()});TB.shown.push(it.id);
 try{if(typeof kitSfx==="function"&&!window.__bot){kitSfx("notice");TB.sounds++}else TB.sounds++}catch(e){}
 clearTimeout(TB.t);TB.t=setTimeout(()=>{el.classList.add("out");setTimeout(()=>{if(el.classList.contains("out"))el.remove();TB.t=0;next()},500)},3000);return el}
function next(){if(TB.t)return;const it=TB.queue.shift();if(!it)return;if(modalOpen()){return next()}toastShow(it)}
function kitTinBaoToast(it){if(!it||!it.id||TB.toasted[it.id])return false;TB.toasted[it.id]=1;if(it.seen||modalOpen())return false;TB.queue.push(it);next();return true}
/* ---------- ONE ADAPTER: who her Tai mắt are + how an informer relates to them (owner OD ~16:25Z) ----------
   The data side is C-AG #2's (taiMatList(her) / informerInfo(item), jagknow). Until it lands this adapter STUBS the read from what exists:
   her Tai mắt = her own servants (S.staff + confidant maid) by lòng, as many as "Tai mắt N" says; informer kind from the item's `by`.
   Nothing else in this file reads those two lists: switch here only. A sell-out is shown ONLY when the API marks it discovered (sold).
   tbTaiMat() → [{id,p,name,role,place,loyal}]   tbInformerKind(it) → {kind:"mat"|"hau"|"ban"|"qua"|"tai"|"sold", label} */
const LOYW=n=>n>=70?"một lòng với ta":n>=40?"còn dè dặt":"khó tin";
function tbNorm(x){const sid=x.sid!=null?x.sid:null;let p=x.p||x.person||null;if(!p&&sid!=null){try{p=typeof servById==="function"?servById(sid):null}catch(e){}}
 const lk=x.loyaltyKnown!==undefined?x.loyaltyKnown:(x.loy!=null?x.loy:(x.loyal!=null&&typeof x.loyal!=="string"?x.loyal:undefined));
 return{id:x.id!=null?x.id:(sid!=null?"s"+sid:x.name),p:p,name:x.name||(p&&p.name)||"",role:x.role==="maid"?"Cung nữ":x.role==="eunuch"?"Thái giám":(x.role||"Người hầu"),
  place:x.placedAt!=null?x.placedAt:x.place,placedName:x.placedName||"",loyal:typeof x.loyal==="string"?x.loyal:(typeof lk==="number"?LOYW(lk):"chưa rõ"),reports:x.reports|0,sold:!!x.sold}}
function tbTaiMat(){try{if(typeof taiMatList==="function"){const L=taiMatList(S);if(Array.isArray(L))return L.map(tbNorm)}}catch(e){console.error("taiMatList",e)}
 /* fallback only while the API is absent (old build): her own servants by lòng, as many as "Tai mắt N" */
 try{const L=(S.staff||[]).slice();if(S.maid&&!L.includes(S.maid))L.push(S.maid);return L.sort((a,b)=>(b.loyal||0)-(a.loyal||0)).slice(0,Math.max(0,S.mat|0)).map(s=>tbNorm({p:s,name:s.name,role:s.role,placedAt:(()=>{try{return palaceOf(S)}catch(e){return""}})(),loyaltyKnown:s.loyal}))}catch(e){console.error("tbTaiMat fallback",e);return[]}}
const KMAP={taiMat:"mat",ownMaid:"hau",friend:"ban",passerby:"qua"};
function tbInformerKind(it){try{if(typeof informerInfo==="function"){const r=informerInfo(it);if(r&&r.kind){const k=r.soldOutKnown?"sold":(KMAP[r.kind]||r.kind);return{kind:k,label:r.label||KL[k]||""}}}}catch(e){}
 const by=String(it&&it.by||""),p=informer(it);if(by==="mat")return{kind:"mat",label:KL.mat};if(by==="here")return{kind:"tai",label:KL.tai};if(by==="le"||by==="pass")return{kind:"qua",label:KL.qua};
 if(p){if(tbTaiMat().some(x=>x.p===p))return{kind:"mat",label:KL.mat};if((S.staff||[]).includes(p)||S.maid===p||by.indexOf("scm")===0||/^s\d/.test(by))return{kind:"hau",label:KL.hau};if(/^v\d/.test(by))return{kind:"ban",label:KL.ban}}
 return{kind:"qua",label:KL.qua}}
const KL={mat:"tai mắt của ta",hau:"người hầu của ta",ban:"bạn trong cung",qua:"người qua đường",tai:"ta tận mắt thấy",sold:"đã bán đứng ta"};
/* kitTaiMatCard: tap "Tai mắt N" → the list of WHO (kit panel kind intel, kit fact rows: person frame + role · where placed · lòng as she knows it) */
function kitTaiMatCard(){try{const L=tbTaiMat();const n=S.mat|0;
 const facts=L.length?L.map(x=>{const pl=x.place?`đặt ở ${esc(plName(x.place))}${x.placedName?` (người của ${esc(x.placedName)})`:""}`:"ở bên ta";return{who:x.p||undefined,text:`${x.p?kitName(x.p)+" · ":`<b>${esc(x.name)}</b> · ${esc(x.role)} · `}${pl} · ${esc(x.loyal)}${x.reports?` · đã báo ${x.reports} lần`:""}${x.sold?" · <b>đã bán đứng ta</b>":""}`}}):["Chưa có ai chịu làm tai mắt cho ta."];
 const m=kitModal({kind:"intel",title:"Tai mắt của ta",sub:L.length?`${L.length} người`:"chưa có ai",facts,btn:"Đã rõ"});TB.tm=L.length;return m}catch(e){console.error("kitTaiMatCard",e);return null}}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest('[data-kas="mat"], #kstat .kst[data-hx="mat"], #hud2 .hc[data-hx="mat"]');if(!b||!live())return;e.stopPropagation();e.preventDefault();try{if(typeof sfx==="function")sfx("sfx-tap")}catch(x){}kitTaiMatCard()},true);
/* ---------- card ---------- */
function goDuDo(){try{const b=document.querySelector('#tabs [data-tab="go"]');if(b)b.click()}catch(e){}}
function kitTinBaoCard(){try{const L=items();if(!L.length){if(typeof kitLine==="function")kitLine("Chưa có tin báo",2600);return null}
 const U=L.filter(x=>!x.seen),A=U.concat(L.filter(x=>x.seen));
 const facts=A.map(it=>{const p=informer(it);const pn=plName(it.place);const at=String(it.line).indexOf(pn)>=0?"":`<b>${esc(pn)}</b> · `;
  const kd=tbInformerKind(it);const t=`${p?`${kitName(p)} <small>(${esc(kd.label)})</small>`:`<b>${esc(kd.label.charAt(0).toUpperCase()+kd.label.slice(1))}</b>`} · ${at}${it.line}${it.seen?" <small>(đã xem)</small>":""}`;return p?{who:p,text:t}:{text:t}});
 const lead=A.map(informer).find(Boolean)||null;/* the big figure = the informer of the first (unseen first) row that has a person */
 const pl=[...new Set(A.map(x=>x.place))];const opts=[{n:pl.length===1?`Để ta tới xem · ${esc(plName(pl[0]))}`:"Để ta tới xem",fx:{},go:()=>{try{tinBaoSeen()}catch(e){}goDuDo();kitTinBaoBadge()}},{n:"Thôi",fx:{},go:()=>kitTinBaoBadge()}];
 const m=kitModal({kind:"news",title:"Tai mắt báo",sub:U.length?`${U.length} tin mới`:"Đã xem hết",facts,subject:lead||undefined,opts,onClose:()=>kitTinBaoBadge()});
 try{tinBaoSeen()}catch(e){}TB.card++;setTimeout(kitTinBaoBadge,0);return m}catch(e){console.error("kitTinBaoCard",e);return null}}
/* ---------- wiring ---------- */
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#ktbbadge");if(!b)return;e.stopPropagation();e.preventDefault();try{if(typeof sfx==="function")sfx("sfx-tap")}catch(x){}kitTinBaoCard()},true);
let sub=null;function hook(){if(sub||typeof tinBaoOn!=="function")return;sub=tinBaoOn(it=>{kitTinBaoToast(it);setTimeout(kitTinBaoBadge,0)})}
hook();
const paintR=()=>(window.renderAfter||((k,g)=>g()))("ktinbao",kitTinBaoBadge);
try{const r1=render;render=function(){const r=r1.apply(this,arguments);try{hook();paintR()}catch(e){}return r};window.render=render}catch(e){}
let rt=0;addEventListener("resize",()=>{clearTimeout(rt);rt=setTimeout(kitTinBaoBadge,80)});
const st=document.createElement("style");st.id="kit-tinbao";st.textContent=`
.ktbb{position:fixed;z-index:28;width:34px;height:34px;min-width:34px;padding:0;margin:0;border-radius:50%;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;justify-content:center;
 background:var(--k-card,#fffaf0);border:1px solid var(--gold,#b8892b);box-shadow:inset 0 0 0 2px var(--k-card,#fffaf0),inset 0 0 0 3px var(--k-hair,#e6d3ac),0 2px 6px #0003}
.ktbb .khap{width:22px;height:22px;line-height:22px;font-size:.98rem;margin:0;vertical-align:0}
.ktbb:not(.on) .khap{opacity:.45;box-shadow:0 0 0 1.5px #fff8e6}
.ktbb.on .khap{animation:ktbBlink calc(1.1s*var(--pace,1)) ease-in-out infinite}.ktbb.calm .khap{animation:none}
.ktbb[data-n]:not([data-n="0"]):not([data-n="1"]):after{content:attr(data-n);position:absolute;top:-4px;left:-4px;min-width:14px;height:14px;line-height:14px;border-radius:7px;padding:0 3px;box-sizing:border-box;text-align:center;font:700 .62rem/14px var(--body,inherit);color:#fff;background:var(--k-seal,#9a2c1c);box-shadow:0 0 0 1.5px var(--k-card,#fffaf0)}
.ktbb:active{transform:scale(.94)}
@keyframes ktbBlink{0%,100%{opacity:1;box-shadow:0 0 0 1.5px #fff8e6,0 0 10px var(--trim,#e6c25a)}50%{opacity:.35;box-shadow:0 0 0 1.5px #fff8e6,0 0 2px var(--trim,#e6c25a)}}
.ktbt{position:fixed;left:50%;transform:translateX(-50%);z-index:9760;max-width:calc(100vw - 24px);box-sizing:border-box;display:flex;align-items:center;gap:8px;padding:6px 14px 6px 8px;border-radius:14px;border:2px solid var(--trim,#e6c25a);
 background:#fffaf0f4;color:var(--ink,#3a2418);font:600 .84rem/1.3 var(--body,inherit);box-shadow:0 4px 14px #0004,0 0 0 1px var(--gold,#b8892b);cursor:pointer;transition:opacity .5s}
.ktbt.out{opacity:0}.ktbt .ktbs{flex:0 0 auto;padding:1px 7px;border-radius:4px;background:var(--k-seal,#9a2c1c);color:#fff8e6;font:700 .7rem/1.5 var(--body,inherit);letter-spacing:.06em}`;document.head.appendChild(st);
window.kitTinBaoBadge=kitTinBaoBadge;window.kitTinBaoToast=kitTinBaoToast;window.kitTinBaoCard=kitTinBaoCard;window.kitTaiMatCard=kitTaiMatCard;window.tbTaiMat=tbTaiMat;window.tbInformerKind=tbInformerKind;
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§87",title:"kitTinBaoBadge · kitTinBaoToast · kitTinBaoCard: dấu ! tin báo trên thanh trên, dòng vàng 3 giây, thẻ TIN BÁO",
 html:()=>`<div class="kitpg-row" style="display:flex;gap:14px;align-items:center;flex-wrap:wrap"><span class="ktbb on" style="position:relative"><i class="khap">!</i></span><span class="ktbb on" data-n="3" style="position:relative"><i class="khap">!</i></span><span class="ktbb" style="position:relative"><i class="khap">!</i></span>`+
  `<span class="ktbt" style="position:static;transform:none"><b class="ktbs">TIN</b><span>Ngọc Lan báo: Ngự hoa viên có chuyện</span></span></div>`})}catch(e){}
})();
