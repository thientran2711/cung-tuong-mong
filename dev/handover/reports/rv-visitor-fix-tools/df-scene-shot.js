const {chromium}=require('playwright');const path=require('path');const OUT=process.argv[3];const TAG=process.argv[4]||'';
(async()=>{const b=await chromium.launch();
for(const [dev,W,H] of (process.env.DEVS?JSON.parse(process.env.DEVS):[["fold",755,1000],["ipad",1180,820]])) for(const sc of (process.env.SCS||"hi,lo").split(",")){
const p=await b.newPage({viewport:{width:W,height:H}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.resolve(process.argv[2]),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;for(let k=0;k<400;k++){start();if(!(typeof isSrv==="function"&&isSrv())&&!S.out&&!(typeof isKc==="function"&&isKc()))break}window.__nlInner=0;Q.length=0;try{closeModal()}catch(e){}render();setInterval(()=>{const k=document.getElementById('kmrew');if(k)k.remove()},100)});
for(let i=0;i<40;i++){const st=await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(x=>/Vào cung ngay/.test(x.textContent)&&x.offsetParent);if(b){b.click();return 1}return [...document.querySelectorAll('body *')].some(x=>x.children.length===0&&x.offsetParent&&/Sửa soạn nhập cung/.test(x.textContent))?2:0});if(!st)break;await p.waitForTimeout(1500)}
await p.waitForTimeout(2000);
const info=await p.evaluate(sc=>{Q.length=0;try{closeModal()}catch(e){}
 const v=liveRivals(true).filter(x=>!x.queen&&!sameHouse(S,x));let e;
 if(sc==="hi"){S.rank=0;e=v.find(x=>x.rank>S.rank)}else{S.rank=Math.max(...v.map(x=>x.rank));e=v.find(x=>x.rank<S.rank)}
 S.known[kOf61(e)]=0;delete S.met[e.id];S.visit.people.push({kind:"rival",ref:e,name:e.name});render();window.__E=e;return `${S.rank} vs ${e.name} r${e.rank}`},sc);
await p.waitForTimeout(2500);
await p.evaluate(()=>{try{closeModal()}catch(e){}Q.length=0;try{closeModal()}catch(e){}const m=gmCard(window.__E);Q.length=0;Q.push(m);showModal()});
await p.waitForTimeout(6000);
const im=await p.evaluate(()=>[...document.querySelectorAll('img')].filter(i=>/unknown|fig-/.test(i.src)&&i.getBoundingClientRect().height>100).map(i=>i.src.split('/').pop()+' h='+Math.round(i.getBoundingClientRect().height)));
await p.screenshot({path:`${OUT}/df-${dev}-${sc}${TAG}.png`});console.log(dev,sc,info,im.join(' | '),errs.slice(0,2));await p.close()}
await b.close()})();
