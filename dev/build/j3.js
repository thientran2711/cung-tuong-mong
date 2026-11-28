
/* portraits */
const AV=window.AVATARS||{women:[],emperor:[],maids:[]};
function drawFace(){const n=(AV.women||[]).length;if(!n)return{face:-1,hue:0};S.usedFaces=S.usedFaces||[];
  let free=[...Array(n).keys()].filter(i=>!S.usedFaces.includes(i));let hue=0;
  if(!free.length)return{face:-1,hue:0};const f=pick(free);S.usedFaces.push(f);return{face:f,hue:0}}
function srcW(o){return o&&o.face>=0&&AV.women&&AV.women[o.face]?AV.women[o.face]:""}
function pv(v){const g=rkOfFace("consort",v);return{rk:g[0],rw:g[1],w:["r",v.id],src:fsrc(v.fc,srcW(v)),hue:0,ini:v.name.split(" ").pop()[0],col:RCOL[v.queen?7:v.rank]}}
function pEmp(){return{rk:"emp",rw:"Hoàng thượng",w:["e"],src:fsrc(S.emp.fc,(AV.emperor||[])[S.emp.face]||""),hue:0,ini:"Đế",col:"#f0d070"}}
function pTH(){return{rk:"th",rw:"Thái hậu",w:["t"],src:fsrc(S.thF,AV.empress_dowager||""),hue:0,ini:"Từ",col:"#c9a0e0"}}
function pMaid(){const m=S.maid;return{rk:"sv"+BAL.srvRk.dai,rw:kitMaidTitle(m),w:["m"],src:maidSrc(m),hue:0,ini:m.name.split(" ").pop()[0],col:"#b9a48a"}}
/* faces by role and age band, fixed for life (saved): young maids img/face-maid-1..6; the elderly portrait only for an old nurse role (nhũ mẫu / ma ma, 45+) */
function maidSrc(m){return fsrc(m.fc,m.old&&m.age>=45&&AV.maids&&AV.maids[1]?AV.maids[1]:"")}
function eunBand(age){return Math.min(3,ageBandIx(age))}
function pMe(){const g=rkOfFace("consort",S);return{rk:S.out?"cold":g[0],rw:S.out?"Lãnh cung":g[1],w:["me"],src:fsrc(S.fc,srcW(S)),hue:0,ini:S.name.split(" ").pop()[0],col:RCOL[S.rank]}}
function pMsg(){const t=S&&S.court&&S.court.tq;return{src:t?courtSrc("tq",t):"img/face-eunuch-4.webp",hue:0,ini:"Hoạn",col:"#8a8aa0"}}
function pDoc(){return{rk:"off",rw:"Thái y",w:["d"],src:fsrc(S&&S.court&&S.court.ty&&S.court.ty.fc,"img/face-physician.webp"),hue:0,ini:"Y",col:"#8fc38a"}}
function mdH(p,cls){return `<span class="md ${cls||""}${kitRkCls(p)}" style="--c:${p.col}">${p.src?`<img src="${p.src}" alt="" data-i="${p.ini}" onerror="kitImgErr(this,{text:1})">`:p.ini}</span>`}
function newMaid(name,loyal,age){return{name,loyal,age:age||16+R(7),fc:""}}

/* modal queue */
function pushModal(m){Q.push(m);return m}/* save-unseen-lists r4: hands the card back (a registered generator returns it) */
/* DIALOG-ORDER r2: the ONE tap hook of the queue rule (jdayq dqTap: a card nobody can see never makes her tap dead; what her tap opens goes to the
   FRONT). Registered HERE, before every other module, on window capture: it runs before any handler of her tap reads Q */
try{["pointerdown","pointerup","click","keydown","touchstart"].forEach(k=>window.addEventListener(k,e=>{try{if(window.dqTap)window.dqTap(k,e)}catch(x){}},true))}catch(e){}
/* saveable pending choices: a modal with opts is stored as {pid,pp,t}; PEND[pid](pp) rebuilds text and handlers */
const PEND={};const RV=id=>rivals.find(x=>x.id===id)||null;
function mkP(id,pp){pp=pp||{};const d=PEND[id]&&PEND[id](pp);if(!d)return null;d.pid=id;d.pp=pp;return d}
function pushDil(d,title){if(!d)return"";const m={t:title||"Việc khó xử",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp};if(d.art)m.art=d.art;pushModal(m);return""}
function WHO(w){if(!w)return null;const v=w[0]==="r"?RV(w[1]):null;return w[0]==="r"?(v?pv(v):null):w[0]==="e"?pEmp():w[0]==="t"?pTH():w[0]==="m"?pMaid():w[0]==="me"?pMe():w[0]==="d"?pDoc():null}
/* the ☰ title menu and its sub pages (cls kptitle, j74 HM/SM) are screens, not events: a save made while one is open must not keep it (loading that save over a live kiếp, e.g. "Tiếp tục" / "Xem lại lời dặn", brought an empty menu back ~1 in 4) */
const isMenuCard=m=>!!(m&&/\bkptitle\b/.test(m.cls||""));
/* night-ledger-coop r4 (Foreman B ruling 1, OD L680 «open dialogs resolved safely / carried»): a choice card with no pid is carried as DATA —
   its generator (rcpReg kind) + its arguments with every person as an id ({"@p":emoKey}) — and made again by that generator against the world
   it lands in (a save, the co-op week merge that rebuilds S / rivals from JSON, the AFK carry). A person who no longer exists → the card
   LAPSES (no effect, one short log line), never a road whose effect is lost. A choice card with no generator also lapses with the log line
   where the merge / carry would drop it (serQ({lap:1})). The person lookup is the shared one (jemo emoKey / emoByKey). */
const QRC={};let RCPRE=0;const RCP_MAX=4000;/* the carried args of one card (chars) */
/* save-unseen-lists r3: a confidant maid has no id / sid — carried as «maid» (hers) or «maid:<rival id>»; any other person with no key is never
   copied into ra (a copy is a stranger after a load): rcpEnc throws → the card stays a code card, counted as such */
function rcpMaid(x){if(!S||!x)return null;if(x===S.maid)return"maid";for(const v of (typeof rivals!=="undefined"&&rivals)||[])if(v&&v.maid===x&&v.id!=null)return"maid:"+v.id;return null}
function rcpByKey(k){const q=String(k);if(q==="maid")return S.maid||null;if(/^maid:/.test(q))return((typeof rivals!=="undefined"&&rivals||[]).find(v=>String(v.id)===q.slice(5))||{}).maid||null;return typeof emoByKey==="function"?emoByKey(q):null}
function rcpPerson(x){return typeof x.name==="string"&&("loyal" in x||"net" in x||"role" in x)}
function rcpP(x){try{if(!x||typeof x!=="object"||typeof emoKey!=="function")return null;const mk=rcpMaid(x);if(mk)return mk;if(!(x===S||(S&&x===S.emp)||(S&&x===S.thO)||x.id!=null||x.sid!=null))return null;
 const k=emoKey(x);if(!k||/^x\d/.test(k))return null;return emoByKey(k)===x?k:null}catch(e){return null}}
function rcpEnc(x,d){d=d||0;if(d>4)throw 0;if(x==null||typeof x==="number"||typeof x==="string"||typeof x==="boolean")return x;if(typeof x==="function")throw 0;
 const k=rcpP(x);if(k!=null)return {"@p":k};if(Array.isArray(x))return x.map(y=>rcpEnc(y,d+1));
 if(Object.getPrototypeOf(x)!==Object.prototype||rcpPerson(x))throw 0;const o={};for(const i in x)o[i]=rcpEnc(x[i],d+1);return o}
function rcpDec(x){if(x==null||typeof x!=="object")return x;if(Array.isArray(x))return x.map(rcpDec);
 if("@p" in x){const p=rcpByKey(x["@p"]);if(!p||p.alive===false||p.dead)throw 0;return p}const o={};for(const i in x)o[i]=rcpDec(x[i]);return o}
/* wrap a card generator: every choice card it returns carries rk (kind) + ra (its arguments, people as ids); RCPRE = 1 while a card is made again */
function rcpReg(k,fn){QRC[k]=fn;return function(){const m=fn.apply(this,arguments);try{if(m&&m.opts&&m.opts.length&&!m.pid&&!RCPRE){const a=rcpEnc([...arguments]);const j=JSON.stringify(a);if(j.length<RCP_MAX){m.rk=k;m.ra=a}else m.__rkLen=j.length}}catch(e){/* save r6: its arguments are not data (code / a non-person object): mark it, the probe names the generator */try{if(m&&typeof m==="object")m.__rkErr=k}catch(x){}}return m}}
const QRCF=[];const rcpF=(e,w)=>{QRCF.push([e&&e.rk,w,typeof day==="function"?day():0]);if(QRCF.length>20)QRCF.shift();return null};window.__rcpFail=QRCF;/* debug: why a card could not be made again */
function rcpMk(e){const fn=QRC[e&&e.rk];if(!fn)return rcpF(e,"no generator");let a;try{a=rcpDec(e.ra||[])}catch(x){return rcpF(e,"person gone "+JSON.stringify(e.ra).slice(0,80))}RCPRE=1;let m=null;const Q0=typeof Q!=="undefined"?Q:null,had=new Set(Q0||[]);try{m=fn.apply(null,a)}catch(x){m=null;rcpF(e,"threw "+(x&&x.message))}finally{RCPRE=0;/* save-unseen-lists r2: a generator that queues its own card (kitPanel) hands it back here, never a second copy in Q */try{if(m&&Q0&&Q===Q0&&!had.has(m)){const i=Q.indexOf(m);if(i>=0)Q.splice(i,1)}}catch(x){}}
 if(!m||!m.opts||!m.opts.length)return rcpF(e,"no choice now");m.rk=e.rk;m.ra=e.ra;if(e.t)m.t=e.t;if(e.cls&&!m.cls)m.cls=e.cls;return m}
const rcpLapse=t=>{try{log(`«${String(t||"Việc khó xử").replace(/</g,"&lt;")}»: việc đã qua, không còn kịp đáp.`)}catch(e){}};
/* one card in its save form: pid → {pid,pp,t}; a carried generator card → {rk,ra,t,cls}; a notice → its text; a choice with no route → lap (opt.lap) or nothing */
/* button-crawl-fix-2 (owner OD 25/11 ~05:10Z, flight2 saves: 1998 copies of an EMPTY «Tâm trạng · X» card in one co-op save):
   (1) a LOOK-UP panel (kit spec.look: Tâm trạng · X, Đã biết về X, Chứng cứ về X, Thỉnh tranh nhân vật) is a screen she opens herself, built from the
       live world: it is never saved (it came back as a bare title with an empty body, and every save round trip carried the copies on);
   (2) any other kit card (its body lives in m.kit, m.h is empty) is saved WITH its kit spec (people as ids, code left out), so it comes back whole;
   (3) old saves: empty notices (no body, no kit) and repeats of the same notice are dropped on load (deserQ). */
const isLookCard=m=>!!(m&&m.kit&&(m.kit.look||m.kit.view));/* button-crawl-fix-5: a view panel (spec.view, live status) is not saved either */
const LOOK_T=/^(Tâm trạng · |Đã biết về |Chứng cứ về |Thỉnh tranh nhân vật)/;
function kqEnc(x,d){d=d||0;if(d>7)throw 0;if(x==null||typeof x==="number"||typeof x==="string"||typeof x==="boolean")return x;if(typeof x==="function")return undefined;
 const k=rcpP(x);if(k!=null)return {"@p":k};if(Array.isArray(x))return x.map(y=>{const v=kqEnc(y,d+1);return v===undefined?null:v});
 if(Object.getPrototypeOf(x)!==Object.prototype)throw 0;const o={};for(const i in x){if(i==="onClose"||i==="opts")continue;const v=kqEnc(x[i],d+1);if(v!==undefined)o[i]=v}return o}
function kqKit(m){try{if(!m||!m.kit||m.h||m.opts||isLookCard(m))return undefined;const o=kqEnc(m.kit);const j=JSON.stringify(o);return j&&j.length<24000?o:undefined}catch(e){return undefined}}
function kqDec(x){if(x==null||typeof x!=="object")return x;if(Array.isArray(x))return x.map(kqDec);if("@p" in x){const p=rcpByKey(x["@p"]);return p&&p.alive!==false&&!p.dead?p:null}
 const o={};for(const i in x)o[i]=kqDec(x[i]);return o}
/* save-pid-cards (LAW 6c + LAW 11, every pid kind; reports/save-pid-cards.md): a pid card was written as {pid,pp,t} only, so whatever its maker or
   a wrapper put on the card AFTER mkP (q72o chips qtags «Tra xét · Hạn 4 tuần», pushDil's event picture art, the pacing flag opt, the tsb title
   given by tsbCard's caller…) was lost on a reload: the card came back changed. ONE rule: the card's own plain-data fields (no code, no people,
   ≤ PIDX_MAX chars each; never h / opts / who: those are made again by mkP against the loaded world) ride along as x and come back where the
   rebuilt card has no such field; with x, the title she saw is kept (q.__ts: the per-kind deserQ wrappers never retitle it). Old saves (no x) as before. */
const PIDX_MAX=1500,PIDX_SKIP=new Set(["pid","pp","t","h","opts","who","w","thin"]);
function pidX(m){const x={};let n=0;for(const k in m){if(PIDX_SKIP.has(k)||k[0]==="_"||k[0]==="$")continue;const v=m[k];if(v==null||typeof v==="function")continue;
  let j;try{j=JSON.stringify(v)}catch(e){continue}if(j==null||j.length>PIDX_MAX||/"(?:alive|rel|sid)":/.test(j))continue;x[k]=JSON.parse(j);n++}return n?x:1}
function serM(m,opt){return isMenuCard(m)||isLookCard(m)?null:m.pid?{pid:m.pid,pp:m.pp,t:m.t,x:pidX(m)}:m.rk?{rk:m.rk,ra:m.ra,t:m.t,cls:m.cls}:m.opts?(opt&&opt.lap?{lap:1,t:m.t}:null):(k=>k?{t:m.t,h:m.h,cls:m.cls,btn:m.btn,w:m.who&&m.who.w,kit:k}:{t:m.t,h:m.h,cls:m.cls,btn:m.btn,w:m.who&&m.who.w})(kqKit(m))}
function serQ(opt){return Q.map(m=>serM(m,opt)).filter(Boolean)}
function deserQ(L){const out=[],seen=new Set();for(const e of L||[]){try{if(e.lap){rcpLapse(e.t);continue}if(e.rk){const m=rcpMk(e);if(m)out.push(m);else rcpLapse(e.t);continue}if(e.pid){const d=mkP(e.pid,e.pp);if(d){const q={t:e.t||"Việc khó xử",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,cls:d.cls};if(d.art)q.art=d.art;/* as pushDil */if(e.x){q.__ts=1;if(typeof e.x==="object")for(const k in e.x)if(q[k]==null)q[k]=e.x[k]}out.push(q)}}else if(e.kit){const sp=kqDec(e.kit);if(sp&&typeof sp==="object"){const sub=sp.subject;if(sub==null)delete sp.subject;out.push({t:e.t||sp.title||"",h:"",kit:sp,btn:e.btn||sp.btn,cls:e.cls,who:sub?(sub.src!==undefined?sub:(typeof kitFace==="function"?kitFace(sub):null)):WHO(e.w)})}}
  else if(!isMenuCard(e)){if(!String(e.h||"").replace(/<[^>]*>/g,"").trim()&&!/\bpcm\b/.test(e.cls||""))continue;/* (3) an empty notice (an old look-up panel or kit card saved without its body) */
   const sig=JSON.stringify([e.t,e.h,e.cls,e.btn]);if(seen.has(sig))continue;seen.add(sig);out.push({t:e.t,h:e.h,cls:e.cls,btn:e.btn,who:WHO(e.w)})}}catch(x){}}return out}
/* KIT 32.10: a dialog option that only closes ("Thôi" / "Lui" / "Đóng" / "Đã hiểu", no effect) is never drawn as a button: the dialog
   gets the kit ✕ instead (jk4 kitCloseSync), and ✕ / a tap outside / Esc run that option. A dialog with options and no such option is
   a forced choice: no ✕, no tap-outside, no Esc. */
const KIT_CLOSE_W=/^(?:✕\s*)?(?:‹\s*)?(Thôi|Lui|Đóng|Đã hiểu|Đã rõ|OK|Xong)$/;
function kitCloseTxt(h){return String(h==null?"":h).replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim()}
function kitCancelIx(m){if(!m||!m.opts||m.mustChoose)return -1;return m.opts.findIndex(c=>c&&KIT_CLOSE_W.test(kitCloseTxt(c.n))&&(!c.fx||Object.keys(c.fx).every(k=>!c.fx[k])))}
/* KIT §6.2i ONE COPY OF A DIALOG (KK44, owner ruling 26/11 ~17:55Z via MAIN 161: fix the dead-close family at the ROOT): every dialog in the game becomes
   visible through showModal, so the one-copy guard runs at its ONE outer entry (jnolock, the outermost showModal wrapper, calls kitDlgFold before any
   inner wrapper rewrites the front card), not in each opener. An IDENTICAL waiting copy of the dialog in front (same title, class,
   body, kit spec and option names — a fast double tap on its opener queued two) is folded into the front one as a twin (m.__tw) instead of waiting behind it
   (the old symptom: the first ✕ «did nothing», the same dialog came straight back). A twin is never dropped silently: it RESOLVES WITH its kept twin
   (kitDlgTwinsDone, from closeModal and chooseM) the same way: closed with ✕ / «Đã rõ» → its own onClose runs too (a flow that waits on that dialog still
   hears back); answered with an option → like the kept one, no onClose, and the option's effects never run a second time (one tap = one spend). The co-op thin cards and the life card (m.nl) are never folded (own queues). */
function kitDlgSig(m){try{return m?String(m.t||"")+"|"+(m.cls||"")+"|"+(typeof m.h==="string"?m.h:"")+"|"+JSON.stringify(m.kit||null)+"|"+(m.opts?m.opts.map(o=>o&&o.n).join("/"):"")+"|"+(m.btn||""):""}catch(e){return null}}
/* the signature is taken the first time the guard sees a card (still as its opener queued it; inner wrappers later rewrite the front card) */
function kitDlgSg(m){if(m.__sg==null)m.__sg=kitDlgSig(m);return m.__sg}
function kitDlgFold(){kitDlgArm();try{const m=Q[0];if(!m||m.thin||m.nl)return;kitDlgSg(m);if(Q.length<2)return;let g=null;for(let i=Q.length-1;i>=1;i--){const q=Q[i];if(!q||q===m||q.thin||q.nl||(q.t||"")!==(m.t||""))continue;if(g===null)g=kitDlgSg(m);if(!g||kitDlgSg(q)!==g)continue;Q.splice(i,1);(m.__tw=m.__tw||[]).push(q)}}catch(e){console.error("kitDlgFold",e)}}
function kitDlgTwinsDone(m,picked){const T=m&&m.__tw;if(!T||!T.length)return;m.__tw=null;for(const t of T){try{if(!picked&&t.onClose&&t.onClose!==m.onClose)t.onClose()}catch(e){console.error("kitDlgTwin onClose",e)}try{kitDlgTwinsDone(t,picked)}catch(e){}}}
/* KIT §6.2j ONE TAP = ONE ACTION (KK44, MAIN 160/161 double-tap family, law 11): the second tap of a fast double tap lands on whatever the first tap opened —
   a confirm / buy / give / option card under the finger — and spent a second action. When a NEW dialog comes to the front (kitDlgFold, the ONE outer
   showModal entry) a real (trusted) tap inside #modal is not taken when it is the 2nd tap of a double tap: the tap before it, at the same spot (BAL.kdlg.tapNear px) and within BAL.kdlg.tapArm ms, opened this dialog. A single fast tap on a just-opened dialog is taken. Scripted clicks
   (robots, tests, co-op relays) are never held. Test: dev/test/double-tap-scan.js. */
let kDlgFront=null,kDlgAt=0;
function kitDlgArm(){try{const m=Q[0];if(m&&m!==kDlgFront){kDlgFront=m;kDlgAt=performance.now()}}catch(e){}}
let kTapLast=null;/* what a tap can spend (khắc / Bạc / Sức / items): read when each tap lands */
const KTAP_HELD=["inv","items","tt","tutrang","cloth","gifts","pets"];/* every list of things she holds (a buy / give / pet adds or takes one) */
function kTapDig(){try{const n=x=>Array.isArray(x)?x.length:(x&&typeof x==="object"?Object.keys(x).length:0);return [typeof used!=="undefined"?used:0,S?S.bac:0,S?S.suc:0,S?KTAP_HELD.reduce((a,k)=>a+n(S[k]),0):0].join(",")}catch(e){return""}}
document.addEventListener("click",e=>{try{if(!e.isTrusted)return;const now=performance.now(),L=kTapLast;const el=e.target&&e.target.closest?e.target.closest("button,[role=button],[data-ka]"):null;kTapLast={t:now,ts:e.timeStamp,x:e.clientX,y:e.clientY,el,dg:kTapDig()};
 /* only the SECOND tap of a double tap (same spot, within tapArm ms), and only when the first one DID something: it opened the dialog now in front, or
    its button is gone (the screen was redrawn after the act — the 2nd tap would run the act again on the new copy). A stepper / toggle that stays is untouched. */
 /* RV-163C F1 (double-tap-scan «Y dược · Hỏi thái y»: khắc +1, Bạc −4 twice on a busy phone): the window is the time between her two FINGER taps (e.timeStamp =
    when the tap happened), not between the moments the game got round to them — the 1st tap's own work (spend, redraw) can outlast tapArm, and the 2nd tap,
    queued behind it, used to be read as a new tap. Either measure under tapArm = the same double tap. */
 const arm=(BAL.kdlg&&BAL.kdlg.tapArm)||0;const gap=L?Math.min(now-L.t,(e.timeStamp&&L.ts)?e.timeStamp-L.ts:Infinity):Infinity;if(!L||gap>=arm||Math.hypot(e.clientX-L.x,e.clientY-L.y)>((BAL.kdlg&&BAL.kdlg.tapNear)||0))return;
 const M=$("modal");const inDlg=!!(M&&!M.hidden&&e.target&&e.target.closest&&e.target.closest("#modal"));
 const opened=inDlg&&kDlgFront&&kDlgAt>=L.t,redrawn=!!(L.el&&!L.el.isConnected&&el);
 /* RV-163C F1 family (BUSY scan: «Soát đồ» khắc 2→4 on a busy phone): the 1st tap already SPENT (khắc / Bạc / Sức / items changed since it landed) but the
    screen is not redrawn yet — the 2nd tap would hit the same live button and spend again. A stepper / toggle spends nothing and stays untouched. */
 const spent=!!(L.dg&&el&&el===L.el&&kTapDig()!==L.dg);
 if(!opened&&!redrawn&&!spent)return;e.stopImmediatePropagation();e.preventDefault()}catch(x){}},true);
function showModal(){const M=$("modal");if(!Q.length){M.hidden=true;return}const m=Q[0];
  M.className="modal "+(m.cls||"");$("mt").textContent=/pcm/.test(m.cls||"")?"":m.t;$("mt").hidden=/pcm/.test(m.cls||"");try{const ar=evArt();M.querySelector(".dlg").style.setProperty("--dart",ar&&(m.who||/pcm/.test(m.cls||""))?`url(${ar})`:"none")}catch(e){}
  const wh=m.who||null;const art=!m.who&&m.opts&&!m.faces?evArt():"";$("mb").innerHTML=(m.faces?`<div class="faces">${m.faces.map(f=>`<figure>${pframe(Object.assign({},f[0],{rw:""}))}<figcaption>${typeof kitNameRank==="function"?kitNameRank(f[0].rw||"",f[0].rw===f[1]?"":f[1],f[0].col):`<b>${f[1]}</b>${f[0].rw?`<small>${f[0].rw}</small>`:""}`}</figcaption></figure>`).join("")}</div>`:"")+(m.faces||/pcm/.test(m.cls||"")?m.h:`<div class="spk">${wh?pframe(wh):pframeArt(art||evArt())}<div class="spkt">${m.h}</div></div>`)+(m.opts?`<div class="opts">${m.opts.map((c,i)=>{if(i===kitCancelIx(m))return "";const poor=c.fx&&c.fx.bac&&S.bac+c.fx.bac<0;if(poor&&!c.off&&typeof kitOffBac==="function")kitOffBac(c,-c.fx.bac);return `<button class="opt" data-m="${i}"${c.nav?' data-knav="1"':""} ${poor||c.off?"disabled":""}${typeof kitOffAttr==="function"?kitOffAttr(c):""}>${c.n}<small>${dilLine(c)}</small></button>`}).join("")}</div>`:"");
  /* empty-modal (MAIN 167, WORKLIST row 38: «Hội phối đồ: báo đề» empty list, stuck on Fold): a card whose option list is EMPTY or ALL locked
     shows THE kit empty state (kitEmpty) and the plain close «Đã rõ» — never a dialog with nothing to press */
  const live=kitModalLive(m);
  $("mr").innerHTML=m.opts&&live?"":`<button class="main" id="mclose">${m.btn||"Đã rõ"}</button>`;
  M.__m=m;kitFix(M);M.hidden=false;const f=M.querySelector(".opt:not(:disabled),#mclose");if(f)f.focus({preventScroll:true})}
function closeModal(){const m=Q.shift();if(m&&m.onClose){if(m.nl&&window.renderHold)renderHold(m.onClose,m,[],false);else m.onClose()}kitDlgTwinsDone(m);if(!S.dead||Q.length)showModal();if(m&&m.entI&&!m.onClose&&Q.length&&!S.dead)return;if(Q.length&&!S.dead&&window.renderSoon)renderSoon();else render()}/* an origin story panel (jentry/joi entI: text + picture, no effect, no onClose) followed by another card: the board did not change, no redraw *//* the life card (m.nl): its nlAccept chain renders once, here (jrbatch); another card follows: the board under it is drawn at the end of this task (jrbatch renderSoon) */
function chooseM(i){const m=Q[0];if(!m||!m.opts)return;const c=m.opts[i];if(!c){chooseBad(i,m);return}if(c.off||c.fx&&c.fx.bac&&S.bac+c.fx.bac<0)return;Q.shift();kitDlgTwinsDone(m,true);
  /* KIT §6.2m nav: a pure NAVIGATION option (Đi tới / Xem Dư đồ / Đi làm …) changes nothing by itself: no effects, no log line, no result card */
  if(c.nav){window.__kNav=(window.__kNav||0)+1;try{if(c.go)c.go()}catch(e){console.error("nav option",e)}setTimeout(()=>{window.__kNav=Math.max(0,(window.__kNav||1)-1)},0);showModal();render();return}
  const b0=snapReal(),s0=S.logSeq||0;
  /* ODDS CAP: a formerly-sure CHANCE option (cap = its khắc) rolls at the cap; a failure is the one soft failure (j63 oddsSoft), its go never runs */
  if(c.cap!=null&&!roll(BAL.odds.hi)){if(c.cap&&can(c.cap))spend(c.cap);oddsSoft("",c.fx)}else{apply(c.fx||{});if(c.go)c.go()}try{logChoice(m,c,b0,s0)}catch(e){console.error(e)}showModal();if(Q.length&&!S.dead&&window.renderSoon)renderSoon();else render()}/* a card follows (result, next event): the board under it at the end of this task (jrbatch renderSoon) */
/* flight-choose-guard (arm B co-op H77P host «Cannot read properties of undefined (reading 'off')»): a pick whose index is not on the
   card in front (a stale / relayed / scripted index, a findIndex −1) is refused, the card stays; logged with its caller for the robots. */
function chooseBad(i,m){try{(window.__badPick=window.__badPick||[]).push({i,t:m&&m.t||"",pid:m&&m.pid||"",n:m&&m.opts?m.opts.length:0,st:String(new Error().stack||"").split("\n").slice(2,7).join(" < ")});console.warn("chooseM: no option",i,"on",m&&(m.pid||m.t))}catch(e){}}
/* the log keeps one line per choice: "<event>: <choice> → <what really happened>" (owner 11/15: bare "Mặc kệ." lines with no context).
   The lines the choice's own effects wrote are folded into it, and the real changes of her numbers are added (before → after). */
/* the person-picker card sub-line markers (« · đang nhắm», « · Tìm chứng: …», jwhy spy picker) belong to the card only: the log and the evidence record name the person */
function optLogName(x){return String(x||"").replace(/\s*·\s*(đang nhắm|Tìm chứng:[^·<]*)/g,"").trim()}
function logChoice(m,c,b0,s0){const n=Math.max(0,Math.min((S.logSeq||0)-s0,S.logs.length));const L=S.logs.splice(0,n).reverse().map(x=>String(x).replace(/^<span class="ld">[^<]*<\/span>/,"").trim()).filter(Boolean);S.logSeq=s0;
 const d=typeof lsRest==="function"?lsRest(b0,lsArr(L)):logReal(b0);const ttl=plain(m.t||"").replace(/[.:]\s*$/,"");const ch=optLogName(c.n).replace(/[.]\s*$/,"");const res=L.map(x=>/[.!?…»”"]\s*(?:<\/[a-z]+>\s*)*$/i.test(x)?x:x+".").join(" ")+(d?`${L.length?" ":""}${d}.`:"");/* KAWHY-VERDICT: each folded line ends its sentence, the «Tâm cơ a → b» summary is never glued onto the last one */
 log(`${ttl?`<b>${ttl}</b>: `:""}${ch}${res?" — "+res:"."}`)}/* "—", not "→": the result itself has "Sủng a → b" (log-sync r1) */

/* nights */
/* rivals */
/* children, pregnancy, heir */
function heirMonth(){if(S.heir&&S.heir.k.alive)return"";S.heir=null;
  const c=allKids().filter(([k])=>k.alive&&k.sex==="m"&&k.age>=6);if(!c.length||!roll(15))return"";
  const w=c.map(([k,v])=>5+momRank(v)*10+k.tal/2+k.fond/2+(v?0:Math.max(0,S.th)/2));let r=Math.random()*w.reduce((a,b)=>a+b),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}
  const [k,v]=c[i];setHeir(k,v);fx("gold");return v?`Hoàng thượng lập ${k.name}, con của ${v.name}, làm Thái tử. `:`<b class="g">Hoàng thượng lập ${k.name}, con của ngươi, làm Thái tử.</b> Danh ${balSg(BAL.kid.heirDanh)}. `}

/* promotion */
/* Emperor mood, festivals, dilemmas */
function moodMonth(){const E=S.emp;let L=[[0,"Được mùa khắp nơi, Hoàng thượng vui vẻ."],[0,"Sứ thần các nước vào triều cống, ngài rất vui."],[1,""],[1,""],[2,"Lũ lụt ở Giang Nam, Hoàng thượng phiền muộn."],[2,"Hạn hán miền bắc, ngài ăn ngủ không yên."],[3,"Quan tham bị phát giác, Hoàng thượng nổi giận."],[3,"Biên ải có giặc cướp phá, ngài giận dữ."]];
  if(has("nongnay"))L=L.filter(x=>x[0]!==1);if([1,7,8].includes(S.month))L.push([0,"Ngày hội trong cung, ngài vui."],[0,"Ngày hội trong cung, ngài vui."]);
  const [m,t]=pick(L);E.mood=m;return t?`Tháng này: ${t} `:""}
PEND.vase=p=>({who:pMaid(),t:`${S.maid.name} lỡ tay đánh vỡ chén ngọc Hoàng hậu ban. Thái giám Càn Ninh cung đến bắt người.${p&&p.y?`<br>Hoàng hậu ${p.y}, chẳng chịu bỏ qua.`:""}`,o:[
    {n:"Nhận tội thay nàng",fx:{...BAL.cv.vase.take}},{n:"Để nàng chịu đòn",fx:{...BAL.cv.vase.leave},x:"thành: Hoàng hậu không trách đến ngươi · kèm: nàng bị đánh hai mươi trượng"}]});
PEND.coldletter=p=>{const f=RV(p.f),v=p.v==null?null:RV(p.v);if(!f)return null;return{who:pv(f),t:`${f.name} từ lãnh cung lén gửi thư, xin chút bạc chạy thuốc${p.y?` (nàng ${p.y})`:""}.`,o:[
    {n:"Giúp nàng",fx:{bac:-BAL.cv.coldAid,duc:BAL.cv.coldL.duc},x:v?`${v.name} nghe chuyện, mến ngươi hơn (thiện cảm ${balSg(spSee("rel",BAL.cv.coldL.rel))})`:"",go:()=>{if(v)spAdd(v,"rel",BAL.cv.coldL.rel)}},{n:"Làm ngơ",fx:{...BAL.cv.coldL.ign},x:`thành: giữ lại ${BAL.cv.coldAid} lượng bạc`}]}};
PEND.embezzle=p=>{const q=rivals[0];return{who:pEunOf(q),t:`Một thái giám lén mang đến sổ sách chứng Hoàng hậu ${q.name} biển thủ bạc nội khố, đòi 80 lượng.${p&&p.y?`<br>(Hoàng hậu ${p.y}.)`:""}`,o:[
    {n:"Mua lấy",fx:{bac:-80},x:`chứng cứ Hoàng hậu ${balSg(BAL.eff.j3.evGo)}`,go:()=>{evStory(q,BAL.eff.j3.evGo,"biển thủ bạc nội khố")}},{n:"Đuổi hắn đi",fx:{}}]}};
PEND.tuyen=p=>({who:pEmp(),t:"Hoàng thượng hỏi ý ngươi: năm nay nên tuyển thêm tú nữ hay không."+(p&&p.y?`<br>(Ngài thấy ${p.y}.)`:""),o:[
    {n:"Tâu nên tuyển ít",fx:{danh:4,sung:-3}},{n:"Tâu nên tuyển nhiều",fx:{sung:5,duc:-3},x:"tháng sau thêm một tú nữ",go:()=>{S.moreRivals=1}}]});
PEND.thbenh=()=>({who:pTH(),t:"Thái hậu lâm bệnh, Đức Thọ cung đóng cửa không tiếp khách.",o:[
    {n:"Hầu bệnh cả tháng",fx:{suc:-25,th:15,duc:4}},{n:"Gửi lễ vật vấn an",fx:{bac:-30,th:4}}]});
PEND.loveletter=p=>{const v=RV(p.v);if(!v)return null;const m=p.m!=null&&typeof manById==="function"?manById(p.m):null;return{who:pSpy(),t:`Tai mắt nhặt được thư tình ${v.name} viết cho ${m?m.name:"một thị vệ"}.`,o:[
    {n:"Trình lên Hoàng thượng",fx:{},x:`${word(50)} · thành: ${v.name} bị xét tội tư thông · hỏng: Danh ${balSg(BAL.eff.j3.danhGo)}`,go:()=>{if(roll(50))ttNpcExposed(v,m,`Thư tình của ${v.name} được trình lên.`);else{apply({danh:BAL.eff.j3.danhGo});log(`<span class="r">Hoàng thượng cho là thư giả, trách ngươi gây chuyện.</span> Danh ${balSg(BAL.eff.j3.danhGo)}.`)}}},
    {n:"Cất giữ làm con tin",fx:{},x:`chứng cứ ${v.name} ${balSg(BAL.eff.j3.evGo_2)}`,go:()=>{evStory(v,BAL.eff.j3.evGo_2,"viết thư tình cho một thị vệ")}}]}};
/* npc-purpose G1 (owner OD 18/11 ~04:08Z): a weekly card comes only from a PERSON with a GOAL (kinds in jagwhy1, numbers BAL.ag.why.dil).
   Every card's actor is asked why (npwAsk); the world / duty cards with no one scheming (festival, flood, the Emperor's question when the palace is
   thin…) weigh BAL.ag.why.dil.world; npwPick chooses among the goal-valid top options. A card at most every BAL.ag.why.dil.gap tuần (no dice gate). */
let DILX=null;
const DIL_P={vase:"hhMe",coldletter:"coldAsk",embezzle:"hhGreed",tuyen:"empAsk",loveletter:"loveFound"};
const DIL_PP={vase:X=>({y:X.why}),coldletter:X=>{const v=liveRivals(false).filter(x=>aff(x,X.who)>=netTh(x,"than")).sort((a,b)=>aff(b,X.who)-aff(a,X.who))[0];return{f:X.who.id,v:v?v.id:null,y:X.why}},
 embezzle:X=>({y:X.why}),tuyen:X=>({y:X.why}),loveletter:X=>({v:X.who.id,m:X.tgt?X.tgt.id:null})};
function makeDil(){if(!npwOn())return null;const D=BAL.ag.why.dil,O=[];
  for(const id in DIL_P)for(const o of npwAsk(DIL_P[id],{id}))O.push({id,o,s:o.s});
  if(!S.thDead)O.push({id:"thbenh",s:D.world});
  {const c=typeof j7cDil==="function"&&j7cDil();if(c)O.push(c)}  /* ORDER THIN P2: the composed intrigue family (j7c.js) */
  for(const e of freshEvents()){const k=DIL_K[e.id],nw=typeof nrW==="function"?nrW("j7",e.id):1;/* ORDER THIN P0: cross-life no-repeat (jnorep, family j7) */if(!k){O.push({id:e.id,s:D.world*nw});continue}for(const o of npwAsk(k[0],{id:e.id,h:k[1]}))O.push({id:e.id,o,s:o.s*nw})}
  const x=npwPick(O,y=>y.s);if(!x)return null;if(x.o){npwStamp(x.o.kind,x.o.who);npwSt(x.o.kind,"fire")}
  DILX=x.o||null;try{return EVI[x.id]?mkEv(x.id):mkP(x.id,x.o?DIL_PP[x.id](x.o):{})}finally{DILX=null}}

/* the turn */
function endTurn(){
  if(S.dead||Q.length||S.mg)return;S.buoi=0;const qStart=Q.length;let ev=resolveTonight();const lsB=typeof lsSnap==="function"?lsSnap():null;
  S.sung=cl(S.sung-((has("lanhlung")&&S.tuan===1)||(S.rank>=7&&S.tuan!==0)?0:BAL.fade.sung.wk),0,100);/* BAL.fade.sung.wk 0: the monthly neglect fade (jstatpace spFadeMonth) replaces the weekly −1 (owner OD 26/11 ~23:47Z) */
  const rg=nightRg();S.suc=cl(S.suc+rg,0,sucCap(S));if(worldOn())liveRivals(true).forEach(v=>v.suc=cl(v.suc+rg,0,sucCap(v)));if(S.tablet)S.tablet--;if(worldOn())liveRivals(true).forEach(v=>{if(v.tablet)v.tablet--});/* NPC ticks: host only (worldOn, jcoopworld) */
  if(lsB)lsNote(lsB,{sung:"ân sủng nhạt dần",suc:"nghỉ ngơi qua tuần"},true)/* Sức: dropped again when folded into j76 "Ngủ một đêm: Sức +N", which already counts this +4 */;
  ev+=rivalsTurn();if(S.dead)return;
  if(typeof kietDue==="function")kietDue();if(S.suc<=0&&!(typeof kietSave==="function"&&kietSave()))return die("Bệnh nặng, không qua khỏi");/* tuantang-warn r2 Q3: «Sắp kiệt sức» first (jsign) */
  if(S.tuan===2){ev+=monthTick();if(S.dead)return}else S.tuan++;
  if(Q.length===qStart&&wk()>=(S.dilW||0)){const d=makeDil();if(d){pushDil(d);S.dilW=wk()+BAL.ag.why.dil.gap}}/* npc-purpose G1: no weekly die; a card when someone has a reason (makeDil → npwPick), at most every dil.gap tuần */
  rollWx();S.place="home";placeWhere();if(S.out)coldVisit();else S.visit={k:"home",people:homePeople(),talked:false};used=0;popIdx=null;popMsg="";
  flip();if(!S.dead)newLots();
  if(ev)Q.splice(qStart,0,{t:"Tin trong cung buổi này",kind:"news",h:`<p class="past">${when()}</p><p>${ev}</p>`});
  if(S.justCrowned){S.justCrowned=0;record("Lên ngôi Hoàng hậu");Q.unshift({t:"Mẫu nghi thiên hạ",cls:"end",art:"img/ev-tan-phong.webp",who:pMe(),h:`<p>Sau ${S.year} năm trong cung, ${S.name} nhận kim sách kim ấn, lên ngôi Hoàng hậu.</p><p>Con đường còn lại: đưa một hoàng tử lên ngôi, thành Hoàng thái hậu.</p>`,btn:"Tiếp tục"})}
  if(ev)log(ev);
  curtain();deal();render()}
function monthTick(){let ev="";
  S.turn++;ev+=monthPay();
  if(S.pray)S.pray--;if(S.fert)S.fert--;if(S.master)S.master--;if(S.confined)S.confined--;if(S.shield)S.shield--;
  {const b=typeof lsSnap==="function"?lsSnap():null;if(S.arts.thi>=BAL.tho.lv)spAdd(S,"sung",(S.arts.thi>=BAL.tho.lv5?BAL.tho.sung5:BAL.tho.sung));if(b)lsNote(b,{sung:"thơ hay được truyền tụng"},true)}
  ev+=maidMonth();ev+=pregMonth();if(S.dead)return ev;S.anthai=0;ev+=itemMonth(S);anMonth(S);restock();oanMonth();assignHouses();S.chat={};ev+=illMonth();ev+=coldMonth();if(S.dead)return ev;ev+=servRanks();ev+=servMonth();ev+=facMonth();
  {const b=typeof lsSnap==="function"?lsSnap():null;const dd=has("nhantu")?2:1;if(S.duc>=BAL.ducLv.up)spAdd(S,"th",dd);else if(S.duc<BAL.ducLv.down)S.th=cl(S.th-dd,-100,100);if(b)lsNote(b,{th:lsDucWhy()},true)}
  if(S.moreRivals&&!roomFor("consort"))S.moreRivals=0;if(S.moreRivals){S.moreRivals=0;const n=newRival(R(3));Object.assign(n,drawFace());rivals.push(n);ev+=`Theo lời ngươi tâu, cung tuyển thêm tú nữ: ${n.name} vào cung, phong ${RANKS[n.rank].n}. `}
  ev+=kidsMonth();S.storms=0;ev+=rivalsMonth();ev+=storyMonth();if(S.dead)return ev;ev+=heirMonth();
  /* promo-root (25/11): «Bị bỏ quên» only after BAL.danhG.forgetGrace months since she entered the palace or last left lãnh cung (S.forgetAt, set by restore j14) */
  if(S.forgetAt==null)S.forgetAt=S.turn+BAL.danhG.forgetGrace;
  ev+=tsMonthAll();/* MAIN 118 P3: «bị bỏ quên» = thất sủng (no fault ⇒ no lãnh cung), every consort the same; her own entry waits for the promo-root grace (tsMonth reads S.forgetAt) */
  const wasQ=S.rank>=7;ev+=promote();if(!wasQ&&S.rank>=7)S.justCrowned=1;
  S.month++;S.tuan=0;
  if(S.month>12){S.month=1;S.year++;S.age++;S.emp.age++;if(typeof ageYear==="function")ageYear();allKids().forEach(([k])=>{if(k.alive)k.age++});
    if(S.heir&&!S.heir.v&&S.heir.k.alive){apply({danh:BAL.eff.j3.danhMonthTick});ev+=`Ngươi là mẹ Thái tử, danh vọng thêm cao. Danh ${balSg(BAL.eff.j3.danhMonthTick)}. `}
    if(S.age>BAL.age.sacFrom){S.sac=Math.max(BAL.age.sacMin,S.sac-BAL.age.sacLoss);ev+=`Năm mới, ngươi ${S.age} tuổi; nhan sắc phai dần (Sắc ${S.sac}). `}}
  /* owner OD 26/11 ~21:30Z «Đời tôi chỉ kết thúc khi hoàng thượng đưa ra quyết định, hoặc đời ổng kết thế nào hoặc tôi quyết định thôi» + ~21:40Z «Giữ bệnh, độc, ám sát»: the age-40 «Tuổi xuân qua đi» end is removed (no age-based end for her; old saves: no forced end). Illness / poison / assassination stay. */
  if(typeof mortEmpDue==="function"?mortEmpDue():S.year>12&&roll((S.year-12)*1.5+Math.max(0,S.emp.age-50)*.5)){emperorDies(ev);return ev}
  ev+=moodMonth();
  if(S.month===1)ev+=festival("Yến tiệc đầu xuân","sac","Sắc và điệu múa");
  if(S.month===7)ev+=festival("Thi tài ngày Thất tịch","tai","Tiếng đàn, lời thơ");
  return ev}

/* endings */
function emperorDies(ev){if(ev)log(ev);let h=S.heir&&S.heir.k.alive?S.heir:null;
  if(!h){const c=allKids().filter(([k])=>k.alive&&k.sex==="m").sort((a,b)=>b[0].age-a[0].age);if(c.length)h={k:c[0][0],v:c[0][1]}}
  const pre=`Năm ${S.year}, ${empName()} băng hà, thọ ${S.emp.age} tuổi. `;
  if(!h)return over("Thái phi",pre+"Tiên đế không có hoàng tử nối ngôi, thân vương vào kế vị. Ngươi được tôn làm Thái phi, sống nốt đời ở Thọ Khang cung.","Thành Thái phi",true);
  if(!h.v)return over("Hoàng thái hậu",pre+`${h.k.name}, con ngươi, lên ngôi. Ngươi được tôn làm Hoàng thái hậu, buông rèm nghe chính.`,"Lên ngôi Thái hậu",true);
  const v=h.v,live=v.alive&&!v.out;
  if(S.rank>=7)return over("Mẫu hậu Hoàng thái hậu",pre+`${h.k.name}, con của ${v.name}, lên ngôi. Ngươi là đích mẫu, được tôn làm Mẫu hậu Hoàng thái hậu${live?`; nhưng ${v.name} cũng được tôn Thánh mẫu, cùng ngươi chia đôi hậu cung`:""}.`,"Thành Thái hậu (đích mẫu)",true);
  if(!live)return over("Thái phi",pre+`${h.k.name} lên ngôi. Mẹ ruột tân đế đã không còn, không ai truy cứu chuyện cũ. Ngươi thành Thái phi.`,"Thành Thái phi",true);
  const pz=typeof ttwPz==="function"?ttwPz():0;const o=od(j3SpareB(v)+pz);/* TUANTANG-WARN: + the roads she took (jttw) */
  if(roll(o))return over("Thái phi",pre+`${h.k.name} lên ngôi. Tân Thái hậu ${v.name} xét lại chuyện cũ (cơ may: ${word(o)}) rồi tha cho ngươi${pz?"; những việc ngươi lo liệu trước đã có người nhớ":""}, cho dời đến Thọ Khang cung.`,"Thành Thái phi",true);
  return die(`${pre}Tân Thái hậu ${v.name} xét lại chuyện cũ (cơ may: ${word(o)})${pz?", những việc ngươi lo liệu trước không đủ xoay chuyển":""}, ban lụa trắng, ép ngươi tuẫn táng theo tiên đế`)}
/* the new Thái hậu's mercy base (one formula: j3 on the day + jttw warnings) */
function j3SpareB(v,d){return BAL.odb.j3.odO+(d==null?S.duc:d)/2+v.rel/2}/* d = the Đức of the one at risk (her by default; jttw npcRiskA passes the NPC's, law 1 mirror) */
function record(fate){const p=store.get("cung-kiep")||[];const e={n:S.name,o:S.origin.n,r:typeof lifeTopRank==="function"?lifeTopRank(S).n:RANKS[S.rank].n,age:S.age,f:fate+(S.st.tag?" · "+S.st.tag:"")};
  if(S.recorded&&p.length)p[0]=e;else p.unshift(e);S.recorded=true;store.set("cung-kiep",p.slice(0,12))}
function die(why){over("Hồng nhan bạc mệnh",why+".",why)}
/* the base night rest of everyone (endTurn; AG3: the maid road's week too, j42 srvEndTurn) */
function nightRg(){return harsh()?1:4}

/* empty-modal (MAIN 167): the ONE queue dialog always follows the queue — if any code took the shown card out of Q (spread, splice, Q=[]), the next
   render shows Q[0] or closes the dialog; a stale card over an empty queue (no way out) cannot stay. Wrapped after every module has loaded. */
function kitModalLive(m){if(!m||!m.opts)return true;const ci=kitCancelIx(m);return m.opts.some((c,i)=>c&&i!==ci&&!c.off&&!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0))}
/* K-EMPTY-UNDER (RV-183 P2): the panel goes in the stage text bubble (.kstage .k3right>.kpmain), else BEFORE the option list — never inside it — a dealt hand (.opts.khand, jkhand) is a fixed-height box of absolutely
   placed cards that covered a panel appended inside. Frame wrappers that run after this one (jksize k3 frame) rebuild the body and keep only .opts, so the put
   is idempotent and runs again after the next two frames. */
function kitModalEmptyPut(){try{const M=document.getElementById("modal"),m=Q[0];if(!M||M.hidden||!m||kitModalLive(m)||M.querySelector(".kempty")||typeof kitEmpty!=="function")return;
  const t=M.querySelector(".dlg.kstage .k3right>.kpmain"),g=!t&&M.querySelector(".opts"),host=t||g||document.getElementById("mb");if(host)host.insertAdjacentHTML(g?"beforebegin":"beforeend",kitEmpty("Lúc này không còn việc để chọn",["Đóng thẻ này; khi đủ điều kiện, việc sẽ mở lại."],{topic:m.t,noart:true}))}catch(e){}}
setTimeout(()=>{try{/* the empty state goes in AFTER every dialog wrapper has drawn (kit dialog frames rebuild the body) */const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);kitModalEmptyPut();requestAnimationFrame(()=>requestAnimationFrame(kitModalEmptyPut));return r};window.showModal=showModal}catch(e){console.error("modal empty",e)}
 try{if(typeof render!=="function")return;const r0=render;render=function(){const r=r0.apply(this,arguments);try{const M=document.getElementById("modal");if(M&&!M.hidden&&M.__m&&M.__m!==Q[0])showModal()}catch(e){}return r};window.render=render}catch(e){console.error("modal sync",e)}},0);
