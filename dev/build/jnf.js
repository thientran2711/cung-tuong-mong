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
const host=()=>{if(typeof window.worldOn==="function")return !!window.worldOn();const c=CO();return !c||c.seat==="a"};
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
 const pid=CUR!=null?CUR:(Q[0]&&Q[0].pid);
 if(SW>0){S.tonight="me";S.ntk={w:day(),who:"me",nm:"ngươi"};herWin();return}   /* a won try: the summons + the night at once (herWin, §2b) */
 if(pid==="ksp"){S.tonight="me";log("Ngươi tắm gội chờ giá. Hết buổi tối mới tới đêm thị tẩm; trước đó người khác vẫn có thể giành mất.");send();try{render()}catch(e){}return}
 /* his own visit "Thắp đèn hầu rượu" (or any other road): the night is hers NOW and plays at once; the day ends after it (jnight) */
 S.nfN=day();S.tonight="me";try{if(used>=4)used=3}catch(e){}send();IN=1;/* j75's nightScene takes the visit (S.ntk) */try{return ns0.apply(this,arguments)}finally{IN=0}};
/* co-op: any answer that changes who holds tonight (her summons declined "Cáo bệnh", given to the maid…) is relayed */
if(typeof chooseM==="function"){const cm0=chooseM;chooseM=function(){const b=S&&S.tonight,c0=CUR;CUR=(Q[0]&&Q[0].pid)||"";let r;try{r=cm0.apply(this,arguments)}finally{CUR=c0}try{if(CO()&&S&&S.tonight!==b)send()}catch(e){}return r}}

/* ---------- 2b. EVERY TRY RESOLVES AT ONCE, KHẮC BY KHẮC (owner OD 16/11 22:25Z canon night rule; 22:10Z no reward for speed; 22:17Z ties) ----------
   During tối anyone may press Tranh sủng / Chặn ngự giá (her deck card or the ACT menu, the co-op friend, an NPC agent). A try belongs to the
   khắc it is made in (k = 0..3 of tối) and costs its BAL.steal.cost then (one try a night each: j75 ntTry). Khắc k resolves ONCE, as soon as
   every PLAYER has had khắc k (single player: at once, when she presses; co-op: when both seats have passed k, on the host):
     (1) the players' tries of khắc k: each rolls ONCE vs its own odds (hers = the card's shown odds); one success → it wins; several →
         the higher Sủng wins; equal Sủng → a fair seeded roll (host). No margin, no "earlier try": real seconds never matter.
     (2) only then, if the night is still open, the NPCs' tries of khắc k (an agent's act made in k, or the jsteal agent choice now:
         stealWant's night chance spread over the 4 khắc, at most BAL.steal.maxTry NPC tries a night) — same roll, same tie rule.
   Winner: stealWin (oán / ghen vs the holder, j75 ntTake = the night is decided; later tries read 'Đêm nay Hoàng thượng đã ở cung X').
   HER win → the thị tẩm sequence plays NOW (summons → prep (bath, makeup) → night1 (to the Emperor) → night2 (talk) → the night-end
   card) and the day ends (jnight). A failed try: Sủng −BAL.steal.failSung, she plays on. Nobody wins → the intended consort's night is
   recorded at the end of tối (§3). Same rule for NPC vs NPC (two-way law) and for the not-played ledger nights (live:false). */
const B=()=>BAL.steal;
let RES=0,LASTK=null;
/* one try a night each: the same mark j75 ntTry writes (S.ntTry {w: wk(), ids}) — j75 keeps ntTry private */
function tryMark(a){if(!S)return;const w=wk();if(!S.ntTry||S.ntTry.w!==w)S.ntTry={w,ids:[]};const k=a===S?"me":a&&a.id;if(k!=null&&!S.ntTry.ids.includes(k))S.ntTry.ids.push(k)}
/* S.nfA = {d, L:[{w, mode, o, k, npc, done}], K: next khắc to resolve, gU: the co-op guest's khắc reached, n: NPC tries tonight} */
function nfS(){const d=day();if(!S.nfA||S.nfA.d!==d||S.nfA.K==null)S.nfA={d,L:[],K:0,gU:0,n:0};return S.nfA}
function atts(){return nfS().L}
/* the khắc an act started in: spend() runs before the act (j2 act, ACT menu), so the act's khắc is the one spend started from */
if(typeof spend==="function"){const sp0=spend;spend=function(){try{LASTK=typeof used==="number"?used:null}catch(e){}return sp0.apply(this,arguments)}}
const khac=()=>{let u=0;try{u=typeof used==="number"?used:0}catch(e){}return Math.min(3,Math.max(0,(LASTK!=null&&LASTK<u)?LASTK:u))};
/* the khắc of tối a seat has had: its used khắc; all 4 once it pressed "Sẵn sàng" for the night (co-op nightReady) */
const myU=()=>!S||(S.buoi||0)<B4()?0:(CO()&&COOPW.nrdy===day())?4:Math.min(4,(()=>{try{return used}catch(e){return 0}})());
const gU=()=>CO()&&friend()?nfS().gU:4;
function entOf(w){if(w==="me")return S;return (typeof rivals!=="undefined"?rivals:[]).find(v=>v&&v.id===w)||null}
const sungOf=a=>a===S?(S.sung||0):(a&&a.sung)||0;
function failTxt(a,t){return `${NMc(a)} định giành đêm${t?" của "+NM(t):""} nhưng Hoàng thượng không động lòng. Sủng -${B().failSung}. `}
function waitTxt(a,mode){return a===S?`Ngươi ${mode==="road"?"ra hành lang chờ ngự giá đi qua":"sai cung nữ sang mời Hoàng thượng"}; chờ Hoàng thượng định đoạt.`:""}
/* a fair seeded roll among equals (same seed on any seat: the day, the khắc, the ids) */
function seedPick(L,k){const id=x=>String(x.a===S?"me":x.a.id);const M=L.slice().sort((a,b)=>id(a)<id(b)?-1:id(a)>id(b)?1:0);
 const s=`${day()}|${k}|`+M.map(id).join(",");let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0}return M[h%M.length]}
/* resolve ONE batch (one khắc's players, or its NPCs, or a ledger night): L = [{a, mode, o, remote}] */
function nfResolve(t,L,live,k){const out={holder:t,lines:[],tries:L.length,res:[]};if(!L.length)return out;
 const taken=typeof ntTaken==="function"?ntTaken():null;
 for(const x of L){x.ok=!!t&&!taken&&x.a!==t&&Math.random()*100<x.o}
 const OK=L.filter(x=>x.ok);let best=null;
 if(OK.length){const top=Math.max(...OK.map(x=>sungOf(x.a)));const T=OK.filter(x=>sungOf(x.a)===top);best=T.length>1?seedPick(T,k):T[0]}
 const ST=window.__stealSt||[];
 for(const x of L){const a=x.a;let txt;
  if(x===best){RES=1;try{txt=String(stealWin(a,t,x.mode)||"").trim()}finally{RES=0}out.holder=a;
   try{const d=S.nightWhy;if(d&&d.wk===day()){d.pick=a===S?"me":a.id;d.cause="stolen"}}catch(e){}}
  else if(taken||!t)txt=`${NMc(a)} định giành đêm nhưng ${typeof ntReason==="function"?ntReason(a).replace(/^Đ/,"đ"):"đêm nay đã có người"}.`;
  else if(x.ok)txt=`${NMc(a)} cũng mời được Hoàng thượng, nhưng ngài chọn sang cung ${NM(best.a)}.`;
  else{if(!x.remote)ap(a,{sung:-B().failSung});txt=failTxt(a,t).trim()}
  out.res.push({w:a===S?"me":a.id,won:x===best,mode:x.mode,txt,lost:!x.ok&&!taken&&!!t});
  try{ST.push({w:day(),me:t===S,mode:x.mode,ok:x===best,live,n:L.length})}catch(e){}
  try{if(typeof newsAdd==="function"&&a!==S&&t)newsAdd(a,"steal",txt.replace(/\.\s*$/,""),t===S)}catch(e){}
  if(!live){out.lines.push(txt);continue}
  if(a===S||t===S)log(txt);else if(x===best&&(S.mat||0)>=2)log(txt)}
 if(live&&best&&t===S&&best.a!==S){for(let i=Q.length-1;i>=0;i--)if(Q[i].pid==="ksp"||Q[i].pid==="prep")Q.splice(i,1);
  const w=out.res.find(r=>r.won);Q.push({t:"Kính sự phòng",h:`<p>Thẻ bài của ngươi đã được lật, nhưng ${w?w.txt:""}</p>`})}
 if(live&&best&&best.a===S)herWin();
 return out}
/* khắc k's NPC tries: the agents' own acts made in k + the jsteal agent choice now (stealWant's night chance over the 4 khắc) */
function npcTries(t,k,reg){const A=nfS();const L=reg.slice();if(!t)return L;
 const E=liveRivals(true).filter(v=>!L.some(x=>x.a===v)&&!A.L.some(x=>x.w===v.id)&&typeof stealEligible==="function"&&stealEligible(v,t)&&!(typeof cyTray==="function"&&cyTray(v)));
 for(let i=E.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[E[i],E[j]]=[E[j],E[i]]}
 for(const v of E){if(A.n>=B().maxTry)break;const w=stealWant(v,t);if(!w.mode)continue;const p4=1-Math.pow(1-Math.min(.999,w.p),1/4);if(!(Math.random()<p4))continue;
  tryMark(v);ap(v,stealCost(w.mode));A.L.push({w:v.id,mode:w.mode,o:Math.round(oSteal(v,w.mode)),k,npc:1,done:1});A.n++;L.push({a:v,mode:w.mode,o:oSteal(v,w.mode)})}
 return L}
/* run every khắc that every player has had (host / single player only) */
let PUMP=0;
function pump(force,upTo){if(PUMP||!S||S.dead||!nfOn()||guest())return;const A=nfS();let lim=force?4:Math.min(myU(),gU());if(upTo!=null&&gU()>=upTo)lim=Math.max(lim,upTo);PUMP=1;
 try{while(A.K<lim&&!S.dead){const k=A.K;A.K++;
  const mine=A.L.filter(x=>x.k===k&&!x.done);mine.forEach(x=>x.done=1);
  const P=[],N=[];for(const x of mine){const a=entOf(x.w);if(!a)continue;(x.npc?N:P).push({a,mode:x.mode,o:x.o,remote:!!a.coop})}
  let t=tonightOf();
  if(P.length){const o=nfResolve(t,P,true,k);gres(o,k);t=tonightOf()}
  if(t&&!(typeof ntTaken==="function"&&ntTaken())){const L=npcTries(t,k,N);if(L.length)nfResolve(t,L,true,k+.5)}
  else if(N.length)nfResolve(t,N,true,k+.5)}}
 finally{PUMP=0}
 if(CO()&&host())send()}
/* co-op: the friend's own result goes back to her seat (she applies her own Sủng loss / plays her own night) */
function gres(o,k){try{const f=friend();const r=f&&o&&o.res&&o.res.find(x=>x.w===f.id);if(!r)return;const d=day();if(!S.nfG||S.nfG.d!==d)S.nfG={d,L:[]};S.nfG.L.push({k,won:r.won,mode:r.mode,lost:r.lost,txt:r.txt})}catch(e){}}
/* her own try (deck card, ACT menu): cost already paid; single player resolves now, co-op waits for the friend's same khắc */
function myTry(mode,o){if(typeof ntCan==="function"&&!ntCan(S)){log(`${ntReason(S)}.`);return}tryMark(S);const A=nfS();
 const k=Math.max(A.K,khac());A.L.push({w:"me",mode,o:Math.round(o),k});
 if(guest()){log(waitTxt(S,mode));send(false,{mode,o:Math.round(o),k});return}
 if(gU()<=k)log(waitTxt(S,mode));
 pump(false,k+1)}
/* one whole-night pass of the NPCs' own choice, one batch, same tie rule: a NOT played night (10-night ledger, live:false: lines only) or a
   direct call (live; the played evening itself never calls it: its NPC tries run khắc by khắc in pump) */
function stealPassNF(t,opt){opt=opt||{};const live=opt.live!==false;const out0={holder:t,lines:[],tries:0,res:[]};if(!S||S.dead||!t)return out0;
 if(guest()&&t!==S)return out0;
 const E=liveRivals(true).filter(v=>typeof stealEligible==="function"&&stealEligible(v,t)&&!(typeof cyTray==="function"&&cyTray(v)));
 for(let i=E.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[E[i],E[j]]=[E[j],E[i]]}
 const L=[];for(const v of E){if(live&&nfOn()&&nfS().L.some(x=>x.w===v.id))continue;if(L.length>=B().maxTry)break;const w=stealWant(v,t);if(!w.mode||!(Math.random()<w.p))continue;tryMark(v);ap(v,stealCost(w.mode));L.push({a:v,mode:w.mode,o:oSteal(v,w.mode)})}
 return nfResolve(t,L,live,"pass")}
if(typeof window.stealPass==="function")window.stealPass=stealPassNF;
window.nfResolve=nfResolve;window.nfPump=pump;window.nfSeedPick=seedPick;
/* every act of the evening (ACT steal/road of the social menu, an NPC agent's act) is a try of the khắc it is made in */
const sn1=stealNight;stealNight=function(a,t,mode){if(RES||!S||!nfOn())return sn1.apply(this,arguments);
 if(!a||!t||tonightOf()!==t||a===t)return "";if(typeof ntCan==="function"&&!ntCan(a))return "";if(typeof cyTray==="function"&&cyTray(a))return "";
 ap(a,stealCost(mode));if(a===S){myTry(mode,oSteal(S,mode));return " "}
 if(guest())return "";tryMark(a);const A=nfS();A.L.push({w:a.id,mode,o:Math.round(oSteal(a,mode)),k:Math.max(A.K,khac()),npc:1});A.n++;return ""};
/* her deck cards Tranh sủng / Chặn ngự giá: the card pays its cost; the try rolls its shown odds once (myTry) */
const isStealCard=a=>!!(a&&(a.__steal||((a.n==="Tranh sủng"||a.n==="Chặn ngự giá")&&a.b===B4())));
if(typeof runOpt==="function"){const ro1=runOpt;runOpt=function(a){const t=S&&tonightOf();if(!(isStealCard(a)&&S&&nfOn()&&t&&t!==S))return ro1.apply(this,arguments);
 if(typeof ntCan==="function"&&!ntCan(S)){log(`${ntReason(S)}.`);return null}   /* one try a night: no second cost */
 const mode=a.n==="Chặn ngự giá"?"road":"feign",o0=a.o,g0=a.go,f0=a.fail;let o=typeof o0==="number"?o0:oSteal(S,mode);try{if(o<100)o=cl(o+lotB(S,a.dom),5,95)}catch(e){}
 a.o=100;a.go=()=>myTry(mode,o);a.fail=null;
 try{return ro1.apply(this,arguments)}finally{a.o=o0;a.go=g0;a.fail=f0}}}
/* HER win: the summons, then the night at once (the day ends after it, jnight) */
function herWin(){if(!S||S.dead)return;const d=day();if(S.nfN===d)return;S.nfN=d;S.tonight="me";S.ntk={w:d,who:"me",nm:"ngươi"};if(CO())RR=d;
 try{if(used>=4)used=3}catch(e){}
 for(let i=Q.length-1;i>=0;i--)if(Q[i].pid==="ksp")Q.splice(i,1);
 const P=PEND.nfsum();Q.unshift({t:"Kính sự phòng báo tin",h:P.t,opts:P.o,who:P.who,pid:"nfsum",pp:{nd:d},art:"img/ev-ksp.webp"});
 send();try{render()}catch(e){}showSoon()}
PEND.nfsum=()=>({who:typeof pEunCourt==="function"?pEunCourt("ksp"):undefined,t:"<p>Thái giám Kính sự phòng chạy tới báo: Hoàng thượng đổi ý, ngự giá đang sang cung ngươi. Tắm gội trang điểm cho kịp!</p>",
 o:[{n:"Tắm gội chờ giá",fx:{},x:"chuẩn bị thị tẩm",go:()=>{try{if(S.ntk&&S.ntk.w===day()&&S.ntk.who==="me")S.ntk=null}catch(e){}/* j75 takes the visit again when the night starts */IN=1;try{nightScene()}finally{IN=0}}}]});

/* ---------- 3. the commit at "Sang ngày mới" ---------- */
/* the khắc of tối still unresolved (she pressed "Sang ngày mới" early, the friend's last khắc): every player has had them now */
function steals(){try{pump(true)}catch(e){console.error(e)}}
/* the modal is shown once the caller's own steps (nextBuoi wrappers, curtain) are done */
const showSoon=()=>{if(window.__bot)return;setTimeout(()=>{try{if(S&&Q.length&&$("modal").hidden)showModal()}catch(e){}},0)};
/* co-op: the room's night `go` (jcoopworld nCheck) runs nextBuoi ONCE; when the commit holds (a notice to read, her night dialogs) the
   seat would sit in tối for good (nightEnd sees "already ready"). RR = the day whose commit still has to run: once no dialog is open
   (and the guest has the host's fin) the seat runs its night step again, through the same allowN gate. */
let RR=null;
function rerun(){if(RR!==day()||!CO()||!S||S.dead||Q.length||S.mg||(S.buoi||0)<B4()||(guest()&&S.nfFin!==day()))return;RR=null;
 setTimeout(()=>{try{if(CO()&&S&&!S.dead&&!Q.length&&!S.mg&&(S.buoi||0)>=B4()&&!COOPW.pend){COOPW.allowN=true;try{nextBuoi()}finally{COOPW.allowN=false}}}catch(e){console.error(e)}},300)}
let GU=null;
function tick(){if(!S||S.dead||!nfOn()||(S.buoi||0)<B4()||S.mg)return;
 if(guest()){const u=myU();const key=day()+":"+u;if(GU!==key&&CO()){GU=key;try{COOP.send({t:"act",k:NK,mode:"g",d:day(),week:COOP.state.week,u,id:NK+"u"+Date.now().toString(36)+u})}catch(e){}}return}
 pump()}
const rd0=render;render=function(){const r=rd0.apply(this,arguments);try{tick()}catch(e){console.error(e)}try{rerun()}catch(e){}return r};
function hold(){S.buoi=B4();if(CO())RR=day();try{render()}catch(e){}showSoon()}
function herNight(){S.buoi=B4();if(CO())RR=day();try{if(used>=4)used=3}catch(e){}/* no auto "Sang ngày mới" (j6 used>=4) between her night dialogs; jnight spends the day after nightFx */try{if(S.ntk&&S.ntk.w===day()&&S.ntk.who==="me")S.ntk=null}catch(e){}
 IN=1;try{nightScene()}finally{IN=0}try{render()}catch(e){}showSoon()}
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
function send(fin,att){const c=CO();if(!c||!S)return;try{const m={t:"act",k:NK,mode:host()?"h":"g",d:day(),week:COOP.state.week,hold:enc(S.tonight),ntk:S.ntk&&S.ntk.w===day()?mapId(S.ntk.who):null,
  fin:host()&&S.nfFin===day()?1:0,nw:host()?nwOut():null,att:att||null,gres:host()&&S.nfG&&S.nfG.d===day()?S.nfG.L:null,id:NK+Date.now().toString(36)+Math.random().toString(36).slice(2,6)};if(host())LAST=m;COOP.send(m)}catch(e){console.error(e)}}
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
  /* her own tries, resolved on the host (each once: S.nfR = the khắc already applied) */
  if(Array.isArray(m.gres)){if(!S.nfR||S.nfR.d!==day())S.nfR={d:day(),k:[]};
   for(const g of m.gres){if(S.nfR.k.includes(g.k))continue;S.nfR.k.push(g.k);
    if(g.won){log(`Ngươi ${g.mode==="road"?"chặn ngự giá giữa đường":"sai người báo đau tim"}: Hoàng thượng sang cung ngươi.`);herWin()}
    else if(g.lost){ap(S,{sung:-B().failSung});log(failTxt(S,null).trim())}
    else if(g.txt)log(String(g.txt).replace(/^[^ ]+ [^ ]+ /,"Ngươi "))}}
  if(m.fin){const w0=S.nfW===day();S.nfFin=day();
   if(w0&&!Q.length&&(S.buoi||0)>=B4()){try{COOPW.allowN=true;nextBuoi()}catch(e){console.error(e)}finally{COOPW.allowN=false}}}}
 try{if(typeof deal==="function")deal();if(!window.__bot&&Q.length)showModal();render()}catch(e){}}
try{if(typeof COOP==="object"&&COOP.on){
 COOP.on("act",m=>{try{const c=CO();if(!m||m.k!==NK||!c||m.from===c.seat)return;
  if(m.mode==="ask"){if(host()&&LAST&&LAST.d===day())send();return}
  if(m.mode==="h"&&guest())apply(m);
  else if(m.mode==="g"&&host()&&S&&m.d===day()&&S.nfFin!==day()){
   if(m.att){const f=friend();const A=nfS();if(f&&!A.L.some(x=>x.w===f.id)&&(typeof ntCan!=="function"||ntCan(f))){tryMark(f);
     A.L.push({w:f.id,mode:m.att.mode==="road"?"road":"feign",o:Math.max(0,Math.min(100,+m.att.o||0)),k:Math.max(A.K,Math.min(3,Math.max(0,+m.att.k||0)))});
     A.gU=Math.max(A.gU,Math.min(4,(+m.att.k||0)+1))}pump();return}
   if(m.u!=null){const A=nfS();A.gU=Math.max(A.gU,Math.min(4,+m.u||0));pump();return}
   apply(m);send()}}catch(e){console.error(e)}});
 const re=()=>setTimeout(()=>{try{if(!CO())return;if(host()&&LAST&&LAST.d===day())send();else if(guest()&&S&&(S.buoi||0)>=B4()&&S.nfFin!==day())ask()}catch(e){}},400);
 COOP.on("room",re);COOP.on("peer",on=>{if(on)re()})}}catch(e){}
window.nfDebug=()=>({on:nfOn(),host:host(),guest:guest(),nfP:S&&S.nfP,nfF:S&&S.nfF,nfC:S&&S.nfC,nfN:S&&S.nfN,nfFin:S&&S.nfFin,tonight:S&&(S.tonight==="me"?"me":S.tonight&&S.tonight.id),ntk:S&&S.ntk});
})();
