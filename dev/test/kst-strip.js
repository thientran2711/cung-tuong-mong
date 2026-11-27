/* kst-strip: same consort 3 ways side by side (alive · old .45/1.12/.86 · new) — owner colour tuning. usage: node dev/test/kst-strip.js outdir [new-filter] */
const path=require('path');const {chromium}=require('playwright');const OUT=process.argv[2];const NEW=process.argv[3]||'saturate(.6) contrast(.92) brightness(1.06)';
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost'}}:{});
for(const [n,w,h] of [["fold",755,1000],["ipad",1180,820]]){const p=await b.newPage({viewport:{width:w,height:h},deviceScaleFactor:1});
 await p.goto('file://'+path.resolve('dev/index.html'));await p.waitForTimeout(2500);
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;Q.length=0;
  liveRivals(true).filter(x=>!x.queen).forEach(x=>k61Meet(x,'x',3));tab="rv";render()});
 const N=await p.evaluate(()=>document.querySelectorAll(".pface").length);let shot=0;
 for(let i=0;i<N&&shot<6;i++){await p.evaluate(i=>document.querySelectorAll(".pface")[i].click(),i);await p.waitForTimeout(700);
  const ok=await p.evaluate(NEWF=>{const src=document.querySelector(".pc>.pcl>.pcp.kit");if(!src||/kr-unknown/.test(src.className))return false;let o=document.getElementById("__cmp");if(o)o.remove();o=document.createElement("div");o.id="__cmp";o.style.cssText="position:fixed;left:0;top:0;z-index:99999;background:#f6dcd2;padding:10px;display:flex;gap:14px;font:14px sans-serif";
   [["sống",""],["cũ .45/1.12/.86","saturate(.45) contrast(.86) brightness(1.12)"],["mới",NEWF]].forEach(([t,f])=>{const c=document.createElement("div");const q=src.cloneNode(true);q.style.cssText="float:none;width:200px;height:auto;aspect-ratio:550/1037;margin:0;position:relative";if(f){q.classList.add("kst-lc");q.style.setProperty("--kst",f)}c.appendChild(q);const l=document.createElement("div");l.textContent=t;l.style.textAlign="center";c.appendChild(l);o.appendChild(c)});document.body.appendChild(o);return true},NEW);
  if(!ok)continue;await p.waitForTimeout(500);await (await p.$("#__cmp")).screenshot({path:`${OUT}/strip-${n}-${shot++}.png`})}
 await p.close()}await b.close()})();
