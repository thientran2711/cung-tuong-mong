/* TRAIT RENAME (owner 17/11): an old save whose consort has trait "Hiểm độc" loads as "Xảo quyệt", same behaviour keys. usage: node dev/test/trait-rename-oldsave.js */
const {chromium}=require('playwright');const path=require('path');const URL='file://'+path.resolve(__dirname,'../index.html');
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(120000);
 await p.route(/^https?:/,r=>r.abort());await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function'&&typeof trMigrate==='function');
 const r=await p.evaluate(()=>{SLOT=2;document.getElementById('title').hidden=true;start();Q.length=0;
  const v=rivals[0];v.trait="Hiểm độc";v.trait2="Hiểm độc";v.tr="Hiểm độc";S.log=(S.log||[]);S.mem=S.mem||{};S.mem.x={"Hiểm độc":1};
  const w=PERS_W0=null;const old=JSON.parse(JSON.stringify(ser()));const raw=JSON.stringify(old);
  const had=raw.includes("Hiểm độc");const before=(typeof PERS==="object"&&PERS["Xảo quyệt"])?JSON.stringify(PERS["Xảo quyệt"].w):"";
  quiet=true;deser(JSON.parse(raw));quiet=false;const v2=rivals.find(x=>x.id===v.id);
  const after=JSON.stringify(ser());return{had,still:after.includes("Hiểm độc"),trait:v2.trait,trait2:v2.trait2,tr:v2.tr,mk:Object.keys(S.mem.x),lbl:traitLabel("Hiểm độc"),labelOk:traitLabel("Hiền lành"),pers:before.length>0,
   trk:typeof TRK==="object"?TRK["Xảo quyệt"]:null,tr_in:TRAITS.map(t=>t[0]).includes("Xảo quyệt")&&!TRAITS.map(t=>t[0]).includes("Hiểm độc"),trT:(()=>{try{return traitsOf(v2)}catch(e){return String(e)}})()}});
 console.log(JSON.stringify(r));
 ok(r.had,'fixture really holds the old word');ok(!r.still,'no "Hiểm độc" left after load');ok(r.trait==="Xảo quyệt"&&r.trait2==="Xảo quyệt"&&r.tr==="Xảo quyệt",'trait fields show Xảo quyệt');
 ok(r.mk[0]==="Xảo quyệt",'object keys migrated');ok(r.lbl==="Xảo quyệt"&&r.labelOk==="Hiền lành",'traitLabel map');ok(r.pers,'PERS has Xảo quyệt weights');ok(r.trk==="hiemdoc",'TRK art key unchanged (hiemdoc)');ok(r.tr_in,'TRAITS pool uses new label only');
 ok(!errs.length,'no page errors',errs.slice(0,3));await b.close();const f=res.filter(x=>!x).length;console.log('RESULT',res.length-f,'/',res.length);process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
