/* coop-thin F2 r2 (LUẬT SỬA CẢ NHÓM): every emitter gated on the global `quiet` (j1.js:86) and every screen gate, and which of them a
   guest intent can reach on the host. Her intents run on the host inside TH.withSeat (her context), where `quiet` used to be true, so
   every card / pop / number / Sổ ghi line gated on it was silenced for her (review r1 of coop-thin-f2, blocking item 1).
   usage: NODE_PATH=<dir holding acorn + acorn-walk> node dev/test/coop-thin-quiet-scan.js [--md]
          (npm i acorn acorn-walk in a scratch dir; the game has no npm dependencies, so the parser is not vendored)
   Output: one row per global-`quiet` read (shadowed params / locals / object keys / strings are skipped), its enclosing function, the
   kind of thing it gates (card in Q, Sổ ghi line, screen effect, save, behaviour switch), and whether an intent engine reaches it
   (static call graph over dev/build/*.js: a function's own calls + every wrapper of the same name; over-approximate on purpose).
   Roots = the engine functions registered with TH.F.reg (parsed from jcoopthinf.js) + chooseM (her card pick, part D `do pick`) + nextBuoi
   (her buổi step, part E herStep). */
const fs=require('fs'),path=require('path');
let acorn,walk;try{acorn=require('acorn');walk=require('acorn-walk')}catch(e){console.error('needs acorn + acorn-walk (NODE_PATH); see the header');process.exit(2)}
const DIR=path.join(__dirname,'..','build');
const files=fs.readdirSync(DIR).filter(f=>/^j.*\.js$/.test(f)&&!/^jcoopthin/.test(f)).sort();
const G=new Map();/* owner name -> Set(callee names) */
const edge=(a,b)=>{if(!a||!b||a===b)return;if(!G.has(a))G.set(a,new Set());G.get(a).add(b)};
const reads=[];
const nameOf=(n,anc)=>{/* the owner name of a function node from its parent */
 const p=anc[anc.length-2];if(!p)return null;
 if(n.id&&n.id.name)return n.id.name;
 if(p.type==='VariableDeclarator'&&p.id.type==='Identifier')return p.id.name;
 if(p.type==='AssignmentExpression'){const l=p.left;if(l.type==='Identifier')return l.name;if(l.type==='MemberExpression'&&!l.computed&&l.object.type==='Identifier'&&l.object.name==='window')return l.property.name;
  if(l.type==='MemberExpression'&&l.computed&&l.property.type==='Literal'&&typeof l.property.value==='string')return l.property.value}
 /* W("name", o=>function(){…}) / lsTag("name", …): the wrapper body belongs to that name */
 for(let i=anc.length-2;i>=0;i--){const a=anc[i];if(a.type==='CallExpression'&&a.arguments.length>=2&&a.arguments[0].type==='Literal'&&typeof a.arguments[0].value==='string'&&/^[A-Za-z_$][\w$]*$/.test(a.arguments[0].value)&&a.arguments.slice(1).includes(anc[i+1]))return a.arguments[0].value;
  if(/Function/.test(a.type)&&i<anc.length-2)break}
 return null};
const FN=t=>t==='FunctionDeclaration'||t==='FunctionExpression'||t==='ArrowFunctionExpression';
function shadow(anc){/* a param / local named quiet in an enclosing function (or a catch / block let) */
 for(let i=anc.length-1;i>=0;i--){const a=anc[i];
  if(FN(a.type)){if(a.params.some(p=>p.type==='Identifier'&&p.name==='quiet'||p.type==='AssignmentPattern'&&p.left.name==='quiet'))return true;
   let hit=false;walk.simple(a.body,{VariableDeclarator(d){if(d.id.type==='Identifier'&&d.id.name==='quiet')hit=true}});if(hit)return true}}
 return false}
for(const f of files){const src=fs.readFileSync(path.join(DIR,f),'utf8');let ast;try{ast=acorn.parse(src,{ecmaVersion:'latest',sourceType:'script',locations:true,allowHashBang:true})}catch(e){console.error('parse',f,e.message);continue}
 const owners=new Map();
 const own=anc=>{for(let i=anc.length-1;i>=0;i--){const a=anc[i];if(FN(a.type)){if(!owners.has(a))owners.set(a,nameOf(a,anc.slice(0,i+1))||null);const n=owners.get(a);if(n)return n}}return null};
 walk.ancestor(ast,{
  CallExpression(n,anc){const o=own(anc);if(!o)return;let c=n.callee;
   if(c.type==='MemberExpression'&&!c.computed&&['apply','call'].includes(c.property.name))c=c.object;
   if(c.type==='Identifier')edge(o,c.name);else if(c.type==='MemberExpression'&&!c.computed&&c.object.type==='Identifier'&&c.object.name==='window')edge(o,c.property.name);
   /* a wrapper's saved original (const o=goTo; goTo=function(){o.apply…}): the name it saved is the same function */
   for(const a of n.arguments)if(a.type==='Identifier'&&/^[a-z]\w{3,}$/.test(a.name)&&a.name!==o)edge(o,a.name)},
  Identifier(n,anc){if(n.name!=='quiet')return;const p=anc[anc.length-2];
   if(p.type==='MemberExpression'&&p.property===n&&!p.computed)return;if(p.type==='Property'&&p.key===n&&!p.computed&&!p.shorthand)return;
   if(p.type==='AssignmentExpression'&&p.left===n)return;/* a write (sets, not gates) */
   if(p.type==='VariableDeclarator'&&p.id===n)return;if(FN(p.type)&&p.params&&p.params.includes(n))return;
   if(shadow(anc))return;
   const o=own(anc)||'(top)';reads.push({f,line:n.loc.start.line,o,txt:src.split('\n')[n.loc.start.line-1]})}});
}
/* roots: the registered engines */
const thf=['jcoopthinf.js','jcoopthinf6b.js'/* F6b: reg12 */].filter(f=>fs.existsSync(path.join(DIR,f))).map(f=>fs.readFileSync(path.join(DIR,f),'utf8')).join('\n');
const roots=new Set();for(const m of thf.matchAll(/F\.reg\("(\w+)"/g))roots.add(m[1]);for(const m of thf.matchAll(/for\(const n of \[([^\]]+)\]\)F\.reg/g))for(const x of m[1].matchAll(/"(\w+)"/g))roots.add(x[1]);
/* F3 / F4 (reg8 / reg9 helpers and the F3 UI tuple list) */for(const m of thf.matchAll(/\breg\d+\("(\w+)"/g)/* F5: reg10 */)roots.add(m[1]);for(const m of thf.matchAll(/\["(\w+UI)",\[/g))roots.add(m[1]);
roots.add('chooseM');roots.add('nextBuoi');if(process.env.ROOTS){roots.clear();for(const r of process.env.ROOTS.split(','))roots.add(r)}/* ROOTS=a,b: one part's engines only *//* part E: her buổi step (TH.tapRun since F2 r2) */
/* cut: the names that do nothing inside her context on the host (TH.NOOP + the UICAP list in jcoopthin.js; resultShow runs) */
const thn=fs.readFileSync(path.join(DIR,'jcoopthin.js'),'utf8');const CUT=new Set();
for(const m of thn.matchAll(/TH\.NOOP=\[([^\]]+)\]/g))for(const x of m[1].matchAll(/"(\w+)"/g))CUT.add(x[1]);
for(const m of thn.matchAll(/const UICAP=new Set\(\[([^\]]+)\]/g))for(const x of m[1].matchAll(/"(\w+)"/g))CUT.add(x[1]);
CUT.delete('resultShow');
const seen=new Map();const q=[...roots].map(r=>[r,null]);for(const [r] of q)seen.set(r,null);
while(q.length){const [n]=q.shift();if(CUT.has(n))continue;for(const c of G.get(n)||[])if(!seen.has(c)){seen.set(c,n);q.push([c,n])}}
const via=n=>{const p=[];let x=n;while(x!=null&&p.length<8){p.unshift(x);x=seen.get(x)}return p.join(' > ')};
const kind=t=>/Q\.(push|unshift|splice)|kitPanel\(|kitModal\(|card67\(|tdPop\(/.test(t)?'card (Q)':/\blog\(|agSoftTxt|logs/.test(t)?'Sổ ghi line':
 /popNum|feedback\(|kitStatFx|kitStatGlow|kitReward|kmPush|resultShow|document\.|kitFx|kitCoins|kitGain|kitLose|kitItemFx|kitSfx|sfx\(|btrKill|kitNewDay/.test(t)?'screen':/save\(|localStorage/.test(t)?'save':'gate / behaviour';
const dd=new Set();const rows=reads.filter(r=>{const k=r.f+':'+r.line;if(dd.has(k))return false;dd.add(k);return true}).map(r=>({...r,k:kind(r.txt),reach:seen.has(r.o)&&!CUT.has(r.o),cut:CUT.has(r.o),path:seen.has(r.o)?via(r.o):''}));
const md=process.argv.includes('--md');
if(md){console.log('| # | file:line | function | gates | reachable from an intent (path) |');console.log('|---|---|---|---|---|')}
rows.forEach((r,i)=>{if(md)console.log(`| ${i+1} | ${r.f}:${r.line} | ${r.o} | ${r.k} | ${r.reach?'yes: '+r.path:r.cut?'no (a no-op in her context)':'no'} |`);
 else console.log(`${String(i+1).padStart(3)} ${(r.f+':'+r.line).padEnd(16)} ${r.o.padEnd(18)} ${r.k.padEnd(16)} ${r.reach?'REACH '+r.path:'-'}`)});
console.log(`\n${rows.length} global-quiet reads in ${new Set(rows.map(r=>r.o)).size} functions; reachable from an intent: ${rows.filter(r=>r.reach).length}; roots: ${[...roots].join(' ')}`);
module.exports={rows};
