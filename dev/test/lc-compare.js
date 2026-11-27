/* lc-compare (OWNER-UI-C, 27/11): REAL game, N faces: the SAME woman alive (own colours) vs in lãnh cung (kit lãnh cung frame + pale image), card + thumb, side by side → <outdir>/cmp-<dev>.png.  usage: node dev/test/lc-compare.js <outdir> [n=2] */
const path=require('path'),cp=require('child_process');const {chromium}=require('playwright');const OUT=process.argv[2],N=+process.argv[3]||2;
require('./lib/fresh-build')();
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost'}}:{});
for(const [n,w,h] of [["fold",755,1000],["ipad",1180,820]]){const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:2});
 await p.goto('file://'+path.resolve('dev/index.html'));await p.waitForTimeout(2500);
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false;Q.length=0;try{$("modal").hidden=true}catch(e){}
  window.__R=liveRivals(true).filter(x=>!x.queen&&!x.out).slice(0,8);window.__R.forEach(x=>{try{k61Meet(x,'x',3)}catch(e){}})});
 const idx=await p.evaluate(()=>window.__R.map((x,i)=>[i,x.name]));
 let done=0;for(const [i] of idx){if(done>=N)break;const shot=async(tag)=>{await p.evaluate(i=>{const R=window.__R;tab="rv";render();const bn=s=>String(s||"").split("?")[0].split("/").pop();const id=bn(pv(R[i]).src);const f=[...document.querySelectorAll(".pface")].find(e=>[...e.querySelectorAll("img")].some(m=>bn(m.getAttribute("src"))===id));if(f)f.click()},i);await p.waitForTimeout(1300);
    const ok=await p.evaluate(()=>!!document.querySelector(".pc .pcp img.kpor:not([src*=unknown])"));if(!ok)return false;
    await p.screenshot({path:`${OUT}/cmp-${n}-${done}-${tag}.png`});return true};
  await p.evaluate(i=>{window.__R[i].out=false},i);if(!(await shot("alive")))continue;await p.evaluate(i=>{window.__R[i].out=true},i);await shot("lc");await p.evaluate(i=>{window.__R[i].out=false},i);done++}
 await p.close();
 const py=`from PIL import Image;import glob
for d in range(${N}):
    a=Image.open('${OUT}/cmp-${n}-%d-alive.png'%d);l=Image.open('${OUT}/cmp-${n}-%d-lc.png'%d);W,H=a.size
    s=Image.new('RGB',(W*2,H));s.paste(a,(0,0));s.paste(l,(W,0));s.save('${OUT}/side-${n}-%d.png'%d)`;
 cp.execFileSync('python3',['-c',py])}
await b.close()})();
