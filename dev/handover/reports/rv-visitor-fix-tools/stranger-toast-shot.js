const {chromium}=require('playwright');const path=require('path');const OUT=process.argv[3];
(async()=>{const b=await chromium.launch();
for(const [dev,W,H] of (process.env.DEVS?JSON.parse(process.env.DEVS):[["fold",755,1000],["ipad",1180,820]])){
const p=await b.newPage({viewport:{width:W,height:H}});
await p.goto('file://'+path.resolve(process.argv[2]),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;for(let k=0;k<400;k++){start();if(!(typeof isSrv==="function"&&isSrv())&&!S.out&&!(typeof isKc==="function"&&isKc()))break}window.__nlInner=0;Q.length=0;try{closeModal()}catch(e){}render();setInterval(()=>{const k=document.getElementById('kmrew');if(k)k.remove()},100)});
for(let i=0;i<40;i++){const st=await p.evaluate(()=>{const b=[...document.querySelectorAll('button')].find(x=>/Vào cung ngay/.test(x.textContent)&&x.offsetParent);if(b){b.click();return 1}return [...document.querySelectorAll('body *')].some(x=>x.children.length===0&&x.offsetParent&&/Sửa soạn nhập cung/.test(x.textContent))?2:0});if(!st)break;await p.waitForTimeout(1500)}
await p.waitForTimeout(1500);
const r=await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}
 const v=liveRivals(true).filter(x=>!x.queen&&!sameHouse(S,x));const x=v[3];S.rank=Math.min(S.rank,2);let r=S.rank+1;while(BAL.seatCap[r]===1)r++;x.rank=r;x.net=["Kiêu ngạo",x.net[1],x.net[2]];S.known[kOf61(x)]=0;delete S.met[x.id];S.nkn=S.nkn||{};S.nkn.me={};
 const pp0={kind:"rival",ref:x,name:x.name,__t:1};S.visit.people.push(pp0);S.visit.tk={};S.visit.talked=false;used=0;
 const pp=curPeople();const i=pp.findIndex(y=>y.__t);if(i<0)return "no idx "+pp.length;popIdx=i;popMsg="";talkOpts(pp[i]);talk(0);
 if(!curPeople().some(y=>y===pp0))S.visit.people.push(pp0);popIdx=curPeople().findIndex(y=>y===pp0);render();return String(popMsg).replace(/<[^>]+>/g,"")});
await p.waitForTimeout(4000);await p.screenshot({path:`${OUT}/${dev}-unnamed.png`});console.log(dev,r);await p.close()}
await b.close()})();
