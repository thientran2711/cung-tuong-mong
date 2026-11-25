/* review/temper-perception (seat T2b): NPC rate check of the motive gate's MOOD term (law 1: the same term for her and every NPC).
   usage: node dev/measure/temper-perc-mood.js <build url> [seeds=1,2,3,4,5,6] [NPC buổi rounds=96]
   Driver: the NPC rounds themselves (rivalsBuoi per buổi, rivalsTurn every 3rd) — the bot life runner (runb.js) sticks in a mini-game on main
   and the night flow waits for her choice, so the NPC society is run directly; her calendar does not move. Same seed both arms.
   For each seed, ONE life (seeded Math.random, thân phận "tt" via window.__forceOrigin) is run twice, same seed: BAL.tp.moodM as built (ON)
   and BAL.tp.moodM = 0 (OFF). Per run, counted for NPC doers only (a !== S): motiveOK calls on hostile kinds (H95) → passed / blocked,
   passes that needed the mood term (would fail with mood 0), and NPC gây sự deeds (twDo provoke/humil + agVent) that reached the onlooker rule.
   Output: one row per seed + totals; rate = passes / calls. */
const {chromium}=require('playwright');
const [,,URL,SEEDS,NB]=process.argv;const seeds=(SEEDS||"1,2,3,4,5,6").split(",").map(Number),NBUOI=+NB||96;
(async()=>{const b=await chromium.launch();const rows=[];
 for(const sd of seeds)for(const mode of ["on","off"]){const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'});const p=await ctx.newPage();
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.addInitScript(sd=>{let r=sd>>>0||1;Math.random=()=>{r^=r<<13;r>>>=0;r^=r>>>17;r^=r<<5;r>>>=0;return r/4294967296};window.__forceOrigin="tt"},sd);
  await p.goto(URL,{waitUntil:'load'});await p.waitForFunction(()=>typeof start==='function'&&typeof tpMoodM==='function',null,{timeout:120000});await p.waitForTimeout(1000);
  const r=await p.evaluate(([mode,NB])=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;Q.length=0;try{deal()}catch(e){}if(mode==="off")BAL.tp.moodM=0;/* measuring only: the night flow (jnf) waits for her choice each night — off here so the weeks turn (ea-npc-rate.js style) */try{window.nfOn=()=>false}catch(e){}/* same driver as dev/measure/ea-npc-rate.js: bot flag + endTurn loop */
   const C={calls:0,pass:0,block:0,byMood:0,deeds:0,errs:0};const H=new Set(["provoke","vent","humil","rumor","spy","trip","frame","plant","block","bribe","accuse","steal","poison"]);
   const m0=motiveOK;motiveOK=function(a,t,kind,me){const g=m0.apply(this,arguments);try{if(a!==S&&H.has(kind)){C.calls++;if(g.ok){C.pass++;if(mode==="on"&&tpMoodM(a)>0){const M=BAL.tp.moodM;BAL.tp.moodM=0;const g2=m0.apply(this,arguments);BAL.tp.moodM=M;if(!g2.ok)C.byMood++}}else C.block++}}catch(e){}return g};
   window.motiveOK=motiveOK;const d0=tpDeed;tpDeed=function(X,d){if(X!==S&&/^(provoke|humil|vent)$/.test(d))C.deeds++;return d0.apply(this,arguments)};window.tpDeed=tpDeed;
   let turns=0;for(let i=0;i<NB&&!S.dead;i++){Q.length=0;try{rivalsBuoi()}catch(e){C.errs++;C.err=String(e).slice(0,120)}if(i%3===2){try{rivalsTurn()}catch(e){C.errs++;C.err=String(e).slice(0,120)}turns++}}C.turns=turns;C.bEnd=S.buoi;C.when=String(typeof when==="function"?when():"").replace(/<[^>]+>/g,"");
   return Object.assign(C,{buoi:NB,dead:!!S.dead,wk:typeof wk==="function"?wk():null})},[mode,NBUOI]);
  rows.push(Object.assign({seed:sd,mode},r));console.log(JSON.stringify(rows[rows.length-1]));await ctx.close()}
 const T=m=>rows.filter(x=>x.mode===m).reduce((a,x)=>{for(const k of ["calls","pass","block","byMood","deeds","errs","turns"])a[k]=(a[k]||0)+x[k];return a},{});
 const on=T("on"),off=T("off");console.log("TOTAL on ",JSON.stringify(on),"rate",(on.pass/on.calls).toFixed(3));console.log("TOTAL off",JSON.stringify(off),"rate",(off.pass/off.calls).toFixed(3));
 console.log(`NPC hostile-gate pass rate: ${(off.pass/off.calls*100).toFixed(1)} % (mood 0) → ${(on.pass/on.calls*100).toFixed(1)} % (mood as built); passes owed to mood ${on.byMood}/${on.pass}; NPC gây sự deeds ${off.deeds} → ${on.deeds}`);
 await b.close()})();
