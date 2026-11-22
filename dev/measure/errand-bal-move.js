/* errand-bal-move (review/errand-bal, law 4 ONE CORE + law 11 whole family): the bare typed odds of roll(N) and j95dice(N) / j95dice(N±…)
   in the errand / servant / exam modules move to BAL.odb.<module>.<site> (key rl<Site> for roll, dc<Site> for j95dice; site = the enclosing
   function / option key, as one-core-odb-move.js names it). Inside a function body only. Values unchanged. The BAL.odb block of jbal2.js is
   rewritten IN PLACE (the block no longer sits at the end of the file). Extra hand keys: EXTRA below (sites edited by hand, same table).
   usage: node dev/measure/errand-bal-move.js j42.js,j95.js,…   (re-run is a no-op) */
const fs=require('fs');const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const files=(process.argv[2]||'').split(',').filter(Boolean);const J='dev/build/jbal2.js';let jsrc=fs.readFileSync(J,'utf8');
const MK='/* ---- review/one-core-jkc-2: BAL.odb (one-core-odb-move.js) ---- */';
const a0=jsrc.indexOf(MK);if(a0<0)throw new Error('no odb block');const a1=jsrc.indexOf('\n}});',a0)+5;
const cur=Function('const BAL={};'+jsrc.slice(a0,a1)+';return BAL.odb')();
const EXTRA={j95:{dcPrepTell:80}};/* j95 j95pre: a rival's eunuch tells her of the plot being prepared (its ag2Ch utility × the same 80) */
for(const m in EXTRA){cur[m]=cur[m]||{};for(const k in EXTRA[m])if(cur[m][k]===undefined)cur[m][k]=EXTRA[m][k]}
function nameOf(stack){for(let i=stack.length-1;i>=0;i--){const n=stack[i];
  if(n.type==='FunctionDeclaration'&&n.id)return n.id.name;
  if(n.type==='Property'&&n.key)return n.key.name||String(n.key.value);
  if(n.type==='VariableDeclarator'&&n.id&&n.id.name)return n.id.name;
  if(n.type==='AssignmentExpression'&&n.left.type==='MemberExpression'&&n.left.property)return n.left.property.name||String(n.left.property.value);
  if(n.type==='CallExpression'&&n.arguments[0]&&n.arguments[0].type==='Literal'&&typeof n.arguments[0].value==='string'&&/^[\w$]{2,24}$/.test(n.arguments[0].value)&&stack.slice(i+1).some(x=>/Function/.test(x.type)))return n.arguments[0].value}
 return 'top'}
let tot=0;const rows=[];
for(const f of files){const mod=f.replace(/\.js$/,'');const src=fs.readFileSync('dev/build/'+f,'utf8');const ast=acorn.parse(src,{ecmaVersion:'latest',locations:true});
 const keys=cur[mod]=cur[mod]||{};const used={};for(const k in keys){const m=k.match(/^(.*?)(?:_(\d+))?$/);used[m[1]]=Math.max(used[m[1]]||1,+(m[2]||1))}
 const edits=[];let left=0;
 (function walk(n,stack){if(!n||typeof n.type!=='string')return;const inFn=stack.some(x=>/Function/.test(x.type));stack.push(n);
  if(n.type==='CallExpression'&&n.callee.type==='Identifier'&&(n.callee.name==='roll'||n.callee.name==='j95dice')&&n.arguments.length){
   const isRoll=n.callee.name==='roll';let a=n.arguments[0];
   if(isRoll){if(!(a.type==='Literal'))a=null}else{while(a&&a.type==='BinaryExpression'&&(a.operator==='+'||a.operator==='-'))a=a.left}
   if(a&&a.type==='Literal'&&typeof a.value==='number'&&/^\(\s*$/.test(src.slice(n.callee.end,a.start))){
    if(!inFn)left++;else{let base=nameOf(stack.slice(0,-1)).replace(/[^\w$]/g,'_');base=(isRoll?'rl':'dc')+base.replace(/^./,c=>c.toUpperCase());used[base]=(used[base]||0)+1;const key=used[base]>1?base+'_'+used[base]:base;
     if(keys[key]!==undefined)throw new Error(f+' clash '+key);keys[key]=a.value;edits.push([a.start,a.end,`BAL.odb.${mod}.${key}`]);rows.push([f,a.loc.start.line,src.slice(n.start,Math.min(n.end,n.start+40)),`BAL.odb.${mod}.${key}`,a.value])}}}
  for(const k in n){if(k==='type'||k==='start'||k==='end'||k==='loc')continue;const c=n[k];if(Array.isArray(c))c.forEach(x=>walk(x,stack));else if(c&&typeof c.type==='string')walk(c,stack)}
  stack.pop()})(ast,[]);
 let out=src;for(const [a,b,r] of edits.sort((x,y)=>y[0]-x[0]))out=out.slice(0,a)+r+out.slice(b);
 if(edits.length){acorn.parse(out,{ecmaVersion:'latest'});fs.writeFileSync('dev/build/'+f,out)}tot+=edits.length;console.log(f,edits.length,'moved',left?left+' left (load time)':'')}
const head=jsrc.slice(a0,jsrc.indexOf('Object.assign(BAL,{odb:{',a0));
const body=Object.keys(cur).sort().map(m=>' '+m+':{'+Object.entries(cur[m]).map(([k,v])=>k+':'+JSON.stringify(v)).join(',')+'}').join(',\n');
jsrc=jsrc.slice(0,a0)+head+'Object.assign(BAL,{odb:{\n'+body+'\n}});'+jsrc.slice(a1);fs.writeFileSync(J,jsrc);
if(process.env.EB_ROWS)fs.writeFileSync(process.env.EB_ROWS,JSON.stringify(rows));console.log('total',tot);
