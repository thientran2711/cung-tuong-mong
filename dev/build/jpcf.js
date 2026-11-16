/* ================= jpcf: PERSON CARD FILL (owner 15/11 "khung bên phải nó đang bị trống", review/pcard-fill) =================
   The right side of a person card (pcard) was empty under a few act cards. It is now filled with the person's useful info, built ONLY from
   existing kit parts (no new component, no private markup/CSS):
     1. Tâm trạng      kitSkillCard (max:0): the mood-dialog picture of the event that caused it (emoBoxArt) + mood name + cause; tap = emoBox
     2. Lòng người với ta   kitRelTable(kitRelRows(person))  (thiện cảm / oán / ghen / sủng, §52)
     3. Sở trọng       kitRows: known tính nết + "Hay: …" (PERS tend), the Emperor's known likes
     4. Đã biết        kitRows of the newest intel (intelOf / S.notes) + the existing chips that open "Đã biết về X" and "Chứng cứ về X"
     5. Dạo này        kitRows: this month's log lines that name her (week | line)
     6. Việc nhanh     act cards (pbtn) — only when the card has no act of its own (e.g. "Lần ghé này đã nói chuyện rồi"): Sai tai mắt dò la,
                       Đến cung nàng, Tặng quà / Kết giao (the same buttons the Hậu cung card has)
   WHERE: a card with 2+ act groups (tabs) gets one more kit tab "Lòng người"; a card with ONE group or none (the stage pop-up) shows the
   blocks under its acts, so the empty space is used. Cards for herself, children and strangers ("Người lạ") are not filled.
   Test: dev/test/pcard-fill.js. */
(function(){
const SKIP_TAB="Lòng người";
function plain(s){try{return typeof kpPlain==="function"?kpPlain(String(s||"")):String(s||"").replace(/<[^>]*>/g,"")}catch(e){return String(s||"").replace(/<[^>]*>/g,"")}}
function pcfEnt(o){try{const f=o&&o.f;let e=f&&f.__kp&&typeof f.__kp==="object"?f.__kp:null;if(!e&&f&&typeof k61PortEnt==="function")e=k61PortEnt(f);
 if(!e||!S||e===S||S.dead)return null;
 if(e.tal!==undefined&&e.hp!==undefined&&e.fond!==undefined)return null;/* children */
 if(typeof kitIsKnown==="function"&&!kitIsKnown(e))return null;/* strangers: nothing to tell yet */
 return e}catch(x){return null}}
const isEmp=e=>S&&e===S.emp, isTh=e=>S&&(e===S.thO||e.kind==="th");
function pcfName(e){try{if(isEmp(e))return"Hoàng thượng";if(isTh(e))return"Thái hậu";return plain(e.name||"")}catch(x){return""}}
function pcfMood(e){try{if(typeof kitEmotion!=="function"||typeof emoBoxArt!=="function")return"";const m=kitEmotion(e);if(!m)return"";
 if(!m.known)return `<div class="kpsec">${kitSkillCard({kind:"mood",name:"Tâm trạng: chưa rõ",max:0,img:"",desc:"Ngươi chưa gặp, chưa có tai mắt bên người này"})}</div>`;
 const L=typeof emoCauses==="function"?emoCauses(e):[];const a=emoBoxArt(e,m,L);const key=typeof emoKey==="function"?emoKey(e):"";
 /* no cause event = no event picture: the plain mood card (no stand-in picture; stat-fx-2) */const own=typeof emoCauseArt==="function"?emoCauseArt(L.find(x=>x.k===m.k)||(m.k==="binh"?null:L[0])):"";
 const card=kitSkillCard({kind:"mood",name:`Tâm trạng: ${m.name}`,max:0,img:own?a.src:"",desc:a.label&&a.label!==m.name?a.label:"Không có chuyện gì đáng kể gần đây"});
 return `<div class="kpsec pcf-mood" data-emo-open="${key}" role="button" tabindex="0" title="Xem vì sao">${card}</div>`}catch(x){return""}}
function pcfRel(e){try{if(typeof kitRelRows!=="function"||typeof kitRelTable!=="function")return"";const R=kitRelRows(e);if(!R.length||R.every(r=>r.unk!=null))return"";
 return `<div class="kpsec"><h4 class="kpst">Lòng người với ta</h4>${kitRelTable(R,{head:false})}</div>`}catch(x){return""}}
function pcfTaste(e){try{const rows=[];
 if(isEmp(e)){const E=S.emp,K=E.known||{},L=E.likes||{};const like=[["flower","hoa"],["music","khúc nhạc"],["dish","món ăn"]].filter(([k])=>K[k]).map(([k,w])=>`${w} ${L[k]}`);
  rows.push(["Ngài thích",like.length?like.join(" · "):"chưa biết (trò chuyện với ngài để biết)",like.length?"":"n"]);
  try{const d=typeof disRow==="function"&&disRow("emp");if(d)rows.push(d)}catch(x){}
  const T=(E.traits||[]).map(t=>PERS[t]&&PERS[t].tend?PERS[t].tend:"").filter(Boolean);if(T.length)rows.push(["Ngài hay",T.join("; ")])}
 else if(isTh(e)){/* jtrong (D7 r1): the same answer as the card chip — her archetype once met at thỉnh an, else "chưa rõ" (stranger rule) */
  if(typeof thArch==="function"){const k=S.thO&&S.thO.archK;rows.push(["Tính nết",k?thArch().n:"chưa rõ",k?"":"n"])}else rows.push(["Tính nết",traitsOf("th").join(" · ")||"chưa rõ"])}
 else if(typeof trKnown==="function"&&e.id!=null){const K=trKnown(e),T=typeof traitsOf==="function"?traitsOf(e):[];const un=T.filter(t=>!K.includes(t)).length;
  rows.push(["Tính nết",K.length?K.join(" · ")+(un?` (còn ${un} nết chưa rõ)`:""):"chưa rõ",K.length?"":"n"]);
  try{const d=typeof disRow==="function"&&disRow(e);if(d)rows.push(d)}catch(x){}
  const tend=K.map(t=>PERS[t]&&PERS[t].tend).filter(Boolean);if(tend.length)rows.push(["Hay",tend.join("; ")])}
 if(!rows.length)return"";return `<div class="kpsec"><h4 class="kpst">Sở trọng</h4>${kitRows(rows)}</div>`}catch(x){return""}}
function pcfIntel(e){try{if(e.id==null||typeof kitRows!=="function")return"";const L=typeof intelOf==="function"?intelOf(e):[];const old=(S.notes&&S.notes[e.id])||[];
 const rows=L.slice(0,3).map(x=>["Tin",x.fact+(x.current===false?" (nay đã khác)":"")]);
 old.forEach(t=>{if(rows.length<3&&!L.some(x=>plain(x.fact).includes(plain(t))))rows.push(["Nghe được",t])});
 const n=Math.max(L.length,old.length);const ev=e.ev||0;
 const chips=[n?`<button class="chip kchipb" data-kintel="${e.id}">Đã biết: ${n} tin ›</button>`:"",ev?`<button class="chip hot kchipb" data-kev="${e.id}" title="Xem chứng cứ">Chứng cứ ${ev} ›</button>`:""].filter(Boolean);
 return `<div class="kpsec"><h4 class="kpst">Đã biết</h4>${rows.length?kitRows(rows):`<div class="kpnote">Chưa biết gì thêm. Dò la, hỏi kẻ hầu để biết.</div>`}${chips.length?`<div class="kchips">${chips.join(" ")}</div>`:""}</div>`}catch(x){return""}}
function pcfLog(e){try{const nm=pcfName(e);if(!nm||!S.logs)return"";const parts=nm.split(" ");const key=isEmp(e)||isTh(e)?nm:parts.slice(-2).join(" ");const mark=`T${S.month}/${S.year} `;const rows=[];
 for(const h of S.logs){const m=/^<span class="ld">(T\d+\/\d+) ([^<]*)<\/span>([\s\S]*)$/.exec(h);if(!m||(m[1]+" ")!==mark)continue;const t=plain(m[3]);if(!t.includes(key)&&!(isEmp(e)&&/Hoàng thượng|ngài /i.test(t)))continue;
  rows.push([m[2],m[3]]);if(rows.length>=4)break}
 if(!rows.length)return `<div class="kpsec"><h4 class="kpst">Dạo này</h4><div class="kpnote">Tháng này ngươi chưa có chuyện gì với ${isEmp(e)||isTh(e)?"người":"nàng"}.</div></div>`;
 return `<div class="kpsec"><h4 class="kpst">Dạo này</h4>${kitRows(rows.map(([w,t])=>[w,t,"t"]))}</div>`}catch(x){return""}}
/* quick acts: only for a rival, only when her card has no act (the pop-up after the one talk of the visit) */
function pcfQuick(e){try{if(typeof rivals==="undefined"||typeof rvGroups!=="function")return"";const i=rivals.indexOf(e);if(i<0||!e.alive||e.out||typeof pbtn!=="function")return"";
 const B=[];const push=b=>{if(b&&/<button(?![^>]*disabled)/.test(b))B.push(b)};
 try{push(scoutBtn(e))}catch(x){}try{push(seeBtn(e))}catch(x){}try{const g=rvGroups(e,i).find(([h])=>h==="Giao thiệp");(g&&g[1]||[]).forEach(push)}catch(x){}
 if(!B.length)return"";return `<div class="kpsec"><h4 class="kpst">Việc nhanh</h4><div class="kskacts pcb">${B.slice(0,3).map(b=>`<div class="kpanec">${b}</div>`).join("")}</div></div>`}catch(x){return""}}
/* PCF_X: more blocks from other modules (jmem: Kỷ niệm, Ân oán chưa dứt), each f(person) -> kitRows HTML or "" */
function pcfX(e){try{return (window.PCF_X||[]).map(f=>{try{return f(e)||""}catch(x){return""}}).join("")}catch(x){return""}}
function pcfBlocks(e,o,quick){return [pcfMood(e),pcfRel(e),pcfTaste(e),pcfIntel(e),pcfX(e),pcfLog(e),quick?pcfQuick(e):""].filter(Boolean).join("")}
window.pcfBlocks=pcfBlocks;window.pcfEnt=pcfEnt;
if(typeof pcard==="function"){const p0=pcard;pcard=function(o){let e=null;try{if(!window.__pcfOff&&o&&!o.__pcf)e=pcfEnt(o)}catch(x){}
 if(!e)return p0.apply(this,arguments);
 try{const G=(o.groups||[]).filter(g=>g&&g[1]&&g[1].filter(Boolean).length);const tabbed=G.length>=2;const live=G.some(g=>g[1].some(b=>/<button(?![^>]*disabled)/.test(b)));
  const body=pcfBlocks(e,o,!live);if(!body)return p0.apply(this,arguments);
  if(tabbed){const o2=Object.assign({},o,{__pcf:1,groups:(o.groups||[]).concat([[SKIP_TAB,[`<div class="pcf">${body}</div>`]]])});
   return p0.call(this,o2).replace(/(<button class="pct[^"]*" data-pct="Lòng người"[^>]*>Lòng người) <i[^>]*>[^<]*<\/i>/,"$1")}
  const h=p0.apply(this,arguments);const at=h.lastIndexOf("</div></div>");
  return at<0?h:h.slice(0,at)+`<div class="pcf">${body}</div>`+h.slice(at)}catch(x){console.error("pcf",x);return p0.apply(this,arguments)}}}
document.addEventListener("click",e=>{const t=e.target.closest&&e.target.closest("[data-emo-open]");if(!t||e.target.closest("button,a"))return;const k=t.dataset.emoOpen;if(k&&typeof emoBox==="function"){e.stopPropagation();try{emoBox(k)}catch(x){console.error(x)}}},true);
/* stat-fx-2: the person card and the status sheet are re-drawn with innerHTML, so kitStatSet never sees their numbers change. A call-site watcher (uses the
   existing kitStatDelta -> kitStatGlow, no new kit part): when a card/tile/relation number is drawn again with another value than the one drawn for the same
   cell a moment ago, that cell glows GREEN for a rise / RED for a fall. Key = card/sheet name + cell label; memory lasts 20 s. HUD cells keep their own path. */
(function(){if(typeof MutationObserver!=="function"||typeof kitStatDelta!=="function")return;
 const SEL=".kst-tile,.kst-chip,.krt-v",MEM=new Map(),TTL=20000;
 const num=t=>{const m=/^\s*([−-]?)\s*(\d+(?:[.,]\d+)?)/.exec(String(t||"").replace(/ /g," "));return m?(m[1]?-1:1)*parseFloat(m[2].replace(",",".")):null};
 const still=()=>{try{return typeof ksfStill==="function"&&ksfStill()}catch(e){return false}};
 const txt=e=>e?e.textContent.replace(/\s+/g," ").trim():"";
 function ckey(c){const h=c.closest(".pc,.kpsc,.kpstats,#modal,.dlg");if(!h)return null;
  const who=txt(h.querySelector(".pcname"))||txt(h.querySelector(".kpidn"))||(h.id||h.className);
  let lab,val;if(c.classList.contains("krt-v")){const l=c.previousElementSibling&&c.previousElementSibling.classList.contains("krt-d")?c.previousElementSibling.previousElementSibling:c.previousElementSibling;lab=txt(l);val=txt(c)}
  else{lab=txt(c.querySelector(".kstl"));val=txt(c.querySelector(".kstv"))}
  return lab?who+"|"+lab:null}
 function scan(root){const L=root.matches&&root.matches(SEL)?[root]:[];if(root.querySelectorAll)root.querySelectorAll(SEL).forEach(x=>L.push(x));
  const now=Date.now();for(const c of L){if((c.id||"").startsWith("hud-")||c.closest("header.hud"))continue;const k=ckey(c);if(!k)continue;
   const v=num(c.classList.contains("krt-v")?c.textContent:txt(c.querySelector(".kstv")));if(v==null)continue;const o=MEM.get(k),n={v,t:now};MEM.set(k,n);
   if(o&&now-o.t<TTL&&o.v!==v){const bad=/oán|ghen|hận|thù|ghét/i.test(k.split("|").pop());/* a rise in grudge / jealousy is a loss for her: colour by meaning */const dv=bad?o.v-v:v-o.v;n.g=dv;n.gt=now;try{if(!still())kitStatGlow(c,dv)}catch(e){}}
   /* the card is often drawn 2-3 times in a row (render + shell): the glow of the first draw must survive into the next one while its pulse is still running */
   else if(o&&o.g&&o.v===v&&now-o.gt<KSF.PULSE){n.g=o.g;n.gt=o.gt;try{if(!still())kitStatGlow(c,o.g)}catch(e){}}}
  if(MEM.size>400)for(const[k,o]of MEM)if(now-o.t>TTL)MEM.delete(k)}
 let pend=new Set(),raf=0;new MutationObserver(ms=>{for(const m of ms)for(const n of m.addedNodes)if(n.nodeType===1)pend.add(n);
  if(document.hidden&&pend.size>300)pend.clear();/* hidden tab: rAF does not run, do not hold detached nodes */
  if(!raf&&pend.size)raf=requestAnimationFrame(()=>{raf=0;const P=[...pend];pend=new Set();for(const n of P)if(n.isConnected)try{scan(n)}catch(e){console.error(e)}})}).observe(document.body,{childList:true,subtree:true});
 window.pcfStatWatch={scan,MEM}})();
/* kit sample (KIT §73) */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§73",title:"Thẻ người: phần bên phải được lấp đầy (tâm trạng, lòng người, sở trọng, đã biết, dạo này)",html:()=>{
 try{if(!S)return"";const v=(typeof rivals!=="undefined"&&rivals[0])||null;if(!v)return"";return `<div class="kitpg-row" style="width:min(100%,520px)">${pcfBlocks(v,{},true)}</div>`}catch(e){return""}}})}catch(e){}
})();
