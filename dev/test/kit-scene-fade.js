/* kitScene: the closing fade of an OLD scene must not strip body.kscn-on from a NEW scene that opened meanwhile (B kit request 24/11 23:59Z, sideline-dlg F4).
   usage: node dev/test/kit-scene-fade.js <page URL> <outdir> ; Fold 755x1000 + iPad 1180x820. Fails on the old code (kscn-on gone after the old fade ends). */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const F=[];
 for(const [W,H] of [[755,1000],[1180,820]]){const p=await (await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block'})).newPage();const E=[];p.on('pageerror',e=>E.push(e.message.slice(0,150)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function'&&typeof kitScene==='object');await sleep(2000);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();if(window.KLIFE){KLIFE.off=true;KLIFE.go=true}window.__forceOrigin='tt';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;deal();render()});await sleep(1500);
  const r=await p.evaluate(async()=>{window.reducedMotion=()=>false;window.kfStill=()=>false;const z=t=>new Promise(r=>setTimeout(r,t));
   kitScene.open({bg:""});let done=0;kitScene.close(false,()=>done++);/* old scene fades (~700 ms) */await z(150);
   kitScene.open({bg:""});/* NEW scene opens before the old fade ends */const mid=document.body.classList.contains("kscn-on");await z(1300);
   const after=document.body.classList.contains("kscn-on"),layers=document.querySelectorAll(".kscn").length;
   let end;kitScene.close(true);end=document.body.classList.contains("kscn-on");return{mid,after,layers,done,end}});
  console.log(W,JSON.stringify(r));if(!r.mid)F.push(W+': kscn-on missing right after the new scene opened');if(!r.after)F.push(W+': old fade stripped kscn-on from the NEW scene');if(r.layers!==1)F.push(W+': layers '+r.layers+' (want 1)');if(r.done!==1)F.push(W+': old close callback ran '+r.done);if(r.end)F.push(W+': kscn-on stays after the new scene closes');if(E.length)F.push(E[0])}
 console.log(F.length?F.join('\n'):'KIT-SCENE-FADE PASS');await b.close();process.exit(F.length?1:0)})();
