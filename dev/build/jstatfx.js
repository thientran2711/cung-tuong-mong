/* ================= KIT §57.1 kitStatFx · a stat / number change you can READ (owner 15/11, review/stat-fx) =================
   ONE entry for every place a stat changes in front of her: the label carries the NAME + delta ("Danh +2"), stays on screen long enough to
   read (~1.1 s flight / ~1.6 s hold), the changed cell then glows GREEN for a gain / dim RED for a loss, pulsing 3 times (~2.6 s) while its
   number swells ~1.15x. Several changes QUEUE (one label every ~0.7 s) instead of piling up; a tap skips what is left. Gọn (Hiệu ứng: Gọn)
   = the cell glow only, no label; "reduce motion" = a steady glow, no movement. Colour is by MEANING: gain green, loss red, never by place.
   kitStatFx(items,{src}) items = [{k, dv, name?, from?:{x,y}|DOMRect}]  (k = stat key of the top bar: sung danh suc bac duc sac tai tamco; other
   keys / relation words have no cell: label only).  kitStatGlow(cell,dv) = the glow alone (any cell/tile, e.g. person card numbers).      */
const KSF={q:[],busy:0,t:0,seen:{},labels:new Set(),glow:new WeakMap(),GAP:700,HOLD:1600,FLY:1100,PULSE:2600};
const KSF_CELL=()=>typeof KF_CELL==="object"?KF_CELL:{sung:"hud-sung",danh:"hud-danh",suc:"hud-suc",bac:"hud-bac",duc:"hud-duc",sac:"hud-sac",tai:"hud-tai",tamco:"hud-tamco"};
function ksfStill(){try{return typeof kfStill==="function"?kfStill():false}catch(e){return false}}
function ksfReduce(){try{return matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}}
function ksfName(k,n){if(n)return n;try{if(typeof NAMES==="object"&&NAMES[k])return NAMES[k]}catch(e){}try{const r=RKEYS.find(x=>x[0]===k);if(r)return r[1].replace(/ với ngươi$/,"")}catch(e){}return k}
function ksfCell(k){const id=KSF_CELL()[k];const c=id&&document.getElementById(id);if(!c)return null;const r=c.getBoundingClientRect();return r.width&&r.bottom>0&&r.top<innerHeight?c:null}
/* the glow: green for +, dim red for −; restarts if the cell is hit again; clears itself */
function kitStatGlow(c,dv){if(!c||!dv)return;const cls=dv>0?"ksf-g":"ksf-r",still=ksfReduce();const old=KSF.glow.get(c);if(old)clearTimeout(old);
 c.classList.remove("ksf-g","ksf-r","ksf-s");void c.offsetWidth;c.classList.add(cls);if(still)c.classList.add("ksf-s");
 KSF.glow.set(c,setTimeout(()=>{c.classList.remove("ksf-g","ksf-r","ksf-s");KSF.glow.delete(c)},KSF.PULSE+(still?-600:80)))}
function ksfLabel(txt,dv){const sp=document.createElement("span");sp.className="ksfl "+(dv>0?"g":"r");sp.textContent=txt;sp.setAttribute("aria-hidden","true");document.body.appendChild(sp);KSF.labels.add(sp);return sp}
function ksfDone(sp){try{sp.remove()}catch(e){}KSF.labels.delete(sp)}
function ksfCellName(c){try{const l=c&&c.querySelector(".kstl");return l?l.textContent.replace(/\s+/g," ").trim():""}catch(e){return""}}
/* the label names the stat as the TOP BAR shows it (the servant road's Sủng cell reads "Chủ tin") */
function ksfRun(it){const dv=it.dv,k=it.k,cell=ksfCell(k),txt=`${ksfCellName(cell)||ksfName(k,it.name)} ${dv>0?"+":"−"}${Math.abs(dv)}`;
 if(ksfStill()||ksfReduce()){if(cell)kitStatGlow(cell,dv);return}  /* Gọn / reduced motion: glow only */
 const sp=ksfLabel(txt,dv),w=sp.offsetWidth,h=sp.offsetHeight,vw=innerWidth;const cl=x=>Math.max(4,Math.min(vw-w-4,x));
 let cr=cell&&cell.getBoundingClientRect(),f=it.from;
 if(f&&f.width!=null&&f.left!=null)f={x:f.left+f.width/2,y:f.top};  /* a rect → its top centre */
 if(f){/* flies from where the change came from (the result card) to its cell */
  const x0=cl(f.x-w/2+(it.dx||0)),y0=Math.max(4,f.y-h-6);
  if(cr){const x1=cl(cr.left+cr.width/2-w/2),y1=cr.top+cr.height/2-h/2;
   const an=sp.animate([{transform:`translate(${x0}px,${y0+14}px) scale(.7)`,opacity:0},{transform:`translate(${x0}px,${y0-6}px) scale(1.12)`,opacity:1,offset:.12},
    {transform:`translate(${x0}px,${y0-10}px) scale(1.06)`,opacity:1,offset:.34},{transform:`translate(${x1}px,${y1}px) scale(1)`,opacity:1,offset:.9},{transform:`translate(${x1}px,${y1}px) scale(.8)`,opacity:0}],
    {duration:KSF.HOLD+KSF.FLY,easing:"cubic-bezier(.4,.05,.35,1)",fill:"both"});
   setTimeout(()=>kitStatGlow(cell,dv),(KSF.HOLD+KSF.FLY)*.88);an.onfinish=()=>ksfDone(sp);return}
  const an=sp.animate([{transform:`translate(${x0}px,${y0+14}px) scale(.7)`,opacity:0},{transform:`translate(${x0}px,${y0-6}px) scale(1.12)`,opacity:1,offset:.15},{transform:`translate(${x0}px,${y0-12}px) scale(1)`,opacity:1,offset:.8},{transform:`translate(${x0}px,${y0-24}px) scale(1)`,opacity:0}],{duration:KSF.HOLD+600,easing:"ease-out",fill:"both"});an.onfinish=()=>ksfDone(sp);return}
 /* a change with no card to fly from: the label appears under its cell (or mid-stage) and stays readable, the cell glows at once */
 let x,y;if(cr){x=cl(cr.left+cr.width/2-w/2);y=cr.bottom+6;kitStatGlow(cell,dv)}else{const st=document.getElementById("stage"),sr=st&&st.getBoundingClientRect();x=cl(sr?sr.left+sr.width/2-w/2:vw/2-w/2);y=sr?sr.top+sr.height*.35:innerHeight*.35}
 const an=sp.animate([{transform:`translate(${x}px,${y+8}px) scale(.7)`,opacity:0},{transform:`translate(${x}px,${y}px) scale(1.14)`,opacity:1,offset:.14},{transform:`translate(${x}px,${y}px) scale(1)`,opacity:1,offset:.8},{transform:`translate(${x}px,${y-10}px) scale(1)`,opacity:0}],{duration:KSF.HOLD+300,easing:"ease-out",fill:"both"});an.onfinish=()=>ksfDone(sp)}
function ksfPump(){if(KSF.t)return;const it=KSF.q.shift();if(!it){KSF.busy=0;return}KSF.busy=1;try{ksfRun(it)}catch(e){console.error(e)}KSF.t=setTimeout(()=>{KSF.t=0;ksfPump()},ksfStill()?250:it.src==="card"?950:KSF.GAP)}
function kitStatFx(list,o){o=o||{};const src=o.src||"x",now=Date.now();if(typeof quiet!=="undefined"&&quiet)return;if(window.__bot)return;
 for(const it of list||[]){if(!it||!it.dv||!it.k)continue;const key=it.k+":"+it.dv,s=KSF.seen[key];
  if(s&&now-s.t<2200&&s.src!==src)continue;  /* the same change announced by two paths (apply + result card / coin) shows once */
  KSF.seen[key]={t:now,src};it.src=src;KSF.q.push(it)}
 if(KSF.q.length>10)KSF.q.splice(0,KSF.q.length-10);ksfPump()}
/* tap anywhere skips what is queued and what is flying (the tap itself still goes through) */
function kitStatFxSkip(){KSF.q.length=0;clearTimeout(KSF.t);KSF.t=0;KSF.busy=0;KSF.labels.forEach(ksfDone)}
document.addEventListener("pointerdown",()=>{if(KSF.busy||KSF.labels.size)kitStatFxSkip()},true);
/* a number that changes inside a live cell / tile (person card, status sheet) glows too — kitStatSet calls this */
function kitStatDelta(c,before,after){const a=parseFloat(before),b=parseFloat(after);if(!c||!isFinite(a)||!isFinite(b)||a===b||ksfStill())return;if(!c.isConnected)return;kitStatGlow(c,b-a)}
window.kitStatFx=kitStatFx;window.kitStatGlow=kitStatGlow;window.kitStatFxSkip=kitStatFxSkip;window.kitStatDelta=kitStatDelta;
(function(){const st=document.createElement("style");st.textContent=`
.ksfl{position:fixed;left:0;top:0;z-index:9475;pointer-events:none;padding:3px 13px;border-radius:999px;font-weight:800;font-size:1.02rem;letter-spacing:.01em;white-space:nowrap;box-shadow:0 3px 10px #0003;will-change:transform,opacity}
.ksfl.g{background:#e3f4e0;color:#1f6b2f;border:1.5px solid #7fbf80}.ksfl.r{background:#f8e2de;color:#a3291c;border:1.5px solid #d9968b}
.ksf-g,.ksf-r{animation:ksfPulseG 2.6s ease-in-out}.ksf-r{animation-name:ksfPulseR}
@keyframes ksfPulseG{0%,28%,60%,100%{box-shadow:0 0 0 0 #3fa14a00}12%,44%,76%{box-shadow:0 0 0 2px #3fa14a,0 0 18px 3px #3fa14aaa;background-color:#e3f4e0}}
@keyframes ksfPulseR{0%,28%,60%,100%{box-shadow:0 0 0 0 #c0302000}12%,44%,76%{box-shadow:0 0 0 2px #c03020b0,0 0 14px 2px #c0302077;background-color:#f8e2de}}
.ksf-g>.kstv,.ksf-r>.kstv,.ksf-g>span:not(.kstv),.ksf-r>span:not(.kstv){display:inline-block;transform-origin:50% 60%;animation:ksfNum 2.6s ease-in-out}
.ksf-g>.kstv{color:#1f6b2f}.ksf-r>.kstv{color:#a3291c}
@keyframes ksfNum{0%,28%,60%,100%{transform:scale(1)}12%,44%,76%{transform:scale(1.15)}}
.ksf-s,.ksf-s>.kstv,.ksf-s>span{animation:none!important}.ksf-s.ksf-g{box-shadow:0 0 0 2px #3fa14a,0 0 14px #3fa14a99;background-color:#e3f4e0}.ksf-s.ksf-r{box-shadow:0 0 0 2px #c03020b0,0 0 10px #c0302066;background-color:#f8e2de}
/* the older hit classes (bag, coins, kèm) now share the same green/red glow */
.kfhit{animation:ksfPulseG 2.6s ease-in-out!important}.kfhit-r{animation:ksfPulseR 2.6s ease-in-out!important}
@media (prefers-reduced-motion:reduce){.ksfl{display:none!important}.ksf-g,.ksf-r{animation:none!important}}
`;document.head.appendChild(st)})();
/* kit sample page: tap a button, the label + glow play on the real top bar (needs the game running) */
setTimeout(()=>{try{if(window.KIT_SAMPLES)KIT_SAMPLES.push({id:"§57.1",title:"kitStatFx · số cộng/trừ đọc được: tên + số, ô sáng xanh (+) / đỏ (−), nhấp nháy 3 lần",
 html:()=>`<p>Bấm thử: nhãn “Danh +2” nổi lên đủ lâu để đọc, ô Danh trên thanh trên sáng xanh lá và nhấp nháy 3 lần, số phình ra một chút; trừ thì ô sáng đỏ nhạt. Nhiều thay đổi xếp hàng, bấm đâu cũng bỏ qua.</p>
 <p><button class="btn" onclick="kitStatFx([{k:'danh',dv:2}],{src:'kit'})">Danh +2</button> <button class="btn" onclick="kitStatFx([{k:'sung',dv:-3}],{src:'kit'})">Sủng −3</button> <button class="btn" onclick="kitStatFx([{k:'suc',dv:-5},{k:'bac',dv:30},{k:'tai',dv:1}],{src:'kit'})">Ba thay đổi liền</button></p>
 <p>Ô trong thẻ người: <span class="kst kst-chip" id="ksf-demo"><small class="kstl">Thiện cảm</small><span class="kstv">40</span></span> <button class="lnk" style="font-size:.95rem" onclick="const e=document.getElementById('ksf-demo');kitStatSet(e,+e.querySelector('.kstv').textContent+3)">+3</button> <button class="lnk" style="font-size:.95rem" onclick="const e=document.getElementById('ksf-demo');kitStatSet(e,+e.querySelector('.kstv').textContent-3)">−3</button></p>`})}catch(e){console.error(e)}},0);
