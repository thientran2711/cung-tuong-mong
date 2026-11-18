/* th-name: a servant of the Thái hậu (S.thO, jstaff: allServ / ownerOf include her household) is named by her owner as "Thái hậu",
   never "undefined": NM(S.thO), the TIN BÁO pass-by line (knLine {P}) and every NM(ownerOf(...)) line.
   usage: python3 dev/build/assemble.py && node dev/test/th-name.js dev/index.html */
const {chromium}=require('playwright');const U='file://'+require('path').resolve(process.argv[2]||'dev/index.html');
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto(U,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;window.__agAll=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
const r=await p.evaluate(()=>{const o={};const th=S.thO;o.hasTh=!!th;o.thName=th&&th.name;o.thStaff=th&&(th.staff||[]).length;
 const s=th&&(th.staff||[])[0];o.owner=s?ownerOf(s)===th:null;o.nm=th?NM(th):null;
 let line="";try{const h=(KN.raw||[])[0]||{k:"vuon",id:"x",kind:"walk"};line=knLine({by:"pass",how:"pass",e:s},h)}catch(e){line="ERR "+e.message}o.line=line;return o});
ok(r.hasTh&&r.thStaff>0&&r.owner,'fixture: the Thái hậu has a household and ownerOf finds her',r);
ok(r.nm&&r.nm!=="undefined"&&!/undefined/.test(String(r.nm)),'NM(Thái hậu) is a name',r.nm);
ok(r.line&&!/undefined|\{|\}/.test(r.line)&&/Thái hậu/.test(r.line),'TIN BÁO pass-by line by her servant names "cung Thái hậu"',r.line);
ok(!errs.length,'no page errors',errs.slice(0,2));
const n=res.filter(x=>!x).length;console.log(n?`TH-NAME: ${n} FAIL`:`TH-NAME: ALL ${res.length} PASS`);await b.close();process.exit(n?1:0)})();
