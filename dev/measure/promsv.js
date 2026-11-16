// usage: GAME=<dev/index.html of a build> node dev/measure/promsv.js <lives> <out.json>
// D41 promote-servants: Bạc / favour / loyalty flow of servant promotions, before (origin/main) vs after (review/promote-servants).
// Sensible bot (inpage6). Her policy (same in both builds, the bot never taps servant buttons): once a month, for each servant that
// can be promoted (dbNeed all ok), promote with the Bạc road if Bạc >= 2× price, else with the favour road when the build has it
// (spFav ok). Records per life: promotions by road, Bạc / favour spent, her servants' mean loyalty (monthly), proud / leave events,
// NPC promotions by road, NPC servants' mean loyalty, NPC servants who moved palace.
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const M=__dirname,GAME=process.env.GAME||path.join(M,'..','index.html'),N=+process.argv[2]||3,out=process.argv[3];
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844}});
 await ctx.addInitScript(()=>{window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};HTMLElement.prototype.focus=function(){};});
 const page=await ctx.newPage();await page.route(/\.(webp|png|jpg|mp3|ogg)$/,r=>r.abort());const errs=[];page.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await page.goto('file://'+GAME);await page.waitForTimeout(500);await page.evaluate(()=>localStorage.clear());await page.reload();await page.waitForTimeout(500);
 await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(800);
 await page.evaluate(`window.__hhStop=1`);await page.evaluate(fs.readFileSync(path.join(M,'inpage6.js'),'utf8'));
 await page.evaluate(()=>{const Z=window.__ps={lives:[]};let L=null;const life=()=>{if(!L||L.id!==S.id0){L={id:S.id0,mo:0,pB:0,pF:0,pBac:0,pFav:0,loy:[],npcB:0,npcF:0,npcLoy:[],proud:0,leaveCard:0,npcMove:0,bacMo:[],el:0,nel:0,lowLoy:0};Z.lives.push(L)}return L};
  if(typeof spLeaveCard==="function"){const l0=spLeaveCard;spLeaveCard=function(){try{life().leaveCard++}catch(e){}return l0.apply(this,arguments)}}
  if(typeof spMove==="function"){const m0=spMove;spMove=function(o){try{if(o!==S)life().npcMove++}catch(e){}return m0.apply(this,arguments)}}
  const d0=dbDo;dbDo=function(o,s,road){const r0=srk(s);const b0=o.bac;const r=d0.apply(this,arguments);try{if(r!=null&&o!==S){const l=life();if(road==="fav")l.npcF++;else l.npcB++}}catch(e){}return r};
  const s0=servRanks;servRanks=function(){let ev="";try{if(S&&!S.dead&&!S.srv&&!S.out){if(!S.id0)S.id0=Math.random();const l=life();
    for(const s of (S.staff||[]).slice()){const N=dbNeed(S,s);if(N[0].ok&&!N[1].ok)l.lowLoy++;if(!N.every(x=>x.ok))continue;l.el++;const c=dbCost(s);
     if(S.bac>=2*c){const b=S.bac;dbDo(S,s);l.pB++;l.pBac+=b-S.bac}else if(typeof spFav==="function"){const f=spFav(S,s);if(f.ok){dbDo(S,s,"fav");l.pF++;l.pFav+=f.n}}}}}catch(e){console.error(e)}
   ev=s0.apply(this,arguments);
   try{if(S&&!S.dead&&!S.srv){const l=life();l.mo++;const m=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:null;const my=(S.staff||[]).map(x=>x.loyal);if(my.length)l.loy.push(m(my));
    const np=[].concat(...liveRivals(true).map(v=>(v.staff||[]).map(x=>x.loyal)));if(np.length)l.npcLoy.push(m(np));l.proud+=(S.staff||[]).filter(x=>x.proud&&x.proud>S.turn).length;l.bacMo.push(S.bac);for(const v of liveRivals(true))for(const x of (v.staff||[]))if(dbNeed(v,x).every(y=>y.ok))l.nel++}}catch(e){}
   return ev}});
 while(true){const n=await page.evaluate(()=>window.__bot.step("sens",300));fs.writeFileSync(out,JSON.stringify(await page.evaluate(()=>window.__ps)));if(n>=N)break}
 const Z=await page.evaluate(()=>window.__ps);const m=a=>a.length?Math.round(a.reduce((x,y)=>x+y,0)/a.length*10)/10:null;
 const S=Z.lives.filter(l=>l.mo>=6).map(l=>({mo:l.mo,pB:l.pB,pF:l.pF,pBac:l.pBac,pFav:l.pFav,loy:m(l.loy),npcB:l.npcB,npcF:l.npcF,npcLoy:m(l.npcLoy),proudMo:l.proud,leave:l.leaveCard,npcMove:l.npcMove,bac:m(l.bacMo),elig:l.el,lowLoy:l.lowLoy,npcElig:l.nel}));
 console.log(JSON.stringify(S));console.log('pageerrors',JSON.stringify(errs.slice(0,5)));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
