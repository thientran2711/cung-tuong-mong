/* ================= jbal2: late balance knobs for the merged logic modules (review/balance). Same rule for every consort; numbers only. ================= */
Object.assign(BAL,{illAdd:1,illDie:2});
/* ACT SPLIT (jact wave 1, jact2 waves 2-3; owner-approved split 16/11). "!" happenings on Dư đồ: hapP = chance of a random happening in a buổi,
   hap2 = chance of a second one (never more than 2 per buổi); strollP = chance the Emperor's garden stroll takes the FIRST slot when he is in
   Ngự hoa viên (flag 2 of the wave-1 report: it was 9 in 300 buổi); rareMinGrade = Nội vụ phủ weekly rare item grade.
   Night (the last buổi): nightSneak = odds added to "Lẻn vào" (fewer guards), nightCaught = extra Danh lost when caught (a gain and a loss). */
Object.assign(BAL,{ad:{hapP:65,hap2:35,strollP:80,rareMinGrade:3,nightSneak:10,nightCaught:-4}});
/* KHẢO HẠCH TẤN PHONG (jexam, owner 15/11 17:20Z): win = tuần she has to sit it once eligible; cd[to] = months before a retry after a fail or a
   missed window, by the target rank (1 Thường tại … 7 Hoàng hậu); bar[tier] = pass mark out of ~90 (tier 0 low = to 1–3, 1 middle = to 4–5,
   2 high = to 6–7); score = mean round (0–10) × wPlay + two Tứ đức courses × wVir + one art level (high: Đức/20) × wArt; the examiner's
   attitude (Hoàng hậu / Thái hậu, −100..100) / attDiv moves the bar by at most attMax; k khắc + suc Sức to sit; mc = draws for the odds word. */
/* balance-pass 15/11: bar [22,27,31] -> [22,25,28]: at a sensible player's level (arts 1-2, Đức 45-60) the mid exam passed 52-56 % and the
   high one 27-40 % (cooldown 3 months), so Quý phi -> Hoàng hậu took years; now mid ~75-93 %, high ~64-72 % (the odds the exam was designed
   for, PROGRESS_promo-exam). dev/tmp probe: exChance at ranks 0/3/5. */
BAL.ex={win:2,cd:[1,1,1,1,2,2,3,3],bar:[22,25,28],wPlay:6,wVir:2,wArt:2,attDiv:10,attMax:6,k:2,suc:8,mc:240,
 /* servant / ma ma road (review/promo-rules; maid-ladder-6: six rungs): bar and wait by target, index 1..5 = SRK.maid rank, 6 = ma ma (BAL.srvRk.mama) */
 srvBar:[0,18,19,20,22,24,24],srvCd:[1,1,1,1,2,2,3]};
/* NO-WORD-GAMES family C (jnwq, owner 16/11 07:20Z): the four promotion-exam games (le lay · tc sort · xa clue · thq seat). tier = level tier 0..2 (+shift;
   review/mg-balance's mgTier overrides when present); free = first tier with free placement judged on «Xong» (below it a drop is checked at once);
   n = pieces per round by tier; rounds; lim = seconds per round by tier (rounds × lim stay under the 97 s game guard); idle = seconds before the quiet auto-hint
   (0 = none); hint / auto = score cost of the Gợi ý button / the auto-hint; miss = cost per wrong drop; xaMiss = cost per wrong accusation (2 points a case); xaFloor = least a solved case keeps (review/mg-snap: was a typed .4, blind tapping always ended on the culprit);
   clues = evidence pictures per case by tier; peek = seconds the model stays when it hides (tier 2). Raw score stays 0..10 like every j82 game. */
BAL.nwq={shift:0,free:2,hint:.5,auto:.25,miss:.8,xaMiss:.9,xaFloor:0,peek:8,idle:[9,14,0],clues:[2,2,3],
 n:{le:[3,4,5],tc:[5,6,8],thq:[4,5,6],xa:[3,4,5]},rounds:{le:3,tc:2,thq:3,xa:5},
 lim:{le:[30,30,28],tc:[45,45,42],thq:[30,30,28],xa:[14,10,8]}};/* xa 18/17/15 → 14/10/8 (review/mg-tune: a case is seen in ~3 s; the time part needs a limit near the play) */
/* sickness in the palace: each month a healthy consort may also fall ill (illAdd %), and a critical illness kills a little more often (illDie × the illness' own death weight) */
(function(){const i0=illMonthP;illMonthP=function(p){let ev=i0.apply(this,arguments);
 try{if(!p||p.dead||p.alive===false||(p===S&&S.dead))return ev;const i=illOf(p);
  if(!i){if(BAL.illAdd&&roll(BAL.illAdd)){const sea=SEASON[S.month-1];const L=Object.entries(ILL).filter(([k,d])=>d.sea&&d.sea.includes(sea));ev+=catchIll(p,L.length&&roll(60)?pick(L)[0]:pick(["lao","phonghan","sotret"]))}}
  else{const d=ILL[i.k];if(i.st===3&&d.die&&BAL.illDie&&roll(25*d.die*BAL.illDie)){if(p===S){die(`${d.n} nguy kịch, không qua khỏi`);return ev}p.alive=false;if(p.queen)p.queen=false;ev+=`<span class="r">${p.name} mất vì ${d.n.toLowerCase()}.</span> `}}}catch(e){}
 return ev}})();
/* contests (j71) score every entrant's skill part with the j82/j91 rule: the mini-game raw (0–10) rolled by her/his own art level (kg82NpcRaw), scaled to J71.luck;
   she still plays herself when she chooses to (her.score). The odds words use the same distribution. One two-way rule for every contest table. */
(function(){if(typeof kg82NpcRaw!=="function"||typeof cScore7!=="function")return;
 const raw7=(p,kind)=>{try{return kg82NpcRaw(p,kind)}catch(e){return Math.round(Math.random()*10)}};
 const smp7=(p,kind,r)=>{let m=5;try{m=kg82NpcMean(kg82LvFor(p,kind))}catch(e){}const u=(r()+r()+r())/3;return cl(Math.round(m+(u-.5)*8),0,10)/10*J71.luck};
 cScore7=function(E,kindOf,prep,meB,her){return E.map(p=>{const kind=kindOf(p);if(p===S&&her&&her.score!=null)return{p,kind,t:Math.round(her.score),pr:0,lk:0,s:Math.round(her.score),mg:1};
  const t=Math.round(SC7[kind].f(p));let pr=0;if(p===S)pr=meB;else if(prep.includes(p.id)&&(p.bac||0)>=20){ap(p,{bac:-20});pr=J71.prep}const lk=Math.round(raw7(p,kind)/10*J71.luck);return{p,kind,t,pr,lk,s:t+pr+lk}}).sort((a,b)=>b.s-a.s)};
 cOdds7=function(kind,E,prep,meB,seed){const f=SC7[kind].f;const base=E.map(p=>f(p)+(prep.includes(p.id)?J71.prep:0));const mi=E.indexOf(S);if(mi<0)return 0;base[mi]+=meB;const r=rng7(seed);let w=0;const N=500;
  for(let t=0;t<N;t++){let b=-1,bi=-1;for(let i=0;i<E.length;i++){const s=base[i]+smp7(E[i],kind,r);if(s>b){b=s;bi=i}}if(bi===mi)w++}return oddsCl(Math.round(100*w/N))};
 fxOdds7=function(F,art,meB,seed){const E=[S].concat(liveRivals(true).filter(present7));const r=rng7(seed);let w=0;const N=500;const K=E.map(p=>p===S?art:fxBest7(p,F.arts));const base=E.map((p,i)=>p===S?SC7[art].f(S)+meB:SC7[K[i]].f(p));
  for(let t=0;t<N;t++){let b=-1,bi=-1;for(let i=0;i<E.length;i++){const x=base[i]+smp7(E[i],K[i],r);if(x>b){b=x;bi=i}}if(bi===0)w++}return oddsCl(Math.round(100*w/N))};
 /* ODDS CAP: when her place comes from the luck draw (she did not play the round herself), her first place keeps its odds inside the one cap:
    P(first | the others' scores) is sampled from her own luck draw and capRes moves her just above / below the best other score. */
 capRank7=function(L){try{const i=L.findIndex(x=>x.p===S);if(i<0||L[i].mg||L.length<2)return L;const me=L[i],O=L.filter(x=>x!==me),best=Math.max(...O.map(x=>x.s));
  let w=0;const N=BAL.odds.simN;for(let t=0;t<N;t++)if(me.t+me.pr+Math.round(raw7(S,me.kind)/10*J71.luck)>best)w++;
  const win=i===0,fin=capRes(win,100*w/N);if(fin===win)return L;const s=fin?best+1:best-1;me.lk+=s-me.s;me.s=s;return L.sort((a,b)=>b.s-a.s)}catch(e){console.error(e);return L}};
})();
/* the Emperor tires of accusations: every accusation an accuser brought in the last 36 tuần (a year) lowers the odds of her/his next one by accTire points
   (same rule for every accuser; the odds word shown is the real one) */
Object.assign(BAL,{accTire:10});
(function(){try{const A=ACT.accuse,f0=A.f;A.f=function(a,t){const r=f0.apply(this,arguments);/* recorded AFTER the roll: this charge tires the NEXT one, not itself (shown == rolled) */try{a.accL=(a.accL||[]).filter(w=>wk()-w<36);a.accL.push(wk())}catch(e){}return r}}catch(e){}
 const o0=oAccuse;oAccuse=function(a,t){const o=o0.apply(this,arguments);if(!BAL.accTire||!a)return o;const n=(a.accL||[]).filter(w=>wk()-w<36).length;return n?oddsCl(o-BAL.accTire*n):o}})();
/* one charge at a time (balance 11/14, measured: without it an angry palace brought ~40-60 charges a life against her, ~30 stuck, each a fall of two ranks
   or the cold palace): a person just accused, whether the charge stuck or not, cannot be accused again by anyone for BAL.accCdT tuần.
   Same rule for every target, her included; she cannot bring a charge against someone inside the window either. */
Object.assign(BAL,{accCdT:36});
(function(){try{const A=ACT.accuse,ok0=A.ok,f0=A.f;const cd=t=>!!(BAL.accCdT&&t&&t.accT!=null&&wk()-t.accT<BAL.accCdT);
 A.ok=function(a,t){if(cd(t))return false;return ok0.apply(this,arguments)};
 A.f=function(a,t){if(a!==S&&cd(t))return "";try{if(t)t.accT=wk()}catch(e){}return f0.apply(this,arguments)}}catch(e){}})();
/* measured knobs of other modules (balance pass 11/14, see dev/measure/BALANCE_REPORT.md): scheme motive x3 and a prepared blow +10 (j70),
   the Emperor's satiety with one favourite (j75 FAIRN.sat/satO). Same for every consort.
   One-core: those values now sit once in J70CFG (j70) and FAIRN (j75); nothing sets them a second time here. */
/* 8 bottom tabs (owner's choice): j72's "Việc nhờ" tab (data-tab q72) is a sub-tab of Mệnh truyện, not a 9th tab */
try{if(typeof KG==="object"&&KG.mt&&!KG.mt.keys.includes("q72"))KG.mt.keys.splice(1,0,"q72");if(typeof kgBar==="function")kgBar()}catch(e){}
/* balance 11/14 (late): death stays a real risk for a careful player too. Same rules for every woman in the palace, her and every NPC.
   - birthMin: thái y, Y thuật, an thai and a loyal maid lower the childbirth risk, but never below BAL.birthMin % (measured: the careful bot got down to 1.5%).
   - seeMaxP: spotting a poisoned bowl or medicine (the "ps" check of caught(): physician, Y thuật, eyes) is capped at BAL.seeMaxP %. Guards lower the odds, never to near-zero.
   - poisonX: a poison that lands takes poisonX x the Sức it took before (for her and for an NPC alike). */
Object.assign(BAL,{birthMin:8,seeMaxP:70,poisonX:1});
/* v12 (worker 2, measured n=30): an empty Hoàng hậu seat goes to an outsider girl 60% of the time: BAL.outQ (jbal, one value since review/one-core) */
(function(){const b0=birthRisk;birthRisk=function(p){const r=b0.apply(this,arguments);return Math.max(r,BAL.birthMin||0)}})();
(function(){const o0=oSee;oSee=function(t,p){const r=o0.apply(this,arguments);return p&&BAL.seeMaxP?Math.min(r,BAL.seeMaxP):r}})();
(function(){try{const P=ACT.poison,f0=P.f;P.f=function(){window.__pz70=1;try{return f0.apply(this,arguments)}finally{window.__pz70=0}};
 const a0=apply;apply=function(o){if(window.__pz70&&o&&o.suc<0&&BAL.poisonX)o=Object.assign({},o,{suc:Math.round(o.suc*BAL.poisonX)});return a0.apply(this,[o].concat([].slice.call(arguments,1)))};
 const p0=ap;ap=function(p,o){if(window.__pz70&&p!==S&&o&&o.suc<0&&BAL.poisonX)o=Object.assign({},o,{suc:Math.round(o.suc*BAL.poisonX)});return p0.apply(this,[p,o].concat([].slice.call(arguments,2)))}}catch(e){}})();
/* balance 11/14 (night, worker 2): a poison that empties her Sức kills her on the spot, exactly as dieIf() does for an NPC (j8).
   Before, her Sức was only checked at the end of the tuần, after the +4 rest of the new tuần, so a poison landing in the day (j70 schemes,
   gifts of food j83) could be slept off at Sức 0. Same rule for every woman now. */
Object.assign(BAL,{poisonNow:1});/* one rule for everyone (review/difficulty jdiff reads the same knob) */
(function(){try{const P=ACT.poison,f0=P.f;P.f=function(a,t){const r=f0.apply(this,arguments);try{if(BAL.poisonNow&&t===S&&S&&!S.dead&&S.suc<=0&&/trúng độc/.test(String(r))&&!/thuốc giải/.test(String(r)))die("Trúng độc, không qua khỏi")}catch(e){}return r}}catch(e){}})();
/* the death word on her own Hạ độc button (j79 kpDeathP) follows the same poisonX (true information) */
(function(){if(typeof kpDeathP!=="function")return;const k0=kpDeathP;kpDeathP=function(k,v){if(k!=="poison"||!BAL.poisonX)return k0.apply(this,arguments);
 try{const has=(p,key)=>(p.inv||[]).some(e=>e.k===key&&!e.h);if(has(v,"giaidoc"))return 0;const X=BAL.poisonX;if(has(S,"hacdinh"))return Math.round(120*X)>=v.suc?1:0;
  let n=0;for(let i=0;i<30;i++)if(Math.round((35+i)*X)>=v.suc)n++;return n/30}catch(e){return k0.apply(this,arguments)}}})();
/* items are never free (owner rule; ITEMS_EARNED.md #15): Hạ độc without Hạc đỉnh hồng in the chest means buying thạch tín first, BAL.poisonBac bạc,
   paid when the dose is bought (caught or not). Same price and rule for her and every NPC: nobody without the silver can try it. */
Object.assign(BAL,{poisonBac:20});
(function(){try{const P=ACT.poison,ok0=P.ok,f0=P.f;const hd=a=>(a.inv||[]).some(e=>e.k==="hacdinh"&&!e.h);const need=a=>BAL.poisonBac&&!hd(a);
 P.c=Object.assign({},P.c,{bac:-BAL.poisonBac});P.x=(P.x?P.x+" · ":"")+"có Hạc đỉnh hồng thì khỏi mua thạch tín";
 P.ok=function(a,t){if(a&&need(a)&&(a.bac||0)<BAL.poisonBac)return false;return ok0.apply(this,arguments)};
 P.f=function(a,t){if(a&&need(a)){if((a.bac||0)<BAL.poisonBac)return a===S?"Không đủ bạc mua thạch tín. ":"";ap(a,{bac:-BAL.poisonBac})}return f0.apply(this,arguments)}}catch(e){}})();
/* servant start (j42): a maid caught eavesdropping on her mistress's order is flogged at Thận Hình ti (Sức -BAL.srvSpyHit), not beaten to death;
   poisoning or planting a charm when caught keeps the death roll. Measured: 3 of 12 servant lives ended this way in the first two years. */
Object.assign(BAL,{srvSpyHit:25});
(function(){if(typeof srvDoOrder!=="function")return;const s0=srvDoOrder;srvDoOrder=function(k,t){if(k!=="spy"||!BAL.srvSpyHit)return s0.apply(this,arguments);
 const d0=die;die=function(why){if(/^Bị bắt quả tang khi dò la/.test(String(why))){apply({suc:-BAL.srvSpyHit,tin:-3});
   log(`<span class="r">Ngươi bị bắt quả tang khi dò la ${t&&t.name||""}, bị đánh hai mươi trượng ở Thận Hình ti.</span> Sức -${BAL.srvSpyHit}.`);if(S.suc<=0)return d0("Chết dưới đòn ở Thận Hình ti");return}
  return d0.apply(this,arguments)};
 try{return s0.apply(this,arguments)}finally{die=d0}}})();
/* REVEAL PACING (owner 11/15 17:02Z "đồ bay ra quá nhanh"): every gift box / chest / tray / pouch / single reveal (KIT §54.1), ms.
   shake = box rattles · pause = box open, nothing yet · rise = one item rises out of the box into the spotlight · hold = it stays, glowing in
   its grade colour, name + grade chip readable · shelf = it shrinks onto the row under the box · list = gap before the list + Nhận.
   gainMin = a single kitGain reveal cannot be tapped away before this. Lose (KIT §54.2): fall = the lost item fades and falls; coins = silver fly. */
/* ONE ANIMATION PACE (KIT §83, owner 16/11 15:05Z "mấy cái animation là tôi muốn nó chậm thôi, để mắt tôi nhìn còn kịp", rule OD:L1267 one core):
   BAL.pace is the ONLY speed knob for key-moment animations (buổi transition, card flip, reveals, promotion / demotion, week dawn, stat fx, toasts…).
   1 = the old speed; 1.75 = every key moment lasts 1.75x as long. JS: kitPace(ms) (Gọn / reduced motion keep the old fast ms); CSS: var(--pace) on :root.
   Micro feedback (< 0.3 s: taps, dialog open/close, hover) is NOT scaled. Never used for sync: animations run after the state is applied. */
Object.assign(BAL,{pace:1.75});
function kitPace(ms){try{return typeof kfStill==="function"&&kfStill()?ms:Math.round(ms*(BAL.pace||1))}catch(e){return ms}}
try{document.documentElement.style.setProperty("--pace",String(BAL.pace))}catch(e){}
Object.assign(BAL,{reveal:{shake:Math.round(420*BAL.pace),pause:Math.round(700*BAL.pace),rise:Math.round(550*BAL.pace),hold:Math.round(1300*BAL.pace),shelf:Math.round(380*BAL.pace),list:Math.round(350*BAL.pace),gainMin:900,fall:Math.round(1300*BAL.pace),coins:Math.round(900*BAL.pace)}});
/* TRUE EVIDENCE (jtruth, owner 15/11): a spy who finds no wrong learns her habits instead: +spyKnowB on the next scheme against her for
   spyKnowW weeks. Frame defence (the framed one clears herself): clearBase + Tai mắt × clearMat, + ksB with a Kính sự phòng night in the
   last ksW weeks, + wB a loyal (≥60) maid as witness, + tyB Thái y (own doctor or Y thuật ≥3), + evB per evidence (max 2) on the framer;
   kept within clearMin..clearMax. An exposed framer loses fDanh Danh and fDuc Đức and is punished (sev 2), same for everyone.
   Frame rate (reviewer r1): frameW = Vu oan/Cài đồ weight × when she holds no proof to accuse; frameW1 = Vu oan weight added at grudge
   band "nhỏ"; npcFrameP = % per tuần that a consort with malice ≥ npcFrameMal frames a more favoured rival (NPC-vs-NPC);
   frameHide = minus on the victim's detection (oSee) during a frame (quiet work). */
Object.assign(BAL,{truth:{spyKnowB:8,spyKnowW:6,clearBase:20,clearMat:5,ksW:2,ksB:25,wB:15,tyB:20,evB:10,clearMin:10,clearMax:85,fDuc:8,fDanh:15,frameW:2,frameW1:2,witLoy:60,tyArts:3,npcFrameP:10,npcFrameMal:40,frameHide:30}});
/* CO-OP BUỔI CLOCK (KIT §69, dev/build/jcooptimer.js, owner 15/11 ~21:25Z), ms. buoiMs = the longest a co-op buổi lasts (owner 23:10Z: 5 phút; the host picks 3 / 5 / 8 = lens, minutes, in the lobby) (both "Sẵn sàng"
   ends it sooner) · pauseCapMs = the most the clock may stand still in one buổi while a player is in a mini game or a dialog ·
   readMs = after the buổi ran out, a dialog with no choice (or only one road) is read for her after this long · syncMs = host re-sends the clock ·
   graceMs = after the deadline the screens show "Hết buổi" this long before the step (lag between the two players). */
Object.assign(BAL,{coopTm:{lens:[3,5,8],buoiMs:300000,pauseCapMs:60000,readMs:8000,syncMs:4000,graceMs:1500}});
/* CO-OP THIN GUEST, her effects (review/coop-thin-hostnull, jcoopthin TH.uiPlay): the floaters / toasts / sounds / face reveals her tap raised
   on the host play on HER phone at most `batch` at once; the rest wait in order and play `gapMs` later, batch by batch (never dropped). */
Object.assign(BAL,{coopUi:{batch:4,gapMs:900}});
/* review/coop-cyhold: the longest the host's week draw waits for the friend's Kỳ nguyệt sự answer (jcoopworld cyHold); after it the draw runs
   with the «no answer» outcome (as when her week end frees it), her card stays open for her (never answered for her) */
BAL.coop=Object.assign({},BAL.coop||{},{cyWaitMs:90000});
/* ITEM DETAIL (KIT §70, review/item-info): allow = show "hạn mức phẩm ta N" (her rank's luxury allowance) on the Xa xỉ row of every item detail,
   and mark "quá hạn mức" when wearing the piece would take her over it (coordinator 15/11 design "xa xỉ value vs her rank allowance", after the
   owner's 23:05Z dress-contest ruling; the older 08:10Z ruling hid the allowance — set false to hide it again, the row keeps "món này N · Bên mình N → M").
   Reviewer r1 (coordinator ruling 15/11): owner rule 08:10Z wins -> false (no allowance, no "quá hạn mức"). */
Object.assign(BAL,{itd:{allow:false}});

/* per-person dislikes (jdis, review/pcard-dislikes): n = how many each person has [min,max]; aff = her thiện cảm lost after a wrong gift; sung = Emperor's Sủng lost;
   refuse = chance (0-100) a wrong gift is refused and stays in the chest (then refAff / refSung are lost instead); talk = chance a talk reveals one;
   spyPri = weight of the 'dislike' fact among what a spy can learn. Modest on purpose: the gift's own gain is +4..+10. */
Object.assign(BAL,{dis:{n:[1,2],aff:4,sung:1,refuse:35,refAff:2,refSung:1,talk:20,spyPri:55}});
/* MORTALITY + THỌ SỐ (jmort, owner 16/11, review/mortality). ONE source for every number of the model.
   life.show   SWITCH 1 (owner 16/11: HIDDEN, never shown): 0 hidden · 1 a fortune-teller word at the start · 2 word + number
   life.dice   SWITCH 2 (owner 16/11 update: lives were too long): adult {mean,sd,lo,hi} = 45 / 15 / 15–85 (≈16 % under 30, ≈50 % under 45, ≈5 % over 70); me / emp alias "adult"; kid = children born in game:
               risk % die before 10 at an age from the `early` bands [lo,hi,weight], else the adult curve. A person who enters already grown rolls
               conditioned on the present age, at least minMo months left. floorMe / floorEmp / oldFloor = minimum years (owner: none → 0)
   life.care   SWITCH 3 (owner 16/11: care lengthens a little, ≈ +3 years): 1 on · each new year Sức ≥ careSuc / own thái y / Y thuật ≥ 2 give careP % each
               of +1 year; curing the omen illness with the thái y +careAdd; HARD CEILING careMax years in all per person (owner 16/11, never more);
               a year with no source and Sức < careLapse takes a gained year back; a source kept up shakes off a new illness careIll % each
   playerFloorYears = 0: NO play floor (owner 16/11, final: the roll decides; poison, assassination, childbirth, epidemics can kill her at any time). Not read by code.
   cureTy / cureOther = % an omen-illness treatment works (own thái y / other); cureSuc = Sức +n when fate refuses the cure
   omenSt = [months left ≤ → nguy kịch, ≤ → nặng]; oldAge = from this age the omen illness is Bệnh già; thDanh = Danh to whoever holds lục cung after the Thái hậu dies;
   repl = [base,+random] age of a replacement official (young = Nội vụ phủ); pre.omenSuc = Sức lost per stage a month in the omen illness;
   emp.foilLo/foilHi = clip of the foil %; emp.rumour = % a plot is rumoured (always when Tai mắt ≥ rumourMat); dieAge[2] = base % of that extra death; birth.stillSuc = Sức lost on a stillbirth;
   careYt = Y thuật level that counts as a care source; maidLoy = Lòng of the replacement maid; emp.plotMo = [base,+random] omen months of a plot
   thIllKeep = % of months the old j13 Thái hậu illness (nguy kịch) still rolls its own death (her lifespan carries the rest)
   pre = the last `mo` months before a natural death (not the sudden ones): +ill % monthly illness, −suc Sức a month, one Thái y report (owner 16/11: omens approved)
   sudden = % of lifespan deaths with no omen; omen = [min,max] months of omen illness before the others
   acc = yearly % accident (me / npc / emp; children none), oddP = % of accidents that are the odd kind
   emp: yearly % plots ass (assassination) / poi (poison), ×(1+weak×(50−power)/50) when S.reign.power < 50; foil = % cấm quân / thử món stop it at power 50 (±(power−50)/2, 20–90)
   illAge = [from age, per years, % extra monthly illness at +per years]; dieAge = [from age, per years] → a critical illness gets 25×weight×(age−from)/per % extra death
   tired = sleep regen −1 per `per` years over `from` (never below min); griefMo / griefIll = months and monthly % tâm bệnh after losing her child
   birth (owner 16/11 approved): misX = natural miscarriage × (j8 6/2/6 % a month → ≈20 % a whole pregnancy; an thai halving and the Sức<30 +8 kept);
        hardX = a hard birth comes at birthRisk × hardX; of hard births choiceP % become the Emperor's choice "giữ mẹ hay giữ con", the rest kill
        the mother hardDie % (else she survives: Sức −hardSuc, barrenP % never conceives again); stillP % (+stillAge per year over 35) stillbirth;
        newbornP % of newborns die in the first month (part of the child curve: kid.risk counts the rest);
        emp = his choice, % giữ mẹ = base + sung×(Sủng−50) + th×Thái hậu (×hieuthao if Hiếu thảo) − heirNeed (no living prince) − boy (the Thái y guesses
        a boy: boyGuess % of hard births) + his traits (nhantu, datinh, mesac, lanhlung, chamchinh); 5–95
   fate (Emperor dies, her son not the heir): phiRank+ or a daughter → Thái phi; a son → theo con ra phủ; childless: rank ≤ homeRank, age < homeAge → về quê (homeP %),
        else xuất gia; childless favourite (Sủng ≥ tuanSung) faces tuẫn táng (tuanP %), averted by Đức ≥ tuanDuc or Thái hậu ≥ tuanTh */
BAL.mort={on:1,playerFloorYears:0,
 life:{show:0,care:1,careAdd:1,careMax:3,cureTy:40,careYt:1,cureOther:20,cureSuc:5,careSuc:70,careP:12,careLapse:40,careIll:15,floorMe:0,floorEmp:0,minMo:3,
  dice:{adult:{mean:45,sd:15,lo:15,hi:85},me:"adult",emp:"adult",
        kid:{risk:12,early:[[1,3,5],[3,6,3],[6,10,2]],adult:"adult"}}},
 oldFloor:0,thIllKeep:30,sudden:15,omen:[2,6],omenSt:[1,3],oldAge:55,thDanh:5,maidLoy:40,repl:{young:[22,8],adult:[40,10]},pre:{mo:12,ill:6,suc:2,omenSuc:3},acc:{me:.05,npc:.08,emp:.15},oddP:30,
 emp:{ass:.45,poi:.3,weak:1.2,foil:60,foilLo:20,foilHi:90,rumour:50,rumourMat:2,plotMo:[1,2]},
 illAge:[35,25,1.5],dieAge:[45,15,25],tired:{from:35,per:5,min:4},griefMo:6,griefIll:12,
 birth:{misX:.62,hardX:2,choiceP:35,hardDie:45,hardSuc:35,barrenP:8,stillP:3,stillSuc:20,stillAge:.5,newbornP:3,
  emp:{base:50,sung:.5,th:.2,heirNeed:15,boyGuess:50,boy:10,nhantu:10,datinh:5,mesac:5,lanhlung:-10,chamchinh:-5,hieuthao:2}},
 fate:{phiRank:4,homeRank:1,homeAge:30,homeP:50,tuanSung:60,tuanP:25,tuanDuc:50,tuanTh:40},
 /* D4 review/npc-death (owner OD:L641–643): ly = Phế phi họ Tần in Trường Môn viện: age when the game starts, floor = minimum years she lives
    (her rửa oan story needs time), lcShow = fallen consorts shown with her in a visit; dead = faces / figures / names of the dead kept (newest) so
    no new person ever gets them (owner: a NEW person, never the dead person's picture) */
 ly:{age:34,floor:3,lcShow:3},dead:{keep:400}};
/* D49 collection milestones (jcol): [items, Phúc duyên once per life (OD L46: ~+5/+10/+20/+35), danh hiệu (VANPHONG cổ trang)]; keep = lives remembered in the once-only ledger */
BAL.col={ms:[[20,5,"Tích bảo"],[50,10,"Tàng bảo"],[100,20,"Bách bảo"],[200,35,"Vạn bảo các chủ"]],keep:80};
/* TÂN QUÂN LẬP UY (jreign, owner 16/11 D5): the Emperor's side story + her faction road. Months from the accession: at[c] opens chapter c+1;
   the outcome is decided decideAfter months after chapter 6 opens (waits up to decideWait more months for her Chương 6 Hồi 1);
   when she is ≥3 beats behind (busy months, cấm túc) up to catchUp beats come in one month. Court grip p: +drift a month, noise [% a month, ±max], −qs a month while
   Biên cương or Kho lúa < 40, ±npcP per sided consort with Sủng ≥ npcS. Outcome: p ≥ B Hoàng thượng thân chính, p < A quyền thần nhiếp chính,
   else Thái hậu buông rèm. thK = weight of a Thái hậu push (toward the middle). tr0 trust on joining; switch: Danh −swDanh, leader −swLead,
   the old side's consorts −swRel, trust → swTr, cooldown swCd months, at most swMax. Errand every erCd months (erP %). Outcome for her:
   winner emp Sủng +winSung×(.5+tr/100), Danh +winDanh, below rankCap and above the Sủng floor +1 rank at once, no exam (jexam exDirectUp; owner 16/11 06:20Z: long-road rewards skip the exam); th Thái hậu +winTh×k, che chở winShield months;
   quyen Bạc bacWin×rank price×k, Tai mắt +1; losers mirror (loseSung / loseTh / loseDanh). Houses: loseHouse / winHouse.
   Tâm nguyện lines: a line start every lnCd months, a failed step retried after lnRetry months. */
Object.assign(BAL,{rg:{at:[1,5,10,18,27,37],decideAfter:2,decideWait:3,catchUp:2,drift:.65,noise:[40,3],qs:.4,npcS:45,npcP:.08,A:48,B:60,thK:.1,pk:.46,pkQ:1.25,tr0:30,
 swDanh:5,swLead:8,swRel:8,swTr:10,swCd:6,swMax:2,joinRel:4,famAf:12,erCd:3,erP:30,ngoai:3,winSung:14,winDanh:6,rankCap:6,rankSung:0,
 winTh:24,winShield:6,bacWin:160,loseSung:8,loseTh:12,loseDanh:6,loseHouse:30,winHouse:15,npcWin:6,npcLose:8,lnCd:2,lnRetry:4}});
/* CO-OP (review/coop-b1b5, D21 B3): years a NEW Emperor (after a death in co-op) reigns before the month death roll can fire again (j3 uses 12 game years for the first one) */
Object.assign(BAL,{coopEmpY:12});
/* co-op part 2 (review/coop-b1b5-p2): a player buys the friend who serves as a cung nữ (the same pay as an NPC's bribe card, j42 cnvBribe);
   tin = her Chủ tin gain when she refuses and tells her mistress */
Object.assign(BAL,{coopBribe:{pay:20,tin:5,grudge:5}});/* grudge: the briber's thiện cảm for the servant, −grudge when she tells her mistress, +grudge when she refuses quietly (law 2 «Bạc lạ», j42 + jcoopworld twins) */
/* review/emperor-visit (owner OD:L603): the Emperor comes to HER palace and stays the night (event "empnight", j7 + jvisit).
   visit: a daily roll after the tablet flip, % = base + slope × (Sủng − minSung) + anK × Ân tình, × the Emperor's nature (datinh / lanhlung),
   capped; none within gap days of the last visit, none while she is pregnant, in lãnh cung, or he is gravely ill. On top of the night
   (BAL.night): Sủng + sung, Danh + danh, every consort ghen + ghen, the consort whose tablet was flipped ghen + lostGhen and quý ngươi − lostRel,
   the Hoàng hậu − hh; Thái hậu displeased at thP + neg × thNeg % (neg = her archetype, jtrong TH_ARCH), Thái hậu quý ngươi − thLoss × her trọng.
   show: "Phô tài" on the visit card (odds o + w × her best art's level, Sức − suc, Sủng / Danh on success).
   Advising him to rest: Đức + adviseDuc, Sủng − adviseSung, Thái hậu + adviseTh. q = the night's prep quality (no bath, no wrapping: he came).
   tea: the short visit "Hoàng thượng ghé cung uống chén trà" (j24 Có người đến pool): gate Sủng ≥ minSung, p %, Sủng / Ân tình gains.
   night: the one night rule (j8 nightGain / nightFx) for every road into a night (tablet, Tranh sủng, Chặn ngự giá, the visit) and every NPC night (j75 rivalNight);
   stealS = the night score the Tranh sủng / Chặn ngự giá line (j79 stealX) prices the reward chance at. */
Object.assign(BAL,{visit:{minSung:20,base:.3,slope:.07,anK:.01,cap:8,datinh:1.5,lanhlung:.5,gap:9,illSt:2,q:2,
 sung:3,danh:3,ghen:6,lostGhen:15,lostRel:8,hh:3,thP:25,thNeg:15,thLoss:4,adviseDuc:3,adviseSung:1,adviseTh:2,
 show:{o:40,w:8,suc:5,sung:6,danh:2},tea:{minSung:60,sung:2,an:2}},
 night:{sung:3,an:2,ghen:8,bestow:10,bestowS:4,stealS:3,vO:[40,50,60,75,85] /* night score v ≤-1 / 0 / 1 / 2 / ≥3 → odds read by word() (Khó … Rất chắc) */,mood:[1,0,-1,-2] /* his mood 0..3 (vui, thường, buồn, giận) → night score add-on (j8 night1; jwhyn reads it) */}});
/* ACTIVE MAID LINE (jmline.js, review/servant-system, owner 16/11): % per month unless named. eye[rank] = the Emperor's eye by servant rank
   (thô sử, tam đẳng, nhị đẳng, nhất đẳng = đại cung nữ, chưởng sự, nữ quan; maid-ladder-6 inserted nhị đẳng .4; was 0/0/1.2/1.2/1.2), eyeSung = ×(1 + master Sủng/100 × eyeSung), eyeAge = ages that can rise;
   seekStart (× nết: tham 2, lanh 1.5, trung/nhát 0.3) for seekMonths months, maids up to seekAge, seekMul on the eye while seeking;
   seeNotice = master notices; harsh master: punish → lòng -punLoy, punOut = sent away; master Sủng ≥ useGap under the harem median (r2; was Sủng < 30): use → seekMul × useMul, lòng +useLoy;
   feud = a maid starts a quarrel with a maid of a palace her master's hostility ≥ feudHost (feudPoison of them poison, half the rest frame);
   frameLoy / frameOut (an NPC master throws the framed maid out), poisonDie, hitEv = proof of a beating to the victim's mistress (r2: feudEv replaced by the caught keys below);
   hit = a consort targets a maid of her target's palace; seeMat = Tai mắt that lets her hear of other palaces' maid affairs. */
Object.assign(BAL,{mline:{eye:[.1,.25,.4,.6,1,1.2],eyeSung:.5,eyeAge:[16,29],seekStart:4,seekMonths:3,seekAge:25,seekMul:3,seeNotice:50,punish:60,punLoy:20,punOut:25,useGap:20,use:50,useMul:1.5,useLoy:10,
 feud:3,feudHost:25,feudPoison:10,frameLoy:15,frameOut:20,poisonDie:25,hit:4,hitEv:30,seeMat:3,
 /* review/servant-mline-r1 (ONE CORE): the literals that sat in jmline.js, same values: seekTr = seekStart × by nết; feudFrame = % of the
    non-poison feuds that are a frame (else a fight), fightLoy = lòng +N to both fighters; poisonLv = pzGive level; evN = chứng cứ per piece;
    hitBribeBac / hitBribe = a consort with Bạc ≥ N bribes (%), else a cruel one beats (hitBeat %), else frames; beatLoy = the beaten maid lòng +N;
    ageDef = age when unknown; offRank / offEye = the old rule behind the off switch (rank ≥ offRank at offEye %). */
 seekTr:{tham:2,lanh:1.5,chuyen:1,trung:.3,nhat:.3}/* servant-quality codes, read by qv() (BAL.net.qCode) */,feudFrame:50,fightLoy:2,poisonLv:1,evN:1,hitBribeBac:60,hitBribe:40,hitBeat:55,beatLoy:3,ageDef:20,offRank:3,offEye:1.2,
 /* review/servant-mline-r2 (gain and loss, measured: dev/measure/sim_maidline_r2.js): ONE caught key per harmful act, % per act:
    frameCatch = a maid's frame of another palace's maid is traced; poisonCatch = Thái y traces a maid's poison (the poisoner goes to
    Thận hình ti); hitCatch = a consort's frame of another palace's maid is traced (a beating is always seen: deed + hitEv % proof).
    Caught → deed on the master (w = 1 frame / beat, 2 poison), the victim's mistress gets evN×w proof and oán +caughtOan×w,
    the master Đức −caughtDuc×w, Danh −caughtDanh (her own maid acting: Danh only, no deed, no proof on her).
    use: the master pays useBac bạc (dress, rouge); a used maid who rises turns her back at useTurn % (loyalty set under riseLoy).
    riseLoy / riseRel = a risen maid with lòng ≥ riseLoy stays her old master's friend (relation ±riseRel; j14, was 60 / 25).
    seekCd = months before the same maid seeks his notice again (after her seek ends or she is punished). */
 frameCatch:30,poisonCatch:40,hitCatch:30,caughtDuc:3,caughtDanh:2,caughtOan:10,useBac:20,useTurn:35,riseLoy:60,riseRel:25,seekCd:6,
 /* review/servant-mline-r3 (ONE CORE, same values): fightLose = % that the scuffle loser is the maid who started it; poisonW = deed weight of a caught poisoning (frame / beat = 1) */
 fightLose:50,poisonW:2}});
/* MINIGAME DIFFICULTY TIERS (mg-balance, owner 16/11 07:10Z / 07:25Z "mức vừa"; read by jmgt mgTier, j82, j83 works, jexam, jts, review/nw-*):
   occ = [base, perRank] stake of each occasion (stake = base + perRank × rank 0..7, + big for a big contest; exam: rank = the target rank);
   mid/slope = board ease at the matching level and its change per level of gap (ease 0..5, engines: higher = easier); band = gap that turns Vừa
   into Dễ / Khó; kAdj = per-engine ease trim from the bot calibration (dev/PROGRESS_mg-balance.md); word = raw thresholds Tạm được/Khá/Giỏi/Xuất sắc;
   npc = [base, per art level] mean play score of a rival / of "Để tài nghệ quyết định" (j82 kg82NpcMean);
   aid = ease thresholds of the aid tiers (hints on the board / fewer / on the button); lesson = raw for lesson grade 2 / 3;
   lev[kind][name] = [at ease 0, at ease 5] board levers read by mgLev (mg-balance-2: Nấu ăn fire lag s / gusts heat-per-s / gust gap s; Cờ time ms / full-speed share of it (mg-tune) / share kept at time out / extra stones;
   pace = the TIME PART of correctness games (jmgt mgPace, review/mg-tune): fast = share of the round time that still keeps the whole score, keep = share kept at time out,
     each [at ease 0, at ease 5]; an engine's own lev[kind].fast / .keep win (co, doden, and the no-word engines tho / doi / le / tc / xa / thq);
   wk = works (j83): lvQ[art level] added to the play, th = Khá / Tinh xảo / Tuyệt phẩm score thresholds, cong = [Công level that adds +1 tier, highest tier that lift can reach (2 Tinh xảo: Tuyệt phẩm needs the score)] (material bonus BAL.wk.matQ, cap BAL.wk.cap). */
Object.assign(BAL,{mgTier:{occ:{hoc:[0,.5],hoi:[1,.5],trieu:[1.5,.5],exam:[1,.5],tuyen:[1.5,0]},big:1,stakeMax:6,mid:2,slope:.8,band:1.5,easeMin:-2,
 kAdj:{ban:3,dan:0,den:0,duho:-1,hat:0,hoa:-2,huong:-2,kim:0,kinh:-1.5,may:-1.7,ve:-1.6,mua:0,theu:0,co:-1,banh:-.1,dauho:1.2,td_hanh:-1.4,td_dung:-1.2,td_ngon:-.9},
 lev:{/* review/mg-tune time part (mgPace) of the correctness games, calibrated with dev/measure/mg-bots.js (skilled ≈ 25 % Xuất sắc at the matching level) */
  tho:{fast:[.2,.35],keep:[.5,.5]},doi:{fast:[.35,.55],keep:[.3,.3]},doden:{fast:[.3,.5],keep:[.3,.3]},le:{fast:[.3,.45],keep:[.3,.3]},
  tc:{fast:[.3,.45],keep:[.3,.3]},xa:{fast:[.25,.4],keep:[.4,.4]},thq:{fast:[.5,.65],keep:[.5,.5]},
  kim:{fast:[.25,.4],keep:[.6,.6]},/* review/mg-tune-r1: Khéo tay (untangle) moved onto mgPace, same curve as its old typed .6+.4·left/LIM */
  banh:{lag:[.6,.08],gust:[.6,.05],gap:[1.4,4],reach:[1,1]},co:{lim:[8000,20000],fast:[.4,.8],keep:[.6,.6],extra:[5,0]},mua:{beat:[1000,2600],sp:[520,770],retry:[0,1.99],dark:[220,220],darkCap:[.6,.6]},
  td_hanh:{lim:[8000,20000],short:[2,0]},den:{swing:[.36,.36],band:[.16,.208]},chai:{zone:[.6,1.6]},ban:{size:[.7,1]},/* dauho-lv5: Bắn cung target picture size by ease (share of BAL.mgArt.ban.fit·H); the scoring rings are the painted rings *//* chai-ramp (owner 21/11 ~00:55Z): Chải chuốt green «đúng phẩm» band = wdGroomW × zone at the board ease (1.0 at ease 2 = the width she was measured on); Thử tay hồi 1→5 (ease 3.6→0.4) ≈ ×1.32 → ×0.68 *//* review/mg-snap: Thêu theo nét trace tolerance, share of the board width (was typed W·(.055+.006·lv)·mgTol) *//* cal-p2 Đầu hồ owner-bug fix (OD 20/11 ~08:30Z, her first try 1.1/10 on a board no hand could read): aim dots long enough to reach the pot from the middle boards, wider mouth, softer pull (pull = drag gain × K, the drag cap ÷ pull, so the strongest throw is unchanged); human-model sim (cal-p2 report §D) her matching board ≈7.5; Bắn cung (kg82Aim) never reads these */dauho:{aid:[.6,2],mouth:[1.3,2.1],pull:[.8,.6]},td_dung:{band:[.2,.6],kick:[2.4,1],spill:[2,1.5]},td_ngon:{band:[.05,.13],win:[1000,2600],rate:[2,.6],fade:[.07,.14]}},
 kG:{td_cong:1.3,td_ngon:2,ban:.8,dan:2.8,den:.8,hat:.85,duho:1.5,hoa:2.3,huong:1,kim:1.8,kinh:.9,may:.82,ve:.9,mua:1.25,theu:5.5,co:3},/* review/mg-balance-2-r1 re-trim on pooled raws (co n=120, td_ngon n=60 float): co 4→3, td_ngon 1.6→2; review/mg-snap re-trim after the trace fix (her line scored, BAL.mgTier.trace.acc 1) and the wider Hoa đăng channel: td_cong 1.6→1.3, ve 1.7→.9, kinh 1.5→.9, may 1.5→.82, den 1.05→.8 */
 trace:{acc:1},/* review/mg-snap: weight of her line lying on the guide in the ONE trace score mgTraceScore (was a typed .5) */
 /* review/cal-p2b (owner OD 20/11 ~07:35Z: fix the broken games only) — three board faults, BAL only:
    blend (Điều hương): w = share of the scent mix that still scores (one round = clamp(1 − mix gap / (w·mgTol))), was typed .32 in k91Blend;
      star = the live hint ★ / ★★ / ★★★ and the verdict ★★ / ★★★ read THAT SAME round score (was typed mix-gap thresholds .22/.12/.05, so «★★★» could
      grade 2/10 under kG 3.65); kG.huong 3.65 → 1: the grade = what the board shows (10·mean round), kG had been fitted on an oracle bot.
    lev.mua.dark = ms the cushion goes dark between two shown steps (never more than darkCap × the step time SP, so a step stays lit) (was SP·.28 ≈ 145–215 ms: the same cushion twice read as one step); each shown
      step now pops from its own start (kit kg82FxPop), so a repeat is seen as two.
    lev.banh.reach = a gust never pushes the fire faster than this share of what her hand can answer (1 = at most exactly that; fan up .34/s, cool .1/s);
      was gust .6/s at ease 0 = half the time no hand could hold the fire (ideal player in zone 10 %, dev/handover/reports/cal-p2.md §P1). */
 /* review/cal-p2b (ROOT-75 07:36Z, owner OD 20/11 ~06:50Z «đạt hết mà toàn 9/10» + ~07:35Z broken grading IS fixed): the full-marks window lev[kind].fast of
    the 9 mgPace kinds (co tho doi doden kim le tc xa thq) was smaller than a careful normal-speed round (skilled bot p75 time share .21–.56), so a
    PERFECT run kept only .82–.94 (kim fast 0 = every ms cost; xa .07 = 0.7 s of 10 s). New fast = reports/mg-score-same.md pace proposal: full marks
    while a p75 round is still inside the window at her matching board; xa keep .1 → .4 (same proposal); law 5: fast still falls as the board hardens. */
 blend:{w:.32,star:[.25,.55,.85]},
 pace:{fast:[.2,.4],keep:[.5,.8]},word:[3,5,7,9],aid:[3.5,1.5],lesson:[5,8],lessonPts:[2,5,8],fullAt:4,gamma:1,tol:[.45,1,.4],more:2,npc:[4,.4],wk:{lvQ:[0,0,1,1,2,2],th:[6,10,15],cong:[3,2]}}});
/* GAP MG11 (jmgx; owner OD 20/11 ~08:40Z scan, MAIN ROOT-79 16:25Z): the seven boards that joined «Thử tay» read the board ease like every kind (mgLev:
   [value at ease 0 = hardest, value at ease 5 = easiest], linear). Each pair is set so the MIDDLE ease (BAL.mgTier.mid = 2, a rank-0 hoc board) gives the
   board exactly as it was before MG11 (old typed numbers in brackets), so a matching play is unchanged and law 5 (harder as she climbs) / the Thử tay ladder move round it:
   nghe.cross   ms a line takes to cross the screen (6500)          truyen.lim  ms per round (12000)      mac.lim  ms per round (10000)    thoico.lim  ms per round (8000)
   thu_choi     ms = first step of the ball (820), dec = faster per tap (140), min = floor (420), n = taps (3)
   thu_tam      k = strictness of «đều tay» (1.6: score 1 − k·sd/mean of the stroke lengths), n = strokes (5)
   tuoi         f = × the pour pace BAL.shelf.plant.game.ms (1 = the old pace; bigger = slower water = easier) */
Object.assign(BAL.mgTier.lev,{nghe:{cross:[5600,7850]},truyen:{lim:[10000,15000]},mac:{lim:[8500,12250]},thoico:{lim:[6800,9800]},
 thu_choi:{ms:[700,1000],dec:[160,110],min:[370,495],n:[3,3]},thu_tam:{k:[1.9,1.15],n:[5,5]},tuoi:{f:[.8,1.3]}});
/* mg-ready-guide (owner OD 20/11 ~00:20Z «Sẵn sàng» + «Hướng dẫn», KIT §13.7): the guided tutorial round, played on the EASIEST board = the lowest gap of the
   calibration ladder BAL.ag.mg2.cal.d (read at play time, no second number here); part = it ends once this share of the engine's rounds is done
   (round a/b: a−1 ≥ max(1, ceil(b·part))) or when the engine ends; ms = the longest it may run; back = the pause on «Xong» before the rules screen returns. */
/* mg-visual (owner 20/11 ~05:10Z): ONE look for «this cue is lit» and «this target was pressed» on EVERY mini-game board (kg82Spr glow + kg82Cue in j82):
   pop = scale of the lit / pressed target (was 1.08 / 1.14: hard to see) · ms = how long the pop + lit ring stay · glow/ring = colours · blur = glow size px ·
   pass = glow passes (shadow stacks) · ringW = ring width as a share of the target's width · dim = darkening of the UNLIT painting under a lit cue (contrast) */
BAL.mgFx={pop:1.24,ms:300,glow:"#fff0a0",ring:"#ffffff",blur:44,pass:3,ringW:.07,dim:.18};
/* dauho-lv5 (owner 21/11, Fold, «Thử tay: Đầu hồ · hồi 5/5», verbatim: "để cái mức độ mà cho mọi người chơi á, là ở cái level 5, cái hồi 5 mà bạn đang test tôi á,
   thấy nó hợp lý hơn á. Với lại là cái vòng ... của cái mũi tên này nó vô cái bình nó to quá, cho nên có một cái mũi tên nó nằm ở ngoài nhìn nó bị giả đó. Mình thu
   lại cho ngay đúng cái bình đi.").
   mgTier.base[kind] = the REAL-PLAY board of a kind starts at a Thử tay round (jmgt mgTier, only when no fixed gap o.d is given, i.e. contests, exams, lessons,
     NPC hands, co-op; Thử tay rounds and «Hướng dẫn» pass their own gap): r = the round (1..BAL.ag.mg2.cal.d.length; 5 = the hardest round), the gap is that
     round's gap at rank 0 for everyone (no art-level or occasion discount: one board for all), then climbs with rank (+ big contest = B.big more) to the gap
     of board ease lo at rank-steps n (law 5: harder as she climbs, every rank a little harder, the ease levers never flat before the top rank).
   mgArt = the painted target art measured ON THE PICTURE (shares of its width; dev/handover/reports/dauho-lv5.md §2):
     dauho (mg-dauho-pot.webp 290x560): mouth opening centre cy below the picture top, half-width rx / half-height ry; rim = outer lip half-width (an arrow
       there bounces = miss); neck = [y below the top, half-width] points of the painted neck (lip → ears; an arrow striking it = miss); ear tubes: centre ±dx from the picture centre, cy below the top, opening half-width rx / ry; q = {c: share of R that is
       «Trúng giữa bình», m: [centre, rest of the mouth], ear}; lean = the most a stuck arrow tilts (rad), sink = share of the arrow sunk below the hole plane;
       wind = share of the strongest gust where the wind word line turns «nhẹ» / «vừa» / «mạnh» (below wind[0] = «Gió lặng»; owner 21/11 wants the wind words back).
     ban (mg-ban-target.webp 470x560): face centre at cy of the picture height; ring = outer radius of gold / red / blue / black / paper (share of the
       picture width); q = the score of an arrow inside each ring (outside the paper = Trượt); fit = picture width at size 1 as a share of the board height
       (the largest the 0.58·H stand line lets it be). Board size by ease = BAL.mgTier.lev.ban.size. */
BAL.mgTier.base={dauho:{r:5,lo:0,n:8}};
BAL.mgArt={dauho:{mouth:{cy:.0414,rx:.2207,ry:.0224},rim:.2776,neck:[[.069,.276],[.152,.2],[.345,.165],[.455,.162]],ear:{dx:.329,cy:.431,rx:.0655,ry:.019},q:{c:.5,m:[1,.7],ear:.5},lean:.15,sink:.3,wind:[.05,.35,.7]},
 ban:{cy:.4275,ring:[.072,.159,.247,.336,.438],q:[1,.75,.5,.25,.25],fit:.6}};
/* mg-play2 (owner OD 20/11 ~08:05Z Hoa đăng «luồng ánh sáng màu vàng này quá nhạt … không có thấy đường» + «cứ tưởng là phải hứng mấy cái hoa sen»): two more
   parts of the SAME cue kit (j82 kg82FxLane / kg82FxBad), for every board that has a path to follow or a thing to AVOID:
   lane = opacity of the lit path's core (was a .32 gradient: hard to see) · laneEdge = width px of its two bright edges · laneDim = darkening of the board OUTSIDE
   the path (the path reads by contrast) · laneMin = the least luminance gap (0..255) the lit path must keep over the board beside it (test mg-play2) ·
   bad = width share of the danger ring round a thing to avoid (colour = kit --bad) · badMs = how long the hit burst stays · badShake = px the hit thing / the player's
   piece shakes on a hit */
Object.assign(BAL.mgFx,{popMax:30,/* huong-cue: longest pop / verdict kept as words */lane:.62,laneEdge:3,laneDim:.34,laneMin:40,bad:.09,badMs:520,badShake:5,zone:.62,laneFade:.25});/* laneFade (den-look): share of the lane width over which the dim board fades in beside the path (no hard edge) *//* zone: gauge «keep it here» band alpha (kg82FxLane.zone) */
/* mg-craft-hoa (owner OD 20/11 ~08:15Z, design MG_CRAFTS.md §3): Cắm hoa «Chọn mùa · cắt cành · nghiêng thế» (jcraft_hoa.js). Levers = [ease 0, ease 5] through mgLev:
   ghost = share of the ruler ticks / lean fan shown · cutTol = length error that still counts full (share of the target) · angTol = lean error in degrees that counts full ·
   alike = off-season look-alikes in the tray of 6 · sway = stem wobble while it is turned (share of half a turn) · limStem = ms per stem of the vase (clock = stems × this).
   BAL.mgTier.hoa: n = stems of the 3 vases (+ mgMore, at most maxMore) · thien = Thiên length in vase heights · k = Nhân/Thiên, Địa/Nhân · guest = guest stems ÷ the Nhân (odd) / Địa (even) they hang off ·
   ang = lean degrees per stem, signed (Thiên, Nhân, Địa, guests) · cut = uncut stem in vase heights · zero = the error (× its tolerance) at which a part scores 0 · seat = mouth radius in vase heights ·
   w = score weights (season, length, lean, balance) · wrong = season share lost per wilted pick · balTol = balance error (share of the stem lengths) that scores 0 · judgeMs = pause on the stars. */
BAL.mgTier.hoa={n:[3,4,5],maxMore:2,thien:1.5,k:[.75,.75],guest:[.85,.85,.65,.65],ang:[-10,45,-75,25,-50,60,-30],cut:2.2,zero:3,seat:.4,w:{sea:.2,len:.4,ang:.3,bal:.1},wrong:.5,balTol:.35,judgeMs:1500};
BAL.mgTier.tut={part:.2,ms:60000,back:1100,lead:260};/* lead = ms before a timing game's right moment that the hand says «chạm» (KG82.hint: rhythm, aim), a reaction time */
/* mg-craft (owner OD 20/11 ~08:15Z "4 cái game mà chơi cái kiểu mà đồ nét chữ … boring lắm": each craft its OWN real mechanic; design dev/design/MG_CRAFTS.md):
   the board levers of the four craft boards, each [at ease 0 (hard), at ease 5 (easy)], read through mgLev(env, kind, name) — ONE CORE: no board number is typed in
   the engines. Each kind's builder adds knobs ONLY inside its own block. Kind keys, kG / kAdj, cal.k and the hand band are unchanged (MAIN ROOT-75 order).
   td_cong «Thêu theo nét» (jcraft_theu stitch board; built as Thêu «Thêu lướt sắc», moved to the Công lesson by the owner 21/11 ~01:05Z — Thêu keeps the j82
     memory game; was td_cong tol = the old dotted-line trace tolerance): beat = ms between stitches · win = on-beat window ms (±) · near = the «near» window as a multiple of win · st = stitches per band · alike = decoy spools one
     shade step off the right one · sway = hoop drift as a share of the hoop · peek = ms the finished sample stays before its cloth covers it (≥ round time = stays) ·
     wC / wS = weight of the right colour / the stitch rhythm in a piece · lim = ms per piece (the time part mgPace) · fast / keep = mgPace of that time.
   kim «Cắt hoa giấy» (jcraft_kim): folds = most folds of the hardest sheet (sheets 2 · folds/2 · folds, folds 8 = 2·4·8, 4 = 2·2·4) · holes = cuts of a sheet before mgMore · size = a cutter's size as a share of the wedge radius · place = snap tolerance as a share of
     the wedge · peek = ms the unfolded sample stays (≥ lim = stays) · alike = look-alike cutter shapes · lim = ms per sheet · extra = what one extra hole costs
     (share of a right hole) · fast / keep = mgPace (kept from review/mg-tune-r1).
   Measured STEP 3 (dev/measure/mg-bots.js skilled n=30, graded): theu Dễ/Vừa/Khó 8.6 / 7.7 / 6.8 (old pattern 7.2 / 7.2 / 6.7), kim 8.7 / 8.5 / 6.8 (old untangle 9.0 / 8.6 / 7.7).
   Integrate (lead #2, same harness, graded mean Dễ/Vừa/Khó): ve 9.9 / 8.2 / 5.5 (old trace 9.1 / 7.9 / 5.4) after ve ease-0 place .012 · ramp 220 · dry 150;
   hoa 8.4 / 7.5 / 7.2 (old rings 8.5 / 7.8 / 7.7) after hoa ease-0 cutTol .12 · angTol 16 · sway .01 · limStem 10000 (was 4.4 / 4.7 at Vừa / Khó).
   ve «Thủy mặc» (jcraft_ve) · hoa «Chọn mùa · cắt cành · nghiêng thế» (jcraft_hoa): the design's proposed shapes; their builders tune and add knobs here. */
Object.assign(BAL.mgTier.lev,{
 td_cong:{beat:[440,850],win:[20,65],near:[2,2],st:[3,3],alike:[3,0],sway:[.02,0],peek:[3000,40000],wC:[.35,.35],wS:[.65,.65],lim:[18000,30000],fast:[.8,.8],keep:[.6,.6]},/* td_cong tune 21/11 (Công lesson kG 1.3; mg-bots skilled graded Dễ/Vừa/Khó 8.8 / 8.1 / 5.4 vs the old dotted-line trace 9.3 / 7.9 / 5.5): beat 520→440 | 900→850 · win 45→20 | 75→65 · lim ease-0 30000→18000 */
 ve:{place:[.012,.14],tones:[5,3],ramp:[220,2600],dry:[150,30000],peek:[3000,40000],bleed:[.07,.03],flick:[420,420],holdMin:[40,40],reach:[1.1,1.5],wPlace:[.5,.5],wTone:[.4,.4],wClean:[.1,.1],lim:[7000,9500],limBase:[8000,10000],fast:[.5,.7],keep:[.6,.8]},/* mg-craft-ve «Thủy mặc» [ease 0, ease 5]: place = hit radius, share of the scroll width · tones on the stone · ramp = ms for the brush to pass every tone · dry = ms before the loaded brush pales one tone · peek = ms the master's sample stays unrolled (a tap re-opens it) · bleed = blot radius share · flick = ms a person takes to flick (bot oracle) · holdMin = ms a press counts as loading · reach = flick hit radius × the layer's radius · wPlace/wTone/wClean = score parts · lim/limBase = ms per motif / fixed · fast/keep = mgPace */
 hoa:{ghost:[0,1],cutTol:[.12,.15],angTol:[16,20],alike:[3,0],sway:[.01,0],limStem:[10000,17000]}});
Object.assign(BAL.mgTier.lev.kim,{folds:[8,4],holes:[2,2],size:[.11,.13],place:[.09,.17],peek:[4000,60000],alike:[2,0],lim:[30000,50000],extra:[.4,.4]});
/* danh-balance (ONE CORE, owner 16/11 07:25Z): every Danh gate that was a typed number now reads BAL.danhG, and the succession
   condition rows read BAL.succN; values unchanged. forget: j3 "Bị bỏ quên" (Sủng ≤0 and Danh ≤ forget at the two lowest ranks →
   lãnh cung); fatherBook: j4 thầy đồ road "Xin khắc in sách của cha"; thdBook: j97 rare thd_sach; srvWed: j42 servant wedding offer;
   kcVihanh / kcR5: jkc outside-palace rare endings. succN.b* = Thái hậu buông rèm (p b), c* = Nhiếp chính (p c), th*: Thái hậu
   support / opposition, npc* = an NPC dowager's claim, rareCDanh: the rare end check of succRareOK. */
Object.assign(BAL,{danhG:{srvRise:.2,/* review/balance-2: share of a serving maid's Danh kept when she is raised to Đáp ứng (j42 srvRise) */forget:5,fatherBook:40,thdBook:40,srvWed:20,kcVihanh:60,kcR5:50},
 charity:{khac:1,bac:35,duc:3,danh:5},/* "Phát bạc cứu giúp cung nhân nghèo" (j85 charity, once a month; two doors: Tài nghệ · Tứ đức button + Hành sự card jact adCharityCard, one lock S.charM). danh-p1 (owner P1 16/11 12:55Z): bac 20→35, danh 1→5 */
 succN:{bAge:BAL.age.reign/* one-core: same concept as age.reign */,bDanh:50,bTam:35,bBac:100,cRank:4,cDanh:70,cTam:60,cTh:60,cBac:300,thB:50,thOpp:20,npcDanh:50,npcTam:35,rareCDanh:80}});
/* CLOSE MAID BY ORIGIN (jcmaid.js, D58 review/close-maid, owner approved table v2 16/11). % per month unless named; loy = loyalty range at
   arrival by source; pickN candidates, the picked one's talent works after pickAlone months, pickKeep % a month her decay is undone;
   kinSave % a "kín miệng" maid refuses a buyer; talents: talBac bạc, talSuc Sức, talSpy % a true fact, while her loyalty ≥ talLoy;
   secret: she confides at secTell % once loyalty ≥ secTrust; until then secOut % a month it costs (lover Danh −secDanh, debt bạc −secBac,
   family lòng −secLoy/2, spy proof to the buyer, true-capped); known: help secPay bạc (lòng +2×secLoy) or not (lòng −secLoy).
   dilCd = months between two close-maid dilemmas. tt press (ttPress %): Danh +ttDanh / Sủng −ttSung, or lòng −ttLoy and bạc −ttBac;
   dtq: guards (dtqGuard % of the NPC harms aimed at her household fail), brawls (dtqBrawl %): lòng ∓brLoy, Danh ±brDanh, oán ∓brOan;
   muoi / cnv scorned (scorn %): lòng −scLoy Danh −scDanh, or Danh +scDanh Đức −scDuc oán +scOan; muoiBack % of her bribe money back;
   land: gift landGift % (bạc +landBac), questioned landAsk %: lòng −laLoy Thái hậu +laTh, or Danh −laDanh Thái hậu −2×laTh lòng +laLoy/2;
   ch: Thái hậu thiện cảm +chThUp at chTh %, every wrong she does: chKnow % Thái hậu −chThDown; thd: her maids' merit +thdMerit a month;
   cn: cnSpy % a true fact, turned: Danh −cnTurn; cnv: cnvNet % a true fact; td: meets the old servant at tdMeet % (once, costs tdBac),
   chứng cứ vụ án +tdCase, exposure tdExpose %: Danh −tdDanh, Thái hậu −tdTh. seeMat = Tai mắt to hear of other consorts' maids. */
Object.assign(BAL,{cmaid:{loy:{home:[65,85],land:[70,90],th:[55,75],pick:[35,50],palace:[40,60],room:[60,80],noi:[40,55],old:[100,100]},
 pickN:3,pickAlone:3,pickKeep:50,kinSave:50,talLoy:40,talBac:3,talSuc:3,talSpy:6,secTrust:70,secTell:8,secOut:3,secLoy:10,secDanh:3,secBac:15,secPay:30,dilCd:6,
 ttPress:6,ttDanh:3,ttSung:3,ttLoy:10,ttBac:30,dtqGuard:50,dtqBrawl:6,brLoy:8,brDanh:1,brOan:8,scorn:6,scLoy:6,scDanh:1,scDuc:1,scOan:8,muoiBack:40,
 landAsk:8,landGift:4,landBac:25,laLoy:12,laTh:2,laDanh:2,chTh:15,chThUp:2,chKnow:50,chThDown:4,thdMerit:1,cnSpy:10,cnTurn:8,cnvNet:8,
 tdMeet:4,tdBac:30,tdCase:1,tdExpose:3,tdDanh:4,tdTh:3,seeMat:3,
 /* review/close-maid-r1 (ONE CORE): newLoy = loyalty of the maid Nội vụ phủ sends when she gives one back (cmReplace); spyDanh = Danh lost for sending a confessed spy back */
 newLoy:40,spyDanh:1}});

/* jmood (D12, owner OD:L600): her Sims-like mood bar S.mood.v −100…100. band = [U uất|, Phiền muộn|, Bình thản, Vui vẻ|, Hân hoan] cut points.
   emo[k] × strength of every feeling that lands on her; sat = saturation (a push the same way as v is ×(1 − |v|/sat), ≥ .2); ok / fail = her act with a real roll; rest / restDs up to restCap; decay = share of
   |v| lost each tuần (≥1); keep = tuần a cause stays listed; need / fr / foe / maid / wx = weekly pushes. Effects: od = odds points at ±100
   beyond odFrom (≤ one ladder step); aff = thiện cảm gains toward her ×(1±aff) beyond affFrom (angry low mood: affAngry); ghen = rivals'
   jealousy ×(1+ghen) at Hân hoan; lock = acts locked at the lowest band; comfort = the visit of someone who loves her (ch % a tuần at the
   lowest band, chLow at the low band, cooldown cd tuần, thiện cảm ≥ aff or her maid ≥ maid; answers: big / small mood, affUp / affDown, k khắc). */
Object.assign(BAL,{mood:{band:[-60,-25,25,60],emo:{vui:.35,buon:-.25,gian:-.2,so:-.25,ghen:-.2,lo:-.2,dau:-.4,muu:0},sat:320,satMin:.2,ok:3,fail:-3,rest:5,restDs:8,restCap:25,
 decay:.2,keep:6,logMax:12,need:{sucLo:30,sucLoD:-6,sucHi:80,sucHiD:1,ill:-4,bacLo:15,bacD:-1,conf:-2,out:-5},fr:{aff:30,d:1,cap:3},foe:{oan:60,d:1,cap:1},maidHi:70,maidD:1,
 wx:{nice:["hoa đào bay","trăng rằm","mai nở trong tuyết","nắng vàng","đom đóm","lá phong rơi"],niceD:2,harshD:-3,wetD:-1},
 od:6,odFrom:30,aff:.15,affAngry:.25,affFrom:25,ghen:.2,lock:["Múa trong yến tiệc","Kinh hồng vũ","Đánh đàn ở ngự hoa viên","Đàn khúc Phượng cầu hoàng"],
 comfort:{ch:35,chLow:15,cd:4,aff:40,maid:60,big:22,small:8,affUp:4,affDown:2,danh:1,k:1}}});
/* MEMORIES + HOOK LEDGER (D26, review/memories, dev/build/jmem.js; spec dev/ideas/DESIGN_IDEAS_1115.md #1 + #3).
   mem: cap records per pair · fadeMo weight lost a month · keepFloor share of the first weight a "keep" deed (betrayal, poison, rescue) never fades below ·
   memMod = Σ sign·weight / modDiv, capped ±modMax (added to talk / Kết giao odds with that person, taken off NPC hostility) · recallMin weight for the
   person to bring it up, once per recallCd tuần · invokeMin / invokeCost: "Nhắc lại ân xưa" (good memory → she is owed one ân; the non-bạc road) ·
   logMin: a memory this strong writes a Sổ ghi line · relMin: relation swing inside an event that makes a generic memory · pairCap pairs kept (NPC↔NPC pruned first) ·
   reinforce share of the base weight a repeated deed adds; a repeated deed never grows past reinforceMax × its base weight (r1: small talk cannot be farmed into an ân) ·
   strong / faint: weight words "nhớ rõ" / "còn nhớ" (below faint "đã phai"), strong = grateful quote tail; hate: a keep-deed this strong gets the lifelong-grudge tail ·
   seenAf: an unseen scheme that drops thiện cảm this much is still remembered · taintAf: a gift that drops thiện cảm this much (tainted item) = "gifttaint" ·
   relCap: max weight of a generic event memory · invokeAff: thiện cảm when the nợ-ân ledger cannot take the ân · w: base weight per deed (jmem MEM_DEEDS).
   hook: useOan Oán added each time a strong secret is used · strikeCh / lostCh base chance (+useStep a use) the target strikes back (gets proof on her) /
   destroys the secret · failRel: thiện cảm lost when the press fails · fadeCh monthly chance a strong secret fades · pressBase odds base of "Lấy chuyện riêng ép nàng" (+ Tâm cơ/tcDiv) · max own hooks kept.
   MEM-UPGRADE (review/mem-upgrade, owner 16/11 13:25Z (A) + 13:40Z ONE LEDGER (b)):
   mem.holderCap people one holder keeps in mind (weakest pair pruned; her and lifelong last) · life deeds that are LIFELONG (never fade, own cap lifeCap per pair);
   lifeMin: any memory this heavy is lifelong too; lifeRel: an event relation swing this big makes a lifelong generic memory ·
   fadeT[trait] = [good, bad] multipliers of fadeMo by the holder's nết (product over both traits; servants trung/tham…, the Emperor's nongnay…); fadeJit ± fixed
   per-person spread (from the id); fadeMinK floor of the multiplier · behaviour: memDanger / lifeDanger share of the worst bad memory that keeps the will to harm
   (danger) alive, ≤ dangerMax; goodGate: good memory weight from which a person will not harm the other (when > goodOver × the worst wrong) ·
   mirrorDiv: an NPC act like the remembered wrong weighs 1 + weight/mirrorDiv more · socDiv: target pull of a remembered person in everyday dealings (1 + |memory|/socDiv);
   socK: kind / hostile everyday acts × (1 + memory/socK) · srvLoy: loyalty points per memMod point a servant's memories add in bribe odds.
   hook.czMax cause records kept per holder · czClose thiện cảm from which a kind act's cause is "thân" · czRash buổi after a slight that make a hostile act "nóng giận" ·
   czTv: below this grudge an ambitious doer aiming higher acts "vì tham vọng" · czGhenDiv: Sủng gap / this = jealousy of a rival (cause kind "ghen") · czDeadMax: causes kept on a dead consort (newest). */
Object.assign(BAL,{mem:{cap:5,fadeMo:2,keepFloor:.35,modDiv:8,modMax:10,recallMin:15,recallCd:3,invokeMin:20,invokeCost:15,logMin:25,relMin:15,pairCap:300,reinforce:.6,reinforceMax:2,
 strong:40,faint:15,hate:30,seenAf:8,taintAf:10,relCap:40,invokeAff:6,
 w:{ally:12,gift:8,giftbad:8,gifttaint:50,secret:8,care:6,apology:6,humble:6,provoke:10,vent:15,spy:12,rumor:25,frame:45,poison:70,accuse:40,bribe:15,block:15,plant:35,steal:15,musk:80,kidharm:80,takeaway:40,reward:15,pardon:45,conf:20,cutpay:15,judge:40,helped:20,failed:8,exposed:25,kept:25,broken:35,pressed:20,scheme:20,good:0,bad:0,
  help:10,visit:10,warn:15,mediate:12,humiliate:20,drop:15,nightsteal:12,threat:20,demote:60,confine:30,srvreward:10,srvpunish:15,srvshield:45,rescue:70},
 holderCap:16,life:["poison","musk","kidharm","pardon","frame","takeaway","gifttaint","demote","srvshield","rescue"],lifeMin:60,lifeCap:3,lifeRel:30,
 fadeJit:.25,fadeMinK:.1,
 fadeT:{/* pool nết rows come from THE trait table BAL.net.T[t].fade (jnet.js); the Emperor's keys: */
  nongnay:[1.3,.6],nhantu:[.8,1.8],datinh:[1.6,1.3],lanhlung:[.6,.6],chamchinh:[1,1],danghi:[1,.6],mesac:[1.3,1],trongtai:[1,1],hieuthao:[1,1]},
 memDanger:.5,lifeDanger:.9,dangerMax:85,goodGate:40,goodOver:1,mirrorDiv:25,socDiv:20,socK:40,srvLoy:1.5},
 hook:{useOan:15,strikeCh:25,lostCh:20,fadeCh:4,pressBase:50,max:40,useStep:5,failRel:10,tcDiv:4,czMax:24,czClose:20,czRash:3,czTv:30,czGhenDiv:3,czDeadMax:8}});
/* BAL.psk = PROMO-SKIP (jexam promoReward, owner 16/11 06:20Z/06:45Z/07:15Z): long-road rewards = direct rank; every reward has a gain AND a loss.
   son1 (first prince): Hoàng hậu oán +hhOan, every other mother of a prince oán +momOan.
   emp (Hoàng thượng side wins): Thái hậu quý −th; every consort of a losing side oán +oan.
   th (Thái hậu side): Sủng −sung; errN Thái hậu errands (any j72 Thái hậu template that can be built then), the first after errAt tuần, then every errGap tuần.
   quyen (quyền thần side): Danh −danh; after `after` months, each month p % (once): the grown Emperor strikes back Sủng −hitSung, Danh −hitDanh.
   seat (full seat, owner 07:20Z): one-off Bạc +bacM × the next rank's monthly stipend (BAL.pay), Danh +danh, gifts × Hoàng thượng's bestow, a phong hiệu (or Bạc +hieuBac if she has one),
   her house power +pow (and her father's dad +dad); loss: every consort ghen +ghen (an NPC winner: the others oán +oan). Rank unchanged.
   psk.ghen = the jealousy of the other consorts when she is raised by a direct decree or a passed grace exam (jexam exDirectUp / exGraceUp). */
Object.assign(BAL,{psk:{ghen:10,son1:{hhOan:15,momOan:8},emp:{th:8,oan:10},th:{sung:6,errN:2,errAt:3,errGap:6},
 quyen:{danh:6,after:24,p:6,max:1,hitSung:10,hitDanh:6},seat:{bacM:4,hieuBac:120,danh:6,gifts:2,pow:8,dad:5,ghen:10,oan:6}}});
/* BAL.il — ITEM LEDGER + ITEM CONSERVATION (owner 16/11 13:30Z (3) + 13:40Z ONE LEDGER; jil.js reads only these):
   no item ever vanishes. Sold → the market ("mkt"): each week it may show up in her Nội vụ phủ tray (shopP), and at the latest by the ceiling
   (retW weeks after the sale) someone brings it to her for ransom (ransomPct of its price); refused or unpaid → it comes again againW weeks later.
   Confiscated → Nội vụ phủ store: after confW weeks she may atone (chép kinh sám hối, Sức -confSuc) to get it back; NPCs get theirs back (npcConfP).
   Broken / burnt → Nội vụ phủ mends it, back to the owner after fixW weeks. Ownerless pieces in the store (a dead person's effects, returned stock)
   go to market resaleP each week. NPCs: an NPC's sold piece is bought back by her (npcBackP) or by another consort (npcBuyP) when they have the bạc.
   Higher-rank room: searched only by the Emperor's decree, asked with at least empEv pieces of REAL evidence (case evidence + evidence on the holder).
   logCap = ledger lines kept (oldest dropped; items themselves are never dropped).
   The box keeps moving (save size bounded, reviewer r1): a servant sells a pocketed piece outside after srvW weeks (then it returns like a sold piece);
   tang vật goes to the Nội vụ phủ store after cctW weeks; Hoàng thượng / Thái hậu each keep at most heldCap offered pieces, older ones go down to the store;
   ownerless pieces outside beyond mktCap are bought back by Nội vụ phủ and handed out to a consort as allotment. */
Object.assign(BAL,{il:{shopP:12,retW:[6,12],ransomPct:120,againW:[4,8],confW:8,confSuc:8,npcConfP:30,fixW:[2,4],resaleP:15,
 npcBackP:20,npcBuyP:8,empEv:2,logCap:600,srvW:12,cctW:48,heldCap:30,mktCap:60}});
/* NPC ROADS (Foreman D, review/npc-roads; ROAD_MAP §0 'NPC roads', reports/npc-roads.md) — ONE CORE: every number of jnroad.js */
Object.assign(BAL,{nroad:{
 /* months from her arrival (or the game start) to her chapter .4; months between two chapters [min, max] */
 d0:[2,6],gap:[4,7],
 /* her chapter odds = odA(her, base + her test stat / div + sc after a won chapter + help when the player helped) */
 base:30,div:3,sc:8,help:15,
 /* real gains and losses of a chapter end (her own fields; pow = her house's power, j55). U4 balance (npc-roads-bal.js): her odds give more
    won than lost chapters (≈ 50 : 37), so a win pays less than a loss costs — the expected Danh/Sủng of a chapter is about zero and NPC
    roads do not inflate the harem (first numbers 4/3 vs −4/−3 doubled the lives with an NPC Hoàng hậu, 17.5 % → 42.5 %) */
 fx:{win:{danh:3,sung:2,suc:-4,pow:2},mid:{suc:-2,danh:-1},lose:{danh:-4,sung:-3,suc:-2,pow:-2}},
 /* the loser's grudge toward the winner (oán), and the player's share when SHE is the NPC's rival */
 oan:{win:8,lose:5},onMe:{win:{danh:-2,sung:-2},lose:{danh:1}},
 /* the help hồi: the chapter index range it may fall on (one per road per life), the bond or shared side she needs to ask,
    the deadline (weeks), the costs of the two roads (bạc road vs Sức road of equal weight), the bond she gives back */
 helpN:[5,10],askRel:20,dl:6,bac:[30,45,70,100],suc:8,rel:6,relBad:-12,relB:8,no:4,
 /* help options (r1, ONE CORE): odds of the Sức road / bạc road / dò la / che chở / tự sắc thuốc, the loss sizes l2/l3 on a failed try,
    the Đức a betrayal costs, the bond the dò-la target loses */
 op:{pS:55,pB:75,pDo:70,pChe:60,pY:50,l2:2,l3:3,betray:3,rbDo:4},
 /* Q1 (audit D-Q2, OD:L1601 (2) "xin tiền xin bạc … không phải là phụ tuyến"): the help kinds an NPC may ask; the first is the fallback of a
    chapter whose cast maps to none. «bac» is OFF (money stays only as a cost inside an ask); add "bac" here to deal it again (one key) */
 kinds:["thu","emp","th","hh","do","y","che"],
 /* rank thresholds of the bạc cost: index = how many of these ranks her rank reaches (RANKS index) */
 bacRk:[2,4,6],
 /* palace news lines a month (NPC chapter ends), at most */
 newsMo:2,
 /* QUESTLINE Q2 (QUESTLINES_AUDIT §3 H-a/H-d, §4 Q2; engine jnroadhp.js): the side line as a process + two-way.
    fin = the reward when an NPC wins her road FINALE (the chapter that closes the road) after the player's help on that road and no betrayal
      (round 2, laws 1–2: a betrayal is help to the rival she told — that rival gets a «mách tin» record on her own road and her next chapter
      gains `help` above, so the same fin reward can come from either option; review/questline-q2 §ROUND 2)
      (nothing on a lost or drawn finale, OD:L1601 (4)): index = how many of fin.rk ranks HER rank reaches (as bacRk); danh = her Danh,
      rel = the asker's bond to her (j72 q72Rel), owe = nợ ân the asker owes her (j72 ledger);
    sb = strike-back of a betrayal: the fact reaches the betrayed NPC only through a real carrier (her own Tai mắt oSee × BAL.ag.know.eye, her
      servants' Nghe ngóng + tell choice, a bought servant of the player who sells it, the rival who heard it and dislikes the player — the
      jagknow rules, BAL.ag.know.tell); checked each month for mo months after the betrayal; when it lands: oán oan toward the player
      (feeds hostility → the NPC's agent deeds aim at her, jagent agSpite; no flat roll), a servant / man loses oan of lòng instead;
    hpMax = lines kept in the Mệnh truyện «Phụ tuyến» list (oldest dropped) */
 fin:{rk:[2,4,6],danh:[2,3,4,6],rel:[4,6,8,10],owe:1},sb:{oan:15,mo:6},hpMax:12,
 /* fix (ONE CORE): the test stat of someone who lacks it, the loyalty a man starts from, how many of the coldest people a rival is
    drawn from (people / houses) */
 st0:40,loy0:50,rvTop:3,offTop:2,
 /* origin of an NPC consort from her house (clan): [origin key, weight] */
 org:{"Tể tướng":[["tt",1]],"Đại tướng quân":[["dtq",1]],"Thái hậu":[["ch",1]],"Hàn lâm":[["thd",3],["td",1]],"Lễ bộ":[["thd",1],["td",1],["muoi",1]],"Hộ bộ":[["muoi",3],["td",1]],"":[["muoi",1],["thd",1],["td",1]]},
 /* one father = one record: these origins are never given to an NPC when the player has them */
 uniq:["tt","dtq"],
 /* OR19 (OD:L1288, STORY_ROADS_PLAN §3.0): an NPC consort may be a foreign princess (Công chúa hòa thân) — rolled ONCE at game start (or on
    arrival) with the SAME share as the player's pool: BAL.orig.ow.nc out of the consort origins of BAL.orig.ow (cnv = a servant, never a
    consort), country by BAL.orig.br.nc; max = princesses of one country in one game (the player counts); faces = princess faces per country
    (shared by player and NPC rolls, never the same face twice in one game; stand-in = her drawn face until the princess art ships) */
 fp:{max:1,faces:3,no:["cnv"]},
 /* at most this many NPC roads have the player as their rival at one time */
 meMax:3,
 /* U2 maids (cnv roads): her test stat = st + her trait (j10 STR keys) + rk per servant rank (srk); her chapter end on her own fields
    (mp = merit toward the next servant rank, j14; loyal = to her mistress: a maid who wins her own fight leans a little less on her
    mistress), her mistress's share (Danh), the grudge (af) between her and the rival maid, the loyalty her own maid needs to ask */
 m:{st:40,tr:{lanh:15,trung:8,tham:5,nhat:-5,chuyen:0},rk:4/* per maid rung (maid-ladder-6: 6 rungs, was 5 per rung of 5 — the top stays 20) */,
  fx:{win:{mp:4,loyal:-2},mid:{mp:1,loyal:-1},lose:{mp:-2,loyal:-4}},mis:{win:{danh:1},lose:{danh:-1}},af:8,askLoy:60},
 /* U3 men (jnroadm.js; staff eunuchs use m above): st = test stat of a man with none (court men); kidAge = a son of an NPC consort gets
    his road from this age; S.men loyal (jmen bribe odds) and the rival man's share; court men lean (af) toward their patron consort
    and away from the other side, a lost chapter costs the patron Danh; house heads pow (j55) + the rival house's share + the house
    relation (rel: enmity of every fight, ally: the marriage road binds or splits); princes fond/tal/hp + the rival prince's fond;
    the bond a man / court man / allied house needs to ask the player */
 men:{st:40,kidAge:15,men:{fx:{win:{loyal:3},mid:{loyal:-1},lose:{loyal:-4}},rv:{win:-2,lose:1}},court:{af:4,danh:1},
  off:{pow:{win:2,lose:-2},rv:{win:-1,lose:1},rel:3,ally:5},hz:{fx:{win:{fond:3,tal:2,hp:-2},mid:{tal:1,hp:-1},lose:{fond:-3,hp:-1}},rv:{win:-1,lose:1}},
  askTinh:30,askAf:10,askRel:25,
  /* GAP OR18 the Emperor's road (jnroade.js): st = his test stat with no reign line (else the throne's grip rg.p); hist = lives of template
     history avoided; askSung = her Sủng for him to ask her help; biên ải: bien = Biên cương, gen = the Đại tướng quân house thế lực; cải cách:
     kho = Kho lúa, old = thế lực the strongest other house loses (win) / gains (lose, as −); kế vị: age = a prince counts from this age,
     fond = his regard for the prince closest to the succession and the next one [first, second] */
  emp:{st:40,hist:1,askSung:60,age:6,bien:{win:6,mid:0,lose:-6},gen:{win:2,mid:0,lose:-2},kho:{win:6,mid:0,lose:-6},old:{win:2,mid:0,lose:-1},fond:{win:[3,-1],mid:[0,0],lose:[-2,-2]}}}}});
/* QUESTLINE Q3 — HELPERS IN HER ROAD (owner D-Q1 = "1", OD 18/11 07:56Z; QUESTLINES_AUDIT §4 Q3; engine jroad.js rdHp*, tags + lines jrdhp.js).
   A «Nhờ …» option of her road tagged in RDHP asks a helper; the helper answers ONE of 4 ways, drawn by weight [full, half, no, sab]:
     full = giúp hết lòng (the option's own odds) · half = giúp qua loa (odds − half, never below min; a sure option then rolls at 100 − half)
     no   = từ chối (the option does not run: she pays noC, keeps the hồi and picks again; that option is gone for this hồi)
     sab  = phá ngầm / mách lẻo (the option fails; Đức − sab.duc; the road's rival {v} oán + sab.oan) — the same shape as jnroad's «mách»
   weight of an answer = w[role] + trK[role] × Σ tr[nết] over the helper's nết + liking × aff + tâm cơ term + own-road term + nợ ân term (each ≥ 0):
     liking = the helper's thiện cảm toward her, clamped to ± affCap (consort aff(); own maid / men loyal − 50; court men, house head af.me / 2;
       Hoàng thượng S.sung − mid.emp, Thái hậu S.th − mid.th, Hoàng hậu S.hh − mid.hh when no NPC queen);
     tc: a helper with Tâm cơ above tc0 who dislikes her (liking < 0) adds (Tâm cơ − tc0) × tcSab to sab;
     own road (NPC consorts, jnroad v.nr): her road has the player as rival → rdRiv to sab; her last chapter won → rdWon to full, lost → rdLost to half;
     nợ ân (j72 ledger, the helper owes her) → owe per debt to full, at most oweMax.
   The willingness word on the option card (Gợi ý row, KIT §28.6 kitHintRow, never odds): role in unk → word.unk; a Nhiều chuyện helper whose
   sab share (%) is at least lk → word.lk; else the largest of full / half / no (sab is never shown): word.full / word.half / no-word by role group
   (noRule → word.rule, noLow → word.low, others word.no). kw = the answer names in the Sổ ghi line. */
BAL.road.hp={
 w:{dad:[60,20,15,5],bro:[55,25,15,5],mom:[65,20,10,5],fam:[45,30,20,5],th:[35,25,35,5],hh:[30,25,35,10],emp:[45,25,30,0],
  eun:[30,35,20,15],srv:[30,35,20,15],maid:[50,35,5,10],doc:[30,25,40,5],off:[30,25,40,5],dan:[35,35,20,10],si:[40,30,25,5],v:[30,25,30,15],v2:[30,25,30,15],mis:[45,30,10,15],
  man:[40,30,20,10],n1:[50,30,15,5],go:[35,35,15,15],foe:[10,25,40,25]},
 tr:{"Ân cần":[20,0,-10,-10],"Lạnh lùng":[-10,15,5,5],"Nóng nảy":[5,0,10,5],"Điềm tĩnh":[0,5,5,-5],"Nhiều chuyện":[0,0,0,15],"Kín đáo":[0,10,5,0],
  "Kiêu ngạo":[-15,0,20,15],"Khiêm nhường":[10,5,-10,-5],"Cương trực":[5,-5,15,-10],"Xu nịnh":[0,10,-5,10],
  "Thật thà":[10,0,0,-10],"Xảo quyệt":[-10,0,0,25],"Thanh liêm":[5,0,15,-10],"Ham lợi":[0,10,0,10],"Rộng lượng":[15,0,-5,-5],"Thù dai":[-5,0,5,20],
  "Trọng nghĩa":[20,0,-5,-10],"Thực dụng":[0,10,5,5],"Tham vọng":[-5,0,5,15],"An phận":[-5,15,5,0],"Thực tế":[0,10,5,0],"Vì gia tộc":[5,5,0,0],"Vì mình":[-10,5,5,15]},
 /* trK: how much a role's nết counts (default 1); a house head's nết is his court face, toward his own daughter it counts little */
 trK:{dad:.3},aff:[.6,-.1,-.4,-.4],affCap:50,mid:{emp:30,th:30,hh:30},tc0:50,tcSab:.5,rdRiv:25,rdWon:10,rdLost:10,owe:15,oweMax:30,
 half:20,min:5,noC:{suc:-3},sab:{duc:3,oan:6},lk:20,
 unk:["go"],noRule:["doc","off","eun","srv"],noLow:["maid","dad","bro","mom","fam","n1"],
 word:{full:"Sẵn lòng",half:"Miễn cưỡng",no:"Không ưa",rule:"Theo quy củ",low:"Còn đắn đo",lk:"Lắm lời",unk:"Không rõ"},
 kw:{full:"Giúp hết lòng",half:"Giúp qua loa",no:"Từ chối",sab:"Phá ngầm",lk:"Mách lẻo"},
 /* the answer-line set (jrdhp.js RDHPL) each role speaks with */
 type:{dad:"dad",bro:"fam",mom:"fam",fam:"fam",th:"th",hh:"hh",emp:"emp",eun:"eun",srv:"srv",maid:"maid",doc:"doc",off:"off",dan:"dan",si:"si",v:"rv",v2:"rv",mis:"rv",man:"man",n1:"n1",go:"go",foe:"foe"}};
/* seat counts per rank (review/seatcap): BAL.seatCap IS j30 SEATCAP (one object, filled from BAL.seat in jbal.js — the only place the numbers are written); lower ranks no cap.
   Every road that sets a rank asks jseat.js seatHas / seatDown / seatUp; seatSettle is the net after every turn and on load. */
BAL.seatCap=SEATCAP;
/* PEOPLE LEDGER (owner core law 16/11 13:40Z: "at mandatory times (e.g. morning court) everyone required is inside"; j95 record).
   led.court = khắc of buổi sáng that are the morning court (thượng triều): Hoàng thượng + the officials on the court roster (jmen menMinW) are
   at Cần Chính điện (thu) every one of those khắc, no dice, no surprise.
   led.cnt = which moment the Dư đồ shadows of the OTHER places are counted at (QUESTION FOR MAIN, review-people-ledger report):
   "now" (owner 13:50Z wording: every place's count at ONE moment, the counts add up to the record, nobody twice / missing) or "arrive"
   (main's dev/test/stage-counts.js: a place's count = the people she meets on arrival, after the walk's khắc). One switch, read by j95. */
Object.assign(BAL,{led:{court:2,cnt:"now"}});
 /* BAL.road (full origin roads) lives in jbalroad.js: it must load before jroad.js / jrd_<origin>.js (review/road-onecore) */

/* D13 spread events across buổi (jspread, owner 15/11 23:20Z): world cards shown per buổi at most cap; a card waits at most maxWait buổi
   (then shown even in a full buổi); a card whose options run code (cannot be saved; autosave held while it waits) at most codeWait buổi. */
Object.assign(BAL,{spread:{cap:2,maxWait:4,codeWait:2}});
/* NIGHT STEALING (Tranh sủng / Chặn ngự giá) — ONE CORE for the act (her and every NPC alike) and for the NPC agent's choice (jsteal.js).
   act: cost = what one try costs (feign: Đức, road: Sức); failSung = Sủng lost on a failed try; rel = thiện cảm lost both ways on a win
   (relAdd: the robbed one also gains oán rel×BAL.relOan.hurt); ghen = jealousy of the robbed consort.
   agent (owner 16/11 14:10Z + 14:45Z + OD:L1386): an NPC tries out of SELF-INTEREST, not hatred. want = need × personality (persW "steal",
   traits + mood, jemo) × relation to the holder × fear × odds (oSteal, the player's own formula). need = weighted gaps of favour (Sủng),
   rank (to Hoàng hậu) and an heir (no living son; with a son the heir gap is heirHas). relation: thiện cảm toward the holder ≥ friend → only friendMin of the wish is left;
   oán toward her adds oanW at oán 100 (a little: hatred drives harm schemes, not this). fear: holder ≥ gap ranks higher → × f; the
   Empress's custom night (mùng một / rằm) → × custom. try chance = 1 − e^(−k × want), at most pMax; at most maxTry tries per night
   (first win ends it, j75 one-try-each still holds). A road try needs Sức ≥ sucMin + its cost; a feign try needs Đức ≥ its cost. */
/* relAdd (j9): oán that a change of thiện cảm n leaves — on a hurt (n<0) the hurt one gains |n|×hurt, the doer |n|×doer; a kindness (n>0) melts |n|×mend.
   One number for the act and the card text (stealKem: oán ngươi +rel×hurt). */
BAL.relOan={hurt:.6,doer:.2,mend:.3};
/* rel-men-servants (KP22): oán a man / servant takes from a real deed (j9 one model; old saves: j9 relMSMig from the recorded grudge).
   grudge = a man reported to the guards / Cung Chính ti, or threatened and refusing (jmen m.grudge); grudge2 = the guard shamed beside him (grudgeN 1);
   hail = a greeting with a man (j22 manHail, both ways: relAdd); srvGrudge = a servant punished without cause (j24 s.grudge); bully = a servant bullied by another (jagstaff s.bullyBy);
   threat = a servant threatened over a secret tie (j10 threatServ, j42 the servant road); bribe = thiện cảm of a servant who took the bribe toward the giver.
   The fade is the shared BAL.oanFade (j28 oanMonth), the caps the shared −100..100 / 0..100. */
BAL.relMS={hail:5,grudge:40,grudge2:20,srvGrudge:30,bully:20,threat:30,bribe:10};
BAL.steal={cost:{feign:{duc:4},road:{suc:5}},failSung:3,rel:15,ghen:25,
 need:{fav:1,rank:.6,heir:.8},heirHas:.25,friend:60,friendMin:.15,oanW:.5,fear:{gap:3,f:.5},custom:.3,k:.25,pMax:.55,maxTry:2,sucMin:20};
/* ================= BALANCE CORE (review/balance-core, owner OD 16/11 23:00Z / 23:05Z / 23:08Z, 22:50Z) =================
   (nobc, D ruling «A + drop growth/start»: start values and growth are LIVE's again; kept here: the course ladder §7 (owner: learning times) and the night-choice odds §4.)
   ONE ladder for every art and Tứ đức course, the night-choice odds. */
BAL.start={
 npc:{study:60,focus:4}  /* study = % a month an NPC takes a lesson (j85 npcStudy, beside j8 npcMonthly), focus = weight of her best art in that pick (§7 course ladder). Start VALUES are LIVE's (j2 start + ORIGINS o, j8 rstats for NPCs: review/night-final-r3-nobc, D ruling «A + drop growth/start») */
};
/* ONE ladder for every art (ARTS) and every Tứ đức course (VIR): points 0–100, bậc 0–5 by floor (tier), named (nm); bậc 5 Tông sư = 100 points = a lifetime's mastery.
   gain: points per lesson point (the lesson game gives 1–3; teachers more) at each bậc — the higher, the slower (bot table in the report).
   odds: the ONE odds bonus of a course at each bậc, wherever it helps a roll (acts, events, night choices); emp = × when the Emperor's trait
   prizes it (Trọng tài: Cầm/Kỳ/Thi/Họa · Mê sắc: Vũ); side = share of it for passive weights (lật thẻ, mưu kế). stUp = Tài (Vũ/Y: Sắc) at each new
   bậc; danh = Danh at bậc 3 / 5. Old saves keep their bậc (points = floor of that bậc + the old progress share). */
BAL.art={tier:[0,10,25,45,70,100],nm:["Chưa thạo","Nhập môn","Thuần thục","Tinh thông","Xuất chúng","Tông sư"],
 gain:[1.2,1,.8,.6,.4],odds:[0,4,8,13,18,24],emp:1.5,side:.4,stUp:2,danh:{2:3,3:5,4:6,5:8},care:6 /* review/balance-final: Y thuật care bonus once at BAL.mort.life.careYt (careY) */,
 flipX:2 /* Mê sắc: × of Sắc and Vũ in the card-flip chance (j8 nightCh) */,
 score:2.5 /* contest score per odds point (khuê các festival kcFest: score ≥ 60 first, ≥ 40 praised) */,
 fee:[5,5] /* teacher fee = fee[0] + bậc × fee[1] Bạc (artFee) */,
 gate:{thiFame:3} /* course gate moved with the slower ladder (report §F6 table): "Thơ ngươi truyền ra ngoài cung" at Tinh thông (Thuần thục = a thầy đồ's daughter at entry); the Y thuật self-medicine gates are LIVE's BAL.ag.par3.anthai.self.y / BAL.ag.cx2.kidHeal.y (nobc) */,
 fx:{q:.7,cong:.2,hanh:3,gift:{hoa:.5,theu:.4}} /* per POINT of a course: handmade quality q × points (+ Công × cong), gift bonus × points; hanh = Đức per bậc of Hạnh (monthly) */};
/* NIGHT CHOICES after the card flip (owner 22:45Z / 22:50Z / 23:05Z). Odds of each choice = b + Σ w[stat]×stat + art + trait fit + Emperor mood
   (window.nfOdds in jnf reads these through oSteal(a,mode) / oKeep(p)). No khắc, no Sức, no Đức is paid: only gain / loss (cost 0).
   feign = Tranh sủng: favour pulls him (Sủng), safer, small loss, small extra prize. road = Chặn ngự giá: beauty + art on his path, bolder:
   lower odds unless she is lovely and her art pleases, bigger prize, bigger loss, offends the holder and Hoàng hậu more. keep = Giữ chân
   Hoàng thượng (the flipped consort's defence): success → every try against her that night drops rung (one) odds rung (word() ladder),
   failure → nothing; if nobody takes her night she gains keepSung, if she is robbed anyway her oán toward the winner × oanX.
   art: she uses her BEST art (most points); the Emperor's month art: favoured → + BAL.art.odds[bậc] × fav, disfavoured → − × dis, other → × neu;
   artMul per choice. win/lose = extra effects on the doer (beside the night itself / beside losing), rel = thiện cảm the holder loses toward
   the winner, hh = Hoàng hậu → winner, ghen = holder's jealousy.
   ea (Emperor's month art, picked by the game each month, host in co-op): she knows it at the month start when Tai mắt ≥ mat, else each week
   rumour % = r0 + Tai mắt × rMat; NPCs the same; the shown 'known likes' (discover) can also name it (disc %).
   Measured r2 (dev/measure/bc-night-opt.js on states from the real game: NPC consorts of 2 seeds × 3 lives × 2 y + HER states from the sens-bot
   palace play, Sủng median 94): best choice Tranh sủng / Chặn ngự giá / Thôi, value of a night N 8 · 15 Sủng, holder thiện cảm + ghen counted
   ×0.2 Sủng/pt or not: every case 24–64 % for each of the two (her N 15: 45 / 53 without, 58 / 37 with the holder cost); Tranh sủng the safer
   (median odds +9 over Chặn ngự giá); Chặn ngự giá best ≈ 83 % of states when her best art is his favoured one, ≈ 25 % when disfavoured. */
BAL.steal.cost={feign:{duc:0},road:{suc:0}};
BAL.steal.m={feign:{b:30,w:{sung:.35},art:.75,win:{sung:1},lose:{sung:-3,duc:-1},rel:10,hh:0,ghen:15},
    road:{b:4,w:{sac:.35,sung:.25},art:2,win:{sung:8,danh:3},lose:{sung:-8,danh:-2},rel:18,hh:2,ghen:20}};
BAL.steal.art={fav:1,dis:.75,neu:0};
BAL.steal.keep={base:35,sung:.3,sac:.1,art:1,rung:1,gain:2,oan:1.5,npcP:.85};/* names agreed with night-final (jnf nfOdds "keep"): odds = base + Sủng×sung + Sắc×sac + best art×art + mood; gain = Sủng when nobody took her night; oan = × of the robbed hit; npcP = chance a flipped NPC presses it, costs nothing (night-final value) */
BAL.steal.ea={mat:5,r0:5,rMat:4,disc:35,w:2 /* draw weight of a month art his trait prizes (Trọng tài: Cầm/Kỳ/Thi/Họa · Mê sắc: Vũ); others 1 */};
/* THE FLIP CHOICE timing (owner OD 16/11 22:45Z "Phải quyết định trong vòng 10 giây thôi"; jnf.js §2): ms = the countdown (timeout = Thôi);
   waitMs = the co-op host's cap waiting for the friend's choice. (keep.npcP lives in BAL.steal.keep above.) */
BAL.steal.choice={ms:10000,waitMs:90000};
/* STEAL MINI-GAME (owner 16/11 ~22:20Z, PARKING_LOT #3b; jsmg.js): before a Tranh sủng / Chặn ngự giá try the one who tries may play ONE short tài nghệ
   game (an existing one, KIT tài nghệ frame). raw ≥ win → THAT try's odds go up `rung` rung(s) on the word ladder (BAL.odds.cut, keeping the place inside
   the band; capped at Nắm chắc / BAL.odds.hi); lose or skip → unchanged (no extra loss). art = the game per act (feign: Hát, road: Múa — "múa một khúc
   dưới đèn lồng"); occ = the mgTier occasion that sets the board (hầu Hoàng thượng). NPCs (never the co-op friend, who plays her own) "play" by the
   same NPC game roll as every contest (kg82NpcRaw: BAL.mgTier.npc by her bậc in that art) against the same win; npcP = chance an NPC plays at all.
   win 5 = the pass line every game result shows green (kg82ShowRes raw ≥ 5). One game per try (j75: one try a night each), so no cooldown key. coopMs = co-op (jnf night): the longest the host keeps the flip choice open for the friend while her own game runs (ms). */
BAL.steal.mg={on:1,win:5,rung:1,art:{feign:"hat",road:"mua"},occ:"trieu",npcP:1,coopMs:120000};
/* TÁT, three tiers (owner 16/11; jface act "tat", jslap game). Index 1..3 = nhẹ / vừa / nặng. sac = Sắc the target loses while the mark lasts; wk = weeks the mark stays
   (+1 with chance wkX); duc = the slapper's Đức; rel / oan = grudge (relAdd / extra oán on the target); hoang/sung = Hoàng thượng hears (chance, Sủng) when the target's Sủng
   ≥ hoangMin; thau = Thái hậu rebukes a nặng slap (chance, Danh); evT = the target keeps evidence against the slapper, evW = a witness does (chance per slap);
   rep = weekly chance a passer-by reports a mark that is still on (needs vừa+); def = tier of a slap with no game ("Tát luôn", old callers, old saves).
   GAME (r2, difficulty by mgTier ease 0..5, owner OD:L1255/L1266 "mức vừa"): arrays below are indexed by the ease (0 = Khó end … 5 = Dễ end, linear between).
   bar: w = needle speed (rad/ms, sin swing), redMs / amberMs = half time-window round the centre crossing for nặng / vừa, ms = game length.
   dodge: w, safeMs = half window of the green zone, off = how far off-centre it may sit (share of the half bar), ms. raw = raw score of too-late / nhẹ / vừa / nặng
   (dodge: raw[3] = dodged). hint = idle ms before the zone glows, by tier Dễ/Vừa/Khó. endMs = pause on the result before the act card. see = the measuring oracle
   predicts the next crossing at least this far ahead. Calibrated by dev/measure/mg-bots.js (skilled / casual / random bots) — table in dev/PROGRESS_review-slap-mg-r2.md.
   NPC: npc = rolled tier weights by rank gap (1, 2, 3+); scold = chance a mama slaps her when she talks back (jface cnvScold). missRel = relation change when she dodges a nhẹ slap completely; dodgeOdds = the odds on the "Né đòn" card by tier
   Dễ/Vừa/Khó (= the measured skilled-human dodge rate, rounded). */
BAL.slap={nm:["","nhẹ","vừa","nặng"],def:1,sac:[0,2,3,5],wk:[0,2,4,7],wkX:30,duc:[0,-2,-4,-7],rel:[0,-15,-25,-40],oan:[0,0,8,18],
 hoang:[0,20,30,55],hoangMin:60,sung:[0,-2,-4,-7],thau:40,thauDanh:-4,evT:[0,0,35,70],evW:[0,10,30,55],rep:[0,0,12,30],
 bar:{w:[.0046,.0044,.0042,.004,.0038,.0036],redMs:[8,11,14,18,22,28],amberMs:[40,50,58,66,76,88],ms:3200},
 dodge:{w:[.0044,.0042,.004,.0038,.0036,.0034],safeMs:[20,28,36,45,55,66],off:.55,ms:3200},
 scold:50,raw:[0,2,6,10],hint:[1200,1600,2200],endMs:750,see:250,
 missRel:-5,dodgeOdds:[75,55,35],
 npc:[[0,60,32,8],[0,45,38,17],[0,30,42,28]]};
/* slap occasions in the ONE tier table (jmgt mgTier): tat = her slap, stakes by HER rank; ne = dodging, rank = the attacker's rank */
Object.assign(BAL.mgTier.occ,{tat:[.5,.5],ne:[.5,.5]});
/* reviewer entry-exam-r1 (OD 07:25Z "mức vừa"): mgTier occ tuyen 1.5 → 1, so a new girl (art level 0) reads "Vừa", not "Khó", at her
   entry exam (ease 1.2 between the measured 0.8 / 1.6 boards; skilled marks 9.0–10 at both, so the rank table is unchanged). */
Object.assign(BAL.mgTier.occ,{tuyen:[1,0]});
/* ENTRY SELECTION EXAM (review/entry-exam, owner OD:L1244 / L1250 / 07:20Z no word games / 07:25Z medium; read by jentry entScore, jkc2):
   ONE score rule for every entry road (dir = "Vào cung ngay", dan = cung nữ home road, nc = hòa thân home road):
   score = Σ w[stat]·stat + w.raw·(mini-game 0..10) + w.art·(her level in that art) + road extras + base + noise (−noise..+noise, even).
   cut = [one step under the ceiling, the ceiling]: below cut[0] = two steps under (never below Đáp ứng; cung nữ: Tân Giả khố first).
   fx[tier] = what the result itself gives or takes on top of the rank (gain and loss on every path, also when the ceiling is Đáp ứng);
   stepSung = Sủng lost per step under the ceiling. word = mini-game kinds that are word games (never offered; drop a key when its
   non-word replacement lands, review/nw-*). The tier of the board is mgTier occ "tuyen" (BAL.mgTier). Measured: dev/measure/entry-bots.js. */
Object.assign(BAL,{entry:{word:["tho","doi","doden","le","tc","xa","thq"],noise:4,cut:[37,53],stepSung:5,
 w:{dir:{sac:.15,duc:.15,tai:.1,raw:3,art:1.5,th:1/6,base:8},
  dan:{sac:.15,duc:.15,suc:.05,raw:3,art:0,kim:[3.5,1.5],le:2.5,kgt:1/8,kld:-1/3,ly:3,self:-3,base:0},
  nc:{sac:.15,tai:.15,duc:.1,raw:3,art:2,th:1/5,le:2.5,kgt:1/6,sx:3,base:0}},
 fx:[{danh:-3,sung:-2},{},{danh:3,sung:4}]}});
/* review/errand-bal (law 4): the entry-exam score of a bot / a broken mini-game (jentry kcPhucPlay, jkc2 kc2Play, the old jkc kcPhucPlay): min + R(r), capped 0..max; a skipped round reads entSkipRaw() on every road */
BAL.entry.bot={min:3,r:6,max:10};
/* review/origin-intros (OD:L1244 "reason on the result card", OD:L1267 ONE CORE):
   w.kc = the tiểu thư Điện tuyển score (jkc kcScore) — the same numbers jkc typed by hand, moved here unchanged (danhCap: Danh counted up to;
   raw0 / pow0: the value used when the card has none).
   why.ref = what an ordinary new girl brings (Sắc 40+R55 ≈ 65, Tài 30+R50 ≈ 55, Đức 30, mini-game mark 5, art level 1, Thái hậu 0, Danh 20):
   the reason line names the part of HER score that sits furthest above (or below) these, weighted by the road's own w. Text only, never a rule. */
BAL.entry.w.kc={sac:.28,tai:.16,duc:.12,danh:.45,danhCap:40,arts:3,raw:1.6,raw0:5,le:2,pow:1/8,pow0:40,th:1/6,ld:-1/3,
 /* reviewer origin-intros-r1: the extras jkc kcMyScore typed by hand (same values): way = Tài/Đức added by "Đối đáp lanh lợi" / "Đáp lời khiêm nhường", chTh = Thái hậu added for Cháu gái Thái hậu, rW = per origin rank r, vh / tdFall = sớ tiến cử / td fall */
 way:6,chTh:15,rW:4,vh:6,tdFall:-6};
BAL.entry.why={ref:{sac:65,tai:55,duc:30,raw:5,art:1,th:0,danh:20,home:0}};
/* review/podium-wire (GAP OR09, OUTSIDE_PLAN §9 "Thứ muội and friends compete under the same rule, and the podium screen is used"):
   phuc = the Phúc tuyển marks of the thứ muội and the khuê hữu (family records S.kc.fam), drawn ONCE from their own stats and kept on the
   record (law 6b), shown on the kit podium (KIT §20.1) and read again by kcEnter (Điện tuyển), never re-rolled.
   lv = [tai at art level 0, tai per level, top level]: her art level from her own Tài (Tài 30..80 -> level 2..5; lv[0] 11 (review r1, was 20) keeps the mean mark = the old live 3+R(6) mean 5.5, bots n>=300/origin), top = level 5; her mark uses the SAME
   NPC curve as HER "Để tài nghệ quyết định" (kg82NpcMean, BAL.mgTier.npc) + a spread of ±sp (sum of three draws, like kg82NpcRaw); max = top mark.
   duc / pow = [base, range]: her own Đức and (khuê hữu only: her own house's) thế lực, drawn once (the numbers kcEnter typed as 30+R(30) /
   40+R(30), moved here unchanged); the thứ muội shares HER house (kcPow()).
   foul = law 1 two-way: she can "Ngáng chân thứ muội" (jkc, Sắc -3 / Danh -3 of the sister); a thứ muội who holds oan >= foul.oan against her
   tries the same on her in the Phúc tuyển week: odds od + oan/oanDiv, her Sắc -sac / Danh -danh (same sizes as her card). */
BAL.entry.phuc={lv:[11,12,5],sp:4,max:10,duc:[30,30],pow:[40,30],foul:{oan:20,od:40,oanDiv:3,sac:3,danh:3}};
/* DANH HIỆU (jdh, owner 16/11 13:00Z/13:15Z/13:20Z/13:25Z D, 13:55Z s17, 14:10Z; FOREMAN_C 14:15Z/14:35Z/14:45Z s17; review/title-sys): achievement titles.
   n0 = the counts that open the 3 steps of a title (1 / 5 / 10 times = the same name, a higher colour tier); step = tiers added per step (tier = b + i*step, max 8).
   T[id] = per title: b base tier, n own counts, st own step, ch = the bonus TYPES this title may give (the PLAYER picks ONE while it is worn; NPCs pick by need).
   B[type] = the bonus catalogue, v = value per step [s1,s2,s3] (0 = not offered at that step). Kinds:
     flat  sac/danh/sung/duc/tai/tamco: +v while worn (sac via wearBonus; others applied on wear, taken back exactly on removal)
     gain  gSung/gDanh/gBac/gTren/gHau/gTrung: v = denominator d, every gain of that kind gets +1/d more (expected value; fractions rolled)
           hooks: sg (her Sủng), apply (her Danh/bạc/Thái hậu+Hoàng hậu/cung nữ), ap (NPC), affAdd (phi tần → wearer liking)
     phuc  LUCK "Phúc khí": +v on the odds of every rolled act (lotB, the one odds modifier; never conception)
     thai  conception +v points on conceiveCh (the final chance; max 2, only on hard titles)
     nghe  self-study: chance v/100 of +1 extra progress (addArt / addArtP)
     thi   contest: +v phần of talent (SC7[kind].f, so the shown odds and the real score agree)
     suc   Sức +v on each night's sleep (j76sleep)
     don   rumour resistance: a rumour (ACT.rumor) against the wearer has v fewer odds (oRumor) */
BAL.dh={n0:[1,5,10],step:2,artLv:[3,4,5],
 B:{sac:{v:[1,1,2]},danh:{v:[1,1,2]},sung:{v:[1,1,2]},duc:{v:[1,1,2]},tai:{v:[1,1,2]},tamco:{v:[1,1,2]},
  gSung:{v:[20,14,10]},gDanh:{v:[20,14,10]},gBac:{v:[12,8,6]},gTren:{v:[12,8,6]},gHau:{v:[12,8,6]},gTrung:{v:[10,7,5]},
  phuc:{v:[2,3,4]},thai:{v:[0,1,2]},nghe:{v:[15,25,35]},thi:{v:[2,3,5]},suc:{v:[1,2,3]},don:{v:[5,8,12]}},
 T:{w_doden:{b:3,ch:["tamco","phuc","thi"]},w_tho:{b:3,ch:["tai","danh","thi"]},w_doi:{b:3,ch:["tai","gDanh","thi"]},w_dan:{b:3,ch:["sac","nghe","thi"]},
  w_mua:{b:3,ch:["sac","danh","thi"]},w_hat:{b:3,ch:["sac","gTren","thi"]},w_theu:{b:3,ch:["danh","gBac","thi"]},w_kim:{b:3,ch:["sac","phuc","thi"]},
  w_hoa:{b:3,ch:["sac","gHau","thi"]},w_ve:{b:3,ch:["tai","danh","thi"]},w_co:{b:3,ch:["tamco","phuc","thi"]},w_banh:{b:3,ch:["sung","gTren","thi"]},
  w_ban:{b:3,ch:["suc","danh","thi"]},w_dauho:{b:3,ch:["phuc","gHau","thi"]},w_huong:{b:3,ch:["sac","sung","thi"]},
  meta:{b:6,st:1,n:[3,6,10],ch:["gSung","gDanh","phuc"]},podium:{b:2,ch:["danh","thi"]},
  nights:{b:2,n:[1,10,30],ch:["sung","gSung","thai"]},kids:{b:3,n:[1,3,5],ch:["danh","gTren","thai"]},
  a_thinh:{b:1,n:[5,20,50],ch:["duc","gTren"]},a_doc:{b:1,n:[5,20,50],ch:["tai","nghe"]},a_nhan:{b:1,n:[5,20,50],ch:["sac","suc"]},
  l_cam:{b:2,st:1,ch:["suc","nghe"]},l_ky:{b:2,st:1,ch:["tamco","nghe","don"]},l_thi:{b:2,st:1,ch:["tai","nghe"]},l_hoa:{b:2,st:1,ch:["danh","nghe"]},
  l_vu:{b:2,st:1,ch:["sac","nghe"]},l_y:{b:2,st:1,ch:["suc","nghe"]},l_theu:{b:2,st:1,ch:["gBac","nghe"]},l_nau:{b:2,st:1,ch:["gTrung","nghe"]},
  m_mon:{b:1,ch:["sung","gTrung"]},m_kinh:{b:1,ch:["duc","don"]},m_theu:{b:1,ch:["gBac","sac"]},m_tranh:{b:1,ch:["tai","danh"]},m_khuc:{b:1,ch:["sac","gHau"]}},
/* PHASE 2 (jdh2, review/title-sys2; owner 16/11 13:00Z / 13:20Z (2)(4)(5) / 13:30Z (3)):
   hieu  the Emperor's hiệu (Thục, Hiền… TITLES): rank ≥ minRank (3 = Tần), Sủng ≥ RANKS[rank].s + sung, Danh ≥ RANKS[rank].d + danh, gapM months
         at the rank; eligible → p % each month (bestow on son / promo / contest: at once); Danh +danhG on the grant. Book + seal come with it.
   conf  punishment → confiscation: p[kind] = [% the hiệu (+ book + seal) is taken, % the worn achievement title is taken]; Danh −danh, Sủng −sung.
         Atonement opens wait months later (out of lãnh cung, no cấm túc): kinh copies of Chép kinh, or Danh +cong (lập công; never above top = the Danh ceiling of ap/apply).
   it    the book / seal: lose = % per month per piece held (a jlost case); lostDanh = Danh lost when the case closes and it is not back;
         backW = weeks before a piece the Nội vụ phủ found (census) goes home. */
 hieu:{minRank:3,sung:10,danh:8,gapM:2,p:25,danhG:5},
 conf:{p:{cold:[100,100],giang:[50,35],cam:[0,40]},danh:5,sung:3,wait:3,kinh:3,cong:12,top:100},
 it:{lose:2,lostDanh:8,backW:[4,10]}};

/* review/suc-khoe (jkh.js, owner 16/11 18:05–19:00Z; spec dev/handover/reports/suc-khoe.md §4.1–4.7 with the owner changes):
   kh  SỨC KHỎE = ONLY the Sức MAX ceiling (owner 18:05Z: "giữ cái trần của cái sức"; Sức regen unchanged, no second cut; jmort `tired` folded in).
       health khOf(p) = 100 − max(0, age − ageFrom) × agePer − khScar (lasting) − khTmp (heals); floor capMin.  Sức max sucCap(p) = maxBase + maxPer × health (≤ 100).
       lasting / healing harm per event: birth / hard (extra) / still / mis / close (a birth < closeMo months after the last) / ocuScar (ở cữ broken) / poisonScar (once per poisoning);
       illSt per illness stage per month, sick per month of p.sick (poison), tmpMax cap of the healing part.  Healing per month (never the lasting part):
       rec while not ill + recCare per care source (the jmort care sources, BAL.mort.life careSuc / own thái y / Y thuật ≥ careYt); ocu once when the ở cữ month is kept;
       tonic per thuốc bổ (at most tonicMo a month).  ocuMo = months of ở cữ (no conception; owner 18:10Z: 1 month, the ×0.7 cut removed); a move out of her palace or a card
       costing ≥ ocuHeavy Sức in that month breaks it → ocuScar + Hậu sản (ILL.hausan) ocuIll %.  oldScar = lasting harm per child already born (old saves, NPCs at load).
       illLo / illP: health below illLo → an extra illP % a month to catch a seasonal illness.  thyLo: the thái y says "Hơi yếu" below it, thyBad: "Có bệnh" below it (spec 4.6); faceLo: ỐM YẾU face below it.
   preT  preterm / overdue (pregMonthP, everyone): m8 / m9 % a month at month 8 / 9, + lowSuc (Sức < lowSucAt), + lowKh (health < khLo), + age per year over ageFrom, ×½ an thai;
       a preterm baby dies in its first month at die8 / die9 %.  od % at the birth month the baby is a month late → birthRisk × odHard, stillbirth + odStill; odOmen % "điềm thánh nhân"
       (a son: Danh + omenDanh), else ill-omen talk.  'lệch sổ' (the birth does not match the Kính sự phòng book): a true fact of weight lsW in the mother's
       ledger (jtruth deedSync, so a CLEAN mother can be accused too, owner Q3 18:17Z; dropped once the test is held or the child is past ageMax);
       rivals with a motive (mot: her own son vs a son, rank gap ≤ rkGap with thiện cảm < aff, thiện cảm ≤ hate, or oán ≥ oan against her) and she
       (two-way) get evi chứng cứ; anyone with ≥ accEv demands the blood test (BAL.ngh; jroute rtNgSet / rtNgNpcRes) accP % a month while the child is
       ≤ ageMax years.  recDefend = added to her "nghiệm lại bằng bát nước mới" odds when the child really came early or late AND the thái y mạch án
       holds the month the pregnancy was found (S.pregDisc at birth).  khRecOff: the book's night lies recMin..recMax tuần before the real conception
       (recSlack tuần = still the same night).
       drug = thuốc thúc sinh (owner PARKING_LOT #1): bạc, odds base + Y thuật × perY, Sức lost on success / failure; npcDrug % an NPC in that spot takes it.
   pgRisk  miscarriage causes (owner 19:15Z), added to the monthly risk while pregnant, capped at cap: khac % per khắc walked beyond freeKhac in the month;
       rain % per walk in harsh weather; work % per Sức spent on cards beyond freeSuc; lowSuc2 under lowSuc2At Sức; an thai halves it.
       lowSuc under lowSucAt and misSuc (Sức lost at a miscarriage) are the base pregnancy month's own numbers (j8 pregMonthP reads them too). */
BAL.kh={on:1,ageFrom:30,agePer:1.2,capMin:30,maxBase:40,maxPer:.6,tmpMax:40,
 birth:10,birthScar:2,hard:15,hardScar:5,still:10,stillScar:2,mis:6,misScar:1,closeMo:18,close:6,closeScar:1,
 ocuMo:1,ocuHeavy:10,ocuScar:2,ocuIll:25,ocu:5,illSt:1,sick:3,poisonScar:4,rec:.5,recCare:.5,tonic:3,tonicMo:1,oldScar:2,
 illLo:50,illP:4,thyLo:80,thyBad:50,faceLo:45};
BAL.preT={m8:1.5,m9:4,lowSuc:3,lowSucAt:30,lowKh:3,khLo:40,age:.2,ageFrom:35,die8:40,die9:15,od:8,odHard:1.5,odStill:3,odOmen:30,omenDanh:2,
 evi:2,lsW:3,accEv:3,accP:20,ageMax:3,recDefend:20,recSlack:1,recMin:2,recMax:9,
 mot:{rkGap:1,aff:0,hate:-30,oan:45},drug:{bac:40,o:60,perY:6,suc:10,sucF:25},npcDrug:60};
BAL.pgRisk={freeKhac:6,khac:.25,rain:1,freeSuc:40,work:.05,lowSuc2:3,lowSuc2At:50,lowSucAt:30,lowSuc:8,misSuc:20,cap:4};
/* review/suc-khoe-fix (F4, ONE CORE OD:L1267): THE BLOOD TEST (trích huyết nghiệm thân) — one block read by jroute (her child, her demand on an NPC's
   child, an NPC mother's child) AND jkh (a rival's demand after a 'lệch sổ' birth). Before this, jkh held a copy of jroute's numbers.
   alumTc / alumP: a guilty mother slips alum in (Tâm cơ ≥ alumTc, else alumP %) → the blood mixes.  oilTc / oilP: an accuser drops oil
   (Hiểm / Tâm trait or Tâm cơ ≥ oilTc, then oilP %) → the blood never mixes.  frameAff / frameOil: an NPC who hates the mother below frameAff
   thiện cảm frames her child (oil frameOil %).  die: % the condemned mother is put to death (else lãnh cung).  Backlash when the blood mixes,
   the same for her and every NPC accuser: accSung / accDanh, oán accOan, punish level accPun.  needEv: chứng cứ she needs to demand the test
   on a rival's child (her card; the 'lệch sổ' road uses BAL.preT.accEv, the same bar as NPC accusers).  seeMat / oilMat: Tai mắt she needs
   to hear of an NPC test / to learn the bowl was oiled. */
BAL.ngh={alumTc:55,oilTc:60,frameAff:-30,accOan:40,accPun:1,needEv:2,seeMat:2,oilMat:4};
/* NPC AGENT LOOP (jagent, Foreman C AG1 + AG1b; owner OD:L1386 "every NPC plays the game like a player"; design dev/handover/reports/npc-agent.md §3).
   ONE CORE: every number of jagent.js. The deeds' own costs / odds / gains stay in BAL.tw (jtwoway) and j75 (npcEffortKind); here only the
   agent's WHEN and WHY: what each person needs, how much a deed is worth to her, and what she may do when she sees someone act.
   on      1 = the loop runs (host only); 0 = the old drips run as before (measuring switch; window.__agOff=1 does the same for one page)
   own     the deeds whose WHEN belongs to the loop: the weekly / monthly dice that used to fire them (npcMonthly, the SOC menu, npcEffort)
           are muted for NPC doers while the loop is on (one path per deed). Her own use of the same deeds is unchanged.
   routine weight of keeping her schedule this buổi (the j95 activity), × (1 + restW × need rest); needW = weight of each need against it
           (step 1 of her choice: WHAT she wants this buổi; step 2: which deed serves it, by utility)
   unit    gain points that close one whole need; goal = the level each need aims at (gap = (goal − now) / goal, 0..1)
           friend = thiện cảm that counts as a friend for the 'ally' need; kidAge = she still hopes for a child below this age
   road    need weights per origin road (8 noble origins of j1 ORIGINS; "_" = no road yet). Origin = v.nr.o (npc-roads, Foreman D) when
           present, else v.ag.o seeded once from her house by `org` (same rule as BAL.nroad.org; that table wins when it is loaded)
   uniq    origins one father holds alone (the player's own father): no NPC takes them
   val     how much an indirect effect is worth to the doer, in gain points (her belief, not an outcome): tablet = a bribed tablet (Sủng),
           kid = a prayer for a child (kid need), check = searching gifts (safety), drop = dropping a fallen friend (safety)
   costW   how much a cost weighs against what she holds (bạc / Sức); costCap = most of her holding a cost can weigh; costMin = floor of the factor
   kh      khắc a deed takes (the player's talk / deck act: 1)
   wit     witness (AG1b): hear/mat = odds base and per Tai mắt level of "Nghe lén" (the player's Nghe lén câu chuyện, j2/j9);
           caught = thiện cảm lost toward the listener when a listener is caught; hoD = hostility that makes an NPC as keen to listen as w.hear; w = NPC reaction weights {hear, join, ignore}
   vent    r1 fault 8: a spite deed (provoke / humil / gossip / flaunt) closes her spite need by its own gain (BAL.tw.g spite points, unit
           points = one whole need) toward that target ("*" = everyone); fade = points of that memory lost per tuần (1: a provoke, 15
           points, keeps her spite toward that person closed ~5 tuần and back in full after 15)
   perf    p95 budget in ms per slice of the buổi tick (one frame's work, Fold 755x1000), n = how many slices the counter keeps,
           slice = ms of deciding in one frame before the other consorts wait for the next frame / resync of the same buổi */
Object.assign(BAL,{ag:{on:1,
 own:["thTH","thHH","pray","ksp","fakeIll","fakePreg","announce","flaunt","check","help","apol","visit","mediate","follow","provoke","humil","warn","test","drop","gossip","effort"],
 routine:5,restW:1.5,needW:1,unit:10,
 goal:{sung:80,th:60,hh:40,danh:50,duc:40,rest:45,friend:30,ally:2,kidAge:38},
 road:{_:{sung:1,th:.6,hh:.5,danh:.6,duc:.4,kid:.8,ally:.6,spite:.5,safe:.6},
  tt:{sung:1,th:.5,hh:.3,danh:1.2,duc:.4,kid:1,ally:.7,spite:.8,safe:.6},dtq:{sung:1,th:.4,hh:.4,danh:1,duc:.3,kid:.9,ally:.5,spite:.7,safe:.5},
  muoi:{sung:1.1,th:.6,hh:.6,danh:.8,duc:.3,kid:.8,ally:1,spite:.4,safe:.6},cn:{sung:1.3,th:.6,hh:.6,danh:.5,duc:.4,kid:1,ally:.9,spite:.4,safe:.7},
  nc:{sung:1,th:1,hh:.5,danh:.8,duc:.4,kid:.8,ally:.7,spite:.5,safe:.8},td:{sung:.9,th:.4,hh:.4,danh:.6,duc:.2,kid:.6,ally:.6,spite:1.3,safe:.8},
  ch:{sung:.9,th:1.3,hh:.4,danh:.8,duc:.6,kid:.9,ally:.6,spite:.5,safe:.5},thd:{sung:.9,th:.6,hh:.6,danh:1.1,duc:.8,kid:.8,ally:.6,spite:.3,safe:.6}},
 org:{"Tể tướng":[["tt",1]],"Đại tướng quân":[["dtq",1]],"Thái hậu":[["ch",1]],"Hàn lâm":[["thd",3],["td",1]],"Lễ bộ":[["thd",1],["td",1],["muoi",1]],"Hộ bộ":[["muoi",3],["td",1]],"":[["muoi",1],["thd",1],["td",1]]},
 uniq:["tt","dtq"],
 val:{tablet:2,kid:10,check:4,drop:3},
 costW:1,costCap:.9,costMin:.05,kh:1,
 wit:{hear:40,mat:6,caught:5,hoD:50,w:{hear:1,join:1,ignore:3}},
 vent:{fade:1},
 perf:{p95:8,n:200,slice:3},
 /* AG2 the Emperor as an agent (jagemp.js; design reports/npc-agent.md §3.2):
    summon  [calm, busy] % that he calls someone to his bed tonight — the owner's rule (OD 16/11 18:10Z): 90, 65 when busy with court
            (trait Chăm chính sự, or the court in crisis = j55 tdCrisis, which was an extra 30 % cancel: 90 × 70 % ≈ 65, now one rule)
            or he is ill; else he rests / reads memorials alone
    custom  [mùng 1, rằm] weight of the custom (lệ: the night at Hoàng hậu's palace) against his wish for the card he turned (100 − x);
            the old j75 FAIRN.custom roll, moved here (ONE CORE)
    duty    × on the custom's / the seat's weight per trait of his (dutiful up, amorous down)
    want    [floor, cap] of his wish for the turned card against the Empress (nightCh ratio, square root) when he weighs the custom
    met     his memory of what each person did near him: w = × per remembered deed on her night weight, miss = a failed deed counts this much,
            keep = tuần he remembers, cap = deeds counted at most, n = deeds kept per person
    seat    a vacant Hoàng hậu seat: % per tuần that he decides = b + m × (months vacant − mourn), [lo, hi], × duty, × th when Thái hậu lives
            (was the flat j8 roll 12) */
 emp:{summon:[90,65],custom:[40,20],duty:{chamchinh:1.25,hieuthao:1.25,datinh:.75,mesac:.75},want:[.5,2],
  met:{w:.15,miss:.5,keep:2,cap:3,n:4},seat:{b:6,m:3,lo:6,hi:40,mourn:3,th:1.2}},
 /* AG3 maids reach the Emperor by their own deeds (jagmaid.js; design reports/npc-agent.md §3.3 / §3.4, §5 AG3; owner OD 16/11 17:15Z):
    st      a staff maid's looks / letters drawn once (data, like every person's Sắc / Tài; the player maid has her own) [lo, hi]
    tea     "Quỳ dâng trà" where he passes (the player's card j42 and an NPC maid's deed, ONE rule): odds = b + Sắc / sac + Tài / tai + his mood;
            "Hầu trà khi ngự giá" on her master's night adds her regard / nt (her "Hoàng thượng để ý" IS her sung, §3.4);
            g = his regard gained on success (+ Sắc / gs, srvNotice), fail = master's trust (Chủ tin / lòng) lost on a spilt cup
    jeal    the master sees him look at her: % = b + master's malice / d; trust lost = BAL.net.n.misJealTin by the master's nết (one table with show-why)
    decay   his regard for a maid fades per month (was S.nt − 2 / month, j42)
    ch      her weight in his night pool (the terms of a consort's nightCh: regard / sung + Sắc / sac, cap; bot-tuned so maid nights ≈ the old
            eye-roll rises); only maids he MET (S.emp.met)
    night   a maid's night: his regard + b + q / 2 (q = Sắc / 20 + luck, rivalNight's own formula); rise = her Sủng as a consort = b + regard / d
            (srvRise's own conversion: was 15 + nt / 5); ONE promotion rule riseCore (jagmaid) for her and an NPC maid: + Danh danh, Bạc bac
            (were typed 5 / 20 in srvRise, NPC maids got none), old master's jealousy ghen = [loyal, turned] (were typed 5 / 25 in srvRise, NPC masters got none)
    send    the consort's "Tiến cử <maid> hầu thay" on her night: × on her need (tired / ill; × (1 + ally need) with a trusted maid) against
            keeping it (BAL.ag.routine). .05 (review ag3-r1, bot 2 yr × 2 seeds per life): .15 gave consort life ~1.5 and maid life ~3.5 maid rises / yr (Tiến cử on ill nights; a seat is always free, so every send rises) vs ~0.6 / yr on main; .05 → consort life 0.5, maid life 1.5 (her NPC consorts are ill on 15–18 % of their nights there vs ~5 %: a one-world gap left to Foreman C)
    decline the player maid begs off his summons: his regard lost */
 maid:{st:{sac:[20,60],tai:[0,30]},tea:{b:25,sac:2.5,tai:10,nt:5,g:8,gs:20,fail:1},jeal:{b:30,d:3},decay:2,ch:{sung:2,sac:8,cap:70},
  night:{b:2},rise:{b:15,d:5,danh:5,bac:20,ghen:[5,25]},send:.05,decline:10}}});
/* BAL.ag.staff — AG-ALL part B (jagstaff.js): maids and eunuchs as agents on the player maid's act table (j42 SRVA)
   st       a staff's Đức / Tâm cơ / Danh / Sức / Bạc drawn once (lazy; Sắc / Tài: BAL.ag.maid.st) [lo, hi]
   goal     what she aims at: Chủ tin, Sức, Bạc, Sắc, Tài, Đức, friends (thiện cảm ≥ SRVA.ask.af)
   nw       weight of each need (tin = master's trust, mp = công lao toward the next bậc, self = Sắc/Tài/Đức, sung = his regard, love, spite)
   greed    × on her Bạc need while she spies for someone; mpS = value of 1 công lao in need units; sc = scale of af / tình ý / spite gains
   riskD    a love act's chance to be seen counts / riskD in her valuation; caughtTin/caughtSuc = what she fears from a caught tryst (valuation)
   vowTinh  value of a vow; dt = thiện cảm both ways for đối thực; expel / exile = a caught tryst: % expelled (else Tân Giả khố) / % the man exiled
            (was maidLoveMonth's 30 / 35); vowW / outW = weight of a vow / of going home in the grant and age choices
   uMul     × on every option of hers against keeping her routine (BAL.ag.routine): bot 40 tuần, 1 → ~10 % of buổi acted, 3 → most buổi
   monthSuc Sức back each month (a night's sleep is in the buổi rest act); secSee = % per month she sees her master scheming at home (Biết chuyện)
   hit      × on a consort's spite when she weighs hitting another palace's maid (jmline mlHit as a choice) */
/* BAL.srvGate — the player maid's gates read by SRVA (j42) and the NPC staff: Chủ tin for "Xin chủ ban thưởng" (rew) / "Xin chủ tiến cử" (rec);
   frameLoy = the framed colleague's lòng after "Tố lỗi với chủ"; bully = Sức lost when bullied at Nội vụ phủ (Lĩnh đồ) */
BAL.srvGate={rew:60,rec:50,get frameLoy(){return -BAL.eff.j42.loyalSrvStaffAct},get bully(){return -BAL.eff.j42.sucSrvMeet}};/* frameLoy: one number with BAL.eff.j42 */
/* one table for every maid / eunuch, player or NPC (AG-ALL r1 F2 ONE CORE): srvRiskOf place risk (base by place, def elsewhere, -fr per friend,
   -tamco/tc, clamp min..max); srvGrant = the Ban gả trigger (Chủ tin >= tin, roll(base + bond if a sworn man), loyalty -stayLoy if she asks to stay);
   srvMp = công lao per bậc (need (bậc+1)*srvMp); srvLoyal = a new servant's loyalty base+R(r) */
BAL.srvRisk={vuon:28,thu:34,tyv:20,tn:40,home:18,def:26,fr:4,tc:10,min:6,max:92};
BAL.caught={fac:4};/* j8 caughtOdds (clamped by the ONE odds cap, oddsCl) */
BAL.srvGrant={tin:55,get base(){return BAL.odb.j42.rbTop_2},bond:3,stayLoy:5};BAL.srvMp=5;BAL.srvLoyal={base:45,r:36};/* promotion loyalty: BAL.eff.j14.loyalServRanks */
BAL.ag.staff={st:{duc:[10,40],tamco:[10,40],danh:[0,10],suc:[60,90],bac:[0,20]},goal:{tin:70,suc:60,bac:40,sac:60,tai:40,duc:40,friend:2},
 nw:{tin:1.2,mp:1,suc:1.2,bac:.6,self:.4,ally:.5,sung:1,love:.3,spite:.4},greed:2,mpS:4,sc:{af:.3,tinh:.3,spite:.3,sung:.25},
 riskD:3,caughtTin:20,caughtSuc:20,vowTinh:20,dt:40,expel:30,exile:35,vowW:.5,outW:.3,monthSuc:10,secSee:30,hit:1,uMul:3,peerGap:40,nvpAf:5,askAf:2};

/* BAL.mind — jmind (one mind for every person, review/npc-mind; moved here from jmind.js, r1 fault 3 ONE CORE)
   like      regard gained on top when a gift is one the receiver likes (jdis BAL.dis.aff is the one dislike penalty)
   likeSung, herMood, learnTalk (% a talk reveals a like), spyPri (intel priority), disN = [min,max] dislikes drawn for people jdis does not cover
   slip      % of NPC choices that misjudge (a random option);  temp = weight power of mindPick
   strW / abW / abMid / trW / wMin  mindW: × when the act uses her strength; per point of ability above abMid; × per honoured / offended virtue; floor
   odds      odds shift (%) on an act that uses her strength;  kidTal = a child's talent from which a strength is an art;  bacPer = bạc per ability point
   pickMin   least weight of a target in mindPickBy
   pick.<site>  the target weights of every mindPickBy call site (base + x / divisor …): j10fr (friend to warn), j28up (the higher-ranked to court),
             j28soc (social target), j34 (sabotage target), j4 (who is framed: top - rel), j40 (harm target: base + rank² + hostility / host),
             j55 (leak target), j8buy (who buys: top - rel), j8ev (Hoàng hậu evidence case: evG × ev − rel / rel), j83 (gift framer),
             j96 (accuser: base + ghen / ghen − rel), lost1 / lost2 (jlost), tin (informant: max(floor, score)^pow), wd (jwd92b), ag (jagent SOC target)
   men       menDecide (a stray man seen): report [base, hostility per], hide [Tham vọng, else], listen [Đa nghi, else],
             ignore [Hiền lành / Nhu mì, else, floor, hostility per], keep = weight added to the old fixed answer */
Object.assign(BAL,{mind:{seen:{cap:3,fade:.85}/* 2f3: a servant's record of her master's deeds per virtue (jmind mindSeen): ±1 per deed, cap, ×fade per tuần */,like:3,likeSung:1,herMood:30,learnTalk:20,spyPri:50,disN:[1,2],slip:12,temp:1,strW:1.6,abW:.012,abMid:40,trW:.35,wMin:.05,odds:4,kidTal:55,bacPer:3,pickMin:.01,
 pick:{j10fr:{base:1},j28up:{base:1,aff:10},j28soc:{base:4,aff:4,oan:4},j34:{base:2},j4:{top:30,floor:1},j40:{base:1,host:5},j55:{host:20},j8buy:{top:10,floor:1},
  j8ev:{ev:2,rel:5},j83:{base:1},j96:{base:40,ghen:2,floor:1},lost1:{base:1},lost2:{base:2},tin:{floor:1,pow:2},wd:{base:1},ag:{base:1}},
 men:{report:[1,25],hide:[2,.6],listen:[2,.5],ignore:[2.5,1.2,.3,80],keep:4}}});
/* BAL.deck — the Sủng deck acts, ONE table for her cards (j2 artActs + the Emperor talk "Dâng một cành hoa") and an NPC's same deed
   (j75 npcEffortKind, the agent loop). r1 fault 7 (OD:L1386 "same odds" + ONE CORE). Odds = deckOdds(p,k): base + artW2(p,k) × per + stat / div + mood
   (od for her, odA for an NPC). lv = art level the card needs; sucMin = Sức an NPC keeps before she spends on it (her card: the khắc / Sức rule);
   c / w / l = cost / gain / loss (vu's loss and side effects: BAL.tw.g.vu; ky's Danh / Tâm cơ: BAL.tw.g.ky).
   qf = a small gift to the Emperor (her "Dâng một cành hoa"): bac cost, o odds when his flower is not known, w gain (wKnown when it is) */
Object.assign(BAL,{deck:{vu:{lv:2,sucMin:40,c:{suc:-20},o:[48,8],st:["sac",5],w:{sung:15,danh:4}},
 cam:{lv:2,sucMin:30,c:{suc:-10},o:[48,8],st:["tai",5],w:{sung:12},l:{sung:-2}},
 ky:{lv:2,sucMin:25,c:{suc:-5},o:[53,8],st:null,w:{sung:5},l:{sung:-1}},
 qf:{bac:5,o:50,w:2,wKnown:6}}});
/* SIDE CHANCES printed on cards (review/balance-2, ONE CORE OD:L1267): the card text (chanceW) and the roll read the SAME key.
   treatStep j13 treat (an illness eases one stage) · abortDie j22 / abortDieSrv j42 (bleeding to death when the potion fails) · riseKill j42 «Cúi đầu thưa tên»
   (the mistress kills her before the investiture) · maidRise j8 sendMaid (the maid sent in her place is raised) · vpTake j8 night1 (above-rank jewellery taken) ·
   caught j34 sabotage (caught when the sabotage fails) · helpFall j7 «Giúp … một tay» (the target falls). (loanBack: LIVE's j24 repay is an NPC decision now, npcWhy) */
Object.assign(BAL,{rk:{treatStep:50,abortDie:25,abortDieSrv:20,riseKill:25,maidRise:30,vpTake:40,caught:50,helpFall:50}});
/* palace voice (jvoice, VANPHONG §2): mood of an address from the real relation (S.sung − sungMid, S.th / S.hh − favMid, aff()):
   ≥ warm → warm words (ái phi, con, muội muội, tỷ tỷ), ≤ cold → "ngươi"; nuong = first rank called "nương nương" / allowed "bổn cung" (Tần);
   noRepeat = tuần before a pooled line may come back; hi / hq = first rank index of the "hi" (Quý phi) / "hq" (Hoàng hậu) rank band of
   pooled lines (bands: lo < nuong ≤ mid < hi ≤ hi-band < hq); aiPhi = her Sủng from which Hoàng thượng calls her "ái phi" (below: "nàng") */
Object.assign(BAL,{voice:{warm:40,cold:-25,sungMid:0,favMid:0,nuong:3,hi:5,hq:7,aiPhi:40,noRepeat:5,
 /* VOICE BY TÍNH TÌNH (owner 17/11 06:05Z, review/voice-trait): the tone of a speaker = his / her Tính tình nết (first of the 3 of the ONE trait pool).
    The Emperor (ETRAITS keys) and Thái hậu (S.thTrait) have their own sets: mapped to the nearest tone here. alias = a male-only nết speaks with the
    nearest female tone's lines until its own pool is written. dflt = the tone of a speaker with no named nết (an unnamed servant). */
 tone:{emp:{nongnay:"Nóng nảy",lanhlung:"Lạnh lùng",danghi:"Kín đáo",nhantu:"Ân cần",datinh:"Ân cần",mesac:"Ân cần",chamchinh:"Điềm tĩnh",trongtai:"Điềm tĩnh",hieuthao:"Điềm tĩnh"},
  th:{"Ân cần":"Ân cần","Kín đáo":"Kín đáo","Kiêu ngạo":"Kiêu ngạo","Vì gia tộc":"Điềm tĩnh","Thật thà":"Điềm tĩnh","Mê tín":"Điềm tĩnh"},/* every TH_ARCH trait (jtrong) has a tone: an unmapped one fell to a hashed tone in toil (Nhiều chuyện) but dflt in kOutcome (review voice-trait-r1) */
  alias:{"Cương trực":"Nóng nảy","Xu nịnh":"Khiêm nhường"},dflt:"Điềm tĩnh"}}});
/* BAL.ghen = "every consort ghen +n" events (ghenAll, j1). ONE CORE (OD:L1267): the rule applies ghenN(n) and every text shows ghenN(n), so with an
   Emperor who is đa tình both read n × datinh. Keys: dance j2 Múa yến tiệc · kinhHong j2 Kinh hồng vũ · preg news of her pregnancy (j2, j75, j8 belly shows,
   jcycle ma ma slips) · rumor j7 · cry j7 · son / girl her child born (j8) · rankUp she is raised (j8, j34) · festival j8 · bestow j20 ân thưởng ·
   ally j24 · kidTop j53 her child tops the lesson · flowerParty / follower / boast j68e · keepGift j68g · contest / praise / contestTop j71 ·
   showTreasure j83/jecon (tier-3 piece shown at a banquet). Other ghenAll gains already live in BAL.night.ghen, BAL.visit.ghen, BAL.psk.ghen, jcycle rep.giauGhen. */
Object.assign(BAL,{ghen:{datinh:1.5,dance:4,kinhHong:10,preg:6,rumor:12,cry:5,son:15,girl:8,rankUp:10,festival:8,bestow:3,ally:3,kidTop:2,
 flowerParty:2,follower:2,boast:4,keepGift:3,contest:4,praise:3,contestTop:8,showTreasure:2}});

/* ===== ONE TRAIT POOL (owner 17/11 05:45Z/05:50Z/05:58Z/06:20Z, review/trait-pool) — THE trait table (one core) =====
   Everyone except the Emperor (ETRAITS) and Thái hậu (TH_ARCH archetypes) draws exactly 3 nết: one per group
   tt TÍNH TÌNH · ld LÒNG DẠ · ch CHÍ HƯỚNG; the 8 nết of a group = 4 symmetric pairs and exclude each other.
   Two pools by sex, SAME formulas: female F (consorts, maids, ma ma, female NPCs, the player) / male M (men, officials,
   eunuchs, physicians, male NPCs). Only pair 4 of Tính tình differs (Kiêu ngạo↔Khiêm nhường / Cương trực↔Xu nịnh).
   Row: g group · p pair · s sex (b both, f, m) · tend (player-visible, "Hay:") · gain / cost (player-visible, BALANCE LAW:
   every nết has a usable good side AND a cost, both wired to existing acts) · PERS fields used by persW/persF:
   w act weights (×, product over the 3 nết) · dang danger offset (+) · mal malice base (+) · slight/forgive/trust/gift/ghen (×) ·
   harmGate (max: no harm act until the grievance reaches it) · lavish/riseGift (×) · fade [good,bad] memory fade (BAL.mem.fadeT) ·
   q servant/agent qualities (sum, clamp qClamp; 1 = the strength of the old servant-only nết): loyal (che chủ, giữ lời, khó mua),
   greed (ăn cắp, bán tin, mua rẻ), timid (bị ép thì khai, không dám phản), sharp (dò tin, tìm manh mối, muốn trèo cao),
   talk (mang tin về, cũng làm lộ tin), hide (giấu ý: dấu hiệu báo trước một đòn hại khó thấy, j43 mindTell), study (tự học tài nghệ năng hơn, j85 npcStudy). */
BAL.net={qClamp:[-1,1.5],qOn:.8,malBase:30,k:{hide:8,study:.25},
 groups:{tt:"Tính tình",ld:"Lòng dạ",ch:"Chí hướng"},
 F:{tt:["Ân cần","Lạnh lùng","Nóng nảy","Điềm tĩnh","Nhiều chuyện","Kín đáo","Kiêu ngạo","Khiêm nhường"],
    ld:["Thật thà","Xảo quyệt","Thanh liêm","Ham lợi","Rộng lượng","Thù dai","Trọng nghĩa","Thực dụng"],
    ch:["Tham vọng","An phận","Ham học","Ham vui","Mê tín","Thực tế","Vì gia tộc","Vì mình"]},
 M:{tt:["Ân cần","Lạnh lùng","Nóng nảy","Điềm tĩnh","Nhiều chuyện","Kín đáo","Cương trực","Xu nịnh"],
    ld:["Thật thà","Xảo quyệt","Thanh liêm","Ham lợi","Rộng lượng","Thù dai","Trọng nghĩa","Thực dụng"],
    ch:["Tham vọng","An phận","Ham học","Ham vui","Mê tín","Thực tế","Vì gia tộc","Vì mình"]},
 /* old saves / old code words → pool nết (each old one lands in its group; the missing groups are drawn) */
 old:{"Hiểm độc":"Xảo quyệt","Xảo quyệt":"Xảo quyệt","Kiêu ngạo":"Kiêu ngạo","Hiền lành":"Ân cần","Đa nghi":"Kín đáo","Tham vọng":"Tham vọng","Nhu mì":"Khiêm nhường",
  "Hiếu thảo":"Vì gia tộc","Ghen tuông":"Nóng nảy","Tham tiền":"Ham lợi","Trọng nghĩa":"Trọng nghĩa","Nhiều chuyện":"Nhiều chuyện","Thù dai":"Thù dai","Cả nể":"Rộng lượng",
  "Thẳng thắn":"Thật thà","Mê tín":"Mê tín","Khéo léo":"Thực dụng",trung:"Trọng nghĩa",tham:"Ham lợi",nhat:"Khiêm nhường",lanh:"Tham vọng",chuyen:"Nhiều chuyện",
  "phong lưu":"Ham vui","đa tình":"Ham vui","trung hậu":"Thật thà","tham vọng":"Tham vọng","cẩn trọng":"Kín đáo",
  "Cẩn trọng":"Kín đáo","Tham lam":"Ham lợi","Trung hậu":"Thật thà","Cương trực":"Cương trực"},
 /* servant-quality codes kept as keys of a few old tables (seekTr, proud, SG_TR, IMPR, SCAUSE…): qv() reads the strongest quality */
 qCode:{trung:"loyal",tham:"greed",nhat:"timid",lanh:"sharp",chuyen:"talk"},
 /* a female-only nết met in the male pool (old saves, old servant codes) */
 toM:{"Kiêu ngạo":"Cương trực","Khiêm nhường":"Xu nịnh"},toF:{"Cương trực":"Kiêu ngạo","Xu nịnh":"Khiêm nhường"},
 T:{
 /* ---- TÍNH TÌNH ---- */
 "Ân cần":{g:"tt",p:"Lạnh lùng",s:"b",tend:"hay thăm hỏi, giúp đỡ, can ngăn",gain:"dễ kết thân; hay giúp, hay báo tin cho người mình quý",cost:"mềm lòng: dễ bị bạn mạnh xui làm, quà mọn cũng làm nàng nể",
  w:{help:2.2,visit:2.2,warn:1.8,mediate:2,apologise:1.8,provoke:.35,humiliate:.25,poison:.35,kpoison:.35,frame:.45,plant:.45,musk:.35,pushp:.35,follow:1.6},dang:-8,mal:-15,slight:.8,forgive:1.4,trust:1.2,gift:1.2,harmGate:60,fade:[.8,1.4],q:{loyal:.3,talk:.2}},
 "Lạnh lùng":{g:"tt",p:"Ân cần",s:"b",tend:"ít nói, khó gần; đã quý thì quý lâu",gain:"đã thân thì bền: khó bỏ đồng minh, khó bị mua, ít lộ chuyện",cost:"khó lấy lòng: quà và lời ngọt nhẹ ký, chậm tin người",
  w:{help:.6,visit:.5,mediate:.6,gossip:.5,rumor:.7,drop:.35,ally:.8},mal:4,slight:1,forgive:.8,trust:.6,gift:.6,fade:[.6,1],q:{loyal:.5,talk:-.4,hide:.5}},
 "Nóng nảy":{g:"tt",p:"Điềm tĩnh",s:"b",tend:"dễ nổi giận, nói thẳng mặt; giận mau, nguôi mau",gain:"không giấu mưu: ý đồ dễ đoán, giận mau nguôi",cost:"dễ gây sự, dễ bị khích, ghen ra mặt",
  w:{provoke:2.2,humiliate:1.5,trip:1.4,warn:1.3,feign:.3,plant:.6,frame:.7,follow:1.3},dang:3,mal:8,slight:1.5,forgive:1.4,ghen:1.3,fade:[1,1.4],q:{hide:-.8,talk:.3}},
 "Điềm tĩnh":{g:"tt",p:"Nóng nảy",s:"b",tend:"bình thản, nhẫn được; khó bị khích",gain:"khó bị khích hay bị xui; hay can ngăn",cost:"nhẫn nại chờ thời: ý đồ khó thấy, hận ngầm lâu",
  w:{provoke:.4,humiliate:.5,trip:.6,mediate:1.6,feign:1.3,follow:.5},dang:-2,mal:-3,slight:.7,forgive:1,ghen:.8,fade:[1,.8],q:{hide:.8,timid:-.5}},
 "Nhiều chuyện":{ban:["Tín"],g:"tt",p:"Kín đáo",s:"b",tend:"buôn chuyện, tin gì cũng lan",gain:"mang nhiều tin về: tai mắt, chuyện các cung",cost:"chuyện của chủ, của bạn cũng lan ra ngoài",
  w:{rumor:2,gossip:3,spy:1.3},q:{talk:1}},
 "Kín đáo":{g:"tt",p:"Nhiều chuyện",s:"b",tend:"giữ kín chuyện, để ý người quanh mình",gain:"giữ kín bí mật; dễ nhận ra tai mắt cài vào",cost:"ít khi kể tin cho ai; chậm tin người",
  w:{gossip:.4,rumor:.5,spy:1.8,check:1.8,test:1.5},trust:.8,q:{talk:-.7,hide:.6,sharp:.4}},
 "Kiêu ngạo":{ban:["Khiêm"],g:"tt",p:"Khiêm nhường",s:"f",tend:"khoe ân sủng, hạ nhục người dưới, không chịu xin lỗi",gain:"trọng thể diện: lễ hậu, quà lớn được đáp mạnh; khó bị ép hay bị xui",cost:"quà mọn chẳng thèm nhìn; hay khiêu khích, hạ nhục",
  w:{steal:1.4,provoke:2.4,humiliate:2.4,flaunt:2.4,rumor:1.3,trip:1.3,help:.6,mediate:.4,apologise:.15,follow:.4},mal:12,slight:1.5,forgive:.7,gift:.6,lavish:60,fade:[1.2,.7],q:{timid:-.5}},
 "Khiêm nhường":{g:"tt",p:"Kiêu ngạo",s:"f",tend:"nhún nhường, tránh va chạm, theo người cầm đầu",gain:"dễ hòa, dễ xin lỗi; không dám phản chủ",cost:"theo người mạnh, dễ bị xui làm; bị ép thì khai",
  w:{steal:.5,follow:4.4,apologise:2,help:1.2,provoke:.3,humiliate:.2,flaunt:.3,poison:.4,frame:.5},dang:-4,mal:-10,slight:.8,forgive:1.3,trust:1.1,gift:1.1,q:{timid:1}},
 "Cương trực":{g:"tt",p:"Xu nịnh",s:"m",tend:"thẳng lưng, nói thẳng điều sai trái",gain:"không mua được để nói dối; lời chứng đáng tin, hay báo việc sai",cost:"thẳng miệng mích lòng người trên; không nhận việc mờ ám",
  w:{feign:.2,plant:.4,frame:.5,warn:1.8,provoke:1.3,accuse:1.4},mal:-2,slight:1.2,gift:.8,q:{loyal:.4,greed:-.6,timid:-.5}},
 "Xu nịnh":{g:"tt",p:"Cương trực",s:"m",tend:"lựa lời ngọt, bám người có thế",gain:"dễ lấy lòng bằng lời ngọt, quà cáp; ngươi lên thì hắn theo",cost:"người sa cơ là bỏ; bên mạnh hơn mua là đổi phe, bị ép thì khai",
  w:{ally:2,serveTH:1.6,follow:2.52,drop:2,flaunt:1.2},mal:5,gift:1.4,riseGift:1.6,q:{greed:.4,timid:.6}},
 /* ---- LÒNG DẠ ---- */
 "Thật thà":{v:"Tín",g:"ld",p:"Xảo quyệt",s:"b",tend:"nói thật, ghét mưu ngầm",gain:"đáng tin: lời nàng báo là thật, không làm việc ám muội",cost:"dễ lỡ lời lộ bí mật; dễ tin người",
  w:{feign:.2,plant:.4,frame:.5,warn:1.5,rumor:.7},dang:-3,mal:-8,trust:1.2,q:{talk:.3,timid:.4,greed:-.3}},
 "Xảo quyệt":{v:"Trí",ban:["Nhân","Tín"],g:"ld",p:"Thật thà",s:"b",tend:"tính trước tính sau, ngoài mặt thân thiện",gain:"đồng minh sắc trong mưu kế; tai mắt giỏi, dò tin giỏi",cost:"có lợi hơn là trở mặt; nhẫn nại giăng bẫy kẻ cản đường",
  w:{feign:2.5,plant:1.8,frame:1.8,kframe:1.8,spy:1.6,poison:1.5,kpoison:1.5,musk:1.5,catswap:1.5,pushp:1.3,ally:1.5,drop:1.6,warn:.6,help:.8,mediate:.5},dang:5,mal:25,forgive:.8,trust:.8,fade:[1.3,.6],q:{sharp:.6,hide:.5}},
 "Thanh liêm":{v:"Liêm",g:"ld",p:"Ham lợi",s:"b",tend:"không tham của, không nhận quà riêng",gain:"không bán tin, không ăn cắp; lời chứng không mua được",cost:"bạc không mua được nàng; quà hậu nàng chê",
  w:{bribe:.2,bribeksp:.2,flaunt:.6,steal:.2},mal:-5,gift:.7,q:{greed:-1}},
 "Ham lợi":{v:"Cần",ban:["Liêm","Kiệm"],g:"ld",p:"Thanh liêm",s:"b",tend:"mê bạc vàng, việc gì cũng tính lời lỗ",gain:"mua được bằng bạc (tin tức, giúp việc) và giá rẻ hơn; quà nào cũng ấm lòng",cost:"bán tin cho người trả cao hơn; ăn cắp vặt",
  w:{bribe:1.6,steal:2,flaunt:1.2},mal:5,gift:1.6,q:{greed:1}},
 "Rộng lượng":{v:"Nhân",g:"ld",p:"Thù dai",s:"b",tend:"dễ bỏ qua, hay làm hòa",gain:"oán mau nguôi, làm hòa được",cost:"ơn cũng mau quên; dễ bị người lợi dụng",
  w:{help:1.4,mediate:1.6,provoke:.6,follow:1.4},dang:-6,mal:-12,slight:.7,forgive:1.8,fade:[1.4,1.8],q:{loyal:.2}},
 "Thù dai":{v:"Sỉ",g:"ld",p:"Rộng lượng",s:"b",tend:"nhớ oán rất lâu, nhớ ơn cũng lâu",gain:"không quên ơn: người từng giúp nàng được nàng giúp lại lâu dài",cost:"không quên oán: kẻ làm nàng mất mặt bị nhớ mãi",
  w:{provoke:1.2,drop:.4},dang:4,mal:12,slight:1.4,forgive:.3,trust:.9,gift:.9,fade:[.5,.3],q:{loyal:.3}},
 "Trọng nghĩa":{v:"Nghĩa",g:"ld",p:"Thực dụng",s:"b",tend:"giữ lời, không bỏ bạn lúc hoạn nạn",gain:"che chắn cho chủ, cho bạn; giữ lời hứa, khó bị mua",cost:"không làm việc thất đức cho ai, còn quỳ can; theo nghĩa chứ không theo lợi",
  w:{steal:.6,help:1.6,warn:1.8,drop:.1},dang:-3,mal:-8,trust:1.2,fade:[.6,1],q:{loyal:1}},
 "Thực dụng":{v:"Kiệm",g:"ld",p:"Trọng nghĩa",s:"b",tend:"khéo lấy lòng người trên, theo lợi",gain:"dễ kết minh khi đôi bên cùng có lợi; ngươi lên thì nàng xích lại",cost:"đồng minh sa cơ là bỏ; lợi lớn hơn thì đổi phe",
  w:{ally:2,drop:2.2,serveTH:1.4,bribe:1.2,help:.8},mal:5,gift:1.2,riseGift:1.6,q:{greed:.3,sharp:.3}},
 /* ---- CHÍ HƯỚNG ---- */
 "Tham vọng":{g:"ch",p:"An phận",s:"b",tend:"bám người mạnh, cướp đêm thị tẩm, muốn trèo cao",gain:"lanh lợi, bám người đang lên: ngươi lên thì nàng theo",cost:"tranh đêm thị tẩm, đút lót Kính sự phòng; muốn trèo cao, bỏ kẻ sa cơ",
  w:{ally:2,steal:2.2,bribeksp:2.2,drop:1.8,block:1.8,accuse:1.4,bribe:1.3},mal:12,ghen:1.2,riseGift:2,fade:[1.4,1],q:{sharp:1}},
 "An phận":{g:"ch",p:"Tham vọng",s:"b",tend:"không tranh sủng, yên với phận mình",gain:"không tranh đêm, ít ghen; ở lâu, không bỏ chủ",cost:"ít chịu liều vì người khác; khó kéo vào phe",
  w:{steal:.4,bribeksp:.3,block:.4,accuse:.5,ally:.7,help:.8,follow:1.3},dang:-3,mal:-8,ghen:.7,q:{timid:.5,loyal:.3}},
 "Ham học":{g:"ch",p:"Ham vui",s:"b",tend:"chăm đèn sách, tài nghệ",gain:"học nhanh, lanh trí: dò ra manh mối",cost:"ít giao du, ít đến thăm; khó kết thân bằng yến tiệc",
  w:{visit:.7,gossip:.6,ally:.85,pray:.7},q:{sharp:.8,study:1}},
 "Ham vui":{g:"ch",p:"Ham học",s:"b",tend:"thích yến tiệc, trò vui, chuyện phong tình",gain:"dễ kết thân: quà nhỏ, cuộc vui là đủ",cost:"lơ là việc, hay sơ suất; tình ý thay đổi",
  w:{visit:1.5,gossip:1.5,rumor:1.2,pray:.6},gift:1.3,q:{talk:.5,study:-.5,greed:.3}},
 "Mê tín":{g:"ch",p:"Thực tế",s:"b",tend:"tin điềm báo, sợ bùa ngải",gain:"hay lên chùa cầu khấn, soát quà kỹ vì sợ bùa ngải: quà có độc khó lọt",cost:"lo cúng bái hơn giao du: ít đến thăm, ít giúp, ít kết minh",
  w:{check:1.5,pray:3,follow:1.2,help:.8,visit:.8,ally:.8}},
 "Thực tế":{g:"ch",p:"Mê tín",s:"b",tend:"chỉ tin điều tận mắt thấy",gain:"soát việc kỹ, thử lòng người: quà có độc, kẻ gian khó qua mắt",cost:"chậm tin người; lời ngọt và quà cáp nhẹ ký",
  w:{pray:.3,check:1.3,test:1.2},trust:.9,gift:.9,q:{sharp:.2}},
 "Vì gia tộc":{g:"ch",p:"Vì mình",s:"b",tend:"kính bề trên, giữ nề nếp, lo cho nhà",gain:"kính Thái hậu, giữ nề nếp; giữ lời vì danh nhà",cost:"nhà bảo gì nghe nấy, có khi bỏ bạn vì nhà",
  w:{serveTH:2.2,ally:1.2,provoke:.7,follow:1.3,drop:1.3},dang:-2,mal:-3,trust:1.1,q:{loyal:.3}},
 "Vì mình":{g:"ch",p:"Vì gia tộc",s:"b",tend:"lo cho mình trước hết",gain:"dễ mua bằng lợi riêng; phe phái khó kéo",cost:"không hy sinh cho ai; lúc nguy là bỏ",
  w:{steal:1.4,block:1.4,drop:1.6,help:.7,warn:.7,accuse:1.2,follow:.3},mal:8,gift:1.2,q:{greed:.5}}
 }};
/* ONE CORE (OD:L1267) for jkc2.js (the cnv / nc / bd home roads before the palace, review/origin-intros): every cost (c), gain (w), loss (l),
   bar (min_), khắc (k) and odds base (odds) of a home card or event. Key = card name (ASCII) or the function, then the slot and the stat. */
Object.assign(BAL,{kc2:{kcGoWhy_k:1,nghiNgoi_w_suc:25,detVaiBan_c_suc:-15,detVaiBan_w_bac:4,detVaiBan_l_suc:-5,theuKhan_c_suc:-10,soiBongNuocChai_c_suc:-5,soiBongNuocChai_w_sac:1,hoiHan_c_suc:-5,raRuongGiupCha_c_suc:-20,raRuongGiupCha_c_sac:-1,muaThuocChoMe_c_suc:-5,muaThuocChoMe_c_bac:-8,muaThuocChoMe_w_duc:1,haiLaThuocCho_c_suc:-20,haiLaThuocCho_w_duc:1,gopBacCuoiVo_c_bac:-10,detThemVaiLam_c_suc:-25,traBotNoNha_c_bac:-15,traBotNoNha_odds:40,lamKhongCongCho_c_suc:-25,bieuQuaLyTruong_c_bac:-10,theuKhanBieuBa_c_suc:-20,giatAoCungXuan_c_suc:-10,dayXuanDaoDuong_c_suc:-10,hocLeNghiVoi_c_suc:-15,hocLeNghiVoi_c_bac:-4,hocLeNghiVoi_w_duc:1,ganhNuocQuetNha_c_suc:-20,ganhNuocQuetNha_w_duc:1,ngheBaTuKe_c_suc:-5,ngheBaTuKe_w_tamco:1,hocChuVoiSu_c_suc:-10,hocChuVoiSu_w_tai:1,leChuaCauBinh_c_suc:-10,leChuaCauBinh_c_bac:-1,leChuaCauBinh_w_duc:2,leChuaCauBinh_odds:30,banVaiOCho_c_suc:-10,banVaiOCho_w_bac:6,banVaiOCho_o_bac:2,hoiTinNguoiDi_c_suc:-5,kc2CardsNc_c_suc:-10,kc2CardsNc_o_suc:5,kc2CardsNc_o_sac:1,docSachDaiHy_c_suc:-10,docSachDaiHy_w_tai:1,vanAn_c_suc:-5,hau_c_suc:-10,hau_w_tamco:1,xinThemHoiMon_c_suc:-10,cung_c_suc:-15,cung_w_duc:1,troChuyenVoi_c_suc:-10,ketThan_c_suc:-5,ketThan_c_bac:-8,day_c_suc:-15,doYHoangThuc_c_suc:-10,tiepSuThanDai_c_suc:-10,tiepSuThanDai_odds:50,hocLeNghiDai_c_suc:-15,hocLeNghiDai_c_bac:-10,hocLeNghiDai_w_duc:1,tuHocLeNghi_c_suc:-25,tuHocLeNghi_w_duc:1,guiLeVatCho_c_bac:-20,danhCoVoiSu_c_suc:-15,cauPhuc_c_suc:-15,cauPhuc_c_bac:-3,cauPhuc_w_duc:2,raChoNgheDan_c_suc:-10,raChoNgheDan_c_bac:-2,top_c_suc:-5,top_w_suc:10,top_w_duc:1,kc2Month_o_bac:1,kc2Month_o_bac2:6,kc2Month_min_suc:0,d_benh_o_bac:-12,d_benh_o_suc:-5,d_benh_min_bac:12,d_benh_o_suc2:-25,d_benh_o_duc:2,d_benh_o_bac2:-4,d_benh_o_suc3:-10,d_benh_min_bac2:4,d_ghe_o_duc:1,d_ghe_odds:60,d_xd_o_bac:-15,d_xd_min_bac:15,d_xd_o_suc:-5,d_xd_o_duc:1,d_lai_o_suc:-20,d_lai_o_bac:15,d_lai_o_bac2:4,d_lai_o_bac3:3,d_bac_o_bac:-10,d_bac_odds:40,d_bac_min_bac:10,d_bac_odds2:45,d_lu_o_suc:-25,d_lu_o_suc2:-10,d_lu_o_suc3:-15,d_thue_o_bac:-12,d_thue_min_bac:12,d_thue_o_suc:-20,d_thue_o_suc2:-5,d_thue_odds:25,n_hoi_o_suc:-15,n_hoi_o_danh:3,n_hoi_o_danh2:-1,n_muoi_o_suc:-5,n_benh_o_suc:-25,n_benh_o_duc:3,n_benh_o_suc2:-5,n_le_o_suc:-10,n_le_o_duc:2,n_thich_odds:70,n_thich_o_suc:-30,n_thich_o_suc2:-10,n_thich_odds2:35,n_thich_o_suc3:-35,n_yen_o_suc:-5,n_pha_o_suc:-15,top_o_bac:-5,top_min_bac:5,top_o_suc:-20,top_o_suc2:-10,top_o_tamco:2,top_o_duc:2,top_o_suc3:5,top_o_suc4:-5,top_o_duc2:3,d_tuyen_o_suc:-10,d_thi_o_suc:-5,n_ramat_o_suc:-10,n_ramat_o_suc2:-5,kc2SelOn_o_suc:-5}});
/* review/one-core-dup3-land (ONE CORE OD:L1267): what origin-intros left typed in jkc2.js. dev/measure/one-core-land-kc2-move.js moved the odds bases
   od(N+…) (<card>_od) / roll(N+…) (<option>_rb) and the house-stat kap / kgt / khm amounts of the cards (<card>_<slot>_<stat>); by hand:
   st = the home-stat starts [base, random span] / cuts / set-values: kgtLow = the red cut of the main bar (Gia thanh / Tiếng trong xóm / Hòa ước; jkc + jkc2),
   kapHot / kapRow = red cut / row shown (jkc2 Nợ nhà / Phe chủ chiến); dan.moi / siet = Nợ nhà event cuts (siet = creditors come, printed in the help),
   sietLeft = Nợ nhà after the two «Siết nợ» answers; nc.thich / pha = Phe chủ chiến cuts (pha = they strike, printed), phaLeft = after the 3 «Triều đình» answers;
   nc.month (+monthThuc with a «thuc» kin) = Phe chủ chiến growth a month;
   kgtBr / khm = [the bd branch, the other]; bdRoll = the bd branch bonus to «Tự mình chống trả». The amounts of S.kap / S.kgt / x.oan writes are in BAL.eff.jkc2. */
Object.assign(BAL.kc2,{"detVaiBan_od":60,"soiBongNuocChai_od":65,"raRuongGiupCha_w_kap":-4,"haiLaThuocCho_od":45,"traBotNoNha_w_kap":-12,"lamKhongCongCho_w_kap":-12,"lamKhongCongCho_l_kgt":-3,"bieuQuaLyTruong_l_kgt":-2,"giatAoCungXuan_od":70,"hocLeNghiVoi_od":55,"ganhNuocQuetNha_od":50,"hocChuVoiSu_c_kgt":-1,"banVaiOCho_od":55,"hoiTinNguoiDi_od":45,"hauNgheChinhSu_od":45,"xinThemHoiMon_od":30,"xinThemHoiMon_w_khm":20,"troChuyenVoi_od":55,"ketThan_od":55,"dayMotDieuMua_od":55,"doYHoangThuc_od":30,"doYHoangThuc_w_kap":-6,"tiepSuThanDai_od":45,"tiepSuThanDai_w_kgt":3,"tiepSuThanDai_l_kgt":-2,"danhCoVoiSu_od":40,"cauPhuc_w_kap":-3,"raChoNgheDan_od":50,"raChoNgheDan_w_kgt":2,"raChoNgheDan_l_kgt":-3,"nghiemMatMangLai_rb":50,"bayChoNangGhi_rb":50,"nhanLoiDetRieng_rb":55,"raDongCuuLua_rb":50,"xinLyTruongKhat_rb":25,"xinChaTuChoi_rb":40,"noiChuyenThangVoi_rb":40,"tauVoiPhuThan_rb":45,"xinSuDoanMoi_rb":40,"xinGiuQuyenThu_rb":40,"tuMinhChongTra_rb":30,"nhanLoiChoEm_rb":40,"quyTruocTrieuXin_rb":35,"xinChaLoGach_rb":20,"tuLamTraNo_rb":45,"raMatDoanTrang_rb":40,"xinPhuHanHua_rb":30,"banDoiKhuyenBac_rb":70,"thucDemSacLa_rb":45,"moiThayCungVe_rb":30,"xinDeDiThay_rb":15,st:{kgtLow:25,kapHot:70,kapRow:50,dan:{kgt:[40,20],kap:[25,20],kgtu:15,moi:55,siet:100,sietLeft:[70,55]},nc:{kgt:[40,20],kgtBr:[-5,5],kap:[20,15],khm:[60,90],kgtu:70,thich:50,pha:90,phaLeft:[45,70,65],bdRoll:15,month:4,monthThuc:1}}});
/* review/one-core-jkc (ONE CORE OD:L1267; the owner's own example: one text said 60 / 85, another 60 / 90, the rules used 40 / 90): the cuts of
   Áp lực hôn sự on the TIỂU THƯ home road (jkc.js). Not jkc2's kapHot 70 / kapRow 50: there the same field is Nợ nhà / Phe chủ chiến, another rule
   with other values, so the tiểu thư road has its own keys, one per rule, read by every rule AND printed by both help texts (HX.kap, KIT_GLOSS):
   moi  = from here bà mối may come (monthly roll) — the Áp lực row of the top bar shows from the same cut;
   hot  = red cut (top bar, HUD chip, Giao du, Nhà tab, summary);   mien = from here the house may ask for miễn tuyển (cha's «Xin cha lo…», tổ mẫu's chiêu);
   nhan = from here she may say yes to a suitor («Nhận lời nhà …»);  dinh = cha định hôn (a suitor is waiting).
   Starts / set-values / Gia tư cuts (PART 3, values unchanged): kgt / kap = [base, random span] at the start, kgtBr = [tt / ch house, td house] Gia thanh bonus;
   gtuPoor = Gia tư below this adds 1 to the monthly Áp lực; gtuRich = Gia tư from this opens the rare muối event (kcR6); chaYes = Áp lực after cha
   agrees to the tuyển tú; mienSo = Áp lực at least this when a miễn tuyển girl's Sơ tuyển comes (cha then định hôn). */
Object.assign(BAL.kc2.st,{kc:{moi:40,hot:60,mien:50,nhan:70,dinh:90,kgt:[40,20],kgtBr:[10,-10],kap:[10,10],gtuPoor:40,gtuRich:90,chaYes:40,mienSo:85,
 /* review/one-core-jkc-2: bạc of the tiểu thư dialog options (the option cost and its lock read the same key): bacHuynh = «Đưa bạc» to the elder brother,
    bacThu = «Hồi âm, gửi kèm quà», bacMien = «Xin cha lo cho được miễn tuyển», bacMama = «Dúi bạc cho ma ma khám tuyển» */
 bacHuynh:50,bacThu:15,bacMien:40,bacMama:60}});
/* review/one-core-jkc (ONE CORE OD:L1267, dev/measure/one-core-jkc-move.js): BAL.kc2.kcCard = the tiểu thư home road (jkc.js) cards and event options —
   odds bases od(N+…) (<card>_od) / roll(N±…) (<option>_rb) and the house-stat kap / kgt / khm amounts of a card's c / w / l (<card>_<slot>_<stat>). */
Object.assign(BAL.kc2,{kcCard:{"vietNhatKyGiau_od":78,"chaiChuotThuY_od":70,"thinhAn_w_kgt":1,"hauChaOThu_od":55,"khuyenChaChonPhe_od":30,"xinChaDangSo_od":10,"xinChaTienRieng_od":45,"lamVuaLong_od":65,"lamVuaLong_w_khm":5,"ketThan_od":60,"ngangChanThuMuoi_od":40,"ngangChanThuMuoi_l_kgt":-3,"doLaVien_od":30,"toTruocToMau_od":50,"toTruocToMau_w_kgt":2,"quanViecNha_od":50,"quanViecNha_w_kgt":1,"quanViecNha_l_kgt":-2,"daoPhoCho_od":80,"ngheChuyenOTra_od":40,"ngheChuyenOTra_l_kgt":-4,"tham_od":65,"kheoTuChoiNha_od":45,"kheoTuChoiNha_w_kap":-10,"kheoTuChoiNha_l_kgt":-3,"giaBenhTranhXem_od":45,"giaBenhTranhXem_w_kap":-15,"guiThuChoNguoi_od":40,"moiDanhSu_od":35,"muaTinCuaThai_od":50,"guiQuaVaoCung_od":60,"xinToMauMoi_od":35,"nhoHuynhTruongDo_od":45,"guiBucTheuTu_od":50,"nhoToMauKhuyen_od":10,"hauTronBuoi_od":65,"hauTronBuoi_w_khm":5,"giupMotViec_od":60,"saiTyNuNgang_od":40,"saiTyNuNgang_l_kgt":-3,"kcCards_od":30,"kcCards_od_2":30,"diXemChoKhong_od":80,"ngheLomNgoaiHien_od":35,"ngheLomNgoaiHien_l_kgt":-4,"mangBanhNhaLam_od":65,"nhinAnTranhXem_od":45,"nhinAnTranhXem_w_kap":-15,"tuTayDuaThu_od":30,"kcMonth_rb":30,"dungThu_rb":50,"dungRaBenh_rb":40,"xinToMauCho_rb":45,"noiLaiVoiCha_rb":50,"doiLaiCauDoi_rb":30,"thucDemTheuBach_rb":50,"thuaConDoiKy_rb":40,"quyXinChaCho_rb":45,"thuMotChutLen_rb":50}});

/* ONE CORE (owner OD:L1267; review/show-why, from review-trait-pool-r1 follow-up): every number chosen by a nết test lives here.
   BAL.net.k: quality-keyed sizes for nq(p,quality,n) / netIs (servant + agent qualities). BAL.net.n: nết-keyed tables read by
   nv(p,key) (jnet.js): keys are nết names or "q:<quality>" (netIs), tested IN ORDER, first match wins (= the old a?x:b?y:z chains),
   "_" = the value when none matches. Scan: python3 dev/tools/net-inline-scan.py → 0. */
Object.assign(BAL.net.k,{spySharp:15,askSharp:15,sentSharp:8,confTimid:20,confLoyal:15,confGreed:5,bribeGreed:25,bribeTimid:25,bribeLoyal:10,poachSharp:10,
 firmLoyal:30,firmGreed:-20,lean:{greed:[-10,3],loyal:[12,-6],timid:[6,-4],talk:[-12,2]}/* sentPen: [dirty act or rumor, otherwise] */});
BAL.net.n={
 tellRoll:{"q:talk":25,"_":10},
 askTalk:{"q:talk":70,"_":40},
 flirtTinh:{"Ham vui":6,"_":0},
 danger:{"Xảo quyệt":10,"Ân cần":-15,"Khiêm nhường":-10,"_":0},
 staffLoyMonth:{"Xảo quyệt":-2,"Kiêu ngạo":-2,"Ân cần":1,"Khiêm nhường":1,"_":0},
 bribeCost:{"q:greed":15,"_":30},
 misAdj:{"Ân cần":10,"Khiêm nhường":10,"Kiêu ngạo":-8,"Xảo quyệt":-8,"_":0},
 misJealTin:{"Xảo quyệt":8,"Kiêu ngạo":8,"_":4},
 betrayFind:{"Kín đáo":25,"_":10},
 spyFind:{"Kín đáo":25,"_":8},
 srvBad:{"Xảo quyệt":.12,"Kiêu ngạo":.12,"_":0},
 srvGood:{"Ân cần":.2,"Khiêm nhường":.2,"_":0},
 affairRumor:{"Kín đáo":3,"_":0},
 agentW:{"q:sharp":3,"q:talk":3,"q:loyal":2,"_":1},
 tutorWant:{"Tham vọng":3,"Kiêu ngạo":3,"Xảo quyệt":3,"Kín đáo":2,"_":1},
 h54P:{"Tham vọng":.6,"Kiêu ngạo":.6,"Xảo quyệt":.6,"_":.4},
 corrupt:{"Ham lợi":25,"Cương trực":-15,"_":0},
 dadT:{"Ham lợi":20,"Cương trực":-15,"_":0},
 giftO:{"Ham lợi":25,"Cương trực":-25,"_":0},
 feudW:{"Cương trực":2,"Tham vọng":2,"Kín đáo":.5,"_":1},
 afFade:{"Thật thà":1,"_":2},
 praise:{"Kiêu ngạo":8,"Tham vọng":8,"_":4},
 agentLeak:{"q:talk":15,"_":0},
 motive:{"Xảo quyệt":10,"_":0},
 empW:{"Tham vọng":2.5,"Kiêu ngạo":2.5,"_":1},
 coverUp:{"Kín đáo":15,"_":0},
 traceHide:{"Kín đáo":12,"_":0},
 rumorP:{"Nhiều chuyện":5,"Xảo quyệt":5,"Nóng nảy":3,"Kín đáo":3,"_":1.5},
 ducDef:{"q:loyal":60,"q:greed":30,"_":45},
 kcBac:{"Ham vui":1.2,"_":.5},
 kcReal:{"Xảo quyệt":75,"_":45},
 kcPowder:{"Xảo quyệt":30,"_":0},
 menGap:{"Ham vui":9,"_":12},
 menHide:{"Kín đáo":10,"_":0},
 thyEv:{"Xảo quyệt":6,"Tham vọng":6,"_":0},
 tsCare:{"Kín đáo":70,"Kiêu ngạo":15,"_":40}};
/* review/batch-d8 merge (show-why × origin-intros): the nết-chosen numbers of jkc2.js (home roads cnv / nc / bd), read by nv() like jkc.js kcBac/kcReal/kcPowder.
   kc2HmAsk = odds shift when she asks father for more hồi môn · kc2MeSick = mother's illness harder · kc2MuTalk = odds of making up with vương muội ·
   kc2ChaWant / kc2MeWant = thiện cảm when her name stays in the draft · kc2EnvoyMeet = envoy at the old-country greeting · kc2KhanGo / kc2MuGo = khan / sister when
   she volunteers · kc2MuSwap / kc2KhanSwap = odds the sister goes instead (+) / the khan refuses (−) · kc2KhanVow = odds of his vow · kc2KhanStay = when she stays loyal to Đại Hy */
Object.assign(BAL.net.n,{kc2HmAsk:{"Kín đáo":-10,"_":0},kc2MeSick:{"Kín đáo":20,"_":0},kc2MuTalk:{"Khiêm nhường":20,"Ân cần":20,"_":0},
  kc2ChaWant:{"Cương trực":6,"_":2},kc2MeWant:{"Kín đáo":-6,"_":-2},kc2EnvoyMeet:{"Cương trực":-6,"_":3},kc2KhanGo:{"Cương trực":10,"_":5},
  kc2MuGo:{"Tham vọng":-6,"_":4},kc2MuSwap:{"Tham vọng":25,"Kiêu ngạo":25,"_":0},kc2KhanSwap:{"Cương trực":10,"_":0},kc2KhanVow:{"Kín đáo":10,"_":0},
  kc2KhanStay:{"Tham vọng":-12,"_":-4}});
/* ===== GREETING NAME RULE + AG-MEET (owner 17/11 05:12Z chosen 05:28Z "phẩm + tính cách"; 05:25Z NPCs come to her) — jgreet.js reads ONLY this =====
   Rank side: a title held by ONE seat (BAL.seatCap[r] === 1: Hoàng hậu, Hoàng quý phi) or a chí tôn (Hoàng thượng, Thái hậu) is public: the lower one
   knows the name at once. Trait side: a nết-keyed table in the ONE trait pool (BAL.net.n.greetName, read by nv()): 1 = the higher / equal one gives
   her name back, 0 = she only nods (Tính tình Kiêu ngạo / Lạnh lùng). ann = who walks with a herald who calls the name (chí tôn retinue).
   rank = the ladder used to compare (consort rank r → cons + r; servants srv + their rank (tq / mama: srv + tq / mama, her too); a child cons + kid; men / officials man; chí tôn top).
   meet = AG-MEET: each buổi a consort present where others are spends her ONE deed of the buổi (agent law) on approaching someone, or keeps her
   schedule (stay). Utility of approaching = (ally need + spite need × spite) × her nết's sociability (BAL.net.n.meetW) — needs from agNeeds, no new bar;
   pick weights: base for a stranger (a grey shadow, picked at random), + thiện cảm / + oán for people she knows. opt = how her nết weighs each
   person-dialog option she uses on the one she approaches (product over her 3 nết of BAL.net.T[t].w[tag], the same w the agent loop uses). */
BAL.greet={ann:{emp:1,th:1},rank:{top:100,th:99,cons:10,out:9,man:8,srv:1,tq:5,mama:4,kid:3},
 meet:{on:1,stay:.35,spite:.6,base:1,affK:20,oanK:20,max:3,
  opt:{greet:"visit",health:"visit",praise:"help",secret:"ally",gossip:"gossip",warn:"warn",provoke:"provoke"}}};
BAL.net.n.greetName={"Kiêu ngạo":0,"Lạnh lùng":0,"_":1};
BAL.net.n.meetW={"Ân cần":1.6,"Nhiều chuyện":1.8,"Xu nịnh":1.4,"Nóng nảy":1.2,"Lạnh lùng":.4,"Kín đáo":.6,"Kiêu ngạo":.8,"_":1};
/* the person-dialog chat options (j9 topicOpts, j2 Khiêu khích): ONE table read by her options AND by the same options an NPC uses on her (AG-MEET, jgreet:
   mirrored, she is the judge). Gains are × chatF (fewer each repeat). praise odds = od(o + the speaker's Tài / div); foe = oán a third must hold to warn. */
BAL.talk={health:4,praise:{o:60,div:5},praiseFail:2,secret:10,secretBond:30,gossip:{hit:8,miss:3,oan:5,tell:50,tellOan:10},warn:{hit:10,miss:2,oan:10,foe:30},provoke:{rel:15,ghen:10,danh:1}};
/* AG-ALL day plan (jagday.js; design dev/handover/reports/ag-all.md §10, owner OD 17/11 ~13:40Z): at the start of each day every NPC draws her
   plan (buổi by buổi: place + deed + goal); replan: when her top need changed or something touched her (the player's deed aimed at her, her own
   deed failed, an event) she weighs new vs keep on the need × 100 scale: keep + need (she holds to her plan), new + touch when touched; no change → she keeps her plan */
BAL.ag.day={on:1,replan:{need:25,touch:40},redecideScope:"consort"/* "consort" = cap on consorts; "far" = only far staff (no consort master, not hers) are filtered + capped, consorts and their servants pick every buổi */,redecideCap:0/* ag2-perf A (owner OD L1637): >0 = at most this many consorts pick their buổi deed again per buổi, only those with a cause (jagday agRdcCause); 0 = OFF: every consort picks every buổi (MAIN ROOT-52 18/11: no cap kept NPC deeds >= 95 % of 02466132 — 12/16/24/inf all ~78-85 %, the cause filter itself drops them — so consorts are never capped; 4x per-khắc still below live) */};
/* AG-ALL part A acts (jagacts.js): cx = the consort cards of j2 the loop lacked — c cost, o odds, w gain (the player's card reads the SAME
   entry), need = what the act serves in BAL.ag.unit points (the agent's utility); maidR.below = her maid's lòng under which a reward is worth it;
   study = Sức for a lesson, g = points; thHelp / hhShield = Xin Thái hậu đỡ lời / Xin Hoàng hậu che chở (odds o + regard / div, gate min);
   buy.keep = bạc she keeps after a purchase; gift.g / ally.g = points of a gift / Kết giao (ally: cost bạc, friendship rel above).
   hh = the Empress's acts (Xử tội, Tịch thu, Ban thưởng, Ân xá, Khất bổng lộc, Khuyên mưa móc): g = points per act, gates = the old roll's
   gates (confHh, rewardHh, cutRelMax), cutRel relation lost, pardonAff / pardonRel / pardonDuc.
   th = Thái hậu: w = need weights (order: one consort holds his nights; fond: consorts she favours, th ≥ fondTh, not gifted for giftCd tuần;
   mercy: a favoured consort in lãnh cung, th ≥ mercyTh), g = utility per need, items = what she gives (the old j8 list) */
Object.assign(BAL.ag,{cx:{face:{c:{"bac":-30},get o(){return BAL.odb.j2.odO_9},w:{"sac":3},need:{"sung":2}},arts:{c:{"suc":-10},o:100,w:{"tai":2},need:{"danh":2}},book:{c:{"suc":-5},o:100,w:{"tamco":2},need:{safe:2}},
  alms:{c:{"bac":-40},get o(){return BAL.odb.j2.odO_8},w:{"danh":7,"mat":1,"duc":3},need:{"danh":5,"duc":3}},sutra:{c:{"bac":-10},o:100,w:{"duc":3},need:{"duc":3}},maidR:{c:{"bac":-20},o:100,w:{"maid":20},need:{safe:3},below:60},
  rest:{c:{},o:100,w:{"suc":20},need:{rest:6}},study:{"suc":10,g:3},thHelp:{get o(){return BAL.odb.j2.odO_17},div:3,min:30,w:{"danh":4,"hh":5},l:{"th":-5}},hhShield:{get o(){return BAL.odb.j2.odO_20},div:3,min:20,g:6,w:{"hh":3},l:{"hh":-5},sh:2},
  buy:{keep:20,g:2},gift:{g:4},ally:{"bac":30,"rel":10,g:4}},
 hh:{g:{judge:6,conf:4,reward:4,pardon:4,cutpay:3,admon:5},orderW:.35,orderN:3,confHh:-40,rewardHh:50,cutRelMax:-30,cutRel:15,pardonAff:20,pardonRel:30,pardonDuc:2,kh:2},
 th:{w:{order:1,fond:.6,mercy:.8},g:{order:10,fond:6,mercy:8},fondTh:40,giftCd:6,mercyTh:50,items:["nhansam","yensao","vongngoc","huongtram"]}});
/* AG-ALL r1 F5 weight pass (needs × traits, no dice): spiteD = hostility that makes the spite need whole (agSpN; was a typed 100);
   hh.orderW / orderN = the Empress's duty need (jagacts agHhCases); th.fondTh 60 → 40 = the Thái hậu's regard at which she favours a consort
   (one number with the old j8 gift gate). Measured with the 60-day bot (report §17). */
BAL.ag.spiteD=35;BAL.ag.favAsk=40;
BAL.ag.day.worldPull=2;/* weight of a world window place against her own "no goal" place, per × above 1 (worldPlanW place) */
/* LIFE: the day's feeling (jemo, strength ≥ min) leans her needs when she plans: × per need, _ = × on keeping her schedule (sad / afraid: stays in) */
BAL.ag.day.mood={min:30,k:{vui:{ally:1.4,"sung":1.2,_:.8},buon:{rest:1.6,ally:1.2,_:1.4},gian:{spite:1.6,_:.9},so:{safe:1.8,_:1.5},ghen:{spite:1.5,"sung":1.3},lo:{safe:1.4,kid:1.2},dau:{rest:1.8,_:1.6}}};/* dau = Buồn at the heavy level (FEELINGS-18); a new kind reads its group row (jagday agMoodF) */
/* AG-ALL the Emperor's day (jagacts §4): company = his wish for company per buổi (× his mood tsMoodW; the old weekly roll 14 × mood ≈ this over the
   4 buổi of a day against BAL.ag.routine), busyF = × when busy (ill / Chăm chính / court crisis), rest = his rest need then, buoi = the buổi (j95c) he summons in */
BAL.ag.emp2={company:.38,busyF:.4,rest:.5,buoi:[1,2]};
/* AG-ALL consort cards (jagacts "more"; the player's j2 / j9 cards read the same): portrait = Vẽ chân dung tặng Thái hậu (Họa ≥ hoa, odds o + artW × k);
   humble = Nhún nhường (cost, oán −oanDown, quý +aff; an NPC does it before someone whose oán toward her ≥ oan; g = safety points) */
Object.assign(BAL.ag.cx,{portrait:{hoa:3,c:{"suc":-10,"bac":-10},get o(){return BAL.odb.j2.odO_10},k:8,w:{"th":10},l:{"th":-1}},humble:{c:{"danh":-2},get oanDown(){return -BAL.eff.j9.run_9},get aff(){return BAL.eff.j9.run_10},oan:20,g:4}/* one number with the player's Nhún nhường (BAL.eff.j9) */});
/* AG-ALL part C (jagharm.js; design dev/handover/reports/ag-all.md §1d/§8/§9/§10): the player's scheme / harm acts as every consort's own options.
   needs   the needs a scheme can serve (her pick of WHAT she wants this buổi comes first, jagent agDecide)
   g       per act key (ACT, j8 + modules): g = need points it closes when it works (BAL.ag.unit points = one whole need), l = points lost when it fails,
           f = her fear of being caught (× the target's watch oSee, × her road's safe weight): a sure cost in her choice; "_" = an act not listed
   tw      target pick for need sung (× Sủng of the rival) / kid (per child of the target); seat = × on the holder of the seat she wants next (was j30 roll(45))
   guard   × on a scheme against a target who keeps her doors shut (jts guard, was roll(50)); pen = × on any scheme while she is punished (jface, was roll(50))
   fail    what she learnt: a failed act again × (1 + fool × fails) for Tâm cơ < 35, × wise^fails otherwise (j40 mindMenu rule)
   pat/due a big scheme (j40 BIG) is prepared first; it falls due due + (1 at Tâm cơ ≥ pat[0], 2 at ≥ pat[1]) buổi later (was 1 + R(2) + pat)
   steal   no = the weight of letting tonight be against her wish to try (stealWant u), mindPick; 1/no ≈ the old k (BAL.steal.k .25)
   prep    spite points of the preparation deeds: taint (Tẩm đồ on a sachet), cook (a dish for a poisoner, jpoison)
   hap     AG-HAP: wit = the deed keys a passer-by can witness ('!' on the map); pub = the only places a show deed is seen (a garden show) */
BAL.ag.harm={spiteD:100,needs:["spite","sung","kid","safe","danh","ally"],
 g:{_:{g:{spite:4},f:2},spy:{g:{safe:3}},rumor:{g:{spite:4},f:2},trip:{g:{spite:5},f:2},pushp:{g:{spite:9},f:6},frame:{g:{spite:8,"danh":1},l:{"danh":4},f:5},
  plant:{g:{spite:7},f:4},block:{g:{"sung":4,spite:3},f:2},bribe:{g:{spite:3,safe:2},f:1},accuse:{g:{spite:10,safe:5,"danh":2},l:{"danh":3}},vp:{g:{spite:5,"danh":1},l:{"danh":2}},
  xx:{g:{spite:5,"danh":1},l:{"danh":2}},ksab:{g:{spite:5},f:4},takeaway:{g:{kid:10}},poison:{g:{spite:12,safe:3},f:12},kpoison:{g:{spite:10},f:12},pond:{g:{spite:10},f:8},
  musk:{g:{spite:10,"sung":2},f:6},catswap:{g:{spite:8,"sung":2},f:6},kframe:{g:{spite:10},f:12},pgift:{g:{spite:10},f:8},petsteal:{g:{spite:4},f:2},laydo:{g:{spite:4},f:2},tieuhuy:{g:{safe:5,ally:2}}},
 tw:{"sung":.3,kid:10,seat:2},guard:.5,pen:.5,fail:{fool:.6,wise:.5},pat:[35,60],due:1,steal:{no:1.6/* G1 #9: 4 → 1.6 — G3 made a mindPick slip pick her near-best option instead of a uniform random one (the random "yes" was 6 of the 11 % steal tries); her "no" weight now leaves the steal-night tries to her want at the old rate (12 × 200: tries 602 base, 230 at 4) */},prep:{taint:3,cook:3},
 hap:{wit:["provoke","humil","gossip","flaunt","effort","mediate","ksp","pray","harm:trip","harm:pushp","harm:rumor","harm:pond","harm:accuse","harm:vp","harm:xx","harm:takeaway"],pub:{effort:["vuon"],flaunt:["vuon"]}}};
/* AG-ALL HYBRID day: intentW = × on the weight of a need that is part of her day intent when she picks her buổi */
Object.assign(BAL.ag.day,{intentW:3});/* the 2nd goal of the day = BAL.ag.why.g3.two (jagday agIntent) */
/* AG-ALL-2 (jagacts2.js; design dev/handover/reports/ag-all.md §16): the consort cards an NPC lacked + the Emperor's own visit / tea / bestowal.
   cx2     the player's cards read the SAME entries (j2 talkOpts / deck, j9 topicOpts, j20) through cx2O (j8): o base odds, sd / dd / td / thi / mat / y = the
           stat divisors / multipliers of the old literals, w gain, l loss, c cost; g = the need points an NPC's deed serves (BAL.ag.unit = one whole need).
           flat Tâng bốc, true Nói thật lòng (nt = + if he is Nhân từ, disc = % he lets slip what he likes), show Phô tài (k × best art weight), favor Xin ân điển
           (min Sủng, angry = % punished when he is furious), court Bàn chuyện triều chính, vent Trút giận (pg = her womb gauge, rel), chest Lục rương, fert Bài
           thuốc dễ thụ thai (m tháng), doctor Mời thái y tâm phúc, kidMed Xin thuốc cho con (hp below, up), likes Hỏi sở thích Hoàng thượng, old Hỏi chuyện cũ (lãnh
           cung), nurse Hầu thuốc Hoàng thượng (best = % he bestows), help Nhờ giúp đỡ (aff needed, p % she lends bac, fail = quý lost), kidGreet Đưa con thỉnh an
           (fond), kidHeal Chữa bệnh cho con (y = Y thuật needed, hp, up); bac = the silver need of a consort (goal, weight), kidCare = the need of a mother with a sick child.
   emp3    the Emperor's own evening visit (Ngự giá lâm cung) and day tea: desire × Σ visCh/100 = his wish to visit tonight (5 keeps HER old daily rate: her share
           of his choice ≈ visCh(her) as before), visB = the buổi (j95c) of the visit, tea = his wish to drop by for tea, teaB, teaGap days per person.
   give    his bestowal = his choice from his regard (was a flat roll of the same %): × cl(b + (Sủng − ref)/div + Ân tình/anDiv, lo, hi) × his memory (jagemp) ×
           his mood × trait tr; th = the Thái hậu's (regard = her Thái hậu value) */
BAL.ag.cx2={flat:{get o(){return BAL.odb.j2.odO_12},sd:5,w:{"sung":3},l:{"sung":-1},disc:25,g:{"sung":3}},true:{get o(){return BAL.odb.j2.odO_13},dd:3,nt:10,w:{"sung":2,"danh":2},l:{"sung":-2},disc:50,g:{"sung":2,"danh":2}},
 show:{c:{"suc":-5},get o(){return BAL.odb.j2.odO_14},k:10,w:{"sung":4,"danh":1},l:{"danh":-2},g:{"sung":4,"danh":1}},favor:{min:30,get o(){return BAL.odb.j2.odO_15},sd:3,w:{"bac":60},l:{"sung":-4},angry:40,g:{bac:6}},
 court:{get o(){return BAL.odb.j2.odO_16},td:2,thi:3,w:{"sung":4,"danh":3},l:{"sung":-2},g:{"sung":4,"danh":3}},vent:{pg:50,c:{"duc":-3},get rel(){return -BAL.eff.j2.go_3},g:{spite:5}},chest:{get o(){return BAL.odb.j2.odO_21},mat:5,get rel(){return -BAL.eff.j2.run},g:{spite:3,safe:3}},
 fert:{c:{"bac":-40},m:3,g:{kid:4}},doctor:{c:{"bac":-50},g:{safe:2,kid:3}},kidMed:{c:{"bac":-30},hp:80,get up(){return BAL.eff.j2.hpGo_2},g:{kid:4}},likes:{c:{"bac":-15},get o(){return BAL.odb.j2.odO_5},g:{"sung":2}},
 old:{get o(){return BAL.odb.j2.odO_22},td:5,g:{spite:3,safe:2}},nurse:{c:{"suc":-10},get o(){return BAL.odb.j20.odO},y:5,w:{"sung":4,"an":2},l:{"suc":-5},best:40,g:{"sung":5}},help:{get aff(){return BAL.bacFee.lendAff},p:50,get bac(){return BAL.bacFee.lend},get fail(){return -BAL.eff.j9.run_5},g:{bac:4,safe:2}},
 kidGreet:{c:{"suc":-5},get o(){return BAL.odb.j2.odO_11},sd:10,w:{"sung":2},get fond(){return BAL.eff.j2.fondGo},g:{"sung":2,kid:2}},kidHeal:{c:{"suc":-10},y:4,hp:70,get up(){return BAL.eff.j2.hpGo},g:{kid:5}},bac:{goal:120,w:.6},kidCare:.8};
BAL.ag.emp3={desire:5,visB:[3],tea:.4,teaB:[1,2],teaGap:6};
BAL.ag.give={b:1,ref:40,div:60,anDiv:200,lo:.4,hi:2,tr:{datinh:1.2,lanhlung:.7},th:{ref:40,div:60,lo:.4,hi:2}};
/* AG-ALL-2 consort ↔ servants (jagacts2): maidTalk = Tâm sự with her confidant maid (below = her lòng under which she bothers), maidSpy = Sai đi dò la
   (o + lòng / ld), bribeSrv = Mua chuộc a servant of a rival (the j29 bribeServ cost / odds), plantSrv = Cài người vào cung khác (j10 plantServ); g = need points */
Object.assign(BAL.ag.cx2,{maidTalk:{w:{"maid":6},below:70,g:{safe:2}},maidSpy:{get o(){return BAL.odb.j2.odO_23},ld:3,l:{"maid":-5},g:{spite:3,safe:2}},bribeSrv:{tcDiv:5,g:{safe:3,spite:2}},plantSrv:{tcDiv:4,get cost(){return BAL.house.plantBac},g:{spite:3,safe:1}}});
/* AG-ALL-2 emotion cards (jemoact eaNpcWeek): an NPC acts on a feeling with the old % × (feeling strength / actV), at most × max */
BAL.ag.emo2={max:2};

/* AG-ALL-2 part 2b — G8 KHẮC PARITY + G9 TIMING (jagday.js block "G8/G9"). An NPC's buổi has the player's khắc budget (BAL.time.khac):
   after her planned deed she may do more, one after another, while khắc are left — each deed costs the PLAYER's khắc for that act
   (agKhC: talk BAL.time.cost.talk, harm act BAL.time.cost.harm, a maid's SRVA k, the Empress BAL.ag.hh.kh, any other card = cardCost of its own
   cost, j2) plus the walk between places (travel, j9). on = 0 → one deed per buổi as before.
   rest   × BAL.ag.routine = the weight of "keep my schedule for the rest of the buổi" when she weighs another deed (needs × BAL.ag.needW against it)
   max    most extra deeds of a consort in one buổi after her planned one; maxX the same for the Emperor / Thái hậu / staff (perf)
   spill  1 = an NPC deed may run on into the next buổi of the same day (the DAY-khắc gate, owner OD L852 / 17/11 ~16:45Z; jagday agFitDay / agSpill); 0 = must fit this buổi
   see    NPCs who stand where a deed happens, in its khắc, react like the player (agSeeNpc): w = weights ignore / hear / join / mediate; hear odds =
          BAL.ag.wit.hear + Tai mắt × BAL.ag.wit.mat (one function agHearOf for her and them), a heard harm deed = 1 evidence (the player's rule) */
Object.assign(BAL.ag,{kh2:{on:1,spill:1,rest:1,max:3,maxX:1,see:{on:1,w:{ignore:3,hear:1,join:1,mediate:1},ev:1}}});
/* AG-ALL-2c know (jagknow): who knows a Dư đồ happening and how the news travels (one rule for her and every NPC, OD 17/11 ~14:50Z + ~15:00Z).
   eye = her own Tai mắt for a happening still to come: oSee(x) × eye/100; friend = an NPC who likes her this much (aff ≥) and meets her passes the news on (close = sends word without meeting);
   tell = a servant's choice (mindPick) when she knows: tell ×(lòng/100), keep ×(1 − lòng/100), sell (a bought servant) ×(1 − lòng/100); q = her nết (jnet qv);
   voice = lòng / thiện cảm for the warm / cool line (else cold); serve = × the utility of a servant's own errand for her master (listen / scout / watch)
   at lòng 50 (base = the worth of serving her master, need points / BAL.ag.unit, besides what the errand brings her); hear = what a consort's "Nghe lén" at a happening is worth to her (need points: safe when it is aimed at her, spite on a rival, ally otherwise);
   listen / scout / watch = the player maid's cards "Nghe ngóng cho chủ" / "Tự đi dò la cho chủ" / "Canh chừng cung chủ" (SRVA rows read these);
   share = the believable band (% of all servant deeds) of these errands, checked by ag-truth.test (owner: servants mostly serve, scouting is a sometime thing);
   tell.late = weight of a report a buổi late (peaks at lòng 50); scout.caught = % of failed scouting that is caught (else she comes back empty-handed);
   scout.oan = the target's regard lost when the spy is caught (the player's "Sai đi dò la": oán +5); keep = news kept per day */
BAL.ag.know={eye:100,friend:30,close:70,tell:{tell:1,late:.5,keep:1,sell:1.5,q:{trung:.4,chuyen:.2,lanh:.1,tham:-.3,nhat:-.2}},voice:{warm:70,cool:40},serve:.25,
 hear:{safe:4,spite:2,ally:1},base:.01,listen:{k:1,o:50,tc:3,tin:2,mp:.25},scout:{k:2,tin:3,lose:5,mp:.5,oan:5,caught:50},watch:{k:1,tin:2,mp:.25},keep:20,share:[5,20]};
/* AG-ALL-2g INFO SELLERS (jagknow tail; owner OD 17/11 ~16:50Z (2)): o = % per buổi that a seller comes to a buyer (her and each consort);
   kh = khắc to hear him out (dayFit); min = least worth of news that may be sold (never trivial); val = worth per kind of news (j78 fact key prefix;
   scheme / schemeMe = a scheme deed of this buổi against another / against the buyer; fav = a change of favour ≥ fav.d Sủng); price = bạc at worth 100
   (price × worth / 100, × 1 + ask for the nết in ask); q = who sells, by nết (qv codes; none of them = never sells); never = nết that never sell (Thanh liêm: "không bán tin"); loy = lòng to her own master at
   or above which she never sells; try = sellers looked at per offer; npc.buy / npc.no = an NPC buyer's weights (worth / 100 vs price / her bạc) */
BAL.ag.sell={o:15,kh:1,min:70,val:{plan:100,scheme:85,schemeMe:95,evme:90,affair:85,preg:80,items:75,fav:72,deed:70},price:40,ask:{tham:.25},
 q:{tham:1,lanh:.4,chuyen:.3},never:["Thanh liêm"],loy:70,try:6,fav:{d:15},npc:{buy:1,no:1}};
/* AG-ALL-2 G11 (jagtoil): an NPC's face of the day is HER CHOICE among the player's own ways at the mirror (owner 17/11 ~14:50Z: NPCs pay the same
   costs and suffer the same consequences, and choose by their own nết, not always the best). Host only (agOn); the result is the player's toilNpcPlay.
   opt     the ways: moc = no sitting (mặt mộc), nha = Kiểu thanh nhã, cauky = Kiểu cầu kỳ, dam = cầu kỳ with thick powder (makeup-lux: no thicker level — the bold presets top out at Khuynh thành, so dam reads as cầu kỳ; cake is kept as data only)
   est     sittings she imagines per way to weigh it (her own hand, toilNpcSk); each scored by the REAL judgement toilFx of today's hosts
   host    weight of each host's verdict (Thái hậu / Hoàng hậu / Hoàng thượng); emp × (1 + sungK × how far her Sủng is below sungRef)
   peer    what she expects from the consorts: tease (a Diêm dúa / Vụng về face) × (1 + her caution), envy (a showy or Khuynh thành look) × her vanity
   tr      per nết: v vanity (vainMk by result, vainOpt by way), m modesty (modOpt by way), c caution
   base/k  weight = max(wMin, base + k × utility) × mindW(art) for a made face; then mindPick (BAL.mind.slip: she misjudges sometimes)
   ans     her answer when mocked (the player's three: Xin lỗi / Cười trừ / Đáp lại via toilAns): base weight + per-nết weight */
Object.assign(BAL.ag,{toil2:{on:1,est:3,base:2,k:1,wMin:.2,
 opt:{moc:{moc:1},nha:{want:""},cauky:{want:"diem"},dam:{want:"diem",cake:1}},
 host:{thaihau:1,hoanghau:1,emp:1},sungRef:60,sungK:1,peer:{tease:-1.5,envy:.5},
 tr:{"Kiêu ngạo":{v:2},"Tham vọng":{v:1.5},"Khiêm nhường":{m:2},"Ân cần":{m:1.5},"Kín đáo":{c:1},"Xảo quyệt":{c:.5}},
 vainMk:{dep:1,tuyet:2},vainOpt:{cauky:1.5,dam:2.5},modOpt:{moc:2.5,nha:1},
 ans:{sorry:{b:1,tr:{"Khiêm nhường":2,"Ân cần":1.5}},smile:{b:2,tr:{"Kín đáo":1.5}},reply:{b:1,tr:{"Kiêu ngạo":2.5,"Tham vọng":1.5}}}}});
/* AG-ALL-2 part 2b (G7): Biếu người trong triều (j10 courtAct "thuong", the player's button, and an NPC's cx:tqGift — one function courtGive):
   gift = bạc paid, af = his favour gained. cx3.tq: an NPC weighs it as g Sủng-need points, scaled down as his favour nears cap; she keeps keep × the price */
/* Biếu (courtGive): bạc BAL.bacFee.court, regard BAL.eff.j10.meCourtAct (ONE CORE, merge r2) */Object.assign(BAL.ag,{cx3:{tq:{g:6,cap:60,keep:2}}});

/* AG-ALL-2 part 2b — G5 / G6 / G10 + jcmaid choices (jagstf2.js, j42 SRVA.poison / pil / leave + cnvOrdOpts / cnvBribeOpts / cnvFrameOpts,
   jmline mlPoisonDo / mlHitDo, jeitem eitPilOpts / eitPilJudge, jpromsv spLeaveOpts / spAsk, jcmaid cmSpyCh / cmLeakCh). One table for the maid
   player's cards and the NPC staff / masters' choices.
   base    weight floor of every option of a servant's dilemma (stf2Pick: base + valued outcome / BAL.ag.unit, × her nết on the option's tag)
   net     × by nết (servant quality code, qv) on an option tag: confess / social / bribe / flee / help / work
   accPen  Chủ tin / lòng an accuser loses when the framed one clears herself (the "Bị vu oan" card's Thanh minh; was typed in j42)
   poison  Bỏ độc vào bát cơm: cost = bạc for the poison, k = khắc; u = × her spite at the victim (NPC weight; caught odds = BAL.mline.poisonCatch)
   hit     k = khắc of the player consort's Bắt quỳ, vả miệng / Vu tội on another palace's maid (as Mua chuộc)
   pil     Lén giữ đồ Nội vụ phủ phát: k = khắc; sell = she sells the piece for its price × sell bạc (player and NPC); lauWk = weeks of Tân Giả khố
           when a spying maid player is caught and confesses under punishment
   pilW    an NPC master's weights on a caught pilferer (× her punish / reward nết, jagent agMW): pun / forgive / back / ignore; harsh = × pun for a
           Xảo quyệt / Kiêu ngạo / Thù dai / Kín đáo master
   leave   Xin chủ cho đi hầu cung khác: k = khắc; cd = months before the same servant asks again; u = NPC weight × her lòng gap under BAL.sp.leaveLoyal
   lvW     an NPC master's weights on a servant asking to leave (× reward / punish nết): keep / demote / let
   bribe   a bribed servant: take weighs as the bribe's odds (j29 bribeOdds); the rest splits tell × lòng/100 against quiet
   ord     a servant sent on a dishonourable deed: obey × lòng/100, refuse (+ loyalTr for a trung thành one), tell × (1 − lòng/100) × spy when she
           already spies for someone (old rule: a trung thành servant refused at 30 %, others never)
   cm      the close maid: "nghe" = talSpy × spy × lòng / talLoy; a leaked secret (debt / spy / family) = secOut × leak × (100 − lòng) / (100 − secTrust) */
Object.assign(BAL.ag,{stf2:{base:1,net:{confess:{trung:1.5,nhat:1.5},social:{lanh:1.5,chuyen:1.3},bribe:{tham:1.6},flee:{tham:1.4,lanh:1.3},help:{trung:1.8},work:{nhat:1.3},half:{lanh:1.4,nhat:1.2}},
 poison:{cost:10,k:1,u:1},accPen:15,hit:{k:2},pil:{k:1,sell:.5,lauWk:10},pilW:{pun:1,forgive:1,back:.4,ignore:.3,harsh:2.5},leave:{k:1,cd:6,u:.2},lvW:{keep:1,demote:1,let:1},
 bribe:{tell:1,quiet:.3},ord:{obey:1,refuse:.03,loyalTr:.35,tell:.03,spy:3,half:.2},cm:{spy:1,leak:1}}});
/* AG-ALL-2 part 2b — per-khắc event-driven re-decide (jagday agHeard / agTell / agRdTick; owner OD 17/11 ~15:25Z (2)):
   keep  × BAL.ag.routine = the weight of keeping her plan when news reaches her (against the deeds aimed at the one she heard of: their utility)
   tell  weight that a servant standing there tells her master (× her loyalty / 100 × the master's interest), quiet = keeping it to herself */
Object.assign(BAL.ag.kh2,{rd:{on:1,keep:.6,tell:2,quiet:1}});
/* AG-ALL-2d per-khắc chain + one shared clock (owner OD 17/11 ~15:45Z L1638, ~16:00Z L1641): see = khắc after seeing before a servant reacts (next khắc);
   go = khắc her trip to her master takes (he hears at the START of the khắc after); cap = most re-deciders per khắc (low-end phones; the rest wait a khắc);
   qMax = news queue kept in the save; sh = an NPC met by another NPC receives / declines (× hostility / BAL.ag.wit.hoD) — both spend the khắc when received */
Object.assign(BAL.ag.kh2.rd,{see:1,go:1,cap:6,qMax:40});Object.assign(BAL.ag.kh2,{sh:{on:1,rec:3,dec:1,kh:1}});/* sh.kh = the khắc a whole talk with one who came to her costs (owner: exactly one) */
/* AG-ALL-2b mg2 — NPC MINI-GAMES FAIR TO HER (owner OD 17/11 ~15:25Z (3): "lúc nào tôi có thì NPC cũng phải có … đổ xí ngầu cho nó … công bằng với tôi").
   ONE CORE jmgt mgNpcRaw(kind, p, o): an NPC's play = ONE draw on the board the player would get in that seat (mgTier: occasion, his/her rank, art level → gap d).
   on   switch (with agOn(); off = the old BAL.mgTier.npc paths)
   med  [gap d, median graded play of the skilled bot] — the measured rows Dễ (d −2) / Vừa (d 0) / Khó (d +2), pooled over the 20 measured kinds of
        dev/PROGRESS_mg-balance.md (+ r1 re-trim) and dev/PROGRESS_mg-balance-2.md (n = 30 per kind per row); linear between and beyond the points
   w    width of the draw round the median (mean of 3 uniforms × w: ±w/2, sd ≈ w/6; at d 0 it gives ≈ 25 % "Xuất sắc" (≥ 9) like the skilled bot)
   tat  her slap game (jslap) measured by ease (dev/PROGRESS_review-slap-mg-r2.md, skilled bot): e = board ease points, w = [nhẹ, vừa, nặng] % at each;
        an NPC's slap tier = one draw from it at the NPC's own board (mgTier "tat", her/his rank and Vũ); an NPC dodges a slap at BAL.slap.dodgeOdds[tier]
   study  1 = an NPC's lesson gains the player's points from one draw (lessonPts / tdPoints, j85 npcStudyDo); 0 = the old flat 1 / 2–3 */
/* dauho-lv5 medK[kind] = [gap, skilled-bot mean graded play] measured on that kind's OWN board (dev/measure/mg-bots.js, skilled, n = 300 per ease,
   report dev/handover/reports/dauho-lv5.md §3): jmgt mgMedD(d, kind) keeps med's level at gap 0 and moves by this row's shift, so NPC hands, her Thử tay base
   (mgCalBase) and her rolling hand (jmgid) shift with the board as it truly plays. dauho: e 4.8/3.2/1.6/0.8/0 = 9.70/9.64/9.61/9.56/9.08 (the shared rows would
   have cut every NPC 1.7–3.4 below a board that plays almost flat); ban (painted rings): ease 5 (gap ≤ 0) 6.60, e3.4 ≈ 6.10, e1.8 ≈ 5.93, e0.2 ≈ 5.42. */
Object.assign(BAL.ag,{mg2:{on:1,med:[[-2,8.9],[0,7.5],[2,5.8]],medK:{dauho:[[-2,9.7],[0,9.64],[2,9.61],[3,9.56],[4,9.08]],ban:[[-2,6.6],[0,6.6],[2,6.1],[4,5.93],[6,5.42]]},w:8,tat:{e:[0,2,5],w:[[32,54,15],[18,58,24],[2,50,49]]},study:1}});
/* AG-ALL-2d hand ceiling (owner OD 17/11 ~16:00Z L1640; jmgt mgHand) — FAIR SPREAD (owner OD 20/11 ~01:10Z: "đa số npc chơi dở hơn tôi, tôi thấy không
   fair" → "Duyệt cả 3 ý, làm luôn đi"): w = how far under her ceiling a play falls (mean of 3 draws; average play = hand − w/2);
   BELL CURVE (owner OD 20/11 ~06:40Z, verbatim: "ở ngoài đời mình có thật sự là mình sẽ gặp 1/3 những người mình gặp là sẽ là những người giỏi, hoặc là 1/3
        người mình gặp là những người bình thường, hoặc 1/3 người gặp là những người dở hay không á. Cái tỷ lệ này đã đúng hay chưa?" → MAIN ROOT-74 bell-curve
        proposal; OWNER OK OD ~07:15Z "Ok, làm theo mấy cái ý mà bạn nói ở trên đi"; overwrites the thirds of OD ~01:18Z): every NPC's average play in a kind
        (her hand − w/2) is one hashed draw of Normal(ctr, sd) (clamped ± zMax·sd; jmgt mgZ / mgHand, jmgcal mgCalBand) — the real adult population, NOT centred on her;
   ctr  = the average ADULT play on the fitted board, per kind (key = kind; "" = every kind not listed): 7 (OD ~07:20Z via MAIN: cal-p2 fits each board so the
          average adult scores ≈ 7);
   sd   = the spread of adult play per skill group (grp): c careful / strategy 1.4, a artistic 1.5, r reflex 1.7 (reaction / timing varies most between adults);
          "" = a kind in no group;
   eqZ  = the "about equal to her" band, ± eqZ·sd round HER calibrated play (BAL.ag.mg2.cal.k b) — only for reading her place: better / equal / worse FALL OUT
          of where her b sits on the curve (her at the top 15 % → ≈ 7 / 20 / 73 %, at the median → ≈ 37 / 33 / 30 %; jmgcal mgCalShare);
   zMax = the curve tails: a hand lies within ± zMax·sd of the centre (jmgt mgZ clamp, mgCalBand lo / hi);
   slapZ = the slap scale in sd: an NPC "tat" hand ± slapZ·sd from the centre lands the heavy blow least / most (jslap slapNpcDraw via mgCalBand far);
   grp  = the skill group of every mini-game kind (KG82_KIND): c fine hand, patience, memory, logic · a timing, taste, craft · r anticipation, aim, balance;
   art  = hand points per art level of that kind above / below the player's own level (a trained NPC clearly beats her, an untrained one is weak);
        UPBRINGING / palace shift of the curve per NPC (owner OD 20/11 ~01:50Z: "tiểu thư khuê các ngày xưa đã được học từ, nên vào cung đã giỏi mà, chỉ có nhà
        nghèo mới yếu"; OD ~02:05Z per-identity table): a person's art level for this lift (and her board) = max(her own, the start bậc of her identity
        (origin × road) in BAL.orig.art, jbal.js) (jmgt mgOrgLv); the bậc are tuned there.
        Rank gives NO skill: law 5 comes from her harder board as she climbs and from who she meets. */
BAL.ag.mg2.hand={on:1,w:4,art:.2,ctr:{"":7},sd:{c:1.4,a:1.5,r:1.7,"":1.5},eqZ:.43,zMax:3,slapZ:2,
 grp:{c:["co","tho","doi","doden","ve","theu","kim","kinh","may","hoadien","td_cong","td_hanh","le","tc","xa","thq"],a:["dan","hat","hoa","mua","banh","huong"],r:["dauho","ban","tat","ne","td_ngon","td_dung","chai","duho","den"]}};
/* AG-ALL-2d2 OWNER CALIBRATION (owner OD 17/11 ~16:20Z (f) + ~16:40Z option 1: "chỉ có tôi test và cái số của tôi dùng chung cho mọi người"; jmgcal):
   d  = the board gaps of the test rounds, easy → hard (one round each; 5 rounds, rising difficulty)
   k  = her calibrated base per mini-game kind {b: her graded play on a matching board, n: rounds, at: mm/dd/yyyy}, written from her «CTM-CAL …» code by
        dev/tools/mgcal_apply.py — ONE base for every player; it places HER on that kind's adult bell curve (BAL.ag.mg2.hand ctr / sd / eqZ above)
   A first try taken on a BROKEN board is dropped when that board is fixed, so her re-test is the first counted try (dauho cal-p2 b218d1d2; huong 4.5,
   mua 6.3, banh 6.1 dropped by review/cal-p2b-rv with the Điều hương / Múa / Nấu ăn fixes, owner OD 20/11 ~07:35Z «chỉnh mấy cái game bị lỗi lại thôi, rồi tôi test lại»; dauho-lv5 21/11: Bắn cung ban 9.1
   (11/19/2026, scored rings ~2× the painted target) dropped with the painted-ring fix; Đầu hồ dauho 9.7 (her 11/20 re-test) kept as base (its mouth zone ≈ the painted one) until
   her re-test on the painted-hole board; redo.dauho / redo.ban = that fix's go-live time) */
BAL.ag.mg2.cal={on:1,/* redo: games fixed after her Thử tay (owner 21/11, jmgcal stale()): her older record counts as not tried */redo:{dauho:"2026-11-21T02:30:00Z",ban:"2026-11-21T02:30:00Z",hoadien:"2026-11-20T15:00:00Z",den:"2026-11-20T15:00:00Z",chai:"2026-11-20T15:00:00Z",td_dung:"2026-11-20T15:00:00Z",huong:"2026-11-20T15:00:00Z",mua:"2026-11-20T15:00:00Z",banh:"2026-11-20T15:00:00Z"},d:[-2,-1,0,1,2],k:{dan:{b:8.3,n:5,at:"11/19/2026"},co:{b:9.7,n:5,at:"11/19/2026"},ve:{b:9.5,n:5,at:"11/19/2026"},doi:{b:9.1,n:5,at:"11/19/2026"},hoa:{b:7.9,n:5,at:"11/19/2026"},hat:{b:8.1,n:5,at:"11/19/2026"},tho:{b:8.7,n:5,at:"11/19/2026"},theu:{b:9.7,n:5,at:"11/19/2026"},kim:{b:7.7,n:5,at:"11/19/2026"},doden:{b:9.9,n:5,at:"11/19/2026"},tat:{b:4.9,n:5,at:"11/19/2026"},ne:{b:4.1,n:5,at:"11/19/2026"},td_cong:{b:10.0,n:5,at:"11/20/2026"},td_ngon:{b:6.7,n:5,at:"11/20/2026"},td_hanh:{b:9.3,n:5,at:"11/20/2026"},le:{b:9.9,n:5,at:"11/20/2026"},tc:{b:9.5,n:5,at:"11/20/2026"},xa:{b:9.5,n:5,at:"11/20/2026"},thq:{b:8.5,n:5,at:"11/20/2026"},duho:{b:7.9,n:5,at:"11/20/2026"},kinh:{b:9.9,n:5,at:"11/20/2026"},may:{b:10.0,n:5,at:"11/20/2026"},dauho:{b:9.7,n:5,at:"11/20/2026"},mua:{b:8.3,n:5,at:"11/20/2026"},hoadien:{b:8.9,n:5,at:"11/20/2026"},banh:{b:7.3,n:5,at:"11/20/2026"},chai:{b:8.7,n:5,at:"11/20/2026"},den:{b:9.3,n:5,at:"11/20/2026"}}};
/* CAL-P2C · IDENTITY OFFSET + ROLLING HAND b (owner OD 20/11 ~07:35Z + ~07:55Z + ~08:00Z, ROOT-74 chat; jmgid.js). Verbatim key words:
   ~07:35Z "Những cái môn sở trường của tôi á, khi vào game á, nếu như cái môn đó là cái môn bình thường là phải là ở mức 8, tức là phải automatic trừ 2. Còn nếu mà
   sở đoản là phải trừ thêm nữa ... sở đoản là phải đâu đó 6 điểm ... sở trường là chẳng hạn như là 9 điểm hoặc 10 điểm ... mình không có cần phải điều chỉnh cái điểm gì hết trơn á."
   ~07:55Z "chính những cái lần mà họ chơi sẽ là những cái bài test với họ ... Qua mỗi một cái màn chơi nó cũng chính là những cái lần test tay của họ."
   ~08:00Z "dù mà tôi có chơi 2 người, chơi 5 người, 10 người đi chăng nữa thì tất cả là đều dựa theo cái tay của cái người đó, chứ không phải là dựa theo cái tay của tôi".
   on    1 = on; 0 = every result is the graded play as before (no offset, no b kept)
   tgt   the level each identity class plays at, on a matching board: tr = sở trường (an art of her identity's BAL.orig.art row), "" = bình thường, doan = sở đoản
         (BAL.orig.doan, jbal.js). trAt = the least bậc in the row that makes an art a sở trường.
   HAND b per player per kind (S.mgB[kind] = {s, w, n}, saved with her; old saves start empty): b = s / w, a weighted mean of her plays brought back to a matching
         board (graded − (mgMedD(d) − mgMedD(0)), the same shift jmgcal mgCalBase uses), newest weight 1, each older play × (1 − a);
         prior = the default hand of a kind never played, worth pw plays (b = (pw·prior + Σw·x) / (pw + Σw)); age 1 = the prior ages like the oldest plays (so after many
         plays b is her recent play), 0 = the prior keeps its full weight pw for ever.
         SEED (her Thử tay, "first tries seed her b"): on the owner's device (jmgcal owner flag) a kind's first use adds BAL.ag.mg2.cal.k[kind].b worth seedW plays per
         round taken (n); noSeed = kinds whose first try was on a broken board (owner OD 20/11: NOT COUNTED) — they start from the prior only.
   OFFSET = tgt[class] − b (+ gap·(b − prior)), added to the graded result, clamp lo..hi, rounded. gap = the share of a player's real skill gap kept (OPEN, owner answer
         pending: default 0, do not build on it). Study bậc keeps its board ease (mgTier); the offset sits on top of it.
   npc   1 = an NPC's mini-game play (jmgt mgNpcRaw) moves by the same identity class shift tgt[class] − tgt[""] (law 1; her own hand curve, mg-fair-ratio, unchanged);
         the player's skip / odds roll (mgSkipRaw, mgNpcRaw on her) = the same shift on her median play. */
BAL.orig.id={on:1,tgt:{tr:9,"":7.5,doan:6},trAt:1,prior:7.5,pw:3,a:.2,age:1,seedW:1,noSeed:["dauho","td_dung","chai","den","hoadien"],gap:0,npc:1,lo:0,hi:10};
/* j71 odds words under mg2: the same draw (mgNpcRaw, seeded by the plan) for every entrant, her included, on this contest's board (j71 mgX7) */
(function(){if(typeof cOdds7!=="function"||typeof fxOdds7!=="function")return;const c0=cOdds7,f0=fxOdds7;
 const win=(E,base,kindAt,mi,r)=>{let w=0;const N=500;for(let t=0;t<N;t++){let b=-1,bi=-1;for(let i=0;i<E.length;i++){const x=base[i]+mgNpcRaw(kindAt(i),E[i],{rnd:r})/10*J71.luck;if(x>b){b=x;bi=i}}if(bi===mi)w++}return oddsCl(Math.round(100*w/N))};
 cOdds7=function(kind,E,prep,meB,seed){if(!mg2On())return c0.apply(this,arguments);const mi=E.indexOf(S);if(mi<0)return 0;const f=SC7[kind].f;
  const base=E.map(p=>f(p)+(prep.includes(p.id)?J71.prep:0));base[mi]+=meB;return win(E,base,()=>kind,mi,rng7(seed))};
 fxOdds7=function(F,art,meB,seed){if(!mg2On())return f0.apply(this,arguments);const E=[S].concat(liveRivals(true).filter(present7));const K=E.map(p=>p===S?art:fxBest7(p,F.arts));
  const base=E.map((p,i)=>p===S?SC7[art].f(S)+meB:SC7[K[i]].f(p));return win(E,base,i=>K[i],0,rng7(seed))};
})();
/* WORLD EVENTS (jworld, review/world-events; owner OD:L1587 rule 4 + OD 17/11 13:48Z): ONE core for every world window. Units: len/cd in
   tuần (3 a month, 36 a year); p = chance in whole points (roll); place/act = multipliers on the place weights (day plan / placeWhere) and on
   the jmind TAG weights (mindW) of every NPC while the window is open (0 = closed place); srvAct = the same for servants (maids, eunuchs).
   maxOpen = windows open at once (Quốc tang always opens); force = duty slots for AG-ALL's day plan ({b: buổi, -1 any; pl: place, "$" = the
   window's place; deed; why; g: groups; first: first tuần only; rank: from this rank}); no Dư đồ "!" (owner OD 17/11 ~14:30Z);
   pull = chance points per point of place multiplier above 1 that an NPC goes to the window's place (fallback until AG-ALL's day plan reads
   worldPlanW: window.WORLD_PLAN_HOOKED). */
BAL.world={on:1,maxOpen:2,pull:18,pullMax:80,
 tang:{len:{th:9,queen:9,heir:3},noNight:{th:3,queen:2,heir:1},mood:2,place:{tn:2.5,kn:2,vuon:0},act:{art:.3,social:.6,greet:1.6,harm:.7,scheme:.8},srvAct:{work:1.3},rite:{duc:2,th:3,suc:8},obey:[70,90],force:[{b:0,pl:"$",deed:"pray",why:"Túc trực linh cữu",g:["consort","queen"],first:1}]},
 away:{len:{te:1,san:2,tuan:4,chinh:5},fol:{te:0,san:2,tuan:3,chinh:0},folSung:3,stayDanh:-1,
  te:{every:3,month:11},san:{month:9,p:50,bien:45,age:62,folSung:50},tuan:{month:3,p:25,kho:55,bien:50,gapY:5,age:65},chinh:{p:40,bien:35,age:58,gapY:3,win:[35,3,3],winClamp:[10,92],winBien:20,loseBien:-10},
  place:{vuon:1.3,kn:1.3},act:{scheme:1.5,frame:1.4,harm:1.2,spy:1.3,greet:1.2},srvAct:{work:.8}},
 tuyen:{every:3,n:[2,2],rankMax:1,age:[16,4],sungThin:2,newNight:1.5,newSung:10,ghenDiv:50,welcomeAff:10,ambushRel:-10,cd:24,place:{kn:1.5,vuon:1.2},act:{harm:1.4,scheme:1.3,social:1.2,help:.9},giftBac:20,giftAff:12},
 hoa:{spread:[12,3],storm:6,nb:25,mood:2,len:2,cd:72,helpBac:20,helpAff:15,helpDuc:2,place:{nvp:1.5},act:{help:1.4,frame:1.3},srvAct:{work:1.6},force:[{b:-1,pl:"$",deed:"routine",why:"Chữa cháy, dọn dẹp",g:["srv"],first:1}]},
 dis:{kho:32,len:3,cd:36,payCut:.2,give:30,giveDanh:3,giveTh:3,stingyBac:200,stingyDanh:-2,npcW:{base:.3,cap:2,per:100,keep:.8},thrift:{duc:1},mood:2,place:{vuon:.5,cnh:1.6},act:{help:1.5,bribe:1.3,art:.6,social:.8}},
 dich:{kho:30,p:35,after:6,len:3,cd:72,mood:2,poorW:.2,ill:"kietly",catch:6,safeMul:.4,safeBac:15,place:{vuon:.3,tyv:2.5},act:{social:.4,help:1.3,flee:1.8,greet:.7},srvAct:{work:1.3}},
 su:{bien:60,len:1,cd:36,rank:3,mood:0,show:[30,2],showSung:4,showDanh:2,failDanh:-2,place:{thu:2},act:{court:1.5,art:1.4,social:1.3},force:[{b:1,pl:"thu",deed:"routine",why:"Dự yến tiếp sứ",g:["consort","queen"],rank:3}]},
 tho:{emp:[40,10],th:[60,10],len:1,kho:6,mood:0,big:60,mid:20,sungBig:5,sungMid:2,thBig:5,make:[35,2],makeSuc:10,npcGift:.15,npcSung:[1,4],place:{thu:2,tn:1.5},act:{art:1.5,social:1.3,greet:1.3},force:[{b:1,pl:"$",deed:"gift",why:"Dự yến mừng thọ",g:["consort","queen"]}]},
 sao:{p:1.2,len:1,cd:36,mood:2,place:{cnh:1.8},act:{greet:1.4,scheme:1.3,art:.6}},
 xa:{minM:3,npcP:60,kho:5,len:1,cd:36,afterDis:50,act:{help:1.3,harm:.6}},
 /* ---- batch 2 (jworld2, dev/research/world-events-2.md §3; Địa chấn #9 PARKED: no repair-debt state) ----
    day đầy tháng (a real birth; opens `delay` tuần after it) · lap lập Thái tử (S.heir set) · hau lập / phế hậu (the queen seat changes) ·
    thb Thái hậu bệnh nặng (S.thIll stage >= st) · thi khoa thi (every `every` years, off = year mod) · vuong phiên vương (a living Vương gia) ·
    ret đại hàn (heavy snow in `run` of the last run+1 tuần) · trung châu chấu (a failed flood/drought relief that left Kho lúa between dis.kho and kho) ·
    vuco vu cổ (a real bùa frame found while someone of the Emperor's house is ill) · cam giới nghiêm (after a vu cổ / ngoại thích verdict,
    or Biên cương < bien after a lost battle) · trom trộm ngự khố (year-end audit + a real greedy servant) · phong phóng cung nhân (maids at
    BAL.srvAge.ask (rk < BAL.srvRk.cs), at least `min` in her + the living NPC households, spring at `p` odds) · hon công chúa xuất giá (a real daughter's wedding) · ngoai ngoại thích (a house >= pow
    while the Emperor is young / ill or it is the queen's house) · phat Phật đản (yearly; big = đại trai đàn in a disaster) · benh long thể
    bất an (S.emp.ill stage >= st) · tinh tỉnh thân (yearly after Tết). Pair numbers [a,b] in odds = base + stat / b. */
 day:{npcW:{give:[1.2,.6],cold:[1.5,.3],skip:.4},coldOan:30,delay:3,len:1,kho:[3,1],mDanh:[3,1],mSung:[3,1],npcGift:.08,big:40,mid:15,bigAff:12,midAff:5,skipOan:8,coldGhen:60,feastBac:60,feastDanh:3,plainDuc:1,place:{tn:1.3},act:{social:1.3,greet:1.3,harm:1.2},force:[{b:1,pl:"$",deed:"gift",why:"Dự yến đầy tháng",g:["consort","queen"]}]},
 lap:{len:1,pow:8,npcGift:.1,sonHarm:[1.5,.4],xaP:40,gift:30,giftAff:10,place:{thu:1.5},act:{scheme:1.4,frame:1.3,ally:1.3,greet:1.3}},
 hau:{len:1,rise:10,fall:-15,gift:30,giftAff:12,place:{kn:2},act:{ally:1.5,social:1.3,greet:1.4}},
 thb:{st:2,len:3,cd:18,npcW:{suc:40,weak:.3,no:.6},nightMul:.5,mood:1,qDanh:2,nurse:{suc:12,o:[40,8],th:8},pray:{suc:4,duc:1,th:3},med:{bac:25,th:4},npcTh:[5,2],place:{tn:1.8,cnh:1.4},act:{pray:1.6,social:.8,greet:1.3,scheme:1.2},force:[{b:0,pl:"tn",deed:"routine",why:"Phiên hầu bệnh Thái hậu",g:["consort","queen"],rank:2}]},
 thi:{every:3,off:1,dflt:40,hanlam:30,month:3,len:1,pow:[6,2],danh:2,letter:{bac:30,o:[35,5],pow:5},place:{thu:1.4},act:{court:1.4,art:1.2,social:1.1}},
 vuong:{every:3,off:2,month:10,len:1,bien:40,mood:2,sungDiv:100,meet:{o:[45,4],tinh:8,danh:-4},gossip:30,place:{tn:1.5,vuon:1.3},act:{social:1.3,spy:1.3,ally:1.2}},
 ret:{run:2,cd:54,len:2,phongP:25,rank:2,suc:6,maidCatch:5,maidSuc:60,ill:"phonghan",catch:10,lcCatch:25,share:{bac:40,duc:2,danh:2},buy:{bac:20},cold:{suc:8},place:{vuon:.3},act:{help:1.3,social:.7,greet:.8},srvAct:{work:1.2}},
 trung:{kho:50,xaP:25,m0:5,m1:9,len:3,cd:36,khoCut:6,payCut:.1,mood:1,give:20,giveDanh:2,giveTh:2,thrift:{duc:1},place:{cnh:1.4},act:{help:1.3,bribe:1.2}},
 vuco:{len:2,cd:72,kidHp:40,spyFind:50,catch:25,schemeK:4,accuseK:30,innocent:30,payCut:.15,toCam:50,open:{duc:2},clean:{bac:30,mul:.3},accuse:{danh:3,miss:-4},act:{scheme:.6,frame:.5,warn:1.6,spy:1.4},place:{vuon:.5}},
 cam:{len:2,cd:36,bien:25,closed:["vuon","cnh","thu"],place:{vuon:0,cnh:0,thu:0},act:{scheme:1.3,spy:.7,social:.6},srvAct:{work:.8}},
 trom:{month:12,t:1,p:25,len:2,cd:72,catch:40,payCut:.1,scape:30,scapeDanh:-5,bribe:{bac:40,duc:-2},self:{duc:2},phongP:40,act:{spy:1.3,bribe:1.4,frame:1.2}},
 phong:{month:2,p:70,min:2,len:1,cd:24,gift:{bac:10,duc:1},keep:{bac:40},npcKeep:40,act:{social:1.1}},
 hon:{len:1,kho:4,mDanh:3,gift:25,giftAff:10,npcAff:5,npcGift:.06,place:{tn:1.4},act:{social:1.3,greet:1.2}},
 ngoai:{pow:85,young:30,illSt:2,keepPow:-10,cd:72,len:2,purge:[50,25],fall:-30,rise:5,sung:-8,danh:-5,mood:3,toCam:60,advise:{o:[40,5],pow:-10},act:{ally:1.4,scheme:1.3,warn:1.3,social:.8}},
 phat:{month:4,t:1,len:1,cd:24,afterP:50,endDis:50,big:{bac:40,th:5},sutra:{suc:8,duc:2,th:2},npcGive:.1,npcTh:3,place:{cnh:2,tn:1.3},act:{pray:2,social:1.2,scheme:.8},force:[{b:0,pl:"cnh",deed:"pray",why:"Lễ Phật",g:["consort","queen"]}]},
 benh:{st:2,len:3,cd:18,mood:2,nurse:{suc:12,o:[45,6],sung:4},gin:{bac:30,sung:2},pray:{duc:2},npcSung:[3,1],place:{dtd:1.6,cnh:1.3},act:{social:1.2,greet:1.4,scheme:1.4,pray:1.5,art:.5},force:[{b:2,pl:"dtd",deed:"routine",why:"Hầu thuốc Hoàng thượng",g:["consort","queen"],rank:3}]},
 tinh:{month:1,t:2,len:1,cd:24,bacK:.4,base:20,showPow:70,showDanh:1,ask:{o:[35,5],danh:3},act:{social:1.3,scheme:1.2,bribe:1.2}}};
/* ---- review/one-core-jkc-2: BAL.odb (one-core-odb-move.js) ---- */
/* BAL.odb.<module>.<site> = the odds base N of od(N…) (key od<Site>) / roll(N±…) (key rb<Site>) the module rolls (the guard's odb kind);
   site = the enclosing function / option key / act id (_2, _3 … for the next ones in it); the same call text (a preview word(od(N+x)) and the
   roll(od(N+x)) of its handler) reads one key. Moved from inline literals, values unchanged. */
Object.assign(BAL,{odb:{
 j10:{rbCourtAct:40},
 j13:{rbIllMonthP:30,rbIllMonthP_2:35},
 j14:{odO:10,odO_2:15,odO_3:35,odO_4:10,odO_5:15,odO_6:70},
 j2:{odO:35,odO_2:55,odO_3:42,odO_4:50,odO_5:80,odO_6:75,odO_7:40,odO_8:85,odO_9:92,odO_10:50,odO_11:70,odGoTo:40,odO_12:55,odO_13:45,odO_14:30,odO_15:35,odO_16:40,odO_17:45,odO_18:40,odO_19:70,odO_20:45,odO_21:45,odO_22:50,odO_23:40},
 j20:{odO:65},
 j21:{odO:50,odO_2:40},
 j22:{odO:55,odO_2:60,odO_3:55,odO_4:70},
 j24:{odO:35,rbKnown:15},
 j25:{odKidActs:70},
 j28:{rbSeen:25},
 j3:{odO:30},
 j31:{odX:40,odX_2:35,odX_3:40,odX_4:35,odX_5:40,odX_6:35,odX_7:30},
 j34:{rbI:40},
 j4:{odO:25,odO_2:40,odO_3:65,odO_4:45,odO_5:50,odO_6:35,odMonth:30,odO_7:55,odO_8:70,odO_9:40,odO_10:45,odO_11:40,odO1:30,odO2:60,odO_12:35,odO_13:45},
 j40:{rbMindBelief:30},
 j42:{frTcDiv:2,frDucDiv:5,odSrvTalk:45,odSrvTalk_2:40,odSrvTalk_3:30,odSrvTalk_4:30,odSrvTalk_5:55,odSrvTalk_6:55,odSrvTalk_7:40,odSrvErrandDone:30,odO:70,odO_2:20,odO_3:50,odO_4:60,odO_5:55,odO_6:75,odO_7:70,rbSrvMonth:1.2,rbSrvMonth_2:2,odO_8:40,odO_9:30,odO_10:40,odO_11:30,odOf:30,odTop:55,odTop_2:60,odTop_3:45,odTop_4:45,rbTop:1.5,rbTop_2:2,rlSrvBuy:1.5,rlSrvMonth:60,rlSrvDoOrder:50,rlSrvDoOrder_2:30,rlSrvSeen:50,rlSrvAffairCaught:35,rlSrvAffairCaught_2:50,rlSrvAffairCaught_3:40,rlTop:40,rlSrvBlack:12,rlSrvPrince:6,rlMaidLoveMonth:25,rlMaidLoveMonth_2:4,rlT:30,rlMaidLoveMonth_3:35,rlMaidLoveMonth_4:3,rlTop_2:30},
 j43:{rbTop:30},
 j54:{odO:30,odO2:55,odO_2:40},
 j55:{rbCorrupt:25,rbDadT:25,odO:15},
 j61:{odO:45},
 j68e:{odP:40,odP_2:55,odP_3:35,odP_4:45,odP_5:46,odP_6:30,odP_7:35,odP_8:25,odP_9:35,odP_10:40,odP_11:30,odP_12:30,odP_13:45,odP_14:35,odP_15:40,odP_16:35,odP_17:35,odP_18:40,odP_19:30,odP_20:40,odP_21:35,odP_22:30,odP_23:45,odP_24:25,odP_25:40,odP_26:25,odP_27:30,odP_28:55,odP_29:70,odP_30:30},
 j68f:{odP:35,odP_2:40,odP_3:35,odP_4:40,odP_5:30,odP_6:40,odP_7:35,odP_8:40,odP_9:35,odP_10:35,odP_11:40,odP_12:30,odP_13:40,odP_14:45,odP_15:50,odP_16:45,odP_17:50,odP_18:35,odP_19:40,odP_20:40},
 j68g:{odP:30,odP_2:40,odP_3:40,odP_4:55,odP_5:40,odP_6:35,odP_7:40,odP_8:50,odP_9:55,odP_10:35,odP_11:30},
 j68h:{odP:40,odP_2:50,odP_3:35,odP_4:40,odP_5:40},
 j7:{odO:35,odX:50,odO_2:40,odO_3:40,odX_2:45,odO_4:50,odO_5:40,odO_6:40,odO_7:30,odO_8:40,odO_9:35,odO_10:35,odO_11:35,odO_12:35,odO_13:30,odO_14:30,odO_15:45,odO_16:40},
 j71:{odP:35,odP2:30,odP_2:30,odP_3:30,odP_4:40,odP_5:55,odP_6:40,odP_7:70,odP_8:25,odP_9:20,odP_10:20,odP_11:50,odP_12:30,odP_13:30,odP_14:40,odP_15:25,odP_16:30},

 j75:{odOP:40,rbFit:35,rbTop:10},
 j77:{odAccLeadO:35},
 j78:{odTop:40},/* odO: Kể tội reads odO_18 through P3C.tell (merge r2 M1) */
 j8:{rbInspect:40,rbSearch:35,odO1:30,odO3:40,odO1_2:45,odO2:30,rbSeenNPC:15,taintXa:35,taintFeelDiv:5,matInspect:6,matSearch:5}/* taint family (review/poison-road-r2-rv): xạ hương miscarriage roll on a held item, her "khó chịu" sense = Nhìn/taintFeelDiv, mưu kế × matInspect / matSearch on the inspect / search trace */,
 jact:{odO:35},
 jeitem:{rbEitReWk:100},
 jface:{rbOk:40,rbFxIllMonth:30,rbFxIllMonth_2:35,rbFxServMonth:2},
 jlost:{rbTop:40},
 jmen:{odOh:35,odO:35,odO_2:45},
 jpet:{rbGo:100},
 jroute:{odRtSeeO:80,odO:62,odO_2:55,odO_3:55,odO_4:55,odO_5:42,odO_6:85,odO_7:50,odO_8:35,odO_9:22,odO_10:14,odO_11:38,odOA:30,odO_12:35,odOT:55,odOB:45,odOM:40,odO_13:45,odO_14:50,odO_15:30,odOV:45,odOR:38,odRtMgO:62},
 jts:{rbSmart:40},
 jtsb:{odOr:30,odTd:38,odTc:34,odTsbMockO:44,leakO:35 /* Thu làm tai mắt: the turned servant also sells HER news (side chance) */},
 j95:{dcPrepTell:80,dcJ95drift:15,dcJ95week:15,dcJ95weekEye:12,dcJ95weekSpy:30,dcN:35,dcJ95week_2:15,dcC:70,dcJ95intent:40,dcJ95planTH:15,dcJ95watch:35,dcJ95watch_2:35,dcJ95caught:50,dcJ95npcCatch:35},
 j95b:{dcJ95bWeek:30},
 jkc:{rlMomAlive:60,rlKcGo:4,rlGo:40,rlGo_2:50,rlGo_3:40,rlKcMeet:35,rlKcVh:4,rlO:80,rlO_2:45,rlO_3:55,rlKcMeet_2:60,rlO_4:50,rlO_5:60,rlKcFest:50,rlKcElope:25,rlGianhan:55}
}});
/* AG-ALL-2b merge (ONE CORE): evidence a deed gives / clears where the player and NPC share one code path (j2 cx2 cards, j9 help, j10 servants,
   j42 dilemma builders, jcmaid, jpromsv, jeitem): one = 1 piece, two = 2 pieces (a Mật báo), all = clear every piece; rel = liking lost by a bribe told to the master */
Object.assign(BAL.ag,{ev:{judge:2,one:1,two:2,all:-99,get rel(){return -BAL.eff.j42.go}}});/* review ag-all-2 r2 M1: the evidence amounts read this one key (main's per-site ev keys that only fed these sites are gone); rel = main's j42.go */
/* AG-ALL-2e PARITY (jagacts3.js; report dev/handover/reports/ag-all-parity.md "2e"): the player's buttons that had no NPC side. Each card is built ONCE
   (P3C.<k>(p), used by her deck / talk card AND an NPC consort's cx3:<k> option); g = the needs the deed serves (agcU), as BAL.ag.cx2. on = 0 → no NPC option.
   dance  Múa trong yến tiệc (o + Sắc/sacD × mesac + múa lv × vu)   eyes Cài tai mắt   anthai An thai (buy) / Tự bào chế (self, Y ≥ y)
   tell   Kể tội {X} with the Thái hậu (o + evidence × ev + Thái hậu regard / thD; the target loses rel / sung)   treat Xin chữa bệnh (Thái y viện)
   staff  her own-staff buttons (j10 servDo): thuong bac; hoi af (a friend), dt (đối thực rumour odds); che danh; NPC master: below = lòng under which she acts
   use / sell (inventory Dùng / Bán), charity (j85 charityFx), restLat (Nghỉ ngơi một lát), tyGift (Biếu Thái y, courtGive), work (Tự học nghề: tác phẩm, wkMake) */
BAL.ag.par3={on:1,
 dance:{c:{"suc":-20,"bac":-10},get o(){return BAL.odb.j2.odO_3},sacD:2,mesac:1.3,vu:4,w:{"sung":12,"danh":6},l:{"danh":-6},g:{"sung":12,"danh":6}},
 eyes:{l:{"danh":-3},g:{"safe":2,"spite":1},max:6},/* 2f2: a real person (tmBest) at her own price (nv bribeCost) and tmOdds; no flat roll, no +2 */
 anthai:{self:{c:{"suc":-5},y:4},buy:{c:{"bac":-20},w:{"suc":10}},g:{"kid":3}},
 tell:{get o(){return BAL.odb.j2.odO_18},ev:10,thD:5,w:{"th":2,"duc":-2},l:{"th":-4},rel:15,sung:10,g:{"spite":4,"th":1}},
 treat:{c:{"bac":-30},g:{"rest":4}},
 staff:{thuong:{below:55},phat:{below:30},doi:{below:15},/* bạc / Danh: BAL.house.thuongBac / BAL.eff.j10.danhServAct (merge r2) */hoi:{af:20,dt:30},g:{"safe":2},gHoi:{"spite":2,"safe":1}},
 use:{sucBelow:60,g:{"rest":2}},sell:{bacBelow:40,g:{"bac":2}},
 cutRisk:30,cold:{friend:40,sonAge:8,beg:{bac:20,anD:2,sungD:4},out:{bac:10,dad:50,affD:3,facD:10,dadD:5},ev:{mat:6,tcD:5},poem:{an:30,anD:2,thi:8},son:{fondD:2},/* odds bases: BAL.odb.j14.odO…odO_6, evidence need: BAL.coldEvNeed (ONE CORE, merge r2) */
  sutra:{c:{"suc":-3},w:{"duc":3}},veg:{w:{"suc":6}},embro:{c:{"suc":-5},w:{"bac":10}},nunSuc:10,nunO:10,oanFree:20,
  /* cold-faction: a faction letter from lãnh cung (j14 coldActsOf, her card = an NPC's): road A the food eunuch (Bạc bac, odds base euO), road B her own kept maid (no bạc, odds base maidO + the maid's loyalty / loyD; caught → that maid loyalty − maidLoy). Law 2 (review): maid odds 30+70/2=65 at BAL.loy.trust … 80 at loyalty 100 = never above the eunuch's 80, so the free road pays in odds + the maid's risk, the eunuch road in bạc */
  lt:{bac:12,euO:80,maidO:30,loyD:2,maidLoy:15},gFree:{"sung":30},gStay:{"duc":1,"rest":1,"bac":1}},charity:{g:{"duc":3,"danh":2}},restLat:{sucBelow:50,g:{"rest":2}},tyGift:{g:{"spite":1,"safe":1}},work:{g:{"danh":2,"ally":1}},
 /* 2e part 3 (AG-ALL-2e2): NPC↔NPC talk topics (P3T) — worth = the liking she would win from the listener */
 talk:{health:{"ally":1},praise:{"ally":1.5},secret:{"ally":2},gossip:{"ally":1.5,"spite":1},invoke:{"ally":2}},
 /* household: Nghiệm độc (her button + NPC; bạc, odds bonus over oSee), Thêm cung nữ / thái giám (bạc), Tiến cử (công lao), Tâm sự / Tra xét / Dọa tố worth */
 test:{o:25,g:{"safe":2}},hire:{g:{"safe":1,"danh":1}},/* bạc: BAL.bacFee.itTest / BAL.house.hireBac (ONE CORE, merge r2) */house:{merit:5,tamBelow:50,upLoyal:70,gTam:{"safe":1},gUp:{"danh":3,"safe":1},gSearch:{"safe":3},gThreat:{"spite":2,"safe":1}},
 /* phe phái (j10 facAct for her, cx3:fac* for an NPC): khắc of her button; friend bar to found; worth per deed */
 fac:{k:2,frAff:35,clanAff:15,sharedOan:30,foeOan:25,gFound:{"ally":3},gJoin:{"ally":2,"safe":1},gLeave:{"safe":1},gSell:{"hh":1,"safe":1},gDiv:{"spite":3},gDivTc:3,
  /* cold-faction: Bán đứng numbers (j10 sellOut, her button + NPC + her lãnh cung letter): Danh / Sủng to the seller, oán of each member named, the Emperor's accuse gift chance, punish chance with no Hoàng hậu */
  sell:{danh:5,sung:3,oan:40,emp:40,pun:40},
  /* cold-faction: a leader strikes a member who is in lãnh cung off the roll (j10 facDrop: her button + NPC leader in facMonth): NPC leader drops when liking < aff, chance p a month; the one dropped oán + oan; the leader Danh + BAL.rcv.prop.danh (keeps clear of a phế phi) */
  drop:{aff:20,p:15,oan:15},
  leave:{rel:10}},/* cold-faction: Rời phe — each member quý the one who leaves − rel (j10 leaveFac; was a typed 10) */
 /* Uống thuốc thúc sinh (P3C.drug): worth = the book-mismatch danger she escapes */
 drug:{g:{"safe":4,"kid":2}},
 /* 2e3: Mời đến cung ta (cx3:invite, worth = the liking she would win), Phòng bị (cx3:def_<order>, worth per order; spite bar for the theo dõi target) */
 invite:{g:{"ally":2},minAff:20},petBuy:{g:{"danh":1,"safe":1},keep:40},petcare:{g:{"ally":2}},teach:{g:{"kid":2}},
 /* 2e3 toilette answers of an NPC (jtoilr toilRx*: Ghi hận / Mách Hoàng hậu after a slight, Cảm tạ / Tặng lại after praise, Hỏi bí quyết): weight b + traits, picked by mindPick with Xin lỗi / Cười trừ / Đáp lại */
 /* 2e3 an NPC maid summoned (jagmaid amNight): Tắm gội chờ giá vs Cáo bệnh — weights: go = b + rise (a seat free), decline = b + her master's jealousy odds (amJealP) / jD, × nết */
 sum:{go:{b:3,rise:3},no:{b:.3,jD:40,tr:{"Kín đáo":.5,"Khiêm nhường":.4}}},
 toil:{ans:{grudge:{b:.6,tr:{"Kiêu ngạo":1,"Xảo quyệt":1.5,"Tham vọng":.8}},tell:{b:.4,tr:{"Tham vọng":1,"Xảo quyệt":.8}}},praise:{thank:{b:2,tr:{"Kín đáo":1,"Kiêu ngạo":1}},give:{b:1,tr:{"Ân cần":1.5,"Khiêm nhường":1}}},ask:{ask:{b:1,tr:{"Khiêm nhường":1.5,"Ân cần":1}},no:{b:1.5,tr:{"Kiêu ngạo":2,"Tham vọng":1}}}},def:{g:{canh:{"safe":2},thudoc:{"safe":3},theodoi:{"safe":2,"spite":1},giuchung:{"safe":1.5}},foe:20}};
/* Chia sẻ bí mật (P3T.secret, her talk and NPC↔NPC): a listener with malice above secretMal may keep it against the speaker, odds secretGrab */
/* Mời đến cung ta (j21 inviteO, her button and an NPC host): odds = base + guest's liking of the host / affD + rank gap × rk; below hate the button says she will not come */
/* Phòng bị · Thử độc đồ ăn (j70, her order and an NPC's): odds the taster tastes first, odds the taster dies of it */
/* Dạy con học chữ / lễ nghi (j53 ktAct, her deck card and an NPC mother cx3:teach*): Sức and khắc of one lesson */
/* 2e4 the maid's dilemmas, ONE builder for her card and an NPC maid (j42 cnvScoldOpts / cnvFestOpts / cnvBlackOpts / cnvAffOpts): scold = Cúi đầu (fx), Khóc lóc (odds o + Sắc/sacD, ± tin), Cãi lại (Danh, Chủ tin −tin, odds kneel of Sức −suc);
   fest = Rót rượu (odds o + Sắc/sacD + Tài/taiD; his regard +nt, fail Chủ tin −tin), Đứng sau (tin); black = Đút bạc (pay), Mặc kệ (odds the threatener keeps quiet), caught (NPC đối thực told: lòng −tin, odds tgk);
   aff = Dọa tố (odds o + Tâm cơ/tcD, Bạc, fail: odds lau of Tân Giả khố lauW tuần), Bẩm chủ (Chủ tin), w = worth weights of an NPC maid's pick */
BAL.ag.par3.cnv={scold:{humble:{tin:1,duc:1},beg:{get o(){return BAL.odb.j42.odO_8},sacD:3,get tin(){return BAL.eff.j42.tinGo},get tinL(){return BAL.eff.j42.tinGo_2}},talk:{danh:2,tin:8,kneel:40,get suc(){return -BAL.eff.j42.sucGo}}},fest:{pour:{get o(){return BAL.odb.j42.odO_11},sacD:3,taiD:10,nt:12,get tin(){return -BAL.eff.j42.tinGo_7}},stand:{tin:3}},
 black:{pay:20,ignore:{o:40},caught:{tin:10,tgk:30}},aff:{threat:{get o(){return BAL.odb.j42.odTop_4},tcD:3,get bac(){return BAL.eff.j42.bacTop},lau:35,lauW:8},tell:{get tin(){return BAL.eff.j42.tinTop}}}};
/* 2e4: Đánh đàn chờ ngự giá (qinCard, her garden pop-up and NPC cx3:qin): odds o + Tài/taiD + cầm × cam (× tt with Trống tài) + like when she knows his music; Sủng w / wLike, fail −l; Sức suc; NPC needs cầm ≥ minCam
   study: an NPC lesson (j85 npcStudyDo) — pays a teacher only keeping keep bạc; teacher / self weights for mindPick */
Object.assign(BAL.ag.par3,{qin:{get o(){return BAL.odb.jact.odO},taiD:3,cam:4,tt:2,like:15,w:7,wLike:9,get l(){return -BAL.eff.jact.sungGo},suc:10,minCam:1,g:{"sung":2}},study:{keep:40,teach:1,self:1}});
BAL.ag.cx2.maidTalk.hear=15;
BAL.kidTeach={get suc(){return BAL.sucNeed.kid},k:2,age:3};
BAL.def70={taste:30,die:40,caught:12,ev:30};/* + Theo dõi một người, monthly: odds the watcher is caught / brings evidence */
BAL.invite={affD:2,rk:5,hate:-30};/* odds base: BAL.odb.j21.odO_2 (ONE CORE, merge r2) */
/* HOST-ABSENT RULE (owner OD L1976, 19/11 ~22:00Z; jptime §4b): the guest reached the host's place and the host is away. She waits the arrival khắc;
   from the next khắc, once per khắc while the host is still away, she stays with odds o + liking/affD + (host rank − guest rank)×rk + her nết (net: Tính tình /
   Chí hướng patience), capped by od(). A guest who leaves: relation host↔guest loss (small, like a refused invitation's BAL.eff.j21.top). */
BAL.invite.wait={o:55,affD:3,rk:4,net:{"Nóng nảy":-20,"Lạnh lùng":-10,"Tham vọng":-5,"Điềm tĩnh":15,"Ân cần":10,"An phận":10,"Kín đáo":5},loss:-2};
BAL.talk.secretMal=50;BAL.talk.secretGrab=50;
/* AG-ALL-2f r2 — TAI MẮT MUST BE EARNED (owner OD 17/11 ~16:50Z): becoming someone's Tai mắt is the PERSON's choice (jagknow tmOdds = bribeOdds + what
   she wants from the recruiter; loyal servants mostly refuse and may tell their master). want = bonus when the recruiter can give it: bac (a greedy one,
   recruiter can pay her price), protect (badly treated: lòng < BAL.loy.low, recruiter outranks her master), post (low post srk < post, recruiter outranks),
   revenge (holds a grudge and the recruiter is at odds with her master). loyalMul = the odds × this for a servant at lòng ≥ BAL.loy.top. tell = % a refusing
   servant at lòng ≥ BAL.loy.mid reports the attempt to her master (oan = the master's regard lost toward the recruiter). cap = most Tai mắt one can hold. */
BAL.ag.know.tm={cap:10,want:{bac:15,protect:15,post:10,revenge:20},post:3,loyalMul:.35,tell:50,oan:6,
 /* 2f2: threat = fear bonus on tmOdds for Dọa tố (threatServ); vol = the j7 volunteer comes only when her odds for him reach min, she pays bac */
 threat:20,vol:{min:55,bac:30}};
/* AG-MOODKNOW (owner OD 17/11 ~17:55Z (1)): who knows the CAUSE of a mood (jmoodknow). pub = morning "Tin trong cung" leak odds per cause event
   (def for others; clamped BAL.odds.lo/hi; max lines a morning); pubEv = PUBLIC cause events (jemo EMO_EV keys), the rest SECRET; pubRe = PUBLIC cause
   words for causes set without an event key (old saves too); spy = a Tai mắt inside that person's household learns it; eye = % of oSee for the
   morning general eyes; pri = j78 "mood" fact priority (scouting / servants' reports); keep = causes remembered per person; npcErr = an NPC master
   learns the target's cause from a told errand (scout / listen). */
BAL.mck={pub:{def:35,max:3,o:{selfUp:60,selfDown:60,cold:75,kidBorn:75,kidDie:70,otherKid:30,punished:50,night:30,neglect:25,ill:30,rivalUp:25,friendUp:25,
 foeDown:25,friendDie:50,foeDie:40,mistressUp:15,mistressDown:15,motherDie:60,motherCold:50,clanUp:35,clanDown:35}},
 pubEv:["selfUp","selfDown","rivalUp","friendUp","foeDown","kidBorn","kidDie","otherKid","punished","cold","night","neglect","ill","friendDie","foeDie",
  "mistressUp","mistressDown","motherDie","motherCold","clanUp","clanDown"],
 pubRe:"thế ở triều|việc triều|hoàng tự|tấn phong|lãnh cung|giáng|qua đời|cấm túc|phật ý|lọt ra ngoài|sinh hạ|lật thẻ|thị tẩm",
 spy:85,eye:40,pri:45,keep:6,npcErr:{scout:100,listen:50}};
BAL.ag.sell.val.mood=70;
/* AG-MOODKNOW KHÓC + HỜN (owner OD 17/11 ~18:00Z): two more jemo moods. khoc: from events ev when buồn/đau khổ/sợ ≥ v, odds o + trait points tr; a slap:
   odds slap[sev], strength slapV[sev]. hon: from events ev aimed by someone close (thiện cảm ≥ aff, own master, Hoàng thượng), odds o + tr. (timers: BAL.mood2.dur.k);
   w = act weights (jemo EMO_W shape), od = odds points at v 100, loy = servants' Lòng a month, lv = old mood ladder level (0 vui … 3 giận). Odds clamped BAL.odds. */
BAL.emo2={khoc:{ev:["slight","punished","selfDown","cold","kidDie","friendDie","motherDie","motherCold","loyalDown","neglect"],v:45,o:40,
  tr:{"Khiêm nhường":15,"Ân cần":10,"Mê tín":5,"Kiêu ngạo":-30,"Kín đáo":-20,"Xảo quyệt":-20,"Tham vọng":-15,"Thù dai":-10,nhat:20,trung:5,lanh:-10},
  slap:[0,35,55,75],slapV:[0,40,60,80]},
 hon:{ev:["slight","loyalDown","punished","neglect"],aff:30,o:35,
  tr:{"Kiêu ngạo":15,"Nóng nảy":15,"Thật thà":10,"Ân cần":-15,"Khiêm nhường":-15,"Xảo quyệt":-20,"Kín đáo":-10,lanh:10,nhat:-10}},
 w:{khoc:{harm:.6,kind:.7,idle:1.5,visit:.6},hon:{harm:.9,kind:.6,visit:.5,idle:1.2}},od:{khoc:-1,hon:0},loy:{khoc:-1,hon:-2},lv:{khoc:2,hon:2}};
BAL.mck.pubEv.push("slap");BAL.mck.pub.o.slap=55;BAL.mck.pubRe+="|tát";
/* AG-MOODKNOW THE SIMS MODEL (owner OD 17/11 ~18:10Z): every mood cause has a timer in KHẮC (a day ≈ 16 khắc). dur.e = by cause event (jemo EMO_EV keys
   + slap), dur.k = by feeling when no event, dur.bar = her bar pushes by kind (ok / fail acts, rest, comfort, w: = the day's needs / people / weather,
   e: = a feeling's push, ea: = venting acts), def = any other; max = causes kept per person; carry = khắc the old-save leftover lasts; kd = khắc a day fallback. */
BAL.mood2={def:8,max:16,carry:24,kd:16,carryWhy:"chuyện cũ còn vương",
 dur:{e:{slight:8,gift:6,loyalUp:12,loyalDown:12,punished:24,selfUp:48,selfDown:64,cold:160,kidBorn:64,kidDie:320,otherKid:24,rivalUp:16,friendUp:12,foeDown:12,
   friendDie:160,foeDie:16,night:16,neglect:24,ill:32,mistressUp:8,mistressDown:16,motherDie:320,motherCold:96,clanUp:32,clanDown:32,slap:6},
  k:{vui:8,binh:4,buon:12,gian:8,so:6,ghen:12,lo:10,dau:48,muu:16,khoc:4,hon:8},
  bar:{ok:6,fail:6,rest:8,comfort:12,w:16,ea:6}}};
/* MOOD BAR = SIGNED SUM (owner OD 17/11 ~18:33Z (1)): the bar of anyone = Σ bar pushes d + Σ BAL.mood.emo[feeling] × strength of every ACTIVE cause
   (good +, bad −), clamped ±100; khóc / hờn weigh like đau khổ / giận. Emotion acts and outbursts need BOTH that bar past its line (her and NPCs:
   BAL.mood.band, BAL.ea.out.v) AND the matching dominant feeling (the seal). GHEN: every raise of the SCORE v.ghen (ghenUp, j1) also adds a short
   Chạnh lòng FEELING cause: strength = raise × ghen.k clamped [ghen.min, ghen.max], timer dur.e.ghenUp khắc, aimed at the one who caused it. */
Object.assign(BAL.mood.emo,{khoc:-.4,hon:-.2});BAL.mood2.dur.e.ghenUp=10;BAL.mood2.ghen={k:2,min:16,max:50,pgNight:6};/* pgNight = her own jealousy score v.pg rise when that consort gets a night (j8 rivalNight, j75), via j1 pgUp */
/* MOOD-MEM (owner OD 17/11 ~18:25Z (b) "làm theo 2 tầng"): layer 2 = jmem memories (months / years / lifelong) WAKE a short layer-1 mood cause (BAL.mood2)
   when the holder MEETS that person (they come to one place), comes to the PLACE where it happened (m.pl; not the holder's own dwelling), or on the
   ANNIVERSARY (same tuần of a later year). One rule for her and every NPC (consorts, Hoàng thượng, Thái hậu, servants).
   min = weight a memory needs to wake (ann = for an anniversary) · cap = wakes a month per person · cd = tuần before the same memory wakes again ·
   s = strength: weight × k, clamped [min, max] · dur = khắc: base + weight × k, × life for a lifelong memory, ≤ max ·
   kind = the feeling: good memory → good, bad → bad, unless the deed is in d. */
BAL.memWake={min:20,ann:30,cap:4,cd:6,s:{k:.6,min:18,max:60},dur:{base:4,k:.12,life:2,max:48},
 kind:{good:"vui",bad:"gian",d:{poison:"so",musk:"buon",kidharm:"buon",takeaway:"buon",frame:"gian",gifttaint:"so",demote:"buon",rescue:"vui",pardon:"vui"}}};/* FEELINGS-18: the old "dau" (grief) is Buồn now (owner 19:10Z dau→buon heavy); a missing key would fall back to gian */
/* AG-ALL-2f3 — ONE betray / sell / recruit odds core (owner OD 17/11 ~17:20Z: "tính cách tham lam ... 60% ... lòng ... dưới 25 ... cộng thêm 10% ... trọng
   cái chữ nghĩa ... trừ đi 10% ... cộng thêm 5% nếu mà giận chủ, hoặc là trừ đi 5% nếu mà đang vui mới được chủ thưởng"; ~17:00Z nothing 100 %).
   jagknow btTerms(servant, master, kind): base by nết (qv codes) + trait words + lòng band to the master + each held virtue (static lean) + each virtue
   the master OFFENDED (+off per seen deed, up to offMax) / HONOURED (−hon …) (jmind mindSeen record) + today's mood toward the master; the roll =
   agOdd (BAL.odds.lo..hi). kind tm = becoming someone's Tai mắt (bribe / recruit / threat / betray an order); sell = selling the master's news
   (raw ≤ 0 → never offers: a loyal, unoffended person does not sell). want / tamco: what the recruiter offers and her cunning (tm only).
   fear = lòng her SENT servant (bestSent) loses when an approach fails (×timid for a timid one); 17:00Z "lòng của cung nữ đó còn trừ". */
/* 2f3 balance: one real Tai mắt = w points of the old 0–10 eyes stat in every formula / gate that reads it (j1 eyes); cap = the old cap */
BAL.ag.eye={w:3,cap:10};
BAL.ag.bt={off:15,offMax:3,hon:5,honMax:3,mood:{gian:5,thuong:-5},fear:4,fearTimid:1.5,tamcoMid:50,tamcoDiv:5,
 tm:{base:{tham:55,lanh:35,chuyen:30,nhat:15,trung:5,_:30},tr:{"Thanh liêm":-15},loy:[[25,10],[50,0],[70,-10],[85,-25],[101,-45]],v:{"Trung":-10,"Nghĩa":-5,"Liêm":-10}},
 /* sell base (review ag-all-2 r2 C6, OD 17/11 ~17:00Z (3)): only the greedy (tham) offer on their own; any other nết stays ≤ 0 with the low-lòng band and an angry mood
    (−15 + 10 + 5), so a non-greedy servant offers only once her master offended a chữ she holds (off, 17:20Z (2)) */
 sell:{base:{tham:60,lanh:-15,chuyen:-15,nhat:-15,trung:-20,_:-15},tr:{"Thanh liêm":-40},loy:[[25,10],[50,0],[70,-20],[101,-60]],v:{"Nghĩa":-10,"Trung":-10,"Tín":-10,"Liêm":-5}}};
/* NPC-PURPOSE (jagwhy, owner OD 18/11 ~04:08Z: every NPC deed has a goal, no luck):
   min   a reason weaker than this (0..100) does not make her act (quiet day)
   near  goal-valid options kept for the pick: score ≥ near × the best;  top = at most this many;  pow = weight power between them
   cd    tuần before the same person acts again in the same kind (_ = default; per kind: cd.<kind>)
   wit   witness rank: eye × eyes(p) + host × hostility toward the one watched
   tell  a witness carries a fact when her grudge against its subject ≥ host, or her liking for the one told ≥ friend */
BAL.ag.why={on:1,min:20,near:.6,top:3,pow:1.5,cd:{_:4,hoi67:6/* jrtrig OR16: one person moves a hồi at most once every 6 tuần */},wit:{eye:10,host:1},tell:{host:40,friend:30}};
/* npc-purpose G1 kinds (jagwhy1; the stray man; an NPC affair itself begins / is exposed through her day plan + proof: role-parity part 2).
   tryst: base + rove (roving man) − fear (Kín đáo), cd [roving, other] = the old 2 / 3 tuần cadence; letter: w per reason (old order of reasons; jealous = Sủng under jSung and ghen ≥ jGhen), cd 12 = once a season;
   seek: base (his fancy, ≥ ag.why.min) + her looks above sac, his gap = BAL.net menGap; tryst base 35 − fear 12 ≥ min (rates review: a careful pair still meets); menGrudge: s while his grudge lasts, cd 9 tuần = the old once every 3 months (monthly caller) */
Object.assign(BAL.ag.why,{tryst:{base:35,rove:10,fear:12,cd:[2,3]},
 letter:{w:{preg:70,confined:60,plan:45,jealous:30},jSung:25,jGhen:50,cd:12},seek:{base:25,sac:60},menGrudge:{s:30,cd:9}});
/* jmen: men.ty = the thái y's summons — Sức under suc counts as sick; whom first: ill / preg weights + (suc − Sức) + b; men.tell = whose secret a threatened
   man gives up: his own lover (own), the one he fancies (like), anyone else (_) */
BAL.ag.why.men={ty:{ill:60,preg:30,suc:40,b:1},tell:{own:100,like:60,_:20}};
/* npc-purpose G1 kinds — weekly cards j3/j7 (makeDil). dil.gap = tuần between two cards (≈ the old 22 %/tuần roll), dil.world = weight of a card
   nobody schemes (festival, flood, illness, a duty question); grudge kinds: gate = motiveOK (j95), s = ag.why.min + hostility; arson / omen also
   need hostility ≥ arsonBar / omenBar (the heaviest deeds); meAlly: motiveOK ally + plot vs the Empress and liking ≥ allyAff; hhGreed: Empress with a greedT nết; empAsk: (want − consorts) × k while
   there is room; coldAsk: base + liking × aff + Đức × duc; loveFound: base + her tai mắt × eye; coldFriend: liking for the fallen one to hear of it */
Object.assign(BAL.ag.why,{dil:{gap:4,world:25,arsonBar:45,omenBar:40,coldFriend:20,allyAff:20,greed:30,greedT:["Tham lam","Tham tiền","Ham lợi"],
 emp:{want:8,k:6},cold:{base:15,aff:.5,duc:.1},love:{base:30,eye:4}}});
/* npc-purpose G1 part 3 (j24 visitors, jagwhy1): fr / ally / gift = her liking; poor = bac under which a friend borrows; sorry = oán to apologise;
   th = Thái hậu regard to call her; poem = a man's tình ý for the 'đem lòng thương' line (+ poemSeen if he met her, + poemFancy for a romantic nature; only a man with one of those pulls writes; cd.manPoem is palace-wide: the old slot drew 1–3 visitors a tuần (mean 1.75) × 40 % × one card type in ~6 ≈ a poem every ~8–10 tuần (G1 #11: base e16e1d6 59–90 cards per ~700 consort tuần; cd 20 gave ~1 per 24 tuần, 0.32–0.40 of base) → cd 7); repay = silver a debtor needs to repay; max = visitors a tuần (old 1-3, mean 1.75) */
Object.assign(BAL.ag.why,{ap:{max:2,fr:10,ally:40,gift:25,poor:40,sorry:20,th:10,poem:10,poemSeen:10,poemFancy:10,repay:40}});
Object.assign(BAL.ag.why.cd,{apFriend:4,apTaunt:4,apSorry:8,empTea:3,thCall:4,svAsk:6,maidWarn:6,manPoem:7,svDefect:8,repay:2,svSell:12,svCause:8});
Object.assign(BAL.ag.why.cd,{meHarm:6,thdTaunt:30,meAlly:24,hhCane:8,hhMe:12,hhGreed:24,empAsk:24,coldAsk:12,loveFound:12,arson:24,rvHarm:6,rvFeud:6,omen:36});
/* npc-purpose G1 part 4 (j68 life events, j72 favours; jagwhy1). e68: gap = tuần between two j68 events (≈ the old 25 %/tuần), visitGap = tuần between two
   j68 situations that take the stock visit slot (old 15 % swap ≈ one per 3 tuần; G1 #7), greed = weight of a greedy servant as the thief. fav: aff = liking to ask / be asked,
   max = favours a month (old 2 × 55 %), w = weight of each need, jobW = tuần an errand stays to do, thLow / th = cold vs warm Thái hậu regard, host = grudge
   to want news, tai / taiB = weak art vs a teacher, home = Sủng under which she is homesick. job: th / aff = trust of the Thái hậu / Hoàng hậu, tai = gift for
   the banquet. q72: gap = tuần between two requests to her (≈ the old 30 %/tuần), debt = weight per favour owed */
Object.assign(BAL.ag.why,{e68:{gap:4,visitGap:3,greed:40},fav:{aff:10,max:2,jobW:4,thLow:20,th:40,host:40,tai:40,taiB:60,home:15,
 w:{poor:60,ill:55,job:50,th:35,spy:40,preg:30,love:45,maid:25,art:20,home:25}},job:{th:20,aff:10,tai:60},q72:{gap:3,debt:10}});
Object.assign(BAL.ag.why.cd,{npcFavor:6,ladyJob:12,q72Collect:4});
/* npc-purpose G1 part 5 (jgift NPC day with the Emperor, j92 wardrobe; jagwhy1). seekEmp: (want − Sủng) × k + amb (ambT nết), cd 16 ≈ the old 6 %/tuần each;
   wd: th = Thái hậu's push on a wrong outfit, thOk = her regard to praise, queen = Empress's push, host / fr = grudge to sneer / liking to praise, gap = tuần
   between two remarks on one wearer (old 35 / 10 % a month), spyHost = hostility toward her above which tai mắt dig, dress = push to change clothes,
   notice = Sủng for the Emperor to notice a bright outfit, eye / eyeBar = tai mắt weight / bar for a framed consort to search first, poor = bac to pawn;
   meet = odds the one with a reason meets her this month and speaks, per view: over / under 35 and tang 70 = the old remark odds (the Thái hậu always has a reason there); ok 35: the old 10 % let ANYONE praise (35 % of them did), now only a friend (fr) or the Thái hậu (thOk) may, and ≈ 1 'ok' month in 4 has one (G1 #12, seeds 1–12: 161 of 632) — 10 gave 0.30 of base 'Lời nhận xét' */
Object.assign(BAL.ag.why,{seekEmp:{want:45,k:1.5,amb:20,ambT:["Tham vọng","Kiêu ngạo"],cd:16},wd:{th:20,thOk:40,queen:15,host:35,fr:30,gap:8,spyHost:20,dress:20,notice:50,eye:5,eyeBar:25,poor:15,search:25,dressGo:30,meet:{ok:35,over:35,under:35,tang:70}}});
Object.assign(BAL.ag.why.cd,{wdRemark:4,wdSpy:4,wdPawn:4});
/* npc-purpose G1 part 6 (jts, jtsb, j8; jagwhy1). ts: guardK = push per danger point above BAL.tsDanger.act (+ tsCare / 2), moodK = the Emperor's summons push
   × his mood weight (fallback only), want / denB / k = Sủng under which she floats a lantern for favour (s = denB + (want − Sủng) × k: wanting favour is her reason; the Emperor sees it only at Sủng ≥ 20), duc / pray = Đức and push of a devout one. bul: pay = silver
   under which a bully takes a thing, wantT = coveting nết, host = resentment to complain, wait = tuần a planned harm waits [plain, Kín đáo], fire = tai mắt × eye +
   Đức × duc to heed. j8: mercyK / kid = the Emperor's mercy per Sủng / per child, birthBar = hostility to plant a midwife, eye = tai mắt weight to check gifts,
   sellP = monthly % a buyer reaches a disloyal maid (old roll 15; cd.maidSell 3 after a sale), illTam / pregTam = Tâm cơ to feign, want / fakeB / k = Sủng under which she feigns (s = fakeB + (want − Sủng) × k; cd fakeIll / fakePreg = the old 3 % / 2 % a month per scheming consort), pregRk / pregUp = rank from which a false pregnancy guards her place, raidK = push per forbidden piece, birthP = the planted midwife really gets in (done roll, the old roll 15); raidGo = Cung Chính ti acts on a report (done roll: the old 4 %/tháng per palace = a report that month, about 1 month in 5 while she holds forbidden goods, × 20; 12 × 200 probe: hits 40 base, 100 with no done roll); bul.fire.heed = a warned consort really keeps the candles safe (done roll, the old roll 60) */
Object.assign(BAL.ag.why,{ts:{guardK:4,moodK:1.2,want:60,denB:20,k:1,duc:60,pray:22},bul:{pay:15,wantT:["Kiêu ngạo","Tham lam","Xa hoa"],host:30,wait:[1,2],fire:{eye:6,duc:.3,heed:60}},
 j8:{mercyK:.6,kid:12,birthBar:50,eye:6,illTam:45,pregTam:50,sellP:15,want:30,fakeB:20,k:1.5,pregRk:2,pregUp:10,raidK:15,birthP:15,raidGo:20}});
Object.assign(BAL.ag.why.cd,{empSummon:6,tsDen:4,maidSell:3,giftCheck:6,fakeIll:96,fakePreg:150,raid:12});
/* npc-purpose G1 part 7 (j22 affairs; jagwhy1). j22: host = grudge to check the Kính sự phòng book (old 10 %/tháng), ksp = push when the eunuchs talk (old +15),
   eye = push per tai mắt point (a foe learning of a tryst, her own tai mắt reporting; old 4 % / 10 %) */
Object.assign(BAL.ag.why,{j22:{host:40,ksp:15,eye:6,see:8,seeEye:5}});
Object.assign(BAL.ag.why.cd,{kspCheck:8,trystKnow:12});
/* npc-purpose G1 part 8 (j4 story lines; jagwhy1). story.wait = tuần a story person prepares before the next step (≈ the old monthly 25-35 % rolls; _ = other);
   the clock restarts on each fire; cn3 = the old mistress carries the guard letters (old 5 %/tháng ≈ 20 tháng) */
Object.assign(BAL.ag.why,{story:{wait:{tt1:12,tt2:16,tt3:16,cn1:12,cn2:16,nc1:12,ch1:12,ch2:16,td1:12,dad:32,cn3:60,_:16}}});
Object.assign(BAL.ag.why.cd,{mock:8});
/* npc-purpose G1 part 9 (j21, j54, j71, j75; jagwhy1). call.gap = tuần between two calls at her palace (old 4 % per buổi ≈ one call in 6-7 tuần; 2 gave 3.4× the old "sang cung" lines); story.wait.suitor = tuần a house
   prepares a match (old 3 %/tháng); f7: want / k / art / amb = push to enter a contest (Sủng under want, art level, ambitious ambT), prep = push to pay for
   preparation (only with bạc ≥ prepBac), greed / poor = gambler's push (greedy nết, silver under poor), danh = Danh under which she seeks a name (host, merit), duc = Đức weight of a
   merit deed, cd.f7Merit = tuần between two NPC merits in the whole palace (shared cd: the old 30 %/tháng × one random deed of ~6 that was needed ≈ one merit in 20 months; she now does the deed the palace needs); j75: want / k / amb = night-prep push, maidSung = Sủng worth guarding with a maid, mono = Sủng under which a
   family sends gifts against a monopoly; cd.famGift = tuần between two gifts from one house (weekly monopoly check; old 25 %/tuần over all houses) */
Object.assign(BAL.ag.why,{call:{gap:6},f7:{want:50,k:1,art:6,amb:15,ambT:["Tham vọng","Kiêu ngạo"],prep:35,prepBac:60,greed:30,poor:60,danh:50,duc:.4},j75:{want:60,k:1,amb:15,maidSung:40,mono:40,admK:6}});/* j75.admK = admonition push per hogged night (FAIRN.fav 4 nights → 24 ≥ min) */
BAL.ag.why.story.wait.suitor=26;
BAL.ag.why.suitor={tiers:3,tierK:10,taiDiv:10};/* the suitor house: push = min + (tiers − its tier) × tierK + son's Tài / taiDiv (tier 0 = the greatest) */
Object.assign(BAL.ag.why.cd,{callMe:4,f7Merit:60,sendMaid:24,tellJ75:4,famGift:12});/* tellJ75 = tuần before the same consort carries another of v's favours to her (j75Teller) */
/* npc-purpose G1 part 10 (j95b lies; jagwhy1). lie: expose / blame / frame = hostility toward her needed to expose (old 12 %), push blame (old 40 + 20 %),
   frame (old 45 + 25 %); cd = tuần between two such deeds by the same person (lieMe ≈ the old weekly nết rumorP) */
Object.assign(BAL.ag.why,{lie:{expose:30,blame:40,frame:45}});
/* npc-purpose reason divisors (one-core "div" kind, OD:L1267): a stat is divided by these in a reason score — grGhen = her ghen toward the player (npw1Gr),
   thCall = Thái hậu regard (thCall), sendMaid = her sủng (sendMaid), lieMal = malice in a rumor (lieMe), wearMal = malice of a holder who wears a lost piece (loWear) */
Object.assign(BAL.ag.why,{div:{grGhen:2,thCall:4,sendMaid:4,lieMal:40,wearMal:2}});
Object.assign(BAL.ag.why.cd,{exposeMe:6,lieMe:6,blameMe:4,frameMe:4});
// G3 kinds (NPC-PURPOSE G3: witness / target picks + agent-layer dice; report dev/handover/reports/npc-purpose.md §G3)
/* g3.soon   a planned deed's khắc: score 100 − soon × khắc from now (she does what she wants soon; npwPick keeps the near-best khắc)
   g3.two    a 2nd goal of the day when the 1st and the 2nd need are both ≥ two × her strongest need (two needs pull as hard)
   g3.newRk  a newcomer's weight per rank step (whom an old consort welcomes / ambushes: Sủng + rank)
   g3.bmBac  she blackmails for silver when her bạc is under this (need = bmBac − bạc), else she would rather report (hostility)
   g3.mood   weekly stay-home factor: base + sg[her feeling] × its strength / div (sad → stays in, glad → goes out), held to [lo, hi]
   g3.maid   a maid's chat: odds o she has heard where someone is (the player's foe first)
   g3.call   a drop-in visit (jshelf): her ally need (0..1) × k must reach min (k = 100: the npwReg 0..100 scale); the chance she drops in this buổi = BAL.shelf.visit.dayP (old odds, a new life does not send every lonely consort at once); cd.g3call tuần after a call
   g3.scape  a scapegoat (jworld2 án trộm): the accuser's hostility to her target must reach min */
BAL.ag.why.g3={soon:12,two:.7,newRk:10,bmBac:60,mood:{b:1,div:120,lo:.4,hi:1.9,sg:{vui:1,binh:0,buon:-1,gian:.5,so:-1,ghen:.5,lo:-.5,dau:-1,muu:.5}},maid:{o:15},call:{min:25,k:100},scape:{min:30},lean:{c:2,k:"vuon"},ty:{preg:50},
 heir:{go:20,wait:60,age:2},deb:{p:4,gap:12,o:30,div:2,old:16,oldD:10,lo:10,hi:85}};
/* g3.heir  j51 heirMonth (kind heirName): tuần of reckoning before he names an heir (go ≈ the old 15 %/tháng, wait ≈ the old 5 % while a đích son is small),
            age = push per year of the eldest eligible son above six
   g3.deb   j51 kvDebate (ministers' memorial, PARKING_LOT #7): p = % a month the court raises lệ lập đích (was KV.deb), gap = months between two (KV.debGap);
            the Emperor's odds to switch = o + (Tài gap + được thương gap) / div − oldD when the heir is ≥ old, held to [lo, hi] */
Object.assign(BAL.ag.why.cd,{g3call:1,g3scape:8,g3acc:1,tyCall:1});/* tyCall: a patient sends for the thái y at most once a tuần (old 25 % a buổi ≈ one round a tuần) */
// G2 kinds (npc-purpose G2, review/npc-purpose-g2: monthly no-actor chains; kinds registered in jagwhyg2.js) — numbers only here
Object.assign(BAL.ag.why.cd,{loTake:3,loTry:4,loClear:2,loWear:6,kcWeek:6,kcMeet:4,kcVh:12,kcSuit:8});
 /* jkc: kcDebt.fail = % the gambling brother, refused, fails to raise the debt himself (his own try) → the creditor comes; kcWeek s = motive weight × mul (a weight ≥ .35 is a real motive); kcTm: he seeks her places with weight h×seek vs home; meets her when longing h ≥ meet; Emperor notices beauty when sắc − vhSac ≥ min; kcSuit: a house her standing reaches (q ≤ kgt + reach) seeks her with s = danh tiếng × kapW */
Object.assign(BAL.ag.why,{kcDebt:{fail:40},kcWeek:{mul:60},kcTm:{seek:1,home:40,meet:50,vhSac:50},kcSuit:{reach:45,kapW:1}});
Object.assign(BAL.ag.why,{
 loTake:{rivW:.2,greed:40,timid:25,band:2,care:25},   /* care = weight of the owner's chest maid misplacing a piece (cause "mis"; G1 #9: 60 → 25 — at 60 "mis" took 77 % of losses vs 56 % base, so fewer pieces reached another chest and her lost-piece hearings fell 18 → 3 in 12 × 200; at 25: 10); pickAll: rival / greedy servant / careless maid weighted by s */   /* jlost: who takes an item — a rival whose danger band ≥ band; rival s = danger × scheme weight × rivW; servant s = netQ(greed)×greed, netQ(timid)×timid (careless) */
 loTry:{want:30,prDiv:20,clear:35,wear:25,cct:20,cctBac:40,book:30,bookBac:20,ask:30,keep:35,plant:65,frMul:5}  /* jlost: owner looks for it (want + price/prDiv), suspect clears her name (clear), holder wears it (wear + malice/2); her way: cct/book (when bạc ≥ …Bac) or ask (+liking); keep vs plant (keep : plant weights, plant only when she has a grudge of band ≥ loTake.band against a third consort); friend who saw it tells: recog.fr × frMul */
});
// G2a (worker a adds its Object.assign lines below this line)
// G2a cooldowns (tuần) per actor+kind: j29 servant nết acts, j42 cung nữ road cards, jcmaid close-maid cards, jagknow seller/teller, jagacts3 secret grab
Object.assign(BAL.ag.why.cd,{svSteal:3,svMarket:3,svSpy:3,svLeave:3,svTalk:9,srvBuy:12,srvWatch:3,srvWed:8,srvBlack:4,srvSearch:3,srvPrince:8,cmSpy:3,cmLeak:3,cmConf:3,cmTt:3,cmBrawl:8,cmScorn:8,cmLand:12,cmTh:3,knSell:1,tmTell:1,p3Grab:2});
Object.assign(BAL.ag.why,{
 sv:{greed:40,loy:.3,market:30,spy:30,spyLoy:.3,leaveLoy:75,leaveW:1,leaveStall:1,leaveSung:.1,talk:35,tellLoy:.5,blabLoy:.5}, /* j29: steal s = netQ(greed)×greed + (100−lòng)×loy; market = netQ(greed)×market; spy = netQ(sharp)×spy + lòng×spyLoy; leave = (leaveLoy−lòng)×leaveW + months stalled×leaveStall (target: rank gap + Sủng×leaveSung); talk = netQ(talk)×talk, then tell (lòng×tellLoy) vs blab ((100−lòng)×blabLoy) */
 srvWk:{mid:50,moodB:20,moodW:1.5,malMin:40,malW:1,bribe:.3,frame:1.5,tip:.8,host:25,bac:40,cdM:3,cdR:52,cdC:12}, /* j42 weekly card: mistress mood = moodB (a mistress always has a mood about her maid) + |Chủ tin − mid|×moodW; cd per actor in tuần: mistress cdM, a rival cdR, a colleague cdC (≈ the old weekly 32 % mood / 7 % bribe / 8 % frame / 12 % tip spread); order = (malice − malMin)×malW; rival bribe (only one with hostility ≥ host to the mistress and bạc ≥ bac) = hostility to the mistress×bribe; colleague frame = −quý×frame; friend tip = quý×tip */
 srv:{reMin:1,reNeed:6,reRk:1,tipIntel:30,tipGift:25,leakMin:20, /* j42: Nội vụ phủ new mistress = max(reMin, reNeed − her staff) + rank×reRk; friend tells palace news (tipIntel + mistress grudge) vs a gift (tipGift); a witness holds the affair when grudge(her)+grudge(mistress) > leakMin */
  lau:{base:6,max:4,div:2}, /* Tân Giả khố weeks = base + min(max, (tinOut − Chủ tin)/div) */
  angry:{out:100,beatTin:30,beatW:2,sly:30,malMin:40,malW:.5,scold:30}, /* her anger: out when Chủ tin < tinOut (out); beat when Chủ tin < beatTin: (beatTin − tin)×beatW + Xảo quyệt sly + (malice − malMin)×malW; else scold */
  ord:{poison:70,pHost:50,plant:45,plW:.8,spy:20}, /* order deed: poison when malice ≥ poison and grudge ≥ pHost (s = grudge); plant when malice ≥ plant (grudge×plW); spy = spy */
  pun:{malW:.5,lau:40,lauWk:10,tin:10,spyPay:8,betrayWk:12,spyOutWk:8,orderWk:10,orderTin:5,stealWk:6,stealTin:8}, /* caught spying/betraying: kill = malice×malW vs Tân Giả khố = lau (her AND an NPC servant, jagstaff asMonth); lauWk / betrayWk = tuần of Tân Giả khố (spy / betray), tin = Chủ tin after; spyOutWk = tuần when caught at a spy meeting; orderWk + orderTin = caught on her master's order (tuần, Chủ tin after); stealWk = tuần when beaten for theft with Chủ tin < stealTin (review/errand-bal-r1, law 4); spyPay = bạc a month while she is another palace's tai mắt (her card prints these, review/errand-bal) */
  buy:{rk:8,tai:.2,host:.5,gap:1,bac:60}, /* a higher consort (rank above the mistress + gap, bạc ≥ bac) buys the maid: her bậc×rk + Tài×tai + grudge vs the mistress×host */
  watch:{tin:.4,close:20}, /* the mistress watches her maid: (100 − Chủ tin)×tin + Kín đáo close */
  wed:.5,prince:.5, /* ban gả: Chủ tin×wed; a prince asks for her: tình ý×prince */
  black:{mis:.6,me:.6,mal:.2}, /* the witness blackmails: grudge vs mistress×mis + grudge vs her×me + malice×mal */
  search:{rum:5,tin:.3,nv:1}, /* chest search: rumour×rum + (100 − Chủ tin)×tin + nết affairRumor×nv */
  grant:{th:10,mis:.5,wed:40}}, /* Ban hôn granter: Thái hậu errands×th vs Chủ tin×mis; her own man (tình ý) vs a match (wed) */
 cm:{spy:.4,leak:.4,debt:15,home:10,spyBy:20,conf:.4,ttB:20,tt:.5,brawl:.6,brLoy:.2,scorn:.6,land:.6,th:.4}, /* jcmaid: listens = lòng×spy; leaks = (100−lòng)×leak + debt/home(nhớ nhà)/spyBy by her secret; confides = lòng×conf; Tể tướng letter = ttB (the house always wants word of the Emperor) + her Sủng×tt; brawl = foe grudge×brawl + lòng×brLoy; scorn / Cung Chính ti report = foe grudge×scorn / ×land; speaks to Thái hậu = lòng×th */
 kn:{base:20,will:60,need:40,tell:.5}, /* jagknow: seller s = base (holds news worth selling, willing: knSellW > 0) + sell will (0..1)×will + bạc gap (0..1)×need; refusing servant tells = lòng×tell (only from lòng ≥ loy.mid) */
 p3:{see:60,host:1,mal:.5}, /* jagacts3: maid at the tryst place notices (see, odds); secret grab = grudge vs teller×host + (malice − secretMal)×mal */
 stipAns:{tip:30,askLoy:.5,meek:20,timid:20} /* jstip NPC answer: tip (tip + bạc/tip, when she can pay ×2) vs maid asks (lòng×askLoy) vs meek (meek + netQ(timid)×timid) */
});
//
//
// G2b (worker b adds its Object.assign lines below this line)
Object.assign(BAL.ag.why.cd,{h54Tut:3,h54Teach:3,h54Gift:3,pkTrac:0,j70Plot:3,facJoint:3,facAsk:3,facDiv:3,empQueen:3,h54Ban:0,hEmpWed:0,h54Plead:0,h54Sad:0,h54Hoa:0,ktFav:0,j70Guard:0,j70Face:0}); /* cooldowns in tuần (3 = once a month at most; 0 = the caller's own gate sets the cadence: h54Cd / pkCd / k.hV / once per kid / weekly roll) */
Object.assign(BAL.ag.why,{g2b:{
 tut:40,tutGift:.1,               /* j54 h54Tut: mother hires an arts master: s = nv(h54P) × tut + the daughter's best art × tutGift (ambition, or a gifted child) */
 teach:25,teachFond:.2,           /* j54 h54Teach: mother teaches herself: s = nv(h54P) × teach + child's fondness × teachFond; the art = where she can give most */
 ban:{base:15,age:5,amb:15},      /* j54/jht h54Ban: mother opens marriage talks: base + years past betroth age × age + ambition bonus */
 ew:{base:20,age0:19,age:5,sung:.1,heir:15,th:.1},  /* hEmpWed: Emperor/Thái hậu match a child nobody arranged: base + years past age0 × age; Emperor + mother's Sủng × sung; Thái hậu + heir + her regard × th */
 trac:{base:20,age0:20,age:2},    /* jht pkTrac: Emperor gives the heir a second wife: base + years past age0 × age */
 gift:{base:5,fond:.4},           /* j54 h54Gift: mother sends gifts to a married daughter: base + child's fondness × fond (cold ties send none) */
 plead:{conf:60,sung0:60,sungW:1,amb:15},  /* j54 h54Plead: mother asks her daughter to plead: confined → conf; else (sung0 − her Sủng) × sungW + ambition bonus */
 sad:{joy0:60,w:1},               /* j54 h54Sad: an unhappy daughter comes home: (joy0 − her joy) × w */
 hoa:{base:10,fond0:50,fond:1},   /* j54 h54Hoa: ambitious mother offers her daughter to the envoy: base + (fond0 − child's fondness) × fond; non-ambitious never */
 love:{base:20,fond:.5,rank:40,amb:60},    /* j54 love match vs rank match: love = base + fondness × fond; rank = rank (amb if ambitious) */
 envoy:{p:4,min:5,base:100,rank:7,rankW:8},    /* j54 envoy: p = monthly odds a Bắc Địch embassy arrives (world event); Emperor picks the daughter for the envoy: max(min, base − fondness + (rank − mother rank) × rankW) — least-tied, lowest-born first */
 fav:{sung0:50,base:20,w:1,amb:15},  /* j53 ktFav: a mother with Sủng ≥ sung0 asks the Emperor for a famed master: base + (Sủng − sung0) × w + ambition bonus */
 tier:{base:40,step:15,hien:80},  /* j53 tutor tier: score = base − |tier − ideal| × step; ideal = nv(tutorWant) + 1 if the child is bright (hiền ≥ hien) */
 vo:{w:100,fMul:.25,no:40},       /* j53 martial tutor: yes = ktPT[2] × w (× fMul for a daughter), no = no */
 rev:{base:30,tut:10,quiet:40},   /* j53 tutor's private report to the player: tell = base + tutor tier × tut, quiet = quiet */
 plot:{d:.7},                     /* j70 j70Plot: a plot starts only from a motive: s = danger × d (band ≥ 1 ⇒ s ≥ 21) */
 guard:{sung:70,th:60,base:20},   /* j70 j70Guard: Emperor guards her at Sủng ≥ sung, Thái hậu at regard ≥ th: s = base + excess */
 face:{sac:.4,sev:5,cureSev:2,cureBac:120},  /* j70 j70Face: scarred NPC seeks a physician / buys the cure: s = Sắc × sac + severity × sev; cure needs severity ≥ cureSev, bạc ≥ cureBac */
 joint:{min:25,w:1},              /* j10 facJoint: joint scheme only on a foe the faction's average grudge ≥ min; s = that average × w */
 ask:{size:6,need:6,aff:.6,foe:.6},          /* j10/j25 facAsk: leader invites her: liking × aff + (size − members) × need + shared grudge × foe */
 div:{w:.5},                      /* j10 facDiv: another leader divides her faction: hostility toward her × w */
 queen:{base:20,mo0:18,mo:2},     /* j34 empQueen: Emperor names a queen by decree: base + months past mo0 empty × mo */
 td:{deg:15,host:.5,need:30,backW:2.5,ask:10,sung0:50,askW:.5},  /* j55 consort court act: leak = deG × deg + hostility × host; gift = need − backing × backW; probe = hostility × host; ask = ask + (sung0 − Sủng) × askW */
 so:{praise:30,praisePow:.25,dich:.5,imp:15,tuyen:3,tuyen0:60,cc:10},  /* j55 memorial choice: praise = praise + pow × praisePow; dich = pow × dich; imp = feud weight × imp; tuyen = (pow − tuyen0) × tuyen; cc = can-chính count × cc */
 bk:{base:10,pow:.5,rel:.3},      /* j34 lobbying: which clan head she courts: base + pow × pow + clan tie × rel */
 c:{pr:30,lo:20,lo0:5,loW:5,sc:.4}           /* j34 contest act: practise = pr; lobby = lo + (lo0 − backing score) × loW (needs bạc); scheme = worst hostility × persW × sc */
}});
//
// G2c (worker c adds its Object.assign lines below this line)
Object.assign(BAL.ag.why.cd,{fxSrvHarm:3,fxRivSrv:3,fxRivSrv2:3,fxSlapBack:1,emoKid:12});  /* jface/jemo cadence in tuần: a servant's spite, a rival's strike at servants, a mistress's slap, a child's glad mood */
Object.assign(BAL.ag.why,{
 fxSrv:{p:8,rivP:6,hot:40,hot2:25,hostAdd:3,grudge:40,loyW:2,spite:30,penLow:30,timid:30,slapBase:20,timidSl:20},  /* jface: p/rivP = success of the chosen strike (old monthly odds); hot = grudge needed to strike at her servants; hot2 = dislike needed to strike at another consort's servants (fxRivSrv2; the old line had no gate at all); hostAdd = old +3 for a target she hates (≥ hot); servant s = grudge + (disloyal: why.min + (loy.out−loyal)×loyW, so every servant below loy.out has her reason, as in the old 'grudge or loyal < loy.out' gate; G1 #12: without why.min a servant just under loy.out scored < min and servant-on-servant harm fell to 0.3 of base) + spite×netQ; punished consort lies low with penLow + timid×netQ vs her grudge; mistress slaps back: slapBase + spite − timidSl×timid + dislike */
 emo:{goBase:20,angW:1,timid:40,calm:20,ofEmp:30,ofAf:40,ofP:6,manMet:20,manDt:5,kidSib:25,kidPet:25},  /* jemo: sad consort alone (mood v) vs goBase+liking; servant fear = anger×angW + timid×netQ vs calm + loyalty above mid; officials: Emperor's temper ofEmp, patron with af ≥ ofAf, it reaches him this tuần with ofP % (the old weekly 6 %; without it every official turned glad/worried every tuần); men: met/letters manMet+tình, tình moved ≥ manDt; child: siblings ×kidSib, pets ×kidPet */
 cmood:{thHi:70,base:20,kidsFew:2,kidW:25,hhSad:20,hhFav:15,oan:40,busy:3,busyW:10}  /* jcmood: TH glad when her regard th ≥ thHi; worried while heirs < kidsFew; HH jealous anger = grudge vs hhSad+liking; glad when her favour leads by hhFav; tired when ≥ busy pairs of consorts bear oán ≥ oan */
});
Object.assign(BAL.ag.why.cd,{ilBack:2,ilBuy:4,ilConf:2,wkUse:6,rcpAcc:1,rcpGos:3,rcpGift:3,rcpTh:3,petHh:0,petMan:3,thyLeak:2,thyTell:1,thyBribe:3});  /* jil/j83/jrcp/jpet/jthaiy cadence in tuần per person */
Object.assign(BAL.ag.why,{
 g2lux:{gos:20,praise:20},  /* jinv: the dress gossip needs hostility > gos toward the wearer; the praise needs liking > praise */
 g2il:{back:30,valDiv:10,conf:30,timid:20,spare:20,lack:30,hostW:.5},  /* jil: owner buys back back+value/valDiv; asks back conf+value/valDiv−timid×netQ; buyer needs bạc ≥ price+spare, wants it when she has none (lack) + grudge vs the old owner ×hostW */
 g2wk:{poisonP:15,malice:70,host:50,sungHi:70,emp:30,th:25,thWant:70,relMe:5,gift:20,sell:15,poor:40},  /* j83: her work's use: poison (malice > malice, grudge > host; success poisonP), to the Emperor while Sủng < sungHi (emp + gap), to Thái hậu while her regard < thWant (th + gap/2), a friend (gift + liking; the player needs rel > relMe), sell only while bạc < poor (sell + shortfall) */
 g2rcp:{acc:30,accHost:20,gos:20,emp:60,th:40,best:30,other:10,gift:10,thHi:60,thBase:20,thKinh:20,thTheu:10},  /* jrcp: accuser = the harmed (acc+grudge), Hoàng hậu (acc), a rival with grudge ≥ accHost; maid gossip gos+loyalty above mid, asks about emp/th/others by care; a friend shares her best art (best) over others (other), s = gift+liking; Thái hậu thBase + (th − thHi), sutra thKinh over embroidery thTheu */
 g2pet:{hhP:2.5,manP:5,hac:20,ky:20,kyTh:85,kyRk:4,hhMin:60,base:20,manTinh:50},  /* jpet: hhP/manP = success of the chosen gift (old odds); Thái hậu: hạc (hac) vs kỳ lân when th ≥ kyTh and rank ≥ kyRk (ky + surplus); Hoàng hậu base + (hh − hhMin); a man with tình ≥ manTinh */
 g2thy:{leak:20,tell:10}  /* jthaiy: tell = base push of a physician who likes her (s = tell + his liking); the physician leaks when leak + his liking for the briber − his liking for the player > 0 */
});
//
//
// G2d (worker d adds its Object.assign lines below this line)
Object.assign(BAL.ag.why.cd,{cyRead:4,cyLie:4,cyForge:3,dhConf:0,dhTake:3,dhHieu:0,dbPromo:12,eitPil:4,psStrike:4,khAcc:8,tyPlot:3,tyRob:4,tFrame:8,wdFrame:8,vlGift:4,tdsMake:2,thyHarm:2,socDeed:1,midBribe:0});/* G2d cooldowns in weeks per actor (0 = the Emperor / once-per-pregnancy kinds, gated elsewhere) */
Object.assign(BAL.ag.why,{
 cyRead:{host:.5,eye:8,forge:.6},   /* jcycle: a foe reads the cycle book: s = hostility × host + eyes(her informants) × eye; forging: s = hostility × scheme weight × forge */
 dhConf:{base:10,sev:.5,sung:.3},   /* jdh2: the Emperor takes back hiệu / title: s = base + the old odds × sev − her Sủng × sung (a favourite keeps them) */
 dhHieu:{base:10,sung:.3,danh:.2},  /* jdh2: the Emperor bestows a hiệu: s = base + Sủng × sung + Danh × danh */
 luxEdict:{th:40,frMul:1.5,hh:30,emp:20,perN:2},  /* jlux: who issues the thrift edict: Thái hậu th (× frMul when frugal), Hoàng hậu hh, Emperor emp, + perN per person with tiếng xa hoa */
 luxCalm:{calm:30,edict:20,rep:3,keep:15,proud:60},/* jlux: an NPC with tiếng xa hoa tones down: calm + edict (while it stands) + rep × tiếng xa hoa, vs keep + proud (Kiêu ngạo / Tham vọng) */
 dbPromo:{base:20,loy:1},           /* jaudit: the mistress raises the trusted servant she values most: s = base + (loyalty − trust) × loy */
 eitPil:{spy:15,greed:20,sour:20,sourS:5},/* jeitem: pilferer s = her inclination ch + spy (a spy) / greed × netQ greed / a disloyal servant (lòng < BAL.eit.pil.loyal, the candidacy gate): why.min + ch (+ sourS when lòng < sour); none of these → no pilfering (G1 #12: the disloyal reason began only below sour, pilfering 0.4 of LIVE) */
 exTh:{base:20,need:40,tgt:20,fest:15},/* jexam: Thái hậu errand order: base + need (its live trouble rf is true) / tgt (aimed at a person) + fest (festival copy); rf false → not asked */
 psStrike:{top:60,base:10,sung:.5}, /* jexam: the grown Emperor remembers the quyền thần: s = base + (top − her Sủng) × sung; Sủng ≥ top → never */
 khAcc:{base:10,k:1},               /* jkh: false birth-date accuser: s = base + danger × scheme weight × k */
 tyPlot:{base:10,k:1},              /* jty: plotter / robber-hirer: s = base + danger × scheme weight × k (both tyPlot and tyRob) */
 tFrame:{mal:.5,host:.5,env:10,gap:.5},/* jtruth / jwd92b: framer s = malice × mal + hostility × host; target = env + Sủng gap × gap + hostility × host */
 vlGet:{buy:40,craft:30,lv:5,ask:10,askO:.5,bacDiv:10,plain:5,aff:.5},/* jveil: her way to a veil: buy (+ spare bạc / bacDiv), craft (+ lv × level), ask (+ best giver odds × askO); finer kind vs plain; friend gift s = liking × aff */
 tdsMake:{base:10,lv:4,poor:30,sell:15,gift:10},/* jtds: workshop piece: s = base + art level × lv + sell (bạc < poor) + gift (has a friend) */
 rgErr:{trMin:5,base:10,need:20,fresh:20,tr:.2},/* jreign: the leader asks an errand only when her trust ≥ trMin; errand = base + need (live occasion) + fresh (not done) + trust × tr */
 j9:{oan0:40,ghen0:110,q0:30,q:1,c0:20,c:.5,none:30},/* j9: two NPCs in one place: quarrel = q0 + excess over (oán sum oan0, ghen sum ghen0) × q; chat = c0 + liking sum × c; pass by = none */
 thyHarm:{p:25,base:10,host:.5},    /* j13: a really bribed physician worsens her: s = base + briber's hostility × host; p = the success (old 25) */
 socDeed:{base:10,aff:.5,oan:.5},   /* j28: a weekly social deed: s = base + strongest feeling (|liking| × aff + oán × oan) toward anyone */
 midBribe:{p:25,k:.5}               /* j32: midwife bribe: s = danger × bribe weight × k; p = the success (old 25) */
});
//
//
// end G2 kinds
/* ---- review/mg-skip-all (owner 18/11 ~05:45Z + ~05:55Z): the ONE quick option of every mini-game ("Để trời định" / "Học nhanh" / "Điểm trang nhanh" …) ----
   od  = the odds base of the quick roll, read by every game through kitQuickRoll() (KIT §13.6); replaces BAL.odb.j5.odInnerHTML + BAL.odb.j83.odPts (35 → 40).
   raw = the play mark a won quick roll counts as where a game needs one (virtue lessons: the partial progress of a middling play); a lost roll counts 0.
   care = the share (0..1) of a care game's gain a won quick roll gives (pet care, watering): half of a good play, never more.
   Outcome table (a quick result never beats a good own play): lessons won = tiến bộ một phần, lost = 0 · works / crafts = never a product ·
   makeup won = the middle tier (Đoan trang, BAL.toil.tier[0]), lost = Vụng về · care won = BAL.skip.care of the gain, lost = 0. */
Object.assign(BAL,{skip:{od:40,raw:5,care:.5}});
/* MINI-GAME SCORE RANGES (co-op thin F5, review/coop-thin-f5): the score a game end can report. unit = the care games (pet care, watering:
   0..1 of the gain), raw = the kg82 / playArt / Tứ đức / tsGame play (0..10). A score outside its range is refused (the host never applies it). */
Object.assign(BAL,{mgSc:{unit:[0,1],raw:[0,10]}});
/* FACE REVEAL motion (owner 18/11 ~06:20Z, KIT §79 jreveal.js): ms = the grey veil clears from the face outward; lite = Gọn / reduced motion short fade;
   win = how long after a face is learned every place that first draws it (frame, avatar, stage figure) still plays its one reveal */
Object.assign(BAL,{faceReveal:{ms:Math.round(1000*BAL.pace),lite:350,win:8000}});
/* BOOK FIGURE (owner 18/11 ~07:10Z + ~07:20Z, KIT §56.3): ONE body size for everybody = SKULL TOP to FEET = figure column width / bookFigW (her p.5 shot: Fold col 220 -> 641, iPad col 183 -> 534). Layout = live; nothing cut, nobody shrunk, the text is drawn on top.
   cRef = the tallest Hoàng hậu crown above the skull top / body (catalog scan 18/11 over all 8570 fig-*.webp: tallest = consort-c09-t8-a26 / maid-m45-t8-a18 .131; the earlier .072 was measured on the thaihau-* files only; owner 18/11 ~18:40Z: the name tag covered the Hoang hau's phoenix crown); gap = px the crown keeps under the running-head rule; footGap = px the feet keep above the page's bottom line when the feet line is moved down for her crown. */
BAL.bookFigW=.343;BAL.figWideRef=.65;/* painted width / body (skull top -> feet) a person column must hold so no robe / prop enters the text: 99.9th percentile of all 8570 fig-*.webp (p50 .347, p90 .446, p99 .596, max .838 = 3 outlier files) */BAL.bookFigBody={kv1:641,kv2:534};/* the Luan hoi book's ONE body (skull top -> feet) on the iPad spread (1180x820; = book column / bookFigW, her p.5 shot 534): the identity card (Than phan kiep nay) on the iPad stands her at this same size (owner 18/11 ~18:30Z) */Object.assign(BAL,{bookFrame:{cRef:.131,gap:8,footGap:10}});
/* DOING AN ACT ON THE SPOT (review/shown-odds-one-path): "Cài đồ vào rương nàng" done in her own palace is easier than sending
   someone by actHere.plant (was a typed -15 pen in j8 plantpick + a typed +15 on the j2 chest card); both read it through actCtx (j9). */
Object.assign(BAL,{actHere:{plant:15}});
/* RECEIVER CHOICE (owner OD 18/11 ~21:15Z, law 1 + 2 + 3; jrcv.js): every receiver of a request / order (she or any NPC) answers one of the SAME
   4 answers as a helper (OD L1876): 0 giúp hết lòng · 1 làm qua loa · 2 từ chối · 3 mách lẻo–phá ngầm. An NPC receiver draws by the L1876 weights
   (BAL.road.hp: role row v / hh × nết × liking toward the asker × tâm cơ, jroad rdHpW) through jmind mindPick (never argmax); she picks on her card.
   Each answer has a gain and a cost for the receiver (law 3), of equal value (law 2):
   help (Nhờ giúp đỡ, helpAsk): full = lends BAL.ag.cx2.help.bac (or tells a secret / receives warmly) · the asker's liking +af[0];
   half = lends bac × half · liking +af[1]; no = keeps the bạc · both likings − BAL.ag.cx2.help.fail; sab = keeps it, tells the Hoàng hậu
   (her liking of the receiver +qAf) · Đức − road.hp.sab.duc, the asker's oán + road.hp.sab.oan, the asker's Danh − danh.
   ord (an order from above, two-option cards: Vâng / Cáo bệnh …): the NPC receiver weighs «obey» = full + half, «decline» = no (+ sab) — the SAME
   options and numbers as her card. */
/* the 4 answer names are the L1876 words BAL.road.hp.kw (full / half / no / lk), read by jrcv rcvKw — no copy here (one core).
   «làm qua loa» (slot 1, every card, rcvYesO): the act at × help.half (the weaker result) and Sức − prop.suc × help.half (she still gives some time);
   the risk = the L1876 «qua loa» minus BAL.road.hp.half read as the chance the asker sees through it → the asker's liking of the receiver − help.fail
   (as an open refusal) and her oán + road.hp.sab.oan (worse than refusing openly). Shown on her card in words (chanceW), the same roll for an NPC. */
BAL.rcv={help:{af:[8,3],half:.5,qAf:5,danh:2},
 /* the Sức a summons costs (her «Vâng chỉ» card jts tsSummonMe and the summoned NPC, one number) */
 sumSuc:5,
 /* the bạc to take a gift to Thái y viện (her giftin card j8 and an NPC receiver, one number) */
 chk:10,
 /* the Thái y viện finds a tainted gift at the receiver's oSee + chkSee (her giftin card j8 and an NPC receiver, one number) */
 chkSee:25,
 /* per-kind factor on the L1876 weights [full, half, no, sab] (tunable): refusing the throne is rare, sending a gift back less common than keeping it */
 k:{help:[1,1,1,1],gift:[1,1,.5,1],emp:[1,1,.2,.2]},
 /* every request / proposal (jrcv rcvYesO / rcvNoO): «giúp hết lòng» costs the receiver Sức suc (her time); «từ chối» a proposal keeps her out of cliques: Danh + danh */
 prop:{suc:4,danh:1,ghen:10},
 /* Kết giao (law 2, review FAIL 6 #6): «nhận lời» = kết bè, Danh − danh (and the asker's worst foe quý the receiver − BAL.eff.j8.f_2, the mirror of the
    thiện cảm gained); «từ chối» = Danh + danh and that foe + f_2 × help.half; «qua loa» = half of each */
 ally:{danh:3},
 /* a request to a JUDGE (the Hoàng hậu asked by «Xin Hoàng hậu giáng» xinhh / «Trình Hoàng hậu» trinhhh, OD 18/11 ~21:15Z law 1): she as the Hoàng hậu
   gets the card, an NPC queen answers with the SAME options at the asker's shown odds (rcvJudge). yes = the act (xinhh: the lễ comes to the judge)
   · cost: the punished one's oán + oan, and for taking a lễ to demote someone Đức − duc; no = the act's own refusal effect · gain: Danh + prop.danh */
 judge:{oan:6,duc:3}};
/* PARALLEL TIME (owner OD 18/11 ~20:15Z/~20:20Z/~20:35Z; jptime): every button where she asks / sends ANOTHER person.
   o = khắc the SENDER pays to give the order (her card's Tốn); n = khắc the person sent is away, counted from the tap, walk included
   (= the RECEIVER's own act length when she plays the receiver: the maid road order frame shows the same n). The result lands at tap + n.
   Equal value (laws 2/3/4, D check): every send costs the same 1 khắc order and keeps the person away 2 khắc; what each send gives and risks
   stays the button's own BAL rows (odds, evidence, loyalty −, oán …), shown on the sender card and on the receiver's frame alike.
   on = 0: every button runs at once as before. */
Object.assign(BAL,{ptime:{on:1,kinds:{
 def:{o:1,n:2},
 spy:{o:1,n:2},     /* Sai đi dò la (her maid / a servant) · NPC cx2:maidSpy */
 listen:{o:1,n:2},  /* Nghe ngóng chung */
 scout:{o:1,n:2},   /* Sai tai mắt dò nơi ở (her runner) */
 invite:{o:1,n:2},  /* Mời đến cung ta (messenger; the guest comes at the due khắc) */
 harm:{o:1,n:2},    /* a deed on a consort done by a sent servant (not together: "phải sai người đi", j8 doAct / bestSent) */
 plant:{o:1,n:2},   /* Sai người lẻn vào cung cài đồ */
 gift:{o:1,n:2},    /* Tặng quà by hand when not together (a servant carries it) */
 bribe:{o:1,n:2},   /* Cài người hầu vào cung khác (j10 PEND.plantsv → jptime §19): the servant walks over, placed at due. «Mua chuộc» kẻ hầu cung khác (j10 servAct mua) = FACE: she meets the servant herself (2 khắc) */
 clothes:{o:0,n:2}, /* Sai cung nữ đến Nội vụ phủ xin y phục (jeitem): the option's own Sức is the order (no khắc, as before) */
 buy:{o:1,n:2},     /* Sai cung nữ thân tín mua lén ngoài cung (the goods still come next tuần) */
 errand:{o:1,n:2},  /* maid road: Việc chủ sai (receiver side: her own walk + task) */
 ask:{o:0,n:2},     /* Sai <cung nữ> đi đòi (jstip, the monthly cắt xén card: no khắc before, none now; the result at the due khắc) */
 vlbuy:{o:1,n:2},   /* Sai người mua lén ngoài cung (jveil mạng che mặt; the bạc is paid at the order, the veil comes with the person) */
 mktspy:{o:0,n:2},  /* Sai tai mắt dò bên chủ hội (jmkt; bạc paid at the order, no khắc before, none now) */
 summon:{o:1,n:2},  /* SUMMON (D ruling 18/11: a send): Truyền thái y · Mời thái y bắt mạch · Truyền họa sư / nhạc sư vào cung: the messenger goes,
                       the person called comes at the due khắc and does the work then (the old k was the visit: o = 1 = the order) */
 giftin:{o:0,n:2},  /* TWO-WAY: an NPC sends a servant with a gift to her (the NPC's deed already paid its khắc): the servant is away n, the gift arrives at due */
 npcinv:{o:0,n:2},  /* TWO-WAY: an NPC host sends word (AG cx3:invite2): her servant is away n, the guest / her invitation lands at due */
 shop:{o:0,n:2},    /* Nhờ thái giám mua đồ (PEND.shop): the eunuch goes for the tray (no khắc before, none now), the tray comes at due */
 },
 repMax:8,          /* the most unread reports of hers kept behind the «tin» icon (older ones count as read) */
 taskMin:1,         /* FAIL 4 item 2 (law 3): the least khắc «Giúp qua loa» (any receiver answer that does the deed) costs her; hết lòng is always one more (jptime ptRecvN) */
 ansK:2,            /* an order to her (maid road) waits as a notice; unanswered after ansK khắc = «Từ chối» with its cost (OD 18/11 ~21:15Z) */
 errRefuse:3,       /* «Việc chủ sai» (a harmless errand): Từ chối = Chủ tin −errRefuse (no one to tell on: 3 answers) */
 errHalfTin:1       /* «Việc chủ sai»: Giúp qua loa = the same công lao, done sloppily: Chủ tin −errHalfTin, n − 1 khắc */
}});
/* ERRAND SCENE (owner OD 18/11 ~20:05Z..~20:20Z, jerr): n = khắc the person she sends stays away (counted from the tap, the walk included) when the parallel-time core
   (jptime BAL.ptime.kinds[k].n) is not in the build; the scene reads the ONE state through the jerr adapter either way. msWalk = one walk off / on stage (ms, x BAL.pace via kitPace). */
Object.assign(BAL,{errand:{n:2,msWalk:650,offer:45}});/* offer (review/errand-bal, law 1 + 4): the chance a master sends her servant on an errand in a buổi — her maid card «Việc chủ sai» (SRVA.errand, j42) and every NPC servant in the day record (j95plan) roll this one number (was 45 on her card, 15 for the NPC: the card value kept) */
/* ROLE PARITY part 2 (owner OD 18/11 ~21:30Z; law 1 two-way + law 4 one core): the NPC side of her buttons that had none (jagacts4 cx4:*).
   Costs / odds / gains are the player's own rows (BAL.btn.kidCare/kidGuard + BAL.bacFee, BAL.cyc, BAL.ration, IROUTE in j83, BAL.odb.j22);
   here only the WORTH of each deed to an NPC (g = needs it serves, as BAL.ag.par3) and its gates.
   kidGuard.host = hostility of some consort toward her before she pays for a guard; ill = Đồ cấm routes: malice = the character gate of the
   old monthly road (now a choice), keep = bạc she keeps after paying, w = how much she wants each poison; rouge.g = worth of a missing box;
   man = the forbidden road with a man: sungBelow = a neglected consort (the old affair start rule), cutRisk = lộRisk at which «Cắt đứt» serves her safety. */
BAL.ag.par4={on:1,kidCare:{g:{"kid":3}},kidGuard:{host:40,g:{"safe":2,"kid":1}},cyc:{g:{"safe":3,"kid":2}},
 rouge:{g:{"sung":1,"danh":1},steal:{g:{"sung":1,"spite":1}}},ill:{malice:60,keep:20,w:{hacdinh:6,xahuong:5,botngua:4},g:{"spite":4}},
 man:{sungBelow:30,cutRisk:50,g:{hail:{"sung":.5},flirt:{"sung":1.5},token:{"sung":2},tryst:{"sung":3,"rest":1},cut:{"safe":3}}}};
/* MINISTER AGENTS (jagmin, PARKING LOT #7): every court memorial has a real living official with his own goal.
   gT = nết word → goal (first match in this order; none → dflt, the censor → nsDflt); fit[goal][memorial kind] = how much that kind serves
   his goal; praise/dich/imp/tuyen/cc = the stake scale of each kind (see jagmin minCands); imp.keep = months an official whose inquiry found a father clean waits before impeaching him again; imp.deep = feud weight of an open enmity (read by j55 tdImpPick too); tuyen.pow = the strong-house gate (read by j55 tdSoMonth too); imp.noEv = an upright (liem) speaker with no
   evidence in his house's hands holds back to this share; spk = weight of court standing (pow) when several officials want to speak;
   ns = the censor (Tả đô ngự sử, Đô sát viện; history expert 19/11): age/pow/sk draw [base, spread]; afW = how much his regard for a
   consort lowers the can-chính risk and his will to impeach her (af 100 → × (1 − afW)); npcGift = a worried NPC consort's will to send him
   gifts (× her can-chính risk / ccMax); ccMax = ccRisk's top. */
BAL.ag.min={on:1,gT:[["Tham vọng","quyen"],["Vì gia tộc","nha"],["Vì mình","loi"],["Trọng nghĩa","liem"],["Thật thà","liem"],["Cương trực","liem"]],dflt:"le",nsDflt:"liem",
 fit:{quyen:{praise:.5,dich:.5,imp:1.5,tuyen:1.2,cc:.6},nha:{praise:1,dich:1.2,imp:.6,tuyen:1.5,cc:.4},loi:{praise:.8,dich:.4,imp:.8,tuyen:.8,cc:.8},
  liem:{praise:.6,dich:.8,imp:1.2,tuyen:.2,cc:1.5},le:{praise:.8,dich:1.5,imp:.5,tuyen:.6,cc:1}},
 praise:50,dich:50,imp:{ev:1,noEv:.3,deep:3,keep:12},tuyen:{pow:65,p0:55,d:10},spk:{base:.5,pow:100},
 ns:{age:[50,15],pow:[45,20],sk:[40,30],afW:.5},npcGift:30,ccMax:45};
/* TRIỀU ĐÌNH gift deed (j55 tdGift, her and every NPC consort, house heads and the censor alike): giftAf = regard a received gift adds;
   backs = regard from which an official stands behind / spares that consort (tdBacks). Were typed in j55 (+20, 40) — ONE CORE (review minister-agents r1). */
BAL.tdCourt={giftAf:20,backs:40};
/* PERSON MINIGAME ACTS (jpma, owner OD 19/11 ~23:55Z, PARKING_LOT #8; plan dev/handover/reports/person-minigame-acts.md) — «Cùng chơi» + «Thách đấu»
   with any real person (her ↔ NPC ↔ NPC, co-op friend). ONE CORE: every number of jpma lives here.
   occ pm = the board of a person duel / pastime (jmgt mgTier): base + perRank · R, R = the HIGHER rank of the two (one board for both; harder as she climbs, law 5).
   kc: khắc the asker spends when she sends it (her talk card shows it; an NPC's day plan charges the same kc). luck: the skill range of the 1-vs-1 score (= j82 default).
   play: «Cùng chơi» gain-only (law 3) — liking both ways by the game's mean raw: raw ≥ cut[i] → aff[i+1] (else aff[0]); suc = the receiver's Sức (her time);
         xp = art practice points for both (addArt for her, the same on an NPC's artp); fade = the same pair again this month gives 1/(1+n) (the P3T idiom).
   stake.bac[R] = V, the value of a duel stake by the higher rank (law 5: rises with rank); band = an item stake's price within V·(1 ± band);
   val = the exchange rates the equal-value measure (dev/measure/pm-equal.js) uses: Danh in bạc (charity BAL.charity 35 bạc → Danh 5 + Đức 3),
         one point of someone's liking in bạc («Giúp đỡ nàng» 20 bạc → thiện cảm 10 both ways), oán, khắc, Sức. eqTol = the most two answers / stakes may differ (bạc).
   duel: (round C: the public Danh ± now comes from the real watchers, BAL.pm.eye) shame = extra Danh a HIGHER-rank loser loses per rank of gap (max shameMax); oan = her oán of the winner.
   yield («Nhường», the challenged side when the challenger outranks her): no game, she pays the stake; the challenger's liking + round(V·yieldK/affBac), oán − yieldOan.
   refuse: the challenger outranks the receiver → his/her liking of the refuser − up more (rank etiquette; the rcvNoO cost applies to every refusal).
   npc: gapW = weeks between two pm acts of one NPC; me = at most per week aimed at her; g = the need weights of the day plan; minAff / spite = who they pick;
        meShare = when she is among the people an NPC may pick, the share of picks that land on HER (hashed, no global dice; law 1 two-way + 6b: the court
        watches the rising one, so NPCs really invite / challenge HER; the rest go to the other NPCs by liking / spite; meGap = weeks with no NPC asking her
        after which an NPC who may pick her (likes or resents her, as for anyone) picks HER (S.pmMeL = the last week one did; old saves: none yet);
        g ×2.5 (20/11) so the court plays / duels a few times a year each. Measured over 200 buổi (dev/test/person-minigame-acts.test.js (6), 4 runs):
        NPC → her 6–18, NPC → NPC 13–38 (was her 0–3 with no meShare / meGap and g 4); foreman E #14 ruling 20/11: NPC → her ≥ 4).
   oddsN = draws behind her ladder word (no %, law 7). */
Object.assign(BAL.mgTier.occ,{pm:[1,.5]});
BAL.pm={kc:1,luck:30,minLv:1,
 play:{cut:[4,7],aff:[2,3,5],suc:6,xp:1,fade:1},
 stake:{bac:[6,8,10,12,15,18,22,26],band:.3},
 val:{danhBac:5,affBac:2,oanBac:1,khacBac:6,sucBac:1},eqTol:8,
 duel:{shame:1,shameMax:3,oan:4,yieldK:.7,yieldOan:2},
 refuse:{up:1},
 mem:{pmplay:6,pmwin:10,pmyield:10},
 npc:{gapW:2,me:1,meShare:.4,meGap:6,g:{play:{ally:10},duel:{spite:10,danh:3.75}},minAff:0,spite:3},
 oddsN:120};
/* receiver weights for a pastime / duel ask (jrcv rcvPick): no «mách lẻo» slot */
BAL.pm.rcvOff=[3];/* receiver answer slots a pm ask does NOT have: slot 3 («mách lẻo»); Nhận · Nhường · Từ chối keep the help weights */
BAL.rcv.k.pm=BAL.rcv.k.help.map((w,i)=>BAL.pm.rcvOff.includes(i)?0:w);
/* ROUND C (owner OD 20/11 ~01:00Z "Làm cả 4 luôn đi"; review/person-minigame-acts-c, jpma §C):
   live = the co-op live board (Q-C2): tx = ms between two running-score sends, wait = ms the friend has to open the board / send her end before the
     own-hand path, mv = ms of her silence on her Cờ turn before the AI takes her side with her own hand;
   ky = the real 7×7 Cờ board (j5 gKy rules) in a person act: the white AI's noise = base − k·(opponent's duel score − her talent) − rankN·R, clamped
     min..max (less noise = fewer blunders); tut = the noise of the guided round; guard = ms before an unfinished board ends; win / draw / lose[her longest
     run] = her raw (0–10) for the result card and «Cùng chơi»;
   eye = onlookers (real people at that place): max watchers counted, danh = Danh per watcher to the winner and from the loser (≤ danhMax), kinh = liking
     of a watcher who likes the winner (≥ likeMin), ghen / oan = a watcher who resents the winner (spite ≥ spite): jealousy toward her / grudge toward an NPC;
   lad = the per-art palace ladder: arts on the ladder, top = Danh each month for places 1..n, reach = how many places above an NPC may challenge,
     gapW = weeks between two ladder challenges of one NPC, refuseDrop = places a refused ladder challenge costs (0: pm-equal law 2 — a drop made «Từ chối» worth
     13 bạc less than «Nhận lời»), g = day-plan weight (need danh). One place is worth mean(top) Danh a month (pmPlaceBac); «Nhường» a place earns that much liking. */
Object.assign(BAL.pm,{live:{tx:700,wait:45000,mv:90000},
 ky:{base:120,k:3,min:10,max:220,rankN:8,tut:220,guard:1800000,win:10,draw:5,lose:[0,0,1,2,3,4],
  ai:{w:[0,1,8,60,600,9000],atk:1.1,mid:3,midW:6,lvN:35,lvN0:10,think:420,endMs:600,loseMs:800}},/* ai = j5 gKy's own scoring (run weights, attack ×, centre pull) and pacing (ms), kept */
 eye:{max:6,danh:1,danhMax:4,kinh:1,likeMin:20,ghen:3,oan:2,spite:3},
 lad:{arts:["dan","co","ve","mua","tho","huong","banh","theu","dauho"],top:[3,2,1],reach:2,gapW:3,refuseDrop:0,g:{danh:5}}});
Object.assign(BAL.pm.mem,{pmsaw:4,pmlad:8});
/* PALACE CHATTER (PL#6 bubble talk, jchat.js; owner OD:L1627 (5) "every 1–2 min NPCs chat"): gap = seconds between two chatter ticks (real time),
   retry = seconds to look again when the stage is busy (dialog / hidden page), maxBub = bubbles on one stage at once, turnGap = ms between two lines of
   one exchange, say = how long a line stays (ms: base + ch per letter, clamped min..max), noRepeat = exchanges / greetings said before one may come back,
   mem = remembered keys (ring), greet = arrival greeting (delay ms, wait ms per retry while a dialog is open, tries), w = pick weights (hap = chance a
   happening pair talks first, 1 = always while the deed is on (owner OD:L1627 (5)), idle topics only after its pool is spent; srv / friend / rival / base pair weights; solo = one person speaking to her). on:0 turns the whole feature off. */
BAL.chat={on:1,gap:{min:60,max:120},retry:20,maxBub:2,turnGap:500,say:{base:1400,ch:55,min:2600,max:6000},noRepeat:60,mem:400,
 greet:{delay:900,wait:1500,tries:20},w:{hap:1,srv:1.2,friend:1.5,rival:1.3,base:1,solo:.6}};
/* kitGameVs (K-PM-1, owner OD 20/11 ~01:00Z item 1, KIT §13.8): the live head-to-head split board «Thách đấu»; knobs only, the game that mounts it owns every rule number */
BAL.gameVs={pop:320,warn:.2,end:900};/* pop = ms of the score bump; warn = share of the round clock left at which a clock chip turns red; end = ms the result banner takes to settle (all three still under reduced motion) */
/* KP03 children living rules (jkidlife; OD:L87 + PLACES_PLAN §5 "Móc lối chơi"): Mẫu tử = k.hM (the same bar the princesses have, j54) for every child.
   estr  = Mẫu tử per month a child who lives away (prince 6+ at A ca sở / Đông cung, a mother in lãnh cung) was not seen · visit / call = Mẫu tử when she
   goes to see the child / calls the child home (once a month each child) · callK = khắc of «Cho gọi con về» · callTal = the lesson the child misses (Tài) ·
   npcSee = an NPC mother's monthly chance to see her son who lives away (two-way) · heirDanh = Danh of the mother when her son is made Thái tử (lost again
   when he is put aside) · heirGhen = envy of the others at that day · ward = an orphan (mother dead / lãnh cung) goes to the Hoàng hậu (her or an NPC; none
   → Thái hậu): Danh of the foster mother on the day · succHoa = Mẫu tử ≥ hi / < lo moves the succession "mẹ con" (j99succ hoa) +1 / −1 · hm0 = first value */
BAL.kid={estr:-3,visit:4,call:3,callK:1,callTal:1,npcSee:60,heirDanh:10,heirGhen:6,ward:{danh:3},succHoa:{hi:75,lo:35},hm0:[55,16]};
/* DRESS CODE (PARKING #11, review/dresscode, jdc.js; owner 20/11 ~19:00Z, verbatim dev/PARKING_LOT.md rows 11 + 11b; expert pass dev/handover/reports/dresscode-expert.md).
   fam  = the ONE small set of basic colour families (owner: "những cái màu cơ bản thôi"); every shade maps to one (hồng phấn / hồng đào / peach → hong …). hex = the dot colour (KIT REQUEST kitColDot).
   who  = Foreman C's palette per painted identity [main, secondary] (consorts c01–c32: handover dev/art/t8-prompt-B/build.py DATA; maids m01–m52: dev/art/face-common/m_colours_proposed.json FINAL Lượt 603;
          old looks: dev/figwork/jobs.json signature colour). tier: t7 (Hoàng quý phi) adds gold as the secondary, t8 (Hoàng hậu) is gold first (Foreman C t7/t8 colour rule); cold = the undyed lãnh cung linen.
   piece= [main, secondary] of every trâm / hoa điền (from the piece's name and its j92 colour word); a robe's colours are the colours of the PAINTING the wearer shows (owner 11b: screen = rule),
          wcol maps the j92 one-word colour for a person with no painted identity (fallback only).
   season: a robe's season = its fabric (Qing 換季: gauze in summer, fur in winter, announced by the court); fab = the seasons as letters of k (x Xuân · h Hạ · t Thu · đ = d Đông). Cost per tuần worn off-season, by rank 0..7 (law 5),
          the same for every consort (law 1); npcMiss = % (per consort, per season, hashed) that an NPC forgets to change.
   fest: per festival (FEST key): need = the two families of the day, ky = taboo robe colours, gate 1 = turned away at the door when she shows NONE of the need (the only turn-away rule).
   kyOn: a taboo robe counts as one more missing colour ONLY when the robe colour can be changed (PARKING 11c recolour); 0 until then — the robe is her painting (review r1 fix 4).
   needN by rank: how many of the two she must show (Đáp ứng–Quý nhân 1, Tần and up 2; law 5). cut = per missing colour (a taboo robe counts as one more): phần off her festival-contest score, Danh off.
   bor: borrow an accessory (slot list sl; only pieces shown on her: owner 11b) from a consort whose thiện cảm toward her ≥ fav; it costs khac khắc and use thiện cảm of the lender; she lends back the same way (thanks). max lenders offered.
   chg: change to her own trâm of a needed colour (khac khắc; max pieces offered). Borrowing is offered only for a needed colour her own chest cannot cover (law 2). buy: the third road for her AND NPCs — the cheapest trâm of a missing colour at or under her phẩm from Nội vụ phủ (its j92 price in Bạc + khac khắc). stay: excuse herself at a strict festival (Sức gain; the festival's events are missed). */
BAL.dc={on:1,
 fam:{hong:{n:"Hồng",hex:"#e48aa4"},cam:{n:"Cam",hex:"#e0904a"},do:{n:"Đỏ",hex:"#c8372d"},vang:{n:"Vàng",hex:"#e7b93e"},luc:{n:"Lục",hex:"#5f9a5f"},
  lam:{n:"Lam",hex:"#4f74a8"},tim:{n:"Tím",hex:"#8a5fa8"},trang:{n:"Trắng",hex:"#f4efe4"},den:{n:"Đen",hex:"#2a2420"},nau:{n:"Nâu",hex:"#8a5a3a"}},
 who:{c01:["do","vang"],c02:["lam","trang"],c03:["luc","trang"],c04:["tim","tim"],c05:["lam","vang"],c06:["do","trang"],c07:["tim","hong"],c08:["hong","luc"],
  c09:["lam","trang"],c10:["hong","trang"],c11:["tim","trang"],c12:["luc","trang"],c13:["cam","trang"],c14:["vang","trang"],c15:["hong","trang"],c16:["luc","trang"],
  c17:["hong","vang"],c18:["hong","tim"],c19:["tim","hong"],c20:["hong","luc"],c21:["do","hong"],c22:["tim","hong"],c23:["do","vang"],c24:["do","trang"],
  c25:["do","den"],c26:["do","vang"],c27:["do","trang"],c28:["luc","trang"],c29:["lam","trang"],c30:["lam","trang"],c31:["luc","trang"],c32:["trang","lam"],
  m01:["luc","tim"],m02:["luc","hong"],m03:["lam","trang"],m04:["cam","lam"],m05:["do","lam"],m06:["lam","cam"],m07:["luc","do"],m08:["hong","luc"],m09:["hong","lam"],
  m10:["luc","hong"],m11:["lam","hong"],m12:["cam","tim"],m13:["tim","lam"],m14:["trang","luc"],m15:["hong","lam"],m16:["tim","luc"],m17:["luc","hong"],m18:["lam","hong"],
  m19:["cam","lam"],m20:["lam","cam"],m21:["luc","hong"],m22:["hong","luc"],m23:["cam","lam"],m24:["luc","tim"],m25:["tim","do"],m26:["hong","lam"],m27:["luc","do"],
  m28:["hong","lam"],m29:["luc","hong"],m30:["tim","luc"],m31:["cam","tim"],m32:["luc","tim"],m33:["tim","cam"],m34:["hong","lam"],m35:["luc","hong"],m36:["trang","lam"],
  m37:["lam","do"],m38:["cam","luc"],m39:["lam","trang"],m40:["hong","lam"],m41:["luc","hong"],m42:["cam","luc"],m43:["lam","hong"],m44:["trang","hong"],m45:["lam","tim"],
  m46:["do","lam"],m47:["tim","luc"],m48:["trang","luc"],m49:["lam","trang"],m50:["hong","lam"],m51:["luc","do"],m52:["tim","luc"],
  look1:["tim","trang"],look2:["hong","trang"],look3:["luc","trang"],look4:["hong","trang"]},
 tier:{t7:"sec-vang",t8:"main-vang"},cold:["trang","trang"],
 piece:{tram_dao:["nau","nau"],tram_dong:["vang","trang"],tramngoc:["luc","trang"],tram_hoalua:["hong","luc"],tram_ngoclan:["trang","trang"],thoa_diep:["trang","lam"],
  tram_hong:["hong","trang"],thoa_vang:["vang","vang"],tram_phithuy:["luc","hong"],boodieu:["vang","vang"],dientu_thuy:["lam","vang"],bd_phuong:["vang","trang"],
  tram_maudon:["do","vang"],diemthuy_cuu:["lam","vang"],kimthoa_phuong:["vang","do"],tramphuong:["vang","do"],phuongquan:["vang","do"],
  nt_nhuy:["luc","vang"],nt_haiduong:["hong","vang"],nt_dongchau:["trang","vang"],
  hd_mai:["trang","vang"],hd_dao:["hong","vang"],hoadien_bac:["lam","trang"],hd_diep:["lam","vang"],hd_lan:["luc","vang"],hd_sen:["hong","do"],hd_maudon:["do","lam"],hd_phuong:["vang","do"]},
 wcol:{nau:"nau",vang:"vang",xanh:"luc",hong:"hong",trang:"trang",lam:"lam",do:"do",tim:"tim"},
 season:{n:["Xuân","Hạ","Thu","Đông"],
  k:"xhtd",fab:{vai:"xhtd",lua:"xht",sa:"h",the:"h",gam:"xtd",cat:"xhtd",trieu:"xhtd",long:"d"},
  fabN:{vai:"vải",lua:"lụa",sa:"sa mỏng",the:"the mỏng",gam:"gấm dày",cat:"cát phục (may theo mùa)",trieu:"triều phục (may theo mùa)",long:"lông thú"},
  y:{y_cungnu:"vai",y_luamoc:"lua",y_chuongsu:"vai",y_nuquan:"vai",y_mama:"vai",y_hoanho:"lua",y_saxanh:"sa",y_maimai:"gam",y_vanthuy:"lua",y_lan:"the",y_tramnep:"lua",
   y_haiduong:"gam",y_chimen:"lua",y_maudon:"gam",y_hac:"cat",y_kimtuyen:"cat",y_vancam:"gam",y_trieutim:"trieu",y_bachdieu:"gam",y_minhhoang:"trieu",y_phuongbao:"trieu",
   nt_longchon:"long",nt_bachhoa:"cat",nt_hocuu:"long",y_tang:"vai"},
  danh:[0,0,1,1,2,2,3,3],th:[0,0,1,1,1,2,2,2],npcMiss:15},
 fest:{newyear:{need:["do","vang"],ky:["trang","den"],gate:1},nguyentieu:{need:["do","cam"],ky:[],gate:0},thanhminh:{need:["luc","trang"],ky:["do"],gate:0},
  doanngo:{need:["luc","vang"],ky:[],gate:0},thattich:{need:["hong","tim"],ky:[],gate:0},vulan:{need:["trang","lam"],ky:["do"],gate:0},trungthu:{need:["trang","vang"],ky:[],gate:0},
  vantho:{need:["vang","do"],ky:["trang","den"],gate:1},trungcuu:{need:["vang","do"],ky:[],gate:0},thanhtho:{need:["do","vang"],ky:["trang","den"],gate:1},
  dongchi:{need:["lam","den"],ky:[],gate:0},lapbat:{need:["nau","vang"],ky:[],gate:0},giaothua:{need:["do","vang"],ky:["trang"],gate:0}},
 needN:[1,1,1,2,2,2,2,2],
 cut:{phan:[3,3,4,5,6,7,8,9],danh:[1,1,1,2,2,2,3,3]},
 bor:{sl:["tram"],fav:20,use:6,thanks:5,khac:1,max:2,wait:4/* tuần a loan to the other co-op seat waits for its «dcin» before the book line is dropped */},chg:{khac:1,max:2},buy:{khac:1},stay:{suc:8},kyOn:0};
/* jkcg (GAP OR01/OR06/OR08/OR14, review/outside-gaps; OUTSIDE_PLAN §6 §9 §11): fest = home festivals played as the real mini-game: raw 0..10 ≥ top = first
   (Danh +danh[0]), ≥ ok = praised (+danh[1]), else Danh −danh[2]; skip = the quick option's score (same 5/10 as Phúc tuyển), bot = [base, spread] quick score;
   sister moves sisP % of the time (+sis[0] when she lost, +sis[1] when she did well). vpSac / vpRare = the old kcFest gate to the Vương phi rare.
   carry = palace entry: cap (each of Sắc/Tài/Tâm cơ/Đức/Sức at most cap over its home-road start; 0 = off). OUTSIDE_PLAN §9 asked +15, but the later
   owner rule OD:L1287/L1288 (waiting must be worth the same months in the palace; BAL.kcv calibrated with dev/measure/kc2val.js WITHOUT a cap) wins:
   kc2val home arm on this build (tt/muoi/thd/dtq, 3 lives each, 20/11) — a +15 cap would cut 49–91 Tư chất points per life (mean ≈ 77), so it is OFF; ldOld (Lời đồn ≥ → «lời đồn cũ» flag),
   dad {mid,k} (Phụ thân thiện cảm − mid) × k added to «Nhờ cha dâng sớ» odds, danhK/danhMax/bacMax/sung (were typed in kcEnter).
   home = letters/gifts from Mẫu thân while she is in the palace: p + (af − mid) × pk % a month unasked (giftShare % of them a gift), khac = khắc of each «Thư nhà» act, writeO / giftO base odds
   (+ (af − mid) × k), writeBac / writeAf / lostDanh / askAf = the two «Thư nhà» acts, know = j61 intel depth, keep = letters listed, gifts = items home sends.
   ld = «lời đồn cũ» event: p % a month; own (admit) / wit (mother's letter, witBac, witO odds, foe Danh −witFoe and Oán witOan, lose Danh −witLose) / wait.
   Law 2 (review r1): writeBac 5→15, askAf 3→1 — writing (af +, a letter item Sức+10/Đức+2, true intel) dominated asking (af −, one gift item worth 6–30 bạc).
   title = «Khuê các» titles: tier, rare tier, quyRank (Quý nhân), carry (worn again in later lives). */
BAL.kcg={fest:{top:8,ok:5,danh:[4,2,1],skip:5,bot:[3,6],sisP:50,sis:[3,1]},vpSac:80,vpRare:.4,
 carry:{cap:0,ldOld:40,dad:{mid:50,k:.3},danhK:.6,danhMax:30,bacMax:400,sung:[8,5]},
 home:{p:8,mid:50,khac:1,pk:.2,giftShare:30,writeO:70,giftO:60,k:.3,writeBac:15,writeAf:4,lostDanh:1,askAf:1,know:2,keep:12,gifts:["tuithom","luahang","huongtram","khantay"]},
 ld:{p:6,own:{danh:4,duc:2},witBac:10,witO:55,witFoe:4,witOan:6,witLose:6,wait:{danh:2,tamco:1}},
 title:{tier:4,rare:6,quyRank:2,carry:1}};
/* jkcco (GAP OR13 co-op half, review/outside-coop; OUTSIDE_PLAN §13): the friend at home <-> the friend in the palace, both ways.
   letter: o odds, suc Sức price, bond tình hảo hữu (S.rl[friend]) when kept, lost = Danh (palace) / Lời đồn (home) when it fails, know = j61 level,
       burn = Tâm cơ for «Đọc xong đốt đi» (law 2, review r1).
   gift: wait = turns until the visiting day, pickMax = items listed (newest first; 3 + «Thôi» = 4 options while the kit T3 frame crushes 5+ options on the Fold, KIT_REQUESTS 20/11 review r1), back* = the receiver's «Trả lại quà» (Đức gain, bond loss).
   so: odds = o + house power*powK (+ father's liking - mid)*afK at home; pow = house power moved; rel = j55 relation between the two houses;
       danh = the receiver's name gain on «Đội ơn», beDuc = its Đức loss (seen as one faction, law 3, review r1); noDuc = Đức for «Xin thôi»;
       af / lost = the sender's price when it fails.
   rumour: o odds, bac / suc = the two equal roads (law 2), n = Danh / Lời đồn moved, lost = the sender's Danh when traced, bond = tình hảo hữu;
       fix = the receiver's answer to a bad rumour: o + her Danh*k, bac / suc roads (law 2), duc = «Mặc kệ» gain.
   join: o + her Sủng*k = «Xin ban nàng về ở cung mình» odds, suc price, sung = loss when refused, bond / greet = tình hảo hữu.
   kh = khắc each act costs (letter / gift / so / rumour); keep = list lengths, resend = seconds between relay resends. */
BAL.kcco={letter:{kh:1,o:70,suc:10,bond:4,lost:2,know:2,burn:1},gift:{kh:1,wait:1,pickMax:3,bond:5,backDuc:1,backBond:4},
 so:{kh:2,o:35,powK:.4,mid:50,afK:.3,suc:15,pow:4,rel:6,danh:3,noDuc:1,beDuc:1,bond:3,af:4,lost:2},
 rumour:{kh:1,o:60,bac:12,suc:12,n:3,lost:2,bond:3,fix:{o:45,k:.3,bac:10,suc:10,duc:1}},
 join:{o:55,k:.3,suc:10,sung:2,bond:8,greet:3},keep:12,resend:15};
/* jkc3 HOME CHAPTERS (GAP OR03–OR10): the calendar of the home arcs, the roster people, the home events E9 / E15 / E28, the early roads.
   cal: o0 months to the first beat · gap [min, +roll] months between beats · tP odds of a turn beat · min beats an unopened arc needs · fin spare months before Sơ tuyển.
   win Lợi thế for the win ending of an arc with no fixed ending · scOdds odds per Lợi thế at a climax · plan.ke odds of «Kế mẫu» over «Hôn sự» when the mother lives.
   ros: starting favour [base, +roll] · me = her own liking · baSanh odds the bà mối sits in the chính sảnh while a match is open.
   thay: t favour for tier 1 / 2 · mul lesson speed per tier · hau / bieu / truyen the three teacher acts. entry: rank index of the early roads (1 = Thường tại). fx: every arc's option / ending numbers (BAL.arc.fx format). */
Object.assign(BAL,{kc3:{cal:{o0:2,gap:[1,2],tP:65,min:3,fin:1,nc:[1,2]},win:3,mid:1,scOdds:7,plan:{ke:50},
 ros:{me:[30,20],nm:[60,25],ba:[25,20],thay:[20,20],sx:[30,30],baSanh:60,age:{nm:[56,10],ba:[40,9],thay:[34,12],le:[52,12]},
  sxAge:{hau:[20,5],quan:[22,5],than:[24,4],thuong:[30,8],lao:[56,8],def:[24,6]},
  pool:{mama:["mama","maid"],maid:["maid","mama"],man:["man","official"],official:["official","man"]},noFid:["man:vuonggia","man:thaiy","emperor:","thaihau:"],pref:{hoa:["man:hoasu-1"]}},
 thay:{t:[45,75],mul:[1,1.25,1.5],hau:{k:2,suc:-10,af:7},bieu:{k:1,bac:-15,af:7},truyen:{k:2,suc:-15,danh:3,art:8,tier:2},leMax:5},
 nm:{ke:{k:1,tamco:1,af:3},do:{k:1,od:40,afD:4,proof:1,oan:6,af:-5,oanMin:12},an:{k:2,suc:20}},
 ba:{bieu:{k:1,bac:-20,af:10,q:10},khe:{k:2,suc:-10,kap:-8,af:4}},
 ev:{mebenh:{t0:6,p:6,af:10,y:{bac:-40,od:55},hau:{suc:-30,od:50}},divat:{hua:{duc:3},hoi:{tamco:3,proof:1}},
  xemmat:{dep:{suc:-10,od:45,sacD:3,kgt:4,kap:10,af:8,kgtF:-3},gian:{duc:2,kap:3},muoi:{af:8,danh:2,kap:-4,p:50}},
  hac:{t0:8,p:8,lo:{khm:40,od:60,pow:4,powF:-6,af:10},ha:{pow:-8,kgt:-4,af:-4,duc:3},tra:{suc:-15,od:30,tcD:3,pow:3,af:6,kgtF:-5,afF:-4}},
  vh:{duc:3},th:{go:10,wait:6,duc:2},qMax:2},
 entry:{th:1,vh:1},tier:{win:1,mid:0,lose:-1},seedP:50,thdTro:40,rare:{dtqSuc:90,muoiTc:60,dtqOc:1,r4:.6,r6:.8,r1:{h:80,loyal:60,kld:55,p:.6}},gtuMin:10,know:{foe:2},intel:{n:1,st:2},fx:{}}});
/* GAP IT03 wear slots «Hoa tai» + «Giày» (owner OD L175 "more wear slots with real rules … using existing item art; rank + luxury rules per slot";
   owner 20/11 ~06:55Z «Đeo» from Tư trang; 20/11 Lượt 1054: consorts enter the palace WITHOUT earrings and get them later as rewards; girls on the home road need none).
   Same model as Đeo tay / Đeo eo / Túi thơm (jinv): one item per slot; w = stat while worn (×1.5 above her rank, as every worn piece); rk = lowest rank
   that may wear it (above = vượt phẩm, the one j8/jwdinv rule); pr = price (luxury = the one luxVal: grade of the painting + pr/10); tg = gift likes.
   best = the j8 BEST reward lists (the Emperor's rewards, player and NPC alike) that may hand it out; shop = sold by Nội vụ phủ (SHOP_ALL).
   Earrings are REWARDS only (shop 0, owner Lượt 1054 'được thưởng những cái hoa tai'); shoes are sold too. */
BAL.wearSlots={
 ear:{hoatai:{n:"Hoa tai ngọc trắng",pr:40,rk:0,w:{sac:2},tg:["hh","rv"],best:["night","birthday"],shop:0},
      hoataivang:{n:"Hoa tai vàng khảm trân châu",pr:130,rk:3,w:{sac:3,danh:2},tg:["rv"],best:["contest","promo"],shop:0}},
 shoe:{giayhoa:{n:"Giày thêu hoa mai",pr:15,rk:0,w:{sac:1},tg:["rv"],best:["night"],shop:1},
       giaygam:{n:"Giày gấm mẫu đơn đính trân châu",pr:70,rk:2,w:{sac:2,danh:1},tg:["hh","rv"],best:["birthday","promo"],shop:1}}};
/* CUNG NỮ THÂN CẬN (jtc, owner OD 20/11 ~15:55Z, review/thancan): rk = the maid rungs that may be raised (SRK.maid 1 tam đẳng … 3 nhất đẳng); the trust
   bar is BAL.loy.trust. pick: her lòng +loy, Bạc -bac (her master's thân cận uniform is sewn), every other maid of the house lòng -envy (law 3: gain and loss);
   drop: the dismissed maid lòng +loy (negative), the others lòng +calm. npc: an NPC master with none picks her most loyal trusted maid at p (in 100)
   a month; lets her go when her lòng falls under drop. */
BAL.thc={rk:[1,3],pick:{loy:10,bac:30,envy:3},drop:{loy:-15,calm:2},npc:{p:25,drop:45}};
/* review/bongloc-options (M83, owner 21/11 ~05:39Z): «Đòi lại phần bị cắt xén» when she has no cung nữ to send — she goes to Nội vụ phủ herself.
   Odds = BAL.stip.askBase + Danh / danhD + Sủng / sungD − sup (a superior is behind the cut). Read by jstip stipEvent. */
BAL.blopt={danhD:4,sungD:4,sup:25,
 /* review/bongloc-options r1 (E47r law 4 + 11): the sibling answers on the same frame read here too — Sai <cung nữ> đi đòi: lòng / loyD;
    Tố lên: Hoàng hậu|Thái hậu regard / repStatD, Danh / repDanhD, + repEv per proof found, repRisky when the one she reports to is the one behind it;
    Ghi nhớ: Tai mắt × memEyes. selfKhac = khắc her own trip to Nội vụ phủ costs (the maid's trip is parallel time). */
 loyD:3,repStatD:2,repDanhD:5,repEv:15,repRisky:5,memEyes:10,selfKhac:1};
