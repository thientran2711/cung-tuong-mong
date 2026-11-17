/* tuanluc-sync: classify EVERY log() call site with the SAME table the game uses at runtime (dev/build/jlogbao.js LOGBAO / LOGBAO_NOT).
   (a) = also shown at the moment (one kit BÁO per buổi) · (b) = week book only. who = whose page: "ta" (line opens with Ngươi/Ta), "named" (the first
   person named, stamped at runtime by jlogbao lbWho), "?" (no person in the template: her page unless the runtime text names someone).
   usage: node dev/test/tuanluc-sites.js [--md]   → summary line; --md prints the whole table (markdown) */
const fs=require('fs'),path=require('path');const B=path.join(__dirname,'../build');
const src=fs.readFileSync(path.join(B,'jlogbao.js'),'utf8');
const LOGBAO=eval(src.match(/const LOGBAO=(\[[\s\S]*?\]\]);/)[1]);const LOGBAO_NOT=eval(src.match(/const LOGBAO_NOT=(\/.*\/[a-z]*);/)[1]);
const files=fs.readFileSync(path.join(B,'assemble.py'),'utf8').match(/'(j[^']+\.js)'/g).map(x=>x.slice(1,-1));
const rows=[];
for(const f of files){const s=fs.readFileSync(path.join(B,f),'utf8');const re=/(^|[^\w.$])log\(/g;let m;
 while((m=re.exec(s))){const i=m.index+m[0].length;if(/function\s*$/.test(s.slice(Math.max(0,m.index-12),m.index+1)))continue;
  let j=i,d=1,q=null;while(j<s.length&&d>0){const c=s[j];if(q){if(c==='\\'){j+=2;continue}if(q==='`'&&c==='$'&&s[j+1]==='{'){let k=j+2,dd=1;while(k<s.length&&dd){if(s[k]==='{')dd++;else if(s[k]==='}')dd--;k++}j=k;continue}if(c===q)q=null}else{if(c==='"'||c==="'"||c==='`')q=c;else if(c==='(')d++;else if(c===')')d--}j++}
  const arg=s.slice(i,j-1);if(!arg.trim()||/^h\)?$|^\w+$/.test(arg.trim()))continue;/* wrappers passing h on */
  const txt=arg.replace(/\$\{[^{}]*(\{[^{}]*\}[^{}]*)*\}/g,'X').replace(/<[^>]+>/g,' ').replace(/[`"']/g,'').replace(/\s+/g,' ').trim();
  const cl=t=>{if(LOGBAO_NOT.test(t))return null;for(const [k,r] of LOGBAO)if(r.test(t))return k;return null};
  /* a template opening with a filled-in name (X) is about her when X = "Ngươi" at runtime: then it is (a) too ("a (her)") */
  let k=cl(txt),cls=k?'a · '+k:'b';if(!k&&/^X\b/.test(txt)){const k2=cl(txt.replace(/^X\b/,'Ngươi'));if(k2)cls='a (her) · '+k2}
  const who=/^(Ngươi|Ta)\b/.test(txt)?'ta':/X/.test(txt.slice(0,30))?'named':'?';
  rows.push([f+':'+(s.slice(0,m.index).split('\n').length),cls,who,txt.slice(0,90).replace(/\|/g,'/')])}}
const A=rows.filter(r=>r[1][0]==='a').length;
if(process.argv.includes('--md')){console.log('| call site | class | page | text (template, X = filled in) |\n|---|---|---|---|');for(const r of rows)console.log('| '+r.join(' | ')+' |')}
console.log(`TUANLUC-SITES ${rows.length} log() call sites · (a) shown at the moment ${A} · (b) week book only ${rows.length-A}`);
