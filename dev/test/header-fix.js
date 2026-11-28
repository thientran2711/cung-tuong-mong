/* KIT 31.19 top bar probe (review/header-fix): serves a local index.html under the live origin (images from the live site), worst-case strings, measures box overlaps, lines per item, clipping, page errors.
   usage: node dev/test/header-fix.js <index.html> WxH@dpr out.jpg [long|srv|typ]   (OPTB=1 = option B preview CSS) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');
const [,,IDX,SZ,OUT,LONG,DUMP]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
const LIVE='https://thientran2711.'+'github.io/cung-tuong-mong/';
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 const html=fs.readFileSync(IDX,'utf8');
 await ctx.route(u=>u.href===LIVE||u.href===LIVE+'index.html',r=>r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}));
 await ctx.route(/\.(mp3|ogg)$/,r=>r.fulfill({status:404,body:''}));
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(LIVE,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important}'}).catch(()=>{});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
 await p.evaluate((LONG)=>{const kl=document.getElementById('kload');if(kl)kl.remove();window.__rmov=()=>{['kroul','kroulw','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()})};try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}window.__srv=isSrv();Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}
  if(LONG&&LONG!=='typ'){S.name="Hoàng Phủ Uyển Nghiêm";if(LONG!=='srv')S.rank=6;S.age=29;S.month=11;S.year=10;S.tuan=1;S.lot={lv:0,dom:"Giao thiệp"};S.wx={n:"mai nở trong tuyết",k:"snowp",f:0};window.__long=1}
  render()},LONG||'');
 await p.waitForTimeout(1500);
 if(LONG&&LONG!=='typ'){await p.evaluate(()=>{const pl=places().map(x=>[x.k,typeof accName==="function"?accName(x.k):x.n]).sort((a,b)=>b[1].length-a[1].length);window.__pl=pl.slice(0,5);try{S.place=pl[0][0];goTo(pl[0][0])}catch(e){window.__pe=e.message}Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;window.__rmov();render()});await p.waitForTimeout(800);
  await p.evaluate(()=>{const b=document.querySelector('#tabs [data-tab="act"]');if(b)b.click()});await p.waitForTimeout(1500)}
 if(process.env.OPTB){await p.addStyleTag({content:'html body .game#game.k3ph header.hud.optb:has(#k3room){grid-template-columns:auto max-content minmax(0,1fr) max-content!important;grid-template-areas:"menu me . room" "tc tc tc tc" "stats stats stats stats"!important} html body .game#game header.hud.optb>#k3room:not([hidden]){grid-area:room!important;justify-self:end!important;align-self:center!important;margin-top:0!important} html body .game#game header.hud.optb>#k3tc{justify-self:stretch!important;align-self:center!important;border-top:1px solid #e6d3ac;padding-top:3px!important;margin-top:4px!important} html body .game#game header.hud.optb .k3tc .k3tt{display:flex!important;gap:0 16px!important;flex-wrap:wrap}'});await p.evaluate(()=>{document.querySelector('header.hud').classList.add('optb');render()});await p.waitForTimeout(600)}
 if(LONG==='srv'){await p.evaluate(()=>{const r0=renderHUD;renderHUD=function(){const r=r0.apply(this,arguments);const m=document.getElementById('me-r');if(m){m.textContent='Cung nữ của Hoàng Phủ Uyển Nghiêm'}return r};render()});await p.waitForTimeout(800)}
 await p.evaluate(()=>{window.__rmov();const md=document.getElementById("modal");if(md)md.hidden=true});await p.waitForTimeout(500);
 for(let t=0;t<3;t++){try{await p.screenshot({path:OUT,type:'jpeg',quality:85,clip:{x:0,y:0,width:W,height:Math.min(H,260)}});break}catch(e){await p.waitForTimeout(3000)}}
 await p.screenshot({path:OUT.replace(/\.jpg$/,'-full.jpg'),type:'jpeg',quality:70});
 const m=await p.evaluate((DUMP)=>{const hd=document.querySelector('header.hud');const r=e=>{const q=e.getBoundingClientRect();return [Math.round(q.left),Math.round(q.top),Math.round(q.right),Math.round(q.bottom)]};
  const vis=e=>e.offsetParent&&e.getBoundingClientRect().width>0;
  const kids=[...hd.querySelectorAll('*')].filter(vis);
  const leaf=kids.filter(e=>e.children.length===0||e.id).map(e=>({id:e.id,c:(e.className&&e.className.baseVal===undefined?e.className:'').slice(0,30),t:e.textContent.trim().slice(0,30),r:r(e),lh:Math.round(parseFloat(getComputedStyle(e).lineHeight)||0)}));
  const top=(()=>{let e=document.elementFromPoint(377,50);const a=[];while(e&&a.length<6){a.push((e.id||'')+'.'+(typeof e.className==='string'?e.className:'').slice(0,40));e=e.parentElement}return a})();const K=['menu','me-p','me-n','me-r','me-a','me-d','k3room','k3tc','kstrow'].map(i=>[i,document.getElementById(i)]).filter(x=>x[1]&&vis(x[1]));
  const B=K.map(([i,e])=>[i,e.getBoundingClientRect()]);const ov=[];const nest={'me-p':1,'me-n':1,'me-r':1,'me-a':1,'me-d':1};
  for(let a=0;a<B.length;a++)for(let c=a+1;c<B.length;c++){const [i,x]=B[a],[j,y]=B[c];const w=Math.min(x.right,y.right)-Math.max(x.left,y.left),h=Math.min(x.bottom,y.bottom)-Math.max(x.top,y.top);if(w>0.5&&h>0.5)ov.push(i+'/'+j+' '+Math.round(w)+'x'+Math.round(h))}
  const hb=hd.getBoundingClientRect();const out=B.filter(([i,x])=>x.left<hb.left-.5||x.right>hb.right+.5||x.bottom>hb.bottom+.5).map(([i])=>i);
  const lines=e=>{const rg=document.createRange();rg.selectNodeContents(e);const ys=[...rg.getClientRects()].filter(q=>q.width>1&&q.height>8).map(q=>q.top+q.height/2).sort((a,b)=>a-b);let n=0,l=-99;ys.forEach(y=>{if(y-l>8){n++;l=y}});return n};
  const wrap=['me-n','me-r','me-a','me-d','k3room'].map(i=>[i,document.getElementById(i)]).filter(x=>x[1]&&vis(x[1])).map(([i,e])=>i+':'+lines(e));
  const tcl=[...hd.querySelectorAll('#k3tt .k3l1, #k3tt .k3l2')].map(e=>lines(e));
  const clip=[...hd.querySelectorAll('*')].filter(e=>vis(e)&&e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflowX!=='visible').map(e=>e.id||e.className);
  const stg=document.getElementById('stage'),pn=document.getElementById('panel');const below=[stg,pn].filter(e=>e&&vis(e)).map(e=>Math.round(e.getBoundingClientRect().top));
  const hovf=document.documentElement.scrollWidth>innerWidth+1;
  if(window.__B){} return{srv:window.__srv,khd2:hd.classList.contains('khd2'),rk:(document.getElementById('me-r')||{}).textContent,room:(document.getElementById('k3room')||{}).textContent,ov,out,wrap,tcl,clip,hdb:Math.round(hb.bottom),below,hovf,top,hd:r(hd),pl:window.__pl,pe:window.__pe,html:DUMP?hd.outerHTML.slice(0,6000):'',leaf:leaf.filter(x=>x.id||x.t).slice(0,80)}},DUMP||'');
 console.log(JSON.stringify(m,null,0));console.log('ERRS',JSON.stringify(errs));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
