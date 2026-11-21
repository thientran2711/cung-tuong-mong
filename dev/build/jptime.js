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
     due khắc (ptNpc); when she is the RECEIVER (maid road) her master's order waits as a NOTICE (S.ordQ) and she
     answers it with the SAME 4 answers every receiver has (OD 18/11 ~21:15Z, OD L1876: j42 cnvOrdOpts) — § RECEIVER SIDE.
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
function ptX(kind,x){const w=ptWaitTxt(kind);/* no empty segment ("chờ 2 khắc ·  · thành", jmkt): drop blank parts */x=String(x==null?"":x).split(" · ").map(p=>p.trim()).filter(Boolean).join(" · ");return x?`${w} · ${x}`:w}
function ptReg(kind,fn){PT.run[kind]=fn}
/* ONE NOTICE SYSTEM (owner OD 18/11 ~22:10Z; MAIN ROOT-60 order 19/11 ~00:30Z): every jptime notice goes through window.kitNotice (jnotice, KIT §42.2:
   top-bar «!» box + top chip + «Tin báo» panel); a build without jnotice falls back to kitLine. No private toast. spec = {id, line, text, go, goLabel} */
function ptNote(sp){try{if(typeof window.kitNotice==="function")return window.kitNotice(sp);if(typeof kitLine==="function")return kitLine(sp.line,2600)}catch(e){ptErr("notice",e)}return null}
function ptOpenTin(){try{if(typeof kitStatusIcon!=="undefined"&&typeof kitStatusIcon.open==="function")kitStatusIcon.open("tin")}catch(e){ptErr("openTin",e)}}
/* send: called by a button after the person is chosen and BEFORE the order khắc is paid (t0 = now) */
function ptSend(o){if(!S||!o||!o.who)return null;const r=ptRow(o.kind);/* the tap's khắc: a button that already paid its order passes paid (t0 = before the pay) */const now=Math.max(0,ptNow()-(o.paid||0));
 const a={byNm:o.byNm||"",id:++PT.seq+"-"+now+"-"+ptZ().length/* no Math.random: a send never moves the game's random draws */,who:o.who,nm:o.nm||"",kind:o.kind,by:o.by||"me",t0:now,due:now+(o.n!=null?o.n:r.n),place:o.place||null,tgt:o.tgt||null,a:o.a||{},fz:o.fz==null?null:o.fz,lbl:o.lbl||"",back:0,rep:null,read:0};
 ptZ().push(a);PT.stat.sent++;try{ptLedger()}catch(e){ptErr("ledger",e)}
 if(a.by==="me"){ptNote({id:"pt:go:"+a.id,line:`${a.nm} đã ${/^đi /.test(a.lbl||"")?a.lbl:"đi "+(a.lbl||"làm việc")}, về ${ptWhen(a.due)}.`/* no «đã đi đi …» when the label starts with «đi» (whole group of send labels) */});ptIcon()}
 return a}
/* land every task whose khắc has come (her clock moved); results of HER sends wait as reports behind the status icon */
let ptBusyTick=false;
function ptTick(){if(ptBusyTick||!S||S.dead)return;try{ptOrdTick()}catch(e){ptErr("ordTick",e)}const now=ptNow();const L=ptZ().filter(a=>!a.back&&a.due<=now);if(!L.length)return;ptBusyTick=true;
 try{for(const a of L.sort((x,y)=>x.due-y.due))ptLand(a)}finally{ptBusyTick=false}
 /* keep the list short: read reports and NPC tasks older than a day go */
 try{const now2=ptNow(),day=ptKH()*3;S.away=ptZ().filter(a=>!a.back||(a.by==="me"&&!a.read)||now2-a.due<day);
  /* unread reports of hers are capped (reviewer note): the newest BAL.ptime.repMax stay, older ones count as read and leave after a day */
  const U=S.away.filter(a=>a.back&&a.by==="me"&&!a.read);const cap=BAL.ptime.repMax;if(U.length>cap){const old=U.sort((x,y)=>x.due-y.due).slice(0,U.length-cap);for(const a of old)a.read=1;S.away=S.away.filter(a=>!old.includes(a)||now2-a.due<day)}}catch(e){}
 try{ptLedger()}catch(e){ptErr("ledger",e)}ptIcon()}
function ptLand(a){a.back=1;PT.stat.back++;const fn=a.a&&a.a.npc?PT.run.npc:a.a&&a.a.run?PT.run[a.a.run]:PT.run[a.kind];/* a.run: the button's own runner when it shares a BAL row (kind) with others */if(!fn){a.rep={t:a.lbl||"Đã về",ok:null,L:[`${a.nm} đã về.`],d:[]};return}
 const me=a.by==="me";const b=me&&typeof rsnap==="function"?rsnap():null;const s0=S.logSeq||0;let r=null;
 try{r=a.fz!=null&&typeof fzRun==="function"?fzRun(a.fz,null,()=>fn(a)):fn(a)}catch(e){ptErr("run "+a.kind,e)}
 if(!me)return;
 const n=Math.max(0,Math.min((S.logs||[]).length,(S.logSeq||0)-s0));const L=(S.logs||[]).slice(0,n).map(x=>typeof plain==="function"?plain(x):String(x).replace(/<[^>]*>/g,"")).map(x=>x.replace(/^T\d+\/\d+\s+\S+\s+tuần\s*/,"")).reverse();
 const d=[];try{if(b)for(const [k,nm] of RKEYS){const x=(S[k]||0)-(b[k]||0);if(x)d.push([nm,x])}if(b&&S.maid&&S.maid.loyal!==b.maid)d.push(["Thiện cảm của cung nữ",S.maid.loyal-b.maid])}catch(e){}
 const ok=r&&typeof r==="object"&&"ok" in r?r.ok:(r===false?false:r===true?true:window.__lastOk!=null?!!window.__lastOk:null);
 a.rep={t:(r&&r.t)||a.lbl||"Tin báo",ok,L:L.length?L:[(r&&r.txt)||`${a.nm} đã về.`],d};
 try{if(typeof window.kitNoticeDrop==="function")window.kitNoticeDrop("pt:go:"+a.id)}catch(e){}
 ptNote({id:"pt:back:"+a.id,line:`${a.nm} đã về: có tin báo.`,text:`${a.rep.t}${ok===true?" · thành":ok===false?" · hỏng":""}. ${a.rep.L.join(" ")}`.trim(),go:ptOpenTin,goLabel:"Xem tin"})}
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
/* ---------- the ONE «tin» panel (MAIN errand-scene jerr.js errIcon / errPanel owns it; FAIL 7 item 1) ----------
   jptime keeps only the READER API (PTIME.away / news / mine / orders / ordWhen / answer / waitOk / wait). It registers the kit status icon "tin"
   ONLY when MAIN's jerr (errIcon) is not in the build, ONCE at boot (never on render), so it can never overwrite MAIN's panel. The fallback panel
   is a kit info panel spec (kitPanel facts + opts, §77.1 / §9), the same shape as jerr's errPanel. */
function ptOrdN(){return S&&Array.isArray(S.ordQ)?S.ordQ.length:0}
/* jerr runs inside an IIFE (errIcon is private): its exported state window.ERR marks it in the build */
function ptErrOwn(){try{return typeof errIcon==="function"||!!(window.ERR&&typeof window.ERR==="object")||(!ptIconSet&&typeof kitStatusIcon!=="undefined"&&typeof kitStatusIcon.has==="function"&&kitStatusIcon.has("tin"))}catch(e){return false}}
function ptPanel(){const N=ptNews(),W=ptMine();const facts=[];const OQ=S&&Array.isArray(S.ordQ)?S.ordQ.slice():[];let subj=null;
 for(const o of OQ)facts.push(`${o.byNm} ${ptOrdIs(o)?"có lệnh cho ngươi":"có lời nhờ"}${o.title&&!/^Lệnh của /.test(o.title)?": "+o.title:""}, trả lời trước ${ptWhen(o.due)}; quá hạn coi như từ chối.`);
 for(const a of N){const r=a.rep||{};if(!subj)subj=ptPerson(a.a||{});facts.push(`${r.t||a.nm+" đã về"}${r.ok===true?" · thành":r.ok===false?" · hỏng":""}.`);
  if((r.d||[]).length&&typeof kitChips==="function")facts.push({text:"Được · mất: "+kitChips(r.d),kind:"me"});(r.L||[]).forEach(l=>facts.push(l));a.read=1}
 for(const a of W){if(!subj)subj=ptPerson(a.a||{});facts.push(`${a.nm} đang ${a.lbl||"đi việc"} · về ${ptWhen(a.due)}.`)}
 if(!facts.length)facts.push("Không có ai đang đi việc.");
 if(!subj&&OQ.length)try{subj=typeof isSrv==="function"&&isSrv()?srvM():null}catch(e){}
 const opts=OQ.map(o=>({n:ptOrdIs(o)?"Nghe lệnh":"Xem lời nhờ",x:`kèm: trả lời trước ${ptWhen(o.due)}, quá hạn coi như từ chối`,fx:{},go:()=>{setTimeout(()=>ptOrdOpen(o),0)}}));
 if(ptWaitOk()){const K=ptNext();opts.push({n:"Đợi tin",x:`tốn: ${Math.max(1,K-ptNow())} khắc (ngồi chờ đến ${ptWhen(K)}) · thành: biết tin khi người được sai trở về`,fx:{},go:()=>{setTimeout(()=>ptWait(),0)}})}
 const sp={title:OQ.length?"Lệnh và tin chờ":"Tin chờ người sai đi",facts,opts};
 /* the subject = the person the panel is about (away / back / the master who gave the order), never an unrelated figure */
 try{if(subj&&typeof kitFace==="function"){const fc=kitFace(subj);if(fc)sp.subject=fc}}catch(e){}return sp}
let ptIconSet=false;
function ptIconReg(){if(ptIconSet||ptErrOwn()||typeof kitStatusIcon==="undefined")return;ptIconSet=true;
 kitStatusIcon.set("tin",{title:"Người được sai đi",glyph:"信",order:30,
  show:()=>!!(S&&!S.dead&&(ptMine().length||ptNews().length||ptOrdN())),busy:()=>!!(S&&ptMine().length&&!ptNews().length&&!ptOrdN()),badge:()=>!!(S&&(ptNews().length||ptOrdN())),panel:ptPanel})}
/* after a state change: MAIN's icon refreshes itself (errIcon), else the fallback one; no re-registration */
function ptIcon(){try{if(ptErrOwn()){if(typeof errIcon==="function")errIcon();else if(typeof kitStatusIcon!=="undefined")kitStatusIcon.refresh();return}ptIconReg();if(typeof kitStatusIcon!=="undefined")kitStatusIcon.refresh()}catch(e){ptErr("icon",e)}}
setTimeout(()=>{try{ptIconReg()}catch(e){ptErr("iconReg",e)}},0);
/* ---------- the ledger: a person away is away (law 6b) ---------- */
function ptLedger(){if(!S||typeof j95on!=="function"||!j95on())return false;const R=S.roster;if(!R||!R.P)return false;const kh=ptKH(),b0=bid()*kh;let ch=false;
 for(const a of ptZ()){if(a.back||!R.P[a.who])continue;const e=R.P[a.who];
  /* ONE ROW SHAPE with MAIN's errand scene (jerr errLedger, fixer #6): a person of HERS keeps her slot (the place her day put her) with the activity
     "errand" — the stage keeps her token (hidden + the kit chip «đang đi …») so she is SEEN walking off and back (OD 18/11 ~20:05Z); she is still busy
     (j95sBusy "errand"), never followed nor sent again, and the target stays in the row. NPC senders keep the target place (their stage is not hers). */
  const mine=a.by==="me";
  for(let i=0;i<e.length;i++){const K=b0+i;if(K>=a.t0&&K<a.due){const why=`${mine?"ngươi":a.byNm||"chủ"} sai ${a.lbl||"đi việc"}`;if(mine&&(!a.mpl||a.mpl.b!==b0))a.mpl={b:b0,k:(e[i]&&e[i][0])||J95OUT_};/* round 4: one place for the whole window of this buổi (her slot when it began) — a later slot repaint never makes her jump while away */let x=[mine?a.mpl.k:(a.place||e[i][0]),"errand",a.tgt||null,why];
    /* NPC senders: her road there / back inside the window (jwalk walkErrRow, review/jagday-walk; n includes the walk, OD 18/11 ~20:00Z) */if(!mine&&typeof walkErrRow==="function")x=walkErrRow(e,b0,a,i,x[0],x);
    if(!e[i]||e[i][0]!==x[0]||e[i][1]!==x[1]||e[i][3]!==x[3]){e[i]=x;ch=true}}}}
 if(ch)try{const k=j95kh();S.where=j95view(R,k);R.m[k]=j95counts(R,k);if(typeof j95stage==="function")j95stage(R,k)}catch(e){ptErr("view",e)}
 return ch}
/* ---------- wiring: the clock ---------- */
(function(){try{
 const sp0=spend;spend=function(){const r=sp0.apply(this,arguments);try{if(ptOn())ptTick()}catch(e){ptErr("spend",e)}return r};
 if(typeof nextBuoi==="function"){const nb0=nextBuoi;nextBuoi=function(){const r=nb0.apply(this,arguments);try{if(ptOn()){ptTick();ptLedger()}}catch(e){ptErr("buoi",e)}return r}}
 if(typeof j95sync==="function"){const js0=j95sync;j95sync=function(){const r=js0.apply(this,arguments);try{if(ptOn()&&ptZ().length)ptLedger()}catch(e){ptErr("j95sync",e)}return r}}
}catch(e){ptErr("wire",e)}})();
window.PTIME={on:ptOn,now:ptNow,/* true while the core lands tasks (its runners call the game's own acts: no new send from them) */landing:()=>ptBusyTick||!!PT.landing,row:ptRow,away:ptAwayOf,busy:ptBusy,lockWhy:ptLockWhy,send:ptSend,tick:ptTick,wait:ptWait,waitOk:ptWaitOk,next:ptNext,news:ptNews,mine:ptMine,when:ptWhen,reg:ptReg,x:ptX,stat:PT.stat,
 /* receiver side (OD 18/11 ~21:15Z): orders to her waiting as notices — for the ONE «tin» panel (MAIN errand-scene r2 lists them; no second panel):
    orders() = [{id, pid, byNm, title, due}], ordWhen(o) = "trả lời trước …", answer(id) = open its answer card (4 answers; Việc chủ sai 3) */
 orders:()=>(S&&Array.isArray(S.ordQ)?S.ordQ.map(o=>({id:o.id,pid:o.pid,byNm:o.byNm,title:o.title,due:o.due})):[]),ordWhen:o=>`trả lời trước ${ptWhen(o.due)}`,
 answer:id=>{const o=S&&Array.isArray(S.ordQ)&&S.ordQ.find(x=>x.id===id);if(o)ptOrdOpen(o);return !!o}};
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
 /* two-way: the guest answers with the SAME 4 answers as every receiver (receiver-choice jrcv rcvInviteGo, guarded) */if(typeof rcvInviteGo==="function"?rcvInviteGo(S,v):roll(a.a.o)){try{S.where[v.id]="home";seeLoc(v,"home");const R=S.roster;if(R&&R.P&&R.P["v"+v.id]&&typeof j95kh==="function"){for(let i=j95kh();i<R.P["v"+v.id].length;i++)R.P["v"+v.id][i]=[S.out?"lc":"home","visit","me","nhận lời mời sang chơi"];iwBind("v"+v.id,j95kh());if(typeof j95sync==="function")j95sync()}}catch(e){ptErr("inviteLand",e)}
  log(`${v.name} nhận lời, sang cung ngươi.`);return{ok:true,t:`${nm} mời ${v.name} trở về`}}
 relAdd(S,v,BAL.eff.j21.top);log(`${v.name} từ chối lời mời.`);return{ok:false,t:`${nm} mời ${v.name} trở về`}});
/* ---- 4b. HOST-ABSENT RULE (owner OD L1976, 19/11 ~22:00Z) — every invitation, every direction (law 1):
   her invite (j21 / runner above), an NPC host inviting HER (AG cx3:invite2 → rcvAsk), NPC ↔ NPC (p3InvLand). ONE entry: rcvInvAt(h,g), the place
   where every accepted guest is put at the host's place (jrcv). If the host is not there when the guest arrives:
   (1) the guest WAITS at the host's place; never leaves in the khắc she arrives;
   (2) from the NEXT khắc, once per khắc while the host is still away, the guest decides stay / leave AT that khắc (BAL.invite.wait; a host who walks in
       on that same khắc meets her only if she stayed);
   (3) leave → relation loss (BAL.invite.wait.loss), notice «<name> sang chơi không gặp, đã ra về» (kitNotice, via ptNote) when the host is her, and the guest's
       roster rows show the walk back (law 6b);
   (5) host back in time → the visit happens as before (nothing else changes).
   SHE as the guest (an NPC host away): she is a player, she decides herself: she waits by staying there; walking off before the host is back = leaving
   (same loss). ONE STATE S.invW = [{id, g, h, k, t (arrival khắc, null = she is still on the way), last (last decided khắc), b (buổi)}].
   The draw is a hash of (task, khắc), not Math.random: co-op seats and reloads get the same answer, and no other roll moves. ---- */
function iwZ(){if(!S)return[];if(!Array.isArray(S.invW))S.invW=[];return S.invW}
function iwId(p){return p===S?"me":p&&p.id!=null?"v"+p.id:null}
function iwP(id){if(id==="me")return S;try{return RV(+String(id).slice(1))}catch(e){return null}}
let iwDest=null,iwRoad=0;/* while she walks (goTo spends the walk before S.place moves) she is already gone from where she was */
/* where SHE stands for this rule (OD L1976 «tôi bấm về nhà là tốn một khắc, khắc thứ tư tôi đã ở nhà»): she leaves a place at the khắc she taps
   (walking off = no longer there) and is at the new place only once the walk is paid. null = on the road: the moment she taps (iwRoad, before
   any khắc of the walk passes) and the whole of a walk that runs on into the next buổi (j9 walkSpill, until it lands) */
function iwSpillOn(){const W=window.__walkSpill;return !!(W&&S&&W.from===S.place&&W.k!==S.place)}
function iwMe(){if(S.out)return"lc";if(iwRoad)return null;if(iwDest!=null)return iwDest;if(iwSpillOn())return null;return S.place}
function iwHere(p,k){if(!p)return false;if(p===S)return iwMe()===k;try{const R=S.roster,i=ptNow()-bid()*ptKH(),e=R&&R.P&&R.P["v"+p.id];if(e&&e[i]&&e[i][0]!=null)return e[i][0]===k&&e[i][1]!=="back"}catch(e){}return !!(S.where&&S.where[p.id]===k)}
/* the guest's odds of staying one more khắc (law 4: every number from BAL; law 7: shown only as a ladder word) */
function iwStayO(g,h){const W=BAL.invite.wait;let n=0;try{n=tv(W.net,g,0)}catch(e){}return od(W.o+aff(g,h)/W.affD+(rkOf(h)-rkOf(g))*W.rk+n)}
function iwDraw(w,K){const s=w.id+"|"+K;let x=2166136261;for(let i=0;i<s.length;i++){x^=s.charCodeAt(i);x=Math.imul(x,16777619)>>>0}return x%100}
/* law 6b (one person, one place): an accepted invitation BINDS the guest's rows of this buổi the way a told text does — jagent agBound (read by
   every deed placer: agReapply, jagday span / slot / go rows) also answers true for them, so a deed planned earlier no longer puts her back at
   the deed's place while S.invW / the roster has her at the host's palace (WALK-COST #4: «cx2:fert» re-applied over a waiting guest → seen at
   Thái y viện). Own list (not J95B.bind: j95b counts its text binds there). */
const IWB=[];
function iwBind(id,from,to){try{const R=S.roster,e=R&&R.P&&R.P[id];if(!e)return;const t=to==null?e.length-1:Math.min(to,e.length-1);for(let i=Math.max(0,from);i<=t;i++){const b=id+"|"+i+"|"+R.key;if(IWB.indexOf(b)<0)IWB.push(b)}if(IWB.length>200)IWB.splice(0,IWB.length-200)}catch(e){ptErr("iwBind",e)}}
/* review walk-cost r4: the bind lasts only while the invitation holds — when the guest leaves, only her walk-back khắc stays bound; the rest of the
   buổi is hers again (a deed may be planned / re-applied there), never a «stay» row nobody can move */
function iwUnbind(id,from){try{const R=S.roster;if(!R)return;for(let j=IWB.length-1;j>=0;j--){const x=IWB[j].split("|");if(x[0]===id&&x[2]===String(R.key)&&+x[1]>=from)IWB.splice(j,1)}}catch(e){ptErr("iwUnbind",e)}}
(function(){if(typeof start==="function"){const st0=start;start=function(){IWB.length=0;return st0.apply(this,arguments)}}/* a new life starts with no binds (as J95B.bind) */
if(typeof agBound!=="function")return;const f0=agBound;agBound=function(id,kh,key){return f0.apply(this,arguments)||IWB.indexOf(id+"|"+kh+"|"+key)>=0}})();
/* the guest's rows of this buổi: waiting at the host's place / walking back home */
function iwRows(g,from,row,rest){try{const R=S.roster,e=R&&R.P&&R.P["v"+g.id];if(!e)return;const i0=Math.max(0,from-bid()*ptKH());for(let i=i0;i<e.length;i++)e[i]=i===i0?row:(rest||row);if(rest){iwUnbind("v"+g.id,i0);iwBind("v"+g.id,i0,i0)}else iwBind("v"+g.id,i0);
  const k=j95kh();S.where=j95view(R,k);R.m[k]=j95counts(R,k);if(typeof j95stage==="function")j95stage(R,k)}catch(e){ptErr("iwRows",e)}}
/* a co-op friend seat (rival entry coop:true, jcoopworld) is a PLAYER, never rolled as an NPC: on her side of the visit the rule does not run (review FAIL 1) */
function iwCoop(p){return !!(p&&p!==S&&p.coop)}
function iwAdd(h,g){if(!S||!h||!g||h===g||iwCoop(h)||iwCoop(g))return null;const k=h===S?(S.out?"lc":"home"):palaceOf(h);
 if(g!==S&&iwHere(h,k))return null;/* (5) the host is there: the visit happens as before */
 /* arrival = the due khắc of the landing task (a 2-khắc walk of hers lands it one khắc late on her clock) */const now=Math.min(ptNow(),PT.iwDue!=null?PT.iwDue:1e9),gi=iwId(g),hi=iwId(h);const Z=iwZ();for(let i=Z.length-1;i>=0;i--)if(Z[i].g===gi)Z.splice(i,1);
 const w={id:"iw"+now+"-"+gi+"-"+hi,g:gi,h:hi,k,t:g===S?null:now,last:now,b:bid()};Z.push(w);
 if(g!==S&&h!==S)iwRows(g,now,[k,"visit",hi,"sang chơi, chờ chủ nhà về"]);return w}
function iwLeave(w,K,why){const g=iwP(w.g),h=iwP(w.h);if(!g||!h)return;PT.stat.iwLast={g:w.g,h:w.h,t:w.t,K,why:why||"khac"};try{relAdd(h,g,BAL.invite.wait.loss)}catch(e){ptErr("iwLoss",e)}
 if(g===S){log(`Ngươi sang cung ${h.name} chơi không gặp, đã ra về.`);return}
 if(why!=="buoi")iwRows(g,K,[palaceOf(g),"back",null,"sang chơi không gặp chủ nhà, ra về"],[palaceOf(g),"stay",null,"về cung"]);
 if(h===S){const line=`${g.name} sang chơi không gặp, đã ra về.`;log(line);ptNote({id:"iw:"+w.id,line})}
 else try{if(typeof newsAdd==="function")newsAdd(g,"invite",`${g.name} sang cung ${h.name} chơi không gặp, đã ra về`,false)}catch(e){}}
let iwBusy=false;
function iwTick(){if(iwBusy||!S||S.dead||!Array.isArray(S.invW)||!S.invW.length)return;iwBusy=true;try{const now=ptNow(),b=bid();
 for(const w of S.invW.slice()){const g=iwP(w.g),h=iwP(w.h);const drop=r=>{const i=S.invW.indexOf(w);if(i>=0)S.invW.splice(i,1);PT.stat.iwDrop=r||"?"};
  if(!g||!h||iwCoop(g)||iwCoop(h)||g.alive===false||h.alive===false||g.out||(g!==S&&g.confined)){drop("gone");continue}
  if(w.b!==b){/* the buổi ended and the host never came */if(w.t!=null)iwLeave(w,now,"buoi");drop("buoi");continue}
  if(g===S){/* SHE is the guest: arrival when she stands there; host there = visit; walking off first = leaving */
   const at=iwMe()===w.k;if(w.t==null){if(at){w.t=now;w.last=now}else continue}
   if(at&&iwHere(h,w.k)){PT.stat.iwMet=(PT.stat.iwMet||0)+1;drop();continue}if(!at){iwLeave(w,now);drop("walked")}continue}
  /* an NPC guest: one decision per khắc after the arrival khắc, taken AT that khắc */
  /* the last khắc of the buổi is the last decision; the buổi end itself is handled above */const end=Math.min(now,b*ptKH()+ptKH()-1);let done=false;for(let K=w.last+1;K<=end&&!done;K++){w.last=K;
   if(iwDraw(w,K)>=iwStayO(g,h)){iwLeave(w,K);drop();done=true;break}
   if(K===end&&iwHere(h,w.k)){PT.stat.iwMet=(PT.stat.iwMet||0)+1;drop();done=true}}
  if(!done&&w.last>=end&&iwHere(h,w.k)){PT.stat.iwMet=(PT.stat.iwMet||0)+1;drop()}}}
 catch(e){ptErr("iwTick",e)}finally{iwBusy=false}}
(function(){try{
 if(typeof rcvInvAt==="function"){const a0=rcvInvAt;rcvInvAt=function(h,g){const r=a0.apply(this,arguments);try{iwAdd(h,g)}catch(e){ptErr("iwAdd",e)}return r};window.rcvInvAt=rcvInvAt}
 const l1=ptLand;ptLand=function(a){const d0=PT.iwDue;PT.iwDue=a&&a.due;try{return l1.apply(this,arguments)}finally{PT.iwDue=d0}};
 const sp1=spend;spend=function(){/* the first khắc of her walk: she has left the place she tapped away from AT the tap khắc (a guest of hers
   leaves with the loss then; a host coming back during her walk no longer meets her there) — before any khắc passes */
  if((iwDest!=null&&iwDest!==S.place)||iwSpillOn()){iwRoad=1;try{iwTick()}finally{iwRoad=0}}const r=sp1.apply(this,arguments);iwTick();return r};
 const g1=goTo;goTo=function(k){const d0=iwDest;iwDest=k;let r;try{r=g1.apply(this,arguments)}finally{iwDest=d0}iwTick();return r};
 if(typeof nextBuoi==="function"){const nb1=nextBuoi;nextBuoi=function(){iwTick();const old=iwZ().slice();const r=nb1.apply(this,arguments);/* a guest placed while the new buổi was drawn (j21 placeWhere) belongs to the new buổi */
  try{const now=ptNow();for(const w of iwZ())if(!old.includes(w)){w.b=bid();w.last=now;if(w.t!=null)w.t=now}}catch(e){ptErr("iw buoi",e)}iwTick();return r}}
}catch(e){ptErr("iw wire",e)}})();
window.PTIME_IW={z:iwZ,tick:iwTick,stayO:iwStayO,draw:iwDraw,add:iwAdd};
/* ---- 5. TWO-WAY: NPC senders obey the same rule (AG deeds through AGRUN: the NPC pays her deed's khắc, the person sent is away n khắc,
   the deed lands at the due khắc with the same function, odds and news as before) ---- */
const PT_NPC={"cx2:maidSpy":{kind:"spy",who:v=>v&&v.maid&&v.maid.name?{id:"mm:"+v.id,nm:v.maid.name}:null,lbl:t=>`đi dò la ${t&&t.name?t.name:""}`.trim()}};
function ptNpcWire(){if(typeof AGRUN==="undefined")return;for(const k in PT_NPC){const f0=AGRUN[k];if(!f0||f0.__pt)continue;const D=PT_NPC[k];
 const f=function(v,t,pd){if(!ptOn()||PT.landing||!v||v===S||v.coop)return f0.apply(this,arguments);const w=D.who(v);if(!w)return f0.apply(this,arguments);
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
(function(){try{const b0=PEND.giftpick;if(!b0)return;PEND.giftpick=function(p){const d=b0.apply(this,arguments);try{if(!d||!ptOn()||p.v==null)return d;const v=RV(p.v);if(!v||v.coop/* the co-op friend: ONE path for gifts between the two players = the ASK act (she answers first, no servant), as the co-op giftin above (coop-ptime-reds) */||together(S,v))return d;const s=bestSent(S);
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
/* =============================== RECEIVER SIDE (owner OD 18/11 ~21:15Z = CANON OVERWRITE of the 20:35Z «Đi»-only; law 1 two-way + law 3) ===============================
   No forced act for anyone. An order to her (maid road: her master's dò la / bùa ngải / bỏ độc order, j42 srvOrder → PEND.cnvOrd; «Việc chủ sai»,
   j42 srvErrPick) never interrupts what she is doing: it waits as a NOTICE (S.ordQ; kitNotice via ptNote + the «信» status icon) and she answers it from the
   panel when her own act ends (khắc boundary, her choice when). Unanswered past BAL.ptime.ansK khắc = «Từ chối» with its cost.
   The answers are the SAME 4 of OD L1876, built ONCE in j42 cnvOrdOpts (an NPC servant ordered by its master picks among the same 4 in
   jagstf2 stf2Ord by lòng × nết × tâm cơ): Giúp hết lòng (n khắc incl. the walk, odds o) · Giúp qua loa (n − 1 khắc, odds o − BAL.road.hp.half,
   ordHalf) · Từ chối (cnvOrdOpts: Chủ tin −10/−15, maybe quỳ phạt) · Mách lẻo (cnvOrdOpts tell). «Việc chủ sai» is a harmless errand: no one
   to tell on, so 3 answers. Each row shows the SAME n / gain / loss as the sender's card (ptRecvRow). She really walks on Dư đồ (srvGoTo). */
/* shown = charged (FAIL 7 item 3): her total = the REAL walk to the place (j9 travel, BAL.walk.near / far, as srvGoTo pays it) + the task
   (BAL.ptime.kinds[kind].n − BAL.walk.near: n counts a near walk); «Giúp qua loa» = the same walk + one khắc less of task. All paid through spend. */
function ptRecvWalk(k){try{const m=srvM();if(m&&k===palaceOf(m))k="home";if(k==="home"||k===S.place)return 0;const from=S.place==="home"&&m?palaceOf(m):S.place;return travel(from,k)}catch(e){return BAL.walk.near}}
/* FAIL 4 item 2 (law 3: time is the cost; law 2): «Giúp hết lòng» = the real walk + the task, never less than the order's own n (n counts a near
   walk, so at walk 0 — her master's palace or where she stands — it is n, the same n the sender's card shows, law 1); «Giúp qua loa» = one khắc
   less, never under BAL.ptime.taskMin. So qua loa is always exactly one khắc cheaper (never equal = never a worse-only road) and never free. */
function ptRecvN(k,kind,half){const P=BAL.ptime,n=ptRow(kind).n;const full=Math.max(n,P.taskMin+1,ptRecvWalk(k)+n-BAL.walk.near);return half?Math.max(P.taskMin,full-1):full}
function ptRecvGo(k,kind,run,half){const N=ptRecvN(k,kind,half),t0=ptNow();let ok=true;try{ok=srvGoTo(k)!==false}catch(e){ok=false}
 /* shown = charged: the walk srvGoTo paid + the rest of the shown total */
 if(!ok)return false;const rest=Math.max(0,N-(ptNow()-t0));if(rest)spend(rest);
 try{run()}catch(e){ptErr("recv "+kind,e)}try{render()}catch(e){}return true}
function ptRecvRow(kind,o,gain,loss,n){return[o!=null&&o<100?word(o):"",`tốn: ${n} khắc (cả đường đi)`,gain?"thành: "+gain:"",loss?"hỏng: "+loss:""].filter(Boolean).join(" · ")}
/* ---- the notice queue ---- */
function ptOrdQ(){if(!S)return[];if(!Array.isArray(S.ordQ))S.ordQ=[];return S.ordQ}
function ptOrdAdd(pid,pp,title,m){if(!S)return null;const Z=ptOrdQ();if(pid==="err"&&Z.some(o=>o.pid==="err"))return null;const now=ptNow();
 const o={id:++PT.seq+"-o"+now,pid,pp:pp||{},title:title||"",byNm:m&&m.name||"Chủ",t0:now,due:now+BAL.ptime.ansK};Z.push(o);PT.stat.ord=(PT.stat.ord||0)+1;
 ptOrdNote(o);ptIcon();return o}
function ptOrdNote(o,again){ptNote({id:"pt:ord:"+o.id,line:`${again?"Chưa đi được: ":""}${ptOrdIs(o)?`${o.byNm} cho gọi ngươi: có lệnh`:`${o.byNm} sai người sang: ${o.title||"có lời nhờ"}`}, trả lời trước ${ptWhen(o.due)}.`,go:()=>{const x=ptOrdQ().find(z=>z.id===o.id);if(x)setTimeout(()=>ptOrdOpen(x),0)},goLabel:ptOrdIs(o)?"Nghe lệnh":"Xem lời nhờ"})}
/* a master's order (cnvOrd, Việc chủ sai) vs a request / invitation from another person (receiver-choice jrcv: rcvHelp, rcvAsk …): only the words differ */
function ptOrdIs(o){return o&&(o.pid==="cnvOrd"||o.pid==="err")}
function ptOrdDrop(o){if(S&&Array.isArray(S.ordQ))S.ordQ=S.ordQ.filter(x=>x!==o&&x.id!==o.id);try{if(typeof window.kitNoticeDrop==="function")window.kitNoticeDrop("pt:ord:"+o.id)}catch(e){}}
/* the answer card of one order: {t, who, o:[{n, fx, x, go}]}. The order passed the world gate (j95b mkP) when it was given, so it is rebuilt
   as it was (as a save load does: no re-pick, none dropped) and the deadline's «Từ chối» always has its cost. */
function ptOrdMk(o){const d=PEND[o.pid]&&PEND[o.pid](o.pp||{});if(d){d.pid=o.pid;d.pp=o.pp||{}}return d}
function ptOrdCard(o){if(o.pid==="err")return ptErrCard();PT.landing=1;try{return ptOrdMk(o)}catch(e){ptErr("ordCard",e);return null}finally{PT.landing=0}}
function ptOrdOpen(o){ptOrdDrop(o);PT.landing=1;try{if(o.pid==="err"){const d=ptErrCard();if(d){Q.push({t:"Việc chủ sai",who:d.who,h:d.t,opts:d.o})}}
  else{PT.opening=o;let d=null;try{d=ptOrdMk(o)}finally{PT.opening=null}if(d)pushDil(d,o.title);else log("Lệnh ấy không còn nữa (người trong lệnh đã khác).")}}catch(e){ptErr("ordOpen",e)}finally{PT.landing=0}
 try{showModal()}catch(e){}ptIcon();try{render()}catch(e){}}
/* past the deadline, unanswered = «Từ chối» with its cost (the same option, its fx then its go) */
function ptOrdTick(){if(!S||S.dead||!Array.isArray(S.ordQ)||!S.ordQ.length)return;const now=ptNow();
 for(const o of S.ordQ.slice()){if(now<o.due)continue;ptOrdDrop(o);let d=null;try{d=ptOrdCard(o)}catch(e){}const op=d&&d.o&&d.o.find(x=>x.n==="Từ chối");
  log(`<span class="r">${ptOrdIs(o)?`Ngươi không đến nghe lệnh của ${o.byNm}`:`Ngươi để lời của ${o.byNm} quá hạn không đáp`}: coi như từ chối.</span>`);PT.stat.ordLate=(PT.stat.ordLate||0)+1;
  if(op){PT.landing=1;try{if(op.fx&&Object.keys(op.fx).length)apply(op.fx);if(op.go)op.go()}catch(e){ptErr("ordLate",e)}finally{PT.landing=0}}}
 ptIcon()}
/* her master's order (j42 srvOrder → pushDil(mkP("cnvOrd"))): a notice, not a pop-up */
(function(){try{const p0=pushDil;pushDil=function(d,title){try{if(ptOn()&&!PT.landing&&d&&d.pid==="cnvOrd"&&typeof isSrv==="function"&&isSrv()){ptOrdAdd("cnvOrd",d.pp,title,srvM());return""}}catch(e){ptErr("ord wire",e)}return p0.apply(this,arguments)};window.pushDil=pushDil}catch(e){ptErr("ord pushDil wire",e)}})();
/* (a) the order card: dò la (the mirror of the consort's "Sai đi dò la": jwhy spyRoll, j78 evN, jwhy loyalSpyMaidRun, j78 oán) · bùa ngải · bỏ độc (j42 srvDoOrder) */
(function(){try{const c0=PEND.cnvOrd;if(!c0)return;PEND.cnvOrd=function(pp){if(!ptOn()||!pp)return c0.apply(this,arguments);const m=srvM(),t=RV(pp.t);if(!isSrv()||!m||!t||!t.alive||t.out)return null;
  const k=pp.k,kind=k==="spy"?"spy":k==="plant"?"plant":"harm",H=BAL.road.hp.half,pl=palaceOf(t);let o,deed,gain,loss,say;
  if(k==="spy"){o=spyRoll(m,t,knMeAg());const L=BAL.eff.jwhy.loyalSpyMaidRun,F=BAL.eff.j78.j78maidFail,E=BAL.eff.j78.evN;say=`dò la cung ${t.name}, xem nàng gặp ai, nói gì`;
   gain=`${m.name} nắm ${balSg(E)} chứng cứ của ${t.name} nếu nàng từng làm điều sai · ngươi công lao +${srvOrdMerit()}`;loss=`Chủ tin -${balAb(L)} (hoảng sợ), ${t.name} đoán ra: oán ${m.name} ${balSg(F)}`;
   deed=oo=>{if(roll(oo)){const n=evA(m,t,E);srvMerit(srvOrdMerit());log(n?`Ngươi dò la được chuyện của ${t.name}, về bẩm ${m.name}: chủ nắm thêm ${balAb(E)} chứng cứ.`:`Ngươi dò la ${t.name}: không tìm ra điều gì sai trái.`)}
    else{apply({tin:-L});oanAdd(t,m,F);log(`<span class="r">Ngươi nấp nghe ngoài cửa sổ cung ${t.name} thì bị bắt gặp, hoảng sợ chạy về.</span> Chủ tin -${balAb(L)}.`)}}}
  else{o=ordOdds(k);deed=()=>srvDoOrder(k,t);const R=ordRow(k,t);say=R.say;gain=R.gain;loss=R.loss}
  const oq=PT.opening||null,go=(run,half)=>ptOrdGo(pl,kind,run,half,oq,pp,m);
  const O=cnvOrdOpts(S,m,t,()=>go(()=>deed(o),0));O[0].x=ptRecvRow(kind,o,gain,loss,ptRecvN(pl,kind,0));
  const hf=O.find(x=>x.id==="half");if(hf){const oh=oddsCl(o-H);hf.x=ptRecvRow(kind,oh,gain,loss,ptRecvN(pl,kind,1));hf.go=()=>go(()=>ordHalf(()=>deed(oh)),1)}
  return{t:`<p>${m.name} gọi ngươi vào phòng trong, đóng cửa: “Ngươi đi ${say}.”</p>${k==="spy"?"":`<p class="past">Kẻ hầu nào làm cũng một luật: hỏng thì nửa phần bị bắt; bị bắt thì 3 phần bị đánh chết ở Thận Hình ti, hoặc phải khai ra chủ.</p>`}`,who:pv(m),o:cnvPend(S,O)}};
 }catch(e){ptErr("cnvOrd wire",e)}})();
/* FAIL 4 item 1: the master's order IS her pass to that palace (j41 accGrant: "a pass for this buổi … accepted request"; j42 placeEnterHook reads
   accHas → "có lệnh"), granted before the walk, as ptErrGo marks S.srv.sent for «Việc chủ sai». If the walk still fails (hour, day, Tân Giả khố)
   the order is NOT used up: it goes back to S.ordQ with its own deadline (as ptErrGo keeps er.acc = 0) and the notice says so. Whole group: every
   cnvOrd kind (dò la / bùa ngải / bỏ độc) runs through here. */
function ptOrdGo(pl,kind,run,half,oq,pp,m){const had=!!(typeof accHas==="function"&&accHas(S,pl));try{if(typeof accGrant==="function"&&pl)accGrant(S,pl)}catch(e){ptErr("ordPass",e)}
 if(ptRecvGo(pl,kind,run,half))return true;
 /* not gone: the pass goes with the unused order */if(!had&&S.acPass)delete S.acPass[pl];
 let o=oq;if(o&&!ptOrdQ().some(x=>x.id===o.id))ptOrdQ().push(o);else if(!o)o=ptOrdAdd("cnvOrd",pp,"",m);
 if(o&&oq)ptOrdNote(o,true);ptIcon();return false}
/* (b) «Việc chủ sai» (j42 srvErrPick: lấy thuốc, hái hoa, mang canh, mang kinh, mang quà): the notice when the master gives it; 3 answers */
function ptErrKind(er){return er&&er.v!=null?"gift":"errand"}
function ptErrGo(er,kind,half){er.acc=1;S.srv.sent={k:er.k,n:er.n,until:bid(),done:0,v:er.v||null};
 if(!ptRecvGo(er.k,kind,()=>{const r=srvErrandDone();if(r)log(r)},half)){/* the place is shut right now: the order stays on her Phận sự list */er.acc=0}}
function ptErrCard(){if(!isSrv()||!S.srv)return null;const er=S.srv.err;if(!er||er.none||er.acc)return null;const m=srvM();if(!m)return null;const kind=ptErrKind(er),X=BAL.eff.j42.srvErrandDone_2,P=BAL.ptime;
 const nv=er.v!=null?` · ${m.name} thêm thân với người nhận quà`:"";
 return{t:`<p>${m.name} sai ngươi: ${er.n}.</p><p class="past">Việc vô hại, không có gì để mách lẻo.</p>`,who:pv(m),o:[
  {n:"Giúp hết lòng",fx:{},x:ptRecvRow(kind,null,`công lao +${X}${nv}`,"",ptRecvN(er.k,kind,0)),go:()=>ptErrGo(er,kind,0)},
  {n:"Giúp qua loa",fx:{tin:-P.errHalfTin},x:ptRecvRow(kind,null,`công lao +${X}${nv}`,"",ptRecvN(er.k,kind,1)),go:()=>ptErrGo(er,kind,1)},
  {n:"Từ chối",fx:{tin:-P.errRefuse},x:"không tốn khắc",go:()=>{er.none=1;log(`Ngươi thoái thác việc ${m.name} sai.`)}}]}}
function ptErrFrame(){if(!ptOn()||!isSrv()||!S.srv||S.dead)return false;const er=S.srv.err;if(!er||er.none||er.acc||er.pop)return false;const m=srvM();if(!m)return false;er.pop=1;return !!ptOrdAdd("err",{},"Việc chủ sai",m)}
(function(){try{if(typeof srvCards!=="function")return;const s0=srvCards;srvCards=function(){const X=s0.apply(this,arguments);try{if(ptOn()&&S.srv&&S.srv.err&&!S.srv.err.none&&!S.srv.err.acc){ptErrFrame();
   /* the Phận sự card opens the same answer card (one path) */const c=Array.isArray(X)&&X.find(x=>x&&x.n==="Việc chủ sai");if(c){c.k=0;c.x="trả lời lệnh chủ: giúp hết lòng · giúp qua loa · từ chối";c.go=()=>{const o=ptOrdQ().find(z=>z.pid==="err")||ptOrdAdd("err",{},"Việc chủ sai",srvM());if(o)setTimeout(()=>ptOrdOpen(o),0)}}}}catch(e){ptErr("srvCards",e)}return X}}catch(e){ptErr("srvCards wire",e)}})();
/* ---- 11. Sai cung nữ dò la khẩu vị (jrcp rcpAskQ maid): the same learn / loyalty rows at the due khắc ---- */
ptReg("taste",a=>{if(!S.maid)return{ok:null};let r=null;try{r=rcpPeople().find(x=>ledgerId(x)===a.a.rid)}catch(e){}if(!r){log(`${S.maid.name} trở về: không hỏi được người ấy.`);return{ok:null}}
 if(roll(a.a.o)){const u=rcpUnknown(r);if(u.length)log(rcpLearn(r,pick(u),`${S.maid.name} dò la`));return{ok:true,t:`${S.maid.name} dò la khẩu vị trở về`}}
 S.maid.loyal=cl((S.maid.loyal||0)-BAL.eff.jrcp.loyalGo_2,0,100);log(`${S.maid.name} dò la không ra gì, còn bị mắng.`);return{ok:false,t:`${S.maid.name} dò la khẩu vị trở về`}});
/* =============================== ROUND 2 (worker #2, Foreman D #3 rulings 18/11: (a) summons = sends, (c) NPC giftin / invite / shop = sends) ===============================
   The same adapter pattern: the button pays its order (BAL.ptime.kinds[kind].o), the person carrying it is away n khắc, the result at the due khắc. */
/* ---- 12. Sai <cung nữ> đi đòi (jstip, the monthly cắt xén card): the maid goes to Nội vụ phủ; she comes back with the goods (or scolded) ---- */
function ptGLite(G){return(G||[]).map(g=>({k:g.k,k0:g.k0,n0:g.n0,kem:g.kem,lost:g.lost,E:(g.E||[]).map(e=>S.inv.indexOf(e))}))}
function ptGBack(L){/* the real pieces again (law 6c): by index when it still holds that piece, else the first pieces of that kind */const used=new Set();
 return(L||[]).map(g=>{const E=[];for(const i of g.E||[]){let e=i>=0?S.inv[i]:null;if(!e||e.k!==g.k||used.has(e))e=S.inv.find(x=>x&&x.k===g.k&&!used.has(x))||null;if(e){used.add(e);E.push(e)}}return Object.assign({},g,{E})})}
(function(){try{if(typeof stipEvent!=="function")return;const s0=stipEvent;stipEvent=function(G,SK){const ev=s0.apply(this,arguments);try{if(!ptOn()||!ev||!Array.isArray(ev.opts)||!S.maid)return ev;const m=S.maid;
  ev.opts=ev.opts.map(o=>{if(!o||o.n!==`Sai ${m.name} đi đòi`)return o;const why=ptLockWhy("mm:me");
   return Object.assign({},o,{x:ptX("ask",o.x)},why?{lock:true,x:why,go:()=>{}}:{go:()=>{ptSend({who:"mm:me",nm:m.name,kind:"ask",place:"nvp",a:{G:ptGLite(G),bac:SK.bac||0,sup:SK.sup?key(SK.sup):null},lbl:"đến Nội vụ phủ đòi phần"});if(ptRow("ask").o)spend(ptRow("ask").o)}})})}catch(e){ptErr("stipEvent",e)}return ev}}catch(e){ptErr("stip wire",e)}})();
ptReg("ask",a=>{const m=S.maid;if(!m){return{ok:null}}const SK={bac:a.a.bac,sup:a.a.sup?byKey(a.a.sup):null};const od=stipAskOdds(m,SK);const eun=stipEunName();const st=stipSt(S);
 if(roll(od)){if(SK.bac)apply({bac:SK.bac});stipRestore(S,ptGBack(a.a.G));log(`${m.name} đến Nội vụ phủ đòi đủ phần. ${eun} đành ${SK.bac?"trả lại bạc và ":""}đổi đồ tốt.`);return{ok:true,t:`${m.name} đi đòi trở về`}}
 m.loyal=cl((m.loyal||0)-BAL.eff.jstip.loyalGo,0,100);st.spite=S.turn;log(`<span class="r">${m.name} bị ${eun} mắng đuổi về.</span> Thiện cảm của cung nữ -${balAb(BAL.eff.jstip.loyalGo)}.`);return{ok:false,t:`${m.name} đi đòi trở về`}});
/* ---- 13. Sai người mua lén ngoài cung (jveil PEND.vlout): the bạc is paid at the order (the card's fx), the person brings the veil at due ---- */
(function(){try{const v0=PEND.vlout;if(!v0)return;PEND.vlout=function(pp){const d=v0.apply(this,arguments);try{if(!d||!ptOn()||PT.landing)return d;const ag=vlAgent(S);if(!ag)return d;const id=ptPid(ag);const why=ptLockWhy(id);
  d.o=(d.o||[]).map(o=>{const m=o&&o.fx&&o.fx.bac<0?/^(.+?) · /.exec(o.n||""):null;const k=m?(vlOutList(S)||[]).find(x=>itm(x).n===m[1]):null;if(!k)return o;
   const j=String(o.j67||"").replace(/(\d+) khắc/,`${ptRow("vlbuy").o} khắc · ${ptWaitTxt("vlbuy")}`);
   return Object.assign({},o,{j67:j},why?{lock:true,j67:why,go:()=>{}}:{go:()=>{ptSend({who:id,nm:ag.name,kind:"vlbuy",place:typeof J95OUT_!=="undefined"?J95OUT_:null,a:{k,pr:vlOutPrice(k),sid:ag.sid!=null?ag.sid:null},lbl:`lén ra ngoài cung mua ${itm(k).n}`});if(ptRow("vlbuy").o)spend(ptRow("vlbuy").o)}})})}catch(e){ptErr("vlout",e)}return d}}catch(e){ptErr("vlout wire",e)}})();
ptReg("vlbuy",a=>{const ag=vlAgent(S);const k=a.a.k;if(!ag){apply({bac:a.a.pr});log("Người được sai mua mạng không trở về; bạc hoàn lại rương.");return{ok:null}}
 apply({bac:a.a.pr});/* the bạc was paid at the order: vlBuyOut pays it again, net once */const r=vlBuyOut(S,k);if(r)log(r);return{ok:!/lộ ra/.test(r||""),t:`${ag.name} mua mạng ngoài cung trở về`}});
/* ---- 14. Sai tai mắt dò bên chủ hội (jmkt tsMkScoutOpts): her runner goes (a real person), bạc at the order, the answer at due ---- */
(function(){try{if(typeof tsMkScoutOpts!=="function")return;const t0=tsMkScoutOpts;tsMkScoutOpts=function(th,mo){const L=t0.apply(this,arguments);try{if(!ptOn()||PT.landing||!Array.isArray(L))return L;
  return L.map(o=>{if(!o||o.n!=="Sai tai mắt dò bên chủ hội"||o.tsDis)return o;const r=ptRunner();if(!r)return Object.assign({},o,{lock:true,x:ptNoRunner(),go:()=>{}});const B=BAL.toil.taste.scout;
   return Object.assign({},o,{x:ptX("mktspy",o.x),go:()=>{apply({bac:-B.spy.cost});ptSend({who:ptPid(r),nm:r.name,kind:"mktspy",place:"cnh",a:{th,m:mo,o:tsMkSpyO(),sid:r.sid!=null?r.sid:null},lbl:"đi dò bên chủ hội"});if(ptRow("mktspy").o)spend(ptRow("mktspy").o)}})})}catch(e){ptErr("tsMkScout",e);return L}}}catch(e){ptErr("mkt wire",e)}})();
ptReg("mktspy",a=>{const p=ptPerson(a.a);const nm=p?p.name:"Tai mắt";const w=tsMkWant(a.a.th,a.a.m);
 if(roll(a.a.o)){tsMkLearn(w,{tone:1,bold:1});log(`${nm}: đề ${TS_THEME[a.a.th].n} chuộng ${tsMkWantTxt(w,{tone:1,bold:1})}.`);return{ok:true,t:`${nm} dò bên chủ hội trở về`}}
 log(`${nm} về tay không.`);return{ok:false,t:`${nm} dò bên chủ hội trở về`}});
/* ---- 15. SUMMONS (ruling (a)): asking a person to come is a send. The messenger goes, the person called is away from his post for the walk,
   she gets him at the due khắc (the work then runs as before, already paid). Truyền thái y (j13) · Mời thái y bắt mạch (jthaiy) · Truyền họa sư / nhạc sư (jroute) ---- */
function ptDocId(){try{const c=S.court&&S.court.ty;if(c)return typeof ledgerId==="function"?ledgerId(c)||"ty":"ty"}catch(e){}return"ty"}
function ptDocNm(){try{const c=S.court&&S.court.ty;return c&&c.name&&(typeof k61Named!=="function"||k61Named(c))?c.name:"Thái y"}catch(e){return"Thái y"}}
function ptSummonThy(road,card){/* road "treat" = Truyền thái y (j13: bạc 40, treat(S,"ty")), "pay" = Mời thái y bắt mạch (jthaiy: thyCost, thyReq("pay",true)); card = the deck card already paid its c + k */
 const id=ptDocId();if(ptBusy(id))return false;if(!card&&road==="pay"){if(window.thyWhy&&thyWhy("pay"))return false;apply({bac:-thyCost()})}
 const a=ptSend({paid:card?ptRow("summon").o:0,who:id,nm:ptDocNm(),kind:"summon",place:S.out?"lc":"home",tgt:"me",a:{run:road==="pay"?"thyPay":"thyTreat"},lbl:road==="pay"?"đến cung ngươi bắt mạch":"đến cung ngươi chữa bệnh"});
 if(a&&!card&&ptRow("summon").o)spend(ptRow("summon").o);try{render()}catch(e){}return!!a}
ptReg("thyTreat",a=>{if(!illOf(S)){log(`${a.nm} đến nơi, ngươi đã khỏi bệnh.`);return{ok:null}}const r=treat(S,"ty");if(r)log(r);return{ok:!illOf(S),t:`${a.nm} đến chữa bệnh`}});
ptReg("thyPay",a=>{PT.landing=1;try{if(window.thyReq)thyReq("pay",true)}finally{PT.landing=0}return{ok:null,t:`${a.nm} đến bắt mạch`}});
(function(){try{if(typeof illCards!=="function")return;const c0=illCards;illCards=function(){const A=c0.apply(this,arguments);try{if(!ptOn()||!Array.isArray(A))return A;const why=ptLockWhy(ptDocId());
  return A.map(c=>{if(!c)return c;if(c.n==="Truyền thái y")return Object.assign({},c,{k:ptRow("summon").o,x:ptX("summon",c.x)},why?{lock:true,t:why}:{go:()=>{ptSummonThy("treat",1)}});
   if(c.n==="Mời thái y bắt mạch"&&!c.lock)return Object.assign({},c,{k:ptRow("summon").o,x:ptX("summon",c.x)},why?{lock:true,t:why}:{go:()=>{ptSummonThy("pay",1)}});return c})}catch(e){ptErr("illCards",e);return A}}}catch(e){ptErr("illCards wire",e)}})();
(function(){try{if(typeof courtAct!=="function")return;const c0=courtAct;courtAct=function(a,k){if(ptOn()&&k==="ty"&&a==="bm"&&S&&!S.dead&&!(typeof Q!=="undefined"&&Q.length)){if(ptBusy(ptDocId())){ptNote({line:ptLockWhy(ptDocId())});return}if(can(ptRow("summon").o)){ptSummonThy("pay")}return}return c0.apply(this,arguments)};window.courtAct=courtAct}catch(e){ptErr("courtAct wire",e)}})();
/* the nausea notice's «Mời thái y bắt mạch» (jthaiy endTurn): the same summon */
(function(){try{if(typeof endTurn!=="function")return;const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(ptOn()&&typeof Q!=="undefined")for(const q of Q){for(const o of q&&q.opts||[]){if(o&&o.n==="Mời thái y bắt mạch"&&!o.__pt){o.__pt=1;o.x=ptX("summon",o.x);o.go=()=>{setTimeout(()=>{if(ptBusy(ptDocId()))return;ptSummonThy("pay")},0)}}}}}catch(e){ptErr("nausea",e)}return r}}catch(e){ptErr("endTurn wire",e)}})();
/* Truyền họa sư / nhạc sư vào cung (jroute rtCard ttord): Nội vụ phủ sends for him; he is in her palace from the due khắc (the week's cớ gặp) */
(function(){try{if(typeof rtCard!=="function")return;const r0=rtCard;rtCard=function(o){try{if(ptOn()&&o&&o.id==="ttord"&&typeof o.go==="function"&&!PT.landing){const g=o.go;const nm=/^Truyền (.+) vào cung$/.exec(o.n||"");
   o=Object.assign({},o,{x:ptX("summon",o.x),go:function(){const a=ptSend({who:"rt:"+(nm?nm[1]:"thầy"),nm:nm?nm[1][0].toUpperCase()+nm[1].slice(1):"Thầy",kind:"summon",place:S.out?"lc":"home",tgt:"me",a:{run:"rtOrd"},lbl:"vào cung ngươi"});
    if(a){PT.cl=PT.cl||{};PT.cl[a.id]=g}}})}}catch(e){ptErr("rtCard",e)}return r0.apply(this,[o].concat([].slice.call(arguments,1)))}}catch(e){ptErr("rtCard wire",e)}})();
ptReg("rtOrd",a=>{const g=PT.cl&&PT.cl[a.id];if(g){delete PT.cl[a.id];try{g()}catch(e){ptErr("rtOrd",e)}}else{try{rtS().order=wk();rtHeat(3)}catch(e){}log(`${a.nm} vào cung ngươi theo lệnh Nội vụ phủ.`)}return{ok:true,t:`${a.nm} vào cung`}});
/* ---- 16. TWO-WAY (ruling (c)): NPC senders — a gift carried by her servant (PEND.giftin), an NPC host's invitation (AG cx3:invite2) ---- */
function ptNpcCarrier(v){if(!v)return null;if(v.maid&&v.maid.name&&!ptBusy("mm:"+v.id))return{id:"mm:"+v.id,nm:v.maid.name};try{const s=bestSent(v);if(s)return{id:ptPid(s,v),nm:s.name}}catch(e){}return null}
(function(){try{const p0=pushDil;pushDil=function(d,title){try{if(ptOn()&&!PT.landing&&d&&d.pid==="giftin"&&d.pp&&d.pp.f!=null){const f=byKey(d.pp.f);
   if(f&&f!==S&&f.id!=null&&!f.coop/* a co-op friend is a player seat, not an NPC: her gift is NOT delayed (design, reports/parallel-time.md §16; was missing → the co-op gift card waited 2 khắc on the receiver's clock) */&&typeof RV==="function"&&RV(f.id)===f){const w=ptNpcCarrier(f);if(w){ptSend({who:w.id,nm:w.nm,kind:"giftin",by:"v"+f.id,byNm:f.name,place:S.out?"lc":"home",tgt:"me",a:{run:"giftin",pp:d.pp,title:title||"Quà tặng"},lbl:"mang quà sang cung ngươi"});PT.stat.npc++;return""}}}}catch(e){ptErr("giftin",e)}return p0.apply(this,arguments)};window.pushDil=pushDil}catch(e){ptErr("pushDil wire",e)}})();
ptReg("giftin",a=>{PT.landing=1;try{const d=mkP("giftin",a.a.pp);if(d)pushDil(d,a.a.title);else log(`${a.nm} mang quà đến, nhưng người tặng không còn.`)}finally{PT.landing=0}return null});
PT_NPC["cx3:invite2"]={kind:"npcinv",who:v=>{/* one invitation out at a time per host: the runner still out = busy (the deed is dropped) */const p=ptZ().find(a=>!a.back&&a.a&&a.a.npc==="cx3:invite2"&&a.a.v===v.id);return p?{id:p.who,nm:p.nm}:ptNpcCarrier(v)},lbl:t=>`đi mời ${t===S?"ngươi":t&&t.name?t.name:"khách"}`,land:1};
try{ptNpcWire()}catch(e){ptErr("npcWire2",e)}
/* the invitation lands at the due khắc (not at the next buổi on top: no double wait) */
(function(){const n0=PT.run.npc;ptReg("npc",a=>{const r=n0(a);try{const D=PT_NPC[a.a.npc];if(D&&D.land&&typeof p3InvLand==="function")p3InvLand()}catch(e){ptErr("npcinv land",e)}return r})})();
/* ---- 17. Nhờ thái giám mua đồ (j8 invAct "shop" → PEND.shop): the eunuch goes for the tray; it comes at the due khắc ---- */
const PT_EUN="eun:nvp";
(function(){try{if(typeof invAct!=="function")return;const i0=invAct;invAct=function(a){if(a==="shop"&&ptOn()&&S&&!S.dead&&!(typeof Q!=="undefined"&&Q.length)){
   if(ptBusy(PT_EUN)){ptNote({line:ptLockWhy(PT_EUN)});return}ptSend({who:PT_EUN,nm:"Thái giám Nội vụ phủ",kind:"shop",place:"nvp",a:{run:"shop"},lbl:"đi lấy khay đồ ngoài cung"});if(ptRow("shop").o)spend(ptRow("shop").o);render();return}
  return i0.apply(this,arguments)};window.invAct=invAct}catch(e){ptErr("invAct wire",e)}})();
ptReg("shop",a=>{PT.landing=1;try{pushDil(mkP("shop"),"Nhờ thái giám mua đồ")}finally{PT.landing=0}return{ok:null,t:"Thái giám mang khay đồ đến"}});
/* ---- 18. TWO-WAY (FAIL 7 item 4, law 1): EVERY NPC deed done by a SENT servant (not together with the target: j9 runAct sent = bestSent)
   goes through the SAME S.away / due-khắc path as hers (kind "harm": her deed on a consort when not together = order o, servant away n,
   lands at due). Callers: j28 npcAct, j40 mindRun (incl. j70 exec70), j70 plant, jtruth npcFrame, jtsb planned harm. The deed's own
   function, odds and news run at the due khắc; the servant sent is away (ledger, bestSent skips her) and cannot be sent again. ---- */
function ptNpcSent(a,t,k){try{return ptOn()&&!PT.landing&&!!a&&a!==S&&!a.coop/* a co-op friend is a player seat (her own sends ride HER S.away) */&&!!t&&a.id!=null&&typeof RV==="function"&&RV(a.id)===a&&!!ACT[k]&&!ACT_NOSEND.includes(k)&&!together(a,t)&&!sameHouse(a,t)}catch(e){return false}}
function ptTid(t){try{return ledgerId(t)}catch(e){return t===S?"me":t&&t.id!=null?"v"+t.id:null}}
function ptNpcDeed(a,t,k,run,x){const sv=bestSent(a);if(!sv)return"";/* no free servant (all away): the deed is dropped, as an NPC with no one to send */
 ptSend({who:ptPid(sv,a),nm:sv.name,kind:"harm",by:"v"+a.id,byNm:a.name,place:t===S?(S.out?"lc":"home"):palaceOf(t),tgt:ptTid(t),
  a:Object.assign({run,v:a.id,t:ptTid(t),k,sid:sv.sid!=null?sv.sid:null},x||{}),lbl:`đi ${String(ACT[k].n||"làm việc").toLowerCase()} ${t===S?"ngươi":t.name||""}`.trim()});PT.stat.npc++;return""}
/* landing: the same servant goes (bestSent returns her while the deed runs), the deed's own function runs, news as every NPC deed */
function ptNpcBack(a,fn){const v=RV(a.a.v);let t=null;try{t=agPerson(a.a.t)}catch(e){}if(!v||!v.alive||v.out||(a.a.t&&!t))return null;
 const sv=a.a.sid!=null?(v.staff||[]).find(s=>s&&s.sid===a.a.sid):null;PT.landing=1;PT.sv=sv?{p:v,s:sv}:null;let r="";
 try{r=fn(v,t)||""}catch(e){ptErr("npcDeed "+a.a.k,e)}finally{PT.landing=0;PT.sv=null}
 try{if(r){const me=t===S;if(a.a.tsb&&me&&typeof tsbHit==="function")tsbHit(a.a.k,r);else{newsAdd(v,a.a.k,r,me);if(me)log(r)}}}catch(e){ptErr("npcNews",e)}return null}
(function(){try{const b1=bestSent;bestSent=function(p){if(PT.sv&&p===PT.sv.p)return PT.sv.s;return b1.apply(this,arguments)}}catch(e){ptErr("bestSent sv",e)}})();
/* j40 mindRun (j70 exec70 too): the whole mind step (fails, belief, clue) runs at the due khắc */
(function(){try{if(typeof mindRun!=="function")return;const m0=mindRun;mindRun=function(v,t,k,err){if(!ptNpcSent(v,t,k))return m0.apply(this,arguments);return ptNpcDeed(v,t,k,"npcMind",{err:err||0})}}catch(e){ptErr("mindRun wire",e)}})();
ptReg("npcMind",a=>ptNpcBack(a,(v,t)=>mindRun(v,t,a.a.k,a.a.err)));
/* every other NPC caller of runAct (j28 npcAct, j70 plant, jtruth npcFrame, jtsb): the act itself at due */
(function(){try{const r0=runAct;runAct=function(a,t,k,extra){if(!ptNpcSent(a,t,k))return r0.apply(this,arguments);
  const tsb=typeof TSB!=="undefined"&&TSB.now?1:0;/* jtsb's planned harm: still its own week + omen first; the servant goes when it is due */
  let it=null;if(k==="plant"&&a.inv&&extra!=null&&a.inv[extra]){it=a.inv[extra];a.inv.splice(extra,1)}/* the item is carried (law 6c) */
  return ptNpcDeed(a,t,k,"npcAct",{tsb,item:it})}}catch(e){ptErr("runAct wire",e)}})();
ptReg("npcAct",a=>ptNpcBack(a,(v,t)=>{let ix;if(a.a.item){v.inv=v.inv||[];v.inv.push(a.a.item);ix=v.inv.indexOf(a.a.item)}
 const T0=typeof TSB!=="undefined"?TSB.now:0;if(a.a.tsb&&typeof TSB!=="undefined")TSB.now=1;try{return runAct(v,t,a.a.k,ix)}finally{if(typeof TSB!=="undefined")TSB.now=T0}}));
/* an NPC's trusted maid away on an errand (mm:<vid>) is away for EVERY deed of her mistress, not only the same deed sent again */
function ptMaidOut(v){return !!v&&v!==S&&!v.coop&&v.id!=null&&ptOn()&&ptBusy("mm:"+v.id)}
(function(){try{if(typeof AGRUN==="undefined")return;for(const k of Object.keys(AGRUN)){if(!/^cx\d*:maid/.test(k)||k==="cx2:maidSpy")continue;/* a MISTRESS's deed that uses her maid (cx2:maidTalk …); never the maid's own deeds ("maid:<key>", jagstaff) */const f0=AGRUN[k];if(!f0||f0.__ptm)continue;
  const f=function(v){if(ptMaidOut(v))return"";return f0.apply(this,arguments)};f.__ptm=1;AGRUN[k]=f}}catch(e){ptErr("maid lock",e)}})();
(function(){try{if(typeof sendMaid==="function"){const s0=sendMaid;sendMaid=function(a){if(ptMaidOut(a))return"";return s0.apply(this,arguments)}}
 if(typeof amSendQ==="function"){const q0=amSendQ;amSendQ=function(v){if(ptMaidOut(v))return false;return q0.apply(this,arguments)}}}catch(e){ptErr("maid lock2",e)}})();
/* j70 plots of an NPC: the moment comes (exec70), the servant is sent; the plot's whole landing (deed, foil / trap, aftermath card) at due */
(function(){try{if(typeof exec70!=="function")return;const e0=exec70;exec70=function(p,opp){try{const a=pa70(p),t=pt70(p),M=pm70(p);
  if(p&&a&&a!==S&&M&&M.k!=="joint"&&!p.foil&&!p.trap&&ptNpcSent(a,t,M.k)){const sv=bestSent(a);if(sv){p.st="sent";ptNpcDeed(a,t,M.k,"npc70",{pid:p.id,opp});return""}}}catch(e){ptErr("exec70",e)}
  return e0.apply(this,arguments)}}catch(e){ptErr("exec70 wire",e)}})();
ptReg("npc70",a=>{const p=(j70().pl||[]).find(x=>x&&x.id===a.a.pid);if(!p||p.st!=="sent")return null;p.st="wait";
 const v=RV(a.a.v);const sv=v&&a.a.sid!=null?(v.staff||[]).find(s=>s&&s.sid===a.a.sid):null;PT.landing=1;PT.sv=sv?{p:v,s:sv}:null;
 try{exec70(p,a.a.opp)}catch(e){ptErr("npc70",e)}finally{PT.landing=0;PT.sv=null}return null});
/* ---- 19. Cài người hầu vào cung khác (j10 PEND.plantsv; FAIL 7 item 5: BAL.ptime.kinds.bribe made true): her servant walks over to the other
   palace (away n khắc, ledger); Nội vụ phủ places her there at the due khắc with plantServ's own odds / bạc / evidence (the same servant). ---- */
(function(){try{const b0=PEND.plantsv;if(!b0)return;PEND.plantsv=function(pp){const d=b0.apply(this,arguments);try{if(!d||!ptOn()||PT.landing)return d;const s=bestSent(S);
  d.o=(d.o||[]).map(o=>{if(!o||!o.kgt||typeof o.go!=="function")return o;const v=o.kgt;if(!s)return Object.assign({},o,{lock:true,x:ptNoRunner(),go:()=>{}});
   return Object.assign({},o,{x:ptX("bribe",`${s.name} đi · ${o.x}`),go:()=>{if(S.bac<BAL.house.plantBac){log(`Không đủ ${BAL.house.plantBac} bạc để lo lót Nội vụ phủ.`);return}
    ptSend({who:ptPid(s),nm:s.name,kind:"bribe",place:palaceOf(v),tgt:"v"+v.id,a:{v:v.id,sid:s.sid},lbl:`sang cung ${v.name} làm tai mắt`});spend(ptRow("bribe").o)}})});
  d.t=(d.t||"")+(s?`<p class="past">${s.name} đi · tốn ${ptRow("bribe").o} khắc, ${ptWaitTxt("bribe")}</p>`:"")}catch(e){ptErr("plantsv",e)}return d}}catch(e){ptErr("plantsv wire",e)}})();
ptReg("bribe",a=>{const v=RV(a.a.v);const s=ptPerson(a.a);const nm=s?s.name:"Người được sai";if(!s||!v||!v.alive||v.out){log(`${nm} trở về: không cài vào cung ấy được nữa.`);return{ok:null}}
 PT.landing=1;PT.sv={p:S,s};let r="";try{r=plantServ(S,v)}finally{PT.landing=0;PT.sv=null}if(r)log(r);return{ok:typeof PLANT_OK!=="undefined"?!!PLANT_OK:null,t:`${nm} sang cung ${v.name} trở về`}});
/* two-way of §19: an NPC planting her servant in another palace (AG cx2:plantSrv) sends her the same way (kind bribe) */
PT_NPC["cx2:plantSrv"]={kind:"bribe",who:v=>{let s=null;try{s=bestSent(v)}catch(e){}return s?{id:ptPid(s,v),nm:s.name}:null},lbl:t=>`sang cung ${t===S?"ngươi":t&&t.name?t.name:""} làm tai mắt`.trim()};
try{ptNpcWire()}catch(e){ptErr("npcWire3",e)}
/* ---- 20. TWO-WAY of §9 (role-parity cx4 ill route, jagacts4 p4IllCard → illBuy(v,"maid",k)): an NPC's trusted maid sent out by the Thần Vũ gate is
   away n khắc like hers (ledger, locked); caught or not is known at the due khắc with illBuy's own odds and bạc. ---- */
(function(){try{if(typeof illBuy!=="function")return;const ib1=illBuy;illBuy=function(p,r,k){if(!p||p===S||p.coop||r!=="maid"||!ptOn()||PT.landing||!p.maid||p.id==null)return ib1.apply(this,arguments);
  if(ptMaidOut(p))return"";ptSend({who:"mm:"+p.id,nm:p.maid.name,kind:"buy",by:"v"+p.id,byNm:p.name,place:typeof J95OUT_!=="undefined"?J95OUT_:null,a:{run:"npcBuy",v:p.id,k},lbl:`lén ra cửa Thần Vũ mua ${itm(k).n}`});PT.stat.npc++;return""}}catch(e){ptErr("npc illBuy wire",e)}})();
ptReg("npcBuy",a=>{const v=RV(a.a.v);if(!v||!v.alive||v.out)return null;PT.landing=1;let r="";try{r=illBuy(v,"maid",a.a.k)||""}catch(e){ptErr("npcBuy",e)}finally{PT.landing=0}
 try{if(r)newsAdd(v,"ill",r,false)}catch(e){}return null});
