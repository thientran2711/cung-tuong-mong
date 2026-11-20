/* review/entry-exam: rank distribution of the ENTRY SELECTION per origin and player kind (OD:L1250 ceiling earned; OD 07:25Z medium).
   The mini-game marks come from dev/measure/mg-bots.js (real engines, skilled + random bots, occ "tuyen" at art level 0 and 2):
   pass its JSON as <mg.json>. Player kinds: skilled = skilled-bot marks · average = "Để tài nghệ quyết định" (kg82NpcMean of her level) ·
   random = random-bot marks. For each origin, N new lives are rolled in the real game (start()), her first exam option is taken
   (kc2SelArts, no word game), and the ONE score rule entScore / BAL.entry gives the exact tier odds (noise enumerated).
   Home roads (dan, nc) use the same rule with mid home numbers (kim 2, le 2, tiếng 30, lời đồn 10) — labelled as such.
   usage: node dev/measure/entry-bots.js <url> <mg.json> [N=40] [out.json] */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,MG,NN,OUT]=process.argv;const N=+(NN||40);
const mg=JSON.parse(fs.readFileSync(MG,'utf8')).rows;
const dist={};for(const r of mg){const lv=+r.tier.split('/')[2];const k=`${r.kind}|${lv}|${r.bot}`;const n=r.hist.reduce((a,x)=>a+x,0);dist[k]=r.hist.map(x=>x/Math.max(1,n))}
(async()=>{const b=await chromium.launch();const c=await b.newContext({serviceWorkers:'block'});const p=await c.newPage();p.on('pageerror',e=>console.error('ERR',e.message.slice(0,160)));
 await p.goto(URL);await p.waitForFunction(()=>window.__ctmBuilt&&typeof start==='function',null,{timeout:60000});
 await p.evaluate(()=>{try{SLOT=3;document.getElementById('title').hidden=true}catch(e){}});
 const res=await p.evaluate(({N,dist})=>{const OR=['tt','dtq','muoi','cn','nc','thd','ch','td','cnv'];const out=[];
  const D=(kind,lv,bot)=>{const L=Object.keys(dist).filter(k=>k.endsWith('|'+bot));const of=kd=>L.filter(k=>k.startsWith(kd+'|')).map(k=>[+k.split('|')[1],dist[k]]).sort((x,y)=>Math.abs(x[0]-lv)-Math.abs(y[0]-lv));
   let M=of(kind);if(!M.length){/* kind not measured: pool of every measured kind at the nearest level */const P=L.map(k=>[+k.split('|')[1],dist[k]]).sort((x,y)=>Math.abs(x[0]-lv)-Math.abs(y[0]-lv));const l0=P[0][0];const Q=P.filter(x=>x[0]===l0).map(x=>x[1]);return Q[0].map((_,i)=>Q.reduce((a,q)=>a+q[i],0)/Q.length)}return M[0][1]};
  const tierP=(road,raw,art)=>{const n=BAL.entry.noise;const T=[0,0,0];for(let i=-n;i<=n;i++)T[entTier(Math.round(entBase(road,raw,art)+i))]+=1/(2*n+1);return T};
  for(const og of OR){const acc={skilled:[0,0,0],average:[0,0,0],random:[0,0,0]};const home={skilled:[0,0,0],average:[0,0,0],random:[0,0,0]};let lives=0,arts={},odds={};
   for(let L=0;L<N;L++){for(let i=0;i<400;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(S.origin.k===og)break}if(S.origin.k!==og)continue;lives++;Q.length=0;
    const art=kc2SelArts()[0][0];const k=entKind(art)||'dan';const lv=entArtLv(k);arts[k]=(arts[k]||0)+1;const SK=Math.round(kg82NpcMean(lv));
    const add=(A,road)=>{for(const bot of ['skilled','random']){const P=D(k,lv,bot);P.forEach((pr,raw)=>{const T=tierP(road,raw,art);for(let t=0;t<3;t++)A[bot][t]+=pr*T[t]})}
     const T=tierP(road,SK,art);for(let t=0;t<3;t++)A.average[t]+=T[t]};
    add(acc,'dir');
    if(og==='cnv'||og==='nc'){const kc0=S.kc,g0=[S.kgt,S.kld];S.kc={kd:og==='cnv'?'dan':'nc',kim:2,le:2,fam:[],ex:{art}};S.kgt=30;S.kld=10;try{add(home,S.kc.kd)}finally{S.kc=kc0;S.kgt=g0[0];S.kld=g0[1]}}}
   const nz=A=>Object.fromEntries(Object.entries(A).map(([k,v])=>[k,v.map(x=>Math.round(100*x/Math.max(1,lives)))]));
   out.push({o:og,top:(ORIGINS.find(x=>x.k===og)||{r:0}).r||0,lives,arts,dir:nz(acc),home:og==='cnv'||og==='nc'?nz(home):null})}
  return out},{N,dist});
 const RN=['Đáp ứng','Thường tại','Quý nhân','Tần'];const lab=(o,t)=>o.o==='cnv'?['Tân Giả khố trước','phi tần bậc thấp','phi tần bậc cao'][t]:o.top===0?['Đáp ứng, bị chê','Đáp ứng','Đáp ứng, được để mắt'][t]:RN[Math.max(0,o.top-(2-t))];
 console.log('| origin | ceiling | road | player | −2 / bottom | −1 / middle | ceiling / top |\n|---|---|---|---|---|---|---|');
 for(const o of res)for(const [road,A] of [['Vào cung ngay',o.dir],['home road (mid home numbers)',o.home]]){if(!A)continue;for(const bot of ['skilled','average','random'])
  console.log(`| ${o.o} | ${lab(o,2)} | ${road} | ${bot} | ${A[bot][0]}% ${lab(o,0)} | ${A[bot][1]}% ${lab(o,1)} | ${A[bot][2]}% ${lab(o,2)} |`)}
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(res,null,1));await b.close()})();
