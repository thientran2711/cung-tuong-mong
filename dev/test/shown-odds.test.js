/* SHOWN == ROLLED (review/shown-odds-one-path, ORDER ROOT-52 18/11): for EVERY act of the person menu (ACT[k] with .o: j15 Hậu cung
   person menu, j6 rival buttons, j9 Hành sự list, jsgame card, j70 start, jwhy "Vì sao"), build a state where the parts the roll adds
   inside runAct are NOT zero — her lá số domain = the act's domain (lotB, best and worst lot), spy knowledge of the target fresh
   (spyKnowB), a servant sent (ACTX.pen) and a near-cap base (cap before / after the lot) — then assert
   shown (what each display path prints) == rolled (the odds of the act's own success roll inside runAct).
   The rolled odds = the first roll(o) call made by ACT[k].f inside runAct (Math.random seeded, state restored after each run).
   usage: node dev/test/shown-odds.test.js [dev/index.html]   (exit 1 on any mismatch) */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const path=require('path');
const URL='file://'+path.resolve(process.argv[2]||path.join(__dirname,'../index.html'));
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 p.setDefaultTimeout(180000);await p.route(/^https?:/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function');
 const R=await p.evaluate(async()=>{/* seeded BEFORE start(): the same roster every run, so the same acts are reached (review r1) */
  let seed=1;const rng=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};Math.random=rng;
  SLOT=2;document.getElementById('title').hidden=true;start();Q.length=0;
  window.__agOff=1;window.__feelOff=1;
  /* a state where most acts are open: high rank, bạc, Sức, servants */
  S.rank=Math.max(S.rank,5);if(!S.inv.some(e=>!e.h)){const ik=Object.keys(IT).find(x=>IT[x]&&IT[x].pr>0&&IT[x].pr<100);if(ik)S.inv.push({k:ik,q:1})}S.bac=99999;S.suc=100;S.sung=60;S.danh=60;S.tamco=60;S.duc=60;
  const base=JSON.stringify(ser());
  const restore=()=>{quiet=true;deser(JSON.parse(base));quiet=false;Q.length=0;seed=7};
  /* the display paths (each is what that screen prints, as a number before word()) */
  const has=n=>typeof window[n]==='function'||(typeof eval(`typeof ${n}`)==='string'&&eval(`typeof ${n}`)==='function');
  const SHOW={
   j15:(v,k)=>{const a=ACT[k];const o=a.o(S,v);return typeof actOdds==='function'?actOdds(S,v,k):oddsCl(o+lotB(S,ACTDOM[k]))},
   j6:(v,k)=>{const a=ACT[k];const o=a.o(S,v);return typeof actOdds==='function'?actOdds(S,v,k):oddsCl(o+lotB(S,ACTDOM[k]))},
   jsgame:(v,k)=>sgOdds(v,k),
   jwhy:(v,k)=>{const r=(window.__whyActO||null);return r?r(v,k):ACT[k].o(S,v)},
  };
  const roll0=roll;let cap=null;
  /* the act's own success roll = the first roll(o) made by the act's f (or its own odds helper); side rolls (a servant refuses,
     caught, confess, belief, punish) are forced to "no" so the act reaches its own roll */
  const SIDE=/^(runAct|caught|servCaught|mindBelief|punish|framed|confessRisk)$/;const OWN=/(^|\.)f$|^(loSteal|tsbFire|wdFrame|plantItem|trip|wdAccuse|xxAccuse)$/,LAST=/^tsbBulNpc$/;/* tsbBulNpc rolls a side 'what to ask' first, its own odds last */
  const who=()=>{const L=(new Error().stack||'').split('\n');const nm=i=>{const m=(L[i]||'').match(/at (?:new )?([\w.$<>\[\] ]+?) \(/);return m?m[1]:'?'};const w=nm(3);return w==='aRoll'?nm(4):w};/* aRoll (j9, round 2) = the act's own roll: look through it */
  roll=function(o){if(!cap)return roll0(o);const w=who();cap.all.push(Math.round(o)+'@'+w);if(SIDE.test(w))return false;if(cap.o==null&&OWN.test(w))cap.o=o;if(LAST.test(w))cap.last=o;return roll0(o)};
  /* the word each real screen prints for act k (j15 rvGroups person menu, j6 rvButtons) */
  const wordIn=(html,k)=>{const i=html.indexOf(`data-a="${k}"`);if(i<0)return null;const s=html.slice(i,html.indexOf('</button>',i)).replace(/<[^>]+>/g,' ');/* the act's own word = the FIRST ladder word on the button (later ones belong to side lines, e.g. the punishment's odds) */let w=null,at=1e9;for(const x of KIT_ODDS){const j=s.indexOf(x);if(j>=0&&(j<at||(j===at&&x.length>w.length))){w=x;at=j}}return w};
  const out=[];const keys=Object.keys(ACT).filter(k=>ACT[k]&&typeof ACT[k].o==='function'&&typeof ACT[k].f==='function');
  const cases=[{n:'lot+10,spy',lv:0,spy:1,near:0},{n:'lot-10,spy',lv:4,spy:1,near:0},{n:'lot+10,top',lv:0,spy:1,near:1}];
  for(const k of keys){for(const c of cases){restore();
    if(c.near){/* push the base to the cap: the order of cap and lot matters there */S.tamco=100;S.sung=100;S.danh=100}
    /* vp / xx (review r1): give her a cause and the target a real fault, so wdAccuse / xxAccuse reach their own roll */
    const STUB={};const stub=(n,f)=>{STUB[n]=window[n];window[n]=f};
    if(k==='vp'){stub('wdCause',(o,t)=>o&&t&&o!==t?{st:'over',sure:true,by:'test'}:null);stub('wdStatus',()=>'over')}
    if(k==='xx'){stub('xxCause',(o,t)=>o&&t&&o!==t?{sc:9,bud:1}:null);stub('luxOf',()=>({sc:9,bud:1}))}
    const A=ACT[k];const L=liveRivals(true).filter(v=>!sameHouse(S,v));
    for(const w of L){w.ev=3;w.scandal=w.scandal||1;w.schemes=w.schemes||1}
    let v=null;for(const w of L){try{if(A.ok(S,w)){v=w;break}}catch(e){}}
    if(!v){for(const n in STUB)window[n]=STUB[n];out.push({k,c:c.n,skip:'no target'});continue}
    S.lot={i:0,lv:c.lv,dom:ACTDOM[k]||'Sủng'};
    if(c.spy){S.know=S.know||{};S.know[key(v)]=wk()}
    const sv0=JSON.stringify(ser());const row={k,c:c.n,v:v.name,dom:ACTDOM[k]||''};try{row.raw=A.o(S,v)}catch(e){}
    for(let s=1;s<=6;s++){quiet=true;deser(JSON.parse(sv0));quiet=false;Q.length=0;v=rivals.find(x=>x.id===v.id)||v;seed=s*101;
     for(const n in SHOW){try{row[n]=SHOW[n](v,k)}catch(e){row[n]='ERR '+String(e).slice(0,60)}}
     const i=rivals.indexOf(v);try{row.w15=wordIn(rvGroups(v,i).map(g=>g[1].join('')).join(''),k)}catch(e){row.w15='ERR'}try{row.w6=wordIn(rvButtons(v,i),k)}catch(e){row.w6='ERR'}
     /* j78 evidence card word (the typed copies removed in this branch) */try{if(typeof evidenceActs==='function'){const e=evidenceActs(v).find(x=>x.k===k);row.w78=e&&e.odds?e.odds:null}}catch(e){row.w78='ERR'}
     const ix=k==='plant'?S.inv.findIndex(e=>!e.h):undefined;cap={o:null,all:[]};try{runAct(S,v,k,ix)}catch(e){row.err=String(e).slice(0,80)}if(cap.o==null&&cap.last!=null)cap.o=cap.last;if(cap.o!=null)break}
    row.all=cap.all.slice(0,6).join(' ');row.rolled=cap.o==null?null:oddsCl(Math.round(Math.min(cap.o,BAL.odds.hi)));row.wr=row.rolled==null?null:word(row.rolled);cap=null;
    for(const n in STUB)window[n]=STUB[n];
    out.push(row)}}
  /* plant ON THE SPOT (review r1): the j2 chest card word vs the j8 plantpick roll with here:1 (she does it herself: no sent-servant pen) */
  for(const c of cases){restore();const v=liveRivals(true).find(w=>!sameHouse(S,w)&&ACT.plant.ok(S,w));if(!v){out.push({k:'plant-here',c:c.n,skip:'no target'});continue}
   S.lot={i:0,lv:c.lv,dom:ACTDOM.plant};if(c.spy){S.know=S.know||{};S.know[key(v)]=wk()}if(c.near){S.tamco=100}
   const row={k:'plant-here',c:c.n,v:v.name,dom:ACTDOM.plant};try{row.raw=ACT.plant.o(S,v)}catch(e){}
   try{const card=talkOpts({kind:'chest',ref:v,name:v.name}).find(x=>/rương/.test(x.n)&&x.open);row.j15=row.j6=row.jsgame=card?card.o:'none'}catch(e){row.j15='ERR '+String(e).slice(0,60)}
   cap={o:null,all:[]};try{const d=PEND.plantpick({v:v.id,here:1});d.o[0].go()}catch(e){row.err=String(e).slice(0,80)}
   row.all=cap.all.slice(0,6).join(' ');row.rolled=cap.o==null?null:oddsCl(Math.round(Math.min(cap.o,BAL.odds.hi)));row.wr=row.rolled==null?null:word(row.rolled);cap=null;out.push(row)}
  roll=roll0;return out});
 let bad=0,n=0;for(const r of R){if(r.skip){console.log('skip',r.k,r.c,r.skip);continue}if(r.raw==null){console.log('noodds',r.k,r.c,'(no odds shown)');continue}if(r.raw>=100){console.log('sure',r.k,r.c,'(o>=100: no success roll)');continue}if(r.rolled==null){console.log('noroll',r.k,r.c,r.all);continue}
  if(r.j15!=null&&r.j15>=100){console.log('sure',r.k,r.c,'(o>=100: no success roll; side rolls',r.all+')');continue}
  n++;const d=['j15','j6','jsgame'].filter(s=>r[s]!==r.rolled).concat(['w15','w6','w78'].filter(s=>r[s]!=null&&r[s]!==r.wr));if(d.length){bad++;console.log('FAIL',r.k,r.c,r.dom,'rolled',r.rolled,d.map(s=>s+'='+r[s]).join(' '),'(rolled word '+r.wr+')|',r.all)}else console.log('ok  ',r.k,r.c,'=',r.rolled)}
 console.log(`${n-bad}/${n} shown==rolled; page errors ${errs.length}`);if(errs.length)console.log(errs.slice(0,3));
 await b.close();process.exit(bad||errs.length?1:0)})();
