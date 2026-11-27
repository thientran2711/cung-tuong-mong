/* FIRSTCARD-2: per origin on the 3 selection days, N new lives: the day-2 contest with her mini mark = her own level (entSkipRaw) and her two answers
   (đối đáp / hành xử) either A) unknown (middle mark: a player who never learns the royals' chữ trọng) or B) hits (she asked the ma ma / watched and answers
   what the asking royal values) or C) one hit one miss. Prints kept / ban hoa counts and the mean odds the card would show (selxOddsP).
   usage: N=25 OG='["cn","tt"]' node dev/test/firstcard/stat-days.js */
const {open}=require('./lib.js');(async()=>{const {b,p}=await open();
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:60000});
 const r=await p.evaluate(([N,OG])=>{const out={};const M=BAL.selx.npcMatch;for(const og of OG){window.__forceOrigin=og;const c={n:0,days:0,A:0,B:0,C:0,pA:0};
  for(let k=0;k<N*3&&c.n<N;k++){try{store.set(NL_KEY,null)}catch(e){}start();if(!S||S.origin.k!==og)continue;S.kcPick="cung";nlAccept();const Z=S.selx2;if(!Z)continue;c.n++;if(Z.days)c.days++;
   const girls=selxAll();const raw=entSkipRaw();const t={art:(()=>{try{return entKind(entBest())}catch(e){return""}})()};
   const kept=mk=>{const L=selxContest(girls,{marks:mk,t});const me=L.find(x=>x.v===S);return me.place<=BAL.selx.yard.kept};
   if(kept({mini:raw}))c.A++;if(kept({mini:raw,dd:M.hit,hx:M.hit}))c.B++;if(kept({mini:raw,dd:M.hit,hx:M.miss}))c.C++;const p=selxOddsP(raw);c.pA+=p||0}
  c.pA=Math.round(c.pA/Math.max(1,c.n));out[og]=c}return out},[+(process.env.N||25),JSON.parse(process.env.OG||'["cn","tt"]')]);
 console.log(JSON.stringify(r));await b.close()})();
