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
Object.assign(BAL,{ctxTaste:12,ctxRelDiv:10,ctxRelCap:8,ctxMoodBad:-9,ctxMoodGood:6,ctxEmp:[8,0,-5,-10],ctxCap:22,moodEvGood:28,moodEvBad:30,moodKeep:4});
function ctxSeed(){if(!S)return 1;if(!S.ctxSeed)S.ctxSeed=1+Math.floor(Math.random()*2147483646);return S.ctxSeed}
function ctxHash(s){let h=2166136261;s=String(s);for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function ctxKey(p){try{return typeof key==="function"?key(p):p&&p.id}catch(e){return""}}
/* the person's taste for this kind of answer this life: −1, −½, 0, ½, 1 */
function ctxTaste(p,ans){const n=String(ans||"").replace(/<[^>]+>/g,"").replace(/\{[^}]*\}|\d+/g,"").toLowerCase().split(/[,:(]/)[0].trim();const h=ctxHash(ctxSeed()+"|"+ctxKey(p)+"|"+n);return [-1,-.5,0,.5,1][h%5]}
function ctxMood(p){try{const e=emoGet(p);if(!e||e.k==="binh")return 0;if(["gian","ghen","dau"].includes(e.k))return BAL.ctxMoodBad;if(e.k==="vui")return BAL.ctxMoodGood;if(e.k==="so")return 3;return -3}catch(e){return 0}}
function ctxRel(p){try{if(!p||p===S||!rivals.includes(p))return 0;return cl(Math.round(aff(p,S)/BAL.ctxRelDiv),-BAL.ctxRelCap,BAL.ctxRelCap)}catch(e){return 0}}
function ctxOdds(p,ans){if(!p||!S)return 0;return cl(Math.round(ctxTaste(p,ans)*BAL.ctxTaste+ctxMood(p)+ctxRel(p)),-BAL.ctxCap,BAL.ctxCap)}
window.ctxOdds=ctxOdds;
/* j68 events: c6(name, spec) — the person in it = the first relation target */
(function(){if(typeof c6!=="function")return;const c0=c6;c6=function(n,s){try{if(s&&!window.__ctxOff){const who=((s.r||[])[0]||(s.lr||[])[0]||[])[0];const p=who&&(who.o||who);
  if(p&&typeof p==="object"){s=Object.assign({},s);if(s.p!=null)s.p=s.p+ctxOdds(p,n);
   else{const t=ctxTaste(p,n);if(t&&s.r)s.r=s.r.map(([a,v])=>[a,Math.round(v*(1+t/2))||v])}}}}catch(e){}return c0.call(this,n,s)}})();
/* j67 chapters: the beat's person (v / v2 / foe / hh), the Emperor's mood on his beats */
(function(){if(typeof oOf67!=="function")return;const o0=oOf67;oOf67=function(A,o,b){const r=o0.apply(this,arguments);try{if(o.o==null||window.__ctxOff)return r;
  let p=null;const w=b&&b.w;if(w==="v"||w==="v2")p=rv67(A,w);else if(w==="foe")p=typeof foe67==="function"?foe67():null;else if(w==="hh")p=qOn()?rivals[0]:null;
  let d=p?ctxOdds(p,o.n):0;if(w==="emp"&&S.emp)d+=BAL.ctxEmp[S.emp.mood|0]||0;if(!p&&w!=="emp")d+=Math.round(ctxTaste({id:"arc:"+A.a+":"+(b.h||"")},o.n)*BAL.ctxTaste*.6);
  return od(cl((typeof o.o==="function"?o.o(A):o.o)+((o.e||b.x)?(A.sc||0)*7:0)+d,1,99))}catch(e){return r}}})();
/* ---------- (3) mood causes ---------- */
let EVB_ART="";  /* the picture of the event whose choice is resolving now (evbMood): stored on each cause it sets (x.a) */
(function(){if(typeof emoSet!=="function")return;const s0=emoSet;emoSet=function(p,k,v,why,t){const r=s0.apply(this,arguments);try{const q=emoRes(p);if(q&&EMO[k]&&v>0&&why){const W=emoW();
  const H=(q.emoH||[]).filter(x=>W-x.w<=BAL.moodKeep&&x.why!==why);const x={k,v:Math.round(v),why:String(why).slice(0,90),w:W};if(EVB_ART)x.a=EVB_ART;H.unshift(x);q.emoH=H.slice(0,6)}}catch(e){}return r}})();
function emoCauses(p){const q=emoRes(p);if(!q)return[];const W=emoW();const L=(q.emoH||[]).filter(x=>W-x.w<=BAL.moodKeep);const e=q.emo;
 if(e&&e.why&&e.v>=15&&!L.some(x=>x.why===e.why))L.unshift({k:e.k,v:e.v,why:e.why,w:e.w||W});return L.sort((a,b)=>b.w-a.w||b.v-a.v)}
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
 const src=own||`img/ev-mood-${EMO[k]||k==="an"?k:"binh"}${w%2?"-2":""}.webp`;
 const cap=c?String(c.why).replace(/\s*«[^»]*»/g,"").replace(/[,.]\s*$/,"").trim():m.known?(EMO[k]||""):"Chưa rõ lòng người";
 return{src,label:cap,mark:`img/kit/emo-${set}${k}.webp`,markAlt:`Tâm trạng: ${m.known?m.name:"chưa rõ"}`}}
function emoBox(k){const p=emoByKey(k);if(!p||!S||S.dead)return;const m=window.kitEmotion(p);if(!m)return;let nm=p===S?"Ngươi":emoName(p);/* rank + name always together (owner 15/11, OD L820-821): same plain title+name as Đã biết về X */try{if(p!==S&&typeof kitName==="function"&&typeof kpPlain==="function"){const t=kpPlain(kitName(p)).trim();if(t)nm=t}}catch(e){}
 const cls=x=>x==="vui"?"g":["gian","buon","dau","so","lo","ghen"].includes(x)?"r":"";const W=emoW();const ago=w=>W-w<=0?"tuần này":`${W-w} tuần trước`;
 const L=m.known?emoCauses(p):[];
 const rows=m.known?(L.length?L.map(x=>[EMO[x.k]||x.k,`${x.why} · ${ago(x.w)}`,cls(x.k)]):[["Nguyên nhân","không có chuyện gì đáng kể gần đây"]]):[["Nguyên nhân","chưa rõ: ngươi chưa gặp, chưa có tai mắt bên người này"]];
 let art=null;try{art=emoBoxArt(p,m,L)}catch(e){}
 kitModal({kind:"info",look:1,title:`Tâm trạng · ${nm}`,sub:m.known?`Hiện nay: ${m.name}${p===S&&typeof mbBand==="function"&&!window.__moodOff?` · ${mbBand().name}`:""}`:"chưa rõ",subject:p,headArt:art||undefined,
  sections:p===S&&typeof mbSecs==="function"&&!window.__moodOff?(M=>[M[0],M[1],{h:"Cảm xúc lúc này",rows},M[2]])(mbSecs()):[{h:"Đang tác động",rows},{h:"",rows:[["Ảnh hưởng",p===S?"tâm trạng của ngươi đổi cơ may của mọi việc một chút":"vui thì dễ chịu nghe, giận hay ghen thì khó nói chuyện, dễ ra tay hơn"]]}],btn:"Đã rõ"})}
window.emoBox=emoBox;window.emoCauseArt=emoCauseArt;
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
 if(S.rank<b.rank)l+=20;let resent=0;
 for(const v of rivals||[]){const o=b.rel[v.id];if(!o||!v.alive)continue;const da=aff(v,S)-o.a,dO=Math.round(oan(v,S))-o.o;
  if(dO>=3||da<=-6){resent++;emoSet(v,"gian",Math.min(70,25+Math.abs(Math.min(da,-dO))*2),`vì ${S.name} «${nm}»`,"me")}
  else if(da>=6)emoSet(v,"vui",Math.min(60,20+da*2),`được ${S.name} đối đãi tử tế («${nm}»)`)}
 const why=`${tt}: ${nm}`;
 if(g>l&&g>=2)emoSet(S,"vui",Math.min(80,BAL.moodEvGood+g*2),`${why}, được việc`);
 else if(l>g&&l>=2)emoSet(S,resent?"lo":"buon",Math.min(80,BAL.moodEvBad+l*2),`${why}, ${resent?"có người để bụng":"chịu thiệt"}`)}
/* ---------- (4) real preconditions ---------- */
(function(){try{const s=E68I&&E68I.doubtVisit;if(!s)return;const vf0=s.vf;
 s.vf=function(p){let ok=null;try{ok=vf0?vf0(p):null}catch(e){}const all=ok&&ok.length?ok:[...(s.v||[]).keys()];const v=RV(p.a0);const gave=!!(v&&(v.inv||[]).some(e=>e.from==="me"));return all.filter(i=>i!==2||gave)};
 const P0=PEND.e68doubtVisit;PEND.e68doubtVisit=function(p){const d=P0.apply(this,arguments);try{if(!d||p.vi!==2)return d;const v=RV(p.a0);const i=v?(v.inv||[]).findIndex(e=>e.from==="me"):-1;
  if(i<0&&!p.gk)return null;const k=p.gk||v.inv[i].k;p.gk=k;d.t=String(d.t).replace("trả lại quà ngươi tặng",`trả lại ${IT[k]?IT[k].n:"món quà"} ngươi tặng`);
  d.o=d.o.map(o=>Object.assign({},o,{go:()=>{try{if(!p.back){const j=(v.inv||[]).findIndex(e=>e.from==="me"&&e.k===k);if(j>=0){const x=v.inv.splice(j,1)[0];x.from="back";S.inv.push(x);p.back=1;log(`${IT[k].n} trở về rương của ngươi.`)}}}catch(e){}if(o.go)return o.go()}}))}catch(e){console.error(e)}return d}}catch(e){}})();
(function(){try{const s=E68I&&E68I.borrowDress;if(!s)return;const vf0=s.vf;
 const own=()=>{const L=(S.inv||[]).filter(e=>!e.h&&IT[e.k]);return{robe:L.find(e=>IT[e.k].kd==="Y phục"),pin:L.find(e=>IT[e.k].kd==="Trâm cài"||IT[e.k].sl==="hair"),inst:L.find(e=>e.k==="dancoc")||((S.arts&&S.arts.cam)>=1?{k:null}:null)}};
 s.vf=function(p){let ok=null;try{ok=vf0?vf0(p):null}catch(e){}const all=ok&&ok.length?ok:[0,1,2,3];const o=own();return all.filter(i=>i===0?!!o.robe:i===1?!!o.inst:i===2?!!o.pin:!!S.maid)};
 const P0=PEND.e68borrowDress;PEND.e68borrowDress=function(p){const d=P0.apply(this,arguments);try{if(!d)return d;const o=own();
  if(p.vi===0&&o.robe)d.t=String(d.t).replace("bộ y phục thêu phượng của ngươi",`bộ ${IT[o.robe.k].n.replace(/^Áo /,"áo ")} của ngươi`);
  if(p.vi===2&&o.pin)d.t=String(d.t).replace("chiếc trâm ngọc",`chiếc ${IT[o.pin.k].n.replace(/^Trâm/,"trâm")}`);
  if(p.vi===1&&o.inst&&o.inst.k)d.t=String(d.t).replace("cây đàn tỳ bà của ngươi",`cây ${IT[o.inst.k].n.replace(/^Đàn/,"đàn")} của ngươi`)}catch(e){}return d}}catch(e){}})();
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
