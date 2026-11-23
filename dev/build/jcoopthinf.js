/* jcoopthinf: CO-OP THIN GUEST, part F = HER OWN ACTS AS INTENTS (review/coop-thin-f1; audit dev/handover/reports/coop-thin-guest-audit.md
   §3 row F; report dev/handover/reports/coop-thin-f1.md; owner GO 17/11 ~01:40Z, no option-1 patching ~02:05Z). Behind the room level:
   TH.on(6), on only when BOTH seats run a build with it (Worker: level = min(want, cap a, cap b)). Solo and rooms below level 6 run nothing.
   ONE wrapper for every engine function a part moves (F1 runAct; F2–F5 register goTo / buy / useItem / mini-game scores the same way):
     TH.F.reg(name, {mine(args)→bool, enc(args)→plain|null, dec(a)→args|null, log:bool, ctx:[[name,get,set],…], title(args)→the result card's title})
   GUEST (seat b, level 6, not inside a host context or a world step still on her phone): the call never runs here. Her person diff since the
     host's copy (E.base: ONE baseline, shared with `do ready`) rides IN the intent (atomic: a resend is applied once), `do f {n,a,c,ops}`;
     the act is PENDING (a second act tap is ignored, #next locked with the existing wait words, act buttons off through can()); the caller
     gets "" (its `if(r)log(r)` logs nothing; spend() stays on her phone = her khắc clock). The answer comes in ONE view message: dr (this
     id) + her part-D patch (her log line, costs, cards) + the host's world → one render, nothing to undo, no flicker. No answer in 8 s →
     the same intent again (same id), 3 times at most, then a kit line and nothing applied.
   HOST (runDo: withSeat("b") from the top of the event loop): an id is run once (kept per room), her ops onto her stored person, the
     call-scoped context set for the call only, args decoded in HER context (the friend = the host's stand-in), the INNER function run (every
     inner wrapper = her act's effects, computed once), log(r) in her context. Acts between the two are ordinary acts in this one engine
     (jcoopworld sendRes at fW(): the stand-in's change → resApply on the host's own person, no message).
   Retired at level 6 for runAct (bypassed: deleted when level >= 6 is the default, part H): part C's act frame + `do npc` ops for her acts,
   jcoopworld sendRes / `res` + ack for her acts on the host, her invite relay (`do inv`), the act-time use of ctm-fam.
   API: TH.F = {on, reg, stat, pend, log}. */
(function(){try{
const CW=window.COOPW;if(!CW||!CW.thin||!CW.X||typeof COOP!=="object")return;
const TH=CW.thin,X=CW.X,J=X.J,D=TH.D,E=TH.E,LV=6;
const host=()=>CW.seat==="a",on=lv=>TH.on(lv||LV);
const F=TH.F={on,R:{},stat:{sent:0,ans:0,resend:0,give:0,run:0,dup:0,busy:0,local:0,bad:0,ms:[]},pend:null,log:[]};
const lg=x=>{F.log.push(x);if(F.log.length>60)F.log.shift()};
const RAW=Symbol.for("ctm.lens.raw");
const isMe=a=>!!a&&(a===S||a[RAW]===S||(S&&S[RAW]&&S[RAW]===a));
const LSK=()=>"ctm-thin-f:"+(COOP.state.room||"");
const PRE={};/* name → the function below the wrapper (the host runs it) */
F.PRE=PRE;/* F6b: a later part's host-side wrapper of a registered function goes here (the host runs PRE[name], not window[name]) */

/* ---------- guest ---------- */
/* reviewer r1 (her act's result card): in solo and below level 6 the caller that snapshots her stats before an act (rsnap: wrapR doAct,
   the place pop-up j65, the other result-card callers) shows the kit result card (resultShow, #rtoast) right after the act. At level 6
   the act's result comes later in the host's answer, so that check sees no change and her phone showed NO result card. The snapshot the
   caller took in the same tick rides with the pending intent; the card is shown once, when the answer (with her patch) has landed: the
   same kit card, title and rows as solo. A caller that took no snapshot never had a card (solo neither): none here. */
let snapV=null;
if(typeof rsnap==="function"){const r0=rsnap;rsnap=function(){const o=r0.apply(this,arguments);if(CW.ctx&&o&&typeof o==="object")try{Object.defineProperty(o,"__ctx",{value:CW.ctx})}catch(e){}snapV=o;Promise.resolve().then(()=>{if(snapV===o)snapV=null});return o}}
function cardLater(p,dr){const b=p.bf;if(!b||!dr||!dr.r||dr.r.st!=="ok"||typeof resultShow!=="function")return;
 setTimeout(()=>{try{if(!S||S.dead)return;if(p.force||(S.logSeq||0)!==b.seq||RKEYS.some(([k])=>(S[k]||0)!==b[k])){F.stat.card=(F.stat.card|0)+1;const R=F.R[p.n],rs=dr.r.rs;resultShow(p.ttl||(rs&&rs[0])||"",b,p.force?true:(R&&R.okHint?R.okHint(dr):rs?rs[1]:null))/* F5: the hint may read the host's answer */}}catch(e){console.error("thin F card",e)}},0)}
function gOn(lv){return on(lv)&&!host()&&!!CW.seat&&!CW.ctx&&!!S&&!S.dead&&!CW.inLife&&!CW.inFC&&!CW.allow&&!CW.allowN&&!(TH.C&&TH.C.inWorld&&TH.C.inWorld())}
F.gOn=lv=>gOn(lv);
function line(t){try{if(typeof kitLine==="function")kitLine(t);else log(t)}catch(e){}}
function sendF(p){COOP.send({t:"do",op:"f",args:p.msg,base:TH.view?TH.view.v:0,id:p.id});E.last=p.id;p.at=Date.now()}
function intent(name,args){const R=F.R[name],t00=performance.now();
 if(F.pend){/* review coop-ptime-reds r1: the pending one is her due-task tick (ptTickHer, asked by the game, not by her): her tap is HELD and sent
    right after its answer (it was refused as busy = her tap lost, f4 swap D1); one held tap at most, a second tap is the ordinary double tap */
  if(F.pend.n==="ptTickHer"&&name!=="ptTickHer"&&!F.next){F.next={name,args,snap:snapV};F.stat.held=(F.stat.held|0)+1;lg(["held",name]);return true}
  F.stat.busy++;return "busy"}
 let a=null;try{a=R.enc(args)}catch(e){console.error("thin F enc",name,e)}if(a==null){F.stat.bad++;lg(["bad",name]);return "bad"}
 const V=TH.view;if(!V||!V.o){F.stat.bad++;return "bad"}
 if(R.snap&&typeof rsnap==="function")try{rsnap()}catch(e){}
 try{TH.gSync(V)}catch(e){}
 const c={};for(const [n,g] of R.ctx||[])try{const v=g();if(v!=null)c[n]=J(v)}catch(e){}
 let ops=[],cur=null;try{cur=E.curP();ops=TH.pDiff(E.base(V),cur)}catch(e){console.error("thin F diff",e)}
 const L=E.packs(ops);const last=L.pop()||[];const rid="f"+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
 L.forEach((o,i)=>TH.doSend("erd",{id:rid,i,ops:o}));if(cur)E.sent(cur);
 const p=F.pend={id:"d"+rid,n:name,msg:{n:name,a,c,ops:last},t0:Date.now(),tries:0,pre:Math.round(performance.now()-t00)};p.bf=snapV;try{if(p.bf&&R.title)p.ttl=R.title(args)}catch(e){}p.force=!!R.snap&&R.snap!=="soft"/* F3: "soft" = the caller's own wrapR rule (a card only when something changed, its ok word from the run) */;p.args=args;p.b0=S.buoi||0;p.w0=COOP.state.week||0;p.room=COOP.state.room||"";try{p.walk=R.walk?R.walk(args):null}catch(e){p.walk=null}sendF(p);F.lastMsg=p.msg;F.stat.sent++;lg(["sent",name,p.id,ops.length]);
 /* the pending state shows at once: #next locked + her act buttons off, in this same tick (no lost tap: the tap is held as the intent) */
 const t1=performance.now();try{CW.lockNext();render()}catch(e){}p.pr=Math.round(performance.now()-t1);return true}
function answered(dr){const p=F.pend;if(!p||!dr||dr.id!==p.id)return;F.pend=null;F.stat.ans++;const ms=Date.now()-p.t0;F.stat.ms.push(ms);if(F.stat.ms.length>40)F.stat.ms.shift();
 lg(["ans",p.n,ms,dr.r&&dr.r.st]);F.lastAns={id:p.id,n:p.n,ms,r:dr.r/* the view's own object (main behaviour; the guest's name lens edits it in place) */,r0:dr.r?J(dr.r):null/* F2: the answer as sent */,pre:p.pre,pr:p.pr,tries:p.tries};
 back(p,dr.r);try{CW.lockNext();render()}catch(e){}cardLater(p,dr);nextGo();}
/* the tap held behind her due-task tick: sent now (its own snapshot for the result card) */
function nextGo(drop){const n=F.next;if(!n)return;F.next=null;if(drop||!on()||host())return;try{snapV=n.snap;intent(n.name,n.args)}catch(e){console.error("thin F held",e)}finally{snapV=null}}
/* F2 (gap 2/3): what the host's run wrote OUTSIDE her person (her khắc `used`, the pop-up popIdx/popMsg, tab / __fromMap) comes back with
   the answer and is set here (only while she is still on the buổi the intent was made in: a buổi step resets them anyway); toasts her run
   raised on the host (srvToast / kitLine, no-ops there) play here; then the registration's after-hook (e.g. the place card of a walk that
   did not arrive, exactly where solo shows it) */
function back(p,r){const R=F.R[p.n];if(!R||!r||r.st!=="ok")return;
 try{if(r.c&&(S.buoi||0)===p.b0&&(COOP.state.week||0)===p.w0)for(const [n,,s] of R.ctx||[])if((R.back||[]).includes(n)&&n in r.c&&JSON.stringify(r.c[n])!==JSON.stringify((p.msg.c||{})[n]===undefined?null:p.msg.c[n]))s(r.c[n])/* only what her run changed */}catch(e){console.error("thin F back",e)}
 try{if(r.ui)TH.uiPlay(r.ui)}catch(e){}
 try{if(R.done)R.done(p.args,r,p)}catch(e){console.error("thin F done",e)}}
COOP.on("thinview",V=>{try{if(!host()&&V&&V.o)answered(V.o.dr)}catch(e){console.error("thin F view",e)}});
COOP.on("error",m=>{try{const p=F.pend;if(!p||!m||m.id!==p.id||host())return;if(m.code==="nohost"||m.code==="nothin")p.at=0/* resend at the next tick */}catch(e){}});
setInterval(()=>{const p=F.pend;if(!p||host())return;if(!on()||COOP.frozen)return;if(Date.now()-p.at<8000)return;
 if(p.tries>=3){F.pend=null;F.stat.give++;lg(["give",p.n,p.id]);line("Việc ấy chưa thành, xin thử lại.");try{CW.lockNext();render()}catch(e){}nextGo();return}
 p.tries++;F.stat.resend++;lg(["resend",p.n,p.id,p.tries]);sendF(p)},1000);
/* F2 net loss (the whole intent family, F1 too): her socket can look open while dead (4G, sleep): the intent frame, or the host's answer,
   is lost, then COOP reconnects ("room"). Dropping the pending intent there lost her tap in silence (a P7 walk-spill red: the host ran the
   walk, her phone never heard, no resend, no word). Same room + same week: keep it and send it again as soon as the room level is back
   (the 1 s tick below; the host dedupes by intent id, DONE kept per room, so a walk the host already ran is answered from DONE, never run
   twice). Another room / another week: the intent is stale, dropped with the "not done" word (her tap is never silently lost). */
/* r2 (review r1 item 2): the room may have stepped the buổi while her socket was dead (a time-out forceBend): the intent's ctx (her khắc
   `used`) belongs to the old buổi, so it is resent only once her reconnect view shows the SAME buổi (p.b0); another buổi → dropped with the
   same words. The check waits for her first view after the reconnect (p.rv), then the 1 s tick sends it (DONE dedupe on the host unchanged). */
const stale=p=>p.room!==(COOP.state.room||"")||(COOP.state.week||0)!==p.w0;
function dropP(p,why){F.pend=null;nextGo(1)/* stale room / buổi: the held tap goes with it (the same «not done» words below) */;lg(["drop",p.n,p.id,why]);F.stat.drop=(F.stat.drop|0)+1;line("Việc ấy chưa thành, xin thử lại.");try{CW.lockNext();render()}catch(e){}}
COOP.on("room",()=>{const p=F.pend;if(!p)return;if(stale(p))return dropP(p,"room");
 p.rv=Date.now();p.at=Infinity/* held until her view after the reconnect (or 8 s: the check runs on what she has) */;F.stat.reNet=(F.stat.reNet|0)+1;lg(["reNet",p.n,p.id])});
function reCheck(p){if(stale(p))return dropP(p,"room");if((S.buoi||0)!==p.b0)return dropP(p,"buoi");p.rv=0;p.at=0/* same buổi: sent again at the next tick */}
COOP.on("thinview",V=>{const p=F.pend;if(!p||!p.rv||host())return;try{if(V&&V.o&&V.o.dr&&V.o.dr.id===p.id)return/* answered: handled above */;reCheck(p)}catch(e){console.error("thin F reNet",e)}});
setInterval(()=>{const p=F.pend;if(p&&p.rv&&!host()&&Date.now()-p.rv>8000)try{reCheck(p)}catch(e){}},1000);
/* pending = busy: #next waits (existing lockNext words through CW.eWait), act buttons off (can) */
{const w=CW.eWait;CW.eWait=()=>!!(w&&w())||!!(F.pend&&on()&&!host())}
if(typeof can==="function"){const f=can;can=function(){if(F.pend&&on()&&!host()&&!CW.ctx)return false;return f.apply(this,arguments)}}

/* ---------- host ---------- */
const DONE=new Map();
/* F3 (proven gap: a registered UI function wrapped by wrapR / with its own rsnap → resultShow ran IN her context on the host and opened her
   result card on the HOST's screen): while such a registration runs for her the card is not shown here; it shows on her phone after the
   answer (cardLater, R.snap "soft" = the same wrapR rule as solo) */
let NORES=0,RSL=null;if(typeof resultShow==="function"){const rs=resultShow;resultShow=function(){if(NORES>0&&CW.ctx){RSL=[arguments[0],arguments[2]];return}return rs.apply(this,arguments)}}/* F6a: the card her run asked for (title, ok word) rides with the answer (out.rs) */
function doneLoad(){try{const o=JSON.parse(localStorage.getItem(LSK())||"null");if(o&&Array.isArray(o.d))for(const [k,v] of o.d)DONE.set(k,v)}catch(e){}}
function doneSave(){try{while(DONE.size>60)DONE.delete(DONE.keys().next().value);localStorage.setItem(LSK(),JSON.stringify({d:[...DONE]}))}catch(e){}}
let loaded="";
TH.onDo("f",(a,m)=>{a=a||{};const id=m&&m.id;if(loaded!==LSK()){DONE.clear();doneLoad();loaded=LSK()}
 if(id&&DONE.has(id)){F.stat.dup++;lg(["dup",a.n,id]);return DONE.get(id)}
 const R=F.R[a.n];if(!R||!on(R.lv)){return {st:"off"}}
 if(Array.isArray(a.ops))a.ops=a.ops.filter(o=>!(Array.isArray(o[1])&&E.BAD&&E.BAD.has(o[1][0])));/* belt: her diff never writes a host-owned key (buoi, origin, thq …) */
 if(Array.isArray(a.ops)&&a.ops.length){lg(["ops",a.n,a.ops.slice(0,16).map(o=>String(o[0])+(Array.isArray(o[1])?o[1].map(x=>typeof x==="object"?"#":x).join("."):"")+(typeof o[2]==="number"||typeof o[2]==="string"?"="+String(o[2]).slice(0,12):""))]);TH.pApply(S,a.ops);try{D.rebase()}catch(e){}}
 let out={st:"ok"};const keep=[];
 try{for(const [n,g,s] of R.ctx||[]){keep.push([s,g()]);s(n in (a.c||{})?a.c[n]:null)}
  const args=R.dec(a.a);if(!args){out={st:"gone"}}
  else{/* F2 r2 (review r1 item 1, every registration, F1 too): her tap runs as solo (TH.tapRun: quiet off → her cards into her Q = part D
      cards on her phone; her toasts / floaters / coin and item effects captured, played on HER phone with the answer; nothing on the host's screen) */
   if(R.noRes)NORES++;RSL=null;let T;try{T=TH.tapRun(()=>{if(R.pre)R.pre(args)/* F5: what the host does first in her run (the deferred cost, the host's own rolls) */;return PRE[a.n].apply(null,args)})}finally{if(R.noRes)NORES--}/* F3: a registered UI function's own wrapR card shows on her phone (cardLater), never here */
   const r=T.r,ui=T.ui;if(a.n==="ptTickHer")F.stat.ptRun=(F.stat.ptRun|0)+1;else F.stat.run++;/* her due tasks landing (coop-ptime-reds) is not one of her acts: counted apart */if(R.log&&r)log(r);out={st:"ok",r:typeof r==="string"?r.replace(/<[^>]+>/g,"").slice(0,200):null};
   if(typeof r==="boolean")out.rv=r;if(R.noRes&&RSL){out.rs=[String(RSL[0]==null?"":RSL[0]).replace(/<[^>]+>/g,"").slice(0,160),RSL[1]==null?null:!!RSL[1]];RSL=null}if(ui&&ui.length)out.ui=ui/* hostnull (c): all of them; BAL.coopUi paces them on her phone (was slice(0,4): a 5th effect was lost) */;
   if(R.back){const c={};for(const [n,g] of R.ctx||[])if(R.back.includes(n))try{const v=g();c[n]=v===undefined?null:J(v)}catch(e){}out.c=c}
   if(R.host)try{R.host(args,out)}catch(e){console.error("thin F host",e)}}}
 catch(e){console.error("thin F run",a.n,e);out={st:"err",e:String(e&&e.message||e).slice(0,200)}}
 finally{for(const [s,v] of keep)try{s(v)}catch(e){}}
 lg(["run",a.n,out.st]);if(id){DONE.set(id,out);doneSave()}return out});

/* ---------- the wrapper ---------- */
/* F2 (whole family, F1 too): her phone reconnected and the room's level is not back yet (TH.lvl 0 until the server's "thin" answer): a tap
   in that gap must not take the old road (her walk / act run on her phone, then thrown away by the host's next view = a lost or doubled
   tap). It is refused with the existing linking words (the same gap #next is locked in, jcoopworld lockNext). */
const gap=lv=>!host()&&!!CW.on&&(CW.lvWas|0)>=(lv||LV)&&!on(lv);
const gapWord=()=>{try{return (typeof CTM_WAIT==="object"&&CTM_WAIT.coopLinking)||"Đang nối…"}catch(e){return "Đang nối…"}};
F.reg=function(name,R){const f=window[name];if(typeof f!=="function"||F.R[name])return false;F.R[name]=R;PRE[name]=f;
 window[name]=function(){if(gap(R.lv)&&(!R.lv||R.mine(arguments))){F.stat.gap=(F.stat.gap|0)+1;lg(["gap",name]);line(gapWord());return R.ret!==undefined?R.ret:""}
  if(!on(R.lv)||host())return f.apply(this,arguments);
  if(!R.lv&&!R.mine(arguments))return f.apply(this,arguments);/* F1 order kept */
  if(!gOn(R.lv)){F.stat.local++;return f.apply(this,arguments)}
  if(R.lv&&!R.mine(arguments)){F.stat.gate=(F.stat.gate|0)+1;return f.apply(this,arguments)}/* F2: a decision card first (local, read-only) */
  const st=intent(name,[...arguments]);if(st==="bad"&&R.lv){F.stat.local++;return f.apply(this,arguments)}return R.ret!==undefined?R.ret:""};return true};

/* ---------- F1: runAct (her Hành động acts) ---------- */
F.reg("runAct",{log:true,title:A=>ACT[A[2]]?ACT[A[2]].n:"",
 mine:A=>isMe(A[0])&&!!A[1]&&!isMe(A[1]),
 enc:A=>{const t=A[1],k=A[2],x=A[3];const id=t[RAW]?t[RAW].id:t.id;if(id==null||!ACT[k])return null;
  const o={t:id,k};if(typeof x==="number"){o.x=x;const e=S.inv&&S.inv[x];if(e)o.xe=J(C0(e))}else if(x!=null)o.xv=J(x);return o},
 dec:a=>{if(!a||!ACT[a.k])return null;const t=(rivals||[]).find(v=>v&&v.id===a.t);if(!t||t===S)return null;let x=a.xv;
  if(a.xe){const i=itemFind(a.xe,a.x);if(i<0)return null;x=i}
  else if(typeof a.x==="number")x=a.x;return [S,t,a.k,x]},
 ctx:[["sg",()=>typeof SG==="object"&&SG.mod?SG.mod:null,v=>{if(typeof SG==="object")SG.mod=v}],["err",()=>S.__err||null,v=>{S.__err=v||0}],
  /* econ-tamco: her scheme road (Tâm cơ / hired hand + the odds she saw) rides with the act; the host pays and rolls it in her context (jtamco runAct) */
  ["econ",()=>window.ECON_HER||null,v=>{window.ECON_HER=v||null}]]});
function C0(e){const o=Object.assign({},e);delete o.ci;return o}
/* F3 (whole family, F1's runAct item too): the item she tapped, found in her stored bag on the host. Tiers: the same index and the same
   item (keys in any order: a patch / ilUid can add a key in another order on one phone), any same item, then the same index with the same
   kind and no other ledger id (iu: a lazy id one phone may not have given yet), then the first piece of that kind with no other ledger id.
   Never a piece of another kind. */
const SJ=o=>JSON.stringify(o,(k,v)=>v&&typeof v==="object"&&!Array.isArray(v)?Object.keys(v).sort().reduce((r,x)=>(r[x]=v[x],r),{}):v);
function itemFind(xe,x){if(!xe)return -1;const I=S.inv||[],s=SJ(xe);const eq=e=>!!e&&SJ(C0(e))===s;if(typeof x==="number"&&eq(I[x]))return x;let i=I.findIndex(eq);if(i>=0)return i;
 const kin=e=>!!e&&!e.h&&e.k===xe.k&&(e.iu==null||xe.iu==null||e.iu===xe.iu)&&SJ((e.wk||null))===SJ(xe.wk||null);if(typeof x==="number"&&kin(I[x]))return x;return I.findIndex(kin)}

/* ---------- F2: her places / goTo / visits (level 7; report dev/handover/reports/coop-thin-f2.md step 0) ----------
   Registered: goTo, visitPal, goSee, accEtqGo, accAsk, accSneak, talk, scout, invite, srvGoTo, kcGo (the engine functions every walk /
   visit / greeting / talk tap ends in; routers and decision cards stay on her phone). A call whose FIRST step is a decision card (the
   trung y card jty, the access gate j41, the greeting gate j77, a walk that spills into the next buổi) runs here exactly as solo and only
   shows that card (read-only); its choice calls a registered engine = an intent. Persons travel as ids, places as keys, the road after a
   greeting as data (j77 accThen). Her khắc clock (used), the pop-up (popIdx / popMsg), tab / __fromMap and the call-scoped walk flags ride
   in ctx and the written ones come back with the answer (gap 2). */
const L7=7;
const WF=(n,z)=>[n,()=>window[n]===undefined?null:window[n],v=>{window[n]=v==null?z:v}];
const CX=[["used",()=>used,v=>{if(typeof v==="number")used=v}],["tab",()=>typeof tab==="undefined"?null:tab,v=>{if(v)tab=v}],WF("__fromMap",0),WF("__walkSpill",null),
 WF("__tyGo",0),WF("__tyCardK",null),WF("__j77etq",0),WF("__accSilent",0),WF("__accStay",0),["popIdx",()=>popIdx,v=>{popIdx=v===undefined?null:v}],["popMsg",()=>popMsg,v=>{popMsg=v==null?"":v}]];
const BACK=["used","tab","__fromMap","popIdx","popMsg"];
/* the decision cards before a walk (each = the condition its own wrapper tests; true → the walk runs here and stops at that card) */
const tyG=k=>{try{return typeof tyOn==="function"&&tyOn(S)&&!!k&&k!=="home"&&k!==S.place&&!window.__tyGo&&window.__tyCardK!==k&&!S.out}catch(e){return false}};
const accG=k=>{try{return !!k&&k!=="home"&&k!==S.place&&!window.__accStay&&typeof accessOf==="function"&&!accessOf(S,k).ok}catch(e){return false}};
const etqG=k=>{try{return !!k&&k!=="home"&&k!==S.place&&!window.__accSilent&&!window.__j77etq&&typeof accEtq==="function"&&!!accEtq(S,k)&&!S.confined&&!S.out}catch(e){return false}};
const idle=()=>!!S&&!S.dead&&!Q.length;/* solo refuses a walk under an open card: so does her phone (nothing sent) */
const gateGo=k=>tyG(k)||accG(k)||etqG(k);
const gatePerson=k=>{if(!k||S.place===k)return false;if(S.confined||S.out||accG(k)||etqG(k)||tyG(k))return true;let tc=1;try{tc=travel(S.place,k)}catch(e){}return !walkOk(tc)/* spill / no khắc: walkGo's own road */};
const vOf=id=>(rivals||[]).find(v=>v&&v.id===id)||null;
const idEnc=A=>{const v=vOf(A[0]);return v&&v!==S?{id:v.id}:null};
const idDec=a=>a&&vOf(a.id)?[a.id]:null;
/* host: her place moved → the host's world where + his stage follow her stored person at once (jcoopworld herPl7) */
/* (and one render of the host's own screen: a stage her walk repainted inside her context shows her place until then). Only walks do this:
   an extra host render in every run moves her Sổ ghi sync (jlogsync) out of step with the host's copy (bisected on F1, kept as main) */
const herMoved=()=>{try{D.after(()=>{try{if(CW.keepFriendPos)CW.keepFriendPos();if(CW.refreshHere)CW.refreshHere()}catch(e){}})}catch(e){}};
const placeCard=(A,r,p)=>{if(p&&p.card&&p.walk&&S&&S.place!==p.walk&&!Q.length&&typeof j77Card==="function")j77Card(p.walk)};
const W7={lv:L7,ctx:CX,back:BACK,host:herMoved};
F.reg("goTo",Object.assign({},W7,{mine:A=>typeof A[0]==="string"&&!!A[0]&&idle()&&!gateGo(A[0]),enc:A=>({k:A[0]}),dec:a=>a&&typeof a.k==="string"?[a.k]:null,walk:A=>A[0],done:placeCard}));
F.reg("visitPal",Object.assign({},W7,{mine:A=>{const v=vOf(A[0]);return !!v&&idle()&&!gatePerson(palaceOf(v))},enc:idEnc,dec:idDec,walk:A=>{const v=vOf(A[0]);return v?palaceOf(v):null}}));
F.reg("goSee",Object.assign({},W7,{mine:A=>{const v=vOf(A[0]);return !!v&&idle()&&!gatePerson(whereOf(v))},enc:idEnc,dec:idDec,walk:A=>{const v=vOf(A[0]);return v?whereOf(v):null}}));
const THEN=new Set(["goTo","visitPal","goSee"]);
F.reg("accEtqGo",Object.assign({},W7,{snap:true,mine:()=>idle(),
 title:A=>{const h=A[1];try{return A[2]?`Bái kiến ${accRkName(h)} ${h.name}`:`Vào ${accName(A[0])} không bái kiến`}catch(e){return ""}},
 enc:A=>{const t=A[3]&&A[3].__f;const h=A[1];if(!t||!THEN.has(t.f)||!h||h.id==null)return null;return {k:A[0],h:h.id,g:A[2]?1:0,t:{f:t.f,a:J(t.a||[]),etq:t.etq?1:0}}},
 dec:a=>{if(!a||!a.t||!THEN.has(a.t.f))return null;const h=vOf(a.h);if(!h)return null;const t=a.t;
  const then=()=>{const fn=window[t.f];if(typeof fn!=="function")return;if(t.etq){window.__j77etq=1;try{fn.apply(null,t.a)}finally{window.__j77etq=0}}else fn.apply(null,t.a)};return [a.k,h,a.g,then]},walk:A=>A[0]}));
for(const n of ["accAsk","accSneak"])F.reg(n,Object.assign({},W7,{mine:A=>typeof A[0]==="string"&&idle(),enc:A=>({k:A[0]}),dec:a=>a&&typeof a.k==="string"?[a.k]:null}));
F.reg("talk",Object.assign({},W7,{host:null,mine:A=>typeof A[0]==="number"&&popIdx!=null&&!!S&&!!S.visit&&idle(),enc:A=>({oi:A[0]}),dec:a=>a&&typeof a.oi==="number"?[a.oi]:null}));
for(const n of ["scout","invite"])F.reg(n,Object.assign({},W7,{host:null,mine:A=>typeof A[0]==="number"&&idle(),enc:idEnc,dec:idDec}));
F.reg("srvGoTo",Object.assign({},W7,{ret:false,mine:A=>typeof A[0]==="string"&&!!S&&!S.dead&&!Q.length,enc:A=>({k:A[0]}),dec:a=>a&&typeof a.k==="string"?[a.k]:null}));
F.reg("kcGo",Object.assign({},W7,{ret:false,mine:A=>typeof A[0]==="string"&&!!S&&!S.dead&&!Q.length,enc:A=>({k:A[0]}),dec:a=>a&&typeof a.k==="string"?[a.k]:null,
 done:(A,r)=>{if(r&&r.rv&&S&&S.place===A[0]){tab="act";try{render()}catch(e){}}}/* its tap handler switches to the act tab when it went (jkc :626) */}));
/* jtc (review/thancan): her «Chọn làm cung nữ thân cận» / «Thôi làm cung nữ thân cận» tap = an intent; the host decides (one world, one master.tc) */
F.reg("thcPick",{lv:LV,log:false,title:A=>A[1]?"Chọn làm cung nữ thân cận":"Thôi làm cung nữ thân cận",mine:A=>(typeof A[0]==="number"||/^m:/.test(String(A[0])))&&idle(),
 enc:A=>({k:A[0],on:A[1]?1:0}),dec:a=>a&&(typeof a.k==="number"||/^m:/.test(String(a.k)))?[a.k,a.on?1:0]:null});
/* PARALLEL TIME on the guest (coop-ptime-reds; jptime S.away): her sends created on the host (runAct gift / harm / plant …, scout, invite) or on
   her phone land at their due khắc. The landing runs the act's own runner (roll, NPC answer, giveTo, runAct, ordered servant, late order =
   Từ chối with its cost) = her act's effects, so it runs ONCE on the HOST in her context (her khắc clock `used` rides in ctx), never on her
   phone (before: her phone landed it alone → NPC rolls / world writes made on her phone, then lost under the host's next view). Her phone only
   decides that something is due (her clock is hers: spend stays on her phone) and asks; ptTick / «Đợi tin» (ptWait → spend → ptTick) both
   end here (asked right after the tap, after the tap's own intent). A tick while another of her intents is pending is asked again by the 1 s check below (lands right after, never twice:
   the host lands only what is still due in her stored person). Level 6 (F1: her runAct sends are host-made from there). */
if(typeof ptTick==="function"&&typeof ptNow==="function"&&typeof ptZ==="function"){
 const ptDue=()=>{try{if(!S||S.dead||typeof ptOn!=="function"||!ptOn())return false;const n=ptNow();
  return ptZ().some(a=>a&&!a.back&&a.due<=n)||(Array.isArray(S.ordQ)&&S.ordQ.some(o=>o&&n>=o.due))}catch(e){return false}};
 const t0=ptTick;let PTIN=0;
 /* the ONE road her landings take: an intent run on the host in her context with HER clock (ctx used) */
 window.ptTickHer=function(){PTIN++;try{return t0.apply(this,arguments)}finally{PTIN--}};
 F.reg("ptTickHer",{lv:LV,ctx:[CX[0]],back:["used"],mine:()=>ptDue(),enc:()=>({}),dec:()=>[],ret:undefined});
 ptTick=function(){
  /* guest: her phone never lands; something due at her own tap moment → asked as the intent (a world step on her phone waits for the 1 s ask) */
  /* asked AFTER the tap that moved her clock (setTimeout): sent in the same tick it would take the one pending slot and her act's own intent
     (doAct: spend → runAct) would be refused as busy = her tap lost */
  if(on()&&!host()){if(gOn()&&ptDue())setTimeout(ptAsk,0);return}
  /* host inside her context but not her tick intent (her act run with the HOST's khắc clock, e.g. a spend inside runAct): her landings wait for her intent */
  if(host()&&CW.ctx&&on()&&!PTIN)return;
  return t0.apply(this,arguments)};
 function ptAsk(){try{if(F.pend||host()||!on()||COOP.frozen||!gOn()||!ptDue())return;F.stat.ptAsk=(F.stat.ptAsk|0)+1;window.ptTickHer()}catch(e){}}
 setInterval(ptAsk,1000);
}
/* gap 4: the "did she arrive?" callers (j77Tap, walkSpillTick) open the place card right after goTo; while her walk there is pending the
   card waits for the answer (placeCard) — never a card before the host has said, never a lost tap */
if(typeof j77Card==="function"){const jc=j77Card;j77Card=function(k){const p=F.pend;if(p&&p.walk&&p.walk===k&&!host()&&on(L7)){p.card=1;return}return jc.apply(this,arguments)}}

/* ---------- F3: her bag / shop / wear / gifts (level 8; report dev/handover/reports/coop-thin-f3.md step 0) ----------
   ONE helper over the engine functions every bag / shop / wear / gift tap ends in. Arguments by kind: "me" (her S), "ix" (an index into
   her S.inv: the index + the item itself, found by value on the host, as F1's runAct item), "who" (a person as an id — the friend = the
   host's stand-in in her context — or a string "emp" / "th" / "maid", or nothing), "wl" (a list of persons), "v" (plain JSON). Her khắc
   clock, the pop-up, the odds she saw (ACTFZ, j9 fzRun) and the gift moment's picture ride in ctx; what her run changed outside S comes
   back (F2 gap 2). A function whose own wrapR / rsnap shows her result card: snap "soft" + noRes (the card shows on her phone with the
   answer, never on the host). */
const L8=8;
const CX8=CX.concat([["fz",()=>{try{return ACTFZ}catch(e){return null}},v=>{try{ACTFZ=v||null}catch(e){}}],WF("__kitLastEvArt",null),WF("__tdOk",0)]);
const BACK8=BACK.concat(["__tdOk"]);
const ixE=x=>{if(typeof x!=="number")return null;const e=S.inv&&S.inv[x];return e?{x,xe:J(C0(e))}:null};
const ixD=a=>{if(!a||!a.xe)return null;const i=itemFind(a.xe,a.x);return i<0?null:i};
const pE=x=>{if(!x||typeof x!=="object")return null;const id=x[RAW]?x[RAW].id:x.id;const v=id!=null?vOf(id):null;return v&&v!==S?{id}:null};
function encA(K,A){const o=[];for(let i=0;i<K.length;i++){const k=K[i],x=A[i];let e=null;
  if(k==="me"){if(!isMe(x))return null;e=1}
  else if(k==="ix")e=ixE(x);
  else if(k==="who")e=x==null?{n:1}:typeof x==="string"?{s:x}:pE(x);
  else if(k==="wl"){if(!Array.isArray(x))return null;const L=x.map(pE);if(L.some(y=>!y))return null;e={l:L.map(y=>y.id)}}
  else e={v:x===undefined?null:J(x&&typeof x==="object"&&!Array.isArray(x)?Object.assign({},x):x)};
  if(e==null)return null;o.push(e)}return o}
function decA(K,a){if(!Array.isArray(a)||a.length!==K.length)return null;const o=[];for(let i=0;i<K.length;i++){const k=K[i],x=a[i];if(!x)return null;
  if(k==="me")o.push(S);
  else if(k==="ix"){const j=ixD(x);if(j==null)return null;o.push(j)}
  else if(k==="who"){if(x.n)o.push(undefined);else if(typeof x.s==="string")o.push(x.s);else{const v=vOf(x.id);if(!v||v===S)return null;o.push(v)}}
  else if(k==="wl"){const L=(x.l||[]).map(vOf);if(L.some(v=>!v||v===S))return null;o.push(L)}
  else o.push(x.v)}return o}
const live=()=>!!S&&!S.dead;
/* after the answer: the panel she tapped in shows the new state (the kit shop / the dress panel / the item card list) */
const reDraw=()=>{try{const b=document.getElementById("kg82");if(b&&!b.hidden&&typeof toilDressUI==="function")toilDressUI()}catch(e){}};
/* a card choice (chooseM, wrapR "chooseM" in solo: the card titled with the option, shown when something changed): the choice's title rides
   with the intent, and the half card her phone would show at once (only the card's own cost applied, the act still on the host) is not
   shown — the whole card comes with the answer (cardLater) */
let CHT=null,CHP=null;
if(typeof chooseM==="function"){const cm=chooseM;chooseM=function(i){if(host()||!on(L8)||CW.ctx)return cm.apply(this,arguments);let t="";try{t=Q[0].opts[i].n||""}catch(e){}
  CHT=String(t).replace(/<[^>]+>/g,"");CHP=F.pend;try{return cm.apply(this,arguments)}finally{CHT=null;CHP=null}}}
if(typeof resultShow==="function"){const rs=resultShow;resultShow=function(){if(CHT!==null&&F.pend&&F.pend!==CHP&&F.R[F.pend.n]&&F.R[F.pend.n].lv===L8){F.stat.half=(F.stat.half|0)+1;return}return rs.apply(this,arguments)}}
function reg8(name,K,o){o=o||{};const R=Object.assign({lv:L8,ctx:CX8,back:BACK8,enc:A=>encA(K,[...A].slice(0,K.length)),dec:a=>decA(K,a),done:reDraw,title:()=>CHT||""},o);
 R.mine=A=>live()&&(o.mine?o.mine(A):isMe(A[0]));return F.reg(name,R)}
/* the bag (Rương đồ) */
reg8("useItem",["me","ix","who"],{log:true});
reg8("sellItem",["me","ix"],{log:true});
reg8("taintItem",["me","ix","v"],{log:true});
reg8("itemTest",["me","ix"],{log:true});
reg8("econSellUI",["ix"],{mine:()=>true,snap:"soft",noRes:true,title:()=>"Bán đồ"});
reg8("invAct",["v"],{mine:A=>A[0]==="inspect",snap:"soft",noRes:true,title:()=>"Soát rương đồ"});
reg8("wkSell",["me","ix"],{log:true,title:()=>"Bán ra ngoài cung"});
reg8("wkShow",["ix"],{mine:()=>true,title:()=>"Bày ở yến tiệc"});
/* wearing: jewels / hairpins (wear), the Y phục / Cài tóc slots (wd*), the veil (vl*) */
reg8("wear",["me","ix"]);
reg8("wdWear",["me","ix"],{log:false});
reg8("wdTakeOff",["me","v"]);
/* the UI functions (can + spend + engine + log in one): t = the title of their own wrapR card (none: no card in solo either) */
for(const [n,K,t] of [["wdWearUI",["ix"],"Thay y phục"],["wdOffUI",["v"],null],["wdAutoUI",[],"Tự chọn đồ"],["wdSellUI",["ix"],"Bán lén"],["wdPawnUI",["ix"],"Cầm cố"],["wdRedeemUI",["v"],"Chuộc lại"],["vlWearUI",["ix"],"Đeo mạng che mặt"],["vlOffUI",[],null]])
 reg8(n,K,t==null?{mine:()=>true}:{mine:()=>true,snap:"soft",noRes:true,title:()=>t});
/* the shop: one engine for a tile (jinv kitShopBuy); on the host her shop data is rebuilt in her context (kitShop data mode, every
   wrapper: the rare item, the buy-back tiles), never opening a modal, never touching the host's own open shop. The pet shop = F4. */
const KSH={nvp:()=>kitShopNvp()};
window.__kshBuild=key=>{if(!CW.ctx||!host()||!KSH[key])return undefined;window.__kshData=1;try{return KSH[key]()}finally{window.__kshData=0}};
reg8("kitShopBuy",["v","v","v","v"],{mine:A=>!!KSH[A[0]]&&(A[0]!=="pet"||on(9))/* the pet shop = F4 (level 9) */,done:(A,r)=>{try{const o=KSHOP.reg[A[0]];if(o&&r&&r.rv){const x=kitShopRaw(o).find(y=>y&&y.k===A[1]);if(x&&x.stock!=null&&!x.sell)x.stock-=Math.max(1,A[2]|0);o.q=o.q||{};o.q[A[1]]=1}
  kitShopRefresh(A[0])}catch(e){console.error("thin F3 shop",e)}}});
reg8("vlBuyNvp",["me","v"],{log:true});
reg8("vlBuyOut",["me","v"],{log:true});
reg8("vlAsk",["me","v"],{log:true});
/* gifts */
/* gifts BETWEEN the two players: ONE path, the ASK act "gift" (jcoopworld runAct: her invite card first, then the Quà tặng card; F1-tested).
   Every gift picker (item card Tặng, person card Tặng quà, Dâng / works) called giveTo straight onto the other player's entry: her gift
   reached the host only through the withSeat bridge, his gift stayed in her ENTRY's bag on the host and never reached her (law 6c). At
   level 8 a giveTo by a player onto the other player's entry is that act (the accepted invite runs giveTo again with CW.inv set: through). */
if(typeof giveTo==="function"){const g0=giveTo;giveTo=function(a,r,ix){try{if(on(L8)&&a===S&&r&&typeof r==="object"&&CW.isF&&CW.isF(r)&&!CW.inv&&typeof runAct==="function"){F.stat.gAsk=(F.stat.gAsk|0)+1;return runAct(S,r,"gift",ix)}}catch(e){console.error("thin F3 gift",e)}return g0.apply(this,arguments)}}
if(typeof wkGive==="function"){const w0=wkGive;wkGive=function(a,r,ix){try{if(on(L8)&&a===S&&r&&typeof r==="object"&&CW.isF&&CW.isF(r)&&!CW.inv&&typeof runAct==="function"){F.stat.gAsk=(F.stat.gAsk|0)+1;return runAct(S,r,"gift",ix)}}catch(e){console.error("thin F3 gift",e)}return w0.apply(this,arguments)}}
reg8("giveTo",["me","who","ix"],{log:true});
reg8("wkGive",["me","who","ix"],{log:true});
reg8("wkPoison",["me","who","ix"],{log:true});
reg8("plantHereGo",["who","ix"],{mine:()=>true});
reg8("tsGiftBacGo",["wl"],{mine:()=>true});
reg8("tsGiftPieceGo",["who","ix"],{mine:()=>true});
reg8("courtGive",["me","v"],{log:true,title:A=>A[1]?"Biếu":""});
reg8("tdGiftGo",["v"],{mine:()=>true,title:A=>{try{const h=trS().H[A[0]];return h?`Biếu quà ${h.name}`:""}catch(e){return ""}},okHint:()=>!!window.__tdOk});
/* ---------- F4: her pets / garden / kitchen / study (level 9; report dev/handover/reports/coop-thin-f4.md step 0) ----------
   reg9 = reg8 at level 9, two more argument kinds: "el" (a tapped button: its dataset travels, the host gets {dataset}) and "pm" (a person
   or HER: rcpAskGo asks about herself too). Her open care screen (PETC.i) / plant screen (SHPC.g) and the Tứ đức lesson state (TDV) ride
   in ctx. Mini-game SCORES (petcGain, shelfPlantGain, the art / cooking / Tứ đức games) = F5. */
const L9=9;
const OBJ=(n,o)=>[n,()=>{try{return J(o())}catch(e){return null}},v=>{try{const t=o();if(t&&v&&typeof v==="object")Object.assign(t,v)}catch(e){}}];
/* review r1: her open care / plant screen keys ride as plain values set on the REAL objects (the old OBJ("shpc",()=>({g:SHPC.g})) assigned
   onto a fresh copy: the host never saw her SHPC.g → her shelf plant "Để trời định" did nothing, or hit the plant in the HOST's open slot;
   OBJ("petc",PETC) carried PETC.bath (listener functions, stripped by JSON) back onto the host's own running bath game) */
const CX9=CX8.concat([["petc",()=>({i:PETC.i,game:PETC.game}),v=>{v=v&&typeof v==="object"?v:{};PETC.i=typeof v.i==="number"?v.i:-1;PETC.game=v.game==null?null:v.game}],
 ["shpc",()=>SHPC.g==null?null:SHPC.g,v=>{SHPC.g=v==null?null:v}],OBJ("tdv",()=>TDV)]);
function encA9(K,A){const K2=K.map(k=>k==="el"||k==="pm"?"v":k),A2=[...A].slice(0,K.length);for(let i=0;i<K.length;i++){
  if(K[i]==="el"){const b=A2[i];if(!b||!b.dataset)return null;A2[i]={dataset:Object.assign({},b.dataset)}}
  else if(K[i]==="pm"){const x=A2[i];if(isMe(x))A2[i]={me:1};else if(typeof x==="string")A2[i]={s:x};else{const e=pE(x);if(!e)return null;A2[i]={id:e.id}}}}return encA(K2,A2)}
function decA9(K,a){const K2=K.map(k=>k==="el"||k==="pm"?"v":k);const o=decA(K2,a);if(!o)return null;for(let i=0;i<K.length;i++)if(K[i]==="pm"){const x=o[i];if(!x)return null;if(x.me)o[i]=S;else if(typeof x.s==="string")o[i]=x.s;else{const v=vOf(x.id);if(!v||v===S)return null;o[i]=v}}return o}
function reg9(name,K,o){o=o||{};const R=Object.assign({lv:L9,ctx:CX9,back:BACK8,enc:A=>encA9(K,A),dec:a=>decA9(K,a),done:reDraw,title:()=>CHT||""},o);
 R.mine=A=>live()&&(o.mine?o.mine(A):isMe(A[0]));return F.reg(name,R)}
/* her care / plant screens draw into the HOST's DOM (petcClose → closeModal = the host's own card queue) when run in her context there:
   captured instead, replayed on her phone with the answer (her pet / plant read from her patched person) */
const UI9=n=>{if(typeof window[n]!=="function")return;const f=window[n];window[n]=function(){if(CW.ctx&&host()&&on(L9)){if(TH.uiCap)TH.uiCap.push([n,String(arguments[0]==null?"1":arguments[0]).slice(0,300)||"1"]);return}return f.apply(this,arguments)}};
["petcDraw","petcClose","shelfPlantDraw"].forEach(UI9);
try{for(const n of ["petcDraw","petcClose","shelfPlantDraw","petcGrowShow"])TH.UICAP.add(n)}catch(e){}
if(typeof petcGrowCard==="function"){const f=petcGrowCard;petcGrowCard=function(P){if(CW.ctx&&host()&&on(L9)){const i=tsbPets(S).indexOf(P);if(i>=0&&TH.uiCap)TH.uiCap.push(["petcGrowShow",String(i)]);return}return f.apply(this,arguments)};
 window.petcGrowShow=i=>{try{const P=tsbPets(S)[+i];if(P)f(P)}catch(e){}}}
/* pets */
KSH.pet=()=>petShop();
reg9("petDo",["v","el"],{mine:A=>A[0]==="follow"||A[0]==="free",snap:"soft",noRes:true,title:A=>({follow:"Cho theo hầu",free:"Gửi về Ngự thú viên"})[A[0]]||""});
reg9("petcMaid",["v"],{mine:()=>true});
reg9("petcQuick",["v"],{mine:()=>true});
/* garden: her shelf plant */
reg9("shelfPlantQuick",[],{mine:()=>true});
/* kitchen / study: recipe books, the taste questions, Tứ đức practice at bậc 5 (no game) */
reg9("rcpRead",["ix"],{mine:()=>true});
reg9("rcpAskGo",["v","pm"],{mine:()=>true});
reg9("tdsRun",["v","v","v"],{mine:A=>A[1]==="prac"});
/* ---------- F5: her mini-game SCORE ends (level 10; report dev/handover/reports/coop-thin-f5.md step 0) ----------
   The game itself plays on HER phone (same game, same parameters as solo: law 5); only its end (the score + what she chose before) is ONE
   intent. Ends = named engines: petcGain / shelfPlantGain (care games), wkLessonEnd (Tài nghệ lessons, Tự học làm tác phẩm, Học lối mới),
   tdFinish (Tứ đức), tsSummonEnd / tsDenEnd (tsGame: the summons, the lantern). The host checks the score (BAL.mgSc ranges, its tables;
   outside → refused, nothing applied), rolls every "Để trời định" / "Học nhanh" / "Bỏ qua" itself (her phone never rolls), pays the
   game's deferred cost (jaudit aaPayMG) ONCE before the gain (solo order), then runs the engine in her context. Her result card: the
   engine's own (cardLater) or jaudit's one card after the game (aaShowLast, captured) — on her phone only. */
const L10=10;
const inR=(x,r)=>typeof x==="number"&&isFinite(x)&&!!r&&x>=r[0]&&x<=r[1];
const MSC=()=>BAL.mgSc;
/* guest: an F5 game is open (MGC): the kg82 opening it made (KGN) — a later game, closed or not, never takes its place */
let KGN=0,MGC=null,AA=null,HAA=null,SKH=0;
/* Tứ đức (tdPlay: called by name from j85 / jtds pickers that keep their own copy) is known by its own busy flag at its opening */
if(typeof kg82Open==="function"){const k0=kg82Open;kg82Open=function(){KGN++;try{if(!host()&&!(MGC&&MGC.n===-1)&&typeof TDS==="object"&&TDS.busy&&gOn(L10))MGC={k:"td",o:null,n:KGN}}catch(e){}return k0.apply(this,arguments)}}
const mgOk=()=>!!MGC&&MGC.n===KGN&&!host()&&gOn(L10);
const mgOpen=(k,o,fn)=>{const M={k,o,n:-1};MGC=M;const r=fn();if(MGC===M)M.n=KGN;return r};
if(typeof playArt==="function"){const p0=playArt;playArt=function(o){if(host()||!gOn(L10)||!o||!o.mgEnd){if(!host())MGC=null;return p0.apply(this,arguments)}return mgOpen("pa",o,()=>p0.apply(this,arguments))};window.playArt=playArt}
if(typeof tsGame==="function"){const t0=tsGame;tsGame=function(o){if(host()||!gOn(L10)||!o){if(!host())MGC=null;return t0.apply(this,arguments)}return mgOpen("ts",o,()=>t0.apply(this,arguments))};window.tsGame=tsGame}
/* guest: the deferred cost is never paid here: jaudit's call is held with its score (the first one of this end), the cost rides in ctx */
if(typeof window.aaPayMG==="function"){const a0=window.aaPayMG;window.aaPayMG=function(sc){if(mgOk()){if(!AA){const m=S&&S.mg;AA={c:J((m&&m.cost)||window.__aaPend||null),sc:J(sc||{}),t:window.__aaTitle||null}}F.stat.aaHeld=(F.stat.aaHeld|0)+1;return}return a0.apply(this,arguments)};
 F.aaLocal=a0}
/* guest: the quick button of an F5 game: the game's own quick path runs (its words, its onDone chain: the end intent) with the roll left
   to the host (null), and its result rows are closed at once — the result comes from the host's answer */
if(typeof kitQuickRoll==="function"){const q0=kitQuickRoll;kitQuickRoll=function(){if(SKH&&!host())return null;return q0.apply(this,arguments)};window.kitQuickRoll=kitQuickRoll}
if(typeof tsSkipRes==="function"){const r0=tsSkipRes;tsSkipRes=function(odds,risk){if(SKH&&!host())return {raw:0,skipped:true,ok:null,guard:null,risk:risk?1:0};return r0.apply(this,arguments)};window.tsSkipRes=tsSkipRes}
for(const n of ["sfx","kitSfx","kitResultSfx"])if(typeof window[n]==="function"){const f=window[n];window[n]=function(){if(SKH&&!host())return;return f.apply(this,arguments)}}
document.addEventListener("click",e=>{const b=e.target&&e.target.closest&&e.target.closest("#kg82skip");if(!b||!mgOk()||typeof b.onclick!=="function")return;
 e.stopImmediatePropagation();e.preventDefault();F.stat.skip=(F.stat.skip|0)+1;SKH=1;try{b.onclick.call(b,e)}finally{SKH=0}
 const ok=document.getElementById("kg82ok");if(ok&&typeof ok.onclick==="function")ok.onclick.call(ok)},true);
/* host: her held score + cost (ctx "aa"); the host's own pending cost / title are kept and put back after her run */
const CXAA=["aa",()=>host()?{h:1,c:window.__aaPend||null,t:window.__aaTitle||null}:AA,v=>{if(!host())return;window.__aaPend=v&&v.c||null;window.__aaTitle=v&&v.t||null;HAA=v&&!v.h&&v.sc?v:null}];
const CX10=CX9.concat([CXAA,OBJ("tds",()=>({q:TDS.q}))]);
function payAA(fix){if(!HAA)return;const sc=Object.assign({},HAA.sc);if(fix)fix(sc);const t0=window.aaCardTo;
 window.aaCardTo=(t,b,ok)=>{F.stat.aaCard=(F.stat.aaCard|0)+1;if(TH.uiCap&&TH.uiCap.length<12)TH.uiCap.push(["aaShowLast",[t,J(b||null),ok]])};
 try{window.aaPayMG(sc);F.stat.aaPaid=(F.stat.aaPaid|0)+1}finally{window.aaCardTo=t0;HAA=null}}
try{TH.UICAP.add("aaShowLast")}catch(e){}
function reg10(name,K,o){o=o||{};const R=Object.assign({lv:L10,ctx:CX10,back:BACK8,enc:A=>encA9(K,A),dec:a=>decA9(K,a),done:reDraw,title:()=>""},o);
 R.mine=A=>live()&&(o.mine?o.mine(A):true);const r=F.reg(name,R);if(!r)return r;
 /* guest, after the end is sent: the held cost now travels with it (cleared here); an end that ran here after all (refused before sending)
    pays its held cost here, never lost */
 const w=window[name];window[name]=function(){const p0=F.pend,a=AA;const r=w.apply(this,arguments);if(!host()){const sent=!!F.pend&&F.pend!==p0;
  if(a){if(sent){window.__aaPend=null;F.stat.aaSent=(F.stat.aaSent|0)+1}else try{F.aaLocal(a.sc)}catch(e){}AA=null}if(sent||a)MGC=null}return r};return true}
/* a refused end applies nothing; a lesson's game is over all the same (her S.mg closed, as a game closed unplayed: no cost, no gain) */
const bad=n=>{F.stat.mgBad=(F.stat.mgBad|0)+1;lg(["mgBad",n]);try{if(n==="wkLessonEnd"&&CW.ctx&&S)S.mg=null}catch(e){}return null};
/* care games (her open care / plant screen rides in ctx: PETC.i / SHPC.g) */
reg10("petcGain",["v","v"],{dec:a=>{const x=decA9(["v","v"],a);if(!x)return null;return ["feed","bath","play"].includes(x[0])&&inR(x[1],MSC().unit)?x:bad("petcGain")}});
reg10("shelfPlantGain",["v"],{dec:a=>{const x=decA9(["v"],a);if(!x)return null;return inR(x[0],MSC().unit)?x:bad("shelfPlantGain")}});
/* Tài nghệ lessons / practice / Học lối mới: k, the lesson (S.mg as it was), the play, {skipped}; the host rolls a quick lesson (o.ok null) */
reg10("wkLessonEnd",["v","v","v","v"],{enc:A=>{const m=A[1];if(!m||typeof m!=="object")return null;const c=Object.assign({},m);delete c.cost;return encA9(["v","v","v","v"],[A[0],c,A[2]==null?0:A[2],{skipped:!!(A[3]&&A[3].skipped)}])},
 dec:a=>{const x=decA9(["v","v","v","v"],a);if(!x)return null;const [k,m,raw,o]=x;const sk=!!(o&&o.skipped);
  if(!ARTS.some(y=>y.k===k)||!m||m.k!==k||!["self","teacher","th","prac"].includes(m.mode)||(m.wk&&(!WK[m.wk.kind]||![0,1,2].includes(m.wk.mat||0)||!wkSubjOK(m.wk.kind,m.wk.subj)))||(m.hw!=null&&!(m.hw in WK_HOW)))return bad("wkLessonEnd");
  /* r1: no word of hers travels (her work's subject = one of wkSubj's, her practice's words = WK_HOW by key) */
  if(!sk&&!inR(raw,MSC().raw))return bad("wkLessonEnd");return [k,m,sk?0:raw,{skipped:sk}]},
 pre:A=>payAA(sc=>{const sk=!!A[3].skipped;sc.skip=sk;sc.raw=sk?null:cl(Math.round(A[2]||0),0,10);sc.ok=!sk&&sc.raw>=5})});
/* Tứ đức: tdFinish pays its own cost; a quick play is rolled here (TDS.q, as the game's own quick button) */
reg10("tdFinish",["v","v","v","v"],{snap:"soft",noRes:true,title:A=>{try{const V=VIR.find(x=>x.k===A[0]);return `${A[1]==="self"?"Tự học":"Học"} ${V?V.n:""}`}catch(e){return ""}},
 dec:a=>{const x=decA9(["v","v","v","v"],a);if(!x)return null;const [k,mode,raw,sk]=x;if(!VIR.some(y=>y.k===k)||!(mode in TD_MODE))return bad("tdFinish");
  if(!sk&&!inR(raw,MSC().raw))return bad("tdFinish");return [k,mode,sk?0:raw,!!sk]},
 pre:A=>{if(A[3]){const ok=!!kitQuickRoll();A[2]=ok?BAL.skip.raw:0;TDS.q=ok}else TDS.q=null}});
/* tsGame ends: res {raw, skipped, guard}; the snapshot of her card (b) stays on her phone (her result card = cardLater); a skipped play
   is rolled here by the ONE rule (tsSkipRes) with her odds of now; hộ giá only when the road has it (tsRebel) */
const tsRes0=(res,risk)=>{if(!res||typeof res!=="object")return null;if(res.skipped)return {skipped:true,risk:risk&&res.risk?1:0};
 if(!inR(res.raw,MSC().raw))return null;const g=res.guard==null?null:res.guard;if(g!=null&&(!risk||(g!==0&&g!==1)))return null;return {raw:res.raw,skipped:false,guard:g}};
const tsEnc=A=>encA9(["v","v"],[A[0],A[1]&&typeof A[1]==="object"?{raw:A[1].raw,skipped:!!A[1].skipped,guard:A[1].guard==null?null:A[1].guard,risk:A[1].risk?1:0}:null]);
reg10("tsSummonEnd",["v","v"],{snap:"soft",noRes:true,enc:tsEnc,title:A=>`Hoàng thượng triệu ${({dan:"đánh đàn",co:"đánh cờ",duho:"du hồ"})[A[0]]||""}`,okHint:dr=>!!(dr&&dr.r&&dr.r.ok),
 dec:a=>{const x=decA9(["v","v"],a);if(!x)return null;const k=x[0];if(!["dan","co","duho"].includes(k))return bad("tsSummonEnd");let rb=0;try{rb=k==="duho"?tsRebel():0}catch(e){}
  const r=tsRes0(x[1],!!rb);return r?[k,r,null]:bad("tsSummonEnd")},
 pre:A=>{if(A[1].skipped)A[1]=tsSkipRes(oddsCl(Math.round(tsSummonOdds(S,A[0])||50)),A[1].risk)},host:(A,out)=>{out.ok=A[1].raw>=5||A[1].guard===1}});
reg10("tsDenEnd",["v","v"],{snap:"soft",noRes:true,enc:tsEnc,title:()=>"Thả đèn hoa đăng",okHint:()=>true,
 dec:a=>{const x=decA9(["v","v"],a);if(!x)return null;if(![0,1,2].includes(x[0]))return bad("tsDenEnd");const r=tsRes0(x[1],false);return r?[x[0],r,null]:bad("tsDenEnd")},
 pre:A=>{if(A[1].skipped)A[1]=tsSkipRes(oddsCl(Math.round(tsDenOdds(S)||50)),0)}});
/* ---------- F6a: her deck cards, quest steps and her other acts (level 11; report dev/handover/reports/coop-thin-f6.md step 0) ----------
   ONE HAND. Her Hành sự hand is dealt by the real step in her context on the host (E: nextBuoi → deal); before F6a her phone dealt a
   second hand of its own (another shuffle). At level 11 the host's hand is the one: as her context closes (TH.ctxOut) the host brings it
   up to date the way her own render would (a hand for a new buổi / week, the standing cards j76Std, the mood cards eaSync, feelDeck) and
   keeps it as PLAIN cards (no closures; `why` read in her context); the view carries it (o.hd); her phone shows exactly that hand.
   A tap = ONE intent act(i) {i, n}: the host runs act(i) in her context on its own hand (runOpt, every act wrapper, the card's closures).
   Cards whose GAME or screen opens first (the exam, Điểm trang, the steal cards, the aaMG work cards: __g) are F6b: they stay on the old
   road (her phone keeps its own card object for them, by name) until F6b moves their game ends.
   Also: quest steps q72Do / q72Drop / q72Ask / q72Call, empAct (Hoàng hậu powers), servAct (servant buttons), elderAct (the elders),
   the person-card game jobs sgOver / sgServ; and the render-time derived writers that wrote her person on her phone (read-only there). */
const L11=11;
/* RENDER-DIFF ENGINES (the whole family, LUẬT SỬA CẢ NHÓM): game rules that run on every render and write her person — her rank's gift set +
   servants (jpromo prCheck), the lux / allotment item boxes (jration lxInitAll, jallot alInitAll: items made, law 6c), her rank marks (jmark
   kmmCheck), the life milestones (j52 pdCheck), the end of a life's span (jkiep kpCheck), the exam window (jexam exTick). In her context on
   the host render is a no-op, so they run as her context closes; on her phone at level 11 they do not run (kpCheck only reads). */
/* coop-thin G #5 (f3 B1 L13: her Sổ ghi had "+5 Phúc duyên" and "Kiếp này đã trọn" in the other order): run in SOLO's order = the render
   wrappers' order (the last-wrapped runs first; prCheck runs after the inner render): jallot, jration, jexam, jmark, jkiep, j52, then jpromo */
/* coop-thin-g-f1 #5 (same family, scan dev/test/coop-rdiff-scan.py): jty tyHome (a visitor at home while she is in trung y: Danh −BAL.ty.meet,
   once per buổi by S.tyPaid) ran in renderStage on her phone only → her Danh lower on her phone than in the host's store until her next ready.
   It paints inside the inner render, so before jpromo */
const RDIFF=["alInitAll","lxInitAll","exTick","kmmCheck","kpCheck","pdCheck","tyHome","prCheck"];
/* a card that opens a picker keeps itself in window.__adPend until the pick (jact): per player, swapped with her context */
try{TH.reg("__adPend",()=>window.__adPend||null,v=>{window.__adPend=v||null})}catch(e){}
const isSteal=a=>{try{return typeof isStealCard==="function"&&isStealCard(a)}catch(e){return false}};
/* F6b HOOK (one deck runner): the game-first kinds, ONE table. A kind stays on the old road until F6b lifts it: TH.gLift[kind] = the level
   its game end became an intent at (e.g. TH.gLift.exam = 12); from that level the card is a plain host card and its tap rides act(i). */
TH.gKinds=TH.gKinds||{exam:a=>!!a.exam,toil:a=>!!a.toil,aaMG:a=>!!a.aaMG,steal:isSteal};TH.gLift=TH.gLift||{};
TH.gKind=a=>{if(!a)return null;for(const k of Object.keys(TH.gKinds))try{if(TH.gKinds[k](a))return k}catch(e){}return null};
const uiFirst=a=>{const k=TH.gKind(a);return !!k&&!(TH.gLift[k]&&on(TH.gLift[k]))};
const plainCard=a=>{if(!a||typeof a!=="object")return null;const o={};for(const k of Object.keys(a)){const v=a[k];
  if(typeof v==="function"){if(k==="why")try{o.whyT=String(v()||"")}catch(e){}continue}
  if(v===undefined)continue;try{o[k]=J(v)}catch(e){}}if(uiFirst(a))o.__g=1;return o};
const HKEY=()=>`${S.turn||0}:${S.buoi||0}:${S.dead?1:0}:${S.out?1:0}`;
const hkOf=s=>s?`${s.turn||0}:${s.buoi||0}:${s.dead?1:0}:${s.out?1:0}`:"";
/* host: a hand dealt in her context records its key (E's step deals it: the close below never deals it twice) */
let LOC=null,HDK="";
if(typeof deal==="function"){const d0=deal;deal=function(){
 if(on(L11)&&!host()&&CW.seat&&!CW.ctx&&S){const r=d0.apply(this,arguments);LOC=Array.isArray(deck)?deck.slice():[];gHand();return r}
 const r=d0.apply(this,arguments);try{if(on(L11)&&host()&&CW.ctx){const B=TH.seatOf(CW.ctx);if(B&&S)B.hk=HKEY()}}catch(e){}return r}}
TH.ctxOut.push((seat,B)=>{if(!on(L11)||!host()||seat===CW.seat||!S||TH.held(seat))return;
 try{if(!S.dead&&!S.mg&&typeof deal==="function"&&(B.hk!==HKEY()||!Array.isArray(deck)||!deck.length)){deal();F.stat.hDeal=(F.stat.hDeal|0)+1}}catch(e){console.error("thin F6 deal",e)}
 for(const f of ["j76Std","eaSync","feelDeck"])try{if(typeof window[f]==="function")window[f]()}catch(e){}
 /* her feeling machine's derived cache (S.mood.log `left` = khắc left at the last sync; solo: every render) is brought up to date as her render would */
 try{if(typeof mkSync==="function")mkSync(S)}catch(e){console.error("thin F6 mkSync",e)}
 /* the render-diff engines of her person (render is a no-op in her context; ONE list RDIFF, below): run here, once, as her render would */
 {const q0=quiet,t0=performance.now();quiet=false/* as her own render: its card shows (her Q → her phone) */;const SI=(rivals||[]).filter(e=>e&&e.__b).map(e=>[e,(e.inv||[]).slice(),X.STAT.map(k=>e[k])]);
  try{for(const f of RDIFF)try{if(typeof window[f]==="function")window[f]()}catch(e){console.error("thin F6 "+f,e)}}finally{quiet=q0;
   /* F6a #3: the "…All" engines (alInitAll / lxInitAll) also give the HOST's stand-in entry its boxes; the stand-in is the host's own person
      (his render gives him his own), and the bridge turned each such piece into "her gift" → a stack of «Quà tặng» cards on the host that
      held the week (coop-cyc L11). The stand-in leaves this step exactly as it came in (law 6c: no piece made out of nothing) */
   for(const [e,inv,st] of SI){if(Array.isArray(e.inv)){const n=e.inv.filter(x=>!inv.includes(x));if(n.length){F.stat.siFix=(F.stat.siFix|0)+n.length;e.inv=inv}}X.STAT.forEach((k,i)=>{if(e[k]!==st[i])e[k]=st[i]})}const ms=performance.now()-t0;F.stat.rdN=(F.stat.rdN|0)+1;F.stat.rdMs=Math.round(((F.stat.rdMs||0)*9+ms)/10*10)/10}}
 B.hd=S.dead?[]:(Array.isArray(deck)?deck:[]).map(plainCard).filter(Boolean)});
/* host: the view carries her hand; a hand left from an older buổi / week (her context not entered since) is brought up to date at once */
let HREF="";
{const hv=TH.hostView;TH.hostView=function(){const o=hv.apply(this,arguments);try{if(o&&on(L11)&&host()){const sb=CW.seat==="a"?"b":"a";const B=TH.seatOf(sb);
  if(B){o.hd=B.hd||null;const k=hkOf(B.S);if(B.S&&!B.S.dead&&B.hk!==k&&HREF!==k&&!TH.held(sb)){HREF=k;setTimeout(()=>{try{if(!CW.ctx&&TH.seatOf(sb))TH.withSeat(sb,()=>{});F.stat.hRef=(F.stat.hRef|0)+1;TH.flush()}catch(e){console.error("thin F6 hand",e)}},0)}}}}catch(e){console.error("thin F6 view",e)}return o}}
/* guest: her hand = the host's plain cards; an __g card is her own card object of that name (old road until F6b) */
const fromPlain=o=>{const a=Object.assign({},o);const t=typeof o.whyT==="string"?o.whyT:null;delete a.whyT;if(t!==null)a.why=()=>t;Object.defineProperty(a,"__hd",{value:1});return a};
/* an __g card the host dealt that her own hand lacks (her phone dealt at another moment): her own card object, built by its own builder */
const gBuild=o=>{try{if(o.toil&&typeof toilCard==="function")return toilCard();if(o.exam===1&&typeof exCard==="function")return exCard();if(o.aaMG&&typeof wkDeckCard==="function")return wkDeckCard()}catch(e){console.error("thin F6 card",e)}return null};
function gHand(){if(host()||!on(L11))return false;const V=TH.view,hd=V&&V.o&&V.o.hd;if(!Array.isArray(hd))return false;if(!Array.isArray(LOC))LOC=[];const L=LOC,tk=new Set();
 deck=hd.map(o=>{if(!o)return null;if(o.__g){let j=L.findIndex((a,x)=>!tk.has(x)&&a&&a.n===o.n);if(j<0&&o.aaMG)j=L.findIndex((a,x)=>!tk.has(x)&&a&&a.aaMG);if(j<0){const b=gBuild(o);if(b){LOC.push(b);j=LOC.length-1;tk.add(j);try{Object.defineProperty(b,"__g",{value:1,configurable:true})}catch(e){}return b}return null}tk.add(j);try{Object.defineProperty(L[j],"__g",{value:1,configurable:true})}catch(e){}return L[j]}return fromPlain(o)}).filter(Boolean);
 F.stat.gHand=(F.stat.gHand|0)+1;return true}
const hdMode=()=>on(L11)&&!host()&&!!CW.seat&&!CW.ctx&&!!TH.view&&!!TH.view.o&&Array.isArray(TH.view.o.hd);
if(typeof render==="function"){const r0=render;render=function(){try{if(hdMode()){const k=JSON.stringify(TH.view.o.hd);if(k!==HDK){HDK=k;gHand()}}}catch(e){console.error("thin F6 hand",e)}return r0.apply(this,arguments)}}
/* guest: the render-time writers of her hand / her exam window run on the host for her (her context); here they would build a second hand */
if(typeof eaSync==="function"){const e0=eaSync;eaSync=function(){if(hdMode())return;return e0.apply(this,arguments)};window.eaSync=eaSync}
if(typeof exTick==="function"){const x0=exTick;exTick=function(){if(hdMode()){/* F6b: the exam game itself is still on her phone: a game left open by a reload is finished here, as before */try{const e=S&&S.ex;if(e&&e.pend&&!document.getElementById("kg82"))exAbort()}catch(x){}return}return x0.apply(this,arguments)}}
/* the act */
const cardOk=a=>{try{if(!a||a.done||S.dead||Q.length||(a.b!=null&&(S.buoi||0)!==a.b)||!canPay(a))return false;const r0=window.__restAct,c0=window.__cardSuc;
  try{window.__restAct=typeof isRestCard==="function"&&isRestCard(a)?1:0;window.__cardSuc=typeof cardSuc==="function"?cardSuc(a):0;return can(cardCost(a))}finally{window.__restAct=r0;window.__cardSuc=c0}}catch(e){return false}};
function reg11(name,K,o){o=o||{};const R=Object.assign({lv:L11,ctx:CX10,back:BACK8,enc:A=>encA9(K,A),dec:a=>decA9(K,a),done:reDraw,title:()=>""},o);
 R.mine=A=>live()&&(o.mine?o.mine(A):true);return F.reg(name,R)}
reg11("act",["v"],{snap:"soft",noRes:true,title:A=>{const a=deck[A[0]];return a?a.n:""},okHint:dr=>dr&&dr.r&&dr.r.ok!=null?!!dr.r.ok:null,
 mine:A=>{const a=Array.isArray(deck)?deck[A[0]]:null;return !!a&&!!a.__hd&&!a.__g&&cardOk(a)},
 enc:A=>{const a=deck[A[0]];return a?{i:A[0]|0,n:String(a.n||"")}:null},
 dec:a=>{if(!a||typeof a.n!=="string"||!Array.isArray(deck))return null;let i=typeof a.i==="number"&&deck[a.i]&&deck[a.i].n===a.n&&!deck[a.i].done?a.i:deck.findIndex(x=>x&&x.n===a.n&&!x.done);
  if(i<0||uiFirst(deck[i])){F.stat.cardBad=(F.stat.cardBad|0)+1;return null}return [i]},
 host:(A,out)=>{out.ok=window.__lastOk==null?null:!!window.__lastOk}});
/* quest steps (j72): plain arguments; their own result card (rsnap → resultShow) shows on her phone with the answer */
const Q72={snap:"soft",noRes:true};
reg11("q72Do",["v","v"],Q72);
reg11("q72Drop",["v"],Q72);
reg11("q72Ask",[],Q72);
reg11("q72Call",["v"],Q72);
/* her other acts: the Hoàng hậu powers (a person index → id), servant buttons, the elders, the person-card game jobs (the game's step: a
   value sgStep can give, read from the function itself) */
reg11("empAct",["v","v"],{enc:A=>{const v=(rivals||[])[A[0]];if(!v||v===S||v.id==null||typeof A[1]!=="string")return null;return {id:v.id,k:A[1]}},
 dec:a=>{if(!a||typeof a.k!=="string")return null;const i=(rivals||[]).findIndex(v=>v&&v.id===a.id&&v!==S);return i<0?null:[i,a.k]}});
reg11("servAct",["v","v"],{snap:"soft",noRes:true});
reg11("elderAct",["v","v"],{snap:"soft",noRes:true});
const stepOk=m=>{if(m==null)return true;if(typeof m!=="object"||typeof sgStep!=="function")return false;const ok=new Set();for(let r=0;r<=10;r++)ok.add(sgStep(r));return ok.has(m.step)};
reg11("sgOver",["v"],{snap:"soft",noRes:true,dec:a=>{const x=decA9(["v"],a);return x&&stepOk(x[0])?x:null}});
reg11("sgServ",["v","v"],{snap:"soft",noRes:true,dec:a=>{const x=decA9(["v","v"],a);return x&&stepOk(x[1])?x:null}});
/* guest: render-time writers of HER person (derived caches the host keeps for her in her context; its patch brings the stored value):
   the feeling machine's sync (mkSync: expiry by khắc, S.mood / S.emo), the seen-feelings record (emoSee), the one-time feeling migration
   (feelMig). On her phone at level 11 they do not write her person. (Display strings / net-zero probes stay local: report family 6.) */
/* (a render is a part-C world frame on her phone: gOn is false there; her own week end / buổi step still on her phone = G / E, left as is) */
/* coop-thin-g F2 helper (Danh drift #2): nextBuoi is NOT counted here. This wrapper sits OUTSIDE jcoopthine's press wrapper, so her «Sẵn sàng» press
   (nextBuoi → E: gReady → gSync + render, no step) counted as her own step and let tyHome → tyCharge (Danh −1) run on her phone while the host charged
   the same buổi in her context (trip1 wk 33: store 20 | phone 19; probe PRESSP: render 7→7, press 7→6). A REAL step of hers on her phone always runs
   under CW.allow / CW.allowN (E's wrapper lets nothing else through), which rOn already exempts; endTurn / monthTick only run inside such a step. */
let WKD=0;for(const n of ["endTurn","monthTick"])if(typeof window[n]==="function"){const f=window[n];window[n]=function(){WKD++;try{return f.apply(this,arguments)}finally{WKD--}}}
/* coop-thin-g F2 #11 (Danh drift, one world): a SYNC from the host (CW.inFC: fromCanon at the week, the part-C world apply, the hl sync, nmOrd relay)
   is no licence to run these engines on her phone: its render ran tyHome → tyCharge (Danh −1, trung y) locally while the host charged the same
   buổi in her context and patched −1 → her phone paid twice (host store 37 | phone 36 until the week rebuilt her phone). Only her own local
   runs (inLife throwaway world, allow / allowN = her real step, endTurn / monthTick inside it = WKD) keep them; jcoopone mkSync already stops under inFC the same way. */
const rOn=()=>on(L11)&&!host()&&!!CW.seat&&!CW.ctx&&!!S&&!S.dead&&!CW.inLife&&!CW.allow&&!CW.allowN&&!WKD;
for(const [n,me] of [["mkSync",1],["emoSee",0],["feelMig",0]].concat(RDIFF.filter(x=>x!=="exTick").map(x=>[x,0])))if(typeof window[n]==="function"){const f=window[n];window[n]=function(p){if(rOn()&&(!me||isMe(p))){F.stat.ro=(F.stat.ro|0)+1;if(CW.inFC)F.stat.roFC=(F.stat.roFC|0)+1;if(n==="kpCheck")return !!(S&&S.kpTron);return}return f.apply(this,arguments)}}
/* F6b (jcoopthinf6b, level 12) builds on the F5 helpers: its own registrations go through reg10 with lv 12 + its ctx */
F.x5={reg10,CX10,payAA,inR,MSC,bad,lg,gOn,host,live,isMe,encA9,decA9,mgOk,get MGC(){return MGC},set MGC(v){MGC=v},get SKH(){return SKH}};
}catch(e){console.error("jcoopthinf",e)}})();
