/* node run.js <clip> <WxH> <outdir> [origins] [fast] — records one clip */
const {boot,chromium}=require('./boot');const fs=require('fs');const path=require('path');
const [,,CLIP,WH,OUT,ORG]=process.argv;const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();fs.mkdirSync(OUT,{recursive:true});const tmp=OUT+'/tmp-'+CLIP+'-'+W;fs.rmSync(tmp,{recursive:true,force:true});
 const tv=Date.now();const {ctx,p}=await boot(b,W,H,{video:tmp,origins:ORG?ORG.split(','):null});
 const DD=fs.readFileSync((process.env.SELX_CONTENT||__dirname+'/content')+'/doidap.jsonl','utf8').split('\n').filter(Boolean).map(JSON.parse);
 const HX=fs.readFileSync((process.env.SELX_CONTENT||__dirname+'/content')+'/hanhxu.jsonl','utf8').split('\n').filter(Boolean).map(JSON.parse);
 await p.addScriptTag({content:fs.readFileSync(__dirname+'/ss2.js','utf8')});await p.evaluate(([d,h])=>{SS2.DD=d;SS2.HX=h},[DD,HX]);
 const t0=Date.now();const off=(t0-tv)/1000;await p.evaluate(()=>{window.__T0=performance.now()});
 const steps=CLIP.split('+');const marks=[];for(const s of steps){marks.push([s,(Date.now()-tv)/1000]);await p.evaluate(s=>SS2[s](),s)}marks.push(['end',(Date.now()-tv)/1000]);
 await p.waitForTimeout(800);const v=p.video();await ctx.close();const vp=await v.path();
 console.log('clip',CLIP,W,'ms',Date.now()-t0,'errs',JSON.stringify(p.errs.slice(0,5)),'video',vp);
 fs.renameSync(vp,OUT+`/${CLIP}-${W}.webm`);fs.writeFileSync(OUT+`/${CLIP}-${W}.off`,JSON.stringify(marks));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
