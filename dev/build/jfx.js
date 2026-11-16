/* ================= jfx — CẢM GIÁC GAME (game feel, owner 11/14–11/15) — KIT § Cảm giác/FX =================
   1. Touch kit (CSS + one pointer listener): every button / card / tab presses in (scale .96, shadow pulls in, gold rim light), springs back on
      release, a pale-gold ripple spreads from the touch point; primary buttons (.kbtn) catch a slow sheen now and then; a LOCKED button
      (disabled / .kdis) shakes a little + short buzz and its reason pops above it; main tabs + person-card tabs have a sliding underline.
   2. kitFx(kind, {el|x,y}) — ONE entry for every felt moment, driven by the table FX below: phone buzz (VIB pattern, OPT.vib, Android only:
      iPhone/iPad have no navigator.vibrate, the picture effects stand in), screen shake, light flash, Pixi particles.
   3. Pixi overlay: ONE transparent canvas over everything (pointer-events:none), loaded lazily from the bundled dev/vendor/pixi-8.5.2.min.js
      (kitPixi(), shared with j11's stage layer; cached by sw.js through assets.json → plays offline). Ticker stops when nothing moves;
      particle budget drops by itself when frames run slow (KFX.q).
   4. Numbers fly: after a result card, each changed top-bar stat (+Sủng, −Đức…) flies from the card into ITS cell, which glows.
   Off switches: "Cảnh động" off or prefers-reduced-motion → no particles, no shake, no flash, no ripple/sheen (kfStill()); "Rung" off → no buzz.
   Bots (window.__bot) and quiet code paths: nothing.
   Test hook: window.KFX {log:[kinds], app, q, live, loaded}. */
const KFX=window.KFX={log:[],app:null,q:1,live:0,loaded:false,loading:null,parts:[],tex:{},amb:0,fps:60,slow:0,fast:0};
/* buzz patterns added to j11's VIB (ms) */
Object.assign(VIB,{win:[12,40,12],fail:[35],death:[45],lock:[14],demote:[60,50,60],preg:[15,30,15],harm:[30,30,70]});
/* THE TABLE: kind → buzz · shake (1 light, 2 hard) · flash · particles (comma list) */
const FX={   /* every picture here is PAINTED (KIT §68 painted-fx): px = Pixi sprite kinds, flash gold/warm = glowburst sprite, flash blood/poison/
               inkwisp = painted edge overlay (kitFxEdge), sheet = true-alpha sheet (kitFxSheet), light = screen-blend clip (kitFxLight) */
 decree :{vib:"decree", shake:1,flash:"gold", px:"rays,golddust"}, // thánh chỉ, ân thưởng (gold dust off the edict)
 promote:{vib:"promote",shake:1,flash:"gold", px:"rays,stars,goldpetals"}, // thăng phẩm, tấn phong
 coin   :{vib:"coin",                         px:"coins"},         // lĩnh bổng, được bạc
 hit    :{vib:"hit",    shake:2,              px:"brush"},         // bị tát, bị phạt: brush streak + paper shake
 harm   :{vib:"harm",   shake:2,flash:"blood",px:"ink"},           // bị hãm hại nặng: ink-blood bleeds in from the edges
 poison :{vib:"poison", shake:2,flash:"poison"},                   // trúng độc: green-black ink seeps in
 expose :{vib:"expose", shake:2,flash:"blood",px:"ink"},           // bị phát giác, bị định tội
 verdict:{              shake:1,              px:"inks"},          // con dấu định tội (đi cùng expose): seal slam + ink blot
 seal   :{vib:"lock",   shake:1,              px:"inks"},          // con dấu thi tài / ấn định
 ink    :{                                    px:"inks"},          // kẻ khác sa cơ
 rumour :{                      flash:"inkwisp"},                  // lời đồn: ink wisps curl in
 birth  :{vib:"birth",          flash:"warm", px:"flowers"},       // sinh con
 preg   :{vib:"preg",           flash:"warm", px:"lotus"},         // có thai: lotus light + lotus petals
 favour :{                                    px:"petals"},        // được sủng
 romance:{                                    px:"peach"},         // tình ý: peach blossom
 betray :{vib:"harm",                         sheet:"thread"},     // phản bội / đoạn tuyệt: the red thread snaps
 night  :{vib:"night",          flash:"night",px:"motes"},         // đêm thị tẩm
 death  :{vib:"death",          flash:"dark", sheet:"silk",px:"incense"}, // chết: dims, white silk falls, incense rises
 demote :{vib:"demote",         flash:"dark", px:"jade,ash"},      // giáng phẩm, lãnh cung: cracked jade + ash
 ash    :{                                    px:"ash"},           // vào lãnh cung
 win    :{vib:"win",                          px:"stars"},         // THÀNH
 fail   :{vib:"fail",                         px:"smoke"},         // HỎNG / BẤT LỢI
 mgwin  :{vib:"win",                          px:"stars"},         // thắng trò nhỏ
 mglose :{vib:"fail",                         px:"smoke"},         // thua trò nhỏ
 lantern:{                                    px:"lanterns"},      // đèn trời đêm lễ
 festival:{                                   px:"lanterns",light:"fireworks"}, // Tết / Giao thừa tối: sky lanterns + fireworks (only via FESTFX)
 letter :{                                    px:"letter"},        // mật thư
 lock   :{vib:"lock"}                                              // chạm nút khóa
};
window.FX=FX;
/* festival / night effects: ONE table, effect -> which festivals (FEST keys, j31) and which buổi it may play in (null = any buổi). Owner 11/16: every effect must match the CURRENT buổi and the CURRENT event;
   fireworks ONLY on Tết and Giao thừa evenings (owner: an ordinary evening with fireworks feels wrong; Tết/Giao thừa with them is normal); indoor/outdoor does not matter. A festival or buổi not listed gets nothing. B4L = tối (named constant, never a raw index). */
const FESTFX={
 festival:{fest:["newyear","giaothua"],buoi:[B4L]},                 /* one-shot sky lanterns + fireworks (kitFx "festival") */
 lantern:{fest:["nguyentieu","trungthu"],buoi:[B4L]},                /* one-shot sky lanterns (kitFx "lantern"), once per night */
 gold:{fest:["newyear","giaothua","nguyentieu"],buoi:null},          /* gold/red sparks (j33 pxKind) */
 fly:{fest:["thattich","trungthu"],buoi:[B4L]}};                     /* fireflies (j33 pxKind) */
function kfFestFx(e){try{if(typeof S==="undefined"||!S||S.dead||typeof festToday!=="function")return false;const T=FESTFX[e],f=festToday();return !!(T&&f&&T.fest.includes(f.k)&&(!T.buoi||T.buoi.includes(S.buoi||0)))}catch(x){return false}}
window.FESTFX=FESTFX;window.kfFestFx=kfFestFx;
function kfOn(){return !window.__bot&&!(typeof quiet!=="undefined"&&quiet)}
function kfStill(){try{return matchMedia("(prefers-reduced-motion: reduce)").matches||(typeof OPT!=="undefined"&&OPT.fxon===false)}catch(e){return false}}
function kfPt(o){o=o||{};if(o.x!=null)return{x:o.x,y:o.y};const el=o.el&&o.el.getBoundingClientRect?o.el:null;if(el){const r=el.getBoundingClientRect();if(r.width)return{x:r.left+r.width/2,y:r.top+r.height/2,r}}
 return{x:innerWidth/2,y:innerHeight*.42}}
function kitFx(kind,o){const f=FX[kind];if(!f||!kfOn())return false;o=o||{};KFX.log.push(kind);if(KFX.log.length>60)KFX.log.shift();
 try{if(f.vib)vib(f.vib)}catch(e){}
 if(kfStill())return true;
 if(f.shake)kfShake(f.shake);if(f.flash)kfFlash(f.flash,kfPt(o));
 if(f.px){const pt=kfPt(o);for(const p of f.px.split(","))kfPx(p,pt)}
 try{if(f.sheet&&typeof kitFxSheet==="function")kitFxSheet(f.sheet,o.el||null,f.sheet==="silk"?{scale:1.1}:{});
  if(f.light&&typeof kitFxLight==="function")kitFxLight(f.light,null,{dur:o.dur||4000,scale:1})}catch(e){}
 return true}
window.kitFx=kitFx;
/* ---------- shake + flash (DOM, transform/opacity only) ---------- */
function kfShake(lv){const g=document.querySelector(".game")||document.getElementById("game");if(!g||!g.animate)return;
 const a=lv>1?7:3.5,K=lv>1?[[0,0],[-a,1.5],[a,-2],[-a*.7,1],[a*.5,-1],[-a*.25,.5],[0,0]]:[[0,0],[-a,0],[a,.8],[-a*.5,0],[0,0]];
 try{g.animate(K.map(([x,y])=>({translate:`${x}px ${y}px`})),{duration:lv>1?360:260,easing:"ease-out"})}catch(e){}}
/* gold / warm light = the PAINTED gold glow (KIT §68 sprite "glowburst", true alpha: shows on paper and on dark scenes); red / dark / night stay
   plain screen washes (colour grading over the whole screen, not a drawn object) */
function kfFlash(k,pt){if((k==="blood"||k==="poison"||k==="inkwisp")&&typeof kitFxEdge==="function"){kitFxEdge(k==="inkwisp"?"ink":k);return}
 if(k==="red"&&typeof kitFxEdge==="function"){kitFxEdge("blood",{hold:300});return}  /* old callers of the flat red flash get the painted edge */
 if((k==="gold"||k==="warm")&&typeof kitFxBurst==="function"){const r=pt&&pt.r,sz=r?Math.max(r.width,r.height):Math.min(innerWidth,innerHeight)*.55;
  kitFxBurst("glowburst",pt||null,1,{scale:Math.max(.6,Math.min(2.4,sz/220)),a0:k==="warm"?.6:.95,life:k==="warm"?70:55});return}
 const d=document.createElement("div");d.className="kfx-fl kfx-"+k;document.body.appendChild(d);setTimeout(()=>d.remove(),k==="dark"||k==="night"?2300:1500)}
/* ---------- Pixi: one loader (also used by j11's stage layer) ---------- */
function kfApp(){if(KFX.app)return Promise.resolve(KFX.app);if(KFX.loading)return KFX.loading;
 KFX.loading=kitPixi().then(async P=>{const app=new P.Application();await app.init({backgroundAlpha:0,resizeTo:window,antialias:false,autoDensity:true,resolution:1,powerPreference:"low-power"});
  const c=app.canvas;c.id="kfxcv";c.setAttribute("aria-hidden","true");document.body.appendChild(c);app.ticker.maxFPS=60;KFX.root=new P.Container();app.stage.addChild(KFX.root);
  kfTex(P,app);app.ticker.add(kfTick);app.ticker.stop();c.style.display="none";KFX.app=app;KFX.loaded=true;return app}).catch(e=>{KFX.loading=null;KFX.failed=(KFX.failed||0)+1;throw e});
 return KFX.loading}
/* textures: PAINTED atlases only (KIT §68 painted-fx, jfxkit KFK_SP), loaded per kind on first use. The old code-drawn shapes
   (glow, petal, leaf, star, coin, streak, blob, lantern — Pixi Graphics) are gone (owner 15/11 20:55Z: never code-drawn art). */
function kfTex(){}
/* particle: pooled painted sprite (jfxkit kfkSp) + v {vx,vy,g,drag,life,max,spin,grow,a0,fade,sway,tw}. tex = a KFK_SP kind; tint only
   applies to neutral art (orb, streak, smoke). Old shape names map to their painted kind. */
const KF_ALIAS={glow:"orb",star:"spark",blob:"smoke",petal:"petal-plum"};
function kfSp(tex,x,y,v,tint,sc,blend){const k=KF_ALIAS[tex]||tex;const s=kfkSp(k,x,y,v,tint,sc,blend);if(s)return s;if(!KFK.loaded.has(k))kfkLoad([k]).catch(()=>{});return{v:{},scale:{set(){},x:1},rotation:0}}
/* THE ONE SWAP LINE for the real-look weather pictures (owner 16/11 snow + fireflies redo): snow = soft round flakes, firefly = glowing point. Now the painted soft "orb"; when
   Foreman C's snow-real-* / fly-real-* land on the CDN, add them to KFK_SP (jfxkit.js) and change ONLY these two names. */
const KF_SPR={snow:"orb",fly:"orb"};
const KF_SEASON=()=>{const m=(typeof S!=="undefined"&&S&&S.month)||1;return m<=3?["petal-peach"]:m<=6?["orb","ember"]:m<=9?["leaf","osmanthus"]:[KF_SPR.snow,KF_SPR.snow,"petal-plum"]};  /* spring = PINK peach blossom only (never yellow = autumn); summer = sunlit motes + light rays, no petals (owner 16/11 12:08Z) */
function kfBudget(n){const w=kitView().pages===1?.65:1;return Math.max(1,Math.round(n*KFX.q*w))}
const R01=()=>Math.random(),RS=(a,b)=>a+Math.random()*(b-a);
const KF_SPAWN={
 rays(p){const n=kfBudget(22);for(let i=0;i<n;i++){const a=RS(-Math.PI*.95,-Math.PI*.05),sp=RS(7,14);const s=kfSp("streak",p.x,p.y,{vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,drag:.93,life:RS(40,60)},R01()<.5?0xf0d070:0xfff3c4,RS(.6,1.2));s.rotation=a}},
 stars(p){const n=kfBudget(14),r=p.r,w=r?Math.max(120,r.width):260,h=r?Math.max(80,r.height):200;for(let i=0;i<n;i++){kfSp("spark",p.x+RS(-.55,.55)*w,p.y+RS(-.6,.5)*h,{life:RS(50,80),fade:"inout",tw:RS(.15,.3),vy:-.15},null,RS(.5,1.1)).rotation=0}},
 coins(p){const n=kfBudget(18);for(let i=0;i<n;i++){const s=kfSp("coin",RS(.08,.92)*innerWidth,RS(-120,-10),{vx:RS(-.6,.6),vy:RS(2,4),g:.22,life:RS(90,120),spin:RS(-.03,.03),coin:1,a0:1},null,RS(.8,1.25));s.v.ph=R01()*6}},
 ink(p){const n=kfBudget(6);for(let i=0;i<n;i++)kfSp("ink",p.x+RS(-60,60),p.y+RS(-50,50),{life:RS(70,95),grow:RS(.01,.02),a0:RS(.55,.75)},null,RS(.6,1.2))},
 inks(p){const n=kfBudget(3);for(let i=0;i<n;i++)kfSp("ink",p.x+RS(-40,40),p.y+RS(-30,30),{life:RS(55,70),grow:RS(.008,.012),a0:.45},null,RS(.4,.8))},
 flowers(p){const n=kfBudget(26),K=["petal-peach","petal-peach","petal-plum","osmanthus"];for(let i=0;i<n;i++){const a=RS(0,Math.PI*2),sp=RS(3,8);kfSp(K[i%4],p.x,p.y,{vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-2,g:.09,drag:.96,life:RS(80,110),spin:RS(-.12,.12),sway:.6},null,RS(.8,1.4))}},
 petals(p){const n=kfBudget(16),K=KF_PET();for(let i=0;i<n;i++)kfSp(K[i%K.length],RS(0,innerWidth),RS(-80,-10),{vx:RS(-.4,.4),vy:RS(1.2,2.2),life:RS(140,200),spin:RS(-.05,.05),sway:.8,fade:"inout"},null,RS(.8,1.3))},
 motes(p){const n=kfBudget(16);for(let i=0;i<n;i++){const e=R01()<.6;kfSp(e?"ember":"orb",RS(.1,.9)*innerWidth,RS(.45,1)*innerHeight,{vx:RS(-.2,.2),vy:RS(-1.1,-.4),life:RS(120,170),fade:"inout",a0:.75,sway:.4},0xffc070,e?RS(.7,1.2):RS(.3,.55))}},
 ash(p){const n=kfBudget(22);for(let i=0;i<n;i++)kfSp("ash",RS(0,innerWidth),RS(-60,-5),{vx:RS(-.5,.5),vy:RS(.8,1.6),life:RS(150,210),spin:RS(-.06,.06),sway:.7,fade:"inout",a0:.85},null,RS(.6,1.1))},
 smoke(p){const n=kfBudget(7);for(let i=0;i<n;i++)kfSp("smoke",p.x+RS(-50,50),p.y+RS(-10,20),{vx:RS(-.3,.3),vy:RS(-1.2,-.6),life:RS(70,95),grow:RS(.004,.008),fade:"inout",a0:.55},0x8a8580,RS(.6,1))},
 lanterns(p){const n=kfBudget(9);for(let i=0;i<n;i++){const x=RS(.06,.94)*innerWidth,y=innerHeight+RS(10,260),sc=RS(.8,1.5);
   const gl=kfSp("orb",x,y,{vy:RS(-1.1,-.7),life:RS(420,540),fade:"inout",a0:.5,sway:.25,lant:1},0xffa040,sc*1.4);const l=kfSp("lantern",x,y,{vy:gl.v.vy,life:gl.v.life,fade:"inout",a0:.95,sway:.25,lant:1},null,sc);l.rotation=RS(-.12,.12);l.v.ph=gl.v.ph}},
 pop(p){const n=kfBudget(6);for(let i=0;i<n;i++){const a=RS(0,Math.PI*2);kfSp("spark",p.x,p.y,{vx:Math.cos(a)*2,vy:Math.sin(a)*2,drag:.9,life:30},null,RS(.35,.6)).rotation=0}},
 brush(p){const n=Math.min(2,kfBudget(2));for(let i=0;i<n;i++){const s=kfSp("brush",p.x+RS(-40,40),p.y+RS(-30,30),{life:RS(34,44),fade:"out",a0:.92,grow:.004},null,RS(3.2,4.2));s.rotation=RS(-.5,.2)}},
 goldpetals(p){const n=kfBudget(18);for(let i=0;i<n;i++)kfSp("petal-peach",RS(0,innerWidth),RS(-90,-10),{vx:RS(-.4,.4),vy:RS(1.3,2.3),life:RS(140,200),spin:RS(-.06,.06),sway:.8,fade:"inout"},null,RS(.8,1.3))},
 golddust(p){const n=kfBudget(22),r=p.r,w=r?Math.max(160,r.width):300;for(let i=0;i<n;i++)kfSp(R01()<.5?"spark":"ember",p.x+RS(-.5,.5)*w,p.y+RS(-40,10),{vx:RS(-.3,.3),vy:RS(.3,1.2),life:RS(70,120),fade:"inout",tw:.2,a0:.95},null,RS(.3,.7))},
 jade(p){const n=kfBudget(9);for(let i=0;i<n;i++){const a=RS(-Math.PI*.9,-Math.PI*.1),sp=RS(2,5.5);kfSp("jade",p.x+RS(-12,12),p.y+RS(-8,8),{vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,g:.22,life:RS(60,90),spin:RS(-.18,.18),fade:"out"},null,RS(.8,1.3))}},
 incense(p){const n=kfBudget(6);for(let i=0;i<n;i++)kfSp("incense",RS(.25,.75)*innerWidth,innerHeight*RS(.65,.9),{vx:RS(-.15,.15),vy:RS(-.9,-.5),life:RS(160,220),grow:.002,fade:"inout",a0:.6,sway:.3},0xe8e2d8,RS(1.4,2.2)).rotation=0},
 lotus(p){kfSp("lotuslight",p.x,p.y,{life:120,grow:.004,fade:"inout",a0:.9},null,1.1).rotation=0;const n=kfBudget(10);for(let i=0;i<n;i++){const a=RS(0,Math.PI*2),sp=RS(1.5,4);kfSp("petal-lotus",p.x,p.y,{vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-1,g:.05,drag:.97,life:RS(90,130),spin:RS(-.06,.06),sway:.5},null,RS(.8,1.2))}},
 peach(p){const n=kfBudget(18);for(let i=0;i<n;i++)kfSp("petal-peach",RS(0,innerWidth),RS(-80,-10),{vx:RS(-.5,.3),vy:RS(1.1,2),life:RS(150,210),spin:RS(-.05,.05),sway:.9,fade:"inout"},null,RS(.8,1.3))},
 letter(p){const s=kfSp("letter",p.x,p.y+40,{vy:-.5,drag:.97,life:110,fade:"inout",a0:1},null,1.6);s.rotation=RS(-.12,.12);s.texture=KFK.tex.letter[0]}
};
/* painted kinds each spawner needs (loaded before it runs); other modules adding KF_SPAWN kinds add their row here */
const KF_PET=()=>{const s=KF_SEASON();return s[0]===KF_SPR.snow&&s.length>1?["petal-plum"]:s[0]==="leaf"?["petal-peach","osmanthus"]:s[0]==="orb"?["petal-lotus"]:s};
const KF_KINDS={rays:["streak"],stars:["spark"],coins:["coin"],ink:["ink"],inks:["ink"],flowers:["petal-peach","petal-plum","osmanthus"],petals:()=>KF_PET(),
 motes:["ember","orb"],ash:["ash"],smoke:["smoke"],lanterns:["orb","lantern"],pop:["spark"],
 brush:["brush"],goldpetals:["petal-peach"],golddust:["spark","ember"],jade:["jade"],incense:["incense"],lotus:["lotuslight","petal-lotus"],peach:["petal-peach"],letter:["letter"]};
function kfKinds(name){const k=KF_KINDS[name];return typeof k==="function"?k():(k||[])}
function kfPx(name,p){if(kfStill()||!KF_SPAWN[name])return;kfApp().then(()=>kfkLoad(kfKinds(name))).then(()=>{try{KF_SPAWN[name](p||kfPt());kfWake()}catch(e){console.error(e)}}).catch(()=>{})}
function kfWake(){const a=KFX.app;if(!a)return;if(a.canvas.style.display==="none")a.canvas.style.display="";if(!a.ticker.started)a.ticker.start()}
function kfTick(tk){const d=Math.min(3,tk.deltaTime),H=innerHeight,W=innerWidth,L=KFX.parts;let amb=0;KFX.gt=(KFX.gt||0)+d/60;KFX.gust=Math.max(0,Math.sin(KFX.gt*.7))*1.6;
 for(let i=L.length-1;i>=0;i--){const s=L[i],v=s.v;v.life-=d;
  if(v.life<=0||(v.amb&&(v.lay==="wx"&&KFX.sr?(s.y>KFX.sr.y+KFX.sr.h+20||s.y<KFX.sr.y-90||s.x<KFX.sr.x-90||s.x>KFX.sr.x+KFX.sr.w+90):(s.y>H+20||s.y<-90||s.x<-90||s.x>W+90)))){kfkFree(s);L.splice(i,1);continue}
  if(v.fx!=null){if(KFX.sr){s.x=KFX.sr.x+v.fx*KFX.sr.w;s.y=KFX.sr.y+v.fy*KFX.sr.h}v.ph+=.03*d;s.alpha=v.a0*(.7+.3*Math.sin(v.ph*3));continue}
  v.ph+=.03*d;if(v.gust)s.x+=KFX.gust*v.gust*d;v.vx*=Math.pow(v.drag,d);v.vy=v.vy*Math.pow(v.drag,d)+v.g*d;s.x+=(v.vx+(v.sway?Math.sin(v.ph)*v.sway:0))*d;s.y+=v.vy*d;
  if(v.spin)s.rotation+=v.spin*d;if(v.coin)s.scale.x=v.sc*Math.cos(v.ph*3);if(v.grow)s.scale.set(s.scale.y+v.grow*d);
  const f=v.life/v.max;let a=v.a0;if(v.fade==="out")a=v.a0*Math.min(1,f*2.2);else if(v.fade==="inout")a=v.a0*Math.min(1,f*4,(1-f)*6);if(v.tw)a*=.55+.45*Math.sin(v.ph*v.tw*40);if(v.bl){const q=.5+.5*Math.sin(v.ph*v.bl);a*=.3+.7*Math.sqrt(q)}s.alpha=Math.max(0,a);
  if(v.amb)amb++}
 KFX.live=L.length;KFX.amb=amb;kfBoltTick(d);
 /* quality: frames slower than ~48 fps for half a second → fewer particles; steady 58+ for 4 s → back up */
 const fps=KFX.app.ticker.FPS;KFX.fps=KFX.fps*.9+fps*.1;if(L.length>8){if(KFX.fps<48){if(++KFX.slow>30){KFX.q=Math.max(.3,KFX.q*.7);KFX.slow=0;KFX.fps=55}}else KFX.slow=0;if(KFX.fps>58){if(++KFX.fast>240&&KFX.q<1){KFX.q=Math.min(1,KFX.q*1.15);KFX.fast=0}}else KFX.fast=0}
 if(!L.length&&!KFX.ambOn&&KFX.bt==null){KFX.app.ticker.stop();KFX.app.renderer.render(KFX.app.stage);KFX.app.canvas.style.display="none"}}
/* TWO kit layers on the ONE jfx Pixi canvas (#kfxcv: painted sprites only, pointer-events none; owner 16/11):
   (1) WEATHER ("wx"): today's weather S.wx (j12 WX) — rain, snow, mist, weather petals / leaves, night fireflies — clipped to the STAGE rectangle (Pixi mask),
       its own bolder look (bigger, denser, wind gusts). j11's stage layer no longer makes weather particles.
   (2) SEASON ("se"): the month's petals / lotus / leaves / snow (KF_SEASON) over the WHOLE screen, sparse + translucent so text stays readable. Over the
       stage rectangle it hides itself while the weather is the same kind of falling thing (never two copies of petals at once).
   Night = a slight dim only (colour kept). Gọn / reduced motion (kfStill) = none. Both capped (KF_WX cap x phone x adaptive KFX.q, plus KFK_CAP). */
const KF_WX={
 petal:{k:["petal-peach"],cap:26,vx:[.2,1],vy:[1.2,2.2],sway:1,spin:.07,sc:[1.5,2.3],a0:.95,gust:1,fall:1,tint:0xffc4d4},  /* hoa đào: deeper pink than the raw art, never yellow */
 leaf:{k:["leaf"],cap:16,vx:[0,.8],vy:[1.2,2],sway:1.1,spin:.05,sc:[1.4,2],a0:.9,gust:.8,fall:1},
 wind:{k:["leaf","leaf","leaf","streak"],cap:96,vx:[5,9],vy:[.3,1.4],sway:1.4,spin:.12,sc:[1.3,2.1],a0:.95,gust:2.2,fall:1,fromLeft:1,line:1},  /* blown leaves + pale wind streaks, gusting */
 snow:{k:[KF_SPR.snow],cap:150,vx:[-.3,.3],vy:[.7,1.3],sway:.6,spin:.02,sc:[1.5,2.5],a0:1,gust:.3,fall:1,snow:1},  /* blue-tinted flakes read on light paintings too */
 snowh:{k:[KF_SPR.snow],cap:190,vx:[-1,.2],vy:[1.2,2.2],sway:.7,spin:.02,sc:[1.4,2.5],a0:1,gust:.6,fall:1,snow:1},
 frost:{k:[KF_SPR.snow],cap:26,vx:[-.2,.2],vy:[.4,.8],sway:.4,spin:.01,sc:[1.1,1.7],a0:.9,fall:1,snow:1},
 snowp:{k:[KF_SPR.snow,KF_SPR.snow,"petal-plum"],cap:84,vx:[-.3,.5],vy:[.7,1.4],sway:.7,spin:.03,sc:[1.4,2.4],a0:1,gust:.5,fall:1,snow:1},
 drizzle:{k:["streak"],cap:38,vx:[-.8,-.4],vy:[9,12],a0:.75,rain:1,tint:0xc4d6e6,sc:[.8,1.1]},
 storm:{k:["streak"],cap:80,vx:[-3.4,-2],vy:[14,19],a0:.8,rain:1,tint:0xbccde0,sc:[.9,1.2],bolt:1},
 mist:{k:["smoke"],cap:4,vx:[.15,.45],vy:[-.12,.12],a0:.22,float:1,tint:0xf0ece4,sc:[3,4.6],life:[480,700]},
 fly:{k:[KF_SPR.fly],cap:90,vx:[-.3,.3],vy:[-.25,.25],sway:.8,a0:1,float:1,sc:[.5,.8],life:[300,560],glow:1},  /* each firefly = tiny warm core + soft green-gold halo (2 sprites), slow wander, deep slow blink, depth (near = bigger, far = tiny) */
 gold:{k:["petal-peach"],cap:20,vx:[-.3,.3],vy:[.8,1.5],sway:.8,spin:.05,sc:[1,1.6],a0:.85,gust:.4}
};
/* LIGHTNING (owner 16/11 12:08Z: flash the WHOLE background frame): one plain light wash over the full stage rectangle, above figures and art
   (the weather layer's own stage mask), two quick strobes then a fade; j11 calls kfBolt() with the thunder sound; Gọn / reduced motion = no flash */
function kfBolt(full){if(kfStill()||!kfOn())return;kfApp().then(()=>{kfWxSync();const P=window.PIXI;KFX.bfull=!!full||!KFX.sr;const r=KFX.bfull?{x:0,y:0,w:innerWidth,h:innerHeight}:KFX.sr,par=KFX.bfull?KFX.root:KFX.wroot;if(!P||!r||!par)return;
 if(!KFX.bolt){const b=new P.Sprite(P.Texture.WHITE);b.tint=0xf2f6ff;b.alpha=0;KFX.bolt=b}
 const b=KFX.bolt;b.x=r.x;b.y=r.y;b.width=r.w;b.height=r.h;KFX.bt=0;par.addChild(b);kfWake()}).catch(()=>{})}
function kfBoltTick(d){const b=KFX.bolt;if(!b||KFX.bt==null)return;const t=KFX.bt+=d,r=KFX.bfull?{x:0,y:0,w:innerWidth,h:innerHeight}:KFX.sr;if(r){b.x=r.x;b.y=r.y;b.width=r.w;b.height=r.h}
 b.alpha=t<3?.92:t<7?.92-(t-3)*.2:t<10?.8:Math.max(0,.8*Math.exp(-(t-10)/7));if(t>48){b.alpha=0;KFX.bt=null}}
function kfWxCfg(){try{if(typeof S==="undefined"||!S)return null;const w=S.wx?S.wx.k:"dust",night=(S.buoi||0)===B4L,nm=S.wx?S.wx.n:"";let id=null;
 if(w==="petal"||w==="leaf"||w==="wind"||w==="snow"||w==="snowh"||w==="frost"||w==="snowp"||w==="storm")id=w;else if(w==="rain")id="drizzle";else if(w==="mist")id="mist";
 else if(night&&(w==="dust"||nm==="đom đóm"))id="fly";
 /* festival days (was code-drawn in j33 via pxKind): which festival and which buổi come ONLY from the FESTFX table (gold / fly rows); indoor/outdoor does not matter; replaces the weather as before */
 try{if(kfFestFx("gold"))id="gold";else if(kfFestFx("fly"))id="fly"}catch(e){}
 if(!id)return null;const c=Object.assign({lay:"wx"},KF_WX[id]);c.id=id;c.night=night;return c}catch(e){return null}}
const KF_RAYS={lay:"se2",id:"rays",k:["streak","streak","streak","glowburst"],cap:9,float:1,ray:1,vx:[-.12,.12],vy:[0,.08],a0:.6,life:[320,520],sc:[1,1.2],tint:0xfff2b8};  /* summer light shafts: painted streak stretched into soft slanted beams */
function kfSeCfg(){const m=(typeof S!=="undefined"&&S&&S.month)||1,night=typeof S!=="undefined"&&S&&(S.buoi||0)===B4L;
 /* SUMMER (Apr-Jun, lotus season): no petals; sunlit golden motes drifting up through the light (+ light rays, see KF_RAYS) */
 if(m>=4&&m<=6&&night)return{lay:"se",id:"sunn",k:["orb"],cap:0,off:1,float:1,vx:[0,0],vy:[0,0],sc:[1,1],a0:0,life:[60,60],night};  /* no sunlight at night: the night room shows fireflies (weather layer) only */
 if(m>=4&&m<=6)return{lay:"se",id:"sun",k:KF_SEASON(),cap:36,float:1,vx:[-.25,.25],vy:[-.55,-.15],sway:.5,sc:[1.1,2],a0:.95,life:[260,420],tint:0xffe08a,night};
 return{lay:"se",id:"se",k:KF_SEASON(),cap:8,vx:[-.35,.25],vy:[.5,.9],sway:.9,spin:.03,sc:[.7,1.05],a0:.7,fall:1,night:typeof S!=="undefined"&&S&&(S.buoi||0)===B4L}}
function kfStageRect(){try{const st=document.getElementById("stage");if(!st)return null;const r=st.getBoundingClientRect();return r.width>40&&r.height>40&&getComputedStyle(st).visibility!=="hidden"?{x:r.left,y:r.top,w:r.width,h:r.height}:null}catch(e){return null}}
function kfWxSync(){const r=kfStageRect();KFX.sr=r;const P=window.PIXI;if(!P||!KFX.app)return;
 if(!KFX.wroot){KFX.wroot=new P.Container();KFX.wmask=new P.Sprite(P.Texture.WHITE);KFX.wroot.mask=KFX.wmask;KFX.app.stage.addChild(KFX.wroot,KFX.wmask)}  /* clip = a plain white rectangle sprite, not art */
 if(r){KFX.wmask.x=r.x;KFX.wmask.y=r.y;KFX.wmask.width=r.w;KFX.wmask.height=r.h}else{KFX.wmask.width=0;KFX.wmask.height=0}}
function kfWxCap(c){const q=KFX.q,m=(kitView().pages===1?.65:1),box=c.lay==="wx"&&KFX.sr?Math.min(1,KFX.sr.w*KFX.sr.h/(innerWidth*innerHeight*.5)):1;return Math.max(2,Math.round(c.cap*m*q*Math.max(c.rain?.75:.4,box)))}
function kfWxSpawn(c,scatter){const sr=c.lay==="wx"?KFX.sr:{x:0,y:0,w:innerWidth,h:innerHeight};if(!sr)return;const k=c.k[Math.floor(R01()*c.k.length)],vx=RS(c.vx[0],c.vx[1]),sc=RS(c.sc[0],c.sc[1]),a0=c.a0*(c.night?.82:1),zs=c.snow&&k===KF_SPR.snow?Math.pow(R01(),1.5):null,vy=RS(c.vy[0],c.vy[1])*(zs==null?1:.6+.9*zs);let x,y,v;
 if(c.float){x=sr.x+RS(0,sr.w);y=sr.y+RS(0,sr.h);if(c.ray){x=sr.x+RS(.3,1.02)*sr.w;y=sr.y+RS(-.05,.3)*sr.h}v={vx,vy,life:Math.round(RS(c.life[0],c.life[1])),sway:c.sway||0,fade:"inout",a0,amb:1,tw:c.tw||0}}
 else{const ln=c.line&&k==="streak";x=c.fromLeft?(scatter?sr.x+RS(0,sr.w):sr.x-50):sr.x+RS(-.04,1.04)*sr.w;y=c.fromLeft||scatter?sr.y+RS(0,sr.h*.95):sr.y+RS(-30,-8);v={vx:ln?vx*2.4:vx,vy:ln?vy*.5:vy,life:ln?Math.ceil((sr.w+200)/(vx*2.4))+30:c.fromLeft?Math.ceil((sr.w+200)/vx)+30:Math.ceil((sr.h+140)/vy)+60,sway:ln?0:c.sway||0,spin:c.rain||ln?0:RS(-c.spin,c.spin),fade:"none",a0:ln?.7:a0,amb:1,ln}}
 v.lay=c.lay;if(c.gust)v.gust=c.gust;if(c.fall&&c.lay==="wx")v.fam=1;
 const s=kfSp(k,x,y,v,c.tint!=null?c.tint:null,sc);if(!s||!s.v||!s.v.max)return;
 if(zs!=null&&!c.rain){/* REAL SNOW: soft round flakes of mixed size; far = tiny + crisp + slow, near = big + soft (blurred look) + faster + wider sway; blue-white so it reads on light paintings */
  const b=s.v.sc/sc,z=zs;s.scale.set(b*(.3+.9*z));s.blendMode="normal";s.tint=z<.5?0x8cade6:0xc2d5f7;s.v.a0=.98-.45*z*z;s.v.sway=(c.sway||0)*(.5+1*z);s.v.spin=0;
  /* crisp white core on the soft blue body: reads on light AND dark paintings; same path, same sway */
  const t2=z>.4?kfSp(KF_SPR.snow,x,y,Object.assign({},s.v,{a0:Math.min(1,s.v.a0+.1),ph:s.v.ph}),0xffffff,sc*(.14+.34*z),"normal"):null;if(t2&&t2.v&&t2.v.max){t2.rotation=0;t2.v.ph=s.v.ph;if(KFX.wroot&&c.lay==="wx")KFX.wroot.addChild(t2)}}
 else if(c.glow&&!c.rain){/* REAL FIREFLY: z = depth (near = bigger + brighter); halo (green-gold, big, soft) + tiny warm core twin sharing the same path and the same slow blink; additive on the night painting */
  const z=R01(),b=s.v.sc/sc,add=c.night?"add":"normal",bl=RS(.75,1.25);s.rotation=0;s.scale.set(b*(1.1+1.4*z));s.blendMode=add;s.tint=0xa8ff30;s.v.a0=(add==="add"?.8:.5)*(.65+.35*z);s.v.bl=bl;
  const t2=kfSp(KF_SPR.fly,x,y,Object.assign({},s.v,{a0:1,ph:s.v.ph,bl}),0xfff8b0,b*(.4+.5*z),add);if(t2&&t2.v&&t2.v.max){t2.rotation=0;t2.v.ph=s.v.ph;t2.v.bl=bl;if(KFX.wroot&&c.lay==="wx")KFX.wroot.addChild(t2)}}
if(c.ray&&k==="glowburst"){s.x=sr.x+sr.w*.9;s.y=sr.y+sr.h*.03;s.scale.set(s.v.sc*3.4);s.v.a0=.5;s.blendMode="normal";s.tint=0xffffff}
 else if(c.ray){s.rotation=2.25+RS(-.12,.12);s.scale.set(s.v.sc*RS(13,18),s.v.sc*RS(7,11));s.blendMode="normal"}
 else if(s.v.ln){s.rotation=Math.atan2(s.v.vy,s.v.vx);s.scale.set(s.v.sc*RS(5,9),s.v.sc*RS(1.1,1.8));s.blendMode="normal";s.tint=0xb7a688}
 else if(c.rain){const z=Math.max(.7,Math.min(1,sr.h/520));/* streak length follows the stage height (short stage on a phone in landscape) */s.rotation=Math.atan2(vy,vx);s.scale.set(s.v.sc*2.6*z,s.v.sc*3*z);s.blendMode="normal"}else if(c.float)s.rotation=0;
 if(c.lay==="wx"&&KFX.wroot)KFX.wroot.addChild(s)}
/* kit page sample (§68.6): one full-screen burst of a weather kind, no game state needed (id = KF_WX key, "sun" = summer rays + motes, "bolt" = lightning) */
function kfWxPreview(id){if(id==="bolt"){kfBolt(true);return}
 const c=id==="sun"?kfSeCfg():Object.assign({lay:"se"},KF_WX[id]);if(id==="sun"){c.lay="se";c.id="sun";c.k=["orb","ember"];c.tint=0xffe08a}if(!c||!c.k)return;
 const L=id==="sun"?[c,KF_RAYS]:[c];kfApp().then(()=>kfkLoad(L.flatMap(x=>x.k))).then(()=>{for(const q of L){const n=Math.round(kfWxCap(q)*.8);for(let i=0;i<n;i++)kfWxSpawn(Object.assign({},q,{lay:q.lay,float:q.float}),true)}kfWake()}).catch(()=>{})}
function kfWxClear(lay,ms){for(const s of KFX.parts)if(s.v&&s.v.amb&&(!lay||s.v.lay===lay)){s.v.fade="out";s.v.max=ms||40;s.v.life=Math.min(s.v.life,ms||40)}}
function kfAmbWant(){try{return !!(KFX.ambOK&&typeof S!=="undefined"&&S&&!S.dead&&!kfStill()&&!document.hidden&&kfOn()&&!document.querySelector(".kmov,#dawn:not([hidden]),#kroul,#kpodov,#title:not([hidden]),#kload"))}catch(e){return false}}
let kfAmbT=0;
function kfAmbLive(lay){let n=0;for(const s of KFX.parts)if(s.v&&s.v.amb&&s.v.lay===lay&&s.v.fade!=="out")n++;return n}
/* night decoration on the stage (moved from j11's code-drawn dots): warm lantern glows + stars, PAINTED orb / spark sprites */
function kfDecoClear(){for(const s of KFX.parts)if(s.v&&s.v.deco)s.v.life=0}
function kfDeco(){let key="";try{if(typeof S!=="undefined"&&S&&(S.buoi||0)===B4L&&KFX.sr){const P=placeOf(S.place);key=P.sc+"|"+(["vuon","lc","home"].includes(P.sc)?1:0)}}catch(e){}
 if(KFX.decoK===key)return;KFX.decoK=key;kfDecoClear();if(!key)return;const out=key.endsWith("|1");
 kfkLoad(["orb","spark"]).then(()=>{if(KFX.decoK!==key)return;[[.12,.3],[.88,.3],[.3,.18],[.7,.18]].forEach(([x,y],i)=>{const s=kfSp("orb",0,0,{life:1e9,max:1e9,a0:.5,fade:"none",deco:1,fx:x,fy:y,lay:"wx"},0xffb050,2.2);if(s&&s.v&&s.v.max)KFX.wroot&&KFX.wroot.addChild(s)});
  if(out)for(let i=0;i<14;i++){const s=kfSp("spark",0,0,{life:1e9,max:1e9,a0:.8,fade:"none",deco:1,fx:Math.random(),fy:Math.random()*.25,lay:"wx"},null,.3);if(s&&s.v&&s.v.max)KFX.wroot&&KFX.wroot.addChild(s)}kfWake()}).catch(()=>{})}
function kfAmbient(){const on=kfAmbWant();KFX.ambOn=on;if(!on){clearInterval(kfAmbT);kfAmbT=0;if(KFX.amb)kfWxClear();kfDecoClear();KFX.decoK="";return}
 if(kfAmbT)return;kfAmbT=-1;kfApp().then(()=>kfkLoad(kfSeCfg().k)).then(()=>{if(kfAmbT!==-1)return;if(!kfAmbWant()){kfAmbT=0;return}kfWake();KFX.keys={};
  kfAmbT=setInterval(()=>{if(!kfAmbWant()){KFX.ambOn=false;clearInterval(kfAmbT);kfAmbT=0;kfWxClear();kfDecoClear();KFX.decoK="";return}kfWxSync();
   let se=kfSeCfg();const w=kfWxCfg();const L=[];
   /* ONE petal effect: falling weather of the SAME kind as the season (peach/plum in spring, leaves in autumn, snow in winter) IS the season layer, full screen, in the weather's bolder motion but gentler count/size */
   if(w&&w.fall&&!w.line&&w.k.some(k=>se.k.includes(k))){se=Object.assign({},w,{lay:"se",cap:Math.round(w.cap*.85),sc:[w.sc[0]*.9,w.sc[1]*.9],a0:Math.min(.95,w.a0)});L.push(se)}
   else{if(!se.off)L.push(se);if(w&&KFX.sr)L.push(w)}
   if(se.id==="sun")L.push(KF_RAYS);else if(KFX.keys.se2){KFX.keys.se2="";kfWxClear("se2",60)}
   if(!L.some(c=>c.lay==="wx")&&KFX.keys.wx){KFX.keys.wx="";kfWxClear("wx",60)}
   kfDeco();
   for(const c of L){const key=c.id+"|"+c.night+"|"+c.k.join();
    if(key!==KFX.keys[c.lay]){const first=!KFX.keys[c.lay];KFX.keys[c.lay]=key;if(!first)kfWxClear(c.lay,90);kfkLoad(c.k).then(()=>{const n=Math.round(kfWxCap(c)*(c.float?.5:c.snow?.9:.7));if(!c.float)for(let i=0;i<n;i++)kfWxSpawn(c,true);kfWake()}).catch(()=>{});continue}
    let cap=kfWxCap(c);
    const n=Math.min(c.rain?12:c.line?6:c.snow?3:1,cap-kfAmbLive(c.lay));for(let i=0;i<n;i++)kfWxSpawn(c,false);if(n>0)kfWake()}},250)}).catch(()=>{kfAmbT=0})}
/* ---------- numbers fly from the result card into their top-bar cell ---------- */
const KF_CELL={sung:"hud-sung",danh:"hud-danh",suc:"hud-suc",bac:"hud-bac",duc:"hud-duc",sac:"hud-sac",tai:"hud-tai",tamco:"hud-tamco"};
function kfNumbers(card,before){if(!card||!before||typeof S==="undefined"||!S)return;const keys=typeof RKEYS!=="undefined"?RKEYS:[];const L=[];
 for(const [k,n] of keys){const dv=(S[k]||0)-(before[k]||0);if(dv)L.push([k,n.replace(/ với ngươi$/,""),dv])}if(!L.length)return;
 document.querySelectorAll(".kmfls").forEach(e=>e.remove());const r=card.getBoundingClientRect();if(!r.width||typeof kitStatFx!=="function")return;
 /* KIT §57.1 kitStatFx: name + delta label flies slowly (queued, tap skips) to its top-bar cell, which glows green / red and pulses */
 const n=Math.min(L.length,7);kitStatFx(L.slice(0,7).map(([k,nm,dv],i)=>({k,name:nm,dv,from:{x:r.left+r.width/2,y:r.top}})),{src:"card"})}
/* ---------- touch kit ---------- */
/* no bare [data-tab]: the tab PANEL #panel carries data-tab="<tab>" too (that matched the whole pane: owner 15/11); the tab buttons are <button> */
const KF_TAP='button,.btn,.kbtn,.opt,.card,.pct,[role="button"],[role="tab"]';
const KF_FIG="#me,#emp,.tok";
/* the REAL tappable element under the finger (owner 15/11 "Whole tab panel bounces on any tap"): a .card / .pct / anything in KF_TAP that is
   only a container (no button, role, onclick or pointer cursor) is never pressed — the search goes on to a real tappable ancestor;
   and nothing bigger than KF_BIG of the screen is ever pressed (a pane, a tab panel, a whole-screen catcher). null = no press at all. */
/* KF_BIGR (r1): a REAL button may be big — an act card on a phone in landscape (844x390) is ~45% of the screen and must still press */
const KF_REAL='button,a[href],.btn,.kbtn,.opt,[role="button"],[role="tab"],[onclick]',KF_BIG=.3,KF_BIGR=.7;
function kfTapOf(t){let el=t&&t.closest?t.closest(KF_TAP):null;
 while(el&&!(el.matches(KF_REAL)||typeof el.onclick==="function"||getComputedStyle(el).cursor==="pointer"))el=el.parentElement?el.parentElement.closest(KF_TAP):null;
 if(!el)return null;const r=el.getBoundingClientRect();if(!r.width||r.width*r.height>innerWidth*innerHeight*(el.matches(KF_REAL)?KF_BIGR:KF_BIG))return null;return el}
function kfDis(el){return el.disabled||el.classList.contains("kdis")||el.getAttribute("aria-disabled")==="true"}
function kfWhy(el){const w=[...el.querySelectorAll(".kwhy:not(.kok)")].map(x=>x.textContent.replace(/^[✗✓]\s*/,"").trim()).filter(Boolean);return w[0]||el.getAttribute("title")||el.dataset.why||""}
function kfRipple(el,e){const r=el.getBoundingClientRect();if(!r.width||r.width*r.height>innerWidth*innerHeight*.45)return;const cs=getComputedStyle(el);
 const box=document.createElement("div");box.className="kfrip";box.style.cssText=`left:${r.left}px;top:${r.top}px;width:${r.width}px;height:${r.height}px;border-radius:${cs.borderRadius}`;
 const d=Math.hypot(Math.max(e.clientX-r.left,r.right-e.clientX),Math.max(e.clientY-r.top,r.bottom-e.clientY))*2;const i=document.createElement("i");i.style.cssText=`left:${e.clientX-r.left-d/2}px;top:${e.clientY-r.top-d/2}px;width:${d}px;height:${d}px`;
 box.appendChild(i);document.body.appendChild(box);setTimeout(()=>box.remove(),620)}
let kfLastNo=0;
function kfLocked(el,e){const now=Date.now();if(now-kfLastNo<350)return;kfLastNo=now;try{if(kfOn())vib("lock")}catch(x){}KFX.log.push("lock");
 if(!kfStill()&&el.animate)try{el.animate([{translate:"0 0"},{translate:"-4px 0"},{translate:"4px 0"},{translate:"-3px 0"},{translate:"2px 0"},{translate:"0 0"}],{duration:300,easing:"ease-out"})}catch(x){}
 const why=kfWhy(el);document.querySelectorAll(".kflockwhy").forEach(n=>n.remove());if(!why)return;const r=el.getBoundingClientRect();const n=document.createElement("div");n.className="kflockwhy";n.textContent=why;document.body.appendChild(n);
 const w=Math.min(n.offsetWidth,innerWidth-24);n.style.left=Math.max(12,Math.min(innerWidth-12-w,(e&&e.clientX!=null?e.clientX:r.left+r.width/2)-w/2))+"px";n.style.top=Math.max(8,r.top-n.offsetHeight-6)+"px";setTimeout(()=>{n.classList.add("out");setTimeout(()=>n.remove(),260)},1900)}
(function(){let down=null;
 const onDown=e=>{if(e.button>0)return;const t=e.target;if(!t||!t.closest)return;
  /* locked: the event target can be the disabled button itself (Chrome, Safari pointer events) */
  const lk=t.closest('button:disabled,.kdis,[aria-disabled="true"]');if(lk&&lk.closest(KF_TAP)){kfLocked(lk,e);return}
  const el=kfTapOf(t);if(!el||kfDis(el))return;if(el.matches(KF_FIG))return;down=el;el.classList.add("kfdown");if(!kfStill())kfRipple(el,e)};
 const onUp=()=>{const el=down;down=null;if(!el)return;el.classList.remove("kfdown");if(kfStill()||!el.isConnected||!el.animate||el.classList.contains("tok"))return;
  try{el.animate([{scale:".96"},{scale:"1.025",offset:.55},{scale:"1"}],{duration:240,easing:"ease-out"})}catch(x){}};
 document.addEventListener("pointerdown",onDown,{capture:true,passive:true});document.addEventListener("pointerup",onUp,{capture:true,passive:true});document.addEventListener("pointercancel",onUp,{capture:true,passive:true});
 /* browsers that swallow pointer events on disabled buttons still deliver the click/touch to the parent: hit-test the locked buttons there */
 document.addEventListener("click",e=>{const t=e.target;if(!t||!t.querySelectorAll||t.closest(KF_TAP))return;for(const b of t.querySelectorAll('button:disabled')){const r=b.getBoundingClientRect();if(e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom){kfLocked(b,e);break}}},true)})();
/* sliding underline under the selected tab (main tabs, person-card tabs, sub-tabs) */
/* tab-underline (C39): ONLY the main nav gets the sliding line. Chip rows (.pctabs/.kcattabs, scroll sideways) and .ksub rows mark the selected chip themselves (filled chip / inset underline), so a JS-positioned line drawn over a scrolling row went stale and struck through the chips */
const KF_TABS=[["#tabs",'[data-tab][aria-selected="true"]']];const KF_TPOS={};
function kfTabsClean(){document.querySelectorAll(".kftl").forEach(l=>{if(!l.parentElement||!l.parentElement.matches("#tabs"))l.remove()})}
function kfTabs(){kfTabsClean();for(const [cs,as] of KF_TABS){document.querySelectorAll(cs).forEach(c=>{const a=c.querySelector(as);let ln=c.querySelector(":scope>.kftl");
  if(!a||!a.offsetWidth){if(ln)ln.style.opacity="0";return}
  if(getComputedStyle(c).position==="static")c.style.position="relative";
  const cr=c.getBoundingClientRect(),ar=a.getBoundingClientRect(),x=ar.left-cr.left-c.clientLeft+c.scrollLeft,w=ar.width,y=ar.bottom-cr.top-c.clientTop+c.scrollTop-3;const key=cs+"|"+(c.id||"");
  if(!ln){ln=document.createElement("i");ln.className="kftl";c.appendChild(ln);const p=KF_TPOS[key];if(p){ln.style.transition="none";ln.style.transform=`translate(${p[0]}px,${y}px)`;ln.style.width=p[1]+"px";void ln.offsetWidth;ln.style.transition=""}}
  ln.style.opacity="1";ln.style.transform=`translate(${x}px,${y}px)`;ln.style.width=w+"px";KF_TPOS[key]=[x,w]})}}
let kfTabQ=0;function kfTabsSoon(){if(kfTabQ)return;kfTabQ=requestAnimationFrame(()=>{kfTabQ=0;try{kfTabs()}catch(e){}})}
document.addEventListener("click",e=>{if(e.target&&e.target.closest&&e.target.closest("button[data-tab],.pct,.ksubb"))setTimeout(kfTabsSoon,30)},true);addEventListener("resize",kfTabsSoon);
/* ---------- wiring into the game ---------- */
(function(){const W=(n,f)=>{const o=window[n];if(typeof o!=="function")return;window[n]=f(o)};
 const MAP={good:"mgwin",bad:"mglose"};
 /* every existing feedback(kind) (j11: bestow, promoteP, deathSentence, fall, punish, birthP, nightFx, apply bạc, openMG, poison/frame…) now goes
    through kitFx for buzz + picture; sound stays; kinds without a row (tap, page, step, open, heart) keep j11's behaviour */
 W("feedback",o=>function(k,x){const m=MAP[k]||(FX[k]?k:null);if(!m||!kfOn())return o.apply(this,arguments);try{if(typeof SFXN!=="undefined"&&SFXN[k])sfx(SFXN[k])}catch(e){}
  if(k==="coin"&&KFX.coinT&&Date.now()-KFX.coinT<1500)return;if(k==="coin")KFX.coinT=Date.now();kitFx(m,x);if(k==="coin"&&!kfStill())try{coinPop(x&&x.n)}catch(e){}});
 /* result card: THÀNH → stars at the seal, HỎNG/BẤT LỢI → grey smoke (exposed → ink + buzz); numbers fly to their cells */
 W("resultShow",o=>function(title,before){const r=o.apply(this,arguments);try{const t=document.getElementById("rtoast");if(t&&t.classList.contains("on")&&kfOn()){const ok=t.classList.contains("ok");
   const txt=t.textContent||"";const kind=!ok&&/bị lộ|bị phát giác|lộ tẩy|bị bắt quả tang/i.test(txt)?"expose":ok?"win":"fail";const seal=t.querySelector(".kmseal")||t.querySelector(".seal")||t;
   setTimeout(()=>kitFx(kind,{el:kind==="win"?t:seal}),kind==="win"?380:200);kfNumbers(t,before)}}catch(e){console.error(e)}return r});
 /* motion pieces (j93) get their buzz + particles when they actually show */
 W("kmStage",o=>function(cls){const r=o.apply(this,arguments);try{if(kfOn()){if(cls==="km-gloom")kitFx("demote");else if(cls==="km-bloom"){const b=/Hạ sinh/.test(String(arguments[1]||""));kitFx(b?"birth":"preg")}else if(cls==="km-inkov")kitFx("death")}}catch(e){}return r});
 /* lĩnh bổng: her monthly pay → silver coins rain when the week panel (sổ tuần) shows it */
 W("stipend",o=>function(p){const b=p&&p.bac;const r=o.apply(this,arguments);try{if(typeof S!=="undefined"&&p===S&&p.bac>b)KFX.pay=p.bac-b}catch(e){}return r});
 W("dawn",o=>function(){const r=o.apply(this,arguments);try{if(KFX.pay&&kfOn()){const n=KFX.pay;KFX.pay=0;setTimeout(()=>{KFX.coinT=Date.now();kitFx("coin",{n})},kfStill()?0:1500)}}catch(e){}return r});
 /* page turns of the books: a light tick */
 W("kitSheetTurn",o=>function(){try{if(kfOn())vib("tap")}catch(e){}return o.apply(this,arguments)});
 /* render: tabs underline, ambient petals at home, festival-night lanterns once per night */
 W("render",o=>function(){const r=o.apply(this,arguments);try{KFX.ambOK=true;kfTabsSoon();kfAmbient();
   const fe=kfOn()?["festival","lantern"].find(kfFestFx):null;if(fe){const k=`${S.year}-${S.month}-${S.tuan}`;if(KFX.festK!==k){KFX.festK=k;setTimeout(()=>kitFx(fe),600)}}}catch(e){console.error(e)}return r});
 document.addEventListener("visibilitychange",()=>{try{if(KFX.app){if(document.hidden)KFX.app.ticker.stop();else if(KFX.parts.length)KFX.app.ticker.start()}kfAmbient()}catch(e){}});
 /* a modal closing / overlay leaving lets the ambient petals back */
 setInterval(()=>{try{if(KFX.ambOK&&!kfAmbT&&kfAmbWant())kfAmbient()}catch(e){}},2500)})();
/* ---------- CSS ---------- */
(function(){const st=document.createElement("style");st.id="kfx";st.textContent=`
:root{--kf-gold:#f0d070;--kf-rim:0 0 0 1px #f0d070b0,0 0 12px #f0d07055}
/* press: ONLY the .kfdown class that kfTapOf puts on the real tappable element (never CSS :active, which also matches every ancestor of
   the finger, e.g. the whole tab panel); scale .96 (the individual 'scale' property, so an element's own transform is kept), shadow pulls in, gold rim light */
:is(button,.btn,.kbtn,.opt,.card,.pct,[role="button"],[role="tab"]):not(:disabled):not(.kdis):not(#me):not(#emp):not(.tok){transition:scale .1s ease,filter .1s ease,box-shadow .14s ease}
:is(button,.btn,.opt,.card,.pct,[role="button"],[role="tab"]):not(:disabled):not(.kdis):not(#me):not(#emp):not(.tok).kfdown{scale:.96;filter:brightness(.97);box-shadow:var(--kf-rim)}
.kbtn:not(:disabled).kfdown{scale:.96;box-shadow:inset 0 0 0 1px #f0d07099,var(--kf-rim)}
@media (hover:hover){:is(button,.btn,.kbtn,.opt,.card.ka,.pct):not(:disabled):not(.kdis):not(#me):not(#emp):not(.tok):hover{box-shadow:0 0 0 1px #f0d07070,0 0 8px #f0d07033}
 .kbtn:not(:disabled):hover{box-shadow:inset 0 0 0 1px #f0d07066,0 0 0 1px #f0d07070,0 0 8px #f0d07033}}
/* people on the stage (her #me, stage figures .tok, Hoàng thượng #emp): no box press / rim / ripple / tap highlight — a rectangle over a
   figure is wrong (owner 16:40Z); they answer with j59's own figure animation */
:is(#me,#emp,.tok){-webkit-tap-highlight-color:transparent}
.kfrip{position:fixed;z-index:9460;pointer-events:none;overflow:hidden}
.kfrip i{position:absolute;border-radius:50%;background:radial-gradient(circle,#fff3c4aa 0,#f0d07055 40%,#f0d07000 70%);transform:scale(0);opacity:.9;animation:kfRip calc(0.6s*var(--pace,1)) ease-out forwards}
@keyframes kfRip{to{transform:scale(1);opacity:0}}
/* primary buttons: a slow sheen every ~7 s */
.kbtn:not(.alt):not(.kdone):not(.ksel):not(:disabled){background-image:linear-gradient(105deg,#fff0 38%,#fff2c870 50%,#fff0 62%),linear-gradient(#b0402c,#8a2a1e);background-size:260% 100%,100% 100%;background-repeat:no-repeat;background-position:100% 0,0 0;animation:kfSheen 7s ease-in-out 1.5s infinite}
@keyframes kfSheen{0%,82%{background-position:100% 0,0 0}96%,100%{background-position:0% 0,0 0}}
/* locked: reason chip above the button */
.kflockwhy{position:fixed;z-index:9470;max-width:min(320px,calc(100vw - 24px));padding:5px 10px;border-radius:8px;background:#2a1a12ee;color:#fff3dc;font-size:.78rem;line-height:1.3;
 box-shadow:0 2px 8px #0005;pointer-events:none;animation:kfWhy .18s ease-out both}.kflockwhy.out{opacity:0;transition:opacity .25s}
@keyframes kfWhy{from{opacity:0;transform:translateY(4px)}to{opacity:1;transform:none}}
/* tab underline */
.kftl{position:absolute;left:0;top:0;height:3px;border-radius:2px;background:linear-gradient(90deg,#b0402c,#e0a526,#b0402c);pointer-events:none;z-index:2;
 transition:transform .32s cubic-bezier(.3,.8,.3,1.1),width .32s cubic-bezier(.3,.8,.3,1.1),opacity .2s;box-shadow:0 0 6px #f0d07088}
/* flashes */
.kfx-fl{position:fixed;inset:0;z-index:9440;pointer-events:none}
.kfx-red{box-shadow:inset 0 0 80px 16px #b00000cc;animation:kfRed calc(.9s*var(--pace)) ease-out forwards}
.kfx-night{background:radial-gradient(ellipse at 50% 60%,#ff9a5022 0,#3a1a2a55 80%);animation:kfFl calc(2.2s*var(--pace)) ease-in-out forwards}
.kfx-dark{background:radial-gradient(ellipse at 50% 50%,#0000 20%,#000a 100%);animation:kfDark calc(2.2s*var(--pace)) ease-in-out forwards}
@keyframes kfFl{0%{opacity:0}18%{opacity:1}100%{opacity:0}}
@keyframes kfRed{0%,40%,80%{opacity:0}15%,58%{opacity:1}100%{opacity:0}}
@keyframes kfDark{0%{opacity:0}45%{opacity:1}100%{opacity:0}}
/* numbers flying to the top bar + the cell catching them */
.kfnum{position:fixed;left:0;top:0;z-index:9470;pointer-events:none;padding:2px 9px;border-radius:999px;font-weight:700;font-size:.86rem;white-space:nowrap;box-shadow:0 2px 6px #0003;will-change:transform,opacity}
.kfnum.g{background:#e6f3e4;color:#2e6b3a;border:1px solid #9cc79a}.kfnum.r{background:#f7e3df;color:#a3291c;border:1px solid #d9a197}
.kfhit{animation:kfHit calc(0.6s*var(--pace,1)) ease-out}.kfhit-r{animation:kfHitR calc(0.6s*var(--pace,1)) ease-out}
@keyframes kfHit{0%{box-shadow:0 0 0 0 #f0d07000}30%{box-shadow:0 0 0 2px #f0d070,0 0 14px #f0d070aa}100%{box-shadow:0 0 0 0 #f0d07000}}
@keyframes kfHitR{0%{box-shadow:0 0 0 0 #c0302000}30%{box-shadow:0 0 0 2px #c03020aa,0 0 12px #c0302066}100%{box-shadow:0 0 0 0 #c0302000}}
#kfxcv{position:fixed;inset:0;width:100vw;height:100vh;z-index:9450;pointer-events:none}
@media (prefers-reduced-motion:reduce){.kfrip,.kfx-fl,.kfnum,#kfxcv{display:none!important}.kbtn{animation:none!important}.kftl{transition:none}}
`;document.head.appendChild(st)})();
/* "Cảnh động" off: no sheen / ripple / particles either (OPT.fxon read at every use; the class only stops the CSS sheen) */
(function(){const sync=()=>{try{document.documentElement.classList.toggle("kf-still",kfStill())}catch(e){}};sync();document.addEventListener("change",e=>{if(e.target&&e.target.id==="o-fx"){sync();if(kfStill()){KFX.ambOn=false;try{KFX.parts.forEach(s=>s.destroy());KFX.parts.length=0}catch(x){}}}},true);
 const st=document.createElement("style");st.textContent=`.kf-still .kbtn{animation:none!important}.kf-still .kftl{transition:none}`;document.head.appendChild(st)})();
/* ================= kitGain — EVERY item she gains is revealed (owner 11/15, loot-game rule) =================
   kitGain(entry|key, {from}) → the item rises in the centre with a light burst in its GRADE colour, its painting, name and grade under it,
   "Nhận"; tap Nhận or anywhere → it flies into the Tư trang tab (sound + light buzz), which glows. Queued with the other motion pieces (kmPush).
   Handmade works (j83 IT.tp, entry.wk) show their own name (e.g. "Bát chè hạt sen"), their tier word (Thường · Khá · Tinh xảo · Tuyệt phẩm)
   and their tier painting (j98 itemArt(entry)).
   WIRING: ONE universal path — after every render (j93 kmDiff), every NEW entry of S.inv that j93 did not already present as a reward
   (bestow → kitReward chest/tray; a gift from another person → kitReward tray/gift box) goes through kitGain: works from Tài nghệ /
   lessons / mini-games (cooking, embroidery, painting, calligraphy, music…), purchases, finds, stories, anything else. So no call site
   can add an item silently. Test: dev/test/item-gain.js. Hooks for tests: KFX.gains [{name, grade}], KFX.rewards (kitReward items). */
/* name / painting / REAL grade of an entry = KIT §54.1 kitItemInfo (jkrev), the same as the Tư trang bag */
function kgInfo(x){return kitItemInfo(x)}
function kitGain(x,o){o=o||{};if(!kfOn())return;const I=kgInfo(x);KFX.gains=KFX.gains||[];KFX.gains.push({name:I.name,grade:I.gname,src:I.src});
 const run=done=>{const still=kfStill();const RV=(typeof BAL==="object"&&BAL.reveal)||{};const t0=Date.now();const ov=document.createElement("div");ov.className="kmov kfgain"+(still?" km-red":"");ov.setAttribute("role","dialog");ov.setAttribute("aria-label",I.name);
  ov.innerHTML=`<div class="kmst">${kitRevealHTML(I,{from:o.from})}<button type="button" class="kbtn krevok" style="--kok:${(RV.rise||550)+400}ms">Nhận</button></div>`;
  document.body.appendChild(ov);try{typeof kitSfx==="function"?kitSfx(I.grade>=3?"itemRare":"itemPop"):sfx("sfx-open")}catch(e){}if(!still){const it=ov.querySelector(".krev>.kitem");const r=it&&it.getBoundingClientRect();if(r)setTimeout(()=>kfPx("stars",{x:r.left+r.width/2,y:r.top+r.height/2,r}),Math.round((RV.rise||550)*.6))}
  let closed=false;const close=e=>{if(e)e.stopPropagation();if(closed)return;if(!still&&Date.now()-t0<(RV.gainMin||900)&&!(e&&e.target&&e.target.closest&&e.target.closest(".krevok")))return;closed=true;const im=ov.querySelector(".krev .kitb img");
   const tb=[...document.querySelectorAll('#tabs [data-tab="inv"],#tabs [data-kg]')].find(t=>t.offsetWidth&&(t.dataset.tab==="inv"||/Tư trang/.test(t.textContent)))||document.querySelector('[data-tab="inv"]');
   try{typeof kitSfx==="function"?kitSfx("itemFly"):sfx("sfx-coin");vib("coin")}catch(err){}
   if(im&&tb&&!still&&im.animate){const a=im.getBoundingClientRect(),b=tb.getBoundingClientRect();const fl=im.cloneNode();fl.className="krevfly";fl.style.cssText=`left:${a.left}px;top:${a.top}px;width:${a.width}px;height:${a.height}px`;document.body.appendChild(fl);
    const dx=b.left+b.width/2-(a.left+a.width/2),dy=b.top+b.height/2-(a.top+a.height/2),sc=Math.max(.12,Math.min(b.width,b.height)/Math.max(1,a.width));
    const an=fl.animate([{transform:"none",opacity:1},{transform:`translate(${dx*.5}px,${dy*.5-60}px) scale(.6)`,opacity:1,offset:.5},{transform:`translate(${dx}px,${dy}px) scale(${sc})`,opacity:.2}],{duration:620,easing:"cubic-bezier(.5,0,.6,1)"});
    an.onfinish=()=>{fl.remove();tb.classList.remove("kfhit");void tb.offsetWidth;tb.classList.add("kfhit");setTimeout(()=>tb.classList.remove("kfhit"),2700);kfPx("pop",{x:b.left+b.width/2,y:b.top+b.height/2})}}
   KFX.gainClosed=(KFX.gainClosed||0)+1;ov.classList.add("km-out");setTimeout(()=>ov.remove(),240);done()};
  /* KIT 81 (owner OD:L1261): only the "Nhận" button closes the gain scene; a tap anywhere else does nothing */
  ov.addEventListener("click",e=>{if(e.target&&e.target.closest&&e.target.closest(".krevok"))close(e);else e.stopPropagation()})};
 if(typeof kmPush==="function")kmPush(run);else run(()=>{})}
window.kitGain=kitGain;
(function(){const W=(n,f)=>{const o=window[n];if(typeof o!=="function")return;window[n]=f(o)};
 W("kitReward",o=>function(spec){try{KFX.rewards=(KFX.rewards||0)+((spec&&spec.items&&spec.items.length)||1)}catch(e){}return o.apply(this,arguments)});
 /* j93 showed bought items with kitFlyItem from kmDiff: kitGain does that now (reveal + fly), so the old fly is skipped there */
 W("kitFlyItem",o=>function(){if(KFX.inDiff)return;return o.apply(this,arguments)});
 /* ROYAL / GIVEN items always come in their box (owner 08:20Z: được thưởng/ban = mâm/rương/rương ngự tứ; được tặng = hộp gấm; nhiều món cùng lúc
    gộp một rương). bestow() is wrapped by j20, j92 (extra garment), j93 (its chest, LAST item only) and jveil (extra veil): this outermost
    wrapper holds j93's chest back and shows ONE chest with EVERY item the whole call added (owner 17:24Z: "Hoàng thượng ban thưởng tranh cổ"
    came with no chest when j92 added a garment after it), with the silver. */
 W("bestow",o=>function(p,why){if(p!==S||!kfOn()||KFX.inBest)return o.apply(this,arguments);const n0=(S.inv||[]).length,b0=S.bac||0;KFX.inBest={spec:null};let r;
  try{r=o.apply(this,arguments)}finally{const hold=KFX.inBest;KFX.inBest=null;
   try{const add=(S.inv||[]).slice(n0).filter(x=>x&&!x.h);if(add.length){try{if(typeof KMSNAP!=="undefined"&&KMSNAP&&KMS===S)for(const x of add)if(!KMSNAP.inv.includes(x))KMSNAP.inv.push(x)}catch(e){}
     const royal=why==="son"||why==="sinhthan"||add.some(x=>x.nt),sp=hold.spec||{};
     kitReward({kind:royal?"royal":sp.kind||(why==="night"?"tray":"chest"),title:royal?"Ngự tứ":sp.title||"Rương bảo vật",from:sp.from||"Hoàng thượng ban",items:add.map(x=>kgItem(x,royal)),bac:Math.max(0,(S.bac||0)-b0)})}}catch(e){console.error(e)}}
  return r});
 /* kmDiff: j93's own inventory part is replaced here (it showed only 4 adds, a gift box "Có người tặng" for story / Nội vụ phủ / imperial
    entries and no box at all for imperial ones); every new entry is grouped by who gave it, and each group comes in ONE box */
 W("kmDiff",o=>function(){let before=null;try{if(typeof KMSNAP!=="undefined"&&KMSNAP&&typeof KMS!=="undefined"&&KMS===S&&S){before=KMSNAP.inv.slice();KMSNAP.inv=(S.inv||[]).slice()}}catch(e){}
  KFX.inDiff=true;let r;try{r=o.apply(this,arguments)}finally{KFX.inDiff=false}
  /* snapshot first (a card opened below may render again) */
  let same=false,d=0,lg=0,seen=null;try{if(S){same=kfS===S;d=(S.bac||0)-kfBac;lg=kfLog;seen=(S.inv||[]).filter(x=>x&&kfSeen.has(x));kfS=S;kfBac=S.bac||0;kfLog=S.logSeq||0;kfMark()}}catch(e){}
  try{if(before&&same&&S&&!S.dead&&kfOn()){const add=(S.inv||[]).filter(x=>x&&!x.h&&!before.includes(x)&&!seen.includes(x));if(add.length)kgGroups(add);kfLoss(before,d,lg)}}catch(e){console.error(e)}
  return r});
 /* KIT §54.2: who took the item out of her Tư trang. These calls tag each entry they remove; kfLoss (below) reads the tag. */
 const TAG=(n,why,toIx,title)=>W(n,o=>function(p){if(p!==S||!S||!S.inv)return o.apply(this,arguments);const b=S.inv.slice();const r=o.apply(this,arguments);
  try{const to=toIx!=null?arguments[toIx]:null;for(const e of b)if(e&&!S.inv.includes(e)&&!KFX.lt.has(e))KFX.lt.set(e,{why,to:to&&to.name||"",title:title||""})}catch(e){}return r});
 TAG("sellItem","sell");TAG("wkSell","sell");TAG("wdSell","sell");TAG("wdPawn","sell");
 TAG("giveTo","give",1);TAG("wkGive","give",1);TAG("plantItem","give",1);
 TAG("useItem","use");TAG("wdWear","use");TAG("vlWear","use");TAG("wkPoison","use");TAG("takeItem","use");TAG("taintItem","use");
 TAG("inspect","lose",null,"Soát ra đồ bẩn");TAG("search","lose",null,"Bị soát phòng")})();
/* ---------- KIT §54.2 wiring: every item that leaves S.inv + every drop of S.bac, read in ONE place (kmDiff above) ---------- */
KFX.lt=new WeakMap();const kfSeen=new WeakSet();let kfS=null,kfBac=0,kfLog=0;
function kfWorn(){try{const w=typeof wdOf==="function"?wdOf(S):S.wd;return [w&&w.tram,w&&w.y,S.vl,S.dress,...(S.wdPawn||[]).map(p=>p&&p.e)].filter(x=>x&&typeof x==="object")}catch(e){return[]}}
function kfMark(){for(const x of S.inv||[])if(x&&typeof x==="object")kfSeen.add(x);for(const x of kfWorn())kfSeen.add(x)}
const KF_LOSEW=[[/tịch thu|thu hồi|sung công/i,"Bị tịch thu"],[/cướp|giật lấy|giật mất/i,"Bị cướp"],[/trộm|lấy cắp/i,"Bị lấy trộm"],[/đòi|bắt nạt|ức hiếp|chèn ép|ép (ngươi|nộp|giao)/i,"Bị ép giao đồ"],
 [/soát|vứt bỏ|tiêu hủy|đốt bỏ/i,"Bị soát phòng"],[/mất|đánh rơi|lấy đi|lấy mất/i,"Mất đồ"]];
function kfTexts(lg){const L=[];try{const n=Math.max(0,Math.min(40,(S.logSeq||0)-lg));for(let i=0;i<n;i++)L.push(S.logs[i]);for(const q of (typeof Q!=="undefined"?Q:[]))if(q&&typeof q.h==="string")L.push(q.h);
  const t=document.getElementById("rtoast");if(t&&t.classList.contains("on"))L.push(t.innerHTML)}catch(e){}
 return L.map(h=>String(h||"").replace(/<span class="ld">[^<]*<\/span>/g,"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim()).filter(Boolean)}
function kfLoseWhy(e,T){const tag=KFX.lt.get(e);const I=kitItemInfo(e);const nm=I.name,base=(IT[e.k]&&IT[e.k].n)||nm;
 let line="";for(const h of T){const ss=h.replace(/([.!?:])\s+/g,"$1\n").split("\n");const s=ss.find(x=>x.includes(nm)||x.includes(base));if(s){line=s.trim();break}}
 if(line.length>170)line=line.slice(0,167).replace(/\s+\S*$/,"")+"…";
 if(tag)return{why:tag.why,to:tag.to,title:tag.title||"",text:line};
 if(!line)return{why:"fade",text:""};
 for(const [re,title] of KF_LOSEW)if(re.test(line)&&!/không (bị )?mất/i.test(line))return{why:"lose",title,text:line};
 if(/\bbán\b|đem cầm|đi cầm/i.test(line))return{why:"sell",text:line};
 if(/tặng|dâng|biếu|đưa cho|ban cho/i.test(line))return{why:"give",text:line};
 if(/uống|dùng|đeo|cài|mặc|may|sắc|ăn|thắp|đốt hương|bôi|xoa/i.test(line))return{why:"use",text:line};
 return{why:"fade",text:line}}
function kfLoss(before,d,lg){const gone=before.filter(x=>x&&typeof x==="object"&&!x.h&&(IT[x.k]||(typeof WD_ITEMS==="object"&&WD_ITEMS[x.k]))&&!S.inv.includes(x));const worn=kfWorn();
 const T=gone.length?kfTexts(lg):[];const G={sell:[],give:[],fade:[],lose:new Map()};
 for(const e of gone){if(worn.includes(e))continue;const w=kfLoseWhy(e,T);KFX.lt.delete(e);if(w.why==="use")continue;
  if(w.why==="lose"){const k=w.title||"Mất đồ";if(!G.lose.has(k))G.lose.set(k,{L:[],text:w.text});const g=G.lose.get(k);g.L.push(e);if(!g.text&&w.text)g.text=w.text}else G[w.why].push(e)}
 if(G.sell.length)kitLose(G.sell,{why:"sell",bac:Math.max(0,d)});else if(d<0)kitCoins("out",-d);
 if(G.give.length)kitLose(G.give,{why:"give"});if(G.fade.length)kitLose(G.fade,{why:"fade"});
 for(const [title,g] of G.lose)kitLose(g.L,{why:"lose",title,text:g.text})}

/* one reward item for kitReward from an inventory entry: the same name / painting / grade as the Tư trang bag (kgInfo) */
function kgItem(x,royal){const I=kgInfo(x),it=(typeof IT==="object"&&IT[x.k])||{};return{n:I.name,d:x.wk?I.sub:(it.d||I.sub||""),img:I.src,tier:I.grade,gn:x.wk?I.gname:"",k:x.wk?"":x.k}}
function kgWho(f,x){if(x&&x.giver)return x.giver;if(f==="emp")return"Hoàng thượng";if(f==="th")return"Thái hậu";if(f==="hh")return"Hoàng hậu";if(f==="nvp")return"Nội vụ phủ";
 try{const v=typeof RV==="function"?RV(f):null;if(v&&v.name)return v.name}catch(e){}return""}
function kgGroups(add){const G=new Map();
 for(const x of add){const f=x.from||"";const who=(f&&f!=="me")?kgWho(f,x):"";const key=f==="find"?"find":f==="me"||!f||(!who&&f!=="story"&&f!=="rare")?"self":who||f;
  if(!G.has(key))G.set(key,{who,f,L:[]});G.get(key).L.push(x)}
 for(const [key,g] of G){
  if(key==="self"){/* her own: works, purchases, finds — one glowing reveal each; a burst of 3+ comes in one chest */
   if(g.L.length<=2)g.L.forEach(x=>kitGain(x));else kitReward({kind:"chest",title:"Rương đồ",from:"Vừa vào Tư trang",items:g.L.map(x=>kgItem(x))});continue}
  if(key==="find"){kitReward({kind:"pouch",title:"Bọc vải",from:"Nhặt được",items:g.L.map(x=>kgItem(x))});continue}
  const emp=g.who==="Hoàng thượng",royal=emp&&g.L.some(x=>x.nt),elder=g.f==="th"||g.f==="hh"||g.who==="Thái hậu"||g.who==="Hoàng hậu";
  const kind=royal?"royal":emp||g.f==="nvp"||g.f==="story"||g.f==="rare"?"chest":elder?"tray":"gift";
  const title=royal?"Ngự tứ":kind==="tray"?"Mâm thưởng":kind==="gift"?"Hộp gấm":g.f==="nvp"?"Rương Nội vụ phủ":"Rương bảo vật";
  const from=g.who?(emp||elder?`${g.who} ban`:g.f==="nvp"?"Nội vụ phủ cấp":`${g.who} tặng`):"Phần thưởng";
  kitReward({kind,title,from,items:g.L.map(x=>kgItem(x,royal))})}}
/* j93's bestow chest is held while the outer bestow runs (the outer one shows every item) */
(function(){const o=window.kitReward;if(typeof o!=="function")return;window.kitReward=function(spec){if(KFX.inBest){if(!KFX.inBest.spec)KFX.inBest.spec=spec;return}return o.apply(this,arguments)}})();
(function(){const st=document.createElement("style");st.textContent=`
.kmov.kfgain{cursor:pointer}
.kmov.kfgain.km-red *{animation:none!important}
@media (prefers-reduced-motion:reduce){.kmov.kfgain *{animation:none!important}}
`;document.head.appendChild(st)})();
