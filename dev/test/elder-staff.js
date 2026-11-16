/* review/elder-staff (jstaff.js): the named palace women. Checks: 3 seeded with unique faces (no other live person shares the identity),
   staffGuide() returns the same face as the stage/person card, ageing + retirement + STAFF_MORT hook, old save seeding, generic
   "ma ma" lines named, the stage person card (kit pcard) at Đức Thọ cung. Shots: the card at the given sizes.
   usage: node dev/test/elder-staff.js <baseURL> <outdir> [WxH ...]   (serve dev/ : python3 -m http.server <port> -d dev) */
const {chromium}=require('playwright');
const [,,BASE,OUT,...SZ]=process.argv;const sizes=SZ.length?SZ:["1180x820","844x390"];
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const R={};let fail=0;const ok=(k,v)=>{R[k]=v;if(v===false||(v&&v.ok===false))fail++};
 for(const [i,sz] of sizes.entries()){const [W,H]=sz.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:true});
  await ctx.addInitScript(()=>{window.__nlInner=1;addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='#kroul,#kload,.krbox,#ktut,.ktip{display:none!important}';document.head.appendChild(s)})});
  const p=await ctx.newPage();p.setDefaultTimeout(60000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}window.__forceOrigin="tt";start()});
  await p.waitForFunction(()=>typeof FIGS!=="undefined"&&FIGS.length>0,null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(800);
  if(i===0){
   ok('seed',await p.evaluate(()=>{elderInit();const E=elders();const ids=E.map(e=>e.fid);const own=E.map(e=>[e.eid,ownerOf(e)===S.thO?"thaihau":ownerOf(e)&&ownerOf(e).queen?"hoanghau":ownerOf(e)===S?"me":"?"]);const others=[];
    const add=o=>{if(o&&o.fid)others.push(o.fid)};add(S);add(S.maid);(rivals||[]).forEach(add);allServ().filter(x=>!x.eid).forEach(add);for(const k in S.court)add(S.court[k]);
    return{ok:E.length===3&&consorts().every(p=>(p.staff||[]).filter(s=>s.role==="maid").length+1<=capOf(p)[0])&&ids.every(Boolean)&&new Set(ids).size===3&&!ids.some(x=>others.includes(x))&&ids.every(x=>figUsed().includes(x)),own,caps:consorts().map(p=>[p.name,(p.staff||[]).filter(s=>s.role==="maid").length+1,capOf(p)[0]]).filter(x=>x[1]>x[2]),list:E.map(e=>[e.eid,e.name,e.call,e.age,e.fid,elderOffice(e),srkName(e)])}}));
   ok('guide',await p.evaluate(()=>{const g=staffGuide();const f=staffFace(elderBy("gt"));const st=pFaceOf({kind:"elder",ref:elderBy("gt")});
    return{ok:!!g&&g.face.src===f.src&&f.src===st.src&&/por-(mama|maid)-/.test(f.src)&&g.kr.role==="mama",g:{id:g.id,name:g.name,title:g.title,office:g.office,src:g.face.src,kr:g.kr}}}));
   ok('ageing',await p.evaluate(()=>{const st=elderBy("tn");const a=st.age;st.retire=a+1;const old=st.name;ageYear();const once=elderBy("kn").age;const n=elderBy("tn");
    const r1=n.name!==old&&n.fid&&n.age>=46;window.STAFF_MORT=s=>s.eid==="kn";const k0=elderBy("kn").name;ageYear();const r2=elderBy("kn").name!==k0;window.STAFF_MORT=null;
    return{ok:!!(r1&&r2),log:S.logs.slice(0,3).map(x=>x.replace(/<[^>]+>/g,""))}}));
   ok('oldsave',await p.evaluate(()=>{for(const o of [S,S.thO].concat(rivals))if(o&&o.staff)o.staff=o.staff.filter(s=>!s.eid);staffInit();return{ok:elders().length===3}}));
   ok('tab',await p.evaluate(async()=>{Q.length=0;showModal();tab="staff";render();await new Promise(r=>setTimeout(r,300));const P=document.getElementById('panel');const t=P.textContent;
    return{ok:/Cung Thái hậu/.test(t)&&elderTabRows().length===2,has:["Cung Thái hậu","Tống","Hà","Diệp"].map(x=>x+":"+t.includes(x))}}));
   ok('text',await p.evaluate(()=>{const a=elderTx("Ma ma bên Đức Thọ cung mang sang một gói trà.");const b=elderTx("Theo ma ma giáo tập học Công.");
    return{ok:a.startsWith(elderCall("tn"))&&b.includes(elderCall("gt")),a,b}}));
   ok('monthly',await p.evaluate(()=>{const r=heirMonth();return{ok:r.includes(elderCall("kn")),r:r.replace(/<[^>]+>/g,"")}}));
  }
  await p.evaluate(()=>{Q.length=0;showModal();S.bac=Math.max(S.bac,50);S.used=0;used=0;S.place="home";goTo("tn")});await p.waitForTimeout(600);
  const tok=await p.evaluate(()=>{const ppl=curPeople();const i=ppl.findIndex(x=>x.kind==="elder");if(i<0)return -1;popIdx=i;popMsg="";renderStage();return i});
  await p.waitForTimeout(2500);
  const card=await p.evaluate(()=>{const c=document.querySelector('.pc');if(!c)return null;const im=c.querySelector('img');return{name:(c.querySelector('.pcname')||{}).textContent,img:im&&im.src.slice(-32),txt:c.textContent.replace(/\s+/g,' ').slice(0,260)}});
  ok('card-'+sz,{ok:tok>=0&&!!card,card});
  await p.screenshot({path:`${OUT}/elder-card-${sz}.jpg`,type:'jpeg',quality:70});
  const hoi=await p.evaluate(()=>{Q.length=0;used=0;const b=document.querySelector('[data-elder="hoi"]');if(!b)return"nobtn";b.click();return popMsg});ok('hoi-'+sz,{ok:/cô cô/.test(hoi),hoi});
  ok('errors-'+sz,{ok:!errs.length,errs:errs.slice(0,5)});await ctx.close()}
 console.log(JSON.stringify(R,null,1));console.log(fail?`FAIL ${fail}`:"PASS");await b.close();process.exit(fail?1:0)})();
