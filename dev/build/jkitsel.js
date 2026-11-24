/* ================= jkitsel: KIT §93 — scene layer «layout A» + name tag for a half-known person + sắc phong news row (KIT KEEPER #13, review/kit-selscene) =================
   Kit requests of SELSCENE (dev/kit/KIT_REQUESTS.md «23/11 SELSCENE» 1–4) and the event layout A the owner chose (OD 23/11 ~20:20Z/~20:22Z/~20:25Z/~20:27Z/~20:30Z,
   mock review/mock-stage m13 v3.1). PURE DISPLAY: no game logic, no numbers of its own; every knob in KIT_SCN.
   (93.1) kitScene.open(o) → a layer between the top bar and the tab bar (both bars stay bright and live) holding a background picture
          (the event illustration or the place painting), shown CLEAR first (o.intro ms), then blurred + veiled; night = the same picture + the night veil.
   (93.2) S.fig(src|person,{cx,top,fh,z}) → a FULL-BODY figure, never clipped: its painted part (opaque bbox) is kept inside the layer with KIT_SCN.edge px on
          every side; boxes may only lie OVER a figure (owner 20:27Z).
   (93.3) kitDlgBox(L,title,nodes,pos,tail) → the layout A dialogue box: the kit dialog frame (.dlg.kpanel + kpHeader) with info nodes FIXED and ONLY the
          option list (.opts) scrolling; pos {x,y,w,h} px in the layer; tail {y} = a speech tail on the left edge pointing at the figure.
   (93.4) S.pair({msgr,me,story,choice}) → the A1 geometry per device (figures left: messenger behind/top, her front/bottom, one scale; story box tied to the
          messenger, choice box tied to her) — or her figure alone with one box (solo).
   (93.5) kitNameTag(p,{stage,ph,title}) → stage name tag markup (same j59 tag classes) for a person whose name is unknown / partly known.
          kitUnkName(p,{ph}) → the person's name when known, else the placeholder («một tú nữ») for text lines.
   (93.6) kitNewsRankRow(p,{rank,how,ph}) / kitNewsRankList(rows) → the sắc phong news row: kit face + name (or placeholder) + new rank chip + how known.
   kitEdict({fromWord}) (j93) prints the given «from» word on the old-rank chip (a tú nữ: «Tú nữ»). */
const KIT_SCN={z:57,edge:4,blur:6,veil:"rgba(20,12,8,.45)",veilNight:"rgba(10,16,48,.45)",night:"brightness(.62) saturate(.85)",intro:1300,toBlur:700,
 fold:{fh:.80,msgrX:.19,meX:.30,boxX:.43,boxW:.555,soloFh:.97,soloX:.22},ipad:{fh:.86,msgrX:.115,meX:.27,boxX:.41,boxW:.575,soloFh:.97,soloX:.20},gap:8,tail:13};
(function(){try{const st=document.createElement("style");st.id="kscn-css";st.textContent=`
.kscn{position:fixed;z-index:${KIT_SCN.z};overflow:hidden;border-radius:var(--k-rad,12px);background:#2a1a12}
.kscn-bg{position:absolute;inset:-14px;background-size:cover;background-position:center;filter:blur(${KIT_SCN.blur}px)}
.kscn-veil{position:absolute;inset:0;background:${KIT_SCN.veil}}
.kscn.kscn-night .kscn-bg{filter:blur(${KIT_SCN.blur}px) ${KIT_SCN.night}}
.kscn.kscn-night .kscn-veil{background:${KIT_SCN.veilNight}}
.kscn.kscn-clear .kscn-bg{filter:none}.kscn.kscn-clear .kscn-veil{opacity:0}
.kscn-fig{position:absolute;display:block;max-width:none;max-height:none;pointer-events:none}
.kscn .dlg.kscn-box{position:absolute;z-index:4;max-width:none;max-height:none;margin:0;display:flex;flex-direction:column;overflow:visible;text-align:left;animation:none;box-shadow:0 6px 22px rgba(0,0,0,.38)}
.kscn-box>.kph{flex:0 0 auto;position:relative}
.kscn-box>.kscn-col{flex:1 1 auto;min-height:0;display:flex;flex-direction:column;gap:8px;padding:10px 12px 12px;overflow:hidden}
.kscn-col>:not(.opts){flex:0 0 auto}
.kscn-col>.opts{flex:1 1 auto;min-height:0;overflow-y:auto;display:flex;flex-direction:column;gap:8px}
.kscn-col>.opts>*{flex-shrink:0}
.kscn-box.kscn-tl:before,.kscn-box.kscn-tl:after{content:"";position:absolute;width:0;height:0;border-style:solid;border-color:transparent}
.kscn-box.kscn-tl:before{left:-${KIT_SCN.tail}px;top:var(--kty,40px);border-width:11px ${KIT_SCN.tail}px 11px 0;border-right-color:var(--gold,#b8901f)}
.kscn-box.kscn-tl:after{left:-${KIT_SCN.tail-2}px;top:calc(var(--kty,40px) + 1px);border-width:10px ${KIT_SCN.tail-1}px 10px 0;border-right-color:#fbf1e6}
.kpl .kplt .kscn-rk{margin-left:6px}
body.kscn-on .kemo-big{visibility:hidden!important}
button.ka.kbare .kat{margin:auto 0}button.ka.kbare .kabody{display:flex;flex-direction:column;justify-content:center}
.kscn-tag{display:inline-block;width:max-content;max-width:12em;text-align:center;font-size:.82rem;line-height:1.2;color:var(--ink,#3a2a1c);padding:2px 6px;border-radius:8px;background:#fffaf0e8;border:1px solid color-mix(in srgb,var(--tc,#5a6878) 70%,#fff);box-shadow:0 2px 6px #0003}`;document.head.appendChild(st)}catch(e){}})();
function kscnGeo(){const h=document.querySelector("header.hud"),b=document.querySelector("nav.bar");const hr=h?h.getBoundingClientRect():{bottom:0,left:0,right:innerWidth},br=b?b.getBoundingClientRect():{top:innerHeight};
 const t=Math.round(hr.bottom+4),bt=Math.round(br.top-4),L=Math.round(hr.left),R=Math.round(innerWidth-hr.right);return{t,H:bt-t,L,R,w:innerWidth-L-R}}
function kscnCalm(){try{return(typeof reducedMotion==="function"&&reducedMotion())||(typeof kfStill==="function"&&kfStill())}catch(e){return false}}
/* opaque bbox of a decoded picture as fractions (CORS canvas; a tainted / failed read = the whole box) */
function kscnOpaque(im){try{const W=120,H=Math.max(1,Math.round(120*im.naturalHeight/Math.max(1,im.naturalWidth)));const c=document.createElement("canvas");c.width=W;c.height=H;const x=c.getContext("2d");x.drawImage(im,0,0,W,H);const D=x.getImageData(0,0,W,H).data;
 let l=W,r=-1,t=H,b=-1;for(let y=0;y<H;y++)for(let i=0;i<W;i++)if(D[(y*W+i)*4+3]>24){if(i<l)l=i;if(i>r)r=i;if(y<t)t=y;if(y>b)b=y}return r<0?{l:0,r:1,t:0,b:1}:{l:l/W,r:(r+1)/W,t:t/H,b:(b+1)/H}}catch(e){return{l:0,r:1,t:0,b:1}}}
const kitScene={
 open(o){o=o||{};kitScene.close(true);const g=kscnGeo();const L=document.createElement("div");L.className="kscn"+(o.night?" kscn-night":"")+(o.intro&&!kscnCalm()?" kscn-clear":"");
  L.style.cssText=`left:${g.L}px;right:${g.R}px;top:${g.t}px;height:${g.H}px`;L.innerHTML=`<div class="kscn-bg" style="background-image:url('${String(o.bg||"").replace(/'/g,"%27")}')"></div><div class="kscn-veil"></div>`;
  document.body.appendChild(L);document.body.classList.add("kscn-on");/* the stage mood seal (.kemo-big, z 9990) must not pop over the scene */L.g=g;L.figs=[];L.boxes=[];const S0={L,
   fig:(src,f)=>kitScene.fig(L,src,f),box:(title,nodes,pos,tail,ho)=>kitDlgBox(L,title,nodes,pos,tail,ho),pair:x=>kitScene.pair(L,x),
   /* intro: the picture clear and full for o.intro ms, then blur + veil (KIT_SCN.toBlur), then figures from the left, boxes from the right */
   show(){const calm=kscnCalm();const D=o.intro&&!calm?o.intro+KIT_SCN.toBlur:0;if(D){setTimeout(()=>{const bg=L.querySelector(".kscn-bg"),vl=L.querySelector(".kscn-veil");L.classList.remove("kscn-clear");
     const fin=getComputedStyle(bg).filter;bg.animate([{filter:"none"},{filter:fin}],{duration:KIT_SCN.toBlur,easing:"ease-in-out"});vl.animate([{opacity:0},{opacity:1}],{duration:KIT_SCN.toBlur,easing:"ease-in-out"})},o.intro)}
    if(calm){L.animate([{opacity:0},{opacity:1}],{duration:150,fill:"both"});return 0}
    L.animate([{opacity:0},{opacity:1}],{duration:380,easing:"ease-out",fill:"both"});
    L.figs.forEach((f,i)=>f.animate([{transform:"translateX(-60px)",opacity:0},{transform:"none",opacity:1}],{duration:520,delay:D+180+i*150,easing:"cubic-bezier(.2,.8,.3,1)",fill:"both"}));
    L.boxes.forEach((b,i)=>b.animate([{transform:"translateX(40px)",opacity:0},{transform:"none",opacity:1}],{duration:360,delay:D+620+i*260,easing:"ease-out",fill:"both"}));return D},
   close:cb=>kitScene.close(false,cb)};kitScene.cur=S0;return S0},
 async fig(L,src,{cx,top=0,fh,z=2}={}){if(src&&typeof src==="object"){try{src=figFor(src)}catch(e){src=""}}const im=new Image();im.className="kscn-fig";im.crossOrigin="anonymous";im.alt="";im.src=src;try{await im.decode()}catch(e){}
  const fw=fh*im.naturalWidth/Math.max(1,im.naturalHeight);im.ob=kscnOpaque(im);const E=KIT_SCN.edge,w=L.g.w;let x=cx-fw/2;const l=x+im.ob.l*fw,r=x+im.ob.r*fw;if(l<E)x+=E-l;else if(r>w-E)x-=r-(w-E);
  let y=top;const tt=y+im.ob.t*fh;if(tt<E&&top<=E)y+=E-tt;im.style.cssText=`height:${fh}px;width:${fw}px;top:${y}px;left:${x}px;z-index:${z}`;L.appendChild(im);L.figs.push(im);return im},
 /* A1 geometry: {msgr: person|src|null, me: person|src, story:[nodes], storyTitle, choice:[nodes] (one .opts), choiceTitle, kind, seal} */
 async pair(L,o){const ip=document.documentElement.classList.contains("kv2"),K=ip?KIT_SCN.ipad:KIT_SCN.fold,w=L.g.w,H=L.g.H,gap=KIT_SCN.gap,X=Math.round(w*K.boxX),BW=Math.round(w*K.boxW);
  if(!o.msgr){const fh=Math.round(H*K.soloFh);await kitScene.fig(L,o.me,{cx:w*K.soloX,top:H-fh,fh,z:3});
   return{box:kitDlgBox(L,o.choiceTitle||o.storyTitle,[...(o.story||[]),...(o.choice||[])],{x:X,y:gap,w:BW,h:H-2*gap},{y:Math.round(H*.20)},{kind:o.kind,seal:o.seal})}}
  const fh=Math.round(H*K.fh);await kitScene.fig(L,o.msgr,{cx:w*K.msgrX,top:0,fh,z:2});await kitScene.fig(L,o.me,{cx:w*K.meX,top:H-fh,fh,z:3});
  const sb=kitDlgBox(L,o.storyTitle,o.story||[],{x:X,y:gap,w:BW},{y:ip?52:62},{kind:o.kind,seal:o.seal});const sh=Math.ceil(sb.getBoundingClientRect().height),top=gap+sh+12;
  const cb=kitDlgBox(L,o.choiceTitle,o.choice||[],{x:X,y:top,w:BW,h:H-top-gap},{y:Math.max(26,Math.round(H*(ip?.30:.36))-top)},{kind:o.kind,seal:o.seal,noSeal:true});return{story:sb,choice:cb}},
 close(now,cb){const C=kitScene.cur;kitScene.cur=null;if(!C){cb&&cb();return}const L=C.L;const off=()=>document.body.classList.remove("kscn-on");if(now||kscnCalm()){L.remove();off();cb&&cb();return}
  L.boxes.forEach(b=>b.animate([{opacity:1},{opacity:0,transform:"translateX(30px)"}],{duration:260,fill:"both"}));L.figs.forEach(f=>f.animate([{opacity:1},{opacity:0,transform:"translateX(-50px)"}],{duration:380,delay:120,fill:"both"}));
  L.animate([{opacity:1},{opacity:0}],{duration:420,delay:260,fill:"both"}).onfinish=()=>{L.remove();off();cb&&cb()}}};
/* 93.3 the layout A dialogue box. nodes = DOM nodes or html strings; the node with class «opts» (or a list of kit option buttons wrapped by the caller) is the ONLY scroller */
function kitDlgBox(L,title,nodes,pos,tail,ho){ho=ho||{};pos=pos||{};const b=document.createElement("div");b.className="dlg kpanel kscn-box"+(tail?" kscn-tl":"");
 b.innerHTML=typeof kpHeader==="function"?kpHeader(ho.kind||"choice",title||"","",ho.seal):`<div class="kph"><span class="kpht"><span class="kptitle">${title||""}</span></span></div>`;if(ho.noSeal)b.querySelectorAll(".kpseal").forEach(e=>e.remove());
 const c=document.createElement("div");c.className="kscn-col";(nodes||[]).forEach(n=>{if(n==null)return;if(typeof n==="string"){const t=document.createElement("div");t.innerHTML=n;while(t.firstChild)c.appendChild(t.firstChild)}else c.appendChild(n)});b.appendChild(c);
 b.style.cssText=`left:${pos.x||0}px;top:${pos.y||0}px;width:${pos.w||300}px;height:${pos.h?pos.h+"px":"auto"}`;if(tail)b.style.setProperty("--kty",(tail.y||40)+"px");
 (L||document.body).appendChild(b);if(L&&L.boxes)L.boxes.push(b);return b}

/* ===== KIT §95 kitDialogue · SPOTLIGHT + TYPEWRITER + PER-LINE CUE HOOK + FOCUS SHOT (KIT KEEPER #17, review/kit-dialogue-vn; owner OD 24/11 ~04:45Z / ~04:50Z / ~05:10Z) =====
   Uses the §93 scene layer (kitScene). Numbers from BAL.kdlg (law 4).
   kitTypeLine(el,text,{cues,onWord,onDone,now}) → {finish(),done} : the line appears WORD BY WORD (every word is a span, hidden until typed → the box never reflows); cues=[{w,fn}] fire when word index w is typed
     (finish() fires the remaining cues at once, so a tap-through never loses a cue); calm / reduced motion = the whole line at once (cues still fire).
   kitScene.light(L,idx|null) : SPOTLIGHT — the speaker's figure (L.figs[idx]) stays lit, the others dim (brightness .5·saturation, NOT black); null = all lit. Switches with a 260 ms fade.
   kitScene.focus(L,{fig,box}) / kitScene.unfocus(L) : FOCUS SHOT — ONE figure big (BAL.kdlg.focusScale about its head/bust), the scene blurred behind (BAL.kdlg.focusBlur), the other figures hidden; the box wherever the caller puts it.
   kitDialogue.play(Sc,{lines,box,onLine,onDone}) : lines=[{fig:<index into Sc.L.figs>|null, who:"name", text, cues:[{w,fn}], focus:true?}], box={x,y,w,h?} (or fn(line,i)→pos), the ONE speech box (kitDlgBox, title = the speaker).
     Tap / Enter on the scene = finish the line being typed; the NEXT tap = next line; after the last line onDone(). onLine(i,line) fires when line i starts (before its first word): the Tổng quản roll-call lights girl N
     (onLine or line.cues) when the typing reaches her line, name under her feet. Returns {skip(),stop()}. */
function kdlgMs(){try{return (window.BAL&&BAL.kdlg&&BAL.kdlg.msWord)||110}catch(e){return 110}}
function kitTypeLine(el,text,o){o=o||{};const toks=String(text==null?"":text).match(/\S+\s*/g)||[];el.textContent="";const sp=toks.map(t=>{const x=document.createElement("span");x.className="kdw";x.textContent=t;el.appendChild(x);return x});
 const cues=(o.cues||[]).slice().sort((a,b)=>a.w-b.w);let k=0,done=false,T=null;const step=()=>{if(done)return;if(k<sp.length){sp[k].classList.add("on");}
  while(cues.length&&cues[0].w<=k){const c=cues.shift();try{c.fn&&c.fn(k)}catch(e){console.error(e)}}try{o.onWord&&o.onWord(k)}catch(e){}k++;if(k>=sp.length)return fin();T=setTimeout(step,kdlgMs())};
 const fin=()=>{if(done)return;done=true;clearTimeout(T);sp.forEach(x=>x.classList.add("on"));while(cues.length){const c=cues.shift();try{c.fn&&c.fn(c.w)}catch(e){console.error(e)}}try{o.onDone&&o.onDone()}catch(e){console.error(e)}};
 const R={get done(){return done},finish:fin,stop(){done=true;clearTimeout(T)}};if(!sp.length||o.now||kscnCalm())fin();else step();return R}
kitScene.light=function(L,idx){if(!L||!L.figs)return;L.figs.forEach((f,i)=>{f.classList.toggle("kscn-dim",idx!=null&&i!==idx);f.classList.toggle("kscn-lit",idx!=null&&i===idx)});L.dataset.klit=idx==null?"":String(idx)};
kitScene.focus=function(L,o){if(!L||!L.figs)return;o=o||{};const i=o.fig||0,f=L.figs[i];if(!f)return;L.classList.add("kscn-focus");L.figs.forEach((g,j)=>{try{g.getAnimations().forEach(x=>x.cancel())}catch(e){}/* the intro fill:both would hold opacity / transform over the classes */g.classList.toggle("kscn-fhide",j!==i)});
 const K=(window.BAL&&BAL.kdlg)||{},sc=K.focusScale||1.5,g=L.g,r=f.getBoundingClientRect(),lr=L.getBoundingClientRect();const cx=(r.left+r.width/2)-lr.left,tx=(o.cx!=null?o.cx:g.w*.32)-cx;
 f.classList.add("kscn-fbig");f.style.transformOrigin="50% 18%";f.style.transform=`translateX(${Math.round(tx)}px) scale(${sc})`;const bg=L.querySelector(".kscn-bg");if(bg)bg.style.filter=`blur(${K.focusBlur||14}px) brightness(.8)`;L.__kfi=i};
kitScene.unfocus=function(L){if(!L||!L.figs)return;L.figs.forEach(g=>{try{g.getAnimations().forEach(x=>x.cancel())}catch(e){}});L.classList.remove("kscn-focus");L.figs.forEach(g=>{g.classList.remove("kscn-fhide","kscn-fbig");g.style.transform="";g.style.transformOrigin=""});const bg=L.querySelector(".kscn-bg");if(bg)bg.style.filter="";L.__kfi=null};
const kitDialogue={play(Sc,o){o=o||{};const L=Sc.L,lines=(o.lines||[]).slice();let i=-1,cur=null,box=null,lineEl=null,ended=false;
  const pos=(ln,n)=>typeof o.box==="function"?o.box(ln,n):(o.box||{x:Math.round(L.g.w*.46),y:L.g.H-190,w:Math.round(L.g.w*.5)});
  const mk=ln=>{if(box){box.remove();L.boxes=L.boxes.filter(b=>b!==box)}lineEl=document.createElement("div");lineEl.className="kdv-line";const hint=document.createElement("div");hint.className="kdv-next";hint.textContent="Chạm để tiếp ▸";
   box=Sc.box(ln.who||"",[lineEl,hint],pos(ln,i),{y:36});box.classList.add("kdv-box");return box};
  const next=()=>{if(ended)return;i++;if(i>=lines.length)return stop(true);const ln=lines[i];if(ln.focus&&ln.fig!=null)kitScene.focus(L,{fig:ln.fig,cx:ln.cx});else kitScene.unfocus(L);kitScene.light(L,ln.fig==null?null:ln.fig);mk(ln);box.classList.remove("kdv-done");
   try{o.onLine&&o.onLine(i,ln)}catch(e){console.error(e)}cur=kitTypeLine(lineEl,ln.text,{cues:ln.cues,onDone:()=>{if(box)box.classList.add("kdv-done")}})};
  const tap=e=>{if(ended)return;if(e&&e.type==="keydown"&&!/^(Enter| )$/.test(e.key))return;if(e&&e.target&&e.target.closest&&e.target.closest(".kmend,button"))return;if(cur&&!cur.done)cur.finish();else next()};
  const stop=fin=>{if(ended)return;ended=true;L.removeEventListener("click",tap);document.removeEventListener("keydown",tap);if(cur)cur.stop();kitScene.light(L,null);kitScene.unfocus(L);if(box){box.remove();L.boxes=L.boxes.filter(b=>b!==box)}if(fin)try{o.onDone&&o.onDone()}catch(e){console.error(e)}};
  L.addEventListener("click",tap);document.addEventListener("keydown",tap);next();return{skip:()=>tap(),stop:()=>stop(false),get index(){return i}}}};
window.kitTypeLine=kitTypeLine;window.kitDialogue=kitDialogue;
(function(){const st=document.createElement("style");st.id="kdv-css";st.textContent=`
.kdw{visibility:hidden}.kdw.on{visibility:visible}
.kscn-fig{transition:filter .26s ease,opacity .26s ease,transform .5s cubic-bezier(.3,.7,.3,1)}
.kscn-fig.kscn-dim{filter:brightness(${(window.BAL&&BAL.kdlg&&BAL.kdlg.dim)||.5}) saturate(${(window.BAL&&BAL.kdlg&&BAL.kdlg.dimSat)||.75})}
.kscn-fig.kscn-fhide{opacity:0}
.kscn.kscn-focus .kscn-bg{transition:filter .5s ease}
.kdv-box .kdv-line{font-size:1.02rem;line-height:1.5;min-height:3em}.kdv-box .kdv-next{align-self:flex-end;font-size:.78rem;opacity:0;transition:opacity .2s;color:var(--gold,#8f5f0c)}
.kdv-box.kdv-done .kdv-next{opacity:.85}
`;document.head.appendChild(st)})();

/* 93.5 name tag + text name for a person known by face only / by family only */
function kitUnkName(p,o){o=o||{};try{const named=typeof kitKnownName==="function"?kitKnownName(p):true;return named&&p&&p.name?p.name:(o.ph||"một tú nữ")}catch(e){return o.ph||"một tú nữ"}}
function kitNameTag(p,o){o=o||{};let st=o.stage;try{if(st==null)st=!(typeof j59known==="function"?j59known(p):true)?0:(typeof kitKnownName==="function"&&!kitKnownName(p))?1:2}catch(e){st=2}
 if(st>=2&&typeof j59tagHTML==="function")return j59tagHTML(p,p.name);
 const c=typeof j59col==="function"?j59col(p):"#6b5a48";const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,ch=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[ch]));
 const t=o.title||(typeof j59title==="function"&&j59title(p))||"Tú nữ";if(st<=0&&!o.ph&&typeof j59tagHTML==="function")return j59tagHTML(p,p.name);
 return `<span class="j59t" style="--tc:${c};--rt:${typeof kitRankTone==="function"?kitRankTone(t,c):c}">${esc(t)}</span><span class="j59n" style="--tc:${c}">${esc(o.ph||"Chưa rõ tên")}</span>`}
/* the tag in its own box (a scene layer, not the place stage): <span class="kscn-tag"> + the j59 title/name lines */
function kitNameTagBox(p,o){const c=typeof j59col==="function"?j59col(p):"";return `<span class="kscn-tag"${c?` style="--tc:${c}"`:""}>${kitNameTag(p,o)}</span>`}
/* 93.6 sắc phong news row: kit face (stranger rule of kitFaceH) + name or placeholder + new rank chip + how she is known; list = the kit list frame */
function kitNewsRankRow(p,o){o=o||{};const named=typeof kitKnownName==="function"?kitKnownName(p):true;const col=(typeof kitRankCol==="function"&&o.rank!=null&&typeof o.rank==="number"?kitRankCol(o.rank):"")||"";
 const rk=o.rank==null?"":typeof o.rank==="number"&&typeof kmRankName==="function"?kmRankName(o.rank):String(o.rank);
 const nameH=named?kitName(p,{cap:true,noTitle:true}):`<b class="kname">${kitUnkName(p,o)}</b>`;
 return `<div class="kpl">${kitFaceH(p,o.size||"sm")}<span class="kplt">${nameH}${rk?`<span class="kchip n kscn-rk"${col?` style="--rc:${col}"`:""}>${rk}</span>`:""}${o.how?`<small>${o.how}</small>`:""}</span></div>`}
function kitNewsRankList(rows){return `<div class="krlist kscn-news" style="padding:6px 10px">${(rows||[]).join("")}</div>`}
/* 93.7 «nhập cung» BARE OPTION CARD (SELSCENE request 5; EXCEPTION to §88 THÀNH/BẠI + odds rows, selection scene ONLY: the tests of the selection
   ceremony show no odds and no gain/loss lines — the owner's scene hides them; every other option card keeps them). Same kit card: button.ka.kopt
   (picture left .kaart, title .kat>.kan), no .kodds, no .kb rows. o = {n, pic, id}; pic missing → the kit option art picker (kpOptArt). */
function kitBareOpt(o,onPick){o=o||{};const b=document.createElement("button");b.type="button";b.className="ka kart kopt kbare";if(o.id!=null)b.dataset.id=o.id;
 const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
 b.innerHTML=`<span class="kaart">${o.pic?`<img src="${esc(o.pic)}" alt="" draggable="false">`:""}</span><span class="kabody"><span class="kat"><span class="kan">${esc(o.n)}</span></span></span>`;
 if(!o.pic){try{if(typeof kpOptArt==="function")kpOptArt(b)}catch(e){}}if(onPick)b.addEventListener("click",()=>onPick(o,b));return b}
function kitBareOpts(list,onPick){const d=document.createElement("div");d.className="opts kscn-opts";(list||[]).forEach(o=>d.appendChild(kitBareOpt(o,onPick)));return d}
/* 93.8 RESULT CARD with given rows (SELSCENE request 5): the §7 result card (#rtoast.karesult, kitResultSeal, .kb rows, same classes) for a scene whose
   changes are not plain stat diffs: rows [{k:"duoc"|"mat"|"note", label, items:[html]}] — e.g. Được «Hoàng hậu: quý ngươi hơn (thiện cảm +3)», «Điểm tuyển: Khá»;
   Mất «Khắc −1». Words per VANPHONG (no %, odds/score in words). ok true/false/null → THÀNH / BẠI / KẾT QUẢ. Stays 9 s; tap closes. */
function kitResultCard(o){o=o||{};let t=document.getElementById("rtoast");if(!t){t=document.createElement("div");t.id="rtoast";document.body.appendChild(t)}
 const SL=typeof kitResultSeal==="function"?kitResultSeal(o.ok==null?null:!!o.ok):{cls:"sure",t:"KẾT QUẢ"};const rows=(o.rows||[]).filter(r=>r&&r.items&&r.items.length);
 if(!rows.length)rows.push({k:"note",label:"Ghi chú",items:['<span class="ef n">không đổi chỉ số</span>']});
 const row=r=>`<span class="kr kr-${r.k||"note"}"><span class="krl">${r.label||""}</span><span class="krv">${r.items.map(x=>`<span class="kitem">${x}</span>`).join("")}</span></span>`;
 t.className="rtoast karesult "+SL.cls;t.innerHTML=`<div class="rt"><span class="kat"><b class="seal">${SL.t}</b><span class="kan">${o.title||""}</span></span>${o.sen?`<span class="ksen">${o.sen}</span>`:""}<span class="kb">${rows.map(row).join("")}</span></div>`;
 t.onclick=()=>t.classList.remove("on");void t.offsetWidth;t.classList.add("on");clearTimeout(window.__rtT);window.__rtT=setTimeout(()=>t.classList.remove("on"),o.ms||9000);
 window.kaLastResult={title:o.title,ok:o.ok,seal:SL.t,sentence:o.sen||"",rows};return t}
try{if(typeof KIT_SAMPLES!=="undefined"){
 KIT_SAMPLES.push({id:"§93.5",title:"kitNameTag · thẻ tên người chỉ biết mặt / chỉ biết nhà",where:"cảnh tuyển tú (sân chờ, hàng tú nữ, lượt 1–2), mọi chỗ cần tên người chưa rõ",html:()=>{const v=(typeof rivals!=="undefined"&&rivals[0])||{name:"Tô Uyển Nhi"};
  return `<div style="display:flex;gap:28px;padding:10px">${[[1,""],[1,"Con gái Đô thống"],[2,""]].map(([s,ph])=>kitNameTagBox(v,{stage:s,ph,title:"Tú nữ"})).join("")}</div>`}});
 KIT_SAMPLES.push({id:"§93.6",title:"kitNewsRankRow · hàng tin sắc phong (mặt + tên + phẩm mới + biết qua đâu)",where:"màn tin sắc phong sau thánh chỉ (SELSCENE), mọi danh sách tin phong phẩm",html:()=>{const L=(typeof rivals!=="undefined"?rivals:[]).slice(0,3);
  return kitNewsRankList(L.map((v,i)=>kitNewsRankRow(v,{rank:Math.max(0,(v.rank||1)),how:i?"quen ở sân chờ":"cùng lượt"})))}});
KIT_SAMPLES.push({id:"§93.1-4",title:"kitScene · Sc.fig · kitDlgBox · Sc.pair · cảnh bố cục A (nền rõ → mờ, hai nhân vật toàn thân, hai khung đối thoại)",where:"cảnh tuyển tú (SELSCENE); mọi cảnh không phải #modal. Nút mở cảnh thật, chạm một thẻ để về trang mẫu",html:()=>{const ok=typeof S!=="undefined"&&S&&typeof liveRivals==="function";return `<div class="kitpg-row"><button type="button" class="kbtn alt" data-kselsc="pair"${ok?"":" disabled"}>Mở cảnh: sứ giả + ta</button><button type="button" class="kbtn alt" data-kselsc="solo"${ok?"":" disabled"}>Mở cảnh: một mình</button></div>`+(ok?"":kitFacts(["Vào một kiếp rồi mở lại trang mẫu để xem cảnh."],{group:false}))}});
 KIT_SAMPLES.push({id:"§93.8",title:"kitResultCard · thẻ kết quả với hàng cho sẵn (Được / Mất / Ghi chú)",where:"cảnh tuyển tú (SELSCENE), mọi kết quả không phải chỉ số thuần",html:()=>`<div class="kitpg-row"><button type="button" class="kbtn alt" data-kselsc="result">Hiện thẻ kết quả</button></div>`});
 KIT_SAMPLES.push({id:"§95",title:"kitDialogue · tâm điểm (sáng / mờ) + chữ chạy từng chữ (chạm = xong câu) + móc theo câu (điểm danh) + cận cảnh",where:"cảnh sự kiện không có lựa chọn của người khác (tú nữ cãi nhau ở sân chờ), cảnh Tổng quản điểm danh, mọi hội thoại 1-1",html:()=>`<div class="kitpg-row"><button type="button" class="kbtn alt" data-kselsc="dialogue">Mở: cãi nhau (sáng/mờ + chữ chạy + cận cảnh)</button><button type="button" class="kbtn alt" data-kselsc="rollcall">Mở: Tổng quản điểm danh (móc theo câu)</button></div>`});
 KIT_SAMPLES.push({id:"§93.7",title:"kitBareOpt · thẻ lựa chọn trần (chỉ cảnh tuyển tú: không độ chắc, không Được/Mất)",where:"cảnh tuyển tú (SELSCENE) — ngoại lệ duy nhất của §88",html:()=>`<div style="max-width:420px">${kitBareOpts([{n:"Cúi đầu đáp lời, giữ lễ"},{n:"Ngẩng lên thưa rõ ràng"}]).outerHTML}</div>`});
}}catch(e){}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("#kitpage [data-kselsc]");if(!b)return;e.stopPropagation();e.preventDefault();(async()=>{try{const k=b.dataset.kselsc;
 if(k==="result"){const pg0=document.getElementById("kitpage");if(pg0)pg0.hidden=true;/* the kit page covers the result card (z): hide it while the card shows */const t0=kitResultCard({title:"Thái hậu hỏi chuyện",ok:true,rows:[{k:"duoc",label:"Được",items:["Thái hậu: có thiện cảm với ta hơn","Phần tuyển: Khá"]},{k:"mat",label:"Mất",items:["Khắc −1"]}]});const cl=t0.onclick;t0.onclick=()=>{cl();if(pg0)pg0.hidden=false};setTimeout(()=>{if(pg0)pg0.hidden=false},9100);return}
 if(k==="dialogue"||k==="rollcall"){const pg0=document.getElementById("kitpage");if(pg0)pg0.hidden=true;const Rv=liveRivals(true).filter(x=>x.alive&&!x.out).slice(0,3);while(Rv.length<3)Rv.push(S);
  const Sc=kitScene.open({bg:typeof IMG_U==="function"?IMG_U("img/ev-te-le.webp"):"img/ev-te-le.webp",intro:0}),g=Sc.L.g,fh=Math.round(g.H*.8),back=()=>{Sc.close();if(pg0)pg0.hidden=false};
  const cx=[.2,.5,.8];for(let i=0;i<3;i++)await Sc.fig(Rv[i],{cx:g.w*cx[i],top:g.H-fh,fh,z:2+i});Sc.show();
  if(k==="rollcall"){/* the cue hook: girl N lights + her name under her feet WHEN the typing reaches her line (never all at once) */Sc.L.figs.forEach(f=>f.style.opacity=0);
   kitDialogue.play(Sc,{box:{x:Math.round(g.w*.04),y:Math.round(g.H*.03),w:Math.round(g.w*.92)},onDone:back,onLine:(i)=>{const f=Sc.L.figs[i];if(!f)return;f.style.opacity=1;const t=document.createElement("div");t.className="kscn-tag";t.textContent=Rv[i].name||"Tú nữ";const r=f.getBoundingClientRect(),lr=Sc.L.getBoundingClientRect();t.style.cssText=`position:absolute;z-index:9;left:${Math.round(r.left-lr.left+r.width/2)}px;top:${Math.round(r.bottom-lr.top-34)}px;transform:translateX(-50%)`;Sc.L.appendChild(t)},
    lines:Rv.map((v,i)=>({fig:i,who:"Tổng quản",text:`Vị thứ ${["nhất","hai","ba"][i]} là ${v.name||"một tú nữ"}, con nhà quan, nhập cung lượt này.`}))});return}
  kitDialogue.play(Sc,{box:ln=>({x:Math.round(g.w*(ln.fig===0?.4:.05)),y:g.H-190,w:Math.round(g.w*.55)}),onDone:back,lines:[{fig:0,who:Rv[0].name||"Tú nữ A",text:"Ngươi là con nhà ai mà dám đứng trước ta, lại còn không biết hành lễ cho phải phép?"},{fig:1,who:Rv[1].name||"Tú nữ B",text:"Thưa tỷ, muội mới vào cung, chưa quen quy củ, xin tỷ chỉ giáo."},{fig:2,who:Rv[2].name||"Tú nữ C",text:"Hai vị đừng cãi nhau nữa, Tổng quản sắp tới rồi.",focus:true}]});return}
 const pg=document.getElementById("kitpage"),v=liveRivals(true).find(x=>x.alive&&!x.out),solo=k==="solo"||!v;if(pg)pg.hidden=true;
 const Sc=kitScene.open({bg:typeof IMG_U==="function"?IMG_U("img/ev-te-le.webp"):"img/ev-te-le.webp",intro:900});
 const back=()=>{Sc.close();if(pg)pg.hidden=false};const opts=kitBareOpts([{n:"Cúi đầu đáp lời, giữ lễ"},{n:"Ngẩng lên thưa rõ ràng"}],back);
 const story=['<div class="kpmain"><p>Tú nữ đứng thành hàng trước điện. Chạm một thẻ để về trang mẫu.</p></div>'];
 await Sc.pair(solo?{me:S,storyTitle:"Tuyển tú",story,choice:[opts]}:{msgr:v,me:S,storyTitle:v.name,story,choiceTitle:S.name,choice:[opts]});Sc.show()}catch(x){console.error("kselsc",x)}})()},true);
try{window.kitScene=kitScene;window.kitDlgBox=kitDlgBox;window.kitBareOpt=kitBareOpt;window.kitResultCard=kitResultCard}catch(e){}
