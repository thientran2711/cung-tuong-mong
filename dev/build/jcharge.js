/* ================= CHARGE-EVIDENCE (review/charge-evidence, Foreman D job D4 option A; owner 26/11 ~05:15Z «D4 A», find odds ~05:35Z, verbatim in OD) =================
   Evidence is kept PER CHARGE (tội danh, BAL.charge.C): each accusation needs its own pieces of its own kind, never a total count.
   1. STORE: holder h → target t → charge c: h.evc[key(t)][c] (the player's too: S.evc). The old total (t.ev / h.evm, jtruth-capped) stays the
      sum of the pieces; chSync keeps both equal — an old save or any direct write of the total is spread onto the target's real deeds
      (newest first, each charge up to its cap) or taken back from the fullest charge.
   2. A PIECE EXISTS ONLY FOR A REAL DEED (law 6a, jtruth): charge cap = the deeds of that charge (DEEDW weights), at least the pieces the
      charge needs once she really did one (one real deed leaves enough traces); no deed of that charge → 0. deedCap = the sum (jtruth reads it).
   3. SEARCH = one roll per piece (chFind, all numbers BAL.charge): base band of the crime + the MASTER's Tâm cơ vs the target's + the sent
      servant (small) + Tai mắt + guard + each earlier miss. Every search road runs inside chSearch(h, servant, fn); outside it a gain is a
      certain piece (caught in the act, a confession, a frame exposed). A miss says so in plain words (never «không có gì sai trái» when
      she did wrong) and makes the next search of that charge easier; someone searching HER is reported by her Tai mắt (two-way).
   4. ACCUSING = one charge whose pieces are full (chReady); the punishment follows that charge (BAL.charge.C[c].pun, one punishment, D1),
      only that charge's pieces are spent, and her notice lists the charge and each piece (punEvTxt). Same rule for every consort (law 1).
   ============================================================================================================================ */
let CHS=null,CHLAST=null,CHX=null,CHLASTC=null,CHSKIP=null;
function chB(){return BAL.charge}
function chC(c){return BAL.charge.C[c]||null}
function chOfDeed(k){return BAL.charge.deed[k]||"uh"}
function chName(c){const C=chC(c);return C?C.n:"tội khác"}
/* pieces to accuse t of charge c: a plain count = the weight's need (BAL.charge.tier) + t's rank group (BAL.charge.rkPlus), owner OD 26/11 ~21:00Z */
function chNeed(t,c){const C=chC(c);if(!C)return 99;return chB().tier[t?chTier(t,c):C.tier].need+(t?chB().rkPlus[Math.max(0,Math.min(7,rkOf(t)))]||0:0)}
/* the WEIGHT of charge c on t: its base tier; TỬ TỘI when one of her deeds of that charge is a tuDeed (khi quân trọng tội) or a mưu hại aimed at a tuTgt (Hoàng thượng) */
function chTier(t,c){const C=chC(c);if(!C)return"nhe";if(t){const D=chDeedMap(t)[c];const B=chB();if(D&&D.list&&D.list.some(d=>d&&(B.tuDeed.includes(d.k)||(c==="mh"&&d.t!=null&&B.tuTgt.includes(d.t)))))return"tu"}return C.tier}
function chTierN(t,c){return punTierN(chTier(t,c))}
/* «tội X (nặng)» — every place that names a charge with its pieces shows its weight */
function chNameW(t,c){return `${chName(c)} (${chTierN(t,c)})`}
/* band (0..6, the 7 equal odds bands) → the middle odds of that band */
function chBandO(b){const K=BAL.odds.cut,lo=BAL.odds.lo,hi=BAL.odds.hi;b=Math.max(0,Math.min(K.length,b|0));const a=b===0?lo:K[b-1],z=b===K.length?hi:K[b]-1;return Math.round((a+z)/2)}
/* the target's real deeds per charge (memo per day and ledger size) */
const CHM=new Map();
function chDeedMap(t){if(!t)return{};let L=[];try{L=deedsOf(t)}catch(e){}const sig=wk()+":"+L.length+":"+(t.dw||0);const m=CHM.get(t);if(m&&m.sig===sig)return m.map;
 const map={};const ord=[];for(let i=L.length-1;i>=0;i--){const d=L[i];if(!d)continue;const c=chOfDeed(d.k);if(!map[c]){map[c]={w:0,list:[]};ord.push(c)}map[c].w+=(d.w||1);map[c].list.push(d)}
 map._ord=ord;CHM.set(t,{sig,map});if(CHM.size>80)CHM.delete(CHM.keys().next().value);return map}
function chCapC(t,c){const D=chDeedMap(t)[c];if(!D||!D.w)return 0;return Math.max(chNeed(t,c),D.w)}
function chOrd(t){return (chDeedMap(t)._ord||[]).slice()}
function chStore(h,t){h.evc=h.evc||{};const k=key(t);return h.evc[k]||(h.evc[k]={})}
function chMissS(h,t){h.evq=h.evq||{};const k=key(t);return h.evq[k]||(h.evq[k]={})}
function chSum(m){let s=0;for(const c in m)s+=(m[c]||0);return s}
/* keep the pieces equal to the total (old saves, direct writes): spread onto real deeds / take back from the fullest charge */
function chSync(h,t){if(!h||!t||h===t)return{};const m=chStore(h,t);let tot=0;try{tot=evG(h,t)}catch(e){}let s=chSum(m);if(s===tot)return m;
 if(s>tot){while(s>tot){let b=null;for(const c in m)if((m[c]||0)>0&&(b==null||m[c]>m[b]))b=c;if(!b)break;m[b]--;s--;if(!m[b])delete m[b]}return m}
 let x=tot-s;const O=chOrd(t);for(const c of O){while(x>0&&(m[c]||0)<chCapC(t,c)){m[c]=(m[c]||0)+1;x--}}
 if(x>0){const c=O[0]||"uh";m[c]=(m[c]||0)+x}return m}
function chHave(h,t,c){if(!h||!t||h===t)return 0;return chSync(h,t)[c]||0}
/* ---------- PUNISH-TIER-3: NHÂN CHỨNG kept apart from CHỨNG CỨ (BAL.charge.wit; owner OD 26/11 ~21:10Z / ~21:17Z / ~21:40Z) ----------
   REAL-PROOF (owner 27/11 ~00:10Z «Bằng chứng và nhân chứng có thật trong game không vậy, hay chỉ là 1 con số đó ?», law 6 real evidence / real people):
   a witness is a REAL living person who was REALLY there. t.wsee[c] = the people (ledger ids, j95 ledgerId) who stood at the place where t did a
   deed of charge c in its khắc — read from the one day record (agRec, the same place/khắc rows the agent witness path AG1b / agSeeNpc reads) when
   the deed is written (deedAdd), and at a tryst (j95secApply rows). h.ewc[key(t)][c] = the witnesses holder h has found = ids taken from t.wsee[c]
   (never h, never t), stored by id, shown by NAME. No real witness → no witness; a witness who dies no longer counts. Witnesses are only counted:
   no buy-off / recant / silence (owner ~21:35Z). Same for her and every NPC (law 1).
   OLD SAVE: a count held before (a number, or pieces from before witnesses existed) becomes the real people t.wsee holds, at most that count. */
function chWitNeed(t,c){const C=chC(c);if(!C)return 0;return (chB().wit.need[t?chTier(t,c):C.tier])|0}
/* the living person behind a witness id (consort / servant / her / Hoàng thượng / Thái hậu), else null */
/* a maid (MAIN 169 answer (b), law 6b/1: her own maid — and every consort's maid — CAN be a witness): the day record's «mm:<owner>» row is a ROLE,
   so the witness is stored by the maid herself «mu:<owner>:<uid>»; a maid replaced / dead no longer resolves (never her successor) */
function chMaidO(o){return o==="me"?S:o?RV(+String(o).replace(/^v/,""))||null:null}
function chMaidId(w){const o=String(w).slice(3),p=chMaidO(o),m=p&&p.maid;if(!m||!m.name||m.dead||(p!==S&&p.alive===false))return null;if(!m.uid)m.uid=S.maidSeq=(S.maidSeq||0)+1;return `mu:${o}:${m.uid}`}
function chWitP(id){try{if(!id)return null;if(id==="th")return S.thDead?null:"th";if(id==="me")return S&&!S.dead?S:null;
 if(/^mu:/.test(id)){const [,o,u]=id.split(":"),p=chMaidO(o),m=p&&p.maid;return m&&String(m.uid)===u&&!m.dead&&(p===S||p.alive!==false)?m:null}const p=agTgt(id);if(!p||p==="th")return p||null;
 if(p.alive===false||p.dead||p.gone)return null;return p}catch(e){return null}}
function chWitNm(id){const p=chWitP(id);if(!p)return"";if(p==="th")return"Thái hậu";if(p===S)return"ngươi";if(S.emp&&p===S.emp)return"Hoàng thượng";return p.rank!=null&&p.rel!=null?j78who(p):p.name||""}
/* who stood with p (same place, same khắc) in the day record: the landing deed's own window when an agent deed lands, else p's row this khắc */
let CHLAND=null;
function chHere(p){try{const R=agRec();if(!R||!p)return[];const id=ledgerId(p);if(!id)return[];let pl,k0,k1;const L=CHLAND;
 if(L&&L.id===id){pl=L.pl;k0=L.kh;k1=agK1(L)}else{const row=R.P[id];if(!row)return[];k0=k1=agKh();pl=row[k0]&&row[k0][0]}
 if(!pl)return[];const out=[];for(const w in R.P){if(w===id||/^(m\d|k:)/.test(w))continue;const r=R.P[w];if(!r)continue;for(let q=k0;q<=k1;q++)if(r[q]&&r[q][0]===pl){const wi=/^mm:/.test(w)?chMaidId(w):w;if(wi&&chWitP(wi))out.push(wi);break}}return out}catch(e){return[]}}
function chSawAdd(t,c,id){if(!t||!c||!id||id===ledgerId(t))return;t.wsee=t.wsee||{};const L=t.wsee[c]||(t.wsee[c]=[]);if(L.includes(id))return;L.push(id);if(L.length>chB().wit.keep)L.shift()}
/* the real people h could still find as witnesses of t's charge c */
function chWitAv(h,t,c,W){const hid=ledgerId(h),tid=ledgerId(t);const have=(W&&W[c])||[];return ((t.wsee&&t.wsee[c])||[]).filter(id=>id!==hid&&id!==tid&&!have.includes(id)&&chWitP(id))}
function chWitS(h,t){if(!h.ewc){h.ewc={};h.ewOld=h.evc?Object.keys(h.evc):[]}const k=key(t);const W=h.ewc[k]||(h.ewc[k]={});
 if(h.ewOld&&h.ewOld.length){const i=h.ewOld.indexOf(String(k))/* Object.keys gives strings; key() may be a number */;if(i>=0){h.ewOld.splice(i,1);const m=(h.evc&&h.evc[k])||{};for(const c in m){const wn=chWitNeed(t,c);if(wn>0&&!W[c]){const x=Math.min(wn,Math.floor(((m[c]|0)+1)/3));if(x>0){const L=chWitAv(h,t,c,W).slice(0,x);if(L.length)W[c]=L}}}}}
 for(const c in W){if(Array.isArray(W[c]))continue;const n=W[c]|0;W[c]=[];if(n>0)W[c]=chWitAv(h,t,c,W).slice(0,n);if(!W[c].length)delete W[c]}/* an old count → the real people who were there, never more */
 return W}
/* the witnesses h holds on t's charge c that are still alive */
function chWitL(W,c){return ((W&&W[c])||[]).filter(id=>chWitP(id))}
function chWit(h,t,c){if(!h||!t||h===t)return 0;return chWitL(chWitS(h,t),c).length}
/* room for one more find on charge c: evidence below its cap, or witnesses below the need with a real person left to find (a charge with no real deed has none) */
function chRoom(h,t,c,m,W){const cap=chCapC(t,c);if(!cap)return false;return (m[c]||0)<cap||(chWitL(W,c).length<chWitNeed(t,c)&&chWitAv(h,t,c,W).length>0)}
/* a found piece of c goes to the witness store every other find while witnesses are short (and a real one is left), and always once the evidence is at its cap */
function chWitGo(h,t,c,m,W){const wn=chWitNeed(t,c),w=chWitL(W,c).length;if(w>=wn||!chWitAv(h,t,c,W).length)return false;const n=m[c]||0;return n>=chCapC(t,c)||(n+w)%2===1}
/* what a witness says: the victim «lời khai người bị hại», a servant «lời khai người hầu / kẻ canh cửa …», anyone else «người tận mắt chứng kiến» (BAL.charge.C[c].wk) */
function chWitKind(t,c,id){const K=(chC(c)||{}).wk||[];if(!K.length)return"";const p=chWitP(id);const D=chDeedMap(t)[c];const vic=D&&D.list&&D.list.some(d=>d&&d.t!=null&&ledgerId(byKey(d.t)||d.t)===id);
 const f=rx=>K.find(x=>rx.test(x));if(vic&&f(/bị hại/))return f(/bị hại/);if(/^(s\d|mu:)/.test(id)){const s=K.find(x=>/^lời khai/.test(x)&&!/bị hại/.test(x));if(s)return s}return f(/tận mắt/)||K[0]}
function chWitNames(t,c,L){return L.map(id=>{const k=chWitKind(t,c,id);return `${chWitNm(id)}${k?` (${k})`:""}`})}
/* REAL-PROOF-2 (owner 27/11 ~00:13Z «sợ … tách nhiều tầng chi tiết quá lại rối»): a card shows only the COUNT «Nhân chứng c/d»; the names live in the Sổ ghi find line and her notice */
function chWitTxt(h,t,c){const wn=chWitNeed(t,c);if(!wn)return"";return `Nhân chứng ${chWit(h,t,c)}/${wn}`}
let CHWS=null;/* the witnesses the last presented charge spent (her notice names them) */
/* the charge a new piece (or a search) goes to: the one she is already building (closest to full), else her newest unproven deed */
function chFor(h,t){const m=chSync(h,t),W=chWitS(h,t);const O=chOrd(t);let best=null,gap=1e9;for(const c of O){const n=m[c]||0,w=chWitL(W,c).length;if((n>0||w>0)&&chRoom(h,t,c,m,W)){const g=Math.max(0,chNeed(t,c)-n)+Math.max(0,chWitNeed(t,c)-w);if(g<gap){gap=g;best=c}}}
 if(best)return best;for(const c of O)if(chRoom(h,t,c,m,W))return c;return null}
/* a charge whose pieces are full (heaviest first); c given = only that charge */
/* STALE-TESTS-8 perf (ag-all p95 94 ms vs LIVE 8): chNeed / chWitNeed read chTier → chDeedMap → deedsOf → deedSync (luxOf, toilNpc …) for EVERY
   charge of every NPC plan check (j95except / opEx / motiveOK → chOK), ~200k calls in 10 days. chTier only ever returns the charge's own tier or "tu",
   so the need is never below the smaller of the two (+ rkPlus): with fewer pieces than that floor the answer is null without reading the deeds. Same result. */
function chNeedLo(t,c){const C=chC(c);if(!C)return 99;const T=chB().tier;return Math.min(T[C.tier].need,T.tu.need)+(t?chB().rkPlus[Math.max(0,Math.min(7,rkOf(t)))]||0:0)}
function chReady(h,t,c){if(!h||!t||h===t)return null;const m=chSync(h,t),W=chWitS(h,t);const L=c?[c]:chB().order;for(const x of L){const n=m[x]||0;if(n>=chNeedLo(t,x)&&n>=chNeed(t,x)&&chWitL(W,x).length>=chWitNeed(t,x))return x}return null}
function chOK(h,t,c){return !!chReady(h,t,c)}
/* the charge she is building on t (known to her: she holds a piece of it), for the cards */
function chChase(h,t){const m=chSync(h,t),W=chWitS(h,t);let best=null,gap=1e9;for(const c of chB().order){const n=m[c]||0,w=chWitL(W,c).length;const g=Math.max(0,chNeed(t,c)-n)+Math.max(0,chWitNeed(t,c)-w);if((n>0||w>0)&&g>0){if(g<gap||(g===gap&&!best)){gap=g;best=c}}}return best}
function chWho(p,me){return p===S?(me||"ngươi"):p.name}
/* FIND ODDS of ONE search for ONE piece of charge c (owner 26/11 ~05:35Z): every factor in bands of BAL.odds.cut */
function chFind(h,t,c,ag){const B=chB(),C=chC(c)||chC("hd");const W=[];let b=C.band;
 W.push(b<=B.bandWord[0]?"tội nặng, dấu vết giấu kỹ":b>=B.bandWord[1]?"tội nhẹ, dấu vết dễ lộ":"tội vừa");
 const g=Math.max(-B.tcCap,Math.min(B.tcCap,Math.trunc(((h.tamco||0)-(t.tamco||0))/B.tcStep)));b+=g;
 if(g>0)W.push(`tâm cơ ${chWho(h)} hơn ${chWho(t,"ngươi")}`);else if(g<0)W.push(`tâm cơ ${chWho(h)} kém ${chWho(t,"ngươi")}, dấu vết bị giấu kỹ`);
 if(ag&&ag!==h){let s=0;try{const r=srk(ag);if(netIs(ag,"sharp")&&r>=B.srvHi)s=1;else if(netIs(ag,"timid")&&r<=B.srvLo)s=-1}catch(e){}b+=s;if(s>0)W.push(`${ag.name} khéo léo`);else if(s<0)W.push(`${ag.name} vụng về`)}
 const n=+h.mat||0;let e=n>=B.matHigh?2:n>=B.matMid?1:0;const pl=(t.staff||[]).some(s=>s&&s.spyFor===key(h));if(pl)e+=B.plantB;e=Math.min(B.eyeCap,e);b+=e;
 if(n>=B.matMid)W.push(`${chWho(h)} nhiều tai mắt`);if(pl)W.push(`có người cài trong cung ${chWho(t,"ngươi")}`);
 if(rkOf(t)>=B.guardRk){b+=B.guard;W.push(`cung ${chWho(t,"ngươi")} canh nghiêm`)}
 const q=Math.min(B.missCap,(h.evq&&h.evq[key(t)]&&h.evq[key(t)][c])||0)*B.missStep;if(q>0){b+=q;W.push(`đã dò ${q/B.missStep} lần chưa thấy, lần này dễ hơn`)}
 b=Math.max(0,Math.min(BAL.odds.cut.length,b));return{o:chBandO(b),band:b,c,why:W}}
/* the plain line on a search card (VANPHONG): the charge she builds if she holds a piece of it, else the middle crime (the card never
   reveals a crime she does not know of) */
function chFindTxt(h,t,ag){if(!h||!t||h===t)return"";const c=chChase(h,t);const F=chFind(h,t,c||"hd",ag);
 const why=F.why.slice(c?0:1);return `Tìm chứng${c?` tội ${chName(c).toLowerCase()}`:""}: ${word(F.o)}${why.length?` (${why.join(", ")})`:""}${c?"":"; tội nặng thì khó tìm hơn, tội nhẹ thì dễ hơn"}; mỗi lần dò hụt, lần sau dễ hơn`}
/* her Tai mắt report someone digging on HER (two-way), once a day per searcher */
function chWarn(h){try{if(!S||h===S)return;const B=chB();const mine=(h.staff||[]).some(s=>s&&s.spyFor==="me");if((+S.mat||0)<B.warnMat&&!mine)return;S.chw=S.chw||{};if(S.chw[h.id]===wk())return;S.chw[h.id]=wk();
 log(`Tai mắt báo: người của ${typeof NM==="function"?NM(h):h.name} đang dò tìm chứng cứ về ngươi.`)}catch(e){}}
/* every search road: fn runs with the search context; CHLAST keeps what was tried (for the result line) */
function chSearch(h,ag,fn){const p=CHS;CHS={h,ag:ag||null,tries:[]};try{return fn()}finally{CHLAST=CHS;CHS=p}}
/* the result words of the last search on t: a miss on a real deed (never «không có gì sai trái» then) */
function chMissTxt(t){const L=CHLAST&&CHLAST.tries||[];const x=L.filter(z=>!z.hit).pop();if(!x)return"";return `Dò kỹ mà chưa tìm ra chứng tội ${chName(x.c).toLowerCase()} (Tìm chứng: ${word(x.o)}); lần sau dễ hơn.`}
function chMissed(){const L=CHLAST&&CHLAST.tries||[];return L.length&&!L.some(z=>z.hit)}
/* ---------- the one evidence write: per charge ---------- */
(function(){const e0=evA;evA=function(h,t,n,c){if(!h||!t||h===t||!n)return e0.apply(this,arguments);const m=chSync(h,t);
 if(n<0&&!c&&CHSKIP&&CHSKIP.a===h&&CHSKIP.t===t){const z=CHSKIP;CHSKIP=null;return evA(h,t,-z.n,z.c)}/* rv: a road that spends a typed count (jaudit «Trình Hoàng hậu») spends the proven charge's pieces instead */
 if(n<0&&c){const W=chWitS(h,t);const L=chWitL(W,c);CHWS={h,t,c,w:L.length,ids:L};delete W[c]}/* presenting charge c: its witnesses testify and are spent with its pieces */
 if(n<0){const d=e0(h,t,n);let x=-d;const L=(c?[c]:[]).concat(Object.keys(m).sort((a,b)=>(m[b]||0)-(m[a]||0)));for(const z of L){while(x>0&&(m[z]||0)>0){m[z]--;x--}if(!m[z])delete m[z]}return d}
 let got=0;const srch=CHS&&CHS.h===h;if(srch&&t===S)chWarn(h);const W=chWitS(h,t);
 for(let i=0;i<n;i++){const cc=c&&chRoom(h,t,c,m,W)?c:chFor(h,t);if(!cc){if(typeof evMiss==="function")evMiss(h,t,n-i);break}
  if(srch){const F=chFind(h,t,cc,CHS.ag);const hit=roll(F.o);CHS.tries.push({c:cc,o:F.o,hit});const q=chMissS(h,t);if(!hit){q[cc]=(q[cc]||0)+1;continue}delete q[cc]}
  if(chWitGo(h,t,cc,m,W)){const id=chWitAv(h,t,cc,W)[0];W[cc]=chWitL(W,cc).concat([id]);CHLASTC={t,c:cc};got++;/* a witness = a real person who was there, not a piece: the evidence total stays */
   if(h===S){const k=chWitKind(t,cc,id);log(`Tìm được nhân chứng tội ${chName(cc).toLowerCase()}: ${chWitNm(id)}${k?` (${k})`:""}; nay có ${W[cc].length}/${chWitNeed(t,cc)} nhân chứng.`)}continue}
  CHLASTC={t,c:cc};m[cc]=(m[cc]||0)+1;/* first: a hook inside the write (j78 evdSync → evidenceActs) reads the pieces in step with the total */let d=0;try{d=e0(h,t,1)}catch(x){m[cc]--;throw x}if(!d){m[cc]--;if(!m[cc])delete m[cc];break}got++}
 return got}})();
/* REAL-PROOF hooks: who really saw a deed. (1) every deed written (jtruth deedAdd, deedOnce through it) — the people in the day record at the doer's place in
   that khắc (an agent deed landing: its own place and khắc window); (2) a secret meeting (j95 tryst / meeting a henchman) — everyone whose row is at its
   spot in its khắc, the partner aside. Host computes (co-op guest seats never write a world person, like deedSync). */
(function(){const d0=deedAdd;deedAdd=function(p,k,t,w,x){const d=d0.apply(this,arguments);try{if(d&&p&&!deedSyncGuest(p)){const c=chOfDeed(k);for(const id of chHere(p))chSawAdd(p,c,id)}}catch(e){}return d}})();
(function(){const l0=agLand;agLand=function(p){const pv=CHLAND;CHLAND=p&&p.pl?p:null;try{return l0.apply(this,arguments)}finally{CHLAND=pv}}})();
(function(){const a0=j95secApply;j95secApply=function(R){const r=a0.apply(this,arguments);try{const z=j95z();for(const s of z.sec||[]){if(!R||s.c!==R.c||s.wk!==wk()||!s.a||s.a[0]!=="v")continue;const sub=RV(+s.a.slice(1));if(!sub||deedSyncGuest(sub))continue;const c=j95chg(s);
  for(const id in R.P){if(id===s.a||id===s.b||/^(m\d|k:)/.test(id))continue;const e=R.P[id];if(e&&s.kh.some(i=>e[i]&&e[i][0]===s.k)&&chWitP(id))chSawAdd(sub,c,id)}}}catch(e){}return r}})();
/* jtruth's cap = the per-charge caps (a real deed of a charge leaves at least the pieces that charge needs) */
(function(){const d0=deedCap;deedCap=function(p){if(!p)return 0;try{const O=chOrd(p);let s=0;for(const c of O)s+=chCapC(p,c);return s}catch(e){return d0.apply(this,arguments)}}})();
/* ---------- accusing: one full charge ---------- */
accOK=function(a,t){return chOK(a,t)&&(rkOf(t)<7||rkOf(a)>=3)};
/* the pieces needed, as shown: the charge she builds (else the lightest) */
accNeed=function(t,h){h=h||S;const c=(h&&t&&h!==t&&chChase(h,t))||"vp";return chNeed(t,c)};
(function(){const o0=oAccuse;oAccuse=function(a,t){const c=chReady(a,t);const n=c?chHave(a,t,c):0,g=evG(a,t);return oddsCl(Math.round(o0.apply(this,arguments)+(n-g)*BAL.charge.accW))/* the charge's own pieces weigh, not the total */}})();
/* the punishment a proven charge brings (one punishment, D1 punish-reason; NPC and player alike) */
function chPunTxt(t,c){const C=chC(c);if(!C)return"bị phạt";const x=chTier(t,c);const m=typeof punishMonths==="function"?punishMonths():1;
 if(x==="nhe")return C.lite==="bong"?`bị phạt bổng ${BAL.charge.fine} lượng`:`bị cấm túc ${m} tháng`;return punTierTxt(t,x)}
/* PUNISH-TIER: the one penalty of a proven charge = its WEIGHT (chTier) — jpun punTier, the same for every rank (vừa = giáng + lãnh cung, nặng = ban chết) */
function chPunish(t,c,why,by){return chPunishX(t,c,why,by,chTier(t,c),false)}
/* x = the weight; back = PHẢN TỌA on the accuser (no seizure of her things: the pieces were about the other one) */
function chPunishX(t,c,why,by,x,back){const C=chC(c);if(!C||!t)return;let W=back?why:`${why} (tội ${chName(c).toLowerCase()})`;const a=typeof punWho==="function"?punWho(by):by;
 /* REPEAT (BAL.charge.rep): the n-th nhẹ conviction within win wk() counts as vừa (her and an NPC) */
 if(x==="nhe"&&!back){const R=chB().rep,now=wk();t.nheWk=(t.nheWk||[]).filter(w=>now-w<R.win);t.nheWk.push(now);if(t.nheWk.length>=R.n){t.nheWk=[];x="vua";W=`${W}; tái phạm lần thứ ${R.n} trong một năm`}}
 /* the proven thing is taken whatever the weight (charge-followups (a)): vượt phẩm → Nội vụ phủ store; đồ cấm → Cung Chính ti as tang vật */
 if(!back){if(c==="vp")vpSeize(t);if(c==="il")for(const e of (t.inv||[]).slice()){if(e&&IT[e.k]&&itm(e.k).il&&!((e.by&&e.by!==key(t))||e.gh)){ilSeize(t,e,"evid",{keep:1})}}}
 const pt=PUNT;PUNT={x};try{
 if(x==="nhe"&&C.lite==="bong"){ap(t,{bac:-BAL.charge.fine,danh:BAL.charge.danh});if(typeof ducAdd==="function")ducAdd(t,BAL.charge.duc,chName(c).toLowerCase());
  log(`<span class="r">${NMc(t)} bị phạt bổng ${BAL.charge.fine} lượng vì ${punPlain(W)}.</span>`);if(t===S)punNote({kind:"phat",why:W,by:a});return}
 if(x==="nhe"){punish(t,W,1);return}
 punTier(t,x,W,a)}finally{PUNT=pt}}
/* PHẢN TỌA (OD 26/11 ~19:50Z, 诬告反坐): a failed accusation of t for charge c puts that charge's weight back on accuser a — everyone, her too (law 1) */
let CHBACK=null;
function chBack(a,t,c,n){if(!a||!t||!c)return;const x=chTier(t,c);const pb=CHBACK;CHBACK={a,t,c,n:n|0};try{chPunishX(a,c,`tố ${NM(t)} tội ${chName(c).toLowerCase()} không thành, bị phản tọa`,t,x,true)}finally{CHBACK=pb}}
/* her phản tọa notice: «Chứng cứ» = the accusation that did not stand (never «không có chứng cứ» — the pieces were hers, about the other one) */
(function(){if(typeof punEvTxt!=="function")return;const p0=punEvTxt;punEvTxt=function(a,t){const B=CHBACK;if(B&&(t||S)===B.a)return `lời tố của ${B.a===S?"ngươi":B.a.name} về tội ${chName(B.c).toLowerCase()} (${chTierN(B.t,B.c)}) không đứng vững; ${B.n} món chứng${CHWS&&CHWS.h===B.a&&CHWS.c===B.c&&CHWS.w?`, ${CHWS.w} nhân chứng`:""} bị hủy`;return p0.apply(this,arguments)}})();
/* TỰ THÚ / LIE (BAL.charge.conf): she confesses before the verdict → one step lighter; a lie under a proven charge → one step heavier */
function chConfess(t,c,why,by){if(!t||!c)return;chPunishX(t,c,`${why} (tự thú, giảm một bậc tội)`,by,punStep(chTier(t,c),-chB().conf.down),false)}
function chLie(t,c,why,by){if(!t||!c)return;chPunishX(t,c,`${why} (chối tội mà bị vạch, tăng một bậc tội)`,by,punStep(chTier(t,c),chB().conf.up),false)}
function chBackTxt(a,t,c){if(!a||!t||!c)return"";const x=chTier(t,c),C=chC(c);const w=x==="nhe"?(C.lite==="bong"?`bị phạt bổng ${BAL.charge.fine} lượng`:`bị cấm túc ${punishMonths(1)} tháng`):punTierTxt(a,x);return `phản tọa tội ${punTierN(x)}: ${a===S?"ngươi":a.name} ${w}`}
/* charge-followups (b) — table A extras beside the one punishment (numbers BAL.charge.uhPay / mcFire; NPC and her alike, law 1):
   Ức hiếp quấy phá → she pays bạc to each person she harmed; Mua chuộc người hầu → the servants she bought are dismissed (asOut "expel").
   The rows go into her notice (punRows) under the punishment; an NPC's case goes to the log. */
let CHPX=null;
function chVictims(t,c){const D=chDeedMap(t)[c];const seen=new Set(),L=[];for(const d of ((D&&D.list)||[])){if(!d||!d.t||seen.has(d.t))continue;seen.add(d.t);let v=null;try{v=byKey(d.t)}catch(e){}if(v&&v!==t&&(v===S?!S.dead:v.alive!==false))L.push(v)}return L}
function chUhPay(t){const B=chB(),L=chVictims(t,"uh").slice(0,B.uhMax)/* PUNISH-TIER: ức hiếp now needs 1 piece (nhẹ); the people paid stay capped by uhMax (was «need» = 2) */;const nm=[];
 /* rv: she pays only the bạc she has (her Bạc floors at 0 in apply; an NPC never goes below 0 here) — the victim gets exactly what was paid, no bạc made from nothing (law 6c) */
 for(const v of L){const pay=Math.min(B.uhPay,Math.max(0,(t===S?S.bac:t.bac)|0));if(pay<=0)break;ap(t,{bac:-pay});ap(v,{bac:pay});nm.push(`${pay} lượng bạc cho ${NM(v)}`)}
 if(!nm.length)return null;const x=`bồi ${nm.join(", ")}`;if(t!==S)log(`${NMc(t)} phải ${x}.`);return ["Bồi thường",x]}
function chBought(t){const k=key(t),D=chDeedMap(t).mc,ds=(D&&D.list)||[];const sids=new Set(ds.map(d=>d&&d.s).filter(Boolean)),own=new Set(ds.map(d=>d&&d.o).filter(Boolean));const L=[];
 for(const o of [S].concat(rivals||[])){if(!o||o===t||o.coop||(o!==S&&(o.alive===false||o.out)))continue;for(const s of (o.staff||[]))if(s&&s.spyFor===k&&!s.coop)L.push([s,o,(sids.has(s.sid)?2:0)+(own.has(key(o))?1:0)])}
 return L.sort((a,b)=>b[2]-a[2])}
function chMcFire(t){const L=chBought(t);
 /* STEP 4 O1 (OD 26/11 ~07:50Z, law 1): SHE as the bought servant (servant life, S.srv.spyFor = the guilty one) and the friend's seat as a bought
    servant (co-op buildFriendSrv, coop) are dismissed like any bought servant — the deed of her taking the bạc names her (rank 2, as d.s) */
 if(chSrvMe(t))L.push([S,srvM(),2,"me"]);
 for(const o of [S].concat(rivals||[])){if(!o||o===t||(o!==S&&(o.alive===false||o.out)))continue;for(const s of (o.staff||[]))if(s&&s.coop&&!s.coopMcOut&&s.spyFor!=null&&String(s.spyFor)===String(key(t)))L.push([s,o,2,"fr"])}
 L.sort((a,b)=>b[2]-a[2]);const K=L.slice(0,chB().mcFire);if(!K.length)return null;const nm=[];let mine=false;const fr=[];
 for(const [s,o,,w] of K){const pal=o===S?"của ngươi":o?"cung "+o.name:"";
  if(w==="me"){nm.push(`ngươi (người hầu ${pal})`);mine=true;continue}
  if(w==="fr"){fr.push(s);nm.push(`${s.name} (người hầu ${pal})`);continue}
  try{asOut(s,"expel")}catch(e){const i=(o.staff||[]).indexOf(s);if(i>=0)o.staff.splice(i,1);s.out="expel"}s.spyFor=null;nm.push(`${s.name} (người hầu ${pal})`);
  if(o===S&&t!==S)log(`<span class="r">${s.name} nhận bạc của ${NM(t)}, nay tội lộ ra, bị đuổi khỏi cung.</span>`)}
 const x=`${nm.join(", ")} nhận bạc mua chuộc, bị đuổi khỏi cung`;if(t!==S)log(`${NMc(t)} mua chuộc người hầu: ${x}.`);const row=["Người hầu bị mua",x];
 if(mine||fr.length){const o=chSrvOut(t,row);if(mine)CHSRV=o;for(const s of fr)s.coopMcOut=o/* jcoopworld toCanon carries it to her seat (S.coopSrvOut) */}
 return row}
/* her dismissal: the end card «Bị đuổi khỏi cung» (the j42 servant-life road) with the rows of a punishment notice (Ai tố / Vì sao / Chứng cứ /
   Hình phạt / Người hầu bị mua) — plain data, so the co-op friend's seat ends her life from the same record (host-computed, the friend continues) */
let CHSRV=null;
function chSrvMe(t){return !!(t&&t!==S&&typeof isSrv==="function"&&isSrv()&&!S.dead&&S.srv.spyFor!=null&&String(S.srv.spyFor)===String(t.id))}
function chSrvOut(t,row){const a=CHX&&CHX.t===t?CHX.a:null;const w=a&&a!==S?punWhoTxt(a):a===S?"ngươi":"";let ev="";try{ev=a?punEvTxt(a,t):""}catch(e){}
 return {g:t.name,a:w,ev,x:row[1],gk:key(t),ak:a&&a!==S?key(a):null}}
function chSrvEnd(o){if(!o||typeof isSrv!=="function"||!isSrv()||S.dead)return;S.srv.spyFor=null;S.srvMcEnd=o;
 /* the edict names them (as punRows): she knows the accuser and the one who bought her (k61) */try{if(typeof k61Know==="function")for(const k of [o.ak,o.gk]){const x=k&&k!=="me"?byKey(k):null;if(x)k61Know(x,"",true,2)}}catch(e){}
 over("Bị đuổi khỏi cung",`Tội mua chuộc người hầu của ${o.g} bị phơi ra; ngươi là kẻ nhận bạc làm tai mắt. Cung Chính ti tước tên ngươi khỏi sổ cung nhân, đuổi ra cửa Thần Vũ.`,"Bị đuổi khỏi cung vì nhận bạc mua chuộc",true)}
(function(){if(typeof deathChain!=="function")return;const d0=deathChain;deathChain=function(f){const L=d0.apply(this,arguments);const o=S&&S.srvMcEnd;
 if(!o||!/nhận bạc mua chuộc/.test(String(f||"")))return L;const R=[o.a?`Ai tố: ${o.a}`:"Ai xử: Cung Chính ti, theo cung quy",`Vì sao: nhận bạc của ${o.g}, làm tai mắt cho nàng`];
 if(o.ev)R.push(`Chứng cứ: ${o.g} bị tố ${o.ev}`);R.push("Hình phạt: Đuổi khỏi cung",`Người hầu bị mua: ${o.x}`);return R.concat(L)}})();
function chExtras(t,c){const R=[];try{const a=c==="uh"?chUhPay(t):c==="mc"?chMcFire(t):null;if(a)R.push(a)}catch(e){console.error("chExtras",e)}return R}
(function(){if(typeof punRows!=="function")return;const r0=punRows;punRows=function(o){const R=r0.apply(this,arguments);if(CHPX&&CHPX.length)for(const x of CHPX)R.push([x[0],punEsc(x[1])]);return R}})();
(function(){const c0=chPunish;chPunish=function(t,c,why,by){if(!t||(c!=="uh"&&c!=="mc"))return c0.apply(this,arguments);const px=CHPX,sx=CHSRV;CHSRV=null;CHPX=chExtras(t,c);let me=null;try{return c0.apply(this,arguments)}finally{CHPX=px;me=CHSRV;CHSRV=sx;if(me)chSrvEnd(me)/* O1: her ending after the guilty one's punishment is written */}}})();
(function(){const t0=chPunTxt;chPunTxt=function(t,c){const r=t0.apply(this,arguments);return c==="uh"?`${r}, bồi bạc cho người bị hại`:c==="mc"?`${r}, người hầu bị mua bị đuổi khỏi cung`:r}})();
/* charge-followups (c): «Trình Hoàng hậu» weighs the pieces of the proven charge (BAL.charge.trinh), never the total (jaudit card, j78) */
function chTrinhO(a,t,q){const B=chB().trinh,c=chReady(a,t);return B.base+aff(q,a)/B.affD+(c?chHave(a,t,c):0)*B.per}
/* the accusation act itself (j8 «Tố giác»): the full charge only; its pieces are spent, the others kept */
(function(){const A=ACT.accuse;if(!A)return;const f0=A.f;
 Object.defineProperty(A,"x",{configurable:true,get(){const B=chB();/* PUNISH-TIER: need by weight, the same for every rank; phản tọa */
  const P=B.rkPlus,up=[3,6].map(r=>`${RANKS[r].n} trở lên +${P[r]}`).join(", ");return `cần đủ chứng cứ của một tội; tội càng nặng càng cần nhiều chứng (${B.tierOrd.map(x=>`${B.tier[x].n} ${B.tier[x].need}`).join(", ")}); tố người phẩm cao cần thêm (${up}); tội nặng cần thêm ${B.wit.need.nang} nhân chứng, tử tội ${B.wit.need.tu}; tố hụt thì bị phản tọa: chịu đúng mức tội đã tố`}});
 A.f=function(a,t){const c=chReady(a,t);if(!c)return f0.apply(this,arguments);const o=oAccuse(a,t);const n=chHave(a,t,c);const px=CHX;CHX={a,t,c,n};
  try{evA(a,t,-n,c);
   if(aRoll(o,a)){econPayWin(a,"accuse",t,0);const r=`${NMc(a)} tố giác ${NM(t)} tội ${chName(c).toLowerCase()} trước ${judgeName(t)}: <span class="${t===S?"r":"g"}">thành</span>. `;ap(a,{danh:BAL.eff.j8.accuseDanh});if(empGive(a,BAL.tw.accBestow,"accuse"))bestow(a,"accuse");if(rkOf(t)>=7)a.seatBan=S.turn+12;chPunish(t,c,"bị tố giác, chứng cứ rành rành",a);return r}
   /* PUNISH-TIER PHẢN TỌA (OD 26/11 ~19:50Z): the failed accuser bears the weight of the charge she brought (was: + phạm thượng only on the Hoàng hậu) */
   ap(a,{danh:BAL.eff.j8.accuseFailDanh});relAdd(a,t,BAL.eff.j8.f_6);chBack(a,t,c,n);return `${NMc(a)} tố giác ${NM(t)} tội ${chName(c).toLowerCase()} không thành; chứng cứ bị hủy. `}
  finally{CHX=px}}})();
/* Hoàng hậu «Xử tội» (j8 judge, hers and an NPC queen's): by the full charge */
(function(){const j0=judge;judge=function(q,p){const c=chReady(q,p);if(!c)return j0.apply(this,arguments);const n=chHave(q,p,c);const px=CHX;CHX={a:q,t:p,c,n};
 try{const r=`${q===S?"Ngươi, ngôi Hoàng hậu,":"Hoàng hậu "+q.name} xét tội ${NM(p)}: ${chName(c).toLowerCase()}, theo ${n} chứng cứ. `;evA(q,p,-n,c);relAdd(q,p,BAL.eff.j8.judge);chPunish(p,c,"bị Hoàng hậu xử tội",q);return r}finally{CHX=px}}})();
/* «Trình Hoàng hậu» (rv: the live executor is jaudit T.f → jrcv rcvJudge — her card when she is the Hoàng hậu, the same options for an NPC queen):
   one full charge — only its pieces are spent, and «Xét tội theo chứng cứ» punishes by that charge (as Tố giác / Xử tội), even when she decides later */
(function(){const T=ACT.trinhhh;if(!T)return;const f0=T.f;T.f=function(a,t){const c=chReady(a,t);if(!c){if(t)t.chTr=null;return f0.apply(this,arguments)}
 const n=chHave(a,t,c);t.chTr={a:key(a),c,n};const ps=CHSKIP;CHSKIP={a,t,c,n};try{return f0.apply(this,arguments)}finally{CHSKIP=ps}}})();
(function(){const p0=punish;punish=function(p,why,sev){if(p&&typeof p==="object"&&p.chTr&&why==="bị Hoàng hậu xét tội theo chứng cứ"){const z=p.chTr;p.chTr=null;
 const a=byKey(z.a);const px=CHX;CHX={a,t:p,c:z.c,n:z.n};try{chPunish(p,z.c,why,a||queenP())/* AI TỐ = the one who presented the proof */}finally{CHX=px}return}return p0.apply(this,arguments)}})();
/* WHICH EVIDENCE in her notice: the charge and each piece behind it (jpun punEvTxt) */
(function(){if(typeof punEvTxt!=="function")return;const p0=punEvTxt;punEvTxt=function(a,t){t=t||S;if(!a||!CHX||CHX.a!==a||CHX.t!==t)return p0.apply(this,arguments);
 const D=chDeedMap(t)[CHX.c];const DL=((D&&D.list)||[]).filter(d=>d&&d.x);const PK=(chC(CHX.c)||{}).pk||[];const L=[];/* rv: one line per piece, «deed · kind» (table A rule 4) */
 for(let i=0;i<CHX.n&&DL.length;i++)L.push(`${DL[i%DL.length].x}${PK.length?" · "+PK[i%PK.length]:""}`)
 L.splice(0,L.length,...pieceFold(L).slice(0,BAL.pun.evShow).map(([x,n])=>pieceN(x,n)));/* RV-163D §1: identical pieces of one deed fold into one «… (N món)» */
 const ws=CHWS&&CHWS.h===a&&CHWS.t===t&&CHWS.c===CHX.c?CHWS:null;const WS=ws?ws.w:0;const WL=ws?chWitNames(t,CHX.c,ws.ids||[]):[];/* REAL-PROOF: each witness by name */
 return `tội ${chName(CHX.c).toLowerCase()} (${chTierN(t,CHX.c)}), ${CHX.n} món chứng${L.length?": "+L.join("; "):""}${WS?`; ${WS} nhân chứng${WL.length?": "+WL.join("; "):""}`:""}`}})();
if(typeof PUNK==="object")PUNK.phat="Phạt bổng";
/* «phat» Hình phạt row: jpun punRows (PUNISH-TIER: before the tier rows) */
/* ---------- the evidence lines for the cards ---------- */
/* «Tư thông 2/3 · Vượt phẩm 1/1» — every charge she holds a piece of */
function chLine(h,t){if(!h||!t||h===t)return"";const m=chSync(h,t),W=chWitS(h,t);return chB().order.filter(c=>(m[c]||0)>0||chWitL(W,c).length>0).map(c=>{const w=chWitTxt(h,t,c);return `${chNameW(t,c)}: chứng cứ ${m[c]||0}/${chNeed(t,c)}${w?`, ${w.toLowerCase()}`:""}`}).join(" · ")}
function chNeedTxt(h,t,c){const L=chLine(h,t);if(c){const wn=chWitNeed(t,c);return `cần ${chNeed(t,c)} chứng cứ tội ${chName(c).toLowerCase()}, tội ${chTierN(t,c)} (có ${chHave(h,t,c)})${wn?`, và ${wn} nhân chứng (có ${chWit(h,t,c)})`:""}`}
 return L?`chưa đủ chứng một tội: ${L}`:`chưa có chứng cứ về ${chWho(t,"ngươi")}`}
kitWhyEv=function(a,n){return a?chNeedTxt(S,a):`thiếu chứng cứ`};
/* «Tố tội thật» (j30): a full charge among the plain crimes she can be shown to have (vượt phẩm, đồ cấm, bày mưu) */
function chTocao(h,t){for(const c of ["uh","il","vp"])if(chReady(h,t,c))return c;return null}
/* the deed behind the piece the last search found (the result line names the right wrong) */
function chHitDeed(t){const x=(CHLAST&&CHLAST.tries||[]).filter(z=>z.hit).pop();if(!x)return null;const D=chDeedMap(t)[x.c];return D&&D.list[0]||null}
/* evidence card rows (kit fact rows): one row per charge she holds a piece of — pieces / need, and the next search's odds word */
function chRows(h,t){if(!h||!t||h===t)return[];const m=chSync(h,t),W=chWitS(h,t);const ag=h===S?S.maid:null;return chB().order.filter(c=>(m[c]||0)>0||chWitL(W,c).length>0).map(c=>{const need=chNeed(t,c),n=m[c]||0;const w=chWitTxt(h,t,c);const x=`Chứng cứ ${n}/${need}${w?` · ${w}`:""}`;/* ONE line per charge (OD 27/11 ~00:13Z): «Chứng cứ a/b · Nhân chứng c/d» + the odds word */
 return [chNameW(t,c),chReady(h,t,c)?`${x} · đủ để tố`:`${x} · Tìm chứng: ${word(chFind(h,t,c,ag).o)}`]})}
/* the short word for a picker sub-line, and the one plain paragraph that says what decides it (the search dialog) */
function chFindWord(h,t,ag){if(!h||!t||h===t)return"";const c=chChase(h,t);return `Tìm chứng: ${word(chFind(h,t,c||"hd",ag).o)}`}
function chHowTxt(h,ag){const B=chB(),n=+h.mat||0;return `«Tìm chứng» là may rủi của một lần dò: có tìm ra một món chứng cứ hay không. Tội nhẹ dấu vết dễ lộ, tội nặng giấu kỹ; ${chWho(h,"Ngươi")} có Tâm cơ ${h.tamco||0}: hơn người bị dò thì dễ tìm, kém thì khó tìm; ${chWho(h)} có ${n} tai mắt (từ ${B.matMid} người trở lên thì dễ hơn), cài được người trong cung nàng thì dễ hơn nữa; cung từ ${RANKS[B.guardRk].n} trở lên canh nghiêm hơn; ${ag&&ag.name?ag.name+" chỉ giúp được chút ít; ":""}mỗi lần dò hụt, lần sau dễ hơn.`}
/* the evidence record (j78 S.evd «proves») names a real deed OF THE CHARGE the piece was written to */
(function(){if(typeof j78proof!=="function")return;const p0=j78proof;j78proof=function(v){try{if(CHLASTC&&CHLASTC.t===v){const D=chDeedMap(v)[CHLASTC.c];S.evd=S.evd||{};
 const PK=(chC(CHLASTC.c)||{}).pk||[];const i=Math.max(0,chHave(S,v,CHLASTC.c)-1);const kd=PK.length?` · ${PK[i%PK.length]}`:"";/* PUNISH-TIER-2 (owner 26/11 ~21:00Z): evidence is a plain count; a piece carries no weight label (the charge line shows its tier and held/needed) *//* rv: each piece names its kind (table A rule 4), never the same line twice */
 const have=new Set((S.evd[v.id]||[]).map(e=>e.ref).filter(Boolean));for(const d of (D&&D.list)||[]){const ref="td:"+(d.at==null?"o":d.at+":"+d.k+":"+(d.t||""));if(!have.has(ref))return{proves:`${j78Who(v)} ${d.x}${kd}`,ref,aim:d.t}}
 const d=D&&D.list[0];if(d)return{proves:`${j78Who(v)} ${d.x}${kd}`,ref:"tc:"+CHLASTC.c+":"+((S.evd[v.id]||[]).length),aim:d.t}}}catch(e){}return p0.apply(this,arguments)}})();
/* STEP 4 family (her notice WHO / EVIDENCE on every charge): chPunish's cấm túc («cam») and giáng roads end in the generic punish / demote,
   whose punNote had no accuser — «Ai tố» fell back to the one acting (ACTX) or to «Ai xử: Hoàng thượng», and the «Chứng cứ» row vanished
   (jtsb trình Hoàng hậu, a Tố giác by a third person). The accuser chPunish was given now reaches her notice. */
let CHBY=null;
(function(){const c0=chPunish;chPunish=function(t,c,why,by){const px=CHBY;CHBY=t===S&&by&&by!==S?{a:by}:null;try{return c0.apply(this,arguments)}finally{CHBY=px}}})();
(function(){if(typeof punNote!=="function")return;const n0=punNote;punNote=function(o){if(CHBY&&o&&!o.by)o=Object.assign({},o,{by:CHBY.a});return n0.call(this,o)}})();
/* STEP 4 rv F3 (law 4 + kit consistency OD:L1095): ONE helper for what an evidence act spends and does, read by BOTH cards of the act — the Hậu cung
   person card (j78 actLineRaw + AOUT) and the evidence card (j78 evidenceActs). Tố giác / Trình Hoàng hậu / Xử tội = the ready charge, Tố tội thật =
   chTocao, Bóc chuyện tư tình = tư thông: its pieces (chHave) and its punishment (chPunTxt) — never the total, never BAL.eff.j30.evF / j78.evF_2. */
const CH_USE={accuse:(a,t)=>chReady(a,t),trinhhh:(a,t)=>chReady(a,t),judge:(a,t)=>chReady(a,t),tocao:(a,t)=>chTocao(a,t),expose:(a,t)=>chOK(a,t,"tt")?"tt":null};
function chUse(k,a,t){const f=CH_USE[k];if(!f||!a||!t||a===t)return null;let c=null;try{c=f(a,t)}catch(e){}return c?{c,n:chHave(a,t,c)}:null}
function chUseTxt(k,a,t){const u=chUse(k,a,t);return u?`Chứng cứ ${balSg(-u.n)} (tội ${chName(u.c).toLowerCase()}, ${chTierN(t,u.c)})`:null}
/* PUNISH-TIER: what a failed Tố giác of t costs her (the same as the act: base Danh + PHẢN TỌA of the ready charge) */
function chFailDanh(){return BAL.eff.j8.accuseFailDanh}
function chFailPun(t,a){a=a||S;const c=t?chReady(a,t):null;return c?chBackTxt(a,t,c):""}
function chWinTxt(k,a,t,W){const u=chUse(k,a,t);return u?`${W||NM(t)} ${chPunTxt(t,u.c)}`:null}
(function(){if(typeof AOUT!=="object")return;for(const k of ["accuse","tocao"]){const d=Object.getOwnPropertyDescriptor(AOUT,k);const base=()=>d?(d.get?d.get.call(AOUT):d.value):null;
 try{Object.defineProperty(AOUT,k,{configurable:true,enumerable:true,get(){const b=base()||["",""];const t=typeof J78==="object"&&J78.cardV;const w=t?chWinTxt(k,S,t,j78who(t)):null;/* E-GAIN3b law 3: the target's punishment is HER gain (explicit green, kit KP12 — the kit reads «bị giáng / cấm túc» as red) + her real Danh (accuse: j8 accuseDanh; tocao: j30 f danhTocao) */const f=k==="accuse"&&t?`Danh ${balSg(chFailDanh())}, thù ${balSg(BAL.eff.j8.f_6)}, chứng cứ bị hủy${chFailPun(t)?"; "+chFailPun(t):""}`:b[1];const dn=k==="accuse"?BAL.eff.j8.accuseDanh:BAL.eff.j30.danhTocao;const w0=w||(k==="tocao"&&!(b[0])?"nàng chịu phạt theo tội ấy":"");return w0?[`<span class="g">${w0}</span>; Danh ${balSg(dn)}`,f]:[b[0],f]}})}catch(e){}}})();
/* split-merge B1/B3/P6 (owner 26/11 ~21:00Z «hạn chế tách 1 việc», 27/11 ~00:46Z one matter = one road, ~01:00Z general button + specific true result):
   ONE «Tố giác» (ACT accuse) for her and every NPC (law 1). The charge = the full one the pieces + witnesses make (chReady); the listener = the highest one who
   can judge it: a Hoàng hậu above the accused (the «Trình Hoàng hậu» road: her odds, her verdict card jrcv), else Hoàng thượng (the accuse road). «Tố tội thật»,
   «Bóc chuyện tư tình», «Trình Thái hậu», «Trình Hoàng hậu» are no longer offered as their own buttons or NPC choices. */
function chTo(a,t){const q=typeof queenP==="function"?queenP():null;return q&&q!==a&&q!==t&&rkOf(t)<7?"trinhhh":"accuse"}
(function(){const A=ACT.accuse,T=ACT.trinhhh;if(!A||!T)return;const ok0=A.ok,o0=A.o,f0=A.f;
 A.ok=function(a,t){return chTo(a,t)==="trinhhh"?!!T.ok(a,t):ok0.apply(this,arguments)};
 A.o=function(a,t){return chTo(a,t)==="trinhhh"?T.o(a,t):o0.apply(this,arguments)};
 A.f=function(a,t){return chTo(a,t)==="trinhhh"?T.f(a,t):f0.apply(this,arguments)}})();
/* the one «Tố giác» row tells the true result of the road it takes (Trình Hoàng hậu when a Hoàng hậu hears it) */
(function(){if(typeof AOUT!=="object")return;const d=Object.getOwnPropertyDescriptor(AOUT,"accuse");const base=()=>d?(d.get?d.get.call(AOUT):d.value):null;
 try{Object.defineProperty(AOUT,"accuse",{configurable:true,enumerable:true,get(){const t=typeof J78==="object"&&J78.cardV;if(t&&chTo(S,t)==="trinhhh"&&AOUT.trinhhh)return AOUT.trinhhh;return base()}})}catch(e){}})();
