/* ONE TRAIT POOL (review/trait-pool): old save from the base build loads in this build with 3 pool nết per person (old nết mapped
   into their groups, the missing ones drawn), new lives draw 3 nết for everyone (female/male pool by sex), deterministic per person,
   first trọng = the Lòng dạ nết's virtue, every table row has gain + cost, and a bot plays some buổi without page errors.
   usage: node dev/test/trait-pool.js <base.html> [this index.html] */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const BASE='file://'+path.resolve(process.argv[2]),NEW='file://'+path.resolve(process.argv[3]||path.join(__dirname,'../index.html'));
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,400):''))};
async function open(b,url,errs){const p=await b.newPage();p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(120000);await p.route(/^https?:/,r=>r.abort());
 await p.goto(url,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function');return p}
(async()=>{const b=await chromium.launch();const e0=[],e1=[];
 /* A: old save made by the base build (old 2-nết consorts, servant-only nết, men's own nết, player P_TR) */
 const p0=await open(b,BASE,e0);
 const old=await p0.evaluate(()=>{SLOT=2;document.getElementById('title').hidden=true;start();Q.length=0;try{menInit()}catch(e){}
  rivals[0].trait="Hiền lành";rivals[0].trait2="Thù dai";rivals[1].trait="Đa nghi";rivals[1].trait2="Tham tiền";
  const st=(S.staff||[]);if(st[0])st[0].tr="trung";if(st[1])st[1].tr="nhat";
  try{traitsOf(S)}catch(e){}return JSON.stringify(ser())});
 /* B: load it in this build */
 const p1=await open(b,NEW,e1);
 const r=await p1.evaluate((raw)=>{SLOT=2;document.getElementById('title').hidden=true;start();Q.length=0;quiet=true;deser(JSON.parse(raw));quiet=false;
  const N=BAL.net,okN=(p)=>{const n=traitsOf(p);const P=N[netSex(p)==="m"?"M":"F"];return n.length===3&&P.tt.includes(n[0])&&P.ld.includes(n[1])&&P.ch.includes(n[2])};
  const ppl=[S].concat(rivals,S.staff||[],S.men||[]);const bad=ppl.filter(p=>!okN(p)).map(p=>p.name);
  const v0=rivals.find(v=>v.trait==="Hiền lành"&&v.trait2==="Thù dai")||rivals[0],v1=rivals.find(v=>v.trait==="Đa nghi")||rivals[1],s0=(S.staff||[])[0],s1=(S.staff||[])[1];
  const men=(S.men||[]).map(m=>[netSex(m),traitsOf(m)]);
  const tr=rivals.map(v=>{const R=N.T[traitsOf(v)[1]];return !R.v||(trongOf(v)[0]===R.v)||(R.ban||[]).includes(R.v)});
  const same=JSON.stringify(traitsOf(v0))===JSON.stringify((()=>{const c=JSON.parse(JSON.stringify(v0));delete c.net;return netDraw(c,netKey(c),"f",netOldOf(c))})());
  return {dbg:rivals.map(v=>[v.id,v.trait,v.trait2,(v.net||[]).join("/")]),raw0:JSON.parse(raw).R.slice(0,3).map(v=>[v.id,v.trait,v.trait2,v.net]),bad,v0:traitsOf(v0),v1:traitsOf(v1),s0:s0&&[s0.role,netSex(s0),traitsOf(s0)],s1:s1&&[s1.role,traitsOf(s1)],men,me:traitsOf(S),trong:tr.every(Boolean),same,
   heads:(()=>{try{return Object.values(trS().H).map(h=>netSex(h))}catch(e){return["err"]}})(),
   coop:(()=>{let bad=0;for(let i=0;i<100;i++){const nm="Thử Danh "+i,own=netDraw({},"me:"+nm,"f",[]).join();
    if(traitsOf({id:"p"+i,coop:true,name:nm,trait:"Khiêm nhường",rank:1}).join()!==own||traitsOf({sid:"p"+i,coop:true,name:nm,role:"maid",tr:"trung"}).join()!==own)bad++}return bad})(),
   saved:JSON.stringify(ser()).includes('"net":['),pers:Object.keys(N.T).every(t=>PERS[t]===N.T[t]),noPTr:S.pTr==null}},old);
 console.log(JSON.stringify(r).slice(0,900));
 ok(!r.bad.length,'every person (her, consorts, servants, men) holds 3 pool nết of the right sex pool',r.bad);
 ok(r.v0[0]==="Ân cần"&&r.v0[1]==="Thù dai",'old Hiền lành + Thù dai → Ân cần (Tính tình) + Thù dai (Lòng dạ), Chí hướng drawn',r.v0);
 ok(r.v1[0]==="Kín đáo"&&r.v1[1]==="Ham lợi",'old Đa nghi + Tham tiền → Kín đáo + Ham lợi',r.v1);
 ok(!r.s0||r.s0[2][1]==="Trọng nghĩa",'old servant trung → Trọng nghĩa',r.s0);
 ok(!r.s1||r.s1[1].includes("Khiêm nhường")||r.s1[1].includes("Xu nịnh"),'old servant nhat → Khiêm nhường (Xu nịnh for a eunuch)',r.s1);
 ok(r.men.every(m=>m[0]==="m"),'men draw from the male pool',r.men.slice(0,3));
 ok(r.trong,'first trọng follows the Lòng dạ nết');ok(r.same,'draw is deterministic per person');ok(r.saved,'the save carries p.net');ok(r.pers,'PERS rows = THE table BAL.net.T');
 ok(r.noPTr,'old S.pTr dropped (her 3 nết come from the pool)');
 ok(r.heads.length&&r.heads.every(x=>x==='m'),'old-save court heads draw from the male pool (r1)',r.heads);ok(r.coop===0,'co-op: the friend on my seat (consort or maid) holds the same 3 nết as on her own seat (r1)',r.coop);
 /* C: a new life: everyone draws 3, table law, distribution, gain+cost */
 const c=await p1.evaluate(()=>{SLOT=3;start();Q.length=0;try{menInit()}catch(e){}const N=BAL.net;const ppl=[S].concat(rivals,S.staff||[],S.men||[]);
  const cnt={};for(const p of ppl)for(const t of traitsOf(p))cnt[t]=(cnt[t]||0)+1;
  const rows=Object.entries(N.T).filter(([t,R])=>!(R.gain&&R.cost&&R.tend&&R.p&&N.T[R.p]&&N.T[R.p].p===t));
  const eun=ppl.filter(p=>netSex(p)==="m"&&p!==S).map(p=>traitsOf(p)[0]);
  return {n:ppl.length,cnt,rows:rows.map(x=>x[0]),eunF:eun.filter(t=>t==="Kiêu ngạo"||t==="Khiêm nhường").length,mal:rivals.map(v=>v.malice)}});
 console.log(JSON.stringify(c).slice(0,700));
 ok(!c.rows.length,'every row has tend + gain + cost + a symmetric pair',c.rows);ok(c.eunF===0,'no female-only nết in the male pool');
 ok(Object.keys(c.cnt).length>=14,'a new life spreads over the pool',Object.keys(c.cnt).length);ok(c.mal.every(m=>m>=0&&m<=100),'malice from nết in range',c.mal);
 /* D: bot plays (inpage5) — no page errors with the pool */
 const M=path.join(__dirname,'../measure');for(const f of ["inpage5.js"])await p1.evaluate(fs.readFileSync(path.join(M,f),'utf8'));
 const t0=Date.now();let lives=0;while(Date.now()-t0<(+process.env.BOTSEC||240)*1000&&lives<3)lives=await p1.evaluate(()=>window.__bot.step("sens",200));
 const pl=await p1.evaluate(()=>{const a={};for(const r of window.__res||[])for(const t in (r.pl||{}))a[t]=1;return {res:(window.__res||[]).map(r=>r.title+"|"+(r.fate||"").slice(0,60)),traits:Object.keys(a)}});
 console.log(JSON.stringify(pl).slice(0,600));
 ok(!pl.res.some(x=>/CRASH/.test(x)),'bot lives end without CRASH',pl.res);
 ok(!e0.length,'base build no page errors',e0.slice(0,3));ok(!e1.length,'this build no page errors',e1.slice(0,5));
 await b.close();const f=res.filter(x=>!x).length;console.log('RESULT',res.length-f,'/',res.length);process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
