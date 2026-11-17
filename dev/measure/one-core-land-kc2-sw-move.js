/* one-core-dup3-stat-move (review/one-core-dup3, item 3 'maid / kid typed amounts', whole family): the typed amount of a PERSON stat write
   x.loyal / .tin (servant Lòng / tin), .tal / .hp (a child's tài / sức khỏe), .fond (thương), .me (the men's mê) = x.p+N, cl((x.p||d)+N,…), x.p+=N.
   The amount moves to BAL.eff.<module>.<p><Site>[_n] (the operator stays typed: x.p-12 → x.p-BAL.eff.m.loyalGo with 12 stored);
   the default (x.p||50) and the clamp bounds stay. Copy of one-core-dup3-ev-move.js / one-core-eff-move.js.
   ---- original notes: one-core-eff-move (review/one-core-dup, family F3): move the typed amounts of relation / power effect calls (the guard's `amt` kind:
   relAdd, oanAdd, affAdd, kcAf, tdPowAdd, rdOan, rdRel, e67*) of the NON-road, NON-arc modules into BAL.eff (dev/build/jbaleff.js).
   Only calls inside a function body are moved (they run after BAL exists). Key = <module>.<enclosing name>[_<n>]; a `cond?A:B` amount
   becomes [A,B] read as cond?K[0]:K[1]. Writes jbaleff.js and the edited modules.
   usage: node dev/measure/one-core-eff-move.js f1.js,f2.js,…   (proof: dev/measure/one-core-eff-same.js) */
const fs=require('fs');
const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const PROPS=new Set(['oan','kap','kgt','khm']);
const files=(process.argv[2]||'').split(',').filter(Boolean);
const OUT='dev/build/jbaleff.js';
const cur=fs.existsSync(OUT)?Function('const BAL={};'+fs.readFileSync(OUT,'utf8')+';return BAL.eff')():{};
const num=n=>n&&((n.type==='Literal'&&typeof n.value==='number')||(n.type==='UnaryExpression'&&/^[+-]$/.test(n.operator)&&n.argument.type==='Literal'&&typeof n.argument.value==='number'));
const val=n=>n.type==='Literal'?n.value:(n.operator==='-'?-n.argument.value:+n.argument.value);
function nameOf(stack){for(let i=stack.length-1;i>=0;i--){const n=stack[i],p=stack[i-1];
  if(n.type==='FunctionDeclaration'&&n.id)return n.id.name;
  if(n.type==='Property'&&n.key)return n.key.name||String(n.key.value);
  if(n.type==='VariableDeclarator'&&n.id&&n.id.name)return n.id.name;
  if(n.type==='AssignmentExpression'&&n.left.type==='MemberExpression'&&n.left.property)return n.left.property.name||String(n.left.property.value);
  if(n.type==='CallExpression'&&n.arguments[0]&&n.arguments[0].type==='Literal'&&typeof n.arguments[0].value==='string'&&/^[\w$]{2,24}$/.test(n.arguments[0].value)&&stack.slice(i+1).some(x=>/Function/.test(x.type)))return n.arguments[0].value}
 return 'top'}
for(const f of files){const mod=f.replace(/\.js$/,'');const src=fs.readFileSync('dev/build/'+f,'utf8');const ast=acorn.parse(src,{ecmaVersion:'latest'});
 const edits=[];const keys=cur[mod]=cur[mod]||{};const used={};
 (function walk(n,stack){if(!n||typeof n.type!=='string')return;stack.push(n);
  if(n.type==='AssignmentExpression'&&n.left.type==='MemberExpression'&&!n.left.computed&&PROPS.has(n.left.property.name)&&stack.some(x=>/Function/.test(x.type))){
   const p=n.left.property.name;const reads=x=>{let r=false;(function w(y){if(!y||typeof y.type!=='string'||r)return;if(y.type==='MemberExpression'&&!y.computed&&y.property.name===p)r=true;for(const k in y){if(k==='type'||k==='start'||k==='end')continue;const c=y[k];if(Array.isArray(c))c.forEach(w);else if(c&&typeof c.type==='string')w(c)}})(x);return r};
   const hits=[];
   if((n.operator==='+='||n.operator==='-=')&&n.right.type==='Literal'&&typeof n.right.value==='number'&&n.right.value!==0)hits.push(n.right);
   else if(n.operator==='=')(function w(y){if(!y||typeof y.type!=='string')return;if(y.type==='LogicalExpression')return;/* the default (x.p||50) stays */
     if(y.type==='BinaryExpression'&&(y.operator==='+'||y.operator==='-')&&y.right.type==='Literal'&&typeof y.right.value==='number'&&y.right.value!==0&&reads(y.left))hits.push(y.right);
     for(const k in y){if(k==='type'||k==='start'||k==='end')continue;const c=y[k];if(Array.isArray(c))c.forEach(w);else if(c&&typeof c.type==='string')w(c)}})(n.right);
   for(const a of hits){let base=p+nameOf(stack.slice(0,-1)).replace(/[^\w$]/g,'_').replace(/^./,c=>c.toUpperCase());used[base]=(used[base]||0)+1;const key=used[base]>1?base+'_'+used[base]:base;
    if(keys[key]!==undefined&&JSON.stringify(keys[key])!==JSON.stringify(a.value))throw new Error(f+' key clash '+key);keys[key]=a.value;
    edits.push([a.start,a.end,`BAL.eff.${mod}.${key}`])}}
  for(const k in n){if(k==='type'||k==='start'||k==='end')continue;const c=n[k];if(Array.isArray(c))c.forEach(x=>walk(x,stack));else if(c&&typeof c.type==='string')walk(c,stack)}
  stack.pop()})(ast,[]);
 let out=src;for(const [a,b,r] of edits.sort((x,y)=>y[0]-x[0]))out=out.slice(0,a)+r+out.slice(b);
 if(edits.length)fs.writeFileSync('dev/build/'+f,out);console.log(f,edits.length,'amounts →',`BAL.eff.${mod}`)}
const body=Object.keys(cur).sort().map(m=>' '+m+':{'+Object.entries(cur[m]).map(([k,v])=>(/^[A-Za-z_$][\w$]*$/.test(k)?k:JSON.stringify(k))+':'+JSON.stringify(v)).join(',')+'}').join(',\n');
fs.writeFileSync(OUT,`/* ================= jbaleff: ONE CORE (OD:L1267) amounts of relation / power effects (review/one-core-dup, family F3) =================
   BAL.eff.<module>.<site> = the amount the module's effect call applies (relAdd thiện cảm, oanAdd oán, affAdd, kcAf, tdPowAdd …);
   [a,b] = the two amounts of a \`cond ? a : b\` call. Site = the enclosing function / option key (_2, _3 … for the next calls in it).
   Moved from inline literals by dev/measure/one-core-eff-move.js; proof dev/measure/one-core-eff-same.js (values unchanged).
   ev<Site> = chứng cứ (evidence) count of an evA / evStory call (review/one-core-dup3, dev/measure/one-core-dup3-ev-move.js);
   loyal / tin / tal / hp / fond / me<Site> = the amount of a person-stat write x.p±N (the sign stays typed in the code; dev/measure/one-core-dup3-stat-move.js);
   j42 merit* / srvErrandDone_2 / srvDoOrder_2 = Công lao (srvMerit) of the servant acts (review/one-core-dup3). */
Object.assign(BAL,{eff:{
${body}
}});
`);
