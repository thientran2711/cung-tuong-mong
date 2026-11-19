/* ================= jchat: PALACE CHATTER — bubble talk over NPC heads (PL#6; owner OD:L1627 (5), OD 19/11 ~02:40Z/~03:05Z/~03:50Z) =================
   Owner words (verbatim source: dev/OWNER_DECISIONS.md L1627 (5)): speech bubbles over NPC heads (manga style); the maid greets when she enters
   ("chủ tử về rồi", "chào mừng chủ tử hồi cung"); every 1–2 min NPCs chat about palace life; people in one happening stand together in one frame
   and talk back and forth; eavesdropping shows their exact lines; SPEECH only, no thought bubbles; big varied line banks, no repetition.
   WRAPS, edits no caller. Numbers: BAL.chat (jbal2, one core). Lines: CHAT_L (jchatl.js). Address words: jvoice kSay / kAddr (one address core).
   HOOKS
   (a) arrival home → her OWN maid (really on the stage, not away on an errand) greets her (CHAT_L.greet, once per arrival);
   (b) idle timer, every BAL.chat.gap.min..max s while the stage is on screen (no dialog, page visible): two (or one) people REALLY standing there
       talk — an exchange of CHAT_L.topics fitting their kinds, its needs read from the live world (a real summoned / pregnant / ill consort …);
   (c) the people of ONE happening at her place (jagday agPlanned: doer + target, place = here) stand next to each other on the stage (S.visit.people
       re-ordered once per visit) and are picked first; they talk about that deed (CHAT_L.hap);
   (d) eavesdrop (j9 overhear, j78 maid dò la): the result quotes the exchange word for word (CHAT_L.eav by the TRUE fact kind j78 learnt).
   LOOK: KIT ONLY. The §78.z head bubble + §78.y kitBadgeAt place every bubble on the speaker's sex line (never on a head). The text state
   "say" of that part is a KIT REQUEST (K-HEAD-SAY, dev/kit/KIT_REQUESTS.md); until it exists the speaker shows the plain WHITE bubble ("off")
   and the line runs in the kit status line (kitLine). A person with a notice (yellow bubble, jerr) never gets a chatter bubble.
   NO REPEAT: an exchange / greeting is not used again until BAL.chat.noRepeat others were said (memory S.pcx, lazy; a guest seat keeps it in the page).
   CO-OP: display only, writes no shared state, syncs nothing. PERF: one setTimeout chain, work only at a tick; paused while hidden.
   ===================================================================================================================== */
(function(){
const C=()=>(typeof BAL!=="undefined"&&BAL.chat)||null;
const CH={t:0,run:0,seq:0,visit:null,prev:undefined,stat:{tick:0,said:0,greet:0,hap:0,eav:0,skip:0,lines:0},log:[],errs:[],pm:{}};
window.CHAT=CH;
function err(w,e){try{CH.errs.push(w+": "+(e&&e.message||e));if(CH.errs.length>30)CH.errs.shift()}catch(x){}}
function guest(){try{return !!(window.COOPW&&COOPW.on&&COOPW.seat==="b")}catch(e){return false}}
function on(){try{const c=C();return !!(c&&c.on&&typeof S!=="undefined"&&S&&!S.dead&&!window.__bot&&!(typeof quiet!=="undefined"&&quiet)&&!(typeof isSrv==="function"&&isSrv()))}catch(e){return false}}
function R(a,b){return a+Math.random()*(b-a)}
function pick(L){return L[Math.floor(Math.random()*L.length)]}
/* ---------- who is who ---------- */
const SRVF={maid:1,elder:1,srv:1,mama:1,cn:1,ty2:1};const SRVM={eun:1,eunuch:1,ksp:1,tq:1};
function kindOf(p){if(!p)return"";const k=p.kind;if(k==="chest"||k==="info")return"";
 if(k==="rival"||k==="fallen")return p.ref?(p.ref.queen?"hh":"con"):"";if(k==="hh")return"hh";if(k==="emp")return"emp";if(k==="th")return"th";if(k==="kid")return"kid";
 if(k==="ty"||k==="off"||k==="man")return"off";if(SRVM[k]||(p.ref&&p.ref.role==="eunuch"))return"eun";if(SRVF[k]||p.ref&&p.ref.role)return"srv";return""}
/* the kAddr speaker of a stage person */
function spk(p){const k=kindOf(p);if(!k)return null;if(k==="con"||k==="hh")return p.ref||"hh";if(k==="emp")return"emp";if(k==="th")return"th";
 if(k==="kid")return{kid:1,name:p.name};if(k==="off")return{role:"x",rw:"quan",name:p.name};if(k==="eun")return{srv:"m",name:p.name};return{srv:"f",name:p.name}}
function ent(p){try{if(!p)return null;if(p.kind==="maid")return S.maid;return p.ref||null}catch(e){return null}}
/* the name she may hear: a person she knows by name (j61) is named, a stranger by what she sees (rank by dress) */
function nameOf(e,p){try{if(e===S)return S.name;if(e&&typeof k61Named==="function"&&!k61Named(e)){const s=typeof k61Short==="function"?k61Short(e):"";return s?"vị "+s.charAt(0).toLowerCase()+s.slice(1):"vị ấy"}
 return (p&&p.name)||(e&&e.name)||"vị ấy"}catch(x){return (p&&p.name)||"vị ấy"}}
function lid(e){try{return typeof ledgerId==="function"&&e?ledgerId(e):null}catch(x){return null}}
/* ---------- tags: "[#xuan,toi]" at the start of a line / exchange (all must hold) ---------- */
const TAG=/^\[#([a-z0-9_,:-]+)\]\s*/;
function ctx(A,B){const c={};try{const m=S.month||1;c.season=m<=3?"xuan":m<=6?"ha":m<=9?"thu":"dong";c.buoi=["sang","chieu","toi"][S.buoi|0]||"sang";
 const w=S.wx||{};c.wet=w.f===1||w.k==="rain";c.snow=/^snow/.test(w.k||"");c.heat=w.f===2;c.storm=w.f===3;c.fest=typeof festToday==="function"?festToday():null;c.place=S.place||"home";
 c.band=typeof kBand==="function"?kBand(S):"lo";c.m=A&&B&&typeof kAddr==="function"?kAddr(A.sp,B.sp).m:"cool"}catch(e){err("ctx",e)}return c}
function tagOk(t,c){for(const x of t.split(",")){if(!x)continue;if(x==="xuan"||x==="ha"||x==="thu"||x==="dong"){if(c.season!==x)return false}
 else if(x==="sang"||x==="chieu"||x==="toi"){if(c.buoi!==x)return false}else if(x==="wet"||x==="snow"||x==="heat"||x==="storm"){if(!c[x])return false}
 else if(x==="dry"){if(c.wet||c.snow||c.storm)return false}else if(x==="fest"){if(!c.fest)return false}else if(x==="nofest"){if(c.fest)return false}
 else if(x==="lo"||x==="mid"||x==="hi"||x==="hq"){/* a band list: any of the band tags present must hold */if(!t.split(",").filter(y=>/^(lo|mid|hi|hq)$/.test(y)).includes(c.band))return false}
 else if(x==="warm"||x==="cool"||x==="cold"){if(!t.split(",").filter(y=>/^(warm|cool|cold)$/.test(y)).includes(c.m))return false}
 else if(x.slice(0,3)==="pl:"){if(!x.slice(3).split(":").includes(c.place))return false}else if(x==="home"){if(c.place!=="home")return false}else if(x==="out"){if(c.place==="home")return false}}
 return true}
function tagOf(s){const m=TAG.exec(s);return m?m[1]:""}
function untag(s){return String(s).replace(TAG,"")}
/* ---------- real slots (law 6b/6c): a slot that cannot be filled with a real thing drops the line ---------- */
function lr(){try{return (typeof liveRivals==="function"?liveRivals(true):[]).filter(v=>v&&v.alive&&!v.out)}catch(e){return[]}}
const NEED={
 sungtop:(x)=>{const L=lr().filter(v=>!x.has(v));if(!L.length)return null;const v=L.slice().sort((a,b)=>(b.sung||0)-(a.sung||0))[0];return (v.sung||0)>0?v:null},
 preg:(x)=>{const L=lr().filter(v=>v.preg&&!v.hidden&&!x.has(v));return L.length?pick(L):null},
 ill:(x)=>{const L=lr().filter(v=>v.ill&&v.ill.known&&!x.has(v));return L.length?pick(L):null},
 queen:(x)=>{const v=lr().find(v=>v.queen);return v&&!x.has(v)?v:null},
 any:(x)=>{const L=lr().filter(v=>!x.has(v));return L.length?pick(L):null},
 cold:(x)=>{try{const L=(rivals||[]).filter(v=>v.alive&&v.out&&!x.has(v));return L.length?pick(L):null}catch(e){return null}},
 kid:()=>{try{const L=(S.kids||[]).filter(k=>k.alive);return L.length?pick(L):null}catch(e){return null}},
 emp:()=>S.emp?"emp":null,th:()=>S.thDead?null:"th",fest:()=>{const f=typeof festToday==="function"&&festToday();return f||null}};
function slotName(v){if(v==="emp")return"Hoàng thượng";if(v==="th")return"Thái hậu";if(v&&v.name&&v.m!=null&&v.t)return v.name;/* a festival */return nameOf(v)}
function fill(s,A,B,X){try{let t=String(s);
 const sp=t.charAt(0)==="B"?B:A,ls=sp===A?B:A;t=t.replace(/^[AB]:\s*/,"");
 t=t.replace(/\{A\}/g,A?nameOf(A.e,A.p):"").replace(/\{B\}/g,B?nameOf(B.e,B.p):"");
 if(/\{p\}/.test(t)){if(!X.p)return null;t=t.replace(/\{p\}/g,slotName(X.p))}
 if(/\{pl\}/.test(t)){try{t=t.replace(/\{pl\}/g,typeof placeName==="function"?placeName(S.place||"home"):"")}catch(e){return null}}
 if(/\{mua\}/.test(t))t=t.replace(/\{mua\}/g,{xuan:"xuân",ha:"hạ",thu:"thu",dong:"đông"}[X.c.season]);
 if(/\{wx\}/.test(t)){if(!S.wx||!S.wx.n)return null;t=t.replace(/\{wx\}/g,S.wx.n)}
 if(/\{fest\}/.test(t)){if(!X.c.fest)return null;t=t.replace(/\{fest\}/g,X.c.fest.name||"")}
 if(/\{me\}/.test(t))t=t.replace(/\{me\}/g,S.name);
 for(const k in X.v||{})t=t.split("{"+k+"}").join(X.v[k]);
 if(/\{[a-z]+\}/.test(t.replace(/\{(?:[Gg]oi|[Xx]ung|[Tt]en)\}/g,"")))return null;/* an unknown slot: never print a raw token */
 if(typeof kSay==="function")t=kSay(sp?sp.sp:null,ls?ls.sp:S,t,ls?{}:{own:A&&A.p&&A.p.kind==="maid"});
 if(!/\S/.test(t)||/\{|\}/.test(t))return null;return{who:sp,txt:t}}catch(e){err("fill",e);return null}}
/* ---------- memory (no repeat) ---------- */
function mem(){const c=C();let M;try{if(!guest()){S.pcx=S.pcx&&typeof S.pcx==="object"?S.pcx:{n:0,u:{}};M=S.pcx}}catch(e){}if(!M){CH.pm.u=CH.pm.u||{};CH.pm.n=CH.pm.n||0;M=CH.pm}
 if(!M.u)M.u={};const lim=(c&&c.mem)||400;const ks=Object.keys(M.u);if(ks.length>lim){ks.sort((a,b)=>M.u[a]-M.u[b]);for(const k of ks.slice(0,ks.length-lim))delete M.u[k]}return M}
function hk(x){const s=Array.isArray(x)?x.join("|"):String(x);let h=0;for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return (h>>>0).toString(36)}
function fresh(x){const M=mem(),k=hk(x),g=(C().noRepeat|0)||60;return M.u[k]==null||M.n-M.u[k]>=g}
function used(x){const M=mem();M.n=(M.n|0)+1;M.u[hk(x)]=M.n}
/* choose from a list of candidates [item, weight] the freshest one (least recently used when all are spent) */
function choose(L){if(!L.length)return null;const F=L.filter(x=>fresh(x[0]));if(F.length){let s=0;for(const x of F)s+=x[1];let r=Math.random()*s;for(const x of F){r-=x[1];if(r<=0)return x[0]}return F[F.length-1][0]}
 const M=mem();return L.slice().sort((a,b)=>(M.u[hk(a[0])]||0)-(M.u[hk(b[0])]||0))[0][0]}
/* ---------- the stage ---------- */
function stage(){return document.getElementById("stage")}
function busy(){try{if(document.hidden)return"hidden";const md=document.getElementById("modal");if(md&&!md.hidden)return"modal";if(typeof Q!=="undefined"&&Q&&Q.length)return"queue";
 const st=stage();if(!st||!st.offsetParent||!st.getClientRects().length)return"nostage";if(typeof tab!=="undefined"&&tab&&tab!=="act")return"tab";return""}catch(e){return"err"}}
/* people REALLY on the stage, in view, with their figure picture */
function present(){const st=stage();if(!st)return[];const ppl=typeof curPeople==="function"?curPeople():[];const sr=st.getBoundingClientRect();const L=[];
 for(const tok of st.querySelectorAll("#tokens .tok.fig")){const i=+tok.dataset.p;const p=ppl[i];if(!p)continue;const img=tok.querySelector("img.figimg");if(!img||!img.naturalWidth||tok.style.visibility==="hidden")continue;
  if(tok.classList.contains("j59off")||tok.closest(".j59off")||tok.style.display==="none")continue;const r=img.getBoundingClientRect();if(r.right<sr.left+4||r.left>sr.right-4||r.width<8)continue;
  const sp=spk(p);if(!sp)continue;const e=ent(p);if(e&&(e.dead||e.alive===false))continue;
  try{if(window.ER&&ER.awayOf&&p.kind==="maid"&&ER.awayOf("mm:me"))continue}catch(x){}
  L.push({p,i,img,tok,sp,e,k:kindOf(p),id:lid(e)})}return L}
function noticeOn(P){try{const st=stage();for(const b of st.querySelectorAll(".kmerr-bang")){const r=b.getBoundingClientRect(),q=P.img.getBoundingClientRect();if(r.left+r.width/2>=q.left&&r.left+r.width/2<=q.right)return true}}catch(e){}return false}
/* ---------- the bubble (KIT §78.z + §78.y; "say" = K-HEAD-SAY when the kit has it) ---------- */
function sayKit(){try{return !!(window.KIT_HEADMK&&KIT_HEADMK.say&&typeof kitHeadMarkHtml==="function")}catch(e){return false}}
/* the ONE stage head-marker layer (jerr errLay, .kmerr-lay: absolute, inset 0, no pointer) — no layer or CSS of our own */
function lay(st){try{if(typeof errLay==="function"){if(typeof errCss==="function")errCss();return errLay(st)}}catch(e){}return null}
function clearB(){try{document.querySelectorAll(".kchat-b").forEach(e=>e.remove())}catch(e){}}
function show(P,txt,ms){const st=stage();if(!st||!P.img.isConnected)return false;if(noticeOn(P))return false;const c=C();
 const lim=Math.max(1,c.maxBub|0||2);const cur=[...st.querySelectorAll(".kchat-b")];while(cur.length>=lim)cur.shift().remove();
 const w=document.createElement("span");const kit=sayKit();const title=`${nameOf(P.e,P.p)}: ${txt}`;
 w.innerHTML=kit?kitHeadMarkHtml(title,"img","say",txt):typeof kitHeadMarkHtml==="function"?kitHeadMarkHtml(title,"img","off"):"";const b=w.firstChild;if(!b)return false;
 const L=lay(st);if(!L)return false;b.classList.add("kchat-b");b.dataset.chat=CH.seq;L.appendChild(b);
 const sr=st.getBoundingClientRect(),sc=st.offsetWidth?sr.width/st.offsetWidth:1;const px=(window.KIT_HEADMK||{}).px||24;const hh=b.offsetHeight||px,ww=b.offsetWidth||px;
 const Pz=typeof kitBadgeAt==="function"?kitBadgeAt(st,P.img,kit?"say":"hap",ww,hh):null;if(!Pz){b.remove();return false}
 b.style.position="absolute";b.style.left=((Pz.left-sr.left)/sc)+"px";b.style.top=((Pz.top-sr.top)/sc)+"px";b.dataset.line=Pz.sex;
 if(!kit&&typeof kitLine==="function")try{kitLine(`${nameOf(P.e,P.p)}: “${txt}”`,ms)}catch(e){}
 setTimeout(()=>{try{b.remove()}catch(e){}},ms);CH.stat.lines++;CH.log.push({t:Date.now(),who:P.p.name,txt,kit});if(CH.log.length>60)CH.log.shift();return true}
function dur(t){const c=C().say||{};return Math.round(Math.max(c.min||2600,Math.min(c.max||6000,(c.base||1400)+String(t).length*(c.ch||55))))}
/* play the turns one after another; a turn whose speaker left the stage ends the exchange */
function play(T,tag){if(!T||!T.length)return false;CH.run=++CH.seq;const id=CH.run;let i=0;CH.stat.said++;
 const step=()=>{if(CH.run!==id)return;if(i>=T.length){CH.run=0;return}if(busy()){CH.run=0;return}const t=T[i++];const P=present().find(x=>x.p===t.who.p)||null;
  if(!P||!show(P,t.txt,dur(t.txt))){CH.run=0;return}setTimeout(step,dur(t.txt)+((C().turnGap)|0))};step();return true}
/* ---------- build an exchange ---------- */
function pairKey(a,b){return a.k+"-"+b.k}
function topicsFor(A,B){const T=(window.CHAT_L&&CHAT_L.topics)||[];const k1=B?pairKey(A,B):A.k+"-me",k2=B?pairKey(B,A):null;const out=[];
 for(const t of T){if(t.pair.includes(k1))out.push([t,0]);else if(k2&&t.pair.includes(k2))out.push([t,1])}return out}
function build(A,B,topicList,c){const c0=c||ctx(A,B);const X={c:c0,v:{}};const used0=new Set([A.e,B&&B.e].filter(Boolean));const cand=[];
 for(const [t,sw] of topicList){let p=null;if(t.need){const f=NEED[t.need];p=f?f(used0):null;if(!p)continue}
  for(const x of t.x){const tg=Array.isArray(x)?tagOf(x[0]):tagOf(x);if(tg&&!tagOk(tg,c0))continue;cand.push([{t,sw,x,p},t.w||1])}}
 for(let n=0;n<6&&cand.length;n++){const o=choose(cand);if(!o)return null;const i=cand.findIndex(z=>z[0]===o);cand.splice(i,1);
  const a=o.sw?B:A,b=o.sw?A:B;X.p=o.p;const L=(Array.isArray(o.x)?o.x:[o.x]).map(untag);const T=[];let ok=true;
  for(const s of L){const r=fill(s,a,b,X);if(!r||(!b&&s.charAt(0)==="B")){ok=false;break}T.push(r)}if(!ok||!T.length)continue;used(o.x);return T}return null}
/* the people of a happening here this khắc (jagday deeds: doer + target at this place) */
function hapPairs(L){const out=[];try{if(typeof agPlanned!=="function")return out;const kh=typeof agKh==="function"?agKh():null;
 for(const d of agPlanned()){if(d.pl!==S.place)continue;if(kh!=null&&d.kh!=null&&d.kh>kh)continue;const a=L.find(x=>x.id===d.who);if(!a)continue;
  const b=d.t?L.find(x=>x.id===d.t||x.id===String(d.t)||(x.e&&x.e.id===d.t)):null;out.push({a,b,k:d.k})}}catch(e){err("hap",e)}return out}
function hapTopic(k){const H=(window.CHAT_L&&CHAT_L.hap)||{};const s=String(k||"");for(const g in H){if(g==="any")continue;const re=(window.CHAT_HAPK||{})[g];if(re&&re.test(s))return g}return"any"}
function tick(){CH.t=0;if(!on())return arm();CH.stat.tick++;const b=busy();if(b||CH.run){CH.stat.skip++;return arm(true)}
 try{const L=present();if(!L.length){CH.stat.skip++;return arm()}let T=null;
  /* (c) a happening here first */
  const H=hapPairs(L);if(H.length&&Math.random()<((C().w||{}).hap!=null?C().w.hap:.8)){const h=pick(H);const g=hapTopic(h.k);const pool=(CHAT_L.hap||{})[g]||(CHAT_L.hap||{}).any||[];
   if(h.b){T=build(h.a,h.b,[[{pair:[],x:pool,w:1},0]]);if(T)CH.stat.hap++}}
  /* (b) idle chatter: a pair (or one person to her) */
  if(!T){const pairs=[];for(let i=0;i<L.length;i++)for(let j=i+1;j<L.length;j++){const tp=topicsFor(L[i],L[j]);if(tp.length)pairs.push([[L[i],L[j],tp],wPair(L[i],L[j])])}
   for(const a of L){const tp=topicsFor(a,null);if(tp.length)pairs.push([[a,null,tp],((C().w||{}).solo)||.6])}
   for(let n=0;n<4&&pairs.length&&!T;n++){const z=wpick(pairs);T=build(z[0],z[1],z[2]);if(!T)pairs.splice(pairs.findIndex(q=>q[0]===z),1)}}
  if(T)play(T,"idle");else CH.stat.skip++}catch(e){err("tick",e)}arm()}
function wPair(a,b){const W=C().w||{};if(a.k==="srv"&&b.k==="srv"||a.k==="srv"&&b.k==="eun"||a.k==="eun"&&b.k==="srv")return W.srv||1.2;
 try{if(a.e&&b.e&&typeof aff==="function"){const f=aff(a.e,b.e);if(f>=(BAL.voice&&BAL.voice.warm||40))return W.friend||1.5;if(f<=(BAL.voice&&BAL.voice.cold||-25))return W.rival||1.3}}catch(e){}return W.base||1}
function wpick(L){let s=0;for(const x of L)s+=x[1];let r=Math.random()*s;for(const x of L){r-=x[1];if(r<=0)return x[0]}return L[L.length-1][0]}
function arm(short){if(CH.t)clearTimeout(CH.t);const c=C();if(!c||!c.on)return;const g=c.gap||{};const s=short?(c.retry||20):R(g.min||60,g.max||120);CH.t=setTimeout(tick,s*1000)}
/* ---------- (a) greeting on arrival home ---------- */
function greet(){if(!on())return;const run=(n)=>{const b=busy();if(b==="modal"||b==="queue"){if(n<((C().greet||{}).tries||6))return setTimeout(()=>run(n+1),((C().greet||{}).wait||1500));return}
  if(b)return;const L=present();const M=L.find(x=>x.p.kind==="maid");if(!M)return;const pool=(window.CHAT_L&&CHAT_L.greet)||[];const c=ctx(M,null);
  const cand=pool.filter(s=>{const t=tagOf(s);return !t||tagOk(t,c)}).map(s=>[s,1]);const s=choose(cand);if(!s)return;const r=fill("A:"+untag(s),M,null,{c,v:{}});if(!r)return;used(s);
  CH.run=0;clearB();if(play([r],"greet"))CH.stat.greet++};setTimeout(()=>run(0),((C().greet||{}).delay||900))}
/* ---------- (c) the people of one happening stand together (once per visit) ---------- */
function group(){try{const V=S.visit;if(!V||!Array.isArray(V.people)||V.__chg)return;V.__chg=1;if(typeof agPlanned!=="function")return;const P=V.people;
 const idOf=p=>lid(ent(p));const pos=new Map(P.map((p,i)=>[p,i]));const pairs=[];
 for(const d of agPlanned()){if(d.pl!==S.place||!d.t)continue;const a=P.find(p=>idOf(p)===d.who),b=P.find(p=>{const id=idOf(p);return id===d.t||id===String(d.t)});if(a&&b&&a!==b)pairs.push([a,b])}
 if(!pairs.length)return;const out=[];const put=p=>{if(!out.includes(p))out.push(p)};
 for(const p of P){if(out.includes(p))continue;const pr=pairs.find(q=>q[0]===p||q[1]===p);if(pr){put(pr[0]);put(pr[1])}else put(p)}
 if(out.length===P.length&&out.some((p,i)=>p!==P[i])){P.length=0;out.forEach(p=>P.push(p));try{if(typeof popIdx!=="undefined")popIdx=null}catch(e){}}}catch(e){err("group",e)}}
/* renderStage wrapper: arrival detection + grouping; never changes what it draws */
if(typeof renderStage==="function"){const r0=renderStage;renderStage=function(){try{if(on()&&S.visit&&S.visit!==CH.visit){group()}}catch(e){err("rs0",e)}const r=r0.apply(this,arguments);
 try{if(S&&S.visit!==CH.visit){const pl=S.place||"home";const was=CH.prev;CH.visit=S.visit;CH.prev=pl;CH.run=0;clearB();if(pl==="home"&&was!==undefined&&was!=="home")greet()}if(!CH.t)arm()}catch(e){err("rs1",e)}return r}}
/* ---------- (d) eavesdrop → the exact lines ---------- */
/* the exchange the target and her confidant really said, from the TRUE facts j78 just learnt (S.intel newest first) */
function eavLines(v,n){try{const E=(window.CHAT_L&&CHAT_L.eav)||{};const I=(S.intel&&S.intel[v.id])||[];const now=typeof bkey==="function"?bkey():null;const F=I.filter(x=>x.bk===now).slice(0,n||1);if(!F.length)return"";
 const A={e:v,p:{name:v.name},sp:v,k:v.queen?"hh":"con"};let mate=null;try{const L=lr().filter(x=>x!==v&&typeof whereOf==="function"&&whereOf(x)===whereOf(v));mate=L.length?L.sort((a,b)=>aff(v,b)-aff(v,a))[0]:null}catch(e){}
 const B=mate?{e:mate,p:{name:mate.name},sp:mate,k:mate.queen?"hh":"con"}:{e:null,p:{name:"cung nữ thân cận"},sp:{srv:"f",name:"cung nữ"},k:"srv"};
 const out=[];for(const f of F){const kind=String(f.k||f.kind||"").split(":")[0];const pool=E[kind]||E[f.kind]||E.any||[];if(!pool.length)continue;
  const X={c:ctx(A,B),v:eavSlots(v,f,kind)};const cand=pool.filter(x=>{const tg=tagOf(Array.isArray(x)?x[0]:x);return !tg||tagOk(tg,X.c)}).map(x=>[x,1]);
  for(let t=0;t<4&&cand.length;t++){const x=choose(cand);const ex=(Array.isArray(x)?x:[x]).map(untag);const T=[];let ok=true;
   for(const s of ex){const r=fill(s,A,B,X);if(!r){ok=false;break}T.push(r)}
   if(ok&&T.length){used(x);out.push(T.map(r=>`${nameOf(r.who.e,r.who.p)}: “${r.txt}”`).join(" — "));break}cand.splice(cand.findIndex(z=>z[0]===x),1)}}
 if(out.length)CH.stat.eav++;return out.length?" Ngươi nghe rõ từng lời — "+out.join(" · ")+".":""}catch(e){err("eav",e);return""}}
function eavSlots(v,f,kind){const o={};try{
 if(kind==="plan"&&v.plan){const t=typeof byKey==="function"?byKey(v.plan.t):null;if(t)o.t=t===S?S.name:nameOf(t)}
 if(kind==="affair"){const m=typeof manById==="function"&&v.affair?manById(v.affair):null;if(m)o.man=m.name}
 if(kind==="items"){const bad=(v.inv||[]).filter(e=>e.t||(IT[e.k]&&(itm(e.k).il||itm(e.k).mat)));if(bad.length)o.it=typeof iname==="function"?iname(bad[0]):""}
 if(kind==="hate"||kind==="ally"){const m=/để bụng (.+?) nhất|thân với (.+?) nhất/.exec(f.txt||"");if(m)o.h=(m[1]||m[2]||"").trim()}
 if(kind==="trait"){const m=/có nết (.+?)\./.exec(f.txt||"");if(m)o.tr=m[1]}
 if(kind==="where"){try{o.pl2=placeName(whereOf(v))}catch(e){}}}catch(e){err("eavS",e)}return o}
CH.eavLines=eavLines;
/* j9 overhear (wrapped by j78) and j78 maid dò la: append the quoted exchange to the result / Sổ ghi line */
if(typeof overhear==="function"){const o0=overhear;overhear=function(k){const n0=snap();const r=o0.apply(this,arguments);try{if(!on())return r;const v=newest(n0);if(v){const q=eavLines(v,1);if(q){if(typeof r==="string"&&r)return r+q;try{if(S.logs&&S.logs.length)S.logs[0]=S.logs[0]+q}catch(e){}}}}catch(e){err("oh",e)}return r}}
if(typeof j78maidSpy==="function"){const m0=j78maidSpy;j78maidSpy=function(){const n0=snap();const r=m0.apply(this,arguments);try{if(!on())return r;const v=newest(n0);if(v){const q=eavLines(v,2);if(q&&S.logs&&S.logs.length)S.logs[0]=S.logs[0]+q}}catch(e){err("ms",e)}return r}}
function snap(){const m={};try{for(const id in S.intel||{})m[id]=(S.intel[id][0]||{}).bk+"|"+(S.intel[id][0]||{}).k+"|"+(S.intel[id][0]||{}).txt}catch(e){}return m}
function newest(n0){try{for(const id in S.intel||{}){const x=S.intel[id][0];if(!x)continue;if(n0[id]!==x.bk+"|"+x.k+"|"+x.txt){const v=typeof RV==="function"?RV(+id):null;if(v)return v}}}catch(e){}return null}
/* a new life / loaded save: chatter restarts clean (no bubble, no exchange in flight) */
CH.reset=()=>{CH.run=0;CH.visit=null;CH.prev=undefined;clearB();arm()};
document.addEventListener("visibilitychange",()=>{if(document.hidden){CH.run=0;clearB()}});
CH.tick=tick;CH.greet=greet;CH.present=present;CH.build=build;CH.topicsFor=topicsFor;CH.ctx=ctx;CH.fill=fill;CH.tagOk=tagOk;CH.play=play;CH.arm=arm;CH.group=group;CH.hapPairs=hapPairs;
})();
