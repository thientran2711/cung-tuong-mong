/* ================= jagwhy1: NPC-PURPOSE G1 kinds — the stray man in the hậu cung (j22 affairs + jmen plans) =================
   Owner OD 18/11 ~04:08Z (no luck: the stray man must come from a real goal: a lover meeting, a secret letter, an admirer…) + OD:L188 (men's
   intrusions are plan-driven). Uses ONLY the jagwhy helper (npwReg / npcWhy / npwPick); numbers BAL.ag.why.{tryst,letter,seek,menGrudge}.
   affairs    an NPC consort's affair begins and is exposed only through her own day-plan steps and proof (role-parity part 2, jagacts4
              cx4:man* + j22 manCards / trystNpc / trystKnow): the old G1 kinds affair / affairOut were removed with the monthly rolls they replaced.
   tryst      jmen plan 1: the pair meet when their longing is strong enough: tryst.base + rove for a roving man − fear (Kín đáo); the gap between
              meetings is the old cadence, now BAL (tryst.cd = [roving, other] tuần).
   letter     jmen plan 2: the consort with the most urgent reason writes (letter.w per reason); once a season per consort (cd.letter).
   seek       jmen plan 4: an admirer goes in when his fancy is strong (seek.base + her looks above seek.sac); his gap = nv(m,"menGap") (BAL.net).
   menGrudge  jmen month: a spurned man spreads his rumour while his grudge lasts; gap = cd.menGrudge.
   ======================================================================================================================================= */
function npw1B(k){return BAL.ag.why[k]}
npwReg("tryst",{grp:"pair",cdOf:m=>{const C=npw1B("tryst").cd;return MEN_ROVE.some(t=>hasT(m,t))?C[0]:C[1]},who:c=>[c.m],
 why(m,c){const A=npw1B("tryst");/* lovers' longing (base) clears ag.why.min even for a careful (Kín đáo) pair: fear slows, never stops them */const s=A.base+(MEN_ROVE.some(t=>hasT(m,t))?A.rove:0)-((hasT(c.v,"Kín đáo")||hasT(m,"Kín đáo"))?A.fear:0);return {s,t:c.v,r:`hẹn hò với ${npwNm(c.v)}`}}});
npwReg("letter",{grp:"consort",who:c=>c.C,why(v){const W=npw1B("letter").w;const why=v.confined?"confined":v.plan?"plan":(v.preg&&v.hidden)?"preg":((v.sung||0)<npw1B("letter").jSung&&(v.ghen||0)>=npw1B("letter").jGhen)?"jealous":"";
  if(!why)return null;return {s:W[why],r:why}}});
npwReg("seek",{grp:"man",cdOf:m=>nv(m,"menGap"),who:c=>[c.m],why(m,c){const A=npw1B("seek");const v=c.v;if(!v)return null;const sac=typeof effSac==="function"?effSac(v):(v.sac||0);
  return {s:A.base+Math.max(0,sac-A.sac),t:v,r:`mê ${npwNm(v)}`}}});
npwReg("menGrudge",{grp:"man",who:()=>(S.men||[]).filter(m=>m.alive&&m.grudge==="me"&&m.grudgeN>0&&!(typeof menBanned==="function"&&menBanned(m))),
 why(m){return {s:npw1B("menGrudge").s,t:S,r:"ôm hận ngươi"}}});
/* ---- G1 part 2: weekly cards j3/j7 (makeDil, j3). Each card's actor = the person whose goal drives it; numbers BAL.ag.why.dil ----
   The gate is the game's ONE motive gate motiveOK (j95, OD:L35: grudge / jealousy / dislike ≥ 30, not fond of the target) with the act's own
   kind (DIL_K h = the P95B role of the card); s = BAL.ag.why.min + hostility (who hates most acts first). The j95b card check then passes them.
   meHarm    doll, poisongift, guardrumour, ghost, maidhostage, taster: a consort with a motive against her
   meAlly    pact: a consort with a reason to ally with her AND a motive against the Empress
   hhCane    caning: the Empress punishes the consort she has a motive against · hhMe vase: the Empress wants a pretext against her
   hhGreed   embezzle: only a greedy Empress (greedT nết) · empAsk tuyen: the Emperor, when the palace is thin
   coldAsk   coldletter, coldvisit: a fallen consort who trusts her · loveFound loveletter: a consort with a real lover (j22 affair), her tai mắt
   arson     fire / omen comet: a motive AND hostility ≥ arsonBar / omenBar (the heaviest deeds) · rvHarm rvframe/rvmusk/rvbribe, rvFeud rvquarrel */
function npw1Gr(v,t){const o=oan(v,t),a=Math.max(0,-aff(v,t))/2,g=t===S?(v.ghen||0)/npwB().div.grGhen:Math.max(0,((t.sung||0)-(v.sung||0))/3);const n=t===S?"ngươi":"nàng";
 if(o>=a&&o>=g&&o>0)return `ôm hận ${n}`;if(g>=a&&g>0)return t===S?"ghen với ân sủng của ngươi":"ghen vì nàng được sủng hơn";return `coi ${n} là cái gai trong mắt`}
function npw1Mot(v,t,h,bar){if(!v||!t||v===t||!motiveOK(v,t,h||"harm").ok)return null;const x=hostility(v,t);if(bar&&x<bar)return null;return {s:npwB().min+x,t,r:npw1Gr(v,t)}}
function npw1Best(v,L,h,bar){let b=null;for(const t of L){const o=npw1Mot(v,t,h,bar);if(o&&(!b||o.s>b.s))b=o}return b}
const DIL_K={doll:["meHarm","frame"],poisongift:["meHarm","harm"],guardrumour:["meHarm","rumor"],ghost:["meHarm","rumor"],maidhostage:["meHarm","uyhiep"],taster:["meHarm","poison"],
 pact:["meAlly","ally"],caning:["hhCane","harm"],coldvisit:["coldAsk"],fire:["arson","harm"],rvframe:["rvHarm","frame"],rvmusk:["rvHarm","musk"],rvbribe:["rvHarm","bribe"],
 rvquarrel:["rvFeud","provoke"],comet:["omen","harm"]};
const npw1Q=()=>qOn()?[rivals[0]]:[];
npwReg("meHarm",{grp:"consort",who:()=>liveRivals(false),why(v,c){return npw1Mot(v,S,c.h)}});
/* thdTaunt: j4 "thd" story step (a rival mocks her poems): same motive gate as meHarm (provoke) but its OWN cooldown (cd.thdTaunt), so the monthly story step
   and the weekly meHarm cards do not block each other (rates review 18/11, item 6) */
npwReg("thdTaunt",{grp:"consort",who:()=>liveRivals(false),why(v){return npw1Mot(v,S,"provoke")}});
npwReg("meAlly",{grp:"consort",who:()=>qOn()?liveRivals(false):[],why(v){const q=rivals[0];if(!motiveOK(v,S,"ally").ok||!motiveOK(v,q,"plot").ok||aff(v,S)<netTh(v,"than"))return null;
 return {s:npwB().min+(aff(v,S)+hostility(v,q))/2,t:S,r:"ghét Hoàng hậu mà tin ngươi"}}});
npwReg("hhCane",{grp:"queen",who:npw1Q,why(q,c){return npw1Best(q,liveRivals(false),c.h)}});
npwReg("hhMe",{grp:"queen",who:npw1Q,why(q){return npw1Mot(q,S,"harm")}});
npwReg("hhGreed",{grp:"queen",who:npw1Q,why(q){const D=npw1B("dil");const T=typeof traitsOf==="function"?traitsOf(q):[];return T.some(x=>D.greedT.includes(x))?{s:D.greed,r:"vốn tham của"}:null}});
npwReg("empAsk",{grp:"emp",who:()=>S.emp&&!S.empDead?[S.emp]:[],why(){const D=npw1B("dil").emp;if(typeof roomFor==="function"&&!roomFor("consort"))return null;
 return {s:(D.want-liveRivals(true).length)*D.k,r:"hậu cung còn thưa người"}}});
npwReg("coldAsk",{grp:"consort",who:()=>rivals.filter(v=>v.alive&&v.out),why(f){const C=npw1B("dil").cold;if(!motiveOK(f,S,"visit").ok)return null;
 return {s:C.base+Math.max(0,aff(f,S))*C.aff+(S.duc||0)*C.duc,t:S,r:"cùng đường, tin ngươi còn lòng thương"}}});
npwReg("loveFound",{grp:"consort",who:()=>liveRivals(false).filter(v=>v.affair&&manById(v.affair)),why(v){const L=npw1B("dil").love;return {s:L.base+eyes(S)*L.eye,t:manById(v.affair),r:"tư thông"}}});
npwReg("arson",{grp:"consort",who:()=>liveRivals(true),why(a,c){return npw1Best(a,liveRivals(false),c.h,npw1B("dil").arsonBar)}});
npwReg("rvHarm",{grp:"consort",who:()=>liveRivals(false),why(a,c){return npw1Best(a,liveRivals(false),c.h)}});
npwReg("rvFeud",{grp:"consort",who:()=>liveRivals(false),why(a,c){const x=npw1Best(a,liveRivals(false),c.h);if(!x)return null;x.s=(x.s+npwB().min+hostility(x.t,a))/2;return x}});
npwReg("omen",{grp:"consort",who:()=>liveRivals(true),why(a,c){return npw1Best(a,liveRivals(false).concat([S]),c.h,npw1B("dil").omenBar)}});
/* ---- G1 part 3: people who come to her door (j24 approachOne / approaches / servCauses / loans / the grudging servant). BAL.ag.why.ap ----
   apFriend  a consort who likes her (aff ≥ ap.fr, motiveOK visit): borrow when short of silver (bac < ap.poor), offer sisterhood when fond
             (aff ≥ ap.ally, no faction), bring a gift when fond (aff ≥ ap.gift), else chat · apTaunt a consort with a motive (provoke)
   apSorry   a consort who wronged her and is not scheming (oán ≥ ap.sorry, not Xảo quyệt, not hating her) · empTea the Emperor (Sủng ≥ tea.minSung)
   thCall    the Thái hậu when she favours her (Thái hậu ≥ netTh("th","quen")) · svAsk a loyal servant (lòng ≥ loy.mid) · maidWarn her loyal maid, about the
             most dangerous consort · manPoem a man with a pull toward her: tình ý, met her (m.seen), or a romantic nature · svDefect a maid unhappy with her mistress (lòng < loy.bad)
   repay     a debtor repays when she has the silver (bac ≥ ap.repay) · svSell a servant with a grudge sells news to the consort most set against her
   svCause   a servant's own nature shows (SCAUSE by nết), one servant a tuần, each every cd.svCause tuần */
const NPW1_TH={id:"th",name:"Thái hậu"};
function npw1ApSub(v){const A=npw1B("ap");const f=aff(v,S);if((v.bac||0)<A.poor)return "borrow";if(f>=netTh(v,"than2")&&!(typeof facOf==="function"&&facOf(v)))return "ally";if(f>=netTh(v,"than"))return "gift";return "gossip"}
const NPW1_APR={borrow:"túng bạc",ally:"muốn có chỗ dựa",gift:"quý ngươi",gossip:"muốn hàn huyên"};
npwReg("apFriend",{grp:"consort",who:()=>liveRivals(true).filter(v=>!v.confined),why(v){if(aff(v,S)<netTh(v,"quen")||!motiveOK(v,S,"visit").ok)return null;return {s:npwB().min+aff(v,S),t:S,r:NPW1_APR[npw1ApSub(v)]}}});
npwReg("apTaunt",{grp:"consort",who:()=>liveRivals(true).filter(v=>!v.confined&&bandVT(v,S)>=1&&mockOK(v,S)/* rank respect */),why(v){return npw1Mot(v,S,"provoke")}});
npwReg("apSorry",{grp:"consort",who:()=>liveRivals(true).filter(v=>!v.confined&&!hasT(v,"Xảo quyệt")),why(v){const A=npw1B("ap");const o=oan(v,S);if(o<netTh(v,"oan")||aff(v,S)<0)return null;return {s:npwB().min+o/2,t:S,r:"hối chuyện cũ"}}});
npwReg("empTea",{grp:"emp",who:()=>{const VT=BAL.visit.tea;return S.emp&&S.sung>=VT.minSung&&!S.out&&!(window.agDOn&&agDOn())?[S.emp]:[]},why(){return {s:npwB().min+S.sung-BAL.visit.tea.minSung,t:S,r:"nhớ ngươi"}}});
npwReg("thCall",{grp:"th",who:()=>!S.thDead&&S.th>=netTh("th","quen")?[NPW1_TH]:[],why(){return {s:npwB().min+S.th/npwB().div.thCall,t:S,r:"muốn có người hầu chuyện"}}});
npwReg("svAsk",{grp:"srv",who:()=>(S.staff||[]).filter(s=>(s.loyal||0)>=BAL.loy.mid),why(s){return {s:npwB().min+((s.loyal||0)-BAL.loy.mid)/2,t:S,r:"nhà có việc ngặt"}}});
npwReg("maidWarn",{grp:"srv",who:()=>S.maid&&S.maid.loyal>=BAL.loy.firm?[S.maid]:[],why(){let b=null,d=-1;for(const v of liveRivals(true)){const x=danger(v,S);if(bandCut(v,x)>=2&&x>d){d=x;b=v}}return b?{s:npwB().min+d,t:b,r:"thấy người bên ấy dò hỏi"}:null}});
npwReg("manPoem",{grp:"man",shared:true,who:()=>(S.men||[]).filter(m=>m.alive&&((m.tinh||0)>=npw1B("ap").poem||m.seen!=null||MEN_FANCY.some(t=>hasT(m,t)))&&!(typeof menBanned==="function"&&menBanned(m))),why(m){/* a man who has a pull toward her (no pull → no poem): his tình ý for her, + met her (m.seen), + a romantic nature (MEN_FANCY); shared cd: one stray poem at a time in the palace */
 const A=npw1B("ap"),t=m.tinh||0,f=MEN_FANCY.some(x=>hasT(m,x));return {s:npwB().min+t+(m.seen!=null?A.poemSeen:0)+(f?A.poemFancy:0),t:S,r:t>=A.poem?"đem lòng thương ngươi":f?"tính đa tình, mến ngươi":"từng trông thấy ngươi, sinh lòng mến mộ"}}});
npwReg("svDefect",{grp:"srv",who:()=>{const L=[];for(const v of liveRivals(true))for(const s of (v.staff||[]))if(s.role==="maid"&&s.loyal<BAL.loy.bad&&s.spyFor!=="me")L.push(s);return L},
 why(s){const v=liveRivals(true).find(x=>(x.staff||[]).includes(s));return v?{s:npwB().min+(BAL.loy.bad-s.loyal),t:v,r:"bất mãn với chủ"}:null}});
npwReg("repay",{grp:"consort",who:c=>c.v?[c.v]:[],why(v){return (v.bac||0)>=npw1B("ap").repay&&aff(v,S)>=0?{s:npwB().min,t:S,r:"giữ chữ tín"}:null}});
npwReg("svSell",{grp:"srv",who:c=>c.g?[c.g]:[],why(g){let t=null,m=-1;for(const v of liveRivals(true)){const o=npw1Mot(v,S,"spy");if(o&&o.s>m){m=o.s;t=v}}/* the buyer = the rival who most wants her secrets */return t?{s:npwB().min+(BAL.loy.out-(g.loyal||0)),t,r:"ôm hận ngươi phạt oan"}:null}});
npwReg("svCause",{grp:"srv",who:()=>(S.staff||[]).filter(s=>!s.cause),why(s){return {s:npwB().min,t:S,r:"tính nết"}}});
/* ---- G1 part 4: life events (j68 actors / tick / visit swap, j68e/f/h) and favours (j72 NPC↔NPC, Thái hậu / Hoàng hậu errands, debts). BAL.ag.why.{e68,fav,job,q72} ----
   npcFavor   a consort asks a friend (aff ≥ fav.aff) for help only with a NEED of her own (fav.w by need: short of silver, ill, an errand to do, cold
              Thái hậu, a rival to watch, with child, a lover's letters, a maid's fault, a weak art, homesick when unfavoured); the helper fits the need
   ladyJob    the Thái hậu / Hoàng hậu give an errand to the consort they trust (Thái hậu: regard ≥ netTh("th","than"); Hoàng hậu: liking ≥ job.aff); the task
              follows the palace (someone ill → visit her; a gifted one → the banquet; else copying sutras / embroidery)
   q72Collect one she owes comes to collect when there is a matching need now (a valid request of that kind), the bigger the debt the sooner */
function npw1Fr(a,L,f){return npwPick(L.filter(b=>b!==a&&aff(a,b)>=netTh(a,"quen")&&(!f||f(b))),b=>netTh(a,"quen")+aff(a,b))}
function npw1Need(a){const F=npw1B("fav"),W=F.w,O=[];const rv=liveRivals(true).filter(x=>x!==a);
 if((a.bac||0)<npw1B("ap").poor)O.push([W.poor,3]);if(a.ill)O.push([W.ill,6]);if(a.q72job!=null&&wk()-a.q72job<=F.jobW)O.push([W.job,0]);
 if((a.th||0)<netTh("th","than"))O.push([W.th,4,b=>(b.th||0)>=netTh("th","than")]);
 let foe=null,h=0;for(const x of rv){const y=hostility(a,x);if(y>h){h=y;foe=x}}if(foe&&h>=netTh(a,"host"))O.push([W.spy,2,b=>b!==foe&&aff(b,foe)<netTh(b,"quen")]);
 if(a.preg)O.push([W.preg,1]);if(a.affair)O.push([W.love,5]);if((a.staff||[]).some(s=>(s.loyal||50)<BAL.loy.bad))O.push([W.maid,9]);
 if((a.tai||0)<F.tai)O.push([W.art,7,b=>(b.tai||0)>=F.taiB]);if((a.sung||0)<F.home)O.push([W.home,8]);return O.sort((x,y)=>y[0]-x[0])}
npwReg("npcFavor",{grp:"consort",who:c=>c.L,why(a,c){for(const n of npw1Need(a)){const b=npw1Fr(a,c.L,n[2]);if(b)return {s:n[0],t:b,r:NPCQ72[n[1]]}}return null}});
function npw1Job(lady,v){const J=npw1B("job");if(liveRivals(true).some(x=>x!==v&&x.ill))return "thăm người ốm";if((v.tai||0)>=J.tai)return "lo việc yến";return lady===NPW1_TH?"chép kinh":"thêu bình phong"}
npwReg("ladyJob",{grp:"lady",who:()=>{const L=[];if(!S.thDead)L.push(NPW1_TH);const q=typeof queenP==="function"?queenP():null;if(q&&q!==S)L.push(q);return L},
 why(lady,c){const J=npw1B("job");const L=c.L.filter(v=>!v.queen&&v!==lady);
  const v=lady===NPW1_TH?npwPick(L.filter(v=>(v.th||0)>=netTh("th","than")),v=>v.th):npwPick(L.filter(v=>aff(lady,v)>=netTh(lady,"quen")),v=>aff(lady,v));
  return v?{s:npwB().min+(lady===NPW1_TH?v.th:aff(lady,v))/2,t:v,r:npw1Job(lady,v)}:null}});
npwReg("q72Collect",{grp:"debt",who:c=>c.C,why(c){return {s:npwB().min+c.n*npw1B("q72").debt,r:"cần đến ân tình ngươi còn nợ"}}});
/* ---- G1 part 5: an NPC's day with the Emperor (jgift) and the wardrobe (j92). BAL.ag.why.{seekEmp,wd} ----
   seekEmp    a consort seeks the Emperor's company when she wants favour: (want − Sủng) × k + amb for an ambitious nết; the act is her best art
   wdRemark   who remarks on an outfit: the Thái hậu when it breaks the rules (or praises one she regards ≥ wd.thOk); a consort who BELIEVES it
              wrong and bears the wearer a grudge (hostility ≥ wd.host), or believes it right and likes her (liking ≥ wd.fr); the Empress keeps the
              rules (any wrong outfit). Same wearer at most every wd.gap tuần
   wdSpy      her tai mắt digs at Nội vụ phủ only for a consort who is set against her, the most hostile first
   wdDress    a consort changes her clothes when she believes they are wrong, or for a festival · wdNotice the Emperor notices a bright outfit
              on the one he favours (Sủng ≥ wd.notice) · wdSearch a framed consort searches her room first when she is watchful (tai mắt) or
              distrusts her accuser · wdPawn a consort short of silver (bac < wd.poor) pawns a piece */
npwReg("seekEmp",{grp:"consort",who:()=>liveRivals(false).filter(v=>v&&!v.coop&&!v.out&&!v.confined),why(v){const E=npw1B("seekEmp");
 const s=(E.want-(v.sung||0))*E.k+(traitsOf(v).some(t=>E.ambT.includes(t))?E.amb:0);return s>0?{s,t:S.emp||null,r:"mong được Hoàng thượng đoái hoài"}:null}});
function npw1Art(v){const a=v.arts||{};return (a.ky||0)>=1&&(a.ky||0)>=(a.cam||0)?"ky":(a.cam||0)>=1?"cam":"walk"}
npwReg("wdRemark",{grp:"wd",pickAll:true,who:c=>{const L=others(c.p).filter(v=>v!==S&&v.alive&&!v.out&&!v.confined);if(!S.thDead)L.unshift(NPW1_TH);return L},
 why(x,c){const W=npw1B("wd"),p=c.p,st=c.st;
  if(x===NPW1_TH){if(st!=="ok")return {s:npwB().min+W.th,t:p,r:"giữ lễ chế trong cung",k:st};const g=p===S?S.th:(p.th||0);return g>=W.thOk?{s:npwB().min+g/2,t:p,r:"quý người biết giữ lễ",k:st}:null}
  const q=queenP();const sure=x===q||["tram","y"].every(sl=>{const e=wdOf(p)[sl];return !e||((x.wdk||{})[e.k])});const view=sure?st:wdBelStatus(x,p);
  if(x===q&&view!=="ok")return {s:npwB().min+W.queen,t:p,r:"giữ phép trong hậu cung",k:view};
  if(view!=="ok"){const h=hostility(x,p);return h>=netTh(x,"host")?{s:npwB().min+h,t:p,r:npw1Gr(x,p),k:view}:null}
  const f=aff(x,p);return f>=netTh(x,"than")?{s:npwB().min+f/2,t:p,r:"quý nàng",k:view}:null}});
function wdNpwGap(p){return wk()>=(p.wdRmW||0)}
function wdNpwR(p,o){p.wdRmW=wk()+npw1B("wd").gap;const x=o.who;if(x===NPW1_TH)return{name:"Thái hậu",face:pTH(),sure:true,th:true,why:o.why};const q=queenP();
 return{v:x,name:wdNm(x),face:pv(x),why:o.why,sure:x===q||["tram","y"].every(sl=>{const e=wdOf(p)[sl];return !e||((x.wdk||{})[e.k])})}}
npwReg("wdSpy",{grp:"srv",who:c=>c.w?[c.w]:[],why(w,c){const b=npwPick(c.cand,z=>Math.max(0,hostility(z[0],S)-netThK(z[0],"host","hostLo")));return b?{s:npwB().min+hostility(b[0],S),t:b[0],r:"dò kẻ có ý hại ngươi",k:b}:null}});
npwReg("wdDress",{grp:"consort",who:c=>[c.v],cdOf:()=>0,why(v){const b=wdBelStatus(v,v);if(b!=="ok")return {s:npwB().min+npw1B("wd").dress,r:"thấy y phục mình chưa hợp"};return (typeof wdFest==="function"&&wdFest())?{s:npwB().min,r:"sửa soạn cho ngày lễ"}:null}});
npwReg("wdNotice",{grp:"emp",who:()=>S.emp&&!S.empDead?[S.emp]:[],cdOf:()=>0,why(e,c){const g=c.p===S?S.sung:(c.p.sung||0);return g>=npw1B("wd").notice?{s:npwB().min+g/2,t:c.p,r:"để mắt tới người mình sủng"}:null}});
npwReg("wdSearch",{grp:"consort",who:c=>[c.t],cdOf:()=>0,why(t,c){const W=npw1B("wd");const e=eyes(t)*W.eye,h=hostility(t,c.a);return (e>=W.eyeBar||h>=netTh(t,"host"))?{s:npwB().min+e+h/2,t:c.a,r:e>=W.eyeBar?"vốn tinh ý":"không tin kẻ tố mình"}:null}});
npwReg("wdPawn",{grp:"consort",who:()=>liveRivals(true).filter(v=>(v.bac||0)<npw1B("wd").poor),why(v){return {s:npwB().min+(npw1B("wd").poor-(v.bac||0)),r:"túng bạc"}}});
/* ---- G1 part 6: jts (closing doors, summons fallback, lanterns), jtsb (bullying, complaints, fire warnings, the mocker), j8 (mercy, midwife plot,
   maid sold out, gift checks, feigned illness / pregnancy, new recruit, Cung Chính ti raid). BAL.ag.why.{ts,bul,j8} ----
   tsGuard    a consort many want to harm closes her doors when her own care (nết tsCare) + the danger above the bar push her enough
   empSummon  (only when the AG-ALL day plan is off) the Emperor in a good mood calls the one he favours most (tsSummonW)
   tsDen      a consort floats a lantern when she wants his favour ((want − Sủng) × k) or is devout (Đức ≥ ts.duc)
   bulWant    a bully takes a THING instead of silver when the target cannot pay or she covets it (a greedy / vain nết)
   bulTell    a bullied consort takes proof to the Empress when she trusts her (liking ≥ 0) and resents the bully (hostility ≥ bul.host)
   fireHeed   a warned consort has the warning as her reason (tai mắt / Đức make it stronger); she keeps the candles safe by the done roll bul.fire.heed
   empMercy   a merciful Emperor (nhân từ) spares the one he still favours (Sủng × k + children × kid ≥ min)
   birthPlot  a midwife is planted by the one with the strongest motive (motiveOK harm + hostility ≥ j8.birthBar); she gets her in by the done roll j8.birthP · maidSell an unhappy maid sells
   giftCheck  a consort checks her gifts when she has some unchecked and fears someone (tai mắt + the worst hostility toward her)
   fakeIll / fakePreg  a cunning consort (Tâm cơ) feigns illness to draw a visit when unfavoured, or a pregnancy when she has no son and fears for her place
   raid       Cung Chính ti searches a palace only when it holds forbidden goods AND someone who resents her reports it (npcTell); it acts on the report by the done roll j8.raidGo */
npwReg("tsGuard",{grp:"consort",who:c=>[c.v],cdOf:()=>0,why(v){const D=tsDangerOf(v,false);if(D.n<BAL.tsDanger.act)return null;
 return {s:nv(v,"tsCare")/2+(D.n-BAL.tsDanger.act)*npw1B("ts").guardK,r:"sợ bị hại"}}});
npwReg("empSummon",{grp:"emp",who:()=>S.emp&&!S.empDead?[S.emp]:[],why(e,c){const t=npwPick(c.C,tsSummonW);return t?{s:npwB().min*tsMoodW()*npw1B("ts").moodK,t,r:"nhớ người mình sủng"}:null}});
npwReg("tsDen",{grp:"consort",who:()=>liveRivals(true),why(v){const T=npw1B("ts");const w=(v.sung||0)<T.want?T.denB+(T.want-(v.sung||0))*T.k:0,d=(v.duc||0)>=T.duc?T.pray:0;const s=Math.max(w,d);return s>0?{s,r:w>=d?"cầu thánh ân":"cầu phúc"}:null}});
npwReg("bulWant",{grp:"consort",who:c=>[c.a],cdOf:()=>0,why(a,c){const w=tsbWant(a,c.t);if(!w)return null;const tr=traitsOf(a);const B=npw1B("bul");
 return (tsbBulPay(a,c.t)<B.pay||tr.some(x=>B.wantT.includes(x)))?{s:npwB().min,t:c.t,r:"thèm của",k:w}:null}});
npwReg("bulTell",{grp:"consort",who:c=>[c.t],cdOf:()=>0,why(t,c){const q=queenP();if(!q||q===c.a||q===t||aff(t,q)<0)return null;const h=hostility(t,c.a);return h>=netThK(t,"host","hostMid")?{s:npwB().min+h/2,t:q,r:"bị ép quá nhiều lần"}:null}});
npwReg("fireHeed",{grp:"consort",who:c=>[c.p],cdOf:()=>0,why(p){/* G1 #9 (RE-CHECK 3 item 1): the warning she really got is the reason (every warned consort has it); tai mắt / Đức make it stronger; whether she keeps the candles safe = done roll bul.fire.heed (the old roll 60) */const F=npw1B("bul").fire;return {s:npwB().min+eyes(p)*F.eye+(p.duc||0)*F.duc,r:"được báo đèn nến"}}});
npwReg("empMercy",{grp:"emp",who:()=>S.emp?[S.emp]:[],cdOf:()=>0,why(e,c){const J=npw1B("j8");const p=c.p;const g=p===S?S.sung:(p.sung||0);const k=(p===S?(S.kids||[]):(p.kids||[])).filter(x=>x&&x.alive!==false).length;
 return {s:g*J.mercyK+k*J.kid,t:p,r:"còn nhớ tình xưa"}}});
npwReg("birthPlot",{grp:"consort",who:c=>c.bad,cdOf:()=>0,why(x,c){return npw1Mot(x,c.p,"harm",npw1B("j8").birthBar)}});
npwReg("maidSell",{grp:"srv",who:c=>[c.m],why(m){return {s:npwB().min+(BAL.loy.warn-(m.loyal||0)),r:"bất mãn với chủ"}}});
npwReg("giftCheck",{grp:"consort",who:c=>[c.v],why(v){if(!(v.inv||[]).some(e=>!e.h))return null;const J=npw1B("j8");let f=0;for(const x of liveRivals(true))if(x!==v)f=Math.max(f,hostility(x,v));
 const s=eyes(v)*J.eye+f/2;return s>0?{s,r:"đề phòng kẻ hại mình"}:null}});
npwReg("fakeIll",{grp:"consort",who:c=>[c.v],why(v){const J=npw1B("j8");return (v.tamco||0)>=J.illTam&&(v.sung||0)<J.want?{s:J.fakeB+(J.want-(v.sung||0))*J.k,r:"giả bệnh để Hoàng thượng đến thăm"}:null}});
npwReg("fakePreg",{grp:"consort",who:c=>[c.v],why(v){const J=npw1B("j8");const w=(v.sung||0)<J.want?J.fakeB+(J.want-(v.sung||0))*J.k:0,u=rkOf(v)>=J.pregRk?J.fakeB+J.pregUp:0;return (v.tamco||0)>=J.pregTam&&(w||u)?{s:Math.max(w,u),r:"giả có thai để giữ chỗ đứng"}:null}});
npwReg("raid",{grp:"court",who:c=>[c.p],why(p){const bad=(p.inv||[]).filter(e=>(IT[e.k]&&itm(e.k).il)||(e.t&&TAINT[e.t]&&TAINT[e.t].il));if(!bad.length)return null;
 const tl=npcTell(p,{from:npwIn(p),to:queenP()||S.emp||S});/* only those who see inside her house (same palace / their tai mắt serve her) know what she hides */return tl?{s:npwB().min+bad.length*npw1B("j8").raidK,t:tl.who,r:`bị ${npwNm(tl.who)} tố giác`}:null}});
/* ---- G1 part 7: the stray man's leftovers (j22 / jmen). BAL.ag.why.j22 ----
   kspCheck   the one who checks the Kính sự phòng book against her pregnancy: the Empress or a foe, by grudge (hostility ≥ j22.host; + ksp when the
              eunuchs already talk) · trystKnow a foe learns of a secret meeting through her own tai mắt (tai mắt × eye + grudge / 2)
   taimat     her own tai mắt (a loyal servant) bring her a rival's secret when they are sharp enough (her tai mắt × eye ≥ min) */
npwReg("kspCheck",{grp:"consort",who:c=>c.C,why(x){const J=npw1B("j22");const h=hostility(x,S)+(S.ksKnows?J.ksp:0);return h>=netTh(x,"host")?{s:h,t:S,r:"nghi cái thai của ngươi"}:null}});
npwReg("trystKnow",{grp:"consort",who:c=>c.C,why(x,c){const J=npw1B("j22");const t=c.v||S;const s=eyes(x)*J.eye+Math.max(0,hostility(x,t))/2;return {s,t,r:"tai mắt nàng ta dò ra"}}});
npwReg("taimat",{grp:"srv",who:c=>c.w?[c.w]:[],cdOf:()=>0,why(w,c){/* her own people look out for her (j22: the loyal watcher, watcher() lòng ≥ BAL.loy.close, first; else her maid / a servant of her house — G1 #9: with the watcher only, 2 asks in 12 lives): serving her is the reason; tai mắt make it stronger; the finding itself = done roll (j22.see + eyes × seeEye, the old odds) */return {s:npwB().min+eyes(S)*npw1B("j22").eye,t:c.v,r:"tai mắt dò được"}}});
/* ---- G1 part 8: the origin story lines (j4 STORY month timers). BAL.ag.why.story ----
   story      an off-screen person of her story (father, the old mistress, the envoy, the Empress's clan, the foe's father) acts on HIS plan: his push
              grows with the tuần since the last step (min × elapsed / story.wait[key]); the Empress's clan (ch) also needs her motive against her.
              npw1Sc(st, key, o) starts the clock (old saves: first month only starts it) and returns the ctx for npcWhy("story", …);
              the clock restarts on every fire (def.on), so a step that may repeat (dad, td1, cn3, suitor) waits story.wait[key] again
   mock       a consort mocks her low birth only with a motive (motiveOK provoke) */
const NPW1_ST={id:"story",name:"người trong truyện"};
function npw1Sc(st,key,o){const k="at_"+key;if(st[k]==null)st[k]=wk();return Object.assign({st,key,k},o||{})}
npwReg("story",{grp:"story",who:()=>[NPW1_ST],cdOf:()=>0,on(o,c){if(c&&c.st&&c.k)c.st[c.k]=wk()},why(a,c){const W=npw1B("story").wait;const n=wk()-(c.st[c.k]==null?wk():c.st[c.k]);
 if(c.q&&!motiveOK(c.q,S,"harm").ok)return null;return {s:npwB().min*n/(W[c.key]||W._),t:S,r:"đến lúc ra tay"}}});
/* heirName  Hoàng thượng names an heir (j51 heirMonth): his push grows with the tuần he has weighed it since a son of six or more first stood
              (S.kvHW, lazy) — min × elapsed / g3.heir.go (g3.heir.wait while a đích son is still small) + g3.heir.age per year of the eldest above six */
npwReg("heirName",{grp:"court",who:()=>S.emp?[S.emp]:[],cdOf:()=>0,on(){S.kvHW=null},why(e,c){const H=BAL.ag.why.g3.heir;const n=wk()-(S.kvHW==null?wk():S.kvHW);
 const a=Math.max(0,...(c.c||[]).map(x=>(x.k.age||0)-6));return {s:npwB().min*n/(c.wait?H.wait:H.go)+a*H.age,r:"ngài đã cân nhắc đủ lâu"}}});
/* tyCall    a sick or expectant consort sends for the thái y (j95 day plan): s = need = (with child ? g3.ty.preg : 0) + 100 − Sức; once per cd.tyCall tuần each */
npwReg("tyCall",{grp:"consort",who:c=>c.sick||[],why(v){const s=(v.preg?BAL.ag.why.g3.ty.preg:0)+100-(v.suc||80);return {s,r:v.preg?"bắt mạch an thai":"người yếu sức"}}});
npwReg("mock",{grp:"consort",who:()=>liveRivals(true),why(v){return npw1Mot(v,S,"provoke")}});
/* ---- G1 part 9: j21 (a consort calls at her palace), j54 (a suitor for a princess), j71 (festival cast, merit deeds), j75 (night prep, pillow talk,
   sending a maid, a family's gifts against a monopoly, the quiet favour seen). BAL.ag.why.{call,suitor,f7,j75} ----
   callMe     a consort calls at her palace only with a reason (the apFriend / apTaunt reasons), at most once every call.gap tuần
   suitor     a great house seeks the princess for its son: the clock of its plan (story wait "suitor"); the son = the best house (tier 0 first) and gift
   f7Enter    a consort enters a festival contest when she wants his eye: (want − Sủng) × k + her art × art + amb (ambitious nết); she spends on
              preparation when that push ≥ f7.prep · f7Gamble the one who gambles: greedy or short of silver · f7Host the richest one hosts when she
              wants a name (danh under f7.danh) · f7Merit a consort does a merit deed when she seeks name / rank (Đức / Danh / amb); the deed = the first
              one the palace needs now (each deed checks its own need)
   nightPrep  a consort spends on her night when she wants favour (or is ambitious) · pillowTalk the fallback (agent layer off): motiveOK rumor
   sendMaid   the fallback (jagmaid off): she sends her maid to serve when she cannot (with child / ill) and fears losing him
   famGift    the family of the most neglected consort sends gifts against the monopoly ((want − Sủng) × k) */
npwReg("callMe",{grp:"consort",who:()=>liveRivals(true).filter(v=>!v.confined&&!sameHouse(S,v)),why(v){return NPW.reg.apFriend.why(v,{})||NPW.reg.apTaunt.why(v,{})}});
npwReg("suitor",{grp:"house",who:c=>c.F,cdOf:()=>0,why(s){const U=npwB().suitor;return {s:npwB().min+(U.tiers-(s.tier||0))*U.tierK+(s.tai||0)/U.taiDiv,r:"nhà hắn muốn kết thông gia"}}});
function npw1F7(v){const F=npw1B("f7");const a=Math.max(0,...Object.values(v.arts||{0:0}));return (F.want-(v.sung||0))*F.k+a*F.art+(traitsOf(v).some(t=>F.ambT.includes(t))?F.amb:0)}
npwReg("f7Enter",{grp:"consort",who:c=>c.NP,cdOf:()=>0,why(v){const s=npw1F7(v);return s>0?{s,r:"muốn được Hoàng thượng để mắt"}:null}});
npwReg("f7Gamble",{grp:"consort",who:c=>c.L,cdOf:()=>0,why(v){const F=npw1B("f7");const g=traitsOf(v).some(t=>npw1B("dil").greedT.includes(t))?F.greed:0;const s=g+Math.max(0,F.poor-(v.bac||0));return s>0?{s,r:g?"vốn ham của":"túng bạc"}:null}});
npwReg("f7Host",{grp:"consort",who:c=>c.H,cdOf:()=>0,why(v){const F=npw1B("f7");const s=(F.danh-(v.danh||0))*F.k+(traitsOf(v).some(t=>F.ambT.includes(t))?F.amb:0);return s>0?{s,r:"muốn nổi danh"}:null}});
npwReg("f7Merit",{grp:"consort",shared:true,who:c=>c.L,why(v){const F=npw1B("f7");const s=(v.duc||0)*F.duc+Math.max(0,F.danh-(v.danh||0))*F.k+(traitsOf(v).some(t=>F.ambT.includes(t))?F.amb:0);return s>0?{s,r:"muốn lập công"}:null}});
npwReg("nightPrep",{grp:"consort",who:c=>[c.v],cdOf:()=>0,why(v){const J=npw1B("j75");const s=(J.want-(v.sung||0))*J.k+(traitsOf(v).some(t=>npw1B("f7").ambT.includes(t))?J.amb:0);return s>0?{s,r:"muốn giữ ân sủng"}:null}});
npwReg("pillowTalk",{grp:"consort",who:c=>[c.v],cdOf:()=>0,why(v){return npw1Mot(v,S,"rumor")}});
npwReg("sendMaid",{grp:"consort",who:c=>[c.v],why(v){return (v.preg||v.ill)&&(v.sung||0)>=npw1B("j75").maidSung?{s:npwB().min+(v.sung||0)/npwB().div.sendMaid,r:"không hầu được, sợ mất ân sủng"}:null}});
/* admon      the Empress (else the Thái hậu) admonishes him over a monopoly (agent layer off): push = nights hogged in six × j75.admK (the gap = BAL.tw.g.admonCd) */
npwReg("admon",{grp:"court",who:c=>c.W||[],cdOf:()=>0,why(w,c){return {s:(c.n||0)*npw1B("j75").admK,t:c.p,r:"mưa móc đều khắp"}}});
npwReg("famGift",{grp:"house",who:c=>c.L,why(x){const J=npw1B("j75");const g=x===S?S.sung:(x.sung||0);const s=(J.mono-g)*J.k;return s>0?{s,t:x,r:"thấy con gái bị lạnh nhạt"}:null}});
/* ---- G1 part 10: lies about her (j95b). BAL.ag.why.lie ----
   exposeMe   one who holds proof of her real harm tells the victim when her grudge is strong enough (motiveOK expose + hostility ≥ lie.expose)
   lieMe      a consort with a motive spreads a lie about her (motiveOK rumor; s + her nết rumorP + malice) · blameMe / frameMe a spreader / plotter
              pushes the blame onto her only with a motive and hostility ≥ lie.blame / lie.frame. Listener = the one the spreader trusts who likes her
              least (j95bListener npwPick); re-picked actors = the strongest motive among those who pass the gate */
npwReg("exposeMe",{grp:"consort",who:c=>[c.x],why(x){return npw1Mot(x,S,"expose",netThK(x,"host","hostMid"))}});
npwReg("lieMe",{grp:"consort",who:c=>[c.x],why(x){const o=npw1Mot(x,S,"rumor");if(!o)return null;o.s+=nv(x,"rumorP")+(x.malice||0)/npwB().div.lieMal;return o}});
npwReg("blameMe",{grp:"consort",who:c=>[c.a],why(a){return npw1Mot(a,S,"rumor",netTh(a,"host"))}});
npwReg("frameMe",{grp:"consort",who:c=>[c.a],why(a){return npw1Mot(a,S,"frame",netTh(a,"host"))}});
