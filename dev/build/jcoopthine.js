/* jcoopthine: CO-OP THIN GUEST, part E = THE BUỔI STEP (and the night gate) ON THE HOST (review/coop-thin-e; audit
   dev/handover/reports/coop-thin-guest-audit.md §3 row E; report dev/handover/reports/coop-thin-e.md; owner GO 17/11 ~01:40Z, no option-1
   patching ~02:05Z). Behind the room level: TH.on(5), on only when BOTH seats run a build with it (Worker: level = min(want, cap a, cap b)).
   Solo and rooms below level 5 run nothing here (jcoopworld's eW() is the one switch for the old paths).

   GUEST: "Sẵn sàng" never steps her buổi and never sends `bend`. It sends the intent `do ready` {w, b}, first preceded by `do erd` packs =
     her person as it is NOW against the host's copy of it (the view's P.<seat>: pDiff, the same patch form part D uses the other way), so
     the host steps the person she really is (her own acts of this buổi still run on her phone until part F). She sends only once every
     host patch in the view is applied (S.thpn), so the diff is exactly her own changes. While she is ready #next is locked (COOPW.eWait).
     Her step comes back as a part-D patch (pq, applied by TH.gSync): buổi, khắc reset, her place / visit / where, her cards (thq). When her
     buổi moves by that patch, her phone resets what lives outside S (used, popIdx / popMsg) and plays the curtain: display only.
     At buổi tối her ready marks the night gate (CW.nrdy) and is the same intent; the host's go rides the view (o.e.go), never `ctm-nr`.
   HOST: "Sẵn sàng" marks him ready. The step runs when both are ready for the room's buổi, or when his clock ran out (COOPW.forceBend →
     eForce: host clock only; the guest's clock never steps anything): his own buổi (the real nextBuoi, rivalsBuoi with her entry in the
     harem through part C / B4, placeWhere), then HER step in withSeat("b") from the top of the event loop: nextBuoi for her person with
     the world READ-ONLY in it — rivalsBuoi / placeWhere do not run again (her NPC places = his, mapped to her perspective), and every write
     of her step into the world (NPC entries, the NPC list, the world keys of S, rid) is put back as it was when her step ends, except her own
     viewer rows (rel / oan / ghen / ev / <map>.me: what that NPC feels / holds toward HER) and her own part of emp / cm / men. This is the
     same rule as part C's lens on her phone (world frames dropped): the world is computed once, by the host's own step.
   Retired at level 5 (bypassed through eW(), deleted when level >= 5 is the default, part H): bend / buoi / bended / badbuoi, pendBuoi,
   needWhere / where relay / setWhere, the night relay ctm-nr (rd / go / q), the guest's forced bend (jcooptimer: host clock only).
   API: TH.E = {on, stat, rd (her ready), log}. */
(function(){try{
const CW=window.COOPW;if(!CW||!CW.thin||!CW.X||typeof COOP!=="object")return;
const TH=CW.thin,X=CW.X,J=X.J,D=TH.D,LV=5;
const host=()=>CW.seat==="a",on=()=>TH.on(LV);
const LAST=()=>typeof B4L==="number"?B4L:2;
const E=TH.E={on,stat:{rd:0,erd:0,ops:0,big:0,step:0,her:0,herSkip:0,forced:0,wrW:0,wrR:0,addDrop:0,rmBack:0,ridBack:0,curtain:0,go:0,cyb:0,tn:0,wwEnd:0,night:0,owe:0,adopt:0,reRd:0,hostBack:0,clamp:0,press:0},rd:{},hr:"",forced:"",mine:"",log:[]};
const lg=x=>{E.log.push(x);if(E.log.length>80)E.log.shift()};
const bk=()=>(COOP.state.week||0)+":"+((S&&S.buoi)||0);
const wkx=()=>typeof wk==="function"?wk():0;
const plain=o=>o!==null&&typeof o==="object";
const npcs=()=>(rivals||[]).filter(v=>v&&!v.coop);
const other=()=>CW.seat==="a"?"b":"a";

/* ---------- GUEST ---------- */
const BAD=new Set(["thq","thpn","heir","hr","buoi","origin"]);/* origin (her thân phận): the host's, set by her life intent (part B); her diff never carries it (a first ready sent ["-",["origin"]] → the host's ser of her threw "reading 'k'") *//* buoi: the room's step, the host's alone (a number travels as a delta: her copy must never move it) *//* cyb travels with her diff: the host reads her cycle flags from her person (row 10) */
function curP(){const o=J(ser().S);for(const k of X.W_KEYS)delete o[k];for(const k of BAD)delete o[k];return o}
const PACK=15000;
/* her ops in packs the Worker takes (an intent over DOMAX 20 000 chars is refused); one op too big alone is counted, not sent */
function packs(ops){const out=[];let cur=[],n=2;for(const o of ops){const s=JSON.stringify(o).length+1;if(s>PACK){E.stat.big++;lg(["big",String(o[1]&&o[1].join?o[1].join("."):o[1]).slice(0,60),s]);continue}
  if(n+s>PACK&&cur.length){out.push(cur);cur=[];n=2}cur.push(o);n+=s}if(cur.length)out.push(cur);return out}
function gReady(){if(!S||S.dead||Q.length||S.mg||CW.inLife)return;const b=S.buoi||0;const k=bk();if(E.mine===k)return;
 const V=TH.view,P=V&&V.o&&V.o.P&&V.o.P[CW.seat];
 if(V&&V.o){const mx=Math.max(0,...(V.o.pq||[]).map(x=>x.n|0));if((S.thpn||0)<mx){try{TH.gSync(V)}catch(e){}if((S.thpn||0)<mx){lg(["wait-pq",S.thpn||0,mx]);return}}}
 let ops=[],cur=null;if(P)try{cur=curP();ops=TH.pDiff(E.base(V),cur)}catch(e){console.error("thin E diff",e)}
 const L=packs(ops);const id="r"+Date.now().toString(36);
 L.forEach((ops,i)=>{TH.doSend("erd",{id,i,ops});E.stat.ops+=ops.length});if(cur)E.sent(cur);
 if(b>=LAST()){try{CW.nightReady()}catch(e){console.error(e)}}
 TH.doSend("ready",{w:COOP.state.week||0,b,id,n:L.length});E.mine=k;E.stat.rd++;lg(["ready",k,ops.length,L.length]);
 try{CW.lockNext();render()}catch(e){}}
/* thin F1 (review/coop-thin-f1): ONE guest baseline for her person diff (`do erd` here, the act intents of jcoopthinf): what the host holds of
   her. Taken from the view (her copy P.<seat>) only when the host has answered every intent she sent (view dr = her last id) and she applied
   every patch; else the copy she last sent, with the host's patches she applied since put on it too. Before: two diffs sent before the view
   caught up both carried the same change (a number added twice on the host). */
E.bs=null;E.pn=0;E.last="";E.curP=curP;E.packs=packs;
E.base=function(V){const o=V&&V.o;const mx=o?Math.max(0,...(o.pq||[]).map(x=>x.n|0)):0;const done=!E.last||!!(o&&o.dr&&o.dr.id===E.last);
 if(!E.bs||done&&(S.thpn||0)>=mx){const P=o&&(o.w==null||o.w===(COOP.state.week||0))/* r1: never a view of an older week */&&o.P&&o.P[CW.seat];if(P){const b=J(P);for(const k of BAD)delete b[k];for(const k of X.W_KEYS)delete b[k];E.bs=b;E.pn=mx}}
 return E.bs||{}};
E.sent=function(cur){E.bs=J(cur);E.pn=(S&&S.thpn)||0};
COOP.on("thinview",V=>{try{if(!on()||host()||!E.bs||!V||!V.o)return;const top=(S&&S.thpn)||0;for(const x of V.o.pq||[])if(x.n>E.pn&&x.n<=top){TH.pApply(E.bs,x.p);E.pn=x.n}}catch(e){console.error("thin E base",e)}});
/* F2: the keys her diff never writes on the host (part F filters them out of an intent's ops: a patch's buổi kept in her base made her diff say
   ["-",["buoi"]] and the host deleted her stored buổi before her walk ran — walk spill paid full price; found by coop-thin-f2 P7) */
E.BAD=BAD;
{const ds=TH.doSend;TH.doSend=function(op){const id=ds.apply(this,arguments);if(id&&!host()){E.last=id;if(op==="erd"||op==="ready"){EID.push(id);if(EID.length>20)EID.shift()}}return id}}
/* review coop-thin-f1 r1 #2 (net): her ready on a socket that died. A phone's socket can look open while it is dead (4G, sleep): her erd +
   ready sent on it are lost, the socket then closes and COOP reconnects, and nobody sent them again: the host waited for her, her #next
   said "Chờ hảo hữu…", the room stood (coop-cyc THIN=6: her maid's card never asked; dev/test/coop-thin-e-net.js N1–N4). Now: after her
   reconnect (room), or a Worker "nohost" for one of her erd / ready (his socket was gone), her baseline is the host's copy (E.bs null: the
   resent diff starts from what he really holds, nothing doubled) and, at the next view, if she still waits on that same buổi, her ready is
   sent again (once per loss; the host's ready is idempotent; a buổi he already stepped arrives in that view and nothing is resent). */
const EID=[];let rr=0;
COOP.on("room",()=>{E.bs=null;E.pn=0;E.last="";if(!host()&&E.mine)rr=1});COOP.on("week",()=>{E.bs=null;
 /* review coop-thin-g r1 (seat desync, g4s bạc 7 vs 67, TRIP week-36 Sức 83 vs 77): after the week her S IS the room's new C (fromCanon), which
    is exactly what the host rebuilds her store from. Her diff baseline is that S, never the last VIEW: the view held at this moment is the
    host's PRE-week copy, and a baseline taken from it made her first erd carry the week's own changes (his acts on her stand-in as deltas,
    the merge's moves) as if they were hers: the host added them a second time to his store, her phone kept the single count. */
 try{if(!host()&&on()&&S&&!S.dead){E.bs=curP();E.pn=(S.thpn|0);E.last=""}}catch(e){console.error("thin E week base",e)}});
COOP.on("thin",()=>{if(rr&&!host())setTimeout(()=>{try{reNet()}catch(e){console.error(e)}},0)});
COOP.on("error",m=>{try{if(host()||!m||m.code!=="nohost"||!m.id||!EID.includes(m.id))return;E.bs=null;E.last="";if(E.mine)rr=1;lg(["nohost",m.id])}catch(e){}});
function reNet(){if(!rr)return;if(host()||!E.mine||E.mine!==bk()){rr=0;return}if(!on()||!TH.view||!S||S.dead||Q.length||S.mg||CW.inLife)return;/* the room level comes back after the reconnect snapshot ("thin"): wait for it */
 rr=0;lg(["re-net",E.mine]);E.stat.reNet=(E.stat.reNet|0)+1;E.mine="";setTimeout(()=>{try{gReady()}catch(x){console.error(x)}},0)}
CW.eAsked=()=>on()&&(host()?(E.hr===bk()||E.forced===bk()):E.mine===bk());
CW.eWait=()=>!!(on()&&!host()&&E.mine&&E.mine===bk()&&((S&&S.buoi)||0)<LAST());
/* her buổi moved by the host's patch: what lives outside S on her phone (display / per-seat counters) */
let seen="";
/* review r1: her HAND of acts (deck) is dealt by the real step (j3 nextBuoi → deal), which at level 5 runs on the host in her context (the
   seat-local deck there never reaches her phone): her phone deals its own hand when her buổi moves by the host's patch, and whenever it is
   empty (a fresh page / a new week) — exactly as CW.restore deals after a reload. Without this her Hành sự had NO card at all (deck 0). */
function hand(moved){try{if(!S||S.dead||Q.length||S.mg||typeof deal!=="function")return;if(!moved&&deck&&deck.length)return;deal();E.stat.deal=(E.stat.deal|0)+1;if(!moved)render()}catch(e){console.error("thin E deal",e)}}
function gView(V){if(!on()||host()||!S||!V||!V.o)return;const k=bk();
 if(seen&&seen!==k){const [w0]=seen.split(":");if(+w0===(COOP.state.week||0)){used=0;popIdx=null;popMsg="";try{if(typeof curtain==="function"&&!S.dead){curtain();E.stat.curtain++}}catch(e){}}E.mine="";hand(true);try{render()}catch(e){}}
 /* her phone behind / ahead of her own buổi on the host (a reload rebuilt her week): the host's copy wins (buoi is the host's), once no patch is pending */
 {const P=V.o.P&&V.o.P[CW.seat],mx=Math.max(0,...(V.o.pq||[]).map(x=>x.n|0));if(P&&V.o.w===(COOP.state.week||0)&&typeof P.buoi==="number"&&P.buoi!==(S.buoi||0)&&P.buoi<=(typeof V.o.buoi==="number"?V.o.buoi:0)&&(S.thpn||0)>=mx&&!S.mg&&!Q.length){lg(["adopt",S.buoi,P.buoi]);S.buoi=P.buoi;used=0;popIdx=null;popMsg="";E.stat.adopt++;hand(true);try{render()}catch(x){}}}
 hand(false);
 seen=k;const e=V.o.e;try{CW.tnView(e)}catch(x){console.error(x)}
 /* the host reloaded after her ready (his page holds her ready in memory only): send it again, against his reloaded copy of her */
 if(e&&e.boot){if(E.boot&&E.boot!==e.boot&&E.mine===bk()){lg(["re-ready",E.boot,e.boot]);E.stat.reRd++;E.mine="";E.boot=e.boot;setTimeout(()=>{try{gReady()}catch(x){console.error(x)}},0)}else E.boot=e.boot}
 if(e&&typeof e.net==="number"){if(E.net!=null&&E.net!==e.net&&e.boot===E.boot&&E.mine&&E.mine===bk()){E.bs=null;E.last="";rr=1;E.stat.hNet=(E.stat.hNet|0)+1;lg(["host-net",E.net,e.net])}E.net=e.net}
 if(e&&e.go===wkx()&&CW.ngoW!==e.go&&(S.buoi||0)>=LAST()){CW.ngoW=e.go;E.stat.go++;lg(["go",e.go]);try{CW.nCheck()}catch(x){console.error(x)}}
 reNet();
 try{CW.lockNext()}catch(x){}}
COOP.on("thinview",V=>{try{gView(V)}catch(e){console.error("thin E view",e)}});
let wasMg=false;
if(typeof render==="function"){const f=render;render=function(){const r=f.apply(this,arguments);try{if(rr)reNet()/* net: her dialog was open at the view */}catch(e){}try{const mg=!!(S&&S.mg);const left=wasMg&&!mg;wasMg=mg;if(left&&on()&&!host()&&S&&!S.dead&&!Q.length){const V=TH.view;
  if(V&&V.o&&V.o.w===(COOP.state.week||0)&&typeof V.o.buoi==="number"&&V.o.buoi>(S.buoi||0)&&E.mine!==bk())gReady()}}catch(e){}return r}}
COOP.on("week",()=>{E.mine="";seen="";/* her ready for the NEW week may arrive before this event (race): keep it */const w=COOP.state.week||0;for(const k of Object.keys(E.rd))if((E.rd[k].w|0)<w)delete E.rd[k];E.hr="";E.forced=""});

/* ---------- HOST ---------- */
/* her ops onto her stored person (in her context: runDo); the part-D patch then starts after them (they are hers, never echoed back) */
TH.onDo("erd",a=>{a=a||{};const n=TH.pApply(S,Array.isArray(a.ops)?a.ops:[]);try{D.rebase()}catch(e){}E.stat.erd++;return {n}});
TH.onDo("ready",a=>{a=a||{};const seat=CW.ctx;
 /* behind the host (her step was owed while she played a mini game, or the owe was lost on a host reload, or her step was skipped):
    catch her up now, from the top of the event loop (review r1: not only on E.owe, which lives in host memory — her progress is never lost) */
 if(on()&&(a.w|0)===(COOP.state.week||0)&&TH.outerS&&(a.b|0)<((TH.outerS.buoi)||0)&&!busy){const Wo=E.owe;E.owe=null;busy=true;E.stat.up=(E.stat.up|0)+1;lg(["catch-up",a.b,!!Wo]);
  setTimeout(()=>{try{herStep(Wo||whereOut())}finally{busy=false;try{TH.flush()}catch(e){}try{CW.lockNext()}catch(e){}}},0);return {ok:1,up:1}}E.rd[seat]={w:a.w|0,b:a.b|0,at:Date.now()};lg(["her-ready",seat,a.w,a.b]);
 if((a.b|0)>=LAST()&&(a.w|0)===(COOP.state.week||0))CW.nfr=a.w|0;
 setTimeout(()=>{try{check();if((a.b|0)>=LAST())CW.nCheck()}catch(e){console.error(e)}},0);return {ok:1}});
function hReady(){if(!S||S.dead||Q.length||S.mg)return;const b=S.buoi||0;if(b>=LAST()){try{CW.nightReady()}catch(e){console.error(e)}return}
 E.hr=bk();lg(["host-ready",E.hr]);check();try{CW.lockNext();render()}catch(e){}}
CW.eNext=()=>{if(!on())return;if(host())hReady();else gReady()};
CW.eForce=()=>{if(!on()||!host()||!S||S.dead)return false;const b=S.buoi||0;if(b>=LAST())return false;E.forced=bk();E.stat.forced++;lg(["forced",E.forced]);check();return true};
let busy=false;
function check(){if(!on()||!host()||busy||!S||S.dead)return;const w=COOP.state.week||0,b=S.buoi||0;if(b>=LAST())return;const k=bk();
 const r=E.rd[other()];const her=!!(r&&r.w===w&&r.b===b)||E.forced===k;const me=E.hr===k||E.forced===k;
 if(!me||!her||Q.length||S.mg||CW.pend||CW.inLife)return;
 if(CW.isFrozen&&CW.isFrozen())return;
 busy=true;E.stat.step++;lg(["step",k,!!r]);
 /* the host's own buổi (world + his person) */
 CW.allow=true;try{nextBuoi()}catch(e){console.error("thin E own step",e)}finally{CW.allow=false}
 E.hr="";E.forced="";delete E.rd[other()];
 const Wh=whereOut();
 /* her clock ran out while she is in a mini game (not ready): her step waits until she is out of it (her ready then catches her up: owe) */
 if(!r&&CW.frPz&&CW.frPz()){E.owe=Wh;E.stat.owe++;lg(["owe",k]);busy=false;try{TH.flush()}catch(e){}try{CW.lockNext()}catch(e){}return}
 E.owe=null;
 setTimeout(()=>{try{herStep(Wh)}finally{busy=false;try{TH.flush()}catch(e){}try{CW.lockNext()}catch(e){}}},0)}
/* the host's NPC places, from his perspective → room form (his pid for "me"); her side maps them back in her context */
function whereOut(){if(!S||!S.where)return null;const W=X.mapMe(J(S.where),true,901);delete W["902"];return {W,menW:S.menW?J(S.menW):null}}
function whereIn(o){if(!o||!o.W)return;const W=X.mapMe(J(o.W),false,902);const keep=S.where&&S.where[901];S.where=W;if(keep)S.where[901]=keep;if(o.menW)S.menW=J(o.menW)}
let her=null;
/* F2 r2: her buổi step's screen effects travel in the host's view (o.eui = {n, ui}); her phone plays a NEW n once (the first view it sees
   only sets the mark: a reload / reconnect never replays an old step) */
E.eui=null;
{const hv=TH.hostView;TH.hostView=function(){const o=hv.apply(this,arguments);if(o&&E.eui)o.eui=E.eui;return o}}
{let seen=null;COOP.on("thinview",V=>{try{if(host()||!V||!V.o)return;const u=V.o.eui;if(seen==null){seen=u?u.n:0;return}if(!u)return;if(u.n<seen){seen=u.n;return}if(u.n===seen)return;seen=u.n;TH.uiPlay(u.ui)}catch(e){console.error("thin E ui",e)}})}
function herStep(Wh){const seat=other();let st=null;try{st=TH.seatOf(seat)}catch(e){}if(!st||!CW.on){E.stat.herSkip++;return}
 if(TH.held&&TH.held(seat)){E.stat.herSkip++;lg(["held",seat]);return}
 TH.withSeat(seat,()=>{if(!S||S.dead||S.mg){E.stat.herSkip++;return}const target=(TH.outerS&&TH.outerS.buoi)||0;
  her={W:Wh};const snap=wSnap();let n=0;
  /* F2 r2 (same family as her intents, Foreman B): her buổi step is played as solo (TH.tapRun: quiet off) — her buổi-event cards
     (card67, tdPop, Lỡ hẹn, Tin về chủ nhân …) go into HER Q → part-D cards on her phone, once; her floaters / toasts are captured and
     ride the view (E.eui, played once on her phone); nothing draws on the host (screenOff) */
  let T=null;try{T=TH.tapRun(()=>{while(((S.buoi||0)!==target)&&n<4&&!S.dead){const b0=S.buoi||0;CW.allow=true;try{nextBuoi()}finally{CW.allow=false}n++;if((S.buoi||0)===b0)break}})}
  catch(e){console.error("thin E her step",e)}finally{her=null;try{wRestore(snap)}catch(e){console.error("thin E restore",e)}}
  if(T&&T.ui){E.eui={n:((E.eui&&E.eui.n)|0)+1,ui:T.ui}}
  E.stat.her+=n;lg(["her-step",target,S.buoi,n])})}
/* in her step: no NPC acts again (his step rolled them, with her entry in the harem), her places = his, no host screen work */
if(typeof rivalsBuoi==="function"){const f=rivalsBuoi;rivalsBuoi=function(){if(her&&CW.ctx)return "";return f.apply(this,arguments)}}
if(typeof placeWhere==="function"){const f=placeWhere;placeWhere=function(){if(her&&CW.ctx){whereIn(her.W);try{if(CW.keepFriendPos)CW.keepFriendPos();CW.refreshHere()}catch(e){}return}/* coop-arrive-see: the host's place, not the copied one */return f.apply(this,arguments)}}
if(typeof curtain==="function"){const f=curtain;curtain=function(){if(CW.ctx)return;return f.apply(this,arguments)}}
/* her Kỳ nguyệt sự answer (jcoopworld cySend at eW(): the intent replaces the ctm-p2 "cyb" relay): into her stored person (runDo: S = hers),
   CW.fcy for the draw's wait; then the host's held draw runs (cyFree) */
TH.onDo("cyb",m=>{m=m||{};if(typeof m.w!=="number"||!S)return {n:0};const c=plain(m.c)?m.c:{};S.cyb=S.cyb||{};for(const k of Object.keys(c))S.cyb[k]=c[k];
 CW.fcy={w:m.w,c,pend:!!m.pend,life:m.life||0};E.stat.cyb++;lg(["cyb",m.w,!!m.pend]);setTimeout(()=>{try{CW.cyFree()}catch(e){console.error(e)}},0);return {n:1}});
/* HER night (rows 8/9): the host's night is hers (his week draw, or his own in-week change; never her own claim, which runs on her phone as
   her act): the summons card (Kính sự phòng) is built in HER context on the host, a part-D card; her picks (prep → night1 → night2 →
   nightFx) run there too, so her night's Sủng / Ân tình / pregnancy and S.toMorning are written on the host and reach her as the patch;
   on her phone jnight then ends her day through her ready (COOPW.nightEnd → CW.eNext). Once per week. */
CW.herNight=()=>{if(!on()||!host()||CW.ctx)return;const w=COOP.state.week||0;if(E.nk===w)return;E.nk=w;E.stat.night++;lg(["her-night",w]);
 D.later(other(),()=>{if(!S||S.dead||S.out)return;const had=S.tonight==="me";S.tonight="me";try{if(typeof ntTake==="function")ntTake(S)}catch(e){}
  if(!had)try{pushDil(mkP("ksp"),"Kính sự phòng báo tin")}catch(e){console.error("thin E ksp",e)}})};
COOP.on("week",()=>{if(on()&&host())setTimeout(()=>{try{if(CW.tnHer())CW.herNight()}catch(e){console.error(e)}},0)});
/* E-fix 'cyAsk on host' (Foreman B 18/11): her Kỳ nguyệt sự card. Her flip (jcycle cyAsk) ran only on her phone inside her week-end world
   frame, so the card and its flags were dropped (coop-cyc). At level 5+ the HOST asks it in her context b (jcycle cyAsk → pushDil cyrep →
   part-D card on her phone), her pick runs there (do pick), her stored person holds S.cyb (the one fact; the patch brings it to her phone),
   and the host's held draw (jcoopworld cyWait / cyFree) runs once she has answered. Her phone never asks it (cyAsk = false on the guest). */
CW.herCy=g=>{if(!on()||!host()||CW.ctx||E.cyA===g)return;E.cyA=g;E.stat.cyA=(E.stat.cyA|0)+1;lg(["her-cy",g]);
 D.later(other(),()=>{let asked=false;try{asked=!!(S&&!S.dead&&typeof window.cyAsk==="function"&&window.cyAsk())}catch(e){console.error("thin E cy",e)}
  if(asked)E.cyR=g;else{D.after(()=>{CW.cyNo=g;try{CW.cyFree()}catch(e){console.error(e)}})}})};
/* coop-thin-g-f1 (F1, permanent week stall at L13): the host's draw waits (cyHold) on her answer, so nothing that ends the wait may be lost.
   (1) her card can be gone with no answer (her ✕ = pick -1, a stale pick, a card lost with her store): the ask ran (E.cyR), the card is not
   in her open cards, nothing waits deferred for her seat → ask again (the card comes back on her phone; her maid gone / no cycle = cyNo).
   (2) her answer is a PICK on the host (her cyb intent is off at eW), which never woke the held draw: jcoopthin pick → cyFree; + a 1 s
   check in jcoopworld while the draw is held. */
CW.cyLost=g=>{if(!on()||!host()||CW.ctx||E.cyA!==g||E.cyR!==g)return false;const s=other();if(TH.held(s)||(D.DF[s]||[]).length)return false;
 let st=null;try{st=TH.seatOf(s)}catch(e){}const q=st&&st.S&&st.S.thq;return !(Array.isArray(q)&&q.some(c=>c&&c.pid==="cyrep"))};
CW.cyReask=g=>{let st=null;try{st=TH.seatOf(other())}catch(e){}const c=st&&st.S&&st.S.cyb;if(c&&c.df===g)delete c.df;E.cyA=null;E.cyR=null;
 E.stat.cyRe=(E.stat.cyRe|0)+1;lg(["cy-reask",g])};
window.cyHostOwns=()=>on()&&((!host()&&!CW.ctx)||!!CW.gWk/* part G: her week end on the host takes her phone's branch (neither asks nor auto-answers); the host's own flip asks it after (cyWait → herCy) */);
/* in her context on the host her card waits as a part-D card (S.thq), not in Q: it is still open, so her week end must not answer it for her */
window.cyCardOpen=()=>{try{return on()&&!!CW.ctx&&Array.isArray(S.thq)&&S.thq.some(c=>c&&c.pid==="cyrep")}catch(e){return false}};/* jcycle: her phone neither asks the card nor auto-answers it at her week end (her flags come in the host patch) */
/* world windows' end() on HER household (ORDER s34 16:22Z, reports/coop-thin-c.md 'For part E'): the host's worldTick ends a window for the
   world and his own household (jworld2 EVD.<k>.end → EVD.<k>.home for S); her household (her choice S.wwMe in her person) runs the same
   EVD.<k>.home in her context (D.later: from the top of the event loop), with the world's outcome the end found (vu cổ: the culprit), so the
   result is the one fact and reaches her phone as a part-D patch. Today: vuco (her accusation), trom (her greedy servants), phong (her aged maids). */
{const X2=window.WORLD_X,EV=X2&&X2.EVD;
 if(EV){for(const k of ["vuco","trom","phong"]){const ev=EV[k];if(!ev||typeof ev.end!=="function"||typeof ev.home!=="function")continue;const f=ev.end;
   ev.end=function(w){if(!(on()&&host()&&!CW.ctx&&w))return f.apply(this,arguments);
    /* the outcome her household needs = exactly what end() hands its own home(): vu cổ's culprit id, read when end() calls home (review r1:
       a punish() hook also caught the innocent scapegoat punished AFTER home, so her accusation of the scapegoat counted as a hit for her only) */
    let got=null,gotFr=false;const h0=ev.home;ev.home=function(w2,o){if(o){if(o.got!=null)got=o.got;if(o.me)gotFr=true}return h0.apply(this,arguments)};
    let r;try{r=f.apply(this,arguments)}finally{ev.home=h0}
    const wc=J(w),seat=other();E.stat.wwEnd++;lg(["ww-end",k,w.id,got,gotFr]);
    D.later(seat,()=>{if(!S||S.dead)return;try{ev.home(wc,{got,gotFr})}catch(e){console.error("thin E ww home",k,e)}});return r}}
  /* vu cổ: she is the culprit (her entry on the host): her own choice ("clean" / "open") read from her person */
  if(EV.vuco)EV.vuco.meOf=(w,key)=>{try{if(!on()||!host())return undefined;const B=TH.seatOf(other());const M=B&&B.S&&B.S.wwMe;return M&&M[w.id]?M[w.id][key]:undefined}catch(e){return undefined}}}}
/* a HOST reload: his copy of her person (her store) is rebuilt from the week's base, which knows none of her buổi steps this week (her
   step would run again from buổi sáng). Her store is kept per room with D's cards / patches (D.save, after every withSeat) and taken
   back once per store when it is the same week, seat and life. */
const ELS=()=>"ctm-thin-e:"+(COOP.state.room||"");
{const sv=D.save;D.save=function(){const r=sv.apply(this,arguments);try{if(on()&&host()){const seat=other();const B=TH.seatOf(seat);
  if(B&&B.S&&B.wk===(COOP.state.week||0))localStorage.setItem(ELS(),JSON.stringify({w:B.wk,seat,life:B.S.life||0,name:B.S.name||"",S:B.S}))}}catch(e){}return r}}
{const so=TH.seatOf;TH.seatOf=function(seat){const B=so.apply(this,arguments);try{if(B&&!B.eL&&on()&&host()&&seat===other()){B.eL=1;B.wk=COOP.state.week||0;/* the week this store was built in (a save after the week merged, before the store is rebuilt, is the OLD week: never saved) */
  const o=JSON.parse(localStorage.getItem(ELS())||"null");
  if(o&&o.S&&o.seat===seat&&o.w===(COOP.state.week||0)&&(o.life||0)===(B.S.life||0)&&(o.name||"")===(B.S.name||"")&&(o.S.buoi||0)>=(B.S.buoi||0)){
   const thq=B.S.thq;B.S=o.S;if(thq)B.S.thq=thq;E.stat.hostBack++;lg(["her-back",o.w,o.S.buoi])}
  /* her buổi is never ahead of the room's (= the host's): the week's base carries the buổi she ended the last week in (tối) */
  const Sh=CW.ctx?TH.outerS:S,hb=(Sh&&Sh.buoi)||0;if((B.S.buoi||0)>hb){lg(["clamp",B.S.buoi,hb]);B.S.buoi=hb;E.stat.clamp++}}}catch(e){console.error("thin E her back",e)}return B}}
/* ---------- the world is read-only in her step (put back at its end) ---------- */
const ROWF=new Set(["rel","oan","ghen","ev"]);
/* one field as text; other NPCs / S inside it are written as refs so the copy never drags the world along */
function txt(v,root,R){try{return JSON.stringify(v,function(k,x){if(x&&typeof x==="object"&&x!==root&&this!==undefined&&(R.has(x)||x===S))return {$r:x===S?"S":x.id};return typeof x==="function"?undefined:x})}catch(e){return null}}
function back(t,R){const byId=new Map();for(const r of R)byId.set(r.id,r);return JSON.parse(t,(k,x)=>x&&typeof x==="object"&&!Array.isArray(x)&&Object.keys(x).length===1&&"$r" in x?(x.$r==="S"?S:byId.get(x.$r)||null):x)}
function wSnap(){const L=npcs(),R=new Set(L);const o={L:L.slice(),ids:L.map(r=>r.id),N:new Map(),W:{},rid};
 for(const r of L){const m={};for(const k of Object.keys(r))m[k]=txt(r[k],r,R);o.N.set(r,m)}
 for(const k of X.W_KEYS)o.W[k]=k in S?txt(S[k],null,R):undefined;return o}
function persOf(k,v){if(!plain(v))return null;if(k==="emp")return "known" in v?{known:v.known}:null;
 if(k==="cm"){const p={};for(const f of X.CM_P)if(f in v)p[f]=v[f];return p}
 if(k==="men"&&Array.isArray(v)){const p={};for(const x of v)if(plain(x)&&x.id!=null){const q={};for(const f of X.MEN_P)if(f in x)q[f]=x[f];p[x.id]=q}return p}return null}
function persBack(k,v,p){if(!p||!plain(v))return;if(k==="men"&&Array.isArray(v)){for(const x of v)if(plain(x)&&p[x.id]){for(const f of X.MEN_P)delete x[f];Object.assign(x,p[x.id])}return}
 if(k==="cm")for(const f of X.CM_P)delete v[f];if(k==="emp")delete v.known;Object.assign(v,p)}
function wRestore(o){const L=npcs(),R=new Set(L.concat(o.L));
 /* persons her step added to the world / took out of it */
 for(const r of L)if(!o.N.has(r)){const i=rivals.indexOf(r);if(i>=0){rivals.splice(i,1);E.stat.addDrop++;lg(["add-drop",r.id,r.name])}}
 o.L.forEach((r,i)=>{if(!rivals.includes(r)){rivals.splice(Math.min(i,rivals.length),0,r);E.stat.rmBack++}});
 for(const r of o.L){const m=o.N.get(r);
  for(const k of new Set([...Object.keys(m),...Object.keys(r)])){if(ROWF.has(k))continue;const now=k in r?txt(r[k],r,R):undefined;if(now===m[k])continue;
   const me=plain(r[k])&&!Array.isArray(r[k])&&typeof r[k].me==="number"?r[k].me:undefined;
   if(m[k]===undefined)delete r[k];else if(m[k]!==null)r[k]=back(m[k],R);
   if(me!==undefined&&plain(r[k]))r[k].me=me;E.stat.wrR++}}
 for(const k of X.W_KEYS){const was=o.W[k];const now=k in S?txt(S[k],null,R):undefined;if(now===was)continue;
  const p=persOf(k,S[k]);if(was===undefined)delete S[k];else if(was!==null){S[k]=back(was,R);persBack(k,S[k],p)}E.stat.wrW++;lg(["w-back",k])}
 if(rid!==o.rid){rid=o.rid;E.stat.ridBack++}}
E.wSnap=wSnap;E.wRestore=wRestore;
/* the night: his go rides the view (the guest reads o.e.go), never the ctm-nr relay */
/* boot: this page load of the host (a host reload loses her ready, held in memory: her phone sends it again when boot changes) */
const BOOT=Date.now().toString(36)+Math.random().toString(36).slice(2,6);
/* review coop-thin-f1 r1 #3 (net, the HOST's side): his socket can look open while it is dead too; her erd + ready relayed to it are lost
   (the Worker took them, no "nohost"), he reconnects and the room stood (coop-cyc THIN=6: host 'room 2.0', her ready 2:1 never arrived,
   both on "Chờ hảo hữu…"). Each reconnect of his counts in the view (net); her phone, still waiting on that buổi, sends her ready again
   against his copy of her (the same re-net path as her own reconnect: nothing doubled, his ready is idempotent). */
let HNET=0;COOP.on("room",()=>{if(host())HNET++});/* the new count reaches her in the snapshot jcoopthin sends when his level is back (snapNow) */
{const hv=TH.hostView;TH.hostView=function(){const o=hv.apply(this,arguments);if(o&&on()){o.e={go:CW.ngo===(COOP.state.week||0)?CW.ngo:-1,w:COOP.state.week||0,tnb:CW.tnb|0,boot:BOOT,net:HNET}}return o}}
/* her in-week change of the night (Tranh sủng, Chặn ngự giá, cáo bệnh …): the intent replaces the ctm-tn claim; runs in the host's context */
TH.onDo("tn",(a,m)=>{const base=m&&m.base;E.stat.tn++;setTimeout(()=>{try{CW.tnDo(a,base)}catch(e){console.error("thin E tn",e)}},0);return {ok:1}});
/* the OUTERMOST nextBuoi (this module is the last one): 12 modules after jcoopworld wrap nextBuoi with after-step work (jexam exTick,
   jpromo prCheck, jclose greet / wxSync, jstory lapse, jlooks sweep, jgift, jfe, jkc/jkc2, jspread, jweather, jaudit). #next calls the
   outer chain, so a "Sẵn sàng" press that steps nothing ran all of it once more on each seat (the real step runs it again: on the host for
   him, and in her context for her). At level 5 a press is only the intent; the chain runs only inside a real step (CW.allow: his step /
   her step in withSeat; CW.allowN: the night's go = her week end). */
if(typeof nextBuoi==="function"){const f=nextBuoi;nextBuoi=function(){if(!(on()&&CW.on)||CW.allow||CW.allowN)return f.apply(this,arguments);E.stat.press++;
  if((CW.isWaiting&&CW.isWaiting())||(CW.isFrozen&&CW.isFrozen())||CW.pend||!CW.base)return;return CW.eNext()}}
/* his ready / clock / a closed dialog: try the step again */
if(typeof render==="function"){const f=render;render=function(){const r=f.apply(this,arguments);try{if(on()&&host()&&!CW.ctx&&(E.hr||E.forced))check()}catch(e){}return r}}
}catch(e){console.error("jcoopthine",e)}})();
