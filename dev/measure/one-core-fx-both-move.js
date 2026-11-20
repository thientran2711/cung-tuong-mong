/* one-core-fx-both-move (review/one-core-jkc-2 item 2, ONE CORE OD:L1267 + LUẬT SỬA CẢ NHÓM): an amount typed in BOTH a player text and its
   rule — «Danh -5» in the words and {danh:-5} / S.danh-=5 in the code of the same option / act (the pairs dev/measure/one-core-fx-both.js
   counts). Inside a function body only (it runs after BAL exists). The code amount moves to BAL.eff.<module>.<stat><Site>[_n] (signed;
   S.x-=N becomes S.x+=K with K=-N) and every text of the same stat and value in the same option / act prints ${balSg(K)}
   (a "…" / '…' string that gains a ${} becomes a `…` template, same words). Unit = the nearest node holding the code amount and a text of the
   same stat and value on its source line. usage: node dev/measure/one-core-fx-both-move.js f1.js,f2.js,…   (proof: one-core-dup2-same.js) */
const fs=require('fs');
const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const files=(process.argv[2]||'').split(',').filter(Boolean);
const OUT='dev/build/jbaleff.js';const OSRC=fs.readFileSync(OUT,'utf8');
const cur=Function('const BAL={};'+OSRC+';return BAL.eff')();
const W={'Sủng':'sung','Danh':'danh','Đức':'duc','Bạc':'bac','Sức':'suc','Thái hậu':'th','Tâm cơ':'tamco','Tai mắt':'mat','Ân tình':'an','Tài':'tai','Sắc':'sac','Chủ tin':'tin'};
const ST=new Set(Object.values(W));
const TX=new RegExp('('+Object.keys(W).join('|')+')\\s*([+-])\\s*(\\d+)(?!\\d|\\.\\d)','g');
const num=n=>n&&((n.type==='Literal'&&typeof n.value==='number')||(n.type==='UnaryExpression'&&/^[+-]$/.test(n.operator)&&n.argument.type==='Literal'&&typeof n.argument.value==='number'));
const val=n=>n.type==='Literal'?n.value:(n.operator==='-'?-n.argument.value:+n.argument.value);
function nameOf(stack){for(let i=stack.length-1;i>=0;i--){const n=stack[i];
  if(n.type==='FunctionDeclaration'&&n.id)return n.id.name;
  if(n.type==='Property'&&n.key&&!(ST.has(n.key.name)))return n.key.name||String(n.key.value);
  if(n.type==='VariableDeclarator'&&n.id&&n.id.name)return n.id.name;
  if(n.type==='AssignmentExpression'&&n.left.type==='MemberExpression'&&n.left.property&&!ST.has(n.left.property.name))return n.left.property.name||String(n.left.property.value);
  if(n.type==='CallExpression'&&n.arguments[0]&&n.arguments[0].type==='Literal'&&typeof n.arguments[0].value==='string'&&/^[\w$]{2,24}$/.test(n.arguments[0].value)&&stack.slice(i+1).some(x=>/Function/.test(x.type)))return n.arguments[0].value}
 return 'top'}
let total={code:0,text:0};
for(const f of files){const mod=f.replace(/\.js$/,'');const src=fs.readFileSync('dev/build/'+f,'utf8');const ast=acorn.parse(src,{ecmaVersion:'latest',locations:true});
 const keys=cur[mod]=cur[mod]||{};const used={};for(const k in keys){const m=k.match(/^(.*?)(?:_(\d+))?$/);used[m[1]]=Math.max(used[m[1]]||1,+(m[2]||1))}
 const codes=[],texts=[];
 (function walk(n,stack,parent){if(!n||typeof n.type!=='string')return;const inFn=stack.some(x=>/Function/.test(x.type));stack.push(n);
  if(inFn&&n.type==='Property'&&!n.computed&&n.key&&ST.has(n.key.name)&&num(n.value)&&val(n.value)!==0)codes.push({node:n.value,st:n.key.name,v:val(n.value),line:n.loc.start.line,stack:stack.slice(),neg:false});
  if(inFn&&n.type==='AssignmentExpression'&&/^[+-]=$/.test(n.operator)&&n.left.type==='MemberExpression'&&!n.left.computed&&n.left.object.type==='Identifier'&&n.left.object.name==='S'&&ST.has(n.left.property.name)&&n.right.type==='Literal'&&typeof n.right.value==='number'&&n.right.value!==0)
   codes.push({node:n.right,assign:n,st:n.left.property.name,v:n.operator==='-='?-n.right.value:n.right.value,line:n.loc.start.line,stack:stack.slice()});
  /* a text outside a function body may still be moved when it is the value of a plain property: x:"…" becomes get x(){return `…`} (read when shown) */
  const holder=n.type==='TemplateElement'?stack[stack.length-2]:n,hp=n.type==='TemplateElement'?stack[stack.length-3]:parent;
  const propOk=hp&&hp.type==='Property'&&hp.value===holder&&hp.kind==='init'&&!hp.method&&!hp.computed&&!hp.shorthand&&hp.key.type==='Identifier';
  if((inFn||propOk)&&((n.type==='Literal'&&typeof n.value==='string'&&!(parent&&parent.type==='Property'&&parent.key===n))||n.type==='TemplateElement')){
   const raw=n.type==='Literal'?n.raw:n.value.raw;
   for(const m of raw.matchAll(TX)){const sg=m[2]==='-'?-1:1;texts.push({node:n,st:W[m[1]],v:sg*+m[3],m,line:n.loc.start.line,getter:inFn?null:hp})}}
  for(const k in n){if(k==='type'||k==='start'||k==='end'||k==='loc')continue;const c=n[k];if(Array.isArray(c))c.forEach(x=>walk(x,stack,n));else if(c&&typeof c.type==='string')walk(c,stack,n)}
  stack.pop()})(ast,[],null);
 /* pair each text with the code amount(s) of the same stat, value and source line whose common ancestor with it is the smallest; codes that
    share a text share one key (union) */
 const lca=(c,t)=>{for(let i=c.stack.length-1;i>=0;i--){const A=c.stack[i];if(t.node.start>=A.start&&t.node.end<=A.end)return A}return null};
 const par=new Map();const find=x=>{while(par.get(x)!==x)x=par.get(x);return x};codes.forEach(c=>par.set(c,c));
 const tCode=new Map();
 for(const t of texts){const C=codes.filter(c=>c.st===t.st&&c.v===t.v&&c.line===t.line);if(!C.length)continue;let best=Infinity,B=[];
  for(const c of C){const A=lca(c,t);if(!A)continue;const z=A.end-A.start;if(z<best){best=z;B=[c]}else if(z===best)B.push(c)}
  if(!B.length)continue;tCode.set(t,B[0]);for(const c of B.slice(1))par.set(find(c),find(B[0]))}
 const units=new Map();for(const [t,c] of tCode){const r=find(c);if(!units.has(r))units.set(r,{st:r.st,v:r.v,codes:codes.filter(x=>find(x)===r),name:nameOf(r.stack)})}
 const tUnit=new Map();for(const [t,c] of tCode)tUnit.set(t,units.get(find(c)));
 const edits=[];const lit=new Map();
 for(const u of units.values()){
  const base=u.st+u.name.replace(/[^\w$]/g,'_').replace(/^./,ch=>ch.toUpperCase());used[base]=(used[base]||0)+1;const key=used[base]>1?base+'_'+used[base]:base;
  if(keys[key]!==undefined)throw new Error(f+' key clash '+key);keys[key]=u.v;u.key=`BAL.eff.${mod}.${key}`;
  for(const c of u.codes){if(c.assign){edits.push([c.assign.left.end,c.assign.right.end,src.slice(c.assign.left.end,c.assign.right.start).replace(/[+-]=/,'+=')+u.key])}else edits.push([c.node.start,c.node.end,u.key]);total.code++}}
 for(const [t,u] of tUnit){/* the sign+digits of the match */const m=t.m;const s=m.index+m[0].length;const sd=m[0].match(/([+-])\s*(\d+)$/);const at=(t.node.type==='Literal'?t.node.start:t.node.start)+s-sd[0].length;
  edits.push([at,at+sd[0].length,'${balSg('+u.key+')}']);total.text++;if(t.node.type==='Literal')lit.set(t.node,1)}
 const gp=new Set();for(const [t] of tUnit)if(t.getter&&!gp.has(t.getter)){const P=t.getter;gp.add(P);edits.push([P.start,P.value.start,'get '+P.key.name+'(){return '],[P.value.end,P.value.end,'}'])}
 /* a "…" / '…' literal that gains a ${} becomes a template */
 for(const n of lit.keys()){const q=n.raw[0];let body=n.raw.slice(1,-1);edits.push([n.start,n.start+1,'`'],[n.end-1,n.end,'`']);
  /* escape ` and a literal ${ already in the body */
  for(const mm of body.matchAll(/`|\$\{/g))edits.push([n.start+1+mm.index,n.start+1+mm.index+mm[0].length,mm[0]==='`'?'\\`':'\\${']);
  if(q==="'")for(const mm of body.matchAll(/\\'/g))edits.push([n.start+1+mm.index,n.start+1+mm.index+2,"'"])}
 let out=src;for(const [a,b,r] of edits.sort((x,y)=>y[0]-x[0]||y[1]-x[1]))out=out.slice(0,a)+r+out.slice(b);
 if(edits.length){acorn.parse(out,{ecmaVersion:'latest'});fs.writeFileSync('dev/build/'+f,out)}console.log(f,'units',[...new Set(tUnit.values())].length,'→',`BAL.eff.${mod}`)}
const body=Object.keys(cur).sort().map(m=>' '+m+':{'+Object.entries(cur[m]).map(([k,v])=>(/^[A-Za-z_$][\w$]*$/.test(k)?k:JSON.stringify(k))+':'+JSON.stringify(v)).join(',')+'}').join(',\n');
let head=OSRC.slice(0,OSRC.indexOf('Object.assign(BAL,{eff:{'));const NOTE='   <stat><Site> (sung / danh / duc / bac / suc / th / tamco / mat / an / tai / sac / tin) = an amount a text ALSO typed (review/one-core-jkc-2, dev/measure/one-core-fx-both-move.js). */';
if(!head.includes('one-core-fx-both-move'))head=head.replace(/ \*\/\n$/,' ·\n'+NOTE+'\n');
fs.writeFileSync(OUT,head+'Object.assign(BAL,{eff:{\n'+body+'\n}});\n');
console.log(JSON.stringify(total));
