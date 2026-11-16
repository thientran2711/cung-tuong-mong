/* mg-balance test: every minigame opens and finishes at the 6 owner viewports on the NEW build, after loading an OLD save made on the
   previous main build; no page errors, no horizontal overflow; the intro shows the "Độ khó" tier row (startContest + playArt) and the
   result card. Games are finished by the skilled balance bot under the virtual clock (dev/measure/mg-bots.js).
   usage: node dev/test/mg-balance-vp.js <oldBuildUrl> <newBuildUrl> [sizes comma, default the 6]  */
const {chromium}=require('playwright');const [,,OLD,NEW,SZS,KS]=process.argv;
const SIZES=(SZS||'755x1000@2,1000x755@1,1180x820@2,1366x1024@2,844x390@2,390x844@2').split(',');

const BOT={rt:40,px:.01,think:250,slip:0,thinkD:300,slipD:0,timing:'dan,ban,duho,hat,den,dauho,banh,td_dung,td_ngon'};
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
   /* skilled */
   const pk=KG82.peek();
   if(pk&&'hold' in pk){/* continuous hold: follow the wanted state after a reaction delay */
     const want=pk.hold?(pk.hsel||'x'+Math.round((pk.x||0)/60)):'';if(holdWant!==want){holdWant=want;holdAt=now+Math.abs(G())*BOT.rt}
     if(now>=holdAt){let el=pk.hsel?document.querySelector(pk.hsel):pk.x!=null?at(pk.x,pk.y):null,x=pk.x,y=pk.y;if(pk.hsel&&el){const r=el.getBoundingClientRect();x=r.left+r.width/2;y=r.top+r.height/2}
      if(hold&&hold.k!==holdWant){pe(hold.el,'pointerup',hold.x,hold.y,7);hold=null}if(holdWant&&!hold&&el){pe(el,'pointerdown',x,y,7);hold={el,x,y,k:holdWant}}}
     if(!pk.drag&&!pk.sel){setTimeout(tick,16);return}}
   const timing=BOT.timing.split(',').includes(kind0);
   if(pk&&!busy&&now>nx){busy=true;const slip=Math.random()<(timing?BOT.slip:BOT.slipD);const s=sc()*BOT.px;
    const go=()=>{if(KG82.phase!=='play'){busy=false;return}
     if(slip){randomMove(()=>{busy=false;nx=performance.now()+BOT.think*(.5+Math.random())});return}
     const q=KG82.peek()||pk;
     if(q.drag){const D=q.drag.map(([x,y],i)=>[x+(i?G()*s*.8:G()*s*.4),y+(i?G()*s*.8:G()*s*.4)]);drag(D,()=>{busy=false;nx=performance.now()+BOT.think*(.6+.8*Math.random())})}
     else if(q.sel){const el=document.querySelector(q.sel);if(el)el.click();busy=false;nx=performance.now()+BOT.think*(.6+.8*Math.random())}
     else if(q.x!=null){tap(q.x+G()*s,q.y+G()*s);busy=false;nx=performance.now()+120}
     else busy=false};
    /* timing moves (taps) fire after a reaction delay; deliberate moves after think time */
    /* timing taps fire after a reaction delay; deliberate moves (drag / button, and every tap of a puzzle or memory game) after think time */
    setTimeout(go,pk.thinkMs>0?Math.min(pk.thinkMs,1500):(pk.drag||pk.sel)?BOT.think*(.3+.4*Math.random()):timing?Math.abs(G())*BOT.rt:BOT.thinkD*(.5+Math.random()))}
   setTimeout(tick,16)};tick()});};
(async()=>{const b=await chromium.launch();const out=[];
 /* old save on the previous build */
 {const ctx=await b.newContext();const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(OLD,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.__ctmBuilt&&typeof start==='function',null,{timeout:120000,polling:300});await p.waitForTimeout(2000);
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});/* review/mg-tune: start() can build S a moment later on a cold cache */await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.arts,null,{timeout:30000,polling:100});
  await p.evaluate(()=>{Q.length=0;S.arts.thi=3;S.arts.cam=2;S.mgSeen={dan:1};quiet=false;try{NLP=false}catch(e){}save()});
  var oldSave=await p.evaluate(()=>{const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=localStorage.getItem(k)}return o});
  out.push({old:true,keys:Object.keys(oldSave).length,errs});await ctx.close()}
 for(const SZ of SIZES){const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1)});
  await ctx.addInitScript(o=>{if(!sessionStorage.getItem('seeded')){for(const k in o)localStorage.setItem(k,o[k]);sessionStorage.setItem('seeded','1')}},oldSave);
  await ctx.addInitScript(VCLOCK);await ctx.addInitScript(`(${BOTS_SRC})(${JSON.stringify(BOT)})`);
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(NEW,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.__ctmBuilt&&typeof start==='function',null,{timeout:120000,polling:300});await p.waitForTimeout(1500);
  const load=await p.evaluate(()=>{const d=loadSlot(3);if(!d)return'no save';SLOT=3;quiet=true;deser(d);quiet=false;document.getElementById('title').hidden=true;try{deal()}catch(e){}render();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
   window.__mgQuiet=1;/* Pixi ticker off (visual only) */const st=document.createElement('style');st.textContent='#kroul{display:none!important}';document.head.appendChild(st);return{name:S.name,thi:S.arts.thi,seen:!!(S.mgSeen&&S.mgSeen.dan)}});
  const kinds=KS?KS.split(','):await p.evaluate(()=>Object.keys(KG82_KIND).filter(k=>KG82_ENG[KG82_KIND[k].e]));const R=[];
  for(const kind of kinds){process.stderr.write(SZ+' '+kind+' '+new Date().toISOString().slice(11,19)+'\n');let r;try{r=await Promise.race([new Promise((_,rj)=>setTimeout(()=>rj(new Error('timeout 150s')),150000)),p.evaluate(async kind=>{const K=KG82_KIND[kind];const viaC=['dan','co','tho','doi','doden','ban','mua'].includes(kind);let intro='';
    const res=await new Promise(res=>{let got=null;
     if(viaC){startContest({art:kind,title:'Hội thử',onDone:x=>{got=x;res(x)}})}
     else{const d=kg82Open({art:K.n,title:'Thử',how:K.how||''});if(!d){res('noframe');return}mgSet(kind,{occ:'hoc'});kg82Play(kind,raw=>{KG82.phase='result';kg82ShowRes(`<div class="kg82act"><button class="kbtn" id="kg82ok">Đã hiểu</button></div>`);document.getElementById('kg82ok').onclick=()=>{kg82Close();res({raw})}})}
     const goW=()=>{const go=document.getElementById('kg82go');if(go){intro=(document.getElementById('kg82box')||{}).textContent||'';go.click();w()}else if(KG82.phase==='play')w();else setTimeout(goW,30)};
     const w=()=>{if(KG82.phase==='play')__mgBot('skilled',kind).then(fin);else setTimeout(w,30)};
     const fin=()=>{let n=0;const t=()=>{const nx=document.querySelector('.kpod-next');if(nx){nx.click();n++;setTimeout(t,200);return}const ok=document.getElementById('kg82ok');if(ok){ok.click();return}if(n++<80)setTimeout(t,100);else res('stuck')};setTimeout(t,300)};
     if(viaC)goW();else w()});
    const ov=document.documentElement.scrollWidth>innerWidth+1;return{kind,res:res&&typeof res==='object'?(res.raw!=null?res.raw:res.score):String(res),tierRow:viaC?/Độ khó/.test(intro):null,ov}},kind)])}catch(e){let st='';try{st=await p.evaluate(()=>JSON.stringify({ph:KG82.phase,vt:Math.round(performance.now()),pk:KG82.peek&&KG82.peek(),ok:!!document.getElementById('kg82ok'),go:!!document.getElementById('kg82go')}))}catch(x){}r={kind,res:'ERR '+e.message.slice(0,80)+' '+st};try{await p.evaluate(()=>{try{kg82Close(true)}catch(e){}})}catch(x){}}
   R.push(r)}
  out.push({SZ,load,plays:R.length,bad:R.filter(x=>typeof x.res!=='number'||x.ov||x.tierRow===false),errs:[...new Set(errs)]});await ctx.close()}
 console.log(JSON.stringify(out,null,1));await b.close()})();
