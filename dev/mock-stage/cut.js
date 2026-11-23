// video cutting by a magenta marker frame flashed before each clip (no clock guessing)
const {execSync}=require('child_process');const fs=require('fs');
async function mark(p){await p.evaluate(()=>{const d=document.createElement('div');d.id='mkmark';d.style.cssText='position:fixed;inset:0;z-index:2147483647;background:#ff00ff';document.body.appendChild(d)});await p.waitForTimeout(500);await p.evaluate(()=>document.getElementById('mkmark').remove());await p.waitForTimeout(80)}
function cut(vp,clips,outFn,posterAt){const FPS=25;const buf=execSync(`ffmpeg -loglevel error -i "${vp}" -vf "fps=${FPS},scale=4:4" -f rawvideo -pix_fmt rgb24 -`,{maxBuffer:1<<28});
 const n=buf.length/48;const mg=[];for(let i=0;i<n;i++){let r=0,g=0,b=0;for(let k=0;k<16;k++){r+=buf[i*48+k*3];g+=buf[i*48+k*3+1];b+=buf[i*48+k*3+2]}mg.push(r/16>200&&g/16<70&&b/16>200)}
 const ends=[];for(let i=1;i<n;i++)if(mg[i-1]&&!mg[i])ends.push(i/FPS);
 console.log('markers',ends.length,'clips',clips.length);
 clips.forEach(([name,dur],i)=>{const s=ends[i];if(s==null)return console.log('no marker for',name);const o=outFn(name);
  execSync(`ffmpeg -y -loglevel error -ss ${(s+0.05).toFixed(2)} -i "${vp}" -t ${dur.toFixed(2)} -c:v libx264 -preset slow -crf 26 -pix_fmt yuv420p -movflags +faststart -an "${o}"`);
  execSync(`ffmpeg -y -loglevel error -ss ${posterAt} -i "${o}" -frames:v 1 -q:v 4 "${o.replace('.mp4','-poster.jpg')}"`);console.log('mp4',o,fs.statSync(o).size)})}
module.exports={mark,cut};
