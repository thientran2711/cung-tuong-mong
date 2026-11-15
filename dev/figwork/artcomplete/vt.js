// viewport smoke test: in-process static server on a free port, one browser, closes everything at the end
const http=require('http'),fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const ROOT=process.argv[2];const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.png':'image/png','.webmanifest':'application/json','.mp3':'audio/mpeg'};
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';const f=path.join(ROOT,p);fs.readFile(f,(e,b)=>{if(e){r.statusCode=404;return r.end()}r.setHeader('content-type',T[path.extname(f)]||'application/octet-stream');r.end(b)})});
srv.listen(0,async()=>{const port=srv.address().port;const b=await chromium.launch();const out=[];
 for(const [w,h] of [[755,1000],[1000,755],[1180,820],[1366,1024],[844,390],[390,844]]){const c=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:1});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e).slice(0,160)));
  await p.goto(`http://localhost:${port}/index.html`,{waitUntil:"domcontentloaded",timeout:90000});await p.waitForTimeout(5000);await p.evaluate(()=>{try{if(!(typeof S!=='undefined'&&S&&S.emp))start()}catch(e){}});await p.waitForTimeout(2500);const st=await p.evaluate(()=>typeof S!=='undefined'&&S?Object.keys(S).length:0);
  const r=await p.evaluate(()=>{const o={ovf:document.documentElement.scrollWidth>innerWidth+1};try{
    o.jartc=typeof ageYear==="function"&&String(ageYear).includes("jartc spouse age");
    if(typeof S!=="undefined"&&S&&typeof allKids==="function"){const k={name:"t",hW:{s:{age:22}},pW:{chinh:{age:20},trac:[{age:19}]}};const ak=allKids;window.allKids=allKids=()=>[[k,null]];const a0=S.age;try{ageYear()}finally{window.allKids=allKids=ak;S.age=a0}o.spouse=[k.hW.s.age,k.pW.chinh.age,k.pW.trac[0].age].join(",")}
    else o.spouse="no game state";
    o.roles=JSON.stringify(figRoles({role:"maid",age:40}));const EL=["r0",null,"r2","r3"].flatMap(t=>["a18","a26","a36","a51"].map(a=>({role:"eunuch",identity:"u01",tier:t,ageBand:a,file:"img/fig-eunuch-u01-"+(t||"r1")+"-"+a+".webp",por:"p"})));o.eun=[0,1,2,3,undefined].map(rk=>{const f=f88Best(EL,{role:"eunuch",rk,age:44},"fig");return f&&f.file.slice(19,25)}).join(",");}catch(e){o.err=String(e).slice(0,160)}return o});
  out.push({vp:`${w}x${h}`,st,errs:errs.length,firstErr:errs[0]||"",...r});await c.close()}
 await b.close();srv.close();console.log(JSON.stringify(out,null,1))});
