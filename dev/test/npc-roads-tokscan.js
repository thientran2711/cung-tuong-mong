/* npc-roads r2 family scan F7/F8: every chapter title + ending tag an NPC can be dealt (all roads, all signs) must carry no raw cast token ({v} {mis} {foe}…) and no function source text (()=>…); usage: node dev/test/npc-roads-tokscan.js <url> → titleBad 0, tagBad 0 */
const {chromium}=require('playwright');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();p.setDefaultTimeout(0);
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof nrCh==='function'&&typeof NRM!=='undefined',null,{timeout:0});
 const r=await p.evaluate(()=>{const roads=new Set();for(const k of Object.keys(ARC67))if(/^[a-z]+_[a-z0-9]+$/.test(k))roads.add(k);for(const k of Object.keys(NRM))roads.add(k);
  const bad={title:[],tag:[]};let nT=0,nG=0;
  for(const r of roads)for(let n=BAL.road.first-1;n<=BAL.road.last;n++){let A;try{A=nrCh(r,n)}catch(e){continue}if(!A)continue;
   const t=nrFill(plain(nrS(A.t,A)),{v:"X",mis:"Y"});nT++;if(/[{}]|=>|\$\{/.test(t))bad.title.push(r+'.'+n+': '+t);
   for(const k of[1,0,-1])for(let i=0;i<6;i++){const g=nrEnd(A,k,"nàng");nG++;if(/[{}]|=>|\$\{/.test(g)){bad.tag.push(r+'.'+n+' '+k+': '+g);break}}}
  bad.tag=[...new Set(bad.tag)];return{roads:roads.size,nT,nG,titleBad:bad.title.length,tagBad:bad.tag.length,ex:bad.title.slice(0,4).concat(bad.tag.slice(0,8))}});
 console.log(JSON.stringify(r,null,1));console.log('errs',errs.length);await b.close()})();
