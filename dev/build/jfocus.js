/* ================= jfocus: kitFocus — Dư đồ FOCUS VIEW (KIT §92; K-FOCUS-1 + K-FOCUS-1b; owner OD 21/11 ~06:20Z, ~06:50Z, ~06:55Z) =================
   ONE full-canvas focus layer for a person standing on the place stage: DIM + BLUR veil over the painting, the person's stage figure walks to the centre at
   the one XL size, group tabs above the head (same look as the person-card tabs), the acts fan out left/right of the figure as ONE button size per mode,
   the stage name tag (plate) under the feet, a SAY box at the bottom for NPC-initiated encounters, a PLAY layer over the figure for a mini-game.
   PURE DISPLAY: no game logic, no numbers of its own — counts / odds words / costs come in the data. Every knob is in KIT_FOC (like KIT_EMOSEAL).
   kitIdle  (K-FOCUS-1b): CSS-only idle life on every stage figure (breath / sway / rare head turn), per kind, off with reduced motion / «Cảnh động» off / Gọn.
   kitMoodSay(figEl,text,{seal}) (K-FOCUS-1b): ONE short rare bubble beside a figure's head.
   API:  const F=kitFocus.open({p,fig,from,plate,groups,group,onAct,onClose});  F.setGroup(k) · F.setGroups(G) · F.say(lines,{onDone}) · F.choices(list,onPick) · F.play({skip:{n,sub,onSkip},onBack}) · F.intro({title,rows,go,sub,onGo}) · F.hud(mark,clock)
         · F.endPlay() · F.react({seal,line,deltas}) · F.close() (animated) · F.destroy() (instant) · F.figRect().
   groups:[{k,n,can,tot,acts:[{id,n,pic,word,ton,off,why,info}]}]  (info = §6.3 rows html shown by the «!» popover; why = reason shown when the act is off).
   Test: dev/test/kit-focus.js. */
(function(){try{
const KIT_FOC=window.KIT_FOC=window.KIT_FOC||{
 veilMs:360,walkMs:700,tabsAt:600,tabsMs:200,fanMs:220,fanStagger:40,foldOpenMs:120,foldCloseMs:160,closeMs:600,veilOutMs:300,fadeMs:150,reactMs:1600,sayRiseMs:220,
 col:{kv1:236,kv2:300},btnH:{kv1:64,kv2:72},pic:{kv1:56,kv2:64},floorPad:{kv1:64,kv2:56},tabH:34,tabGap:8,headGap:8,colGap:12,
 motion:null /* test hook: true = ignore reduced motion */,
 idle:{breath:[3.6,4.4],breathKid:[2.8,3.2],sway:[7,9],turnEvery:[9000,15000],turnGapMs:4000,turnMs:1200,sayMs:3500,sayFadeMs:300,sayMax:22}};
const kv=()=>document.documentElement.classList.contains("kv2")?"kv2":"kv1";
const still=()=>{if(KIT_FOC.motion===true)return false;try{return matchMatchMedia()}catch(e){}return false};
function matchMatchMedia(){return matchMedia("(prefers-reduced-motion: reduce)").matches||(typeof OPT!=="undefined"&&OPT.fxon===false)||document.documentElement.classList.contains("kf-still")}
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let CUR=null;
function area(){const g=document.getElementById("game")||document.body,gr=g.getBoundingClientRect();const st=document.getElementById("stage"),bar=document.querySelector("nav.bar,.bar");
 const sr=st?st.getBoundingClientRect():{top:gr.top+163};const br=bar&&bar.getBoundingClientRect().height?bar.getBoundingClientRect():null;
 const top=Math.max(sr.top,gr.top)-gr.top,bot=(br?br.top:gr.bottom)-gr.top-6;return {g,left:4,top,w:gr.width-8,h:Math.max(200,bot-top)}}
function picHTML(a){const u=a.pic;if(u&&/^(https?:|img\/|data:)/.test(u))return `<img class="kfoc-pic" alt="" src="${esc(u)}" draggable="false">`;if(u&&/^</.test(u))return `<span class="kfoc-pic">${u}</span>`;return `<span class="kfoc-pic kfoc-ph" aria-hidden="true"></span>`}
/* sub-line parts: odds word, then «Tốn» + each cost of `ton` as its own unbreakable part («Tốn 2 khắc» · «Đức -2») */
function subParts(a){const t=a.ton?String(a.ton).split(/\s*·\s*/).filter(Boolean):[];return [a.word,...t.map((x,i)=>i?x:"Tốn "+x)].filter(Boolean)}
function btnHTML(a,i){const sub=[a.word,a.ton?("Tốn "+a.ton):""].filter(Boolean).join(" · ");
 const full=[a.n,sub].filter(Boolean).join(" · ");return `<button type="button" class="kfoc-b${a.off?" kfoc-off kitoff":""}${(a.info||a.off&&a.why)?" kfoc-hasi":""}" data-i="${i}" data-id="${esc(a.id)}" aria-label="${esc(full)}" title="${esc(full)}">${picHTML(a)}<span class="kfoc-t"><b>${esc(a.n)}</b>${sub?`<small>${subParts(a).map(x=>`<span>${esc(x)}</span>`).join(" · ")}</small>`:""}</span>${(a.info||a.off&&a.why)?`<span class="khap kfoc-i" role="button" tabindex="0" aria-label="Chi tiết">!</span>`:""}</button>`}
function fac(F){try{if(typeof j59fac==="function")return j59fac(F.src,F.p)||1}catch(e){}return 1}
function open(o){if(CUR)CUR.destroy();const A=area(),K=KIT_FOC,m=kv(),src=(o.fig&&(o.fig.currentSrc||o.fig.src))||(typeof o.fig==="string"?o.fig:"")||"";
 const F={o,A,m,src,p:o.p,groups:o.groups||[],group:o.group||(o.groups&&o.groups[0]&&o.groups[0].k),anims:[],open:true,playing:false};CUR=F;
 const el=F.el=document.createElement("div");el.className="kfoc kfoc-"+m;el.setAttribute("role","dialog");el.setAttribute("aria-label","Gặp riêng");
 el.style.cssText=`left:${A.left}px;top:${A.top}px;width:${A.w}px;height:${A.h}px`;
 el.innerHTML=`<div class="kfoc-bg" aria-hidden="true"></div><div class="kfoc-veil"></div><img class="kfoc-fig" alt="" draggable="false"><div class="kfoc-tabs pctabs"></div><div class="kfoc-col kfoc-l"></div><div class="kfoc-col kfoc-r"></div><div class="kfoc-plate"></div><div class="kfoc-play" hidden></div><div class="kfoc-hud kgame" hidden><span class="kgmk"></span><span class="kgclk"></span></div><div class="kfoc-say" hidden></div><div class="kfoc-skipw" hidden></div><button type="button" class="kit-x kfoc-x" aria-label="Lui" title="Lui">✕</button>`;
 try{const tk=o.fig&&o.fig.closest&&o.fig.closest(".tok");if(tk){F.tok=tk;F.tokVis=tk.style.visibility;tk.style.visibility="hidden"}}catch(e){}
 try{const si=document.getElementById("scimg");const bi=si&&(si.style.backgroundImage||getComputedStyle(si).backgroundImage);if(bi&&bi!=="none"){el.querySelector(".kfoc-bg").style.backgroundImage=bi;el.classList.add("kfoc-hasbg")}}catch(e){}
 if(still())el.classList.add("kfoc-still");
 A.g.appendChild(el);F.q=s=>el.querySelector(s);F.img=F.q(".kfoc-fig");F.tabs=F.q(".kfoc-tabs");F.cl=F.q(".kfoc-l");F.cr=F.q(".kfoc-r");F.plate=F.q(".kfoc-plate");
 F.img.src=src;
 const plate=o.plate||{};try{const p=o.p;F.plate.innerHTML=plate.html||(typeof j59tagHTML==="function"&&p?`<span class="kfoc-tag" style="--tc:${typeof j59col==="function"?j59col(p):"#5a6878"}">${j59tagHTML(p,p.name)}</span>`:`<span class="kfoc-tag"><span class="j59n">${esc(plate.name||"Người lạ")}</span></span>`)}catch(e){}
 const body=typeof kitFigBody==="function"&&src?kitFigBody(src,()=>{if(CUR===F&&F.open)layout(F)}):null;F.body=body;
 layout(F);build(F);
 F.q(".kfoc-x").addEventListener("click",()=>{if(F.playing){const ob=F.playO&&F.playO.onBack;if(ob){try{ob()}catch(e){}}if(F.playing)F.endPlay()}else F.close()});
 el.addEventListener("click",e=>{const b=e.target.closest(".kfoc-b");if(!b)return;const a=F.cur[+b.dataset.i];if(!a)return;
  if(e.target.closest(".kfoc-i")){e.stopPropagation();const sub=[a.word,a.ton?("Tốn "+a.ton):""].filter(Boolean).join(" · ");const head=b.classList.contains("kfoc-clamp")?`<div class="kpopt">${esc(a.n)}</div>${sub?`<p>${esc(sub)}</p>`:""}`:"";try{kpPop(b,head+(a.off&&a.why?`<div class="kpopt">${esc(a.why)}</div>`:"")+(a.info||""),{})}catch(x){}return}
  if(a.off){try{kpPop(b,`<div class="kpopt">${esc(a.why||"Chưa làm được")}</div>`,{})}catch(x){}return}
  if(F.pick){const f=F.pick;F.pick=null;f(a.id);return}
  if(o.onAct)o.onAct(a.id)});
 el.addEventListener("click",e=>{if(F.opening&&e.target.closest(".kfoc"))F.skipOpen()},true);
 F.setGroup=k=>setGroup(F,k);F.setGroups=G=>setGroups(F,G);F.say=(L,oo)=>say(F,L,oo||{});F.choices=(L,cb)=>choices(F,L,cb);F.play=oo=>playOn(F,oo||{});F.intro=oo=>intro(F,oo||{});F.endPlay=()=>playOff(F);F.hud=(mk,ck)=>hud(F,mk,ck);F.react=r=>react(F,r);
 F.close=()=>close(F);F.destroy=()=>destroy(F);F.figRect=()=>F.img.getBoundingClientRect();F.skipOpen=()=>{F.opening=false;[...F.anims].forEach(a=>{try{a.finish()}catch(e){}})};
 animateOpen(F);return F}
function layout(F){const K=KIT_FOC,A=F.A,m=F.m,v=F.body||{t:.02,b:.99,ar:.42,ht:.05},Z=typeof KIT_SIZE==="object"?KIT_SIZE.fig.XL:{h:398,cw:220};
 const H=Z.h*fac(F),ih=H/Math.max(.2,(v.b-v.t)),iw=ih*(v.ar||.42),cx=A.w/2,floor=A.h-K.floorPad[m];let top=floor-v.b*ih;
 const ht=(typeof kitFigTop==="function"?kitFigTop(v):v.t);const need=K.tabH+K.headGap+44;let head=top+ht*ih;if(head<need){top+=need-head;head=need}
 F.geo={cx,floor,ih,iw,top,head,cw:Z.cw,H};
 const s=F.img.style;s.left=(cx-iw/2)+"px";s.top=top+"px";s.width=iw+"px";s.height=ih+"px";
 const tb=F.tabs.style;tb.left="0";tb.right="0";tb.bottom=(A.h-(head-K.headGap))+"px";
 const cw=Math.min(K.col[m],Math.max(90,cx-(Z.cw/2+K.colGap)-4)),ctop=head-K.headGap+K.colGap-K.headGap;
 for(const [side,c] of [["l",F.cl],["r",F.cr]]){const cs=c.style;cs.width=cw+"px";cs.top=Math.max(0,head+4)+"px";cs.height=Math.max(60,floor-head-4)+"px";
  if(side==="l")cs.left=(cx-(Z.cw/2+K.colGap)-cw)+"px";else cs.left=(cx+(Z.cw/2+K.colGap))+"px"}
 F.plate.style.top=(floor+6)+"px";F.plate.style.left=cx+"px";
 const pl=F.q(".kfoc-play").style;pl.left=Math.max(0,cx-iw/2-40)+"px";pl.width=(iw+80)+"px";pl.top=top+"px";pl.height=ih+"px";
 el_btn(F);if(F.cur)clampMark(F)}
function el_btn(F){const h=KIT_FOC.btnH[F.m],p=KIT_FOC.pic[F.m];F.el.style.setProperty("--kfh",h+"px");F.el.style.setProperty("--kfp",p+"px")}
function build(F){const G=F.groups,g=G.find(x=>x.k===F.group)||G[0];F.cur=g?g.acts:[];
 F.tabs.innerHTML=G.length>1?G.map(x=>`<button type="button" class="pct${x.k===(g&&g.k)?" on":""}" data-k="${esc(x.k)}">${esc(x.n)}${x.tot!=null?` ${x.can!=null?x.can+"/":""}${x.tot}`:""}</button>`).join(""):"";
 F.tabs.onclick=e=>{const b=e.target.closest(".pct");if(b&&b.dataset.k!==F.group)setGroup(F,b.dataset.k)};
 fill(F,F.cur)}
function fill(F,list){const L=[],R=[];list.forEach((a,i)=>(i%2?R:L).push(btnHTML(a,i)));F.cl.innerHTML=L.join("");F.cr.innerHTML=R.join("");clampMark(F)}
/* text never cut: title max 2 lines (clamp) + the sub-line «odds word · Tốn N khắc» whose two parts never break inside (nowrap spans), so on a narrow column it takes 2 lines and the price is never cut; a clamped button gets the «!» so the full name + sub-line show in the popover (aria/title carry it too) */
function clampMark(F){F.el.querySelectorAll(".kfoc-b:not(.kfoc-skip)").forEach(b=>{const t=b.querySelector("b"),s=b.querySelector("small");b.classList.remove("kfoc-sub3");if(s&&s.scrollHeight>s.clientHeight+1)b.classList.add("kfoc-sub3")/* a sub-line of 3 lines (2 costs on a narrow column): title gives up its 2nd line, the price is never cut */;const cut=(t&&t.scrollHeight>t.clientHeight+1)||(s&&s.scrollWidth>s.clientWidth+1);
  b.classList.toggle("kfoc-clamp",!!cut);if(cut&&!b.querySelector(".kfoc-i")){b.classList.add("kfoc-hasi");b.insertAdjacentHTML("beforeend",`<span class="khap kfoc-i" role="button" tabindex="0" aria-label="Chi tiết">!</span>`)}})}
/* replace the groups (caller's live counts); keeps the current group if it still exists; no fold animation; during choices/play the acts wait until play/choices end */
function setGroups(F,G){F.groups=G||[];if(!F.groups.find(x=>x.k===F.group))F.group=F.groups[0]&&F.groups[0].k;if(F.pick||F.playing){F.saved=1;return}build(F)}
function wa(F,el,kf,opt){if(!el.animate)return null;const a=el.animate(kf,Object.assign({fill:"both"},opt));F.anims.push(a);a.onfinish=()=>{const i=F.anims.indexOf(a);if(i>=0)F.anims.splice(i,1)};return a}
function feetDelta(F){const f=F.o.from,r=F.img.getBoundingClientRect();if(!f)return null;const s=f.height/Math.max(1,r.height);return {dx:(f.left+f.width/2)-(r.left+r.width/2),dy:f.bottom-r.bottom,s}}
function animateOpen(F){const K=KIT_FOC,veil=F.q(".kfoc-veil");F.opening=true;const done=()=>{F.opening=false};
 if(still()){wa(F,F.el,[{opacity:0},{opacity:1}],{duration:K.fadeMs}).onfinish=done;return}
 wa(F,veil,[{opacity:0},{opacity:1}],{duration:K.veilMs,easing:"ease-out"});
 const d=feetDelta(F);F.img.style.transformOrigin="50% 100%";
 if(d){const P=n=>({dx:d.dx*(1-n),dy:d.dy*(1-n),s:d.s+(1-d.s)*n}),T=(n,up)=>{const q=P(n);return `translate(${q.dx}px,${q.dy-(up||0)}px) scale(${q.s})`};
  wa(F,F.img,[{transform:T(0),offset:0},{transform:T(.25,8),offset:.25},{transform:T(.5),offset:.5},{transform:T(.75,8),offset:.75},{transform:T(1),offset:1}],{duration:K.walkMs,easing:"cubic-bezier(.2,.7,.2,1)"})}
 else wa(F,F.img,[{opacity:0},{opacity:1}],{duration:K.walkMs});
 wa(F,F.plate,[{opacity:0},{opacity:1}],{duration:K.tabsMs,delay:K.walkMs*.85});
 wa(F,F.tabs,[{opacity:0,translate:"0 -6px"},{opacity:1,translate:"0 0"}],{duration:K.tabsMs,delay:K.tabsAt});
 fan(F,K.walkMs*.85);setTimeout(done,K.walkMs+K.fanStagger*8+K.fanMs)}
function fan(F,delay){const K=KIT_FOC;if(still())return;const bs=[...F.cl.querySelectorAll(".kfoc-b"),...F.cr.querySelectorAll(".kfoc-b")].sort((a,b)=>(+a.dataset.i)-(+b.dataset.i));
 const cx=F.geo.cx;bs.forEach((b,n)=>{const r=b.getBoundingClientRect(),er=F.el.getBoundingClientRect();const dx=(er.left+cx)-(r.left+r.width/2);wa(F,b,[{opacity:0,transform:`translateX(${dx}px) scale(.85)`},{opacity:1,transform:"none"}],{duration:K.fanMs,delay:delay+n*K.fanStagger,easing:"cubic-bezier(.2,.7,.2,1)"})})}
function setGroup(F,k){if(!F.open||k===F.group)return;const K=KIT_FOC;F.group=k;const swap=()=>{build(F);fan2(F)};
 if(still()){swap();return}
 const bs=[...F.el.querySelectorAll(".kfoc-b")];bs.forEach(b=>wa(F,b,[{opacity:1},{opacity:0,transform:"scale(.9)"}],{duration:K.foldOpenMs}));setTimeout(()=>{if(F.open)swap()},K.foldOpenMs)}
function fan2(F){const K=KIT_FOC;if(still())return;[...F.el.querySelectorAll(".kfoc-b")].forEach((b,n)=>wa(F,b,[{opacity:0,transform:"scale(.9)"},{opacity:1,transform:"none"}],{duration:K.fanMs,delay:n*K.fanStagger*.5}))}
function say(F,L,oo){const box=F.q(".kfoc-say");const lines=(L||[]).slice();let i=0;F.cl.classList.add("kfoc-fold");F.cr.classList.add("kfoc-fold");F.plate.hidden=true;
 const show=()=>{const l=lines[i];if(!l){box.hidden=true;F.plate.hidden=false;F.cl.classList.remove("kfoc-fold");F.cr.classList.remove("kfoc-fold");sayLift(F,0);if(oo.onDone)oo.onDone();return}
  const face=l.face&&typeof kitFaceH==="function"?kitFaceH(l.face,"xs"):"";const last=i===lines.length-1;
  box.innerHTML=`<span class="kfoc-sayf">${face}</span><span class="kfoc-sayn">${esc(l.who||"")}</span><p>${esc(l.text)}</p><button type="button" class="kfoc-next">${last?"Tiếp ▸":"Tiếp ▸"}</button>`;box.hidden=false;
  if(!still())wa(F,box,[{opacity:0,translate:"0 12px"},{opacity:1,translate:"0 0"}],{duration:KIT_FOC.sayRiseMs});
  sayLift(F,1);box.querySelector(".kfoc-next").onclick=()=>{i++;show()}};
 const go=()=>show();if(F.opening)setTimeout(go,KIT_FOC.walkMs);else go()}
/* SAY box never covers the figure: while it shows, the tabs hide and the figure (individual `translate`, composes with the walk transform) rises by the overlap, never above the layer top */
function sayLift(F,on){const box=F.q(".kfoc-say");let dy=0;if(on&&!box.hidden){const bt=box.offsetTop,feet=F.geo.floor+4;dy=Math.max(0,Math.min(feet-bt,F.geo.top+F.geo.ih*(F.body?F.body.t:.02)-4))}
  F.tabs.style.visibility=dy?"hidden":"";F.img.style.translate=dy?`0 ${-dy}px`:"";F.lift=dy}
function choices(F,L,cb){sayLift(F,0);const box=F.q(".kfoc-say");box.hidden=true;F.plate.hidden=false;F.cur=L;F.pick=cb;fill(F,L);F.cl.classList.remove("kfoc-fold");F.cr.classList.remove("kfoc-fold");fan2(F)}
function playOn(F,oo){F.playing=true;F.playO=oo;const sw=F.q(".kfoc-skipw");sw.innerHTML="";sw.hidden=true;
  if(oo.skip){const k=oo.skip;sw.innerHTML=`<button type="button" class="kfoc-b kfoc-skip" aria-label="${esc([k.n,k.sub].filter(Boolean).join(" · "))}"><span class="kfoc-t"><b>${esc(k.n||"Làm luôn")}</b>${k.sub?`<small>${esc(k.sub)}</small>`:""}</span></button>`;sw.hidden=false;
   sw.firstChild.onclick=e=>{e.stopPropagation();try{if(k.onSkip)k.onSkip()}catch(x){}}}
F.cl.classList.add("kfoc-fold");F.cr.classList.add("kfoc-fold");F.tabs.hidden=true;F.plate.hidden=true;const pl=F.q(".kfoc-play");pl.hidden=false;pl.innerHTML="";document.documentElement.classList.add("kfoc-playing");
 const x=F.q(".kfoc-x");x.classList.add("kfoc-back");x.textContent="◂";x.setAttribute("aria-label","Quay lại");x.title="Quay lại";return pl}
/* KIT §92.4 (review/kit-mg-intro) RULES CARD IN THE PLAY LAYER: F.intro({title,rows:[[label,text,cls]],go:"Sẵn sàng",sub:"bắt đầu chơi",onGo}) — call it right after F.play(): the same «Luật chơi · <title>» block the Điểm trang rules screen (kgReady, j82) shows
   (kit heading .kpst + kit rows kg82Rows + kit button .kgr-go), centred in the focus view (the play layer itself is only the figure's width; the card is a child of the focus root, removed when the play ends), ONE-line title, closes itself on go. The skip button F.play({skip}) already gives («Bỏ qua · kết quả thường») stays on top. Private card frames are forbidden (OD:L491): every
   mini-game that has a first «rules» screen on a figure calls this. Returns the card element (null when the layer is not up). */
function intro(F,o){try{if(!F.playing)return null;const host=F.el;const old=host.querySelector(":scope > .kfoc-intro");if(old)old.remove();
 const rows=(o.rows||[]).map(r=>[r[0],r[1],r[2]||"t"]);const rh=typeof kg82Rows==="function"?kg82Rows(rows):rows.map(r=>`<p><b>${esc(r[0])}</b> ${esc(r[1])}</p>`).join("");
 const bc=typeof kg82Btn==="function"?kg82Btn(false):"kbtn";
 const el=document.createElement("div");el.className="kgr kfoc-intro";
 el.innerHTML=`<h4 class="kpst">Luật chơi · ${esc(o.title||"")}</h4>${rh}<button type="button" class="${bc} kgr-go kfoc-introgo">${esc(o.go||"Sẵn sàng")}${o.sub?`<small>${esc(o.sub)}</small>`:""}</button>`;
 host.appendChild(el);const b=el.querySelector(".kfoc-introgo");b.onclick=e=>{e.stopPropagation();el.remove();try{if(o.onGo)o.onGo()}catch(x){console.error("kitFocus.intro",x)}};return el}catch(e){console.error("kitFocus.intro",e);return null}}
function playOff(F){if(!F.playing)return;F.playing=false;F.playO=null;const sw=F.q(".kfoc-skipw");sw.hidden=true;sw.innerHTML="";if(F.saved&&!F.pick){F.saved=null;build(F)}const pl=F.q(".kfoc-play");pl.hidden=true;pl.innerHTML="";const ic=F.el.querySelector(":scope > .kfoc-intro");if(ic)ic.remove();document.documentElement.classList.remove("kfoc-playing");F.q(".kfoc-hud").hidden=true;F.cl.classList.remove("kfoc-fold");F.cr.classList.remove("kfoc-fold");F.tabs.hidden=false;F.plate.hidden=false;
 const x=F.q(".kfoc-x");x.classList.remove("kfoc-back");x.textContent="✕";x.setAttribute("aria-label","Lui");x.title="Lui"}
function hud(F,mk,ck){const h=F.q(".kfoc-hud");h.hidden=false;try{if(mk!=null)kitGameMark(mk);if(ck!=null)kitGameClock(ck)}catch(e){}}
function react(F,r){r=r||{};try{if(r.seal&&typeof kitEmoSeal==="object"&&kitEmoSeal.lean)kitEmoSeal.lean(F.img)}catch(e){}
 if(r.line)kitMoodSay(F.img,r.line,{seal:r.seal,hold:KIT_FOC.reactMs});
 (r.deltas||[]).forEach((d,i)=>{const s=document.createElement("span");s.className="kfoc-delta";s.innerHTML=typeof chip==="function"?chip(esc(d.t||d),d.cls||""):esc(d.t||d);const g=F.geo;s.style.left=(g.cx+(i-(r.deltas.length-1)/2)*70)+"px";s.style.top=(g.top+g.ih*.45)+"px";F.el.appendChild(s);
  if(still()||!s.animate){setTimeout(()=>s.remove(),KIT_FOC.reactMs);return}
  const a=s.animate([{opacity:0,transform:"translate(-50%,0)"},{opacity:1,transform:"translate(-50%,-18px)",offset:.2},{opacity:1,transform:"translate(-50%,-46px)",offset:.75},{opacity:0,transform:"translate(-50%,-60px)"}],{duration:KIT_FOC.reactMs,delay:i*120});a.onfinish=()=>s.remove()})}
function close(F){if(!F.open)return;const K=KIT_FOC;F.open=false;F.skipOpen();
 if(still()){const a=wa(F,F.el,[{opacity:1},{opacity:0}],{duration:K.fadeMs});if(a)a.onfinish=()=>destroy(F,1);else destroy(F,1);return}
 [...F.el.querySelectorAll(".kfoc-b")].forEach(b=>wa(F,b,[{opacity:1},{opacity:0,transform:"scale(.85)"}],{duration:K.foldCloseMs}));wa(F,F.tabs,[{opacity:1},{opacity:0}],{duration:K.foldCloseMs});wa(F,F.plate,[{opacity:1},{opacity:0}],{duration:K.foldCloseMs});
 const d=feetDelta(F);F.img.style.transformOrigin="50% 100%";
 if(d){const T=(n,up)=>`translate(${d.dx*n}px,${d.dy*n-(up||0)}px) scale(${1+(d.s-1)*n})`;wa(F,F.img,[{transform:T(0),offset:0},{transform:T(.25,8),offset:.25},{transform:T(.5),offset:.5},{transform:T(.75,8),offset:.75},{transform:T(1),offset:1}],{duration:K.closeMs,delay:K.foldCloseMs*.5,easing:"cubic-bezier(.2,.7,.2,1)"})}
 wa(F,F.q(".kfoc-veil"),[{opacity:1},{opacity:0}],{duration:K.veilOutMs,delay:Math.max(0,K.closeMs-K.veilOutMs)});
 setTimeout(()=>destroy(F,1),K.closeMs+K.foldCloseMs*.5+40)}
function destroy(F,fromClose){if(!F||F.gone)return;F.gone=true;if(F.playing)document.documentElement.classList.remove("kfoc-playing");F.open=false;[...F.anims].forEach(a=>{try{a.cancel()}catch(e){}});F.el.remove();try{if(F.tok)F.tok.style.visibility=F.tokVis||""}catch(e){}if(CUR===F)CUR=null;try{if(F.o.onClose)F.o.onClose()}catch(e){}}
window.kitFocus={open,current:()=>CUR,reposition:()=>{if(CUR&&CUR.open){CUR.A=area();const A=CUR.A;CUR.el.style.cssText=`left:${A.left}px;top:${A.top}px;width:${A.w}px;height:${A.h}px`;layout(CUR)}}};
try{addEventListener("resize",()=>kitFocus.reposition())}catch(e){}

/* ---------- kitMoodSay: ONE short bubble beside a figure's head (K-FOCUS-1b) ---------- */
let SAYB=null,SAYT=0;
function kitMoodSay(figEl,text,o){o=o||{};try{if(!figEl||!figEl.isConnected||!text)return null;const I=KIT_FOC.idle;if(SAYB){SAYB.remove();clearTimeout(SAYT);SAYB=null}
 const host=figEl.closest("#game")||document.body,hr=host.getBoundingClientRect(),r=figEl.getBoundingClientRect();if(!r.width)return null;
 let t=String(text);const b=document.createElement("div");b.className="kfoc-mood";b.setAttribute("role","status");b.textContent=t;host.appendChild(b);
 const v=window.__KITFB&&window.__KITFB[figEl.currentSrc||figEl.src];const ht=v&&v.v&&typeof kitFigTop==="function"?kitFigTop(v.v):.06;
 const hy=r.top+ht*r.height-hr.top,right=(r.left+r.width/2)<(hr.left+hr.width/2);const bw=Math.min(190,Math.max(90,t.length*8+24));
 b.style.width="max-content";b.style.maxWidth=bw+"px";b.style.top=Math.max(8,hy-4)+"px";
 if(right){b.style.left=(r.left+r.width*.62-hr.left)+"px";b.classList.add("kfoc-mr")}else{b.style.left=Math.max(4,(r.left+r.width*.38-hr.left)-b.offsetWidth)+"px";b.classList.add("kfoc-ml")}
 const hold=o.hold||I.sayMs;if(!still()&&b.animate)b.animate([{opacity:0,transform:"translateY(6px)"},{opacity:1,transform:"none"}],{duration:220});
 b.addEventListener("click",()=>{b.remove();if(SAYB===b)SAYB=null});SAYB=b;
 try{if(o.seal&&typeof kitEmoSeal==="object"&&kitEmoSeal.lean)kitEmoSeal.lean(figEl)}catch(e){}
 SAYT=setTimeout(()=>{if(!b.isConnected)return;if(b.animate&&!still()){const a=b.animate([{opacity:1},{opacity:0}],{duration:I.sayFadeMs});a.onfinish=()=>b.remove()}else b.remove();if(SAYB===b)SAYB=null},hold);return b}catch(e){return null}}
window.kitMoodSay=kitMoodSay;

/* ---------- kitIdle: CSS idle life on every stage figure (K-FOCUS-1b) ---------- */
const rnd=(a,b)=>a+Math.random()*(b-a);
function kindOf(tok){let p=null;try{const ps=typeof curPeople==="function"?curPeople():null;p=ps&&ps[+tok.dataset.p]}catch(e){}if(!p)return "woman";if(p.kind==="emp")return "emp";const age=+p.age||0;if(p.kind==="kid"||p.kid||(age&&age<12))return "kid";if(p.sex==="m"||p.male||/^(eun|tg|ofc|off|min|gd|guard|th)/.test(String(p.kind||""))&&p.kind!=="th")return "man";return "woman"}
function idleScan(){try{const I=KIT_FOC.idle;document.querySelectorAll("#tokens .tok.fig img.figimg").forEach(im=>{const tok=im.closest(".tok");if(!tok)return;const k=kindOf(tok);if(im.dataset.kidl===k)return;im.dataset.kidl=k;im.classList.add("kidl");
  const b=k==="kid"?I.breathKid:I.breath,sw=I.sway;im.style.setProperty("--kidl-b",rnd(b[0],b[1]).toFixed(2)+"s");im.style.setProperty("--kidl-bd","-"+rnd(0,4).toFixed(2)+"s");im.style.setProperty("--kidl-s",rnd(sw[0],sw[1]).toFixed(2)+"s");im.style.setProperty("--kidl-sd","-"+rnd(0,8).toFixed(2)+"s");im.classList.toggle("kidl-sway",k==="woman"||k==="kid")})}catch(e){}}
let TURN=0,LASTTURN=0;
function turnLoop(){clearTimeout(TURN);const I=KIT_FOC.idle;TURN=setTimeout(()=>{try{if(!still()&&!CUR&&!document.hidden){const A=[...document.querySelectorAll("#tokens .tok.fig img.kidl")].filter(im=>im.getClientRects().length&&im.dataset.kidl!=="emp"&&im.dataset.kidl!=="kid"&&!document.querySelector(".kidl-turn")&&Date.now()-LASTTURN>I.turnGapMs);
   if(A.length){const im=A[Math.floor(Math.random()*A.length)],r=im.getBoundingClientRect(),host=document.getElementById("stage").getBoundingClientRect(),dir=(r.left+r.width/2)<(host.left+host.width/2)?1:-1;im.style.setProperty("--kidl-dx",(2*dir)+"px");im.style.setProperty("--kidl-r",(.8*dir)+"deg");im.classList.add("kidl-turn");LASTTURN=Date.now();setTimeout(()=>im.classList.remove("kidl-turn"),I.turnMs)}}}catch(e){}turnLoop()},rnd(I.turnEvery[0],I.turnEvery[1]))}
let IDT=0;try{const mo=new MutationObserver(()=>{clearTimeout(IDT);IDT=setTimeout(idleScan,300)});const st=document.getElementById("stage");if(st)mo.observe(st,{childList:true,subtree:true});idleScan();turnLoop()}catch(e){}
window.kitIdle={scan:idleScan};

const css=document.createElement("style");css.id="kit-focus";css.textContent=`
.kfoc{position:absolute;z-index:46;overflow:hidden;border-radius:10px;touch-action:manipulation}
.kfoc-bg{position:absolute;inset:-12px;background-size:cover;background-position:center;filter:blur(6px)}.kfoc-still .kfoc-bg,html.kf-still .kfoc-bg{filter:none;inset:0}
.kfoc-veil{position:absolute;inset:0;background:rgba(20,12,8,.62);-webkit-backdrop-filter:blur(6px) brightness(.45);backdrop-filter:blur(6px) brightness(.45)}
.kfoc-hasbg .kfoc-veil{-webkit-backdrop-filter:none;backdrop-filter:none;background:rgba(20,12,8,.55)}
html.kf-still .kfoc-veil{-webkit-backdrop-filter:none;backdrop-filter:none;background:rgba(20,12,8,.62)}
.kfoc-fig{position:absolute;display:block;max-width:none!important;max-height:none!important;user-select:none;-webkit-user-drag:none;filter:drop-shadow(0 8px 10px rgba(0,0,0,.35))}
.kfoc-tabs{position:absolute;display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:${KIT_FOC.tabGap}px;padding:0 10px;margin:0;z-index:3}
.kfoc-tabs .pct{height:${KIT_FOC.tabH}px;white-space:nowrap}
.kfoc-col{position:absolute;box-sizing:border-box;padding:9px 7px 4px 5px;display:flex;flex-direction:column;gap:8px;overflow-y:auto;overflow-x:hidden;overscroll-behavior:contain;z-index:3;scrollbar-width:none}.kfoc-col::-webkit-scrollbar{display:none}
.kfoc-col.kfoc-fold{display:none}
.kfoc-b{position:relative;flex:none;display:flex;align-items:center;gap:8px;width:100%;height:var(--kfh,64px);min-height:var(--kfh,64px);box-sizing:border-box;padding:2px 8px 2px 4px;border-radius:10px;border:1px solid var(--gold,#b8892b);background:var(--k-card,#fffaf0);color:var(--ink,#3a2418);text-align:left;font:inherit;cursor:pointer;box-shadow:inset 0 0 0 2px var(--k-card,#fffaf0),0 2px 6px rgba(0,0,0,.25)}
.kfoc-pic{flex:none;width:var(--kfp,56px);height:var(--kfp,56px);border-radius:8px;object-fit:cover;display:block;background:#efe3c8;overflow:hidden}
.kfoc-ph{background:repeating-linear-gradient(45deg,#efe3c8,#efe3c8 6px,#e8d9b8 6px,#e8d9b8 12px)}
.kfoc-t{min-width:0;display:flex;flex-direction:column;justify-content:center;gap:0;line-height:1.1}.kfoc-t b{font-size:.84rem;font-weight:800;white-space:normal;overflow-wrap:break-word;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;max-height:2.2em}.kfoc-t small{display:block;font-size:.72rem;color:var(--dim,#7a6a58);white-space:normal;overflow:hidden;max-height:2.2em}.kfoc-t small span{white-space:nowrap}.kfoc-b.kfoc-sub3 .kfoc-t small{max-height:3.3em}.kfoc-b.kfoc-sub3 .kfoc-t b{-webkit-line-clamp:1;max-height:1.1em}
.kfoc-b.kfoc-hasi{padding-right:20px}
.kfoc-intro{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:min(92%,460px);max-height:90%;z-index:5;display:flex;flex-direction:column;align-items:center;gap:10px;padding:14px;z-index:3;overflow:auto;box-sizing:border-box;background:var(--k-card,#fffaf0);color:var(--ink,#3a2418);border:1px solid var(--gold,#b8892b);border-radius:14px;box-shadow:0 6px 24px rgba(0,0,0,.35)}
.kfoc-intro.kgr{background:var(--k-card,#fffaf0)!important;opacity:1!important}
.kfoc-intro .kpst{white-space:nowrap;margin:0}
/* KIT §92.4: the fixed particle / weather / fx layers (z 9440-9470) never cover a rules card or the skip button: hidden while a kitFocus play layer is up (class on <html>, no :has() — it cost tab time) */
html.kfoc-playing #kfxcv,html.kfoc-playing .kfx-fl,html.kfoc-playing .kfxk,html.kfoc-playing .kfrip{visibility:hidden!important}
.kfoc-skipw{position:absolute;left:50%;bottom:10px;transform:translateX(-50%);z-index:6}.kfoc-skipw .kfoc-skip{width:auto;min-width:150px;max-width:280px;padding:4px 18px;justify-content:center;text-align:center;background:#fff3c4}
.kfoc-b .kfoc-i{position:absolute;top:-6px;right:-4px}
.kfoc-b.kfoc-off{filter:grayscale(.85);opacity:.78}
.kfoc-plate{position:absolute;transform:translateX(-50%);z-index:2;pointer-events:none;text-align:center}
.kfoc-tag{display:inline-block;width:max-content;max-width:90vw;text-align:center}
.kfoc-tag .j59t{display:block;font-size:.66rem;line-height:1.15;font-weight:600;color:var(--ink,#3a2418);background:color-mix(in srgb,var(--tc,#5a6878) 22%,#fffaf0);box-shadow:inset 3px 0 0 var(--tc,#5a6878);border-radius:6px;padding:0 4px 0 7px;margin:0 -2px 1px}
.kfoc-tag .j59n{display:block;line-height:1.2;font-weight:800;color:#fff;text-shadow:0 1px 3px rgba(0,0,0,.7)}
.kfoc-play{position:absolute;z-index:4}
.kfoc-hud{position:absolute;left:56px;right:56px;top:0;display:flex;justify-content:center;gap:10px;padding:6px;z-index:5}
.kfoc-say{position:absolute;left:12px;right:12px;bottom:10px;margin:0 auto;max-width:760px;min-height:84px;max-height:132px;box-sizing:border-box;padding:18px 14px 10px 76px;border-radius:12px;border:1px solid var(--gold,#b8892b);background:var(--k-card,#fffaf0);color:var(--ink,#3a2418);z-index:6;box-shadow:0 4px 14px rgba(0,0,0,.35)}
.kfoc-say p{margin:0;font-size:.95rem;line-height:1.35;}
.kfoc-say p{max-height:none;display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
.kfoc-sayf{position:absolute;left:10px;top:12px}
.kfoc-sayn{position:absolute;left:12px;top:-12px;padding:1px 10px;border-radius:999px;background:var(--gold,#b8892b);color:#fff;font-weight:800;font-size:.8rem}
.kfoc-next{position:absolute;right:10px;bottom:8px;min-height:32px;padding:2px 14px;border-radius:8px;border:1px solid var(--gold,#b8892b);background:#fff3c4;font:700 .85rem inherit;color:var(--ink,#3a2418);cursor:pointer}
.kfoc-x{position:absolute!important;top:6px;right:6px;z-index:8;min-width:44px;min-height:44px}
.kfoc-delta{position:absolute;z-index:7;pointer-events:none;transform:translate(-50%,0)}
.kfoc-mood{position:absolute;z-index:47;padding:5px 10px;border-radius:12px;background:#fffaf0;border:1px solid var(--gold,#b8892b);color:var(--ink,#3a2418);font-size:.8rem;line-height:1.25;box-shadow:0 2px 8px rgba(0,0,0,.3);cursor:pointer;overflow-wrap:anywhere}
.kfoc-mood::after{content:"";position:absolute;bottom:-6px;width:10px;height:10px;background:#fffaf0;border:1px solid var(--gold,#b8892b);border-top:0;border-left:0;transform:rotate(45deg)}
.kfoc-mr::after{left:12px}.kfoc-ml::after{right:12px}
/* kitIdle: individual transform properties (the stage already pins transform:none on figures) */
@keyframes kidl-b{from{scale:1 1}to{scale:1 1.006}}@keyframes kidl-s{from{rotate:-.35deg}to{rotate:.35deg}}@keyframes kidl-t{0%{rotate:0deg;translate:0 0}25%,70%{rotate:var(--kidl-r,.8deg);translate:var(--kidl-dx,2px) 0}100%{rotate:0deg;translate:0 0}}
#tokens .tok.fig img.kidl{transform-origin:50% 100%;animation:kidl-b var(--kidl-b,4s) ease-in-out var(--kidl-bd,0s) infinite alternate}
#tokens .tok.fig img.kidl.kidl-sway{animation:kidl-b var(--kidl-b,4s) ease-in-out var(--kidl-bd,0s) infinite alternate,kidl-s var(--kidl-s,8s) ease-in-out var(--kidl-sd,0s) infinite alternate}
#tokens .tok.fig img.kidl.kidl-turn{animation:kidl-b var(--kidl-b,4s) ease-in-out var(--kidl-bd,0s) infinite alternate,kidl-t 1.2s ease-in-out 1}
html.kf-still #tokens .tok.fig img.kidl,.kf-off #tokens .tok.fig img.kidl{animation:none!important}
@media (prefers-reduced-motion:reduce){#tokens .tok.fig img.kidl{animation:none!important}}
`;document.head.appendChild(css);
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§92",title:"kitFocus · gặp riêng một người trên sân khấu (khung focus + quạt nút trái/phải + bảng tên) · kitIdle · kitMoodSay",
 html:()=>`<div class="kitpg-row"><p>Mở bằng <code>kitFocus.open({p,fig,from,plate,groups,onAct,onClose})</code> trên sân khấu Dư đồ; nút chỉ có một cỡ mỗi chế độ (cao 64 Fold / 72 iPad), tab nhóm đặt trên đầu, «!» mở chi tiết. Không có mẫu tĩnh: xem <code>dev/test/kit-focus.js</code>.</p></div>`})}catch(e){}
}catch(e){console.error("jfocus",e)}})();

/* KIT §92.4 sample (kit page): the focus rules card, static */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§92.4",title:"kitFocus.intro · thẻ «Luật chơi» trong màn Dư đồ focus (Sẵn sàng + Bỏ qua · kết quả thường)",where:"mọi trò tài nghệ chơi trên hình người trong màn focus (Vuốt, Chạm liên tục, Chạm đúng nhịp, Kéo, Giữ …): F.play({skip}) rồi F.intro({title,rows,onGo}); thẻ cùng kiểu «Luật chơi» của Điểm trang (kgReady); lớp hiệu ứng cố định ẩn khi đang chơi",
 html:()=>`<div class="kgr kfoc-intro" style="position:static;transform:none;margin:0 auto"><h4 class="kpst">Luật chơi · Chạm đúng nhịp</h4>${typeof kg82Rows==="function"?kg82Rows([["Việc","Ôm đàn cho Nhụy phi","t"],["Chạm","Vòng khép dần quanh nàng: chạm đúng lúc vòng chuyển xanh, ba nhịp.","t"],["Được","Đúng nhịp càng nhiều càng thành.","t"]]):""}<button type="button" class="${typeof kg82Btn==="function"?kg82Btn(false):"kbtn"} kgr-go">Sẵn sàng<small>bắt đầu chơi</small></button></div>`})}catch(e){}
