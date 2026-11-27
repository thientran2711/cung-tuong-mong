/* save-quota-repro (BIG rv save-unseen-lists rv4, robot M2b Y20→Y19 / M5b 5.2 MB): usage: node dev/test/save-quota-repro.js <page> <save.json> [fill chars=600000 | max = the whole site store full after the first write] [buổi=24] [fold|ipadAir]
   e.g. save = git show origin/claude/cung-tuong-mong-handover-hj0h8w:dev/handover/robot/nc-B-tuc/saves/20261124-0057-010.json (year 14, 4.34 M chars); exit 1 = FAIL.
   A real year-14 robot save (4.34 M chars) in Sổ 1 + FILL chars of other site storage (other slots / co-op copies); a real year-14 robot save (4.34 M chars) in Sổ 1 + FILL chars of other site storage (other slots / co-op copies);
   play N buổi with real taps; after every step: did the slot write land? sổ date vs screen; then a TRUE reload → what comes back. */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs'),path=require('path');
const [,,PAGE='index.html',SAVE,FILL='600000',NB='24',DEV='fold']=process.argv;
const SBR=fs.readFileSync(__dirname+'/save-boundary-reload.js','utf8');const H=eval(SBR.match(/const H=(`[\s\S]*?`);\n/)[1]);
(async()=>{const root=path.resolve(__dirname,'../..');const http=require('http');
 const srv=http.createServer((q,r)=>{let f=path.join(root,decodeURIComponent(q.url.split('?')[0]));fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'content-type':f.endsWith('.html')?'text/html':'text/javascript'});r.end(b)})}).listen(0);
 const url=`http://127.0.0.1:${srv.address().port}/${PAGE}`;const b=await chromium.launch();const ctx=await D.newDeviceContext(b,DEV,{serviceWorkers:'block'});
 await ctx.route(/\.(webp|png|jpg|mp3|mp4|webm)(\?|$)/,r=>r.abort());const p=await ctx.newPage();p.setDefaultTimeout(900000);const pe=[];p.on('pageerror',e=>pe.push(e.message.slice(0,120)));
 const open=async()=>{await D.openDirect(p,url);await p.waitForFunction(()=>typeof deser==='function'&&document.querySelector('#slots button'));await p.waitForTimeout(1200);await p.evaluate(H);
  await p.evaluate(()=>{const ls0=Storage.prototype.setItem;window.__lsErr=[];Storage.prototype.setItem=function(k,v){try{return ls0.apply(this,arguments)}catch(e){window.__lsErr.push(k+' '+String(v).length+' '+e.name);throw e}}})};
 await open();const raw=fs.readFileSync(SAVE,'utf8');
 const put=await p.evaluate(([raw,fill])=>{localStorage.clear();try{if(fill!=='max')localStorage.setItem('zz-fill','x'.repeat(+fill))}catch(e){return 'fill '+e.name}try{localStorage.setItem('hclh-save-v2-1',raw);localStorage.setItem('hclh-slot','1')}catch(e){return 'save '+e.name}return 'ok'},[raw,FILL]);
 await p.reload();await open();await p.evaluate(()=>document.querySelector('#slots button[data-load="1"]').click());await p.waitForTimeout(4000);
 if(FILL==='max')await p.evaluate(room=>{/* the whole site store full: fill another key up to the browser limit, QR_ROOM chars (200) of room left */save();let lo=0,hi=6e6;while(hi-lo>1000){const m=(lo+hi)>>1;try{localStorage.setItem('zz-fill2','x'.repeat(m));lo=m}catch(e){hi=m}}localStorage.setItem('zz-fill2','x'.repeat(Math.max(0,lo-room)))},+(process.env.QR_ROOM||200));
 const r=await p.evaluate(async NB=>{await __sbr.settle();const L=[];let lag=0,first=null;const sz=()=>{try{return (localStorage.getItem('hclh-save-v2-1')||'').length}catch(e){return -1}};
  for(let i=0;i<NB&&!S.dead;i++){const k=__sbr.key();used=BAL.time.khac;const n=document.getElementById('next');n.disabled=false;n.click();await __sbr.after(k);
   const sv=__sbr.saved().split(' ')[0].split('.').slice(0,4).join('.'),now=__sbr.key().split('.').slice(0,4).join('.');if(sv!==now){lag++;if(!first)first=now+' sổ '+sv}
   if(i%6===5)L.push(now+' slot '+sz()+' ser '+JSON.stringify(ser()).length+' lsErr '+window.__lsErr.length)}
  return{lag,first,L,err:window.__lsErr.slice(0,3),errN:window.__lsErr.length,blockedNotice:!!(typeof NT!=='undefined'&&NT.list.some(x=>x.id==='saveBlocked')),key:__sbr.key()}},+NB);
 await p.reload();await open();await p.evaluate(()=>document.querySelector('#slots button[data-load="1"]').click());await p.waitForTimeout(4000);
 const back=await p.evaluate(()=>__sbr.key());const lost=r.key.split('.').slice(0,4).join('.')!==back.split('.').slice(0,4).join('.');
 console.log(JSON.stringify({PAGE,put,FILL,...r,afterReload:back,pe:pe.slice(0,3)},null,1));console.log(!lost&&!r.lag?'QUOTA PASS':'QUOTA FAIL (reload went back: '+r.key+' → '+back+')');
 await b.close();srv.close();process.exit(lost||r.lag?1:0)})().catch(e=>{console.error(e);process.exit(2)});
