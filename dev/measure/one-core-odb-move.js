/* one-core-odb-move (review/one-core-jkc-2 item 3, ONE CORE OD:L1267): the guard's odb kind game-wide — the typed odds base of od(N…) and
   roll(N±…) (the one-core-jkc-move.js pattern, any module). Inside a function body only (it runs after BAL exists). The literal N moves to
   BAL.odb.<module>.<site>[_n] (site = the enclosing function / option key / act id, as the other movers name it); the rest of the
   expression stays. Table: one block at the end of dev/build/jbal2.js (Object.assign(BAL,{odb:{…}}), rewritten by this script). Values unchanged.
   usage: node dev/measure/one-core-odb-move.js f1.js,f2.js,…   (proof: dev/measure/one-core-dup2-same.js NS odb) */
const fs=require('fs');const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const files=(process.argv[2]||'').split(',').filter(Boolean);const J='dev/build/jbal2.js';let jsrc=fs.readFileSync(J,'utf8');
const MK='/* ---- review/one-core-jkc-2: BAL.odb (one-core-odb-move.js) ---- */';
const cur=jsrc.includes(MK)?Function('const BAL={};'+jsrc.slice(jsrc.indexOf(MK))+';return BAL.odb')():{};
function nameOf(stack){for(let i=stack.length-1;i>=0;i--){const n=stack[i];
  if(n.type==='FunctionDeclaration'&&n.id)return n.id.name;
  if(n.type==='Property'&&n.key)return n.key.name||String(n.key.value);
  if(n.type==='VariableDeclarator'&&n.id&&n.id.name)return n.id.name;
  if(n.type==='AssignmentExpression'&&n.left.type==='MemberExpression'&&n.left.property)return n.left.property.name||String(n.left.property.value);
  if(n.type==='CallExpression'&&n.arguments[0]&&n.arguments[0].type==='Literal'&&typeof n.arguments[0].value==='string'&&/^[\w$]{2,24}$/.test(n.arguments[0].value)&&stack.slice(i+1).some(x=>/Function/.test(x.type)))return n.arguments[0].value}
 return 'top'}
let tot=0;
for(const f of files){const mod=f.replace(/\.js$/,'');const src=fs.readFileSync('dev/build/'+f,'utf8');const ast=acorn.parse(src,{ecmaVersion:'latest'});
 const keys=cur[mod]=cur[mod]||{};const used={};for(const k in keys){const m=k.match(/^(.*?)(?:_(\d+))?$/);used[m[1]]=Math.max(used[m[1]]||1,+(m[2]||1))}
 const edits=[],sigs={};let left=0;
 (function walk(n,stack){if(!n||typeof n.type!=='string')return;const inFn=stack.some(x=>/Function/.test(x.type));stack.push(n);
  if(n.type==='CallExpression'&&n.callee.type==='Identifier'&&(n.callee.name==='od'||n.callee.name==='roll')&&n.arguments.length){
   let a=n.arguments[0];const isRoll=n.callee.name==='roll';
   if(isRoll&&!(a.type==='BinaryExpression'&&(a.operator==='+'||a.operator==='-')))a=null;
   while(a&&a.type==='BinaryExpression')a=a.left;
   if(a&&a.type==='Literal'&&typeof a.value==='number'&&/^\(\s*$/.test(src.slice(n.callee.end,a.start))&&(!isRoll||/^\s*[+-]/.test(src.slice(a.end)))){
    const sig=src.slice(n.start,n.end).replace(/\s+/g,'');/* the same call text (a preview word(od(N+x)) and its roll(od(N+x))) shares one key */
    if(!inFn)left++;else if(sigs[sig]){edits.push([a.start,a.end,sigs[sig]])}else{let base=nameOf(stack.slice(0,-1)).replace(/[^\w$]/g,'_');base=(isRoll?'rb':'od')+base.replace(/^./,c=>c.toUpperCase());used[base]=(used[base]||0)+1;const key=used[base]>1?base+'_'+used[base]:base;
     if(keys[key]!==undefined)throw new Error(f+' clash '+key);keys[key]=a.value;sigs[sig]=`BAL.odb.${mod}.${key}`;edits.push([a.start,a.end,sigs[sig]])}}}
  for(const k in n){if(k==='type'||k==='start'||k==='end')continue;const c=n[k];if(Array.isArray(c))c.forEach(x=>walk(x,stack));else if(c&&typeof c.type==='string')walk(c,stack)}
  stack.pop()})(ast,[]);
 let out=src;for(const [a,b,r] of edits.sort((x,y)=>y[0]-x[0]))out=out.slice(0,a)+r+out.slice(b);
 if(edits.length){acorn.parse(out,{ecmaVersion:'latest'});fs.writeFileSync('dev/build/'+f,out)}tot+=edits.length;console.log(f,edits.length,'moved',left?left+' left (load time)':'')}
const body=Object.keys(cur).sort().map(m=>' '+m+':{'+Object.entries(cur[m]).map(([k,v])=>k+':'+JSON.stringify(v)).join(',')+'}').join(',\n');
const block=MK+`
/* BAL.odb.<module>.<site> = the odds base N of od(N…) (key od<Site>) / roll(N±…) (key rb<Site>) the module rolls (the guard's odb kind);
   site = the enclosing function / option key / act id (_2, _3 … for the next ones in it); the same call text (a preview word(od(N+x)) and the
   roll(od(N+x)) of its handler) reads one key. Moved from inline literals, values unchanged. */
Object.assign(BAL,{odb:{
${body}
}});
`;
jsrc=jsrc.includes(MK)?jsrc.slice(0,jsrc.indexOf(MK))+block:jsrc.replace(/\n*$/,'\n')+block;fs.writeFileSync(J,jsrc);console.log('total',tot);
