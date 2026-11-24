/* usage: node render.js <clip> <dev:fold|ipad> <outdir> [fps] [stillsOnly] */
const {boot}=require('./boot.js');const fs=require('fs');
const [,,CLIP,DEV,OUT,FPS_,STILLS]=process.argv;const FPS=+FPS_||24;
(async()=>{const [W,H]=DEV==='ipad'?[1180,820]:[755,1000];
 const {b,p}=await boot(W,H,STILLS?2:1);await new Promise(r=>setTimeout(r,DEV==="ipad"?9000:7000));
 await p.addScriptTag({path:__dirname+'/mock/intro-mock.js'});
 const info=await p.evaluate(async([c,d])=>await IM.load(c,d),[CLIP,DEV]);
 fs.mkdirSync(OUT,{recursive:true});
 console.log(CLIP,DEV,JSON.stringify(info));
 if(STILLS){for(const t0 of STILLS.split(',')){const t=t0.endsWith('%')?Math.round(parseFloat(t0)/100*info.dur):+t0;await p.evaluate(t=>new Promise(r=>{IM.seek(t);requestAnimationFrame(()=>requestAnimationFrame(r))}),t);await p.screenshot({path:`${OUT}/${CLIP}-${DEV}-${String(t).padStart(5,'0')}.png`})}}
 else{const n=Math.ceil(info.dur/1000*FPS);for(let i=0;i<=n;i++){await p.evaluate(t=>new Promise(r=>{IM.seek(t);requestAnimationFrame(()=>requestAnimationFrame(r))}),i*1000/FPS);await p.screenshot({path:`${OUT}/f${String(i).padStart(4,'0')}.jpg`,type:'jpeg',quality:80})}console.log('frames',n+1)}
 await b.close()})().catch(e=>{console.log('ERR',e.stack);process.exit(1)});
