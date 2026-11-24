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
function svtId(p){return p===S?"me":p&&p.id!=null?"v"+p.id:null}
function svtGuest(a,m){try{return typeof mlGuest==="function"&&mlGuest()&&a!==S&&m!==S}catch(e){return false}}
/* the odds the servant refuses an open talk (law 4: BAL.svt.ref; her nết by netQ, the same table as every servant act) */
function svtRefO(s){const B=BAL.svt.ref;let tin=B.mid;try{tin=tinOf(s)}catch(e){}
 const v=B.base+((s.loyal||0)-B.mid)*B.loyK+(tin-B.mid)*B.tinK+nq(s,"loyal",B.loyal)+nq(s,"timid",B.timid)+nq(s,"talk",B.talk)+nq(s,"greed",B.greed);
 return Math.round(Math.max(B.min,Math.min(B.max,v)))}
function svtNear(a,m){try{const kh=j95kh(),ia=svtId(a),im=svtId(m);if(!ia||!im||typeof knAt!=="function")return false;const x=knAt(ia,kh),y=knAt(im,kh);return !!x&&x===y}catch(e){return false}}
const SVT_COVERT={bribe:1,threat:1,tm:1,plot:1,friend:1};
function svtSeenO(a,m,kind){const B=BAL.svt.seen;return Math.round(Math.max(0,Math.min(100,B.base+eyes(m)*B.eye+(svtNear(a,m)?B.near:0)-(SVT_COVERT[kind]?B.covert:0))))}
function svtLeakO(s){const B=BAL.svt.leak;return Math.round(Math.max(0,Math.min(100,B.base+(100-(s.loyal||0))*B.loyK+nq(s,"talk",B.talk)+nq(s,"greed",B.greed)+nq(s,"loyal",B.loyal))))}
/* a REAL secret to let slip (law 6a): schemes since this servant's last slip, or a tư tình */
function svtHasSecret(m,s,A){const nw=(m.schemes||0)>(s.svtL||0)||(m.dw||0)>(s.svtD||0)||!!m.affair;if(!nw)return false;try{if(typeof deedCap==="function"&&deedCap(m)<=evG(A,m))return false/* jtruth: proof only up to the real deeds */}catch(e){}return true}
/* greetings of this buổi (jgreet greetName is the ONE greeting function: wrapped below) */
function svtGz(){const k=j95key();if(!S.svtG||S.svtG.k!==k)S.svtG={k,g:{}};return S.svtG.g}
function svtGreeted(a,m){try{return !!svtGz()[svtId(a)+">"+svtId(m)]}catch(e){return true}}
/* BẤT KÍNH (OD ~07:58Z): speaking straight to the servant of a master who stands right there, without greeting her first */
function svtEtq(a,m,s){if(!svtNear(a,m)||svtGreeted(a,m))return"";const B=BAL.svt.greet;const d=rkOf(m)-rkOf(a),k=d>0?B.up:d<0?B.dn:1;
 oanAdd(m,a,Math.round(B.oan*k));affAdd(m,a,-Math.round(B.aff*k));SVT.stat.greet++;
 if(a===S)return `${m.name} đứng ngay đó mà ngươi không chào, lại gọi thẳng ${s.name} — ${m.name} cho là ngươi bất kính. `;
 if(m===S)return `${a.name} chẳng chào ngươi một tiếng mà gọi thẳng ${s.name} — thật là bất kính. `;return""}
/* svTouch: the servant DID engage (talked / took the bạc / took the threat / became eyes): her master may come to know; the servant may let slip */
function svTouch(a,s,kind){if(!SVT.on()||!a||!s)return"";let m=null;try{m=s===S?(typeof isSrv==="function"&&isSrv()?srvM():null)/* law 1: she herself, on the cung-nữ road, is another's servant */:ownerOf(s)}catch(e){}const A=svtWho(a);if(!m||!A||m===A)return"";
 try{if(typeof sameHouse==="function"&&sameHouse(A,m))return""}catch(e){}if(svtGuest(A,m))return"";
 const k=svtId(A)+"|"+(typeof j95key==="function"?j95key():"");if(s.svtK===k+"|"+kind)return"";s.svtK=k+"|"+kind;/* one effect per asker, servant, kind and buổi (wrappers never stack) */
 SVT.stat.touch[kind]=(SVT.stat.touch[kind]||0)+1;const B=BAL.svt;let r="";
 let leak=false;if(kind!=="friend"/* the friend talk already carries its own chứng cứ (j10 servMonth) */&&s!==S/* her own tongue is her own choice */&&svtHasSecret(m,s,A)&&roll(svtLeakO(s))){leak=true;s.svtL=m.schemes||0;s.svtD=m.dw||0;SVT.stat.leak++;evA(A,m,B.leak.ev);
  if(A===S)r+=`${s.name} buột miệng kể chuyện trong cung ${m.name}: ${evSg(B.leak.ev)}. `}
 if(roll(svtSeenO(A,m,kind))){SVT.stat.seen++;tinAdd(s,-(B.tin[kind]||B.tin.talk));affAdd(m,A,-(B.rel[kind]||B.rel.talk));
  if(s===S)r+=`${m.name} hay tin ${A.name} lén tìm gặp ngươi; từ đó chủ tử sinh nghi ngươi. `;
  else if(m===S)r+=`Có kẻ bẩm: ${A.name} ${kind==="friend"?"cho người hầu kết thân với":kind==="talk"?"kéo riêng":"lén tìm gặp"} ${s.name}${kind==="talk"?" ra nói chuyện":""}, ${s.name} không từ chối${leak?", nghe đâu còn lỡ miệng chuyện trong cung ngươi":""}. Từ đó ngươi bắt đầu nghi ${s.name}. `;
  else if(A===S)r+=`${m.name} hay tin ngươi tìm gặp ${s.name}; từ đó nàng sinh nghi cả ngươi lẫn ${s.name}. `}
 return r}
/* svTalk: the OPEN talk («Hỏi chuyện» with a servant of another house) — her button and the NPC's monthly deed are this one function */
function svTalk(a,s){if(!SVT.on()||!a||!s)return"";let m=null;try{m=ownerOf(s)}catch(e){}if(!m||m===a)return"";if(svtGuest(a,m))return"";SVT.stat.talk++;
 let r=svtEtq(a,m,s);
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
/* the month: NPC mistresses have someone of another house talked to (law 1: her, the NPCs, NPC ↔ NPC); an NPC master returns the servant she no longer trusts */
function svtMonth(){if(!SVT.on())return"";let ev="";const B=BAL.svt;let G=false;try{G=typeof mlGuest==="function"&&mlGuest()}catch(e){}
 for(const p of liveRivals(true)){if(!p||!p.alive||p.out)continue;
  if(roll(B.npc.talk)){const t=pickTarget(p);if(t&&t!==p&&(t===S||!G)&&t.staff&&t.staff.length){const s=pick(t.staff);if(s&&s.spyFor!==key(p)){const x=svTalk(p,s);if(t===S&&x)ev+=x}}}
  if(G)continue;for(const s of (p.staff||[]).slice()){let t=100;try{t=tinOf(s)}catch(e){}if(t<B.tin.out&&!s.spyFor&&roll(B.tin.outRoll)){try{servDo(p,"doi",s);SVT.stat.out++}catch(e){}}}}
 return ev}
(function(){if(typeof servMonth!=="function")return;const m0=servMonth;servMonth=function(){let ev=m0.apply(this,arguments)||"";try{ev+=svtMonth()}catch(e){}return ev}})();
Object.assign(window,{SVT,svTouch,svTalk,svtWrap,svtRefO,svtSeenO,svtLeakO,svtEtq,svtMonth,svtNear});
