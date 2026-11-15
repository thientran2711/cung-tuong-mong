// node ast.js OUT.json : static inventory of log sentences, choice options and act cards in the game modules
const acorn=require('/opt/node-tools/node_modules/acorn'),walk=require('/opt/node-tools/node_modules/acorn-walk'),fs=require('fs');
const B='/home/user/cung-tuong-mong/.claude/worktrees/agent-ab06ce27b6963775a/dev/build/';
const mods=fs.readFileSync(B+'assemble.py','utf8').split('\n')[3].match(/'(j[^']+\.js)'/g).map(s=>s.slice(1,-1));
const out={logs:[],opts:[],acts:[],fails:[]};
const MAXALT=6;
function nameish(src){return /name|NM|nm\(|who|rkName|\.n\b|title|hieu/.test(src)}
function cross(a,b){const r=[];for(const x of a)for(const y of b){r.push(x+y);if(r.length>=MAXALT)return r}return r}
let FN={},CODE='',TOP=false;
function S(n,depth=0,fnScope=null){ // sample strings
 if(!n||depth>6)return['X'];
 switch(n.type){
  case'Literal':return[typeof n.value==='string'?n.value:String(n.value)];
  case'TemplateLiteral':{let r=[n.quasis[0].value.cooked||''];for(let i=0;i<n.expressions.length;i++){r=cross(r,S(n.expressions[i],depth+1,fnScope));r=cross(r,[n.quasis[i+1].value.cooked||''])}return r}
  case'ConditionalExpression':return S(n.consequent,depth+1,fnScope).concat(S(n.alternate,depth+1,fnScope)).slice(0,MAXALT);
  case'LogicalExpression':return S(n.left,depth+1,fnScope).concat(S(n.right,depth+1,fnScope)).slice(0,MAXALT);
  case'BinaryExpression':if(n.operator==='+')return cross(S(n.left,depth+1,fnScope),S(n.right,depth+1,fnScope));return['3'];
  case'CallExpression':{const src=CODE.slice(n.start,n.end);if(/\.join\(|\.map\(/.test(src))return['X'];
   if(n.callee.type==='Identifier'&&FN[n.callee.name]&&depth<3)return depth===0?FN[n.callee.name].slice():FN[n.callee.name].slice(0,MAXALT);
   if(/word\(/.test(src))return['Khá chắc'];return[nameish(src)?'Lan Tần':'X']}
  default:{const src=CODE.slice(n.start,n.end);if(/^(S\.\w+|[a-z]|g|d|n|m)$/.test(src))return['3'];return[nameish(src)?'Lan Tần':'X']}
 }}
function idAssigns(scope,name){const R=[];walk.full(scope,m=>{if(m.type==='AssignmentExpression'&&m.left.type==='Identifier'&&m.left.name===name)R.push(m.right);
  if(m.type==='VariableDeclarator'&&m.id.type==='Identifier'&&m.id.name===name&&m.init)R.push(m.init)});return R}
function retSamples(fn){const R=[];walk.full(fn.body,m=>{if(m.type==='ReturnStatement'&&m.argument){const a=m.argument;
   if(a.type==='Identifier'){for(const x of idAssigns(fn,a.name))R.push(...S(x,1))}
   else if(/TemplateLiteral|Literal|ConditionalExpression|BinaryExpression|LogicalExpression/.test(a.type))R.push(...S(a,1))}});
 return R.filter(x=>typeof x==='string'&&/[A-Za-zÀ-ỹ]{3}/.test(x))}
const P=[];
for(const f of mods){const code=fs.readFileSync(B+f,'utf8');let ast;
 try{ast=acorn.parse(code,{ecmaVersion:'latest',allowReturnOutsideFunction:true,allowAwaitOutsideFunction:true,allowHashBang:true})}catch(e){out.fails.push(f+': '+e.message);continue}
 P.push({f,code,ast});CODE=code;
 walk.full(ast,n=>{if(n.type==='FunctionDeclaration'&&n.id){const r=retSamples(n);if(r.length)FN[n.id.name]=(FN[n.id.name]||[]).concat(r)}
  if(n.type==='CallExpression'&&n.callee.type==='Identifier'&&n.callee.name==='A'&&n.arguments[2]&&n.arguments[2].type==='ObjectExpression'){
   for(const p of n.arguments[2].properties)if(p.key&&p.key.name==='f'&&/Function/.test(p.value.type)){const r=retSamples(p.value);FN.runAct=(FN.runAct||[]).concat(r)}}});
}
for(const k in FN)FN[k]=[...new Set(FN[k])];
for(const {f,code,ast} of P){CODE=code;const line=p=>code.slice(0,p).split('\n').length;
 walk.ancestor(ast,{CallExpression(n,anc){
  if(n.callee.type==='Identifier'&&n.callee.name==='log'&&n.arguments[0]){let a=n.arguments[0];let alts;
   if(a.type==='Identifier'){const fnN=[...anc].reverse().find(x=>/Function/.test(x.type));alts=[];
    if(fnN)for(const x of idAssigns(fnN,a.name))alts.push(...S(x));
    if(!alts.length||alts.every(x=>x==='X'))for(const x of idAssigns(ast,a.name))alts.push(...S(x)); // module-wide (ev+=… in monthTick)
    if(!alts.length)alts=['?'+a.name]}
   else alts=S(a);
   out.logs.push({f,l:line(n.start),src:code.slice(n.start,Math.min(n.end,n.start+200)),alts:[...new Set(alts)]})}
  if(n.callee.type==='Identifier'&&n.callee.name==='pbtn'&&n.arguments[1]){out.acts.push({f,l:line(n.start),names:S(n.arguments[1]),t:n.arguments[2]?S(n.arguments[2])[0]:'',kind:'pbtn'})}
  if(n.callee.type==='Identifier'&&n.callee.name==='A'&&n.arguments.length>=2&&n.arguments[0].type==='Literal'){out.acts.push({f,l:line(n.start),id:n.arguments[0].value,names:S(n.arguments[1]),kind:'A'})}
 },ObjectExpression(n){const Pp={};for(const p of n.properties)if(p.key&&(p.key.name||p.key.value))Pp[p.key.name||p.key.value]=p.value;
  if(!Pp.n)return;const names=S(Pp.n);
  if(Pp.fx||Pp.x&&Pp.go)out.opts.push({f,l:line(n.start),names,x:Pp.x?S(Pp.x)[0]:'' ,lg:Pp.lg?S(Pp.lg)[0]:''});
  else if(Pp.c||Pp.o!=null||Pp.run||Pp.w||(Pp.go&&Pp.x)||Pp.k!=null&&Pp.t)out.acts.push({f,l:line(n.start),names,t:Pp.t?S(Pp.t)[0]:'',kind:'card'});
 }});
}
out.rets=[];for(const {f,code,ast} of P){CODE=code;const line=p=>code.slice(0,p).split('\n').length;
 walk.full(ast,m=>{let a=null;if(m.type==='ReturnStatement'&&m.argument&&/TemplateLiteral|Literal|ConditionalExpression|BinaryExpression/.test(m.argument.type))a=m.argument;
  if(m.type==='AssignmentExpression'&&m.operator==='+='&&m.left.type==='Identifier'&&/^(ev|r|s|t|h|msg|out|txt|res|x)$/.test(m.left.name))a=m.right;
  if(!a)return;const al=S(a).filter(x=>typeof x==='string'&&/[a-zà-ỹ]{2,} [a-zà-ỹ]{2,}/i.test(x)&&/[.!]\s*$|[.!] /.test(x)&&!/[<{]\s*(div|p|button|h3|span class="kp)/.test(x));
  if(al.length)out.rets.push({f,l:line(m.start),alts:[...new Set(al)]})})}
fs.writeFileSync(process.argv[2],JSON.stringify(out,null,0));
console.log('logs',out.logs.length,'alts',out.logs.reduce((s,g)=>s+g.alts.length,0),'opts',out.opts.length,'acts',out.acts.length,'fails',out.fails,'runAct',(FN.runAct||[]).length);
