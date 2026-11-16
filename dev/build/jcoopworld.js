/* jcoopworld: CO-OP SHARED WORLD (worker C, review/coop). Protocol: dev/coop/PROTOCOL.md. Net client: jcoop.js (COOP).
   Single-player never runs any of this: every hook checks CW.on, which only the lobby's COOP "start" event turns on.

   Canonical C = {v, week, W:{S:<WORLD keys of S>, R:<NPC rivals>, rid}, P:{a:<blob>, b:<blob>}}
     WORLD keys of S (W_KEYS below): date (year/month/tuan/turn), the Emperor (minus emp.known = her own knowledge), Thái hậu,
       court, weather, the vacant-seat clock, triều đình, storms, festival flag, face pools. Everything else in S is personal.
     W.R = ser() rivals without the friend entry; the viewer-relative fields of each NPC are kept per player id (pid):
       v.rel→rl[pid]  v.oan→ro[pid]  v.ghen→gp[pid]  v.ev (her proof against v)→ep[pid]  v.evm.me→evm[pid];
       any key "me" → String(pid), and the "me" value of a key field (resHead, spyFor, …) → pid.
     P[seat] = {pid, ok:origin key, name, rank, dead, srv, life, S:<personal keys of S>}  (S.emp.known kept as S.empKnown).
   The friend = one rival entry {id:<her pid>, coop:true} built from her P (consort), or, while she serves as a cung nữ,
   one servant {sid:<her pid>, coop:true} in her mistress's staff. Her rows (sung, danh, Thiện cảm …) changed by my acts are
   written back into P[friend].S, so the server's 3-way merge adds my deltas to hers.
   Week (since review/coop-night-sync: only after the host's night `go`, see "the night gate"): "Sang ngày mới" runs endTurn() locally (friend entry taken out; on the guest the world-agency functions are muted so
   world events roll once, on the host); once the week's dialogs are read, the client sends {t:"end",week,state:C} and waits
   (#next disabled; jcooplobby shows "Đợi bạn xong tuần"). The merged C comes back as {t:"week"} and the local game is rebuilt.
   Death: the normal rebirth flow (over → "Đầu thai kiếp sau" → Luân hồi card). nlRun is hooked so the new life is put into the
   SAME world (the world as it stood when she died); nlAccept sends {t:"me"} with her new blob. Hook for later origin routes:
   COOPW.attach() can be called by any route that builds a fresh S (e.g. tiểu thư ngoài cung) to drop it into the shared world.
   Save: in co-op, save() keeps the slots untouched and stores the canonical C in localStorage "ctm-coop-last" (the room's DO is
   the real save). */
(function(){try{
if(typeof COOP!=="object")return;
const W_KEYS=["year","month","tuan","turn","emp","thDead","thAge","thO","thF","court","wx","vacSince","trieu","storms","festDone","usedFaces","fidUsed","kidUsed","luxEdict"];
const REFF=["resHead","spyFor","lover","mid","owner","by","who","tgt","from","to"];   /* fields whose "me" value names the viewer */
const STAT=["sung","danh","bac","suc","sac","tai","tamco","duc","th","hh","mat","confined","shield","block"];
const LOOK=["face","fc","fk","fcKeep","fid","pid","age","sac","tai","tamco","duc","arts","pal","resHead","dress","ill","maid","lot"];
const J=x=>x==null?x:JSON.parse(JSON.stringify(x));
const CW=window.COOPW={tr:[],on:false,seat:"",base:null,pend:false,sent:-1,dying:null,attachC:null,news:"",life:0};
const me=()=>CW.seat==="a"?901:902, fp=()=>CW.seat==="a"?902:901, fs=()=>CW.seat==="a"?"b":"a";
const T=x=>{try{CW.tr.push(x+" f="+(rivals||[]).some(v=>v&&v.coop));if(CW.tr.length>80)CW.tr.shift()}catch(e){}};
const isF=v=>!!(v&&v.coop);
const host=()=>CW.seat==="a";
function wk(){return COOP.state.week||0}
const LASTB=()=>typeof B4L==="number"?B4L:2;

/* ---------- perspective mapping ---------- */
function mapMe(o,toCanon,pid){if(!o||typeof o!=="object")return o;
 if(Array.isArray(o)){for(let i=0;i<o.length;i++)o[i]=mapMe(o[i],toCanon,pid);return o}
 for(const k of Object.keys(o)){let v=o[k];
  if(REFF.includes(k)){if(toCanon&&v==="me")v=pid;else if(!toCanon&&v===pid)v="me"}
  v=mapMe(v,toCanon,pid);
  if(toCanon&&k==="me"){delete o.me;o[String(pid)]=v}else if(!toCanon&&k===String(pid)){delete o[k];o.me=v}else o[k]=v}
 return o}

/* ---------- friend entry ---------- */
function friendSrv(P){return !!(P&&P.S&&P.S.srv&&!P.S.srv.risen)}
/* the friend on the tiểu thư road (jkc) lives at her father's house until the tuyển tú: no palace entry for her until S.kc.inPal */
function friendHome(P){return !!(P&&P.S&&P.S.kc&&!P.S.kc.inPal&&!P.dead&&!P.S.dead)}
function buildFriend(P,mine){if(!P||!P.S||P.dead||P.S.dead||friendHome(P))return null;const s=J(P.S),mp=me();
 const rl=Object.assign({},s.rl||{}),ro=Object.assign({},s.ro||{});const rel=rl[mp]||0,oan=ro[mp]||0;delete rl[mp];delete ro[mp];
 const cev=s.cev||{};
 const v={id:fp(),coop:true,name:P.name||s.name,rank:s.rank||0,queen:(s.rank||0)>=7,trait:"Nhu mì",malice:15,rel,oan,rl,ro,ev:((mine||S||{}).cev||{})[fp()]||0,
  evm:{me:cev[mp]||0},alive:true,out:!!s.out,kids:[],ghen:0,pg:0,nights:0,inv:[],staff:[],nightLog:[]};
 for(const k of STAT)if(s[k]!=null)v[k]=s[k];for(const k of LOOK)if(s[k]!=null)v[k]=s[k];
 /* jtruth (reviewer r1): her own wrongs ledger travels with her, so true evidence on her is capped by what SHE really did (an empty
    ledger here made every piece on the friend a rumour each week, and NPC spies could never find a guilty friend); read-only copy */
 for(const k of ["wrongs","dw","dws","dkeys","schemes"])if(s[k]!=null)v[k]=J(s[k]);
 mapMe(v,false,mp);v.id=fp();
 v.__b=J(Object.assign({},...STAT.map(k=>({[k]:v[k]})),{rel:v.rel,oan:v.oan,rl:v.rl,ro:v.ro,em:v.evm.me,out:v.out,rank:v.rank}));
 return v}
function buildFriendSrv(P){const s=P.S;return {sid:fp(),coop:true,name:P.name||s.name,role:"maid",fc:s.fc,fk:s.fk,face:0,hue:0,age:s.age||18,tr:"trung",loyal:60,
 spyFor:null,lover:null,af:{},kn:1,imp:"hảo hữu chơi cùng",org:"hảo hữu chơi cùng"}}
function pullFriend(){T("pull");const out=[];for(let i=rivals.length-1;i>=0;i--)if(isF(rivals[i]))out.push([i,rivals.splice(i,1)[0]]);
 for(const v of rivals)if(v.staff)for(let i=v.staff.length-1;i>=0;i--)if(isF(v.staff[i]))out.push([-1,v.staff.splice(i,1)[0],v]);return out}
function pushFriend(L){for(const [i,v,m] of L.reverse()){if(i<0){if(m&&m.staff&&!m.staff.includes(v))m.staff.push(v)}else if(!rivals.includes(v))rivals.splice(Math.min(i,rivals.length),0,v)}}
function withoutFriend(f){if(!CW.on||!S||CW.pulled)return f();const L=pullFriend();CW.pulled=L;try{return f()}finally{CW.pulled=null;pushFriend(L)}}
function friendEntry(){return rivals.find(isF)||null}
/* knowledge (owner 14/11): the friend follows j61 like any NPC — "Người lạ" until met. Her new life (rebirth) is a new person:
   forget what I knew of the old one (j61 stage, my Thiện cảm / Oán / chứng cứ toward that id). */
function forgetFriend(o){const id=fp(),k="r"+id;if(!o)return;try{if(o.known)delete o.known[k];if(o.nkn)delete o.nkn[k]}catch(e){}
 if(o.rl)delete o.rl[id];if(o.ro)delete o.ro[id];if(o.cev)delete o.cev[id]}
function freshFriend(P,o){if(!P)return;const key=(P.name||(P.S&&P.S.name)||"")+"#"+(P.life||0);if(CW.fKey!==undefined&&CW.fKey!==key)forgetFriend(o||S);CW.fKey=key}
function placeFriend(P){T("placeFriend "+(P&&P.name));pullFriend();if(!P)return;if(S)freshFriend(P,S);
 if(friendSrv(P)){const m=RV(P.S.srv.mid);if(m){m.staff=m.staff||[];m.staff.push(buildFriendSrv(P))}return}
 const v=buildFriend(P);if(!v)return;try{rstats(v)}catch(e){}
 if(v.queen&&!qOn()){rivals.unshift(v)}else{if(v.queen)v.queen=false,v.rank=Math.min(v.rank,6);rivals.push(v)}}

/* ---------- local game → canonical ---------- */
function myBlob(sS){const P={pid:me(),ok:S.origin&&S.origin.k,name:S.name,rank:S.rank,dead:!!S.dead,srv:!!(S.srv&&!S.srv.risen),life:CW.life,S:{}};
 for(const k in sS)if(!W_KEYS.includes(k))P.S[k]=sS[k];
 if(sS.emp)P.S.empKnown=sS.emp.known||{};return P}
function toCanon(){const L=(CW.pulled||[]).concat(pullFriend());let d;try{S.cev=S.cev||{};const f=L.find(x=>x[0]>=0);if(f)S.cev[fp()]=f[1].ev||0;d=ser()}finally{pushFriend(L.filter(x=>!(CW.pulled||[]).includes(x)))}
 const mp=me(),sS=d.S;const WS={};for(const k of W_KEYS)if(k in sS)WS[k]=J(sS[k]);if(WS.emp)delete WS.emp.known;
 if(host())WS.cnews={w:wk(),h:CW.news||""};else if(CW.base&&CW.base.W&&CW.base.W.S)WS.cnews=J(CW.base.W.S.cnews);
 const R=d.R.filter(r=>!r.coop).map(r=>{r.rl=r.rl||{};r.ro=r.ro||{};r.gp=r.gp||{};r.ep=r.ep||{};r.evm=r.evm||{};
  r.rl[mp]=r.rel||0;r.ro[mp]=r.oan||0;r.gp[mp]=r.ghen||0;r.ep[mp]=r.ev||0;delete r.rel;delete r.oan;delete r.ghen;delete r.ev;
  if(r.staff)r.staff=r.staff.filter(s=>!s.coop);return mapMe(r,true,mp)});
 mapMe(WS,true,mp);
 const P={};P[CW.seat]=myBlob(sS);
 const B=CW.base&&CW.base.P&&CW.base.P[fs()];
 if(B){const fP=J(B);const f=L.find(x=>x[0]>=0);const v=f&&f[1];
  if(v&&v.__b&&fP.S){const b=v.__b,s=fP.S;
   for(const k of STAT)if(v[k]!==b[k]&&typeof v[k]==="number")s[k]=v[k];
   s.rl=s.rl||{};s.ro=s.ro||{};s.cev=s.cev||{};
   if(v.rel!==b.rel)s.rl[mp]=v.rel;if(v.oan!==b.oan)s.ro[mp]=v.oan;if((v.evm&&v.evm.me||0)!==b.em)s.cev[mp]=v.evm.me||0;
   for(const id in v.rl||{})if(v.rl[id]!==(b.rl||{})[id]&&id!=="me")s.rl[id]=v.rl[id];
   for(const id in v.ro||{})if(v.ro[id]!==(b.ro||{})[id]&&id!=="me")s.ro[id]=v.ro[id];
   if(!v.alive||(v.out&&!b.out)){if(!v.alive){fP.dead=true;s.dead=true;s.coopWhy="Mất trong cung"}else{s.coopCold=1}}
   if(v.rank!==b.rank&&!v.out){s.rank=v.rank}}
  P[fs()]=fP}
 return {v:1,week:wk(),W:{S:WS,R,rid:Math.max(rid,...R.map(r=>+r.id||0).filter(n=>n<900),0)},P}}

/* ---------- canonical → local game ---------- */
function fromCanon(C,opt){opt=opt||{};const mp=me(),Pm=C.P&&C.P[CW.seat];if(!Pm)return false;
 const sS=J(Pm.S);Object.assign(sS,J(C.W.S||{}));if(sS.emp)sS.emp.known=Pm.S.empKnown||{};delete sS.empKnown;delete sS.cnews;
 const R=J(C.W.R||[]).map(r=>{r.rl=r.rl||{};r.ro=r.ro||{};r.gp=r.gp||{};r.ep=r.ep||{};
  r.rel=r.rl[mp]||0;r.oan=r.ro[mp]||0;r.ghen=r.gp[mp]||0;/*evok: co-op sync*/r.ev=r.ep[mp]||0;delete r.rl[mp];delete r.ro[mp];delete r.gp[mp];delete r.ep[mp];
  return mapMe(r,false,mp)});
 const qs=(typeof serQ==="function"&&opt.keepQ)?serQ():[];
 const fP=C.P[fs()];if(fP)freshFriend(fP,sS);
 const f=fP&&!friendSrv(fP)?buildFriend(fP,sS):null;if(f)R.push(f);
 const keepTab=tab,keepUsed=used;quiet=true;
 try{deser({v:6,buoi:sS.buoi||0,ok:Pm.ok||"tt",S:sS,R,rid:C.W.rid||rid,tab:keepTab,used:keepUsed,P:qs})}finally{quiet=false}
 if(!opt.keepUsed)used=0;else used=keepUsed;
 /* guard enums/levels that a numeric merge could push out of range */
 const ci=(v,a,b)=>typeof v==="number"?Math.max(a,Math.min(b,Math.round(v))):v;
 if(S.emp)S.emp.mood=ci(S.emp.mood,0,3);S.rank=ci(S.rank,0,7);S.tuan=ci(S.tuan,0,2);S.month=ci(S.month,1,12);S.buoi=ci(S.buoi||0,0,LASTB());
 for(const v of rivals){v.rank=ci(v.rank,0,7);try{ap(v,{})}catch(e){}}
 if(friendSrv(fP))placeFriend(fP);CW.life=Pm.life||0;return true}

/* put a freshly built life (S + throwaway world from start()) into the shared world W of C */
function attach(C){T("attach");if(!C||!C.W)return;const mp=me();
 const keep={};for(const k in S)if(!W_KEYS.includes(k))keep[k]=S[k];
 const known=S.emp&&S.emp.known;
 /* the new life knows nobody yet: drop every link into the throwaway world */
 keep.rl={};keep.ro={};keep.tonight=null;keep.toMorning=0;keep.heir=null;keep.evd={};keep.chat={};keep.cev={};keep.resHead=null;keep.where=null;keep.dead=false;
 S=keep;const sS=J(ser().S);
 const P={pid:mp,ok:S.origin&&S.origin.k,name:S.name,rank:S.rank,dead:false,srv:!!(S.srv&&!S.srv.risen),life:(CW.life||0)+1,S:{}};
 for(const k in sS)if(!W_KEYS.includes(k))P.S[k]=sS[k];P.S.empKnown={};
 const C2=J(C);C2.P=C2.P||{};C2.P[CW.seat]=P;
 /* NPCs start fresh toward the new face */
 (C2.W.R||[]).forEach(r=>{for(const m of ["rl","ro","gp","ep"]){r[m]=r[m]||{};r[m][mp]=m==="gp"?R(15):0}if(r.evm)r.evm[mp]=0;if(r.resHead===mp)r.resHead=null});
 const wasSrv=!!(S.srv&&!S.srv.risen);
 fromCanon(C2);CW.life=P.life;
 if(known&&S.emp&&!Object.keys(S.emp.known||{}).length)S.emp.known={};
 if(S.foe&&!rivals.some(v=>v.name===S.foe)){const v=pick(liveRivals(false).filter(x=>!isF(x)));if(v)S.foe=v.name}
 if(wasSrv&&typeof srvInit==="function"){S.srv=null;quiet=true;try{withoutFriend(()=>srvInit())}catch(e){console.error(e)}quiet=false}
 S.place="home";S.visit={k:"home",people:homePeople(),talked:false};
 try{if(typeof sidN!=="undefined")sidN=Math.max(sidN,...allServ().map(s=>+s.sid||0).filter(n=>n<900),0)}catch(e){}}
CW.attach=()=>{const C=CW.dying||CW.base;if(C)attach(C)};
CW.sendMe=()=>sendMe();CW.friendHome=friendHome;

/* ---------- sending ---------- */
function sendEnd(){if(!CW.on||!S||S.dead||CW.sent===wk())return;const C=toCanon();CW.sent=wk();CW.pend=false;CW.mine=snapStats();
 COOP.send({t:"end",week:wk(),state:C});try{localStorage.setItem("ctm-coop-last",JSON.stringify({room:COOP.state.room,C}))}catch(e){}lockNext()}
function sendMe(){T("sendMe "+(S&&S.dead));if(!CW.on||!S||S.dead)return;
 /* a new life: the old life's pending / sent week end is void (the server drops my sent end on `me`); she ends this week herself */
 if(CW.base){CW.pend=false;if(CW.sent===wk())CW.sent=-1;CW.bend=false;CW.nrdy=-1;CW.ngoW=-1}
 const C=toCanon();CW.dying=null;
 if(!CW.base){/* host's first world */COOP.send({t:"init",state:C,nb:typeof B4N==="number"?B4N:3});CW.base=C}else{COOP.send({t:"me",P:C.P[CW.seat]});CW.base.P=CW.base.P||{};CW.base.P[CW.seat]=J(C.P[CW.seat])}
 try{if(CW.base&&CW.base.P&&CW.base.P[fs()]&&!friendEntry())placeFriend(CW.base.P[fs()])}catch(e){console.error(e)}
 /* jkc: the friend chose first and is at home: say so once (her entry into the palace is told by onWeek) */
 try{const fP=CW.base&&CW.base.P&&CW.base.P[fs()];if(fP&&!fP.dead){const home=friendHome(fP);CW.fWasHome=home;const fk=(fP.name||"")+"#"+(fP.life||0)+"h";
  if(home&&CW.fNote!==fk){CW.fNote=fk;pushModal({t:"Hảo hữu chọn thân phận",h:`<p>Hảo hữu ngươi đã chọn xong thân phận, nay còn ở nhà cha chờ kỳ tuyển tú, chưa vào cung. Mặt mũi, tên tuổi kiếp này ra sao, phải gặp mới biết.</p><p class="past">Qua kỳ tuyển tú, nàng sẽ vào cung; khi ấy hai người mới gặp được nhau.</p>`});try{showModal()}catch(e){}}}}catch(e){console.error(e)}
 /* a new life starts in the room's CURRENT buổi (the friend may already be in buổi chiều / tối) */
 if(CW.p2&&typeof CW.rbuoi==="number"&&(S.buoi||0)!==CW.rbuoi&&CW.rweek===wk()){S.buoi=CW.rbuoi;used=0;try{placeWhere()}catch(e){console.error(e)}}
 if(host())sendWhere();else if(CW.lastWhere)applyWhere(CW.lastWhere);CW.posKey="";sendPos();render()}
function snapStats(){const o={};for(const k of ["sung","danh","bac","suc","sac","tai","tamco","duc","th","hh","rank"])o[k]=S[k];return o}
function waiting(){const s=COOP.state;return CW.on&&(CW.sent===wk()||!!(s.ended&&s.ended[CW.seat]))}
function frozen(){const s=COOP.state;return CW.on&&(s.status!=="open"||!s.peerOnline||!!CW.hold)}  /* CW.hold: the two are on different builds (swreg.js, KIT §35.2) */
/* touch #next only when its state really changes (j63 observes every "disabled" write) */
function lockNext(){const n=$("next");if(!n)return;const wb=CW.on&&(CW.bend||nReady()||needWhere()||!!CW.pendBuoi);const lock=CW.on&&(waiting()||frozen()||CW.pend||!CW.base||wb);
 if(lock){if(!n.disabled)n.disabled=true;if(n.dataset.coopWait!=="1")n.dataset.coopWait="1";/* owner 16/11 (owner-coop-stuck.jpg: faded "Sang buổi", no word): every lock says why */
  const s=COOP.state;const t=(CW.bend||nReady()||waiting()||CW.pend)?"Chờ hảo hữu…":wb?"Đợi hảo hữu":CW.hold?"Đợi cùng bản mới":frozen()?(s.status==="moved"?"Ở máy khác":s.status!=="open"?"Đang nối lại…":"Hảo hữu đang vắng"):"Đang nối…";if(t&&n.textContent!==t){/* keep the button's own width (the tabs beside it must not shrink): the longer words wrap inside */
  if(!n.style.maxWidth&&n.offsetWidth)n.style.maxWidth=n.offsetWidth+"px";n.classList.add("kcwait");n.textContent=t}}
 else if(n.dataset.coopWait){delete n.dataset.coopWait;n.style.maxWidth="";n.classList.remove("kcwait");n.disabled=!!(S&&(S.dead||Q.length||S.mg));const t=CW.on?"Sẵn sàng":S&&(S.buoi||0)>=(typeof B4L==="number"?B4L:2)?"Sang ngày mới":"Sang buổi";if(n.textContent!==t)n.textContent=t}}
/* ---------- phase 2 (PROTOCOL §9): same buổi, same place, acts between the two ---------- */
Object.assign(CW,{bend:false,whereKey:"",lastWhere:null,fpos:null,posKey:"",p2:true,allow:false,acts:{}});
const bkey=()=>wk()+":"+((S&&S.buoi)||0);
function needWhere(){return CW.on&&CW.p2&&!host()&&CW.whereKey!==bkey()}
/* her place as I see it: her "home" is her own palace; my palace in her eyes ("r"+my pid) is my "home" */
function mapPlace(pl){if(!pl)return null;if(pl==="home"){const f=friendEntry();return f?palaceOf(f):null}if(pl==="r"+me())return"home";return pl}
function sendWhere(){if(!CW.on||!CW.p2||!host()||!S||!S.where)return;const W=mapMe(J(S.where),true,me());delete W[String(fp())];if(S.menW)W.__menW=J(S.menW);
 COOP.send({t:"where",week:wk(),buoi:S.buoi||0,W})}
function setWhere(m){if(!m||!m.W||!S||host()||m.week!==wk()||m.buoi!==(S.buoi||0))return false;
 const W=mapMe(J(m.W),false,me());const mw=W.__menW;delete W.__menW;const fpl=S.where&&S.where[fp()];S.where=W;if(fpl)S.where[fp()]=fpl;if(mw)S.menW=mw;
 CW.whereKey=bkey();return true}
function applyWhere(m){if(!m||!m.W||!S||host())return;CW.lastWhere=m;if(!setWhere(m))return;refreshHere();render()}
/* people at my current place, from S.where (no travel, no side effects): NPCs + the Emperor + my friend */
function refreshHere(){if(!S||!S.visit||S.dead)return;const k=S.place||"home",W=S.where||{};const P=S.visit.people||[];
 const isR=p=>p&&(p.kind==="rival"||p.kind==="hh")&&p.ref;
 if(k==="home"){const f=friendEntry();const L=P.filter(p=>!(isR(p)&&isF(p.ref)));if(f&&W[f.id]==="home")L.push(rp(f));S.visit.people=L;return}
 const here=liveRivals(true).filter(v=>W[v.id]===k);const L=P.filter(p=>!isR(p)||(here.includes(p.ref)&&!isF(p.ref)));
 for(const v of here)if(!L.some(p=>isR(p)&&p.ref===v))L.push(v.queen&&qOn()?{...rp(v),kind:"hh",name:`Hoàng hậu ${v.name}`,ini:"Phượng"}:rp(v));
 const ei=L.findIndex(p=>p.kind==="emp");if(W.emp!==k&&ei>=0&&["vuon","thu","dtd"].includes(k))L.splice(ei,1);
 else if(W.emp===k&&ei<0&&["vuon","thu"].includes(k))L.unshift({kind:"emp",name:"Hoàng thượng",ini:"Đế",col:"#f0d070",info:`${empName()} · ${MOODS[S.emp.mood][0].toLowerCase()}`});
 S.visit.people=L}
const LIVE=["sung","danh","suc","sac","tai","tamco","duc","rank","age"];
function sendPos(){if(!CW.on||!CW.p2||!S||S.dead)return;const st={};for(const x of LIVE)st[x]=S[x];
 const k=[wk(),S.buoi||0,S.place||"home",used,LIVE.map(x=>S[x]).join("/"),!!S.out,S.name].join(":");if(k===CW.posKey)return;CW.posKey=k;
 COOP.send({t:"pos",place:S.place||"home",khac:used,week:wk(),buoi:S.buoi||0,st,out:!!S.out,alive:!S.dead,name:S.name,life:CW.life||0})}
/* her own numbers, live: shown on her entry; the week write-back baseline moves with them so the merge never counts them as mine */
function liveStats(m){const f=friendEntry();if(!f||!m.st||(m.name&&m.name!==f.name))return false;let ch=false;
 for(const x of LIVE){const v=m.st[x];if(typeof v!=="number")continue;if(x==="rank"&&f.queen)continue;if(f[x]!==v){f[x]=v;ch=true}if(f.__b&&x in f.__b)f.__b[x]=v}
 if(f.__b)f.__b.rank=f.rank;return ch}
function onPos(m){if(!CW.on||m.from===CW.seat||!S)return;CW.fpos=m;const pl=mapPlace(m.place);const f=friendEntry();if(!f)return;
 const sc=liveStats(m);S.where=S.where||{};const was=S.where[f.id];S.where[f.id]=pl||palaceOf(f);if(was!==S.where[f.id]||sc){refreshHere();if(!Q.length)render()}}
function keepFriendPos(){if(!CW.on||!S||!S.where)return;const f=friendEntry();if(!f)return;const pl=CW.fpos&&CW.fpos.week===wk()&&CW.fpos.buoi===(S.buoi||0)?mapPlace(CW.fpos.place):null;S.where[f.id]=pl||palaceOf(f)}
function onBuoi(m){T("onBuoi "+m.week+"."+m.buoi+" me "+wk()+"."+(S&&S.buoi)+" Q"+Q.length+(S&&S.mg?" mg":""));if(!CW.on||!S)return;CW.bend=false;
 /* the room moved on: if a dialog is still open, step as soon as it is closed */
 if((Q.length||S.mg)&&m.week===wk()&&(S.buoi||0)===m.buoi-1){CW.pendBuoi=m;lockNext();return}CW.pendBuoi=null;
 if(m.week===wk()&&(S.buoi||0)===m.buoi-1&&!S.dead){CW.allow=true;try{nextBuoi()}finally{CW.allow=false}}
 /* the room is further on (came back after both steps, or a pendBuoi older than the room): next step at once */
 if(!S.dead&&typeof CW.rbuoi==="number"&&CW.rweek===wk()&&CW.rbuoi>(S.buoi||0)&&(S.buoi||0)===m.buoi)setTimeout(()=>{if(CW.on&&S&&CW.rweek===wk()&&CW.rbuoi>(S.buoi||0))onBuoi({week:wk(),buoi:(S.buoi||0)+1})},0);
 if(host())sendWhere();else if(CW.lastWhere)applyWhere(CW.lastWhere);sendPos();lockNext()}
function bend(){T("bend "+wk()+"."+(S&&S.buoi));if(CW.bend)return;CW.bend=true;COOP.send({t:"bend",week:wk(),buoi:S.buoi||0});lockNext()}
/* a night with the Emperor spends the rest of her day (jnight). In co-op the day only moves through the sync path above:
   sáng / chiều → `bend` (the server's `buoi` then runs the real step for both), tối → endTurn → `end` → the merged week.
   CW.nightEnd() ends THIS seat's current buổi once: nothing while her buổi is already ended (bend sent, week pending / sent), while
   the room is frozen, while a dialog or a room step is pending, or while her buổi is not the room's buổi (never ahead of the friend).
   Returns the buổi key it ended ("week:buổi") or "" (nothing done: jnight asks again on the next render). */
CW.nightEnd=function(){if(!CW.on||!S||S.dead||Q.length||S.mg)return"";if(waiting()||frozen()||CW.pend||!CW.base||CW.bend||CW.pendBuoi||needWhere())return"";
 const b=S.buoi||0;if(typeof CW.rbuoi==="number"&&CW.rweek===wk()&&CW.rbuoi!==b)return"";
 const k=bkey();used=4;nextBuoi();return (CW.bend||nReady()||CW.pend||(S.buoi||0)!==b)?k:""};
CW.bkey=bkey;
COOP.on("buoi",onBuoi);
/* the room's current buổi (for a reborn life that joins mid-week) */
const rb=m=>{if(m&&typeof m.buoi==="number"){CW.rbuoi=m.buoi;CW.rweek=m.week!=null?m.week:wk()}};
COOP.on("buoi",rb);COOP.on("presence",rb);COOP.on("room",rb);COOP.on("week",m=>{CW.rbuoi=0;CW.rweek=m.week});
COOP.on("bended",m=>{if(CW.on)lockNext()});
COOP.on("where",m=>{CW.lastWhere=m;if(CW.on)applyWhere(m)});
COOP.on("pos",onPos);
COOP.on("error",m=>{T("err "+m.code+" "+m.msg);if(CW.on&&m.code==="badbuoi"){CW.bend=false;/* refused because the room is already further on: catch up */if(S&&!S.dead&&CW.rweek===wk()&&typeof CW.rbuoi==="number"&&CW.rbuoi>(S.buoi||0))onBuoi({week:wk(),buoi:(S.buoi||0)+1});lockNext()}});

/* acts between the two (PROTOCOL §9.1). Every act tab works on her entry exactly as on an NPC (same place/rank/conditions).
   mode "do": I resolve it here (odds, detection, my costs, text) and send `res` with the effect on her; she applies it to her own S
   (death → rebirth, lãnh cung → cold) and sees a note only when she would notice it. The week write-back baseline of her entry is
   moved so the merge does not count it twice.  mode "invite" (Kết giao, Tặng quà): she gets a choice card first; Nhận → I run it. */
const ASK=["ally","gift"];
const PUB=["accuse","vp","gift","ally","steal","road","takeaway","tocao","trinhth","trinhhh","xinhh","uyhiep","judge"];
const DK=["sung","danh","bac","suc","sac","tai","tamco","duc","th","hh","mat"];
const newId=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
function fsnap(v){const o={};for(const k of DK.concat(["confined","rel","oan"]))o[k]=v[k]||0;o.alive=v.alive;o.out=!!v.out;o.em=(v.evm&&v.evm.me)||0;return o}
function sendRes(v,k,b0,txt,id){const b1=fsnap(v);const fx={};for(const x of DK)if(b1[x]!==b0[x])fx[x]=b1[x]-b0[x];
 const flags={rel:b1.rel-b0.rel,oan:b1.oan-b0.oan,em:b1.em-b0.em,conf:b1.confined-b0.confined,dead:b0.alive&&!b1.alive,cold:!b0.out&&b1.out};
 const t=String(txt||"").replace(/<[^>]+>/g,"");const caught=/bị lộ|bị bắt|phát giác|khai ra|tố giác/.test(t);
 const any=Object.keys(fx).length||flags.rel||flags.oan||flags.em||flags.conf||flags.dead||flags.cold;if(!any&&!PUB.includes(k))return;
 /* she notices what an NPC's act would show her: open acts and caught schemes name me, a hidden harm only shows its effect */
 const seen=PUB.includes(k)||caught?"named":any?"effect":"";
 if(v.__b){for(const x of STAT)v.__b[x]=v[x];v.__b.rel=v.rel;v.__b.oan=v.oan;v.__b.em=(v.evm&&v.evm.me)||0;v.__b.out=v.out;v.__b.rank=v.rank}
 if(flags.dead)v.alive=true;if(flags.cold)v.out=false;   /* her death / lãnh cung happen on her side; her entry follows from her `me` / week */
 COOP.send({t:"res",id:id||newId(),k,n:(ACT[k]||{}).n||k,who:S.name,fx,flags,seen,txt:t.slice(0,400)})}
(function(){const f=runAct;runAct=function(a,t,k,extra){if(!CW.on||a!==S||!isF(t))return f.apply(this,arguments);
 if(ASK.includes(k)&&!CW.inv){if(sameHouse(a,t))return f.apply(this,arguments);const id=newId();CW.acts[id]={k,extra,v:t.id};
  COOP.send({t:"act",id,k,mode:"invite",n:(ACT[k]||{}).n||k,who:S.name,item:extra!=null&&S.inv&&S.inv[extra]?iname(S.inv[extra]):""});return `Ngươi ngỏ ý ${((ACT[k]||{}).n||k).toLowerCase()} với ${t.name}, đợi nàng trả lời. `}
 const b0=fsnap(t);const r=f.apply(this,arguments);try{sendRes(t,k,b0,r,CW.inv)}catch(e){console.error(e)}return r}})();
const seenIds=new Set();
function onAct(m){if(!CW.on||m.from===CW.seat||!S||S.dead||seenIds.has(m.id))return;seenIds.add(m.id);if(m.mode!=="invite")return;
 const what=m.k==="gift"?`muốn tặng ngươi ${esc(m.item||"một món quà")}`:`muốn kết giao với ngươi`;
 pushModal({act:1,t:"Hảo hữu tìm đến",h:`<p><b>${esc(m.who)}</b> ${what}.</p>`,opts:[
  {n:"Nhận",fx:{},x:"hảo hữu tiếp tục việc ấy",go:()=>COOP.send({t:"actr",id:m.id,ok:true,k:m.k})},
  {n:"Từ chối",fx:{},x:"không nhận",go:()=>COOP.send({t:"actr",id:m.id,ok:false,k:m.k})}]});showModal();render()}
function onRes(m){if(!CW.on||m.from===CW.seat||!S||seenIds.has("r"+m.id))return;seenIds.add("r"+m.id);COOP.send({t:"actr",id:m.id,ok:true,ack:1});if(S.dead)return;
 const fx={};for(const k in m.fx||{})if(DK.includes(k)&&typeof m.fx[k]==="number")fx[k]=m.fx[k];const g=m.flags||{},fpid=fp();
 if(Object.keys(fx).length)apply(fx);S.rl=S.rl||{};S.ro=S.ro||{};S.cev=S.cev||{};
 if(g.rel)S.rl[fpid]=cl((S.rl[fpid]||0)+g.rel,-100,100);if(g.oan)S.ro[fpid]=cl((S.ro[fpid]||0)+g.oan,0,100);
 if(g.em)S.cev[fpid]=Math.max(0,(S.cev[fpid]||0)+g.em);if(g.conf)S.confined=Math.max(0,(S.confined||0)+g.conf);
 const f=friendEntry();if(f&&g.rel){f.rel=cl((f.rel||0)+g.rel,-100,100);if(f.__b)f.__b.rel=f.rel}
 const who=m.seen==="named"?`<b>${esc(m.who)}</b>: ${esc(m.n)}.`:"Có kẻ ngấm ngầm ra tay với ngươi.";
 const note=m.seen?`<p>${who}</p>${m.seen==="named"&&m.txt?`<p class="past">${esc(m.txt)}</p>`:""}${Object.keys(fx).length?`<p>${fmt(fx)}</p>`:""}`:"";
 if(g.dead){if(note)pushModal({t:"Biến cố",h:note});try{die(m.seen==="named"?`Bị ${m.who} hại`:"Bị kẻ gian hãm hại")}catch(e){console.error(e)}return}
 if(g.cold){try{cold(m.seen==="named"?`Bị ${m.who} hại, đày vào lãnh cung`:"Bị vu hại, đày vào lãnh cung")}catch(e){console.error(e)}}
 if(note){pushModal({t:m.seen==="named"?"Hảo hữu ra tay":"Biến cố",h:note});showModal()}render()}
function onActr(m){if(!CW.on||m.from===CW.seat||m.ack)return;const a=CW.acts[m.id];delete CW.acts[m.id];if(!a)return;const v=RV(a.v);
 if(!m.ok||!v||!v.alive){pushModal({t:"Hảo hữu từ chối",h:`<p><b>${esc(friendName())}</b> không nhận.</p>`});showModal();render();return}
 CW.inv=m.id;let r="";try{r=runAct(S,v,a.k,a.extra)}finally{CW.inv=false}if(r)log(r);
 pushModal({t:"Hảo hữu nhận lời",h:`<p>${r||"Hảo hữu đã nhận."}</p>`});showModal();render()}
COOP.on("act",onAct);COOP.on("res",onRes);COOP.on("actr",onActr);
/* the week's end goes out once her dialogs are read: checked after each render / presence change (event-driven) */
let tryT=0;function tryEnd(){tryT=0;if(CW.on&&CW.pendBuoi&&S&&!Q.length&&!S.mg){onBuoi(CW.pendBuoi);return}nCheck();if(CW.on&&S&&CW.pend&&!Q.length&&!S.mg&&!S.dead&&!frozen())sendEnd()}
function soonEnd(){if(CW.on&&(CW.pend||CW.pendBuoi||CW.ngoW===wk()||CW.nrdy===wk())&&!tryT)tryT=setTimeout(tryEnd,0)}

/* ---------- receiving ---------- */
function newsHTML(){const P=CW.base&&CW.base.P&&CW.base.P[CW.seat];if(!CW.mine||!S)return"";
 const L=[];for(const k in CW.mine){if(k==="rank")continue;const d=(S[k]||0)-(CW.mine[k]||0);if(d)L.push(`${(typeof NAMES==="object"&&NAMES[k])||k} ${d>0?"+":""}${d}`)}
 return L.length?`<p>Trong tuần, chuyện bên ${esc(friendName())} và trong cung khiến ngươi: <b>${L.join(", ")}</b>.</p>`:""}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function friendName(){const P=CW.base&&CW.base.P&&CW.base.P[fs()];return P?(P.name||(P.S&&P.S.name)||"hảo hữu"):"hảo hữu"}
function worldNews(C){if(host())return"";const n=C.W&&C.W.S&&C.W.S.cnews;if(!n||!n.h)return"";
 return String(n.h).split(kRx("(?<=\\.\\s|<\\/span>\\s?|<\\/b>\\s?)","")).filter(x=>x.trim()&&!/gươi/.test(x)).join(" ")}
/* review r7 (coop-e2e "week after rebirth advances" / "after week 3 same date"): a socket that drops under load reconnects and gets a
   `room` snapshot; the room handler took "room week > my sent week" as "the merge happened while I was away" and rebuilt the week from
   the room's base even when that merge had ALREADY been applied here (sent = w, merged week w+1 received, then the reconnect): her whole
   week so far (buổi sáng → tối) was thrown back to buổi sáng while the server stayed at buổi tối (`badbuoi`), and the two seats split
   (one ended the week alone, the other could never end it). CW.wkIn = the last merged week applied here; a week is applied once. */
function onWeek(m){T("week "+m.week+" in "+CW.wkIn);if(!CW.on||!m.state)return;if(typeof m.week==="number"&&CW.wkIn===m.week){T("week dup");return}
 const C=m.state;CW.base=J(C);CW.pend=false;if(typeof m.week==="number")CW.wkIn=m.week;
 const wasDead=S&&S.dead;const ok=fromCanon(C,{keepQ:true});if(!ok)return;
 const P=C.P[CW.seat];
 if(!wasDead&&S.dead){S.dead=false;try{die(P.S.coopWhy||"Bị hại trong cung")}catch(e){console.error(e)}return}
 if(S.coopCold){S.coopCold=0;if(!S.out)try{cold("Bị đày vào lãnh cung")}catch(e){console.error(e)}}
 /* jkc: the friend passed the tuyển tú this week and entered the palace */
 const fP=C.P[fs()];if(fP&&!fP.dead){const home=friendHome(fP);if(CW.fWasHome&&!home&&fP.S&&fP.S.kc&&fP.S.kc.inPal)pushModal({t:"Hảo hữu nhập cung",h:`<p>Hảo hữu ngươi qua kỳ tuyển tú, nay vào cung, phong ${esc(RANKS[fP.rank]?RANKS[fP.rank].n:"")}. Mặt mũi, tên tuổi ra sao, phải gặp mới biết.</p><p class="past">Muốn gặp nhau: hai người cùng đến một nơi trên Dư đồ trong cùng một buổi, rồi chạm vào người kia và chọn Chào hỏi.</p>`});CW.fWasHome=home}
 const h=newsHTML()+(worldNews(C)?`<p>${worldNews(C)}</p>`:"");CW.mine=null;
 if(h)pushModal({t:"Tuần mới",h:`<p class="past">${when()}</p>${h}`});
 CW.bend=false;CW.posKey="";if(CW.p2&&S&&(S.buoi||0)!==0){S.buoi=0;used=0}/* every week starts at buổi sáng for both */
 if(host())sendWhere();else if(CW.lastWhere)applyWhere(CW.lastWhere);keepFriendPos();refreshHere();
 showModal();render();lockNext()}
function onState(m){T("state");if(!CW.on||!m.state)return;const C=m.state;
 if(!CW.base){CW.base=J(C);if(CW.waitWorld){CW.waitWorld=false;try{COOP_LOBBY.hostPick(false)}catch(e){}newLife()}return}
 /* the friend's character changed (first character / reborn): keep my week, take the new base and her new entry */
 const had=CW.base;CW.base=J(C);if(had&&had.P&&had.P[CW.seat]&&C.P&&!C.P[CW.seat])CW.base.P[CW.seat]=had.P[CW.seat];
 if(S&&!S.dead&&!CW.inLife){const old=friendEntry();placeFriend(C.P[fs()]);
  const P=C.P[fs()];const fk=P&&((P.name||"")+"#"+(P.life||0)+(friendHome(P)?"h":""));if(P)CW.fWasHome=friendHome(P);
  if(P&&!P.dead&&(old?old.name!==P.name:CW.fNote!==fk)){CW.fNote=fk;const home=friendHome(P);
   pushModal({t:home?"Hảo hữu chọn thân phận":"Hảo hữu vào cung",h:`<p>Hảo hữu ngươi ${old?"đã đầu thai, ":"đã chọn xong thân phận, "}${home?"nay còn ở nhà cha chờ kỳ tuyển tú, chưa vào cung":"nay ở trong cung"+(friendSrv(P)?", làm cung nữ":", phong "+esc(RANKS[P.rank]?RANKS[P.rank].n:""))}. Mặt mũi, tên tuổi kiếp này ra sao, phải gặp mới biết.</p>`+(home?`<p class="past">Qua kỳ tuyển tú, nàng sẽ vào cung; khi ấy hai người mới gặp được nhau.</p>`:`<p class="past">Muốn gặp nhau: hai người cùng đến một nơi trên Dư đồ trong cùng một buổi, rồi chạm vào người kia và chọn Chào hỏi.</p>`)})}
  showModal();render()}}
function newLife(){CW.inLife=true;CW.newLife=true;try{start()}catch(e){console.error(e)}}
function begin(d){T("begin");CW.on=true;CW.seat=d.you||COOP.state.you;CW.ssv=COOP.state.msv||0;CW.ssvWk=wk();CW.seatOld=false;const C=d.state||COOP.state.C;CW.base=C?J(C):null;CW.sent=-1;CW.pend=false;CW.wkIn=C&&typeof C.week==="number"?C.week:undefined;
 const s=COOP.state;
 if(C&&C.P&&C.P[CW.seat]&&!C.P[CW.seat].dead){fromCanon(C);CW.fWasHome=friendHome(C.P[fs()]);/* a fresh page (came back by link / reload) has no hand of cards yet: deal it, as loading a sổ does */if(!deck||!deck.length)try{deal()}catch(e){console.error(e)}if(s.ended&&s.ended[CW.seat])CW.sent=wk();
  /* rejoin / reload (owner 16/11: "khắc và việc đã làm bị mất"): her own week as it stood (snapLoad), never the week start again */
  if(CW.sent!==wk()){const o=snapLoad(C);if(o&&CW.restore(o)){T("restored "+o.week+"."+o.buoi+" u"+o.used);return}}try{$("title").hidden=true}catch(e){}syncRoom(CW.roomMsg);showModal();render();lockNext();return}
 if(!C&&!host()){CW.waitWorld=true;/* the lobby keeps the title backdrop up with a kit panel "Đợi bạn chọn thân phận" (no empty game frame) */try{COOP_LOBBY.hostPick(true)}catch(e){console.error(e)}return}
 newLife()}
COOP.on("start",begin);
/* leaving the shared game: back to single-player rules (slots untouched; the room keeps the world) */
COOP.on("stop",()=>{CW.on=false;CW.base=null;CW.pend=false;CW.sent=-1;CW.inLife=false;CW.dying=null;try{const L=pullFriend();void L;lockNext()}catch(e){}});
COOP.on("week",onWeek);
COOP.on("state",onState);
/* room snapshot (connect / reconnect): buổi, last where, last pos of both */
function syncRoom(m){if(!m||!CW.on||!S)return;try{const o=COOP.other();if(m.where)CW.lastWhere=m.where;if(m.pos&&m.pos[o])onPos(Object.assign({from:o},m.pos[o]))}catch(e){}
 /* a `bend` / `end` sent while the socket was down (COOP.send drops it when the socket is not open) is lost: the seat waits for a
    friend who waits for it. The room snapshot after the reconnect says what the server holds; send it again. */
 try{if(!S.dead&&m.week===wk()){const me=CW.seat;
  if(CW.bend&&m.buoi===(S.buoi||0)&&m.bended&&!m.bended[me]){T("rebend "+m.week+"."+m.buoi);CW.bend=false;bend()}
  if(CW.sent===wk()&&m.ended&&!m.ended[me]){T("re-end "+m.week);CW.sent=-1;CW.pend=true;soonEnd()}}}catch(e){console.error(e)}
 if(CW.p2&&!S.dead&&m.week===wk()&&CW.sent!==wk()&&typeof m.buoi==="number")while((S.buoi||0)<m.buoi){const b0=S.buoi||0;onBuoi({week:m.week,buoi:b0+1});if((S.buoi||0)===b0)break}/* a dialog open: onBuoi keeps the step as pendBuoi (stepped when it closes) — before, nothing caught her up and her next bend was refused (badbuoi): stuck */
 if(host())sendWhere();else if(CW.lastWhere)applyWhere(CW.lastWhere);sendPos();lockNext()}
COOP.on("room",m=>{if(m.buoi!==undefined)CW.p2=true;CW.roomMsg=m;T("room "+m.week+"."+m.buoi+" sent "+CW.sent+" in "+CW.wkIn);if(!CW.on||!m.state)return;const C=m.state;
 /* reconnect: the merge happened while we were away → rebuild; otherwise keep the local week */
 if(CW.sent>=0&&m.week>CW.sent&&m.week!==CW.wkIn){onWeek({state:C,week:m.week});return}
 if(!CW.base)CW.base=J(C);else{CW.base.P=J(C.P);CW.base.W=J(C.W)}syncRoom(m)});

/* ---------- the night gate (review/coop-night-sync, owner rule "nobody runs ahead") ----------
   Before: "Sẵn sàng" at buổi tối ran endTurn() at once on that client (lật thẻ, night events, quẻ, month steps, week book, the buổi
   curtain to sáng) and only then sent `end`: the first to press sat in the NEW day while the friend was still in her buổi tối.
   Now buổi tối is gated like the day buổi, host-authoritative, over the relayed `act` channel (no Worker change):
     her press → CW.nrdy = week; guest sends {k:"ctm-nr",mode:"rd"}; the HOST commits {mode:"go"} when both are ready, when the room
     clock ran out (CW.forceNight from jcooptimer), when the guest seat is empty, or when the other seat already sent its `end`.
     On `go` (CW.ngoW = week) each seat runs its night (nextBuoi → endTurn → end) as soon as no dialog / mini game is open.
   Lost messages (socket drop): a ready guest re-sends rd on every room snapshot / peer return; a host that already went answers
   any rd with go again. A seat whose friend already sent `end` for this week takes that as the host's commit. */
const NK="ctm-nr";
function nsay(mode){try{COOP.send({t:"act",k:NK,mode,week:wk(),id:NK+mode+wk()+":"+Date.now().toString(36)})}catch(e){}}
function nAtNight(){return !!(S&&!S.dead&&(S.buoi||0)>=LASTB())}
function nReady(){return CW.on&&CW.nrdy===wk()&&nAtNight()&&CW.sent!==wk()&&!CW.pend}
function nOtherEnded(){const e=COOP.state.ended||{};return !!e[fs()]}
function nOtherGone(){const s=COOP.state.seats;return !!(s&&typeof s==="object"&&(fs() in s)&&!s[fs()])}
function nightReady(){if(CW.nrdy===wk()){nCheck();return}CW.nrdy=wk();T("nready "+wk());if(!host())nsay("rd");nCheck();lockNext();try{render()}catch(e){}}
function nGoNow(){if(!host()||CW.ngo===wk())return;CW.ngo=wk();T("ngo "+wk());nsay("go");CW.ngoW=wk()}
/* host: commit when both are ready (or forced); every seat: run the committed night once free */
function nCheck(){if(!CW.on||!S)return;const w=wk();
 if(host()&&CW.ngo!==w&&nAtNight()&&((CW.nrdy===w&&(CW.nfr===w||nOtherGone()))||CW.nforce===w||nOtherEnded()))nGoNow();
 if(!host()&&CW.ngoW!==w&&nAtNight()&&nOtherEnded()&&COOP.state.week===w)CW.ngoW=w;   /* the host's end is out: it committed */
 if(CW.ngoW!==w||CW.pend||CW.sent===w||!nAtNight()||S.dead||Q.length||S.mg||frozen()||!CW.base||needWhere()||CW.inLife)return;
 T("night "+w);CW.allowN=true;try{nextBuoi()}finally{CW.allowN=false}}
CW.forceNight=()=>{if(!CW.on||!host()||!nAtNight()||CW.ngo===wk())return false;CW.nforce=wk();nCheck();return true};
CW.nReady=nReady;
COOP.on("act",m=>{if(!m||m.k!==NK||!CW.on||m.from===CW.seat)return;T("nr "+m.mode+" "+m.week+" me "+wk());if(m.week!==wk())return;
 if(m.mode==="rd"&&host()){CW.nfr=m.week;if(CW.ngo===m.week)nsay("go");else nCheck()}
 else if(m.mode==="go"&&!host()){CW.ngoW=m.week;nCheck()}
 lockNext()});
function nResync(){if(!CW.on||!S)return;if(!host()&&CW.nrdy===wk()&&CW.ngoW!==wk())nsay("rd");if(host()&&CW.ngo===wk())nsay("go");nCheck()}
COOP.on("room",()=>setTimeout(nResync,350));COOP.on("peer",on=>{if(on)setTimeout(nResync,350)});
COOP.on("presence",()=>{if(CW.on){nCheck();lockNext()}});

/* ---------- hooks ---------- */
const mute=n=>{const f=window[n];if(typeof f!=="function")return;window[n]=function(){if(CW.on&&!host())return "";return f.apply(this,arguments)}};
["rivalsTurn","rivalsMonth","festival"].forEach(mute);
/* host: keep the world news text of the week for the guest */
["rivalsTurn","rivalsMonth","festival"].forEach(n=>{const f=window[n];if(typeof f!=="function")return;window[n]=function(){const r=f.apply(this,arguments);if(CW.on&&host()&&typeof r==="string")CW.news+=r;return r}});
(function(){const f=emperorDies;emperorDies=function(){if(CW.on){try{if(arguments[0])log(arguments[0])}catch(e){}return}return f.apply(this,arguments)}})();
/* guest: an NPC's buổi act only lands when it is aimed at her (NPC vs NPC rolls on the host) */
(function(){const f=pickTarget;pickTarget=function(v){if(CW.on&&isF(v))return null;const t=f.apply(this,arguments);if(CW.on&&!host()&&t!==S)return null;return t}})();
(function(){const f=rivalsBuoi;rivalsBuoi=function(){return withoutFriend(()=>f.apply(this,arguments))}})();
(function(){const f=endTurn;endTurn=function(){if(CW.on){if(waiting()||frozen()||CW.pend||!CW.base)return;CW.news=""}
 if(!CW.on)return f.apply(this,arguments);let r;CW.inTurn=true;const alt=typeof CW.altTurn==="function"?CW.altTurn():null;/* a route with its own week (jkc at home: kcEndTurn) */try{r=withoutFriend(()=>(alt||f).apply(this,arguments))}finally{CW.inTurn=false}if(S){CW.pend=true;try{render()}catch(e){}lockNext()}return r};CW.weekEnd=endTurn/* a route with its own week (jkc) calls this directly, past the palace-only wrappers made after it */})();
(function(){const f=nextBuoi;nextBuoi=function(){if(!CW.on)return f.apply(this,arguments);if(waiting()||frozen()||CW.pend||!CW.base)return;
 /* same buổi for both: buổi sáng / chiều end with `bend`; the server's `buoi` runs the real step (CW.allow); buổi tối ends the week (`end`) */
 if(CW.p2&&!CW.allow&&(S.buoi||0)<(typeof B4L==="number"?B4L:2)){if(!S||S.dead||Q.length||S.mg||needWhere())return;bend();return}
 /* buổi tối: "Sẵn sàng" only marks her ready; the night + week end (endTurn) runs on the host's `go` for both (nightReady below) */
 if(CW.p2&&!CW.allowN&&(S.buoi||0)>=LASTB()){if(!S||S.dead||Q.length||S.mg||needWhere())return;nightReady();return}
 const r=f.apply(this,arguments);if(!CW.pend){keepFriendPos();refreshHere()}return r}})();
/* #next was wired to the bare nextBuoi in j6 (before any wrapper): in co-op route the button through the wrapped one */
(function(){const n=$("next");if(!n)return;const o=n.onclick;n.onclick=function(e){if(CW.on)return nextBuoi();return o?o.call(this,e):undefined}})();
/* NPC whereabouts are the host's: the guest's own placement is replaced by the host's for this buổi; the host re-sends whenever it re-places */
(function(){const f=placeWhere;placeWhere=function(){const r=f.apply(this,arguments);if(CW.on)try{if(!host()&&CW.p2){if(!setWhere(CW.lastWhere))CW.whereKey=""}keepFriendPos();if(host()&&CW.p2&&!CW.pend&&!CW.inTurn)sendWhere()/* the new week's places go out with the merged week, not from inside endTurn */}catch(e){}return r}})();
(function(){const f=goTo;goTo=function(){const r=f.apply(this,arguments);if(CW.on)try{sendPos()}catch(e){}return r}})();
(function(){const f=save;save=function(){if(!CW.on)return f.apply(this,arguments);try{if(S&&!S.dead&&CW.base)localStorage.setItem("ctm-coop-last",JSON.stringify({room:COOP.state.room,at:Date.now()}))}catch(e){}}})();
(function(){const f=over;over=function(){if(CW.on&&S&&!S.dead){/* keep the world as it stands at her death; the new life is put into it */
  try{S.dead=true;CW.dying=toCanon();S.dead=false}catch(e){console.error(e)}}return f.apply(this,arguments)}})();
/* never leave a queued dialog unseen (a rebuild from the room can drop the open panel): the turn would wait on it forever */
let qT=0;function reshowQ(){qT=0;try{const M=$("modal");if(CW.on&&S&&Q.length&&M&&M.hidden&&!document.querySelector(".kbk-bar"))showModal()}catch(e){}}
(function(){const f=render;render=function(){const r=f.apply(this,arguments);if(CW.on)try{lockNext();soonEnd();sendPos();if(Q.length&&!qT)qT=setTimeout(reshowQ,400)}catch(e){}return r}})();
(function(){const f=closeModal;closeModal=function(){/* the guest's "Đợi bạn" note can be closed before any world exists */
 if(CW.on&&!S){Q.shift();if(Q.length)showModal();else{const m=$("modal");if(m)m.hidden=true}return}const r=f.apply(this,arguments);if(CW.on)soonEnd();return r}})();
COOP.on("status",()=>{if(CW.on){lockNext();soonEnd()}});
/* the rebirth / first-life flow: Luân hồi builds the life (nlRun), she accepts it (nlAccept) */
if(typeof nlRun==="function"){const f=nlRun;nlRun=function(){const r=f.apply(this,arguments);try{if(CW.on){const C=CW.dying||CW.base;if(C)attach(C);CW.inLife=true}}catch(e){console.error(e)}return r};}
if(typeof nlAccept==="function"){const f=nlAccept;nlAccept=function(){const r=f.apply(this,arguments);try{if(CW.on&&CW.inLife&&S&&!S.dead){CW.inLife=false;if(CW.holdMe)CW.heldMe=true;else sendMe()}}catch(e){console.error(e)}return r};}
/* a start() that bypasses Luân hồi (window.__nlInner): attach + send at once */
(function(){const f=start;start=function(){const r=f.apply(this,arguments);try{if(CW.on&&window.__nlInner&&S&&!S.dead){const C=CW.dying||CW.base;if(C)attach(C);CW.inLife=false;sendMe()}}catch(e){console.error(e)}return r}})();
CW.toCanon=toCanon;CW.fromCanon=fromCanon;CW.friend=friendEntry;CW.sendEnd=sendEnd;
/* co-op buổi clock (jcooptimer, KIT §69): read-only views + the one forced step it may take. forceBend = "Sẵn sàng" pressed for her when
   the buổi ran out: sends `bend` even with a dialog / mini game open (the room's step then waits for it: CW.pendBuoi, nothing is cut);
   only for the day buổi (tối ends through nextBuoi → endTurn → end), only when her buổi is the room's buổi and not already ended. */
CW.isWaiting=waiting;CW.isFrozen=frozen;CW.lockNext=lockNext;
CW.forceBend=()=>{if(!CW.on||!S||S.dead||CW.inLife||CW.bend||waiting()||frozen()||CW.pend||!CW.base||!CW.p2)return false;const b=S.buoi||0;
 if(b>=(typeof B4L==="number"?B4L:2))return false;if(typeof CW.rbuoi==="number"&&CW.rweek===wk()&&CW.rbuoi!==b)return false;bend();return true};
/* rolling copy of her week (review/coop-night-sync): written ~1 s after each render and when the page hides, read back by begin()
   on a reload / rejoin. Only taken for the same room, seat, week, life and name; a sent / pending week end is never restored. */
/* review/coop-rejoin-xdev: the same copy also goes to the room's server as HER SEAT COPY ({t:"seat"}, coop/worker Room "seat-<seat>"),
   so a rejoin from ANOTHER device (same seat through Sổ mây's pid, jcoop pidFor) or with cleared storage gets her exact week back.
   Sent when it changed, at most every SEAT_MS, and at once when the page hides. Version = the server's counter (seatok → CW.ssv).
   Newest wins on rejoin (pickSnap): a local copy and a server copy written by THIS device (same dev id) → the local one (it is at
   least as new); else the server copy when its version is newer than the last version this device saw, else the local one. */
const SNK="ctm-coop-wk",SEAT_MS=3000;let svT=0,seatT=0,seatAt=0,seatLast="";
const DEV=(()=>{try{let d=localStorage.getItem("ctm-coop-dev");if(!d){d=Math.random().toString(36).slice(2,12)+Date.now().toString(36);localStorage.setItem("ctm-coop-dev",d)}return d}catch(e){return "x"+Math.random().toString(36).slice(2,10)}})();
function snapSave(now){svT=0;try{const o=CW.snap&&CW.snap();if(o){o.dev=DEV;o.sv=CW.ssv||0;localStorage.setItem(SNK,JSON.stringify(o));seatPush(o,now)}}catch(e){}}
function snapSoon(){if(CW.on&&!svT)svT=setTimeout(snapSave,1000)}
/* review/lag-play-2: the seat copy is ~40 KB; when the server can (room reply caps "seatd") only the PARTS that changed since the copy
   the server confirmed (seatok) are sent: {t:"seatd",sv,set,del}. The server applies them on top of exactly version sv, else answers
   "seatresync" and the next push is the full copy again. Parts = buoi, used, c, d.<key>, d.S.<key> (one JSON string each). */
let seatBase=null,seatPend=null,seatBusy=0;
function seatParts(o){const P={buoi:JSON.stringify(o.buoi),used:JSON.stringify(o.used),c:JSON.stringify(o.c)};const d=o.d||{};
 for(const k in d){if(k==="S"&&d.S&&typeof d.S==="object"){for(const j in d.S)if(d.S[j]!==undefined)P["d.S."+j]=JSON.stringify(d.S[j])}else if(d[k]!==undefined)P["d."+k]=JSON.stringify(d[k])}return P}
function seatDelta(P,B){const set={},del=[];let n=0;for(const k in P)if(B[k]!==P[k]){set[k]=JSON.parse(P[k]);n++}
 for(const k in B)if(!(k in P))del.push(k);return {set,del,n:n+del.length}}
function seatPush(o,now){if(!CW.on||CW.seatOld||!o||COOP.state.status!=="open")return;
 if(seatBusy&&Date.now()-seatBusy>10000)seatBusy=0;  /* no seatok within 10 s (socket dropped): give up waiting */
 if(!now&&(seatBusy||Date.now()-seatAt<SEAT_MS)){if(!seatT)seatT=setTimeout(()=>{seatT=0;snapSave()},Math.max(400,SEAT_MS-(Date.now()-seatAt)));return}
 const P=seatParts(o);const k=JSON.stringify([o.week,P]);if(k===seatLast)return;
 const caps=COOP.state.caps||[];let msg;
 if(caps.indexOf("seatd")>=0&&!Object.keys(P).some(x=>x.split(".").length>(x.startsWith("d.S.")?3:2))&&seatBase&&seatBase.wk===o.week&&seatBase.sv===(CW.ssv||0)&&!seatBusy){const D=seatDelta(P,seatBase.P);
  msg={t:"seatd",sv:CW.ssv||0,set:D.set,del:D.del,dev:o.dev}}
 else msg={t:"seat",sv:CW.ssv||0,o};
 seatAt=Date.now();seatBusy=Date.now();seatPend={P,wk:o.week};COOP.send(msg).then(ok=>{if(ok)seatLast=k;else{seatBusy=0;seatPend=null}})}
COOP.on("seatok",m=>{if(typeof m.sv==="number"){CW.ssv=Math.max(CW.ssvWk===wk()?CW.ssv||0:0,m.sv);CW.ssvWk=wk();
 if(seatPend&&CW.ssv===m.sv)seatBase={P:seatPend.P,wk:seatPend.wk,sv:m.sv};else seatBase=null}seatBusy=0;seatPend=null});
COOP.on("error",m=>{if(!m)return;if(m.code==="seatold"){CW.seatOld=true;seatBase=null;seatBusy=0;T("seatold "+m.sv)}
 if(m.code==="seatresync"||m.code==="seatbig"||m.code==="badseat"){seatBase=null;seatBusy=0;seatPend=null;seatLast="";if(m.code==="seatresync"){T("seatresync "+m.sv);snapSoon()}}});
COOP.on("week",m=>{seatLast="";seatBase=null;seatBusy=0;seatPend=null;CW.seatOld=false;CW.ssv=0;CW.ssvWk=m&&m.week});  /* the server starts the seat versions again each week */
/* review/coop-rejoin-xdev-r1: a device that was only ASLEEP (socket gone, page kept, e.g. the Fold locked) while she played on another
   device reconnects by itself (no begin): when the room's copy of her seat is newer and was written by another device, take it, so this
   device does not go on with its stale week (and its own copies are accepted again instead of "seatold"). */
COOP.on("room",m=>{seatBase=null;seatBusy=0;seatPend=null;seatLast="";if(!CW.on||!CW.base||!m||!m.state)return;const R=m.mine;
 if(!R||!R.dev||R.dev===DEV||(R.sv||0)<=(CW.ssvWk===R.week?CW.ssv||0:0)||!snapOk(R,m.state))return;T("snap wake server sv"+(R.sv||0));
 if(CW.restore(R)){CW.ssv=m.msv||R.sv||0;CW.ssvWk=R.week;CW.seatOld=false;seatLast="";T("restored "+R.week+"."+R.buoi+" u"+R.used)}});
function snapOk(o,C){const P=C&&C.P&&C.P[CW.seat];
 return !!(o&&o.d&&P&&o.room===COOP.state.room&&o.seat===CW.seat&&o.week===wk()&&(o.c&&o.c.life||0)===(P.life||0)&&o.d.S&&o.d.S.name===P.name)}
function pickSnap(L,R){if(!R)return L;if(!L)return R;if(R.dev&&R.dev===L.dev)return L;return (R.sv||0)>(L.sv||0)?R:L}
function snapLoad(C){try{let L=null;try{L=JSON.parse(localStorage.getItem(SNK)||"null")}catch(e){}if(!snapOk(L,C))L=null;
 const R=snapOk(COOP.state.mine,C)?COOP.state.mine:null;const o=pickSnap(L,R);
 CW.ssv=Math.max(L&&L.sv||0,COOP.state.msv||0);CW.ssvWk=wk();CW.seatOld=false;seatLast="";if(o)T("snap "+(o===R?"server":"local")+" sv"+(o.sv||0));return o}catch(e){return null}}
CW.pickSnap=pickSnap;CW.seatVer=()=>({ssv:CW.ssv||0,dev:DEV,old:!!CW.seatOld});
addEventListener("pagehide",()=>{if(CW.on)snapSave(true)});document.addEventListener("visibilitychange",()=>{if(CW.on&&document.hidden)snapSave(true)});
(function(){const f=render;render=function(){const r=f.apply(this,arguments);try{snapSoon()}catch(e){}return r}})();
/* new build in co-op (dev/site/swreg.js, KIT §35.2): the page reloads into the new build and rejoins the room. The room only holds the
   week's base, so the local week (acts of this week's buổi, her khắc, the friend entry) is kept across the reload:
   CW.snap() → plain JSON written before the reload; CW.restore(o) right after the rejoin (COOP "start" → begin) puts it back when the
   room is still in the same week, then catches up with the room (buổi, host's NPC places, the friend's last place). */
CW.snap=()=>{if(!CW.on||!S||S.dead||!CW.base||CW.inLife)return null;let d;try{d=ser()}catch(e){return null}
 return {room:COOP.state.room,seat:CW.seat,week:wk(),buoi:S.buoi||0,used,d,c:{nrdy:CW.nrdy,sent:CW.sent,pend:CW.pend,whereKey:CW.whereKey,lastWhere:CW.lastWhere,fpos:CW.fpos,mine:CW.mine||null,life:CW.life||0,p2:CW.p2,news:CW.news||""}}};
CW.restore=o=>{if(!o||!o.d||!CW.on||o.seat!==CW.seat||o.week!==wk()||o.c.pend||o.c.sent===wk()||(CW.rweek===wk()&&typeof CW.rbuoi==="number"&&CW.rbuoi<o.buoi))return false;
 quiet=true;try{if(o.d)o.d.tab="act";/* owner 16/11: rejoin opens her room (Hành sự) */deser(o.d)}finally{quiet=false}used=o.used||0;try{deal()}catch(e){}  /* the hand of acts is not in a sổ: dealt again, as the title's Tiếp tục does */
 Object.assign(CW,o.c);CW.bend=false;CW.pendBuoi=null;CW.posKey="";CW.inLife=false;
 /* her "Sẵn sàng" of this buổi survives too: the room still holds her bend (the night's ready is re-sent by nResync) */
 {const rm=CW.roomMsg;if(rm&&rm.week===wk()&&rm.buoi===(S.buoi||0)&&rm.bended&&rm.bended[CW.seat])CW.bend=true}
 try{keepFriendPos();refreshHere()}catch(e){}syncRoom(CW.roomMsg);try{$("title").hidden=true}catch(e){}
 if(Q.length)showModal();render();lockNext();return true};

}catch(e){console.error(e)}})();
