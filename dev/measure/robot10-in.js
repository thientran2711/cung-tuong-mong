/* robot10-in.js — in-page half of the ROBOT-10 harness (dev/measure/robot10.js). Loaded AFTER inpage6.js (+ inty.js) in the fast bot page.
   It adds: forced road (thân phận branch) per life, the 10 bot personalities (hooks in inpage6: __pw / __allowBad / __persOpts / __persPick / __minS),
   and the per-life checks that run inside the game: save/load round-trip every buổi, one-core number audit (shown number vs the effect it applies),
   cổ-trang wording audit (no %, odds words only from the VANPHONG ladder), lag per buổi, and the queue of save snapshots robot10.js loads into the
   real-render pages (Fold 755x1000 + iPad 1180x820) for the UI checks.
   Config comes in window.__r10cfg = {origin, road, pers, uiEvery, lagMs}. Results: window.__r10 (read by robot10.js). */
(function(){
const C=window.__r10cfg||{};const R=window.__r10={bugs:[],seen:{},cps:[],buoi:0,rt:0,rtMs:0,nbMs:[],pers:C.pers,road:null,origin:null,lastSave:null,firstSave:null,words:0,opts:0};
const strip=x=>String(x==null?"":x).replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
const where=()=>{try{return S?`năm ${S.year} th${S.month} t${S.tuan} b${S.buoi||0} (buổi #${R.buoi})`:""}catch(e){return""}};
/* one bug per key (type + message); n counts repeats; the repro save is the save taken at the start of the buổi it happened in */
function bug(type,msg,detail){const key=type+"|"+String(msg).slice(0,160);const b=R.seen[key];if(b){b.n++;return}
 const x={type,msg:String(msg).slice(0,300),detail:detail==null?"":String(detail).slice(0,600),at:where(),buoi:R.buoi,n:1,save:R.lastSave};R.seen[key]=x;R.bugs.push(x)}
R.bug=bug;

/* ---- forced thân phận: origin via window.__forceOrigin (j2 start), road = the j67 premise arc picked in a67init (jst14) ---- */
window.__origO=C.origin;window.__ovX=1;window.__forceOrigin=C.origin;
if(C.road&&typeof a67init==="function"){const i0=a67init;a67init=function(k){const p0=pk67,c0=choose67;const want=C.road;
  pk67=function(a){return Array.isArray(a)&&a.includes(want)?want:p0.apply(this,arguments)};choose67=function(k2,ids){return Array.isArray(ids)&&ids.includes(want)?want:c0.apply(this,arguments)};
  try{return i0.apply(this,arguments)}finally{pk67=p0;choose67=c0}}}

/* ---- the 10 personalities (distinct goals / choice policies). mode: sens = inpage6 sensible player, rand = inpage6 random player ---- */
const fxOf=o=>Object.assign({},o.fx||{});
const sum=f=>Object.values(f).reduce((a,v)=>a+(typeof v==="number"?v:0),0);
const negSum=f=>Object.entries(f).reduce((a,[k,v])=>a+(typeof v==="number"&&v<0?(k==="bac"?v/10:v):0),0);
function rivalActs(){const out=[];try{rivals.forEach((v,i)=>{if(!v.alive||v.out||!can(2))return;const d=document.createElement("div");d.innerHTML=rvButtons(v,i);
  [...d.querySelectorAll("button[data-r]")].filter(b=>!b.disabled).forEach(b=>out.push({i,k:b.dataset.a}))})}catch(e){}return out}
const PERS={
 skilled:{mode:"sens",d:"plays to climb: inpage6 sensible scoring (sủng/danh/đức), exams, rest, make-up"},
 random:{mode:"rand",d:"any legal action or option, uniformly at random"},
 greedy:{mode:"sens",d:"greedy for bạc: bạc weighted ×8, always takes the option that pays most bạc",set(){window.__pw={bac:8}},
  pick(ok){let b=null,bv=-1e9;ok.forEach(([o,i])=>{const v=(fxOf(o).bac||0);if(v>bv){bv=v;b=i}});return bv>0?b:null}},
 cautious:{mode:"sens",d:"avoids risk and loss: sức/đức weighted ×3, picks the option with the smallest loss, rests early",set(){window.__pw={suc:3,duc:3}},
  pick(ok){let b=null,bv=-1e9;ok.forEach(([o,i])=>{const v=negSum(fxOf(o))*10-(o.risk==="liều"?20:o.risk?5:0)+sum(fxOf(o))*.1;if(v>bv){bv=v;b=i}});return b},
  opts(opts){if(S.suc<70)opts.forEach(o=>{if(o.L&&/Nghỉ ngơi/.test(o.L))o.s+=5})}},
 schemer:{mode:"sens",d:"schemes against rivals every chance (spy, accuse, frame…), dark acts allowed",set(){window.__allowBad=1},
  opts(opts){rivalActs().forEach(a=>opts.push({L:"rv"+a.i+a.k,s:2.2+Math.random(),f:()=>{doAct(a.i,a.k)}}))},
  pick(ok){const x=ok.find(([o])=>/vu|hại|tố|mưu|cài|tung tin|bôi nhọ/i.test(o.n||""));return x?x[1]:null}},
 lover:{mode:"sens",d:"chases love: the affair road (inpage6 __aff), meets men, keeps trysts",set(){window.__aff=1},
  pick(ok){const x=ok.find(([o])=>/gặp|hẹn|thương|tình|ở lại/i.test(o.n||""));return x?x[1]:null}},
 scholar:{mode:"sens",d:"studies: lessons, self-study of arts and tứ đức first, tài ×4",set(){window.__pw={tai:4}},
  opts(opts){opts.forEach(o=>{if(o.L==="self"||o.L==="vself")o.s+=3;else if(!o.L)o.s+=1})}},
 rebel:{mode:"sens",d:"defies: dark and defiant options, low đức weight, refuses orders",set(){window.__allowBad=1;window.__pw={duc:-1}},
  pick(ok){let b=null,bv=-1e9;ok.forEach(([o,i])=>{const f=fxOf(o);const v=-(f.duc||0)+(/không|từ chối|cãi|chống|kháng|bỏ trốn|mặc kệ/i.test(o.n||"")?5:0);if(v>bv){bv=v;b=i}});return b}},
 lazy:{mode:"sens",d:"lazy / skips: only very good actions (ends buổi early), takes the last (skip) option",set(){window.__minS=1.5;window.__noSelf=1},
  pick(ok){return ok[ok.length-1][1]}},
 speed:{mode:"rand",d:"speed-tapper: random actions, always taps the first option at once",pick(ok){return ok[0][1]}}};
const P=PERS[C.pers]||PERS.skilled;R.mode=P.mode;R.desc=P.d;
try{if(P.set)P.set()}catch(e){}
window.__persPick=P.pick?function(ok,m){return P.pick(ok,m)}:null;window.__persOpts=P.opts?function(o,N){P.opts(o,N)}:null;
window.__R10PERS=Object.fromEntries(Object.entries(PERS).map(([k,v])=>[k,{mode:v.mode,d:v.d}]));

/* ---- cổ-trang wording audit (law 7, VANPHONG): no %, no machine odds words; "khả năng: X" only with a ladder word ---- */
function words(txt,ctx){txt=strip(txt);if(!txt)return;R.words++;
 if(/\d\s*%|%/.test(txt))bug("word","% shown to the player",ctx+": "+txt.slice(Math.max(0,txt.indexOf("%")-80),txt.indexOf("%")+20));
 const m=txt.match(/tỉ lệ|xác suất|phần trăm/i);if(m)bug("word","machine odds word «"+m[0]+"»",ctx+": "+txt.slice(0,200));
 txt.replace(ODDS,(a)=>{bug("word","two odds scales mixed: «"+a.trim()+"»",ctx+": "+txt.slice(0,240));return a})}
/* two odds scales, never mixed (OD:L221, VANPHONG 66-67, j1 chanceW): «khả năng vừa/cao/thấp…» is the side-chance scale (correct);
   the 7-step ladder is an act's own odds. Flag only a ladder word used as a «khả năng» reading (the two scales mixed) */
/* the act-odds ladder is READ from the game (KIT_ODDS, a top-level const of j79 — not a window property; the owner changes it — never a typed list here). Longest words first so
   «Rất chắc» is not read as «chắc». No KIT_ODDS → no ladder check (logged once) */
const KO=((typeof KIT_ODDS!=="undefined"&&Array.isArray(KIT_ODDS))?KIT_ODDS:Array.isArray(window.KIT_ODDS)?window.KIT_ODDS:[]).map(w=>String(w).trim()).filter(Boolean);R.KIT_ODDS=KO.slice();
const esc=w=>w.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");
const ODDS=KO.length?new RegExp("khả năng\\s*:?\\s*("+KO.slice().sort((a,b)=>b.length-a.length).map(esc).join("|")+")(?![\\p{L}])","giu"):/(?!)/g;R.ODDS=ODDS;
if(!KO.length)bug("harness","KIT_ODDS not found in the game: odds-ladder checks are off","");
R.words_=words;

/* ---- one-core number audit (law 4): a number printed on an option ("Sủng +3", "Bạc -20") must be the number the option applies ---- */
const LAB={"Sủng":"sung","Danh":"danh","Đức":"duc","Bạc":"bac","Sức khỏe":"suc","Sức":"suc","Sắc":"sac","Tài":"tai","Tâm cơ":"tamco","Thái hậu":"th","Hoàng hậu":"hh","Tai mắt":"mat"};
const RX=/(Sủng|Danh|Đức|Bạc|Sức khỏe|Sức|Sắc|Tài|Tâm cơ|Tai mắt)\s*([+\-−–])\s*(\d+)/g;
function auditOpt(o,m){const txt=strip((o.n||"")+" | "+(o.x||""));const key=txt;if(R.seen["o|"+key])return;R.seen["o|"+key]=1;R.opts++;
 words(txt,"option «"+strip(m.t||m.title||"").slice(0,60)+"»");
 /* segments: "thành:" numbers belong to the win block, "hỏng:" to the loss block, the rest to the sure effect / cost */
 const obj=x=>x&&typeof x==="object"?x:null;const PW=[o.w,o.win,o.__w].map(obj).filter(Boolean),PL=[o.l,o.lose,o.__l].map(obj).filter(Boolean),PF=[o.fx,o.c,o.cost].map(obj).filter(Boolean);
 /* (typed-stat review, 4/4 false positives): «thắng:» = «thành:» (win on the roll; fx is the stake); a bare number with no marker may be the win of a
    sure option → compared with the win block AND the cost; the weather note «đi kiệu … Bạc −N» is charged later (jweather wxAfter, BAL.wx.kieuBac): skipped */
 txt.split(/(?=thành:|thắng:|hỏng:|thua:|kèm:|tốn:|được:|mất:)/i).forEach(seg=>{if(/kiệu/i.test(seg))return;const pools=/^(thành|thắng):/i.test(seg)?PW:/^(hỏng|thua):/i.test(seg)?PL:PF.concat(PW);if(!pools.length)return;
 seg.replace(RX,(a,lab,sg,n)=>{const k=LAB[lab];const v=(sg==="+"?1:-1)*(+n);const vals=pools.map(p=>p[k]).filter(x=>typeof x==="number");
  if(!vals.length)return a;/* not in any effect block: a description, not a promise */
  /* robot10-onecore: a RECURRING amount («mỗi tháng Bạc +8», «Sủng +1 mỗi năm») is paid later, each period, by its own rule (j42 spyPay …), not by
     this option's sure effect: never compared with fx (the A/B harness flagged «Bạc +8» vs fx bac 20 in «Bạc lạ»: +20 now AND +8 each month, both true) */
  {const i=seg.indexOf(a);const ctx=seg.slice(Math.max(0,i-16),i)+"|"+seg.slice(i+a.length,i+a.length+14);if(/mỗi (tháng|năm|tuần|buổi|ngày|kỳ|lần)/i.test(ctx))return a}
  if(!vals.some(x=>x===v||Math.abs(x)===Math.abs(v)))bug("number","option text «"+a+"» but the effect applies "+k+"="+vals.join("/"),"«"+txt.slice(0,160)+"» in «"+strip(m.t||m.title||"").slice(0,60)+"» fx="+JSON.stringify(o.fx||{}).slice(0,120));return a})})}
/* robot10-onecore 2 (law 4 + law 11, «Thay hết nước, đồ ăn | Sức +6» vs fx suc −2 in «Chuyện lạ cần tra»): a j68 option (c6) keeps its WIN / LOSS
   blocks in a closure; only the cost (fx) was readable, so a sure option's win number («Sức +N») was compared with the cost alone. c6 now hands the
   audit its blocks (non-enumerable __w / __l: never saved, never sent); the «pw» road (the bạc paid only on success) moves that bạc into the win as c6 does */
if(typeof c6==="function"&&!c6.__r10){const c60=c6;c6=function(n,s){const c=c60.apply(this,arguments);try{if(c&&s){let w=s.w||null;if(s.pw&&s.c&&s.c.bac<0)w=Object.assign({},w||{},{bac:s.c.bac});
 Object.defineProperty(c,"__w",{value:w,enumerable:false,configurable:true});Object.defineProperty(c,"__l",{value:s.l||null,enumerable:false,configurable:true})}}catch(e){}return c};c6.__r10=1}
R.auditOpt=auditOpt;/* robot10-onecore: dev/tools/choice-value-scan.js --numbers runs the same rule on every option it builds */
{const c0=chooseM;chooseM=function(i){try{const m=Q[0];if(m&&m.opts){if(!m.__r10){m.__r10=1;words((m.t||m.title||"")+" "+(m.h||""),"card");m.opts.forEach(o=>auditOpt(o,m))}}}catch(e){}return c0.apply(this,arguments)}}
/* logs (her journal) and the life's ending text are player-visible too */
let logSeen=0;function auditLogs(){try{const L=S.logs||[];const n=Math.min(L.length,8);for(let i=0;i<n;i++){const t=strip(L[i]);if(R.seen["l|"+t])continue;R.seen["l|"+t]=1;words(t,"nhật ký")}}catch(e){}}
/* the owner's tally (OD 23/11 ~20:45Z): ending id + type, death cause / age / stage, max rank, every rank step, top titles */
const GROUP={death:"death",grand:"đại kết cục",rare:"rare",fate:"kỳ ngộ",exile:"thường",fail:"thường",leave:"thường",throne:"thường"};
{const o0=over;over=function(h,t,fate,alive){const was=!S||S.dead;try{words(h+" "+t+" "+fate,"ending")}catch(e){}const r=o0.apply(this,arguments);
 try{if(!was&&S&&S.dead&&!R.life){life0();const f=strip(fate);let type=S.kesT||"";try{if(!type&&typeof kesLife==="function")type=kesLife(h,fate,false)}catch(e){}
  let cause="";try{const ch=typeof deathChain==="function"?deathChain(fate):[];cause=strip(ch[0]||"")}catch(e){}
  const P=(typeof BAL!=="undefined"&&BAL.st14&&BAL.st14.parts)||null,ch=S.st&&S.st.ch?S.st.ch.n:null;let part=null;if(P&&ch!=null)P.forEach((x,i)=>{if(ch>=x[0]&&ch<=x[1])part=i});
  const all=strip(h)+" · "+f;
  R.life={id:strip(h),type,group:GROUP[type]||(type?"thường":"?"),fate:f.slice(0,240),death:type==="death",cause:f.replace(/^Năm \d+,\s*/,"").slice(0,160),chain0:cause.slice(0,160),/* cause = the record line (fate); the first deathChain row kept apart (it can be «Kẻ thù còn sống: …», not a cause). Successor: map to the die(why) list (OWNER ORDER #4) */age:S.age,year:S.year,years:+((S.turn||0)/12).toFixed(2),
   chapter:ch,part,rank:S.rank,rankN:RANKS[S.rank]&&RANKS[S.rank].n,maxRank:Math.max(R.maxR,S.maxRank||0),maxRankN:RANKS[Math.max(R.maxR,S.maxRank||0)]&&RANKS[Math.max(R.maxR,S.maxRank||0)].n,
   top:{hoangHau:Math.max(R.maxR,S.maxRank||0)>=7,nuDe:/Nữ đế|nhất đế/i.test(strip(h))&&!/phế|thoái vị/i.test(strip(h)),hoangThaiHau:/Thái hậu/i.test(strip(h))}/* read from the ending title (j99succ titles: Hoàng thái hậu / Nhiếp chính Thái hậu / Nữ đế …) */,
   steps:R.steps.slice(),kids:(S.kids||[]).length,m:R.mSnap?R.mSnap():null}}}catch(e){R.life={err:String(e.message)}}
 return r}}

/* ==== OWNER ORDER #4 metric set (+ #2/#3 pace counters, #5 event variety): R.m, read by robot10.js into r.life.m; tables in robot10-agg.js ====
   Every hook is a wrap of a global game function (callers reach it by its global name); a missing function = that metric stays empty. */
const RB=()=>{try{return RANKS[S.rank]?S.rank:0}catch(e){return 0}};
const M=R.m={die:null,exec:0,framed:[],cold:0,demote:0,preg:0,sons:0,daus:0,kidDead:0,heirMade:0,heirLost:0,nights:0,sungPk:0,bacPk:0,bacEnd:0,bacZero:0,
 schemes:{},schemeCaught:0,mg:[],ky:[],opt:{},ev:{},evN:0,pace:{clicks:0,choices:0,chars:0,mgPlay:0,mgSkip:0,buoi:0},rankAt:{}};
const wrapG=(n,f)=>{try{const o=window[n];if(typeof o!=="function")return;const w=f(o);window[n]=w;try{eval(n+"=w")}catch(e){}}catch(e){}};
/* 1 DEATH: the exact die(why) text, an execution (deathSentence on her), framing (framed(S) = an accusation that stuck) */
wrapG("die",o=>function(why){try{if(S&&!S.dead&&!M.die)M.die={why:strip(why).slice(0,200),buoi:R.buoi,rank:S.rank,age:S.age,exec:!!M._exec,framedRecent:M.framed.some(f=>R.buoi-f.buoi<=36)}}catch(e){}return o.apply(this,arguments)});
wrapG("deathSentence",o=>function(p,why){const me=typeof p==="string"||p===S;if(me)M._exec=1;try{return o.apply(this,arguments)}finally{if(me){M.exec++;M._exec=0}}});
wrapG("framed",o=>function(p,why){try{if(p===S)M.framed.push({buoi:R.buoi,why:strip(why).slice(0,80)})}catch(e){}return o.apply(this,arguments)});
wrapG("cold",o=>function(){try{if(S&&!S.dead)M.cold++}catch(e){}return o.apply(this,arguments)});
wrapG("punish",o=>function(p){try{if((typeof p==="string"||p===S)&&M._act)M._caught=1}catch(e){}return o.apply(this,arguments)});
/* 5 SCHEMES she runs: doAct(i,k) on a rival; caught = she is punished / sentenced inside the same act */
wrapG("doAct",o=>function(i,k){M._act=k;M._caught=0;try{return o.apply(this,arguments)}finally{const x=M.schemes[k]=M.schemes[k]||{n:0,caught:0};x.n++;if(M._caught){x.caught++;M.schemeCaught++}M._act=null}});
/* 4 FAMILY: Thái tử made (setHeir on her child) */
wrapG("setHeir",o=>function(k){try{if(S&&S.kids&&S.kids.includes(k))M.heirMade++}catch(e){}return o.apply(this,arguments)});
/* 7 MINI-GAMES: every mini-game she plays or leaves to luck, with her rank at the time (law 5: harder as she climbs) */
const mgRec=(k,how,win,score)=>{try{M.mg.push({k:String(k||"?"),r:S.rank,how,win:!!win,sc:score==null?null:Math.round(score*10)/10});if(how==="skip")M.pace.mgSkip++;else M.pace.mgPlay++}catch(e){}};
wrapG("startContest",o=>function(spec){try{const sp=Object.assign({},spec);const d0=sp.onDone;sp.onDone=function(res){try{mgRec("thi:"+(sp.art||"?"),res&&res.skipped?"skip":"play",res&&res.place===1,res&&res.score)}catch(e){}return d0&&d0.apply(this,arguments)};return o.call(this,sp)}catch(e){return o.apply(this,arguments)}});
/* a lesson opened by openMG can run on the j82 board (j83 routes it to playArt) and still call the j5 callback: count it ONCE (the j5 result) */
wrapG("playArt",o=>function(spec){const inMG=!!M._mgOpen;try{const sp=Object.assign({},spec);const d0=sp.onDone;sp.onDone=function(raw,x){try{if(!inMG)mgRec("hoc:"+(sp.art||"?"),x&&x.skipped?"skip":"play",raw>=5,raw)}catch(e){}return d0&&d0.apply(this,arguments)};return o.call(this,sp)}catch(e){return o.apply(this,arguments)}});
wrapG("openMG",o=>function(k,lv,cb){M._mgOpen=1;try{return o.call(this,k,lv,function(g){M._mgOpen=0;try{const t=(document.querySelector("#mgb .mgres")||{}).textContent||"";mgRec("hoc:"+k,/May mắn|Không vào/.test(t)?"skip":"play",g>=(S.master?4:2),g)}catch(e){}return cb&&cb.apply(this,arguments)})}catch(e){M._mgOpen=0;throw e}});
/* 9 BALANCE + 12 EVENT VARIETY + pace: every card she answers (key = pid or the title without numbers/names), every option offered / taken */
const cardKey=m=>{const t=strip(m.t||m.title||"").replace(/\d+/g,"#").slice(0,48);return (m.pid?String(m.pid).replace(/[-_:]?\d+$/,""):"")+"|"+t};
const famOf=m=>{const p=String(m.pid||"");return p?p.replace(/[-_:\d].*$/,"").slice(0,16)||"pid":(m.ev?"ev":"card")};
{const c1=chooseM;chooseM=function(i){try{const m=Q[0];if(m&&m.opts){const k=cardKey(m);const e=M.ev[k]=M.ev[k]||{f:famOf(m),n:0};e.n++;M.evN++;
  M.pace.choices++;M.pace.chars+=strip((m.t||"")+" "+(m.h||"")).length+m.opts.reduce((a,o)=>a+strip((o.n||"")+" "+(o.x||"")).length,0);
  if(m.pid==="kyngo")M.ky.push(strip(m.t||m.title||"").slice(0,60));
  if(m.opts.length>1){const ok=m.opts.filter(o=>!o.off);if(ok.length>1){const ck=k.slice(0,60);const t=M.opt[ck]=M.opt[ck]||{};ok.forEach(o=>{const on=strip(o.n||"").replace(/\d+/g,"#").slice(0,40);const x=t[on]=t[on]||[0,0];x[0]++;if(o===m.opts[i])x[1]++})}}}}catch(e){}return c1.apply(this,arguments)}}
/* per buổi: favor / economy / family / rank / pace (one click per buổi change + every bot step that is an action) */
let kidsSeen=new Map(),pregOn=false,rk0=null;
/* child identity must survive a save round-trip (objects are re-created, kids have no id): id if any, else unique name + sex (mkKid keeps names unique) */
const kidKey=k=>k&&k.id!=null?"i"+k.id:"n"+(k&&k.name||"")+"|"+(k&&k.sex||"");
/* self-check: sons+daus must equal the distinct kids seen (a re-count after reload would break this) */
R.kidCheck=()=>({sons:M.sons,daus:M.daus,distinct:kidsSeen.size,ok:M.sons+M.daus===kidsSeen.size});
function perBuoi(){try{if(!S)return;M.pace.buoi++;M.pace.clicks++;M.sungPk=Math.max(M.sungPk,S.sung||0);M.bacPk=Math.max(M.bacPk,S.bac||0);M.bacEnd=S.bac;if((S.bac||0)<=0)M.bacZero++;M.nights=S.nights||0;
 const pg=!!S.preg;if(pg&&!pregOn)M.preg++;pregOn=pg;
 (S.kids||[]).forEach(k=>{const id=kidKey(k);if(!kidsSeen.has(id)){kidsSeen.set(id,k.alive!==false);if(k.sex==="m")M.sons++;else M.daus++}else if(kidsSeen.get(id)&&k.alive===false){kidsSeen.set(id,false);M.kidDead++;if(k.heir||(S.heir&&S.heir.k===k))M.heirLost++}});
 if(S.heir&&S.heir.k&&S.heir.k.alive===false&&!M._hl){M._hl=1}
 if(rk0!=null&&S.rank<rk0)M.demote++;rk0=S.rank;if(M.rankAt[S.rank]==null)M.rankAt[S.rank]={buoi:R.buoi,age:S.age,year:S.year,clicks:M.pace.clicks,choices:M.pace.choices,chars:M.pace.chars,mg:M.pace.mgPlay,mgs:M.pace.mgSkip}}catch(e){}}
R.perBuoi=perBuoi;
/* pace clicks: every act she takes (act / doAct / goTo / lesson buttons) + every card answer (choices) + every «Sang ngày mới» (perBuoi) */
["act","goTo","lesson","lessonMode","lessonVir"].forEach(n=>wrapG(n,o=>function(){M.pace.clicks++;return o.apply(this,arguments)}));
{const d1=doAct;doAct=function(){M.pace.clicks++;return d1.apply(this,arguments)}}
R.mSnap=()=>{const o=JSON.parse(JSON.stringify(M,(k,v)=>k[0]==="_"?undefined:v));try{o.ky=(S&&S.ky&&S.ky.got||[]).map(id=>(window.KY&&KY.TITLE&&KY.TITLE[id])||id).concat(o.ky.filter(x=>x&&!/^\s*$/.test(x))).filter((x,i,a)=>a.indexOf(x)===i);o.nights=S?S.nights||0:o.nights}catch(e){}
 o.evDistinct=Object.keys(o.ev).length;o.evRep=Object.values(o.ev).filter(e=>e.n>1).length;return o};

/* ---- stat sanity: inpage6 __bad already lists NaN / negative / over-cap stats; robot10.js turns them into bugs ---- */

/* ---- each buổi: lag, save/load round-trip (ser → JSON → deser → ser must be equal), snapshot for the UI pages ---- */
const J=x=>String(JSON.stringify(x));
/* a field the load fills in (undefined → default: normAll / lazy init) is not a loss; a field that changes or disappears is */
function diffPath(a,b,p){if(a===b||a===undefined)return null;
 if(typeof a==="string"&&typeof b==="string"){let i=0;while(i<a.length&&a[i]===b[i])i++;return p+" (text differs at char "+i+"): «…"+a.slice(Math.max(0,i-30),i+40)+"» → «…"+b.slice(Math.max(0,i-30),i+40)+"»"}
 if(typeof a!==typeof b||a===null||b===null||typeof a!=="object")return p+": "+J(a).slice(0,60)+" → "+J(b).slice(0,60);
 const ks=new Set(Object.keys(a).concat(Object.keys(b)));for(const k of ks){const r=diffPath(a[k],b[k],p+"."+k);if(r)return r}return null}
const VOL=new Set(["at"]);
function roundTrip(){if(!S||S.dead||S.mg)return;const t0=performance.now();let s1;
 try{const d1=ser();VOL.forEach(k=>delete d1[k]);s1=JSON.stringify(d1)}catch(e){bug("save","ser() throws",e.message);return}
 R.lastSave=s1;if(!R.firstSave)R.firstSave=s1;
 /* in-place load only at a quiet moment (no card waiting, no night flip pending): loading the bot's own game under a pending night flip
    (jnf S.nfX open/wait, cards tracked by object in FLIPQ) locks the clock — the harness must not cause that itself; the real load path is
    tested at the UI checkpoints (robot10.js nightAfterLoad) */
 if(Q.length||(S.nfX&&S.nfX.st&&S.nfX.st!=="done")){R.rtSkip=(R.rtSkip||0)+1;try{JSON.parse(s1)}catch(e){bug("save","save is not valid JSON",e.message)}
  /* once per life (after the first checkpoint), a save taken while the night flip is pending goes to the real pages too: she can close the game there */
  if(C.uiEvery&&S.nfX&&S.nfX.st!=="done"&&!R.nightCp&&R.nextCp){R.nightCp=1;R.cps.push({buoi:R.buoi,at:where()+" (night flip pending)",save:s1,q:(Q[0]&&strip(Q[0].t||Q[0].title||"").slice(0,60))||""})}return}
 try{quiet=true;deser(JSON.parse(s1));quiet=false;const d2=ser();VOL.forEach(k=>delete d2[k]);const s2=JSON.stringify(d2);
  if(s1!==s2){const dp=diffPath(JSON.parse(s1),JSON.parse(s2),"save");bug("save","save→load→save changes the state",dp)}}
 catch(e){quiet=false;bug("save","load of her own save throws",String(e.message)+" "+(String(e.stack).split("\n")[1]||"").trim())}
 R.rt++;R.rtMs+=performance.now()-t0;
 if(C.uiEvery&&R.buoi>=(R.nextCp||1)){R.nextCp=R.buoi+C.uiEvery;R.cps.push({buoi:R.buoi,at:where(),save:s1,q:(Q[0]&&strip(Q[0].t||Q[0].title||"").slice(0,60))||""})}}
/* game time: a buổi only counts when the clock really moves (a «Sang ngày mới» that does nothing is a soft-lock, not a buổi) */
const gt=()=>S?((S.turn||0)*3+(S.tuan||0))*10+(S.buoi||0):0;R.noAdv=0;R.calls=0;R.steps=[];R.maxR=-1;
function life0(){try{if(S&&S.rank>R.maxR){R.maxR=S.rank;R.steps.push({r:S.rank,n:RANKS[S.rank]&&RANKS[S.rank].n,buoi:R.buoi,age:S.age,year:S.year})}
 if(C.road&&C.locked&&R.lock){if(R.lock.openAt==null&&arcOk67(ARC67[C.road]))R.lock.openAt={buoi:R.buoi,age:S.age,year:S.year};
  if(R.lock.playAt==null&&S.st&&S.st.ch&&(S.st.f14&&S.st.f14.road===C.road||JSON.stringify(S.st.ch.past||[]).includes(C.road)||(S.st.ch.cur&&JSON.stringify(S.st.ch.cur).includes(C.road))))R.lock.playAt={buoi:R.buoi,age:S.age,year:S.year}}}catch(e){}}
if(C.locked)R.lock={road:C.road,openAt:null,playAt:null};
{const nb0=nextBuoi;nextBuoi=function(){const t0=performance.now(),g0=gt();let r;try{r=nb0.apply(this,arguments)}finally{const dt=performance.now()-t0;R.nbMs.push(Math.round(dt));(R.nbY=R.nbY||[]).push([(S&&S.year)||0,(S&&S.month)||0,Math.round(dt)]);/* ORDER #7 LAG: [year, month, ms] per buổi change (game-year / month turn time) */
  if(dt>(C.lagMs||1500))bug("lag","one buổi change took over "+(C.lagMs||1500)/1e3+" s (bot page, render off)",Math.round(dt)+" ms @ "+where())}
  R.calls++;try{if(!R.road&&S&&S.st&&S.st.f14)R.road=S.st.f14.road;R.origin=S&&S.origin&&S.origin.k}catch(e){}
  if(S&&!S.dead&&gt()===g0&&!Q.length&&!S.mg){if(++R.noAdv>=20&&!R.halt){R.halt="softlock";bug("stuck","«Sang ngày mới» does nothing: the clock does not move (soft-lock)",where()+" · used "+used+" · place "+S.place+" · Q 0 · S.mg "+!!S.mg);R.haltSave=R.lastSave}return r}
  R.noAdv=0;R.buoi++;life0();try{R.perBuoi&&R.perBuoi()}catch(e){}auditLogs();if(!(R.buoi%(C.rtEvery||1)))roundTrip();return r}}
})();
