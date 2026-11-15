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
const FX={
 decree :{vib:"decree", shake:1,flash:"gold", px:"rays"},          // thánh chỉ, ân thưởng
 promote:{vib:"promote",shake:1,flash:"gold", px:"rays,stars"},    // thăng phẩm, tấn phong
 coin   :{vib:"coin",                         px:"coins"},         // lĩnh bổng, được bạc
 hit    :{vib:"hit",    shake:2,flash:"red",  px:"inks"},          // bị tát, bị phạt, bị hại
 harm   :{vib:"harm",   shake:2,flash:"red",  px:"ink"},           // bị hãm hại nặng
 poison :{vib:"poison", shake:2,flash:"red",  px:"ink"},           // trúng độc
 expose :{vib:"expose", shake:2,flash:"red",  px:"ink"},           // bị phát giác, bị định tội
 verdict:{              shake:1},                                  // con dấu định tội (đi cùng expose)
 ink    :{                                    px:"inks"},          // kẻ khác sa cơ
 birth  :{vib:"birth",          flash:"warm", px:"flowers"},       // sinh con
 preg   :{vib:"preg",           flash:"warm", px:"petals"},        // có thai
 favour :{                                    px:"petals"},        // được sủng
 night  :{vib:"night",          flash:"night",px:"motes"},         // đêm thị tẩm
 death  :{vib:"death",          flash:"dark"},                     // chết: tối dần, không rung mạnh
 demote :{vib:"demote",         flash:"dark", px:"ash"},           // giáng phẩm, lãnh cung
 ash    :{                                    px:"ash"},           // vào lãnh cung
 win    :{vib:"win",                          px:"stars"},         // THÀNH
 fail   :{vib:"fail",                         px:"smoke"},         // HỎNG / BẤT LỢI
 mgwin  :{vib:"win",                          px:"stars"},         // thắng trò nhỏ
 mglose :{vib:"fail",                         px:"smoke"},         // thua trò nhỏ
 lantern:{                                    px:"lanterns"},      // đèn trời đêm lễ
 lock   :{vib:"lock"}                                              // chạm nút khóa
};
window.FX=FX;
function kfOn(){return !window.__bot&&!(typeof quiet!=="undefined"&&quiet)}
function kfStill(){try{return matchMedia("(prefers-reduced-motion: reduce)").matches||(typeof OPT!=="undefined"&&OPT.fxon===false)}catch(e){return false}}
function kfPt(o){o=o||{};if(o.x!=null)return{x:o.x,y:o.y};const el=o.el&&o.el.getBoundingClientRect?o.el:null;if(el){const r=el.getBoundingClientRect();if(r.width)return{x:r.left+r.width/2,y:r.top+r.height/2,r}}
 return{x:innerWidth/2,y:innerHeight*.42}}
function kitFx(kind,o){const f=FX[kind];if(!f||!kfOn())return false;o=o||{};KFX.log.push(kind);if(KFX.log.length>60)KFX.log.shift();
 try{if(f.vib)vib(f.vib)}catch(e){}
 if(kfStill())return true;
 if(f.shake)kfShake(f.shake);if(f.flash)kfFlash(f.flash);
 if(f.px){const pt=kfPt(o);for(const p of f.px.split(","))kfPx(p,pt)}
 return true}
window.kitFx=kitFx;
/* ---------- shake + flash (DOM, transform/opacity only) ---------- */
function kfShake(lv){const g=document.querySelector(".game")||document.getElementById("game");if(!g||!g.animate)return;
 const a=lv>1?7:3.5,K=lv>1?[[0,0],[-a,1.5],[a,-2],[-a*.7,1],[a*.5,-1],[-a*.25,.5],[0,0]]:[[0,0],[-a,0],[a,.8],[-a*.5,0],[0,0]];
 try{g.animate(K.map(([x,y])=>({translate:`${x}px ${y}px`})),{duration:lv>1?360:260,easing:"ease-out"})}catch(e){}}
function kfFlash(k){const d=document.createElement("div");d.className="kfx-fl kfx-"+k;document.body.appendChild(d);setTimeout(()=>d.remove(),k==="dark"||k==="night"?2300:1500)}
/* ---------- Pixi: one loader (also used by j11's stage layer) ---------- */
function kfApp(){if(KFX.app)return Promise.resolve(KFX.app);if(KFX.loading)return KFX.loading;
 KFX.loading=kitPixi().then(async P=>{const app=new P.Application();await app.init({backgroundAlpha:0,resizeTo:window,antialias:false,autoDensity:true,resolution:1,powerPreference:"low-power"});
  const c=app.canvas;c.id="kfxcv";c.setAttribute("aria-hidden","true");document.body.appendChild(c);app.ticker.maxFPS=60;KFX.root=new P.Container();app.stage.addChild(KFX.root);
  kfTex(P,app);app.ticker.add(kfTick);app.ticker.stop();c.style.display="none";KFX.app=app;KFX.loaded=true;return app}).catch(e=>{KFX.loading=null;KFX.failed=(KFX.failed||0)+1;throw e});
 return KFX.loading}
function kfTex(P,app){const T=KFX.tex,G=()=>new P.Graphics(),gen=g=>app.renderer.generateTexture({target:g,resolution:2});
 let g=G();for(let i=8;i>0;i--)g.circle(16,16,i*2).fill({color:0xffffff,alpha:.13});T.glow=gen(g);
 g=G();g.ellipse(9,5,9,5).fill(0xffffff);T.petal=gen(g);
 g=G();g.moveTo(0,6).bezierCurveTo(5,-1,14,-1,20,6).bezierCurveTo(14,13,5,13,0,6).fill(0xffffff);T.leaf=gen(g);
 g=G();g.poly([10,0,12.4,7.6,20,10,12.4,12.4,10,20,7.6,12.4,0,10,7.6,7.6]).fill(0xffffff);T.star=gen(g);
 g=G();g.circle(10,10,10).fill(0xe9e6dc).circle(10,10,10).stroke({width:1.6,color:0x9c978a});g.circle(10,10,6.6).stroke({width:1,color:0xb8b3a6});g.rect(7.4,7.4,5.2,5.2).fill(0x7d786c);T.coin=gen(g);
 g=G();g.ellipse(16,2,16,2).fill(0xffffff);T.streak=gen(g);
 g=G();g.circle(16,16,16).fill({color:0xffffff,alpha:.35}).circle(16,16,12).fill({color:0xffffff,alpha:.4}).circle(16,16,8).fill({color:0xffffff,alpha:.5});T.blob=gen(g);
 g=G();g.roundRect(0,0,14,18,4).fill(0xf08a3a).roundRect(2.5,2.5,9,11,3).fill(0xffd48a).rect(5,17,4,3).fill(0x8a3a1a);T.lantern=gen(g)}
/* particle: sprite + v {vx,vy,g,drag,life,max,spin,grow,a0,fade,sway,tw} */
function kfSp(tex,x,y,v,tint,sc,blend){const P=window.PIXI;const s=new P.Sprite(KFX.tex[tex]);s.anchor.set(.5);s.x=x;s.y=y;if(tint!=null)s.tint=tint;s.scale.set(sc||1);if(blend)s.blendMode=blend;
 s.v=Object.assign({vx:0,vy:0,g:0,drag:1,life:60,max:60,spin:0,grow:0,a0:1,fade:"out",sway:0,ph:Math.random()*6.28,sc:sc||1},v);s.v.max=s.v.life;s.alpha=s.v.fade==="in"||s.v.fade==="inout"?0:s.v.a0;
 KFX.root.addChild(s);KFX.parts.push(s);return s}
const KF_SEASON=()=>{const m=(typeof S!=="undefined"&&S&&S.month)||1;return m<=3?{tex:"petal",col:[0xf4b6c8,0xf9d3dc,0xffe8ee]}:m<=6?{tex:"petal",col:[0xf7c6d4,0xffffff,0xe9f2d0]}:m<=9?{tex:"leaf",col:[0xd9822b,0xc0502a,0xe0a83a]}:{tex:"petal",col:[0xc8283a,0xe05060,0xffffff]}};
function kfBudget(n){const w=innerWidth<700?.65:1;return Math.max(1,Math.round(n*KFX.q*w))}
const R01=()=>Math.random(),RS=(a,b)=>a+Math.random()*(b-a);
const KF_SPAWN={
 rays(p){const n=kfBudget(22);for(let i=0;i<n;i++){const a=RS(-Math.PI*.95,-Math.PI*.05),sp=RS(7,14);const s=kfSp("streak",p.x,p.y,{vx:Math.cos(a)*sp,vy:Math.sin(a)*sp,drag:.93,life:RS(40,60)},R01()<.5?0xf0d070:0xfff3c4,RS(.6,1.2),"add");s.rotation=a}},
 stars(p){const n=kfBudget(14),r=p.r,w=r?Math.max(120,r.width):260,h=r?Math.max(80,r.height):200;for(let i=0;i<n;i++){kfSp("star",p.x+RS(-.55,.55)*w,p.y+RS(-.6,.5)*h,{life:RS(50,80),fade:"inout",tw:RS(.15,.3),vy:-.15},R01()<.6?0xffe9a0:0xffffff,RS(.5,1.1),"add")}},
 coins(p){const n=kfBudget(18);for(let i=0;i<n;i++){const s=kfSp("coin",RS(.08,.92)*innerWidth,RS(-120,-10),{vx:RS(-.6,.6),vy:RS(2,4),g:.22,life:RS(90,120),spin:RS(.08,.2),coin:1,a0:1},null,RS(.8,1.25));s.v.ph=R01()*6}},
 ink(p){const n=kfBudget(6);for(let i=0;i<n;i++)kfSp("blob",p.x+RS(-60,60),p.y+RS(-50,50),{life:RS(70,95),grow:RS(.05,.09),a0:RS(.55,.75)},0x1a1410,RS(.6,1.2))},
 inks(p){const n=kfBudget(3);for(let i=0;i<n;i++)kfSp("blob",p.x+RS(-40,40),p.y+RS(-30,30),{life:RS(55,70),grow:RS(.04,.06),a0:.45},0x1a1410,RS(.4,.8))},
 flowers(p){const n=kfBudget(26),c=[0xf4b6c8,0xf08aa8,0xffe0e8,0xffd48a];for(let i=0;i<n;i++){const a=RS(0,Math.PI*2),sp=RS(3,8);kfSp("petal",p.x,p.y,{vx:Math.cos(a)*sp,vy:Math.sin(a)*sp-2,g:.09,drag:.96,life:RS(80,110),spin:RS(-.12,.12),sway:.6},c[i%4],RS(.8,1.4))}},
 petals(p){const n=kfBudget(16),c=[0xf4b6c8,0xf9d3dc,0xffffff];for(let i=0;i<n;i++)kfSp("petal",RS(0,innerWidth),RS(-80,-10),{vx:RS(-.4,.4),vy:RS(1.2,2.2),life:RS(140,200),spin:RS(-.05,.05),sway:.8,fade:"inout"},c[i%3],RS(.8,1.3))},
 motes(p){const n=kfBudget(16);for(let i=0;i<n;i++)kfSp("glow",RS(.1,.9)*innerWidth,RS(.45,1)*innerHeight,{vx:RS(-.2,.2),vy:RS(-1.1,-.4),life:RS(120,170),fade:"inout",a0:.7,sway:.4},R01()<.5?0xffb050:0xffd890,RS(.5,1),"add")},
 ash(p){const n=kfBudget(22);for(let i=0;i<n;i++)kfSp("petal",RS(0,innerWidth),RS(-60,-5),{vx:RS(-.5,.5),vy:RS(.8,1.6),life:RS(150,210),spin:RS(-.06,.06),sway:.7,fade:"inout",a0:.8},R01()<.5?0x6a6a6a:0x9a9a9a,RS(.4,.8))},
 smoke(p){const n=kfBudget(7);for(let i=0;i<n;i++)kfSp("blob",p.x+RS(-50,50),p.y+RS(-10,20),{vx:RS(-.3,.3),vy:RS(-1.2,-.6),life:RS(70,95),grow:RS(.02,.035),fade:"inout",a0:.5},0x8a8580,RS(.6,1))},
 lanterns(p){const n=kfBudget(9);for(let i=0;i<n;i++){const x=RS(.06,.94)*innerWidth,y=innerHeight+RS(10,260),sc=RS(.8,1.5);
   const gl=kfSp("glow",x,y,{vy:RS(-1.1,-.7),life:RS(420,540),fade:"inout",a0:.55,sway:.25,lant:1},0xffa040,sc*2.2,"add");const l=kfSp("lantern",x,y,{vy:gl.v.vy,life:gl.v.life,fade:"inout",a0:.95,sway:.25,lant:1},null,sc);l.v.ph=gl.v.ph}},
 pop(p){const n=kfBudget(6);for(let i=0;i<n;i++){const a=RS(0,Math.PI*2);kfSp("star",p.x,p.y,{vx:Math.cos(a)*2,vy:Math.sin(a)*2,drag:.9,life:30},0xffe9a0,RS(.35,.6),"add")}},
 season(){const s=KF_SEASON();kfSp(s.tex,RS(0,innerWidth),-12,{vx:RS(-.35,.25),vy:RS(.55,1),life:Math.round(innerHeight/.6)+60,spin:RS(-.03,.03),sway:.9,fade:"inout",a0:.85,amb:1},s.col[Math.floor(R01()*s.col.length)],RS(.7,1.15))}
};
function kfPx(name,p){if(kfStill()||!KF_SPAWN[name])return;kfApp().then(()=>{try{KF_SPAWN[name](p||kfPt());kfWake()}catch(e){console.error(e)}}).catch(()=>{})}
function kfWake(){const a=KFX.app;if(!a)return;if(a.canvas.style.display==="none")a.canvas.style.display="";if(!a.ticker.started)a.ticker.start()}
function kfTick(tk){const d=Math.min(3,tk.deltaTime),H=innerHeight,W=innerWidth,L=KFX.parts;let amb=0;
 for(let i=L.length-1;i>=0;i--){const s=L[i],v=s.v;v.life-=d;
  if(v.life<=0||(v.amb&&s.y>H+20)){s.destroy();L.splice(i,1);continue}
  v.ph+=.03*d;v.vx*=Math.pow(v.drag,d);v.vy=v.vy*Math.pow(v.drag,d)+v.g*d;s.x+=(v.vx+(v.sway?Math.sin(v.ph)*v.sway:0))*d;s.y+=v.vy*d;
  if(v.spin)s.rotation+=v.spin*d;if(v.coin)s.scale.x=v.sc*Math.cos(v.ph*3);if(v.grow)s.scale.set(s.scale.y+v.grow*d);
  const f=v.life/v.max;let a=v.a0;if(v.fade==="out")a=v.a0*Math.min(1,f*2.2);else if(v.fade==="inout")a=v.a0*Math.min(1,f*4,(1-f)*6);if(v.tw)a*=.55+.45*Math.sin(v.ph*v.tw*40);s.alpha=Math.max(0,a);
  if(v.amb)amb++}
 KFX.live=L.length;KFX.amb=amb;
 /* quality: frames slower than ~48 fps for half a second → fewer particles; steady 58+ for 4 s → back up */
 const fps=KFX.app.ticker.FPS;KFX.fps=KFX.fps*.9+fps*.1;if(L.length>8){if(KFX.fps<48){if(++KFX.slow>30){KFX.q=Math.max(.3,KFX.q*.7);KFX.slow=0;KFX.fps=55}}else KFX.slow=0;if(KFX.fps>58){if(++KFX.fast>240&&KFX.q<1){KFX.q=Math.min(1,KFX.q*1.15);KFX.fast=0}}else KFX.fast=0}
 if(!L.length&&!KFX.ambOn){KFX.app.ticker.stop();KFX.app.renderer.render(KFX.app.stage);KFX.app.canvas.style.display="none"}}
/* ambient: seasonal petals / leaves drift over HER palace (home), sparse, only while nothing covers the screen */
function kfAmbWant(){try{return !!(KFX.ambOK&&typeof S!=="undefined"&&S&&!S.dead&&S.place==="home"&&!kfStill()&&!document.hidden&&kfOn()&&(!document.getElementById("modal")||document.getElementById("modal").hidden)&&!document.querySelector(".kmov,#dawn:not([hidden]),#kroul,#kpodov,#title:not([hidden]),#kload"))}catch(e){return false}}
let kfAmbT=0;function kfAmbient(){const on=kfAmbWant();KFX.ambOn=on;if(!on){clearInterval(kfAmbT);kfAmbT=0;return}
 if(kfAmbT)return;kfApp().then(()=>{if(kfAmbT||!kfAmbWant())return;kfWake();const cap=()=>Math.max(3,Math.round((innerWidth<700?6:10)*KFX.q));
  KF_SPAWN.season();kfAmbT=setInterval(()=>{if(!kfAmbWant()){KFX.ambOn=false;clearInterval(kfAmbT);kfAmbT=0;return}if(KFX.amb<cap()){KF_SPAWN.season();kfWake()}},1400)}).catch(()=>{})}
/* ---------- numbers fly from the result card into their top-bar cell ---------- */
const KF_CELL={sung:"hud-sung",danh:"hud-danh",suc:"hud-suc",bac:"hud-bac",duc:"hud-duc",sac:"hud-sac",tai:"hud-tai",tamco:"hud-tamco"};
function kfNumbers(card,before){if(!card||!before||kfStill()||typeof S==="undefined"||!S)return;const keys=typeof RKEYS!=="undefined"?RKEYS:[];const L=[];
 for(const [k,n] of keys){const dv=(S[k]||0)-(before[k]||0);if(dv)L.push([k,n.replace(/ với ngươi$/,""),dv])}if(!L.length)return;
 document.querySelectorAll(".kmfls").forEach(e=>e.remove());const r=card.getBoundingClientRect();if(!r.width)return;
 L.slice(0,7).forEach(([k,n,dv],i)=>{const sp=document.createElement("span");sp.className="kfnum "+(dv>0?"g":"r");sp.textContent=`${n} ${dv>0?"+":"−"}${Math.abs(dv)}`;document.body.appendChild(sp);
  const w=sp.offsetWidth,h=sp.offsetHeight,x0=r.left+r.width/2-w/2+(i-(Math.min(L.length,7)-1)/2)*Math.min(90,r.width/Math.min(L.length,7)),y0=Math.max(4,r.top-h-6);
  const cell=KF_CELL[k]&&document.getElementById(KF_CELL[k]);const cr=cell&&cell.getBoundingClientRect();const ok=cr&&cr.width&&cr.bottom>0&&cr.top<innerHeight;
  const x1=ok?cr.left+cr.width/2-w/2:x0,y1=ok?cr.top+cr.height/2-h/2:y0-60;const delay=200+i*130;
  const an=sp.animate([{transform:`translate(${x0}px,${y0+14}px) scale(.6)`,opacity:0},{transform:`translate(${x0}px,${y0-8}px) scale(1.08)`,opacity:1,offset:.22},{transform:`translate(${x0}px,${y0-12}px) scale(1)`,opacity:1,offset:.4},{transform:`translate(${x1}px,${y1}px) scale(${ok?.72:1})`,opacity:ok?1:0,offset:.94},{transform:`translate(${x1}px,${y1}px) scale(.6)`,opacity:0}],{duration:ok?1300:1500,delay,easing:"cubic-bezier(.45,.05,.4,1)",fill:"both"});
  an.onfinish=()=>{sp.remove();if(ok){cell.classList.remove("kfhit","kfhit-r");void cell.offsetWidth;cell.classList.add(dv>0?"kfhit":"kfhit-r");setTimeout(()=>cell.classList.remove("kfhit","kfhit-r"),700);if(KFX.app)KF_SPAWN.pop&&kfPx("pop",{x:cr.left+cr.width/2,y:cr.top+cr.height/2})}}})}
/* ---------- touch kit ---------- */
const KF_TAP='button,.btn,.kbtn,.opt,.card,.pct,[role="button"],[role="tab"],[data-tab]';
const KF_FIG="#me,#emp,.tok";
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
  const el=t.closest(KF_TAP);if(!el||kfDis(el))return;if(el.matches(KF_FIG))return;down=el;el.classList.add("kfdown");if(!kfStill())kfRipple(el,e)};
 const onUp=()=>{const el=down;down=null;if(!el)return;el.classList.remove("kfdown");if(kfStill()||!el.isConnected||!el.animate||el.classList.contains("tok"))return;
  try{el.animate([{scale:".96"},{scale:"1.025",offset:.55},{scale:"1"}],{duration:240,easing:"ease-out"})}catch(x){}};
 document.addEventListener("pointerdown",onDown,{capture:true,passive:true});document.addEventListener("pointerup",onUp,{capture:true,passive:true});document.addEventListener("pointercancel",onUp,{capture:true,passive:true});
 /* browsers that swallow pointer events on disabled buttons still deliver the click/touch to the parent: hit-test the locked buttons there */
 document.addEventListener("click",e=>{const t=e.target;if(!t||!t.querySelectorAll||t.closest(KF_TAP))return;for(const b of t.querySelectorAll('button:disabled')){const r=b.getBoundingClientRect();if(e.clientX>=r.left&&e.clientX<=r.right&&e.clientY>=r.top&&e.clientY<=r.bottom){kfLocked(b,e);break}}},true)})();
/* sliding underline under the selected tab (main tabs, person-card tabs, sub-tabs) */
const KF_TABS=[["#tabs",'[data-tab][aria-selected="true"]'],[".pctabs",".pct.on"],[".ksubs",".ksubb.on"]];const KF_TPOS={};
function kfTabs(){for(const [cs,as] of KF_TABS){document.querySelectorAll(cs).forEach(c=>{const a=c.querySelector(as);let ln=c.querySelector(":scope>.kftl");
  if(!a||!a.offsetWidth){if(ln)ln.style.opacity="0";return}
  if(getComputedStyle(c).position==="static")c.style.position="relative";
  const cr=c.getBoundingClientRect(),ar=a.getBoundingClientRect(),x=ar.left-cr.left-c.clientLeft+c.scrollLeft,w=ar.width,y=ar.bottom-cr.top-c.clientTop+c.scrollTop-3;const key=cs+"|"+(c.id||"");
  if(!ln){ln=document.createElement("i");ln.className="kftl";c.appendChild(ln);const p=KF_TPOS[key];if(p){ln.style.transition="none";ln.style.transform=`translate(${p[0]}px,${y}px)`;ln.style.width=p[1]+"px";void ln.offsetWidth;ln.style.transition=""}}
  ln.style.opacity="1";ln.style.transform=`translate(${x}px,${y}px)`;ln.style.width=w+"px";KF_TPOS[key]=[x,w]})}}
let kfTabQ=0;function kfTabsSoon(){if(kfTabQ)return;kfTabQ=requestAnimationFrame(()=>{kfTabQ=0;try{kfTabs()}catch(e){}})}
document.addEventListener("click",e=>{if(e.target&&e.target.closest&&e.target.closest("[data-tab],.pct,.ksubb"))setTimeout(kfTabsSoon,30)},true);addEventListener("resize",kfTabsSoon);
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
   if(typeof S!=="undefined"&&S&&!S.dead&&kfOn()&&(S.buoi||0)===2&&typeof festToday==="function"&&festToday()){const k=`${S.year}-${S.month}-${S.tuan}`;if(KFX.festK!==k){KFX.festK=k;setTimeout(()=>kitFx("lantern"),600)}}}catch(e){console.error(e)}return r});
 document.addEventListener("visibilitychange",()=>{try{if(KFX.app){if(document.hidden)KFX.app.ticker.stop();else if(KFX.parts.length)KFX.app.ticker.start()}kfAmbient()}catch(e){}});
 /* a modal closing / overlay leaving lets the ambient petals back */
 setInterval(()=>{try{if(KFX.ambOK&&!kfAmbT&&kfAmbWant())kfAmbient()}catch(e){}},2500)})();
/* ---------- CSS ---------- */
(function(){const st=document.createElement("style");st.id="kfx";st.textContent=`
:root{--kf-gold:#f0d070;--kf-rim:0 0 0 1px #f0d070b0,0 0 12px #f0d07055}
/* press: scale .96 (the individual 'scale' property, so an element's own transform is kept), shadow pulls in, gold rim light */
:is(button,.btn,.kbtn,.opt,.card,.pct,[role="button"],[role="tab"],[data-tab]):not(:disabled):not(.kdis):not(#me):not(#emp):not(.tok){transition:scale .1s ease,filter .1s ease,box-shadow .14s ease}
:is(button,.btn,.opt,.card,.pct,[role="button"],[role="tab"],[data-tab]):not(:disabled):not(.kdis):not(#me):not(#emp):not(.tok):is(:active,.kfdown){scale:.96;filter:brightness(.97);box-shadow:var(--kf-rim)}
.kbtn:not(:disabled):is(:active,.kfdown){scale:.96;box-shadow:inset 0 0 0 1px #f0d07099,var(--kf-rim)}
@media (hover:hover){:is(button,.btn,.kbtn,.opt,.card.ka,.pct,[data-tab]):not(:disabled):not(.kdis):not(#me):not(#emp):not(.tok):hover{box-shadow:0 0 0 1px #f0d07070,0 0 8px #f0d07033}
 .kbtn:not(:disabled):hover{box-shadow:inset 0 0 0 1px #f0d07066,0 0 0 1px #f0d07070,0 0 8px #f0d07033}}
/* people on the stage (her #me, stage figures .tok, Hoàng thượng #emp): no box press / rim / ripple / tap highlight — a rectangle over a
   figure is wrong (owner 16:40Z); they answer with j59's own figure animation */
:is(#me,#emp,.tok){-webkit-tap-highlight-color:transparent}
.kfrip{position:fixed;z-index:9460;pointer-events:none;overflow:hidden}
.kfrip i{position:absolute;border-radius:50%;background:radial-gradient(circle,#fff3c4aa 0,#f0d07055 40%,#f0d07000 70%);transform:scale(0);opacity:.9;animation:kfRip .6s ease-out forwards}
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
.kfx-gold{box-shadow:inset 0 0 90px 18px #f0d070cc;background:radial-gradient(ellipse at 50% 42%,#fff3c433 0,#fff3c400 60%);animation:kfFl 1.3s ease-out forwards}
.kfx-red{box-shadow:inset 0 0 80px 16px #b00000cc;animation:kfRed .9s ease-out forwards}
.kfx-warm{background:radial-gradient(ellipse at 50% 45%,#ffd8a040 0,#ffb07022 50%,#ffb07000 75%);box-shadow:inset 0 0 70px 10px #ffc08066;animation:kfFl 1.4s ease-out forwards}
.kfx-night{background:radial-gradient(ellipse at 50% 60%,#ff9a5022 0,#3a1a2a55 80%);animation:kfFl 2.2s ease-in-out forwards}
.kfx-dark{background:radial-gradient(ellipse at 50% 50%,#0000 20%,#000a 100%);animation:kfDark 2.2s ease-in-out forwards}
@keyframes kfFl{0%{opacity:0}18%{opacity:1}100%{opacity:0}}
@keyframes kfRed{0%,40%,80%{opacity:0}15%,58%{opacity:1}100%{opacity:0}}
@keyframes kfDark{0%{opacity:0}45%{opacity:1}100%{opacity:0}}
/* numbers flying to the top bar + the cell catching them */
.kfnum{position:fixed;left:0;top:0;z-index:9470;pointer-events:none;padding:2px 9px;border-radius:999px;font-weight:700;font-size:.86rem;white-space:nowrap;box-shadow:0 2px 6px #0003;will-change:transform,opacity}
.kfnum.g{background:#e6f3e4;color:#2e6b3a;border:1px solid #9cc79a}.kfnum.r{background:#f7e3df;color:#a3291c;border:1px solid #d9a197}
.kfhit{animation:kfHit .6s ease-out}.kfhit-r{animation:kfHitR .6s ease-out}
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
    an.onfinish=()=>{fl.remove();tb.classList.remove("kfhit");void tb.offsetWidth;tb.classList.add("kfhit");setTimeout(()=>tb.classList.remove("kfhit"),700);kfPx("pop",{x:b.left+b.width/2,y:b.top+b.height/2})}}
   KFX.gainClosed=(KFX.gainClosed||0)+1;ov.classList.add("km-out");setTimeout(()=>ov.remove(),240);done()};
  ov.addEventListener("click",close)};
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
