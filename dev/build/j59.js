
/* ================= j59: true human proportions on the stage; she is marked by a halo, not by size ================= */
/* Every full-body figure on the stage (her own #mefig and the people tokens) is sized by its VISIBLE body: the opaque
   bounding box of each fig-*.webp is read once through a canvas and cached, so empty margins in the art never change
   anyone's height. Adult women share one head-to-feet height, men are 7% taller, children shorter by age. Feet stand on
   one floor line. Her figure keeps the same height as everyone else and gets a soft golden aura instead (gentle pulse
   only when "Hiệu ứng hình" is on and the system does not ask for reduced motion). */
(function(){
const J59BB={},J59W={};const MANF=1.07,MEN={emperor:1,eunuch:1,official:1,physician:1,man:1};
function j59bb(src,cb){const o=J59BB[src];if(o)return o;if(J59W[src]){J59W[src].push(cb);return null}J59W[src]=[cb];
 const done=v=>{J59BB[src]=v;const L=J59W[src]||[];delete J59W[src];L.forEach(f=>{try{f()}catch(e){}})};
 const im=new Image();im.decoding="async";
 im.onload=()=>{let v={t:0,b:1,l:0,r:1};try{const nh=im.naturalHeight,nw=im.naturalWidth;if(nh&&nw){const h=Math.min(400,nh),w=Math.max(1,Math.round(nw*h/nh));const c=document.createElement("canvas");c.width=w;c.height=h;const x=c.getContext("2d",{willReadFrequently:true});x.drawImage(im,0,0,w,h);const d=x.getImageData(0,0,w,h).data;
   let t=h,b=-1,l=w,r=-1;for(let y=0;y<h;y++){const o=y*w*4;for(let i=0;i<w;i++){if(d[o+i*4+3]>40){if(y<t)t=y;if(y>b)b=y;if(i<l)l=i;if(i>r)r=i}}}
   if(b>=t&&r>=l&&(b-t)>h*.2)v={t:t/h,b:(b+1)/h,l:l/w,r:(r+1)/w}}}catch(e){}done(v)};
 im.onerror=()=>done({t:0,b:1,l:0,r:1});im.src=src;return null}
function j59age(p){try{const w=typeof figWho==="function"?figWho(p):p&&(p.ref||p);const a=w&&w.age;return typeof a==="number"?a:20}catch(e){return 20}}
function j59fac(src,p){const m=/fig-([a-z]+)-/.exec(src||"");let f=m&&MEN[m[1]]?MANF:1;const a=j59age(p);if(a<18)f*=Math.min(1,.55+.03*Math.max(1,a));return f}
let j59q=0;function j59sched(){if(j59q)return;j59q=requestAnimationFrame(()=>{j59q=0;j59lay()})}
/* KIT · rank halo colour: one source for "her rank colour" = RCOL (j1, same list the rank badges/frames use); lãnh cung = pale grey */
function haloColor(){try{if(S&&S.out)return"#cfd3d8";const k=S&&S.rank!=null?S.rank:0;return(typeof RCOL!=="undefined"&&RCOL[k])||"#f0d070"}catch(e){return"#f0d070"}}
window.haloColor=haloColor;
function j59clear(tk){if(tk){tk.classList.remove("j59st");["left","right","bottom","justifyContent","paddingLeft","paddingRight"].forEach(k=>tk.style[k]="")}}
function j59lay(force){const st=document.getElementById("stage");if(!st||!S)return;const tk=document.getElementById("tokens");const me=document.getElementById("mefig");
 st.classList.add("j59");st.classList.toggle("j59fx",!!(typeof OPT!=="undefined"&&OPT&&OPT.fxon));st.style.setProperty("--halo",haloColor());
 let au=document.getElementById("j59aura");if(!me&&au){au.remove();au=null}
 const imgs=tk?[...tk.querySelectorAll(".tok.fig .figimg")]:[];if(!me&&!imgs.length){j59clear(tk);return}
 const all=me?[me,...imgs]:imgs;let wait=false;
 for(const im of all){const s=im.getAttribute("src");if(!im.complete||!im.naturalWidth){wait=true;if(!im.dataset.j59l){im.dataset.j59l=1;im.addEventListener("load",j59sched)}}if(s&&!j59bb(s,j59sched))wait=true}
 if(wait)return;
 const R=st.getBoundingClientRect(),sH=R.height,sW=R.width;if(sH<60||sW<60)return;
 const ppl=typeof curPeople==="function"?curPeople():[];
 const it=imgs.map(im=>{const s=im.getAttribute("src"),b=J59BB[s],tok=im.closest(".tok");return{im,tok,tag:tok.querySelector(".tag"),b,f:j59fac(s,ppl[+tok.dataset.p]),ar:im.naturalWidth/im.naturalHeight}});
 const mb=me?J59BB[me.getAttribute("src")]:null,mar=me?me.naturalWidth/me.naturalHeight:0;
 const boxW=(x,h)=>h*x.f/(x.b.b-x.b.t)*x.ar;const gap=6;
 let fixed=0;if(tk)tk.querySelectorAll(".tok:not(.fig)").forEach(t=>fixed+=t.offsetWidth+gap);
 const meU=me?boxW({f:1,b:mb,ar:mar},1):0;const avail=sW-16;
 const total=(h,ov)=>fixed+it.reduce((a,x)=>a+boxW(x,h)+4+gap,0)+(me?meU*h*(1-ov)+gap:0);
 /* name tags sit under the feet (out of flow); crowded neighbours alternate between two rows so no name is cut */
 let topR=46;try{const t=document.getElementById("sc-t");if(t&&t.offsetHeight){const q=t.getBoundingClientRect();if(q.bottom>R.top&&q.bottom<R.top+sH*.3)topR=Math.max(46,q.bottom-R.top+6)}}catch(e){}
 const tagH=Math.max(16,...it.map(x=>x.tag?x.tag.offsetHeight:0));
 const place=(rows)=>{const fo=Math.max(sH*.04,rows*(tagH+3)+8);let H=Math.min(sH*.64,(sH-fo-topR)/MANF),ov=0;
  if(total(H,0)>avail){ov=me?.3:0;let lo=sH*.2,hi=H;if(total(lo,ov)>avail)H=lo;else{for(let k=0;k<20;k++){const m=(lo+hi)/2;if(total(m,ov)>avail)hi=m;else lo=m}H=lo}}return{fo,H,ov}};
 let P=place(1);const tw=it.map(x=>x.tag?x.tag.offsetWidth:0);let crowd=!!force;for(let i=1;i<it.length;i++){if((tw[i]+tw[i-1])/2+4>(boxW(it[i],P.H)+boxW(it[i-1],P.H))/2+4+gap)crowd=true}
 if(crowd)P=place(2);const {fo,H,ov}=P;
 if(tk){tk.classList.toggle("j59st",crowd);tk.style.setProperty("--j59r",(tagH+3)+"px");tk.style.bottom=fo.toFixed(1)+"px"}
 for(const x of it){x.im.style.setProperty("height",(H*x.f/(x.b.b-x.b.t)).toFixed(1)+"px","important");x.im.style.setProperty("width","auto","important");x.im.style.translate="";if(x.tag)x.tag.style.translate=""}
 let meH=0,meW=0;if(me){meH=H/(mb.b-mb.t);meW=meH*mar;me.style.setProperty("height",meH.toFixed(1)+"px","important")}
 if(tk){if(me){const x0=Math.max(8,(sW-total(H,ov))/2);me.style.left=(x0+meW/2).toFixed(1)+"px";tk.style.left=(x0+meW*(1-ov)+gap).toFixed(1)+"px";tk.style.right="auto";tk.style.justifyContent="flex-start";tk.style.paddingLeft=tk.style.paddingRight="0px"}
  else{tk.style.left=tk.style.right=tk.style.justifyContent=tk.style.paddingLeft=tk.style.paddingRight=""}}
 else if(me)me.style.left="";
 /* one floor line for everybody */
 const floorY=R.bottom-fo;
 it.forEach(x=>{const r=x.im.getBoundingClientRect();const d=floorY-(r.bottom-(1-x.b.b)*r.height);x.im.style.translate=Math.abs(d)>.5?"0 "+d.toFixed(1)+"px":"";
  if(x.tag){const t=x.tag.getBoundingClientRect();const s=t.left<R.left+4?R.left+4-t.left:t.right>R.right-4?R.right-4-t.right:0;if(s)x.tag.style.translate=s.toFixed(1)+"px 0"}});
 if(!crowd&&it.length>1){const tr=it.map(x=>x.tag&&x.tag.getBoundingClientRect());for(let i=1;i<tr.length;i++)if(tr[i]&&tr[i-1]&&tr[i].left<tr[i-1].right+4){j59lay(true);return}}
 if(me){me.style.bottom=(R.bottom-floorY-(1-mb.b)*meH).toFixed(1)+"px";
  if(!au){au=document.createElement("div");au.id="j59aura";au.setAttribute("aria-hidden","true")}if(au.nextSibling!==me||au.parentNode!==st)st.insertBefore(au,me);
  const vw=meW*(mb.r-mb.l)||meW;const cx=parseFloat(me.style.left)||sW/2;au.style.width=(vw*1.5).toFixed(1)+"px";au.style.height=(H*1.05).toFixed(1)+"px";au.style.left=(cx-vw*.75).toFixed(1)+"px";au.style.top=(floorY-R.top-H*1.03).toFixed(1)+"px"}}
/* KIT element "rank halo" (.halo-rank): soft aura in --halo (her rank colour) on her full figure only; pulse only with Hiệu ứng hình and no reduced motion */
const HG=(a,b,c)=>`drop-shadow(0 8px 8px #0006) drop-shadow(0 0 ${a}px color-mix(in srgb,var(--halo) 55%,#fff 45%)) drop-shadow(0 0 ${b}px color-mix(in srgb,var(--halo) ${c}%,transparent))`;
const css=document.createElement("style");css.textContent=`
.stage.j59{--halo:#f0d070}
.stage.j59 .tok.fig{max-width:none!important;flex:0 0 auto!important;min-width:0!important;position:relative;padding:0 2px}
.stage.j59 .tok.fig .figimg{max-height:none!important;max-width:none!important}
.stage.j59 .tok.fig .tag{position:absolute;top:100%;left:50%;margin:3px 0 0 0;transform:translateX(-50%);width:max-content;max-width:9.5em;white-space:normal!important;display:block!important;-webkit-line-clamp:unset!important;overflow:visible!important;text-overflow:clip!important;text-align:center;z-index:2}
.stage.j59 .tokens.j59st .tok.fig:nth-child(even) .tag{margin-top:calc(3px + var(--j59r,20px))}
.stage.j59 #mefig{max-height:none!important;filter:${HG(6,20,75)}}
#j59aura{position:absolute;z-index:0;pointer-events:none;border-radius:50%;background:radial-gradient(ellipse 50% 50% at 50% 42%,color-mix(in srgb,var(--halo) 55%,transparent),color-mix(in srgb,var(--halo) 22%,transparent) 55%,transparent 72%);opacity:.85}
@media (prefers-reduced-motion:no-preference){
.stage.j59.j59fx #mefig{animation:meidle 4.6s ease-in-out infinite,j59halo 3.8s ease-in-out infinite}
.stage.j59.j59fx #j59aura{animation:j59aura 3.8s ease-in-out infinite}}
@keyframes j59halo{0%,100%{filter:${HG(6,20,75)}}50%{filter:${HG(8,28,95)}}}
@keyframes j59aura{0%,100%{opacity:.7}50%{opacity:1}}`;document.head.appendChild(css);
const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{j59lay()}catch(e){}return r};
try{const st=document.getElementById("stage");if(st&&window.ResizeObserver)new ResizeObserver(j59sched).observe(st)}catch(e){}
addEventListener("resize",j59sched);
window.j59lay=j59lay;
})();
