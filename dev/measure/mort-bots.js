/* review/mortality bots: month-loop lives in the real build (no buổi acts: monthTick() directly, dialogs cleared), N lives × Y years per style.
   usage: node dev/measure/mort-bots.js <lives> <years> [out.json]
   Styles (what the bot does each month, on top of the real month rules):
     sensible — treats any illness with the thái y (treat 'ty', pays bạc), rests (Sức ≥ 60), keeps Sủng/Danh above the neglect line, Đức 55;
     random   — each month a coin: treat or not, rest or not; nothing else;
     reckless — never treats, overworks (Sức −15 a month), Đức 20.
     mother   — sensible, and she starts with a son of 1 named Thái tử (the Hoàng thái hậu road: does the Emperor die while she and he live?);
     world    — she is kept out of the way (no death for her: S.tho far, die() muted) to read every OTHER group for Y years.
   Deaths are counted per group and cause: lifespan / accident / plot (jmort ledger S.mort.dl) and illness / childbirth / punishment / other
   (people who died that month and are not in the ledger, classified from the month's text). Her ending = over() title + fate. */
const {chromium}=(require('../test/lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
const R=path.resolve(__dirname,'../..');const CH=+process.env.CHUNK||5;const LIVES=+process.argv[2]||20,YEARS=+process.argv[3]||5,OUT=process.argv[4];
const MERGE=process.argv[2]==="--merge";
(async()=>{if(MERGE){const all={};for(const f of process.argv.slice(3)){const d=JSON.parse(fs.readFileSync(f,'utf8'));for(const k in d)if(k!=="pageErrors"){all[k]=all[k]||{lives:[],deaths:[],errs:[]};for(const x of ["lives","deaths","errs"])all[k][x].push(...d[k][x])}}
  return report(all,Object.keys(all),+process.env.YEARS||5,[])}
 const b=await chromium.launch({args:['--js-flags=--max-old-space-size=900','--disable-gpu']});const ctx=await b.newContext({viewport:{width:1000,height:755},reducedMotion:'reduce'});
 await ctx.route(/^https?:\/\/(?!ts\.local)/,r=>/image|media|font/.test(r.request().resourceType())?r.abort():r.continue());
 await ctx.route('http://ts.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);const f=R+u;if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,contentType:/\.html$/.test(f)?'text/html; charset=utf-8':/\.json$/.test(f)?'application/json':'application/octet-stream',body:fs.readFileSync(f)})});
 const errs=[];
 const all={};
 const STY=(process.env.STYLES||"sensible,random,reckless,world").split(",");
 for(const style of STY){all[style]={lives:[],deaths:[],errs:[]};
  for(let done=0;done<LIVES;done+=CH){
  const page=await ctx.newPage();page.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await page.goto('http://ts.local/dev/index.html',{waitUntil:'domcontentloaded',timeout:120000});await page.waitForTimeout(2500);
  if(process.env.MORT_OFF)await page.evaluate(()=>{BAL.mort.on=0});
  let part;try{part=await page.evaluate(([style,LIVES,YEARS])=>{const quiet=()=>{try{Q.length=0}catch(e){}};const out={lives:[],deaths:[],errs:[]};
   const strip=x=>String(x).replace(/<[^>]+>/g,'');let ending=null;const o0=over;over=function(h,t,fate,alive){ending={h,fate:strip(fate),t:strip(t).slice(0,160),alive:!!alive,age:S.age,year:S.year};return o0.apply(this,arguments)};
   const die0=die;if(style==="world")die=function(){};
   for(let l=0;l<LIVES;l++){SLOT=3;try{store.set(NL_KEY,null)}catch(e){}ending=null;start();quiet();if(style==="world"){S.tho=999}if(style==="mother"){const k=mkKid("m",1);k.heir=true;S.kids.push(k);S.heir={k,v:null};S.rank=Math.max(S.rank,3)}if(!S.mort)S.mort={}
    const emp0=S.emp.age;let empDied=null,pregs=0;const CONC=1;const birthsK=new Set(allKids().map(([k])=>k));let births=0;
    for(let m=0;m<YEARS*12&&!S.dead;m++){
     const alive=new Map();for(const v of rivals)if(v.alive)alive.set(v,"consort");allKids().forEach(([k])=>k.alive&&alive.set(k,"kid"));const th0=!S.thDead,dl0=((S.mort&&S.mort.dl)||[]).length;
     if(style!=="world"){const sens=style==="sensible"||style==="mother"||(style==="random"&&Math.random()<.5);
      if(sens){if(illOf(S)&&S.bac>=40){S.bac-=40;treat(S,"ty")}S.suc=Math.max(S.suc,60);S.sung=Math.max(S.sung,25);S.danh=Math.max(S.danh,15);S.duc=Math.max(S.duc,55);S.rank=Math.max(S.rank,2)}
      if(style==="reckless"){S.suc=Math.max(0,S.suc-15);S.duc=20;S.sung=Math.max(S.sung,25);S.danh=Math.max(S.danh,15);S.rank=Math.max(S.rank,2)}
      S.bac=Math.max(S.bac,80)}
     else{S.sung=Math.max(S.sung,40);S.danh=Math.max(S.danh,40);S.rank=7;S.suc=80;S.age=Math.min(S.age,30)}
     /* pregnancies (the month loop has no nights): sensible / mother / random conceive at conceiveCh × CONC a month (≈ a few nights) */
     if(style!=="world"&&style!=="reckless"&&!S.preg&&!S.out&&roll(conceiveCh(S)*CONC)){S.preg=1;S.pregWk=wk();pregs++}
     let ev="";try{ev=strip(monthTick())}catch(e){out.errs.push(String(e).slice(0,160));break}quiet();
     allKids().forEach(([k])=>{if(!birthsK.has(k)){birthsK.add(k);births++}});
     const dl=((S.mort&&S.mort.dl)||[]).slice(dl0);const inL=new Set(dl.map(d=>d.g+d.a));dl.forEach(d=>out.deaths.push(d));
     for(const [p,g] of alive)if(p.alive===false){const a=p.age;if(dl.some(d=>d.g===g&&d.a===a))continue;const nm=p.name||"";const seg=(ev.split(nm)[1]||"").slice(0,60);
      const c=/khó sinh|băng huyết|Giữ con|sinh hạ hài nhi rồi qua đời/.test(seg)?"childbirth":/ban chết|xử|tự vẫn|lụa trắng/.test(seg)?"punishment":/mất vì|bệnh|đậu mùa|qua đời/.test(seg)?"illness":"other";out.deaths.push({g,a,c,y:S.year})}
     if(th0&&S.thDead&&!dl.some(d=>d.g==="th"))out.deaths.push({g:"th",a:S.thAge,c:"illness/story",y:S.year});
     if(S.dead&&ending&&/băng hà, thọ/.test(ending.t))empDied={age:S.emp.age,why:S.mort.empWhy||"lifespan"};}
    if(S.dead&&ending&&!/băng hà, thọ/.test(ending.t)&&style!=="world"){const c=/Tuổi trời/.test(ending.fate)?"lifespan":/khó sinh|băng huyết|Giữ con/i.test(ending.fate)?"childbirth":/nguy kịch|bệnh|đậu mùa/i.test(ending.fate)?"illness":/ngã|nghẹn|ngất|trượt/.test(ending.fate)?"accident":ending.alive?"ending(alive)":"other death";
     out.deaths.push({g:"me",a:ending.age,c,y:ending.year})}
    const npcB=rivals.reduce((a,v)=>(a.kids+=(v.kids||[]).length,a.hard+=v.hardN||0,a.mis+=v.misN||0,a.still+=v.stillN||0,a.choice+=v.choiceN||0,a),{kids:0,hard:0,mis:0,still:0,choice:0});
    const npcMom=out.deaths.filter(d=>d.g==="consort"&&d.c==="childbirth"&&d._l===l).length;
    out.lives.push({end:S.dead?ending:{h:"alive"},years:S.year,age:S.age,emp0,empDied,births,pregs,kidsBorn:S.kids.length,kidsAlive:S.kids.filter(k=>k.alive).length,
     mis:S.misN||0,still:S.stillN||0,hard:S.hardN||0,choice:S.choiceN||0,barren:!!S.barren,momDied:!!(ending&&/Khó sinh|băng huyết|Giữ con|giữ con/i.test(ending.fate||"")),stillPreg:!!S.preg,npcB})}
   over=o0;die=die0;return out},[style,Math.min(CH,LIVES-done),YEARS])}catch(e){part={lives:[],deaths:[],errs:[String(e).slice(0,120)]}}
  await page.close();for(const k of ["lives","deaths","errs"])all[style][k].push(...part[k]);}
  console.error(style,"done",all[style].lives.length,all[style].errs.slice(0,2))}
 all.pageErrors=errs.slice(0,10);if(OUT)fs.writeFileSync(OUT,JSON.stringify(all));
 report(all,STY,YEARS,errs);await b.close()})().catch(e=>{console.error(e);process.exit(1)});

function report(all,STY,YEARS,errs){
 /* tables */
 const pct=(a,n)=>n?(100*a/n).toFixed(0)+"%":"-";
 for(const st of STY.filter(x=>x!=="world")){const L=all[st].lives,n=L.length;const dead=L.filter(l=>l.end&&l.end.h!=="alive");
  const herDeath=dead.filter(l=>!l.end.alive&&!/băng hà, thọ/.test(l.end.t||""));const emp=L.filter(l=>l.empDied);
  const early=herDeath.filter(l=>(l.end.year||9)<=2).length;
  console.log(`\n## ${st}: ${n} lives × ${YEARS} y — she died: ${pct(herDeath.length,n)} (of them in years 1–2: ${early}) · Emperor died: ${pct(emp.length,n)} · other endings: ${pct(dead.length-herDeath.length-emp.length,n)}`);
  const sum=k=>L.reduce((a,l)=>a+(+l[k]||0),0);const pg=sum("pregs"),bornE=sum("kidsBorn"),mis=sum("mis"),still=sum("still"),mom=L.filter(l=>l.momDied).length,ongoing=L.filter(l=>l.stillPreg).length;
  const births=L.reduce((a,l)=>a+(l.kidsBorn>0||l.momDied?1:0)*0,0);const bEv=bornE+still+(L.filter(l=>l.momDied&&!l.kidsBorn).length);
  const other=Math.max(0,pg-mis-ongoing-sum("births")-still-L.filter(l=>l.momDied).length);
  const hth=L.filter(l=>l.end&&/Hoàng thái hậu/.test(l.end.h||"")).length;
  console.log(`   pregnancies ${pg} · children born ${bornE} (raised, alive at the end: ${sum("kidsAlive")} = ${(sum("kidsAlive")/n).toFixed(2)} a life) · miscarriage natural ${mis} (${pct(mis,pg)} of pregnancies) / other (schemes, her death) ${other} · stillbirths ${still} · hard births ${sum("hard")} (Emperor's choice ${sum("choice")}) · she died in childbirth ${mom} (${pct(mom,bEv)} of births) · never again ${L.filter(l=>l.barren).length}`);
  const NB=L.reduce((a,l)=>{for(const k in l.npcB)a[k]=(a[k]||0)+l.npcB[k];return a},{});const npcMom=all[st].deaths.filter(d=>d.g==="consort"&&d.c==="childbirth").length;
  console.log(`   NPC consorts: children ${NB.kids||0} · natural miscarriages ${NB.mis||0} · stillbirths ${NB.still||0} · hard births ${NB.hard||0} (Emperor's choice ${NB.choice||0}) · died in childbirth ${npcMom} (${pct(npcMom,(NB.kids||0)+(NB.still||0)+npcMom)} of births)`);
  console.log(`   Hoàng thái hậu ending: ${hth} (${pct(hth,n)}) · Emperor died while she lived: ${pct(emp.length,n)}`);
  const by={};dead.forEach(l=>{const k=l.end.h+" · "+l.end.fate;by[k]=(by[k]||0)+1});Object.entries(by).sort((a,b)=>b[1]-a[1]).forEach(([k,v])=>console.log("  ",v,k))}
 const D=[].concat(...STY.map(s=>all[s].deaths.map(d=>Object.assign({s},d))));
 const G={};D.forEach(d=>{const g=G[d.g]=G[d.g]||{n:0,c:{},h:{}};g.n++;g.c[d.c]=(g.c[d.c]||0)+1;const bin=d.a<10?"0-9":d.a<20?"10-19":d.a<30?"20-29":d.a<40?"30-39":d.a<50?"40-49":d.a<60?"50-59":d.a<70?"60-69":d.a<80?"70-79":"80+";g.h[bin]=(g.h[bin]||0)+1});
 console.log("\n## deaths by group (all styles): cause counts · age histogram");for(const g in G)console.log(g,G[g].n,JSON.stringify(G[g].c),JSON.stringify(G[g].h));
 console.log("pageErrors",errs.length,errs.slice(0,3))}
