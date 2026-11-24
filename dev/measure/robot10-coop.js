/* ROBOT-10 CO-OP — robot PAIRS play whole co-op kiếp and report every bug (owner OD 23/11 ~19:20Z «ROBOT PLAYTEST BEFORE SHE PLAYS»;
   co-op = 10 kiếp per pair, owner 23/11 ~20:05Z: "Riêng cái chơi chung phải là 10 kiếp nha. Chơi chung nó rất là dễ bị lỗi.";
   every pair records the LAG set, MAIN 113 22:38Z). Test-only: it REUSES, it adds no game code.
 USAGE
   python3 dev/build/assemble.py && node dev/measure/robot10-coop.js <pairFrom> <pairTo> <kiếp> [out]
     pairFrom..pairTo  pair numbers 1..20 (a round = pairs 1-20 × 10 kiếp, run twice: SWAP=0 and SWAP=1)
     kiếp              lives EACH seat plays in the pair's room (rebirth in the same room → next kiếp; the faster seat keeps
                       playing on until the other seat also has its kiếp, those extra lives are recorded as «extra»)
     out               output folder (default dev/handover/robot). Writes coop-<yyyymmdd-hhmm>-p<from>-<to>[-s].md (THE bug file of
                       the run, robot10 format), the results JSON next to it, saves/ (repro saves), shots/ (stuck screens; never in git)
   env SEED=<n> shifts the thân phận rotation (a new SEED = new origin × road pairs; play itself is unseeded: real co-op ids must not repeat)
       SEEDED=1 seeds Math.random per seat (repro only: it stalls rooms, see the note at mk)
       SWAP=1     the other seat order: player Y (iPad 1180x820) hosts, player X (Fold 755x1000) joins (default X hosts)
       ORIGINS=tt,dtq,…  origins the pairs draw from (default every origin of the game: ORIGINS + ORIGIN_BR); the 4 roads of each
                  origin rotate by pair and kiếp, so pairs 1-20 cover every origin × road on both seats (table in the bug file)
       PAR=1      pairs in parallel (a pair = one browser, two real-render pages, ~3–4 GB; a new pair never starts with < 3 GB free)
       WORKER=<url> the co-op Worker (default the LIVE one, https://ctm-coop.victoria-tntt.workers.dev)
       CAP=10800  wall seconds per seat-life (then that life is ended by the harness: type «cap», listed apart, not a game bug)
       PCAP=0     wall seconds per pair (0 = none) · STUCK=240 s with no room week step = stuck (bug + fresh room for the rest)
       FLUSH=4    write the .json + .md every N room weeks (also after every kiếp and on SIGTERM/INT/HUP; 0 = only those) · RESUME=<the run's .json>
                  same args: finished pairs kept, a partial pair goes on from its kiếp count · NEGTRAP=1 names the writer of a stat that goes < 0
       RTW=4      weeks between save round-trips (each seat's save → load → save in a solo scratch page; 0 = off)
       REJOIN=6   room week at which the guest reloads once per room (rejoin time, LAG set; 0 = off)
 WHAT A PAIR DOES (reuses dev/test/coop-bot.js: mk / STEP / BUOI / WORLD, the shared coop-clear taps)
   two real clients open ONE room on the Worker and auto-play (each buổi: open choices answered at random, up to 3 act cards, meets and
   acts on the friend, then «Sẵn sàng»), each seat to her OWN game ending (over()), rebirth, next kiếp, with a forced thân phận per seat-life
   (robot10-in.js: window.__forceOrigin + the road pick of a67init). Checks:
     robot10-in.js in both pages (C.coop: no in-place load in a live room, the runner's stuck check instead of the solo soft-lock check):
       one-core number audit of every card option, cổ-trang wording (cards, journal, ending text; odds ladder read from KIT_ODDS), lag per
       buổi step, the owner's tally per life (ending, cause, max rank, rank steps, metric set m)
     JS errors (pageerror + console.error) per seat · stuck (no room week step in STUCK s, trace + screenshot) · stat sanity each buổi
       (inpage6 rule: NaN / negative / over cap) · save round-trip (scratch page) · world compare every week (date, Emperor, consorts
       id/name/rank/alive/out/kids, Thái hậu, the friend's name / rank / Sủng-Danh-Sức = hers) · NPC places + where each sees the other
       every buổi (coop-bot BUOI)
     LAG set (dev/test/lib/coop-lag-hooks.js, same keys as coop-lag.js): coopTurnP95 / coopActionP95 / KB / resends / long tasks per
       device (fold = X, ipad = Y) and per game-year, rejoin ms; misses of dev/test/play-perf-budget.json «coop*» = lag bugs
 RESULTS JSON: {pairs:[{job, lives:[{seat,player,dev,tp:{origin,road},kiep,life (robot10 tally),bugs}], lag:{years:[…], run, rejoin}, bugs}]}
 */
/* NEGTRAP=1 (fixer #2): a setter on S.bac / S.sung / S.danh / S.suc records the call stack the moment one goes below 0 → the 'number' bug detail names the writer */
/* POSLOG=1 (fix #2): which field of a 'pos' frame flips and flips back within 3 s (the resend detector counts A,B,A as a resend) → LAG row posFlip */
const POSLOG=()=>{window.__posl=[];window.__posf={};const iv=setInterval(()=>{if(!window.COOP||!COOP.send||COOP.send.__pl)return;const sd=COOP.send;COOP.send=function(t,f){try{if(t&&t.t==='act'){const A=window.__actl=window.__actl||[],now=Date.now(),js=JSON.stringify(t);if(A.some(x=>now-x[0]<3000&&x[1]===js)){const k='act:'+t.k+(t.mode?':'+t.mode:'')+(t.op?':'+t.op:'');window.__posf[k]=(window.__posf[k]||0)+1}A.push([now,js]);if(A.length>80)A.shift()}
 if(t&&t.t==='pos'){const L=window.__posl,now=Date.now(),js=JSON.stringify(t);
 for(let j=L.length-1;j>=0&&now-L[j][0]<3000;j--)if(L[j][1]===js){if(j<L.length-1){const a=JSON.parse(js),m=JSON.parse(L[L.length-1][1]);const fl=k=>JSON.stringify(a[k])!==JSON.stringify(m[k]);
  for(const k of Object.keys(a))if(fl(k)){if(k==='st'){for(const q of Object.keys(a.st||{}))if(a.st[q]!==(m.st||{})[q])window.__posf['st.'+q]=(window.__posf['st.'+q]||0)+1}else window.__posf[k]=(window.__posf[k]||0)+1}}else window.__posf['(same, no change between)']=(window.__posf['(same, no change between)']||0)+1;break}
 L.push([now,js]);if(L.length>60)L.shift()}}catch(e){}return sd.apply(this,arguments)};COOP.send.__pl=1},200)};
const NEGTRAP=()=>{window.__neg=[];setInterval(()=>{try{if(typeof S!=='object'||!S)return;
 /* also the co-op friend entry (a person: ap() adds raw) — tagged 'friend.' */
 let F=null;try{F=rivals.find(v=>v&&v.coop)||null}catch(e){}
 for(const [O,tg] of [[S,''],[F,'friend.']]){if(!O||O.__nt)continue;if(O.bac<0)window.__neg.push(tg+'bac='+O.bac+' @ ARRIVED (object built with it)');Object.defineProperty(O,'__nt',{value:1,enumerable:false});
 for(const k0 of ['bac','sung','danh','suc']){const k=k0;let v=O[k];Object.defineProperty(S,k,{enumerable:true,configurable:true,get(){return v},set(x){if(typeof x==='number'&&x<0&&!(v<0)){const st=new Error().stack.split('\n').slice(2,7).map(l=>l.trim().replace(/^at /,'').replace(/ \(.*:(\d+):\d+\)$/,':$1')).join(' < ');setTimeout(()=>{if(O[k]<0){window.__neg.push(tg+k+'='+x+' @ '+st);if(window.__neg.length>20)window.__neg.shift()}},0)/* still < 0 after this task: apply() itself clamps right after its own add */}v=x}})}}}catch(e){}},100)};
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),os=require('os');
const M=__dirname,REPO=path.join(M,'..','..'),T=path.join(REPO,'dev','test');
const CB=require(path.join(T,'coop-bot.js'));const {serve,BASE}=require(path.join(T,'coop-serve.js'));
const H=require(path.join(T,'lib','coop-lag-hooks.js'));const PP=require(path.join(T,'lib','playperf.js'));
const BUDGET=JSON.parse(fs.readFileSync(path.join(T,'play-perf-budget.json'),'utf8'));
const [PF,PT,KA,OUT0]=process.argv.slice(2);
const OUT=path.resolve(OUT0||path.join(REPO,'dev','handover','robot'));
const E=process.env;const HSHA=(()=>{try{return require('child_process').execSync('git rev-parse --short=8 HEAD',{cwd:__dirname,stdio:['ignore','pipe','ignore']}).toString().trim()+(require('child_process').execSync('git status --porcelain -- :/dev/measure :/dev/test',{cwd:__dirname,stdio:['ignore','pipe','ignore']}).toString().trim()?'+dirty':'')}catch(e){return '?'}})();/* fixer #3: harness sha per hit range */const SEED=+E.SEED||1,SWAP=E.SWAP==='1',PAR=+E.PAR||1,WURL=E.WORKER||CB.WURL,CAP=(+E.CAP||10800)*1e3,PCAP=(+E.PCAP||0)*1e3,
 STUCK=(+E.STUCK||240)*1e3,FL=E.FLUSH==null?4:+E.FLUSH,RTW=E.RTW==null?4:+E.RTW,REJ=E.REJOIN==null?6:+E.REJOIN;
const sleep=ms=>new Promise(r=>setTimeout(r,ms));const rd=f=>fs.readFileSync(path.join(M,f),'utf8');
const NOISE=/Failed to load resource|net::ERR_|favicon|navigator\.vibrate/;
const DEVS={fold:[755,1000],ipad:[1180,820]};
function hash(s){let h=2166136261;for(const c of s)h=Math.imul(h^c.charCodeAt(0),16777619);return h>>>0}
const SEEDJS=s=>`(function(){let s=${s>>>0};Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`;

/* ---- the game's thân phận list (origins × roads), read from the game, never typed here ---- */
async function roads(b){const ctx=await b.newContext({viewport:{width:390,height:844}});await serve(ctx);const p=await ctx.newPage();
 await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof start==='function'&&typeof arcIds67==='function',null,{timeout:180000});
 const r=await p.evaluate(()=>{const ks=ORIGINS.map(o=>o.k).concat(Object.keys(typeof ORIGIN_BR!=='undefined'?ORIGIN_BR:{}));const o={};ks.forEach(k=>{try{o[k]=arcIds67(k)}catch(e){o[k]=[]}});return o});
 await ctx.close();return r}
/* pair n, kiếp l → the thân phận of player X and Y: X walks the origins in order, Y is 3 origins on (always another origin), both roads
   rotate with the kiếp, so 20 pairs × 10 kiếp give every origin × road to both players and new partners each kiếp */
function tpOf(R,O,n,l,who){const i=n-1+(SEED-1)*7,k=l-1;/* SEED shifts the whole rotation: a new SEED = new thân phận pairs */const o=who==='X'?O[(i+k*2)%O.length]:O[(i+3+k*3)%O.length];const rs=R[o]||[];
 return{origin:o,road:rs.length?rs[(Math.floor(i/O.length)+k+(who==='X'?0:2))%rs.length]:null}}

/* ---- page helpers ---- */
const TICK=()=>{const c=__co();const R=window.__r10;let life=null;if(R&&R.life){life=R.life;R.life=null;R.steps=[];R.maxR=-1;
  try{const z=v=>Array.isArray(v)?[]:v&&typeof v==='object'?Object.fromEntries(Object.keys(v).map(k=>[k,typeof v[k]==='number'?0:z(v[k])])):typeof v==='number'?0:v===null?null:v;for(const k in R.m)R.m[k]=k==='die'?null:z(R.m[k])}catch(e){}}
 let bad=[];if(typeof S!=='undefined'&&S&&!S.dead){for(const k of ['sung','danh','bac','suc','duc','sac','tai','tamco','th','hh','mat','an'])if(S[k]!==undefined&&(typeof S[k]!=='number'||isNaN(S[k])||(k!=='th'&&k!=='hh'&&S[k]<0)||S[k]>(k==='bac'?1e6:100)))bad.push(k+'='+S[k]+((window.__neg||[]).filter(x=>x.startsWith(k+'=')).slice(-1).map(x=>' · writer '+x)[0]||''))}
 return{life,bad,week:c.week,key:c.week+':'+(typeof S!=='undefined'&&S?S.buoi||0:'-'),dead:!!(typeof S!=='undefined'&&S&&S.dead),year:typeof S!=='undefined'&&S?S.year:null,
  frozen:c.frozen,waiting:c.waiting,world:c.world,seat:c.seat,origin:typeof S!=='undefined'&&S&&S.origin?S.origin.k:null}};
const ONE=`(()=>{const k=(${TICK.toString()})();const t=(${CB.CLR.TAP.toString()})();if(t==='x')return{k,r:'x'};let r;try{r=(${CB.STEP.toString()})()}catch(e){r='err:'+e.message}return{k,r}})()`;
/* the next thân phận for this seat's next life (read by j2 start / jcoopthinb core through __forceOrigin, the road through robot10-in's a67init) */
const SETTP=tp=>{window.__r10cfg.origin=tp.origin;window.__r10cfg.road=tp.road;window.__forceOrigin=tp.origin;window.__origO=tp.origin};
const SCR=()=>{try{return JSON.stringify({buoi:S&&S.buoi,week:COOP.state.week,bend:COOPW.bend,pendBuoi:COOPW.pendBuoi,pend:COOPW.pend,sent:COOPW.sent,Q:Q.length,Qt:Q.map(x=>String(x.t||x.title||'').slice(0,40)),mh:document.getElementById('modal').hidden,mg:!!(S&&S.mg),dead:S&&S.dead,next:(document.getElementById('next')||{}).disabled,title:!document.getElementById('title').hidden,st:COOP.state.status,peer:COOP.state.peerOnline}).slice(0,900)}catch(e){return 'scr: '+e.message}};
/* SCRX (stuck dump): the lock inputs of jcoopworld lockNext + the night gate + thin E, #next text, the COOPW trace tail */
const SCRX=()=>{const W=window.COOPW||{},n=document.getElementById('next')||{},f=(g)=>{try{return g()}catch(e){return 'x:'+e.message}};
 return {nextText:n.textContent,nextDis:n.disabled,coopWait:n.dataset&&n.dataset.coopWait,wk:f(()=>S.week),buoi:f(()=>S.buoi),
  eW:f(()=>W.eW&&W.eW()),lv:f(()=>W.thin&&W.thin.lvl),eWait:f(()=>W.eWait&&W.eWait()),eAsked:f(()=>W.eAsked&&W.eAsked()),nReady:f(()=>W.nReady&&W.nReady()),
  waiting:f(()=>W.isWaiting&&W.isWaiting()),frozen:f(()=>W.isFrozen&&W.isFrozen()),hold:W.hold,base:!!W.base,inLife:W.inLife,lvWas:W.lvWas,
  nrdy:W.nrdy,ngo:W.ngo,ngoW:W.ngoW,nfr:W.nfr,nforce:W.nforce,wantB:W.wantB,whereKey:W.whereKey,rweek:W.rweek,rbuoi:W.rbuoi,wkIn:W.wkIn,
  coop:f(()=>({week:COOP.state.week,buoi:COOP.state.buoi,ended:COOP.state.ended,bended:COOP.state.bended,seats:COOP.state.seats,status:COOP.state.status,seat:COOP.seat})),
  modal:f(()=>{const m=document.getElementById('modal');return m&&!m.hidden?m.innerText.slice(0,300):''}),tr:(W.tr||[]).slice(-150)}};
/* save round-trip in a solo scratch page: load her save (deser), save again, the two must match (fields the load only fills in are fine) */
const RT=s=>{const J=x=>String(JSON.stringify(x));function dp(a,b,p){if(a===b||a===undefined)return null;
  if(typeof a==='string'&&typeof b==='string'){let i=0;while(i<a.length&&a[i]===b[i])i++;return p+' (text differs at char '+i+'): «…'+a.slice(Math.max(0,i-30),i+40)+'» → «…'+b.slice(Math.max(0,i-30),i+40)+'»'}
  if(typeof a!==typeof b||a===null||b===null||typeof a!=='object')return p+': '+J(a).slice(0,60)+' → '+J(b).slice(0,60);for(const k of new Set(Object.keys(a).concat(Object.keys(b)))){if(/^__chg/.test(k)&&/\.visit$/.test(p))continue;if(/\.S$/.test(p)&&k==='visit'&&a.visit&&a.visit.k==='home'){if(!b.visit||b.visit.k!=='home')return p+'.visit.k: home → '+J(b.visit&&b.visit.k);continue}/* fixer #3 (whole family): a HOME visit is rebuilt by deser (j6:74 S.visit={k:'home',people:homePeople(),talked:false}) = fresh people, no msg / __feelMig / __chg markers; the next render sets them again — only k is compared */if(k==='coopRoom'&&/^save\.S$/.test(p))continue;if(k==='rkGid'&&/^save\.S$/.test(p))continue;/* fixer #4 (U3 «save.S.rkGid» ×32): the ranking guest id is THIS DEVICE's (jrank rkBase: S.rkGid = localStorage ctm-rank-id at every save); the scratch page is another device by design, so the id changes — not game state *//* fixer #3: the co-op room marker (jslots mark/solo): a life loaded OUTSIDE a room (this network-less scratch page) is solo by design, deser drops it *//* UI-only markers of the visit stage (jchat group/align): deser (j6:74) rebuilds a home visit, the next render sets them again */const r=dp(a[k],b[k],p+'.'+k);if(r)return r}return null}
 try{quiet=true;deser(JSON.parse(s));quiet=false;const d=ser();delete d.at;const s2=JSON.stringify(d);return s2===s?'':(dp(JSON.parse(s),JSON.parse(s2),'save')||'')}catch(e){quiet=false;return 'throws: '+e.message}};

/* ---- one pair (one room; a stuck room ends and the rest of the kiếp go on in a fresh room) ---- */
/* incremental save (fix #2, runners' containers get recycled): every pair in play is in LIVE; FLUSHF() writes the .json + .md of done AND live
   pairs (live ones marked partial) after every kiếp, every FLUSH room weeks (default 4) and on SIGTERM/SIGINT/SIGHUP. RESUME=<old .json>: same tag,
   finished pairs kept, a partial pair goes on from its kiếp count (lives, LAG rows, bugs carried over; the kiếp in play when it died is replayed). */
const LIVE=new Map();let FLUSHF=()=>{};
async function pair(job,TP,prev){const t0=Date.now();const bugs=new Map();const out={job,lives:[],lag:{years:[],rooms:[],rejoin:[]},rooms:0,t:{}};
 if(prev){out.lives=prev.lives||[];out.lag=prev.lag||out.lag;out.rooms=prev.rooms||0;out.t.prev=(prev.t&&prev.t.total)||0;for(const b of prev.bugs||[])bugs.set(b.type+'|'+String(b.msg).slice(0,160),Object.assign({},b,{nNew:0,shaNew:HSHA}))}/* fixer #3: hits since THIS process started (RESUME) counted apart */
 out._bugs=bugs;out._t0=t0;LIVE.set(job.id,out);
 const bug=(type,msg,detail,extra)=>{const k=type+'|'+String(msg).slice(0,160);const x=bugs.get(k);const d=String(detail||'').slice(0,600);if(x){x.n++;x.nNew=(x.nNew||0)+1;x.shaNew=HSHA;x.lastDetail=d;return x}const y=Object.assign({type,msg:String(msg).slice(0,300),detail:d,n:1,nNew:1,sha:HSHA,shaNew:HSHA,at:job.id},extra||{});bugs.set(k,y);return y};/* fixer #3: lastDetail = the newest hit; nNew = hits by THIS process (since its start / RESUME) on harness shaNew */
 const P={X:{name:'X',dev:'fold',n:0,need:job.kiep},Y:{name:'Y',dev:'ipad',n:0,need:job.kiep}};for(const l of out.lives)if(P[l.player])P[l.player].n=Math.max(P[l.player].n,l.kiep|0);
 const tpNext=who=>tpOf(TP.R,TP.O,job.pair,Math.min(P[who].n+1,99),who);
 while((P.X.n<job.kiep||P.Y.n<job.kiep)&&!(PCAP&&Date.now()-t0>PCAP)){out.rooms++;const r=await room(job,TP,P,tpNext,bug,out).catch(e=>{bug('harness','room error: '+String(e.message).split('\n')[0],String(e.stack).slice(0,400));return 'err'});
  if(r==='err'&&out.rooms>=3&&!P.X.n&&!P.Y.n)break;if(out.rooms>job.kiep*3)break}
 LIVE.delete(job.id);out.bugs=[...bugs.values()];out.t.total=Date.now()-t0+(out.t.prev||0);delete out._bugs;delete out._t0;return out}

async function room(job,TP,P,tpNext,bug,out){const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']}:{});
 const host=SWAP?P.Y:P.X,guest=SWAP?P.X:P.Y;let ret='ok';
 try{const seat={};
  for(const [pl,nm] of [[host,'A'],[guest,'B']]){const o=await CB.mk(b,nm,DEVS[pl.dev],WURL);o.pl=pl;pl.o=o;seat[nm]=o;
   /* SEEDED=1 only for a solo-like repro: a seeded Math.random repeats the co-op message / client ids across rooms and reloads → the room
      stalls (seen: idle 676 steps per week, rejoin never back) */
   if(E.SEEDED==='1')await o.ctx.addInitScript(SEEDJS(hash(job.id+':'+pl.name+':'+out.rooms+':'+SEED)));await o.ctx.addInitScript(H.WSLOG);if(E.NEGTRAP==='1')await o.ctx.addInitScript(NEGTRAP);if(E.POSLOG==='1')await o.ctx.addInitScript(POSLOG);await o.ctx.addInitScript(PP.INIT);
   o.lastBad='';o.press={};}
  const A=seat.A,B=seat.B;
  /* the scratch page (solo, no room) for the save round-trips */
  const sc=await (async()=>{const c=await b.newContext({viewport:{width:390,height:844}});await serve(c);
   /* NO network for the scratch page: loading a co-op save reconnects to the room as a third client (seen: the room stalled from the first
      round-trip on, the guest's rejoin never came back) → a socket that never opens */
   await c.addInitScript(()=>{window.COOP_URL='http://0.0.0.0:9/';window.WebSocket=class{constructor(){this.readyState=0}send(){}close(){}addEventListener(){}removeEventListener(){}};
    window.WebSocket.CONNECTING=0;window.WebSocket.OPEN=1;window.WebSocket.CLOSING=2;window.WebSocket.CLOSED=3;window.EventSource=undefined});
   await c.route(/workers\.dev/,r=>r.abort());const p=await c.newPage();await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:180000});
   await p.waitForFunction(()=>typeof deser==='function'&&typeof ser==='function',null,{timeout:180000});await p.evaluate(()=>{try{localStorage.clear()}catch(e){}});return p})();
  const inst=async(o)=>{await o.p.waitForFunction(()=>typeof start==='function'&&typeof chooseM==='function',null,{timeout:180000});const tp=tpNext(o.pl.name);o.tp=tp;o.t0=Date.now();
   await o.p.evaluate(`window.__r10cfg=${JSON.stringify({origin:tp.origin,road:tp.road,coop:1,uiEvery:0,rtEvery:1,lagMs:+E.LAGMS||3000})}`);if(E.R10IN!=='0')await o.p.evaluate(rd('robot10-in.js'))};
  const DCL={waitUntil:'domcontentloaded',timeout:180000};
  await A.p.goto(BASE,DCL);await inst(A);await A.p.waitForTimeout(2500);await CB.tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/);await A.p.waitForTimeout(500);await CB.tapText(A,/^(Mời bạn|Mời hảo hữu)/);
  if(!await CB.until(A,()=>__co().code&&__co().seat==='a',null,60000)){bug('coop-room','host could not open a room on the Worker',WURL);return 'err'}
  const code=(await A.p.evaluate(()=>__co())).code;
  await B.p.goto(BASE+'?room='+code,DCL);await inst(B);await B.p.waitForTimeout(2500);await CB.tapText(B,/^Vào phòng/,4000);
  if(!await CB.until(B,()=>__co().seat==='b'&&!__co().frozen,null,60000)){bug('coop-room','guest could not join the room',code);return 'err'}
  /* measured window starts when both are in the world */
  {const t=Date.now();while(Date.now()-t<120000){for(const o of [A,B])await CB.CLR.first(o,CB.STEP).catch(()=>'');if(await A.p.evaluate(()=>__co().world)&&await B.p.evaluate(()=>__co().world))break;await sleep(200)}}
  for(const o of [A,B]){await o.p.evaluate(PP.RESET);await o.p.evaluate(()=>{window.__wsl.length=0})}
  const rm={code,host:host.name,t0:Date.now(),weeks:0,buoi:0,turns:[],yr:{t:Date.now(),turns:[],year:null},whereDiff:0,posDiff:0,statLag:0};out.lag.rooms.push(rm);
  let lastKey='',pend={},lastStep=Date.now(),wk0=await A.p.evaluate(()=>__co().week),rejoined=false,lastRT=0;
  /* turn time per room buổi: both pressed «Sẵn sàng» on key k0 (node clock, first press) → both screens on the next key k1 (page __kch, same
     machine clock); keys both seats reached in this window, in order; a buổi one seat never pressed (timer / forced step) has no turn */
  const turnsSince=async(t)=>{const [ka,kb]=await Promise.all([A,B].map(o=>o.p.evaluate(()=>window.__kch||{}).catch(()=>({}))));
   const ks=Object.keys(ka).filter(k=>kb[k]).sort((x,y)=>Math.min(ka[x],kb[x])-Math.min(ka[y],kb[y]));const T=[];
   for(let i=1;i<ks.length;i++){const k0=ks[i-1],k1=ks[i];const t1=Math.max(ka[k1],kb[k1]);if(t1<t)continue;const pa=A.press[k0],pb=B.press[k0];
    if(pa&&pb){T.push({k0,k1,ms:Math.max(0,t1-Math.max(pa,pb))})}}rm.buoi+=ks.filter(k=>Math.max(ka[k],kb[k])>=t).length;return T};
  const yearCut=async(year,final)=>{rm.yr.turns=await turnsSince(rm.yr.t);rm.turns.push(...rm.yr.turns);const playMin=Math.max(.05,(Date.now()-rm.yr.t)/6e4);const C=await H.collect(A.p,B.p,{turns:rm.yr.turns,nbTurns:rm.yr.turns.length,playMin}).catch(e=>null);if(!C)return;
   const dev={};for(const [o,sn] of [[A,C.snA],[B,C.snB]]){const l=await o.p.evaluate(()=>window.__wsl).catch(()=>[]);const lt=(sn&&sn.lt||[]).map(x=>x.d);
    dev[o.pl.dev]={seat:o===A?'host':'guest',kbPerMin:Math.round(l.reduce((s,x)=>s+x.b,0)/1024/playMin*10)/10,upKB:Math.round(l.filter(x=>x.d==='up').reduce((s,x)=>s+x.b,0)/1024),dnKB:Math.round(l.filter(x=>x.d==='dn').reduce((s,x)=>s+x.b,0)/1024),
     posFlip:await o.p.evaluate(()=>window.__posf||null).catch(()=>null),resend:H.resend(l),resendBy:(()=>{const r={};const up=l.filter(x=>x.d==='up'&&x.ty!=='ping');for(let i=1;i<up.length;i++)for(let j=i-1;j>=0&&up[i].t-up[j].t<3000;j--)if(up[j].ty===up[i].ty&&up[j].h===up[i].h){r[up[i].ty]=(r[up[i].ty]||0)+1;break}return r})()/* fix #2: which message type resends (same rule as H.resend) */,longTasksPerMin:Math.round(lt.length/playMin*10)/10,longTaskMax:lt.length?Math.max(...lt):0,errs:o.errs.length}}
   const y={year,room:code,final:!!final,min:+playMin.toFixed(2),turns:rm.yr.turns.length,metrics:C.metrics,dev};out.lag.years.push(y);
   const over=H.verdict(C.metrics,BUDGET);for(const x of over)bug('lag','co-op LAG budget miss: '+x.split(' ')[0],x+' · game year '+year+' · room '+code+' · per device '+JSON.stringify(dev));
   const stalls=rm.yr.turns.filter(t=>t.ms<0||t.ms>30000).length;if(stalls)bug('lag','co-op buổi stall (both ready, the room took > 30 s or never stepped)',stalls+' of '+rm.yr.turns.length+' buổi in game year '+year);
   for(const o of [A,B]){await o.p.evaluate(PP.RESET).catch(()=>{});await o.p.evaluate(()=>{window.__wsl.length=0}).catch(()=>{})}rm.yr={t:Date.now(),turns:[],year:null}};
  const lifeDone=async(o,life)=>{const pl=o.pl;pl.n++;const rec={seat:o===A?'host':'guest',player:pl.name,dev:pl.dev,tp:o.tp,kiep:pl.n,extra:pl.n>pl.need,life,room:code,ms:Date.now()-o.t0,week:await o.p.evaluate(()=>__co().week).catch(()=>null)};out.lives.push(rec);
   console.log(`  ${job.id} ${pl.name}(${rec.seat}, ${pl.dev}) kiếp ${pl.n}${rec.extra?' (extra)':''}: ${o.tp.origin}/${o.tp.road} → ${life&&life.id} [${life&&life.group}${life&&life.cause?': '+String(life.cause).slice(0,50):''}] · max ${life&&(life.maxRankN||life.maxRank)} · ${life&&life.years} y · ${(rec.ms/6e4).toFixed(1)} min`);
   const tp=tpNext(pl.name);o.tp=tp;o.t0=Date.now();await o.p.evaluate(SETTP,tp).catch(()=>{});try{FLUSHF()}catch(e){console.error('flush',e.message)}};
  /* ---- play ---- */
  while(P.X.n<P.X.need||P.Y.n<P.Y.need){
   if(PCAP&&Date.now()-rm.t0>PCAP)break;
   /* each seat: the life record of a finished kiếp (before the bot taps rebirth), stat sanity, then one bot step */
   /* ONE page call per seat per step (TICK: her finished life before the bot taps rebirth + stat sanity; then the coop-clear tap, else the
      coop-bot STEP), both seats at once: the pages are CPU-bound, every extra round trip slows the room */
   const res=await Promise.all([A,B].map(o=>o.p.evaluate(ONE).catch(e=>({k:{err:e.message},r:''}))));
   for(const [o,{k,r}] of [[A,res[0]],[B,res[1]]]){if(k.err){if(/closed|crash/i.test(k.err)){bug('crash','page closed / crashed ('+o.pl.dev+')',k.err);return 'err'}continue}
    o.k=k;if(k.life)await lifeDone(o,k.life);
    for(const s of k.bad){const x=bug('number','stat out of range: '+s.replace(/=.*/s,''),s+' · '+o.pl.dev+' '+(o===A?'host':'guest')+' week '+k.week);if(x.n===1)x.save=await o.p.evaluate(()=>window.__r10&&window.__r10.lastSave).catch(()=>null)}
    /* her life is over the wall cap: the harness ends it (type cap, not a game finding) */
    if(!k.dead&&Date.now()-o.t0>CAP)await o.p.evaluate(()=>{try{die('Thử: robot hết giờ')}catch(e){}}).catch(()=>{});
    if(E.DBG){o.hist=o.hist||{};const hk=String(r).slice(0,24);o.hist[hk]=(o.hist[hk]||0)+1}
    if(r==='next'){if(!o.press[k.key])o.press[k.key]=Date.now()}else if(/^harmerr|^err:/.test(r))bug('js','bot step error ('+o.pl.dev+'): '+String(r).slice(0,160),'week '+k.week)}
   if(!A.k||!B.k)continue;
   /* a room buổi both are on (coop-bot BUOI compare) */
   if(A.k.key===B.k.key&&A.k.key!==lastKey){const [pa,pb]=[await A.p.evaluate(CB.BUOI).catch(()=>null),await B.p.evaluate(CB.BUOI).catch(()=>null)];
    if(pa&&pb&&pa.key===pb.key&&pa.ready&&pb.ready){if(pend.key!==pa.key)pend={key:pa.key,t:Date.now()};
     const pd=[];if(pa.fpl&&pb.me&&pa.fpl!==pb.me)pd.push(`host sees guest at ${pa.fpl}, guest is at ${pb.me}`);if(pb.fpl&&pa.me&&pb.fpl!==pa.me)pd.push(`guest sees host at ${pb.fpl}, host is at ${pa.me}`);
     /* robot-coop-fix-1: the friend's live stats ride her pos relay (sent on each render, jcoopworld sendPos); wait for them too, so only a stat still wrong after 5 s counts (was: compared the instant places agreed → 'one buổi late' race) */
     if((pa.where===pb.where&&!pd.length&&(!pa.fst||pa.fst===pb.mst)&&(!pb.fst||pb.fst===pa.mst))||Date.now()-pend.t>5000){
      lastKey=A.k.key;rm.cmp=(rm.cmp||0)+1;
      if(pa.where!==pb.where){rm.whereDiff++;bug('coop-where','NPC places differ between the two screens',`buổi ${pa.key} host-only [${pa.where.split(',').filter(x=>!pb.where.split(',').includes(x)).slice(0,6)}] guest-only [${pb.where.split(',').filter(x=>!pa.where.split(',').includes(x)).slice(0,6)}]`)}
      /* fixer #3: a coop-pos hit carries each page's relay state (game vs harness triage): the last pos frame heard (week.buổi place life), her own week/buổi/place, the friend entry id + palace, the thin level and the host's stored-person place (herPl7) */
      const PD=()=>{try{const f=COOPW.friend&&COOPW.friend();const m=COOPW.fpos||{};return {fpos:m.week+'.'+m.buoi+' '+m.place+' life'+(m.life|0)+(m.name?' '+m.name:''),me:(COOP.week|0)+'.'+(S.buoi||0)+' '+S.place,life:COOPW.life|0,f:f?f.id+' '+f.name+' pal '+(()=>{try{return palaceOf(f)}catch(e){return '?'}})()+' where '+(S.where||{})[f&&f.id]:null,thl:(COOPW.thin&&COOPW.thin.lvl)|0,h7:COOPW.herPl7?COOPW.herPl7():null}}catch(e){return 'ERR '+e.message}};
      const pdx=pd.length?JSON.stringify({host:await A.p.evaluate(PD).catch(()=>null),guest:await B.p.evaluate(PD).catch(()=>null)}).slice(0,600):'';
      for(const x of pd){rm.posDiff++;bug('coop-pos','where one sees the friend ≠ where the friend is','buổi '+pa.key+' '+x+' · '+pdx)}
      if((pa.fst&&pa.fst!==pb.mst)||(pb.fst&&pb.fst!==pa.mst)){rm.statLag++;bug('coop-stat','the friend\'s Sủng/Danh/Sức shown ≠ her own (one buổi late or wrong)',`buổi ${pa.key}: host sees guest ${pa.fst} (guest ${pb.mst}) · guest sees host ${pb.fst} (host ${pa.mst})`)}}}}
   /* a room week both have passed: world compare (coop-bot WORLD), year cut for the LAG set, save round-trip, rejoin */
   const wk=Math.min(A.k.week,B.k.week);
   if(wk>wk0){wk0=wk;lastStep=Date.now();rm.weeks++;if(FL&&rm.weeks%FL===0)try{FLUSHF()}catch(e){console.error('flush',e.message)}await sleep(300);
    if(E.DBG){console.log('  week '+wk+' '+((Date.now()-(rm.wt||rm.t0))/1e3).toFixed(0)+' s · host '+JSON.stringify(A.hist)+' · guest '+JSON.stringify(B.hist));A.hist={};B.hist={};rm.wt=Date.now()}
    const [a,c]=[await A.p.evaluate(CB.WORLD).catch(()=>null),await B.p.evaluate(CB.WORLD).catch(()=>null)];
    if(a&&c&&!a.me.dead&&!c.me.dead){const d=[];if(String(a.date)!==String(c.date))d.push(['date differs',`${a.date} vs ${c.date}`]);if(String(a.emp)!==String(c.emp))d.push(['Emperor differs',`${a.emp} vs ${c.emp}`]);if(a.th!==c.th)d.push(['Thái hậu alive/dead differs','']);
     const ra=new Set(a.R),rc=new Set(c.R);const oa=a.R.filter(x=>!rc.has(x)),ob=c.R.filter(x=>!ra.has(x));if(oa.length||ob.length)d.push(['consorts differ (id/name/rank/alive/out/kids)',`host-only [${oa.slice(0,4)}] guest-only [${ob.slice(0,4)}]`]);
     if(!a.friend||a.friend.name!==c.me.name)d.push(['host does not see the guest by her real name',`${a.friend&&a.friend.name} vs ${c.me.name}`]);if(!c.friend||c.friend.name!==a.me.name)d.push(['guest does not see the host by her real name',`${c.friend&&c.friend.name} vs ${a.me.name}`]);
     if(a.friend&&a.friend.rank!==c.me.rank)d.push(['host sees the guest\'s rank wrong',`${a.friend.rank} vs ${c.me.rank}`]);if(c.friend&&c.friend.rank!==a.me.rank)d.push(['guest sees the host\'s rank wrong',`${c.friend.rank} vs ${a.me.rank}`]);
     /* fixer #3: the friend's stats at week end settle like the buổi compare (each page applies the merged week, re-renders and relays her live stats; read 300 ms after the step = a race): re-read up to 5 s, only a stat still wrong counts */
     const sd=(a,c)=>{const r=[];for(const [x,y,nx] of [[a,c,'host'],[c,a,'guest']])if(x&&y&&x.fst&&y.mst)for(const k of ['sung','danh','suc'])if((x.fst[k]||0)!==(y.mst[k]||0))r.push([nx+' sees the friend\'s '+k+' wrong (week end)',`${x.fst[k]} vs ${y.mst[k]}`]);return r};
     let sdl=sd(a,c);for(const t5=Date.now();sdl.length&&Date.now()-t5<5000;){await sleep(500);const [a2,c2]=[await A.p.evaluate(CB.WORLD).catch(()=>null),await B.p.evaluate(CB.WORLD).catch(()=>null)];if(!a2||!c2||a2.me.dead||c2.me.dead||String(a2.date)!==String(a.date)||String(c2.date)!==String(c.date))break;sdl=sd(a2,c2)}
     d.push(...sdl);
     for(const [m,det] of d)bug('coop-world','world differs between the two screens: '+m,'week '+wk+' · '+det+' · origins '+A.tp.origin+'/'+B.tp.origin)}
    const yr=a&&a.date&&a.date[0];if(yr!=null){if(rm.yr.year==null)rm.yr.year=yr;else if(yr!==rm.yr.year)await yearCut(rm.yr.year)}
    if(RTW&&rm.weeks-lastRT>=RTW){lastRT=rm.weeks;for(const o of [A,B]){const s=await o.p.evaluate(()=>{try{if(!S||S.dead)return null;const d=ser();delete d.at;return JSON.stringify(d)}catch(e){return 'ERR '+e.message}}).catch(()=>null);if(!s)continue;
      if(/^ERR /.test(s)){bug('save','ser() throws ('+(o===A?'host':'guest')+')',s);continue}const r=await sc.evaluate(RT,s).catch(e=>'scratch: '+e.message);if(r)bug('save','save→load→save changes the state ('+(o===A?'host':'guest')+')',r,{save:s})}}
    if(REJ&&!rejoined&&rm.weeks>=REJ){rejoined=true;/* the reload wipes her page logs: cut the LAG window first */await yearCut(rm.yr.year);const t=Date.now();
     /* her way back (dev/test/coop-rejoin-stats.js backOn, the rejoin authority): open the game, «Chơi cùng bạn» → «Trở lại phòng» */
     await B.p.goto(BASE,{waitUntil:'domcontentloaded',timeout:180000}).catch(()=>{});await inst(B).catch(()=>{});B.t0=t;await B.p.waitForTimeout(1500);
     await CB.tapText(B,/^(Chơi cùng bạn|Cùng hảo hữu)/,8000);await B.p.waitForTimeout(600);if(!await CB.tapText(B,/^Trở lại phòng/,6000))await CB.tapText(B,/^Vào phòng|^Tiếp tục/,4000);let ok=false;
     while(!ok&&Date.now()-t<180000){for(const o of [A,B])await CB.CLR.first(o,CB.STEP).catch(()=>'');ok=await B.p.evaluate(()=>!!(window.COOP&&COOP.seat==='b'&&!COOP.frozen&&window.COOPW&&COOPW.on&&typeof S!=='undefined'&&S)).catch(()=>false)&&await A.p.evaluate(()=>!COOP.frozen).catch(()=>false);if(!ok)await sleep(250)}
     const ms=ok?Date.now()-t:-1;out.lag.rejoin.push({room:code,week:rm.weeks,ms});console.log(`  ${job.id} rejoin (guest re-opens the game) ${ms} ms`);if(!ok)bug('coop-rejoin','the guest leaves and comes back («Trở lại phòng») and is not back in her seat within 180 s','room '+code+' week '+rm.weeks);
     /* the reload lost her page-side tally of the current life (robot10-in state): her next ending is still recorded */
     await B.p.evaluate(()=>{window.__wsl&&(window.__wsl.length=0)}).catch(()=>{});lastStep=Date.now()}}
   if(Date.now()-lastStep>STUCK){const tr=[];for(const o of [A,B])tr.push((o===A?'host ':'guest ')+await o.p.evaluate(SCR).catch(e=>e.message));
    const x=bug('stuck','co-op room stuck: no room week step in '+STUCK/1e3+' s',tr.join(' || '));if(x.n===1){x.save=await A.p.evaluate(()=>window.__r10&&window.__r10.lastSave).catch(()=>null);const d=path.join(OUT,'shots');fs.mkdirSync(d,{recursive:true});
     for(const o of [A,B]){const f=path.join(d,`${job.id}-r${out.rooms}-${o===A?'host':'guest'}-stuck.png`);await o.p.screenshot({path:f}).catch(()=>{});(x.shots=x.shots||[]).push(path.relative(OUT,f))}}
    /* fixer #5 (week-end stuck family): every stuck room dumps WHY #next is locked on each seat (SCR's `next` = #next.disabled) + the COOPW trace tail */
    for(const o of [A,B]){const sd=path.join(OUT,'stuck');fs.mkdirSync(sd,{recursive:true});const j=await o.p.evaluate(SCRX).catch(e=>({err:e.message}));j.scr=await o.p.evaluate(SCR).catch(e=>e.message);
     fs.writeFileSync(path.join(sd,`${job.id}-r${out.rooms}-w${rm.weeks}-${o===A?'host':'guest'}.json`),JSON.stringify(j,null,1))}
    ret='stuck';break}
   await sleep(40)}
  await yearCut(rm.yr.year,true);rm.min=+((Date.now()-rm.t0)/6e4).toFixed(1);
  const tm=rm.turns.map(x=>x.ms).filter(x=>x>=0);rm.turnP95=PP.pct(tm,95);
  /* harvest: page errors, robot10-in bugs (one-core, wording, lag) of both seats */
  for(const o of [A,B]){const who=(o===A?'host ':'guest ')+o.pl.dev;for(const m of [...new Set(o.errs)])bug('js','['+who+'] '+m.split('\n')[0].slice(0,200),'room '+code);
   const rb=await o.p.evaluate(()=>window.__r10?window.__r10.bugs:[]).catch(()=>[]);if(E.NEGTRAP==='1'){const ng=await o.p.evaluate(()=>window.__neg||[]).catch(()=>[]);for(const x of ng)bug('number','below 0 ('+(o===A?'host':'guest')+'): '+x.split(' @ ')[0].replace(/=.*/,''),x.slice(0,500))}for(const x of rb)bug(x.type,x.msg,x.detail+(x.at?' @ '+x.at:'')+' · '+who,{n:x.n,save:x.save})}
  console.log(`  ${job.id} room ${code} (${host.name} hosts): ${rm.weeks} weeks · ${rm.buoi} buổi · ${rm.min} min · turn p95 ${rm.turnP95} ms · ${ret}`);
 }finally{await b.close().catch(()=>{})}
 return ret}

/* ---- run ---- */
(async()=>{if(!PF){console.log('usage: node dev/measure/robot10-coop.js <pairFrom> <pairTo> <kiếp> [out]   (env SEED SWAP ORIGINS PAR WORKER CAP PCAP STUCK RTW REJOIN)');return}
 if(!fs.existsSync(path.join(REPO,'dev','index.html'))){console.error('dev/index.html missing: run python3 dev/build/assemble.py first');process.exit(2)}
 const b=await chromium.launch();const R=await roads(b);await b.close();
 const O=(E.ORIGINS?E.ORIGINS.split(','):Object.keys(R)).filter(k=>R[k]);if(!O.length){console.error('no origin; the game has: '+Object.keys(R).join(' '));process.exit(2)}
 const TP={R,O};const K=+KA||1;const jobs=[];for(let n=+PF;n<=+(PT||PF);n++)jobs.push({pair:n,kiep:K,swap:SWAP,seed:SEED,id:`coop-p${String(n).padStart(2,'0')}${SWAP?'s':''}-S${SEED}`});
 const stamp=new Date().toISOString().slice(0,16).replace(/[-:]/g,'').replace('T','-');let tag=`coop-${stamp}-p${PF}-${PT||PF}${SWAP?'-s':''}`;
 const PREV=new Map();if(E.RESUME){const J=JSON.parse(fs.readFileSync(E.RESUME,'utf8'));tag=J.run.tag;for(const x of J.pairs||[])PREV.set(x.job.id,x);console.log('RESUME '+E.RESUME+': '+[...PREV.values()].map(x=>x.job.id+(x.partial?' partial ':' done ')+x.lives.length+' lives').join(' · '))}
 fs.mkdirSync(path.join(OUT,'saves'),{recursive:true});const T0=Date.now();
 console.log(`ROBOT-10 CO-OP pairs ${PF}-${PT||PF} · ${K} kiếp per seat · ${SWAP?'Y (iPad) hosts':'X (Fold) hosts'} · seed ${SEED} · ${PAR} parallel · origins ${O.join(' ')} · Worker ${WURL}`);
 const done=[];for(const j of jobs.slice()){const x=PREV.get(j.id);if(x&&!x.partial){done.push(x);jobs.splice(jobs.indexOf(j),1)}}const planned=jobs.length+done.length;let k=0;const roomy=async()=>{for(let w=0;w<60&&os.freemem()<3e9;w++)await sleep(5000)};
 const parts=()=>done.concat([...LIVE.values()].map(o=>Object.assign({},o,{_bugs:undefined,_t0:undefined,partial:true,bugs:[...o._bugs.values()],t:{total:Date.now()-o._t0+(o.t.prev||0)}})));
 const save=(ps)=>{const f=path.join(OUT,tag+'.json');fs.writeFileSync(f+'.tmp',JSON.stringify({run:{tag,argv:process.argv.slice(2),seed:SEED,swap:SWAP,worker:WURL,origins:O},pairs:ps.map(x=>Object.assign({},x,{bugs:x.bugs.map(b=>Object.assign({},b,{save:undefined}))}))},null,1));fs.renameSync(f+'.tmp',f)};
 FLUSHF=()=>{const ps=parts();report(ps.slice(),{length:planned,0:{kiep:K}},tag,Date.now()-T0,true);save(ps)};/* report first: it names the repro saves (saveFile) the .json keeps */
 for(const sg of ['SIGTERM','SIGINT','SIGHUP'])process.on(sg,()=>{try{FLUSHF();console.log('flushed on '+sg)}catch(e){console.error(e)}process.exit(130)});
 await Promise.all(Array.from({length:Math.min(PAR,jobs.length)},async(_,wi)=>{if(wi)await sleep(wi*20000);while(k<jobs.length){await roomy();const j=jobs[k++];let r;
  try{r=await pair(j,TP,PREV.get(j.id))}catch(e){r={job:j,lives:[],lag:{years:[],rooms:[],rejoin:[]},bugs:[{type:'harness',msg:'runner error: '+String(e.message).split('\n')[0],detail:String(e.stack).slice(0,300),n:1}],t:{total:0}}}
  done.push(r);FLUSHF();console.log(`${j.id}: ${r.lives.length} lives · ${r.bugs.length} bugs · ${(r.t.total/6e4).toFixed(1)} min`)}}));
 report(done,{length:planned,0:{kiep:K}},tag,Date.now()-T0)})().catch(e=>{console.error(e);process.exit(1)});

function report(done,jobs,tag,ms,quiet){done.sort((a,b)=>a.job.pair-b.job.pair);
 const all=new Map();for(const r of done)for(const b of r.bugs){const k=b.type+'|'+b.msg.replace(/\((host|guest)\)|\[(host|guest) (fold|ipad)\] /g,'');const x=all.get(k)||{type:b.type,msg:b.msg,pairs:[],n:0,nNew:0,ex:b};if(!x.pairs.includes(r.job.id))x.pairs.push(r.job.id);x.n+=b.n;x.nNew+=b.nNew||0;if(b.lastDetail)x.last=b.lastDetail;if(b.shaNew)x.shaNew=b.shaNew;all.set(k,x)}
 const ORDER=['crash','stuck','js','coop-world','coop-room','coop-rejoin','save','number','word','coop-where','coop-pos','coop-stat','lag','harness'];
 const bl=[...all.values()].sort((a,b)=>(ORDER.indexOf(a.type)+1||99)-(ORDER.indexOf(b.type)+1||99)||b.pairs.length-a.pairs.length);
 const saveOf=x=>{if(!x.ex.save)return x.ex.saveFile||'';const f=path.join('saves',`${tag}-${hash(x.type+'|'+x.msg).toString(36)}.json`);if(!fs.existsSync(path.join(OUT,f)))fs.writeFileSync(path.join(OUT,f),typeof x.ex.save==='string'?x.ex.save:JSON.stringify(x.ex.save));x.ex.saveFile=f;return f};/* stable name per bug: a flush rewrites the same file */
 const lives=done.flatMap(r=>r.lives.map(l=>Object.assign({pair:r.job.id},l)));
 const caps=lives.filter(l=>l.life&&/robot hết giờ/.test(l.life.fate||''));
 const yrs=done.flatMap(r=>r.lag.years.map(y=>Object.assign({pair:r.job.id},y)));
 const md=[`# ROBOT-10 CO-OP run ${tag} (UTC)`,'',
  `Game: dev/index.html of this checkout (assemble.py) · Worker ${WURL} · ${done.length} pairs (${jobs.length} planned) × ${jobs[0]&&jobs[0].kiep} kiếp per seat · ${SWAP?'Y (iPad 1180x820) hosts, X (Fold 755x1000) joins':'X (Fold 755x1000) hosts, Y (iPad 1180x820) joins'} · ${PAR} parallel · wall ${(ms/6e4).toFixed(1)} min`,
  `Runner: node dev/measure/robot10-coop.js ${process.argv.slice(2).join(' ')} · harness ${HSHA}${E.RESUME?' (RESUMED: «since this process started» counts only hits of this harness)':''} (SEED=${SEED}${SWAP?' SWAP=1':''}${E.ORIGINS?' ORIGINS='+E.ORIGINS:''}) · repro: a save from saves/ into localStorage "hclh-save-v2-1", «Tiếp tục kiếp này» (Ô 1) for the seat's own state; co-op bugs reproduce with the same pair + SEED`,'',
  `## Bugs (${bl.length} distinct; one row per bug, pairs = how many pairs hit it)`,'',
  bl.length?bl.map((x,j)=>`${j+1}. **${x.type}** — ${x.msg}\n   - pairs ${x.pairs.length}/${done.length} (${x.pairs.slice(0,4).join(', ')}${x.pairs.length>4?' …':''}) · hits ${x.n} (${x.nNew} since this process started, harness ${x.shaNew||'earlier run'})\n   - first: ${(x.ex.detail||'').replace(/\n/g,' ').slice(0,400)}\n`+(x.last&&x.last!==x.ex.detail?`   - last: ${x.last.replace(/\n/g,' ').slice(0,400)}\n`:'')+(x.ex.save?`   - repro save: ${saveOf(x)}\n`:'')+(x.ex.shots?`   - screenshots: ${x.ex.shots.join(', ')} (not in git)\n`:'')).join('\n'):'None.','',
  `## Lives (${lives.length}; ${caps.length} ended by the wall cap = not a game ending)`,'',
  '| pair | player | seat | device | kiếp | thân phận | ending | max rank | years | wall min | room |','|---|---|---|---|---|---|---|---|---|---|---|',
  ...lives.map(l=>`| ${l.pair} | ${l.player} | ${l.seat} | ${l.dev} | ${l.kiep}${l.extra?' (extra)':''} | ${l.tp.origin}/${l.tp.road||'?'} | ${l.life?l.life.id+' ['+l.life.group+(l.life.cause?': '+String(l.life.cause).slice(0,50):'')+']':'?'} | ${l.life?(l.life.maxRankN||l.life.maxRank):''} | ${l.life&&l.life.years!=null?l.life.years:''} | ${(l.ms/6e4).toFixed(1)} | ${l.room} |`),'',
  '## LAG set (per pair room and game year; coop-lag-hooks keys; fold = X, ipad = Y)','',
  '| pair | room | game year | min | buổi | turn p95 | action p95 | sync KB max | KB/min | resend/min | long tasks/min | long max | fold KB/min · lt/min | ipad KB/min · lt/min |','|---|---|---|---|---|---|---|---|---|---|---|---|---|---|',
  ...yrs.map(y=>{const m=y.metrics,f=y.dev.fold||{},p=y.dev.ipad||{};return`| ${y.pair} | ${y.room} | ${y.year}${y.final?' (end)':''} | ${y.min} | ${y.turns} | ${m.coopTurnP95} | ${m.coopActionP95} | ${m.coopSyncKBMax} | ${m.coopKBPerMin} | ${m.coopResendPerMin} | ${m.coopLongTasksPerMin} | ${m.coopLongTaskMax} | ${f.kbPerMin} · ${f.longTasksPerMin} | ${p.kbPerMin} · ${p.longTasksPerMin} |`}),'',
  '## Rooms','','| pair | room | host | weeks | buổi | min | turn p95 ms | NPC place diffs | friend-position diffs | friend-stat lags | rejoin ms |','|---|---|---|---|---|---|---|---|---|---|---|',
  ...done.flatMap(r=>r.lag.rooms.map(m=>`| ${r.job.id} | ${m.code} | ${m.host} | ${m.weeks} | ${m.buoi} | ${m.min} | ${m.turnP95} | ${m.whereDiff} | ${m.posDiff} | ${m.statLag} | ${(r.lag.rejoin.find(x=>x.room===m.code)||{ms:''}).ms} |`)),''].join('\n');
 const f=path.join(OUT,tag+'.md');fs.writeFileSync(f,md);if(!quiet)console.log('bug file: '+f+' · '+bl.length+' distinct bugs')}
