/* review/makeup-theme: bot measure of the Hội phối đồ makeup points (jmkt tsMkPts, BAL.toil.taste) — skilled > random.
   Players: skilled+scouted (knows the want, Sắc/Họa skill .8), skilled only (skill .8, preset by chance), scouted only (knows, skill .4),
   random (skill .4, preset by chance), bare face. Every face from the ONE NPC sitting table (toilNpcPlay, festival allowance, rank 3).
   Also: the dress part's spread (tsDressPts raw × 4 over random / best sets) to show the weight, and how often a rival knows the want by stats.
   usage: node dev/measure/makeup-theme-bot.js <url of dev/index.html>   (prints a markdown table) */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({serviceWorkers:'block'})).newPage();p.setDefaultTimeout(180000);
 await p.goto(process.argv[2],{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof tsMkPts==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:120000});
 const R=await p.evaluate(()=>{const N=500,out={rows:[],themes:{}};const pick=(h,L)=>L[h%L.length];
  const face=(sk,knows,w,h)=>{const bold=knows?w.bold:((h>>>3)%1000)/1000<BAL.toil.play.diemPre,tone=knows?w.tone:((h>>>7)&1?"w":"c");
   const L=TOIL_PRE.filter(x=>(x[2]==="diem")===bold&&(x[3]==="warm"?"w":"c")===tone);const col=Object.assign({},pick(h>>>11,L)[4]);if(bold)col.want="diem";
   const r=toilNpcPlay(sk,h,col,bold?"diem":"","fit",["fest"],3);return{makeup:true,score:r.score,look:r.look,col}};
  const kinds=[["skilled + scouted",.8,1],["skilled, not scouted",.8,0],["scouted, not skilled",.4,1],["random (no skill, no scouting)",.4,0]];
  for(const [nm,sk,kn] of kinds){let s=0,d=0,v=0,a=[];for(const th of Object.keys(TS_THEME))for(const m of [4,10]){const w=tsMkWant(th,m);let t=0;
    for(let i=0;i<N;i++){const h=wdHash(nm+th+m+i)>>>0;const f=face(sk,kn,w,h);const x=tsMkPts(f,w);s+=x.add;t+=x.add;if(x.mk==="tuyet")d++;if(x.mk==="vung")v++}
    out.themes[th+m]=out.themes[th+m]||{};out.themes[th+m][nm]=+(t/N).toFixed(2)}
   const n=N*Object.keys(TS_THEME).length*2;out.rows.push([nm,+(s/n).toFixed(2),Math.round(100*d/n),Math.round(100*v/n)])}
  {const w=tsMkWant("phu",4);out.rows.push(["bare face (Mặt mộc)",tsMkPts({makeup:false},w).add,0,0])}
  /* the dress part for scale: raw × 4 of a random set vs the best set from a full chest of every wearable */
  const keys=Object.keys(IT).filter(k=>TS_SLOT.some(([,,f])=>f(k)));let rnd=0,best=0;const th0=Object.keys(TS_THEME);
  for(const th of th0){for(let i=0;i<40;i++){const P={};for(const [sl,,f] of TS_SLOT){const c=keys.filter(f);if(c.length)P[sl]=c[(wdHash(th+sl+i)>>>0)%c.length]}rnd+=tsDressPts(S,P,th).raw*4}
   best+=tsDressPts(S,tsDressBest(S,keys,th),th).raw*4}
  out.dress={random:+(rnd/(40*th0.length)).toFixed(1),best:+(best/th0.length).toFixed(1)};
  /* how often a rival knows the want, by stats */
  out.npc=[[10,10,10,0],[40,40,40,1],[70,60,50,2],[90,80,60,4]].map(([tc,tai,duc,mat])=>[`Tâm cơ ${tc}, Tài ${tai}, Đức ${duc}, Tai mắt ${mat}`,Math.round(100*tsMkNpcKnow({tamco:tc,tai,duc,mat,traits:[]}))]);
  return out});
 const md=['| player | mean makeup points in the contest total | Khuynh thành % | Vụng về % |','|---|---|---|---|',...R.rows.map(r=>`| ${r.join(' | ')} |`),'',
  `Dress part for scale (raw × 4): random set ${R.dress.random}, best set ${R.dress.best}.`,'','| rival stats | knows the want % |','|---|---|',...R.npc.map(r=>`| ${r[0]} | ${r[1]} |`),'',
  '| đề · month | '+Object.keys(R.themes[Object.keys(R.themes)[0]]).join(' | ')+' |','|---|---|---|---|---|',...Object.entries(R.themes).map(([k,v])=>`| ${k} | ${Object.values(v).join(' | ')} |`)];
 console.log(md.join('\n'));await b.close()})();
