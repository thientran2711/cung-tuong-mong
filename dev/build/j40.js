
/* ================= NPC MINDS: human and beatable. Weighted choice by traits (never a best-move search), limited knowledge,
   wit from Tâm cơ, trait biases and mood, mistakes, and tells before big schemes. One rule for every head. ================= */
/* counters for the personality table */
function mindLog(v,k){try{persCount(v,k);S.mind=S.mind||{};S.mind[k]=(S.mind[k]||0)+1}catch(e){}}
function witOf(v){return cl(v===S?S.tamco||0:v.tamco||0,0,100)}
function bq(){return S.bqN||0}
/* a slight or a blow makes the next days rash (mood); every consort alike */
(function(){const o0=oanAdd;oanAdd=function(x,y,n){if(n>0&&x&&x!==S)x.slightAt=bq();return o0.apply(this,arguments)}})();
function rashOf(v){const recent=v.slightAt!=null&&bq()-v.slightAt<=3;if(!recent)return 0;if(traitsOf(v).includes("Kiêu ngạo"))return 1;return roll(30)?1:0}
/* a blunder: the act is done badly (lower odds); read inside odA for that doer only */
(function(){const o0=odA;odA=function(a,b){const r=o0.apply(this,arguments);return a&&a.__err?cl(r-a.__err,5,95):r}})();
const BIG=["poison","kpoison","pond","pushp","musk","catswap","kframe","frame","plant"];
const TELLS={musk:"lén mua xạ hương ở chợ ngoài cung",poison:"vào Thái y viện hỏi mua thạch tín, nói là để trừ chuột",kpoison:"hỏi mua thạch tín, nói là để trừ chuột",pond:"hay dẫn người ra hồ sen dò lối, hỏi giờ các hoàng tự đi chơi",
 pushp:"dò giờ người ta đi qua bậc đá trơn sau mưa",catswap:"cho một bà đỡ lạ ra vào cung mình",kframe:"mua vải vàng và kim bạc, đóng cửa may vá ban đêm",frame:"mua vải vàng và kim bạc, đóng cửa may vá ban đêm",plant:"lảng vảng quanh cung người khác lúc vắng người"};
/* the choice: the band's menu weighted by traits; Tâm cơ tilts toward what works and away from what failed; low Tâm cơ repeats failed tricks */
function mindMenu(v,t){const b=bandOf(danger(v,t));if(!b)return[];const allow=BANDS.slice(1,b+1).flatMap(x=>x[2]);const O=[];const tc=witOf(v);v.fails=v.fails||{};
 const add=(k,w)=>{const a=ACT[k];if(!a||!allow.includes(k))return;let ok=false;try{ok=a.ok(v,t)}catch(e){}if(!ok)return;w*=persW(v,k);if(w<=0)return;
  let o=null;try{o=a.o?a.o(v,t):null}catch(e){}if(o!=null&&tc>=30)w*=Math.pow(cl(o,5,95)/50,(tc-30)/35);/* wit: weigh the odds, more so the cleverer */
  const f=v.fails[k]||0;if(f)w*=tc<35?1+.6*f:Math.pow(.5,f);/* the foolish repeat, the clever learn */
  O.push([k,w])};
 add("accuse",6);add("vp",3);add("musk",4);add("catswap",2);for(const k of ["kpoison","pond","kframe","ksab"])add(k,2);add("takeaway",2);add("pushp",1);add("trip",3);add("frame",2);add("poison",2);add("rumor",3);add("spy",3);add("bribe",2);add("block",t.nightLog&&t.nightLog.length?2:0);
 if(allow.includes("plant")&&v.inv.some(e=>e.t||(IT[e.k]&&itm(e.k).il)))O.push(["plant",3*persW(v,"plant")]);return O}
function wpick(O){let r=Math.random()*O.reduce((a,b)=>a+b[1],0),i=0;while(r>O[i][1]&&i<O.length-1){r-=O[i][1];i++}return O[i][0]}
const FAILRX=/bị lộ|bị bắt|phát giác|bị phát hiện|không thành|không ai tin|từ chối|chưa chuẩn|bị thử ra|lần ra|tra ra|báo cho chủ|đem chuyện kể/;
function mindRun(v,t,k,err){v.__err=err||0;let r="";try{r=k==="plant"?runAct(v,t,"plant",v.inv.findIndex(e=>e.t||(IT[e.k]&&itm(e.k).il))):runAct(v,t,k)}finally{v.__err=0}
 v.fails=v.fails||{};const failed=FAILRX.test(r);if(failed)v.fails[k]=(v.fails[k]||0)+1;else if(r)v.fails[k]=0;
 if(r&&!failed&&k!=="spy"&&k!=="accuse"&&k!=="vp"&&k!=="xx")mindBelief(t,v,k);
 /* Xảo quyệt over-plots: a success may leave a clue behind */
 if(r&&!failed&&traitsOf(v).includes("Xảo quyệt")&&BIG.includes(k)&&roll(20)){/*evok: after a BIG act (runAct deed)*/evA(t,v,1);mindLog(v,"_clue");if(t===S)r+=`(Để lại dấu vết: ngươi nắm thêm 1 chứng cứ về ${v.name}.) `}
 return r}
/* knowledge: a victim of a hidden blow only guesses who did it; wit and evidence help; a wrong guess turns her hatred on someone else (the player too) */
function mindBelief(t,v,k){if(!t||t===S||!t.alive)return;const ev=(t.evm&&t.evm[key(v)])||0;const p=cl(35+witOf(t)/2+(ev>0?25:0)-witOf(v)/4,10,90);mindLog(t,"_belief");
 if(roll(p)){oanAdd(t,v,8);return}
 const L=others(t).filter(x=>x!==v&&(x===S||x.alive&&!x.out));if(!L.length)return;const w=L.map(x=>[x,1+oan(t,x)+Math.max(0,-aff(t,x))]);let r=Math.random()*w.reduce((a,b)=>a+b[1],0),i=0;while(r>w[i][1]&&i<w.length-1){r-=w[i][1];i++}
 const s=w[i][0];oanAdd(t,s,8);mindLog(t,"_wrongBelief");t.blamed=t.blamed||{};t.blamed[key(s)]=(t.blamed[key(s)]||0)+1;
 if(s===S&&roll(30+(S.mat||0)*8))noteAdd(t.id,`Nghe nói ${t.name} ngờ ngươi đứng sau chuyện ${ACT[k]?ACT[k].n.toLowerCase():"vừa rồi"}, dù không phải ngươi`)}
/* the mind's turn: replaces the plain weighted pick */
npcAct=function(v,t){try{if(!v||!t)return"";const T=traitsOf(v);const tc=witOf(v);mindLog(v,"_decide");
  /* Nhu mì hesitates */
  if(T.includes("Khiêm nhường")&&roll(35)){mindLog(v,"_hesitate");return""}
  /* Đa nghi wastes effort on a false suspicion */
  if(T.includes("Kín đáo")&&roll(22)){const L=others(v).filter(x=>x!==t&&(x===S||x.alive&&!x.out)&&danger(x,v)<30);if(L.length){const u=pick(L);mindLog(v,"_wrongBelief");mindLog(v,"_mistake");evA(v,u,0);newsAdd(v,"spy",`Người của ${v.name} dò xét ${NM(u)} vì một mối ngờ không có thật`,u===S);return""}}
  /* Tham vọng overreaches: aims at the highest seat */
  let err=0;if(T.includes("Tham vọng")&&roll(20)){const L=others(v).filter(x=>(x===S||x.alive&&!x.out));const hi=L.sort((a,b)=>rkOf(b)-rkOf(a))[0];if(hi&&hi!==t&&bandOf(danger(v,hi))>=1){t=hi;err+=10;mindLog(v,"_overreach");mindLog(v,"_mistake")}}
  /* rash: slighted Kiêu ngạo, or a bad week for anyone */
  const rash=rashOf(v);if(rash){err+=10;mindLog(v,"_rash");mindLog(v,"_mistake")}
  /* low wit: clumsy */
  if(!rash&&tc<30&&roll(15)){err+=10;mindLog(v,"_mistake")}
  const O=mindMenu(v,t);if(!O.length)return"";let k;if(rash){const ov=O.filter(x=>["accuse","rumor","trip","vp","xx","frame"].includes(x[0]));k=wpick(ov.length?ov:O)}else k=wpick(O);persCount(v,k);
  /* a big scheme is prepared first: it leaves a tell her people may catch */
  if(BIG.includes(k)&&!v.plan){const pat=tc>=60?2:tc>=35?1:0;v.plan={k,t:key(t),due:bq()+1+R(2)+pat,err};mindTell(v,t,k);return""}
  return mindRun(v,t,k,err)}catch(e){return""}};
function mindTell(v,t,k){mindLog(v,"_tell");const tc=witOf(v);let c=12+(S.mat||0)*7+(S.staff||[]).filter(s=>netIs(s,"sharp")||netIs(s,"talk")).length*8+(tc<35?15:0)-(tc>=70?8:0)+(t===S&&S.maid&&S.maid.loyal>=70?10:0);
 if(!roll(cl(c,5,80)))return;mindLog(v,"_tellSeen");const txt=`Người của ${v.name} ${TELLS[k]||"có động tĩnh lạ"}`;S.tells=S.tells||{};S.tells[v.id]={k,t:key(t),bq:bq()};
 try{newsAdd(v,k,txt,true)}catch(e){}noteAdd(v.id,`Tai mắt báo: ${TELLS[k]||"có động tĩnh lạ"}${t===S?" (có lẽ nhắm vào ngươi)":` (có lẽ nhắm vào ${NM(t)})`}`);
 if(t===S){S.onGuard=S.onGuard||{};S.onGuard[v.id]=k;if(!S.dead)Q.push({t:"Tai mắt báo tin",h:`<p>${txt}.</p><p>Có lẽ nàng đang nhắm vào ngươi. Ngươi đã đề phòng: vài buổi tới mưu của nàng khó thành hơn; dò la hoặc tố giác nàng thì càng chắc.</p>`,who:{w:["r",v.id]}})}
 else log(`Tai mắt báo: ${txt}.`)}
/* plans fall due a few buổi later; her guard (from a caught tell) makes them fail more and leaves evidence */
(function(){const r0=rivalsBuoi;rivalsBuoi=function(){S.bqN=(S.bqN||0)+1;let ev="";try{for(const v of liveRivals(true)){const P=v.plan;if(!P||!v.alive||v.out)continue;if(P.due>bq())continue;v.plan=null;const t=byKey(P.t);if(!t||(t!==S&&(!t.alive||t.out))||(t===S&&S.dead))continue;
   let err=P.err||0;const guard=t===S&&S.onGuard&&S.onGuard[v.id];if(guard){err+=25;delete S.onGuard[v.id]}
   let ok=false;try{ok=ACT[P.k].ok(v,t)}catch(e){}if(!ok){mindLog(v,"_abandon");continue}
   const r=mindRun(v,t,P.k,err);if(guard&&FAILRX.test(r))evA(S,v,1);ev+=seenNPC(v,t,r);if(S.dead)return ev}}catch(e){}
  return ev+r0.apply(this,arguments)}})();
/* someone with a plan in hand waits for it instead of starting another */
(function(){const n0=npcAct;npcAct=function(v,t){if(v&&v.plan)return"";return n0.apply(this,arguments)}})();
