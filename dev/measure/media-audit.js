/* design-scale media audit (review/design-scale, owner OD 16/11 07:47Z + 07:50Z).
   Lists every CSS @media rule (p1.html + dev/build/j*.js) and every JS width/height breakpoint, and evaluates each one INSIDE the design
   canvas, where the game only ever sees the design sizes: spread 1180x820 (landscape) and page PAGE_W x 820 (portrait), plus the old 755x1000.
   Class: DEAD = matches at no design size (never fires inside the canvas) · ALWAYS = matches at all · LAND = only landscape spread ·
   PAGE = only the one-page view. usage: node dev/measure/media-audit.js [pageW=600] > report.md */
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');
const B=path.join(__dirname,'../build');const PW=+(process.argv[2]||600);
const files=['p1.html',...fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f)&&!/^all/.test(f))];
const Q=[];for(const f of files){const t=fs.readFileSync(path.join(B,f),'utf8').split('\n');
 t.forEach((l,i)=>{for(const m of l.matchAll(/@media\s*([^{]+)\{/g))Q.push({f,l:i+1,q:m[1].trim(),kind:'css'});
  for(const m of l.matchAll(/matchMedia\(\s*["'`]([^"'`]+)["'`]/g))Q.push({f,l:i+1,q:m[1].trim(),kind:'js'});
  for(const m of l.matchAll(/inner(Width|Height)\s*(<=|>=|<|>)\s*(\d+)/g))Q.push({f,l:i+1,q:`(${m[1]==='Width'?'w':'h'} ${m[2]} ${m[3]})`,kind:'jsnum',d:m[1],op:m[2],n:+m[3]})})}
(async()=>{const b=await chromium.launch();const S={L:[1180,820],P:[PW,820],OLD:[755,1000]};const R={};
 for(const [k,[w,h]] of Object.entries(S)){const p=await b.newPage({viewport:{width:w,height:h}});await p.setContent('<html></html>');
  R[k]=await p.evaluate(qs=>qs.map(x=>{if(x.kind==='jsnum'){const v=x.d==='Width'?innerWidth:innerHeight;return {'<':v<x.n,'>':v>x.n,'<=':v<=x.n,'>=':v>=x.n}[x.op]}
   try{return matchMedia(x.q).matches}catch(e){return null}}),Q);await p.close()}
 await b.close();
 const cls=i=>{const l=R.L[i],p=R.P[i];return /reduced-motion|hover|pointer|display-mode/.test(Q[i].q)?'ENV':l&&p?'ALWAYS':!l&&!p?'DEAD':l?'LAND':'PAGE'};
 const rows=Q.map((x,i)=>({...x,c:cls(i),old:R.OLD[i]}));const cnt={};rows.forEach(r=>cnt[r.c]=(cnt[r.c]||0)+1);
 console.log(`# media audit · spread 1180x820 · page ${PW}x820 · ${rows.length} breakpoints\n\n`+Object.entries(cnt).map(([k,v])=>`- ${k}: ${v}`).join('\n')+'\n');
 for(const c of ['PAGE','LAND','ALWAYS','DEAD','ENV']){const rs=rows.filter(r=>r.c===c);if(!rs.length)continue;console.log(`\n## ${c} (${rs.length})\n| file:line | kind | query | old 755x1000 |\n|---|---|---|---|`);
  rs.forEach(r=>console.log(`| ${r.f}:${r.l} | ${r.kind} | \`${r.q.replace(/\|/g,'\\|')}\` | ${r.old?'on':'off'} |`))}})();
