/* New lives: right after start(), how many consorts are recorded 'ở cung mình' in a palace that is not hers (palFix ran after the plan). usage: node ia_start_stale.js <url> */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext()).newPage();await p.route(/\.(webp|png|jpg|mp3|ogg)$/,r=>r.abort());
await p.goto(process.argv[2]||'http://127.0.0.1:8971/t.html');await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{const O=['tt','dtq','muoi','cn','nc','td','ch','thd','cnv'];const out={n:0,stale:0,ex:[],mapless:0};
 for(let i=0;i<36;i++){localStorage.clear();window.__forceOrigin=O[i%9];document.getElementById('title').hidden=true;start();if(NLP)nlAccept(true);Q.length=0;try{closeModal()}catch(e){}render();
  out.n++;const R=S.roster,kh=j95kh();let bad=0;const spots=new Set(places().map(x=>x.k));
  for(const v of liveRivals(true)){const e=R.P["v"+v.id];if(!e)continue;if(e[kh][3]==="ở cung mình"&&e[kh][0]!==palaceOf(v)){bad++;if(out.ex.length<6)out.ex.push(`${S.origin.k}: ${v.name} ${e[kh][0]} vs ${palaceOf(v)} spot:${spots.has(e[kh][0])}`)}}
  for(const id in R.P){const k=R.P[id][kh][0];if(!spots.has(k)&&k!=="home"){out.mapless++;break}}
  if(bad)out.stale++}return out});
console.log(JSON.stringify(r,null,1));await b.close()})();
