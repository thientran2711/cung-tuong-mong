/* nw-poem calibration: plays tho (thư pháp) / doi (đối nét) many times with a skilled or a random bot and prints the 0–10 score distribution.
   usage: node dev/test/nwpoem-bot.js <url> <kind tho|doi> <tier 0|1|2> <skilled|random> <runs> [WxH@dpr] [par]
   skilled bot model (env SIGMA px, SLIP, PERR, THINK): tho = path jitter + occasional slip per stroke; doi = think time + wrong-tile chance. */
const {chromium}=require('playwright');const [,,BASE,KIND,TIER,BOT,RUNS,SZ,PAR]=process.argv;const [WH,DPR]=(SZ||'755x1000@2').split('@');const [W,H]=WH.split('x').map(Number);
const cfg={SIGMA:+(process.env.SIGMA||6),SLIP:+(process.env.SLIP||.08),PERR:+(process.env.PERR||[.04,.12,.20][+TIER]),THINK:+(process.env.THINK||1.6)};
(async()=>{const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});
 const par=+(PAR||4),per=Math.ceil(+RUNS/par),all=[],errs=[];
 await Promise.all([...Array(par)].map(async()=>{const ctx=await b.newContext({ignoreHTTPSErrors:true,viewport:{width:W,height:H},hasTouch:true,deviceScaleFactor:+(DPR||1)});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(process.env.DBG)console.log('C',m.text())});
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  await p.evaluate(()=>{SLOT=3;if(typeof kitRoulette==='function')kitRoulette=o=>{try{o&&o.done&&o.done()}catch(e){}};document.getElementById('title').hidden=true;try{start()}catch(e){}});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.arts,null,{timeout:60000});
  await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove());KG82.noDemo=1});
  for(let i=0;i<per;i++){const raw=await p.evaluate(async([kind,lv,bot,cfg])=>{
    const rnd=()=>Math.random(),gauss=()=>{let u=0;for(let k=0;k<6;k++)u+=rnd();return(u-3)*Math.SQRT2},sl=ms=>new Promise(r=>setTimeout(r,ms));
    const pe=(el,t,x,y)=>el&&el.dispatchEvent(new PointerEvent(t,{clientX:x,clientY:y,pointerType:'touch',pointerId:7,isPrimary:true,bubbles:true,cancelable:true}));
    KG82.phase='';document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove());let res=null;kg82Open({art:'x',title:'t',how:'h'});KG82.ctx='hoc';KG82.lv=lv;kg82Play(kind,raw=>{res=raw});
    const t0=Date.now();const cv=()=>document.querySelector('#kg82 canvas');
    async function drag(path,noise){const el=cv();if(!el)return;const P=[];for(let i=1;i<path.length;i++){const n=Math.max(1,Math.ceil(Math.hypot(path[i][0]-path[i-1][0],path[i][1]-path[i-1][1])/12));for(let s=(i===1?0:1);s<=n;s++)P.push([path[i-1][0]+(path[i][0]-path[i-1][0])*s/n,path[i-1][1]+(path[i][1]-path[i-1][1])*s/n])}
     let o=[0,0],slip=noise&&rnd()<cfg.SLIP,sa=Math.floor(rnd()*P.length*.6),sn=slip?10:0,sd=[gauss(),gauss()];const k=.85;
     for(let i=0;i<P.length;i++){let q=P[i];if(noise){o=[o[0]*k+gauss()*cfg.SIGMA*Math.sqrt(1-k*k),o[1]*k+gauss()*cfg.SIGMA*Math.sqrt(1-k*k)];q=[q[0]+o[0],q[1]+o[1]];if(slip&&i>=sa&&i<sa+sn)q=[q[0]+sd[0]*cfg.SIGMA*2.4,q[1]+sd[1]*cfg.SIGMA*2.4]}
      pe(el,i?'pointermove':'pointerdown',q[0],q[1]);if(i%3===2)await sl(0)}const l=P[P.length-1];pe(el,'pointerup',l[0],l[1])}
    while(res==null&&Date.now()-t0<125000){
     if(KG82.phase==='play'){
      if(kind==='tho'){if(bot==='skilled'){const pk=KG82.peek();if(pk&&pk.drag){if(KG82.dbg)console.log('BOT',JSON.stringify(KG82.st()));const T0=Date.now();await drag(pk.drag,true);if(KG82.dbg)console.log('BOTDRAG',Date.now()-T0,JSON.stringify(KG82.st()));await sl(120+rnd()*250)}}
        else{const el=cv();if(el){const r=el.getBoundingClientRect();const a=[r.left+rnd()*r.width,r.top+rnd()*r.height],c=[r.left+rnd()*r.width,r.top+rnd()*r.height];await drag([a,c],false);await sl(300)}}}
      else{const X=KG82.peekX&&KG82.peekX();if(X&&X.tiles.length){const emp=X.slots.filter(s=>!s.filled);if(!emp.length){await sl(50);continue}
        if(bot==='skilled'){await sl((cfg.THINK*(.6+rnd()*.9))*1000);const X2=KG82.peekX();if(!X2)continue;const nx=X2.slots.find(s=>s.next);let tile=X2.tiles.find(t=>t.ok),slot=nx;
         if(rnd()<cfg.PERR){const bad=X2.tiles.filter(t=>!t.ok);if(bad.length)tile=bad[Math.floor(rnd()*bad.length)]}if(tile&&slot)await drag([[tile.x,tile.y],[(tile.x+slot.x)/2,(tile.y+slot.y)/2],[slot.x,slot.y]],false)}
        else{await sl(450);const X2=KG82.peekX();if(!X2)continue;const e2=X2.slots.filter(s=>!s.filled),t=X2.tiles[Math.floor(rnd()*X2.tiles.length)],s=e2[Math.floor(rnd()*e2.length)];if(t&&s)await drag([[t.x,t.y],[(t.x+s.x)/2,(t.y+s.y)/2],[s.x,s.y]],false)}}}}
     await sl(25)}
    const ov=document.documentElement.scrollWidth>innerWidth;try{kg82Close()}catch(e){}return{raw:res,ov}},[KIND,[0,2,4][+TIER],BOT,cfg]);all.push(raw)}
  await ctx.close()}));
 const R=all.map(x=>x.raw==null?0:x.raw);const h=Array(11).fill(0);R.forEach(x=>h[x]++);const mean=R.reduce((a,b)=>a+b,0)/R.length;
 console.log(JSON.stringify({kind:KIND,tier:+TIER,bot:BOT,cfg:BOT==='skilled'?cfg:undefined,n:R.length,mean:+mean.toFixed(2),ge9:+(R.filter(x=>x>=9).length/R.length).toFixed(2),eq10:+(R.filter(x=>x>=10).length/R.length).toFixed(2),le2:+(R.filter(x=>x<=2).length/R.length).toFixed(2),hist:h,overflow:all.some(x=>x.ov),errors:errs.slice(0,3)}));await b.close()})();
