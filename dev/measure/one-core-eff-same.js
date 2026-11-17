/* one-core-eff-same (review/one-core-dup, family F3): BEFORE / AFTER proof for one-core-eff-move.js. For every module that reads
   BAL.eff, put the BAL value back in place of each BAL.eff.<module>.<site>[i] reference and compare the program with the module at a git
   ref (acorn AST, positions and raw text ignored): identical ASTs = every amount unchanged and nothing else touched.
   usage: node dev/measure/one-core-eff-same.js [old-ref]   (exit 1 on any difference) */
const fs=require('fs'),cp=require('child_process');
const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const REF=process.argv[2]||'origin/main';
const EFF=Function('const BAL={};'+fs.readFileSync('dev/build/jbaleff.js','utf8')+';return BAL.eff')();
/* review/one-core-dup r2: a text that PRINTS a constant (${balSg(BAL.eff.m.k)} → "+4" / "-4", ${balAb(…)} → "4") is put back as the old typed words too, and a "…"
   string equals a `…` template without ${} (the text moved from a string to a template to print the constant) */
const REFRE='BAL\\.eff\\.([\\w$]+)(?:\\.([\\w$]+)|\\["([^"]+)"\\])(?:\\[([01])\\])?';
const printed=src=>src.replace(new RegExp('\\$\\{bal(Sg|Ab)\\('+REFRE+'\\)\\}','g'),(m,fn,md,k1,k2,i)=>{let v=EFF[md][k1||k2];if(i!=null)v=v[+i];return fn==='Sg'?(v>0?'+':v<0?'-':'')+Math.abs(v):String(Math.abs(v))});
const strip=n=>JSON.stringify(n,(k,v)=>{if(k==='start'||k==='end'||k==='raw')return undefined;
 if(v&&v.type==='TemplateLiteral'&&v.expressions.length===0&&v.quasis.length===1)return{S:v.quasis[0].value.cooked};
 if(v&&v.type==='Literal'&&typeof v.value==='string')return{S:v.value};return v});
const lit=v=>v<0?`(-${-v})`:String(v);
let n=0,bad=[];const rows=[];
for(const mod of Object.keys(EFF)){const f=mod+'.js';const NEW=fs.readFileSync('dev/build/'+f,'utf8');let OLD;try{OLD=cp.execSync(`git show ${REF}:dev/build/${f}`,{encoding:'utf8',maxBuffer:1<<26})}catch(e){bad.push(f+': not at '+REF);continue}
 let c=0;const back=printed(NEW).replace(/BAL\.eff\.([\w$]+)(?:\.([\w$]+)|\["([^"]+)"\])(?:\[([01])\])?/g,(m,md,k1,k2,i)=>{const v=EFF[md][k1||k2];if(v===undefined){bad.push(`${f}: ${m} has no value`);return m}c++;return lit(i!=null?v[+i]:v)});
 /* -(10) parses as UnaryExpression(Literal 10), the same node as -10 */
 const same=strip(acorn.parse(back,{ecmaVersion:'latest'}))===strip(acorn.parse(OLD,{ecmaVersion:'latest'}));if(!same)bad.push(f+': program differs after putting the values back');
 n+=c;rows.push(`| ${f} | ${c} | ${Object.keys(EFF[mod]).length} | ${same?'identical':'DIFFERS'} |`)}
console.log('| module | refs | BAL.eff keys | AST vs '+REF+' |\n|---|---|---|---|\n'+rows.join('\n'));
console.log(JSON.stringify({modules:rows.length,refs:n,fails:bad.length}));
if(bad.length){console.log('FAIL\n  '+bad.join('\n  '));process.exit(1)}console.log('PASS: every moved amount equals its old literal; nothing else changed');
