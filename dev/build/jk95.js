/* ===================================================================================================================
   jk95 — KIT for review/schedules (j95: who is where). Data in, kit look out; every part guarded by typeof so the game runs with or
   without j95. KIT.md §29.
   1. Person card "Thói quen": habitsKnown(p) rows (place · buổi · source · "đã lâu, có thể đã đổi").
   2. Map: "hai bóng người" badge on a place with a secret meeting now (j95mapSigns()), anonymous (hữu duyên: never a face, never a name).
   3. Her own card: "Nơi ngươi hay đến" (j95habitsMine()) + how many people watch that spot, only once her eyes and ears have reported it.
   4. Map crowd counts (countAt includes servants following their mistress, up to ~20): ONE compact chip per place — up to 3 silhouettes
      + the number; 6+ reads "đông", 12+ "rất đông".
   5. Stage: a following servant is not drawn as a full figure (the room stays clear); the mistress's name tag gets "· N người theo hầu".
   =================================================================================================================== */
/* 1 */
function kitHabitsHTML(p){try{if(typeof habitsKnown!=="function"||!p||p===S)return"";const L=habitsKnown(p)||[];if(!L.length)return"";
 return `<div class="kpsec khab"><h4 class="kpst">Thói quen</h4>`+kitRows(L.map(h=>[h.buoi||"",[`${h.placeName||h.place}${h.old?" · đã lâu, có thể đã đổi":""}`,`<span class="ef n">${h.by==="mat"||h.by==="spy"?"Tai mắt kể":/nghe/i.test(h.txt||"")?"Nghe nói":"Chính ngươi thấy"}${h.seen>1?` · ${h.seen} lần`:""}</span>`],"t"]))+`</div>`}catch(e){return""}}
(function(){if(typeof kitPcFix!=="function")return;const k0=kitPcFix;kitPcFix=function(pc){const r=k0.apply(this,arguments);try{if(!pc||pc.querySelector(".khab"))return r;const nm=(pc.querySelector(".pcname")||{}).textContent;
  const p=typeof kitPersonByName==="function"?kitPersonByName(nm):null;const h=kitHabitsHTML(p);if(!h)return r;const f=pc.querySelector(".kpfacts")||pc.querySelector(".pcl");if(f)f.insertAdjacentHTML("beforeend",h)}catch(e){}return r}})();
/* 3 */
function kitHabitsMineHTML(){try{if(typeof j95habitsMine!=="function")return"";const L=(j95habitsMine()||[]).filter(x=>x.told!==false);if(!L.length)return"";
 return `<div class="kpsec khab"><h4 class="kpst">Nơi ngươi hay đến</h4>`+kitRows(L.map(x=>[x.buoi||"",[x.placeName||x.place,x.watchers?kitChip(`${x.watchers} kẻ đang rình chỗ này`,"no"):`<span class="ef n">chưa thấy ai rình</span>`],"t"]))+
  `<div class="kpnote">Đi đâu quen một giờ thì kẻ thù dễ đón đường: đổi nơi, đổi buổi để tránh.</div></div>`}catch(e){return""}}
(function(){if(typeof selfCardHTML!=="function")return;const s0=selfCardHTML;selfCardHTML=function(){const h=s0.apply(this,arguments);try{const x=kitHabitsMineHTML();if(x)return h+x}catch(e){}return h}})();
/* 4 */
if(typeof silChip==="function")silChip=function(n){if(!n)return"";const k=Math.min(n,3);const w=n>=12?"rất đông":n>=6?"đông":"";
 return `<span class="msil${w?" kmany":""}" aria-label="${n} bóng người${w?", "+w:""}">${SILH.repeat(k)}${n>1?`<b>${n}</b>`:""}${w?`<i>${w}</i>`:""}</span>`};
/* 2 */
const KIT_PAIR=`<svg viewBox="0 0 16 14" aria-hidden="true"><circle cx="5" cy="3" r="2.3"/><path d="M1.2 14c0-4.2 1.5-6.9 3.8-6.9s3.8 2.7 3.8 6.9z"/><circle cx="10.6" cy="3.3" r="2.3"/><path d="M6.8 14c0-4.1 1.5-6.6 3.8-6.6s3.8 2.5 3.8 6.6z"/></svg>`;
function kitMapSigns(){try{if(typeof j95mapSigns!=="function"||tab!=="go")return;const M=j95mapSigns()||{};document.querySelectorAll(".mspot .kpair").forEach(e=>e.remove());
 for(const k in M){const s=document.querySelector(`.mspot[data-go="${k}"], .mspot[data-ak="${k}"]`);if(!s)continue;const b=document.createElement("span");b.className="kpair";b.title=M[k];b.setAttribute("aria-label",M[k]);b.innerHTML=KIT_PAIR;s.appendChild(b)}}catch(e){}}
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{kitMapSigns()}catch(e){}return r}})();
/* 5 */
function kitFollowers(p){try{if(typeof j95followers==="function")return j95followers(p)||[];const R=S&&S.roster;if(!R||!R.cur)return[];return Object.entries(R.cur).filter(([id,e])=>e&&e.with===p.id).map(([id])=>id)}catch(e){return[]}}
(function(){if(typeof renderStage!=="function")return;const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{const ppl=typeof curPeople==="function"?curPeople():[];
  document.querySelectorAll("#tokens .tok").forEach(b=>{const p=ppl[+b.dataset.p];const t=b.querySelector(".tag");if(!p||!p.ref||!t||t.querySelector(".kfol"))return;const n=kitFollowers(p.ref).length;if(n)t.insertAdjacentHTML("beforeend",`<span class="kfol"> · ${n} người theo hầu</span>`)})}catch(e){}return r}})();
(function(){const st=document.createElement("style");st.id="kj95";st.textContent=`
.msil.kmany i{font-style:normal;font-size:.62rem;margin-left:3px;color:#fff8e8;font-weight:600;text-shadow:0 1px 2px #000a}
.mspot .kpair{position:absolute;right:2px;top:2px;width:22px;height:19px;padding:2px;border-radius:6px;background:#2a1a12b3;fill:#f2e6d0;box-shadow:0 0 6px #0006;pointer-events:none}
.mspot .kpair svg{width:100%;height:100%;display:block}
.khab .kb{margin-top:2px}
.tok .tag .kfol{font-size:.85em;color:var(--dim)}
`;document.head.appendChild(st)})();
