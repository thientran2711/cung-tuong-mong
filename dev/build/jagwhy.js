/* ================= jagwhy: NPC-PURPOSE — every NPC event comes from a PERSON with a GOAL (ONE shared helper) =================
   Owner (verbatim, OD 18/11 ~04:08Z): "Ủa sao tôi nói là bất kỳ điều gì NPC làm ở trong game đều phải có mục đích. Nó phải phù hợp với cái mục tiêu
   của cuộc đời nó. Không có gì gọi là hên xui ở đây hết mà." (restates OD:L1386 NPC = agent playing the game, OD:L35 motive gate, OD:L188 men's
   intrusions plan-driven). Report + row table: dev/handover/reports/npc-purpose.md (handover branch).
   RULE: WHETHER an NPC event fires, WHO does it, at WHOM and WHERE come from that person's own goal (needs, grudges, ties, plans, what she knows).
   Dice may only (1) weight between options that are ALL goal-valid (C-AG #9 18/11: "a mistake, never a random act") and (2) roll the SUCCESS of
   the deed with its BAL odds (unchanged, in the caller). No reason → nothing happens (a quiet day is fine, OD 17/11 ~13:15Z).
   API (every caller uses these; no per-event helper, no per-event number):
   - npwReg(kind, def): register an event kind. def = { who(ctx) → [people who could act], why(p, ctx) → {s, t?, r, k?} | null,
       cd?: key of BAL.ag.why.cd (default: kind; else BAL.ag.why.<kind>.cd — keeps one-core-guard's one key per name), cdOf?(p) → tuần for that person (a BAL value), grp?: label,
       shared?: true = ONE cooldown for the kind across all actors (a palace occasion that comes rarely, e.g. a merit deed: N actors must not mean N times the old rate),
       lim?: n | (ctx) → n — ask only the first n candidates who are off cooldown (who() sorted best first; keeps a heavy why() cheap) }. s = how strongly her goal pushes her (0..100, from her real state),
       t = her target (a person), r = the reason (player-visible, Vietnamese per VANPHONG), k = place key.
   - npcWhy(kind, ctx, done?) → {kind, who, tgt, why, place, s} | null. Asks every candidate why(); keeps reasons with s ≥ BAL.ag.why.min that are off
       cooldown; picks among the goal-valid top options (npwPick); stamps the cooldown (S.npw, lazy: old saves load). done(o) (optional) = the
       chance / success roll of the deed (its BAL odds): false → no deed, NO stamp (counted "miss"), she may try again next time (rates review 18/11:
       the cooldown follows a real deed, never a failed chance).
       reg each:true (with done) = every candidate with a reason makes her own try, strongest first (weighted order); the first success is the
       deed, only she is stamped (kinds where each servant / consort acts on her own goal, e.g. eitPil: picking ONE and rolling once cut the rate by N).
   - npcWhyAll(kind, ctx) → every actor with a reason this time (for events where several people may act), each once, cooldowns stamped.
   - npwPick(L, score, o) → one of L: only options within BAL.ag.why.near × the best score, at most BAL.ag.why.top of them, weighted by score^pow.
       o.all = every option is already one of her own goal-valid acts (a routine of real duties, the reactions her temper allows): all of
       them, weighted by score (no near-best cut; keeps the old spread, rates review 18/11).
   - npcWit(place, kh, o) → [{p, s}] people REALLY at the place (day record row at khắc kh, else whereOf), best watcher first:
       eyes × wit.eye + (o.vs ? hostility(p, o.vs) × wit.host : 0); o.not = people to leave out.
   - npcTell(about, o) → {who, to, why} | null: who carries a fact about `about` to `o.to` (default: the player) — a witness at o.place/o.kh, or
       o.from (people who REALLY know it: a witness, the holder of the proof, npwIn(p) = those who see inside p's house), choosing to tell by grudge
       against `about` (tell.host) or regard for the one told (tell.friend; liking, or for Hoàng thượng her Sủng, for Thái hậu her Thái hậu regard).
       o.cd = a kind name: the teller's cooldown (BAL.ag.why.cd.<kind>), stamped on the one who tells. The player is never a teller (her own choice).
   - npwIn(p) → consorts who see inside p's house (same palace, or one of their tai mắt serves p) · npwMat(x, p) → x's tai mắt serving p (or null).
   - def.on(o, ctx): optional, run once after a real fire (e.g. the story clock restarts).
   - npwNm(p) → the name the player reads ("ngươi" / "<rank> <name>").
   Numbers: BAL.ag.why (jbal2). Off: BAL.ag.why.on = 0 → npcWhy returns null (callers keep their old path only while their row is unconverted).
   Counters: NPW.stat (fire / quiet / cd / miss per kind). Scan test: dev/test/npc-purpose-scan.js (rows: dev/test/npc-purpose-rows.json).
   ===================================================================================================================================== */
const NPW={reg:{},stat:{}};
function npwB(){return (typeof BAL!=="undefined"&&BAL.ag&&BAL.ag.why)||null}
function npwOn(){try{const B=npwB();return !!(B&&B.on&&typeof S!=="undefined"&&S&&!S.dead)}catch(e){return false}}
function npwSt(kind,k){const s=NPW.stat[kind]||(NPW.stat[kind]={fire:0,quiet:0,cd:0,miss:0});s[k]=(s[k]||0)+1}
function npwReg(kind,def){if(!kind||!def||typeof def.who!=="function"||typeof def.why!=="function")throw new Error("npwReg "+kind);NPW.reg[kind]=def;return def}
function npwId(p){try{return p===S?"me":(typeof ledgerId==="function"&&ledgerId(p))||p.id||p.sid||p.name}catch(e){return p&&(p.id||p.name)}}
function npwCdN(kind,p){const B=npwB(),d=NPW.reg[kind];if(d&&typeof d.cdOf==="function"&&p){const n=+d.cdOf(p);if(n>=0)return n}const c=B.cd||{};const k=(d&&d.cd)||kind;if(c[k]!=null)return c[k];const o=B[kind];return o&&o.cd!=null&&!Array.isArray(o.cd)?o.cd:(c._||0)}
function npwCk(kind,p){const d=NPW.reg[kind];return (d&&d.shared?"*":npwId(p))+"|"+kind}
function npwCdOk(kind,p){if(!S.npw)return true;const w=S.npw[npwCk(kind,p)];return w==null||wk()>=w}
function npwStamp(kind,p){S.npw=S.npw||{};S.npw[npwCk(kind,p)]=wk()+npwCdN(kind,p)}
function npwPick(L,score,o){const B=npwB();const R=(L||[]).map(x=>[x,+score(x)||0]).filter(r=>r[1]>0).sort((a,b)=>b[1]-a[1]);if(!R.length)return null;
 const all=!!(o&&o.all);const top=all?R:R.filter(r=>r[1]>=R[0][1]*B.near).slice(0,Math.max(1,B.top));if(top.length===1)return top[0][0];const pw=all?1:B.pow;
 const w=top.map(r=>Math.pow(r[1],pw));let x=Math.random()*w.reduce((a,b)=>a+b,0);for(let i=0;i<top.length;i++){x-=w[i];if(x<=0)return top[i][0]}return top[top.length-1][0]}
/* npwShare (review/errand-bal, law 4 + 7): the true chance (0..100) that npwPick(L,score) returns x — the same near / top / pow cut, so a card
   that prints the odds of a purpose pick shows what the pick really does (never a typed number) */
function npwShare(L,score,x,o){const B=npwB();const R=(L||[]).map(y=>[y,+score(y)||0]).filter(r=>r[1]>0).sort((a,b)=>b[1]-a[1]);if(!R.length)return 0;
 const all=!!(o&&o.all);const top=all?R:R.filter(r=>r[1]>=R[0][1]*B.near).slice(0,Math.max(1,B.top));const pw=all?1:B.pow;const i=top.findIndex(r=>r[0]===x);if(i<0)return 0;if(top.length===1)return 100;
 const w=top.map(r=>Math.pow(r[1],pw));return Math.round(100*w[i]/w.reduce((a,b)=>a+b,0))}
function npwAsk(kind,ctx){const d=NPW.reg[kind];if(!d)throw new Error("npcWhy: unknown kind "+kind);const B=npwB();const O=[];let cd=0;
 const lim=typeof d.lim==="function"?d.lim(ctx||{}):(d.lim||0);let n=0;
 for(const p of (d.who(ctx||{})||[])){if(!p)continue;if(lim){if(!npwCdOk(kind,p)){cd++;continue}if(n>=lim)break;n++}let r=null;try{r=d.why(p,ctx||{})}catch(e){console.error("npcWhy "+kind,e);r=null}
  if(!r||!(r.s>=B.min))continue;if(!npwCdOk(kind,p)){cd++;continue}O.push({kind,who:p,tgt:r.t||null,why:r.r||"",place:r.k||null,flag:r.flag||null,s:r.s})}
 if(cd)npwSt(kind,"cd");return O}
function npwOnFire(kind,o,ctx){const d=NPW.reg[kind];if(d&&typeof d.on==="function")try{d.on(o,ctx||{})}catch(e){console.error("npcWhy on "+kind,e)}}
function npcWhy(kind,ctx,done){if(!npwOn())return null;const O=npwAsk(kind,ctx);const d=NPW.reg[kind];if(d&&d.each&&typeof done==="function"){/* each: every one with a reason makes her OWN try (strongest reason first, weighted); the first whose try succeeds is the one (the old "each servant rolls, first hit" rate) */if(!O.length){npwSt(kind,"quiet");return null}const L=O.slice();while(L.length){const o=npwPick(L,x=>x.s,{all:true});if(!o)break;L.splice(L.indexOf(o),1);if(done(o)){npwStamp(kind,o.who);npwSt(kind,"fire");npwOnFire(kind,o,ctx);return o}}npwSt(kind,"miss");return null}const o=npwPick(O,x=>x.s,d&&d.pickAll?{all:true}:null);/* pickAll: every one with a real reason may be the one, weighted by how strong it is (kinds where several people compete for one deed) */if(!o){npwSt(kind,"quiet");return null}
 if(typeof done==="function"&&!done(o)){npwSt(kind,"miss");return null}npwStamp(kind,o.who);npwSt(kind,"fire");npwOnFire(kind,o,ctx);return o}
function npcWhyAll(kind,ctx){if(!npwOn())return[];const O=npwAsk(kind,ctx);if(!O.length){npwSt(kind,"quiet");return[]}
 for(const o of O){npwStamp(kind,o.who);npwSt(kind,"fire");npwOnFire(kind,o,ctx)}return O}
function npwAt(p,kh){try{if(kh!=null&&typeof agRec==="function"&&agRec()&&typeof agAt==="function")return agAt(p,kh)}catch(e){}return whereOf(p)}
function npwPeople(){const L=liveRivals(true).slice();try{if(S.emp&&!S.thDead)L.push(S.emp)}catch(e){}return L}
function npcWit(place,kh,o){o=o||{};const B=npwB().wit;const not=new Set(o.not||[]);const L=(o.pool||npwPeople().concat([S])).filter(p=>p&&!not.has(p)&&npwAt(p,kh)===place);
 return L.map(p=>({p,s:(typeof eyes==="function"?eyes(p):0)*B.eye+(o.vs&&p!==o.vs&&typeof hostility==="function"?Math.max(0,hostility(p,o.vs))*B.host:0)})).sort((a,b)=>b.s-a.s)}
function npwHigh(to){try{return !!to&&((S.emp&&to===S.emp)||(S.thO&&to===S.thO))}catch(e){return false}}
function npwRegard(w,to){try{if(S.emp&&to===S.emp)return +w.sung||0;if(S.thO&&to===S.thO)return +w.th||0}catch(e){}return typeof aff==="function"&&to&&(to===S||to.rl||w.rl)?(+aff(w,to)||0):0}
function npcTell(about,o){o=o||{};const B=npwB().tell;const to=o.to||S;const from=o.from||(o.place?npcWit(o.place,o.kh,{not:[about,to]}).map(x=>x.p):[]);
 const O=[];for(const w of from){if(!w||w===about||w===to||w===S)continue;if(o.cd&&!npwCdOk(o.cd,w))continue;const g=about&&typeof hostility==="function"?hostility(w,about):0;const f=npwRegard(w,to);
  if(g>=B.host)O.push({who:w,to,s:g,why:"oán "+npwNm(about)});else if(f>=B.friend)O.push({who:w,to,s:f,why:(npwHigh(to)?"muốn lấy lòng ":"thân với ")+npwNm(to)})}
 const x=npwPick(O,y=>y.s);if(x&&o.cd)npwStamp(o.cd,x.who);return x?{who:x.who,to:x.to,why:x.why}:null}
function npwIn(p){if(!p)return[];const L=liveRivals(true).filter(x=>x&&x!==p&&x.alive!==false&&!x.out);return L.filter(x=>{try{if(typeof sameHouse==="function"&&sameHouse(x,p))return true;
 return typeof taiMatRaw==="function"&&taiMatRaw(x).some(s=>ownerOf(s)===p)}catch(e){return false}})}
function npwMat(x,p){try{return typeof taiMatRaw==="function"&&x&&p&&x!==p?taiMatRaw(x).find(s=>ownerOf(s)===p)||null:null}catch(e){return null}}
function npwNm(p){if(!p)return"";if(p===S)return"ngươi";try{if(S.emp&&p===S.emp)return"Hoàng thượng";if(S.thO&&p===S.thO)return"Thái hậu"}catch(e){}try{return rkName(p)+" "+p.name}catch(e){return p.name||""}}
