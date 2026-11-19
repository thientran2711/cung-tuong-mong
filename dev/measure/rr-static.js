/* rare-reach static scan: for every hidden-chain rare (j97 R97 arcs + jroad RD97L road finales), does each path / bad name match at least
   one real option of that arc (road: any chapter .4–.11 of the road, plus shared G. beats)? A path name that matches nothing can never
   count; a chain whose live path names < np can never be met (law 2/3 → fix the chain).
   usage: node dev/measure/rr-static.js <dev/index.html> [out.json] */
const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.route(/\.(webp|png|jpe?g|mp3|ogg|m4a)(\?|$)/i,r=>r.abort());
 await p.goto('file://'+require('path').resolve(process.argv[2]),{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof R97==='object');
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;start()});await p.waitForTimeout(500);
 const out=await p.evaluate(()=>{const res=[];const road=new Set((window.RD97L||[]).map(d=>d.a));
  const names=ids=>{const N=[];for(const id of ids){const a=ARC67[id];if(!a)continue;const A={a:id,act:{},f:{},sc:0,used:[],hist:[],q97:{p:0,b:0}};
    const bs=Object.values(a.B||{});for(const bd of bs){let o=[];try{o=typeof bd.o==="function"?bd.o(A):bd.o}catch(e){}(o||[]).forEach(x=>x&&x.n&&N.push(String(x.n)))}
    for(const ph of (a.p||[]))for(const bid of (ph||[]))if(String(bid).startsWith("G.")){const g=GB67[bid.slice(2)];let o=[];try{o=typeof g.o==="function"?g.o(A):g.o}catch(e){}(o||[]).forEach(x=>x&&x.n&&N.push(String(x.n)))}}return N};
  for(const id in R97){const d=R97[id];const isR=road.has(id);let ids=[id];if(isR){const base=id.replace(/_\d+$/,"");ids=Object.keys(ARC67).filter(k=>k.startsWith(base+"_"))}
   const N=names(ids);const live=(d.path||[]).filter(x=>N.some(n=>n.includes(x)));const dead=(d.path||[]).filter(x=>!N.some(n=>n.includes(x)));
   const badDead=(d.bad||[]).filter(x=>!N.some(n=>n.includes(x)));
   res.push({id,src:isR?"road":"arc",np:d.np||2,sc:d.sc||0,p:d.p,path:(d.path||[]).length,live:live.length,dead,badDead,need:d.need||"",x:d.x?String(d.x[1]):"",nOpts:N.length})}
  return res});
 if(process.argv[3])fs.writeFileSync(process.argv[3],JSON.stringify(out,null,1));
 const bad=out.filter(r=>r.live<r.np);console.log("defs",out.length,"arc",out.filter(r=>r.src==="arc").length,"road",out.filter(r=>r.src==="road").length);
 console.log("chains that can never be met (live path names < np):",bad.length);bad.forEach(r=>console.log(" ",r.id,r.src,"live",r.live,"/",r.path,"np",r.np,"dead:",JSON.stringify(r.dead)));
 const part=out.filter(r=>r.live>=r.np&&r.dead.length);console.log("chains with some dead path names:",part.length);part.forEach(r=>console.log(" ",r.id,"live",r.live,"/",r.path,"np",r.np,"dead:",JSON.stringify(r.dead)));
 const bd=out.filter(r=>r.badDead.length);console.log("bad names matching nothing:",bd.length);bd.forEach(r=>console.log(" ",r.id,JSON.stringify(r.badDead)));
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
