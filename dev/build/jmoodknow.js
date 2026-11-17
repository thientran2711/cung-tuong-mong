
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
/* ================= MOODLETS — THE SIMS MODEL (owner OD 17/11 ~18:10Z, s35 Lượt 22: "Mấy cái thời gian phai ... tính trong khắc ... ok, quyết định làm theo đồ sim đi") =================
   The EXISTING cause lists are converted (not rebuilt): every person's causes live in p.mk = [{kd merge key, k feeling | null, s strength, d her bar push,
   why, e event, c class, t aimed at, a picture, k0 start khắc, k1 end khắc, w start day, n}] — jemo emoSet (every feeling, everyone), jmood mbAdd (her bar
   pushes: acts, rest, needs, comfort, venting) both write here. Timer = khắc on her clock (mkNow = day × khắc a day + buổi × J95.KH + khắc), length per
   cause kind in BAL.mood2.dur (event key → feeling → bar kind → def). The 20 %-a-tuần decay is GONE (EMO_DECAY → nothing; jmood bar has no drift):
   a cause just ends when its khắc run out. The SEAL (p.emo, read by every old consumer) = the strongest SUMMED feeling among active causes; her bar
   S.mood.v = the sum of active bar pushes; tap lists = active causes with "còn N khắc" (cause text only if moodCauseKnown). NPCs: the same list and rule.
   Other code that lowers / clears p.emo (venting acts, legacy Emperor / Thái hậu bars) is read back: a lowered feeling scales its causes, a cleared one ends them.
   Old saves: emoH / S.mood.log entries (day stamps) → causes with k0 = day × khắc a day; the old current feeling keeps at least half its time; the
   leftover of the old bar becomes one "chuyện cũ còn vương" cause (BAL.mood2.carry). Off switch: window.__mkOff = 1. API: sealKeyFor(pid). */
const MK={at:-1,stat:{add:0,end:0,mig:0,scale:0,drop:0}};
function mkB(){return BAL.mood2}
function mkOn(){try{return !!(typeof S!=="undefined"&&S&&BAL.mood2&&!window.__mkOff)}catch(e){return false}}
function mkKD(){try{return BUOI.length*J95.KH}catch(e){return mkB().kd}}
function mkNow(){let kh=0;try{kh=agKh()}catch(e){}let w=0;try{w=wk()}catch(e){}return w*mkKD()+(S.buoi||0)*J95.KH+kh}
function mkDur(e,k,kd){const D=mkB().dur;if(e&&D.e[e]!=null)return D.e[e];if(k&&D.k[k]!=null)return D.k[k];const b=String(kd||"").split(":")[0];if(b&&D.bar[b]!=null)return D.bar[b];return mkB().def}
function mkAdd(p,o,dur){if(!p)return null;p.mk=p.mk||[];const now=mkNow();let x=p.mk.find(m=>m.kd===o.kd&&m.k1>now);MK.stat.add++;
 if(x){if(o.s!=null)x.s=Math.max(x.s||0,o.s);if(o.d){x.d=(x.d||0)+o.d;x.n=(x.n||1)+1;if(o.why&&x.why&&x.why.indexOf(o.why)<0&&x.why.length<70&&!x.k)x.why+=", "+o.why}
  for(const f of ["k","e","c","t","a"])if(o[f]!=null)x[f]=o[f];if(o.why&&x.k&&o.k)x.why=o.why;x.k1=Math.max(x.k1,now+dur);x.at=now}
 else{x=Object.assign({n:1},o,{k0:now,k1:now+dur,w:emoW(),at:now});p.mk.push(x)}
 if(p.mk.length>mkB().max){p.mk=p.mk.filter(m=>m.k1>now);p.mk.sort((a,b)=>(Math.abs(b.s||0)+Math.abs(b.d||0))-(Math.abs(a.s||0)+Math.abs(a.d||0)));p.mk.length=Math.min(p.mk.length,mkB().max)}
 return x}
/* old saves / first sight: day-stamped lists → khắc timers */
function mkMigrate(p){p.mk=[];const KD=mkKD(),now=mkNow();MK.stat.mig++;
 for(const h of p.emoH||[]){if(!h||!EMO[h.k]||!h.why)continue;const k0=(h.w||0)*KD,k1=k0+mkDur(h.e,h.k);if(k1>now)p.mk.push({kd:"e:"+h.why,k:h.k,s:h.v||0,why:h.why,e:h.e,c:h.c,a:h.a,k0,k1,w:h.w||0,n:1})}
 const e=p.emo;if(e&&EMO[e.k]&&e.v>0&&!e.mk){const d=mkDur(e.e,e.k),k0=Math.max((e.w||0)*KD,now-Math.floor(d/2));const kd="e:"+(e.why||e.k);const x=p.mk.find(m=>m.kd===kd);
  if(x){x.s=Math.max(x.s,e.v);x.k1=Math.max(x.k1,k0+d);x.t=e.t}else p.mk.push({kd,k:e.k,s:e.v,why:e.why||"",e:e.e,c:e.c,t:e.t,k0,k1:k0+d,w:e.w||0,n:1})}
 if(p===S&&S.mood&&typeof S.mood.v==="number"&&!S.mood.mk){const M=S.mood;M.mk=1;for(const l of M.log||[]){if(!l||!l.d)continue;const k0=(l.w||0)*KD,k1=k0+mkDur(null,null,l.k);if(k1<=now)continue;
   const kd=l.k&&String(l.k).indexOf("e:")===0?l.k:l.k||"x";const x=p.mk.find(m=>m.kd===kd);if(x)x.d=(x.d||0)+l.d;else p.mk.push({kd,k:null,s:0,d:l.d,why:l.why||"",k0,k1,w:l.w||0,n:l.n||1})}
  const sum=p.mk.reduce((a,m)=>a+(m.d||0),0),rest=Math.round(M.v-sum);if(rest)p.mk.push({kd:"carry",k:null,s:0,d:rest,why:mkB().carryWhy,k0:now,k1:now+mkB().carry,w:emoW(),n:1})}}
function mkSync(p){if(!mkOn()||!p)return;if(!Array.isArray(p.mk))mkMigrate(p);const now=mkNow();
 /* someone else changed the feeling: read it back */
 const L=p.__mkL,e=p.emo;
 if(e&&!e.mk&&EMO[e.k]&&e.v>0){const d=mkDur(e.e,e.k);mkAdd(p,{kd:"x:"+e.k+":"+(e.why||""),k:e.k,s:Math.round(e.v),why:e.why||"",e:e.e,c:e.c,t:e.t},d)}
 else if(L&&L.k){if(!e){for(const m of p.mk)if(m.k===L.k){m.k1=now;MK.stat.drop++}}
  else if(e.mk&&e.k===L.k&&e.v<L.v&&L.v>0){const r=e.v/L.v;for(const m of p.mk)if(m.k===L.k&&m.k1>now)m.s=Math.round(m.s*r);MK.stat.scale++}}
 const n0=p.mk.length;p.mk=p.mk.filter(m=>m.k1>now);MK.stat.end+=n0-p.mk.length;
 const sum={},top={};let bar=0;for(const m of p.mk){bar+=m.d||0;if(!m.k||!EMO[m.k]||!(m.s>0))continue;sum[m.k]=(sum[m.k]||0)+m.s;if(!top[m.k]||m.s>top[m.k].s)top[m.k]=m}
 let bk=null;for(const k in sum)if(!bk||sum[k]>sum[bk])bk=k;
 if(bk){const t=top[bk];p.emo={k:bk,v:Math.min(100,Math.round(sum[bk])),why:t.why,t:t.t==null?null:t.t,e:t.e,c:t.c,w:t.w,mk:1};p.__mkL={k:bk,v:p.emo.v}}else{p.emo=null;p.__mkL=null}
 if(p===S&&S.mood&&typeof S.mood==="object"){const M=S.mood;M.mk=1;M.v=Math.max(-100,Math.min(100,Math.round(bar)));
  M.log=p.mk.filter(m=>m.d).sort((a,b)=>b.k0-a.k0).map(m=>({w:m.w,k:m.kd,d:Math.round(m.d),why:String(m.why||"").slice(0,80),n:m.n||1,left:m.k1-now}))}
 p.__mkAt=now;try{emoSync(p)}catch(x){}}
/* her bar pushes (jmood mbAdd) → causes; returns the real move of the bar */
function mkBar(d,why,kind){if(!mkOn()||!S||!d)return 0;mkSync(S);const v0=S.mood.v;const kd=kind||why||"x";mkAdd(S,{kd,k:null,d,why:String(why||"").slice(0,80)},mkDur(null,null,kd));S.__mkL=S.emo?{k:S.emo.k,v:S.emo.v}:null;mkSync(S);return S.mood.v-v0}
function mkAll(){const L=[];const add=x=>{if(x&&typeof x==="object"&&(x.mk||x.emo))L.push(x)};try{for(const p of [S].concat(rivals||[])){add(p);for(const s of p.staff||[])add(s);for(const k of p.kids||[])add(k)}}catch(e){}
 add(S.emp);add(S.thO);add(S.maid);try{for(const m of S.men||[])add(m)}catch(e){}try{if(S.court)for(const c in S.court)add(S.court[c])}catch(e){}return L}
function mkTick(){if(!mkOn()||S.dead)return;const now=mkNow();if(MK.at===now)return;MK.at=now;for(const p of mkAll())if(p.__mkAt!==now)mkSync(p)}
/* the active causes of p, strongest first, with khắc left (her mood box / tap list) */
function mkCauses(p){const q=emoRes(p);if(!q)return[];mkSync(q);const now=mkNow();
 return (q.mk||[]).filter(m=>m.k&&EMO[m.k]&&m.s>0).sort((a,b)=>b.s-a.s).map(m=>({k:m.k,v:m.s,why:m.why,w:m.w,a:m.a,c:m.c,e:m.e,t:m.t,left:m.k1-now}))}
/* the seal to draw for pid (one source; seen on sight, no fog): mood key ("binh" = none) */
function sealKeyFor(pid){try{const p=mckRes(pid);if(!p)return null;if(mkOn())mkSync(p);const e=emoGet(p);return e&&e.k||"binh"}catch(e){return null}}
window.sealKeyFor=sealKeyFor;window.mkCauses=mkCauses;window.mkStat=()=>Object.assign({},MK.stat);
(function(){try{for(const k in EMO_DECAY)EMO_DECAY[k]=Number.MIN_VALUE}catch(e){}})();/* no whole-bar decay: causes end by their khắc */
(function(){if(typeof emoGet!=="function")return;const g0=emoGet;emoGet=function(p){try{if(mkOn()){const q=emoRes(p);if(q&&(q.mk||q.emo)&&q.__mkAt!==mkNow())mkSync(q)}}catch(e){}return g0.apply(this,arguments)}})();
(function(){if(typeof render==="function"){const r0=render;render=function(){try{mkTick()}catch(e){console.error("mkTick",e)}return r0.apply(this,arguments)}}
 if(typeof endTurn==="function"){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{mkTick()}catch(e){}return r}}})();
/* ---------- stamp the class when a cause is set (emoEv passes its event key; direct emoSet: by the cause words) ---------- */
(function(){if(typeof emoEv!=="function")return;const e0=emoEv;emoEv=function(p,ev,why,t){const o=MCK.ev;MCK.ev=ev;let q=null,b=null,bw,bk;try{q=emoRes(p);b=q&&q.emo;bw=b&&b.why;bk=b&&b.k}catch(x){}
 MCK.last=null;try{return e0.apply(this,arguments)}finally{MCK.ev=o;try{if(mkOn()){const m=MCK.last;if(q&&m&&m.e===ev)emo2Turn(q,m,ev,t)}else{const e=q&&q.emo;if(e&&e.e===ev&&(e!==b||e.why!==bw||e.k!==bk))emo2Turn(q,e,ev,t)}}catch(x){}}}})();
(function(){if(typeof emoSet!=="function")return;const s0=emoSet;emoSet=function(p,k,v,why,t){let q=null,b=null,bw,bk;try{q=emoRes(p);b=q&&q.emo;bw=b&&b.why;bk=b&&b.k}catch(e){}
 const r=s0.apply(this,arguments);try{if(!q)return r;const ev=MCK.ev||null;const c=mckCls({e:ev,why});const e=q.emo;
  if(e&&(e!==b||e.why!==bw||e.k!==bk)&&e.why===why){e.e=ev;e.c=c}
  const h=q.emoH&&q.emoH[0];if(h&&h.why===String(why).slice(0,90)&&h.k===k&&!h.c){h.c=c;if(ev)h.e=ev}
  if(mkOn()&&EMO[k]&&v>0&&typeof emoOn==="function"&&emoOn()){q.__mkL=null;if(q.emo)q.emo.mk=1;let a;try{a=EVB_ART||undefined}catch(x){}
   MCK.last=mkAdd(q,{kd:"e:"+(why||k),k,s:Math.round(cl(v,0,100)),why:why||"",e:ev,c,t:t==null?null:t,a},mkDur(ev,k));mkSync(q)}}catch(x){}return r}})();
/* ---------- the rule ---------- */
function mckStore(x){if(x===S){S.mck=S.mck||{};return S.mck}x.mck=x.mck||{};return x.mck}
/* a known cause stays known under every feeling it brings (the đau and the khóc of one loss; review r1) */
function mckWhyOf(sig){const i=String(sig).indexOf("|");return i<0?sig:sig.slice(i)}
function mckHas(x,k,sig){const M=(x===S?S.mck:x&&x.mck)||{};const w=mckWhyOf(sig);return !!(M[k]&&M[k].some(s=>s===sig||mckWhyOf(s)===w))}
/* co-op ONE WORLD (OD:L96): an NPC's knowledge (x.mck) is a world fact, written on the host only (review r1: coop-one-world FAIL R.mck) */
function mckWorld(){try{return typeof worldOn!=="function"||!!worldOn()}catch(e){return true}}
function mckLearn(x,p,by,sig){if(!x||!p||!sig)return;if(x!==S&&!mckWorld())return;const M=mckStore(x),k=emoKey(p);const L=M[k]=(M[k]||[]).filter(s=>s!==sig);L.unshift(sig);if(L.length>mckB().keep)L.length=mckB().keep;MCK.stat[by]=(MCK.stat[by]||0)+1}
function mckPubHas(k,sig){const P=S.mckPub||{};const w=mckWhyOf(sig);return !!(P[k]&&P[k].some(s=>s===sig||mckWhyOf(s)===w))}
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
function mckEyes(){const W=emoW(),P=mckPeople();const K=[S];try{if(mckWorld())for(const v of liveRivals(true))if(v&&v.alive&&!v.out)K.push(v)}catch(e){}
 for(const x of K){let o=0;try{o=oSee(x,false)*mckB().eye/100}catch(e){}if(!(o>0))continue;const kx=emoKey(x);
  for(const p of P){if(p===x)continue;const e=emoGet(p);if(e.k==="binh"||!e.why)continue;const sig=mckSig(e.k,e.why);if(mckKnows(x,p,e))continue;
   if(mckHit("eye|"+kx+"|"+emoKey(p)+"|"+sig+"|"+W,o))mckLearn(x,p,"eye",sig)}}}
/* keep only causes still on the person (current mood or the mood box history) */
function mckPrune(M){if(!M)return;for(const k of Object.keys(M)){const p=emoByKey(k);if(!p){if(!/^(me|emp|th|\d+|s\d+)$/.test(k))continue;delete M[k];continue}
  const ok=new Set();const e=p.emo;if(e&&e.why)ok.add(mckSig(e.k,e.why));for(const h of p.emoH||[])ok.add(mckSig(h.k,h.why));for(const m of p.mk||[])if(m.k)ok.add(mckSig(m.k,m.why));M[k]=M[k].filter(s=>ok.has(s));if(!M[k].length)delete M[k]}}
function mckMorning(){if(!mckOn()||!S||S.dead)return;let L=[];try{L=mckLeak()}catch(e){console.error("mckLeak",e)}try{mckEyes()}catch(e){console.error("mckEyes",e)}
 try{mckPrune(S.mck);mckPrune(S.mckPub);if(mckWorld())for(const v of rivals||[])if(v&&v.mck)mckPrune(v.mck)}catch(e){}
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
(function(){if(typeof emoCauses!=="function")return;const c0=emoCauses;emoCauses=function(p){const L=mkOn()?mkCauses(p):c0.apply(this,arguments);try{const q=emoRes(p);if(!mckOn()||!q||q===S)return L;const e=q.emo,seen=new Set(),out=[];
  for(const x of L){const cur=e&&mckSig(e.k,e.why)===mckSig(x.k,x.why)?Object.assign({},x,{t:e.t,e:e.e,c:e.c}):x;
   if(mckKnows(S,q,cur)){out.push(x);continue}const u=x.k+"|"+x.w;if(seen.has(u))continue;seen.add(u);out.push({k:x.k,v:x.v,w:x.w,left:x.left,why:MCK_UNK,unk:1})}
  return out}catch(x){return L}};window.emoCauses=emoCauses})();
(function(){if(typeof emoCauseArt!=="function")return;const a0=emoCauseArt;emoCauseArt=function(c){if(c&&c.unk)return"";return a0.apply(this,arguments)};window.emoCauseArt=emoCauseArt})();
window.mckStat=()=>Object.assign({},MCK.stat);

/* ================= KHÓC + HỜN (owner OD 17/11 ~18:00Z: "biểu tượng cảm xúc khóc"; hờn from her 16:20Z (g) list) — two more moods in the ONE jemo bar =================
   KHÓC (khoc): a strong sad / grief / fear / humiliation feeling (buồn, đau khổ, sợ ≥ BAL.emo2.khoc.v, from the events in BAL.emo2.khoc.ev) turns into tears by odds
     (BAL.emo2.khoc.o + traits tr, clamped BAL.odds.lo/hi); a SLAP (jface slapGive) brings tears by its severity (BAL.emo2.khoc.slap[sev]); short timer (BAL.mood2.dur.k.khoc).
   HỜN (hon): a slight / scolding / punishment / neglect from someone she is CLOSE to (thiện cảm ≥ BAL.emo2.hon.aff; her own master for a servant; Hoàng thượng for
     a consort) turns into sulking AT that person (emo.t) by odds (BAL.emo2.hon.o + traits): friendly acts toward that person are refused while it lasts (motive gate).
   Same rule for her, every consort, servant, the Emperor; the cause stays the true event (why) and feeds moodCauseKnown. Seal art keys: emo-khoc, emo-hon (kit). */
(function(){try{EMO.khoc="Khóc";EMO.hon="Hờn";const B=BAL.emo2;Object.assign(EMO_W,B.w);Object.assign(EMO_OD,B.od);Object.assign(EMO_LOY,B.loy);EMO_NIGHT.khoc=1;EMO_NIGHT.hon=1;EMO_DECAY.khoc=EMO_DECAY.hon=Number.MIN_VALUE}catch(e){}})();
const EMO2={n:{khoc:0,hon:0,slap:0}};
function emo2On(){try{return !!BAL.emo2&&!window.__emo2Off}catch(e){return false}}
function emo2Tr(p,T){let d=0;try{for(const t of emoTraits(p))d+=T[t]||0}catch(e){}return d}
function emo2Close(p,t){try{if(!t||t===p)return false;if(t===S.emp)return p!==S.emp&&!(p.sid!=null);const o=p.sid!=null||p===S.maid?ownerOf(p)||(p===S.maid?S:null):null;if(o&&o===t)return true;return aff(p,t)>=BAL.emo2.hon.aff}catch(e){return false}}
function emo2Who(p,ev,t){try{if(t!=null){const x=emoByKey(String(t));if(x)return x}if(ev==="neglect"&&p!==S.emp)return S.emp;if(p.sid!=null||p===S.maid)return ownerOf(p)||(p===S.maid?S:null);if(ev==="punished")return S.emp}catch(e){}return null}
/* old path (__mkOff): the mood box history row of this cause follows the turned feeling (review r1) */
function emo2Row(q,e,k0){try{const w=String(e.why||"").slice(0,90);const h=(q.emoH||[]).find(x=>x.why===w&&x.k===k0);if(h)h.k=e.k}catch(x){}}
function emo2Turn(q,e,ev,t){if(!emo2On()||!q||!e)return;const B=BAL.emo2;const val=e.s!=null?e.s:e.v;const ml=!!e.kd;
 /* moodlets: the tears / the sulk are a short cause of their own on top of the sad / hurt one (seal shows them while they last); old path: the feeling turns */
 const turn=(k,tg)=>{if(ml){mkAdd(q,{kd:k+":"+e.kd,k,s:val+1/* one above the cause it rides on, also at 100 (seal shows it; emo.v stays capped) */,why:e.why,e:e.e,c:e.c,t:tg!=null?tg:e.t,a:e.a},mkDur(null,k));q.__mkL=null;mkSync(q)}else{const k0=e.k;e.k=k;if(tg!=null)e.t=tg;emo2Row(q,e,k0)}};
 if(B.hon.ev.includes(ev)&&["gian","buon","so"].includes(e.k)){const w=emo2Who(q,ev,t);if(w&&emo2Close(q,w)&&roll(mckOdds(B.hon.o+emo2Tr(q,B.hon.tr)))){turn("hon",emoKey(w));EMO2.n.hon++;return}}
 if(B.khoc.ev.includes(ev)&&["buon","dau","so"].includes(e.k)&&val>=B.khoc.v&&roll(mckOdds(B.khoc.o+emo2Tr(q,B.khoc.tr)))){turn("khoc",null);EMO2.n.khoc++}}
/* a slap brings tears (her too); the mark on the face is seen by all → the cause is PUBLIC */
(function(){if(typeof slapGive!=="function")return;const g0=slapGive;slapGive=function(p,by,why,sev){const r=g0.apply(this,arguments);try{if(!emo2On()||!r||!p||typeof emoOn!=="function"||!emoOn())return r;const B=BAL.emo2.khoc;const s=cl(sev|0||BAL.slap.def,1,3);
  if(roll(mckOdds(B.slap[s]+emo2Tr(p,B.tr)))){const o=MCK.ev;MCK.ev="slap";try{emoSet(p,"khoc",B.slapV[s],`bị ${by?emoName(by):"người ta"} tát`,by?emoKey(by):null)}finally{MCK.ev=o}EMO2.n.slap++}}catch(e){}return r}})();
/* the old mood ladders (Emperor / Thái hậu bars, vent-act groups) read the two new moods */
(function(){if(typeof emoLv==="function"){const l0=emoLv;emoLv=function(k){return BAL.emo2&&BAL.emo2.lv[k]!=null?BAL.emo2.lv[k]:l0.apply(this,arguments)}}
 if(typeof eaGrpK==="function"){const g0=eaGrpK;eaGrpK=function(k){return k==="khoc"?"buon":k==="hon"?"gian":g0.apply(this,arguments)}}})();
/* sulking AT someone: friendly acts toward that person are refused while it lasts (the jemo motive gate, one more line) */
(function(){const wrap=()=>{if(window.__emo2Gate||typeof motiveOK!=="function"||!window.__emoGate)return;window.__emo2Gate=1;const g0=motiveOK;
  motiveOK=function(a,t,kind){const g=g0.apply(this,arguments);try{if(!emo2On()||!a||!t||a===S||typeof a!=="object"||!g.ok)return g;const e=emoGet(a),tk=emoKey(t);let h=e.k==="hon"&&e.t!=null&&e.t===tk?e:null;if(!h&&mkOn()){const now=mkNow();h=(a.mk||[]).find(m=>m.k==="hon"&&m.t===tk&&m.k1>now)||null}
   if(h&&typeof F95!=="undefined"&&F95.has(kind))return{ok:false,why:`đang hờn ${emoName(t)} (${h.why})`}}catch(x){}return g}};
 try{wrap()}catch(e){}if(typeof render==="function"){const r0=render;render=function(){try{wrap()}catch(e){}return r0.apply(this,arguments)}}})();
window.emo2Stat=()=>Object.assign({},EMO2.n);
/* review r1: the card's "Đã biết" mood fact ("… đang buồn, vì …") is marked "nay đã khác" (kit current:false) once that cause is no longer on the person */
(function(){if(typeof intelOf!=="function")return;const i0=intelOf;intelOf=function(p){const L=i0.apply(this,arguments);try{if(!p||!mckOn())return L;const W=[];const e=emoGet(p);if(e&&e.why)W.push(e.why);
  const now=mkOn()?mkNow():0;for(const m of p.mk||[])if(m.k&&m.why&&m.k1>now)W.push(m.why);for(const x of L)if(x.kind==="mood")x.current=W.some(w=>String(x.fact||"").includes("vì "+w))}catch(x){}return L};window.intelOf=intelOf})();
