/* ================= jdis: PER-PERSON DISLIKES ("ghét") (review/pcard-dislikes, owner OD 15/11: "each person has likes and dislikes; a wrong gift may be
   refused or make them angrier") =================
   DATA: every consort (rivals) and the Emperor has 1-2 dislikes, stored in the save (v.dis / S.emp.dis = pool keys), drawn ONCE per life from
   a seeded hash (S.ctxSeed x person x pool key, same seed as jevb tastes) so reloading never changes them. Old saves get them from normAll.
   POOL (what the game already gives as gifts): "art:<k>" = a handmade work of that art (ARTS), "kd:<kind>" = a bought item of that kind (IT[].kd);
   the Emperor also draws from his own likes pools (LIKES flower / music / dish) = "flower:<v>" etc.
   NEVER OVERLAP LIKES: disLikeKeys(p) = the person's own likes in the same key space (Emperor: his 3 LIKES + the arts his traits favour;
   consort: her best art + item kinds whose every item is tagged for her); those keys are removed from the draw. At gift time an item the
   recipient's own tag likes (IT.tg) is never counted as a dislike.
   LEARNT like the other hidden things: spying (j78facts adds a "dis" fact -> Đã biết), talking (chatMark 20), the Emperor's "Hỏi sở thích" /
   "Nói thật lòng" (discover() now reveals a like OR a dislike), and by a wrong gift. Unknown ones stay hidden.
   SHOWN: jpcf "Sở trọng" rows (kitRows, same row as likes). EFFECT: giveTo (player -> consort/Emperor): small thiện cảm / Sủng loss, sometimes refused
   (the item stays in the chest). Numbers: BAL.dis (jbal2.js). Test: dev/test/pcard-dislikes.js */
(function(){
const KDS=["Trang sức","Hương liệu","Vải vóc","Lễ vật"];
const hs=s=>typeof ctxHash==="function"?ctxHash(s):0;
const isEmp=p=>!!S&&(p===S.emp||p==="emp");
/* owner 16/11 (Q25): the Thái hậu has dislikes too (stored on S.thO.dis; pool = arts + item kinds, like a consort) */
const isTh=p=>!!S&&(p==="th"||(!!S.thO&&p===S.thO));
const pid=p=>isEmp(p)?"emp":isTh(p)?"th":String(p&&p.id);
const obj=p=>isEmp(p)?S.emp:isTh(p)?(S.thO=S.thO||{}):p;
function pool(p){const P=[];ARTS.forEach(a=>P.push({k:"art:"+a.k,n:"tác phẩm "+a.n.split(" &")[0]}));KDS.forEach(k=>P.push({k:"kd:"+k,n:k.toLowerCase()}));
 if(isEmp(p))for(const f in LIKES)LIKES[f].forEach(v=>P.push({k:f+":"+v,n:v}));return P}
function entry(k){const P=pool("emp").concat(pool(null));return P.find(x=>x.k===k)||{k,n:k.split(":").slice(1).join(":")}}
function kdAllTag(kd,tag){const L=Object.keys(IT).filter(k=>IT[k].kd===kd);return L.length>0&&L.every(k=>(IT[k].tg||[]).includes(tag))}
/* the person's own likes, in the pool's key space */
function likeKeys(p){const K=[];
 if(isEmp(p)){const E=S.emp;for(const f in LIKES)if(E.likes&&E.likes[f])K.push(f+":"+E.likes[f]);
  if(typeof has==="function"){if(has("trongtai"))["cam","ky","thi","hoa"].forEach(a=>K.push("art:"+a));if(has("chamchinh"))K.push("art:ky");if(has("mesac"))K.push("art:y")}
  KDS.forEach(k=>{if(kdAllTag(k,"emp"))K.push("kd:"+k)})}
 else if(isTh(p)){KDS.forEach(k=>{if(kdAllTag(k,"th"))K.push("kd:"+k)})}
 else if(p&&typeof p==="object"){try{const b=typeof wkBestArt==="function"?wkBestArt(p):null;if(b)K.push("art:"+b)}catch(e){}KDS.forEach(k=>{if(kdAllTag(k,p.queen?"hh":"rv"))K.push("kd:"+k)})}
 return K}
function disInitOne(p){if(!p||!S)return[];const o=obj(p);if(Array.isArray(o.dis))return o.dis;
 const seed=typeof ctxSeed==="function"?ctxSeed():1,id=pid(p),lk=likeKeys(p);
 const P=pool(p).filter(x=>!lk.includes(x.k)).map(x=>({k:x.k,h:hs(seed+"|dis|"+id+"|"+x.k)})).sort((a,b)=>a.h-b.h||(a.k<b.k?-1:1));
 const n=BAL.dis.n[0]+hs(seed+"|disn|"+id)%(BAL.dis.n[1]-BAL.dis.n[0]+1);o.dis=P.slice(0,n).map(x=>x.k);return o.dis}
function disOf(p){return disInitOne(p)}
function disInit(){try{if(!S)return;S.disK=S.disK||{};disInitOne("emp");disInitOne("th");for(const v of rivals)disInitOne(v)}catch(e){console.error("jdis",e)}}
function known(p){S.disK=S.disK||{};return S.disK[pid(p)]||(S.disK[pid(p)]=[])}
function unk(p){const K=known(p);return disOf(p).filter(k=>!K.includes(k))}
function learn(p,k,why){const K=known(p);if(!k)k=unk(p)[0];if(!k||K.includes(k)||!disOf(p).includes(k))return null;K.push(k);const e=entry(k);
 try{if(isEmp(p))log(`<span class="g">Ngươi biết được: Hoàng thượng không ưa ${e.n}.</span>`);else if(isTh(p))log(`<span class="g">Ngươi biết được: Thái hậu không ưa ${e.n}.</span>`);else if(typeof noteAdd==="function")noteAdd(p.id,`${why||"Dò được"}: nàng không ưa ${e.n}`)}catch(x){}return e}
function row(p){if(!p||(!isEmp(p)&&!isTh(p)&&typeof p!=="object"))return null;const K=known(p),N=disOf(p).length;
 const txt=K.map(k=>entry(k).n).join(" · ");const un=N-K.length;
 return [isEmp(p)?"Ngài ghét":isTh(p)?"Người ghét":"Nàng ghét",K.length?txt+(un?` (còn ${un} điều chưa rõ)`:""):"chưa rõ",K.length?"t":"n"]}
/* what a gift (inventory entry) is, as pool keys the recipient might dislike */
function giftKeys(e){const K=[];if(!e)return K;if(e.wk){const w=e.wk;K.push("art:"+w.a);if(w.kind==="bhoa")K.push("flower:"+w.s);if(w.kind==="mon")K.push("dish:"+w.s);if(w.kind==="khuc"&&/^theo /.test(w.s||""))K.push("music:"+String(w.s).slice(4))}
 else if(IT[e.k]&&IT[e.k].kd)K.push("kd:"+IT[e.k].kd);return K}
function hit(r,e){if(!r||!e)return null;const D=disOf(r);if(!D.length)return null;const L=likeKeys(r),G=giftKeys(e);
 if(!e.wk&&IT[e.k]){const tag=isEmp(r)?"emp":isTh(r)?"th":r.queen?"hh":"rv";if((IT[e.k].tg||[]).includes(tag))return null}
 const k=G.find(x=>D.includes(x)&&!L.includes(x));return k||null}
window.disOf=disOf;window.disInit=disInit;window.disKnown=known;window.disUnk=p=>unk(p).length>0;window.disLearn=learn;window.disRow=row;window.disHit=hit;window.disEntry=entry;window.disLikeKeys=likeKeys;
/* old saves + new lives */
(function(){const n0=normAll;normAll=function(){const r=n0.apply(this,arguments);disInit();return r}})();
/* the Emperor's "Hỏi sở thích" / "Nói thật lòng": reveal a like or a dislike */
(function(){const d0=discover;discover=function(){const u=Object.keys(LIKES).filter(k=>!S.emp.known[k]).length,d=unk("emp").length;if(!u&&!d)return false;
 if(u&&(!d||R(u+d)<u))return d0.apply(this,arguments);return !!learn("emp")}})();
/* spying: a "dis" fact joins the intel pool (Đã biết) */
(function(){if(typeof j78facts!=="function")return;const f0=j78facts;j78facts=function(v){const F=f0.apply(this,arguments);try{const k=unk(v)[0];if(k)F.push({k:"dis:"+k,kind:"dis",pri:BAL.dis.spyPri,txt:`${j78Who(v)} không ưa ${entry(k).n}.`,go:()=>{const K=known(v);if(!K.includes(k))K.push(k);return""}})}catch(e){}return F}})();
/* talking */
(function(){const c0=chatMark;chatMark=function(v){const r=c0.apply(this,arguments);try{if(v&&S.chat[v.id]>=1&&unk(v).length&&roll(BAL.dis.talk))learn(v,null,"Chuyện trò")}catch(e){}return r}})();
/* the gift: a wrong gift costs a little, and may be refused (it stays in the chest). Thái hậu (owner 16/11 Q25): same numbers, her own line (BAL.dis.aff / refAff on S.th) */
(function(){const g0=giveTo;giveTo=function(a,r,ix){let k=null;const e=a&&a.inv&&a.inv[ix];
 try{if(a===S&&e&&!e.h&&r&&r!==S&&r!=="maid"&&(r==="emp"||r==="th"||typeof r==="object"))k=hit(r,e)}catch(x){}
 if(!k){const out0=g0.apply(this,arguments);try{if(a===S&&e&&out0&&r&&r!=="emp"&&r!=="th"&&r!=="maid"&&typeof r==="object"&&r!==S){const lk=likeKeys(r),gk=giftKeys(e).find(x=>lk.includes(x));if(gk)likeLearn(r,gk,"Dâng quà hợp ý")}}catch(x){}return out0}
 const emp=r==="emp",th=r==="th",who=emp?"Hoàng thượng":th?"Thái hậu":`${rkName(r)} ${r.name}`,en=entry(k).n,nm=iname(e),pr=emp?"ngài":th?"người":"nàng",key=emp||th?r:r;
 const loss=(n)=>emp?`Sủng -${n}`:th?`Thái hậu -${n}`:`thiện cảm của nàng -${n}`;
 if(roll(BAL.dis.refuse)){learn(key,k,"Bị từ chối quà");if(emp)ap(S,{sung:-BAL.dis.refSung});else if(th)ap(S,{th:-BAL.dis.refAff});else affAdd(r,S,-BAL.dis.refAff);
  return `<span class="r">${who} không nhận ${nm}: ${pr} không ưa ${en}.</span> ${emp?`Sủng -${BAL.dis.refSung}`:th?`Thái hậu -${BAL.dis.refAff}`:`Thiện cảm của nàng -${BAL.dis.refAff}`}. Món quà vẫn còn trong rương. `}
 const out=g0.apply(this,arguments);if(!out)return out;learn(key,k,"Dâng quà sai ý");
 if(emp)ap(S,{sung:-BAL.dis.sung});else if(th)ap(S,{th:-BAL.dis.aff});else affAdd(r,S,-BAL.dis.aff);
 return out+`<span class="r">Nhưng ${pr} không ưa ${en}: ${loss(emp?BAL.dis.sung:BAL.dis.aff)}.</span> `}})();
/* owner 16/11 (Q25): consorts' KNOWN LIKES ("Nàng thích"), shown next to "Nàng ghét". The likes are likeKeys(p) (best art, item kinds tagged for her);
   she learns one by talking (same roll as the dislikes, BAL.dis.talk), by spying (an "lk" intel fact) or when a gift that suits her is accepted. S.likK[id] = known keys. */
function likeKnown(p){S.likK=S.likK||{};return S.likK[pid(p)]||(S.likK[pid(p)]=[])}
function likeUnk(p){const K=likeKnown(p);return likeKeys(p).filter(k=>!K.includes(k))}
function likeLearn(p,k,why){const K=likeKnown(p);if(!k)k=likeUnk(p)[0];if(!k||K.includes(k)||!likeKeys(p).includes(k))return null;K.push(k);const e=entry(k);
 try{if(typeof noteAdd==="function"&&p&&p.id!=null)noteAdd(p.id,`${why||"Dò được"}: nàng thích ${e.n}`)}catch(x){}return e}
function likeRow(p){if(!p||typeof p!=="object"||isEmp(p)||isTh(p)||p===S)return null;const L=likeKeys(p);if(!L.length)return null;const K=likeKnown(p).filter(k=>L.includes(k));
 return ["Nàng thích",K.length?K.map(k=>entry(k).n).join(" · ")+(L.length>K.length?` (còn ${L.length-K.length} điều chưa rõ)`:""):"chưa rõ",K.length?"t":"n"]}
window.disLikeRow=likeRow;window.disLikeLearn=likeLearn;window.disLikeKnown=likeKnown;
(function(){const c0=chatMark;chatMark=function(v){const r=c0.apply(this,arguments);try{if(v&&v!==S&&S.chat[v.id]>=1&&likeUnk(v).length&&roll(BAL.dis.talk))likeLearn(v,null,"Chuyện trò")}catch(e){}return r}})();
(function(){if(typeof j78facts!=="function")return;const f0=j78facts;j78facts=function(v){const F=f0.apply(this,arguments);try{const k=likeUnk(v)[0];if(k)F.push({k:"lk:"+k,kind:"lk",pri:BAL.dis.spyPri,txt:`${j78Who(v)} thích ${entry(k).n}.`,go:()=>{const K=likeKnown(v);if(!K.includes(k))K.push(k);return""}})}catch(e){}return F}})();
/* the gift dialog tells her only what she already knows */
(function(){if(typeof giftEval!=="function")return;const g0=giftEval;giftEval=function(e,t){const r=g0.apply(this,arguments);try{if(r&&r.ok&&t&&t!=="maid"&&e&&!e.h){const who=t==="emp"?"emp":t,k=hit(who,e);
  if(k&&known(who).includes(k))r.x=(r.x||"")+` · kèm: ${t==="emp"?"ngài":t==="th"?"người":"nàng"} không ưa ${entry(k).n}, ${t==="emp"?`Sủng -${BAL.dis.sung}`:t==="th"?`Thái hậu -${BAL.dis.aff}`:`thiện cảm của nàng -${BAL.dis.aff}`}; có thể không nhận: ${chanceW(BAL.dis.refuse)}`}}catch(x){}return r}})();
})();
