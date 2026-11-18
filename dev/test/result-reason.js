/* result-reason test (owner 18/11 09:03Z): every line of a result card says SHORTLY WHY (kitWhy, KIT 7), values sit next to their labels.
   usage: node dev/test/result-reason.js <site url> <W>x<H> [more sizes...] */
const {chromium}=require('playwright');
const [,,URL,...SZ]=process.argv;
(async()=>{let allOk=true;
 for(const sz of SZ){const [W,H]=sz.split('x').map(Number);const b=await chromium.launch();
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kaWhyStat==='function');await p.waitForTimeout(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(S)break}});
  for(let i=0;i<15;i++){await p.waitForTimeout(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s){Q.length=0;try{nlNew()}catch(e){}start()}return s});if(!srv)break}
  const R=await p.evaluate(async()=>{document.querySelectorAll(".kroul,#kroul").forEach(e=>e.remove());Q.length=0;window.__bot=false;const out=[];
   const run=(name,title,mut,logs)=>{const b=rsnap();mut();(logs||[]).forEach(l=>log(l));resultShow(title,b,null);const t=document.getElementById("rtoast");
    const items=[...t.querySelectorAll(".kitem")].filter(x=>!x.closest(".kr-vi"));const n=items.length,w=items.filter(x=>x.querySelector(".kwy")).length;
    const kem=t.querySelector(".kkem");const kw=kem?!!kem.querySelector(".kwy"):true;
    const left=items.every(x=>getComputedStyle(x).textAlign==="left"||getComputedStyle(x).textAlign==="start");
    const bad=items.filter(x=>/%|:\s*·/.test(x.textContent)||(x.querySelector(".kwy")&&x.querySelector(".kwy").textContent.length>52)).length;
    out.push({name,items:n,withWhy:w,kemWhy:kw,left,bad,sample:items.slice(0,3).map(x=>x.textContent)})};
   const q=queenP&&queenP(),v=rivals.find(x=>x.alive&&x!==q);
   run("between-buoi","Trong cung vừa qua",()=>{S.suc+=18;S.sung-=1;S.bac-=15;S.th=(S.th||0)+4;rivals.slice(0,8).forEach(x=>x.ghen=Math.max(0,(x.ghen||0)-1))},["Ngủ một đêm: Sức +10 · ân sủng nhạt dần: Sủng -1.","Thái hậu hài lòng vì ngươi chép kinh đều đặn."]);
   run("act","Dưỡng nhan",()=>{S.sac+=3;S.bac-=8},[]);
   run("no-log","Việc lạ",()=>{S.danh+=2;S.duc-=1},[]);
   run("person","Thỉnh an",()=>{if(v)v.rel=(v.rel||0)+5;S.tamco+=1},["Hoàng thượng ban lụa."]);
   return out});
  const ok=R.every(r=>r.items>0&&r.withWhy===r.items&&r.kemWhy&&r.left&&!r.bad)&&!errs.length;allOk=allOk&&ok;
  console.log(sz,ok?"PASS":"FAIL",JSON.stringify(R),errs);await b.close()}
 process.exit(allOk?0:1)})();
