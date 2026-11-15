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
/* KIT 33.6 · kitFigBody(src, cb) — the ONE body measurement for every full-body figure (room / place stages j59, event stages jk4,
   week book): alpha bbox (t,b,l,r) + ht = head top = first rows of fair forehead skin minus a hair allowance, so crowns, hairpins and
   phoenix headdresses above the head are NOT counted as height. Returns the result when ready, else null and calls cb once measured.
   (Same code as review/men jk4; the cache lives on window so a second identical copy can never clash.) */
function kitFigBody(src,cb){const KIT_FB=window.__KITFB||(window.__KITFB={});const o=KIT_FB[src];if(o&&o.v)return o.v;if(o){o.w.push(cb);return null}const e={v:null,w:[cb]};KIT_FB[src]=e;
 const done=v=>{e.v=v;const L=e.w;e.w=[];L.forEach(f=>{try{f&&f()}catch(x){}})};const im=new Image();im.decoding="async";
 im.onload=()=>{let v={t:0,b:1,l:0,r:1,ht:0,ar:im.naturalWidth/Math.max(1,im.naturalHeight)};try{const nh=im.naturalHeight,nw=im.naturalWidth,h=Math.min(500,nh),w=Math.max(1,Math.round(nw*h/nh));
   const c=document.createElement("canvas");c.width=w;c.height=h;const x=c.getContext("2d",{willReadFrequently:true});x.drawImage(im,0,0,w,h);const d=x.getImageData(0,0,w,h).data;
   let t=h,b=-1,l=w,r=-1;for(let y=0;y<h;y++){const q=y*w*4;for(let i=0;i<w;i++){if(d[q+i*4+3]>40){if(y<t)t=y;if(y>b)b=y;if(i<l)l=i;if(i>r)r=i}}}
   if(b>t){let sk=-1;const lim=t+Math.round((b-t)*.45),need=Math.max(3,Math.round(w*.012));
    for(let y=t;y<=lim&&sk<0;y++){const q=y*w*4;let n=0;for(let i=l;i<=r;i++){const k=q+i*4;if(d[k+3]<200)continue;const R=d[k],G=d[k+1],B=d[k+2];
      if(R>150&&G>105&&B>85&&R-G>=8&&R-G<=62&&G-B>=-4&&G-B<=48&&R-B<=95)n++}if(n>=need)sk=y}
    const ht=sk>=0?Math.max(t,sk-Math.round((b-sk)*.045)):t;v={t:t/h,b:(b+1)/h,l:l/w,r:(r+1)/w,ht:ht/h,ar:nw/nh}}}catch(x){}done(v)};
 im.onerror=()=>done({t:0,b:1,l:0,r:1,ht:0,ar:.45});im.src=src;return null}
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
