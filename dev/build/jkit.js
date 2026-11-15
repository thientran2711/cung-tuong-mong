/* ================= KIT 33 · ONE FIGURE SCALE — KIT_FIG (owner 11/15 "people on the stage are too small") =================
   The single source of truth for how big full-body people are drawn: h = figure (visible body, head to feet) / stage-or-picture height;
   man = men's height factor; kid(age) = children's factor by age; fac(src,age) = the factor of one figure file for one person.
   Readers: j59 (every room / place stage, consort + servant road), jk4 kitStageFig / kitEventStage + week book (CSS var --kfig). */
/* table by sex / age (× the adult woman):  adult woman 1 (≈ .79 of the stage — the ratio the owner approved 11/15 in page-curl shot ipad1180-tab-45, measured .787) · adult man / eunuch / official / physician 1.07 (capped under the ribbon)
   · child a<18: .55 + .03·a (age 5 ≈ .70, 10 ≈ .85, 15 = 1) — heads always stay under the top label (ribbon) */
const KIT_FIG={h:.79,man:1.07,men:{emperor:1,eunuch:1,official:1,physician:1,man:1},
 kid(a){return typeof a==="number"&&a<18?Math.min(1,.55+.03*Math.max(1,a)):1},
 fac(src,age){const m=/fig-([a-z]+)-/.exec(src||"");return(m&&this.men[m[1]]?this.man:1)*this.kid(age)}};
window.KIT_FIG=KIT_FIG;
/* KIT 33.4 · kitImgErr — the ONE null-safe fallback for inline <img onerror>: a picture that fails after a re-render detached it
   does nothing (no "reading 'classList' of null" page errors). o.sel: ancestor to mark (default the parent); o.cls: class to add;
   o.text: put img.dataset.i as the parent's text; o.swap: replace the img by img.dataset.i. */
function kitImgErr(im,o){try{o=o||{};if(!im||!im.isConnected)return;const t=o.sel?im.closest(o.sel):im.parentNode;if(!t)return;
 if(o.cls)t.classList.add(o.cls);if(o.text){t.textContent=im.dataset.i||"";return}if(o.swap)im.replaceWith(im.dataset.i||"")}catch(e){}}
window.kitImgErr=kitImgErr;try{document.documentElement.style.setProperty("--kfig",String(KIT_FIG.h))}catch(e){}
/* ================= ONE ACT CARD SIZE: every act card the same width and height at each breakpoint; long text clamps, ⓘ opens the full card ================= */
(function(){const ch=cardH;cardH=function(a,i){let h=ch(a,i);return h.replace(/<\/button>\s*$/,`<span class="kinfo" role="button" tabindex="0" data-kinfo="${i}" aria-label="Xem đủ thẻ" title="Xem đủ">ⓘ</span></button>`)}})();
document.addEventListener("click",e=>{const k=e.target.closest("[data-kinfo]");if(!k)return;e.stopPropagation();e.preventDefault();try{const a=deck[+k.dataset.kinfo];if(!a)return;const full=cardH(a,+k.dataset.kinfo).replace(/^<button[^>]*>/,"").replace(/<\/button>\s*$/,"").replace(/<span class="kinfo"[^>]*>ⓘ<\/span>/,"");
 Q.unshift({t:a.n,h:`<div class="kfull">${full}</div>`});showModal()}catch(err){}},true);
