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

/* ---------- 2b. MULTI-STEAL (coordinator s23 brief, owner 19:45Z rule): every Tranh sủng / Chặn ngự giá of the evening — hers, the co-op
   friend's, the NPCs' — is only RECORDED at the act (its cost paid then, one try each: j75 ntTry); all are resolved ONCE at the commit:
   each rolls its own odds (oSteal of the act; hers = the card's shown odds); the winner = the successful try with the largest margin
   (odds − roll), tie → higher Sủng, then the earlier try; every other try gets stealNight's failure result (Sủng −BAL.steal.failSung);
   the winner gets stealWin's oán / ghen against the holder. Same rule for NPCs (two-way law) and for the not-played ledger nights. */
const B=()=>BAL.steal;
let SEQ=0,RES=0;
/* one try a night each: the same mark j75 ntTry writes (S.ntTry {w: wk(), ids}) — j75 keeps ntTry private */
function tryMark(a){if(!S)return;const w=wk();if(!S.ntTry||S.ntTry.w!==w)S.ntTry={w,ids:[]};const k=a===S?"me":a&&a.id;if(k!=null&&!S.ntTry.ids.includes(k))S.ntTry.ids.push(k)}
function atts(){const d=day();if(!S.nfA||S.nfA.d!==d)S.nfA={d,L:[]};return S.nfA.L}
function regText(a,mode){return a===S?`Ngươi ${mode==="road"?"ra hành lang chờ ngự giá đi qua":"sai cung nữ sang mời Hoàng thượng"}. Thành hay không, hết ngày mới rõ.`
 :`${NMc(a)} ${mode==="road"?"ra hành lang chờ ngự giá":"sai người sang mời Hoàng thượng"}; hết ngày mới rõ. `}
/* record one try (cost already paid by the caller); co-op guest: the try also goes to the host, who resolves the night */
function reg(a,mode,o){const L=atts();const w=a===S?"me":a.id;if(L.some(x=>x.w===w))return;L.push({w,mode,o:Math.round(o),q:++SEQ+L.length*1e-3});
 if(a===S){log(regText(S,mode));if(guest())send(false,{mode,o:Math.round(o)})}}
function entOf(w){if(w==="me")return S;return (typeof rivals!=="undefined"?rivals:[]).find(v=>v&&v.id===w)||null}
const sungOf=a=>a===S?(S.sung||0):(a&&a.sung)||0;
function failTxt(a,t){return `${NMc(a)} định giành đêm${t?" của "+NM(t):""} nhưng Hoàng thượng không động lòng. Sủng -${B().failSung}. `}
/* resolve one night: L = [{a, mode, o, q, remote}] (remote = the co-op friend's try: her own seat applies her Sủng) */
function nfResolve(t,L,live){const out={holder:t,lines:[],tries:L.length,res:[]};if(!L.length)return out;
 const taken=typeof ntTaken==="function"?ntTaken():null;let best=null;
 for(const x of L){const r=Math.random()*100;x.m=x.o-r;x.ok=!!t&&!taken&&r<x.o&&x.a!==t;
  if(x.ok&&(!best||x.m>best.m||(x.m===best.m&&(sungOf(x.a)>sungOf(best.a)||(sungOf(x.a)===sungOf(best.a)&&x.q<best.q)))))best=x}
 const ST=window.__stealSt||[];
 for(const x of L.slice().sort((a,b)=>a.q-b.q)){const a=x.a;let txt;
  if(x===best){RES=1;try{txt=String(stealWin(a,t,x.mode)||"").trim()}finally{RES=0}out.holder=a;
   try{const d=S.nightWhy;if(d&&d.wk===day()){d.pick=a===S?"me":a.id;d.cause="stolen"}}catch(e){}}
  else{if(!x.remote)ap(a,{sung:-B().failSung});txt=failTxt(a,t).trim()}
  out.res.push({w:a===S?"me":a.id,won:x===best,mode:x.mode,txt});
  try{ST.push({w:day(),me:t===S,mode:x.mode,ok:x===best,live,n:L.length})}catch(e){}
  try{if(typeof newsAdd==="function"&&a!==S&&t)newsAdd(a,"steal",txt.replace(/\.\s*$/,""),t===S)}catch(e){}
  if(!live){out.lines.push(txt);continue}
  if(a===S||t===S)log(txt);else if(x===best&&(S.mat||0)>=2)log(txt)}
 if(live&&best&&t===S&&best.a!==S){for(let i=Q.length-1;i>=0;i--)if(Q[i].pid==="ksp"||Q[i].pid==="prep")Q.splice(i,1);
  const w=out.res.find(r=>r.won);Q.push({t:"Kính sự phòng",h:`<p>Thẻ bài của ngươi đã được lật, nhưng ${w?w.txt:""}</p>`})}
 return out}
/* the one steal pass of a night: the evening's recorded tries (played night) + the NPCs' own choice now (jsteal agent: stealWant), then ONE resolve */
function stealPassNF(t,opt){opt=opt||{};const live=opt.live!==false;const out0={holder:t,lines:[],tries:0,res:[]};if(!S||S.dead)return out0;
 if(guest()&&t!==S)return out0;
 const L=[];if(live&&nfOn()){for(const x of atts()){const a=entOf(x.w);if(a&&a!==t)L.push({a,mode:x.mode,o:x.o,q:x.q,remote:!!a.coop})}S.nfA.L=[]}
 if(t){const E=liveRivals(true).filter(v=>!L.some(x=>x.a===v)&&typeof stealEligible==="function"&&stealEligible(v,t)&&!(typeof cyTray==="function"&&cyTray(v)));
  for(let i=E.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[E[i],E[j]]=[E[j],E[i]]}
  let n=L.filter(x=>x.a!==S&&!x.a.coop).length;
  for(const v of E){if(n>=B().maxTry)break;const w=stealWant(v,t);if(!w.mode||!(Math.random()<w.p))continue;
   tryMark(v);ap(v,stealCost(w.mode));L.push({a:v,mode:w.mode,o:oSteal(v,w.mode),q:++SEQ+1e3});n++}}
 return nfResolve(t,L,live)}
if(typeof window.stealPass==="function")window.stealPass=stealPassNF;
window.nfResolve=nfResolve;
/* every act of the evening (ACT steal/road of the social menu, an NPC agent's act) only RECORDS the try */
const sn1=stealNight;stealNight=function(a,t,mode){if(RES||!S||!nfOn())return sn1.apply(this,arguments);
 if(!a||!t||tonightOf()!==t||a===t)return "";if(typeof ntCan==="function"&&!ntCan(a))return "";if(typeof cyTray==="function"&&cyTray(a))return "";
 tryMark(a);ap(a,stealCost(mode));reg(a,mode,oSteal(a,mode));return a===S?" ":regText(a,mode)};
/* her deck cards Tranh sủng / Chặn ngự giá: the card pays its cost and records the try with its shown odds; no roll now */
const isStealCard=a=>!!(a&&(a.__steal||((a.n==="Tranh sủng"||a.n==="Chặn ngự giá")&&a.b===B4())));
if(typeof runOpt==="function"){const ro1=runOpt;runOpt=function(a){const t=S&&tonightOf();if(!(isStealCard(a)&&S&&nfOn()&&t&&t!==S))return ro1.apply(this,arguments);
 if(typeof ntCan==="function"&&!ntCan(S)){log(`${ntReason(S)}.`);return null}   /* one try a night: no second cost */
 const mode=a.n==="Chặn ngự giá"?"road":"feign",o0=a.o,g0=a.go,f0=a.fail;let o=typeof o0==="number"?o0:oSteal(S,mode);try{if(o<100)o=cl(o+lotB(S,a.dom),5,95)}catch(e){}
 a.o=100;a.go=()=>{if(typeof ntCan==="function"&&!ntCan(S)){log(`${ntReason(S)}.`);return}tryMark(S);reg(S,mode,o)};a.fail=null;
 try{return ro1.apply(this,arguments)}finally{a.o=o0;a.go=g0;a.fail=f0}}}

/* ---------- 3. the commit at "Sang ngày mới" ---------- */
function steals(){try{const t=tonightOf();if(t||(S.nfA&&S.nfA.d===day()&&S.nfA.L.length))return window.stealPass(t||null,{live:true})}catch(e){console.error(e)}return null}
/* the modal is shown once the caller's own steps (nextBuoi wrappers, curtain) are done */
const showSoon=()=>{if(window.__bot)return;setTimeout(()=>{try{if(S&&Q.length&&$("modal").hidden)showModal()}catch(e){}},0)};
/* co-op: the room's night `go` (jcoopworld nCheck) runs nextBuoi ONCE; when the commit holds (a notice to read, her night dialogs) the
   seat would sit in tối for good (nightEnd sees "already ready"). RR = the day whose commit still has to run: once no dialog is open
   (and the guest has the host's fin) the seat runs its night step again, through the same allowN gate. */
let RR=null;
function rerun(){if(RR!==day()||!CO()||!S||S.dead||Q.length||S.mg||(S.buoi||0)<B4()||(guest()&&S.nfFin!==day()))return;RR=null;
 setTimeout(()=>{try{if(CO()&&S&&!S.dead&&!Q.length&&!S.mg&&(S.buoi||0)>=B4()&&!COOPW.pend){COOPW.allowN=true;try{nextBuoi()}finally{COOPW.allowN=false}}}catch(e){console.error(e)}},300)}
const rd0=render;render=function(){const r=rd0.apply(this,arguments);try{rerun()}catch(e){}return r};
function hold(){S.buoi=B4();if(CO())RR=day();try{render()}catch(e){}showSoon()}
function herNight(){S.buoi=B4();if(CO())RR=day();try{if(used>=4)used=3}catch(e){}/* no auto "Sang ngày mới" (j6 used>=4) between her night dialogs; jnight spends the day after nightFx */try{if(S.ntk&&S.ntk.w===day()&&S.ntk.who==="me")S.ntk=null}catch(e){}
 IN=1;try{nightScene()}finally{IN=0}try{render()}catch(e){}showSoon()}
const et0=endTurn;endTurn=function(){if(!S||S.dead||Q.length||S.mg||!nfOn())return et0.apply(this,arguments);
 const d=day();
 if(S.nfC!==d){S.nfC=d;
  if(!guest()){if(!flippedToday())realFlip();const o=steals();S.nfG=null;try{const f=friend();const r=f&&o&&o.res&&o.res.find(x=>x.w===f.id);if(r)S.nfG={d,r:{won:r.won,mode:r.mode}}}catch(e){}S.nfFin=d;send(true)}
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
function send(fin,att){const c=CO();if(!c||!S)return;try{const m={t:"act",k:NK,mode:host()?"h":"g",d:day(),week:COOP.state.week,hold:enc(S.tonight),ntk:S.ntk&&S.ntk.w===day()?mapId(S.ntk.who):null,
  fin:host()&&S.nfFin===day()?1:0,nw:host()?nwOut():null,att:att||null,gres:host()&&S.nfG&&S.nfG.d===day()?S.nfG.r:null,id:NK+Date.now().toString(36)+Math.random().toString(36).slice(2,6)};if(host())LAST=m;COOP.send(m)}catch(e){console.error(e)}}
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
  if(m.fin&&m.gres&&S.nfR!==day()){S.nfR=day();const g=m.gres;
   if(g.won)log(`Ngươi ${g.mode==="road"?"chặn ngự giá giữa đường":"sai người báo đau tim"}: Hoàng thượng sang cung ngươi.`);else{ap(S,{sung:-B().failSung});log(failTxt(S,null).trim())}}
  if(m.fin){const w0=S.nfW===day();S.nfFin=day();
   if(w0&&!Q.length&&(S.buoi||0)>=B4()){try{COOPW.allowN=true;nextBuoi()}catch(e){console.error(e)}finally{COOPW.allowN=false}}}}
 try{if(typeof deal==="function")deal();if(!window.__bot&&Q.length)showModal();render()}catch(e){}}
try{if(typeof COOP==="object"&&COOP.on){
 COOP.on("act",m=>{try{const c=CO();if(!m||m.k!==NK||!c||m.from===c.seat)return;
  if(m.mode==="ask"){if(host()&&LAST&&LAST.d===day())send();return}
  if(m.mode==="h"&&guest())apply(m);
  else if(m.mode==="g"&&host()&&S&&m.d===day()&&S.nfFin!==day()){
   if(m.att){const f=friend();if(f&&!atts().some(x=>x.w===f.id)&&(typeof ntCan!=="function"||ntCan(f))){tryMark(f);atts().push({w:f.id,mode:m.att.mode==="road"?"road":"feign",o:Math.max(0,Math.min(100,+m.att.o||0)),q:++SEQ})}return}
   apply(m);send()}}catch(e){console.error(e)}});
 const re=()=>setTimeout(()=>{try{if(!CO())return;if(host()&&LAST&&LAST.d===day())send();else if(guest()&&S&&(S.buoi||0)>=B4()&&S.nfFin!==day())ask()}catch(e){}},400);
 COOP.on("room",re);COOP.on("peer",on=>{if(on)re()})}}catch(e){}
window.nfDebug=()=>({on:nfOn(),host:host(),guest:guest(),nfP:S&&S.nfP,nfF:S&&S.nfF,nfC:S&&S.nfC,nfN:S&&S.nfN,nfFin:S&&S.nfFin,tonight:S&&(S.tonight==="me"?"me":S.tonight&&S.tonight.id),ntk:S&&S.ntk});
})();
