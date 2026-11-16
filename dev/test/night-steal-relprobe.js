/* reviewer probe r2: NPC→her vs NPC→same-rank NPC relation drift + harm-act targeting, passive life (bot loop). env SEED0, GHEN0=1 zeroes v.ghen every week (counterfactual) */
const {chromium}=require('playwright');const path=require('path');const [,,PAGE,LS,YS]=process.argv;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1000,height:755}});const p=await ctx.newPage();
 await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(`window.__seed=${+process.env.SEED0||1};(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`);
 await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const R=await p.evaluate(([n,Y,G0])=>{try{document.getElementById('title').hidden=true}catch(e){}window.render=function(){};if(typeof cyAsk==="function")cyAsk=function(){return false};
  const A={harmMe:0,harmNpc:0,pairsMe:0,pairsNpc:0,affMe:[],affNpc:[],dMe:[],dNpc:[],socMe:0,socNpc:0};let on=false;
  const na=npcAct;npcAct=function(v,t){const r=na.apply(this,arguments);if(on&&r){if(t===S)A.harmMe++;else A.harmNpc++}return r};
  const ra=relAdd;relAdd=function(x,y,n){if(on&&x!==S&&x&&y){if(y===S)A.socMe+=n;else if(y!==S)A.socNpc+=n}return ra.apply(this,arguments)};
  for(let l=0;l<n;l++){try{localStorage.clear()}catch(e){}on=false;for(let i=0;i<60;i++){start();if(!(typeof isSrv==="function"&&isSrv()))break}Q.length=0;S.mg=0;on=true;
   for(let w=0;w<Y*36&&!S.dead;w++){S.sung=Math.max(S.sung,25);S.danh=Math.max(S.danh,15);S.suc=Math.max(S.suc,60);S.duc=Math.max(S.duc,55);S.bac=Math.max(S.bac,80);S.rank=Math.max(S.rank,2);
    if(G0)for(const v of liveRivals(true))v.ghen=0;
    if(S.tonight==="me"){S.tonight=null;try{night(S)}catch(e){}}Q.length=0;S.mg=0;try{endTurn()}catch(e){break}Q.length=0;S.mg=0;
    const R=liveRivals(true);A.pairsMe+=R.length;A.pairsNpc+=R.length*(R.length-1)}
   on=false;const R=liveRivals(true);for(const v of R){A.affMe.push(aff(v,S));A.dMe.push(danger(v,S));for(const t of R)if(t!==v&&rkOf(t)===rkOf(S)){A.affNpc.push(aff(v,t));A.dNpc.push(danger(v,t))}}}
  const m=a=>a.length?(a.reduce((x,y)=>x+y,0)/a.length).toFixed(1):"-";
  return {harmPerPairMe:(1000*A.harmMe/A.pairsMe).toFixed(2),harmPerPairNpc:(1000*A.harmNpc/A.pairsNpc).toFixed(2),relAddPerPairMe:(1000*A.socMe/A.pairsMe).toFixed(1),relAddPerPairNpc:(1000*A.socNpc/A.pairsNpc).toFixed(1),
   affToHer:m(A.affMe),affToSameRankNpc:m(A.affNpc),dangerToHer:m(A.dMe),dangerToSameRankNpc:m(A.dNpc),nMe:A.affMe.length,nNpc:A.affNpc.length}},[+LS||6,+YS||3,+process.env.GHEN0||0]);
 console.log(JSON.stringify(Object.assign({seed:process.env.SEED0,ghen0:+process.env.GHEN0||0,pageErrors:errs.length},R)));await b.close()})();
