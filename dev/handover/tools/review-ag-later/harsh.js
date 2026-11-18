// probe: toilAns(S,r,"harsh") must move stats like main's inline harsh option (toilBack -harshAff; win: danh +replyDanh; lose: danh/duc)
const {chromium}=require('playwright');const U='file://'+require('path').resolve(process.argv[2]);
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
await p.goto(U,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
const r=await p.evaluate(()=>{const v=rivals.find(x=>!x.queen&&!x.out);const out=[];
 for(const win of [100,0]){const B=BAL.toil,w0=B.harshWin;B.harshWin=win;const d0=S.danh,u0=S.duc,a0=JSON.stringify(v.aff||v.af||null);
  const res=toilAns(S,{host:v,n:-2,v},"harsh");B.harshWin=w0;out.push({win,res,dd:S.danh-d0,du:S.duc-u0,affChanged:(v.rel)!==a0})}return out});
const ok=r[0].res===true&&r[1].res===false&&(r[1].dd<0||r[1].du<0)&&r[0].affChanged;
console.log(JSON.stringify(r),errs.slice(0,2));console.log(ok?'PASS harsh':'FAIL harsh');await b.close();process.exit(ok?0:1)})();
