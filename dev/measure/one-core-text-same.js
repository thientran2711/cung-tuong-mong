/* one-core-text-same (review/one-core-dup r2): BEFORE / AFTER proof for one-core-text-move.js. For every module that differs from a git ref,
   print what the new code prints with the old words: ${balSg(BAL.eff.m.k)} → "+4" / "-4", ${balAb(…)} → "4" (values from BAL), then put the
   value back in every remaining BAL.eff.m.k read (as one-core-eff-same.js does) in BOTH versions, and compare the programs (acorn AST, positions
   and quote style ignored; a "…" string and a `…` template without ${} are the same string). Identical = every player text reads exactly as
   before and nothing else changed.
   usage: node dev/measure/one-core-text-same.js [old-ref]   (default origin/review/one-core-dup-r1; exit 1 on any difference) */
const fs=require('fs'),cp=require('child_process'),path=require('path');
const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const {proof}=require('../test/one-core-text.js');
const REF=process.argv[2]||'origin/review/one-core-dup2-r1';
const B=path.join(__dirname,'..','build');const {printed,back}=proof(B);
const norm=ast=>JSON.stringify(ast,(k,v)=>{if(k==='start'||k==='end'||k==='raw')return undefined;
 if(v&&v.type==='Property'&&v.kind==='get'&&v.value&&v.value.body&&v.value.body.body.length===1&&v.value.body.body[0].type==='ReturnStatement')return{type:'Property',method:false,shorthand:false,computed:v.computed,key:v.key,value:v.value.body.body[0].argument,kind:'init'};/* get x(){return `…`} ≡ x:`…` (a text that must be read lazily, review/one-core-dup r2) */
 if(v&&v.type==='TemplateLiteral'&&v.expressions.length===0&&v.quasis.length===1)return{S:v.quasis[0].value.cooked};
 if(v&&v.type==='Literal'&&typeof v.value==='string')return{S:v.value};return v});
const changed=cp.execSync(`git diff --name-only ${REF} -- dev/build`,{encoding:'utf8'}).split('\n').filter(f=>/^dev\/build\/j[\w]*\.js$/.test(f)&&!/jbal\.js$/.test(f));
let bad=[],rows=[];
for(const f of changed){const OLD=cp.execSync(`git show ${REF}:${f}`,{encoding:'utf8',maxBuffer:1<<26});const NEW=fs.readFileSync(f,'utf8');
 const nPrint=(NEW.match(/\$\{bal(?:Sg|Ab)\(/g)||[]).length;
 let same;try{same=norm(acorn.parse(back(printed(NEW)),{ecmaVersion:'latest'}))===norm(acorn.parse(back(printed(OLD)),{ecmaVersion:'latest'}))}catch(e){same=false;bad.push(f+': '+e.message)}
 if(!same)bad.push(f+': program or printed text differs');rows.push(`| ${path.basename(f)} | ${nPrint} | ${same?'identical':'DIFFERS'} |`)}
console.log('| module | amounts now printed from BAL | text + code vs '+REF+' |\n|---|---|---|\n'+rows.join('\n'));
console.log(JSON.stringify({modules:rows.length,fails:bad.length}));
if(bad.length){console.log('FAIL\n  '+bad.join('\n  '));process.exit(1)}console.log('PASS: every text prints the same words as before; nothing else changed');
