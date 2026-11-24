/* ================= jsvt SERVANT TRUST — every act toward ANOTHER person's servant has a relationship effect =================
   Owner OD 24/11 ~08:12Z real (verbatim in dev/OWNER_DECISIONS.md): when a master of another palace talks to HER servant, the servant may REFUSE
   (her nết + lòng) → nothing changes; or TALK → the servant's master grows suspicious: Chủ tin in that servant drops (jtin tinAdd, the ONE trust store)
   and her thiện cảm toward the other master drops; the servant may let slip a REAL secret (law 6a: chứng cứ only when the master truly schemed / keeps
   a tư tình). The same for her toward others' servants and NPC ↔ NPC (law 1). Etiquette OD ~07:58Z: an OPEN talk with a servant while her master
   stands at the same place and was not greeted this buổi = BẤT KÍNH toward that master (covert acts — Mua chuộc, Dọa tố, Cài tai mắt, j70 plots — skip
   the greeting but are seen less). OD ~08:08Z: no warning before; the consequence shows only after (words only, no number shown, law 7).
   ONE function svTouch(actor, servant, kind) for the whole family (law 11): bribeServ (j29, stf2Bribe inside), threatServ (j10 + par3 cnvBlack),
   tmTake (jagknow «Cài tai mắt»), j70 plot accomplice (inline call), servant ↔ servant friend talk (j10 servMonth inline), and the open talk svTalk
   («Hỏi chuyện» on another house's servant, her card j15 + staff list j10; NPC mistresses monthly). Numbers: BAL.svt (jbal2.js, law 4).
   Real effect of a low Chủ tin: bestSent / watcher (jtin) skip the suspected; an NPC master returns a servant under BAL.svt.tin.out to Nội vụ phủ.
   =============================================================================================================================================== */
const SVT={stat:{talk:0,refuse:0,seen:0,leak:0,greet:0,out:0,touch:{}},on:()=>{try{return !!(BAL.svt&&BAL.svt.on)&&!window.__svtOff}catch(e){return false}}};
function svtIsSv(x){return !!x&&typeof x==="object"&&x.sid!=null&&typeof x.loyal==="number"&&!x.alive&&x.role!=null}
/* the person the relation belongs to: a servant who acts does it for her own master */
function svtWho(a){if(svtIsSv(a)){try{return ownerOf(a)||null}catch(e){return null}}return a||null}
function svtId(p){return p===S?"me":p&&p.id!=null?"v"+p.id:p&&p.sid!=null?"s"+p.sid/* fix r1: a servant actor (servant ↔ servant) */:null}
function svtGuest(a,m){try{return typeof mlGuest==="function"&&mlGuest()&&a!==S&&m!==S}catch(e){return false}}
/* the odds the servant refuses an open talk (law 4: BAL.svt.ref; her nết by netQ, the same table as every servant act) */
function svtRefO(s){const B=BAL.svt.ref;let tin=B.mid;try{tin=tinOf(s)}catch(e){}
 const v=B.base+((s.loyal||0)-B.mid)*B.loyK+(tin-B.mid)*B.tinK+nq(s,"loyal",B.loyal)+nq(s,"timid",B.timid)+nq(s,"talk",B.talk)+nq(s,"greed",B.greed);
 return Math.round(Math.max(B.min,Math.min(B.max,v)))}
/* fix r1 (law 1): a servant stands with her master; on the cung-nữ road she herself is another's servant. house = the one the relation belongs to */
function svtSrvMe(){try{return typeof isSrv==="function"&&isSrv()}catch(e){return false}}
function svtHouse(p){if(svtIsSv(p)){try{return ownerOf(p)||null}catch(e){return null}}if(p===S&&svtSrvMe()){try{return srvM()}catch(e){return null}}return p||null}
function svtRk(p){return svtIsSv(p)||(p===S&&svtSrvMe())?-1/* a servant is below every master */:rkOf(p)}
function svtNm(a){const A=svtWho(a);return svtIsSv(a)&&A&&A!==a?`${a.name}, người của ${A===S?"ngươi":A.name},`:a===S?"ngươi":a.name}
/* where the act happens: the caller's place (at), else where the actor stands (a servant with her master) */
function svtPlace(p,at){if(at)return at;try{const kh=j95kh();if(p===S)return knAt("me",kh);const h=svtIsSv(p)?ownerOf(p):p;const id=svtId(h);return id&&typeof knAt==="function"?knAt(id,kh):null}catch(e){return null}}
function svtNear(a,m,at){try{const x=svtPlace(a,at),y=svtPlace(m);return !!x&&x===y}catch(e){return false}}
const SVT_COVERT={bribe:1,threat:1,tm:1,plot:1,friend:1};
/* fix r1 (law 6, the witness rule of newsAdd j28 / npc-purpose G2): the master comes to know ONLY through a real witness — she stands right there, her
   eyes (informants), a talkative servant of her household (nết «talk»), or a witness at the place who chooses to tell her (npcTell). No witness → never. */
function svtSeen(a,m,kind,at,s){const B=BAL.svt.seen,cv=SVT_COVERT[kind]?B.covert:0;
 if(svtNear(a,m,at)&&roll(B.near-cv))return{how:"near"};
 const e=eyes(m);if(e>=1&&roll(B.eyeB+e*B.eye-cv))return{how:"eyes"};
 try{const H=(m===S?S.staff:m.staff)||[];const w=H.find(x=>x!==s&&x!==a&&netIs(x,"talk"));if(w&&roll(B.talk-cv))return{how:"talk",w}}catch(e){}
 try{const pl=svtPlace(a,at);const A=svtWho(a);const T=pl&&typeof npcTell==="function"?npcTell(A,{place:pl,to:m}):null;if(T&&T.who&&T.who!==A&&T.who!==a&&roll(B.tell-cv))return{how:"tell",w:T.who}}catch(e){}
 return null}
/* the odds read-out of the rolled sources (tests / measures only; never shown) */
function svtSeenO(a,m,kind,at){const B=BAL.svt.seen,cv=SVT_COVERT[kind]?B.covert:0,c=x=>Math.max(0,Math.min(100,x))/100;let q=1;
 if(svtNear(a,m,at))q*=1-c(B.near-cv);const e=eyes(m);if(e>=1)q*=1-c(B.eyeB+e*B.eye-cv);
 try{const H=(m===S?S.staff:m.staff)||[];if(H.some(x=>netIs(x,"talk")))q*=1-c(B.talk-cv)}catch(e){}return Math.round((1-q)*100)}
const SVT_HOW={near:m=>m===S?"Chính mắt ngươi thấy":`${m.name} tận mắt trông thấy`,eyes:m=>m===S?"Tai mắt của ngươi bẩm":`Tai mắt của ${m.name} bẩm lại`,
 talk:(m,w)=>`${w.name} miệng mồm lanh lẹ, kể lại`,tell:(m,w)=>`${w.name} có mặt ở đó, đến mách`};
function svtLeakO(s){const B=BAL.svt.leak;return Math.round(Math.max(0,Math.min(100,B.base+(100-(s.loyal||0))*B.loyK+nq(s,"talk",B.talk)+nq(s,"greed",B.greed)+nq(s,"loyal",B.loyal))))}
/* a REAL secret to let slip (law 6a): schemes since this servant's last slip, or a tư tình */
function svtHasSecret(m,s,A){const nw=(m.schemes||0)>(s.svtL||0)||(m.dw||0)>(s.svtD||0)||!!m.affair;if(!nw)return false;try{if(typeof deedCap==="function"&&deedCap(m)<=evG(A,m))return false/* jtruth: proof only up to the real deeds */}catch(e){}return true}
/* greetings of this buổi (jgreet greetName is the ONE greeting function: wrapped below) */
function svtGz(){const k=j95key();if(!S.svtG||S.svtG.k!==k)S.svtG={k,g:{}};return S.svtG.g}
function svtGreeted(a,m){try{return !!svtGz()[svtId(a)+">"+svtId(m)]}catch(e){return true}}
/* BẤT KÍNH (OD ~07:58Z): speaking straight to the servant of a master who stands right there, without greeting her first */
function svtEtq(a,m,s,at){if(!svtNear(a,m,at)||svtGreeted(a,m))return"";const B=BAL.svt.greet;const d=rkOf(m)-svtRk(a),k=d>0?B.up:d<0?B.dn:1;
 oanAdd(m,a,Math.round(B.oan*k));affAdd(m,a,-Math.round(B.aff*k));SVT.stat.greet++;
 if(a===S)return `${m.name} đứng ngay đó mà ngươi không chào, lại gọi thẳng ${s.name} — ${m.name} cho là ngươi bất kính. `;
 if(m===S)return `${svtNm(a).replace(/,$/,"")} chẳng chào ngươi một tiếng mà gọi thẳng ${s===S?"ngươi":s.name} — thật là bất kính. `;return""}
/* svTouch: the servant DID engage (talked / took the bạc / took the threat / became eyes): her master may come to know; the servant may let slip */
const SVT_VERB={friend:"cho người hầu kết thân với",talk:"kéo riêng",chat:"bắt chuyện với",gift:"biếu quà",ask:"dò hỏi chuyện trong cung qua"};
const SVT_NOLEAK={friend:1/* the friend talk carries its own chứng cứ (j10 servMonth / jagstaff chat) */,chat:1,gift:1};
function svTouch(a,s,kind,at,mv){if(!SVT.on()||!a||!s)return"";const sMv=mv===s;/* d-followups-1 (wording, law 7): mv = who MOVED (came to the other); the after-line names the one who came, never «ngươi tìm gặp X» when X came to her */let m=null;try{m=s===S?(svtSrvMe()?srvM():null)/* law 1: she herself, on the cung-nữ road, is another's servant */:ownerOf(s)}catch(e){}const A=svtWho(a);if(!m||!A||m===A||svtHouse(a)===m)return"";
 try{if(typeof sameHouse==="function"&&sameHouse(svtHouse(a),m))return""}catch(e){}if(svtGuest(A,m))return"";
 const k=svtId(a)+"|"+(typeof j95key==="function"?j95key():"");if(s.svtK===k+"|"+kind)return"";s.svtK=k+"|"+kind;/* one effect per asker, servant, kind and buổi (wrappers never stack) */
 SVT.stat.touch[kind]=(SVT.stat.touch[kind]||0)+1;const B=BAL.svt;let r="";
 let leak=false;if(!SVT_NOLEAK[kind]&&s!==S/* her own tongue is her own choice */&&svtHasSecret(m,s,A)&&roll(svtLeakO(s))){leak=true;s.svtL=m.schemes||0;s.svtD=m.dw||0;SVT.stat.leak++;evA(A,m,B.leak.ev);
  if(A===S)r+=`${s.name} buột miệng kể chuyện trong cung ${m.name}: ${evSg(B.leak.ev)}. `}
 const W=svtSeen(a,m,kind,at,s);
 if(W){SVT.stat.seen++;SVT.stat.how=SVT.stat.how||{};SVT.stat.how[W.how]=(SVT.stat.how[W.how]||0)+1;tinAdd(s,-(B.tin[kind]||B.tin.talk));const rl=B.rel[kind]||B.rel.talk;affAdd(m,A,-rl);if(a!==A)affAdd(m,a,-rl)/* the servant who went behind her too */;
  const how=SVT_HOW[W.how](m,W.w);
  if(s===S)r+=sMv?`${how}: ngươi lén tìm gặp ${svtNm(a).replace(/,$/,"")}; từ đó ${m.name} sinh nghi ngươi. `:`${how}: ${svtNm(a)} lén tìm gặp ngươi; từ đó ${m.name} sinh nghi ngươi. `;
  else if(m===S)r+=sMv?`${how}: ${s.name} lén ${kind==="chat"?"sang bắt chuyện với":"tìm gặp"} ${svtNm(a).replace(/,$/,"")}${leak?", nghe đâu còn lỡ miệng chuyện trong cung ngươi":""}. Từ đó ngươi bắt đầu nghi ${s.name}. `
   :`${how}: ${svtNm(a)} ${SVT_VERB[kind]||"lén tìm gặp"} ${s.name}${kind==="talk"?" ra nói chuyện":""}, ${s.name} không từ chối${leak?", nghe đâu còn lỡ miệng chuyện trong cung ngươi":""}. Từ đó ngươi bắt đầu nghi ${s.name}. `;
  else if(a===S||A===S)r+=sMv?`${how}: ${s.name} tìm gặp ${a===S?"ngươi":svtNm(a).replace(/,$/,"")}; từ đó ${m.name} sinh nghi cả ${a===S?"ngươi":"người ấy"} lẫn ${s.name}. `
   :`${how}: ${a===S?"ngươi":svtNm(a)} tìm gặp ${s.name}; từ đó ${m.name} sinh nghi cả ${a===S?"ngươi":"người ấy"} lẫn ${s.name}. `}
 return r}
/* fix r1 (law 11 + law 1 + OD ~07:58Z «Cùng là cung nữ … ít nhất cũng phải chạy lại chào hỏi cái vị chủ tử đó»): servant ↔ servant ACROSS houses — her
   cung-nữ road (j42 srvStaffAct + place card «sv»), the NPC servants' own Đồng liêu acts (jagstaff chat / gift / ask) — one call: the greeting rule for an
   open act (always, whatever the outcome), then svTouch when the colleague engaged (ok). A talk is two-way: each servant's master may come to know. */
/* d-followups-1 (law 1, OD ~07:58Z «ít nhất cũng phải chạy lại chào hỏi cái vị chủ tử đó»): an NPC servant greets the other master first, the same act as
   her «Hành lễ thỉnh an» (j42 / jagstaff greet: trSrvGreet gain + the greeting of this buổi, svtMet) — or skips it and the open act is bất kính (svtEtq), the
   ONE rule for her and every NPC. Her own greeting is her choice (her greet card); an NPC's is its nết (BAL.svt.npcGreet) inside its own tick. */
function svtGreetDo(a,v){try{const gN=typeof trSrvGreet==="function"?trSrvGreet(v):0;if(gN)affAdd(v,a,gN)}catch(e){}svtMet(a,v)}
function svtNpcGreetO(s){const B=BAL.svt.npcGreet;return Math.round(Math.max(B.min,Math.min(B.max,B.base+nq(s,"talk",B.talk)+nq(s,"loyal",B.loyal)+nq(s,"timid",B.timid))))}
function svtNpcGreet(a,o,at){if(!a||a===S||!o||!svtNear(a,o,at)||svtGreeted(a,o))return;if(roll(svtNpcGreetO(a))){if(svtIsSv(a))svtGreetDo(a,o);else{try{greetName(a,o)}catch(e){}svtMet(a,o)}/* an NPC mistress greets with the ONE greeting function (jgreet) */SVT.stat.npcGreet=(SVT.stat.npcGreet||0)+1}else SVT.stat.npcSkip=(SVT.stat.npcSkip||0)+1}
function svtPeer(a,x,kind,ok,at){if(!SVT.on()||!a||!x||a===x)return"";let o=null;try{o=x===S?(svtSrvMe()?srvM():null):ownerOf(x)}catch(e){}const h=svtHouse(a);if(!o||!h||o===h)return"";
 try{if(typeof sameHouse==="function"&&sameHouse(h,o))return""}catch(e){}if(svtGuest(svtWho(a),o))return"";SVT.stat.peer=(SVT.stat.peer||0)+1;
 svtNpcGreet(a,o,at);let r=svtEtq(a,o,x,at);if(!ok)return r;r+=svTouch(a,x,kind,at,a);if(kind==="chat")r+=svTouch(x,a,kind,at,a)/* she talked back: her own master may hear of it too; a is still the one who came (mv) */;return r}
/* svTalk: the OPEN talk («Hỏi chuyện» with a servant of another house) — her button and the NPC's monthly deed are this one function */
function svTalk(a,s){if(!SVT.on()||!a||!s)return"";let m=null;try{m=ownerOf(s)}catch(e){}if(!m||m===a)return"";if(svtGuest(a,m))return"";SVT.stat.talk++;
 svtNpcGreet(a,m);let r=svtEtq(a,m,s);
 if(roll(svtRefO(s))){SVT.stat.refuse++;/* refused: nothing changes (OD ~08:12Z «nếu như mà họ từ chối thì mình ok, không có gì hết») */
  return r+(a===S?`${s.name} cúi đầu thưa: phận tôi tớ cung ${m.name}, không dám nói chuyện riêng với người cung khác. `:"")}
 if(a===S){let t="";try{t=learnTrait(m,`${s.name} kể`,1)}catch(e){}r+=t?`${s.name} chịu nói chuyện, kể rằng chủ tử ${m.name} là người ${String(t).toLowerCase()}. `:`${s.name} chịu nói chuyện, nhưng chỉ kể những chuyện ai cũng biết. `}
 return r+svTouch(a,s,"talk")}
/* the wrappers: the whole family reaches svTouch only when the servant really engaged (spyFor set by THIS act) */
function svtWrap(f,kind){return function(a,s){const b=s&&s.spyFor;const r=f.apply(this,arguments);
  try{if(s&&a&&s.spyFor===key(a)&&b!==key(a)){const x=svTouch(a,s,kind);if(x)return (r||"")+x}}catch(e){}return r}}
if(typeof bribeServ==="function")bribeServ=svtWrap(bribeServ,"bribe");if(typeof threatServ==="function")threatServ=svtWrap(threatServ,"threat");if(typeof tmTake==="function")tmTake=svtWrap(tmTake,"tm");
/* greetName (jgreet: every greeting site): a greeting of this buổi is remembered both ways */
(function(){if(typeof greetName!=="function")return;const g0=greetName;greetName=function(a,b){const r=g0.apply(this,arguments);try{const G=svtGz();G[svtId(a)+">"+svtId(b)]=1;G[svtId(b)+">"+svtId(a)]=1}catch(e){}return r}})();
/* review r2 (OD ~07:58Z «mình là chủ tử thì mình muốn hỏi điều một vị cung nữ nào đó thì ít nhất mình cũng phải hỏi chuyện cái người chủ tử»): a face-to-face
   talk with the master this buổi (j9 chatMark: her talk acts, a visitor's acts on her; jagacts3 p3ChatMark: the talk topics, NPC ↔ NPC too) counts as having greeted her, both ways — before, only greetName did,
   so a master she already knew could never be greeted again and the open talk with her servant was always bất kính */
function svtMet(a,b){try{if(!a||!b||a===b)return;const G=svtGz(),x=svtId(a),y=svtId(b);if(x&&y){G[x+">"+y]=1;G[y+">"+x]=1}}catch(e){}}
(function(){if(typeof chatMark==="function"){const c0=chatMark;chatMark=function(v){const r=c0.apply(this,arguments);svtMet(S,v);return r}}
 if(typeof p3ChatMark==="function"){const p0=p3ChatMark;p3ChatMark=function(p,v){const r=p0.apply(this,arguments);svtMet(p,v);return r}}/* the four talk topics (jagacts3 P3T: her ↔ NPC and NPC ↔ NPC, law 1) */})();
/* the month: NPC mistresses have someone of another house talked to (law 1: her, the NPCs, NPC ↔ NPC); an NPC master returns the servant she no longer trusts */
function svtMonth(){if(!SVT.on())return"";let ev="";const B=BAL.svt;let G=false;try{G=typeof mlGuest==="function"&&mlGuest()}catch(e){}
 for(const p of liveRivals(true)){if(!p||!p.alive||p.out)continue;
  if(roll(B.npc.talk)){const t=pickTarget(p);
   /* fix r1 law 1: on the cung-nữ road SHE is one of her master's servants — the NPC (or a servant the NPC sends, servant ↔ servant) asks HER too */
   if(!G&&svtSrvMe()&&t&&t===srvM()&&t!==p&&!S.dead&&R((t.staff||[]).length+1)===0){const sv=(p.staff||[]).filter(x=>!x.out);const a=sv.length&&roll(B.npc.srvAsk)?pick(sv):null;
    if(!(typeof Q!=="undefined"&&Q.some(q=>q&&q.pid==="svtAsk"))){try{pushDil(mkP("svtAsk",a?{s:a.sid}:{r:p.id}));SVT.stat.askMe=(SVT.stat.askMe||0)+1}catch(e){}}}
   else if(t&&t!==p&&(t===S||!G)&&t.staff&&t.staff.length){const s=pick(t.staff);if(s&&s.spyFor!==key(p)){const x=svTalk(p,s);if(t===S&&x)ev+=x}}}
  if(G)continue;for(const s of (p.staff||[]).slice()){let t=100;try{t=tinOf(s)}catch(e){}if(t<B.tin.out&&!s.spyFor&&roll(B.tin.outRoll)){try{servDo(p,"doi",s);SVT.stat.out++}catch(e){}}}}
 return ev}
/* fix r1 (law 1, two-way): «Hỏi chuyện» reaches HER on the cung-nữ road — the same act she does to others' servants. Her choice (no refusal roll for her):
   talk = the asker likes her, she learns something of that palace to tell her master; the asker's bất kính toward her master and her master's suspicion
   come only after, through the same svtEtq / svTouch (witness rule). Refuse = nothing changes (OD ~08:12Z). The ONE dilemma card (j3 pushDil, kit). */
if(typeof PEND==="object")PEND.svtAsk=pp=>{if(!svtSrvMe()||S.dead)return null;const m=srvM();const a=pp.s!=null?servById(pp.s):RV(pp.r);if(!m||!a||(a.alive===false)||svtHouse(a)===m)return null;
 const A=svtWho(a);const who=svtIsSv(a)?`${a.name}, ${srkName(a).toLowerCase()} của ${A.name},`:`${rkName(a)} ${a.name}`;
 return{t:`<p>${who} tìm đến bắt chuyện với ngươi, hỏi han chuyện trong cung ${m.name}.</p>`,who:svtIsSv(a)?pServ(a):pv(a),o:[
  {n:"Trò chuyện",fx:{},x:"được: người ấy quý ngươi, biết thêm chuyện cung bên ấy để bẩm chủ",go:()=>{let r="";
    if(svtIsSv(a)){srvAf(a,SRVA.chat.af);if(!(S.srv.met||[]).includes(a.sid))(S.srv.met=S.srv.met||[]).push(a.sid);r=svtPeer(a,S,"chat",true)}
    else{affAdd(a,S,SRVA.chat.af);r=svtEtq(a,m,S)+svTouch(a,S,"talk")}
    S.srv.intel=(S.srv.intel||[]).concat([A.id]);log(`Ngươi trò chuyện cùng ${a.name}, nghe được chuyện trong cung ${A.name}: có tin để bẩm chủ.${r?" "+r:""}`)}},
  {n:"Cúi đầu từ chối",fx:{},x:"giữ phận",go:()=>{const r=svtEtq(a,m,S);log(`Ngươi cúi đầu thưa: phận tôi tớ cung ${m.name}, không dám nói chuyện riêng.${r?" "+r:""}`)}}]}};
(function(){if(typeof servMonth!=="function")return;const m0=servMonth;servMonth=function(){let ev=m0.apply(this,arguments)||"";try{ev+=svtMonth()}catch(e){}return ev}})();
Object.assign(window,{SVT,svTouch,svTalk,svtPeer,svtGreetDo,svtNpcGreet,svtNpcGreetO,svtSeen,svtHouse,svtWrap,svtRefO,svtSeenO,svtLeakO,svtEtq,svtMonth,svtNear});
