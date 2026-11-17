/* one-core-dup2-same (review/one-core-dup2): BEFORE / AFTER proof for the duplicate-rule hunt part 2. For every dev/build module that
   changed since <old-ref>, put the BAL value back in place of each BAL.<ns>… reference of the moved concepts (quyLv, loy, wit, ducLv,
   sungLv, nightEnd.warm/normal, and later keys listed in NS) and compare every top-level statement with the module at <old-ref> (acorn
   AST, positions and raw text ignored). A statement that still differs must be in INTENDED (owner-ruled change, listed in the report).
   usage: node dev/measure/one-core-dup2-same.js <old-ref> [merged-ref]   (exit 1 on any unexpected difference) */
const fs=require('fs'),cp=require('child_process'),vm=require('vm');
const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const REF=process.argv[2],REF2=process.argv[3];/* optional REF2 = a branch merged in later (review/one-core-dup-r1/r2): a statement equal to the one there is its change, not ours */if(!REF){console.log('usage: node dev/measure/one-core-dup2-same.js <old-ref>');process.exit(2)}
const NS=['quyLv','loy','wit','ducLv','sungLv','nightEnd','tinhLv','tinLv','rareLv','sucLv','oanFade','tsDanger','age','srvAge','pet','cut',
 /* review/one-core-dup3: amounts (BAL.eff / road / arc / route …) and the night table; values from every BAL file (one-core-text loadBAL) */
 'eff','road','arc','route','night','net','evWipe'];
/* owner-ruled word changes (VANPHONG:69 / OD:L247 thiện cảm words everywhere): */
const INTENDED={'jhc.js':['window.quyW'],'j21.js':['affW'],'jts.js':['tsQuy'],'j55.js':['ccWord'],
 /* review/one-core-dup3: jlost A("laydol") x + AOUT.laydo/laydol: the text said «cung nữ thân tín lòng -10» while the rule (jlost loSteal self / jecon bribel)
    takes BAL.loyalCost = 25 → it now prints BAL.loyalCost (lazy getter / aoLz: jecon loads after jlost) and «Đức ${balSg(LO.act.duc)}» (= -4, same words) */
 'jlost.js':['ExpressionStatement','TryStatement']};
/* j55 ccWord = side-chance scale (owner OD:L221) */
const bal=()=>{const c={Math,BAL:{pace:1}};vm.createContext(c);
 const src=fs.readFileSync('dev/build/jbal.js','utf8')+'\n'+fs.readFileSync('dev/build/jbal2.js','utf8');
 /* run statement by statement: a statement that needs the rest of the game (functions, DOM) is skipped */
 const S=src.replace(/^const BAL=/m,'BAL=');for(const st of acorn.parse(S,{ecmaVersion:'latest'}).body){try{vm.runInContext(S.slice(st.start,st.end),c)}catch(e){}}
 const pl=fs.readFileSync('dev/build/jpetlife.js','utf8').match(/careOk:(\d+),careLow:(\d+)/);c.BAL.pet=c.BAL.pet||{};c.BAL.pet.life={careOk:+pl[1],careLow:+pl[2]};
 const m=fs.readFileSync('dev/build/jne.js','utf8').match(/warm:(\d+),normal:(\d+)/);c.BAL.nightEnd={warm:+m[1],normal:+m[2]};return c.BAL};
const B=(()=>{const b=bal(),T=require('../test/one-core-text.js').loadBAL(require('path').join(__dirname,'..','build'));for(const k of Object.keys(T))if(!(k in b)||['eff','road','arc','route','night','net','evWipe'].includes(k))b[k]=T[k];return b})();
/* a text that prints a constant (${balSg(BAL…)} / ${balAb(BAL…)}) is turned back into the words it prints (one-core-text proof) before the compare */
const PRINTED=require('../test/one-core-text.js').proof(require('path').join(__dirname,'..','build')).printed;
const strip=n=>JSON.stringify(n,(k,v)=>{if(k==='start'||k==='end'||k==='raw')return undefined;/* "…" ≡ `…` without ${} */if(v&&v.type==='TemplateLiteral'&&v.expressions.length===0&&v.quasis.length===1)return{S:v.quasis[0].value.cooked};if(v&&v.type==='Literal'&&typeof v.value==='string')return{S:v.value};return v});
const isObjN=v=>v&&typeof v==='object'&&!Array.isArray(v)&&Object.keys(v).length&&Object.values(v).every(x=>typeof x==='number'||Array.isArray(x)&&x.every(y=>typeof y==='number'));/* an amount object (BAL.arc.h96: {h:10,t:6}) goes back as the typed object */
const lit=v=>isObjN(v)&&Object.values(v).every(x=>typeof x==='number')?'{'+Object.entries(v).map(([k,x])=>k+':'+lit(x)).join(',')+'}':Array.isArray(v)&&v.length&&v.every(x=>typeof x==='number')?'['+v.map(lit).join(',')+']':typeof v!=='number'?null:v<0?`(-${-v})`:String(v);/* a number table (BAL.night.mood) goes back as the typed table */
/* dead second copies deleted on purpose (the live copy is elsewhere): */
const REMOVED={'j21.js':['oanW']};
const RX=new RegExp('BAL\\.('+NS.join('|')+')(?![\\w$])((?:\\.[\\w$]+|\\[\\d+\\])*)','g');
const nameOf=s=>s.type==='FunctionDeclaration'?s.id.name:s.type==='ExpressionStatement'&&s.expression.left?cp_src(s.expression.left):s.type;
let cur='';const cp_src=n=>cur.slice(n.start,n.end);
const changed=cp.execSync(`git diff --name-only ${REF} -- dev/build`,{encoding:'utf8'}).split('\n').filter(f=>/^dev\/build\/j[\w]+\.js$/.test(f)&&!/\/(jbal\w*|jpetlife)\.js$/.test(f));/* BAL files: new keys only, checked by the value table */
let refs=0,bad=[],rows=[];
for(const p of changed){const f=p.split('/').pop();const NEW=fs.readFileSync(p,'utf8');let OLD;try{OLD=cp.execSync(`git show ${REF}:${p}`,{encoding:'utf8',maxBuffer:1<<26})}catch(e){bad.push(f+': new file');continue}
 let c=0;const put=(T,cnt)=>T.replace(RX,(m,ns,path)=>{let v=B[ns];for(const k of path.match(/[\w$]+/g)||[])v=v==null?v:v[k];const L=lit(v);if(L==null)return m;c+=cnt;return L});
 /* both sides: a BAL ref the old code already had is put back too, so only the newly moved cuts count */
 const back=put(PRINTED(NEW),1);OLD=put(PRINTED(OLD),-1);refs+=c;/* c = new refs − old refs = the cuts moved here */
 const a=acorn.parse(back,{ecmaVersion:'latest'}).body,b=acorn.parse(OLD,{ecmaVersion:'latest'}).body.filter(s=>!(s.type==='FunctionDeclaration'&&(REMOVED[f]||[]).includes(s.id.name)));let diff=[];
 if(a.length!==b.length)diff.push('statement count '+b.length+'→'+a.length);else{cur=back;const iife=s=>{const e=s.type==='ExpressionStatement'&&s.expression;const f=e&&e.type==='CallExpression'&&e.callee;return f&&/Function/.test(f.type)&&f.body.body};
  const cmp=(A,Bs)=>A.forEach((s,i)=>{if(strip(s)===strip(Bs[i]))return;const ia=iife(s),ib=iife(Bs[i]);if(ia&&ib&&ia.length===ib.length)cmp(ia,ib);else diff.push(nameOf(s))});cmp(a,b)}
 let theirs=new Set();if(REF2){try{const T=put(cp.execSync(`git show ${REF2}:${p}`,{encoding:'utf8',maxBuffer:1<<26}),0);const tb=acorn.parse(T,{ecmaVersion:'latest'}).body;const flat=x=>x.flatMap(st=>{const e=st.type==='ExpressionStatement'&&st.expression;const fn=e&&e.type==='CallExpression'&&e.callee;return [st].concat(fn&&/Function/.test(fn.type)?fn.body.body:[])});
  const keep=new Set(flat(tb).map(strip));const mine=flat(a);cur=back;mine.forEach(st=>{if(keep.has(strip(st)))theirs.add(nameOf(st))});if(acorn.parse(OLD,{ecmaVersion:'latest'}).body.length!==tb.length||a.length===tb.length)theirs.add('statement count '+b.length+'→'+a.length)}catch(e){}}
 diff=diff.filter(d=>!theirs.has(d)||(INTENDED[f]||[]).includes(d));
 const extra=diff.filter(d=>!(INTENDED[f]||[]).includes(d));if(extra.length)bad.push(f+': differs in '+extra.join(', '));
 rows.push(`| ${f} | ${c} | ${diff.length?'intended: '+diff.join(', '):'identical'} |`)}
console.log('| module | BAL refs put back | AST vs '+REF.slice(0,8)+' |\n|---|---|---|\n'+rows.join('\n'));
console.log(JSON.stringify({modules:rows.length,refs,fails:bad.length}));
if(bad.length){console.log('FAIL\n  '+bad.join('\n  '));process.exit(1)}console.log('PASS: every moved cut equals its old literal; only the listed owner-ruled word functions changed');
