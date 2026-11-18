/* ================= jptime: PARALLEL TIME — every button where she asks / sends ANOTHER person (owner OD 18/11 ~20:15Z, ~20:20Z, ~20:35Z) =================
   Owner (20:20Z): "bất cứ cái nút nào mà mình nhờ vả người khác, có liên quan tới một người khác, thì mình nên áp dụng cái cách này."
   ONE mechanism, ONE state, ONE BAL table (BAL.ptime, jbal2):
   - ORDER: the sender pays only the order (BAL.ptime.kinds[kind].o khắc, read by the card's own k); the person sent is AWAY for n khắc counted
     from the tap (BAL.ptime.kinds[kind].n; n includes the walk, no double charge, OD 20:00Z) on the same day clock.
   - HER CLOCK moves only by her own acts (absolute khắc ptNow() = bid() × BAL.time.khac + used). When it reaches the due khắc the result lands:
     the person walks back in the background (MAIN's errand-scene reads ptAwayOf / PTIME.away), the report waits behind a kit status icon
     (§77.1 kitStatusIcon "tin": bobbing while someone is away, seal-red dot when news is back; tap → kit info panel with the reports and the
     one optional «Đợi tin» = jump to the next return khắc). Nothing blocks play; no forced modal (OD 20:10Z).
   - ONE STATE: S.away = [{id, who (ledger id: "mm:me" | "s<sid>" | "mm:<vid>" …), nm, kind, by ("me" | ledger id), t0, due (absolute khắc),
     place, tgt, a (runner args), fz (frozen shown odds), lbl, back, rep, read}]. Old saves: created lazily, nothing else changes.
   - BUSY: an away person cannot follow her (ledger slot = errand, not "follow") nor be sent again until back (ptLockWhy(id)).
   - LEDGER (j95 S.roster / S.rlog): every away khắc of the person is written as [place, "errand", target, why] (law 6b: a person away is away).
   - TWO-WAY: NPC senders (AG deeds through AGRUN, e.g. cx2:maidSpy) use the SAME kinds: their servant is away n khắc and the deed lands at the
     due khắc (ptNpc); when she is the RECEIVER (maid road) her master's order opens a kit order frame with ONE option «Đi» showing the SAME
     row (n khắc, the same gains and losses) — jptime2 / ptRecv.
   Runners are registered by kind (ptReg) so a task survives save / load (no closures in S).
   Off switch: BAL.ptime.on = 0 (every button runs at once as before).
   ===================================================================================================================== */
const PT={run:{},stat:{sent:0,back:0,wait:0,npc:0,errs:[]},seq:0};
function ptErr(w,e){try{if(PT.stat.errs.length<20)PT.stat.errs.push(w+": "+(e&&e.message||e));console.error("jptime",w,e)}catch(x){}}
function ptOn(){try{return !!(BAL.ptime&&BAL.ptime.on&&typeof S!=="undefined"&&S&&!S.dead)}catch(e){return false}}
function ptKH(){try{return BAL.time.khac||4}catch(e){return 4}}
/* her clock, absolute (khắc since the first buổi): moves only through spend / a new buổi */
function ptNow(){try{return bid()*ptKH()+Math.max(0,Math.min(ptKH(),typeof used==="number"?used:0))}catch(e){return 0}}
function ptRow(kind){const K=(BAL.ptime&&BAL.ptime.kinds)||{};return K[kind]||K.def||{o:1,n:2}}
function ptZ(){if(!S)return[];if(!Array.isArray(S.away))S.away=[];return S.away}
/* THE state reader: the open task of a person (ledger id), or null — "person away until khắc K" */
function ptAwayOf(id){if(!S||!id)return null;for(const a of ptZ())if(a.who===id&&!a.back)return a;return null}
function ptBusy(id){return !!ptAwayOf(id)}
/* khắc → words: "khắc 3" (this buổi) · "buổi chiều, khắc 1" · "ngày mai" */
function ptWhen(K){const kh=ptKH();const b=Math.floor(K/kh),i=K-b*kh;const nb=bid();
 let B4=3;try{B4=B4N}catch(e){}
 if(b===nb)return`khắc ${i+1}`;if(Math.floor(b/B4)===Math.floor(nb/B4)){let n="";try{n=BUOI[b%B4].toLowerCase()}catch(e){}return`${n}, khắc ${i+1}`}return"ngày mai"}
function ptLockWhy(id){const a=ptAwayOf(id);return a?`${a.nm} đang ${a.lbl||"đi việc"}, về ${ptWhen(a.due)}`:""}
/* the short line for the SENDER's card (OD 20:35Z: "tốn 1 khắc được cái gì đó, cần chờ 2 khắc"): the cost is the card's own Tốn row (k = o) */
function ptWaitTxt(kind){return`chờ ${ptRow(kind).n} khắc`}
function ptX(kind,x){const w=ptWaitTxt(kind);return x?`${w} · ${x}`:w}
function ptReg(kind,fn){PT.run[kind]=fn}
/* send: called by a button after the person is chosen and BEFORE the order khắc is paid (t0 = now) */
function ptSend(o){if(!S||!o||!o.who)return null;const r=ptRow(o.kind);/* the tap's khắc: a button that already paid its order passes paid (t0 = before the pay) */const now=Math.max(0,ptNow()-(o.paid||0));
 const a={byNm:o.byNm||"",id:++PT.seq+"-"+now+"-"+Math.floor(Math.random()*1e4),who:o.who,nm:o.nm||"",kind:o.kind,by:o.by||"me",t0:now,due:now+(o.n!=null?o.n:r.n),place:o.place||null,tgt:o.tgt||null,a:o.a||{},fz:o.fz==null?null:o.fz,lbl:o.lbl||"",back:0,rep:null,read:0};
 ptZ().push(a);PT.stat.sent++;try{ptLedger()}catch(e){ptErr("ledger",e)}
 if(a.by==="me"){try{if(typeof kitLine==="function")kitLine(`${a.nm} đã đi ${a.lbl||"làm việc"}, về ${ptWhen(a.due)}.`,2600)}catch(e){}ptIcon()}
 return a}
/* land every task whose khắc has come (her clock moved); results of HER sends wait as reports behind the status icon */
let ptBusyTick=false;
function ptTick(){if(ptBusyTick||!S||S.dead)return;const now=ptNow();const L=ptZ().filter(a=>!a.back&&a.due<=now);if(!L.length)return;ptBusyTick=true;
 try{for(const a of L.sort((x,y)=>x.due-y.due))ptLand(a)}finally{ptBusyTick=false}
 /* keep the list short: read reports and NPC tasks older than a day go */
 try{const now2=ptNow(),day=ptKH()*3;S.away=ptZ().filter(a=>!a.back||(a.by==="me"&&!a.read)||now2-a.due<day)}catch(e){}
 try{ptLedger()}catch(e){ptErr("ledger",e)}ptIcon()}
function ptLand(a){a.back=1;PT.stat.back++;const fn=a.a&&a.a.npc?PT.run.npc:PT.run[a.kind];if(!fn){a.rep={t:a.lbl||"Đã về",ok:null,L:[`${a.nm} đã về.`],d:[]};return}
 const me=a.by==="me";const b=me&&typeof rsnap==="function"?rsnap():null;const s0=S.logSeq||0;let r=null;
 try{r=a.fz!=null&&typeof fzRun==="function"?fzRun(a.fz,null,()=>fn(a)):fn(a)}catch(e){ptErr("run "+a.kind,e)}
 if(!me)return;
 const n=Math.max(0,Math.min((S.logs||[]).length,(S.logSeq||0)-s0));const L=(S.logs||[]).slice(0,n).map(x=>typeof plain==="function"?plain(x):String(x).replace(/<[^>]*>/g,"")).map(x=>x.replace(/^T\d+\/\d+\s+\S+\s+tuần\s*/,"")).reverse();
 const d=[];try{if(b)for(const [k,nm] of RKEYS){const x=(S[k]||0)-(b[k]||0);if(x)d.push([nm,x])}if(b&&S.maid&&S.maid.loyal!==b.maid)d.push(["Lòng cung nữ",S.maid.loyal-b.maid])}catch(e){}
 const ok=r&&typeof r==="object"&&"ok" in r?r.ok:(r===false?false:r===true?true:window.__lastOk!=null?!!window.__lastOk:null);
 a.rep={t:(r&&r.t)||a.lbl||"Tin báo",ok,L:L.length?L:[(r&&r.txt)||`${a.nm} đã về.`],d};
 try{if(typeof kitLine==="function")kitLine(`${a.nm} đã về: có tin báo.`,2600)}catch(e){}}
/* the jump of «Đợi tin»: to the next return khắc of HER sends (this day only; past the night = "Sang ngày mới" as always) */
function ptNext(){let m=null;for(const a of ptZ())if(!a.back&&a.by==="me"&&(m==null||a.due<m))m=a.due;return m}
function ptWaitOk(){const K=ptNext();if(K==null||!S||S.dead||(typeof Q!=="undefined"&&Q.length)||S.mg)return false;let B4=3;try{B4=B4N}catch(e){}
 return Math.floor(Math.floor(K/ptKH())/B4)===Math.floor(bid()/B4)}
function ptWait(){if(!ptWaitOk())return false;const K=ptNext();PT.stat.wait++;let guard=6;
 while(ptNow()<K&&guard-->0){if(typeof Q!=="undefined"&&Q.length)break;const kh=ptKH();const b=Math.floor(K/kh);
  if(b===bid()){const d=K-ptNow();if(d>0)spend(d);break}
  /* a later buổi of today: the rest of this buổi passes (the same step as "Sang buổi") */
  if(typeof nextBuoi==="function")nextBuoi();else break}
 ptTick();try{render()}catch(e){}return true}
/* reports of HER sends that came back and were not read */
function ptNews(){return ptZ().filter(a=>a.by==="me"&&a.back&&a.rep&&!a.read)}
function ptMine(){return ptZ().filter(a=>a.by==="me"&&!a.back)}
/* ---------- the kit status icon (§77.1): away = bobbing, news = seal-red dot, tap = info panel ---------- */
function ptPanel(){const N=ptNews(),W=ptMine();const rows=[];
 for(const a of N){const r=a.rep;rows.push(`<p><b>${r.t}</b>${r.ok===true?" · <span class=\"g\">thành</span>":r.ok===false?" · <span class=\"r\">hỏng</span>":""}</p>`+(typeof kitFacts==="function"?kitFacts(r.L):`<p>${r.L.join(" ")}</p>`)+(r.d.length&&typeof kitChips==="function"?kitChips(r.d):""))}
 for(const a of W)rows.push(`<p>${a.nm} đang ${a.lbl||"đi việc"} · về ${ptWhen(a.due)}.</p>`);
 const opts=[];if(ptWaitOk()){const K=ptNext();opts.push({n:"Đợi tin",x:`ngồi chờ đến ${ptWhen(K)}, khi người được sai trở về`,fx:{},go:()=>{setTimeout(()=>ptWait(),0)}})}
 for(const a of N)a.read=1;
 return{title:"Tin chờ người sai đi",h:rows.join("")||"<p>Không có ai đang đi việc.</p>",opts}}
function ptIcon(){try{if(typeof kitStatusIcon==="undefined")return;kitStatusIcon.set("tin",{title:"Người được sai đi",glyph:"信",order:30,
  show:()=>!!(S&&!S.dead&&(ptMine().length||ptNews().length)),busy:()=>!!(S&&ptMine().length&&!ptNews().length),badge:()=>!!(S&&ptNews().length),panel:ptPanel});kitStatusIcon.refresh()}catch(e){ptErr("icon",e)}}
/* ---------- the ledger: a person away is away (law 6b) ---------- */
function ptLedger(){if(!S||typeof j95on!=="function"||!j95on())return false;const R=S.roster;if(!R||!R.P)return false;const kh=ptKH(),b0=bid()*kh;let ch=false;
 for(const a of ptZ()){if(a.back||!R.P[a.who])continue;const e=R.P[a.who];
  for(let i=0;i<e.length;i++){const K=b0+i;if(K>=a.t0&&K<a.due){const why=`${a.by==="me"?"ngươi":a.byNm||"chủ"} sai ${a.lbl||"đi việc"}`;const x=[a.place||e[i][0],"errand",a.tgt||null,why];
    if(!e[i]||e[i][0]!==x[0]||e[i][1]!=="errand"){e[i]=x;ch=true}}}}
 if(ch)try{const k=j95kh();S.where=j95view(R,k);R.m[k]=j95counts(R,k);if(typeof j95stage==="function")j95stage(R,k)}catch(e){ptErr("view",e)}
 return ch}
/* ---------- wiring: the clock ---------- */
(function(){try{
 const sp0=spend;spend=function(){const r=sp0.apply(this,arguments);try{if(ptOn())ptTick()}catch(e){ptErr("spend",e)}return r};
 if(typeof nextBuoi==="function"){const nb0=nextBuoi;nextBuoi=function(){const r=nb0.apply(this,arguments);try{if(ptOn()){ptTick();ptLedger()}}catch(e){ptErr("buoi",e)}return r}}
 if(typeof j95sync==="function"){const js0=j95sync;j95sync=function(){const r=js0.apply(this,arguments);try{if(ptOn()&&ptZ().length)ptLedger()}catch(e){ptErr("j95sync",e)}return r}}
 if(typeof render==="function"){const r0=render;render=function(){const r=r0.apply(this,arguments);try{if(S&&Array.isArray(S.away))ptIcon()}catch(e){}return r}}
}catch(e){ptErr("wire",e)}})();
window.PTIME={on:ptOn,now:ptNow,row:ptRow,away:ptAwayOf,busy:ptBusy,lockWhy:ptLockWhy,send:ptSend,tick:ptTick,wait:ptWait,waitOk:ptWaitOk,next:ptNext,news:ptNews,mine:ptMine,when:ptWhen,reg:ptReg,x:ptX,stat:PT.stat};
/* =============================== ADAPTERS — the whole group (dev/handover/reports/parallel-time.md, before/after table) ===============================
   Each button keeps its own odds, gains and losses (the same functions run at the due khắc, with the odds frozen when she gave the order);
   only WHEN changes: the order khắc now, the result at the due khắc. */
function ptK(kind,def){return ptOn()?ptRow(kind).o:def}
/* ledger id of one of her (or an NPC's) people: the trusted maid "mm:<owner>", a household servant "s<sid>" */
function ptPid(s,owner){if(!s)return null;if(s.sid!=null)return"s"+s.sid;const o=owner||S;if(o===S||!o)return"mm:me";return"mm:"+o.id}
function ptPerson(a){if(!a)return null;if(a.sid!=null){for(const s of S.staff||[])if(s&&s.sid===a.sid)return s;return null}return S.maid||null}
function ptFree(s,owner){const id=ptPid(s,owner);return !!s&&!ptBusy(id)}
/* the person she sends for a task with no named servant (đưa lời mời, dò nơi ở, …): her runner (jhc), else the best free servant, else her maid */
function ptRunner(){try{const b=bestSent(S);if(b&&ptFree(b))return b}catch(e){}if(S.maid&&S.maid.name&&ptFree(S.maid))return S.maid;return null}
function ptNoRunner(){return"không còn ai rảnh để sai (người hầu đang đi việc)"}
/* ---- busy servants are never picked to be sent (her runner, NPC mistresses too: two-way) ---- */
(function(){try{if(typeof bestSent!=="function")return;const b0=bestSent;bestSent=function(p){const r=b0.apply(this,arguments);try{if(!ptOn()||!r||!p)return r;if(!ptBusy(ptPid(r,p)))return r;
  const L=(p.staff||[]).filter(s=>s&&s!==r&&!s.spyFor&&!ptBusy(ptPid(s,p)));if(!L.length)return null;return L.sort((a,b)=>(b.loyal||0)-(a.loyal||0))[0]}catch(e){return r}}}catch(e){ptErr("bestSent",e)}})();
/* ---- 1. Sai đi dò la (her maid / any servant of her household; Hành sự card, maid pop-up, Cung nhân) ---- */
(function(){try{if(typeof spyMaidRun!=="function")return;const s0=spyMaidRun;spyMaidRun=function(t,ag){if(!ptOn()||PT.landing||!t)return s0.apply(this,arguments);
  const m=ag||S.maid;const id=ptPid(m);const fz=typeof ACTFZ!=="undefined"&&ACTFZ?ACTFZ.o:null;
  /* the order is given (and already paid: payOnPick / the card): the door and the day stamp exactly as the old run set them */
  try{const p=window.__adPend;window.__adPend=null;if(p)p.done=1;if(typeof adDoorMark==="function")adDoorMark("Sai cung nữ đi dò la")}catch(e){}
  try{S.mspy={b:spyBk(),id:t.id}}catch(e){}
  const a=ptSend({who:id,nm:m.name,kind:"spy",paid:ptRow("spy").o,place:palaceOf(t),tgt:"v"+t.id,a:{v:t.id,sid:ag&&ag.sid!=null?ag.sid:null},fz,lbl:`đi dò la ${t.name}`});
  window.__lastOk=null;return null}}catch(e){ptErr("spy",e)}})();
ptReg("spy",a=>{const t=RV(a.a.v);const m=ptPerson(a.a);if(!m)return{txt:`Người được sai đi dò la không trở về.`,ok:false};if(!t||!t.alive){log(`${m.name} trở về: người cần dò la không còn trong cung.`);return{ok:null}}
 PT.landing=1;try{const ok=spyMaidRun(t,a.a.sid!=null?m:undefined);return{ok:!!ok,t:`${m.name} dò la ${t.name} trở về`}}finally{PT.landing=0}});
/* ---- 2. Nghe ngóng chung ---- */
function ptListen(m){if(!ptOn()||PT.landing)return spyNews(m);const a=ptSend({who:ptPid(m),nm:m.name,kind:"listen",paid:ptRow("listen").o,place:"cnh",a:{sid:m.sid!=null?m.sid:null},lbl:"đi nghe ngóng"});
 return a?`${m.name} đi nghe ngóng, về ${ptWhen(a.due)}.`:spyNews(m)}
ptReg("listen",a=>{const m=ptPerson(a.a);if(!m)return{txt:"Người được sai đi nghe ngóng không trở về.",ok:false};const r=spyNews(m);if(r)log(`${m.name} nghe ngóng trở về: ${r}`);return{ok:true,t:`${m.name} nghe ngóng trở về`}});
/* the two options on her maid's / a servant's pop-up (talkOpts kinds maid / serv): order khắc, "chờ N khắc", busy lock */
(function(){try{const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{if(!ptOn()||!p||!Array.isArray(A)||(p.kind!=="maid"&&p.kind!=="serv"))return A;
  const m=p.kind==="serv"?p.ref:S.maid;if(!m)return A;const why=ptLockWhy(ptPid(m));
  return A.map(a=>{if(!a)return a;if(a.n==="Sai đi dò la"&&a.open&&!a.lock){return Object.assign({},a,{pk:"spy",x:ptX("spy",a.x)},why?{lock:true,t:why}:{open:()=>spyPick(ptRow("spy").o,p.kind==="serv"?m:undefined)})}
   if(a.n==="Nghe ngóng chung"&&a.run&&!a.lock){return Object.assign({},a,{pk:"listen",x:ptX("listen",a.x)},why?{lock:true,t:why}:{run:()=>ptListen(m)})}
   if(why&&/^(Tâm sự|Trò chuyện với cung nữ|Hỏi chuyện)$/.test(a.n))return Object.assign({},a,{lock:true,t:why});return a})}catch(e){ptErr("talkOpts",e);return A}}}catch(e){ptErr("talkOpts wire",e)}})();
/* ---- 3. Sai tai mắt dò nơi ở (j21): a real person goes (her runner) ---- */
ptReg("scout",a=>{const v=RV(a.a.v);const m=ptPerson(a.a);const nm=m?m.name:"Người được sai";if(!v||!v.alive){log(`${nm} trở về: người cần dò không còn trong cung.`);return{ok:null}}
 if(roll(a.a.o)){seeLoc(v);log(`${nm} báo: ${v.name} đang ở ${placeName(whereOf(v))}.`);return{ok:true,t:`${nm} dò nơi ở ${v.name} trở về`}}log(`${nm} không dò ra ${v.name} ở đâu.`);return{ok:false,t:`${nm} dò nơi ở ${v.name} trở về`}});
/* ---- 4. Mời đến cung ta (j21): the messenger goes, the answer (and the guest) comes at the due khắc ---- */
function ptInvPend(id){return ptZ().some(a=>a.kind==="invite"&&!a.back&&a.a&&a.a.v===id)}
ptReg("invite",a=>{const v=RV(a.a.v);const m=ptPerson(a.a);const nm=m?m.name:"Người được sai";if(!v||!v.alive||v.out||v.confined){log(`${nm} trở về: ${v?v.name:"nàng"} không thể nhận lời lúc này.`);return{ok:null}}
 if(roll(a.a.o)){try{S.where[v.id]="home";seeLoc(v,"home");const R=S.roster;if(R&&R.P&&R.P["v"+v.id]&&typeof j95kh==="function"){for(let i=j95kh();i<R.P["v"+v.id].length;i++)R.P["v"+v.id][i]=[S.out?"lc":"home","visit","me","nhận lời mời sang chơi"];if(typeof j95sync==="function")j95sync()}}catch(e){ptErr("inviteLand",e)}
  log(`${v.name} nhận lời, sang cung ngươi.`);return{ok:true,t:`${nm} mời ${v.name} trở về`}}
 relAdd(S,v,BAL.eff.j21.top);log(`${v.name} từ chối lời mời.`);return{ok:false,t:`${nm} mời ${v.name} trở về`}});
/* ---- 5. TWO-WAY: NPC senders obey the same rule (AG deeds through AGRUN: the NPC pays her deed's khắc, the person sent is away n khắc,
   the deed lands at the due khắc with the same function, odds and news as before) ---- */
const PT_NPC={"cx2:maidSpy":{kind:"spy",who:v=>v&&v.maid&&v.maid.name?{id:"mm:"+v.id,nm:v.maid.name}:null,lbl:t=>`đi dò la ${t&&t.name?t.name:""}`.trim()}};
function ptNpcWire(){if(typeof AGRUN==="undefined")return;for(const k in PT_NPC){const f0=AGRUN[k];if(!f0||f0.__pt)continue;const D=PT_NPC[k];
 const f=function(v,t,pd){if(!ptOn()||PT.landing||!v||v===S)return f0.apply(this,arguments);const w=D.who(v);if(!w)return f0.apply(this,arguments);
  if(ptBusy(w.id))return"";/* her person is still out on the last errand: no second order (the deed is dropped, as an NPC with no maid) */
  let tid=null;try{tid=ledgerId(t)}catch(e){tid=t===S?"me":t&&t.id!=null?"v"+t.id:null}
  ptSend({who:w.id,nm:w.nm,kind:D.kind,by:"v"+v.id,byNm:v.name,place:t&&t!==S?palaceOf(t):t===S?(S.out?"lc":"home"):null,tgt:tid,a:{npc:k,v:v.id,t:tid},lbl:D.lbl(t)});PT.stat.npc++;return""};
 f.__pt=1;AGRUN[k]=f;PT.npc0=PT.npc0||{};PT.npc0[k]=f0}}
ptReg("npc",a=>{const k=a.a.npc;const f0=PT.npc0&&PT.npc0[k];const v=RV(a.a.v);if(!f0||!v||!v.alive||v.out)return null;let t=null;try{t=agPerson(a.a.t)}catch(e){}if(a.a.t&&!t)return null;
 PT.landing=1;let r="";try{r=f0(v,t,null)||""}catch(e){ptErr("npc "+k,e)}finally{PT.landing=0}
 try{if(r){const me=t===S;newsAdd(v,k,r,me);if(me)log(`${r}.`)}}catch(e){}return null});
try{ptNpcWire()}catch(e){ptErr("npcWire",e)}
/* ---- 6. deeds on a consort done by a SENT servant (j8 doAct: not together → "phải sai người đi", j9 actCtx / bestSent) ---- */
function ptHarmSent(v,k){try{return ptOn()&&!!v&&v!==S&&!!ACT[k]&&k!=="plant"&&k!=="gift"&&!together(S,v)&&!ACT_NOSEND.includes(k)}catch(e){return false}}
function harmK(v,k){return ptHarmSent(v,k)&&bestSent(S)?ptRow("harm").o:BAL.time.cost.harm}
function ptHarmX(v,k){if(!ptHarmSent(v,k))return"";const s=bestSent(S);return s?` · ${ptWaitTxt("harm")} (sai ${s.name})`:` · ${ptNoRunner()}`}
function ptHarmSend(v,k,fz){if(!ptHarmSent(v,k))return false;const s=bestSent(S);if(!s)return false;
 ptSend({who:ptPid(s),nm:s.name,kind:"harm",place:palaceOf(v),tgt:"v"+v.id,a:{v:v.id,k,sid:s.sid},fz:null,lbl:`đi ${String(ACT[k].n||"làm việc").toLowerCase()} ${v.name}`});
 const a=ptZ()[ptZ().length-1];if(a)a.a.fz=fz;return true}
ptReg("harm",a=>{const v=RV(a.a.v),k=a.a.k;const s=ptPerson(a.a);const nm=s?s.name:"Người được sai";
 if(!v||!v.alive||v.out||!ACT[k]||!ACT[k].ok(S,v)){log(`${nm} trở về: việc «${ACT[k]?ACT[k].n:k}» không làm được nữa.`);return{ok:null}}
 const r=fzRun(a.a.fz,k,()=>runAct(S,v,k));if(r)log(r);return{t:`${nm} ${String(ACT[k].n).toLowerCase()} ${v.name} trở về`}});
/* ---- 7. Sai người lẻn vào cung … cài đồ (PEND.plantpick, not "tại cung nàng"): the servant carries the item (it leaves her chest), lands at due ---- */
(function(){try{const b0=PEND.plantpick;if(!b0)return;PEND.plantpick=function(p){const d=b0.apply(this,arguments);try{if(!d||!ptOn()||p.here)return d;const v=RV(p.v);const s=bestSent(S);
  if(!s){d.o=(d.o||[]).map(o=>o.ik!=null?Object.assign({},o,{lock:true,x:ptNoRunner()}):o);return d}
  d.t=(d.t||"")+`<p class="past">${s.name} đi · tốn ${ptRow("plant").o} khắc, ${ptWaitTxt("plant")}</p>`;
  d.o=(d.o||[]).map(o=>o.ik==null?o:Object.assign({},o,{go:()=>{const fz=actOdds(S,v,"plant");const e=S.inv[o.ik];if(!e)return;S.inv.splice(o.ik,1);
   ptSend({who:ptPid(s),nm:s.name,kind:"plant",place:palaceOf(v),tgt:"v"+v.id,a:{v:v.id,sid:s.sid,item:e,fz},lbl:`lẻn vào cung ${v.name}`});spend(ptRow("plant").o)}}))}catch(e){ptErr("plantpick",e)}return d}}catch(e){ptErr("plant wire",e)}})();
ptReg("plant",a=>{const v=RV(a.a.v);const s=ptPerson(a.a);const nm=s?s.name:"Người được sai";const e=a.a.item;if(e)S.inv.push(e);/* the item is real (law 6c): back in her chest, then used */
 if(!e)return{ok:null};if(!v||!v.alive||v.out){log(`${nm} trở về, mang ${iname(e)} về lại rương.`);return{ok:null}}
 const i=S.inv.indexOf(e);let r="";fzRun(a.a.fz,"plant",()=>{r=runAct(S,v,"plant",i)});if(r)log(r);return{t:`${nm} lẻn vào cung ${v.name} trở về`}});
/* ---- 8. Tặng quà by hand (PEND.giftpick from her card, not together): a servant carries the gift ---- */
(function(){try{const b0=PEND.giftpick;if(!b0)return;PEND.giftpick=function(p){const d=b0.apply(this,arguments);try{if(!d||!ptOn()||p.v==null)return d;const v=RV(p.v);if(!v||together(S,v))return d;const s=bestSent(S);
  if(!s){d.o=(d.o||[]).map(o=>o.ik!=null?Object.assign({},o,{lock:true,x:ptNoRunner()}):o);return d}
  d.t=(d.t||"")+`<p class="past">${s.name} mang quà đi · tốn ${ptRow("gift").o} khắc, ${ptWaitTxt("gift")}</p>`;
  d.o=(d.o||[]).map(o=>o.ik==null?o:Object.assign({},o,{go:()=>{const e=S.inv[o.ik];if(!e)return;S.inv.splice(o.ik,1);
   ptSend({who:ptPid(s),nm:s.name,kind:"gift",place:palaceOf(v),tgt:"v"+v.id,a:{v:v.id,sid:s.sid,item:e},lbl:`mang quà sang cung ${v.name}`});spend(ptRow("gift").o)}}))}catch(e){ptErr("giftpick",e)}return d}}catch(e){ptErr("gift wire",e)}})();
ptReg("gift",a=>{const v=RV(a.a.v);const s=ptPerson(a.a);const nm=s?s.name:"Người được sai";const e=a.a.item;if(e)S.inv.push(e);if(!e)return{ok:null};
 if(!v||!v.alive||v.out){log(`${nm} trở về, mang ${iname(e)} về lại rương.`);return{ok:null}}
 const r=giveTo(S,v,S.inv.indexOf(e));if(r)log(r);return{t:`${nm} mang quà sang cung ${v.name} trở về`}});
/* ---- 9. Sai cung nữ thân tín mua lén ngoài cung (j83 IROUTE.maid): she leaves by the Thần Vũ gate; caught or not is known when she is back
   (the goods still come next tuần, as before); the bạc was paid when she was sent (the option's fx) ---- */
(function(){try{if(typeof illBuy!=="function"||typeof IROUTE==="undefined"||!IROUTE.maid)return;const R0=IROUTE.maid;
 const n0=R0.need;R0.need=function(p){const w=n0.apply(this,arguments);if(w||p!==S||!ptOn())return w;return ptLockWhy("mm:me")};
 const w0=R0.when;Object.defineProperty(R0,"when",{get:()=>ptOn()?`${ptWaitTxt("buy")} biết thành bại, ${w0}`:w0,configurable:true});
 const ib0=illBuy;illBuy=function(p,r,k,from,paid){if(p!==S||r!=="maid"||!ptOn()||PT.landing||!S.maid)return ib0.apply(this,arguments);
  if(!paid){const c=R0.cost(k);if(S.bac<c)return"";apply({bac:-c})}
  const a=ptSend({who:"mm:me",nm:S.maid.name,kind:"buy",paid:ptRow("buy").o,place:typeof J95OUT_!=="undefined"?J95OUT_:null,a:{k},lbl:`lén ra cửa Thần Vũ mua ${itm(k).n}`});
  return a?`Ngươi sai ${S.maid.name} lén ra cửa Thần Vũ mua ${itm(k).n}; nàng về ${ptWhen(a.due)}. `:""}}catch(e){ptErr("illBuy wire",e)}})();
ptReg("buy",a=>{if(!S.maid)return{ok:null};PT.landing=1;let r="";try{r=illBuy(S,"maid",a.a.k,null,1)}finally{PT.landing=0}if(r)log(r);return{t:`${S.maid.name} lén mua đồ trở về`,ok:!/không thành/.test(r)}});
/* ---- 10. Sai cung nữ đến Nội vụ phủ xin y phục (jeitem eitReOpts): the same option runs when she is back ---- */
(function(){try{if(typeof eitReOpts!=="function")return;const e0=eitReOpts;eitReOpts=function(){const O=e0.apply(this,arguments);try{if(!ptOn()||PT.landing||!Array.isArray(O))return O;
  return O.map(o=>{const m=o&&/^Sai (.+) đến Nội vụ phủ xin$/.exec(o.n||"");if(!m)return o;const s=[S.maid].concat(S.staff||[]).find(x=>x&&x.name===m[1]);if(!s)return o;const why=ptLockWhy(ptPid(s));
   return Object.assign({},o,{x:String(o.x||"").replace("có y phục mặc ngay",`${ptWaitTxt("clothes")}, nàng mang y phục về`),go:why?()=>{}:()=>{ptSend({who:ptPid(s),nm:s.name,kind:"clothes",place:"nvp",a:{sid:s.sid!=null?s.sid:null,nm:s.name},lbl:"đến Nội vụ phủ xin y phục"});if(ptRow("clothes").o)spend(ptRow("clothes").o)}},why?{lock:true,x:why}:{})})}catch(e){ptErr("eitRe",e);return O}}}catch(e){ptErr("eit wire",e)}})();
ptReg("clothes",a=>{PT.landing=1;try{const O=eitReOpts(false)||[];const o=O.find(x=>x&&x.n===`Sai ${a.a.nm} đến Nội vụ phủ xin`);if(o&&o.go){o.go();return{t:`${a.a.nm} đến Nội vụ phủ xin y phục trở về`}}
 log(`${a.a.nm} trở về: Nội vụ phủ không còn việc ấy nữa.`);return{ok:null}}finally{PT.landing=0}});
/* =============================== RECEIVER SIDE (owner OD 18/11 ~20:35Z, law 1 two-way) ===============================
   When she plays the person SENT (maid road) and her master gives the order: a kit order frame pops up with ONE option «Đi» (servants never refuse
   an errand) showing the SAME row as the sender's card: n khắc (BAL.ptime, her walk included: no double charge, OD 20:00Z), the same gain, the same
   loss (e.g. dò la: fail → Chủ tin −BAL.eff.jwhy.loyalSpyMaidRun "hoảng sợ" = the sender's "Lòng cung nữ −5"). She really walks on Dư đồ to the place
   (srvGoTo, S.place + ledger), the rest of the n khắc is the task, then the result. */
function ptRecvGo(k,kind,run){const N=ptRow(kind).n;const t0=ptNow();let ok=true;try{ok=srvGoTo(k)!==false}catch(e){ok=false}
 if(!ok)return false;const w=ptNow()-t0;const rest=Math.max(0,N-w);if(rest&&can(rest))spend(rest);else if(rest)used=Math.min(ptKH(),used+rest);
 try{run()}catch(e){ptErr("recv "+kind,e)}try{render()}catch(e){}return true}
function ptRecvRow(kind,o,gain,loss){return[o!=null&&o<100?word(o):"",`tốn: ${ptRow(kind).n} khắc (cả đường đi)`,gain?"thành: "+gain:"",loss?"hỏng: "+loss:""].filter(Boolean).join(" · ")}
/* (a) her master orders a dò la (j42 srvOrder k "spy" → PEND.cnvOrd): the mirror of the consort's "Sai đi dò la" (jwhy spyRoll, j78 evN, jwhy loyalSpyMaidRun, j78 oán) */
(function(){try{const c0=PEND.cnvOrd;if(!c0)return;PEND.cnvOrd=function(pp){if(!ptOn()||!pp||pp.k!=="spy")return c0.apply(this,arguments);const m=srvM(),t=RV(pp.t);if(!isSrv()||!m||!t||!t.alive||t.out)return null;
  const o=spyRoll(m,t,knMeAg());const L=BAL.eff.jwhy.loyalSpyMaidRun;
  return{t:`<p>${m.name} gọi ngươi vào: “Ngươi đi dò la cung ${t.name}, xem nàng gặp ai, nói gì.”</p>`,who:pv(m),o:[{n:"Đi",fx:{},x:ptRecvRow("spy",o,`${m.name} nắm ${balSg(BAL.eff.j78.evN)} chứng cứ của ${t.name} nếu nàng từng làm điều sai`,`Chủ tin -${balAb(L)} (hoảng sợ), ${t.name} đoán ra: oán ${m.name} ${balSg(BAL.eff.j78.j78maidFail)}`),
   go:()=>{ptRecvGo(palaceOf(t),"spy",()=>{if(roll(o)){const n=evA(m,t,BAL.eff.j78.evN);srvMerit(BAL.eff.j42.srvDoOrder_2);log(n?`Ngươi dò la được chuyện của ${t.name}, về bẩm ${m.name}: chủ nắm thêm ${balAb(BAL.eff.j78.evN)} chứng cứ.`:`Ngươi dò la ${t.name}: không tìm ra điều gì sai trái.`)}
    else{apply({tin:-L});oanAdd(t,m,BAL.eff.j78.j78maidFail);log(`<span class="r">Ngươi nấp nghe ngoài cửa sổ cung ${t.name} thì bị bắt gặp, hoảng sợ chạy về.</span> Chủ tin -${balAb(L)}.`)}})}}]}};
 }catch(e){ptErr("cnvOrd wire",e)}})();
/* (b) «Việc chủ sai» (j42 srvErrPick: lấy thuốc, hái hoa, mang canh, mang kinh, mang quà): the order frame pops up when the master gives it */
function ptErrKind(er){return er&&er.v!=null?"gift":"errand"}
function ptErrFrame(){if(!ptOn()||!isSrv()||!S.srv||S.dead)return false;const er=S.srv.err;if(!er||er.none||er.acc||er.pop||(typeof Q!=="undefined"&&Q.length))return false;const m=srvM();if(!m)return false;er.pop=1;const kind=ptErrKind(er);
 const gain=`công lao +${BAL.eff.j42.srvErrandDone_2}${er.v!=null?` · ${m.name} thêm thân với người nhận quà`:""}`;
 Q.push({t:"Việc chủ sai",who:pv(m),h:`<p>${m.name} sai ngươi: ${er.n}.</p>`,opts:[{n:"Đi",fx:{},x:ptRecvRow(kind,null,gain,""),go:()=>{er.acc=1;S.srv.sent={k:er.k,n:er.n,until:bid(),done:0,v:er.v||null};
  if(!ptRecvGo(er.k,kind,()=>{const r=srvErrandDone();if(r)log(r)})){/* the place is shut right now: the order stays on her Phận sự list (the old card) */er.acc=0}}}]});try{showModal()}catch(e){}return true}
(function(){try{if(typeof srvCards!=="function")return;const s0=srvCards;srvCards=function(){const X=s0.apply(this,arguments);try{if(ptOn()&&S.srv&&S.srv.err&&!S.srv.err.none&&!S.srv.err.acc){setTimeout(()=>{try{if(ptErrFrame())render()}catch(e){}},0)}}catch(e){ptErr("srvCards",e)}return X}}catch(e){ptErr("srvCards wire",e)}})();
