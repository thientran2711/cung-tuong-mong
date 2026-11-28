/* ================= SERVANT TRAITS: every trait has an upside and a downside; hidden at hire; firing is priced; a small monthly pool ================= */
const DIRTY=["poison","kpoison","frame","kframe","plant","musk","catswap","pushp","pond","ksab","vp","steal","takeaway","bribe","bribel","laydo","laydol"];
/* who is ORDERED for a dirty act (receiver choice OD 18/11 ~21:15Z: the ordered servant answers obey / refuse / tell, jagstf2 stf2Ord): the trusted cung nữ for
   the «…cung nữ thân tín…» routes (jecon econLoyalMaid), else the sent servant bestSent */
const DIRTY_SENT={bribel:a=>typeof econLoyalMaid==="function"?econLoyalMaid(a):a.maid,laydol:a=>typeof econLoyalMaid==="function"?econLoyalMaid(a):a.maid};
let ACTK=null;
(function(){const r0=runAct;runAct=function(a,t,k){const p=ACTK;ACTK=k;try{let oc=null,sv=null;/* review coop-thin-f6 r1: sv lives here (the «qua loa» line below reads it; a const inside the if threw ReferenceError, solo too) */
  /* trung thành refuses (or begs against) a dishonourable order: the act does not happen */
  if(a&&k&&DIRTY.includes(k)&&!together(a,t)){sv=(DIRTY_SENT[k]||bestSent)(a);/* AG-ALL-2 G10: with the loop on the sent servant CHOOSES among the player maid's own "Lệnh của chủ" options (j42 cnvOrdOpts: Vâng lệnh / Từ chối / Mật báo) by her lòng and nết (jagstf2 stf2Ord); off → the old trung thành roll */
   oc=sv&&typeof stf2Ord==="function"?stf2Ord(a,sv,t,k):null;if(oc&&oc!=="obey"&&oc!=="half"){sv.kn=a===S?1:sv.kn;if(a===S&&oc==="refuse")servLearn(sv,"Từ chối việc bẩn");return a===S?(oc==="refuse"?`${sv.name} quỳ xin nương nương đừng làm việc thất đức; việc không thành. `:`${sv.name} viện cớ thoái thác; việc không thành. `):""}
   if(!oc&&sv&&netIs(sv,"loyal")&&roll(30)){sv.kn=a===S?1:sv.kn;const m=`${sv.name} quỳ xin ${a===S?kSay({srv:"f"},S,"{goi}",{m:"cool"}):NM(a)} đừng làm việc thất đức; việc không thành. `;if(a===S)servLearn(sv,"Từ chối việc bẩn");return a===S?m:""}}
  const r=oc==="half"?(a===S?`${sv.name} làm qua loa cho xong việc. `:"")+ordHalf(()=>r0.apply(this,arguments)):r0.apply(this,arguments);
  /* nhát gan: rivals' spies never notice him; a trail he leaves is lost */
  if(a&&k&&!together(a,t)){const sv=bestSent(a);if(sv&&netIs(sv,"timid")&&roll(35)&&t!==S&&t.evm&&t.evm[key(a)]>0)t.evm[key(a)]--}
  return r}finally{ACTK=p}}})();
function sentPen(s){if(!s)return 20;const d=ACTK&&DIRTY.includes(ACTK),ru=ACTK==="rumor";let p=15-Math.round((s.loyal-50)/10);
 const L=BAL.net.k.lean;if(netIs(s,"sharp"))p-=BAL.net.k.sentSharp;if(netIs(s,"greed"))p+=L.greed[d?0:1];if(netIs(s,"loyal"))p+=L.loyal[d?0:1];if(netIs(s,"timid"))p+=L.timid[d?0:1];if(netIs(s,"talk"))p+=L.talk[ru?0:1];return cl(p,0,30)}
function confessRisk(s){if(!s)return 25;return cl(20+nq(s,"timid",BAL.net.k.confTimid)-nq(s,"loyal",BAL.net.k.confLoyal)+nq(s,"greed",BAL.net.k.confGreed)-Math.round(s.loyal/10),3,60)}
/* bribing: a greedy one is cheap to turn (15 silver), a timid one is too afraid to scheme against his mistress */
function bribeOdds(a,s){return odA(a,(typeof svDread==="function"?-svDread(ownerOf(s)):0)/* E-GAIN3c răn đe */+35+nq(s,"greed",BAL.net.k.bribeGreed)-nq(s,"timid",BAL.net.k.bribeTimid)-nq(s,"loyal",BAL.net.k.bribeLoyal)-s.loyal/3+a.tamco/5)}
/* AG-ALL-2f3 (owner OD 17/11 ~17:10Z "thành công á thì tốn 30 bạc, còn nếu mà không thành công á thì sao tốn 30 bạc được"): the bạc is paid ONLY when the
   servant takes it (bribeServ wrapper below); a refusal costs no bạc but keeps its consequences (she may tell her master; the sent servant's fear, tmFear) */
function bribeServ(a,s){const o=ownerOf(s);const cost=nv(s,"bribeCost");if(!o||o===a||a.bac<cost)return"";const odds=aOdd(bribeOdds(a,s),a);/* her Mua chuộc: the odds she saw (j9 fzRun), also as the take weight below */
 /* AG-ALL-2 G10: with the loop on the servant CHOOSES among the player maid's own "Bạc lạ" options (j42 cnvBribeOpts: Nhận bạc / Từ chối, bẩm chủ /
    Từ chối, im lặng) — take weighs as these odds, the refusal splits by her lòng (jagstf2 stf2Bribe); off → the old roll */
 if(typeof stf2Bribe==="function"){const r=stf2Bribe(a,s,o,aOdd(odds,a),cost);/* the same odds as the aRoll fallback below (econ-tamco F2, whole group) */if(r!=null)return r}
 if(aRoll(odds,a)){s.spyFor=key(a);affAdd(s,a,BAL.relMS.bribe);return `${s.name} (người hầu của ${NM(o)}) nhận bạc của ${NM(a)}, thành tai mắt. `}s.loyal=cl(s.loyal+BAL.eff.j29.loyalBribeServ,0,100);evA(o,a,BAL.eff.j29.evBribeServ);/* TAI-MAT-KNOW: told = her master LEARNS it (was a typed relAdd −5) */typeof spyLearn==="function"&&spyLearn(o,a);return `${s.name} từ chối bạc của ${NM(a)} và mách chủ. `}
/* what one sees of a servant: hidden trait until learned; at hire only age, origin and a vague impression */
const ORIGINS_S=["con nhà nông ở Giang Nam","gia đình bao y kỳ tịch","con nhà buôn ở kinh thành","mồ côi, được Nội vụ phủ nuôi","con nhà thợ thêu Tô Châu","quê miền núi phía Bắc"];
const IMPR={trung:["ít nói, cúi đầu","chăm chỉ, ít cười"],tham:["mắt hay liếc đồ quý","khéo nói, nhanh tay"],nhat:["rụt rè, nói lí nhí","ít nói, cúi đầu"],lanh:["mắt sáng, nhanh nhẹn","khéo nói, nhanh tay"],chuyen:["hay cười, nói nhiều","mắt sáng, nhanh nhẹn"]};
function servMeta(s){if(!s.org)s.org=pick(ORIGINS_S);if(!s.imp)s.imp=pick(qv(IMPR,s)||["bình thường"]);return s}
function strShow(s){servMeta(s);const mine=ownerOf(s)===S;const known=s.kn||(!mine&&s.spyFor==="me");return known?netTxt(s):`nết chưa rõ · trông ${s.imp}`}
function servLearn(s,why){if(!s||s.kn)return;s.kn=1;log(`${why}: biết ${s.name} là người ${netTxt(s)}.`);try{kitKnow({key:"srv:"+(s.sid!=null?s.sid:s.name),text:`${why}: biết ${s.name} là người ${netTxt(s)}.`})}catch(e){}}
/* the household she starts with: known after the first weeks only by watching; new hires are strangers */
(function(){const m0=mkServ;mkServ=function(){const s=m0.apply(this,arguments);servMeta(s);s.kn=0;return s}})();
/* the monthly pool from Nội vụ phủ: 2-3 of each kind; rivals (higher rank first) take from it too */
function npool(){S.npool=S.npool||{maid:[],eunuch:[]};return S.npool}
function refillPool(){const P=npool();for(const r of ["maid","eunuch"]){P[r]=P[r].filter(()=>roll(50));while(P[r].length<2+R(2)&&roomFor(r))P[r].push(mkServ(r))}}
function takeFromPool(role){const P=npool();if(!P[role].length)return null;return P[role].splice(R(P[role].length),1)[0]}
/* NPC households fill from the same pool (one rule); she waits if it runs dry */
function fillStaff(p,free){const [cm,ce]=capOf(p);let [m,e]=hhHas(p);
 const get=r=>free?mkServ(r):takeFromPool(r);
 while(m<cm&&roomFor("maid")&&(free||p.bac>=BAL.house.hireBac)){const s=get("maid");if(!s)break;p.staff.push(s);m++;if(!free)ap(p,{bac:-BAL.house.hireBac})}
 while(e<ce&&roomFor("eunuch")&&(free||p.bac>=BAL.house.hireBac)){const s=get("eunuch");if(!s)break;p.staff.push(s);e++;if(!free)ap(p,{bac:-BAL.house.hireBac})}}
/* hiring: she picks among this month's candidates (age, origin, impression only) */
function hireCard(role){const P=npool()[role];if(!P.length){Q.push({t:"Nội vụ phủ",h:`<p>Tháng này Nội vụ phủ không còn ${role==="maid"?"cung nữ":"thái giám"} nào. Tháng sau sẽ có người mới.</p>`});showModal();return}
 Q.push({act:1,kind:"ring"/* KIT §101.9: candidates = vòng người */,t:"Nội vụ phủ đưa người",h:`<p>Người hiện có (chỉ biết tuổi, xuất thân và dáng vẻ; nết thật phải ở lâu mới biết):</p>`,opts:P.map(s=>({n:`${s.name}, ${s.age} tuổi`,fx:{bac:BAL.eff.j29.bacFx},x:`${s.org} · trông ${s.imp}`,go:()=>{/* the table again at the moment she takes him (one rule, review/staff-cap-fix) */if(hhHas(S)[role==="maid"?0:1]>=capOf(S)[role==="maid"?0:1]){/* the pick paid (fx) before go: nobody joins, so the silver comes back (review/staff-cap-fix-r6) */ap(S,{bac:-BAL.eff.j29.bacFx});log(`Cung ngươi đã đủ người hầu theo phẩm vị; Nội vụ phủ không đưa thêm, bạc trả lại.`);return}hireTake(S,role,s,true)/* ag one hire path (jagacts3) */;log(`Nhận ${s.name} từ Nội vụ phủ. Bạc ${balSg(BAL.eff.j29.bacFx)}.`)}})).concat([{n:"Thôi",fx:{},x:"không nhận ai"}])});showModal()}
document.addEventListener("click",e=>{const b=e.target.closest("[data-hire]");if(!b||b.disabled)return;e.stopPropagation();e.preventDefault();if(!S||S.dead||Q.length||S.bac<BAL.house.hireBac)return;const [cm,ce]=capOf(S),[nm,ne]=hhHas(S);const role=b.dataset.hire;if(role==="maid"?nm>=cm:ne>=ce)return;hireCard(role)},true);
/* 'Xem người': a costly look (Bạc -15, 1 khắc) reveals the trait */
document.addEventListener("click",e=>{const b=e.target.closest("[data-svlook]");if(!b||b.disabled)return;e.stopPropagation();const s=servById(+b.dataset.svlook);if(!s||S.bac<BAL.house.lookBac||!can(BAL.btn.svLook.k)||Q.length)return;apply({bac:-BAL.house.lookBac});spend(BAL.btn.svLook.k);servLearn(s,"Cho người dò xét lai lịch");render()},true);
/* FIRING: Nội vụ phủ must agree (Chắc), Bạc -20, Danh -1 (more if she fires often), a random replacement from the pool; he knows her secrets */
function servSellO(p,s,harsh){if(harsh==null)harsh=((p.fired||[]).filter(w=>wk()-w<18).length+1)>=2;return oddsCl(Math.min(qv({tham:55,chuyen:40,lanh:30,nhat:12,trung:4},s,25)+(harsh?15:0)-Math.round(s.loyal/3)+((p.schemes||0)>0?10:0),90))}
function fireServ(p,s,quietly){const me=p===S;const cost=BAL.house.swapBac;if(p.bac<cost)return"";ap(p,{bac:-cost});p.fired=(p.fired||[]).filter(w=>wk()-w<18);p.fired.push(wk());const harsh=p.fired.length>=2;ap(p,{danh:harsh?-BAL.house.swapTwiceDanh:-BAL.house.swapDanh});
 if(!roll(80)){return me?`Nội vụ phủ chưa duyệt việc trả ${s.name} về. Bạc -${cost}. `:""}
 p.staff.splice(p.staff.indexOf(s),1);const n=takeFromPool(s.role);if(n)p.staff.push(n);
 /* he may sell what he knows: by trait, loyalty and how he was treated */
 const sell=servSellO(p,s,harsh);let leak="";
 if(roll(sell)){const foes=others(p).filter(x=>x!==p&&(x===S||x.alive)&&danger(x,p)>=netThK(x,"act","feign"));const f=npwPick(foes,x=>danger(x,p))/* npc-purpose G2a: he sells to the one who most wants to harm her (pays best) */;if(f){const g=BAL.eff.j29.evFireServ+((p.schemes||0)>2?BAL.eff.j29.evFireServ_2:0);evA(f,p,g);leak=f===S?` ${s.name} tìm đến cung ngươi, kể chuyện của ${p.name}: chứng cứ ${balSg(g)}.`:me?" Có tin hắn đã bán chuyện của ngươi cho người khác.":""}}
 if(!me){const tl=npcTell(p,{from:liveRivals(true).filter(x=>x!==p&&eyes(x)>0)});/* npc-purpose G2a: the news goes round only when someone with tai mắt has a reason to spread it */if(tl&&roll(25))S.news&&newsAdd(p,"fire",`${p.name} đuổi ${s.name} khỏi cung (${tl.who.name} ${tl.why}, đem chuyện đi kể)`,false)}
 return me?`Trả ${s.name} về Nội vụ phủ. Bạc -${cost}, Danh -${harsh?3:1}${harsh?" (tiếng khắc nghiệt)":""}. ${n?`Nội vụ phủ đưa ${n.name} đến thay (nết chưa rõ).`:"Nội vụ phủ chưa có người thay."}${leak} `:leak}
(function(){const s0=servAct;servAct=function(a,id){if(a==="doi"){const s=servById(id);if(!s||ownerOf(s)!==S||S.dead||Q.length||S.bac<BAL.house.swapBac)return;log(fireServ(S,s));render();return}return s0.apply(this,arguments)}})();
/* save-unseen-lists r4 (LAW 11 / 6c): «Hàng chợ đen» (made at the month step) is BUILT by a registered generator (the servant as id + the piece key):
   written into the sổ and made again on load; nothing happens until she answers */
const svMarketCard=rcpReg("svMarket",(s,k)=>{if(!s||!IT[k])return null;const c={shop:1,t:"Hàng chợ đen",who:pServ(s),h:`<p>${s.name} lén mang đến <b>${itm(k).n}</b>, mua từ chợ đen ngoài cung.</p>`,opts:[{n:"Mua",fx:{bac:-Math.round((itm(k).pr||40)*.7)},x:"rẻ hơn hàng rong · đồ cấm, bị lục ra là tội",go:()=>{invAdd(S,{k});servLearn(s,"Mang hàng chợ đen")}},{n:"Không mua",fx:{},x:"không dính líu"}]};Q.push(c);return c});
/* trait events each month: upsides and downsides happen, and show the trait */
function servTraitMonth(){let ev="";for(const p of consorts()){for(const s of (p.staff||[]).slice()){if(s.spyFor)continue;const me=p===S;
  if(netIs(s,"greed")){if(npcWhy("svSteal",{s},()=>roll(10))){/* npc-purpose G2a: a greedy, not loyal servant chooses to steal; roll = the chance comes */const n=5+R(10);ap(p,{bac:-n});if(me&&roll(40)){servLearn(s,"Bắt được ăn cắp");ev+=`${s.name} lấy trộm ${n} lượng bạc. `}}
   if(me&&npcWhy("svMarket",{s},()=>roll(10))){const L=Object.keys(IT).filter(k=>itm(k).il);const k=npwPick(L,k=>S.bac>=Math.round((itm(k).pr||40)*.7)?(itm(k).pr||40):0)/* npc-purpose G2a: he brings the dearest thing she can pay for */;if(k)svMarketCard(s,k)}}
  if(netIs(s,"sharp")){if(me&&npcWhy("svSpy",{s},()=>roll(12))){const v=npwPick(liveRivals(true).filter(x=>traitsOf(x).some(t=>!trKnown(x).includes(t))),x=>1+Math.max(0,danger(x,S)))/* npc-purpose G2a: he spies on the one who threatens his mistress most */;if(v){const t=learnTrait(v,`${s.name} dò được`);if(t){servLearn(s,"Mang tin về");ev+=`${s.name} dò được nết của ${v.name}: ${t}. `}}}
   /* ambition: if her rank has stalled a year he may ask to serve a higher palace */
   if(me&&S.turn-(S.lastPromo||0)>=12&&s.loyal<75&&npcWhy("svLeave",{s},()=>roll(5))){const v=npwPick(liveRivals(true).filter(x=>rkOf(x)>S.rank),x=>rkOf(x)-S.rank+(x.sung||0)*BAL.ag.why.sv.leaveSung)/* npc-purpose G2a: the highest, most favoured palace */;if(v){S.staff.splice(S.staff.indexOf(s),1);(v.staff=v.staff||[]).push(s);ev+=`${s.name} xin chuyển sang hầu ${v.name}, cung có phẩm cao hơn. `}}}
  if(netIs(s,"talk")&&me&&npcWhy("svTalk",{s})){const v=npwPick(liveRivals(true),x=>1+(x.sung||0))/* npc-purpose G2a: talk is of the favoured */;const tk=npwPick(["tell","blab"],k=>k==="tell"?(s.loyal||0)*BAL.ag.why.sv.tellLoy:(100-(s.loyal||0))*BAL.ag.why.sv.blabLoy);if(v){if(tk==="tell"&&roll(50)){const t=learnTrait(v,`${s.name} nghe đồn`);if(t)ev+=`${s.name} kể: ${v.name} là người ${t}. `}else if(tk==="blab"&&roll(30)){ap(S,{danh:BAL.eff.j29.danhServTraitMonth});ev+=`${s.name} lỡ miệng kể chuyện trong cung ngươi ra ngoài. Danh ${balSg(BAL.eff.j29.danhServTraitMonth)}. `}}if(roll(20))servLearn(s,"Nghe chuyện nàng kể")}
  if(netIs(s,"loyal")&&me&&roll(8))servLearn(s,"Thấy hắn tận tụy");
  if(netIs(s,"timid")&&me&&roll(8))servLearn(s,"Thấy hắn rụt rè");
  /* rivals manage by the same rules: a harsh mistress fires low-loyalty servants */
  if(!me&&s.loyal<30&&roll(["Kiêu ngạo","Xảo quyệt"].some(t=>hasT(p,t))?25:8))ev+=fireServ(p,s,true)||""}}
 return ev}
/* a trung servant takes the blame when her sent man is caught, at the cost of his own life or freedom */
(function(){const c0=servCaught;servCaught=function(p,s){if(p===S){const t=(S.staff||[]).find(x=>netIs(x,"loyal")&&x!==s&&x.loyal>=60);if(t&&roll(40)){S.staff.splice(S.staff.indexOf(t),1);servLearn(t,"Nhận tội thay");return `${t.name} đứng ra nhận hết tội thay chủ, bị đưa vào Thận Hình ti. `}}return c0.apply(this,arguments)}})();
/* her monthly hook */
(function(){const e0=endTurn;endTurn=function(){const t0=S&&S.turn;const r=e0.apply(this,arguments);try{if(S&&!S.dead&&S.turn!==t0){refillPool();const ev=servTraitMonth();if(ev)log(ev);servPolicy();if(Q.length&&$("modal").hidden)showModal()}}catch(e){}return r}})();
/* for the measure only: a bot policy (window.__servPolicy = 'fire' looks at every servant and fires greedy and timid ones; 'keep' never fires) */
function servPolicy(){const pol=window.__servPolicy;if(pol!=="fire")return;for(const s of (S.staff||[]).slice()){if(!s.kn&&S.bac>=BAL.house.lookBac){apply({bac:-BAL.house.lookBac});s.kn=1}if(s.kn&&(netIs(s,"greed")||netIs(s,"timid"))&&S.bac>=BAL.house.swapBac){fireServ(S,s);S.firedN=(S.firedN||0)+1}}}
(function(){const c0=servCauses;servCauses=function(){const r=c0.apply(this,arguments);try{for(const s of (S.staff||[]))if(s.cause&&s.cause.w===wk()&&roll(50))servLearn(s,`Việc ${s.cause.txt}`)}catch(e){}return r}})();

/* AG-ALL-2f3: pay on success only (her and NPCs alike); a failed approach frightens the servant who carried the offer (jagknow tmFear) */
(function(){const b0=bribeServ;bribeServ=function(a,s){const cost=nv(s,"bribeCost");const was=s&&s.spyFor;const r=b0.apply(this,arguments);if(!r)return r;
 try{if(s.spyFor===key(a)&&was!==key(a)){ap(a,{bac:-cost});return r.replace(/\s*$/,"")+` (bạc ${balSg(-cost)}) `}const f=typeof tmFear==="function"?tmFear(a,1):"";return f?r.replace(/\s*$/,"")+` ${f}. `:r}catch(e){return r}}})();
