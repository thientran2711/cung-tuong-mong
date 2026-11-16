/* ================= j93 KIT MOTION: chuyển động dùng chung (game feel), kit owner motion 11/14 =================
   One shared set of motion pieces (KIT.md section "Chuyển động"); every caller only passes data.
   Rules for every piece: 0.3–2 s, a tap skips to the final state (a second tap / the button closes), prefers-reduced-motion
   or "Cảnh động" off shows the final state at once, transform/opacity only, never covers the game longer than the moment.
   Big moments go through ONE queue (kmPush) and wait while the week panel (dawn), the podium or the roulette is open.
   API:
     kmReduced()                         -> true when motion must be skipped
     kmPush(fn(done))                    -> queue a big moment; fn calls done() when closed
     kmStage(cls, html, o)               -> overlay stage {ov, later, finish, close}; o={dur, hold, manual, onFinal, onEnd, hint}
     kitFlipTablet(p, o)                 -> 1 thị tẩm: green tablets, one lifts and flips in 3D, its face shows the name (o.me)
     kitXamPlay(el, lot)                 -> 2 quẻ tuần: tube shakes, one stick drops out, the lot word pops (inline, in el)
     kitResultFx(card)                   -> 3 result card: Thành/Bại seal stamped, numbers float up, bars run to the new value
     kitEdict(o)                         -> 4 thăng phẩm: edict scroll unrolls, frame changes rank with a light sweep, chip pops
     kitGloom(o)                         -> 4b giáng phẩm / lãnh cung: screen darkens, dry leaves fall
     kitDayShift() / kitCalendar(el,o)   -> 5 qua buổi (incense + sky) / qua tuần (calendar page flips)
     kitBloom(o) / kitInk(o)             -> 6 có thai, sinh con (peony blooms) / chết (ink spreads, then Sổ luân hồi)
     kitReward(o)                        -> 7 ban thưởng / quà: tray, chest, golden chest or gift box; tap to open, items arc out by grade
     kitFlyItem(k)                       -> 7b bought item flies to the Tư trang tab
     kitAlarm()                          -> danger edge pulse (red), kitNews() -> news ribbon chime
     kitWxChip()                         -> 9 weather chip (painted icon) in the status row, tap = the weather's real effects
*/
const KM_DIR="img/kit/";
function kmReduced(){try{return matchMedia("(prefers-reduced-motion: reduce)").matches||(typeof OPT!=="undefined"&&OPT.fxon===false)}catch(e){return false}}
function kmOn(){return typeof S!=="undefined"&&S&&!window.__bot&&!(typeof quiet!=="undefined"&&quiet)}
function kmEsc(s){return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}

/* ---------- queue: one big moment at a time, after blocking screens ---------- */
const KMQ=[];let kmBusy=false;
function kmFree(){const d=document.getElementById("dawn");if(d&&!d.hidden&&d.classList.contains("on"))return false;
 if(document.getElementById("kpodov")||document.querySelector('[id^="kroul"],.kroul-ov'))return false;if(document.getElementById("kmrew"))return false;return true}
function kmPush(fn){KMQ.push(fn);kmPump()}
/* kmReset (FIX-THE-WHOLE-GROUP, review/flip-newlife): everything that belongs to ONE life must not outlive it. A new life / a loaded slot / the title
   screen calls this: the queue is emptied, the running job's finish is voided (kmGen), every .kmov scene (card-flip, ink, reward, reveal…) and the
   podium / reward / buổi-transition overlays are removed, and modules that keep their own timers register a hook with kmOnReset(fn). */
let kmGen=0;const KMR=[];function kmOnReset(f){KMR.push(f)}
function kmReset(){kmGen++;KMQ.length=0;kmBusy=false;clearTimeout(kmPump.t);
 KMR.forEach(f=>{try{f()}catch(e){console.error(e)}});
 try{if(typeof kitPodiumClose==="function")kitPodiumClose(true)}catch(e){}
 try{if(typeof btrKill==="function")btrKill()}catch(e){}
 try{document.querySelectorAll(".kmov,#kmrew,.kmfly,.kmalarm").forEach(e=>e.remove())}catch(e){}}
function kmPump(){if(kmBusy||!KMQ.length)return;if(!kmFree()){clearTimeout(kmPump.t);kmPump.t=setTimeout(kmPump,250);return}
 kmBusy=true;const fn=KMQ.shift();let done=false;const g=kmGen;const fin=()=>{if(done||g!==kmGen)return;done=true;clearTimeout(sf);kmBusy=false;setTimeout(kmPump,80)};const sf=setTimeout(fin,600000);
 try{fn(fin)}catch(e){console.error(e);fin()}}

/* ---------- KIT 81 · SCENE-END BUTTON label (owner OD:L1261) ----------
   kitSceneEndLabel(cls, o): o.end (the caller's own words, e.g. "Chuẩn bị thị tẩm" when the card flip lands on HER) wins; else the scene class decides;
   else "Tiếp theo". Words are short and fit the event (never "OK"); VANPHONG register. */
const KM_END={"km-edict":"Đã hiểu","km-gloom":"Đã hiểu","km-bloom":"Tiếp theo","km-inkov":"Tiếp theo","km-tablet":"Tiếp theo","km-soft":"Ta biết rồi"};
function kitSceneEndLabel(cls,o){if(o&&o.end)return String(o.end);for(const k in KM_END)if(new RegExp("(^|\\s)"+k+"(\\s|$)").test(cls||""))return KM_END[k];return "Tiếp theo"}
window.kitSceneEndLabel=kitSceneEndLabel;
/* kitSceneFit(ov): a scene taller than the room left above the button (short landscape, 844x390) is scaled down (CSS zoom on .kmst, never below .55) so nothing
   runs under the button; room = overlay height minus the button row (css .km-endon padding). Runs when the button appears and on resize. */
function kitSceneFit(ov){try{const st=ov&&ov.querySelector(".kmst");if(!st)return;st.style.zoom="";const cs=getComputedStyle(ov);const avail=ov.clientHeight-(parseFloat(cs.paddingBottom)||0)-(parseFloat(cs.paddingTop)||0);
 const els=[...st.children].flatMap(c=>[c,...c.children]).filter(e=>!/kmdark|kmleaves|kmglow|kmfls|kmleaf/.test(e.className||"")&&e.getBoundingClientRect().width>0);
 const h=els.length?Math.max(...els.map(e=>e.getBoundingClientRect().bottom))-Math.min(...els.map(e=>e.getBoundingClientRect().top)):st.scrollHeight;if(avail>0&&h>avail+2)st.style.zoom=String(Math.max(.55,Math.floor(avail/h*100)/100))}catch(e){}}
window.kitSceneFit=kitSceneFit;addEventListener("resize",()=>document.querySelectorAll(".kmov.km-endon").forEach(kitSceneFit));
/* kitSceneEnd(ov, label, onClick): the ONE button that ends an animation scene (also for scenes NOT built on kmStage: card flip jflip, toil reveal jtoil, …).
   Appends `.kbtn.kmend` to the overlay `ov` (removes the "Chạm để …" hint), returns the button; onClick (optional) closes the scene. Calling it twice = one button. */
function kitSceneEnd(ov,label,onClick){if(!ov)return null;ov.querySelectorAll(".kmhint").forEach(h=>h.remove());let b=ov.querySelector(":scope > .kmend");
 if(!b){b=document.createElement("button");b.type="button";b.className="kbtn kmend";ov.appendChild(b)}ov.classList.add("km-endon");kitSceneFit(ov);b.textContent=label||"Tiếp theo";if(onClick)b.onclick=e=>{e.stopPropagation();onClick()};return b}
window.kitSceneEnd=kitSceneEnd;

/* ---------- stage overlay ---------- */
function kmStage(cls,html,o){o=o||{};const red=kmReduced();const ov=document.createElement("div");ov.className="kmov "+cls+(red?" km-red km-skip":"");
 ov.setAttribute("role","dialog");ov.innerHTML=`<div class="kmst">${html}</div>${o.manual?"":`<div class="kmhint">${o.hint||"Chạm để bỏ qua"}</div>`}`;document.body.appendChild(ov);
 let phase=0;const T=[];const later=(ms,f)=>{T.push(setTimeout(()=>{try{f()}catch(e){console.error(e)}},ms))};
 const close=()=>{if(phase===2)return;phase=2;T.forEach(clearTimeout);ov.classList.add("km-out");setTimeout(()=>ov.remove(),240);try{o.onEnd&&o.onEnd()}catch(e){console.error(e)}};
 /* KIT 81 SCENE-END BUTTON (owner OD:L1261): a scene never closes by itself. When its animation has played (or was skipped by a tap) the hint is replaced by ONE kit
    button (.kbtn.kmend) whose words fit the event (kitSceneEndLabel); only that button closes the scene. manual scenes carry their own button (Nhận, Chọn…). */
 const finish=()=>{if(phase>0)return;phase=1;T.forEach(clearTimeout);T.length=0;ov.classList.add("km-skip");try{o.onFinal&&o.onFinal()}catch(e){console.error(e)}
  if(!o.manual){const b=kitSceneEnd(ov,kitSceneEndLabel(cls,o));if(b)b.setAttribute("data-km-close","")}};
 ov.addEventListener("click",e=>{e.stopPropagation();if(e.target.closest("[data-km-close]")){close();return}if(o.manual)return;if(phase===0)finish()});
 if(red)setTimeout(finish,0);else if(!o.manual)later(o.dur||1600,finish);
 return{ov,later,finish,close,get phase(){return phase}}}
/* small sparkle burst at (x,y): PAINTED sparks of KIT §68 (kitFxBurst "spark"; a gold burst of 26+ adds gold-leaf petals). Owner 15/11 20:55Z /
   21:00Z: effects are painted (Magnific), code only moves them — the old code-drawn coloured dots are gone. root / cols / spread kept for the
   callers' signature; Gọn / reduced motion / no fxkit = nothing (kitFxBurst's own switches). */
function kmSpark(root,x,y,n,cols,spread){if(kmReduced()||typeof kitFxBurst!=="function")return;const at={x,y};const sc=Math.max(.7,Math.min(1.3,(spread||140)/140));
 try{kitFxBurst("spark",at,Math.max(6,Math.round(n*.6)),{scale:sc});if(n>=26&&cols&&/f0d070|e0a526/i.test(cols.join(",")))kitFxBurst("petal-gold",at,Math.round(n/3),{motion:"burst",scale:sc})}catch(e){}}
function kmFace(p,size){try{return typeof kitFaceH==="function"?kitFaceH(p,size||"big"):mdH(pv(p),size||"big")}catch(e){return""}}
function kmRankName(r){return r>=7?"Hoàng hậu":RANKS[Math.max(0,r)].n}

/* ================= 1 LẬT THẺ (thị tẩm) ================= */
function kitFlipTablet(p,o){o=o||{};if(!p)return;const me=p===S||o.me;const nm=p===S?S.name:p.name||"";const rk=kmRankName(p===S?S.rank:typeof rkOf==="function"?rkOf(p):0);
 const words=String(nm).split(/\s+/).map(w=>`<span>${kmEsc(w)}</span>`).join("");
 const back=`<img src="${KM_DIR}mo-tablet-back.webp" alt="" draggable="false">`;
 const side=n=>`<div class="kmtab kmtab-s" style="--i:${n}">${back}</div>`;
 const html=`<div class="kmflip${me?" kmflip-me":""}"><div class="kmcap">Hoàng thượng lật thẻ bài</div><div class="kmtabs">${side(-2)}${side(-1)}<div class="kmtab kmtab-c"><div class="kmcard"><div class="kmface kmback">${back}</div><div class="kmface kmfront"><img src="${KM_DIR}mo-tablet-front.webp" alt="" draggable="false"><div class="kmname"><small>${kmEsc(rk)}</small>${words}</div></div></div></div>${side(1)}${side(2)}</div>
  <div class="kmres">${kmFace(p,"big")}<div><b>${me?"Thẻ bài của ngươi được lật":"Tối nay: "+kmEsc(nm)}</b><small>${me?"Tối nay ngươi hầu giá.":`${kmEsc(rk)} được chọn hầu đêm nay.`}</small></div></div></div>`;
 kmPush(done=>{const st=kmStage("km-tablet"+(me?"":" km-soft"),html,{dur:1900,end:me?"Chuẩn bị thị tẩm":"Ta biết rồi",onEnd:done,onFinal:()=>{}});
  if(me)st.later(1250,()=>{const c=st.ov.querySelector(".kmtab-c");if(c){const r=c.getBoundingClientRect();kmSpark(st.ov,r.left+r.width/2,r.top+r.height*.4,26,["#f0d070","#fff3c4","#e0a526"],170)}})})}

/* someone else's tablet: one short line under the top bar (kit chip), no backdrop, never takes a tap, fades by itself */
function kitFlipNote(p){if(!p||p===S)return;const nm=p.name||"";const rk=kmRankName(typeof rkOf==="function"?rkOf(p):0);
 kmPush(done=>{document.querySelectorAll(".kmnote").forEach(e=>e.remove());const n=document.createElement("div");n.className="kmnote";n.setAttribute("role","status");
  let face="";try{face=mdH(pv(p),"xs")}catch(e){}
  n.innerHTML=`<span class="kchip n">${face}<span>Tối nay Hoàng thượng lật thẻ <b>${kmEsc(rk)} ${kmEsc(nm)}</b></span></span>`;
  const hb=document.getElementById("hud2")||document.querySelector(".hud,header");const hr=hb&&hb.getBoundingClientRect();if(hr&&hr.bottom>0&&hr.bottom<innerHeight*.4)n.style.top=Math.round(hr.bottom+6)+"px";
  document.body.appendChild(n);setTimeout(()=>{n.classList.add("km-out");setTimeout(()=>n.remove(),300)},kmReduced()?3200:2800);done()})}
window.kitFlipNote=kitFlipNote;

/* ================= 2 QUẺ TUẦN ================= */
function kitXamHTML(lot){const w=LV[lot.lv]||"",good=LVB[lot.lv]>0,bad=LVB[lot.lv]<0||(lot.dom==="Hung"&&lot.lv>=3);
 return `<div class="kmxam${kmReduced()?" km-skip":""}" aria-label="Gieo quẻ"><div class="kmxt"><img class="kmtube" src="${KM_DIR}mo-xam-tube.webp" alt="" draggable="false"><img class="kmstick" src="${KM_DIR}mo-xam-stick.webp" alt="" draggable="false"></div><div class="kmlot ${bad?"r":good?"g":"n"}"><small>Quẻ</small><b>${kmEsc(w)}</b><small>${kmEsc(lot.dom||"")}</small></div></div>`}
function kitXamPlay(el,lot){if(!el||!lot)return null;const d=document.createElement("div");d.innerHTML=kitXamHTML(lot);const x=d.firstElementChild;el.prepend(x);
 x.addEventListener("click",e=>{e.stopPropagation();x.classList.add("km-skip")});return x}

/* ================= 3 KẾT QUẢ HÀNH ĐỘNG ================= */
const KM_BAR=/^(Sủng|Danh|Sức|Đức|Sắc|Tài|Tâm cơ|Tai mắt|Lòng|Thái hậu|Hoàng hậu|Ân tình|Thiện cảm|Tin|Ghen|Oán)/;
function kitResultFx(card){if(!card)return;const red=kmReduced();const ok=card.classList.contains("ok");
 /* owner 11/15: no roll → no seal stamp (neutral "KẾT QUẢ" card) */
 if(!ok&&!card.classList.contains("bad")){card.querySelectorAll(".kmseal").forEach(e=>e.remove());return}
 card.querySelectorAll(".kmseal,.kmfl").forEach(e=>e.remove());
 const seal=document.createElement("img");seal.className="kmseal"+(red?" km-skip":"");seal.src=KM_DIR+(ok?"mo-seal-thanh.webp":"mo-seal-bai.webp");seal.alt=ok?"Thành":"Bại";card.appendChild(seal);
 if(!red){card.classList.remove("km-thump");void card.offsetWidth;card.classList.add("km-thump")}
 /* bars: each changed stat that lives on a 0–100 scale runs from the old to the new value */
 card.querySelectorAll(".kitem").forEach(it=>{const t=it.textContent;const m=t.match(/(-?\d+)\s*→\s*(-?\d+)/);if(!m||it.querySelector(".kmbar"))return;const lab=t.replace(/^.*?:\s*/,"");if(!KM_BAR.test(lab.trim())&&!KM_BAR.test(t.trim()))return;
  const a=Math.max(0,Math.min(100,+m[1])),b=Math.max(0,Math.min(100,+m[2]));const bar=document.createElement("i");bar.className="kmbar "+(b>=a?"up":"down");
  bar.innerHTML=`<b style="width:${red?b:a}%"></b>`;it.appendChild(bar);if(!red)requestAnimationFrame(()=>requestAnimationFrame(()=>{const f=bar.firstElementChild;if(f)f.style.width=b+"%"}))});
 /* floating numbers (green +, red −) rise from the card */
 if(red)return;const r=card.getBoundingClientRect();const L=[];card.querySelectorAll(".kr-duoc .ef.g,.kr-mat .ef.r").forEach(s=>{const t=s.textContent;const m=t.match(/^(.*?)\s+(-?\d+)→(-?\d+)/);if(m){const d=+m[3]-+m[2];if(d)L.push([m[1].trim(),d])}});
 if(!L.length)return;document.querySelectorAll(".kmfls").forEach(e=>e.remove());const box=document.createElement("div");box.className="kmfls";box.style.left=Math.round(r.left+r.width/2)+"px";box.style.top=Math.round(r.top-34)+"px";box.style.maxWidth=Math.round(Math.min(innerWidth-16,Math.max(r.width,260)))+"px";
 L.slice(0,6).forEach(([n,d],i)=>{const f=document.createElement("span");f.className="kmfl "+(d>0?"g":"r");f.textContent=`${n} ${d>0?"+":"−"}${Math.abs(d)}`;f.style.animationDelay=(.25+i*.12)+"s";box.appendChild(f)});document.body.appendChild(box);setTimeout(()=>box.remove(),2400)}

/* ================= 4 THĂNG PHẨM / GIÁNG PHẨM ================= */
function kmFrameSwap(p,from,to){let h=kmFace(p,"big");const re=/(frame|bg)-consort-(\d)/g;const old=from<0?h.replace(/frame-consort-\d/g,"frame-maid-1").replace(/bg-consort-\d/g,"bg-maid"):h.replace(re,(m,a)=>`${a}-consort-${Math.max(0,Math.min(7,from))}`);
 return `<div class="kmfr"><div class="kmfr-new">${h}</div><div class="kmfr-old">${old}</div></div>`}
function kitEdict(o){o=o||{};const p=o.who||S,to=o.to!=null?o.to:S.rank,from=o.from!=null?o.from:Math.max(0,to-1);const nm=p===S?S.name:p.name;const col=(typeof kitRankCol==="function"?kitRankCol(to):(window.RCOL||[])[to])||"#c9952a";
 const line=to>=7?`Lập ${kmEsc(nm)} làm Hoàng hậu, chủ lục cung.`:`Tấn phong ${kmEsc(nm)} làm ${kmRankName(to)}.`;
 const html=`<div class="kmedict" style="--rc:${col}"><div class="kmscroll"><img class="kmsc-c" src="${KM_DIR}mo-edict-closed.webp" alt="" draggable="false"><div class="kmsc-o"><img src="${KM_DIR}mo-edict-open.webp" alt="" draggable="false"><div class="kmsc-t"><b>Thánh chỉ</b><span>${line}</span><small>Khâm thử</small></div></div></div>
  <div class="kmpromo">${kmFrameSwap(p,from,to)}<div class="kmchip-row"><span class="kmchip kmchip-old">${from<0?"Cung nữ":kmRankName(from)}</span><span class="kmarrow">→</span><span class="kmchip kmchip-new">${kmRankName(to)}</span></div></div></div>`;
 kmPush(done=>{const st=kmStage("km-edict",html,{dur:2000,hold:2200,onEnd:done});
  /* §66.1 the light gold glow on the new frame = KIT §68 painted art: the gold glow still (kitFxBurst "glowburst") + the painted gold light clip (screen blend on the dark stage) */
  st.later(1450,()=>{try{const f=st.ov.querySelector(".kmpromo .kmfr");if(!f)return;if(typeof kitFxBurst==="function")kitFxBurst("glowburst",f,1,{scale:.8,a0:.85});
   if(typeof kitFxLight==="function")kitFxLight("glow-gold",f,{dur:1900,fade:600,scale:1.5,opacity:.85})}catch(e){}});
  st.later(1500,()=>{const c=st.ov.querySelector(".kmchip-new");if(c){const r=c.getBoundingClientRect();kmSpark(st.ov,r.left+r.width/2,r.top+r.height/2,30,["#f0d070","#fff3c4",col],150)}})})}
/* KIT §66.2 (owner 15/11 20:05Z #13): demotion / cold palace — her portrait shows in the OLD rank frame, the frame fades to grey (demotion:
   it changes to the lower rank's frame, greyed), the old rank chip CRACKS and its two halves fall; the new chip (lower rank / «Lãnh cung»)
   comes up dim. o = {title, sub, who, from, to}: to = null / -2 → cold palace. Without from (old callers) only the darkness and leaves. */
function kmRankDownHTML(p,from,to){if(from==null||from<0)return"";const cold=to==null||to<-1;const h=kmFace(p,"big");const re=/(frame|bg)-consort-(\d)/g;
 const old=h.replace(re,(m,a)=>`${a}-consort-${Math.max(0,Math.min(7,from))}`);const nw=cold?old:h.replace(re,(m,a)=>`${a}-consort-${Math.max(0,Math.min(7,to))}`);
 const nm=kmRankName(from),nn=cold?"Lãnh cung":kmRankName(to);
 return `<div class="kmdown${cold?" kmdown-cold":""}"><div class="kmfr kmfr-grey"><div class="kmfr-new">${nw}</div><div class="kmfr-old">${old}</div></div>
  <div class="kmchip-row"><span class="kmcrack"><span class="kmchip kmck-t">${kmEsc(nm)}</span><span class="kmchip kmck kmck-a" aria-hidden="true">${kmEsc(nm)}</span><span class="kmchip kmck kmck-b" aria-hidden="true">${kmEsc(nm)}</span></span><span class="kmchip kmchip-down">${kmEsc(nn)}</span></div></div>`}
function kitGloom(o){o=o||{};const leaves=Array.from({length:14},(_,i)=>`<img class="kmleaf" src="${KM_DIR}mo-leaf-dry.webp" alt="" style="--x:${(i*53)%100}%;--d:${(i%7)*.16}s;--s:${.55+((i*37)%50)/100};--r:${(i*71)%360}deg;--w:${((i%5)-2)*18}px">`).join("");
 let rd="";try{rd=kmRankDownHTML(o.who||S,o.from,o.to)}catch(e){rd=""}
 const html=`<div class="kmgloom"><div class="kmdark"></div><div class="kmleaves">${leaves}</div><div class="kmgbox">${rd}<div class="kmgcap"><b>${kmEsc(o.title||"Bị giáng phẩm")}</b>${o.sub?`<small>${kmEsc(o.sub)}</small>`:""}</div></div></div>`;
 kmPush(done=>{const st=kmStage("km-gloom",html,{dur:rd?2600:2000,hold:1500,onEnd:done});
  if(rd)st.later(1250,()=>{try{const c=st.ov.querySelector(".kmcrack");if(c&&typeof kitFxBurst==="function")kitFxBurst("jade",c,8,{scale:.8})}catch(e){}})})}

/* ================= 5 QUA BUỔI / QUA TUẦN ================= */
function kitDayShift(){const c=document.getElementById("curtain");if(!c||kmReduced())return;if(c.querySelector(".kminc"))return;
 const d=document.createElement("i");d.className="kminc";d.innerHTML=`<img src="${KM_DIR}mo-incense.webp" alt="" draggable="false"><i class="kmember"></i><i class="kmsmoke s1"></i><i class="kmsmoke s2"></i>`;
 const sp=c.querySelector("span");(sp||c).prepend(d);const sky=document.createElement("i");sky.className="kmsky b"+((S&&S.buoi)||0);c.prepend(sky)}
function kitCalendar(el,o){if(!el)return null;o=o||{};const d=document.createElement("div");d.className="kmcal"+(kmReduced()?" km-skip":"");
 d.innerHTML=`<div class="kmcal-b"><img src="${KM_DIR}mo-calendar.webp" alt="" draggable="false"><div class="kmcal-p kmcal-new"><b>${kmEsc(o.to||"")}</b><small>${kmEsc(o.toSub||"")}</small></div><div class="kmcal-p kmcal-old"><b>${kmEsc(o.from||"")}</b><small>${kmEsc(o.fromSub||"")}</small></div></div>`;
 el.appendChild(d);return d}

/* ================= 6 CÓ THAI / SINH CON / CHẾT ================= */
function kitBloom(o){o=o||{};const pet=Array.from({length:12},(_,i)=>`<img class="kmpet" src="${KM_DIR}mo-petal-peach.webp" alt="" style="--a:${i*30}deg;--d:${.55+(i%4)*.08}s;--v:${110+(i*29)%80}px">`).join("");
 const html=`<div class="kmbloom"><div class="kmglow"></div><img class="kmpeony" src="${KM_DIR}mo-peony.webp" alt="" draggable="false">${pet}<div class="kmbcap"><b>${kmEsc(o.title||"")}</b>${o.sub?`<small>${kmEsc(o.sub)}</small>`:""}</div></div>`;
 kmPush(done=>kmStage("km-bloom",html,{dur:1800,hold:1600,onEnd:done}))}
function kitInk(o){o=o||{};const html=`<div class="kmink"><img class="kmblot b1" src="${KM_DIR}mo-ink.webp" alt="" draggable="false"><img class="kmblot b2" src="${KM_DIR}mo-ink.webp" alt="" draggable="false"><div class="kmicap"><b>${kmEsc(o.title||"Hồng nhan bạc mệnh")}</b><small>Mở Sổ luân hồi</small></div></div>`;
 /* death jumps the queue: nothing else matters now */
 KMQ.length=0;kmPush(done=>kmStage("km-inkov",html,{dur:2000,hold:900,onEnd:done}))}

/* ================= 7 BAN THƯỞNG / QUÀ ================= */
/* grades = KIT_GRADE (jk2b) everywhere: the tier of a reward item is its REAL grade (kitItemInfo, the same as the Tư trang bag), never a price guess */
function kmTierOf(k,royal){try{if(typeof kitItemInfo==="function")return kitItemInfo(k).grade}catch(e){}return 0}
function kmItemImg(k){try{if(typeof kitItemInfo==="function"){const s=kitItemInfo(k).src;if(s)return s}}catch(e){}try{if(typeof ITIMG==="object"&&ITIMG[k])return `img/item-${ITIMG[k]}.webp`}catch(e){}return ""}
const KM_BOX={tray:["mo-tray","mo-tray-open","Mâm thưởng"],chest:["mo-chest","mo-chest-open","Rương bảo vật"],royal:["mo-chestg","mo-chestg-open","Rương ngự tứ"],gift:["mo-giftbox","mo-giftbox-open","Hộp gấm"],pouch:["mo-pouch","mo-pouch-open","Bọc vải"]};
/* kitReward({kind, title, from, items:[{n, d, img, tier 0..4, gn}], bac}) — tap the box: it rattles and opens, a pause, then EACH item rises out
   of it one by one into the spotlight (KIT §54.1 kitRevealHTML: the kit graded frame kitItem "xl", name, grade chip), stays ~1.3 s glowing in its
   grade colour, and settles on the shelf under the box; the silver comes last; then the list (grade chip · name · note) + Nhận.
   Tap during the reveal = skip to the end. Timings BAL.reveal (jbal2). Items arrive lowest grade first, the best one last. */
function kitReward(o){o=o||{};const kind=KM_BOX[o.kind]?o.kind:"chest";const B=KM_BOX[kind];const RV=(typeof BAL==="object"&&BAL.reveal)||{};
 const KG=typeof KIT_GRADE!=="undefined"?KIT_GRADE:[{n:"Thường",c:"#9a8a78"}];const gOf=t=>Math.max(0,Math.min(4,t|0));
 const items=(o.items||[]).map(x=>Object.assign({tier:0},x)).sort((a,b)=>a.tier-b.tier);const coins=o.bac||0;
 const seq=items.map(x=>({n:x.n,d:x.d,img:x.img,g:gOf(x.tier),gn:x.gn||"",k:x.k&&typeof kitItemRef==="function"&&kitItemRef({k:x.k})?x.k:""}));
 /* KIT §70: an item of the box (not the silver) is tappable: kitItemCard with the shared item detail */
 const kt=x=>x.k?` data-kid="${kmEsc(x.k)}" role="button" tabindex="0"`:"";if(coins)seq.push({n:`Bạc +${coins}`,img:`${KM_DIR}mo-ingot-silver.webp`,g:0,gn:"Bạc",coin:1});
 const info=x=>({name:x.n,src:x.img,src512:x.img,grade:x.g,gname:x.gn||KG[x.g].n,col:x.coin?"#c9a46a":KG[x.g].c,sub:""});
 const tile=(x,i)=>`<span class="kmsh" style="--i:${i}"${kt(x)}>${kitItem({src:x.img,name:"",grade:x.g,size:"sm",tip:x.n}).replace('<span class="kitn"></span>','')}</span>`;
 const rows=seq.map(x=>`<div class="kmrow"${kt(x)}>${typeof kitGradeChip==="function"?kitGradeChip(x.g,{name:x.gn,size:"sm",col:x.coin?"#c9a46a":""}):""}<b${x.coin?' class="g"':""}>${kmEsc(x.n)}</b>${x.d?`<small>${kmEsc(x.d)}</small>`:""}</div>`).join("");
 const html=`<div class="kmrew kmrew-${kind}${seq.length>6?" km-long":""}"><div class="kmrew-h"><b>${kmEsc(o.title||B[2])}</b>${o.from?`<small>${kmEsc(o.from)}</small>`:""}</div>
  <div class="kmbox"><i class="kmlight km-loop"></i><img class="kmbox-c km-loop" src="${KM_DIR}${B[0]}.webp" alt="" draggable="false"><img class="kmbox-o" src="${KM_DIR}${B[1]}.webp" alt="" draggable="false"><i class="kmlight kmlight-f km-loop"></i><div class="kmcoins">${coins?Array.from({length:Math.min(9,3+Math.round(coins/10))},(_,i)=>`<img src="${KM_DIR}mo-coin-silver.webp" alt="" style="--i:${i}">`).join(""):""}</div><div class="kmspot" style="--kshelf:${RV.shelf||380}ms"></div></div>
  <div class="kmshelf"></div><div class="kmtap km-loop">Chạm để mở</div><div class="kmlist">${rows}<button class="kbtn kmtake" data-km-close>Nhận</button></div></div>`;
 kmPush(done=>{const st=kmStage("km-reward",html,{manual:true,dur:60000,onEnd:done});const root=st.ov.querySelector(".kmrew");st.ov.id="kmrew";let step=0;
  const spot=root.querySelector(".kmspot"),shelf=root.querySelector(".kmshelf");const T=[];const later=(ms,f)=>T.push(setTimeout(()=>{try{f()}catch(e){console.error(e)}},ms));
  const fin=()=>{T.forEach(clearTimeout);T.length=0;step=2;spot.innerHTML="";shelf.innerHTML=seq.map(tile).join("");root.classList.add("km-done","km-fast");try{window.__kmRev=(window.__kmRev||0)+1}catch(e){}};
  const one=i=>{if(step!==1)return;if(i>=seq.length){later(RV.list||350,()=>{step=2;root.classList.add("km-done");try{window.__kmRev=(window.__kmRev||0)+1}catch(e){}});return}
   const x=seq[i];spot.innerHTML=kitRevealHTML(info(x),{noSub:true});root.dataset.kmi=String(i);
   try{if(typeof kitSfx==="function")kitSfx(x.coin?"coinBounce":x.g>=3?"itemRare":"itemPop",{rate:1+Math.min(i,5)*.05});else if(typeof sfx==="function")sfx(x.coin?"sfx-coin":"sfx-open")}catch(e){}
   if(x.g>=2){const r=spot.getBoundingClientRect();later((RV.rise||550)*.7,()=>kmSpark(st.ov,r.left+r.width/2,r.top+r.height*.4,x.g>=4?34:x.g>=3?26:16,x.g>=4?["#f0d070","#fff3c4","#e0a526"]:["#fff3c4",KG[x.g].c,"#f6ead6"],x.g>=3?170:130))}
   later((RV.rise||550)+(RV.hold||1300),()=>{const p=spot.firstElementChild;if(p)p.classList.add("krev-out");
    later(RV.shelf||380,()=>{spot.innerHTML="";shelf.insertAdjacentHTML("beforeend",tile(x,i));one(i+1)})})};
  const open=()=>{if(step)return;step=1;if(kmReduced()){root.classList.add("km-open");fin();return}root.classList.add("km-shake");
   later(RV.shake||420,()=>{root.classList.remove("km-shake");root.classList.add("km-open");
    const b=root.querySelector(".kmbox").getBoundingClientRect();const best=seq.length?Math.max(...seq.map(x=>x.g)):0;kmSpark(st.ov,b.left+b.width/2,b.top+b.height*.45,best>=4?40:24,best>=4?["#f0d070","#fff3c4","#e0a526"]:["#fff3c4","#f6ead6","#e0c080"],best>=3?190:140);
    later(RV.pause||700,()=>one(0))})};
  st.ov.addEventListener("click",e=>{if(e.target.closest("[data-km-close]")){T.forEach(clearTimeout);return}if(step===0)open();else if(step===1)fin()},true);
  if(kmReduced())open()})}
function kitFlyItem(k){if(kmReduced()||!k)return;const src=kmItemImg(k);const tb=document.querySelector('[data-tab="inv"]');if(!src||!tb)return;const r=tb.getBoundingClientRect();
 const im=document.createElement("img");im.className="kmfly";im.src=src;im.alt="";const x0=innerWidth/2,y0=innerHeight*.45;im.style.left=x0+"px";im.style.top=y0+"px";document.body.appendChild(im);
 im.animate([{transform:"translate(-50%,-50%) scale(.4)",opacity:0},{transform:"translate(-50%,-80%) scale(1.15)",opacity:1,offset:.3},{transform:`translate(${r.left+r.width/2-x0-24}px,${r.top+r.height/2-y0-24}px) scale(.35)`,opacity:.2}],{duration:900,easing:"cubic-bezier(.4,.1,.3,1)",fill:"forwards"}).onfinish=()=>{im.remove();tb.classList.remove("km-pulse");void tb.offsetWidth;tb.classList.add("km-pulse")}}

/* ================= extra conventions: danger pulse, news chime ================= */
function kitAlarm(){if(kmReduced())return;const d=document.createElement("div");d.className="kmalarm";document.body.appendChild(d);setTimeout(()=>d.remove(),1700)}

/* ================= 9 THỜI TIẾT: chip + real effects ================= */
const KM_WX={"hoa đào bay":"hoadao","mưa phùn":"muaphun","sương sớm":"suongsom","trời quang":"troiquang","nắng gắt":"nanggat","ve kêu râm ran":"vekeu","giông tố":"giong","đom đóm":"domdom",
 "lá phong rơi":"laphong","nắng vàng":"nangvang","gió heo may":"gioheomay","trăng rằm":"trangram","tuyết nhẹ":"tuyetnhe","tuyết dày":"tuyetday","sương giá":"suonggia","mai nở trong tuyết":"maino"};
/* exactly what the code does with the weather (j3 endTurn, j80 sleepRegen, j9 placeWhere/travel, j8 contest, j12 rollWx) */
function kitWxEffects(w){w=w||(S&&S.wx);if(!w)return[];const L=[];const f=w.f;
 if([1,3,4].includes(f)){L.push(["r","Đi đến nơi xa tốn 3 khắc (ngày thường 2)."]);L.push(["n","Hoàng thượng không ra Ngự hoa viên, ngồi ở thư phòng; ít người dạo vườn (chừng một phần tư ngày thường)."]);L.push(["n","Thi Sắc, thi tài ngoài trời may rủi hơn; thi Sắc ngày ướt thì người giỏi múa kém thế."])}
 if(f===2||f===4){L.push(["r","Hồi Sức chậm: qua tuần +1 (ngày thường +4), ngủ +8 (ngày thường +14)."])}
 if(f===3)L.push(["r","Giông tố: Hoàng thượng bực bội cả tuần (tính nóng nảy thì nổi giận)."]);
 if(f===2)L.push(["r","Nắng gắt: Hoàng thượng tính nóng nảy thì bực bội."]);
 if(f===4)L.push(["n","Tuyết dày: Hoàng thượng chăm chính sự thì bận, kém vui."]);
 if(["trăng rằm","hoa đào bay","mai nở trong tuyết"].includes(w.n))L.push(["g","Cảnh đẹp: Hoàng thượng đa tình hoặc mê sắc thì vui vẻ cả tuần."]);
 if(!L.length)L.push(["n","Trời yên: không ảnh hưởng gì tới việc trong cung."]);return L}
function kitWxChip(){try{if(!S||!S.wx)return;const h=document.getElementById("hud2");if(!h)return;const k=KM_WX[S.wx.n]||"troiquang";let c=h.querySelector(".kmwx");
 const html=`<img src="${KM_DIR}mo-wx-${k}.webp" alt="" width="20" height="20">${kmEsc(S.wx.n)}`;
 if(!c){c=document.createElement("button");c.type="button";c.className="hc keep kmwx";c.dataset.kmwx="1";const lot=h.querySelector('[data-hx="lot"]')||h.querySelector('[data-hx="buoi"]');if(lot&&lot.nextSibling)h.insertBefore(c,lot.nextSibling);else h.appendChild(c)}
 if(c.innerHTML!==html)c.innerHTML=html}catch(e){}}
document.addEventListener("click",e=>{const c=e.target.closest&&e.target.closest(".kmwx");if(!c||!S||!S.wx)return;e.stopPropagation();e.preventDefault();
 const L=kitWxEffects();const k=KM_WX[S.wx.n]||"troiquang";
 const html=`<div class="kpopt kmwxh"><img src="${KM_DIR}mo-wx-${k}.webp" alt="" width="40" height="40"><span>${kmEsc(SEASON[S.month-1])} · ${kmEsc(S.wx.n)}<small>Thời tiết tuần này</small></span></div><div class="kmwxl">${L.map(([c,t])=>`<p class="ef ${c}">${t}</p>`).join("")}</div>`;
 if(typeof kpPop==="function")kpPop(c,html)},true);

/* ---------- weather particles (j11): same mechanism, drawn large and dark enough to see on Fold and iPad ---------- */
(function(){if(typeof mkPart!=="function"||typeof PCOL!=="object")return;
 Object.assign(PCOL,{rain:[0x7d93ab,0x8aa0b8,0x9db2c6],snow:[0xffffff,0xf4f8ff],leaf:[0xc8643a,0xd9963a,0xa8562e,0xb98a3a],petal:[0xf4a6bc,0xf9c3d0,0xffffff],dust:[0xfff2c0],fly:[0xfff07a]});
 const m0=mkPart;mkPart=function(kind,scatter,x0,y0){const sp=m0.apply(this,arguments);try{if(x0!=null)return sp;const home=S&&placeOf(S.place).sc==="home";
  const k={rain:[1.5,1.3,.8],snow:[1.7,1,1],petal:[1.5,1,1],leaf:[1.5,1,1],smoke:[1.6,1.2,1.2],fly:[1.6,1,1],dust:[1.6,1,1]}[kind];if(k){if(kind==="rain")sp.scale.set(.15*(.7+Math.random()*.6),1.6*(.8+Math.random()*.4));else sp.scale.set(sp.scale.x*k[0],sp.scale.y*k[0]);sp.alpha=Math.min(1,sp.alpha*k[1])*(home?.6:1)}
  if(kind==="smoke")sp.alpha=home?.14:.24}catch(e){}return sp};
 if(typeof PX==="object")PX.key=""})();

/* ================= hooks into the game ================= */
let KMSNAP=null,KMS=null;
function kmSnap(){return{srv:typeof isSrv==="function"&&isSrv(),rank:S.rank,out:!!S.out,preg:!!S.preg,kids:(S.kids||[]).length,inv:(S.inv||[]).slice(),dead:!!S.dead}}
/* rank, cold palace, pregnancy, births and new things in the chest, read from the state after each render (any code path) */
function kmDiff(){if(!kmOn()){return}if(KMS!==S||!KMSNAP){KMS=S;KMSNAP=kmSnap();return}const a=KMSNAP,b=kmSnap();KMSNAP=b;if(b.dead)return;
 if(!a.out&&b.out)kitGloom({title:"Vào lãnh cung",sub:S.coldWhy?String(S.coldWhy).replace(/<[^>]+>/g,""):"Gió lạnh lùa qua song cửa.",from:a.srv?-1:a.rank,to:-2});
 else if(a.srv&&!b.srv&&!b.out&&S.srv&&S.srv.risen)kitEdict({from:-1,to:b.rank});
 else if(b.srv){}
 else if(b.rank>a.rank&&!b.out)kitEdict({from:a.rank,to:b.rank});
 else if(b.rank<a.rank&&!b.out)kitGloom({title:`Bị giáng xuống ${kmRankName(b.rank)}`,sub:`Từ ${kmRankName(a.rank)} xuống ${kmRankName(b.rank)}.`,from:a.rank,to:b.rank});
 if(!a.preg&&b.preg)kitBloom({title:"Có tin vui",sub:"Thái y bắt mạch: ngươi đã mang long thai."});
 if(b.kids>a.kids){const k=S.kids[S.kids.length-1];kitBloom({title:k&&k.sex==="m"?"Hạ sinh hoàng tử":"Hạ sinh công chúa",sub:k&&k.name?`${k.name} chào đời, mẹ tròn con vuông.`:"Mẹ tròn con vuông."})}
 const added=b.inv.filter(x=>!a.inv.includes(x));if(added.length&&added.length<=4){const gifts=added.filter(x=>x.from&&x.from!=="emp"&&x.from!=="me");const bought=added.filter(x=>!x.from);
  if(gifts.length){const g=gifts[0];const who=g.from==="th"?"Thái hậu ban":g.from==="hh"?"Hoàng hậu ban":(()=>{const v=typeof byKey==="function"?byKey(g.from):null;const r=v||(typeof rivals!=="undefined"?rivals.find(x=>x.id===g.from):null);return r&&r.name?`${r.name} tặng`:"Có người tặng"})();
   kitReward({kind:g.from==="th"||g.from==="hh"?"tray":"gift",title:g.from==="th"||g.from==="hh"?"Mâm thưởng":"Hộp gấm",from:who,items:gifts.map(x=>({n:IT[x.k]?IT[x.k].n:x.k,d:IT[x.k]?IT[x.k].d:"",img:kmItemImg(x.k),tier:kmTierOf(x.k)}))})}
  bought.forEach(x=>kitFlyItem(x.k))}}
(function(){const W=(n,f)=>{const o=window[n];if(typeof o!=="function")return;window[n]=f(o)};
 /* ban thưởng (all of j20 bestow: night, contest, births, promotion, story, accuse, birthday, nursing) */
 W("bestow",o=>function(p,why){const n0=p&&p.inv?p.inv.length:0,b0=p&&p.bac;const r=o.apply(this,arguments);try{if(p===S&&kmOn()&&S.inv.length>n0){const x=S.inv[S.inv.length-1];
   const royal=why==="son"||why==="sinhthan";const kind=royal?"royal":why==="night"?"tray":"chest";KMSNAP&&KMSNAP.inv.push(x);
   kitReward({kind,title:royal?"Ngự tứ":why==="night"?"Mâm thưởng":"Rương bảo vật",from:`Hoàng thượng ban · ${(typeof BWHY==="object"&&BWHY[why])||""}`.replace(/ · $/,""),items:[{n:IT[x.k].n,d:IT[x.k].d,img:kmItemImg(x.k),tier:kmTierOf(x.k,royal)}],bac:Math.max(0,(S.bac||0)-(b0||0))})}}catch(e){console.error(e)}return r});
 /* thị tẩm: the week's tablet (after the week panel closes) */
 W("flip",o=>function(){const r=o.apply(this,arguments);try{if(kmOn()&&!S.dead&&S.tonight){const t=S.tonight==="me"?S:S.tonight;if(t===S)kitFlipTablet(t,{me:true});else kitFlipNote(t)}}catch(e){console.error(e)}return r});
 /* result card */
 W("resultShow",o=>function(){const r=o.apply(this,arguments);try{const t=document.getElementById("rtoast");if(t&&t.classList.contains("on")&&kmOn())kitResultFx(t)}catch(e){console.error(e)}return r});
 /* buổi change: the incense curtain was replaced by the painted time-of-day transition (jbuoi.js, KIT §71); kitDayShift stays for old callers */
 /* death: ink spreads, then the Kiếp này / Sổ luân hồi panel underneath */
 W("over",o=>function(h){const was=S&&S.dead;const r=o.apply(this,arguments);try{if(S&&S.dead&&!was&&!window.__bot)kitInk({title:h||"Hồng nhan bạc mệnh"})}catch(e){}return r});
 /* the lot shown again (Gieo lại, Phật đường, the HUD chip): play the tube in the panel */
 W("showModal",o=>function(){const r=o.apply(this,arguments);try{const m=document.querySelector("#modal .xam");if(m&&S&&S.lot&&!m.dataset.km){m.dataset.km=1;const x=document.createElement("div");m.replaceWith(x);x.outerHTML=kitXamHTML(S.lot)}
   const q=typeof Q!=="undefined"&&Q[0];if(q&&q.pid&&kmOn()&&!["ksp","prep","night1","night2","shop","giftpick","plantpick","taintpick","evpick","itarget","plantsv"].includes(q.pid)&&!q.__kmA){try{Object.defineProperty(q,"__kmA",{value:1,enumerable:false})}catch(e){}kitAlarm()}}catch(e){console.error(e)}return r});
 /* the promotion visuals replace j11's stamp (sound and haptics stay) */
 W("feedback",o=>function(k,x){if(k==="promote"&&!kmReduced()){try{if(SFXN[k])sfx(SFXN[k]);vib(k)}catch(e){}return}return o.apply(this,arguments)});
 /* render: state diff + weather chip */
 W("render",o=>function(){const r=o.apply(this,arguments);try{kmDiff();kitWxChip()}catch(e){console.error(e)}return r});
 /* the week panel: calendar page flips, then the lot is drawn from the tube */
 W("dawn",o=>function(){const pre=S?{m:S.month,y:S.year,t:S.tuan}:null;const r=o.apply(this,arguments);try{const w=document.getElementById("dawn");if(!w||!S)return r;const box=w.querySelector(".dbox");
   if(box&&S.lot){const sec=[...box.querySelectorAll(".kpsec")].find(s=>/Quẻ/.test(s.textContent));if(sec){sec.classList.add("kmlotsec");kitXamPlay(sec,S.lot)}}
   const sky=w;w.querySelectorAll(":scope > .kmcal").forEach(e=>e.remove());w.classList.toggle("km-nocal",kmReduced());if(!kmReduced()){const T=TUAN[S.tuan]||"";kitCalendar(sky,{to:T?T[0].toUpperCase()+T.slice(1):"",toSub:`Tháng ${S.month} · năm ${S.year}`,from:(()=>{const P=TUAN[(S.tuan+TUAN.length-1)%TUAN.length]||"";return P?P[0].toUpperCase()+P.slice(1):"Tuần qua"})(),fromSub:"đã qua"});w.classList.add("kmcal-on");sky.lastElementChild.addEventListener("click",e=>{e.stopPropagation();w.classList.remove("kmcal-on")},{once:true});setTimeout(()=>w.classList.remove("kmcal-on"),1350)}}catch(e){console.error(e)}return r})})();
window.kitFlipTablet=kitFlipTablet;window.kitXamPlay=kitXamPlay;window.kitResultFx=kitResultFx;window.kitEdict=kitEdict;window.kitGloom=kitGloom;window.kitBloom=kitBloom;window.kitInk=kitInk;
window.kitReward=kitReward;window.kitFlyItem=kitFlyItem;window.kitAlarm=kitAlarm;window.kitDayShift=kitDayShift;window.kitCalendar=kitCalendar;window.kitWxEffects=kitWxEffects;window.kmPush=kmPush;window.kmReset=kmReset;window.kmOnReset=kmOnReset;window.kmStage=kmStage;

/* ================= kit CSS (motion tokens; art img/kit/mo-*.webp) ================= */
(function(){const st=document.createElement("style");st.id="kit93";st.textContent=`
:root{--km-ease:cubic-bezier(.2,.9,.3,1.15);--km-out:cubic-bezier(.2,.7,.3,1);--km-dim:#1a0f0acc}
/* 8: panels and cards open the same way; buttons answer the touch */
.dlg,.dlg.kpanel,#kpop,.kpop{animation:kmIn .28s var(--km-ease) both}
.rtoast.karesult.on{animation:kmUp .32s var(--km-ease) both}
/* press / release / ripple / rim light: jfx touch kit (KIT § Cảm giác/FX) — uses the 'scale' property, so an element's own transform stays */
@keyframes kmIn{from{opacity:0;transform:translateY(14px) scale(.96)}to{opacity:1;transform:none}}
@keyframes kmUp{from{opacity:0;transform:translate(-50%,24px)}to{opacity:1}}
/* stage overlay */
.kmov{position:fixed;inset:0;z-index:9100;display:flex;align-items:center;justify-content:center;background:var(--km-dim);animation:kmFade .25s ease both;
 padding:max(12px,env(safe-area-inset-top)) 16px max(12px,env(safe-area-inset-bottom));user-select:none;-webkit-user-select:none;cursor:pointer;overflow:hidden}
.kmov.km-out{animation:kmFadeOut .24s ease forwards}
.kmst{position:relative;width:100%;max-width:760px;max-height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:12px}
.kmov.km-endon{box-sizing:border-box;padding-bottom:calc(68px + env(safe-area-inset-bottom,0px))}
.kmend{position:absolute;bottom:max(18px,env(safe-area-inset-bottom));left:50%;transform:translateX(-50%);z-index:9;min-width:140px;animation:kmendin .35s ease-out both}
@keyframes kmendin{from{opacity:0;transform:translate(-50%,8px)}to{opacity:1;transform:translate(-50%,0)}}
@media (prefers-reduced-motion:reduce){.kmend{animation:none}}
.kmhint{position:absolute;bottom:max(14px,env(safe-area-inset-bottom));left:0;right:0;text-align:center;font-size:.74rem;color:#f6ead6c0;letter-spacing:.04em}
.km-skip *:not(.km-loop),.km-skip.kmseal,.km-skip.kmxam *{animation-delay:0s!important;animation-duration:.01s!important;transition-duration:.01s!important}
@keyframes kmFade{from{opacity:0}to{opacity:1}}@keyframes kmFadeOut{to{opacity:0}}
@keyframes kmPop{0%{opacity:0;transform:scale(.4)}70%{opacity:1;transform:scale(1.12)}100%{opacity:1;transform:scale(1)}}
/* 1 tablet */
.km-tablet.km-soft{background:#1a0f0a99}
.kmflip{display:flex;flex-direction:column;align-items:center;gap:14px;width:100%}
.kmcap{position:relative;z-index:3;font-family:var(--display);font-weight:700;color:#f6e3b4;font-size:1.05rem;letter-spacing:.05em;text-shadow:0 2px 6px #000a;animation:kmFade .4s ease both}
.kmtabs{display:flex;align-items:flex-end;justify-content:center;gap:clamp(6px,2vw,16px);height:min(52vh,420px);perspective:1100px;box-sizing:content-box;padding-top:clamp(28px,7%,40px)}
.kmtab{height:82%;aspect-ratio:116/520;position:relative;filter:drop-shadow(0 8px 10px #0008)}
.kmtab img{display:block;width:100%;height:100%}
.kmtab-s{opacity:.85;animation:kmTabIn .5s var(--km-out) calc(.06s * (var(--i) + 3)) both}
.kmtab-c{height:100%;z-index:2;animation:kmLift .55s var(--km-out) .35s both}
.kmcard{position:relative;width:100%;height:100%;transform-style:preserve-3d;animation:kmFlip .75s var(--km-ease) .85s both}
.kmface{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden}.kmfront{transform:rotateY(180deg)}
.kmname{position:absolute;left:14%;right:14%;top:22%;bottom:10%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:2px;text-align:center;font-family:var(--display);font-weight:700;color:#3a1f10;line-height:1.1;font-size:clamp(.78rem,2.4vw,1.05rem)}
.kmname small{font-size:.62em;font-weight:600;color:#7a5a30;margin-bottom:6px}
.kmflip-me .kmtab-c{filter:drop-shadow(0 0 18px #f0d070) drop-shadow(0 8px 10px #0008)}
.kmres{display:flex;align-items:center;gap:10px;background:#fffaf0f2;border:1px solid var(--line);border-radius:var(--k-rad,8px);padding:6px 12px;box-shadow:0 6px 18px #0006;animation:kmPop .45s var(--km-ease) 1.5s both;max-width:100%}
.kmres b{display:block;font-family:var(--display);color:var(--gold);font-size:.98rem}.kmres small{display:block;font-size:.76rem;color:var(--dim)}
.kmflip-me .kmres{border-color:#c9952a;box-shadow:0 0 0 3px #f0d07066,0 6px 18px #0006}
@keyframes kmTabIn{from{opacity:0;transform:translateY(40px)}to{opacity:.85;transform:none}}
@keyframes kmLift{from{opacity:0;transform:translateY(60px)}60%{opacity:1;transform:translateY(-6%)}to{opacity:1;transform:translateY(-4%) scale(1.06)}}
@keyframes kmFlip{from{transform:rotateY(0)}to{transform:rotateY(180deg)}}
/* 2 lot tube */
.kmxam{display:flex;align-items:center;justify-content:center;gap:14px;padding:4px 0 2px;cursor:pointer}
.kmxt{position:relative;height:96px;width:70px;display:flex;justify-content:center;align-items:flex-end}
.kmtube{height:96px;width:auto;transform-origin:50% 90%;animation:kmShake .9s ease-in-out var(--kd,0s) both;position:relative;z-index:1}
.kmstick{position:absolute;height:84px;width:auto;left:50%;bottom:18px;z-index:2;transform-origin:50% 100%;animation:kmStick .7s var(--km-out) calc(var(--kd,0s) + .85s) both}
.kmlot{display:flex;flex-direction:column;align-items:center;min-width:5.5rem;padding:4px 10px;border:1px solid var(--line);border-radius:var(--k-rad,8px);background:#fffaf0;animation:kmPop .4s var(--km-ease) calc(var(--kd,0s) + 1.45s) both}
.kmlot b{font-family:var(--display);font-size:1.15rem;color:var(--gold)}.kmlot small{font-size:.68rem;color:var(--dim)}.kmlot.g b{color:var(--good)}.kmlot.r b{color:var(--bad)}
.kmlotsec{--kd:0s}.dawn .kmlotsec{--kd:1.3s}.dawn.km-nocal .kmlotsec{--kd:0s}.kmlotsec .krows,.kmlotsec .kfacts{animation:kmFade .35s ease calc(var(--kd,0s) + 1.6s) both}
@keyframes kmShake{0%,100%{transform:rotate(0)}10%{transform:rotate(-9deg)}22%{transform:rotate(8deg)}34%{transform:rotate(-8deg)}46%{transform:rotate(7deg)}58%{transform:rotate(-6deg)}70%{transform:rotate(5deg)}82%{transform:rotate(-3deg)}}
@keyframes kmStick{0%{opacity:0;transform:translate(-50%,30px) rotate(0)}45%{opacity:1;transform:translate(-50%,-46px) rotate(8deg)}100%{opacity:1;transform:translate(10px,6px) rotate(64deg)}}
/* 3 result card: seal, floating numbers, bars */
.rtoast.karesult{overflow:visible}
.kmseal{position:absolute;right:6px;top:-18px;width:78px;height:auto;z-index:3;pointer-events:none;transform:rotate(-12deg);mix-blend-mode:multiply;animation:kmStamp .5s cubic-bezier(.3,1.4,.5,1) .1s both}
.km-thump{animation:kmThump .35s ease .45s both!important}
.kmfls{position:fixed;z-index:9050;pointer-events:none;transform:translateX(-50%);display:flex;flex-wrap:wrap;justify-content:center;gap:6px;width:max-content}
.kmfl{position:relative;font-weight:800;font-size:1rem;white-space:nowrap;background:#fffaf0;border:1.5px solid currentColor;border-radius:12px;padding:1px 9px;box-shadow:0 4px 12px #5a3a2050;animation:kmFloat 1.5s var(--km-out) both}
.kmfl.g{color:var(--good)}.kmfl.r{color:var(--bad)}
.kmbar{display:block;height:4px;margin:2px 0 3px;border-radius:2px;background:#e6d3ac;overflow:hidden;max-width:220px}.kmbar b{display:block;height:100%;border-radius:2px;transition:width .9s var(--km-out) .35s}
.kmbar.up b{background:var(--good)}.kmbar.down b{background:var(--bad)}
@keyframes kmStamp{0%{opacity:0;transform:rotate(-22deg) scale(2.6)}60%{opacity:1;transform:rotate(-12deg) scale(.92)}100%{opacity:.95;transform:rotate(-12deg) scale(1)}}
@keyframes kmThump{0%,100%{translate:0 0}30%{translate:0 3px}60%{translate:0 -1px}}
@keyframes kmFloat{0%{opacity:0;transform:translateY(10px) scale(.8)}20%{opacity:1;transform:translateY(-4px) scale(1.1)}75%{opacity:1}100%{opacity:0;transform:translateY(-48px) scale(1)}}
/* 4 edict + frame change */
.kmedict{display:flex;flex-direction:column;align-items:center;gap:10px;width:100%}
.kmscroll{position:relative;width:min(92vw,640px);aspect-ratio:1000/448}
.kmsc-c{position:absolute;left:50%;top:50%;width:62%;transform:translate(-50%,-50%);animation:kmScC .9s ease both}
.kmsc-o{position:absolute;inset:0;clip-path:inset(0 50% 0 50%);animation:kmScO .8s var(--km-out) .45s both}
.kmsc-o img{width:100%;height:100%;display:block}
.kmsc-t{position:absolute;left:14%;right:14%;top:22%;bottom:20%;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;gap:4px;font-family:var(--display);color:#3a1f10}
.kmsc-t b{font-size:clamp(.9rem,2.6vw,1.2rem);letter-spacing:.2em;color:#8a2a1e}.kmsc-t span{font-size:clamp(.82rem,2.4vw,1.08rem);font-weight:700;line-height:1.3}.kmsc-t small{font-size:.7rem;color:#7a5a30}
.kmpromo{display:flex;flex-direction:column;align-items:center;gap:8px;animation:kmPop .45s var(--km-ease) 1.1s both}
.kmfr{position:relative;width:clamp(96px,16vw,124px);display:grid}.kmfr>div{grid-area:1/1}.kmfr span.md.kmini.kmini.big,.kmfr span.md.kmini.kmini,.kmfr .md{width:100%!important}
.kmfr-old{animation:kmFadeOut .5s ease 1.55s forwards}
/* §66.1 rank up: the light gold glow is PAINTED (KIT §68 glowburst + glow-gold light, see kitEdict); no CSS sweep */
.kmchip-row{display:flex;align-items:center;gap:8px}.kmarrow{color:#f6e3b4;font-weight:700}
.kmchip{font-size:.8rem;font-weight:700;padding:3px 10px;border-radius:12px;border:1px solid var(--line);background:#fffaf0;color:var(--dim)}
.kmchip-new{color:#3a1f10;border-color:var(--rc);background:linear-gradient(#fffaf0,color-mix(in srgb,var(--rc) 35%,#fffaf0));box-shadow:0 0 0 3px color-mix(in srgb,var(--rc) 35%,transparent);animation:kmPop .45s var(--km-ease) 1.75s both}
@keyframes kmScC{0%{opacity:0;transform:translate(-50%,-30%) scale(.7)}40%{opacity:1;transform:translate(-50%,-50%) scale(1)}70%{opacity:1}100%{opacity:0;transform:translate(-50%,-50%) scale(1.04)}}
@keyframes kmScO{from{clip-path:inset(0 50% 0 50%)}to{clip-path:inset(0 0 0 0)}}
/* 4b gloom */
.km-gloom{background:transparent}
.kmgloom{position:fixed;inset:0;display:flex;align-items:center;justify-content:center}
.kmdark{position:absolute;inset:0;background:radial-gradient(ellipse at 50% 45%,#2a2228b0,#0c0a0ef0 75%);animation:kmFade 1.1s ease both}
.kmleaves{position:absolute;inset:0;overflow:hidden;pointer-events:none}
.kmleaf{position:absolute;top:-60px;left:var(--x);width:calc(46px * var(--s));height:auto;opacity:.9;animation:kmLeaf 1.9s ease-in var(--d) both;filter:saturate(.7) brightness(.85)}
.kmgbox{position:relative;display:flex;flex-direction:column;align-items:center;gap:14px}
/* §66.2 rank down: frame greys (and swaps to the lower frame), the old chip cracks and falls, the new chip comes up dim */
.kmdown{display:flex;flex-direction:column;align-items:center;gap:10px;animation:kmFade .5s ease .2s both}
.kmfr-grey{animation:kmGrey 1.5s ease .5s both}.kmdown .kmfr-old{animation:kmFadeOut .7s ease 1.2s forwards}.kmdown-cold .kmfr-old{animation:none}
@keyframes kmGrey{from{filter:none}to{filter:grayscale(1) brightness(.72) contrast(.9)}}
.kmcrack{position:relative;display:inline-block}.kmck-t{visibility:hidden}
.kmck{position:absolute;inset:0;margin:0;color:var(--dim)}
.kmck-a{clip-path:polygon(0 0,53% 0,45% 38%,57% 62%,47% 100%,0 100%);animation:kmCkA 1s cubic-bezier(.5,0,.9,.5) 1.25s both}
.kmck-b{clip-path:polygon(53% 0,100% 0,100% 100%,47% 100%,57% 62%,45% 38%);animation:kmCkB 1s cubic-bezier(.5,0,.9,.5) 1.3s both}
/* the crack = painted cracked-jade shards (KIT §68 kitFxBurst "jade") burst where the chip splits; the chip halves fall */
@keyframes kmCkA{0%{transform:none;opacity:1}12%{transform:translateX(-2px) rotate(-2deg)}100%{transform:translate(-18px,90px) rotate(-28deg);opacity:0}}
@keyframes kmCkB{0%{transform:none;opacity:1}12%{transform:translateX(2px) rotate(2deg)}100%{transform:translate(16px,100px) rotate(24deg);opacity:0}}
.kmchip-down{color:#cfc6be;background:#3a3236;border-color:#6a6064;animation:kmFade .6s ease 1.9s both}
.kmgcap{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center;animation:kmFade .6s ease .6s both;padding:0 16px}
.kmgcap b{font-family:var(--display);font-size:1.3rem;color:#d8d2cc;letter-spacing:.06em}.kmgcap small{color:#b8b0aa;font-size:.82rem;max-width:30rem}
@keyframes kmLeaf{from{transform:translate(0,0) rotate(var(--r))}50%{transform:translate(var(--w),50vh) rotate(calc(var(--r) + 140deg))}to{transform:translate(calc(var(--w) * -1),105vh) rotate(calc(var(--r) + 300deg))}}
/* 5 buổi incense, week calendar */
.curtain.shift span:has(.kminc){display:flex;align-items:center;gap:12px;padding:8px 22px 8px 14px;position:relative;z-index:1}
.kminc{position:relative;display:block;height:78px;aspect-ratio:200/419;pointer-events:none;flex:none}
.kminc img{width:100%;height:100%;display:block}
.kmsky{position:absolute;inset:0;pointer-events:none;animation:kmSky 1s ease both}
.kmsky.b0{background:linear-gradient(#ffe9b8aa,#fff6e000 60%)}.kmsky.b1{background:linear-gradient(#f2a35a99,#f6c98a00 65%)}.kmsky.b2{background:linear-gradient(#1c1840d0,#2a205080 55%,#5a3a6020)}
@keyframes kmSky{from{transform:translateY(-100%)}to{transform:none}}
.kmember{position:absolute;left:50%;width:14px;height:14px;margin-left:-7px;background:url(img/fx/ember.webp) 0 0/900% 100% no-repeat;mix-blend-mode:screen;top:0;animation:kmBurn .95s linear both}
.kmsmoke{position:absolute;left:50%;top:-18px;width:34px;height:34px;margin-left:-17px;background:url(img/fx/smoke.webp) 50% 0/300% 100% no-repeat;animation:kmSmoke 1s ease-out both}.kmsmoke.s2{animation-delay:.3s}
@keyframes kmBurn{from{top:1%}to{top:20%}}
@keyframes kmSmoke{from{opacity:0;transform:translateY(0) scale(.6)}40%{opacity:.8}to{opacity:0;transform:translate(8px,-50px) scale(1.4)}}
.kmcal{position:fixed;left:50%;top:46%;transform:translate(-50%,-50%);z-index:5;pointer-events:auto;animation:kmCalOut .35s ease 1.15s forwards}
.dawn:not(.kmcal-on) .kmcal{pointer-events:none}
.kmcal-b{position:relative;width:min(48vw,240px);aspect-ratio:290/420;perspective:700px}.kmcal-b>img{width:100%;height:100%;display:block}
.kmcal-p{position:absolute;left:9%;right:9%;top:16%;bottom:6%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;text-align:center;font-family:var(--display);color:#8a2a1e;background:#fbf4e4;border:1px solid #d9b98a;border-radius:2px}
.kmcal-p b{font-size:clamp(1.2rem,4.4vw,1.8rem)}.kmcal-p small{font-size:.72rem;color:#7a5a30}
.kmcal-old{transform-origin:50% 0;animation:kmPage .7s ease-in .3s forwards;backface-visibility:hidden}
.dawn .dbox{transition:opacity .35s ease,transform .35s var(--km-ease)}.dawn.kmcal-on .dbox{opacity:0!important;transform:translateY(24px) scale(.97)!important}
@keyframes kmPage{to{transform:rotateX(-110deg) translateY(-6px);opacity:0}}
@keyframes kmCalOut{to{opacity:0;transform:translate(-50%,-60%) scale(.8)}}
/* 6 bloom, ink */
.kmbloom{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;width:100%;height:min(70vh,520px)}
.kmglow{position:absolute;left:50%;top:42%;width:min(80vw,420px);aspect-ratio:1;transform:translate(-50%,-50%);background:url(img/fx/orb.webp) 100% 0/300% 100% no-repeat;mix-blend-mode:screen;filter:sepia(.5) saturate(1.6) hue-rotate(-25deg);animation:kmFade .9s ease .2s both}
.kmpeony{position:absolute;left:50%;top:42%;width:min(56vw,280px);height:auto;transform:translate(-50%,-50%);animation:kmBloom 1.2s cubic-bezier(.2,.9,.3,1.1) both;filter:drop-shadow(0 8px 16px #0006)}
.kmpet{position:absolute;left:50%;top:42%;width:26px;height:auto;opacity:0;animation:kmPet 1.1s var(--km-out) var(--d) both}
.kmbcap{position:absolute;left:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;gap:4px;text-align:center;animation:kmPop .45s var(--km-ease) 1s both}
.kmbcap b,.kmicap b{font-family:var(--display);font-size:1.35rem;color:#fff3d6;text-shadow:0 2px 8px #000c;letter-spacing:.04em}.kmbcap small,.kmicap small{color:#f6ead6;font-size:.84rem;text-shadow:0 1px 4px #000c}
@keyframes kmBloom{0%{opacity:0;transform:translate(-50%,-50%) scale(.15) rotate(-60deg)}60%{opacity:1;transform:translate(-50%,-50%) scale(1.06) rotate(6deg)}100%{opacity:1;transform:translate(-50%,-50%) scale(1) rotate(0)}}
@keyframes kmPet{0%{opacity:0;transform:translate(-50%,-50%) rotate(var(--a)) translateY(0) scale(.5)}30%{opacity:1}100%{opacity:0;transform:translate(-50%,-50%) rotate(var(--a)) translateY(calc(var(--v) * -1)) rotate(120deg) scale(1)}}
.km-inkov{background:transparent}
.kmink{position:fixed;inset:0;display:flex;align-items:center;justify-content:center}
.kmblot{position:absolute;left:50%;top:46%;width:60vmax;height:auto;transform:translate(-50%,-50%) scale(.05);opacity:0;animation:kmInk 1.6s cubic-bezier(.3,.6,.3,1) both}
.kmblot.b2{left:38%;top:58%;animation-delay:.25s;width:50vmax}
.kmicap{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;animation:kmFade .6s ease 1.1s both}
@keyframes kmInk{0%{opacity:0;transform:translate(-50%,-50%) scale(.05)}25%{opacity:.95}100%{opacity:.97;transform:translate(-50%,-50%) scale(3.2)}}
/* someone else's tablet: a short line, not an overlay */
.kmnote{position:fixed;left:50%;top:calc(env(safe-area-inset-top,0px) + 58px);translate:-50% 0;z-index:8800;pointer-events:none;max-width:calc(100vw - 32px);animation:kmNote .3s var(--km-out) both}
.kmnote .kchip{display:inline-flex;align-items:center;gap:7px;max-width:100%;margin:0;font-size:.82rem;line-height:1.3;padding:3px 12px 3px 4px;border-radius:14px;border-color:var(--gold);background:#fffaf0f4;box-shadow:0 4px 14px #0004}
.kmnote .kchip>.md{flex:none}
.kmnote.km-out{animation:kmFadeOut .3s ease forwards}
@keyframes kmNote{from{opacity:0;translate:-50% -8px}to{opacity:1;translate:-50% 0}}
/* 7 reward */
.km-reward{background:radial-gradient(ellipse at 50% 42%,#4a2a14e0,#140a06f2 70%)}
.kmrew{display:flex;flex-direction:column;align-items:center;gap:8px;width:100%;max-width:560px}
.kmrew-h{display:flex;flex-direction:column;align-items:center;text-align:center;animation:kmFade .4s ease both}
.kmrew-h b{font-family:var(--display);font-size:1.25rem;color:#f6e3b4;letter-spacing:.05em}.kmrew-h small{color:#e9d6b0;font-size:.82rem}
.kmbox{position:relative;width:min(70vw,340px);aspect-ratio:520/420;display:flex;align-items:flex-end;justify-content:center}
.kmbox-c,.kmbox-o{position:absolute;left:0;right:0;bottom:0;margin:auto;width:100%;height:auto;max-height:100%;object-fit:contain;filter:drop-shadow(0 10px 14px #000a)}
.kmbox-c{animation:kmBob 2.2s ease-in-out infinite;filter:drop-shadow(0 0 16px #f0d07090) drop-shadow(0 10px 14px #000a)}.kmbox-c.km-loop{}
.kmbox-o{opacity:0}
.km-shake .kmbox-c{animation:kmRattle .38s linear both}
.km-open .kmbox-c{opacity:0;transition:opacity .12s}.km-open .kmbox-o{opacity:1;animation:kmPop .3s var(--km-ease) both}
.kmrew-chest .kmbox{--gx:50%;--gy:45%}.kmrew-royal .kmbox{--gx:50%;--gy:54%}.kmrew-tray .kmbox{--gx:50%;--gy:51%}.kmrew-gift .kmbox{--gx:55%;--gy:37%}.kmrew-pouch .kmbox{--gx:50%;--gy:48%}
/* soft light from INSIDE the opened box (owner: no fan rays / halo anywhere): warm radial glow centred on the mouth, breathing gently.
   centring uses the separate translate property, so the scale/opacity animation never moves it */
/* the light itself is PAINTED (KIT §68 "orb" atlas, frame 3 = soft round light, Magnific); code only scales / fades / warms it */
.kmlight{position:absolute;left:var(--gx,50%);top:calc(var(--gy,45%) - 10%);width:165%;aspect-ratio:1.2;translate:-50% -50%;scale:.5;opacity:0;pointer-events:none;
 background:url(img/fx/orb.webp) 100% 0/300% 100% no-repeat;mix-blend-mode:screen;filter:sepia(1) saturate(2.6) brightness(1.05)}
.kmlight-f{top:calc(var(--gy,45%) - 4%);width:78%;aspect-ratio:1.55;z-index:2;filter:sepia(.6) saturate(1.8) brightness(1.15)}
.kmrew-royal .kmlight{filter:sepia(1) saturate(3.2) brightness(1.15)}
.km-open .kmlight{animation:kmLightIn .6s ease-out forwards,kmBreathe 2.8s ease-in-out .6s infinite}
/* each item rises into the spotlight over the open box (KIT §54.1 .krev), then settles on the shelf under the box (kitItem sm) */
.kmspot{position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);z-index:6;pointer-events:none;width:max-content;max-width:92vw}
.kmshelf{display:flex;flex-wrap:wrap;justify-content:center;gap:6px;min-height:0;max-width:min(92vw,520px)}
.km-open .kmshelf{min-height:56px}
.kmsh{display:inline-block;animation:kmPop .32s var(--km-ease) both}.km-fast .kmsh{animation-delay:calc(var(--i) * 40ms)}
.kmbox{transition:width .3s ease,opacity .3s}.km-done .kmbox{width:min(30vw,150px);opacity:.6}
.km-done .kmlist{max-height:calc(100dvh - 120px);overflow:auto}

/* review/promo-rules: a long list (rank set, >6 rows) — once open, the box gives its room to the list; the list scrolls and its Nhận stays in view */
.km-long.km-done .kmbox{display:none}.km-long.km-done .kmlist{max-height:calc(100dvh - 150px)}.km-done .kmlist>.kmtake{position:sticky;bottom:0;flex:none}
/* review/small-art-wire-r1: >9 rows (rank set + Đeo eo piece) wraps the icon shelf to a 2nd row; the card then fits the screen by shrinking the list (scrolls, Nhận sticky) instead of a fixed reserve */
.kmrew.km-long.km-done{max-height:calc(100dvh - 12px)}.km-long.km-done .kmlist{flex:0 1 auto;min-height:0;max-height:none}
.km-fast .kmcoins img{animation-delay:0s!important;animation-duration:.15s!important}
.kmcoins{position:absolute;left:50%;top:55%;width:0;height:0;z-index:3;pointer-events:none}
.kmcoins img{position:absolute;width:28px;height:auto;left:-14px;top:-14px;opacity:0}
.km-open .kmcoins img{animation:kmCoin .8s cubic-bezier(.3,.8,.4,1) calc(.3s + var(--i) * .06s) both}
.kmcoins img:nth-child(odd){--cx:-1}.kmcoins img:nth-child(even){--cx:1}
.kmtap{font-family:var(--display);font-weight:700;color:#fff3c4;font-size:1rem;letter-spacing:.08em;animation:kmBlink 1.4s ease-in-out infinite}
.km-open .kmtap{display:none}
/* ONE paper card for the motion screens: the reward list and the person reveal (KIT §65.2) share this frame */
.kmlist,.kprev-card,.ktrv-card{width:100%;max-width:440px;background:#fffaf0f4;border:1px solid var(--gold);border-radius:var(--k-rad,8px);padding:8px 10px;box-shadow:0 0 0 3px #f6ead6,0 10px 26px #0008;box-sizing:border-box}
.kmlist{display:none;flex-direction:column;gap:5px}
.km-done .kmlist{display:flex;animation:kmUp2 .3s var(--km-ease) both}
.kmrow{display:grid;grid-template-columns:auto minmax(0,1fr);column-gap:8px;align-items:baseline;padding:3px 0;border-bottom:1px dotted var(--k-hair,#e6d3ac)}
.kmrow small{grid-column:2;font-size:.76rem;color:var(--dim)}.kmrow b{font-size:.9rem}
.kmrow>.kgchip{grid-row:span 2;align-self:center}
.kmtake{align-self:center;min-width:160px;margin-top:4px}
.kmfly{position:fixed;z-index:9050;width:56px;height:56px;object-fit:contain;pointer-events:none;filter:drop-shadow(0 4px 8px #0007)}
[data-tab].km-pulse{animation:kmPulse .6s ease}
@keyframes kmBob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
@keyframes kmRattle{0%,100%{transform:rotate(0)}20%{transform:rotate(-5deg) translateY(-3px)}40%{transform:rotate(5deg)}60%{transform:rotate(-4deg) translateY(-2px)}80%{transform:rotate(3deg)}}
@keyframes kmLightIn{from{opacity:0;scale:.5}to{opacity:1;scale:1}}
@keyframes kmBreathe{0%,100%{opacity:1;scale:1}50%{opacity:.78;scale:1.05}}
@keyframes kmArc{0%{opacity:0;transform:translate(0,120px) scale(.3)}55%{opacity:1;transform:translate(0,-40px) scale(1.15)}100%{opacity:1;transform:none}}
@keyframes kmCoin{0%{opacity:0;transform:translate(0,0) scale(.4)}40%{opacity:1;transform:translate(calc(var(--cx) * (20px + var(--i) * 9px)),-90px) rotate(160deg)}100%{opacity:0;transform:translate(calc(var(--cx) * (40px + var(--i) * 14px)),30px) rotate(400deg)}}
@keyframes kmBlink{0%,100%{opacity:.55}50%{opacity:1}}
@keyframes kmUp2{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}
@keyframes kmPulse{0%,100%{filter:none}40%{filter:brightness(1.25) drop-shadow(0 0 8px #f0d070)}}
/* danger edge, weather chip */
.kmalarm{position:fixed;inset:0;z-index:8900;pointer-events:none;box-shadow:inset 0 0 0 0 #c23b2200;animation:kmAlarm .8s ease-in-out 2}
@keyframes kmAlarm{0%,100%{box-shadow:inset 0 0 0 0 #c23b2200}50%{box-shadow:inset 0 0 80px 22px #c23b22a0}}
.hud2 .hc.kmwx{display:inline-flex!important;align-items:center;gap:4px;padding-left:3px}.hud2 .hc.kmwx img{width:20px;height:20px;border-radius:50%}
.kmwxh{display:flex;align-items:center;gap:8px}.kmwxh img{border-radius:50%;flex:none}.kmwxh small{display:block;font-family:var(--body);font-weight:400;font-size:.72rem;color:var(--dim)}
.kmwxl p{margin:3px 0;font-size:.8rem;line-height:1.35}.kmwxl .ef.n{color:var(--ink)}
/* reduced motion: final frames, no travel */
/* reduced motion (global rule in p1 removes every animation): pin each piece to its final frame */
@media (prefers-reduced-motion:reduce){.kmcard{transform:rotateY(180deg)}.kmtab-c{transform:translateY(-4%) scale(1.06)}.kmsc-c,.kmfr-old{display:none}.kmsc-o{clip-path:none}
 .km-open .kmlight{opacity:1;scale:1}.kmblot{opacity:.97;transform:translate(-50%,-50%) scale(3.2)}.kmstick{transform:translate(10px,6px) rotate(64deg)}.kmdark{opacity:1}}
@media (prefers-reduced-motion:reduce){.kmov *,.kmseal,.kmxam *,.kmcal,.kmfl,.kmalarm,.dlg,#kpop,.rtoast.karesult.on{animation-duration:.01s!important;animation-delay:0s!important;animation-iteration-count:1!important}.kmfls,.kmalarm,.kmcal{display:none}}
/* kv3:.kv1 */:where(.kv1) .kmtabs{height:min(46vh,360px)}:where(.kv1) .kmcap{font-size:.95rem}
/* kv3:.kv2 */:where(.kv2) .kmtabs{height:min(50vh,380px)}:where(.kv2) .kmbloom{height:min(74vh,520px)}:where(.kv2) .kmbox{width:min(40vw,320px)}
`;document.head.appendChild(st)})();
