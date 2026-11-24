/* usage: node harness.js <mock.js> <outPrefix> [fold|ipad] [stillTimesMs,...]  — records the REAL game + the mock's overlay with Playwright video (2x and 1x mp4) */
const {chromium}=require('playwright');const fs=require('fs'),cp=require('child_process'),path=require('path');
const [mock,out,only,stillsArg]=[process.argv[2],process.argv[3],process.argv[4]||'',process.argv[5]||''];
const TLJS=fs.readFileSync(path.join(__dirname,'tl.js'),'utf8'),MOCK=fs.readFileSync(mock,'utf8');
(async()=>{const b=await chromium.launch();
for(const [w,h,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){if(only&&only!=='all'&&only!==tag)continue;
 const vdir=`${out}-${tag}-vid`;fs.rmSync(vdir,{recursive:true,force:true});
 const c=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2,serviceWorkers:'block'});const cs0=Date.now();
 const p=await c.newPage();p.setDefaultTimeout(0);const cdp=await c.newCDPSession(p);const frames=[];const fdir=`${out}-${tag}-fr`;fs.rmSync(fdir,{recursive:true,force:true});fs.mkdirSync(fdir,{recursive:true});let rec=false,fi=0;
 cdp.on('Page.screencastFrame',async f=>{if(rec){const fn=`${fdir}/f${String(fi++).padStart(5,'0')}.jpg`;fs.writeFileSync(fn,Buffer.from(f.data,'base64'));frames.push({fn,t:f.metadata.timestamp})}try{await cdp.send('Page.screencastFrameAck',{sessionId:f.sessionId})}catch(e){}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 let total,tStart;
 try{
 await p.goto('file:///home/user/cung-tuong-mong/index.html',{waitUntil:'domcontentloaded',timeout:0});
 await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(2500);
 await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}window.__bot={pre:1};try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
 await p.waitForTimeout(3000);
 for(let i=0;i<6;i++){await p.evaluate(()=>{const o=document.getElementById('kroulw')||document.getElementById('kroul');if(o)o.remove();const sk=document.querySelector('.krskip');if(sk)sk.click();document.querySelectorAll('.kroul').forEach(e=>e.remove());const m=document.getElementById('modal');if(m)m.hidden=true;Q.length=0;S.an=1;S.mat=2;S.th=10;S.suc=80;S.bac=300;window.__bot=0;try{tab='act';render()}catch(e){}});await p.waitForTimeout(400)}
 await p.addScriptTag({content:TLJS});
 await p.evaluate(MOCK);                                   // defines window.MOCK = async()=>total ms (prepares, preloads, schedules, returns)
 total=await p.evaluate(async()=>{const t=await window.MOCK();return t});
 await p.screenshot({path:`${out}-${tag}-pre.png`});await cdp.send('Page.startScreencast',{format:'jpeg',quality:92,maxWidth:w*2,maxHeight:h*2,everyNthFrame:1});rec=true;await p.evaluate(()=>TL.go());await p.waitForTimeout(total+1600);
 }catch(e){console.log(tag,'FAIL',String(e.message).slice(0,300))}
 rec=false;try{await cdp.send('Page.stopScreencast')}catch(e){}await c.close();
 if(frames.length<2){console.log(tag,'NO FRAMES');continue}
 const lst=frames.map((f,i)=>`file '${f.fn}'\nduration ${(i<frames.length-1?frames[i+1].t-f.t:0.04).toFixed(4)}`).join('\n')+`\nfile '${frames[frames.length-1].fn}'`;fs.writeFileSync(`${fdir}/list.txt`,lst);
 for(const [sfx,sc] of [['2x',`${w*2}:${h*2}`],['1x',`${w-(w%2)}:${h}`]])cp.execSync(`ffmpeg -y -loglevel error -f concat -safe 0 -i ${fdir}/list.txt -vf "scale=${sc}:flags=lanczos,fps=30,format=yuv420p" -c:v libx264 -preset medium -crf 19 -movflags +faststart ${out}-${tag}-${sfx}.mp4`);
 console.log(tag,'frames',frames.length,'size',cp.execSync(`ffprobe -v error -show_entries stream=width,height,duration -of csv=p=0 ${out}-${tag}-2x.mp4`).toString().trim());
 for(const t of (stillsArg?stillsArg.split(',').map(Number):[]))cp.execSync(`ffmpeg -y -loglevel error -ss ${(t/1000).toFixed(2)} -i ${out}-${tag}-2x.mp4 -frames:v 1 ${out}-${tag}-still-${String(t).padStart(5,'0')}.png`);
 console.log(tag,'ok total',total,'errs',errs.slice(0,3));}
await b.close()})();
