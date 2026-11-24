/* ================= jmind — ONE "mind" for EVERY person (review/npc-mind, owner OD:L571, L599, L1247-1249) =================
   Owner: every person has a personality (nết), a trọng (virtue), a strength (sở trường), a liking (sở thích) and a dislike (sở ghét);
   "whatever she has, they have; whatever they have, she has". Builds ON what exists (LUẬT ƯU TIÊN SỐ 1), replaces nothing:
     nết    traitsOf (j28 PERS / jtrong pTr / Thái hậu archetype). Gaps filled here: palace officials S.court (Tổng quản, Kính sự phòng,
            Nội vụ phủ, Thái y), children, named elder staff without a trait -> a nết drawn once per life (stored as .mnet, PERS keys
            so the PERS weights and jemo emotions work for them too).
    trọng   jtrong trongOf (already everyone).
    sở trường mindStr(p): consorts and herself = their best art (live from .arts, so it moves when they train); others from their
            nết / post / title (Thái y -> Y thuật, Thị vệ -> Võ nghệ, lanh -> Dò la ...), else seeded. Used by game rules: the NPC choice
            weights (mindW, below) favour acts that use the strength; a strength in Dò la / Mưu tính / Giao thiệp shifts NPC odds a little.
    sở thích  Emperor: his LIKES (j1, unchanged). Everyone else: 1 key in the jdis pool space (art:<k> handmade work, kd:<kind> bought item),
            a consort's own best art first (jdis likeKeys), never one of their dislikes. A liked gift: +BAL.mind.like regard on top.
    sở ghét   jdis disOf for the Emperor and consorts (unchanged). Everyone else (herself, Thái hậu, servants, officials, men, children)
            gets 1-2 here, stored as .dis on the person (jdis then treats a wrong gift to them the same way), Thái hậu in S.thO.dis.
   Gifts TO HER (NPC -> S, "giftin"): a gift she likes lifts her mood (vui), one she dislikes sours it (buồn) — the same rule as for them.
   LEARNT (stranger rule): strength once the person is known (kitIsKnown: it is their reputation); likes/dislikes of others by talk
   (chatMark), spying (j78facts "like" fact), a gift (right or wrong); her own household (her maids/eunuchs, her children) she knows.
   SHOWN (no new UI part): jpcf "Sở trọng" kitRows ("Sở trường", "Thích", "Ghét"), her own card / child card lines -> kitPcGrid chips.
   NPC CHOICES (owner OD:L1248 "never always choose the best option"): mindW(p,tag) = the weight multiplier that every NPC choice site
   uses on top of PERS persW: strength, current abilities (tài, đức, danh, sức, tâm cơ), trọng, and mindPick() = a weighted pick with a
   human slip (BAL.mind.slip % of the time an NPC takes a lesser option). Sites listed in dev/handover/reports/npc-mind.md.
   Numbers: BAL.mind. Test: dev/test/npcmind-check.js ================= */
/* numbers: BAL.mind (jbal2.js, the rulebook file; r1 fault 3 ONE CORE) */
(function(){
const H=s=>typeof ctxHash==="function"?ctxHash(s):(typeof trHash==="function"?trHash(s):0);
const life=()=>{try{return typeof trLifeSeed==="function"?trLifeSeed():String(typeof ctxSeed==="function"?ctxSeed():1)}catch(e){return"1"}};
const isEmp=p=>!!S&&(p===S.emp||p==="emp");
const isTh=p=>!!S&&(p==="th"||p===S.thO||(p&&p.kind==="th"));
const isKid=p=>p&&typeof p==="object"&&p.tal!==undefined&&p.fond!==undefined;
const isRiv=p=>typeof rivals!=="undefined"&&rivals.includes(p);
function courtKey(p){try{if(S&&S.court)for(const k in S.court)if(S.court[k]===p)return k}catch(e){}return null}
/* one stable key per person (co-op: players by name, like jtrong) */
function mKey(p){if(!p||!S)return"";if(p===S||p.coop||p.id===901||p.id===902)return"me:"+(p.name||"");if(isEmp(p))return"emp";if(isTh(p))return"th";
 const c=courtKey(p);if(c)return"court:"+c;if(isKid(p))return"kid:"+(p.name||"");if(p.sid!=null)return"s:"+p.sid;if(p.id!=null)return"id:"+p.id;return"n:"+(p.name||"")}
function obj(p){if(isTh(p)){S.thO=S.thO||{};return S.thO}if(isEmp(p))return S.emp;return p}
/* ---------- nết for the people who had none ---------- */
const NET_POOL={court:["Thực dụng","Ham lợi","Thật thà","Kín đáo","Rộng lượng","Trọng nghĩa","Thù dai"],kid:["Vì gia tộc","Thật thà","Khiêm nhường","Thực dụng","Ân cần","Kiêu ngạo","Kín đáo","Trọng nghĩa"],
 staff:["Thật thà","Thực dụng","Kín đáo","Trọng nghĩa","Vì gia tộc","Ham lợi","Kiêu ngạo"]};
function netCls(p){if(!p||typeof p!=="object"||p===S)return null;if(courtKey(p))return"court";if(isKid(p))return"kid";if(p.eid&&!p.tr)return"staff";return null}
function mnet(p){const c=netCls(p);if(!c)return null;if(p.mnet&&PERS[p.mnet])return p.mnet;const L=NET_POOL[c];p.mnet=L[H(life()+"|net|"+mKey(p))%L.length];return p.mnet}
(function(){const t0=traitsOf;traitsOf=function(p){const r=t0.apply(this,arguments);try{if((!r||!r.length)&&p&&typeof p==="object"){const n=mnet(p);if(n)return[n]}}catch(e){}return r}})();
/* ---------- sở trường ---------- */
const SK={muu:"Mưu tính",giao:"Giao thiệp",do:"Dò la",vo:"Võ nghệ",chinh:"Chính sự",le:"Lễ nghi",quan:"Quán xuyến",so:"Sổ sách",buon:"Buôn bán",hau:"Hầu hạ",kinh:"Kinh kệ",tay:"Khéo tay"};
function artN(k){const a=(typeof ARTS!=="undefined"?ARTS:[]).find(x=>x.k===k);return a?a.n.split(" &")[0]:k}
const STR_TR={lanh:"sk:do",chuyen:"sk:giao",trung:"sk:hau",tham:"sk:buon",nhat:"sk:tay","Kín đáo":"sk:do","Thực dụng":"sk:giao","Tham vọng":"sk:muu","Xảo quyệt":"sk:muu","Ham lợi":"sk:buon",
 "Thật thà":"sk:le","Vì gia tộc":"sk:le","Trọng nghĩa":"sk:quan","Rộng lượng":"sk:hau","Nhiều chuyện":"sk:giao","Mê tín":"sk:kinh","Thù dai":"sk:muu","Khiêm nhường":"sk:tay",
 trongtai:"art:thi",chamchinh:"sk:chinh",lanh2:"sk:do",danghi:"sk:do",nongnay:"sk:vo",datinh:"art:cam"};
const STR_TH={tuai:"art:y",nghiem:"sk:le",danghi:"sk:do",quyen:"sk:chinh",phat:"sk:kinh"};
const STR_COURT={tq:"sk:quan",ksp:"sk:so",ped:"sk:buon",ty:"art:y"};
const STR_TITLE=[[/^Thị vệ|tướng|Cấm quân/i,"sk:vo"],[/^Thái y|Ngự y/i,"art:y"],[/^Vương gia|Thân vương|Thượng thư|Học sĩ/i,"sk:chinh"],[/Họa sư/i,"art:hoa"],[/Nhạc|Cầm sư/i,"art:cam"]];
const SEED_STR=["sk:muu","sk:giao","sk:do","sk:le","sk:quan","sk:tay","art:cam","art:ky","art:thi","art:hoa","art:vu","art:y"];
function bestArtOf(p){const A=p&&p.arts;if(!A||typeof A!=="object")return null;let b=null,bv=0;
 for(const a of (typeof ARTS!=="undefined"?ARTS:[])){const v=+A[a.k]||0;if(v>bv||(v===bv&&v>0&&b&&H(mKey(p)+a.k)<H(mKey(p)+b))){b=a.k;bv=v}}return bv>=1?"art:"+b:null}
function mindStr(p0){const p=obj(p0);if(!p||!S)return null;
 if(isTh(p0)){const A=typeof thArch==="function"?thArch():null;const k=A&&S.thO&&S.thO.arch;return STR_TH[k]||"sk:le"}
 const ba=bestArtOf(p);if(ba&&(p===S||isRiv(p)))return ba;
 const c=courtKey(p);if(c&&STR_COURT[c])return STR_COURT[c];
 if(p.eid)return/gt|tn/.test(p.eid)?"sk:le":"sk:quan";
 const nm=String(p.name||"");for(const [re,k] of STR_TITLE)if(re.test(nm))return k;
 if(isKid(p))return (p.tal||0)>=BAL.mind.kidTal?["art:thi","art:ky","art:cam","art:hoa"][H(life()+"|kstr|"+mKey(p))%4]:p.sex==="m"?"sk:vo":"sk:tay";
 const T=traitsOf(isEmp(p)?S.emp:p)||[];for(const t of T)if(STR_TR[t])return STR_TR[t];
 if(ba)return ba;return SEED_STR[H(life()+"|str|"+mKey(p))%SEED_STR.length]}
function strName(k){if(!k)return"";const [a,b]=k.split(":");return a==="art"?artN(b):SK[b]||b}
/* ---------- sở thích / sở ghét (jdis key space) ---------- */
const KDS=["Trang sức","Hương liệu","Vải vóc","Lễ vật"];
function pool(){const P=[];(typeof ARTS!=="undefined"?ARTS:[]).forEach(a=>P.push("art:"+a.k));KDS.forEach(k=>P.push("kd:"+k));return P}
function keyName(k){try{if(typeof disEntry==="function")return disEntry(k).n}catch(e){}return String(k||"").split(":").slice(1).join(":")}
/* ONE likes / dislikes system (r1 fault 4): jdis owns the Emperor, the consorts and Thái hậu (owner Q25) — their dislikes, the consorts' likes,
   what she knows of them (S.disK / S.likK), the learning and the gift penalty. jmind only adds what jdis has not: everyone else, Thái hậu's like,
   and the liked-gift bonus. */
const jdisOwn=p=>isEmp(p)||isRiv(p)||isTh(p);
const jdisLikes=p=>isRiv(p)&&typeof disLikeKeys==="function"&&typeof disLikeKnown==="function";
function mindDis(p0){const p=obj(p0);if(!p||!S)return[];if(jdisOwn(p0)&&typeof disOf==="function")return disOf(isEmp(p0)?"emp":isTh(p0)?"th":p0);
 if(Array.isArray(p.dis))return p.dis;const B=BAL.mind,id=mKey(p0),lk=[mindLikeRaw(p0)];
 const P=pool().filter(k=>!lk.includes(k)).map(k=>({k,h:H(life()+"|mdis|"+id+"|"+k)})).sort((a,b)=>a.h-b.h||(a.k<b.k?-1:1));
 const n=B.disN[0]+H(life()+"|mdisn|"+id)%(B.disN[1]-B.disN[0]+1);p.dis=P.slice(0,n).map(x=>x.k);return p.dis}
function mindLikeRaw(p0){const p=obj(p0);if(!p)return null;if(p.mlike)return p.mlike;
 let k=null;try{if(isRiv(p0)&&typeof disLikeKeys==="function"){const L=disLikeKeys(p0);if(L.length)k=L[0]}}catch(e){}
 if(!k){const D=Array.isArray(p.dis)?p.dis:[];const ba=bestArtOf(p);const P=pool().filter(x=>!D.includes(x));
  const st=mindStr(p0);k=ba&&!D.includes(ba)?ba:(st&&st.startsWith("art:")&&!D.includes(st)&&H(life()+"|lks|"+mKey(p0))%2?st:P[H(life()+"|mlike|"+mKey(p0))%P.length])}
 p.mlike=k;return k}
function mindLike(p0){if(isEmp(p0)){const E=S.emp;return Object.keys(LIKES).map(f=>E.likes&&E.likes[f]?f+":"+E.likes[f]:null).filter(Boolean)}if(jdisLikes(p0)||(isTh(p0)&&typeof disLikeKeys==="function")){const L=disLikeKeys(isTh(p0)?"th":p0);if(L.length)return L}/* jdis's likes when it has them (one list) */const k=mindLikeRaw(p0);return k?[k]:[]}
/* ---------- knowing ---------- */
function own(p){return !!S&&p&&typeof p==="object"&&((S.staff||[]).includes(p)||p===S.maid||(S.kids||[]).includes(p))}
function mK(p){S.mindK=S.mindK||{};const k=mKey(p);return S.mindK[k]||(S.mindK[k]={l:0,d:[]})}
function likeKnown(p){if(p===S||own(p))return true;if(isEmp(p)){const K=S.emp.known||{};return Object.keys(LIKES).some(f=>K[f])}if(jdisLikes(p)&&disLikeKeys(p).length)return disLikeKnown(p).length>0;return !!mK(p).l}
function disKnownL(p){if(p===S||own(p))return mindDis(p);if(jdisOwn(p)&&typeof disKnown==="function")return disKnown(isEmp(p)?"emp":isTh(p)?"th":p);return mK(p).d}
function learnLike(p,why){if(likeKnown(p)||isEmp(p))return false;if(jdisLikes(p)&&disLikeKeys(p).length)return !!disLikeLearn(p,null,why);mK(p).l=1;const nm=pName(p);const t=`${why||"Dò được"}: ${nm} thích ${keyName(mindLikeRaw(p))}`;
 try{if(p&&p.id!=null&&isRiv(p)&&typeof noteAdd==="function")noteAdd(p.id,t);else{log(`<span class="past">${t}.</span>`);kitKnow({key:"like:"+(p&&p.id!=null?p.id:nm),text:`${t}.`})}}catch(e){}return true}
function learnDis(p,k,why){if(jdisOwn(p)&&typeof disLearn==="function")return disLearn(isEmp(p)?"emp":isTh(p)?"th":p,k,why);const D=mindDis(p),K=mK(p).d;k=k||D.find(x=>!K.includes(x));
 if(!k||K.includes(k)||!D.includes(k))return null;K.push(k);try{log(`<span class="past">${why||"Dò được"}: ${pName(p)} không ưa ${keyName(k)}.</span>`);kitKnow({key:"dis:"+(p&&p.id!=null?p.id:pName(p))+":"+k,text:`${why||"Dò được"}: ${pName(p)} không ưa ${keyName(k)}.`})}catch(e){}return k}
function pName(p){if(p===S)return"ngươi";if(isEmp(p))return"Hoàng thượng";if(isTh(p))return"Thái hậu";const o=obj(p);return o&&o.queen?"Hoàng hậu":String(o&&o.name||"")}
/* ---------- the record ---------- */
function mindOf(p0){const p=obj(p0);if(!p)return null;let net=[];try{net=traitsOf(isTh(p0)?"th":isEmp(p0)?S.emp:p0)||[]}catch(e){}
 return{net,trong:typeof trongOf==="function"?trongOf(isTh(p0)?"th":p0):[],str:mindStr(p0),like:mindLike(p0),dis:mindDis(p0)}}
function mindInit(){try{if(!S)return;const L=[S,"th"].concat(typeof rivals!=="undefined"?rivals:[]);if(S.court)for(const k in S.court)L.push(S.court[k]);
  (S.men||[]).forEach(m=>L.push(m));try{allServ().forEach(s=>L.push(s))}catch(e){}if(S.maid)L.push(S.maid);try{allKids().forEach(([k])=>L.push(k))}catch(e){}
  for(const p of L)if(p){mindDis(p);mindLikeRaw(p);mnet(typeof p==="object"?p:null)}}catch(e){console.error("jmind",e)}}
/* rows for jpcf "Sở trọng" and the card lines (stranger rule) */
function mindRows(p){const rows=[];if(!p||!S)return rows;const known=typeof kitIsKnown!=="function"||kitIsKnown(isTh(p)?S.thO:p);
 const st=mindStr(p);rows.push(["Sở trường",known&&st?strName(st):"chưa rõ",known&&st?"t":"n"]);
 if(!isEmp(p)&&!(jdisLikes(p)&&disLikeKeys(p).length)){const lk=likeKnown(p);rows.push(["Thích",lk?mindLike(p).map(keyName).join(" · "):"chưa rõ",lk?"t":"n"])}
 if(!jdisOwn(p)){const K=disKnownL(p),N=mindDis(p).length,un=N-K.length;rows.push(["Ghét",K.length?K.map(keyName).join(" · ")+(un?` (còn ${un} điều chưa rõ)`:""):"chưa rõ",K.length?"t":"n"])}
 return rows}
Object.assign(window,{mindOf,mindStr,mindLike,mindDis,mindRows,mindInit,mindKey:mKey,mindStrName:strName,mindKeyName:keyName,mindLearnLike:learnLike,mindLearnDis:learnDis});
(function(){const n0=normAll;normAll=function(){const r=n0.apply(this,arguments);mindInit();return r}})();
/* ---------- display ---------- */
/* person cards. Filled cards (jpcf): the rows go into its "Sở trọng" block (kitRows, the block's own kit part; the block is added when jpcf
   had nothing to say there). Cards jpcf does not fill (her own, a child, a servant without a filled card): ordinary card lines -> kitPcGrid chips. */
window.mindWho=mindWho;function mindWho(o){if(o.name===S.name||o.me)return S;if(o.rank==="Thái hậu")return"th";if(o.rank==="Hoàng thượng")return S.emp;if(S.maid&&o.name===S.maid.name)return S.maid;
 let who=typeof kitPersonByName==="function"?kitPersonByName(o.name):null;if(who)return who;const nm=String(o.name||"").replace(/<[^>]*>/g,"").trim();if(!nm)return null;
 try{return allKids().map(x=>x[0]).find(k=>k.name===nm)||(S.court?Object.values(S.court).find(c=>c.name&&(c.name===nm||nm.endsWith(c.name))):null)||(S.men||[]).find(m=>m.name===nm)||allServ().find(s=>s.name===nm)||null}catch(e){return null}}
(function(){if(typeof pcard!=="function")return;const p0=pcard;pcard=function(o){let who=null;try{if(o&&S&&!o.__mind&&!S.dead)who=mindWho(o)}catch(e){}
 if(!who)return p0.apply(this,arguments);
 try{const rows=mindRows(who);const h0=p0.call(this,Object.assign({},o,{__mind:1}));
  if(who!==S&&!isKid(who)&&/<div class="pcf">/.test(h0)){const kr=kitRows(rows);
   return h0.replace('<div class="pcf">',`<div class="pcf"><div class="kpsec kpno">${kr}</div>`)}/* owner 21/11: one label column, no block heading */
  const L=(o.lines||[]).slice();for(const [k,v,c] of rows)if(c==="t"&&!L.some(x=>new RegExp("^"+k).test(String(x))))L.push(`${k}: <b>${v}</b>`);
  if(isKid(who)&&!L.some(x=>/Tính nết/.test(x))){const n=traitsOf(who)[0];if(n)L.push(`Tính nết: <b>${n}</b>`)}
  return p0.call(this,Object.assign({},o,{__mind:1,lines:L}))}catch(e){console.error("jmind card",e);return p0.apply(this,arguments)}}})();
/* ---------- rules ---------- */
/* regard change: Thái hậu S.th, a servant's loyalty (Lòng), others thiện cảm (affAdd) */
const loyW=who=>!!who&&typeof who==="object"&&who.loyal!=null&&!isRiv(who);/* servants and her own maid: Lòng */
function bump(who,n){if(who==="th")ap(S,{th:n});else if(loyW(who))who.loyal=Math.max(0,Math.min(100,who.loyal+n));else if(typeof affAdd==="function"&&typeof who==="object")affAdd(who,S,n)}
function giftKeys(e){const K=[];if(!e)return K;if(e.wk){K.push("art:"+e.wk.a)}else if(IT[e.k]&&IT[e.k].kd)K.push("kd:"+IT[e.k].kd);return K}
/* the word of the regard that moves (Thái hậu's is "Thái hậu", a servant's "Lòng", others "thiện cảm") */
function regW(who){return who==="th"?"Thái hậu":loyW(who)?"Thiện cảm":"thiện cảm"}
/* a liked gift: a little more regard (everyone but the Emperor, whose likes already work through j2/j83) */
(function(){const g0=giveTo;giveTo=function(a,r,ix){const e=a&&a.inv&&a.inv[ix];let lk=false,dk=null,G0=[];const who=r==="th"?"th":r==="maid"?S.maid:r;
 try{if(e&&!e.h&&who&&who!=="emp"&&r!==S&&a===S){const G=G0=giftKeys(e);lk=G.some(k=>mindLike(who).includes(k))&&!(jdisOwn(who)&&typeof disHit==="function"&&disHit(who,e));
   if(!jdisOwn(who))dk=G.find(k=>mindDis(who).includes(k)&&!mindLike(who).includes(k))||null}}catch(x){}
 /* gifts TO HER from an NPC: her own likes / dislikes move her mood */
 let her=null;try{if(r===S&&e&&!e.h&&a!==S){const G=giftKeys(e);her=G.some(k=>mindLike(S).includes(k))?"vui":G.some(k=>mindDis(S).includes(k))?"buon":null}}catch(x){}
 const out=g0.apply(this,arguments);if(!out)return out;let add="";
 try{const B=BAL.mind;if(lk){learnLike(who,"Tặng đúng ý");bump(who,B.like);
   add+=`<span class="g">${pName(who)} vốn thích ${keyName(G0.find(k=>mindLike(who).includes(k))||mindLikeRaw(who))}: ${regW(who)} +${B.like}.</span> `}
  if(dk){const n=BAL.dis.aff;learnDis(who,dk,"Dâng quà sai ý");bump(who,-n);/* the same penalty number as jdis (BAL.dis.aff), one per effect */
   add+=`<span class="r">Nhưng ${pName(who)} không ưa ${keyName(dk)}: ${regW(who)} -${n}.</span> `}
  if(her&&typeof emoSet==="function")emoSet(S,her,B.herMood,her==="vui"?`Được tặng đúng món mình thích`:`Được tặng món mình không ưa`)}catch(x){}
 return out+add}})();
/* talking: a chance to learn a like (consorts; jdis already learns dislikes the same way) */
(function(){const c0=chatMark;chatMark=function(v){const r=c0.apply(this,arguments);try{if(v&&!(jdisLikes(v)&&disLikeKeys(v).length)&&!likeKnown(v)&&roll(BAL.mind.learnTalk))learnLike(v,"Chuyện trò")}catch(e){}return r}})();
/* spying: a "like" fact joins the intel pool */
(function(){if(typeof j78facts!=="function")return;const f0=j78facts;j78facts=function(v){const F=f0.apply(this,arguments);
 try{if(v&&!(jdisLikes(v)&&disLikeKeys(v).length)&&!likeKnown(v)){const k=mindLikeRaw(v);if(k)F.push({k:"like:"+k,kind:"like",pri:BAL.mind.spyPri,txt:`${typeof j78Who==="function"?j78Who(v):pName(v)} thích ${keyName(k)}.`,go:()=>learnLike(v,"Tai mắt báo")})}}catch(e){}return F}})();
/* ---------- NPC choices: weights by THAT person's abilities, strength, trọng; a weighted pick with human slips ---------- */
/* act tag -> what it draws on: ability fields, strength keys, virtues it honours (+) or offends (-) */
const TAG={scheme:{ab:["tamco"],str:["sk:muu"],tr:{"Nhân":-1,"Tín":-1}},spy:{ab:["tamco"],str:["sk:do"],tr:{"Tín":-1}},social:{ab:["danh"],str:["sk:giao"],tr:{"Lễ":1}},
 help:{ab:["duc"],str:["sk:giao"],tr:{"Nhân":1,"Nghĩa":1}},harm:{ab:["tamco","suc"],str:["sk:muu","sk:vo"],tr:{"Nhân":-1,"Lễ":-1}},court:{ab:["danh","tai"],str:["sk:chinh","sk:le"],tr:{"Trung":1}},
 art:{ab:["tai","sac"],str:["art:cam","art:ky","art:thi","art:hoa","art:vu","art:y"],tr:{"Cần":1}},greet:{ab:["duc"],str:["sk:le"],tr:{"Hiếu":1,"Lễ":1}},bribe:{ab:["bac"],str:["sk:buon"],tr:{"Liêm":-1}},
 frame:{ab:["tamco","danh"],str:["sk:muu"],tr:{"Tín":-1,"Nhân":-1}},punish:{ab:["danh"],str:["sk:chinh"],tr:{"Nhân":-1}},reward:{ab:["duc"],str:[],tr:{"Nhân":1}},
 work:{ab:["suc"],str:["sk:hau","sk:quan","sk:tay"],tr:{"Cần":1}},flee:{ab:[],str:[],tr:{"Trung":-1,"Nghĩa":-1}},confess:{ab:[],str:[],tr:{"Tín":1}}};
function abv(p,f){try{const o=obj(p);if(f==="bac")return Math.min(100,(o.bac||0)/BAL.mind.bacPer);return +o[f]||0}catch(e){return 0}}
function mindW(p,tag){const T=TAG[tag];if(!T||!p)return 1;const B=BAL.mind;let w=1;try{
 if(T.ab.length){const a=T.ab.reduce((s,f)=>s+abv(p,f),0)/T.ab.length;w*=1+(a-B.abMid)*B.abW}/* ability B.abMid = neutral */
 const st=mindStr(p);if(st&&T.str.includes(st))w*=B.strW;
 if(typeof trongOf==="function")for(const v of trongOf(isTh(p)?"th":p)){const t=T.tr[v]||0;if(t>0)w*=1+B.trW;else if(t<0)w*=1-B.trW}}catch(e){}return Math.max(B.wMin,w)}
/* odds shift (in %) an NPC gets on an act that uses their strength */
function mindOdds(p,tag){const T=TAG[tag];if(!T)return 0;const st=mindStr(p);return st&&T.str.includes(st)?BAL.mind.odds:0}
/* the weighted pick: options [[x,w],...]; slip % of the time the NPC misjudges (takes a random option of the rest, weight-blind) */
function mindPick(O,p){O=(O||[]).filter(o=>o&&o[1]>0);if(!O.length)return null;if(O.length>1&&roll(BAL.mind.slip)){/* NPC-PURPOSE G3: a slip is a misjudgement among HER OWN near-best options, never a random act */const o=npwPick(O,x=>x[1]);if(o)return o[0]}
 const t=BAL.mind.temp;const W=O.map(o=>Math.pow(o[1],t));const s=W.reduce((a,b)=>a+b,0);let r=Math.random()*s;for(let i=0;i<O.length;i++){r-=W[i];if(r<=0)return O[i][0]}return O[O.length-1][0]}
/* a target pick by affinity/oán: score(t) = base + hostility... (sites pass their own score); never argmax */
function mindPickBy(L,score,p){return mindPick((L||[]).map(x=>[x,Math.max(BAL.mind.pickMin,score(x))]),p)}
Object.assign(window,{mindW,mindOdds,mindPick,mindPickBy,MIND_TAG:TAG});
/* SOC deed -> tag (j28 npcSocial weights) */
const MIND_SOC={help:"help",visit:"help",mediate:"help",apologise:"help",warn:"social",ally:"social",follow:"social",serveTH:"greet",provoke:"harm",humiliate:"harm",
 flaunt:"harm",steal:"harm",drop:"flee",trip:"harm",spy:"spy",gossip:"scheme",rumor:"scheme",feign:"scheme",bribe:"bribe",bribeksp:"bribe",gift:"social",check:"spy",pray:"greet"};
window.MIND_SOC=MIND_SOC;
/* j40 harm menu: the band's acts, weighted by traits + odds (j40), now also by THIS consort's strength, abilities and trọng; a slip = she misjudges */
const MENU_TAG={accuse:"frame",vp:"frame",kframe:"frame",frame:"frame",plant:"frame",musk:"harm",catswap:"harm",kpoison:"harm",poison:"harm",pond:"harm",ksab:"harm",takeaway:"harm",
 pushp:"harm",trip:"harm",rumor:"scheme",spy:"spy",bribe:"bribe",block:"scheme"};window.MIND_MENU=MENU_TAG;/* 2f3: read by mindSeen (outside this scope) */
if(typeof mindMenu==="function"){const m0=mindMenu;mindMenu=function(v,t){const O=m0.apply(this,arguments);try{if(!O||!O.length)return O;
  const W=O.map(([k,w])=>[k,w*mindW(v,MENU_TAG[k]||"scheme")]);
  if(W.length>1&&roll(BAL.mind.slip)){/* G3: she misjudges between her near-best acts only: those within BAL.ag.why.near of the best weigh the same; the whole list is kept so callers' filters (j70 band, j40 rash) still find an act */
   const b=Math.max(...W.map(x=>x[1]));if(b>0)return W.map(([k,w])=>[k,w>=b*BAL.ag.why.near?b:w])}return W}catch(e){return O}}}
/* a stray man seen in the hậu cung: was a fixed rule per trait (no dice); now each answer is weighted, the old answer stays the most likely */
if(typeof menDecide==="function"){const d0=menDecide;menDecide=function(w,c){const d=d0.apply(this,arguments);try{const h=c?hostility(w,c):0;const T=traitsOf(w);
  const M=BAL.mind.men;
  const O=[["report",(M.report[0]+h/M.report[1])*mindW(w,"court")],["hide",(T.includes("Tham vọng")?M.hide[0]:M.hide[1])*mindW(w,"bribe")],["listen",(T.includes("Kín đáo")?M.listen[0]:M.listen[1])*mindW(w,"spy")],["ignore",(T.includes("Ân cần")||T.includes("Khiêm nhường")?M.ignore[0]:M.ignore[1])*Math.max(M.ignore[2],1-h/M.ignore[3])*mindW(w,"help")]];
  O.forEach(o=>{if(o[0]===d)o[1]+=M.keep});return mindPick(O,w)||d}catch(e){return d}}}

})();
/* ================= AG-ALL-2f3 — WHAT A SERVANT HAS SEEN HER MASTER DO, per chữ trọng (owner OD 17/11 ~17:20Z: "một người trung thành vẫn có thể bán
   chủ khi mà chủ của họ làm một cái điều không đúng với cái chữ trọng của họ") — the same virtue tags as everything else (MIND_TAG tr above, jtrong DEED):
   mindSeen(master, tag | null, tags) → every servant of that master who holds a virtue the deed touches records it (+1 honoured / −1 offended, capped
   BAL.mind.seen.cap, fading ×BAL.mind.seen.fade per tuần; reset when the servant changes master). mindMoodSet(s, master, "gian" | "thuong") = today's
   mood toward the master (this tuần only; an angry emotion (jemo) counts as "gian" too). mindTr(s, master) → {off:[[virtue,n]], hon:[[virtue,n]]} and
   mindMood(s, master) are read by the ONE betray / sell / recruit odds core (jagknow btTerms). Same for her and for every NPC master (two-way).
   Deeds recorded: acts (runAct key → MENU_TAG / MIND_SOC tag; any other dirty act = scheme), NPC social deeds (SOC, jtrong DEED tags), Thưởng / Phạt
   own servant (servDo: reward / punish + mood), bribing someone (bribeServ: bribe). ================= */
function mindSeenRec(s,m){const k=key(m);if(!s.trM||s.trM.k!==k)s.trM={k,o:{},w:wk()};const R=s.trM;const n=wk()-(R.w||0);
 if(n>0){const f=Math.pow(BAL.mind.seen.fade,n);for(const v in R.o){R.o[v]=+(R.o[v]*f).toFixed(3);if(Math.abs(R.o[v])<.1)delete R.o[v]}R.w=wk()}return R}
function mindSeen(m,tag,tags){try{if(!m||(typeof isSrv==="function"&&isSrv()&&m===S))return;const MT=window.MIND_TAG||{};const T=tags||(tag&&MT[tag]&&MT[tag].tr);if(!T)return;const C=BAL.mind.seen.cap;
 for(const s of (m.staff||[])){if(!s||s.out||s.sid==null)continue;let R=null;for(const v of trongOf(s)){const t=T[v]||0;if(!t)continue;R=R||mindSeenRec(s,m);R.o[v]=cl((R.o[v]||0)+t,-C,C)}}}catch(e){}}
function mindTr(s,m){const o={off:[],hon:[]};try{if(!s||!m||!s.trM||s.trM.k!==key(m))return o;const R=mindSeenRec(s,m);for(const v in R.o){const n=R.o[v];if(n<0)o.off.push([v,-n]);else if(n>0)o.hon.push([v,n])}}catch(e){}return o}
function mindMoodSet(s,m,k){if(s&&m)s.mdM={k:key(m),w:wk(),v:k}}
function mindMood(s,m){try{if(!s||!m)return"";const M=s.mdM;if(M&&M.k===key(m)&&M.w===wk())return M.v;if(s.emo&&typeof emoGet==="function"&&emoGet(s).k==="gian")return"gian"}catch(e){}return""}
(function(){
 if(typeof runAct==="function"){const r0=runAct;runAct=function(a,t,k){const r=r0.apply(this,arguments);try{const g=(window.MIND_MENU||{})[k]||(window.MIND_SOC||{})[k]||(typeof DIRTY!=="undefined"&&DIRTY.includes(k)?"scheme":null);if(g)mindSeen(a,g)}catch(e){}return r}}
 if(typeof SOC==="object"&&typeof DEED==="object")for(const k in SOC){const tg=DEED[k];if(!tg||!SOC[k]||typeof SOC[k].run!=="function")continue;const r0=SOC[k].run;SOC[k].run=function(v){const r=r0.apply(this,arguments);try{mindSeen(v,null,tg)}catch(e){}return r}}
 if(typeof servDo==="function"){const d0=servDo;servDo=function(m,a,s){const had=m&&s&&(m.staff||[]).includes(s);const r=d0.apply(this,arguments);try{if(r&&had&&(a==="thuong"||a==="phat")){mindMoodSet(s,m,a==="thuong"?"thuong":"gian");mindSeen(m,a==="thuong"?"reward":"punish")}}catch(e){}return r}}
 if(typeof bribeServ==="function"){const b0=bribeServ;bribeServ=function(a,s){const r=b0.apply(this,arguments);try{if(r)mindSeen(a,"bribe")}catch(e){}return r}}
})();
Object.assign(window,{mindSeen,mindTr,mindMood,mindMoodSet});
