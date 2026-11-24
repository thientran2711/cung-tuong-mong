/* robot10 nc-fix (row «save→load→save changes the state»): load a repro save the way she does (Sổ 1 → «Tiếp tục kiếp này»),
   then ser → deser → ser like the robot's roundTrip, and list EVERY path that differs (not only the first).
   A real load draws the game right away (render: the stage arranges who stands in her room, S.visit), so the round trip renders after deser too.
   Load-time repairs BY DESIGN (counted apart, not a fail): the item census gives ledger ids to pieces issued since the last weekly census (jil:
   S.il.at is not saved → .iu / il.seq), the one-time face-keep flag (fcKeep), the day roster of who-is-where (S.roster: j95c re-syncs it at load; labels only). Round 2 (load the reloaded save again) must change nothing at all.
   usage: node dev/test/r10-rt.js <save.json> [more.json ...]   exit 1 when a save changes on the round trip (besides the repairs above) */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs');
const files=process.argv.slice(2);let bad=0;
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});
 for(const f of files){const txt=fs.readFileSync(f,'utf8');
  const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});await serve(ctx);
  await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
  await ctx.addInitScript(t=>{try{localStorage.setItem('hclh-save-v2-1',t)}catch(e){}},txt);
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof deser==='function'&&typeof ser==='function'&&document.querySelector('#modal.kpthome'),null,{timeout:90000});
  const r=await p.evaluate(()=>{$("title").hidden=false;showTitle();const bt=document.querySelector('#slots [data-load="1"]');if(bt)bt.click();
   const VOL=['at'];const one=()=>{const d=ser();VOL.forEach(k=>delete d[k]);return JSON.stringify(d)};
   const out=[];const diff=(a,b,p)=>{if(out.length>4000)return;if(JSON.stringify(a)===JSON.stringify(b))return;
    if(a&&b&&typeof a==='object'&&typeof b==='object'){new Set(Object.keys(a).concat(Object.keys(b))).forEach(k=>diff(a[k],b[k],p+'.'+k));return}
    out.push(p+': '+String(JSON.stringify(a)).slice(0,90)+' → '+String(JSON.stringify(b)).slice(0,90))};
   const s1=one();quiet=true;deser(JSON.parse(s1));quiet=false;try{render()}catch(e){}const s2=one();diff(JSON.parse(s1),JSON.parse(s2),'save');
   /* second round: a load must be idempotent (load-time repairs such as the item census or the name registry may act once, never again) */
   const n1=out.length;quiet=true;deser(JSON.parse(s2));quiet=false;try{render()}catch(e){}const s3=one();diff(JSON.parse(s2),JSON.parse(s3),'save2');
   return {loaded:!!(S&&S.name),name:S&&S.name,diffs:out,n1}});
  const REP=/^save\.(S|R\.\d+)\.inv\.\d+\.iu:|^save\.S\.il\.seq:|\.fcKeep:|^save\.S\.roster\./;const rep=r.diffs.slice(0,r.n1).filter(d=>REP.test(d));r.diffs=r.diffs.filter(d=>!rep.includes(d));r.n1-=rep.length;
  console.log((r.diffs.length?'FAIL':'ok  ')+' '+f.split('/').pop()+' '+r.name+' diffs round1 '+r.n1+' · round2 '+(r.diffs.length-r.n1)+' · load-time repairs (by design) '+rep.length);r.diffs.forEach(d=>console.log('   '+d));
  if(errs.length)console.log('   page errors: '+errs.slice(0,5).join(' | '));
  if(r.diffs.length||!r.loaded)bad++;await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
