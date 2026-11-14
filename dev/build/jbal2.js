/* ================= jbal2: late balance knobs for the merged logic modules (review/balance). Same rule for every consort; numbers only. ================= */
Object.assign(BAL,{illAdd:1,illDie:2});
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
(function(){try{const P=ACT.poison,f0=P.f;P.f=function(a,t){const r=f0.apply(this,arguments);try{if(t===S&&S&&!S.dead&&S.suc<=0&&/trúng độc/.test(String(r))&&!/thuốc giải/.test(String(r)))die("Trúng độc, không qua khỏi")}catch(e){}return r}}catch(e){}})();
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
