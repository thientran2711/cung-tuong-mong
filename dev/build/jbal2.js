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
 /* servant / ma ma road (review/promo-rules): bar and wait by target, index 1..4 = SRK.maid rank, 5 = ma ma */
 srvBar:[0,18,20,22,24,24],srvCd:[1,1,1,2,2,3]};
/* NO-WORD-GAMES family C (jnwq, owner 16/11 07:20Z): the four promotion-exam games (le lay · tc sort · xa clue · thq seat). tier = level tier 0..2 (+shift;
   review/mg-balance's mgTier overrides when present); free = first tier with free placement judged on «Xong» (below it a drop is checked at once);
   n = pieces per round by tier; rounds; lim = seconds per round by tier (rounds × lim stay under the 97 s game guard); idle = seconds before the quiet auto-hint
   (0 = none); hint / auto = score cost of the Gợi ý button / the auto-hint; miss = cost per wrong drop; xaMiss = cost per wrong accusation (2 points a case);
   clues = evidence pictures per case by tier; peek = seconds the model stays when it hides (tier 2). Raw score stays 0..10 like every j82 game. */
BAL.nwq={shift:0,free:2,hint:.5,auto:.25,miss:.8,xaMiss:.9,peek:8,idle:[9,14,0],clues:[2,2,3],
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
  for(let t=0;t<N;t++){let b=-1,bi=-1;for(let i=0;i<E.length;i++){const s=base[i]+smp7(E[i],kind,r);if(s>b){b=s;bi=i}}if(bi===mi)w++}return cl(Math.round(100*w/N),3,97)};
 fxOdds7=function(F,art,meB,seed){const E=[S].concat(liveRivals(true).filter(present7));const r=rng7(seed);let w=0;const N=500;const K=E.map(p=>p===S?art:fxBest7(p,F.arts));const base=E.map((p,i)=>p===S?SC7[art].f(S)+meB:SC7[K[i]].f(p));
  for(let t=0;t<N;t++){let b=-1,bi=-1;for(let i=0;i<E.length;i++){const x=base[i]+smp7(E[i],K[i],r);if(x>b){b=x;bi=i}}if(bi===0)w++}return cl(Math.round(100*w/N),3,97)};
})();
/* the Emperor tires of accusations: every accusation an accuser brought in the last 36 tuần (a year) lowers the odds of her/his next one by accTire points
   (same rule for every accuser; the odds word shown is the real one) */
Object.assign(BAL,{accTire:10});
(function(){try{const A=ACT.accuse,f0=A.f;A.f=function(a,t){try{a.accL=(a.accL||[]).filter(w=>wk()-w<36);a.accL.push(wk())}catch(e){}return f0.apply(this,arguments)}}catch(e){}
 const o0=oAccuse;oAccuse=function(a,t){const o=o0.apply(this,arguments);if(!BAL.accTire||!a)return o;const n=(a.accL||[]).filter(w=>wk()-w<36).length;return n?cl(o-BAL.accTire*n,5,95):o}})();
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
 life:{show:0,care:1,careAdd:1,careMax:3,cureTy:40,careYt:2,cureOther:20,cureSuc:5,careSuc:70,careP:12,careLapse:40,careIll:15,floorMe:0,floorEmp:0,minMo:3,
  dice:{adult:{mean:45,sd:15,lo:15,hi:85},me:"adult",emp:"adult",
        kid:{risk:12,early:[[1,3,5],[3,6,3],[6,10,2]],adult:"adult"}}},
 oldFloor:0,thIllKeep:30,sudden:15,omen:[2,6],omenSt:[1,3],oldAge:55,thDanh:5,maidLoy:40,repl:{young:[22,8],adult:[40,10]},pre:{mo:12,ill:6,suc:2,omenSuc:3},acc:{me:.05,npc:.08,emp:.15},oddP:30,
 emp:{ass:.45,poi:.3,weak:1.2,foil:60,foilLo:20,foilHi:90,rumour:50,rumourMat:2,plotMo:[1,2]},
 illAge:[35,25,1.5],dieAge:[45,15,25],tired:{from:35,per:5,min:4},griefMo:6,griefIll:12,
 birth:{misX:.62,hardX:2,choiceP:35,hardDie:45,hardSuc:35,barrenP:8,stillP:3,stillSuc:20,stillAge:.5,newbornP:3,
  emp:{base:50,sung:.5,th:.2,heirNeed:15,boyGuess:50,boy:10,nhantu:10,datinh:5,mesac:5,lanhlung:-10,chamchinh:-5,hieuthao:2}},
 fate:{phiRank:4,homeRank:1,homeAge:30,homeP:50,tuanSung:60,tuanP:25,tuanDuc:50,tuanTh:40}};
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
Object.assign(BAL,{coopBribe:{pay:20,tin:5}});
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
 show:{o:40,w:8,suc:5,sung:6,danh:2},tea:{minSung:60,p:50,sung:2,an:2}},
 night:{sung:3,an:2,ghen:8,bestow:10,bestowS:4,stealS:3}});
/* ACTIVE MAID LINE (jmline.js, review/servant-system, owner 16/11): % per month unless named. eye[rank] = the Emperor's eye by servant rank
   (thô sử, cung nữ, đại cung nữ, chưởng sự, nữ quan; was 0/0/1.2/1.2/1.2), eyeSung = ×(1 + master Sủng/100 × eyeSung), eyeAge = ages that can rise;
   seekStart (× nết: tham 2, lanh 1.5, trung/nhát 0.3) for seekMonths months, maids up to seekAge, seekMul on the eye while seeking;
   seeNotice = master notices; harsh master: punish → lòng -punLoy, punOut = sent away; master Sủng ≥ useGap under the harem median (r2; was Sủng < 30): use → seekMul × useMul, lòng +useLoy;
   feud = a maid starts a quarrel with a maid of a palace her master's hostility ≥ feudHost (feudPoison of them poison, half the rest frame);
   frameLoy / frameOut (an NPC master throws the framed maid out), poisonDie, hitEv = proof of a beating to the victim's mistress (r2: feudEv replaced by the caught keys below);
   hit = a consort targets a maid of her target's palace; seeMat = Tai mắt that lets her hear of other palaces' maid affairs. */
Object.assign(BAL,{mline:{eye:[.1,.25,.6,1,1.2],eyeSung:.5,eyeAge:[16,29],seekStart:4,seekMonths:3,seekAge:25,seekMul:3,seeNotice:50,punish:60,punLoy:20,punOut:25,useGap:20,use:50,useMul:1.5,useLoy:10,
 feud:3,feudHost:25,feudPoison:10,frameLoy:15,frameOut:20,poisonDie:25,hit:4,hitEv:30,seeMat:3,
 /* review/servant-mline-r1 (ONE CORE): the literals that sat in jmline.js, same values: seekTr = seekStart × by nết; feudFrame = % of the
    non-poison feuds that are a frame (else a fight), fightLoy = lòng +N to both fighters; poisonLv = pzGive level; evN = chứng cứ per piece;
    hitBribeBac / hitBribe = a consort with Bạc ≥ N bribes (%), else a cruel one beats (hitBeat %), else frames; beatLoy = the beaten maid lòng +N;
    ageDef = age when unknown; offRank / offEye = the old rule behind the off switch (rank ≥ offRank at offEye %). */
 seekTr:{tham:2,lanh:1.5,chuyen:1,trung:.3,nhat:.3}/* servant-quality codes, read by qv() (BAL.net.qCode) */,feudFrame:50,fightLoy:2,poisonLv:1,evN:1,hitBribeBac:60,hitBribe:40,hitBeat:55,beatLoy:3,ageDef:20,offRank:2,offEye:1.2,
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
  tho:{fast:[.05,.175],keep:[.5,.5]},doi:{fast:[.05,.425],keep:[.3,.3]},doden:{fast:[.05,.175],keep:[.3,.3]},le:{fast:[.075,.25],keep:[.3,.3]},
  tc:{fast:[.05,.175],keep:[.3,.3]},xa:{fast:[.05,.1],keep:[.1,.1]},thq:{fast:[.075,.45],keep:[.5,.5]},
  kim:{fast:[0,0],keep:[.6,.6]},/* review/mg-tune-r1: Khéo tay (untangle) moved onto mgPace, same curve as its old typed .6+.4·left/LIM */
  banh:{lag:[.6,.08],gust:[.6,.05],gap:[1.4,4]},co:{lim:[8000,20000],fast:[.1,.8],keep:[.6,.6],extra:[5,0]},mua:{beat:[1000,2600],sp:[520,770],retry:[0,1.99]},
  td_hanh:{lim:[8000,20000],short:[2,0]},dauho:{aid:[.14,.6],mouth:[.8,1.3]},td_dung:{band:[.2,.6],kick:[2.4,1]},td_ngon:{band:[.05,.13],win:[1000,2600],rate:[2,.6],fade:[.07,.14]}},
 kG:{td_cong:1.6,td_ngon:2,ban:.8,dan:2.8,den:1.05,hat:.85,duho:1.5,hoa:2.3,huong:3.65,kim:1.8,kinh:1.5,may:1.5,ve:1.7,mua:1.25,theu:5.5,co:3},/* review/mg-balance-2-r1 re-trim on pooled raws (co n=120, td_ngon n=60 float): co 4→3, td_ngon 1.6→2 */
 pace:{fast:[.2,.4],keep:[.5,.8]},word:[3,5,7,9],aid:[3.5,1.5],lesson:[5,8],lessonPts:[2,5,8],fullAt:4,gamma:1,tol:[.45,1,.4],more:2,npc:[4,.4],wk:{lvQ:[0,0,1,1,2,2],th:[6,10,15],cong:[3,2]}}});
/* danh-balance (ONE CORE, owner 16/11 07:25Z): every Danh gate that was a typed number now reads BAL.danhG, and the succession
   condition rows read BAL.succN; values unchanged. forget: j3 "Bị bỏ quên" (Sủng ≤0 and Danh ≤ forget at the two lowest ranks →
   lãnh cung); fatherBook: j4 thầy đồ road "Xin khắc in sách của cha"; thdBook: j97 rare thd_sach; srvWed: j42 servant wedding offer;
   kcVihanh / kcR5: jkc outside-palace rare endings. succN.b* = Thái hậu buông rèm (p b), c* = Nhiếp chính (p c), th*: Thái hậu
   support / opposition, npc* = an NPC dowager's claim, rareCDanh: the rare end check of succRareOK. */
Object.assign(BAL,{danhG:{forget:5,fatherBook:40,thdBook:40,srvWed:20,kcVihanh:60,kcR5:50},
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
/* seat counts per rank (review/seatcap): BAL.seatCap IS j30 SEATCAP (one object, one place): Hoàng hậu 1, Hoàng quý phi 1, Quý phi 2, Phi 4, Tần 6; lower ranks no cap.
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
BAL.steal={cost:{feign:{duc:4},road:{suc:5}},failSung:3,rel:15,ghen:25,
 need:{fav:1,rank:.6,heir:.8},heirHas:.25,friend:60,friendMin:.15,oanW:.5,fear:{gap:3,f:.5},custom:.3,k:.25,pMax:.55,maxTry:2,sucMin:20};
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
/* palace voice (jvoice, VANPHONG §2): mood of an address from the real relation (S.sung − sungMid, S.th / S.hh − favMid, aff()):
   ≥ warm → warm words (ái phi, con, muội muội, tỷ tỷ), ≤ cold → "ngươi"; nuong = first rank called "nương nương" / allowed "bổn cung" (Tần);
   noRepeat = tuần before a pooled line may come back; hi / hq = first rank index of the "hi" (Quý phi) / "hq" (Hoàng hậu) rank band of
   pooled lines (bands: lo < nuong ≤ mid < hi ≤ hi-band < hq); aiPhi = her Sủng from which Hoàng thượng calls her "ái phi" (below: "nàng") */
Object.assign(BAL,{voice:{warm:40,cold:-25,sungMid:0,favMid:0,nuong:3,hi:5,hq:7,aiPhi:40,noRepeat:5}});
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
