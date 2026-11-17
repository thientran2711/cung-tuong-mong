/* ONE CORE bind guard (review/one-core-dup2 r3, owner OD:L1267 "text must print the constant"; reviewer FAIL 1 of review-one-core-dup2-r2).
   Sibling of dev/test/one-core-text.js, run by the same gate (dev/tools/coregates.sh G1).
   A player text that PRINTS a BAL amount (${balSg(BAL…)} / ${balAb(BAL…)} / ${balOan(BAL…,"hurt")} / ${BAL…} in a template) must print the key that THE RULE
   OF THAT SAME OPTION reads, never another rule's key that happens to hold the same number (change that key and the text lies; change the real rule and
   the text lies too). FAILS when the printed key is not read (outside a print) by:
   (1) the option the text belongs to = the nearest enclosing "option boundary" walking up from the text: an object with a function-valued field (go / fn /
       ok / f / fail …), an entry call with a name-like first argument (add("k",…), A("k",…), T7("k",…)), the branch of an `if(k==="lit")` / `case "lit":`,
       or the top-level function / statement;
   (2) a function that option calls (by name, any module, two calls deep);
   (3) the act the text previews: every name-like string met on the way up (AOUT / ACT property key, add("k"), k:"lit", if(k==="lit")) links to
       A("k",…) / ACT.k=… definitions and to `if(…==="k")` / `case "k":` branches in any module (+ the functions they call, two deep).
   CUT ladders (loy / ducLv / quyLv / wit / sungLv … thresholds printed as "lòng 60+") are rules that live in a separate check function (watcher(),
   econLoyalMaid() …): for them the key must be read by SOME rule in the game (not only by prints).
   usage: node dev/test/one-core-bind.js [--list]   (--list prints every print site with its verdict, exit 0)
   module: require('./one-core-bind.js').bind(buildDir) → {prints, bad} */
const fs=require('fs'),path=require('path');
const acorn=(()=>{try{return require('acorn')}catch(e){return require('/opt/node-tools/node_modules/acorn')}})();
const ROOT=path.join(__dirname,'..','..');
const PRINT=new Set(['balSg','balAb','balOan']);
const CUT=new Set(['loy','wit','ducLv','quyLv','sungLv','tinhLv','tinLv','rareLv','sucLv','oanFade','tsDanger','cut','odds','ageBand','age','srvAge','relOan']);
/* SITE keys = amounts named by the rule site that applies them (BAL.eff.<module>.<site>, BAL.road / BAL.arc per road option): a print must be bound to
   that very site. Every other BAL key names ONE concept (BAL.steal.rel, BAL.loy.close, BAL.time.khac …): a print must be read by some rule of the game. */
const SITE=new Set(['eff','road','arc']);
const NAMEY=/^[A-Za-z_$][\w$]*$/;
const isFn=n=>n&&/Function/.test(n.type);
function balPath(n){const p=[];let c=n;while(c.type==='MemberExpression'){let k;if(!c.computed)k=c.property.name;else if(c.property.type==='Literal')k=String(c.property.value);else return null;p.unshift(k);c=c.object}
 return c.type==='Identifier'&&c.name==='BAL'&&p.length?p:null}
/* the key a read names: BAL.eff.j8.go_2[1] → eff.j8.go_2 (an index of a [a,b] amount is the same key) */
const keyOf=p=>{const q=p.slice();while(q.length>1&&/^\d+$/.test(q[q.length-1]))q.pop();return q.join('.')};
function walk(ast,cb){(function w(n,stack){if(!n||typeof n.type!=='string')return;cb(n,stack);stack.push(n);for(const k in n){if(k==='type'||k==='start'||k==='end'||k==='loc')continue;const c=n[k];if(Array.isArray(c))c.forEach(x=>w(x,stack));else if(c&&typeof c.type==='string')w(c,stack)}stack.pop()})(ast,[])}
const litOf=n=>n&&n.type==='Literal'&&typeof n.value==='string'?n.value:(n&&n.type==='TemplateLiteral'&&!n.expressions.length?n.quasis[0].value.cooked:null);
/* `x==="lit"` / `"lit"===x` → lit */
function eqLit(t){if(!t)return[];if(t.type==='LogicalExpression')return eqLit(t.left).concat(eqLit(t.right));if(t.type==='BinaryExpression'&&/^[!=]==?$/.test(t.operator)&&t.operator[0]==='='){const a=litOf(t.left),b=litOf(t.right);return[a,b].filter(x=>x!=null&&NAMEY.test(x))}
 if(t.type==='CallExpression'&&t.callee.type==='MemberExpression'&&t.callee.property.name==='includes'&&t.callee.object.type==='ArrayExpression')return t.callee.object.elements.map(litOf).filter(x=>x!=null&&NAMEY.test(x));return[]}
function index(B){
 const ORDER=fs.readFileSync(path.join(B,'assemble.py'),'utf8').match(/for f in \[([^\]]+)\]/)[1].match(/'([^']+)'/g).map(s=>s.slice(1,-1)).filter(f=>/^j/.test(f));
 const mods=ORDER.map(f=>{const src=fs.readFileSync(path.join(B,f),'utf8');const comments=[];return{f,src,comments,ast:acorn.parse(src,{ecmaVersion:'latest',locations:true,onComment:comments})}});
 const FN={};/* name → [{m,node}] */const LINK={};/* key → [{m,node}] (A("k") defs, if(…==="k") branches, case "k") */
 const reads=[];/* {m,n,key} */const prints=[];const NOBJ={};/* option name → [{m,node}] */
 const addL=(k,m,node,kind)=>{(LINK[k]=LINK[k]||[]).push({m,node,kind})};
 for(const m of mods){walk(m.ast,(n,st)=>{const par=st[st.length-1];
  if(n.type==='FunctionDeclaration'&&n.id)(FN[n.id.name]=FN[n.id.name]||[]).push({m,node:n});
  if(n.type==='VariableDeclarator'&&n.id.type==='Identifier'&&isFn(n.init))(FN[n.id.name]=FN[n.id.name]||[]).push({m,node:n.init});
  if(n.type==='AssignmentExpression'&&n.left.type==='Identifier'&&isFn(n.right))(FN[n.left.name]=FN[n.left.name]||[]).push({m,node:n.right});
  /* a handler kept on a table (P2H.briber=m=>{…}, review/one-core-dup3 r1): named by its property, for a "previews: briber" comment */
  if(n.type==='AssignmentExpression'&&n.left.type==='MemberExpression'&&!n.left.computed&&isFn(n.right))(FN[n.left.property.name]=FN[n.left.property.name]||[]).push({m,node:n.right});
  if(n.type==='CallExpression'&&n.callee.type==='Identifier'&&n.callee.name==='A'&&n.arguments.length>=3){const k=litOf(n.arguments[0]);if(k)addL(k,m,n)}
  if(n.type==='AssignmentExpression'&&n.left.type==='MemberExpression'&&n.left.object.type==='Identifier'&&n.left.object.name==='ACT'){const k=n.left.computed?litOf(n.left.property):n.left.property.name;if(k)addL(k,m,n)}
  if(n.type==='IfStatement'||n.type==='ConditionalExpression')for(const k of eqLit(n.test))addL(k,m,n.consequent,'branch');
  if(n.type==='SwitchCase'&&n.test){const k=litOf(n.test);if(k&&NAMEY.test(k))addL(k,m,n,'branch')}
  /* an option object with a name n:"…" (or n:`Bàn tán về ${…}`: its fixed head): a wrapper elsewhere that finds it by name shows its amounts */
  if(n.type==='ObjectExpression')for(const pp of n.properties)if(pp.type==='Property'&&!pp.computed&&(pp.key.name==='n')){const v=litOf(pp.value)||(pp.value.type==='TemplateLiteral'?pp.value.quasis[0].value.cooked:null);if(v&&v.length>=4)(NOBJ[v]=NOBJ[v]||[]).push({m,node:n,head:pp.value.type==='TemplateLiteral'&&pp.value.expressions.length>0})}
  if(n.type==='MemberExpression'&&!(par&&par.type==='MemberExpression'&&par.object===n)){const p=balPath(n);if(!p)return;
   /* printed? inside balSg/balAb/balOan(…) or straight in a template ${…} (alone or in arithmetic) */
   let pr=null;for(let i=st.length-1;i>=0;i--){const x=st[i];
    if(x.type==='CallExpression'&&x.callee.type==='Identifier'&&PRINT.has(x.callee.name)){pr=x;break}
    if(x.type==='TemplateLiteral'){const child=st[i+1]||n;if(x.expressions.includes(child)&&/^(MemberExpression|BinaryExpression|UnaryExpression)$/.test(child.type))pr=child;break}
    if(x.type==='CallExpression'||isFn(x)||/Statement|Property/.test(x.type))break}
   if(pr)prints.push({m,n,p,key:keyOf(p),stack:st.slice(),line:n.loc.start.line,col:n.loc.start.column});
   else reads.push({m,n,key:keyOf(p),stack:st.slice()})}})}
 /* an act table entry: provoke:{w,ok,run:(v,t)=>…} (j28 SOC / PERS, any `key:{… run / f / go …}` table) is the act "provoke" */
 for(const m of mods)walk(m.ast,n=>{if(n.type==='Property'&&!n.computed&&n.value.type==='ObjectExpression'){const k=n.key.type==='Identifier'?n.key.name:litOf(n.key);
   if(k&&NAMEY.test(k)&&n.value.properties.some(pp=>pp.type==='Property'&&!pp.computed&&/^(run|go|act)$/.test(pp.key.name||'')&&isFn(pp.value)))addL(k,m,n.value,'table')}});
 return{ORDER,mods,FN,LINK,NOBJ,reads,prints}}
/* the link names of a text at AST path st (node n): property keys and entry-call names on the way up, string arguments and data-x="v" of the calls
   around it, assignment chains (ACT.spy.f=…), `if(k==="lit")` branches it sits in; and the option names its function looks up (a.n==="…", /^…/.test(a.n)) */
function namesAt(st,n,stopAt,strict){const names=new Set();
 for(let i=st.length-1;i>=0;i--){const x=st[i],child=st[i+1]||n;if(x===stopAt)break;
  if(x.type==='Property'&&!x.computed){const k=x.key.type==='Identifier'?x.key.name:litOf(x.key);if(k&&NAMEY.test(k))names.add(k)}
  if(x.type==='ObjectExpression')for(const pp of x.properties)if(pp.type==='Property'&&!pp.computed&&(pp.key.name==='k'||pp.key.value==='k')){const v=litOf(pp.value);if(v&&NAMEY.test(v))names.add(v)}
  if(x.type==='CallExpression')for(const g of x.arguments){const v=litOf(g);if(v!=null&&NAMEY.test(v)&&(!strict||g===x.arguments[0]&&x.callee.type==='Identifier'&&/^(add|A)$/.test(x.callee.name)))names.add(v);
   const txt=g.type==='TemplateLiteral'?g.quasis.map(q=>q.value.cooked).join(' '):(typeof v==='string'?v:'');for(const q of txt.matchAll(/data-[\w-]+="([A-Za-z_$][\w$]*)"/g))names.add(q[1])}
  if((x.type==='IfStatement'||x.type==='ConditionalExpression')&&x.consequent===child)eqLit(x.test).forEach(k=>names.add(k));
  if(x.type==='SwitchCase'&&x.test){const k=litOf(x.test);if(k&&NAMEY.test(k))names.add(k)}
  if(x.type==='AssignmentExpression'&&x.left.type==='MemberExpression'){let c=x.left;while(c.type==='MemberExpression'){const k=c.computed?litOf(c.property):c.property.name;if(k&&NAMEY.test(k))names.add(k);c=c.object}}}
 let fnIn=null;for(let i=st.length-1;i>=0;i--)if(isFn(st[i])&&(st[i].type==='FunctionDeclaration'||/^(VariableDeclarator|AssignmentExpression)$/.test((st[i-1]||{}).type))){fnIn=st[i];break}
 const nNames=new Set();if(fnIn)walk(fnIn,q=>{if(q.type==='BinaryExpression'&&/^={2,3}$/.test(q.operator)){for(const [x,y] of [[q.left,q.right],[q.right,q.left]])if(x.type==='MemberExpression'&&!x.computed&&x.property.name==='n'){const v=litOf(y);if(v)nNames.add(v)}}
  if(q.type==='CallExpression'&&q.callee.type==='MemberExpression'&&q.callee.property.name==='test'&&q.callee.object.type==='Literal'&&q.callee.object.regex){const r=/^\^([^\\()[\]|*+?{}.$]{4,})/.exec(q.callee.object.regex.pattern);if(r&&q.arguments[0]&&q.arguments[0].type==='MemberExpression'&&q.arguments[0].property.name==='n')nNames.add('^'+r[1])}});
 return{names,nNames,fnIn}}
const nobjOf=(idx,v)=>v[0]==='^'?Object.keys(idx.NOBJ).filter(k=>k.startsWith(v.slice(1))).flatMap(k=>idx.NOBJ[k]):(idx.NOBJ[v]||[]);
/* one-core-text: the modules whose rules a text at st shows = its own + the modules that define the acts / options it is linked to (DERIVED from code:
   A("k") / ACT.k= / act-table entries / if(k==="lit") branches for every link name, the options it wraps by name, handler functions named after it) */
function linkMods(idx,f,st,n){const {names,nNames}=namesAt(st,n,null,true);const M=new Set([f]);
 /* acts only (A("k") / ACT.k= / act-table entries): a branch if(x==="k") names too many unrelated things to widen the amount compare */
 for(const k of names)for(const L of idx.LINK[k]||[])if(L.kind!=='branch')M.add(L.m.f);
 for(const v of nNames)nobjOf(idx,v).forEach(d=>M.add(d.m.f));return M}
function bind(B){const idx=index(B);const {mods,FN,LINK,NOBJ,reads,prints}=idx;
 /* reads per module, sorted by position, for range lookups */
 const R={};for(const r of reads)(R[r.m.f]=R[r.m.f]||[]).push(r);
 /* a read of the key itself, or of an object that holds it (use:BAL.arc.item.vangbac applies the whole item; A=BAL.arc.alt["td_an.c1"][0] then A.l) */
 const readIn=(m,node,key)=>(R[m.f]||[]).some(r=>(r.key===key||key.startsWith(r.key+'.')&&r.key.split('.').length>=3)&&r.n.start>=node.start&&r.n.end<=node.end);
 const anyRead=new Set(reads.map(r=>r.key));const anyReadOf=(key,min)=>{const p=key.split('.');for(let i=p.length;i>=Math.min(min,p.length);i--)if(anyRead.has(p.slice(0,i).join('.')))return true;return false};
 /* names a node calls (Identifier callees) */
 const callsOf=node=>{const S=new Set();walk(node,n=>{if(n.type==='CallExpression'&&n.callee.type==='Identifier')S.add(n.callee.name);if(n.type==='Property'&&n.value.type==='Identifier'&&FN[n.value.name])S.add(n.value.name)});return S};
 const CC=new Map();const callsC=node=>{if(!CC.has(node))CC.set(node,callsOf(node));return CC.get(node)};
 /* the key is read in node, or in a function node calls (depth 2) */
 function readDeep(m,node,key,depth,seen){if(readIn(m,node,key))return true;if(!depth)return false;
  for(const nm of callsC(node)){if(PRINT.has(nm))continue;for(const d of FN[nm]||[]){if(seen.has(d.node))continue;seen.add(d.node);if(readDeep(d.m,d.node,key,depth-1,seen))return true}}return false}
 const bad=[];const out=[];
 for(const P of prints){const {m,stack:st,key}=P;
  /* example numbers that no rule reads by design: the kit sample page (BAL.kitpage) and the Hạnh lesson's first-time example picture (BAL.td.exNeed) */
  if(P.p[0]==='kitpage'||key==='td.exNeed'){out.push(Object.assign(P,{ok:true,how:'example number (no rule by design)'}));continue}
  if(!SITE.has(P.p[0])){const ok=anyReadOf(key,1);out.push(Object.assign(P,{ok,how:ok?'concept: read by a rule':'concept: read by no rule'}));if(!ok)bad.push(P);continue}
  /* walk up to the option boundary */
  let scope=null;
  for(let i=st.length-1;i>=0;i--){const x=st[i],child=st[i+1]||P.n;
   if(x.type==='ObjectExpression'&&x.properties.some(pp=>pp.type==='Property'&&(isFn(pp.value)||pp.kind==='get'||pp.method))){scope=x;break}
   if(x.type==='CallExpression'&&x.arguments.length){const k=litOf(x.arguments[0]);if(k&&NAMEY.test(k)&&!(x.callee.type==='Identifier'&&PRINT.has(x.callee.name))){scope=x;break}}
   if((x.type==='IfStatement'||x.type==='ConditionalExpression')&&x.consequent===child&&eqLit(x.test).length){scope=child;break}
   if(x.type==='SwitchCase'&&x.test&&NAMEY.test(litOf(x.test)||'')){scope=x;break}
   /* a named top-level function (declaration, `const f=…`, `f=…`, an IIFE) is the option of last resort; an arrow passed as an argument (aoLz(()=>`…`)) is not */
   if(i===1||(isFn(x)&&st.slice(0,i).every(y=>!isFn(y))&&(x.type==='FunctionDeclaration'||/^(VariableDeclarator|AssignmentExpression)$/.test(st[i-1].type)||st[i-1].type==='CallExpression'&&st[i-1].callee===x))){scope=x;break}}
  if(!scope)scope=st[1]||st[0];
  const si=st.indexOf(scope);const {names,nNames,fnIn}=namesAt(st,P.n,si>1?st[si-2]:null);
  /* a text function that previews a rule kept elsewhere says so in the code: a comment "previews: ruleFn" inside its option (checked: ruleFn must read the key) */
  const prev=new Set();for(const c of m.comments)if(c.start>=scope.start&&c.end<=scope.end||fnIn&&c.start>=fnIn.start&&c.end<=fnIn.end){const q=/previews:\s*([\w$, ]+)/.exec(c.value);if(q)q[1].split(/[ ,]+/).filter(Boolean).forEach(x=>prev.add(x))}
  let how=null;
  if(readDeep(m,scope,key,2,new Set()))how='same option';
  /* a BAL.road / BAL.arc amount in a help or info text (not inside an option object): the rule it describes lives in the road / arc engine */
  else if(P.p[0]!=='eff'&&scope.type!=='ObjectExpression'&&anyReadOf(key,2))how='road / arc rule (info text)';
  else for(const k of names){for(const L of LINK[k]||[])if(readDeep(L.m,L.node,key,2,new Set())){how='act '+k+' ('+L.m.f+':'+L.node.loc.start.line+')';break}if(how)break}
  /* a handler function named after the action (data-td="probe" → tdProbe) */
  if(!how)for(const k of names){const cap=k[0].toUpperCase()+k.slice(1);for(const nm of Object.keys(FN))if((nm===k||nm.endsWith(cap)&&/[a-z0-9]$/.test(nm.slice(0,-cap.length)))&&FN[nm].some(d=>readDeep(d.m,d.node,key,2,new Set()))){how='handler '+nm;break}if(how)break}
  if(!how)for(const v of nNames){const L=nobjOf(idx,v);for(const d of L)if(d.node!==scope&&readDeep(d.m,d.node,key,2,new Set())){how='wraps option "'+v.replace(/^\^/,'')+'" ('+d.m.f+':'+d.node.loc.start.line+')';break}if(how)break}
  if(!how)for(const nm of prev)if((FN[nm]||[]).some(d=>readDeep(d.m,d.node,key,2,new Set()))){how='previews '+nm;break}
  /* also an option that is the preview of the act it calls: go:()=>runAct("k") … — the names in the scope */
  if(!how&&scope.type==='ObjectExpression'){const lits=new Set();walk(scope,n=>{const v=litOf(n);if(v&&NAMEY.test(v))lits.add(v)});
   for(const k of lits){if(names.has(k))continue;for(const L of (LINK[k]||[]).filter(L=>L.node.type==='CallExpression'))if(readDeep(L.m,L.node,key,2,new Set())){how='act '+k+' ('+L.m.f+':'+L.node.loc.start.line+')';break}if(how)break}}
  P.ok=!!how;P.how=how||'NOT read by this option ('+m.f+':'+scope.loc.start.line+' '+scope.type+(names.size?'; links '+[...names].slice(0,6).join(','):'')+')';out.push(P);if(!how)bad.push(P)}
 /* SWAP (review/one-core-dup3, reviewer LIMIT of review-one-core-dup2-r4): two keys of the SAME option swapped between its success and failure texts
    (AOUT.ally = aoLz(win text, lose text) printing f_3 / f_2 while the act reads f_2 on the roll's success and f_3 after it) is read by the option either
    way, so the check above cannot see it. Here a text tied to a branch (an AOUT pair element 0 = win / 1 = lose; wt:[…] / lt:[…] of an option) must print
    a key whose rule read sits on the same branch (inside if(roll(…)) = win, its else or the code after an if(roll(…)){…return} = lose; ok:()=> = win,
    no / fail / bad:()=> = lose; a negated test !roll(…) swaps them). A read whose branch cannot be told is no verdict. */
 const src=(m,n)=>m.src.slice(n.start,n.end);
 const textBranch=P=>{const st=P.stack;for(let i=st.length-1;i>=0;i--){const x=st[i],child=st[i+1]||P.n;
   if(x.type==='CallExpression'&&x.callee.type==='Identifier'&&x.callee.name==='aoLz'&&x.arguments.length===2){const k=x.arguments.indexOf(child);if(k>=0)return k?'lose':'win'}
   if(x.type==='ArrayExpression'&&x.elements.length===2&&st.slice(0,i).some(y=>y.type==='AssignmentExpression'&&/^AOUT\b/.test(src(P.m,y.left))||y.type==='CallExpression'&&y.arguments[0]&&src(P.m,y.callee)==='Object.assign'&&src(P.m,y.arguments[0])==='AOUT')){const k=x.elements.indexOf(child);if(k>=0)return k?'lose':'win'}
   if(x.type==='Property'&&!x.computed&&x.value===child&&/^(wt|lt)$/.test(x.key.name||''))return x.key.name==='wt'?'win':'lose'}return null};
 const isRoll=(m,t)=>/\broll\(/.test(src(m,t));const neg=(m,t)=>/^\s*!/.test(src(m,t));
 /* a helper whose roll is the OTHER side's (caught(): the target sees the act) says so with a comment "roll-side: catch" in its body: its reads have no
    win / lose branch of the act (review/one-core-dup3 r1: jlost AOUT lose text "bị bắt: nàng nắm N chứng cứ" prints caught()'s BAL.eff.j8.evCaught) */
 const catchSide=r=>{const f=r.stack.find(isFn);return !!f&&(r.m.comments||[]).some(c=>c.start>=f.start&&c.end<=f.end&&/roll-side:\s*catch/.test(c.value))};
 const readBranch=r=>{if(catchSide(r))return null;const st=r.stack;for(let i=st.length-1;i>=0;i--){const x=st[i],child=st[i+1]||r.n;
   if(x.type==='Property'&&!x.computed&&x.value===child&&isFn(child)){const k=x.key.name||'';if(k==='ok')return 'win';if(/^(no|fail|bad)$/.test(k))return 'lose'}
   if((x.type==='IfStatement'||x.type==='ConditionalExpression')&&isRoll(r.m,x.test)&&child!==x.test){const w=(child===x.consequent)!==neg(r.m,x.test);return w?'win':'lose'}
   if((x.type==='BlockStatement'||x.type==='Program')&&x.body.includes(child)){const j=x.body.indexOf(child);for(let q=j-1;q>=0;q--){const y=x.body[q];
     if(y.type==='IfStatement'&&!y.alternate&&isRoll(r.m,y.test)){const c=y.consequent,last=c.type==='BlockStatement'?c.body[c.body.length-1]:c;if(last&&last.type==='ReturnStatement')return neg(r.m,y.test)?'win':'lose'}}}
   if(isFn(x))break}return null};
 const RB={};for(const r of reads)(RB[r.key]=RB[r.key]||[]).push(r);
 for(const P of out){if(!P.ok||!SITE.has(P.p[0]))continue;const tb=textBranch(P);if(!tb)continue;
  const br=(RB[P.key]||[]).map(readBranch).filter(Boolean);if(!br.length||br.includes(tb))continue;
  P.ok=false;P.how='SWAP: the text sits on the '+tb+' branch but the rule reads this key on the '+br[0]+' branch (two keys of one option swapped?)';bad.push(P)}
 return{prints:out,bad}}
module.exports={bind,index,linkMods,namesAt};
if(require.main===module){
 const B=process.env.OC_BUILD||path.join(ROOT,'dev','build');
 const {prints,bad}=bind(B);
 const row=P=>`${P.m.f}:${P.line} BAL.${P.p.join('.')}  ${P.ok?'ok':'MISMATCH'}: ${P.how}  «${P.m.src.split('\n')[P.line-1].slice(Math.max(0,P.col-70),P.col+40).replace(/\s+/g,' ')}»`;
 if(process.argv.includes('--list')){prints.forEach(P=>console.log(row(P)));console.log(JSON.stringify({prints:prints.length,mismatches:bad.length}));process.exit(0)}
 console.log(JSON.stringify({prints:prints.length,mismatches:bad.length}));
 if(bad.length){console.log('FAIL: a player text prints a BAL key that the rule of its own option does not read (print the key the rule reads; a typed rule moves into BAL first)\n  '+bad.map(row).join('\n  '));process.exit(1)}
 console.log('PASS: every printed BAL key is read by the rule of its own option / the act it previews')}
