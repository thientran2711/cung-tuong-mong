/* mg-clutter scan: every mini-game frame, at 4 devices: chip rows shown (PHẦN/HỒI/CÒN), "Hôm nay" block shown, scroll needed (yes/no).
   usage: node scan.js <baseURL> <label> > out.json   (serve the built site first: python3 -m http.server in the repo root) */
const {chromium}=require('playwright');
const [,,BASE,LABEL]=process.argv;
const DEV=[["fold 755x1000@2",755,1000,2],["ipad 1180x820@2",1180,820,2],["ipad-pro 1366x1024@2",1366,1024,2],["phone 390x844@3",390,844,3]];
const CONTEST="dan,hat,co,dauho,ban,tho,doi,doden,ve,hoa,theu,kim,mua,banh,huong".split(",");
const MEASURE=()=>{const vis=e=>{const r=e.getBoundingClientRect(),cs=getComputedStyle(e);return r.width>0&&r.height>0&&cs.display!=="none"&&cs.visibility!=="hidden"};
 const d=document.getElementById('kg82')||document.querySelector('#ov .mg:not([hidden])');if(!d)return{open:false};
 const chips=[...d.querySelectorAll('.kghud')].filter(vis).length,cells=[...d.querySelectorAll('.kgc')].filter(vis).map(e=>e.querySelector('small').textContent);
 const hom=[...d.querySelectorAll('h4,.kpst,small,b')].filter(e=>vis(e)&&/^\s*hôm nay\s*$/i.test(e.textContent)).length;
 const bde=/gặp bề trên/.test(d.innerText||"");
 const ov=document.getElementById('ov');const sc=[d,ov,document.scrollingElement].filter(Boolean).map(e=>e.scrollHeight-e.clientHeight);
 const box=d.querySelector('.kgbox');const br=box?box.getBoundingClientRect():null;
 return{open:true,chipRows:chips,cells,homNay:hom,agendaText:bde,scrollPx:Math.max(0,...sc),scroll:Math.max(0,...sc)>2,boxBottom:br?Math.round(br.bottom):null,vh:innerHeight,boxCut:br?br.bottom>innerHeight+1:null,hudRowTop:null}};
(async()=>{const b=await chromium.launch();const out={label:LABEL,devs:{}};
 for(const [name,W,H,R] of DEV){const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:R});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50)});
  await require('/home/user/wt/repo/dev/test/lib/roulette').dismissRoulette(p);
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.arts,null,{timeout:30000});
  await p.evaluate(()=>{Object.assign(S.arts,{cam:3,ky:2,thi:4,hoa:1,vu:3,y:2});S.tai=62;render()});
  const rows=[];
  const close=async()=>{await p.evaluate(()=>{try{kg82Close(true)}catch(e){}const ov=document.getElementById('ov');if(ov)ov.hidden=true;try{mgDone=true}catch(e){}});await p.waitForTimeout(150)};
  for(const k of CONTEST){await p.evaluate(kind=>{const R=liveRivals(true).slice(0,4);startContest({art:kind,title:'Hội',rivals:R,prep:6,stakes:{win:{sung:8}},onDone:()=>{}})},k);await p.waitForTimeout(500);
   const intro=await p.evaluate(MEASURE);let play=null;try{await p.locator('#kg82go').tap({timeout:3000});await p.waitForTimeout(1500);play=await p.evaluate(MEASURE)}catch(e){}
   rows.push({game:"contest:"+k,intro,play});await close()}
  await p.evaluate(()=>toilOpen());await p.waitForTimeout(900);const t1=await p.evaluate(MEASURE);rows.push({game:"diemtrang:dress (Trước gương đồng)",intro:t1,play:t1});await close();
  for(const k of ['theu','nau']){await p.evaluate(k=>{openMG(k,2,()=>{})},k);await p.waitForTimeout(600);const m=await p.evaluate(MEASURE);rows.push({game:"lesson:"+k,intro:m,play:m});await close()}
  out.devs[name]={rows,errs}; await ctx.close()}
 console.log(JSON.stringify(out));await b.close()})();
