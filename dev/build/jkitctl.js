
/* ================= KIT CONTROLS (KIT.md 28) — slider · toggle · text box =================
   The ONE look for every setting control (Thiết lập on the title screen, which ☰ opens from the game too, and any later
   setting). Data only, never markup:
     kitSlider({id, label, value, min:0, max:1, step:.05, sub})     -> label + lacquer track (gold fill) + gold knob + number 0–100
     kitToggle({id, label, on, sub, yes:"Có", no:"Không"})         -> label + switch (red lacquer when on) + state word
     kitInput({id, label, value, placeholder, rows, readonly, sub}) -> label + kit paper text box (body font, never monospace)
   Each control keeps a real <input>/<textarea> with that id, so existing handlers (oninput / onchange / .value / .checked)
   work unchanged. Touch target ≥ 36 px (track row 40 px, switch 52x32 inside a 40 px row). */
function kitCtlEsc(s){return String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;")}
function kitSlider(o){o=o||{};const mn=o.min==null?0:o.min,mx=o.max==null?1:o.max,v=o.value==null?mn:+o.value,st=o.step==null?.05:o.step;
 const pc=Math.round((v-mn)/((mx-mn)||1)*100);
 return `<label class="kctl kslider" for="${o.id}"><span class="kctl-l">${o.label||""}${o.sub?`<small>${o.sub}</small>`:""}</span>`+
  `<span class="kctl-c"><input type="range" class="kslr" id="${o.id}" min="${mn}" max="${mx}" step="${st}" value="${v}" style="--v:${pc}%" aria-label="${kitCtlEsc(o.label)}">`+
  `<output class="kctl-v" for="${o.id}">${pc}</output></span></label>`}
function kitToggle(o){o=o||{};const on=!!o.on,y=o.yes||"Có",n=o.no||"Không";
 return `<label class="kctl ktoggle" for="${o.id}"><span class="kctl-l">${o.label||""}${o.sub?`<small>${o.sub}</small>`:""}</span>`+
  `<span class="kctl-c"><b class="ktg-w" data-yes="${kitCtlEsc(y)}" data-no="${kitCtlEsc(n)}">${on?y:n}</b>`+
  `<input type="checkbox" role="switch" class="ktg" id="${o.id}" ${on?"checked":""} aria-checked="${on}" aria-label="${kitCtlEsc(o.label)}"><span class="ktg-t" aria-hidden="true"><i></i></span></span></label>`}
function kitInput(o){o=o||{};const ro=o.readonly?" readonly":"",ph=o.placeholder?` placeholder="${kitCtlEsc(o.placeholder)}"`:"";
 const box=(o.rows||1)>1?`<textarea class="kinput" id="${o.id}" rows="${o.rows}"${ro}${ph} aria-label="${kitCtlEsc(o.label)}">${kitCtlEsc(o.value)}</textarea>`
  :`<input type="text" class="kinput" id="${o.id}" value="${kitCtlEsc(o.value)}"${ro}${ph} aria-label="${kitCtlEsc(o.label)}">`;
 return `<label class="kctl kinp" for="${o.id}"><span class="kctl-l">${o.label||""}${o.sub?`<small>${o.sub}</small>`:""}</span>${box}</label>`}
/* make an existing <textarea>/<input> a kit text box (for markup an older module draws, e.g. Chép sổ / Nạp sổ) */
function kitInputize(el,label){if(!el||el.classList.contains("kinput"))return;el.classList.add("kinput");if(el.closest(".kctl"))return;
 const w=document.createElement("label");w.className="kctl kinp";if(el.id)w.htmlFor=el.id;w.innerHTML=`<span class="kctl-l">${label||el.getAttribute("aria-label")||""}</span>`;
 el.parentNode.insertBefore(w,el);w.appendChild(el)}
/* live fill + number for sliders, state word for switches */
document.addEventListener("input",e=>{const t=e.target;if(!t||!t.classList||!t.classList.contains("kslr"))return;const mn=+t.min||0,mx=+t.max||1;const pc=Math.round((+t.value-mn)/((mx-mn)||1)*100);
 t.style.setProperty("--v",pc+"%");const o=t.parentNode.querySelector(".kctl-v");if(o)o.textContent=pc},true);
document.addEventListener("change",e=>{const t=e.target;if(!t||!t.classList||!t.classList.contains("ktg"))return;t.setAttribute("aria-checked",String(t.checked));
 const w=t.parentNode.querySelector(".ktg-w");if(w)w.textContent=t.checked?w.dataset.yes:w.dataset.no},true);

(function(){const st=document.createElement("style");st.id="kitctl-css";st.textContent=`
.kctl{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:6px 12px;min-height:44px;padding:4px 2px;border-bottom:1px solid var(--k-hair,#e6d3ac);font-family:var(--body);color:var(--ink);cursor:pointer;text-align:left}
.kctl:last-child{border-bottom:0}
.kctl-l{font-size:.88rem;font-weight:600;line-height:1.3;min-width:0}
.kctl-l small{display:block;font-weight:400;font-size:.74rem;color:var(--dim)}
.kctl-c{display:flex;align-items:center;gap:10px;justify-content:flex-end;min-width:0}
/* slider: full row under 600 px is not needed; the track takes the free width */
.kslider{grid-template-columns:minmax(5.5em,auto) minmax(0,1fr)}
.kslider .kctl-c{justify-content:stretch}
.kslr{-webkit-appearance:none;appearance:none;flex:1 1 auto;min-width:0;width:100%;height:40px;margin:0;background:transparent;cursor:pointer;--v:50%}
.kslr:focus{outline:none}
.kslr::-webkit-slider-runnable-track{height:40px;border:0;border-radius:6px;box-shadow:none;background:
 linear-gradient(90deg,#b0402c,#c98a2a var(--v),var(--k-card2,#f6ead6) var(--v)) center/calc(100% - 2px) 8px no-repeat,
 linear-gradient(var(--line,#d2b071),var(--line,#d2b071)) center/100% 10px no-repeat}
.kslr::-moz-range-track{height:10px;border-radius:6px;border:1px solid var(--line,#d2b071);background:var(--k-card2,#f6ead6)}
.kslr::-moz-range-progress{height:10px;border-radius:6px;background:linear-gradient(90deg,#b0402c,#c98a2a)}
.kslr::-webkit-slider-thumb{-webkit-appearance:none;appearance:none;width:28px;height:28px;margin-top:6px;border-radius:50%;background:radial-gradient(circle,#8a2a1e 0 30%,#f0d070 34% 62%,#a8740c 66%);border:1px solid #6e1d12;box-shadow:0 1px 3px #3a210f66}
.kslr::-moz-range-thumb{width:26px;height:26px;border-radius:50%;background:radial-gradient(circle,#8a2a1e 0 30%,#f0d070 34% 62%,#a8740c 66%);border:1px solid #6e1d12;box-shadow:0 1px 3px #3a210f66}
.kslr:focus-visible::-webkit-slider-thumb{box-shadow:0 0 0 3px var(--k-sel,#fff3c4),0 0 0 5px var(--k-sel-ring,#a8740c)}
.kctl-v{flex:0 0 auto;min-width:2.4em;text-align:right;font-weight:700;font-size:.85rem;color:var(--gold,#8f5f0c);font-variant-numeric:tabular-nums}
/* switch */
.ktg{position:absolute;opacity:0;width:1px;height:1px;margin:0;pointer-events:none}
.ktg-t{position:relative;flex:0 0 auto;width:52px;height:32px;border-radius:16px;background:var(--k-card2,#f6ead6);border:1px solid var(--line,#d2b071);box-shadow:inset 0 1px 3px #6e1d1233;transition:background .18s,border-color .18s}
.ktg-t i{position:absolute;top:3px;left:3px;width:24px;height:24px;border-radius:50%;background:radial-gradient(circle at 40% 35%,#fffaf0,#e6d3ac);border:1px solid #a8740c;box-shadow:0 1px 2px #3a210f55;transition:transform .18s}
.ktg:checked+.ktg-t{background:linear-gradient(#b0402c,#8a2a1e);border-color:#6e1d12;box-shadow:inset 0 0 0 1px #f0d07066}
.ktg:checked+.ktg-t i{transform:translateX(20px);background:radial-gradient(circle at 40% 35%,#fff3c4,#f0d070);border-color:#8f5f0c}
.ktg:focus-visible+.ktg-t{outline:3px solid var(--k-sel-ring,#a8740c);outline-offset:2px}
.ktg-w{font-size:.8rem;font-weight:600;color:var(--dim);min-width:3.6em;text-align:right}
.ktg:checked~.ktg-w,.ktoggle:has(.ktg:checked) .ktg-w{color:var(--k-seal,#9a2c1c)}
@media (prefers-reduced-motion:reduce){.ktg-t,.ktg-t i{transition:none}}
/* text box */
.kinp{grid-template-columns:1fr;cursor:default;border-bottom:0}
.kinput,textarea.kinput,input.kinput{display:block;width:100%;box-sizing:border-box;min-height:40px;padding:8px 10px;font:inherit;font-family:var(--body);font-size:.85rem;line-height:1.45;color:var(--ink);
 background:var(--k-card,#fffaf0);border:1px solid var(--line,#d2b071);border-radius:var(--k-rad,8px);box-shadow:inset 0 1px 3px #8a5a2422;resize:vertical;overflow-wrap:anywhere;word-break:break-all}
.kinput::placeholder{font-family:var(--body);color:#a08a6a}
.kinput:focus{outline:none;border-color:var(--k-sel-ring,#a8740c);box-shadow:0 0 0 3px var(--k-sel,#fff3c4)}
.kinput[readonly]{background:var(--k-card2,#f6ead6)}
`;document.head.appendChild(st)})();
