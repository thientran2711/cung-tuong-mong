/* ===== jlogsync: Sổ ghi = header (owner 15/11 "Tại sao không khớp", OWNER_DECISIONS "Sổ ghi numbers don't match the header") =====
   Owner screenshot: Sổ ghi "Đêm nay ta được thị tẩm. Sủng 33 → 40 …" while the header showed Sủng 37.
   Cause: the night-talk choice (PEND.night2, j8) runs nightFx — which writes the night line "Sủng 33 → 40" — and THEN its own
   effect ("Xin ân cho gia đình" hỏng: Sủng -3; "Thì thầm nói xấu" hỏng: Sủng -2/-6, Danh -3; "Xin cho con" hỏng: Ân tình -2;
   "Xin tha cho cung nữ": Đức +3, Ân tình +1; "Im lặng": Ân tình +2; "Xin ân" thành: Danh +5, Bạc +40) with no line of its own.
   The audit (dev/test/log-sync.js: bots play, after every act the Sổ ghi is replayed per stat and must end at the live value)
   found the same fault family all over the game (weekly Sủng/Sức drift, monthly Thái hậu/Hoàng hậu drift, Ân tình fading,
   bổng lộc, lesson cost, danh sư, clamps at 0/100 stated as the intended delta, Sủng trait multiplier, "Ân tình 0→N" in every
   act summary because snapReal had no Ân tình, …). Rules (owner):
   (1) every change of Sắc, Tài, Tâm cơ, Đức, Danh, Sủng, Bạc, Sức (+ Ân tình, Tai mắt, Thái hậu / Hoàng hậu → ta) has a line with its reason;
   (2) the "X → Y" / "+n" chain of each stat replays to the header value; (3) same-moment changes in the order applied.
   How:
   - lsReplay(texts,start): reads her stat tokens ("Sủng 33 → 40", "Sủng +7", "Danh -3 (chạm đáy)", "Tài đã đầy 100"); a token right
     after a word ("nàng Sủng -10", "Hàn Như Ý Danh +2", "ít nhất Sủng +3") is someone else's or a promise, not hers.
   - lsFix(lines,start): a stated delta that is not the real one (clamp at 0/100, trait ×1.3/×0.7) is rewritten to the real one
     ("Danh 3 → 0 (chạm đáy)", "Sủng +9"); what no line explains is returned as "Sủng 40 → 37" parts.
   - act summaries (runOpt j2) and choice lines (logChoice j3) list only the part of the change their own lines do not already say,
     starting from the value the Sổ ghi already shows (no second "Đức 0→3" after "Đức +3 vì …").
   - every player action (act, choice, talk, place, scheme, lesson, buổi / tuần change, mini-game pay, any render) ends with lsSync:
     a change still unexplained gets one line "<the action>: Sủng 40 → 37 (reason)"; time ticks name their reason (lsTag / lsNote).
   - the night talk logs its own result after the night line ("Xin ân cho gia đình: hỏng. Sủng 40 → 37.").
   - "(đã đầy 100)" style (owner: unclear) now reads "Tài 99 → 100 (đã đầy)" (j65 trueText). */
(function(){
const LK=[["sac","Sắc"],["tai","Tài"],["tamco","Tâm cơ"],["duc","Đức"],["danh","Danh"],["sung","Sủng"],["bac","Bạc"],["suc","Sức"],["an","Ân tình"],["mat","Tai mắt"],["th",""],["hh",""]];
const NM=k=>(typeof NAMES==="object"&&NAMES[k])||(LK.find(x=>x[0]===k)||[])[1]||k;
const BD={th:[-100,100],hh:[-100,100],mat:[0,10],bac:[0,1e9]};const bd=k=>BD[k]||[0,100];
const esc=s=>s.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
const REL=w=>`${w}(?: → (?:ta|ngươi):| quý (?:ngươi|ta)| với (?:ngươi|ta):?)?(?: thiện cảm)?`;
const LAB={th:REL("Thái hậu"),hh:REL("Hoàng hậu")};
const N="(-?\\d+)",FULL="(?:đã đầy|chạm đáy)";
const RX={};for(const [k,l] of LK)RX[k]=new RegExp(`(?<![\\p{L}\\d])(?:${LAB[k]||esc(l)})(?: (?:của )?(?:ngươi|ta))?:?\\s+(?:${N}\\s*→\\s*${N}(?:\\s*\\(${FULL}\\))?|([+\\-−])(\\d+)(?:\\s*\\(${FULL}\\s*${N}?\\))?|${FULL}\\s+${N})`,"gu");
/* the bổng lộc line's total "… = +23 bạc" (its items "+35 bạc · −9 bạc" are parts of it, not counted) */
const RXB=/=\s*([+\-−])(\d+)\s*bạc/gu;
const plain=h=>String(h==null?"":h).replace(/^<span class="ld">[^<]*<\/span>/,"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ");
const val=k=>S?(S[k]||0):0;
function lsSnap(){const o={};for(const [k] of LK)o[k]=val(k);return o}
/* tokens of her stats in reading order; skips someone else's ("nàng Sủng -10") and promises ("ít nhất Sủng +3") */
function lsToks(t){const out=[];for(const [k] of LK){const re=RX[k];re.lastIndex=0;let m;while((m=re.exec(t))){const pre=t.slice(Math.max(0,m.index-2),m.index);if(/\p{L}\s$/u.test(pre)&&!/(?:^|\s)(?:ta|ngươi)\s$/u.test(t.slice(Math.max(0,m.index-7),m.index)))continue;
  out.push({k,i:m.index,raw:m[0],a:m[1]!=null?+m[1]:null,b:m[2]!=null?+m[2]:null,d:m[3]!=null?(m[3]==="+"?1:-1)*+m[4]:null,s:m[6]!=null?+m[6]:m[5]!=null?+m[5]:null})}}
 RXB.lastIndex=0;{let m;while((m=RXB.exec(t)))out.push({k:"bac",i:m.index,raw:m[0],a:null,b:null,d:(m[1]==="+"?1:-1)*+m[2],s:null,tot:1})}
 return out.sort((x,y)=>x.i-y.i)}
function lsReplay(texts,start){const v=Object.assign({},start),last={},all={};texts.forEach((t,li)=>{for(const o of lsToks(plain(t))){o.li=li;o.before=v[o.k];(all[o.k]=all[o.k]||[]).push(o);
  if(o.a!=null)v[o.k]=o.b;else if(o.d!=null)v[o.k]=o.s!=null?o.s:o.before+o.d;else if(o.s!=null)v[o.k]=o.s;last[o.k]=o}});return{v,last,all}}
/* replace the last occurrence of a token in a line's html (tags inside the token, as in "Sủng <b>-4</b>", are kept after it) */
function repl(L,raw,rep){const h=String(L.get());let j=h.lastIndexOf(raw),len=raw.length;
 if(j<0){const re=new RegExp(raw.split(/\s+/).map(esc).join("(?:\\s|<[^>]*>)+"),"g");let m;while((m=re.exec(h))){j=m.index;len=m[0].length}}
 if(j<0)return false;const tags=(h.slice(j,j+len).match(/<[^>]*>/g)||[]).join("");L.set(h.slice(0,j)+rep+tags+h.slice(j+len));return true}
/* lines: [{get:()=>html,set:h=>…}] oldest first. Rewrites a wrong stated delta to the real one; returns what is still unexplained. */
function lsFix(lines,start,force){const R=lsReplay(lines.map(l=>l.get()),start);const parts=[];
 for(const [k] of LK){const y=val(k);if(R.v[k]===y)continue;const o=R.last[k],[lo,hi]=bd(k),at=y<=lo||y>=hi;let done=false;
  if(o&&o.a==null&&!o.tot){const nd=y-o.before;let rep=null;
   if(at&&nd!==0&&(o.d==null||Math.sign(nd)===Math.sign(o.d)))rep=`${NM(k)} ${o.before} → ${y} (${y>=hi?"đã đầy":"chạm đáy"})`;
   else if(at&&nd===0&&(o.d==null||(o.d>0)===(y>=hi)))rep=`${NM(k)} ${y>=hi?"đã đầy":"chạm đáy"} ${y}`;
   else if(o.d!=null&&nd!==0&&Math.sign(nd)===Math.sign(o.d))rep=`${NM(k)} ${nd>0?"+":"-"}${Math.abs(nd)}`;
   if(rep)done=repl(lines[o.li],o.raw,rep)}
  /* several deltas past the floor / ceiling ("ra khỏi tẩm cung: Danh -3 · nơi đông người: Danh -8" at Danh 0): each one that
     crosses it says what it really did ("Danh chạm đáy 0") */
  if(!done&&at&&R.all[k]){let r=start[k];const reps=[];for(const t of R.all[k]){if(t.a!=null){r=t.b;continue}if(t.d==null){r=t.s;continue}
    const raw=t.s!=null?t.s:r+t.d,nr=Math.min(hi,Math.max(lo,raw));if(nr!==raw||t.s!=null&&nr!==r+t.d)reps.push([t,nr===r?`${NM(k)} ${nr>=hi?"đã đầy":"chạm đáy"} ${nr}`:`${NM(k)} ${r} → ${nr} (${nr>=hi?"đã đầy":"chạm đáy"})`]);r=nr}
   if(r===y&&reps.length){for(const [t,rp] of reps.reverse())repl(lines[t.li],t.raw,rp);done=true}}
  /* no real change (y = start) and nothing to correct: the token was someone else's — nothing to add */
  if(!done&&(y!==start[k]||force&&force.has(k))){const x=Math.min(hi,Math.max(lo,R.v[k]));if(x!==y)parts.push({k,a:x,b:y})}}
 return parts}
const partH=(p,why)=>`<span class="${(p.b>p.a)?"g":"r"}">${NM(p.k)} ${p.a} → ${p.b}</span>${why&&why[p.k]&&why[p.k].length?` (${why[p.k].join(", ")})`:""}`;
/* act summary / choice line: the part of the change since b0 that the given lines do not already say */
window.lsRest=function(b0,lines){try{const st={};for(const [k] of LK)st[k]=b0&&b0[k]!=null?b0[k]:val(k);return lsFix(lines,st).map(p=>partH(p)).join(", ")}catch(e){console.error(e);return typeof logReal==="function"?logReal(b0):""}};
window.lsLines=function(n){n=Math.max(0,Math.min(n,S.logs.length));const L=[];for(let i=n-1;i>=0;i--)L.push({get:()=>S.logs[i],set:h=>{S.logs[i]=h}});return L};
window.lsArr=function(A){return A.map((x,i)=>({get:()=>A[i],set:h=>{A[i]=h}}))};

/* ---- RELATIONS (tuanluc-sync item 6, owner 17/11 03:26Z: "mấy việc vặt trong tuần chưa ghi riêng … không hiểu"): every change of a
   consort's feeling for her (thiện cảm / oán / ghen) and of a servant's (thiện cảm) has its own line with the action that caused it, the
   moment it happens — the week book (j87) never needs a catch-all line. Same moments as her stats (lsSync); what the action's own lines
   already say ("Lý Tần ghen +2", "nàng quý ngươi +3" — j87 wkeTokens) is not said again. A code path may name its reason (rlTag / lsTag). ---- */
let RATT={};
function rlPeople(){const L=[];try{for(const v of (typeof rivals!=="undefined"?rivals:[]))if(v&&v!==S&&v.id!=null&&!v.dead)L.push(["v"+v.id,v])}catch(e){}
 try{[S.maid].concat(S.staff||[]).forEach(x=>{if(x&&typeof x.loyal==="number")L.push(["s"+(x.sid!=null?x.sid:x.name),x])})}catch(e){}return L}
const RLROW=["aff","oan","ghen"];
function rlSnap(){const o={};if(!S)return o;for(const [k,p] of rlPeople())o[k]=k[0]==="v"?[p.rel||0,Math.round(p.oan||0),p.ghen||0]:[p.loyal];return o}
function rlNote(b,why){try{if(!b||!why||!S)return;const a=rlSnap();for(const k in a){const x=b[k];if(!x)continue;a[k].forEach((n,i)=>{if(n!==x[i]){const key=k+"|"+RLROW[i];if(!RATT[key])RATT[key]=why}})}}catch(e){}}
window.rlNote=rlNote;window.rlSnap=rlSnap;
const RLW={aff:["thêm quý mến ta","bớt vừa lòng về ta"],oan:["thêm oán ta","bớt oán ta"],ghen:["thêm ghen ghét ta","bớt ghen"]};
const RLT={aff:"thiện cảm",oan:"oán ta",ghen:"ghen"};
function rlKnown(p){try{return !(typeof rivals!=="undefined"&&rivals.includes(p))||((typeof knows!=="function"||knows(p))&&(typeof kitKnownName!=="function"||kitKnownName(p)))}catch(e){return true}}
function rlSync(label,n,b){if(!S||!b||quiet)return false;const a=rlSnap(),P=new Map(rlPeople());const D=[];
 for(const k in a){const x=b[k];if(!x)continue;a[k].forEach((v,i)=>{const d=v-x[i];if(d)D.push({k,p:P.get(k),row:RLROW[i],d})})}
 if(!D.length)return false;
 /* what this action's own lines already said */
 let people=[];try{people=typeof kpPeople==="function"?kpPeople():[]}catch(e){}
 const said=new Map();if(typeof wkeTokens==="function")for(let i=0;i<Math.min(n||0,S.logs.length);i++){try{for(const t of wkeTokens(S.logs[i],people,true)){if(!t.who||typeof t.who!=="object"||!t.row||!t.pre||(t.pre!==t.who.name&&!String(t.pre).endsWith(" "+t.who.name)))continue;/* only a number said with that person's whole name counts as said */const m=said.get(t.who)||{};m[t.row]=(m[t.row]||0)+t.d;said.set(t.who,m)}}catch(e){}}
 const G=new Map(),U=new Map();
 for(const x of D){const m=said.get(x.p);const got=m&&m[x.row]||0;const rest=x.d-got;if(!rest)continue;if(m)m[x.row]=0;/* used */
  const why=RATT[x.k+"|"+x.row]||"";
  if(!rlKnown(x.p)){const uk=why+"|"+x.row+(rest>0?"+":"-");U.set(uk,(U.get(uk)||0)+1);continue}
  if(!G.has(why))G.set(why,[]);G.get(why).push(`<span class="${(x.row==="aff")===(rest>0)?"g":"r"}">${x.p.name} ${RLT[x.row]} ${rest>0?"+":"-"}${Math.abs(rest)}</span>`)}
 for(const [uk,c] of U){const [why,rw]=uk.split("|");const row=rw.slice(0,-1),up=rw.endsWith("+");if(!G.has(why))G.set(why,[]);G.get(why).push(`${c} người chưa quen biết ${RLW[row][up?0:1].replace(" ta","")}`)}
 if(!G.size)return false;
 const lb=String(label||"Trong cung").replace(/[.:\s]+$/,"");
 const parts=[...G].map(([why,L])=>`${why?why+": ":""}${L.join(", ")}`);
 log(`${MK("r")}${lb}: ${parts.join(" · ")}.`);return true}
/* ---- the ledger: what the Sổ ghi shows; every action ends with lsSync ---- */
let LG=null,ATT={},fold=0,depth=0,lab="",clickLab="",pm0="";
/* bookkeeping lines carry a marker: shown in the Sổ ghi, kept out of the week card (reviewer r1) */
const MK=t=>`<i class="kls" data-ls="${t}"></i>`;
/* time-tick deltas wait here and are written as ONE line per turn change ("Sang tuần mới: ân sủng nhạt dần, Sủng -1 · …") */
let TICK=new Map();
function tickFlush(label,n){if(!TICK.size||!S)return false;const g=[];for(const [r,D] of TICK){const p=Object.keys(D).filter(k=>D[k]).map(k=>`<span class="${D[k]>0?"g":"r"}">${NM(k)} ${D[k]>0?"+":"-"}${Math.abs(D[k])}</span>`);if(p.length)g.push(`${r}: ${p.join(", ")}`)}
 TICK=new Map();if(!g.length||quiet)return false;
 /* the morning line "Ngủ một đêm: Sức +N" of this turn change carries them (one line per morning, reviewer r1); it becomes a bookkeeping line */
 for(let i=0;i<Math.min(n||0,S.logs.length);i++){const h=String(S.logs[i]);if(/^(?:<span class="ld">[^<]*<\/span>)?(?:<[^>]+>)*Ngủ một đêm/.test(h)&&!/class="kls"/.test(h)){
   /* its "Sức +N" already holds the weekly rest */const g2=g.filter(x=>!/^nghỉ ngơi qua tuần:/.test(x));if(!g2.length){S.logs[i]=h.replace(/^(<span class="ld">[^<]*<\/span>)?/,m=>m+MK("t"));return i+1}g.length=0;g.push(...g2);
   S.logs[i]=h.replace(/^(<span class="ld">[^<]*<\/span>)?/,m=>m+MK("t")).replace(/[.\s]*$/,"")+` · ${g.join(" · ")}.`;return i+1}}
 log(`${MK("t")}${String(label||lab||"Sang tuần mới").replace(/[.:\s]+$/,"")}: ${g.join(" · ")}.`);return 1}
function reset(){LG=S?{s:S,v:lsSnap(),r:rlSnap(),seq:S.logSeq||0}:null;ATT={};RATT={};pm0=typeof popMsg==="string"?(typeof kShort==="function"?kShort(popMsg):popMsg):""}
/* a change no reason was given for: the pop card's own sentence of this action, if it wrote one */
function popWhy(){try{const p=typeof popMsg==="string"?(typeof kShort==="function"?kShort(popMsg):popMsg):"";if(!p||p===pm0)return"";const t=plain(p).replace(/\s+/g," ").trim().split(/(?<=[.!?])\s/)[0].replace(/[.!?]+$/,"");return t.length>2&&t.length<=90?t:""}catch(e){return""}}
function lsSync(label,why){try{if(!S||!Array.isArray(S.logs))return;if(!LG||LG.s!==S){reset();return}if(fold)return;
  const w=Object.assign({},ATT);if(why)for(const k in why)if(why[k])(w[k]=w[k]||[]).push(why[k]);
  if(quiet){TICK=new Map();reset();return}/* a death's last act still gets its line (its cost) */
  /* keys a known code path moved this window (tick deltas, tagged functions): a net-zero mismatch on them is real, not someone else's token */
  const tkK=new Set(Object.keys(ATT));for(const D of TICK.values())for(const k in D)if(D[k])tkK.add(k);
  const tk=tickFlush(label,(S.logSeq||0)-LG.seq);
  /* a net-zero change is skipped (a token about someone else), unless a known code path moved that number */
  const n=(S.logSeq||0)-LG.seq;const parts=lsFix(lsLines(n),LG.v,tkK).filter(p=>p.a!==p.b&&(LG.v[p.k]!==p.b||tkK.has(p.k)));
  let did=tk;if(parts.length){const pw=popWhy();for(const p of parts)if(!(w[p.k]&&w[p.k].length))w[p.k]=[pw||defWhy(p)];
   const P=parts.map(p=>partH(p,w)).join(", ");
   /* fewer lines (reviewer r1): the parts join this action's own newest line when it wrote one; a line only when it wrote none */
   const own=n>0&&!tk&&!/class="kls"/.test(String(S.logs[0]||""))&&!/^(?:Sang (?:tuần|buổi) mới|Trong cung)/.test(String(label||lab||clickLab||""));
   if(tk||own){const i=tk?tk-1:0;S.logs[i]=String(S.logs[i]).replace(/[.\s]*$/,"")+`${tk?" ·":" —"} ${P}.`/* same sentence: the week card splits by sentence */}
   else log(`${MK("c")}${String(label||lab||clickLab||"Trong cung").replace(/[.:\s]+$/,"")}: ${P}.`);did=true}
  try{if(rlSync(label||lab||clickLab,n,LG.r))did=true}catch(e){console.error("rlSync",e)}
  reset();return did}catch(e){console.error("lsSync",e);reset()}}
/* last-resort reason words (a change no code path named): what the number is about */
const DEF={sung:["Hoàng thượng phật ý","Hoàng thượng để mắt"],an:["tình nghĩa nhạt đi","thêm tình nghĩa"],suc:["hao sức","hồi sức"],bac:["tốn bạc","được bạc"],danh:["bị chê trách","được khen"],
 duc:["tiếng hiền giảm","tiếng hiền thêm"],th:["Thái hậu phật lòng","Thái hậu vừa lòng"],hh:["Hoàng hậu phật lòng","Hoàng hậu vừa lòng"],mat:["mất tai mắt","thêm tai mắt"],sac:["dung nhan kém đi","dung nhan tươi hơn"],
 tai:["tài học mai một","học thêm được"],tamco:["mưu trí cùn đi","hiểu thêm lòng người"]};
const defWhy=p=>(DEF[p.k]||["",""])[p.b>p.a?1:0];
window.lsSync=lsSync;window.lsSnap=lsSnap;window.lsReplay=lsReplay;
/* a reason for the changes a piece of code makes (time ticks): kept until the next lsSync */
/* now=true: the change is kept as a delta under its reason and written with the other ticks of this turn change in ONE line
   ("Sang tuần mới: ân sủng nhạt dần, Sủng -1 · nghỉ ngơi qua tuần, Sức +4"); deltas commute, so the chain stays right whatever the news
   lines say; otherwise the reason waits for the next lsSync line. */
window.lsNote=function(b,why,now){try{if(!b||!S)return;const G=new Map();for(const [k] of LK){const d=val(k)-b[k];if(!d)continue;const r=typeof why==="function"?why(k):why&&typeof why==="object"?why[k]:why;if(!r)continue;
  if(now&&!quiet){if(!TICK.has(r))TICK.set(r,{});const D=TICK.get(r);D[k]=(D[k]||0)+d}else{const A=ATT[k]=ATT[k]||[];if(!A.includes(r))A.push(r)}}
 if(TICK.size&&!depth&&!fold)lsSync(lab)}catch(e){console.error(e)}};
function lsTag(name,why,now){const f0=window[name];if(typeof f0!=="function")return;window[name]=function(){const b=S?lsSnap():null,rb=S?rlSnap():null;const r=f0.apply(this,arguments);if(b)lsNote(b,why,now);if(rb)rlNote(rb,typeof why==="function"?why("rel"):why);return r}}
window.rlTag=function(name,why){const f0=window[name];if(typeof f0!=="function")return;window[name]=function(){const rb=S?rlSnap():null;const r=f0.apply(this,arguments);if(rb)rlNote(rb,why);return r}};
/* an action: label it, flush what came before it, sync after it (outermost call only) */
function top(name,lf,isFold){const f0=window[name];if(typeof f0!=="function")return;window[name]=function(){if(depth===0&&!fold){lsSync(lab);let l="";try{l=lf?lf.apply(this,arguments):""}catch(e){}lab=l||clickLab||lab}
  depth++;if(isFold)fold++;try{return f0.apply(this,arguments)}finally{depth--;if(isFold)fold--;if(depth===0&&!fold&&lsSync(lab))try{render()}catch(e){}}}}
const cut=s=>plain(s).replace(/\s+/g," ").trim().replace(/[.:]+$/,"").slice(0,60);
top("act",i=>{const a=Array.isArray(deck)&&deck[i];return a?cut(a.n):""});
top("doAct",(i,k)=>{const v=rivals[i],a=ACT[k];return a?`${cut(a.n||k)}${v?" "+v.name:""}`:""});
top("talk",oi=>{try{return cut(talkOpts(curPeople()[popIdx])[oi].n)}catch(e){return""}});
top("goTo",k=>{try{const p=places().find(x=>x.k===k);return p?"Đến "+p.n:""}catch(e){return""}});
top("lesson",k=>{try{const a=ARTS.find(x=>x.k===k);return a?"Học "+a.n:""}catch(e){return""}});
top("hireMaster",()=>"Mời danh sư");
top("chooseM",i=>{try{const m=Q[0],c=m&&m.opts&&m.opts[i];return c?cut(c.n):""}catch(e){return""}},true);
top("closeModal",()=>{try{return cut((Q[0]&&Q[0].t)||"")}catch(e){return""}});
top("nextBuoi",()=>S&&(S.buoi||0)>=(typeof B4L!=="undefined"?B4L:3)?"Sang tuần mới":"Sang buổi mới");
if(typeof window.aaPayMG==="function"){const p0=window.aaPayMG;window.aaPayMG=function(sc){const t=window.__aaTitle||(sc&&sc.title)||"Trò tài nghệ";lsSync(lab);lab=cut(t);const r=p0.apply(this,arguments);lsSync(lab);return r}}
/* any other tap (shop, gift, chest, …): its button names the action; the render after it syncs */
document.addEventListener("click",e=>{try{const b=e.target.closest&&e.target.closest("button,.opt,[data-a],[data-k]");if(!b)return;const t=cut(b.getAttribute("aria-label")||b.textContent||"");if(t&&t.length>=2){if(depth===0&&!fold)lsSync(lab);clickLab=t;lab=""}}catch(x){}},true);
{const r0=render;render=function(){if(depth===0&&!fold)lsSync(lab);return r0.apply(this,arguments)}}
{const d0=deser;deser=function(){const r=d0.apply(this,arguments);reset();return r}}
{const s0=start;start=function(){const r=s0.apply(this,arguments);reset();return r}}

/* one wording for the monthly Thái hậu / Hoàng hậu drift by Đức (j3 monthTick + j85 v85Month write into the same group) */
function lsDucWhy(){return S&&S.duc>=60?"Đức cao, được quý hơn":"Đức thấp, bị coi nhẹ"}window.lsDucWhy=lsDucWhy;
/* the turn change writes its tick line once, at its end */
{const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);if(!depth&&!fold)lsSync("Sang tuần mới");return r}}
/* ---- week card (dawn / Tuần lục): bookkeeping lines are left out — they only restate numbers the card already sums ---- */
function noBook(f0){return function(){if(!S||!Array.isArray(S.logs))return f0.apply(this,arguments);const keep=S.logs,ks=S.logSeq||0,s=S.wkSnap||(typeof wkSnap==="function"?wkSnap():{seq:0});
  const n=Math.max(0,Math.min(keep.length,ks-(s.seq||0)));const head=keep.slice(0,n).filter(x=>!/class="kls"/.test(String(x)));
  S.logs=head.concat(keep.slice(n));S.logSeq=ks-(n-head.length);try{return f0.apply(this,arguments)}finally{S.logs=keep;S.logSeq=ks}}}
if(typeof wkSummary==="function")wkSummary=noBook(wkSummary);
/* the week's snapshot is taken INSIDE endTurn: write what changed before it first, so a change and its line sit in the same week (tuanluc-sync) */
if(typeof wkSnap==="function"){const w0=wkSnap;wkSnap=function(){try{if(!fold&&S&&LG&&LG.s===S)lsSync(lab||"Sang tuần mới")}catch(e){}return w0.apply(this,arguments)}}
/* tuanluc-sync item 6: the Tuần lục person pages KEEP the bookkeeping lines — they hold the cause of every change of Sủng / thiện cảm / oán /
   ghen (rlSync, the time ticks); j87 lists them on the person's page only, never on her own page (they restate her numbers) */
/* ---- reasons of the time ticks (endTurn / monthTick); inline ones are noted in j3 ---- */
/* silent ones: their own line at once (now) */
lsTag("anMonth",k=>k==="an"?"lâu ngày, ân tình phai dần":"",true);
lsTag("artMonth",k=>k==="suc"?"đàn cầm dưỡng sức":"",true);
lsTag("v85Month",k=>k==="th"||k==="hh"?lsDucWhy():"",true);
/* ones whose news text (logged at the end of the turn) may already say it: the reason joins the end-of-turn line if still needed */
lsTag("v85Month","tài nghệ trong tháng");
/* a higher consort's monthly ban thưởng lands in her purse (jecon econDoDuty for an NPC) */
if(typeof econDoDuty==="function"){const e0=econDoDuty;econDoDuty=function(p){const b=S?lsSnap():null;const r=e0.apply(this,arguments);try{if(b&&p&&p!==S)lsNote(b,k=>k==="bac"?`${p.name} ban thưởng`:"",true)}catch(e){}return r}}
lsTag("illMonth","bệnh tật trong tháng");lsTag("coldMonth","lãnh cung");lsTag("maidMonth","cung nữ thân tín");
lsTag("rivalsTurn","việc của các phi tần");lsTag("resolveTonight","đêm qua");lsTag("festival","lễ hội");
lsTag("wdMonth","y phục trong tháng");lsTag("ordMonth70","lệ cung trong tháng");lsTag("kidsMonth","việc của con");

/* ---- the night talk: its own result, after the night line (the owner's case) ---- */
if(typeof PEND==="object"&&PEND.night2){const n2=PEND.night2;PEND.night2=function(){const d=n2.apply(this,arguments);try{(d&&d.o||[]).forEach(o=>{const g=o.go;if(typeof g!=="function")return;
 o.go=function(){let mk=null,mq=0;const nf=nightFx;nightFx=function(){const r=nf.apply(this,arguments);mk=lsSnap();mq=S.logSeq||0;return r};let r;try{r=g.apply(this,arguments)}finally{nightFx=nf}
  try{if(mk&&S&&!S.dead){/* what its own lines (e.g. "Đức +3 vì …") do not already say */const P=lsFix(lsLines((S.logSeq||0)-mq),mk);
   /* folded into the choice line "Đêm thị tẩm: <choice> — …": the choice is not named again; a rolled talk says thành / hỏng */
   if(P.length){const roll=/thành:|hỏng:/.test(o.x||"");const bad=P.some(p=>p.b<p.a);log(`${roll?`<span class="${bad?"r":"g"}">${bad?"Hỏng":"Thành"}</span>: `:"Sau đó: "}${P.map(p=>partH(p)).join(", ")}.`)}}}catch(e){console.error(e)}
  return r}})}catch(e){console.error(e)}return d}}
})();
