/* review/newlife-reset: an OLD save written before the fix (kLine's line memory sat in S.vl, the worn-veil field) loads clean:
   S.vl = null (or a real veil), the memory moved to S.vmem, the memory object pushed into her chest is gone, the false healing line is gone,
   a REAL worn veil survives, the save plays a week with no page error.  usage: node dev/test/newlife-oldsave.js [path|url] → lines + "FAIL n" */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),http=require('http');const ROOT=path.resolve(__dirname,'../..');
function serve(){return new Promise(r=>{const s=http.createServer((q,res)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);const f=path.join(ROOT,p);
 if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){res.writeHead(404);return res.end()}res.writeHead(200,{'content-type':/\.html$/.test(f)?'text/html; charset=utf-8':/\.js$/.test(f)?'text/javascript':'application/octet-stream'});fs.createReadStream(f).pipe(res)});
 s.listen(0,()=>r({url:`http://127.0.0.1:${s.address().port}/`,close:()=>s.close()}))})}
(async()=>{let srv=null,URL=process.argv[2]||'index.html';if(!/^http/.test(URL)){srv=await serve();URL=srv.url+URL}
 const b=await chromium.launch();let fail=0;const ck=(n,ok,info)=>{if(!ok)fail++;console.log((ok?'ok   ':'FAIL ')+n+(info!==undefined?' · '+JSON.stringify(info).slice(0,500):''))};
 const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&window.__ctmBuilt,null,{timeout:0});await p.waitForTimeout(2500);
 for(const real of [false,true]){
  const r=await p.evaluate(real=>{try{$("title").hidden=true}catch(e){}start();try{const ok=document.querySelector('button[data-nl="ok"]');if(ok)ok.click()}catch(e){}Q.length=0;
   const mem={'tl-greet':{'Chào ngươi':3,__b:'3.1',__l:'Chào ngươi'},'tl-maid':{'Dạ':2}};
   S.scar=null;S.rash=null;if(real){S.scar={sev:1,d:6,veil:1,pg:0,need:30};S.vl={k:vlKey(2,1)}}else S.vl=mem;
   S.inv.push(JSON.parse(JSON.stringify(mem)));if(!real)S.inv=S.inv.filter(e=>!(e&&e.k&&vlIsK(e.k)));
   log("Vết thương trên mặt đã lành, ngươi tháo mạng che, cất vào rương.");
   const d=JSON.parse(JSON.stringify(ser()));delete d.S.vmem;SLOT=3;localStorage.setItem(SK(3),JSON.stringify(d));
   const L=loadSlot(3);kmReset();quiet=true;deser(L);quiet=false;Q.length=0;
   const bad=(S.inv||[]).filter(e=>e&&typeof e==='object'&&!e.k).length;
   const line=(S.logs||[]).some(l=>/tháo mạng che, cất vào rương/.test(l));
   let wkErr="";try{S.buoi=0;endTurn();Q.length=0}catch(e){wkErr=e.message}
   return {vl:S.vl,vmem:Object.keys(S.vmem||{}),bad,line,wkErr}},real);
  if(!real){ck('old save: S.vl no longer holds the line memory',r.vl==null,r);ck('old save: memory moved to S.vmem',r.vmem.includes('tl-greet'),r.vmem);
   ck('old save: no memory object in the chest',r.bad===0,r.bad);ck('old save: the false healing line is gone',!r.line);}
  else{ck('real veil: kept on the wounded face',r.vl&&/^mc/.test(r.vl.k||''),r.vl);ck('real veil save: the memory object is out of the chest',r.bad===0,r.bad)}
  ck(`${real?'real veil':'old save'}: plays a week`,!r.wkErr,r.wkErr)}
 ck('no page errors',errs.length===0,errs.slice(0,5));await b.close();if(srv)srv.close();console.log('FAIL '+fail);process.exit(fail?1:0)})();
