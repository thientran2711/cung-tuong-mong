/* r3 (owner OD:L1415): the courtyard picture is ONLY the exact painted state, never a stand-in.
   usage: node dev/test/pl-courtyards-nostandin.js <url of built index.html>
   every rank dir x month x tuần x buổi, plus mourning on/off: kpmArt() must be null or exactly <dir>-<state>.webp where state = tang-<buổi> (mourning) |
   <festival>-<buổi> (festival day) | <mùa>-<buổi> (plain day); null must make kpmMulti() false (tap goes straight to the hall). Prints stand-ins (must be 0) and the null count. */
const {chromium}=require('playwright');
(async()=>{const px=process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'127.0.0.1,localhost'}:undefined;const b=await chromium.launch(px?{proxy:px}:{});
 const p=await(await b.newContext({viewport:{width:755,height:1000},ignoreHTTPSErrors:true})).newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(process.argv[2],{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:180000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}setInterval(()=>{document.querySelectorAll('#kroul,#kroulw,.kroul,#kload').forEach(r=>r.remove())},200)});
 for(let i=0;i<8&&!(await p.evaluate(()=>typeof S!=='undefined'&&!!S&&typeof rivals!=='undefined'&&!!rivals&&rivals.length>0));i++){await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{start()}catch(e){}});await p.waitForTimeout(1500)}
 const r=await p.evaluate(()=>{const dirs=["nhat-cac","nhat-phi-cung","nhat-quy-cung","nhat-vinh-hoa","nhat-can-ninh","nhat-spare-cung"],bad=[],nul={};let n=0,shown=0,multiBad=0;const kd=kpmDir,wt=window.wdTang;const sv=[S.month,S.tuan,S.buoi];
  for(const d of dirs){kpmDir=()=>d;nul[d]=0;for(const tang of [false,true]){window.wdTang=()=>tang;try{wdTang=window.wdTang}catch(e){}
   for(let m=1;m<=12;m++)for(let t=0;t<3;t++)for(let bu=0;bu<4;bu++){S.month=m;S.tuan=t;S.buoi=bu;n++;const A=kpmArt(0),b4=kpmBuoiW(),f=festToday();
    const want=tang?"tang-"+b4:f&&f.k?f.k+"-"+b4:kpmSeason()+"-"+b4;
    if(!A){nul[d]++;if(kpmMulti(0,"x"))multiBad++;continue}shown++;const st=A.src.replace(/^.*img\/pl2\//,"").replace(/\.webp$/,"").slice(d.length+1);
    if(st!==want&&!(f&&f.k&&!tang&&/map-fest/.test(JSON.stringify(f.files||{}))&&st.endsWith("-"+b4)))bad.push([d,m,t,bu,tang,st,want])}}}
  kpmDir=kd;[S.month,S.tuan,S.buoi]=sv;return{n,shown,standIns:bad.length,sample:bad.slice(0,5),nullByDir:nul,multiBad}});
 console.log(JSON.stringify(r),'errs',errs.length);await b.close();process.exit(r.standIns||errs.length?1:0)})();
