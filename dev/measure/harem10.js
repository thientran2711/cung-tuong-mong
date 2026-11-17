/* review/residence-seats: harem size and housing over 10 game years (idle player kept alive; the NPC world runs: tuyển tú, maids raised,
   deaths, promotions). usage: node dev/measure/harem10.js <url> [lives=20] [months=120]
   Prints JSON: per year max/mean living consorts (her counted), max ever, co-resident histogram per chủ vị (0/1/2/3+), holders per capped
   rank (max), how often she lived in a side hall / Ngọc Thanh các while below Tần, ms per endTurn. */
const {chromium}=require('playwright');const [,,URL,LIVES='20',MON='120']=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch({args:['--blink-settings=imagesEnabled=false']});const ctx=await b.newContext({serviceWorkers:'block'});
 await ctx.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 const errs=[];const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message.slice(0,160)));p.setDefaultTimeout(3600000);
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 const ORIG=['tt','dtq','th','muoi','nc','td','thd','cn','cnv'];const lives=[];
 for(let L=0;L<+LIVES;L++){lives.push(await p.evaluate(([L,MON,ORIG])=>{const live=x=>x===S?!S.out&&!S.dead:x.alive&&!x.out;
   window.__forceOrigin=ORIG[L%ORIG.length];SLOT=3;quiet=true;window.__nlInner=1;start();window.__nlInner=0;quiet=true;const r0=render;render=()=>{};
   const yr=[],co=[0,0,0,0],rk={};let side=0,nt=0,low=0,ms=0,n=0,start0=liveRivals(true).length+1;
   for(let m=0;m<MON;m++){Q.length=0;S.mg=null;if(S.dead)S.dead=false;if(S.suc<20)S.suc=60;if(S.out)S.out=false;const t=performance.now();try{endTurn()}catch(e){return{err:e.message}}ms+=performance.now()-t;n++;
    const h=liveRivals(true).length+1;const y=Math.floor(m/12);yr[y]=Math.max(yr[y]||0,h);
    for(const r of [3,4,5,6,7]){const c=[S].concat(rivals).filter(p=>live(p)&&rkOf(p)===r).length;rk[r]=Math.max(rk[r]||0,c)}
    try{for(const H of [S].concat(rivals).filter(palHostOK)){const c=[S].concat(rivals).filter(y=>y!==H&&live(y)&&!y.queen&&y.resHead===key(H)&&!(rkOf(y)>=3&&y.pal!=null)).length;co[Math.min(3,c)]++}}catch(e){}
    if(rkOf(S)<3&&!S.out){low++;const r=residenceOf(S);if(r.part==='dong'||r.part==='tay')side++;else if(r.part==='ngocthanh')nt++}}
   render=r0;return{orig:window.__forceOrigin,start:start0,yr,co,rk,side,nt,low,msTurn:+(ms/n).toFixed(1)}},[L,+MON,ORIG]));process.stderr.write('.')}
 const agg={lives:lives.length,start:lives.map(x=>x.start),maxEver:Math.max(...lives.map(x=>Math.max(...(x.yr||[0])))),
  perYearMax:[...Array(Math.ceil(+MON/12)).keys()].map(y=>Math.max(...lives.map(x=>(x.yr||[])[y]||0))),
  perYearMean:[...Array(Math.ceil(+MON/12)).keys()].map(y=>+(lives.reduce((a,x)=>a+((x.yr||[])[y]||0),0)/lives.length).toFixed(1)),
  coHist:lives.reduce((a,x)=>(x.co||[0,0,0,0]).map((v,i)=>a[i]+v),[0,0,0,0]),rankMax:lives.reduce((a,x)=>{for(const k in x.rk||{})a[k]=Math.max(a[k]||0,x.rk[k]);return a},{}),
  herSide:lives.reduce((a,x)=>a+(x.side||0),0),herNT:lives.reduce((a,x)=>a+(x.nt||0),0),herLow:lives.reduce((a,x)=>a+(x.low||0),0),
  msTurn:+(lives.reduce((a,x)=>a+(x.msTurn||0),0)/lives.length).toFixed(1),errs:errs.slice(0,5),lifeErr:lives.filter(x=>x.err).map(x=>x.err).slice(0,3)};
 console.log(JSON.stringify(agg));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
