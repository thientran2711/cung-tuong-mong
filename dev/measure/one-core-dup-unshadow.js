/* one-core-dup-unshadow (review/one-core-dup): delete the DEAD earlier copies of top-level functions declared in two modules (or twice in
   one). The game is ONE script, so only the LAST declaration ever runs (hoisting); the earlier ones are second tables nobody reads.
   usage: node dev/measure/one-core-dup-unshadow.js name1,name2,…   (then prove with one-core-dup-same.js) */
const fs=require('fs');const names=new Set((process.argv[2]||'').split(',').filter(Boolean));
const order=fs.readFileSync('dev/build/assemble.py','utf8').match(/for f in \[([^\]]+)\]/)[1].match(/'([^']+)'/g).map(s=>s.slice(1,-1));
const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const defs=[];/* [file, name, a, b] in script order */
for(const f of order){const src=fs.readFileSync('dev/build/'+f,'utf8');for(const n of acorn.parse(src,{ecmaVersion:'latest',sourceType:'script'}).body)if(n.type==='FunctionDeclaration'&&names.has(n.id.name))defs.push([f,n.id.name,n.start,n.end])}
const last={};for(const d of defs)last[d[1]]=d;
const cut={};for(const d of defs)if(last[d[1]]!==d)(cut[d[0]]=cut[d[0]]||[]).push(d);
for(const f in cut){let src=fs.readFileSync('dev/build/'+f,'utf8');for(const [,n,a,b] of cut[f].sort((x,y)=>y[2]-x[2])){
  let A=a,Bb=b;if(src[Bb]===';')Bb++;const ls=src.lastIndexOf('\n',A-1)+1,le=src.indexOf('\n',Bb);/* a whole line → drop the line */
  if(src.slice(ls,A).trim()===''&&src.slice(Bb,le<0?src.length:le).trim()===''){A=ls;Bb=le<0?src.length:le+1}
  console.log(`${f}: removed dead ${n} (${b-a} chars; live copy in ${last[n][0]})`);src=src.slice(0,A)+src.slice(Bb)}
 fs.writeFileSync('dev/build/'+f,src)}
