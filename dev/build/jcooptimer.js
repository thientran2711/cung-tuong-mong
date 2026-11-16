/* ================= jcooptimer: CO-OP BUỔI CLOCK (owner 15/11 ~21:25Z + ~22:55Z, review/coop-timer) — KIT §69 =================
   Co-op only (COOPW.on); single-player never starts the tick. Rules (coordinator, dev/OWNER_DECISIONS.md 15/11 ~21:25Z / ~22:55Z):
   - One shared clock per room buổi (key "week:buổi" of the ROOM, CW.rweek/rbuoi), BAL.coopTm.buoiMs long = the most a buổi lasts.
   - "Sẵn sàng" (#next in co-op) = she ended her buổi (bend; at tối the night + week end). The friend sees "Hảo hữu đã sẵn sàng" (chip + kitLine).
     Both ready → the room steps at once (server `buoi` / week merge), the clock does not matter.
   - LAG-SAFE, host-authoritative: seat a owns an ABSOLUTE deadline `dl` in host time (Date.now of seat a; the Worker has no clock message,
     so host time stands in for server time). The guest keeps a clock offset to host time from ping pairs over the room relay
     ({mode:"tp",t0} → {mode:"tq",t0,th}; offset = th + rtt/2 − now, the sample with the smallest rtt of the last 8 wins), and shows
     dl − (now + offset): both screens agree to about the ping jitter, whatever the latency. Stops / starts go out at once as
     {mode:"clk",key,dl|rem,run,up,pz,hold,cap} (rem = ms left while stopped); a clk is also re-sent every BAL.coopTm.syncMs.
     Time out = dl passed + BAL.coopTm.graceMs (the screens show "Hết buổi" at 0, the step comes after the grace).
     Messages ride the room's act relay ({t:"act",k:"ctm-tm",…}, like swreg's ctm-upd: no Worker change; older clients ignore them).
   - Both players send {mode:"st",key,pz,rd,lf} (paused / ready / choosing a thân phận) on change, on ask, and every 10 s.
   - Pauses: (a) a player in a mini game (S.mg / #ov; owner 23:20Z: ONLY mini games, not dialogs or animations) stops the clock for
     both, at most BAL.coopTm.pauseCapMs per buổi; the friend
     only sees "Hảo hữu đang dở tay, xin đợi" (never what she is doing). (b) "Tạm dừng" (chip button) stops the game for both until the one
     who paused presses "Tiếp tục" ({mode:"hold",on}; kit panel over both screens, no budget). (c) room frozen (a player away, two builds),
     a player choosing her thân phận (Luân hồi, death screen, title): stopped, no budget.
   - Time out: each client ends its own buổi — sáng..chiều: COOPW.forceBend() (even under an open dialog / mini game: the room steps for
     the friend now, her step waits for the dialog through CW.pendBuoi, so no choice is cut and nothing runs twice); tối: the host commits the
     night for both (COOPW.forceNight, jcoopworld night gate); each seat runs it (→ endTurn → end) once she has no dialog / mini game open. While her buổi is overdue, a dialog with no choice (only ✕ /
     Đã rõ) or with one single road is read for her after BAL.coopTm.readMs; a real choice is never made for her.
   - Reconnect / refresh: the host appends its clock to its `pos` ({tm:{key,dl,rem,run,up,cap,hold,pz}}), re-sent on every stop/start, so
     the room snapshot (`room`.pos.a.tm) brings it back to either seat; the host also keeps "ctm-coop-tm" in localStorage (last second
     before it left: the time it was away does not count). The guest asks (mode "ask") and gets a clk at once.
   UI: kitCoopClock(o) (KIT §69) = kit chips over #next (#kctm) + the chip button "Tạm dừng"; kitCoopHold = the kit panel while held;
   kitLine for the events. */
(function(){try{
if(typeof COOP!=="object"||!window.COOPW)return;
const CW=window.COOPW;
const TB=()=>Object.assign({buoiMs:300000,lens:[3,5,8],pauseCapMs:60000,readMs:8000,syncMs:4000,graceMs:1500},(typeof BAL==="object"&&BAL&&BAL.coopTm)||{});
const LSK="ctm-coop-tm";
const pnow=()=>(typeof performance!=="undefined"&&performance.now)?performance.now():Date.now();
const host=()=>CW.seat==="a";
const other=()=>CW.seat==="a"?"b":"a";
const esc=s=>String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/"/g,"&quot;");
const LAST=()=>typeof B4L==="number"?B4L:2;
const wkN=()=>COOP.state.week||0;
const live=()=>CW.on&&typeof S!=="undefined"&&!!S;
function roomKey(){const w=wkN();const b=(CW.rweek===w&&typeof CW.rbuoi==="number")?CW.rbuoi:((typeof S!=="undefined"&&S&&S.buoi)||0);return w+":"+b}
function myKey(){return wkN()+":"+((typeof S!=="undefined"&&S&&S.buoi)||0)}
const frozenRoom=()=>!CW.on||!CW.base||(CW.isFrozen?CW.isFrozen():!!COOP.frozen);
function say(mode,o){try{COOP.send(Object.assign({t:"act",k:"ctm-tm",mode},o||{}))}catch(e){}}
/* ---------- host time ---------- */
let OFF=0,offS=[];                                 /* guest: host time − my time */
const hnow=()=>Date.now()+(host()?0:OFF);
let pingN=0;function ping(){if(host()||!CW.on)return;say("tp",{t0:Date.now(),n:++pingN})}
function onTq(m){const t1=Date.now(),rtt=t1-(+m.t0||t1);if(rtt<0||rtt>20000)return;offS.push([rtt,(+m.th||0)+rtt/2-t1]);if(offS.length>8)offS.shift();
 OFF=offS.slice().sort((a,b)=>a[0]-b[0])[0][1]}
/* ---------- my status ---------- */
/* owner 23:20Z: the clock stops ONLY while a player is in a mini game (S.mg / the mini game overlay #ov), under the cap — not for
   dialogs, rewards, gifts, edicts, night moments */
function inMg(){try{if(S&&S.mg)return true;const o=document.getElementById("ov");if(o){const r=o.getBoundingClientRect();if(r.width&&r.height&&!o.hidden&&getComputedStyle(o).display!=="none")return true}}catch(e){}return false}
function myPz(){if(!live())return false;return inMg()}
/* buổi length: the host's pick in the lobby (3 / 5 / 8 phút, localStorage "ctm-coop-len"), else BAL.coopTm.buoiMs */
const LENK="ctm-coop-len";
function lenPick(){try{const n=+localStorage.getItem(LENK);return TB().lens.includes(n)?n:0}catch(e){return 0}}
function lenMs(){const n=lenPick();return n?n*60000:TB().buoiMs}
/* choosing a thân phận (first life / rebirth: Luân hồi), a death screen, the title: the clock stands still, no pause budget spent */
function myLife(){if(!CW.on)return false;if(typeof S==="undefined"||!S||S.dead||CW.inLife)return true;const T=$("title");return !!(T&&!T.hidden)||!!document.getElementById("kroul")}
function myRd(){if(!live()||S.dead)return false;if(myKey()!==roomKey())return false;return !!(CW.bend||CW.pend||CW.sent===wkN()||(CW.nReady&&CW.nReady()))}
const ST={key:"",pz:false,rd:false,lf:false,bz:false,kh:0,at:0};
const FS={key:"",pz:false,rd:false,lf:false,bz:false,kh:0};
/* busy (owner 16/11 friend chip "! Đang bận"): a dialog / event / mini game is open on her screen — the friend only ever sees "đang bận" */
function myBz(){if(!live())return false;try{if(S.mg||Q.length)return true;const M=$("modal");if(M&&!M.hidden)return true;return inMg()}catch(e){return false}}
const myKh=()=>{try{return Math.max(0,4-(+used||0))}catch(e){return 0}};
let bended={a:false,b:false},bkeyB="";
function sendSt(force){const k=roomKey(),pz=myPz(),rd=myRd(),lf=myLife(),bz=myBz(),kh=myKh(),t=pnow();if(!force&&ST.key===k&&ST.pz===pz&&ST.rd===rd&&ST.lf===lf&&ST.bz===bz&&ST.kh===kh&&t-ST.at<10000)return;
 ST.key=k;ST.pz=pz;ST.rd=rd;ST.lf=lf;ST.bz=bz;ST.kh=kh;ST.at=t;say("st",{key:k,pz,rd,lf,bz,kh})}
function frReady(){const k=roomKey(),o=other();if(bkeyB===k&&bended[o])return true;if(FS.key===k&&FS.rd)return true;
 const e=COOP.state.ended||{};const b=+k.split(":")[1];return b>=LAST()&&!!e[o]}
/* ---------- the clock: host ---------- */
let K=null;      /* host: {key, dl (host ms, while running) | rem (ms, while stopped), run, up, cap, pz, hold:"" | seat} */
let lastSync=0,lastSave=0,lastT=0,HOLD="";       /* HOLD: who holds the game ("a" / "b" / "") as this client knows it */
const kLeft=()=>!K?0:K.run?Math.max(0,K.dl-hnow()):Math.max(0,K.rem);
function tmSnap(){return K?{len:K.len,key:K.key,dl:K.run?K.dl:0,rem:Math.round(kLeft()),run:!!K.run,up:!!K.up,cap:Math.round(K.cap),hold:K.hold||"",pz:!!K.pz}:null}
function lsGet(){try{return JSON.parse(localStorage.getItem(LSK)||"null")}catch(e){return null}}
function lsPut(){if(!K)return;try{localStorage.setItem(LSK,JSON.stringify(Object.assign({room:COOP.state.room},tmSnap())))}catch(e){}}
let snapTm=null;   /* the clock the room snapshot carried (pos.a.tm) */
function newClock(k){const t=TB(),L=lsGet(),R=snapTm;
 /* own last second (refresh on this device) first: the time the host was away is not counted; else the room snapshot */
 const src=(L&&L.room===COOP.state.room&&L.key===k)?L:(R&&R.key===k)?R:null;
 if(src)K={key:k,rem:Math.max(0,src.run&&src.dl&&src!==L?src.dl-hnow():+src.rem||0),run:false,up:!!src.up,cap:Math.max(0,+src.cap||0),hold:src.hold||"",pz:false};
 else K={key:k,rem:lenMs(),run:false,up:false,cap:t.pauseCapMs,hold:"",pz:false};
 K.len=src&&+src.len||lenMs();K.t0=Date.now();
 HOLD=K.hold;sendClk(true)}
let lastPos=null;
function sendClk(snap){if(!K)return;lastSync=pnow();say("clk",tmSnap());if(snap&&lastPos)try{S0(Object.assign({},lastPos,{tm:tmSnap()}))}catch(e){}}
function setRun(on){if(!K||K.run===on)return false;if(on){K.dl=hnow()+Math.max(0,K.rem);K.run=true}else{K.rem=Math.max(0,K.dl-hnow());K.run=false}return true}
/* real buổi lengths (wall time from the clock's start to the room's step), for the logs (CW.tm.lens) */
const LOGL=[];
function hostTick(dt){const k=roomKey();if(!K||K.key!==k){if(K&&K.t0)LOGL.push({key:K.key,ms:Date.now()-K.t0,up:!!K.up});newClock(k)}
 const was=[K.run,K.pz,K.hold,K.up].join();
 const stopFree=frozenRoom()||K.up||!!K.hold||myLife()||(FS.key===k&&FS.lf);
 const pz=!stopFree&&(myPz()||(FS.key===k&&FS.pz))&&K.cap>0;
 if(pz)K.cap=Math.max(0,K.cap-dt);K.pz=pz;
 setRun(!stopFree&&!pz);
 if(K.run&&hnow()>=K.dl+TB().graceMs){setRun(false);K.rem=0;K.up=true}
 /* review/coop-night-sync: a clock restored already run out (host reload / rejoin: localStorage or the room snapshot) never passed the
    run→up edge below, so timeUp never fired: "Còn 0:00" stood still and the buổi never advanced. The time-up is a state, not an edge. */
 if(K.up&&due!==k)timeUp(k);
 const now=[K.run,K.pz,K.hold,K.up].join(),t=pnow();
 if(now!==was){sendClk(true);if(K.up)timeUp(k)}else if(t-lastSync>TB().syncMs)sendClk(false);
 if(t-lastSave>1000){lastSave=t;lsPut()}}
/* ---------- the clock as this client sees it ---------- */
let G=null;      /* guest: last clk */
function view(){const k=roomKey();
 if(host()){if(!K||K.key!==k)return null;return {key:k,len:K.len,left:kLeft(),cap:K.cap,run:K.run,up:K.up,pz:K.pz,hold:K.hold||""}}
 if(!G||G.key!==k)return null;const left=G.run&&!frozenRoom()?Math.max(0,G.dl-hnow()):Math.max(0,G.rem);
 return {key:k,len:G.len,left,cap:G.cap,run:G.run,up:G.up,pz:G.pz,hold:G.hold||""}}
function onClk(m){if(host())return;G={len:+m.len||0,key:m.key,dl:+m.dl||0,rem:+m.rem||0,run:!!m.run,up:!!m.up,pz:!!m.pz,hold:m.hold||"",cap:+m.cap||0};
 setHold(G.hold);if(m.up)timeUp(m.key)}
/* ---------- Tạm dừng: the game stands still for both until the one who paused goes on ---------- */
function hold(on){if(!CW.on)return;const by=on?CW.seat:"";if(host()){if(K){K.hold=by;hostTick(0)}}else{say("hold",{on:!!on,by:CW.seat});if(G)G.hold=by}setHold(by)}
let HP=null;
function setHold(by){by=by||"";if(by===HOLD&&(!!HP===!!by))return;HOLD=by;
 if(!by){if(HP){HP.remove();HP=null;try{kitLine("Cuộc chơi tiếp tục",2500)}catch(e){}}return}
 if(!HP){HP=document.createElement("div");HP.id="kctmh";HP.className="modal kpscene";HP.setAttribute("role","alertdialog");document.body.appendChild(HP)}
 HP.innerHTML=kitCoopHold(by===CW.seat);const s=HP.querySelector(".kpseal");if(s)s.remove()}
document.addEventListener("click",e=>{const b=e.target.closest("[data-ctm]");if(!b)return;e.stopPropagation();try{if(typeof sfx==="function")sfx("sfx-tap")}catch(x){}
 if(b.dataset.ctm==="hold"){try{frPanel(false)}catch(x){}hold(true)}else if(b.dataset.ctm==="go")hold(false);else if(b.dataset.ctm==="fr")frPanel(true);else if(b.dataset.ctm==="frx")frPanel(false);
 else if(b.dataset.ctm==="len"){try{localStorage.setItem(LENK,String(+b.dataset.n))}catch(x){}const r=b.closest(".kctmlen");if(r)r.outerHTML=kitCoopLenRow()}},true);
/* ---------- time up: end her buổi (carried through any open dialog) ---------- */
let due="",AR={m:null,t:0};
function timeUp(k){if(due===k)return;due=k;try{if(live()&&!S.dead&&myKey()===k){
  const b=S.buoi||0,open=Q.length||S.mg;
  kitLine(b>=LAST()?(open?"Hết buổi tối: xem xong là sang ngày mới":"Hết buổi tối: sang ngày mới"):(open?"Hết buổi: xem xong là sang buổi":"Hết buổi: sang buổi cho cả hai"),3500)}}catch(e){}
 dueTick()}
function overdue(){return live()&&!S.dead&&(due===myKey()||!!CW.pendBuoi)}
function dueTick(){if(!live()||S.dead||CW.inLife||!due||HOLD)return;
 if(due===myKey()&&myKey()===roomKey()){const b=S.buoi||0;
  if(b<LAST()){if(!CW.bend)CW.forceBend()}
  else if(!CW.pend&&CW.sent!==wkN()){/* tối: the host commits the night for both (jcoopworld night gate); each seat runs it once her dialog is closed */
   if(CW.forceNight)try{CW.forceNight()}catch(e){console.error(e)}
   if(!Q.length&&!S.mg&&!frozenRoom()){try{nextBuoi()}catch(e){console.error(e)}}}}
 if(overdue())autoRead()}
/* a dialog with no choice, or with one single road, is read for her once her buổi is overdue (never a real choice) */
function autoRead(){const M=$("modal");if(!Q.length||!M||M.hidden){AR.m=null;return}const m=Q[0];
 if(m.act||/kptitle|kcoop/.test(m.cls||""))return;
 if(AR.m!==m){AR.m=m;AR.t=pnow();return}if(pnow()-AR.t<TB().readMs)return;
 if(!m.opts||!m.opts.length){AR.m=null;closeModal();return}
 const ci=typeof kitCancelIx==="function"?kitCancelIx(m):-1;
 if(m.opts.length===1&&ci<0){const c=m.opts[0];if(c&&!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0)){AR.m=null;chooseM(0)}}}
/* ---------- messages ---------- */
COOP.on("act",m=>{if(!m||m.k!=="ctm-tm"||!CW.on||m.from===CW.seat)return;
 if(m.mode==="clk")onClk(m);
 else if(m.mode==="tp"){if(host())say("tq",{t0:m.t0,n:m.n,th:Date.now()})}
 else if(m.mode==="tq"){if(!host())onTq(m)}
 else if(m.mode==="st"){const was=FS.key===m.key&&FS.rd;FS.key=m.key;FS.pz=!!m.pz;FS.rd=!!m.rd;FS.lf=!!m.lf;FS.bz=!!m.bz;FS.kh=+m.kh||0;FS.at=pnow();if(m.rd&&!was&&m.key===roomKey()&&!myRd())note();if(host())hostTick(0)}
 else if(m.mode==="hold"){if(host()&&K){if(m.on)K.hold=m.by||other();else if(K.hold===(m.by||other()))K.hold="";setHold(K.hold);hostTick(0)}}
 else if(m.mode==="ask"){sendSt(true);if(host()&&K)sendClk(false)}});
const bv=m=>{if(m&&m.bended){bended={a:!!m.bended.a,b:!!m.bended.b};bkeyB=(m.week!=null?m.week:wkN())+":"+(m.buoi||0)}};
COOP.on("bended",m=>{const o=other(),was=bkeyB===((m.week!=null?m.week:wkN())+":"+(m.buoi||0))&&bended[o];bv(m);if(CW.on&&bended[o]&&!was&&!myRd())note()});
COOP.on("presence",bv);COOP.on("buoi",bv);
COOP.on("room",m=>{bv(m);try{const t=m&&m.pos&&m.pos.a&&m.pos.a.tm;if(t&&t.key){snapTm=t;
  if(!host()&&(!G||G.key!==t.key))onClk(Object.assign({},t))}}catch(e){}setTimeout(hello,300)});
COOP.on("pos",m=>{try{if(!host()&&m&&m.from==="a"&&m.tm&&m.tm.key)snapTm=m.tm}catch(e){}});
let noteKey="";function note(){const k=roomKey();if(noteKey===k)return;noteKey=k;try{kitLine("Hảo hữu đã sẵn sàng",3000)}catch(e){}paint(true)}
/* host: every pos it sends carries its clock (the room keeps the last pos of each seat and hands it back on reconnect) */
const S0=COOP.send;COOP.send=function(t,f){try{const o=typeof t==="string"?Object.assign({t},f||{}):t;
 if(o&&o.t==="pos"&&CW.on&&host()){lastPos=Object.assign({},o);delete lastPos.tm;if(K)return S0.call(COOP,Object.assign({},lastPos,{tm:tmSnap()}))}}catch(e){}return S0.apply(COOP,arguments)};
/* reconnect / refresh: ask the other side, show my state, sync the clock offset */
function hello(){if(!CW.on)return;ST.at=0;sendSt(true);say("ask",{key:roomKey()});if(host()&&K)sendClk(false);if(!host()){offS=[];ping();setTimeout(ping,400);setTimeout(ping,900)}}
COOP.on("peer",on=>{if(on)setTimeout(hello,300)});COOP.on("start",()=>{go();setTimeout(hello,600)});
COOP.on("stop",()=>{stop()});
/* ---------- kit part §69: kitCoopClock, kitCoopHold ---------- */
function fmtT(ms){const s=Math.max(0,Math.ceil(ms/1000)),m=Math.floor(s/60),r=s%60;return m?(r?`${m} phút ${r} giây`:`${m} phút`):`${r} giây`}
function css(){if(document.getElementById("kctm-css"))return;const st=document.createElement("style");st.id="kctm-css";st.textContent=`
.kctm{display:inline-flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:4px}
.kctm .kchip{margin:0;align-items:center;font-weight:600;white-space:nowrap}
.kctm .kctm-r{flex:0 0 auto;width:12px;height:12px;border-radius:50%;background:conic-gradient(currentColor calc(var(--p,1)*360deg),#0000 0);box-shadow:inset 0 0 0 1.5px currentColor;opacity:.85}
.kctm .kchip.w .kctm-r{background:none}
.kctmlen .kctm{justify-content:flex-start}
.kctm button.kchip{font:inherit;font-size:.76rem;font-weight:600;cursor:pointer;min-height:26px;pointer-events:auto;border-color:var(--gold,#b8892b)}
#kctm{position:fixed;z-index:24;right:8px;pointer-events:none;max-width:min(400px,calc(100vw - 16px))}
#kctm[hidden]{display:none}
#kctm .kchip{background:#fffaf0f2;box-shadow:0 2px 8px #0002}
#kctmh,#kctmp{z-index:9400}
#kctmp .dlg #kctmpb{padding:8px 12px 2px}#kctmp .dlg #kctmpb .kpnote{margin:6px 0 0}
#kctmp .dlg #kctmpr{padding:4px 14px 12px;margin:0;display:flex;justify-content:flex-end;gap:8px}
.kctmf{display:inline-flex;align-items:center;flex-wrap:nowrap;gap:5px;margin:0;padding:2px 6px 2px 2px;border:1px solid var(--gold,#b8892b);border-radius:16px;background:#fffaf0f2;box-shadow:0 2px 8px #0002;font:inherit;color:var(--ink,#3a2418);cursor:pointer;min-height:24px;max-width:100%;line-height:1.2}
.kctmf .kctmf-f{flex:0 0 auto;display:inline-flex;width:20px;height:20px;border-radius:50%;overflow:hidden}
.kctmf .kctmf-f>*{width:20px!important;height:20px!important;min-width:0!important;margin:0!important}
.kctmf .kctmf-n{font-size:.74rem;font-weight:600;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:9em}
.kctmf .kchip{margin:0;white-space:nowrap;font-size:.7rem;padding-top:0;padding-bottom:0}
#kctmf{position:fixed;z-index:24;max-width:calc(100vw - 16px)}
header.hud.kctm-pad{padding-bottom:calc(var(--kctm-pb,6px) + 28px)!important}
#kctmf[hidden]{display:none}
.kctmf .kctmf-sh{display:none}
/* kv3:.kv1 */:where(.kv1) .kctmf .kctmf-n{max-width:9em}:where(.kv1) .kctmf .kctmf-s{font-size:.68rem}
#kctmh .dlg #kctmhb{padding:8px 12px 2px}
#kctmh .dlg #kctmhr{padding:4px 14px 12px;margin:0;display:flex;justify-content:flex-end;gap:8px}`;document.head.appendChild(st)}
/* o = {left ms, len ms, state "run"|"pz"|"up"|"stop", fr "ready"|"busy"|"", btn bool}; one row of kit chips, right aligned */
function kitCoopClock(o){css();o=o||{};const p=Math.max(0,Math.min(1,(o.left||0)/(o.len||1)));const ring=`<i class="kctm-r" style="--p:${p.toFixed(3)}"></i>`;
 const L=[];
 if(o.state==="up")L.push(`<span class="kchip r">${ring}Hết buổi</span>`);
 else if(o.state==="pz")L.push(`<span class="kchip w">${ring}Đợi · còn ${fmtT(o.left)}</span>`);
 else if(o.state==="stop")L.push(`<span class="kchip n">${ring}Còn ${fmtT(o.left)}</span>`);
 else L.push(`<span class="kchip ${(o.left||0)<=20000?"r":"n"}">${ring}Còn ${fmtT(o.left)}</span>`);
 /* the friend's status, always shown (owner 16/11: "không biết hảo hữu đang tới đâu hay sẵn sàng chưa"): name + one word */
 const nm=o.name?esc(String(o.name).slice(0,16))+" ":"";
 if(o.fr||o.me){if(o.fr==="ready")L.push(kitChip(`${nm||"Hảo hữu "}đã sẵn sàng`,"ok"));
 else if(o.fr==="busy")L.push(kitChip(o.me?"Hảo hữu đang dở tay, xin đợi":`${nm||"Hảo hữu "}đang dở tay`,"w"));
 else if(o.fr==="hold")L.push(kitChip(`${nm||"Hảo hữu "}xin tạm dừng`,"w"));
 else if(o.fr==="away")L.push(kitChip(`${nm||"Hảo hữu "}đang vắng`,"r"));
 else L.push(kitChip(o.me?"Hảo hữu đang dở tay, xin đợi":`${nm||"Hảo hữu "}đang hành sự`,o.me?"w":"n"));}
 /* she is ready, the friend not yet: what she can still do meanwhile */
 if(o.me&&o.fr!=="ready")L.push(kitChip("Trong lúc đợi: xem các tab, Tư trang, Sổ ghi","n"));
 if(o.btn)L.push(`<button type="button" class="kchip n" data-ctm="hold" aria-label="Tạm dừng cuộc chơi cho cả hai">Tạm dừng</button>`);
 return `<span class="kchips kctm">${L.join("")}</span>`}
/* the panel over both screens while the game is held (kit panel markup, as the freeze panel #coopfz) */
function kitCoopHold(mine){css();const t=mine?["Đang tạm dừng","Hậu cung dừng lại cho cả hai. Ngươi trở lại thì bấm Tiếp tục."]:["Hảo hữu xin tạm dừng","Hảo hữu xin tạm lui chốc lát. Hậu cung dừng lại cho đến khi hảo hữu trở lại."];
 const rows=typeof kitRows==="function"?kitRows([["Hảo hữu",mine?"đang đợi ngươi":"đang tạm lui",mine?"n":"r"],["Đồng hồ buổi","đứng yên","n"]]):"";
 return `<div class="dlg kpanel kpsc" data-kind="notice">${typeof kpHeader==="function"?kpHeader("notice",t[0],t[1]):`<b>${t[0]}</b>`}<div class="body" id="kctmhb">${rows}</div><div class="row" id="kctmhr">${mine?`<button class="kbtn" data-ctm="go">Tiếp tục</button>`:`<button class="kbtn alt" data-cfz="leave">Về màn đầu</button>`}</div></div>`}
/* the host's pick in the lobby (jcooplobby "wait" screen): Mỗi buổi tối đa 3 / 5 / 8 phút, kit chip buttons in one kitRows row */
function kitCoopLenRow(){css();const cur=lenPick()||Math.round(TB().buoiMs/60000);
 const B=TB().lens.map(n=>`<button type="button" class="kchip ${n===cur?"g":"n"}" data-ctm="len" data-n="${n}" aria-pressed="${n===cur}">${n===cur?"✓ ":""}${n} phút</button>`).join("");
 return typeof kitRows==="function"?`<div class="kctmlen">${kitRows([["Mỗi buổi tối đa",`<span class="kchips kctm">${B}</span>`,"t"]])}</div>`:""}
/* §69.2 FRIEND CHIP (owner 16/11: "Đồng hồ count down cho 2 người chơi đâu? Nút sẵn sàng của hảo hữu đâu …", coordinator spec): top of the
   screen, always visible in co-op: her face (grey silhouette until met — stranger rule, kitFaceH) + "Hảo hữu của ta" (her name once known)
   + one status chip + the shared buổi countdown. st: ready ✓ / busy ! / work … / away / hold ⏸. Tap → kitCoopFriendPanel. */
const FST={ready:["g","✓","Đã sẵn sàng"],busy:["w","!","Đang bận"],work:["n","…","Đang làm việc"],away:["r","✕","Đang vắng"],hold:["w","⏸","Tạm dừng"]};
const mmss=ms=>{const s=Math.max(0,Math.ceil((ms||0)/1000));return Math.floor(s/60)+":"+String(s%60).padStart(2,"0")};
function kitCoopFriend(o){css();o=o||{};const s=FST[o.st]||FST.work;
 const clk=o.clock==null?"":o.clock==="up"?`<span class="kchip r kctmf-t">Hết buổi</span>`:`<span class="kchip ${o.clock==="pz"?"w":(o.left||0)<=20000?"r":"n"} kctmf-t">${o.clock==="pz"?"Đợi":"Còn"} ${mmss(o.left)}</span>`;
 return `<button type="button" class="kchips kctmf" data-ctm="fr" aria-label="${esc((o.name||"Hảo hữu của ta")+": "+s[2])}"><span class="kctmf-f">${o.face||""}</span><span class="kctmf-n">${o.name?esc(o.name):`<span class="kctmf-l">Hảo hữu của ta</span><span class="kctmf-sh">Hảo hữu</span>`}</span><span class="kchip ${s[0]} kctmf-s"><b>${s[1]}</b> ${s[2]}</span>${clk}</button>`}
function kitCoopFriendPanel(o){css();o=o||{};const s=FST[o.st]||FST.work;const nm=o.name||"Hảo hữu của ta";
 const fw={ready:o.meRd?"đã sẵn sàng":"đã sang buổi, đang chờ ngươi",busy:"đang bận việc, xin đợi chốc lát",work:`đang làm việc${o.kh?` · còn ${o.kh} khắc`:""}`,
  away:"đang vắng hay mất kết nối · hảo hữu mở lại trò chơi là tự vào lại",hold:"xin tạm dừng chốc lát"}[o.st]||"đang làm việc";
 const rows=[["Hảo hữu",`${s[1]} ${fw}`,s[0]],["Buổi này",o.clock==="up"?"hết buổi":o.clock==null?"—":`còn ${fmtT(o.left)}${o.clock==="pz"?" (đồng hồ đang đợi)":""}`,o.clock==="up"?"r":"n"],
  ["Ngươi",o.meRd?"đã sẵn sàng":`còn ${o.myKh||0} khắc`,o.meRd?"g":"n"]];
 const note=o.meRd&&o.st!=="ready"?"Trong lúc đợi: xem các tab, Tư trang, Sổ ghi. Hảo hữu xong là sang buổi ngay.":
  o.st==="ready"?"Hảo hữu chờ ngươi. Xong việc thì bấm Sẵn sàng (hay hết khắc) là sang buổi cho cả hai.":
  "Cứ làm việc của ngươi. Hết khắc hay bấm Sẵn sàng là xong buổi; cả hai xong thì sang buổi ngay, hết giờ thì tự sang.";
 return `<div class="dlg kpanel kpsc" data-kind="notice">${typeof kpHeader==="function"?kpHeader("notice",nm,"Hảo hữu cùng chơi").replace(/<\/div>$/,(typeof kitXHTML==="function"?kitXHTML('data-ctm="frx"',"Đóng"):"")+"</div>"):`<b>${esc(nm)}</b>`}<div class="body" id="kctmpb">${typeof kitRows==="function"?kitRows(rows):""}<p class="kpnote">${note}</p></div>${o.canHold?`<div class="row" id="kctmpr"><button class="kbtn alt" data-ctm="hold" aria-label="Tạm dừng cuộc chơi cho cả hai">Tạm dừng</button></div>`:""}</div>`}
/* §69.3 kitCoopSteps(o) (owner 16/11 "Rồi sao nữa", review/coop-invite-ux): the 1-2-3 guide of the invite screen as ONE kitRows table.
   o = {sent:bool (she has sent / copied the invite), joined:bool (the friend is in the room), wait:"0:42" (live elapsed, optional), you:"a"|"b"}.
   Row tones: g done (✓) · w now (…) · n next. Row 2's value is `<span class="ef w" data-kcw="t">` so the lobby can tick the time in place. */
function kitCoopSteps(o){o=o||{};const guest=o.you==="b";
 const r1=guest?["1 · Nhận lời mời","✓ đã nhận","g"]:o.sent||o.joined?["1 · Gửi lời mời","✓ đã gửi cho hảo hữu","g"]:["1 · Gửi lời mời","… chạm Gửi đường dẫn bên dưới","w"];
 const r2=o.joined?["2 · Hảo hữu vào phòng","✓ đã vào phòng","g"]:["2 · Hảo hữu vào phòng",`<span class="ef w" data-kcw="t">… đang đợi${o.wait?" · "+o.wait:""}</span>`,"w"];
 const r3=o.joined?["3 · Cùng chơi","… đang vào cuộc","w"]:["3 · Cùng chơi","tự bắt đầu khi hảo hữu vào, không phải chạm gì","n"];
 return kitRows([r1,r2,r3])}
window.kitCoopSteps=kitCoopSteps;
window.kitCoopFriend=kitCoopFriend;window.kitCoopFriendPanel=kitCoopFriendPanel;
window.kitCoopClock=kitCoopClock;window.kitCoopHold=kitCoopHold;window.kitCoopLenRow=kitCoopLenRow;
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§69",title:"kitCoopClock · kitCoopHold · đồng hồ buổi khi chơi cùng hảo hữu",
 html:()=>[{left:102000,len:120000,state:"run",btn:true,name:"Lan"},{left:15000,len:120000,state:"run",fr:"ready",name:"Lan"},{left:64000,len:120000,state:"pz",fr:"busy",name:"Lan"},{left:80000,len:120000,state:"run",me:true,name:"Lan"},{left:50000,len:120000,state:"stop",fr:"away",name:"Lan"},{left:0,len:120000,state:"up"}].map(o=>`<div class="kitpg-row">${kitCoopClock(o)}</div>`).join("")+
  `<div class="kitpg-row" style="position:relative">${kitCoopHold(false)}</div>`+
  ["work","busy","ready","hold","away"].map((st,i)=>`<div class="kitpg-row">${kitCoopFriend({st,name:i%2?"Lan":"",face:"",left:194000-i*40000,clock:i===4?"pz":"run"})}</div>`).join("")+
  [{sent:false},{sent:true,wait:"0:42"},{sent:true,joined:true},{you:"b",joined:true}].map(o=>`<div class="kitpg-row">${kitCoopSteps(o)}</div>`).join("")+
  `<div class="kitpg-row" style="position:relative">${kitCoopFriendPanel({st:"work",name:"",left:194000,clock:"run",kh:2,myKh:1})}</div>`})}catch(e){}
/* ---------- the chip over #next ---------- */
let EL=null,lastH="",waitKey="",FE=null,lastF="",FP=null;
function hideChip(){if(EL&&!EL.hidden)EL.hidden=true;if(FE&&!FE.hidden)FE.hidden=true}
/* the friend's state as one word (FST) */
function frSt(v){if(!COOP.state.peerOnline)return"away";if(frReady())return"ready";const k=v?v.key:roomKey();const h=v?v.hold:HOLD;
 if(h&&h!==CW.seat)return"hold";if(FS.key===k&&(FS.pz||FS.bz||FS.lf))return"busy";return"work"}
function frInfo(){const v=view();const f=typeof CW.friend==="function"?CW.friend():null;let name="",face="";
 try{if(f){const named=typeof k61Named==="function"?k61Named(f):true;if(named)name=f.name||"";face=typeof kitFaceH==="function"?kitFaceH(f,"xs"):""}}catch(e){}
 if(!name){try{const so=(COOP.state.seats||{})[other()];void so}catch(e){}}
 const clock=!v?null:(v.up||(v.run&&v.left<=0))?"up":(v.pz||v.hold||!v.run||frozenRoom())?"pz":"run";
 return {name,face,st:frSt(v),left:v?v.left:0,clock,kh:FS.kh,meRd:myRd(),myKh:myKh(),canHold:!!v&&!v.up&&!frozenRoom()&&!HOLD}}
/* top of the screen, INSIDE the bar (never over the stage or the panel): the first free spot of the bar (scanned top → bottom, right → left,
   checked against every visible leaf of the bar and the seal); when the bar has none (iPad portrait, phones), the bar gets a strip of its own
   (class kctm-pad = padding-bottom) and the chip sits in it at the right. */
const PADH=28;
let PK="",PT=0;
function placeF(){const hud=document.querySelector("header.hud");if(!hud||!FE)return;const H=hud.getBoundingClientRect(),w=FE.offsetWidth,h=FE.offsetHeight;
 const pk=[innerWidth,innerHeight,Math.round(H.top),Math.round(H.bottom),w,h,hud.textContent.length].join(),t0=pnow();if(pk===PK&&t0-PT<3000)return;PK=pk;PT=t0;
 const pad=hud.classList.contains("kctm-pad")?PADH:0,B=H.bottom-pad-2;
 const sl=hud.querySelector(".kseal-hud");const R0=Math.min(innerWidth-6,H.right-4);
 const lv=[...hud.querySelectorAll("*")].filter(e=>!e.children.length&&e.getClientRects().length&&!FE.contains(e)&&getComputedStyle(e).visibility!=="hidden").map(e=>e.getBoundingClientRect()).filter(q=>q.width&&q.height);
 if(sl)lv.push(sl.getBoundingClientRect());
 const free=(x,y)=>x>=H.left+2&&x+w<=R0&&y>=H.top+2&&y+h<=B&&!lv.some(q=>x<q.right+6&&x+w>q.left-6&&y<q.bottom+2&&y+h>q.top-2);
 let at=null;for(let y=H.top+2;y+h<=B&&!at;y+=3)for(let x=R0-w;x>=H.left+2;x-=6)if(free(x,y)){at=[x,y];break}
 if(at){if(pad)hud.classList.remove("kctm-pad")}
 else{if(!pad){hud.classList.add("kctm-pad");try{if(typeof k3Shell==="function")k3Shell()}catch(e){}}const H2=hud.getBoundingClientRect();at=[Math.max(H2.left+4,R0-w),H2.bottom-PADH+(PADH-h)/2-2]}
 FE.style.left=Math.round(at[0])+"px";FE.style.top=Math.round(at[1])+"px"}
function unpad(){const hud=document.querySelector("header.hud.kctm-pad");if(hud)hud.classList.remove("kctm-pad")}
function paintF(){const T=$("title");if(!live()||S.dead||(T&&!T.hidden)||document.getElementById("coopfz")||HP){if(FE&&!FE.hidden)FE.hidden=true;return}
 const o=frInfo();const h=kitCoopFriend(o);
 if(!FE){css();FE=document.createElement("div");FE.id="kctmf";FE.setAttribute("role","status");document.body.appendChild(FE)}
 if(h!==lastF){FE.innerHTML=h;lastF=h}if(FE.hidden)FE.hidden=false;placeF();if(FP)FP.innerHTML=kitCoopFriendPanel(o)}
function frPanel(on){if(!on){if(FP){FP.remove();FP=null}return}if(!FP){FP=document.createElement("div");FP.id="kctmp";FP.className="modal kpscene";FP.setAttribute("role","dialog");document.body.appendChild(FP);
 FP.addEventListener("click",e=>{if(e.target===FP)frPanel(false)})}FP.innerHTML=kitCoopFriendPanel(frInfo());const s=FP.querySelector(".kpseal");if(s)s.remove()}
function paint(force){if(!live()||S.dead){hideChip();return}try{paintF()}catch(e){console.error(e)}const v=view();const M=$("modal"),T=$("title"),nx=$("next");
 if(!v||!nx||!nx.offsetParent||(M&&!M.hidden)||(T&&!T.hidden)||document.getElementById("coopfz")||HP){if(EL&&!EL.hidden)EL.hidden=true;return}
 /* KIT FIRST (owner 16/11 "Nữa, kit chung đâu", review/kit-sweep): no floating clock strip over the tab bar any more — the header friend chip
    (§69.2 kitCoopFriend: status + shared countdown) is the ONE display; the wait words and "Tạm dừng" live in its kit notice (tap the chip). */
 if(EL){EL.remove();EL=null;lastH=""}
 const me=myRd();
 /* she can still press "Sẵn sàng" and her khắc are spent: the kit selected look (.ksel) on the button */
 const go=!me&&!nx.disabled&&typeof used==="number"&&used>=4;if(nx.classList.contains("ksel")!==go)nx.classList.toggle("ksel",go)}
/* #next in co-op = "Sẵn sàng" (the room's lock words "Đợi hảo hữu…" stay as jcoopworld writes them) */
function word(){const n=$("next");if(!n||!CW.on||n.dataset.coopWait)return;if(n.textContent!=="Sẵn sàng")n.textContent="Sẵn sàng"}
(function(){const f=render;render=function(){const r=f.apply(this,arguments);if(CW.on)try{word();sendSt(false)}catch(e){}return r}})();
/* ---------- tick ---------- */
let IV=0,lastPing=0;
function tick(){try{if(!CW.on){stop();return}const t=pnow(),dt=lastT?Math.min(2000,t-lastT):0;lastT=t;
 if(host())hostTick(dt);else{if(t-lastPing>5000){lastPing=t;ping()}if(G&&G.hold!==HOLD)setHold(G.hold);if(G&&G.up&&G.key===roomKey()&&due!==G.key)timeUp(G.key)}
 sendSt(false);dueTick();paint(false)}catch(e){console.error("coop clock",e)}}
function go(){if(IV)return;lastT=0;IV=setInterval(tick,250)}
function stop(){if(IV){clearInterval(IV);IV=0}hideChip();frPanel(false);unpad();K=null;G=null;due="";AR.m=null;setHold("")}
if(CW.on)go();
/* test hooks (dev/test/coop-timer*.js) */
CW.tm={lens:()=>LOGL.slice(),dbg:()=>({lifeW:{S:typeof S!=="undefined"&&!!S,dead:typeof S!=="undefined"&&S&&S.dead,inLife:CW.inLife,title:!!($("title")&&!$("title").hidden),kroul:!!document.getElementById("kroul")},fz:frozenRoom(),K:K&&tmSnap(),life:myLife(),pz:myPz(),FS:Object.assign({},FS),rk:roomKey(),G,HOLD,OFF}),view,roomKey,myKey,due:()=>due,frReady,hold,off:()=>OFF,hnow,reset:()=>{if(host()){try{localStorage.removeItem(LSK)}catch(e){}K=null;snapTm=null;hostTick(0)}},fmtT};
}catch(e){console.error(e)}})();
