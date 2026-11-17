/* jcoopthinb: CO-OP THIN GUEST, part B = LIFE CREATION + REBIRTH ON THE HOST (review/coop-thin-b; audit
   dev/handover/reports/coop-thin-guest-audit.md §3 row B; contract dev/handover/reports/coop-thin-a.md C1-C6; owner GO 17/11 01:40Z).
   Runs only when COOPW.thin.on(2): co-op on, both seats on a build with part B (TH.CAP >= 2), the host asked for level >= 2. Solo play and
   rooms below level 2 never run any of it (the old path in jcoopworld stays for them; see "OLD PATH" there).

   GUEST (thin): her Luân hồi card is a CHOICE only. start() / "Đầu thai kiếp sau" / "Đổi thân phận" send the intent
     do life {st:"roll", seed, re}; "Nhận thân phận" (or closing the card) sends do life {st:"accept", key, kc}. She builds no world, no
     person, rolls no dice: what she shows is the person the host sent (COOPW.fromCanon of the room world + that person = the display path),
     and on accept she hands the host's blob to the server unchanged (`me`, COOPW.sendMe(P)).
   HOST: TH.onDo("life") runs in withSeat("b") (her context, the ONE room world):
     roll   = the same seeded build as nlRun (start() chain, Math.random = nlRng(seed) for the core start, faces from the second stream),
              then her person is put into the room world right there: the scratch harem the core start() makes is thrown away before any
              start() wrapper runs, the room's world keys / NPC list / id counters are put back, every link of hers into the scratch harem
              is dropped (attach's list) or re-made on real people (a cung nữ's mistress, the ally, the foe), her name and her maid's name are
              checked against every name in the one world, her personal part of emp / cm / men starts blank, NPCs start fresh toward the
              new face; then the start() wrappers (k61, cmaid, mort, seat, reign …) run on the real world in her context.
     accept = the accept steps of nlAccept (Phúc duyên baseline, the reroll log line, the tiểu thư road "nha" → kcInit) on the life the
              roll built (kept in the seat store until the accept), then her final blob.
     Both answer {st, key, P, q, rows}: P = her person (the `me` blob), q = her dialogs (serialized), rows = the NPC rows toward her new face.
   Rows: the host keeps the room's old numbers in ITS world until the week merges (merge3 adds numeric deltas: both seats moving the same row
     would count twice); the guest shows `rows` (applied inside fromCanon), so her week sends exactly her change of them. Part C (world on the
     host only) retires this.
   The seat store (TH.seatOf "b") is dropped on every merged week / new `state` (her week is still played on her phone until parts E-G: the
     room's P.b is the truth) except while a rolled life waits for her accept (TB.hold). */
(function(){try{
const CW=window.COOPW;if(!CW||!CW.thin||!CW.X||typeof COOP!=="object")return;
const TH=CW.thin,X=CW.X,J=X.J,LV=2;
const host=()=>CW.seat==="a",on=()=>TH.on(LV);
const TB=TH.life={ask:null,hold:false,last:null,cache:{},stat:{roll:0,accept:0,rename:0,maid:0,mistress:0,scrub:0,ally:0,foe:0,qdrop:0,resend:0,old:0}};
const plain=o=>o!==null&&typeof o==="object";
const other=()=>CW.seat==="a"?"b":"a";
/* B r2 (B‖D seam): her seat is HELD while a rolled life waits for her accept: part D defers all its work for that seat (jcoopthin D.later /
   D.kind / her intents); it runs after the accept on her accepted person (TH.pbase) or after a release on the room's person */
TH.holdOf=seat=>host()&&TB.hold&&seat===other();

/* ================= HOST ================= */
/* her dialogs as data: kit dilemmas travel by id (mkP rebuilds them), plain notes travel as text + picture; anything with closures cannot */
function qSer(L){const out=[];for(const m of L||[]){if(!m||m.nl)continue;
  if(m.pid){out.push({pid:m.pid,pp:J(m.pp),t:m.t});continue}
  if(m.opts&&m.opts.length){TB.stat.qdrop++;continue}
  out.push({t:m.t,h:m.h,cls:m.cls,btn:m.btn,w:m.who&&m.who.w,art:m.headArt?J(m.headArt):null,st:Array.isArray(m.stage)&&m.stage.includes(S)?1:0})}return out}
/* every name in the one world (consorts, the host's entry, servants, children, men) — her name / her maid's must not repeat one */
const tail=n=>String(n||"").split(" ").slice(-2).join(" ");
function worldNames(){const own=new Set([S,S.maid,...(S.staff||[]),...(S.kids||[])]),a=[];const add=o=>{if(o&&!own.has(o)&&o.name)a.push(o.name)};
 (rivals||[]).forEach(v=>{add(v);(v&&v.staff||[]).forEach(add)});try{allServ().forEach(add)}catch(e){}try{allKids().forEach(([k])=>add(k))}catch(e){}
 (S.men||[]).forEach(add);
 /* + the host's own person, maid and servants (in context b the host is a stand-in entry without staff) */
 const O=TH.outerS;if(O){add(O);add(O.maid);(O.staff||[]).forEach(add)}
 /* + the room's last merged world (what the guest's screen shows until the week merges: a name the host changed since must not come back) */
 try{for(const r of (CW.base&&CW.base.W&&CW.base.W.R)||[]){if(r&&r.name&&!r.coop)a.push(r.name);for(const x of r&&r.staff||[])if(x&&x.name&&!x.coop)a.push(x.name)}}catch(e){}
 return a}
function clash(n,L,full){return L.includes(n)||(full&&L.some(u=>tail(u)===tail(n)))}
function freeMaid(L){const f=MAIDS.filter(x=>!L.includes(x)&&x!==S.name);let n=f.length?pick(f):"";
 for(let i=0;!n&&i<60;i++){const c=pick(MAIDS)+" "+(R(8)+2+Math.floor(i/10)*8);if(!L.includes(c))n=c}return n}
function checkNames(){const L=worldNames();
 if(clash(S.name,L,true)){const was=S.name;let n=was;for(let i=0;i<50&&clash(n,L,true);i++){S.name="";n=freshName()}S.name=n;TB.stat.rename++;TB.renamed=[was,n]}
 /* her maid: a free name of the maids' list, else the list name + a number (the same rule as mkServ j10), never one already in the world */
 if(typeof MAIDS==="undefined")return;
 if(S.maid&&L.includes(S.maid.name)){const n=freeMaid(L);if(n){S.maid.name=n;TB.stat.maid++}}
 /* the maids Nội vụ phủ offers her to pick (jcmaid cmPick, made in context b by mkServ, which cannot see the host's own servants) */
 for(const m of Q||[]){if(!m||m.pid!=="cmPick"||!m.pp||!Array.isArray(m.pp.c))continue;const U=L.concat(S.maid?[S.maid.name]:[]);
  for(const c of m.pp.c){if(c&&(U.includes(c.name)||m.pp.c.some(o=>o!==c&&o.name===c.name))){const n=freeMaid(U);if(n){c.name=n;TB.stat.maid++}}if(c)U.push(c.name)}}}
/* links of hers that still point into the scratch harem: dropped (null), counted */
function scrub(o,T,seen,d){if(!plain(o)||seen.has(o)||d>40)return;seen.add(o);
 for(const k of Object.keys(o)){const v=o[k];if(plain(v)&&T.has(v)){o[k]=Array.isArray(o)?null:null;TB.stat.scrub++;continue}scrub(v,T,seen,d+1)}}
/* the core start() (j2 + the wrappers loaded before j52) ran on a scratch harem: put her into the ROOM world (context b) */
function rebase(K){const T=new Set((rivals||[]).filter(v=>v&&!v.coop));
 rivals=K.R0;rid=K.rid0;try{if(K.sid0!=null)sidN=K.sid0}catch(e){}
 const s=S;for(const k of X.W_KEYS){if(k in K.W0)s[k]=K.W0[k];else delete s[k]}
 /* attach's list: the new life knows nobody yet */
 s.rl={};s.ro={};s.tonight=null;s.toMorning=0;s.heir=null;s.evd={};s.chat={};s.cev={};s.resHead=null;s.where=null;s.dead=false;
 const wasSrv=!!(s.srv&&!s.srv.risen);if(wasSrv)s.srv=null;
 scrub(s,T,new Set(),0);
 /* her personal part of the shared world objects starts blank (empKnown / cmP / menP) */
 if(plain(s.emp))s.emp.known={};
 if(plain(s.cm)){for(const f of X.CM_P)delete s.cm[f];s.cm.seen={}}
 if(Array.isArray(s.men))for(const m of s.men){if(!plain(m))continue;for(const f of X.MEN_P)delete m[f];m.tinh=0;m.letters=0;m.trysts=0;m.af=0;m.knowsMe=[]}
 /* NPCs start fresh toward the new face (her viewer rows in context b); evm / resHead "me" = her */
 K.old=new Map();for(const r of npcs()){K.old.set(r,[r.rel,r.oan,r.ghen,r.ev,r.evm&&r.evm.me]);r.rel=0;r.oan=0;r.ghen=ghenNew0()/* ONE CORE: j1 newRival's rule */;r.ev=0;if(plain(r.evm))r.evm.me=0;if(r.resHead==="me")r.resHead=null}
 /* re-made on real people */
 if(s.foe&&!rivals.some(v=>v&&!v.coop&&v.name===s.foe)){const v=pick(liveRivals(false).filter(x=>!x.coop));if(v){s.foe=v.name;TB.stat.foe++}}
 if(s.ally){const L=(s.logs||[]);for(let i=L.length-1;i>=0;i--)if(/là người quen cũ, sẵn lòng che chở ngươi/.test(String(L[i]&&L[i].t||L[i])))L.splice(i,1);
  if(allyBond(liveRivals(false).filter(x=>!x.coop)))TB.stat.ally++}/* ONE CORE: j2 allyBond (BAL.eff.j2.start) */
 if(wasSrv&&typeof srvInit==="function"){const L=X.pullFriend();try{srvInit()}finally{X.pushFriend(L)}TB.stat.mistress++}
 if(!s.srv){s.place="home";s.visit={k:"home",people:homePeople(),talked:false}}}
function npcs(){return (rivals||[]).filter(v=>v&&!v.coop)}
/* the seeded core build: what nlRun does, then rebase (before any start() wrapper loaded after j52 runs) */
function core(K){K.go=1;const mr=Math.random;NLR={face:nlRng((K.seed^0x5bd1e995)>>>0)};Math.random=nlRng(K.seed);rid=0;try{if(typeof sidN!=="undefined")sidN=0}catch(e){}
 NLP={seed:K.seed};try{_start52()}finally{Math.random=mr;NLR=null}rebase(K);K.done=1}
if(typeof nlBegin==="function"){const f=nlBegin;nlBegin=function(){if(CW.ctx&&TB.K)return core(TB.K);return f.apply(this,arguments)}}
function blob(life){const P=X.myBlob(ser().S);P.life=life;P.dead=false;return P}
/* the rows of every NPC toward her new face (what the guest shows); then the host's own world gets the room's old numbers back */
function rowsOut(K){const o={};for(const [r,v] of K.old){o[r.id]=[r.rel||0,r.oan||0,r.ghen||0,r.ev||0];r.rel=v[0];r.oan=v[1];r.ghen=v[2];r.ev=v[3];if(plain(r.evm)){if(v[4]===undefined)delete r.evm.me;else r.evm.me=v[4]}}return o}
function mistressOk(){if(!S.srv)return true;const m=typeof RV==="function"?RV(S.srv.mid):null;return !!(m&&!m.coop&&m.alive&&!m.out&&+m.id<900)}
function roll(a){const seat=CW.ctx;const oP=CW.base&&CW.base.P&&CW.base.P[seat];const thq0=Array.isArray(S&&S.thq)?S.thq:null;/* B r2: her D cards are D's, never the new life's to drop */
 const K=TB.K={seed:(+a.seed>>>0)||1,R0:rivals,rid0:rid,sid0:typeof sidN!=="undefined"?sidN:null,W0:{}};for(const k of X.W_KEYS)if(k in S)K.W0[k]=S[k];
 const tab0=tab;TB.renamed=null;
 try{start()}finally{TB.K=null;tab=tab0;quiet=true;
  /* a throw inside the core build: the room world goes back as it was (her store is rebuilt from the room) */
  if(!K.done){rivals=K.R0;rid=K.rid0;try{if(K.sid0!=null)sidN=K.sid0}catch(e){}for(const k of X.W_KEYS){if(k in K.W0)S[k]=K.W0[k];else delete S[k]}TH.seatDrop(CW.ctx)}}
 if(!K.go||!K.done||rivals!==K.R0)throw new Error("life: core build did not run");
 if(thq0)S.thq=thq0;
 checkNames();if(!mistressOk()){const L=X.pullFriend();try{S.srv=null;srvInit()}finally{X.pushFriend(L)}tab=tab0}
 if(a.re)S.nlRe=a.re|0;
 const life=((oP&&oP.life)||0)+1,rows=rowsOut(K);
 const key=K.seed+"#"+(a.re|0)+"#"+life;TB.last={key,life,rows,P:null,wk:COOP.state&&COOP.state.week||0};TB.hold=true;TB.stat.roll++;
 const P=blob(life);TB.last.P=P;
 return {st:"roll",key,P,q:qSer(Q),rows,ok:mistressOk(),renamed:TB.renamed}}
function accept(a){if(TB.cache[a.key])return TB.cache[a.key];try{if(TH.D&&TH.D.RV)delete TH.D.RV[CW.ctx]}catch(e){}/* D r1: a new face: this week's row deltas of the old face are gone with it */const L=TB.last;if(!L||L.key!==a.key)return {st:"accept",key:a.key,err:"stale"};
 NLP=null;S.pdw=pdBase();S.pdLife=0;if(S.nlRe)log(`Đã đổi thân phận ${S.nlRe} lần (−${S.nlRe*PD_COST} Phúc duyên).`);
 const tab0=tab;
 try{if(a.kc)S.kcPick=String(a.kc);if(a.kc==="nha"&&!S.kc&&typeof kcInit==="function"&&kcOk(S.origin.k)&&!S.srv)kcInit()}finally{tab=tab0}
 Q=Q.filter(m=>!m.nl);
 const P=blob(L.life);const r={st:"accept",key:a.key,P,q:qSer(Q),rows:L.rows};
 TB.cache={[a.key]:r};TB.hold=false;TB.last=null;TB.stat.accept++;
 /* B r2 (seam): D's side of a new life. Her cards: the ones that wait for her answer (D.ANS: the other player's invite / Mua chuộc) stay with
    her (his act gets an answer; one that no longer fits her new life answers him "gone" at her pick), news of the old life go with it; the
    old life's unacked patches are void; until the room has her `me`, her store is built from THIS person (TH.pbase), and the D work held
    during the roll runs now, on it */
 const seat=CW.ctx,D=TH.D;if(TH.dOn()){const L0=Array.isArray(S.thq)?S.thq:[];const keep=L0.filter(c=>c&&D.ANS.includes(c.pid));if(L0.length>keep.length)D.log.push(["life-cards",seat,L0.length-keep.length]);
  D.keepQ(seat,keep);D.dropPQ(seat)}
 TH.pbase[seat]=J(P);TH.seatDrop(seat);/* her `me` (the guest sends this blob) rebuilds it from the room */
 setTimeout(()=>{try{TH.D.flush(seat)}catch(e){console.error(e)}},0);
 return r}
TH.blank=seat=>TH.curDo==="life"&&seat!==CW.seat;
TH.onDo("life",(a)=>{a=a||{};if(a.st==="accept")return accept(a);return roll(a)});
/* the store follows the room (her week is still played on her phone until E-G), except while a rolled life waits for her accept */
const drop=()=>{if(host()&&!CW.ctx&&!TB.hold)TH.seatDrop(CW.seat==="a"?"b":"a")};
/* B r1 item 3: the rolled life is held only while she can still accept it: she left / reloaded / dropped (peer offline: her phone keeps no
   roll, an accept after it gets "stale" and re-rolls the same seed + reroll count) or a week merged after the roll → the hold, the rolled
   person and her store go (rebuilt from the room = her real person) */
function release(why){if(!host()||CW.ctx||!TB.hold)return;TB.hold=false;TB.last=null;TB.stat.release=(TB.stat.release||0)+1;TB.why=why;TH.seatDrop(other());
 try{TH.D.flush(other())}catch(e){console.error(e)}/* B r2: the D work held for her runs on the room's person (she left / a week merged) */}
COOP.on("peer",o=>{if(!o){release("left");if(host())TH.pbase={}/* B r2: her `me` may never come: the room's person again */}});
COOP.on("week",()=>{if(TB.last&&(COOP.state&&COOP.state.week||0)>TB.last.wk)release("week");if(host())TH.pbase={};drop()});COOP.on("state",drop);

/* ================= GUEST ================= */
const SEND_MS=8000;
function ask(o){if(host()||!on())return false;const id=TH.doSend("life",o);TB.ask={id,o,at:Date.now(),n:(TB.ask&&TB.ask.o===o?TB.ask.n:0)+1};
 clearTimeout(TB.t);TB.t=setTimeout(again,SEND_MS);return id}
function again(){const A=TB.ask;if(!A||!CW.on)return;if(!on()){TB.ask=null;oldPath(A.o);return}TB.stat.resend++;ask(A.o)}
/* the level dropped below 2 while she waited (a seat left / an old build joined): the old path builds her life on her phone */
function oldPath(o){TB.stat.old++;Q=Q.filter(m=>!m.thw);if(o.st==="accept"){try{nlAcc0(false)}catch(e){console.error(e)}return}try{start0()}catch(e){console.error(e)}}
/* B r1 item 1: the wait note is a plain kit note (no nl / nlcard: those draw the person in S = her DEAD old life, with the Độ khó tabs and the
   ✕ that accepted it); closing it only hides the note (no action); the host's answer replaces it (show: Q = her dialogs, then nlCard) */
function waitCard(){Q=Q.filter(m=>!m.nl&&!m.thw);Q.unshift({thw:1,t:"Sổ luân hồi",h:`<p class="past">Sổ luân hồi đang định thân phận kiếp này, xin đợi giây lát.</p>`});try{showModal()}catch(e){}}
function rollAsk(seed,re){CW.inLife=true;NLP={seed:0,thin:1};TB.key=null;ask({st:"roll",seed,re:re|0});if(S)waitCard()}
/* the host's answer: her person shown through the display path (fromCanon of the room world + her blob + the rows toward her) */
function show(r){const C2=J(CW.dying||CW.base);if(!C2||!C2.W)return false;C2.P=C2.P||{};C2.P[CW.seat]=J(r.P);
 const mp=CW.seat==="a"?901:902;for(const x of C2.W.R||[]){const v=r.rows&&r.rows[x.id];if(!v)continue;x.rl=x.rl||{};x.ro=x.ro||{};x.gp=x.gp||{};x.ep=x.ep||{};
  x.rl[mp]=v[0];x.ro[mp]=v[1];x.gp[mp]=v[2];x.ep[mp]=v[3];if(x.evm)x.evm[mp]=0;if(x.resHead===mp)x.resHead=null}
 CW.fromCanon(C2);CW.life=r.P.life||CW.life;
 const qs=[];for(const e of r.q||[]){try{if(e.pid){const d=mkP(e.pid,e.pp);if(d)qs.push({t:e.t||"Việc khó xử",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,cls:d.cls})}
  else qs.push({t:e.t,h:e.h,cls:e.cls,btn:e.btn,who:typeof WHO==="function"?WHO(e.w):undefined,headArt:e.art||undefined,stage:e.st?[S]:undefined})}catch(x){console.error(x)}}
 Q=qs;return true}
function lifeRes(r){if(!r||!r.P){if(r&&r.err==="stale"){const s=nlGet();rollAsk(s.seed,s.re|0)/* B r1 item 4: her real reroll count */}return}
 clearTimeout(TB.t);TB.ask=null;
 if(r.st==="roll"){if(!show(r))return;CW.inLife=true;TB.key=r.key;NLP={seed:0,thin:1}/* truthy for the card (jkc road cards, no pdCheck); never a stored seed, so nlFaces never repaints faces here */;try{nlCard()}catch(e){console.error(e)}return}
 if(r.st==="accept"){if(!show(r))return;NLP=null;try{nlNew()}catch(e){}TB.key=null;CW.inLife=false;
  try{CW.sendMe(J(r.P))}catch(e){console.error(e)}
  /* B r2 (seam): her D cards / patches were held off her S during the life change (gSync); her accepted person is in now */
  try{if(TH.gSync)TH.gSync(TH.view)}catch(e){console.error(e)}try{showModal();render()}catch(e){}}}
COOP.on("thinview",V=>{if(host()||!V||!V.o)return;const d=V.o.dr;if(!d||d.op!=="life"||!TB.ask||d.id!==TB.ask.id)return;lifeRes(d.r)});
COOP.on("error",m=>{if(host()||!m||!TB.ask||(m.id&&m.id!==TB.ask.id))return;
 if(m.code==="nothin"){const A=TB.ask;TB.ask=null;clearTimeout(TB.t);oldPath(A.o)}
 else if(m.code==="nohost"){clearTimeout(TB.t);TB.t=setTimeout(again,SEND_MS)}});
COOP.on("peer",o=>{if(o&&!host()&&TB.ask)again()});
/* the room level is told after the room reply: a first life asked before it arrives waits for it (at most WAITLVL ms) */
let seen=false;COOP.on("room",()=>{seen=false});COOP.on("thin",()=>{seen=true});
const WAITLVL=3000;
const guestThin=()=>CW.on&&!host()&&!CW.ctx;
const start0=start;
start=function(){if(!guestThin())return start0.apply(this,arguments);
 if(on()){try{kmReset()}catch(e){}const d=nlGet();return rollAsk(d.seed,d.re|0)}
 if(seen||TH.CAP<LV)return start0.apply(this,arguments);
 const self=this,args=arguments,t0=Date.now();const w=()=>{if(on()){const d=nlGet();return rollAsk(d.seed,d.re|0)}if(seen||Date.now()-t0>WAITLVL)return start0.apply(self,args);setTimeout(w,100)};w()};
const nlAcc0=nlAccept;
nlAccept=function(viaClose){if(guestThin()&&TB.ask&&on())return;/* B r1 item 1: an intent is out: nothing local, ever (the old accept would run on her dead S) */
 if(!(guestThin()&&TB.key))return nlAcc0.apply(this,arguments);const kc=window.__kcO||(S&&S.kcPick)||null;ask({st:"accept",key:TB.key,kc});if(!viaClose&&S)waitCard()};
const nlRe0=nlReroll;
nlReroll=function(){if(guestThin()&&TB.ask&&on())return;if(!(guestThin()&&TB.key))return nlRe0.apply(this,arguments);
 const pts=pdGet();if(pts<PD_COST)return;const re=(S&&S.nlRe||0)+1;pdSet(pts-PD_COST);const d={seed:nlSeed(),at:Date.now(),re};store.set(NL_KEY,d);rollAsk(d.seed,re)};
}catch(e){console.error("jcoopthinb",e)}})();
