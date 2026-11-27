/* review/lao-health: illness-death curve in the real build (month loop, like mort-bots.js), N lives × Y years per style.
   usage: node dev/measure/lao-bots.js <lives> <years>   (env STYLES=never,ty,rest; FORCE=lao = she catches that illness in month 0)
   never — she never treats an illness (the s21a/b robots: chip opened, «Lui»);  ty — «Truyền thái y» once a month while ill (bạc given);
   rest — «Tĩnh dưỡng» once a month while ill.
   Per life: every illness she catches (kind, month caught, stages, known flag each month, months to death or cure), her ending.
   NPC side: every consort / servant death from an illness while its illness was still known:false and not illKnown (she never learnt). */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const R=path.resolve(__dirname,'../..');const LIVES=+process.argv[2]||20,YEARS=+process.argv[3]||5,CH=+process.env.CHUNK||10;
(async()=>{const b=await chromium.launch({args:['--js-flags=--max-old-space-size=900','--disable-gpu']});const ctx=await b.newContext({viewport:{width:1000,height:755},reducedMotion:'reduce'});
 await ctx.route(/^https?:\/\/(?!ts\.local)/,r=>/image|media|font/.test(r.request().resourceType())?r.abort():r.continue());
 await ctx.route('http://ts.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);const f=R+u;if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,contentType:/\.html$/.test(f)?'text/html; charset=utf-8':'application/octet-stream',body:fs.readFileSync(f)})});
 const errs=[];const STY=(process.env.STYLES||"never,ty,rest").split(",");const all={};
 for(const st of STY){all[st]={lives:[],npc:[]};
  for(let done=0;done<LIVES;done+=CH){const page=await ctx.newPage();page.on('pageerror',e=>errs.push(e.message.slice(0,200)));
   await page.goto('http://ts.local/dev/index.html',{waitUntil:'domcontentloaded',timeout:120000});await page.waitForTimeout(2500);
   const part=await page.evaluate(([st,N,YEARS,FORCE])=>{const out={lives:[],npc:[]};const strip=x=>String(x).replace(/<[^>]+>/g,'');let ending=null;
    const o0=over;over=function(h,t,fate,alive){ending={h,fate:strip(fate),alive:!!alive,age:S.age,year:S.year};return o0.apply(this,arguments)};
    for(let l=0;l<N;l++){SLOT=3;try{store.set(NL_KEY,null)}catch(e){}ending=null;start();try{Q.length=0}catch(e){}
     const ills=[];let cur=null;const a0=S.age;if(FORCE)catchIll(S,FORCE);
     for(let m=0;m<YEARS*12&&!S.dead;m++){
      const i=illOf(S);if(i){if(!cur||cur.ref!==i){cur={ref:i,k:i.k,mort:!!i.mort,m0:m,age0:S.age,st:[],kn:[],tr:0};ills.push(cur)}
       if(st==="ty"&&!i.mort){S.bac=Math.max(S.bac,40);S.bac-=40;treat(S,"ty");cur.tr++}else if(st==="rest"&&!i.mort){treat(S,"rest");cur.tr++}}
      S.bac=Math.max(S.bac,80);S.sung=Math.max(S.sung,20);S.danh=Math.max(S.danh,10);
      const npc0=[];for(const v of rivals)if(v.alive&&illOf(v))npc0.push([v,v.ill.k,v.ill.st,!illKnown(v)]);
      try{monthTick()}catch(e){out.err=String(e).slice(0,160);break}try{Q.length=0}catch(e){}
      for(const [v,k,s,hid] of npc0)if(v.alive===false)out.npc.push({k,st:s,hid,age:v.age,y:S.year});
      const j=illOf(S);if(cur&&cur.ref===(j||{}).__x){} 
      if(cur&&!cur.end){if(j===cur.ref){cur.st.push(j.st);cur.kn.push(illKnown(S)?1:0)}else{cur.end=S.dead?"death":"cured";cur.m1=m}}}
     if(cur&&!cur.end){cur.end=S.dead?"death":"open";cur.m1=S.dead?cur.m0+cur.st.length:null}
     for(const x of ills)delete x.ref;
     out.lives.push({a0,end:S.dead?ending:{h:"alive"},year:S.year,age:S.age,ills})}
    over=o0;return out},[st,Math.min(CH,LIVES-done),YEARS,process.env.FORCE||""]);
   await page.close();all[st].lives.push(...part.lives);all[st].npc.push(...part.npc);if(part.err)errs.push(part.err)}
  console.error(st,"done",all[st].lives.length)}
 fs.writeFileSync(process.env.OUT||'/tmp/claude-0/m/lao.json',JSON.stringify(all));
 for(const st of STY){const L=all[st].lives,n=L.length;const dead=L.filter(l=>l.end.h!=="alive"&&!l.end.alive);
  const ill=dead.filter(l=>/nguy kịch|không qua khỏi|Tuổi trời/.test(l.end.fate||""));const lao=dead.filter(l=>/Lao phổi/.test(l.end.fate||""));
  const caught=L.reduce((a,l)=>a+l.ills.filter(x=>x.k==="lao").length,0);const laoI=[].concat(...L.map(l=>l.ills.filter(x=>x.k==="lao")));
  const laoD=laoI.filter(x=>x.end==="death");const hidden=laoD.filter(x=>x.kn.some(k=>!k)).length;
  const mo=laoD.map(x=>x.m1-x.m0).sort((a,b)=>a-b);const yr={};lao.forEach(l=>yr[l.end.year]=(yr[l.end.year]||0)+1);const ag={};lao.forEach(l=>ag[l.end.age]=(ag[l.end.age]||0)+1);
  console.log(`\n## ${st}: ${n} lives × ${YEARS} y`);
  console.log(`  she died ${dead.length} (${(100*dead.length/n).toFixed(0)}%) · of an illness ${ill.length} · of LAO ${lao.length} (${(100*lao.length/n).toFixed(1)}% of lives)`);
  console.log(`  lao caught ${caught} times in ${n} lives · lao → death ${laoD.length} (${caught?(100*laoD.length/caught).toFixed(0):0}% of catches) · cured ${laoI.filter(x=>x.end==="cured").length} · open ${laoI.filter(x=>x.end==="open").length}`);
  console.log(`  months catch→death: ${JSON.stringify(mo)} · treatments before death: ${JSON.stringify(laoD.map(x=>x.tr))}`);
  console.log(`  lao deaths by year ${JSON.stringify(yr)} · by age ${JSON.stringify(ag)} · lao deaths with a month known:false (her): ${hidden}`);
  const by={};dead.forEach(l=>{by[l.end.fate]=(by[l.end.fate]||0)+1});console.log("  her deaths:",JSON.stringify(by));
  const allI={};[].concat(...L.map(l=>l.ills)).forEach(x=>{const o=allI[x.k]=allI[x.k]||{n:0,d:0};o.n++;if(x.end==="death")o.d++});console.log("  her illnesses (caught/death):",JSON.stringify(allI));
  const N=all[st].npc;const nh=N.filter(x=>x.hid);console.log(`  NPC consorts died of illness ${N.length} · while hidden from her ${nh.length} · by kind ${JSON.stringify(nh.reduce((a,x)=>(a[x.k]=(a[x.k]||0)+1,a),{}))}`)}
 console.log("pageErrors",errs.length,errs.slice(0,3));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
