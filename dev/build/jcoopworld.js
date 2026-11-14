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
   Week: "Qua đêm" runs endTurn() locally (friend entry taken out; on the guest the world-agency functions are muted so
   world events roll once, on the host); once the week's dialogs are read, the client sends {t:"end",week,state:C} and waits
   (#next disabled; jcooplobby shows "Đợi bạn xong tuần"). The merged C comes back as {t:"week"} and the local game is rebuilt.
   Death: the normal rebirth flow (over → "Đầu thai kiếp sau" → Luân hồi card). nlRun is hooked so the new life is put into the
   SAME world (the world as it stood when she died); nlAccept sends {t:"me"} with her new blob. Hook for later origin routes:
   COOPW.attach() can be called by any route that builds a fresh S (e.g. tiểu thư ngoài cung) to drop it into the shared world.
   Save: in co-op, save() keeps the slots untouched and stores the canonical C in localStorage "ctm-coop-last" (the room's DO is
   the real save). */
(function(){try{
if(typeof COOP!=="object")return;
const W_KEYS=["year","month","tuan","turn","emp","thDead","thAge","thO","thF","court","wx","vacSince","trieu","storms","festDone","usedFaces","fidUsed","kidUsed"];
const REFF=["resHead","spyFor","lover","mid","owner","by","who","tgt","from","to"];   /* fields whose "me" value names the viewer */
const STAT=["sung","danh","bac","suc","sac","tai","tamco","duc","th","hh","mat","confined","shield","block"];
const LOOK=["face","fc","fk","fcKeep","fid","pid","age","sac","tai","tamco","duc","arts","pal","resHead","dress","ill","maid","lot"];
const J=x=>x==null?x:JSON.parse(JSON.stringify(x));
const CW=window.COOPW={on:false,seat:"",base:null,pend:false,sent:-1,dying:null,attachC:null,news:"",life:0};
const me=()=>CW.seat==="a"?901:902, fp=()=>CW.seat==="a"?902:901, fs=()=>CW.seat==="a"?"b":"a";
const isF=v=>!!(v&&v.coop);
const host=()=>CW.seat==="a";
function wk(){return COOP.state.week||0}

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
function buildFriend(P,mine){if(!P||!P.S||P.dead||P.S.dead)return null;const s=J(P.S),mp=me();
 const rl=Object.assign({},s.rl||{}),ro=Object.assign({},s.ro||{});const rel=rl[mp]||0,oan=ro[mp]||0;delete rl[mp];delete ro[mp];
 const cev=s.cev||{};
 const v={id:fp(),coop:true,name:P.name||s.name,rank:s.rank||0,queen:(s.rank||0)>=7,trait:"Nhu mì",malice:15,rel,oan,rl,ro,ev:((mine||S||{}).cev||{})[fp()]||0,
  evm:{me:cev[mp]||0},alive:true,out:!!s.out,kids:[],ghen:0,pg:0,nights:0,inv:[],staff:[],nightLog:[]};
 for(const k of STAT)if(s[k]!=null)v[k]=s[k];for(const k of LOOK)if(s[k]!=null)v[k]=s[k];
 mapMe(v,false,mp);v.id=fp();
 v.__b=J(Object.assign({},...STAT.map(k=>({[k]:v[k]})),{rel:v.rel,oan:v.oan,rl:v.rl,ro:v.ro,em:v.evm.me,out:v.out,rank:v.rank}));
 return v}
function buildFriendSrv(P){const s=P.S;return {sid:fp(),coop:true,name:P.name||s.name,role:"maid",fc:s.fc,fk:s.fk,face:0,hue:0,age:s.age||18,tr:"trung",loyal:60,
 spyFor:null,lover:null,af:{},kn:1,imp:"bạn chơi cùng",org:"bạn chơi cùng"}}
function pullFriend(){const out=[];for(let i=rivals.length-1;i>=0;i--)if(isF(rivals[i]))out.push([i,rivals.splice(i,1)[0]]);
 for(const v of rivals)if(v.staff)for(let i=v.staff.length-1;i>=0;i--)if(isF(v.staff[i]))out.push([-1,v.staff.splice(i,1)[0],v]);return out}
function pushFriend(L){for(const [i,v,m] of L.reverse()){if(i<0){if(m&&m.staff&&!m.staff.includes(v))m.staff.push(v)}else if(!rivals.includes(v))rivals.splice(Math.min(i,rivals.length),0,v)}}
function withoutFriend(f){if(!CW.on||!S||CW.pulled)return f();const L=pullFriend();CW.pulled=L;try{return f()}finally{CW.pulled=null;pushFriend(L)}}
function friendEntry(){return rivals.find(isF)||null}
/* knowledge (owner 14/11): the friend follows j61 like any NPC — "Người lạ" until met. Her new life (rebirth) is a new person:
   forget what I knew of the old one (j61 stage, my Thiện cảm / Oán / chứng cứ toward that id). */
function forgetFriend(o){const id=fp(),k="r"+id;if(!o)return;try{if(o.known)delete o.known[k];if(o.nkn)delete o.nkn[k]}catch(e){}
 if(o.rl)delete o.rl[id];if(o.ro)delete o.ro[id];if(o.cev)delete o.cev[id]}
function freshFriend(P,o){if(!P)return;const key=(P.name||(P.S&&P.S.name)||"")+"#"+(P.life||0);if(CW.fKey!==undefined&&CW.fKey!==key)forgetFriend(o||S);CW.fKey=key}
function placeFriend(P){pullFriend();if(!P)return;if(S)freshFriend(P,S);
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
  r.rel=r.rl[mp]||0;r.oan=r.ro[mp]||0;r.ghen=r.gp[mp]||0;r.ev=r.ep[mp]||0;delete r.rl[mp];delete r.ro[mp];delete r.gp[mp];delete r.ep[mp];
  return mapMe(r,false,mp)});
 const qs=(typeof serQ==="function"&&opt.keepQ)?serQ():[];
 const fP=C.P[fs()];if(fP)freshFriend(fP,sS);
 const f=fP&&!friendSrv(fP)?buildFriend(fP,sS):null;if(f)R.push(f);
 const keepTab=tab,keepUsed=used;quiet=true;
 try{deser({v:6,buoi:sS.buoi||0,ok:Pm.ok||"tt",S:sS,R,rid:C.W.rid||rid,tab:keepTab,used:keepUsed,P:qs})}finally{quiet=false}
 if(!opt.keepUsed)used=0;else used=keepUsed;
 /* guard enums/levels that a numeric merge could push out of range */
 const ci=(v,a,b)=>typeof v==="number"?Math.max(a,Math.min(b,Math.round(v))):v;
 if(S.emp)S.emp.mood=ci(S.emp.mood,0,3);S.rank=ci(S.rank,0,7);S.tuan=ci(S.tuan,0,2);S.month=ci(S.month,1,12);S.buoi=ci(S.buoi||0,0,2);
 for(const v of rivals){v.rank=ci(v.rank,0,7);try{ap(v,{})}catch(e){}}
 if(friendSrv(fP))placeFriend(fP);CW.life=Pm.life||0;return true}

/* put a freshly built life (S + throwaway world from start()) into the shared world W of C */
function attach(C){if(!C||!C.W)return;const mp=me();
 const keep={};for(const k in S)if(!W_KEYS.includes(k))keep[k]=S[k];
 const known=S.emp&&S.emp.known;
 /* the new life knows nobody yet: drop every link into the throwaway world */
 keep.rl={};keep.ro={};keep.tonight=null;keep.heir=null;keep.evd={};keep.chat={};keep.cev={};keep.resHead=null;keep.where=null;keep.dead=false;
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

/* ---------- sending ---------- */
function sendEnd(){if(!CW.on||!S||S.dead||CW.sent===wk())return;const C=toCanon();CW.sent=wk();CW.pend=false;CW.mine=snapStats();
 COOP.send({t:"end",week:wk(),state:C});try{localStorage.setItem("ctm-coop-last",JSON.stringify({room:COOP.state.room,C}))}catch(e){}lockNext()}
function sendMe(){if(!CW.on||!S||S.dead)return;const C=toCanon();CW.dying=null;
 if(!CW.base){/* host's first world */COOP.send({t:"init",state:C});CW.base=C}else{COOP.send({t:"me",P:C.P[CW.seat]});CW.base.P=CW.base.P||{};CW.base.P[CW.seat]=J(C.P[CW.seat])}
 try{if(CW.base&&CW.base.P&&CW.base.P[fs()]&&!friendEntry())placeFriend(CW.base.P[fs()])}catch(e){console.error(e)}
 if(host())sendWhere();else if(CW.lastWhere)applyWhere(CW.lastWhere);CW.posKey="";sendPos();render()}
function snapStats(){const o={};for(const k of ["sung","danh","bac","suc","sac","tai","tamco","duc","th","hh","rank"])o[k]=S[k];return o}
function waiting(){const s=COOP.state;return CW.on&&(CW.sent===wk()||!!(s.ended&&s.ended[CW.seat]))}
function frozen(){const s=COOP.state;return CW.on&&(s.status!=="open"||!s.peerOnline)}
/* touch #next only when its state really changes (j63 observes every "disabled" write) */
function lockNext(){const n=$("next");if(!n)return;const wb=CW.on&&(CW.bend||needWhere()||!!CW.pendBuoi);const lock=CW.on&&(waiting()||frozen()||CW.pend||!CW.base||wb);
 if(lock){if(!n.disabled)n.disabled=true;if(n.dataset.coopWait!=="1")n.dataset.coopWait="1";const t=wb?(CW.bend?"Đợi bạn xong buổi":"Đợi bạn"):null;if(t&&n.textContent!==t)n.textContent=t}
 else if(n.dataset.coopWait){delete n.dataset.coopWait;n.disabled=!!(S&&(S.dead||Q.length||S.mg));const t=S&&(S.buoi||0)>=2?"Qua đêm":"Qua buổi";if(n.textContent!==t)n.textContent=t}}
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
 for(const v of here)if(!L.some(p=>isR(p)&&p.ref===v))L.push(v.queen&&qOn()?{...rp(v),kind:"hh",name:`Hoàng hậu ${v.name}`,ini:"鳳"}:rp(v));
 const ei=L.findIndex(p=>p.kind==="emp");if(W.emp!==k&&ei>=0&&["vuon","thu","dtd"].includes(k))L.splice(ei,1);
 else if(W.emp===k&&ei<0&&["vuon","thu"].includes(k))L.unshift({kind:"emp",name:"Hoàng thượng",ini:"帝",col:"#f0d070",info:`${empName()} · ${MOODS[S.emp.mood][0].toLowerCase()}`});
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
function onBuoi(m){if(!CW.on||!S)return;CW.bend=false;
 /* the room moved on: if a dialog is still open, step as soon as it is closed */
 if((Q.length||S.mg)&&m.week===wk()&&(S.buoi||0)===m.buoi-1){CW.pendBuoi=m;lockNext();return}CW.pendBuoi=null;
 if(m.week===wk()&&(S.buoi||0)===m.buoi-1&&!S.dead){CW.allow=true;try{nextBuoi()}finally{CW.allow=false}}
 if(host())sendWhere();else if(CW.lastWhere)applyWhere(CW.lastWhere);sendPos();lockNext()}
function bend(){if(CW.bend)return;CW.bend=true;COOP.send({t:"bend",week:wk(),buoi:S.buoi||0});lockNext()}
COOP.on("buoi",onBuoi);
COOP.on("bended",m=>{if(CW.on)lockNext()});
COOP.on("where",m=>{CW.lastWhere=m;if(CW.on)applyWhere(m)});
COOP.on("pos",onPos);
COOP.on("error",m=>{if(CW.on&&m.code==="badbuoi"){CW.bend=false;lockNext()}});

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
 pushModal({t:"Bạn tìm đến",h:`<p><b>${esc(m.who)}</b> ${what}.</p>`,opts:[
  {n:"Nhận",fx:{},x:"bạn tiếp tục việc ấy",go:()=>COOP.send({t:"actr",id:m.id,ok:true,k:m.k})},
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
 if(note){pushModal({t:m.seen==="named"?"Bạn ra tay":"Biến cố",h:note});showModal()}render()}
function onActr(m){if(!CW.on||m.from===CW.seat||m.ack)return;const a=CW.acts[m.id];delete CW.acts[m.id];if(!a)return;const v=RV(a.v);
 if(!m.ok||!v||!v.alive){pushModal({t:"Bạn từ chối",h:`<p><b>${esc(friendName())}</b> không nhận.</p>`});showModal();render();return}
 CW.inv=m.id;let r="";try{r=runAct(S,v,a.k,a.extra)}finally{CW.inv=false}if(r)log(r);
 pushModal({t:"Bạn nhận lời",h:`<p>${r||"Bạn đã nhận."}</p>`});showModal();render()}
COOP.on("act",onAct);COOP.on("res",onRes);COOP.on("actr",onActr);
/* the week's end goes out once her dialogs are read: checked after each render / presence change (event-driven) */
let tryT=0;function tryEnd(){tryT=0;if(CW.on&&CW.pendBuoi&&S&&!Q.length&&!S.mg){onBuoi(CW.pendBuoi);return}if(CW.on&&S&&CW.pend&&!Q.length&&!S.mg&&!S.dead&&!frozen())sendEnd()}
function soonEnd(){if(CW.on&&(CW.pend||CW.pendBuoi)&&!tryT)tryT=setTimeout(tryEnd,0)}

/* ---------- receiving ---------- */
function newsHTML(){const P=CW.base&&CW.base.P&&CW.base.P[CW.seat];if(!CW.mine||!S)return"";
 const L=[];for(const k in CW.mine){if(k==="rank")continue;const d=(S[k]||0)-(CW.mine[k]||0);if(d)L.push(`${(typeof NAMES==="object"&&NAMES[k])||k} ${d>0?"+":""}${d}`)}
 return L.length?`<p>Trong tuần, chuyện bên ${esc(friendName())} và trong cung khiến ngươi: <b>${L.join(", ")}</b>.</p>`:""}
function esc(s){return String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function friendName(){const P=CW.base&&CW.base.P&&CW.base.P[fs()];return P?(P.name||(P.S&&P.S.name)||"bạn"):"bạn"}
function worldNews(C){if(host())return"";const n=C.W&&C.W.S&&C.W.S.cnews;if(!n||!n.h)return"";
 return String(n.h).split(/(?<=\.\s|<\/span>\s?|<\/b>\s?)/).filter(x=>x.trim()&&!/gươi/.test(x)).join(" ")}
function onWeek(m){if(!CW.on||!m.state)return;const C=m.state;CW.base=J(C);CW.pend=false;
 const wasDead=S&&S.dead;const ok=fromCanon(C,{keepQ:true});if(!ok)return;
 const P=C.P[CW.seat];
 if(!wasDead&&S.dead){S.dead=false;try{die(P.S.coopWhy||"Bị hại trong cung")}catch(e){console.error(e)}return}
 if(S.coopCold){S.coopCold=0;if(!S.out)try{cold("Bị đày vào lãnh cung")}catch(e){console.error(e)}}
 const h=newsHTML()+(worldNews(C)?`<p>${worldNews(C)}</p>`:"");CW.mine=null;
 if(h)pushModal({t:"Tuần mới",h:`<p class="past">${when()}</p>${h}`});
 CW.bend=false;CW.posKey="";if(host())sendWhere();else if(CW.lastWhere)applyWhere(CW.lastWhere);keepFriendPos();refreshHere();
 showModal();render();lockNext()}
function onState(m){if(!CW.on||!m.state)return;const C=m.state;
 if(!CW.base){CW.base=J(C);if(CW.waitWorld){CW.waitWorld=false;newLife()}return}
 /* the friend's character changed (first character / reborn): keep my week, take the new base and her new entry */
 const had=CW.base;CW.base=J(C);if(had&&had.P&&had.P[CW.seat]&&C.P&&!C.P[CW.seat])CW.base.P[CW.seat]=had.P[CW.seat];
 if(S&&!S.dead&&!CW.inLife){const old=friendEntry();placeFriend(C.P[fs()]);
  const P=C.P[fs()];if(P&&(!old||old.name!==P.name)&&!P.dead)pushModal({t:"Bạn vào cung",h:`<p><b>${esc(P.name)}</b> nay ở trong cung${friendSrv(P)?", làm cung nữ":", phong "+esc(RANKS[P.rank]?RANKS[P.rank].n:"")}.</p>`});
  showModal();render()}}
function newLife(){CW.inLife=true;CW.newLife=true;try{start()}catch(e){console.error(e)}}
function begin(d){CW.on=true;CW.seat=d.you||COOP.state.you;const C=d.state||COOP.state.C;CW.base=C?J(C):null;CW.sent=-1;CW.pend=false;
 const s=COOP.state;
 if(C&&C.P&&C.P[CW.seat]&&!C.P[CW.seat].dead){fromCanon(C);if(s.ended&&s.ended[CW.seat])CW.sent=wk();try{$("title").hidden=true}catch(e){}syncRoom(CW.roomMsg);showModal();render();lockNext();return}
 if(!C&&!host()){CW.waitWorld=true;pushModal({t:"Đợi bạn",h:`<p>Bạn đang chọn thân phận. Khi hậu cung đã dựng xong, ngươi sẽ chọn thân phận của mình.</p>`});showModal();return}
 newLife()}
COOP.on("start",begin);
/* leaving the shared game: back to single-player rules (slots untouched; the room keeps the world) */
COOP.on("stop",()=>{CW.on=false;CW.base=null;CW.pend=false;CW.sent=-1;CW.inLife=false;CW.dying=null;try{const L=pullFriend();void L;lockNext()}catch(e){}});
COOP.on("week",onWeek);
COOP.on("state",onState);
/* room snapshot (connect / reconnect): buổi, last where, last pos of both */
function syncRoom(m){if(!m||!CW.on||!S)return;try{const o=COOP.other();if(m.where)CW.lastWhere=m.where;if(m.pos&&m.pos[o])onPos(Object.assign({from:o},m.pos[o]))}catch(e){}
 if(CW.p2&&!S.dead&&m.week===wk()&&CW.sent!==wk()&&typeof m.buoi==="number")while((S.buoi||0)<m.buoi&&!Q.length&&!S.mg){const b0=S.buoi||0;onBuoi({week:m.week,buoi:b0+1});if((S.buoi||0)===b0)break}
 if(host())sendWhere();else if(CW.lastWhere)applyWhere(CW.lastWhere);sendPos();lockNext()}
COOP.on("room",m=>{if(m.buoi!==undefined)CW.p2=true;CW.roomMsg=m;if(!CW.on||!m.state)return;const C=m.state;
 /* reconnect: the merge happened while we were away → rebuild; otherwise keep the local week */
 if(CW.sent>=0&&m.week>CW.sent){onWeek({state:C,week:m.week});return}
 if(!CW.base)CW.base=J(C);else{CW.base.P=J(C.P);CW.base.W=J(C.W)}syncRoom(m)});

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
 if(!CW.on)return f.apply(this,arguments);const r=withoutFriend(()=>f.apply(this,arguments));if(S){CW.pend=true;try{render()}catch(e){}lockNext()}return r}})();
(function(){const f=nextBuoi;nextBuoi=function(){if(!CW.on)return f.apply(this,arguments);if(waiting()||frozen()||CW.pend||!CW.base)return;
 /* same buổi for both: buổi sáng / chiều end with `bend`; the server's `buoi` runs the real step (CW.allow); buổi tối ends the week (`end`) */
 if(CW.p2&&!CW.allow&&(S.buoi||0)<2){if(!S||S.dead||Q.length||S.mg||needWhere())return;bend();return}
 const r=f.apply(this,arguments);if(!CW.pend){keepFriendPos();refreshHere()}return r}})();
/* #next was wired to the bare nextBuoi in j6 (before any wrapper): in co-op route the button through the wrapped one */
(function(){const n=$("next");if(!n)return;const o=n.onclick;n.onclick=function(e){if(CW.on)return nextBuoi();return o?o.call(this,e):undefined}})();
/* NPC whereabouts are the host's: the guest's own placement is replaced by the host's for this buổi; the host re-sends whenever it re-places */
(function(){const f=placeWhere;placeWhere=function(){const r=f.apply(this,arguments);if(CW.on)try{if(!host()&&CW.p2){if(!setWhere(CW.lastWhere))CW.whereKey=""}keepFriendPos();if(host()&&CW.p2&&!CW.pend)sendWhere()}catch(e){}return r}})();
(function(){const f=goTo;goTo=function(){const r=f.apply(this,arguments);if(CW.on)try{sendPos()}catch(e){}return r}})();
(function(){const f=save;save=function(){if(!CW.on)return f.apply(this,arguments);try{if(S&&!S.dead&&CW.base)localStorage.setItem("ctm-coop-last",JSON.stringify({room:COOP.state.room,at:Date.now()}))}catch(e){}}})();
(function(){const f=over;over=function(){if(CW.on&&S&&!S.dead){/* keep the world as it stands at her death; the new life is put into it */
  try{S.dead=true;CW.dying=toCanon();S.dead=false}catch(e){console.error(e)}}return f.apply(this,arguments)}})();
(function(){const f=render;render=function(){const r=f.apply(this,arguments);if(CW.on)try{lockNext();soonEnd();sendPos()}catch(e){}return r}})();
(function(){const f=closeModal;closeModal=function(){const r=f.apply(this,arguments);if(CW.on)soonEnd();return r}})();
COOP.on("status",()=>{if(CW.on){lockNext();soonEnd()}});
/* the rebirth / first-life flow: Luân hồi builds the life (nlRun), she accepts it (nlAccept) */
if(typeof nlRun==="function"){const f=nlRun;nlRun=function(){const r=f.apply(this,arguments);try{if(CW.on){const C=CW.dying||CW.base;if(C)attach(C);CW.inLife=true}}catch(e){console.error(e)}return r};}
if(typeof nlAccept==="function"){const f=nlAccept;nlAccept=function(){const r=f.apply(this,arguments);try{if(CW.on&&CW.inLife&&S&&!S.dead){CW.inLife=false;sendMe()}}catch(e){console.error(e)}return r};}
/* a start() that bypasses Luân hồi (window.__nlInner): attach + send at once */
(function(){const f=start;start=function(){const r=f.apply(this,arguments);try{if(CW.on&&window.__nlInner&&S&&!S.dead){const C=CW.dying||CW.base;if(C)attach(C);CW.inLife=false;sendMe()}}catch(e){console.error(e)}return r}})();
CW.toCanon=toCanon;CW.fromCanon=fromCanon;CW.friend=friendEntry;CW.sendEnd=sendEnd;
}catch(e){console.error(e)}})();
