/* duodo-focus ON-FIGURE GAMES test (jdfg; plan dev/handover/reports/duodo-focus.md §PLAN 2): each of the 7 engines on a mock figure box —
   (1) a good play gets a high raw, a bad play a low raw, «Làm luôn» (skip) = skipped; raw always 0..BAL.df.rawTop;
   (2) law 5: the board is harder at a high rank (mgTier ease lower → smaller / faster target) — checked on the engine's own numbers;
   (3) no word in play: the play layer holds only the canvas (no text node);  (4) one core: no balance number typed in jdfg.js.
   usage: node dev/test/duodo-focus-games.js → exit 1 on FAIL */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');const path=require('path');
let bad=0;const ok=(c,m,x)=>{console.log((c?'ok   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''));if(!c)bad++};
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1});const p=await ctx.newPage();await require('./lib/veil').guard(p);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 const g=await D.openHost(p,srv.url);await p.waitForTimeout(3000);
 await g.evaluate(()=>{SLOT=3;window.__forceOrigin='cn';document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});
 await g.waitForFunction(()=>typeof S==='object'&&S&&S.origin,null,{timeout:60000});await p.waitForTimeout(1000);
 await g.evaluate(()=>{const box=document.createElement('div');box.id='dfbox';Object.assign(box.style,{position:'fixed',left:'0',top:'0',width:'500px',height:'700px',zIndex:9999});document.body.appendChild(box);
  window.__df={fig:{x:150,y:60,w:200,h:560},box};
  window.__fire=(type,x,y)=>{const cv=box.querySelector('canvas');if(!cv)return;const r=cv.getBoundingClientRect();cv.dispatchEvent(new PointerEvent(type,{clientX:r.left+x,clientY:r.top+y,bubbles:true,pointerId:1}))};
  window.__run=(eng,o)=>new Promise(res=>{const h=dfGame(eng,Object.assign({box,fig:__df.fig,rank:o.rank,at:o.at,onDone:r=>res(Object.assign({e:h.c.e},r))},{}));window.__h=h;if(o.skip)setTimeout(()=>h.skip(),50)})});
 const wait=ms=>p.waitForTimeout(ms);
 const play=async(eng,how,rank=0,at)=>{const pr=g.evaluate(([e,r,a])=>__run(e,{rank:r,at:a}),[eng,rank,at]);await wait(150);await how();return await pr};
 const R={};
 /* swipe: fast stroke through the target vs a stroke far away */
 /* the whole stroke runs IN the page (no round trip per step: the moving target is read at each step, so a good stroke stays on it) */
 const swipe=(good,slowish)=>async()=>{await g.evaluate(([good,dur])=>new Promise(res=>{const n=6,off=good?0:250;const k=__h.peek();const x0=k.x-180,x1=k.x+180;__fire('pointerdown',x0,k.y+off);let i=0;
   const st=()=>{i++;const kk=__h.peek();__fire('pointermove',x0+(x1-x0)*i/n,kk.y+off);if(i<n)setTimeout(st,dur/n);else{const k2=__h.peek();__fire('pointerup',x1,k2.y+off);res()}};setTimeout(st,dur/n)}),[good,slowish?900:60])};
 R.swGood=await play('swipe',swipe(true));R.swMiss=await play('swipe',swipe(false));R.swSlow=await play('swipe',swipe(true,true));R.swFeet=await play('swipe',swipe(true),0,'feet');
 /* tug: many fast taps vs none */
 R.tugGood=await play('tug',async()=>{for(let i=0;i<40;i++){await g.evaluate(()=>{__fire('pointerdown',250,300);__fire('pointerup',250,300)});await wait(30)}});
 R.tugNone=await play('tug',async()=>{await wait(5200)});
 /* bow: tap on each beat vs never */
 R.bowGood=await play('bow',async()=>{for(let k=0;k<3;k++){for(let j=0;j<200;j++){const q=await g.evaluate(()=>__h.peek());if(!q)return;if(q.at<=25){await g.evaluate(()=>__fire('pointerdown',250,300));break}await wait(10)}await wait(60)}});
 R.bowNone=await play('bow',async()=>{await wait(3600)});
 /* drag: drop on the hands vs drop far away twice then time out */
 R.dragGood=await play('drag',async()=>{const q=await g.evaluate(()=>__h.peek());await g.evaluate(([x,y])=>__fire('pointerdown',x,y),[q.tok.x,q.tok.y]);const q2=await g.evaluate(()=>__h.peek());await g.evaluate(([x,y])=>{__fire('pointermove',x,y);__fire('pointerup',x,y)},[q2.x,q2.y])});
 R.dragBad=await play('drag',async()=>{const q=await g.evaluate(()=>__h.peek());await g.evaluate(([x,y])=>{__fire('pointerdown',x,y);__fire('pointermove',10,10);__fire('pointerup',10,10)},[q.tok.x,q.tok.y]);await wait(4200)});
 /* ear: hold only while the look is low vs hold through the looks */
 R.earGood=await play('ear',async()=>{let held=false;for(let i=0;i<600;i++){const q=await g.evaluate(()=>__h&&__h.peek());if(!q)return;const safe=q.look<q.hot-.12;
  if(safe&&!held){await g.evaluate(([x,y])=>__fire('pointerdown',x,y),[q.x,q.y]);held=true}else if(!safe&&held){await g.evaluate(([x,y])=>__fire('pointerup',x,y),[q.x,q.y]);held=false}await wait(10)}});
 R.earBad=await play('ear',async()=>{for(let i=0;i<10;i++){const q=await g.evaluate(()=>__h&&__h.peek());if(!q)return;await g.evaluate(([x,y])=>__fire('pointerdown',x,y),[q.x,q.y]);await wait(500)}});
 /* words: tap only the good signs vs only the wrong ones */
 const words=okWant=>async()=>{for(let i=0;i<120;i++){const q=await g.evaluate(()=>__h&&__h.peek());if(!q)return;/* read + tap in ONE page call (the signs move between round trips) */await g.evaluate(w=>{const q=__h.peek();/* the wanted sign farthest from any other-kind sign (two signs can overlap: the tap must not land on both) */const far=s=>Math.min(1e9,...q.L.filter(o=>o.ok!==s.ok).map(o=>Math.hypot(o.x-s.x,o.y-s.y)));const C=q.L.filter(s=>s.ok===w&&s.y>40).sort((a,b)=>far(b)-far(a));const s=C[0];if(s)__fire('pointerdown',s.x,s.y)},okWant);await wait(40)}};
 R.wGood=await play('words',words(true));R.wBad=await play('words',words(false));
 /* stare: hold when under the band, release when over it vs hold all the time */
 R.stGood=await play('stare',async()=>{let held=false;for(let i=0;i<500;i++){const q=await g.evaluate(()=>__h&&__h.peek());if(!q)return;const want=q.p<(q.lo+q.hi)/2;
  if(want!==held){await g.evaluate(w=>__fire(w?'pointerdown':'pointerup',250,300),want);held=want}await wait(8)}});
 R.stBad=await play('stare',async()=>{await g.evaluate(()=>__fire('pointerdown',250,300));await wait(4200)});
 R.skip=await g.evaluate(()=>__run('bow',{skip:1}));
 const L5=await g.evaluate(()=>{const o={};for(const e of ['swipe','tug','bow','drag','ear','words','stare'])o[e]=[dfgEase(e,0).f,dfgEase(e,7).f];return o});
 const noText=await g.evaluate(()=>{const h=dfGame('words',{box:__df.box,fig:__df.fig,rank:0,onDone:()=>{}});const t=__df.box.innerText.trim();h.destroy();return t});
 const T=await g.evaluate(()=>BAL.df.rawTop);
 const rng=x=>x&&x.raw>=0&&x.raw<=T;
 const pair=(gd,bd,nm,gmin,bmax)=>ok(rng(gd)&&rng(bd)&&gd.raw>=gmin&&bd.raw<=bmax&&gd.raw>bd.raw,`${nm}: good play ${gd&&gd.raw} ≥ ${gmin}, bad play ${bd&&bd.raw} ≤ ${bmax}`);
 pair(R.swGood,R.swMiss,'swipe (face)',9,2);ok(R.swSlow.raw>R.swMiss.raw&&R.swSlow.raw<R.swGood.raw,`swipe: a slow stroke through = middle mark ${R.swSlow.raw}`);ok(R.swFeet.raw>=9,`swipe (feet, Ngáng chân) good ${R.swFeet.raw}`);
 pair(R.tugGood,R.tugNone,'tug',9,4);pair(R.bowGood,R.bowNone,'bow',8,0);pair(R.dragGood,R.dragBad,'drag',8,2);pair(R.earGood,R.earBad,'ear',6,4);pair(R.wGood,R.wBad,'words',9,0);pair(R.stGood,R.stBad,'stare',6,3);
 ok(R.skip.skipped&&R.skip.raw==null,'skip = skipped, no mark',R.skip);
 ok(Object.values(L5).every(([a,b])=>b<a),'law 5: every board is harder at rank 7 than at rank 0 (ease share)',L5);
 ok(noText==='', 'no word in the play layer',noText);
 const src=fs.readFileSync(path.join(__dirname,'../build/jdfg.js'),'utf8').replace(/\/\*[\s\S]*?\*\//g,'').replace(/"[^"]*"|`[^`]*`|'[^']*'/g,'""');
 const code=src.split('\n').filter(l=>!/^function dfg(Ring|Dot|Trail|Bar|Sign)|c\.draw=/.test(l.trim())).join('\n');/* drawing proportions are layout, not balance */
 const nums=[...new Set((code.match(/[^\w.$]\d+(\.\d+)?/g)||[]).map(s=>s.slice(1)).filter(n=>!/^([012]|1000)$/.test(n)))];ok(nums.length===0,'one core: no balance number typed in jdfg.js game logic',nums);
 console.log(JSON.stringify(R).slice(0,900));
 ok(errs.length===0,'no page error',errs.slice(0,3));await b.close();srv.close();console.log(bad?'FAILED '+bad:'ALL OK');process.exit(bad?1:0)})();
