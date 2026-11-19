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

/* ---------- her week end on the host ---------- */
let hw=false;/* inside her week end (her step's E wrappers: no NPC acts again, her places = his) */
if(typeof rivalsBuoi==="function"){const f=rivalsBuoi;rivalsBuoi=function(){if(hw&&CW.ctx)return "";return f.apply(this,arguments)}}
if(typeof placeWhere==="function"){const f=placeWhere;placeWhere=function(){if(hw&&CW.ctx)return;return f.apply(this,arguments)}}
function whereIn(o){if(!o||!o.W||!S)return;const W=X.mapMe(J(o.W),false,902);const keep=S.where&&S.where[901];S.where=W;if(keep)S.where[901]=keep;if(o.menW)S.menW=J(o.menW)}
function whereOut(A){if(!A||!A.where)return null;const W=X.mapMe(J(A.where),true,901);delete W["902"];return {W,menW:A.menW?J(A.menW):null}}
function herFree(){const st=TH.seatOf(other());if(!st)return true;const q=st.S&&st.S.thq;return !(Array.isArray(q)&&q.length)&&!(CW.frPz&&CW.frPz())}
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
 const p=st.pers||{};s.empKnown=(p.kn&&p.kn[0])||{};s.cmP=J(p.cm||{});s.menP=J(p.men||{});G.stat.blob++;
 return {pid:902,ok:st.ok||(s.origin&&s.origin.k)||"tt",name:s.name,rank:s.rank,dead:!!s.dead,srv:!!(s.srv&&!s.srv.risen),life:st.life||0,S:s}};
/* jcoopworld onWeek (host, before his own reign ending): her reign ending, her seat-cap check, her places = his. The store is rebuilt from the
   new C first; what this run changes is written into CW.base.P.b too (a later rebuild of the store keeps it) */
CW.gEmp=function(){if(!on()||!host()||CW.ctx||!CW.base||!CW.base.P||!CW.base.P[other()])return;const seat=other();
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
COOP.on("week",()=>{const k=wkR();for(const x of Object.keys(G.done))if(+x<k-2)delete G.done[x]});
/* the guest: a room that reaches level 13 mid-week has no `end` of hers pending: drop any (the server refuses it: thinend) */
COOP.on("error",m=>{if(m&&m.code==="thinend"){lg(["thinend",m.week]);}});
}catch(e){console.error("jcoopthing",e)}})();
