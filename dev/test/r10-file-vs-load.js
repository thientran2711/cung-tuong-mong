/* robot-fix-cnv family 1 scan: the FILE vs the game right after she loads it (Sổ 1 → «Tiếp tục kiếp này», then render).
   r10-rt.js compares load 1 with load 2 (a load must be idempotent); this one compares the save on disk with the first load, the way the robot's
   in-place roundTrip does (ser → deser → ser). Every differing path is listed, grouped by path family (numbers → N).
   usage: node dev/test/r10-file-vs-load.js [--inplace] <save.json> [...]   --inplace: deser on the running bot game (robot roundTrip, no title, no render) */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs');
const args=process.argv.slice(2);const INPLACE=args.includes('--inplace');const files=args.filter(a=>!a.startsWith('--'));let bad=0;const fam={};
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});
 for(const f of files){const txt=fs.readFileSync(f,'utf8');
  const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});await serve(ctx);
  await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
  await ctx.addInitScript(t=>{try{localStorage.setItem('hclh-save-v2-1',t)}catch(e){}},txt);
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof deser==='function'&&typeof ser==='function'&&document.querySelector('#modal.kpthome'),null,{timeout:90000});
  const r=await p.evaluate(([t,inplace])=>{const VOL=['at'];const clean=d=>{VOL.forEach(k=>delete d[k]);return d};
   const out=[];const diff=(a,b,p)=>{if(out.length>4000)return;if(a===undefined)return;if(JSON.stringify(a)===JSON.stringify(b))return;
    if(a&&b&&typeof a==='object'&&typeof b==='object'){new Set(Object.keys(a).concat(Object.keys(b))).forEach(k=>diff(a[k],b[k],p+'.'+k));return}
    out.push(p+': '+String(JSON.stringify(a)).slice(0,100)+' → '+String(JSON.stringify(b)).slice(0,100))};
   let file=JSON.parse(t);
   if(inplace){$("title").hidden=false;showTitle();const bt=document.querySelector('#slots [data-load="1"]');if(bt)bt.click();
    file=JSON.parse(JSON.stringify(clean(ser())));quiet=true;deser(JSON.parse(JSON.stringify(file)));quiet=false}
   else{$("title").hidden=false;showTitle();const bt=document.querySelector('#slots [data-load="1"]');if(bt)bt.click();try{render()}catch(e){}}
   diff(clean(file),JSON.parse(JSON.stringify(clean(ser()))),'save');return {name:S&&S.name,diffs:out}},[txt,INPLACE]);
  console.log((r.diffs.length?'DIFF':'ok  ')+' '+f.split('/').pop()+' '+r.name+' paths '+r.diffs.length);r.diffs.slice(0,40).forEach(d=>console.log('   '+d));
  r.diffs.forEach(d=>{const k=d.split(':')[0].replace(/\.\d+/g,'.N');fam[k]=(fam[k]||0)+1});
  if(errs.length)console.log('   page errors: '+errs.slice(0,5).join(' | '));if(r.diffs.length)bad++;await ctx.close()}
 console.log('FAMILIES '+JSON.stringify(Object.entries(fam).sort((a,b)=>b[1]-a[1])));
 await b.close();process.exit(bad?1:0)})();
