/* _rvvideo (BIG rv save r5, untracked helper): a real life on one device, recorded: plays N buổi answering cards like a player, then the last
   step's cards are LEFT waiting (unseen) + the Tin báo list; TRUE reload → title → «Tiếp tục kiếp này» → the same waiting cards + list must be back.
   usage: node dev/test/_rvvideo.js <page> <fold|ipadAir> <outDir> [buoi=6] [seed=2] */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs'),path=require('path'),http=require('http');
const [,,PAGE='index.html',DEV='fold',OUT='/tmp/rvv',NB='6',SEED='2']=process.argv;
const SBR=fs.readFileSync(__dirname+'/save-boundary-reload.js','utf8');
const H=eval(SBR.match(/const H=(`[\s\S]*?`);\n/)[1]);const seedInit=eval(SBR.match(/const seedInit=(seed=>\{[\s\S]*?\}\};)\n/)[1].replace(/;$/,''));
(async()=>{const root=path.resolve(__dirname,'../..');fs.mkdirSync(OUT,{recursive:true});
 const srv=http.createServer((q,r)=>{let f=path.join(root,decodeURIComponent(q.url.split('?')[0]));if(f.endsWith('/'))f+='index.html';fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'content-type':f.endsWith('.html')?'text/html; charset=utf-8':f.endsWith('.js')?'text/javascript':f.endsWith('.json')?'application/json':'application/octet-stream'});r.end(b)})}).listen(0);
 await new Promise(r=>srv.on('listening',r));const url=`http://127.0.0.1:${srv.address().port}/${PAGE}`;
 const b=await chromium.launch();const vp=D.DEVICES?D.DEVICES[DEV]:null;
 const ctx=await D.newDeviceContext(b,DEV,{serviceWorkers:'block',recordVideo:{dir:OUT}});await ctx.addInitScript(seedInit,+SEED);
 const p=await ctx.newPage();p.setDefaultTimeout(300000);const pe=[];p.on('pageerror',e=>pe.push(e.message.slice(0,160)));
 const open=async()=>{await D.openDirect(p,url);await p.waitForFunction(()=>typeof deser==='function'&&typeof start==='function'&&document.querySelector('#slots button'));await p.waitForTimeout(1500);await p.evaluate(H);
  await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}})};
 const state=()=>p.evaluate(()=>({key:__sbr.key(),Q:Q.map(m=>String(m.t||m.pid||'?').slice(0,50)),nt:NT.list.map(x=>(x.seen?'':'*')+String(x.line||x.text||x.id).slice(0,40)),saved:__sbr.saved()}));
 await open();
 await p.evaluate(async NB=>{__sbr.newLife('thd');await __sbr.settle();for(let i=0;i<NB;i++){const k=__sbr.key();used=BAL.time.khac;const n=document.getElementById('next');n.disabled=false;n.click();
   if(i<NB-1)await __sbr.after(k);else{for(let j=0;j<120&&__sbr.key()===k;j++)await new Promise(r=>setTimeout(r,250));await new Promise(r=>setTimeout(r,2500))}}},+NB);
 /* the last step: dawn / scenes closed like a player, the cards themselves stay unseen */
 await p.evaluate(async()=>{for(let i=0;i<40;i++){if(__sbr.dawn()){const d=document.getElementById('dawn');const bt=[...d.querySelectorAll('button')].filter(x=>__sbr.vis(x));if(bt.length)bt[bt.length-1].click();else{d.classList.remove('on');d.hidden=true}}
   const sc=document.querySelector('.kmov:not(.km-out) button,#kmrew button,#kpodov button');if(sc)sc.click();await new Promise(r=>setTimeout(r,300))}});
 await p.waitForTimeout(1500);const A=await state();await p.screenshot({path:OUT+'/1-before-card.png'});
 await p.evaluate(()=>{try{closeModal&&0}catch(e){}const bx=document.getElementById('kntbox');if(bx)bx.click()});await p.waitForTimeout(1200);await p.screenshot({path:OUT+'/2-before-tinbao.png'});
 await p.evaluate(()=>{const x=[...document.querySelectorAll('.kp-x,.kx,[data-x],button')].find(b=>/✕|Đóng/.test(b.textContent)&&b.offsetParent);if(x)x.click()});await p.waitForTimeout(800);
 const A2=await state();
 await p.reload({waitUntil:'domcontentloaded'});await open();await p.waitForTimeout(800);await p.screenshot({path:OUT+'/3-title.png'});
 await p.evaluate(()=>document.querySelector('#slots button[data-load="1"]').click());await p.waitForTimeout(3500);
 const B=await state();await p.screenshot({path:OUT+'/4-after-card.png'});
 await p.evaluate(()=>{const bx=document.getElementById('kntbox');if(bx)bx.click()});await p.waitForTimeout(1200);await p.screenshot({path:OUT+'/5-after-tinbao.png'});
 const same=(x,y)=>JSON.stringify(x)===JSON.stringify(y);
 console.log(JSON.stringify({dev:DEV,before:A,beforeAfterClose:A2,after:B,sameKey:A2.key===B.key,sameQ:same(A2.Q,B.Q),sameNT:same(A2.nt,B.nt),pe},null,1));
 await ctx.close();await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(2)});
