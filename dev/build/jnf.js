/* ================= jnf: ONE NIGHT, COMMITTED ONCE AT THE DAY'S END (owner OD 16/11 19:45Z, refines OD 14:00Z (4)) =================
   Owner: the card flip only names the Emperor's INTENDED consort; the evening's khắc stay open for everyone (Tranh sủng / Chặn ngự giá,
   NPCs too); the REAL thị tẩm (Sổ ghi line, Kính sự phòng record nights/nightLog, Sủng / Ân tình, conception roll) is committed ONCE at
   "Sang ngày mới", for exactly ONE woman — whoever holds the night at that moment; the one who lost it gets no night record (only the
   steal's oán / jealousy).
   1. THE FLIP at the START of buổi tối (OD 14:00Z (4)): flip() called earlier in the day (endTurn's new day, start(), the cycle answer…)
      only marks the tablet as waiting (S.nfP); entering tối runs it. An evening that never ran (old save, a skipped buổi) flips at the
      day's end before the commit. The Emperor already spending the night with someone (j75 ntTaken: a won steal, his own visit) = no flip.
   2. HOLDING vs SPENDING: every road that used to start HER night at once (Kính sự phòng's summons "Tắm gội chờ giá", a won Tranh sủng /
      Chặn ngự giá, the Emperor's own visit "Thắp đèn hầu rượu") now only makes her the HOLDER (S.tonight = "me"); a won steal or his own
      visit also settles the night (j75 S.ntk: nobody can take it any more); a summons does not (others may still try during the evening).
   3. THE COMMIT, at "Sang ngày mới" (endTurn, first press of the day): (a) the tablet if the evening never flipped; (b) the NPCs' last
      tries (jsteal stealPass, live: the agent choice of review/night-steal-2 — moved here from the flip, so the evening is open to her
      first); (c) if SHE holds it: her night dialogs play now (prep → night1 → night2 → nightFx), then jnight runs the day on; (d) else
      endTurn's resolveTonight commits the NPC holder (rivalNight). A notice that must be read first (her night lost) holds the day once.
   4. CO-OP (host-authoritative): only the HOST's Emperor turns a card (friend included); the guest never flips. Every change of holder
      (the flip, her steal, a summons declined) is relayed on the `act` channel {k:"ctm-nf"}; at the commit the host runs the NPC tries
      and sends the final holder (fin) before it spends its own night; the guest's commit waits for that fin. Each seat commits only its
      OWN night: the host never runs rivalNight for the friend, the guest never runs rivalNight for an NPC or the host.
   Save: S.nfP (tablet waiting), S.nfF (day flipped), S.nfC / S.nfN / S.nfFin (commit steps of the day) — absent in old saves = harmless:
   an old save flipped in the morning keeps its pick (S.nightWhy of that day counts as flipped). */
(function(){
if(typeof flip!=="function"||typeof endTurn!=="function"||typeof nightScene!=="function")return;
const day=()=>typeof wk==="function"?wk():(S.turn*3+(S.tuan||0));
const B4=()=>typeof B4L==="number"?B4L:2;
/* the palace night only (servant route j42 and the home route jkc keep their own week: the flip there is unchanged) */
function nfOn(){try{return !!(S&&!S.dead&&!(typeof isSrv==="function"&&isSrv())&&!(typeof isKc==="function"&&isKc()))}catch(e){return false}}
window.nfOn=nfOn;
const CO=()=>{try{return window.COOPW&&COOPW.on&&typeof COOP==="object"?COOPW:null}catch(e){return null}};
const host=()=>{const c=CO();return !c||c.seat==="a"};
const guest=()=>!!CO()&&!host();
const myPid=()=>{const c=CO();return c?(c.seat==="a"?901:902):0};
const friend=()=>(typeof rivals!=="undefined"?rivals:[]).find(v=>v&&v.coop)||null;
function flippedToday(){return S.nfF===day()||!!(S.nightWhy&&S.nightWhy.wk===day())}
let REAL=0,IN=0,SW=0,CUR=null;

/* ---------- 1. the flip waits for the evening ---------- */
const f0=flip;
function realFlip(){S.nfP=null;S.nfF=day();
 const n=typeof ntTaken==="function"?ntTaken():null;
 if(n){S.tonight=n.who==="me"?"me":((typeof rivals!=="undefined"?rivals:[]).find(v=>v&&v.id===n.who)||null);send();return}
 REAL=1;let r;try{r=f0.apply(this,arguments)}finally{REAL=0}send();return r}
flip=function(){if(!S||REAL||!nfOn())return f0.apply(this,arguments);
 if(guest()){S.tonight=null;S.nfP=day();return}               /* co-op guest: the host's Emperor turns the card (relayed) */
 if((S.buoi||0)<B4()){S.tonight=null;S.nfP=day();return}       /* the tablet waits for buổi tối */
 return realFlip.apply(this,arguments)};
const nb0=nextBuoi;nextBuoi=function(){const b0=S&&S.buoi,d0=S&&day();const r=nb0.apply(this,arguments);
 try{if(S&&!S.dead&&nfOn()&&(S.buoi||0)>=B4()&&(b0!==S.buoi||d0!==day())){
   if(guest()){if(PEND_IN&&PEND_IN.d===day())apply(PEND_IN);else ask()}
   else if(!flippedToday()){flip();if(typeof deal==="function")deal();if(!window.__bot){try{if(Q.length)showModal()}catch(e){}}render()}}}catch(e){console.error(e)}
 return r};

/* ---------- 2. holding the night (her) ---------- */
const sw0=stealWin;stealWin=function(){SW++;try{return sw0.apply(this,arguments)}finally{SW--}};
const ns0=nightScene;nightScene=function(){if(IN||!S||!nfOn())return ns0.apply(this,arguments);
 const n=typeof ntTaken==="function"?ntTaken():null;
 if(n&&n.who!=="me"){try{log(`${ntReason(S)}.`)}catch(e){}if(S.tonight==="me")S.tonight=null;return}
 const pid=CUR!=null?CUR:(Q[0]&&Q[0].pid);const settle=SW>0||pid!=="ksp";   /* a won steal / his own visit: nobody can take it any more */
 S.tonight="me";if(settle)S.ntk={w:day(),who:"me",nm:"ngươi"};
 if(!SW)log(pid==="ksp"?"Ngươi tắm gội chờ giá. Đêm thị tẩm diễn ra khi hết ngày; trước đó người khác vẫn có thể giành mất.":"Đêm nay Hoàng thượng ở lại cung ngươi; đêm thị tẩm diễn ra khi hết ngày.");
 send();try{render()}catch(e){}};
/* co-op: any answer that changes who holds tonight (her summons declined "Cáo bệnh", given to the maid…) is relayed */
if(typeof chooseM==="function"){const cm0=chooseM;chooseM=function(){const b=S&&S.tonight,c0=CUR;CUR=(Q[0]&&Q[0].pid)||"";let r;try{r=cm0.apply(this,arguments)}finally{CUR=c0}try{if(CO()&&S&&S.tonight!==b)send()}catch(e){}return r}}

/* ---------- 3. the commit at "Sang ngày mới" ---------- */
function steals(){try{if(typeof stealPass==="function"&&S.tonight){const t=tonightOf();if(t&&!t.coop)stealPass(t,{live:true})}}catch(e){console.error(e)}}
function hold(){S.buoi=B4();try{if(!window.__bot&&Q.length)showModal()}catch(e){}try{render()}catch(e){}}
function herNight(){S.buoi=B4();try{if(S.ntk&&S.ntk.w===day()&&S.ntk.who==="me")S.ntk=null}catch(e){}
 IN=1;try{nightScene()}finally{IN=0}try{if(!window.__bot)showModal()}catch(e){}try{render()}catch(e){}}
const et0=endTurn;endTurn=function(){if(!S||S.dead||Q.length||S.mg||!nfOn())return et0.apply(this,arguments);
 const d=day();
 if(S.nfC!==d){S.nfC=d;
  if(!guest()){if(!flippedToday())realFlip();steals();S.nfFin=d;send(true)}
  if(Q.length)return hold()}
 if(guest()&&S.nfFin!==d){S.nfW=d;ask();return hold()}       /* the host's last word on who holds tonight */
 if(S.tonight==="me"&&S.nfN!==d){S.nfN=d;return herNight()}
 return et0.apply(this,arguments)};
/* each seat commits only its own night; an NPC's night is the host's (co-op) */
const rt0=resolveTonight;resolveTonight=function(){const t=S&&S.tonight;
 if(CO()&&t&&t!=="me"&&(t.coop||guest())){S.tonight=null;return ""}return rt0.apply(this,arguments)};
/* the record line names how he got there: a thief's card was never turned */
if(typeof rivalNight==="function"){const rn0=rivalNight;rivalNight=function(v){let r=rn0.apply(this,arguments);
 try{const w=S.nightWhy;if(typeof r==="string"&&v&&w&&w.wk===day()&&w.flip0!=null&&w.flip0!==v.id)r=r.replace(`thẻ bài của ${v.name} được lật`,`Hoàng thượng được mời sang cung ${v.name}`)}catch(e){}return r}}

/* ---------- 4. co-op relay (host-authoritative) ---------- */
const NK="ctm-nf";let LAST=null,PEND_IN=null;
const enc=t=>{if(t==="me"||t===S)return{k:"p",v:myPid()};if(!t)return null;return t.coop?{k:"p",v:t.id}:{k:"n",v:t.id}};
const dec=h=>{if(!h)return null;if(h.k==="p")return h.v===myPid()?"me":(friend()&&friend().id===h.v?friend():null);return (rivals||[]).find(v=>v&&!v.coop&&v.id===h.v)||null};
const mapId=id=>id==="me"?{k:"p",v:myPid()}:(friend()&&id===friend().id)?{k:"p",v:id}:{k:"n",v:id};
const unId=x=>!x?null:x.k==="p"?(x.v===myPid()?"me":x.v):x.v;
function nwOut(){const w=S.nightWhy;if(!w||w.wk!==day())return null;return{pick:w.pick!=null?mapId(w.pick):null,flip0:w.flip0!=null?mapId(w.flip0):null,cause:w.cause,day:w.day,mood:w.mood,
 rows:(w.rows||[]).map(x=>Object.assign({},x,{id:mapId(x.id),name:x.id==="me"?S.name:x.name}))}}
function send(fin){const c=CO();if(!c||!S)return;try{const m={t:"act",k:NK,mode:host()?"h":"g",d:day(),week:COOP.state.week,hold:enc(S.tonight),ntk:S.ntk&&S.ntk.w===day()?mapId(S.ntk.who):null,
  fin:host()&&S.nfFin===day()?1:0,nw:host()?nwOut():null,id:NK+Date.now().toString(36)+Math.random().toString(36).slice(2,6)};if(host())LAST=m;COOP.send(m)}catch(e){console.error(e)}}
function ask(){const c=CO();if(!c)return;try{COOP.send({t:"act",k:NK,mode:"ask",d:day(),week:COOP.state.week,id:NK+"a"+Date.now().toString(36)})}catch(e){}}
function apply(m){if(!S||S.dead||m.d!==day())return;
 if(guest()&&(S.buoi||0)<B4()&&!m.fin){PEND_IN=m;return}PEND_IN=null;
 const was=S.tonight;const t=dec(m.hold);S.tonight=t;
 if(m.ntk){const who=unId(m.ntk);const v=who==="me"?null:(rivals||[]).find(x=>x&&x.id===who);S.ntk={w:day(),who,nm:who==="me"?"ngươi":(v&&v.name)||""}}
 if(guest()){S.nfF=day();S.nfP=null;
  if(m.nw){const w=m.nw;S.nightWhy={wk:day(),pick:unId(w.pick),flip0:unId(w.flip0),cause:w.cause,day:w.day,mood:w.mood,rows:(w.rows||[]).map(x=>Object.assign({},x,{id:unId(x.id)}))}}
  if(t==="me"&&was!=="me"&&!m.ntk&&typeof pushDil==="function"&&typeof mkP==="function"&&!Q.some(x=>x.pid==="ksp"))pushDil(mkP("ksp"),"Kính sự phòng báo tin");
  if(was==="me"&&t!=="me"){for(let i=Q.length-1;i>=0;i--)if(Q[i].pid==="ksp"||Q[i].pid==="prep")Q.splice(i,1);
   Q.push({t:"Kính sự phòng",h:`<p>Thẻ bài của ngươi đã được lật, nhưng giữa đường, Hoàng thượng bị mời sang cung khác.</p>`})}
  if(m.fin){const w0=S.nfW===day();S.nfFin=day();
   if(w0&&!Q.length&&(S.buoi||0)>=B4()){try{COOPW.allowN=true;nextBuoi()}catch(e){console.error(e)}finally{COOPW.allowN=false}}}}
 try{if(typeof deal==="function")deal();if(!window.__bot&&Q.length)showModal();render()}catch(e){}}
try{if(typeof COOP==="object"&&COOP.on){
 COOP.on("act",m=>{try{const c=CO();if(!m||m.k!==NK||!c||m.from===c.seat)return;
  if(m.mode==="ask"){if(host()&&LAST&&LAST.d===day())send();return}
  if(m.mode==="h"&&guest())apply(m);
  else if(m.mode==="g"&&host()&&S&&m.d===day()&&S.nfFin!==day()){apply(m);send()}}catch(e){console.error(e)}});
 const re=()=>setTimeout(()=>{try{if(!CO())return;if(host()&&LAST&&LAST.d===day())send();else if(guest()&&S&&(S.buoi||0)>=B4()&&S.nfFin!==day())ask()}catch(e){}},400);
 COOP.on("room",re);COOP.on("peer",on=>{if(on)re()})}}catch(e){}
window.nfDebug=()=>({on:nfOn(),host:host(),guest:guest(),nfP:S&&S.nfP,nfF:S&&S.nfF,nfC:S&&S.nfC,nfN:S&&S.nfN,nfFin:S&&S.nfFin,tonight:S&&(S.tonight==="me"?"me":S.tonight&&S.tonight.id),ntk:S&&S.ntk});
})();
