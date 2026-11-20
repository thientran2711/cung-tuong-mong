/* one-core-dup3-ev-move (review/one-core-dup3, item 3): copy of one-core-eff-move.js for the EVIDENCE amounts of evA / evStory (chứng cứ):
   key = ev<Site>[_n] in BAL.eff.<module>; the wipe amount -99 ("clear every chứng cứ") is ONE key BAL.evWipe (jbal.js), not a site key.
   ---- original notes: one-core-eff-move (review/one-core-dup, family F3): move the typed amounts of relation / power effect calls (the guard's `amt` kind:
   relAdd, oanAdd, affAdd, kcAf, tdPowAdd, rdOan, rdRel, e67*) of the NON-road, NON-arc modules into BAL.eff (dev/build/jbaleff.js).
   Only calls inside a function body are moved (they run after BAL exists). Key = <module>.<enclosing name>[_<n>]; a `cond?A:B` amount
   becomes [A,B] read as cond?K[0]:K[1]. Writes jbaleff.js and the edited modules.
   usage: node dev/measure/one-core-eff-move.js f1.js,f2.js,…   (proof: dev/measure/one-core-eff-same.js) */
const fs=require('fs');
const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const FN=/^(?:evA|evStory)$/;
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
 const edits=[];const keys=cur[mod]=cur[mod]||{};const used={};const pre=new Set(Object.keys(keys));
 (function walk(n,stack){if(!n||typeof n.type!=='string')return;stack.push(n);
  if(n.type==='CallExpression'&&n.callee.type==='Identifier'&&FN.test(n.callee.name)&&n.arguments.length&&stack.some(x=>/Function/.test(x.type))){
   /* the AMOUNT argument (r1 fix): evStory(t,N,why) = 2nd, evA(h,t,N) = 3rd (before: the LAST argument, so evStory(t,2,"…") was never seen) */
   const a=n.arguments[n.callee.name==='evStory'?1:2]||{type:'none'};let v=null;
   if(num(a)&&val(a)!==0)v={k:'n',x:val(a),a};
   else if(a.type==='ConditionalExpression'&&num(a.consequent)&&num(a.alternate))v={k:'c',x:[val(a.consequent),val(a.alternate)],a};
   if(v&&v.k==='n'&&v.x===-99){edits.push([a.start,a.end,'BAL.evWipe']);v=null}
   if(v){let base='ev'+nameOf(stack.slice(0,-1)).replace(/[^\w$]/g,'_').replace(/^./,c=>c.toUpperCase());let key;do{used[base]=(used[base]||0)+1;key=used[base]>1?base+'_'+used[base]:base}while(pre.has(key))/* r1 fix: never reuse a key an earlier run made */;
    if(keys[key]!==undefined&&JSON.stringify(keys[key])!==JSON.stringify(v.x))throw new Error(f+' key clash '+key);keys[key]=v.x;
    const ref=`BAL.eff.${mod}${/^[A-Za-z_$][\w$]*$/.test(key)?'.'+key:'["'+key+'"]'}`;
    edits.push(v.k==='n'?[a.start,a.end,ref]:[a.consequent.start,a.consequent.end,ref+'[0]'],...(v.k==='c'?[[a.alternate.start,a.alternate.end,ref+'[1]']]:[]))}}
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
