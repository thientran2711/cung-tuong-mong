/* npc-death-wire whole-family scan (LUẬT SỬA CẢ NHÓM): after deaths, EVERY place's people list (the stage = S.visit.people after goTo,
   the j95 record) must drop the dead and show the newcomer; Trường Môn viện shows Phế phi họ Lý while she lives, never after.
   usage: python3 dev/build/assemble.py && node dev/measure/npc-death-places.js <root with dev/index.html> [lives=3] [months=18]
   Each month: one rival, one servant, one court post holder and one palace man are given a lifespan ending now (jmort's own death path,
   mortMonth), sometimes a rival is sent to / freed from Trường Môn viện, Lý dies in month 9 (branch only: main has no Lý death);
   then she walks to every Dư đồ place and the stage + map count are checked. Prints one JSON summary line. */
const {chromium}=(require('../test/lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
const R=path.resolve(process.argv[2]||'.');const LIVES=+(process.argv[3]||3),MON=+(process.argv[4]||18);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1000,height:755}});
 await ctx.route('http://ts.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);const f=R+u;if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});r.fulfill({status:200,contentType:/\.html$/.test(f)?'text/html; charset=utf-8':'application/octet-stream',body:fs.readFileSync(f)})});
 await ctx.route(/^https?:\/\/(?!ts\.local)/,r=>/image|media|font/.test(r.request().resourceType())?r.abort():r.continue());
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto('http://ts.local/dev/index.html',{waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof start==='function',null,{timeout:180000});await p.waitForTimeout(2000);
 const T={lives:0,months:0,visits:0,deaths:{rv:0,srv:0,court:0,man:0,ly:0},deadOnStage:0,deadEx:[],courtName:0,courtEx:[],lyMissing:0,lyAfterDeath:0,lyChecks:0,lcCount:0,lcEx:[],freedAtLc:0};
 for(let L=0;L<LIVES;L++){
  const r=await p.evaluate(({MON,L})=>{const T={months:0,visits:0,deaths:{rv:0,srv:0,court:0,man:0,ly:0},deadOnStage:0,deadEx:[],courtName:0,courtEx:[],lyMissing:0,lyAfterDeath:0,lyChecks:0,lcCount:0,lcEx:[],freedAtLc:0};
   try{localStorage.clear()}catch(e){}SLOT=3;try{store.set(NL_KEY,null)}catch(e){}start();try{lyFallen()}catch(e){}Q.length=0;const md=document.getElementById('modal');
   const clr=()=>{Q.length=0;if(md)md.hidden=true};const pick=a=>a[Math.floor(Math.random()*a.length)];
   const end=x=>{if(x&&x.age!=null){x.tho=x.age;x.thoM=S.month;x.thoO=0;return true}return false};
   const PL=Object.keys((typeof MAPH!=="undefined"&&MAPH.places)||{}).concat(["lc","tyv","ksp","nvp"]).filter((k,i,a)=>a.indexOf(k)===i&&k!=="home");
   let freed=null;
   for(let m=0;m<MON&&!S.dead;m++){T.months++;
    const rv=rivals.filter(v=>v.alive&&!v.queen);if(m%3===1&&rv.length>4&&end(pick(rv)))T.deaths.rv++;
    const sv=[].concat(...rivals.filter(v=>v.alive).map(v=>v.staff||[])).filter(s=>s&&s.age!=null);if(sv.length&&end(pick(sv)))T.deaths.srv++;
    const cs=Object.values(S.court||{}).filter(o=>o&&o.name&&o.age!=null);if(m%2===0&&cs.length&&end(pick(cs)))T.deaths.court++;
    const mn=(S.men||[]).filter(x=>x.alive&&x.age!=null);if(m%4===2&&mn.length&&end(pick(mn)))T.deaths.man++;
    const y=S.lyF;const lyD0=!!(y&&y.dead);if(m===9&&y&&!y.dead&&typeof lyDie==="function"){y.tho=y.age;y.thoM=S.month;y.thoO=0}
    try{monthTick()}catch(e){T.err=String(e).slice(0,120);break}clr();if(S.dead)break;
    if(y&&y.dead&&!lyD0)T.deaths.ly++;
    /* a rival to / from Trường Môn viện by hand (state; the record follows at the next sync) */
    if(m%3===0){const a=rivals.filter(v=>v.alive&&!v.out&&!v.queen);if(a.length>4){const v=pick(a);v.out=1;freed=null}}
    else if(m%3===2){const o=rivals.find(v=>v.alive&&v.out);if(o){o.out=0;freed=o}}
    const dead=new Set();for(const v of rivals)if(!v.alive)dead.add(v);for(const x of S.men||[])if(!x.alive)dead.add(x);
    const live=new Set();for(const v of rivals)if(v.alive){live.add(v.name);if(v.maid)live.add(v.maid.name);for(const s of v.staff||[])live.add(s.name)}for(const o of Object.values(S.court||{}))if(o&&o.name)live.add(o.name);
    for(const x of S.men||[])if(x.alive)live.add(x.name);if(S.maid)live.add(S.maid.name);for(const s of S.staff||[])live.add(s.name);if(S.lyF&&!S.lyF.dead)live.add(S.lyF.name);
    const dn=new Set((S.dnames||[]).filter(n=>!live.has(n)));
    for(const k of PL){if(S.dead)break;clr();S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};try{j95sync(false,true)}catch(e){}
     S.confined=0;try{used=0}catch(e){}try{goTo(k)}catch(e){continue}clr();if(!S.visit||S.visit.k!==k||S.place!==k)continue;T.visits++;
     try{if(typeof renderStage==="function")renderStage()}catch(e){}
     const V=S.visit.people||[];
     for(const q of V){const bad=(q.ref&&dead.has(q.ref))||(q.ref&&q.ref.alive===false)||(dn.has(q.name));if(bad){T.deadOnStage++;if(T.deadEx.length<6)T.deadEx.push(k+":"+q.kind+":"+q.name)}
      const post=q.kind==="ty"||q.sk==="ty"?"ty":q.kind==="ksp"?"ksp":q.kind==="peddler"?"ped":null;const o=post&&S.court&&S.court[post];
      if(o&&o.name&&q.name!==o.name){T.courtName++;if(T.courtEx.length<6)T.courtEx.push(k+":"+q.name+"≠"+o.name)}}
     if(k==="lc"){T.lyChecks++;const y=S.lyF;const has=V.some(q=>q.kind==="fallen"&&!q.ref);
      if(y&&!y.dead&&!y.freed&&!has)T.lyMissing++;if((!y||y.dead||y.freed)&&has)T.lyAfterDeath++;
      if(freed&&V.some(q=>q.ref===freed))T.freedAtLc++;
      const want=rivals.filter(v=>v.alive&&v.out).length+(y&&!y.dead&&!y.freed?1:0);const fl=V.filter(q=>q.kind==="fallen").length;
      if(fl!==Math.min(want,((BAL.mort&&BAL.mort.ly&&BAL.mort.ly.lcShow)||3)+(y&&!y.dead&&!y.freed?1:0))){T.lcCount++;if(T.lcEx.length<4)T.lcEx.push(fl+" vs "+want)}}}
    S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}}}
   return T},{MON,L});
  T.lives++;for(const k of ["months","visits","deadOnStage","courtName","lyMissing","lyAfterDeath","lyChecks","lcCount","freedAtLc"])T[k]+=r[k];for(const k in r.deaths)T.deaths[k]+=r.deaths[k];
  T.deadEx.push(...r.deadEx);T.courtEx.push(...r.courtEx);T.lcEx.push(...r.lcEx);if(r.err)(T.errs=T.errs||[]).push(r.err)}
 T.deadEx=T.deadEx.slice(0,8);T.courtEx=T.courtEx.slice(0,8);T.lcEx=T.lcEx.slice(0,6);T.pageErrors=errs.slice(0,5);console.log(JSON.stringify(T));await b.close()})();
