/* K-TAG-OWNSCALE (KK69): kit §93.5b kitTagKeepIn keeps a stage name plate inside its box for EVERY scale mix:
   plain · scaled figure (parent scale) · counter-scaled one-size plate (parent s, plate 1/s — the law-10 one-plate-size case) · plate scaled alone.
   Runs the kit function itself (taken from dev/build/jkitsel.js) on a blank page. MUTATE=1 uses the old divisor (own scale) = before → the counter-scaled rows FAIL. */
'use strict';
const fs=require('fs'),path=require('path'),{chromium}=require('playwright');
let src=fs.readFileSync(path.join(__dirname,'../../build/jkitsel.js'),'utf8');
const m=src.match(/function kitTagKeepIn\(el,box,pad\)\{[\s\S]*?\n/);if(!m){console.log('FAIL kitTagKeepIn not found');process.exit(1)}
let fn=m[0];
if(process.env.MUTATE)fn=fn.replace(/el\.style\.translate="100px 0";const k=[^;]*;/,'const k=(r.width/(el.offsetWidth||r.width))||1;');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:800,height:400}});
 await p.setContent('<div id="box" style="position:absolute;left:100px;top:0;width:500px;height:300px;outline:1px solid red"></div>');
 await p.addScriptTag({content:fn});
 const CASES=[['plain',1,1],['figure .5',.5,1],['figure 1.6',1.6,1],['counter .5/2',.5,2],['counter .62/1.613',.62,1/.62],['counter 1.4/.714',1.4,1/1.4],['plate .7',1,.7]];
 let bad=0;
 for(const [name,ps,ts] of CASES)for(const side of ['right','left']){
  const r=await p.evaluate(([ps,ts,side])=>{document.querySelectorAll('.f').forEach(e=>e.remove());
   const f=document.createElement('div');f.className='f';const x=side==='right'?560:110;
   f.style.cssText=`position:absolute;left:${x}px;top:100px;width:80px;height:160px;transform:scale(${ps});transform-origin:50% 100%`;
   const t=document.createElement('span');t.style.cssText=`position:absolute;left:50%;top:100%;transform:translateX(-50%) scale(${ts});transform-origin:50% 0;white-space:nowrap;font:16px serif;padding:2px 6px;background:#fff`;
   t.textContent='Phi Đường Mi Trang · Tố Uyển';f.appendChild(t);document.body.appendChild(f);
   const B=document.getElementById('box').getBoundingClientRect();const moved=kitTagKeepIn(t,B,2);const q=t.getBoundingClientRect();
   return {moved:Math.round(moved),l:q.left-B.left,rr:B.right-q.right}},[ps,ts,side]);
  const ok=r.l>=1.5&&r.rr>=1.5;if(!ok)bad++;
  console.log(`${ok?'OK  ':'FAIL'} ${name.padEnd(18)} ${side.padEnd(5)} moved ${r.moved} · gap left ${r.l.toFixed(1)} · gap right ${r.rr.toFixed(1)}`)}
 await b.close();console.log(bad?`TAG-OWNSCALE FAIL ${bad}`:'TAG-OWNSCALE PASS');process.exit(bad?1:0)})();
