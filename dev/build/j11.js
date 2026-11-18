/* ================= SETTINGS, SOUND, FEEDBACK, SCENE LAYER ================= */
const RM=(()=>{try{return matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}})();
const OPT=Object.assign({snd:false,mus:.5,sfx:.7,mute:false,vib:true,fxon:true},(()=>{try{return JSON.parse(localStorage.getItem("hclh-opt")||"{}")}catch(e){return{}}})());
function saveOpt(){try{localStorage.setItem("hclh-opt",JSON.stringify(OPT))}catch(e){}}
/* ---- audio: HTMLAudio, starts after the first tap, missing files fail silently ---- */
const AU={unlocked:false,cur:null,curName:"",duck:1,cache:{}};
function auOk(){return AU.unlocked&&OPT.snd&&!OPT.mute&&!document.hidden}
function mkAudio(n,loop){try{const a=new Audio(`audio/${n}.mp3`);a.loop=!!loop;a.preload="auto";a.addEventListener("error",()=>{a.dead=1});return a}catch(e){return null}}
function musVol(){return OPT.mute||!OPT.snd?0:OPT.mus*AU.duck}
function fadeTo(a,v,ms,done){if(!a)return;const v0=a.volume,t0=performance.now();const st=()=>{const f=Math.min(1,(performance.now()-t0)/ms);try{a.volume=Math.max(0,Math.min(1,v0+(v-v0)*f))}catch(e){}if(f<1)setTimeout(st,60);else if(done)done()};st()}
function startTrack(n){const a=mkAudio(n,false);if(!a)return null;a.volume=0;a.addEventListener("timeupdate",()=>{if(AU.curName!==n||a.handoff||!a.duration)return;if(a.currentTime>a.duration-1.6){a.handoff=1;const b=startTrack(n);if(b){AU.cur=b;fadeTo(b,musVol(),1500)}fadeTo(a,0,1500,()=>{try{a.pause()}catch(e){}})}});if(auOk()){const p=a.play();if(p&&p.catch)p.catch(()=>{})}return a}
function setMusic(n){if(AU.curName===n&&AU.cur)return;AU.curName=n;const old=AU.cur;const a=startTrack(n);AU.cur=a;if(a)fadeTo(a,musVol(),1200);if(old)fadeTo(old,0,1200,()=>{try{old.pause()}catch(e){}})}
function heartLoop(on){try{if(on&&auOk()){if(!AU.hb){AU.hb=mkAudio("sfx-heartbeat",true)}if(AU.hb&&AU.hb.paused){AU.hb.volume=OPT.sfx*.6;const p=AU.hb.play();if(p&&p.catch)p.catch(()=>{})}}else if(AU.hb&&!AU.hb.paused)AU.hb.pause()}catch(e){}}
function sfx(n){if(!auOk())return;try{let a=AU.cache[n];if(!a){a=AU.cache[n]=mkAudio(n,false)}if(!a||a.dead)return;const b=a.cloneNode();b.volume=OPT.sfx;const p=b.play();if(p&&p.catch)p.catch(()=>{});
 AU.duck=.45;if(AU.cur)AU.cur.volume=musVol();clearTimeout(AU.dt);AU.dt=setTimeout(()=>{AU.duck=1;if(AU.cur)AU.cur.volume=musVol()},650)}catch(e){}}
function musicCtx(){if(!S)return"bgm-day";if(S.dead)return"bgm-sorrow";if(S.place==="lc")return"bgm-cold";const m=Q[0];if(m&&(m.pid&&m.pid!=="ksp"&&m.pid!=="prep"&&m.pid!=="night1"&&m.pid!=="night2"&&m.pid!=="shop"))return"bgm-tension";
 if(m&&(m.pid==="night1"||m.pid==="night2"||m.cls==="night"))return"bgm-night";if((S.month===1||S.month===7)&&S.tuan===0)return"bgm-festival";return (S.buoi||0)===2?"bgm-night":"bgm-day"}
function auTick(){if(!AU.unlocked)return;const m0=Q[0];if(!(m0&&m0.pid&&musicCtx()==="bgm-tension"))heartLoop(false);if(!OPT.snd||OPT.mute){if(AU.cur)try{AU.cur.volume=0}catch(e){}return}setMusic(musicCtx());if(AU.cur){try{AU.cur.volume=musVol();if(AU.cur.paused&&!document.hidden){const p=AU.cur.play();if(p&&p.catch)p.catch(()=>{})}}catch(e){}}}
document.addEventListener("pointerdown",()=>{if(!AU.unlocked){AU.unlocked=true;auTick()}},{capture:true});
document.addEventListener("visibilitychange",()=>{try{if(document.hidden){if(AU.cur)AU.cur.pause()}else auTick()}catch(e){}if(PX.app){try{document.hidden?PX.app.ticker.stop():PX.app.ticker.start()}catch(e){}}});
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
function coinPop(n){const e=$("hud-bac");if(!e)return;const r=e.getBoundingClientRect();const d=document.createElement("div");d.className="coinp";d.textContent="◉ +"+(n||"");d.style.left=r.left+"px";d.style.top=r.top+"px";document.body.appendChild(d);setTimeout(()=>d.remove(),900)}
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
 W("curtain",o=>function(){feedback("page");inkWipe();return o.apply(this,arguments)});
 W("goTo",o=>function(k){const r=o.apply(this,arguments);if(S&&S.place===k&&k!=="home")feedback("step");if(k==="lc")feedback("ash");return r});
 W("over",o=>function(){const r=o.apply(this,arguments);auTick();return r});
 W("showModal",o=>function(){const r=o.apply(this,arguments);const m=Q[0];if(m){if(m.pid&&!["ksp","prep","night1","night2","shop","giftpick","plantpick","taintpick","evpick","itarget","plantsv"].includes(m.pid)){feedback("heart");heartLoop(true)}else sfx("sfx-open");if(m.cls==="night"||m.pid==="night1"||m.pid==="night2")nightFade()}auTick();return r});
 W("apply",o=>function(fx){const b=S&&S.bac;const r=o.apply(this,arguments);if(S&&!quiet&&S.bac>b)feedback("coin",{n:S.bac-b});return r});
 W("openMG",o=>function(k,lv,cb){return o.call(this,k,lv,g=>{feedback(g>=2?"good":"bad");cb(g)})});
 const P=ACT.poison.f;ACT.poison.f=function(a,t){const r=P.apply(this,arguments);if(t===S||a===S)feedback(t===S?"poison":"ink");return r};
 for(const k of ["frame","kframe","kpoison","musk"]){const F=ACT[k].f;ACT[k].f=function(a,t){const r=F.apply(this,arguments);if(a===S&&/thành|tìm thấy|sảy|trúng|đào được/.test(r)&&!/bị lộ|phát giác|chặn kịp/.test(r))feedback("ink");if(t===S&&!/chặn kịp/.test(r))feedback("hit");return r}}
 W("render",o=>function(){const r=o.apply(this,arguments);try{auTick();pxScene();hudTween();tokAnim()}catch(e){}return r})})();
function inkWipe(){if(!OPT.fxon||RM)return;fxOver("inkwipe")}
function nightFade(){if(!OPT.fxon||RM)return;fxOver("nightf")}
/* HUD numbers count smoothly */
const HV={};function hudTween(){for(const k of ["bac","suc","sung","danh"]){const e=$("hud-"+k);if(!e)continue;const sp=e.querySelector("span"),to=S[k];const fr=HV[k]==null?to:HV[k];HV[k]=to;if(fr===to||RM){sp.textContent=to;continue}
 const t0=performance.now();const st=()=>{const f=Math.min(1,(performance.now()-t0)/500);sp.textContent=Math.round(fr+(to-fr)*f);if(f<1)requestAnimationFrame(st)};requestAnimationFrame(st)}}
/* tokens: slide in only for people who just arrived */
let tokPrev=new Set();function tokAnim(){const now=new Set();document.querySelectorAll("#tokens .tok").forEach(b=>{const n=b.textContent;now.add(n);b.classList.add("bob");if(!tokPrev.has(n)&&!RM)b.classList.add("enter")});tokPrev=now}
/* ---- PixiJS scene layer behind the people; falls back to the static image ---- */
const PX={app:null,loading:false,failed:false,key:"",bg:null,parts:[],tex:{},layer:null,fxl:null,t:0};
function pxLoad(){if(PX.loading||PX.app||PX.failed||RM)return;PX.loading=true;const s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.js";s.async=true;
 s.onerror=()=>{PX.failed=true;PX.loading=false};s.onload=async()=>{try{const app=new PIXI.Application();const st=$("stage");await app.init({backgroundAlpha:0,resizeTo:st,antialias:false,autoDensity:true,resolution:Math.min(2,devicePixelRatio||1)});
  app.ticker.maxFPS=60;const c=app.canvas;c.className="pxc";st.insertBefore(c,$("stop")&&$("stop").parentNode===st?$("stop"):null);PX.app=app;PX.layer=new PIXI.Container();PX.fxl=new PIXI.Container();app.stage.addChild(PX.layer,PX.fxl);
  const g=new PIXI.Graphics();g.circle(8,8,8).fill(0xffffff);PX.tex.dot=app.renderer.generateTexture(g);const e=new PIXI.Graphics();e.ellipse(10,5,10,5).fill(0xffffff);PX.tex.petal=app.renderer.generateTexture(e);
  app.ticker.add(pxTick);PX.loading=false;PX.key="";pxScene()}catch(err){PX.failed=true;PX.loading=false}};document.head.appendChild(s)}
function pxCap(){return innerWidth<700?60:120}
function pxKind(){const P=placeOf(S.place),night=(S.buoi||0)===2,out=["vuon","lc","home"].includes(P.sc),w=S.wx?S.wx.k:"dust";
 if(out){const m={petal:"petal",rain:"rain",mist:"smoke",dust:night?"fly":"dust",sun:"dust",storm:"rain",leaf:"leaf",wind:"leaf",snow:"snow",snowh:"snow",frost:"snow",snowp:"snow"}[w]||"dust";return m}
 if(P.sc==="tn")return"smoke";if(P.sc==="thu")return"dust";if(night)return"fly";return w==="rain"||w==="storm"?"rain":"dust"}
async function pxScene(){if(!S||RM||!OPT.fxon){if(PX.app)PX.app.canvas.style.display="none";return}if(!PX.app){pxLoad();return}PX.app.canvas.style.display="";
 lightTick();const P=placeOf(S.place),k=P.sc+"|"+pxKind()+"|"+(S.wx?S.wx.k:"")+"|"+(S.buoi||0);if(PX.key===k)return;PX.key=k;
 for(const p of PX.parts)p.destroy();PX.parts=[];if(PX.bg){PX.bg.destroy({texture:false});PX.bg=null}
 const src=SCIMG[P.sc]?`img/${SCIMG[P.sc]}.webp`:null;if(src){try{const t=await PIXI.Assets.load(src);if(PX.key!==k)return;const sp=new PIXI.Sprite(t);sp.anchor.set(.5);PX.bg=sp;PX.layer.addChildAt(sp,0);$("scimg").style.opacity="0"}catch(e){$("scimg").style.opacity="1"}}else $("scimg").style.opacity="1";
 const kind=pxKind(),wk2=S.wx?S.wx.k:"",heavy=wk2==="snowh"||wk2==="storm",n=Math.round(pxCap()*(kind==="smoke"?.3:heavy?1:kind==="rain"?.6:.45));for(let i=0;i<n;i++)PX.parts.push(mkPart(kind,true));
 if(wk2==="snowp")for(let i=0;i<Math.round(n/4);i++)PX.parts.push(mkPart("petal",true));
 if((S.buoi||0)===2){const pts=[[.12,.3],[.88,.3],[.3,.18],[.7,.18]];pts.forEach(([x,y],i)=>{const g=mkPart("dust",true);g.v.kind="lamp";g.v.vx=0;g.v.vy=0;g.tint=0xffb050;g.scale.set(2.2);g.blendMode="add";g.alpha=0;g.v.on=i*40;g.v.fx=x;g.v.fy=y;PX.parts.push(g)});if(["vuon","lc","home"].includes(P.sc))for(let i=0;i<14;i++){const s=mkPart("dust",true);s.v.kind="star";s.v.vx=0;s.v.vy=0;s.tint=0xffffff;s.scale.set(.12);s.v.fy=Math.random()*.25;PX.parts.push(s)}}}
const PCOL={petal:[0xf4b6c8,0xf9d3dc,0xffffff],snow:[0xffffff],leaf:[0x9a9a8a,0x7a7a6a],dust:[0xfff2c0],fly:[0xfff07a],smoke:[0xcfc6bc],rain:[0xbcd0e0],gold:[0xf0d070,0xd9b25f],red:[0xc02a2a],ash:[0x6a6a6a,0x9a9a9a]};
function mkPart(kind,scatter,x0,y0){const W=PX.app.screen.width,H=PX.app.screen.height;const sp=new PIXI.Sprite(kind==="petal"||kind==="leaf"||kind==="gold"?PX.tex.petal:PX.tex.dot);
 const c=PCOL[kind]||[0xffffff];sp.tint=c[R(c.length)];sp.anchor.set(.5);const s={petal:.5,snow:.3,leaf:.6,dust:.15,fly:.25,smoke:2.2,rain:.12,gold:.6,red:.5,ash:.3}[kind]||.3;sp.scale.set(s*(.6+Math.random()*.8));
 sp.x=x0!=null?x0:Math.random()*W;sp.y=y0!=null?y0:(scatter?Math.random()*H:-10);sp.alpha=kind==="smoke"?.18:kind==="dust"?.5:.85;
 sp.v={kind,vx:(Math.random()-.5)*(kind==="rain"?.3:.6),vy:{petal:.5,snow:.4,leaf:.6,dust:-.05,fly:0,smoke:-.35,rain:6,gold:1.2,red:0,ash:.5}[kind]+Math.random()*.4,ph:Math.random()*6.28,life:x0!=null?90:1e9};
 if(kind==="rain")sp.scale.set(.1,1.2);if(x0!=null){sp.v.vx=(Math.random()-.5)*6;sp.v.vy=-Math.random()*5}
 (x0!=null?PX.fxl:PX.layer).addChild(sp);return sp}
function pxTick(tk){const d=tk.deltaTime,W=PX.app.screen.width,H=PX.app.screen.height;PX.t+=d/60;
 if(PX.bg){const sc=Math.max(W/PX.bg.texture.width,H/PX.bg.texture.height)*1.08;PX.bg.scale.set(sc*(1+.03*Math.sin(PX.t/9)));PX.bg.x=W/2+Math.sin(PX.t/13)*W*.02;PX.bg.y=H/2+Math.cos(PX.t/17)*H*.015}
 PX.flash=(PX.flash||0)*.9;if(S&&S.wx&&S.wx.k==="storm"&&Math.random()<.003*d){PX.flash=1;sfx("sfx-thunder")}$("stage").style.setProperty("--fl",PX.flash.toFixed(2));
 for(const p of PX.parts){const v=p.v;if(v.kind==="lamp"){if(v.on>0){v.on-=d}else p.alpha=Math.min(.55,p.alpha+.01*d)*(RM?1:.85+.15*Math.sin(PX.t*9+v.ph));p.x=v.fx*W;p.y=v.fy*H;continue}if(v.kind==="star"){p.y=v.fy*H;p.alpha=.5+.4*Math.sin(PX.t*2+v.ph);continue}v.ph+=.02*d;if(S&&S.wx&&S.wx.k==="wind")p.x+=1.2*d;p.x+=(v.vx+Math.sin(v.ph)*.3)*d;p.y+=v.vy*d;if(v.kind==="fly"){p.alpha=.4+.5*Math.sin(v.ph*3);p.x+=Math.sin(v.ph*1.3)*.4*d;p.y+=Math.cos(v.ph)*.4*d}if(v.kind==="petal"||v.kind==="leaf")p.rotation+=.02*d;
  if(p.y>H+12){p.y=-10;p.x=Math.random()*W}if(p.y<-20){p.y=H+10;p.x=Math.random()*W}if(p.x<-20)p.x=W+10;if(p.x>W+20)p.x=-10}
 for(const p of PX.fxl.children.slice()){const v=p.v;v.vy+=.15*d;p.x+=v.vx*d;p.y+=v.vy*d;p.rotation+=.05*d;v.life-=d;p.alpha=Math.max(0,v.life/90);if(v.life<=0)p.destroy()}}
function pxBurst(kind,n){if(!PX.app||RM||!OPT.fxon)return;const W=PX.app.screen.width,H=PX.app.screen.height;n=Math.min(n,pxCap());for(let i=0;i<n;i++)mkPart(kind,false,W/2+(Math.random()-.5)*W*.5,H*.45)}
/* ---- settings pop-over on the title screen ---- */
function optHTML(){return `<div class="optbox"><button class="btn" id="o-snd">${OPT.snd?"Tắt âm thanh":"Bật âm thanh"}</button>
 <label>Nhạc <input type="range" id="o-mus" min="0" max="1" step=".05" value="${OPT.mus}"></label><label>Hiệu ứng âm <input type="range" id="o-sfx" min="0" max="1" step=".05" value="${OPT.sfx}"></label><label>Giọng <input type="range" id="o-vo" min="0" max="1" step=".05" value="${OPT.vo==null?.7:OPT.vo}"></label>
 <label><input type="checkbox" id="o-mute" ${OPT.mute?"checked":""}> Tắt tiếng</label><label><input type="checkbox" id="o-vib" ${OPT.vib?"checked":""}> Rung</label><label><input type="checkbox" id="o-fx" ${OPT.fxon?"checked":""}> Hiệu ứng hình</label></div>`}
function wireOpt(){const T=$("title");if(!T)return;let b=T.querySelector(".optwrap");if(!b){b=document.createElement("div");b.className="optwrap";T.querySelector(".tbox").appendChild(b)}b.innerHTML=optHTML();
 $("o-snd").onclick=()=>{OPT.snd=!OPT.snd;AU.unlocked=true;saveOpt();wireOpt();auTick();if(OPT.snd)sfx("sfx-tap")};
 $("o-mus").oninput=e=>{OPT.mus=+e.target.value;saveOpt();auTick()};$("o-sfx").oninput=e=>{OPT.sfx=+e.target.value;saveOpt()};if($("o-vo"))$("o-vo").oninput=e=>{OPT.vo=+e.target.value;saveOpt();voice("f-softlaugh",1)};
 $("o-mute").onchange=e=>{OPT.mute=e.target.checked;saveOpt();auTick()};$("o-vib").onchange=e=>{OPT.vib=e.target.checked;saveOpt()};$("o-fx").onchange=e=>{OPT.fxon=e.target.checked;saveOpt();pxScene()}}
(function(){const o=window.showTitle;if(typeof o==="function")window.showTitle=function(){const r=o.apply(this,arguments);try{wireOpt()}catch(e){}return r}})();
