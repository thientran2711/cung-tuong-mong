/* ================= jmem: KỶ NIỆM (memories) + ÂN OÁN CHƯA DỨT (hook ledger) — item D26, review/memories =================
   Spec: dev/ideas/DESIGN_IDEAS_1115.md #1 (Kỷ niệm) and #3 (one ledger of hooks). Docs + API: dev/PROGRESS_memories.md. Numbers: BAL.mem / BAL.hook (jbal2).

   1. MEMORIES. A person keeps ≤ BAL.mem.cap records about each person who mattered: {d deed, w week, dt date text, s sign, g weight, g0 first
      weight, k keep (never fades fully), n times, x extra word}. Stored in S.mem["<holder>|<about>"] (personal state: co-op safe, old saves
      start empty). Keys: "me" (her), a rival id, "emp", "th".
      Written by acts that already exist (runAct schemes both ways incl. NPC↔NPC, giveTo gifts, empAct Hoàng hậu powers, talk options,
      nợ-ân quests q72End, big relation swings inside an event = generic deed named after the event). Never written for a secret act nobody saw.
      Fade: −BAL.mem.fadeMo weight a month; a "keep" deed (betrayal, poison, rescue…) stops at g0·BAL.mem.keepFloor. A repeated deed reinforces.
      Recall: (a) the person says it: a quoted line on her talk result (once a month per person) and on top of the person-card block;
      (b) modifier: memMod(h,a) = Σ s·g / modDiv, capped ±modMax, added to talk-option odds and Kết giao odds with that person, and taken off
      NPC hostility (NPC minds pick targets with it); (c) "Nhắc lại ân xưa": spend a good memory (weight −invokeCost) → that person owes her
      one ân in the existing nợ-ân ledger (j72), the non-bạc road.
   2. HOOK LEDGER. One list of unresolved hooks between two people. It does NOT copy the systems that already keep such things — it MIRRORS
      them: chứng cứ she holds (v.ev, j8/jtruth) → "proof"; chứng cứ an NPC holds on her (v.evm.me) → "threat"; nợ ân (j72 q.d) → "favour" /
      "debt"; nợ-ân quests she accepted (j72 q.a) → "promise". Kinds that had no home are stored in S.hooks.L: "secret" (an affair or a false
      pregnancy she saw — written from the notes that already record it), "promise" made to her, "threat", "favour", "debt", "vow".
      API (other systems / later events use it):
        hookAdd(kind, by, on, {t, str:"weak"|"strong", due, src, x}) → id      by/on: person or key; returns null if invalid
        hookQuery({k, by, on, src, mir:false})                          → array of hooks (own + mirrored), newest first
        hookPick(filter)                                                → the oldest matching open hook (for an event to pick up) or null
        hookResolve(id, res, {note, mem:false})                         → true if resolved; res = kept | broken | used | lapsed | faded | lost | paid
        hookUse(id)                                                     → weak: resolve "used"; strong: uses+1, target Oán +, may be destroyed / strike back
        hookLabel(h) / hookText(h)                                      → kind word / row text (VANPHONG register)
      Monthly tick: dead / gone target → "lapsed"; due passed → promise "broken" (memory written); strong secret fades with BAL.hook.fadeCh.
      Uses: talk option "Lấy chuyện riêng ép nàng" (strong secret → she owes one ân, Oán +, risk) on the rival card.
   SHOWN (kit parts only): person card (jpcf) blocks "Kỷ niệm" and "Ân oán chưa dứt" = kitRows; strong new memories / hook changes write
   a Sổ ghi line, so they appear in Tuần lục with the week's other entries. No new component, no CSS.
   Off switch: window.__memOff=true. Test: dev/test/memories.js.
   MEM-UPGRADE (review/mem-upgrade; owner 16/11 13:25Z (A) memories + 13:40Z ONE LEDGER (b) causes; docs dev/PROGRESS_review-mem-upgrade.md):
   - storage: her memories stay in S.mem["me|<about>"]; every other holder (consort, Emperor, Thái hậu, servant "s<sid>") keeps them on itself
     (.mem = {<about>:[records]}) = world state in co-op (host authority, same on both sides); old saves migrate once (memMig).
   - per-person fade (BAL.mem.fadeT by nết × fixed per-person spread fadeJit); LIFELONG memories (m.L: BAL.mem.life deeds or weight ≥ lifeMin) never fade.
   - memory-driven behaviour: danger (will to harm / favour gate), revenge in kind (MIRROR in the NPC mind), everyday dealings (npcSocial), servants' loyalty.
   - CAUSE LEDGER: causeAdd/causeWhy/causeQuery/causeLine; every act family below writes who did what to whom and why; memories link to their cause (m.c).
   Tests: dev/test/mem-upgrade.js, dev/test/mem-coop.js. Measure: dev/measure/mem-behaviour.js. */
(function(){
const B=()=>BAL.mem;
const BH=()=>BAL.hook;
const off=()=>!!window.__memOff||typeof S!=="object"||!S||typeof BAL!=="object"||!BAL.mem||!BAL.hook;
const plainT=s=>String(s||"").replace(/<[^>]*>/g,"").replace(/\s+/g," ").trim();
/* ---------- deeds: [sign, keep, phrase; base weight = BAL.mem.w[deed] (doer is the subject; {o} = the one who remembers, {x} = extra)] ---------- */
const MEM_DEEDS={
 ally:[1,0,"chủ động kết giao với {o}"],gift:[1,0,"tặng {o} {x}"],giftbad:[-1,0,"tặng {o} {x}, món quà chẳng vừa ý"],
 gifttaint:[-1,1,"tặng {o} {x} có tẩm thứ hại người"],secret:[1,0,"tâm sự chuyện riêng với {o}"],care:[1,0,"ân cần hỏi han {o}"],
 apology:[1,0,"hạ mình tạ lỗi với {o}"],humble:[1,0,"nhún nhường trước {o}"],provoke:[-1,0,"buông lời khiêu khích {o}"],vent:[-1,0,"trút giận lên {o}"],
 spy:[-1,0,"sai người dò la {o}"],rumor:[-1,0,"tung tin đồn bẩn về {o}"],frame:[-1,1,"vu oan {o} dùng bùa ngải"],
 poison:[-1,1,"bỏ độc mưu hại {o}"],accuse:[-1,1,"tố giác {o} trước mặt bề trên"],bribe:[-1,0,"mua chuộc cung nữ bên {o}"],
 block:[-1,0,"đút lót giấu thẻ bài của {o}"],plant:[-1,1,"cài đồ hại {o} vào rương"],steal:[-1,0,"lấy trộm đồ của {o}"],
 musk:[-1,1,"hại cái thai của {o}"],kidharm:[-1,1,"ra tay với con của {o}"],takeaway:[-1,1,"bế con của {o} về nuôi"],
 reward:[1,0,"ban thưởng cho {o}"],pardon:[1,1,"ân xá, cứu {o} khỏi cảnh khốn cùng"],conf:[-1,0,"tịch thu trang sức của {o}"],
 cutpay:[-1,0,"khất bổng lộc của {o}"],judge:[-1,1,"xử phạt {o}"],helped:[1,0,"giúp {o} xong việc khó"],
 failed:[-1,0,"nhận lời giúp {o} rồi làm hỏng việc"],exposed:[-1,0,"làm lộ chuyện {o} nhờ cậy"],kept:[1,0,"giữ trọn lời hứa với {o}"],
 broken:[-1,1,"thất hứa với {o}"],pressed:[-1,0,"lấy chuyện riêng ép {o}"],scheme:[-1,0,"giở trò “{x}” với {o}"],
 good:[1,0,"giúp {o} trong chuyện “{x}”"],bad:[-1,0,"làm {o} phật lòng trong chuyện “{x}”"],
 /* mem-upgrade: everyday dealings (npcSocial), the Emperor's punishments, servants, big events */
 help:[1,0,"sang giúp {o} việc trong cung"],visit:[1,0,"sang thăm {o} lúc ốm mệt"],warn:[1,0,"báo cho {o} biết có kẻ rắp tâm hại"],mediate:[1,0,"đứng ra hòa giải cho {o}"],
 humiliate:[-1,0,"hạ nhục {o} trước mặt cung nhân"],drop:[-1,0,"lạnh nhạt với {o} lúc sa cơ"],nightsteal:[-1,0,"cướp đêm thị tẩm của {o}"],threat:[-1,0,"dọa nạt {o}"],
 demote:[-1,1,"giáng {o} xuống một bậc"],confine:[-1,0,"phạt {o} cấm túc"],srvreward:[1,0,"thưởng cho {o}"],srvpunish:[-1,0,"phạt {o}"],
 srvshield:[1,1,"che chở {o} trước Thận Hình ti"],rescue:[1,1,"cứu {o} một mạng"]};
window.MEM_DEEDS=MEM_DEEDS;
const ACT2DEED={spy:"spy",rumor:"rumor",frame:"frame",poison:"poison",accuse:"accuse",bribe:"bribe",block:"block",musk:"musk",catswap:"kidharm",
 ksab:"kidharm",kpoison:"kidharm",pond:"kidharm",kframe:"kidharm",takeaway:"takeaway",plant:"plant",steal:"steal",ally:"ally"};
/* ---------- keys and names ("me" her, "emp", "th", a rival id, "s<sid>" a servant) ---------- */
function mk(p){try{if(p==null)return null;if(typeof p==="string"||typeof p==="number"){const s=String(p);return s==="S"?"me":s.replace(/^rv:/,"")}
 if(p===S)return"me";if(S.emp&&p===S.emp)return"emp";if(p.kind==="th"||(S.thO&&p===S.thO))return"th";if(p.id!=null)return String(p.id);return p.sid!=null?"s"+p.sid:null}catch(e){return null}}
function mp(k){k=String(k);if(k==="me")return S;if(k==="emp")return S.emp||"emp";if(k==="th")return S.thO||"th";
 if(/^s\d+$/.test(k)){try{return servById(+k.slice(1))||null}catch(e){return null}}try{return RV(isNaN(+k)?k:+k)||RV(k)||null}catch(e){return null}}
function mName(k){k=String(k);if(k==="me")return"ngươi";if(k==="emp")return"Hoàng thượng";if(k==="th")return"Thái hậu";const p=mp(k);return p&&p.name?p.name:"người ấy"}
function mPron(k){k=String(k);return k==="emp"?"ngài":k==="th"?"người":k==="me"?"ngươi":"nàng"}
function alive(k){k=String(k);if(k==="me")return !S.dead;if(k==="emp")return true;if(k==="th")return !S.thDead;const p=mp(k);if(p&&p.sid!=null&&p.id==null)return true;return !!(p&&p.alive&&!p.out)}
function isP(k){return k==="me"||k==="emp"||k==="th"||!!mp(k)}
/* ---------- store (mem-upgrade): her own memories stay in S.mem["me|<about>"] (personal); every other holder keeps its memories ON ITSELF
   (rival v.mem, S.emp.mem, S.thO.mem, servant s.mem = {<about>:[records]}), so in co-op they are world state, synced by the host and the same
   on both sides (jcoopworld maps the key "me" to the player id). Old saves: S.mem["<holder>|<about>"] of other holders move there once. ---------- */
function memS(){if(!S.mem||typeof S.mem!=="object")S.mem={};return S.mem}
function hObj(hk){if(hk==="me"||hk==null)return null;if(hk==="emp")return S.emp&&typeof S.emp==="object"?S.emp:null;
 if(hk==="th"){if(!S.thO||typeof S.thO!=="object")S.thO={};return S.thO}const p=mp(hk);return p&&typeof p==="object"&&p!==S&&!p.coop?p:null}
function memMig(){const M=memS();if(M._v===2)return;M._v=2;
 /* r1: records of an old save whose deed / weight is lifelong now get m.L, so they stop fading after the upgrade */
 for(const k of Object.keys(M)){const L=M[k];if(k[0]==="_"||!Array.isArray(L))continue;for(const m of L)if(m&&!m.L&&isLife(m.d,m.g0||m.g))m.L=1}
 for(const k of Object.keys(M)){if(k[0]==="_"||/^me\|/.test(k))continue;const i=k.indexOf("|");const L=M[k];delete M[k];
  if(i<0||!Array.isArray(L))continue;const o=hObj(k.slice(0,i));if(!o)continue;const H=hMem(o,1);const a=k.slice(i+1);H[a]=(H[a]||[]).concat(L)}}
function hMem(o,c){if(!o.mem||typeof o.mem!=="object"||Array.isArray(o.mem)){if(!c)return null;o.mem={}}return o.mem}
function memArr(hk,ak,c){memMig();if(hk==="me"){const M=memS(),id="me|"+ak;if(!Array.isArray(M[id])){if(!c)return null;M[id]=[]}return M[id]}
 const o=hObj(hk);if(!o)return null;const H=hMem(o,c);if(!H)return null;if(!Array.isArray(H[ak])){if(!c)return null;H[ak]=[]}return H[ak]}
function memSet(hk,ak,L){if(hk==="me"){const M=memS();if(L.length)M["me|"+ak]=L;else delete M["me|"+ak];return}const o=hObj(hk);const H=o&&hMem(o,0);if(!H)return;if(L.length)H[ak]=L;else delete H[ak]}
/* every holder map, for the monthly fade and the scans: [holderKey, {about:[records]} | null for "me"] */
function memHolders(){const R=[["me",null]];try{if(S.emp&&S.emp.mem)R.push(["emp",S.emp.mem]);if(S.thO&&S.thO.mem)R.push(["th",S.thO.mem]);
  for(const v of (typeof rivals!=="undefined"?rivals:[])){if(v&&!v.coop&&v.mem)R.push([String(v.id),v.mem]);if(v&&v.staff)for(const s of v.staff)if(s&&!s.coop&&s.mem)R.push(["s"+s.sid,s.mem])}
  for(const s of S.staff||[])if(s&&s.mem)R.push(["s"+s.sid,s.mem])}catch(e){}return R}
function memPairs(hk,H){if(hk==="me"){const M=memS();return Object.keys(M).filter(k=>/^me\|/.test(k)).map(k=>[k.slice(3),M[k]])}return Object.keys(H||{}).map(k=>[k,H[k]])}
function dtNow(){try{return `T${S.month}/${S.year} ${TUAN[S.tuan]}`}catch(e){return""}}
function nowW(){try{return wk()}catch(e){return 0}}
const NUMW=["","một","hai","ba","bốn","năm","sáu","bảy","tám","chín","mười"];
function memAgo(w){const d=Math.max(0,nowW()-(w||0));if(d<3)return"mới đây";if(d<36){const m=Math.floor(d/3);return m===1?"tháng trước":`${NUMW[m]||m} tháng trước`}
 const y=Math.floor(d/36);return y===1?"năm ngoái":`${NUMW[y]||y} năm trước`}
function phrase(m,o){const D=MEM_DEEDS[m.d]||MEM_DEEDS.good;return D[2].replace(/\{o\}/g,o).replace(/\{x\}/g,m.x||"")}
/* LIFELONG (owner 16/11 13:25Z "có những cái sự kiện là sẽ nhớ cả đời"): a deed in BAL.mem.life, or any memory whose weight reaches
   BAL.mem.lifeMin, never fades and is never pushed out by smaller ones (own cap BAL.mem.lifeCap per pair) */
function isLife(d,g,o){const C=B();return !!((o&&o.life)||(C.life||[]).includes(d)||g>=C.lifeMin)}
function memAdd(h,a,d,o){if(off())return null;o=o||{};const hk=mk(h),ak=mk(a);const D=MEM_DEEDS[d];if(!hk||!ak||hk===ak||!D)return null;
 if(!isP(hk)||!isP(ak))return null;
 const C=B();let g=Math.round(o.g!=null?o.g:((C.w||{})[d]||0));if(g<=0)return null;g=Math.min(100,g);const L=memArr(hk,ak,1);if(!L)return null;
 const x=o.x?plainT(o.x).slice(0,60):"";let m=L.find(z=>z.d===d&&(z.x||"")===x);
 if(m){m.g=Math.min(100,Math.round(m.g+g*C.reinforce),Math.max(m.g,Math.round(((C.w||{})[d]||g)*C.reinforceMax)));m.g0=Math.max(m.g0||0,m.g);m.n=(m.n||1)+1;m.w=nowW();m.dt=dtNow();if(!m.L&&isLife(d,m.g,o))m.L=1}
 else{m={d,s:D[0],g,g0:g,k:D[1]||(o.keep?1:0),n:1,w:nowW(),dt:dtNow()};if(x)m.x=x;if(isLife(d,g,o))m.L=1;L.unshift(m)}
 if(o.c)m.c=String(o.c);if(o.y)m.y=o.y;
 /* MOOD-MEM: where it happened (both people at one place) — a later visit there can wake the memory (jmoodknow mwTick) */
 try{if(typeof mwPlaceOf==="function"){const pl=mwPlaceOf(hk,ak);if(pl)m.pl=pl}}catch(e){}
 /* cap: ordinary memories ≤ cap, lifelong ones ≤ lifeCap, each list keeps its strongest */
 const lf=L.filter(z=>z.L).sort((p,q)=>q.g-p.g).slice(0,C.lifeCap),nl=L.filter(z=>!z.L).sort((p,q)=>q.g-p.g).slice(0,C.cap);
 L.length=0;L.push(...lf.concat(nl).sort((p,q)=>q.g-p.g));if(!L.includes(m))return null;
 memPrune(hk);
 /* a strong memory about her (or hers about someone) goes into the Sổ ghi → Tuần lục */
 if(!o.quiet&&(hk==="me"||ak==="me")&&g>=C.logMin){try{const who=hk==="me"?null:mName(hk);
  log(who?`${who} ${m.s>0?"ghi lòng tạc dạ":"để bụng"}: ngươi đã ${phrase(m,mPron(hk))}.`:`Ngươi ${m.s>0?"ghi nhớ ơn":"ghi nhớ"} ${mName(ak)} đã ${phrase(m,"ngươi")}.`)}catch(e){}}
 return m}
/* a holder keeps ≤ BAL.mem.holderCap people in mind; the weakest pair goes first (her and lifelong memories last) */
function memPrune(hk){const C=B();const P=memPairs(hk,hk==="me"?null:(hObj(hk)||{}).mem);if(P.length<=C.holderCap)return;
 const sc=([a,L])=>(a==="me"?1000:0)+L.reduce((s,m)=>s+m.g+(m.L?500:0),0);P.sort((p,q)=>sc(p)-sc(q));
 for(const [a] of P.slice(0,P.length-C.holderCap))memSet(hk,a,[])}
function memList(h,a){if(off())return[];const L=memArr(mk(h),mk(a),0);return Array.isArray(L)?L.filter(m=>m&&m.g>0):[]}
function memScore(h,a){return memList(h,a).reduce((s,m)=>s+m.s*m.g,0)}
function memMod(h,a){if(off())return 0;const C=B();try{return Math.max(-C.modMax,Math.min(C.modMax,Math.round(memScore(h,a)/C.modDiv)))}catch(e){return 0}}
function memTop(h,a,s){const L=memList(h,a).filter(m=>!s||m.s===s);return L.length?L.slice().sort((p,q)=>q.g-p.g)[0]:null}
/* the line the person says (holder h speaks to a) */
function memLine(h,a,m){m=m||memTop(h,a);if(!m)return"";const ak=mk(a);const you=ak==="me"?"ngươi":mName(ak);const me="ta";
 const ago=memAgo(m.w);const A=ago[0].toUpperCase()+ago.slice(1);
 const C=B();const tail=m.s>0?(m.L?" Ơn ấy ta nhớ suốt đời.":m.g>=C.strong?" Ơn ấy ta ghi lòng tạc dạ.":" Ta vẫn còn nhớ."):((m.L||m.k)&&m.g>=C.hate?" Mối hận ấy ta mang theo suốt đời.":" Chuyện ấy ta chưa quên đâu.");
 return `${A}, ${you} đã ${phrase(m,me)}.${tail}`}
function memFadeWord(m){const C=B();return m.L?"khắc cốt ghi tâm":m.g>=C.strong?"nhớ rõ":m.g>=C.faint?"còn nhớ":"đã phai"}
/* PER-PERSON FADE (owner 16/11 13:25Z "có người thì ký ức phai nhanh, có người thì ký ức phai lâu"): the monthly loss BAL.mem.fadeMo is
   multiplied by the holder's nết (BAL.mem.fadeT[trait] = [good memories, bad memories]; Thù dai keeps grudges, Trọng nghĩa keeps kindness,
   Hiền lành lets wrongs go…) and by a small fixed per-person spread (± BAL.mem.fadeJit, from the person's id: two people of one nết still differ). */
function jit(s){let h=7;s=String(s);for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))%100003;return (h%2001)/1000-1}
function memTraits(hk){try{if(hk==="me")return[];if(hk==="th")return traitsOf("th");const p=mp(hk);return p&&typeof p==="object"?traitsOf(p):[]}catch(e){return[]}}
function memFadeK(hk,s){const C=B();let k=1;for(const t of memTraits(hk)){const f=(C.fadeT||{})[t];if(f)k*=f[s>0?0:1]}
 const p=hk==="me"?S:mp(hk);k*=1+C.fadeJit*jit(hk+"|"+(p&&p.name||""));return Math.max(C.fadeMinK,Math.round(k*100)/100)}
function memFadeOne(hk,L){const C=B();const kg=memFadeK(hk,1),kb=memFadeK(hk,-1);
 for(const m of L){if(m.L)continue;const floor=m.k?Math.round((m.g0||m.g)*C.keepFloor):0;m.g=Math.max(floor,Math.round((m.g-C.fadeMo*(m.s>0?kg:kb))*10)/10)}
 return L.filter(m=>m.g>0)}
/* fade once a month (every holder; deterministic, so host and guest of a co-op room fade the same) */
function memFade(){if(off())return;memMig();const M=memS();if(M._mo===S.turn)return;M._mo=S.turn;
 memDead();
 for(const [hk,H] of memHolders())for(const [a,L] of memPairs(hk,H)){if(!Array.isArray(L)){memSet(hk,a,[]);continue}memSet(hk,a,memFadeOne(hk,L))}}
/* r1 (save stays bounded over a long life): a dead consort remembers nothing more (her .mem goes); the causes kept on her (what was done TO her,
   evidence for later inquiries) shrink to the newest BAL.hook.czDeadMax */
function memDead(){try{const C=BH();for(const v of (typeof rivals!=="undefined"?rivals:[])){if(!v||v.coop||v.alive!==false)continue;if(v.mem)delete v.mem;
  if(v.cz&&typeof v.cz==="object"){const ks=Object.keys(v.cz);if(ks.length>C.czDeadMax){ks.sort((a,b)=>(v.cz[b].w-v.cz[a].w)||((v.cz[b].q||0)-(v.cz[a].q||0)));for(const k of ks.slice(C.czDeadMax))delete v.cz[k]}}}}catch(e){}}
/* "Nhắc lại ân xưa": spend a good memory → the person owes her one ân (j72 ledger) */
/* AG-ALL-2e: p = who invokes (default her); an NPC invoking another NPC's memory of her goes through the same rule (no q72 ledger between NPCs → the liking step) */
function memInvoke(v,p){p=p||S;const C=B();const m=memTop(v,p,1);if(!m||m.g<C.invokeMin)return"";m.g=Math.max(0,m.g-C.invokeCost);
 let owe=false;if(p===S)try{if(typeof q72A==="function"&&typeof q72DebtAdd==="function"){const A=q72A("rv",v.id);if(A){q72DebtAdd(A,1);owe=true}}}catch(e){}
 if(!owe)try{affAdd(v,p,C.invokeAff)}catch(e){}
 if(p!==S)return `${p.name} nhắc ${v.name} chuyện xưa: ${p.name} đã ${phrase(m,v.name)}; ${v.name} quý ${p.name} hơn`;
 return `Ngươi nhắc ${v.name} chuyện xưa: ngươi đã ${phrase(m,"nàng")}. ${v.name} cúi đầu: “Ơn ấy ta chưa trả.”${owe?" Nàng nợ ngươi một ân.":""}`}
Object.assign(window,{memAdd,memList,memScore,memMod,memTop,memLine,memFade,memInvoke,memAgo,memKey:mk,memFadeK,memHolders,memPairs,memFadeWord,memPhrase:phrase,memName:mName,memPron:mPron,memNum:NUMW});/* MOOD-MEM mwWhy reuses these (one phrase / name / pronoun source) */

/* ================= HOOK LEDGER ================= */
const HK_KIND={promise:"Lời hứa",debt:"Ngươi nợ ân",favour:"Nợ ngươi một ân",secret:"Bí mật nắm được",threat:"Bị nắm thóp",proof:"Chứng cứ trong tay",vow:"Lời thề"};
function hkS(){if(!S.hooks||typeof S.hooks!=="object")S.hooks={};const H=S.hooks;H.n=H.n||0;H.L=Array.isArray(H.L)?H.L:[];H.done=Array.isArray(H.done)?H.done:[];return H}
function hookAdd(k,by,on,o){if(off()||!HK_KIND[k])return null;o=o||{};const b=mk(by),t=mk(on);if(!b||!t||b===t)return null;const H=hkS();
 const txt=plainT(o.t||"").slice(0,120);const dup=H.L.find(h=>h.k===k&&h.by===b&&h.on===t&&(h.t||"")===txt);if(dup){dup.w=nowW();return dup.id}
 const h={id:"h"+(++H.n),k,by:b,on:t,t:txt,w:nowW(),dt:dtNow(),str:o.str==="strong"?"strong":"weak",uses:0};if(o.due!=null)h.due=o.due;if(o.src)h.src=String(o.src);if(o.x!=null)h.x=o.x;
 H.L.unshift(h);if(H.L.length>BH().max)H.L.length=BH().max;
 if(!o.quiet&&(b==="me"||t==="me"))try{log(`Ân oán chưa dứt · ${HK_KIND[k]}: ${hookText(h)}.`)}catch(e){}
 return h.id}
/* mirrored hooks: read the systems that already keep these, never copy them */
function hookMirror(){const R=[];try{for(const v of (typeof rivals!=="undefined"?rivals:[])){if(!v||!v.alive)continue;
  if((v.ev||0)>0)R.push({id:"ev:"+v.id,k:"proof",by:"me",on:String(v.id),t:`${v.ev} chứng cứ về ${v.name}`,str:v.ev>=2?"strong":"weak",mir:"ev",n:v.ev});
  const e=(v.evm||{}).me||0;if(e>0)R.push({id:"evm:"+v.id,k:"threat",by:String(v.id),on:"me",t:`${v.name} giữ ${e} chứng cứ về ngươi`,str:e>=2?"strong":"weak",mir:"evm",n:e})}}catch(e){}
 try{if(typeof q72==="function"){const q=q72();for(const k in q.d){const n=q.d[k];if(!n)continue;const who=k.replace(/^rv:/,"");const nm=(q.dn&&q.dn[k])||mName(who);
   R.push(n>0?{id:"q72:"+k,k:"favour",by:"me",on:who,t:`${nm} nợ ngươi ${n>1?n+" ân":"một ân"}`,str:"weak",mir:"q72",n}:{id:"q72:"+k,k:"debt",by:who,on:"me",t:`ngươi nợ ${nm} ${-n>1?(-n)+" ân":"một ân"}`,str:"weak",mir:"q72",n})}
  for(const x of q.a||[]){let X=null;try{X=q72X(x)}catch(e){}if(!X)continue;const who=x.rk==="rv"?String(x.ri):q72Key(X.A);
   R.push({id:"q72a:"+x.u,k:"promise",by:who,on:"me",t:`ngươi đã nhận lời ${X.A.n}: ${plainT(q72Title(X))}`,str:"weak",mir:"q72a",due:x.dl})}}}catch(e){}
 return R}
function hookQuery(f){f=f||{};if(off())return[];const by=f.by!=null?mk(f.by):null,on=f.on!=null?mk(f.on):null,who=f.who!=null?mk(f.who):null;
 let L=hkS().L.slice();if(f.mir!==false)L=L.concat(hookMirror());
 return L.filter(h=>(!f.k||(Array.isArray(f.k)?f.k.includes(h.k):h.k===f.k))&&(by==null||h.by===by)&&(on==null||h.on===on)&&(who==null||h.by===who||h.on===who)&&(!f.src||h.src===f.src)&&(!f.str||h.str===f.str))}
function hookPick(f){const L=hookQuery(Object.assign({},f||{},{mir:f&&f.mir}));return L.length?L.slice().sort((a,b)=>(a.w||0)-(b.w||0))[0]:null}
function hookFind(id){return hkS().L.find(h=>h.id===id)||null}
function hookResolve(id,res,o){if(off()||!id)return false;o=o||{};res=res||"lapsed";id=String(id);
 /* mirrored: act on the owning system */
 if(/^ev:/.test(id)){const v=mp(id.slice(3));if(!v)return false;try{evA(S,v,-(v.ev||0))}catch(e){return false}return true}
 if(/^evm:/.test(id)){const v=mp(id.slice(4));if(!v)return false;try{evA(v,S,-((v.evm||{}).me||0))}catch(e){return false}return true}
 if(/^q72:/.test(id)){const k=id.slice(4);try{const q=q72();const n=q.d[k]||0;if(!n)return false;const A=k.startsWith("rv:")?q72A("rv",k.slice(3)):q72A(k,null);if(A)q72DebtAdd(A,n>0?-1:1);else{q.d[k]=n>0?n-1:n+1;if(!q.d[k])delete q.d[k]}}catch(e){return false}return true}
 if(/^q72a:/.test(id))return false;/* a quest promise ends through its quest (q72End) */
 const H=hkS();const i=H.L.findIndex(h=>h.id===id);if(i<0)return false;const h=H.L.splice(i,1)[0];h.res=res;h.rw=nowW();H.done.unshift(h);if(H.done.length>20)H.done.length=20;
 /* a kept / broken promise is remembered by the one it was made to */
 if(o.mem!==false&&h.k==="promise"&&(res==="kept"||res==="broken")&&alive(h.on)&&alive(h.by))memAdd(h.on,h.by,res==="kept"?"kept":"broken",{quiet:o.quiet});
 if(!o.quiet&&(h.by==="me"||h.on==="me"))try{log(`Ân oán chưa dứt · ${HK_KIND[h.k]}: ${hookText(h)} (${HK_RES[res]||"đã xong"}).`)}catch(e){}
 return true}
const HK_RES={kept:"đã giữ lời",broken:"đã thất hứa",used:"đã dùng",lapsed:"người đã không còn",faded:"chứng cứ đã phai",lost:"bị hủy mất",paid:"đã trả",expired:"đã quá hạn"};
function hookUse(id){const h=hookFind(id);if(!h)return null;const C=BH();if(h.str!=="strong"){hookResolve(id,"used");return{used:1}}
 h.uses=(h.uses||0)+1;const t=mp(h.on);const r={used:1};if(t&&t!==S&&h.by==="me"){try{oanAdd(t,S,C.useOan)}catch(e){}
  if(roll(C.strikeCh+h.uses*C.useStep)){try{evA(t,S,BAL.eff.jmem.evHookUse)}catch(e){}r.strike=1}else if(roll(C.lostCh+h.uses*C.useStep)){hookResolve(id,"lost",{quiet:1});r.lost=1}}
 return r}
function hookLabel(h){return HK_KIND[h&&h.k]||"Chuyện chưa dứt"}
function hookText(h){const r=hookText0(h);return r?r[0].toUpperCase()+r.slice(1):r}
function hookText0(h){if(!h)return"";if(h.mir)return h.t;const by=h.by==="me"?"ngươi":mName(h.by),on=h.on==="me"?"ngươi":mName(h.on);
 const t=h.t?`: ${h.t}`:"";
 switch(h.k){case"secret":return `${by} biết chuyện riêng của ${on}${t}`;case"promise":return `${by} đã nhận lời ${on}${t}`;case"threat":return `${by} nắm thóp ${on}${t}`;
  case"favour":return `${on} nợ ${by} một ân${t}`;case"debt":return `${by} nợ ${on} một ân${t}`;case"vow":return `${by} đã thề trước ${on}${t}`;case"proof":return `${by} giữ chứng cứ về ${on}${t}`}
 return h.t||""}
function hookTick(){if(off())return;const H=hkS();if(H._mo===S.turn)return;H._mo=S.turn;const C=BH();
 for(const h of H.L.slice()){if(!alive(h.by)||!alive(h.on)){hookResolve(h.id,"lapsed",{mem:false,quiet:h.by!=="me"&&h.on!=="me"});continue}
  if(h.due!=null&&nowW()>h.due){hookResolve(h.id,h.k==="promise"?"broken":"expired");continue}
  if(h.k==="secret"&&h.str==="strong"&&roll(C.fadeCh)){hookResolve(h.id,"faded");continue}}}
Object.assign(window,{hookAdd,hookQuery,hookPick,hookResolve,hookUse,hookLabel,hookText,hookTick,hookFind,HK_KIND});

/* ================= CAUSE LEDGER (owner 16/11 13:40Z ONE LEDGER (b)): every act between two people is recorded with its REASON =================
   Same ledger family as the hooks (jmem), hidden from her, kept by the game so main can answer "who did what to whom, and why".
   A record {w week, dt, q seq, by, to, a act key, n act word, d deed (MEM_DEEDS, when the act has one), x extra, s +1 kind / −1 hostile,
   r result "ok"|"fail", y reason {k kind, c earlier record id, d, x}} lives on the side that is WORLD state, so co-op hosts and guests see
   the same ledger: on the target when it is an NPC / the Emperor / Thái hậu / a servant, else on the doer, else (her and the friend) in her
   own S.hooks.cz. Keys "by"/"to" are mapped to the player id in co-op (jcoopworld REFF).
   Reason kinds (causeWhy, from the doer's state BEFORE the act; only what the doer KNOWS — a memory — can make a retaliation):
     tra  trả đũa: the doer remembers a hostile deed of the target (memory m.c = that earlier record)   on   đáp ơn: remembers a kind deed
     mem / nho  remembers (no record: an old save or an event)   ghen  jealous of the target's favour   oan  old grudge (Oán)   ghet  dislike
     ngo  wrongly or rightly believes the target was behind an earlier blow   nong  hot temper after a slight   tv  ambition (aims higher)
     than  close to the target   net  plain nết   toi  a stated offence (punishments)   su  inside an event   lenh  ordered by someone   chon  her own choice
   API: causeAdd(by,to,act,{s,n,d,x,r,y}) → id · causeWhy(by,to,s) → y · causeQuery({by,to,who,a,since,limit}) → records newest first ·
        causeGet(id) · causeText(rec) (the reason clause) · causeLine(rec) (whole line) · window.causeLog(filter) → lines (for main / tests). */
function czMine(){const H=hkS();if(!H.cz||typeof H.cz!=="object"||Array.isArray(H.cz))H.cz={};return H.cz}
function czOf(o){if(!o.cz||typeof o.cz!=="object"||Array.isArray(o.cz))o.cz={};return o.cz}
function czHomes(){const R=[czMine()];try{if(S.emp&&S.emp.cz)R.push(S.emp.cz);if(S.thO&&S.thO.cz)R.push(S.thO.cz);
  for(const v of (typeof rivals!=="undefined"?rivals:[])){if(v&&!v.coop&&v.cz)R.push(v.cz);if(v&&v.staff)for(const s of v.staff)if(s&&!s.coop&&s.cz)R.push(s.cz)}
  for(const s of S.staff||[])if(s&&s.cz)R.push(s.cz)}catch(e){}return R}
function czPrune(Z){const C=BH();const ks=Object.keys(Z);if(ks.length<=C.czMax)return;ks.sort((a,b)=>(Z[a].w-Z[b].w)||((Z[a].q||0)-(Z[b].q||0)));
 for(const k of ks.slice(0,ks.length-C.czMax))delete Z[k]}
function causeWhy(b,t,s){b=mk(b);t=mk(t);s=s>0?1:-1;try{
 const m=memTop(b,t,s);if(m&&m.g>=B().faint)return m.c?{k:s<0?"tra":"on",c:m.c,d:m.d,x:m.x||""}:{k:s<0?"mem":"nho",d:m.d,x:m.x||""};
 if(b==="me")return{k:"chon"};
 const v=mp(b),T=mp(t);if(!v||typeof v!=="object")return{k:"net",x:""};const tr=(traitsOf(v)||[])[0]||"";
 const tObj=T&&typeof T==="object"&&(T===S||T.id!=null);
 if(s>0)return tObj&&aff(v,T)>=BH().czClose?{k:"than"}:{k:"net",x:tr};
 if(v.slightAt!=null&&typeof bq==="function"&&bq()-v.slightAt<=BH().czRash)return{k:"nong"};
 if(!tObj)return{k:"net",x:tr};
 const g=T===S?(v.ghen||0):Math.max(0,((T.sung||0)-(v.sung||0))/BH().czGhenDiv),oa=oan(v,T),ha=Math.max(0,-aff(v,T));const mx=Math.max(g,oa,ha);
 if(v.blamed&&v.blamed[key(T)]&&oa>=mx)return{k:"ngo"};
 if(traitsOf(v).includes("Tham vọng")&&rkOf(T)>rkOf(v)&&mx<BH().czTv)return{k:"tv"};
 if(mx<=0)return{k:"net",x:tr};return mx===g?{k:"ghen"}:mx===oa?{k:"oan"}:{k:"ghet"}}catch(e){return{k:"net",x:""}}}
function causeAdd(by,to,a,o){if(off())return null;o=o||{};const b=mk(by),t=mk(to);if(!b||!t||b===t||!isP(b)||!isP(t))return null;
 const s=o.s>0?1:-1;const y=o.y||causeWhy(b,t,s);
 const home=hObj(t)||hObj(b);const Z=home?czOf(home):czMine();const H=hkS();H.cn=(H.cn||0)+1;
 let tag="";try{tag=(window.COOPW&&COOPW.seat)||""}catch(e){}const id="c"+tag+(S.turn||0)+"."+H.cn;
 const r={w:nowW(),dt:dtNow(),q:H.cn,by:b,to:t,a:String(a||""),s,y};if(o.n)r.n=plainT(o.n).slice(0,40);if(o.d&&MEM_DEEDS[o.d])r.d=o.d;if(o.x)r.x=plainT(o.x).slice(0,60);if(o.r)r.r=o.r;
 Z[id]=r;czPrune(Z);return id}
function causeQuery(f){f=f||{};if(off())return[];const by=f.by!=null?mk(f.by):null,to=f.to!=null?mk(f.to):null,who=f.who!=null?mk(f.who):null;const R=[];
 for(const Z of czHomes())for(const id in Z){const r=Z[id];if(!r||typeof r!=="object")continue;if(by!=null&&r.by!==by)continue;if(to!=null&&r.to!==to)continue;
  if(who!=null&&r.by!==who&&r.to!==who)continue;if(f.a&&r.a!==f.a)continue;if(f.since!=null&&r.w<f.since)continue;if(f.s&&r.s!==f.s)continue;R.push(Object.assign({id},r))}
 R.sort((p,q)=>(q.w-p.w)||((q.q||0)-(p.q||0)));return f.limit?R.slice(0,f.limit):R}
function causeGet(id){if(!id)return null;for(const Z of czHomes())if(Z[id])return Object.assign({id},Z[id]);return null}
const czNm=k=>k==="me"?"ngươi":mName(k);
function czDid(r){return `${czNm(r.by)} ${r.d?phrase({d:r.d,x:r.x},czNm(r.to)):(r.n||"ra tay với")+" "+czNm(r.to)}`}
function causeText(r){const y=(r&&r.y)||{};const to=czNm(r.to);const old=y.c?causeGet(y.c):null;const D=y.d?{d:y.d,x:y.x}:null;
 switch(y.k){case"tra":return old?`trả đũa chuyện ${czDid(old)}`:D?`trả đũa chuyện ${to} đã ${phrase(D,czNm(r.by))}`:`trả đũa chuyện cũ`;
  case"on":return old?`đáp lại chuyện ${czDid(old)}`:D?`đáp ơn ${to} đã ${phrase(D,czNm(r.by))}`:`đáp ơn cũ`;
  case"mem":return D?`vì còn nhớ ${to} đã ${phrase(D,czNm(r.by))}`:"vì chuyện cũ";case"nho":return D?`vì nhớ ơn ${to} đã ${phrase(D,czNm(r.by))}`:"vì ơn cũ";
  case"ghen":return `vì ghen ${to} được sủng`;case"oan":return `vì oán ${to} từ trước`;case"ghet":return `vì ghét ${to}`;case"ngo":return `vì ngờ ${to} đứng sau chuyện cũ`;
  case"nong":return "vì nóng giận nhất thời";case"tv":return "vì tham vọng muốn trèo cao";case"than":return `vì thân với ${to}`;
  case"toi":return y.x?`vì ${y.x}`:"vì có tội";case"su":return y.x?`trong chuyện “${y.x}”`:"trong một chuyện cũ";case"lenh":return y.x?`theo lệnh ${y.x}`:"vì bị sai khiến";
  case"chon":return `theo ý ${czNm(r.by)}`;case"net":return y.x?`vì nết ${String(y.x).toLowerCase()}`:"vì tính vốn vậy"}
 return "vì tính vốn vậy"}
function causeLine(r){const l=czDid(r);return `${l[0].toUpperCase()+l.slice(1)} (${causeText(r)})${r.r==="fail"?" nhưng không thành":""}`}
window.causeLog=f=>causeQuery(f).map(r=>`${r.dt} · ${causeLine(r)}`);
Object.assign(window,{causeAdd,causeWhy,causeQuery,causeGet,causeText,causeLine});

/* ================= MEMORY-DRIVEN BEHAVIOUR (owner 16/11 13:25Z: "ảnh hưởng tới cái cách hành xử của một nhân vật đối với một nhân vật") =================
   What a person remembers about another changes how they act toward that one (all numbers BAL.mem):
   (1) target choice: hostility −memMod (below, unchanged);  (2) danger: a remembered wrong keeps the will to harm alive after Oán fades
       (worst bad memory × memDanger, × lifeDanger when lifelong, ≤ dangerMax; Hiền lành's harmGate still holds), and a person who owes a big
       kindness (good weights ≥ goodGate and > goodOver × the worst wrong) will not harm that one at all (OD:L35 "favour never secretly harms");
   (3) revenge in kind: an act like the remembered wrong weighs (1 + g/mirrorDiv) more in the NPC mind (MIRROR);  (4) everyday dealings
       (npcSocial): who they turn to (1 + |memory|/socDiv) and what they do (kind acts × (1+good/socK) toward a friend, hostile ones toward a foe);
   (5) servants: memories of the mistress / of a briber shift the loyalty used by bribe odds (memMod × srvLoy). */
const MIRROR={spy:["spy"],rumor:["rumor"],frame:["frame","accuse"],poison:["poison"],accuse:["accuse","frame"],bribe:["bribe"],block:["block"],plant:["plant"],steal:["steal","block"],
 musk:["musk","poison"],kidharm:["kpoison","pond","kframe","ksab","catswap"],takeaway:["takeaway"],provoke:["trip","rumor"],vent:["trip","rumor"],humiliate:["rumor","trip"],
 gifttaint:["poison","plant"],scheme:["rumor","trip"],nightsteal:["block"],drop:["rumor"],pressed:["accuse","spy"]};
const SOC_GOOD=["help","visit","warn","mediate","apologise","ally"],SOC_BAD=["provoke","humiliate","drop","steal","spy","test"];
if(typeof danger==="function"){const d0=danger;danger=function(v,t){let d=d0.apply(this,arguments);try{if(off()||!v||!t||v===S||v===t)return d;const L=memList(v,t);if(!L.length)return d;const C=B();
 let hate=0,good=0;for(const m of L){if(m.s<0)hate=Math.max(hate,m.g*(m.L?C.lifeDanger:C.memDanger));else good+=m.g}
 const gate=persF(v,"harmGate",0);if(hate>0&&!(gate&&hate<gate))d=Math.max(d,Math.round(Math.min(C.dangerMax,hate)+persF(v,"dang",0)));
 if(good>=C.goodGate&&good>hate*C.goodOver)d=Math.min(d,BANDS[1][0]-1)}catch(e){}return d}}
if(typeof mindMenu==="function"){const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{if(off()||!Array.isArray(O)||!O.length)return O;
 const L=memList(v,t).filter(m=>m.s<0);if(!L.length)return O;const C=B();for(const x of O)for(const m of L){const A=MIRROR[m.d];if(A&&A.includes(x[0]))x[1]*=1+m.g/C.mirrorDiv}}catch(e){}return O}}
if(typeof npcSocial==="function"&&typeof SOC==="object"){const s0=npcSocial;npcSocial=function(v){if(off())return s0.apply(this,arguments);
 const T=others(v);if(!T.length)return"";const C=B();const W=T.map(t=>1+Math.abs(memScore(v,t))/C.socDiv);let r=Math.random()*W.reduce((a,b)=>a+b,0),i=0;while(r>W[i]&&i<W.length-1){r-=W[i];i++}
 const t=T[i];const sc=memScore(v,t);const O=[];
 for(const k in SOC){const s=SOC[k];let w=s.w*persW(v,k);if(SOC_GOOD.includes(k))w*=sc>0?1+sc/C.socK:1/(1-sc/C.socK);else if(SOC_BAD.includes(k))w*=sc<0?1-sc/C.socK:1/(1+sc/C.socK);
  if(w>0&&s.ok(v,t))O.push([k,w])}if(!O.length)return"";
 r=Math.random()*O.reduce((a,b)=>a+b[1],0);i=0;while(r>O[i][1]&&i<O.length-1){r-=O[i][1];i++}const k=O[i][0];persCount(v,k);if(k==="idle")return"";const txt=SOC[k].run(v,t);
 if(txt)newsAdd(v,k,txt,t===S||v.id===undefined);return t===S&&txt?txt+". ":""}}
function srvShift(s,a){try{const o=ownerOf(s);if(!o||off())return 0;const C=B();return Math.round(memMod(s,o)*C.srvLoy-(a&&a!==o?memMod(s,a)*C.srvLoy:0))}catch(e){return 0}}
if(typeof bribeServ==="function"){const b0=bribeServ;bribeServ=function(a,s){const d=s?srvShift(s,a):0;if(d)s.loyal+=d;let r;try{r=b0.apply(this,arguments)}finally{if(d)s.loyal-=d}
 try{if(r&&a&&s)causeAdd(a,s,"muachuoc",{n:"mua chuộc",s:-1})}catch(e){}return r}}
if(typeof threatServ==="function"){const t0=threatServ;threatServ=function(a,s){const r=t0.apply(this,arguments);try{if(r&&a&&s){const c=causeAdd(a,s,"doa",{n:"dọa",s:-1});memAdd(s,a,"threat",{c})}}catch(e){}return r}}

/* ================= WRITERS: wrap the acts that already exist (memories + the cause ledger; whole family list: dev/PROGRESS_review-mem-upgrade.md) ================= */
let SUP=0,CAUGHT=null,CTX=null;
const sup=f=>{SUP++;try{return f()}finally{SUP--}};
const isFail=r=>typeof FAILRX!=="undefined"&&FAILRX.test(plainT(r));
const ACT_GOOD=["ally","gift","help","warn","mediate","visit","care","xinhh","serveTH"];
if(typeof caught==="function"){const c0=caught;caught=function(a,t){const r=c0.apply(this,arguments);if(r)CAUGHT={a,t};return r}}
/* 1. runAct: every scheme / act between two people (her ↔ NPC, NPC ↔ NPC, her ↔ the co-op friend): cause always (hidden), memory only when seen */
if(typeof runAct==="function"){const r0=runAct;runAct=function(a,t,k){if(off()||!a||!t||a===t)return r0.apply(this,arguments);
 let af0=0,ev0=0;try{af0=aff(t,a);ev0=evG(t,a)}catch(e){}const s=ACT_GOOD.includes(k)?1:-1;let y=null;try{y=causeWhy(a,t,s)}catch(e){}
 CAUGHT=null;const r=sup(()=>r0.apply(this,arguments));
 try{if(r&&k!=="gift"){const d=ACT2DEED[k]||"scheme";const x=d==="scheme"&&ACT[k]?ACT[k].n.toLowerCase():"";
   const c=causeAdd(a,t,k,{s,y,n:ACT[k]?ACT[k].n:k,d,x,r:isFail(r)?"fail":"ok"});
   const dAf=aff(t,a)-af0,dEv=evG(t,a)-ev0;const seen=(CAUGHT&&CAUGHT.a===a&&CAUGHT.t===t)||k==="accuse"||dEv>0;
   if(k==="ally"){if(dAf>0)memAdd(t,a,"ally",{c})}
   else if(seen||dAf<=-B().seenAf)memAdd(t,a,d,{x,c})}}catch(e){}
 CAUGHT=null;return r}}
/* 2. giveTo: gifts (a tainted gift is a hostile act whatever the face of it) */
if(typeof giveTo==="function"){const g0=giveTo;giveTo=function(a,r,ix){if(off())return g0.apply(this,arguments);let nm="",tn=0,af0=0,y=null;const R=r==="emp"?S.emp:r==="th"?"th":r;
 try{const e=a.inv[ix];nm=e?iname(e):"";tn=e&&e.t?1:0;if(R&&typeof R==="object"&&R!==S.emp)af0=aff(R,a);y=causeWhy(a,R,tn?-1:1)}catch(x){}
 const out=sup(()=>g0.apply(this,arguments));
 try{if(out&&nm&&R){let d="gift";if(typeof R==="object"&&R!==S.emp){const dA=aff(R,a)-af0;d=dA<=-B().taintAf&&tn?"gifttaint":dA<0?"giftbad":"gift"}
   const c=causeAdd(a,R,"gift",{s:tn?-1:1,y,n:"tặng quà",d:tn?"gifttaint":"gift",x:nm});memAdd(R,a,d,{x:nm,c})}}catch(x){}
 return out}}
/* 3. empAct: her Hoàng hậu powers over a consort */
if(typeof empAct==="function"){const e0=empAct;empAct=function(i,k){const v=typeof rivals!=="undefined"?rivals[i]:null;const s0=S&&S.logSeq||0;const sg=k==="reward"||k==="pardon"?1:-1;let y=null;try{if(v)y=causeWhy(S,v,sg)}catch(e){}
 const r=sup(()=>e0.apply(this,arguments));
 try{if(v&&(S.logSeq||0)>s0&&["cutpay","conf","reward","pardon","judge"].includes(k)){const c=causeAdd(S,v,k,{s:sg,y,d:k});memAdd(v,S,k,{c})}}catch(e){}return r}}
const TALK2DEED={"Chia sẻ bí mật":"secret","Hỏi han sức khỏe":"care","Tạ lỗi":"apology","Nhún nhường":"humble","Khiêu khích":"provoke","Trút giận":"vent"};
/* 4. q72End: favours she did (or botched) for someone */
if(typeof q72End==="function"){const q0=q72End;q72End=function(x,res,X){let A=null;try{X=X||q72X(x);A=X&&X.A}catch(e){}const r=sup(()=>q0.apply(this,arguments));
 try{if(A&&A.k==="rv"&&A.o){const d=res==="ok"?"helped":res==="bad"?"exposed":res==="fail"?"failed":null;if(d){const c=causeAdd(S,A.o,"q72",{s:1,y:{k:"su",x:plainT(q72Title(X)).slice(0,40)},n:"giúp việc",d,r:res==="ok"?"ok":"fail"});memAdd(A.o,S,d,{c})}}}catch(e){}return r}}
/* 5. a big relation swing inside an event (no specific deed above) = a generic memory named after the event (cause: that event) */
if(typeof chooseM==="function"){const c0=chooseM;chooseM=function(i){try{const m=Q[0];if(m&&m.t)CTX={t:plainT(m.t).replace(/[.:]\s*$/,"").slice(0,40),at:Date.now()}}catch(e){}return c0.apply(this,arguments)}}
if(typeof relAdd==="function"){const l0=relAdd;relAdd=function(x,y,n){const r=l0.apply(this,arguments);
 try{if(!off()&&!SUP&&n&&Math.abs(n)>=B().relMin&&CTX&&Date.now()-CTX.at<6000&&(x===S||y===S)){const o=x===S?y:x;if(o&&o!==S&&o.id!=null&&o.alive&&!(typeof relMS==="function"&&relMS(o))){/* rel-men-servants: memories are the consorts' (men / servants keep the bars only) */const d=n>0?"good":"bad";
   const c=causeAdd(S,o,"event",{s:n>0?1:-1,y:{k:"su",x:CTX.t},n:"trong chuyện",d,x:CTX.t});memAdd(o,S,d,{g:Math.min(B().relCap,Math.abs(n)),x:CTX.t,c,life:Math.abs(n)>=B().lifeRel})}}}catch(e){}return r}}
/* secrets she sees are already written as notes (j21 noteAdd): an affair, a pregnancy that matches no night → a strong "secret" hook */
if(typeof noteAdd==="function"){const n0=noteAdd;noteAdd=function(id,t){const r=n0.apply(this,arguments);
 try{if(!off()&&/tư thông với|không khớp đêm thị tẩm/.test(String(t||""))){const v=mp(id);if(v&&v!==S)hookAdd("secret","me",v,{t:/tư thông/.test(t)?"chuyện tư thông":"cái thai không khớp sổ Kính sự phòng",str:"strong",src:"note"})}}catch(e){}return r}}
/* 6. npcSocial acts (SOC): everyday kindness and spite between people → the one it was done to remembers; cause always */
/*    (test = thử lòng: a cause only; feign = a hostile plan wearing a kind face: the cause is hostile, the target remembers kindness) */
const SOC2DEED={help:"help",visit:"visit",warn:"warn",mediate:"mediate",provoke:"provoke",humiliate:"humiliate",spy:"spy",ally:"ally",drop:"drop",steal:"nightsteal",feign:"care",apologise:"apology",test:null};
if(typeof SOC==="object")for(const k in SOC2DEED){const s=SOC[k];if(!s||typeof s.run!=="function")continue;const run0=s.run;const d=SOC2DEED[k];const sg=k==="feign"||k==="test"?-1:MEM_DEEDS[d][0];
 s.run=function(v,t){if(off()||!v||!t||v===t)return run0.apply(this,arguments);let y=null;try{y=causeWhy(v,t,sg)}catch(e){}const r=run0.apply(this,arguments);
  try{if(r){const c=causeAdd(v,t,k,{s:sg,y,n:k,d:d||""});if(d)memAdd(t,v,d,{c});if(k==="mediate")memAdd(S,v,"mediate",{c})}}catch(e){}return r}}
/* 7. punish: the Emperor's cấm túc / giáng (j8), the stated offence is the cause */
if(typeof punish==="function"){const p0=punish;punish=function(p,why,sev){let P=p,W=why;if(typeof p==="string"){W=p;P=S}const rk0=P?rkOf(P):0;const r=p0.apply(this,arguments);
 try{if(!off()&&P){const dem=rkOf(P)<rk0;const c=causeAdd("emp",P,"punish",{s:-1,y:{k:"toi",x:plainT(W).slice(0,50)},n:dem?"giáng":"cấm túc",d:dem?"demote":"confine"});memAdd(P,"emp",dem?"demote":"confine",{c,quiet:1})}}catch(e){}return r}}
/* 8. servAct: her dealings with her own servants (thưởng / phạt / che chở); 9. bribeServ / threatServ (above, any doer) */
if(typeof servAct==="function"){const v0=servAct;servAct=function(a,id){let s=null;try{s=servById(id)}catch(e){}const s0=S&&S.logSeq||0;const D={thuong:"srvreward",phat:"srvpunish",che:"srvshield"}[a];
 const sg=D?MEM_DEEDS[D][0]:0;let y=null;try{if(s&&D)y=causeWhy(S,s,sg)}catch(e){}const r=v0.apply(this,arguments);
 try{if(s&&D&&(S.logSeq||0)>s0){const c=causeAdd(S,s,a,{s:sg,y,d:D});memAdd(s,S,D,{c,quiet:1})}}catch(e){}return r}}
/* monthly: fade + ledger tick (oanMonth runs once a month on every road) */
if(typeof oanMonth==="function"){const o0=oanMonth;oanMonth=function(){const r=o0.apply(this,arguments);try{memFade();hookTick()}catch(e){console.error("mem",e)}return r}}

/* ================= RECALL: odds, NPC minds, talk ================= */
if(typeof oAlly==="function"){const a0=oAlly;oAlly=function(a,t){const o=a0.apply(this,arguments);try{return typeof o==="number"?oddsCl(o+memMod(t,a)):o}catch(e){return o}}}
if(typeof hostility==="function"){const h0=hostility;hostility=function(v,t){const h=h0.apply(this,arguments);try{return h-memMod(v,t)}catch(e){return h}}}
if(typeof talkOpts==="function"){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{if(off()||!p||!Array.isArray(A))return A;const v=p.ref;
 if(!(p.kind==="rival"||p.kind==="hh")||!v||v===S)return A;const md=memMod(v,S);
 if(md)A.forEach(a=>{if(a&&typeof a.o==="number"&&a.o>0&&a.o<100)a.o=oddsCl(a.o+md)});
 const C=B();const good=memTop(v,S,1);
 if(good&&good.g>=C.invokeMin&&!A.some(a=>a&&a.n==="Nhắc lại ân xưa"))A.push({n:"Nhắc lại ân xưa",o:100,x:`nàng nợ ngươi một ân · kỷ niệm ${MEM_DEEDS[good.d]?"“"+phrase(good,"nàng")+"”":""} phai bớt`,run:()=>memInvoke(v)});
 const sec=hookQuery({k:"secret",by:"me",on:v,mir:false}).find(h=>h.str==="strong");
 if(sec&&!A.some(a=>a&&a.n==="Lấy chuyện riêng ép nàng")){const H=BH();const o=od(H.pressBase+S.tamco/H.tcDiv);
  A.push({n:"Lấy chuyện riêng ép nàng",o,x:`nàng nợ ngươi một ân, oán ngươi +${H.useOan} · nàng ra tay trước: ${chanceW(H.strikeCh+(sec.uses+1)*H.useStep)} · bí mật bị hủy: ${chanceW(H.lostCh+(sec.uses+1)*H.useStep)}`,
   run:()=>{if(!roll(o)){relAdd(S,v,-H.failRel);return `${v.name} cười nhạt, không chịu khuất phục. Nàng quý ngươi -${H.failRel}.`}
    try{const Aq=q72A("rv",v.id);if(Aq)q72DebtAdd(Aq,1)}catch(e){}const u=hookUse(sec.id)||{};memAdd(v,S,"pressed",{quiet:1});
    return `${v.name} tái mặt, đành nhận lời. Nàng nợ ngươi một ân, oán ngươi +${H.useOan}.${u.strike?` Nhưng nàng cũng lén nắm lại chứng cứ của ngươi.`:""}${u.lost?" Sau đó nàng tìm cách xóa sạch dấu vết: bí mật không còn dùng được.":""}`}})}}catch(e){console.error("mem talk",e)}return A}}
if(typeof talk==="function"){const k0=talk;talk=function(oi){let p=null,a=null;try{p=curPeople()[popIdx];a=p&&talkOpts(p)[oi]}catch(e){}const s0=S&&S.logSeq||0;const m0=typeof popMsg==="string"?popMsg:"";let Y=null;
 try{if(a&&p&&p.ref&&p.ref!==S){const d=TALK2DEED[a.n];Y=causeWhy(S,p.ref,(d?MEM_DEEDS[d][0]<0:a.n==="Lấy chuyện riêng ép nàng")?-1:1)}}catch(e){}
 const r=sup(()=>k0.apply(this,arguments));
 try{if(off()||!p||!a||!p.ref||p.ref===S)return r;const v=p.ref;const did=(S.logSeq||0)>s0||popMsg!==m0;if(!did)return r;
  const d=TALK2DEED[a.n];const okT=a.o>=100||/class="g">thành/.test(popMsg||"");const bad=d?MEM_DEEDS[d][0]<0:a.n==="Lấy chuyện riêng ép nàng";
  const c=causeAdd(S,v,"talk",{s:bad?-1:1,y:Y,n:a.n,d:d||(bad?"pressed":""),r:okT?"ok":"fail"});if(d&&okT)memAdd(v,S,d,{c});
  /* the person brings up the strongest memory (once a month per person) */
  const C=B();const M=memS();M._rc=M._rc||{};const top=memTop(v,S);const k=mk(v);
  if(top&&top.g>=C.recallMin&&a.n!=="Nhắc lại ân xưa"&&(M._rc[k]==null||nowW()-M._rc[k]>=C.recallCd)&&typeof popMsg==="string"&&popMsg){M._rc[k]=nowW();popMsg=`${v.name}: “${memLine(v,S,top)}” `+popMsg}}catch(e){}
 return r}}

/* ================= PERSON CARD: "Kỷ niệm" + "Ân oán chưa dứt" blocks (kitRows, via jpcf PCF_X) ================= */
function pcfMem(e){try{if(off()||typeof kitRows!=="function")return"";const k=mk(e);if(!k||k==="me")return"";const pr=mPron(k);
 const lab=m=>{const a=memAgo(m.w);return a[0].toUpperCase()+a.slice(1)};const theirs=memList(k,"me").map(m=>[lab(m),`${pr[0].toUpperCase()+pr.slice(1)} nhớ: ngươi đã ${phrase(m,pr)} (${memFadeWord(m)})`,m.s>0?"g":"r",m]);
 const mine=memList("me",k).map(m=>[lab(m),`Ngươi nhớ: ${mName(k)} đã ${phrase(m,"ngươi")} (${memFadeWord(m)})`,m.s>0?"g":"r",m]);
 const rows=theirs.concat(mine).sort((a,b)=>b[3].g-a[3].g).slice(0,4).map(r=>r.slice(0,3));
 if(!rows.length)return"";const top=memTop(k,"me");const md=memMod(k,"me");
 const say=top&&top.g>=B().recallMin?`<div class="kpnote">“${memLine(k,"me",top)}”</div>`:"";
 const lean=md?[["Lòng nhớ",md>0?`ơn cũ khiến ${pr} dễ nghe ngươi hơn`:`hận cũ khiến ${pr} khó nghe ngươi hơn`,md>0?"g":"r"]]:[];
 return `<div class="kpsec kpno">${say}${kitRows(rows.concat(lean))}</div>`}catch(x){return""}}
function pcfHook(e){try{if(off()||typeof kitRows!=="function")return"";const k=mk(e);if(!k||k==="me")return"";
 const L=hookQuery({who:k}).filter(h=>h.by==="me"||h.on==="me");if(!L.length)return"";
 const rows=L.slice(0,4).map(h=>[hookLabel(h),hookText(h)+(h.due!=null?` (còn ${Math.max(0,h.due-nowW())} tuần)`:""),h.by==="me"&&h.k!=="promise"?"g":h.on==="me"&&(h.k==="threat"||h.k==="debt")?"r":"n"]);
 return `<div class="kpsec kpno">${kitRows(rows)}</div>`}catch(x){return""}}
const PX=window.PCF_X=window.PCF_X||[];PX.push(pcfMem,pcfHook);
window.pcfMem=pcfMem;window.pcfHook=pcfHook;
})();
