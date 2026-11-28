/* DOOR-LOSS (law 3, E-GAIN3c 27/11): no way inside a door dialog (talk doors: Trò chuyện, Thưởng phạt, Dò la tin tức …; J2 doors) is loss-only.
   A way row FAILS when its «Gợi ý» (the hint the kit shows: row.hint, else the kit hint of its line) says «chẳng được gì» / «không được mất gì»:
   either the way is loss-only (its line shows no gain either: doorGain = the card's green «Được» is empty → `lossOnly`) or the hint hides a
   real gain the line shows (a false «chẳng được gì»). Both break law 3 for the player. Reuses the act-audit LIB (states dau/toi/cao/con/hau/hh), every person at home
   and in every place, every door row (DOOR.T) through PEND.door — what the dialog really lists. No rolls are made.
   usage: node dev/test/door-loss.js <url> [out.json] [WxH@dpr] [scenarios]  → exit 1 on any loss-only way or page error.
   Mutants (each must exit 1): MUTANT=1 doorHint blanked (= the pre-E-GAIN3c talk-door rows); MUTANT=2 «Phạt vô cớ» without its răn đe gain (svDreadTxt blanked). */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');
const [,,URL,OUT,SZ,SC]=process.argv;const [WH,DPR]=(SZ||'755x1000@1').split('@');const [W,H]=WH.split('x').map(Number);
const src=fs.readFileSync(__dirname+'/act-audit.js','utf8');const LIB=src.slice(src.indexOf('String.raw`')+11,src.indexOf('})();`;')+5);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(0);const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(LIB);if(process.env.MUTANT==='1')await p.evaluate(()=>{window.doorHint=()=>undefined});if(process.env.MUTANT==='2')await p.evaluate(()=>{window.svDreadTxt=()=>''});
 const R=await p.evaluate(async(scs)=>{const ALL=[];const T=s=>String(s||"").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();const NO=/^(chẳng được gì|không được mất gì)/;
  const scan=(sc,where)=>{(curPeople()||[]).forEach((q,i)=>{if(!q)return;for(const r of DOOR.T){if(!r||!r.k)continue;let d=null;try{d=PEND.door({k:r.k,i})}catch(e){}if(!d||!Array.isArray(d.o))continue;
    for(const o of d.o){if(o.n==="Thôi"||o.off)continue;let h=o.hint;try{if(typeof h==="function")h=h(0)}catch(e){h=""}if(h==null||h==="")try{h=kitHint({x:o.x},null,0).hint}catch(e){h=""}
     let g="";try{g=T(doorGain([o.x],1))}catch(e){}ALL.push({sc,where,who:q.kind+":"+(q.name||""),door:r.n,way:o.n,hint:T(h),gain:g,bad:NO.test(T(h)),lossOnly:NO.test(T(h))&&!g})}}})};
  for(const sc of scs.split(",")){AA.scen(sc);AA.restore();try{goTo("home")}catch(e){}render();scan(sc,"home");
   let PL=[];try{PL=places()}catch(e){}for(const pl of PL){AA.restore();try{goTo(pl.k)}catch(e){continue}render();scan(sc,pl.k)}}
  return ALL},SC||'dau,toi,cao,con,hau,hh');
 const bad=R.filter(x=>x.bad);const uniq={};bad.forEach(x=>{const k=x.who.split(":")[0]+" | "+x.door+" › "+x.way.replace(/ (vì|cho) .*/,"");(uniq[k]=uniq[k]||[]).push((x.lossOnly?"LOSS-ONLY ":"FALSE-HINT ")+x.sc+":"+x.where+" «"+x.hint+"»")});
 if(OUT)fs.writeFileSync(OUT,JSON.stringify({all:R,bad,uniq,perr},null,1));
 console.log('door ways '+R.length+' | bad hint '+bad.length+' rows ('+bad.filter(x=>x.lossOnly).length+' loss-only), '+Object.keys(uniq).length+' distinct | page errors '+perr.length);
 for(const k of Object.keys(uniq).sort())console.log('  BAD: '+k+'  ['+[...new Set(uniq[k])].slice(0,2).join(', ')+']');
 await b.close();process.exit(bad.length||perr.length?1:0)})();
