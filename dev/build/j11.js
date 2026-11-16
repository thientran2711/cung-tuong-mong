/* ================= SETTINGS, SOUND, FEEDBACK, SCENE LAYER ================= */
const RM=(()=>{try{return matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}})();
/* ONE-LINE SWITCH (owner question OPEN: sound on by default?). false = "Bật âm thanh" until the player turns it on (unchanged). Set true to ship sound-on-by-default. */
const SND_DEFAULT=false;
const OPT=Object.assign({snd:SND_DEFAULT,mus:.5,sfx:.7,mute:false,vib:true,fxon:true},(()=>{try{return JSON.parse(localStorage.getItem("hclh-opt")||"{}")}catch(e){return{}}})());
function saveOpt(){try{localStorage.setItem("hclh-opt",JSON.stringify(OPT))}catch(e){}}
/* ---- audio: HTMLAudio, starts after the first tap, missing files fail silently ---- */
const AU={unlocked:false,cur:null,curName:"",duck:1,cache:{}};
function auOk(){return AU.unlocked&&OPT.snd&&!OPT.mute&&!document.hidden}
function mkAudio(n,loop,route){try{const a=new Audio(`audio/${n}.mp3`);a.loop=!!loop;a.preload="auto";a.addEventListener("error",()=>{a.dead=1});if(route)auRoute(a);return a}catch(e){return null}}
/* ---- iOS / WebAudio layer (review/result-sfx): iPhone ignores element.volume and only unlocks audio on touchend / click / keydown (not a touch pointerdown).
   AU.ctx = one AudioContext, resumed + a silent buffer played on every real gesture (re-armed after the page was hidden or the phone interrupted it).
   Music (and the heartbeat loop) go through a GainNode and expose the same `volume` property, so the slider, mute and ducking work on iPhone; sfx play from decoded
   AudioBuffers (jsfx sfx()) through a GainNode too. Everything falls back to plain HTMLAudio when WebAudio is missing. */
function auRoute(a){try{if(!AU.ctx||AU.ctx.state==="closed"||a.__gain)return;const src=AU.ctx.createMediaElementSource(a),g=AU.ctx.createGain();src.connect(g);g.connect(AU.ctx.destination);let v=1;a.__gain=g;
 Object.defineProperty(a,"volume",{configurable:true,get:()=>v,set:x=>{v=Math.max(0,Math.min(1,+x||0));g.gain.value=v}})}catch(e){}}
function auBuf(n){if(!AU.ctx)return null;const c=AU.bufs||(AU.bufs={});const e=c[n];if(e)return e.buf||null;const o=c[n]={buf:null,fail:0};
 try{fetch(`audio/${n}.mp3`).then(r=>r.ok?r.arrayBuffer():Promise.reject(new Error(r.status))).then(ab=>new Promise((ok,no)=>{const p=AU.ctx.decodeAudioData(ab,ok,no);if(p&&p.catch)p.catch(no)})).then(b=>{o.buf=b}).catch(()=>{o.fail=1})}catch(e){o.fail=1}return null}
const AU_PRELOAD=["sfx-win","sfx-fail","sfx-learn-good","sfx-learn-bad","sfx-seal-stamp","sfx-tap","sfx-expose","sfx-scheme","sfx-rank-new","sfx-podium","sfx-buy","sfx-coin"];
function auUnlock(){try{const C=window.AudioContext||window.webkitAudioContext;
 if(C&&!AU.ctx){try{AU.ctx=new C({latencyHint:"interactive"})}catch(e){try{AU.ctx=new C()}catch(x){}}}
 try{if(navigator.audioSession&&navigator.audioSession.type!=="playback")navigator.audioSession.type="playback"}catch(e){}
 const c=AU.ctx;if(c&&c.state!=="running"){const p=c.resume();if(p&&p.catch)p.catch(()=>{})}
 if(c&&!AU.silent){AU.silent=1;try{const s=c.createBufferSource();s.buffer=c.createBuffer(1,1,22050);s.connect(c.destination);s.start(0)}catch(e){}if(!AU.pre){AU.pre=1;AU_PRELOAD.forEach(auBuf)}}
 if(!AU.unlocked){AU.unlocked=true;auTick()}}catch(e){if(!AU.unlocked)AU.unlocked=true}}
window.auUnlock=auUnlock;
function musVol(){return OPT.mute||!OPT.snd?0:OPT.mus*AU.duck}
function fadeTo(a,v,ms,done){if(!a)return;const v0=a.volume,t0=performance.now();const st=()=>{const f=Math.min(1,(performance.now()-t0)/ms);try{a.volume=Math.max(0,Math.min(1,v0+(v-v0)*f))}catch(e){}if(f<1)setTimeout(st,60);else if(done)done()};st()}
function startTrack(n){const a=mkAudio(n,false,true);if(!a)return null;a.volume=0;a.addEventListener("timeupdate",()=>{if(AU.curName!==n||a.handoff||!a.duration)return;if(a.currentTime>a.duration-1.6){a.handoff=1;const b=startTrack(n);if(b){AU.cur=b;fadeTo(b,musVol(),1500)}fadeTo(a,0,1500,()=>{try{a.pause()}catch(e){}})}});if(auOk()){const p=a.play();if(p&&p.catch)p.catch(()=>{})}return a}
function setMusic(n){if(AU.curName===n&&AU.cur)return;AU.curName=n;const old=AU.cur;const a=startTrack(n);AU.cur=a;if(a)fadeTo(a,musVol(),1200);if(old)fadeTo(old,0,1200,()=>{try{old.pause()}catch(e){}})}
function heartLoop(on){try{if(on&&auOk()){if(!AU.hb){AU.hb=mkAudio("sfx-heartbeat",true,true)}if(AU.hb&&AU.hb.paused){AU.hb.volume=OPT.sfx*.6;const p=AU.hb.play();if(p&&p.catch)p.catch(()=>{})}}else if(AU.hb&&!AU.hb.paused)AU.hb.pause()}catch(e){}}
function sfx(n){if(!auOk())return;try{let a=AU.cache[n];if(!a){a=AU.cache[n]=mkAudio(n,false)}if(!a||a.dead)return;const b=a.cloneNode();b.volume=OPT.sfx;const p=b.play();if(p&&p.catch)p.catch(()=>{});
 AU.duck=.45;if(AU.cur)AU.cur.volume=musVol();clearTimeout(AU.dt);AU.dt=setTimeout(()=>{AU.duck=1;if(AU.cur)AU.cur.volume=musVol()},650)}catch(e){}}
function musicCtx(){if(!S)return"bgm-day";if(S.dead)return"bgm-sorrow";if(S.place==="lc")return"bgm-cold";const m=Q[0];if(m&&(m.pid&&m.pid!=="ksp"&&m.pid!=="prep"&&m.pid!=="night1"&&m.pid!=="night2"&&m.pid!=="shop"))return"bgm-tension";
 if(m&&(m.pid==="night1"||m.pid==="night2"||m.cls==="night"))return"bgm-night";if((S.month===1||S.month===7)&&S.tuan===0)return"bgm-festival";return (S.buoi||0)===B4L?"bgm-night":"bgm-day"}
function auTick(){if(!AU.unlocked)return;const m0=Q[0];if(!(m0&&m0.pid&&musicCtx()==="bgm-tension"))heartLoop(false);if(!OPT.snd||OPT.mute){if(AU.cur)try{AU.cur.volume=0}catch(e){}return}setMusic(musicCtx());if(AU.cur){try{AU.cur.volume=musVol();if(AU.cur.paused&&!document.hidden){const p=AU.cur.play();if(p&&p.catch)p.catch(()=>{})}}catch(e){}}}
/* real gestures only: touchend / click / pointerup / keydown unlock iOS; pointerdown counts for a mouse (or when WebAudio is missing), a touch pointerdown is not a gesture there */
for(const ev of ["touchend","click","pointerup","keydown"])document.addEventListener(ev,auUnlock,{capture:true,passive:true});
document.addEventListener("pointerdown",e=>{if(e.pointerType==="mouse"||!(window.AudioContext||window.webkitAudioContext))auUnlock()},{capture:true,passive:true});
window.addEventListener("pageshow",()=>{AU.silent=0});
document.addEventListener("visibilitychange",()=>{try{if(document.hidden){if(AU.cur)AU.cur.pause()}else{AU.silent=0;if(AU.ctx&&AU.ctx.state!=="running"){const p=AU.ctx.resume();if(p&&p.catch)p.catch(()=>{})}auTick()}}catch(e){}if(PX.app){try{document.hidden?PX.app.ticker.stop():PX.app.ticker.start()}catch(e){}}});
/* ---- feedback(kind): sound + haptics + visual, one helper ---- */
const VIB={tap:8,coin:15,decree:[20,40,20],promote:[30,30,60],poison:[80,40,120],expose:[120],birth:[15,30,15,30,15],night:[10],heart:[40,120,40,600],hit:[30]};
const SFXN={tap:"sfx-tap",open:"sfx-open",coin:"sfx-coin",decree:"sfx-decree",promote:"sfx-promote",poison:"sfx-poison",expose:"sfx-expose",birth:"sfx-birth",night:"sfx-night",page:"sfx-page",step:"sfx-step",good:"sfx-learn-good",bad:"sfx-learn-bad",verdict:"sfx-decree",hit:"sfx-expose"};
function vib(k){if(!OPT.vib)return;try{if(navigator.vibrate&&VIB[k])navigator.vibrate(VIB[k])}catch(e){}}
function feedback(k,o){o=o||{};if(SFXN[k])sfx(SFXN[k]);vib(k);if(!OPT.fxon||RM)return;
 const g=$("game");
 if(k==="poison"){fxCls("shake-hard",g);fxOver("vig-red");pxBurst("red",30)}
 else if(k==="expose"){fxCls("shake-hard",g);fxOver("crack")}
 else if(k==="hit"){fxCls("shake",g);fxOver("vig-red")}
 else if(k==="decree"){fxOver("rim-gold");pxBurst("gold",40)}
 else if(k==="promote"){fxOver("rim-gold");pxBurst("gold",60);stamp(o.t||"Tấn phong","gold")}
 else if(k==="verdict"){fxCls("shake",g);stamp(o.t||"Định tội","red")}
 else if(k==="birth"){fxOver("flash-white");pxBurst("petal",50)}
 else if(k==="favour"){pxBurst("petal",24)}
 else if(k==="coin"){coinPop(o.n)}
 else if(k==="ink"){fxOver("ink")}
 else if(k==="ash"){pxBurst("ash",40)}}
function fxCls(c,el){if(!el)return;el.classList.remove(c);void el.offsetWidth;el.classList.add(c);setTimeout(()=>el.classList.remove(c),700)}
function fxOver(c){const d=document.createElement("div");d.className="fxo "+c;document.body.appendChild(d);setTimeout(()=>d.remove(),1300)}
function stamp(t,c){const d=document.createElement("div");d.className="stamp "+(c||"red");d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),1500)}
function coinPop(n){if(typeof kitStatFx==="function"&&n)return kitStatFx([{k:"bac",dv:+n}],{src:"coin"});const e=$("hud-bac");if(!e)return;const r=e.getBoundingClientRect();const d=document.createElement("div");d.className="coinp";d.textContent="◉ +"+(n||"");d.style.left=r.left+"px";d.style.top=r.top+"px";document.body.appendChild(d);setTimeout(()=>d.remove(),900)}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("button");if(b&&!b.disabled)feedback(b.closest("#tabs")?"page":"tap")},true);
/* ---- hooks into the game (wrapping the shared functions, so NPC events show too when they touch the player) ---- */
(function(){const W=(n,f)=>{const o=window[n];if(typeof o!=="function")return;window[n]=f(o)};
 W("bestow",o=>function(p,why){const r=o.apply(this,arguments);if(p===S)feedback("decree");return r});
 W("promoteP",o=>function(p){const r=o.apply(this,arguments);if(r&&p===S)feedback("promote",{t:S.rank>=7?"Phong hậu":"Tấn phong"});return r});
 W("deathSentence",o=>function(p,why){const me=typeof p==="string"||p===S;if(me){feedback("expose");feedback("verdict",{t:"Ban chết"})}else feedback("verdict",{t:"Ban chết"});return o.apply(this,arguments)});
 W("fall",o=>function(p){feedback(p===S?"expose":"ink");feedback("verdict",{t:"Phế"});return o.apply(this,arguments)});
 W("punish",o=>function(p){if(typeof p==="string"||p===S)feedback("hit");return o.apply(this,arguments)});
 W("birthP",o=>function(p){const r=o.apply(this,arguments);if(p===S&&!S.dead)feedback("birth");return r});
 W("nightFx",o=>function(){feedback("night");feedback("favour");return o.apply(this,arguments)});
 /* buổi / tuần change: no page sound, no dark wipe (owner 15/11: it read as a page flip) — jbuoi.js paints the transition */

 W("goTo",o=>function(k){const r=o.apply(this,arguments);if(S&&S.place===k&&k!=="home")feedback("step");if(k==="lc")feedback("ash");return r});
 W("over",o=>function(){const r=o.apply(this,arguments);auTick();return r});
 W("showModal",o=>function(){const r=o.apply(this,arguments);const m=Q[0];if(m){if(m.pid&&!["ksp","prep","night1","night2","shop","giftpick","plantpick","taintpick","evpick","itarget","plantsv"].includes(m.pid)){feedback("heart");heartLoop(true)}else sfx("sfx-open");if(m.cls==="night"||m.pid==="night1"||m.pid==="night2")nightFade()}auTick();return r});
 W("apply",o=>function(fx){const b=S&&S.bac;const r=o.apply(this,arguments);if(S&&!quiet&&S.bac>b)feedback("coin",{n:S.bac-b});return r});
 W("openMG",o=>function(k,lv,cb){return o.call(this,k,lv,g=>{feedback(g>=2?"good":"bad");cb(g)})});
 const P=ACT.poison.f;ACT.poison.f=function(a,t){const r=P.apply(this,arguments);if(t===S||a===S)feedback(t===S?"poison":"ink");return r};
 for(const k of ["frame","kframe","kpoison","musk"]){const F=ACT[k].f;ACT[k].f=function(a,t){const r=F.apply(this,arguments);if(a===S&&/thành|tìm thấy|sảy|trúng|đào được/.test(r)&&!/bị lộ|phát giác|chặn kịp/.test(r))feedback("ink");if(t===S&&!/chặn kịp/.test(r))feedback("hit");return r}}
 W("render",o=>function(){const r=o.apply(this,arguments);try{auTick();pxScene();hudTween();tokAnim();if(S&&!S.dead&&!pxPreload.done)pxPreload()}catch(e){}return r})})();
function inkWipe(){if(!OPT.fxon||RM)return;fxOver("inkwipe")}
function nightFade(){if(!OPT.fxon||RM)return;fxOver("nightf")}
/* HUD numbers count smoothly */
const HV={};function hudTween(){for(const k of ["bac","suc","sung","danh"]){const e=$("hud-"+k);if(!e)continue;const sp=e.querySelector("span"),to=S[k];const fr=HV[k]==null?to:HV[k];HV[k]=to;if(fr===to||RM){sp.textContent=to;continue}
 const t0=performance.now();const st=()=>{const f=Math.min(1,(performance.now()-t0)/500);sp.textContent=Math.round(fr+(to-fr)*f);if(f<1)requestAnimationFrame(st)};requestAnimationFrame(st)}}
/* tokens: slide in only for people who just arrived */
let tokPrev=new Set();function tokAnim(){const now=new Set();document.querySelectorAll("#tokens .tok").forEach(b=>{const n=b.textContent;now.add(n);b.classList.add("bob");if(!tokPrev.has(n)&&!RM)b.classList.add("enter")});tokPrev=now}
/* ---- PixiJS scene layer behind the people; falls back to the static image ---- */
const PX={app:null,loading:false,failed:false,key:"",bg:null,parts:[],tex:{},layer:null,fxl:null,t:0};
/* ONE Pixi loader (stage layer here, FX overlay in jfx): the library is bundled with the site (dev/vendor, listed in assets.json → sw.js caches it,
   so it plays offline) and only fetched when a Pixi layer is first needed — never on the title / loading screen */
const PIXI_SRC="dev/vendor/pixi-8.5.2.min.js";
function kitPixi(){if(window.PIXI&&window.PIXI.Application)return Promise.resolve(window.PIXI);if(kitPixi.p)return kitPixi.p;
 kitPixi.p=new Promise((ok,no)=>{const s=document.createElement("script");s.src=PIXI_SRC;s.async=true;s.onload=()=>window.PIXI?ok(window.PIXI):no(new Error("pixi"));s.onerror=()=>{kitPixi.p=null;s.remove();no(new Error("pixi load"))};document.head.appendChild(s)});return kitPixi.p}
function pxLoad(){if(PX.loading||PX.app||PX.failed||RM)return;PX.loading=true;
 kitPixi().then(async()=>{try{const app=new PIXI.Application();const st=$("stage");await app.init({backgroundAlpha:0,resizeTo:st,antialias:false,autoDensity:true,resolution:Math.min(2,devicePixelRatio||1)});
  app.ticker.maxFPS=60;
  /* lag-play (owner 16/11 15:05Z): the stage collapses to 0 px under other tabs; resizing the WebGL canvas to 0 and back reallocated its
     buffers twice per tab switch (0.5-5 s on a slow phone). A hidden (0-size) stage keeps its canvas; same size = nothing to do. */
  {const r0=app.resize;if(typeof r0==="function")app.resize=function(){try{const e=this.resizeTo||st,w=e.clientWidth,h=e.clientHeight;if(!w||!h)return;const sc=this.screen;if(sc&&Math.round(sc.width)===Math.round(w)&&Math.round(sc.height)===Math.round(h))return}catch(x){}return r0.apply(this,arguments)}}
  const c=app.canvas;c.className="pxc";st.insertBefore(c,$("stop")&&$("stop").parentNode===st?$("stop"):null);PX.app=app;PX.layer=new PIXI.Container();PX.fxl=new PIXI.Container();app.stage.addChild(PX.layer,PX.fxl);
  app.ticker.add(pxTick);PX.loading=false;PX.key="";pxScene()}catch(err){PX.failed=true;PX.loading=false}}).catch(()=>{PX.failed=true;PX.loading=false})}
/* review/lag-play-2: the first Pixi load (script parse + WebGL init, ~1-4 s on a slow phone) used to land inside her first tab / act tap.
   Once a life is in play, at the first idle moment (~2.5 s after), fetch + run the library, then open the stage layer if the stage is on
   screen. Same loader (kitPixi), same layer (pxLoad); nothing new is drawn. Skipped when effects are off / reduced motion. */
function pxPreload(){if(pxPreload.done||RM||typeof OPT!=="object"||!OPT.fxon)return;pxPreload.done=1;
 const ric=window.requestIdleCallback||(f=>setTimeout(f,1));
 setTimeout(()=>ric(()=>{kitPixi().then(()=>ric(()=>{try{const st=$("stage");if(S&&!S.dead&&st&&st.clientWidth>0&&st.clientHeight>0)pxLoad()}catch(e){}
  /* the FX overlay app (jfx kfApp: hidden canvas, ticker stopped until an effect plays) */
  ric(()=>{try{if(typeof kfApp==="function"&&!(typeof kfStill==="function"&&kfStill()))kfApp().catch(()=>{})}catch(e){}},{timeout:3000})},{timeout:3000})).catch(()=>{})},{timeout:4000}),2500)}
function pxCap(){return innerWidth<700?60:120}
function pxKind(){const P=placeOf(S.place),night=(S.buoi||0)===B4L,out=["vuon","lc","home","tgk","maid"].includes(P.sc),w=S.wx?S.wx.k:"dust";
 if(out){const m={petal:"petal",rain:"rain",mist:"smoke",dust:night?"fly":"dust",sun:"dust",storm:"rain",leaf:"leaf",wind:"leaf",snow:"snow",snowh:"snow",frost:"snow",snowp:"snow"}[w]||"dust";return m}
 if(P.sc==="tn")return"smoke";if(P.sc==="thu")return"dust";if(night)return"fly";return w==="rain"||w==="storm"?"rain":"dust"}
async function pxScene(){if(!S||RM||!OPT.fxon){if(PX.app)PX.app.canvas.style.display="none";return}if(!PX.app){pxLoad();return}PX.app.canvas.style.display="";
 lightTick();const P=placeOf(S.place),k=P.sc+"|"+pxKind()+"|"+(S.wx?S.wx.k:"")+"|"+(S.buoi||0);if(PX.key===k)return;PX.key=k;
 for(const p of PX.parts)p.destroy();PX.parts=[];if(PX.bg){PX.bg.destroy({texture:false});PX.bg=null}
 /* ONE backdrop (owner 11/15): the Pixi room copy uses the very picture #scimg shows (kitFloorFit may swap in the portrait painting) */
 const m0=/url\(["']?([^"')]+)["']?\)/.exec(($("scimg")||{}).style?$("scimg").style.backgroundImage||"":"");
 const src=SCIMG[P.sc]?(m0?m0[1]:`img/${SCIMG[P.sc]}.webp`):null;PX.bgSrc=src;PX.src=src;if(src){try{const t=await PIXI.Assets.load(src);if(PX.key!==k||PX.src!==src)return;const sp=new PIXI.Sprite(t);sp.anchor.set(.5);PX.bg=sp;PX.layer.addChildAt(sp,0);$("scimg").style.opacity="0"}catch(e){$("scimg").style.opacity="1"}}else $("scimg").style.opacity="1";}
/* celebration bursts are PAINTED sprites on the jfx canvas (kfPx); no code-drawn particles remain in j11 */
function pxBurst(kind,n){try{const m={gold:"goldpetals",petal:"petals",ash:"ash",red:"ash"}[kind];if(m&&typeof kfPx==="function")kfPx(m)}catch(e){}}
function pxTick(tk){const d=tk.deltaTime,W=PX.app.screen.width,H=PX.app.screen.height;PX.t+=d/60;
 if(PX.bg){const K=window.KIT_PXBG;/* KIT 31.4: the Pixi room copy uses the SAME crop as #scimg (KIT_FANCHOR / KIT_FLOOR), with only a faint breath, so feet stay on the painted floor */
 const im=$("scimg"),mu=im&&/url\(["']?([^"')]+)["']?\)/.exec(im.style.backgroundImage||"");
 const tw=PX.bg.texture.width,th=PX.bg.texture.height;
 /* ONE backdrop (owner 11/15): the Pixi copy is drawn only when it is exactly the picture and crop #scimg shows; else the CSS backdrop alone */
 const same=!!(mu&&PX.bgSrc===mu[1]&&K&&K.dw&&K.dh&&Math.abs(K.dw/K.dh-tw/th)<.03);
 if(PX.bg.visible!==same)PX.bg.visible=same;const op=same?"0":"1";if(im&&im.style.opacity!==op)im.style.opacity=op;
 if(same){let sc=K.dw/tw,cx=K.x0+K.dw/2,cy=K.y0+K.dh/2;
  /* KIT_BD rule (owner 11/15 "two backdrops"): ONE picture covers the WHOLE stage box — a stale or short crop never leaves a band where the
     stage background or another picture shows; grow to cover and keep the edges inside the picture */
  const need=Math.max(W/tw,H/th);if(sc<need)sc=need;const hw=tw*sc/2,hh=th*sc/2;cx=Math.min(hw,Math.max(W-hw,cx));cy=Math.min(hh,Math.max(H-hh,cy));
  PX.bg.scale.set(sc*(1.003+.003*Math.sin(PX.t/9)));PX.bg.x=cx;PX.bg.y=cy}
 else{const sc=Math.max(W/PX.bg.texture.width,H/PX.bg.texture.height)*1.08;PX.bg.scale.set(sc*(1+.03*Math.sin(PX.t/9)));PX.bg.x=W/2+Math.sin(PX.t/13)*W*.02;PX.bg.y=H/2+Math.cos(PX.t/17)*H*.015}}
 PX.flash=(PX.flash||0)*.9;if(S&&S.wx&&S.wx.k==="storm"&&Math.random()<.003*d){PX.flash=1;sfx("sfx-thunder")}$("stage").style.setProperty("--fl",PX.flash.toFixed(2));
 for(const p of PX.parts){const v=p.v;if(v.kind==="lamp"){if(v.on>0){v.on-=d}else p.alpha=Math.min(.55,p.alpha+.01*d)*(RM?1:.85+.15*Math.sin(PX.t*9+v.ph));p.x=v.fx*W;p.y=v.fy*H;continue}if(v.kind==="star"){p.y=v.fy*H;p.alpha=.5+.4*Math.sin(PX.t*2+v.ph);continue}v.ph+=.02*d;if(S&&S.wx&&S.wx.k==="wind")p.x+=1.2*d;p.x+=(v.vx+Math.sin(v.ph)*.3)*d;p.y+=v.vy*d;if(v.kind==="fly"){p.alpha=.4+.5*Math.sin(v.ph*3);p.x+=Math.sin(v.ph*1.3)*.4*d;p.y+=Math.cos(v.ph)*.4*d}if(v.kind==="petal"||v.kind==="leaf")p.rotation+=.02*d;
  if(p.y>H+12){p.y=-10;p.x=Math.random()*W}if(p.y<-20){p.y=H+10;p.x=Math.random()*W}if(p.x<-20)p.x=W+10;if(p.x>W+20)p.x=-10}
 for(const p of PX.fxl.children.slice()){const v=p.v;v.vy+=.15*d;p.x+=v.vx*d;p.y+=v.vy*d;p.rotation+=.05*d;v.life-=d;p.alpha=Math.max(0,v.life/90);if(v.life<=0)p.destroy()}}
/* ---- settings pop-over on the title screen ---- */
function optHTML(){return `<div class="optbox"><button class="btn" id="o-snd">${OPT.snd?"Tắt âm thanh":"Bật âm thanh"}</button>
 <label>Nhạc <input type="range" id="o-mus" min="0" max="1" step=".05" value="${OPT.mus}"></label><label>Hiệu ứng âm <input type="range" id="o-sfx" min="0" max="1" step=".05" value="${OPT.sfx}"></label><label>Giọng <input type="range" id="o-vo" min="0" max="1" step=".05" value="${OPT.vo==null?.7:OPT.vo}"></label>
 <label><input type="checkbox" id="o-mute" ${OPT.mute?"checked":""}> Tắt tiếng</label><label><input type="checkbox" id="o-vib" ${OPT.vib?"checked":""}> Rung</label><label><input type="checkbox" id="o-fx" ${OPT.fxon?"checked":""}> Hiệu ứng hình</label></div>`}
function wireOpt(){const T=$("title");if(!T)return;let b=T.querySelector(".optwrap");if(!b){b=document.createElement("div");b.className="optwrap";T.querySelector(".tbox").appendChild(b)}b.innerHTML=optHTML();
 $("o-snd").onclick=()=>{OPT.snd=!OPT.snd;AU.unlocked=true;saveOpt();wireOpt();auTick();if(OPT.snd)sfx("sfx-tap")};
 $("o-mus").oninput=e=>{OPT.mus=+e.target.value;saveOpt();auTick()};$("o-sfx").oninput=e=>{OPT.sfx=+e.target.value;saveOpt()};if($("o-vo"))$("o-vo").oninput=e=>{OPT.vo=+e.target.value;saveOpt();voice("f-softlaugh",1)};
 $("o-mute").onchange=e=>{OPT.mute=e.target.checked;saveOpt();auTick()};$("o-vib").onchange=e=>{OPT.vib=e.target.checked;saveOpt()};$("o-fx").onchange=e=>{OPT.fxon=e.target.checked;saveOpt();pxScene()}}
(function(){const o=window.showTitle;if(typeof o==="function")window.showTitle=function(){const r=o.apply(this,arguments);try{wireOpt()}catch(e){}return r}})();
