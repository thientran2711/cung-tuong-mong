/* one-core-land-kc2-move (review/one-core-dup3-land, ITEM 1 extra finds; ONE CORE OD:L1267): in jkc2.js (new in main's batch-d8) move
   (a) the typed odds base of od(N+…) / od(N) → BAL.kc2.<card>_od[_n]; of roll(N+…) (event options) → BAL.kc2.<option>_rb[_n]
   (b) the typed house-stat amounts kap / kgt / khm of a card's c / w / l → BAL.kc2.<card>_<slot>_<stat> (the other stats were moved by origin-intros)
   into jbal2.js (a second Object.assign(BAL.kc2,{…}) block). <card> = ASCII camel of the first 4 words of the card / option name
   (kcCard n / kcO first string; same rule as the existing BAL.kc2 keys), else the enclosing function. Values unchanged.
   usage: node dev/measure/one-core-land-kc2-move.js   (proof: dev/measure/one-core-dup2-same.js NS kc2) */
const fs=require('fs');const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const F='dev/build/jkc2.js',J='dev/build/jbal2.js';const src=fs.readFileSync(F,'utf8');const ast=acorn.parse(src,{ecmaVersion:'latest'});
const have=Function('const BAL={};'+[...fs.readFileSync(J,'utf8').matchAll(/Object\.assign\(BAL(?:,\{kc2:|\.kc2,)\{[^\n]*\}\}?\);/g)].map(m=>m[0]).join('')+';return BAL.kc2')();
const asc=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D');
const camel=s=>asc(s).replace(/[^A-Za-z0-9 ]/g,' ').trim().split(/\s+/).slice(0,4).map((w,i)=>i?w[0].toUpperCase()+w.slice(1).toLowerCase():w.toLowerCase()).join('');
const num=n=>n&&((n.type==='Literal'&&typeof n.value==='number')||(n.type==='UnaryExpression'&&/^[+-]$/.test(n.operator)&&n.argument.type==='Literal'&&typeof n.argument.value==='number'));
const val=n=>n.type==='Literal'?n.value:(n.operator==='-'?-n.argument.value:+n.argument.value);
const strOf=n=>n&&(n.type==='Literal'&&typeof n.value==='string'?n.value:n.type==='TemplateLiteral'?n.quasis.map(q=>q.value.cooked).join(' '):null);
function site(stack){for(let i=stack.length-1;i>=0;i--){const n=stack[i];
  if(n.type==='CallExpression'&&n.callee.type==='Identifier'){
   if(n.callee.name==='kcCard'&&n.arguments[0]&&n.arguments[0].type==='ObjectExpression'){const p=n.arguments[0].properties.find(p=>p.key&&p.key.name==='n');const s=p&&strOf(p.value);if(s)return camel(s)}
   if(n.callee.name==='kcO'){const s=strOf(n.arguments[0]);if(s)return camel(s)}}
  if(n.type==='FunctionDeclaration'&&n.id)return n.id.name}
 return 'top'}
const K={},edits=[],used={};const put=(base,v)=>{let k=base,i=1;while((have[k]!==undefined&&have[k]!==v)||(K[k]!==undefined&&K[k]!==v)||used[k])k=base+'_'+(++i);if(have[k]!==undefined&&have[k]===v&&!K[k]){used[k]=1;return k}K[k]=v;used[k]=1;return k};
(function walk(n,stack){if(!n||typeof n.type!=='string')return;stack.push(n);
 if(n.type==='CallExpression'&&n.callee.type==='Identifier'&&(n.callee.name==='od'||(n.callee.name==='roll'&&n.arguments[0]&&n.arguments[0].type==='BinaryExpression'))&&n.arguments[0]){let a=n.arguments[0];while(a.type==='BinaryExpression'&&(a.operator==='+'||a.operator==='-'))a=a.left;
  if(num(a)&&val(a)!==0){const k=put(site(stack)+(n.callee.name==='od'?'_od':'_rb'),val(a));edits.push([a.start,a.end,'BAL.kc2.'+k])}}
 if(n.type==='Property'&&n.key&&/^[cwl]$/.test(n.key.name)&&n.value.type==='ObjectExpression')for(const p of n.value.properties){const st=p.key&&(p.key.name||p.key.value);
  if(/^(kap|kgt|khm)$/.test(st)&&num(p.value)&&val(p.value)!==0){const k=put(site(stack)+'_'+n.key.name+'_'+st,val(p.value));edits.push([p.value.start,p.value.end,'BAL.kc2.'+k])}}
 for(const k in n){if(k==='type'||k==='start'||k==='end')continue;const c=n[k];if(Array.isArray(c))c.forEach(x=>walk(x,stack));else if(c&&typeof c.type==='string')walk(c,stack)}
 stack.pop()})(ast,[]);
let out=src;for(const [a,b,r] of edits.sort((x,y)=>y[0]-x[0]))out=out.slice(0,a)+r+out.slice(b);fs.writeFileSync(F,out);
const blk=`/* review/one-core-dup3-land (ONE CORE OD:L1267, dev/measure/one-core-land-kc2-move.js): the odds bases od(N+…) (<card>_od) and the house-stat
   kap / kgt / khm amounts of the jkc2 cards (<card>_<slot>_<stat>) that origin-intros left typed. */
Object.assign(BAL.kc2,${JSON.stringify(K)});
`;
if(!edits.length){console.log('0 numbers');process.exit(0)}let j=fs.readFileSync(J,'utf8');const m=[...j.matchAll(/Object\.assign\(BAL(?:,\{kc2:|\.kc2,)\{[^\n]*\}\}?\);\n/g)].pop();j=j.slice(0,m.index+m[0].length)+blk+j.slice(m.index+m[0].length);fs.writeFileSync(J,j);
console.log(edits.length,'numbers →',Object.keys(K).length,'new BAL.kc2 keys');console.log(JSON.stringify(K))
