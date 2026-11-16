/* night-time analysis bot (report only). Real weekly loop (endTurn: flip -> nights -> rivalsTurn -> monthTick), base = review/preg-rate-r1 (BAL.conc .5 + fertile window).
 usage: node night-bot.js <index.html> <lives> <years> <out.json>
 env SUNG (her Sủng floor, default 25), SEED0, K (nights per tuần; 1 = today), CONC (multiplier on BAL.conc), EMPX (1 = 1st/15th automatic Empress night replaces the flip on tuần 0/1, option D1-B)
 With K>1 the extra K-1 nights are drawn from the SAME weights as the tray (nightCh), like a Kính sự phòng ledger; each extra night = conception roll (night(p)) + nights counter, no Sủng gain. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,PAGE,LS,YS,OUT]=process.argv;const LIVES=+LS||10,YEARS=+YS||10,CH=5;
const SEEDRNG=`(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`;
(async()=>{const b=await chromium.launch({args:['--js-flags=--max-old-space-size=900','--disable-gpu']});const lives=[];const errs=[];
 for(let done=0;done<LIVES;done+=CH){
  const ctx=await b.newContext({viewport:{width:1000,height:755},reducedMotion:'reduce'});
  await ctx.addInitScript(`window.__seed=${(+process.env.SEED0||5000)+done*7919};`+SEEDRNG+`window.__sung=${+process.env.SUNG||25};window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};`);
  const p=await ctx.newPage();p.setDefaultTimeout(3600000);await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
  p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  if(process.env.CONC)await p.evaluate(`BAL.conc=BAL.conc*${+process.env.CONC}`);
  const part=await p.evaluate(([n,Y,K,EMPX,NOCY])=>{const out=[];try{document.getElementById('title').hidden=true}catch(e){}window.__nlInner=1;
   window.render=function(){};if(NOCY&&typeof cyAsk==="function")cyAsk=function(){return false};
   let L=null;const T=(k,v=1)=>L[k]=(L[k]||0)+v;
   const ng0=night;night=function(q){q=q||S;if(!q.preg){const me=q===S?"me":"npc";T(me+"N");T(me+"C",conceiveCh(q));const r=ng0.apply(this,arguments);if(q.preg)T(me+"P");return r}return ng0.apply(this,arguments)};
   const pickW=()=>{const C=consorts().filter(p=>nightCh(p)>0);if(!C.length)return null;const w=C.map(p=>nightCh(p));let r=Math.random()*w.reduce((a,b)=>a+b),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}return C[i]};
   const fl=flip;flip=function(){
     if(EMPX&&(S.tuan===0||S.tuan===1)){const q=queenP();if(q&&q!==S&&nightCh(q)>0){S.tonight=q;T("empx");return}}
     const r=fl.apply(this,arguments);try{if(S.dead)return r;L.tuan++;const d=S.nightWhy;
     if(d&&d.wk===wk()){const me=d.rows.find(x=>x.id==="me");const tot=d.rows.reduce((a,x)=>a+x.w,0);const elig=d.rows.filter(x=>x.w>0).length;
       T("tray",elig);if(me&&me.w>0){T("eligT");T("share",me.w/(tot||1))}
       if(d.pick==="me"){T("meFlip");L.mo[S.turn]=1}else if(d.pick)T("npcFlip");else T("noFlip");T("cause_"+d.cause)}
     for(let k=1;k<K;k++){const t=pickW();if(!t)continue;if(t===S){T("meLedger");L.mo[S.turn]=1;night(S)}else{t.nights++;t.nightLog.push(wk());night(t)}}
    }catch(e){T("botErr")}return r};
   for(let l=0;l<n;l++){L={tuan:0,mo:{}};try{localStorage.clear()}catch(e){}
    for(let i=0;i<60;i++){start();if(!(typeof isSrv==="function"&&isSrv()))break}Q.length=0;S.mg=0;
    const seen=new Set(allKids().map(([k])=>k));let npcB=0,meB=0,consY=0,hh=0;
    for(let w=0;w<Y*36&&!S.dead;w++){
     S.sung=Math.max(S.sung,+(window.__sung||25));S.danh=Math.max(S.danh,15);S.suc=Math.max(S.suc,60);S.duc=Math.max(S.duc,55);S.bac=Math.max(S.bac,80);S.rank=Math.max(S.rank,2);
     if(S.tonight==="me"){S.tonight=null;try{night(S)}catch(e){}}
     Q.length=0;S.mg=0;
     try{endTurn()}catch(e){out.push({err:String(e).slice(0,160)});break}Q.length=0;S.mg=0;
     if(S.tuan===0)consY+=liveRivals(true).length/12;if(S.rank>=7)hh=1;
     allKids().forEach(([k,v])=>{if(!seen.has(k)){seen.add(k);if(v)npcB++;else meB++}})}
    const ks=allKids().filter(([k])=>k.alive);
    out.push({months:S.turn||0,dead:!!S.dead,npcB,meB,consY,hh,kids:ks.length,npcSons:ks.filter(([k,v])=>v&&k.sex==="m").length,meSons:ks.filter(([k,v])=>!v&&k.sex==="m").length,
     heirNpc:!!(S.heir&&S.heir.v),heirMe:!!(S.heir&&!S.heir.v&&S.heir.k),moWith:Object.keys(L.mo).length,t:Object.assign({},L,{mo:0})})}
   return out},[Math.min(CH,LIVES-done),YEARS,+process.env.K||1,+process.env.EMPX||0,+process.env.NOCY||0]);
  lives.push(...part);await ctx.close();console.error("lives",lives.length)}
 await b.close();fs.writeFileSync(OUT,JSON.stringify({env:{NOCY:process.env.NOCY,K:process.env.K,CONC:process.env.CONC,SUNG:process.env.SUNG,EMPX:process.env.EMPX},lives,errs:errs.slice(0,10)}))})().catch(e=>{console.error(e);process.exit(1)});
