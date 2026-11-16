/* SWEEP: every item id has a real picture on the CDN and the reveal shows the SAME grade as the Tư trang bag (owner 11/15 17:02Z:
   letter "Á","T" instead of a picture; ribbon "Thường" on a Tinh phẩm item). review/game-feel.
   usage: node dev/test/sw-serve.js 8955 <repo root>  (another shell);  node dev/test/item-pics.js http://localhost:8955/ <outdir>
   Keys: every IT key (items, fabrics, veils), every WD_ITEMS key (garments, hairpins), every handmade-work kind × tier 1..4.
   For each: kitItemInfo(entry) (KIT §54.1, used by kitGain / kitReward / kitLose) → src (256) + src512; checked against the CDN img/_index.json.
   Also: kitItemInfo grade/src == the bag's own entry (kinvItems) for that item. Writes <outdir>/item-pics.json; exit 1 on a mismatch;
   missing pictures are LISTED (art work for act-pics2), not a test failure of the code. Static: no letter placeholder left in dev/build. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');const [,,BASE,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const B=path.join(__dirname,'..','build');const F=[];
 for(const f of fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f))){const t=fs.readFileSync(path.join(B,f),'utf8');if(/\(x\.n\|\|"\?"\)\[0\]|kmini0/.test(t))F.push(`${f}: letter placeholder markup`)}
 const b=await chromium.launch();const c=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitItemInfo,null,{timeout:180000});
 await p.waitForFunction(()=>!document.getElementById('kload')||(window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)),null,{timeout:240000}).catch(()=>{});
 const R=await p.evaluate(async()=>{document.querySelectorAll('#kload').forEach(e=>e.remove());SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}
  const base=(typeof IMG_BASE==="string"&&IMG_BASE)||"";const rel=s=>String(s||"").replace(base,"").replace(/^\.\//,"");const L=[];
  const bagOf=e=>{const keep=S.inv;S.inv=[e];try{const x=kinvItems().find(y=>y&&y.g&&(y.g.k===e.k||y.g.e===e));return x?{grade:x.grade|0,src:rel(x.src),name:x.name}:null}catch(err){return{err:err.message}}finally{S.inv=keep}};
  for(const k of Object.keys(IT)){if(IT[k].tp||k==="tp")continue;const e={k};const I=kitItemInfo(e);const pr=IT[k].pr||0;L.push({k,set:"IT",kd:IT[k].kd||"",oldTier:pr>=150?3:pr>=80?2:pr>=40?1:0,name:I.name,grade:I.grade,gname:I.gname,src:rel(I.src),src512:rel(I.src512),bag:bagOf(e)})}
  for(const k of Object.keys(typeof WD_ITEMS==="object"?WD_ITEMS:{})){if(IT[k])continue;const e={k};const I=kitItemInfo(e);L.push({k,set:"WD",kd:WD_ITEMS[k].sl,name:I.name,grade:I.grade,gname:I.gname,src:rel(I.src),src512:rel(I.src512),bag:bagOf(e)})}
  const kinds=typeof ITEM_ART_TP!=="undefined"?ITEM_ART_TP:[];for(const kind of kinds)for(let ti=0;ti<4;ti++){const ik=Object.keys(IT).find(k=>IT[k].tp)||"tp";const e={k:ik,wk:{kind,ti,n:"thử"}};const I=kitItemInfo(e);L.push({k:`tp-${kind}-b${ti+1}`,set:"WORK",name:I.name,grade:I.grade,gname:I.gname,src:rel(I.src),src512:rel(I.src512),bag:null})}
  return{L,base}});
 const IMG=R.base||'https://ctm-img.victoria-tntt.workers.dev/';const idx=await (await fetch(IMG+'img/_index.json',{headers:{'Cache-Control':'no-cache'}})).json();const have=new Set(idx.files.map(f=>f[0]));
 const miss=[],miss512=[],gradeBad=[];
 for(const x of R.L){if(!x.src||!have.has(x.src))miss.push(x);else if(x.src512&&x.src512!==x.src&&!have.has(x.src512))miss512.push(x);
  if(x.bag&&!x.bag.err&&(x.bag.grade!==x.grade||(x.bag.src&&x.bag.src!==x.src)))gradeBad.push(`${x.k}: reveal ${x.gname}/${x.src} ≠ bag ${x.bag.grade}/${x.bag.src}`)}
 for(const g of gradeBad)F.push('grade/picture ≠ bag: '+g);if(errs.length)F.push('page errors: '+errs.join(' | '));
 fs.writeFileSync(OUT+'/item-pics.json',JSON.stringify({miss,miss512,gradeBad,count:R.L.length,all:R.L},null,1));
 const sets={};for(const x of R.L)sets[x.set]=(sets[x.set]||0)+1;
 const oldBad=R.L.filter(x=>x.oldTier!=null&&x.oldTier!==x.grade).length;console.log('old j93 price-tier ribbon ≠ real grade (before this branch):',oldBad,'of',R.L.filter(x=>x.oldTier!=null).length);
 console.log('ids checked',R.L.length,JSON.stringify(sets),'| no picture on CDN',miss.length,'| 512 missing (256 used)',miss512.length,'| grade ≠ bag',gradeBad.length);
 for(const x of miss)console.log('MISSING',x.set,x.k,'«'+x.name+'»',x.gname,x.src||'(no src)');
 console.log(F.length?'FAIL\n'+F.join('\n'):'PASS');await b.close();process.exit(F.length?1:0)})();
