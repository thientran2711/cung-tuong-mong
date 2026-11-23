/* typed «stat ±N» guard (law 4 ONE CORE, OD:L1267 "text must print the constant, never a typed number"; Foreman D order MAIN 110 20:33Z 23/11,
   review/typed-stat-bal). Successor of dev/test/scan-typed-stat-text.py (review/j51-heir-danh-rv): that line scan also counted comments; this one
   parses every dev/build/j*.js with acorn and reads only STRING literals and TEMPLATE text (the words a player can see), never comments or code.
   A hit = a stat word followed by a typed signed number («Danh +3», «Sủng -10», «Bạc -20»). Print it instead: ${balSg(BAL.x)} in code, or the
   token {n:x} / {sg:x} in a static table (j1 sgRule / sgRuleArr / sgRuleObj read BAL when the text is read).
   ALLOW = justified exceptions (file + exact text + why); every other hit fails.
   usage: node dev/test/typed-stat-text.js [buildDir] [--list]     exit 1 when a hit is left outside ALLOW */
const fs=require('fs'),path=require('path');
const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const STAT='(?:Danh|Sủng|Bạc|bạc|Đức|Tài|Sắc|Ghen|Sức|Thiện cảm|Uy|Trí|Mưu|Thanh danh|Oán|Tín)';
const RX=new RegExp(STAT+'\\s*[+\\-−]\\s?\\d+','g');
/* [file, text regex, why] */
const ALLOW=[
 ['j75.js',/mỗi \+1: Ân tình \+1/,'night-gain RATE note (per step of the nightGain formula round(s/2)), not an amount applied'],
 ['jkinl.js',/Sắc \+6/,'kit sample page §70.6: fake strip sum, no rule applies it'],
 ['jkitpage.js',/Sủng -1|Danh \+2/,'kit sample page «Hoàng hậu triệu kiến» demo (fx shown only), no game event matches it'],
 ['jstatfx.js',/Danh \+2|Sủng [−-]3/,'kit sample §57.1: buttons that only play the stat-change animation, no rule applies them']];
function walk(n,f){if(!n||typeof n.type!=='string')return;f(n);for(const k in n){if(k==='type'||k==='start'||k==='end')continue;const v=n[k];
 if(Array.isArray(v))v.forEach(x=>x&&typeof x.type==='string'&&walk(x,f));else if(v&&typeof v.type==='string')walk(v,f)}}
function scan(dir){const D=dir||path.join(__dirname,'..','build');const rows=[];
 for(const f of fs.readdirSync(D).filter(f=>/^j.*\.js$/.test(f)&&!/all\.js$/.test(f)).sort()){const src=fs.readFileSync(path.join(D,f),'utf8');let ast;
  try{ast=acorn.parse(src,{ecmaVersion:'latest',locations:true})}catch(e){rows.push({f,line:0,t:'PARSE '+e.message});continue}
  walk(ast,n=>{let s=null;if(n.type==='Literal'&&typeof n.value==='string')s=n.value;else if(n.type==='TemplateElement')s=n.value.cooked||n.value.raw;if(!s)return;
   for(const m of s.matchAll(RX)){const ok=ALLOW.find(([af,re])=>af===f&&re.test(s));rows.push({f,line:n.loc.start.line,t:m[0],ctx:s.slice(Math.max(0,m.index-40),m.index+m[0].length+20),ok:ok?ok[2]:null})}})}
 return rows}
module.exports={scan,ALLOW};
if(require.main===module){const dir=process.argv.slice(2).find(a=>!a.startsWith('--'));const rows=scan(dir);const bad=rows.filter(r=>!r.ok);
 if(process.argv.includes('--list'))rows.forEach(r=>console.log(`${r.ok?'ALLOW':'TYPED'} ${r.f}:${r.line}\t${r.t}\t«${r.ctx.replace(/\s+/g,' ')}»${r.ok?'  ('+r.ok+')':''}`));
 else bad.forEach(r=>console.log(`TYPED ${r.f}:${r.line}\t${r.t}\t«${r.ctx.replace(/\s+/g,' ')}»`));
 const by={};bad.forEach(r=>by[r.f]=(by[r.f]||0)+1);
 console.log(`typed-stat-text: ${bad.length} typed (${rows.length-bad.length} allowed) ${JSON.stringify(by)}`);process.exit(bad.length?1:0)}
