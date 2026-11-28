/* SHOWN == ROLLED ACROSS THE TIME SPEND (review/shown-odds-r2, ORDER ROOT-52 18/11 15:30Z; C-AG #13 find: j8 doAct paid the khắc
   BEFORE runAct, and what ran inside that spend moved the act's odds before the roll — npc feel-shown red ~1/10, shown 64 / rolled 74).
   Every do-path that pays time and THEN rolls must roll the odds she saw. Here the spend itself MOVES THE WORLD (a wrapper on
   spend shifts her Tâm cơ / Sủng / Danh / Đức / Sắc by 30 and moves her in or out of the target's place — what a world event, the
   roster resync or the weather can do in a khắc), then each real do-path is run and its own success roll is compared with the odds
   shown before the click:
     act/<k>      j8 doAct (person menu, j6 / j15 buttons, jsgame "act")    shown = actOdds (j9)       for EVERY ACT with o+f
     plant        j8 PEND.plantpick (sent / tại chỗ)                       shown = the dialog's word
     steal-tonight the C-AG case: her Tranh sủng on the night she is not called
     sgplace/<k>  jsgame "Giao cho người làm" from a place card               shown = J.p0 (the card)
     spypick      jwhy spyPick (sai cung nữ dò la)                           shown = the option's word
     scout        j21 scout · kmEmp j21/jgift kmEmpAct (weather moves it)   shown = the button's formula
   rolled = the first roll the act's own code makes (side rolls — caught, refuse, confess, belief, punish — forced to "no").
   usage: node dev/test/shown-odds-spend.test.js [dev/index.html] [seed]   (exit 1 on any mismatch; FAILS on live a2ce736a, PASSES here) */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const path=require('path');
const URL='file://'+path.resolve(process.argv[2]||path.join(__dirname,'../index.html'));const SEED=+(process.argv[3]||1);/* roster seed (crypto too): the same lives every run; sweep with a 2nd arg */
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 p.setDefaultTimeout(240000);await p.route(/^https?:/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function');
 const R=await p.evaluate(async(SEED)=>{
  let seed=SEED;const rng=()=>{seed|=0;seed=seed+0x6D2B79F5|0;let t=Math.imul(seed^seed>>>15,1|seed);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};Math.random=rng;try{crypto.getRandomValues=a=>{for(let i=0;i<a.length;i++)a[i]=Math.floor(rng()*4294967296);return a}}catch(e){}
  SLOT=2;document.getElementById('title').hidden=true;start();Q.length=0;window.__agOff=1;window.__feelOff=1;window.render=function(){};
  window.__j70inst=1;/* j70 'Ra tay ngay' (the plot dialog's do-now path runs doAct with this flag) */try{if(BAL.steal&&BAL.steal.mg)BAL.steal.mg.on=false}catch(e){}/* jsmg's night game off: the act itself */
  S.rank=Math.max(S.rank,5);if(!S.inv.some(e=>!e.h)){const ik=Object.keys(IT).find(x=>IT[x]&&IT[x].pr>0&&IT[x].pr<100);if(ik)S.inv.push({k:ik,q:1})}
  S.bac=99999;S.suc=100;S.sung=60;S.danh=60;S.tamco=60;S.duc=60;
  const base=JSON.stringify(ser());
  const restore=()=>{quiet=true;deser(JSON.parse(base));quiet=false;Q.length=0;used=0;seed=7};
  /* the world moves INSIDE the spend (outermost wrapper, after every module's own spend wrapper) */
  let MV=null;const sp0=spend;spend=function(){const r=sp0.apply(this,arguments);if(MV){const f=MV;MV=null;try{f()}catch(e){}}return r};
  const move=v=>()=>{for(const s of ['tamco','sung','danh','duc','sac'])if(typeof S[s]==='number')S[s]=S[s]>=50?S[s]-30:S[s]+30;
   try{const w=whereOf(v);S.place=S.place===w?'home':w}catch(e){}
   try{if(S.wx){S.wx.f=S.wx.f===3?0:3}}catch(e){}};
  /* roll capture (as dev/test/shown-odds.test.js): the act's own roll; aRoll (j9) is looked through */
  const roll0=roll;let cap=null;
  const SIDE=/^(runAct|caught|servCaught|mindBelief|punish|framed|confessRisk)$/;
  const OWN=/(^|\.)f$|^(loSteal|tsbFire|wdFrame|plantItem|trip|pushPond|wdAccuse|xxAccuse|stealNight|bribeServ|spyMaidRun|overhear|scout|kmEmpAct|k61Ask|petBuyOne|ktAct|h54Act)$/,LAST=/^tsbBulNpc$/;
  const who=()=>{const L=(new Error().stack||'').split('\n');const nm=i=>{const m=(L[i]||'').match(/at (?:new )?([\w.$<>\[\] ]+?) \(/);return m?m[1]:'?'};const w=nm(3);return w==='aRoll'?nm(4):w};
  roll=function(o){if(!cap)return roll0(o);const w=who();cap.all.push(Math.round(o)+'@'+w);if(SIDE.test(w))return false;if(cap.o==null&&OWN.test(w))cap.o=o;if(LAST.test(w))cap.last=o;return roll0(o)};
  const R2=o=>o==null?null:oddsCl(Math.round(Math.min(o,BAL.odds.hi)));
  const out=[];
  const run=(row,fn)=>{cap={o:null,all:[]};try{fn()}catch(e){row.err=String(e).slice(0,90)}if(cap.o==null&&cap.last!=null)cap.o=cap.last;row.all=cap.all.slice(0,6).join(' ');row.rolled=R2(cap.o);row.shownC=R2(row.shown);row.wbad=row.word!=null&&row.shown!=null&&row.word!==word(R2(row.shown))?`word "${row.word}" != ${word(R2(row.shown))}`:'';cap=null;MV=null;Q.length=0;out.push(row)};
  const targets=k=>{const L=liveRivals(true).filter(v=>!sameHouse(S,v));for(const w of L){w.ev=3;w.scandal=w.scandal||1;w.schemes=w.schemes||1;/* j61: she must know whom she acts on */try{if(typeof k61Named==='function'&&!k61Named(w))k61Meet(w,'gặp mặt',3)}catch(e){}}return L};
  const keys=Object.keys(ACT).filter(k=>ACT[k]&&typeof ACT[k].o==='function'&&typeof ACT[k].f==='function');
  const cases=[{n:'lot+10,spy',lv:0},{n:'lot-10,top',lv:4,near:1}];
  for(const k of keys){for(const c of cases){restore();if(c.near){S.tamco=100;S.sung=100;S.danh=100}
    const STUB={};const stub=(n,f)=>{STUB[n]=window[n];window[n]=f};
    if(k==='vp'){stub('wdCause',(o,t)=>o&&t&&o!==t?{st:'over',sure:true,by:'test'}:null);stub('wdStatus',()=>'over')}
    if(k==='xx'){stub('xxCause',(o,t)=>o&&t&&o!==t?{sc:9,bud:1}:null);stub('luxOf',()=>({sc:9,bud:1}))}
    let v=null;for(const w of targets(k)){try{if(ACT[k].ok(S,w)){v=w;break}}catch(e){}}
    if(!v){for(const n in STUB)window[n]=STUB[n];out.push({k:'act/'+k,c:c.n,skip:'no target'});continue}
    S.lot={i:0,lv:c.lv,dom:ACTDOM[k]||'Sủng'};S.know=S.know||{};S.know[key(v)]=wk();
    const row={k:'act/'+k,c:c.n,v:v.name};row.shown=actOdds(S,v,k);
    if(k==='plant'){/* her plant goes through the dialog: the word printed there, then the pick (spend inside its go) */
     for(const here of [0,1]){const r2=Object.assign({},row,{k:here?'plant/here':'plant/sent'});const d=PEND.plantpick(here?{v:v.id,here:1}:{v:v.id});
      r2.shown=actOdds(S,v,'plant',here?{pen:-BAL.actHere.plant,here:1}:null);r2.word=(d.t.match(/class="past">([^·<]+)/)||[])[1];r2.word=r2.word&&r2.word.trim();
      MV=move(v);run(r2,()=>d.o[0].go());restore();S.lot={i:0,lv:c.lv,dom:ACTDOM[k]};S.know=S.know||{};S.know[key(v)]=wk();v=rivals.find(x=>x.id===v.id)||v}
     for(const n in STUB)window[n]=STUB[n];continue}
    if(k==='gift'){for(const n in STUB)window[n]=STUB[n];out.push({k:'act/'+k,c:c.n,skip:'no odds (dialog)'});continue}
    MV=move(v);run(row,()=>doAct(rivals.indexOf(v),k));if(row.rolled==null)row.why=`named ${typeof k61Named==='function'?k61Named(v):'-'} can ${can(2)} Q ${Q.length} ok ${(()=>{try{return ACT[k].ok(S,v)}catch(e){return 'ERR'}})()}`;
    for(const n in STUB)window[n]=STUB[n]}}
  /* the C-AG case: her Tranh sủng (doAct steal) on a night she is not called */
  {restore();if(typeof stf2Ord==='function')window.stf2Ord=()=>'obey';window.__smgFake=()=>({raw:0});let H=null,ok=false;S.sung=Math.max(S.sung,40);S.cyb={};try{if(typeof cyBase==='function')S.tuan=(cyBase(S).t+1)%3}catch(e){}/* not her days (as the C-AG test) */
   for(const w of targets('steal')){S.tonight=w;S.ntk=null;S.ntTry=null;try{ok=ACT.steal.ok(S,w)}catch(e){ok=false}if(ok){H=w;break}}
   const row={k:'steal-tonight',c:'C-AG',v:H&&H.name};
   if(!H||!ok)out.push(Object.assign(row,{skip:'steal not open: '+(typeof ntReason==='function'?ntReason(S):'')}));else{row.shown=actOdds(S,H,'steal');MV=move(H);run(row,()=>doAct(rivals.indexOf(H),'steal'))}window.__smgFake=null}
  /* jsgame "Giao cho người làm" from a place card (pay = the place popup's khắc, then runAct) */
  for(const k of (typeof SG_ACTS!=='undefined'?SG_ACTS.map(x=>x[1]):[])){restore();const v=targets(k).find(w=>{try{return ACT[k].ok(S,w)}catch(e){return false}});
   if(!v||!SG.K[k]){out.push({k:'sgplace/'+k,skip:'no target'});continue}S.know=S.know||{};S.know[key(v)]=wk();
   const P={j:'place',v:v.id,k,pi:0};const J=sgJob(P);const row={k:'sgplace/'+k,c:'Giao cho người làm',v:v.name,shown:J.p0()};const d=PEND.sgpick(P);
   MV=move(v);run(row,()=>d.o[1].go())}
  /* jwhy spyPick: sai cung nữ dò la (the khắc is paid on the pick) */
  {restore();const v=targets('spy')[0];try{S.payOnPick=2;spyPick(0);const D=Q[Q.length-1];const L=D&&(D.opts||D.o);const o=L&&L.find(x=>x.kgt===v);
    if(!o)out.push({k:'spypick',skip:'no option'});else{const row={k:'spypick',c:'dò la',v:v.name,shown:R2(spyRoll(S,v,whyMaidInit(S.maid))),word:(o.x||'').split(' · ')[0]};Q.length=0;MV=move(v);run(row,()=>o.go())}}catch(e){out.push({k:'spypick',skip:String(e).slice(0,80)})}}
  /* inline do-paths: the button's formula vs the roll made after the spend */
  {restore();const v=liveRivals(true)[0];const row={k:'scout',c:'j21',v:v.name,shown:R2(od(BAL.odb.j21.odO+(S.mat||0)*8+S.tamco/10))};MV=move(v);run(row,()=>scout(v.id))}
  {restore();/* the Emperor is somewhere she may ask him (test stub of his place) */const kf0=window.kmEmpFree;window.kmEmpFree=()=>({ok:true,k:'vuon'});S.wx=S.wx||{};S.wx.f=0;const kinds=typeof KM_EMPACT!=='undefined'?Object.keys(KM_EMPACT):[];let kd=null;for(const x of ['walk'].concat(kinds)){try{if(!kmEmpWhy(S,x)){kd=x;break}}catch(e){}}
   if(!kd)out.push({k:'kmEmp',skip:'no kind open'});else{const row={k:'kmEmp/'+kd,c:'jgift',shown:R2(kmEmpO(S,kd))};MV=()=>{S.wx=S.wx||{};S.wx.f=3;S.sung=S.sung>=50?S.sung-30:S.sung+30};run(row,()=>kmEmpAct(S,kd))}window.kmEmpFree=kf0}
  /* review r2-rv: four inline paths the scan missed (odds shown through a variable): j61 "Hỏi người hầu", jpet buy, j53 "Xin cử Đại học sĩ" (Sủng -4 before the roll), j54 "Nhờ con nói giúp" (Mẫu tử -4 before the roll) */
  const mvStats=()=>()=>{S.mat=(S.mat||0)+3;if(S.maid)S.maid.loyal=Math.min(100,(S.maid.loyal||40)+30);for(const s of ['sung','danh','tamco'])S[s]=S[s]>=50?S[s]-30:S[s]+30};
  {restore();const w=liveRivals(true).find(x=>typeof k61Named==='function'&&!k61Named(x));const k=w&&kOf61(w);
   if(!k)out.push({k:'k61ask',skip:'everyone named'});else{const row={k:'k61ask',c:'j61',v:w.name,shown:R2(od(BAL.odb.j61.odO+(S.mat||0)*8+((S.maid&&S.maid.loyal)||40)/5))};MV=mvStats();run(row,()=>k61Ask(k))}}
  {restore();const t=(typeof PETK!=='undefined'?PETK:[]).find(x=>PET[x].pr);
   if(!t||!petHasFree(S))out.push({k:'petbuy',skip:'no pet / no room'});else{const row={k:'petbuy',c:'jpet',v:PET[t].n,shown:R2(petBuyO(t))};MV=mvStats();run(row,()=>petBuyOne(t))}}
  {restore();const kd=mkKid('m',8);kd.name='Thử'+kd.name;kd.alive=true;S.kids.push(kd);try{ktSync(kd)}catch(e){}kd.tut=0;kd.fav=0;S.out=0;
   const row={k:'kt53/fav',c:'j53',v:kd.name,shown:R2(od(KT.favO+S.sung/2))};MV=mvStats();run(row,()=>ktAct('fav',kd.name))}
  {restore();const kd=mkKid('m',20);kd.name='Thử'+kd.name;kd.alive=true;S.kids.push(kd);try{h54Init(kd)}catch(e){}kd.hW={kind:'nha',joy:50};kd.hV=null;kd.hM=60;S.out=0;
   const row={k:'h54/noi',c:'j54',v:kd.name,shown:R2(od(h54SpeakO(kd)))};MV=mvStats();run(row,()=>h54Act('noi',kd.name))}
  roll=roll0;return out},SEED);
 let bad=0,n=0;for(const r of R){if(r.skip){console.log('skip',r.k,r.c||'',r.skip);continue}
  if(r.shown==null){console.log('noodds',r.k,r.c);continue}if(r.shown>=100){console.log('sure',r.k,r.c,'(o>=100: no success roll; side rolls',r.all+')');continue}
  if(r.rolled==null){console.log('noroll',r.k,r.c,r.err||'',r.all,r.why||'');continue}
  n++;const ok=r.rolled===r.shownC&&!r.wbad;if(!ok)bad++;
  console.log(ok?'ok  ':'FAIL',r.k,r.c,r.v||'','shown',r.shownC,'rolled',r.rolled,r.wbad||'',ok?'':'| '+r.all)}
 console.log(`${n-bad}/${n} shown==rolled across the spend; page errors ${errs.length}`);if(errs.length)console.log(errs.slice(0,3));
 await b.close();process.exit(bad||errs.length||!n?1:0)})();
