/* webkit-syntax: does the built game script PARSE on older iPad/iPhone Safari? (owner iPad 15/11 "Bị gì đây mới vào game": stuck on the raw
   skeleton). One parse error anywhere in the ONE big game <script> kills the whole game on that device. Scans every module of the bundle
   (dev/build/assemble.py order) with acorn tokens for features newer than Safari 15.4 / iPadOS 15.4:
     regex lookbehind (?<= (?<!   — Safari 16.4 (parse-time SyntaxError before that)
     regex flag v / d              — Safari 17 / 15
     class static blocks, #private in — Safari 16.4 / 15
   Runtime APIs (Array.at, findLast, structuredClone, Object.hasOwn, toSorted, groupBy) are listed too (they throw only where called).
   Fix: write kRx("pattern","flags") (j0) instead of a lookbehind literal.
   usage: node dev/test/webkit-syntax.js            (exit 1 when a parse-level hit exists) */
const fs=require('fs'),path=require('path');let acorn;try{acorn=require('acorn')}catch(e){acorn=require('/opt/node-tools/node_modules/acorn')}
const B=path.join(__dirname,'../build');const asm=fs.readFileSync(B+'/assemble.py','utf8');
const files=JSON.parse(asm.match(/for f in (\[[^\]]+\])/)[1].replace(/'/g,'"'));
const out=[];let parse=0;
for(const f of files){const src=fs.readFileSync(B+'/'+f,'utf8');let toks;
 try{toks=[...acorn.tokenizer(src,{ecmaVersion:'latest',locations:true})]}catch(e){out.push([f,0,'TOKENIZE',e.message]);continue}
 for(const t of toks){
  if(t.type.label==='regexp'){const p=t.value.pattern,fl=t.value.flags;
   if(/\(\?<[=!]/.test(p)){out.push([f,t.loc.start.line,'parse: regex lookbehind (Safari < 16.4)','/'+p.slice(0,70)+'/'+fl]);parse++}
   if(/[vd]/.test(fl)){out.push([f,t.loc.start.line,'parse: regex flag '+fl,'/'+p.slice(0,50)+'/'+fl]);parse++}}
  if(t.type.label==='string'&&/\(\?<[=!]/.test(t.value))out.push([f,t.loc.start.line,'info: lookbehind in a string (must reach kRx; checked live by dev/test/webkit-boot.js)',t.value.slice(0,60)]);
 }
 const rt=src.match(/\.(at|findLast|findLastIndex|toSorted|toReversed|toSpliced)\(|structuredClone\(|Object\.hasOwn\(|(Object|Map)\.groupBy\(/g);
 if(rt)out.push([f,0,'runtime APIs (Safari 15.4+/16.4+/17.4+)',[...new Set(rt)].join(' ')]);
 if(/static\s*\{/.test(src)){out.push([f,0,'parse: class static block','']);parse++}}
for(const o of out)console.log(o.join(' | '));
console.log(`\n${files.length} modules · parse-level hits: ${parse}`);process.exit(parse?1:0);
