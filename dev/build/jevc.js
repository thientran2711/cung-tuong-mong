/* ================= jevc: DAILY BIG-EVENT CAP (owner OD 26/11 ~01:25Z «1 ngày ấp tới 1 đống sự kiện, lúc thì lễ hội, lúc thì kỳ ngộ, lúc thì người
   này tới tìm, lúc thì người kia hại, quá nhiều trong 1 ngày»; ~04:20Z «sự kiện diễn ra liên tục, người tìm liên tục, quá ngộp»). Numbers: BAL.evc (jbalsp.js).
   ONE count per game day (tuần) = big cards she was SHOWN today (S.evc.n, counted once per card when painted) + big cards already waiting in Q
   (made this tick, or carried from yesterday by jspread). evcKind(card) names the kind from the card's own tag (pid / title):
     fest  (fixed-date festival day: never refused; the day's festival takes one slot first)
     harm  (j70 plot beats: Mưu hại / Lời cảnh báo / Sau vụ mưu hại …; an urgent aftermath still comes)
     visit (j24 «Có người đến», jgreet stage visitor, jagent «Có người tìm đến», «Một ánh mắt»)
     ky    (Kỳ ngộ)
     opt   (j68 life events, j72 «Việc nhờ» / Phụ tuyến, jreign, j71 «Lập công», «Việc khó xử»)
   Gates (wraps, loaded last): kyArrive (her roll), approachOne, gmCard, agScene (a deed aimed at her: no card, the deed still lands), show70
   (a non-urgent beat waits), evBusy (every optional source already asks it), makeDil; and at paint (showModal): a big card of a full day
   waits in EVCW for a later day (harm beats are never held: a warning must come before its plot). A refused event is NOT lost: its own gate keeps its state
   (a plot keeps p.pend, Kỳ ngộ keeps its pity, a visitor's reason stays) → a later day. No player-visible text, no random draw.
   Test: dev/test/stat-pace.js (unit + simulated days). */
function evcKind(m){if(!m||typeof m!=="object")return null;const t=String(m.t||"").replace(/<[^>]+>/g,""),pid=String(m.pid||"");
 if(pid==="j70"||/^(Mưu hại|Sau vụ mưu hại|Lời cảnh báo|Tai mắt báo tin)/.test(t))return"harm";if(pid==="kyngo")return"ky";
 if(/^(Có người đến|Có người tìm đến|Một ánh mắt)/.test(t)||/visit/.test(pid))return"visit";
 if(/^(e68|q72o|rgo?$|j71m)/.test(pid)||/^(Việc khó xử|Phụ tuyến|Lập công)/.test(t))return"opt";if(/^j71[ix]$/.test(pid))return"fest";return null}
function evcZ(){if(!S)return null;const d=typeof wk==="function"?wk():0;let z=S.evc;if(!z||typeof z!=="object"||z.d!==d){z=S.evc={d,n:{}};
  /* a festival day takes its slot first (on the calendar; never refused) */try{if(typeof festToday==="function"&&festToday())z.n.fest=1}catch(e){}}return z}
function evcOn(){return !!(typeof BAL==="object"&&BAL.evc&&BAL.evc.on&&S&&!S.dead)}
/* today's count by kind: shown today + waiting in Q (not yet shown) */
/* every card still waiting somewhere: Q, jspread's waiting list (SP13.L), j68's held cards (EVHOLD), this cap's own wait list (EVCW) */
function evcWaiting(){const L=[];try{for(const m of Q)L.push(m)}catch(e){}try{for(const x of SP13.L)L.push(x.m)}catch(e){}try{for(const h of EVHOLD)L.push(h.m)}catch(e){}for(const w of EVCW)L.push(w.m);return L}
function evcNow(){const z=evcZ(),n=Object.assign({},z?z.n:{});try{for(const m of evcWaiting())if(m&&!evcToday(m)){const k=evcKind(m);if(k&&k!=="fest")n[k]=(n[k]||0)+1}}catch(e){}let t=0;for(const k in n)t+=n[k];n.t=t;return n}
function evcOK(k){if(!evcOn())return true;if(k==="fest")return true;const B=BAL.evc,n=evcNow();if(n.t>=B.cap)return false;if((n[k]||0)>=(B.q[k]==null?B.cap:B.q[k]))return false;
 return n.t+evcKeep(k,n)<B.cap}
/* slots kept for a kind that never waits (BAL.evc.res, e.g. harm 1) until it has come today; that kind itself does not keep room from itself */
function evcKeep(k,n){const R=BAL.evc.res;let keep=0;if(R&&typeof R==="object")for(const j in R)if(j!==k&&!n[j])keep+=R[j];return keep}
/* EVCW: big cards (visit / ky / opt) of a full day wait here for a later day; one is released when the board is clear and the day has
   room; after BAL.evc.wait days it is let go (a plain card goes to the log, like j68 evDropInfo). Harm beats and must / forced / ending cards are
   never held. In memory like EVHOLD (j68). */
let EVCW=[];
function evcHoldable(m){return !!(m&&typeof m==="object"&&!m.must&&!m.kend&&!evcToday(m)&&!m.forced&&m.kind!=="news"&&m.cls!=="end")}
function evcRoom(k){const B=BAL.evc,z=evcZ();let t=0;for(const j in z.n)t+=z.n[j];return t+evcKeep(k,z.n)<B.cap&&(z.n[k]||0)<(B.q[k]==null?B.cap:B.q[k])}
function evcPaint(){if(!evcOn())return;for(let g=0;g<30&&Q.length;g++){const m=Q[0],k=evcKind(m);if(!k||k==="fest"||evcToday(m))return;
  if(k!=="harm"&&evcHoldable(m)&&!evcRoom(k)){Q.shift();EVCW.push({m,at:wk(),k});continue}evcSeen(m);return}}
function evcRelease(){if(!evcOn()||!EVCW.length||Q.length||S.mg)return;const now=wk();
 EVCW=EVCW.filter(w=>{if(now-w.at>BAL.evc.wait){try{if(typeof evDropInfo==="function")evDropInfo(w.m)}catch(e){}return false}return true});
 const i=EVCW.findIndex(w=>w.at<now&&evcRoom(w.k));if(i<0)return;const w=EVCW.splice(i,1)[0];Q.push(w.m);try{showModal()}catch(e){}}
/* a big card on screen: counted once per day, on the day she SEES it (m.evcN = that day + 1; a card seen on an earlier day — or a copy of it, e.g. the next step of a Phụ tuyến — shown again today counts again) */
function evcToday(m){return !!(m&&m.evcN&&m.evcN===wk()+1)}
function evcSeen(m){try{if(!evcOn()||!m||evcToday(m))return;const k=evcKind(m);if(!k||k==="fest")return;m.evcN=wk()+1;const z=evcZ();z.n[k]=(z.n[k]||0)+1}catch(e){}}
(function(){
 if(typeof kyArrive==="function"){const k0=kyArrive;kyArrive=function(F){if(F===S&&evcOn()&&!evcOK("ky"))return;return k0.apply(this,arguments)}}
 if(typeof approachOne==="function"){const a0=approachOne;approachOne=function(){if(evcOn()&&!evcOK("visit"))return null;return a0.apply(this,arguments)}}
 if(typeof gmCard==="function"){const g0=gmCard;gmCard=function(){if(evcOn()&&!evcOK("visit"))return null;return g0.apply(this,arguments)}}
 /* jagent: a consort's deed aimed AT her («Có người tìm đến» / shared act). Day full: no card; the deed still lands at the end of its khắc window
    (agWatch → agLand: the world goes on, law 6) */
 if(typeof agScene==="function"&&typeof agPerson==="function"){const s0=agScene;agScene=function(p){let me=false;try{me=agPerson(p.t)===S}catch(e){}
  if(me&&evcOn()&&!evcOK("visit")){try{p.seen=1}catch(e){}return}return s0.apply(this,arguments)}}
 if(typeof show70==="function"&&typeof busy70==="function"){const s0=show70;show70=function(){if(evcOn()&&!evcOK("harm")){const b0=busy70;busy70=()=>true;try{return s0.apply(this,arguments)}finally{busy70=b0}}return s0.apply(this,arguments)}}
 if(typeof evBusy==="function"){const b0=evBusy;evBusy=function(){return b0.apply(this,arguments)||(evcOn()&&!evcOK("opt"))}}
 if(typeof makeDil==="function"){const d0=makeDil;makeDil=function(){if(evcOn()&&!evcOK("opt"))return null;return d0.apply(this,arguments)}}
 if(typeof showModal==="function"){const m0=showModal;showModal=function(){try{evcPaint()}catch(e){}return m0.apply(this,arguments)}}
 if(typeof nextBuoi==="function"){const n0=nextBuoi;nextBuoi=function(){const r=n0.apply(this,arguments);try{evcRelease()}catch(e){}return r}}
 if(typeof start==="function"){const s0=start;start=function(){EVCW=[];return s0.apply(this,arguments)}}
 try{if(typeof lifeStore==="function")lifeStore("EVCW cap-held cards",()=>{EVCW=[]})}catch(e){}
})();
