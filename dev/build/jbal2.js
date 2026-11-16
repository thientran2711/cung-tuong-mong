/* ================= jbal2: late balance knobs for the merged logic modules (review/balance). Same rule for every consort; numbers only. ================= */
Object.assign(BAL,{illAdd:1,illDie:2});
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
   the Emperor's satiety with one favourite (j75 FAIRN.sat/satO). Same for every consort. */
try{Object.assign(J70CFG,{mot:3,prep:10})}catch(e){}
try{Object.assign(FAIRN,{sat:.2,satO:8})}catch(e){}
/* 8 bottom tabs (owner's choice): j72's "Việc nhờ" tab (data-tab q72) is a sub-tab of Mệnh truyện, not a 9th tab */
try{if(typeof KG==="object"&&KG.mt&&!KG.mt.keys.includes("q72"))KG.mt.keys.splice(1,0,"q72");if(typeof kgBar==="function")kgBar()}catch(e){}
/* balance 11/14 (late): death stays a real risk for a careful player too. Same rules for every woman in the palace, her and every NPC.
   - birthMin: thái y, Y thuật, an thai and a loyal maid lower the childbirth risk, but never below BAL.birthMin % (measured: the careful bot got down to 1.5%).
   - seeMaxP: spotting a poisoned bowl or medicine (the "ps" check of caught(): physician, Y thuật, eyes) is capped at BAL.seeMaxP %. Guards lower the odds, never to near-zero.
   - poisonX: a poison that lands takes poisonX x the Sức it took before (for her and for an NPC alike). */
Object.assign(BAL,{birthMin:8,seeMaxP:70,poisonX:1});
/* v12 (worker 2, measured n=30): an empty Hoàng hậu seat goes to an outsider girl 60% of the time (was 85; jbal outQ) */
Object.assign(BAL,{outQ:60});
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
Object.assign(BAL,{reveal:{shake:420,pause:700,rise:550,hold:1300,shelf:380,list:350,gainMin:900,fall:1300,coins:900}});
/* TRUE EVIDENCE (jtruth, owner 15/11): a spy who finds no wrong learns her habits instead: +spyKnowB on the next scheme against her for
   spyKnowW weeks. Frame defence (the framed one clears herself): clearBase + Tai mắt × clearMat, + ksB with a Kính sự phòng night in the
   last ksW weeks, + wB a loyal (≥60) maid as witness, + tyB Thái y (own doctor or Y thuật ≥3), + evB per evidence (max 2) on the framer;
   kept within clearMin..clearMax. An exposed framer loses fDanh Danh and fDuc Đức and is punished (sev 2), same for everyone.
   Frame rate (reviewer r1): frameW = Vu oan/Cài đồ weight × when she holds no proof to accuse; frameW1 = Vu oan weight added at grudge
   band "nhỏ"; npcFrameP = % per tuần that a consort with malice ≥ npcFrameMal frames a more favoured rival (NPC-vs-NPC);
   frameHide = minus on the victim's detection (oSee) during a frame (quiet work). */
Object.assign(BAL,{truth:{spyKnowB:8,spyKnowW:6,clearBase:20,clearMat:5,ksW:2,ksB:25,wB:15,tyB:20,evB:10,clearMin:10,clearMax:85,fDuc:8,fDanh:15,frameW:2,frameW1:2,npcFrameP:10,npcFrameMal:40,frameHide:30}});
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
   destroys the secret · failRel: thiện cảm lost when the press fails · fadeCh monthly chance a strong secret fades · pressBase odds base of "Lấy chuyện riêng ép nàng" (+ Tâm cơ/tcDiv) · max own hooks kept. */
Object.assign(BAL,{mem:{cap:5,fadeMo:2,keepFloor:.35,modDiv:8,modMax:10,recallMin:15,recallCd:3,invokeMin:20,invokeCost:15,logMin:25,relMin:15,pairCap:300,reinforce:.6,reinforceMax:2,
 strong:40,faint:15,hate:30,seenAf:8,taintAf:10,relCap:40,invokeAff:6,
 w:{ally:12,gift:8,giftbad:8,gifttaint:50,secret:8,care:6,apology:6,humble:6,provoke:10,vent:15,spy:12,rumor:25,frame:45,poison:70,accuse:40,bribe:15,block:15,plant:35,steal:15,musk:80,kidharm:80,takeaway:40,reward:15,pardon:45,conf:20,cutpay:15,judge:40,helped:20,failed:8,exposed:25,kept:25,broken:35,pressed:20,scheme:20,good:0,bad:0}},
 hook:{useOan:15,strikeCh:25,lostCh:20,fadeCh:4,pressBase:50,max:40,useStep:5,failRel:10,tcDiv:4}});
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
   logCap = ledger lines kept (oldest dropped; items themselves are never dropped). */
Object.assign(BAL,{il:{shopP:12,retW:[6,12],ransomPct:120,againW:[4,8],confW:8,confSuc:8,npcConfP:30,fixW:[2,4],resaleP:15,
 npcBackP:20,npcBuyP:8,empEv:2,logCap:600}});
