/* review/npc-death (D4) checks. usage: python3 dev/build/assemble.py && node dev/test/npc-death.js [oldRoot] [outdir]
   oldRoot = a checkout of the previous main with dev/index.html built (old save made there, loaded here; same origin → same localStorage).
   1 old save (main build) loads in this build: S.lyF made + given a lifespan, 24 months run, no page error.
   2 Trường Môn viện: Phế phi họ Lý stands BESIDE a fallen rival (owner OD:L641); after her death the place is empty (no stand-in).
   3 her maid dies → replacement has a new name (never a dead maid's), a portrait that is not the dead one's; her Tâm nguyện / Việc nhờ end.
   4 a court seat dies (Thái y) → new name, the dead's portrait + figure are retired and never given to anyone; Thái y viện shows the new name.
   5 a servant beaten to death outside jmort (servCaught) is retired too (whole family).
   6 co-op world keys carry lyF / fdead / fidDead / dnames.
   7 screenshots of Trường Môn viện (Lý + a fallen rival) at 755x1000@2 and 1180x820@2 → outdir. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const NEWR=path.resolve(__dirname,'../..');const OLDR=process.argv[2]?path.resolve(process.argv[2]):null;const OUT=path.resolve(process.argv[3]||path.join(NEWR,'.m/shots'));fs.mkdirSync(OUT,{recursive:true});
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();
 const mk=async(vp,dpr,shots)=>{const ctx=await b.newContext({viewport:vp,deviceScaleFactor:dpr||1,reducedMotion:'reduce'});
  await ctx.route('http://ts.local/**',r=>{let u=decodeURIComponent(new URL(r.request().url()).pathname);let root=NEWR;if(u.startsWith('/old/')){root=OLDR;u=u.slice(4)}const f=root+u;
   if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
   r.fulfill({status:200,contentType:/\.html$/.test(f)?'text/html; charset=utf-8':/\.json$/.test(f)?'application/json':/\.webp$/.test(f)?'image/webp':'application/octet-stream',body:fs.readFileSync(f)})});
  if(!shots)await ctx.route(/^https?:\/\/(?!ts\.local)/,r=>/image|media|font/.test(r.request().resourceType())?r.abort():r.continue());
  return ctx};
 const errs=[];const boot=async(p,u)=>{await p.goto(u,{waitUntil:'domcontentloaded',timeout:180000});await p.waitForFunction(()=>typeof start==='function',null,{timeout:180000});await p.waitForTimeout(2500)};
 const ctx=await mk({width:1000,height:755});const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 /* 1 old save */
 if(OLDR){await boot(p,'http://ts.local/old/dev/index.html');
  const o=await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;try{store.set(NL_KEY,null)}catch(e){}start();Q.length=0;for(let m=0;m<6;m++){try{monthTick()}catch(e){}Q.length=0}
   delete S.lyF;const m=document.getElementById('modal');if(m)m.hidden=true;quiet=false;try{NLP=false}catch(e){}try{save()}catch(e){return "save "+e}return {name:S.name,y:S.year,ly:!!S.lyF}});
  await boot(p,'http://ts.local/dev/index.html');
  const r=await p.evaluate(()=>{const d=loadSlot(3);if(!d)return{err:"no save"};SLOT=3;quiet=true;deser(d);quiet=false;try{document.getElementById('title').hidden=true;deal();render()}catch(e){return{err:String(e)}}
   const ly=S.lyF;const t0=ly&&ly.tho;let err="";for(let m=0;m<24;m++){try{monthTick()}catch(e){err=String(e).slice(0,120);break}Q.length=0;if(S.dead)break}
   return{name:S.name,ly:!!ly,tho:t0,age:ly&&ly.age,err}});
  ok(r&&!r.err&&r.ly&&r.tho>0,'old save (main build) loads: Phế phi họ Lý created with a lifespan, 24 months run',Object.assign({old:o},r))}
 else{await boot(p,'http://ts.local/dev/index.html');console.log('skip old save (no oldRoot)')}
 const ev=f=>p.evaluate(f);
 await ev(()=>{for(const f of [].concat(...Object.values(FPOOL)))FAV[f]=1;SLOT=3;try{store.set(NL_KEY,null)}catch(e){}start();Q.length=0;faceInit()});
 /* 2 Lý beside a fallen rival; empty after her death */
 const r2=await ev(()=>{const v=rivals.find(x=>x.alive&&!x.queen);v.out=1;const LL=lcPeople("Phế phi");const a=LL.map(x=>x.ref?x.ref.name:x.name),nr=LL.filter(x=>!x.ref).length;
  goTo("lc");const vis=(S.visit.people||[]).map(x=>x.name),vn=(S.visit.people||[]).filter(x=>x.kind==="fallen"&&!x.ref).length;S.place="home";v.out=0;
  const y=lyFallen();const K=new Set();const t=(function(){y.tho=y.age;y.thoM=S.month;return mortMonth()})();
  const b=lcPeople("Phế phi").map(x=>x.name);goTo("lc");const vis2=(S.visit.people||[]).length;const msg=S.visit.msg;S.place="home";
  return{a,nr,vn,vis,dead:!!y.dead,txt:String(t).replace(/<[^>]+>/g,'').match(/Phế phi [^.]*Trường Môn viện[^.]*\./)+"",b,vis2,msg}});
 ok(r2.a.length===2&&r2.nr===1&&r2.vn===1&&r2.vis.length===2,'Trường Môn viện: Lý stays beside a fallen rival',r2.vis);
 ok(r2.dead&&/qua đời ở Trường Môn viện/.test(r2.txt),'Lý dies of her lifespan, news line shown',r2.txt);
 ok(r2.b.length===0&&r2.vis2===0,'after her death nobody stands in for her (empty until a real person comes)',r2.msg);
 /* 3 maid death */
 const r3=await ev(()=>{faceInit();const m=S.maid;const fc=m.fc,nm=m.name;S.rgL=S.rgL||{};S.rgL.maid={st:2};const q=q72();q.a.push({tid:Object.keys(T72I)[0],rk:"maid",st:0,dl:wk()+5});
  m.tho=m.age;m.thoM=S.month;m.thoO=0;const t=String(mortMonth()).replace(/<[^>]+>/g,'');faceInit();const n=S.maid;
  return{nm,n:n.name,fc,nfc:n.fc,dead:(S.fdead||[]).includes(fc),dnames:(S.dnames||[]).includes(nm),rgl:!!(S.rgL&&S.rgL.maid),q:q.a.filter(x=>x.rk==="maid").length,t:t.match(/Cung nữ thân cận[^.]*\.[^.]*\./)+""}});
 ok(r3.n!==r3.nm&&r3.nfc!==r3.fc&&r3.dead&&r3.dnames,'maid dies → new person: new name, new portrait, the dead one retired',r3);
 ok(!r3.rgl&&r3.q===0,'her maid\'s Tâm nguyện + Việc nhờ end with her');
 /* 4 court seat (Thái y) */
 const r4=await ev(()=>{faceInit();const c=S.court.ty;try{figPick(c)}catch(e){}const fc=c.fc,fid=c.fid,nm=c.name;c.tho=c.age;c.thoM=S.month;c.thoO=0;const t=String(mortMonth()).replace(/<[^>]+>/g,'');faceInit();try{figPick(c)}catch(e){}
  goTo("tyv");const vis=(S.visit.people||[]).filter(x=>x.kind==="ty").map(x=>x.name);S.place="home";
  /* nobody alive holds the dead face/figure afterwards, even after 40 new draws */
  for(let i=0;i<40;i++){const s={name:"x"+i,role:"eunuch",age:40};faceFor(s,"official",50);if(s.fc===fc&&fc){return{bad:"drawn "+fc}}}
  return{nm,n:c.name,fc,nfc:c.fc,fid,nfid:c.fid,ret:(S.fdead||[]).includes(fc)||!fc,fret:(S.fidDead||[]).includes(fid)||!fid,vis,t:t.match(/[^.]*lên thay[^.]*\./)+""}});
 ok(!r4.bad&&r4.n!==r4.nm&&(r4.nfc!==r4.fc||!r4.fc)&&(r4.nfid!==r4.fid||!r4.fid)&&r4.ret&&r4.fret,'Thái y dies → new name, portrait + figure retired',r4);
 ok(r4.vis.includes(r4.n),'Thái y viện shows the new Thái y\'s name',r4.vis);
 /* 5 servant beaten to death (j10 servCaught, not jmort) */
 const r5b=await ev(()=>{/* replay through the wrapped endTurn path: a fake turn that removes a servant and logs the death */
  const v=rivals.find(x=>x.alive&&x.staff&&x.staff.length);if(!v)return{skip:1};const s=v.staff[0];const fc=s.fc;
  const inner=function(){v.staff.splice(v.staff.indexOf(s),1);log(`${s.name} bị đánh chết trong ngục Thận Hình ti.`)};
  /* the jnpcd watcher (the same wrapper that sits around endTurn / monthTick) around a stand-in turn */
  let r=null;try{const w=window.__npcdWatch;if(typeof w==="function")r=w(inner)()}catch(e){return{err:String(e)}}
  return{fc,ret:!fc||(S.fdead||[]).includes(fc),name:s.name,dn:(S.dnames||[]).includes(s.name)}});
 ok(r5b.skip||(r5b.ret&&r5b.dn),'servant beaten to death outside jmort → retired (whole family)',r5b);
 /* 6 co-op world keys */
 const r6=await ev(()=>{const src=[...document.scripts].map(s=>s.textContent).join("\n");const m=src.match(/const W_KEYS=\[([^\]]*)\]/);return m?m[1]:""});
 ok(["lyF","fdead","fidDead","dnames"].every(k=>r6.includes(`"${k}"`)),'co-op: Lý + retired faces/names are world keys');
 /* r1: a man killed outside jmort (xử trảm: alive=false only) keeps his face; a living man entering a new band never draws it */
 const r7=await ev(()=>{const M=(S.men||[]).filter(m=>m.alive);if(M.length<2)return{skip:1};M.forEach(m=>pMan(m));const d=M[0];d.alive=false;const f=d.fc;let hit=0;
  for(let i=0;i<60;i++){const o=M[1];o.fc=null;o.fk=null;faceFor(o,"man",o.age);if(f&&o.fc===f)hit++}return{f,hit}});
 ok(r7.skip||(r7.f&&r7.hit===0),'man executed outside jmort: his face never drawn again (60 draws)',r7);
 /* r1: Lý's personal name never shares a given name with a consort (j61 masked it: "Lý Đáp ứng ???"); old saves repaired */
 const r8=await ev(()=>{j59CourtNames();const v=rivals.find(x=>x.alive&&x.name.split(" ").length>=3);const g0=S.lcfPn.split(" ").slice(-2).join(" ");const o=v.name;v.name=v.name.split(" ")[0]+" "+g0;
  lyNameFix();const g1=S.lcfPn.split(" ").slice(-2).join(" ");const rep=g1!==g0;v.name=o;
  const gg=S.lcfPn.split(" ").slice(-2).join(" ");let clash=0;for(let i=0;i<300;i++){const n=freshName();if(n.endsWith(" "+gg))clash++}
  let jc=0;const sv=S.lcfPn;for(let i=0;i<50;i++){const n=j59gen(["Lý"],J59N.FAL);if(rivals.some(x=>x.name.split(" ").length>=3&&x.name.endsWith(" "+n.split(" ").slice(-2).join(" "))))jc++}
  return{g0,g1,rep,clash,jc}});
 ok(r8.rep&&r8.clash===0&&r8.jc===0,'Lý never shares a given name with a consort (repair on load, freshName, j59gen)',r8);
 ok(errs.length===0,'no page errors',errs.slice(0,5));
 await ctx.close();
 /* 7 screenshots */
 for(const [W,H] of [[755,1000],[1180,820]]){const c2=await mk({width:W,height:H},2,true);const q=await c2.newPage();q.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await boot(q,'http://ts.local/dev/index.html');
  await q.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!isSrv())break}
   Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}const st=document.createElement("style");st.textContent=".kroul{display:none!important}";document.head.appendChild(st);tab="go";render()});
  for(let i=0;i<15;i++){await q.waitForTimeout(400);const srv=await q.evaluate(()=>{const s=isSrv();if(s){Q.length=0;start()}return s});if(!srv)break}
  await q.evaluate(()=>{document.querySelectorAll(".kroul").forEach(e=>e.remove());Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;
   const v=rivals.find(x=>x.alive&&!x.queen);v.out=1;goTo("lc");Q.length=0;if(md)md.hidden=true;tab="go";render()});await q.waitForTimeout(5000);
  await q.evaluate(()=>{document.querySelectorAll('.kmov,.kroul,#kpop').forEach(e=>e.remove());Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;tab=innerWidth<innerHeight?"go":"act";render();scrollTo(0,0);document.querySelectorAll("*").forEach(e=>{if(e.scrollTop)e.scrollTop=0});try{if(innerWidth<innerHeight){const b=document.querySelector("#tabs [aria-selected=\"true\"]");if(b)b.click()}}catch(e){}});await q.waitForTimeout(2500);
  await q.screenshot({path:`${OUT}/lc-ly-${W}x${H}.jpg`,type:'jpeg',quality:80});await c2.close()}
 console.log(`\n${res.filter(r=>r[0]).length}/${res.length} passed`);await b.close();process.exit(res.every(r=>r[0])?0:1)})().catch(e=>{console.error(e);process.exit(1)});
