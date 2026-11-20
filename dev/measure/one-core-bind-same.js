/* one-core-bind-same (review/one-core-dup2 r3): BEFORE / AFTER render proof for the r3 bind fixes. For every module that differs from a git ref:
   (1) the words every text prints: ${balSg / balAb / balOan(BAL…)} → the words (values from BAL, both sides; a pet table getter that prints its own
       field, ${balAb(this.soft)}, → that field's value), then every numeric BAL read put back as its value, both sides (one-core-text.js proof());
   (2) the programs compared (acorn AST, positions / quote style ignored) with three neutral rewrites: `x + (-n)` ≡ `x - n` (a typed `-8` moved to
       `+BAL…` holding -8), get x(){return `…`} ≡ x:`…`, and the j17 lazy AOUT pairs aoLz(a,()=>`…`) ≡ [a,`…`] (aoLz itself dropped);
   (3) jbaleff.js: every key of the ref keeps its value; the new keys are listed.
   Identical = every player text reads exactly as before and no rule value changed.
   usage: node dev/measure/one-core-bind-same.js [old-ref]   (exit 1 on any difference) */
const fs=require('fs'),cp=require('child_process'),path=require('path'),vm=require('vm');
const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const {proof,loadBAL}=require('../test/one-core-text.js');
const REF=process.argv[2]||'origin/review/one-core-dup2-r2';
const B=path.join(__dirname,'..','build');const {printed,back}=proof(B);
const sg=n=>(n>0?'+':n<0?'-':'')+Math.abs(n);
/* ${balAb(this.k)} / ${balSg(this.k)} inside an object literal → the sibling field k's value */
function selfPrints(src){const ast=acorn.parse(src,{ecmaVersion:'latest'});const R=[];
 (function w(n,objs){if(!n||typeof n.type!=='string')return;if(n.type==='ObjectExpression')objs=objs.concat([n]);
  if(n.type==='TemplateLiteral')n.expressions.forEach(e=>{if(e.type==='CallExpression'&&e.callee.type==='Identifier'&&/^bal(Ab|Sg)$/.test(e.callee.name)&&e.arguments[0]&&e.arguments[0].type==='MemberExpression'&&e.arguments[0].object.type==='ThisExpression'){
   const k=e.arguments[0].property.name;const o=objs[objs.length-1];const p=o&&o.properties.find(p=>p.key&&(p.key.name===k)&&p.value.type==='Literal');if(p){const v=p.value.value;R.push([e.start-2,e.end+1,e.callee.name==='balAb'?String(Math.abs(v)):sg(v)])}}});
  for(const k in n){if(k==='type'||k==='start'||k==='end')continue;const c=n[k];if(Array.isArray(c))c.forEach(x=>w(x,objs));else if(c&&typeof c.type==='string')w(c,objs)}})(ast,[]);
 R.sort((a,b)=>b[0]-a[0]);for(const [a,b,t] of R)src=src.slice(0,a)+t+src.slice(b);return src}
const norm=ast=>JSON.stringify(ast,(k,v)=>{if(k==='start'||k==='end'||k==='raw')return undefined;
 if(v&&v.type==='Program')return Object.assign({},v,{body:v.body.filter(s=>!(s.type==='FunctionDeclaration'&&s.id.name==='aoLz'))});
 if(v&&v.type==='CallExpression'&&v.callee.type==='Identifier'&&v.callee.name==='aoLz')return{type:'ArrayExpression',elements:v.arguments.map(a=>a.type==='ArrowFunctionExpression'&&a.expression?a.body:a)};
 if(v&&v.type==='BinaryExpression'&&v.operator==='+'&&v.right.type==='UnaryExpression'&&v.right.operator==='-'&&v.right.argument.type==='Literal')return Object.assign({},v,{operator:'-',right:v.right.argument});
 if(v&&v.type==='Property'&&v.kind==='get'&&v.value&&v.value.body&&v.value.body.body.length===1&&v.value.body.body[0].type==='ReturnStatement')return{type:'Property',method:false,shorthand:false,computed:v.computed,key:v.key,value:v.value.body.body[0].argument,kind:'init'};
 if(v&&v.type==='TemplateLiteral'&&v.expressions.length===0&&v.quasis.length===1)return{S:v.quasis[0].value.cooked};
 if(v&&v.type==='Literal'&&typeof v.value==='string')return{S:v.value};return v});
const changed=cp.execSync(`git diff --name-only ${REF} -- dev/build`,{encoding:'utf8'}).split('\n').filter(f=>/^dev\/build\/j[\w]*\.js$/.test(f)&&!/jbal\.js$|jbaleff\.js$/.test(f));
let bad=[],rows=[];
for(const f of changed){const OLD=cp.execSync(`git show ${REF}:${f}`,{encoding:'utf8',maxBuffer:1<<26});const NEW=fs.readFileSync(f,'utf8');
 let same;try{same=norm(acorn.parse(back(printed(selfPrints(NEW))),{ecmaVersion:'latest'}))===norm(acorn.parse(back(printed(selfPrints(OLD))),{ecmaVersion:'latest'}))}catch(e){same=false;bad.push(f+': '+e.message)}
 if(!same)bad.push(f+': program or printed text differs');rows.push(`| ${path.basename(f)} | ${same?'identical':'DIFFERS'} |`)}
/* jbaleff: the ref's keys keep their values */
const tmp=fs.mkdtempSync(path.join(require('os').tmpdir(),'ocb-'));for(const f of ['jbal.js','jbal2.js','jbaleff.js','jbalroad.js'])fs.writeFileSync(path.join(tmp,f),cp.execSync(`git show ${REF}:dev/build/${f}`,{encoding:'utf8',maxBuffer:1<<26}));
const E0=loadBAL(tmp).eff,E1=loadBAL(B).eff;const added=[];
for(const m in E1)for(const k in E1[m]){if(!(m in E0)||!(k in E0[m]))added.push(`${m}.${k}=${JSON.stringify(E1[m][k])}`)}
for(const m in E0)for(const k in E0[m]){if(!E1[m]||JSON.stringify(E1[m][k])!==JSON.stringify(E0[m][k]))bad.push(`BAL.eff.${m}.${k}: ${JSON.stringify(E0[m][k])} -> ${JSON.stringify(E1[m]&&E1[m][k])}`)}
fs.rmSync(tmp,{recursive:true});
console.log('| module | text + code vs '+REF+' |\n|---|---|\n'+rows.join('\n'));
console.log('jbaleff: every key of '+REF+' unchanged; new keys ('+added.length+'): '+added.join(', '));
console.log(JSON.stringify({modules:rows.length,fails:bad.length,newKeys:added.length}));
if(bad.length){console.log('FAIL\n  '+bad.join('\n  '));process.exit(1)}console.log('PASS: every text prints the same words as before; no rule value changed');
