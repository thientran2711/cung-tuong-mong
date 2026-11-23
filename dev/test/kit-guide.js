/* kit-guide (kit keeper review of mg-5s-clear, 21/11) — node dev/test/kit-guide.js [dev/index.html]
   kg82Guide (KIT §13.7.2): the ONE guiding-line pill. Tone WORDS «wait» / «go» / «bad» resolve to kit tokens (--k-lab / --good / --bad), a ready colour still works, the ground is the kit card token, the type shrinks to fit maxW
   (never below 10 px), no engine types a colour: the source of every kg82Guide call carries no hex literal. Fold 755x1000 + iPad 1180x820. */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const p=await (await b.newContext({viewport:{width:W,height:H}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kg82Guide==='function'&&typeof kg82Col==='function');await p.waitForTimeout(1500);
  const R=await p.evaluate(()=>{const o={};const mk=()=>{const c=document.createElement('canvas');c.width=520;c.height=60;return c};
   const rimAt=(t,tone,sz,maxW)=>{const c=mk(),g=c.getContext('2d');kg82Guide(g,t,260,30,tone,sz||14,maxW||504);/* the pill's rim: scan the middle row from the left for the first opaque non-ground pixel */const d=g.getImageData(0,30,520,1).data;let first=-1;for(let x=0;x<520;x++)if(d[x*4+3]>200){first=x;break}return{first,rgb:first<0?null:[d[first*4],d[first*4+1],d[first*4+2]],c}};
   const hex=s=>{const x=document.createElement('canvas').getContext('2d');x.fillStyle=s;x.fillRect(0,0,1,1);const d=x.getImageData(0,0,1,1).data;return[d[0],d[1],d[2]]};
   const near=(a,b)=>a&&b&&Math.abs(a[0]-b[0])+Math.abs(a[1]-b[1])+Math.abs(a[2]-b[2])<90;
   const tok={wait:hex(kg82Col('--k-lab','#6b4a1c')),go:hex(kg82Col('--good','#2d7a52')),bad:hex(kg82Col('--bad','#c23b22'))};
   o.tones={};for(const k of ['wait','go','bad']){const r=rimAt('Chạm ngay!',k);o.tones[k]={rgb:r.rgb,tok:tok[k],near:near(r.rgb,tok[k])}}
   o.distinct=new Set(['wait','go','bad'].map(k=>String(o.tones[k].rgb))).size===3;
   const rc=rimAt('Chạm ngay!','#ff00ff');o.raw=near(rc.rgb,[255,0,255]);
   /* fit: a long line in a narrow maxW shrinks (never overflows the canvas), still drawn */
   const long='Chờ mũi ngắm vào giữa hồng tâm, rồi chạm';const c=mk(),g=c.getContext('2d');kg82Guide(g,long,260,30,'wait',14,200);const d=g.getImageData(0,0,520,60).data;let minx=520,maxx=0;for(let y=0;y<60;y++)for(let x=0;x<520;x++)if(d[(y*520+x)*4+3]>40){if(x<minx)minx=x;if(x>maxx)maxx=x}
   o.fit={w:maxx-minx,inCanvas:minx>=0&&maxx<520};return o});
  ok(['wait','go','bad'].every(k=>R.tones[k].near),`${tag} tone words resolve to the kit tokens (--k-lab / --good / --bad)`,R.tones);ok(R.distinct,`${tag} the three tones look different`);ok(R.raw,`${tag} a ready colour string still works`);
  ok(R.fit.inCanvas&&R.fit.w<=230,`${tag} a long line shrinks to fit maxW (${R.fit.w}px ≤ 230)`,R.fit);
  ok(errs.length===0,`${tag} no page errors`,errs.slice(0,2));await p.context().close()}
 /* source rule: no hex literal in a kg82Guide call (engines pass a tone word / token) */
 const src=fs.readdirSync(path.resolve(__dirname,'../build')).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js').map(f=>[f,fs.readFileSync(path.resolve(__dirname,'../build',f),'utf8')]);
 const bad=[];for(const [f,t] of src)t.split('\n').forEach((l,i)=>{if(/kg82Guide\(/.test(l)&&!/function kg82Guide/.test(l)&&/["']#[0-9a-fA-F]{3,8}["']/.test(l))bad.push(f+':'+(i+1))});
 ok(bad.length===0,'no engine types a colour in a kg82Guide call',bad);
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`PASS ${res.length}`);process.exit(f?1:0)})();
