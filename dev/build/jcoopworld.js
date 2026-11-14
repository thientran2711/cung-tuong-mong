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
function placeFriend(P){pullFriend();if(!P)return;
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
 const fP=C.P[fs()];const f=fP&&!friendSrv(fP)?buildFriend(fP,sS):null;if(f)R.push(f);
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
 render()}
function snapStats(){const o={};for(const k of ["sung","danh","bac","suc","sac","tai","tamco","duc","th","hh","rank"])o[k]=S[k];return o}
function waiting(){const s=COOP.state;return CW.on&&(CW.sent===wk()||!!(s.ended&&s.ended[CW.seat]))}
function frozen(){const s=COOP.state;return CW.on&&(s.status!=="open"||!s.peerOnline)}
/* touch #next only when its state really changes (j63 observes every "disabled" write) */
function lockNext(){const n=$("next");if(!n)return;const lock=CW.on&&(waiting()||frozen()||CW.pend||!CW.base);
 if(lock){if(!n.disabled)n.disabled=true;if(n.dataset.coopWait!=="1")n.dataset.coopWait="1"}else if(n.dataset.coopWait){delete n.dataset.coopWait;n.disabled=false}}
/* the week's end goes out once her dialogs are read: checked after each render / presence change (event-driven) */
let tryT=0;function tryEnd(){tryT=0;if(CW.on&&S&&CW.pend&&!Q.length&&!S.mg&&!S.dead&&!frozen())sendEnd()}
function soonEnd(){if(CW.on&&CW.pend&&!tryT)tryT=setTimeout(tryEnd,0)}

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
 if(C&&C.P&&C.P[CW.seat]&&!C.P[CW.seat].dead){fromCanon(C);if(s.ended&&s.ended[CW.seat])CW.sent=wk();try{$("title").hidden=true}catch(e){}showModal();render();lockNext();return}
 if(!C&&!host()){CW.waitWorld=true;pushModal({t:"Đợi bạn",h:`<p>Bạn đang chọn thân phận. Khi hậu cung đã dựng xong, ngươi sẽ chọn thân phận của mình.</p>`});showModal();return}
 newLife()}
COOP.on("start",begin);
COOP.on("week",onWeek);
COOP.on("state",onState);
COOP.on("room",m=>{if(!CW.on||!m.state)return;const C=m.state;
 /* reconnect: the merge happened while we were away → rebuild; otherwise keep the local week */
 if(CW.sent>=0&&m.week>CW.sent){onWeek({state:C,week:m.week});return}
 if(!CW.base)CW.base=J(C);else{CW.base.P=J(C.P);CW.base.W=J(C.W)}});

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
(function(){const f=nextBuoi;nextBuoi=function(){if(CW.on&&(waiting()||frozen()||CW.pend||!CW.base))return;return f.apply(this,arguments)}})();
(function(){const f=save;save=function(){if(!CW.on)return f.apply(this,arguments);try{if(S&&!S.dead&&CW.base)localStorage.setItem("ctm-coop-last",JSON.stringify({room:COOP.state.room,at:Date.now()}))}catch(e){}}})();
(function(){const f=over;over=function(){if(CW.on&&S&&!S.dead){/* keep the world as it stands at her death; the new life is put into it */
  try{S.dead=true;CW.dying=toCanon();S.dead=false}catch(e){console.error(e)}}return f.apply(this,arguments)}})();
(function(){const f=render;render=function(){const r=f.apply(this,arguments);if(CW.on)try{lockNext();soonEnd()}catch(e){}return r}})();
(function(){const f=closeModal;closeModal=function(){const r=f.apply(this,arguments);if(CW.on)soonEnd();return r}})();
COOP.on("status",()=>{if(CW.on){lockNext();soonEnd()}});
/* the rebirth / first-life flow: Luân hồi builds the life (nlRun), she accepts it (nlAccept) */
if(typeof nlRun==="function"){const f=nlRun;nlRun=function(){const r=f.apply(this,arguments);try{if(CW.on){const C=CW.dying||CW.base;if(C)attach(C);CW.inLife=true}}catch(e){console.error(e)}return r};}
if(typeof nlAccept==="function"){const f=nlAccept;nlAccept=function(){const r=f.apply(this,arguments);try{if(CW.on&&CW.inLife&&S&&!S.dead){CW.inLife=false;sendMe()}}catch(e){console.error(e)}return r};}
/* a start() that bypasses Luân hồi (window.__nlInner): attach + send at once */
(function(){const f=start;start=function(){const r=f.apply(this,arguments);try{if(CW.on&&window.__nlInner&&S&&!S.dead){const C=CW.dying||CW.base;if(C)attach(C);CW.inLife=false;sendMe()}}catch(e){console.error(e)}return r}})();
CW.toCanon=toCanon;CW.fromCanon=fromCanon;CW.friend=friendEntry;CW.sendEnd=sendEnd;
}catch(e){console.error(e)}})();
