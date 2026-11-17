/* ================= jfxkit — PAINTED EFFECTS KIT (KIT §68 painted-fx; owner 15/11 20:55Z + 21:00Z "effects painted with Magnific too") =================
   Every effect a scene shows is PAINTED (Magnific gpt-2-6, folder ba4aecfe…); code only moves / fades / glows painted art. Sources and
   recipes: dev/fxwork (gens.txt ids, slice.py, light.sh, sheet.sh). Files live on the CDN under img/fx/ (cdn_sync.py, not git), lazy-loaded.
   Three kinds:
   1. SPRITES (particles) — KFK_SP: one small transparent WebP atlas per kind (n frames of s×s px side by side); animated on the ONE jfx Pixi
      layer (pooled sprites, frame budget KFX.q). kitFxSprite(name,o) one particle · kitFxBurst(name,at,n,o) a group with the kind's motion.
   2. LIGHTS — KFK_LIGHT: short looping clips painted on PURE BLACK, shown with mix-blend-mode:screen (black vanishes; no alpha → iPhone Safari
      safe): <video> WebM(VP9)+MP4(H.264); low-end → WebP sprite sheet (6×4) stepped by a timer; reduced motion → the still poster.
      kitFxLight(name, target, o) → handle {stop(ms)}.
   3. SHEETS — KFK_SHEET: solid effects that need true alpha (white silk falling, red thread snapping), cut with video_remove_background →
      frames → one WebP sprite sheet. kitFxSheet(name, target, o) → handle {stop(ms)}. A light can also be played as a sheet.
   target = an element, {x,y} (viewport px) or null (screen centre). Everything auto-cleans: dur / end of sheet / target leaves the page.
   kitFxPreload([names]) warms atlases / posters / clips before a scene (returns a Promise; never rejects).
   Off switches: same as jfx — bots/quiet → nothing; Thiết lập "Hiệu ứng: Gọn" (OPT.fxon false; auto on weak devices / slow frames) or
   prefers-reduced-motion → no particles, lights/sheets show their still. Budget (owner 22:35Z): sprite atlas ≤ ~40 KB, light clip ≤ ~400 KB,
   files on demand only (assets.json group 'fx': jload never pre-downloads, sw.js caches by content once played); ONE Pixi layer, capped
   (KFK_CAP), paused when hidden; nothing ever waits on an effect (fire and forget; co-op never blocks).
   Test hook: window.KFK {loaded:Set, lights, sheets, pool, made, freed, log}. */
const KFK_BASE="img/fx/";
/* d = display px at scale 1 · b:"add" = additive (light) · t:1 = may be tinted (white / neutral art) */
const KFK_SP={
 "petal-plum":{n:9,s:64,d:22},"petal-peach":{n:9,s:64,d:22},"petal-lotus":{n:9,s:80,d:30},osmanthus:{n:9,s:48,d:13},
 leaf:{n:9,s:80,d:26},snow:{n:5,s:48,d:15},ash:{n:9,s:56,d:16},paper:{n:9,s:72,d:20},coin:{n:9,s:64,d:22},ink:{n:9,s:128,d:44},
 lantern:{n:4,s:128,d:30},spark:{n:9,s:64,d:26,b:"add"},ember:{n:9,s:40,d:12,b:"add"},orb:{n:3,s:96,d:34,b:"add",t:1},
 streak:{n:3,s:192,d:46,b:"add",t:1},smoke:{n:3,s:128,d:44,t:1},
 glowburst:{n:1,s:256,d:220}, /* the painted gold glow still with true alpha (luma): reads on light paper AND dark scenes */
 brush:{n:9,s:160,d:70},jade:{n:9,s:64,d:24},incense:{n:9,s:96,d:46,t:1},lotuslight:{n:1,s:256,d:170},
 "gift-hands":{n:3,s:288,d:200}, /* review/gift-pick: a maid's hands (celadon sleeves) carrying 0 the lacquer box with its ribbon · 1 the box, ribbon untied · 2 the silk bundle */
 gift:{n:4,s:160,d:120},letter:{n:4,s:128,d:90}  /* gift: 0 closed lacquer box · 1 box open with light · 2 silk-wrapped bundle · 3 untied ribbon;
                                                    letter: 0 sealed letter · 1 open letter · 2 rolled note · 3 envelope */
};
/* full-screen painted EDGE overlays (ink on white → true alpha; portrait -p and landscape -l art): blood (danger), poison, ink (rumour) */
const KFK_EDGE={blood:{},poison:{},ink:{}};
/* w×h = clip size; f = sheet frames (6×4); r = aspect of the art box (w/h) */
const KFK_LIGHT={
 candle:{w:320,h:320},"glow-gold":{w:384,h:384},moonlight:{w:288,h:384},"lantern-red":{w:288,h:384},divine:{w:288,h:384},fireworks:{w:288,h:384}
};
const KFK_SHEET={ /* dev/fxwork/sheet.sh: cols×rows frames of w×h (true alpha), fps, played once; poster = last frame (reduced motion) */
 silk:{cols:6,rows:4,n:24,w:120,h:214,fps:5,src:"silk-sheet.webp",poster:"silk.webp"},       /* white silk descends and settles (death) */
 thread:{cols:4,rows:4,n:16,w:256,h:144,fps:7,src:"thread-sheet.webp",poster:"thread.webp"}  /* red thread trembles and snaps (betrayal) */
};
/* motion per kind for kitFxBurst (fall | burst | rise | bloom | rain) */
const KFK_MOVE={"petal-plum":"fall","petal-peach":"fall","petal-lotus":"fall",osmanthus:"fall",leaf:"fall",snow:"fall",ash:"fall",paper:"burst",
 coin:"rain",glowburst:"flash",lotuslight:"flash",jade:"burst",incense:"rise",brush:"flash",gift:"flash",letter:"flash",ink:"bloom",smoke:"bloom",lantern:"rise",spark:"burst",ember:"rise",orb:"rise",streak:"burst"};
const KFK=window.KFK={loaded:new Set(),tex:{},lights:0,sheets:0,pool:[],made:0,freed:0,log:[],live:new Set()};
const kfkU=f=>KFK_BASE+f;
function kfkLow(){try{const c=navigator.connection;return !!((c&&c.saveData)||(navigator.deviceMemory&&navigator.deviceMemory<=2)||(navigator.hardwareConcurrency&&navigator.hardwareConcurrency<=2))}catch(e){return false}}
function kfkLog(x){KFK.log.push(x);if(KFK.log.length>80)KFK.log.shift()}
/* ---------- 1. sprites ---------- */
const kfkTexP={};
function kfkLoad(names){names=(Array.isArray(names)?names:[names]).filter(n=>KFK_SP[n]);
 return kfApp().then(app=>Promise.all(names.map(n=>{if(kfkTexP[n])return kfkTexP[n];const K=KFK_SP[n],P=window.PIXI;
  kfkTexP[n]=P.Assets.load({src:kfkU(n+".webp"),data:{crossOrigin:"anonymous"}}).then(base=>{const fr=[];
   for(let i=0;i<K.n;i++)fr.push(new P.Texture({source:base.source,frame:new P.Rectangle(i*K.s,0,K.s,K.s)}));KFK.tex[n]=fr;KFX.tex[n]=fr;KFK.loaded.add(n);return fr})
   .catch(e=>{delete kfkTexP[n];throw e});return kfkTexP[n]})))}
/* the ONE particle maker (jfx kfSp calls this): pooled Pixi sprite with a painted frame */
const KFK_CAP=()=>kitView().pages===1?140:240;  /* hard cap of live particles on the ONE Pixi layer (owner perf budget 22:35Z) */
function kfkSp(kind,x,y,v,tint,sc,blend,frame){const P=window.PIXI,K=KFK_SP[kind],fr=KFK.tex[kind];if(!P||!K||!fr||!KFX.root)return null;if(KFX.parts.length>=KFK_CAP())return null;
 let s=KFK.pool.pop();if(!s){s=new P.Sprite(fr[0]);s.anchor.set(.5);KFK.made++}
 s.texture=fr[frame!=null?frame%fr.length:Math.floor(Math.random()*fr.length)];s.x=x;s.y=y;s.rotation=Math.random()*6.28;s.visible=true;
 s.tint=K.t&&tint!=null?tint:0xffffff;s.blendMode=blend||K.b||"normal";const k=(sc||1)*K.d/K.s;s.scale.set(k);
 s.v=Object.assign({vx:0,vy:0,g:0,drag:1,life:60,max:60,spin:0,grow:0,a0:1,fade:"out",sway:0,ph:Math.random()*6.28,sc:k},v);s.v.max=s.v.life;
 if(s.v.grow)s.v.grow*=K.d/K.s;s.alpha=s.v.fade==="in"||s.v.fade==="inout"?0:s.v.a0;KFX.root.addChild(s);KFX.parts.push(s);return s}
function kfkFree(s){try{s.parent&&s.parent.removeChild(s);s.v=null;if(KFK.pool.length<400){s.visible=false;KFK.pool.push(s)}else s.destroy();KFK.freed++}catch(e){}}
function kfkAt(at){if(at==null)return{x:innerWidth/2,y:innerHeight*.42};if(at.getBoundingClientRect){const r=at.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2,r}}return at}
function kitFxSprite(name,o){o=o||{};if(!KFK_SP[name]||!kfOn()||kfStill())return Promise.resolve(null);
 return kfkLoad([name]).then(()=>{const p=kfkAt(o.el||(o.x!=null?{x:o.x,y:o.y}:null));const life=o.ms?o.ms*.06:(o.life||90);
  const s=kfkSp(name,p.x,p.y,{vx:o.vx||0,vy:o.vy||0,g:o.g||0,drag:o.drag||1,life,spin:o.spin||0,sway:o.sway||0,grow:o.grow||0,a0:o.a0!=null?o.a0:1,fade:o.fade||"inout"},o.tint,o.scale||1,o.blend,o.frame);
  if(s&&o.rot!=null)s.rotation=o.rot;kfWake();return s}).catch(()=>null)}
const kR=(a,b)=>a+Math.random()*(b-a);
function kfkMove(name,p,i,n,o){const m=o.motion||KFK_MOVE[name]||"burst",W=innerWidth,H=innerHeight,r=p.r,sp=o.speed||1;
 if(m==="fall"){const wide=o.wide!==false&&!r;const x=wide?kR(0,W):p.x+kR(-.6,.6)*(r?Math.max(120,r.width):240);
  return{x,y:wide?kR(-80,-10):p.y-(r?r.height/2:120)+kR(-40,0),v:{vx:kR(-.4,.4)*sp,vy:kR(1,2)*sp,life:o.life||kR(150,210),spin:kR(-.05,.05),sway:.8,fade:"inout"}}}
 if(m==="rain")return{x:kR(.06,.94)*W,y:kR(-120,-10),v:{vx:kR(-.6,.6),vy:kR(2,4)*sp,g:.22,life:o.life||kR(90,120),spin:kR(-.03,.03),coin:1,fade:"out"}};
 if(m==="rise")return{x:r?p.x+kR(-.5,.5)*r.width:(name==="lantern"?kR(.06,.94)*W:p.x+kR(-80,80)),y:name==="lantern"&&!r?H+kR(10,200):p.y+kR(-20,30),
  v:{vx:kR(-.3,.3),vy:-kR(.6,1.4)*sp,life:o.life||(name==="lantern"?kR(420,540):kR(90,150)),sway:.4,fade:"inout",a0:.95}};
 if(m==="flash")return{x:p.x,y:p.y,v:{life:o.life||55,grow:o.grow!=null?o.grow:.012,a0:o.a0!=null?o.a0:.95,fade:"inout"}};
 if(m==="bloom")return{x:p.x+kR(-50,50),y:p.y+kR(-40,40),v:{life:o.life||kR(70,95),grow:kR(.006,.012),a0:kR(.55,.8),fade:"inout",vy:name==="smoke"?-kR(.5,1.1):0}};
 const a=o.up?kR(-Math.PI*.95,-Math.PI*.05):kR(0,Math.PI*2),v=kR(3,8)*sp;return{x:p.x,y:p.y,v:{vx:Math.cos(a)*v,vy:Math.sin(a)*v-1.5,g:.08,drag:.95,life:o.life||kR(60,100),spin:kR(-.12,.12),sway:.4,fade:"out"},rot:name==="streak"?a:null}}
function kitFxBurst(name,at,n,o){o=o||{};if(!KFK_SP[name]||!kfOn()||kfStill())return Promise.resolve(0);kfkLog("burst:"+name);
 if(KFK_LSP[name]){/* light sprites: KIT §68.7 — over a person the burst becomes a rim light on that person */const p0=kfkAt(at),d0=(KFK_SP[name].d||100)*(o.scale||1),gb={x:p0.x-d0/2,y:p0.y-d0/2,w:d0,h:d0};if(p0.r){gb.x=Math.min(gb.x,p0.r.left);gb.y=Math.min(gb.y,p0.r.top);gb.w=Math.max(gb.x+gb.w,p0.r.right)-gb.x;gb.h=Math.max(gb.y+gb.h,p0.r.bottom)-gb.y}
  const rim=kfkRimFor(gb,name,{opacity:(o.a0!=null?o.a0:.8)-.3,dur:(o.life||60)*30,r:Math.max(8,Math.min(22,d0/12))});if(rim)return Promise.resolve(1)}
 return kfkLoad([name]).then(()=>{const p=kfkAt(at),N=kfBudget(n||12);let k=0;
  for(let i=0;i<N;i++){const m=kfkMove(name,p,i,N,o);const s=kfkSp(name,m.x,m.y,m.v,o.tint,(o.scale||1)*kR(.75,1.25),o.blend);if(s){k++;if(m.rot!=null)s.rotation=m.rot;if(m.v.coin)s.v.coin=1}}
  kfWake();return k}).catch(()=>0)}
/* ---------- 1b. PERSON-SAFE LIGHT (owner 16/11 21:25Z, KIT §68.7) ----------
   Light / glow NEVER lies over a person or a face. Wherever a light, a glow sprite or a light sheet would reach a person (stage figure, her figure,
   portrait, avatar, makeup zoom, reveal figure) the kit draws a RIM light instead: a soft glow that starts at the person's own outline and radiates
   OUTWARD (drop-shadow on the picture = the true silhouette). ONE guard for the whole game: kitFxLight / kitFxSheet(light) / kitFxBurst(glowburst, orb,
   lotuslight) call it; a caller never decides. Particles (petals, sparks, coins) are objects, not light, and are not touched. */
const KFK_PERSON="img.figimg,#mefig,img.kpor,.kfzoom,.ktrv-fw>img,span.md.kmini,.kpod-fig>img";
const KFK_LSP={glowburst:1,lotuslight:1,orb:1};
const KFK_TONE={"glow-gold":"255,196,60",candle:"255,196,110",moonlight:"205,222,255","lantern-red":"255,130,100",divine:"255,244,214",fireworks:"255,226,150",glowburst:"255,214,120",orb:"255,236,190",lotuslight:"255,150,190"};
/* the visible persons whose picture meets the box {x,y,w,h} (viewport px); covered pictures (under a dialog) do not count */
function kfkPersons(box){if(!box)return[];const out=[];try{for(const e of document.querySelectorAll(KFK_PERSON)){const r=e.getBoundingClientRect();if(r.width<8||r.height<8)continue;
  if(r.right<=box.x||r.left>=box.x+box.w||r.bottom<=box.y||r.top>=box.y+box.h)continue;const cs=getComputedStyle(e);if(cs.visibility==="hidden"||cs.display==="none"||+cs.opacity<.05)continue;
  const top=document.elementFromPoint(Math.min(innerWidth-1,Math.max(0,r.left+r.width/2)),Math.min(innerHeight-1,Math.max(0,r.top+r.height*.4)));if(top&&!(e===top||e.contains(top)||top.contains(e)))continue;out.push(e)}}catch(x){}return out}
const kfkRectBox=t=>{try{const r=t.getBoundingClientRect();return r.width?{x:r.left,y:r.top,w:r.width,h:r.height}:null}catch(e){return null}};
const kfkCBox=(b)=>b?{x:b.x-b.w/2,y:b.y-b.h/2,w:b.w,h:b.h}:null;
/* kitFxRim(els, o) — rim light on the pictures in els: o {tone: a KFK_TONE name | rgb "r,g,b", a: strength 0..1, r: reach px, dur: ms}. Returns {stop(), alive}. */
function kitFxRim(els,o){o=o||{};els=[].concat(els||[]).filter(e=>e&&e.animate);if(!els.length||!kfOn())return null;kfkLog("rim:"+(o.tone||"rgb"));
 const c=o.rgb||KFK_TONE[o.tone]||"255,214,120",a=Math.max(.55,Math.min(1,o.a!=null?o.a:.9)),r=o.r||14,dur=o.dur||2200;const A=[];
 /* three layers: a tight solid edge, a mid halo, a wide glow (a pastel garden swallows a single soft drop-shadow: owner look check 17/11) */
 const z=`drop-shadow(0 0 0 rgba(${c},0)) drop-shadow(0 0 0 rgba(${c},0)) drop-shadow(0 0 0 rgba(${c},0))`,on=`drop-shadow(0 0 2px rgba(${c},${a})) drop-shadow(0 0 ${Math.round(r*.7)}px rgba(${c},${a})) drop-shadow(0 0 ${Math.round(r*1.9)}px rgba(${c},${(a*.8).toFixed(2)}))`;
 for(const e of els){try{A.push(e.animate([{filter:z},{filter:on,offset:.22},{filter:on,offset:.72},{filter:z}],{duration:dur,easing:"ease-in-out",composite:"add"}))}catch(x){}}
 return A.length?{rim:true,els,stop(){A.forEach(an=>{try{an.cancel()}catch(x){}})},get alive(){return A.some(an=>an.playState==="running")}}:null}
/* the guard: persons under a light box → rim handle (the caller returns it instead of drawing the overlay), else null */
function kfkRimFor(box,name,o){const P=kfkPersons(box);return P.length?kitFxRim(P,{tone:name,a:o&&o.opacity!=null?o.opacity+.3:.85,dur:o&&o.dur,r:o&&o.r}):null}
/* ---------- 2. lights + 3. sheets (DOM, screen blend for lights) ---------- */
const KFK_VPOOL={};
function kfkBox(target,o,ar){let x,y,w;const r=target&&target.getBoundingClientRect?target.getBoundingClientRect():null;
 if(r&&r.width){x=r.left+r.width*(o.cx!=null?o.cx:.5);y=r.top+r.height*(o.cy!=null?o.cy:.5);w=o.size||Math.max(r.width,r.height*ar)*(o.scale||1.2)}
 else{const p=target&&target.x!=null?target:{x:innerWidth/2,y:innerHeight*.42};x=p.x;y=p.y;w=o.size||Math.min(innerWidth,innerHeight*ar)*(o.scale||.7)}
 return{x,y,w,h:w/ar}}
function kfkPlace(d,b){d.style.cssText+=`;left:${Math.round(b.x-b.w/2)}px;top:${Math.round(b.y-b.h/2)}px;width:${Math.round(b.w)}px;height:${Math.round(b.h)}px`}
function kfkHandle(d,target,o,kind,onStop){let done=false,iv=0,to=0;KFK.live.add(d);KFK[kind]++;
 const H={el:d,stop(ms){if(done)return;done=true;clearInterval(iv);clearTimeout(to);KFK.live.delete(d);KFK[kind]--;const f=ms!=null?ms:(o.fade!=null?o.fade:400);
  try{for(const a of d.getAnimations?d.getAnimations():[])try{a.commitStyles();a.cancel()}catch(e){}}catch(e){}void d.offsetWidth;
  d.style.transition=`opacity ${f}ms ease`;d.style.opacity="0";setTimeout(()=>{try{onStop&&onStop()}catch(e){}d.remove()},f+30)},get alive(){return !done}};
 if(target&&target.getBoundingClientRect&&!o.inside)iv=setInterval(()=>{if(!target.isConnected||document.hidden&&kind==="lights"){H.stop(200);return}
  if(o.follow!==false)kfkPlace(d,kfkBox(target,o,o.ar))},250);
 if(o.dur)to=setTimeout(()=>H.stop(),o.dur);return H}
function kfkLayer(o,cls){const d=document.createElement("div");d.className="kfxk "+cls;d.setAttribute("aria-hidden","true");if(o.z!=null)d.style.zIndex=o.z;if(o.opacity!=null)d.style.setProperty("--kfo",o.opacity);return d}
function kfkSheetRun(d,src,cols,rows,n,fps,loop,onEnd,rev){d.style.backgroundImage=`url("${src}")`;d.style.backgroundSize=`${cols*100}% ${rows*100}%`;let i=0;
 const step=()=>{const j=rev?n-1-i:i,c=j%cols,r=Math.floor(j/cols);d.style.backgroundPosition=`${cols>1?c*100/(cols-1):0}% ${rows>1?r*100/(rows-1):0}%`};step();
 const iv=setInterval(()=>{i++;if(i>=n){if(loop)i=0;else{clearInterval(iv);onEnd&&onEnd();return}}step()},1000/fps);return iv}
function kitFxLight(name,target,o){o=Object.assign({},o||{});const L=KFK_LIGHT[name];if(!L||!kfOn())return null;kfkLog("light:"+name);
 {const gb=o.inside&&target?kfkRectBox(target):kfkCBox(kfkBox(target,o,L.w/L.h));const rim=gb&&kfkRimFor(gb,name,o);if(rim)return rim}/* KIT §68.7: never over a person */
 if(KFK.lights>=4){const old=[...KFK.live].find(d=>d.classList.contains("kfxk-l"));old&&old.__h&&old.__h.stop(150)}
 o.ar=L.w/L.h;const d=kfkLayer(o,"kfxk-l"),still=kfStill(),low=!still&&(o.low||kfkLow());let v=null,iv=0;
 if(still){d.classList.add("kfxk-still");d.style.backgroundImage=`url("${kfkU(name+".webp")}")`}
 else if(low){iv=kfkSheetRun(d,kfkU(name+"-sheet.webp"),6,4,24,o.fps||5,true)}
 else{const pool=KFK_VPOOL[name]||(KFK_VPOOL[name]=[]);v=pool.pop();
  if(!v){v=document.createElement("video");v.muted=true;v.defaultMuted=true;v.loop=true;v.playsInline=true;v.setAttribute("playsinline","");v.setAttribute("muted","");
   v.preload="auto";v.disablePictureInPicture=true;v.poster=kfkU(name+".webp");v.innerHTML=`<source src="${kfkU(name+".webm")}" type="video/webm"><source src="${kfkU(name+".mp4")}" type="video/mp4">`}
  v.playbackRate=o.rate||1;try{v.currentTime=o.t0!=null?o.t0:Math.random()*2}catch(e){}d.appendChild(v);const pr=v.play();pr&&pr.catch&&pr.catch(()=>{d.classList.add("kfxk-still");d.style.backgroundImage=`url("${kfkU(name+".webp")}")`})}
 if(o.inside&&target&&target.appendChild){d.classList.add("kfxk-in");target.appendChild(d)}else{kfkPlace(d,kfkBox(target,o,o.ar));document.body.appendChild(d)}
 requestAnimationFrame(()=>d.classList.add("on"));
 const h=kfkHandle(d,target,o,"lights",()=>{clearInterval(iv);if(v){v.pause();v.remove();const p=KFK_VPOOL[name];if(p.length<2)p.push(v);else{v.removeAttribute("src");v.innerHTML="";v.load()}}});d.__h=h;return h}
function kitFxSheet(name,target,o){o=Object.assign({},o||{});const Sd=KFK_SHEET[name],Ld=!Sd&&KFK_LIGHT[name];if(!Sd&&!Ld||!kfOn())return null;kfkLog("sheet:"+name);
 const D=Sd||{w:Ld.w,h:Ld.h,cols:6,rows:4,n:24,fps:5,blend:"screen",src:name+"-sheet.webp",poster:name+".webp",loop:1};o.ar=D.w/D.h;
 if(Ld){const gb=o.inside&&target?kfkRectBox(target):kfkCBox(kfkBox(target,o,o.ar));const rim=gb&&kfkRimFor(gb,name,o);if(rim)return rim}/* KIT §68.7 */
 const d=kfkLayer(o,"kfxk-s"+(D.blend==="screen"?" kfxk-scr":""));let iv=0,h;
 if(o.inside&&target&&target.appendChild){d.classList.add("kfxk-in");target.appendChild(d)}else{kfkPlace(d,kfkBox(target,o,o.ar));document.body.appendChild(d)}
 const loop=o.loop!=null?o.loop:!!D.loop;
 if(kfStill()){d.style.backgroundImage=`url("${kfkU(D.poster||D.src)}")`;d.style.backgroundSize="contain";if(!o.dur&&!loop)o.dur=o.hold||1600}
 else iv=kfkSheetRun(d,kfkU(D.src||name+"-sheet.webp"),D.cols,D.rows,D.n,o.fps||D.fps,loop,()=>{if(!o.keep)setTimeout(()=>h.stop(),o.hold!=null?o.hold:500)},!!o.reverse);
 requestAnimationFrame(()=>d.classList.add("on"));h=kfkHandle(d,target,o,"sheets",()=>clearInterval(iv));d.__h=h;return h}
/* kitFxEdge(name, o) — the painted edge overlay bleeds in from outside the screen (scale 1.12 → 1 + fade), holds, fades.
   o {in:ms 450, hold:ms 700, out:ms 900, opacity}. Reduced motion / Gọn: shown still for hold+in, then gone. */
function kitFxEdge(name,o){o=o||{};if(!KFK_EDGE[name]||!kfOn())return null;kfkLog("edge:"+name);
 const land=kitView().pages===2,d=kfkLayer(o,"kfxk-e");d.style.backgroundImage=`url("${kfkU("edge-"+name+(land?"-l":"-p")+".webp")}")`;document.body.appendChild(d);
 const st=kfStill(),i=o.in||450,h=o.hold!=null?o.hold:700,u=o.out||900;let H;
 if(!st&&d.animate){d.style.transition="none";d.style.opacity="1";d.animate([{opacity:0,transform:"scale(1.12)"},{opacity:o.opacity||1,transform:"scale(1)"}],{duration:i,easing:"cubic-bezier(.2,.7,.3,1)",fill:"both"})}
 else requestAnimationFrame(()=>d.classList.add("on"));
 H=kfkHandle(d,null,{fade:u,dur:i+h},"sheets",null);d.__h=H;return H}
/* kitFxObj(name, frame, target, o) — ONE painted object (a frame of a KFK_SP atlas) as a DOM picture for staged moments (gift, letter):
   returns {el, to(x,y,ms,extra), frame(i), stop(ms)}; size o.size px (default the kind's d). Positions are viewport px (centre). */
function kitFxObj(name,frame,target,o){o=o||{};const K=KFK_SP[name];if(!K||!kfOn())return null;const p=kfkAt(target),sz=o.size||K.d;
 const d=kfkLayer(o,"kfxk-o");d.style.cssText+=`;left:0;top:0;width:${sz}px;height:${sz}px;background-image:url("${kfkU(name+".webp")}");background-size:${K.n*100}% 100%;transform:translate(${p.x-sz/2}px,${p.y-sz/2}px)`;
 const fr=i=>{d.style.backgroundPosition=`${K.n>1?(i%K.n)*100/(K.n-1):0}% 0`};fr(frame||0);document.body.appendChild(d);requestAnimationFrame(()=>d.classList.add("on"));
 let cur={x:p.x,y:p.y};const H=kfkHandle(d,null,{fade:o.fade||350,dur:o.dur},"sheets",null);d.__h=H;
 H.frame=fr;H.to=(x,y,ms,ex)=>{ex=ex||{};const a=`translate(${cur.x-sz/2}px,${cur.y-sz/2}px) rotate(${ex.r0||0}deg) scale(${ex.s0||1})`,b=`translate(${x-sz/2}px,${y-sz/2}px) rotate(${ex.r||0}deg) scale(${ex.s||1})`;cur={x,y};
  if(kfStill()||!d.animate){d.style.transform=b;return Promise.resolve()}const an=d.animate([{transform:a},{transform:b}],{duration:ms,easing:ex.ease||"cubic-bezier(.3,.7,.3,1)",fill:"forwards"});return an.finished.catch(()=>{})};
 return H}
/* kitFxGift(act, target, o) — painted gift moments. act: "give" (wrapped gift / lacquer box carried up to the target, ribbon slips off),
   "open" (lacquer box opens: light + sparks), "refuse" (the gift is set down and taken back). o {kind:"box"|"silk", from:{x,y}}.
   Fire and forget (never awaited by game logic); returns a Promise that settles when the moment ends. */
function kitFxGift(act,target,o){o=o||{};if(!kfOn())return Promise.resolve(false);kfkLog("gift:"+act);const p=kfkAt(target),silk=o.kind==="silk",sz=o.size||Math.min(150,innerWidth*.28);
 const from=o.from||{x:p.x,y:innerHeight+sz};const H=kitFxObj("gift",silk?2:0,from,{size:sz});if(!H)return Promise.resolve(false);const W=ms=>new Promise(r=>setTimeout(r,kfStill()?0:ms));
 if(act==="open"){H.to(p.x,p.y,0);return W(350).then(()=>{H.to(p.x,p.y,180,{s:1.06,s0:1});return W(180)}).then(()=>{H.frame(1);kitFxBurst("glowburst",p,1,{scale:sz/150,a0:.85});kitFxBurst("spark",p,12,{up:1});return W(1400)}).then(()=>{H.stop(450);return true})}
 const go=H.to(p.x,p.y,750,{r0:-4,r:0});
 if(act==="refuse")return go.then(()=>W(500)).then(()=>H.to(p.x,p.y+sz*.15,260,{s:.96})).then(()=>W(450)).then(()=>H.to(from.x,from.y,700,{r:6})).then(()=>{H.stop(200);return true});
 return go.then(()=>{if(!silk)return;const r=kitFxObj("gift",3,{x:p.x,y:p.y-sz*.35},{size:sz*.7});return r&&r.to(p.x+sz*.6,p.y-sz*.9,700,{r:40,s:.8}).then(()=>r.stop(300))}).then(()=>W(500)).then(()=>{H.stop(400);return true})}
/* kitFxGiftCarry(target, o) — the whole gift moment of 22:45Z #4/#5 (review/gift-pick): the chosen item (o.item = its picture, from o.from)
   drops into an open lacquer box at the bottom of the screen (o.wrap "silk": it is wrapped in silk instead), the box closes, a maid's hands
   (gift-hands) carry it up to the person (target), the ribbon is untied on arrival; o.refuse → the box is set down and carried back down;
   else the box opens with a soft light + painted sparkles (kitFxGift "open"). Tap anywhere = skip (a transparent catcher takes that tap).
   Gọn / reduced motion (kfStill) and bots: nothing. Fire and forget, after the state is applied; returns a Promise. */
function kitFxGiftCarry(target,o){o=o||{};if(!kfOn()||kfStill())return Promise.resolve(false);kfkLog("giftcarry:"+(o.refuse?"refuse":"give"));
 const t=kfkAt(target),silk=o.wrap==="silk",bs=Math.min(130,innerWidth*.24),hs=Math.min(250,innerWidth*.42,innerHeight*.5),H=[];let cut=false;
 const W=ms=>new Promise(r=>setTimeout(r,cut?0:ms));const keep=h=>{if(h)H.push(h);return h};
 const ct=document.createElement("div");ct.className="kfxk-catch";ct.setAttribute("aria-hidden","true");document.body.appendChild(ct);
 const end=()=>{cut=true;for(const h of H)try{h.stop(150)}catch(e){}ct.remove()};ct.addEventListener("pointerdown",e=>{e.stopPropagation();e.preventDefault();end()},true);
 const s={x:innerWidth/2,y:innerHeight-bs*.75};const hy=y=>y+hs*.17;  /* the box sits ~17 % above the centre of the hands picture */
 const it=()=>{if(!o.item)return Promise.resolve();const d=kfkLayer({},"kfxk-o");const z=Math.min(96,bs*.8),f=o.from||{x:s.x,y:s.y-bs};
  d.style.cssText+=`;left:0;top:0;width:${z}px;height:${z}px;background-image:url("${o.item}");transform:translate(${f.x-z/2}px,${f.y-z/2}px)`;document.body.appendChild(d);requestAnimationFrame(()=>d.classList.add("on"));
  const h=keep(kfkHandle(d,null,{fade:250},"sheets",null));if(!d.animate)return W(300).then(()=>h.stop(200));
  return d.animate([{transform:`translate(${f.x-z/2}px,${f.y-z/2}px) scale(1)`},{transform:`translate(${s.x-z/2}px,${s.y-z*.7}px) scale(.85)`,offset:.7},{transform:`translate(${s.x-z/2}px,${s.y-z/2}px) scale(.35)`,opacity:0}],{duration:cut?0:750,easing:"cubic-bezier(.3,.7,.3,1)",fill:"forwards"}).finished.catch(()=>{}).then(()=>h.stop(0))};
 let B=keep(kitFxObj("gift",silk?2:1,s,{size:bs}));let C=null;
 return W(250).then(it).then(()=>{if(B&&!silk)B.frame(0);return W(cut?0:300)}).then(()=>{
   C=keep(kitFxObj("gift-hands",silk?2:0,{x:s.x,y:hy(s.y)+hs*.25},{size:hs}));if(B)B.stop(250);if(!C)return;
   return C.to(t.x,hy(t.y),cut?0:1000,{r0:-3,r:0,s0:.9,s:1})}).then(()=>W(250)).then(()=>{if(!C||silk)return;C.frame(1);
   const R=keep(kitFxObj("gift",3,{x:t.x,y:t.y-hs*.12},{size:bs*.8}));return R&&R.to(t.x+hs*.45,t.y+hs*.2,cut?0:800,{r:55,s:.85}).then(()=>R.stop(300))}).then(()=>W(200)).then(()=>{
   if(!C)return;if(o.refuse)return C.to(t.x,hy(t.y)+hs*.12,cut?0:350,{s:.97}).then(()=>W(600)).then(()=>C.to(t.x,innerHeight+hs,cut?0:900,{r:4})).then(()=>C.stop(200));
   C.stop(350);if(!cut)return kitFxGift("open",{x:t.x,y:t.y},{size:bs})}).then(()=>{end();return true}).catch(()=>{end();return false})}
/* kitFxLetter(target, o) — a secret letter arrives (rises, sealed), then opens (frame 1). o {kind:"seal"|"roll"|"envelope", open:true} */
function kitFxLetter(target,o){o=o||{};if(!kfOn())return Promise.resolve(false);const p=kfkAt(target),sz=o.size||Math.min(140,innerWidth*.26),f={roll:2,envelope:3}[o.kind]||0;
 const H=kitFxObj("letter",f,{x:p.x,y:p.y+60},{size:sz});if(!H)return Promise.resolve(false);const W=ms=>new Promise(r=>setTimeout(r,kfStill()?0:ms));
 return H.to(p.x,p.y,600,{r0:-8,r:-2}).then(()=>W(500)).then(()=>{if(o.open!==false){H.frame(1);kitFxBurst("orb",p,3,{tint:0xfff3d0})}return W(1200)}).then(()=>{H.stop(400);return true})}
function kitFxPreload(names){const L=[];for(const n of names||[]){
  if(KFK_SP[n])L.push(kfkLoad([n]).catch(()=>{}));
  if(KFK_EDGE[n])L.push(new Promise(ok=>{const i=new Image();i.onload=i.onerror=()=>ok();i.src=kfkU("edge-"+n+(kitView().pages===2?"-l":"-p")+".webp")}));
  if(KFK_LIGHT[n]||KFK_SHEET[n]){const S=KFK_SHEET[n];const u=kfkU(S?S.src:(kfkLow()?n+"-sheet.webp":n+".webp"));L.push(new Promise(ok=>{const i=new Image();i.onload=i.onerror=()=>ok();i.src=u}))
   if(KFK_LIGHT[n]&&!kfkLow()&&!kfStill()&&!(KFK_VPOOL[n]&&KFK_VPOOL[n].length)){const v=document.createElement("video");v.muted=true;v.playsInline=true;v.setAttribute("playsinline","");v.preload="auto";
    v.poster=kfkU(n+".webp");v.innerHTML=`<source src="${kfkU(n+".webm")}" type="video/webm"><source src="${kfkU(n+".mp4")}" type="video/mp4">`;v.loop=true;(KFK_VPOOL[n]||(KFK_VPOOL[n]=[])).push(v)}}}
 return Promise.all(L).then(()=>true)}
function kitFxClear(){for(const d of [...KFK.live])d.__h&&d.__h.stop(0);for(const s of [...(KFX.parts||[])])kfkFree(s);if(KFX.parts)KFX.parts.length=0}
/* "Hiệu ứng: Đầy đủ / Gọn" (Thiết lập, OPT.fxon; owner perf budget 22:35Z). Gọn = stills, no particles (kfStill). Until she picks
   (OPT.fxpick), weak devices start in Gọn (kfkLow: saveData / deviceMemory ≤ 2 / ≤ 2 cores) and slow frames switch to Gọn for the
   session (KFX.q at its floor with particles on screen, 3 checks in a row). OPT.fxauto marks an automatic Gọn (undone on a strong device). */
function kfkAuto(){try{if(typeof OPT==="undefined"||OPT.fxpick)return;if(kfkLow()){if(OPT.fxon!==false){OPT.fxon=false;OPT.fxauto=1;KFK.auto="device"}}
 else if(OPT.fxauto){OPT.fxon=true;OPT.fxauto=0;KFK.auto=""}}catch(e){}}
kfkAuto();KFK.slowHits=0;
setInterval(()=>{try{if(typeof OPT==="undefined"||OPT.fxpick||OPT.fxon===false||!KFX.app||document.hidden)return;
 if(KFX.q<=.31&&KFX.parts.length>8){if(++KFK.slowHits>=3){OPT.fxon=false;OPT.fxauto=1;KFK.auto="slow";kitFxClear()}}else KFK.slowHits=Math.max(0,KFK.slowHits-1)}catch(e){}},2000);
/* ---------- §68.8 PERSON MOTION · kitFigMove(kind, who, o) — what happens TO a person's picture on the stage (owner 15/11 20:05Z item 13 + 22:45Z list; review/presentation-wiring) ----------
   who = a person object | "me" (her figure #mefig) | a picture element. The ONE place that animates a stage figure; every caller (jpres people moments, kit page) goes through it.
   Painted rule: no drawn shapes. A figure is moved / tinted / faded with CSS filter + translate on the picture itself (composite "add", so the people-picture filter url(#kfa)
   (jfighd) stays first and the picture's own filters keep working); the painted sprites / sheets come from kitFxBurst / kitFxSheet / kitFxRim. Terminal kinds (die, drag, out)
   animate a GHOST copy of the picture (the stage may re-render under them). Pace = kitPace (BAL.pace). Gọn / reduced motion / bots: nothing (the log line + sound already say it).
   kinds: flush (slap: one jolt + red flush) · poison (tint green, blur, recover) · grey (dims to grey, recover) · die (ghost greys, sinks, fades; white silk falls over her) ·
          drag (ghost dragged off the stage, dims) · out (ghost slides out, fades) · in (slides in, fades up) · glow (rim light of a tone; pregnancy pink / birth / favour; never over the face) */
const KFK_FIG={flush:900,poison:3200,grey:2600,die:3000,drag:1700,out:1000,in:1000,glow:2400};
/* a stage picture that can really be seen (a hidden silhouette must never get a ghost / glow) */
function kfkSeen(e){try{if(!e||e.getBoundingClientRect().width<=8)return false;const c=getComputedStyle(e);return c.visibility!=="hidden"&&c.display!=="none"&&+c.opacity>.05}catch(x){return false}}
function kfkFigEl(who){try{if(who&&who.nodeType===1)return kfkSeen(who)?who:null;if(who&&who.snap)return who;
 if(who==="me"||(typeof S!=="undefined"&&who===S)){const m=document.getElementById("mefig");return kfkSeen(m)?m:null}
 if(!who||typeof curPeople!=="function")return null;const L=curPeople();let i=L.indexOf(who);if(i<0)i=L.findIndex(x=>x&&x.ref===who);if(i<0)return null;   /* the stage lists wrappers {kind, ref, name…}: the real person is x.ref */
 
 const t=document.querySelector(`#tokens .tok[data-p="${i}"]`);if(!t)return null;const e=t.querySelector("img.figimg")||t.querySelector(".md");return kfkSeen(e)?e:null}catch(x){return null}}
/* el = a picture element, or a snapshot {snap:1, rect, src, filter} taken before a re-render removed it (kfkSnap) */
function kfkSnap(el){try{const r=el.getBoundingClientRect();if(r.width<8||el.tagName!=="IMG")return null;const f=getComputedStyle(el).filter;return{snap:1,rect:{left:r.left,top:r.top,width:r.width,height:r.height},src:el.currentSrc||el.src,filter:f==="none"?"":f}}catch(x){return null}}
function kfkGhost(el){try{const sn=!!el.snap,r=sn?el.rect:el.getBoundingClientRect();if(r.width<8)return null;let g;
 if(sn||el.tagName==="IMG"){g=document.createElement("img");g.src=sn?el.src:(el.currentSrc||el.src);g.draggable=false}else{g=el.cloneNode(true)}
 g.className="kfxk-g";g.setAttribute("aria-hidden","true");const fl=sn?el.filter:(c=>c.filter==="none"?"":c.filter)(getComputedStyle(el));
 g.style.cssText+=`;left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;filter:${fl}`;document.body.appendChild(g);
 const pv=sn?"":el.style.visibility;if(!sn)el.style.visibility="hidden";KFK.live.add(g);
 g.__h={stop(){try{if(!sn)el.style.visibility=pv}catch(x){}KFK.live.delete(g);g.remove()}};return g}catch(x){return null}}
function kitFigMove(kind,who,o){o=o||{};const D=KFK_FIG[kind];if(!D||!kfOn())return null;
 const el=kfkFigEl(who);if(!el||kfStill())return null;kfkLog("fig:"+kind);const ms=kitPace(o.ms||D);const ease="cubic-bezier(.3,.1,.3,1)";
 const F=(x)=>({filter:x});const A=[];const run=(t,k,opt)=>{try{const a=t.animate(k,Object.assign({duration:ms,easing:ease,composite:"add"},opt||{}));A.push(a);return a}catch(x){return null}};
 const h={el,kind,stop(){A.forEach(a=>{try{a.cancel()}catch(x){}});try{g&&g.__h.stop()}catch(x){}},get alive(){return A.some(a=>a.playState==="running")}};let g=null;
 if(kind==="flush"){const R="sepia(.4) saturate(2.3) hue-rotate(-30deg)",Z="sepia(0) saturate(1) hue-rotate(0deg)";
  run(el,[{filter:Z,translate:"0 0"},{filter:R,translate:"-5px 0",offset:.16},{filter:R,translate:"4px 0",offset:.3},{filter:R,translate:"-2px 0",offset:.46},{filter:Z,translate:"0 0"}])}
 else if(kind==="poison"){const Z="hue-rotate(0deg) saturate(1) brightness(1) blur(0px)",P="hue-rotate(62deg) saturate(1.7) brightness(.82) blur(0px)",B="hue-rotate(62deg) saturate(1.7) brightness(.78) blur(1.4px)";
  run(el,[{filter:Z},{filter:P,offset:.3},{filter:B,offset:.6},{filter:B,offset:.78},{filter:Z}])}
 else if(kind==="grey"){const Z="grayscale(0) brightness(1)",G="grayscale(1) brightness(.78)";run(el,[{filter:Z},{filter:G,offset:.3},{filter:G,offset:.75},{filter:Z}])}
 else if(kind==="glow"){return kitFxRim(el,{tone:o.tone||"lotuslight",a:o.a,r:o.r,dur:ms})}
 else if(kind==="in"){run(el,[{opacity:0,translate:`${o.from||-40}px 0`},{opacity:1,translate:"0 0"}],{composite:"replace"})}
 else{/* die / drag / out: ghost */
  g=kfkGhost(el);if(!g)return null;const Z="grayscale(0) brightness(1) blur(0px)";const base=g.style.filter||"";
  if(kind==="die"){const G="grayscale(1) brightness(.72) blur(1.2px)";g.animate([{filter:`${base} ${Z}`,opacity:1,translate:"0 0"},{filter:`${base} ${G}`,opacity:.85,translate:"0 0",offset:.45},{filter:`${base} ${G}`,opacity:0,translate:"0 18px"}],{duration:ms,easing:"ease-in",fill:"forwards"});
   try{if(typeof kitFxSheet==="function")kitFxSheet("silk",el.snap?{x:el.rect.left+el.rect.width/2,y:el.rect.top+el.rect.height*.45}:el,el.snap?{size:el.rect.width*1.05}:{scale:1.05,cy:.45})}catch(x){}}
  else if(kind==="drag"){const dx=(o.dir||1)*Math.min(innerWidth*.6,420);g.animate([{filter:`${base} ${Z}`,opacity:1,translate:"0 0",rotate:"0deg"},{filter:`${base} grayscale(.6) brightness(.8) blur(0px)`,opacity:.9,translate:`${dx*.35}px 0`,rotate:`${(o.dir||1)*2}deg`,offset:.4},{filter:`${base} grayscale(1) brightness(.6) blur(1px)`,opacity:0,translate:`${dx}px 0`,rotate:`${(o.dir||1)*4}deg`}],{duration:ms,easing:"cubic-bezier(.45,0,.55,1)",fill:"forwards"})}
  else{g.animate([{opacity:1,translate:"0 0"},{opacity:0,translate:`${(o.dir||1)*60}px 0`}],{duration:ms,easing:"ease-in",fill:"forwards"})}
  setTimeout(()=>g&&g.__h.stop(),ms+80)}
 return h}
Object.assign(window,{kitFigMove,kfkFigEl,kfkSnap,KFK_FIG});
Object.assign(window,{kitFxRim,kfkPersons,KFK_PERSON,kitFxSprite,kitFxBurst,kitFxLight,kitFxSheet,kitFxEdge,kitFxObj,kitFxGift,kitFxGiftCarry,kitFxLetter,kitFxPreload,kitFxClear,KFK_SP,KFK_LIGHT,KFK_SHEET,KFK_EDGE});
(function(){const st=document.createElement("style");st.textContent=`
.kfxk{position:fixed;z-index:9445;pointer-events:none;opacity:0;transition:opacity .45s ease;background-repeat:no-repeat;background-position:center;background-size:contain}
.kfxk.on{opacity:var(--kfo,1)}
.kfxk-catch{position:fixed;inset:0;z-index:9446;background:transparent;touch-action:none}.kfxk-in{position:absolute}
.kfxk-l,.kfxk-scr{mix-blend-mode:screen}
.kfxk-e{inset:0;width:100vw;height:100vh;background-size:100% 100%;z-index:9446;transform-origin:50% 50%}
.kfxk-o{background-repeat:no-repeat;will-change:transform}
.kfxk-g{position:fixed;z-index:9439;pointer-events:none;object-fit:contain;margin:0;max-width:none;max-height:none;transform:none;will-change:opacity,transform}
.kfxk-pgr{flex-wrap:wrap;gap:6px}.kfxk-pgd{background:#1c1820;padding:8px;border-radius:8px}.kfxk-pgi{height:22px;max-width:120px;object-fit:cover;object-position:left;vertical-align:middle}
.kfxk-l video{width:100%;height:100%;object-fit:contain;display:block;background:#000}
@media (prefers-reduced-motion:reduce){.kfxk{transition:none}}
`;document.head.appendChild(st)})();
/* §68.8 kit page sample: a demo picture + a button per kitFigMove kind (the kinds act on the picture itself) */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§68.8",title:"kitFigMove · hoạt ảnh trên người (flush · poison · grey · die · drag · out · in · glow)",
 html:()=>`<div class="kitpg-row kfxk-pgr kfxk-pgd"><img id="kfxk-demo" src="img/kit/unknown-fig-f.webp" alt="" style="height:150px;width:auto">${Object.keys(KFK_FIG).map(k=>`<button type="button" class="kbtn alt" onclick="kitFigMove('${k}',document.getElementById('kfxk-demo'),{dir:1})">fig ${k}</button>`).join("")}</div>`})}catch(e){}
/* §47 kit page sample: every painted kind, every light, every sheet (tap to play) */
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§68",title:"painted-fx · kitFxBurst · kitFxLight · kitFxSheet (hiệu ứng vẽ tay)",
 html:()=>`<div class="kitpg-row kfxk-pgr">${Object.keys(KFK_SP).map(n=>`<button type="button" class="kbtn alt" onclick="kitFxBurst('${n}',this,14)"><img class="kfxk-pgi" src="${kfkU(n+".webp")}" alt=""> ${n}</button>`).join("")}</div>`+
  `<div class="kitpg-row kfxk-pgr kfxk-pgd">${Object.keys(KFK_LIGHT).map(n=>`<button type="button" class="kbtn alt" onclick="kitFxLight('${n}',this.parentNode,{dur:3200,scale:.9})">${n}</button>`).join("")}${Object.keys(KFK_SHEET).map(n=>`<button type="button" class="kbtn alt" onclick="kitFxSheet('${n}',this.parentNode,{scale:.9})">${n}</button>`).join("")}</div>`+
  `<div class="kitpg-row kfxk-pgr">${Object.keys(KFK_EDGE).map(n=>`<button type="button" class="kbtn alt" onclick="kitFxEdge('${n}')">edge ${n}</button>`).join("")}`+
  `<button type="button" class="kbtn alt" onclick="kitFxGift('give',this,{kind:'silk'})">gift give</button><button type="button" class="kbtn alt" onclick="kitFxGift('open',this)">gift open</button>`+
  `<button type="button" class="kbtn alt" onclick="kitFxGift('refuse',this)">gift refuse</button><button type="button" class="kbtn alt" onclick="kitFxLetter(this)">letter</button></div>`+
  `<div class="kitpg-row kfxk-pgr">${["petal","wind","snow","snowh","frost","drizzle","storm","mist","fly","sun","bolt"].map(k=>`<button type="button" class="kbtn alt" onclick="kfWxPreview('${k}')">weather ${k}</button>`).join("")}</div>`+
  `<div class="kitpg-row kfxk-pgr">${Object.keys(FX).filter(k=>k!=="lock").map(k=>`<button type="button" class="kbtn alt" onclick="kitFx('${k}',{el:this})">kitFx ${k}</button>`).join("")}</div>`})}catch(e){}
