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
const W_KEYS=["year","month","tuan","turn","emp","thDead","thAge","thO","thF","court","wx","vacSince","trieu","storms","festDone","usedFaces","fidUsed","kidUsed","luxEdict","tn"];  /* tn: B2 the Emperor's night (host) */
const REFF=["resHead","spyFor","lover","mid","owner","by","who","tgt","from","to"];   /* fields whose "me" value names the viewer */
const STAT=["sung","danh","bac","suc","sac","tai","tamco","duc","th","hh","mat","confined","shield","block"];
const LOOK=["face","fc","fk","fcKeep","fid","pid","age","sac","tai","tamco","duc","arts","pal","resHead","dress","ill","maid","lot","hieu","titleWorn","dh"];  /* hieu + titleWorn + dh: her hiệu and worn title show on the friend too (review/title-sys) */
const J=x=>x==null?x:JSON.parse(JSON.stringify(x));
const PETK2=["pets","petOn","petB","petBn"];
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
 for(const k of PETK2)if(s[k]!=null)v[k]=J(s[k]);  /* her pets: shown on her entry, acts on them go through `res` (pet ops), never the week write-back */
 /* B1 (review/coop-b1b5): her bag and her children on her entry, so the item / child acts are offered on her exactly as on an NPC.
    Display copies only: what an act does to them goes to her through `res` (item / kid ops), never through the week write-back. */
 v.inv=bagOf(s.inv);v.kids=kidsCopy(s.kids);if(s.preg&&!s.hidden){v.preg=s.preg;if(s.fake)v.fake=s.fake}v.fx7=J((s.j71&&s.j71.fx)||null);
 mapMe(v,false,mp);v.id=fp();
 v.__b=J(Object.assign({},...STAT.map(k=>({[k]:v[k]})),{rel:v.rel,oan:v.oan,rl:v.rl,ro:v.ro,em:v.evm.me,out:v.out,rank:v.rank}));
 return v}
function buildFriendSrv(P){const s=P.S;return {sid:fp(),coop:true,name:P.name||s.name,role:"maid",fc:s.fc,fk:s.fk,face:0,hue:0,age:s.age||18,tr:"trung",loyal:60,
 spyFor:s.srv&&s.srv.spyFor!=null?(s.srv.spyFor===me()?"me":s.srv.spyFor):null/* p2 B1: whom she spies for (me = bought by me) */,lover:null,af:{},kn:1,imp:"hảo hữu chơi cùng",org:"hảo hữu chơi cùng"}}
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
 if(sS.emp)P.S.empKnown=sS.emp.known||{};delete P.S.heir;/* p2 B2: the heir is the world key hr, resolved again on every rebuild */return P}
function toCanon(){try{CW.hrSync&&CW.hrSync()}catch(e){console.error(e)}const L=(CW.pulled||[]).concat(pullFriend());let d;try{S.cev=S.cev||{};const f=L.find(x=>x[0]>=0);if(f)S.cev[fp()]=f[1].ev||0;d=ser()}finally{pushFriend(L.filter(x=>!(CW.pulled||[]).includes(x)))}
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
 if(friendSrv(fP))placeFriend(fP);CW.life=Pm.life||0;try{CW.hrApply&&CW.hrApply()}catch(e){console.error(e)}return true}

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
 (C2.W.R||[]).forEach(r=>{for(const m of ["rl","ro","gp","ep"]){r[m]=r[m]||{};r[m][mp]=0/* npc-jealousy r2: no starting jealousy for anyone (was a guest-side R(15) the host never saw) */}if(r.evm)r.evm[mp]=0;if(r.resHead===mp)r.resHead=null});
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
function sendEnd(){if(!CW.on||!S||S.dead||CW.sent===wk()||CW.cyHold!=null/* the host's night waits for her cycle answer (B2 × jcycle) */)return;const C=toCanon();CW.sent=wk();CW.pend=false;CW.mine=snapStats();
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
Object.assign(CW,{bend:false,whereKey:"",lastWhere:null,fpos:null,posKey:"",p2:true,allow:false,acts:{},rpend:{}});
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
/* her pets, live (co-op pets, owner 15/11 20:05Z): compact list, so the friend's acts aim at the pets she really has now */
const PETF=["t","at","full","clean","joy","aff","stg","care","src","from"];
function petLive(){return {L:(S.pets||[]).map(P=>{const o={};for(const k of PETF)if(P[k]!=null)o[k]=typeof P[k]==="number"?Math.round(P[k]):P[k];return o}),on:S.petOn==null?-1:S.petOn,b:S.petB||null,bn:S.petBn||0}}
/* B1: her bag (every entry with its index `ci`, so an act's op names the very item) and her living children, live */
function bagOf(L){return (L||[]).map((e,i)=>e&&typeof e==="object"?Object.assign(J(e),{ci:i}):null).filter(Boolean)}
const KIDX=["mom","v","by"];
function kidsCopy(L){return (L||[]).filter(k=>k&&k.alive!==false).map(k=>{const o={};for(const x in k){const y=k[x];if(KIDX.includes(x))continue;if(y==null||typeof y!=="object")o[x]=y}o.alive=true;return o})}
function famLive(){return {bag:bagOf(S.inv),kids:kidsCopy(S.kids),preg:S.preg&&!S.hidden?S.preg:0,fake:S.preg&&!S.hidden&&S.fake?1:0,fx7:J((S.j71&&S.j71.fx)||null)/* p2 B4: her festival entries */}}
/* r1 fix 1: the LIVE Worker drops a whole pos over 4000 chars (coop/worker index.js:168). Her bag / kids / pregnancy / festival entries
   and pets ride their OWN act relay (k "ctm-fam", no cap but the 9e6 message limit), sent when they change; pos carries only their
   hash `fh` (place, khắc, stats stay small and always update). The friend asks again ("ask") when the hash she holds differs (a relay
   missed while she was away, a rejoin from the room's stored pos). Old clients still send / read an inline pos.fam / pos.pets. */
const FK="ctm-fam";
function hstr(s){let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return (h>>>0).toString(36)+"."+s.length}
function famPack(){const pl=petLive(),fm=famLive();return {pl,fm,h:hstr(JSON.stringify([pl,fm]))}}
function sendFam(P){if(!CW.on||!S||S.dead)return;P=P||famPack();CW.famSentH=P.h;COOP.send({t:"act",k:FK,mode:"fam",h:P.h,pets:P.pl,fam:P.fm,name:S.name,id:FK+":"+newId()})}
CW.famPack=famPack;
function sendPos(){if(!CW.on||!CW.p2||!S||S.dead)return;const st={};for(const x of LIVE)st[x]=S[x];
 const P=famPack();if(P.h!==CW.famSentH)sendFam(P);
 const k=[wk(),S.buoi||0,S.place||"home",used,LIVE.map(x=>S[x]).join("/"),!!S.out,S.name,P.h].join(":");if(k===CW.posKey)return;CW.posKey=k;
 COOP.send({t:"pos",place:S.place||"home",khac:used,week:wk(),buoi:S.buoi||0,st,fh:P.h,out:!!S.out,alive:!S.dead,name:S.name,life:CW.life||0})}
/* her own numbers, live: shown on her entry; the week write-back baseline moves with them so the merge never counts them as mine */
function liveStats(m){const f=friendEntry();if(!f||!m.st||(m.name&&m.name!==f.name))return false;let ch=false;
 for(const x of LIVE){const v=m.st[x];if(typeof v!=="number")continue;if(x==="rank"&&f.queen)continue;if(f[x]!==v){f[x]=v;ch=true}if(f.__b&&x in f.__b)f.__b[x]=v}
 if(f.__b)f.__b.rank=f.rank;
 if(famIn(f,m.fam,m.pets))ch=true;
 return ch}
/* her bag / kids / pregnancy / festival entries / pets onto her entry (inline pos of an old client, or the ctm-fam relay) */
function famIn(f,fm,pets){let ch=false;
 if(fm&&Array.isArray(fm.bag)){if(JSON.stringify(fm.bag)!==JSON.stringify(f.inv||[])){f.inv=fm.bag.map(o=>Object.assign({},o));ch=true}
  if(JSON.stringify(fm.kids||[])!==JSON.stringify(f.kids||[])){f.kids=(fm.kids||[]).map(o=>Object.assign({},o));ch=true}
  if((fm.preg||0)!==(f.preg||0)){f.preg=fm.preg||0;f.fake=fm.fake||0;ch=true}f.fx7=fm.fx7||null}
 if(pets&&Array.isArray(pets.L)){const L=pets.L.map(o=>Object.assign({},o));if(JSON.stringify(L)!==JSON.stringify(f.pets||[])){f.pets=L;f.petOn=pets.on;f.petB=pets.b;f.petBn=pets.bn;ch=true}}
 return ch}
function famTake(){const m=CW.famLast,f=friendEntry();if(!m||!f||(m.name&&m.name!==f.name))return false;CW.famGotH=m.h;/* compared with her entry each time: a rebuilt entry (merged week) gets the live bag back */return famIn(f,m.fam,m.pets)}
function famAsk(h){const t=Date.now();if(CW.famAsk&&CW.famAsk.h===h&&t-CW.famAsk.t<4000)return;CW.famAsk={h,t};COOP.send({t:"act",k:FK,mode:"ask",h,id:FK+":"+newId()})}
COOP.on("act",m=>{if(!m||m.k!==FK||!CW.on||m.from===CW.seat||!S)return;
 if(m.mode==="ask"){if(!S.dead)sendFam();return}
 if(m.mode!=="fam"||typeof m.h!=="string")return;CW.famLast=m;if(famTake()){refreshHere();if(!Q.length)render()}});
function onPos(m){if(!CW.on||m.from===CW.seat||!S)return;CW.fpos=m;const pl=mapPlace(m.place);const f=friendEntry();if(!f)return;
 let sc=liveStats(m);if(typeof m.fh==="string"){if(famTake())sc=true;if(CW.famGotH!==m.fh)famAsk(m.fh)}S.where=S.where||{};const was=S.where[f.id];S.where[f.id]=pl||palaceOf(f);if(was!==S.where[f.id]||sc){refreshHere();if(!Q.length)render()}}
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
const PUB=["petcare","accuse","vp","xx","gift","ally","steal","road","takeaway","tocao","trinhth","trinhhh","xinhh","uyhiep","judge"];
const DK=["sung","danh","bac","suc","sac","tai","tamco","duc","th","hh","mat"];
const newId=()=>Date.now().toString(36)+Math.random().toString(36).slice(2,6);
function fsnap(v){const o={};for(const k of DK.concat(["confined","rel","oan"]))o[k]=v[k]||0;o.alive=v.alive;o.out=!!v.out;o.em=(v.evm&&v.evm.me)||0;return o}
function sendRes(v,k,b0,txt,id,pet,items,fam){const b1=fsnap(v);const fx={};for(const x of DK)if(b1[x]!==b0[x])fx[x]=b1[x]-b0[x];
 const flags={rel:b1.rel-b0.rel,oan:b1.oan-b0.oan,em:b1.em-b0.em,conf:b1.confined-b0.confined,dead:b0.alive&&!b1.alive,cold:!b0.out&&b1.out};
 const t=String(txt||"").replace(/<[^>]+>/g,"");const caught=/bị lộ|bị bắt|phát giác|khai ra|tố giác/.test(t);
 const any=Object.keys(fx).length||flags.rel||flags.oan||flags.em||flags.conf||flags.dead||flags.cold||(pet&&pet.length)||(items&&items.length)||(fam&&fam.length);if(!any&&!PUB.includes(k))return;
 /* she notices what an NPC's act would show her: open acts and caught schemes name me, a hidden harm only shows its effect */
 const seen=PUB.includes(k)||caught?"named":any?"effect":"";
 if(v.__b){for(const x of STAT)v.__b[x]=v[x];v.__b.rel=v.rel;v.__b.oan=v.oan;v.__b.em=(v.evm&&v.evm.me)||0;v.__b.out=v.out;v.__b.rank=v.rank}
 if(flags.dead)v.alive=true;if(flags.cold)v.out=false;   /* her death / lãnh cung happen on her side; her entry follows from her `me` / week */
 const rid=id||newId();CW.rpend[rid]=Date.now();  /* her week's end waits for her ack, so a res that lands after she ended is re-sent in her end */
 COOP.send(Object.assign({t:"res",id:rid,k,n:(ACT[k]||{}).n||k,who:S.name,fx,flags,seen,txt:t.slice(0,400)},pet&&pet.length?{pet}:{},items&&items.length?{items}:{},fam&&fam.length?{fam}:{}))}
/* ---------- co-op pets (owner 15/11 20:05Z): help / harm / steal the friend's pet (petcare / thaopet / petsteal, jpet + jpetcare) ----------
   The act runs on her entry (which carries her live pets, petLive/pos); what happened to each of her pets goes out as `res.pet` ops
   ({op:"d",t,at,d:{full,clean,joy,aff}} | {op:"lose",t,at}); her client applies them to her OWN pets (petLose there gives her the
   follow-bonus / Thái hậu side effects, so those are taken out of fx here). The stolen pet is already mine (petAdd on my S). */
const PETACT=["petcare","thaopet","petsteal"];
function petFind(L,o){let i=L.findIndex(P=>P.t===o.t&&(P.at||0)===(o.at||0));if(i<0)i=L.findIndex(P=>P.t===o.t);return i}
function petLoseHook(){if(typeof petLose!=="function"||petLose.__cw)return;const f0=petLose;
 petLose=function(p){if(!CW.petV||p!==CW.petV)return f0.apply(this,arguments);const b=fsnap(p);const r=f0.apply(this,arguments);const a=fsnap(p);
  for(const x of DK)if(a[x]!==b[x])CW.petAdj[x]=(CW.petAdj[x]||0)+(a[x]-b[x]);return r};petLose.__cw=1}
function petDiff(v,L0){const L1=tsbPets(v);const ops=[];
 for(const [P,c] of L0){const o={t:P.t,at:P.at||0};if(!L1.includes(P)){ops.push(Object.assign(o,{op:"lose"}));continue}
  const d={};for(const x of ["full","clean","joy","aff"]){const n=Math.round((P[x]||0)-(c[x]||0));if(n)d[x]=n}if(Object.keys(d).length)ops.push(Object.assign(o,{op:"d",d}))}
 return ops}
const PETFLY=/hoami|sao|vet|uyenuong|camke|phuong|thanhlong|bachloc|kylan|cuuvi|hac|thienma/;
/* her side: apply the ops to her own pets; returns the lines for her note */
function petApply(ops,k){const out=[];if(!Array.isArray(ops))return out;
 for(const o of ops){const L=tsbPets(S);const i=petFind(L,o);if(i<0)continue;const P=L[i];const T=petT(P);const nm=T.n.replace(/^./,c=>c.toLowerCase());
  if(o.op==="lose"){const fly=PETFLY.test(P.t);petLose(S,i,k==="petsteal"?"bị trộm mất":fly?"bị thả đi (chưa rõ ai làm)":"bị hại (chưa rõ ai làm)");
   out.push(k==="petsteal"?`<span class="r">Không thấy ${nm} đâu nữa; cửa lồng mở, có dấu người lạ.</span>`:`<span class="r">${T.n} của ngươi ${fly?"sổ lồng bay mất, tìm không thấy":"bỗng lăn ra bỏ ăn rồi chết, không rõ vì sao"}.</span>`);continue}
  if(o.op==="d"&&o.d){try{if(typeof petcInit==="function")petcInit(P)}catch(e){}const d=o.d,L2=[];
   for(const x of ["full","clean","joy","aff"])if(typeof d[x]==="number"){P[x]=cl((P[x]||0)+d[x],0,100)}
   if(d.full)L2.push(`No ${d.full>0?"+":""}${d.full}`);if(d.clean)L2.push(`Sạch ${d.clean>0?"+":""}${d.clean}`);if(d.joy)L2.push(`Vui ${d.joy>0?"+":""}${d.joy}`);if(d.aff)L2.push(`Tình cảm ${d.aff>0?"+":""}${d.aff}`);
   try{if(typeof petcSync==="function")petcSync(P)}catch(e){}if((d.full||0)+(d.clean||0)+(d.joy||0)>0)P.bad=0;
   out.push(`${T.n} của ngươi được chăm (${L2.join(", ")}).`)}}
 return out}
(function(){const f=runAct;runAct=function(a,t,k,extra){if(!CW.on||a!==S||!isF(t))return f.apply(this,arguments);
 if(ASK.includes(k)&&!CW.inv){if(sameHouse(a,t))return f.apply(this,arguments);const id=newId();CW.acts[id]={k,extra,v:t.id};
  COOP.send({t:"act",id,k,mode:"invite",n:(ACT[k]||{}).n||k,who:S.name,item:extra!=null&&S.inv&&S.inv[extra]?iname(S.inv[extra]):""});return `Ngươi ngỏ ý ${((ACT[k]||{}).n||k).toLowerCase()} với ${t.name}, đợi nàng trả lời. `}
 const pa=PETACT.includes(k);let L0=null;if(pa){petLoseHook();L0=tsbPets(t).map(P=>[P,Object.assign({},P)]);CW.petV=t;CW.petAdj={}}
 const inv0=(t.inv||[]).slice();const K0=famSnap(t);const b0=fsnap(t);let r;try{r=f.apply(this,arguments)}finally{CW.petV=null}
 /* things that landed in her entry's bag (Tặng quà, a handmade work, a gift with something in it) go to HER: she gets the normal
    "Quà tặng" dialog (keep / have it checked), exactly as from an NPC (review/coop-pets: before, the item left me and never reached her).
    B1: a hidden thing slipped into her chest (Cài đồ vào rương, Giá họa: e.h) lands there silently, as from an NPC. */
 const add=(t.inv||[]).filter(e=>!inv0.includes(e));const back=k==="plant"?add.filter(e=>!e.h):[];/* a stolen thing slipped back to its owner (jlost "Lén trả lại" through Cài đồ) is not a gift */
 const items=add.filter(e=>!e.h&&!back.includes(e)).map(e=>J(e));
 try{let pet=null;if(pa){pet=petDiff(t,L0);for(const x in CW.petAdj)b0[x]=(b0[x]||0)+CW.petAdj[x]}
  const fam=famDiff(t,k,inv0,K0,add.filter(e=>e.h));for(const e of back)fam.push({op:"ret",k:e.k});sendRes(t,k,b0,r,CW.inv,pet,items,fam)}catch(e){console.error(e)}return r}})();
/* ---------- B1 (review/coop-b1b5): steal / burn / extort her ITEMS, harm / take her CHILDREN, miscarriage ----------
   The act runs on her entry (bag + children from buildFriend / pos). The loss reaches her as `res.fam` ops, applied to her OWN S:
     {op:"rm", ci, k, how}  an item left her chest (how: "lost" = thất lạc case, as an NPC thief; "burn"; "taken" = named; "gone")
     {op:"plant", e}        a hidden thing was slipped into her chest (silent; it works on her like an NPC's plant)
     {op:"kd", n, d:{hp,tal,fond}, heir0}  a child hurt / slandered (heir0: lost the Đông cung)
     {op:"kdie", n, why}    a child died (kidDie on her side: her grief Sức, the heir seat empties)
     {op:"ktake", n}        a child was taken to be raised by me (takeaway; the child is already in my S.kids)
     {op:"preg0"}           she lost the pregnancy (musk; the Sức loss is in fx)
   My gain stays on my side as the act already gives it (the item in my chest, the child in my house). */
const kidId=k=>String(k.name||"")+"#"+(k.bt==null?"":k.bt);
function famSnap(t){return {kids:(t.kids||[]).map(k=>[k,Object.assign({},k)]),preg:t.preg||0}}
const RMHOW={laydo:"lost",laydol:"lost",phonghoa:"burn",batnat:"taken",uyhiep:"taken",tieuhuy:"taken"};
function famDiff(t,k,inv0,K0,plants){const ops=[];const L1=t.inv||[];
 for(const e of inv0)if(!L1.includes(e)&&e.ci!=null)ops.push({op:"rm",ci:e.ci,k:e.k,how:RMHOW[k]||"gone"});
 for(const e of plants){const x=J(e);if(x.by==="me")x.by=me();ops.push({op:"plant",e:x})}
 for(const [kd,c] of K0.kids){const n=kidId(c);if(!(t.kids||[]).includes(kd)){ops.push({op:"ktake",n});continue}
  if(c.alive!==false&&kd.alive===false){ops.push({op:"kdie",n,why:k==="pond"?"chết đuối ở hồ sen":k==="kpoison"?"trúng độc mà chết":"mất sớm"});continue}
  const d={};for(const x of ["hp","tal","fond"])if(typeof kd[x]==="number"&&kd[x]!==c[x])d[x]=kd[x]-(c[x]||0);const h0=!!c.heir&&!kd.heir;
  if(Object.keys(d).length||h0)ops.push(Object.assign({op:"kd",n,d},h0?{heir0:1}:{}))}
 if(K0.preg&&!t.preg)ops.push({op:"preg0"});
 return ops}
/* her side: returns the lines for her note; `quiet` lines are told by their own dialog (Đồ thất lạc) */
function famApply(ops){const out=[];let loud=0;if(!Array.isArray(ops))return {out,loud};const f=friendEntry();S.inv=S.inv||[];
 const itemAt=o=>{let e=S.inv[o.ci];if(!e||e.k!==o.k)e=S.inv.find(x=>x&&x.k===o.k&&!x.h);return e||null};
 const kidBy=n=>(S.kids||[]).find(k=>k&&k.alive!==false&&kidId(k)===n)||null;
 const rm=ops.filter(o=>o.op==="rm").map(o=>[o,itemAt(o)]).filter(x=>x[1]);
 for(const [o,e] of rm){const nm=typeof iname==="function"?iname(e):e.k;
  if(o.how==="lost"&&typeof loLose==="function"){/* the NPC thief's road: a "thất lạc" case in her Tư trang › Việc, the item held by the friend */
   const th=o.by!=null?RV(o.by):null;const all=S.inv;S.inv=[e];let c=null;try{c=loLose(S,{cause:"riv",by:th?key(th):f?key(f):fp(),keep:1})}finally{S.inv=all.filter(x=>x!==e)}if(c)continue}
  S.inv.splice(S.inv.indexOf(e),1);loud=1;
  if(o.how==="burn"){try{if(typeof tsbLedger==="function")tsbLedger({what:nm,how:"cháy",cause:"có kẻ phóng hỏa (chưa rõ là ai)"})}catch(x){}out.push(`<span class="r">Kho đồ của ngươi bốc cháy: mất ${esc(nm)}.</span>`)}
  else if(o.how==="taken"){try{if(typeof tsbLedger==="function")tsbLedger({what:nm,how:"bị lấy",who:fp(),by:friendName()})}catch(x){}out.push(`<span class="r">Ngươi phải nộp ${esc(nm)} cho ${esc(friendName())}.</span>`)}
  else out.push(`<span class="r">${esc(nm)} trong rương ngươi không còn nữa.</span>`)}
 for(const o of ops)if(o.op==="plant"&&o.e&&o.e.k){const x=Object.assign({},o.e);delete x.ci;S.inv.push(x)}
 /* p2 B4: a thing given to her in the host's world (a contest prize, a bestowal): into her chest, told */
 for(const o of ops)if(o.op==="add"&&o.e&&o.e.k&&typeof IT==="object"&&IT[o.e.k]){const x=Object.assign({},o.e);delete x.ci;S.inv.push(x);loud=1;out.push(`<span class="g">Được ban ${esc(typeof iname==="function"?iname(x):x.k)}${o.why?` (${esc(o.why)})`:""}.</span>`)}
 for(const o of ops)if(o.op==="ret"){/* her thất lạc case closes: the thing is back in her chest, quietly (as when an NPC returns it) */
  const c=(S.lost||[]).find(c=>c.k===o.k&&c.st!=="done"&&(c.by===fp()||c.at===fp()));const e=c&&c.e?Object.assign({},c.e):{k:o.k};delete e.lo;delete e.by;delete e.gh;
  S.inv.push(e);if(c){c.st="done";c.end=wk();c.how="nha"}out.push(`${esc(typeof iname==="function"?iname(e):e.k)} thất lạc hôm trước nay lại thấy nằm trong rương.`);loud=1}
 for(const o of ops){if(o.op==="preg0"){if(S.preg){S.preg=0;S.hidden=false;loud=1;out.push(`<span class="r">Ngươi sảy thai.</span> Thái y nói trong thuốc có xạ hương.`)}continue}
  const kd=o.n&&kidBy(o.n);if(!kd)continue;loud=1;
  if(o.op==="kdie"){try{out.push(kidDie(kd,o.why||"mất sớm",true))}catch(x){kd.alive=false}continue}
  if(o.op==="ktake"){S.kids.splice(S.kids.indexOf(kd),1);const to=o.to!=null?RV(o.to):null;/* p2 B4: an NPC took the child (the host's world already holds it in her house) */
   if(!to&&f){f.kids=f.kids||[];f.kids.push(kd)}const tn=to?to.name:friendName();
   if(S.heir&&S.heir.k===kd)S.heir.v=to||f||null;out.push(`<span class="r">${esc(kd.name)} bị bế sang cung ${esc(tn)} nuôi, vì phẩm vị ngươi còn thấp.</span>`);continue}
  if(o.op==="kd"){const d=o.d||{},L=[];for(const x of ["hp","tal","fond"])if(typeof d[x]==="number"){kd[x]=x==="hp"?Math.max(1,(kd[x]||0)+d[x]):cl((kd[x]||0)+d[x],0,100)}
   if(d.hp)L.push(`Sức khỏe ${d.hp>0?"+":""}${d.hp}`);if(d.tal)L.push(`Tài ${d.tal>0?"+":""}${d.tal}`);if(d.fond)L.push(`Hoàng thượng thương nó ${d.fond>0?"+":""}${d.fond}`);
   if(o.heir0&&kd.heir){kd.heir=false;if(S.heir&&S.heir.k===kd)S.heir=null;L.push("bị phế ngôi Thái tử")}
   out.push(`<span class="r">${esc(kd.name)} gặp chuyện</span>${L.length?` (${L.join(", ")})`:""}.`)}}
 return {out,loud}}

const seenIds=new Set();
function onAct(m){if(!CW.on||m.from===CW.seat||!S||S.dead||seenIds.has(m.id))return;seenIds.add(m.id);if(m.mode!=="invite")return;
 const what=m.k==="gift"?`muốn tặng ngươi ${esc(m.item||"một món quà")}`:`muốn kết giao với ngươi`;
 pushModal({act:1,t:"Hảo hữu tìm đến",h:`<p><b>${esc(m.who)}</b> ${what}.</p>`,opts:[
  {n:"Nhận",fx:{},x:"hảo hữu tiếp tục việc ấy",go:()=>COOP.send({t:"actr",id:m.id,ok:true,k:m.k})},
  {n:"Từ chối",fx:{},x:"không nhận",go:()=>COOP.send({t:"actr",id:m.id,ok:false,k:m.k})}]});showModal();render()}
function onRes(m){if(!CW.on||m.from===CW.seat||!S||seenIds.has("r"+m.id))return;seenIds.add("r"+m.id);
 try{resApply(m)}catch(e){console.error(e)}
 /* I had already ended the week (she acted on me while I waited): my end goes out again with this in it, before the ack she waits for */
 try{if(S&&!S.dead&&CW.sent===wk()){CW.sent=-1;sendEnd()}}catch(e){console.error(e)}
 COOP.send({t:"actr",id:m.id,ok:true,ack:1})}
function resApply(m){if(S.dead)return;
 const fx={};for(const k in m.fx||{})if(DK.includes(k)&&typeof m.fx[k]==="number")fx[k]=m.fx[k];const g=m.flags||{},fpid=fp();
 if(Object.keys(fx).length)apply(fx);S.rl=S.rl||{};S.ro=S.ro||{};S.cev=S.cev||{};
 if(g.rel)S.rl[fpid]=cl((S.rl[fpid]||0)+g.rel,-100,100);if(g.oan)S.ro[fpid]=cl((S.ro[fpid]||0)+g.oan,0,100);
 if(g.em)S.cev[fpid]=Math.max(0,(S.cev[fpid]||0)+g.em);if(g.conf)S.confined=Math.max(0,(S.confined||0)+g.conf);
 const f=friendEntry();if(f&&g.rel){f.rel=cl((f.rel||0)+g.rel,-100,100);if(f.__b)f.__b.rel=f.rel}
 const pl=petApply(m.pet,m.k);const fa=famApply(m.fam);pl.push(...fa.out);
 /* a hidden theft that only left a "thất lạc" case: her Đồ thất lạc dialog is all she learns (as from an NPC thief) */
 if(m.seen==="effect"&&Array.isArray(m.fam)&&m.fam.length&&!fa.loud&&!Object.keys(fx).length&&!(m.pet||[]).length&&!g.dead&&!g.cold){showModal();render();return}
 let gotItem=false;if(Array.isArray(m.items))for(const e of m.items){if(!e||!e.k||typeof IT!=="object"||!IT[e.k])continue;const ent=J(e);ent.from=fpid;if(ent.by==="me")ent.by=fpid;try{pushDil(mkP("giftin",{f:fpid,e:ent}),"Quà tặng");gotItem=true}catch(x){console.error(x)}}
 const who=m.hd?esc(m.hd)/* p2 B4: the host's world (an NPC, a contest) */:m.seen==="named"?`<b>${esc(m.who)}</b>: ${esc(m.n)}.`:"Có kẻ ngấm ngầm ra tay với ngươi.";
 const note=m.seen?`<p>${who}</p>${m.seen==="named"&&m.txt?`<p class="past">${esc(m.txt)}</p>`:""}${pl.map(x=>`<p>${x}</p>`).join("")}${Object.keys(fx).length?`<p>${fmt(fx)}</p>`:""}`:"";
 if(g.dead){if(note)pushModal({t:"Biến cố",h:note});try{die(m.seen==="named"?`Bị ${m.who} hại`:"Bị kẻ gian hãm hại")}catch(e){console.error(e)}return}
 if(g.cold){try{cold(m.seen==="named"?`Bị ${m.who} hại, đày vào lãnh cung`:"Bị vu hại, đày vào lãnh cung")}catch(e){console.error(e)}}
 if(note&&gotItem&&m.k==="gift"&&!g.dead&&!g.cold){showModal();render();return}  /* the Quà tặng dialog is her note */
 if(note){pushModal({t:m.tt?String(m.tt):m.k==="petcare"?"Hảo hữu sang giúp":m.seen==="named"?"Hảo hữu ra tay":"Biến cố",h:note});showModal()}render()}
function onActr(m){if(!CW.on||m.from===CW.seat)return;if(m.ack){delete CW.rpend[m.id];soonEnd();return}const a=CW.acts[m.id];delete CW.acts[m.id];if(!a)return;const v=RV(a.v);
 if(!m.ok||!v||!v.alive){pushModal({t:"Hảo hữu từ chối",h:`<p><b>${esc(friendName())}</b> không nhận.</p>`});showModal();render();return}
 CW.inv=m.id;let r="";try{r=runAct(S,v,a.k,a.extra)}finally{CW.inv=false}if(r)log(r);
 pushModal({t:"Hảo hữu nhận lời",h:`<p>${r||"Hảo hữu đã nhận."}</p>`});showModal();render()}
COOP.on("act",onAct);COOP.on("res",onRes);COOP.on("actr",onActr);
/* the week's end goes out once her dialogs are read: checked after each render / presence change (event-driven) */
/* my acts on her not yet acknowledged (10 s at most: she may have dropped; the freeze covers that) */
function resWait(){const n=Date.now();for(const id in CW.rpend)if(n-CW.rpend[id]>10000)delete CW.rpend[id];return Object.keys(CW.rpend).length>0}
let tryT=0;function tryEnd(){tryT=0;if(CW.on&&CW.pend&&resWait()){tryT=setTimeout(tryEnd,400);return}if(CW.on&&CW.pendBuoi&&S&&!Q.length&&!S.mg){onBuoi(CW.pendBuoi);return}nCheck();if(CW.on&&S&&CW.pend&&!Q.length&&!S.mg&&!S.dead&&!frozen())sendEnd()}
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
 const C=m.state;CW.base=J(C);CW.pend=false;CW.rpend={};if(typeof m.week==="number")CW.wkIn=m.week;
 const wasDead=S&&S.dead;const ok=fromCanon(C,{keepQ:true});if(!ok)return;
 const P=C.P[CW.seat];
 if(!wasDead&&S.dead){S.dead=false;try{die(P.S.coopWhy||"Bị hại trong cung")}catch(e){console.error(e)}return}
 if(S.coopCold){S.coopCold=0;if(!S.out)try{cold("Bị đày vào lãnh cung")}catch(e){console.error(e)}}
 /* jkc: the friend passed the tuyển tú this week and entered the palace */
 const fP=C.P[fs()];if(fP&&!fP.dead){const home=friendHome(fP);if(CW.fWasHome&&!home&&fP.S&&fP.S.kc&&fP.S.kc.inPal)pushModal({t:"Hảo hữu nhập cung",h:`<p>Hảo hữu ngươi qua kỳ tuyển tú, nay vào cung, phong ${esc(RANKS[fP.rank]?RANKS[fP.rank].n:"")}. Mặt mũi, tên tuổi ra sao, phải gặp mới biết.</p><p class="past">Muốn gặp nhau: hai người cùng đến một nơi trên Dư đồ trong cùng một buổi, rồi chạm vào người kia và chọn Chào hỏi.</p>`});CW.fWasHome=home}
 try{if(CW.empWeek()){showModal();render();lockNext();return}}catch(e){console.error(e)}
 try{if(host())CW.tnLast=JSON.stringify([wk(),tnWho()]);else CW.tnWeek()}catch(e){console.error(e)}
 try{CW.seatWeek()}catch(e){console.error(e)}
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
function begin(d){T("begin");CW.on=true;CW.cyHold=null;CW.cyK="";CW.seat=d.you||COOP.state.you;CW.ssv=COOP.state.msv||0;CW.ssvWk=wk();CW.seatOld=false;const C=d.state||COOP.state.C;CW.base=C?J(C):null;CW.sent=-1;CW.pend=false;CW.wkIn=C&&typeof C.week==="number"?C.week:undefined;
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

/* ---------- B2 (review/coop-b1b5): ONE night for the whole harem, host-authoritative ----------
   Before: S.tonight was personal and each client flipped its own tablet in endTurn: the Emperor could spend the same night with both
   players, or with an NPC on one screen and her on the other.
   Now: the HOST's flip runs with the friend's entry in the deck (both players + NPCs) and writes the world key S.tn = {w, who}
   (who = 901 / 902 = a player, an NPC id, or null). The guest's flip does not draw (only its personal side, pregFind, runs) and her
   night is set from tn when the merged week arrives (her Kính sự phòng card when it is her). In the week, any change of the night
   (Tranh sủng, Chặn ngự giá, Thắp đèn, cáo bệnh…) is relayed at once over the act channel (k "ctm-tn"), so both always agree.
   A night is resolved once: an NPC's night on the host only; a player's night by that player's own client. */
const TK="ctm-tn";
const tnWho=()=>{const t=S&&S.tonight;if(!t)return null;if(t==="me")return me();return t.id!=null?t.id:null};
function tnSet(who){if(!S)return;if(who==null){S.tonight=null}else if(who===me()){S.tonight="me"}else{const v=who===fp()?friendEntry():RV(who);S.tonight=v&&v.alive&&!v.out?v:null}
 try{if(S.tonight&&typeof ntTake==="function")ntTake(S.tonight==="me"?S:S.tonight)}catch(e){}CW.tnLast=JSON.stringify([wk(),tnWho()])}
/* r1 fix 4: host-authoritative in-week night. The host's change goes out as the final word (mode "tn", also written to the world key S.tn);
   the guest's own change is only a CLAIM (mode "claim", with the version of the host's word she last saw): the host takes it when it has not changed the
   night since the guest last heard its word, else (both changed it in the same buổi: the relays crossed) it keeps its own; either way it broadcasts the final {w, who} and the
   guest applies only that. who on the wire is relative to the sender: "p" = the sender, "f" = the receiver, else an NPC id. */
const tnEnc=w=>w==null?null:w===me()?"p":w===fp()?"f":w;
const tnDec=w=>w==null?null:w==="p"?fp():w==="f"?me():w;
/* the host's word has a version per week (tnV); a claim names the last version the guest had seen: an older one = the host changed the
   night meanwhile (crossing), the host's word stands */
const tnVer=()=>CW.tnV&&CW.tnV.w===wk()?CW.tnV.n:0;
function tnFinal(re){S.tn={w:wk(),who:tnWho()};CW.tnLast=JSON.stringify([wk(),tnWho()]);CW.tnV={w:wk(),n:tnVer()+1};COOP.send({t:"act",k:TK,mode:"tn",fin:1,v:CW.tnV.n,re:re||null,week:wk(),who:tnEnc(tnWho()),id:TK+wk()+":"+newId()})}
function tnRelay(){if(!CW.on||!S||S.dead||CW.inTurn||!CW.base||CW.pend||CW.sent===wk())return;/* the week's own draw (endTurn) goes with the merge, never as a relay */const k=JSON.stringify([wk(),tnWho()]);if(CW.tnLast===undefined){CW.tnLast=k;return}if(k===CW.tnLast)return;
 if(host()){tnFinal();return}
 CW.tnLast=k;const id=TK+wk()+":"+newId();CW.tnClaim=id;COOP.send({t:"act",k:TK,mode:"claim",week:wk(),who:tnEnc(tnWho()),v:CW.tnSeen&&CW.tnSeen.w===wk()?CW.tnSeen.n:0,id})}
/* her night changed by the other side's word: the notice she would get from any other cause */
function tnTake(who){const had=S.tonight==="me";tnSet(who);
 if(had&&S.tonight!=="me"){const v=S.tonight&&S.tonight!=="me"?S.tonight:null;pushModal({t:"Kính sự phòng",h:`<p>Thẻ bài của ngươi đã được lật, nhưng đêm nay Hoàng thượng ${v?`ngự ở cung ${esc(v===friendEntry()?friendName():v.name)}`:"không vời ai"}.</p>`});showModal()}
 else if(!had&&S.tonight==="me"){try{pushDil(mkP("ksp"),"Kính sự phòng báo tin")}catch(e){}showModal()}}
COOP.on("act",m=>{if(!m||m.k!==TK||!CW.on||m.from===CW.seat||!S||S.dead||m.week!==wk())return;
 if(host()){/* the guest's claim (an old guest's plain "tn" counts as a claim on the night it replaced) */
  if(m.mode!=="claim"&&m.mode!=="tn")return;const cur=tnWho(),fresh=typeof m.v!=="number"||m.v===tnVer();
  if(fresh&&tnDec(m.who)!==cur)tnTake(tnDec(m.who));tnFinal(m.id);render();return}
 if(m.mode!=="tn")return;if(CW.tnClaim&&m.re===CW.tnClaim)CW.tnClaim=null;if(typeof m.v==="number")CW.tnSeen={w:wk(),n:m.v};
 const who=tnDec(m.who);if(who!==tnWho())tnTake(who);else CW.tnLast=JSON.stringify([wk(),tnWho()]);
 render()});
(function(){if(typeof flip!=="function")return;const f=flip;flip=function(){if(!CW.on)return f.apply(this,arguments);
 if(!host()){/* the guest draws nothing: her night comes from the host's tn with the merged week */const r0=S.tonight;
  if(CW.inTurn){S.tonight=null;try{if(typeof pregFind==="function")pregFind()}catch(e){}return}return r0}
 /* host: the friend's entry is in the deck (endTurn took her out) */const L=CW.pulled;
 /* review/coop-b1b5-fix: her Kỳ nguyệt sự tuần and her maid's card (jcycle cyrep) not answered yet: the draw waits for her answer
    (ctm-p2 "cyb", cyFree below runs this flip again), so her "báo sớm / giấu" really keeps her card on the tray */
 {const fe=(L&&(L.find(x=>x[0]>=0)||[])[1])||friendEntry();if(cyWait(fe)){CW.cyHold=window.cyWk();S.tonight=null;T("cyHold "+CW.cyHold);return}}
 if(L&&L.length)pushFriend(L.slice());let r;
 try{r=f.apply(this,arguments)}finally{if(L&&L.length)pullFriend()}
 /* reviewer r2: the week's flip can run AFTER endTurn (main's jcycle defers it behind her maid's Kỳ nguyệt sự card, cyrep → flip again):
    CW.pend = this week's end is still waiting to go out, so that night is next week's too (else tn.w = the old week and the guest never takes it) */
 const nx=CW.inTurn||CW.pend?1:0;S.tn={w:wk()+nx,who:tnWho()};CW.tnLast=JSON.stringify([wk()+nx,tnWho()]);return r}})();
CW.tnShared=true;/* jcycle cyNoFriend: the host's flip deck holds the friend (B2), the guest's flip draws nothing: no need to take her out */
(function(){if(typeof resolveTonight!=="function")return;const f=resolveTonight;resolveTonight=function(){if(!CW.on)return f.apply(this,arguments);const t=S.tonight;
 /* her friend's night is played on her friend's client; an NPC's night only on the host (its gains are world numbers) */
 if(t&&t!=="me"&&(isF(t)||!host())){S.tonight=null;return""}return f.apply(this,arguments)}})();
/* the guest takes the host's night when the merged week is in (onWeek → CW.tnWeek) */
CW.tnWeek=function(){if(!CW.on||!S||S.dead||host())return;const tn=S.tn;if(!tn||tn.w!==wk()){CW.tnLast=JSON.stringify([wk(),tnWho()]);return}
 const who=tn.who===fp()?fp():tn.who;const was=S.tonight==="me";tnSet(who);
 if(S.tonight==="me"&&!was){try{pushDil(mkP("ksp"),"Kính sự phòng báo tin")}catch(e){}}};
(function(){const f=render;render=function(){const r=f.apply(this,arguments);try{if(CW.on)tnRelay()}catch(e){}try{if(CW.on)cySend()}catch(e){}return r}})();

/* ---------- B5 (review/coop-b1b5): seat caps count BOTH players ----------
   (1) the week's promotions (monthTick → promote / fillSeats) run while endTurn has taken the friend out of the harem: the seat count
       (holders, j30 SEATCAP) now counts her entry too, so a full seat is full on both screens.
   (2) both promoted into the same last seat in the same week (neither could see the other's decree): the host keeps it; on the guest's
       merged week she is put back one rank (the seat is full) and told why, on the kit dialog. */
(function(){if(typeof holders!=="function")return;const f=holders;holders=function(r){const L=f.apply(this,arguments);if(!CW.on||!S)return L;
 for(const x of CW.pulled||[]){const v=x[1];if(x[0]>=0&&v&&v.alive&&!v.out&&!L.includes(v)&&rkOf(v)===r)L.push(v)}return L}})();
CW.seatWeek=function(){if(!CW.on||!S||S.dead||host()||typeof SEATCAP!=="object"||!CW.mine)return;const r=S.rank||0,r0=CW.mine.rank||0;
 const f=friendEntry();if(r<=r0||!f||rkOf(f)!==r||SEATCAP[r]==null)return;if(holders(r).length<=SEATCAP[r])return;
 const nr=Math.max(r0,r-1);S.rank=nr;if(S.justCrowned)S.justCrowned=0;
 /* she did not take the seat (not a demotion for a fault): no "Bị giáng" scene from the j93 rank watcher */
 try{if(typeof KMSNAP!=="undefined"&&KMSNAP&&KMS===S)KMSNAP.rank=nr}catch(e){}
 /* r1 fix 3 (OD:L1228): no waiting claim on the seat. A full seat gives the LARGE one-off compensation of the promo-skip rule (jexam
    promoFullSeat, the ONE implementation since promo-skip is on main; numbers BAL.psk.seat): big silver, rare gifts, a phong hiệu without a
    rank change, favour for her family; loss: the consorts' jealousy. Her rank stays; the next one goes through the normal exam. */
 let t="";if(nr===r-1){try{t=promoFullSeat(S,"coop",{}).replace(/^<b class="g">[^<]*<\/b>:\s*/,"")/* the card already says the seat is full */}catch(e){console.error(e)}}
 pushModal({t:"Ghế đã có người",h:`<p>Cùng tuần ấy, ${esc(friendName())} được tấn phong ${esc(RANKS[r].n)} trước. Ghế ${esc(RANKS[r].n)} chỉ có ${SEATCAP[r]}, nay đã đủ người.</p>${t?`<p>${t}</p>`:""}`})};

/* ---------- hooks ---------- */
const mute=n=>{const f=window[n];if(typeof f!=="function")return;window[n]=function(){if(CW.on&&!host())return "";return f.apply(this,arguments)}};
["rivalsTurn","rivalsMonth","festival"].forEach(mute);
/* host: keep the world news text of the week for the guest */
["rivalsTurn","rivalsMonth","festival"].forEach(n=>{const f=window[n];if(typeof f!=="function")return;window[n]=function(){const r=f.apply(this,arguments);if(CW.on&&host()&&typeof r==="string")CW.news+=r;return r}});
/* B4 (review/coop-b1b5): the week's NPC schemes (rivalsTurn), the month's NPC moves (rivalsMonth) and the festival contests roll on the
   HOST only, as before, but now WITH the friend's entry in the harem (endTurn had taken her out): NPCs can aim at her, she competes at
   Yến xuân / Thất tịch with her real numbers. What they do to her entry (Sủng, Danh, Thiện cảm, Oán, lãnh cung, death) is written back
   into her blob by toCanon, so the merge lands it on HER own S; the lines about her reach her in the week's news (cnews). */
["rivalsTurn","rivalsMonth","festival"].forEach(n=>{const f=window[n];if(typeof f!=="function")return;window[n]=function(){if(!CW.on||!host())return f.apply(this,arguments);
 const L=CW.pulled;if(!L||!L.length)return f.apply(this,arguments);pushFriend(L.slice());(CW.b4=CW.b4||[]).push(n);if(CW.b4.length>20)CW.b4.shift();try{return f.apply(this,arguments)}finally{pullFriend()}}});
/* B3 (review/coop-b1b5): the Emperor's death in co-op, host-authoritative. The month roll only counts on the HOST and only for the
   reigning Emperor's own years (emp.y0 = the year he came to the throne); it writes emp.dead = {w} into the world (emp is a world key)
   and the week goes on. When the merged week w arrives, BOTH clients run the normal ending of the reign (heir → Thái hậu / Thái phi /
   tuẫn táng…, from her own heir and rank) at the same moment; the new lives (Luân hồi) join the same world under a NEW Emperor, made
   once by the host (mkEmp) and carried by its next week. The guest's own roll never fires. */
(function(){const f=emperorDies;emperorDies=function(){if(!CW.on)return f.apply(this,arguments);try{if(arguments[0])log(arguments[0])}catch(e){}
 if(!host()||!S||!S.emp||S.emp.dead)return;if(typeof S.emp.y0==="number"&&(S.year||0)-S.emp.y0<=(BAL.coopEmpY||12))return;
 S.emp.dead={w:wk()+(CW.inTurn?1:0),y:S.year,age:S.emp.age}};
 CW.empWeek=function(){if(!CW.on||!S||S.dead)return false;const d=S.emp&&S.emp.dead;if(!d||d.w!==wk()||CW.empDone===d.w)return false;CW.empDone=d.w;
  let ne=null;if(host()){try{ne=mkEmp();ne.y0=S.year||0}catch(e){console.error(e)}}
  try{f.apply(this,[""])}catch(e){console.error(e)}
  (CW.empLog=CW.empLog||[]).push({w:d.w,dead:!!(S&&S.dead),end:Q[0]&&Q[0].t||"",bh:/băng hà/.test(Q[0]&&Q[0].h||"")});
  /* the world the new lives join: the new Emperor (host), the old one gone */
  if(ne){const C=CW.dying||CW.base;if(C&&C.W&&C.W.S)C.W.S.emp=Object.assign(J(ne),{known:undefined});if(S&&!S.dead){S.emp=Object.assign(ne,{known:{}})}}
  return true}})();
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
function seatPush(o,now){if(!CW.on||CW.seatOld||!o||COOP.state.status!=="open")return;
 if(!now&&Date.now()-seatAt<SEAT_MS){if(!seatT)seatT=setTimeout(()=>{seatT=0;snapSave()},SEAT_MS-(Date.now()-seatAt));return}
 const k=JSON.stringify([o.week,o.buoi,o.used,o.d,o.c]);if(k===seatLast)return;
 seatAt=Date.now();COOP.send({t:"seat",sv:CW.ssv||0,o}).then(ok=>{if(ok)seatLast=k})}
COOP.on("seatok",m=>{if(typeof m.sv==="number"){CW.ssv=Math.max(CW.ssvWk===wk()?CW.ssv||0:0,m.sv);CW.ssvWk=wk()}});
COOP.on("error",m=>{if(m&&m.code==="seatold"){CW.seatOld=true;T("seatold "+m.sv)}});
COOP.on("week",m=>{seatLast="";CW.seatOld=false;CW.ssv=0;CW.ssvWk=m&&m.week});  /* the server starts the seat versions again each week */
/* review/coop-rejoin-xdev-r1: a device that was only ASLEEP (socket gone, page kept, e.g. the Fold locked) while she played on another
   device reconnects by itself (no begin): when the room's copy of her seat is newer and was written by another device, take it, so this
   device does not go on with its stale week (and its own copies are accepted again instead of "seatold"). */
COOP.on("room",m=>{if(!CW.on||!CW.base||!m||!m.state)return;const R=m.mine;
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

/* ================= review/coop-b1b5-p2 (D21 co-op B1–B5, part 2) =================
   Relays ride the existing free-form act channel (k "ctm-p2", mode = op): no Worker change, protocol stays backward-compatible
   (an old client ignores an unknown k). Every act has its gain AND its loss on both sides; numbers from BAL / the existing act code. */
const P2K="ctm-p2",P2S=new Set();
function p2say(mode,o){try{COOP.send(Object.assign({t:"act",k:P2K,mode,week:wk(),id:P2K+mode+":"+newId()},o||{}))}catch(e){}}
const P2H={};COOP.on("act",m=>{if(!m||m.k!==P2K||!CW.on||m.from===CW.seat||!S||P2S.has(m.id))return;P2S.add(m.id);const h=P2H[m.mode];if(h)try{h(m)}catch(e){console.error(e)}});
const fSrvE=()=>{try{return allServ().find(isF)||null}catch(e){return null}};
const isSrvMe=()=>typeof isSrv==="function"&&isSrv();

/* ---------- (1) B1: the friend serves as a cung nữ: the maid act set on her servant entry ----------
   On a servant of another house the acts are Mua chuộc (bribeServ, j29) and Dọa tố đối thực (threatServ: needs a known servant lover;
   her affair is with a man of the outer court, which j42 keeps on her own side, so that act is never offered on her). Mua chuộc on HER is
   her decision, not a dice roll on my screen: she gets the same card an NPC's bribe gives her (j42 cnvBribe), with me as the buyer.
     Nhận bạc → she: Bạc +pay, tai mắt of mine (monthly Bạc +8, the mistress may catch her: her j42 rules); me: Bạc −pay, a tai mắt there.
     Từ chối, bẩm chủ → she: Chủ tin +tin; me: the mistress holds 1 proof of my bribe, she likes me −5.   Im lặng → my bạc comes back.
   An NPC's bribe aimed at her (host world) reaches her as the j42 card itself. What she reports as my tai mắt (j42 "Lén báo tin",
   the monthly spy line: evA with my entry as holder) becomes MY proof on my side (relay "ev"), never lost in her copy of my entry. */
(function(){if(typeof bribeServ!=="function")return;const f=bribeServ;bribeServ=function(a,s){if(!CW.on||!isF(s))return f.apply(this,arguments);
 const o=ownerOf(s);if(!o||o===a)return "";const B=BAL.coopBribe;
 if(a===S){if((S.bac||0)<B.pay)return "";const id=newId();(CW.brb=CW.brb||{})[id]={o:o.id};p2say("bribe",{rid:id,who:S.name,pay:B.pay});
  return `Ngươi sai thái giám đem ${B.pay} lượng bạc dúi cho ${s.name}, đợi nàng trả lời. `}
 if(host()&&a&&a.id!=null&&a.alive&&(a.bac||0)>=B.pay)p2say("nbribe",{r:a.id});return ""}})();
P2H.bribe=m=>{if(S.dead||!isSrvMe())return p2say("briber",{rid:m.rid,no:1});const mis=srvM(),B=BAL.coopBribe,nm=esc(m.who||friendName()),mn=esc(mis?mis.name:"chủ nhân");
 pushModal({act:1,t:"Bạc lạ",h:`<p>Một thái giám của <b>${nm}</b> chặn ngươi ở hành lang, dúi vào tay ngươi một túi bạc: “Chủ tử nhà ta muốn biết chuyện trong cung ${mn}.”</p>`,opts:[
  {n:"Nhận bạc, làm tai mắt",fx:{bac:+m.pay||B.pay},x:cnvSpyX(mis),go:()=>{S.srv.spyFor=fp();p2say("briber",{rid:m.rid,ok:1})}},
  {n:"Từ chối, bẩm chủ",fx:{tin:B.tin},x:`${mn} nắm 1 chứng cứ của ${nm}`,go:()=>p2say("briber",{rid:m.rid,told:1})},
  {n:"Từ chối, im lặng",fx:{},x:"trả lại bạc",go:()=>p2say("briber",{rid:m.rid})}]});showModal();render()};
P2H.briber=m=>{const a=(CW.brb||{})[m.rid];if(!a)return;delete CW.brb[m.rid];if(S.dead)return;const s=fSrvE(),o=RV(a.o),B=BAL.coopBribe,nm=esc(friendName()),on=esc(o?o.name:"cung khác");let h="";
 if(m.no)h=`<p><b>${nm}</b> nay không còn hầu ở cung ${on}.</p>`;
 else{try{deedAdd(S,"sbribe",null,1,`mua chuộc người hầu của ${o?o.name:"cung khác"}`)}catch(e){}
  if(m.ok){apply({bac:-B.pay});if(s)s.spyFor="me";h=`<p><b>${nm}</b> nhận bạc, thành tai mắt của ngươi trong cung ${on}.</p><p>${fmt({bac:-B.pay})}</p>`}
  else if(m.told){let d=0;if(o&&o.alive){d=evA(o,S,1);relAdd(S,o,-5)}h=`<p><span class="r"><b>${nm}</b> từ chối bạc, bẩm với ${on}.</span></p>${d?`<p class="r">${on} nắm thêm ${d} chứng cứ của ngươi.</p>`:""}`}
  else h=`<p><b>${nm}</b> từ chối, trả lại bạc.</p>`}
 pushModal({t:"Mua chuộc",h});showModal();render()};
P2H.nbribe=m=>{if(S.dead||!isSrvMe())return;const v=RV(m.r);if(!v||!v.alive)return;try{pushDil(mkP("cnvBribe",{r:v.id}),"Bạc lạ")}catch(e){console.error(e)}showModal();render()};
(function(){if(typeof evA!=="function")return;const f=evA;evA=function(h,t,n){const d=f.apply(this,arguments);
 try{if(CW.on&&!CW.b4in&&d>0&&isF(h)&&t&&t!==S&&!isF(t)&&t.id!=null&&t.id<900)p2say("ev",{tg:t.id,n:d})}catch(e){}return d}})();
P2H.ev=m=>{if(S.dead)return;const v=RV(m.tg);if(!v||!v.alive)return;const d=evA(S,v,+m.n||0);if(d>0){try{log(`Tai mắt ${esc(friendName())} lén báo tin: chứng cứ với ${esc(v.name)} +${d}.`)}catch(e){}render()}};
/* ---------- B2 × jcycle (review/coop-b1b5-fix): her Kỳ nguyệt sự answers reach the other seat ----------
   Before: with B2 the HOST draws the one night with the friend's entry in its deck, but jcycle read the lie / back / hide flags only from
   its own S: the guest's maid card (báo lùi / báo sớm / giấu) cost her Đức / ghen and changed nothing on the host's tray, and both seats
   end the week at once, so the host's draw came before her answer. Now: each seat relays its own S.cyb flags (jcycle cyRec: lie, back,
   hide, rum …, + pend = the card is still open) on the free-form act channel whenever they change; the other seat keeps them as
   CW.fcy and jcycle reads them for the friend's entry (cybOf → COOPW.fcyb; after a merge her blob holds the same). The host's week draw
   WAITS (cyHold: no draw, no week end sent) while she is in her cycle tuần and her answer for this week is not in; her answer, or her
   end of week (an old client that never relays: true report), frees it. Costs stay on her side only (she pays once, on her client). */
CW.fcyb=()=>{const P=CW.base&&CW.base.P&&CW.base.P[fs()],r=CW.fcy;if(r&&(!P||r.life===(P.life||0)))return r.c||{};return (P&&P.S&&P.S.cyb)||{}};
function cySend(){if(!CW.on||!S||S.dead||CW.inTurn/* mid-week-end: the new week's card is not asked yet */||typeof window.cyRec!=="function")return;const r=window.cyRec();r.life=CW.life||0;const k=JSON.stringify(r);if(k===CW.cyK)return;CW.cyK=k;p2say("cyb",r)}
function cyWait(fe){if(!fe||fe.out||fe.alive===false||typeof window.cycOn!=="function"||typeof window.cyWk!=="function"||!window.cycOn(fe))return false;
 const r=CW.fcy,g=window.cyWk();if(r&&r.w===g&&!r.pend)return false;const e=COOP.state.ended||{};return !e[fs()]}
function cyFree(){if(CW.cyHold==null||!CW.on||!S)return;if(!S.dead&&cyWait(friendEntry()))return;T("cyFree "+CW.cyHold);CW.cyHold=null;if(S.dead)return;
 const c=S.cyb||{},g=window.cyWk();/* her own maid card still open: its answer runs the flip */if(!(c.df===g&&c.rk!==g))try{flip()}catch(e){console.error(e)}
 try{render()}catch(e){}soonEnd()}
P2H.cyb=m=>{if(typeof m.w!=="number")return;CW.fcy={w:m.w,c:m.c&&typeof m.c==="object"?m.c:{},pend:!!m.pend,life:m.life||0};cyFree()};
COOP.on("presence",()=>{if(CW.on&&CW.cyHold!=null)cyFree()});
COOP.on("stop",()=>{CW.cyHold=null;CW.fcy=null;CW.cyK=""});
COOP.on("room",()=>{CW.cyK=""});/* a reconnect: a relay sent while the socket was down is lost; say it again on the next render */
/* her monthly servant life (j42 srvMonth: wage, the spy's pay and the mistress catching her) runs inside the week while the friend's
   entry is out of the harem: put it back for that call, so her buyer (me) is still there and the spy line is not dropped */
(function(){if(typeof srvMonth!=="function")return;const f=srvMonth;srvMonth=function(){const L=CW.on&&CW.pulled;if(!L||!L.length)return f.apply(this,arguments);
 pushFriend(L.slice());try{return f.apply(this,arguments)}finally{pullFriend()}}})();

/* ---------- (2) B2: ONE heir (Thái tử) for the whole world, host-authoritative ----------
   World key S.hr = "<p|n><id>|<kid name#birth>" (p901/p902 = a player's child, n<id> = an NPC's): a string, so the merge never adds ids.
   The host's heirMonth (lập Thái tử, the lập đích debate) runs with the friend's entry in the harem, so her sons are candidates exactly as
   an NPC's; the guest's heirMonth never runs. Both clients resolve S.hr into S.heir after every rebuild (fromCanon), so the heir, the
   succession order and the reign ending read the same child on both screens. Her own loss (her heir dies, is deposed by an act) clears it
   from her side. The mother gets the j1 setHeir gain (Danh) on her own client, once. */
W_KEYS.push("hr");
function hrStr(){const H=S&&S.heir;if(!H||!H.k||H.k.alive===false)return null;const v=H.v;return (!v?"p"+me():isF(v)?"p"+fp():"n"+v.id)+"|"+kidId(H.k)}
function hrFind(h){if(!h||typeof h!=="string")return null;const i=h.indexOf("|");if(i<0)return null;const w=h.slice(0,i),n=h.slice(i+1);let v=null,L=null;
 if(w==="p"+me())L=S.kids;else if(w==="p"+fp()){v=friendEntry();L=v&&v.kids}else{v=RV(+w.slice(1));L=v&&v.kids}
 const k=(L||[]).find(k=>k&&k.alive!==false&&kidId(k)===n);return k?{k,v}:null}
CW.hrApply=function(){if(!CW.on||!S)return;const h=S.hr||null;for(const [k] of allKids())if(k&&k.heir)k.heir=false;
 const x=hrFind(h);if(!x){S.heir=null;return}x.k.heir=true;S.heir={k:x.k,v:x.v}};
CW.hrSync=function(){if(!CW.on||!S||S.dead)return;S.hr=hrStr();if(!host())CW.hrPrev=S.hr};
(function(){if(typeof heirMonth!=="function")return;const f=heirMonth;heirMonth=function(){if(!CW.on)return f.apply(this,arguments);if(!host())return "";
 const L=CW.pulled;if(L&&L.length)pushFriend(L.slice());let r;try{r=f.apply(this,arguments)}finally{if(L&&L.length)pullFriend()}try{S.hr=hrStr()}catch(e){}return r}})();
/* guest, merged week: the host named a new heir → her card (her own son: the j1 gain on her side) */
CW.hrWeek=function(){if(!CW.on||!S||S.dead||host())return;const h=S.hr||null,was=CW.hrPrev;CW.hrPrev=h;if(was===undefined||h===was||!h)return;const x=hrFind(h);if(!x)return;
 if(!x.v){const d0=S.danh||0;try{setHeir(x.k,null)}catch(e){console.error(e)}const dd=(S.danh||0)-d0;/* reviewer r2: print what setHeir gave (ONE CORE), not a typed 10 */pushModal({t:"Lập Thái tử",h:`<p><b class="g">Hoàng thượng lập ${esc(x.k.name)}, con của ngươi, làm Thái tử.</b></p>${dd?`<p>${fmt({danh:dd})}</p>`:""}`});return}
 pushModal({t:"Lập Thái tử",h:`<p>Hoàng thượng lập ${esc(x.k.name)}, con của ${esc(x.v===friendEntry()?friendName():x.v.name)}, làm Thái tử.</p>`})};
(function(){const f=CW.seatWeek;CW.seatWeek=function(){try{CW.hrWeek()}catch(e){console.error(e)}return f.apply(this,arguments)}})();

/* ---------- (4) B4: what the host's NPCs do to her ITEMS / CHILDREN, her own festival entry ----------
   rivalsTurn / rivalsMonth / festival on the host run with her entry in the harem (part 1). Before: only her numbers came back (toCanon).
   Now the host diffs her entry around each call and sends the item / child ops (same res.fam ops as the acts between the two, plus
   "add" for a thing given to her and by / to = the NPC who took it), so a theft is a thất lạc case held by THAT NPC, a poisoned child
   dies on her side, a child taken is raised by that NPC. Festival (j71 FX7): her own registration (the art she chose, the teacher she
   paid: S.j71.fx, sent live in pos) is used for her score, not the NPC "best art"; she pays the same Sức as when she plays it herself,
   her registration is closed and she gets the result card with her place and any prize. */
function b4Snap(){const x=(CW.pulled||[]).find(y=>y[0]>=0);const v=x&&x[1];if(!v)return null;let P0=null;try{P0=tsbPets(v).map(P=>[P,Object.assign({},P)])}catch(e){}return {v,inv0:(v.inv||[]).slice(),K0:famSnap(v),P0}}
function b4Ops(b,why){const v=b.v,ops=[],L1=v.inv||[];
 for(const e of b.inv0)if(!L1.includes(e)&&e&&e.ci!=null){const ci=e.ci,th=rivals.find(r=>r!==v&&!isF(r)&&(r.inv||[]).includes(e));if(th)delete e.ci;ops.push(Object.assign({op:"rm",ci,k:e.k,how:th?"lost":"gone"},th?{by:th.id}:{}))}
 for(const e of L1)if(!b.inv0.includes(e)&&e&&e.k){const x=J(e);delete x.ci;if(x.by==="me")x.by=me();ops.push(e.h?{op:"plant",e:x}:{op:"add",e:x,why:why||""})}
 for(const [kd,c] of b.K0.kids){const n=kidId(c);if(!(v.kids||[]).includes(kd)){const to=rivals.find(r=>r!==v&&!isF(r)&&(r.kids||[]).includes(kd));ops.push(Object.assign({op:"ktake",n},to?{to:to.id}:{}));continue}
  if(c.alive!==false&&kd.alive===false){ops.push({op:"kdie",n,why:"mất sớm"});continue}
  const d={};for(const x of ["hp","tal","fond"])if(typeof kd[x]==="number"&&kd[x]!==c[x])d[x]=kd[x]-(c[x]||0);const h0=!!c.heir&&!kd.heir;
  if(Object.keys(d).length||h0)ops.push(Object.assign({op:"kd",n,d},h0?{heir0:1}:{}))}
 if(b.K0.preg&&!v.preg)ops.push({op:"preg0"});return ops}
function b4Send(ops,o){o=o||{};if(!ops.length&&!o.force)return;const rid=newId();CW.rpend[rid]=Date.now();(CW.b4s=CW.b4s||[]).push({ops:ops.map(x=>x.op),tt:o.tt||""});if(CW.b4s.length>20)CW.b4s.shift();
 COOP.send(Object.assign({t:"res",id:rid,k:o.pet&&o.pet.some(x=>x.op==="lose")?"petsteal":"npc",n:"",who:"",fx:o.fx||{},flags:{},seen:"effect",fam:ops,hd:o.hd||"",tt:o.tt||""},o.fest?{fest:o.fest}:{},o.pet&&o.pet.length?{pet:o.pet}:{}))}
/* r1 fix 2: an NPC's pet act on her entry (jpetcare mindMenu petsteal / thaopet) → the same res.pet ops as mine: she loses it, not a copy */
function b4Pet(b){try{return b&&b.P0?petDiff(b.v,b.P0):[]}catch(e){return []}}
function f7reg(v,kk){try{const F=FX7[kk];const X=F&&v&&v.fx7&&v.fx7[F.f];return X&&X.a&&X.y===S.year&&!X.done&&SC7[X.a]?{F,X}:null}catch(e){return null}}
/* the festival being scored with her entry (also when the host's own minigame defers the scoring to fxFin7) */
function f7Done(L){const c=CW.f7;if(!c||!L)return;CW.f7=null;const i=L.findIndex(x=>isF(x.p));const ops=b4Ops(c.b,c.title);if(i<0){b4Send(ops,{tt:c.title});return}
 const x=L[i],an=SC7[x.kind]?SC7[x.kind].n:"tài nghệ";const top=i===0;CW.f7last={i,n:L.length,kind:x.kind,reg:!!c.reg};
 const hd=top?`${c.title}: ${an} của ngươi đứng đầu, Hoàng thượng ban thưởng (Sủng, Danh tăng; về cùng tuần mới).`:`${c.title}: ngươi dâng ${an}, đứng hạng ${i+1} trong ${L.length} người dự thi${i>=L.length-1?"; lu mờ trước hậu cung":""}.`;
 b4Send(ops,{force:1,tt:c.title,hd,fx:c.reg&&typeof J71==="object"?{suc:-J71.cost}:{},fest:c.reg?{f:c.reg.F.f,y:S.year}:null})}
if(typeof cScore7==="function"){const f=cScore7;cScore7=function(){const L=f.apply(this,arguments);try{const c=CW.on&&host()&&CW.f7;if(c&&Array.isArray(L)){
 if(c.reg){const pr=(c.reg.X.pr&&typeof J71==="object"?J71.prep:0)+(c.reg.X.pb||0);for(const x of L)if(isF(x.p)){x.pr=(x.pr||0)+pr;x.s+=pr}L.sort((a,b)=>b.s-a.s)}CW.f7.L=L}}catch(e){console.error(e)}return L}}
if(typeof fxBest7==="function"){const f=fxBest7;fxBest7=function(p){const c=CW.on&&host()&&CW.f7;if(c&&c.reg&&isF(p))return c.reg.X.a;return f.apply(this,arguments)}}
if(typeof fxFin7==="function"){const f=fxFin7;fxFin7=function(t,L){const r=f.apply(this,arguments);try{if(CW.on&&host()&&CW.f7&&CW.f7.title===t)f7Done(L)}catch(e){console.error(e)}return r}}
function b4Wrap(n,f){return function(){if(!CW.on||!host()||!CW.pulled||!CW.pulled.length)return f.apply(this,arguments);
 const b=b4Snap();if(!b)return f.apply(this,arguments);const fest=n==="festival";if(fest){CW.f7={b,title:arguments[0]||"Hội thi",reg:f7reg(b.v,arguments[1]),L:null}}
 CW.b4in=true;let r;try{r=f.apply(this,arguments)}finally{CW.b4in=false}
 try{if(fest){if(CW.f7&&CW.f7.L)f7Done(CW.f7.L);else if(CW.f7&&!Q.some(q=>q&&q.t===CW.f7.title)){const c=CW.f7;CW.f7=null;b4Send(b4Ops(c.b,c.title),{tt:c.title})}}
  else{const pet=b4Pet(b);b4Send(b4Ops(b,""),{pet,force:pet.length})}}catch(e){console.error(e)}return r}}
["rivalsTurn","rivalsMonth","festival"].forEach(n=>{const f=window[n];if(typeof f!=="function")return;window[n]=b4Wrap(n,f)});
/* r1 fix 2 (whole family): ANY NPC act on her entry, whatever path runs it (npcAct, mindRun, a j70 plot's exec70, the jealousy kv acts,
   a due plan in rivalsBuoi…), outside the diffed calls above: the host snapshots her entry around that one act and sends the same res.fam /
   res.pet ops, so the NPC gains AND she loses (never a copy). The guest never lets an NPC act on the host's entry (NPCs roll on the host).
   Numbers stay with toCanon / her live pos as before. */
(function(){const f=runAct;runAct=function(a,t,k){if(!CW.on||!S||a===S||!t||!isF(t)||CW.b4in)return f.apply(this,arguments);
 if(!host())return "";let P0=null;try{P0=tsbPets(t).map(P=>[P,Object.assign({},P)])}catch(e){}
 const b={v:t,inv0:(t.inv||[]).slice(),K0:famSnap(t),P0};CW.b4in=true;let r;try{r=f.apply(this,arguments)}finally{CW.b4in=false}
 try{const pet=b4Pet(b),ops=b4Ops(b,"");(CW.npcOn=CW.npcOn||[]).push({a:a&&a.id,k,ops:ops.map(x=>x.op),pet:pet.map(x=>x.op)});if(CW.npcOn.length>20)CW.npcOn.shift();
  b4Send(ops,{pet,force:pet.length})}catch(e){console.error(e)}return r}})();
/* test hooks (dev/test/coop-p2.js): run fn as an NPC turn of the host's week (friend out of the harem as in endTurn, back in for fn) */
CW.b4Run=fn=>{const L=pullFriend();CW.pulled=L;try{return b4Wrap("rivalsTurn",()=>{pushFriend(L.slice());try{return fn()}finally{pullFriend()}})()}finally{CW.pulled=null;pushFriend(L)}};
CW.b4Fest=(t,kk)=>{const L=pullFriend();CW.pulled=L;try{return festival(t,kk)}finally{CW.pulled=null;pushFriend(L)}};
/* her side: the festival she was entered in is over (her j71 card would otherwise wait for it) */
COOP.on("res",m=>{try{if(!m||!m.fest||m.from===CW.seat||!CW.on||!S)return;const j=S.j71&&S.j71.fx&&S.j71.fx[m.fest.f];if(j&&j.y===m.fest.y)j.done=1}catch(e){}});

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
