/* ================= jcraft: shared parts of the four CRAFT mini-games (owner OD 20/11 ~08:15Z "4 cái game mà chơi cái kiểu mà đồ nét chữ … boring lắm";
   design dev/design/MG_CRAFTS.md; review/mg-craft lead + review/mg-craft-ve + review/mg-craft-hoa) =================
   Engines (same KG82 contract as j82 / j91: eng(box, env{kind, lv = board ease, hud, end(raw 0..10)}) → stop; KG82.peek = the test oracle / the guided round's
   hand; KG82.hint = a timing game's «tap now» point):
     jcraft_theu.js  td_cong «Thêu theo nét» engine "stitch" (lead; owner 21/11 ~01:05Z: Thêu keeps the j82 memory game, the stitch board serves Công, jtd registers it)
     jcraft_kim.js   kim   «Cắt hoa giấy»    engine "papercut"  (lead)
     jcraft_ve.js    ve    «Thủy mặc»        engine "inkwash"   (review/mg-craft-ve)
     jcraft_hoa.js   hoa   «Chọn mùa · cắt cành · nghiêng thế»  engine "ikebana" (review/mg-craft-hoa)
   Wiring: the ONE table KG82_CRAFT (j91 re-wire block) names each kind's engine + rules text; crReg(kind, eng, fn) registers the engine and switches the kind.
   Numbers: every board number is a lever BAL.mgTier.lev.<kind>.<name> = [ease 0, ease 5] read through crLev (= mgLev); pieces with rank through mgMore,
   the time part through mgPace (ONE CORE, law 4; harder as she climbs, law 5). Score road unchanged: raw 0..10 → mgGrade(raw, kind) with BAL.mgTier.kG.
   No words in play (OD 20/11 ~05:10Z): every cue is a picture; signs only (★ ✗ ✓). Pictures: crArt draws the painted sprite when Foreman C has delivered it
   (name listed in CR_HAVE), else the canvas stand-in and the name is recorded once in CTM_MISSING_PICS (kitPhNote "mg") = the «tạm» marker of the kit. */
const CRAFT={speed:1};/* tests only: CRAFT.speed > 1 runs the craft boards' clocks faster (crNow); the game never changes it */
const CR_B={r:null,g:0,s:1};/* the craft clock: continuous when CRAFT.speed changes (tests only) */
function crNow(){const n=performance.now();if(CR_B.r==null){CR_B.r=n;CR_B.g=n;CR_B.s=CRAFT.speed}if(CRAFT.speed!==CR_B.s){CR_B.g+=(n-CR_B.r)*CR_B.s;CR_B.r=n;CR_B.s=CRAFT.speed}return CR_B.g+(n-CR_B.r)*CR_B.s}
/* register an engine; switch the kind to it from KG82_CRAFT (rules text, move picture, lesson label) */
function crReg(kind,eng,fn){KG82_ENG[eng]=fn;const D=(typeof KG82_CRAFT!=="undefined"&&KG82_CRAFT[kind])||null;const K=KG82_KIND[kind];if(!D||D.e!==eng||!K)return;
 const was=K.e;K.e=eng;K.t=D.t;K.how=D.how;if(D.n)K.n=D.n;if(D.demo)KG82_DEMO[eng]=D.demo;
 if(D.mgl)for(const a in KG82_MGL)if(KG82_MGL[a][1]===kind)KG82_MGL[a]=[D.mgl,kind];
 if(D.spr)KG82_SPR[kind]=D.spr;
 /* the engine this kind left: unregistered once no kind runs it (mg-allkinds guard 1: every KG82_ENG engine backs a kind; old trace / arrange). The
    functions stay where something still calls them directly (k91Trace: jwkg Chép kinh / May áo) */
 if(was!==eng&&!Object.values(KG82_KIND).some(k=>k.e===was))delete KG82_ENG[was]}
/* is the kind on its craft engine? (tests, scans) */
function crOn(kind){const D=KG82_CRAFT[kind];return !!D&&KG82_KIND[kind]&&KG82_KIND[kind].e===D.e&&typeof KG82_ENG[D.e]==="function"}
/* a board lever (mgLev) — the craft engines never type a number of their own */
function crLev(env,kind,name){const v=mgLev(env,kind,name);if(v==null)throw new Error("BAL.mgTier.lev."+kind+"."+name+" missing");return v}
/* painted sprites Foreman C has delivered (img/kit/mg-<name>.webp); until then the stand-in is drawn and the name is listed as a missing picture */
const CR_HAVE=new Set(["ve-motif-sonchu","ve-motif-sonkhach","ve-motif-thuyen","ve-motif-tung","kim-sample","kim-wedge","kim-cut-moon","kim-cut-tri","kim-cut-drop","kim-cut-half","theu-hoop","theu-spool"]);
function crArt(g,name,x,y,w,h,o,stand){if(CR_HAVE.has(name)&&kg82Spr(g,name,x,y,w,h,o))return true;
 try{if(typeof kitPhNote==="function")kitPhNote("mg",name,"light","mini-game craft sprite "+name)}catch(e){}if(stand)stand();return false}
/* review/mg-color (owner OD 25/11 ~23:05Z «cả 8 cuộn chỉ cùng màu một đỏ thì tao biết chọn cái màu gì»): a painted sprite that stands for a CHOICE or a STATE
   (a thread shade, an ink tone, a cut paper) must show THAT colour / state, never the painter's own colour. crArt alone drew the painted picture INSTEAD of the
   stand-in, so the stand-in's colour was lost (8 identical red spools; the Vẽ sample's ink tones all black). crArtTint draws the sprite in colour col
   ("rgb(..)" / "#hex" / [r,g,b]): CR_TINT[name].area = the part of the picture that takes the colour (a path in the sprite's own px; none = the whole
   silhouette, as ink), .shade = the light drawn over it; the tinted copy is cached per sprite + skin + colour. No sprite yet → the stand-in (as crArt). */
const CR_TINT={"theu-spool":{/* the wound thread between the two wooden flanges (measured on mg-theu-spool.webp 444x640: x .105–.89, top rim y≈.205–.23, bottom rim arc to .883) */
 area:(c,w,h)=>{c.moveTo(.105*w,.205*h);c.quadraticCurveTo(.5*w,.25*h,.89*w,.205*h);c.lineTo(.89*w,.8*h);c.quadraticCurveTo(.5*w,.965*h,.105*w,.8*h);c.closePath()},shade:"cyl"}};
const CR_TC=new Map();
function crTintImg(name,col){const im=kg82Img(name);if(!(im.complete&&im.naturalWidth))return null;col=Array.isArray(col)?crRGB(col):String(col);
 const key=name+"|"+(KG82.skin&&KG82.skin.id||"")+"|"+col;let c=CR_TC.get(key);if(c)return c;const w=im.naturalWidth,h=im.naturalHeight,T=CR_TINT[name]||{};
 c=document.createElement("canvas");c.width=w;c.height=h;const x=c.getContext("2d");x.drawImage(im,0,0,w,h);
 if(T.area){x.save();x.beginPath();T.area(x,w,h);x.clip();x.fillStyle=col;x.fillRect(0,0,w,h);
  if(T.shade==="cyl"){/* a round spool: darker at both sides, one soft light streak; thin wound lines. The middle keeps the true shade (the colour she matches) */
   const gr=x.createLinearGradient(.105*w,0,.89*w,0);[[0,"rgba(0,0,0,.32)"],[.2,"rgba(0,0,0,0)"],[.34,"rgba(255,255,255,.2)"],[.46,"rgba(255,255,255,0)"],[.82,"rgba(0,0,0,.05)"],[1,"rgba(0,0,0,.34)"]].forEach(([o,v])=>gr.addColorStop(o,v));
   x.fillStyle=gr;x.fillRect(0,0,w,h);x.lineWidth=Math.max(1,h*.004);for(let k=0;k<38;k++){const y=.2*h+k*h*.0175;x.globalAlpha=.13;x.strokeStyle=k%2?"#000":"#fff";x.beginPath();x.moveTo(.1*w,y);x.quadraticCurveTo(.5*w,y+h*.028,.9*w,y+h*.006);x.stroke()}}
  x.restore()}
 else{x.globalCompositeOperation="source-in";x.fillStyle=col;x.fillRect(0,0,w,h)}
 if(CR_TC.size>160)CR_TC.clear();CR_TC.set(key,c);return c}
function crArtTint(g,name,x,y,w,h,o,col,stand){o=o||{};const c=CR_HAVE.has(name)?crTintImg(name,col):null;
 if(c){if(w==null)w=h*c.width/c.height;if(h==null)h=w*c.height/c.width;g.save();g.translate(x,y);if(o.rot)g.rotate(o.rot);if(o.alpha!=null)g.globalAlpha*=o.alpha;g.drawImage(c,-w*(o.ax==null?.5:o.ax),-h*(o.ay==null?.5:o.ay),w,h);g.restore();return true}
 return crArt(g,name,x,y,w,h,o,stand)}
/* a painted surface used as a TEXTURE inside a shape the engine draws (the cut paper keeps its holes): fills the current path with the sprite (cover), false = not loaded */
function crTex(g,name,x,y,w,h){if(!CR_HAVE.has(name)||!kg82Ok(name))return false;g.save();g.clip();g.drawImage(kg82Img(name),x,y,w,h);g.restore();return true}
/* the frame loop on the craft clock (crNow), so a test can run the board faster; returns stop() */
function crLoop(fn){let stop=false,raf=0;const L=()=>{if(stop)return;fn(crNow());if(!stop)raf=requestAnimationFrame(L)};raf=requestAnimationFrame(L);return()=>{stop=true;cancelAnimationFrame(raf)}}
/* a timeout on the craft clock */
function crLater(f,ms){return setTimeout(f,Math.max(0,ms/(CRAFT.speed||1)))}
/* the HUD of a round-based craft board (kit chips). x = the raw float if the rest of the play goes perfectly (mgReach + the open round's reach): the score
   cell shows the ONE grade mgLive(env, x) like every other mini-game (review/mg-score-same, owner bug 20/11 ~06:50Z; dev/test/mg-score-same-scan.py) */
function crHud(env,x,r,NR,left){env.hud({score:mgLive(env,Math.max(0,x-(env.hintCut?env.hintCut():0))),/* hintCut: the hints taken in the Tứ đức wrapper (jtd tdWrap), as its env.end */round:`Hồi ${Math.min(r+1,NR)}/${NR}`,time:left!=null?`${Math.max(0,Math.ceil(left/1000))} giây`:"–"})}
/* the pop colour of a judged round (one rule for the family, review/mg-score-same C-AG #29): good work the time part cut shows gold, not green */
function crCol(q,sp){return q>=.55?(sp<.995?K91C.gold():K91C.good()):q>=.3?K91C.gold():K91C.red()}
const crStars=q=>q>=.85?"★★★":q>=.55?"★★":q>=.3?"★":"✗";
/* colour helpers (stand-in drawing) */
function crMix(a,b,t){return a.map((x,i)=>Math.round(x+(b[i]-x)*t))}
const crRGB=c=>`rgb(${c.join(",")})`;
/* a small stand-in spool of silk (stitch) / a stand-in shape (kim) is drawn by each engine; a dashed hairline marks a stand-in picture on the board (no word) */
function crTmp(g,x,y,w,h){g.save();g.setLineDash([3,3]);g.strokeStyle="rgba(143,95,12,.45)";g.lineWidth=1;g.strokeRect(x,y,w,h);g.restore()}
window.crArtTint=crArtTint;window.crTex=crTex;window.CRAFT=CRAFT;window.crReg=crReg;window.crOn=crOn;window.crLev=crLev;window.crNow=crNow;
