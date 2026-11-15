/* book.js OUTDIR : Tuần lục person page with the widest figure (Thái hậu h1-a51) + event dialog stage, on 6 sizes; measures overflow */
const {chromium}=require('playwright');const fs=require('fs');
const OUT=process.argv[2];const WT='/home/user/cung-tuong-mong/.claude/worktrees/agent-a4e8c6432e582a50a/';fs.mkdirSync(OUT,{recursive:true});
const SZ=process.env.SZ?JSON.parse(process.env.SZ):[[755,1000,2],[1180,820,2],[1366,1024,2],[412,1058,2],[390,844,3],[1024,768,2]];
(async()=>{const b=await chromium.launch();const R=[];
for(const [W,H,D] of SZ){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:D,isMobile:W<1100,hasTouch:true});
 await ctx.route('http://ctm.test/**',r=>r.fulfill({status:200,body:fs.readFileSync(process.argv[3]),contentType:'text/html; charset=utf-8'}));
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(5000);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForTimeout(3000);
 const res=await p.evaluate(async()=>{
  const TH='img/fig-thaihau-h1-a51.webp';const k0=kitFigOf;window.kitFigOf=kitFigOf=function(q){if(q&&(q===S.thO||q.kind==='th'))return (typeof IMG_BASE==='string'?IMG_BASE:'')+TH;return k0.apply(this,arguments)};
  Q.length=0;try{showModal()}catch(e){}
  for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}
  const who=S.thO||{kind:'th',name:'Thái hậu',age:60};
  let w=document.getElementById('dawn');if(!w){w=document.createElement('div');w.id='dawn';w.className='dawn kbkdawn on';document.body.appendChild(w)}w.hidden=false;w.className='dawn kbkdawn on';
  const facts=[];for(let i=0;i<4;i++)facts.push({text:'Thái hậu ban thưởng, khen ngươi hiếu thuận, dặn giữ lễ nghi trong cung.',kind:'world',auto:false});
  window.__kbk=kitBook({pages:[{kind:'person',who,title:'Thái hậu',blocks:[{facts}],n:4}],head:'Tuần lục · thử',host:w,label:'Tuần lục',onClose:()=>{}});
  await new Promise(r=>setTimeout(r,2500));
  for(let i=0;i<6;i++){let e=document.elementFromPoint(innerWidth/2,innerHeight/2);if(!e||e.closest('#dawn'))break;while(e.parentElement&&e.parentElement!==document.body)e=e.parentElement;e.style.display='none'}
  document.getElementById('dawn').style.zIndex=2147483000;
  const im=[...document.querySelectorAll('#dawn .kbk-person.kbk-full .kesimg')].find(e=>e.offsetParent);
  if(!im)return{err:'no fig'};await new Promise(r=>{if(im.complete)r();else im.onload=r;setTimeout(r,12000)});
  await new Promise(r=>setTimeout(r,400));const r=im.getBoundingClientRect(),col=im.closest('.kbk-person').getBoundingClientRect();const pr=col;
  // visible content box with object-fit: contain
  const nw=im.naturalWidth,nh=im.naturalHeight,sc=Math.min(r.width/nw,r.height/nh),cw=nw*sc,ch=nh*sc,cl=r.left+(r.width-cw)/2;
  return{img:[Math.round(cl),Math.round(r.bottom-ch),Math.round(cw),Math.round(ch)],col:[Math.round(col.left),Math.round(col.right)],page:[Math.round(pr.left),Math.round(pr.right),Math.round(pr.bottom)],
   overL:Math.round(col.left-cl),overR:Math.round(cl+cw-col.right),overB:Math.round(r.bottom-pr.bottom),ovX:document.documentElement.scrollWidth>innerWidth}});
 await p.evaluate(()=>{for(const c of document.body.children)if(c.id!=='dawn')c.style.visibility='hidden'});await p.waitForTimeout(300);
 await p.screenshot({path:`${OUT}/book-${W}x${H}.jpg`,type:'jpeg',quality:78});
 R.push({size:`${W}x${H}@${D}`,...res,errs:errs.slice(0,3)});await ctx.close()}
console.log(JSON.stringify(R,null,1));await b.close()})();
