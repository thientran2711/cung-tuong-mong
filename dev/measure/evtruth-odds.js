/* review/evidence-truth-r1: the odds of each step of a frame-up, over every consort pair of a fresh court (fast; no play):
   caught (oSee of the victim), planted (oFrame of the framer, after not caught), defence (frameDef best road, BAL.truth), and the
   player's defence roads by Tai mắt. usage: NODE_PATH=$(npm root -g) node dev/measure/evtruth-odds.js URL [seeds=3] ['{"frameHide":0}' BAL.truth override] */
const {chromium}=require('playwright');const [,,URL,NS,BALJ]=process.argv;const SEEDS=+NS||3;
(async()=>{const b=await chromium.launch();const out=[];
 for(let sd=1;sd<=SEEDS;sd++){const ctx=await b.newContext({viewport:{width:1000,height:755},reducedMotion:'reduce',serviceWorkers:'block'});
  await ctx.addInitScript(([sd])=>{let s=sd*7919+12345;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},[sd]);
  await ctx.route(/\.(webp|png|jpe?g|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());const p=await ctx.newPage();
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function',null,{timeout:0});await p.waitForTimeout(1000);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:120000});
  if(BALJ)await p.evaluate(j=>Object.assign(BAL.truth,JSON.parse(j)),BALJ);
  out.push(await p.evaluate(()=>{const L=liveRivals(false);const P=[S].concat(L);const acc={n:0,caught:0,plant:0,def:0,stick:0},me={n:0,caught:0,plant:0};
   for(const a of L)for(const t of P){if(a===t)continue;ACTX={a,t,pen:0};let pc,pf;try{pc=cl(oSee(t,false)-4*(facN(a)-1),5,95)/100;pf=oFrame(a)/100}finally{ACTX={a:null,pen:0}}
    if(t===S){me.n++;me.caught+=pc;me.plant+=(1-pc)*pf;continue}
    const d=frameDef(t,a).o/100;acc.n++;acc.caught+=pc;acc.plant+=(1-pc)*pf;acc.def+=d;acc.stick+=(1-pc)*pf*(1-d)}
   const r=x=>Math.round(x*1000)/10;const T=BAL.truth;const road={};
   for(const mat of [0,2,4]){const base=T.clearBase+mat*T.clearMat;const c=x=>cl(Math.round(x),T.clearMin,T.clearMax);
    road["Tai mắt "+mat]={"Kính sự phòng, không có đêm":c(base-10),"Kính sự phòng, có đêm hầu":c(base+T.ksB),"cung nữ làm chứng":c(base+T.wB),"Thái y":c(base+T.tyB),"trình chứng cứ":c(base+T.evB*2+10)}}
   /* empirical: run the real act N times from the same saved state (all modifiers: sent servant, wit, traits, guard) */
   const pd0=pushDil;pushDil=function(d,title){if(title==="Bị vu oan")window.__vuoanN=(window.__vuoanN||0)+1;return pd0.apply(this,arguments)};const snap=JSON.stringify(ser());const E={npc:{n:0,planted:0,cleared:0},me:{n:0,planted:0}};const Q0=Q.length;
   for(let i=0;i<300;i++){deser(JSON.parse(snap));Q.length=0;const L2=liveRivals(false);const a=pick(L2);const me=i%3===0;const t=me?S:pick(L2.filter(x=>x!==a));if(!t||sameHouse(a,t))continue;try{if(typeof npcKnows==="function"&&!npcKnows(a,t))npcLearn(a,t)}catch(e){}
    window.__frames=0;window.__framesClear=0;window.__vuoanN=0;let r="";try{r=runAct(a,t,"frame")||""}catch(e){}
    if(me){E.me.n++;if(window.__vuoanN)E.me.planted++}
    else{E.npc.n++;if(window.__frames)E.npc.planted++;if(window.__framesClear)E.npc.cleared++}}
   deser(JSON.parse(snap));Q.length=0;
   const emp={npcAttempts:E.npc.n,npcPlanted:r(E.npc.planted/E.npc.n),npcClearedOfPlanted:E.npc.planted?r(E.npc.cleared/E.npc.planted):0,npcSticks:r((E.npc.planted-E.npc.cleared)/E.npc.n),meAttempts:E.me.n,mePlanted:r(E.me.planted/E.me.n)};
   return {empirical:emp,npc:{pairs:acc.n,caught:r(acc.caught/acc.n),planted:r(acc.plant/acc.n),defence:r(acc.def/acc.n),sticks:r(acc.stick/acc.n)},
    onPlayer:{framers:me.n,caught:r(me.caught/me.n),planted:r(me.plant/me.n)},playerRoads:road,playerMat:S.mat}}));
  await ctx.close()}
 console.log(JSON.stringify(out,null,1));await b.close()})();
