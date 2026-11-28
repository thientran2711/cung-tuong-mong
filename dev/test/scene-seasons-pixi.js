const {chromium}=(require('./lib/bigpage'),require('playwright'));
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1180,height:820}})).newPage();
await p.route('**/pixi.min.js',r=>r.fulfill({path:process.env.PIXI,contentType:'application/javascript'}));
await p.goto('http://localhost:8941/'+(process.env.PG||'t-seasons.html'));await p.waitForTimeout(2000);await p.click('[data-new]');await p.waitForTimeout(3000);
const r=await p.evaluate(async()=>{const log=[];if(typeof PIXI==='undefined')return 'nopixi';
 const IB=Node.prototype.insertBefore;Node.prototype.insertBefore=function(n,r){if(r&&r.parentNode!==this)r=this.firstChild;return IB.call(this,n,r)};const A=PIXI.Application.prototype,oi=A.init;A.init=async function(o){try{return await oi.call(this,o)}catch(e){log.push('init '+e.message);throw e}};
 const T=PIXI.Ticker&&PIXI.Ticker.prototype;
 PX.failed=false;PX.loading=false;
 // replicate onload body with logging
 try{const app=new PIXI.Application();const st=$("stage");await app.init({backgroundAlpha:0,resizeTo:st,antialias:false,autoDensity:true,resolution:Math.min(2,devicePixelRatio||1)});log.push('i');
  app.ticker.maxFPS=60;const c=app.canvas;c.className="pxc";st.insertBefore(c,st.firstChild);log.push('ins');PX.app=app;PX.layer=new PIXI.Container();PX.fxl=new PIXI.Container();app.stage.addChild(PX.layer,PX.fxl);
  const g=new PIXI.Graphics();g.circle(8,8,8).fill(0xffffff);PX.tex.dot=app.renderer.generateTexture(g);const e=new PIXI.Graphics();e.ellipse(10,5,10,5).fill(0xffffff);PX.tex.petal=app.renderer.generateTexture(e);log.push('tex');
  app.ticker.add(pxTick);PX.key="";await pxScene();log.push('scene')}catch(err){log.push('ERR '+err.message+' '+(err.stack||'').split('\n')[1])}
 const out=[];for(const [m,bu] of [[2,0],[5,1],[8,2],[11,0]]){S.month=m;S.buoi=bu;S.place='vuon';render();await new Promise(r=>setTimeout(r,2500));
  let ks='';try{ks=[...PIXI.Assets.cache._cache.keys()].filter(k=>/ngu-hoa-vien/.test(k)).join(',')}catch(e){ks='?'}
  out.push({want:SCIMG.vuon,bg:!!PX.bg,bgw:PX.bg&&PX.bg.texture.width,key:PX.key,cache:ks,op:$('scimg').style.opacity})}
 return {log,out}});
console.log(JSON.stringify(r));await p.screenshot({path:'seatest/px3.png'});await b.close()})();
