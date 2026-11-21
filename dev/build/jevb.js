/* ================= jevb: EVENT BALANCE · CONTEXT · MOOD CAUSES · REAL PRECONDITIONS (owner 15/11 14:05Z, 14:30Z, 15:10Z) =================
   Wraps only; loaded after jstory. Numbers in BAL (ctx*, moodEv*). Audit: dev/review/event-balance.md (bots: dev/measure/evbot.js).
   (1) CONTEXT, not a fixed answer: the odds of a rolled event option depend on the people in it AT THAT MOMENT —
       · the person's hidden taste for that kind of answer, drawn ONCE PER LIFE (S.ctxSeed × person × answer: −BAL.ctxTaste…+BAL.ctxTaste),
       · that person's current mood (angry / jealous: harder; glad: easier), how much they like her (aff/BAL.ctxRelDiv), the Emperor's mood
         for his own scenes. Sure options (no roll): the relation change with that person is scaled by the same taste (×½ … ×1½).
       The option's text (ladder word, numbers) is computed from these, so the Gợi ý line and the risk tag read the TRUE current odds; the best
       answer moves from life to life and day to day. j68 events (c6) and j67 chapters (oOf67).
   (2) MOOD FROM EVENTS: after every event choice the net result moves HER mood (good → Vui, bad → Buồn / Lo âu when someone now resents
       her) and the mood of each consort whose feeling for her changed (Vui / Giận), each with its real cause. The painted mood seal on every
       portrait follows (jemo, no code-drawn faces).
   (3) MOOD CAUSE BOX: every emoSet records its cause (p.emoH, last BAL.moodKeep tuần, ≤6); a tap on a mood seal opens a kit panel listing
       the causes acting on that person now (fog: only people whose mood she can know, else "chưa rõ").
   (4) REAL PRECONDITIONS (whole group, dev/review/scan_claims.py): j68 "doubtVisit" variant "trả lại quà ngươi tặng" only when that
       consort really holds a gift from her, names it, and the gift really comes back to her chest; "borrowDress" asks only for a thing she
       really owns (a robe, a hairpin, an instrument when she plays Cầm, her maid). ============================================== */
/* balance-2 (S3-126 bot-proof hint, owner OD:L478 "skilful play MUST clearly beat random"): ctxTaste 12→18, ctxCap 22→30. Measured (sens bot, Vừa, 40 lives per arm,
   dev/handover/reports/balance-2-measure/bp_*): old 12/22 hint-reading bot HH 5 % / early end 30 % vs random 2 % / 15 % (skill did not pay);
   new 18/30 hint HH 12 % / early 15 %, Danh m36 89 vs random HH 5 % / early 25 %, Danh m36 30. */
Object.assign(BAL,{ctxTaste:18,ctxRelDiv:10,ctxRelCap:8,ctxMoodBad:-9,ctxMoodGood:6,ctxEmp:[8,0,-5,-10],ctxCap:30,moodEvGood:28,moodEvBad:30,moodKeep:4});
/* jemo-bal (law 4): the typed numbers of jevb's context odds and event moods. steps = a person's hidden taste steps (× ctxTaste); sureDiv = a sure option's
   relation × (1 + taste ÷ sureDiv); arcK = an arc scene's taste share; scK = odds per scene point of an extra / chapter option; moodSo = a frightened person's odds
   (the other bad feelings: −moodSo); heavyLv = grief at this level counts as anger; causeN = mood causes kept; rankLoss = loss points of a rank lost in an event;
   g = a consort who now resents her (oán ≥ oan or liking ≤ aff): Giận base + k × change, at most cap; v = a consort who likes her more (liking ≥ aff): Vui;
   me = her own mood after an event (net ≥ min): base (moodEvGood / moodEvBad) + k × net, at most cap */
Object.assign(BAL,{evb:{steps:[-1,-.5,0,.5,1],sureDiv:2,arcK:.6,scK:7,moodSo:3,heavyLv:3,causeN:6,rankLoss:20,g:{oan:3,aff:-6,cap:70,base:25,k:2},v:{aff:6,cap:60,base:20,k:2},me:{min:2,cap:80,k:2}}});
function ctxSeed(){if(!S)return 1;if(!S.ctxSeed)S.ctxSeed=1+Math.floor(Math.random()*2147483646);return S.ctxSeed}
function ctxHash(s){let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function ctxKey(p){try{return typeof key==="function"?key(p):p&&p.id}catch(e){return""}}
/* the person's taste for this kind of answer this life: −1, −½, 0, ½, 1 */
function ctxTaste(p,ans){const n=String(ans||"").replace(/<[^>]+>/g,"").replace(/\{[^}]*\}|\d+/g,"").toLowerCase().split(/[,:(]/)[0].trim();const h=ctxHash(ctxSeed()+"|"+ctxKey(p)+"|"+n);const T=BAL.evb.steps;return T[h%T.length]}
function ctxMood(p){try{const e=emoGet(p);if(!e||e.k==="binh")return 0;const g=typeof feelGrp==="function"?feelGrp(e.k):e.k;if(g==="binh")return 0;if(["gian","ghen"].includes(g)||(g==="buon"&&typeof feelLv==="function"&&feelLv(p,e.k)>=BAL.evb.heavyLv))return BAL.ctxMoodBad;if(g==="vui")return BAL.ctxMoodGood;if(g==="so")return BAL.evb.moodSo;return -BAL.evb.moodSo}catch(e){return 0}}
function ctxRel(p){try{if(!p||p===S||!rivals.includes(p))return 0;return cl(Math.round(aff(p,S)/BAL.ctxRelDiv),-BAL.ctxRelCap,BAL.ctxRelCap)}catch(e){return 0}}
function ctxOdds(p,ans){if(!p||!S)return 0;return cl(Math.round(ctxTaste(p,ans)*BAL.ctxTaste+ctxMood(p)+ctxRel(p)),-BAL.ctxCap,BAL.ctxCap)}
window.ctxOdds=ctxOdds;
/* j68 events: c6(name, spec) — the person in it = the first relation target */
(function(){if(typeof c6!=="function")return;const c0=c6;c6=function(n,s){try{if(s&&!window.__ctxOff){const who=((s.r||[])[0]||(s.lr||[])[0]||[])[0];const p=who&&(who.o||who);
  if(p&&typeof p==="object"){s=Object.assign({},s);if(s.p!=null)s.p=s.p+ctxOdds(p,n);
   else{const t=ctxTaste(p,n);if(t&&s.r)s.r=s.r.map(([a,v])=>[a,Math.round(v*(1+t/BAL.evb.sureDiv))||v])}}}}catch(e){}return c0.call(this,n,s)}})();
/* j67 chapters: the beat's person (v / v2 / foe / hh), the Emperor's mood on his beats */
(function(){if(typeof oOf67!=="function")return;const o0=oOf67;oOf67=function(A,o,b){const r=o0.apply(this,arguments);try{if(o.o==null||window.__ctxOff)return r;
  let p=null;const w=b&&b.w;if(w==="v"||w==="v2")p=rv67(A,w);else if(w==="foe")p=typeof foe67==="function"?foe67():null;else if(w==="hh")p=qOn()?rivals[0]:null;
  let d=p?ctxOdds(p,o.n):0;if(w==="emp"&&S.emp)d+=BAL.ctxEmp[S.emp.mood|0]||0;if(!p&&w!=="emp")d+=Math.round(ctxTaste({id:"arc:"+A.a+":"+(b.h||"")},o.n)*BAL.ctxTaste*BAL.evb.arcK);
  return od((typeof o.o==="function"?o.o(A):o.o)+((o.e||b.x)?(A.sc||0)*BAL.evb.scK:0)+d)}catch(e){return r}}})();
/* ---------- (3) mood causes ---------- */
let EVB_ART="";  /* the picture of the event whose choice is resolving now (evbMood): stored on each cause it sets (x.a) */
(function(){if(typeof emoSet!=="function")return;const s0=emoSet;emoSet=function(p,k,v,why,t){const r=s0.apply(this,arguments);try{const q=emoRes(p);if(q&&EMO[k]&&v>0&&why){const W=emoW();
  const H=(q.emoH||[]).filter(x=>W-x.w<=BAL.moodKeep&&x.why!==why);const x={k,v:Math.round(v),why:String(why).slice(0,90),w:W};if(EVB_ART)x.a=EVB_ART;H.unshift(x);q.emoH=H.slice(0,BAL.evb.causeN)}}catch(e){}return r}})();
function emoCauses(p){const q=emoRes(p);if(!q)return[];const W=emoW();const L=(q.emoH||[]).filter(x=>W-x.w<=BAL.moodKeep);const e=q.emo;
 if(e&&e.why&&e.v>=BAL.eff.jemo.floor&&!L.some(x=>x.why===e.why))L.unshift({k:e.k,v:e.v,why:e.why,w:e.w||W});return L.sort((a,b)=>b.w-a.w||b.v-a.v)}
window.emoCauses=emoCauses;
(function(){if(typeof emoBadge!=="function")return;const b0=emoBadge;emoBadge=function(p){const h=b0.apply(this,arguments);try{const q=emoRes(p);if(h&&q)return h.replace("<img ",`<img data-emo="${emoKey(q)}" role="button" tabindex="0" `)}catch(e){}return h}})();
/* MOOD BOX PICTURE (owner 15/11 "ảnh khung tâm trạng là hiện sự việc liên quan", review/mood-dialog): the picture shows the EVENT that
   caused the current mood (Khương Lạc Anh được tấn phong → the tấn phong picture), never the "Có người đến chơi" visitor default of person
   dialogs (jk4). Order: the event's own picture recorded when the cause was set (evbMood, x.a) → EMO_CAUSE_EV (mood-cause words) → the week
   book's event table KBK_EVRE → a picture made for that line (kbkSpecific) → the mood's own scene img/ev-mood-<k>[-2].webp (no cause / no
   picture). Corner: the same mood seal as on the portrait (img/kit/emo-[m-|mo-]<k>.webp, kitSceneArt o.mark, KIT 28.19b). */
const EMO_CAUSE_EV=[[/yểu mệnh|qua đời|mất con|^mất |tạ thế|băng hà/i,"sys:qua-doi"],[/sinh hạ|mẹ tròn con vuông|có hoàng tự|chào đời/i,"sys:sinh-con"],
 [/lãnh cung/i,"sys:lanh-cung"],[/giáng|cấm túc|bị phạt/i,"sys:giang-chuc"],[/tấn phong/i,"sys:tan-phong"],[/lật thẻ|thị tẩm/i,"sys:thi-tam"],
 [/sức khỏe|ốm|bệnh/i,"sys:om"],[/việc triều/i,"qs:yen"],[/làm nhục|phật ý|«/i,"j7:rvquarrel"],[/đối đãi tử tế|tặng|quà/i,"j24:co-nguoi-den"],
 [/chơi đùa/i,"e68:kidGift"]];
function emoCauseArt(c){try{if(!c)return"";if(c.a)return c.a;if(typeof evArtCat!=="function"||typeof evArtOf!=="function")return"";const t=String(c.why||"");
  const salt=(c.w|0)*7+t.length;const hit=EMO_CAUSE_EV.find(([re])=>re.test(t))||(typeof KBK_EVRE!=="undefined"?KBK_EVRE.find(([re])=>re.test(t)):null);
  if(hit&&evArtCat(hit[1]))return evArtOf(hit[1],salt)||"";
  if(typeof kbkSpecific==="function"){const s=kbkSpecific(t);const f=s&&s.replace(/^.*?(?=img\/)/,"");if(f&&typeof KIT_CDNHAVE!=="undefined"&&KIT_CDNHAVE&&KIT_CDNHAVE.has(f))return s}}catch(e){}return""}
function emoBoxArt(p,m,L){const k=m.known?m.k:"an";const c=m.known?(L.find(x=>x.k===m.k)||(m.k==="binh"?null:L[0])):null;
 let set="";try{set=typeof emoArtSet==="function"?emoArtSet(p):""}catch(e){}
 const own=emoCauseArt(c);const w=typeof emoW==="function"?emoW():0;
 /* FEELINGS-18: a new kind shows the picture of its nearest painted kind (FEEL_FB) */const pk=typeof FEEL_FB!=="undefined"&&FEEL_FB[k]?FEEL_FB[k]:k;
 const src=own||`img/ev-mood-${EMO[k]||k==="an"?pk:"binh"}${w%2?"-2":""}.webp`;
 const cap=c?String(c.why).replace(/\s*«[^»]*»/g,"").replace(/[,.]\s*$/,"").trim():m.known?(EMO[k]||""):"Chưa rõ lòng người";
 return{src,label:cap,mark:`img/kit/emo-${set}${(()=>{try{if(m.known&&typeof faceKeyFor==="function"){const f=faceKeyFor(p);if(f&&f.art)return f.art}}catch(e){}return typeof feelArt==="function"?feelArt(k,set):k})()}.webp`,markAlt:`Tâm trạng: ${m.known?m.name:"chưa rõ"}`}}
function emoBox(k){const p=emoByKey(k);if(!p||!S||S.dead)return;const m=window.kitEmotion(p);if(!m)return;let nm=p===S?"Ngươi":emoName(p);/* rank + name always together (owner 15/11, OD L820-821): same plain title+name as Đã biết về X */try{if(p!==S&&typeof kitName==="function"&&typeof kpPlain==="function"){const t=kpPlain(kitName(p)).trim();if(t)nm=t}}catch(e){}
 const cls=x=>window.kitEmoTone(x);const W=emoW();const ago=w=>W-w<=0?"tuần này":`${W-w} tuần trước`;
 const L=m.known?emoCauses(p):[];
 const faceRows=m.known&&typeof kitFaceRows==="function"?kitFaceRows(p,m,{cls}):[];
 const rows0=m.known?(L.length?(L.some(x=>x.left!=null)&&typeof kitMoodCauseRows==="function"?kitMoodCauseRows(L,kitFaceDrive(p,m),{cls,ago:x=>ago(x.w)}):L.map(x=>[kitEmoWord(x.k),`${x.why} · ${ago(x.w)}`,cls(x.k)])):[["Nguyên nhân","không có chuyện gì đáng kể gần đây"]]):[["Nguyên nhân","chưa rõ: ngươi chưa gặp, chưa có tai mắt bên người này"]];
 const rows=m.known&&faceRows.length?faceRows.concat(rows0):rows0;
 let art=null;try{art=emoBoxArt(p,m,L)}catch(e){}
 kitModal({kind:"info",look:1,title:`Tâm trạng · ${nm}`,sub:m.known?`Hiện nay: ${kitSealName(p,m)}${p===S&&typeof mbBand==="function"&&!window.__moodOff?` · ${mbBand().name}`:""}`:"chưa rõ",subject:p,headArt:art||undefined,
  sections:p===S&&typeof mbSecs==="function"&&!window.__moodOff?(M=>[M[0],M[1],{h:"Cảm xúc lúc này",rows},M[2]])(mbSecs()):[{h:"Đang tác động",rows},{h:"",rows:[["Ảnh hưởng",p===S?"tâm trạng của ngươi đổi cơ may của mọi việc một chút":"vui thì dễ chịu nghe, giận hay ghen thì khó nói chuyện, dễ ra tay hơn"]]}],btn:"Đã rõ"})}
window.emoBox=emoBox;window.emoCauseArt=emoCauseArt;
/* owner 21/11 (mark #68): an event that comes FROM a feeling (her outburst «Khóc suốt đêm», «Trốn trong phòng», an NPC's outburst, extreme mood) carries m.emoSeal={k:feeling key,who:person key}: its picture wears that feeling's seal in the TOP-RIGHT corner (kitSceneArt o.mark → live img.kemo) */
function emoEvMark(m){try{const e=m&&m.emoSeal;if(!e||!e.k)return null;const p=(e.who!=null&&emoByKey(e.who))||S;const set=typeof emoArtSet==="function"?emoArtSet(p):"";let art=typeof feelArt==="function"?feelArt(e.k,set):e.k;
 /* a feeling whose still is not painted yet (khoc) walks to its nearest painted one, so the corner is never an empty disc */
 try{const have=typeof KIT_CDNHAVE!=="undefined"&&KIT_CDNHAVE&&KIT_CDNHAVE.size?KIT_CDNHAVE:null;const FB={khoc:"buon"};for(let i=0;i<4&&have&&!have.has(`img/kit/emo-${set}${art}.webp`);i++){const nk=(typeof feelFb==="function"&&feelFb(art))||FB[art];if(!nk)break;art=nk}}catch(x){}
 let nm="";try{nm=typeof feelName==="function"?feelName(e.k,1):""}catch(x){}nm=nm||EMO[e.k]||"";return{mark:`img/kit/emo-${set}${art}.webp`,markAlt:`Tâm trạng: ${nm}`}}catch(x){return null}}
window.emoEvMark=emoEvMark;
(function(){if(typeof kitEvArt!=="function")return;const k0=kitEvArt;kitEvArt=function(m){const r=k0.apply(this,arguments);try{if(r&&r.src&&!r.mark&&m&&m.emoSeal){const x=emoEvMark(m);if(x)return Object.assign({},r,x)}}catch(e){}return r};window.kitEvArt=kitEvArt})();
/* LOOK-UP PANELS (kit.look: Tâm trạng · X, Đã biết về X, Chứng cứ về X — panels she opens herself) are not visits: they show only the picture
   they bring (headArt), never the person-dialog default "Có người đến chơi" (jk4) or a room picture (whole family, review/mood-dialog) */
(function(){if(typeof kitEvArt!=="function")return;const k0=kitEvArt;kitEvArt=function(m){try{if(m&&m.kit&&m.kit.look){const h=m.kit.headArt;
  if(!h)return null;return typeof h==="string"?{src:h,lab:""}:{src:h.src,lab:h.label||"",mark:h.mark||"",markAlt:h.markAlt||""}}}catch(e){}return k0.apply(this,arguments)};window.kitEvArt=kitEvArt})();
window.addEventListener("click",e=>{const t=e.target.closest&&e.target.closest("img.kemo[data-emo]");if(!t||(typeof Q!=="undefined"&&Q.length&&!$("modal").hidden&&!t.closest("#modal")))return;e.stopPropagation();e.preventDefault();try{emoBox(t.dataset.emo)}catch(x){console.error(x)}},true);
/* ---------- (2) mood from event results ---------- */
function evbIsEvent(m){return !!(m&&(m.pid||m.pp||(m.kit&&m.kit.kind==="choice")))}
function evbSnap(){const b=rsnap();if(!b)return null;b.rel={};for(const v of rivals||[]){if(!v.alive)continue;try{b.rel[v.id]={a:aff(v,S),m:aff(S,v),e:v.ev||0,g:v.ghen||0,o:Math.round(oan(v,S))}}catch(e){}}b.rank=S.rank;return b}
(function(){const c0=chooseM;chooseM=function(i){let m=null,c=null,b=null;try{m=Q[0];c=m&&m.opts&&m.opts[i];if(evbIsEvent(m)&&c&&!c.pl67)b=evbSnap()}catch(e){}
 const r=c0.apply(this,arguments);try{if(b&&S&&!S.dead)evbMood(m,c,b)}catch(e){console.error("evb mood",e)}return r}})();
function evbMood(m,c,b){try{const a=typeof kitEvArt==="function"?kitEvArt(m):null;EVB_ART=a&&/img\/(ev|act)-/.test(a.src||"")?String(a.src):""}catch(e){EVB_ART=""}
 try{return evbMood0(m,c,b)}finally{EVB_ART=""}}
function evbMood0(m,c,b){const nm=String(c.n||"").replace(/<[^>]+>/g,"").split(":")[0].slice(0,40);const tt=String(m.t||"").replace(/^(Chính tuyến|Phụ tuyến) · /,"").split(" · ")[0];
 const D={};let g=0,l=0;for(const [k] of (typeof RKEYS!=="undefined"?RKEYS:[])){const d=(S[k]||0)-(b[k]||0);if(!d||k==="bac"||k==="suc")continue;D[k]=d;const bad=(k==="ghen"||k==="oan")?d>0:d<0;if(bad)l+=Math.abs(d);else g+=Math.abs(d)}
 if(S.rank<b.rank)l+=BAL.evb.rankLoss;let resent=0;
 for(const v of rivals||[]){const o=b.rel[v.id];if(!o||!v.alive)continue;const da=aff(v,S)-o.a,dO=Math.round(oan(v,S))-o.o;
  if(dO>=BAL.evb.g.oan||da<=BAL.evb.g.aff){resent++;const G=BAL.evb.g;emoSet(v,"gian",Math.min(G.cap,G.base+Math.abs(Math.min(da,-dO))*G.k),`vì ${S.name} «${nm}»`,"me")}
  else if(da>=BAL.evb.v.aff)emoSet(v,"vui",Math.min(BAL.evb.v.cap,BAL.evb.v.base+da*BAL.evb.v.k),`được ${S.name} đối đãi tử tế («${nm}»)`)}
 const why=`${tt}: ${nm}`;
 const M=BAL.evb.me;if(g>l&&g>=M.min)emoSet(S,"vui",Math.min(M.cap,BAL.moodEvGood+g*M.k),`${why}, được việc`);
 else if(l>g&&l>=M.min)emoSet(S,resent?"lo":"buon",Math.min(M.cap,BAL.moodEvBad+l*M.k),`${why}, ${resent?"có người để bụng":"chịu thiệt"}`)}
/* ---------- (4) real preconditions ---------- */
(function(){try{const s=E68I&&E68I.doubtVisit;if(!s)return;const vf0=s.vf;
 s.vf=function(p){let ok=null;try{ok=vf0?vf0(p):null}catch(e){}const all=ok&&ok.length?ok:[...(s.v||[]).keys()];const v=RV(p.a0);const gave=!!(v&&(v.inv||[]).some(e=>e.from==="me"));return all.filter(i=>i!==2||gave)};
 const P0=PEND.e68doubtVisit;PEND.e68doubtVisit=function(p){const d=P0.apply(this,arguments);try{if(!d||p.vi!==2)return d;const v=RV(p.a0);const i=v?(v.inv||[]).findIndex(e=>e.from==="me"):-1;
  if(i<0&&!p.gk)return null;const k=p.gk||v.inv[i].k;p.gk=k;d.t=String(d.t).replace("trả lại quà ngươi tặng",`trả lại ${IT[k]?itm(k).n:"món quà"} ngươi tặng`);
  d.o=d.o.map(o=>Object.assign({},o,{go:()=>{try{if(!p.back){const j=(v.inv||[]).findIndex(e=>e.from==="me"&&e.k===k);if(j>=0){const x=v.inv.splice(j,1)[0];x.from="back";S.inv.push(x);p.back=1;log(`${itm(k).n} trở về rương của ngươi.`)}}}catch(e){}if(o.go)return o.go()}}))}catch(e){console.error(e)}return d}}catch(e){}})();
/* r4b (F1 whole group, law 6c): «Cho mượn» names a REAL piece of hers — and now it really goes: through THE ONE LOAN RULE (jdc dcBorrow: the NPC
   holds it, the loan book, back the next tuần; co-op guest → the host's «dcin»). Before, the dialog named her piece and nothing moved (a loan
   with no object). Only a piece she may lend (dcFree, not worn); the đàn only when she owns one (before: «cây đàn tỳ bà» with no đàn at all). */
(function(){try{const s=E68I&&E68I.borrowDress;if(!s)return;const vf0=s.vf;
 const lend=()=>typeof dcBorrow==="function"&&(typeof dcLend!=="function"||dcLend());
 const own=()=>{const L=(S.inv||[]).filter(e=>e&&!e.w&&IT[e.k]&&(typeof dcFree==="function"?dcFree(e):!e.h));return{robe:L.find(e=>itm(e.k).kd==="Y phục"),pin:L.find(e=>itm(e.k).kd==="Trâm cài"||itm(e.k).sl==="hair"),inst:L.find(e=>e.k==="dancoc")}};
 const pc=(o,vi)=>vi===0?o.robe:vi===1?o.inst:vi===2?o.pin:null;
 s.vf=function(p){let ok=null;try{ok=vf0?vf0(p):null}catch(e){}const all=ok&&ok.length?ok:[0,1,2,3];const o=own();const L=lend();return all.filter(i=>i===3?!!S.maid:L&&!!pc(o,i))};
 const P0=PEND.e68borrowDress;PEND.e68borrowDress=function(p){const d=P0.apply(this,arguments);try{if(!d)return d;const o=own();
  if(p.vi<=2){const e0=pc(o,p.vi);if(!e0&&!p.bk)return null;p.bk=p.bk||e0.k;const v=RV(p.a0);
   /* the two «Cho mượn» options move the piece (their own thiện cảm / bạc numbers stay as shown: aff:false); «Từ chối» moves nothing */
   d.o=d.o.map((x,i)=>i>1?x:Object.assign({},x,{go:()=>{const e=(S.inv||[]).find(y=>y&&y.k===p.bk&&!y.w&&dcFree(y));
    if(!v||!v.alive||!e||!dcBorrow(v,S,e,{why:"ev",aff:false})){log(`${itm(p.bk).n} đã không còn trong rương ngươi; ${v?v.name:"nàng"} về tay không.`);return}
    log(`${v.name} mượn ${itm(p.bk).n} của ngươi, qua tuần sau trả.`);if(x.go)return x.go()}}))}
  if(p.vi===0&&p.bk)d.t=String(d.t).replace("bộ y phục thêu phượng của ngươi",`bộ ${itm(p.bk).n.replace(/^Áo /,"áo ")} của ngươi`);
  if(p.vi===2&&p.bk)d.t=String(d.t).replace("chiếc trâm ngọc",`chiếc ${itm(p.bk).n.replace(/^Trâm/,"trâm")}`);
  if(p.vi===1&&p.bk)d.t=String(d.t).replace("cây đàn tỳ bà của ngươi",`cây ${itm(p.bk).n.replace(/^Đàn/,"đàn")} của ngươi`)}catch(e){}return d}}catch(e){}})();
/* ---------- (5) HINTS THAT TELL OPTIONS APART (coordinator 15/11 after opt-render r7; owner 15:10Z "reading hints must clearly beat random") ----------
   kitHint (jk2b, pure) at the VAGUE level (Tâm cơ < BAL.hintMid, most new lives) often gives two or more options of one dialog the same words
   (night1 talk, giu "có phúc con cái" ×2, prep, festival invitations…). Before a dialog shows, options whose hints collide get a per-option
   `hint` (option data, which kitHint honours) taken from the LOWEST clarer level at which they differ — still words only, still the truth of this
   moment; the risk tag stays kitHint's own. Options that read the same at every level keep their text (their cost / risk tells them apart).
   Not kitHint's structure: data only. Test: dev/test/hint-dedup.js (before/after table over the game's own dialogs). */
function evbDedup(m){try{if(!m||!m.opts||m.opts.length<2||typeof kitHint!=="function")return 0;if(typeof kitIsEventChoice==="function"&&!kitIsEventChoice(m))return 0;
 const lv=kitHintLevel();const O=m.opts;O.forEach(o=>{if(o&&o.__dhA){delete o.hint;delete o.risk;delete o.__dhA}});
 const raw=O.map(o=>(o&&!o.hint)?kitHint(o,m,lv):null);let fixed=0;
 const groups={};raw.forEach((h,i)=>{if(h&&h.hint)(groups[h.hint]=groups[h.hint]||[]).push(i)});
 for(const g of Object.values(groups)){if(g.length<2)continue;let pick=null;
  /* the lowest clearer level that leaves the fewest options reading the same (review r6: night1 @vague took level 1, which still left 2 pairs, while level 2 told all apart) */
  const nd=T=>{const c={};T.forEach(x=>c[x]=(c[x]||0)+1);return T.filter(x=>c[x]>1).length};
  for(let l=lv+1;l<=2;l++){const T=g.map(i=>kitHint(O[i],m,l).hint);if(new Set(T).size>1&&(!pick||nd(T)<nd(pick.T)))pick={l,T}}
  const T=pick?pick.T.slice():g.map(i=>raw[i].hint);
  /* still the same words: add the option's own chance (its ladder word, in words) and then, if needed, how big its gain is next to the others */
  const dup=()=>{const c={};T.forEach(x=>c[x]=(c[x]||0)+1);return T.map(x=>c[x]>1)};
  if(dup().some(Boolean))g.forEach((i,j)=>{if(!dup()[j]||/thành|khó đoán/.test(T[j]))return;const ch=evbChance(O[i]);if(ch)T[j]+=`; ${ch}`});
  /* best / worst are named WITHIN each set of options that still read the same (not the whole group: an option already told apart
     may hold the group's extreme; 'hơn cả' only when the set is the whole dialog, else 'nhỉnh hơn / kém hơn', review r6) */
  const clus=()=>{const c={};T.forEach((x,j)=>(c[x]=c[x]||[]).push(j));return Object.values(c).filter(L=>L.length>1)};
  if(dup().some(Boolean)){const G=g.map(i=>evbGain(O[i]));for(const C of clus()){const V=C.map(j=>G[j]);const hi=Math.max(...V),lo=Math.min(...V);
   const all=C.length===O.length;if(hi>lo)C.forEach(j=>{if(G[j]===hi)T[j]+=all?"; lợi lớn hơn cả":"; lợi nhỉnh hơn";else if(G[j]===lo)T[j]+=all?"; lợi ít hơn cả":"; lợi kém hơn"})}}
  /* same words still: the option's own chance number (option data `od`: night talk fit, contest odds), best and worst named */
  if(dup().some(Boolean)){const D=g.map(i=>O[i]&&typeof O[i].od==="number"?O[i].od:null);for(const C of clus()){const L=C.map(j=>D[j]).filter(x=>x!=null);
   if(L.length>1&&Math.max(...L)>Math.min(...L)){const hi=Math.max(...L),lo=Math.min(...L);const all=C.length===O.length;C.forEach(j=>{if(D[j]==null)return;if(D[j]===hi)T[j]+=all?"; cơ may cao hơn cả":"; cơ may nhỉnh hơn";else if(D[j]===lo)T[j]+=all?"; cơ may thấp hơn cả":"; cơ may kém hơn"})}}}
  if(T.every((x,j)=>x===raw[g[j]].hint))continue;
  g.forEach((i,j)=>{const t=T[j];if(!t)return;
   const o=O[i],risk=raw[i].risk,l0=lv;o.hint=l=>l===l0?t:(()=>{const c=Object.assign({},o);delete c.hint;delete c.risk;return kitHint(c,m,l).hint})();o.risk=risk;o.__dhA=1;fixed++})}
 return fixed}catch(e){console.error("evbDedup",e);return 0}}
window.evbDedup=evbDedup;
/* the option's chance in words, from its own ladder word (what it shows elsewhere in the game) — never a number */
function evbChance(o){const s=String((o&&(o.x||o.j67))||"")+" "+String((o&&o.n)||"");const w=(s.replace(/<[^>]+>/g,"").match(/(Liều|Khó|Năm ăn năm thua|Khá chắc|Rất chắc|Nắm chắc|Chắc)(?=\s|·|$)/)||[])[1]||(o&&o.p!=null?word(o.p):"");
 return !w?"":/^(Liều|Khó)$/.test(w)?"khó thành":w==="Năm ăn năm thua"?"thành bại khó đoán":/^(Rất chắc|Nắm chắc)$/.test(w)?"gần như chắc thành":"dễ thành"}
/* how big the option's gain is: the sum of the positive numbers in its success part (fx + thành:) */
function evbGain(o){let s=0;try{const f=Object.assign({},o.w||{});for(const v of Object.values(f))if(v>0)s+=v;const x=String(o.x||o.j67||"").replace(/<[^>]+>/g,"");const m=x.split(/hỏng:|kèm:/)[0];
 (m.match(/\+\s?\d+/g)||[]).forEach(n=>s+=+n.replace(/\D/g,""))}catch(e){}return s}
(function(){const s0=showModal;showModal=function(){try{if(Q[0])evbDedup(Q[0])}catch(e){}return s0.apply(this,arguments)}})();
