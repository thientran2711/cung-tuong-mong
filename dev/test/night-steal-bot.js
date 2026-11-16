/* night-steal frequency bot (review/night-steal). Real weekly loop (endTurn → resolveTonight → rivalsTurn → flip(+steal pass)).
 usage: node dev/test/night-steal-bot.js <index.html> <lives> <years> <out.json>   env SEED0, SUNG (her Sủng floor, default 25), K (BAL.steal.k override), CYASK=1 keeps the cycle question (default: off, so every flip resolves), DIFF=de|vua|kho sets the life difficulty (jdiff)
 Counts every Tranh sủng / Chặn ngự giá try made by an NPC (stealNight called by anyone but her), per flip night, split by target (her / NPC)
 and by the doer's first trait. Works on old builds too (flip-time steals counted the same way).
 night-steal-2: per night also [her?, holder rank, tries, stolen] in L.N (holder = the one robbed, else the night's pick) → same-rank NPC control row in
 night-steal-sum.js; flips made inside start() (the new-life re-roll loop, which can call start() many times) are not counted. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,PAGE,LS,YS,OUT]=process.argv;const LIVES=+LS||10,YEARS=+YS||5,CH=5;
const SEEDRNG=`(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`;
(async()=>{const b=await chromium.launch({args:['--js-flags=--max-old-space-size=900','--disable-gpu']});const lives=[];const errs=[];const t0=Date.now();
 for(let done=0;done<LIVES;done+=CH){
  const ctx=await b.newContext({viewport:{width:1000,height:755},reducedMotion:'reduce'});
  await ctx.addInitScript(`window.__seed=${(+process.env.SEED0||7000)+done*7919};`+SEEDRNG+`window.__bot=1;window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};`);
  const p=await ctx.newPage();p.setDefaultTimeout(3600000);await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
  p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  if(process.env.K)await p.evaluate(`BAL.steal.k=${+process.env.K}`);
  const part=await p.evaluate(([n,Y,SUNG,NOCY0,DIFF])=>{const out=[];try{document.getElementById('title').hidden=true}catch(e){}window.render=function(){};if(!NOCY0&&typeof cyAsk==="function")cyAsk=function(){return false};
   let L=null,inF=false,inStart=false,nt=null;const st0=start;start=function(){inStart=true;try{return st0.apply(this,arguments)}finally{inStart=false}};const T=(k,v=1)=>L[k]=(L[k]||0)+v;
   const sn=stealNight;stealNight=function(v,t,mode){const before=tonightOf();const r=sn.apply(this,arguments);
     if(v!==S&&inF&&r&&nt&&!nt.h)nt.h=t;if(v!==S&&inF&&r&&!inStart){nt&&nt.tr++;const ok=tonightOf()===v&&before!==v;const tg=t===S?"me":"npc";const tr=(traitsOf(v)[0])||"?";
       T("try_"+tg);if(ok){T("win_"+tg);nt&&(nt.win=1)}L.tr[tr]=L.tr[tr]||[0,0];L.tr[tr][0]++;if(ok)L.tr[tr][1]++;T("mode_"+mode)}return r};
   const fl=flip;flip=function(){inF=true;nt={h:null,tr:0,win:0};let r;try{r=fl.apply(this,arguments)}finally{inF=false}try{if(!S.dead&&!inStart){T("weeks");const h=tonightOf();const d=S.nightWhy;
     const first=d&&d.wk===wk()?(d.flip0||d.pick):null;if(first||h){T("nights");for(const v of liveRivals(true)){const tr=(traitsOf(v)[0])||"?";L.ex=L.ex||{};L.ex[tr]=(L.ex[tr]||0)+1}if(first==="me"||(d&&d.pick==="me")||h===S)T("meNights");
       const ph=d&&d.wk===wk()&&d.pick!=null?(d.pick==="me"?S:liveRivals(true).find(x=>x.id===d.pick)):h;const hd=nt.h||ph;if(hd){L.N=L.N||[];L.N.push([hd===S?1:0,rkOf(hd),nt.tr,nt.win])}}}}catch(e){}return r};
   for(let l=0;l<n;l++){L={tr:{}};try{localStorage.clear()}catch(e){}
    for(let i=0;i<60;i++){start();if(!(typeof isSrv==="function"&&isSrv()))break}if(DIFF&&typeof diffApply==="function"){S.diff=DIFF;diffApply()}Q.length=0;S.mg=0;
    for(let w=0;w<Y*36&&!S.dead;w++){
     S.sung=Math.max(S.sung,SUNG);S.danh=Math.max(S.danh,15);S.suc=Math.max(S.suc,60);S.duc=Math.max(S.duc,55);S.bac=Math.max(S.bac,80);S.rank=Math.max(S.rank,2);
     if(S.tonight==="me"){S.tonight=null;try{night(S)}catch(e){}}
     Q.length=0;S.mg=0;try{endTurn()}catch(e){out.push({err:String(e).slice(0,160)});break}Q.length=0;S.mg=0;T("rivN",liveRivals(true).length)}
    out.push(L)}
   return out},[Math.min(CH,LIVES-done),YEARS,+process.env.SUNG||25,+process.env.CYASK||0,process.env.DIFF||""]);
  lives.push(...part);await ctx.close();console.error("lives",lives.length,Math.round((Date.now()-t0)/1000)+"s")}
 await b.close();fs.writeFileSync(OUT,JSON.stringify({env:{K:process.env.K,SUNG:process.env.SUNG},lives,errs:errs.slice(0,10)}))})().catch(e=>{console.error(e);process.exit(1)});
