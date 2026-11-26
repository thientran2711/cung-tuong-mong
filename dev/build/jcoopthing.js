/* jcoopthing: CO-OP THIN GUEST, part G = THE WEEK END (endTurn + her personal month) ON THE HOST FOR BOTH SEATS (review/coop-thin-g; audit
   dev/handover/reports/coop-thin-guest-audit.md §3 row G; report dev/handover/reports/coop-thin-g.md; owner 17/11 ~01:15Z: thin guest, option 2
   only, "each part moved to 2 drops the guest's own computation for good"). Behind the room level: TH.on(13), on only when BOTH seats run a
   build with it (Worker: level = min(want, cap a, cap b) ≤ THINMAX 13). Solo and rooms below level 13 run nothing here.

   HOST, at the night's go (jcoopworld nCheck → CW.gNight): HER week end runs first, in withSeat("b") on her store (TH.seatOf b, the one copy
     of her person), from the top of the event loop, on the same pre-week world her phone used to see:
       - the real chain (nextBuoi under CW.allowN → endTurn → monthTick and every module's wrapper), with CW.gWk set, so coopGuest() /
         worldOn() read "guest side": every guard that kept her phone's week end out of the world (jcoopone MUTE / ONLY_ME / PERSON, the
         inline worldOn checks, the seat-guard family) takes the same branch it took on her phone;
       - every write of it into the world (NPC entries, the NPC list, the world keys of S, rid) is put back after (part E's wSnap / wRestore,
         the same rule as part C's lens on her phone); rivalsBuoi / placeWhere do not run again (his step rolls the NPCs; her places = his);
       - her cards (dawn dialogs, monthly cards) go into her Q → part-D cards on her phone; her screen effects (toasts, sounds, floaters) are
         captured (TH.tapRun) and ride the view (E.eui), played once on her phone;
       - an ending (death, leaving the palace) is only flagged (S.dead + S.coopOver): her phone plays over() from the week (lifeSave /
         Sổ luân hồi on HER device); no device ledger of hers is written on the host's device (store.set / localStorage writes inside her
         week end are kept off it and logged: G.dev);
     then his own night + week end; his `end` waits until her week end ran and her cards are answered (CW.gHold). His toCanon writes P.b
     from her store (CW.gBlob) + his acts on her stand-in as deltas (jcoopworld toCanon). The Worker takes the host's C alone (no merge3).
   AT `week` (jcoopworld onWeek → CW.gEmp, before his own reign ending): her reign ending (G5, emperorDies with the OLD Emperor still the
     world's), her seat-cap check (G20, seatWeek with her stats right after her week end = S.gMine), her NPC places = his; written back to
     her store + CW.base.P.b (so a later rebuild keeps them) + the part-D patch.
   GUEST: on the go her phone runs nothing (jcoopworld nCheck gG()): #next locked until the host's week; no `end`, no seat copy, no restore
     of her own week, no re-end. The week (fromCanon of the host's C) = apply the host's snapshot.
   Retired at level 13 (bypassed through gW() / gG(); deleted when level 13 is the default, part H): her local week end, her `end` + sub-b,
   merge3 for her, guestNet, the guest's seat copies, the guest's empWeek / seatWeek / re-end / CW.restore of her week.
   API: TH.G = {on, stat, done, herWeek(probe), dev (device writes kept off the host), log}. */
(function(){try{
const CW=window.COOPW;if(!CW||!CW.thin||!CW.X||typeof COOP!=="object")return;
const TH=CW.thin,X=CW.X,J=X.J,D=TH.D,E=TH.E,LV=13;
if(!E||!E.wSnap)return;
const host=()=>CW.seat==="a",on=()=>TH.on(LV);
const other=()=>CW.seat==="a"?"b":"a";
const G=TH.G={on,stat:{week:0,skip:0,hold:0,emp:0,seat:0,where:0,dev:0,err:0,ms:0,blob:0,colSkip:0},done:{},dev:[],devKeys:{},log:[],ms:[]};
const lg=x=>{G.log.push(x);if(G.log.length>80)G.log.shift()};
const wkR=()=>COOP.state.week||0;
const MINE=["sung","danh","bac","suc","sac","tai","tamco","duc","th","hh","rank"];

/* ---------- device ledgers: never the host's device inside her week end ---------- */
/* her per-device books (Sưu tầm cung-colms, Sổ luân hồi, cung-kiep, event / arc histories …) live on HER phone; a write from her week end
   on the host would land in the HOST's storage. Inside CW.gWk every localStorage write is kept off (logged in G.dev); the room's own
   bookkeeping keys (ctm-thin*, ctm-f6b*, ctm-coop*) are the host's and still write. FOR H: replay these on her phone. */
const OWN=/^(ctm-thin|ctm-f6b|ctm-coop)/;
const devOff=k=>!!(CW.gWk&&CW.ctx&&host()&&!OWN.test(String(k)));
const devLog=(op,k)=>{G.stat.dev++;G.devKeys[k]=(G.devKeys[k]||0)+1;G.dev.push([op,String(k),wkR()]);if(G.dev.length>60)G.dev.shift()};
try{const P=Storage.prototype,si=P.setItem,ri=P.removeItem;
 P.setItem=function(k,v){if(this===window.localStorage&&devOff(k)){devLog("set",k);return}return si.apply(this,arguments)};
 P.removeItem=function(k){if(this===window.localStorage&&devOff(k)){devLog("rm",k);return}return ri.apply(this,arguments)}}catch(e){console.error("thin G dev",e)}
/* Sưu tầm (jcol colCheck, endTurn + render wrappers): never in her context on the host (its ledger is per device, f6.md family 6);
   her phone's own render-time check keeps her collection and her device ledger */
if(typeof colCheck==="function"){const f=colCheck;colCheck=function(){if(CW.on&&CW.ctx&&host()){G.stat.colSkip++;return}return f.apply(this,arguments)}}

/* r1: every part-D patch of hers, by number (the last 60): one made after his `end` is put on the new C at the week (CW.gEmp) */
const PREC={};{const po=D.patchOut;D.patchOut=function(seat,p){const r=po.apply(this,arguments);try{if(on()&&host()){const L=PREC[seat]=PREC[seat]||[];L.push({n:D.N[seat],p});if(L.length>60)L.shift()}}catch(e){}return r}}
/* ---------- her week end on the host ---------- */
let hw=false;/* inside her week end (her step's E wrappers: no NPC acts again, her places = his) */
if(typeof rivalsBuoi==="function"){const f=rivalsBuoi;rivalsBuoi=function(){if(hw&&CW.ctx)return "";return f.apply(this,arguments)}}
if(typeof placeWhere==="function"){const f=placeWhere;placeWhere=function(){if(hw&&CW.ctx)return;return f.apply(this,arguments)}}
function whereIn(o){if(!o||!o.W||!S)return;const W=X.mapMe(J(o.W),false,902);const keep=S.where&&S.where[901];S.where=W;if(keep)S.where[901]=keep;if(o.menW)S.menW=J(o.menW)}
function whereOut(A){if(!A||!A.where)return null;const W=X.mapMe(J(A.where),true,901);delete W["902"];return {W,menW:A.menW?J(A.menW):null}}
/* coop-afk-l13: a card the AFK bound carried this week (c.cw = the week, jcooptimer gAfk) stays on her seat but holds the room no more */
const herOpen=c=>!!c&&c.cw!==wkR();
function herFree(){const st=TH.seatOf(other());if(!st)return true;const q=st.S&&st.S.thq;return !(Array.isArray(q)&&q.some(herOpen))&&!(CW.frPz&&CW.frPz())}
/* coop-afk-l13 (jcooptimer gAfk = the ONE AFK bound, BAL.coopTm.nightMs): the room's committed night waits on HER open cards — at the go
   (CW.gNight) or for his `end` (CW.gHold). own = the pids with their own clock (never waited out here) */
function herCards(){let st=null;try{st=TH.seatOf(other())}catch(e){}const q=st&&st.S&&st.S.thq;return Array.isArray(q)?q:[]}
CW.gWait=function(own){if(!on()||!host()||CW.ctx||!CW.on||!S||S.dead)return false;const w=wkR();if(CW.ngoW!==w||CW.sent===w)return false;
 if(TH.held&&TH.held(other()))return false;return herCards().some(c=>herOpen(c)&&!(own||[]).includes(c.pid))};
/* the bound ran out: her open cards with NO ANSWER (jcooptimer's mapping): night = the pids answered «no answer» by no(m) in her context
   (the card leaves her list, its patch reaches her phone), own = untouched, any other = carried (kept on her seat, unanswered) */
CW.gAfk=function(own,night,no){if(!on()||!host()||CW.ctx)return 0;const w=wkR(),seat=other(),L=herCards();let car=0,nn=0;
 for(const c of L){if(!herOpen(c)||(own||[]).includes(c.pid))continue;
  if(c.pid&&(night||[]).includes(c.pid)){nn++;const id=c.id;D.later(seat,()=>{D.hold(S);const i=S.thq.findIndex(x=>x&&x.id===id);if(i<0)return;const x=S.thq.splice(i,1)[0];
    let m=null;try{const d=mkP(x.pid,x.pp||{});if(d)m={t:x.t,h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp}}catch(e){console.error(e)}if(m)try{no(m)}catch(e){console.error(e)}});continue}
  c.cw=w;car++}
 G.stat.afk=(G.stat.afk|0)+car+nn;lg(["afk",w,car,nn]);try{D.save()}catch(e){}try{TH.flush()}catch(e){}
 setTimeout(()=>{try{CW.nCheck()}catch(e){}try{CW.soonEnd&&CW.soonEnd()}catch(e){}},0);return car+nn};
/* the host's stand-in in her context (his entry in her world, withSeat standIn): her week end is a WORLD frame on her phone (part C lens: every
   write into the world, the friend entry included, is dropped at its end), so nothing it does to his entry may reach him through the bridge
   (withSeat's finally copies the stand-in's STAT / rel / oan / new items to the host). Put back before the context closes. */
const SBK=["inv","ill","alive","out","rank","queen","cold"];
function standSnap(){const v=(rivals||[]).find(x=>x&&x.coop&&x.__b);if(!v)return null;const o={v,m:{}};for(const k of X.STAT.concat(["rel","oan","ghen","ev"],SBK))o.m[k]=k in v?J(v[k]):undefined;return o}
function standBack(o){if(!o)return;const v=o.v;let n=0;for(const k in o.m){const was=o.m[k];if(JSON.stringify(v[k])===JSON.stringify(was))continue;n++;if(k==="inv"&&Array.isArray(was)){v.inv=(v.__inv0||[]).slice()}else if(was===undefined)delete v[k];else v[k]=J(was)}if(n){G.stat.standBack=(G.stat.standBack|0)+n;lg(["stand-back",n])}}
/* probe = the perf / test probe: run it on the current store, nothing marked done */
function herWeek(probe){const seat=other();let st=null;try{st=TH.seatOf(seat)}catch(e){}
 if(!st||!CW.on||(TH.held&&TH.held(seat))){G.stat.skip++;lg(["skip",wkR(),!st]);return false}
 const t0=performance.now();let ran=false;
 TH.withSeat(seat,()=>{if(!S||S.dead||S.mg){G.stat.skip++;lg(["skip-dead",wkR()]);return}
  const snap=E.wSnap();const sb0=standSnap();hw=true;CW.gWk=true;let T=null;
  const fl={pend:CW.pend,news:CW.news,inTurn:CW.inTurn,sent:CW.sent,nfr:CW.nfr};
  const L=typeof B4L==="number"?B4L:2,d0=JSON.stringify([S.year,S.month,S.tuan]);
  try{T=TH.tapRun(()=>{
   /* her store behind the room's tối (never in the real flow: E steps her with him; the probe / a lost step): her day steps first */
   let n=0;while((S.buoi||0)<L&&n<4&&!S.dead){const b0=S.buoi||0;CW.allow=true;try{nextBuoi()}finally{CW.allow=false}n++;G.stat.behind=(G.stat.behind|0)+1;if((S.buoi||0)===b0)break}
   if(!S.dead){CW.allowN=true;try{nextBuoi()}finally{CW.allowN=false}}});ran=JSON.stringify([S.year,S.month,S.tuan])!==d0;if(!ran)G.stat.noEnd=(G.stat.noEnd|0)+1}
  catch(e){G.stat.err++;console.error("thin G her week",e)}
  finally{hw=false;CW.gWk=false;for(const k in fl)CW[k]=fl[k];try{E.wRestore(snap)}catch(e){console.error("thin G restore",e)}try{standBack(sb0)}catch(e){console.error("thin G stand-in",e)}}
  try{const m={};for(const k of MINE)m[k]=S[k];S.gMine=m}catch(e){}
  if(T&&T.ui){E.eui={n:((E.eui&&E.eui.n)|0)+1,ui:T.ui}}
  lg(["her-week",wkR(),S.tuan,S.month,S.dead?"dead":"",Q.length])});
 const ms=performance.now()-t0;G.ms.push(+ms.toFixed(1));if(G.ms.length>30)G.ms.shift();if(!probe)G.stat.week++;return ran}
G.herWeek=herWeek;
let busy=false,pollT=0;
/* jcoopworld nCheck (host, at the go): true = her week end is not done yet (it runs now or waits for her open cards / mini game) */
CW.gNight=function(w){if(!on()||!host()||CW.ctx)return false;const k=wkR();if(G.done[k])return false;if(busy)return true;
 if(!herFree()){G.stat.hold++;if(!pollT)pollT=setTimeout(()=>{pollT=0;try{CW.nCheck()}catch(e){}},500);return true}
 busy=true;lg(["go",k,w]);
 setTimeout(()=>{try{herWeek(false)}catch(e){G.stat.err++;console.error("thin G",e)}finally{busy=false;G.done[k]=true;try{TH.flush()}catch(e){}try{CW.nCheck()}catch(e){console.error(e)}}},0);return true};
/* jcoopworld sendEnd (host): his `end` waits for her week end and for her answers to its cards */
CW.gHold=function(){if(!on()||!host())return false;const k=wkR();if(!G.done[k])return true;if(!herFree()){if(!pollT)pollT=setTimeout(()=>{pollT=0;try{CW.soonEnd&&CW.soonEnd()}catch(e){}},500);return true}return false};
/* jcoopworld toCanon (host): P.b = her store as a blob (myBlob form: personal keys, empKnown / cmP / menP, no heir / thq) */
CW.gBlob=function(){if(!on()||!host())return null;const seat=other();let st=null;try{st=TH.seatOf(seat)}catch(e){}if(!st||!st.S)return null;
 const s=J(st.S);for(const k of X.W_KEYS)delete s[k];delete s.heir;delete s.thq;
 /* r1: the part-D patches up to here are in this blob: her phone, rebuilt from it at the week, applies only the later ones (n > thpn) */
 s.thpn=(D.N&&D.N[seat])||0;
 const p=st.pers||{};s.empKnown=(p.kn&&p.kn[0])||{};s.cmP=J(p.cm||{});s.menP=J(p.men||{});G.stat.blob++;
 return {pid:902,ok:st.ok||(s.origin&&s.origin.k)||"tt",name:s.name,rank:s.rank,dead:!!s.dead,srv:!!(s.srv&&!s.srv.risen),life:st.life||0,S:s}};
/* jcoopworld onWeek (host, before his own reign ending): her reign ending, her seat-cap check, her places = his. The store is rebuilt from the
   new C first; what this run changes is written into CW.base.P.b too (a later rebuild of the store keeps it) */
CW.gEmp=function(){if(!on()||!host()||CW.ctx||!CW.base||!CW.base.P||!CW.base.P[other()])return;const seat=other();
 /* r1 (seat desync): a part-D patch made AFTER his `end` (a late run in her context between his end and the server's week) is not in the new
    C; her phone applies it on top of C (n > the blob's thpn), so the host puts it on the C copy he rebuilds her store from, in the same order */
 try{const s0=CW.base.P[seat].S;if(s0&&!(TH.held&&TH.held(seat))){const n0=s0.thpn|0;const R=(PREC[seat]||[]).filter(x=>x.n>n0);let k=0;
  for(const x of R){TH.pApply(s0,x.p);s0.thpn=x.n;k++}
  /* one she already acked before the week was applied on her OLD S (fromCanon replaced it): it goes back into the queue so her phone applies it on C */
  const L=D.PQ[seat]=D.PQ[seat]||[];const have=new Set(L.map(x=>x.n));for(const x of R)if(!have.has(x.n))L.push({n:x.n,p:x.p});L.sort((a,b)=>a.n-b.n);
  if(k){G.stat.late=(G.stat.late|0)+k;lg(["late-patch",wkR(),n0,k])}}}catch(e){console.error("thin G late patch",e)}
 try{TH.seatDrop(seat)}catch(e){}let st=null;try{st=TH.seatOf(seat)}catch(e){}if(!st||(TH.held&&TH.held(seat)))return;
 const Wh=whereOut(S);let ch=false;
 TH.withSeat(seat,()=>{if(!S||S.dead)return;const snap=E.wSnap();CW.gWk=true;const m0=CW.mine;
  try{TH.tapRun(()=>{
   const d=S.emp&&S.emp.dead;if(d&&d.w===(typeof wk==="function"?wk():0)){const r0=S.dead;if(CW.empWeek()){G.stat.emp++;ch=true;lg(["emp",wkR(),!!S.dead,r0])}}
   if(!S.dead&&S.gMine){CW.mine=S.gMine;const r=S.rank;try{CW.seatWeek()}catch(e){console.error(e)}if(S.rank!==r){G.stat.seat++;ch=true;lg(["seatcap",r,S.rank])}}
   if(Wh){whereIn(Wh);try{CW.refreshHere()}catch(e){}G.stat.where++;ch=true}})}
  catch(e){G.stat.err++;console.error("thin G emp",e)}
  finally{CW.gWk=false;CW.mine=m0;try{E.wRestore(snap)}catch(e){console.error("thin G restore",e)}}});
 if(ch)try{const b=CW.gBlob();if(b){const P=CW.base.P[seat];b.pid=P.pid||b.pid;CW.base.P[seat]=b}}catch(e){console.error(e)}};
/* ---------- world windows' cards (Lễ Phật đản, Vạn thọ, quyên bạc cứu đói … jworld EVD.<k>.card): built on the host in HER context ----------
   Until level 13 her phone built them itself (jworld render hook → worldShow) and her answer ran on her phone's S, which reached the room
   through her `end`. At level 13 her phone sends no week: that answer was a LOCAL write the host never saw (coop-thin-g #2: Cúng dường
   hậu hĩnh = her phone −40 bạc, Thái hậu +5; Dâng lễ vật vừa phải = −20 bạc, Sủng +3; both undone by the next week's snapshot = her choice
   lost). Now: her phone builds none (wwGuestOff); the host runs worldShow in her context whenever the world has a window (or an end
   note) her store has not seen; a card with options goes out as the pid card "wwc" (jworld PEND.wwc, rebuilt from the window id at her
   pick, run in her context: fx / go / her rows through part D's patch), a note as a part-D note. Solo and levels ≤ 12: unchanged. */
window.wwPid=()=>on()&&!!CW.ctx&&host();
window.wwGuestOff=()=>on()&&CW.on&&!host()&&!CW.ctx;
let wwAsk=false;
function wwHers(){if(!on()||!host()||CW.ctx||!CW.on||wwAsk||typeof worldWin!=="function"||typeof worldShow!=="function")return;const seat=other();let st=null;try{st=TH.seatOf(seat)}catch(e){}
 if(!st||!st.S||st.S.dead||(TH.held&&TH.held(seat)))return;const seen=st.S.wwSeen||{},ended=st.S.wwEnd||{};let need=false;
 try{for(const w of worldWin())if(w&&!seen[w.id]){need=true;break}const z=S.wwin;if(!need&&z&&Array.isArray(z.H))for(const h of z.H)if(h&&h.id!=null&&h.end&&seen[h.id]&&!ended[h.id]){need=true;break}}catch(e){return}
 if(!need)return;wwAsk=true;G.stat.ww=(G.stat.ww|0)+1;
 D.later(seat,()=>{wwAsk=false;if(!S||S.dead||S.mg)return;try{worldShow()}catch(e){console.error("thin G world cards",e)}})}
{const r0=render;render=function(){idNow();const r=r0.apply(this,arguments);try{wwHers()}catch(e){console.error("thin G ww",e)}return r}}
/* ---------- her cards with options and no pid (the whole family; worker #2) ----------
   Part D keeps a card only as a pid (rebuilt at her pick) or as a note: a card with handlers and no pid raised in her context was DROPPED
   (D.bad; seen in her week end on the host: «Hội phối đồ: báo đề» jts tsPanel, «Một ánh mắt» j24 manPoem …). Until level 13 her phone
   raised them in her own week end and she answered them there; at level 13 that week end runs on the host, so dropping = her choice lost.
   Level 13, in her context on the host: such a card gets the pid "live" and stays in the host's memory by its id (D.LIVE) until she picks;
   her pick runs it in her context as any part-D card. Its look on her phone is the native card's (the stand-in drops the pid / pp).
   Her store lives until her answer: the host's `end` waits while she has an open card (CW.gHold → herFree), so the card's own references
   are still her store's. A host reload loses the memory: the card is then stale (pick-stale, removed), logged in D.liveLost.
   FOR H: give each of these a real pid (list: G.liveK, the titles seen). Solo and levels ≤ 12: unchanged. */
const LIVE=D.LIVE=new Map();let lN=0;G.liveK={};D.liveLost=0;
PEND.live=pp=>{const m=pp&&LIVE.get(pp.lid);if(!m){D.liveLost++;return null}return {t:m.h,o:m.opts,who:m.who,cls:m.cls}};
{const tq=D.takeQ;D.takeQ=function(){try{if(on()&&host()&&CW.ctx&&Array.isArray(Q))for(const m of Q){if(!m||m.pid||!m.opts||!m.opts.length||(typeof isMenuCard==="function"&&isMenuCard(m)))continue;
   const lid="L"+wkR()+"-"+(lN++);LIVE.set(lid,m);m.pid="live";m.pp={lid};const k=String(m.t||"?");G.liveK[k]=(G.liveK[k]||0)+1}}catch(e){console.error("thin G live",e)}
  return tq.apply(this,arguments)}}
{const vo=D.vOf;D.vOf=function(m){const v=vo.apply(this,arguments);if(v&&v.pid==="live"){delete v.pid;delete v.pp}return v}}
{const so=TH.seatDrop;if(typeof so==="function")TH.seatDrop=function(seat){try{if(LIVE.size>40){const ks=[...LIVE.keys()];for(const k of ks.slice(0,ks.length-40))LIVE.delete(k)}}catch(e){}return so.apply(this,arguments)}}
/* ---------- her stand-in in the host's world follows her store (coop-thin G #4; coop-cyc L13) ----------
   Until level 13 her entry in the host's world (the friend entry: his deck, his tray, his book) took its identity from the merged week
   (fromCanon → placeFriend) and her live stats from her phone's pos (jcoopworld liveStats, which drops a pos whose name differs). At level 13
   her store on the host IS her person: a name / age / pregnancy change made in her context mid-week left the entry stale until the next week,
   so the host's week draw read a stale cycle (jcycle cycOn / cyTray on her entry: her Kỳ nguyệt sự card never asked, her card on the wrong
   side of the tray) and every pos of hers after it was dropped. Now, after each run in her context closes, the identity fields of her entry
   are copied from her store (the same rule buildFriend uses). Levels ≤ 12 and solo: unchanged. */
function frIdent(){const IDK=["name","age"];const st=TH.seatOf(other()),s=st&&st.S;if(!s||s.dead)return;const f=(rivals||[]).find(X.isF)||null;if(!f||f.sid!=null)return;let n=0;
 for(const k of IDK)if(s[k]!=null&&f[k]!==s[k]){f[k]=s[k];n++}
 const pv=s.preg&&!s.hidden?s.preg:0,fk=pv&&s.fake?s.fake:0;if((f.preg||0)!==pv){if(pv)f.preg=pv;else delete f.preg;n++}if((f.fake||0)!==fk){if(fk)f.fake=fk;else delete f.fake;n++}
 if(n){G.stat.ident=(G.stat.ident|0)+n;lg(["ident",wkR(),f.name])}}
/* the mini-game module state outside S (jtoil TOIL.st = the toilette in progress, j82 KG82.run = the running game): ONE copy per page. Her week
   end / her cards / her world windows on the host (any run in her context) could start or end HER toilette there and overwrite or clear the
   HOST's own open game (coop-cyc L13: the host's «Điểm trang» board stayed on screen with TOIL.st gone, "Để mặt mộc" did nothing, his week
   never ended). Each run in her context now sees her own copy (G.mgB) and the host's copy is put back after (audit §4: state outside S). */
const mgOut=()=>({st:typeof TOIL==="object"?TOIL.st:undefined,run:typeof KG82==="object"?KG82.run:undefined});
const mgIn=o=>{if(!o)return;if(typeof TOIL==="object")TOIL.st=o.st||null;if(typeof KG82==="object")KG82.run=o.run||null};
{const ws=TH.withSeat;TH.withSeat=function(seat){let outer=false,hm=null;try{outer=on()&&host()&&!CW.ctx&&seat===other()}catch(e){}
  if(outer)try{hm=mgOut();mgIn(G.mgB||{st:null,run:null})}catch(e){console.error("thin G mg",e)}
  try{return ws.apply(this,arguments)}finally{if(outer){try{const o=mgOut();if(G.mgB?o.st!==G.mgB.st:!!o.st){G.stat.mgHer=(G.stat.mgHer|0)+1;lg(["mg-her",wkR(),!!o.st,!!(hm&&hm.st)])}G.mgB=o;mgIn(hm)}catch(e){console.error("thin G mg",e)}if(!CW.ctx)try{frIdent()}catch(e){console.error("thin G ident",e)}}}}}
/* her entry can also be rebuilt from the last week's blob mid-week (jcoopworld placeFriend from CW.base.P.b when it is missing): the host's
   draw (flip) and every repaint read it after the same copy */
function idNow(){try{if(on()&&host()&&!CW.ctx&&CW.on)frIdent()}catch(e){console.error("thin G ident",e)}}
if(typeof flip==="function"){const f=flip;flip=function(){idNow();return f.apply(this,arguments)}}
COOP.on("week",()=>{const k=wkR();for(const x of Object.keys(G.done))if(+x<k-2)delete G.done[x]});
/* the guest: a room that reaches level 13 mid-week has no `end` of hers pending: drop any (the server refuses it: thinend) */
COOP.on("error",m=>{if(m&&m.code==="thinend"){lg(["thinend",m.week]);}});
/* coop-thin-g-f1 (law 11, TRIP swap wk32 staff host 1 | phone 0): her phone sheds the servants over the table at every render (jpromo render →
   j10 capSweep → as a guest capTrim(S) only), so a demotion that lands in one of her runs (a card she answers, her week end) trims at once there;
   the host paints nothing for her, so her store kept the extra servant until her next buổi. Every close of her context on the host (part D on:
   her store travels as a patch) runs the same trim on HER person only — never a world person (no capSweep: outside CW.gWk that sweeps rivals). */
TH.ctxOut.push(seat=>{try{if(!CW.on||seat===CW.seat||!S||S.dead||!(TH.dOn&&TH.dOn()))return;if(typeof capTrim==="function")capTrim(S)}catch(e){console.error("thin capTrim",e)}});
}catch(e){console.error("jcoopthing",e)}})();
