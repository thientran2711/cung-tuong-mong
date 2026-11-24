/* ================= jtrong — TRỌNG (13 virtues) for everyone + Thái hậu archetypes + ONE greeting rule =================
   Owner 15/11 (OWNER_DECISIONS "BALANCE / SYSTEMS" 1+2, ledger 170/171, queue D7):
   1. Every person (the player too, the Emperor, Thái hậu, consorts, servants) "trọng" 2 of the 13 virtues. Deterministic from the
      person's id/name (co-op safe, old saves get theirs lazily, stored on the object as .trong). The first one leans on their nết (PERS).
   2. Deeds carry virtue tags (DEED). The regard a deed moves is scaled by the JUDGE's trọng: a deed that honours what she values counts
      more, one that offends it counts less or even turns sour. Talk options keep their text honest (the number shown = the number applied):
      topic talk via chatF, greetings via trGreet(); NPC↔NPC / NPC→her social deeds (SOC) through a deed context around affAdd/oanAdd.
   3. Thái hậu: one of 5 archetypes per life (S.thO.arch, co-op world key thO); old saves map from S.thTrait. The archetype sets her nết
      (PERS, so emotions keep working), her trọng and her greeting numbers.
   4. ONE greeting rule trGreet(who, host): Thỉnh an Thái hậu / Thỉnh an Hoàng hậu / snow-day thỉnh an / NPC serveTH / servant-road
      greeting. Gain = base × trọng × rank × both moods × repetition × saturation (+ angry-host shift) — can be 0 or negative; a failed
      greeting is a scolding. A month without any thỉnh an lowers a strict Thái hậu's regard; above her ceiling it cools off.
   5. Display only through existing parts: person-card lines (→ kitPcGrid chips "Trọng", "Tính nết"), the act card's Được/Mất numbers
      and its Kèm row (optLine / kitParse). No new UI part. ================= */
Object.assign(BAL,{trong:{up:.5,off:.6,/* per matched / offended virtue */
 hhBase:3,hhO:70,hhRep:.15,hhScold:3,hhCap:55,repMin:.5,capSpan:15,srvBase:2,npcBase:1.4,learn:60}});
const VIRT=["Hiếu","Đễ","Trung","Tín","Lễ","Nghĩa","Liêm","Sỉ","Nhân","Trí","Cần","Kiệm","Khiêm"];
const VIRT_GL={"Hiếu":"hiếu thảo với bề trên","Đễ":"kính nhường người trên","Trung":"trung thành","Tín":"giữ chữ tín, ghét dối trá","Lễ":"giữ lễ nghi phép tắc",
 "Nghĩa":"trọng nghĩa, không bỏ người hoạn nạn","Liêm":"trong sạch, ghét đút lót","Sỉ":"biết liêm sỉ, ghét điều nhục","Nhân":"thương người",
 "Trí":"trọng người hiểu biết","Cần":"chăm chỉ","Kiệm":"tiết kiệm, ghét xa hoa","Khiêm":"khiêm nhường, ghét kiêu căng"};
/* nết → the virtue they lean to / virtues they never hold */
/* pool nết lean (first trọng follows the Lòng dạ nết) and bans come from the ONE trait table BAL.net (jnet.js fills them); the Emperor keys stay here */
const TR_V={nhantu:"Nhân",chamchinh:"Cần",trongtai:"Trí",hieuthao:"Hiếu",nongnay:"Trung",danghi:"Trung"};
const TR_BAN={};
/* deeds → virtue tags (+1 honours, -1 offends) */
const DEED={greet:{"Hiếu":1,"Lễ":1},greetHH:{"Lễ":1,"Khiêm":1},snow:{"Hiếu":1,"Cần":1},
 "Hỏi han sức khỏe":{"Nhân":1,"Lễ":1},"Khen tài nghệ nàng":{"Lễ":1,"Tín":-1},"Bàn tán":{"Tín":-1,"Nghĩa":-1},"Chia sẻ bí mật":{"Tín":1},"Cảnh báo nàng":{"Trung":1,"Nghĩa":1},
 help:{"Nhân":1,"Nghĩa":1},visit:{"Nhân":1,"Đễ":1},warn:{"Trung":1,"Tín":1},mediate:{"Khiêm":1,"Nhân":1},apologise:{"Khiêm":1,"Sỉ":1},ally:{"Nghĩa":1},follow:{"Trung":1},
 serveTH:{"Hiếu":1,"Cần":1},provoke:{"Lễ":-1,"Khiêm":-1},humiliate:{"Lễ":-1,"Nhân":-1},flaunt:{"Kiệm":-1,"Khiêm":-1},spy:{"Tín":-1},drop:{"Nghĩa":-1},
 bribeksp:{"Liêm":-1},gossip:{"Tín":-1},feign:{"Tín":-1},steal:{"Nghĩa":-1}};
/* Thái hậu archetypes: trait (PERS) · trọng · greeting base · odds · repetition fade · ceiling · scolding · monthly neglect loss · rank weight */
const TH_ARCH={
 tuai:{n:"Từ ái",trait:"Ân cần",tr:["Nhân","Hiếu"],base:5,o:80,rep:.12,cap:58,scold:1,neg:0,rk:0},
 nghiem:{n:"Nghiêm khắc",trait:"Thật thà",tr:["Lễ","Cần"],base:4,o:65,rep:.2,cap:48,scold:2,neg:3,rk:.04},
 danghi:{n:"Đa nghi",trait:"Kín đáo",tr:["Tín","Trung"],base:4,o:65,rep:.3,cap:45,scold:2,neg:2,rk:0},
 quyen:{n:"Quyền uy",trait:"Kiêu ngạo",tr:["Lễ","Trung"],base:4,o:70,rep:.15,cap:52,scold:1,neg:2,rk:.08},
 phat:{n:"Sùng Phật",trait:"Mê tín",tr:["Nhân","Kiệm"],base:4,o:75,rep:.1,cap:55,scold:1,neg:1,rk:0}};
const TH_FROM={"Ân cần":"tuai","Kín đáo":"danghi","Kiêu ngạo":"quyen","Vì gia tộc":"tuai"};
/* per-life seed: the co-op room (both seats agree; thO is a world key) else her name (random per life) */
function trLifeSeed(){try{if(window.COOPW&&COOPW.on&&typeof COOP==="object"&&COOP.state&&COOP.state.room)return "room:"+COOP.state.room}catch(e){}return "me:"+(S.name||"")+":"+((S.year||0)-Math.floor((S.turn||0)/12))}
function trHash(s){let h=7;for(const c of String(s))h=(h*31+c.charCodeAt(0))>>>0;return h}
function thArch(){S.thO=S.thO||{};const O=S.thO;if(!O.arch||!TH_ARCH[O.arch]){const k=Object.keys(TH_ARCH);
  /* during start() her name / Thái hậu age are not set yet: answer without fixing the archetype */
  if(!S.name||!S.thAge)return TH_ARCH[TH_FROM[BAL.net.old[S.thTrait]||S.thTrait]||"tuai"];
  O.arch=TH_FROM[BAL.net.old[S.thTrait]||S.thTrait]||k[trHash("th:"+(S.thAge||0)+":"+trLifeSeed())%k.length]}
 const A=TH_ARCH[O.arch];S.thTrait=A.trait;return A}
/* who is this? → S / "th" / Emperor / the consort object / the servant */
function trRes(p){if(!p)return null;if(p===S||p==="me")return S;if(p==="th"||p===S.thO||(p.kind==="th"&&!p.name))return"th";if(p.kind==="th")return"th";
 if(p===S.emp||p.kind==="emp")return S.emp;if(typeof p.kind==="string"&&p.ref)return p.ref;if(p.kind==="maid"&&!p.name)return S.maid;return p}
/* the player has a nết too (owner: "whatever they have, she has"); kept off .trait (figure art reads .trait) */
(function(){const t0=traitsOf;traitsOf=function(p){try{if(p&&(p==="th"||p.kind==="th"))return[thArch().trait]}catch(e){}return t0.apply(this,arguments)}})();
/* trọng reads the same ONE pool as everything else (jnet.js netOf; co-op friend keyed "me:"+name on both seats) */
function trTraits(p){if(p===S.emp)return S.emp.traits||[];return traitsOf(p)}
function trongOf(p0){const p=trRes(p0);if(!p)return[];if(p==="th")return thArch().tr;if(Array.isArray(p.trong)&&p.trong.length===2)return p.trong;
 const key=p===S||p.coop||p.id===901||p.id===902?"me:"+(p.name||""):p===S.emp?"emp:"+(p.name||S.empName||""):p.sid!=null?"s:"+p.sid:p.id!=null?"id:"+p.id+":"+(p.name||""):"n:"+(p.name||"");
 const T=trTraits(p);const ban=new Set();T.forEach(t=>(TR_BAN[t]||[]).forEach(x=>ban.add(x)));const out=[];const f=T.map(t=>TR_V[t]).find(v=>v&&!ban.has(v));if(f)out.push(f);
 let h=trHash(key);for(let i=0;out.length<2&&i<40;i++){const v=VIRT[h%13];if(!out.includes(v)&&!ban.has(v))out.push(v);h=(Math.floor(h/13)*31+17+i)>>>0}
 try{p.trong=out}catch(e){}return out}
/* the judge's multiplier for a deed: 1 = as base; >1 honoured; <1 offended (may go below 0 = the deed sours) */
function trongMul(judge,tags){if(!tags)return 1;const B=BAL.trong;let m=1;for(const v of trongOf(judge)){const t=tags[v]||0;if(t>0)m+=B.up;else if(t<0)m-=B.off}return m}
function trongHit(judge,tags){return tags?trongOf(judge).filter(v=>tags[v]):[]}
/* knowing someone's trọng: learnt through deeds that touch it */
function trKey(p0){const p=trRes(p0);return p==="th"?"th":p===S?"me":p===S.emp?"emp":p&&p.id!=null?"r"+p.id:p&&p.sid!=null?"s"+p.sid:""}
function trongKnown(p){if(trRes(p)===S)return true;S.tgK=S.tgK||{};return !!S.tgK[trKey(p)]}
function trongLearn(p,tags,why){if(!S||trongKnown(p))return;const H=trongHit(p,tags);if(!H.length||!roll(BAL.trong.learn))return;S.tgK[trKey(p)]=1;const q=trRes(p);
 const nm=q==="th"?"Thái hậu":q===S.emp?"Hoàng thượng":q&&q.queen?"Hoàng hậu":q&&q.name||"";const t=`${why||"Qua lời qua lại"}: biết ${nm} trọng ${trongOf(p).join(", ")}`;
 try{if(q&&q.id!=null&&q!==S.emp)noteAdd(q.id,t)}catch(e){}log(`<span class="past">${t}.</span>`);try{kitKnow({key:"n:"+(q&&q.id!=null?q.id:trKey(p)),pri:2,text:`${t}.`})}catch(e){}}
function trongLine(p){return `Trọng: ${trongKnown(p)?trongOf(p).map(v=>`<b>${kitGloss(v)}</b>`).join(" · "):"chưa rõ"}`}

/* ---------- ONE greeting rule ---------- */
const TR_MH={vui:1.3,binh:1,buon:.8,lo:.8,so:1,gian:.4,ghen:.7,dau:.6},TR_MW={vui:1.1,buon:.85,dau:.8,gian:.75,lo:.9};
function trEmo(p){try{return typeof emoGet==="function"?emoGet(p).k:"binh"}catch(e){return"binh"}}
/* FEELINGS-18: the table key of p's feeling (new kinds read their group's factor; Buồn at the heavy level = the old Đau khổ factor) */
function trMK(T,p){const k=trEmo(p);try{if(k==="buon"&&T.dau!=null&&typeof feelLv==="function"&&feelLv(p,"buon")>=3)return"dau";return typeof feelIn==="function"?feelIn(T,k):k}catch(e){return k}}
function trGreetLog(who,host){const k=host==="th"?"grT":"grH";who[k]=Array.isArray(who[k])?who[k]:[];return who[k]}
function trGreetN(who,host){const now=wk();return trGreetLog(who,host).filter(w=>w<now&&w>=now-3).length}
function trGreetMark(who,host){const L=trGreetLog(who,host),now=wk();if(L[L.length-1]!==now)L.push(now);if(L.length>12)L.splice(0,L.length-12)}
function trGreet(who,host,opt){opt=opt||{};const B=BAL.trong,th=host==="th",A=th?thArch():null;who=who||S;
 const tags=opt.tags||(th?DEED.greet:DEED.greetHH),vm=trongMul(th?"th":host,tags);
 const base=opt.base!=null?opt.base:th?A.base:B.hhBase;const rk=rkOf(who)||0;const rkF=th?1+A.rk*(rk-3):1;
 const eh=trEmo(th?S.thO:host),ew=trEmo(who);const mH=TR_MH[trMK(TR_MH,th?S.thO:host)]||1,mW=TR_MW[trMK(TR_MW,who)]||1;
 const n=opt.noRep?0:trGreetN(who,host),repF=Math.max(B.repMin,1-(th?A.rep:B.hhRep)*n);
 const reg=th?(who===S?S.th:(who.th||0)):(who===S?S.hh:aff(host,who)),cap=th?A.cap:B.hhCap,capF=reg>cap?Math.max(0,1-(reg-cap)/B.capSpan):1;
 const shift=eh==="gian"?-2:0;const raw=base*vm*rkF*mH*mW*repF*capF+shift;const gain=cl(Math.round(raw),-4,20);
 const o=cl((th?A.o:B.hhO)+Math.round((vm-1)*10)+(eh==="gian"?-10:eh==="vui"?5:0),20,BAL.odds.hi);const scold=(th?A.scold:B.hhScold)+(eh==="gian"?2:0)+(vm<1?1:0);
 const H=th?"Thái hậu":"Hoàng hậu",X=[];
 if(th&&S.thO.archK)X.push(`${H} ${A.n.toLowerCase()}`);
 if(trongKnown(th?"th":host)){const hit=trongHit(th?"th":host,tags);if(hit.length)X.push(`${H} trọng ${hit.join(", ")}: ${vm>=1?"quý lễ này hơn":"không ưa"}`)}
 if(eh==="gian")X.push(`${H} đang giận`);else if(eh==="vui")X.push(`${H} đang vui`);
 if(n>=2)X.push("mấy hôm liền ngày nào cũng sang: được ít dần");if(capF<1)X.push(`${H} đã quý ngươi lắm: khó thêm`);
 return{gain,o,scold,vm,n,x:X.join(" · "),why:[[th?`${H} ${A.n.toLowerCase()}`:`${H} giữ lễ`,(th?A.o:B.hhO)-75],vm!==1?[`${H} trọng ${trongOf(th?"th":host).join(", ")}`,Math.round((vm-1)*10)]:null,eh==="gian"?[`${H} đang giận`,-10]:eh==="vui"?[`${H} đang vui`,5]:null].filter(Boolean)}}
/* wraps a "Thỉnh an" talk option so the card shows (and runs) the real numbers */
function trGreetOpt(a,host){const th=host==="th",k=th?"th":"hh",G=trGreet(S,host);const w=Object.assign({},a.w||{}),l=Object.assign({},a.l||{});
 if(G.gain)w[k]=G.gain;else delete w[k];l[k]=-G.scold;const why0=a.why;
 const o=Object.assign({},a,{o:a.o==null?od(G.o):oddsCl(a.o+G.o-(th?75:70)),w,l,risk:[a.risk,G.x].filter(Boolean).join(" · "),why:()=>{const F=why0?why0().slice():[];G.why.forEach(f=>F.push(f));return F}});
 const mark=()=>{trGreetMark(S,host);if(th){S.thO.archK=1}trongLearn(th?"th":host,th?DEED.greet:DEED.greetHH,"Qua buổi thỉnh an")};
 if(a.run){const r0=a.run;o.run=function(){mark();return r0.apply(this,arguments)}}
 else{const g0=a.go,f0=a.fail;o.go=function(){mark();return g0?g0.apply(this,arguments):undefined};o.fail=function(){mark();return f0?f0.apply(this,arguments):undefined}}
 return o}
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);try{if(!p||!Array.isArray(A))return A;
 if(p.kind==="th")return A.map(a=>a&&/^Thỉnh an/.test(a.n)?trGreetOpt(a,"th"):a);
 if(p.kind==="hh"&&p.ref)return A.map(a=>a&&a.n==="Thỉnh an"?trGreetOpt(a,p.ref):a)}catch(e){console.error(e)}return A}})();
/* topic talk with consorts: the same option built with chatF × the target's trọng multiplier, so "nàng quý ngươi +N" stays true */
function trTopicTags(n){if(/^Bàn tán/.test(n))return DEED["Bàn tán"];return DEED[n]||null}
(function(){if(typeof topicOpts!=="function")return;const t0=topicOpts;topicOpts=function(v){const A=t0.apply(this,arguments);try{if(!v||!Array.isArray(A))return A;
 const cf=chatF,G={},out=A.slice();A.forEach((a,i)=>{const tg=a&&trTopicTags(a.n);if(!tg)return;const m=Math.max(.25,+trongMul(v,tg).toFixed(2));(G[m]=G[m]||[]).push(i)});
 for(const m in G){let B=A;if(+m!==1){chatF=function(){return cf.apply(this,arguments)*(+m)};try{B=t0.call(this,v)}finally{chatF=cf}}
  G[m].forEach(i=>{const b=B.find(x=>x&&x.n===A[i].n)||A[i];const tg=trTopicTags(b.n);const r0=b.run;out[i]=Object.assign({},b,r0?{run:function(){const r=r0.apply(this,arguments);trongLearn(v,tg,"Qua câu chuyện");return r}}:{})})}
 return out}catch(e){console.error(e);return A}}})();
/* NPC social deeds: a deed context so the judge's regard follows their trọng */
let TR_DEED=null;
(function(){try{for(const k in SOC){const tg=DEED[k];if(!tg||k==="serveTH")continue;const r0=SOC[k].run;SOC[k].run=function(v){const d0=TR_DEED;TR_DEED={tags:tg,doer:v};try{return r0.apply(this,arguments)}finally{TR_DEED=d0}}}
 const a0=affAdd;affAdd=function(x,y,n){try{const D=TR_DEED;if(D&&x&&x!==D.doer&&n){const m=trongMul(x,D.tags);if(m!==1)n=n>0?n*m:n*(2-Math.min(1,m))}}catch(e){}return a0.call(this,x,y,n)};
 const o0=oanAdd;oanAdd=function(x,y,n){try{const D=TR_DEED;if(D&&x&&x!==D.doer&&n>0){const m=trongMul(x,D.tags);if(m<1)n*=2-m;else if(m>1)n/=m}}catch(e){}return o0.call(this,x,y,n)};
 /* NPC serveTH (sớm hôm hầu Thái hậu): the same greeting rule as hers */
 if(SOC.serveTH){const r0=SOC.serveTH.run;SOC.serveTH.run=function(v){const b=v.th||0;const r=r0.apply(this,arguments);try{const G=trGreet(v,"th",{base:BAL.trong.npcBase});v.th=cl(b+((v.th||0)-b-2)+G.gain,-100,100);trGreetMark(v,"th")}catch(e){}return r}}}catch(e){console.error(e)}})();
/* a month: no thỉnh an at all → a strict Thái hậu takes offence; above her ceiling she cools off a little */
(function(){const m0=monthTick;monthTick=function(){let ev="";try{if(S&&!S.dead&&!S.thDead&&!S.out&&!S.confined&&!(typeof isSrv==="function"&&isSrv())&&S.turn>=1){const A=thArch();
  const c=trGreetLog(S,"th").filter(w=>w>=wk()-3).length;let d=0,why="";if(!c&&A.neg){d=A.neg;why="Cả tháng ngươi không sang thỉnh an"}else if(S.th>A.cap+10){d=1;why="Thái hậu nguôi dần lòng thiên vị"}
  if(d){apply({th:-d});ev=`<span class="r">${why}: Thái hậu quý ngươi -${d}.</span> `;log(ev)}}}catch(e){console.error(e)}return m0.apply(this,arguments)}})();
/* servant road "Hành lễ thỉnh an" + snow-day thỉnh an read the same rule */
function trSrvGreet(v){try{return Math.max(0,Math.round(BAL.trong.srvBase*trongMul(v,DEED.greetHH)))}catch(e){return 2}}
function trSnowGreet(){try{return Math.max(1,trGreet(S,"th",{base:5,tags:DEED.snow,noRep:1}).gain)}catch(e){return 5}}
/* person cards: "Trọng" (and her own / Thái hậu's "Tính nết") as ordinary card lines → kitPcGrid chips (no new UI part) */
(function(){const p0=pcard;pcard=function(o){try{if(o&&S&&!o.__tr){o=Object.assign({},o,{__tr:1});const L=(o.lines||[]).slice();let who=null;
  if(o.name===S.name||o.me)who=S;else if(o.rank==="Thái hậu")who="th";else if(o.rank==="Hoàng thượng")who=S.emp;else if(S.maid&&o.name===S.maid.name)who=S.maid;
  else if(typeof kitPersonByName==="function")who=kitPersonByName(o.name);
  if(who){if(who===S&&!L.some(x=>/Tính nết/.test(x)))L.push(`Tính nết: ${traitsOf(S).map(t=>`<b>${kitGloss(t)}</b>`).join(" · ")}`);
   if(who==="th"&&!L.some(x=>/Tính nết/.test(x)))L.push(`Tính nết: ${S.thO&&S.thO.archK?`<b>${thArch().n}</b>`:"chưa rõ"}`);
   if(who==="th"||who===S||who===S.emp||who===S.maid||(typeof rivals!=="undefined"&&rivals.includes(who)))L.push(trongLine(who));o.lines=L}}}catch(e){console.error(e)}return p0.call(this,o)}})();
/* LUẬT SỬA CẢ NHÓM: every other deck act that raises Thái hậu regard (gifts, portrait, sutra…) follows the same family rule:
   × her trọng (DEED.thGift) × repetition of THAT act (last 6 mornings) × saturation (ceiling + thGiftCap, fading over thGiftSpan).
   The card shows the result (measured 16/11: "Vẽ chân dung tặng Thái hậu" +10 spammed was the main reason she sat at 100). */
Object.assign(BAL.trong,{thGiftCap:20,thGiftSpan:20,thGiftRep:.2,thGiftMin:.4});
DEED.thGift={"Hiếu":1,"Lễ":1};
function trThDeedN(n){const L=(S.thDeed||{})[n]||[],now=wk();return L.filter(w=>w<now&&w>=now-6).length}
function trThDeed(a){const B=BAL.trong,A=thArch(),g=a.w.th;const vm=trongMul("th",DEED.thGift);const n=trThDeedN(a.n);const rep=Math.max(B.thGiftMin,1-B.thGiftRep*n);
 const cap=A.cap+B.thGiftCap,capF=S.th>cap?Math.max(0,1-(S.th-cap)/B.thGiftSpan):1;const v=Math.round(g*vm*rep*capF);
 const X=[];if(n>=1)X.push("mới làm gần đây: Thái hậu đỡ cảm động");if(capF<1)X.push("Thái hậu đã quý ngươi lắm: khó thêm");
 const w=Object.assign({},a.w);if(v>0)w.th=v;else delete w.th;const o=Object.assign({},a,{w,risk:[a.risk,X.join(" · ")].filter(Boolean).join(" · ")});
 const mark=()=>{S.thDeed=S.thDeed||{};const L=S.thDeed[a.n]=S.thDeed[a.n]||[];L.push(wk());if(L.length>8)L.splice(0,L.length-8)};
 if(a.run){const r0=a.run;o.run=function(){mark();return r0.apply(this,arguments)}}else{const g0=a.go,f0=a.fail;o.go=function(){mark();return g0?g0.apply(this,arguments):undefined};o.fail=function(){mark();return f0?f0.apply(this,arguments):undefined}}
 return o}
(function(){const d0=deal;deal=function(){const r=d0.apply(this,arguments);try{if(S&&!S.thDead&&Array.isArray(deck))deck=deck.map(a=>a&&a.w&&a.w.th>0&&!/^Thỉnh an/.test(a.n)&&!a.__trTh?Object.assign(trThDeed(a),{__trTh:1}):a)}catch(e){console.error(e)}return r}})();
