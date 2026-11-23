/* jerr.js — ERRAND SCENE r2, NON-BLOCKING (owner OD 18/11 ~20:05Z "tôi muốn thấy con nhỏ đi ra khỏi sân khấu … rồi nó về", ~20:10Z CANON OVERWRITE "KHÔNG BAO GIỜ chặn chơi",
   ~20:15Z + ~20:20Z parallel time, EVERY button where she asks / sends another person; review/errand-scene; MOTION.md "Sai người đi").
   The scene is a PICTURE OF ONE STATE: "person P is away until khắc K" (task {who, nm, k, lbl, t0, due, back, read, rep}).
   - tap = time moves AT ONCE as always (no hold, no deferred result, no shield, no wait): the person walks off the stage in the background, her slot shows
     the kit chip «đang đi dò la…» (errWord) while she is away;
   - at khắc K (her clock moved: spend / nextBuoi) she walks back ON in the background and a small kit «!» chip stands on her; tap the chip = read the report
     (the kit status icon panel «tin», §77.1 — never a forced modal);
   - runner ALWAYS drawn: she walks with her own painted figure (kitFigOf) from / to the kit errand spot (kitErrandSpot) when her token is not on the page
     in view (crowded stage, swipe pages "+N", resting elsewhere) — one kit rule, no private variant.
   ONE ADAPTER (errTasks / errAwayOf / errNews / errNow / errWhen): when the parallel-time core is in the build (window.PTIME, jptime S.away, BAL.ptime) the adapter
   READS ITS state (ptSend creates the task, ptTick lands it, its status icon owns the panel); without it the adapter keeps the same shape in S.erra (created here at the
   gates, landed here at the due khắc, panel registered here). Nothing is computed twice; numbers from BAL (BAL.errand / BAL.ptime). Old saves: S.erra is created lazily.
   Gates (fallback only; the scan table lists every act): runAct (every ACT sent to someone elsewhere, 46 acts) + scout, invite, h54Act thu, tdAct gift, htAct ask.
   KIT: motion layer `.kmfly.kmerr` (cleaned by kmReset), notice = kitLine (§42.2), chips = the kit chip (kchip n / r), icon = kitStatusIcon; no private frame / chip. */
(function(){
const ER=window.ERR={n:0,live:0,seen:{},base:null,walk:{},skips:0};
/* wording per errand (VANPHONG: cổ trang, no %, no odds numbers). Key = ACT key or a named flow. Harm acts all read as a quiet errand. */
const ERRV={spy:"dò la",ally:"đưa lời kết giao",bribe:"mua chuộc người",bribel:"đưa quà lót tay",block:"lo việc thẻ bài",blockf:"nhờ ơn người quen",rumor:"rỉ tai tin đồn",lygian:"gieo lời ly gián",
 tocao:"đưa chứng cứ tố tội",expose:"đưa tin tư tình",xinhh:"dâng lời lên Hoàng hậu",laydo:"lấy đồ",laydol:"lấy đồ",plant:"cài đồ",petcare:"chăm thú nuôi",
 scout:"dò nơi ở",invite:"đưa lời mời",letter:"gửi thư, quà",tdgift:"biếu quà, đưa thư",kin:"dò hỏi gia thế",listen:"nghe ngóng"};
const ERRV_DEFAULT="làm việc kín";
/* acts where she goes HERSELF (no servant leaves): jecon spyk "Tự đi dò la" */
ER.self=["spyk"];
function errWord(k){return "đang đi "+(ERRV[k]||ERRV_DEFAULT)+"…"}
window.errWord=errWord;
/* ---------------------------------------------------------------- the ONE ADAPTER ---------------------------------------------------------------- */
function errOn(){try{return !!(window.PTIME&&PTIME.on&&PTIME.on())}catch(e){return false}}
function errKH(){try{return BAL.time.khac||4}catch(e){return 4}}
function errNow(){try{if(errOn())return PTIME.now();return bid()*errKH()+Math.max(0,Math.min(errKH(),typeof used==="number"?used:0))}catch(e){return 0}}
function errN(k){try{if(BAL.ptime&&BAL.ptime.kinds){const r=BAL.ptime.kinds[k]||BAL.ptime.kinds.def;if(r&&r.n!=null)return r.n}}catch(e){}return(BAL.errand&&BAL.errand.n)||2}
function errWhen(K){if(errOn()&&PTIME.when)try{return PTIME.when(K)}catch(e){}
 const kh=errKH(),b=Math.floor(K/kh),i=K-b*kh,nb=bid();let B4=4;try{B4=B4N}catch(e){}
 if(b===nb)return`khắc ${i+1}`;if(Math.floor(b/B4)===Math.floor(nb/B4)){let n="";try{n=BUOI[b%B4].toLowerCase()}catch(e){}return`${n}, khắc ${i+1}`}return"ngày mai"}
function errZ(){if(!S)return[];if(!Array.isArray(S.erra))S.erra=[];return S.erra}
/* every send of HERS, normalised: the parallel-time core's S.away rows (by "me") or the fallback rows */
/* newest send first (fixer #6): the task she just gave is the one the scene / panel speaks of first, in both adapters; k = the act key when the core row carries one
   (a "harm" row sent through runAct keeps ACT key a.a.k: «đang đi rỉ tai tin đồn…», not the generic word) */
function errNew(L){return L.map((t,i)=>[t,i]).sort((x,y)=>(y[0].t0-x[0].t0)||(y[1]-x[1])).map(x=>x[0])}
function errTasks(){try{if(!S)return[];if(errOn())return errNew((Array.isArray(S.away)?S.away:[]).filter(a=>a&&a.by==="me").map(a=>({id:a.id,who:a.who,nm:a.nm,lbl:a.lbl,k:(a.a&&typeof a.a.k==="string"&&a.a.k)||a.kind,t0:a.t0,due:a.due,back:!!a.back,read:!!a.read,rep:a.rep})));return errNew(errZ())}catch(e){return[]}}
function errAwayOf(id){for(const t of errTasks())if(t.who===id&&!t.back)return t;return null}
function errNews(){return errTasks().filter(t=>t.back&&t.rep&&!t.read)}
function errMine(){return errTasks().filter(t=>!t.back)}
/* ledger id of one of her people ↔ the person */
function errId(sv){if(!sv)return null;return sv.sid!=null?"s"+sv.sid:"mm:me"}
function errPerson(id){if(!S||!id)return null;if(id==="mm:me")return S.maid||null;if(id[0]==="s"){const sid=+id.slice(1);for(const s of S.staff||[])if(s&&s.sid===sid)return s}return null}
/* the runner = the servant the game sends (bestSent), else her maid; a person already away is never sent again (law 6b) */
function errRunner(){let sv=null;try{sv=typeof bestSent==="function"?bestSent(S):null}catch(e){}if(sv&&!errAwayOf(errId(sv)))return sv;
 for(const s of(S.staff||[]).slice().sort((a,b)=>(b.loyal||0)-(a.loyal||0)))if(s&&s!==sv&&!s.spyFor&&!errAwayOf(errId(s)))return s;
 return S.maid&&S.maid.name&&!errAwayOf("mm:me")?S.maid:null}
function errReduced(){try{return typeof kmReduced==="function"?kmReduced():false}catch(e){return false}}
function errCan(){try{return !!(typeof S!=="undefined"&&S&&!S.dead&&!window.__bot&&!(typeof quiet!=="undefined"&&quiet)&&!(window.COOPW&&COOPW.on)&&!(typeof isSrv==="function"&&isSrv()))}catch(e){return false}}
/* fallback ledger (law 6b): a person away is away on the roster; same rows as jptime ptLedger */
function errLedger(){if(errOn()||!S||typeof j95on!=="function"||!j95on())return;const R=S.roster;if(!R||!R.P)return;const kh=errKH(),b0=bid()*kh;let ch=false;
 for(const a of errZ()){if(a.back||!R.P[a.who])continue;const e=R.P[a.who];for(let i=0;i<e.length;i++){const K=b0+i;if(K>=a.t0&&K<a.due&&(!e[i]||e[i][1]!=="errand")){e[i]=[(e[i]&&e[i][0])||"ngoai","errand",null,"đi việc cho chủ"];ch=true}}}
 if(ch)try{const k=j95kh();S.where=j95view(R,k);R.m[k]=j95counts(R,k);if(typeof j95stage==="function")j95stage(R,k)}catch(e){}}
/* fallback landing: her clock reached khắc K */
function errTick(){if(errOn()||!S||S.dead)return;const now=errNow();let ch=false;
 for(const t of errZ())if(!t.back&&t.due<=now){t.back=1;ch=true;try{if(errCan())errNotify(t.id,`${t.nm} đã về: có tin báo.`,/* the same landing line as the core (jptime pt:back): ONE wording */`${t.nm} đã về từ việc ${t.lbl||"được sai"}: có tin báo.`)}catch(e){}}
 if(ch){try{const day=errKH()*3;S.erra=errZ().filter(t=>!t.back||(!t.read&&t.rep)||now-t.due<day)}catch(e){}errLedger();errIcon()}}
/* the report panel: ONE implementation for both adapters. kitPanel info spec: subject = the person who REALLY went and came back (law 6b), facts = what she learned
   (the act's own log lines), sections = the gain / loss chips (kit chips), «Đợi tin» only with the parallel-time core */
function errRead(t){try{t.read=1;if(errOn()&&Array.isArray(S.away)){const a=S.away.find(x=>x&&x.id===t.id);if(a)a.read=1}}catch(e){}}
/* RECEIVER SIDE (OD 18/11 ~21:15Z): orders / requests that wait for HER as notices (jptime S.ordQ) are read through the parallel-time reader API
   (PTIME.orders / ordWhen / answer) — this file owns the ONE «tin» panel, so their badge + rows + «Nghe lệnh / Xem lời nhờ» buttons live here too. No PTIME = none. */
function errOrders(){try{return window.PTIME&&typeof PTIME.orders==="function"?(PTIME.orders()||[]):[]}catch(e){return[]}}
function errOrdIs(o){return !!o&&(o.pid==="cnvOrd"||o.pid==="err")}
function errOrdWhen(o){try{return PTIME.ordWhen(o)}catch(e){return o&&o.due!=null?"trả lời trước "+errWhen(o.due):""}}
function errPanel(){const N=errNews(),W=errMine(),OQ=errOrders();const facts=[],sec=[];let subj=null;
 for(const o of OQ)facts.push(`${o.byNm} ${errOrdIs(o)?"có lệnh cho ngươi":"có lời nhờ"} · ${errOrdWhen(o)} (quá hạn: coi như từ chối).`);
 for(const t of N){const r=t.rep||{},p=errPerson(t.who);if(!subj&&p)subj=p;
  facts.push(r.t||`${t.nm} đã về.`);
  /* gain / loss chips right under the title line (kit chips, visible without scrolling); the lines below are only what she learned */
  if((r.d||[]).length&&typeof kitChips==="function")facts.push({text:"Được · mất: "+kitChips(r.d),kind:"me"});
  (r.L||[]).forEach(l=>facts.push(l));errRead(t)}
 for(const t of W){const p=errPerson(t.who);if(!subj&&p)subj=p;facts.push(`${t.nm} đang ${t.lbl||"đi việc"} · về ${errWhen(t.due)}.`)}
 if(!facts.length)facts.push("Không có ai đang đi việc.");
 const opts=OQ.map(o=>({n:errOrdIs(o)?"Nghe lệnh":"Xem lời nhờ",x:`${o.title||("Lệnh của "+o.byNm)} · ${errOrdWhen(o)}, quá hạn coi như từ chối`,fx:{},go:()=>{setTimeout(()=>{try{PTIME.answer(o.id)}catch(e){console.error(e)}},0)}}));
 try{if(errOn()&&PTIME.waitOk&&PTIME.waitOk()){const K=PTIME.next();opts.push({n:"Đợi tin",x:`ngồi chờ đến ${errWhen(K)}, khi người được sai trở về`,fx:{},go:()=>{setTimeout(()=>PTIME.wait(),0)}})}}catch(e){}
 setTimeout(()=>errSync(),0);const sp={title:"Tin chờ người sai đi",facts,sections:sec,opts};if(subj)try{const f=kitFace(subj);if(f)sp.subject=Object.assign({},f,{rk:typeof f.rk==='string'?f.rk:undefined})}catch(e){}return sp}
function errIcon(){try{if(typeof kitStatusIcon==="undefined")return;kitStatusIcon.set("tin",{title:"Người được sai đi",icon:"img/kit/ico-tin.webp",order:30,
 show:()=>!!(S&&!S.dead&&(errMine().length||errNews().length||errOrders().length)),busy:()=>!!(S&&errMine().length&&!errNews().length&&!errOrders().length),badge:()=>!!(S&&(errNews().length||errOrders().length)),panel:errPanel});kitStatusIcon.refresh()}catch(e){console.error("jerr icon",e)}}
/* ONE call for the notice of an errand = the game's ONE notice entry point (stage-here r4, dev/build/jnotice.js): kitNotice({id,line,text,pic,go,goLabel}) lights the top-bar «!» box + one short top chip,
   tap → small kit panel «Tin báo». No toast / chip / bar of my own (jnotice.js is in the build before this module). Call sites: errAdd (sent), errTick (back); jptime lands call errNotify too. */
function errNotify(id,line,text){try{kitNotice({id:"errand:"+id,line,text:text||line,go:()=>errOpen(),goLabel:"Để ta xem"})}catch(e){console.error("errNotify",e)}}
function errOpen(){try{if(typeof kitStatusIcon!=="undefined")kitStatusIcon.open("tin")}catch(e){console.error(e)}}
/* the gate: run an errand action; in the fallback the action runs ONCE as before (no double charge, no deferred report), then the task is recorded */
function errAdd(sv,spec,L,dl){const t0=errNow();/* fallback: away n khắc counted from the END of her order (the act's own khắc already paid); jptime counts from the tap with its own o/n rows */const w=ERRV[spec.k]||ERRV_DEFAULT;const t={id:"e"+(++ER.n)+"-"+t0,who:errId(sv),nm:sv.name,k:spec.k,lbl:"đi "+w,t0,due:t0+errN(spec.k),back:0,read:0,rep:{t:`${sv.name} ${w} trở về`,ok:null,L:L.length?L:[`${sv.name} đã về.`],d:dl||[]}};
 errZ().push(t);ER.seen[t.id]={fresh:1};try{errNotify(t.id,`${t.nm} đã đi ${w}, về ${errWhen(t.due)}`)}catch(e){}errIcon();return t}
/* PTIME GATE (fixer #6, FAIL 1 of review parallel-time #3; law 6b + law 11 whole group): jptime builds its own task at the buttons it adapts (doAct ptHarmSend, j21
   scout / invite, spy / listen / plant / gift / buy / clothes); every OTHER errand gate (runAct from the card game jsgame, j70 events, j9 talk acts, jpetcare; h54Act thu,
   tdAct gift, htAct ask) ran at once with nobody leaving. Now: the act runs ONCE as before (same odds, same result, no double charge), and when the core made no task for
   it, the person who went is written into the core's ONE state (PTIME.send, kind of the BAL.ptime row, away n khắc from the end of her order) with the act's own report
   (runner "errpic": the lines + gain / loss read here, shown when she is back). Never during a landing (the core's own runner calls runAct). */
function errMineN(){try{return(Array.isArray(S.away)?S.away:[]).filter(a=>a&&a.by==="me").length}catch(e){return 0}}
function errPtRun(fn,ctx,args,spec){
 try{if(PTIME.landing&&PTIME.landing())return fn.apply(ctx,args)}catch(e){}
 let sv=null;try{sv=spec.act?bestSent(S):(typeof ptRunner==="function"?ptRunner():errRunner())}catch(e){sv=null}
 if(!sv||errAwayOf(errId(sv)))return fn.apply(ctx,args);
 const n0=errMineN(),u0=used,l0=S.logSeq||0,b0=typeof rsnap==="function"?rsnap():null;const r=fn.apply(ctx,args);
 if(errMineN()!==n0)return r;/* the core made its own task (an adapted button) */
 if(!spec.always&&used===u0&&(S.logSeq||0)===l0&&!(typeof Q!=="undefined"&&Q.length))return r;
 const w=ERRV[spec.k]||ERRV_DEFAULT;let kind=spec.act?"harm":spec.k;try{if(!(BAL.ptime&&BAL.ptime.kinds&&BAL.ptime.kinds[kind]))kind="def"}catch(e){kind="def"}
 let a=null;try{a=PTIME.send({who:errId(sv),nm:sv.name,kind,lbl:"đi "+w,a:{run:"errpic",k:spec.k,sid:sv.sid!=null?sv.sid:null,t:`${sv.name} ${w} trở về`,L:[],d:[]}})}catch(e){console.error("jerr ptSend",e)}
 if(a)setTimeout(()=>{try{const x=errRep(l0,b0);/* a caller that does not log the act's result line (it only returns it): that line is the report */if(!x.L.length&&typeof r==='string'&&r.trim())x.L=[typeof plain==='function'?plain(r):r.replace(/<[^>]*>/g,'')];if(x.L.length)a.a.L=x.L;a.a.d=x.d}catch(e){console.error(e)}},0);
 try{errSync()}catch(e){console.error(e)}return r}
/* the act's own log lines and gain / loss since the snapshot (the act finishes its lines and result card AFTER the gate returns: read at the end of this tick) */
function errRep(l0,b0){const n=Math.max(0,Math.min((S.logs||[]).length,(S.logSeq||0)-l0));
 const L=(S.logs||[]).slice(0,n).map(x=>String(x).split(/ — (?=<span class="[gr]">)/)[0]).map(x=>typeof plain==="function"?plain(x):String(x).replace(/<[^>]*>/g,"")).map(x=>x.replace(/^T\d+\/\d+\s+\S+\s+tuần\s*/,"").replace(/\s*\(sai [^)]*đi\)\s*/,' ').replace(/\s+—\s+/g,' · ').trim()).filter(Boolean).reverse();
 const d=[];if(b0)for(const [k,nm] of RKEYS){const x=(S[k]||0)-(b0[k]||0);if(x)d.push([nm,x])}return{L,d}}
/* the core lands a picture task at its due khắc: the report = what the act really did when she gave the order */
function errPicReg(){try{if(window.PTIME&&typeof PTIME.reg==="function")PTIME.reg("errpic",a=>{const x=a.a||{};return{t:x.t,ok:null,txt:(x.L&&x.L.length?x.L.join(" "):`${a.nm} đã về.`)}})}catch(e){console.error("jerr errpic",e)}}
errPicReg();
/* after a landing: the picture task's report keeps the act's own lines and gain / loss chips (ptLand writes one joined line and no chips: nothing changed at landing) */
function errPicFix(){try{if(!errOn()||!Array.isArray(S.away))return;for(const a of S.away)if(a&&a.back&&a.rep&&a.a&&a.a.run==="errpic"&&!a.a.fixd){a.a.fixd=1;if((a.a.L||[]).length)a.rep.L=a.a.L.slice();a.rep.d=(a.a.d||[]).slice()}}catch(e){}}
function errRun(fn,ctx,args,spec){
 if(!errCan())return fn.apply(ctx,args);
 if(errOn())return errPtRun(fn,ctx,args,spec);
 const sv=errRunner();if(!sv)return fn.apply(ctx,args);
 const u0=used,l0=S.logSeq||0,b0=typeof rsnap==="function"?rsnap():null;const r=fn.apply(ctx,args);
 if(!spec.always&&used===u0&&(S.logSeq||0)===l0&&!(typeof Q!=="undefined"&&Q.length))return r;
 const t=errAdd(sv,{k:spec.k},[],[]);
 /* the act finishes its own log lines and result card AFTER runAct returns (doAct): read them at the end of this tick = this act's report, nothing else can run in between */
 setTimeout(()=>{try{const n=Math.max(0,Math.min((S.logs||[]).length,(S.logSeq||0)-l0));
  const L=(S.logs||[]).slice(0,n).map(x=>String(x).split(/ — (?=<span class="[gr]">)/)[0]).map(x=>typeof plain==="function"?plain(x):String(x).replace(/<[^>]*>/g,"")).map(x=>x.replace(/^T\d+\/\d+\s+\S+\s+tuần\s*/,"").replace(/\s*\(sai [^)]*đi\)\s*/,' ').replace(/\s+—\s+/g,' · ').trim()).filter(Boolean).reverse();
  const dl=[];if(b0)for(const [k,nm] of RKEYS){const x=(S[k]||0)-(b0[k]||0);if(x)dl.push([nm,x])}
  if(t.rep){if(L.length)t.rep.L=L;t.rep.d=dl}}catch(e){console.error(e)}},0);
 errLedger();try{errSync()}catch(e){console.error(e)}return r}
ER.run=errRun;ER.tasks=errTasks;ER.awayOf=errAwayOf;ER.news=errNews;ER.now=errNow;ER.when=errWhen;ER.tick=errTick;ER.open=errOpen;ER.adapter=()=>errOn()?"ptime":"fallback";
/* ---------------------------------------------------------------- the PICTURE of that state ---------------------------------------------------------------- */
function errCss(){if(document.getElementById("kerr-css"))return;const s=document.createElement("style");s.id="kerr-css";s.textContent=`
.kmerr-lay{position:absolute;inset:0;width:100%;height:100%;overflow:hidden;pointer-events:none;z-index:40;filter:none}/* beats .kmfly (fixed, 56x56) */
.kmerr-fig{position:absolute;will-change:transform;pointer-events:none;transition:transform var(--kme-t,650ms) cubic-bezier(.5,0,.8,.6)}
.kmerr-fig.on{transition-timing-function:cubic-bezier(.2,.5,.4,1)}
.kmerr-fig img{display:block;width:100%;height:100%;object-fit:contain;transform-origin:50% 100%;animation:kmerrbob .32s ease-in-out infinite}
@keyframes kmerrbob{0%,100%{transform:translateY(0) rotate(-.8deg)}50%{transform:translateY(-6px) rotate(.8deg)}}
.kmerr-lay .kmerr-slot{position:absolute;transform:translateX(-50%);white-space:nowrap;max-width:92%}
.kmerr-lay i.kmerr-bang{position:absolute;margin:0;pointer-events:auto;cursor:pointer}/* the kit head marker (.khead yellow speech bubble, KIT §78.z; fallback the .khap «!» disc) above her head */
`;document.head.appendChild(s)}
function errTok(p){const tk=document.getElementById("tokens");if(!tk||!p)return null;return[...tk.querySelectorAll(".tok.fig")].find(x=>{const g=x.querySelector(".tag");return g&&g.textContent.includes(p.name)&&x.offsetParent!==null})||null}
/* KIT RULE «runner always drawn» (kitErrandSpot): where a person with no token in view walks from / to: the left slot of the stage on the kit floor line, at the kit figure height.
   Used by every walk (off / on) when her token is not on the page in view; stage-here / j59 keep their own slot logic untouched. */
function kitErrandSpot(st){const H=st.clientHeight||st.getBoundingClientRect().height,W=st.clientWidth||st.getBoundingClientRect().width;let fl=0;try{fl=kitSlotFloor(H)}catch(e){fl=H*.03}
 const h=Math.round(H*(window.KIT_FIG&&KIT_FIG.h||.79));return{h,top:Math.max(0,H-fl-h),left:Math.round(W*.14)}}
window.kitErrandSpot=kitErrandSpot;
function errLay(st){let l=st.querySelector(":scope>.kmerr-lay");if(!l){l=document.createElement("div");l.className="kmfly kmerr kmerr-lay";st.appendChild(l)}return l}
function errMs(){let m=(BAL.errand&&BAL.errand.msWalk)||650;try{if(typeof kitPace==="function")m=kitPace(m)}catch(e){}return m*(ER.slow||1)}
/* one walk of one person: dir "off" (toward the left edge) or "on" (back from it); the real token stays hidden meanwhile */
function errWalk(t,dir){
 const st=document.getElementById("stage");const p=errPerson(t.who);if(!st||!p||errReduced()||!errCan()||(typeof kmOn==="function"&&!kmOn()))return;
 errCss();const lay=errLay(st),tok=errTok(p);let src="",l,tp,w,h;const sr=st.getBoundingClientRect(),sc=st.offsetWidth?sr.width/st.offsetWidth:1;
 const img=tok&&(tok.querySelector(".figimg")||tok.querySelector("img"));
 if(img){const r=img.getBoundingClientRect();src=img.currentSrc||img.src;l=(r.left-sr.left)/sc;tp=(r.top-sr.top)/sc;w=r.width/sc;h=r.height/sc}
 else{try{src=kitFigOf(p)||""}catch(e){}if(!src)return;const k=kitErrandSpot(st);l=k.left;tp=k.top;h=k.h;w=0}
 const fig=document.createElement("div");fig.className="kmerr-fig"+(dir==="on"?" on":"");const ms=errMs();
 fig.style.cssText=`--kme-t:${ms}ms;left:${l}px;top:${tp}px;height:${h}px;width:${w?w+"px":"auto"};${dir==="on"?"transition:none;":""}`;
 const c=document.createElement("img");c.src=src;c.alt="";c.draggable=false;if(!w){c.style.width="auto";c.style.maxWidth="none"}fig.appendChild(c);lay.appendChild(fig);ER.walk[t.id]=dir;
 const out=-(l+(w||fig.offsetWidth||h*.45)+24);ER.live++;let d=0;
 const fin=()=>{if(d)return;d=1;ER.live=Math.max(0,ER.live-1);try{fig.remove()}catch(e){}delete ER.walk[t.id];try{errSync()}catch(e){}};
 if(dir==="off"){requestAnimationFrame(()=>requestAnimationFrame(()=>{fig.style.transform=`translateX(${out}px)`}))}
 else{fig.style.transform=`translateX(${out}px)`;requestAnimationFrame(()=>requestAnimationFrame(()=>{fig.style.transition=`transform ${ms}ms cubic-bezier(.2,.5,.4,1)`;fig.style.transform="translateX(0)"}))}
 setTimeout(fin,ms+120);try{kmOnReset(fin)}catch(e){}}
/* the state → the screen, idempotent: called after every render / layout / clock move */
function errSync(){if(!S||S.dead||ER.syncing)return;ER.syncing=1;try{
 if(ER.base!==S){ER.base=S;ER.seen={};for(const t of errTasks())ER.seen[t.id]={off:1,on:t.back?1:0}}/* a loaded life never replays an old walk */
 const st=document.getElementById("stage");const T=errTasks();
 for(const t of T){const q=ER.seen[t.id]||(ER.seen[t.id]={fresh:1});
  if(!t.back&&!q.off){q.off=1;q.fresh=0;errWalk(t,"off")}
  if(t.back&&!q.on){q.on=1;q.off=1;errWalk(t,"on")}}
 if(!st||!errCan())return;const lay=errLay(st);errCss();lay.querySelectorAll(".kmerr-slot,.kmerr-bang").forEach(e=>e.remove());
 const sr=st.getBoundingClientRect(),sc=st.offsetWidth?sr.width/st.offsetWidth:1;
 for(const t of T){const p=errPerson(t.who);const tok=errTok(p);if(!tok)continue;const open=!t.back,walking=!!ER.walk[t.id],news=t.back&&t.rep&&!t.read;
  tok.style.visibility=(open||walking)?"hidden":"";if(walking||(!open&&!news))continue;
  const img=tok.querySelector(".figimg")||tok.querySelector("img");const r=(img||tok).getBoundingClientRect();const cx=(r.left+r.width/2-sr.left)/sc;
  if(open){const c=document.createElement("span");c.className="kchip n kmerr-slot";c.textContent=errWord(t.k);c.style.left=cx+"px";c.style.top=((r.top+r.height*.45-sr.top)/sc)+"px";lay.appendChild(c)}
  else{/* the kit yellow round «!» (kitHapHtml = the Dư đồ mark) ABOVE HER HEAD, never on the emotion chip beside it (owner OD 18/11 ~22:10Z) */
   const w=document.createElement("span");w.innerHTML=typeof kitHeadMarkHtml==="function"?kitHeadMarkHtml(`${t.nm} đã về: có tin báo`,"button","on"):"";/* KIT §78.z: the yellow speech bubble head marker (owner OD 19/11 ~03:05Z) */const c=w.firstChild;if(!c)continue;c.classList.add("kmerr-bang");c.setAttribute("tabindex","0");
   /* KIT §78.y: ON the sex line of the stage (jmark kitBadgeAt: the highest REAL head top of that sex − a clear gap, owner OD 19/11 ~03:50Z), on the figure's centre line — level with «ta ở đây» and with every other mark of that sex, never touching hair / crown */
   const hpx=c.classList.contains("kfb")?19:((window.KIT_HEADMK||{}).px||24);const hh=c.offsetHeight||hpx,ww=c.offsetWidth||hpx;const P=typeof kitBadgeAt==="function"&&img?kitBadgeAt(st,img,"hap",ww,hh):null;if(!P)continue;c.dataset.line=P.sex;
   c.style.left=((P.left-sr.left)/sc)+"px";c.style.top=((P.top-sr.top)/sc)+"px";
   const go=e=>{e.preventDefault();e.stopPropagation();errOpen();setTimeout(errSync,60)};c.addEventListener("click",go);c.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" ")go(e)});lay.appendChild(c)}}
 /* a person whose task is over and read: nobody keeps her hidden */
 for(const x of document.querySelectorAll("#tokens .tok.fig")){const g=x.querySelector(".tag");if(!g||x.style.visibility!=="hidden")continue;const nm=g.textContent;
  const hold=T.some(t=>{const p=errPerson(t.who);return p&&nm.includes(p.name)&&(!t.back||ER.walk[t.id])});if(!hold)x.style.visibility=""}
 }finally{ER.syncing=0}}
ER.sync=errSync;
/* ---- wiring: the clock and the stage ---- */
try{kmOnReset(()=>{for(const l of document.querySelectorAll(".kmerr-lay .kmerr-fig"))l.remove();ER.walk={};ER.live=0})}catch(e){}
{const sp=spend;spend=function(){const r=sp.apply(this,arguments);try{errPicFix();errTick();errLedger();errSync()}catch(e){console.error(e)}return r}}
if(typeof nextBuoi==="function"){const nb=nextBuoi;nextBuoi=function(){const r=nb.apply(this,arguments);try{errPicFix();errTick();errLedger();errSync()}catch(e){console.error(e)}return r}}
{const r0=render;render=function(){const r=r0.apply(this,arguments);try{errIcon();errSync()}catch(e){console.error(e)}return r}}
if(typeof j59lay==="function"){const j0=j59lay;j59lay=function(){const r=j0.apply(this,arguments);try{errSync()}catch(e){}return r}}
/* ---- entry points (the scan table in dev/handover/reports/errand-scene.md lists every one) ---- */
{/* every ACT sent to someone elsewhere: runAct, the one gate for player acts (doAct, the card game, the picked plant / gift flows) */
 const r0=runAct;runAct=function(a,t,k,extra){if(a!==S||typeof together!=="function"||together(a,t)||ACT_NOSEND.includes(k)||ER.self.includes(k)||(typeof sameHouse==="function"&&sameHouse(a,t)))return r0.apply(this,arguments);
  /* doAct already spent the khắc before runAct: this call IS the errand (always) */
  return errRun(r0,this,arguments,{k,act:1,n:(typeof BAL==="object"&&BAL.time&&BAL.time.cost&&BAL.time.cost.harm)||1,always:1})}}
{const f0=scout;scout=function(){return errRun(f0,this,arguments,{k:"scout"})}}
{const f0=invite;invite=function(){return errRun(f0,this,arguments,{k:"invite"})}}
/* her child far away: letter + gift (j54 h54Act "thu") and the in-law house gift (j55 tdAct "gift") */
{const f0=h54Act;h54Act=function(a){return a==="thu"?errRun(f0,this,arguments,{k:"letter"}):f0.apply(this,arguments)}}
{const f0=tdAct;tdAct=function(a){return a==="gift"?errRun(f0,this,arguments,{k:"tdgift"}):f0.apply(this,arguments)}}
/* jht "Dò hỏi gia thế" (htAct is exposed on window by jht.js) */
if(typeof window.htAct==="function"){const f0=window.htAct;window.htAct=function(a,b){return a==="ask"?errRun(f0,this,arguments,{k:"kin"}):f0.apply(this,arguments)}}
})();
