/* names audit (before/after table for review/names-unique): plays `lives` x `years` on a build and counts, over every person the
   save holds (nmPeople of jname.js; injected when the build has no name core = the build before it):
   people seen, distinct full names, duplicate full names (two people, same name, living or dead), given-name clashes among the living
   ("Uyển Nhi" beside "Thẩm Uyển Nhi"), names with an excluded Vietnamese-style surname / given name.
   usage: node dev/test/names-audit.js <path to dev/index.html> [years=20] [lives=4]   prints one JSON line */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const [,,GAME,Y,L]=process.argv;const YEARS=+Y||20,LIVES=+L||4;
(async()=>{const b=await chromium.launch();const p=await b.newPage();p.setDefaultTimeout(3600000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.route(u=>!/^file:/.test(String(u)),r=>r.abort());await p.goto('file://'+path.resolve(GAME),{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function',null,{timeout:120000});await p.waitForTimeout(500);
 const core=await p.evaluate(()=>typeof nmPeople==='function');
 if(!core){const src=fs.readFileSync(path.join(__dirname,'..','build','jname.js'),'utf8').replace(/^const /gm,'var ');await p.evaluate(src=>{(0,eval)(src)},src)}
 const r=await p.evaluate(([YEARS,LIVES])=>{const kl=document.getElementById('kload');if(kl)kl.remove();const ORI=ORIGINS.map(o=>o.k);
  const tot={people:0,distinct:0,dupFull:0,dupPeople:0,givenClash:0,banned:0,bannedEx:[],dupEx:[],clashEx:[]};
  for(let life=0;life<LIVES;life++){try{localStorage.clear()}catch(e){}SLOT=5;window.__forceOrigin=ORI[life%ORI.length];document.getElementById('title').hidden=true;start();Q.length=0;render=()=>{};showModal=()=>{};
   const seenAll=new Map();/* object -> name, over the whole life (dead people stay) */
   const snap=()=>{for(const x of seenAll.values())x.alive=false;/* gone from the save = no longer living */for(const e of nmPeople())seenAll.set(e.o,{n:nmBare(e.o[e.f]),alive:nmAlive(e),me:!!e.me})};
   for(let m=0;m<YEARS*12;m++){for(let t=0;t<3;t++){Q.length=0;S.mg=null;S.dead=0;S.suc=100;S.buoi=0;used=0;try{endTurn()}catch(e){}}
    if(m%12===6){try{if(typeof roomFor!=='function'||roomFor('consort')){rivals.push(newRival(R(3)))}}catch(e){}try{const v=liveRivals(false)[0];if(v){v.kids=v.kids||[];v.kids.push(mkKid(R(2)?'m':'f',0))}}catch(e){}
     try{for(const q of [S].concat(liveRivals(true)))if(q.staff)fillStaff(q,true)}catch(e){}try{const v=liveRivals(false)[1];if(v&&R(3)===0)v.alive=false}catch(e){}}
    if(m%3===2)snap()}
   snap();const V=[...seenAll.values()];const cnt=new Map();V.forEach(x=>cnt.set(x.n,(cnt.get(x.n)||0)+1));
   tot.people+=V.length;tot.distinct+=cnt.size;for(const [n,c] of cnt)if(c>1){tot.dupFull++;tot.dupPeople+=c;if(tot.dupEx.length<8)tot.dupEx.push(n+' x'+c)}
   const live=V.filter(x=>x.alive);const vs=new Map();for(const x of live)for(const v of nmVars(x.n))vs.set(v,(vs.get(v)||0)+1);
   for(const x of live)if(nmVars(x.n).slice(1).some(v=>vs.get(v)>1)||(nmVars(x.n).length===1&&[...live].some(y=>y!==x&&nmVars(y.n).slice(1).includes(x.n)))){tot.givenClash++;if(tot.clashEx.length<8)tot.clashEx.push(x.n)}
   for(const x of V)if(!x.me&&nmBad(x.n)){tot.banned++;if(tot.bannedEx.length<10&&!tot.bannedEx.includes(x.n))tot.bannedEx.push(x.n)}}
  return tot},[YEARS,LIVES]);
 r.build=GAME;r.injectedCore=!core;r.years=YEARS*LIVES;r.pageerrors=errs.length;console.log(JSON.stringify(r));await b.close()})();
