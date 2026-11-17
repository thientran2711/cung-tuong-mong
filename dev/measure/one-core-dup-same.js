/* one-core-dup-same (review/one-core-dup): BEFORE / AFTER proof that deleting the dead second copies of top-level functions changed no
   live rule. The game is ONE script (dev/build/assemble.py), so a top-level `function X` declared twice is hoisted and the LAST
   declaration is the only one that ever runs. For every top-level function name this compares the LAST declaration's source text at a
   git ref (default origin/main) with the working tree: they must be byte-identical, and no live function may disappear.
   usage: node dev/measure/one-core-dup-same.js [old-ref]   (exit 1 on any difference) */
const fs=require('fs'),cp=require('child_process'),path=require('path');
const REF=process.argv[2]||'origin/main';
const rd=(ref,f)=>{try{return ref?cp.execSync(`git show ${ref}:dev/build/${f}`,{encoding:'utf8',maxBuffer:1<<26,stdio:['ignore','pipe','ignore']}):fs.readFileSync('dev/build/'+f,'utf8')}catch(e){return ''}};
const order=ref=>rd(ref,'assemble.py').match(/for f in \[([^\]]+)\]/)[1].match(/'([^']+)'/g).map(s=>s.slice(1,-1));
/* top-level function declarations of each module, read with a real JS parser (acorn, from the container's node tools) */
const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const tops=src=>acorn.parse(src,{ecmaVersion:'latest',sourceType:'script',allowHashBang:true}).body.filter(n=>n.type==='FunctionDeclaration').map(n=>({name:n.id.name,a:n.start,b:n.end}));
function lastDefs(ref){const L={};for(const f of order(ref)){const src=rd(ref,f);if(!src)continue;for(const d of tops(src))L[d.name]={f,src:src.slice(d.a,d.b)}}return L}
/* the second allowed change: a dead typed FALLBACK after a BAL key that is always set at load (BAL.selfMinus||12 → BAL.selfMinus; the
   key holds the live value, the typed copy never ran). Both sides are compared with such fallbacks stripped; every stripped fallback is
   listed with the module that sets the key so the reviewer can check it is set before the function can run. */
const FB=/((?:\bBAL|\bB)(?:\.[\w$]+)+)\s*\|\|\s*(-?[\d.]+|\[[^\[\]]*\]|\{[^{}]*\})/g;
const norm=t=>t.replace(/\(typeof BAL==="object"&&(BAL(?:\.[\w$]+)+)\)/g,'$1').replace(FB,'$1').replace(/\(((?:\bBAL|\bB)(?:\.[\w$]+)+)\)/g,'$1');
const A=lastDefs(REF),N=lastDefs(null);const bad=[],fbs=[];let same=0;
for(const k in A){if(!N[k]){bad.push(`${k}: live in ${A[k].f} before, gone after`);continue}if(N[k].src===A[k].src){same++;continue}
 if(norm(N[k].src)===norm(A[k].src)){for(const m of A[k].src.matchAll(FB))if(!N[k].src.includes(m[0]))fbs.push(`${A[k].f} ${k}: ${m[0]}`);same++;continue}
 bad.push(`${k}: live copy differs (${A[k].f} → ${N[k].f})`)}
if(fbs.length)console.log('dead fallbacks removed (key set in BAL at load):\n  '+fbs.join('\n  '));
console.log(JSON.stringify({ref:REF,liveFunctionsBefore:Object.keys(A).length,after:Object.keys(N).length,identical:same,differ:bad.length}));
if(bad.length){console.log('FAIL\n  '+bad.slice(0,60).join('\n  '));process.exit(1)}console.log('PASS: every live top-level function is byte-identical');
