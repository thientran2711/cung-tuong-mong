/* one-core-dup2-same (review/one-core-dup2): BEFORE / AFTER proof for the duplicate-rule hunt part 2. For every dev/build module that
   changed since <old-ref>, put the BAL value back in place of each BAL.<ns>… reference of the moved concepts (quyLv, loy, wit, ducLv,
   sungLv, nightEnd.warm/normal, and later keys listed in NS) and compare every top-level statement with the module at <old-ref> (acorn
   AST, positions and raw text ignored). A statement that still differs must be in INTENDED (owner-ruled change, listed in the report).
   usage: node dev/measure/one-core-dup2-same.js <old-ref>   (exit 1 on any unexpected difference) */
const fs=require('fs'),cp=require('child_process'),vm=require('vm');
const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const REF=process.argv[2];if(!REF){console.log('usage: node dev/measure/one-core-dup2-same.js <old-ref>');process.exit(2)}
const NS=['quyLv','loy','wit','ducLv','sungLv','nightEnd','dup'];
/* owner-ruled word changes (VANPHONG:69 / OD:L247 thiện cảm words everywhere): */
const INTENDED={'jhc.js':['window.quyW'],'j21.js':['affW'],'jts.js':['tsQuy']};
const bal=()=>{const c={Math,BAL:{pace:1}};vm.createContext(c);
 const src=fs.readFileSync('dev/build/jbal.js','utf8')+'\n'+fs.readFileSync('dev/build/jbal2.js','utf8');
 /* run statement by statement: a statement that needs the rest of the game (functions, DOM) is skipped */
 const S=src.replace(/^const BAL=/m,'BAL=');for(const st of acorn.parse(S,{ecmaVersion:'latest'}).body){try{vm.runInContext(S.slice(st.start,st.end),c)}catch(e){}}
 const m=fs.readFileSync('dev/build/jne.js','utf8').match(/warm:(\d+),normal:(\d+)/);c.BAL.nightEnd={warm:+m[1],normal:+m[2]};return c.BAL};
const B=bal();
const strip=n=>JSON.stringify(n,(k,v)=>k==='start'||k==='end'||k==='raw'?undefined:v);
const lit=v=>typeof v!=='number'?null:v<0?`(-${-v})`:String(v);
const RX=new RegExp('BAL\\.('+NS.join('|')+')((?:\\.[\\w$]+|\\[\\d+\\])*)','g');
const nameOf=s=>s.type==='FunctionDeclaration'?s.id.name:s.type==='ExpressionStatement'&&s.expression.left?cp_src(s.expression.left):s.type;
let cur='';const cp_src=n=>cur.slice(n.start,n.end);
const changed=cp.execSync(`git diff --name-only ${REF} -- dev/build`,{encoding:'utf8'}).split('\n').filter(f=>/^dev\/build\/j[\w]+\.js$/.test(f)&&!/\/jbal\.js$/.test(f));
let refs=0,bad=[],rows=[];
for(const p of changed){const f=p.split('/').pop();const NEW=fs.readFileSync(p,'utf8');let OLD;try{OLD=cp.execSync(`git show ${REF}:${p}`,{encoding:'utf8',maxBuffer:1<<26})}catch(e){bad.push(f+': new file');continue}
 let c=0;const back=NEW.replace(RX,(m,ns,path)=>{let v=B[ns];for(const k of path.match(/[\w$]+/g)||[])v=v==null?v:v[k];const L=lit(v);if(L==null)return m;c++;return L});refs+=c;
 const a=acorn.parse(back,{ecmaVersion:'latest'}).body,b=acorn.parse(OLD,{ecmaVersion:'latest'}).body;let diff=[];
 if(a.length!==b.length)diff.push('statement count '+b.length+'→'+a.length);else{cur=back;const iife=s=>{const e=s.type==='ExpressionStatement'&&s.expression;const f=e&&e.type==='CallExpression'&&e.callee;return f&&/Function/.test(f.type)&&f.body.body};
  const cmp=(A,Bs)=>A.forEach((s,i)=>{if(strip(s)===strip(Bs[i]))return;const ia=iife(s),ib=iife(Bs[i]);if(ia&&ib&&ia.length===ib.length)cmp(ia,ib);else diff.push(nameOf(s))});cmp(a,b)}
 const extra=diff.filter(d=>!(INTENDED[f]||[]).includes(d));if(extra.length)bad.push(f+': differs in '+extra.join(', '));
 rows.push(`| ${f} | ${c} | ${diff.length?'intended: '+diff.join(', '):'identical'} |`)}
console.log('| module | BAL refs put back | AST vs '+REF.slice(0,8)+' |\n|---|---|---|\n'+rows.join('\n'));
console.log(JSON.stringify({modules:rows.length,refs,fails:bad.length}));
if(bad.length){console.log('FAIL\n  '+bad.join('\n  '));process.exit(1)}console.log('PASS: every moved cut equals its old literal; only the listed owner-ruled word functions changed');
