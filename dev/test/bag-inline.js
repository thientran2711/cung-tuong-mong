/* KIT §70.6 inline item strip (review/bag-inline-rv): Tư trang › Túi đồ tap = strip UNDER the grid, no pop-up, no ✕; swap on 2nd tap;
   chips in the right column; Việc act pictures; action pop-ups stay. usage: node dev/test/bag-inline.js <outdir> [WxH,WxH…]
   Serves the repo root itself (no network). Replaces the pop-up checks of item-info.js for the bag site. Exit 1 on any failed check. */
const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const [,,DIR,SIZES]=process.argv;fs.mkdirSync(DIR,{recursive:true});
const VPS=(SIZES||'755x1000,1180x820').split(',').map(s=>s.split('x').map(Number));
const TY={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);
 if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}r.setHeader('Content-Type',TY[path.extname(f)]||'application/octet-stream');r.setHeader('Cache-Control','no-store');fs.createReadStream(f).pipe(r)});
const R={},FAIL=[];const chk=(tag,n,ok,d)=>{(R[tag].checks=R[tag].checks||{})[n]=!!ok;if(!ok)FAIL.push(tag+' '+n+(d!==undefined?' '+JSON.stringify(d):''))};
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const URL='http://127.0.0.1:'+srv.address().port+'/';const b=await chromium.launch();
 for(const [W,H] of VPS){const tag=`${W}x${H}`;R[tag]={errs:[]};
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block'});await ctx.route(u=>/^https?:/.test(u.href)&&!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&!/workers\.dev/.test(u.href),r=>r.abort());
  const p=await ctx.newPage();p.on('pageerror',e=>R[tag].errs.push(e.message.slice(0,200)));p.setDefaultTimeout(60000);
  await p.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1200);
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true})});
  for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});
   await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:90000});if(await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()&&!S.out))break}
  await p.waitForTimeout(1200);
  await p.evaluate(()=>{const k=document.getElementById('kroul');if(k)k.remove();Q.length=0;S.buoi=0;used=0;S.suc=90;S.bac=500;const add=(k,o)=>S.inv.push(Object.assign({k},o||{}));
   add('tram_ngoclan',{from:'hh'});add('y_saxanh');add('vongngoc',{from:'th'});add('tuithom');if(IT.thu)add('thu');deal();Q.length=0;try{closeModal()}catch(e){}render()});
  for(let i=0;i<20;i++){await p.waitForTimeout(500);const n=await p.evaluate(()=>{KMQ.length=0;const L=document.querySelectorAll('.kmov');L.forEach(e=>e.remove());try{kmBusy=false}catch(e){}return L.length});if(!n&&i>2)break}
  const shot=async n=>{await p.waitForTimeout(250);await p.screenshot({path:`${DIR}/${tag}-${n}.jpg`,quality:60})};
  await p.evaluate(()=>{try{localStorage.setItem('hclh-inv-sub','tui')}catch(e){}KINV_SUB='tui';tab='inv';render()});await p.waitForTimeout(600);
  const st=()=>p.evaluate(()=>{const d=document.querySelector('#panel .kinldet');if(!d)return null;const g=document.querySelector('#panel [data-kinvpane="tui"] .kinvgrid,#panel [data-kinvpane="tui"] .kinv');const dr=d.getBoundingClientRect();
   const t=[...document.querySelectorAll('#panel [data-kinvkey="tutrang"][data-kinvi]')];const lastT=t.length?Math.max(...t.map(e=>e.getBoundingClientRect().bottom)):0;
   const pic=d.querySelector('.kinlpic .kitem')||d.querySelector('.kinlpic'),ch=d.querySelector('.kinlchips'),mid=d.querySelector('.kinln');
   return{empty:/Chạm một món/.test(d.textContent),name:mid?mid.textContent:null,under:dr.top>=lastT-2,picL:pic?pic.getBoundingClientRect().right<=(ch?ch.getBoundingClientRect().left+1:1e9)&&pic.getBoundingClientRect().left<dr.left+dr.width/3:false,
    picSq:pic?Math.abs(pic.getBoundingClientRect().width-pic.getBoundingClientRect().height)<12:false,chipsR:ch?ch.getBoundingClientRect().left>dr.left+dr.width*0.5:false,chips:ch?ch.textContent.replace(/\s+/g,' '):null,chipsVert:ch?ch.getBoundingClientRect().height>=ch.getBoundingClientRect().width*0.7||ch.children.length>=2&&ch.children[1].getBoundingClientRect().top>=ch.children[0].getBoundingClientRect().bottom-2:false,
    x:!!d.querySelector('.kit-x,.kx,[aria-label="Đóng"]'),modal:!!document.querySelector('#modal:not([hidden]) .kmodal,#modal:not([hidden]) .kit'),overW:dr.right>innerWidth+1,sel:document.querySelectorAll('#panel .kitem-sel').length,
    scroll:(()=>{const s=document.getElementById('panel');return s?s.scrollHeight-s.clientHeight:0})(),dr:[dr.top|0,dr.bottom|0],vh:innerHeight}});
  const s0=await st();chk(tag,'strip-exists-empty',s0&&s0.empty,s0);chk(tag,'chips-in-empty',s0&&/Sắc|Xa xỉ|Đã biết/.test(s0.chips||''),s0&&s0.chips);await shot('1-bag-empty');
  const tap=i=>p.evaluate(i=>{const t=[...document.querySelectorAll('#panel [data-kinvkey="tutrang"][data-kinvi]')].filter(e=>!/kempty|kinve/.test(e.className))[i];if(!t)return false;t.scrollIntoView({block:'center'});t.click();return true},i);
  chk(tag,'tap1',await tap(0));await p.waitForTimeout(400);const s1=await st();
  chk(tag,'s1-named',s1&&!s1.empty&&s1.name,s1);chk(tag,'s1-under-grid',s1&&s1.under,s1);chk(tag,'s1-pic-left-square',s1&&s1.picL&&s1.picSq,s1);chk(tag,'s1-chips-right',s1&&s1.chipsR&&/Sắc|Xa xỉ/.test(s1.chips||''),s1);chk(tag,'s1-chips-vertical',s1&&s1.chipsVert,s1);
  chk(tag,'s1-no-x',s1&&!s1.x,s1);chk(tag,'s1-no-modal',s1&&!s1.modal,s1);chk(tag,'s1-ring',s1&&s1.sel===1,s1);chk(tag,'s1-nooverflowX',s1&&!s1.overW,s1);
  await p.evaluate(()=>{const d=document.querySelector('#panel .kinldet');d&&d.scrollIntoView({block:'end'})});await shot('2-bag-item1');
  chk(tag,'tap2',await tap(1));await p.waitForTimeout(400);const s2=await st();chk(tag,'s2-swapped',s2&&!s2.empty&&s2.name&&s1&&s2.name!==s1.name,[s1&&s1.name,s2&&s2.name]);chk(tag,'s2-no-modal',s2&&!s2.modal&&!s2.x,s2);chk(tag,'s2-one-ring',s2&&s2.sel===1,s2);
  await p.evaluate(()=>{const d=document.querySelector('#panel .kinldet');d&&d.scrollIntoView({block:'end'})});await shot('3-bag-item2');
  R[tag].scroll={s1:s1&&s1.scroll,s2:s2&&s2.scroll,vh:H};
  R[tag].perItem=[];for(let i=0;i<9;i++){if(!await tap(i))break;await p.waitForTimeout(250);const q=await st();if(q&&!q.empty&&i===6){await p.evaluate(()=>{const s=document.getElementById('panel');s.scrollTop=0;window.scrollTo(0,0)});await shot('6-item7-top');await p.evaluate(()=>{const s=document.getElementById('panel');s.scrollTop=99999});await shot('6-item7-bottom');R[tag].scrollEl=await p.evaluate(()=>{const o=[];let e=document.querySelector('#panel .kinldet');while(e){if(e.scrollHeight>e.clientHeight+2)o.push([e.id||e.className.slice(0,30),e.scrollHeight,e.clientHeight,e.scrollTop|0]);e=e.parentElement}return o})}
  if(q&&!q.empty){R[tag].perItem.push([q.name,q.scroll,await p.evaluate(()=>{const e=document.querySelector('#panel .kinlpic .kitem')||document.querySelector('#panel .kinlpic');const r=e.getBoundingClientRect();return[r.width|0,r.height|0]})])}}
  /* slot strip */
  R[tag].slot=await p.evaluate(()=>{const s=document.querySelector('#panel [data-keqk="tutrang"][data-keqi]');if(!s)return'noslot';s.click();return'clicked'});await p.waitForTimeout(400);
  const s3=await st();chk(tag,'slot-strip-no-modal',s3&&!s3.modal&&!s3.x,s3);await shot('4-slot');
  /* old popup path gone: kinvOpen outside capture still opens modal? not required. Việc pane */
  await p.evaluate(()=>{const b=document.querySelector('[data-kinvsub="viec"]');b&&b.click()});await p.waitForTimeout(500);
  R[tag].viec=await p.evaluate(()=>{const pane=document.querySelector('#panel [data-kinvpane="viec"]');const L=[...pane.querySelectorAll('button.ka')];return{n:L.length,nopic:L.filter(b=>!b.querySelector('img,.kapic,[style*="background-image"],picture')&&!b.querySelector('.kap')).map(b=>b.textContent.slice(0,40))}});
  await shot('5-viec');
  /* act cards: each button.ka must carry a picture (compare with the class the kit uses) */
  R[tag].viecPic=await p.evaluate(()=>{const pane=document.querySelector('#panel [data-kinvpane="viec"]');return[...pane.querySelectorAll('button.ka')].map(b=>[b.textContent.replace(/\s+/g,' ').slice(0,28),b.className,b.innerHTML.includes('<img')||/url\(/.test(b.outerHTML)||!!b.querySelector('[class*="pic"],[class*="img"]')])});
  chk(tag,'viec-has-cards',R[tag].viec.n>=3,R[tag].viec);
  chk(tag,'viec-all-pics',R[tag].viecPic.every(x=>x[2]),R[tag].viecPic.filter(x=>!x[2]));
  chk(tag,'no-pageerrors',R[tag].errs.length===0,R[tag].errs);
  await ctx.close();console.log(tag,JSON.stringify(R[tag]).slice(0,1500))}
 await b.close();srv.close();fs.writeFileSync(`${DIR}/bag-inline.json`,JSON.stringify(R,null,1));console.log(FAIL.length?'FAIL '+FAIL.length+'\n'+FAIL.join('\n'):'bag-inline PASS');process.exit(FAIL.length?1:0)})();
