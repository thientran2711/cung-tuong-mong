/* review/odds-meter-back (owner 19/11 ~01:48Z, canon overwrite of the 14/11 15:05Z kitRisk chip; certain options: owner 24/11 ~04:25Z, NO meter): EVERY ROLLED event option card shows the kit odds
   meter (kitOdds .kodm in .kat > .kodds) at the option's REAL odds (the ladder word of its own line = the odds the roll uses, law 4; a certain
   option = no meter at all), and NO kitRisk chip (.krisk «an toàn / có rủi ro / liều»).
   Scans every PEND event dialog (KIT_ACT_PIDS excluded) + approachOne visits (N draws). Prints counts + the options whose card still has no
   meter (a rolled option names its odds by p: j17 oddsLead, review/odds-no-unknown).
   usage: node dev/test/odds-meter-back.js <index.html url> <out.json> [WxH,WxH…]   (default 755x1000,1180x820) — exit 1 on a FAIL */
const {chromium}=require('playwright');const fs=require('fs');
const [,,PAGE,OUT,SZS]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ALL={};let bad=0;
 for(const sz of (SZS||"755x1000,1180x820").split(",")){const [W,H]=sz.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitHint==='function');await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
  await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name);await sleep(1500);
  const R=await p.evaluate(async()=>{const Wt=t=>new Promise(r=>setTimeout(r,t));document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());
   const md=document.getElementById('modal');const close=()=>{Q.length=0;md.hidden=true};close();S.bac=300;S.suc=80;S.th=Math.max(S.th||0,40);render();
   const T=s=>String(s||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
   const res={dialogs:0,options:0,krisk:0,meter:0,noMeter:[],mismatch:[],steps:[0,0,0,0,0,0,0],sure:0,certain:0,sureLeft:[],errs:[]};
   const audit=(where,m)=>{if(!m||!m.opts)return;res.dialogs++;m.opts.forEach((o,i)=>{const bt=md.querySelector(`#mb .opt[data-m="${i}"]`)||[...md.querySelectorAll('#mb .opt')][i];if(!bt)return;res.options++;
     if(bt.querySelector('.krisk'))res.krisk++;const km=bt.querySelector('.kat > .kodds .kodm');let want=-1;try{const od=kitOptModel(o).odds;want=od?KIT_ODDS.indexOf(od):-1}catch(e){}
     if(!km&&want<0){res.certain++;return}/* owner 24/11 ~04:25Z: a certain option (nothing rolled) shows NO odds meter */
     if(km&&want<0){res.sureLeft.push([where,T(o.n).slice(0,40)]);return}
     if(!km){res.noMeter.push([where,T(o.n).slice(0,40),T((bt.querySelector('.kodds')||{}).textContent)||"(none)"]);return}
     res.meter++;const lv=+km.dataset.kodds;if(lv>=0)res.steps[lv]++;else res.unknown=(res.unknown||0)+1;if(want>=0&&lv!==want)res.mismatch.push([where,T(o.n).slice(0,40),lv,want]);})};
   const ids=Object.keys(PEND).filter(k=>!KIT_ACT_PIDS.has(k));const PP={night2:{s:5},night1:{q:3,vp:0},tt3:{o:40},ch2:{o:40},thd1:{o1:40,o2:50}};
   for(const id of ids){try{close();const d=mkP(id,PP[id]||{});if(!d||!d.o||!d.o.length)continue;pushDil(d,id);showModal();await Wt(120);const m=Q[0];if(m&&kitIsEventChoice(m))audit("PEND:"+id,m)}catch(e){res.errs.push(id+": "+e.message.slice(0,80))}}
   const seen=new Set();for(let i=0;i<400;i++){try{close();const m=approachOne();if(!m||!m.opts)continue;const k=T(m.t).slice(0,30)+" / "+T((m.opts[0]||{}).n).slice(0,24);if(seen.has(k))continue;seen.add(k);Q.push(m);m.must=1;showModal();await Wt(120);audit("AP:"+k,m)}catch(e){res.errs.push("AP: "+e.message.slice(0,80))}}
   close();return res});
  R.pageErrors=errs;ALL[sz]=R;const fail=R.krisk>0||R.sureLeft.length>0||R.noMeter.length>0||R.mismatch.length>0||errs.length>0;if(fail)bad++;
  console.log(`${sz}: dialogs ${R.dialogs} · options ${R.options} · krisk ${R.krisk} · meter ${R.meter} · no meter ${R.noMeter.length} · step≠odds ${R.mismatch.length} · steps ${R.steps.join("/")} · certain (no meter) ${R.certain} · certain with a meter ${R.sureLeft.length} · page errors ${errs.length} → ${fail?"FAIL":"PASS"}`);
  for(const x of R.noMeter.slice(0,40))console.log("  no meter:",x.join(" | "));for(const x of R.mismatch.slice(0,20))console.log("  step≠odds:",x.join(" | "));
  await ctx.close()}
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(ALL,null,1));await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
