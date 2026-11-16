/* review/tuduc-mg: plays the four Tứ đức mini-games (jtd.js) through the lesson act (lessonVir) with a bot driven by KG82.peek.
   usage: node dev/test/tuduc-mg.js <rootDir> <W>x<H>@<dpr> <outdir> [cong,dung,ngon,hanh] [shots:all|none] [level]
   serves <rootDir> from an in-process static server on a free port (closed at the end). Fails on page errors, overflow, ellipsis, "%", missing result, no progress. */
const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const [,,ROOT,SZ,OUT,KL,SH,LV]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);const KINDS=(KL&&KL!=='all'?KL:'cong,dung,ngon,hanh').split(',');
fs.mkdirSync(OUT,{recursive:true});
const MIME={'.html':'text/html','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png','.webmanifest':'application/json'};
(async()=>{const srv=http.createServer((q,r)=>{let f=path.join(ROOT,decodeURIComponent(q.url.split('?')[0]));if(f.endsWith('/'))f+='index.html';fs.readFile(f,(e,d)=>{if(e){r.writeHead(404);return r.end()}r.writeHead(200,{'content-type':MIME[path.extname(f)]||'application/octet-stream'});r.end(d)})});
 await new Promise(r=>srv.listen(0,r));const BASE=`http://localhost:${srv.address().port}/index.html`;
 const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1)});
 const p=await ctx.newPage();const errs=[];if(process.env.CPU_THROTTLE){const cs=await ctx.newCDPSession(p);await cs.send('Emulation.setCPUThrottlingRate',{rate:+process.env.CPU_THROTTLE})}p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(3000);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50);render()});await p.waitForTimeout(800);await p.evaluate(()=>{document.querySelectorAll('#kroul,.kroul').forEach(e=>e.remove())});await p.addStyleTag({content:'.kroul,.kload{display:none!important}'});
 const shot=async n=>{if(SH==='none')return;await p.locator('#kg82').screenshot({path:`${OUT}/${n}-${SZ}.jpg`,type:'jpeg',quality:70,timeout:60000})};
 const res=[];
 for(const k of KINDS){for(const mode of ['self','master']){if(mode==='master'&&SH==='quick')continue;
  try{const lv=+(LV||0);const before=await p.evaluate(([k,lv])=>{Q.length=0;S.vir[k]=lv;S.virp[k]=0;S.suc=100;S.bac=300;used=0;KG82.over=0;S.turn=S.turn||0;S.mg=null;TDS.busy=false;return{lv:S.vir[k],p:S.virp[k],turn:S.turn,t:typeof S.t!=='undefined'?S.t:null}},[k,lv]);
  await p.evaluate(([k,m])=>{window.__done=null;lessonVir(k,m)},[k,mode]);
  /* merge-train-4: review/tuduc-sub puts a work / teacher choice (kit dialog) in front of the lesson: take its first real option */
  for(let i=0;i<4;i++){const picked=await p.evaluate(()=>{if(document.getElementById('kg82go'))return false;const m=document.getElementById('modal');if(!m||m.hidden)return false;const b=[...m.querySelectorAll('button')].find(x=>!x.disabled&&x.offsetParent&&/^Làm$/.test(x.innerText.trim()))||[...m.querySelectorAll('.opts button')].find(x=>!x.disabled&&!/^\s*Thôi/.test(x.innerText));if(b){b.click();return true}return false});if(!picked){await p.waitForTimeout(1200);if(await p.evaluate(()=>!!document.getElementById('kg82go')))break;continue}await p.waitForTimeout(1500)}
  await p.waitForSelector('#kg82go',{timeout:30000});await p.waitForTimeout(300);await shot(`${k}-${mode}-1intro`);
  await p.evaluate(()=>document.getElementById('kg82go').click());await p.waitForTimeout(500);await shot(`${k}-${mode}-2play`);
  const t0=Date.now();await p.evaluate(()=>{window.__bt&&clearInterval(window.__bt);let pid=1;window.__bt=setInterval(()=>{const pk=KG82.peek();if(!pk)return;const cv=document.querySelector('#kg82box canvas');
    const ev=(t,x,y,id)=>cv&&cv.dispatchEvent(new PointerEvent(t,{clientX:x,clientY:y,pointerId:id||1,pointerType:'touch',bubbles:true,isPrimary:true,cancelable:true}));
    if(pk.drag){const D=pk.drag;ev('pointerdown',D[0][0],D[0][1]);for(let i=1;i<D.length;i++)ev('pointermove',D[i][0],D[i][1]);ev('pointerup',D[D.length-1][0],D[D.length-1][1])}
    else if(pk.hold){const id=++pid;ev('pointerdown',pk.x,pk.y,id);setTimeout(()=>ev('pointerup',pk.x,pk.y,id),45)}
    else if(pk.sel){const e=document.querySelector(pk.sel);if(e&&!e.disabled)e.click()}
    else if(pk.x!=null){ev('pointerdown',pk.x,pk.y);ev('pointerup',pk.x,pk.y)}},50)});
  while(Date.now()-t0<200000){if(await p.evaluate(()=>{const e=document.getElementById('kg82ok');return !!e&&KG82.phase==='result'&&!!document.querySelector('#kg82 .kit-x[data-kitx=ov]')}))break;await p.waitForTimeout(250)}
  await p.evaluate(()=>clearInterval(window.__bt));
  const ok=await p.evaluate(()=>{const e=document.getElementById('kg82ok');return e&&KG82.phase==='result'?1:0});await shot(`${k}-${mode}-3result`);
  const info=await p.evaluate(()=>{const d=document.getElementById('kg82');const o=document.documentElement.scrollWidth>innerWidth+1||(d&&d.scrollWidth>d.clientWidth+1);
   const ell=d?[...d.querySelectorAll('*')].some(e=>e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).textOverflow==='ellipsis'):false;const txt=d?d.innerText:'';
   return{over:o,ell,pct:/%/.test(txt),txt:txt.slice(0,300).replace(/\n+/g,' | '),last:KG82.last,hudOver:KG82.over||0}});
  let after=null;if(ok){await p.evaluate(()=>document.getElementById('kg82ok').click());await p.waitForTimeout(400);after=await p.evaluate(([k])=>({lv:S.vir[k],p:S.virp[k],log:(S.log||[]).slice(-1)[0],ov:document.getElementById('ov').hidden}),[k])}
  const pass=ok&&(!info.last||info.last.skipped||info.last.raw>=3)&&!info.over&&!info.ell&&!info.pct&&!info.hudOver&&after&&(after.lv>before.lv||after.p>before.p)&&after.ov;
  res.push({k,mode,pass:!!pass,raw:info.last&&info.last.raw,gain:info.last&&info.last.gain,over:info.over,ell:info.ell,pct:info.pct,hudOver:info.hudOver,after:after&&{lv:after.lv,p:after.p,log:String(after.log&&after.log.t||after.log).slice(0,90)},ms:Date.now()-t0});
  }catch(e){let st=null;try{st=await p.evaluate(()=>({kg82:!!document.getElementById('kg82'),go:!!document.getElementById('kg82go'),busy:TDS.busy,phase:KG82.phase,ovh:document.getElementById('ov')&&document.getElementById('ov').hidden,q:Q.length,mg:!!S.mg,html:(document.getElementById('ov')||{innerHTML:''}).innerHTML.slice(0,150)}))}catch(x){st='eval failed '+x.message.slice(0,60)}res.push({k,mode,pass:false,err:String(e.message).slice(0,80),st})}await p.evaluate(()=>{try{if(document.getElementById('kg82'))kg82Close();TDS.busy=false}catch(e){}})}}
 console.log(JSON.stringify(res,null,1));console.log('page errors:',errs.length?errs.slice(0,5):'none');
 const fail=res.some(r=>!r.pass)||errs.length;await b.close();srv.close();process.exit(fail?1:0)})();
