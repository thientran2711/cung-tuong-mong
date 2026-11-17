/* review/seatcap: a save made on the previous build with seats ALREADY over the cap (rank 6 ×3, rank 5 ×4 incl. her) loads in this build:
   the net settles it at once (≤ cap at every rank), she keeps her rank, each NPC pushed out lands on a free rank and gets the full-seat
   compensation (Bạc up), then 24 months run with ≤ cap every month. usage: node dev/test/seatcap-oldsave.js <oldUrl> <newUrl> [months]. exit 1 on fail. */
const {chromium}=require('playwright');const [,,OLD,NEW,MON='24']=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
async function boot(p,u){await p.goto(u,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}await sleep(500)}
(async()=>{const b=await chromium.launch({args:['--blink-settings=imagesEnabled=false']});const ctx=await b.newContext({serviceWorkers:'block'});await ctx.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 const errs=[];let p=await ctx.newPage();p.on('pageerror',e=>errs.push('old:'+e.message.slice(0,160)));p.setDefaultTimeout(600000);await boot(p,OLD);
 const saved=await p.evaluate(()=>{window.__forceOrigin='tt';SLOT=3;quiet=true;window.__nlInner=1;start();window.__nlInner=0;quiet=true;
  const L=liveRivals(false).filter(v=>!v.queen);while(L.length<6){const n=newRival(1);n.name=freshName();rivals.push(n);L.push(n)}
  L[0].rank=6;L[1].rank=6;L[2].rank=6;L[3].rank=5;L[4].rank=5;L[5].rank=5;S.rank=5;L.forEach((v,i)=>{v.lastPromo=i;v.bac=10});S.lastPromo=99;
  const H=r=>consorts().filter(q=>rkOf(q)===r).length;const before={6:H(6),5:H(5)};quiet=false;save();return {before,ids:L.map(v=>v.id)}});
 const LS=await p.evaluate(()=>JSON.stringify(Object.assign({},localStorage)));await p.close();
 p=await ctx.newPage();p.on('pageerror',e=>errs.push('new:'+e.message.slice(0,160)));p.setDefaultTimeout(600000);
 await p.addInitScript(ls=>{if(!sessionStorage.getItem('__ld')){sessionStorage.setItem('__ld','1');const o=JSON.parse(ls);for(const k in o)localStorage.setItem(k,o[k])}},LS);await boot(p,NEW);
 await p.evaluate(()=>{try{showTitle()}catch(e){}const b=document.querySelector('#slots [data-load="3"]');if(b)b.click()});await sleep(2500);
 const out=await p.evaluate(([MON,ids])=>{if(!S)return {ok:'no S after load'};const H=r=>consorts().filter(q=>rkOf(q)===r).length;const cap=BAL.seatCap;
  const after={};for(const r in cap)after[r]=H(+r);const moved=ids.map(id=>rivals.find(v=>v.id===id)).filter(Boolean).map(v=>({r:v.rank,bac:v.bac,hieu:v.hieu||''}));
  let ok=Object.keys(cap).every(r=>after[r]<=cap[r])&&S.rank===5?true:'not settled on load';quiet=true;const r0=render;render=()=>{};const t0=S.turn;let g=0,over=0;
  while(S.turn<t0+MON&&g++<MON*8){Q.length=0;S.mg=null;if(S.dead)S.dead=false;try{endTurn()}catch(e){ok='turn:'+e.message;break}for(const r in cap)if(H(+r)>cap[r])over++}
  render=r0;quiet=false;try{render()}catch(e){ok='render:'+e.message}if(over&&ok===true)ok='over cap after load: '+over;
  return {ok,her:S.rank,after,moved,over,settleN:window.__seatN}},[+MON,saved.ids]);
 console.log(JSON.stringify({saved,out,errs:errs.slice(0,6)}));await b.close();process.exit(errs.length||out.ok!==true?1:0)})().catch(e=>{console.error(e);process.exit(1)});
