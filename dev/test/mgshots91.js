/* one screenshot per contest kind WHILE PLAYING (painted board + sprites): the oracle plays for a moment, then pauses, then #kg82 is shot.
   usage: node dev/test/mgshots91.js <baseURL> <W>x<H>@<dpr> <outdir> [kinds,comma] [hoc]   (hoc = lesson boards via playArt) */
const {chromium}=require('./lib/pw-roulette');
const [,,BASE,SZ,OUT,KL,CTX]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
const T={dan:3200,hat:4500,co:1300,dauho:2600,ban:2600,tho:1500,doi:1500,doden:2600,ve:2200,hoa:2600,theu:500,kim:1600,mua:450,banh:7000,huong:1300};
/* memory games are shot while the pattern / steps are being shown */
const SHOWN={theu:1100,mua:750};
const KINDS=(KL&&KL!=='all'?KL:Object.keys(T).join(',')).split(',');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1)});
 const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.clock.install();await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;
  setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50);Object.assign(S.arts,{cam:3,ky:2,thi:4,hoa:1,vu:3,y:2});render()});
/* the page clock is paused: each game advances by clock.runFor, so every shot is a consistent frame at a chosen moment of play */
 {const tn=await p.evaluate(()=>Date.now());await p.clock.pauseAt(tn+2000)}
 const out=[];
 for(const kind of KINDS){
  await p.evaluate(([kind,hoc])=>{window.__res=null;if(hoc)playArt({art:kind,title:'Tự luyện',onDone:r=>window.__res=r});else startContest({art:kind,title:'Hội Thượng nguyên',rivals:liveRivals(true).slice(0,4),prep:6,onDone:r=>window.__res=r})},[kind,CTX==='hoc']);
  await p.clock.runFor(300);await p.evaluate(()=>document.getElementById('kg82go').click());
  for(let i=0;i<40&&!(await p.evaluate(()=>!!document.querySelector('#kg82box canvas')));i++){await p.waitForTimeout(150);await p.clock.runFor(100)}
  await p.clock.runFor(200);
  if(!SHOWN[kind])await p.evaluate(()=>{window.__ap=true;let nx=0,hold=null,busy=false;const pe=(el,t,x,y,id)=>el&&el.dispatchEvent(new PointerEvent(t,{clientX:x,clientY:y,pointerType:'touch',pointerId:id,isPrimary:true,bubbles:true,cancelable:true}));
   const tick=()=>{if(!window.__ap||KG82.phase!=='play'){if(hold){pe(hold.el,'pointerup',hold.x,hold.y,7);hold=null}return}const pk=KG82.peek();const now=performance.now();
    if(pk){if('hold' in pk){const el=pk.hsel?document.querySelector(pk.hsel):document.elementFromPoint(pk.x,pk.y);let x=pk.x,y=pk.y;if(pk.hsel&&el){const r=el.getBoundingClientRect();x=r.left+r.width/2;y=r.top+r.height/2}
       if(pk.hold&&!hold&&el){pe(el,'pointerdown',x,y,7);hold={el,x,y}}else if(!pk.hold&&hold){pe(hold.el,'pointerup',hold.x,hold.y,7);hold=null}}
     if(pk.drag&&!busy&&now>nx){busy=true;const D=pk.drag;const el=document.elementFromPoint(D[0][0],D[0][1]);const pts=[];for(let i=1;i<D.length;i++){const n=Math.max(1,Math.ceil(Math.hypot(D[i][0]-D[i-1][0],D[i][1]-D[i-1][1])/12));for(let s=1;s<=n;s++)pts.push([D[i-1][0]+(D[i][0]-D[i-1][0])*s/n,D[i-1][1]+(D[i][1]-D[i-1][1])*s/n])}
       pe(el,'pointerdown',D[0][0],D[0][1],3);let k=0;const mv=()=>{if(k<pts.length){pe(el,'pointermove',pts[k][0],pts[k][1],3);k++;setTimeout(mv,10)}else{const l=pts[pts.length-1]||D[0];pe(el,'pointerup',l[0],l[1],3);busy=false;nx=performance.now()+260}};mv()}
     else if(pk.x!=null&&!('hold' in pk)&&!pk.drag&&now>nx&&!busy){const el=document.elementFromPoint(pk.x,pk.y);if(el){pe(el,'pointerdown',pk.x,pk.y,5);pe(el,'pointerup',pk.x,pk.y,5)}nx=now+120}}
    setTimeout(tick,8)};tick()});
  const dur=SHOWN[kind]?SHOWN[kind]:(T[kind]||2000);for(let t=0;t<dur;t+=100)await p.clock.runFor(100);
  await p.evaluate(()=>{window.__ap=false});await p.clock.runFor(32);
  const ph=await p.evaluate(()=>KG82.phase);
  const file=`${OUT}/${CTX==='hoc'?'hoc-':''}${kind}-${SZ}-play.jpg`;await p.locator('#kg82').screenshot({path:file,type:'jpeg',quality:84,animations:'allow'});
  const chk=await p.evaluate(()=>{const d=document.getElementById('kg82');return{ox:document.documentElement.scrollWidth>innerWidth,cut:[...d.querySelectorAll('button,.kgc b,.kgc small')].filter(e=>e.scrollWidth>e.clientWidth+1).length}});
  out.push({kind,phase:ph,...chk});await p.evaluate(()=>kg82Close());await p.clock.runFor(200)}
 console.log(JSON.stringify({size:SZ,ctx:CTX||'thi',out,errors:errs}));await b.close()})();
