
/* ================= jmoodknow: NGUYÊN DO TÂM TRẠNG — who knows WHY a person feels so (owner OD 17/11 ~17:55Z item (1)) =================
   Owner: the mood seal is seen by anyone who SEES the person; the CAUSE shows only when she KNOWS it, else "Nguyên do chưa rõ".
   Palace facts behind a mood are of two kinds (class stamped on p.emo.c / emoH[i].c when the cause is set; old saves: by the cause words):
     PUBLIC  (pub) — announced or seen by the whole palace (tấn phong, giáng, lãnh cung, cấm túc, sinh hạ, mất con, qua đời, thị tẩm,
                     lạnh nhạt, ốm, việc triều …): everyone knows it ONCE it leaks into the morning "Tin trong cung" by odds
                     (BAL.mck.pub, clamped BAL.odds.lo/hi; at most BAL.mck.pub.max lines a morning).
     SECRET (sec) — private (bị ai làm nhục, được ai đối đãi tử tế, lòng của người hầu, chuyện riêng …): learned only by
                     scouting / her servants' true reports / info sellers (the j78 "mood" fact: intelLearn / knSellGive → intelAdd),
                     a Tai mắt inside that person's household (taiMatRaw, odds BAL.mck.spy), or her general eyes each morning
                     (oSee × BAL.mck.eye / 100, the knFor rule (b)).
   Always known: one's own mood; a cause that involves the knower (aimed at her / names her); one's own people (k61Own / own staff, kids).
   ONE rule for her and every consort (moodCauseKnownBy(x, pid)); NPC stores x.mck, hers S.mck, public leaks S.mckPub (old saves: lazy).
   Always TRUE: the text returned is the person's real recorded cause (p.emo.why) — never invented, never stale (keyed by mood + cause).
   API (for the kit seal popover / mood box; no UI here): moodCauseKnown(pid) → cause text | null (null → the kit shows "Nguyên do chưa rõ").
   Every existing cause display now goes through it: kitEmotion().why (seal popover, KIT 31), emoCauses (mood box rows, jevb),
   emoBoxArt caption / emoCauseArt picture (jevb, jpcf card). Off switch for measuring: window.__mckOff = 1 (old behaviour).
   ===================================================================================================================== */
const MCK_UNK="Nguyên do chưa rõ";
const MCK={ev:null,stat:{leak:0,spy:0,eye:0,intel:0,npcErr:0,buy:0}};
function mckB(){return BAL.mck}
function mckOn(){try{return !!(typeof S!=="undefined"&&S&&BAL.mck&&typeof emoOn==="function"&&emoOn()&&!window.__mckOff)}catch(e){return false}}
function mckSig(k,why){return k+"|"+String(why||"").slice(0,90)}
function mckCls(x){if(!x)return"sec";if(x.c)return x.c;const B=mckB();if(x.e)return B.pubEv.includes(x.e)?"pub":"sec";return new RegExp(B.pubRe,"i").test(x.why||"")?"pub":"sec"}
function mckOdds(o){return cl(Math.round(+o||0),BAL.odds.lo,BAL.odds.hi)}
function mckHit(tag,o){try{return knHit("mck|"+tag,mckOdds(o))}catch(e){return false}}
/* ---------- stamp the class when a cause is set (emoEv passes its event key; direct emoSet: by the cause words) ---------- */
(function(){if(typeof emoEv!=="function")return;const e0=emoEv;emoEv=function(p,ev){const o=MCK.ev;MCK.ev=ev;try{return e0.apply(this,arguments)}finally{MCK.ev=o}}})();
(function(){if(typeof emoSet!=="function")return;const s0=emoSet;emoSet=function(p,k,v,why,t){let q=null,b=null,bw,bk;try{q=emoRes(p);b=q&&q.emo;bw=b&&b.why;bk=b&&b.k}catch(e){}
 const r=s0.apply(this,arguments);try{if(!q||!why)return r;const ev=MCK.ev||null;const c=mckCls({e:ev,why});const e=q.emo;
  if(e&&(e!==b||e.why!==bw||e.k!==bk)&&e.why===why){e.e=ev;e.c=c}
  const h=q.emoH&&q.emoH[0];if(h&&h.why===String(why).slice(0,90)&&h.k===k&&!h.c){h.c=c;if(ev)h.e=ev}}catch(x){}return r}})();
/* ---------- the rule ---------- */
function mckStore(x){if(x===S){S.mck=S.mck||{};return S.mck}x.mck=x.mck||{};return x.mck}
function mckHas(x,k,sig){const M=(x===S?S.mck:x&&x.mck)||{};return !!(M[k]&&M[k].includes(sig))}
function mckLearn(x,p,by,sig){if(!x||!p||!sig)return;const M=mckStore(x),k=emoKey(p);const L=M[k]=(M[k]||[]).filter(s=>s!==sig);L.unshift(sig);if(L.length>mckB().keep)L.length=mckB().keep;MCK.stat[by]=(MCK.stat[by]||0)+1}
function mckPubHas(k,sig){const P=S.mckPub||{};return !!(P[k]&&P[k].includes(sig))}
function mckOwn(x,p){try{if(x===S)return typeof k61Own==="function"?!!k61Own(p):false;return (x.staff||[]).includes(p)||x.maid===p||(x.kids||[]).includes(p)}catch(e){return false}}
/* the cause involves the knower: aimed at her (t), or names her ("ngươi" / her name in her own cause words) */
function mckIn(x,c){const kx=emoKey(x);if(c.t!=null&&String(c.t)===kx)return true;const w=String(c.why||"");if(x===S)return /ngươi/.test(w)||(!!S.name&&w.includes(S.name));return !!(x.name&&w.includes(x.name))}
function mckSpy(x,p){try{return taiMatRaw(x).some(s=>ownerOf(s)===p)}catch(e){return false}}
function mckKnows(x,p,c){if(!x||!p||!c||!c.why)return false;if(p===x)return true;const k=emoKey(p),sig=mckSig(c.k,c.why);
 if(mckHas(x,k,sig)||mckIn(x,c)||mckOwn(x,p))return true;
 if(mckCls(c)==="pub"&&mckPubHas(k,sig))return true;
 if(mckSpy(x,p)&&mckHit("spy|"+emoKey(x)+"|"+k+"|"+sig,mckB().spy)){mckLearn(x,p,"spy",sig);return true}
 return false}
function mckRes(pid){try{if(pid==null)return null;if(typeof pid==="object")return emoRes(pid);return emoByKey(String(pid))}catch(e){return null}}
/* PUBLIC API: the cause of pid's mood as x knows it → text | null */
function moodCauseKnownBy(x,pid){try{if(!S||!x)return null;const p=mckRes(pid);if(!p)return null;const e=emoGet(p);if(!e||e.k==="binh"||!e.why)return null;
 if(!mckOn())return e.why;return mckKnows(x,p,e)?e.why:null}catch(er){return null}}
function moodCauseKnown(pid){return moodCauseKnownBy(typeof S!=="undefined"?S:null,pid)}
window.moodCauseKnown=moodCauseKnown;window.moodCauseKnownBy=moodCauseKnownBy;
/* ---------- the morning: public leaks (one draw per cause per day) + general eyes, for her and every consort ---------- */
function mckPeople(){const L=[];try{for(const v of rivals||[])if(v&&v.alive)L.push(v)}catch(e){}if(S.emp)L.push(S.emp);if(!S.thDead&&S.thO)L.push(S.thO);return L}
function mckWho(p){try{if(p===S.emp)return"Hoàng thượng";if(p===S.thO)return"Thái hậu";return j78Who(p)}catch(e){return emoName(p)}}
function mckLeak(){const B=mckB().pub,W=emoW(),out=[];S.mckPub=S.mckPub||{};
 for(const p of mckPeople()){if(out.length>=B.max)break;const e=emoGet(p);if(e.k==="binh"||!e.why||mckCls(e)!=="pub")continue;const k=emoKey(p),sig=mckSig(e.k,e.why);if(mckPubHas(k,sig))continue;
  const o=B.o[e.e]!=null?B.o[e.e]:B.def;if(!mckHit("pub|"+k+"|"+sig+"|"+W,o))continue;
  const L=S.mckPub[k]=(S.mckPub[k]||[]);L.unshift(sig);if(L.length>mckB().keep)L.length=mckB().keep;MCK.stat.leak++;
  if(!mckIn(S,e)&&p!==S)out.push(`Trong cung truyền tai nhau: ${mckWho(p)} đang ${EMO[e.k].toLowerCase()}, vì ${e.why}.`)}
 return out}
function mckEyes(){const W=emoW(),P=mckPeople();const K=[S];try{for(const v of liveRivals(true))if(v&&v.alive&&!v.out)K.push(v)}catch(e){}
 for(const x of K){let o=0;try{o=oSee(x,false)*mckB().eye/100}catch(e){}if(!(o>0))continue;const kx=emoKey(x);
  for(const p of P){if(p===x)continue;const e=emoGet(p);if(e.k==="binh"||!e.why)continue;const sig=mckSig(e.k,e.why);if(mckKnows(x,p,e))continue;
   if(mckHit("eye|"+kx+"|"+emoKey(p)+"|"+sig+"|"+W,o))mckLearn(x,p,"eye",sig)}}}
/* keep only causes still on the person (current mood or the mood box history) */
function mckPrune(M){if(!M)return;for(const k of Object.keys(M)){const p=emoByKey(k);if(!p){if(!/^(me|emp|th|\d+|s\d+)$/.test(k))continue;delete M[k];continue}
  const ok=new Set();const e=p.emo;if(e&&e.why)ok.add(mckSig(e.k,e.why));for(const h of p.emoH||[])ok.add(mckSig(h.k,h.why));M[k]=M[k].filter(s=>ok.has(s));if(!M[k].length)delete M[k]}}
function mckMorning(){if(!mckOn()||!S||S.dead)return;let L=[];try{L=mckLeak()}catch(e){console.error("mckLeak",e)}try{mckEyes()}catch(e){console.error("mckEyes",e)}
 try{mckPrune(S.mck);mckPrune(S.mckPub);for(const v of rivals||[])if(v&&v.mck)mckPrune(v.mck)}catch(e){}
 if(!L.length)return;const line=L.join(" ");try{log(line)}catch(e){}
 try{const m=Q.find(x=>x&&/^Tin trong cung/.test(x.t||"")&&typeof x.h==="string");if(m)m.h+=`<p>${line}</p>`;else Q.push({t:"Tin trong cung buổi này",kind:"news",h:`<p class="past">${when()}</p><p>${line}</p>`})}catch(e){}}
(function(){if(typeof endTurn!=="function")return;const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{mckMorning()}catch(e){console.error(e)}return r}})();
/* ---------- the knowing routes that already exist ---------- */
/* scouting / servants' reports / info sellers: the mood cause is one more TRUE j78 fact about a consort (picked by intelLearn, sold by knSellNews) */
(function(){if(typeof j78facts!=="function")return;const f0=j78facts;j78facts=function(v){const F=f0.apply(this,arguments);try{if(!mckOn()||!v||v===S)return F;const e=emoGet(v);if(e.k==="binh"||!e.why)return F;
  const sig=mckSig(e.k,e.why);if(mckHas(S,emoKey(v),sig))return F;F.push({k:"mood",kind:"mood",pri:mckB().pri,sig,txt:`${j78Who(v)} đang ${EMO[e.k].toLowerCase()}, vì ${e.why}.`})}catch(x){}return F}})();
(function(){if(typeof intelAdd!=="function")return;const a0=intelAdd;intelAdd=function(v,f){const r=a0.apply(this,arguments);try{if(f&&f.kind==="mood"&&f.sig&&v)mckLearn(S,v,"intel",f.sig)}catch(e){}return r}})();
/* an NPC buyer of the mood fact learns it the same way */
(function(){if(typeof knSellGive!=="function")return;const g0=knSellGive;knSellGive=function(x,s,n){const r=g0.apply(this,arguments);try{if(x&&x!==S&&n&&n.f&&n.f.kind==="mood"&&n.f.sig&&n.about)mckLearn(x,n.about,"buy",n.f.sig)}catch(e){}return r}})();
/* an NPC master's servant comes back from a told errand about t: the master learns t's mood cause (scouting brings it, listening by odds) */
(function(){if(typeof knErrGive!=="function")return;const g0=knErrGive;knErrGive=function(s,m,k,t){const r=g0.apply(this,arguments);try{if(!mckOn()||!m||m===S||!t||(k!=="scout"&&k!=="listen"))return r;const e=emoGet(t);if(e.k==="binh"||!e.why)return r;
  const sig=mckSig(e.k,e.why);if(mckHit("err|"+emoKey(m)+"|"+emoKey(t)+"|"+sig+"|"+(s&&s.sid),mckB().npcErr[k]))mckLearn(m,t,"npcErr",sig)}catch(x){}return r}})();
/* ---------- every cause display reads the rule (seal popover, mood box rows, picture, pcf card) ---------- */
(function(){const k0=window.kitEmotion;if(typeof k0!=="function")return;window.kitEmotion=function(p){const m=k0.apply(this,arguments);try{if(!m||!m.known||!mckOn())return m;const q=emoRes(p);if(!q)return m;
  if(q===S)return Object.assign({},m,{cause:m.why||null,causeKnown:!!m.why});const e=emoGet(q);const c=e.k===m.k?moodCauseKnown(q):null;
  return Object.assign({},m,{why:c||"",cause:c,causeKnown:!!c})}catch(x){return m}}})();
(function(){if(typeof emoCauses!=="function")return;const c0=emoCauses;emoCauses=function(p){const L=c0.apply(this,arguments);try{const q=emoRes(p);if(!mckOn()||!q||q===S)return L;const e=q.emo,seen=new Set(),out=[];
  for(const x of L){const cur=e&&mckSig(e.k,e.why)===mckSig(x.k,x.why)?Object.assign({},x,{t:e.t,e:e.e,c:e.c}):x;
   if(mckKnows(S,q,cur)){out.push(x);continue}const u=x.k+"|"+x.w;if(seen.has(u))continue;seen.add(u);out.push({k:x.k,v:x.v,w:x.w,why:MCK_UNK,unk:1})}
  return out}catch(x){return L}};window.emoCauses=emoCauses})();
(function(){if(typeof emoCauseArt!=="function")return;const a0=emoCauseArt;emoCauseArt=function(c){if(c&&c.unk)return"";return a0.apply(this,arguments)};window.emoCauseArt=emoCauseArt})();
window.mckStat=()=>Object.assign({},MCK.stat);
