/* Kỳ ngộ thường ngày bot (review/kyngo-daily, dev/design/KYNGO.md §3/§14; OD 19/11 ~03:25Z: measure eligibility first, set the roll from it).
   usage: node dev/measure/kyngo-bot.js <url of root index.html> [lives=5] [weeks=36] [rank=1] [style=mix|walk|home] [off = jky switched off: baseline for the ledger net]
   She plays buổi by buổi at a fixed rank (band L = rank 0-2, M = 3-4, H = 5-7): each buổi walks to 0-2 places (style; the escort card is
   answered "Đi một mình"), then Sang buổi. Kỳ ngộ cards: a random option. Every other dialog is dropped, as in the other bots.
   Prints: buổi, eligible buổi (e = share), hits, gap per hit in tuần (mean / p10 / p90, the first gap counts from the life start), lives with zero
   hits, NPC hits per consort-buổi by band (parity), ids met, ilAudit net (must stay 0), jky errors, page errors. */
const {chromium}=require('playwright');const [,,URL,LIVES,WEEKS,RANK,STYLE,OFF]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block',reducedMotion:'reduce'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{timeout:0});await p.addStyleTag({content:'#kroul,#kroulw,#kload,.krbox,#dawn,#curtain,.fxo{display:none!important}'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof nextBuoi==='function'&&window.KY,null,{timeout:0});
 const r=await p.evaluate(([L,W,RK,ST,OF])=>{document.getElementById('title').hidden=true;if(OF)BAL.kyngo.on=0;
  const T={buoi:0,elig:0,hit:0,gaps:[],zero:0,lives:0,weeks:0,npcHit:{},npcB:{},ids:{},net:0,kyErr:[],band:null};
  const answer=()=>{for(let n=0;n<6&&Q.length;n++){const m=Q[0];if(m&&m.pid==="entpick"){const o=m.opts.find(x=>x.n==="Đi một mình");Q.shift();try{o.go()}catch(e){}continue}
    if(m&&m.ky&&m.opts&&m.opts.length){const o=m.opts[Math.floor(Math.random()*m.opts.length)];Q.shift();try{apply(o.fx||{});o.go()}catch(e){T.kyErr.push(String(e))}continue}Q.shift()}};
  for(let l=0;l<L;l++){for(let i=0;i<40;i++){try{store.set(NL_KEY,null)}catch(e){}start();let ok=false;try{ok=!isSrv()}catch(e){}if(ok)break}
   T.lives++;S.rank=RK;T.band=KY.band(S);KY.stat.reset();let last=wk(),hits=0;Q.length=0;
   for(let w=0;w<W&&!S.dead;w++){for(let bu=0;bu<B4N&&!S.dead;bu++){T.buoi++;
     const n=ST==="home"?0:ST==="walk"?2:(Math.random()<.5?1:2);
     for(let j=0;j<n;j++){const pl=places().filter(x=>x.k!==S.place&&x.k!=="home"&&x.k[0]!=="r");const t=pl[Math.floor(Math.random()*pl.length)];if(t){try{goTo(t.k)}catch(e){}answer()}}
     const s=KY.stat.buoi();if(s.elig)T.elig++;if(s.hit){T.hit++;hits++;T.gaps.push(wk()-last);last=wk();T.ids[s.id]=(T.ids[s.id]||0)+1}
     answer();Q.length=0;try{nextBuoi()}catch(e){}answer();Q.length=0}T.weeks++}
   if(!hits)T.zero++;const N=KY.stat.npc();for(const k in N.hit)T.npcHit[k]=(T.npcHit[k]||0)+N.hit[k];for(const k in N.buoi)T.npcB[k]=(T.npcB[k]||0)+N.buoi[k];
   try{ilCensus();T.net+=ilS().net}catch(e){}T.kyErr=T.kyErr.concat(KY.errs.splice(0));Q.length=0}
  const q=(a,f)=>{if(!a.length)return null;const s=a.slice().sort((x,y)=>x-y);return s[Math.min(s.length-1,Math.floor(f*s.length))]};
  T.e=+(T.elig/Math.max(1,T.buoi)).toFixed(3);T.meanGap=T.gaps.length?+(T.gaps.reduce((a,b)=>a+b,0)/T.gaps.length).toFixed(1):null;T.p10=q(T.gaps,.1);T.p90=q(T.gaps,.9);
  T.meRate=+(T.hit/Math.max(1,T.buoi)).toFixed(4);T.perLife=+(T.hit/Math.max(1,T.lives)).toFixed(2);T.gapLife=T.hit?+(T.weeks/T.hit).toFixed(1):null;T.zeroShare=+(T.zero/Math.max(1,T.lives)).toFixed(2);T.npcRate={};for(const k in T.npcB)T.npcRate[k]=+((T.npcHit[k]||0)/T.npcB[k]).toFixed(4);delete T.gaps;T.kyErr=T.kyErr.slice(0,5);return T},[+(LIVES||5),+(WEEKS||36),+(RANK||1),STYLE||"mix",OFF==="off"]);
 console.log(JSON.stringify({r,errs:errs.slice(0,8)}));await b.close()})();
