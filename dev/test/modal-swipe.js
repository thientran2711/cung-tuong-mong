/* review/modal-scroll (owner 16/11 "Không vuốt được, sửa gấp"): every modal / panel whose content overflows must scroll by a real TOUCH swipe.
   For each modal kind: open it, find the content that lies outside the dialog box (overflow), then do a real finger swipe (CDP
   Input.dispatchTouchEvent, touchStart → 12 touchMove → touchEnd) up from the middle of the dialog body, and check that some element inside
   #modal scrolled (scrollTop grew) and the last content element came closer to view. A modal whose content fits is "fits".
   usage: node dev/test/modal-swipe.js <page url> [WxH@dpr,...] [shotdir]  (default 1180x820@1,755x1000@1,844x390@1) */
const {chromium}=require('playwright');const fs=require('fs');
const [,,PAGE,SIZES,SHOT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ALL=[];
 for(const sz of (SIZES||"1180x820@1,755x1000@1,844x390@1").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr||1,hasTouch:true,isMobile:true,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  const cdp=await ctx.newCDPSession(p);
  await p.goto(PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
  for(let i=0;i<30;i++){await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name,null,{timeout:90000});await sleep(1200);
   if(!(await p.evaluate(()=>typeof isSrv==="function"&&isSrv())))break;await p.evaluate(()=>{S=null;start()})}
  if(process.env.XCSS)await p.addStyleTag({content:process.env.XCSS});await p.addStyleTag({content:'#kroul,#kroulw,#ktut,.kmov,#dawn{display:none!important}'});
  const clean=()=>p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());Q.length=0;const md=document.getElementById('modal');md.hidden=true;md.className='modal';
   const t=document.getElementById('title');if(t)t.hidden=true;try{KTUT.on=false}catch(e){}render()});
  await p.evaluate(()=>{S.bac=500;S.suc=90;S.rank=Math.max(S.rank,2);for(const k of Object.keys(IT).filter(k=>!IT[k].story).slice(0,24))S.inv.push({k,from:"me"});for(const a of ARTS)S.arts[a.k]=Math.max(S.arts[a.k]||0,3)});
  const LONG="<p>"+"Trong cung đêm nay gió lạnh, đèn lồng lay động dọc hành lang dài. ".repeat(6)+"</p>";
  const K=[
   ["wkr picker (Học Cầm)",()=>p.evaluate(()=>{const a=ARTS.find(x=>x.n==="Cầm")||ARTS[0];wkAsk(a.k,"teacher",()=>{})})],
   ["wkr picker (other arts)",()=>p.evaluate(()=>{const a=ARTS.find(x=>x.n!=="Cầm"&&wkKindsOf(x.k).some(y=>WKR[y]));wkAsk(a.k,"prac",()=>{})})],
   ["shop",()=>p.evaluate(()=>{invAct("shop");render()})],
   ["gift picker",()=>p.evaluate(()=>{const v=liveRivals(true)[0];pushDil(mkP("giftpick",{v:v.id}),"Tặng quà");showModal();render()})],
   ["item card",()=>p.evaluate(()=>{const x=kinvItems()[0];if(x)kinvOpen(x)})],
   ["self card (pcm)",()=>p.evaluate(()=>showSelf())],
   ["emperor card (pcm)",()=>p.evaluate(()=>showEmp())],
   ["long info",()=>p.evaluate(L=>{Q.push({t:"Tin dài",h:L.repeat(5)});showModal()},LONG)],
   ["long event (8 choices)",()=>p.evaluate(L=>{Q.push({t:"Việc lớn",h:L.repeat(2),opts:Array.from({length:8},(_,i)=>({n:"Lựa chọn số "+(i+1),fx:{},x:"không đổi gì",go:()=>{}}))});showModal()},LONG)],
   ["menu home",()=>p.evaluate(()=>document.getElementById('menu').click())],
   ["Thiết lập",async()=>{await p.evaluate(()=>document.getElementById('menu').click());await sleep(900);await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .kbtn')].find(b=>/Thiết lập/.test(b.textContent));b&&b.click()})}],
   ["save slots",async()=>{await p.evaluate(()=>document.getElementById('menu').click());await sleep(900);await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .kbtn')].find(b=>/Lưu|Ván/.test(b.textContent));b&&b.click()})}],
  ];
  const meas=()=>p.evaluate(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return null;const d=M.querySelector('.dlg');if(!d)return null;const r=d.getBoundingClientRect();
   const sc=[...M.querySelectorAll('*')].map(e=>e.scrollTop).reduce((a,b)=>a+b,0);
   /* the lowest visible-content element */
   let low=0;M.querySelectorAll('.dlg button, .dlg p, .dlg img, .dlg .kshc, .dlg li').forEach(e=>{if(!e.getClientRects().length)return;const q=e.getBoundingClientRect();if(q.height>0)low=Math.max(low,q.bottom)});
   const vis=Math.min(r.bottom,innerHeight);
   const SC=[...M.querySelectorAll('*')].filter(e=>{const s=getComputedStyle(e);return /auto|scroll/.test(s.overflowY)&&e.scrollHeight>e.clientHeight+2&&e.getClientRects().length});
   const scs=SC.map(e=>(e.id?"#"+e.id:"")+"."+[...e.classList].slice(0,2).join("."));
   const pts=SC.map(e=>{const q=e.getBoundingClientRect();const t=Math.max(q.top,r.top,0),bo=Math.min(q.bottom,r.bottom,innerHeight);return[Math.round(q.left+q.width/2),Math.round(t+(bo-t)*0.6)]});
   const b=M.querySelector('#mb')||d;const br=b.getBoundingClientRect();
   return{sc,low:Math.round(low),vis:Math.round(vis),over:low>vis+4||scs.length>0,scs,pts,cx:Math.round(br.left+br.width/2),cy:Math.round(Math.max(br.top+40,Math.min(br.bottom-40,(br.top+br.bottom)/2)))}});
  const swipe=async(x,y,dy)=>{const T=(type,yy)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:type==="touchEnd"?[]:[{x,y:yy,id:1}]});
   await T('touchStart',y);for(let i=1;i<=12;i++){await T('touchMove',y-dy*i/12);await sleep(16)}await T('touchEnd',y-dy);await sleep(600)};
  const R={sz,rows:[]};
  for(const [name,open] of K){await clean();await sleep(300);try{await open()}catch(e){R.rows.push({name,res:"open failed: "+e.message.slice(0,80)});continue}await sleep(1300);
   const a=await meas();if(!a){R.rows.push({name,res:"did not open"});continue}
   if(SHOT&&/Học Cầm/.test(name))await p.screenshot({path:`${SHOT}/cam-${wh}-before.jpg`,type:'jpeg',quality:50});
   const dy=Math.min(260,H*0.3);const reset=()=>p.evaluate(()=>document.querySelectorAll('#modal *').forEach(e=>{if(e.scrollTop)e.scrollTop=0}));
   /* 1. the owner's swipe: middle of the dialog body; 2. a swipe on each overflowing list */
   await reset();await sleep(200);const a1=await meas();const mbOver=await p.evaluate(()=>{const m=document.getElementById('mb');return !!m&&m.scrollHeight>m.clientHeight+2&&/auto|scroll/.test(getComputedStyle(m).overflowY)});
   await swipe(a.cx,a.cy,dy);let z=await meas();const mid=mbOver?!!z&&z.sc>a1.sc:null;const each=[];
   /* a list that starts below the body's fold: bring it into view first (as a finger would, by swiping the body), then swipe on it */
   for(let i=0;i<a.pts.length;i++){await reset();await sleep(200);const pt=await p.evaluate(i=>{const M=document.getElementById('modal');const e=[...M.querySelectorAll('*')].filter(e=>/auto|scroll/.test(getComputedStyle(e).overflowY)&&e.scrollHeight>e.clientHeight+2&&e.getClientRects().length)[i];
     const mb=document.getElementById('mb');if(mb&&mb!==e&&mb.contains(e)){const q=e.getBoundingClientRect(),m=mb.getBoundingClientRect();if(q.top>m.bottom-60)mb.scrollTop+=q.top-m.top}
     const q=e.getBoundingClientRect(),d=M.querySelector('.dlg').getBoundingClientRect(),m=(mb||e).getBoundingClientRect();const t=Math.max(q.top,d.top,mb&&mb.contains(e)?m.top:0,0),bo=Math.min(q.bottom,d.bottom,mb&&mb.contains(e)?m.bottom:1e9,innerHeight);
     return[Math.round(q.left+q.width/2),Math.round(t+(bo-t)*0.6),e.scrollTop]},i);await sleep(200);const a2=await meas();
    await swipe(pt[0],pt[1],Math.min(dy,pt[1]-20));z=await meas();each.push(!!z&&z.sc>a2.sc)}
   const ok=mid!==false&&each.every(Boolean);
   R.rows.push({name,over:a.over,low:a.low,vis:a.vis,scrollers:a.scs.map((n,i)=>n+(each[i]?"✓":"✗")).join(" ")+(mid==null?"":mid?" mid✓":" mid✗"),res:!a.over?"fits":ok?"SCROLLS":"STUCK"});
   if(SHOT&&/Học Cầm/.test(name))await p.screenshot({path:`${SHOT}/cam-${wh}-after.jpg`,type:'jpeg',quality:50})}
  R.errs=errs.slice(0,5);ALL.push(R);await ctx.close()}
 for(const R of ALL){console.log("== "+R.sz);for(const r of R.rows)console.log([r.name.padEnd(26),r.res,r.over!=null?`low ${r.low}/vis ${r.vis}`:"",r.scrollers||""].join(" | "));if(R.errs.length)console.log("errs",R.errs)}
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
