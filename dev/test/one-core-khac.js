/* ONE CORE khắc guard (d-followups-1, owner OD:L1267 "text must print the constant, never a typed number"; law 4).
   FAILS when any player-visible string / template text in dev/build/j*.js TYPES a khắc amount: "2 khắc", "tốn: 1 khắc", "Tốn 2 khắc." …
   (string literals + template quasis, parsed with acorn, so comments never count), or glues a typed number into one: `${tc+1} khắc`, 2+" khắc".
   Print the BAL constant the rule spends instead (BAL.btn.<act>.k, BAL.artLes.k, BAL.time.cost.*, BAL.walk.*, BAL.svt.k …). No baseline: the list is empty.
   usage: node dev/test/one-core-khac.js [--list]      env OC_BUILD = build dir (default dev/build) */
const fs=require('fs'),path=require('path');
const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const D=process.env.OC_BUILD||path.join(__dirname,'..','build');
const walk=(n,f)=>{if(!n||typeof n.type!=='string')return;f(n);for(const k in n){const v=n[k];if(Array.isArray(v))v.forEach(x=>x&&walk(x,f));else if(v&&typeof v.type==='string')walk(v,f)}};
const out=[];
for(const f of fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f)).sort()){const src=fs.readFileSync(path.join(D,f),'utf8');let ast;
 try{ast=acorn.parse(src,{ecmaVersion:'latest',locations:true,allowReturnOutsideFunction:true,allowHashBang:true})}catch(e){out.push(`${f}: parse error ${e.message}`);continue}
 walk(ast,n=>{let s=null;if(n.type==='Literal'&&typeof n.value==='string')s=n.value;else if(n.type==='TemplateElement')s=n.value.cooked||n.value.raw;if(s==null)return;
  const re=/(?:^|[^\w])(\d+(?:[–-]\d+)?)\s*khắc/g;let m;while((m=re.exec(s)))out.push(`${f}:${n.loc.start.line}  typed «${m[1]} khắc»: …${s.slice(Math.max(0,m.index-40),m.index+m[0].length+10).replace(/\s+/g,' ')}…`)});
 /* a number literal glued into a khắc text: ${x+1} khắc · 2+" khắc" (a «||0» fallback is not a cost) */
 src.split('\n').forEach((l,i)=>{let m;const r=/(?<!\|\|)(?<![\w.$])(\d+)\s*\}\s*khắc|[^\w.$](\d+)\s*\+\s*["'`]\s*khắc/g;while((m=r.exec(l)))out.push(`${f}:${i+1}  glued «${m[1]||m[2]} khắc»: …${l.slice(Math.max(0,m.index-40),m.index+m[0].length+4)}…`)});
}
if(process.argv.includes('--list')){out.forEach(x=>console.log(x));console.log('sites',out.length);process.exit(0)}
if(out.length){console.log(`ONE-CORE-KHAC FAIL: ${out.length} typed khắc in player text (print the BAL constant the rule spends)`);out.slice(0,40).forEach(x=>console.log(' '+x));process.exit(1)}
console.log('ONE-CORE-KHAC PASS: 0 typed khắc in player text');
