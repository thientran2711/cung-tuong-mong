/* palace-distance-bot (review/palace-distance): per palace, her and an NPC with the same Sủng / rank living there, N tuần of the REAL rolls:
   tablet = weighted pick over every consort by nightCh (the j8 flip formula; summon roll left out = the same factor for every palace),
   visit = roll(visCh) per tuần (jvisit; gap ignored = the same for every palace). Sủng per night = nightGain(2).sung (+ the far add), far visit bonus (pdVisBonus).
   Prints a table (far, tablet nights, visits, Sủng from nights + visits per 100 tuần) for her and for the NPC.  usage: node dev/measure/palace-distance-bot.js [tuần=4000] */
const {chromium}=require('playwright');const path=require('path');const N=+process.argv[2]||4000;
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());
 await p.goto('file://'+path.resolve(__dirname,'../../index.html'),{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof pdFar==='function'&&typeof start==='function',null,{timeout:120000});await p.waitForTimeout(800);
 const r=await p.evaluate(N=>{quiet=true;start();quiet=false;S.srv=null;S.resHead=null;S.cyb={lie:wk()};for(const v of rivals)v.pal=null;
  const v=rivals.find(x=>x.alive&&!x.out&&!x.queen&&!x.coop&&!x.preg&&!illOf(x)&&!(typeof cyTray==='function'&&cyTray(x)));
  for(const q of [S,v]){q.rank=4;q.sung=60;q.an=30;q.preg=0;q.block=0;q.confined=0;q.out=0;q.tablet=0;q.admonWk=null}
  const C=consorts().filter(x=>x!==S&&x!==v);const rows=[];
  for(let i=0;i<PALN.length;i++){const row={pal:PALN[i],far:+pdFarIx(i).toFixed(2)};
   for(const [who,P] of [['her',S],['npc',v]]){P.pal=i;const others=C.filter(x=>x!==P);const L=[P].concat(others).concat(who==='her'?[v]:[S]);
    const W=L.map(x=>nightCh(x)),tot=W.reduce((a,b)=>a+b,0);let nights=0,vis=0;const vc=visCh(P);
    for(let k=0;k<N;k++){let r=Math.random()*tot,j=0;while(r>W[j]&&j<W.length-1){r-=W[j];j++}if(L[j]===P)nights++;if(roll(vc))vis++}
    const pw=pdWho;pdWho=P;const g=nightGain(2).sung;pdWho=pw;const bon=pdVisBonus(pdFar(P));const vS=BAL.visit.sung+(bon?bon.sung:0),vD=BAL.visit.danh+(bon?bon.danh:0);
    row[who]={nights:+(100*nights/N).toFixed(1),visits:+(100*vis/N).toFixed(2),sungN:+(100*nights/N*g).toFixed(1),sungV:+(100*vis/N*(vS+g)).toFixed(1),danhV:+(100*vis/N*vD).toFixed(1)}}
   rows.push(row)}
  v.pal=null;return rows},N);
 console.log(`palace | far | HER nights/100t · visits/100t · Sủng(nights) · Sủng(visits) · Danh(visits) | NPC same`);
 for(const x of r.sort((a,b)=>a.far-b.far))console.log(`${x.pal} | ${x.far} | ${x.her.nights} · ${x.her.visits} · ${x.her.sungN} · ${x.her.sungV} · ${x.her.danhV} | ${x.npc.nights} · ${x.npc.visits} · ${x.npc.sungN} · ${x.npc.sungV} · ${x.npc.danhV}`);
 await b.close()})();
