/* old save (made by the previous build) loads in this build and its care screen has no banner/body overlap. usage: node dev/test/care-oldsave.js <oldUrl> <newUrl> */
const {chromium}=require('playwright');const [,,OLD,NEW]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const prox=process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{};
const boot=async(b,url,E)=>{const c=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,serviceWorkers:'block'});const p=await c.newPage();p.on('pageerror',e=>E.push(e.message.slice(0,150)));
 await p.addInitScript(()=>{window.__nlInner=1});await p.route(/ctmload=1/,r=>r.abort());await p.goto(url,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await sleep(2000);return{c,p}};
(async()=>{const b=await chromium.launch(prox);const e1=[],e2=[];
 const o=await boot(b,OLD,e1);const ls=await o.p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0;
  S.pets=[{t:"linhquy",care:60,at:0,src:"emp",from:"x"},{t:"rua",care:40,at:0,src:"buy"}];S.petOn=0;quiet=false;save();const r={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);r[k]=localStorage.getItem(k)}return r});
 const n=await boot(b,NEW,e2);await n.p.evaluate(r=>{for(const k in r)localStorage.setItem(k,r[k])},ls);
 const res=await n.p.evaluate(()=>{document.getElementById('title').hidden=true;try{const d=loadSlot(3);SLOT=3;quiet=true;deser(d);quiet=false;Q.length=0;document.getElementById('modal').hidden=true;S.petTip=1;
  petcOpen(0)}catch(e){return'ERR '+e.message}return 'ok pets='+S.pets.length});
 await sleep(1500);const ov=await n.p.evaluate(()=>{document.querySelectorAll('.kmov').forEach(e=>e.remove());const R=e=>e.getBoundingClientRect();const ban=document.querySelector('#mb > .kdlgart'),km=document.querySelector('#mb .kpmain');return{title:(document.querySelector('#modal .kptitle')||{}).textContent,banner:!!ban,overlap:!!(ban&&km&&R(km).top<R(ban).bottom-2)}});
 console.log(res,JSON.stringify(ov),'errors old/new',e1.length,e2.length,e2.slice(0,2));await b.close()})();
