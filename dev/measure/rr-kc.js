/* rare-reach, jkc outside-palace rares: the home road (kcInit → inkc.js __kcRun, sens / rand) N lives per origin of KC.ok; every kcRare(id)
   call = that rare's conditions met at its door (eligible), its roll and the home ending. One page, in-page loop (the home road is synchronous).
   usage: node dev/measure/rr-kc.js <dev/index.html> <lives per origin per style> <out.json> */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const M=__dirname;
const [,,G,NL,OUT]=process.argv;const N=+NL||10;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:844}});await p.route(/\.(webp|png|jpe?g|mp3|ogg|m4a)(\?|$)/i,r=>r.abort());
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto('file://'+path.resolve(G),{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kcInit==='function');
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;start()});await p.waitForTimeout(800);
 await p.evaluate(fs.readFileSync(path.join(M,'inpage6.js'),'utf8'));await p.evaluate(fs.readFileSync(path.join(M,'inkc.js'),'utf8'));
 const res=[];
 for(const pol of ["sens","rand"])for(let i=0;i<N;i++){const part=await p.evaluate(([pol])=>{const out=[];for(const o of KC.ok){let rolls=[];const f=kcRare;kcRare=function(id,pp){const had=S.kc&&S.kc.r97&&S.kc.r97[id]!=null;const v=f.apply(this,arguments);if(!had)rolls.push({id,ok:v?1:0});return v};
   try{window.__forceOrigin=o;start();window.__forceOrigin=undefined;if(!kcOk(S.origin.k)||S.srv){out.push({pol,o,skip:S.origin.k});continue}Q=[];kcInit();Q=[];try{$("modal").hidden=true}catch(e){}window.__kcRun(pol);
    out.push({pol,o:S.origin.k,rolls,end:S.kc&&S.kc.end||"",inPal:!!(S.kc&&S.kc.inPal),dead:!!S.dead,h:S.tm96?S.tm96.h|0:-1,rise:!!(S.tm96&&S.tm96.rise),suc:S.suc,tamco:S.tamco,duc:S.duc,sac:S.sac,danh:S.danh})}catch(e){out.push({pol,o,err:String(e.message).slice(0,120)})}finally{kcRare=f}}return out},[pol]);
  res.push(...part);fs.writeFileSync(OUT,JSON.stringify({res,errs:errs.slice(0,20)}));process.stderr.write(`${pol} ${i+1}/${N}\n`)}
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
