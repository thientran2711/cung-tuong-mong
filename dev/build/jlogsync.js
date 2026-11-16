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
const plain=h=>String(h==null?"":h).replace(/^<span class="ld">[^<]*<\/span>/,"").replace(/<[^>]+>/g,"").replace(/&nbsp;/g," ");
const val=k=>S?(S[k]||0):0;
function lsSnap(){const o={};for(const [k] of LK)o[k]=val(k);return o}
/* tokens of her stats in reading order; skips someone else's ("nàng Sủng -10") and promises ("ít nhất Sủng +3") */
function lsToks(t){const out=[];for(const [k] of LK){const re=RX[k];re.lastIndex=0;let m;while((m=re.exec(t))){const pre=t.slice(Math.max(0,m.index-2),m.index);if(/\p{L}\s$/u.test(pre)&&!/(?:^|\s)(?:ta|ngươi)\s$/u.test(t.slice(Math.max(0,m.index-7),m.index)))continue;
  out.push({k,i:m.index,raw:m[0],a:m[1]!=null?+m[1]:null,b:m[2]!=null?+m[2]:null,d:m[3]!=null?(m[3]==="+"?1:-1)*+m[4]:null,s:m[6]!=null?+m[6]:m[5]!=null?+m[5]:null})}}
 return out.sort((x,y)=>x.i-y.i)}
function lsReplay(texts,start){const v=Object.assign({},start),last={};texts.forEach((t,li)=>{for(const o of lsToks(plain(t))){o.li=li;o.before=v[o.k];
  if(o.a!=null)v[o.k]=o.b;else if(o.d!=null)v[o.k]=o.s!=null?o.s:o.before+o.d;else if(o.s!=null)v[o.k]=o.s;last[o.k]=o}});return{v,last}}
/* lines: [{get:()=>html,set:h=>…}] oldest first. Rewrites a wrong stated delta to the real one; returns what is still unexplained. */
function lsFix(lines,start){const R=lsReplay(lines.map(l=>l.get()),start);const parts=[];
 for(const [k] of LK){const y=val(k);if(R.v[k]===y)continue;const o=R.last[k],[lo,hi]=bd(k),at=y<=lo||y>=hi;let done=false;
  if(o&&o.a==null){const nd=y-o.before;let rep=null;
   if(at&&nd!==0&&(o.d==null||Math.sign(nd)===Math.sign(o.d)))rep=`${NM(k)} ${o.before} → ${y} (${y>=hi?"đã đầy":"chạm đáy"})`;
   else if(at&&nd===0&&(o.d==null||(o.d>0)===(y>=hi)))rep=`${NM(k)} ${y>=hi?"đã đầy":"chạm đáy"} ${y}`;
   else if(o.d!=null&&nd!==0&&Math.sign(nd)===Math.sign(o.d))rep=`${NM(k)} ${nd>0?"+":"-"}${Math.abs(nd)}`;
   if(rep){const L=lines[o.li],h=String(L.get());let j=h.lastIndexOf(o.raw),len=o.raw.length;
    if(j<0){/* the token has tags inside ("Sủng <b>-4</b>") */const re=new RegExp(o.raw.split(/\s+/).map(esc).join("(?:\\s|<[^>]*>)+"),"g");let m;while((m=re.exec(h))){j=m.index;len=m[0].length}}
    if(j>=0){const tags=(h.slice(j,j+len).match(/<[^>]*>/g)||[]).join("");L.set(h.slice(0,j)+rep+tags+h.slice(j+len));done=true}}}
  /* no real change (y = start) and nothing to correct: the token was someone else's — nothing to add */
  if(!done&&y!==start[k]){const x=Math.min(hi,Math.max(lo,R.v[k]));if(x!==y)parts.push({k,a:x,b:y})}}
 return parts}
const partH=(p,why)=>`<span class="${(p.b>p.a)?"g":"r"}">${NM(p.k)} ${p.a} → ${p.b}</span>${why&&why[p.k]&&why[p.k].length?` (${why[p.k].join(", ")})`:""}`;
/* act summary / choice line: the part of the change since b0 that the given lines do not already say */
window.lsRest=function(b0,lines){try{const st={};for(const [k] of LK)st[k]=b0&&b0[k]!=null?b0[k]:val(k);return lsFix(lines,st).map(p=>partH(p)).join(", ")}catch(e){console.error(e);return typeof logReal==="function"?logReal(b0):""}};
window.lsLines=function(n){n=Math.max(0,Math.min(n,S.logs.length));const L=[];for(let i=n-1;i>=0;i--)L.push({get:()=>S.logs[i],set:h=>{S.logs[i]=h}});return L};
window.lsArr=function(A){return A.map((x,i)=>({get:()=>A[i],set:h=>{A[i]=h}}))};

/* ---- the ledger: what the Sổ ghi shows; every action ends with lsSync ---- */
let LG=null,ATT={},fold=0,depth=0,lab="",clickLab="";
function reset(){LG=S?{s:S,v:lsSnap(),seq:S.logSeq||0}:null;ATT={}}
function lsSync(label,why){try{if(!S||!Array.isArray(S.logs))return;if(!LG||LG.s!==S){reset();return}if(fold)return;
  const w=Object.assign({},ATT);if(why)for(const k in why)if(why[k])(w[k]=w[k]||[]).push(why[k]);
  if(S.dead||quiet){reset();return}
  const n=(S.logSeq||0)-LG.seq;const parts=lsFix(lsLines(n),LG.v).filter(p=>p.a!==p.b&&LG.v[p.k]!==p.b);
  let did=false;if(parts.length){const L=String(label||lab||clickLab||"Trong cung").replace(/[.:\s]+$/,"");log(`${L}: ${parts.map(p=>partH(p,w)).join(", ")}.`);did=true}
  reset();return did}catch(e){console.error("lsSync",e);reset()}}
window.lsSync=lsSync;window.lsSnap=lsSnap;window.lsReplay=lsReplay;
/* a reason for the changes a piece of code makes (time ticks): kept until the next lsSync */
/* now=true: the reason gets its own line at once, as deltas ("Một tuần trôi qua, ân sủng nhạt dần: Sủng -1."), so the order is the order applied
   and the chain stays right whatever is logged later; otherwise the reason waits for the next lsSync line. */
window.lsNote=function(b,why,now){try{if(!b||!S)return;const G=new Map();for(const [k] of LK){const d=val(k)-b[k];if(!d)continue;const r=typeof why==="function"?why(k):why&&typeof why==="object"?why[k]:why;if(!r)continue;
  if(now&&!quiet&&!S.dead){if(!G.has(r))G.set(r,[]);G.get(r).push(`<span class="${d>0?"g":"r"}">${NM(k)} ${d>0?"+":"-"}${Math.abs(d)}</span>`)}else{const A=ATT[k]=ATT[k]||[];if(!A.includes(r))A.push(r)}}
 if(G.size)log([...G].map(([r,p])=>`${r.charAt(0).toUpperCase()+r.slice(1)}: ${p.join(", ")}.`).join(" "))}catch(e){console.error(e)}};
function lsTag(name,why,now){const f0=window[name];if(typeof f0!=="function")return;window[name]=function(){const b=S?lsSnap():null;const r=f0.apply(this,arguments);if(b)lsNote(b,why,now);return r}}
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

/* ---- reasons of the time ticks (endTurn / monthTick); inline ones are noted in j3 ---- */
/* silent ones: their own line at once (now) */
lsTag("anMonth",k=>k==="an"?"lâu ngày, ân tình phai dần":"",true);
lsTag("artMonth",k=>k==="suc"?"đàn cầm dưỡng sức":"",true);
lsTag("v85Month",k=>k==="th"||k==="hh"?(S.duc>=60?"Đức cao, được quý hơn":"Đức thấp, bị coi nhẹ"):"",true);
/* ones whose news text (logged at the end of the turn) may already say it: the reason joins the end-of-turn line if still needed */
lsTag("stipend","bổng lộc tháng này");lsTag("v85Month","tài nghệ trong tháng");
lsTag("illMonth","bệnh tật trong tháng");lsTag("coldMonth","lãnh cung");lsTag("maidMonth","cung nữ thân tín");
lsTag("rivalsTurn","việc của các phi tần");lsTag("resolveTonight","đêm qua");lsTag("festival","lễ hội");
lsTag("wdMonth","y phục trong tháng");lsTag("ordMonth70","lệ cung trong tháng");lsTag("kidsMonth","việc của con");

/* ---- the night talk: its own result, after the night line (the owner's case) ---- */
if(typeof PEND==="object"&&PEND.night2){const n2=PEND.night2;PEND.night2=function(){const d=n2.apply(this,arguments);try{(d&&d.o||[]).forEach(o=>{const g=o.go;if(typeof g!=="function")return;
 o.go=function(){let mk=null,mq=0;const nf=nightFx;nightFx=function(){const r=nf.apply(this,arguments);mk=lsSnap();mq=S.logSeq||0;return r};let r;try{r=g.apply(this,arguments)}finally{nightFx=nf}
  try{if(mk&&S&&!S.dead){/* what its own lines (e.g. "Đức +3 vì …") do not already say */const P=lsFix(lsLines((S.logSeq||0)-mq),mk);
   if(P.length){const roll=/hỏng:/.test(o.x||"");const bad=P.some(p=>p.b<p.a);log(`${cut(o.n)}${roll?`: <span class="${bad?"r":"g"}">${bad?"hỏng":"thành"}</span>.`:":"} ${P.map(p=>partH(p)).join(", ")}.`)}}}catch(e){console.error(e)}
  return r}})}catch(e){console.error(e)}return d}}
})();
