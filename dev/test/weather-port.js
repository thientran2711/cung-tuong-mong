/* review/weather-port: outdoor-act weather risks. usage: node dev/test/weather-port.js <url> <outdir> [WxH@dpr,...] */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();let bad=0;
 for(const sz of (SIZES||"1180x820@1").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:W<1100,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2500);
  await p.addStyleTag({content:'#kroul{display:none!important}'});
  const r=await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;
   for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;
   const o={};
   S.wx={n:"mưa phùn",k:"rain",f:1};o.sev1=wxSev();
   const fine=S.wx;S.wx={n:"nắng ráo",k:"sun",f:0};o.sev0=wxSev();o.risk0=JSON.stringify(wxRisk(S));
   S.wx={n:"giông tố",k:"storm",f:3};o.sev3=wxSev();
   const R3=wxRisk(S);o.R3=R3;
   S.inv=S.inv||[];const before=wxRisk(S);S.inv.push({k:"du"},{k:"giaycoi"});const after=wxRisk(S);o.gear=[before.cold,after.cold,before.slip,after.slip];
   const a={n:"Dạo vườn ngắm hoa",x:"",c:{},o:100};o.out=wxOutAct(a);o.in=wxOutAct({n:"Đọc sách trong phòng"});
   const h=cardH(a,0);o.cardTxt=h.replace(/<[^>]+>/g," ").replace(/\s+/g," ").slice(0,300);o.noPct=!/%/.test(o.cardTxt);o.xRestored=a.x==="";
   S.preg=1;S.fake=0;o.pregSlip=wxRisk(S).slip;S.preg=0;
   o.rwords=[2,10,30,60].map(chanceW);
   // npc rule
   let hit=0;for(let i=0;i<300;i++){const v=liveRivals(true)[0];if(!v)break;if(wxHit(v,{slip:100,cold:100}))hit++}o.npcHit=hit;
   o.items=["du","aotoi","giaycoi"].map(k=>[IT[k].n,IT[k].pr,SHOP_ALL.includes(k),!!itemArt(k)]);
   // old save: no wx.clr, wx undefined
   const w=S.wx;S.wx=undefined;try{o.oldSave=wxSev()}catch(e){o.oldSave="ERR"+e}S.wx=w;
   return o});
  console.log(sz,JSON.stringify(r,null,1));
  if(r.sev0!==0||r.sev3!==3||!r.out||r.in||!r.noPct||!r.xRestored||!/Dạo vườn|cảm lạnh/.test(r.cardTxt)||r.gear[1]>=r.gear[0]||r.gear[3]>=r.gear[2]||r.oldSave!==0||!r.npcHit)bad++;
  console.log('pageerrors',errs.length,errs.slice(0,3));if(errs.length)bad++;await ctx.close()}
 await b.close();console.log(bad?'FAIL':'PASS');process.exit(bad?1:0)})();
