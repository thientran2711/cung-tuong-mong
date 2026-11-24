/* ORDER THIN P6/P7 shots: Fold 755x1000 + iPad 1180x820, 3 composed items each — node dev/test/p6-shots.js <outdir> [world ids] [route ids]
   shows (1) composed world reaction cards (a real window opened with that seed), (2) a «Tai mắt báo» card of a composed j70 route against her,
   (3) a j71c festival complication card (fixture). Scratch shots (not in git). */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const OUT=process.argv[2]||'/tmp/p6shots';fs.mkdirSync(OUT,{recursive:true});
const WIDS=(process.argv[3]||'wc-hoa-001,wc-dis-002,wc-day-001').split(','),RIDS=(process.argv[4]||'j70c-poison-001,j70c-musk-002,j70c-rumor-003').split(',');
const FIX=fs.readFileSync(path.join(__dirname,'j71c-fixture.jsonl'),'utf8').split('\n').filter(l=>l.startsWith('{')).map(JSON.parse);
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch();
 for(const dev of ['fold','ipadAir']){const ctx=await D.newDeviceContext(b,dev,{deviceScaleFactor:1,reducedMotion:'reduce'});
  await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  const g=await D.openHost(p,'http://127.0.0.1:'+srv.address().port+'/',{timeout:120000});await g.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function',null,{timeout:120000});
  await g.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
  await g.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(1800);
  await g.addStyleTag({content:'#kroul,#kroulw,#ktut,.kmov{display:none!important}'});
  await g.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,#kpop,.kmov').forEach(e=>e.remove());try{kitCatchOff()}catch(e){}const kc=document.getElementById('kxcatch');if(kc)kc.hidden=true;const md=document.getElementById('modal');md.hidden=true;md.className='modal';try{NLP=null}catch(e){}Q.length=0;window.quiet=1;tab='act';render()});
  const shot=async n=>{await g.waitForTimeout(700);await p.screenshot({path:path.join(OUT,`${dev}-${n}.png`)})};
  for(const id of WIDS){const ok=await g.evaluate(id=>{const sd=WC_SEEDS[id];if(!sd)return 'no seed';const X_=WC_X;const keep=X_.WC[sd.k];X_.WC[sd.k]=[sd];const L=liveRivals(true);const v=L[0];
    const x={};if(sd.k==="hoa")x.who=v.id;if(sd.k==="day"){x.who=v.id;x.sex="m";x.kid="Tiểu hoàng tử"}if(sd.k==="dis")x.sub=(sd.sub||["lut"])[0];if(sd.k==="tang")x.why=(sd.sub||["th"])[0];
    S.wwin={L:[],last:{},n:{},seq:(S.wwin&&S.wwin.seq)||0};WW.inTick=1;let w;try{w=worldStart(sd.k,sd.k==="hoa"?"Cung bén lửa (đèn nến), gió hanh thổi lửa lan":"Nguyên do thật",{force:1,len:3,x})}finally{WW.inTick=0}
    X_.WC[sd.k]=keep;if(!w||!w.x.wc)return 'not drawn';Q.length=0;const m=X_.wcCard(w);if(!m)return 'no card';Q.push(m);showModal();return 'ok'},id);console.log(dev,id,ok);if(ok==='ok')await shot(id)}
  for(const id of RIDS){const ok=await g.evaluate(id=>{const sd=J70C_SEEDS[id];if(!sd)return 'no seed';window.__j95off=1;const v=liveRivals(true)[0];v.bac=999;const P=newPlot70(v,S,sd.m,sd.id,"band");window.__j95off=0;if(!P)return 'no plot';
    P.kn=1;P.kt.push(tellOf70(P,0));P.pend="seen";Q.length=0;const d=mkP("j70",{id:P.id,s:"seen"});if(!d)return 'no card';Q.push(d);showModal();return 'ok'},id);console.log(dev,id,ok);if(ok==='ok')await shot(id)}
  const c=await g.evaluate(F=>{for(const r of F)j71cReg(r);const X_=J71C_X;const out=[];for(const sd of F.filter(r=>r.type==='comp')){const fest=sd.fest==='*'?'newyear':sd.fest;const c=X_.drawComp(fest,sd.kinds[0],liveRivals(true));if(c)out.push([sd.id,fest,c])}return out},FIX);
  for(const [id,fest,cc] of c){await g.evaluate(([fest,cc])=>{Q.length=0;const m=J71C_X.compCard(fest,cc);Q.push(m);showModal()},[fest,cc]);await shot(id)}
  console.log(dev,'page errors',errs.length,errs[0]||'');await ctx.close()}
 await b.close();srv.close()})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
