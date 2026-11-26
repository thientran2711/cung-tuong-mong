/* ACT-MERGE J1 — the ONE deck-door path (jdoor.js DOOR.deck, MAIN 158 RV-ACT-MERGE F2). Registers sample rows the way the deck jobs do
   (hs: J3 «Nghỉ ngơi» / «Thỉnh an» / «Tai mắt»; cold: J5 «Nghỉ ngơi» lãnh cung), deals over seeds, and checks on the rendered Hành sự panel:
     1 a door shows only when ≥ 2 of its ways are dealt; its ways are no longer bare cards; a lone way stays bare;
     2 the deck itself is untouched (display only): every dealt card is still in `deck`;
     3 a door tap opens the DOOR.card choice card listing exactly its ways (+ Thôi), costs 0 khắc;
     4 picking a free way runs act(i) of that card: khắc spent = its cardCost, the card is done;
     5 0 page errors.
   usage: node dev/test/act-merge-j1-deck.test.js [url] — exit 1 on any failure */
const path=require('path');const {chromium}=require('playwright');const ROOT=path.resolve(__dirname,'../..');
const URL=process.argv[2]||'file://'+path.join(ROOT,'index.html');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof DOOR==='object',null,{timeout:0});await p.waitForTimeout(2500);
 const R=await p.evaluate(async()=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const F=[];let doors=0,runs=0,cards=0;const seen={};
  DOOR.deck({k:"t-nghi",n:"Nghỉ ngơi",roads:["hs"],h:"Nghỉ một lát, nghỉ dưỡng sức, hay dưỡng nhan.",re:/^(Nghỉ ngơi một lát|Nghỉ ngơi dưỡng sức|Dưỡng nhan)$/});
  DOOR.deck({k:"t-thinhan",n:"Thỉnh an",roads:["hs"],h:"Sang thỉnh an Thái hậu hay Hoàng hậu.",re:/^(Thỉnh an Thái hậu|Thỉnh an Hoàng hậu)$/});
  DOOR.deck({k:"t-taimat",n:"Tai mắt",roads:["hs"],h:"Sai cung nữ dò la, nghe ngóng chung, hay cài tai mắt.",re:/^(Sai cung nữ đi dò la|Nghe ngóng chung|Cài tai mắt)$/});
  DOOR.deck({k:"t-cold",n:"Nghỉ ngơi",roads:["cold"],h:"Nghỉ, hay đọc sách.",re:/^(Nghỉ ngơi một lát|Đọc sách)$/});
  const R0=DOOR.D.filter(r=>/^t-/.test(r.k));
  try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;
  for(let s=0;s<16;s++){let sd=900+s;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};
   try{start()}catch(e){}for(let k=0;k<30&&(isSrv()||(typeof isKc==="function"&&isKc()));k++)start();window.__nlInner=0;Q.length=0;
   if(s%4===3){S.out=1}used=0;S.bac=Math.max(S.bac||0,300);if(S.suc<60)S.suc=80;deal();tab="act";render();await sleep(30);Q.length=0;
   const road=DOOR.road();const R=R0.filter(r=>r.roads.includes(road));const D=DOOR.deckDoors();
   const dealt={};deck.forEach(a=>{const r=R.find(r=>r.re.test(a.n||""));if(r)(dealt[r.n]=dealt[r.n]||[]).push(a.n)});
   for(const n in dealt){const d=D.find(x=>x.n===n);if(dealt[n].length>=2&&!d)F.push(`${road}/${s}: «${n}» ${dealt[n].length} ways dealt, no door`);if(dealt[n].length<2&&d)F.push(`${road}/${s}: «${n}» door with one way`)}
   const bare=[...document.querySelectorAll('#panel .cards > button.kcard[data-i]')].map(x=>deck[+x.dataset.i]&&deck[+x.dataset.i].n);
   for(const d of D){doors++;seen[road+":"+d.n]=d.ways;d.ways.forEach(w=>{if(bare.includes(w))F.push(`${road}/${s}: way «${w}» also bare beside door ${d.n}`);if(!deck.some(a=>a.n===w))F.push(`${road}/${s}: way «${w}» not in deck`)})}
   const d=D.find(x=>x.free.length);if(!d)continue;const btn=document.querySelector(`#panel button[data-ddoor="${d.n}"]`);const u0=used;btn.click();await sleep(30);
   const m=Q[0];if(!m||!m.opts){F.push(`${road}/${s}: door ${d.n} opened no card`);continue}cards++;if(used!==u0)F.push(`${road}/${s}: door spent ${used-u0}`);
   const rows=m.opts.filter(o=>o.n!=="Thôi").map(o=>o.n);if(rows.join("|")!==d.ways.join("|"))F.push(`${road}/${s}: card rows ${rows} ≠ ways ${d.ways}`);
   const k=m.opts.findIndex(o=>o.n!=="Thôi"&&!o.off);if(k<0){Q.length=0;continue}const a=deck.find(x=>x.n===m.opts[k].n);const tc=cardCost(a);
   chooseM(k);await sleep(60);Q.length=0;runs++;if(used-u0!==tc&&!a.pk)F.push(`${road}/${s}: «${a.n}» spent ${used-u0}, card cost ${tc}`);if(!a.done&&!a.pk&&!a.rep)F.push(`${road}/${s}: «${a.n}» not done`)}
  return{F,doors,runs,cards,seen}});
 console.log("ACT-MERGE J1 deck doors on",URL);for(const k in R.seen)console.log("  door",k,"←",R.seen[k].join(" · "));
 console.log(`doors drawn ${R.doors} · cards opened ${R.cards} · ways run ${R.runs} · page errors ${perr.length}`);perr.slice(0,4).forEach(e=>console.log("  perr",e));
 const U=[...new Set(R.F)];console.log("FAIL",U.length);U.slice(0,30).forEach(x=>console.log("  ✗",x));await b.close();process.exit(U.length||perr.length?1:0)})().catch(e=>{console.error(e);process.exit(1)});
