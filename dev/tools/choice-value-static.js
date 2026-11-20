/* choice-value STATIC pass (companion of choice-value-scan.js): literal options {n,fx} whose fx only costs and whose x shows no gain marker.
   Heuristic: candidates for a hand check (a gain may be a word the kit shows green, or land on another person). Never a gate.
   usage: node dev/tools/choice-value-static.js [repo root]   (default: this repo) */
const fs=require('fs'),path=require('path');const B=(process.argv[2]||require("path").resolve(__dirname,"../.."))+'/dev/build/';const out=[];
const files=fs.readdirSync(B).filter(f=>/^j.*\.js$/.test(f)&&f!=='all.js');
for(const f of files){const s=fs.readFileSync(B+f,'utf8');
 const re=/\{n:(["`])([^"`]{1,90})\1,fx:(\{[^{}]*\}|[A-Za-z_.]+)(?:,([a-z]+):)?/g;let m;
 while((m=re.exec(s))){const name=m[2],fx=m[3];const tail=s.slice(re.lastIndex-((m[4]||'').length+2),re.lastIndex+420);
  const ents=fx.startsWith('{')?fx.slice(1,-1).split(',').map(e=>e.trim()).filter(Boolean):[];
  if(!ents.length)continue;const neg=ents.filter(e=>/:\s*-/.test(e)||/^\.\.\./.test(e)?/:\s*-/.test(e):false),pos=ents.filter(e=>!/:\s*-/.test(e)&&!/^\.\.\./.test(e)&&!/:\s*0\s*$/.test(e));
  if(!neg.length||pos.length)continue;
  const xm=tail.match(/^,?x:(["`])((?:[^"`\\]|\\.|\$\{[^}]*\})*)\1/)||tail.match(/x:(["`])((?:[^"`\\]|\\.)*?)\1/);const x=xm?xm[2]:'';
  const gain=/thành:|\+\s?\$\{|\+\d|giữ lại|giữ sức|quý ngươi \$\{balSg|được /.test(x)||/w:\{[a-z]+:\d/.test(tail.slice(0,200));
  if(gain)continue;const line=s.slice(0,m.index).split('\n').length;out.push(`${f}:${line} «${name}» fx=${fx} x=${x.slice(0,90)}`)}}
console.log(out.join('\n'));console.log('STATIC cost-only candidates:',out.length);
