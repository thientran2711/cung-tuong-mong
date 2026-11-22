/* ================= jledger: THE 10-NIGHT LEDGER OF KÍNH SỰ PHÒNG (owner OD 16/11 18:10Z, 18:40Z, 19:00Z, 19:05Z, OD:L1386; spec
   dev/handover/reports/night-time.md V3-B, superseded where OD 22:45Z moved the flip to the END of tối) =================
   A tuần is 10 days of the month. The ONE played tối of the tuần (the card-flip scene + the 10-second choice of jnf) stands for one of those
   10 nights; the other nine happen too and are written in the Kính sự phòng book.
   1. THE ROLL (ldRoll) at the commit, inside jnf realFlip → j8 flip (ldPin), host / single player only. Per day d = tuần×10 + 1..10:
      - BAL.nt.customDays (mùng một, rằm) → the Emperor goes to the Hoàng hậu (queenP) by custom; barred that day (her cycle day, pregnant,
        ill, confined: no night) → he only visits ("visit", no night). Her card is NEVER on the tray while the custom runs (OD 19:00Z).
      - other days → the Emperor's own choice per night (AG2 jagemp, OD:L1386; review r1): empSummon() (BAL.ag.emp.summon [90, 65]; busy =
        ill, Chăm chính sự or the court in crisis, OD 18:10Z) then empPick(C) (mindPick over nightCh × his memory). With the agent loop off
        (BAL.ag.on 0): roll(BAL.ag.emp.summon[busy]) and a plain nightCh draw. Missed → "blank" (he sleeps alone). C = consorts() minus the
        Hoàng hậu, minus every woman whose cycle covers THAT day (jcycle cycleDaysOf, by day; her own false report "báo sớm / giấu" keeps
        her card on the tray). Each day is its own choice; the same woman may come up on several days.
      - the cycle is BY DAY for the played tối too (review r1, OD 19:00Z / 19:05Z): while the ledger runs, jcycle's cyTray is "her cycle covers
        the PLAYED day" (cyLdDay), so a woman in her cycle tuần plays her night on any other day of it. (while it draws, window.__ldRoll, jcycle blocks nobody for the whole tuần, so nightCh / empPick read every woman; wOf stays as a guard.)
   2. THE PLAYED TỐI (OD 18:40Z): her FIRST day if she has one (S.tonight = "me", the jflip scene shows HER card); else the first NPC day; else the
      Hoàng hậu's custom night; else nobody. The flip choice (jnf: Tranh sủng / Chặn ngự giá / Giữ chân) runs on that night only.
      Already decided before the roll (his own visit, her night already played, a skipped flip): that holder takes the played tối.
   3. THE OTHER NIGHTS (ldSettle, once, at "Sang ngày mới" right before the live endTurn): each is first contested by the NPCs' own choice
      (window.stealPass(holder,{live:false}) = jnf stealPassNF, same odds, lines only; no steal on a custom night), then:
      HER night → Sổ ghi line "Kính sự phòng ghi: ngày {d}, ngươi được lật thẻ thêm một đêm." + the gains BAL.nt.extraFx + its own conception
      roll night(S); one kit pill (kitLine, KIT §42.2) for the tuần. An NPC night → the same gains + night(v); ONE Sổ ghi line for the tuần only
      when she has tai mắt (S.mat ≥ 2), else silent. Every night is recorded (nights, nightLog) for her and NPCs alike (two-way).
   4. CONCEPTION (spec 7, MUST): while the ledger runs every night's roll is conceiveCh(p) × BAL.nt.concF as a FLOAT (no rounding after the
      factor; the inner wrappers round the whole-% base as before). conceiveCh() itself reads the same float, so every display "Có thai mỗi
      lần thị tẩm" shows the true per-night chance on the odds ladder.
   5. CO-OP (night-ledger-coop, OD:L594 «every feature must work in 2-player co-op», OD:L96 one world, law 1 TWO-WAY): a player room runs the
      ledger (jnf unparked there). The HOST rolls ONE ledger for the world: the friend's card is in every draw (her nightCh from her blob, her
      cycle by day, her "báo sớm / giấu" through COOPW.fcyb — as the tray reads her); the played tối = the first day held by EITHER player,
      else the first NPC day, else the custom. The host settles the NPC nights and his own; a night of the friend is contested on the host
      (same NPC batch) and then left to HER seat. The ledger travels on the jnf relay (ctm-nf, one key): its days + the played index ride in
      every host word (open / fin, field ld), the settled tuần goes once as mode "ld" (kept in S.ldOut, sent again on the guest's "ldask" /
      a reconnect). The GUEST never rolls: she stores the host's days (S.ledger, so jcycle reads the same played day) and settles HER own
      nights on her seat (Sổ ghi line, kit pill, BAL.nt.extraFx, her own conception roll, nights / nightLog) + her tai-mắt line naming the
      other nights (the host's among them, as his names hers). Both seats read the same host-computed days; every number is BAL.nt.
      A THIN part-E room (nfParked) stays on the live one-night flip: ldOn false there; S.ldPk = a tuần whose flip ran parked (no ledger).
   Save: S.ledger = {wk, days:[{d, w ("me" | id | null), y ("custom"|"pick"|"blank"|"none"|"visit"|"played"), s (stolen)}], p (played index | -1), st}.
   S.ldPk = the tuần whose flip ran in a PARKED (thin part-E) room. S.ldOut (host) / S.ldG (guest: the last tuần settled on her seat).
   Old saves: absent → rolled at the next commit. ================================================================================== */
(function(){
const N=()=>BAL.nt||{};
function ldOn(){try{return !!(N().on&&(N().days||0)>1&&S&&!S.dead&&typeof nfOn==="function"&&nfOn())}catch(e){return false}}
window.ldOn=ldOn;
/* night pace for the rules that count recent nights (j8 ntP: anMonth, j75 favNow / satN): BAL.nt.days while the ledger runs, else 1 */
window.ntPace=()=>ldOn()?(+N().days||1):1;/* one night a tuần stood for the tuần's 10 days (V3-B): the ledger holds BAL.nt.days times the old pace (measured: report r1) */
const W=()=>wk();
const idOf=p=>p===S?"me":p&&p.id;
const ent=w=>w==="me"?S:w==null?null:(typeof rivals!=="undefined"?rivals:[]).find(v=>v&&v.id===w)||null;
const alive=p=>!!p&&(p===S?!S.dead:(p.alive&&!p.out));
/* co-op seats (jcoopworld worldOn: false only on the guest seat; jnf's relay helpers nfEnc / nfDec / nfLdSend) */
const room=()=>{try{return !!(window.COOPW&&COOPW.on&&typeof COOP==="object")}catch(e){return false}};
const gst=()=>room()&&typeof worldOn==="function"&&!worldOn();
const fr=()=>(typeof rivals!=="undefined"?rivals:[]).find(v=>v&&v.coop&&v.alive!==false)||null;
const isPl=w=>w==="me"||(!!fr()&&w===fr().id);
const cybFr=p=>{try{return p===S?S.cyb:(p&&p.coop&&window.COOPW&&typeof COOPW.fcyb==="function")?COOPW.fcyb():null}catch(e){return null}};
/* the custom (mùng một / rằm) is on while the Emperor's custom is (BAL.ag.emp.custom, jagemp; a test may switch it off) and there is a Hoàng hậu */
function ldCustomOn(){try{const C=BAL.ag&&BAL.ag.emp&&BAL.ag.emp.custom;return !!(queenP()&&(!C||C.some(x=>x>0)))}catch(e){return false}}
window.ldCustomOn=ldCustomOn;
/* her cycle covers that day (jcycle, by day). Her false report hides those days from the book (her card stays on the tray). */
function cyDayOf(p,day){try{if(typeof cycleDaysOf!=="function")return false;const L=cycleDaysOf(p,null,0)||[];if(!L.includes(day))return false;
 const c=cybFr(p);if(c&&c.lie===W())return false;return true}catch(e){return false}}
window.ldCyDay=cyDayOf;
/* the tray weight (nightCh, the Emperor's preference). A woman in her cycle tuần reads 0 from jcycle for the whole tuần: her weight for a
   day outside her cycle is nightCh read as if outside her cycle tuần (wk() kept: tuần +3 / tháng −1, restored at once) */
function wOf(p){try{if(typeof cyTray==="function"&&cyTray(p)){const t=S.tuan,u=S.turn;S.tuan=t+3;S.turn=u-1;try{return nightCh(p)||0}finally{S.tuan=t;S.turn=u}}return nightCh(p)||0}catch(e){return 0}}
function draw(C,w){const tot=w.reduce((a,b)=>a+b,0);if(!(tot>0))return null;let r=Math.random()*tot,i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}return C[i]}
/* ---------- 1. the roll ---------- */
function ldRoll(fixed){window.__ldRoll=1;try{return ldRoll0(fixed)}finally{window.__ldRoll=0}}
function ldRoll0(fixed){const n=N(),w0=W(),base=(S.tuan||0)*10;const q=queenP(),cus=ldCustomOn();
 const E=typeof empOn==="function"&&empOn(),SU=BAL.ag.emp.summon;
 const busy=(typeof has==="function"&&has("chamchinh"))||(typeof illOf==="function"&&S.emp&&!!illOf(S.emp));
 const C0=consorts().filter(p=>alive(p)&&!(cus&&p===q));/* co-op: the friend's card is in the host's draw (two-way) */const W0=C0.map(wOf);
 const days=[],zs=[];const z=()=>zs.push(E&&S.empWhy?JSON.parse(JSON.stringify(S.empWhy)):null);
 for(let k=1;k<=(n.days||10);k++){const d=base+k;
  if(cus&&(n.customDays||[]).includes(d)){const bar=cyDayOf(q,d)||!(wOf(q)>0)||(typeof illOf==="function"&&!!illOf(q));days.push({d,w:bar?null:idOf(q),y:bar?"visit":"custom"});zs.push(null);continue}
  if(E&&S.empWhy)S.empWhy={wk:w0};
  if(!(E?empSummon():roll(SU[busy?1:0]))){days.push({d,w:null,y:"blank"});z();continue}
  const C=[],w=[];C0.forEach((p,i)=>{if(W0[i]>0&&!cyDayOf(p,d)){C.push(p);w.push(W0[i])}});
  const t=!C.length?null:E?empPick(C):draw(C,w);days.push({d,w:t?idOf(t):null,y:t?"pick":"none"});z()}
 let pi=-1;
 if(fixed!==undefined){const fk=fixed?idOf(fixed):null;
  pi=fk!=null?days.findIndex(e=>e.w===fk&&e.y!=="custom"):-1;if(pi<0)pi=days.findIndex(e=>e.y!=="custom"&&e.y!=="visit");if(pi<0)pi=0;
  days[pi]={d:days[pi].d,w:fk,y:"played"}}
 else{const ok=e=>{const p=ent(e.w);return !!p&&!cyDayOf(p,e.d)};
  pi=days.findIndex(e=>isPl(e.w)&&ok(e));if(pi<0)pi=days.findIndex(e=>e.y==="pick"&&!isPl(e.w)&&ok(e));/* the first day of EITHER player (co-op) */if(pi<0)pi=days.findIndex(e=>e.y==="custom"&&ok(e))}
 /* his reason for the PLAYED night (AG2 nightWhy: rests / remembers her deed) is that day's, not the last day's */
 if(E){S.empWhy=(pi>=0&&zs[pi])||{wk:w0}}
 S.ledger={wk:w0,days,p:pi,st:0};return S.ledger}
function cur(){const L=S&&S.ledger;return L&&L.wk===W()?L:null}
/* j8 flip asks for the played tối's holder: undefined = no ledger here (live flip), null = nobody, else the person */
function ldPin(){if(!ldOn()||gst()||(S.ldPk===W()&&!cur()))return undefined;/* the tuần's flip ran PARKED (thin part-E): its one night, no ledger */const L=cur()||ldRoll();const e=L.days[L.p];if(!e)return null;const p=ent(e.w);return alive(p)?p:null}
window.ldPin=ldPin;
/* the cause j75 writes in nightWhy for the played tối */
window.ldCause=function(){const L=cur();const e=L&&L.days[L.p];return e&&e.y==="custom"?"custom":null};
window.ldRoll=ldRoll;window.ldNow=()=>cur();
/* ---------- 3. the other nights ---------- */
function gain(p){const f=N().extraFx||{};const sg=roll(f.sungP==null?100:f.sungP)?(f.sung||0):0,an=roll(f.anP==null?100:f.anP)?(f.an||0):0;
 if(p===S){const b=S.sung;if(sg)apply({sung:sg});S.an=cl((S.an||0)+an,0,100);return{sg:S.sung-b,an}}
 ap(p,{sung:sg,an});return{sg,an}}
function oneNight(p,w){p.nights=(p.nights||0)+1;(p.nightLog=p.nightLog||[]).push(w==null?W():w)}
/* an NPC contest of a not-played night (jnf stealPassNF via window.stealPass, live:false): every effect is real (oán, ghen, the loser's
   loss), the played tối's state is untouched (tonight, ntk, ntTry, nightWhy restored) */
function contest(h){if(typeof window.stealPass!=="function")return{holder:h,lines:[]};
 const sv={t:S.tonight,k:S.ntk,y:S.ntTry,w:S.nightWhy};S.ntk=null;S.ntTry=null;S.nightWhy=null;
 try{return window.stealPass(h,{live:false})||{holder:h,lines:[]}}catch(e){console.error(e);return{holder:h,lines:[]}}
 finally{S.tonight=sv.t;S.ntk=sv.k;S.ntTry=sv.y;S.nightWhy=sv.w}}
const nm=p=>p===S?"ngươi":p.name;
/* co-op: the host's view of a line (his own night: "ngươi" → his name, so the friend's seat reads it as hers would read any other) */
const hv=x=>String(x).replace(/(của|thay vì) ngươi(?=[\s.,;:]|$)/g,(m,a)=>`${a} ${S.name}`);
function ldSettle(){if(!ldOn())return;const d0=W();
 if(gst()){if(S.ldG!==d0)setTimeout(()=>{try{if(S&&S.ldG!==d0&&typeof window.nfLdAsk==="function")window.nfLdAsk(d0)}catch(e){}},400);return}   /* the guest never rolls: her nights come from the host (ldIn) */
 let L=cur();
 /* the day's flip ran in a PARKED (thin part-E) room (the live one-night flip) and she left the room before the day ended: that tuần keeps its one night */
 if(!L&&S.ldPk===d0){S.ledger={wk:d0,days:[],p:-1,st:1};return}
 if(!L)L=ldRoll(S.nfN===d0?S:(typeof tonightOf==="function"?tonightOf():null));
 if(L.st)return;L.st=1;
 const pe=L.days[L.p];if(pe){const h=S.nfN===d0?S:(typeof tonightOf==="function"?tonightOf():null);const w1=h?idOf(h):null;if(w1!==pe.w){pe.s=1;pe.o=pe.w}pe.w=w1}   /* the played tối as it ended (a won steal moved it) */
 const mine=[],npc=[],ln={},F=fr();let me=0;
 L.days.forEach((e,i)=>{if(i===L.p)return;
  if(e.y==="visit"){if(queenP()===S)log(`Kính sự phòng ghi: ngày ${e.d}, theo lệ Hoàng thượng sang cung ngươi thăm hỏi; ngươi không tiện hầu giá.`);return}
  let h=ent(e.w);if(!alive(h))return;
  if(e.y!=="custom"){const h0=h,r=contest(h);if(r&&r.holder&&r.holder!==h){h=r.holder;e.w=idOf(h);e.s=1;e.o=idOf(h0)}
   /* her own night contested: every line; NPC against NPC: only a night that changed hands, and only with tai mắt */
   if(r&&r.lines&&r.lines.length){if(h0===S||(e.s&&(S.mat||0)>=2))r.lines.forEach(x=>mine.push(`Ngày ${e.d}: ${String(x).trim()}`));
    if(F)ln[e.d]=r.lines.map(x=>hv(String(x).trim()))}}   /* co-op: the friend's seat reads the same lines (her own night, or with her tai mắt) */
  if(F&&h===F){npc.push(`ngày ${e.d} cung ${nm(h)}`);return}   /* co-op: the friend's night is settled on HER seat (ldIn): gains, her own roll, her record */
  oneNight(h);const g=gain(h);night(h);
  if(h===S){me++;log(`Kính sự phòng ghi: ngày ${e.d}, ngươi được lật thẻ thêm một đêm.${g.sg?` Sủng +${g.sg}`:""}${g.an?`${g.sg?" ·":""} Ân tình +${g.an}`:""}${g.sg||g.an?".":""}`)}
  else npc.push(`ngày ${e.d} cung ${nm(h)}`)});
 mine.forEach(x=>log(x));
 if(npc.length&&(S.mat||0)>=2)log(`Kính sự phòng ghi tuần này: ${npc.join(", ")}.`);
 pill(me);
 L.me=me;
 /* co-op: the settled tuần goes to the friend's seat once (kept for her ask / a reconnect) */
 if(F&&room()){const o=enc(L,ln);if(o){S.ldOut=(S.ldOut||[]).filter(x=>x&&x.wk!==o.wk).concat([o]).slice(-3);try{if(typeof window.nfLdSend==="function")window.nfLdSend(o)}catch(e){console.error(e)}}}}
function pill(me){if(me&&!window.__bot)try{if(typeof kitLine==="function")kitLine(`Kính sự phòng: ngươi được lật thẻ thêm ${typeof kitNumVi==="function"?kitNumVi(me):me} đêm`,4000)}catch(e){}}
/* ---------- 5. co-op relay (jnf ctm-nf: nfEnc / nfDec are jnf's seat-neutral ids) ---------- */
function enc(L,ln){if(!L||typeof window.nfEnc!=="function")return null;
 const E=w=>{if(w==null)return null;const p=ent(w);return p?window.nfEnc(p):null};
 return{wk:L.wk,p:L.p,st:L.st?1:0,days:L.days.map(e=>Object.assign({d:e.d,w:E(e.w),y:e.y},e.s?{s:1,o:E(e.o)}:{})),ln:ln||null}}
/* the host's ledger for the guest (rides in every jnf host word: open / fin): its days and the played index, before the settle */
window.ldOut=function(){try{if(!ldOn()||gst()||!room()||!fr())return null;const L=cur();return L?enc(L,null):null}catch(e){return null}};
const dw=h=>{try{if(!h||typeof window.nfDec!=="function")return null;const t=window.nfDec(h);return t==null?null:t==="me"?"me":t.id}catch(e){return null}};
/* the guest takes the host's ledger: the days (jcycle's played day, the same book), and once settled HER own nights on her seat */
window.ldIn=function(o){try{if(!o||!Array.isArray(o.days)||!S||S.dead||!gst()||!ldOn())return;
 const days=o.days.map(e=>Object.assign({d:e.d,w:dw(e.w),y:e.y},e.s?{s:1,o:dw(e.o)}:{}));
 if(o.wk===W()&&!(S.ledger&&S.ledger.wk===o.wk&&S.ledger.st))S.ledger={wk:o.wk,days,p:o.p,st:0};
 if(o.st&&S.ldG!==o.wk&&!(S.ldG!=null&&o.wk<S.ldG))gSettle(o.wk,days,o.p,o.ln||{})}catch(e){console.error(e)}};
const meRe=n=>new RegExp(`(của|thay vì) ${String(n||"").replace(/[.*+?^${}()|[\]\\]/g,"\\$&")}(?=[\\s.,;:]|$)`,"g");
function gSettle(w,days,p,ln){S.ldG=w;let me=0;const out=[],npc=[],re=S.name?meRe(S.name):null;
 days.forEach((e,i)=>{if(i===p)return;
  if(e.y==="visit"){if(queenP()===S)log(`Kính sự phòng ghi: ngày ${e.d}, theo lệ Hoàng thượng sang cung ngươi thăm hỏi; ngươi không tiện hầu giá.`);return}
  if(e.w==null)return;const h0=e.s?e.o:e.w;
  if((h0==="me"||(e.s&&(S.mat||0)>=2))&&Array.isArray(ln[e.d]))ln[e.d].forEach(x=>out.push(`Ngày ${e.d}: ${re?String(x).replace(re,"$1 ngươi"):x}`));
  if(e.w==="me"){oneNight(S,w);const g=gain(S);night(S);me++;
   log(`Kính sự phòng ghi: ngày ${e.d}, ngươi được lật thẻ thêm một đêm.${g.sg?` Sủng +${g.sg}`:""}${g.an?`${g.sg?" ·":""} Ân tình +${g.an}`:""}${g.sg||g.an?".":""}`)}
  else{const h=ent(e.w);if(h)npc.push(`ngày ${e.d} cung ${nm(h)}`)}});
 out.forEach(x=>log(x));
 if(npc.length&&(S.mat||0)>=2)log(`Kính sự phòng ghi tuần này: ${npc.join(", ")}.`);
 pill(me);
 if(S.ledger&&S.ledger.wk===w){S.ledger.st=1;S.ledger.me=me;S.ledger.days=days}else if(w===W())S.ledger={wk:w,days,p,st:1,me};
 try{if(typeof render==="function"&&!window.__bot)render()}catch(e){}}
/* the host answers the guest's ask for a settled tuần (S.ldOut keeps the last three) */
window.ldAgain=function(w){try{const L=(S&&S.ldOut)||[];const o=w==null?L[L.length-1]:L.find(x=>x&&x.wk===w);if(o&&typeof window.nfLdSend==="function"){window.nfLdSend(o);return true}}catch(e){}return false};
window.ldWant=()=>{try{return gst()&&S&&S.ledger&&S.ledger.wk!=null&&S.ldG!==S.ledger.wk?S.ledger.wk:null}catch(e){return null}};
window.ldSettle=ldSettle;
/* a flip made while a room is PARKED (jnf nfParked: thin part-E) is the live one-night flip: marked so the ledger does not add that tuần's other nights */
const fl0=flip;flip=function(){try{if(S&&typeof nfParked==="function"&&nfParked())S.ldPk=W()}catch(e){}return fl0.apply(this,arguments)};   /* only a PARKED (thin part-E) room: a player room runs the ledger */
/* the commit's live endTurn (jnf calls it after the choice and her night): the ledger's other nights are written first */
const et0=endTurn;endTurn=function(){try{if(ldOn()&&!(typeof Q!=="undefined"&&Q.length)&&!S.mg)ldSettle()}catch(e){console.error(e)}return et0.apply(this,arguments)};
/* ---------- 4. the float conception roll ---------- */
const cc0=conceiveCh;conceiveCh=function(p){const c=cc0.apply(this,arguments);try{if(ldOn()&&c>0)return c*(N().concF==null?1:N().concF)}catch(e){}return c};
})();
