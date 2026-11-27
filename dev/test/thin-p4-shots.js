/* ORDER THIN P4/P5 shots: Fold 755x1000 + iPad 1180x820 of composed j68 openings and composed Kỳ ngộ cards (the real modal, kit frame).
   usage (after dev/site/build_site.sh with the seeds folded): node dev/test/thin-p4-shots.js <outdir> j68:<seed id>… ky:<seed id>… */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const OUT=process.argv[2]||'/tmp/thin-p4-shots';const IDS=process.argv.slice(3);fs.mkdirSync(OUT,{recursive:true});
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch();
 const sleep=t=>new Promise(r=>setTimeout(r,t));let fail=0;
 for(const [dev,W,H] of [['fold',755,1000],['ipad',1180,820]]){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();const g=p;const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('http://127.0.0.1:'+srv.address().port+'/index.html',{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&window.KY,null,{timeout:120000});await sleep(2500);
  await p.addStyleTag({content:'#kroul,.kroul,.krbox,.kcf-w,.kmov.kcf,#kload,#klife{display:none!important}'});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;for(let i=0;i<40;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!isSrv())break}Q.length=0;
   if(!S.maid)S.maid=newMaid(nmNew('maid'),50);if((S.staff||[]).length<4)fillStaff(S,true);S.sung=Math.max(S.sung||0,40);S.nights=Math.max(S.nights||0,6);S.bac=Math.max(S.bac||0,500);render()});
  await sleep(2000);
  /* dismiss the start-of-life fanfares (Thánh chỉ, births…): they are not part of the card being shot */
  for(let i=0;i<12;i++){const n=await p.evaluate(()=>{let c=0;for(const b of document.querySelectorAll('button,.btn,[role=button]')){const r=b.getBoundingClientRect();if(r.width&&/^(Tiếp theo|Đã hiểu|Tiếp tục)$/.test((b.innerText||'').trim())&&!b.closest('#modal .opt')){b.click();c++}}return c});if(!n)break;await sleep(700)}
  for(const id of IDS){const [kind,sid]=id.split(':');
   const ok=await g.evaluate(([kind,sid])=>{Q.length=0;try{$("modal").hidden=true}catch(e){}
    if(kind==='j68'){const s=E68I["c:"+sid];if(!s)return 'no seed';const e=e68();delete e.cd[s.id];let d=e68Make(s);if(!d){const ALLN=[].concat(...Object.values(BAL.net.F),...Object.values(BAL.net.M));const t0=tr6;tr6=()=>ALLN.slice();try{d=e68Make(s)}finally{tr6=t0}}
     if(!d)return 'not made';e68Push(d,s,true).must=1;showModal();return 'ok'}
    const Dd=KY.DEF[sid];if(!Dd)return 'no ky seed';const B=BAL.kyngo;const PPL=[...liveRivals(true).map(v=>({kind:"rv",ref:v})),{kind:"emp"},{kind:"th"},...(S.men||[]).map(m=>({kind:"man",ref:m})),...Object.keys(S.court||{}).filter(c=>S.court[c]&&S.court[c].name).map(c=>({kind:"court",c,ref:S.court[c]})),...["gt","tn"].map(id=>{const st=elderBy(id);return st?{kind:"el",eid:id,ref:st}:null}).filter(Boolean)];
    const o=liveRivals(true).find(v=>(v.staff||[]).length);if(o)for(const s of o.staff)PPL.push({kind:"sv",ref:s,own:o});const k=liveRivals(true).find(v=>(v.kids||[]).some(x=>x.alive));if(k)for(const x of k.kids)if(x.alive)PPL.push({kind:"kid",ref:x,own:k});
    const pl0=Dd.pl,wh0=Dd.when,wo0=Dd.who,b0=B.E[sid].b,p0=[B.p0,B.step,B.pMax];Dd.pl=["zz"];Dd.when=null;Dd.who=(F,L,X)=>wo0(F,PPL,X);B.E[sid].b="0123";B.p0=100;B.step=0;B.pMax=100;
    S.ky={m:0,cd:-1,seen:{},got:[],last:-1};for(const i in KY.DEF)if(i!==sid)S.ky.seen[i]=0;S.out=false;try{KY.arrive(S,"zz","t")}finally{Dd.pl=pl0;Dd.when=wh0;Dd.who=wo0;B.E[sid].b=b0;[B.p0,B.step,B.pMax]=p0}
    if(!Q.length)return 'not fired';showModal();return 'ok'},[kind,sid]);
   await sleep(+process.env.SHOT_WAIT||5000);const f=path.join(OUT,`${dev}-${kind}-${sid}.png`);await p.screenshot({path:f});
   const m=await p.evaluate(()=>{const M=document.getElementById('modal');const o=[...document.querySelectorAll('#modal .opt')].map(x=>x.getBoundingClientRect()).filter(x=>x.width);const mr=M&&M.querySelector('.box,.mbox,div')?M.querySelector('.box,.mbox,div').getBoundingClientRect():null;
    return {open:!!M&&!M.hidden,ovx:document.documentElement.scrollWidth>innerWidth+1,optsIn:o.every(x=>x.right<=innerWidth+1)&&(!mr||mr.bottom<=innerHeight+1),n:o.length,scroll:o.some(x=>x.bottom>innerHeight+1)}});
   const good=ok==='ok'&&m.open&&!m.ovx&&m.optsIn;if(!good)fail++;console.log((good?'ok   ':'FAIL ')+dev+' '+id+' '+ok+' '+JSON.stringify(m)+' '+f)}
  if(errs.length){fail++;console.log(dev,'page errors:',errs.slice(0,3).join(' | '))}await ctx.close()}
 console.log(fail?`SHOTS: ${fail} FAIL`:'SHOTS: PASS');await b.close();srv.close()})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
