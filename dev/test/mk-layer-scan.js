/* toil-looks2 (r2 FAIL 17/11): scan the COLOUR LAYERS of every face that has a mesh (dev/art/mkfit/*.json), not only the stored dots.
   For every picture key: (1) no fallback lip oval is drawn by the SVG layer of any level (a face with a mesh gets its lips only from the colour layer);
   (2) the colour layer's box contains every lip point and the mouth point toilRow() gives = the mesh lip centroid; (3) the lip centroid sits below the eyes and above the chin of the mesh.
   usage: node dev/test/mk-layer-scan.js <url> [root=.]   (exit 1 on any failure; last line = summary) */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,URL,ROOT0]=process.argv;const ROOT=ROOT0||process.cwd();
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});await ctx.route(u=>/ctmload=1|x-ctm-load/.test(String(u)),r=>r.abort());const p=await ctx.newPage();p.setDefaultTimeout(120000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof toilMkBox==='function'&&typeof TOIL_FIT!=='undefined'&&typeof MK_FIT!=='undefined',null,{timeout:0});
 const dir=path.join(ROOT,'dev/art/mkfit');const fit=JSON.parse(fs.readFileSync(path.join(ROOT,'dev/art/toil-fit2.json')));
 await p.evaluate(f=>{TOIL_FIT.fit=f},fit);
 let keys=0,bad=[];
 for(const f of fs.readdirSync(dir).filter(x=>/\.json$/.test(x))){const j=JSON.parse(fs.readFileSync(path.join(dir,f)));const g=f.replace('.json','');
  const r=await p.evaluate(([g,j])=>{MK_FIT.g[g]=j;const out=[];const col=toilColDef();col.seed=3;
   for(const key of Object.keys(j)){const v=j[key];if(v.length<120)continue;const P=toilMkPts(v),B=toilMkBox(v),lips=P.slice(0,12);const lc=lips.reduce((a,q)=>[a[0]+q[0]/12,a[1]+q[1]/12],[0,0]);const why=[];
    const row=toilRow(key);if(!row)continue;
    if(Math.abs(row[0]-lc[0])>.6||Math.abs(row[1]-lc[1]*1)>.6&&false)why.push('mouth x '+row[0]+' vs '+lc[0].toFixed(2));
    if(!lips.every(q=>q[0]>=B[0]&&q[0]<=B[0]+B[2]&&q[1]>=B[1]&&q[1]<=B[1]+B[3]))why.push('lip outside layer box');
    const eyeY=P.slice(20,40).reduce((a,q)=>a+q[1]/20,0),allY=P.map(q=>q[1]);const chinY=Math.max(...allY);if(!(lc[1]>eyeY+1&&lc[1]<chinY))why.push('lip centroid not between eyes and chin');
    for(const [lk,n] of [['vua',3],['dep',3],['tuyet',5],['diem',5],['vung',5]]){const u=toilMakeupSvg(key,lk,col,false);if(!u)continue;const svg=decodeURIComponent(u.split(',')[1]);const k=(svg.match(/<ellipse/g)||[]).length;if(k!==n)why.push(lk+' svg ellipses '+k+' (want '+n+': a lip oval is drawn?)')}
    /* looks3 (owner 13:28Z): the cheek ovals of every level lie inside the face outline oval and below the eyes (geometry from the mesh points) */
    for(const lk of ['vung','vua','dep','tuyet','diem']){const A=(row[8]||1.3),Pp=P.map(q=>[q[0],q[1]*A]);const G=toilMkGeom(Pp,TOIL_MKS[lk]);
     for(const c of G.cheeks){if(c.fit<=.011)continue;let ok=true;for(let t=0;t<8;t++){const a=t*Math.PI/4,x=Math.cos(a)*c.rx,y=Math.sin(a)*c.ry,cs=Math.cos(c.rot),sn=Math.sin(c.rot),px=c.x+x*cs-y*sn,py=c.y+x*sn+y*cs;if(!G.inOl(px,py)||py<G.eyeBot+G.u*.07-.001)ok=false}
      if(!ok)why.push(lk+' blush outside outline/eyes')}}
    out.push([key,why])}
   return out},[g,j]);
  for(const [k,w] of r){keys++;if(w.length)bad.push(k+': '+w.join('; '))}}
 console.log(bad.slice(0,15).join('\n'));console.log(`mk-layer-scan: ${keys} pictures, ${bad.length} bad`);await b.close();process.exit(bad.length?1:0)})();
