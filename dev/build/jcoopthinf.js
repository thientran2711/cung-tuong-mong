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

/* ---------- guest ---------- */
/* reviewer r1 (her act's result card): in solo and below level 6 the caller that snapshots her stats before an act (rsnap: wrapR doAct,
   the place pop-up j65, the other result-card callers) shows the kit result card (resultShow, #rtoast) right after the act. At level 6
   the act's result comes later in the host's answer, so that check sees no change and her phone showed NO result card. The snapshot the
   caller took in the same tick rides with the pending intent; the card is shown once, when the answer (with her patch) has landed: the
   same kit card, title and rows as solo. A caller that took no snapshot never had a card (solo neither): none here. */
let snapV=null;
if(typeof rsnap==="function"){const r0=rsnap;rsnap=function(){const o=r0.apply(this,arguments);if(CW.ctx&&o&&typeof o==="object")try{Object.defineProperty(o,"__ctx",{value:CW.ctx})}catch(e){}snapV=o;Promise.resolve().then(()=>{if(snapV===o)snapV=null});return o}}
function cardLater(p,dr){const b=p.bf;if(!b||!dr||!dr.r||dr.r.st!=="ok"||typeof resultShow!=="function")return;
 setTimeout(()=>{try{if(!S||S.dead)return;if(p.force||(S.logSeq||0)!==b.seq||RKEYS.some(([k])=>(S[k]||0)!==b[k])){F.stat.card=(F.stat.card|0)+1;resultShow(p.ttl||"",b,p.force?true:null)}}catch(e){console.error("thin F card",e)}},0)}
function gOn(lv){return on(lv)&&!host()&&!!CW.seat&&!CW.ctx&&!!S&&!S.dead&&!CW.inLife&&!CW.inFC&&!CW.allow&&!CW.allowN&&!(TH.C&&TH.C.inWorld&&TH.C.inWorld())}
function line(t){try{if(typeof kitLine==="function")kitLine(t);else log(t)}catch(e){}}
function sendF(p){COOP.send({t:"do",op:"f",args:p.msg,base:TH.view?TH.view.v:0,id:p.id});E.last=p.id;p.at=Date.now()}
function intent(name,args){const R=F.R[name],t00=performance.now();
 if(F.pend){F.stat.busy++;return "busy"}
 let a=null;try{a=R.enc(args)}catch(e){console.error("thin F enc",name,e)}if(a==null){F.stat.bad++;lg(["bad",name]);return "bad"}
 const V=TH.view;if(!V||!V.o){F.stat.bad++;return "bad"}
 if(R.snap&&typeof rsnap==="function")try{rsnap()}catch(e){}
 try{TH.gSync(V)}catch(e){}
 const c={};for(const [n,g] of R.ctx||[])try{const v=g();if(v!=null)c[n]=J(v)}catch(e){}
 let ops=[],cur=null;try{cur=E.curP();ops=TH.pDiff(E.base(V),cur)}catch(e){console.error("thin F diff",e)}
 const L=E.packs(ops);const last=L.pop()||[];const rid="f"+Date.now().toString(36)+Math.random().toString(36).slice(2,5);
 L.forEach((o,i)=>TH.doSend("erd",{id:rid,i,ops:o}));if(cur)E.sent(cur);
 const p=F.pend={id:"d"+rid,n:name,msg:{n:name,a,c,ops:last},t0:Date.now(),tries:0,pre:Math.round(performance.now()-t00)};p.bf=snapV;try{if(p.bf&&R.title)p.ttl=R.title(args)}catch(e){}p.force=!!R.snap;p.args=args;p.b0=S.buoi||0;p.w0=COOP.state.week||0;p.room=COOP.state.room||"";try{p.walk=R.walk?R.walk(args):null}catch(e){p.walk=null}sendF(p);F.stat.sent++;lg(["sent",name,p.id,ops.length]);
 /* the pending state shows at once: #next locked + her act buttons off, in this same tick (no lost tap: the tap is held as the intent) */
 const t1=performance.now();try{CW.lockNext();render()}catch(e){}p.pr=Math.round(performance.now()-t1);return true}
function answered(dr){const p=F.pend;if(!p||!dr||dr.id!==p.id)return;F.pend=null;F.stat.ans++;const ms=Date.now()-p.t0;F.stat.ms.push(ms);if(F.stat.ms.length>40)F.stat.ms.shift();
 lg(["ans",p.n,ms,dr.r&&dr.r.st]);F.lastAns={id:p.id,n:p.n,ms,r:dr.r/* the view's own object (main behaviour; the guest's name lens edits it in place) */,r0:dr.r?J(dr.r):null/* F2: the answer as sent */,pre:p.pre,pr:p.pr,tries:p.tries};
 back(p,dr.r);try{CW.lockNext();render()}catch(e){}cardLater(p,dr);}
/* F2 (gap 2/3): what the host's run wrote OUTSIDE her person (her khắc `used`, the pop-up popIdx/popMsg, tab / __fromMap) comes back with
   the answer and is set here (only while she is still on the buổi the intent was made in: a buổi step resets them anyway); toasts her run
   raised on the host (srvToast / kitLine, no-ops there) play here; then the registration's after-hook (e.g. the place card of a walk that
   did not arrive, exactly where solo shows it) */
function back(p,r){const R=F.R[p.n];if(!R||!r||r.st!=="ok")return;
 try{if(r.c&&(S.buoi||0)===p.b0&&(COOP.state.week||0)===p.w0)for(const [n,,s] of R.ctx||[])if((R.back||[]).includes(n)&&n in r.c&&JSON.stringify(r.c[n])!==JSON.stringify((p.msg.c||{})[n]===undefined?null:p.msg.c[n]))s(r.c[n])/* only what her run changed */}catch(e){console.error("thin F back",e)}
 try{for(const [f,m] of r.ui||[])if(typeof window[f]==="function"&&m)window[f](m)}catch(e){}
 try{if(R.done)R.done(p.args,r,p)}catch(e){console.error("thin F done",e)}}
COOP.on("thinview",V=>{try{if(!host()&&V&&V.o)answered(V.o.dr)}catch(e){console.error("thin F view",e)}});
COOP.on("error",m=>{try{const p=F.pend;if(!p||!m||m.id!==p.id||host())return;if(m.code==="nohost"||m.code==="nothin")p.at=0/* resend at the next tick */}catch(e){}});
setInterval(()=>{const p=F.pend;if(!p||host())return;if(!on()||COOP.frozen)return;if(Date.now()-p.at<8000)return;
 if(p.tries>=3){F.pend=null;F.stat.give++;lg(["give",p.n,p.id]);line("Việc ấy chưa thành, xin thử lại.");try{CW.lockNext();render()}catch(e){}return}
 p.tries++;F.stat.resend++;lg(["resend",p.n,p.id,p.tries]);sendF(p)},1000);
/* F2 net loss (the whole intent family, F1 too): her socket can look open while dead (4G, sleep): the intent frame, or the host's answer,
   is lost, then COOP reconnects ("room"). Dropping the pending intent there lost her tap in silence (a P7 walk-spill red: the host ran the
   walk, her phone never heard, no resend, no word). Same room + same week: keep it and send it again as soon as the room level is back
   (the 1 s tick below; the host dedupes by intent id, DONE kept per room, so a walk the host already ran is answered from DONE, never run
   twice). Another room / another week: the intent is stale, dropped with the "not done" word (her tap is never silently lost). */
COOP.on("room",()=>{const p=F.pend;if(!p)return;if(p.room!==(COOP.state.room||"")||(COOP.state.week||0)!==p.w0){F.pend=null;lg(["drop",p.n,p.id]);line("Việc ấy chưa thành, xin thử lại.");try{CW.lockNext();render()}catch(e){}return}
 p.at=0;F.stat.reNet=(F.stat.reNet|0)+1;lg(["reNet",p.n,p.id])});
/* pending = busy: #next waits (existing lockNext words through CW.eWait), act buttons off (can) */
{const w=CW.eWait;CW.eWait=()=>!!(w&&w())||!!(F.pend&&on()&&!host())}
if(typeof can==="function"){const f=can;can=function(){if(F.pend&&on()&&!host()&&!CW.ctx)return false;return f.apply(this,arguments)}}

/* ---------- host ---------- */
const DONE=new Map();
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
  else{const ui=TH.uiCap=R.lv?[]:null/* F2 registrations: her toasts play on her phone (F1 unchanged) */;let r;try{r=PRE[a.n].apply(null,args)}finally{TH.uiCap=null}F.stat.run++;if(R.log&&r)log(r);out={st:"ok",r:typeof r==="string"?r.replace(/<[^>]+>/g,"").slice(0,200):null};
   if(typeof r==="boolean")out.rv=r;if(ui&&ui.length)out.ui=ui.slice(0,4);
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
  if(a.xe){const s=JSON.stringify(a.xe);let i=(S.inv||[]).findIndex(e=>JSON.stringify(C0(e))===s);if(i<0&&typeof a.x==="number"&&S.inv[a.x]&&S.inv[a.x].k===a.xe.k)i=a.x;if(i<0)return null;x=i}
  else if(typeof a.x==="number")x=a.x;return [S,t,a.k,x]},
 ctx:[["sg",()=>typeof SG==="object"&&SG.mod?SG.mod:null,v=>{if(typeof SG==="object")SG.mod=v}],["err",()=>S.__err||null,v=>{S.__err=v||0}]]});
function C0(e){const o=Object.assign({},e);delete o.ci;return o}

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
/* gap 4: the "did she arrive?" callers (j77Tap, walkSpillTick) open the place card right after goTo; while her walk there is pending the
   card waits for the answer (placeCard) — never a card before the host has said, never a lost tap */
if(typeof j77Card==="function"){const jc=j77Card;j77Card=function(k){const p=F.pend;if(p&&p.walk&&p.walk===k&&!host()&&on(L7)){p.card=1;return}return jc.apply(this,arguments)}}
}catch(e){console.error("jcoopthinf",e)}})();
