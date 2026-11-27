/* global-names SCAN (MAIN 149, 26/11: tinbao-words r3 added a global helper «kitSay» in jnotice.js that overwrote the kit speech bubble
   kitSay(st,fig,text,opts) of jmark.js → NPC chat bubbles threw «reading 'isConnected'»). Every module of the build (dev/build/assemble.py order)
   is parsed (TypeScript parser, JS mode); for every global FUNCTION a module defines — a top-level function / class / var|let|const = function,
   `window.X = <function | a function name>`, `Object.assign(window,{X,…})` — the scan records which modules define it (plain value flags such as
   window.__x = 1 are state, not definitions, and are not counted). A name defined by 2+ modules is a CLASH unless the later module is a
   WRAP of the earlier one (it reads the old value first: `const x0 = X`, `X0 = window.X`, `typeof X …` guard + `X.apply`/`x0.apply`, or the new
   function calls the old one), or the later one only fills a missing name (`window.X = window.X || …`).
   usage: node dev/test/global-names/scan.js [--list]   → exit 1 on a clash not in the reviewed list KNOWN below (each with why it is fine). */
const fs=require('fs'),path=require('path');let ts;try{ts=require('typescript')}catch(e){ts=require(require('child_process').execSync('npm root -g').toString().trim()+'/typescript')}
const D=path.resolve(__dirname,'../../build');const A=fs.readFileSync(path.join(D,'assemble.py'),'utf8');
const order=JSON.parse(('['+(/for f in \[([^\]]+)\]\)/.exec(A)||[])[1]+']').replace(/'/g,'"')).filter(f=>!f.includes('/'));
const defs=new Map();const add=(n,f,k,wrap)=>{if(!defs.has(n))defs.set(n,[]);defs.get(n).push({f,k,wrap})};
for(const f of order){const src=fs.readFileSync(path.join(D,f),'utf8');const sf=ts.createSourceFile(f,src,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);
 const reads=new Set();/* names this module READS as a value somewhere (old value kept → wrap) */
 const visitR=n=>{if(ts.isVariableDeclaration(n)&&n.initializer){const i=n.initializer;const nm=ts.isIdentifier(i)?i.text:(ts.isPropertyAccessExpression(i)&&i.expression.getText()==='window'?i.name.text:null);if(nm)reads.add(nm)}
  if(ts.isBinaryExpression(n)&&n.operatorToken.kind===ts.SyntaxKind.EqualsToken){const r=n.right;const nm=ts.isIdentifier(r)?r.text:(ts.isPropertyAccessExpression(r)&&r.expression.getText()==='window'?r.name.text:null);const l=n.left.getText();if(nm&&!l.startsWith('window.'+nm)&&l!==nm)reads.add(nm);
   /* window.X = window.X || … : fills a missing name */if(ts.isBinaryExpression(r)&&r.operatorToken.kind===ts.SyntaxKind.BarBarToken&&r.left.getText()===l)reads.add(l.replace(/^window\./,''))}
  ts.forEachChild(n,visitR)};visitR(sf);
 /* top level of the file AND the body of a top-level IIFE wrapper `(function(){ … })()` count as "module scope"; only names that reach window are global:
    top-level declarations of the file itself, window.X assignments anywhere, Object.assign(window,{…}) */
 const fnNames=new Set();const isFn=e=>!!e&&(ts.isFunctionExpression(e)||ts.isArrowFunction(e)||ts.isClassExpression(e)||(ts.isParenthesizedExpression(e)&&isFn(e.expression)));
 const visitF=n=>{if((ts.isFunctionDeclaration(n)||ts.isClassDeclaration(n))&&n.name)fnNames.add(n.name.text);if(ts.isVariableDeclaration(n)&&ts.isIdentifier(n.name)&&isFn(n.initializer))fnNames.add(n.name.text);ts.forEachChild(n,visitF)};visitF(sf);
 const fnRhs=r=>{while(r&&ts.isBinaryExpression(r)&&r.operatorToken.kind===ts.SyntaxKind.EqualsToken)r=r.right;return isFn(r)||(!!r&&ts.isIdentifier(r)&&fnNames.has(r.text))};
 for(const st of sf.statements){if(ts.isFunctionDeclaration(st)&&st.name)add(st.name.text,f,'function',reads.has(st.name.text));
  else if(ts.isVariableStatement(st))for(const d of st.declarationList.declarations){if(ts.isIdentifier(d.name)&&isFn(d.initializer))add(d.name.text,f,'var',reads.has(d.name.text))}
  else if(ts.isClassDeclaration(st)&&st.name)add(st.name.text,f,'class',false)}
 const visitW=n=>{if(ts.isBinaryExpression(n)&&n.operatorToken.kind===ts.SyntaxKind.EqualsToken&&ts.isPropertyAccessExpression(n.left)&&n.left.expression.getText()==='window'&&fnRhs(n.right)){const nm=n.left.name.text;
   /* a chain `render=window.render=function…` and `window.X=X` of a module-level X are one definition */let R=n.right;while(ts.isBinaryExpression(R)&&R.operatorToken.kind===ts.SyntaxKind.EqualsToken)R=R.right;const fx=!ts.isIdentifier(R);/* an identifier RHS (window.X = X) is a wrap only when the module kept the old value (reads) */
   add(nm,f,'window',reads.has(nm)||(fx&&(/\b(?:\w+0|\w+_0|orig\w*|old\w*)\.apply\(/.test(R.getText())||new RegExp('\\b'+nm+'\\b').test(R.getText().replace(/^function\s+\w+/,'')))))}
  if(ts.isCallExpression(n)&&n.expression.getText()==='Object.assign'&&n.arguments.length>1&&n.arguments[0].getText()==='window'&&ts.isObjectLiteralExpression(n.arguments[1]))for(const p of n.arguments[1].properties){const nm=p.name&&p.name.getText();const v=ts.isShorthandPropertyAssignment(p)?p.name:(ts.isPropertyAssignment(p)?p.initializer:null);if(nm&&(ts.isMethodDeclaration(p)||fnRhs(v)))add(nm,f,'assign',reads.has(nm))}
  ts.forEachChild(n,visitW)};visitW(sf)}
/* reviewed clashes that are fine (name → why) */
const KNOWN={
 fillStaff:'j29 replaces j10 on purpose: NPC households fill from the ONE servant pool (takeFromPool); the later declaration wins by design',
 srvToast:'jnotice reroutes the old toast into the ONE notice system (owner OD 18/11 ~22:10Z ROOT-56)',
 kitFlipNote:'jnotice reroutes the flip note into the ONE notice system (ROOT-56)',
 kitLine:'jnotice reroutes every kitLine pill into the ONE notice system (ROOT-56, §42.2)',
 kitKnown:'j60 only sets a stub when the name is missing; j61 is the real one; jksize swaps it for a sample and restores it',
 lessonVir:'jtd routes a lesson to the tdPlay mini-game on purpose; jtds wraps it',
 kitDeskCal:'jrail turns the desk calendar off on purpose (the rail replaces it)'};
const clash=[];for(const [n,L] of defs){const files=[...new Set(L.map(x=>x.f))];if(files.length<2)continue;
 /* per later file: every definition there must be a wrap / fill */
 const bad=files.slice(1).filter(f=>L.filter(x=>x.f===f).every(x=>!x.wrap));if(bad.length)clash.push({n,files,bad})}
const LIST=process.argv.includes('--list');const fails=clash.filter(c=>!KNOWN[c.n]);
if(LIST)for(const c of clash)console.log(`${KNOWN[c.n]?'known':'CLASH'} ${c.n}: ${c.files.join(' → ')} (later, not a wrap: ${c.bad.join(', ')})${KNOWN[c.n]?' — '+KNOWN[c.n]:''}`);
console.log(`global-names scan: ${order.length} modules · ${defs.size} global names · ${clash.length} defined twice · ${fails.length} CLASH`);process.exit(fails.length?1:0);
