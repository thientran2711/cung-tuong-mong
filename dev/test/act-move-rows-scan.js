/* ACT-MOVE rows scan (ACT-MOVE-5; MAIN 171 LOOK FAIL cadf0346 «kit rows glued»; owner 27/11 04:33Z/04:39Z every card = kit rows). Whole moved-act family (law 11):
   every bridged option (talk option amb:1 = an old card button moved onto the person's stage pop-up) of every person met on stage, scen cao / con / hh × buổi 0–2 × every place.
   Its text x (and the option line optLine renders from it: one «tốn» row, no label nested in a value) must be the RAW kit string the card itself parses (odds word · tốn: … · thành: … · hỏng: … · kèm: …), never tag-stripped rendered rows:
   GLUED = a label stuck to the word before it  /[a-zà-ỹ0-9)](Tốn|Được|Thành|Bại|Hỏng|Ghi chú|Kèm|Cần)/  in x with tags turned into spaces.
   Prints a before (AMV.noRaw = the old tag-strip path) / after table per family. usage: node dev/test/act-move-rows-scan.js [index.html] → exit 1 when after > 0 */
const fs=require('fs'),path=require('path');const ROOT=path.resolve(__dirname,'../..');const {chromium}=require('playwright');
const src=fs.readFileSync(path.join(ROOT,'dev/test/act-audit.js'),'utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const URL='file://'+path.resolve(process.argv[2]||path.join(ROOT,'dev/index.html'));
const RUN=String.raw`((sc,noRaw)=>{window.__bot=1;AMV.noRaw=noRaw;const R={n:0,glued:0,per:{},ex:[]};const dv=document.createElement('div');
 const G=/[a-zà-ỹ0-9)](Tốn|Được|Thành|Bại|Hỏng|Ghi chú|Kèm|Cần)/;
 AA.scen(sc);if(sc==="hh"){const v=rivals.find(x=>x.alive&&!x.queen&&!sameHouse(S,x));if(v)v.out=1;S.rank=Math.max(S.rank,7)}try{S.kids.push(mkKid('m',5),mkKid('f',2))}catch(e){}
 const go=k=>{Q.splice(0);used=0;S.confined=0;popIdx=null;window.__j77etq=1;window.__accStay=1;window.__walkFree=1;try{goTo(k)}finally{window.__j77etq=0;window.__accStay=0;window.__walkFree=0}return S.place===k};
 const seen=new Set();const ks=["home"].concat(places().map(x=>x.k));
 for(const bu of [0,1,2]){S.buoi=bu;for(const k of ks){if(!go(k))continue;for(const p of curPeople()){let A=[];try{A=talkOpts(p)}catch(e){}
  /* the Dư đồ focus view's small line of a bridged act (jdf dfActs → «odds word · Tốn …»): never «0 khắc», never a signed cost */
  if(!noRaw){let D=[];try{D=dfActs(curPeople().indexOf(p))||[]}catch(e){}for(const g of D)for(const a of g.acts||[]){const m=/data-o="(\d+)"/.exec(a.info||"");const o=m&&A[+m[1]];if(!o||!o.amb)continue;
   if(/(^|·\s*)0 khắc|[-−]\s?\d/.test(a.ton||"")){R.glued++;if(R.ex.length<6)R.ex.push(p.kind+" · "+a.n+" focus Tốn «"+a.ton+"»")}}}
  for(const a of A){if(!a||!a.amb)continue;const key=p.kind+"|"+a.n;if(seen.has(key))continue;seen.add(key);R.n++;const fam=p.kind+" · "+a.n;
   const t=String(a.x||"").replace(/<[^>]+>/g," ");let g=G.test(t);
   /* the option line the pop-up really shows (optLine → kit rows): one «tốn» row at most, no «tốn: / thành: / hỏng:» text nested inside a row value */
   if(!noRaw){try{dv.innerHTML=optLine(a);const L=[...dv.querySelectorAll('.kl')].map(e=>e.textContent.trim().toLowerCase());const c=dv.cloneNode(true);c.querySelectorAll('.kl').forEach(e=>e.remove());if(L.filter(l=>l==='tốn').length>1||/(tốn|thành|hỏng|kèm):/i.test(c.textContent))g=true}catch(e){g=true}}if(g){R.glued++;if(R.ex.length<6)R.ex.push(fam+" = «"+t.replace(/\s+/g," ").slice(0,90)+"»")}
   const P=R.per[p.kind]||(R.per[p.kind]={n:0,g:0});P.n++;if(g)P.g++}}}}
 AMV.noRaw=0;return R})`;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'})).newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);await p.evaluate(LIB);
 const T={before:{n:0,g:0,per:{}},after:{n:0,g:0,per:{}}};const ex={before:[],after:[]};
 for(const sc of ['cao','con','hh'])for(const [col,nr] of [['before',1],['after',0]]){const R=await p.evaluate(RUN+'('+JSON.stringify(sc)+','+nr+')');T[col].n+=R.n;T[col].g+=R.glued;ex[col]=ex[col].concat(R.ex);
  for(const k in R.per){const q=T[col].per[k]||(T[col].per[k]={n:0,g:0});q.n+=R.per[k].n;q.g+=R.per[k].g}}
 await b.close();console.log('kind        | before glued/options | after glued/options');
 for(const k of new Set([...Object.keys(T.before.per),...Object.keys(T.after.per)])){const a=T.before.per[k]||{n:0,g:0},c=T.after.per[k]||{n:0,g:0};console.log(`${k.padEnd(11)} | ${a.g}/${a.n} | ${c.g}/${c.n}`)}
 console.log(`TOTAL       | ${T.before.g}/${T.before.n} | ${T.after.g}/${T.after.n}`);console.log('before e.g.');ex.before.slice(0,5).forEach(e=>console.log('  '+e));if(ex.after.length){console.log('after (FAIL):');ex.after.forEach(e=>console.log('  '+e))}
 console.log('page errors',perr.length,perr.slice(0,3).join(' | '));if(T.after.g||perr.length){console.log('FAIL');process.exit(1)}console.log('PASS')})();
