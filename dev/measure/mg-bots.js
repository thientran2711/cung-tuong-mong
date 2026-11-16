/* mg-balance (owner 16/11 07:10Z / 07:25Z): measure every minigame engine with two bots, n plays per (kind, tier).
   - VIRTUAL CLOCK: performance.now / setTimeout / setInterval / requestAnimationFrame are replaced by one virtual clock that advances
     16.67 ms per frame as fast as the CPU allows (MessageChannel pump), so a 60 s game runs in a few real seconds and frame-based
     physics behave exactly as at 60 fps. Date.now stays real.
   - SKILLED bot ("a good human who knows the game"): follows the test oracle KG82.peek() (the right move the game itself exposes) with
     ONE human error model for every engine: reaction delay |N(0, BOT.rt)| ms, tap scatter N(0, BOT.px * board) px, drag scatter,
     think time BOT.think ms between deliberate moves (drag / button), and a slip rate BOT.slip (a random move instead of the right one).
   - ANTICIPATION (slap-mg-r2): when peek() also gives at = ms until the right moment (a needle she can see coming), the skilled bot taps at
     at + N(0, BOT.aim) ms instead of reacting; bot "casual" = the same with 2× BOT.aim. The demo card is skipped (KG82.noDemo).
   - RANDOM bot: random taps / drags / holds on the board every 250–650 ms (never reads the oracle).
   - Each play: kg82Open + kg82Play(kind) with KG82.lv = the tier's ease (window.mgEase when present), raw 0..10 recorded.
   usage: node dev/measure/mg-bots.js <baseURL> <kinds,comma|all> <tiers e.g. occ:lv,…> <bots skilled,random> <n> [pages=3] [out.json]
     tier spec "e2" = engine ease 2 directly; "hoc/3/2" = mgTier(kind, occ "hoc", rank 3, art level 2) (needs jmgt).                */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,KL,TL,BL,NN,PG,OUT]=process.argv;
const ALL='dan,hat,co,dauho,ban,ve,hoa,theu,kim,mua,banh,huong,kinh,may,duho,den,td_cong,td_dung,td_ngon,td_hanh';
const KINDS=(KL&&KL!=='all'?KL:ALL).split(',');const TIERS=(TL||'e2').split(',');const BOTS=(BL||'skilled,random').split(',');const N=+(NN||30);const PAGES=+(PG||3);
const BOT={rt:+(process.env.MGBOT_RT||70),px:+(process.env.MGBOT_PX||.018),think:450,slip:.06,thinkD:900,slipD:.12,timing:'dan,ban,duho,hat,den,dauho,banh,td_dung,td_ngon',aim:40};
const VCLOCK=()=>{const rP=performance.now.bind(performance),rST=window.setTimeout.bind(window),rCT=window.clearTimeout.bind(window);
 let vt=rP(),seq=1;const T=new Map(),RAF=new Map();const ch=new MessageChannel();let pumping=false;
 const fire=()=>{const due=[...T.entries()].filter(([,t])=>t.at<=vt).sort((a,b)=>a[1].at-b[1].at||a[0]-b[0]);
  for(const [id,t] of due){if(!T.has(id))continue;if(t.iv){t.at+=Math.max(1,t.iv)}else T.delete(id);try{t.fn(...t.a)}catch(e){console.error(e)}}};
 const pump=()=>{for(let k=0;k<6;k++){vt+=1000/60;fire();const L=[...RAF.entries()];RAF.clear();for(const [,cb] of L){try{cb(vt)}catch(e){console.error(e)}}}ch.port2.postMessage(0)};
 ch.port1.onmessage=pump;
 performance.now=()=>vt;
 window.setTimeout=(fn,d,...a)=>{if(typeof fn!=="function")return 0;const id=seq++;T.set(id,{fn,a,at:vt+Math.max(0,+d||0)});return id};
 window.setInterval=(fn,d,...a)=>{const id=seq++;T.set(id,{fn,a,at:vt+Math.max(1,+d||0),iv:Math.max(1,+d||0)});return id};
 window.clearTimeout=window.clearInterval=id=>{T.delete(id)};
 window.requestAnimationFrame=cb=>{if(window.__mgQuiet&&/^t=>\{this\._requestId/.test(String(cb).slice(0,30)))return 0;/* measuring: the Pixi ticker (visual only) */const id=seq++;RAF.set(id,cb);return id};window.cancelAnimationFrame=id=>{RAF.delete(id)};
 window.__vclock={now:()=>vt};
 /* measuring only: skip picture blits (the GPU cost); game logic never reads pixels */{const P=CanvasRenderingContext2D.prototype;for(const k of ['drawImage','fill','stroke','fillRect','strokeRect','fillText','strokeText','clearRect','putImageData','beginPath','closePath','moveTo','lineTo','arc','arcTo','ellipse','rect','roundRect','quadraticCurveTo','bezierCurveTo','setLineDash','clip'])P[k]=function(){};const G={addColorStop(){}};P.createLinearGradient=P.createRadialGradient=P.createConicGradient=function(){return G};P.createPattern=function(){return null};}ch.port2.postMessage(0)};
/* in-page bots: start once the game is in phase "play"; return when it leaves it */
const BOTS_SRC=(BOT)=>{
 const G=()=>{let s=0;for(let i=0;i<6;i++)s+=Math.random();return (s-3)/Math.sqrt(.5)};
 const at=(x,y)=>{let el=document.elementFromPoint(x,y);if(el&&el.closest('#kg82'))return el;const L=[...document.querySelectorAll('#kg82box button, #kg82box canvas, #kg82box')].filter(e=>{const r=e.getBoundingClientRect();return r.width&&x>=r.left&&x<=r.right&&y>=r.top&&y<=r.bottom});return L.find(e=>e.tagName==='BUTTON')||L.find(e=>e.tagName==='CANVAS')||L[0]||el};
 const pe=(el,t,x,y,id)=>el&&el.dispatchEvent(new PointerEvent(t,{clientX:x,clientY:y,pointerType:'touch',pointerId:id,isPrimary:true,bubbles:true,cancelable:true,buttons:t==='pointerup'?0:1}));
 const boxR=()=>{const b=document.getElementById('kg82box');return b.getBoundingClientRect()};
 const drag=(D,done)=>{const el=at(D[0][0],D[0][1]);const pts=[];for(let i=1;i<D.length;i++){const n=Math.max(1,Math.ceil(Math.hypot(D[i][0]-D[i-1][0],D[i][1]-D[i-1][1])/12));for(let s=1;s<=n;s++)pts.push([D[i-1][0]+(D[i][0]-D[i-1][0])*s/n,D[i-1][1]+(D[i][1]-D[i-1][1])*s/n])}
  window.__drag=true;pe(el,'pointerdown',D[0][0],D[0][1],3);let k=0;const mv=()=>{if(k<pts.length){pe(el,'pointermove',pts[k][0],pts[k][1],3);k++;setTimeout(mv,10)}else{const l=pts[pts.length-1]||D[0];pe(el,'pointerup',l[0],l[1],3);window.__drag=false;done()}};mv()};
 const tap=(x,y)=>{const el=at(x,y);if(el){pe(el,'pointerdown',x,y,5);pe(el,'pointerup',x,y,5);try{if(el.tagName==='BUTTON'||el.closest('button'))(el.closest('button')||el).click()}catch(e){}}};
 const randomMove=(done)=>{const r=boxR();const rx=()=>r.left+Math.random()*r.width,ry=()=>r.top+Math.random()*r.height;
  if(Math.random()<.5){tap(rx(),ry());done()}else drag([[rx(),ry()],[rx(),ry()]],done)};
 window.__mgBot=(kind,kind0)=>new Promise(res=>{let busy=false,nx=0,hold=null,holdWant=null,holdAt=0;
  const sc=()=>{const r=boxR();return Math.min(r.width,r.height)};
  const end=()=>{if(hold){pe(hold.el,'pointerup',hold.x,hold.y,7);hold=null}res()};
  const tick=()=>{if(KG82.phase!=='play'){end();return}const now=performance.now();
   if(kind==='random'){if(!busy&&now>nx){busy=true;
     if(Math.random()<.3){const r=boxR();const x=r.left+Math.random()*r.width,y=r.top+Math.random()*r.height,el=at(x,y);if(hold){pe(hold.el,'pointerup',hold.x,hold.y,7);hold=null}else if(el){pe(el,'pointerdown',x,y,7);hold={el,x,y}}busy=false}
     else randomMove(()=>{busy=false});nx=now+250+Math.random()*400}setTimeout(tick,16);return}
   /* skilled (casual = the same person with twice the timing error) */
   const pk=KG82.peek();
   if(pk&&pk.at!=null){/* a predictable target (jslap needle): a person ANTICIPATES the crossing she sees coming and taps at at + N(0, BOT.aim) ms */
     if(!busy){busy=true;const k=kind==='casual'?2:1;setTimeout(()=>{if(KG82.phase!=='play')return;const q=KG82.peek()||pk;tap(q.x,q.y)},Math.max(0,pk.at+G()*BOT.aim*k))}
     setTimeout(tick,16);return}
   if(pk&&'hold' in pk){/* continuous hold: follow the wanted state after a reaction delay */
     /* the wanted state = off, or on at a place (hsel / the board half of x): a change of place = lift and press again (Đi đứng: left / right half) */
     const want=pk.hold?(pk.hsel||'x'+Math.round((pk.x||0)/60)):'';
     if(holdWant!==want){holdWant=want;holdAt=now+Math.abs(G())*BOT.rt}
     if(now>=holdAt){let el=pk.hsel?document.querySelector(pk.hsel):pk.x!=null?at(pk.x,pk.y):null,x=pk.x,y=pk.y;if(pk.hsel&&el){const r=el.getBoundingClientRect();x=r.left+r.width/2;y=r.top+r.height/2}
      if(hold&&hold.k!==holdWant){pe(hold.el,'pointerup',hold.x,hold.y,7);hold=null}
      if(holdWant&&!hold&&el){pe(el,'pointerdown',x,y,7);hold={el,x,y,k:holdWant}}}
     if(!pk.drag&&!pk.sel){setTimeout(tick,16);return}}
   const timing=BOT.timing.split(',').includes(kind0);
   if(pk&&!busy&&now>nx){busy=true;const slip=Math.random()<(timing?BOT.slip:BOT.slipD);const s=sc()*BOT.px;
    const go=()=>{if(KG82.phase!=='play'){busy=false;return}
     if(slip){randomMove(()=>{busy=false;nx=performance.now()+BOT.think*(.5+Math.random())});return}
     const q=KG82.peek()||pk;
     if(q.drag){const sa=q.aim!=null?q.aim:1;/* aim: the engine's own aim aid (dots shown while pulling) shrinks the release scatter */const D=q.drag.map(([x,y],i)=>[x+(i?G()*s*.8:G()*s*.4)*sa,y+(i?G()*s*.8:G()*s*.4)*sa]);drag(D,()=>{busy=false;nx=performance.now()+BOT.think*(.6+.8*Math.random())})}
     else if(q.sel){const el=document.querySelector(q.sel);if(el)el.click();busy=false;nx=performance.now()+BOT.think*(.6+.8*Math.random())}
     else if(q.x!=null){tap(q.x+G()*s,q.y+G()*s);busy=false;nx=performance.now()+120}
     else busy=false};
    /* timing moves (taps) fire after a reaction delay; deliberate moves after think time */
    /* timing taps fire after a reaction delay; deliberate moves (drag / button, and every tap of a puzzle or memory game) after think time */
    /* pk.think (≥1) = how much longer a person needs to SEE the right move on this board (more groups on the Cờ board, a short-portion round of Làm phúc) */
    const th=pk.think>0?pk.think:1;
    /* pk.thinkMs = the time a person needs to WORK OUT this move (Làm phúc: the share of a short round), spread ×0.6–1.4 */
    setTimeout(go,pk.thinkMs>0?pk.thinkMs*(.6+.8*Math.random()):((pk.drag||pk.sel)?BOT.think*(.3+.4*Math.random()):timing?Math.abs(G())*BOT.rt:BOT.thinkD*(.5+Math.random()))*(timing?1:th))}
   setTimeout(tick,16)};tick()});};
(async()=>{const b=await chromium.launch();const jobs=[];for(const kind of KINDS)for(const tier of TIERS)for(const bot of BOTS)for(let i=0;i<N;i++)jobs.push({kind,tier,bot});
 const out={};const errs=[];let done=0;const t0=Date.now();
 const open=async()=>{const ctx=await b.newContext({viewport:{width:900,height:700},hasTouch:true,deviceScaleFactor:1});
  await ctx.addInitScript(VCLOCK);await ctx.addInitScript(`(${BOTS_SRC})(${JSON.stringify(BOT)})`);
  const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.__ctmBuilt&&typeof start==='function',null,{timeout:60000,polling:200});
  await p.evaluate(()=>{try{SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true}catch(e){}
   /* measuring only: freeze the rest of the game (whole-UI render loops) — the minigame engines do not use them */window.__mgQuiet=1;for(const f of ['render','kmmAll','k3CatTabs','kitBdBox','kitRankPaint','kmmSweep'])try{if(typeof window[f]==='function')window[f]=function(){}}catch(e){}
   const st=document.createElement('style');st.textContent='#kroul,#title{display:none!important} *,*::before,*::after{animation:none!important;transition:none!important} body *{visibility:hidden!important} #ov,#ov *{visibility:visible!important}';document.head.appendChild(st)});
  await p.waitForTimeout(800);return{ctx,p}};
 const worker=async(wi)=>{let {ctx,p}=await open();
  while(jobs.length){const J=jobs.shift();
   let raw;try{raw=await Promise.race([new Promise((_,rej)=>setTimeout(()=>rej(new Error('real timeout')),90000)),p.evaluate(async J=>{try{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true}catch(e){}
     const K=KG82_KIND[J.kind];if(!K)return{err:'no kind '+J.kind};
     let lv=0,tw='';KG82.tier=null;if(/^e-?[\d.]/.test(J.tier))lv=+J.tier.slice(1);else{const [occ,rank,alv]=J.tier.split('/');const t=mgTier(J.kind,{occ,rank:+rank,lv:+alv});lv=t.ease;tw=t.word;KG82.tier=t}
     KG82.mgBot=1;KG82.noDemo=1;const d=kg82Open({art:K.n,title:'đo',how:K.how||''});if(!d)return{err:'no frame'};
     KG82.lv=lv;KG82.ctx='hoc';const r=await new Promise(res=>{kg82Play(J.kind,raw=>res(KG82.rawF!=null?+KG82.rawF:raw));const w=()=>{if(KG82.phase==='play')__mgBot(J.bot,J.kind);else setTimeout(w,16)};w()});
     kg82Close(true);return{raw:r,lv,tw}},J)])}catch(e){raw={err:'crash '+String(e.message).slice(0,60)};try{await ctx.close()}catch(x){}({ctx,p}=await open())}
   const key=`${J.kind}|${J.tier}|${J.bot}`;(out[key]=out[key]||[]).push(raw.err?null:raw.raw);if(raw.err)errs.push(key+' '+raw.err);
   if(OUT)fs.appendFileSync(OUT+'.jsonl',JSON.stringify({kind:J.kind,tier:J.tier,bot:J.bot,raw:raw.err?null:raw.raw})+'\n');
   if(++done%20===0)process.stderr.write(`${done} plays, ${((Date.now()-t0)/1000)|0}s\n`)}
  await ctx.close()};
 await Promise.all([...Array(PAGES)].map((_,i)=>worker(i)));await b.close();
 const rows=Object.entries(out).map(([k,v])=>{const [kind,tier,bot]=k.split('|');const L=v.filter(x=>x!=null);const n=L.length,m=L.reduce((a,x)=>a+x,0)/Math.max(1,n);
  const ge=t=>Math.round(100*L.filter(x=>Math.round(x)>=t).length/Math.max(1,n));return{kind,tier,bot,n,mean:+m.toFixed(2),ge7:ge(7),ge8:ge(8),ge9:ge(9),ge10:ge(10),hist:[...Array(11)].map((_,i)=>L.filter(x=>Math.round(x)===i).length),raw:L.map(x=>+x.toFixed(3))}});
 const res={bot:BOT,rows,errors:[...new Set(errs)].slice(0,30)};if(OUT)fs.writeFileSync(OUT,JSON.stringify(res,null,1));
 for(const r of rows)console.log([r.kind,r.tier,r.bot,'n='+r.n,'mean='+r.mean,'≥8:'+r.ge8+'%','≥9:'+r.ge9+'%','10:'+r.ge10+'%',r.hist.join(' ')].join('\t'));
 if(res.errors.length)console.log('ERRORS',res.errors)})();
