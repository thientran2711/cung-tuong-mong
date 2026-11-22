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
/* thin E (level 5): no server `buoi` (no bend): the room's buổi is the host's own (host) / the host's in the view (guest) */
function eRoomB(){try{if(!(CW.eW&&CW.eW()))return null;if(host())return (S&&S.buoi)||0;const V=CW.thin&&CW.thin.view;return V&&V.o&&V.o.w===wkN()&&typeof V.o.buoi==="number"?V.o.buoi:null}catch(e){return null}}
function roomKey(){const w=wkN();const eb=eRoomB();const b=eb!=null?eb:(CW.rweek===w&&typeof CW.rbuoi==="number")?CW.rbuoi:((typeof S!=="undefined"&&S&&S.buoi)||0);return w+":"+b}
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
function myRd(){if(!live()||S.dead)return false;if(myKey()!==roomKey())return false;return !!(CW.bend||CW.pend||CW.sent===wkN()||(CW.nReady&&CW.nReady())||(CW.eAsked&&CW.eAsked()))}
const ST={key:"",pz:false,rd:false,lf:false,bz:false,kh:0,at:0};
const FS={key:"",pz:false,rd:false,lf:false,bz:false,kh:0};
/* busy (owner 16/11 friend chip "! Đang bận"): a dialog / event / mini game is open on her screen — the friend only ever sees "đang bận" */
function myBz(){if(!live())return false;try{if(S.mg||Q.length)return true;const M=$("modal");if(M&&!M.hidden)return true;return inMg()}catch(e){return false}}
const myKh=()=>{try{return Math.max(0,4-(+used||0))}catch(e){return 0}};
let bended={a:false,b:false},bkeyB="";
function sendSt(force){const k=roomKey(),pz=myPz(),rd=myRd(),lf=myLife(),bz=myBz(),kh=myKh(),t=pnow();if(!force&&ST.key===k&&ST.pz===pz&&ST.rd===rd&&ST.lf===lf&&ST.bz===bz&&ST.kh===kh&&t-ST.at<10000)return;
 ST.key=k;ST.pz=pz;ST.rd=rd;ST.lf=lf;ST.bz=bz;ST.kh=kh;ST.at=t;say("st",{key:k,pz,rd,lf,bz,kh})}
CW.frPz=()=>!!FS.pz;/* thin E: the host does not step her buổi while she is in a mini game (her step waits, as pendBuoi did) */
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
 /* thin E (level 5, COOPW.eW): HOST CLOCK ONLY. The host's time out steps both seats (forceBend → eForce, forceNight); the guest's clock is the
    display of the host's and never steps or readies anything (her one-road dialogs are still read for her below) */
 const gE=!host()&&CW.eW&&CW.eW();
 if(!gE&&due===myKey()&&myKey()===roomKey()){const b=S.buoi||0;
  if(b<LAST()){if(!CW.bend)CW.forceBend()}
  else if(!CW.pend&&CW.sent!==wkN()){/* tối: the host commits the night for both (jcoopworld night gate); each seat runs it once her dialog is closed */
   if(CW.forceNight)try{CW.forceNight()}catch(e){console.error(e)}
   if(!Q.length&&!S.mg&&!frozenRoom()){try{nextBuoi()}catch(e){console.error(e)}}}}
 if(overdue())autoRead()}
/* review/night-ledger-coop-r3 (rv FAIL 1, NLC #9 coop-night case 4): AN AFK SEAT AT AN OVERDUE TỐI. The holder of the played tối (ledger:
   the first day of EITHER player, so often a player) gets the Kính sự phòng summons after the flip, then the night talk; on top of them any
   other real choice of the tối («Một ánh mắt», a night event …). Each is a real choice and is never made for her (owner 15/11 ~21:25Z /
   ~22:55Z, OD L680: when the timer runs out the buổi advances for both, open dialogs resolved safely / carried), so an AFK seat sat on one
   and her week end never went: the room froze for the partner (the NLC #9 bound — every seat's flip choice in by BAL.steal.choice.waitMs —
   does not cover her own dialogs). ROOT of «nightAfk never fires» (r3 trace COOPW.tm.naf().tr, FORCE4=g): the bound aged only the summons,
   and only from the moment it reached the top — «Một ánh mắt» stood above it for 82 s, so the summons came up after the test's bound.
   Bound now (both seats, any thin level): the WAIT is timed, not each dialog — from the first tick the partner waits on her (nafWait: her tối
   overdue, or the room's night committed, CW.ngoW = this week, while her own week end is not out). Once that wait reaches
   BAL.coopTm.nightMs (one core), the dialog on top (and each one after it) is handled at once, with NO ANSWER:
     summons (ksp, nfsum, amNight): she did not answer → she does not serve tonight (S.tonight = null, the same state as when the night passes
       her by; ldSettle records the played tối as nobody's);
     the night itself (prep, night1, night2: she already went): the night passes quietly, nothing more is gained (her night record stays);
     the flip choice (nfch): untouched — its own 10-second clock says Thôi (OD L1479);
     ANY OTHER dialog (a real choice, a notice): CARRIED (coordinator ruling under OD L680) — taken off her screen unanswered (no onClose, no
       road), kept on her seat (CQ) and put back on top right after the merged week, so she answers it when she returns.
   Then her night step runs as for any closed dialog (dueTick / jcoopworld nCheck) and her week end goes. LAW 11 table: reports/night-ledger.md «FIX r3». */
const NAF_SUM=["ksp","nfsum","amNight"],NAF_NT=["prep","night1","night2"],NAF_OWN=["nfch"];let NA={w0:0,said:-1};
/* r4 (Foreman B ruling 2): the carried cards live in her SAVE (S.cq, save form: pid {pid,pp,t} / generator {rk,ra,t}); both seats, a reload keeps them */
const CQ=()=>(S.cq=Array.isArray(S.cq)?S.cq:[]);
function nafWait(){return live()&&!S.dead&&!CW.inLife&&!HOLD&&(S.buoi||0)>=LAST()&&CW.sent!==wkN()&&!CW.pend&&(overdue()||CW.ngoW===wkN())}
let NAT=[],NAL="";function nafTr(m,on){try{const s=[m&&(m.pid||String(m.t||"").slice(0,20)),on?1:0,overdue()?1:0,CW.ngoW===wkN()?1:0,NA.w0?Math.floor((pnow()-NA.w0)/10000)*10:-1].join(",");if(s!==NAL){NAL=s;NAT.push([Math.round(pnow()),s]);if(NAT.length>60)NAT.shift()}}catch(e){}}
function nightAfk(){const on=nafWait(),m=Q[0];if(!on)NA.w0=0;else if(!NA.w0)NA.w0=pnow();nafTr(m,on);
 if(!on||pnow()-NA.w0<+BAL.coopTm.nightMs)return;/* one core: the bound lives only in BAL.coopTm.nightMs */
 if(!m){nafScene();return}
 if(NAF_OWN.includes(m.pid))return;
 if(NAF_SUM.includes(m.pid)||NAF_NT.includes(m.pid)){const sum=NAF_SUM.includes(m.pid);const dc=sum?nafDecl(m):"";if(sum&&S.tonight==="me")S.tonight=null;CW.nafN=(CW.nafN||0)+1;CW.naf={pid:m.pid,w:wkN(),dc};
  const t=sum?`Quá giờ chờ: ngươi chưa đáp lời, kiệu đã quay về. Đêm nay ngươi không hầu giá${dc?`, lỡ hẹn như cáo bệnh: ${dc}`:""}.`:"Quá giờ chờ: đêm hầu giá trôi qua lặng lẽ.";
  try{log(t)}catch(e){}try{kitLine(t,5000)}catch(e){}try{closeModal()}catch(e){console.error(e)}try{if(CW.nCheck)CW.nCheck()}catch(e){}return}
 /* carry: off her screen with no answer (no onClose: nothing is decided), back on top after the merged week */
 Q.shift();const e=typeof serM==="function"?serM(m,{lap:1}):null;
 if(e)e.cw=wkN();/* the week it was carried in: it comes back once the room is past that week (the merged week, or a rejoin after it) */
 if(e&&(e.pid||e.rk)){CQ().push(e);CW.nacN=(CW.nacN||0)+1}else if(e&&e.lap){rcpLapse(e.t);CW.nalN=(CW.nalN||0)+1}/* a choice with no generator lapses now (no effect, one log line), never a hollow road later */
 else if(e){CQ().push(e);CW.nacN=(CW.nacN||0)+1}/* a notice: its text */
 if(NA.said!==wkN()){NA.said=wkN();try{kitLine("Quá giờ chờ: việc còn dang dở được giữ lại, ngươi trở lại sẽ xem tiếp.",5000)}catch(e){}}
 try{showModal();render()}catch(e){console.error(e)}try{if(CW.snapNow)CW.snapNow()}catch(e){}try{if(CW.nCheck)CW.nCheck()}catch(e){}}
/* a kit scene on her screen that waits only for its ONE end button (KIT §81: the flip's «Chuẩn bị thị tẩm» .kmend, the item reveal «Nhận»
   .krevok, a [data-km-close]): no choice, so it is read for her like a one-road dialog (r3 cn2 FORCE4=h DUMP: the AFK host's own flip-end
   scene sat 76 s with Q empty, her night never ran). A scene with more than one button (a choice) is left alone. */
function nafScene(){try{const L=[...document.querySelectorAll(".kmov")].filter(o=>o.offsetParent!==null||getComputedStyle(o).position==="fixed");
 for(const o of L){const bs=[...o.querySelectorAll("button")].filter(b=>b.offsetParent!==null&&!b.disabled);if(bs.length!==1)continue;const b=bs[0];
  if(!(b.classList.contains("kmend")||b.classList.contains("krevok")||b.hasAttribute("data-km-close")))continue;
  CW.nasN=(CW.nasN||0)+1;b.click();return}}catch(e){console.error(e)}}
/* the carried dialogs come back on top once the merged week is in (jcoopworld onWeek keeps Q: fromCanon keepQ). A card of the save's kind
   (pid) is made again from its id (deserQ, the save path: it points at the people of the merged world); any other card comes back as it was. */
function carryBack(){if(typeof S==="undefined"||!S||!Array.isArray(S.cq)||!S.cq.length||!live()||S.dead)return;const w=wkN(),L=S.cq.filter(e=>!(e.cw>=w));if(!L.length)return;S.cq=S.cq.filter(e=>e.cw>=w);let out=[];
 try{out=deserQ(L)}catch(x){out=[]}/* rebuilt against the merged world, people by id (j3 deserQ: pid → mkP, generator → rcpMk; a gone person → lapse + log) */
 CW.nacB=(CW.nacB||0)+L.length;CW.nacL=(CW.nacL||0)+(L.length-out.length);if(!out.length)return;Q.unshift(...out);if(CW.afterCarry)try{CW.afterCarry(out)}catch(e){}/* test hook (as CW.afterFC) */try{showModal();render()}catch(e){console.error(e)}}
/* LAW 2 / 3 (Foreman B ruling 3): «no answer» to a summons after the AFK bound costs what «Cáo bệnh» costs on that same card (its own fx losses
   and its go: Ân tình, the decline count …; one core: the card's own BAL numbers), without the rest it buys (Sức) — absence is never the cheaper decline */
function nafDecl(m){try{const o=(m.opts||[]).find(x=>/^Cáo bệnh/.test(String(x&&x.n||"")));if(!o)return"";const L={};for(const k in (o.fx||{}))if(typeof o.fx[k]==="number"&&o.fx[k]<0)L[k]=o.fx[k];
 const a0=S.an;if(Object.keys(L).length)apply(L);try{if(o.go)o.go()}catch(e){console.error(e)}
 const T=Object.keys(L).map(k=>`${NAMES[k]||k} ${L[k]}`);if(typeof S.an==="number"&&typeof a0==="number"&&S.an<a0)T.push(`Ân tình ${S.an-a0}`);CW.nafD=(CW.nafD||0)+1;return T.join(", ")}catch(e){console.error(e);return""}}
COOP.on("week",()=>setTimeout(()=>{try{carryBack()}catch(e){console.error(e)}},0));
/* r4: a reload between the carry and the merged week keeps them (S.cq is in her save); a rejoin after that merge (no "week" event on this page) brings them back too */
CW.cqBack=()=>setTimeout(()=>{try{carryBack()}catch(e){console.error(e)}},0);/* called by jcoopworld fromCanon once a world is in (merge, join, rejoin) */
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
.krailb.kctmf{width:32px;height:32px;min-width:0;min-height:0;padding:3px;flex:0 0 auto}
/* the picture inside the kit button; the status badge + the grey offline state are the kit's (§77b kitStBadge / .krailb.koff, K-BADGE-HAOHUU) */
.kctmf>.kctmf-a{display:block;width:26px;height:26px;border-radius:5px;overflow:hidden;pointer-events:none}
.kctmf>.kctmf-a>img,.kctmf>.kctmf-a>*{width:26px!important;height:26px!important;min-width:0!important;margin:0!important;border-radius:5px;object-fit:cover;display:block}
.kctmf .kctmf-vh{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
#kctmf{display:flex;align-items:center;gap:6px}#kctmf .kctmf-t{margin:0;white-space:nowrap;font-size:.72rem;padding-top:0;padding-bottom:0;background:#fffaf0f2}
#kctmf{position:absolute;z-index:8;margin:0;max-width:calc(100vw - 16px)}
#kctmfu{position:fixed;z-index:9600;pointer-events:none;display:flex;align-items:center;gap:6px;margin:0}#kctmfu[hidden]{display:none}
#kctmfu .kctmf-t{margin:0;white-space:nowrap;font-size:.72rem;padding-top:0;padding-bottom:0;background:#fffaf0f2}
header.hud.kctm-pad{padding-bottom:calc(var(--kctm-pb,6px) + 28px)!important}
#kctmf[hidden]{display:none}
#kctmh .dlg #kctmhb{padding:8px 12px 2px}
#kctmh .dlg #kctmhr{padding:4px 14px 12px;margin:0;display:flex;justify-content:flex-end;gap:8px}`;document.head.appendChild(st)}
/* o = {left ms, len ms, state "run"|"pz"|"up"|"stop", fr "ready"|"busy"|"", btn bool}; one row of kit chips, right aligned */
function kitCoopClock(o){css();o=o||{};const p=Math.max(0,Math.min(1,(o.left||0)/(o.len||1)));const ring=`<i class="kctm-r" style="--p:${p.toFixed(3)}"></i>`;
 const L=[];
 if(o.state==="up")L.push(`<span class="kchip r">${ring}Hết buổi</span>`);
 else if(o.state==="pz")L.push(`<span class="kchip w">${ring}Đợi · còn ${fmtT(o.left)}</span>`);
 else if(o.state==="stop")L.push(`<span class="kchip n">${ring}Còn ${fmtT(o.left)}</span>`);
 else L.push(`<span class="kchip ${o.tone||((o.left||0)<=20000?"r":"n")}">${ring}Còn ${fmtT(o.left)}</span>`);
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
const FST={ready:["g","✓","Đã sẵn sàng"],busy:["w","!","Đang bận"],work:["n","…","Đang làm việc"],away:["r","✕","Đang vắng"],hold:["w",`<i class="kpzb" aria-hidden="true"></i>`,"Tạm dừng"]};
const mmss=ms=>{const s=Math.max(0,Math.ceil((ms||0)/1000));return Math.floor(s/60)+":"+String(s%60).padStart(2,"0")};
/* §69.2 CANON OVERWRITE (owner 21/11 ~06:30Z, OD verbatim: "ở cái thanh trên cùng ... một cái icon ... người đó off là màu xám ... On là sẽ màu tươi hơn ...
   xong thì có một cái dấu tích màu xanh kế bên ... vẫn còn đang bận thì là nó hiện cái dấu ba chấm kế bên ... bấm vô người đó thì nó ra thông tin"):
   the friend chip IS the «Hảo hữu» icon: ONE square kit icon button in the fixed top bar (placeF below) = her portrait once met (kitFaceH),
   the painted kit icon img/kit/ico-friend.webp while she is a stranger (OD:L165: no face before meeting); GREY when she is offline (away),
   full colour when online; a small badge at its corner: ✓ green = ready / sang buổi, «…» = busy or still at work, ⏸ = she asked to pause;
   no name, no status words on screen (they stay in aria-label / title + a visually hidden span for screen readers); the shared buổi
   countdown stays beside it as one short kit chip (owner 16/11 "Đồng hồ count down cho 2 người chơi đâu?", OD rule kept). Tap → the
   partner sheet kitHaoHuuOpen (jhaohuu.js), which also holds the old chip panel's rows (her status, Ngươi) and «Tạm dừng». */
function kitCoopFriend(o){css();o=o||{};const s=FST[o.st]||FST.work;const nm=o.name||"Hảo hữu của ta";
 const clk=o.clock==null?"":o.clock==="up"?`<span class="kchip r kctmf-t">Hết buổi</span>`:`<span class="kchip ${o.clock==="pz"?"w":(o.left||0)<=20000?"r":"n"} kctmf-t" aria-label="${o.clock==="pz"?"Đồng hồ đang đợi":"Buổi này còn"} ${mmss(o.left)}">${o.clock==="pz"?`<i class="kpzb" aria-hidden="true"></i>`:""}${mmss(o.left)}</span>`;
 const av=o.known&&o.face?o.face:`<img src="img/kit/ico-friend.webp" alt="" decoding="async">`;
 /* KIT §77b (K-BADGE-HAOHUU): ready → ok ✓ green · hold → pause ⏸ · busy / work → busy … · away → no badge + the button's .koff grey; the badge is the LAST child of the .krailb */
 const bst=o.st==="ready"?"ok":o.st==="hold"?"pause":o.st==="away"?"":"busy";const bd=typeof kitStBadge==="function"?kitStBadge(bst):"";
 const lab=esc(nm+": "+s[2]);
 return `<button type="button" class="krailb kctmf${o.st==="away"?" koff":""}" data-ctm="fr" aria-label="${lab}" title="${lab}"><span class="kctmf-a">${av}</span><span class="kctmf-vh">${esc(nm)} · ${s[1]} ${s[2]}</span>${bd}</button>${clk}`}
/* the friend's status in words (ONE table: the chip panel below + the «Hảo hữu» partner sheet, jhaohuu.js) */
function frWord(o){o=o||{};return {ready:o.meRd?"đã sẵn sàng":"đã sang buổi, đang chờ ngươi",busy:"đang bận việc, xin đợi chốc lát",work:`đang làm việc${o.kh?` · còn ${o.kh} khắc`:""}`,
  away:CTM_WAIT.coopAway,hold:"xin tạm dừng chốc lát"}[o.st]||"đang làm việc"}
function kitCoopFriendPanel(o){css();o=o||{};const s=FST[o.st]||FST.work;const nm=o.name||"Hảo hữu của ta";
 const fw=frWord(o);
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
function hideChip(){if(EL&&!EL.hidden)EL.hidden=true;if(FE&&!FE.hidden)FE.hidden=true;if(FU&&!FU.hidden)FU.hidden=true}
/* the friend's state as one word (FST) */
function frSt(v){if(!COOP.state.peerOnline)return"away";if(frReady())return"ready";const k=v?v.key:roomKey();const h=v?v.hold:HOLD;
 if(h&&h!==CW.seat)return"hold";if(FS.key===k&&(FS.pz||FS.bz||FS.lf))return"busy";return"work"}
function frInfo(){const v=view();const f=typeof CW.friend==="function"?CW.friend():null;let name="",face="",known=false;
 try{if(f){const named=typeof k61Named==="function"?k61Named(f):true;if(named)name=f.name||"";known=typeof isKnown61==="function"?isKnown61(f):true;face=typeof kitFaceH==="function"?kitFaceH(f,"xs"):""}}catch(e){}
 if(!name){try{const so=(COOP.state.seats||{})[other()];void so}catch(e){}}
 const clock=!v?null:(v.up||(v.run&&v.left<=0))?"up":(v.pz||v.hold||!v.run||frozenRoom())?"pz":"run";
 return {name,face,known,st:frSt(v),left:v?v.left:0,clock,kh:FS.kh,meRd:myRd(),myKh:myKh(),canHold:!!v&&!v.up&&!frozenRoom()&&!HOLD}}
/* rv hao-huu items 1-4 (21/11): the icon (+ its clock chip) is a CHILD of the fixed top bar header.hud, like the §42.2 «!» box — so the «!» box,
   the notice chip and the rail dock (they scan the bar's own boxes) keep clear of it. ONE FIXED SLOT per viewport (innerWidth x innerHeight):
   found once by scanning right → left, top → bottom against every visible block of the bar (its direct children's whole boxes, so a word that
   grows inside its block cannot reach the icon), every word (text-node rects, also inside elements that have children), every picture / button,
   the seal and the «!» box; it never re-places on a content change (owner 21/11: "cái thanh không có bao giờ bị dịch chuyển") — only when a word
   or picture of the bar really lies under it. No free slot (phones, iPad portrait) → the bar's own strip (kctm-pad) at its right.
   While the room is frozen (#coopfz, the friend away) or held (the hold panel), a COPY (#kctmfu, class kup: body child, fixed, tap inert,
   aria-hidden) stands at the SAME spot raised above that panel: grey while she is away, ⏸ while she holds; the bar's own icon stays in the bar
   under the panel, so the «!» box and the notice chip keep clear of that spot in every state. The «!» box yields: it is not an obstacle of the
   slot (it re-checks its own spot against the bar, kitNoticeBox, after every move of the icon). */
const PADH=28;
let SL=null,SLc=0,SLp="",FU=null,FUp="";const SLK="ctmHhSlot";let SLM={};try{SLM=JSON.parse(localStorage.getItem(SLK)||"{}")||{}}catch(e){SLM={}}
/* the slot of each viewport, kept (also across her own page reloads, rv r2 N1: a UI preference, not the save): back to a viewport = the same spot */
const slSave=()=>{try{localStorage.setItem(SLK,JSON.stringify(SLM))}catch(e){}};
function hudObs(hud,words){const R=[];const add=r=>{if(r.width>=2&&r.height>=2)R.push(r)};const vis=e=>e.getClientRects().length&&getComputedStyle(e).visibility!=="hidden";
 if(!words)for(const e of hud.children){if(e===FE||e.id==="kntbox"||!vis(e))continue;add(e.getBoundingClientRect())}
 const tw=document.createTreeWalker(hud,NodeFilter.SHOW_TEXT),rg=document.createRange();let n;
 while((n=tw.nextNode())){if(!n.nodeValue.trim()||FE.contains(n)||(n.parentElement&&n.parentElement.closest("#kntbox")))continue;const pe=n.parentElement;if(!pe||!vis(pe))continue;rg.selectNodeContents(n);for(const r of rg.getClientRects())add(r)}
 for(const e of hud.querySelectorAll("img,svg,canvas,button,[role=button],input,.kseal-hud")){if(FE.contains(e)||!vis(e)||e.closest("#kntbox"))continue;add(e.getBoundingClientRect())}
 return R}
/* the slot is sized for the WIDEST content (icon + «pause bars 0:00» / «Hết buổi»), so a clock change never makes it grow into a neighbour */
function slotSize(){const keep=FE.innerHTML;FE.style.minWidth="";let w=0,h=0;
 for(const o of [{st:"hold",clock:"pz",left:599000},{st:"ready",clock:"up"},{st:"work",clock:"run",left:599000}]){FE.innerHTML=kitCoopFriend(o);const r=FE.getBoundingClientRect();w=Math.max(w,r.width);h=Math.max(h,r.height)}
 FE.innerHTML=keep;const s=FE.getBoundingClientRect().width/(FE.offsetWidth||1)||1;FE.style.minWidth=Math.ceil(w/s)+"px";return{w,h}}
/* the scan never toggles the bar's strip: with the strip on, it looks only above it (a retry from the strip moves nothing until a real slot exists) */
function slotFind(hud){const z=slotSize(),w=z.w,h=z.h,padOn=hud.classList.contains("kctm-pad");
 const H1=hud.getBoundingClientRect(),sc=H1.height/(hud.offsetHeight||H1.height)||1,B1=H1.bottom-(padOn?PADH*sc:0),R=hudObs(hud,false),R0=Math.min(innerWidth-6,H1.right-4);
 const free=(x,y)=>!R.some(q=>x<q.right+6&&x+w>q.left-6&&y<q.bottom+2&&y+h>q.top-2);
 for(let y=H1.top+2;y+h<=B1-2;y+=2)for(let x=R0-w;x>=H1.left+2;x-=2)if(free(x,y)){if(padOn)hud.classList.remove("kctm-pad");return{k:innerWidth+"x"+innerHeight,dx:x-H1.left,dy:y-H1.top,pad:false}}
 if(SL&&SL.pad&&padOn&&SL.k===innerWidth+"x"+innerHeight)return SL;
 hud.classList.add("kctm-pad");try{if(typeof k3Shell==="function")k3Shell()}catch(e){}const H2=hud.getBoundingClientRect();
 return{k:innerWidth+"x"+innerHeight,dx:Math.max(4,R0-w-H2.left),dy:H2.height-PADH+(PADH-h)/2-2,pad:true}}
function cal(el){el.style.left="0px";el.style.top="0px";const a=el.getBoundingClientRect();el.style.left="100px";el.style.top="100px";const b=el.getBoundingClientRect();
 return{A:a.left,B:a.top,sx:(b.left-a.left)/100||1,sy:(b.top-a.top)/100||1}}
function upCopy(up){if(!up){if(FU&&!FU.hidden)FU.hidden=true;return}
 if(!FU){FU=document.createElement("div");FU.id="kctmfu";FU.className="kup";FU.setAttribute("aria-hidden","true");FU.setAttribute("data-k61skip","1");document.body.appendChild(FU)}
 const h=FE.innerHTML;if(FU.__h!==h){FU.innerHTML=h;FU.__h=h;FU.style.minWidth=FE.style.minWidth}if(FU.hidden)FU.hidden=false;
 const R=FE.getBoundingClientRect(),key=[R.left,R.top].map(Math.round).join();if(key===FUp&&FU.style.left)return;FUp=key;const c=cal(FU);FU.style.left=((R.left-c.A)/c.sx).toFixed(1)+"px";FU.style.top=((R.top-c.B)/c.sy).toFixed(1)+"px"}
function placeF(){const hud=document.querySelector("header.hud");if(!hud||!FE||!hud.getClientRects().length){upCopy(false);return}
 const up=!!(document.getElementById("coopfz")||HP);
 if(getComputedStyle(hud).position==="static")hud.style.position="relative";
 let moved=false;if(FE.parentNode!==hud){hud.appendChild(FE);moved=true}
 const k=innerWidth+"x"+innerHeight,t0=pnow();
 /* the bar is still re-laying itself out after a resize: keep the old spot a moment (a slot found mid-layout would be wrong for good) */
 if(SL&&SL.k!==k&&!SLM[k]){const H0=hud.getBoundingClientRect(),hk=[H0.width,H0.height].map(Math.round).join();if(t0-RZ<400||hk!==placeF.hk){placeF.hk=hk;upCopy(up);return}}
 if(!SL||SL.k!==k){SL=SLM[k]||null;moved=true}let re=!SL;
 if(SL&&SL.pad!==hud.classList.contains("kctm-pad"))re=true;
 /* a word / picture of the bar really under the icon (checked every 1.5 s, not on every tick) → find the slot again; otherwise it stays */
 /* never while the bar may still be re-laying itself out after a resize (a mid-layout check sent the icon to the strip on iPad, rv test r4) */
 if(!re&&t0-SLc>1500&&t0-RZ>1200){SLc=t0;if(SL.pad)re=true;/* in the strip: look again for a real slot (nothing moves until one exists) */
  else{const F=FE.getBoundingClientRect();re=hudObs(hud,true).some(q=>F.left<q.right&&F.right>q.left&&F.top<q.bottom&&F.bottom>q.top)}}
 if(re){const n=slotFind(hud);if(n!==SL){SL=SLM[k]=n;if(!n.pad)slSave();moved=true}SLc=t0}
 const H=hud.getBoundingClientRect(),key=[SL.dx,SL.dy,H.left,H.top].map(Math.round).join();
 if(moved||key!==SLp){SLp=key;const c=cal(FE);FE.style.left=((H.left+SL.dx-c.A)/c.sx).toFixed(1)+"px";FE.style.top=((H.top+SL.dy-c.B)/c.sy).toFixed(1)+"px";
  try{if(typeof kitNoticeBox==="function")kitNoticeBox()}catch(e){}}
 upCopy(up)}
function unpad(){const hud=document.querySelector("header.hud.kctm-pad");if(hud)hud.classList.remove("kctm-pad")}
function paintF(){const T=$("title");if(!live()||S.dead||(T&&!T.hidden)){if(FE&&!FE.hidden)FE.hidden=true;if(FU&&!FU.hidden)FU.hidden=true;return}
 const o=frInfo();const h=kitCoopFriend(o);
 if(!FE){css();FE=document.createElement("div");FE.id="kctmf";FE.setAttribute("role","status");FE.setAttribute("data-k61skip","1");/* rv r2 A: her name (aria-label / title / hidden span) is set only once she is known by name (k61Named): the DOM name mask must not re-map it */(document.querySelector("header.hud")||document.body).appendChild(FE)}
 if(h!==lastF){FE.innerHTML=h;lastF=h}if(FE.hidden)FE.hidden=false;placeF();if(FP)FP.innerHTML=kitCoopFriendPanel(o)}
function frPanel(on){if(!on){if(FP){FP.remove();FP=null}return}
 /* §69.2 overwrite 21/11: ONE panel = the «Hảo hữu» partner sheet (jhaohuu.js); the old status-only notice is only the fallback */
 if(typeof window.kitHaoHuuOpen==="function"){window.kitHaoHuuOpen();return}if(!FP){FP=document.createElement("div");FP.id="kctmp";FP.className="modal kpscene";FP.setAttribute("role","dialog");document.body.appendChild(FP);
 FP.addEventListener("click",e=>{if(e.target===FP)frPanel(false)})}FP.innerHTML=kitCoopFriendPanel(frInfo());const s=FP.querySelector(".kpseal");if(s)s.remove()}
function paint(force){if(!live()||S.dead){hideChip();return}try{paintF()}catch(e){console.error(e)}const v=view();const M=$("modal"),T=$("title"),nx=$("next");
 if(!v||!nx||!nx.offsetParent||(M&&!M.hidden)||(T&&!T.hidden)||document.getElementById("coopfz")||HP){if(EL&&!EL.hidden)EL.hidden=true;return}
 /* KIT FIRST (owner 16/11 "Nữa, kit chung đâu", review/kit-sweep): no floating clock strip over the tab bar any more — the header friend chip
    (§69.2 kitCoopFriend: status + shared countdown) is the ONE display; the wait words and "Tạm dừng" live in its kit notice (tap the chip). */
 if(EL){EL.remove();EL=null;lastH=""}
 const me=myRd();
 /* she can still press "Sẵn sàng" and her khắc are spent: the kit selected look (.ksel) on the button */
 const go=!me&&!nx.disabled&&typeof used==="number"&&used>=BAL.time.khac;if(nx.classList.contains("ksel")!==go)nx.classList.toggle("ksel",go)}
/* #next in co-op = "Sẵn sàng" (the room's lock words "Đợi hảo hữu…" stay as jcoopworld writes them) */
function word(){const n=$("next");if(!n||!CW.on||n.dataset.coopWait)return;if(n.textContent!=="Sẵn sàng")n.textContent="Sẵn sàng"}
(function(){const f=render;render=function(){const r=f.apply(this,arguments);if(CW.on)try{word();sendSt(false)}catch(e){}return r}})();
/* ---------- tick ---------- */
let IV=0,lastPing=0;
function tick(){try{if(!CW.on){stop();return}const t=pnow(),dt=lastT?Math.min(2000,t-lastT):0;lastT=t;
 if(host())hostTick(dt);else{if(t-lastPing>5000){lastPing=t;ping()}if(G&&G.hold!==HOLD)setHold(G.hold);if(G&&G.up&&G.key===roomKey()&&due!==G.key)timeUp(G.key)}
 sendSt(false);dueTick();nightAfk();paint(false)}catch(e){console.error("coop clock",e)}}
/* a new viewport: the bar lays itself out again first (its grid / shell change after the resize); the slot is found once that has settled */
let RZ=0;addEventListener("resize",()=>{RZ=pnow()});
function go(){if(IV)return;lastT=0;IV=setInterval(tick,250)}
function stop(){if(IV){clearInterval(IV);IV=0}hideChip();frPanel(false);unpad();K=null;G=null;due="";AR.m=null;setHold("")}
if(CW.on)go();
/* test hooks (dev/test/coop-timer*.js) */
/* the «Hảo hữu» partner sheet (jhaohuu.js) reads the same live status as the chip: FST tone + glyph + words */
CW.frHold=on=>hold(!!on);/* «Tạm dừng» from the partner sheet (jhaohuu); NOT CW.hold = the build-hold flag of jcoopworld */
CW.frInfo=()=>{const o=frInfo();const f=FST[o.st]||FST.work;return Object.assign(o,{tone:f[0],glyph:f[1],word:frWord(o)})};
CW.tm={lens:()=>LOGL.slice(),dbg:()=>({lifeW:{S:typeof S!=="undefined"&&!!S,dead:typeof S!=="undefined"&&S&&S.dead,inLife:CW.inLife,title:!!($("title")&&!$("title").hidden),kroul:!!document.getElementById("kroul")},fz:frozenRoom(),K:K&&tmSnap(),life:myLife(),pz:myPz(),FS:Object.assign({},FS),rk:roomKey(),G,HOLD,OFF}),view,roomKey,myKey,due:()=>due,frReady,hold,off:()=>OFF,hnow,reset:()=>{if(host()){try{localStorage.removeItem(LSK)}catch(e){}K=null;snapTm=null;hostTick(0)}},fmtT,naf:()=>{const m=Q[0];return {pid:m&&m.pid,buoi:S&&S.buoi,last:LAST(),sent:CW.sent,wk:wkN(),pend:CW.pend,od:overdue(),due,my:myKey(),rk:roomKey(),ngoW:CW.ngoW,hold:HOLD,inLife:CW.inLife,live:live(),wait:nafWait(),w0:NA.w0?Math.round(pnow()-NA.w0):null,n:CW.nafN||0,carried:CW.nacN||0,back:CW.nacB||0,lapsed:(CW.nalN||0)+(CW.nacL||0),decl:CW.nafD||0,scene:CW.nasN||0,cq:(S&&Array.isArray(S.cq))?S.cq.length:0,tr:NAT.slice(-40)}}/* r3 debug: why nightAfk does (not) fire */};
}catch(e){console.error(e)}})();
