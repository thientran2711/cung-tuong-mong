/* one-core-dup-same (review/one-core-dup): BEFORE / AFTER proof that deleting the dead second copies of top-level functions changed no
   live rule. The game is ONE script (dev/build/assemble.py), so a top-level `function X` declared twice is hoisted and the LAST
   declaration is the only one that ever runs. For every top-level function name this compares the LAST declaration's source text at a
   git ref (default origin/main) with the working tree: they must be byte-identical, and no live function may disappear.
   usage: node dev/measure/one-core-dup-same.js [old-ref]   (exit 1 on any difference) */
const fs=require('fs'),cp=require('child_process'),path=require('path');
const REF=process.argv[2]||'origin/main';
const rd=(ref,f)=>{try{return ref?cp.execSync(`git show ${ref}:dev/build/${f}`,{encoding:'utf8',maxBuffer:1<<26,stdio:['ignore','pipe','ignore']}):fs.readFileSync('dev/build/'+f,'utf8')}catch(e){return ''}};
const order=ref=>rd(ref,'assemble.py').match(/for f in \[([^\]]+)\]/)[1].match(/'([^']+)'/g).map(s=>s.slice(1,-1));
/* blank strings / templates / comments / regex so braces count right, keep offsets */
function blank(src){let o='',i=0;const n=src.length;while(i<n){const c=src[i];
 if(c==='/'&&src[i+1]==='*'){const e=src.indexOf('*/',i+2);const b=e<0?n:e+2;o+=src.slice(i,b).replace(/[^\n]/g,' ');i=b;continue}
 if(c==='/'&&src[i+1]==='/'&&!/[\w)\]$]\s*$/.test(o.slice(-2))){const e=src.indexOf('\n',i);const b=e<0?n:e;o+=' '.repeat(b-i);i=b;continue}
 if(c==='"'||c==="'"||c==='`'){let j=i+1,d=0;while(j<n){if(src[j]==='\\'){j+=2;continue}if(c==='`'&&src[j]==='$'&&src[j+1]==='{'){d++;j+=2;continue}if(c==='`'&&d&&src[j]==='}'){d--;j++;continue}if(src[j]===c&&!d)break;j++}o+=c+' '.repeat(Math.max(0,j-i-1))+(j<n?c:'');i=j+1;continue}
 o+=c;i++}return o}
function lastDefs(ref){const L={};for(const f of order(ref)){const src=rd(ref,f);if(!src)continue;const B=blank(src);let d=0;
 for(let i=0;i<B.length;i++){const c=B[i];if(c==='{')d++;else if(c==='}')d--;else if(d===0&&c==='f'&&B.startsWith('function',i)&&!/[\w$]/.test(B[i-1]||'')){const m=B.slice(i).match(/^function\s+([\w$]+)\s*\(/);if(!m)continue;
  let j=B.indexOf('{',i),e=0;for(let k=j;k<B.length;k++){if(B[k]==='{')e++;else if(B[k]==='}'){e--;if(!e){L[m[1]]={f,src:src.slice(i,k+1)};break}}}}}}return L}
const A=lastDefs(REF),N=lastDefs(null);const bad=[];let same=0;
for(const k in A){if(!N[k])bad.push(`${k}: live in ${A[k].f} before, gone after`);else if(N[k].src!==A[k].src)bad.push(`${k}: live copy differs (${A[k].f} → ${N[k].f})`);else same++}
console.log(JSON.stringify({ref:REF,liveFunctionsBefore:Object.keys(A).length,after:Object.keys(N).length,identical:same,differ:bad.length}));
if(bad.length){console.log('FAIL\n  '+bad.slice(0,60).join('\n  '));process.exit(1)}console.log('PASS: every live top-level function is byte-identical');
