/* ================= jscent: HƯƠNG RIÊNG — the signature scent (PARKING #10, owner 20/11 ~06:35Z «Mùi hương riêng phần 5 hợp lý nè, đưa vào
   bãi đổ»; build OD 24/11 ~05:20Z; review/scent; expert notes + scan in dev/handover/reports/scent.md on the handover branch) =================
   REUSE, no new system: the scent lives in a REAL OBJECT (law 6c) — a box of incense IT.hg_<k> (kd «Hương liệu», sold by the Nội vụ phủ
   eunuch like every item, used up one box a month, so it is owned, given, sold, stolen, tainted or burnt, always traceable).
   PERSON (law 1, the same code for her and every consort): p.sc = the scent key (BAL.scent.list), p.scOff = 1 when she has no box left to burn.
   Her: picked from the item panel «Xông làm hương riêng» (jinv kinvOpen, kit pbtn) = burns one box now. NPC: inherited — drawn once per life
   from the seeded hash (ctxHash, like jdis) with BAL.scent.npcStock boxes from home; restocks by buying when out (BAL.scent.pr, keep).
   EMPEROR: LIKES.scent / LIKEN.scent (j1) → S.emp.likes.scent (seeded, old saves filled on first use) is shown in his card row «Hương», learnt by
   discover() and by a night; a DISLIKED scent comes from jdis (the pool now holds «scent:hương X»; one source, never two). On a night (j8
   night(p), the one path for her and NPCs): liked = Sủng + like.sung but the tell is louder; disliked = Sủng dis.sung but few notice (law 2/3).
   TELL (law 6a): the next morning every other consort (and she) may smell the scent on the long bào (odds BAL.scent.tell, + tai mắt, + rank of
   the visited, law 5); she then BELIEVES it was whoever wears that scent — two who share a scent split the blame, so a rival who copies her
   scent (BAL.scent.copy) frames her, and she can copy a rival's the same way. Observers that are NPCs feel Ghen (toward her, ghenUp) or lose
   thiện cảm (toward another, affAdd); she hears it through her tai mắt (log + kitKnow).
   POISON (two-way): TAINT.doc «tẩm hương độc» on a box (j8 TAINT / taintItem / inspect / gift: she can taint one herself and give it, NPCs the
   same) and a j70 route «Mua chuộc cung nữ coi lò hương» (poison2, acc tsv = a servant of the target is bought; NPC→her, her→NPC, NPC→NPC):
   when it lands the target's own scent box is tainted by that servant. Burning a tainted box costs Sức (BAL.scent.doc.suc); «Kiểm tra đồ»
   (j8 inspect) can find it and trace it (real evidence). Test: dev/test/scent.test.js */
const SC_K=()=>Object.keys(BAL.scent.list);
function scName(k){const x=BAL.scent.list[k];return x?"hương "+x.n:""}
function scBox(k){return "hg_"+k}
function scHash(s){try{return typeof ctxHash==="function"?ctxHash(String((S&&S.ctxSeed)||"")+":"+s):0}catch(e){return 0}}
/* the items: one box per scent, equal price (law 2), used up (IL_USED_KD «Hương liệu»), no «Dùng» (no use field), sold back like any item */
try{for(const k of SC_K()){const L=BAL.scent.list[k];IT[scBox(k)]={n:"Hộp "+scName(k),kd:"Hương liệu",d:`Xông làm hương riêng: ${(typeof kinvPlain==="function"?kinvPlain(L.g):"")} mỗi tháng, đốt một hộp`,pr:BAL.scent.pr,sc:k,tg:["rv","hh","th"]};SHOP_ALL.push(scBox(k));
  if(typeof TAINT==="object")(TAINT.doc=TAINT.doc||{n:"tẩm hương độc",on:[],c:BAL.scent.doc.c,hurt:"người xông hao Sức, mất ngủ"}).on.push(scBox(k))}
 LIKES.scent=SC_K().map(scName);LIKEN.scent="Hương"}catch(e){console.error("jscent items",e)}
function scPeople(){return [S].concat(liveRivals(true)).filter(x=>x&&(x===S?!S.dead:x.alive&&!x.out))}
function scHas(p){return (p.inv||[]).findIndex(e=>e&&!e.h&&e.k===scBox(p.sc))}
/* NPC: inherited scent, drawn once per life (seeded) with boxes from home */
function scInit(v){if(!v||v===S||v.sc!==undefined)return;const K=SC_K();v.sc=K[scHash("sc:"+v.id)%K.length];v.inv=v.inv||[];const [a,b]=BAL.scent.npcStock;const n=a+scHash("scn:"+v.id)%(b-a+1);for(let i=0;i<n;i++)v.inv.push({k:scBox(v.sc)})}
/* the scent a person really carries now (none when the box ran out) */
function scOf(p){if(!p)return null;if(p!==S)scInit(p);return p.sc&&!p.scOff&&BAL.scent.list[p.sc]?p.sc:null}
function scEmp(){try{const E=S&&S.emp;if(!E)return null;E.likes=E.likes||{};E.known=E.known||{};if(!E.likes.scent)E.likes.scent=LIKES.scent[scHash("emp:scent:"+(E.name||""))%LIKES.scent.length];return E}catch(e){return null}}
function scDis(k){try{return typeof disOf==="function"&&disOf("emp").includes("scent:"+scName(k))}catch(e){return false}}
function scLiked(k){const E=scEmp();return !!(E&&k&&E.likes.scent===scName(k))}
function scTm(p){try{return typeof taiMatRaw==="function"&&taiMatRaw(p).length>0}catch(e){return false}}
/* burn one box (pick or month): the gain; a tainted box hurts the one who burns it */
function scBurn(p){const i=scHas(p);if(i<0){p.scOff=1;return null}const e=p.inv.splice(i,1)[0];p.scOff=0;ap(p,Object.assign({},BAL.scent.list[p.sc].g));
 if(e.t==="doc"){ap(p,{suc:BAL.scent.doc.suc});p.scHurt=(p.scHurt||0)+1}return e}
/* her pick (item panel): the box's scent becomes hers and one box burns now */
function scPick(ix){const e=S.inv[ix],it=e&&itm(e.k);if(!it||!it.sc||e.h)return"";if(S.sc===it.sc&&!S.scOff){S.sc=null;S.scOff=0;return `Ngươi thôi xông ${scName(it.sc)}; cung ngươi không còn hương riêng.`}
 S.sc=it.sc;S.inv.splice(ix,1);S.inv.unshift(e);const b=scBurn(S);if(!b)return "";
 return `Ngươi chọn ${scName(S.sc)} làm hương riêng, sai cung nữ xông khắp tẩm điện và y phục. ${fmt(BAL.scent.list[S.sc].g)}`+(b.t==="doc"?` <span class="r">Hương nồng gắt lạ, ngươi chóng mặt.</span> ${fmt({suc:BAL.scent.doc.suc})}`:"")}
/* the month: everyone burns one box (law 1); NPCs restock and the jealous may copy her scent (frames her) */
function scMonth(){if(!S||S.dead)return;const B=BAL.scent;
 if(S.sc){const was=!S.scOff,b=scBurn(S);if(!b&&was)log(`Hộp ${scName(S.sc)} cuối cùng đã cháy hết; hương riêng của ngươi phai dần. Nhờ thái giám mua thêm để giữ hương.`);
  else if(b&&b.t==="doc")log(`<span class="r">Đêm qua ${scName(S.sc)} trong lò nồng gắt lạ, ngươi trằn trọc mất ngủ.</span> ${fmt({suc:B.doc.suc})} · nên kiểm tra đồ.`)}
 if(typeof worldOn==="function"&&!worldOn())return;
 for(const v of liveRivals(true)){scInit(v);if(S.sc&&!S.scOff&&v.sc!==S.sc&&(+v.ghen||0)>=B.copy.ghen&&roll(B.copy.p)){v.sc=S.sc;v.scCopy=1}
  if(scHas(v)<0&&(v.bac||0)>=B.pr+B.keep)buy(v,scBox(v.sc));scBurn(v)}}
/* the night (j8 night(p), her and NPCs): the Emperor's taste, then the morning tell */
function scNight(p){p=p||S;const k=scOf(p);if(!k)return;const B=BAL.scent;scEmp();let mod=0;const nm=scName(k);
 if(scLiked(k)){ap(p,{sung:B.like.sung});mod=B.like.tell;if(p===S){const E=S.emp,first=!E.known.scent;E.known.scent=true;log(`Hoàng thượng khẽ ngửi tóc ngươi, nét mặt giãn ra: ngài ưa ${nm}. ${fmt({sung:B.like.sung})}`);if(first)try{kitKnow({key:"like:scent",pri:1,text:`Ngươi biết được: Hoàng thượng thích ${nm}.`})}catch(e){}}}
 else if(scDis(k)){ap(p,{sung:B.dis.sung});mod=B.dis.tell;if(p===S){log(`Hoàng thượng chau mày khi ngửi ${nm}, chẳng bao lâu đã cho ngươi lui. ${fmt({sung:B.dis.sung})}`);try{if(typeof disLearn==="function")disLearn("emp","scent:"+nm,"night")}catch(e){}}}
 scTell(p,k,mod)}
function scTellOdds(x,p,mod){const B=BAL.scent.tell;return oddsCl(Math.round(B.base+eyes(x)*B.eye+(scTm(x)?B.tm:0)+rkOf(p)*B.rk+(mod||0)))}
/* the morning tell: who smells it, and whom they believe was there (can be wrong: two share a scent) */
function scTell(p,k,mod){const B=BAL.scent.tell,nm=scName(k);let toMe=0,frameMe=0;const P=scPeople();const out=[];
 for(const x of P){if(x===p)continue;if(!roll(scTellOdds(x,p,mod)))continue;
  const C=P.filter(y=>y!==x&&scOf(y)===k);if(!C.length)continue;const y=pick(C);out.push([x,y]);
  if(x===S){log(`Tai mắt báo: sáng nay long bào của Hoàng thượng còn vương ${nm}; xem ra đêm qua ngài ở chỗ ${NM(y)}.`);(S.scSeen=S.scSeen||{})[y.id]=k}
  else if(y===S){ghenUp(x,B.ghen,"scent");if(p===S)toMe++;else frameMe++}
  else affAdd(x,y,-B.rel)}
 if(scTm(S)){if(toMe)log(`Tai mắt báo: mấy cung ngửi ra ${nm} trên long bào, biết đêm qua ngài ở chỗ ngươi; ánh mắt nhìn ngươi ghen tức hơn.`);
  if(frameMe)log(`Tai mắt báo: long bào vương ${nm}, có người lại tưởng đêm qua ngài ở chỗ ngươi; ánh mắt nhìn ngươi ghen tức hơn.`)}
 S.scLastTell=out.map(([x,y])=>[key(x),key(y)]);return out}
/* poison (j70 poison2): a servant of the target taints the target's own scent box */
function scTaint(a,t){if(!t||!t.sc)return null;const i=(t.inv||[]).findIndex(e=>e&&!e.h&&!e.t&&e.k===scBox(t.sc));if(i<0)return null;const e=t.inv[i];e.t="doc";e.by=key(a);if(a)a.schemes=(a.schemes||0)+1;/* a real deed (jtruth deedCap): the trail can become evidence */return e}
try{if(typeof M70==="object"&&M70.poison2){const P=BAL.scent.poison;M70.poison2.R.push({id:"lohuong",n:"Mua chuộc cung nữ coi lò hương",tl:["gặp riêng cung nữ coi lò hương của nạn nhân ở góc tường sau","cung nữ ấy dạo này hay lén mở hộp hương lúc vắng người"],pl:null,vis:P.vis,need:P.need,bac:P.bac,acc:"tsv",gd:"Tự tay coi lò hương, khóa hộp hương",st:"Gọi riêng cung nữ coi lò hương ra hỏi chuyện"})}}catch(e){console.error("jscent j70",e)}
(function(){
 if(typeof pickRoute70==="function"){const r0=pickRoute70;pickRoute70=function(a,t,M){if(M&&M.R&&M.R.some(r=>r.id==="lohuong")&&!scOf(t)){const M2=Object.assign({},M,{R:M.R.filter(r=>r.id!=="lohuong")});return r0.call(this,a,t,M2)}return r0.apply(this,arguments)}}
 if(typeof exec70==="function"){const x0=exec70;exec70=function(p,opp){const go=p&&p.m==="poison2"&&(p.r==="lohuong"||p.r==="huong")&&!p.foil&&!p.trap;const r=x0.apply(this,arguments);try{if(go&&p.end==="done"){const a=pa70(p),t=pt70(p);if(scTaint(a,t))p.scT=1}}catch(e){console.error("jscent exec70",e)}return r}}
 if(typeof night==="function"){const n0=night;night=function(p){try{scNight(p||S)}catch(e){console.error("jscent night",e)}return n0.apply(this,arguments)}}
 if(typeof monthTick==="function"){const m0=monthTick;monthTick=function(){const ev=m0.apply(this,arguments);try{scMonth()}catch(e){console.error("jscent month",e)}return ev}}
 if(typeof discover==="function"){const d0=discover;discover=function(){scEmp();return d0.apply(this,arguments)}}
 if(typeof normAll==="function"){const a0=normAll;normAll=function(){const r=a0.apply(this,arguments);try{scEmp()}catch(e){}return r}}
 if(typeof itemAct==="function"){const i0=itemAct;itemAct=function(a,ix){if(a==="scent"){if(S.dead||Q.length)return;const r=scPick(ix);if(r)log(r);render();return}return i0.apply(this,arguments)}}
})();
window.scTellOdds=scTellOdds;window.scOf=scOf;window.scName=scName;window.scNight=scNight;window.scMonth=scMonth;window.scTell=scTell;window.scTaint=scTaint;window.scPick=scPick;window.scEmp=scEmp;window.scInit=scInit;
