/* ONE NAME CORE (jname.js / jnamefix.js) — CI check, owner rule 16/11 ~20:20Z "mỗi người một cái tên".
   usage: node dev/test/names-unique.js [years=60] [lives=6]   (GAME=path to dev/index.html; default dev/index.html)
   Plays `lives` new lives for `years` in-game years each (direct sim: endTurn with dialogs cleared, she is kept alive) on rotating origins,
   and at every month end checks every person of the save (nmPeople + storyline texts):
     dupFull  = two people with the same full name (title stripped), living or dead;
     banned   = a name with an excluded (Vietnamese-style) surname / given name (nmBad);
     regMiss  = a held name missing from the registry S.nmReg;
   plus a stress pass of nmNew (2000 names per kind on one save) and an old-save migration case (duplicates + Vietnamese names planted,
   references in texts). Exit 1 on any failure. Prints 10 sample names per role. */
const {chromium}=require('playwright');const path=require('path');
const YEARS=+process.argv[2]||60,LIVES=+process.argv[3]||6;const GAME=process.env.GAME||path.join(__dirname,'..','index.html');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1180,height:820}})).newPage();p.setDefaultTimeout(3600000);
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route(u=>!/^file:/.test(String(u)),r=>r.abort());await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await p.goto('file://'+GAME,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof nmNew==='function',null,{timeout:120000});await p.waitForTimeout(500);
 const res=await p.evaluate(([YEARS,LIVES])=>{const out={lives:[],fail:[],samples:{},stress:{},mig:{}};
  const kl=document.getElementById('kload');if(kl)kl.remove();
  const check=(tag)=>{const L=nmPeople();const seen=new Map();const f=[];
   for(const e of L){const b=nmBare(e.o[e.f]);if(seen.has(b)&&seen.get(b)!==e.o)f.push('dupFull '+b);seen.set(b,e.o);const bad=nmBad(b);if(bad&&!(e.me))f.push('banned '+bad+' '+b);if(S.nmReg&&!S.nmReg[b]&&!e.me)f.push('regMiss '+b)}
   try{for(const k of ['guard','stu'])if(S.st&&S.st[k]){const b=nmBare(S.st[k]);if(nmBad(b))f.push('banned '+b)}}catch(e){}
   if(f.length)out.fail.push(tag+': '+f.slice(0,5).join(' | '));return L.length};
  const ORI=ORIGINS.map(o=>o.k);
  for(let life=0;life<LIVES;life++){try{localStorage.clear()}catch(e){}SLOT=5;window.__forceOrigin=ORI[life%ORI.length];document.getElementById('title').hidden=true;
   try{start()}catch(e){out.fail.push('start '+e.message)}Q.length=0;render=()=>{};showModal=()=>{};
   let months=0,maxPeople=0,regMax=0;const t0=Date.now();
   for(let m=0;m<YEARS*12;m++){for(let t=0;t<3;t++){Q.length=0;S.mg=null;S.dead=0;S.suc=100;S.buoi=0;used=0;try{endTurn()}catch(e){if(!out.err)out.err=e.message+' '+(e.stack||'').split('\n')[1]}}
    months++;/* more people than a quiet life makes: a new consort and a child every year, servants refilled */
    if(m%12===6){try{if(typeof roomFor!=='function'||roomFor('consort')){const n=newRival(R(3));rivals.push(n)}}catch(e){}try{const v=liveRivals(false)[0];if(v){v.kids=v.kids||[];v.kids.push(mkKid(R(2)?'m':'f',0))}}catch(e){}
     try{for(const p of [S].concat(liveRivals(true)))if(p.staff)fillStaff(p,true)}catch(e){}
     /* some of them die: dead people keep their names in the registry */try{const v=liveRivals(false)[1];if(v&&R(3)===0){v.alive=false}}catch(e){}}
    if(m%6===5){maxPeople=Math.max(maxPeople,check('life'+life+' m'+m))}if(Date.now()-t0>900000)break}
   regMax=Object.keys(S.nmReg||{}).length;out.lives.push({origin:S.origin&&S.origin.k,months,people:maxPeople,registry:regMax,ms:Date.now()-t0})}
  /* stress: 2000 names per kind on one save */
  for(const k of ['f','m','maid','eun','eunE','doc','prince','princess','mo']){const s=new Set();let dup=0,bad=0;for(let i=0;i<(k==='mo'?60:k==='prince'||k==='princess'?200:2000);i++){const n=nmNew(k);if(s.has(n)||S.nmReg[n]!==k&&false)dup++;if(nmBad(n))bad++;s.add(n)}
   out.stress[k]={made:s.size,dup,bad}}
  /* 10 sample names per role for the owner (fresh save) */
  try{localStorage.clear()}catch(e){}start();Q.length=0;
  for(const [r,k,pre] of [['Phi tần / quý nữ','f',''],['Quan / nam nhân','m',''],['Cung nữ','maid',''],['Thái giám nhỏ','eun',''],['Thái giám lớn','eunE','Tổng quản '],['Thái y','doc','Thái y '],['Hoàng tử','prince','Hoàng tử '],['Công chúa','princess','Công chúa '],['Mẫu thân','mo','']])
   out.samples[r]=(()=>{const A=[];for(let i=0;i<10;i++)A.push(nmNew(k,{more:A}));return A.map(x=>pre+x)})();/* the 10 are held together, as in a real palace */
  /* old-save migration: plant duplicates + Vietnamese-style names with references, round-trip through ser/deser */
  try{start();Q.length=0;const v=rivals[0],w=rivals[1];const me=S.name;
   v.name='Nguyễn Thị Lan';w.name='Trần Uyển Nhi';if(rivals[2])rivals[2].name=me;S.maid.name='Bích Ngọc';
   (S.staff||[]).forEach((s,i)=>{if(i<2)s.name='Tiểu Phúc Tử'});
   S.nmTest={log:['Nguyễn Thị Lan tặng trâm cho '+me,'Bích Ngọc dâng trà','Trần Uyển Nhi và Nguyễn Thị Lan cãi nhau']};delete S.nmReg;delete S.nmV;
   const d=JSON.parse(JSON.stringify(ser()));deser(d);
   const L=nmPeople();const names=L.map(e=>nmBare(e.o[e.f]));const dups=names.filter((x,i)=>names.indexOf(x)!==i);
   out.mig={me:S.name===me,meKept:S.name,v:rivals[0].name,w:rivals[1].name,r2:rivals[2]&&rivals[2].name,maid:S.maid.name,staff:(S.staff||[]).slice(0,2).map(s=>s.name),log:S.nmTest.log,dups,
    banned:names.filter(n=>nmBad(n)),renamed:NM_FIX.renamed.slice(-8).map(x=>x.old+' -> '+x.neu+' ('+x.why+', refs '+x.refs+')')};
   if(!out.mig.me||dups.length||out.mig.banned.length||/Nguyễn|Trần|Bích Ngọc/.test(out.mig.log.join(' ')))out.fail.push('migration '+JSON.stringify(out.mig).slice(0,400))}catch(e){out.fail.push('migration error '+e.message)}
  /* old eunuchs: j25 ageInit turns "Tiểu X Tử" into "Lão X Tử" at 45 on every load; the sweep must not rename them back and forth */
  try{start();Q.length=0;for(let t=0;t<6;t++){Q.length=0;S.mg=null;S.dead=0;S.suc=100;S.buoi=0;used=0;try{endTurn()}catch(e){}}try{for(const q of [S].concat(liveRivals(true)))if(q.staff)fillStaff(q,true)}catch(e){}
   S.staff=S.staff||[];for(let i=0;i<4;i++)S.staff.push(mkServ('eunuch'));
   const E=()=>allServ().filter(s=>s.role!=='maid');if(E().length<3)out.fail.push('lao test: only '+E().length+' eunuchs');E().forEach(s=>{s.age=50});const d0=JSON.parse(JSON.stringify(ser()));deser(d0);
   const n1=E().map(s=>s.name).join('|');for(let i=0;i<3;i++){deser(JSON.parse(JSON.stringify(ser())));nmFix('month')}const n2=E().map(s=>s.name).join('|');
   out.lao={n1:n1.slice(0,200),stable:n1===n2,lao:E().filter(s=>/^Lão /.test(s.name)).length};if(n1!==n2)out.fail.push('Lão eunuch names change between loads: '+n1.slice(0,120)+' => '+n2.slice(0,120))}catch(e){out.fail.push('lao error '+e.message)}
  out.sweep=NM_FIX.renamed.filter(x=>x.at!=='load').map(x=>x.at+': '+x.old+' -> '+x.neu+' ('+x.why+')').slice(0,30);return out},[YEARS,LIVES]);
 res.pageerrors=errs.slice(0,5);console.log(JSON.stringify(res,null,1));
 const yrs=res.lives.reduce((s,l)=>s+l.months,0)/12;console.log('simulated years',yrs.toFixed(1),'lives',res.lives.length,'failures',res.fail.length);
 const sbad=Object.values(res.stress).some(x=>x.dup||x.bad);await b.close();process.exit(res.fail.length||sbad||errs.length?1:0)})();
