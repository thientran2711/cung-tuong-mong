/* fast weekly loop: start → endTurn ×36/yr; yearly snapshots of NPC + her stats. usage: node fast.js <html> <lives> <years> */
const {chromium}=require('playwright');const path=require('path');
const SEEDRNG=`(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`;
(async()=>{const [,,PAGE,LS,YS]=process.argv;const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1000,height:755},reducedMotion:'reduce'});
await ctx.addInitScript(`window.__seed=${+process.env.SEED||9100};`+SEEDRNG+`window.__bot=1;window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};`);
const p=await ctx.newPage();p.setDefaultTimeout(1800000);await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
const r=await p.evaluate(([n,Y])=>{window.render=function(){};try{document.getElementById('title').hidden=true}catch(e){}if(typeof cyAsk==="function")cyAsk=function(){return false};
 const snaps=[];const orgs={};let eaM=0,eaKnow=0,eaNpcK=0,eaNpc=0;
 for(let l=0;l<n;l++){try{localStorage.clear()}catch(e){}for(let i=0;i<60;i++){start();if(!(typeof isSrv==="function"&&isSrv()))break}Q.length=0;S.mg=0;
  for(let w=0;w<Y*36&&!S.dead;w++){S.suc=Math.max(S.suc,40);if(S.tonight==="me"){S.tonight=null;try{night(S)}catch(e){}}Q.length=0;S.mg=0;
   try{endTurn()}catch(e){snaps.push({err:String(e).slice(0,200)});break}Q.length=0;S.mg=0;
   if(w%3===0&&typeof empArt==="function"){if(empArt())eaM++;if(typeof eaKnows==="function"){if(eaKnows(S))eaKnow++;const R=liveRivals(true);eaNpc+=R.length;eaNpcK+=R.filter(eaKnows).length}}
   if(w%36===35||w===0){const R=liveRivals(true);const best=v=>Math.max(...Object.values(v.arts||{0:0}));const T=[0,0,0,0,0,0];R.forEach(v=>T[best(v)]++);
    const av=k=>Math.round(R.reduce((a,v)=>a+(v[k]||0),0)/Math.max(1,R.length));
    snaps.push({y:Math.round(w/36),n:R.length,tai:av('tai'),sac:av('sac'),tamco:av('tamco'),duc:Math.round(R.reduce((a,v)=>a+ducOf(v),0)/Math.max(1,R.length)),danh:av('danh'),sung:av('sung'),bestTier:T,
      me:{sac:S.sac,tai:S.tai,tamco:S.tamco,duc:S.duc,danh:S.danh,sung:S.sung,bac:S.bac,best:Math.max(...Object.values(S.arts))}});R.forEach(v=>{orgs[v.org||'?']=(orgs[v.org||'?']||0)+1})}}}
 return{snaps,orgs,ea:{months:eaM,meKnow:eaKnow,npcKnowShare:eaNpc?+(eaNpcK/eaNpc).toFixed(2):null}}},[+LS||4,+YS||4]);
const by={};for(const s of r.snaps){if(s.err){console.log('ERR',s.err);continue}(by[s.y]=by[s.y]||[]).push(s)}
for(const y in by){const L=by[y];const a=k=>Math.round(L.reduce((x,s)=>x+s[k],0)/L.length);const am=k=>Math.round(L.reduce((x,s)=>x+s.me[k],0)/L.length);const T=[0,0,0,0,0,0];L.forEach(s=>s.bestTier.forEach((v,i)=>T[i]+=v));
 console.log(`y${y} n${L.length} NPC tai ${a('tai')} sac ${a('sac')} tamco ${a('tamco')} duc ${a('duc')} danh ${a('danh')} sung ${a('sung')} bestArtTier ${T.join('/')} | her(passive) sac ${am('sac')} tai ${am('tai')} tamco ${am('tamco')} duc ${am('duc')} danh ${am('danh')} sung ${am('sung')} best ${am('best')}`)}
console.log('npc origins',JSON.stringify(r.orgs),'ea',JSON.stringify(r.ea));console.log('page errors',errs.length,errs.slice(0,5).join(' | '));await b.close()})();
