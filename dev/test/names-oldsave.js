/* old-save migration of the one name core: a save played on the OLD build (before jname.js) for `years` years, loaded into the NEW build.
   Checks after load: the player's own name is unchanged; zero duplicate full names; zero excluded (Vietnamese-style) names; every person in
   the registry; a turn passes; old texts no longer print a renamed person's old name (unless another person still holds it).
   usage: node dev/test/names-oldsave.js <old dev/index.html> <new dev/index.html> [years=15] [lives=3] */
const {chromium}=require('playwright');const path=require('path');
const [,,OLD,NEW,Y,L]=process.argv;const YEARS=+Y||15,LIVES=+L||3;
async function open(b,f){const p=await b.newPage();p.setDefaultTimeout(1800000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.route(u=>!/^file:/.test(String(u)),r=>r.abort());await p.goto('file://'+path.resolve(f),{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true});return{p,errs}}
(async()=>{const b=await chromium.launch();const o=await open(b,OLD),n=await open(b,NEW);const out=[];let fail=0;
 for(let life=0;life<LIVES;life++){
  const d=await o.p.evaluate(([YEARS,life])=>{localStorage.clear();SLOT=5;window.__forceOrigin=ORIGINS[life%ORIGINS.length].k;start();Q.length=0;render=()=>{};showModal=()=>{};
   for(let m=0;m<YEARS*12;m++){for(let t=0;t<3;t++){Q.length=0;S.mg=null;S.dead=0;S.suc=100;S.buoi=0;used=0;try{endTurn()}catch(e){}}
    if(m%12===6){try{rivals.push(newRival(R(3)))}catch(e){}try{const v=liveRivals(false)[0];if(v){v.kids=v.kids||[];v.kids.push(mkKid(R(2)?'m':'f',0))}}catch(e){}try{for(const q of [S].concat(liveRivals(true)))if(q.staff)fillStaff(q,true)}catch(e){}}}
   return JSON.stringify(ser())},[YEARS,life]);
  const r=await n.p.evaluate(d=>{const D=JSON.parse(d);const me=D.S.name;render=()=>{};showModal=()=>{};const n0=NM_FIX.renamed.length;deser(D);
   const L=nmPeople();const names=L.map(e=>nmBare(e.o[e.f]));const dups=[...new Set(names.filter((x,i)=>names.indexOf(x)!==i))];const banned=names.filter((x,i)=>!L[i].me&&nmBad(x));
   const miss=names.filter((x,i)=>!L[i].me&&!(S.nmReg||{})[x]);const ren=NM_FIX.renamed.slice(n0);
   const txt=JSON.stringify(S);const where=(o,t,pth,seen,acc)=>{if(!o||typeof o!=='object'||seen.has(o)||acc.length>3)return;seen.add(o);for(const k in o){const v=o[k];if(k.includes(t))acc.push(pth+'.[key]'+k);if(typeof v==='string'&&v.includes(t))acc.push(pth+'.'+k+': '+v.slice(Math.max(0,v.indexOf(t)-30),v.indexOf(t)+t.length+10));else if(v&&typeof v==='object')where(v,t,pth+'.'+k,seen,acc)}};
   const stale=ren.filter(x=>x.why!=='dup'&&x.refs>0&&!names.includes(nmBare(x.old))&&new RegExp('(?<![\\p{L}\\p{N}])'+nmEsc(nmBare(x.old))+'(?![\\p{L}\\p{N}])','u').test(txt)).map(x=>{const acc=[];where(S,nmBare(x.old),'S',new Set(),acc);return x.old+' @ '+acc.join(' | ')});
   let turn=true;try{Q.length=0;S.mg=null;endTurn()}catch(e){turn=e.message}
   return{me:S.name===me,people:L.length,renamed:ren.length,byWhy:ren.reduce((a,x)=>(a[x.why]=(a[x.why]||0)+1,a),{}),refs:ren.reduce((s,x)=>s+x.refs,0),
    dups,banned,miss:miss.length,stale,turn,ex:ren.slice(0,6).map(x=>x.old+' -> '+x.neu+' ('+x.why+')')}},d);
  out.push(r);if(!r.me||r.dups.length||r.banned.length||r.miss||r.stale.length||r.turn!==true)fail++}
 console.log(JSON.stringify({lives:out,errsOld:o.errs.length,errsNew:n.errs.slice(0,5)},null,1));console.log(fail||n.errs.length?'FAIL':'PASS');await b.close();process.exit(fail||n.errs.length?1:0)})();
