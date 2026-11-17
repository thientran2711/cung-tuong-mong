/* New builds for Cung Tường Mộng (inlined at the end of index.html by dev/site/build_site.sh; KIT.md §35.2).
   Owner 11/15: the installed app / phone must never stay on an old build — and (15/11 03:10Z) "I am playing, what then?":
   a new build NEVER reloads the page in the middle of play.
   - registers sw.js (updateViaCache none) and asks for a new sw.js on open, on every return to the foreground and every 20 min.
     A new worker takes over ('controllerchange') → the build is "pending".
   - pending while playing: only the kit status icon "Có bản mới" (kitStatusIcon "upd", KIT §77.1: square rail icon with a red dot, no chip on the top bar). Tap → kit card
     "Có bản mới · Mở bản mới ngay?" with Để sau / Mở bản mới.
   - the new build opens by itself only at a natural break:
       · Sang buổi / Sang ngày mới: once the new buổi has begun (and its dialogs are read; not after she has spent a khắc of it),
       · the app comes back from the background after ≥ 10 minutes (before she does anything),
       · the title screen / first-entry loading screen.
     Then: save() → note {slot} in localStorage "ctm-upd-resume" → reload → the new build opens the SAME sổ (the title's own
     "Tiếp tục" path: same buổi, same khắc, same tab, the open dialogs of the queue) and shows the line "Đã mở bản mới".
   - co-op (jcoop / jcoopworld): never reloads while in a room unless both go together. Each client tells the other its build
     through the room's `act` relay ({t:"act",k:"ctm-upd",mode,v}; PROTOCOL §9.1 relays any act unchanged; older clients ignore
     acts that are not invites, so no Worker change). Either one finding a new build → both show the chip. Both open it at the
     next buổi both have passed (the room's own sync point), or when one asks (chip → Mở bản mới → the friend: Cùng mở / Để sau).
     Before the reload the local week is kept (COOPW.snap); after it the lobby's own "Trở lại phòng" rejoins the same room and seat,
     and COOPW.restore puts the week back: no code to type, no invite. Two different builds never play on: the room holds
     (COOPW.hold freezes Sang buổi) and the older one walks through the same save → reload → rejoin at once.
   Test hook: window.KSW {build, had, pending, chip, checks, why, peer, hidAt, away, applied, resumed, awayMs}. */
(function(){
const BUILD="__B__";window.CTM_BUILD=BUILD;
const LSK="ctm-upd-resume",AWAY=10*60e3;
const hasSW="serviceWorker" in navigator&&/^https?:$/.test(location.protocol),SW=hasSW?navigator.serviceWorker:null;
const K=window.KSW={calm:0,build:BUILD,had:!!(SW&&SW.controller),pending:false,chip:false,checks:0,why:"",peer:null,hidAt:0,away:null,applied:null,resumed:null,awayMs:AWAY};
const $i=id=>document.getElementById(id);
const LS={get(k){try{return localStorage.getItem(k)}catch(e){return null}},set(k,v){try{localStorage.setItem(k,v);return true}catch(e){return false}},del(k){try{localStorage.removeItem(k)}catch(e){}}};

/* ---------- the game as seen from here (all guarded: this runs after the game's scripts, but never trusts them) ---------- */
const G=()=>{try{return typeof S!=="undefined"&&S?S:null}catch(e){return null}};
const khac=()=>{try{return typeof used!=="undefined"?used:0}catch(e){return 0}};
const bk=()=>{const s=G();return s?[s.year,s.month,s.tuan,s.buoi||0].join(":"):""};
function vis(e){return !!e&&!e.hidden&&e.getClientRects().length>0&&getComputedStyle(e).visibility!=="hidden"}
const titleUp=()=>{const t=$i("title");return !!t&&!t.hidden};
const loading=()=>!!$i("kload");
const coop=()=>window.COOP&&typeof COOP==="object"?COOP:null;
const inRoom=()=>{const c=coop();return !!(c&&c.state&&(c.state.status!=="off"||c.state.playing))||!!(window.COOPW&&COOPW.on)};
const coopOn=()=>!!(window.COOPW&&COOPW.on);
/* something she would lose by leaving now: a mini game / lesson, a motion moment, the honour podium, the week book, a page turning */
function hardBusy(){try{const s=G();if(s&&s.mg&&!s.dead)return true;if(vis($i("ov")))return true;
 for(const m of document.querySelectorAll(".kmov,#kpodov,.kbk,.kcl-host"))if(vis(m))return true}catch(e){}return false}
/* …or any dialog at all (queued notice, kit card, co-op waiting panel) */
function busy(){if(hardBusy())return true;try{if(typeof Q!=="undefined"&&Q&&Q.length)return true;
 for(const m of document.querySelectorAll(".modal"))if(m.id!=="kload"&&vis(m))return true;if($i("kupd"))return true}catch(e){}return false}
const playing=()=>{const s=G();return !!s&&!s.dead&&!titleUp()&&!loading()};

/* ---------- service worker ---------- */
let reg=null,last=0;
function check(force){if(!reg)return;const n=Date.now();if(!force&&n-last<10000)return;last=n;K.checks++;
 reg.update().catch(()=>{});if(reg.waiting)reg.waiting.postMessage({ctm:"skip"})}
K.check=()=>check(true);
if(SW){
 SW.register("sw.js",{updateViaCache:"none"}).then(r=>{reg=r;check(true);
  r.addEventListener("updatefound",()=>{const w=r.installing;if(w)w.addEventListener("statechange",()=>{if(w.state==="installed"&&r.waiting)r.waiting.postMessage({ctm:"skip"})})})}).catch(()=>{});
 addEventListener("pageshow",e=>{if(e.persisted)check(true)});
 addEventListener("focus",()=>check());addEventListener("online",()=>check(true));
 setInterval(()=>{if(document.visibilityState==="visible")check()},20*60e3);
 SW.addEventListener("controllerchange",()=>{if(!K.had){K.had=true;return}if(K.pending)return;K.pending=true;K.k0=bk();K.u0=khac();onPending()});
}
document.addEventListener("visibilitychange",()=>{const n=Date.now();
 if(document.visibilityState==="hidden"){K.hidAt=n;if(K.pending&&!inRoom()&&(titleUp()||loading())&&!K.resuming)reopen(null);return}
 check(true);
 /* back after ≥ 10 min: a natural break until she does something (same buổi, same khắc) */
 if(K.hidAt&&n-K.hidAt>=K.awayMs)K.away={until:n+120e3,k:bk(),u:khac()};K.hidAt=0;tick()});

/* ---------- when the new build opens ---------- */
let T=0;
function onPending(){K.why="";chip();if(inRoom())say("have");tick();if(!T)T=setInterval(tick,1000)}
function tick(){place();if(!K.pending||K.resuming||K.leaving)return;
 /* first-entry loading screen / title / dead end of a life with nothing to keep: open at once (the loading resumes file by file) */
 if(loading()){reopen(null);return}
 if(inRoom()){coopTick();return}
 const s=G();
 /* title screen (not while she types in Chép sổ / Nạp sổ); a life being chosen (Luân hồi, no S yet) or a death screen waits */
 if(titleUp()){const a=document.activeElement;if(!K.cardEl&&!(a&&/^(INPUT|TEXTAREA)$/.test(a.tagName)))reopen(null);return}
 if(!s||s.dead||K.cardEl)return;
 const n=Date.now();
 if(K.away&&n<K.away.until&&K.away.k===bk()&&K.away.u===khac()&&!hardBusy()){reopen("away");return}
 /* the new buổi has begun and stayed quiet for 2 ticks (its late hooks have run and written the sổ) */
 if(bk()!==K.k0&&khac()===0&&!busy()){if(++K.calm>=2)reopen("buoi");return}K.calm=0}
/* save → remember the sổ → reload. why null = nothing to resume (title / loading screen) */
function reopen(why,extra){if(K.leaving)return;K.leaving=true;K.applied=why||"title";
 if(why){const s=G();let slot=1;try{slot=SLOT}catch(e){}
  try{if(typeof save==="function")save()}catch(e){}
  LS.set(LSK,JSON.stringify(Object.assign({slot,at:Date.now(),why,k:bk(),u:khac(),from:BUILD,name:s&&s.name},extra||{})))}
 setTimeout(()=>location.reload(),extra&&extra.coop?350:0)}

/* ---------- co-op ---------- */
let seq=0;
function say(mode,x){const c=coop();if(!c||!c.send)return;try{c.send(Object.assign({t:"act",id:"upd-"+Date.now().toString(36)+"-"+(seq++),k:"ctm-upd",mode,v:BUILD,pending:K.pending},x||{}))}catch(e){}}
function hold(on){if(window.COOPW&&COOPW.hold!==on){COOPW.hold=on;try{render()}catch(e){}}}
/* the friend is ready for the new build too (or plays an older client that cannot tell us) */
function peerReady(){const p=K.peer;if(!p)return (Date.now()-(K.onSince||0))>10e3;return p.pending||p.v!==BUILD}
function coopTick(){if(!coopOn()){/* in the lobby / waiting room: never; once she leaves the room the title path above takes over */return}
 const s=G();if(!s||s.dead)return;const W=window.COOPW||{};
 const older=K.peer&&K.peer.v!==BUILD;   /* we differ and this side found a newer build: this side is the older one */
 if((older||K.goNow)&&!hardBusy()){coopGo(older?"older":"together");return}
 if(bk()!==K.k0&&khac()===0&&!busy()&&!W.pend&&!W.bend&&W.sent!==(coop().state.week||0)&&peerReady()){if(++K.calm>=2)coopGo("buoi");return}K.calm=0}
function coopGo(why){const W=window.COOPW;const o=W&&W.snap&&W.snap();if(!o){K.goNow=false;return}
 say("going");line(CTM_WAIT.newTogether,0);reopen(why,{coop:true,room:o.room,seat:o.seat,snap:o})}
function onAct(m){if(!m||m.k!=="ctm-upd")return;const c=coop();if(!c||m.from===c.state.you)return;
 K.peer={v:m.v,pending:!!m.pending,at:Date.now()};
 const diff=m.v!==BUILD;hold(diff);
 if(diff||m.mode==="have"||m.mode==="ask"||m.mode==="go")check(true);
 if(m.mode==="ver"&&!diff&&K.pending)say("have");
 if(m.mode==="ask")peerCard();
 if(m.mode==="go"){K.goNow=true;line("Bạn chơi cùng muốn mở bản mới ngay",3500)}
 if(m.mode==="later"){K.asked=false;line("Bạn để sau · hai người cùng mở bản mới ở buổi sau",4000)}
 if(m.mode==="going")line("Bạn chơi cùng đang mở bản mới, sắp trở lại",6000);
 if(diff&&!K.pending)line("Hai người đang ở hai bản khác nhau · đợi cùng một bản",6000);
 tick()}
function hookCoop(){const c=coop();if(!c||!c.on||K.hooked)return;K.hooked=true;
 c.on("act",onAct);
 c.on("start",()=>{K.onSince=Date.now();setTimeout(()=>{resumeCoop();say("ver")},0)});
 c.on("peer",on=>{if(on){K.onSince=Date.now();say("ver")}});
 c.on("stop",()=>{K.peer=null;K.goNow=false;hold(false);tick()})}

/* ---------- kit pieces: chip on the top bar, the card, the one-line notice ---------- */
function css(){if($i("kit-upd"))return;const st=document.createElement("style");st.id="kit-upd";st.textContent=`
.kupd{position:fixed;left:50%;bottom:calc(env(safe-area-inset-bottom,0px) + 74px);transform:translateX(-50%);z-index:9700;width:min(420px,calc(100vw - 24px));animation:kupdIn .3s ease}
.kupd .dlg.kpanel{width:100%;max-width:none;margin:0;box-shadow:0 6px 24px #0006}
.kupd .dlg.kpanel .kpb{padding:8px 14px 2px;min-height:0;flex:none}.kupd .dlg.kpanel .kpnote{margin:0}
.kupd .dlg.kpanel .kpopts{display:flex;justify-content:flex-end;gap:8px;padding:8px 14px 12px;margin:0;min-height:0;position:static}
@media (max-width:599px){.kupd .dlg.kpanel .kpb{padding:6px 10px 2px}.kupd .dlg.kpanel .kpopts{padding:6px 10px 10px}}
@keyframes kupdIn{from{opacity:0;transform:translate(-50%,12px)}}
.kupdline{position:fixed;left:50%;transform:translateX(-50%);z-index:9750;max-width:calc(100vw - 24px);margin:0;padding:5px 14px;border-radius:14px;border:1px solid var(--gold,#b8892b);background:#fffaf0f4;color:var(--ink,#3a2418);font:600 .82rem/1.3 var(--body,inherit);box-shadow:0 4px 14px #0004;text-align:center;pointer-events:none;transition:opacity .5s}
.kupdline.out{opacity:0}`;document.head.appendChild(st)}
/* the status icon (kitStatusIcon "upd", jstatus): shown only while a new build is pending, she is playing and no dialog is open; the rail repaints on every tick */
const showIcon=()=>!!(K.pending&&!K.leaving&&playing()&&!busy());
function place(){K.chip=showIcon();try{if(window.kitStatusIcon)kitStatusIcon.refresh()}catch(e){}}
function chip(){css();try{if(window.kitStatusIcon)kitStatusIcon.set("upd",{title:"Có bản mới",order:20,glyph:"⟳",badge:()=>true,show:showIcon,onTap:()=>card()})}catch(e){}place()}
K.showChip=()=>{K.pending=true;chip()};/* test hook (dev/test/brand-seal.js): the chip alone, no card */
function close(){if(K.cardEl){K.cardEl.remove();K.cardEl=null}place()}
function mkCard(sub,note,btns){css();close();if(typeof kpHeader!=="function")return null;
 const el=document.createElement("div");el.className="kupd";el.id="kupd";
 el.innerHTML=`<div class="dlg kpanel" data-kind="notice" role="dialog" aria-modal="false">${kpHeader("notice","Có bản mới",sub)}<div class="kpb"><div class="kpnote">${note}</div></div><div class="kpopts">${btns.map((b,i)=>`<button class="kbtn${b.alt?" alt":""}" data-kupd="${i}">${b.n}</button>`).join("")}</div></div>`;
 const s=el.querySelector(".kpseal");if(s)s.remove();
 el.addEventListener("click",e=>{const b=e.target.closest("[data-kupd]");if(!b)return;e.stopPropagation();try{if(typeof sfx==="function")sfx("sfx-tap")}catch(x){}const f=btns[+b.dataset.kupd];close();f.go()});
 document.body.appendChild(el);K.cardEl=el;
 let top=innerHeight;document.querySelectorAll("#tabs,.kloadchip").forEach(e=>{const q=e.getBoundingClientRect();if(q.height&&q.top>innerHeight*.5)top=Math.min(top,q.top)});
 el.style.bottom=Math.max(12,Math.round(innerHeight-top+10))+"px";
 const f=el.querySelector(".kbtn:not(.alt)");if(f)f.focus({preventScroll:true});return el}
/* the chip's card: open now (the sổ is written, the page comes back at the same place) or later (next natural break) */
function card(){if(!K.pending)return;
 if(coopOn()){
  if(!K.peer&&(Date.now()-(K.onSince||0))>10e3){mkCard("Mở bản mới ngay?","Hai người cùng mở bản mới, vào lại đúng phòng, đúng chỗ. Để sau thì bản mới tự mở khi hai người sang buổi.",
    [{n:"Để sau",alt:1,go(){}},{n:"Mở bản mới",go(){coopGo("tap")}}]);return}
  mkCard("Mở bản mới ngay?","Bạn chơi cùng sẽ được hỏi. Hai người cùng mở bản mới, vào lại đúng phòng, đúng chỗ. Để sau thì bản mới tự mở khi hai người sang buổi.",
   [{n:"Để sau",alt:1,go(){}},{n:"Mở bản mới",go(){K.asked=true;say("ask");line("Đã hỏi bạn chơi cùng",3500)}}]);return}
 mkCard("Mở bản mới ngay?","Sổ đang chơi giữ nguyên, mở lại đúng chỗ. Để sau thì bản mới tự mở khi ngươi sang buổi.",
  [{n:"Để sau",alt:1,go(){}},{n:"Mở bản mới",go(){reopen("tap")}}])}
/* the friend asked to open the new build now */
function peerCard(){mkCard("Bạn muốn mở bản mới ngay","Hai người cùng mở bản mới, vào lại đúng phòng, đúng chỗ. Sổ đang chơi giữ nguyên.",
 [{n:"Để sau",alt:1,go(){say("later")}},{n:"Cùng mở",go(){say("go");K.goNow=true;if(!K.pending)check(true);tick()}}])}
K.card=()=>card();
let lineT=0;
K.lines=[];
function line(text,ms){css();K.lines.push([text,Date.now()]);if(typeof window.kitLine==="function"){window.kitLine(text,ms);return} /* KIT §42.2: one-line notices sit above the bottom bar, never on the scene title (owner 15/11 16:40Z) */
 let el=$i("kupdline");if(!el){el=document.createElement("div");el.id="kupdline";el.className="kupdline";el.setAttribute("role","status");document.body.appendChild(el)}
 el.textContent=text;el.classList.remove("out");const hud=document.querySelector("header.hud");const hb=hud&&vis(hud)?hud.getBoundingClientRect().bottom:0;
 el.style.top=Math.round(Math.max(10,hb+8))+"px";clearTimeout(lineT);if(ms)lineT=setTimeout(()=>{el.classList.add("out");setTimeout(()=>{if(el.classList.contains("out"))el.remove()},600)},ms)}
K.line=line;

/* ---------- after the reload: back into the same sổ / the same room ---------- */
let rec=null;try{rec=JSON.parse(LS.get(LSK)||"null")}catch(e){}
if(rec&&!(Date.now()-rec.at<180e3))rec=null;
if(!rec)LS.del(LSK);
/* the title (or the co-op lobby on it) is up and the first-entry loading is over */
const ready=()=>typeof loadSlot==="function"&&!loading()&&titleUp()&&!!document.querySelector("#modal.kpthome .kpmenu");
function waitFor(f,ms,then,fail){const t0=Date.now();(function step(){let v=false;try{v=f()}catch(e){}if(v){then();return}if(Date.now()-t0>ms){if(fail)fail();return}setTimeout(step,300)})()}
function resumeSolo(){K.resuming=true;
 waitFor(ready,180e3,()=>{let ok=false;try{const d=loadSlot(rec.slot);if(d){SLOT=rec.slot;
   const b=document.querySelector('#modal.kpthome [data-tgo="cont"]');if(b)b.click();
   else{const l=$i("slots")&&$i("slots").querySelector(`[data-load="${rec.slot}"]`);if(l)l.click()}
   ok=!!G()&&!titleUp()}}catch(e){console.error(e)}
  LS.del(LSK);K.resuming=false;K.resumed={ok,t:Date.now(),why:rec.why,slot:rec.slot,k:bk(),u:khac(),was:rec.k,wasU:rec.u};
  if(ok)line(CTM_WAIT.newOpened,4500);tick()},()=>{LS.del(LSK);K.resuming=false})}
/* co-op: the lobby's own "Trở lại phòng" (same code, same seat); COOP "start" → jcoopworld begin → resumeCoop puts the week back */
function resumeCoop(){if(!rec||!rec.coop||!window.COOPW||!COOPW.restore)return;const r=rec;rec=null;LS.del(LSK);
 let ok=false;try{ok=COOPW.restore(r.snap)}catch(e){console.error(e)}
 K.resuming=false;K.resumed={ok,coop:true,why:r.why,room:coop().state.room,seat:COOPW.seat,k:bk(),u:khac(),was:r.snap.buoi};
 line(ok?CTM_WAIT.newOpened:CTM_WAIT.newOpenedRoom,4500);tick()}
function rejoin(){K.resuming=true;line(CTM_WAIT.newTogether,0);
 waitFor(()=>ready()&&coop()&&document.querySelector('#modal.kpthome [data-coop="co"]'),180e3,()=>{LS.set("ctm-coop-room",rec.room);
  document.querySelector('#modal.kpthome [data-coop="co"]').click();
  waitFor(()=>document.querySelector('#modal [data-coop="resume"]'),10e3,()=>document.querySelector('#modal [data-coop="resume"]').click(),()=>{K.resuming=false})},
  ()=>{K.resuming=false;LS.del(LSK)});
 /* nobody came back within 3 minutes: leave her in the lobby, which already offers "Trở lại phòng" */
 setTimeout(()=>{if(rec&&rec.coop){rec=null;LS.del(LSK);K.resuming=false;line("Chưa vào lại được phòng · chạm Trở lại phòng",5000)}},180e3)}
function boot(){hookCoop();if(!rec)return;if(rec.coop)rejoin();else resumeSolo()}
if(document.readyState==="loading")addEventListener("DOMContentLoaded",boot);else setTimeout(boot,0);
})();
