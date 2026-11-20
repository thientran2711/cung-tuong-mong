/* mg-craft-ve — Vẽ «Thủy mặc» (kind `ve`, engine k91Ve = KG82_ENG.ve2) — node dev/test/mg-craft-ve.js [dev/index.html] [WxH] [--no-bots]
   (the lead's shared dev/test/mg-craft.js can fold these cases in: every check is one `ok(...)` line)
   1 wiring: KG82_KIND.ve.e = ve2, the old trace engine stays registered (kinh / may use it), kind keys + kG/kAdj/cal untouched, BAL.mgTier.lev.ve levers exist
   2 callers: playArt({art:"ve"}) opens the rules screen «Sẵn sàng» + «Hướng dẫn» and «Sẵn sàng» starts the Thủy mặc engine; the Tài nghệ lesson (KG82_MGL.hoa) is the same kind
   3 no text in play (OD 05:10Z): no visible text node and no letter drawn on the canvas during play (numbers / signs only)
   4 the oracle KG82.peek gives drag (placement) · sel #k91vdone · hold · tap, and a full oracle play returns a raw 0–10 (end(raw) called once)
   5 ✕ during play closes the board: no engine running, no page error
   6 old save: a played board leaves S byte-identical (the engine saves nothing)
   7 oracle bots (virtual clock, dev/measure/mg-bots.js): skilled ≥ 9 at ease 5, lower at ease 0 (law 5), random ≈ 0 */
const {chromium}=require('playwright');const path=require('path');const cp=require('child_process');const fs=require('fs');
const A=process.argv.slice(2);const pos=A.filter(a=>!a.startsWith('--'));
const URL0=pos[0]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const [VW,VH]=(pos[1]||'755x1000').split('x').map(Number);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},hasTouch:true});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.__ctmBuilt&&typeof start==='function',null,{timeout:60000,polling:200});
 await p.addStyleTag({content:'#kboot,#kmrew{display:none!important}'});await p.waitForTimeout(2000);
 await p.evaluate(()=>{window.__ct=null;const bad=t=>/\p{L}/u.test(t);for(const f of['fillText','strokeText']){const o=CanvasRenderingContext2D.prototype[f];CanvasRenderingContext2D.prototype[f]=function(t){if(window.__ct&&bad(String(t)))window.__ct.add(String(t));return o.apply(this,arguments)}}
  localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.ap=9;try{render()}catch(e){}
  window.__sleep=t=>new Promise(r=>setTimeout(r,t));
  /* one in-page driver: follow KG82.peek like a player (drag / sel / hold / tap) until the phase ends or ms run out; counts the peek kinds it saw */
  window.__drive=async(ms)=>{const pe=(el,t,x,y,id)=>el.dispatchEvent(new PointerEvent(t,{clientX:x,clientY:y,pointerType:'touch',pointerId:id,isPrimary:true,bubbles:true,cancelable:true}));
   const cv=()=>document.querySelector('#kg82box canvas');const seen={drag:0,sel:0,hold:0,tap:0};let hold=null;const end=performance.now()+ms;
   while(performance.now()<end&&KG82.phase==='play'){const pk=KG82.peek&&KG82.peek();
    if(pk&&pk.drag){seen.drag++;const el=cv(),D=pk.drag;pe(el,'pointerdown',D[0][0],D[0][1],3);for(let k=1;k<D.length;k++)for(let s=1;s<=6;s++){pe(el,'pointermove',D[k-1][0]+(D[k][0]-D[k-1][0])*s/6,D[k-1][1]+(D[k][1]-D[k-1][1])*s/6,3);await __sleep(12)}pe(el,'pointerup',D[D.length-1][0],D[D.length-1][1],3);await __sleep(250)}
    else if(pk&&pk.sel){seen.sel++;document.querySelector(pk.sel).click();await __sleep(250)}
    else if(pk&&'hold' in pk){if(pk.hold&&!hold){seen.hold++;pe(cv(),'pointerdown',pk.x,pk.y,7);hold=pk}else if(!pk.hold&&hold){pe(cv(),'pointerup',pk.x,pk.y,7);hold=null}await __sleep(25)}
    else if(pk&&pk.x!=null){seen.tap++;await __sleep(400);const el=cv();pe(el,'pointerdown',pk.x,pk.y,5);pe(el,'pointerup',pk.x,pk.y,5);await __sleep(250)}
    else await __sleep(50)}return seen}});
 /* 1 wiring */
 const w=await p.evaluate(()=>({e:KG82_KIND.ve.e,eng:typeof KG82_ENG[KG82_KIND.ve.e],trace:typeof KG82_ENG.trace,kinh:KG82_KIND.kinh.e,kG:BAL.mgTier.kG.ve,kAdj:BAL.mgTier.kAdj.ve,cal:BAL.ag&&BAL.ag.mg2&&BAL.ag.mg2.cal&&BAL.ag.mg2.cal.k&&BAL.ag.mg2.cal.k.ve,lev:Object.keys(BAL.mgTier.lev.ve||{}),mgl:KG82_MGL.hoa}));
 ok(w.e==='ve2'&&w.eng==='function','ve runs the Thủy mặc engine',w.e);ok(w.trace==='function'&&w.kinh==='kinh','trace engine kept for Chép kinh / May áo');ok(w.kG===.9&&w.kAdj===-1.6,'kG/kAdj unchanged',[w.kG,w.kAdj]);ok(w.cal!=null,'cal key ve kept',w.cal);
 ok(['place','tones','ramp','dry','peek','bleed','lim','limBase','fast','keep'].every(k=>w.lev.includes(k)),'BAL.mgTier.lev.ve levers',w.lev);ok(w.mgl&&w.mgl[1]==='ve','lesson hoa → ve',w.mgl);
 /* 2 caller playArt + 3 no text */
 await p.evaluate(()=>{try{kg82Close()}catch(e){}Q.length=0;playArt({art:'ve',onDone:()=>{}})});await p.waitForTimeout(1500);
 const r2=await p.evaluate(()=>{const bx=kg82Box();return{rules:!!(bx&&bx.querySelector('.kgr .kgr-demo')),go:(bx&&bx.querySelector('.kgr-go')||{}).textContent,tut:!!(bx&&bx.querySelector('#kgrtut')),canvas:!!(bx&&bx.querySelector('canvas'))}});
 ok(r2.rules&&/Sẵn sàng/.test(r2.go||'')&&r2.tut&&!r2.canvas,'playArt ve: rules screen first, Sẵn sàng + Hướng dẫn, no engine yet',r2);
 await p.evaluate(()=>{window.__ct=new Set();document.querySelector('.kgr-go').click()});await p.waitForTimeout(1200);
 const r3=await p.evaluate(()=>{const bx=kg82Box(),out=[],wk=document.createTreeWalker(bx,NodeFilter.SHOW_TEXT);let n;while(n=wk.nextNode()){const t=n.nodeValue.trim();if(!t||/^[^\p{L}]*$/u.test(t))continue;const el=n.parentElement;if(!el||el.closest('.kgr,.kgt-bar'))continue;const cs=getComputedStyle(el);if(cs.display==='none'||cs.visibility==='hidden')continue;out.push(t)}
  return{phase:KG82.phase,canvas:!!bx.querySelector('canvas'),words:out}});
 ok(r3.phase==='play'&&r3.canvas,'Sẵn sàng starts the engine',r3.phase);
 /* 4 oracle: a full play */
 const t0=Date.now();const seen=await p.evaluate(()=>__drive(150000));const r4=await p.evaluate(()=>({phase:KG82.phase,raw:KG82.rawF,words:[...window.__ct]}));
 ok(seen.drag>=3&&seen.sel>=1&&seen.hold>=1&&seen.tap>=1,'oracle gives drag / ✓ / hold / tap',seen);
 ok(!r3.words.length&&!r4.words.length,'no text in play (DOM + canvas)',[r3.words,r4.words]);
 ok(r4.phase!=='play','a whole oracle play ends the board (in '+Math.round((Date.now()-t0)/1000)+' s)',r4);
 /* 5 ✕ */
 await p.evaluate(()=>{try{kg82Close()}catch(e){}Q.length=0;playArt({art:'ve',onDone:()=>{}})});await p.waitForTimeout(1200);await p.evaluate(()=>document.querySelector('.kgr-go').click());await p.waitForTimeout(1500);
 const S0=await p.evaluate(()=>JSON.stringify(Object.assign({},S,{pcx:undefined,mgSeen:undefined})));
 await p.evaluate(()=>{const x=document.querySelector('#kg82 .kclose,#kg82 [data-kg-close],#kg82 .kgx,#kg82 button[aria-label*="Đóng"],#kg82 .kx');if(x)x.click();else kg82Close()});await p.waitForTimeout(600);
 const r5=await p.evaluate(()=>({run:!!KG82.run,canvas:!!document.querySelector('#kg82box canvas'),phase:KG82.phase,S:JSON.stringify(Object.assign({},S,{pcx:undefined,mgSeen:undefined}))}));
 ok(!r5.run&&!r5.canvas&&r5.phase!=='play','✕ closes the board',r5.phase);ok(r5.S===S0,'old save: closing leaves S byte-identical');ok(!errs.length,'no page errors',errs.slice(0,2));
 await b.close();
 /* 7 bots */
 if(!A.includes('--no-bots')){const out='/tmp/mg-craft-ve-bots.json';try{fs.unlinkSync(out)}catch(e){}
  const o=cp.spawnSync('node',[path.join(__dirname,'../measure/mg-bots.js'),URL,'ve','e0,e5','skilled,random','6','3',out],{encoding:'utf8',timeout:900000});console.log((o.stdout||'').split('\n').filter(l=>/^ve\t/.test(l)).join('\n'));
  const J=fs.existsSync(out)?JSON.parse(fs.readFileSync(out,'utf8')):{rows:[]};const m=(t,bot)=>(J.rows.find(r=>r.tier===t&&r.bot===bot)||{}).mean;
  ok(m('e5','skilled')>=9,'oracle bot ≥ 9 at ease 5',m('e5','skilled'));ok(m('e0','skilled')<m('e5','skilled'),'lower at ease 0 (harder as she climbs)',[m('e0','skilled'),m('e5','skilled')]);ok(m('e0','random')<=1&&m('e5','random')<=1,'random play ≈ 0',[m('e0','random'),m('e5','random')])}
 process.exit(res.every(Boolean)?0:1)})();
