/* node record.js <outDir> <m1|m2|m4> [fold|ipadAir|all] [opts-json]  → <out>/<m>-<dev>-1x.mp4, -2x-slow.mp4 (half speed), stills every ~0.5 s (pick later) */
const B=require('./boot.js');const fs=require('fs'),path=require('path'),cp=require('child_process');
const [,,OUT,M,ONLY,OPT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{for(const dev of ['fold','ipadAir']){if(ONLY&&ONLY!=='all'&&ONLY!==dev)continue;const {b,p,f,srv,errs}=await B.open(dev);
 for(const x of ['lib.js','m1.js','m2.js','m4.js','scen.js'])await f.addScriptTag({content:fs.readFileSync(path.join(__dirname,x),'utf8')});
 const cdp=await p.context().newCDPSession(p);const fdir=path.join(OUT,`fr-${M}-${dev}`);fs.rmSync(fdir,{recursive:true,force:true});fs.mkdirSync(fdir,{recursive:true});const frames=[];let rec=false,fi=0;
 cdp.on('Page.screencastFrame',async e=>{if(rec){const fn=`${fdir}/f${String(fi++).padStart(5,'0')}.jpg`;fs.writeFileSync(fn,Buffer.from(e.data,'base64'));frames.push({fn,t:e.metadata.timestamp})}try{await cdp.send('Page.screencastFrameAck',{sessionId:e.sessionId})}catch(x){}});
 const vw=p.viewportSize();await cdp.send('Page.startScreencast',{format:'jpeg',quality:90,maxWidth:vw.width*2,maxHeight:vw.height*2,everyNthFrame:1});rec=true;await p.waitForTimeout(400);
 let r;try{r=await f.evaluate(([m,o])=>SCEN[m](o),[M,OPT?JSON.parse(OPT):{}])}catch(e){console.log('ERR',e.message.slice(0,300))}
 await p.waitForTimeout(300);rec=false;await cdp.send('Page.stopScreencast');await b.close();srv.close();
 const lst=frames.map((x,i)=>`file '${path.resolve(x.fn)}'\nduration ${(i<frames.length-1?frames[i+1].t-x.t:0.04).toFixed(4)}`).join('\n')+`\nfile '${path.resolve(frames[frames.length-1].fn)}'`;fs.writeFileSync(`${fdir}/list.txt`,lst);
 const tag=OPT&&JSON.parse(OPT).tag?'-'+JSON.parse(OPT).tag:'';const base=path.join(OUT,`${M}${tag}-${dev}`);const W=vw.width*2-(vw.width*2%2),H=vw.height*2-(vw.height*2%2);
 cp.execSync(`ffmpeg -y -loglevel error -f concat -safe 0 -i ${fdir}/list.txt -vf "scale=${W}:${H}:flags=lanczos,fps=30,format=yuv420p" -c:v libx264 -preset medium -crf 21 -movflags +faststart ${base}-1x.mp4`);
 cp.execSync(`ffmpeg -y -loglevel error -i ${base}-1x.mp4 -vf "setpts=2.0*PTS" -r 30 -c:v libx264 -preset medium -crf 21 -movflags +faststart ${base}-2x-slow.mp4`);
 const dur=+cp.execSync(`ffprobe -v error -show_entries format=duration -of csv=p=0 ${base}-1x.mp4`).toString();
 for(let t=0.5;t<dur;t+=0.5)cp.execSync(`ffmpeg -y -loglevel error -ss ${t.toFixed(2)} -i ${base}-1x.mp4 -frames:v 1 -vf scale=${Math.round(W/2)}:-2 ${fdir}/../s-${M}${tag}-${dev}-${String(Math.round(t*1000)).padStart(5,'0')}.jpg`);
 fs.rmSync(fdir,{recursive:true,force:true});console.log(M,dev,'frames',frames.length,'dur',dur.toFixed(1),'res',JSON.stringify(r),'errs',errs.slice(0,3))}})();
