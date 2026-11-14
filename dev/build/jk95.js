/* ===================================================================================================================
   jk95 — KIT for review/schedules (j95: who is where). Data in, kit look out; every part guarded by typeof so the game runs with or
   without j95. KIT.md §31. Every piece slots into whatever person card / stage exists (no private layout):
   1. Person card "Thói quen": habitsKnown(p) rows (buổi | place · source, N lần; stale ones carry the short kit chip "cũ N tuần", kept on the line).
   2. Map: "hai bóng người" badge on a place with a secret meeting now (j95mapSigns()), anonymous (hữu duyên: never a face, never a name).
   3. Her own card: "Nơi ngươi hay đến" (j95habitsMine()) in the card's facts column, with the watchers as a red kit chip (warning, no ✗),
      only once her eyes and ears have reported it.
   4. Map head count in ONE place: the kit silhouette chip reads "N bóng người"; the place label keeps only "3 khắc" / why it is closed.
   5. Stage: the mistress's scene name tag (j59 writes it: figure strip, compact chips, her own tag) gets a second line "N người theo hầu".
   =================================================================================================================== */
/* the card's facts column (kit 28.7): right column facts, else the right column, else the left one */
function kitFactsCol(pc){return pc.querySelector(":scope > .pcr > .kpfacts")||pc.querySelector(":scope > .pcr")||pc.querySelector(".kpfacts")||pc.querySelector(".pcl")}
/* 1 */
function kitHabitsHTML(p){try{if(typeof habitsKnown!=="function"||!p||p===S)return"";const L=habitsKnown(p)||[];if(!L.length)return"";
 return `<div class="kpsec khab"><h4 class="kpst">Thói quen</h4>`+kitRows(L.map(h=>[h.buoi||"",[h.placeName||h.place,
   `<span class="ef n">${h.by==="mat"||h.by==="spy"?"Tai mắt kể":/nghe/i.test(h.txt||"")?"Nghe nói":"Chính ngươi thấy"}${h.seen>1?` · ${h.seen} lần`:""}</span>`+
   (h.old?" "+kitChip(h.week!=null&&typeof wk==="function"?`cũ ${Math.max(1,wk()-h.week)} tuần`:"tin cũ","n").replace('class="kchip ','class="kchip knw '):"")],"t"]))+`</div>`}catch(e){return""}}
/* 3 */
function kitHabitsMineHTML(){try{if(typeof j95habitsMine!=="function")return"";const L=(j95habitsMine()||[]).filter(x=>x.told!==false);if(!L.length)return"";
 return `<div class="kpsec khab khabme"><h4 class="kpst">Nơi ngươi hay đến</h4>`+kitRows(L.map(x=>[x.buoi||"",[x.placeName||x.place,x.watchers?kitChip(`${x.watchers} kẻ đang rình chỗ này`,"r"):`<span class="ef n">chưa thấy ai rình</span>`],"t"]))+
  `<div class="kpnote">Đi đâu thành lệ thì kẻ thù dễ đón đường: đổi nơi, đổi buổi để tránh.</div></div>`}catch(e){return""}}
(function(){if(typeof kitPcFix!=="function")return;const k0=kitPcFix;kitPcFix=function(pc){const r=k0.apply(this,arguments);try{if(!pc||pc.querySelector(".khab"))return r;const nm=(pc.querySelector(".pcname")||{}).textContent;
  const p=typeof kitPersonByName==="function"?kitPersonByName(nm):null;if(!p)return r;const h=p===S?kitHabitsMineHTML():kitHabitsHTML(p);if(!h)return r;/* in the facts block; with no facts block, in the right column just before the act-group tabs (28.7 order: facts → tabs → act cards) */
  const f=kitFactsCol(pc);if(!f)return r;const tb=f.classList.contains("pcr")?f.querySelector(":scope > .pctabs, :scope > .pcb"):null;if(tb)tb.insertAdjacentHTML("beforebegin",h);else f.insertAdjacentHTML("beforeend",h)}catch(e){}return r}})();
/* 4 */
/* one count per place, in the kit chip only: "N bóng người" next to the silhouettes (j38 silChip / j61 figure chip); the place label keeps only
   the walk ("3 khắc") or the reason it is closed (j27 wrote "N bóng · 3 khắc" there too) */
function kitMapCount(h){try{
 h=h.replace(/<span class="mmeta">\d+ bóng(?: · )?/g,'<span class="mmeta">').replace(/<span class="mmeta"><\/span>/g,"");
 h=h.replace(/<span class="msil([^"]*)" aria-label="(\d+) bóng người[^"]*">([\s\S]*?)<\/span>/g,(all,c,n,inner)=>{inner=inner.replace(/<b>[^<]*<\/b>|<i>[^<]*<\/i>/g,"");
   return `<span class="msil${c}" aria-label="${n} bóng người">${inner}<b class="kmn">${n} bóng người</b></span>`})}catch(e){}return h}
if(typeof mapHTML==="function"){const mh0=mapHTML;mapHTML=function(){return kitMapCount(mh0.apply(this,arguments))}}
/* 2 */
const KIT_PAIR=`<svg viewBox="0 0 16 14" aria-hidden="true"><circle cx="5" cy="3" r="2.3"/><path d="M1.2 14c0-4.2 1.5-6.9 3.8-6.9s3.8 2.7 3.8 6.9z"/><circle cx="10.6" cy="3.3" r="2.3"/><path d="M6.8 14c0-4.1 1.5-6.6 3.8-6.6s3.8 2.5 3.8 6.6z"/></svg>`;
function kitMapSigns(){try{if(typeof j95mapSigns!=="function"||tab!=="go")return;const M=j95mapSigns()||{};document.querySelectorAll(".mspot .kpair").forEach(e=>e.remove());
 for(const k in M){const s=document.querySelector(`.mspot[data-go="${k}"], .mspot[data-ak="${k}"]`);if(!s)continue;const b=document.createElement("span");b.className="kpair";b.title=M[k];b.setAttribute("aria-label",M[k]);b.innerHTML=KIT_PAIR;s.appendChild(b)}}catch(e){}}
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{kitMapSigns()}catch(e){}return r}})();
/* 5 */
function kitFollowers(p){try{if(typeof j95followers==="function")return j95followers(p)||[];return[]}catch(e){return[]}}
/* j59 (closed module) writes each scene name tag (figure strip, compact chips, her own #j59metag) and rewrites it only when its own text
   changes, so the line added here stays; a watcher on the stage adds / updates it whenever j59 writes a tag */
function kitFolTags(){try{if(!S||typeof j95followers!=="function")return;const ppl=typeof curPeople==="function"?curPeople():[];
 const put=(g,o)=>{if(!g||!o)return;const n=kitFollowers(o).length;let f=g.querySelector(":scope > .kfol");const txt=n?`${n} người theo hầu`:"";
  if(!n){if(f)f.remove();return}if(!f){f=document.createElement("span");f.className="kfol";g.appendChild(f)}if(f.textContent!==txt)f.textContent=txt};
 document.querySelectorAll("#tokens .tok").forEach(b=>{const p=ppl[+b.dataset.p];const o=p&&p.ref&&p.ref.rel!=null?p.ref:null;if(o)put(b.querySelector(".tag"),o)});
 const mt=document.querySelector("#j59metag .tag");if(mt)put(mt,S)}catch(e){}}
(function(){let q=0;const run=()=>{q=0;kitFolTags()};const mo=new MutationObserver(()=>{if(!q){q=1;requestAnimationFrame(run)}});
 const hook=()=>{const st=document.getElementById("stage");if(st)mo.observe(st,{childList:true,subtree:true,characterData:true});else setTimeout(hook,500)};hook();
 const r0=render;render=function(){const r=r0.apply(this,arguments);try{kitFolTags()}catch(e){}return r}})();
(function(){const st=document.createElement("style");st.id="kj95";st.textContent=`
.msil b.kmn{white-space:nowrap}
.mspot .kpair{position:absolute;right:2px;top:2px;width:22px;height:19px;padding:2px;border-radius:6px;background:#2a1a12b3;fill:#f2e6d0;box-shadow:0 0 6px #0006;pointer-events:none}
.mspot .kpair svg{width:100%;height:100%;display:block}
.khab .kb{margin-top:2px}.khab .kchip{margin-left:4px}.kchip.knw{white-space:nowrap}
.tok .tag .kfol{display:block;font-size:.72em;line-height:1.15;opacity:.85;font-weight:400}
.stage.j59.j59c .tok .tag .kfol{display:inline;margin-left:.3em}
`;document.head.appendChild(st)})();
