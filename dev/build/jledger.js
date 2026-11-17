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
   CO-OP: parked (jnf nfParked → nfOn false → ldOn false): the live one-night flip and the old conception roll stay. Servant / home routes too.
   Save: S.ledger = {wk, days:[{d, w ("me" | id | null), y ("custom"|"pick"|"blank"|"none"|"visit"|"played")}], p (played index | -1), st}.
   S.ldPk = the tuần whose flip ran in a co-op room (no ledger that tuần). Old saves: absent → rolled at the next commit. ================================================================================== */
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
/* the custom (mùng một / rằm) is on while the Emperor's custom is (BAL.ag.emp.custom, jagemp; a test may switch it off) and there is a Hoàng hậu */
function ldCustomOn(){try{const C=BAL.ag&&BAL.ag.emp&&BAL.ag.emp.custom;return !!(queenP()&&(!C||C.some(x=>x>0)))}catch(e){return false}}
window.ldCustomOn=ldCustomOn;
/* her cycle covers that day (jcycle, by day). Her false report hides those days from the book (her card stays on the tray). */
function cyDayOf(p,day){try{if(typeof cycleDaysOf!=="function")return false;const L=cycleDaysOf(p,null,0)||[];if(!L.includes(day))return false;
 if(p===S&&S.cyb&&S.cyb.lie===W())return false;return true}catch(e){return false}}
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
 const C0=consorts().filter(p=>alive(p)&&!p.coop&&!(cus&&p===q));const W0=C0.map(wOf);
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
  pi=days.findIndex(e=>e.w==="me"&&ok(e));if(pi<0)pi=days.findIndex(e=>e.y==="pick"&&e.w!=="me"&&ok(e));if(pi<0)pi=days.findIndex(e=>e.y==="custom"&&ok(e))}
 /* his reason for the PLAYED night (AG2 nightWhy: rests / remembers her deed) is that day's, not the last day's */
 if(E){S.empWhy=(pi>=0&&zs[pi])||{wk:w0}}
 S.ledger={wk:w0,days,p:pi,st:0};return S.ledger}
function cur(){const L=S&&S.ledger;return L&&L.wk===W()?L:null}
/* j8 flip asks for the played tối's holder: undefined = no ledger here (live flip), null = nobody, else the person */
function ldPin(){if(!ldOn())return undefined;const L=cur()||ldRoll();const e=L.days[L.p];if(!e)return null;const p=ent(e.w);return alive(p)?p:null}
window.ldPin=ldPin;
/* the cause j75 writes in nightWhy for the played tối */
window.ldCause=function(){const L=cur();const e=L&&L.days[L.p];return e&&e.y==="custom"?"custom":null};
window.ldRoll=ldRoll;window.ldNow=()=>cur();
/* ---------- 3. the other nights ---------- */
function gain(p){const f=N().extraFx||{};const sg=roll(f.sungP==null?100:f.sungP)?(f.sung||0):0,an=roll(f.anP==null?100:f.anP)?(f.an||0):0;
 if(p===S){const b=S.sung;if(sg)apply({sung:sg});S.an=cl((S.an||0)+an,0,100);return{sg:S.sung-b,an}}
 ap(p,{sung:sg,an});return{sg,an}}
function oneNight(p){p.nights=(p.nights||0)+1;(p.nightLog=p.nightLog||[]).push(W())}
/* an NPC contest of a not-played night (jnf stealPassNF via window.stealPass, live:false): every effect is real (oán, ghen, the loser's
   loss), the played tối's state is untouched (tonight, ntk, ntTry, nightWhy restored) */
function contest(h){if(typeof window.stealPass!=="function")return{holder:h,lines:[]};
 const sv={t:S.tonight,k:S.ntk,y:S.ntTry,w:S.nightWhy};S.ntk=null;S.ntTry=null;S.nightWhy=null;
 try{return window.stealPass(h,{live:false})||{holder:h,lines:[]}}catch(e){console.error(e);return{holder:h,lines:[]}}
 finally{S.tonight=sv.t;S.ntk=sv.k;S.ntTry=sv.y;S.nightWhy=sv.w}}
const nm=p=>p===S?"ngươi":p.name;
function ldSettle(){if(!ldOn())return;const d0=W();let L=cur();
 /* the day's flip ran in a co-op room (parked: the live one-night flip) and she left the room before the day ended: that tuần keeps its one night */
 if(!L&&S.ldPk===d0){S.ledger={wk:d0,days:[],p:-1,st:1};return}
 if(!L)L=ldRoll(S.nfN===d0?S:(typeof tonightOf==="function"?tonightOf():null));
 if(L.st)return;L.st=1;
 const pe=L.days[L.p];if(pe){const h=S.nfN===d0?S:(typeof tonightOf==="function"?tonightOf():null);pe.w=h?idOf(h):null}   /* the played tối as it ended (a won steal moved it) */
 const mine=[],npc=[];let me=0;
 L.days.forEach((e,i)=>{if(i===L.p)return;
  if(e.y==="visit"){if(queenP()===S)log(`Kính sự phòng ghi: ngày ${e.d}, theo lệ Hoàng thượng sang cung ngươi thăm hỏi; ngươi không tiện hầu giá.`);return}
  let h=ent(e.w);if(!alive(h))return;
  if(e.y!=="custom"){const h0=h,r=contest(h);if(r&&r.holder&&r.holder!==h){h=r.holder;e.w=idOf(h);e.s=1}
   /* her own night contested: every line; NPC against NPC: only a night that changed hands, and only with tai mắt */
   if(r&&r.lines&&r.lines.length&&(h0===S||(e.s&&(S.mat||0)>=2)))r.lines.forEach(x=>mine.push(`Ngày ${e.d}: ${String(x).trim()}`))}
  oneNight(h);const g=gain(h);night(h);
  if(h===S){me++;log(`Kính sự phòng ghi: ngày ${e.d}, ngươi được lật thẻ thêm một đêm.${g.sg?` Sủng +${g.sg}`:""}${g.an?`${g.sg?" ·":""} Ân tình +${g.an}`:""}${g.sg||g.an?".":""}`)}
  else npc.push(`ngày ${e.d} cung ${nm(h)}`)});
 mine.forEach(x=>log(x));
 if(npc.length&&(S.mat||0)>=2)log(`Kính sự phòng ghi tuần này: ${npc.join(", ")}.`);
 if(me&&!window.__bot)try{if(typeof kitLine==="function")kitLine(`Kính sự phòng: ngươi được lật thẻ thêm ${typeof kitNumVi==="function"?kitNumVi(me):me} đêm`,4000)}catch(e){}
 L.me=me}
window.ldSettle=ldSettle;
/* a flip made while co-op is on (jnf parked) is the live one-night flip: marked so the ledger does not add that tuần's other nights */
const fl0=flip;flip=function(){try{if(S&&typeof nfParked==="function"&&nfParked())S.ldPk=W()}catch(e){}return fl0.apply(this,arguments)};
/* the commit's live endTurn (jnf calls it after the choice and her night): the ledger's other nights are written first */
const et0=endTurn;endTurn=function(){try{if(ldOn()&&!(typeof Q!=="undefined"&&Q.length)&&!S.mg)ldSettle()}catch(e){console.error(e)}return et0.apply(this,arguments)};
/* ---------- 4. the float conception roll ---------- */
const cc0=conceiveCh;conceiveCh=function(p){const c=cc0.apply(this,arguments);try{if(ldOn()&&c>0)return c*(N().concF==null?1:N().concF)}catch(e){}return c};
})();
