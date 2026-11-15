/* ================= jcooptimer: CO-OP BUỔI CLOCK (owner 15/11 ~21:25Z, review/coop-timer) — KIT §69 =================
   Co-op only (COOPW.on); single-player never starts the tick. Rules (coordinator, dev/OWNER_DECISIONS.md 15/11 ~21:25Z):
   - One shared clock per room buổi (key "week:buổi" of the ROOM, CW.rweek/rbuoi), BAL.coopTm.buoiMs long = the most a buổi lasts.
   - "Sẵn sàng" (#next in co-op) = she ended her buổi (bend; at tối the night + week end). The friend sees "Hảo hữu đã sẵn sàng" (chip + kitLine).
     Both ready → the room steps at once (server `buoi` / week merge), the clock does not matter.
   - Host-authoritative: seat a runs the clock and sends {t:"act",k:"ctm-tm",mode:"clk",key,left,cap,run,up} (the room's act relay, like
     swreg's ctm-upd: no Worker change, older clients ignore non-invite acts); the guest shows host time (left counted down locally
     between two clk). Both send {mode:"st",key,pz,rd} (am I paused / ready) on change, on ask, and every 10 s.
   - Pauses: the clock stands still while either player has a dialog open or is in a mini game (Q / S.mg), at most BAL.coopTm.pauseCapMs
     per buổi; then it runs on. While the room is frozen (a player away, two builds) or a player is choosing her thân phận (Luân hồi,
     first life or rebirth; death screen; title) it stands still and that costs no pause budget (st.lf).
   - Time out (host sends up): each client ends its own buổi — sáng..chiều: COOPW.forceBend() (even under an open dialog / mini game: the
     room steps for the friend now, her step waits for the dialog through CW.pendBuoi, so no choice is cut and nothing runs twice);
     tối: nextBuoi() (→ endTurn → end) as soon as she has no dialog / mini game open. While her buổi is overdue, a dialog with no choice
     (only ✕ / Đã rõ) or with one single road is read for her after BAL.coopTm.readMs; a real choice is never made for her.
   - Reconnect / refresh: host keeps its clock in localStorage "ctm-coop-tm" {room,key,left,cap,up} (restored for the same room + key);
     a fresh host clock adopts the guest's copy (mode "have") when that is older; the guest asks (mode "ask") and gets clk at once.
   UI: kitCoopClock(o) (KIT §69) = kit chips over #next (#kctm), hidden while a dialog / the freeze panel is up; kitLine for the events. */
(function(){try{
if(typeof COOP!=="object"||!window.COOPW)return;
const CW=window.COOPW;
const TB=()=>Object.assign({buoiMs:120000,pauseCapMs:60000,readMs:8000,syncMs:4000},(typeof BAL==="object"&&BAL&&BAL.coopTm)||{});
const LSK="ctm-coop-tm";
const pnow=()=>(typeof performance!=="undefined"&&performance.now)?performance.now():Date.now();
const host=()=>CW.seat==="a";
const other=()=>CW.seat==="a"?"b":"a";
const LAST=()=>typeof B4L==="number"?B4L:2;
const wkN=()=>COOP.state.week||0;
const live=()=>CW.on&&typeof S!=="undefined"&&!!S;
function roomKey(){const w=wkN();const b=(CW.rweek===w&&typeof CW.rbuoi==="number")?CW.rbuoi:((typeof S!=="undefined"&&S&&S.buoi)||0);return w+":"+b}
function myKey(){return wkN()+":"+((typeof S!=="undefined"&&S&&S.buoi)||0)}
const frozenRoom=()=>!CW.on||!CW.base||(CW.isFrozen?CW.isFrozen():!!COOP.frozen);
function say(mode,o){try{COOP.send(Object.assign({t:"act",k:"ctm-tm",mode},o||{}))}catch(e){}}
/* ---------- my status ---------- */
function myPz(){if(!live())return false;return !!(Q.length||S.mg)}
/* choosing a thân phận (first life / rebirth: Luân hồi) or a death screen: the room's clock stands still, no pause budget spent */
function myLife(){if(!CW.on)return false;if(typeof S==='undefined'||!S||S.dead||CW.inLife)return true;const T=$("title");return !!(T&&!T.hidden)}
function myRd(){if(!live()||S.dead)return false;if(myKey()!==roomKey())return false;return !!(CW.bend||CW.pend||CW.sent===wkN())}
const ST={key:"",pz:false,rd:false,lf:false,at:0};          /* what I last told the friend */
const FS={key:"",pz:false,rd:false,lf:false};               /* the friend's last status */
let bended={a:false,b:false},bkeyB="";             /* the server's bended view and its key */
function sendSt(force){const k=roomKey(),pz=myPz(),rd=myRd(),lf=myLife(),t=pnow();if(!force&&ST.key===k&&ST.pz===pz&&ST.rd===rd&&ST.lf===lf&&t-ST.at<10000)return;
 ST.key=k;ST.pz=pz;ST.rd=rd;ST.lf=lf;ST.at=t;say("st",{key:k,pz,rd,lf})}
function frReady(){const k=roomKey(),o=other();if(bkeyB===k&&bended[o])return true;if(FS.key===k&&FS.rd)return true;
 const e=COOP.state.ended||{};const b=+k.split(":")[1];return b>=LAST()&&!!e[o]}
/* ---------- the clock: host ---------- */
let K=null;          /* host: {key,left,cap,up,run,fresh,born} */
let lastSync=0,lastSave=0,lastT=0;
function lsGet(){try{return JSON.parse(localStorage.getItem(LSK)||"null")}catch(e){return null}}
function lsPut(){if(!K)return;try{localStorage.setItem(LSK,JSON.stringify({room:COOP.state.room,key:K.key,left:Math.round(K.left),cap:Math.round(K.cap),up:!!K.up}))}catch(e){}}
function newClock(k){const t=TB(),L=lsGet();
 if(L&&L.room===COOP.state.room&&L.key===k&&typeof L.left==="number")K={key:k,left:Math.max(0,L.left),cap:Math.max(0,L.cap||0),up:!!L.up,run:false,fresh:false,born:pnow()};
 else{K={key:k,left:t.buoiMs,cap:t.pauseCapMs,up:false,run:false,fresh:true,born:pnow()};say("ask",{key:k})}
 sendClk()}
function sendClk(){if(!K)return;lastSync=pnow();say("clk",{key:K.key,left:Math.round(K.left),cap:Math.round(K.cap),run:!!K.run,up:!!K.up,pz:!!K.pzNow})}
function hostTick(dt){const k=roomKey();if(!K||K.key!==k)newClock(k);
 const wasRun=K.run,wasPz=K.pzNow;
 if(frozenRoom()||K.up||myLife()||FS.lf){K.run=false;K.pzNow=false}
 else{const pz=(myPz()||(FS.key===k&&FS.pz))&&K.cap>0;K.pzNow=pz;
  if(pz){K.cap=Math.max(0,K.cap-dt);K.run=false}
  else{K.left=Math.max(0,K.left-dt);K.run=true;if(K.left<=0){K.up=true;K.run=false;sendClk();timeUp(k)}}}
 const t=pnow();if(wasRun!==K.run||wasPz!==K.pzNow||t-lastSync>TB().syncMs)sendClk();
 if(t-lastSave>1000){lastSave=t;lsPut()}}
/* ---------- the clock as this client sees it (host: K; guest: the last clk counted down) ---------- */
let G=null;          /* guest: {key,left,cap,run,up,pz,at} */
function view(){const k=roomKey();if(host())return K&&K.key===k?{key:k,left:K.left,cap:K.cap,run:K.run,up:K.up,pz:!!K.pzNow}:null;
 if(!G||G.key!==k)return null;const left=G.run&&!frozenRoom()?Math.max(0,G.left-(pnow()-G.at)):G.left;return {key:k,left,cap:G.cap,run:G.run,up:G.up||left<=0&&G.run,pz:G.pz}}
function onClk(m){if(host())return;const k=roomKey();
 /* freeze-time correction: a clk for a key the room has not reached yet on this side is kept (the buoi message may come just after) */
 G={key:m.key,left:+m.left||0,cap:+m.cap||0,run:!!m.run,up:!!m.up,pz:!!m.pz,at:pnow()};if(m.up)timeUp(m.key);void k}
/* ---------- time up: end her buổi (carried through any open dialog) ---------- */
let due="",AR={m:null,t:0};
function timeUp(k){if(due===k)return;due=k;try{if(live()&&!S.dead&&myKey()===k){
  const b=S.buoi||0,open=Q.length||S.mg;
  kitLine(b>=LAST()?(open?"Hết buổi tối: xem xong là sang ngày mới":"Hết buổi tối: sang ngày mới"):(open?"Hết buổi: xem xong là sang buổi":"Hết buổi: sang buổi cho cả hai"),3500)}}catch(e){}
 dueTick()}
function overdue(){return live()&&!S.dead&&(due===myKey()||!!CW.pendBuoi)}
function dueTick(){if(!live()||S.dead||CW.inLife||!due)return;
 if(due===myKey()&&myKey()===roomKey()){const b=S.buoi||0;
  if(b<LAST()){if(!CW.bend)CW.forceBend()}
  else if(!CW.pend&&CW.sent!==wkN()&&!Q.length&&!S.mg&&!frozenRoom()){try{nextBuoi()}catch(e){console.error(e)}}}
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
 else if(m.mode==="st"){const was=FS.key===m.key&&FS.rd;FS.key=m.key;FS.pz=!!m.pz;FS.rd=!!m.rd;FS.lf=!!m.lf;if(m.rd&&!was&&m.key===roomKey()&&!myRd())note()}
 else if(m.mode==="ask"){sendSt(true);if(host()){if(K)sendClk()}else{const v=view();if(v)say("have",{key:v.key,left:Math.round(v.left),cap:Math.round(v.cap),up:!!v.up})}}
 else if(m.mode==="have"&&host()&&K&&K.fresh&&m.key===K.key&&pnow()-K.born<15000){/* the guest kept the clock while I was away (refresh): take it */
  if(typeof m.left==="number"&&m.left<K.left){K.left=Math.max(0,m.left);K.cap=Math.max(0,Math.min(K.cap,+m.cap||0));if(m.up)K.up=true}K.fresh=false;sendClk();if(K.up)timeUp(K.key)}});
const bv=m=>{if(m&&m.bended){bended={a:!!m.bended.a,b:!!m.bended.b};bkeyB=(m.week!=null?m.week:wkN())+":"+(m.buoi||0)}};
COOP.on("bended",m=>{const o=other(),was=bkeyB===((m.week!=null?m.week:wkN())+":"+(m.buoi||0))&&bended[o];bv(m);if(CW.on&&bended[o]&&!was&&!myRd())note()});
COOP.on("presence",bv);COOP.on("room",bv);COOP.on("buoi",bv);
let noteKey="";function note(){const k=roomKey();if(noteKey===k)return;noteKey=k;try{kitLine("Hảo hữu đã sẵn sàng",3000)}catch(e){}paint(true)}
/* reconnect / refresh: ask the other side, show my state */
function hello(){if(!CW.on)return;ST.at=0;sendSt(true);say("ask",{key:roomKey()});if(host()&&K)sendClk()}
COOP.on("room",()=>setTimeout(hello,300));COOP.on("peer",on=>{if(on)setTimeout(hello,300)});COOP.on("start",()=>{go();setTimeout(hello,600)});
COOP.on("stop",()=>{stop()});
/* ---------- kit part §69: kitCoopClock ---------- */
function fmtT(ms){const s=Math.max(0,Math.ceil(ms/1000)),m=Math.floor(s/60),r=s%60;return m?(r?`${m} phút ${r} giây`:`${m} phút`):`${r} giây`}
function css(){if(document.getElementById("kctm-css"))return;const st=document.createElement("style");st.id="kctm-css";st.textContent=`
.kctm{display:inline-flex;flex-wrap:wrap;align-items:center;justify-content:flex-end;gap:4px}
.kctm .kchip{margin:0;align-items:center;font-weight:600;white-space:nowrap}
.kctm .kctm-r{flex:0 0 auto;width:12px;height:12px;border-radius:50%;background:conic-gradient(currentColor calc(var(--p,1)*360deg),#0000 0);box-shadow:inset 0 0 0 1.5px currentColor;opacity:.85}
.kctm .kchip.w .kctm-r{background:none}
#kctm{position:fixed;z-index:24;right:8px;pointer-events:none;max-width:calc(100vw - 16px)}
#kctm[hidden]{display:none}
#kctm .kchip{background:#fffaf0f2;box-shadow:0 2px 8px #0002}`;document.head.appendChild(st)}
/* o = {left ms, len ms, state "run"|"pz"|"up"|"stop", fr "ready"|"read"|"", me bool}; returns kit chips (one row, right aligned) */
function kitCoopClock(o){css();o=o||{};const p=Math.max(0,Math.min(1,(o.left||0)/(o.len||1)));const ring=`<i class="kctm-r" style="--p:${p.toFixed(3)}"></i>`;
 const L=[];
 if(o.state==="up")L.push(`<span class="kchip r">${ring}Hết buổi</span>`);
 else if(o.state==="pz")L.push(`<span class="kchip w">${ring}Tạm dừng · còn ${fmtT(o.left)}</span>`);
 else if(o.state==="stop")L.push(`<span class="kchip n">${ring}Còn ${fmtT(o.left)}</span>`);
 else L.push(`<span class="kchip ${(o.left||0)<=20000?"r":"n"}">${ring}Còn ${fmtT(o.left)}</span>`);
 if(o.fr==="ready")L.push(kitChip("Hảo hữu đã sẵn sàng","ok"));else if(o.fr==="read")L.push(kitChip("Hảo hữu đang xem tin","w"));
 return `<span class="kchips kctm">${L.join("")}</span>`}
window.kitCoopClock=kitCoopClock;
try{if(typeof KIT_SAMPLES!=="undefined")KIT_SAMPLES.push({id:"§69",title:"kitCoopClock · đồng hồ buổi khi chơi cùng hảo hữu",
 html:()=>[{left:102000,len:120000,state:"run"},{left:15000,len:120000,state:"run",fr:"ready"},{left:64000,len:120000,state:"pz",fr:"read"},{left:0,len:120000,state:"up"}].map(o=>`<div class="kitpg-row">${kitCoopClock(o)}</div>`).join("")})}catch(e){}
/* ---------- the chip over #next ---------- */
let EL=null,lastH="";
function hideChip(){if(EL&&!EL.hidden)EL.hidden=true}
function paint(force){if(!live()||S.dead){hideChip();return}const v=view();const M=$("modal"),T=$("title"),nx=$("next");
 if(!v||!nx||!nx.offsetParent||(M&&!M.hidden)||(T&&!T.hidden)||document.getElementById("coopfz")){hideChip();return}
 const fr=frReady()?"ready":(FS.key===v.key&&FS.pz)?"read":"";
 const state=v.up?"up":v.pz?"pz":(!v.run||frozenRoom())?"stop":"run";
 const h=kitCoopClock({left:v.left,len:TB().buoiMs,state,fr});
 if(!EL){css();EL=document.createElement("div");EL.id="kctm";EL.setAttribute("role","status");EL.setAttribute("aria-live","off");document.body.appendChild(EL)}
 if(h!==lastH||force){EL.innerHTML=h;lastH=h}
 const r=nx.getBoundingClientRect();EL.style.right=Math.max(8,Math.round(innerWidth-r.right))+"px";EL.style.bottom=Math.round(innerHeight-r.top+6)+"px";if(EL.hidden)EL.hidden=false}
/* #next in co-op = "Sẵn sàng" (the room's lock words "Đợi hảo hữu…" stay as jcoopworld writes them) */
function word(){const n=$("next");if(!n||!CW.on||n.dataset.coopWait)return;if(n.textContent!=="Sẵn sàng")n.textContent="Sẵn sàng"}
(function(){const f=render;render=function(){const r=f.apply(this,arguments);if(CW.on)try{word()}catch(e){}return r}})();
/* ---------- tick ---------- */
let IV=0;
function tick(){try{if(!CW.on){stop();return}const t=pnow(),dt=lastT?Math.min(2000,t-lastT):0;lastT=t;
 if(host())hostTick(dt);
 sendSt(false);dueTick();paint(false)}catch(e){console.error("coop clock",e)}}
function go(){if(IV)return;lastT=0;IV=setInterval(tick,250)}
function stop(){if(IV){clearInterval(IV);IV=0}hideChip();K=null;G=null;due="";AR.m=null}
if(CW.on)go();
/* test hooks (dev/test/coop-timer.js) */
CW.tm={view,roomKey,myKey,due:()=>due,frReady,reset:()=>{if(host()){try{localStorage.removeItem(LSK)}catch(e){}K=null;hostTick(0);if(K)K.fresh=false}},fmtT};
}catch(e){console.error(e)}})();
