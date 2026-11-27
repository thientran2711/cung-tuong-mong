/* ACT-LITERAL-SCAN (E-GAIN3c, law 4 ONE CORE): typed gain / loss deltas inside ACT definitions (j8 A("key","Name",{…})).
   For each A(…) def, finds stat deltas written as a bare number instead of a BAL read:
     · an effect object  {stat:±N}  (c: / w: / l: / ap(…,{…}) / apply({…}) inside the def)
     · ducAdd(x,±N,…) / ap(x,{stat:±N}) calls
   Stats: bac danh duc sung sac suc tamco ev hp loyal kiem khiem tai van vo. 0 is ignored (no change).
   usage: node dev/measure/act-literal-scan.js [dev/build] → prints file:line | act | literal; exit 1 when any is found. */
const fs=require('fs'),path=require('path');const D=process.argv[2]||path.join(__dirname,'..','build');
const ST='bac|danh|duc|sung|sac|suc|tamco|ev|hp|loyal|kiem|khiem';
const reObj=new RegExp('\\b('+ST+')\\s*:\\s*(-?\\d+(?:\\.\\d+)?)\\b','g');const reDuc=/\bducAdd\(\s*[\w.]+\s*,\s*(-?\d+(?:\.\d+)?)\s*[,)]/g;
const out=[];
for(const f of fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js')){const src=fs.readFileSync(path.join(D,f),'utf8');
 const re=/(?:^|[;(\s])A\("(\w+)","([^"]*)",\{/g;let m;
 while((m=re.exec(src))){/* the def body: balanced braces from the "{" */let i=m.index+m[0].length-1,d=0,j=i;for(;j<src.length;j++){const c=src[j];if(c==="{")d++;else if(c==="}"){d--;if(!d)break}}
  const body=src.slice(i,j+1).replace(/\/\*[\s\S]*?\*\//g,s=>s.replace(/[^\n]/g," "));const line0=src.slice(0,i).split('\n').length;
  const hit=(k,s,off)=>{const ln=line0+body.slice(0,off).split('\n').length-1;out.push({f,ln,act:m[1],n:m[2],lit:s})};
  let r;reObj.lastIndex=0;while((r=reObj.exec(body))){if(+r[2]===0)continue;/* skip strings: count quotes/backticks before on the same chunk */const pre=body.slice(Math.max(0,r.index-1),r.index);if(pre==="."||pre==='"')continue;hit(r[1],r[0],r.index)}
  reDuc.lastIndex=0;while((r=reDuc.exec(body))){if(+r[1]===0)continue;hit('duc',r[0],r.index)}}}
for(const o of out)console.log(`${o.f}:${o.ln} | ${o.act} «${o.n}» | ${o.lit}`);
console.log('typed deltas in ACT defs: '+out.length);process.exit(out.length?1:0);
