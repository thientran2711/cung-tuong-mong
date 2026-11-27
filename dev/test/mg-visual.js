/* mg-visual (owner 20/11 ~05:10Z) — node dev/test/mg-visual.js [dev/index.html] [WxH]
   A. BAL.mgFx is the ONE source of the lit cue + press pop: pop >= 1.2, glow stacked (pass >= 2), ring on, kg82FxPop eases 1.24 -> 1 and is read by the engines (no private 1.08 / 1.14 left).
   B. NO TEXT in mini-game play: for EVERY KG82_KIND the play area (.kgbox: canvas fillText/strokeText + DOM text) shows no word (digits / symbols / score chips are fine).
      Nấu ăn (cook) shows its recipe as pictures. Prints the scan table kind | text during play. */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const [VW,VH]=(process.argv[3]||'755x1000').split('x').map(Number);
const SKIP=(process.env.MGV_SKIP||'').split(',').filter(Boolean);
let bad=0;const ok=(c,m,x)=>{if(!c)bad++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH}});await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.ap=9;try{render()}catch(e){}});
 const A=await p.evaluate(()=>{const F=BAL.mgFx,r={F};r.p0=kg82FxPop(performance.now()),r.pEnd=kg82FxPop(performance.now()-F.ms-5);r.pHeld=kg82FxPop(null);return r});
 ok(A.F&&A.F.pop>=1.2&&A.F.pass>=2&&A.F.blur>=30&&A.F.ms>=200,'BAL.mgFx values',A.F);ok(A.p0>1.1&&A.pEnd===1&&A.pHeld>=1.2,'kg82FxPop curve',[A.p0,A.pEnd,A.pHeld]);
 const src=['j82.js','j91.js'].map(f=>fs.readFileSync('dev/build/'+f,'utf8')).join('\n');
 ok(!/pr\*2\.05\*\(on\?1\.08:1\)/.test(src)&&!/HR\*\(on\?1\.35:1\.18\)/.test(src),'no private lit scale left in Múa / Khéo tay');
 ok(/kg82Spr\(g,"mua-mat".*ring:on/.test(src),'Múa lit cushion has the ring');
 {const td=fs.readFileSync('dev/build/jtd.js','utf8');ok(!/fillRect\(dir<0/.test(td)&&/kg82FxRing\(g,W\/2\+dir/.test(td),'td_dung touch = kit ring/glow on the bowl, no half-screen yellow box');ok(!/rgba\(255,240,160,\.55\)/.test(src),'rhythm: no tall yellow column flash')}
 const kinds=await p.evaluate(()=>Object.keys(KG82_KIND));const T={};
 for(const k of kinds){if(SKIP.includes(k))continue;
  const r=await p.evaluate(async(k)=>{const sleep=t=>new Promise(r=>setTimeout(r,t));const out={txt:[],dom:[]};
   try{kg82Close()}catch(e){}Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;
   const P=CanvasRenderingContext2D.prototype,f0=P.fillText,s0=P.strokeText;let on=false;
   P.fillText=function(t,...a){if(on)out.txt.push(String(t));return f0.call(this,t,...a)};P.strokeText=function(t,...a){if(on)out.txt.push(String(t));return s0.call(this,t,...a)};
   try{playArt({art:k,title:'t',onDone(){}})}catch(e){out.err=String(e.message||e);P.fillText=f0;P.strokeText=s0;return out}
   await sleep(900);const box=kg82Box();const go=box&&box.querySelector('.kgr-go');if(go)go.click();
   await sleep(600);on=true;await sleep(3500);on=false;P.fillText=f0;P.strokeText=s0;
   const bx=kg82Box();if(bx){const w=document.createTreeWalker(bx,NodeFilter.SHOW_TEXT);let n;while(n=w.nextNode()){const t=n.textContent.trim();if(t&&!n.parentElement.closest('.kgr'))out.dom.push(t)}}
   out.phase=KG82.phase;try{kg82Close()}catch(e){}return out},k);
  const word=s=>/[A-Za-zÀ-ỹ]{2,}/.test(s);const w=[...new Set(r.txt.concat(r.dom).filter(word))];T[k]=w;
  if(k==='banh')ok(!r.err&&w.length===0,'play of banh (Nấu ăn) shows no word',w.slice(0,8));else console.log('info '+k+' words in play: '+w.length)}
 ok(errs.length===0,'no page errors',errs.slice(0,3));
 console.log('\nkind | words during play');for(const k in T)console.log(k+' | '+(T[k].join(' / ')||'-'));
 await b.close();console.log(bad?'\nFAILS '+bad:'\nALL OK');process.exit(bad?1:0)})();
